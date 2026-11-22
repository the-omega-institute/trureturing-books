/* OMEGA//POLISH · 1854 + 1859 黎曼双璧合龙 · Riemann 1854 + 1859 (Chapter 39, §39.10)
   World (kit.solid): z up. One ball M stands for the manifold of 1854; a ring around it stands for the unit circle of the
   Cayley images u = (ρ − 1)/ρ of the zeros of 1859.
     plates    the 12 tangent planes T_pM at the vertices of a regular icosahedron bound a regular dodecahedron
               r(d) = 1/max⟨d, p⟩; β blends it into the osculating sphere r = 1;
     lantern   the Schwarz lantern with n sides and m = n² tiers inscribed in a cylinder of radius R and height H = R;
     seams     (MODEL) C^∞ ridges of height 0.085 η_K along the 30 seams, η_K = 1 − S_K/S_24 with
               S_K = Σ_{k≤K} 1/(1/4 + γ_k²), the coefficients of the integrated explicit formula on the line;
     spikes    (MODEL) each of the first K zero pairs raises two antipodal bumps of height X^{δ − 1/2} |ρ_1|/|ρ_k|;
     ring      (MODEL chart) the image u = r e^{iθ} is drawn at the angle 40 θ and the radius 1.5 (1 + 120 (r − 1));
     channels  one latitude ring per reduced residue class modulo 7, lifted by its share of the primes up to X.
   A mock off-line pair 1/2 ± δ ± iγ has the four images u_±, conj u_±, where u_+ (‖u_+‖ > 1) is the image of
   1/2 − δ + iγ and u_− = 1/conj u_+ the image of 1/2 + δ + iγ. Their power sums are p_n = 4 cosh(an) cos(θn) and the
   Toeplitz matrix [p_{j−k}] of size 96 × 96 splits by parity into two rank-two forms, so its least eigenvalue is a root
   of a quadratic (quartetLambda). All zero pairs k ≤ K are moved by the same δ; the least eigenvalue is that of k = 1.
   The rail t ∈ [0, 1] is the parameter of the scene: n, β, K, δ or ln X. Every number is computed here; the instances of
   the cited Lean theorems are in instances(), and the NUM box and the numbers of the drawer and of the MODEL box are
   computed once, in benchmarks(). A number is written after “=” only when its digits are the value itself, and after “≈”
   otherwise (rel). Read-only probe: window.RIEMANN_POLISH_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    exp = Math.exp,
    hypot = Math.hypot;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / norm(a));
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));
  const NRM = '<span class="nrm">‖</span>',
    nrm = (x) => NRM + x + NRM;

  /* ---------- exact numbers: fractions [p, q] of integers, q > 0 ----------
     A parameter is the decimal the reader sets: a double that is the nearest one to a multiple of 1/100 (β, δ, ln X) stands
     for that fraction, and every other double (a blend between two cards) stands for itself. Whether a printed decimal is
     the value is decided on the fraction, never on rounded doubles. */
  const frac = (p, q = 1n) => {
    let [a, b] = [p < 0n ? -p : p, q];
    while (b) [a, b] = [b, a % b];
    return [p / a, q / a];
  };
  const whole = (n) => [BigInt(n), 1n],
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d);
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
  const cent = (x) => grid(x, 100);
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
     An inequality of the page stands between exact expressions; a rounded value follows it in a parenthesis of its own. */
  const NB = '\u00a0'; // a sign and its digits stay on one line
  const HALF_Q = [1n, 2n];
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction, or null when it is irrational; x: the value as computed, a double; off: x − 1 where the
      double x has lost it. A fraction counts only while the computed double agrees with it: a page that computes something
      else says what it computes. */
  function rel(q, x, d = 4, off = {}, marks = LANDMARKS) {
    if (q && !(Math.abs(fval(q) - x) <= 1e-9 * Math.max(1, Math.abs(x)))) q = null;
    const { text, exact } = q ? decimals(q, d) : { text: fmt(x, d), exact: false };
    if (exact) return `=${NB}${text}`;
    const mark = marks.find(([v]) => Number(text.replace('−', '-')) === v);
    if (mark) {
      const [v, name] = mark,
        gap = q ? fval(minus(q, ratio(v))) : v in off ? off[v] : x - v;
      if (gap !== 0) return name ? `≈${NB}${name} ${gap < 0 ? '−' : '+'} ${sci(Math.abs(gap))}` : `≈${NB}${sci(gap)}`;
    }
    return `≈${NB}${text}`;
  }
  /** An integer after its sign. */
  const intRel = (n) => `=${NB}${n}`;
  const ZERO_MARK = LANDMARKS.slice(0, 1);
  /** An angle in degrees, and a share in percent: exact only where it is known as a fraction. */
  const degRel = (q, x, d = 2) => `${rel(q, x, d, {}, ZERO_MARK)}°`;
  const pctRel = (q, x, d = 2) => `${rel(q, x, d, {}, ZERO_MARK)}%`;
  /** A factor: ≈ ×4.7037. */
  const timesRel = (x) => rel(null, x).replace(NB, `${NB}×`);
  /** A quantity whose sign matters: below 5·10⁻⁴ four decimals keep one digit at most, so four significant ones are written. */
  const tinyRel = (q, x) => (!q && x !== 0 && Math.abs(x) < 5e-4 ? `≈${NB}${sci(x)}` : rel(q, x));
  /** The least power of ten above a drift x ≥ 0, after its sign; “= 0” of 0 alone. */
  function below(x) {
    if (x === 0) return `=${NB}0`;
    const q = ratio(x);
    let e = Math.ceil(Math.log10(x));
    while (cmp(q, pow10(e)) >= 0) e++;
    while (cmp(q, pow10(e - 1)) < 0) e--;
    return `&lt;${NB}10${superscript(e)}`;
  }
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  /** An exact inequality, then its value in a parenthesis of its own. */
  const valued = (law, r, say = L) => law + say(`（值 ${r}）`, ` (value ${r})`);

  /* ---------- 1859: the first 24 zeros, their Cayley images and the Toeplitz form of a mock pair ---------- */
  /** Ordinates γ_k of the first 24 zeros of ζ (tabulated decimals; the real part 1/2 is put in by hand). */
  const GAMMA = [
    14.134725141734695, 21.022039638771556, 25.01085758014569, 30.424876125859512, 32.93506158773919, 37.586178158825675, 40.9187190121475, 43.327073280915,
    48.00515088116716, 49.7738324776723, 52.970321477714464, 56.44624769706339, 59.34704400260235, 60.83177852460981, 65.1125440480816, 67.07981052949417,
    69.54640171117398, 72.06715767448191, 75.70469069908393, 77.14484006887481, 79.33737502024937, 82.91038085408603, 84.73549298051705, 87.42527461312523
  ];
  const KMAX = GAMMA.length,
    DMAX = 0.4,
    NT = 95;
  const RHO = GAMMA.map((g) => hypot(0.5, g));
  const WEIGHT = GAMMA.map((g) => 1 / (0.25 + g * g));
  /** The factor of ln² X in the dashed envelope of the residual. */
  const ENV = 0.15;
  const CUM = [0];
  WEIGHT.forEach((w, k) => CUM.push(CUM[k] + w));
  /** The seam residual left by the first K pairs: 1 − S_K/S_24. */
  const etaOf = (K) => (K >= KMAX ? 0 : 1 - CUM[K] / CUM[KMAX]);
  /** The images of 1/2 ∓ δ + iγ under u = (ρ − 1)/ρ: one angle, two reciprocal norms. */
  function images(gamma, delta) {
    const lo = (0.5 - delta) ** 2 + gamma * gamma,
      hi = (0.5 + delta) ** 2 + gamma * gamma;
    // hi − lo = 2 δ, so that ln ‖u₊‖ keeps its digits for a small δ
    return { theta: Math.atan2(gamma, gamma * gamma + delta * delta - 0.25), out: Math.sqrt(hi / lo), inn: Math.sqrt(lo / hi), log: 0.5 * Math.log1p((2 * delta) / lo) };
  }
  /** How many of the four images of a pair are distinct: the rank of its Toeplitz matrix, whose size is larger. */
  function distinctImages(gamma, delta) {
    const { theta, out, inn } = images(gamma, delta),
      four = [out, inn].flatMap((r) => [1, -1].map((s) => [r * cs(theta), s * r * sn(theta)]));
    return four.filter((p, i) => !four.slice(0, i).some((q) => hypot(p[0] - q[0], p[1] - q[1]) < 1e-12)).length;
  }
  /** The least eigenvalue of the (N + 1) × (N + 1) Toeplitz matrix of p_n = 4 cosh(an) cos(θn). With s = j − N/2 it is
      4 (A Aᵀ − D Dᵀ) + 4 (B Bᵀ − C Cᵀ), A = cosh cos and D = sinh sin even, B = cosh sin and C = sinh cos odd; each
      difference has one eigenvalue ½(t − √(t² + 4Δ)), t = ‖P‖² − ‖Q‖², Δ the Gram determinant of the two vectors. */
  function quartetLambda(gamma, delta, N = NT) {
    const { theta, log: a } = images(gamma, delta);
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
  const lambdaFirst = (delta) => quartetLambda(GAMMA[0], delta);

  /* ---------- primes up to e^10: ψ, Σ Λ(n)/n, residue classes and characters modulo 7 ---------- */
  const EULER = 0.5772156649015329,
    XMAX = Math.ceil(exp(10)) + 1,
    Q7 = 7,
    CLASSES = [1, 2, 3, 4, 5, 6],
    INDEX7 = { 1: 0, 3: 1, 2: 2, 6: 3, 4: 4, 5: 5 }; // powers of the generator 3 modulo 7
  const ARITH = (() => {
    const comp = new Uint8Array(XMAX + 1),
      lam = new Float64Array(XMAX + 1),
      primes = [];
    for (let p = 2; p <= XMAX; p++) {
      if (comp[p]) continue;
      primes.push(p);
      for (let q = p * p; q <= XMAX; q += p) comp[q] = 1;
      for (let q = p; q <= XMAX; q *= p) lam[q] = Math.log(p);
    }
    const psi = new Float64Array(XMAX + 1),
      over = new Float64Array(XMAX + 1);
    for (let n = 1; n <= XMAX; n++) {
      psi[n] = psi[n - 1] + lam[n];
      over[n] = over[n - 1] + lam[n] / n;
    }
    return { primes, psi, over };
  })();
  const FIRST_LI_MASS = 2 + EULER - Math.log(4 * PI);
  /** The complete inclusive Mangoldt remainder U(t) = t Σ_{n≤t} Λ(n)/n − ψ(t) − t ln t + (1 + γ_E) t. */
  function mangoldtU(t) {
    const n = Math.floor(t);
    return t * ARITH.over[n] - ARITH.psi[n] - t * Math.log(t) + (1 + EULER) * t;
  }
  function trivialT(y) {
    let s = 0;
    for (let n = 1; n <= 400; n++) {
      const term = exp(-2 * n * y) / (2 * n * (2 * n + 1));
      s += term;
      if (term < 1e-18) break;
    }
    return s;
  }
  /** Li(x) = ∫_2^x dt/ln t by the series of li. */
  const liSeries = (x) => {
    const l = Math.log(x);
    let s = EULER + Math.log(l),
      term = 1;
    for (let k = 1; k <= 80; k++) {
      term *= l / k;
      s += term / k;
    }
    return s;
  };
  const LI2 = liSeries(2);
  /** The primes up to X = e^y: their classes modulo 7, the shares 6 π(X; 7, a)/Σ_a π(X; 7, a) and the character sums. */
  function channels(y) {
    const X = exp(y),
      count = [0, 0, 0, 0, 0, 0],
      theta = [0, 0, 0, 0, 0, 0];
    for (const p of ARITH.primes) {
      if (p > X) break;
      if (p === Q7) continue;
      const a = p % Q7;
      count[a - 1]++;
      theta[a - 1] += Math.log(p);
    }
    const total = count.reduce((s, x) => s + x, 0),
      share = count.map((c) => (total ? (6 * c) / total : 0));
    let chi = 0;
    for (let j = 1; j < 6; j++) {
      let re = 0,
        im = 0;
      for (const a of CLASSES) {
        const ang = (TAU * j * INDEX7[a]) / 6;
        re += theta[a - 1] * cs(ang);
        im += theta[a - 1] * sn(ang);
      }
      chi = Math.max(chi, hypot(re, im));
    }
    const li = X > 2 ? liSeries(X) - LI2 : 0;
    return {
      X,
      count,
      total,
      share,
      worst: Math.max(...share.map((s) => Math.abs(s - 1))),
      error: Math.max(...count.map((c) => Math.abs(c - li / 6))) / X,
      chi: chi / X,
      bound: Math.log(Q7 * X) / Math.sqrt(X)
    };
  }

  /* ---------- 1854: the twelve tangent plates and the Schwarz lantern ---------- */
  /** The 12 points of tangency: the vertices of a regular icosahedron with a five-fold axis along z. */
  const SITES = (() => {
    const s = 2 / Math.sqrt(5),
      z = 1 / Math.sqrt(5),
      out = [[0, 0, 1]];
    for (let j = 0; j < 5; j++) out.push([s * cs(72 * j * deg), s * sn(72 * j * deg), z]);
    for (let j = 0; j < 5; j++) out.push([s * cs((72 * j + 36) * deg), s * sn((72 * j + 36) * deg), -z]);
    out.push([0, 0, -1]);
    return out;
  })();
  const touching = (i, j) => i !== j && dot3(SITES[i], SITES[j]) > 0.4;
  const NEIGHBOURS = SITES.map((_, i) => SITES.map((__, j) => j).filter((j) => touching(i, j)));
  /** The corners of the plates: three tangent planes meet in (p_i + p_j + p_k)/⟨p_i + p_j + p_k, p_i⟩. */
  const CORNERS = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++)
      for (let k = j + 1; k < 12; k++)
        if (touching(i, j) && touching(j, k) && touching(i, k)) {
          const s = add(add(SITES[i], SITES[j]), SITES[k]);
          CORNERS.push({ at: scale(s, 1 / dot3(s, SITES[i])), of: [i, j, k] });
        }
  const PLATES = SITES.map((p, i) => {
    const e1 = unit(cross(p, Math.abs(p[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(p, e1);
    const ids = CORNERS.map((c, k) => k).filter((k) => CORNERS[k].of.includes(i));
    ids.sort((a, b) => Math.atan2(dot3(CORNERS[a].at, e2), dot3(CORNERS[a].at, e1)) - Math.atan2(dot3(CORNERS[b].at, e2), dot3(CORNERS[b].at, e1)));
    return { p, ids, poly: ids.map((k) => CORNERS[k].at) };
  });
  const EDGES = [];
  PLATES.forEach((pl, i) =>
    pl.ids.forEach((a, t) => {
      const b = pl.ids[(t + 1) % 5];
      if (a < b) EDGES.push({ a, b, plate: i });
    })
  );
  const ALPHA = Math.acos(dot3(SITES[0], SITES[1])) / 2; // half the angle between neighbouring points of tangency
  const CORNER_R = norm(CORNERS[0].at);
  /** What is left of the first-order plates at the blend β: the jump of the normal across a seam (at its middle), the
      angle defect of a corner, and how far a corner stands out of the sphere. */
  function creaseOf(beta) {
    const r0 = (1 - beta) / cs(ALPHA) + beta,
      jump = 2 * Math.atan(((1 - beta) * sn(ALPHA)) / cs(ALPHA) ** 2 / r0);
    const d = unit(CORNERS[0].at),
      p = SITES[CORNERS[0].of[0]],
      w = dot3(d, p),
      r = (1 - beta) / w + beta;
    // the tangents of the two edges of plate p at the corner: great-circle directions inside the two seam planes
    const tangents = [CORNERS[0].of[1], CORNERS[0].of[2]].map((j) => {
      let t = unit(cross(d, sub(p, SITES[j])));
      if (dot3(t, p) < 0) t = scale(t, -1);
      return unit(add(scale(d, (-(1 - beta) * dot3(t, p)) / (w * w)), scale(t, r)));
    });
    const angle = Math.acos(clamp(dot3(tangents[0], tangents[1]), -1, 1));
    const defect = beta >= 1 ? 0 : TAU - 3 * angle;
    return { jump: beta >= 1 ? 0 : jump / deg, defect: defect / deg, defectSum: (20 * defect) / (4 * PI), drift: (1 - beta) * (CORNER_R - 1) };
  }
  /** The Schwarz lantern with n sides and m tiers inscribed in the cylinder of radius and height 1. */
  function lanternOf(n, m) {
    const sag = 1 - cs(PI / n);
    return { n, m, ratio: (n / PI) * sn(PI / n) * Math.sqrt(1 + (m * sag) ** 2), tilt: Math.atan(m * sag) / deg, gap: sag };
  }
  const LANTERN_LIMIT = Math.sqrt(1 + PI ** 4 / 4),
    TILT_LIMIT = Math.atan((PI * PI) / 2) / deg,
    LIMIT_REL = rel(null, LANTERN_LIMIT),
    PLATE_DRIFT = rel(null, CORNER_R - 1);

  /* ---------- the spikes: two antipodal sites for each zero pair ---------- */
  const GOLDEN = PI * (3 - Math.sqrt(5)),
    SPIKE_S = 0.085;
  const SPIKES = GAMMA.map((_, i) => {
    const z = 0.12 + (0.84 * (i + 0.5)) / KMAX,
      a = -130 * deg + i * GOLDEN,
      r = Math.sqrt(1 - z * z);
    return [r * cs(a), r * sn(a), z];
  });
  const bell = (c) => exp(-(1 - c) / (SPIKE_S * SPIKE_S)); // c = cos of the angle to the site
  const heightOf = (k, delta, y) => (exp((delta - 0.5) * y) * RHO[0]) / RHO[k];

  /* ---------- everything the page shows at (β, K, δ, ln X, n) ---------- */
  const nearestOf = (d) => {
    let best = 0,
      w = -2;
    for (let i = 0; i < 12; i++) {
      const c = dot3(d, SITES[i]);
      if (c > w) {
        w = c;
        best = i;
      }
    }
    return best;
  };
  const compute = (() => {
    let key = '',
      last = null;
    return (beta, K, delta, y, n) => {
      const k2 = [beta, K, delta, y, n].join('/');
      if (k2 === key) return last;
      key = k2;
      const first = images(GAMMA[0], delta),
        perPair = GAMMA.slice(0, K).map((g) => quartetLambda(g, delta));
      const lambda = K ? Math.min(...perPair) : 0;
      let offCircle = 0;
      for (let k = 0; k < K; k++) offCircle = Math.max(offCircle, Math.expm1(images(GAMMA[k], delta).log));
      last = {
        beta,
        K,
        delta,
        sigma: 0.5 + delta,
        y,
        X: exp(y),
        n,
        m: n * n,
        crease: creaseOf(beta),
        lantern: lanternOf(n, n * n),
        eta: etaOf(K),
        first: { theta: first.theta, out: first.out, inn: first.inn, outGap: Math.expm1(first.log), innGap: Math.expm1(-first.log) },
        perPair,
        lambda,
        offCircle,
        rank: K ? distinctImages(GAMMA[0], delta) : 0,
        base: exp(-0.5 * y),
        spike: exp((delta - 0.5) * y),
        envelope: exp(-0.5 * y) * (1 + ENV * y * y),
        channels: channels(y)
      };
      return last;
    };
  })();

  /* ---------- the relations of the page: what is exact, quantity by quantity ---------- */
  const onLine = (m) => m.delta === 0;
  const betaRel = (m) => rel(cent(m.beta), m.beta, 2),
    deltaRel = (m) => rel(cent(m.delta), m.delta, 2),
    sigmaRel = (m) => rel(plus(HALF_Q, cent(m.delta)), m.sigma, 2),
    yRel = (m) => rel(cent(m.y), m.y, 2);
  /** A constant of the page in d decimals, as it stands in a formula. */
  const dec = (x, d = 2) => decimals(grid(x, 10 ** d), d).text;
  // at β = 0 the plates are a regular dodecahedron (three angles of 108° at a corner), at β = 1 one sphere
  const jumpRel = (m) => degRel(m.beta === 1 ? whole(0) : null, m.crease.jump),
    defectRel = (m) => degRel(m.beta === 1 ? whole(0) : m.beta === 0 ? whole(36) : null, m.crease.defect),
    driftRel = (m) => rel(m.beta === 1 ? whole(0) : null, m.crease.drift);
  // 1 − cos(π/n) is rational for n = 3 alone among the n of the rail
  const gapRel = (m) => rel(m.n === 3 ? HALF_Q : null, m.lantern.gap),
    ratioRel = (m) => timesRel(m.lantern.ratio),
    tiltRel = (m) => degRel(null, m.lantern.tilt);
  const etaRel = (m) => rel(m.K === 0 ? whole(1) : m.K === KMAX ? whole(0) : null, m.eta);
  const lamRel = (m) => tinyRel(onLine(m) || m.K === 0 ? whole(0) : null, m.lambda),
    outRel = (m) => rel(onLine(m) ? whole(1) : null, m.first.out, 4, { 1: m.first.outGap }),
    innRel = (m) => rel(onLine(m) ? whole(1) : null, m.first.inn, 4, { 1: m.first.innGap }),
    // the largest ‖u₊‖ of the first K pairs: that of the first
    normRel = (m) => rel(onLine(m) ? whole(1) : null, 1 + m.offCircle, 4, { 1: m.offCircle }),
    offRel = (m) => tinyRel(onLine(m) ? whole(0) : null, m.offCircle);
  // e^{−ry} with r, y rational and not 0 is irrational
  const spikeRel = (m) => rel(null, m.spike),
    baseRel = (m) => rel(null, m.base);
  const worstRel = (m) => {
    const { count, total } = m.channels;
    return pctRel(frac(BigInt(100 * Math.max(...count.map((c) => Math.abs(6 * c - total)))), BigInt(total)), 100 * m.channels.worst);
  };

  /* ---------- the instances of the cited Lean theorems, computed here ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qbar = (a) => [a[0], -a[1], -a[2], -a[3]];
  const kappa = (x, y) => (1 + dot(x, y)) / 2;
  const pure = (v) => [0, v[0], v[1], v[2]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cdiv = (a, b) => {
    const d = b[0] * b[0] + b[1] * b[1];
    return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
  };
  const cexp = (z) => [exp(z[0]) * cs(z[1]), exp(z[0]) * sn(z[1])];
  /** Λ₀(s) = ∫_1^∞ ω(t) (t^{s/2} + t^{(1−s)/2}) dt/t with ω(t) = Σ exp(−πn²t), by Simpson on ln t. */
  function lambda0(s) {
    const T = Math.log(14),
      M = 2400,
      h = T / M;
    let re = 0,
      im = 0;
    for (let i = 0; i <= M; i++) {
      const v = i * h,
        t = exp(v);
      let w = 0;
      for (let n = 1; n <= 8; n++) w += exp(-PI * n * n * t);
      const a = cexp([(s[0] / 2) * v, (s[1] / 2) * v]),
        b = cexp([((1 - s[0]) / 2) * v, (-s[1] / 2) * v]),
        k = (i === 0 || i === M ? 1 : i % 2 ? 4 : 2) * w;
      re += k * (a[0] + b[0]);
      im += k * (a[1] + b[1]);
    }
    return [(re * h) / 3, (im * h) / 3];
  }
  /** The entire reading ξ(s) = ½ (s(s − 1) Λ₀(s) + 1). */
  function xiReading(s) {
    const q = cmul(cmul(s, [s[0] - 1, s[1]]), lambda0(s));
    return [(q[0] + 1) / 2, q[1] / 2];
  }
  /** Γ(z) for Re z > 0 by the Lanczos series; ζ(s) for Re s > 0 by the accelerated alternating series. */
  const LANCZOS = [0.9999999999998099, 676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406, 12.507343278686905, -0.13857109526572012, 9.984369578019572e-6, 1.5056327351493116e-7];
  function cgamma(z) {
    const x = [z[0] - 1, z[1]];
    let a = [LANCZOS[0], 0];
    for (let i = 1; i < 9; i++) {
      const q = cdiv([LANCZOS[i], 0], [x[0] + i, x[1]]);
      a = [a[0] + q[0], a[1] + q[1]];
    }
    const t = [x[0] + 7.5, x[1]],
      lt = [Math.log(hypot(t[0], t[1])), Math.atan2(t[1], t[0])];
    const e = cmul([x[0] + 0.5, x[1]], lt);
    return cmul(cexp([e[0] - t[0] + 0.5 * Math.log(TAU), e[1] - t[1]]), a);
  }
  function czeta(s) {
    const N = 60,
      d = [];
    let acc = 0,
      term = 1 / N;
    for (let i = 0; i <= N; i++) {
      acc += term;
      d.push(N * acc);
      term *= (4 * (N + i) * (N - i)) / ((2 * i + 1) * (2 * i + 2));
    }
    let re = 0,
      im = 0;
    for (let k = 0; k < N; k++) {
      const c = (k % 2 ? -1 : 1) * (d[k] - d[N]),
        l = Math.log(k + 1),
        p = cexp([-s[0] * l, -s[1] * l]);
      re += c * p[0];
      im += c * p[1];
    }
    const two = cexp([(1 - s[0]) * Math.LN2, -s[1] * Math.LN2]);
    return cdiv([-re, -im], [d[N] * (1 - two[0]), -d[N] * two[1]]);
  }
  /** ½ s (s − 1) π^{−s/2} Γ(s/2) ζ(s): the completed zeta side. */
  function xiCompleted(s) {
    const g = cmul(cexp([(-s[0] / 2) * Math.log(PI), (-s[1] / 2) * Math.log(PI)]), cmul(cgamma([s[0] / 2, s[1] / 2]), czeta(s)));
    const q = cmul(cmul(s, [s[0] - 1, s[1]]), g);
    return [q[0] / 2, q[1] / 2];
  }
  /** Rank over ℤ/2 of rows given as bit masks. */
  function rank2(rows) {
    const r = rows.slice();
    let rank = 0;
    for (let bit = 0; bit < 30; bit++) {
      const k = r.findIndex((x, i) => i >= rank && (x >> bit) & 1);
      if (k < 0) continue;
      [r[rank], r[k]] = [r[k], r[rank]];
      for (let i = 0; i < r.length; i++) if (i !== rank && (r[i] >> bit) & 1) r[i] ^= r[rank];
      rank++;
    }
    return rank;
  }
  const TETRA_TOL = 1e-9; // degrees: a coboundary below it counts as 0
  const FIXED = (() => {
    // face_cycle_exact on the skeleton of the twelve plates
    const rows = PLATES.map((pl) => EDGES.reduce((mask, e, k) => (pl.ids.includes(e.a) && pl.ids.includes(e.b) ? mask | (1 << k) : mask), 0));
    const all = rows.reduce((a, b) => a ^ b, 0);
    const euler = { V: CORNERS.length, E: EDGES.length, F: PLATES.length, rank: rank2(rows), constant: all };
    // kappa_eq_one_sub_dist_sq on two neighbouring points of tangency
    const a = pure(SITES[0]),
      b = pure(SITES[1]),
      d = norm(sub(a, b));
    const pairs = SITES.flatMap((p, i) => SITES.filter((_, j) => j !== i).map((q) => [pure(p), pure(q)]));
    const chord = {
      kappa: kappa(a, b),
      byChord: 1 - (d * d) / 4,
      dist2: d * d,
      pairs: pairs.length,
      gap: Math.max(...pairs.map(([p, q]) => Math.abs(kappa(p, q) - (1 - norm(sub(p, q)) ** 2 / 4))))
    };
    // exists_unitQuaternion_equiv: the model tri x y z = x y⁻¹ z stays on the unit quaternions
    let drift = 0;
    const TRIPLES = SITES.length;
    for (let i = 0; i < TRIPLES; i++) {
      const t = qmul(qmul(pure(SITES[i]), qbar(pure(SITES[(i + 1) % 12]))), pure(SITES[(i + 5) % 12]));
      drift = Math.max(drift, Math.abs(norm(t) - 1));
    }
    // normSq_and_chebyshev: a whole turn in equal steps along a great circle of unit quaternions
    const stepDeg = 30,
      steps = 360 / stepDeg,
      c = cs(stepDeg * deg),
      x0 = [1, 0, 0, 0],
      x1 = [c, sn(stepDeg * deg), 0, 0],
      xs = [x0, x1];
    while (xs.length <= steps) xs.push(qmul(qmul(xs[xs.length - 1], qbar(xs[xs.length - 2])), xs[xs.length - 1]));
    const U = [0, 1]; // U_{−1}, U_0
    const T = [1, c];
    for (let n = 1; n <= steps; n++) U.push(2 * c * U[n] - U[n - 1]);
    for (let n = 2; n <= steps; n++) T.push(2 * c * T[n - 1] - T[n - 2]);
    let heapGap = 0;
    for (let n = 0; n < steps; n++) {
      heapGap = Math.max(heapGap, norm(sub(xs[n + 1], sub(scale(x1, U[n + 1]), scale(x0, U[n])))), Math.abs(dot(x0, xs[n]) - T[n]), Math.abs(dot(xs[n], xs[n]) - 1));
    }
    const heap = { steps, stepDeg, gap: heapGap, closes: norm(sub(xs[steps], x0)) };
    // accumulated versines: σ = T = 1
    const step = (N, al) => (1 / N) ** al,
      total = (N, al) => N * (1 - cs(step(N, al)));
    const few = 24,
      many = 4096,
      th = step(few, 0.5);
    const sagitta = { few, lower: few * (th ** 2 / 2 - th ** 4 / 24), value: total(few, 0.5), upper: (few * th ** 2) / 2, N: many, above: total(many, 1), at: total(many, 0.5), below: total(many, 0.25) };
    // tetra_defects_incidence_repair_and_exactness on four points of tangency, F = the triangle phase
    const tri = (p, q, r) => (-Math.atan2(dot3(p, cross(q, r)), 1 + dot3(p, q) + dot3(q, r) + dot3(r, p)) * 180) / PI;
    const V = [0, 1, 2, 3].map((i) => SITES[i]),
      idx = [0, 1, 2, 3],
      F = idx.map((i) => idx.map((j) => idx.map((k) => tri(V[i], V[j], V[k]))));
    let defects = 0,
      quadruples = 0,
      edges = 0,
      worst = 0;
    for (const r of idx)
      for (const i of idx)
        for (const j of idx)
          for (const k of idx) {
            const cob = F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j];
            quadruples++;
            worst = Math.max(worst, Math.abs(cob));
            if (Math.abs(cob) > TETRA_TOL) defects++;
          }
    for (const i of idx) for (const j of idx) for (const k of idx) if (Math.abs(F[i][j][k] - (F[0][j][k] - F[0][i][k] + F[0][i][j])) > TETRA_TOL) edges++;
    const tetra = { quadruples, defects, edges, worst, alternating: F[1][2][3] - F[0][2][3] + F[0][1][3] - F[0][1][2], F123: F[1][2][3] };
    // the two sides of the completed zeta reading, and its reflection
    const xi = {
      atTwo: [xiReading([2, 0]), xiCompleted([2, 0])],
      atZero: [xiReading([0.5, GAMMA[0]]), xiCompleted([0.5, GAMMA[0]])],
      at: [xiReading([0.75, 5]), xiCompleted([0.75, 5])],
      mirror: xiReading([0.25, -5])
    };
    const apart = ([p, q]) => hypot(p[0] - q[0], p[1] - q[1]);
    xi.gap = Math.max(apart(xi.atTwo), apart(xi.at));
    xi.mirrorGap = apart([xi.at[0], xi.mirror]);
    return { euler, chord, model: { triples: TRIPLES, drift }, heap, sagitta, tetra, xi };
  })();
  function instances(m) {
    const gapAt = (s) => hypot(s[0] - 1, s[1]) / hypot(s[0], s[1]);
    const on = GAMMA.map((g) => gapAt([0.5, g])),
      off = [gapAt([0.5 - m.delta, GAMMA[0]]), gapAt([0.5 + m.delta, GAMMA[0]])];
    const y = m.y,
      rhs = mangoldtU(m.X) - Math.log(TAU) + trivialT(y);
    let lhs = 0;
    for (let k = 0; k < KMAX; k++) lhs += 2 * WEIGHT[k] * exp(y / 2) * cs(GAMMA[k] * y);
    const tail = (FIRST_LI_MASS - 2 * CUM[KMAX]) * exp(y / 2);
    const u = mangoldtU(m.X);
    const im = images(GAMMA[0], m.delta);
    return {
      ...FIXED,
      cayley: { worstOn: Math.max(...on.map((x) => Math.abs(x - 1))), off },
      radial: Math.max(...on.map((x) => Math.abs(Math.log(x)))),
      explicit: { y, lhs, rhs, gap: Math.abs(lhs - rhs), tail, mass: FIRST_LI_MASS, sum: 2 * CUM[KMAX] },
      threshold: { U: u, half: u / Math.sqrt(m.X), threeQuarters: u / m.X ** 0.75 },
      toeplitz: { N: NT, size: NT + 1, values: distinctImages(GAMMA[0], m.delta), lambda: lambdaFirst(m.delta), norms: [im.out, im.inn] }
    };
  }

  /* ---------- scenes, their layers and the parameter their rail drives ---------- */
  const SCENES = {
    lantern: { param: 'n', step: 1 / 7, layers: { lant: 1, ghost: 0, ring: 0, aniso: 0, chan: 0, traj: 0 }, rx: 2.62, rz: 1.36 },
    swap: { param: 'beta', step: 0.05, layers: { lant: 0, ghost: 1, ring: 0, aniso: 0, chan: 0, traj: 1 }, rx: 1.42, rz: 1.34 },
    glue: { param: 'K', step: 1 / 24, layers: { lant: 0, ghost: 0, ring: 1, aniso: 1, chan: 0, traj: 0 }, rx: 1.68, rz: 1.16 },
    offline: { param: 'delta', step: 1 / 40, layers: { lant: 0, ghost: 0, ring: 1, aniso: 1, chan: 0, traj: 0 }, rx: 1.95, rz: 1.24 },
    polished: { param: 'y', step: 1 / 18, layers: { lant: 0, ghost: 0, ring: 1, aniso: 1, chan: 1, traj: 1 }, rx: 1.68, rz: 1.2 }
  };
  const round2 = (x) => Math.round(x * 100) / 100;
  /** The value of a rail parameter at t ∈ [0, 1], and back. */
  const VALUE = {
    n: (t) => 3 + Math.round(7 * t),
    beta: (t) => round2(t),
    K: (t) => Math.round(KMAX * t),
    delta: (t) => round2(DMAX * t),
    y: (t) => round2(1 + 9 * t)
  };
  const RAIL = { n: (v) => (v - 3) / 7, beta: (v) => v, K: (v) => v / KMAX, delta: (v) => v / DMAX, y: (v) => (v - 1) / 9 };
  const RAIL_TEXT = {
    n: (v) => `n = ${v} · m = ${v * v}`,
    beta: (v) => `β ${rel(cent(v), v, 2)}`,
    K: (v) => `K = ${v}`,
    delta: (v) => `δ ${rel(cent(v), v, 2)}`,
    y: (v) => `ln X ${rel(cent(v), v, 2)}`
  };
  const PARAMS = ['beta', 'K', 'delta', 'y', 'n'];
  const state = { scene: 'polished', set: { beta: 1, K: 24, delta: 0, y: 7, n: 6 }, cam: 'panorama', lens: 0, from: null, blend: 1 };
  /** The parameters the scene asks for: the rail drives one, the others are set. */
  function targets() {
    const out = { ...state.set },
      p = SCENES[state.scene].param;
    out[p] = VALUE[p](clock ? clock.t : 1);
    return out;
  }
  function current() {
    const to = targets();
    if (!state.from || state.blend >= 1) return to;
    const out = {};
    for (const p of PARAMS) out[p] = lerp(state.from[p], to[p], state.blend);
    out.K = Math.round(out.K);
    out.n = Math.round(out.n);
    return out;
  }
  function layers() {
    const to = SCENES[state.scene].layers;
    if (!state.from || state.blend >= 1) return { ...to };
    const out = {};
    for (const k of Object.keys(to)) out[k] = lerp(state.from.layers[k], to[k], state.blend);
    return out;
  }
  const cams = { panorama: [-0.6, 0.32, 1], face: [-0.22, 0.2, 1], top: [-0.75, 0.82, 1] };
  const CARD = (scene, beta, K, delta, y, n, cam, still) => ({ scene, beta, K, delta, y, n, cam, play: true, still });
  const presets = {
    'riemann-1854-tangent-lantern-creases': CARD('lantern', 0, 0, 0, 7, 6, 'face', 3 / 7),
    'osculating-ternion-sphere-base-swap': CARD('swap', 1, 0, 0, 7, 6, 'panorama', 1),
    'critical-half-toeplitz-spectral-glue': CARD('glue', 1, 24, 0, 7, 6, 'panorama', 1),
    'counterfactual-offline-spike-breakdown': CARD('offline', 1, 24, 0.25, 7, 6, 'panorama', 0.625),
    'polished-isotropic-manifold-completion': CARD('polished', 1, 24, 0, 10, 6, 'panorama', 1)
  };
  const DEFAULT = 'polished-isotropic-manifold-completion';
  let clock = null;

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.panorama[0], pitch: cams.panorama[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const RC = 1.5,
    MTH = 40,
    MR = 120,
    SEAM = 0.085,
    GHOST = 0.25,
    LANT = [1.36, 0, -0.12];
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
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
      side = 14;
    const to = SCENES[state.scene];
    let rx = to.rx,
      rz = to.rz;
    // moved images reach 1.86 and need the room of the off-line scene wherever the ring is shown
    if (to.layers.ring && targets().delta > 0) rx = SCENES.offline.rx;
    if (state.from && state.blend < 1) {
      rx = lerp(state.from.rx, rx, state.blend);
      rz = lerp(state.from.rz, rz, state.blend);
    }
    fit.rx = rx;
    fit.rz = rz;
    const u = Math.max(8, Math.min((W - 2 * side) / (2 * rx), room / (2 * rz)));
    opts.radius = u / Math.min(W, H);
    opts.cx = 0.5;
    opts.cy = (top + room / 2) / H;
  }
  /** The centre of the ball: in the 1854 scene it makes room for the lantern. */
  const centre = (w) => [-1.16 * w.lant, 0, 0];
  /** The frame: the radius of the ball over a direction and the magenta share of its colour. */
  function field(m, w) {
    const eta = w.aniso * m.eta,
      heights = [],
      excess = [];
    for (let k = 0; k < m.K; k++) {
      heights.push(heightOf(k, m.delta, m.y) * (w.lant > 0.99 ? 0 : 1));
      excess.push(heights[k] - heightOf(k, 0, m.y));
    }
    const cut = 1 - 12 * SPIKE_S * SPIKE_S;
    const seamOf = (d, i) => {
      let s = 2;
      for (const j of NEIGHBOURS[i]) {
        const diff = sub(SITES[i], SITES[j]);
        s = Math.min(s, dot3(d, diff) / norm(diff));
      }
      return s;
    };
    const ridge = (s) => {
      const t = s / 0.2;
      return t >= 1 ? 0 : exp(1 - 1 / (1 - t * t));
    };
    const at = (d, plate) => {
      const i = plate == null ? nearestOf(d) : plate;
      let r = 1 + (1 - m.beta) * (1 / dot3(d, SITES[i]) - 1),
        mag = 0;
      if (eta > 1e-6 || m.beta < 1) {
        const b = ridge(Math.max(0, seamOf(d, i)));
        r += SEAM * eta * b;
        mag = Math.max(mag, 0.9 * eta * b, 0.55 * (1 - m.beta) * b);
      }
      for (let k = 0; k < m.K; k++) {
        const c = Math.abs(dot3(d, SPIKES[k]));
        if (c < cut) continue;
        const e = bell(c);
        r += heights[k] * e;
        if (excess[k] > 0) mag = Math.max(mag, clamp((excess[k] * e) / 0.06, 0, 1));
      }
      return { r, mag };
    };
    return { at, creased: m.beta < 1 - 1e-9 || eta > 1e-6, eta };
  }
  const TILT = unit([0.5, -0.36, 0.78]);
  function drawBall(m, w, f, C) {
    const tone = (d, mag) => lerp(0.3 + 0.17 * dot3(TILT, d), 1, mag);
    const style = { colors: [P.stage, P.violet, P.magenta], range: [0, 1] };
    if (!f.creased) {
      const nu = 168,
        nv = 84,
        rows = [],
        tones = [];
      for (let j = 0; j <= nv; j++) {
        const th = PI - (PI * j) / nv,
          row = [];
        for (let i = 0; i <= nu; i++) {
          const ph = (TAU * i) / nu,
            d = [sn(th) * cs(ph), sn(th) * sn(ph), cs(th)],
            q = f.at(d);
          row.push(add(C, scale(d, q.r)));
          tones.push(tone(d, q.mag));
        }
        rows.push(row);
      }
      const at = (u, v) => tones[Math.round(v * nv) * (nu + 1) + Math.round(u * nu)];
      sc.surface('ball', rows, { ...style, value: at, grid: { every: [14, 14], alpha: 0.1 } });
      return;
    }
    const nu = 45,
      nv = 12;
    PLATES.forEach((pl, i) => {
      const rows = [],
        tones = [];
      for (let j = 0; j <= nv; j++) {
        const v = 1 - (1 - j / nv) ** 1.5,
          row = [];
        for (let k = 0; k <= nu; k++) {
          // clockwise seen from outside, so that the outer side is the front of the surface
          const s = 5 - (5 * k) / nu,
            e = Math.min(4, Math.floor(s)),
            b = add(scale(pl.poly[e], 1 - (s - e)), scale(pl.poly[(e + 1) % 5], s - e)),
            d = unit(add(scale(pl.p, 1 - v), scale(b, v))),
            q = f.at(d, i);
          row.push(add(C, scale(d, q.r)));
          tones.push(tone(d, q.mag));
        }
        rows.push(row);
      }
      const at = (u, v) => tones[Math.round(v * nv) * (nu + 1) + Math.round(u * nu)];
      sc.surface('plate' + i, rows, { ...style, value: at });
    });
  }
  /** A great-circle run between two directions, lifted onto the surface of plate i. */
  const seamRun = (f, e, C, lift) => {
    const a = unit(CORNERS[e.a].at),
      b = unit(CORNERS[e.b].at);
    return sample(14, (t) => {
      const d = unit(add(scale(a, 1 - t), scale(b, t)));
      return add(C, scale(d, f.at(d, e.plate).r + lift));
    });
  };
  function drawSeams(m, w, f, C) {
    const first = 1 - m.beta;
    const weld = f.eta;
    for (const e of EDGES) {
      if (first > 0.01 || weld > 0.01) sc.line(seamRun(f, e, C, 0.006), { color: P.magenta, width: 1.7, alpha: clamp(Math.max(first, weld), 0, 1) });
      if (w.ghost > 0.01 && m.beta > 0.01) sc.line(seamRun(f, e, C, 0.006), { color: P.cyan, width: 1.1, alpha: 0.6 * m.beta * w.ghost });
    }
    // the angle defects of the corners as short spikes
    if (first > 0.01)
      for (const c of CORNERS) {
        const d = unit(c.at),
          r = 1 + first * (CORNER_R - 1);
        sc.line([add(C, scale(d, r)), add(C, scale(d, r + (0.2 * m.crease.defect) / 36))], { color: P.magenta, width: 2.2, alpha: 0.95 });
      }
    // the overlap bands of the bump functions: the inner outline of each flat plate
    if (w.lant > 0.01 && first > 0.01)
      PLATES.forEach((pl) => {
        const inner = pl.poly.map((v) => add(C, scale(add(scale(pl.p, 0.24), scale(v, 0.76)), 1.004)));
        sc.line(inner, { color: P.magenta, width: 0.9, alpha: 0.5 * w.lant, close: true });
      });
  }
  /** Where the flat plates stood: the edges of the circumscribed dodecahedron. */
  function drawGhost(a, C) {
    if (a < 0.01) return;
    for (const e of EDGES) sc.line([add(C, CORNERS[e.a].at), add(C, CORNERS[e.b].at)], { color: P.magenta, width: 1, alpha: 0.5 * a });
  }
  /** The mode strings: one closed cyan curve per zero pair, round(γ_k/5) waves around, hugging the surface. */
  const STRING_Z = GAMMA.map((_, k) => {
    let x = 0,
      b = 0.5;
    for (let i = k + 1; i > 0; i >>= 1) {
      x += (i & 1) * b;
      b /= 2;
    }
    return 0.9 * (2 * x - 1);
  });
  function drawStrings(m, w, f, C) {
    if (w.lant > 0.5) return;
    for (let k = 0; k < m.K; k++) {
      const waves = Math.round(GAMMA[k] / 5),
        amp = (0.045 * RHO[0]) / RHO[k];
      sc.line(
        sample(96, (t) => {
          const a = TAU * t,
            z = clamp(STRING_Z[k] + amp * cs(waves * a), -0.97, 0.97),
            r = Math.sqrt(1 - z * z),
            d = [r * cs(a), r * sn(a), z];
          return add(C, scale(d, f.at(d).r + 0.005));
        }),
        { color: P.cyan, width: 0.9, alpha: 0.42 * (1 - w.lant) }
      );
    }
  }
  /** The drawn place of the image of norm r and angle θ: 40 θ around the ring, radius 1.5 (1 + 120 (r − 1)). */
  const ringAt = (theta, r, C = [0, 0, 0]) => {
    const R = RC * (1 + MR * (r - 1));
    return add(C, [R * cs(MTH * theta), R * sn(MTH * theta), 0]);
  };
  function drawRing(m, w, C) {
    const a = w.ring;
    if (a < 0.01) return;
    sc.circle(C, [0, 0, 1], RC, { fade: false, n: 128, color: P.cyan, width: m.delta > 0 && m.K ? 1.1 : 1.8, alpha: 0.85 * a });
    sc.bead(add(C, [RC, 0, 0]), { color: P.cyan, r: 2.6, alpha: a, key: 'one' });
    for (let k = 0; k < m.K; k++) {
      const im = images(GAMMA[k], m.delta);
      const size = clamp(5.2 - 0.12 * k, 2.6, 5.2);
      for (const s of [-1, 1]) {
        if (m.delta <= 1e-9) {
          sc.bead(ringAt(s * im.theta, 1, C), { color: P.cyan, r: size, alpha: a, key: `u${k + 1}${s > 0 ? 'p' : 'm'}` });
          continue;
        }
        const out = ringAt(s * im.theta, im.out, C),
          inn = ringAt(s * im.theta, im.inn, C);
        sc.line([inn, out], { color: P.magenta, width: 1.2, alpha: 0.8 * a });
        sc.bead(out, { color: P.magenta, r: size, alpha: a, key: `out${k + 1}${s > 0 ? 'p' : 'm'}` });
        sc.bead(inn, { color: P.magenta, r: 0.8 * size, alpha: a, key: `in${k + 1}${s > 0 ? 'p' : 'm'}` });
      }
      // the contrast lens: where the first pairs would stand at δ = 0.25
      if (state.lens === 1 && m.delta < GHOST - 1e-9 && k < 6) {
        const g = images(GAMMA[k], GHOST);
        for (const s of [-1, 1]) sc.line([ringAt(s * g.theta, g.inn, C), ringAt(s * g.theta, g.out, C)], { color: P.magenta, width: 1.4, alpha: 0.5 * a });
      }
    }
  }
  /* the prime channels: one latitude ring per reduced class modulo 7, lifted by its share of the primes */
  const CHANNEL_Z = [0.72, 0.43, 0.145, -0.145, -0.43, -0.72],
    CHANNEL_R = 1.05,
    CHANNEL_LIFT = 0.09;
  function drawChannels(m, w, C) {
    const a = w.chan;
    if (a < 0.01) return;
    CLASSES.forEach((cl, k) => {
      const z = CHANNEL_Z[k],
        r = CHANNEL_R + CHANNEL_LIFT * clamp(m.channels.share[k] - 1, -1, 1);
      sc.circle(add(C, [0, 0, z * r]), [0, 0, 1], Math.sqrt(1 - z * z) * r, { fade: false, n: 96, color: P.cyan, width: 2.2, alpha: 0.9 * a });
    });
  }
  /* the geodesic: one great circle, projected onto the surface of the frame */
  const TRAJ_N = unit([0.46, 0.2, 0.86]),
    TRAJ_E1 = unit(cross([0, 0, 1], TRAJ_N)),
    TRAJ_E2 = cross(TRAJ_N, TRAJ_E1);
  const trajDir = (ang) => add(scale(TRAJ_E1, cs(ang)), scale(TRAJ_E2, sn(ang)));
  // the middle of the arc that faces the panorama camera, and the sense in which it runs to the right
  const TRAJ = (() => {
    const { R, D } = basis(cams.panorama[0], cams.panorama[1]),
      mid = Math.atan2(dot3(D, TRAJ_E2), dot3(D, TRAJ_E1));
    return { mid, way: dot3(sub(trajDir(mid + 0.1), trajDir(mid)), R) >= 0 ? 1 : -1 };
  })();
  function drawTraj(m, w, f, C) {
    const a = w.traj;
    if (a < 0.01) return;
    const pts = sample(180, (t) => {
      const d = trajDir(TAU * t);
      return add(C, scale(d, f.at(d).r + 0.014));
    });
    sc.tube('traj', pts, { color: m.beta < 1 ? P.magenta : P.cyan, r: 0.014, glow: 0.35, occlude: false, alpha: a });
  }
  function drawLantern(m, w) {
    const a = w.lant;
    if (a < 0.01) return;
    const n = m.n,
      M = m.m,
      O = add(LANT, [0.5 * (1 - a), 0, 0]),
      vertices = [],
      faces = [];
    for (let j = 0; j <= M; j++)
      for (let i = 0; i < n; i++) {
        const ang = (TAU * (i + (j % 2) / 2)) / n - PI / 2;
        vertices.push(add(O, [cs(ang), sn(ang), j / M - 0.5]));
      }
    for (let j = 0; j < M; j++)
      for (let i = 0; i < n; i++) {
        const A = j * n + i,
          B = j * n + ((i + 1) % n),
          up = (j + 1) * n;
        if (j % 2 === 0) {
          faces.push([A, B, up + i]);
          faces.push([B, up + ((i + 1) % n), up + i]);
        } else {
          faces.push([A, B, up + ((i + 1) % n)]);
          faces.push([A, up + ((i + 1) % n), up + i]);
        }
      }
    sc.poly('lantern', { vertices, faces }, { color: P.violet, alpha: a >= 0.99 ? 1 : 0.7 * a, edges: P.magenta });
    // the ridges of the folds: one closed polygon per tier
    for (let j = 0; j <= M; j++) sc.line(vertices.slice(j * n, (j + 1) * n), { color: P.magenta, width: 1, alpha: 0.6 * a, close: true });
    for (const z of [-0.5, 0.5]) sc.circle(add(O, [0, 0, z]), [0, 0, 1], 1.003, { fade: false, color: P.violet, width: 1.3, alpha: 0.9 * a });
    // a few normals of the folded faces: they end up arctan(π²/2) off the cylinder normal
    const tilt = m.lantern.tilt * deg;
    for (let i = 0; i < n; i++) {
      const ang = (TAU * (i + 0.5)) / n - PI / 2,
        rad = [cs(ang), sn(ang), 0],
        p = add(O, add(scale(rad, 1 - 0.5 * m.lantern.gap), [0, 0, 0.5 - 0.5 / M]));
      sc.arrow(p, add(p, add(scale(rad, 0.34 * cs(tilt)), [0, 0, 0.34 * sn(tilt)])), { color: P.magenta, width: 1.8, headSize: 8, alpha: a });
    }
  }

  /* ---------- the amber handle: the current value of the rail ---------- */
  const SWAP_CORNER = (() => {
    const { R, U, D } = basis(cams.panorama[0], cams.panorama[1]);
    let best = 0,
      s = -9;
    CORNERS.forEach((c, k) => {
      const d = unit(c.at),
        v = dot3(d, R) + 0.35 * dot3(d, U) + (dot3(d, D) > 0.25 ? 0.6 : -2);
      if (v > s) {
        s = v;
        best = k;
      }
    });
    return unit(CORNERS[best].at);
  })();
  function handleWorld(t) {
    const p = SCENES[state.scene].param,
      v = VALUE[p](t);
    if (p === 'n') {
      const a = (-172 + 165 * t) * deg;
      return add(LANT, [1.03 * cs(a), 1.03 * sn(a), 0.5]);
    }
    if (p === 'beta') return scale(SWAP_CORNER, 1 + (1 - v) * (CORNER_R - 1) + 0.012);
    if (p === 'K') return v ? ringAt(-images(GAMMA[v - 1], 0).theta, 1) : [-RC, 0, 0];
    if (p === 'delta') {
      const im = images(GAMMA[0], v);
      return ringAt(-im.theta, im.out);
    }
    return scale(trajDir(TRAJ.mid + TRAJ.way * lerp(-1.1, 1.1, t)), 1.03);
  }

  /* ---------- labels ---------- */
  const TILDE = '<span class="tld">M</span><sub>Ω</sub>';
  const U_OUT = nrm('u<sub>+</sub>'),
    U_IN = nrm('u<sub>−</sub>'),
    U_K = nrm('u<sub>k</sub>'),
    LAM = 'λ<sub>min</sub>',
    SPIKE = 'X<sup>δ−1/2</sup>',
    BASE = 'X<sup>−1/2</sup>';
  const SCENE_NAME = {
    lantern: [['1854 切板与灯笼', '1854 PLATES AND LANTERN'], ['T<sub>p</sub>M 折痕', 'T<sub>p</sub>M CREASES']],
    swap: [['二阶换底', 'SECOND-ORDER SWAP'], ['一阶切板对照', 'FIRST-ORDER CONTRAST']],
    glue: [['σ = 1/2 谱胶合', 'σ = 1/2 SPECTRAL GLUE'], ['离轴对照', 'OFF-LINE CONTRAST']],
    offline: [['反事实离轴', 'OFF-LINE COUNTERFACTUAL'], ['δ ≠ 0 失稳', 'δ ≠ 0 BREAKDOWN']],
    polished: [['磨光流形', 'POLISHED MANIFOLD'], ['磨光前后对照', 'BEFORE AND AFTER']]
  };
  const LENS_NAME = [
    ['1854 + 1859 合龙', '1854 + 1859 SYNTHESIS'],
    ['切板与离轴对照', 'PLATES AND OFF-LINE CONTRAST']
  ];
  /** The regime of the frame: what the seams, the modes and the offset say. Every sentence of the page reads it. */
  const offLine = (m) => m.K > 0 && m.delta > 0;
  const vacuous = (m) => m.K === 0 && m.delta > 0;
  const creasedAt = (m) => m.beta < 1;
  function tags(m, w, C) {
    const compact = stage.clientWidth < 480;
    const { U, R } = basis(sc.cam.yaw, sc.cam.pitch);
    const off = (p, ku, kr = 0) => add(add(p, scale(U, ku)), scale(R, kr));
    const T = (key, p, html, cls = 'raw backed c-ik', o) => sc.tag(key, p, html, cls, o);
    if (w.lant > 0.5) {
      T('plates', off(C, 1.36), compact ? `T<sub>p</sub>M · ${jumpRel(m)}` : `${L('切板 T<sub>p</sub>M：法向跳变', 'plates T<sub>p</sub>M: normal jump')} ${jumpRel(m)}`, 'raw backed c-mg', { occlude: false });
      T('lantern', off(LANT, 1.02), `n = ${m.n}, m = ${m.m} · ${compact ? '' : L('面积 ', 'area ')}${ratioRel(m)}`, 'raw backed c-mg', { occlude: false });
      if (!compact) T('tilt', off(LANT, -0.92), `${L('法向斜', 'normals tilted')} ${tiltRel(m)}`, 'raw backed c-mg', { occlude: false });
    }
    if (w.ghost > 0.5) {
      const d = SWAP_CORNER;
      if (m.beta < 1) T('drift', off(scale(d, CORNER_R), 0.14, 0.1), `${L('外漂', 'drift')} ${driftRel(m)}`, 'raw backed c-mg', { occlude: false });
      else T('cap', off([0, 0, 1], 0.2), compact ? 'T<sub>3</sub><sup>(p)</sup> · 1/2 + 1/2 = 1' : `${L('吻合球', 'osculating sphere')} T<sub>3</sub><sup>(p)</sup> · 1/2 + 1/2 = 1`, 'raw backed c-vi', { occlude: false });
    }
    if (w.ring > 0.5) {
      const out = offLine(m);
      if (!compact || state.scene !== 'polished') {
        const im = images(GAMMA[0], m.delta);
        if (m.K) {
          if (out) {
            T('uout', off(ringAt(-im.theta, im.out, C), 0.17), `${U_OUT} ${outRel(m)}`, 'raw backed c-mg', { occlude: false });
            if (!compact) T('uin', off(ringAt(-im.theta, im.inn, C), -0.2), `${U_IN} ${innRel(m)}`, 'raw backed c-mg', { occlude: false });
          } else T('u1', off(ringAt(-im.theta, 1, C), -0.19), `${nrm('u<sub>1</sub>')} ${outRel(m)}`, 'raw backed c-cy', { occlude: false });
        }
      }
      if (!compact) T('one', off(add(C, [RC, 0, 0]), -0.17, 0.02), 'u = 1', 'raw backed c-cy', { occlude: false });
      if (!compact && out && state.scene === 'offline') {
        // the antipodal spike of pair 1 stands clear of the split images on the left
        const d = scale(SPIKES[0], -1);
        T('spike', off(add(C, scale(d, 1 + heightOf(0, m.delta, m.y))), -0.02, 0.38), `${SPIKE} ${spikeRel(m)}`, 'raw backed c-mg', { occlude: false });
      }
    }
    if (w.chan > 0.5) T('omega', off(add(C, [0, 0, 1]), 0.26), compact ? TILDE : `${TILDE} · ${L('余数类 1…6 (mod 7)', 'classes 1…6 (mod 7)')}`, 'raw backed c-vi', { occlude: false });
    if (w.ring > 0.5 && w.chan < 0.5 && !compact && m.eta > 0.02) T('seam', off(add(C, [0, 0, 1.02]), 0.18), `${L('接缝残差 η', 'seam residual η')} ${etaRel(m)}`, 'raw backed c-mg', { occlude: false });
  }
  /* sentences: [zh, en] pairs built from the live frame */
  const two = (a, b) => [a, b];
  const join = (...parts) => two(parts.map((p) => p[0]).join(''), parts.map((p) => p[1]).join(''));
  const none = two('', '');
  /** The two exact inequalities of a moved pair, each with its values in a parenthesis of its own. */
  const splitZh = (m) => `${U_OUT} &gt; 1 &gt; ${U_IN}（值 ${outRel(m)}、${innRel(m)}），${valued(`${LAM} &lt; 0`, lamRel(m), ZH)}`,
    splitEn = (m) => `${U_OUT} &gt; 1 &gt; ${U_IN} (values ${outRel(m)}, ${innRel(m)}), ${valued(`${LAM} &lt; 0`, lamRel(m), EN)}`;
  /** The clauses that hold in any scene of the ball: creases left by β, seams left by K, spikes raised by δ. */
  const creaseClause = (m) => (creasedAt(m) ? two(`β ${betaRel(m)}：底仍有切板折痕，法向跳变 ${jumpRel(m)}。`, `β ${betaRel(m)}: the base still has plate creases, normal jump ${jumpRel(m)}. `) : none);
  const seamClause = (m) => (m.K < KMAX ? two(`K = ${m.K}：接缝残差 η ${etaRel(m)}。`, `K = ${m.K}: seam residual η ${etaRel(m)}. `) : none);
  const offClause = (m) =>
    offLine(m)
      ? two(
          `反事实 σ = 1/2 + δ ${sigmaRel(m)}：第一对的像裂开，${splitZh(m)}；棱角高 ${SPIKE} ${spikeRel(m)}。`,
          `Counterfactual σ = 1/2 + δ ${sigmaRel(m)}: the images of the first pair split, ${splitEn(m)}; spikes of height ${SPIKE} ${spikeRel(m)}. `
        )
      : vacuous(m)
        ? two(`K = 0：没有零点对，δ ${deltaRel(m)} 无像可移，${LAM} ${lamRel(m)}。`, `K = 0: no zero pair, so δ ${deltaRel(m)} moves nothing, ${LAM} ${lamRel(m)}. `)
        : none;
  function subline(m) {
    const s = state.scene,
      compact = stage.clientWidth < 480;
    if (s === 'lantern')
      return join(
        two(
          `n = ${m.n} 边、m = n² = ${m.m} 层：灯笼离柱面的最大距离 ${gapRel(m)}，面积却是柱面的 ${ratioRel(m)} 倍`,
          `n = ${m.n} sides, m = n² = ${m.m} tiers: the largest distance of the lantern from the cylinder is ${gapRel(m)}, yet its area is ${ratioRel(m)} that of the cylinder`
        ),
        compact ? two('。', '.') : two(`，法向斜 ${tiltRel(m)}。左球 12 块切板的法向跳变 ${jumpRel(m)}。`, `, normals tilted by ${tiltRel(m)}. On the ball the 12 plates meet with a normal jump of ${jumpRel(m)}.`)
      );
    if (s === 'swap') {
      if (m.beta >= 1)
        return two(
          `β = 1：二阶吻合球 T<sub>3</sub><sup>(p)</sup> 在常曲率球面上彼此重合，法向跳变 ${jumpRel(m)}，顶点亏角 ${defectRel(m)}；品红线框是原来的切板。`,
          `β = 1: the second-order osculating spheres T<sub>3</sub><sup>(p)</sup> coincide on the sphere of constant curvature, normal jump ${jumpRel(m)}, corner defect ${defectRel(m)}; the magenta frame is where the plates stood.`
        );
      if (m.beta <= 0)
        return two(
          `β = 0：12 块一阶切板 T<sub>p</sub>M 拼成正十二面体，法向跳变 ${jumpRel(m)}，顶点亏角 ${defectRel(m)}，棱角外漂 ${driftRel(m)}。`,
          `β = 0: the 12 first-order plates T<sub>p</sub>M form a regular dodecahedron, normal jump ${jumpRel(m)}, corner defect ${defectRel(m)}, corner drift ${driftRel(m)}.`
        );
      return two(
        `β ${betaRel(m)}：切板弯向吻合球，法向跳变 ${jumpRel(m)}，顶点亏角 ${defectRel(m)}，棱角外漂 ${driftRel(m)}。`,
        `β ${betaRel(m)}: the plates bend towards the osculating sphere, normal jump ${jumpRel(m)}, corner defect ${defectRel(m)}, corner drift ${driftRel(m)}.`
      );
    }
    const lead = offClause(m);
    if (s === 'glue') {
      const on =
        m.K === 0
          ? two(`K = 0：圆上还没有像，接缝残差 η ${etaRel(m)}，${LAM} ${lamRel(m)}。`, `K = 0: no image on the circle yet, seam residual η ${etaRel(m)}, ${LAM} ${lamRel(m)}. `)
          : two(`δ = 0：前 ${m.K} 对零点的像都在青色单位圆上，${U_K} ${normRel(m)}，${LAM} ${lamRel(m)} ≥ 0。`, `δ = 0: the images of the first ${m.K} zero pairs sit on the cyan unit circle, ${U_K} ${normRel(m)}, ${LAM} ${lamRel(m)} ≥ 0. `);
      return join(m.delta > 0 ? lead : on, compact || (m.K === 0 && m.delta === 0) ? none : seamClause(m), compact ? none : creaseClause(m), m.delta > 0 || m.K < KMAX || creasedAt(m) || compact ? none : two('二十四对合起来，接缝熔平，整只球光滑。', 'With all 24 pairs the seams have melted and the ball is smooth. '));
    }
    if (s === 'offline') {
      if (m.delta > 0) return join(lead, compact || m.K === 0 ? none : seamClause(m), compact ? none : creaseClause(m));
      return join(
        m.K === 0
          ? two(`K = 0、δ = 0：没有零点对，${LAM} ${lamRel(m)}。`, `K = 0, δ = 0: no zero pair, ${LAM} ${lamRel(m)}. `)
          : two(
              `δ = 0（已证真值 σ = 1/2）：四个像并回单位圆，${U_OUT} = ${U_IN} ${outRel(m)}，${LAM} ${lamRel(m)} ≥ 0；残差 ${BASE} ${baseRel(m)}。`,
              `δ = 0 (proven σ = 1/2): the four images close up on the unit circle, ${U_OUT} = ${U_IN} ${outRel(m)}, ${LAM} ${lamRel(m)} ≥ 0; residual ${BASE} ${baseRel(m)}. `
            ),
        compact ? none : seamClause(m),
        compact ? none : creaseClause(m)
      );
    }
    const smooth = m.delta === 0 && m.K === KMAX && !creasedAt(m);
    const tail = two(
      `ln X ${yRel(m)}：残差 ${BASE} ${baseRel(m)}，模 7 的六个余数类最大份额偏离 ${worstRel(m)}。`,
      `ln X ${yRel(m)}: residual ${BASE} ${baseRel(m)}; largest share gap of the six classes mod 7 ${worstRel(m)}. `
    );
    if (smooth) return join(compact ? none : two('β = 1、K = 24、δ = 0：没有接缝也没有折痕。', 'β = 1, K = 24, δ = 0: no seam and no crease. '), tail);
    return join(lead, seamClause(m), creaseClause(m), compact ? none : tail);
  }
  function bigline(m) {
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    const key = {
      lantern: () => ratioRel(m),
      swap: () => L(`跳变 ${jumpRel(m)}`, `jump ${jumpRel(m)}`),
      glue: () => `${LAM} ${lamRel(m)}`,
      offline: () => `${LAM} ${lamRel(m)}`,
      polished: () => (offLine(m) ? `${LAM} ${lamRel(m)}` : `${BASE} ${baseRel(m)}`)
    }[state.scene]();
    return `${name} · ${key}`;
  }
  function legendItems(m) {
    const s = state.scene,
      items = [];
    if (s === 'lantern') items.push(['mg', L('折痕、亏角与法向', 'creases, defects, normals')], ['vi', L('切板与灯笼的面', 'plates and lantern faces')]);
    else if (s === 'swap') items.push(['vi', L('吻合球', 'osculating sphere')], ['cy', creasedAt(m) ? L('球冠边界', 'cap boundaries') : L('球冠边界 · 测地线', 'cap boundaries · geodesic')], ['mg', creasedAt(m) ? L('折痕与切板', 'creases and plates') : L('原来的切板', 'where plates stood')]);
    else {
      items.push(['vi', s === 'polished' ? L('磨光流形', 'polished manifold') : L('流形', 'manifold')]);
      items.push(['cy', s === 'polished' ? L('单位圆上的像 · 谱弦 · 余数类环 · 测地线', 'unit-circle images · strings · class rings · geodesic') : L('单位圆上的像 · 谱弦', 'unit-circle images · strings')]);
      if (offLine(m)) items.push(['mg', L('裂开的像与棱角', 'split images and spikes')]);
      else if (m.eta > 1e-6 || creasedAt(m)) items.push(['mg', L('接缝与折痕', 'seams and creases')]);
    }
    if (state.lens === 1 && s !== 'lantern' && s !== 'swap')
      items.push(['mg', m.K && m.delta < GHOST - 1e-9 ? L(`对照：切板线框与 δ = ${dec(GHOST)} 的位置`, `contrast: plate frame and places at δ = ${dec(GHOST)}`) : L('对照：切板线框', 'contrast: plate frame')]);
    items.push(['am', L('当前值', 'current value')]);
    return items;
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
    const STEP = 20,
      cols = 2 * Math.ceil(bounds.width / STEP);
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
    const w = layers(),
      C = centre(w),
      f = field(m, w);
    fit();
    sc.begin();
    drawBall(m, w, f, C);
    drawSeams(m, w, f, C);
    drawGhost(Math.max(m.beta > 0.01 ? w.ghost : 0, state.lens === 1 && w.lant < 0.5 ? 0.9 : 0), C);
    drawStrings(m, w, f, C);
    drawRing(m, w, C);
    drawChannels(m, w, C);
    drawTraj(m, w, f, C);
    drawLantern(m, w);
    const { D } = basis(sc.cam.yaw, sc.cam.pitch),
      hw = handleWorld(clock.t);
    // a still has no handle button: an amber ring marks the current value instead
    if (TRV.still && !TRV.thumbMode) sc.ring(add(hw, scale(D, 0.14)), { color: P.amber, r: 8, key: 'now' });
    tags(m, w, C);
    sc.end();
    const q = sc.p(hw);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    const b = $('cv').getBoundingClientRect();
    fitLabels(TRV.still ? { left: b.left + q[0] - 14, right: b.left + q[0] + 14, top: b.top + q[1] - 14, bottom: b.top + q[1] + 14 } : null);
  }

  /* ---------- strips ---------- */
  /** A strip title that breaks only between its pieces (each piece is one line of HTML). */
  function setPieces(el, pieces, sep) {
    const key = pieces.join(sep);
    if (el.dataset.key === key) return;
    el.dataset.key = key;
    el.innerHTML = pieces.map((t) => `<span class="nb">${t}</span>`).join(sep);
  }
  const LAMBDA_CURVE = sample(80, (t) => [DMAX * t, lambdaFirst(DMAX * t)]);
  const DRIFT_CURVE = sample(80, (t) => [DMAX * t, 200 * (images(GAMMA[0], DMAX * t).out - 1)]);
  // the tops of the two ranges are headroom for the three-row legends; the amber cursor stops below the legend
  const Y_A = [0, 1.85],
    CUT_A = 0.85,
    Y_B = [-0.85, 2],
    CUT_B = 0.45;
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      setPieces($('plotTitle'), L(['相对残差 X<sup>δ−1/2</sup>'], ['Relative residual X<sup>δ−1/2</sup>']), '');
      setPieces($('plotMeta'), ['RH: U(X)/X<sup>θ</sup> → 0 ⇔ θ &gt; 1/2'], '');
      const narrow = cv.clientWidth < 250,
        g = kit.plot(cv, { x: [1, 10], y: Y_A, pad: [34, 14, 12, 22] });
      g.axes({ xTicks: narrow ? [1, 4, 7, 10] : [1, 2, 4, 6, 8, 10], yTicks: [0, 0.5, 1] });
      // the axis name sits in the lower left corner, under every curve
      g.text(1, 0, 'ln X', P.dim, { base: 'bottom', dx: 7, dy: -4, face: 'body' });
      const at = (t) => 1 + 9 * t;
      g.line(sample(180, (t) => [at(t), exp(-at(t) / 2) * (1 + ENV * at(t) ** 2)]), P.cyan, { width: 1.6, dash: [5, 4] });
      g.line(sample(180, (t) => [at(t), exp(-at(t) / 2)]), P.cyan, { width: 2 });
      // at δ = 0 the counterfactual curve is the proven one, so nothing magenta is drawn
      if (m.delta > 0) g.line(sample(180, (t) => [at(t), exp((m.delta - 0.5) * at(t))]), P.magenta, { width: 2 });
      g.line([[m.y, 0], [m.y, CUT_A]], P.amber, { width: 1 });
      g.dot(m.y, m.spike, P.amber, 3.5);
      g.legend([
        [P.cyan, 'δ = 0: X^{−1/2}'],
        [P.cyan, `X^{−1/2}(1 + ${dec(ENV)} ln² X)`, 'dash'],
        [P.magenta, m.delta > 0 ? `δ ${deltaRel(m)}: X^{δ−1/2}` : 'δ > 0: X^{δ−1/2}']
      ]);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      setPieces($('plotTitleB'), L(['托普利茨最小特征值 λ<sub>min</sub>(δ)'], ['Least Toeplitz', 'eigenvalue λ<sub>min</sub>(δ)']), ' ');
      setPieces($('plotMetaB'), [`N = ${NT}, γ<sub>1</sub>`], '');
      const narrow = cb.clientWidth < 250,
        g = kit.plot(cb, { x: [0, DMAX], y: Y_B, pad: [34, 14, 12, 22] });
      g.axes({ xTicks: narrow ? [0, 0.2, 0.4] : [0, 0.1, 0.2, 0.3, 0.4], xFmt: (v) => v.toFixed(1), yTicks: [-0.5, 0, 0.5] });
      g.text(0, Y_B[0], 'δ', P.dim, { base: 'bottom', dx: 8, dy: -4, face: 'body' });
      // λ_min is 0 at δ = 0 alone (the cyan dot) and negative for every δ > 0 (the magenta line)
      g.line(LAMBDA_CURVE, P.magenta, { width: 2 });
      g.line(DRIFT_CURVE, P.magenta, { width: 1.6, dash: [5, 4] });
      g.dot(0, 0, P.cyan, 4);
      g.line([[m.delta, Y_B[0]], [m.delta, CUT_B]], P.amber, { width: 1 });
      if (m.K) g.dot(m.delta, m.lambda, P.amber, 3.5);
      g.legend(
        [
          [P.cyan, 'δ = 0: λ_{min} = 0'],
          [P.magenta, 'δ > 0: λ_{min} < 0'],
          [P.magenta, '200 (‖u_{+}‖ − 1)', 'dash']
        ],
        { right: false }
      );
    }
  }

  /* ---------- readouts ---------- */
  function readings(m, I) {
    const list = (...xs) => xs.join(' · ');
    $('roKey').textContent = lamRel(m);
    $('roKeySub').textContent = ` · ${list(`β ${betaRel(m)}`, `K ${intRel(m.K)}`, `δ ${deltaRel(m)}`, `ln X ${yRel(m)}`)}`;
    $('roCayley').textContent = m.K ? list(outRel(m), innRel(m), offRel(m)) : L('K = 0：无像', 'K = 0: no image');
    $('roCrease').textContent = list(jumpRel(m), defectRel(m), driftRel(m));
    $('roLantern').textContent = list(intRel(m.n), intRel(m.m), ratioRel(m), tiltRel(m));
    $('roDecay').textContent = list(spikeRel(m), baseRel(m), etaRel(m));
    $('roExplicit').textContent = list(...[I.explicit.lhs, I.explicit.rhs, I.explicit.gap, I.explicit.tail].map((x) => rel(null, x)));
    $('roChannels').textContent = list(worstRel(m), ...[m.channels.error, m.channels.bound, m.channels.chi].map((x) => rel(null, x)));
    const half = rel(null, I.threshold.half),
      more = rel(null, I.threshold.threeQuarters);
    $('roNote').innerHTML = L(
      `U(X)/X<sup>1/2</sup> ${half}，U(X)/X<sup>3/4</sup> ${more}；托普利茨矩阵 ${I.toeplitz.size} × ${I.toeplitz.size}，秩 ${m.rank}。`,
      `U(X)/X<sup>1/2</sup> ${half}, U(X)/X<sup>3/4</sup> ${more}; Toeplitz matrix ${I.toeplitz.size} × ${I.toeplitz.size} of rank ${m.rank}.`
    );
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`;
    $('keyPill').innerHTML = `${LAM} <strong>${lamRel(m)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改当前参数 · 拖空白处转视角 · 空格播放', 'drag the amber handle to set the parameter · drag empty space to orbit · Space plays');
    $('formula').textContent = 'u = (ρ − 1)/ρ · ‖u‖ = 1 ⇔ Re ρ = 1/2';
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    // between two cards the sliders stand on the nearest step, and their outputs say the parameters of the frame
    bf.set(m.beta);
    kf.set(m.K);
    df.set(round2(m.delta));
    $('betaOut').textContent = BETA_OUT(m.beta);
    $('deltaOut').textContent = DELTA_OUT(m.delta);
    $('deltaZero').setAttribute('aria-pressed', String(m.delta === 0));
  }
  const frameOf = (c) => compute(c.beta, c.K, c.delta, c.y, c.n);
  const calc = () => frameOf(current()),
    // the frame the rail and the sliders ask for: between two cards the drawing blends towards it
    goal = () => frameOf(targets());
  let liveNotes = null; // set once the cards exist: keeps the card and free-play notes true to the frame asked for
  const paint = kit.painter(() => {
    const m = calc(),
      I = instances(m);
    hud(m);
    if (liveNotes) liveNotes(goal());
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: 1 / 5,
    step: SCENES[state.scene].step,
    max: 1,
    t: 1,
    format: (t) => RAIL_TEXT[SCENES[state.scene].param](VALUE[SCENES[state.scene].param](t)),
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a card plays from the start of its rail up to its still and parks there
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
  /** Go to a scene with the parameters `set`; the layers and the parameters blend over ms from what is drawn now. */
  function setScene(scene, set, t, ms) {
    const before = { ...current(), layers: layers(), rx: fit.rx || SCENES[state.scene].rx, rz: fit.rz || SCENES[state.scene].rz };
    if (transition) transition.cancel();
    transition = null;
    state.scene = scene;
    state.set = { ...state.set, ...set };
    clock.step = SCENES[scene].step;
    state.from = null;
    state.blend = 1;
    clock.set(t, true);
    if (ms > 0 && !TRV.still) startBlend(before, ms);
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopAt = null;
    cards.mark(null);
    clock.pause();
    if (transition) {
      transition.cancel();
      transition = null;
    }
  }
  /** A slider sets its parameter: on the rail when the scene drives it, otherwise directly. Modes and offset belong to the
      ring, so from the two scenes without it they open the scene that shows them, with everything else kept. */
  function setParam(p, v) {
    leave();
    const now = current();
    if (SCENES[state.scene].param === p) clock.set(RAIL[p](v));
    else if ((p === 'K' || p === 'delta') && v > 0 && !SCENES[state.scene].layers.ring) {
      const scene = p === 'K' ? 'glue' : 'offline';
      setScene(scene, { ...now, [p]: v }, RAIL[p](v), 0);
      paint();
    } else {
      state.set[p] = v;
      paint();
    }
  }
  const BETA_OUT = (v) => rel(cent(v), v, 2),
    DELTA_OUT = (v) => `${rel(cent(v), v, 2)} · σ ${rel(plus(HALF_Q, cent(v)), 0.5 + v, 2)}`;
  const bf = kit.field($('betaRange'), { fmt: BETA_OUT, onInput: (v) => setParam('beta', v) });
  const kf = kit.field($('modesRange'), { fmt: intRel, onInput: (v) => setParam('K', v) });
  const df = kit.field($('deltaRange'), { fmt: DELTA_OUT, onInput: (v) => setParam('delta', v) });
  // the chip back to the proven line: on the off-line card it is the start of the rail, and the card stays
  $('deltaZero').addEventListener('click', () => {
    if (SCENES[state.scene].param === 'delta') {
      stopAt = null;
      clock.pause();
      clock.set(0);
    } else if (current().delta > 0) setParam('delta', 0);
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens keeps the state: it renames the picture and lays the 1854 plates and the off-line places over it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards and their live notes ---------- */
  const CREASES = 'riemann-1854-tangent-lantern-creases',
    SWAP = 'osculating-ternion-sphere-base-swap',
    GLUE = 'critical-half-toeplitz-spectral-glue',
    OFFLINE = 'counterfactual-offline-spike-breakdown',
    POLISHED = 'polished-isotropic-manifold-completion';
  /** The square-root residual at the two ends of the rail of ln X. */
  const [BASE_FROM, BASE_TO] = [0, 1].map((t) => rel(null, exp(-0.5 * VALUE.y(t))));
  /** The notes of the cards for the live frame, [zh, en]. */
  const CARD_NOTES = {
    [CREASES]: (m) =>
      two(
        `左边的球由 12 块平直切板 T<sub>p</sub>M 拼成，品红棱上法向跳变 ${jumpRel(m)}，20 个顶点各亏 ${defectRel(m)}，合起来恰是 4π。右边是施瓦茨灯笼：n = ${m.n}、m = n² = ${m.m}，离柱面的最大距离 ${gapRel(m)}，面积却是柱面的 ${ratioRel(m)} 倍（n → ∞ 时的极限 √(1 + π⁴/4) ${LIMIT_REL}），法向斜 ${tiltRel(m)}：点收敛了，面积与法向没有。`,
        `The ball on the left is made of 12 flat plates T<sub>p</sub>M; across a magenta edge the normal jump is ${jumpRel(m)}, and each of the 20 corners loses ${defectRel(m)}, 4π in all. On the right is the Schwarz lantern with n = ${m.n} and m = n² = ${m.m}: its largest distance from the cylinder is ${gapRel(m)}, yet its area is ${ratioRel(m)} that of the cylinder (limit √(1 + π⁴/4) ${LIMIT_REL}) and its normals are tilted by ${tiltRel(m)}: the points converge, the area and the normals do not.`
      ),
    [SWAP]: (m) =>
      m.beta >= 1
        ? two(
            `β = 1：每块切板换成二阶吻合球 T<sub>3</sub><sup>(p)</sup>。单位球面在切点处下沉 x²/2 + y²/2，两个系数 1/2 + 1/2 = 1；常曲率球面上这些吻合球是同一只球，法向跳变 ${jumpRel(m)}，没有接缝。品红线框是原来的切板，棱角外漂 ${PLATE_DRIFT}。`,
            `β = 1: every plate is replaced by the second-order osculating sphere T<sub>3</sub><sup>(p)</sup>. At a point of tangency the unit sphere falls off by x²/2 + y²/2, and the two coefficients add up to 1/2 + 1/2 = 1; on a sphere of constant curvature these osculating spheres are one sphere, normal jump ${jumpRel(m)}, no seam. The magenta frame is where the plates stood, corner drift ${PLATE_DRIFT}.`
          )
        : two(
            `β ${betaRel(m)}：${m.beta <= 0 ? '仍是一阶切板' : '切板正弯向二阶吻合球'}，法向跳变 ${jumpRel(m)}，顶点亏角 ${defectRel(m)}，棱角外漂 ${driftRel(m)}。把时间轴推到 β = 1，折痕消失。`,
            `β ${betaRel(m)}: ${m.beta <= 0 ? 'still the first-order plates' : 'the plates are bending towards the second-order osculating sphere'}, normal jump ${jumpRel(m)}, corner defect ${defectRel(m)}, corner drift ${driftRel(m)}. Push the rail to β = 1 and the creases are gone.`
          ),
    [GLUE]: (m) =>
      m.K === 0
        ? two(
            `K = 0、δ = 0：环上还没有像，球面上是 C<sup>∞</sup> 鼓包胶合留下的品红接缝（η ${etaRel(m)}），${LAM} ${lamRel(m)}。推动时间轴，逐对加入零点。`,
            `K = 0, δ = 0: no image on the ring yet, and the ball shows the magenta seams left by gluing with C<sup>∞</sup> bumps (η ${etaRel(m)}); ${LAM} ${lamRel(m)}. Push the rail to add the zeros pair by pair.`
          )
        : two(
            `δ = 0：前 ${m.K} 对零点的凯莱像 u<sub>k</sub> = (ρ<sub>k</sub> − 1)/ρ<sub>k</sub> 都在青色单位圆上，${U_K} ${normRel(m)}；托普利茨矩阵半正定，${LAM} ${lamRel(m)} ≥ 0。每对一条青色谱弦绕满整只球；接缝残差 η ${etaRel(m)}${m.K === KMAX ? '，接缝熔平' : ''}。`,
            `δ = 0: the Cayley images u<sub>k</sub> = (ρ<sub>k</sub> − 1)/ρ<sub>k</sub> of the first ${m.K} zero pairs sit on the cyan unit circle, ${U_K} ${normRel(m)}; the Toeplitz matrix is positive semidefinite, ${LAM} ${lamRel(m)} ≥ 0. Each pair runs one cyan string around the whole ball; seam residual η ${etaRel(m)}${m.K === KMAX ? ', the seams have melted' : ''}.`
          ),
    [OFFLINE]: (m) =>
      m.delta > 0
        ? two(
            `反事实对照：把前 ${m.K} 对零点推到 1/2 ± δ + iγ<sub>k</sub>，δ ${deltaRel(m)}。每个像裂成圆外、圆内两个，${splitZh(m)}，球面长出品红棱角，高 ${SPIKE} ${spikeRel(m)}（δ = 0 时只有 ${BASE} ${baseRel(m)}）。按 ⏮ 或 δ = 0 回到已证的 σ = 1/2。`,
            `A counterfactual: the first ${m.K} zero pairs are pushed to 1/2 ± δ + iγ<sub>k</sub>, δ ${deltaRel(m)}. Every image splits into one outside and one inside the circle, ${splitEn(m)}, and the ball grows magenta spikes of height ${SPIKE} ${spikeRel(m)} (at δ = 0 only ${BASE} ${baseRel(m)}). Press ⏮ or δ = 0 to return to the proven σ = 1/2.`
          )
        : two(
            `δ = 0，已证的 σ = 1/2：前 ${m.K} 对的像全部并回单位圆，${U_OUT} = ${U_IN} ${outRel(m)}，${LAM} ${lamRel(m)} ≥ 0，棱角收回，球面光滑（残差 ${BASE} ${baseRel(m)}）。按 ▶ 再看离轴时会怎样。`,
            `δ = 0, the proven σ = 1/2: the images of the first ${m.K} pairs are all back on the unit circle, ${U_OUT} = ${U_IN} ${outRel(m)}, ${LAM} ${lamRel(m)} ≥ 0, the spikes are gone and the ball is smooth (residual ${BASE} ${baseRel(m)}). Press ▶ to see again what leaving the line would do.`
          ),
    [POLISHED]: (m) =>
      two(
        `β = 1、K = 24、δ = 0：球面没有折痕与接缝，青色测地线处处光滑。时间轴推的是 ln X：残差 ${BASE} 从 ${BASE_FROM} 退到 ${BASE_TO}，此刻 ${BASE} ${baseRel(m)}；六条青色环是模 7 的六个余数类，所含素数的份额越推越齐，此刻最大份额偏离 ${worstRel(m)}。`,
        `β = 1, K = 24, δ = 0: the ball has no crease and no seam, and the cyan geodesic is smooth everywhere. The rail drives ln X: the residual ${BASE} anneals from ${BASE_FROM} to ${BASE_TO}, now ${BASE} ${baseRel(m)}; the six cyan rings are the six classes modulo 7, whose shares of the primes even out, now largest share gap ${worstRel(m)}.`
      )
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts, only what its stage shows
  const FIGURE_NOTES = {
    [CREASES]: (m) => two(`左球：12 块切板，跳变 ${jumpRel(m)}；右：灯笼 n = ${m.n}、m = ${m.m}，面积 ${ratioRel(m)}。`, `Left: 12 plates, jump ${jumpRel(m)}. Right: lantern n = ${m.n}, m = ${m.m}, area ${ratioRel(m)}.`),
    [SWAP]: (m) =>
      m.beta >= 1
        ? two(`β = 1：折痕消失，法向跳变 ${jumpRel(m)}；品红线框是原来的切板。`, `β = 1: no crease, normal jump ${jumpRel(m)}; the magenta frame is where the plates stood.`)
        : two(`β ${betaRel(m)}：品红棱上法向跳变 ${jumpRel(m)}，棱角外漂 ${driftRel(m)}。`, `β ${betaRel(m)}: magenta edges, normal jump ${jumpRel(m)}, corner drift ${driftRel(m)}.`),
    [GLUE]: (m) =>
      m.K === 0
        ? two('K = 0：环上没有像，球面上是品红接缝。', 'K = 0: no image on the ring, magenta seams on the ball.')
        : two(`前 ${m.K} 对的像在青色单位圆上；${m.K === KMAX ? '接缝熔平' : '接缝未平'}。`, `The images of the first ${m.K} pairs lie on the cyan unit circle; the seams ${m.K === KMAX ? 'have melted' : 'remain'}.`),
    [OFFLINE]: (m) =>
      m.delta > 0
        ? two(`反事实 δ ${deltaRel(m)}：像裂到圆外与圆内，球面长出品红棱角。`, `Counterfactual δ ${deltaRel(m)}: the images split off the circle and magenta spikes erupt.`)
        : two('δ = 0：像并回青色单位圆，球面光滑。', 'δ = 0: the images are back on the cyan unit circle and the ball is smooth.'),
    [POLISHED]: (m) => two(`ln X ${yRel(m)}：球面无缝，残差 ${baseRel(m)}，六条青色环最大份额偏离 ${worstRel(m)}。`, `ln X ${yRel(m)}: no seam, residual ${baseRel(m)}; six cyan rings, largest share gap ${worstRel(m)}.`)
  };
  const cardNote = (id, m, figure) => (figure ? FIGURE_NOTES : CARD_NOTES)[id](m);
  const HINT = two('拖琥珀手柄、时间轴或滑块改 β、K 与 δ，换透镜或视角。随时可以再选一张卡。', 'Drag the amber handle, the rail or the sliders to set β, K and δ; switch the lens or the view. Pick a card again at any time.');
  /** Free play: the regime of the frame, then the hint. */
  function idleNote(m) {
    const s = state.scene;
    let lead;
    if (s === 'lantern') lead = two(`此刻 n = ${m.n}、m = ${m.m}，灯笼面积是柱面的 ${ratioRel(m)} 倍；左球法向跳变 ${jumpRel(m)}。`, `right now n = ${m.n} and m = ${m.m}, and the area of the lantern is ${ratioRel(m)} that of the cylinder; on the ball the normal jump is ${jumpRel(m)}. `);
    else if (s === 'swap') lead = m.beta >= 1 ? two('此刻 β = 1，吻合球彼此重合，没有折痕。', 'right now β = 1: the osculating spheres coincide and there is no crease. ') : two(`此刻 β ${betaRel(m)}，法向跳变 ${jumpRel(m)}。`, `right now β ${betaRel(m)}, normal jump ${jumpRel(m)}. `);
    else {
      lead = offLine(m)
        ? two(`此刻是反事实 δ ${deltaRel(m)}：像离开单位圆，${valued(`${LAM} &lt; 0`, lamRel(m), ZH)}，球面长出棱角。`, `right now the counterfactual δ ${deltaRel(m)}: the images leave the unit circle, ${valued(`${LAM} &lt; 0`, lamRel(m), EN)}, and spikes erupt. `)
        : vacuous(m)
          ? two(`此刻 K = 0，没有零点对，δ ${deltaRel(m)} 无像可移，${LAM} ${lamRel(m)}。`, `right now K = 0, so δ ${deltaRel(m)} moves nothing, ${LAM} ${lamRel(m)}. `)
          : m.K
            ? two(`此刻 δ = 0：前 ${m.K} 对的像在单位圆上，${LAM} ${lamRel(m)} ≥ 0。`, `right now δ = 0: the images of the first ${m.K} pairs are on the unit circle, ${LAM} ${lamRel(m)} ≥ 0. `)
            : two(`此刻 K = 0、δ = 0：还没有零点对，${LAM} ${lamRel(m)}。`, `right now K = 0 and δ = 0: no zero pair yet, ${LAM} ${lamRel(m)}. `);
      lead = join(lead, seamClause(m), creaseClause(m));
    }
    return join(two('自由探索：', 'Free play: '), lead, HINT);
  }
  function applyPreset(id) {
    const p = presets[id];
    stopAt = null;
    clock.pause();
    // a still, a reader who asked for reduced motion and a freshly opened page or figure park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting;
    setScene(p.scene, { beta: p.beta, K: p.K, delta: p.delta, y: p.y, n: p.n }, parked ? p.still : 0, booting || TRV.still ? 0 : 600);
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
  // kit.cards reads both tables when it writes a note, so the page swaps their entries in place
  const notesObj = Object.fromEntries(Object.keys(presets).map((id) => [id, two('', '')])),
    idlePair = [...HINT];
  const cards = kit.cards($('presets'), {
    presets,
    notes: notesObj,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: idlePair
  });
  /* the notes follow the rail and the sliders: the note of the marked card and the free-play note are built from the
     (β, K, δ, n, ln X) they ask for and written again only when their text changes */
  let noteKey = null;
  liveNotes = (m) => {
    const id = cards.current,
      pair = id ? cardNote(id, m, TRV.figure) : idleNote(m),
      key = `${id || 'idle'}|${pair[0]}`;
    if (key === noteKey) return;
    noteKey = key;
    const slot = id ? notesObj[id] : idlePair;
    slot[0] = pair[0];
    slot[1] = pair[1];
    cards.mark(id);
  };
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag it along its curve, or arrow keys ---------- */
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
    for (let k = 0; k <= 800; k++) {
      const t = k / 800,
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
    const p = SCENES[state.scene].param,
      unitStep = { n: 1, beta: 0.01, K: 1, delta: 0.01, y: 0.1 }[p],
      up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? 1 : RAIL[p](VALUE[p](clock.t) + (up ? unitStep : -unitStep)));
  };
  /* ---------- the NUM box and the numbers of the drawer and of the MODEL box: computed once, when the page opens ----------
     Only the frames of the cards and the sizes of the samples are given: the plates, the lantern, the images, the Toeplitz
     form, ξ, the sieve and the residue classes are run, and the sentences take their numbers from the results. */
  function benchmarks() {
    const O = presets[OFFLINE],
      frame = (id, over = {}) => frameOf({ ...presets[id], ...over });
    const off = frame(OFFLINE),
      on = frame(OFFLINE, { delta: 0 }),
      I = instances(off);
    // where the dashed envelope meets X^{δ − 1/2}: 1 + ENV y² = e^{δ y}
    const over = (y) => Math.log1p(ENV * y * y) - O.delta * y,
      meets = [];
    for (let y = 0.125; y < 128; y += 0.125) {
      if (over(y) * over(y + 0.125) > 0) continue;
      let [a, b] = [y, y + 0.125];
      for (let k = 0; k < 60; k++) {
        const c = (a + b) / 2;
        if (over(a) * over(c) <= 0) b = c;
        else a = c;
      }
      meets.push((a + b) / 2);
    }
    const plates = frame(CREASES);
    return {
      plates,
      sphere: frame(SWAP),
      off,
      on,
      far: frame(OFFLINE, { delta: DMAX }),
      from: frame(POLISHED, { y: VALUE.y(0) }),
      to: frame(POLISHED, { y: VALUE.y(1) }),
      square: lanternOf(plates.n, plates.n),
      I,
      onValues: instances(on).toeplitz,
      meets,
      drift: {
        model: FIXED.model.drift,
        chord: FIXED.chord.gap,
        heap: FIXED.heap.gap,
        closes: FIXED.heap.closes,
        tetra: FIXED.tetra.worst,
        circle: I.cayley.worstOn,
        radial: I.radial,
        xi: FIXED.xi.gap,
        mirror: FIXED.xi.mirrorGap
      }
    };
  }
  const BENCH = benchmarks();
  /** The numbers of the cards, of the drawer and of the MODEL box, by the data-bench of the spans that show them. */
  const NUMBERS = {
    jump: () => jumpRel(BENCH.plates),
    defect: () => defectRel(BENCH.plates),
    n: () => String(BENCH.plates.n),
    ratio: () => ratioRel(BENCH.plates),
    limit: () => LIMIT_REL,
    tilt: () => degRel(null, TILT_LIMIT),
    lam0: () => lamRel(BENCH.on),
    out: () => outRel(BENCH.off),
    inn: () => innRel(BENCH.off),
    lam: () => lamRel(BENCH.off),
    from: () => baseRel(BENCH.from),
    to: () => baseRel(BENCH.to),
    meet0: () => rel(null, BENCH.meets[0], 2),
    meet1: () => rel(null, BENCH.meets[1], 2),
    offset: () => dec(presets[OFFLINE].delta),
    ghost: () => dec(GHOST),
    env: () => dec(ENV),
    seam: () => dec(SEAM, 3),
    ring: () => dec(RC, 1),
    turn: () => String(MTH),
    zoom: () => String(MR),
    classR: () => dec(CHANNEL_R),
    classLift: () => dec(CHANNEL_LIFT)
  };
  /** The text of the NUM box. */
  function numText(say) {
    const { plates, sphere, off, on, far, from, to, square, I, onValues, meets, drift: d } = BENCH,
      { euler: e, chord, model, heap, sagitta: s, tetra, xi } = FIXED,
      list = (...xs) => xs.join(say('、', ', ')),
      gap = (x) => say('的浮点偏差 ', 'drift ') + below(x),
      value = (...xs) => say(`（值 ${list(...xs)}）`, ` (value${xs.length > 1 ? 's' : ''} ${list(...xs)})`),
      num = (x, digits) => rel(null, x, digits),
      holds = (ok, yes, no) => (ok ? yes : no),
      eulerSum = `${e.V} − ${e.E} + ${e.F} = ${e.V - e.E + e.F}`,
      bits = e.constant.toString(2).replace(/0/g, '').length,
      tol = powerName(TETRA_TOL),
      squeeze = [num(s.lower, 8), num(s.value, 8), rel(HALF_Q, s.upper, 8)],
      phases = list(...[s.above, s.at, s.below].map((x) => tinyRel(null, x))),
      sum = degRel(whole(720), CORNERS.length * plates.crease.defect),
      flat = list(jumpRel(sphere), defectRel(sphere), driftRel(sphere)),
      split = holds(off.first.out > 1 && off.first.inn < 1, `${U_OUT} &gt; 1 &gt; ${U_IN}`, `${U_OUT}, ${U_IN}`) + value(outRel(off), innRel(off)),
      least = holds(off.lambda < 0 && far.lambda < 0, `${LAM} &lt; 0`, LAM) + value(lamRel(off), lamRel(far)),
      size = `${I.toeplitz.size} ≥ ${I.toeplitz.values}`,
      deltas = list(dec(off.delta), dec(far.delta)),
      x = I.explicit,
      rest = holds(x.gap <= x.tail, '≤', '&gt;');
    return say(
      `打开页面时由脚本现算，是上面各条定理的个别实例，不检验定理的前提，也不计算规范李曲率。单位四元数：切点读作纯单位四元数，${model.triples} 组 x y⁻¹ z 的模与 1 ${gap(d.model)}；${chord.pairs} 对切点的 κ 与 1 − 弦长²/4 ${gap(d.chord)}，相邻两点 κ ${num(chord.kappa)}、弦长² ${num(chord.dist2)}；沿大圆每步 ${heap.stepDeg}° 走 ${heap.steps} 步，堆递推与 U<sub>n</sub>、T<sub>n</sub> 公式${gap(d.heap)}，终点与起点${gap(d.closes)}。矢高（σ = T = 1）：α = 1/2、N = ${s.few} 时${holds(s.lower <= s.value && s.value <= s.upper, '下界 ≤ 累积矢高 ≤ 上界', '下界、累积矢高、上界')}${value(...squeeze)}；N = ${s.N}、α = 1、1/2、1/4 时依次 ${phases}。切板：法向跳变 ${jumpRel(plates)}，顶点亏角 ${defectRel(plates)}，${CORNERS.length} 个合计 ${sum}，外漂 ${driftRel(plates)}，β = 1 时三者依次 ${flat}；骨架 ${eulerSum}，ℤ/2 边界矩阵的秩 ${e.rank}（F − 1 = ${e.F - 1}，E − V + 1 = ${e.E - e.V + 1}），全 1 标记的边界有 ${bits} 条非零边；4 个切点的三角形相位（度）在 ${tetra.quadruples} 个有序四元组上按 ${tol} 计数的缺陷 ${tetra.defects} 个，浮点余量 ${below(d.tetra)}°，锚在首点的边上链复原失败 ${tetra.edges} 处。灯笼（R = H）：n = ${plates.n}、m = ${plates.m} 时离柱面的最大距离 ${gapRel(plates)}，面积比 ${ratioRel(plates)}，法向斜 ${tiltRel(plates)}；m = n² 的极限 √(1 + π⁴/4) ${LIMIT_REL}、arctan(π²/2) ${degRel(null, TILT_LIMIT)}；m = n = ${square.n} 时面积比 ${timesRel(square.ratio)}。单位圆：γ<sub>k</sub> 是制表小数，实部 1/2 由手工代入，${KMAX} 个像的模与 1 ${gap(d.circle)}，log‖u‖ 与 0 ${gap(d.radial)}；γ₁、δ = ${dec(off.delta)} 时 ${split}；幂和矩阵取 N = ${NT}，${size}；δ = 0 时 ${LAM} ${lamRel(on)}（秩 ${on.rank}，${onValues.values} 个不同的像），δ = ${deltas} 时 ${least}。ξ：ξ(2) ${num(xi.atTwo[0][0])}；θ 积分与 π<sup>−s/2</sup>Γ(s/2)ζ(s) 在 s = 2、3/4 + 5i 处${gap(d.xi)}，ξ(1 − s) 与 ξ(s) 在 s = 3/4 + 5i 处${gap(d.mirror)}。显式公式：ln X ${yRel(off)} 时 ${KMAX} 对之和 ${num(x.lhs)}，右端 ${num(x.rhs)}，两者之差 ${rest} 余下质量乘 X<sup>1/2</sup>${value(num(x.gap), num(x.tail))}；${KMAX} 对的系数和 ${num(x.sum)}，全部零点 2 + γ<sub>E</sub> − ln 4π ${num(x.mass)}；U(X)/X<sup>1/2</sup> ${num(I.threshold.half)}，U(X)/X<sup>3/4</sup> ${num(I.threshold.threeQuarters)}。残差：ln X ${yRel(off)} 时 ${SPIKE} ${spikeRel(off)}（δ = ${dec(off.delta)}），${BASE} ${baseRel(off)}；ln X 从 ${from.y} 到 ${to.y}，${BASE} 从 ${baseRel(from)} 到 ${baseRel(to)}；虚线包络与 ${SPIKE}（δ = ${dec(off.delta)}）在 ln X ${num(meets[0], 2)} 与 ln X ${num(meets[1], 2)} 处相交；ln X ${yRel(to)} 时模 7 的最大份额偏离 ${worstRel(to)}，|π(X; 7, a) − Li(X)/6|/X 的最大值 ${num(to.channels.error)}。数值演示，不是证明。`,
      `Computed by the script when the page opens, single instances of the theorems above; it checks no hypothesis and computes no canonical Li curvature; every drift is a floating-point one. Unit quaternions (points of tangency as pure units): norms of ${model.triples} transfers x y⁻¹ z vs 1, ${gap(d.model)}; κ vs 1 − chord²/4 over ${chord.pairs} pairs, ${gap(d.chord)}; neighbours have κ ${num(chord.kappa)}, chord² ${num(chord.dist2)}; ${heap.steps} steps of ${heap.stepDeg}° along a great circle, heap vs U<sub>n</sub>, T<sub>n</sub>, ${gap(d.heap)}, end vs start, ${gap(d.closes)}. Sagitta (σ = T = 1): at α = 1/2, N = ${s.few}, ${holds(s.lower <= s.value && s.value <= s.upper, 'lower bound ≤ sagitta ≤ upper bound', 'lower bound, sagitta, upper bound')}${value(...squeeze)}; at N = ${s.N}, α = 1, 1/2, 1/4 in turn ${phases}. Plates: normal jump ${jumpRel(plates)}, corner defect ${defectRel(plates)}, sum of all ${CORNERS.length} ${sum}, corner drift ${driftRel(plates)}, at β = 1 in turn ${flat}; skeleton ${eulerSum}, ℤ/2 boundary of rank ${e.rank} (F − 1 = ${e.F - 1}, E − V + 1 = ${e.E - e.V + 1}), ${bits} edges in that of the all-ones labelling; triangle phases (degrees) of 4 points of tangency: ${tetra.defects} defects counted to ${tol} on ${tetra.quadruples} ordered quadruples, residue ${below(d.tetra)}°, ${tetra.edges} failures of the edge cochain anchored at the first point. Lantern (R = H), n = ${plates.n}, m = ${plates.m}: largest distance from the cylinder ${gapRel(plates)}, area ratio ${ratioRel(plates)}, tilt ${tiltRel(plates)}; limits for m = n²: √(1 + π⁴/4) ${LIMIT_REL}, arctan(π²/2) ${degRel(null, TILT_LIMIT)}; m = n = ${square.n}: area ratio ${timesRel(square.ratio)}. Circle (γ<sub>k</sub> tabulated decimals, real part 1/2 put in by hand): norms of the ${KMAX} images vs 1, ${gap(d.circle)}; log‖u‖ vs 0, ${gap(d.radial)}; at γ₁, δ = ${dec(off.delta)}, ${split}; power sums with N = ${NT}, ${size}; at δ = 0, ${LAM} ${lamRel(on)} (rank ${on.rank}, ${onValues.values} distinct images); at δ = ${deltas}, ${least}. ξ(2) ${num(xi.atTwo[0][0])}; theta integral vs π<sup>−s/2</sup>Γ(s/2)ζ(s) at s = 2, 3/4 + 5i, ${gap(d.xi)}; ξ(1 − s) vs ξ(s) at 3/4 + 5i, ${gap(d.mirror)}. Explicit formula at ln X ${yRel(off)}: ${KMAX} pairs ${num(x.lhs)}, right side ${num(x.rhs)}, their gap ${rest} the remaining mass times X<sup>1/2</sup>${value(num(x.gap), num(x.tail))}; coefficients of the ${KMAX} pairs ${num(x.sum)}, of all zeros 2 + γ<sub>E</sub> − ln 4π ${num(x.mass)}; U(X)/X<sup>1/2</sup> ${num(I.threshold.half)}, U(X)/X<sup>3/4</sup> ${num(I.threshold.threeQuarters)}. Residual: at ln X ${yRel(off)}, ${SPIKE} ${spikeRel(off)} (δ = ${dec(off.delta)}), ${BASE} ${baseRel(off)}; from ln X = ${from.y} to ${to.y}, ${BASE} from ${baseRel(from)} to ${baseRel(to)}; the dashed envelope meets ${SPIKE} (δ = ${dec(off.delta)}) at ln X ${num(meets[0], 2)} and at ln X ${num(meets[1], 2)}; at ln X ${yRel(to)}, largest share gap modulo 7 ${worstRel(to)}, largest |π(X; 7, a) − Li(X)/6|/X ${num(to.channels.error)}. A numerical illustration, not a proof.`
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
  TRV.onLang(() => {
    noteKey = null;
    paint();
  });

  /* ---------- probe, cover, start ---------- */
  window.RIEMANN_POLISH_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return JSON.parse(
        JSON.stringify({
          ...m,
          scene: state.scene,
          lens: state.lens,
          cam: state.cam,
          layers: layers(),
          t: clock.t,
          playing: clock.playing,
          preset: cards.current,
          blending: !!(state.from && state.blend < 1),
          camera: { ...sc.cam },
          leanInstances: instances(m)
        })
      );
    },
    /** The mathematics at (β, K, δ, ln X, n), without touching the page. */
    calc: (beta, K, delta, y = 7, n = 6) => {
      const m = compute(beta, K, delta, y, n);
      return JSON.parse(JSON.stringify({ ...m, leanInstances: instances(m) }));
    },
    /** What the NUM box, the drawer and the MODEL box are written from. */
    bench: () => JSON.parse(JSON.stringify({ drift: BENCH.drift, meets: BENCH.meets, offset: presets[OFFLINE].delta, far: DMAX, y: presets[OFFLINE].y, n: presets[CREASES].n, few: FIXED.sagitta.few, N: FIXED.sagitta.N, stepDeg: FIXED.heap.stepDeg, env: ENV, seam: SEAM, ring: RC, classR: CHANNEL_R, classLift: CHANNEL_LIFT, ghost: GHOST })),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), below, sci },
    gamma: [...GAMMA],
    lambda: (k, delta) => quartetLambda(GAMMA[k - 1], delta),
    images: (k, delta) => images(GAMMA[k - 1], delta),
    /** The drawn radius of the ball over a unit direction, at the frame on screen. */
    radius: (d) => field(calc(), layers()).at(d).r,
    sites: JSON.parse(JSON.stringify(SITES)),
    corners: JSON.parse(JSON.stringify(CORNERS)),
    spikes: JSON.parse(JSON.stringify(SPIKES)),
    presets: JSON.parse(JSON.stringify(presets)),
    ringAt: (theta, r) => ringAt(theta, r),
    plotRanges: { a: [...Y_A], b: [...Y_B] },
    /** Viewport coordinates of the amber handle at the rail position t, for drag targets. */
    dragTarget: viewportPoint,
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
