/* OMEGA//ADELIC · 实数误差放大轴与素数阿代尔归元 · The real error-magnification axis and prime adelic closure (Chapter 39, §39.8)
   World (kit.solid): z up. Five scenes, one per card; the first two share one sphere.
     tangent    the unit sphere of the great slice span{1, i, j} of 𝕋₃ ≅ S³(1) rests on the plane z = 0 at o (κ = 1); the
                antipode ō (κ = 0) is its top. The state P at the arc θ has s = 1 − κ = sin²(θ/2). The line from ō through P
                meets the plane at 2x world units, x = tan(θ/2) = √(s/(1 − s)): the ticks of the real axis are read in
                units of the diameter 2. The projection magnifies lengths at P by A_err = 2 dx/dθ = 1 + x² = 1/κ.
     rodrigues  flat against curved composition. Coaxial turns add on the meridian: 2θ against 2 arctan 2x. Two turns about
                orthogonal axes e₁ = −y, e₂ = x, e₃ = e₁ × e₂ = z: the rotors (1 + x₁)(1 + x₂) give the Gibbs vector
                (x₁ + x₂ + x₁ × x₂)/(1 − x₁·x₂) against the flat x₁ + x₂ (drawn on a second ball). n equal steps stay on the
                circle (Chebyshev), n·x runs out along the line.
     adelic     a disc with a logarithmic radius ρ(r) = 1 + 0.62 ln r around the unit ball: the magenta arrow ends at
                ρ(N); the ring of the prime p lies at ρ(p); each prime factor takes one cyan hop of length 0.62 ln p back
                in, and the last hop ends on the ball, |N|_∞ ∏_p |N|_p = 1. The bead of ring p stands at the angle
                2π (N mod p)/p from the arrow: on the arrow exactly when p divides N.
     rivets     the truncated icosahedron (V, E, F) = (60, 90, 32) with its 12 pentagons, inside three mutually orthogonal
                rings that carry the phases τ ln 2, τ ln 3, τ ln 5.
     ergodic    the torus of the phases (τ ln 2, τ ln 3), with the phase τ ln 5 on a dial in its hole, against the closed
                orbit (τ, 2τ, 3τ).
   The rail drives one quantity per scene: s on the grid of 1/10000, N on the integers, τ on the grid of 1/100. Every number
   is computed here (the NUM box and the numbers of the drawer once, when the page opens: benchmarks()); the instances of the
   cited Lean theorems are in instances(). Read-only probe: window.REAL_PRIME_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180;
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
  const wrap = (a) => ((a % TAU) + TAU) % TAU;
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));
  const S_MAX = 0.99,
    N_MAX = 30,
    TAU4 = 12,
    TAU5 = 377, // sixty turns and a little more
    GRID = 10000, // s = S/GRID with a whole number S
    TICK = 100; // τ is a whole number of hundredths
  // the stills of the five cards on their own rails: s, s, N − 1, τ, τ
  const STILL1 = 0.8,
    STILL2 = 0.5,
    STILL3 = 4,
    STILL4 = 7.5, // the phase of p = 2 faces the reader
    STILL5 = 315; // just after 50 turns: both moving points face the reader

  /* ---------- the relation before a printed number: one rule for the whole page ----------
     “=” stands before an exact name and before digits that are the value itself; digits that round the value stand after “≈”.
     s, N and τ stand on their grids, so the relation is decided on fractions [p, q] of whole numbers, never on rounded doubles:
       ratRel   a rational value, by its fraction
       rootRel  the root of a rational value, by the square of the digits
       angRel   an angle of which the cosine (or that of its double) is a rational c: a rational number of degrees only for
                c = 0, ±1/2, ±1 (Niven)
       nearRel  a value that no short decimal is: ln N for N > 1 and the phases τ ln p for a rational τ > 0 are no rational
                number (of turns), by Lindemann and Gelfond; a cut series, an average of characters
     Digits that would all be 0 of a value that is not 0 are written in significant digits. */
  const fr = (p, q = 1) => [BigInt(p), BigInt(q)];
  const sameQ = ([a, b], [c, d]) => a * d === c * b;
  const SUPER = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (d) => SUPER[d]);
  /** The decimal a printed text names (0.0205, −6.429×10⁻⁸), as a fraction. */
  function decimalOf(text) {
    const [m, e = '⁰'] = text.replace('−', '-').split('×10'),
      [whole, part = ''] = m.split('.'),
      k = Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUPER.indexOf(d))) - part.length;
    return k < 0 ? [BigInt(whole + part), 10n ** BigInt(-k)] : [BigInt(whole + part) * 10n ** BigInt(k), 1n];
  }
  /** Four significant digits: decimals for the sizes 10⁻³ … 10³, a power of ten for the others. */
  function sci(x) {
    const size = Math.floor(Math.log10(Math.abs(x)));
    if (Math.abs(size) <= 3) return fmt(x, Math.max(4, 3 - size));
    const [m, e] = x.toExponential(3).split('e');
    return kit.fix(Number(m), 3) + '×10' + superscript(Number(e));
  }
  const digits = (x, d) => {
    const t = fmt(x, d);
    return Number.isFinite(x) && x !== 0 && decimalOf(t)[0] === 0n ? sci(x) : t;
  };
  const rel = (exact, text) => `${exact ? '=' : '≈'} ${text}`;
  const ratRel = (q, x, d = 4) => {
    const t = digits(x, d);
    return rel(sameQ(q, decimalOf(t)), t);
  };
  const rootRel = (q, x, d = 4) => {
    const t = digits(x, d),
      [n, m] = decimalOf(t);
    return rel(sameQ(q, [n * n, m * m]), t);
  };
  const NIVEN = [fr(0), fr(1), fr(-1), fr(1, 2), fr(-1, 2)];
  const angRel = (c, x, d = 2) => rel(NIVEN.some((v) => sameQ(c, v)), digits(x, d)) + '°';
  const nearRel = (x, d = 4) => rel(false, digits(x, d));
  /** After “·” or “×” an exact value stands alone; a rounded one keeps its “≈”. */
  const alone = (r) => (r.startsWith('= ') ? r.slice(2) : r);
  /** The least power of ten above a drift x ≥ 0 (compared as fractions), after its sign; “= 0” of 0 alone. */
  function below(x) {
    if (x === 0) return '= 0';
    let p = x,
      q = 1n;
    for (; !Number.isInteger(p); q *= 2n) p *= 2;
    const under = (e) => (e < 0 ? BigInt(p) * 10n ** BigInt(-e) < q : BigInt(p) < q * 10n ** BigInt(e));
    let e = Math.ceil(Math.log10(x));
    while (!under(e)) e++;
    while (under(e - 1)) e--;
    return `&lt; 10${superscript(e)}`;
  }
  /** A fraction p/q of whole numbers in lowest terms, as text. */
  function quotient(p, q) {
    let [a, b] = [Math.abs(p), q];
    while (b) [a, b] = [b, a % b];
    return `${p < 0 ? '−' : ''}${Math.abs(p) / a}${q === a ? '' : '/' + q / a}`;
  }
  // `say` picks the language of a text: L follows the page, ZH and EN write one of the two
  const ZH = (zh) => zh,
    EN = (zh, en) => en;

  /* ---------- quaternions [w, x, y, z] ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = (a) => [a[0], -a[1], -a[2], -a[3]];
  const pure = (v) => [0, v[0], v[1], v[2]];

  /* ---------- the tangent projection: from s = 1 − κ to the arc θ, the tangent coordinate x and the magnification ---------- */
  function tangentOf(value) {
    const S = Math.round(value * GRID),
      R = GRID - S, // s = S/GRID and κ = R/GRID exactly
      theta = 2 * Math.atan2(Math.sqrt(S), Math.sqrt(R)),
      x = Math.sqrt(S / R);
    return { S, R, s: S / GRID, kappa: R / GRID, theta, thetaDeg: theta / deg, x, err: GRID / R, errX: 1 + x * x, chord: 2 * Math.sqrt(S / GRID), gapDeg: 180 - theta / deg };
  }

  /* ---------- composition: flat sum against Gibbs–Rodrigues, n-fold steps against Chebyshev ---------- */
  const E1 = [0, -1, 0],
    E2 = [1, 0, 0],
    E3 = cross(E1, E2);
  const CHEB_N = 8;
  const CHIP_S = [...document.querySelectorAll('#sChips [data-s]')].map((b) => Number(b.dataset.s)); // the values of the chips
  function rodriguesOf(s) {
    const t = tangentOf(s),
      x = t.x;
    // two equal turns about one axis: x₁ = x₂ = x û
    const denom = (t.R - t.S) / t.R,
      antipode = t.R === t.S;
    const exactDeg = 2 * t.thetaDeg,
      flatDeg = (2 * Math.atan(2 * x)) / deg,
      // tan(θ − arctan 2x) = 2x³/(1 + 3x²): the gap without the difference of two near angles
      gapDeg = (2 * Math.atan((2 * x ** 3) / (1 + 3 * x * x))) / deg;
    const coax = { denom, antipode, over: t.S > t.R, gibbs: antipode ? Infinity : (2 * x) / denom, flat: 2 * x, exactDeg, flatDeg, gapDeg };
    // two equal turns about e₁ and e₂: the rotors 1 + x₁ and 1 + x₂ are multiplied
    const x1 = scale(E1, x),
      x2 = scale(E2, x),
      q = qmul([1, ...x1], [1, ...x2]);
    const exact = scale(q.slice(1), 1 / q[0]),
      formula = scale(add(add(x1, x2), cross(x1, x2)), 1 / (1 - dot(x1, x2))),
      flat = add(x1, x2);
    const angleOf = (v) => (2 * Math.atan(norm(v))) / deg;
    const axisDeg = x > 0 ? Math.atan2(norm(cross(exact, flat)), dot(exact, flat)) / deg : 0;
    const orth = {
      exact,
      flat,
      lift: cross(x1, x2),
      formulaGap: norm(sub(exact, formula)),
      exactDeg: angleOf(exact),
      flatDeg: angleOf(flat),
      axisDeg,
      // (1 − x₁·x₂)² + ‖x₁ + x₂ + x₁ × x₂‖² = (1 + ‖x₁‖²)(1 + ‖x₂‖²)
      normGap: Math.abs(q[0] * q[0] + dot(q.slice(1), q.slice(1)) - (1 + dot(x1, x1)) * (1 + dot(x2, x2)))
    };
    // the heap x_{n+2} = x_{n+1} x̄ₙ x_{n+1} from x₀ = 1 and x₁ = cos θ + sin θ i, by products only
    const heap = [
      [1, 0, 0, 0],
      [cs(t.theta), sn(t.theta), 0, 0]
    ];
    while (heap.length <= CHEB_N) {
      const [a, b] = heap.slice(-2);
      heap.push(qmul(qmul(b, qconj(a)), b));
    }
    // Chebyshev values by their recurrences at c = ⟨x₀, x₁⟩: T₀ = 1, T₁ = c; U₋₁ = 0, U₀ = 1
    const c = heap[0].reduce((acc, v, i) => acc + v * heap[1][i], 0);
    const Tn = [1, c],
      Un = [0, 1];
    for (let n = 2; n <= CHEB_N; n++) Tn.push(2 * c * Tn[n - 1] - Tn[n - 2]);
    for (let n = 1; n <= CHEB_N; n++) Un.push(2 * c * Un[n] - Un[n - 1]);
    const chebGap = Math.max(...heap.map((h, n) => Math.abs(h[0] - Tn[n])));
    const closedGap = Math.max(...heap.slice(1).map((h, n) => norm(sub(h, sub(scale(heap[1], Un[n + 1]), scale(heap[0], Un[n]))))));
    const normGap = Math.max(...heap.map((h) => Math.abs(dot(h, h) - 1)));
    const steps = heap.map((h, n) => ({ n, thetaDeg: n * t.thetaDeg, cos: h[0], T: Tn[n], flat: n * x }));
    return { ...t, coax, orth, cheb: { c, steps, chebGap, closedGap, normGap } };
  }

  /* ---------- the adelic ledger of N ---------- */
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const valuation = (n, p) => {
    let k = 0;
    while (n % p === 0) {
      n /= p;
      k++;
    }
    return k;
  };
  function smallestFactor(n) {
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return d;
    return n;
  }
  function adelicOf(N) {
    const rows = PRIMES.map((p) => {
      const v = valuation(N, p);
      return { p, v, den: p ** v, abs: 1 / p ** v, residue: N % p, born: p <= N, active: v > 0 };
    });
    const active = rows.filter((r) => r.active),
      born = rows.filter((r) => r.born);
    // the product in integers: N divided by p^v for every p leaves exactly 1
    const product = active.reduce((acc, r) => acc / r.den, N);
    const logSum = active.reduce((acc, r) => acc - r.v * Math.log(r.p), Math.log(N));
    const isPrime = active.length === 1 && active[0].p === N;
    const blind = born.filter((r) => !r.active).map((r) => r.p);
    // prime factors with multiplicity, largest first: the hops back from ρ(N) to the unit ball
    const hops = [];
    let m = N;
    for (const r of [...active].reverse())
      for (let k = 0; k < r.v; k++) {
        hops.push({ p: r.p, from: m, to: m / r.p });
        m /= r.p;
      }
    // echoes: the powers p^k ≤ 30 of the active primes, and N itself when it is composite
    const echoes = [...new Set([...active.flatMap((r) => sample(4, (u) => r.p ** (2 + Math.round(4 * u))).filter((q) => q <= N_MAX)), ...(N > 1 && !isPrime ? [N] : [])])].sort((a, b) => a - b);
    // the primes below N and one more: their product plus one has a prime divisor outside the list
    const S = PRIMES.filter((p) => p < N),
      euclid = S.reduce((a, b) => a * b, 1) + 1,
      escape = smallestFactor(euclid);
    return { N, rows, active, born, blind, product, logSum, isPrime, hops, end: m, echoes, euclid: { S, value: euclid, residues: S.map((p) => euclid % p), q: escape } };
  }

  const LEDGERS = Array.from({ length: N_MAX }, (_, i) => adelicOf(i + 1));

  /* ---------- the cage: the truncated icosahedron, its faces and the rank of its face boundary over 𝔽₂ ---------- */
  const CAGE = (() => {
    const g = (1 + Math.sqrt(5)) / 2,
      ico = [];
    for (const a of [-1, 1]) for (const b of [-g, g]) ico.push([0, a, b], [a, b, 0], [b, 0, a]);
    const near = (i, j) => Math.abs(norm(sub(ico[i], ico[j])) - 2) < 1e-9;
    const verts = [],
      at = new Map();
    for (let i = 0; i < 12; i++)
      for (let j = 0; j < 12; j++)
        if (i !== j && near(i, j)) {
          at.set(i + '>' + j, verts.length);
          verts.push(unit(add(scale(ico[i], 2 / 3), scale(ico[j], 1 / 3))));
        }
    const faces = [],
      order = (list, n) => {
        const u = unit(cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
          w = cross(n, u);
        return [...list].sort((a, b) => Math.atan2(dot(verts[a], w), dot(verts[a], u)) - Math.atan2(dot(verts[b], w), dot(verts[b], u)));
      };
    for (let i = 0; i < 12; i++) faces.push(order([...at].filter(([k]) => k.startsWith(i + '>')).map(([, v]) => v), unit(ico[i])));
    for (let i = 0; i < 12; i++)
      for (let j = i + 1; j < 12; j++)
        for (let k = j + 1; k < 12; k++)
          if (near(i, j) && near(j, k) && near(i, k)) {
            const ids = [];
            for (const [a, b] of [[i, j], [j, i], [j, k], [k, j], [i, k], [k, i]]) ids.push(at.get(a + '>' + b));
            faces.push(order(ids, unit(add(add(ico[i], ico[j]), ico[k]))));
          }
    const edges = new Map();
    faces.forEach((f, fi) =>
      f.forEach((a, t) => {
        const b = f[(t + 1) % f.length],
          k = Math.min(a, b) + '-' + Math.max(a, b);
        if (!edges.has(k)) edges.set(k, []);
        edges.get(k).push(fi);
      })
    );
    const degree = verts.map((_, v) => [...edges.keys()].filter((k) => k.split('-').map(Number).includes(v)).length);
    // the boundary of a face labelling on an edge is the sum of the two labels: one row of bits per edge
    const rows = [...edges.values()].map((fs) => fs.reduce((bits, f) => bits ^ (1n << BigInt(f)), 0n));
    let rank = 0;
    const work = [...rows];
    for (let f = 0; f < faces.length; f++) {
      const bit = 1n << BigInt(f),
        pivot = work.findIndex((r, i) => i >= rank && (r & bit) !== 0n);
      if (pivot < 0) continue;
      [work[rank], work[pivot]] = [work[pivot], work[rank]];
      for (let i = 0; i < work.length; i++) if (i !== rank && (work[i] & bit) !== 0n) work[i] ^= work[rank];
      rank++;
    }
    const V = verts.length,
      E = edges.size,
      F = faces.length,
      F5 = faces.filter((f) => f.length === 5).length,
      F6 = faces.filter((f) => f.length === 6).length;
    return { verts, faces, V, E, F, F5, F6, euler: V - E + F, trivalent: degree.every((d) => d === 3), twoSided: [...edges.values()].every((fs) => fs.length === 2), rank, kernel: F - rank, cycles: E - V + 1, count: (6 - 5) * F5 + (6 - 6) * F6 };
  })();

  /* ---------- the phases: logarithms of primes against a rational rhythm ---------- */
  const LOGS = [2, 3, 5].map(Math.log),
    RATIO = [1, 2, 3],
    CELLS = 8;
  const phases = (w, t) => w.map((x) => wrap(x * t));
  const cellOf = (w, t) => w.reduce((acc, x) => acc * CELLS + (Math.floor((wrap(x * t) / TAU) * CELLS) % CELLS), 0);
  /** The times at which the orbit of the frequencies w first enters each cell of the CELLS³ grid of the three phases.
      The orbit changes its cell only where a phase crosses a multiple of 2π/CELLS; between two crossings the cell is
      the one of the midpoint, so the list is exact. */
  function firstVisits(w, tMax) {
    const times = [0];
    for (const x of w) for (let k = 1; (k * TAU) / (CELLS * x) <= tMax; k++) times.push((k * TAU) / (CELLS * x));
    times.sort((p, q) => p - q);
    const seen = new Set(),
      out = [];
    times.forEach((t, i) => {
      const next = i + 1 < times.length ? times[i + 1] : tMax;
      if (next - t < 1e-9) return; // crossings at one time: no cell in between
      const c = cellOf(w, (t + next) / 2);
      if (!seen.has(c)) {
        seen.add(c);
        out.push(t);
      }
    });
    return out;
  }
  const VISITS = { log: firstVisits(LOGS, TAU5), ratio: firstVisits(RATIO, TAU * 1.5) };
  const countUpTo = (list, t) => {
    let lo = 0,
      hi = list.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (list[mid] <= t + 1e-12) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  function orbitOf(t) {
    const total = CELLS ** 3;
    return {
      tau: t,
      log: phases(LOGS, t),
      ratio: phases(RATIO, t),
      laps: Math.floor(t / TAU + 1e-9),
      total,
      logCells: countUpTo(VISITS.log, t),
      ratioCells: countUpTo(VISITS.ratio, t),
      logShare: countUpTo(VISITS.log, t) / total,
      ratioShare: countUpTo(VISITS.ratio, t) / total
    };
  }

  /* ---------- instances of the cited Lean theorems that do not depend on the state ---------- */
  const HORIZON = 6, // levels of the refined readings
    CUT = 1000, // terms of the series and primes of the product
    RANGE = 12, // entries of the integer vectors
    AVG_N = 1000, // powers in the averages of the characters
    LAPS = 50; // turns after which the cells are counted
  const FIXED = (() => {
    // refinementDistance_ultrametric: readouts x mod p^(level + 1), horizon 6, states 1 … 30
    let triples = 0,
      violations = 0;
    for (const p of [2, 3, 5]) {
      const depth = (x, y) => (x === y ? HORIZON : Math.min(HORIZON, valuation(Math.abs(x - y), p))),
        d = (x, y) => HORIZON - depth(x, y);
      for (let x = 1; x <= N_MAX; x++)
        for (let y = 1; y <= N_MAX; y++)
          for (let z = 1; z <= N_MAX; z++) {
            triples++;
            if (d(x, z) > Math.max(d(x, y), d(y, z))) violations++;
          }
    }
    // observation_distance_eq_padic_valuation: the first precision k with N mod p^k ≠ 0, distance p^(1 − k): the exponents
    // 1 − k and −v_p(N) are compared as whole numbers
    let observed = 0;
    for (let N = 1; N <= N_MAX; N++)
      for (const p of PRIMES) {
        let k = 0;
        while (N % p ** k === 0) k++;
        if (1 - k === -valuation(N, p)) observed++;
      }
    // rational_absolute_value_classification: the eleven absolute values drawn are pairwise inequivalent
    let separated = 0,
      pairs = 0;
    for (let i = 0; i < PRIMES.length; i++) {
      pairs++; // p against ∞: |p|_p < 1 < |p|_∞
      if (1 / PRIMES[i] < 1 && PRIMES[i] > 1) separated++;
      for (let j = i + 1; j < PRIMES.length; j++) {
        pairs++; // p against q: |p|_p < 1 = |p|_q
        if (valuation(PRIMES[i], PRIMES[i]) === 1 && valuation(PRIMES[i], PRIMES[j]) === 0) separated++;
      }
    }
    // rational_padic_product_formula on every fraction a/b with a, b = 1 … 30, in whole numbers: a ∏ p^v_p(b) = b ∏ p^v_p(a);
    // in doubles the product only comes near 1
    let fractions = 0,
      balanced = 0,
      productGap = 0;
    for (let a = 1; a <= N_MAX; a++)
      for (let b = 1; b <= N_MAX; b++) {
        fractions++;
        const part = (n) => PRIMES.reduce((acc, p) => acc * p ** valuation(n, p), 1);
        if (a * part(b) === b * part(a)) balanced++;
        const value = PRIMES.reduce((acc, p) => acc * p ** (valuation(b, p) - valuation(a, p)), a / b);
        productGap = Math.max(productGap, Math.abs(value - 1));
      }
    // riemann_zeta_dirichlet_sum_eq_euler_product at s = 2, cut at 1000
    let sum = 0,
      prod = 1;
    const composite = new Uint8Array(CUT + 1);
    for (let n = 1; n <= CUT; n++) sum += 1 / (n * n);
    for (let p = 2; p <= CUT; p++)
      if (!composite[p]) {
        prod /= 1 - 1 / (p * p);
        for (let q = p * p; q <= CUT; q += p) composite[q] = 1;
      }
    // prime_log_rational_independence: the integer combinations a ln 2 + b ln 3 + c ln 5 with |a|, |b|, |c| ≤ 12; a zero
    // would be an equation of integers between products of powers, so it is tested in integers
    const R = RANGE;
    let vectors = 0,
      zeros = 0,
      least = Infinity,
      witness = null,
      closest = Infinity;
    const big = [2n, 3n, 5n];
    for (let a = -R; a <= R; a++)
      for (let b = -R; b <= R; b++)
        for (let c = -R; c <= R; c++) {
          if (!a && !b && !c) continue;
          vectors++;
          const k = [a, b, c];
          let num = 1n,
            den = 1n;
          k.forEach((e, i) => {
            if (e > 0) num *= big[i] ** BigInt(e);
            else if (e < 0) den *= big[i] ** BigInt(-e);
          });
          if (num === den) zeros++;
          const v = a * LOGS[0] + b * LOGS[1] + c * LOGS[2];
          if (Math.abs(v) < least) {
            least = Math.abs(v);
            witness = k;
          }
          closest = Math.min(closest, Math.abs(v - Math.round(v)));
        }
    // TorusOrbitClosure.result: the element g = (ζ, ζ², ζ³), ζ = e^(2πi/CELLS), of the rational loop keeps the relations
    // (2, −1, 0) and (3, 0, −1); the point (1, −1, 1) breaks the first, so it lies outside the closure of the powers of g.
    // The phases are whole numbers of CELLS-ths of a turn, so the characters are compared in whole numbers
    const gAngles = RATIO.map((x) => (x * TAU) / CELLS),
      point = [0, CELLS / 2, 0],
      chi = (k, ang) => k.reduce((acc, e, i) => acc + e * ang[i], 0),
      relations = [
        [2, -1, 0],
        [3, 0, -1]
      ];
    const closure = { relations, kept: relations.map((k) => chi(k, RATIO) % CELLS === 0), broken: Math.abs(chi(relations[0], point) % CELLS) * 2 === CELLS ? -1 : NaN };
    // TorusOrbitEquidistribution.result: averages of characters along the powers of g
    const average = (k, ang, n) => {
      let re = 0,
        im = 0;
      for (let i = 1; i <= n; i++) {
        re += cs(i * chi(k, ang));
        im += sn(i * chi(k, ang));
      }
      return hypot(re, im) / n;
    };
    const logAngles = LOGS.map((x) => TAU * x);
    const equi = {
      n: AVG_N,
      log: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, -1],
        [2, -1, 0]
      ].map((k) => average(k, logAngles, AVG_N)),
      rationalTrivial: average([2, -1, 0], gAngles, AVG_N),
      rationalFree: average([1, 0, 0], gAngles, AVG_N)
    };
    return {
      ultrametric: { horizon: HORIZON, triples, violations },
      observe: { pairs: N_MAX * PRIMES.length, equal: observed },
      ostrowski: { values: PRIMES.length + 1, pairs, separated },
      product: { fractions, balanced, gap: productGap },
      euler: { cut: CUT, sum, product: prod, limit: (PI * PI) / 6 },
      independence: { range: R, vectors, zeros, least, witness, closest },
      closure,
      equi,
      cage: { V: CAGE.V, E: CAGE.E, F: CAGE.F, F5: CAGE.F5, F6: CAGE.F6, euler: CAGE.euler, rank: CAGE.rank, kernel: CAGE.kernel, cycles: CAGE.cycles, trivalent: CAGE.trivalent, twoSided: CAGE.twoSided, count: CAGE.count },
      density: { x: N_MAX, count: PRIMES.length, linear: 1 / Math.log(N_MAX), log: N_MAX / Math.log(N_MAX) }
    };
  })();
  /** The instances at the current state: the model of the reading, Gibbs–Rodrigues, Chebyshev, Lagrange, the product. */
  function instances(m) {
    const t = m.tan,
      r = m.rod,
      o = [1, 0, 0, 0],
      Pq = [cs(t.theta), sn(t.theta), 0, 0];
    const dist = norm(sub(Pq, o)),
      kappaModel = (1 + dot(o, Pq)) / 2;
    const x1 = scale(E1, t.x),
      x2 = scale(E2, t.x),
      a = qmul(pure(x1), pure(x2)),
      b = qmul(pure(x2), pure(x1));
    const comm = scale(sub(a, b), 0.5);
    let lagRight = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) lagRight += (x1[i] * x2[j] - x1[j] * x2[i]) ** 2;
    return {
      model: { kappa: kappaModel, dist, gap: Math.abs(kappaModel - (1 - dist ** 2 / 4)), sGap: Math.abs(dist ** 2 / 4 - t.s) },
      cross: { scalar: comm[0], gap: norm(sub(comm.slice(1), cross(x1, x2))) },
      lagrange: { left: dot(x1, x1) * dot(x2, x2) - dot(x1, x2) ** 2, right: lagRight / 2 },
      cheb: { gap: r.cheb.chebGap, closedGap: r.cheb.closedGap, normGap: r.cheb.normGap },
      product: { N: m.ade.N, value: m.ade.product, logSum: m.ade.logSum },
      euclid: m.ade.euclid,
      fixed: FIXED
    };
  }

  /* ---------- the printed values of a frame, each after its relation ----------
     With y = x² = S/R (a fraction of whole numbers) every value below is rational, the root of a rational number, or an angle
     with a rational cosine. */
  const sText = (t, d = 4) => ratRel(fr(t.S, GRID), t.s, d),
    kappaText = (t) => ratRel(fr(t.R, GRID), t.kappa),
    errText = (t, d = 4) => ratRel(fr(GRID, t.R), t.err, d),
    xText = (t, d = 4) => rootRel(fr(t.S, t.R), t.x, d),
    doubleText = (t, d = 4) => rootRel(fr(4 * t.S, t.R), 2 * t.x, d),
    distText = (t, dist) => rootRel(fr(4 * t.S, GRID), dist),
    thetaText = (t) => angRel(fr(GRID - 2 * t.S, GRID), t.thetaDeg),
    leftText = (t) => angRel(fr(GRID - 2 * t.S, GRID), t.gapDeg),
    denomText = (r) => ratRel(fr(r.R - r.S, r.R), r.coax.denom),
    turnText = (r) => angRel(fr(2 * (GRID - 2 * r.S) ** 2 - GRID ** 2, GRID ** 2), r.coax.exactDeg),
    flatText = (r) => angRel(fr(GRID - 5 * r.S, GRID + 3 * r.S), r.coax.flatDeg),
    // cos(2θ − 2 arctan 2x) = (R(R + 3S)² − 4S³)/(R(R + 3S)² + 4S³), and cos of twice the angle between the two axes
    gapCos = ({ S, R }) => [R * (R + 3 * S) ** 2 - 4 * S ** 3, R * (R + 3 * S) ** 2 + 4 * S ** 3],
    axisCos = ({ S, R }) => [2 * R - S, 2 * R + S],
    gapText = (r) => angRel(fr(...gapCos(r)), r.coax.gapDeg),
    bothText = (r, d = 2) => angRel(fr(2 * r.R ** 2 - GRID ** 2, GRID ** 2), r.orth.exactDeg, d),
    bothFlatText = (r) => angRel(fr(r.R - 2 * r.S, r.R + 2 * r.S), r.orth.flatDeg),
    axisText = (r) => angRel(fr(...axisCos(r)), r.orth.axisDeg),
    fourthText = (t, value) => ratRel(fr(t.S ** 2, t.R ** 2), value), // x⁴, both sides of the Lagrange identity
    logText = (n, d = 4) => (n === 1 ? ratRel(fr(0), 0, d) : nearRel(Math.log(n), d)),
    shareText = (cells, total, d = 1) => ratRel(fr(100 * cells, total), (100 * cells) / total, d) + '%',
    phaseText = (tau, rad) => (tau === 0 ? ratRel(fr(0), 0, 1) : nearRel(wrap(rad) / deg, 1)) + '°',
    tauText = (tau) => ratRel(fr(Math.round(tau * TICK), TICK), tau, 2);
  const cellsText = (cells, total) => `${cells}/${total} ${shareText(cells, total)}`;
  /** N ∏ p^(−v_p(N)), divided out in whole numbers: an exact value. */
  const productText = (A) => ratRel(fr(A.product), A.product);

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ----------
     Only the frames and the ranges are given; every number of the texts is taken from what is run here. */
  const different = (list) => [...new Set(list)];
  function benchmarks() {
    const sweep = sample(99, (u) => Math.round(99 * u) / 100).map((v) => {
        const m = { tan: tangentOf(v), rod: rodriguesOf(v), ade: LEDGERS[0] };
        return { m, I: instances(m) };
      }),
      worst = (f) => Math.max(...sweep.map(f));
    const coax = rodriguesOf(STILL2),
      at = tangentOf(STILL1),
      ledger = LEDGERS[STILL3];
    return {
      err: CHIP_S.map(tangentOf),
      at,
      dist: instances({ tan: at, rod: rodriguesOf(STILL1), ade: ledger }).model.dist,
      sweep: sweep.length,
      drift: {
        model: worst(({ I }) => Math.max(I.model.gap, I.model.sGap)),
        heap: worst(({ I }) => Math.max(I.cheb.gap, I.cheb.closedGap, I.cheb.normGap)),
        scalar: worst(({ I }) => Math.abs(I.cross.scalar)),
        cross: worst(({ I }) => I.cross.gap),
        lagrange: worst(({ I }) => Math.abs(I.lagrange.left - I.lagrange.right)),
        compose: worst(({ m }) => m.rod.orth.formulaGap),
        logs: Math.max(...LEDGERS.map((A) => Math.abs(A.logSum)))
      },
      coax,
      lagrange: instances({ tan: tangentOf(STILL2), rod: coax, ade: ledger }).lagrange.left,
      ledgers: { count: LEDGERS.length, one: LEDGERS.filter((A) => A.product === 1).length, shown: [ledger, ...[6, 12].map((n) => LEDGERS[n - 1])] },
      euclid: { N: ledger.N, ...ledger.euclid },
      phases: orbitOf(STILL4),
      laps: orbitOf(TAU * LAPS),
      fixed: FIXED
    };
  }

  /* ---------- scenes, cameras, cards ---------- */
  const SCENES = ['tangent', 'rodrigues', 'adelic', 'rivets', 'ergodic'];
  const state = { scene: 'tangent', s: STILL1, N: STILL3 + 1, gear: STILL3 + 1, tau4: STILL4, tau5: STILL5, cam: 'panorama', lens: 0, from: null, blend: 1 };
  const CAMS = {
    tangent: { panorama: [-0.5, 0.26, 1], face: [-0.02, 0.05, 1], top: [-0.5, 0.9, 1] },
    rodrigues: { panorama: [-0.5, 0.3, 1], face: [-0.04, 0.08, 1], top: [-0.5, 0.9, 1] },
    adelic: { panorama: [-0.16, 0.62, 1], face: [-0.1, 0.24, 1], top: [-0.16, 1.3, 1] },
    rivets: { panorama: [-0.5, 0.34, 1], face: [0.1, 0.06, 1], top: [-0.5, 1.05, 1] },
    ergodic: { panorama: [-0.4, 0.78, 1], face: [-0.4, 0.34, 1], top: [-0.4, 1.4, 1] }
  };
  // each scene drives its own quantity with the rail; t is that quantity (N − 1 for the integers)
  const RAIL = {
    tangent: { key: 's', max: S_MAX, rate: 0.2, step: 0.01 },
    rodrigues: { key: 's', max: S_MAX, rate: 0.14, step: 0.01 },
    adelic: { key: 'N', max: N_MAX - 1, rate: 1.1, step: 1 },
    rivets: { key: 'tau4', max: TAU4, rate: 1.6, step: 0.1 },
    ergodic: { key: 'tau5', max: TAU5, rate: 50, step: 1 }
  };
  const railOf = (scene) => (RAIL[scene].key === 'N' ? state.N - 1 : state[RAIL[scene].key]);
  const presets = Object.fromEntries(
    [
      ['real-tangent-error-magnifier', 'tangent', STILL1],
      ['linear-add-mul-vs-curved-rodrigues', 'rodrigues', STILL2],
      ['adelic-prime-curvature-reclaim', 'adelic', STILL3],
      ['prime-orthogonal-torus-and-rivets', 'rivets', STILL4],
      ['incommensurable-ergodic-anti-deadlock', 'ergodic', STILL5]
    ].map(([id, scene, still]) => [id, { scene, cam: 'panorama', play: true, still }])
  );
  const DEFAULT = 'real-tangent-error-magnifier';
  /** The weight of each scene in the frame: one scene, or two while a card change blends them. */
  function weights() {
    const w = Object.fromEntries(SCENES.map((k) => [k, 0]));
    if (state.from && state.blend < 1) {
      w[state.from] = 1 - state.blend;
      w[state.scene] = state.blend;
    } else w[state.scene] = 1;
    return w;
  }
  const calc = () => ({ tan: tangentOf(state.s), rod: rodriguesOf(state.s), ade: adelicOf(state.N), orb4: orbitOf(state.tau4), orb5: orbitOf(state.tau5) });
  /** The state of the frame the notes follow: no magnification (s = 0), the identity (N = 1), a start (τ = 0), or live. */
  function regime() {
    const key = RAIL[state.scene].key;
    if (key === 'N') return state.N === 1 ? 'zero' : 'live';
    return state[key] === 0 ? 'zero' : 'live';
  }

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: CAMS[presets[DEFAULT].scene].panorama[0], pitch: CAMS[presets[DEFAULT].scene].panorama[1], radius: 0.2, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  const compact = () => stage.clientWidth < 480;

  /* the world of the first two scenes: the sphere on its tangent plane */
  const CA = [0, 0, 1],
    TOP = [0, 0, 2],
    HALF = 1.45;
  const merid = (th, r = 1) => [r * sn(th), 0, 1 - r * cs(th)];
  /** Stereographic image on the plane z = 0 of the point CA + n of the sphere (n a unit vector), from the top. */
  const project = (n) => [(2 * n[0]) / (1 - n[2]), (2 * n[1]) / (1 - n[2]), 0];
  // the plate runs to the right as far as the tangent point needs, up to x = 5; further points leave it at its edge
  const PLATE_MIN = 4.9,
    PLATE_CAP = 11.2;
  let frozen = null; // a drag keeps the transform of its first frame
  const plateTo = (far) => (frozen ? frozen.plate : clamp(far + 1.25, PLATE_MIN, PLATE_CAP));
  /* the second ball of the rodrigues scene: to the left on a wide stage, above on a compact one */
  const ballB = () => (compact() ? [2.7, 0.4, 3.4] : [-2.7, 0, 1.35]);

  const REACH = 2;
  /** The common scale of the vectors on the second ball: 1 until the curved sum is longer than REACH. */
  const scaleB = (m) => Math.min(1, REACH / Math.max(REACH, norm(m.rod.orth.exact)));
  /** The same in percent: 100·REACH/√(2y + y²), the root of 10⁴·REACH²·R²/(S(2R + S)). */
  const scaleText = ({ tan: { S, R }, rod }) => rootRel(fr(10000 * REACH ** 2 * R ** 2, S * (2 * R + S)), (100 * REACH) / norm(rod.orth.exact), 0) + '%';

  /* the disc of the adelic scene */
  const LOGC = 0.62,
    rho = (r) => 1 + LOGC * Math.log(r),
    RAY = -0.42,
    EDGE = rho(N_MAX) + 0.24;
  const polar = (r, az, z = 0) => [r * cs(RAY + az), r * sn(RAY + az), z];

  /* the torus of the ergodic scene */
  const TR = 1.3,
    Tr = 0.58,
    DIAL = 0.46;
  const torus = (a, b, r = Tr) => [(TR + r * cs(b)) * cs(a), (TR + r * cs(b)) * sn(a), r * sn(b)];
  const GIMBAL = [1.2, 1.32, 1.44];
  const FRAMES = [
    [[1, 0, 0], [0, 1, 0]],
    [[0, 1, 0], [0, 0, 1]],
    [[0, 0, 1], [1, 0, 0]]
  ];
  const gimbalAt = (k, ang) => add(scale(FRAMES[k][0], GIMBAL[k] * cs(ang)), scale(FRAMES[k][1], GIMBAL[k] * sn(ang)));

  /** World points a scene must keep in view. */
  function bounds(scene, m, B) {
    const round = (c, r) => sample(24, (u) => add(c, add(scale(B.R, r * cs(TAU * u)), scale(B.U, r * sn(TAU * u)))));
    if (scene === 'tangent' || scene === 'rodrigues') {
      const far = scene === 'tangent' ? 2 * m.tan.x : 4 * m.tan.x,
        x1 = plateTo(far);
      // the plate is a floor: its corners may leave the stage, its axis and the sphere may not
      const pts = [...round(CA, 1.03), [0, 0, 2.22], [-1.2, 0, 0], [x1 + 0.1, 0.35, 0], [x1 + 0.1, -0.35, 0], [0.4 * x1, -HALF, 0]];
      if (scene === 'rodrigues') {
        const b = ballB();
        pts.push(...round(b, 1.06), add(b, scale(m.rod.orth.exact, scaleB(m))));
      }
      return pts;
    }
    if (scene === 'adelic') return [...sample(36, (u) => polar(EDGE, TAU * u)), ...round([0, 0, 0], 1.03)];
    if (scene === 'rivets') return [...[0, 1, 2].flatMap((k) => sample(24, (u) => scale(gimbalAt(k, TAU * u), 1.1))), ...(state.lens === 1 ? sample(12, (u) => [2.05 * cs(TAU * u), 2.05 * sn(TAU * u), -1.3]) : [])];
    return sample(35, (u) => sample(11, (v) => torus(TAU * u, TAU * v, Tr + 0.08))).flat();
  }
  /** Fit the scene into the stage between the title and the legend: pixels per world unit and the offset of the origin. */
  function place(scene, m, B, box) {
    const pts = bounds(scene, m, B),
      xs = pts.map((p) => dot(p, B.R)),
      ys = pts.map((p) => dot(p, B.U));
    const x0 = Math.min(...xs),
      x1 = Math.max(...xs),
      y0 = Math.min(...ys),
      y1 = Math.max(...ys);
    const u = Math.max(6, Math.min((box.W - 2 * box.side) / (x1 - x0), box.room / (y1 - y0)));
    return { u, ox: box.W / 2 - (u * (x0 + x1)) / 2, oy: box.top + box.room / 2 + (u * (y0 + y1)) / 2 };
  }
  function fit(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    if (frozen) {
      Object.assign(opts, frozen.opts);
      return;
    }
    const frame = stage.getBoundingClientRect();
    const tl = $('hudTl'),
      bl = $('legend');
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden' && !TRV.thumbMode;
    const top = shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - frame.top + 8) : 18;
    const bottom = shown(bl) ? Math.max(12, frame.bottom - bl.getBoundingClientRect().top + 8) : 18;
    const box = { W, H, top, room: Math.max(40, H - top - bottom), side: W < 480 ? 12 : 22 };
    const B = basis(sc.cam.yaw, sc.cam.pitch);
    let at = place(state.scene, m, B, box);
    if (state.from && state.blend < 1) {
      const was = place(state.from, m, B, box);
      at = { u: lerp(was.u, at.u, state.blend), ox: lerp(was.ox, at.ox, state.blend), oy: lerp(was.oy, at.oy, state.blend) };
    }
    opts.radius = at.u / Math.min(W, H);
    opts.cx = at.ox / W;
    opts.cy = at.oy / H;
  }

  /* ---------- drawing ---------- */
  const TILT = unit([0.5, -0.32, 0.8]);
  // a keyed object keeps the shader it was first drawn with, so its faded form is an object of its own
  const faded = (key, alpha) => (alpha != null && alpha < 0.999 ? key + '~' : key);
  const tube = (key, pts, color, r, extra = {}) => sc.tube(faded(key, extra.alpha), pts, { color, r, glow: 0.3, occlude: false, pick: false, ...extra });
  /** A ball seen from outside with its inside visible: the far hemisphere as a lit inner wall, a glass shell, an outline. */
  function ball(key, c, r, D, a) {
    const e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(D, e1);
    const dir = (u, v) => {
      const th = (PI / 2) * u,
        ph = TAU * v;
      return add(scale(D, -cs(th)), add(scale(e1, sn(th) * cs(ph)), scale(e2, sn(th) * sn(ph))));
    };
    // the ramp runs from the stage colour to violet; only its darker part is used, so the marks inside stay legible
    sc.surface(faded(key + 'Wall', a), (u, v) => add(c, scale(dir(u, v), r * 0.985)), {
      u: [0, 1],
      v: [0, 1],
      nu: 18,
      nv: 64,
      colors: [P.stage, P.violet],
      range: [-1.25, 2.6],
      value: (u, v) => dot(TILT, dir(u, v)),
      grid: { every: [3, 8], alpha: 0.16 },
      ...(a < 0.999 ? { alpha: a } : {})
    });
    sc.glass(key + 'Glass', c, r, { color: P.violet, alpha: 0.05 * a, rim: 0.3 * a });
    sc.circle(c, D, r, { fade: false, color: P.violet, width: 1.4, alpha: 0.5 * a });
  }
  /** The tangent plane at o with the real axis and its integer ticks. */
  function plate(x1, a, flatA) {
    sc.surface(faded('plate', a), (u, v) => [u, v, -0.012], {
      u: [-1.5, x1],
      v: [-HALF, HALF],
      nu: 36,
      nv: 12,
      colors: [P.stage, P.magenta],
      value: (u) => 0.035 + (0.03 * (u + 1.5)) / (x1 + 1.5),
      grid: { every: [2, 2], color: P.magenta, alpha: 0.16 },
      pick: false,
      ...(a < 0.999 ? { alpha: a } : {})
    });
    sc.line([[-1.5, 0, 0.012], [x1 - 0.12, 0, 0.012]], { color: P.magenta, width: 2, alpha: 0.95 * a * flatA });
    sc.arrow([x1 - 0.6, 0, 0.012], [x1, 0, 0.012], { color: P.magenta, width: 2, headSize: 12, alpha: a * flatA });
    for (let k = 1; 2 * k < x1 - 0.25; k++) sc.line([[2 * k, -0.16, 0.014], [2 * k, 0.16, 0.014]], { color: P.magenta, width: 1.8, alpha: 0.9 * a * flatA });
  }
  /** The polygon pts cut at the edge x ≤ x1 and the sides |y| ≤ HALF of the plate. */
  function clip(pts, x1) {
    const cut = (list, inside, meet) => {
      const out = [];
      list.forEach((p, i) => {
        const q = list[(i + 1) % list.length];
        if (inside(p)) out.push(p);
        if (inside(p) !== inside(q)) out.push(meet(p, q));
      });
      return out;
    };
    const along = (p, q, k) => p.map((x, i) => lerp(x, q[i], k));
    let out = cut(pts, (p) => p[0] <= x1, (p, q) => along(p, q, (x1 - p[0]) / (q[0] - p[0])));
    for (const s of [1, -1]) if (out.length) out = cut(out, (p) => s * p[1] <= HALF, (p, q) => along(p, q, (s * HALF - p[1]) / (q[1] - p[1])));
    return out;
  }
  const CAP = 9 * deg;
  function drawTangent(m, D, a, alone) {
    const { theta, x } = m.tan,
      flat = state.lens === 1,
      cy = flat ? 0.4 : 1,
      mg = flat ? 1 : 0.85;
    const x1 = plateTo(2 * x),
      onPlate = 2 * x <= x1;
    plate(x1, a, mg);
    ball('ballA', CA, 1, D, a);
    sc.circle(CA, [0, 1, 0], 1, { color: P.violet, width: 1.1, alpha: 0.55 * a, back: 0.5 });
    // equal steps on the line against the marks they leave on the sphere: crowding towards ō
    for (let k = 1; k <= 12; k++) {
      const p = merid(2 * Math.atan(k));
      if (2 * k < x1 - 0.25) sc.line([TOP, [2 * k, 0, 0.012]], { color: P.violet, width: 0.9, alpha: 0.3 * a });
      sc.bead(p, { color: P.cyan, r: k < 6 ? 2.8 : 2, alpha: a * cy, key: 'mark' + k });
    }
    if (theta > 1e-6) {
      tube('arc', sample(64, (u) => merid(theta * u, 1.004)), P.cyan, 0.032, { alpha: a * cy });
      const X = [2 * x, 0, 0.02],
        Pw = merid(theta);
      sc.line([TOP, Pw], { color: P.magenta, width: 1.3, alpha: 0.65 * a * mg });
      const end = onPlate ? X : add(Pw, scale(sub(X, Pw), (x1 - Pw[0]) / (X[0] - Pw[0])));
      tube('ray', [Pw, end], P.magenta, 0.014, { alpha: a * mg });
      if (onPlate) sc.bead(X, { color: P.magenta, r: 6, alpha: a, key: 'image' });
      // a cap of 9° around P and its image on the plane, a disc magnified by A_err
      const n = [sn(theta), 0, -cs(theta)],
        e1 = [cs(theta), 0, sn(theta)],
        e2 = [0, 1, 0];
      const rim = sample(40, (u) => unit(add(scale(n, cs(CAP)), scale(add(scale(e1, cs(TAU * u)), scale(e2, sn(TAU * u))), sn(CAP))))).slice(0, -1);
      sc.fan(rim.map((v) => add(CA, scale(v, 1.01))), { fill: P.cyan, alpha: 0.5 * a * cy, color: P.cyan, width: 1.2, strokeAlpha: 0.9 * a * cy });
      const disc = clip(rim.map((v) => add(project(v), [0, 0, 0.016])), x1);
      if (disc.length > 2) sc.fan(disc, { fill: P.magenta, alpha: 0.34 * a * mg, color: P.magenta, width: 1.3, strokeAlpha: 0.95 * a * mg });
    }
    sc.bead([0, 0, 0], { color: P.sigma, r: 5, alpha: a, key: 'contact' });
    sc.bead(TOP, { color: P.sigma, r: 5, alpha: a, key: 'antipode' });
    if (alone) sc.bead(merid(theta), { color: P.amber, r: 6, key: 'probe' });
  }
  function drawRodrigues(m, D, a, alone) {
    const { theta, x } = m.tan,
      { orth } = m.rod,
      flat = state.lens === 1,
      cy = flat ? 0.4 : 1,
      mg = flat ? 1 : 0.9;
    const x1 = plateTo(4 * x);
    plate(x1, a, mg);
    ball('ballA', CA, 1, D, a);
    sc.circle(CA, [0, 1, 0], 1, { color: P.violet, width: 1.1, alpha: 0.5 * a, back: 0.45 });
    if (theta > 1e-6) {
      // coaxial: the curved sum walks 2θ along the meridian
      tube('step1', sample(48, (u) => merid(theta * u, 1.004)), P.cyan, 0.034, { alpha: a * cy });
      tube('step2', sample(48, (u) => merid(theta * (1 + u), 1.004)), P.cyan, 0.026, { alpha: 0.85 * a * cy });
      sc.bead(merid(2 * theta), { color: P.cyan, r: 6, alpha: a, key: 'sum' });
      // flat: x + x on the line, carried back to the sphere by the ray from ō
      const phi = 2 * Math.atan(2 * x),
        F = merid(phi),
        X2 = [4 * x, 0, 0.02];
      if (X2[0] <= x1) {
        sc.line([TOP, X2], { color: P.magenta, width: 1.3, alpha: 0.75 * a * mg });
        sc.bead(X2, { color: P.magenta, r: 5.4, alpha: a, key: 'flatX' });
      } else sc.line([TOP, add(TOP, scale(sub(X2, TOP), x1 / X2[0]))], { color: P.magenta, width: 1.3, alpha: 0.75 * a * mg });
      if (2 * x <= x1) sc.bead([2 * x, 0, 0.02], { color: P.magenta, r: 4, alpha: a, key: 'flatX1' });
      sc.bead(F, { color: P.magenta, r: 5.4, alpha: a, key: 'flat' });
      tube('gap', sample(40, (u) => merid(lerp(phi, 2 * theta, u), 1.06)), P.magenta, 0.026, { alpha: a * mg });
      // n equal steps: the curved ones stay on the circle, the flat ones run out along the line
      for (let n = 3; n <= CHEB_N; n++) {
        sc.bead(merid(n * theta, 1.004), { color: P.cyan, r: 3, alpha: 0.8 * a * cy, key: 'wind' + n });
        if (2 * n * x < x1 - 0.3) sc.bead([2 * n * x, 0, 0.02], { color: P.magenta, r: 3, alpha: 0.9 * a, key: 'run' + n });
      }
    }
    sc.bead([0, 0, 0], { color: P.sigma, r: 5, alpha: a, key: 'contact' });
    sc.bead(TOP, { color: P.sigma, r: 5, alpha: a, key: 'antipode' });
    // orthogonal: the second ball with its axes, the two Gibbs vectors, the flat sum and the curved sum
    const b = ballB();
    ball('ballB', b, 1, D, a);
    const at = (v) => add(b, v),
      kB = scaleB(m),
      of = (v) => at(scale(v, kB));
    for (const e of [E1, E2, E3]) sc.line([at(scale(e, -1)), at(scale(e, 1))], { color: P.violet, width: 1, alpha: 0.55 * a });
    if (x > 1e-6) {
      sc.arrow(b, of(scale(E1, x)), { color: P.sigma, width: 2.2, headSize: 10, alpha: a });
      sc.arrow(b, of(scale(E2, x)), { color: P.sigma, width: 2.2, headSize: 10, alpha: a });
      sc.line([of(scale(E1, x)), of(orth.flat), of(scale(E2, x))], { color: P.magenta, width: 1, alpha: 0.5 * a * mg });
      sc.arrow(b, of(orth.flat), { color: P.magenta, width: 2.8, headSize: 12, alpha: a * mg });
      sc.arrow(of(orth.flat), of(orth.exact), { color: P.cyan, width: 1.6, headSize: 9, alpha: 0.9 * a * cy });
      sc.arrow(b, of(orth.exact), { color: P.cyan, width: 3, headSize: 12, alpha: a * cy });
      // the angle between the two axes
      const u0 = unit(orth.flat),
        u1 = unit(orth.exact),
        om = Math.acos(clamp(dot(u0, u1), -1, 1));
      if (om > 1e-4) {
        const arc = sample(24, (t) => add(scale(u0, sn((1 - t) * om) / sn(om)), scale(u1, sn(t * om) / sn(om))));
        sc.fan([b, ...arc.map(at)], { fill: P.magenta, alpha: 0.4 * a * mg });
        sc.line(arc.map((v) => at(scale(v, 1.005))), { color: P.magenta, width: 2.4, alpha: a * mg });
      }
    }
    if (alone) sc.bead(merid(theta), { color: P.amber, r: 6, key: 'probe' });
  }
  function drawAdelic(m, D, a, alone) {
    const A = m.ade,
      flat = state.lens === 1,
      cy = flat ? 0.3 : 1;
    sc.surface(faded('disc', a), (u, v) => polar(u, v, -0.03), {
      u: [0.6, EDGE],
      v: [0, TAU],
      nu: 18,
      nv: 96,
      colors: [P.stage, P.violet],
      value: (u, v) => 0.1 + 0.05 * cs(v - 0.6),
      grid: { every: [18, 8], alpha: 0.12 },
      pick: false,
      ...(a < 0.999 ? { alpha: a } : {})
    });
    // the unit ball: the value 1
    const dir = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface(faded('one', a), dir, { u: [0, PI], v: [0, TAU], nu: 30, nv: 60, colors: [P.stage, P.violet], range: [-1.25, 1.9], value: (u, v) => dot(TILT, dir(u, v)), grid: { every: [5, 10], alpha: 0.14 }, ...(a < 0.999 ? { alpha: a } : {}) });
    const ringPts = (r) => sample(96, (u) => polar(r, TAU * u, 0.012));
    for (const r of A.rows) {
      const R = rho(r.p);
      if (!r.born) sc.line(ringPts(R), { color: P.violet, width: 0.9, alpha: 0.16 * a });
      else if (r.active) {
        tube('ring' + r.p, ringPts(R), P.cyan, A.isPrime ? 0.032 : 0.024, { alpha: a * cy, glow: 0.55 });
        // a composite reuses rings that were there before: each carries a violet echo on both sides
        if (!A.isPrime) for (const d of [-0.05, 0.05]) sc.line(ringPts(R + d), { color: P.violet, width: 2, alpha: 0.9 * a * cy });
      }
      else sc.line(ringPts(R), { color: P.cyan, width: 1.3, alpha: 0.42 * a * cy });
    }
    for (const q of A.echoes) sc.line(ringPts(rho(q)), { color: P.violet, width: 1.8, alpha: 0.8 * a * cy });
    // the residue clocks: the bead of ring p stands N mod p teeth away from the arrow
    for (const r of A.rows.filter((q) => q.born)) sc.bead(polar(rho(r.p), (TAU * state.gear) / r.p, 0.05), { color: P.cyan, r: r.active ? 5.4 : 3.6, alpha: (r.active ? 1 : 0.7) * a * cy, key: 'clock' + r.p });
    // the Archimedean arrow from the ball to ρ(N), and the cyan hops back, one per prime factor
    if (A.N > 1) sc.arrow(polar(0.98, 0, 0.1), polar(rho(A.N), 0, 0.1), { color: P.magenta, width: 4, headSize: 15, alpha: a });
    A.hops.forEach((h, k) => {
      const r0 = rho(h.from),
        r1 = rho(h.to),
        rise = 0.26 + 0.34 * (r0 - r1);
      const pts = sample(28, (u) => polar(lerp(r0, r1, u), 0, 0.1 + rise * sn(PI * u)));
      tube('hop' + k, pts.slice(0, -3), P.cyan, 0.03, { alpha: a * cy, glow: 0.5 });
      sc.arrow(pts[pts.length - 6], pts[pts.length - 1], { color: P.cyan, width: 2.4, headSize: 12, alpha: a * cy });
    });
    if (alone) sc.bead(polar(rho(A.N), 0, 0.1), { color: P.amber, r: 6, key: 'probe' });
  }
  /* the flat patch of the rivets scene: a hexagon with three rings of hexagons around it */
  const PATCH = (() => {
    const s = 0.33,
      verts = [],
      faces = [];
    for (let q = -3; q <= 3; q++)
      for (let r = -3; r <= 3; r++) {
        if (Math.abs(q + r) > 3) continue;
        const cx = s * Math.sqrt(3) * (q + r / 2),
          cy = s * 1.5 * r,
          f = [];
        for (let k = 0; k < 6; k++) {
          f.push(verts.length);
          verts.push([cx + s * cs(PI / 6 + (k * PI) / 3), cy + s * sn(PI / 6 + (k * PI) / 3), -1.3]);
        }
        faces.push(f);
      }
    return { vertices: verts, faces };
  })();
  function drawRivets(m, D, a, alone) {
    const flat = state.lens === 1,
      cy = flat ? 0.35 : 1;
    const solid = a * (flat ? 0.3 : 1);
    sc.poly(faded('cage', solid), { vertices: CAGE.verts, faces: CAGE.faces }, { colors: CAGE.faces.map((f) => (f.length === 5 ? P.magenta : P.violet)), edges: P.stage, ...(solid < 0.999 ? { alpha: solid } : {}) });
    CAGE.faces.forEach((f, k) => {
      if (f.length !== 5) return;
      const c = scale(f.map((i) => CAGE.verts[i]).reduce(add, [0, 0, 0]), 1 / 5);
      sc.bead(scale(c, 1.02), { color: P.magenta, r: 3, alpha: a, key: 'rivet' + k });
    });
    if (flat) sc.poly('patch', PATCH, { color: P.violet, edges: P.ink, alpha: 0.5 * a });
    for (let k = 0; k < 3; k++) {
      tube('gimbal' + k, sample(96, (u) => gimbalAt(k, TAU * u)), P.cyan, 0.02, { alpha: 0.85 * a * cy });
      sc.bead(gimbalAt(k, 0), { color: P.sigma, r: 2.6, alpha: 0.8 * a, key: 'zero' + k });
      sc.bead(gimbalAt(k, m.orb4.log[k]), { color: P.cyan, r: 6.4, alpha: a, key: 'phase' + k });
    }
    if (alone) sc.bead(gimbalAt(0, m.orb4.log[0]), { color: P.amber, r: 6.6, key: 'probe' });
  }
  function drawErgodic(m, D, a, alone) {
    const flat = state.lens === 1,
      cy = flat ? 0.16 : 1,
      t = state.tau5;
    sc.surface(faded('torus', a), (u, v) => torus(v, u), {
      u: [0, TAU],
      v: [0, TAU],
      nu: 30,
      nv: 84,
      colors: [P.stage, P.violet],
      range: [-1.5, 2.4],
      value: (u, v) => dot(TILT, [cs(u) * cs(v), cs(u) * sn(v), sn(u)]),
      grid: { every: [5, 7], alpha: 0.14 },
      pick: false,
      ...(a < 0.999 ? { alpha: a } : {})
    });
    // the dial of the third phase, in the hole
    sc.circle([0, 0, 0], [0, 0, 1], DIAL, { fade: false, color: P.violet, width: 1.4, alpha: 0.85 * a });
    if (t > 1e-9) {
      const n = Math.max(2, Math.ceil(t / 0.1));
      sc.line(sample(n, (u) => torus(LOGS[0] * t * u, LOGS[1] * t * u, Tr + 0.014)), { color: P.cyan, width: 1.35, alpha: 0.95 * a * cy });
      const span = Math.min(t, TAU);
      tube('loop', sample(Math.max(2, Math.ceil(span / 0.05)), (u) => torus(RATIO[0] * span * u, RATIO[1] * span * u, Tr + 0.05)), P.magenta, 0.024, { alpha: a, glow: 0.45 });
    }
    const [a2, a3, a5] = m.orb5.log,
      [b1, b2, b3] = m.orb5.ratio;
    sc.bead(torus(b1, b2, Tr + 0.06), { color: P.magenta, r: 6, alpha: a, key: 'locked' });
    sc.bead(polar0(DIAL, b3), { color: P.magenta, r: 4.6, alpha: a, key: 'locked3' });
    sc.bead(polar0(DIAL, a5), { color: P.cyan, r: 4.6, alpha: a * Math.max(cy, 0.4), key: 'free3' });
    if (alone) sc.bead(torus(a2, a3, Tr + 0.05), { color: P.amber, r: 6.4, key: 'probe' });
  }
  const polar0 = (r, az) => [r * cs(az), r * sn(az), 0];

  /* ---------- the handle: the probe s on the sphere, the integer N on the arrow, the phase τ on its ring or orbit ---------- */
  function handleWorld(scene, t) {
    if (scene === 'tangent' || scene === 'rodrigues') return merid(2 * Math.asin(Math.sqrt(t)));
    if (scene === 'adelic') return polar(rho(t + 1), 0, 0.1);
    if (scene === 'rivets') return gimbalAt(0, LOGS[0] * t);
    return torus(LOGS[0] * t, LOGS[1] * t, Tr + 0.05);
  }
  /** The candidate rail values a drag chooses between. */
  function dragCandidates(scene) {
    if (scene === 'tangent' || scene === 'rodrigues') return sample(990, (u) => u * S_MAX);
    if (scene === 'adelic') return sample(N_MAX - 1, (u) => Math.round(u * (N_MAX - 1)));
    const now = railOf(scene),
      max = RAIL[scene].max;
    return sample(400, (u) => clamp(now - 2 + 4 * u, 0, max));
  }

  /* ---------- labels ---------- */
  const SCENE_NAME = {
    tangent: [['切线放大', 'TANGENT MAGNIFIER'], ['平直读数（MODEL）', 'FLAT READING (MODEL)']],
    rodrigues: [['弯曲合成', 'CURVED SUM'], ['平直相加（MODEL）', 'FLAT SUM (MODEL)']],
    adelic: [['素数收回', 'PRIME RECLAIM'], ['只读 |N|（MODEL）', 'ONLY |N| (MODEL)']],
    rivets: [['铆钉与相位环', 'RIVETS AND PHASES'], ['平铺的六边形（MODEL）', 'FLAT HEXAGONS (MODEL)']],
    ergodic: [['不复返的轨道', 'NO RETURN'], ['有理节拍（MODEL）', 'RATIONAL BEAT (MODEL)']]
  };
  const LENS_NAME = [
    ['弯曲·阿代尔', 'CURVED · ADELIC'],
    ['平直放大轴 (MODEL)', 'FLAT AXIS (MODEL)']
  ];
  const nb = (html) => `<span class="nb">${html}</span>`;
  /** A sentence in which no “=” or “≈” is parted from the digits after it. */
  const keep = (html) => html.replace(/[=≈] −?\d[\d./]*(?:×10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?[°%]?/g, nb);
  const OB = '<span class="ob">o</span>'; // ō: the bar is drawn, so every face places it right
  const inv = (r) => (r.den === 1 ? '1' : `1/${r.den}`);
  const ledger = (A) => `${A.N}${A.active.map((r) => ` × ${inv(r)}`).join('')}`;
  const eulerText = () => `${CAGE.V} − ${CAGE.E} + ${CAGE.F} = ${CAGE.euler}`;
  const phaseList = (O, sep) => O.log.map((a) => alone(phaseText(O.tau, a))).join(sep);
  const subP = (p) => `<sub>${p}</sub>`;
  const padic = (n, p) => `|${n}|${subP(p)}`;
  const INF = '<sub>∞</sub>';
  function tags(m, D) {
    const { U, R } = basis(sc.cam.yaw, sc.cam.pitch);
    const off = (p, ku, kr = 0) => add(add(p, scale(U, ku)), scale(R, kr));
    const T = (key, p, html, cls = 'raw backed c-ik') => p && sc.tag(key, p, html, cls, { occlude: false });
    const small = compact(),
      flat = state.lens === 1,
      s = state.scene;
    const px = 1 / Math.max(1, sc.unit); // world units per pixel
    if (s === 'tangent') {
      const { theta, x } = m.tan,
        x1 = plateTo(2 * x);
      T('o', off([0, 0, 0], -20 * px, -20 * px), 'o', 'raw backed c-sg');
      T('anti', off(TOP, 18 * px), small ? OB : `${OB} · κ = 0`, 'raw backed c-sg');
      for (let k = 1; 2 * k < x1 - 0.5 && k <= 5; k++) if (Math.abs(2 * k - 2 * x) > 46 * px) T('tick' + k, off([2 * k, -0.16, 0], -14 * px), `${k}`, 'raw c-mg');
      T('line', off([x1 - 0.2, 0, 0], 20 * px, -10 * px), flat ? L('实数轴 ℝ → ∞', 'real axis ℝ → ∞') : 'ℝ → ∞', 'raw backed c-mg');
      if (theta > 0.06) {
        T('P', off(merid(theta), 4 * px, (theta > 2.2 ? -44 : 40) * px), flat ? 'P' : `s ${sText(m.tan)}`, 'raw backed c-cy');
        if (2 * x <= x1) T('X', off([2 * x, 0, 0], -38 * px), `x ${xText(m.tan)}`, 'raw backed c-mg');
        else T('X', off([x1, 0, 0], -34 * px, -40 * px), `x ${xText(m.tan)} →`, 'raw backed c-mg');
        if (!small && 2 * x <= x1) T('err', off([2 * x, 0, 0], 34 * px, 62 * px), `× ${alone(errText(m.tan))}`, 'raw backed c-mg');
      }
      if (!small) T('ball', off(CA, 0, -1 - 26 * px), flat ? L('有限的球', 'finite sphere') : '𝕋₃ ≅ S³(1)', 'raw backed c-vi');
    } else if (s === 'rodrigues') {
      const { theta, x } = m.tan,
        { orth } = m.rod,
        b = ballB(),
        kB = scaleB(m),
        x1 = plateTo(4 * x);
      T('o', off([0, 0, 0], -18 * px, -18 * px), 'o', 'raw backed c-sg');
      T('anti', off(TOP, 18 * px, -24 * px), OB, 'raw backed c-sg');
      if (x > 0.05) {
        // the short labels of the two inputs come first, so that they stand at their arrows
        if (!small) T('x1B', off(add(b, scale(E1, x * kB)), -14 * px, -10 * px), 'x₁', 'raw backed c-sg');
        if (!small) T('x2B', off(add(b, scale(E2, x * kB)), -2 * px, 22 * px), 'x₂', 'raw backed c-sg');
        T('sum', off(merid(2 * theta), 22 * px, 30 * px), `2θ ${turnText(m.rod)}`, 'raw backed c-cy');
        T('flat', off(merid(2 * Math.atan(2 * x)), 0, 46 * px), alone(flatText(m.rod)), 'raw backed c-mg');
        if (4 * x <= x1) T('x2', off([4 * x, 0, 0], -22 * px), small ? alone(doubleText(m.tan, 2)) : `x + x ${doubleText(m.tan, 2)}`, 'raw backed c-mg');
        if (!small) {
          T('gap', off(merid((theta * 2 + 2 * Math.atan(2 * x)) / 2, 1.06), 20 * px, 34 * px), L('差 ', 'short by ') + alone(gapText(m.rod)), 'raw backed c-mg');
          T('run', off([x1 - 0.2, 0, 0], 20 * px, -14 * px), 'n·x → ∞', 'raw backed c-mg');
          T('wind', off(merid(3 * theta), 4 * px, -22 * px), '3θ', 'raw backed c-cy');
        }
        if (!flat) T('exactB', off(add(b, scale(orth.exact, kB)), 14 * px, 26 * px), small ? alone(bothText(m.rod, 0)) : `(x₁ + x₂ + x₁×x₂)/(1 − x₁·x₂) · ${alone(bothText(m.rod))}`, 'raw backed c-cy');
        T('flatB', off(add(b, scale(orth.flat, kB)), -16 * px, 26 * px), small ? 'x₁ + x₂' : `x₁ + x₂ · ${alone(bothFlatText(m.rod))}`, 'raw backed c-mg');
        T('axis', off(add(b, scale(unit(add(unit(orth.exact), unit(orth.flat))), 1.0)), 0, 50 * px), alone(axisText(m.rod)), 'raw backed c-mg');
      }
      if (!small) T('nameB', off(b, -1 - 18 * px), L('e₁ ⊥ e₂ 两次转', 'turns about e₁ ⊥ e₂') + (kB < 0.995 ? L('，矢量缩到 ', ', vectors at ') + alone(scaleText(m)) : ''), 'raw backed c-vi');
    } else if (s === 'adelic') {
      const A = m.ade;
      T('one', off([0, 0, 1], 12 * px), '1', 'raw backed c-vi');
      T('arch', off(polar(rho(A.N), 0, 0.1), -26 * px, 18 * px), `|${A.N}|${INF} = ${A.N}`, 'raw backed c-mg');
      if (!flat) {
        A.hops.forEach((h, k) => {
          const r0 = rho(h.from),
            r1 = rho(h.to);
          T('hop' + k, off(polar((r0 + r1) / 2, 0, 0.1 + 0.26 + 0.34 * (r0 - r1)), 13 * px), small ? `1/${h.p}` : `× 1/${h.p}`, 'raw backed c-cy');
        });
        const list = A.rows.filter((r) => r.born);
        const blindShown = list.filter((r) => !r.active).slice(0, small ? 2 : 5);
        list.forEach((r, k) => {
          if (!r.active && !blindShown.includes(r)) return;
          const az = 1.75 + 0.33 * k;
          if (r.active) T('ring' + r.p, off(polar(rho(r.p), az, 0), 4 * px), small ? `${padic(A.N, r.p)} = ${inv(r)}` : `p = ${r.p} · ${padic(A.N, r.p)} = ${inv(r)}`, 'raw backed c-cy');
          else T('ring' + r.p, off(polar(rho(r.p), az, 0), 4 * px), `${padic(A.N, r.p)} = 1`, 'raw c-cy');
        });
        const echo = A.isPrime ? A.echoes[0] : A.N > 1 ? A.N : null;
        if (echo && !small) T('echo', off(polar(rho(echo), -0.95, 0), 4 * px), L('谐波回声 ', 'harmonic echo ') + (A.isPrime ? `${A.N}² = ${echo}` : echo), 'raw backed c-vi');
      } else if (!small) T('runaway', off(polar(EDGE, 0, 0.1), 22 * px, -30 * px), L('ln N → ∞', 'ln N → ∞'), 'raw backed c-mg');
    } else if (s === 'rivets') {
      const names = ['2', '3', '5'];
      for (let k = 0; k < 3; k++) {
        // outwards from the middle of the stage, so the label never covers its bead
        const p = gimbalAt(k, m.orb4.log[k]),
          sx = dot(p, R),
          sy = dot(p, U),
          n = hypot(sx, sy),
          [dx, dy] = n > 0.15 ? [sx / n, sy / n] : [0, -1];
        T('ph' + k, off(p, 27 * px * dy, (small ? 34 : 64) * px * dx), `e<sup>iτ ln ${names[k]}</sup>` + (small ? '' : ` · ${alone(phaseText(m.orb4.tau, m.orb4.log[k]))}`), 'raw backed c-cy');
      }
      T('rivet', off([0, 0, 0], -0.98, 0.72), `F₅ = ${CAGE.F5}`, 'raw backed c-mg');
      if (!small) T('euler', off([0, 0, 0], -0.98, -0.8), eulerText(), 'raw backed c-vi');
      if (flat) T('patch', off([0, 0, -1.3], -0.62, 0.9), L('F₅ = 0：合不成球', 'F₅ = 0: no sphere'), 'raw backed c-vi');
    } else {
      const O = m.orb5;
      if (!flat) {
        T('ln', off(torus(O.log[0], O.log[1], Tr + 0.05), 22 * px, 16 * px), small ? 'ln p' : 'ln 2 : ln 3 : ln 5', 'raw backed c-cy');
        T('share', off(torus(2.3, 0.4, Tr), 30 * px, -20 * px), L('到过 ', 'met ') + cellsText(O.logCells, O.total), 'raw backed c-cy');
      } else T('laps', off(torus(2.3, 0.4, Tr), 30 * px, -20 * px), L(`绕回 ${O.laps} 次`, O.laps === 1 ? '1 return' : `${O.laps} returns`), 'raw backed c-mg');
      T('ratio', off(torus(O.ratio[0], O.ratio[1], Tr + 0.06), -24 * px, 14 * px), '1 : 2 : 3', 'raw backed c-mg');
      T('lockShare', off(torus(-2.2, 0.2, Tr), -30 * px, -10 * px), L('只到过 ', 'only ') + cellsText(O.ratioCells, O.total), 'raw backed c-mg');
      if (!small) T('dial', off([0, 0, 0], -DIAL * 0.2), L('第三相位', 'third phase'), 'raw c-vi');
    }
  }

  /* ---------- the title line, the sentence under it, the legend ---------- */
  function bigline(m) {
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    const O = m.orb5;
    if (state.lens === 1) {
      const flat = {
        tangent: `x ${xText(m.tan)}`,
        rodrigues: `x + x ${doubleText(m.tan)}`,
        adelic: `|${m.ade.N}|${INF} = ${m.ade.N}`,
        rivets: 'F₅ = 0',
        ergodic: `1 : 2 : 3 · ${cellsText(O.ratioCells, O.total)}`
      }[state.scene];
      return `${name} · ${flat}`;
    }
    const key = {
      tangent: `A<sub>err</sub> = 1/κ ${errText(m.tan)}`,
      rodrigues: L('差 ', 'gap ') + `${alone(gapText(m.rod))} · ${alone(axisText(m.rod))}`,
      adelic: `${ledger(m.ade)} ${productText(m.ade)}`,
      rivets: `F₅ = ${CAGE.F5}`,
      ergodic: `${cellsText(O.logCells, O.total)} · ${cellsText(O.ratioCells, O.total)}`
    }[state.scene];
    return `${name} · ${key}`;
  }
  const listed = (ps, n) => (ps.length <= n ? ps.join(L('、', ', ')) : `${ps.slice(0, n).join(L('、', ', '))} ${L(`等 ${ps.length} 只`, `and ${ps.length - n} more`)}`);
  function subline(m) {
    const flat = state.lens === 1,
      t = m.tan;
    if (state.scene === 'tangent') {
      if (regime() === 'zero')
        return L(
          `s = 0：P 就在接触点 o，x ${xText(t)}，A<sub>err</sub> ${errText(t)}；切线贴着球面，什么也没有放大。`,
          `s = 0: P rests on the contact point o, x ${xText(t)} and A<sub>err</sub> ${errText(t)}; the line touches the sphere and nothing is magnified.`
        );
      if (flat)
        return L(
          `只读平直坐标：x ${xText(t)}，线上等长的一格落到球面上越来越短；${OB} 在这条线上没有位置。`,
          `Flat coordinate only: x ${xText(t)}; equal steps of the line are shorter and shorter arcs of the sphere, and ${OB} has no place on it.`
        );
      return L(
        `青色弧 θ ${thetaText(t)}，离 ${OB} 只剩 ${alone(leftText(t))}，κ ${kappaText(t)}；品红的像已在 x ${xText(t)}，局部放大率 A<sub>err</sub> ${errText(t)}。`,
        `The cyan arc θ ${thetaText(t)} is ${alone(leftText(t))} short of ${OB}, κ ${kappaText(t)}; its magenta image is already at x ${xText(t)}, with local magnification A<sub>err</sub> ${errText(t)}.`
      );
    }
    if (state.scene === 'rodrigues') {
      const { coax } = m.rod;
      if (regime() === 'zero')
        return L(
          `s = 0：x₁ = x₂ = 0，两种加法都停在 o，没有漏掉任何东西（两处误差 ${gapText(m.rod)}、${axisText(m.rod)}）。`,
          `s = 0: x₁ = x₂ = 0, both sums rest at o and nothing is dropped (the gaps are ${gapText(m.rod)} and ${axisText(m.rod)}).`
        );
      if (flat)
        return L(
          `只做平直相加：x + x ${doubleText(t)} 落在 ${alone(flatText(m.rod))}，n·x 沿直线一直往外跑。`,
          `Flat addition only: x + x ${doubleText(t)} lands at ${alone(flatText(m.rod))}, and n·x keeps running out along the line.`
        );
      const coaxZh = coax.antipode
          ? `1 − x₁·x₂ = 0，正好转到 ${OB}（2θ ${turnText(m.rod)}）`
          : `1 − x₁·x₂ ${denomText(m.rod)}，转到 2θ ${turnText(m.rod)}` + (coax.over ? `，越过 ${OB}` : ''),
        coaxEn = coax.antipode
          ? `1 − x₁·x₂ = 0 reaches ${OB} exactly (2θ ${turnText(m.rod)})`
          : `1 − x₁·x₂ ${denomText(m.rod)} turns to 2θ ${turnText(m.rod)}` + (coax.over ? `, past ${OB}` : '');
      return L(
        `同轴：${coaxZh}，平直只到 ${alone(flatText(m.rod))}，差 ${alone(gapText(m.rod))}。正交：漏掉 x₁ × x₂，转轴偏 ${alone(axisText(m.rod))}。`,
        `Coaxial: ${coaxEn}, the flat sum only ${alone(flatText(m.rod))}, short by ${alone(gapText(m.rod))}. Orthogonal: without x₁ × x₂ the axis is off by ${alone(axisText(m.rod))}.`
      );
    }
    if (state.scene === 'adelic') {
      const A = m.ade;
      if (regime() === 'zero')
        return L(
          `N = 1：|1|${INF} = 1，每个 |1|<sub>p</sub> = 1；没有箭头，也不需要任何收缩，乘积 ${productText(A)} 就是单位球本身。`,
          `N = 1: |1|${INF} = 1 and every |1|<sub>p</sub> = 1; no arrow, no contraction needed, and the product ${productText(A)} is the unit ball itself.`
        );
      if (flat)
        return L(
          `只读实数大小：|${A.N}|${INF} = ${A.N}，品红箭头伸到 ln ${A.N} ${logText(A.N)}；不问素数，没有什么把它收回来。`,
          `Real size only: |${A.N}|${INF} = ${A.N}, the magenta arrow reaches ln ${A.N} ${logText(A.N)}; without the primes nothing brings it back.`
        );
      if (A.isPrime) {
        const zh = A.blind.length ? `旧环 ${listed(A.blind, 4)} 看不见它（读数都是 1）` : '还没有任何旧环',
          en = A.blind.length ? `the old rings ${listed(A.blind, 4)} are blind to it (they all read 1)` : 'there is no older ring yet';
        return L(`N = ${A.N} 是素数：${zh}，新的青色环 p = ${A.N} 独自收回全部：${ledger(A)} ${productText(A)}。`, `N = ${A.N} is prime: ${en}; the new cyan ring p = ${A.N} alone takes all of it back: ${ledger(A)} ${productText(A)}.`);
      }
      const ps = A.active.map((r) => r.p);
      return L(
        `N = ${A.N} 是合数：没有新环，带紫色回声的旧环 ${listed(ps, 4)} ${ps.length > 1 ? '一起' : '独自'}收回：${ledger(A)} ${productText(A)}。`,
        `N = ${A.N} is composite: no new ring, the old ${ps.length > 1 ? 'rings' : 'ring'} ${listed(ps, 4)} in violet echo ${ps.length > 1 ? 'take' : 'takes'} it back: ${ledger(A)} ${productText(A)}.`
      );
    }
    if (state.scene === 'rivets') {
      if (flat)
        return L(
          '只用六边形：每个顶点三条边，F₅ = 0 时可以一直平铺，也可以卷成环面，就是合不成一只球。',
          'Hexagons only: three edges at every vertex and F₅ = 0 tile the plane or roll up into a torus, but never close into a sphere.'
        );
      const O = m.orb4;
      if (regime() === 'zero')
        return L(
          `τ = 0：三只青色环的相位都在 0°；笼子照旧要 F₅ = ${CAGE.F5} 枚品红五边形才合得上。`,
          `τ = 0: the three cyan rings all stand at phase 0°; the cage still needs F₅ = ${CAGE.F5} magenta pentagons to close.`
        );
      return L(
        `${eulerText()} 逼出恰好 ${CAGE.F5} 枚品红五边形；τ ${tauText(O.tau)} 时三只正交的青色环转到 ${phaseList(O, '、')}。`,
        `${eulerText()} forces exactly ${CAGE.F5} magenta pentagons; at τ ${tauText(O.tau)} the three orthogonal cyan rings stand at ${phaseList(O, ', ')}.`
      );
    }
    const O = m.orb5;
    if (regime() === 'zero') return L('τ = 0：两条轨道同在起点，还没有走出任何一格。', 'τ = 0: both orbits stand at the start and have not moved yet.');
    const lapZh = O.laps > 0 ? `已绕回起点 ${O.laps} 次` : '还没绕满一圈',
      lapEn = O.laps > 0 ? `has returned to its start ${O.laps} ${O.laps === 1 ? 'time' : 'times'}` : 'has not closed yet';
    if (flat)
      return L(
        `有理节拍 1 : 2 : 3 ${lapZh}，除去到过的格子（${cellsText(O.ratioCells, O.total)}），一格也到不了。`,
        `The rational beat 1 : 2 : 3 ${lapEn}; it never leaves the cells it has met (${cellsText(O.ratioCells, O.total)}).`
      );
    return L(
      `品红 1 : 2 : 3 ${lapZh}，只到过 ${O.ratioCells}/${O.total} 格；青色 ln 2 : ln 3 : ln 5 从不重复，已到过 ${O.logCells}/${O.total} 格。`,
      `Magenta 1 : 2 : 3 ${lapEn} and has met ${O.ratioCells}/${O.total} cells; cyan ln 2 : ln 3 : ln 5 never repeats and has met ${O.logCells}/${O.total}.`
    );
  }
  function legendItems() {
    const s = state.scene,
      flat = state.lens === 1;
    if (s === 'tangent') return [['vi', L('有限的球', 'the finite sphere')], ['cy', L('球面弧与刻度', 'arc and marks on the sphere')], ['mg', L('实数轴与像', 'real axis and image')], ['am', L('当前 s', 'current s')]];
    if (s === 'rodrigues') return [['cy', L('弯曲合成', 'curved composition')], ['mg', L('平直相加与误差', 'flat sum and its gap')], ['sg', L('输入 x₁、x₂', 'inputs x₁, x₂')], ['am', L('当前 s', 'current s')]];
    if (s === 'adelic')
      return flat
        ? [['mg', L('实长度 |N|', 'real size |N|')], ['vi', L('单位球 1', 'unit ball 1')], ['am', L('当前 N', 'current N')]]
        : [['mg', L('实长度 |N|', 'real size |N|')], ['cy', L('素数环与收回', 'prime rings and hops')], ['vi', L('单位球与谐波回声', 'unit ball and echoes')], ['am', L('当前 N', 'current N')]];
    if (s === 'rivets') return [['vi', L('六边形', 'hexagons')], ['mg', L('12 枚五边形', '12 pentagons')], ['cy', L('素数相位环', 'prime phase rings')], ['am', L('当前 τ', 'current τ')]];
    return [['cy', 'ln 2 : ln 3 : ln 5'], ['mg', '1 : 2 : 3'], ['vi', L('相位环面', 'phase torus')], ['am', L('当前 τ', 'current τ')]];
  }
  function hud(m) {
    $('hudBig').innerHTML = keep(bigline(m));
    $('hudSub').innerHTML = keep(subline(m));
    $('legend').innerHTML = legendItems()
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
  }
  // labels keep near their anchors and stay off the title, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const box = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), ...$('legend').children, handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const list = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of list) tag.style.translate = '';
    const boxes = list.map((tag) => tag.getBoundingClientRect());
    // the place of a label shifted by (dx, dy), or null when it leaves the stage or meets an occupied box
    const free = (b, dx, dy) => {
      const left = b.left + dx,
        right = b.right + dx,
        top = b.top + dy,
        bottom = b.bottom + dy;
      if (left < box.left + 4 || right > box.right - 4 || top < box.top + 4 || bottom > box.bottom - 4) return null;
      if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) return null;
      return { left, right, top, bottom };
    };
    const put = (i, dx, dy, at) => {
      list[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(at);
    };
    // each label takes the free place nearest its anchor: rows above and below and steps to either side are weighed
    // together by their distance (a side step costs half a pixel more, so a tie keeps the column)
    const STEP = 20,
      cols = 2 * Math.ceil(box.width / STEP);
    for (const [i, b] of boxes.entries()) {
      const dx = kit.clamp(0, box.left + 5 - b.left, box.right - 5 - b.right);
      const here = free(b, dx, 0);
      if (here) {
        put(i, dx, 0, here);
        continue;
      }
      const row = b.height + 4,
        rows = 2 * Math.ceil(box.height / row);
      let best = null;
      for (let k = 0; k <= cols; k++) {
        const sx = Math.ceil(k / 2) * STEP * (k % 2 ? -1 : 1),
          extra = sx === 0 ? 0 : 0.5;
        if (best && Math.abs(dx + sx) + extra >= best.cost) continue;
        for (let j = 0; j <= rows; j++) {
          const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1),
            cost = hypot(dx + sx, dy) + extra;
          if (best && cost >= best.cost) break;
          const at = free(b, dx + sx, dy);
          if (at) {
            best = { cost, dx: dx + sx, dy, at };
            break;
          }
        }
      }
      if (best) put(i, best.dx, best.dy, best.at);
      else list[i].hidden = true;
    }
  }
  function drawStage(m) {
    const w = weights();
    fit(m);
    sc.begin();
    const D = basis(sc.cam.yaw, sc.cam.pitch).D;
    const alone = !(state.from && state.blend < 1);
    const draw = { tangent: drawTangent, rodrigues: drawRodrigues, adelic: drawAdelic, rivets: drawRivets, ergodic: drawErgodic };
    const shared = w.tangent > 0 && w.rodrigues > 0; // the first two scenes share their sphere: only one of them draws it
    for (const k of SCENES) if (w[k] > 0.01 && !(shared && k === state.from)) draw[k](m, D, shared ? 1 : w[k], alone);
    if (alone) tags(m, D);
    sc.end();
    const q = sc.p(handleWorld(state.scene, railOf(state.scene)));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strips: the magnification along s, the ledger along N ---------- */
  const ERR_X = 0.96;
  const ERR = sample(240, (u) => [ERR_X * u, 1 / (1 - ERR_X * u)]),
    FLATX = sample(240, (u) => [ERR_X * u, Math.sqrt((ERR_X * u) / (1 - ERR_X * u))]),
    CHORD = sample(240, (u) => [ERR_X * u, 2 * Math.sqrt(ERR_X * u)]);
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').innerHTML = L('切线放大率冲向 ∞，球面弦长不超过 2', 'Tangent error → ∞, chord below 2');
      $('plotMeta').innerHTML = 'A<sub>err</sub> = 1/(1 − s) = 1 + x²';
      // headroom: the curves end at 25, the range at 41, so the key sits in open space even on a 118 px canvas
      const g = kit.plot(cv, { x: [0, ERR_X], y: [0, 41], pad: [34, 14, 12, 22] });
      g.axes({ xTicks: [[0, '0'], [0.5, '0.5'], [0.8, '0.8'], [0.96, '0.96']], yTicks: [0, 5, 10, 25], xLabel: 's' });
      g.line(ERR, P.magenta, { width: 2 });
      g.line(FLATX, P.magenta, { width: 1.4, dash: [5, 4], alpha: 0.85 });
      g.line(CHORD, P.cyan, { width: 2 });
      const at = Math.min(state.s, ERR_X);
      // the cursor stays below the key; the dot marks the current value up to the end of the curve
      g.line([[at, 0], [at, 23]], P.amber, { width: 1, ...(state.s > ERR_X ? { dash: [3, 3] } : {}) });
      if (state.s <= ERR_X) g.dot(state.s, m.tan.err, P.amber, 3.5);
      g.legend([[P.magenta, 'A_{err} = 1/(1 − s)'], [P.magenta, 'x = √(s/(1 − s))', 'dash']], { right: false });
      g.legend([[P.cyan, L('弦长 2√s', 'chord 2√s')]], { right: true });
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      $('plotTitleB').innerHTML = L('实长度长出多少，素数就收回多少', 'The primes take back what N adds');
      $('plotMetaB').innerHTML = `ln(|N|${INF} ∏<sub>p</sub> |N|<sub>p</sub>) = ln ${m.ade.product} = ${Math.log(m.ade.product)}`;
      // headroom: the tallest bar is ln 30 = 3.40, the range ends at 10.4, so the key clears every bar by more than 8 px
      // on a 118 px canvas, with room to spare for a deeper font descent
      const g = kit.plot(cb, { x: [0.3, N_MAX + 0.7], y: [-3.8, 10.4], pad: [34, 14, 12, 22] });
      g.axes({ xTicks: [1, 5, 10, 15, 20, 25, 30].map((n) => [n, String(n)]), yTicks: [-3, 0, 3] });
      for (const A of LEDGERS) {
        const x0 = A.N - 0.34,
          x1 = A.N + 0.34;
        if (A.N > 1) g.rect(x0, 0, x1, Math.log(A.N), P.magenta, { alpha: 0.78 });
        let y = 0;
        for (const r of A.active)
          for (let k = 0; k < r.v; k++) {
            g.rect(x0, y, x1, y - Math.log(r.p), P.cyan, { alpha: A.isPrime ? 0.95 : 0.5, stroke: P.stage, strokeAlpha: 0.9, width: 1 });
            y -= Math.log(r.p);
          }
      }
      g.line([[0.3, 0], [N_MAX + 0.7, 0]], P.cyan, { width: 2 });
      // the cursor stays below the key: it spans the bars only
      g.line([[state.N, -3.8], [state.N, 3.5]], P.amber, { width: 1 });
      g.dot(state.N, 0, P.amber, 3.5);
      g.legend([[P.magenta, 'ln |N|_{∞}'], [P.cyan, L('两者之和 ≡ 0', 'their sum ≡ 0')]], { right: false });
      g.legend([[P.cyan, '−v_{p}(N) ln p']], { right: true });
    }
  }

  /* ---------- readouts ---------- */
  /** A count of checks that hold: all of them, or how many. */
  const tally = (k, n, say) => (k === n ? say(`${n} 条全部成立`, `all ${n} hold`) : say(`${n} 条里成立 ${k} 条`, `${k} of ${n} hold`));
  /** The two products of prime powers of an integer vector (a, b, c), positive entries against negative ones, the smaller first. */
  const nearMiss = (k) => {
    const side = (sign) => k.map((e, i) => [[2, 3, 5][i], sign * e]).filter(([, e]) => e > 0),
      text = (f) => f.map(([p, e]) => p + (e > 1 ? superscript(e) : '')).join('·') || '1',
      value = (f) => f.reduce((acc, [p, e]) => acc * p ** e, 1);
    return [side(1), side(-1)].sort((f, g) => value(f) - value(g)).map((f) => `${text(f)} = ${value(f)}`);
  };
  function note(m, I) {
    const s = state.scene,
      F = I.fixed;
    if (s === 'tangent')
      return L(
        `单位四元数模型：κ = 1 − dist²/4 ${kappaText(m.tan)}，s ${sText(m.tan)}，dist(o, P) ${distText(m.tan, I.model.dist)}，2 dx/dθ = 1 + x² ${errText(m.tan)}；κ 的两种算法的浮点偏差 ${below(I.model.gap)}。`,
        `Unit-quaternion model: κ = 1 − dist²/4 ${kappaText(m.tan)}, s ${sText(m.tan)}, dist(o, P) ${distText(m.tan, I.model.dist)}, 2 dx/dθ = 1 + x² ${errText(m.tan)}; the two ways to κ, floating-point drift ${below(I.model.gap)}.`
      );
    if (s === 'rodrigues')
      return L(
        `拉格朗日恒等式两边都是 x⁴ ${fourthText(m.tan, I.lagrange.left)}；两边的浮点偏差 ${below(Math.abs(I.lagrange.left - I.lagrange.right))}，转子乘积与公式的浮点偏差 ${below(m.rod.orth.formulaGap)}，n = 0 … ${CHEB_N} 时堆递推与 T<sub>n</sub>(cos θ) 的浮点偏差 ${below(I.cheb.gap)}。`,
        `Both sides of the Lagrange identity are x⁴ ${fourthText(m.tan, I.lagrange.left)}; the two sides, floating-point drift ${below(Math.abs(I.lagrange.left - I.lagrange.right))}, the rotor product against the formula, floating-point drift ${below(m.rod.orth.formulaGap)}, the heap against T<sub>n</sub>(cos θ) for n = 0 … ${CHEB_N}, floating-point drift ${below(I.cheb.gap)}.`
      );
    if (s === 'adelic') {
      const e = m.ade.euclid,
        sum = L(
          `${F.product.fractions} 个分数 a/b 用整数核对，${tally(F.product.balanced, F.product.fractions, L)}；双精度乘积与 1 的浮点偏差 ${below(F.product.gap)}。`,
          `${F.product.fractions} fractions a/b checked in whole numbers, ${tally(F.product.balanced, F.product.fractions, L)}; the product in doubles against 1, floating-point drift ${below(F.product.gap)}.`
        );
      if (!e.S.length)
        return L(`小于 N 的素数还没有：空乘积加一 = ${e.value}，素因子 q = ${e.q}。${sum}`, `There is no prime below N yet: the empty product plus one = ${e.value}, with the prime divisor q = ${e.q}. ${sum}`);
      return L(
        `小于 N 的素数 {${e.S.join(', ')}}：乘积加一 = ${e.value}，对每个旧素数都余 1，有素因子 q = ${e.q} 不在其中。${sum}`,
        `The primes below N {${e.S.join(', ')}}: product plus one = ${e.value}, remainder 1 at every one of them, and the prime divisor q = ${e.q} is not among them. ${sum}`
      );
    }
    if (s === 'rivets')
      return L(
        `每个顶点三条边、面只有五边形与六边形：6(V − E + F) = ${6 * F.cage.euler} = F₅。面边界在 𝔽₂ 上的秩 ${F.cage.rank} = E − V + 1，核维数 ${F.cage.kernel}（常数）。π(${N_MAX}) = ${F.density.count}，平均密度 1/ln ${N_MAX} ${nearRel(F.density.linear)}（对 x），${N_MAX}/ln ${N_MAX} ${nearRel(F.density.log)}（对 ℓ = ln x）。`,
        `Three edges at every vertex, faces with five or six sides: 6(V − E + F) = ${6 * F.cage.euler} = F₅. The face boundary over 𝔽₂ has rank ${F.cage.rank} = E − V + 1 and a kernel of dimension ${F.cage.kernel} (the constants). π(${N_MAX}) = ${F.density.count}, mean density 1/ln ${N_MAX} ${nearRel(F.density.linear)} in x and ${N_MAX}/ln ${N_MAX} ${nearRel(F.density.log)} in ℓ = ln x.`
      );
    return L(
      `${F.independence.vectors} 个非零整系数（绝对值不超过 ${F.independence.range}）里使 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1 的有 ${F.independence.zeros} 个，最小的 |a ln 2 + b ln 3 + c ln 5| ${nearRel(F.independence.least)}（${nearMiss(F.independence.witness).join(L(' 对 ', ' against '))}）。`,
      `Of the ${F.independence.vectors} nonzero integer vectors (entries up to ${F.independence.range}) ${F.independence.zeros} give 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1; the least |a ln 2 + b ln 3 + c ln 5| ${nearRel(F.independence.least)} (${nearMiss(F.independence.witness).join(L(' 对 ', ' against '))}).`
    );
  }
  function readings(m, I) {
    const { tan: t, rod: r, ade: A, orb5: O } = m;
    $('roKey').textContent = productText(A);
    $('roKeySub').textContent = ` · N = ${A.N} · ${ledger(A)}`;
    // a value and its relation stay on one line
    $('roTangent').innerHTML = [sText(t), thetaText(t), xText(t), errText(t)].map(nb).join(' · ');
    $('roAdd').innerHTML = `${nb(`${turnText(r)} / ${flatText(r)}`)} · ${[gapText(r), axisText(r)].map(nb).join(' · ')}`;
    // at N = 1 every |1|_p is 1: no prime is active, and the line says so
    $('roPrimes').innerHTML = A.N === 1 ? L('每个 |1|<sub>p</sub> = 1', 'every |1|<sub>p</sub> = 1') : A.active.map((q) => `${padic(A.N, q.p)} = ${inv(q)}`).join(' · ');
    $('roCage').innerHTML = [eulerText(), `F₅ = ${CAGE.F5}`, `F₆ = ${CAGE.F6}`].map(nb).join(' · ');
    $('roOrbit').innerHTML = [shareText(O.logCells, O.total), shareText(O.ratioCells, O.total), `τ ${tauText(O.tau)}`].map(nb).join(' · ');
    $('roNote').innerHTML = keep(note(m, I));
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][0])}</strong>`;
    $('keyPill').innerHTML = `|N|${INF} ∏<sub>p</sub> |N|<sub>p</sub> <strong>${productText(A)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改 s、N 或 τ · 拖空白处转视角 · 空格播放', 'drag the amber handle to set s, N or τ · drag empty space to orbit · Space plays');
    $('formula').textContent = { tangent: 'A_err = 1 + x² = 1/κ = 1/(1 − s)', rodrigues: '(x₁ + x₂ + x₁×x₂)/(1 − x₁·x₂)', adelic: '|N|_∞ ∏_p |N|_p = 1', rivets: 'V − E + F = 2 ⇒ F₅ = 12', ergodic: '(τ ln 2, τ ln 3, τ ln 5) mod 2π' }[state.scene];
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    sf.set(Math.round(state.s * 100) / 100);
    $('sOut').textContent = sText(t); // the slider stands on hundredths, the quantity on its own grid
    nf.set(state.N);
    $('stepPlusBtn').disabled = state.N >= N_MAX;
    sChips.set(CHIP_S.includes(state.s) ? String(state.s) : null, true);
  }
  // set once the cards exist: keeps the notes true to the live frame (see liveNotes)
  let liveNotes = null;
  const paint = kit.painter(() => {
    const m = calc(),
      I = instances(m);
    hud(m);
    if (liveNotes) liveNotes();
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail: the quantity of the scene ---------- */
  const playBtn = $('playBtn');
  let stopAt = null,
    lastT = 0;
  /** The gears rest on an integer and turn to the next one over the last two fifths of each beat. */
  const gearOf = (t) => {
    const n = Math.floor(t + 1e-9),
      f = clamp((t - n - 0.6) / 0.4, 0, 1);
    return n + 1 + f * f * (3 - 2 * f);
  };
  /** The value of the grid the quantity of the scene takes at the rail value t: s on 1/GRID, τ on 1/TICK, N − 1 whole. */
  function onGrid(t, playing = false) {
    const { key, max } = RAIL[state.scene];
    if (key === 'N') return clamp(playing ? Math.floor(t + 1e-9) : Math.round(t), 0, max);
    const g = key === 's' ? GRID : TICK;
    return clamp(Math.round(t * g) / g, 0, max);
  }
  function applyClock(t, playing) {
    const key = RAIL[state.scene].key,
      v = onGrid(t, playing);
    if (key === 'N') {
      state.N = v + 1;
      state.gear = playing ? gearOf(t) : state.N;
    } else state[key] = v;
  }
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: RAIL.tangent.rate,
    step: RAIL.tangent.step,
    max: RAIL.tangent.max,
    // the readout is written from t itself: kit.clock shows it before onChange has moved the quantity
    format: (t) => {
      const key = RAIL[state.scene].key,
        v = onGrid(t, true);
      if (key === 's') return `s ${sText(tangentOf(v))}`;
      if (key === 'N') return `N = ${v + 1}`;
      return `τ ${tauText(v)}`;
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a card plays from its start up to its still and parks there
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
      // a resting rail stands on the grid of its quantity
      if (!c.playing && Math.abs(t - onGrid(t)) > 1e-9) {
        c.set(onGrid(t));
        return;
      }
      applyClock(t, c.playing);
      paint();
    }
  });
  /** Point the rail at a scene: its range, speed and step. */
  function useRail(scene) {
    const r = RAIL[scene];
    clock.rate = r.rate;
    clock.step = r.step;
    clock.setMax(r.max, true);
  }
  /** Put the rail on a value of the current scene, on the grid of its quantity. */
  function setRail(t) {
    const v = onGrid(t);
    applyClock(v, false);
    lastT = v;
    clock.set(v, true);
    paint();
  }
  /** ▶ on a card parked on its still plays the sweep again from its start: the rail is rewound before the clock toggles. */
  function rearm() {
    const id = cards.current;
    if (clock.playing || !id || state.scene !== presets[id].scene) return;
    const still = presets[id].still;
    if (Math.abs(clock.t - still) > 1e-9) return;
    clock.set(0, true);
    lastT = 0;
    stopAt = still;
  }
  playBtn.addEventListener('click', () => {
    rearm();
    clock.toggle();
  });
  $('play').addEventListener('click', rearm, true);
  document.addEventListener(
    'keydown',
    (ev) => {
      if (ev.key !== ' ' || ev.metaKey || ev.ctrlKey || ev.altKey || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test((ev.target && ev.target.tagName) || '')) return;
      if (document.querySelector('.drawer:not([hidden])')) return;
      rearm();
    },
    true
  );
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      stopAt = null;
      clock.pause();
      clock.set(0);
    });

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  /** Blend the frame from the scene shown now to `scene` over ms. */
  function setScene(scene, ms) {
    if (transition) transition.cancel();
    transition = null;
    const before = state.scene;
    state.scene = scene;
    useRail(scene);
    if (ms > 0 && !TRV.still && before !== scene) {
      state.from = before;
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
    } else {
      state.from = null;
      state.blend = 1;
    }
  }
  function aim(scene, ms) {
    sc.view(CAMS[scene][state.cam], ms);
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopAt = null;
    clock.pause();
    cards.mark(null);
    if (transition) {
      transition.cancel();
      transition = null;
    }
  }
  /** Move to a scene that shows the quantity `key` when the current one does not. */
  function showQuantity(key, scene) {
    if (RAIL[state.scene].key === key) return;
    setScene(scene, 0);
    aim(scene, TRV.still ? 0 : 500);
  }
  function setS(v) {
    leave();
    showQuantity('s', 'tangent');
    setRail(v);
  }
  function setN(v) {
    leave();
    showQuantity('N', 'adelic');
    setRail(clamp(v, 1, N_MAX) - 1);
  }
  const sf = kit.field($('sRange'), { fmt: (v) => sText(tangentOf(v)), onInput: setS });
  const nf = kit.field($('nRange'), { fmt: (v) => `= ${v}`, onInput: setN });
  const sChips = kit.chips($('sChips'), 's', (v) => setS(Number(v)));
  $('stepPlusBtn').addEventListener('click', () => setN(state.N + 1));
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = CAMS.tangent[v] ? v : 'panorama';
    aim(state.scene, TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens renames the picture and keeps the state; the rail switch and its mirror in the tour bar (narrow pages,
  // where the rail sits below the evidence) both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- the sentences of the frames that are not live: the cards, the NUM box and the drawer ----------
     Their numbers come from the frames below, never from the text. */
  const BENCH = benchmarks();
  const AT1 = tangentOf(STILL1),
    AT2 = rodriguesOf(STILL2),
    AT3 = LEDGERS[STILL3],
    NEXT = LEDGERS[STILL3 + 1],
    AT5 = orbitOf(STILL5),
    ZERO1 = tangentOf(0),
    ZERO2 = rodriguesOf(0),
    ONE = LEDGERS[0];
  const commas = (ps, say) => ps.join(say('、', ', '));
  const sName = (t) => quotient(t.S, GRID);
  const met = (cells, total, say) => (cells === total ? say(`${total} 个格子全部到过`, `it has met all ${total} cells`) : say(`${total} 个格子到过 ${cells} 个`, `it has met ${cells} of the ${total} cells`));

  /* ---------- experiment cards ---------- */
  const [CARD1, CARD2, CARD3, CARD4, CARD5] = Object.keys(presets);
  const both = (f) => [keep(f(ZH)), keep(f(EN))];
  const NOTES = {
    [CARD1]: both((say) =>
      say(
        `有限的球贴着平面上的实数轴。时间轴把青色弧从 o 推向 ${OB}，停在 s ${sText(AT1, 2)}：弧离 ${OB} 只剩 ${alone(leftText(AT1))}，从 ${OB} 出发的品红视线却已落在 x ${xText(AT1, 0)}，手柄四周的青色小圆在平面上变成约 ${alone(errText(AT1, 0))} 倍大的品红圆片；x 的整数刻度在球面上越挤越密。A<sub>err</sub> = 1 + x² = 1/κ。`,
        `The finite sphere rests on the real axis. The rail pushes the cyan arc from o towards ${OB} and parks at s ${sText(AT1, 2)}: only ${alone(leftText(AT1))} are left to ${OB}, yet the magenta ray from ${OB} already lands at x ${xText(AT1, 0)}, and the small cyan circle around the handle has become a magenta disc about ${alone(errText(AT1, 0))} times as large; the integer ticks of x crowd together on the sphere. A<sub>err</sub> = 1 + x² = 1/κ.`
      )
    ),
    [CARD2]: both((say) =>
      say(
        `停在 s = ${sName(AT2)}，x₁ 与 x₂ 的长都是 x ${xText(AT2, 0)}。切平面上的球是同轴：青色弯曲合成 1 − x₁·x₂ = ${quotient(AT2.R - AT2.S, AT2.R)}，转到 2θ ${turnText(AT2)}${AT2.coax.antipode ? `，正好是 ${OB}` : ''}；品红的 x + x ${doubleText(AT2, 0)} 只到 ${alone(flatText(AT2))}，差 ${alone(gapText(AT2))}。另一只球是正交：x₁ + x₂ 少了 x₁ × x₂，转轴偏 ${alone(axisText(AT2))}。重复 n 次，青色珠子 nθ 绕圈，品红 n·x 沿直线跑远。`,
        `Parked at s = ${sName(AT2)}, where x₁ and x₂ have length x ${xText(AT2, 0)}. Coaxial, on the tangent plane: the cyan curved sum has 1 − x₁·x₂ = ${quotient(AT2.R - AT2.S, AT2.R)} and turns to 2θ ${turnText(AT2)}${AT2.coax.antipode ? `, exactly ${OB}` : ''}; the magenta x + x ${doubleText(AT2, 0)} stops at ${alone(flatText(AT2))}, short by ${alone(gapText(AT2))}. Orthogonal, on the other ball: x₁ + x₂ drops x₁ × x₂ and the axis is off by ${alone(axisText(AT2))}. Repeated n times, the cyan beads nθ wind round and the magenta n·x runs off along the line.`
      )
    ),
    [CARD3]: both((say) =>
      say(
        `时间轴让 N 一格一格走，停在 N = ${AT3.N}：品红箭头伸到 ln ${AT3.N}，青色环 ${commas(AT3.blind, say)} 的珠子都不在箭头上（${AT3.blind.map((p) => padic(AT3.N, p)).join(' = ')} = 1），新的青色环 p = ${AT3.active[0].p} 用一跳收回全部。再按 +1 到 N = ${NEXT.N}：没有新环，带紫色回声的旧环 ${commas(NEXT.active.map((r) => r.p), say)} 各收回一段；外面的紫色圈是合数与素数幂的谐波回声。`,
        `The rail steps N one by one and parks at N = ${AT3.N}: the magenta arrow reaches ln ${AT3.N}, the beads of the cyan rings ${commas(AT3.blind, say)} are off the arrow (${AT3.blind.map((p) => padic(AT3.N, p)).join(' = ')} = 1), and the new cyan ring p = ${AT3.active[0].p} takes all of it back in one hop. Press +1 for N = ${NEXT.N}: no new ring, the old rings ${commas(NEXT.active.map((r) => r.p), say)} in violet echo each take back their part; the violet circles farther out are the harmonic echoes of composites and prime powers.`
      )
    ),
    [CARD4]: both((say) =>
      say(
        `紫色六边形与品红五边形合成的笼子：每个顶点三条边，V − E + F = ${CAGE.euler} 逼出恰好 ${CAGE.F5} 枚五边形。外面三只两两垂直的青色环按 τ ln 2、τ ln 3、τ ln 5 各走各的相位，灰白小珠是零点。五边形铆钉与素数的对照是类比（MODEL）。`,
        `A cage of violet hexagons and magenta pentagons: three edges at every vertex and V − E + F = ${CAGE.euler} force exactly ${CAGE.F5} pentagons. The three mutually orthogonal cyan rings outside run their own phases τ ln 2, τ ln 3, τ ln 5; the pale beads mark their zeros. Pentagonal rivets against primes is an analogy (MODEL).`
      )
    ),
    [CARD5]: both((say) =>
      say(
        `同一只相位环面上的两条轨道。品红的有理节拍 1 : 2 : 3 每过 2π 就回到原处，反复走同一条闭合的线，只到过 ${cellsText(AT5.ratioCells, AT5.total)} 的格子。青色的 ln 2 : ln 3 : ln 5 从不回到走过的状态；停在 ${AT5.laps} 圈之后，${met(AT5.logCells, AT5.total, say)}。孔里的小表盘是第三个相位。`,
        `Two orbits on one phase torus. The magenta rational beat 1 : 2 : 3 is back at its start after every 2π, retracing one closed line and meeting ${cellsText(AT5.ratioCells, AT5.total)} of the cells. The cyan ln 2 : ln 3 : ln 5 never comes back to a state it has been in; parked after ${AT5.laps} turns, ${met(AT5.logCells, AT5.total, say)}. The small dial in the hole is the third phase.`
      )
    )
  };
  // the same cards at s = 0, N = 1 or τ = 0 (⏮, or the start of their sweep)
  const NOTES_ZERO = {
    [CARD1]: both((say) =>
      say(
        `此刻 s = 0：P 停在接触点 o，x ${xText(ZERO1)}，A<sub>err</sub> ${errText(ZERO1)}，κ ${kappaText(ZERO1)}。没有青色弧，没有品红的像，切线与球面在这一点贴合，什么也没有放大。推动时间轴或按 ▶，像会随 s 跑出去。`,
        `Right now s = 0: P rests on the contact point o, x ${xText(ZERO1)}, A<sub>err</sub> ${errText(ZERO1)}, κ ${kappaText(ZERO1)}. There is no cyan arc and no magenta image; the line touches the sphere here and nothing is magnified. Move the rail or press ▶ and the image runs out with s.`
      )
    ),
    [CARD2]: both((say) =>
      say(
        `此刻 s = 0：x₁ = x₂ = 0，两个输入都是不转。弯曲合成与平直相加都停在 o，1 − x₁·x₂ = ${quotient(ZERO2.R - ZERO2.S, ZERO2.R)}、x₁ × x₂ = 0，两处误差 ${gapText(ZERO2)}、${axisText(ZERO2)}。推动时间轴或按 ▶，误差随 s 长出。`,
        `Right now s = 0: x₁ = x₂ = 0, both inputs turn nothing. The curved sum and the flat sum both rest at o, 1 − x₁·x₂ = ${quotient(ZERO2.R - ZERO2.S, ZERO2.R)} and x₁ × x₂ = 0, and the gaps are ${gapText(ZERO2)} and ${axisText(ZERO2)}. Move the rail or press ▶ and the gaps grow with s.`
      )
    ),
    [CARD3]: both((say) =>
      say(
        `此刻 N = 1：|1|<sub>∞</sub> = 1，每个 |1|<sub>p</sub> = 1，还没有一只素数环，也没有箭头；乘积 ${productText(ONE)} 就是中央的单位球，不需要任何收缩。推动时间轴或按 +1，箭头与素数环才出现。`,
        `Right now N = 1: |1|<sub>∞</sub> = 1 and every |1|<sub>p</sub> = 1; no prime ring and no arrow yet. The product ${productText(ONE)} is the unit ball in the middle, and no contraction is needed. Move the rail or press +1 and the arrow and the prime rings appear.`
      )
    ),
    [CARD4]: both((say) =>
      say(
        `此刻 τ = 0：三只青色环的相位都停在灰白的零点上。笼子不随 τ 变：V − E + F = ${eulerText()}，照旧是 ${CAGE.F5} 枚品红五边形。推动时间轴或按 ▶，三个相位各走各的。`,
        `Right now τ = 0: the phases of the three cyan rings all stand on the pale zeros. The cage does not change with τ: V − E + F = ${eulerText()}, still ${CAGE.F5} magenta pentagons. Move the rail or press ▶ and the three phases part.`
      )
    ),
    [CARD5]: both((say) =>
      say(
        '此刻 τ = 0：品红与青色两条轨道同在起点，还没有走出一步，各到过一个格子。推动时间轴或按 ▶，品红会合成一条闭合的线，青色不会。',
        'Right now τ = 0: the magenta and the cyan orbit both stand at the start, neither has moved, and each has met one cell. Move the rail or press ▶: the magenta one closes, the cyan one does not.'
      )
    )
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts, only what the stage shows
  const FIGURE_NOTES = {
    [CARD1]: both((say) => say(`s ${sText(AT1, 2)}：青色弧离 ${OB} 还有 ${alone(leftText(AT1))}，品红的像在 x ${xText(AT1, 0)}，放大 ${alone(errText(AT1, 0))} 倍。`, `s ${sText(AT1, 2)}: the cyan arc is ${alone(leftText(AT1))} short of ${OB}; its image x ${xText(AT1, 0)}, magnified ${alone(errText(AT1, 0))} times.`)),
    [CARD2]: both((say) => say(`s = ${sName(AT2)}：同轴差 ${alone(gapText(AT2))}，正交时转轴偏 ${alone(axisText(AT2))}；青色是弯曲合成，品红是平直相加。`, `s = ${sName(AT2)}: cyan curved against magenta flat, coaxial gap ${alone(gapText(AT2))}, axis gap ${alone(axisText(AT2))}.`)),
    [CARD3]: both((say) => say(`N = ${AT3.N}：品红箭头伸到 ${AT3.N}，青色环 p = ${AT3.active[0].p} 一跳收回，${ledger(AT3)} = ${AT3.product}；环 ${commas(AT3.blind, say)} 读数都是 1。`, `N = ${AT3.N}: the cyan ring p = ${AT3.active[0].p} takes it back, ${ledger(AT3)} = ${AT3.product}; rings ${AT3.blind.join(' and ')} read 1.`)),
    [CARD4]: both((say) => say(`恰好 ${CAGE.F5} 枚品红五边形把紫色六边形合成球；三只青色环各走 ln 2、ln 3、ln 5 的相位。`, `Exactly ${CAGE.F5} magenta pentagons; three cyan rings run at ln 2, ln 3 and ln 5.`)),
    [CARD5]: ['品红 1 : 2 : 3 反复走同一条闭合线；青色 ln 2 : ln 3 : ln 5 从不重复，铺满环面。', 'Magenta 1 : 2 : 3 retraces one loop; cyan ln 2 : ln 3 : ln 5 never repeats.']
  };
  const FIGURE_ZERO = {
    [CARD1]: both((say) => say(`s = 0：P 停在接触点 o，x = 0，放大率 ${errText(ZERO1)}，没有放大。`, `s = 0: P rests on o, x = 0, magnification ${errText(ZERO1)}; nothing is magnified.`)),
    [CARD2]: both((say) => say(`s = 0：两个输入都不转，两种加法都停在 o，误差 ${gapText(ZERO2)}。`, `s = 0: neither input turns, both sums rest at o, the gaps are ${gapText(ZERO2)}.`)),
    [CARD3]: both((say) => say(`N = 1：没有箭头，也没有素数环；乘积 ${productText(ONE)} 就是中央的单位球。`, `N = 1: no arrow, no prime ring; the product ${productText(ONE)} is the unit ball.`)),
    [CARD4]: both((say) => say(`τ = 0：三只青色环都停在零点；${CAGE.F5} 枚品红五边形不变。`, `τ = 0: the three cyan rings stand at zero; the ${CAGE.F5} magenta pentagons stay.`)),
    [CARD5]: ['τ = 0：两条轨道同在起点，还没有走。', 'τ = 0: both orbits stand at the start and have not moved.']
  };
  // free play (no card marked): the plain hint, or the state of the frame first when it is a degenerate one
  const HINT = [
    '拖琥珀手柄、时间轴或滑块改 s、N 与 τ，换透镜或视角。随时可以再选一张卡。',
    'Drag the amber handle, the rail or the sliders to set s, N and τ; switch the lens or the view. Pick a card again at any time.'
  ];
  const IDLE_LIVE = ['自由探索：' + HINT[0], 'Free play: ' + HINT[1]],
    IDLE_ZERO = {
      tangent: [`自由探索：此刻 s = 0，P 在接触点 o，x = 0，A<sub>err</sub> ${errText(ZERO1)}，没有放大。` + HINT[0], `Free play: right now s = 0, P is at the contact point o, x = 0, A<sub>err</sub> ${errText(ZERO1)}, nothing is magnified. ` + HINT[1]],
      rodrigues: [`自由探索：此刻 s = 0，两种加法都停在 o，误差 ${gapText(ZERO2)}。` + HINT[0], `Free play: right now s = 0, both sums rest at o and the gaps are ${gapText(ZERO2)}. ` + HINT[1]],
      adelic: [`自由探索：此刻 N = 1，|1|<sub>∞</sub> = 1，每个 |1|<sub>p</sub> = 1，不需要任何收缩，乘积 ${productText(ONE)}。` + HINT[0], `Free play: right now N = 1, |1|<sub>∞</sub> = 1 and every |1|<sub>p</sub> = 1, no contraction is needed, product ${productText(ONE)}. ` + HINT[1]],
      rivets: ['自由探索：此刻 τ = 0，三只青色环都在零点。' + HINT[0], 'Free play: right now τ = 0, the three cyan rings stand at zero. ' + HINT[1]],
      ergodic: ['自由探索：此刻 τ = 0，两条轨道同在起点。' + HINT[0], 'Free play: right now τ = 0, both orbits stand at the start. ' + HINT[1]]
    };
  // a cited figure shows the stage, the tour bar and the rail only: its free-play note names nothing else
  const FIGURE_IDLE = ['自由探索：拖琥珀手柄或时间轴，按 ◀ ▶ 换一张卡。', 'Free play: drag the amber handle or the rail; ◀ ▶ switch cards.'];
  const cardOf = (scene) => Object.keys(presets).find((id) => presets[id].scene === scene);
  function applyPreset(id) {
    const p = presets[id];
    stopAt = null;
    clock.pause();
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    aim(p.scene, booting || TRV.still ? 0 : 600);
    // the page opens parked on the declared frame (a still, a cited figure, the whole lab); a click plays up to it
    const parked = TRV.still || TRV.reduceMotion || !p.play || booting;
    lastT = 0;
    clock.set(parked ? p.still : 0);
    lastT = clock.t;
    if (!parked) {
      stopAt = p.still;
      clock.play();
    }
    paint();
  }
  // kit.cards reads both tables when it writes a note, so the page swaps their entries in place
  const LIVE = TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    ZERO = TRV.figure ? FIGURE_ZERO : NOTES_ZERO;
  const notesObj = { ...LIVE },
    idlePair = [...(TRV.figure ? FIGURE_IDLE : IDLE_LIVE)];
  const cards = kit.cards($('presets'), {
    presets,
    notes: notesObj,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: idlePair
  });
  /* the notes follow the live frame, as the HUD line does: at s = 0, N = 1 or τ = 0 the marked card, or free play, says so.
     The key holds the marked card too: a slider that leaves the card rewrites the free-play note in the same frame */
  let noteKey = null;
  liveNotes = () => {
    const zero = regime() === 'zero',
      key = (cards.current || 'idle:' + state.scene) + ':' + zero;
    if (key === noteKey) return;
    noteKey = key;
    for (const id of Object.keys(presets)) notesObj[id] = zero && presets[id].scene === state.scene ? ZERO[id] : LIVE[id];
    const idle = TRV.figure ? (zero ? FIGURE_ZERO[cardOf(state.scene)] : FIGURE_IDLE) : zero ? IDLE_ZERO[state.scene] : IDLE_LIVE;
    idlePair[0] = idle[0];
    idlePair[1] = idle[1];
    cards.mark(cards.current);
  };
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag the quantity of the scene, or arrow keys ---------- */
  const viewportPoint = (t) => {
    const q = sc.p(handleWorld(state.scene, t)),
      b = $('cv').getBoundingClientRect();
    return { x: b.left + q[0], y: b.top + q[1] };
  };
  let dragging = null,
    choices = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    choices = dragCandidates(state.scene);
    // the frame keeps its scale while the handle is held, so the pointer and the point stay together
    frozen = { plate: plateTo(state.scene === 'rodrigues' ? 4 * calc().tan.x : 2 * calc().tan.x), opts: { radius: opts.radius, cx: opts.cx, cy: opts.cy } };
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top,
      now = railOf(state.scene);
    if (state.scene === 'rivets' || state.scene === 'ergodic') choices = dragCandidates(state.scene);
    let best = now,
      gap = Infinity;
    for (const t of choices) {
      const p = sc.p(handleWorld(state.scene, t)),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(now - t) * 1e-3;
      if (d < gap) {
        gap = d;
        best = t;
      }
    }
    if (best !== now) setRail(best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointercancel = handle.onpointerup;
  handle.onlostpointercapture = () => {
    dragging = null;
    frozen = null;
    handle.classList.remove('dragging');
    paint();
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    const r = RAIL[state.scene],
      up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    // steps of the rail are taken from whole multiples, so a press never lands between two of them
    const t = ev.key === 'Home' ? 0 : ev.key === 'End' ? r.max : (Math.round(clock.t / r.step) + (up ? 1 : -1)) * r.step;
    setRail(onGrid(t));
  };
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const DRAWER = {
    err: (say) => BENCH.err.map((t) => say(`s = ${sName(t)} 时 x ${xText(t)}、A<sub>err</sub> ${errText(t)}`, `at s = ${sName(t)}, x ${xText(t)} and A<sub>err</sub> ${errText(t)}`)).join(say('；', '; ')),
    flat: () => alone(flatText(BENCH.coax)),
    axis: () => alone(axisText(BENCH.coax))
  };
  /** The text of the NUM box: every number in it is taken from BENCH. */
  function numText(say) {
    const { coax, at, drift, ledgers, euclid, phases: P4, laps, fixed: F } = BENCH,
      list = say('、', ', '),
      and = say(' 与 ', ' and '),
      gcos = quotient(...gapCos(coax)),
      acos = quotient(...axisCos(coax)),
      vec = (k) => `(${k.map((e) => String(e).replace('-', '−')).join(', ')})`,
      kept = F.closure.kept.filter(Boolean).length,
      last = PRIMES[PRIMES.length - 1],
      zeta = F.euler,
      ind = F.independence,
      [near0, near1] = nearMiss(ind.witness),
      best = Math.max(...F.equi.log),
      size = LOGS.length;
    return say(
      `打开页面时由脚本现算，不检验各条定理的前提。切线放大：${DRAWER.err(say)}。单位四元数模型（o = 1，P = cos θ + sin θ·i，s = k/100，k = 0 … ${BENCH.sweep - 1}）：(1 + ⟨o, P⟩)/2 与 1 − dist²/4 的浮点偏差 ${below(drift.model)}；s = ${sName(at)} 时 dist ${distText(at, BENCH.dist)}，κ ${kappaText(at)}。四元数堆（x₀ = 1，x₁ = P，只用乘法到 n = ${CHEB_N}，同一组 s）：模方、U<sub>n</sub> 的向量式与 T<sub>n</sub> 的内积式，最大浮点偏差 ${below(drift.heap)}。合成（s = ${sName(coax)}，x ${xText(coax)}）：同轴弯曲 ${alone(turnText(coax))}，平直 ${alone(flatText(coax))}，差 arccos(${gcos}) ${gapText(coax)}；正交弯曲 ${alone(bothText(coax))}，平直 ${alone(bothFlatText(coax))}，转轴偏 ½ arccos(${acos}) ${axisText(coax)}；同一组 s 上转子乘积与公式的浮点偏差 ${below(drift.compose)}，½(x₁x₂ − x₂x₁) 的标量部分 ${below(drift.scalar)}，向量部分与 x₁ × x₂ 的浮点偏差 ${below(drift.cross)}。拉格朗日恒等式：s = ${sName(coax)} 时两边都是 x⁴ ${fourthText(coax, BENCH.lagrange)}；同一组 s 上两边的浮点偏差 ${below(drift.lagrange)}。绝对值：|·|<sub>∞</sub> 与 p = ${PRIMES[0]} … ${last} 的 |·|<sub>p</sub> 共 ${F.ostrowski.values} 个，由 |p|<sub>p</sub> &lt; 1 逐对分开，${tally(F.ostrowski.separated, F.ostrowski.pairs, say)}。乘积公式：N = 1 … ${ledgers.count} 用整数逐次除尽后乘积等于 1，${tally(ledgers.one, ledgers.count, say)}（${ledgers.shown.map((A) => `${ledger(A)} = ${A.product}`).join(list)}）；分数 a/b（a、b = 1 … ${N_MAX}）用整数核对，${tally(F.product.balanced, F.product.fractions, say)}；双精度的 ln N − Σ v<sub>p</sub>(N) ln p 的浮点偏差 ${below(drift.logs)}。观测距离：x = N、y = 0，按定义读出的指数 1 − k 与 −v<sub>p</sub>(N) 比较，${tally(F.observe.equal, F.observe.pairs, say)}。强三角不等式：读数 x mod p<sup>k+1</sup>（p = 2、3、5，视界 ${F.ultrametric.horizon}），x、y、z = 1 … ${N_MAX}，${tally(F.ultrametric.triples - F.ultrametric.violations, F.ultrametric.triples, say)}。素数逃逸：N = ${euclid.N}，S = {${euclid.S.join(', ')}}，${euclid.S.join('·')} + 1 = ${euclid.value}，它对 S 中素数的余数是 ${different(euclid.residues).join(list)}，q = ${euclid.q}（定理不说 N 本身就是那个新素数）。欧拉乘积：s = 2，截到 ${zeta.cut}，级数 ${nearRel(zeta.sum)}，乘积 ${nearRel(zeta.product)}，π²/6 ${nearRel(zeta.limit)}。素数对数：绝对值不超过 ${ind.range} 的 ${ind.vectors} 组非零整系数里使 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1 的有 ${ind.zeros} 组（用整数比较）；最接近的是 ${near0} 对 ${near1}，|a ln 2 + b ln 3 + c ln 5| ${nearRel(ind.least)}。轨道闭包的有理一侧：g = (ζ, ζ², ζ³)，ζ = e<sup>2πi/${CELLS}</sup>，k = ${F.closure.relations.map(vec).join(and)} 的特征在 g 上等于 1，${tally(kept, F.closure.relations.length, say)}，前一条在点 (1, −1, 1) 上等于 ${String(F.closure.broken).replace('-', '−')}，所以这一点不在闭包里。等分布：g = (e<sup>2πi ln 2</sup>, e<sup>2πi ln 3</sup>, e<sup>2πi ln 5</sup>)，N = ${F.equi.n}，${F.equi.log.length} 个非平凡特征平均的最大模 ${nearRel(best)}。笼子：V − E + F = ${eulerText()}，F₅ = ${CAGE.F5}，F₆ = ${CAGE.F6}，𝔽₂ 上边界的秩是 ${CAGE.rank} = F − 1 = E − V + 1，核维数是 ${CAGE.kernel}。相位：τ ${tauText(P4.tau)} 时 ${size} 只环转到 ${phaseList(P4, list)}。格子：${laps.total} 个相位格里，到 ${laps.laps} 圈为止 1 : 2 : 3 到过 ${laps.ratioCells}/${laps.total} ${shareText(laps.ratioCells, laps.total, 2)}，ln 2 : ln 3 : ln 5 到过 ${laps.logCells}/${laps.total} ${shareText(laps.logCells, laps.total, 2)}；这是这一个格子划分上的数值事实，稠密性由上面的推导给出。数值演示，不是证明。`,
      `Computed by the script when the page opens; it does not check the hypotheses of the theorems. Tangent magnification: ${DRAWER.err(say)}. The unit-quaternion model (o = 1, P = cos θ + sin θ·i, s = k/100, k = 0 … ${BENCH.sweep - 1}): (1 + ⟨o, P⟩)/2 against 1 − dist²/4, floating-point drift ${below(drift.model)}; at s = ${sName(at)}, dist ${distText(at, BENCH.dist)} and κ ${kappaText(at)}. The quaternion heap (x₀ = 1, x₁ = P, by products alone to n = ${CHEB_N}, the same s): the squared norms, the vector form with U<sub>n</sub> and the inner product with T<sub>n</sub>, largest floating-point drift ${below(drift.heap)}. Composition (s = ${sName(coax)}, x ${xText(coax)}): coaxial curved ${alone(turnText(coax))}, flat ${alone(flatText(coax))}, gap arccos(${gcos}) ${gapText(coax)}; orthogonal curved ${alone(bothText(coax))}, flat ${alone(bothFlatText(coax))}, axis off by ½ arccos(${acos}) ${axisText(coax)}; over the same s the rotor product against the formula, floating-point drift ${below(drift.compose)}, the scalar part of ½(x₁x₂ − x₂x₁) ${below(drift.scalar)}, its vector part against x₁ × x₂, floating-point drift ${below(drift.cross)}. Lagrange identity: at s = ${sName(coax)} both sides are x⁴ ${fourthText(coax, BENCH.lagrange)}; over the same s the two sides, floating-point drift ${below(drift.lagrange)}. Absolute values: |·|<sub>∞</sub> and the |·|<sub>p</sub> with p = ${PRIMES[0]} … ${last} are ${F.ostrowski.values}, separated pair by pair by |p|<sub>p</sub> &lt; 1, ${tally(F.ostrowski.separated, F.ostrowski.pairs, say)}. Product formula: N = 1 … ${ledgers.count} divided out in whole numbers leaves the product 1, ${tally(ledgers.one, ledgers.count, say)} (${ledgers.shown.map((A) => `${ledger(A)} = ${A.product}`).join(list)}); the fractions a/b (a, b = 1 … ${N_MAX}) in whole numbers, ${tally(F.product.balanced, F.product.fractions, say)}; ln N − Σ v<sub>p</sub>(N) ln p in doubles, floating-point drift ${below(drift.logs)}. Observation distance: x = N, y = 0, the exponents 1 − k read by the definition against −v<sub>p</sub>(N), ${tally(F.observe.equal, F.observe.pairs, say)}. Strong triangle inequality: readouts x mod p<sup>k+1</sup> (p = 2, 3, 5, horizon ${F.ultrametric.horizon}), x, y, z = 1 … ${N_MAX}, ${tally(F.ultrametric.triples - F.ultrametric.violations, F.ultrametric.triples, say)}. Escaping prime: N = ${euclid.N}, S = {${euclid.S.join(', ')}}, ${euclid.S.join('·')} + 1 = ${euclid.value}, its remainder at the primes of S is ${different(euclid.residues).join(list)}, q = ${euclid.q} (the theorem does not say that N itself is the new prime). Euler product: s = 2, cut at ${zeta.cut}, series ${nearRel(zeta.sum)}, product ${nearRel(zeta.product)}, π²/6 ${nearRel(zeta.limit)}. Prime logarithms: of the ${ind.vectors} nonzero integer vectors with entries up to ${ind.range}, ${ind.zeros} give 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1 (compared in whole numbers); the closest is ${near0} against ${near1}, |a ln 2 + b ln 3 + c ln 5| ${nearRel(ind.least)}. The rational side of the orbit closure: g = (ζ, ζ², ζ³), ζ = e<sup>2πi/${CELLS}</sup>, the characters of k = ${F.closure.relations.map(vec).join(and)} are 1 on g, ${tally(kept, F.closure.relations.length, say)}, and the first is ${String(F.closure.broken).replace('-', '−')} at the point (1, −1, 1), which is therefore not in the closure. Equidistribution: g = (e<sup>2πi ln 2</sup>, e<sup>2πi ln 3</sup>, e<sup>2πi ln 5</sup>), N = ${F.equi.n}, the largest modulus among the averages of ${F.equi.log.length} nontrivial characters ${nearRel(best)}. The cage: V − E + F = ${eulerText()}, F₅ = ${CAGE.F5}, F₆ = ${CAGE.F6}, the boundary over 𝔽₂ has rank ${CAGE.rank} = F − 1 = E − V + 1 and a kernel of dimension ${CAGE.kernel}. Phases: at τ ${tauText(P4.tau)} the ${size} rings stand at ${phaseList(P4, list)}. Cells: of the ${laps.total} phase cells, up to ${laps.laps} turns 1 : 2 : 3 has met ${laps.ratioCells}/${laps.total} ${shareText(laps.ratioCells, laps.total, 2)} and ln 2 : ln 3 : ln 5 has met ${laps.logCells}/${laps.total} ${shareText(laps.logCells, laps.total, 2)}; this is a numerical fact of this one grid, density is given by the derivation above. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [['zh', ZH], ['en', EN]]) {
    $('numEvidenceBody').querySelector('.' + lang).innerHTML = keep(numText(say));
    for (const el of document.querySelectorAll(`#drawer .${lang} [data-bench]`)) el.innerHTML = keep(DRAWER[el.dataset.bench](say));
  }
  // the drawer repeats every evidence box of the panel, filled (an id stays on the panel)
  $('drawerEvidence').append(
    ...[...document.querySelectorAll('#basis .lean')].map((el) => {
      const copy = el.cloneNode(true);
      for (const x of [copy, ...copy.querySelectorAll('[id]')]) x.removeAttribute('id');
      return copy;
    })
  );
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  const plain = (x) => JSON.parse(JSON.stringify(x, (k, v) => (v === Infinity ? 'Infinity' : v)));
  window.REAL_PRIME_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        ...m,
        s: state.s,
        N: state.N,
        gear: state.gear,
        tau4: state.tau4,
        tau5: state.tau5,
        scene: state.scene,
        lens: state.lens,
        cam: state.cam,
        regime: regime(),
        weights: weights(),
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        unit: sc.unit,
        instances: instances(m)
      });
    },
    /** The mathematics at s, N and τ, without touching the page. */
    calc: (s, N = 1, tau = 0) => {
      const m = { tan: tangentOf(s), rod: rodriguesOf(s), ade: adelicOf(N), orb4: orbitOf(tau), orb5: orbitOf(tau) };
      return plain({ ...m, instances: instances(m) });
    },
    presets: plain(presets),
    cage: plain({ verts: CAGE.verts, faces: CAGE.faces }),
    constants: plain({ S_MAX, N_MAX, TAU4, TAU5, GRID, TICK, STILL1, STILL2, STILL3, STILL4, STILL5, CELLS, LAPS, CHEB_N, LOGC, RAY, GIMBAL, TR, Tr }),
    /** The numbers of the NUM box and of the drawer, as computed when the page opened. */
    bench: () => plain(BENCH),
    /** Every printed value of a frame after its relation, without touching the page: at s; at τ; a share of cells; ln N; a drift. */
    said: Object.freeze({
      s: (v) => {
        const r = rodriguesOf(v),
          m = { tan: tangentOf(v), rod: r, ade: LEDGERS[0] },
          I = instances(m);
        return { s: sText(m.tan), kappa: kappaText(m.tan), err: errText(m.tan), x: xText(m.tan), double: doubleText(m.tan), dist: distText(m.tan, I.model.dist), theta: thetaText(m.tan), left: leftText(m.tan), denom: denomText(r), turn: turnText(r), flat: flatText(r), gap: gapText(r), both: bothText(r), bothFlat: bothFlatText(r), axis: axisText(r), fourth: fourthText(m.tan, I.lagrange.left), scale: m.tan.S ? scaleText(m) : '' };
      },
      tau: (tau) => ({ tau: tauText(tau), phases: orbitOf(tau).log.map((a) => phaseText(tau, a)) }),
      share: shareText,
      log: logText,
      below
    }),
    /** Viewport coordinates of the amber handle at the rail value t, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of a world point of the stage. */
    project: (p) => {
      const q = sc.p(p),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + q[0], y: b.top + q[1] };
    }
  });
  window.TRV_THUMB = () => {
    cards.pick(COVER);
    clock.pause();
    clock.set(presets[COVER].still);
    paint.now();
  };
  const COVER = CARD3;
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
