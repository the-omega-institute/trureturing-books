/* OMEGA//PRIME-ZERO · 素数寄存器与黎曼零点的全息对偶与双内禀均匀 · prime registers, Riemann zeros and two intrinsic
   uniformities (Chapter 31, §31.7)
   World (kit.solid): z up. The violet ball stands for the ternion sphere 𝕋₃ ≅ S³(1); every card arranges its objects
   round it, in world-fixed places chosen once from the default view.
     cavity   the mirror σ = 1/2 is the equatorial plane; twelve prime registers 2 … 37 stand evenly on it, each with a
              hand at the angle −t ln p, a cyan stem 0.75 p^{−σ} above and a magenta stem 0.75 p^{−(1−σ)} below; the
              critical line is a cyan meridian of the ball carrying γ₁ … γ₁₅ (by ũ in the duality lens, by t in the
              flat one); the rail climbs t from 10 to 70; δ = σ − 1/2 > 0 splits the chosen zero into two shells
     mertens  the primes up to 1000 move from the flat x axis (β = 0, height π(x)) to the Mertens helix (β = 1: turn ln p,
              height Σ_{q≤p} ln q/q); on the ball the axes of the 112 integer quaternions of norm 13, coloured by κ
     unfold   three rings round the ball: a rigid lattice u_n = n, the first thirty zeros (raw γ at β = 0, unfolded
              ũ = θ(γ)/π + 3/2 at β = 1) and thirty Poisson points of a fixed seed
     landau   the phases {γ_n ln q/2π} of the first K zeros on a wheel; thirteen gate bars of height Λ_K(q)
     modular  φ(q) towers of the shares π(X; q, a)/π(X) against the level 1/φ(q); a mast for X = 10^{1+r}
   The ordinates γ₁ … γ₁₀₀ are input data (computed to 70 digits, kept in doubles). θ(t) is the Riemann–Siegel theta
   (Stirling series), Z(t) the Riemann–Siegel formula with two correction terms. Fractions are pairs of big integers
   [p, q], q > 0: a number is printed after “=” only when the printed decimal is the value, decided on fractions, and
   after “≈” when it rounds it. Read-only probe: window.PRIME_ZERO_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot,
    abs = Math.abs,
    ln = Math.log;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const mix = (a, b, u) => a.map((x, i) => lerp(x, b[i], u));
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));
  const EULER_GAMMA = 0.5772156649015329;

  /* ---------- exact numbers: fractions [p, q] of big integers, q > 0 ---------- */
  const gcdB = (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) [a, b] = [b, a % b];
    return a;
  };
  const frac = (p, q = 1n) => {
    if (q < 0n) [p, q] = [-p, -q];
    const g = gcdB(p, q) || 1n;
    return [p / g, q / g];
  };
  const whole = (n) => [BigInt(n), 1n],
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d);
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const equal = (a, b) => cmp(a, b) === 0;
  const ZERO = whole(0),
    ONE = whole(1),
    HALF = [1n, 2n];
  /** The double x itself: an integer over a power of two. */
  const ratio = (x) => {
    let s = 0n;
    for (; !Number.isInteger(x); s++) x *= 2;
    return frac(BigInt(x), 1n << s);
  };
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
  const subscript = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  /** d + 1 significant digits with a power of ten. */
  const sci = (x, d = 3) => {
    const [m, e] = x.toExponential(d).split('e').map(Number);
    return `${kit.fix(m, d)}×10${superscript(e)}`;
  };
  /* The relation before a printed number, one rule for the whole page. “=” stands before digits that are the value itself;
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as
     one of them. A no-break space keeps the relation with its digits. */
  const NB = '\u00a0';
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction (null: not rational, or not known exactly); x: the value as computed, a double. */
  function rel(q, x, d = 4) {
    if (q && !(abs(fval(q) - x) <= 1e-9 * Math.max(1, abs(x)))) q = null;
    const { text, exact } = q ? decimals(q, d) : { text: fmt(x, d), exact: false };
    if (exact) return `=${NB}${text}`;
    const mark = LANDMARKS.find(([v]) => Number(text.replace('−', '-')) === v);
    if (mark) {
      const [v, name] = mark,
        gap = q ? fval(minus(q, ratio(v))) : x - v;
      if (gap !== 0) return name ? `≈${NB}${name} ${gap < 0 ? '−' : '+'} ${sci(abs(gap))}` : `≈${NB}${sci(gap)}`;
    }
    return `≈${NB}${text}`;
  }
  /** A value of the page: a fraction q when it is known exactly, and the double x. */
  const num = (q) => ({ q, x: fval(q) }),
    flo = (x) => ({ q: null, x });
  /** The relation and digits of a value. */
  const say = (v, d = 4) => rel(v.q, v.x, d);
  /** “= fraction” when it is known, else the relation and the decimal: what follows a name. */
  const is = (v, d = 4) => (v.q ? `=${NB}${fstr(v.q)}` : rel(null, v.x, d));
  /** A fraction alone when it is known, else the decimal with its relation. */
  const short = (v, d = 4) => (v.q ? fstr(v.q) : rel(null, v.x, d));
  /** A small value whose sign matters: below 5·10⁻⁴ four significant digits. */
  const tiny = (x) => (x !== 0 && abs(x) < 5e-4 ? `≈${NB}${sci(x)}` : rel(null, x));
  /** A rounding residue of doubles: “= 0” when the doubles give 0 exactly, else the least power of ten above it. */
  const below = (x) => {
    if (x === 0) return `=${NB}0`;
    let e = Math.ceil(Math.log10(abs(x)));
    if (10 ** e <= abs(x)) e++;
    return `&lt;${NB}10${superscript(e)}`;
  };

  /* ---------- data: the first hundred ordinates of the zeros of ζ on the critical line ---------- */
  const GAMMA = [
    14.1347251417346938, 21.022039638771555, 25.0108575801456888, 30.4248761258595132, 32.9350615877391897, 37.5861781588256713, 40.9187190121474952, 43.3270732809149995, 48.0051508811671597, 49.7738324776723022,
    52.9703214777144606, 56.4462476970633948, 59.3470440026023531, 60.8317785246098098, 65.1125440480816067, 67.0798105294941737, 69.5464017111739793, 72.0671576744819076, 75.7046906990839332, 77.1448400688748054,
    79.3373750202493679, 82.9103808540860302, 84.7354929805170501, 87.4252746131252294, 88.8091112076344654, 92.4918992705584843, 94.651344040519887, 95.8706342282453098, 98.8311942181936922, 101.317851005731391,
    103.725538040478339, 105.446623052326094, 107.168611184276408, 111.029535543169675, 111.874659176992637, 114.320220915452713, 116.226680320857554, 118.790782865976217, 121.370125002420646, 122.946829293552588,
    124.256818554345767, 127.516683879596495, 129.578704199956051, 131.087688530932657, 133.497737202997586, 134.756509753373871, 138.116042054533443, 139.736208952121389, 141.123707404021124, 143.111845807620633,
    146.000982486765519, 147.422765342559602, 150.05352042078488, 150.925257612241467, 153.024693811198896, 156.112909294237868, 157.59759181759406, 158.849988171420499, 161.188964137596028, 163.030709687181987,
    165.537069187900419, 167.184439978174513, 169.094515415568821, 169.911976479411699, 173.411536519591553, 174.754191523365726, 176.441434297710419, 178.377407776099977, 179.916484020256996, 182.207078484366462,
    184.874467848387509, 185.598783677707471, 187.228922583501852, 189.416158656016937, 192.026656360713787, 193.079726603845704, 195.265396679529235, 196.876481840958317, 198.015309676251912, 201.264751943703789,
    202.493594514140534, 204.189671803104554, 205.394697202163286, 207.90625888780621, 209.57650971685626, 211.690862595365308, 213.347919359712666, 214.547044783491423, 216.1695385082637, 219.067596349021379,
    220.714918839314003, 221.430705554693339, 224.007000254604335, 224.983324669582288, 227.421444279679291, 229.337413305525348, 231.250188700499165, 231.987235253180249, 233.693404178908301, 236.524229665816206
  ];
  const NZ = 15,
    KMAX = GAMMA.length;
  /** The twelve registers of the FRACTRAN observer. */
  const PR12 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  const LNPRIM = PR12.reduce((s, p) => s + ln(p), 0);

  /* ---------- the analytic core ---------- */
  /** The Riemann–Siegel theta θ(t) = arg Γ(1/4 + it/2) − (t/2) ln π, by its Stirling series (t ≥ 10 here). */
  const theta = (t) => (t / 2) * ln(t / TAU) - t / 2 - PI / 8 + 1 / (48 * t) + 7 / (5760 * t ** 3) + 31 / (80640 * t ** 5) + 127 / (430080 * t ** 7);
  /** The π-free turn count ũ(t) = θ(t)/π + 3/2: n − 1/2 of the smooth count θ/π + 1 moved to n. */
  const turnU = (t) => theta(t) / PI + 1.5;
  const UT = GAMMA.map(turnU);
  const Psi = (x) => cs(TAU * (x * x - x - 1 / 16)) / cs(TAU * x);
  /** Hardy's Z(t) = e^{iθ(t)} ζ(1/2 + it), real, by the Riemann–Siegel formula with the corrections C₀ and C₁. */
  function hardyZ(t) {
    const a = Math.sqrt(t / TAU),
      N = Math.floor(a),
      th = theta(t);
    let p = a - N,
      s = 0;
    for (let n = 1; n <= N; n++) s += cs(th - t * ln(n)) / Math.sqrt(n);
    if (abs(cs(TAU * p)) < 1e-6) p += 2e-6;
    const h = 1e-3,
      d3 = (Psi(p + 2 * h) - 2 * Psi(p + h) + 2 * Psi(p - h) - Psi(p - 2 * h)) / (2 * h ** 3),
      C0 = Psi(p),
      C1 = -d3 / (96 * PI * PI),
      r = (TAU / t) ** 0.25 * (C0 + C1 * Math.sqrt(TAU / t));
    return 2 * s + ((N - 1) % 2 ? -r : r);
  }
  /** |u| for the Cayley image u = (s − 1)/s of s = σ + iγ. */
  const cayleyAbs = (sigma, g) => Math.sqrt(((sigma - 1) ** 2 + g * g) / (sigma * sigma + g * g));

  /* ---------- primes up to a million ---------- */
  const LIMIT = 1000000;
  const PRIMES = (() => {
    const c = new Uint8Array(LIMIT + 1),
      out = [];
    for (let i = 2; i <= LIMIT; i++) {
      if (c[i]) continue;
      out.push(i);
      for (let j = i * i; j <= LIMIT; j += i) c[j] = 1;
    }
    return Int32Array.from(out);
  })();
  /** The number of entries of a sorted array that are ≤ x. */
  const upper = (arr, x) => {
    let lo = 0,
      hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] <= x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const piOf = (x) => upper(PRIMES, x);
  /** Σ_{p≤x} ln p/p, prefix sums over the primes. */
  const MCUM = (() => {
    const out = new Float64Array(PRIMES.length);
    let acc = 0;
    PRIMES.forEach((p, k) => {
      acc += ln(p) / p;
      out[k] = acc;
    });
    return out;
  })();
  const mertensOf = (x) => {
    const k = piOf(x);
    return k ? MCUM[k - 1] : 0;
  };
  const MERTENS = range(6).map((k) => {
    const X = 10 ** (k + 1),
      m = mertensOf(X);
    return { X, e: k + 1, pi: piOf(X), m, gap: m - ln(X) };
  });
  const SLOPE = (mertensOf(1e6) - mertensOf(1e5)) / ln(10);
  /** The primes up to 1000 of the helix, with their counts and Mertens heights. */
  const HELIX_P = Array.from(PRIMES.slice(0, piOf(1000)));
  const HELIX_N = HELIX_P.length;

  /* ---------- integer quaternions of prime norm: rotors on S³ ---------- */
  function rotorsOf(p) {
    const out = [],
      r = Math.floor(Math.sqrt(p));
    for (let w = -r; w <= r; w++)
      for (let x = -r; x <= r; x++)
        for (let y = -r; y <= r; y++) {
          const z2 = p - w * w - x * x - y * y;
          if (z2 < 0) continue;
          const z = Math.round(Math.sqrt(z2));
          if (z * z !== z2) continue;
          out.push([w, x, y, z]);
          if (z) out.push([w, x, y, -z]);
        }
    return out;
  }
  /** Exact moments of the reading κ = (1 + w/√p)/2 over all integer quaternions of norm p. */
  function rotorMoments(list, p) {
    const n = BigInt(list.length),
      sw = list.reduce((s, q) => s + BigInt(q[0]), 0n),
      sw2 = list.reduce((s, q) => s + BigInt(q[0] * q[0]), 0n);
    // E[κ] = 1/2 + E[w]/(2√p): exact only when E[w] = 0; Var κ = (E[w²] − E[w]²)/(4p)
    return { count: list.length, sumW: sw, meanK: sw === 0n ? num(HALF) : flo(0.5 + Number(sw) / Number(n) / (2 * Math.sqrt(p))), varK: sw === 0n ? num(frac(sw2, n * 4n * BigInt(p))) : flo(Number(sw2) / Number(n) / (4 * p) - (Number(sw) / Number(n)) ** 2 / (4 * p)) };
  }
  const ROTOR_P = 13;
  const ROTORS = rotorsOf(ROTOR_P);
  const ROTOR_M = rotorMoments(ROTORS, ROTOR_P);
  /** The Haar density of κ on SU(2) and its distribution function. */
  const haarDensity = (k) => (8 / PI) * Math.sqrt(Math.max(0, k * (1 - k)));
  const haarCdf = (k) => {
    const w = clamp(2 * k - 1, -1, 1);
    return 0.5 + (w * Math.sqrt(1 - w * w) + Math.asin(w)) / PI;
  };
  /** All integer rotors of the primes up to 199: the histogram of κ in 20 bins and the largest gap of distribution functions. */
  const HAAR = (() => {
    const bins = new Float64Array(20),
      ks = [];
    let jacobiBad = 0,
      primes = 0;
    for (const p of PRIMES) {
      if (p > 199) break;
      primes++;
      const list = rotorsOf(p);
      if (list.length !== 8 * (p + 1)) jacobiBad++;
      for (const q of list) ks.push((1 + q[0] / Math.sqrt(p)) / 2);
    }
    ks.sort((a, b) => a - b);
    for (const k of ks) bins[Math.min(19, Math.floor(k * 20))]++;
    let ksDist = 0;
    ks.forEach((k, i) => (ksDist = Math.max(ksDist, abs((i + 1) / ks.length - haarCdf(k)), abs(i / ks.length - haarCdf(k)))));
    return { bins: Array.from(bins, (b) => (b / ks.length) * 20), total: ks.length, primes, jacobiBad, ks: ksDist };
  })();

  /* ---------- the Landau probe ---------- */
  const GATES = [
    ['2', 2, 1],
    ['3', 3, 1],
    ['4', 4, 1],
    ['5', 5, 1],
    ['7', 7, 1],
    ['8', 8, 1],
    ['9', 9, 1],
    ['6', 6, 1],
    ['10', 10, 1],
    ['15', 15, 1],
    ['3/2', 3, 2],
    ['5/3', 5, 3],
    ['15/14', 15, 14]
  ].map(([id, a, b]) => ({ id, a, b, q: a / b, lq: ln(a / b) }));
  const GATE = Object.fromEntries(GATES.map((g) => [g.id, g]));
  /** A prime power p^m as [p, m], or null. */
  function primePower(n) {
    for (let p = 2; p <= n; p++)
      if (n % p === 0) {
        let m = 0;
        while (n % p === 0) {
          n /= p;
          m++;
        }
        return n === 1 ? [p, m] : null;
      }
    return null;
  }
  /** The Landau target Λ(q)/√q: ln p/p^{m/2} at q = p^m, else exactly 0. */
  const targetOf = (g) => {
    const pp = g.b === 1 ? primePower(g.a) : null;
    return pp ? flo(ln(pp[0]) / pp[0] ** (pp[1] / 2)) : num(ZERO);
  };
  /** Partial sums Σ_{n≤K} cos(γ_n ln q) of every gate, K = 0 … 100. */
  const COS_SUMS = Object.fromEntries(
    GATES.map((g) => {
      const out = new Float64Array(KMAX + 1);
      for (let k = 1; k <= KMAX; k++) out[k] = out[k - 1] + cs(GAMMA[k - 1] * g.lq);
      return [g.id, out];
    })
  );
  const landauK = (g, K) => (K < 1 ? 0 : -(TAU / GAMMA[K - 1]) * COS_SUMS[g.id][K]);
  /** The same probe at any x > 1, for the spectrum of the strip. */
  const landauAt = (x, K) => {
    const lx = ln(x);
    let s = 0;
    for (let n = 0; n < K; n++) s += cs(GAMMA[n] * lx);
    return -(TAU / GAMMA[K - 1]) * s;
  };
  const phaseOf = (g, n) => {
    const f = (GAMMA[n] * g.lq) / TAU;
    return f - Math.floor(f);
  };
  /** The largest gap between the share of the K phases in each tenth of the circle and 1/10. */
  function weylGap(g, K) {
    const c = new Array(10).fill(0);
    for (let n = 0; n < K; n++) c[Math.min(9, Math.floor(phaseOf(g, n) * 10))]++;
    return Math.max(...c.map((x) => abs(x / K - 0.1)));
  }

  /* ---------- primes in the classes modulo q ---------- */
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const MODS = [5, 7, 8, 12];
  const CLASSES = Object.fromEntries(
    MODS.map((q) => {
      const units = range(q).filter((a) => a > 0 && gcd(a, q) === 1),
        lists = Object.fromEntries(units.map((a) => [a, []])),
        all = Object.fromEntries(range(q).map((a) => [a, []]));
      for (const p of PRIMES) {
        all[p % q].push(p);
        if (lists[p % q]) lists[p % q].push(p);
      }
      return [q, { units, lists: Object.fromEntries(units.map((a) => [a, Int32Array.from(lists[a])])), all: Object.fromEntries(range(q).map((a) => [a, Int32Array.from(all[a])])) }];
    })
  );
  /** The prime counts of the coprime classes modulo q up to X, their shares and the largest deviation from 1/φ(q). */
  function classesAt(q, X) {
    const C = CLASSES[q],
      counts = C.units.map((a) => upper(C.lists[a], X)),
      total = counts.reduce((s, c) => s + c, 0),
      phi = C.units.length,
      shares = counts.map((c) => (total ? { q: frac(BigInt(c), BigInt(total)), x: c / total } : num(ZERO))),
      dev = total ? Math.max(...shares.map((s) => abs(s.x - 1 / phi))) : 0,
      flat = counts.map((c) => c / (X / q));
    return { q, X, units: C.units, counts, total, phi, shares, dev, flat, level: num(frac(1n, BigInt(phi))) };
  }
  /** Parseval on ℤ/qℤ for the vector of prime counts by residue (primes dividing q included in their class). */
  function parsevalAt(q, X) {
    const f = range(q).map((a) => upper(CLASSES[q].all[a], X)),
      lhs = f.reduce((s, x) => s + x * x, 0);
    let rhs = 0;
    for (let k = 0; k < q; k++) {
      let re = 0,
        im = 0;
      for (let j = 0; j < q; j++) {
        re += f[j] * cs((-TAU * j * k) / q);
        im += f[j] * sn((-TAU * j * k) / q);
      }
      rhs += re * re + im * im;
    }
    return { f, lhs, rhs: rhs / q };
  }
  /** The logarithmic integral li(x) by Ramanujan's series. */
  function li(x) {
    const L0 = ln(x);
    let s = 0,
      term = 1;
    for (let k = 1; k < 200; k++) {
      term *= L0 / k;
      const t = term / k;
      s += t;
      if (t < 1e-17 * s) break;
    }
    return EULER_GAMMA + ln(L0) + s;
  }
  /** (π(x) − li(x)) / (√x ln x/(8π)): within ±1 for x ≥ 2657 by Schoenfeld's theorem under RH. */
  const schoenfeld = (x) => (piOf(x) - li(x)) / ((Math.sqrt(x) * ln(x)) / (8 * PI));

  /* ---------- the comparison of card 3: thirty points per ring and the number variance ---------- */
  const WIN = 30;
  const POISSON = (() => {
    let s = 20261124;
    const out = [];
    for (let i = 0; i < WIN; i++) {
      s = (Math.imul(s, 1103515245) + 12345) >>> 0;
      out.push(0.5 + (s / 4294967296) * WIN);
    }
    return out.sort((a, b) => a - b);
  })();
  const LATTICE = range(WIN).map((i) => i + 1);
  /** Raw ordinates of the first thirty zeros placed on the same window linearly in t. */
  const RAW = range(WIN).map((i) => UT[0] + ((GAMMA[i] - GAMMA[0]) * (UT[WIN - 1] - UT[0])) / (GAMMA[WIN - 1] - GAMMA[0]));
  /** The number variance of the hundred unfolded zeros in windows (x, x + L], x uniform over their span. */
  const VAR_L = range(24).map((i) => 0.25 * (i + 1));
  const VARIANCE = VAR_L.map((Lw) => {
    const lo = UT[0],
      hi = UT[KMAX - 1] - Lw,
      step = 0.005;
    let s = 0,
      n = 0,
      a = 0,
      b = 0;
    for (let x = lo; x <= hi; x += step) {
      while (a < KMAX && UT[a] <= x) a++;
      while (b < KMAX && UT[b] <= x + Lw) b++;
      s += (b - a - Lw) ** 2;
      n++;
    }
    return s / n;
  });
  /** The nodes and weights of 32-point Gauss–Legendre quadrature on [−1, 1], by Newton's method on P₃₂. */
  const GL32 = (() => {
    const n = 32,
      x = [],
      w = [];
    for (let i = 1; i <= n; i++) {
      let z = cs((PI * (i - 0.25)) / (n + 0.5)),
        dp = 1;
      for (let it = 0; it < 100; it++) {
        let p0 = 1,
          p1 = z;
        for (let k = 2; k <= n; k++) [p0, p1] = [p1, ((2 * k - 1) * z * p1 - (k - 1) * p0) / k];
        dp = (n * (z * p1 - p0)) / (z * z - 1);
        const dz = p1 / dp;
        z -= dz;
        if (abs(dz) < 1e-15) break;
      }
      x.push(z);
      w.push(2 / ((1 - z * z) * dp * dp));
    }
    return { x, w };
  })();
  /** The GUE number variance Σ²(L) = L − 2∫₀^L (L − r)(sin πr/πr)² dr, by 32-point Gauss–Legendre on panels of width at most 1. */
  const gueVar = (Lw) => {
    if (!(Lw > 0)) return 0;
    const m = Math.ceil(Lw),
      h = Lw / m;
    let s = 0;
    for (let j = 0; j < m; j++)
      for (let i = 0; i < 32; i++) {
        const r = h * (j + (1 + GL32.x[i]) / 2),
          pr = PI * r,
          sc = pr === 0 ? 1 : sn(pr) / pr;
        s += GL32.w[i] * (Lw - r) * sc * sc;
      }
    return Lw - h * s;
  };
  const latticeVar = (Lw) => {
    const f = Lw - Math.floor(Lw);
    return f * (1 - f);
  };
  const GAP14 = (UT[14] - UT[0]) / 14,
    GAP99 = (UT[KMAX - 1] - UT[0]) / (KMAX - 1);

  /* ---------- the state: one rail value per card ---------- */
  const SCENES = ['cavity', 'mertens', 'unfold', 'landau', 'modular'];
  const T0 = 10,
    TSPAN = 60;
  /** Each rail: its length, its speed (units per second), its step (keyboard and slider), and the grid it rests on. */
  const RAILS = {
    cavity: { max: TSPAN, rate: 6, step: 0.05, grid: 0 },
    mertens: { max: 1, rate: 0.4, step: 0.01, grid: 100 },
    unfold: { max: 1, rate: 0.4, step: 0.01, grid: 100 },
    landau: { max: KMAX, rate: 32, step: 1, grid: 1 },
    modular: { max: 5, rate: 1.2, step: 0.1, grid: 10 }
  };
  const STILL = { cavity: GAMMA[0] - T0, mertens: 1, unfold: 1, landau: KMAX, modular: 5 };
  const FRESH = { n: 1, dk: 0, gate: '2', mod: 5 };
  const state = { scene: 'cavity', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  /** The value of a rail, freed from the rounding of its own steps. */
  function settled(v, grid) {
    if (!grid) return v;
    const back = Math.round(v * grid);
    return abs(v * grid - back) < 1e-7 ? back / grid : v;
  }
  /** A fraction of the grid when the value lies on it. */
  const onGrid = (v, grid) => {
    const k = Math.round(v * grid);
    return abs(v * grid - k) < 1e-7 ? num(frac(BigInt(k), BigInt(grid))) : flo(v);
  };
  /** The zero nearest t on the rail of the cavity, when t sits on it. */
  const zeroAt = (t) => GAMMA.slice(0, NZ).findIndex((g) => abs(g - t) < 1e-9);

  function cavityAt(s) {
    const t = T0 + s.at.cavity,
      n = s.n,
      g = GAMMA[n - 1],
      delta = num(frac(BigInt(s.dk), 100n)),
      sigma = num(plus(HALF, delta.q)),
      dx = delta.x;
    const regs = PR12.map((p) => ({ p, up: p ** -(0.5 + dx), down: p ** -(0.5 - dx), ratio: s.dk ? flo(p ** (-2 * dx)) : num(ONE), hand: -t * ln(p) }));
    const drift = s.dk ? flo(-2 * dx * LNPRIM) : num(ZERO);
    const uIn = s.dk ? flo(cayleyAbs(0.5 + dx, g)) : num(ONE),
      uOut = s.dk ? flo(cayleyAbs(0.5 - dx, g)) : num(ONE);
    const h = 0.05,
      zl = hardyZ(g - h),
      zr = hardyZ(g + h);
    const at = zeroAt(t);
    return { t, onZero: at >= 0 ? at + 1 : 0, n, g, u: UT[n - 1], delta, sigma, regs, drift, uIn, uOut, zl, zr, flips: zl * zr < 0, zt: hardyZ(t), meanGap: TAU / ln(g / TAU) };
  }
  function mertensAt(s) {
    const b = settled(s.at.mertens, RAILS.mertens.grid);
    return { beta: onGrid(b, 100), b, slope: SLOPE, table: MERTENS, rot: ROTOR_M };
  }
  function unfoldAt(s) {
    const b = settled(s.at.unfold, RAILS.unfold.grid);
    return { beta: onGrid(b, 100), b, n: s.n, u: UT[s.n - 1], g: GAMMA[s.n - 1], gap14: GAP14, gap99: GAP99 };
  }
  function landauAtState(s) {
    const K = Math.max(1, Math.round(s.at.landau)),
      g = GATE[s.gate],
      value = landauK(g, K),
      target = targetOf(g);
    return { K, gate: g, value, target, diff: value - target.x, turns: (GAMMA[K - 1] * g.lq) / TAU, weyl: weylGap(g, K), bars: GATES.map((x) => ({ id: x.id, value: landauK(x, K), target: targetOf(x) })) };
  }
  function modularAt(s) {
    const r = settled(s.at.modular, RAILS.modular.grid),
      e = 1 + r,
      X = Math.floor(10 ** e + 1e-9);
    return { r, e, X, exactX: Number.isInteger(r), ...classesAt(s.mod, X), parseval: parsevalAt(s.mod, X) };
  }
  function compute(s) {
    return { cavity: cavityAt(s), mertens: mertensAt(s), unfold: unfoldAt(s), landau: landauAtState(s), modular: modularAt(s) };
  }
  const calc = () => compute(state);

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  const YAW = -0.5;
  const PITCH = { cavity: 0.4, mertens: 0.3, unfold: 0.62, landau: 0.52, modular: 0.36 };
  const camOf = (scene, view) => [YAW, view === 'level' ? 0.1 : view === 'above' ? 1.1 : PITCH[scene], 1];
  const PRESETS = {
    'prime-zero-dark-state-cavity': { scene: 'cavity', play: true, still: STILL.cavity },
    'mertens-entropy-and-s3-haar-primes': { scene: 'mertens', play: true, still: STILL.mertens },
    'unfolded-zero-turns-and-gue-fluid': { scene: 'unfold', play: true, still: STILL.unfold },
    'landau-fujii-fractran-gate-probe': { scene: 'landau', play: true, still: STILL.landau },
    'modular-totient-and-duality-ledger': { scene: 'modular', play: true, still: STILL.modular }
  };
  const DEFAULT = 'prime-zero-dark-state-cavity';

  /* ---------- the stage: world-fixed geometry ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const cam0 = camOf('cavity', 'panorama');
  const opts = { canvas: $('cv'), yaw: cam0[0], pitch: cam0[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(cam0[0], cam0[1]);
  /** The front of the default view (horizontal) and its right. */
  const FH = [-sn(YAW), -cs(YAW), 0],
    RH = [cs(YAW), -sn(YAW), 0],
    AZF = Math.atan2(FH[1], FH[0]);
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  const LIFT = 1.012;
  const polar = (r, a, z = 0) => [r * cs(a), r * sn(a), z];
  /* the cavity: the meridian of the critical line, AZM to the left of the front; v = 0 at t = 10, v = 1 at t = 70 */
  const AZM = AZF - 0.5;
  const onBall = (v, daz = 0, r = LIFT) => {
    const th = PI * (0.06 + 0.88 * v);
    return [r * sn(th) * cs(AZM + daz), r * sn(th) * sn(AZM + daz), -r * cs(th)];
  };
  const U_LO = turnU(T0),
    U_HI = turnU(T0 + TSPAN);
  const vOf = (t, lens) => (lens ? (t - T0) / TSPAN : (turnU(t) - U_LO) / (U_HI - U_LO));
  /** The split of a counterfactual zero: radians of azimuth per unit of δ. */
  const SPLIT = 1.4;
  const RR = 1.5,
    STEM = 0.75,
    MIRROR = 1.8;
  const regAz = (k) => AZF + PI / 12 + (k * PI) / 6;
  const regBase = (k) => polar(RR, regAz(k));
  /* the Mertens helix and the flat x axis */
  const LN2 = ln(2),
    HR = 1.34,
    HTURN = 2.2,
    HZ0 = -0.98,
    HZK = 0.335;
  const helixPoint = (ell, m) => polar(HR, AZF - 0.9 + (TAU * (ell - LN2)) / HTURN, HZ0 + HZK * m);
  const flatPoint = (x, count) => add(add(scale(FH, 1.45), scale(RH, -1.75 + (3.5 * x) / 1000)), [0, 0, -1.12 + (1.7 * count) / HELIX_N]);
  const primePoint = (k, b) => mix(flatPoint(HELIX_P[k], k + 1), helixPoint(ln(HELIX_P[k]), MCUM[k]), b);
  const BEADS = upper(Int32Array.from(HELIX_P), 200);
  /** The staircase on the curve parameter ℓ: [ℓ, count] samples, flat at height π along x = e^ℓ, on the helix at height
      Σ ln p/p; a riser at every prime, a tread (sampled every 1/20 of ℓ) between two primes. */
  const STAIR = (() => {
    const out = [];
    for (let k = 0; k < HELIX_N; k++) {
      const a = ln(HELIX_P[k]),
        b = k + 1 < HELIX_N ? ln(HELIX_P[k + 1]) : a,
        n = Math.max(1, Math.ceil((b - a) / 0.05));
      out.push([a, k]);
      for (let i = 0; i <= n; i++) out.push([lerp(a, b, i / n), k + 1]);
    }
    return out;
  })();
  const stairPoint = ([ell, k], b) => mix(flatPoint(Math.exp(ell), k), helixPoint(ell, k ? MCUM[k - 1] : 0), b);
  /* the three rings of card 3, seam at the back */
  const RLAT = 1.28,
    RZER = 1.56,
    RPOI = 1.84;
  const ringPoint = (r, u) => polar(r, AZF + PI + (TAU * u) / (WIN + 1));
  const zeroU = (i, b) => lerp(RAW[i], UT[i], b);
  /* the Landau wheel and the gate bars */
  const RW = 1.98,
    RG = 1.42,
    HB = 1.0,
    /** The central probe: a plate above the north pole and a spike of height HS · Λ_K(q) for the chosen gate. */
    ZP = 1.24,
    HS = 0.85;
  const wheelPoint = (f) => polar(RW, AZF + TAU * f);
  const gateAz = (j) => AZF + PI / 2 + (TAU * j) / GATES.length;
  /* the towers of the classes and the mast of X */
  const RT = 1.36,
    ZB = -0.98,
    HM = 1.55,
    AZX = AZF + 1.25,
    RX = 1.88,
    MAST = 2.0;
  const towerAz = (j, phi) => AZF - 0.4 + (TAU * j) / phi;
  /** The six rows of the duality ledger, drawn as six short meridians on the cap of the ball. */
  const LEDGER = [
    ['角色', 'role'],
    ['个性', 'individuality'],
    ['平直假象', 'flat artefact'],
    ['内禀标尺', 'intrinsic ruler'],
    ['刚性', 'rigidity'],
    ['互锁', 'interlock']
  ];
  const CAP_P = 0.46,
    CAP_Z = 1.0;
  const ledgerAz = (j) => AZF - 1.25 + 0.5 * j;
  const capPoint = (az, lat) => [LIFT * cs(lat) * cs(az), LIFT * cs(lat) * sn(az), LIFT * sn(lat)];
  const mastPoint = (r) => polar(RX, AZX, ZB + (MAST * r) / 5);

  /** The world point of the amber mark for a rail value v of the present scene. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'mertens':
        return primePoint(BEADS - 1, v);
      case 'unfold':
        return ringPoint(RZER, zeroU(state.n - 1, v));
      case 'landau': {
        const K = Math.max(1, Math.round(v));
        return add(wheelPoint(phaseOf(GATE[state.gate], K - 1)), [0, 0, 0.004]);
      }
      case 'modular':
        return mastPoint(v);
      default:
        return onBall(vOf(T0 + v, state.lens), 0, LIFT + 0.01);
    }
  }
  /** Fit what the cards draw, between the title and the legend: world points the picture must hold, per scene. */
  const hoopPts = (r, zs) => zs.flatMap((z) => range(24).map((i) => polar(r, (TAU * i) / 24, z)));
  const BALL = [-1.03, 1.03, -1.03, 1.03];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const SIDE = {
    cavity: () => around([...hoopPts(MIRROR, [0]), ...hoopPts(RR + 0.12, [-0.7, 0.7])]),
    mertens: () => around([...hoopPts(HR + 0.04, [HZ0 - 0.05, HZ0 + HZK * 5.8]), flatPoint(0, 0), flatPoint(1000, HELIX_N), add(flatPoint(0, 0), [0, 0, -0.06]), add(flatPoint(1000, 0), [0, 0, -0.06])]),
    unfold: () => around(hoopPts(RPOI + 0.06, [0])),
    landau: () => around([...hoopPts(RW + 0.06, [0]), ...hoopPts(RG + 0.04, [-0.1, HB * 0.78]), [0, 0, ZP + HS * 0.78], [0, 0, ZP - 0.1]]),
    modular: () => around([...hoopPts(RT + 0.06, [ZB, ZB + HM * 1.2]), mastPoint(0), mastPoint(5), add(mastPoint(5), [0, 0, 0.1])])
  };
  /* the room of the title: while a card, a lens and a size last, a line that gets shorter gives none of it back, so that
     the picture keeps its place under a drag */
  const title = { key: '', top: 0 },
    held = { W: 0, H: 0 };
  /** The pointer that drags the amber handle, or null. */
  let dragging = null;
  function fit(w) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H || (dragging != null && W === held.W && H === held.H)) return;
    Object.assign(held, { W, H });
    const box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const key = [state.scene, state.lens, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k]()]),
      [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }
  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  const circle = (r, z, s) => sc.circle([0, 0, z], [0, 0, 1], r, { fade: false, n: 120, ...s });
  function drawBall() {
    // brighter towards the top, darker below; no axis is drawn on it
    const at = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface('ball', at, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.55, 2.4], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.22 } });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03, rim: 0.4 });
  }

  /* ---------- card 1: the dual cavity ---------- */
  function drawCavity(m, a) {
    if (a < 0.01) return;
    const c = m.cavity,
      lens = state.lens;
    // the mirror σ = 1/2
    sc.fan(sample(72, (s) => polar(MIRROR, TAU * s)).slice(0, 72), { fill: P.cyan, alpha: 0.07 * a });
    circle(MIRROR, 0, { color: P.cyan, width: 1.3, alpha: 0.75 * a });
    // the critical line: a cyan meridian, and the fifteen zeros on it
    tube('line', sample(64, (s) => onBall(s)), P.cyan, 0.016, 0.95 * a, 0.45);
    for (let i = 0; i < NZ; i++) {
      const p = onBall(vOf(GAMMA[i], lens), 0, LIFT + 0.02),
        chosen = i === c.n - 1;
      if (chosen && c.delta.x > 0) {
        // the counterfactual: the zero and its mirror partner apart on the latitude, 1/2 + δ and 1/2 − δ
        const v = vOf(GAMMA[i], lens),
          d = SPLIT * c.delta.x;
        sc.line(sample(24, (s) => onBall(v, lerp(-d, d, s), LIFT + 0.006)), { color: P.magenta, width: 1.6, dash: [4, 3], alpha: a });
        sc.bead(onBall(v, d, LIFT + 0.006), { color: P.magenta, r: 4.6, alpha: a, key: 'shellIn' });
        sc.bead(onBall(v, -d, LIFT + 0.006), { color: P.magenta, r: 4.6, alpha: a, key: 'shellOut' });
        sc.ring(p, { color: P.cyan, r: 6, normal: unitOf(p), key: 'mirrorSpot' });
      } else sc.bead(p, { color: P.ink, r: chosen ? 4.6 : 3.8, alpha: a, key: 'zero' + (i + 1) });
      if (chosen) sc.ring(add(p, scale(unitOf(p), 0.01)), { color: P.amber, r: 9, normal: unitOf(p), key: 'chosen' });
    }
    // the registers: base, dial, hand and the two stems
    PR12.forEach((p, k) => {
      const r = c.regs[k],
        base = regBase(k),
        az = regAz(k),
        er = [cs(az), sn(az), 0],
        et = [-sn(az), cs(az), 0],
        hand = add(base, add(scale(er, 0.16 * cs(r.hand)), scale(et, 0.16 * sn(r.hand))));
      sc.circle(base, [0, 0, 1], 0.16, { fade: false, n: 40, color: P.cyan, width: 1.2, alpha: 0.7 * a });
      sc.arrow(base, hand, { color: P.violet, width: 2, headSize: 7, alpha: a });
      tube('up' + p, [base, add(base, [0, 0, STEM * r.up])], P.cyan, 0.014, a, 0.4);
      tube('down' + p, [base, add(base, [0, 0, -STEM * r.down])], P.magenta, 0.014, a, 0.4);
      sc.bead(add(base, [0, 0, STEM * r.up]), { color: P.cyan, r: 2.6, alpha: a, key: 'upTip' + p });
      sc.bead(add(base, [0, 0, -STEM * r.down]), { color: P.magenta, r: 2.6, alpha: a, key: 'downTip' + p });
      sc.bead(base, { color: P.violet, r: 3.2, alpha: a, key: 'reg' + p });
    });
  }
  const unitOf = (p) => scale(p, 1 / Math.sqrt(dot(p, p)));

  /* ---------- card 2: the Mertens helix and the rotors ---------- */
  function drawMertens(m, a) {
    if (a < 0.01) return;
    const b = m.mertens.b,
      lens = state.lens;
    // the reference helix of slope 1, Σ ln p/p ≈ ln p + E(10⁶), and the staircase through all primes up to 1000
    const E6 = MERTENS[5].gap,
      lo = Math.max(LN2, 0.15 - E6);
    if (b > 0.02) sc.line(sample(90, (s) => { const ell = lerp(lo, ln(1000), s); return helixPoint(ell, ell + E6); }), { color: P.violet, width: 1.2, alpha: 0.7 * a * b });
    sc.line(STAIR.map((q) => stairPoint(q, b)), { color: P.cyan, width: 1.6, alpha: 0.9 * a });
    // the flat reading as a ghost in the flat lens
    if (lens && b > 0.02) sc.line(STAIR.map((q) => stairPoint(q, 0)), { color: P.magenta, width: 1.2, dash: [5, 4], alpha: 0.7 * a });
    if (b < 0.98) sc.line([flatPoint(0, 0), flatPoint(1000, 0)], { color: P.magenta, width: 1.4, alpha: (1 - b) * a });
    for (let k = 0; k < BEADS; k++) {
      const p = HELIX_P[k],
        r = lerp(3, 2 + 9 * Math.sqrt(ln(p) / p), b);
      sc.bead(primePoint(k, b), { color: b > 0.5 ? P.cyan : P.magenta, r, alpha: a, key: 'prime' + p });
    }
    // the rotors of norm 13 on the ball, along their axes: cyan κ > 1/2, magenta κ < 1/2, violet κ = 1/2
    for (const [i, q] of ROTORS.entries()) {
      const v = [q[1], q[2], q[3]],
        n = unitOf(v);
      sc.bead(scale(n, LIFT), { color: q[0] > 0 ? P.cyan : q[0] < 0 ? P.magenta : P.violet, r: 2.3, alpha: a, key: 'rotor' + i });
    }
  }

  /* ---------- card 3: three rings ---------- */
  function drawUnfold(m, a) {
    if (a < 0.01) return;
    const b = m.unfold.b,
      lens = state.lens;
    // three violet phase rings: the rigid lattice inside, the zeros in the middle, the Poisson points outside
    for (const r of [RLAT, RZER, RPOI]) circle(r, 0, { color: P.violet, width: 1.1, alpha: 0.6 * a });
    LATTICE.forEach((u, i) => sc.bead(ringPoint(RLAT, u), { color: P.magenta, r: 2.6, alpha: 0.85 * a, key: 'lat' + i }));
    POISSON.forEach((u, i) => sc.bead(ringPoint(RPOI, u), { color: P.magenta, r: 3, alpha: a, key: 'poi' + i }));
    for (let i = 0; i < WIN; i++) {
      if (i === state.n - 1) continue;
      sc.bead(ringPoint(RZER, zeroU(i, b)), { color: P.cyan, r: 3.4, alpha: a, key: 'zer' + i });
      if (lens) sc.bead(add(ringPoint(RZER + 0.13, RAW[i]), [0, 0, 0.002]), { color: P.magenta, r: 2, alpha: 0.75 * a, key: 'raw' + i });
    }
    if (lens) sc.bead(ringPoint(RZER + 0.13, RAW[state.n - 1]), { color: P.magenta, r: 2, alpha: 0.75 * a, key: 'rawChosen' });
  }

  /* ---------- card 4: the wheel and the gate bars ---------- */
  function drawLandau(m, a) {
    if (a < 0.01) return;
    const l = m.landau,
      g = l.gate,
      lens = state.lens;
    circle(RW, 0, { color: P.violet, width: 1.4, alpha: 0.8 * a });
    for (let n = 0; n < l.K - 1; n++) sc.bead(wheelPoint(phaseOf(g, n)), { color: P.violet, r: 2.6, alpha: a, key: 'ph' + n });
    if (lens) {
      // the flat linearization ln q ≈ q − 1 (MODEL): where the phases would sit
      const lin = g.q - 1;
      for (let n = 0; n < l.K; n++) {
        const f = (GAMMA[n] * lin) / TAU;
        sc.bead(add(polar(RW + 0.12, AZF + TAU * (f - Math.floor(f))), [0, 0, 0.002]), { color: P.magenta, r: 1.8, alpha: 0.7 * a, key: 'lin' + n });
      }
    }
    circle(RG, 0, { color: P.ink, width: 1, alpha: 0.35 * a });
    // the central probe of the chosen gate: a plate above the pole, the spike Λ_K(q) and the ring of its target
    sc.circle([0, 0, ZP], [0, 0, 1], 0.14, { fade: false, n: 48, color: P.ink, width: 1.2, alpha: 0.8 * a });
    tube('spine', [[0, 0, LIFT], [0, 0, ZP]], P.violet, 0.008, 0.8 * a, 0.3);
    if (abs(l.value) > 1e-4) tube('spike', [[0, 0, ZP], [0, 0, ZP + HS * l.value]], l.value >= 0 ? P.cyan : P.magenta, 0.045, a, 0.45);
    sc.ring([0, 0, ZP + HS * l.target.x], { color: P.ink, r: 8, normal: [0, 0, 1], alpha: 0.9 * a, key: 'probeTarget' });
    GATES.forEach((x, j) => {
      const base = polar(RG, gateAz(j)),
        v = l.bars[j].value,
        tgt = l.bars[j].target.x;
      if (abs(v) > 1e-4) tube('bar' + j, [base, add(base, [0, 0, HB * v])], v >= 0 ? P.cyan : P.magenta, 0.03, a, 0.35);
      sc.ring(add(base, [0, 0, HB * tgt]), { color: P.ink, r: 6, normal: [0, 0, 1], alpha: 0.85 * a, key: 'tgt' + j });
      if (x.id === g.id) sc.ring(add(base, [0, 0, 0.004]), { color: P.amber, r: 9, normal: [0, 0, 1], key: 'gateNow' });
    });
  }

  /* ---------- card 5: the towers of the classes ---------- */
  function drawModular(m, a) {
    if (a < 0.01) return;
    const c = m.modular,
      lens = state.lens;
    circle(RT, ZB, { color: P.ink, width: 1, alpha: 0.4 * a });
    circle(RT, ZB + HM, { color: P.violet, width: 1.4, dash: [6, 4], alpha: 0.9 * a });
    c.units.forEach((u, j) => {
      const base = polar(RT, towerAz(j, c.phi), ZB),
        h = HM * c.phi * c.shares[j].x;
      if (h > 1e-4) tube('tower' + j + '_' + c.q, [base, add(base, [0, 0, h])], P.cyan, 0.05, a, 0.35);
      sc.bead(base, { color: P.cyan, r: 3, alpha: a, key: 'cls' + j });
      if (lens) {
        const gb = polar(RT, towerAz(j, c.phi) + 0.16, ZB);
        if (c.flat[j] > 1e-4) tube('ghost' + j + '_' + c.q, [gb, add(gb, [0, 0, HM * c.flat[j]])], P.magenta, 0.022, 0.75 * a, 0.3);
      }
    });
    // the six-row duality ledger on the cap (MODEL): a cyan prime side and a violet zero side per row
    LEDGER.forEach((_, j) => {
      const az = ledgerAz(j);
      sc.line(sample(16, (s2) => capPoint(az, lerp(CAP_P, CAP_Z, s2))), { color: P.ink, width: 1.1, dash: [3, 3], alpha: 0.75 * a });
      sc.bead(capPoint(az, CAP_P), { color: P.cyan, r: 3.6, alpha: a, key: 'ledP' + j });
      sc.bead(capPoint(az, CAP_Z), { color: P.violet, r: 3.6, alpha: a, key: 'ledZ' + j });
    });
    sc.line([mastPoint(0), mastPoint(5)], { color: P.ink, width: 1.4, alpha: 0.7 * a });
    for (let k = 0; k <= 5; k++) sc.line([add(mastPoint(k), scale(RH, -0.05)), add(mastPoint(k), scale(RH, 0.05))], { color: P.ink, width: 1.2, alpha: 0.7 * a });
  }

  /* ---------- words ---------- */
  const SCENE_NAME = {
    cavity: [['对偶暗态腔', 'DUAL DARK-STATE CAVITY'], ['线性 t 轴（MODEL）', 'LINEAR t AXIS (MODEL)']],
    mertens: [['梅滕斯熵标尺', 'MERTENS ENTROPY RULER'], ['平直 x 轴（MODEL）', 'FLAT x AXIS (MODEL)']],
    unfold: [['去 π 绕相', 'π-FREE TURNS'], ['线性 t 拥挤（MODEL）', 'LINEAR-t CROWDING (MODEL)']],
    landau: [['朗道探针', 'LANDAU PROBE'], ['线性化指令（MODEL）', 'LINEARIZED GATE (MODEL)']],
    modular: [['模 q 均分', 'EQUIPARTITION MOD q'], ['平直密度（MODEL）', 'FLAT DENSITY (MODEL)']]
  };
  const LENS_NAME = [
    ['对偶读法', 'DUALITY'],
    ['平直读法 (MODEL)', 'FLAT (MODEL)']
  ];
  const sb = (x) => `<sub>${x}</sub>`;
  const gname = (n) => `γ${sb(n)}`;
  const uname = (n) => `ũ${sb(n)}`;
  /** X as a power of ten when it is one, else its integer. */
  const xText = (c) => (c.exactX ? `=${NB}10${superscript(Math.round(c.e))}` : `≈${NB}${c.X}`);
  const tText = (c) => (c.onZero ? `=${NB}${gname(c.onZero)}` : `${rel(null, c.t, 2)}`);
  function subline(m) {
    const s = state.scene,
      lens = state.lens,
      narrow = compact();
    if (s === 'cavity') {
      const c = m.cavity,
        zs = c.flips ? L('Z 在两侧变号', 'Z changes sign across it') : L('Z 两侧同号', 'Z keeps its sign');
      if (lens)
        return narrow
          ? L(`线性 t：${gname(c.n)} 附近平均间隔 ${rel(null, c.meanGap, 2)}（MODEL）。`, `Linear t: mean spacing ${rel(null, c.meanGap, 2)} near ${gname(c.n)} (MODEL).`)
          : L(`平直读法（MODEL）：零点按线性 t 排在经线上，越往上越挤；${gname(c.n)} 附近平均间隔 2π/ln(t/2π) ${rel(null, c.meanGap, 2)}。`, `Flat reading (MODEL): the zeros sit on the meridian linearly in t and crowd upwards; near ${gname(c.n)} the mean spacing 2π/ln(t/2π) is ${rel(null, c.meanGap, 2)}.`);
      if (!c.delta.x)
        return narrow
          ? L(`${gname(c.n)} ${rel(null, c.g)}：${zs}；净漂移 = 0，|u| = 1。`, `${gname(c.n)} ${rel(null, c.g)}: ${zs}; net drift = 0, |u| = 1.`)
          : L(`${gname(c.n)} ${rel(null, c.g)}，${zs}。σ = 1/2：十二个寄存器上下两杆等长，净漂移 = 0，凯莱像 |u| = 1。`, `${gname(c.n)} ${rel(null, c.g)}, ${zs}. At σ = 1/2 the twelve registers have equal stems above and below, net drift = 0, Cayley image |u| = 1.`);
      return narrow
        ? L(`反事实 δ ${is(c.delta)}：净漂移 ${is(c.drift)}，|u| ${is(c.uIn)}。`, `Counterfactual δ ${is(c.delta)}: net drift ${is(c.drift)}, |u| ${is(c.uIn)}.`)
        : L(`反事实 δ ${is(c.delta)}：上杆 p<sup>−σ</sup> 变短、下杆 p<sup>−(1−σ)</sup> 变长，净漂移 ${is(c.drift)}；假想零点与镜像分在 1/2 ± δ，|u| ${is(c.uIn)} 与 ${is(c.uOut)}。`, `Counterfactual δ ${is(c.delta)}: the stems p<sup>−σ</sup> above shorten and p<sup>−(1−σ)</sup> below lengthen, net drift ${is(c.drift)}; a supposed zero and its mirror sit at 1/2 ± δ, |u| ${is(c.uIn)} and ${is(c.uOut)}.`);
    }
    if (s === 'mertens') {
      const mm = m.mertens;
      if (lens)
        return narrow
          ? L(`平直 x 轴（MODEL）：素数越往右越稀，密度 1/ln x。`, `Flat x axis (MODEL): primes thin out to the right, density 1/ln x.`)
          : L(`平直读法（MODEL）：品红虚线是同一批素数在 x 轴上的位置与计数 π(x)，越往右越稀；β ${is(mm.beta)} 时它们在青色阶梯上。`, `Flat reading (MODEL): the dashed magenta line is the same primes on the x axis with the count π(x), thinning to the right; at β ${is(mm.beta)} they sit on the cyan staircase.`);
      return narrow
        ? L(`β ${is(mm.beta)}：阶梯高 Σ ln p/p，割线斜率 ${rel(null, mm.slope)}。`, `β ${is(mm.beta)}: staircase height Σ ln p/p, secant slope ${rel(null, mm.slope)}.`)
        : L(`β ${is(mm.beta)}：前 ${HELIX_N} 个素数从 x 轴爬上螺旋，绕圈是 ln p，高度是 Σ ln p/p，每绕一圈升高的一样多（10⁵ 到 10⁶ 的割线斜率 ${rel(null, mm.slope)}）。球面上是 p = 13 的 ${mm.rot.count} 个整数旋子，κ 均值 ${is(mm.rot.meanK)}、方差 ${is(mm.rot.varK)}。`, `β ${is(mm.beta)}: the first ${HELIX_N} primes climb from the x axis onto the helix, turning by ln p and rising by Σ ln p/p, the same amount per turn (secant slope ${rel(null, mm.slope)} from 10⁵ to 10⁶). On the ball the ${mm.rot.count} integer rotors of p = 13, κ with mean ${is(mm.rot.meanK)} and variance ${is(mm.rot.varK)}.`);
    }
    if (s === 'unfold') {
      const u = m.unfold;
      if (lens)
        return narrow
          ? L(`线性 t（MODEL）：间隔从 ${rel(null, GAMMA[1] - GAMMA[0], 2)} 缩到 ${rel(null, GAMMA[WIN - 1] - GAMMA[WIN - 2], 2)}。`, `Linear t (MODEL): spacings shrink from ${rel(null, GAMMA[1] - GAMMA[0], 2)} to ${rel(null, GAMMA[WIN - 1] - GAMMA[WIN - 2], 2)}.`)
          : L(`线性 t（MODEL）：品红小点按 γ 等比例排开，间隔从 ${rel(null, GAMMA[1] - GAMMA[0], 2)} 缩到 ${rel(null, GAMMA[WIN - 1] - GAMMA[WIN - 2], 2)}；β ${is(u.beta)} 时青色的零点按 ũ 排列。`, `Linear t (MODEL): the small magenta dots follow γ to scale, spacings shrinking from ${rel(null, GAMMA[1] - GAMMA[0], 2)} to ${rel(null, GAMMA[WIN - 1] - GAMMA[WIN - 2], 2)}; at β ${is(u.beta)} the cyan zeros follow ũ.`);
      return narrow
        ? L(`β ${is(u.beta)}：${uname(u.n)} ${rel(null, u.u)}，平均间隔 ${rel(null, u.gap99)}。`, `β ${is(u.beta)}: ${uname(u.n)} ${rel(null, u.u)}, mean spacing ${rel(null, u.gap99)}.`)
        : L(`β ${is(u.beta)}：前 ${WIN} 个零点在青色环上按 ũ = θ(γ)/π + 3/2 排开，${uname(u.n)} ${rel(null, u.u)}；内环是等距晶格 uₙ = n，外环是泊松点。前 100 个的平均间隔 ${rel(null, u.gap99)}。`, `β ${is(u.beta)}: the first ${WIN} zeros spread on the cyan ring by ũ = θ(γ)/π + 3/2, ${uname(u.n)} ${rel(null, u.u)}; the inner ring is the rigid lattice uₙ = n, the outer one Poisson points. Mean spacing of the first 100: ${rel(null, u.gap99)}.`);
    }
    if (s === 'landau') {
      const l = m.landau,
        tg = l.target.q ? L('目标 0', 'target 0') : L(`目标 ${rel(null, l.target.x)}`, `target ${rel(null, l.target.x)}`);
      if (lens)
        return narrow
          ? L(`线性化（MODEL）：ln q 换成 q − 1，品红相位偏开。`, `Linearized (MODEL): ln q replaced by q − 1, magenta phases drift.`)
          : L(`平直读法（MODEL）：把 ln q 换成切线 q − 1，品红的相位点偏开；柱高仍按真正的 ln q 计算，q = ${l.gate.id}，Λ${sb('K')} ${rel(null, l.value)}。`, `Flat reading (MODEL): ln q replaced by its tangent q − 1 moves the magenta phase dots; the bars still use the true ln q, q = ${l.gate.id}, Λ${sb('K')} ${rel(null, l.value)}.`);
      return narrow
        ? L(`q = ${l.gate.id}，K = ${l.K}：Λ${sb('K')} ${rel(null, l.value)}，${tg}。`, `q = ${l.gate.id}, K = ${l.K}: Λ${sb('K')} ${rel(null, l.value)}, ${tg}.`)
        : L(`q = ${l.gate.id}，K = ${l.K}：相位 {γₙ ln q/2π} 绕了 ${rel(null, l.turns, 2)} 圈，铺在紫色轮上；Λ${sb('K')}(q) ${rel(null, l.value)}，${tg}。素数幂的柱子立起来，其余的贴近 0。`, `q = ${l.gate.id}, K = ${l.K}: the phases {γₙ ln q/2π} wind ${rel(null, l.turns, 2)} turns round the violet wheel; Λ${sb('K')}(q) ${rel(null, l.value)}, ${tg}. The bars of prime powers stand up, the others stay near 0.`);
    }
    const c = m.modular;
    if (lens)
      return narrow
        ? L(`平直密度（MODEL）：每类整数里素数的比例变稀。`, `Flat density (MODEL): the share of primes among the integers of a class thins out.`)
        : L(`平直读法（MODEL）：品红细柱是每类整数里素数所占的比例，X ${xText(c)} 时最高 ${rel(null, Math.max(...c.flat))}，随 X 变稀；青色份额不变稀。`, `Flat reading (MODEL): the thin magenta bars are the share of primes among the integers of each class, at most ${rel(null, Math.max(...c.flat))} at X ${xText(c)}, thinning as X grows; the cyan shares do not.`);
    return narrow
      ? L(`q = ${c.q}，X ${xText(c)}：最大偏差 ${rel(null, c.dev)}。`, `q = ${c.q}, X ${xText(c)}: largest deviation ${rel(null, c.dev)}.`)
      : L(`q = ${c.q}，X ${xText(c)}：${c.total} 个素数分进 φ(${c.q}) = ${c.phi} 个互素剩余类，每类份额贴着紫色虚线 1/φ(q) = ${fstr(c.level.q)}，最大偏差 ${rel(null, c.dev)}。`, `q = ${c.q}, X ${xText(c)}: ${c.total} primes fill φ(${c.q}) = ${c.phi} coprime classes, each share close to the dashed violet level 1/φ(q) = ${fstr(c.level.q)}, largest deviation ${rel(null, c.dev)}.`);
  }
  function bigline(m) {
    const s = state.scene,
      lens = state.lens;
    const key = {
      cavity: () => {
        const c = m.cavity;
        return lens ? `t ${tText(c)}` : `|u| ${is(c.uIn)}`;
      },
      mertens: () => `β ${is(m.mertens.beta)}`,
      unfold: () => `β ${is(m.unfold.beta)}`,
      landau: () => `Λ${sb('K')}(${m.landau.gate.id}) ${rel(null, m.landau.value)}`,
      modular: () => `X ${xText(m.modular)}`
    };
    return `${L(...SCENE_NAME[s][lens])} · <span class="nb">${key[s]()}</span>`;
  }
  function legendItems() {
    const lens = state.lens;
    switch (state.scene) {
      case 'mertens':
        return [['vi', L('𝕋₃ · 旋子 κ = 1/2', '𝕋₃ · rotors κ = 1/2')], ['cy', L('梅滕斯阶梯 · κ > 1/2', 'Mertens staircase · κ > 1/2')], ['mg', lens ? L('平直 x 轴 · κ < 1/2', 'flat x axis · κ < 1/2') : L('x 轴 · κ < 1/2', 'x axis · κ < 1/2')], ['am', 'β']];
      case 'unfold':
        return [['vi', L('三道相环', 'three phase rings')], ['cy', L('零点 ũ', 'zeros ũ')], ['mg', lens ? L('晶格 · 泊松 · 线性 t', 'lattice · Poisson · linear t') : L('等距晶格 · 泊松', 'lattice · Poisson')], ['am', L('选中的零点', 'chosen zero')]];
      case 'landau':
        return [['vi', L('外环相位轮', 'outer phase wheel')], ['cy', 'Λ > 0'], ['mg', lens ? L('Λ < 0 · 线性化', 'Λ < 0 · linearized') : 'Λ < 0'], ['am', L('第 K 个零点 · 指令', 'zero K · gate')]];
      case 'modular':
        return [['vi', L('均分线 · 零点一侧', 'level · zero side')], ['cy', L('份额 · 素数一侧', 'shares · prime side')], ...(lens ? [['mg', L('平直密度', 'flat density')]] : []), ['am', 'X']];
      default:
        return [['vi', L('𝕋₃ · 指针', '𝕋₃ · hands')], ['cy', L('临界线 · 寄存器环 · p<sup>−σ</sup>', 'critical line · registers · p<sup>−σ</sup>')], ['mg', L('p<sup>−(1−σ)</sup> · 离线两壳', 'p<sup>−(1−σ)</sup> · off-line shells')], ['am', L('t · 选中的零点', 't · chosen zero')]];
    }
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const s = state.scene,
      lens = state.lens;
    if (s === 'cavity') {
      const c = m.cavity;
      return {
        long: lens
          ? [`同一组状态的平直读法（MODEL）：经线上的零点按线性的 t 排开，越往北越挤。十二个寄存器与它们的两杆不变。`, `The flat reading of the same state (MODEL): the zeros on the meridian follow the linear t and crowd towards the north. The twelve registers and their stems stay as they are.`]
          : c.delta.x
            ? [`品红是反事实：选中的零点离开青色经线，与它的镜像分在 1/2 ± δ 两边；每个寄存器上方的青杆变短、下方的品红杆变长，两壳不再相等。拖滑块回到 δ = 0，或按“回到镜面”。`, `Magenta is counterfactual: the chosen zero leaves the cyan meridian, and it and its mirror sit at 1/2 ± δ; above every register the cyan stem shortens, below it the magenta stem lengthens, and the two shells part. Slide back to δ = 0 or press “Back to the mirror”.`]
            : [`紫色的球是对偶腔，青色圆盘是镜面 σ = 1/2。琥珀点沿青色经线（临界线）向上走，十二个青色寄存器环里的紫色指针按 −t ln p 各转各的；到达琥珀圈里的零点时，每个寄存器上下两杆仍然等长。`, `The violet ball is the dual cavity and the cyan disc the mirror σ = 1/2. The amber point climbs the cyan meridian (the critical line) while the violet hands in the twelve cyan register rings turn by −t ln p, each at its own speed; at the zero in the amber circle every register still has equal stems above and below.`],
        fig: lens
          ? [`平直读法（MODEL）：零点按线性 t 排开，越往上越挤。`, `Flat reading (MODEL): zeros by linear t, crowding upwards.`]
          : c.delta.x
            ? [`反事实 δ > 0：零点分成两壳，青杆变短、品红杆变长。`, `Counterfactual δ > 0: two shells, cyan stems short, magenta long.`]
            : [`σ = 1/2：琥珀点停在零点上，每个寄存器上下两杆等长。`, `σ = 1/2: amber rests on the zero, every register balanced.`]
      };
    }
    if (s === 'mertens')
      return {
        long: lens
          ? [`品红虚线是平直读法（MODEL）：同一批素数排在 x 轴上，计数阶梯越来越平。青色阶梯与球面上的旋子不变。`, `The dashed magenta line is the flat reading (MODEL): the same primes on the x axis, their counting staircase flattening. The cyan staircase and the rotors on the ball stay as they are.`]
          : [`β 从 0 到 1：素数珠从下方的品红 x 轴爬上绕球的青色螺旋，珠子大小是权重 ln p/p；青色阶梯贴着紫色的斜率 1 螺旋上升。球面上的点是 p = 13 的整数旋子的转轴：青色 κ > 1/2，品红 κ < 1/2。`, `β from 0 to 1: the prime beads climb from the magenta x axis below onto the cyan helix round the ball, bead size the weight ln p/p; the cyan staircase rises along the violet helix of slope 1. The dots on the ball are the axes of the integer rotors of p = 13: cyan κ > 1/2, magenta κ < 1/2.`],
        fig: lens ? [`平直 x 轴（MODEL）：素数越往右越稀。`, `Flat x axis (MODEL): primes thin out to the right.`] : [`素数爬上梅滕斯螺旋，每圈升高一样多；球上是哈尔旋子。`, `Primes climb the Mertens helix, equal rise per turn; Haar rotors.`]
      };
    if (s === 'unfold')
      return {
        long: lens
          ? [`品红小点是平直读法（MODEL）：零点按 γ 等比例排在青色环外侧，越往后越挤。`, `The small magenta dots are the flat reading (MODEL): the zeros to scale in γ outside the cyan ring, crowding further on.`]
          : [`三道紫色相环同一个窗口：内环的品红点是等距晶格，外环的品红点是泊松点，有团有缝；β 从 0 到 1，中环的青色零点从按 γ 排开变成按 ũ 排开，几乎等距，却不像晶格那样死板。琥珀是选中的零点。`, `Three violet phase rings, one window: the magenta dots of the inner ring are a rigid lattice, those of the outer ring Poisson points with clumps and gaps; as β runs from 0 to 1 the cyan zeros of the middle ring move from γ to ũ, almost evenly spaced but not as rigid as the lattice. Amber is the chosen zero.`],
        fig: lens ? [`线性 t（MODEL）：零点越往后越挤。`, `Linear t (MODEL): the zeros crowd further on.`] : [`按 ũ 展开的零点几乎等距，夹在晶格与泊松之间。`, `Unfolded by ũ the zeros are nearly even, between lattice and Poisson.`]
      };
    if (s === 'landau')
      return {
        long: lens
          ? [`品红小点是平直读法（MODEL）：把 ln q 换成 q − 1 时相位落的位置。柱子与紫色相位点照旧用真正的 ln q。`, `The small magenta dots are the flat reading (MODEL): where the phases fall when ln q is replaced by q − 1. The bars and the violet phases still use the true ln q.`]
          : [`外环紫色轮上是前 K 个零点的相位 {γₙ ln q/2π}，琥珀是第 K 个；球顶的中心探针是所选指令的 Λ${sb('K')}(q)，内圈十三根柱是各个指令的 Λ${sb('K')}，墨色小环是目标。K 走到 100：素数幂 2、3、4、5、7、8、9 的柱子立起来，6、10、15、3/2、5/3 贴近 0，15/14 还没有相消。`, `The violet outer wheel carries the phases {γₙ ln q/2π} of the first K zeros, amber the K-th; the central probe above the pole is Λ${sb('K')}(q) of the chosen gate, the thirteen bars of the inner ring are Λ${sb('K')} of each gate, the small ink rings the targets. As K runs to 100 the bars of the prime powers 2, 3, 4, 5, 7, 8, 9 stand up, 6, 10, 15, 3/2, 5/3 stay near 0, and 15/14 has not cancelled yet.`],
        fig: lens ? [`线性化 q − 1（MODEL）：品红相位偏开。`, `Linearized q − 1 (MODEL): magenta phases drift.`] : [`K = 100：素数幂立起尖峰，复合指令贴近 0。`, `K = 100: prime powers spike, composite gates stay near 0.`]
      };
    const c = m.modular;
    return {
      long: lens
        ? [`品红细柱是平直读法（MODEL）：每类整数里素数所占的比例，随 X 变稀；青色份额照旧贴着紫色虚线。`, `The thin magenta bars are the flat reading (MODEL): the share of primes among the integers of each class, thinning as X grows; the cyan shares stay on the dashed violet level.`]
        : [`青色柱是模 ${c.q} 的 ${c.phi} 个互素剩余类里素数的份额，乘以 φ(q) 后画成柱高；紫色虚线是均分的高度。琥珀点沿右侧的桅杆把 X 从 10 推到 10⁶，柱子一起收向虚线。球冠上编号 1–6 的六对珠是六维对偶总账（MODEL）：青色一侧是素数，紫色一侧是零点，逐行内容见右栏同号的一行。`, `The cyan towers are the shares of the primes in the ${c.phi} coprime classes modulo ${c.q}, times φ(q); the dashed violet ring is the level of equal shares. The amber point pushes X up the mast on the right from 10 to 10⁶, and the towers close in on the ring. The six pairs of beads numbered 1–6 on the cap are the six-row duality ledger (MODEL): the cyan side is the primes, the violet side the zeros, each row spelled out under the same number in the right column.`],
      fig: lens ? [`平直密度（MODEL）：品红细柱随 X 变稀。`, `Flat density (MODEL): magenta bars thin out with X.`] : [`X = 10⁶：每类份额贴着 1/φ(q)。`, `X = 10⁶: every class share sits at 1/φ(q).`]
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      lens = state.lens,
      narrow = small(),
      { R, U } = cam;
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'cavity') {
      const c = m.cavity,
        vz = vOf(c.g, lens);
      N('mirror', off(polar(MIRROR, AZF - 0.95), -6, -10), 'σ = 1/2', 'c-cy');
      N('line', off(onBall(1), -10, 14), lens ? L('临界线 · t', 'critical line · t') : L('临界线 · ũ', 'critical line · ũ'), 'c-cy');
      N('zero', off(onBall(vz), -34, 6), `${gname(c.n)} ${rel(null, c.g, 2)}`, 'c-am');
      if (c.delta.x > 0) N('split', off(onBall(vz, SPLIT * c.delta.x), 18, -12), '1/2 ± δ', 'c-mg');
      if (!c.onZero || abs(vOf(c.t, lens) - vz) > 0.04) N('t', off(onBall(vOf(c.t, lens)), 22, 10), `t ${tText(c)}`, 'c-am');
      const shown = narrow ? [2, 3, 5, 37] : PR12;
      PR12.forEach((p, k) => {
        if (shown.includes(p)) N('p' + p, off(polar(RR + 0.32, regAz(k)), 0, 0), String(p), 'c-ik');
      });
      if (!narrow) {
        const r = c.regs[0];
        N('upTag', off(add(regBase(0), [0, 0, STEM * r.up]), 16, 8), 'p<sup>−σ</sup>', 'c-cy');
        N('downTag', off(add(regBase(0), [0, 0, -STEM * r.down]), 22, -6), 'p<sup>−(1−σ)</sup>', 'c-mg');
      }
    }
    if (s === 'mertens') {
      const b = m.mertens.b;
      N('helix', off(helixPoint(ln(1000), MCUM[HELIX_N - 1]), 14, 12), 'Σ ln p/p', 'c-cy');
      if (b < 0.5 || lens) N('flat', off(flatPoint(1000, 0), -6, -14), L('x 轴 · 密度 1/ln x', 'x axis · density 1/ln x'), 'c-mg');
      N('two', off(primePoint(0, b), -12, 10), '2', 'c-ik');
      if (!narrow) N('three', off(primePoint(1, b), 10, 10), '3', 'c-ik');
      N('beta', off(primePoint(BEADS - 1, b), 16, -14), `β ${is(m.mertens.beta)}`, 'c-am');
      N('rot', off([0, 0, LIFT], 0, 18), `p = ${ROTOR_P} · ${ROTORS.length}`, 'c-vi');
      if (!narrow && b > 0.5) N('slope', off(helixPoint(ln(1000) - 0.6, ln(1000) - 0.6 + MERTENS[5].gap), 22, -4), L('斜率 1', 'slope 1'), 'c-vi');
    }
    if (s === 'unfold') {
      const u = m.unfold;
      N('lat', off(ringPoint(RLAT, WIN / 2 - 3), 0, 12), narrow ? 'uₙ = n' : L('等距 uₙ = n', 'lattice uₙ = n'), 'c-mg');
      N('zer', off(ringPoint(RZER, WIN / 2 + 4), 0, 12), narrow ? 'ũ' : L('零点 ũₙ', 'zeros ũₙ'), 'c-cy');
      N('poi', off(ringPoint(RPOI, WIN / 2 + 1), 0, -14), L('泊松', 'Poisson'), 'c-mg');
      N('sel', off(ringPoint(RZER, zeroU(u.n - 1, u.b)), 0, 16), `${uname(u.n)} ${rel(null, lerp(RAW[u.n - 1], UT[u.n - 1], u.b), 2)}`, 'c-am');
    }
    if (s === 'landau') {
      const l = m.landau;
      N('wheel', off(polar(RW, AZF - 1.25), -10, -12), narrow ? 'γₙ ln q/2π' : '{γₙ ln q/2π}', 'c-vi');
      GATES.forEach((x, j) => {
        if (narrow && x.id !== l.gate.id && !['2', '6', '15/14'].includes(x.id)) return;
        const base = polar(RG, gateAz(j));
        N('g' + j, off(base, 0, -12), x.id, x.id === l.gate.id ? 'c-am' : 'c-ik');
      });
      N('val', off([0, 0, ZP + HS * Math.max(0, l.value)], 0, 16), `Λ${sb('K')}(${l.gate.id}) ${rel(null, l.value)}`, 'c-am');
    }
    if (s === 'modular') {
      const c = m.modular;
      c.units.forEach((u, j) => N('a' + j, off(polar(RT, towerAz(j, c.phi), ZB), 0, -12), narrow ? String(u) : `a = ${u}`, 'c-ik'));
      N('level', off(polar(RT, AZF - 1.4, ZB + HM), -8, 10), `1/φ(${c.q}) = ${fstr(c.level.q)}`, 'c-vi');
      N('x0', off(mastPoint(0), 20, 0), '10', 'c-ik');
      N('x6', off(mastPoint(5), 20, 0), '10⁶', 'c-ik');
      N('xnow', off(mastPoint(c.r), -26, 0), `X ${xText(c)}`, 'c-am');
      LEDGER.forEach((_, j) => N('led' + j, off(capPoint(ledgerAz(j), CAP_Z), 0, 11), String(j + 1), 'c-ik'));
      if (!narrow) N('ledHead', off(capPoint(ledgerAz(0), CAP_P), -30, -2), L('素数 ↔ 零点', 'primes ↔ zeros'), 'c-cy');
    }
  }
  /** A relation and its digits stay on one line. */
  const keepNb = (html) => html.replace(/(?:&lt;|[=≈])\u00a0−?\d[\d./]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>');
  const ACTS = {
    cavity: ['下一个零点 ▸', 'Next zero ▸'],
    mertens: ['β：0 ↔ 1', 'β: 0 ↔ 1'],
    unfold: ['β：0 ↔ 1', 'β: 0 ↔ 1'],
    landau: ['下一个指令 ▸', 'Next gate ▸'],
    modular: ['下一个模 ▸', 'Next modulus ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = keepNb(subline(m));
    $('legend').innerHTML = legendItems()
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACTS[state.scene]);
    b.hidden = TRV.still;
    if (b.textContent !== text) b.textContent = text;
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
      if (best && best.cost < 90) place(i, best.dx, best.dy, best.at);
      else list[i].hidden = true;
    }
  }
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(w);
    sc.begin();
    drawBall();
    drawCavity(m, w.cavity);
    drawMertens(m, w.mertens);
    drawUnfold(m, w.unfold);
    drawLandau(m, w.landau);
    drawModular(m, w.modular);
    const here = handleWorld(state.at[state.scene]);
    sc.bead(here, { color: P.amber, r: 6.4, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
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
  /** The top of the y range that leaves the legend rows in open headroom above the highest mark. */
  function headroom(cv, pad, rows, lo, hi) {
    const ih = Math.max(1, cv.clientHeight - pad[2] - pad[3]),
      need = 9 + ROW * (rows - 1) + 24,
      share = clamp(need / ih, 0.37, 0.8);
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
  const PAD = [40, 14, 10, 22];
  /** A chart with its legend rows: the plot and the rows. */
  function chart(cv, items, x, lo, hi) {
    const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
    return { g: kit.plot(cv, { x, y: [lo, headroom(cv, PAD, rows.length, lo, hi)], pad: PAD }), rows };
  }
  /** Z(t) on the rail of the cavity, computed once. */
  const ZCURVE = sample(720, (s) => {
    const t = T0 + TSPAN * s;
    return [t, hardyZ(t)];
  });
  /** The Landau spectrum at K, cached by K. */
  const SPECTRUM = new Map();
  function spectrumAt(K) {
    if (!SPECTRUM.has(K))
      SPECTRUM.set(
        K,
        sample(640, (s) => {
          const x = 1.3 + 15.7 * s;
          return [x, landauAt(x, K)];
        })
      );
    return SPECTRUM.get(K);
  }
  /** The Mertens staircase and the counting staircase on the strip, at β. */
  const STRIP_M = (() => {
    const pts = [];
    for (let e = 0.3; e <= 6.0001; e += 0.02) {
      const X = 10 ** e;
      pts.push([X, piOf(X), mertensOf(X)]);
    }
    return pts;
  })();
  /** The shares of every class modulo q along log₁₀ X from 1 to 6, cached by q. */
  const SHARE_PATHS = new Map();
  function sharePaths(q) {
    if (!SHARE_PATHS.has(q)) {
      const C = CLASSES[q],
        paths = C.units.map(() => []);
      for (let e = 1; e <= 6.0001; e += 0.025) {
        const X = 10 ** e,
          c = classesAt(q, X);
        c.shares.forEach((v, j) => paths[j].push([e, v.x]));
      }
      SHARE_PATHS.set(q, paths);
    }
    return SHARE_PATHS.get(q);
  }
  const SCHOENFELD = sample(240, (s) => {
    const e = Math.log10(2657) + (6 - Math.log10(2657)) * s;
    return [e, schoenfeld(10 ** e)];
  });
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot'),
      cb = $('plotB'),
      s = state.scene,
      A = cv.clientWidth && cv.clientHeight,
      B = cb.clientWidth && cb.clientHeight;
    if (s === 'cavity') {
      const c = m.cavity;
      if (A) {
        $('plotTitle').innerHTML = L('Z(t) 沿临界线：零点处变号', 'Z(t) along the critical line: sign changes at the zeros');
        $('plotMeta').innerHTML = `t ${tText(c)}`;
        const { g, rows } = chart(cv, [[P.cyan, 'Z(t)'], [P.ink, L('零点 γₙ', 'zeros γₙ'), 'dot']], [T0, T0 + TSPAN], -3.2, 3.6);
        g.axes({ xTicks: [10, 20, 30, 40, 50, 60, 70].map((t) => [t, String(t)]), yTicks: [[-2, '−2'], [0, '0'], [2, '2']] });
        g.line(ZCURVE.map(([t, z]) => [t, clamp(z, -3.2, 3.2)]), P.cyan, { width: 1.5 });
        for (let i = 0; i < NZ; i++) g.dot(GAMMA[i], 0, i === c.n - 1 ? P.amber : P.ink, i === c.n - 1 ? 3.6 : 2.4);
        g.line([[c.t, -3.2], [c.t, 3.2]], P.amber, { width: 1 });
        drawLegend(g, rows);
      }
      if (B) {
        $('plotTitleB').innerHTML = L('两壳振幅 p<sup>−σ</sup> 与 p<sup>−(1−σ)</sup>', 'Shell amplitudes p<sup>−σ</sup> and p<sup>−(1−σ)</sup>');
        $('plotMetaB').innerHTML = `δ ${is(c.delta)}`;
        const { g, rows } = chart(cb, [[P.cyan, L('上壳 · 上杆', 'upper shell · stem above')], [P.magenta, L('下壳 · 下杆', 'lower shell · stem below')]], [0, 40], 0, 1);
        g.axes({ xTicks: [2, 5, 11, 17, 23, 29, 37].map((p) => [p, String(p)]), yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
        g.line(c.regs.map((r) => [r.p, r.up]), P.cyan, { width: 1.5 });
        g.line(c.regs.map((r) => [r.p, r.down]), P.magenta, { width: 1.5, dash: c.delta.x ? [] : [4, 3] });
        for (const r of c.regs) {
          g.dot(r.p, r.up, P.cyan, 2.6);
          g.dot(r.p, r.down, P.magenta, 2.2);
        }
        drawLegend(g, rows);
      }
      return;
    }
    if (s === 'mertens') {
      const mm = m.mertens,
        b = mm.b;
      if (A) {
        $('plotTitle').innerHTML = L('计数 π(x) 对 x，变成 Σ ln p/p 对 ln x', 'Count π(x) against x becomes Σ ln p/p against ln x');
        $('plotMeta').innerHTML = `β ${is(mm.beta)}`;
        const fx = (X) => lerp(X / 1e6, ln(X) / ln(1e6), b),
          fy = (row) => lerp(row[1] / piOf(1e6), row[2] / mertensOf(1e6), b);
        const { g, rows } = chart(cv, [[P.cyan, L('阶梯', 'staircase')], [P.violet, L('斜率 1', 'slope 1'), 'dash']], [0, 1.02], 0, 1.02);
        g.axes({ xTicks: [[0, '0'], [0.5, '1/2'], [1, '1']], yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
        // the line of slope 1 belongs to the reading β = 1: drawn there, fading in with β
        if (b > 0.02) g.line(sample(40, (s2) => { const ell = lerp(1.5, ln(1e6), s2); return [ell / ln(1e6), (ell + MERTENS[5].gap) / mertensOf(1e6)]; }), P.violet, { width: 1.2, dash: [4, 3], alpha: b });
        g.line(STRIP_M.map((row) => [fx(row[0]), fy(row)]), P.cyan, { width: 1.6 });
        drawLegend(g, rows);
      }
      if (B) {
        $('plotTitleB').innerHTML = L('旋子读数 κ 的直方图与哈尔密度', 'Histogram of the rotor reading κ and the Haar density');
        $('plotMetaB').innerHTML = L(`p ≤ 199 · ${HAAR.total} 个`, `p ≤ 199 · ${HAAR.total}`);
        const { g, rows } = chart(cb, [[P.violet, L('整数旋子', 'integer rotors')], [P.cyan, '(8/π)√(κ(1 − κ))']], [0, 1], 0, 1.4);
        g.axes({ xTicks: [[0, '0'], [0.5, '1/2'], [1, '1']], yTicks: [[0, '0'], [1, '1']] });
        HAAR.bins.forEach((h, i) => g.rect(i / 20 + 0.004, 0, (i + 1) / 20 - 0.004, h, P.violet, { alpha: 0.55 }));
        g.line(sample(120, (k) => [k, haarDensity(k)]), P.cyan, { width: 1.8 });
        drawLegend(g, rows);
      }
      return;
    }
    if (s === 'unfold') {
      const u = m.unfold;
      if (A) {
        $('plotTitle').innerHTML = L('ũ<sub>n</sub> − n：展开后的零点贴着整数序号 n', 'ũ<sub>n</sub> − n: the unfolded zeros hug their index n');
        $('plotMeta').innerHTML = `${uname(u.n)} − ${u.n} ${rel(null, u.u - u.n)}`;
        const { g, rows } = chart(cv, [[P.cyan, L('零点', 'zeros'), 'dot'], [P.violet, L('整数序号', 'the index'), 'dash']], [0, KMAX + 1], -0.8, 0.8);
        g.axes({ xTicks: [1, 25, 50, 75, 100].map((k) => [k, String(k)]), yTicks: [[-0.5, '−1/2'], [0, '0'], [0.5, '1/2']] });
        g.line([[0, 0], [KMAX + 1, 0]], P.violet, { width: 1.2, dash: [4, 3] });
        for (let k = 0; k < KMAX; k++) g.dot(k + 1, UT[k] - (k + 1), k === u.n - 1 ? P.amber : P.cyan, k === u.n - 1 ? 3.6 : 2.2);
        drawLegend(g, rows);
      }
      if (B) {
        $('plotTitleB').innerHTML = L('数方差：泊松 L、晶格、零点、GUE 模型（OPEN）', 'Number variance: Poisson L, lattice, zeros, GUE model (OPEN)');
        $('plotMetaB').innerHTML = `L ≤ 6`;
        const { g, rows } = chart(cb, [[P.magenta, L('泊松', 'Poisson')], [P.magenta, L('晶格', 'lattice'), 'dash'], [P.cyan, L('零点', 'zeros'), 'dot'], [P.ink, 'GUE (OPEN)', 'dash']], [0, 6], 0, 1.2);
        g.axes({ xTicks: [0, 2, 4, 6].map((x) => [x, String(x)]), yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
        g.line([[0, 0], [1.2, 1.2]], P.magenta, { width: 1.6 });
        g.line(sample(240, (x) => [6 * x, latticeVar(6 * x)]), P.magenta, { width: 1.2, dash: [2, 3] });
        g.line(sample(120, (x) => [6 * x, gueVar(6 * x)]), P.ink, { width: 1.2, dash: [4, 3] });
        VAR_L.forEach((Lw, i) => g.dot(Lw, VARIANCE[i], P.cyan, 2.6));
        drawLegend(g, rows);
      }
      return;
    }
    if (s === 'landau') {
      const l = m.landau;
      if (A) {
        $('plotTitle').innerHTML = L(`朗道谱 Λ${sb('K')}(x)：尖峰落在素数幂上`, `Landau spectrum Λ${sb('K')}(x): spikes on prime powers`);
        $('plotMeta').innerHTML = `K = ${l.K}`;
        const { g, rows } = chart(cv, [[P.cyan, L('朗道探针', 'Landau probe')], [P.ink, L('素数幂处的目标', 'targets at prime powers'), 'dot']], [1.3, 17], -0.6, 1.0);
        g.axes({ xTicks: [2, 3, 4, 5, 7, 8, 9, 11, 13, 16].map((x) => [x, String(x)]), yTicks: [[0, '0'], [0.5, '1/2']] });
        g.line([[1.3, 0], [17, 0]], P.ink, { width: 1, alpha: 0.5 });
        g.line(spectrumAt(l.K).map(([x, y]) => [x, clamp(y, -0.6, 0.95)]), P.cyan, { width: 1.3 });
        for (const x of [2, 3, 4, 5, 7, 8, 9, 11, 13, 16]) {
          const pp = primePower(x);
          g.dot(x, ln(pp[0]) / pp[0] ** (pp[1] / 2), P.ink, 2.4);
        }
        g.line([[l.gate.q, -0.6], [l.gate.q, 0.95]], P.amber, { width: 1 });
        drawLegend(g, rows);
      }
      if (B) {
        $('plotTitleB').innerHTML = L(`Λ${sb('K')}(${l.gate.id}) 随 K 收向目标`, `Λ${sb('K')}(${l.gate.id}) along K towards its target`);
        $('plotMetaB').innerHTML = L(`绕 ${rel(null, l.turns, 2)} 圈`, `${rel(null, l.turns, 2)} turns`);
        const { g, rows } = chart(cb, [[P.cyan, L('探针', 'probe')], [P.violet, L('目标', 'target'), 'dash']], [1, KMAX], -1, 1.4);
        g.axes({ xTicks: [1, 25, 50, 75, 100].map((k) => [k, String(k)]), yTicks: [[-1, '−1'], [0, '0'], [1, '1']] });
        g.line(range(KMAX).map((k) => [k + 1, clamp(landauK(l.gate, k + 1), -1, 1.4)]), P.cyan, { width: 1.5 });
        g.line([[1, l.target.x], [KMAX, l.target.x]], P.violet, { width: 1.2, dash: [4, 3] });
        g.dot(l.K, clamp(l.value, -1, 1.4), P.amber, 3.6);
        drawLegend(g, rows);
      }
      return;
    }
    const c = m.modular;
    if (A) {
      $('plotTitle').innerHTML = L(`模 ${c.q} 各类份额随 X 收向 1/φ(q) = ${fstr(c.level.q)}`, `Class shares modulo ${c.q} along X towards 1/φ(q) = ${fstr(c.level.q)}`);
      $('plotMeta').innerHTML = `X ${xText(c)}`;
      const lvl = c.level.x,
        { g, rows } = chart(cv, [[P.cyan, L('各类份额', 'class shares')], [P.violet, '1/φ(q)', 'dash']], [1, 6], 0, Math.min(1, lvl * 2.2));
      g.axes({ xTicks: [1, 2, 3, 4, 5, 6].map((e) => [e, `10${superscript(e)}`]), yTicks: [[0, '0'], [lvl, fstr(c.level.q)]] });
      for (const path of sharePaths(c.q)) g.line(path.map(([e, y]) => [e, Math.min(y, lvl * 2.2)]), P.cyan, { width: 1.2, alpha: 0.85 });
      g.line([[1, lvl], [6, lvl]], P.violet, { width: 1.2, dash: [4, 3] });
      g.line([[c.e, 0], [c.e, lvl * 2]], P.amber, { width: 1 });
      drawLegend(g, rows);
    }
    if (B) {
      $('plotTitleB').innerHTML = L('(π(x) − li(x)) ÷ (√x ln x/8π)：x ≥ 2657 时在 ±1 之内', '(π(x) − li(x)) ÷ (√x ln x/8π): within ±1 for x ≥ 2657');
      $('plotMetaB').innerHTML = 'Schoenfeld';
      const { g, rows } = chart(cb, [[P.cyan, L('比值', 'ratio')], [P.violet, '±1', 'dash']], [Math.log10(2657), 6], -1.2, 1.2);
      g.axes({ xTicks: [4, 5, 6].map((e) => [e, `10${superscript(e)}`]), yTicks: [[-1, '−1'], [0, '0'], [1, '1']] });
      g.line([[Math.log10(2657), 1], [6, 1]], P.violet, { width: 1.2, dash: [4, 3] });
      g.line([[Math.log10(2657), -1], [6, -1]], P.violet, { width: 1.2, dash: [4, 3] });
      g.line(SCHOENFELD, P.cyan, { width: 1.5 });
      if (c.e >= Math.log10(2657)) g.dot(c.e, schoenfeld(c.X), P.amber, 3.4);
      drawLegend(g, rows);
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    switch (state.scene) {
      case 'mertens':
        return L(`Σ ln p/p − ln X：${MERTENS.map((r) => `10${superscript(r.e)} ${rel(null, r.gap)}`).join('，')}。`, `Σ ln p/p − ln X: ${MERTENS.map((r) => `10${superscript(r.e)} ${rel(null, r.gap)}`).join(', ')}.`);
      case 'unfold':
        return L(`u = θ(γ)/π + 1 把 ${gname(state.n)} 放在 ${rel(null, UT[state.n - 1] - 0.5)}（中点 n − 1/2），ũ = u + 1/2 放在 ${rel(null, UT[state.n - 1])}。前 14 个间隔的平均 ${rel(null, GAP14)}，前 99 个 ${rel(null, GAP99)}。`, `u = θ(γ)/π + 1 puts ${gname(state.n)} at ${rel(null, UT[state.n - 1] - 0.5)} (midpoint n − 1/2), ũ = u + 1/2 at ${rel(null, UT[state.n - 1])}. Mean of the first 14 spacings ${rel(null, GAP14)}, of the first 99 ${rel(null, GAP99)}.`);
      case 'landau': {
        const l = m.landau;
        return L(`十等分圆周上相位份额与 1/10 的最大偏差 ${rel(null, l.weyl)}。`, `Largest gap between the share of the phases in a tenth of the circle and 1/10: ${rel(null, l.weyl)}.`);
      }
      case 'modular': {
        const p = m.modular.parseval;
        return L(`帕塞瓦尔：Σ|f|² = ${p.lhs}，(1/q)Σ|dft f|² ${rel(null, p.rhs, 2)}。`, `Parseval: Σ|f|² = ${p.lhs}, (1/q)Σ|dft f|² ${rel(null, p.rhs, 2)}.`);
      }
      default: {
        const c = m.cavity;
        return L(`Z(${gname(c.n)} − 1/20) ${rel(null, c.zl)}，Z(${gname(c.n)} + 1/20) ${rel(null, c.zr)}。`, `Z(${gname(c.n)} − 1/20) ${rel(null, c.zl)}, Z(${gname(c.n)} + 1/20) ${rel(null, c.zr)}.`);
      }
    }
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = keepNb(html)),
      c = m.cavity,
      mm = m.mertens,
      u = m.unfold,
      l = m.landau,
      md = m.modular;
    const keys = {
      cavity: () => (c.delta.x ? `p<sup>−σ</sup> ≠ p<sup>−(1−σ)</sup> · |u| ${is(c.uIn)}` : `p<sup>−σ</sup> = p<sup>−(1−σ)</sup> · |u| = 1`),
      mertens: () => `E[κ] ${is(mm.rot.meanK)} · Var κ ${is(mm.rot.varK)}`,
      unfold: () => `⟨Δũ⟩ ${rel(null, GAP99)} → 1`,
      landau: () => `Λ${sb(l.K)}(${l.gate.id}) ${rel(null, l.value)}`,
      modular: () => `${md.phi} × 1/φ(q) = 1`
    };
    put('roKey', keys[state.scene]());
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roZero', `${rel(null, c.g)} · ${rel(null, c.u)} · ${tiny(c.zl)} / ${tiny(c.zr)}`);
    put('roDrift', `${short(c.delta)} · ${c.delta.x ? rel(null, 2 ** (-2 * c.delta.x)) : '= 1'} · ${is(c.drift)} · ${is(c.uIn)}`);
    put('roMertens', `${rel(null, MERTENS[5].gap)} · ${rel(null, mm.slope)}`);
    put('roHaar', `${mm.rot.count} · ${is(mm.rot.meanK)} · ${is(mm.rot.varK)}`);
    put('roLandau', `${rel(null, l.value)} · ${l.target.q ? '= 0' : rel(null, l.target.x)} · ${rel(null, l.diff)}`);
    put('roModular', `${md.q} · ${md.phi} · ${rel(null, md.dev)}`);
    put('roNote', readNote(m));
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    put('keyPill', `σ <strong>${fstr(c.sigma.q)}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = {
      cavity: '|(s − 1)/s| = 1 ⇔ Re s = 1/2',
      mertens: 'Σ<sub>p≤X</sub> ln p/p = ln X + O(1) · dμ = (8/π)√(κ(1 − κ)) dκ',
      unfold: 'ũ = θ(γ)/π + 3/2 · N(T) = θ(T)/π + 1 + S(T)',
      landau: 'Λ<sub>K</sub>(q) = −(2π/γ<sub>K</sub>) Σ<sub>n≤K</sub> cos(γ<sub>n</sub> ln q)',
      modular: 'π(X; q, a)/π(X) → 1/φ(q)'
    }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    $('nRange').value = String(state.n);
    put('nOut', `${gname(state.n)} ${rel(null, GAMMA[state.n - 1])}`);
    $('deltaRange').value = String(state.dk);
    put('deltaOut', `${is(c.delta)}`);
    $('resetDelta').setAttribute('aria-pressed', String(state.dk === 0));
    $('betaRange').value = String(Math.round(mm.b * 100));
    put('betaOut', `${is(mm.beta)}`);
    $('unfoldRange').value = String(Math.round(u.b * 100));
    put('unfoldOut', `${is(u.beta)}`);
    gateChips.set(state.gate, true);
    $('kRange').value = String(l.K);
    put('kOut', `= ${l.K}`);
    modChips.set(String(state.mod), true);
    $('xRange').value = String(Math.round(md.r * 10));
    put('xOut', `X ${xText(md)}`);
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
  /** The text of the rail for the present scene. */
  function railText(t) {
    switch (state.scene) {
      case 'mertens':
      case 'unfold':
        return `β ${is(onGrid(settled(t, 100), 100))}`;
      case 'landau':
        return `K = ${Math.max(1, Math.round(t))}`;
      case 'modular': {
        const r = settled(t, 10);
        return Number.isInteger(r) ? `X = 10${superscript(1 + r)}` : `X ≈ ${Math.floor(10 ** (1 + r) + 1e-9)}`;
      }
      default: {
        const at = zeroAt(T0 + t);
        return at >= 0 ? `t = γ${subscript(at + 1)}` : `t ≈ ${kit.fix(T0 + t, 2)}`;
      }
    }
  }
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.cavity.rate,
    step: RAILS.cavity.step,
    rangeStep: String(RAILS.cavity.step),
    max: RAILS.cavity.max,
    t: STILL.cavity,
    format: (t) => railText(t),
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a rail at rest comes to its grid, and the rail of the cavity onto a zero it touches
      if (!c.playing) {
        const r = rail();
        let v = t;
        if (r.grid) v = Math.round(t * r.grid) / r.grid;
        else {
          const g = GAMMA.slice(0, NZ).find((x) => abs(x - (T0 + t)) <= r.step / 2 + 1e-9);
          if (g != null) v = g - T0;
        }
        if (abs(v - t) > 1e-12) {
          c.set(clamp(v, 0, c.max));
          return;
        }
      }
      state.at[state.scene] = t;
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
    $('now').step = String(r.step);
    const at = Math.min(state.at[state.scene], r.max);
    clock.setMax(r.max, true);
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
  function show(scene) {
    if (state.scene === scene) return;
    setScene(scene, 0);
    sc.view(camOf(scene, state.cam), 0);
  }
  /** A control of a card shows the card and changes it. */
  function steer(scene, change) {
    leave();
    show(scene);
    change();
    paint();
  }
  kit.field($('nRange'), {
    out: $('nOut'),
    fmt: (v) => `γ${subscript(v)}`,
    onInput: (v) =>
      steer('cavity', () => {
        state.n = Math.round(v);
        clock.set(GAMMA[state.n - 1] - T0);
      })
  });
  kit.field($('deltaRange'), { out: $('deltaOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), 100n))}`, onInput: (v) => steer('cavity', () => (state.dk = Math.round(v))) });
  $('resetDelta').addEventListener('click', () => steer('cavity', () => (state.dk = 0)));
  kit.field($('betaRange'), { out: $('betaOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), 100n))}`, onInput: (v) => steer('mertens', () => clock.set(Math.round(v) / 100)) });
  kit.field($('unfoldRange'), { out: $('unfoldOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), 100n))}`, onInput: (v) => steer('unfold', () => clock.set(Math.round(v) / 100)) });
  const gateChips = kit.chips($('gateChips'), 'gate', (v) => steer('landau', () => (state.gate = GATE[v] ? v : '2')));
  kit.field($('kRange'), { out: $('kOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('landau', () => clock.set(Math.round(v))) });
  const modChips = kit.chips($('modChips'), 'mod', (v) => steer('modular', () => (state.mod = MODS.includes(Number(v)) ? Number(v) : 5)));
  kit.field($('xRange'), { out: $('xOut'), fmt: (v) => (v % 10 ? `X ≈ ${Math.floor(10 ** (1 + v / 10) + 1e-9)}` : `X = 10${superscript(1 + v / 10)}`), onInput: (v) => steer('modular', () => clock.set(Math.round(v) / 10)) });
  /* the action button of the stage: the next zero (and its time), β flipped, the next gate, the next modulus */
  function act() {
    const s = state.scene;
    if (s === 'cavity')
      return steer('cavity', () => {
        state.n = (state.n % NZ) + 1;
        clock.set(GAMMA[state.n - 1] - T0);
      });
    if (s === 'mertens' || s === 'unfold') return steer(s, () => clock.set(state.at[s] >= 0.5 ? 0 : 1));
    if (s === 'landau')
      return steer('landau', () => {
        const j = GATES.findIndex((g) => g.id === state.gate);
        state.gate = GATES[(j + 1) % GATES.length].id;
      });
    return steer('modular', () => (state.mod = MODS[(MODS.indexOf(state.mod) + 1) % MODS.length]));
  }
  $('stageAct').addEventListener('click', act);
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = ['panorama', 'level', 'above'].includes(v) ? v : 'panorama';
    sc.view(camOf(state.scene, state.cam), TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens renames the picture and keeps the state; the rail switch and its mirror in the tour bar both flip it
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
    Object.assign(state, FRESH, { at: { ...STILL } });
    // a still, a reader who asked for reduced motion and a freshly opened page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting;
    if (!parked) state.at[p.scene] = 0;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = 'panorama';
    camChips.set('panorama', true);
    sc.view(camOf(p.scene, 'panorama'), booting || TRV.still ? 0 : 600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    } else if (booting && TRV.embed && !TRV.still && !TRV.reduceMotion) bootAutoplay(p.still);
    paint();
  }
  /* the notes follow the live frame, as the HUD line does: the marked card and the free-play line are rewritten in place
     when their text changes. A cited figure and a phone carry the short form. */
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
      r = rail();
    // the place of the rail nearest the pointer, the present one before others at the same distance
    const n = Math.round(r.max / r.step);
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= n; k++) {
      const v = k * r.step,
        p = sc.p(handleWorld(v)),
        d = hypot(p[0] - x, p[1] - y) + abs(clock.t - v) * 1e-4;
      if (d < gap) {
        gap = d;
        best = v;
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
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(clock.max);
    else clock.stepBy(ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1);
  };

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  /** ω(t) = Σ_{n≥1} e^{−πn²t}, the half theta tail of the Lean theorem. */
  const omega = (t) => {
    let s = 0;
    for (let n = 1; n <= 6; n++) s += Math.exp(-PI * n * n * t);
    return s;
  };
  /** M(s) = ∫_{t>1} ω(t)(t^{s/2} + t^{(1−s)/2}) dt/t by Simpson's rule in u = ln t on [0, 3.2] (ω(e^{3.2}) < 10⁻³⁰). */
  function mellinM(sr, si) {
    const U0 = 3.2,
      n = 6000,
      h = U0 / n;
    let re = 0,
      im = 0;
    for (let k = 0; k <= n; k++) {
      const u = k * h,
        w = k === 0 || k === n ? 1 : k % 2 ? 4 : 2,
        om = omega(Math.exp(u)),
        a1 = Math.exp((u * sr) / 2),
        p1 = (u * si) / 2,
        a2 = Math.exp((u * (1 - sr)) / 2),
        p2 = (-u * si) / 2;
      re += w * om * (a1 * cs(p1) + a2 * cs(p2));
      im += w * om * (a1 * sn(p1) + a2 * sn(p2));
    }
    return [(re * h) / 3, (im * h) / 3];
  }
  /** ξ(s) = (s(s − 1)M(s) + 1)/2 with M = Λ₀ of the Lean theorem. */
  function xiOf(sr, si) {
    const [mr, mi] = mellinM(sr, si),
      ar = sr * (sr - 1) - si * si,
      ai = si * (2 * sr - 1);
    return [0.5 * (ar * mr - ai * mi + 1), 0.5 * (ar * mi + ai * mr)];
  }
  /** Λ(n) for n ≤ x: ln p at prime powers. */
  function mangoldt(x) {
    const out = new Float64Array(x + 1);
    for (const p of PRIMES) {
      if (p > x) break;
      for (let q = p; q <= x; q *= p) out[q] = ln(p);
    }
    return out;
  }
  function benchmarks() {
    // 1 · the Mellin reconstruction: Λ(2) = π/6 gives M(2) = π/6 − 1/2; ξ at 1/2 + 14i, at γ₁, and off the line
    const M2 = mellinM(2, 0)[0],
      xi14 = xiOf(0.5, 14),
      xiG1 = xiOf(0.5, GAMMA[0]),
      xiOff = xiOf(0.85, GAMMA[0]),
      xiMirror = xiOf(0.15, -GAMMA[0]);
    // 2 · the Cayley image on the line for all hundred zeros, and off it at δ = 7/20
    const cayleyOn = Math.max(...GAMMA.map((g) => abs(cayleyAbs(0.5, g) - 1))),
      cayleyIn = cayleyAbs(0.85, GAMMA[0]),
      cayleyOut = cayleyAbs(0.15, GAMMA[0]);
    // 3 · the four images of 1/2 ± δ ± iγ₁ are closed under z ↦ 1/z̄
    const img = (sr, si) => {
      const den = sr * sr + si * si;
      return [((sr - 1) * sr + si * si) / den, (si * sr - (sr - 1) * si) / den];
    };
    const quad = [[0.85, GAMMA[0]], [0.85, -GAMMA[0]], [0.15, GAMMA[0]], [0.15, -GAMMA[0]]].map(([a, b]) => img(a, b));
    const closure = Math.max(
      ...quad.map(([x, y]) => {
        const r2 = x * x + y * y,
          inv = [x / r2, y / r2];
        return Math.min(...quad.map(([u, v]) => hypot(u - inv[0], v - inv[1])));
      })
    );
    // 4 · the integrated explicit formula at y = ln X, X = 10, 100, 1000, with the first hundred pairs and the bound of the rest
    const LAM = mangoldt(1000),
      pairSum = GAMMA.reduce((s, g) => s + 2 / (0.25 + g * g), 0),
      rest = 2 + EULER_GAMMA - ln(4 * PI) - pairSum;
    const explicit = [10, 100, 1000].map((X) => {
      const y = ln(X);
      let lhs = 0;
      for (const g of GAMMA) lhs += (2 * Math.exp(y / 2) * cs(y * g)) / (0.25 + g * g);
      let a = 0,
        psi = 0;
      for (let n = 1; n <= X; n++) {
        a += LAM[n] / n;
        psi += LAM[n];
      }
      let T = 0;
      for (let n = 1; n < 60; n++) T += Math.exp(-2 * n * y) / (2 * n * (2 * n + 1));
      const rhs = X * a - psi - X * ln(X) + (1 + EULER_GAMMA) * X - ln(TAU) + T;
      return { X, lhs, rhs, gap: abs(lhs - rhs), bound: Math.exp(y / 2) * rest };
    });
    // 5 · factorization of 1 … 60 adds exponents under products
    const factor = (n) => {
      const e = {};
      for (let p = 2; p * p <= n; p++)
        while (n % p === 0) {
          e[p] = (e[p] || 0) + 1;
          n /= p;
        }
      if (n > 1) e[n] = (e[n] || 0) + 1;
      return e;
    };
    let monoidBad = 0,
      monoidTried = 0;
    for (let a = 1; a <= 60; a++)
      for (let b = 1; b <= 60; b++) {
        monoidTried++;
        const ea = factor(a),
          eb = factor(b),
          eab = factor(a * b),
          keys = new Set([...Object.keys(ea), ...Object.keys(eb), ...Object.keys(eab)]);
        for (const k of keys) if ((eab[k] || 0) !== (ea[k] || 0) + (eb[k] || 0)) monoidBad++;
      }
    // 6 · the thirteen gates as signed ledgers over the twelve registers, and back
    const ledgerOf = (a, b) => {
      const fa = factor(a),
        fb = factor(b);
      return PR12.map((p) => (fa[p] || 0) - (fb[p] || 0));
    };
    const back = (e) => e.reduce((f, x, i) => times(f, x >= 0 ? whole(BigInt(PR12[i]) ** BigInt(x)) : frac(1n, BigInt(PR12[i]) ** BigInt(-x))), ONE);
    const gateLedgers = GATES.map((g) => ({ id: g.id, e: ledgerOf(g.a, g.b), ok: equal(back(ledgerOf(g.a, g.b)), frac(BigInt(g.a), BigInt(g.b))) }));
    // 7 · no nonzero (a, b, c) with |a|, |b|, |c| ≤ 6 has 2^a 3^b 5^c = 1; the least |a ln 2 + b ln 3 + c ln 5|
    let relHits = 0,
      least = Infinity,
      leastAt = null;
    for (let a = -6; a <= 6; a++)
      for (let b = -6; b <= 6; b++)
        for (let c = -6; c <= 6; c++) {
          if (!a && !b && !c) continue;
          const up = 2n ** BigInt(Math.max(a, 0)) * 3n ** BigInt(Math.max(b, 0)) * 5n ** BigInt(Math.max(c, 0)),
            down = 2n ** BigInt(Math.max(-a, 0)) * 3n ** BigInt(Math.max(-b, 0)) * 5n ** BigInt(Math.max(-c, 0));
          if (up === down) relHits++;
          const v = abs(a * ln(2) + b * ln(3) + c * ln(5));
          if (v < least) {
            least = v;
            leastAt = [a, b, c];
          }
        }
    // 8 · 2 · 3 · … · 37 + 1 and its least prime factor
    const primorial = PR12.reduce((s, p) => s * p, 1),
      escape = primorial + 1;
    let factorQ = escape;
    for (let d = 41; d * d <= escape; d += 2)
      if (escape % d === 0) {
        factorQ = d;
        break;
      }
    const residuesOne = PR12.every((p) => escape % p === 1);
    // 9 – 10 · the rotors of norm 13: κ(q, 1) = 1 − |q − 1|²/4, and the mean Born probability (w² + x²)/13
    let chordBad = 0;
    for (const q of ROTORS) {
      const s = Math.sqrt(ROTOR_P),
        u = q.map((x) => x / s),
        k = (1 + u[0]) / 2,
        d2 = (u[0] - 1) ** 2 + u[1] ** 2 + u[2] ** 2 + u[3] ** 2;
      if (abs(k - (1 - d2 / 4)) > 1e-12) chordBad++;
    }
    const born = num(frac(BigInt(ROTORS.reduce((s, q) => s + q[0] * q[0] + q[1] * q[1], 0)), BigInt(ROTORS.length * ROTOR_P)));
    // 11 · the heap x_{n+2} = x_{n+1} x_n* x_{n+1} through 1 and q = (1 + 2i + 2j + 2k)/√13: ⟨x₀, x_n⟩ = T_n(1/√13)
    const qmul = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
    const qcon = (a) => [a[0], -a[1], -a[2], -a[3]];
    const q1 = [1, 2, 2, 2].map((x) => x / Math.sqrt(13)),
      xs = [[1, 0, 0, 0], q1];
    for (let n = 2; n <= 12; n++) xs.push(qmul(qmul(xs[n - 1], qcon(xs[n - 2])), xs[n - 1]));
    const cheb = [1, q1[0]];
    for (let n = 2; n <= 12; n++) cheb.push(2 * q1[0] * cheb[n - 1] - cheb[n - 2]);
    const heapGap = Math.max(...xs.map((x, n) => abs(x[0] - cheb[n])));
    // 12 · Schur orthogonality of the characters sin(mφ)/sin φ of SU(2) against (2/π) sin²φ dφ, m, n ≤ 4; the Haar mass
    const simpson = (f, a, b, n = 2000) => {
      const h = (b - a) / n;
      let s = f(a) + f(b);
      for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * f(a + k * h);
      return (s * h) / 3;
    };
    let schurGap = 0;
    for (let a = 1; a <= 4; a++)
      for (let b = 1; b <= 4; b++) {
        const v = (2 / PI) * simpson((p) => sn(a * p) * sn(b * p), 0, PI);
        schurGap = Math.max(schurGap, abs(v - (a === b ? 1 : 0)));
      }
    const haarMass = simpson(haarDensity, 0, 1, 20000),
      haarMean = simpson((k) => k * haarDensity(k), 0, 1, 20000),
      haarVar = simpson((k) => (k - 0.5) ** 2 * haarDensity(k), 0, 1, 20000);
    // 13 · Parseval for the prime counts by residue modulo 5 up to 10⁶
    const pars = parsevalAt(5, 1e6);
    // 14 · the irrational rotation α = log₂ 3: averages of e^{2πix}
    const alpha = ln(3) / ln(2),
      averages = [10, 100, 1000, 10000].map((N) => {
        let re = 0,
          im = 0;
        for (let i = 0; i < N; i++) {
          const f = i * alpha;
          re += cs(TAU * f);
          im += sn(TAU * f);
        }
        return { N, mod: hypot(re, im) / N };
      });
    // 15 – 16 · the orbit of the hands of 2, 3, 5 at t = 1, 2, 3, …: cells of 8³ met, and no short relation k·(ln 2, ln 3, ln 5) ∈ 2πℤ
    const seen = new Set();
    let metAt = 0;
    for (let n = 1; n <= 6000 && seen.size < 512; n++) {
      const cell = [2, 3, 5].map((p) => {
        const f = (n * ln(p)) / TAU;
        return Math.min(7, Math.floor((f - Math.floor(f)) * 8));
      });
      seen.add(cell.join());
      if (seen.size === 512) metAt = n;
    }
    let ringGap = Infinity;
    for (let a = -6; a <= 6; a++)
      for (let b = -6; b <= 6; b++)
        for (let c = -6; c <= 6; c++) {
          if (!a && !b && !c) continue;
          const v = (a * ln(2) + b * ln(3) + c * ln(5)) / TAU;
          ringGap = Math.min(ringGap, abs(v - Math.round(v)) * TAU);
        }
    // the zeros: sign changes of Z across all hundred, and Z at the ordinates
    let flips = 0,
      zMax = 0;
    for (const g of GAMMA) {
      if (hardyZ(g - 0.05) * hardyZ(g + 0.05) < 0) flips++;
      zMax = Math.max(zMax, abs(hardyZ(g)));
    }
    const landau = Object.fromEntries(GATES.map((g) => [g.id, { value: landauK(g, KMAX), target: targetOf(g).x, turns: (GAMMA[KMAX - 1] * g.lq) / TAU }]));
    return {
      mellin: { M2, exact: PI / 6 - 0.5, xi14, xiG1, xiOff, xiMirror },
      cayley: { on: cayleyOn, inside: cayleyIn, outside: cayleyOut },
      closure,
      explicit,
      rest,
      monoid: { tried: monoidTried, bad: monoidBad },
      ledgers: gateLedgers,
      independence: { hits: relHits, least, at: leastAt },
      escape: { n: escape, factor: factorQ, residuesOne },
      rotors: { count: ROTORS.length, chordBad, born, ...ROTOR_M },
      heapGap,
      schur: { gap: schurGap, mass: haarMass, mean: haarMean, variance: haarVar },
      parseval: pars,
      rotation: averages,
      torus: { met: seen.size, at: metAt, ringGap },
      zeros: { flips, zMax },
      haar: HAAR,
      landau,
      mertens: MERTENS,
      slope: SLOPE,
      unfold: { u1: UT[0], u10: UT[9], u15: UT[14], u100: UT[99], gap14: GAP14, gap99: GAP99 }
    };
  }
  const BENCH = benchmarks();
  const DEMO = { cavity: cavityAt({ ...state, ...FRESH, at: { ...STILL } }), off: cavityAt({ ...state, ...FRESH, dk: 35, at: { ...STILL } }), mod: classesAt(5, 1e6) };
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    g1: () => rel(null, GAMMA[0]),
    zside: () => `${rel(null, DEMO.cavity.zl)} / ${rel(null, DEMO.cavity.zr)}`,
    uOut: () => `${rel(null, BENCH.cayley.inside)} / ${rel(null, BENCH.cayley.outside)}`,
    drift: () => is(DEMO.off.drift),
    m3: () => rel(null, MERTENS[2].gap),
    m6: () => rel(null, MERTENS[5].gap),
    r13: () => String(ROTORS.length),
    u1: () => rel(null, UT[0]),
    u10: () => rel(null, UT[9]),
    u15: () => rel(null, UT[14]),
    u100: () => rel(null, UT[99]),
    gap14: () => rel(null, GAP14),
    l2: () => rel(null, BENCH.landau['2'].value),
    t2: () => rel(null, BENCH.landau['2'].target),
    l5: () => rel(null, BENCH.landau['5'].value),
    t5: () => rel(null, BENCH.landau['5'].target),
    l6: () => rel(null, BENCH.landau['6'].value),
    l32: () => rel(null, BENCH.landau['3/2'].value),
    l53: () => rel(null, BENCH.landau['5/3'].value),
    l1514: () => rel(null, BENCH.landau['15/14'].value),
    turns1514: () => rel(null, BENCH.landau['15/14'].turns, 2),
    shares5: () => DEMO.mod.shares.map((s) => rel(null, s.x)).join(' · ')
  };
  /** The text of the NUM box. */
  function numText(lang) {
    const B = BENCH,
      zh = lang === 'zh',
      T = (a, b) => (zh ? a : b),
      bad = (n) => T(`不符 ${n} 处`, `${n} failures`),
      list = (xs) => xs.join(T('、', ', ')),
      mirrorGap = hypot(B.mellin.xiOff[0] - B.mellin.xiMirror[0], B.mellin.xiOff[1] - B.mellin.xiMirror[1]);
    const ex = B.explicit.map((e) => T(`X = ${e.X}：两边相差 ${tiny(e.gap)}，余项界 ${rel(null, e.bound)}`, `X = ${e.X}: the sides differ by ${tiny(e.gap)}, bound of the rest ${rel(null, e.bound)}`));
    const gates = B.ledgers.filter((g) => g.ok).length;
    const rot = B.rotation.map((r) => `N = ${r.N} ${tiny(r.mod)}`);
    return T(
      `打开页面时由脚本现算，是上面各条定理的个别实例，不检验定理的前提。梅林重构：数值积分得 M(2) ${rel(null, B.mellin.M2, 6)}，π/6 − 1/2 ${rel(null, B.mellin.exact, 6)}；ξ(1/2 + 14i) ${tiny(B.mellin.xi14[0])}，ξ(1/2 + iγ₁) ${tiny(B.mellin.xiG1[0])}（积分误差的量级），反事实 ξ(17/20 + iγ₁) ${rel(null, B.mellin.xiOff[0], 6)} + ${rel(null, B.mellin.xiOff[1], 6).replace(/^[≈=]\u00a0/, '')}i，与 ξ(3/20 − iγ₁) 相差 ${tiny(mirrorGap)}（ξ(1 − s) = ξ(s)）。凯莱：在前 100 个零点上按双精度算，||u| − 1| ${below(B.cayley.on)}；δ = 7/20 时 |u| ${rel(null, B.cayley.inside)} 与 ${rel(null, B.cayley.outside)}。托普利茨的前提：1/2 ± δ ± iγ₁ 的四个凯莱像在 z ↦ 1/z̄ 下封闭：每个像的 1/z̄ 到最近一个像的距离 ${below(B.closure)}；页面不计算托普利茨矩阵。积分显式公式（取前 100 对零点，其余各项的模之和不超过 c e<sup>y/2</sup>，c = 2 + γ<sub>E</sub> − ln 4π − Σ<sub>n≤100</sub> 2/(1/4 + γ<sub>n</sub>²) ${rel(null, B.rest, 6)}）：${list(ex)}。素因子分解：1 … 60 的 ${B.monoid.tried} 对乘积上指数相加${bad(B.monoid.bad)}。账本：${B.ledgers.length} 条指令中 ${gates} 条由十二个寄存器上的带符号指数还原为原分数。对数无关：|a|、|b|、|c| ≤ 6 的非零整数组中 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1 的有 ${B.independence.hits} 组，|a ln 2 + b ln 3 + c ln 5| 最小 ${rel(null, B.independence.least)}，在 (${B.independence.at.map((x) => String(x).replace('-', '−')).join(', ')})。逃逸：2 · 3 · … · 37 + 1 = ${B.escape.n} 模每个寄存器余 1${B.escape.residuesOne ? '' : '（不符）'}，最小的素因子 ${B.escape.factor} 不在十二个寄存器里。旋子：p = 13 的 ${B.rotors.count} = 8 × 14 个整数四元数，κ = 1 − |q − 1|²/4 ${bad(B.rotors.chordBad)}，平均玻恩概率 rayKernel(1, q) = (w² + x²)/13 的均值 ${is(B.rotors.born)}；p ≤ 199 的 ${B.haar.primes} 个素数上 r₄(p) = 8(p + 1) ${bad(B.haar.jacobiBad)}，${B.haar.total} 个读数的分布函数与哈尔分布函数最大相差 ${rel(null, B.haar.ks)}。堆：q = (1 + 2i + 2j + 2k)/√13 的前 13 项与 T<sub>n</sub>(1/√13) 最大相差 ${tiny(B.heapGap)}。舒尔：SU(2) 特征标 sin(mφ)/sin φ（m、n ≤ 4）对 (2/π) sin²φ dφ 的内积与单位矩阵最大相差 ${tiny(B.schur.gap)}；哈尔密度的质量 ${rel(null, B.schur.mass, 6)}、均值 ${rel(null, B.schur.mean, 6)}、方差 ${rel(null, B.schur.variance, 6)}。帕塞瓦尔：模 5、X = 10⁶ 时 Σ|f|² = ${B.parseval.lhs}，(1/5)Σ|dft f|² ${rel(null, B.parseval.rhs, 2)}。无理转动 α = log₂ 3 上 e<sup>2πix</sup> 的平均：${list(rot)}。环面：寄存器 2、3、5 的指针在 t = 1, 2, … 处的轨道在 t = ${B.torus.at} 时走遍 8³ 个格子中的 ${B.torus.met} 个；|k| ≤ 6 的非零 k 中 k·(ln 2, ln 3, ln 5) 到 2πℤ 的最小距离 ${rel(null, B.torus.ringGap)}。零点：Z 在前 100 个零点两侧 ±1/20 处变号 ${B.zeros.flips} 次；|Z(γ<sub>n</sub>)| 最大 ${tiny(B.zeros.zMax)}，是黎曼—西格尔公式的余项量级。数值演示，不是证明。`,
      `Computed by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Mellin reconstruction: quadrature gives M(2) ${rel(null, B.mellin.M2, 6)}, π/6 − 1/2 ${rel(null, B.mellin.exact, 6)}; ξ(1/2 + 14i) ${tiny(B.mellin.xi14[0])}, ξ(1/2 + iγ₁) ${tiny(B.mellin.xiG1[0])} (the size of the quadrature error), the counterfactual ξ(17/20 + iγ₁) ${rel(null, B.mellin.xiOff[0], 6)} + ${rel(null, B.mellin.xiOff[1], 6).replace(/^[≈=]\u00a0/, '')}i, off ξ(3/20 − iγ₁) by ${tiny(mirrorGap)} (ξ(1 − s) = ξ(s)). Cayley: computed in doubles at each of the first 100 zeros, ||u| − 1| ${below(B.cayley.on)}; at δ = 7/20, |u| ${rel(null, B.cayley.inside)} and ${rel(null, B.cayley.outside)}. The premise of the Toeplitz criterion: the four Cayley images of 1/2 ± δ ± iγ₁ are closed under z ↦ 1/z̄, the distance of each 1/z̄ to the nearest image ${below(B.closure)}; the page does not compute the Toeplitz matrix. Integrated explicit formula (with the first 100 pairs of zeros; the other terms have moduli adding to at most c e<sup>y/2</sup>, c = 2 + γ<sub>E</sub> − ln 4π − Σ<sub>n≤100</sub> 2/(1/4 + γ<sub>n</sub>²) ${rel(null, B.rest, 6)}): ${list(ex)}. Factorization: exponents add on the ${B.monoid.tried} products of 1 … 60, ${bad(B.monoid.bad)}. Ledgers: ${gates} of the ${B.ledgers.length} gates come back from their signed exponents on the twelve registers. Independence of logarithms: among the nonzero integer triples with |a|, |b|, |c| ≤ 6, ${B.independence.hits} have 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1, and the least |a ln 2 + b ln 3 + c ln 5| is ${rel(null, B.independence.least)} at (${B.independence.at.map((x) => String(x).replace('-', '−')).join(', ')}). Escape: 2 · 3 · … · 37 + 1 = ${B.escape.n} leaves 1 modulo every register${B.escape.residuesOne ? '' : ' (failed)'}, and its least prime factor ${B.escape.factor} is none of the twelve. Rotors: the ${B.rotors.count} = 8 × 14 integer quaternions of norm 13, κ = 1 − |q − 1|²/4, ${bad(B.rotors.chordBad)}; the mean Born probability rayKernel(1, q) = (w² + x²)/13 ${is(B.rotors.born)}; on the ${B.haar.primes} primes up to 199, r₄(p) = 8(p + 1), ${bad(B.haar.jacobiBad)}, and the distribution function of the ${B.haar.total} readings is at most ${rel(null, B.haar.ks)} from that of Haar. Heap: the first 13 terms through q = (1 + 2i + 2j + 2k)/√13 differ from T<sub>n</sub>(1/√13) by at most ${tiny(B.heapGap)}. Schur: the inner products of the SU(2) characters sin(mφ)/sin φ (m, n ≤ 4) against (2/π) sin²φ dφ differ from the identity by at most ${tiny(B.schur.gap)}; the Haar density has mass ${rel(null, B.schur.mass, 6)}, mean ${rel(null, B.schur.mean, 6)} and variance ${rel(null, B.schur.variance, 6)}. Parseval: modulo 5 at X = 10⁶, Σ|f|² = ${B.parseval.lhs} and (1/5)Σ|dft f|² ${rel(null, B.parseval.rhs, 2)}. Averages of e<sup>2πix</sup> along the irrational rotation α = log₂ 3: ${list(rot)}. Torus: the orbit of the hands of the registers 2, 3, 5 at t = 1, 2, … meets ${B.torus.met} of the 8³ cells by t = ${B.torus.at}; over nonzero k with |k| ≤ 6 the least distance of k·(ln 2, ln 3, ln 5) to 2πℤ is ${rel(null, B.torus.ringGap)}. Zeros: Z changes sign at ±1/20 across ${B.zeros.flips} of the first 100 zeros; |Z(γ<sub>n</sub>)| is at most ${tiny(B.zeros.zMax)}, the size of the remainder of the Riemann–Siegel formula. A numerical illustration, not a proof.`
    );
  }
  for (const lang of ['zh', 'en']) document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(lang);
  for (const el of document.querySelectorAll('[data-bench]')) el.innerHTML = NUMBERS[el.dataset.bench]();
  // the drawer repeats every evidence box of the panel, filled
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);
  // the first frames may be set in a fallback font: measure the title afresh once the fonts are in
  if (document.fonts)
    document.fonts.ready.then(() => {
      title.key = '';
      paint();
    });

  /* ---------- probe, cover, start ---------- */
  /** Big integers as strings, so that the probe survives JSON. */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.PRIME_ZERO_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        ...m,
        at: state.at,
        scene: state.scene,
        n: state.n,
        dk: state.dk,
        gate: state.gate,
        mod: state.mod,
        lens: state.lens,
        cam: state.cam,
        layers: layers(),
        clock: clock.t,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam }
      });
    },
    /** The mathematics at a state, without touching the page. */
    calc: (over = {}) => plain(compute({ ...state, ...FRESH, ...over, at: { ...STILL, ...(over.at || {}) } })),
    presets: plain(PRESETS),
    rails: plain(RAILS),
    data: () => plain({ gamma: GAMMA, primes12: PR12, gates: GATES, mods: MODS, rotors: ROTORS, poisson: POISSON, window: WIN }),
    /** The analytic core, for tests. */
    core: {
      theta,
      turn: turnU,
      z: hardyZ,
      cayley: cayleyAbs,
      pi: piOf,
      mertens: mertensOf,
      landau: (id, K) => landauK(GATE[id], K),
      classes: (q, X) => plain(classesAt(q, X)),
      li,
      variance: () => plain({ L: VAR_L, zeros: VARIANCE })
    },
    /** What the NUM box and the drawer are written from. */
    bench: () => plain(BENCH),
    /** The formatter of the page, for tests. */
    print: { rel: (x, d) => rel(null, x, d), sci },
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
