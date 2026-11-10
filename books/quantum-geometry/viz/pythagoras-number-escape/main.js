/* ORTHO//PYTHAGORAS · 佩尔手性账本 — the ±1 seam of Pell's equation, prime splitting in ℤ[i] and congruent-number curves.
   Same frame as example-monograph/viz/golden-carry: inputs and readouts | a step ledger with its sign tape and rail | a
   1:1 heat map and the evidence. The ledger runs along the continued fraction of √d (squarefree d ≤ 37): the integer
   recurrence aᵢ = ⌊(a₀ + Pᵢ)/Qᵢ⌋, Pᵢ₊₁ = aᵢQᵢ − Pᵢ, Qᵢ₊₁ = (d − Pᵢ₊₁²)/Qᵢ gives the partial quotients, the convergents
   mᵢ/nᵢ are exact BigInts, and every norm Δ = m² − d n² is an exact integer (±Qᵢ₊₁). For d = 2 the rows are Theon's side
   and diagonal numbers. Cyan marks Δ = +1, magenta Δ = −1, amber the current step.
   The stage above the ledger draws one clean diagram per view: Pell (the m × m square filled with d n² unit cells, and
   the hyperbolas m² − d n² = ±1 with their asymptote), Primes (the circle of radius √p among the Gaussian integers and
   the residue clock mod p) and Elliptic (a rational right triangle of area d, the real curve E_d: y² = x³ − d²x and the
   Frobenius cosine aₚ/(2√p) on the unit circle). #E_d(𝔽ₚ) is counted point by point; congruent triangles come from
   stored rational points of E_d and are checked exactly in rationals.
   The pure mathematics of the earlier version of this page (Pythagorean readings of θ, Pell rows of √2, Liu Hui's
   polygons, E₁/E₂ point counts and Sato–Tate data) is kept unchanged and exported through the probes.
   Probes: window.PYTHAGORAS_ESCAPE (read-only state and maths), window.__vizTest (in-page self-test),
   window.TRV_THUMB (thumbnail cover state). */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
  const L = TRV.L, esc = TRV.esc;

  /* =============================== mathematics (pure) =============================== */
  const DEG = Math.PI / 180;
  const HALF_PI = Math.PI / 2;
  const SQRT2 = Math.SQRT2;
  const QUAT_AXIS = Object.freeze([2 / 3, 1 / 3, 2 / 3]);   // a rational unit axis: 2² + 1² + 2² = 3²

  /** The Dottie number θ* = cos θ* (Newton on cos θ − θ). */
  function dottieStar() {
    let x = 0.739;
    for (let i = 0; i < 60; i++) {
      const nx = x - (Math.cos(x) - x) / (-Math.sin(x) - 1);
      if (nx === x) break;
      x = nx;
    }
    return x;
  }
  const THETA_STAR = dottieStar();

  const PRESETS = Object.freeze([
    { id: '0', theta: 0, name: '0', zh: '0° 共线有理基线', en: '0° collinear rational baseline' },
    { id: '30', theta: Math.PI / 6, name: 'π/6', zh: '30° · π/6', en: '30° · π/6' },
    { id: 'star', theta: THETA_STAR, name: 'θ*', zh: 'θ* ≈ 42.346° 自指不动点', en: 'θ* ≈ 42.346° Dottie fixed point' },
    { id: '45', theta: Math.PI / 4, name: 'π/4', zh: '45° · π/4 希帕索斯 / Tsirelson', en: '45° · π/4 Hippasus / Tsirelson' },
    { id: '60', theta: Math.PI / 3, name: 'π/3', zh: '60° · π/3', en: '60° · π/3' },
    { id: '90', theta: HALF_PI, name: 'π/2', zh: '90° · π/2 纯正交双矢量门', en: '90° · π/2 pure orthogonal bivector gate' }
  ].map(Object.freeze));
  const presetAt = (theta) => PRESETS.find((p) => Math.abs(p.theta - theta) < 1e-9) || null;

  /** Every reading of a² + b² = 1 at the angle θ (radians). */
  function pythagorean(theta) {
    const a = Math.cos(theta), b = Math.sin(theta);
    const a2 = a * a, b2 = b * b;
    // geometric product of x = a e₁ and y = b e₂: xy = x·y + x∧y, yx = y·x + y∧x
    const ab = { scalar: a * 0 + 0 * b, e12: a * b };
    const ba = { scalar: b * 0 + 0 * a, e12: -(b * a) };
    const wedgeSum = ab.e12 + ba.e12;                       // a∧b + b∧a
    const c2Table = a2 + b2 + ab.scalar + ba.scalar;        // scalar part of (x + y)² from the table
    const c2Vec = Math.hypot(a, b) ** 2;                    // |x + y|² with x + y = (a, b)
    const trap = (a + b) ** 2;                              // (|a| + |b|)² = 1 + 2ab
    // Lagrange–Gram with u = e₁ = (1, 0), v = (cos θ, sin θ)
    const u = [1, 0], v = [a, b];
    const lagLHS = (u[0] ** 2 + u[1] ** 2) * (v[0] ** 2 + v[1] ** 2) - (u[0] * v[0] + u[1] * v[1]) ** 2;
    let lagRHS = 0;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) lagRHS += (u[i] * v[j] - u[j] * v[i]) ** 2;
    lagRHS /= 2;
    // parallelogram law with x = (a, 0), y = (0, b)
    const diagPlus = a ** 2 + b ** 2, diagMinus = a ** 2 + (-b) ** 2;
    const plLHS = diagPlus + diagMinus, plRHS = 2 * (a2 + b2);
    // Euclid's altitude: foot F = a·(cos θ, sin θ); |OF| = a², |FP| = 1 − a² = b²
    const OF = a * a, FP = 1 - OF;
    // Born weights of ψ = cos θ|0⟩ + sin θ|1⟩ for the rank-one projections onto |0⟩, |1⟩
    const p0 = Math.abs(a) ** 2, p1 = Math.abs(b) ** 2;
    // complementary contexts for one qubit (d = 2): purity excess = Z deviation + residual; residual = X deviation
    const purity = (a2 + b2) ** 2, excess = purity - 0.5;
    const zDev = (p0 - 0.5) ** 2 + (p1 - 0.5) ** 2;
    const xPlus = (a + b) ** 2 / 2, xMinus = (a - b) ** 2 / 2;
    const xDev = (xPlus - 0.5) ** 2 + (xMinus - 0.5) ** 2;
    const residual = excess - zDev;
    // proper-time metric with v/c = sin θ
    const beta = b, dtau = a, gamma = a > 1e-12 ? 1 / a : Infinity;
    const relSum = dtau ** 2 + beta ** 2;
    // unit quaternion q = cos θ + sin θ·n̂
    const q = [a, b * QUAT_AXIS[0], b * QUAT_AXIS[1], b * QUAT_AXIS[2]];
    const qNorm2 = q[0] ** 2 + q[1] ** 2 + q[2] ** 2 + q[3] ** 2;
    const vecNorm = Math.hypot(q[1], q[2], q[3]);
    return {
      theta, a, b, a2, b2, sum: a2 + b2, ab, ba, wedgeSum, c2Table, c2Vec, trap,
      lagLHS, lagRHS, diagPlus, diagMinus, plLHS, plRHS, OF, FP,
      p0, p1, purity, excess, zDev, xPlus, xMinus, xDev, residual,
      beta, dtau, gamma, relSum, q, qNorm2, vecNorm
    };
  }

  /** 2-adic valuation of a positive integer. */
  function v2(x) {
    let n = Math.abs(x), c = 0;
    if (!n) return Infinity;
    while (n % 2 === 0) { n /= 2; c++; }
    return c;
  }

  /** One Pell convergent m/n of √2 with its crack, Tennenbaum overlap, 2-adic data and descent. */
  function pellRow(k, m, n) {
    const m2 = m * m, twoN2 = 2 * n * n;
    const descent = [];
    for (let p = m, q = n; q > 0; [p, q] = [2 * q - p, p - q]) descent.push([p, q, p * p - 2 * q * q]);
    return {
      k, m, n, m2, twoN2, diff: m2 - twoN2, sign: k % 2 ? -1 : 1, ratio: m / n, err: m / n - SQRT2,
      errExact: (k % 2 ? -1 : 1) / (n * (m + n * SQRT2)),
      overlapSide: 2 * n - m, cornerSide: m - n, overlap: (2 * n - m) ** 2, uncovered: 2 * (m - n) ** 2,
      v2m: v2(m), v2n: v2(n), v2m2: v2(m2), v2two: v2(twoN2),
      binM2: m2.toString(2), binTwo: twoN2.toString(2), descent
    };
  }
  /** The first K convergents from 1/1 by (m, n) ↦ (m + 2n, m + n). */
  function pellRows(K = 7) {
    const rows = [];
    for (let k = 1, m = 1, n = 1; k <= K; k++, [m, n] = [m + 2 * n, m + n]) rows.push(pellRow(k, m, n));
    return rows;
  }

  /** Liu Hui's inscribed polygons N = 6·2ʲ (j = 0 … 4) by Pythagorean halving from the hexagon s₆ = 1. */
  function gonRows() {
    const rows = [];
    let s = 1, sDirect = 1, inner = '√3', radical = '1';
    for (let j = 0; j <= 4; j++) {
      const N = 6 * 2 ** j;
      const half = s / 2;
      const apothem = Math.sqrt(1 - half * half);
      const sagitta = half * half / (1 + apothem);           // 1 − √(1 − s²/4), without cancellation
      const semiPerimeter = N * s / 2;
      const area = N * s * apothem / 2;
      const area2N = N * s / 2;                               // Liu Hui: area of the 2N-gon = N·s_N·r/2
      const upper = 2 * area2N - area;
      const r4 = Math.sqrt(4 - s * s);
      const s2N = s / Math.sqrt(2 + r4);
      rows.push({
        j, N, s, sDirect, sTrig: 2 * Math.sin(Math.PI / N), apothem, apothemTrig: Math.cos(Math.PI / N), sagitta,
        semiPerimeter, area, area2N, upper, s2N, piGapPerim: Math.PI - semiPerimeter, piGapArea: Math.PI - area, radical
      });
      sDirect = Math.sqrt(2 - Math.sqrt(4 - sDirect * sDirect));
      s = s2N;
      radical = `√(2 − ${inner})`;
      inner = `√(2 + ${inner})`;
    }
    return rows;
  }

  const TIERS = Object.freeze([
    { id: 1, set: 'ℤ, ℚ', theta: 0 },
    { id: 2, set: 'ℚ̄', theta: Math.PI / 4 },
    { id: 3, set: 'π', theta: HALF_PI, gon: 4 },
    { id: 4, set: 'θ*', theta: THETA_STAR }
  ].map(Object.freeze));

  /* the four frozen theorems this page cites (all in trureturing.lock.json at the pinned commit) */
  const LEAN_CITED = Object.freeze([
    'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
    'D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law',
    'D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras',
    'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction'
  ]);
  /* declarations proposed for this page that do not exist in trureturing at the pinned commit: listed here so the
     self-test can prove they are never shown as LEAN ✓; formalize and freeze them first (skills/theorem-formalize) */
  const LEAN_NOT_FROZEN = Object.freeze([
    'D5/S3/Quantum/Geometry/Pythagorean.orthogonal_norm_add_sq',
    'D5/S3/Quantum/Geometry/InnerProduct.norm_add_sq_real',
    'D5/S3/Quantum/Foundations/QubitBloch.prob_zero_add_prob_one',
    'D5/S2/Fixpoint/CosineContraction.exists_unique_cos_fixedPoint'
  ]);

  /* ---------- Panel 3: elliptic curves mod p, Legendre spins and the Frobenius cosine ---------- */
  const PRIME_LO = 5, PRIME_HI = 199, ST_MAX = 997, ST_BINS = 9;
  function primesUpTo(n) {
    const s = new Uint8Array(n + 1).fill(1);
    s[0] = 0; s[1] = 0;
    for (let i = 2; i * i <= n; i++) if (s[i]) for (let j = i * i; j <= n; j += i) s[j] = 0;
    const out = [];
    for (let i = 2; i <= n; i++) if (s[i]) out.push(i);
    return out;
  }
  const PRIMES = Object.freeze(primesUpTo(PRIME_HI).filter((p) => p >= PRIME_LO));    // the 44 odd primes 5 … 199
  const ST_PRIMES = Object.freeze(primesUpTo(ST_MAX).filter((p) => p >= PRIME_LO));   // the 166 primes 5 … 997
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const mod = (a, p) => ((a % p) + p) % p;
  function powMod(b, e, p) {
    let r = 1;
    b = mod(b, p);
    while (e > 0) { if (e % 2 === 1) r = (r * b) % p; b = (b * b) % p; e = Math.floor(e / 2); }
    return r;
  }
  /** Legendre symbol (a/p) of an odd prime p by Euler's criterion a^((p−1)/2) ≡ 0, +1 or −1 (mod p). */
  function legendre(a, p) {
    const r = powMod(a, (p - 1) / 2, p);
    return r === 0 ? 0 : r === 1 ? 1 : -1;
  }
  /** Prime factorization as [[q, e], …] of |n| ≥ 1. */
  function factorize(n) {
    const out = [];
    let m = Math.abs(n);
    for (let q = 2; q * q <= m; q++) { let e = 0; while (m % q === 0) { m /= q; e++; } if (e) out.push([q, e]); }
    if (m > 1) out.push([m, 1]);
    return out;
  }
  /** Squarefree kernel of a nonzero integer, sign kept: −27 → −3, −16 → −1. */
  const squarefree = (n) => Math.sign(n) * factorize(n).reduce((acc, [q, e]) => acc * (e % 2 ? q : 1), 1);
  const isSquare = (n) => n >= 0 && Math.round(Math.sqrt(n)) ** 2 === n;

  /** Short Weierstrass curve y² = x³ + Ax + B: Δ = −16(4A³ + 27B²), j = 1728·4A³/(4A³ + 27B²) in lowest terms. */
  function makeCurve(id, A, B, extra) {
    const k = 4 * A ** 3 + 27 * B ** 2;
    const jn = 1728 * 4 * A ** 3, gg = gcd(jn, k) * Math.sign(k);
    return Object.freeze({ id, A, B, disc: -16 * k, jNum: jn / gg, jDen: k / gg, ...extra });
  }
  const CURVES = Object.freeze({
    E1: makeCurve('E1', -1, 0, { cm: true, name: 'E₁', eq: 'y² = x³ − x', conductor: 32 }),
    E2: makeCurve('E2', -1, 1, { cm: false, name: 'E₂', eq: 'y² = x³ − x + 1', conductor: 92 })
  });
  const CURVE_IDS = Object.freeze(['E1', 'E2']);
  const curveId = (c) => {
    const s = String(c || '').toUpperCase();
    return s === 'E1' || s === 'CM' ? 'E1' : s === 'E2' || s === 'NONCM' || s === 'NON-CM' ? 'E2' : null;
  };
  /** f(x) = x³ + Ax + B reduced mod p (all intermediate values stay below 10⁶ for p ≤ 997). */
  const fMod = (c, x, p) => mod(((x * x) % p) * x + c.A * x + c.B, p);

  /** p = a² + b² with a odd and b even (unique for a prime p ≡ 1 mod 4), else null. */
  function twoSquares(p) {
    for (let a = 1; a * a < p; a += 2) {
      const b2 = p - a * a;
      if (isSquare(b2) && b2 % 4 === 0 && b2 > 0) return { a, b: Math.round(Math.sqrt(b2)) };
    }
    return null;
  }
  /** The first convergent of the continued fraction of √D with m² − Dn² = ±1 (exact, BigInt; returned as strings). */
  function pellFundamental(D) {
    const a0 = Math.floor(Math.sqrt(D)), BD = BigInt(D);
    let m = 0, d = 1, a = a0, hPrev = 1n, h = BigInt(a0), kPrev = 0n, k = 1n;
    for (let i = 1; i <= 2000; i++) {
      const norm = h * h - BD * k * k;
      if (norm === 1n || norm === -1n) return { m: h.toString(), n: k.toString(), norm: Number(norm), length: i, m2: (h * h).toString(), pn2: (BD * k * k).toString() };
      m = d * a - m; d = (D - m * m) / d; a = Math.floor((a0 + m) / d);
      [hPrev, h] = [h, BigInt(a) * h + hPrev];
      [kPrev, k] = [k, BigInt(a) * k + kPrev];
    }
    return null;
  }

  /** Everything Panel 3 shows for one curve and one odd prime p. */
  function frobRow(cid, p) {
    const c = CURVES[cid];
    const f = [], chi = [], walk = [];
    let up = 0, down = 0, roots = 0, s = 0;
    for (let x = 0; x < p; x++) {
      const v = fMod(c, x, p), k = legendre(v, p);
      f.push(v); chi.push(k); s += k; walk.push(s);
      if (k > 0) up++; else if (k < 0) down++; else roots++;
    }
    const ap = -s;                                    // aₚ = −Σₓ (f(x)/p)
    const count = p + 1 + s;                          // #E(𝔽ₚ) = 1 + Σₓ (1 + χ(f(x)))
    const bad = mod(c.disc, p) === 0;
    const bound = 2 * Math.sqrt(p), cos = ap / bound;
    const theta = bad ? null : Math.acos(Math.max(-1, Math.min(1, cos)));
    const gauss = twoSquares(p);
    const signedA = gauss ? ((gauss.a + gauss.b) % 4 === 1 ? gauss.a : -gauss.a) : null;
    let pairsSame = 0, pairsOpp = 0, pairsZero = 0;
    for (let x = 1; x <= (p - 1) / 2; x++) {
      const q = chi[x] * chi[p - x];
      if (q > 0) pairsSame++; else if (q < 0) pairsOpp++; else pairsZero++;
    }
    const frobDisc = ap * ap - 4 * p;                // discriminant of T² − aₚT + p
    return {
      curve: cid, p, f, chi, walk, up, down, roots, spinSum: s, ap, count, affine: count - 1, bad,
      bound, cos, theta, thetaDeg: theta === null ? null : theta / DEG, minusOne: legendre(p - 1, p),
      pclass: p % 4 === 1 ? 'split' : 'inert', gauss, signedA, pell: pellFundamental(p),
      pairsSame, pairsOpp, pairsZero, frobDisc, field: squarefree(frobDisc), guSquare: isSquare(-frobDisc),
      gou: ap / 2, gu: Math.sqrt(p - ap * ap / 4)
    };
  }
  /** aₚ alone (for the histogram over 5 ≤ p ≤ 997). */
  function apOf(cid, p) {
    const c = CURVES[cid];
    let s = 0;
    for (let x = 0; x < p; x++) s += legendre(fMod(c, x, p), p);
    return -s;
  }
  /** Cumulative distribution of the limiting θₚ measure on [0, π]: CM ½δ(π/2) + dθ/2π, Sato–Tate (2/π) sin²θ dθ. */
  const thetaCdf = (cm, t) => (cm ? t / (2 * Math.PI) + (t >= HALF_PI ? 0.5 : 0) : (t - Math.sin(t) * Math.cos(t)) / Math.PI);
  /** θₚ over the primes 5 ≤ p ≤ 997 of good reduction, binned into ST_BINS bins of 20°, with the limiting expectation. */
  function satoTate(cid) {
    const c = CURVES[cid], wB = Math.PI / ST_BINS;
    const primes = [], aps = [], thetas = [];
    for (const p of ST_PRIMES) {
      if (mod(c.disc, p) === 0) continue;
      const ap = apOf(cid, p);
      primes.push(p); aps.push(ap); thetas.push(Math.acos(Math.max(-1, Math.min(1, ap / (2 * Math.sqrt(p))))));
    }
    const N = thetas.length, counts = new Array(ST_BINS).fill(0);
    for (const t of thetas) counts[Math.min(ST_BINS - 1, Math.floor(t / wB))]++;
    const expected = counts.map((_, i) => N * (thetaCdf(c.cm, (i + 1) * wB) - thetaCdf(c.cm, i * wB)));
    const cos2 = thetas.map((t) => Math.cos(t) ** 2);
    const m2 = cos2.reduce((x, y) => x + y, 0) / N, m4 = cos2.reduce((x, y) => x + y * y, 0) / N;
    return {
      curve: cid, cm: c.cm, N, maxP: primes[primes.length - 1], primes, aps, thetas, counts, expected, binWidth: wB,
      bins: ST_BINS, m2, m4, m2Theory: 0.25, m4Theory: c.cm ? 3 / 16 : 1 / 8
    };
  }

  /* =============================== formatting =============================== */
  const MINUS = '−';
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
  const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  const sup = (s) => String(s).replace(/[0-9-]/g, (c) => SUP[c]);
  const sub = (s) => String(s).replace(/[0-9]/g, (c) => SUB[c]);
  function fx(v, d = 6) {
    if (!Number.isFinite(v)) return v > 0 ? '∞' : '—';
    if (Math.abs(v) < 0.5 * 10 ** -d) v = 0;
    const s = v.toFixed(d);
    return s.startsWith('-') ? MINUS + s.slice(1) : s;
  }
  const sgn = (v, d = 6) => (v > 0 ? '+' : v < 0 ? MINUS : '') + fx(Math.abs(v), d);
  const sint = (n) => (n > 0 ? '+' : n < 0 ? MINUS : '') + Math.abs(n);
  function sci(v, d = 2) {
    if (v === 0) return '0';
    if (!Number.isFinite(v)) return fx(v);
    const e = Math.floor(Math.log10(Math.abs(v)));
    if (e >= -2 && e <= 3) return fx(v, Math.max(d + 1, d - e + 1));
    const m = v / 10 ** e;
    return `${fx(m, d)} × 10${sup(e)}`;
  }
  const CJK = /[　-〿㐀-鿿＀-￯]/;

  const fmtSigned = (x) => (x > 0 ? '+' + x : x < 0 ? MINUS + -x : '0');
  const signCls = (x) => (x > 0 ? 'vpos' : x < 0 ? 'vneg' : 'vzero');
  /** Colour of a norm: cyan only for +1, magenta only for −1, neutral for |Δ| > 1 (as in the map's legend). */
  const unitCls = (x) => (x === 1 ? 'vpos' : x === -1 ? 'vneg' : 'vzero');
  const normCls = (x) => (x === 1 ? 'pos' : x === -1 ? 'neg' : 'zero');

  /* =============================== the Pell ledger, prime splitting and E_d (pure) =============================== */
  const D_MIN = 2, D_MAX = 37, P_MIN = 2, P_MAX = 97, K_MAX = 8, GRID_MIN = 16, GRID_MAX = 1024;
  const isqrt = (n) => { let r = Math.floor(Math.sqrt(n)); while (r * r > n) r--; while ((r + 1) * (r + 1) <= n) r++; return r; };
  const isSquarefree = (n) => n >= 1 && factorize(n).every(([, e]) => e === 1);
  const SQUAREFREE = Object.freeze(Array.from({ length: D_MAX - D_MIN + 1 }, (_, i) => D_MIN + i).filter(isSquarefree));
  const LEDGER_PRIMES = Object.freeze(primesUpTo(P_MAX).filter((p) => p >= P_MIN));          // 2, 3, 5, …, 97

  /** Continued fraction of √d (d not a square) with its convergents mᵢ/nᵢ (BigInt) and norms mᵢ² − d nᵢ² = (−1)^(i+1) Qᵢ₊₁.
      Runs for at least `terms` rows, past the first period, and until mᵢ exceeds `mBound`. */
  function sqrtCF(d, terms = K_MAX + 1, mBound = 0) {
    const a0 = isqrt(d), BD = BigInt(d), bound = BigInt(mBound);
    let P = 0, Qd = 1, h2 = 0n, h1 = 1n, k2 = 1n, k1 = 0n, period = 0;
    const rows = [];
    for (let i = 0; i < 400 && (i < terms || h1 <= bound || !period); i++) {
      const a = Math.floor((a0 + P) / Qd);
      const m = BigInt(a) * h1 + h2, n = BigInt(a) * k1 + k2;
      const Pn = a * Qd - P, Qn = (d - Pn * Pn) / Qd;
      rows.push({ i, a, P, Q: Qd, m, n, norm: m * m - BD * n * n, Qn });
      if (!period && i >= 1 && a === 2 * a0) period = i;
      [h2, h1, k2, k1] = [h1, m, k1, n];
      P = Pn; Qd = Qn;
    }
    return { d, a0, rows, period };
  }
  /** The eight ledger steps of √d: step j shows the convergent C_(j−1) with its partial quotient and exact norm. */
  function pellLedger(d) {
    const cf = sqrtCF(d, K_MAX + 1), sd = Math.sqrt(d);
    const steps = cf.rows.slice(0, K_MAX).map((r, j) => {
      const m = Number(r.m), n = Number(r.n), norm = Number(r.norm);
      return {
        step: j + 1, a: r.a, m: r.m.toString(), n: r.n.toString(), mNum: m, nNum: n, norm, unit: Math.abs(norm) === 1,
        approx: m / n, err: norm / (n * (m + n * sd)), Qn: r.Qn                    // m/n − √d = Δ/(n(m + n√d)), exactly
      };
    });
    const f = cf.rows[cf.period - 1];
    return {
      d, a0: cf.a0, period: cf.period, quotients: cf.rows.slice(0, cf.period + 1).map((r) => r.a), steps,
      fund: { m: f.m.toString(), n: f.n.toString(), norm: Number(f.norm), step: cf.period }, negSolvable: cf.period % 2 === 1
    };
  }
  /** The heat-map grid side: the smallest power of two ≥ 16 that holds m (at most 1024). */
  function gridSize(m) { let N = GRID_MIN; while (N <= m && N < GRID_MAX) N *= 2; return N; }
  /** Every lattice cell (n, m) with 0 ≤ n, m < N and m² − d n² = ±1. */
  function unitCells(d, N) {
    const out = [];
    for (let n = 0; n < N; n++) for (const s of [1, -1]) {
      const v = d * n * n + s;
      if (v < 0) continue;
      const m = isqrt(v);
      if (m * m === v && m < N) out.push({ n, m, s });
    }
    return out;
  }

  /** How p behaves in ℤ[i]: ramified (2), split (p ≡ 1 mod 4: p = a² + b², a odd) or inert (p ≡ 3 mod 4). */
  function primeSplit(p) {
    const qr = new Set();
    for (let x = 1; x < p; x++) qr.add((x * x) % p);
    const minusOne = (p - 1) % p, roots = [];
    for (let x = 0; x < p; x++) if ((x * x) % p === minusOne) roots.push(x);
    let a = null, b = null;
    if (p === 2) { a = 1; b = 1; } else { const g = twoSquares(p); if (g) { a = g.a; b = g.b; } }
    const cls = p === 2 ? 'ramified' : p % 4 === 1 ? 'split' : 'inert';
    const tri = a === null ? null : { leg1: Math.abs(a * a - b * b), leg2: 2 * a * b, hyp: p };
    const area = tri ? a * b * Math.abs(a * a - b * b) : 0;
    const core = area ? squarefree(area) : 0;
    return {
      p, cls, mod4: p % 4, a, b, roots, minusOneSquare: roots.length > 0, qr: [...qr].sort((x, y) => x - y), tri,
      area, areaCore: core, areaScale: core ? isqrt(area / core) : 0
    };
  }

  /** E_d: y² = x³ − d²x over 𝔽ₚ: #E by counting every (x, y), aₚ = p + 1 − #E, and the Frobenius cosine aₚ/(2√p). */
  function frobE(d, p) {
    const A = -d * d, sq = new Array(p).fill(0);
    for (let y = 0; y < p; y++) sq[(y * y) % p]++;
    let count = 1;                                                       // the point at infinity
    for (let x = 0; x < p; x++) count += sq[mod(x * x * x + A * x, p)];
    const ap = p + 1 - count, bad = (2 * d) % p === 0;                   // Δ(E_d) = 64 d⁶: bad exactly at p | 2d
    const bound = 2 * Math.sqrt(p), cos = ap / bound;
    const theta = bad ? null : Math.acos(Math.max(-1, Math.min(1, cos)));
    let spinAp = null;
    if (p > 2) { let s = 0; for (let x = 0; x < p; x++) s += legendre(mod(x * x * x + A * x, p), p); spinAp = -s; }
    return {
      d, p, ap, count, bad, bound, cos, theta, thetaDeg: theta === null ? null : theta / DEG, hasse: Math.abs(ap) <= bound,
      spinAp, twist: p > 2 && !bad ? legendre(d, p) : null, p0: bad ? null : cos * cos, p1: bad ? null : 1 - cos * cos
    };
  }

  /* exact rationals [num, den] (BigInt, den > 0, lowest terms) */
  const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
  const rat = (n, dd = 1n) => { n = BigInt(n); dd = BigInt(dd); if (dd < 0n) { n = -n; dd = -dd; } const g = bgcd(n, dd) || 1n; return [n / g, dd / g]; };
  const qParse = (s) => { const [a, b] = String(s).split('/'); return rat(a, b === undefined ? 1n : b); };
  const qAdd = ([a, b], [c, e]) => rat(a * e + c * b, b * e);
  const qSub = ([a, b], [c, e]) => rat(a * e - c * b, b * e);
  const qMul = ([a, b], [c, e]) => rat(a * c, b * e);
  const qDiv = ([a, b], [c, e]) => rat(a * e, b * c);
  const qAbs = ([a, b]) => [a < 0n ? -a : a, b];
  const qEq = (x, y) => x[0] === y[0] && x[1] === y[1];
  const qStr = ([a, b]) => (a < 0n ? MINUS + -a : String(a)) + (b === 1n ? '' : '/' + b);
  const qNum = ([a, b]) => Number(a) / Number(b);

  /** One rational point (x, y), y ≠ 0, on E_d: y² = x³ − d²x for every congruent d ≤ 37 (found by a 2-descent search;
      the page re-checks each one exactly). Any such point gives a rational right triangle of area d. */
  const WITNESS = Object.freeze({
    5: ['25/4', '75/8'], 6: ['18', '72'], 7: ['25', '120'], 13: ['4225/36', '272935/216'], 14: ['18', '48'], 15: ['25', '100'],
    21: ['147', '1764'], 22: ['2178', '101640'], 23: ['42025/289', '8506680/4913'], 29: ['142129/4900', '1082367/343000'],
    30: ['45', '225'], 31: ['1681/49', '29520/343'], 34: ['578', '13872'], 37: ['-1764/21025', '32672766/3048625']
  });
  /** Tunnell's counts: d odd: A = #{x² + 2y² + 8z² = d}, B = #{x² + 2y² + 32z² = d}; d even: the same with 4y² and d/2. */
  function tunnell(d) {
    const reps = (n, b, c) => {
      let r = 0;
      const R = isqrt(n);
      for (let x = -R; x <= R; x++) for (let y = -R; y <= R; y++) {
        const rest = n - x * x - b * y * y;
        if (rest < 0 || rest % c) continue;
        const z2 = rest / c, z = isqrt(z2);
        if (z * z === z2) r += z ? 2 : 1;
      }
      return r;
    };
    const odd = d % 2 === 1, n = odd ? d : d / 2, b = odd ? 2 : 4;
    const A = reps(n, b, 8), B = reps(n, b, 32);
    return { A, B, equal: A === 2 * B };
  }
  /** The congruent-number data of d: the stored point, the triangle a = |(x² − d²)/y|, b = |2dx/y|, c = |(x² + d²)/y|
      with exact checks, and the translate by the 2-torsion point (0, 0), which lies on the bounded oval and gives the
      same triangle. */
  function congruentOf(d) {
    const tn = tunnell(d), w = WITNESS[d];
    if (!w) return { d, congruent: false, tunnell: tn };
    const x = qParse(w[0]), y = qParse(w[1]), D = rat(d), D2 = qMul(D, D), x2 = qMul(x, x);
    const onE = (px, py) => qEq(qMul(py, py), qSub(qMul(qMul(px, px), px), qMul(D2, px)));
    const a = qAbs(qDiv(qSub(x2, D2), y)), b = qAbs(qDiv(qMul(rat(2 * d), x), y)), c = qAbs(qDiv(qAdd(x2, D2), y));
    const ex = x[0] < 0n ? x : qDiv(qSub(rat(0), D2), x), ey = x[0] < 0n ? y : qDiv(qMul(D2, y), x2);
    return {
      d, congruent: true, tunnell: tn, x: qStr(x), y: qStr(y), a: qStr(a), b: qStr(b), c: qStr(c),
      xNum: qNum(x), yNum: qNum(y), aNum: qNum(a), bNum: qNum(b), cNum: qNum(c),
      egg: { x: qStr(ex), y: qStr(ey), xNum: qNum(ex), yNum: qNum(ey), onCurve: onE(ex, ey) },
      onCurve: onE(x, y), pyth: qEq(qAdd(qMul(a, a), qMul(b, b)), qMul(c, c)), area: qEq(qDiv(qMul(a, b), rat(2)), D)
    };
  }

  /* the earlier tables, built on first use (probes and self-test only) */
  let FROB_OLD = null, ST_OLD = null, PELL_OLD = null, GONS_OLD = null;
  const frobTables = () => FROB_OLD || (FROB_OLD = Object.freeze({ E1: new Map(PRIMES.map((p) => [p, frobRow('E1', p)])), E2: new Map(PRIMES.map((p) => [p, frobRow('E2', p)])) }));
  const stTables = () => ST_OLD || (ST_OLD = Object.freeze({ E1: satoTate('E1'), E2: satoTate('E2') }));
  const pellOld = () => PELL_OLD || (PELL_OLD = pellRows(7));
  const gonsOld = () => GONS_OLD || (GONS_OLD = gonRows());
  const binOf = (theta) => Math.min(ST_BINS - 1, Math.floor(theta / (Math.PI / ST_BINS)));
  /* names proposed for this page that are not declarations of trureturing at the pinned commit; never shown as LEAN ✓ */
  const LEAN_REQUESTED_ABSENT = Object.freeze(['Trigonometric_pythagorean_identity', 'AdditiveNumberTheory_exists_infinite_primes', 'AdditiveNumberTheory_sum_four_squares', 'QuantumGates_hadamard_self_inverse']);

  /* =============================== state =============================== */
  const VIEWS = ['pell', 'primes', 'elliptic'];
  const DEFAULTS = Object.freeze({ d: 2, p: 13, k: 4, view: 'pell' });
  const PRESETS_PAGE = Object.freeze({ 'd=2': { d: 2, view: 'pell' }, 'd=5': { d: 5, view: 'pell' }, 'd=6': { d: 6, view: 'elliptic' }, 'p=13': { p: 13, view: 'primes' }, 'p=7': { p: 7, view: 'primes' } });
  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  const num = (x, fb) => { const n = Number(x); return x !== null && x !== '' && Number.isFinite(n) ? n : fb; };
  /** Snap v into a sorted list: dir > 0 → the first entry ≥ v, dir < 0 → the last entry ≤ v, else the nearest (ties go up). */
  function snapTo(list, v, dir = 0) {
    v = clamp(v, list[0], list[list.length - 1]);
    if (dir > 0) return list.find((x) => x >= v);
    if (dir < 0) return [...list].reverse().find((x) => x <= v);
    let best = list[0];
    for (const x of list) if (Math.abs(x - v) <= Math.abs(best - v)) best = x;
    return best;
  }
  const stepIn = (list, v, k) => list[clamp(list.indexOf(v) + k, 0, list.length - 1)];
  const qs = new URLSearchParams(location.search);
  const S = {
    d: qs.has('d') ? snapTo(SQUAREFREE, num(qs.get('d'), DEFAULTS.d)) : DEFAULTS.d,
    p: qs.has('p') ? snapTo(LEDGER_PRIMES, num(qs.get('p'), DEFAULTS.p)) : DEFAULTS.p,
    k: qs.has('k') ? clamp(Math.round(num(qs.get('k'), DEFAULTS.k)), 1, K_MAX) : DEFAULTS.k,
    view: VIEWS.includes(qs.get('view')) ? qs.get('view') : DEFAULTS.view,
    playing: false, hover: null
  };
  const memo = (map, key, fn) => { if (!map.has(key)) map.set(key, fn()); return map.get(key); };
  const ledgers = new Map(), splits = new Map(), frobs = new Map(), congs = new Map(), units = new Map(), convs = new Map();
  const ledgerOf = (d) => memo(ledgers, d, () => pellLedger(d));
  const splitOf = (p) => memo(splits, p, () => primeSplit(p));
  const frobOf = (d, p) => memo(frobs, `${d},${p}`, () => frobE(d, p));
  const congOf = (d) => memo(congs, d, () => congruentOf(d));
  const unitsOf = (d, N) => memo(units, `${d},${N}`, () => unitCells(d, N));
  /** The convergents of √d (and the seed 1/0) with m below N, as "m,n" keys. */
  const convKeys = (d, N) => memo(convs, `${d},${N}`, () => new Set(['1,0', ...sqrtCF(d, 1, N).rows.map((r) => `${r.m},${r.n}`)]));
  let R = null;
  function fresh() {
    if (!R || R.d !== S.d || R.p !== S.p) R = { d: S.d, p: S.p, L: ledgerOf(S.d), sp: splitOf(S.p), fr: frobOf(S.d, S.p), cg: congOf(S.d) };
    return R;
  }
  const cur = () => fresh().L.steps[S.k - 1];
  const isPrime = (n) => LEDGER_PRIMES.includes(n);
  const canSwap = () => S.p <= D_MAX && isPrime(S.d);
  let frames = 0, pending = false, built = '', shown = '', scrolled = '';
  const rng = TRV.mulberry32(20261111);

  /* ---------- formatting ---------- */
  const unitStr = (f, d) => `${f.m} + ${f.n === '1' ? '' : f.n}√${d}`;
  const shortQ = (s, n) => (s.length <= 11 ? s : '≈ ' + (n >= 100 ? n.toFixed(1) : n.toPrecision(4)));
  function cfStr(Lg) {
    const q = Lg.quotients, per = q.slice(1, Lg.period + 1).join(', ');
    return `√${Lg.d} = [${q[0]}; <span class="per">${per}</span>]`;
  }
  const clsName = (sp) => (sp.cls === 'split' ? L('分裂 · 面素数', 'split · plane prime') : sp.cls === 'inert' ? L('惰性 · 线素数', 'inert · line prime') : L('分歧 · 2 = −i(1 + i)²', 'ramified · 2 = −i(1 + i)²'));
  const gaussPair = (a, b) => `(${a} + ${b === 1 ? '' : b}i)(${a} ${MINUS} ${b === 1 ? '' : b}i)`;

  /* =============================== ledger =============================== */
  function buildLedger() {
    const { d, p, L: Lg, sp, fr, cg } = fresh();
    const el = $('ledger');
    const w = (key) => Math.max(3, ...Lg.steps.map((s) => s[key].length));
    el.style.setProperty('--qw', '4.8ch');
    el.style.setProperty('--mw', `${w('m') + 1.6}ch`);
    el.style.setProperty('--nw', `${w('n') + 1.6}ch`);
    const rows = [];
    rows.push(`<div class="drow hdr" aria-hidden="true"><span class="lab">${L('步', 'step')}</span><div class="cells"><span>aᵢ<small>${L('部分商', 'quot.')}</small></span><span>mᵢ<small>${L('分子', 'num.')}</small></span><span>nᵢ<small>${L('分母', 'den.')}</small></span></div><span class="what">Δ = m² ${MINUS} ${d}n² · m/n</span></div>`);
    rows.push(`<div class="drow input" role="listitem"><span class="lab">√${d}</span><div class="cells"><span class="dq">${Lg.a0}</span><span class="dn">—</span><span class="dn">—</span></div><span class="what"><code>${cfStr(Lg)}</code><span class="name">${L(`周期 ${Lg.period} · 基本单位 ${unitStr(Lg.fund, d)}，范数 ${fmtSigned(Lg.fund.norm)}`, `period ${Lg.period} · fundamental unit ${unitStr(Lg.fund, d)}, norm ${fmtSigned(Lg.fund.norm)}`)}</span></span></div>`);
    rows.push(`<div class="drow sum" role="listitem"><span class="lab">#0</span><div class="cells"><span class="dq">—</span><span class="d1">1</span><span class="d1">0</span></div><span class="what"><span class="sgn pos">+1</span><code>1² ${MINUS} ${d}·0² = +1</code><span class="name">${L('平凡单位：种子', 'trivial unit: the seed')}</span></span></div>`);
    Lg.steps.forEach((s) => {
      const dc = s.norm === 1 ? 'd1' : s.norm === -1 ? 'd2' : 'dn';
      const tag = s.step === Lg.period ? ` · ${L('基本解', 'fundamental solution')}` : s.unit ? '' : ` · ${L('|Δ| > 1，非单位', '|Δ| > 1, not a unit')}`;
      rows.push(`<div class="drow pass" role="listitem" data-pass="${s.step}"><span class="lab">#${s.step}</span><div class="cells"><span class="dq">${s.a}</span><span class="${dc} touch">${s.m}</span><span class="${dc} touch">${s.n}</span></div><span class="what"><span class="sgn ${normCls(s.norm)}">${fmtSigned(s.norm)}</span><code>${s.m}/${s.n} ≈ ${s.approx.toFixed(7)}</code><span class="name">|m/n ${MINUS} √${d}| = ${sci(Math.abs(s.err), 2)}${tag}</span></span></div>`);
    });
    const pcls = sp.cls === 'split' ? 'pos' : sp.cls === 'inert' ? 'neg' : 'zero';
    const pcode = sp.cls === 'inert' ? `x² ≡ ${MINUS}1 (mod ${p}): ∅` : `${p} = ${sp.a}² + ${sp.b}² = ${gaussPair(sp.a, sp.b)}`;
    const apTxt = fr.bad ? `a${sub(p)} = ${fmtSigned(fr.ap)} · ${L('坏约化 p | 2d', 'bad reduction p | 2d')}` : `a${sub(p)} = ${fmtSigned(fr.ap)}, |a${sub(p)}| ≤ 2√${p} <span class="${fr.hasse ? 'okmark' : 'badmark'}">${fr.hasse ? '✓' : '✗'}</span>`;
    const cgTxt = cg.congruent ? `(${shortQ(cg.a, cg.aNum)}, ${shortQ(cg.b, cg.bNum)}, ${shortQ(cg.c, cg.cNum)}) · ab/2 = ${d}` : L(`${d} 不是同余数`, `${d} is not congruent`);
    rows.push(`<div class="drow final" role="listitem"><span class="lab">p=${p}</span><div class="cells"><span class="dq">${p}</span><span class="dn">${sp.a === null ? '—' : sp.a}</span><span class="dn">${sp.b === null ? '—' : sp.b}</span></div><span class="what"><span class="sgn ${pcls}">${p === 2 ? '2' : '≡' + (p % 4)}</span><code>${pcode}</code><span class="name">E<sub>${d}</sub>: ${apTxt} · ${cgTxt}</span></span></div>`);
    el.innerHTML = rows.join('');
    $('tape').innerHTML = Lg.steps.map((s) => `<i class="${normCls(s.norm)}" data-pass="${s.step}" title="#${s.step} Δ = ${fmtSigned(s.norm)}"></i>`).join('');
  }
  function markLedger() {
    $('ledger').querySelectorAll('.drow[data-pass]').forEach((row) => {
      const k = +row.dataset.pass;
      row.classList.toggle('now', k === S.k);
      row.classList.toggle('future', k > S.k);
      row.setAttribute('aria-current', k === S.k ? 'step' : 'false');
    });
    $('tape').querySelectorAll('i').forEach((t) => { const k = +t.dataset.pass; t.classList.toggle('now', k === S.k); t.classList.toggle('future', k > S.k); });
    const st = fresh().L.steps.slice(0, S.k), c = cur();
    const plus = st.filter((s) => s.norm === 1).length, minus = st.filter((s) => s.norm === -1).length;
    $('tapeSum').innerHTML = `${L('至第', 'to step')} ${S.k}${L(' 步', '')}: Δ = <span class="${unitCls(c.norm)}">${fmtSigned(c.norm)}</span> · <span class="vpos">+1</span>×${plus} <span class="vneg">${MINUS}1</span>×${minus}`;
    $('pass').max = String(K_MAX);
    $('pass').value = String(S.k);
    $('passLabel').innerHTML = `${L('第', 'STEP ')}${S.k}${L(' 步', '')} <small>/ ${K_MAX}</small>`;
    $('prev').disabled = $('first').disabled = S.k <= 1;
    $('next').disabled = $('last').disabled = S.k >= K_MAX;
    // keep the current row visible inside the ledger's own scroller (never scroll the page), once per change of step
    const key = `${built}|${S.k}`, wrap = $('sheetWrap'), row = $('ledger').querySelector('.drow.now');
    if (row && key !== scrolled) {
      scrolled = key;
      const top = row.offsetTop - 34, bottom = row.offsetTop + row.offsetHeight + 6;
      if (top < wrap.scrollTop) wrap.scrollTop = top;
      else if (bottom > wrap.scrollTop + wrap.clientHeight) wrap.scrollTop = bottom - wrap.clientHeight;
    }
  }

  /* =============================== readouts and HUD =============================== */
  function readouts() {
    const { d, p, L: Lg, sp, fr, cg } = fresh(), c = cur();
    $('roConv').innerHTML = `${c.m}/${c.n}<span class="sub">≈ ${c.approx.toFixed(9)}</span>`;
    $('roErr').innerHTML = `${sci(Math.abs(c.err), 2)}<span class="sub">= |Δ| / (n(m + n√${d}))</span>`;
    $('roPmod').innerHTML = `${p} ≡ ${p % 4} (mod 4)<span class="sub">${clsName(sp)}</span>`;
    $('roGauss').innerHTML = sp.cls === 'inert'
      ? `—<span class="sub">${L(`x² ≡ ${MINUS}1 (mod ${p}) 无解`, `x² ≡ ${MINUS}1 (mod ${p}) has no root`)}</span>`
      : `${sp.a}² + ${sp.b}²<span class="sub">${gaussPair(sp.a, sp.b)}</span>`;
    $('roAp').innerHTML = `${fmtSigned(fr.ap)}<span class="sub">#E<sub>${d}</sub>(𝔽${sub(p)}) = ${fr.count}</span>`;
    $('roHasse').innerHTML = fr.bad
      ? `—<span class="sub">${L('坏约化：p | 2d', 'bad reduction: p | 2d')}</span>`
      : `${sgn(fr.cos, 6)}<span class="sub">θₚ = ${fr.thetaDeg.toFixed(2)}° · cos²θₚ = ${fx(fr.p0, 4)}</span>`;
    const hero = $('roDeficit');
    hero.textContent = fmtSigned(c.norm);
    hero.className = unitCls(c.norm);
    $('roDeficitSub').innerHTML = `${c.m}² ${MINUS} ${d}·${c.n}² = ${fmtSigned(c.norm)} · ` + (c.unit ? L('±1：最小非零整数间隙', '±1: the least nonzero integer gap') : L('|Δ| > 1：此渐近分数不是佩尔解', '|Δ| > 1: this convergent is not a Pell solution'));
    $('roDeficitMark').textContent = c.unit ? '✓' : '—';
    $('roDeficitMark').className = c.unit ? 'okmark' : 'vzero';
    if (sp.tri && sp.tri.leg1 > 0) {
      const t = sp.tri, ok = t.leg1 ** 2 + t.leg2 ** 2 === t.hyp ** 2 && (sp.a ** 2 + sp.b ** 2) ** 2 - (sp.a ** 2 - sp.b ** 2) ** 2 === (2 * sp.a * sp.b) ** 2;
      const scale = sp.areaScale > 1 ? `${sp.areaCore}·${sp.areaScale}²` : `${sp.areaCore}·1²`;
      $('roPyth').innerHTML = `<b class="vpos">${t.leg1}² + ${t.leg2}² = ${t.hyp}²</b> <span class="${ok ? 'okmark' : 'badmark'}">${ok ? '✓' : '✗'}</span>`
        + `<span class="sub">(${sp.a}² + ${sp.b}²)² ${MINUS} (${sp.a}² ${MINUS} ${sp.b}²)² = (2·${sp.a}·${sp.b})²</span>`
        + `<span class="sub">${L(`面积 ${sp.area} = ${scale}，所以 ${sp.areaCore} 是同余数`, `area ${sp.area} = ${scale}, so ${sp.areaCore} is a congruent number`)}</span>`;
    } else if (sp.tri) {
      $('roPyth').innerHTML = `<b class="vzero">0² + 2² = 2²</b> —<span class="sub">${L('2 = 1² + 1²：a = b，三角形退化', '2 = 1² + 1²: a = b, the triangle degenerates')}</span>`;
    } else {
      $('roPyth').innerHTML = `<b class="vzero">${p} ≠ a² + b²</b> —<span class="sub">${L('惰性素数没有格点直角三角形', 'an inert prime has no lattice right triangle')}</span>`;
    }
    $('roHasseBound').innerHTML = fr.bad
      ? `<b class="vzero">a${sub(p)} = ${fmtSigned(fr.ap)}</b> —<span class="sub">${L('p | 2d：坏约化，哈塞界不适用', 'p | 2d: bad reduction, Hasse’s bound does not apply')}</span>`
      : `<b class="${fr.hasse ? 'vpos' : 'vneg'}">|${fmtSigned(fr.ap)}| ≤ 2√${p} = ${fx(fr.bound, 4)}</b> <span class="${fr.hasse ? 'okmark' : 'badmark'}">${fr.hasse ? '✓' : '✗'}</span>`
        + `<span class="sub">(aₚ/2)² + (p ${MINUS} aₚ²/4) = p · cos²θₚ + sin²θₚ = 1</span>`;
    const pell = L(`√${d} 的周期为 ${Lg.period}，基本单位 ${unitStr(Lg.fund, d)} 的范数为 ${fmtSigned(Lg.fund.norm)}：`, `√${d} has period ${Lg.period}; the fundamental unit ${unitStr(Lg.fund, d)} has norm ${fmtSigned(Lg.fund.norm)}: `)
      + (Lg.negSolvable ? L('单位解的范数在 −1 与 +1 之间交替。', 'the unit norms alternate between −1 and +1.') : L('m² − d n² = −1 无解，单位解的范数恒为 +1。', 'm² − d n² = −1 has no solution and every unit has norm +1.'));
    const ell = cg.congruent
      ? L(` ${d} 是同余数：面积为 ${d} 的有理直角三角形 (${cg.a}, ${cg.b}, ${cg.c})。`, ` ${d} is a congruent number: the rational right triangle (${cg.a}, ${cg.b}, ${cg.c}) has area ${d}.`)
      : L(` ${d} 不是同余数：Tunnell 计数 A = ${cg.tunnell.A} ≠ 2B = ${2 * cg.tunnell.B}（文献结果）。`, ` ${d} is not congruent: Tunnell's counts A = ${cg.tunnell.A} ≠ 2B = ${2 * cg.tunnell.B} (literature result).`);
    $('roNote').textContent = pell + ell;
    $('pillD').innerHTML = `d, p <strong>${d}, ${p}</strong>`;
    $('pillK').innerHTML = `k <strong>${S.k}/${K_MAX}</strong>`;
    $('pillN').innerHTML = `Δ <strong class="${unitCls(c.norm)}">${fmtSigned(c.norm)}</strong>`;
  }
  function hud() {
    const { d, p, sp, fr, cg } = fresh(), c = cur();
    let big, line;
    if (S.view === 'pell') {
      big = `PELL ±1 · √${d} · k = ${S.k}`;
      line = `${c.m}² ${MINUS} ${d}·${c.n}² = ${fmtSigned(c.norm)} · ` + L('一维间隙 → 0，二维间隙 |Δ| ≥ 1', 'the 1D gap → 0, the 2D gap |Δ| ≥ 1');
    } else if (S.view === 'primes') {
      big = `ℤ[i] · p = ${p}`;
      line = sp.cls === 'split' ? `${p} = ${gaussPair(sp.a, sp.b)} · ${sp.roots[0]}² ≡ ${MINUS}1 (mod ${p})`
        : sp.cls === 'ramified' ? `2 = ${MINUS}i(1 + i)² · 1² ≡ ${MINUS}1 (mod 2)`
          : L(`${p} ≡ 3 (mod 4) · x² ≡ −1 无解 · 惰性`, `${p} ≡ 3 (mod 4) · x² ≡ −1 has no root · inert`);
    } else {
      big = `E${sub(d)} : y² = x³ ${MINUS} ${d * d}x`;
      const tri = cg.congruent ? `(${shortQ(cg.a, cg.aNum)}, ${shortQ(cg.b, cg.bNum)}, ${shortQ(cg.c, cg.cNum)}) · ab/2 = ${d}` : L(`${d} 不是同余数 · A = ${cg.tunnell.A}, 2B = ${2 * cg.tunnell.B}`, `${d} is not congruent · A = ${cg.tunnell.A}, 2B = ${2 * cg.tunnell.B}`);
      line = `${tri} · a${sub(p)} = ${fmtSigned(fr.ap)}`;
    }
    if ($('hudBig').textContent !== big) $('hudBig').textContent = big;
    if ($('hudSub').textContent !== line) $('hudSub').textContent = line;
  }

  /* =============================== the stage: one clean diagram per view =============================== */
  const stageCv = $('stageCanvas');
  let labels = [];
  function painter(ctx, dpr) {
    const pal = TRV.palette, mono = TRV.fonts.data;
    const stroke = (col, w, dash, glow) => { ctx.strokeStyle = col; ctx.lineWidth = w * dpr; ctx.setLineDash(dash ? dash.map((v) => v * dpr) : []); if (glow) { ctx.shadowColor = col; ctx.shadowBlur = glow * dpr; } };
    return {
      ctx, dpr, pal,
      line(x1, y1, x2, y2, col, w = 1, dash, glow) { ctx.save(); stroke(col, w, dash, glow); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); },
      path(pts, col, w = 1, dash, glow, close) {
        if (pts.length < 2) return;
        ctx.save(); stroke(col, w, dash, glow); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        if (close) ctx.closePath();
        ctx.stroke(); ctx.restore();
      },
      fillPoly(pts, col) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) ctx.lineTo(p[0], p[1]); ctx.closePath(); ctx.fill(); ctx.restore(); },
      dot(x, y, r, col, glow) { ctx.save(); ctx.fillStyle = col; if (glow) { ctx.shadowColor = col; ctx.shadowBlur = glow * dpr; } ctx.beginPath(); ctx.arc(x, y, r * dpr, 0, 2 * Math.PI); ctx.fill(); ctx.restore(); },
      ring(x, y, r, col, w = 1.5, glow, dash) { ctx.save(); stroke(col, w, dash, glow); ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); },
      rect(x, y, w, h, fill, line, lw = 1, glow, dash) {
        ctx.save();
        if (fill) { ctx.fillStyle = fill; if (glow) { ctx.shadowColor = fill; ctx.shadowBlur = glow * dpr; } ctx.fillRect(x, y, w, h); ctx.shadowBlur = 0; }
        if (line) { stroke(line, lw, dash, glow); ctx.strokeRect(x, y, w, h); }
        ctx.restore();
      },
      text(s, x, y, col, size = 10.5, align = 'left', base = 'middle', weight = 400) {
        ctx.save(); ctx.font = `${weight} ${size * dpr}px ${mono}`; ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = base;
        ctx.fillText(s, x, y); ctx.restore(); labels.push(String(s));
      },
      width(s, size = 10.5, weight = 400) { ctx.save(); ctx.font = `${weight} ${size * dpr}px ${mono}`; const w = ctx.measureText(s).width; ctx.restore(); return w; }
    };
  }
  function drawStage() {
    if (TRV.thumbMode) return;
    const sr = $('stage').getBoundingClientRect();
    if (sr.width < 10 || sr.height < 10) return;
    const dpr = TRV.fitCanvas(stageCv), ctx = stageCv.getContext('2d'), W = stageCv.width, H = stageCv.height;
    labels = [];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = TRV.palette.stage; ctx.fillRect(0, 0, W, H);
    // the free area below the HUD (its height depends on the language and the width)
    const tl = $('hudBig').parentElement.getBoundingClientRect(), tr = $('viewChips').getBoundingClientRect();
    const topCss = Math.min(sr.height * 0.45, Math.max(tl.bottom, tr.bottom) - sr.top + 8);
    const box = { x0: 18 * dpr, y0: topCss * dpr, x1: W - 18 * dpr, y1: H - 12 * dpr };
    const g = painter(ctx, dpr);
    if (S.view === 'pell') drawPell(g, box); else if (S.view === 'primes') drawPrimes(g, box); else drawElliptic(g, box);
  }

  /** Pell ±1. Left: the m × m square filled row by row with d n² unit cells; exactly Δ cells stay empty (Δ > 0) or spill
      over (Δ < 0). Right: the (n, m) plane with m² − d n² = +1 (cyan), = −1 (magenta), the asymptote m = √d·n and the
      convergents so far. */
  function drawPell(g, b) {
    const { dpr, pal } = g, { d, L: Lg } = fresh(), c = cur();
    const Wd = b.x1 - b.x0, Hd = b.y1 - b.y0;
    const m = c.mNum, delta = c.norm, col = delta > 0 ? pal.cyan : pal.magenta;
    const narrow = Wd < 520 * dpr, reserve = (narrow ? 72 : 132) * dpr;
    const lw = narrow ? Wd * 0.46 : Math.min(Wd * 0.5, Hd + 150 * dpr);
    const over = delta < 0 ? Math.ceil(-delta / m) : 0;                       // rows that spill above the square
    const side = Math.max(24 * dpr, Math.min((Hd - 4 * dpr) * m / (m + over), lw - reserve));
    const cs = side / m, sx = b.x0, sy = b.y0 + over * cs + (Hd - side - over * cs) / 2;
    // cells filled by d n² = m² − Δ: full rows from the bottom, then a partial row
    const F = m <= 1e7 ? m * m - delta : null;
    const fullRows = F === null ? (delta > 0 ? m - 1 : m) : Math.min(m, Math.floor(F / m));
    const partial = F === null ? (delta > 0 ? m - delta : 0) : (fullRows < m ? F - fullRows * m : 0);
    g.rect(sx, sy, side, side, TRV.alpha(pal.lineHot, 0.22));
    g.rect(sx, sy + side - fullRows * cs, side, fullRows * cs, TRV.alpha(pal.cyan, 0.16));
    if (partial > 0) g.rect(sx, sy + side - (fullRows + 1) * cs, partial * cs, cs, TRV.alpha(pal.cyan, 0.16));
    if (cs >= 4 * dpr) {
      for (let i = 1; i < m; i++) {
        g.line(sx + i * cs, sy, sx + i * cs, sy + side, TRV.alpha(pal.lineHot, 0.55), 0.6);
        g.line(sx, sy + i * cs, sx + side, sy + i * cs, TRV.alpha(pal.lineHot, 0.55), 0.6);
      }
    }
    g.rect(sx, sy, side, side, null, pal.ink, 1.2);
    // the gap: empty cells (Δ > 0) or cells spilling over the top edge (Δ < 0)
    let gx, gy, gw, gh;
    if (delta > 0) {
      const rowY = sy + side - (fullRows + 1) * cs;
      gx = sx + partial * cs; gy = rowY; gw = (m - partial) * cs; gh = cs;
      if (fullRows + 1 < m) { gy = sy; gh = (m - fullRows) * cs; gx = sx; gw = side; }
    } else {
      const k = -delta;
      gx = sx; gy = sy - over * cs; gw = Math.min(k, m) * cs; gh = over * cs;
      if (over > 1) for (let r = 0; r < over; r++) g.rect(sx, sy - (r + 1) * cs, Math.min(m, k - r * m) * cs, cs, col, null, 1, 8);
    }
    if (over <= 1) g.rect(gx, gy, Math.max(gw, 1.2 * dpr), Math.max(gh, 1.2 * dpr), col, null, 1, 8);
    const rr = Math.max(Math.max(gw, gh) * 0.75, 7 * dpr);
    g.ring(gx + gw / 2, gy + gh / 2, rr, col, 1.4, 10);
    // the numbers beside the square
    const tx = sx + side + 14 * dpr, ty = b.y0 + Hd / 2;
    const m2 = (BigInt(c.m) ** 2n).toString(), dn2 = (BigInt(d) * BigInt(c.n) ** 2n).toString();
    const short = m2.length <= 12;
    if (!narrow) {
      g.text(short ? `m² = ${m2}` : `m = ${c.m}`, tx, ty - 16 * dpr, pal.ink, 10.5);
      g.text(short ? `${d}n² = ${dn2}` : `n = ${c.n}`, tx, ty, pal.dim, 10.5);
    }
    g.text(`Δ = ${fmtSigned(delta)}`, tx, narrow ? ty : ty + 17 * dpr, Math.abs(delta) === 1 ? col : pal.sigma, 12, 'left', 'middle', 600);

    // ----- right: the hyperbolas in the (n, m) plane -----
    const rx0 = b.x0 + lw + 18 * dpr, rx1 = b.x1 - 4 * dpr, ry0 = b.y0 + 6 * dpr, ry1 = b.y1 - 12 * dpr;
    if (rx1 - rx0 < 60 * dpr) return;
    const X = Math.max(c.nNum, 1) * 1.2, Y = Math.max(c.mNum, 1) * 1.2;
    const px = (n) => rx0 + (n / X) * (rx1 - rx0), py = (mm) => ry1 - (mm / Y) * (ry1 - ry0);
    g.line(rx0, ry1, rx1, ry1, pal.lineHot, 1);
    g.line(rx0, ry1, rx0, ry0, pal.lineHot, 1);
    g.text('n', rx1, ry1 + 9 * dpr, pal.dim, 10, 'right');
    g.text('m', rx0 - 8 * dpr, ry0 + 2 * dpr, pal.dim, 10, 'center');
    const sd = Math.sqrt(d), nEnd = Math.min(X, Y / sd);
    g.line(px(0), py(0), px(nEnd), py(nEnd * sd), TRV.alpha(pal.sigma, 0.45), 1, [5, 4]);
    g.text(`m = √${d}·n`, px(nEnd * 0.62) + 8 * dpr, py(nEnd * 0.62 * sd) + 12 * dpr, TRV.alpha(pal.sigma, 0.75), 9.5, 'left');
    const branch = (s) => {
      const pts = [];
      const n0 = s > 0 ? 0 : 1 / sd;
      for (let i = 0; i <= 160; i++) {
        const n = n0 + (X - n0) * (i / 160) ** 1.6, mm = Math.sqrt(d * n * n + s);
        if (mm > Y) break;
        pts.push([px(n), py(mm)]);
      }
      return pts;
    };
    g.path(branch(1), pal.cyan, 1.5, null, 4);
    g.path(branch(-1), pal.magenta, 1.5, null, 4);
    g.dot(px(0), py(1), 2.5, pal.cyan, 6);
    for (const s of Lg.steps.slice(0, S.k)) {
      const x = px(s.nNum), y = py(s.mNum), cc = s.norm === 1 ? pal.cyan : s.norm === -1 ? pal.magenta : pal.dim;
      g.dot(x, y, s.step === S.k ? 3 : 2.4, cc, s.unit ? 6 : 0);
    }
    const ax = px(c.nNum), ay = py(c.mNum);
    g.line(ax, ay, ax, ry1, TRV.alpha(pal.amber, 0.45), 1, [3, 3]);
    g.line(ax, ay, rx0, ay, TRV.alpha(pal.amber, 0.45), 1, [3, 3]);
    g.rect(ax - 6 * dpr, ay - 6 * dpr, 12 * dpr, 12 * dpr, null, pal.amber, 1.6, 10);
    g.text(c.n, ax, ry1 + 9 * dpr, pal.amber, 9.5, 'center');
    g.text(c.m, rx0 + 4 * dpr, ay - 8 * dpr, pal.amber, 9.5, 'left');
  }

  /** Primes p mod 4. Left: the circle of radius √p among the Gaussian integers; on a split prime the lattice points
      (±a, ±b), (±b, ±a) lie on it and a + bi, a − bi are the two diagonals of the a × b rectangle. Right: the residue
      clock mod p: squares in cyan, −1 marked, and the square roots of −1 in amber when they exist. */
  function drawPrimes(g, b) {
    const { dpr, pal } = g, { p, sp } = fresh();
    const Wd = b.x1 - b.x0, Hd = b.y1 - b.y0;
    const lw = Math.min(Wd * 0.5, Hd * 1.25);
    const Rr = Math.ceil(Math.sqrt(p)) + 1, u = (Math.min(lw, Hd) - 6 * dpr) / (2 * Rr);
    const cx = b.x0 + lw / 2, cy = b.y0 + Hd / 2, X = (x) => cx + x * u, Y = (y) => cy - y * u;
    g.line(X(-Rr), cy, X(Rr), cy, pal.lineHot, 1);
    g.line(cx, Y(-Rr), cx, Y(Rr), pal.lineHot, 1);
    for (let x = -Rr; x <= Rr; x++) for (let y = -Rr; y <= Rr; y++) {
      const on = x * x + y * y === p;
      g.dot(X(x), Y(y), on ? 2.8 : 1.1, on ? pal.cyan : TRV.alpha(pal.dim, 0.7), on ? 8 : 0);
    }
    const rad = Math.sqrt(p) * u;
    if (sp.cls === 'inert') {
      g.ring(cx, cy, rad, TRV.alpha(pal.magenta, 0.85), 1.4, 0, [5, 4]);
      let best = Infinity;
      for (let x = -Rr; x <= Rr; x++) for (let y = -Rr; y <= Rr; y++) best = Math.min(best, Math.abs(x * x + y * y - p));
      for (let x = -Rr; x <= Rr; x++) for (let y = -Rr; y <= Rr; y++) if (Math.abs(x * x + y * y - p) === best) g.ring(X(x), Y(y), 4 * dpr, TRV.alpha(pal.magenta, 0.7), 1);
      g.text('∅', cx + rad * 0.72, cy - rad * 0.72, pal.magenta, 13, 'center', 'middle', 600);
    } else {
      g.ring(cx, cy, rad, TRV.alpha(pal.cyan, 0.85), 1.4, 6);
      const a = sp.a, bb = sp.b;
      g.path([[X(0), Y(bb)], [X(a), Y(bb)], [X(a), Y(-bb)], [X(0), Y(-bb)]], TRV.alpha(pal.dim, 0.6), 1, [3, 3]);
      g.fillPoly([[X(0), Y(0)], [X(a), Y(0)], [X(a), Y(bb)]], TRV.alpha(pal.cyan, 0.12));
      g.line(X(0), Y(0), X(a), Y(0), pal.ink, 2);
      g.line(X(a), Y(0), X(a), Y(bb), pal.ink, 2);
      g.line(X(0), Y(0), X(a), Y(bb), pal.cyan, 2, null, 8);
      g.line(X(0), Y(0), X(a), Y(-bb), TRV.alpha(pal.magenta, 0.75), 1.4, [4, 3]);
      const q = Math.min(6 * dpr, u * 0.4);
      g.path([[X(a) - q, Y(0)], [X(a) - q, Y(0) - q], [X(a), Y(0) - q]], pal.ink, 1);
      g.text(String(a), X(a / 2), Y(0) + 9 * dpr, pal.ink, 10, 'center');
      g.text(String(bb), X(a) + 5 * dpr, Y(bb / 2), pal.ink, 10, 'left');
      g.text(`√${p}`, X(a / 2) - 8 * dpr, Y(bb / 2) - 6 * dpr, pal.cyan, 10, 'right');
    }
    // ----- right: the residue clock mod p -----
    const rx0 = b.x0 + lw + 14 * dpr, rw = b.x1 - rx0;
    if (rw < 70 * dpr) return;
    const ccx = rx0 + rw / 2, ccy = b.y0 + Hd / 2, R2 = Math.min(rw, Hd) / 2 - 14 * dpr;
    const at = (x, r = R2) => { const t = -Math.PI / 2 + (2 * Math.PI * x) / p; return [ccx + r * Math.cos(t), ccy + r * Math.sin(t)]; };
    g.ring(ccx, ccy, R2, TRV.alpha(pal.lineHot, 0.9), 1);
    const qr = new Set(sp.qr);
    for (let x = 0; x < p; x++) {
      const [x1, y1] = at(x);
      if (x === 0) g.ring(x1, y1, 3 * dpr, pal.dim, 1);
      else g.dot(x1, y1, qr.has(x) ? 2.1 : 1.3, qr.has(x) ? pal.cyan : TRV.alpha(pal.dim, 0.8), qr.has(x) ? 4 : 0);
    }
    const [mx, my] = at((p - 1) % p);
    if (sp.minusOneSquare) {
      for (const r of sp.roots) { const [x1, y1] = at(r); g.line(x1, y1, mx, my, TRV.alpha(pal.sigma, 0.5), 1.2); g.dot(x1, y1, 3, pal.sigma, 8); }
      g.ring(mx, my, 6 * dpr, pal.cyan, 1.6, 8);
    } else {
      const s = 5 * dpr;
      g.line(mx - s, my - s, mx + s, my + s, pal.magenta, 1.8, null, 6);
      g.line(mx - s, my + s, mx + s, my - s, pal.magenta, 1.8, null, 6);
    }
    const lab = (x, txt, col) => { const [x1, y1] = at(x, R2 + 10 * dpr); g.text(txt, x1, y1, col, 9.5, 'center'); };
    lab(0, '0', pal.dim);
    if (p > 2) lab(p - 1, `${MINUS}1`, sp.minusOneSquare ? pal.cyan : pal.magenta);
    if (sp.minusOneSquare && p > 2) for (const r of sp.roots) lab(r, String(r), pal.sigma);
    g.text(`x² ≡ ${MINUS}1`, ccx, ccy - 7 * dpr, pal.dim, 10, 'center');
    g.text(sp.minusOneSquare ? `x = ${sp.roots.join(', ')}` : '∅', ccx, ccy + 8 * dpr, sp.minusOneSquare ? pal.sigma : pal.magenta, 10.5, 'center', 'middle', 600);
  }

  /** Elliptic E_d. Left: a rational right triangle of area d (or ∅ with Tunnell's counts). Middle: the real curve
      y² = x³ − d²x with its 2-torsion −d, 0, d and the stored rational points. Right: the Frobenius cosine aₚ/(2√p) on the
      unit circle (Hasse: it never leaves [−1, 1]). */
  function drawElliptic(g, b) {
    const { dpr, pal } = g, { d, p, fr, cg } = fresh();
    const Wd = b.x1 - b.x0, Hd = b.y1 - b.y0, three = Wd >= 430 * dpr;
    const fr3 = three ? [0.3, 0.42, 0.28] : [0.42, 0.58, 0];
    const tx0 = b.x0, tw = Wd * fr3[0] - 10 * dpr, ex0 = b.x0 + Wd * fr3[0] + 6 * dpr, ew = Wd * fr3[1] - 12 * dpr;
    // ----- the triangle -----
    if (cg.congruent) {
      const long = Math.max(cg.aNum, cg.bNum), shortL = Math.min(cg.aNum, cg.bNum), aIsLong = cg.aNum >= cg.bNum;
      const sc = Math.min((tw - 22 * dpr) / long, (Hd - 30 * dpr) / shortL);
      const L1 = long * sc, L2 = Math.max(shortL * sc, 2 * dpr);
      const x1 = tx0 + 4 * dpr, x2 = x1 + L1, yb = b.y0 + (Hd + Math.min(L2, Hd - 30 * dpr)) / 2 - 2 * dpr, yt = yb - L2;
      g.fillPoly([[x1, yb], [x2, yb], [x2, yt]], TRV.alpha(pal.cyan, 0.14));
      g.line(x1, yb, x2, yb, pal.ink, 1.8);
      g.line(x2, yb, x2, yt, pal.ink, 1.8);
      g.line(x1, yb, x2, yt, pal.sigma, 1.8, null, 6);
      const q = Math.min(6 * dpr, L2 * 0.45, L1 * 0.2);
      if (q > 2 * dpr) g.path([[x2 - q, yb], [x2 - q, yb - q], [x2, yb - q]], pal.ink, 1);
      g.text(shortQ(aIsLong ? cg.a : cg.b, long), (x1 + x2) / 2, yb + 10 * dpr, pal.ink, 10, 'center');
      g.text(shortQ(aIsLong ? cg.b : cg.a, shortL), x2 - 4 * dpr, yt - 8 * dpr, pal.ink, 10, 'right');
      g.text(shortQ(cg.c, cg.cNum), x1 + L1 * 0.32, yb - L2 * 0.32 - 10 * dpr, pal.sigma, 10, 'center');
      g.text(`ab/2 = ${d}`, x1, b.y0 + 6 * dpr, pal.dim, 9.5, 'left');
    } else {
      const x1 = tx0 + 10 * dpr, x2 = tx0 + tw - 10 * dpr, yb = b.y1 - 16 * dpr, yt = b.y0 + 8 * dpr;
      g.path([[x1, yb], [x2, yb], [x2, yt]], TRV.alpha(pal.dim, 0.55), 1.2, [4, 4], 0, true);
      g.text('∅', (x1 + x2) / 2 + 10 * dpr, (yb + yt) / 2 + 6 * dpr, pal.magenta, 18, 'center', 'middle', 600);
      g.text(`A = ${cg.tunnell.A} ≠ 2B = ${2 * cg.tunnell.B}`, (x1 + x2) / 2, yb + 10 * dpr, pal.dim, 9.5, 'center');
    }
    // ----- the real curve y² = x³ − d²x -----
    const xl = -1.25 * d, xr = 2.1 * d, ymax = Math.sqrt(xr ** 3 - d * d * xr) * 1.04;
    const ey0 = b.y0 + 2 * dpr, eh = Hd - 16 * dpr;
    const PX = (x) => ex0 + ((x - xl) / (xr - xl)) * ew, PY = (y) => ey0 + eh / 2 - (y / ymax) * (eh / 2);
    const fy = (x) => Math.sqrt(Math.max(0, x * x * x - d * d * x));
    g.line(ex0, PY(0), ex0 + ew, PY(0), pal.lineHot, 1);
    g.line(PX(0), ey0, PX(0), ey0 + eh, TRV.alpha(pal.lineHot, 0.6), 1);
    const egg = [];
    for (let i = 0; i <= 120; i++) { const x = -d + d * (1 - Math.cos((Math.PI * i) / 120)) / 2; egg.push([PX(x), PY(fy(x))]); }
    for (let i = 120; i >= 0; i--) { const x = -d + d * (1 - Math.cos((Math.PI * i) / 120)) / 2; egg.push([PX(x), PY(-fy(x))]); }
    g.path(egg, pal.cyan, 1.6, null, 5, true);
    const br = [];
    for (let i = 120; i >= 0; i--) { const x = d + (xr - d) * (i / 120) ** 2; br.push([PX(x), PY(fy(x))]); }
    for (let i = 1; i <= 120; i++) { const x = d + (xr - d) * (i / 120) ** 2; br.push([PX(x), PY(-fy(x))]); }
    g.path(br, pal.cyan, 1.6, null, 5);
    for (const x of [-d, 0, d]) { g.dot(PX(x), PY(0), 2.6, pal.ink); g.text(x < 0 ? `${MINUS}${d}` : String(x), PX(x), PY(0) + 10 * dpr, pal.dim, 9.5, 'center'); }
    if (cg.congruent) {
      const pts = [[cg.egg.xNum, cg.egg.yNum], [cg.egg.xNum, -cg.egg.yNum], [cg.xNum, cg.yNum], [cg.xNum, -cg.yNum]];
      for (const [x, y] of pts) if (x >= xl && x <= xr && Math.abs(y) <= ymax) g.dot(PX(x), PY(y), 3.2, pal.sigma, 9);
    }
    g.text(`E${sub(d)}(ℝ)`, ex0 + 2 * dpr, ey0 + 6 * dpr, pal.dim, 9.5, 'left');
    // ----- the Frobenius cosine on the unit circle -----
    if (!three) return;
    const hx0 = b.x0 + Wd * (fr3[0] + fr3[1]) + 8 * dpr, hw = b.x1 - hx0;
    const rc = Math.min(hw / 2 - 8 * dpr, Hd - 26 * dpr), ccx = hx0 + hw / 2, ccy = b.y0 + rc + 8 * dpr;
    g.line(ccx - rc - 4 * dpr, ccy, ccx + rc + 4 * dpr, ccy, pal.lineHot, 1);
    g.text(`${MINUS}1`, ccx - rc, ccy + 10 * dpr, pal.dim, 9.5, 'center');
    g.text('+1', ccx + rc, ccy + 10 * dpr, pal.dim, 9.5, 'center');
    if (fr.bad) {
      g.ring(ccx, ccy, rc, TRV.alpha(pal.dim, 0.5), 1, 0, [4, 4]);
      g.text(`${p} | ${2 * d}`, ccx, ccy - rc / 2, pal.dim, 10.5, 'center');
      return;
    }
    const ctx = g.ctx;
    ctx.save(); ctx.strokeStyle = TRV.alpha(pal.ink, 0.5); ctx.lineWidth = dpr; ctx.beginPath(); ctx.arc(ccx, ccy, rc, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.restore();
    const th = fr.theta, qx = ccx + rc * Math.cos(th), qy = ccy - rc * Math.sin(th);
    g.line(qx, qy, qx, ccy, TRV.alpha(pal.dim, 0.8), 1, [3, 3]);
    if (fr.ap !== 0) g.line(ccx, ccy, qx, ccy, fr.ap > 0 ? pal.cyan : pal.magenta, 2.6, null, 6);
    g.line(ccx, ccy, qx, qy, pal.amber, 1.6, null, 6);
    g.dot(qx, qy, 3.4, pal.amber, 10);
    ctx.save(); ctx.strokeStyle = TRV.alpha(pal.amber, 0.6); ctx.lineWidth = dpr; ctx.beginPath(); ctx.arc(ccx, ccy, rc * 0.22, -th, 0); ctx.stroke(); ctx.restore();
    g.text(`${fr.thetaDeg.toFixed(1)}°`, ccx + rc * 0.3 * Math.cos(th / 2) + 4 * dpr, ccy - rc * 0.3 * Math.sin(th / 2) - 4 * dpr, pal.amber, 9.5, 'left');
    g.text(sgn(fr.cos, 3), qx, qy - 10 * dpr, fr.ap > 0 ? pal.cyan : fr.ap < 0 ? pal.magenta : pal.sigma, 9.5, 'center');
  }

  /* =============================== the chirality map =============================== */
  const heat = $('heat');
  let geom = null, base = null, lockN = 0;
  function rgb255(name) { return TRV.rgb[name].map((x) => Math.round(x * 255)); }
  function cellColors() {
    const P = rgb255('cyan'), M = rgb255('magenta'), st = rgb255('stage'), lh = rgb255('lineHot');
    const Z = st.map((x, k) => Math.round(x * 0.55 + lh[k] * 0.45));
    return { P, M, Z, Zp: Z.map((x, k) => Math.round(x * 0.9 + P[k] * 0.1)), Zm: Z.map((x, k) => Math.round(x * 0.9 + M[k] * 0.1)) };
  }
  const deltaAt = (d, n, m) => m * m - d * n * n;
  const colorAt = (C, v) => (v === 1 ? C.P : v === -1 ? C.M : v > 0 ? C.Zp : v < 0 ? C.Zm : C.Z);
  function drawBase(Wc, Hc, dpr, g2, d) {
    const cv = document.createElement('canvas'); cv.width = Wc; cv.height = Hc;
    const ctx = cv.getContext('2d'), { ox, oy, s, N } = g2, C = cellColors();
    ctx.fillStyle = TRV.palette.stage; ctx.fillRect(0, 0, Wc, Hc);
    if (s >= 5 * dpr) {
      const gap = Math.max(1, Math.round(s * 0.1));
      for (let m = 0; m < N; m++) for (let n = 0; n < N; n++) {
        ctx.fillStyle = `rgb(${colorAt(C, deltaAt(d, n, m))})`;
        ctx.fillRect(ox + n * s, oy + (N - 1 - m) * s, s - gap, s - gap);
      }
    } else {
      const off = document.createElement('canvas'); off.width = N; off.height = N;
      const octx = off.getContext('2d'), img = octx.createImageData(N, N), px = img.data;
      for (let m = 0; m < N; m++) for (let n = 0; n < N; n++) {
        const c = colorAt(C, deltaAt(d, n, m)), i = 4 * ((N - 1 - m) * N + n);
        px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; px[i + 3] = 255;
      }
      octx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = s < 1;
      ctx.drawImage(off, ox, oy, N * s, N * s);
    }
    ctx.font = `${10 * dpr}px ${TRV.fonts.data}`;
    ctx.fillStyle = TRV.palette.dim;
    const ticks = [0, N / 4, N / 2, (3 * N) / 4];
    ctx.textBaseline = 'top'; ctx.textAlign = 'center';
    for (const t of ticks) ctx.fillText(String(t), ox + (t + 0.5) * s, oy + N * s + 5 * dpr);
    ctx.fillText('n', ox + N * s - 4 * dpr, oy + N * s + 5 * dpr);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    for (const t of ticks) ctx.fillText(String(t), ox - 6 * dpr, oy + (N - 1 - t + 0.5) * s);
    ctx.fillText('m', ox - 6 * dpr, oy + 4 * dpr);
    return cv;
  }
  function drawHeat() {
    if (TRV.thumbMode) { drawCover(); return; }
    const dpr = TRV.fitCanvas(heat), ctx = heat.getContext('2d'), Wc = heat.width, Hc = heat.height, pal = TRV.palette;
    const { d, L: Lg } = fresh(), c = cur();
    const N = lockN || gridSize(c.mNum);                                // a mouse drag keeps the grid it started on
    const pad = { l: 34 * dpr, r: 8 * dpr, t: 8 * dpr, b: 22 * dpr };
    const pw = Wc - pad.l - pad.r, ph = Hc - pad.t - pad.b, s = Math.min(pw / N, ph / N);
    const ox = pad.l + Math.max(0, (pw - N * s) / 2), oy = pad.t + ph - N * s;
    geom = { ox, oy, s, N, dpr, d };
    const key = `${Wc}x${Hc}@${dpr}:${d}:${N}`;
    if (!base || base.key !== key) base = { key, canvas: drawBase(Wc, Hc, dpr, geom, d) };
    ctx.clearRect(0, 0, Wc, Hc);
    ctx.drawImage(base.canvas, 0, 0);
    // the asymptote m = √d·n
    const sd = Math.sqrt(d), nEnd = Math.min(N, N / sd);
    ctx.save(); ctx.strokeStyle = TRV.alpha(pal.sigma, 0.3); ctx.lineWidth = dpr; ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath(); ctx.moveTo(ox, oy + N * s); ctx.lineTo(ox + nEnd * s, oy + N * s - nEnd * sd * s); ctx.stroke(); ctx.restore();
    // ±1 cells stay visible as glowing dots when the cells are small
    const us = unitsOf(d, N);
    if (s < 6 * dpr) {
      for (const u of us) {
        const col = u.s > 0 ? pal.cyan : pal.magenta;
        ctx.save(); ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 6 * dpr;
        ctx.beginPath(); ctx.arc(ox + (u.n + 0.5) * s, oy + (N - 1 - u.m + 0.5) * s, Math.max(1.8 * dpr, s / 2), 0, 2 * Math.PI); ctx.fill(); ctx.restore();
      }
    }
    // the current convergent: amber cross and box
    const inGrid = c.mNum < N && c.nNum < N;
    if (inGrid) {
      const px = ox + (c.nNum + 0.5) * s, py = oy + (N - 1 - c.mNum + 0.5) * s, box = Math.max(s, 8 * dpr);
      ctx.strokeStyle = TRV.alpha(pal.amber, 0.45); ctx.lineWidth = Math.max(1, dpr);
      ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + N * s); ctx.moveTo(ox, py); ctx.lineTo(ox + N * s, py); ctx.stroke();
      ctx.strokeStyle = pal.amber; ctx.lineWidth = 2 * dpr;
      ctx.shadowColor = pal.amber; ctx.shadowBlur = 10 * dpr;
      ctx.strokeRect(px - box / 2, py - box / 2, box, box);
      ctx.shadowBlur = 0;
    }
    const conv = convKeys(d, N), allConv = us.every((u) => conv.has(`${u.m},${u.n}`));
    const plus = us.filter((u) => u.s > 0).length, minus = us.length - plus;
    $('heatCounts').innerHTML = `<span class="vpos">+1</span>: ${plus} · <span class="vneg">${MINUS}1</span>: ${minus} — `
      + L(`每个 ±1 格都是种子 1/0 或 √${d} 的渐近分数 `, `every ±1 cell is the seed 1/0 or a convergent of √${d} `) + `<span class="${allConv ? 'okmark' : 'badmark'}">${allConv ? '✓' : '✗'}</span>`
      + (inGrid ? '' : ` · ${L('当前渐近分数在网格外', 'the current convergent is outside the grid')}`);
    $('heatRange').textContent = `${N} × ${N}`;
    const h = S.hover;
    $('heatHover').innerHTML = h ? `${L('指针', 'pointer')} (m, n) = (${h[1]}, ${h[0]}) → Δ = <span class="${unitCls(deltaAt(d, h[0], h[1]))}">${fmtSigned(deltaAt(d, h[0], h[1]))}</span>` : '&nbsp;';
  }
  /** Thumbnail cover (?thumb=1): the Pell lattice of √d beside the convergent ledger. No words, so one cover serves both
      languages; only digits, the signs ±1 and the amber frame of the current step. */
  function drawCover() {
    TRV.fitCanvas(heat);
    const ctx = heat.getContext('2d'), Wc = heat.width, Hc = heat.height;
    const u = Hc / 720, pal = TRV.palette, mono = TRV.fonts.data;
    geom = null;
    ctx.fillStyle = pal.stage; ctx.fillRect(0, 0, Wc, Hc);
    const glow = ctx.createRadialGradient(Wc * 0.28, Hc * 0.5, 0, Wc * 0.28, Hc * 0.5, Wc * 0.55);
    glow.addColorStop(0, TRV.alpha(pal.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(pal.cyan, 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, Wc, Hc);
    const { d, L: Lg } = fresh(), c = cur();
    // the lattice: n across, m up
    const n = 44, side = 600 * u, s = side / n, ox = 64 * u, oy = (Hc - side) / 2, gap = Math.max(1, s * 0.12), C = cellColors();
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      ctx.fillStyle = `rgb(${colorAt(C, deltaAt(d, x, y))})`;
      ctx.fillRect(ox + x * s, oy + (n - 1 - y) * s, s - gap, s - gap);
    }
    const sd = Math.sqrt(d), nEnd = Math.min(n, n / sd);
    ctx.save(); ctx.strokeStyle = TRV.alpha(pal.sigma, 0.35); ctx.lineWidth = 1.5 * u; ctx.setLineDash([6 * u, 6 * u]);
    ctx.beginPath(); ctx.moveTo(ox, oy + side); ctx.lineTo(ox + nEnd * s, oy + side - nEnd * sd * s); ctx.stroke(); ctx.restore();
    if (c.mNum < n) {
      const px = ox + (c.nNum + 0.5) * s - gap / 2, py = oy + (n - 1 - c.mNum + 0.5) * s - gap / 2;
      ctx.strokeStyle = TRV.alpha(pal.amber, 0.5); ctx.lineWidth = 1.5 * u;
      ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + side); ctx.moveTo(ox, py); ctx.lineTo(ox + side, py); ctx.stroke();
      ctx.strokeStyle = pal.amber; ctx.lineWidth = 3 * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = 16 * u;
      ctx.strokeRect(px - s * 0.75, py - s * 0.75, s * 1.5, s * 1.5); ctx.shadowBlur = 0;
    }
    // the ledger rows #0 … #k
    const rows = [{ lab: '#0', a: '', m: '1', n: '0', norm: 1, sep: true }, ...Lg.steps.slice(0, S.k).map((st) => ({ lab: '#' + st.step, a: String(st.a), m: st.m, n: st.n, norm: st.norm }))];
    const rowH = Math.min(56 * u, side / rows.length), x0 = 760 * u, y0 = oy + (side - rows.length * rowH) / 2;
    const xa = x0 + 96 * u, xm = x0 + 262 * u, xs = x0 + 276 * u, xn = x0 + 290 * u, bx = x0 + 400 * u, frameW = 488 * u;
    ctx.textBaseline = 'middle';
    rows.forEach((r, k) => {
      const y = y0 + k * rowH, cy = y + rowH / 2, last = k === rows.length - 1;
      const col = r.norm === 1 ? pal.cyan : r.norm === -1 ? pal.magenta : pal.faint;
      if (r.norm === 1 || r.norm === -1) { ctx.fillStyle = TRV.alpha(col, r.norm === 1 ? 0.13 : 0.18); ctx.fillRect(x0 + 130 * u, y + 6 * u, 248 * u, rowH - 12 * u); }
      ctx.font = `${17 * u}px ${mono}`; ctx.fillStyle = last ? pal.amber : pal.dim; ctx.textAlign = 'left';
      ctx.fillText(r.lab, x0, cy);
      ctx.font = `${19 * u}px ${mono}`; ctx.fillStyle = pal.dim; ctx.textAlign = 'center';
      if (r.a) ctx.fillText(r.a, xa, cy);
      ctx.font = `600 ${21 * u}px ${mono}`; ctx.fillStyle = last ? pal.amber : r.norm === -1 ? pal.magenta : pal.ink;
      ctx.textAlign = 'right'; ctx.fillText(r.m, xm, cy);
      ctx.textAlign = 'center'; ctx.fillStyle = pal.dim; ctx.fillText('/', xs, cy);
      ctx.textAlign = 'left'; ctx.fillStyle = last ? pal.amber : r.norm === -1 ? pal.magenta : pal.ink; ctx.fillText(r.n, xn, cy);
      ctx.strokeStyle = col; ctx.lineWidth = 1.5 * u; ctx.strokeRect(bx, cy - 14 * u, 62 * u, 28 * u);
      ctx.font = `600 ${16 * u}px ${mono}`; ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.fillText(fmtSigned(r.norm), bx + 31 * u, cy + 1 * u);
      if (r.sep) { ctx.strokeStyle = pal.lineHot; ctx.lineWidth = 1.2 * u; ctx.setLineDash([4 * u, 4 * u]); ctx.beginPath(); ctx.moveTo(x0, y + rowH); ctx.lineTo(x0 + frameW - 24 * u, y + rowH); ctx.stroke(); ctx.setLineDash([]); }
      if (last) {
        ctx.strokeStyle = pal.amber; ctx.lineWidth = 2 * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = 12 * u;
        ctx.strokeRect(x0 - 12 * u, y + 2 * u, frameW, rowH - 4 * u); ctx.shadowBlur = 0;
      }
    });
  }
  function cellAt(ev) {
    if (!geom) return null;
    const r = heat.getBoundingClientRect(), dpr = geom.dpr;
    const px = (ev.clientX - r.left) * dpr, py = (ev.clientY - r.top) * dpr;
    const n = Math.floor((px - geom.ox) / geom.s), m = Math.floor((geom.oy + geom.N * geom.s - py) / geom.s);
    return n >= 0 && m >= 0 && n < geom.N && m < geom.N ? [n, m] : null;
  }
  /** The ledger step whose convergent (n, m) is nearest to the cell (inside the grid). */
  function nearestStep([n, m]) {
    const N = geom ? geom.N : GRID_MAX;
    let best = null, bd = Infinity;
    for (const s of fresh().L.steps) {
      if (s.mNum >= N) continue;
      const dd = (s.nNum - n) ** 2 + (s.mNum - m) ** 2;
      if (dd < bd) { bd = dd; best = s.step; }
    }
    return best;
  }
  let dragging = false, downAt = null;
  const pick = (ev) => { const cell = cellAt(ev); if (cell) { const k = nearestStep(cell); if (k) { stop(); setK(k); } } };
  heat.addEventListener('pointerdown', (ev) => {
    downAt = [ev.clientX, ev.clientY];
    if (ev.pointerType === 'mouse') { dragging = true; lockN = geom ? geom.N : 0; heat.setPointerCapture(ev.pointerId); pick(ev); }
  });
  heat.addEventListener('pointermove', (ev) => { S.hover = cellAt(ev); if (dragging) pick(ev); else schedule(); });
  heat.addEventListener('pointerup', (ev) => {
    if (!dragging && downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) < 8) pick(ev);
    dragging = false; downAt = null; lockN = 0; schedule();
  });
  heat.addEventListener('pointercancel', () => { dragging = false; downAt = null; lockN = 0; schedule(); });
  heat.addEventListener('pointerleave', () => { S.hover = null; schedule(); });

  /* =============================== render loop (batched in one animation frame) =============================== */
  function render() {
    pending = false;
    fresh();
    const key = `${S.d},${S.p},${TRV.lang()}`;
    if (key !== built) { buildLedger(); built = key; }
    const rkey = `${key},${S.k},${S.view}`;
    if (rkey !== shown) { readouts(); hud(); shown = rkey; }
    markLedger();
    $('d').value = $('dNum').value = String(S.d);
    $('p').value = $('pNum').value = String(S.p);
    $('k').value = $('kNum').value = String(S.k);
    $('dDec').disabled = S.d <= SQUAREFREE[0]; $('dInc').disabled = S.d >= SQUAREFREE[SQUAREFREE.length - 1];
    $('pDec').disabled = S.p <= LEDGER_PRIMES[0]; $('pInc').disabled = S.p >= LEDGER_PRIMES[LEDGER_PRIMES.length - 1];
    $('kDec').disabled = S.k <= 1; $('kInc').disabled = S.k >= K_MAX;
    document.querySelectorAll('#presets [data-preset]').forEach((b) => {
      const pr = PRESETS_PAGE[b.dataset.preset];
      b.setAttribute('aria-pressed', String(pr.d !== undefined ? pr.d === S.d : pr.p === S.p));
    });
    document.querySelectorAll('#nChips [data-n]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.n === S.d)));
    document.querySelectorAll('#viewChips [data-view-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewSet === S.view)));
    $('swap').disabled = !canSwap();
    $('play').setAttribute('aria-pressed', String(S.playing));
    $('play').textContent = S.playing ? '❚❚' : '▶';
    drawStage();
    drawHeat();
    frames++;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }

  /** Change the inputs; user changes stop playback. dDir / pDir snap a slider value towards the direction of travel. */
  function setState(o = {}) {
    if (o.d !== undefined) S.d = snapTo(SQUAREFREE, num(o.d, S.d), o.dDir || 0);
    if (o.p !== undefined) S.p = snapTo(LEDGER_PRIMES, num(o.p, S.p), o.pDir || 0);
    if (o.k !== undefined) S.k = clamp(Math.round(num(o.k, S.k)), 1, K_MAX);
    if (o.view !== undefined && VIEWS.includes(o.view)) S.view = o.view;
    stop();
    schedule();
  }
  function setK(k) { S.k = clamp(Math.round(k), 1, K_MAX); schedule(); }

  /* ---------- playback ---------- */
  let timer = null;
  function stop() { if (timer) clearInterval(timer); timer = null; S.playing = false; }
  function play() {
    if (S.k >= K_MAX) S.k = 1;
    S.playing = true;
    timer = setInterval(() => {
      if (S.k >= K_MAX) {
        stop();
        const st = fresh().L.steps, plus = st.filter((s) => s.norm === 1).length, minus = st.filter((s) => s.norm === -1).length, d = S.d;
        TRV.toast($('toast'), L(`√${d}：8 步中范数 +1 出现 <b>${plus}</b> 次、−1 出现 <b>${minus}</b> 次；|Δ| 从不小于 1`, `√${d}: in 8 steps the norm is +1 <b>${plus}</b>× and −1 <b>${minus}</b>×; |Δ| never drops below 1`));
        schedule();
        return;
      }
      S.k++;
      schedule();
    }, TRV.reduceMotion ? 900 : 650);
    schedule();
  }

  /* ---------- controls ---------- */
  $('d').addEventListener('input', (ev) => setState({ d: ev.target.value, dDir: Math.sign(+ev.target.value - S.d) }));
  $('p').addEventListener('input', (ev) => setState({ p: ev.target.value, pDir: Math.sign(+ev.target.value - S.p) }));
  $('k').addEventListener('input', (ev) => setState({ k: ev.target.value }));
  for (const [key, list] of [['d', SQUAREFREE], ['p', LEDGER_PRIMES], ['k', null]]) {
    $(key + 'Num').addEventListener('change', (ev) => setState({ [key]: ev.target.value }));
    $(key + 'Num').addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.target.blur(); });
    $(key + 'Dec').addEventListener('click', () => setState({ [key]: list ? stepIn(list, S[key], -1) : S[key] - 1 }));
    $(key + 'Inc').addEventListener('click', () => setState({ [key]: list ? stepIn(list, S[key], 1) : S[key] + 1 }));
  }
  document.querySelectorAll('#presets [data-preset]').forEach((b) => b.addEventListener('click', () => setState(PRESETS_PAGE[b.dataset.preset])));
  const swap = () => { if (canSwap()) setState({ d: S.p, p: S.d }); };
  $('swap').addEventListener('click', swap);
  $('random').addEventListener('click', () => {
    let d = S.d, p = S.p;
    while (d === S.d && p === S.p) { d = SQUAREFREE[Math.floor(rng() * SQUAREFREE.length)]; p = LEDGER_PRIMES[Math.floor(rng() * LEDGER_PRIMES.length)]; }
    setState({ d, p });
  });
  $('reset').addEventListener('click', () => setState({ ...DEFAULTS }));
  document.querySelectorAll('#nChips [data-n]').forEach((b) => b.addEventListener('click', () => { S.hover = null; setState({ d: +b.dataset.n }); }));
  document.querySelectorAll('#viewChips [data-view-set]').forEach((b) => b.addEventListener('click', () => setState({ view: b.dataset.viewSet })));
  $('first').addEventListener('click', () => { stop(); setK(1); });
  $('prev').addEventListener('click', () => { stop(); setK(S.k - 1); });
  $('next').addEventListener('click', () => { stop(); setK(S.k + 1); });
  $('last').addEventListener('click', () => { stop(); setK(K_MAX); });
  $('play').addEventListener('click', () => { if (S.playing) { stop(); schedule(); } else play(); });
  $('pass').addEventListener('input', (ev) => { stop(); setK(+ev.target.value); });
  $('ledger').addEventListener('click', (ev) => { const row = ev.target.closest('.drow[data-pass]'); if (row) { stop(); setK(+row.dataset.pass); } });
  $('tape').addEventListener('click', (ev) => { const t = ev.target.closest('i[data-pass]'); if (t) { stop(); setK(+t.dataset.pass); } });
  document.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const t = ev.target;
    if (t && (t.closest('input, textarea, select, [contenteditable]') || !$('drawer').hidden)) return;
    if (ev.key === 'ArrowLeft') { stop(); setK(S.k - 1); ev.preventDefault(); }
    else if (ev.key === 'ArrowRight') { stop(); setK(S.k + 1); ev.preventDefault(); }
    else if (ev.key === 'Home') { stop(); setK(1); ev.preventDefault(); }
    else if (ev.key === 'End') { stop(); setK(K_MAX); ev.preventDefault(); }
    else if (ev.key === ' ' && !(t && t.closest('button, a'))) { if (S.playing) { stop(); schedule(); } else play(); ev.preventDefault(); }
    else if (ev.key === 's' || ev.key === 'S') swap();
    else if (ev.key === 'r' || ev.key === 'R') $('random').click();
    else if (ev.key === 'v' || ev.key === 'V') setState({ view: VIEWS[(VIEWS.indexOf(S.view) + 1) % VIEWS.length] });
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch($('app'));
  TRV.onLang(() => { built = ''; shown = ''; schedule(); });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(schedule); ro.observe(heat); ro.observe(stageCv); }

  /* ---------- start ---------- */
  schedule();

  /* =============================== in-page self-test =============================== */
  function cjkVisible() {
    const bad = [];
    const wk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let nd;
    while ((nd = wk.nextNode())) {
      const s = nd.textContent.trim();
      if (!CJK.test(s)) continue;
      const el = nd.parentElement;
      if (!el || el.closest('[hidden]') || el.closest('.langs')) continue;
      let hidden = false;
      for (let a = el; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.opacity === '0' || cs.visibility === 'hidden') { hidden = true; break; } }
      if (hidden || getComputedStyle(el).display === 'none' || (el.offsetParent === null && getComputedStyle(el).position !== 'fixed')) continue;
      bad.push(s.slice(0, 40));
    }
    for (const el of document.querySelectorAll('[aria-label]')) {
      if (/[㐀-鿿]/.test(el.getAttribute('aria-label')) && !el.closest('.langs') && el.offsetParent !== null) bad.push('aria-label: ' + el.getAttribute('aria-label').slice(0, 40));
    }
    if (/[㐀-鿿]/.test(document.title)) bad.push('title: ' + document.title);
    return bad;
  }
  function renderNow() { built = ''; shown = ''; render(); }

  /* Checks of the earlier E₁/E₂ tables (Panel 3 of the previous version), re-derived independently: Legendre symbols
     against the table of squares mod p, point counts by brute force over 𝔽ₚ × 𝔽ₚ. */
  function mode3Checks(ok) {
    const FROB = frobTables(), ST = stTables();
    const near = (x, y, tol) => Math.abs(x - y) <= tol;
    const isP = (n) => n > 1 && factorize(n).length === 1 && factorize(n)[0][1] === 1;
    ok('E₁/E₂: the 44 odd primes 5 … 199', PRIMES.length === 44 && PRIMES[0] === 5 && PRIMES[43] === 199 && PRIMES.every(isP), PRIMES.length);
    for (const cid of CURVE_IDS) {
      const c = CURVES[cid], legBad = [], cntBad = [], hasseBad = [];
      for (const p of PRIMES) {
        const r = FROB[cid].get(p), sq = new Map();
        for (let y = 0; y < p; y++) { const v = (y * y) % p; sq.set(v, (sq.get(v) || 0) + 1); }
        const legOk = r.f.every((v, x) => v === mod(x ** 3 + c.A * x + c.B, p)) && r.chi.every((k, x) => k === (r.f[x] === 0 ? 0 : sq.has(r.f[x]) ? 1 : -1));
        let n = 1;
        for (let x = 0; x < p; x++) { const f0 = r.f[x]; for (let y = 0; y < p; y++) if ((y * y) % p === f0) n++; }
        if (!legOk) legBad.push(p);
        if (n !== r.count || r.ap !== p + 1 - n || r.ap !== -r.chi.reduce((a, b) => a + b, 0)) cntBad.push(p);
        if (!(Math.abs(r.ap) <= r.bound && r.ap * r.ap <= 4 * p && Math.abs(r.cos) <= 1)) hasseBad.push(p);
      }
      ok(`${c.name}: exact Legendre symbols = table of squares, all 44 primes`, legBad.length === 0, legBad.join(','));
      ok(`${c.name}: a_p = p + 1 − #E(𝔽_p) by brute force, all 44 primes`, cntBad.length === 0, cntBad.join(','));
      ok(`${c.name}: Hasse |a_p| ≤ 2√p, all 44 primes`, hasseBad.length === 0, hasseBad.join(','));
    }
    const E1 = FROB.E1, inert = PRIMES.filter((p) => p % 4 === 3), split = PRIMES.filter((p) => p % 4 === 1);
    ok('E₁: a_p = 0 for every p ≡ 3 (mod 4); mirror spins cancel', inert.length === 23 && inert.every((p) => { const r = E1.get(p); return r.ap === 0 && r.theta === HALF_PI && r.chi.every((k, x) => k === -r.chi[(p - x) % p]); }));
    ok('E₁: a_p = 2a for p = a² + b² (a odd, a + b ≡ 1 mod 4), |cos θ_p| = |a|/√p', split.length === 21 && split.every((p) => { const r = E1.get(p), g = r.gauss; return g && r.ap === 2 * r.signedA && Math.abs(r.ap) === 2 * g.a && near(Math.abs(r.cos), g.a / Math.sqrt(p), 1e-15); }));
    ok('Pell norms m² − p n² = −1 (p ≡ 1 mod 4) and +1 (p ≡ 3 mod 4), BigInt', PRIMES.every((p) => { const pl = E1.get(p).pell, nm = BigInt(pl.m) ** 2n - BigInt(p) * BigInt(pl.n) ** 2n; return nm === BigInt(p % 4 === 1 ? -1 : 1) && pl.norm === Number(nm); }));
    ok('E₁: Δ = 64, j = 1728; E₂: Δ = −368, j = −6912/23', CURVES.E1.disc === 64 && CURVES.E1.jNum === 1728 && CURVES.E1.jDen === 1 && CURVES.E2.disc === -368 && CURVES.E2.jNum === -6912 && CURVES.E2.jDen === 23);
    ok('E₂: a_p = 0 exactly at 59, 97, 109, 157 below 200', PRIMES.filter((p) => FROB.E2.get(p).ap === 0).join() === '59,97,109,157');
    for (const cid of CURVE_IDS) {
      const t = ST[cid], cnt = t.counts.reduce((a, b) => a + b, 0), ex = t.expected.reduce((a, b) => a + b, 0);
      ok(`${CURVES[cid].name} Sato–Tate data: ${t.N} good primes 5 … 997, bins and limiting measure sum to N`, t.N === (cid === 'E1' ? 166 : 165) && cnt === t.N && near(ex, t.N, 1e-9) && Math.abs(t.m2 - 0.25) < 0.05);
    }
    ok('E₁ histogram: the 90° bin holds every inert prime p ≤ 997', ST.E1.counts[binOf(HALF_PI)] >= ST.E1.primes.filter((p) => p % 4 === 3).length);
  }

  function runSelfTest() {
    const results = [];
    const ok = (name, cond, detail = '') => { results.push({ name, ok: !!cond, detail: cond ? '' : String(detail) }); };
    const near = (x, y, tol) => Math.abs(x - y) <= tol;

    // the Pell ledger: continued fractions, exact norms, the fundamental unit
    for (const d of SQUAREFREE) {
      const cf = sqrtCF(d, 14), Lg = pellLedger(d);
      ok(`√${d}: hᵢ² − d kᵢ² = (−1)^(i+1) Qᵢ₊₁ for 14 convergents`, cf.rows.every((r) => r.norm === BigInt((r.i % 2 ? 1 : -1) * r.Qn)));
      ok(`√${d}: a ±1 norm appears within 8 steps; the fundamental norm is (−1)^period`, Lg.steps.some((s) => s.unit) && Lg.fund.norm === (Lg.period % 2 ? -1 : 1) && Lg.fund.step <= K_MAX && Lg.steps[Lg.fund.step - 1].norm === Lg.fund.norm);
    }
    ok('Theon: the ledger of √2 is 1/1, 3/2, 7/5, 17/12, 41/29, 99/70, 239/169, 577/408 with norms alternating −1, +1',
      ledgerOf(2).steps.map((s) => `${s.m}/${s.n}`).join(',') === '1/1,3/2,7/5,17/12,41/29,99/70,239/169,577/408' && ledgerOf(2).steps.every((s, i) => s.norm === (i % 2 ? 1 : -1)));
    ok('the ledger of √2 agrees with the Pell rows of the earlier page', pellOld().every((r, i) => String(r.m) === ledgerOf(2).steps[i].m && String(r.n) === ledgerOf(2).steps[i].n && r.diff === ledgerOf(2).steps[i].norm));
    ok('negative Pell is solvable exactly for d = 2, 5, 10, 13, 17, 26, 29, 37 (odd period) in 2 … 37', SQUAREFREE.filter((d) => ledgerOf(d).negSolvable).join() === '2,5,10,13,17,26,29,37');
    ok('errors m/n − √d = Δ/(n(m + n√d)) alternate in sign and shrink (√2, √13)', [2, 13].every((d) => ledgerOf(d).steps.every((s, i, a) => Math.sign(s.err) === Math.sign(s.norm) && (i === 0 || Math.abs(s.err) < Math.abs(a[i - 1].err)))));
    for (const d of [2, 3, 5, 13, 37]) {
      const N = GRID_MAX, us = unitCells(d, N), conv = convKeys(d, N);
      ok(`√${d}: all ${us.length} cells with m² − d n² = ±1 in 0 … ${N - 1} are the seed or convergents`, us.length > 1 && us.every((u) => conv.has(`${u.m},${u.n}`)));
    }

    // primes in ℤ[i]: Fermat's two squares, −1 a square mod p, Lagrange–Gram and the parallelogram law
    ok('25 primes 2 … 97', LEDGER_PRIMES.length === 25 && LEDGER_PRIMES[0] === 2 && LEDGER_PRIMES[24] === 97);
    for (const p of LEDGER_PRIMES) {
      const sp = primeSplit(p);
      const lattice = []; for (let a = 0; a * a <= p; a++) for (let b = 0; b * b <= p; b++) if (a * a + b * b === p) lattice.push([a, b]);
      const lag = sp.a === null || (() => { const u = [sp.a, sp.b], v = [sp.a, -sp.b]; const lhs = (u[0] ** 2 + u[1] ** 2) * (v[0] ** 2 + v[1] ** 2) - (u[0] * v[0] + u[1] * v[1]) ** 2; let rhs = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rhs += (u[i] * v[j] - u[j] * v[i]) ** 2; return lhs === rhs / 2 && lhs === (2 * sp.a * sp.b) ** 2; })();
      // parallelogram law with x = a e₁, y = b e₂: ‖x + y‖² + ‖x − y‖² = (a² + b²) + (a² + (−b)²) = 2(‖x‖² + ‖y‖²) = 2p
      const par = sp.a === null || ((sp.a ** 2 + sp.b ** 2) + (sp.a ** 2 + (-sp.b) ** 2) === 2 * (sp.a ** 2 + sp.b ** 2) && 2 * (sp.a ** 2 + sp.b ** 2) === 2 * p);
      ok(`p = ${p}: ${sp.cls}; p = a² + b² ⇔ p ≢ 3 (mod 4) ⇔ −1 is a square; Lagrange–Gram and parallelogram`,
        (lattice.length > 0) === (p % 4 !== 3) && sp.minusOneSquare === (p % 4 !== 3) && (sp.a === null || sp.a ** 2 + sp.b ** 2 === p) && sp.roots.every((r) => (r * r + 1) % p === 0) && lag && par);
    }

    // E_d over 𝔽ₚ: counts, Hasse, CM and the quadratic twist
    let cnt = 0, hasseBad = [], cmBad = [], twistBad = [], badBad = [];
    for (const d of SQUAREFREE) for (const p of LEDGER_PRIMES) {
      const r = frobE(d, p), r1 = frobE(1, p), sp = splitOf(p);
      cnt++;
      if (r.bad !== ((2 * d) % p === 0)) badBad.push(`${d},${p}`);
      if (!r.bad && !(r.ap * r.ap <= 4 * p)) hasseBad.push(`${d},${p}`);
      if (!r.bad && p > 2 && r.spinAp !== r.ap) hasseBad.push(`spin ${d},${p}`);
      if (!r.bad && sp.cls === 'inert' && r.ap !== 0) cmBad.push(`${d},${p}`);
      if (!r.bad && sp.cls === 'split' && Math.abs(r.ap) !== 2 * sp.a) cmBad.push(`${d},${p}`);
      if (!r.bad && p > 2 && r.ap !== legendre(d, p) * r1.ap) twistBad.push(`${d},${p}`);
    }
    ok(`E_d: bad reduction exactly at p | 2d (${cnt} pairs)`, badBad.length === 0, badBad.join(' '));
    ok(`E_d: Hasse |aₚ| ≤ 2√p and aₚ = −Σ (f(x)/p) at every good pair`, hasseBad.length === 0, hasseBad.join(' '));
    ok('E_d: aₚ = 0 for p ≡ 3 (mod 4) and |aₚ| = 2a for p = a² + b² (a odd)', cmBad.length === 0, cmBad.join(' '));
    ok('E_d: aₚ(E_d) = (d/p)·aₚ(E₁) for p ∤ 2d', twistBad.length === 0, twistBad.join(' '));

    // congruent numbers: stored points, exact triangles and Tunnell's counts
    const cong = SQUAREFREE.filter((d) => congOf(d).congruent);
    ok('14 congruent d ≤ 37: 5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 34, 37', cong.join() === '5,6,7,13,14,15,21,22,23,29,30,31,34,37');
    for (const d of SQUAREFREE) {
      const cg = congOf(d);
      if (cg.congruent) ok(`d = ${d}: the point lies on E_d, its oval translate too, a² + b² = c² and ab/2 = d exactly, A = 2B`, cg.onCurve && cg.egg.onCurve && cg.pyth && cg.area && cg.tunnell.equal && cg.egg.xNum >= -d && cg.egg.xNum <= 0);
      else ok(`d = ${d}: no stored point and Tunnell A = ${cg.tunnell.A} ≠ 2B = ${2 * cg.tunnell.B}`, !cg.tunnell.equal);
    }
    ok('d = 6: the triangle (4, 3, 5) from the point (18, 72)', congOf(6).a === '4' && congOf(6).b === '3' && congOf(6).c === '5');

    // the earlier pure mathematics (Pell rows of √2, angle presets, Liu Hui's polygons, the Dottie number)
    const rows = pellOld();
    ok('seven Pell convergents 1/1 … 239/169', rows.map((x) => `${x.m}/${x.n}`).join(',') === '1/1,3/2,7/5,17/12,41/29,99/70,239/169');
    for (const x of rows) ok(`Pell k = ${x.k}: ${x.m}² − 2·${x.n}² = ${x.diff}; 2-adic parity`, x.m * x.m - 2 * x.n * x.n === (x.k % 2 ? -1 : 1) && x.diff === x.uncovered - x.overlap && x.v2m2 % 2 === 0 && x.v2two % 2 === 1);
    for (const pr of PRESETS) {
      const p = pythagorean(pr.theta), tag = `θ = ${pr.name}`;
      ok(`${tag}: cos²θ + sin²θ = 1, a∧b + b∧a = 0, Lagrange–Gram, parallelogram, Born`, near(p.a2 + p.b2, 1, 1e-15) && p.wedgeSum === 0 && near(p.lagLHS, p.lagRHS, 1e-15) && near(p.plLHS, p.plRHS, 1e-15) && near(p.p0 + p.p1, 1, 1e-15) && near(p.excess, p.zDev + p.residual, 1e-15));
    }
    const gs = gonsOld();
    for (const x of gs) ok(`N = ${x.N}: s_N = 2 sin(π/N); A_2N < π < 2A_2N − A_N`, near(x.s, x.sTrig, 1e-14) && x.area2N < Math.PI && Math.PI < x.upper && x.sagitta > 0);
    ok('Dottie fixed point |cos θ* − θ*| < 1e-12', Math.abs(Math.cos(THETA_STAR) - THETA_STAR) < 1e-12);
    mode3Checks(ok);

    // honesty of the Lean badges
    const cited = [...new Set([...document.querySelectorAll('a[data-lean-gid]')].map((el) => el.dataset.leanGid))].sort();
    const html = document.documentElement.outerHTML;
    ok('LEAN ✓ links cite exactly the four pinned theorems and none of the absent names',
      JSON.stringify(cited) === JSON.stringify([...LEAN_CITED].sort()) && [...LEAN_NOT_FROZEN, ...LEAN_REQUESTED_ABSENT].every((gid) => !html.includes(gid.slice(gid.lastIndexOf('.') + 1))), cited.join(', '));

    // bilingual and responsive (restores the reader's language afterwards)
    const zhN = document.querySelectorAll('.zh').length, enN = document.querySelectorAll('.en').length;
    ok('every .zh fragment has an .en partner', zhN > 0 && zhN === enN, `${zhN} vs ${enN}`);
    const lang0 = TRV.lang(), view0 = S.view;
    TRV.setLang('en');
    let left = [], enLabels = [];
    for (const v of VIEWS) { S.view = v; renderNow(); left = left.concat(cjkVisible()); enLabels = enLabels.concat(labels); }
    ok('English mode: no visible CJK in the DOM, aria-labels, title or stage labels (all three views)', root.dataset.lang === 'en' && left.length === 0 && enLabels.length > 20 && enLabels.every((s) => !CJK.test(s)), left.concat(enLabels.filter((s) => CJK.test(s))).slice(0, 4).join(' | '));
    TRV.setLang('zh'); renderNow();
    ok('Chinese mode: the Chinese title returns', root.dataset.lang === 'zh' && /[㐀-鿿]/.test(document.title));
    TRV.setLang(lang0); S.view = view0; renderNow();
    ok('responsive: no horizontal overflow at the current width', root.scrollWidth - root.clientWidth <= 0, root.scrollWidth - root.clientWidth);
    ok('the stage and the chirality map are laid out and drawn', frames > 0 && [stageCv, heat].every((cv) => cv.width > 10 && cv.clientWidth > 0));

    const failed = results.filter((x) => !x.ok).length;
    return { total: results.length, passed: results.length - failed, failed, results };
  }

  /* =============================== probes =============================== */
  const clone = (x) => JSON.parse(JSON.stringify(x, (k, v) => (v === Infinity ? 'Infinity' : typeof v === 'bigint' ? v.toString() : v instanceof Set ? [...v] : v)));
  /** Thumbnail cover (see drawCover): √2 at step 5, 41/29 with norm −1. */
  window.TRV_THUMB = () => new Promise((resolve) => {
    S.d = 2; S.k = 5; built = ''; shown = '';
    schedule();
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
  const LEAN_INFO = () => ({
    cited: LEAN_CITED.slice(),
    displayed: [...new Set([...document.querySelectorAll('a[data-lean-gid]')].map((el) => el.dataset.leanGid))],
    badges: [...document.querySelectorAll('#evidence .lean .ok')].map((el) => el.textContent),
    requestedNotFrozenAtPin: [...LEAN_NOT_FROZEN, ...LEAN_REQUESTED_ABSENT],
    note: 'Only declarations present and frozen in trureturing at the pinned commit are shown as LEAN ✓.'
  });
  window.PYTHAGORAS_ESCAPE = Object.freeze({
    id: 'pythagoras-number-escape',
    constants: Object.freeze({ thetaStar: THETA_STAR, sqrt2: SQRT2, pi: Math.PI, quatAxis: QUAT_AXIS.slice(), dRange: [D_MIN, D_MAX], pRange: [P_MIN, P_MAX], steps: K_MAX }),
    frames: () => frames,
    pending: () => pending,
    state: () => ({ view: S.view, d: S.d, p: S.p, k: S.k, steps: K_MAX, playing: S.playing, lang: TRV.lang(), grid: gridSize(cur().mNum), canSwap: canSwap() }),
    info: () => { const { d, p, L: Lg, sp, fr, cg } = fresh(); return clone({ d, p, k: S.k, ledger: Lg, current: cur(), split: sp, frob: fr, congruent: cg }); },
    /* the pages's current mathematics */
    squarefree: () => SQUAREFREE.slice(),
    ledgerPrimes: () => LEDGER_PRIMES.slice(),
    sqrtCF: (d, terms) => clone(sqrtCF(Number(d), Number(terms) || K_MAX + 1)),
    ledger: (d) => (SQUAREFREE.includes(Number(d)) ? clone(ledgerOf(Number(d))) : null),
    split: (p) => (LEDGER_PRIMES.includes(Number(p)) ? clone(splitOf(Number(p))) : null),
    frobE: (d, p) => (SQUAREFREE.includes(Number(d)) && LEDGER_PRIMES.includes(Number(p)) ? clone(frobOf(Number(d), Number(p))) : null),
    congruent: (d) => (SQUAREFREE.includes(Number(d)) ? clone(congOf(Number(d))) : null),
    tunnell: (d) => clone(tunnell(Number(d))),
    unitCells: (d, N) => clone(unitCells(Number(d), Number(N))),
    /** m² − d n² over the grid 0 … N − 1 as a string of '+' (Δ = +1), '-' (Δ = −1), '.' (other); index m · N + n. */
    grid: (d, N) => { let out = ''; for (let m = 0; m < N; m++) for (let n = 0; n < N; n++) { const v = deltaAt(d, n, m); out += v === 1 ? '+' : v === -1 ? '-' : '.'; } return out; },
    /** Viewport coordinates of the centre of cell (n, m) of the chirality map (for simulated clicks). */
    cellPoint: (n, m) => {
      if (!geom) return null;
      const r = heat.getBoundingClientRect(), dd = geom.dpr;
      return { x: r.left + (geom.ox + (n + 0.5) * geom.s) / dd, y: r.top + (geom.oy + (geom.N - 1 - m + 0.5) * geom.s) / dd };
    },
    /* the earlier pure mathematics, unchanged */
    presets: () => PRESETS.map((p) => ({ id: p.id, theta: p.theta, deg: p.theta / DEG, name: p.name })),
    pell: () => clone(pellOld()),
    gons: () => clone(gonsOld()),
    tiers: () => clone(TIERS),
    pythagorean: (theta) => clone(pythagorean(Number(theta))),
    curves: () => clone(CURVES),
    primes: () => PRIMES.slice(),
    frob: (cid, p) => { const id = curveId(cid), r = id && frobTables()[id].get(Number(p)); return r ? clone(r) : null; },
    frobTable: (cid) => { const id = curveId(cid); return id ? PRIMES.map((p) => clone(frobTables()[id].get(p))) : null; },
    satoTate: (cid) => { const id = curveId(cid); return id ? clone(stTables()[id]) : null; },
    /* actions */
    set: (o) => setState(o || {}),
    view: (v) => setState({ view: String(v) }),
    step: (k) => { stop(); setK(Number(k)); },
    reset: () => setState({ ...DEFAULTS }),
    labels: () => labels.slice(),
    lean: LEAN_INFO,
    selfTest: () => runSelfTest()
  });
  function verifyMode3() {
    const results = [];
    mode3Checks((name, cond, detail = '') => { results.push({ name, ok: !!cond, detail: cond ? '' : String(detail) }); });
    const failed = results.filter((x) => !x.ok).length;
    return { total: results.length, passed: results.length - failed, failed, results };
  }
  const MODE3 = Object.freeze({
    state: () => { const r = frobOf(S.d, S.p); return { curve: `E${S.d}`, d: S.d, p: S.p, ap: r.ap, count: r.count, bound: r.bound, cos: r.cos, theta: r.theta, thetaDeg: r.thetaDeg, pclass: splitOf(S.p).cls, bad: r.bad }; },
    curves: () => CURVE_IDS.slice(),
    primes: () => PRIMES.slice(),
    setPrime: (p) => { if (!LEDGER_PRIMES.includes(Number(p))) return false; setState({ p: Number(p) }); return true; },
    setD: (d) => { if (!SQUAREFREE.includes(Number(d))) return false; setState({ d: Number(d) }); return true; },
    row: (cid, p) => window.PYTHAGORAS_ESCAPE.frob(cid, p),
    table: (cid) => window.PYTHAGORAS_ESCAPE.frobTable(cid),
    satoTate: (cid) => window.PYTHAGORAS_ESCAPE.satoTate(cid),
    verify: () => verifyMode3()
  });
  window.__vizTest = Object.freeze({
    id: 'pythagoras-number-escape',
    run: () => runSelfTest(),
    count: () => runSelfTest().total,
    lean: LEAN_INFO,
    mode3: MODE3
  });
})();
