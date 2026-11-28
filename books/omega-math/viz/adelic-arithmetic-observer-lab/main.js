/* OMEGA//ARC · 阿代尔算术、自由群与观察者画布实验室 · adelic arithmetic, free group and observer canvas (Chapters 13, 14, 16, 17)
   World (kit.solid): z up. Four scenes, one solid each, with their readings:
     horizon  escape   the residue rods of the first k primes and the escape rod of q = minPrimeDiv(1 + ∏S); rail k
              ladder   the P × Q rectangle cut into squares by Euclid's algorithm, the convergents (pₙ, qₙ) as beads; rail n
              depth    the ball with the polar cap of area share (c/d)/4^{N+1} against the tolerance cap p/q; rail N
     adelic   tree     the 6-valent tree of reduced words in the six generators of norm 5, levels 0 … 5; rail L
              balance  columns ln|r|ᵥ laid end to end over the places ∞, 2, 3, 5, …, back to the unit level; rail j
     machine  fractran five prime registers as abacus rods; P_Ω moves beads from 2¹⁷ to 22; rail t
              mat2     four 2 × 2 bar matrices A², −tr(A)A, det(A)I and their running sum, which ends flat; rail: terms
     canvas   the static violet ball and the amber focus rolling on a rhumb line with cos²α = κ_time; rail: beats of
              structural time (Schur innovation + comparison-graph cycle increment, as in the example of §17.3)
   Every number of the ledger is an integer or a reduced fraction [p, q] of big integers, q > 0; the drawing alone uses
   doubles. Read-only probe: window.ARCLAB_DEBUG. */
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
  const lerp3 = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fix = (x, d = 4) => kit.fix(x, d);
  const ease = (t) => t * t * (3 - 2 * t);

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
    ONE = [1n, 1n];
  const plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d),
    over = ([a, b], [c, d]) => frac(a * d, b * c);
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const same = (x, y) => x[0] === y[0] && x[1] === y[1];
  const fval = ([p, q]) => Number(p) / Number(q);
  const bstr = (n) => String(n).replace('-', '−');
  const fstr = ([p, q]) => bstr(p) + (q === 1n ? '' : '/' + q);
  const sub1 = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  const sup1 = (n) =>
    String(n)
      .replace('-', '⁻')
      .replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  const pow = (b, e) => b ** BigInt(e);
  const mat = (A) => `[[${bstr(A[0])}, ${bstr(A[1])}], [${bstr(A[2])}, ${bstr(A[3])}]]`;

  /* ---------- 1. the arithmetic horizon (Chapter 13) ---------- */
  const PRIMES = [2n, 3n, 5n, 7n, 11n, 13n, 17n];
  const KMAX = PRIMES.length;
  /** The least divisor d ≥ 2 of n ≥ 2: the bounded search over 2 … n of §13.2 (trial division up to √n). */
  function minPrimeDiv(n) {
    if (n % 2n === 0n) return 2n;
    for (let d = 3n; d * d <= n; d += 2n) if (n % d === 0n) return d;
    return n;
  }
  function factorize(n) {
    const out = [];
    let m = babs(n);
    while (m > 1n) {
      const p = minPrimeDiv(m);
      let e = 0;
      while (m % p === 0n) {
        m /= p;
        e++;
      }
      out.push([p, e]);
    }
    return out;
  }
  const facStr = (fs) => (fs.length ? fs.map(([p, e]) => (e === 1 ? String(p) : `${p}${sup1(e)}`)).join(' × ') : '1');
  /** S = the first k primes, N = 1 + ∏S, q its least prime factor (it is never in S). */
  function escapeOf(k) {
    const S = PRIMES.slice(0, k),
      prod = S.reduce((a, p) => a * p, 1n),
      N = prod + 1n,
      q = minPrimeDiv(N);
    return { k, S, prod, N, q, cof: N / q, rems: S.map((p) => N % p), fresh: !S.includes(q), qPrime: minPrimeDiv(q) === q, factors: factorize(N), bezout: S.map((p) => ({ p, m: prod / p, value: N - (prod / p) * p })) };
  }
  const ESC = range(KMAX + 1).map(escapeOf);

  /** The continued fraction of P/Q by Euclid's algorithm and the convergent pairs of its prefixes, exactly as in Lean:
      from (current, previous) = ((1, 0), (0, 1)), each coefficient a gives (a·current + previous, current). */
  function cfOf(Pn, Qn) {
    const a = [];
    let x = BigInt(Pn),
      y = BigInt(Qn);
    while (y > 0n) {
      a.push(x / y);
      [x, y] = [y, x % y];
    }
    let cur = [1n, 0n],
      prev = [0n, 1n];
    const pairs = a.map((ai) => {
      [cur, prev] = [[ai * cur[0] + prev[0], ai * cur[1] + prev[1]], cur];
      return { cur, prev, det: cur[0] * prev[1] - prev[0] * cur[1], count: 0 };
    });
    pairs.forEach((p, i) => (p.count = i + 1));
    return { P: BigInt(Pn), Q: BigInt(Qn), a, pairs, g: x, m: a.length - 1 };
  }
  /** The Euclid squares of the P × Q rectangle: coefficient i cuts aᵢ squares, along x when i is even, along y when odd. */
  function squaresOf(Pn, Qn, a) {
    let x0 = 0,
      y0 = 0,
      w = Pn,
      h = Qn;
    const out = [];
    a.forEach((ai, i) => {
      const n = Number(ai);
      if (i % 2 === 0) {
        for (let j = 0; j < n; j++) out.push({ g: i, x: x0 + j * h, y: y0, s: h });
        x0 += n * h;
        w -= n * h;
      } else {
        for (let j = 0; j < n; j++) out.push({ g: i, x: x0, y: y0 + j * w, s: w });
        y0 += n * w;
        h -= n * w;
      }
    });
    return out;
  }
  const NMAX = 5;
  /** quarterDepth as in Lean: how often 4dp is multiplied by 4 before it exceeds cq; and the budget at every depth. */
  function depthOf(c, d, p, q) {
    const C = BigInt(c),
      D = BigInt(d),
      Pp = BigInt(p),
      Qq = BigInt(q),
      cq = C * Qq,
      dp = D * Pp;
    let N0 = 0,
      bound = dp * 4n;
    while (!(cq < bound)) {
      bound *= 4n;
      N0++;
    }
    const rows = range(NMAX + 1).map((N) => {
      const rhs = dp * pow(4n, N + 1);
      return { N, rhs, ok: cq < rhs, share: frac(C, D * pow(4n, N + 1)) };
    });
    return { c: C, d: D, p: Pp, q: Qq, cq, dp, N0, rows, eps: frac(Pp, Qq), bound: frac(C, D) };
  }

  /* ---------- 2. adelic product and the free group (Chapter 14) ---------- */
  /** |r|∞ and |r|ₚ = p^{−vₚ(r)} over the primes of r, and the running product over the places ∞, p₁, p₂, … */
  function balanceOf(Pn, Qn) {
    const r = frac(Pn, Qn),
      a = babs(r[0]),
      b = r[1];
    const fa = factorize(a),
      fb = factorize(b),
      primes = [...new Set([...fa, ...fb].map((x) => x[0]))].sort((x, y) => (x < y ? -1 : 1));
    const vp = (fs, p) => (fs.find((x) => x[0] === p) || [p, 0])[1];
    const places = [{ v: '∞', val: null, f: frac(a, b) }].concat(
      primes.map((p) => {
        const v = vp(fa, p) - vp(fb, p);
        return { v: p, val: v, f: v >= 0 ? frac(1n, pow(p, v)) : frac(pow(p, -v), 1n) };
      })
    );
    const running = [ONE];
    places.forEach((pl) => running.push(times(running[running.length - 1], pl.f)));
    return { r, a, b, places, running, product: running[running.length - 1], J: places.length, powers: primes.map((p) => [p, vp(fa, p) - vp(fb, p)]) };
  }
  /** The six generators of norm 5 with the residue factors (u, v, s, t) that Lean lists for them. */
  const GENS = [
    { q: [1, 2, 0, 0], name: '1+2i', axis: [1, 0, 0], f: [0, 1, 0, 2] },
    { q: [1, -2, 0, 0], name: '1−2i', axis: [-1, 0, 0], f: [1, 0, 2, 0] },
    { q: [1, 0, 2, 0], name: '1+2j', axis: [0, 1, 0], f: [1, 3, 1, 2] },
    { q: [1, 0, -2, 0], name: '1−2j', axis: [0, -1, 0], f: [1, 2, 1, 3] },
    { q: [1, 0, 0, 2], name: '1+2k', axis: [0, 0, 1], f: [1, 4, 1, 4] },
    { q: [1, 0, 0, -2], name: '1−2k', axis: [0, 0, -1], f: [1, 1, 1, 1] }
  ];
  const mod5 = (x) => ((x % 5n) + 5n) % 5n;
  const splitZ = ([w, x, y, z]) => [w + 2n * x, y + 2n * z, 2n * z - y, w - 2n * x];
  const outer = ([u, v, s, t]) => [u * s, u * t, v * s, v * t].map(mod5);
  const mul2 = (A, B) => [A[0] * B[0] + A[1] * B[2], A[0] * B[1] + A[1] * B[3], A[2] * B[0] + A[3] * B[2], A[2] * B[1] + A[3] * B[3]];
  const SPLIT = GENS.map((g) => {
    const Zq = g.q.map(BigInt),
      S = splitZ(Zq),
      S5 = S.map(mod5),
      F = g.f.map(BigInt),
      O = outer(F);
    return { S, S5, F, O, rankOne: S5.every((v, k) => v === O[k]), nonzero: S5.some((v) => v !== 0n), zeroWith: GENS.map((h) => mul2(S5, splitZ(h.q.map(BigInt)).map(mod5)).map(mod5).every((v) => v === 0n)) };
  });
  const LMAX = 5;
  const wordsAt = (l) => (l === 0 ? 1n : 6n * pow(5n, l - 1));
  const WORDS = range(LMAX + 1).map(wordsAt);
  /** The drawing of the tree: level l steps 0.92·0.42^{l−1} along the axis of its generator. */
  const LAMBDA = 0.42,
    STEP0 = 0.92;
  const TREE = (() => {
    const levels = [[{ pos: [0, 0, 0], last: -1, parent: -1 }]];
    for (let l = 1; l <= LMAX; l++) {
      const prev = levels[l - 1],
        cur = [],
        len = STEP0 * LAMBDA ** (l - 1);
      prev.forEach((n, pi) =>
        GENS.forEach((g, gi) => {
          if (n.last >= 0 && gi === (n.last ^ 1)) return;
          cur.push({ pos: add(n.pos, scale(g.axis, len)), last: gi, parent: pi });
        })
      );
      levels.push(cur);
    }
    return levels;
  })();
  /** The point of the tree reached by the first l letters of a word. */
  const pathPoint = (l, word = state.word) => word.slice(0, l).reduce((p, g, i) => add(p, scale(GENS[g].axis, STEP0 * LAMBDA ** i)), [0, 0, 0]);
  /** 5^L R(w) for a reduced word w as an integer 3 × 3 matrix: the product of the adjoint matrices 5R(g). */
  const ADJ5 = [
    [5, 0, 0, 0, -3, -4, 0, 4, -3],
    [5, 0, 0, 0, -3, 4, 0, -4, -3],
    [-3, 0, 4, 0, 5, 0, -4, 0, -3],
    [-3, 0, -4, 0, 5, 0, 4, 0, -3],
    [-3, -4, 0, 4, -3, 0, 0, 0, 5],
    [-3, 4, 0, -4, -3, 0, 0, 0, 5]
  ].map((r) => r.map(BigInt));
  const mm3 = (A, C) => range(9).map((i) => range(3).reduce((acc, k) => acc + A[3 * Math.floor(i / 3) + k] * C[3 * k + (i % 3)], 0n));
  function wordOf(word) {
    const M = word.reduce((acc, g) => mm3(acc, ADJ5[g]), [1n, 0n, 0n, 0n, 1n, 0n, 0n, 0n, 1n]),
      L5 = word.length;
    // R(w) = M / 5^L in lowest terms: its denominator is 5^L exactly when some entry of M is not divisible by 5
    return { word: word.slice(), M, M5: M.map(mod5), L: L5, exact: L5 === 0 || M.some((x) => x % 5n !== 0n) };
  }

  /* ---------- 3. scalar FRACTRAN and Mat₂ (Chapter 16) ---------- */
  const RULES = [
    [11n, 49n],
    [7n, 25n],
    [5n, 9n],
    [3n, 4n]
  ];
  const REG = [2n, 3n, 5n, 7n, 11n];
  /** One step: the first rule whose denominator divides n fires; none: the machine halts. */
  function fstep(n) {
    const enabled = RULES.map(([, b]) => n % b === 0n),
      i = enabled.indexOf(true);
    return i < 0 ? { enabled, i: -1, m: null } : { enabled, i, m: (n / RULES[i][1]) * RULES[i][0] };
  }
  const regsOf = (n) =>
    REG.map((p) => {
      let e = 0;
      while (n % p === 0n) {
        n /= p;
        e++;
      }
      return e;
    });
  const TRACE = (() => {
    const states = [2n ** 17n],
      steps = [];
    for (let guard = 0; guard < 64; guard++) {
      const st = fstep(states[states.length - 1]);
      steps.push(st);
      if (st.i < 0) break;
      states.push(st.m);
    }
    return { states, steps, regs: states.map(regsOf) };
  })();
  const TMAX = TRACE.states.length - 1;
  const RULE_STR = ['11/49', '7/25', '5/9', '3/4'];
  // rule i moves two beads of register 3 − i into one bead of register 4 − i
  const srcOf = (i) => 3 - i,
    dstOf = (i) => 4 - i;

  const I2 = [1n, 0n, 0n, 1n],
    Z2 = [0n, 0n, 0n, 0n];
  const madd = (A, B) => A.map((x, i) => x + B[i]),
    msc = (k, A) => A.map((x) => k * x),
    mtr = (A) => A[0] + A[3],
    mdet = (A) => A[0] * A[3] - A[1] * A[2],
    madj = (A) => [A[3], -A[1], -A[2], A[0]];
  function matOf(S) {
    const A = S.A.map(BigInt),
      B = S.B.map(BigInt),
      A2 = mul2(A, A),
      t = mtr(A),
      d = mdet(A),
      terms = [A2, msc(-t, A), msc(d, I2)],
      partial = [Z2];
    terms.forEach((T) => partial.push(madd(partial[partial.length - 1], T)));
    const AB = mul2(A, B),
      BA = mul2(B, A);
    return { A, B, A2, tr: t, det: d, adj: madj(A), terms, partial, CH: partial[3], adjL: mul2(A, madj(A)), adjR: mul2(madj(A), A), AB, BA, trAB: mtr(AB), trBA: mtr(BA), detAB: mdet(AB), detA: d, detB: mdet(B) };
  }

  /* ---------- 4. the static canvas and the memory split (Chapter 17) ---------- */
  function isqrtN(n) {
    if (n < 2n) return n;
    let x = BigInt(Math.floor(Math.sqrt(Number(n))));
    while (x * x > n) x--;
    while ((x + 1n) * (x + 1n) <= n) x++;
    return x;
  }
  const ratSqrt = ([p, q]) => {
    const a = isqrtN(p),
      b = isqrtN(q);
    return a * a === p && b * b === q ? [a, b] : null;
  };
  /** One generation of Weyl fermions: (multiplicity, T₃, Q) for u_L, d_L, ν_L, e_L, u_R, d_R, e_R. */
  const WEYL = [
    [3, [1n, 2n], [2n, 3n]],
    [3, [-1n, 2n], [-1n, 3n]],
    [1, [1n, 2n], ZERO],
    [1, [-1n, 2n], [-1n, 1n]],
    [3, ZERO, [2n, 3n]],
    [3, ZERO, [-1n, 3n]],
    [1, ZERO, [-1n, 1n]]
  ];
  const TR_T3 = WEYL.reduce((s, [m, t]) => plus(s, times(frac(m), times(t, t))), ZERO),
    TR_Q = WEYL.reduce((s, [m, , q]) => plus(s, times(frac(m), times(q, q))), ZERO),
    WEINBERG = over(TR_T3, TR_Q);
  const deltaE = (n) => frac(BigInt(n * (n - 1)) / 2n - BigInt(3 * n - 6));
  /* Each new vertex attaches to the seed component. Additional comparisons within it close cycles.
     The first three beats reproduce §17.3. An idle loop only re-scans the seed. */
  const SEED = [1n, 0n, 0n, 0n];
  const BEAT_STATES = [null, SEED, [1, 1, 0, 0], [1, 0, 1, 0], [1, 1, 1, 1], [2, 1, 1, 0], [1, -1, 0, 1]].map((v) => v && v.map(BigInt));
  // Vertex 0 is the seed. Each entry lists older vertices with edges to the new vertex.
  const COMPARISONS = [[], [], [0], [0, 2], [0], [0, 2], [0, 3]];
  const CMAX = BEAT_STATES.length - 1;
  const dotF = (a, b) => a.reduce((acc, x, i) => plus(acc, times(x, b[i])), ZERO);
  function beatsOf(idle) {
    const basis = [SEED.map((v) => [v, 1n])],
      out = [{ t: 0, state: SEED, schur: ZERO, graph: { vertices: 1, edges: 0, components: 1, betti: 0, deltaBetti: 0 }, d: ZERO, tau: ZERO, moved: 0 }];
    let tau = ZERO,
      moved = 0,
      vertices = 1,
      edges = 0,
      betti = 0;
    const components = 1;
    for (let t = 1; t <= CMAX; t++) {
      const raw = idle ? SEED : BEAT_STATES[t],
        x = raw.map((v) => [v, 1n]);
      let perp = x;
      for (const u of basis) {
        const c = over(dotF(x, u), dotF(u, u));
        perp = perp.map((pi, i) => minus(pi, times(c, u[i])));
      }
      const n2 = dotF(perp, perp),
        schur = over(n2, dotF(x, x)),
        comparisons = idle ? [] : COMPARISONS[t];
      if (comparisons.length) vertices++;
      edges += comparisons.length;
      const nextBetti = edges - vertices + components,
        deltaBetti = nextBetti - betti,
        d = plus(schur, frac(deltaBetti));
      betti = nextBetti;
      if (cmp(n2, ZERO) > 0) basis.push(perp);
      tau = plus(tau, d);
      if (cmp(d, ZERO) > 0) moved++;
      out.push({ t, state: raw, perp, schur, graph: { vertices, edges, components, betti, deltaBetti }, d, tau, moved });
    }
    return out;
  }
  const BEATS = [beatsOf(false), beatsOf(true)];
  const NOTCH = BEATS[0][CMAX].moved;
  function canvasOf(S, t) {
    const kt = frac(S.kP, S.kQ),
      ks = minus(ONE, kt),
      root = ratSqrt(kt),
      vel = ratSqrt(ks),
      beats = BEATS[S.idle ? 1 : 0],
      beat = beats[t];
    return {
      kt,
      ks,
      sum: plus(kt, ks),
      dt2: BigInt(S.kQ),
      dtau2: BigInt(S.kP),
      dx2: BigInt(S.kQ - S.kP),
      root,
      vel,
      u: root && vel ? over(vel, plus(ONE, root)) : null,
      gamma2: S.kP > 0 ? frac(S.kQ, S.kP) : null,
      gv2: S.kP > 0 ? frac(S.kQ - S.kP, S.kP) : null,
      t,
      idle: !!S.idle,
      beat,
      tau: beat.tau,
      taus: beats.map((b) => b.tau),
      moved: beat.moved,
      nb: S.nb,
      pairs: BigInt((S.nb * (S.nb - 1)) / 2),
      dof: BigInt(3 * S.nb - 6),
      dE: deltaE(S.nb),
      trT3: TR_T3,
      trQ: TR_Q,
      weinberg: WEINBERG
    };
  }

  /* ---------- state, cards, rails ---------- */
  const SCENES = ['horizon', 'adelic', 'machine', 'canvas'];
  const MODES = { horizon: ['escape', 'ladder', 'depth'], adelic: ['tree', 'balance'], machine: ['fractran', 'mat2'], canvas: ['canvas'] };
  const STILL = { escape: 6, ladder: 6, depth: 2, tree: LMAX, balance: 5, fractran: TMAX, mat2: 3, canvas: 3 };
  const FRESH = { lens: 0, hz: 'escape', ad: 'tree', mc: 'fractran', cfP: 34, cfQ: 21, dq: [7, 2, 1, 10], gen: 0, word: [0, 2, 4, 0, 2], rP: -18, rQ: 35, A: [2, 3, 1, 4], B: [1, -2, 5, 3], kP: 16, kQ: 25, idle: 0, nb: 5 };
  const copy = (o) => JSON.parse(JSON.stringify(o));
  const state = { ...copy(FRESH), scene: 'horizon', cam: 'card', at: { ...STILL } };
  const PRESETS = {
    'euclid-cf-quarter-depth': { scene: 'horizon', play: true, still: STILL.escape, set: { hz: 'escape' } },
    'adelic-balance-and-f3-tree': { scene: 'adelic', play: true, still: STILL.tree, set: { ad: 'tree' } },
    'scalar-fractran-and-mat2': { scene: 'machine', play: true, still: STILL.fractran, set: { mc: 'fractran' } },
    'static-canvas-memory-split': { scene: 'canvas', play: true, still: STILL.canvas, set: { kP: 16, kQ: 25, idle: 0 } }
  };
  const DEFAULT = 'euclid-cf-quarter-depth';
  const RATE = { escape: 1.5, ladder: 1.6, depth: 1.1, tree: 1.1, balance: 1.2, fractran: 4.5, mat2: 0.9, canvas: 1.2 };
  const modeOf = (S) => (S.scene === 'horizon' ? S.hz : S.scene === 'adelic' ? S.ad : S.scene === 'machine' ? S.mc : 'canvas');
  const mode = () => modeOf(state);
  const cfCache = new Map();
  const cfNow = (S = state) => {
    const key = S.cfP + '/' + S.cfQ;
    if (!cfCache.has(key)) cfCache.set(key, cfOf(S.cfP, S.cfQ));
    return cfCache.get(key);
  };
  const balNow = (S = state) => balanceOf(S.rP, S.rQ);
  function railMaxOf(S) {
    switch (modeOf(S)) {
      case 'escape':
        return KMAX;
      case 'ladder':
        return Math.max(1, cfNow(S).m);
      case 'depth':
        return NMAX;
      case 'tree':
        return LMAX;
      case 'balance':
        return balNow(S).J;
      case 'fractran':
        return TMAX;
      case 'mat2':
        return 3;
      default:
        return CMAX;
    }
  }
  const railMax = () => railMaxOf(state);
  const whole = (v, max) => clamp(Math.floor(v + 1e-9), 0, max);
  function compute(S) {
    const md = modeOf(S),
      max = railMaxOf(S),
      v = S.at[md],
      k = whole(v, max);
    switch (md) {
      case 'escape':
        return { mode: md, ...ESC[k] };
      case 'ladder': {
        const cf = cfNow(S),
          n = Math.min(k, cf.m),
          pair = cf.pairs[n],
          conv = pair.cur,
          side = conv[0] * cf.Q - conv[1] * cf.P,
          err = frac(side, conv[1] * cf.Q),
          next = cf.pairs[n + 1];
        return { mode: md, cf, a: cf.a, n, pair, conv, prev: pair.prev, det: pair.det, count: pair.count, side, err, gcd: bgcd(conv[0], conv[1]), bound: next ? frac(1n, conv[1] * next.cur[1]) : null };
      }
      case 'depth': {
        const dd = depthOf(...S.dq),
          N = k;
        return { mode: md, ...dd, N, row: dd.rows[N] };
      }
      case 'tree':
        return { mode: md, L: k, words: WORDS, now: WORDS[k], total: WORDS.slice(0, k + 1).reduce((a, b) => a + b, 0n), gen: S.gen, split: SPLIT[S.gen], w: wordOf(S.word.slice(0, k)), word: S.word };
      case 'balance': {
        const b = balNow(S);
        return { mode: md, ...b, j: k, now: b.running[k] };
      }
      case 'fractran': {
        const t = k,
          N = TRACE.states[t],
          st = TRACE.steps[t];
        return { mode: md, t, N, regs: TRACE.regs[t], step: st, halted: st.i < 0, came: t > 0 ? TRACE.steps[t - 1] : null };
      }
      case 'mat2':
        return { mode: md, ...matOf(S), k };
      default:
        return { mode: md, ...canvasOf(S, k) };
    }
  }
  const calc = () => compute(state);

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const CAMS = { escape: [0.22, 0.86], ladder: [0.22, 0.98], depth: [0.35, 0.95], tree: [0.62, 0.42], balance: [0.28, 0.24], fractran: [-1.22, 0.5], mat2: [0.3, 0.62], canvas: [0, 0.42] };
  const camOf = (name) => {
    const base = CAMS[mode()];
    if (name === 'top') return [base[0], 1.32];
    if (name === 'side') return [base[0] + 0.95, 0.1];
    return base;
  };
  const opts = { canvas: $('cv'), yaw: CAMS.escape[0], pitch: CAMS.escape[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(...CAMS.escape);
  const UP = [0, 0, 1];
  const at3 = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  const lat = (h) => Math.sqrt(Math.max(0, 1 - h * h));

  /* a mesh of boxes and prisms for sc.poly: vertices, faces and one colour per face */
  const mesh = () => ({ vertices: [], faces: [], colors: [] });
  function box(m, [x0, x1], [y0, y1], [z0, z1], color, top) {
    const b = m.vertices.length;
    m.vertices.push([x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]);
    [
      [0, 3, 2, 1],
      [4, 5, 6, 7],
      [0, 1, 5, 4],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 0, 4, 7]
    ].forEach((f, i) => {
      m.faces.push(f.map((j) => j + b));
      m.colors.push(i === 1 && top ? top : color);
    });
  }
  /** A disc (prism) of radius r and thickness h centred at c, axis z: an abacus bead. */
  function disc(m, c, r, h, color, n = 12) {
    const b = m.vertices.length;
    for (let i = 0; i < n; i++) m.vertices.push([c[0] + r * cs((TAU * i) / n), c[1] + r * sn((TAU * i) / n), c[2] - h / 2]);
    for (let i = 0; i < n; i++) m.vertices.push([c[0] + r * cs((TAU * i) / n), c[1] + r * sn((TAU * i) / n), c[2] + h / 2]);
    m.faces.push(range(n).map((i) => b + n - 1 - i));
    m.colors.push(color);
    m.faces.push(range(n).map((i) => b + n + i));
    m.colors.push(color);
    for (let i = 0; i < n; i++) {
      m.faces.push([b + i, b + ((i + 1) % n), b + n + ((i + 1) % n), b + n + i]);
      m.colors.push(color);
    }
  }
  /** A small octahedron at c (a node of the tree). */
  function octa(m, c, r, color) {
    const b = m.vertices.length;
    m.vertices.push(add(c, [r, 0, 0]), add(c, [-r, 0, 0]), add(c, [0, r, 0]), add(c, [0, -r, 0]), add(c, [0, 0, r]), add(c, [0, 0, -r]));
    [
      [0, 2, 4],
      [2, 1, 4],
      [1, 3, 4],
      [3, 0, 4],
      [2, 0, 5],
      [1, 2, 5],
      [3, 1, 5],
      [0, 3, 5]
    ].forEach((f) => {
      m.faces.push(f.map((j) => j + b));
      m.colors.push(color);
    });
  }
  /** An axis-aligned bar from a to b (they differ in one coordinate) of square cross-section w; `open` leaves out the
      two end caps (the tree: thousands of bars). */
  function bar(m, a, b, w, color, open = false) {
    const lo = a.map((x, i) => Math.min(x, b[i])),
      hi = a.map((x, i) => Math.max(x, b[i]));
    const axis = lo.findIndex((x, i) => hi[i] - x > 1e-9);
    const ext = lo.map((x, i) => (hi[i] - x < 1e-9 ? [x - w / 2, x + w / 2] : [x, hi[i]]));
    const n = m.faces.length;
    box(m, ext[0], ext[1], ext[2], color);
    if (!open || axis < 0) return;
    // drop the two faces whose normal is the bar's own axis (box faces in order: z−, z+, y−, x+, y+, x−)
    for (const c of { 0: [5, 3], 1: [4, 2], 2: [1, 0] }[axis]) {
      m.faces.splice(n + c, 1);
      m.colors.splice(n + c, 1);
    }
  }
  const poly = (key, m, s = {}) => m.faces.length && sc.poly(key, { vertices: m.vertices, faces: m.faces }, { colors: m.colors, ...s });
  const tube = (key, pts, color, width, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, width, glow, occlude: false, pick: false, alpha });
  /** A circle as a keyed tube. */
  const loop = (key, c, n, r, color, width, alpha = 1) => {
    const nn = unit(n),
      e1 = unit(cross(nn, abs(nn[2]) < 0.9 ? UP : [1, 0, 0])),
      e2 = cross(nn, e1);
    tube(key, sample(96, (t) => add(c, add(scale(e1, r * cs(TAU * t)), scale(e2, r * sn(TAU * t))))), color, width, alpha, 0.35);
  };
  const ball = (key = 'ball') => sc.surface(key, at3, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });

  /* ---------- geometry of each reading (doubles, for drawing only) ---------- */
  // escape: rods of p cells along x, one row per prime, the escape rod in front
  const CW = 0.17,
    CG = 0.022,
    ROD_D = 0.19,
    ROW = 0.3,
    ROD_H = 0.12,
    QSHOW = 17;
  // row 0 at the back, row KMAX in front: the k rods of S fill rows 0 … k − 1 and the escape rod takes row k
  const ESC_X0 = -((QSHOW + 1.5) * CW) / 2,
    ESC_Y = (i) => (KMAX / 2 - i) * ROW;
  const cellX = (j) => [ESC_X0 + j * CW + CG / 2, ESC_X0 + (j + 1) * CW - CG / 2];
  const cellTop = (j, row, h = ROD_H) => [ESC_X0 + (j + 0.5) * CW, ESC_Y(row), h];
  /** The escape bead sits on cell 0 of the escape rod, in row k. */
  const escapeHere = (v) => add(cellTop(0, whole(v, KMAX)), [0, 0, 0.03]);
  // ladder: the rectangle scaled to 2.4 along its longer side, centred
  const HB = 0.085;
  function ladderGeo(cf) {
    const Pn = Number(cf.P),
      Qn = Number(cf.Q),
      s = 2.4 / Math.max(Pn, Qn),
      X = (x) => (x - Pn / 2) * s,
      Y = (y) => (y - Qn / 2) * s;
    return { Pn, Qn, s, X, Y, at: (p, q, z = HB + 0.012) => [X(p), Y(q), z], squares: squaresOf(Pn, Qn, cf.a.map(Number)) };
  }
  // depth: shares on the unit ball, cap boundary at height 1 − 2s
  const capZ = (s) => 1 - 2 * Math.min(1, s);
  const shareAt = (m, v) => fval(m.bound) / 4 ** (clamp(v, 0, NMAX) + 1);
  function depthHere(m, v) {
    const z = capZ(shareAt(m, v)),
      f = unit([cam.D[0] + 1e-6, cam.D[1], 0]);
    return scale(add(scale(UP, z), scale(f, lat(z))), 1.012);
  }
  // balance: columns at x, heights ln of the running product
  function balanceGeo(m) {
    const J = m.J,
      logs = m.running.map((r) => Math.log(fval(r) < 0 ? -fval(r) : fval(r))),
      top = Math.max(0.5, ...logs.map(abs)),
      k = 1.05 / top,
      x = (j) => (j - J / 2) * 0.44;
    return { J, logs, k, x, H: (j) => logs[j] * k };
  }
  // fractran: a landscape, one row of five register bars per state; seen from the side of register 11, time runs to the right
  const RX = (i) => (i - 2) * 0.36,
    TY = (t) => (t - TMAX / 2) * 0.16,
    BAR_W = 0.24,
    BAR_D = 0.115,
    VH = 0.072;
  const barTop = (t, i) => [RX(i), TY(t), Math.max(0.008, TRACE.regs[t][i] * VH)];
  function fractranHere(v) {
    const t = whole(v, TMAX);
    return add(barTop(t, t === 0 ? 0 : dstOf(TRACE.steps[t - 1].i)), [0, 0, 0.03]);
  }
  // mat2: four grids along x
  const GRID_X = (g) => (g - 1.5) * 0.98,
    CELL = 0.27;
  const cellCentre = (g, idx) => [GRID_X(g) + ((idx % 2) - 0.5) * (CELL + 0.03), ((idx < 2 ? 1 : 0) - 0.5) * (CELL + 0.03), 0];
  // canvas: a rhumb line from colatitude 0.55 at heading α, centred on the meridian that faces the camera
  const CDS = 0.13,
    TH0 = 0.55,
    PHI_C = -PI / 2;
  const canvasCache = new Map();
  function canvasPath(kt) {
    const key = kt.toFixed(9);
    if (canvasCache.has(key)) return canvasCache.get(key);
    const ca = Math.sqrt(kt),
      sa = Math.sqrt(Math.max(0, 1 - kt)),
      per = 16,
      raw = [[TH0, 0]];
    for (let i = 1; i <= NOTCH * per; i++) {
      const [th, ph] = raw[i - 1],
        h = CDS / per;
      raw.push([th + ca * h, ph + (sa * h) / sn(th + (ca * h) / 2)]);
    }
    const phMid = (raw[0][1] + raw[raw.length - 1][1]) / 2;
    const pts = raw.map(([th, ph]) => [th, ph - phMid + PHI_C]);
    const out = { ca, sa, per, pts, at: (s) => pts[Math.round(clamp(s, 0, NOTCH) * per)] };
    canvasCache.set(key, out);
    return out;
  }
  const sph = ([th, ph], r = 1) => scale([sn(th) * cs(ph), sn(th) * sn(ph), cs(th)], r);
  /** The notch of the focus at the rail value v: one notch for every beat that adds structural time. */
  function notchAt(v) {
    const b = BEATS[state.idle ? 1 : 0],
      t = whole(v, CMAX),
      f = clamp(v - t, 0, 1),
      next = b[Math.min(CMAX, t + 1)];
    return b[t].moved + (t < CMAX && next.moved > b[t].moved ? f : 0);
  }

  function handleWorld(v) {
    const m = calc();
    switch (m.mode) {
      case 'escape':
        return escapeHere(v);
      case 'ladder': {
        const g = ladderGeo(m.cf),
          n = whole(v, m.cf.m),
          c = m.cf.pairs[n].cur;
        return g.at(Number(c[0]), Number(c[1]), HB + 0.03);
      }
      case 'depth':
        return depthHere(m, v);
      case 'tree':
        return pathPoint(whole(v, LMAX));
      case 'balance': {
        const g = balanceGeo(m),
          j = whole(v, m.J);
        return [j === 0 ? g.x(0) : g.x(j), 0, g.H(j)];
      }
      case 'fractran':
        return fractranHere(v);
      case 'mat2': {
        const g = whole(v, 3);
        return [GRID_X(g), -(CELL + 0.12), 0.02];
      }
      default: {
        const path = canvasPath(fval(m.kt));
        return sph(path.at(notchAt(v)), 1.03);
      }
    }
  }

  /* ---------- fitting the picture between the title and the legend ---------- */
  function frameOf(m) {
    switch (m.mode) {
      case 'escape': {
        const xs = [ESC_X0 - 0.22, ESC_X0 + (QSHOW + 1.5) * CW + 0.3],
          ys = [ESC_Y(KMAX) - 0.3, ESC_Y(0) + 0.3];
        return { pts: xs.flatMap((x) => ys.flatMap((y) => [[x, y, -0.06], [x, y, ROD_H + 0.1]])) };
      }
      case 'ladder': {
        const g = ladderGeo(m.cf),
          xs = [g.X(0) - 0.12, g.X(g.Pn) + 0.12],
          ys = [g.Y(0) - 0.12, g.Y(g.Qn) + 0.12];
        return { pts: xs.flatMap((x) => ys.flatMap((y) => [[x, y, -0.05], [x, y, HB + 0.15]])) };
      }
      case 'tree':
        return { pts: [[1.62, 0, 0], [-1.62, 0, 0], [0, 1.62, 0], [0, -1.62, 0], [0, 0, 1.62], [0, 0, -1.62]] };
      case 'balance': {
        const g = balanceGeo(m),
          xs = [g.x(0) - 0.3, g.x(g.J) + 0.3],
          zs = [Math.min(0, ...g.logs) * g.k - 0.15, Math.max(0, ...g.logs) * g.k + 0.15];
        return { pts: xs.flatMap((x) => zs.flatMap((z) => [[x, -0.25, z], [x, 0.25, z]])) };
      }
      case 'fractran': {
        const xs = [RX(0) - 0.3, RX(4) + 0.3],
          ys = [TY(0) - 0.3, TY(TMAX) + 0.62];
        return { pts: xs.flatMap((x) => ys.flatMap((y) => [[x, y, -0.06], [x, y, 17 * VH + 0.1]])) };
      }
      case 'mat2': {
        const xs = [GRID_X(0) - 0.4, GRID_X(3) + 0.4];
        return { pts: xs.flatMap((x) => [[x, -0.4, -0.85], [x, 0.4, -0.85], [x, -0.4, 0.85], [x, 0.4, 0.85]]) };
      }
      case 'canvas': {
        const path = canvasPath(fval(m.kt)),
          here = path.at(notchAt(state.at.canvas)),
          X = sph(here, 1.03),
          eth = [cs(here[0]) * cs(here[1]), cs(here[0]) * sn(here[1]), -sn(here[0])],
          eph = [-sn(here[1]), cs(here[1]), 0],
          A = add(X, scale(eth, path.ca * 0.56));
        return { pts: [A, add(A, scale(eph, path.sa * 0.56))].map((p) => scale(p, 1.08)), ball: 1.05 };
      }
      default:
        return { pts: [], ball: 1.05 };
    }
  }
  const title = { key: '', top: 0 };
  function fit(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const bx = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const key = [m.mode, state.lens, state.idle, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - bx.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, bx.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const f = frameOf(m),
      r = f.ball || 0;
    let b = r ? [-r, r, -r, r] : [Infinity, -Infinity, Infinity, -Infinity];
    for (const p of f.pts) {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      b = [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }
    const [x0, x1, y0, y1] = b.map((v, i) => v + [-0.06, 0.06, -0.05, 0.06][i]);
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- drawing ---------- */
  const strong = () => (state.lens ? { exact: 0.55, flat: 1 } : { exact: 1, flat: 0.6 });
  function drawEscape(m, v) {
    const w = strong(),
      k = m.k,
      f = clamp(v - k, 0, 1),
      moving = f > 0.01 && k < KMAX,
      M = mesh();
    // the plinth
    box(M, [ESC_X0 - 0.2, ESC_X0 + (QSHOW + 1.5) * CW + 0.08], [ESC_Y(KMAX) - 0.26, ESC_Y(0) + 0.24], [-0.055, 0], P.stage);
    // the rods of S (and the next prime rising in row k while the rail moves on)
    const rows = k + (moving ? 1 : 0);
    for (let i = 0; i < rows; i++) {
      const p = Number(PRIMES[i]),
        h = i < k ? ROD_H : ROD_H * ease(f),
        y = ESC_Y(i);
      for (let j = 0; j < p; j++) box(M, cellX(j), [y - ROD_D / 2, y + ROD_D / 2], [0, h], P.ink, j === 0 ? P.dim : j === 1 ? P.cyan : null);
    }
    poly('escBase', M, { edges: P.void });
    // the escape rod of N in row k: q cells (the first QSHOW of them), magenta; while the rail moves it hands over to row k + 1
    const escRod = (key, e, row, alpha) => {
      const Q = mesh(),
        shown = Number(e.q > BigInt(QSHOW) ? BigInt(QSHOW) : e.q),
        ye = ESC_Y(row);
      for (let j = 0; j < shown; j++) box(Q, cellX(j), [ye - ROD_D / 2, ye + ROD_D / 2], [0, ROD_H], P.magenta, j === 0 ? P.amber : null);
      poly(alpha < 0.99 ? key + '~' : key, Q, { edges: P.void, alpha });
      if (e.q > BigInt(QSHOW)) tube(key + 'More', [cellTop(QSHOW, row, ROD_H / 2), add(cellTop(QSHOW, row, ROD_H / 2), [1.1 * CW, 0, 0])], P.magenta, 2, 0.7 * alpha, 0.2);
    };
    escRod('escRod', m, k, moving ? 1 - ease(f) : 1);
    if (moving) escRod('escNext', ESC[k + 1], k + 1, ease(f));
    // N lands on cell 1 of every rod of S (ink beads on the cyan cells) and on cell 0 of the escape rod
    for (let i = 0; i < k; i++) sc.bead(add(cellTop(1, i), [0, 0, 0.03]), { color: P.ink, r: 4, alpha: w.exact, key: 'n' + i });
    if (k > 1) tube('column', [add(cellTop(1, 0), [0, 0, 0.03]), add(cellTop(1, k - 1), [0, 0, 0.03])], P.ink, 1.2, 0.6 * w.exact, 0.3);
    return { here: escapeHere(v) };
  }
  function drawLadder(m, v) {
    const cf = m.cf,
      g = ladderGeo(cf),
      w = strong(),
      n = m.n,
      f = clamp(v - n, 0, 1),
      M = mesh(),
      R = mesh();
    // the plinth under the whole rectangle
    box(M, [g.X(0) - 0.05, g.X(g.Pn) + 0.05], [g.Y(0) - 0.05, g.Y(g.Qn) + 0.05], [-0.045, 0], P.stage);
    // the squares cut so far; the group of the current coefficient has cyan tops, the next one rises with the rail
    for (const s of g.squares) {
      if (s.g > n + 1 || (s.g === n + 1 && f < 0.01)) continue;
      const h = s.g === n + 1 ? HB * ease(f) : HB,
        inset = Math.min(0.012, (s.s * g.s) / 8);
      box(M, [g.X(s.x) + inset, g.X(s.x + s.s) - inset], [g.Y(s.y) + inset, g.Y(s.y + s.s) - inset], [0, h], P.violet, s.g === n ? P.cyan : null);
    }
    poly('ladBase', M, { edges: P.void });
    // what is not cut yet
    const left = g.squares.filter((s) => s.g > n);
    if (left.length) {
      const x0 = Math.min(...left.map((s) => s.x)),
        y0 = Math.min(...left.map((s) => s.y)),
        x1 = Math.max(...left.map((s) => s.x + s.s)),
        y1 = Math.max(...left.map((s) => s.y + s.s));
      box(R, [g.X(x0) + 0.006, g.X(x1) - 0.006], [g.Y(y0) + 0.006, g.Y(y1) - 0.006], [0, 0.012], P.dim);
      poly('ladRest', R, { alpha: 0.5, edges: false, pick: false, occlude: false });
    }
    // the diagonal of slope Q/P and the convergents on either side of it
    tube('diag', [g.at(0, 0), g.at(g.Pn, g.Qn)], P.ink, 1.5, 0.75, 0.2);
    for (let j = 0; j <= n; j++) {
      const c = cf.pairs[j].cur,
        s = c[0] * cf.Q - c[1] * cf.P,
        color = s < 0n ? P.cyan : s > 0n ? P.magenta : P.ink;
      if (j < n) sc.bead(g.at(Number(c[0]), Number(c[1]), HB + 0.02), { color, r: 4.2, alpha: w.exact, key: 'cv' + j });
    }
    return { here: g.at(Number(m.conv[0]), Number(m.conv[1]), HB + 0.03), g };
  }
  function drawDepth(m, v) {
    const w = strong(),
      s = shareAt(m, v),
      eps = fval(m.eps),
      fits = s < eps;
    ball();
    // the tolerance cap p/q (cyan circle)
    if (eps < 1) loop('tol', [0, 0, capZ(eps)], UP, lat(capZ(eps)) * 1.012, P.cyan, 2.4, w.exact);
    // the caps of the earlier depths, a quarter of the area each time
    for (let k = 0; k < Math.floor(v + 1e-9); k++) {
      const sk = fval(m.rows[k].share);
      if (sk < 1) loop('cap' + k, [0, 0, capZ(sk)], UP, lat(capZ(sk)) * 1.01, P.ink, 1.1, 0.55);
    }
    // the cap of this depth: cyan when it fits inside the tolerance, magenta when not
    const th = Math.acos(capZ(s));
    sc.surface('cap~', (u, vv) => scale(at3(u, vv), 1.006), { u: [0.0001, Math.max(0.002, th)], v: [0, TAU], nu: 24, nv: 72, color: fits ? P.cyan : P.magenta, alpha: 0.55 + 0.25 * (fits ? w.exact : w.flat), grid: false, pick: false, occlude: false });
    if (s < 1) loop('now', [0, 0, capZ(s)], UP, lat(capZ(s)) * 1.016, P.amber, 2.6, 1);
    return { here: depthHere(m, v) };
  }
  function drawTree(m, v) {
    const L = m.L,
      f = clamp(v - L, 0, 1),
      M = mesh(),
      E = mesh(),
      top = L + (f > 0.01 && L < LMAX ? 1 : 0);
    for (let l = 1; l <= top; l++) {
      const grow = l === L + 1 ? ease(f) : 1,
        wdt = 0.03 * 0.62 ** (l - 1),
        color = l === top ? P.cyan : P.dim;
      for (const n of TREE[l]) {
        const a = TREE[l - 1][n.parent].pos;
        bar(E, a, lerp3(a, n.pos, grow), wdt, color, true);
      }
    }
    for (let l = 0; l <= Math.min(L, 3); l++) for (const n of TREE[l]) octa(M, n.pos, 0.085 * 0.56 ** l, l === 0 ? P.ink : P.violet);
    poly('treeEdges', E, { edges: false, occlude: false, pick: false });
    poly('treeNodes', M, { edges: false });
    // the composed word: amber up to the level of the rail, faint beyond it
    const pts = range(m.word.length + 1).map((l) => pathPoint(l, m.word)),
      cut = Math.min(L, m.word.length);
    if (cut > 0) tube('word', pts.slice(0, cut + 1), P.amber, 2.6, 1, 0.5);
    if (m.word.length > cut) tube('wordRest', pts.slice(cut), P.amber, 1.4, 0.35, 0.3);
    return { here: pathPoint(L) };
  }
  function drawBalance(m, v) {
    const g = balanceGeo(m),
      j = m.j,
      f = clamp(v - j, 0, 1),
      M = mesh(),
      w = strong();
    for (let i = 1; i <= m.J; i++) {
      if (i > j + 1 || (i === j + 1 && f < 0.01)) continue;
      const z0 = g.H(i - 1),
        z1 = i === j + 1 ? z0 + (g.H(i) - z0) * ease(f) : g.H(i),
        x = g.x(i),
        fac = cmp(m.places[i - 1].f, ONE),
        color = fac > 0 ? P.cyan : fac < 0 ? P.magenta : P.ink;
      box(M, [x - 0.13, x + 0.13], [-0.13, 0.13], abs(z1 - z0) < 0.012 ? [z0 - 0.006, z0 + 0.006] : [Math.min(z0, z1), Math.max(z0, z1)], color);
      if (i < m.J && i <= j) tube('step' + i, [[x + 0.13, 0, g.H(i)], [g.x(i + 1) - 0.13, 0, g.H(i)]], P.ink, 1.2, 0.7, 0.2);
    }
    poly('cols', M, { edges: P.void });
    // the unit level: product 1
    const xa = g.x(0) - 0.25,
      xb = g.x(m.J) + 0.25;
    sc.fan(
      [
        [xa, -0.24, 0],
        [xb, -0.24, 0],
        [xb, 0.24, 0],
        [xa, 0.24, 0]
      ],
      { fill: P.violet, alpha: 0.16, color: P.violet, width: 1.2, strokeAlpha: 0.7 * w.exact + 0.2 }
    );
    tube('lead', [[g.x(0), 0, 0], [g.x(1) - 0.13, 0, 0]], P.ink, 1.2, 0.7, 0.2);
    sc.bead([g.x(0), 0, 0], { color: P.ink, r: 4.4, key: 'start' });
    return { here: [j === 0 ? g.x(0) : g.x(j), 0, g.H(j)], g };
  }
  function drawFractran(m, v) {
    const t = m.t,
      f = clamp(v - t, 0, 1),
      M = mesh(),
      H = mesh(),
      C = mesh(),
      came = t > 0 ? dstOf(TRACE.steps[t - 1].i) : -1,
      rows = t + (f > 0.01 && t < TMAX ? 1 : 0);
    box(M, [RX(0) - 0.24, RX(4) + 0.24], [TY(0) - 0.14, TY(TMAX) + 0.16], [-0.05, 0], P.stage);
    poly('fBase', M, { edges: false });
    for (let r = 0; r <= rows; r++) {
      const grow = r === t + 1 ? ease(f) : 1,
        into = r === t ? C : H;
      TRACE.regs[r].forEach((e, i) => {
        const h = Math.max(0.008, e * VH * grow),
          y = TY(r);
        box(into, [RX(i) - BAR_W / 2, RX(i) + BAR_W / 2], [y - BAR_D / 2, y + BAR_D / 2], [0, h], r === t ? (e ? P.cyan : P.dim) : e ? P.violet : P.dim, r === t && i === came ? P.amber : null);
      });
    }
    poly('fHist', H, { edges: false });
    poly('fNow', C, { edges: false });
    return { here: fractranHere(v) };
  }
  function drawMat2(m, v) {
    const k = whole(v, 3),
      f = clamp(v - k, 0, 1),
      all = [...m.terms, ...m.partial].flat().map((x) => abs(Number(x))),
      hs = 0.72 / Math.max(1, ...all);
    const run = m.partial[k].map((x, i) => Number(x) + (k < 3 ? f * Number(m.terms[k][i]) : 0));
    const grids = [...m.terms.map((T) => T.map(Number)), run];
    grids.forEach((G, g) => {
      const M = mesh(),
        dim = g < 3 && g < k;
      G.forEach((e, idx) => {
        const c = cellCentre(g, idx),
          h = e * hs,
          color = e > 1e-9 ? P.cyan : e < -1e-9 ? P.magenta : P.ink;
        box(M, [c[0] - CELL / 2, c[0] + CELL / 2], [c[1] - CELL / 2, c[1] + CELL / 2], abs(h) < 0.008 ? [-0.004, 0.004] : [Math.min(0, h), Math.max(0, h)], color);
      });
      poly('grid' + g + (dim ? '~' : ''), M, { edges: false, alpha: dim ? 0.38 : 1 });
      const x = GRID_X(g),
        e = CELL + 0.05;
      sc.fan(
        [
          [x - e, -e, 0],
          [x + e, -e, 0],
          [x + e, e, 0],
          [x - e, e, 0]
        ],
        { fill: P.violet, alpha: 0.12, color: g === k || (g === 3 && k === 3) ? P.amber : P.violet, width: 1.2, strokeAlpha: 0.8 }
      );
    });
    return { here: [GRID_X(k), -(CELL + 0.12), 0.02] };
  }
  function drawCanvas(m, v) {
    const w = strong(),
      path = canvasPath(fval(m.kt)),
      s = notchAt(v);
    ball();
    // the gradient of κ: meridians down from the pole (faint)
    for (let i = 0; i < 7; i++) {
      const ph = PHI_C + ((i - 3) * PI) / 7;
      tube('mer' + i, sample(40, (t) => sph([0.06 + t * (PI - 0.12), ph], 1.004)), P.ink, 0.9, 0.22, 0.1);
    }
    // the planned rhumb line and the part rolled so far
    tube('plan', path.pts.filter((_, i) => i % 2 === 0).map((p) => sph(p, 1.008)), P.ink, 1.3, 0.35, 0.1);
    const done = path.pts.slice(0, Math.round(s * path.per) + 1).map((p) => sph(p, 1.012));
    if (done.length > 1) tube('rolled', done, P.ink, 2.6, 0.95, 0.25);
    // the split of one step at the focus: the cyan time leg along the meridian, the magenta space leg along the latitude
    const here = path.at(s),
      X = sph(here, 1.03),
      eth = [cs(here[0]) * cs(here[1]), cs(here[0]) * sn(here[1]), -sn(here[0])],
      eph = [-sn(here[1]), cs(here[1]), 0],
      L0 = 0.56,
      A = add(X, scale(eth, path.ca * L0)),
      Bp = add(A, scale(eph, path.sa * L0));
    if (!state.idle) {
      if (path.ca > 1e-6) sc.arrow(X, A, { color: P.cyan, width: 2.6, headSize: 9, alpha: w.exact });
      if (path.sa > 1e-6) sc.arrow(A, Bp, { color: P.magenta, width: 2.6, headSize: 9, alpha: 0.7 + 0.3 * w.flat });
      sc.arrow(X, Bp, { color: P.ink, width: 1.5, headSize: 8, alpha: 0.75 });
    } else sc.ring(X, { color: P.ink, r: 13, normal: unit(X), key: 'idle' });
    return { here: X, A, Bp, path };
  }

  /* ---------- labels on the stage ---------- */
  function tags(m, v, drawn) {
    if (TRV.thumbMode) return;
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls);
    switch (m.mode) {
      case 'escape': {
        // each label at the end of its rod: the rods have different lengths, so the labels never stack
        for (let i = 0; i < m.k; i++) N('p' + i, [ESC_X0 + Number(PRIMES[i]) * CW + 0.12, ESC_Y(i), 0.06], String(PRIMES[i]), 'c-ik');
        N('q', [ESC_X0 + (m.q > BigInt(QSHOW) ? QSHOW + 1.4 : Number(m.q)) * CW + 0.2, ESC_Y(m.k), 0.06], `q = ${m.q}`, 'c-mg');
        if (m.k > 0) N('col', add(cellTop(1, 0), [0, 0.22, 0.12]), state.lens ? L('余 1', 'remainder 1') : 'N ≡ 1', 'c-cy');
        N('esc', add(cellTop(0, m.k), [0.05, -0.22, 0.05]), state.lens ? `${m.q} | ${m.N}` : 'N ≡ 0', 'c-am');
        break;
      }
      case 'ladder': {
        const g = drawn.g;
        const seen = new Set();
        for (const s of g.squares)
          if (s.g <= m.n && !seen.has(s.g) && s.s * g.s > 0.3) {
            seen.add(s.g);
            N('a' + s.g, [g.X(s.x + s.s / 2), g.Y(s.y + s.s / 2), HB + 0.02], `a${sub1(s.g)} = ${m.a[s.g]}`, 'c-ik');
          }
        N('pq', g.at(g.Pn, g.Qn, HB + 0.02), `${m.cf.P}/${m.cf.Q}`, 'c-ik');
        N('conv', add(drawn.here, [0, 0, 0.1]), `p${sub1(m.n)}/q${sub1(m.n)} = ${m.conv[0]}/${m.conv[1]}`, 'c-am');
        break;
      }
      case 'depth': {
        const eps = fval(m.eps),
          s = shareAt(m, v),
          f = unit([cam.R[0], cam.R[1], 0]);
        if (eps < 1) N('tol', add(scale(UP, capZ(eps)), scale(f, -lat(capZ(eps)) * 1.22)), `p/q = ${fstr(m.eps)}`, 'c-cy');
        const z = capZ(s);
        N('cap', add(scale(UP, Math.max(z, -0.6)), scale(f, lat(z) * 1.2 + 0.05)), s >= 1 ? L(`N = ${m.N}：份额 ≥ 1`, `N = ${m.N}: share ≥ 1`) : `N = ${m.N}: ${fstr(m.row.share)}`, 'c-am');
        break;
      }
      case 'tree': {
        GENS.forEach((g, i) => N('g' + i, scale(g.axis, STEP0 + 0.36), g.name, i === m.gen ? 'c-cy' : 'c-ik'));
        break;
      }
      case 'balance': {
        const g = drawn.g;
        for (let i = 1; i <= Math.min(m.J, m.j + (v - m.j > 0.5 ? 1 : 0)); i++) {
          const pl = m.places[i - 1],
            lo = Math.min(g.H(i - 1), g.H(i));
          N('pl' + i, [g.x(i), -0.2, lo - 0.16], `|r|${pl.v === '∞' ? '∞' : sub1(pl.v)} = ${fstr(pl.f)}`, cmp(pl.f, ONE) > 0 ? 'c-cy' : cmp(pl.f, ONE) < 0 ? 'c-mg' : 'c-ik');
        }
        N('run', add(drawn.here, [0, 0, 0.2]), `∏ = ${fstr(m.now)}`, 'c-am');
        break;
      }
      case 'fractran': {
        const y = TY(m.t);
        REG.forEach((p, i) => N('r' + i, [RX(i), TY(TMAX) + 0.42, 0.02], `v${sub1(p)} = ${m.regs[i]}`, 'c-ik'));
        RULE_STR.forEach((r, i) => {
          const x = (RX(srcOf(i)) + RX(dstOf(i))) / 2,
            cls = m.step.i === i ? 'c-am' : m.step.enabled[i] ? 'c-cy' : 'c-dm';
          N('gate' + i, [x, y, Math.max(...m.regs) * VH + 0.32], r, cls);
        });
        N('m1', [RX(4) + 0.32, TY(0), 0.02], 'M₁', 'c-ik');
        if (m.t > 0) N('mt', [RX(4) + 0.32, y, 0.02], `M${sub1(m.t + 1)}`, m.halted ? 'c-ik' : 'c-cy');
        break;
      }
      case 'mat2': {
        const names = ['A²', '−tr(A)·A', 'det(A)·I', m.k === 3 ? 'Σ = 0' : 'Σ'];
        names.forEach((s, g) => N('m' + g, [GRID_X(g), 0.42, 0.5], s, g === 3 && m.k === 3 ? 'c-am' : 'c-ik'));
        break;
      }
      default: {
        if (state.idle) {
          N('idle', add(drawn.here, [0, 0, 0.2]), '[x, x, x] = x · Δτ = 0', 'c-ik');
          break;
        }
        const mid = (a, b, d) => add(scale(add(a, b), 0.5), d);
        if (drawn.path.ca > 1e-6) N('kt', mid(drawn.here, drawn.A, [-0.16, 0, 0]), `κ<sub>time</sub> = ${fstr(m.kt)}`, 'c-cy');
        if (drawn.path.sa > 1e-6) N('ks', mid(drawn.A, drawn.Bp, [0, 0, -0.14]), `κ<sub>space</sub> = ${fstr(m.ks)}`, 'c-mg');
      }
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
    const free = (bx, dx, dy) => {
      const left = bx.left + dx,
        right = bx.right + dx,
        top = bx.top + dy,
        bottom = bx.bottom + dy;
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
    for (const [i, bx] of boxes.entries()) {
      const dx = clamp(0, bounds.left + 5 - bx.left, bounds.right - 5 - bx.right);
      const here = free(bx, dx, 0);
      if (here) {
        place(i, dx, 0, here);
        continue;
      }
      const row = bx.height + 4,
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
          const at = free(bx, dx + sx, dy);
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
  const DRAW = { escape: drawEscape, ladder: drawLadder, depth: drawDepth, tree: drawTree, balance: drawBalance, fractran: drawFractran, mat2: drawMat2, canvas: drawCanvas };
  function drawStage(m) {
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(m);
    const v = state.at[m.mode];
    sc.begin();
    const drawn = DRAW[m.mode](m, v);
    const here = drawn.here;
    sc.bead(here, { color: P.amber, r: 6.4, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    tags(m, v, drawn);
    sc.end();
    const q = sc.p(here);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- the title, the legend and the stage button ---------- */
  const kept = (html) => html.replace(/(?:&lt;|&gt;|[=≈≥≤<>]) [−+]?\d[\d./]*/g, '<span class="nb">$&</span>');
  const nameLine = (m) => (m.q === m.N ? L(`${m.N}（素数）`, `${m.N} (prime)`) : `${m.N} = ${m.q} × ${m.cof}`);
  function bigline(m) {
    const lens = state.lens;
    switch (m.mode) {
      case 'escape':
        return lens ? L(`经典 · 素数是已完成的无穷集 · N/ln N ≈ ${fix(Number(m.N) / Math.log(Number(m.N)), 1)}`, `Classical · primes as a completed infinite set · N/ln N ≈ ${fix(Number(m.N) / Math.log(Number(m.N)), 1)}`) : L(`素数逃逸 · N = ${nameLine(m)}`, `Prime escape · N = ${nameLine(m)}`);
      case 'ladder':
        return lens
          ? L(`经典 · ${m.cf.P}/${m.cf.Q} ≈ ${fix(fval([m.cf.P, m.cf.Q]), 6)} · 误差 ≈ ${fix(fval(m.err), 6)}`, `Classical · ${m.cf.P}/${m.cf.Q} ≈ ${fix(fval([m.cf.P, m.cf.Q]), 6)} · error ≈ ${fix(fval(m.err), 6)}`)
          : L(`连分数 · p${sub1(m.n)}/q${sub1(m.n)} = ${m.conv[0]}/${m.conv[1]} · 行列式 ${bstr(m.det)}`, `Continued fraction · p${sub1(m.n)}/q${sub1(m.n)} = ${m.conv[0]}/${m.conv[1]} · determinant ${bstr(m.det)}`);
      case 'depth': {
        const r = m.row;
        if (lens) {
          const est = Math.log(Number(m.cq) / Number(m.dp)) / Math.log(4) - 1;
          return L(`经典 · N ≥ log₄(cq/dp) − 1 ≈ ${Number(m.cq) > 0 ? fix(est, 4) : '−∞'}`, `Classical · N ≥ log₄(cq/dp) − 1 ≈ ${Number(m.cq) > 0 ? fix(est, 4) : '−∞'}`);
        }
        return L(`四分深度 · N = ${m.N} · ${m.cq} ${r.ok ? '&lt;' : '≥'} ${r.rhs}`, `Quarter depth · N = ${m.N} · ${m.cq} ${r.ok ? '&lt;' : '≥'} ${r.rhs}`);
      }
      case 'tree':
        return lens ? L(`经典 · 增长率 5 · ½log₂5 ≈ ${fix(Math.log2(5) / 2, 6)} 比特/门`, `Classical · growth rate 5 · ½log₂5 ≈ ${fix(Math.log2(5) / 2, 6)} bits/gate`) : L(`自由群 F₃ · L = ${m.L} · ${m.now} 个词`, `Free group F₃ · L = ${m.L} · ${m.now} words`);
      case 'balance':
        return lens
          ? L(`经典 · Σ ln|r|ᵥ ≈ ${fix(m.places.reduce((s, p) => s + Math.log(fval(p.f)), 0), 6)}`, `Classical · Σ ln|r|ᵥ ≈ ${fix(m.places.reduce((s, p) => s + Math.log(fval(p.f)), 0), 6)}`)
          : L(`阿代尔乘积 · r = ${fstr(m.r)} · ∏ = ${fstr(m.now)}`, `Adelic product · r = ${fstr(m.r)} · ∏ = ${fstr(m.now)}`);
      case 'fractran':
        return lens
          ? L(`经典 · log₂ N ≈ ${fix(Math.log2(Number(m.N)), 4)}`, `Classical · log₂ N ≈ ${fix(Math.log2(Number(m.N)), 4)}`)
          : m.halted
            ? L(`FRACTRAN · M${sub1(m.t + 1)} = ${m.N} = 2·11 · 停机`, `FRACTRAN · M${sub1(m.t + 1)} = ${m.N} = 2·11 · halt`)
            : L(`FRACTRAN · M${sub1(m.t + 1)} = ${m.N} · 门 ${RULE_STR[m.step.i]}`, `FRACTRAN · M${sub1(m.t + 1)} = ${m.N} · gate ${RULE_STR[m.step.i]}`);
      case 'mat2': {
        if (lens) return L(`经典 · 特征值 ${eig(m)}`, `Classical · eigenvalues ${eig(m)}`);
        const tr = m.tr < 0n ? `+ ${bstr(-m.tr)}` : `− ${m.tr}`,
          dt = m.det < 0n ? `− ${bstr(-m.det)}` : `+ ${m.det}`;
        return L(`凯莱—哈密顿 · A² ${tr}A ${dt}I = 0`, `Cayley–Hamilton · A² ${tr}A ${dt}I = 0`);
      }
      default:
        if (lens) return m.gamma2 ? L(`经典 · v ≈ ${fix(Math.sqrt(fval(m.ks)), 4)} · γ ≈ ${fix(Math.sqrt(fval(m.gamma2)), 4)}`, `Classical · v ≈ ${fix(Math.sqrt(fval(m.ks)), 4)} · γ ≈ ${fix(Math.sqrt(fval(m.gamma2)), 4)}`) : L('经典 · v = 1 · γ 无定义', 'Classical · v = 1 · γ undefined');
        if (m.idle) return L('空转 · [x, x, x] = x · τ = 0', 'Idle loop · [x, x, x] = x · τ = 0');
        return L(`静止画布 · ${fstr(m.kt)} + ${fstr(m.ks)} = 1 · τ = ${fstr(m.tau)}`, `Static canvas · ${fstr(m.kt)} + ${fstr(m.ks)} = 1 · τ = ${fstr(m.tau)}`);
    }
  }
  function eig(m) {
    const t = Number(m.tr),
      d = Number(m.det),
      disc = t * t - 4 * d;
    if (disc >= 0) return `≈ ${fix((t - Math.sqrt(disc)) / 2, 4)}, ${fix((t + Math.sqrt(disc)) / 2, 4)}`;
    return `≈ ${fix(t / 2, 4)} ± ${fix(Math.sqrt(-disc) / 2, 4)}i`;
  }
  function subline(m) {
    const lens = state.lens;
    switch (m.mode) {
      case 'escape':
        return lens
          ? L('经典读法：反设素数只有有限个，推出矛盾；本页只走有限步：给出 S，就算出 S 之外的素数。', 'Classical reading: assume finitely many primes and reach a contradiction; this page takes finite steps: given S, it computes a prime outside S.')
          : L(`N 在 S 的每根轴上落在青色的 1 格，在品红的新轴 q = ${m.q} 上落在 0 格。`, `On every rod of S, N sits on the cyan cell 1; on the new magenta rod q = ${m.q} it sits on cell 0.`);
      case 'ladder':
        return lens
          ? L('经典读法：实数是无穷连分数的极限；有理数的欧几里得算法有限步就停。', 'Classical reading: a real number is the limit of an infinite continued fraction; for a rational, the algorithm of Euclid stops after finitely many steps.')
          : L('欧几里得算法切出正方形；渐近分数在对角线下（青）上（品红）交替，行列式交替为 ±1。', 'Euclid cuts squares; the convergents alternate below (cyan) and above (magenta) the diagonal, determinants ±1.');
      case 'depth':
        return lens
          ? L('经典读法：用实对数 log₄ 与极限 (1/4)ᴺ → 0 求深度；整数不等式不需要它们。', 'Classical reading: the depth from the real logarithm log₄ and the limit (1/4)ᴺ → 0; the integer inequality needs neither.')
          : L('每深一步，极冠份额缩成四分之一；第一次落进青色圈 p/q 的深度就是 quarterDepth。', 'Each depth cuts the cap share to a quarter; the first cap inside the cyan circle p/q is quarterDepth.');
      case 'tree':
        return lens
          ? L('经典读法：树的边界是康托集，熵 ln 5 ≈ 1.609438；这里只数有限层。', 'Classical reading: the boundary of the tree is a Cantor set with entropy ln 5 ≈ 1.609438; here only finitely many levels are counted.')
          : L('六个模 5 生成元沿 ±x、±y、±z 分叉，每步只避开上一步的逆。', 'Six generators of norm 5 branch along ±x, ±y, ±z; each step avoids only the inverse of the last.');
      case 'balance':
        return lens
          ? L('经典读法：取对数后各位之和为 0，对数是超越数，只作浮点对照。', 'Classical reading: after logarithms the places add up to 0; the logarithms are transcendental and appear as floats only.')
          : L('柱高 ln|r|ᵥ 首尾相接（青升、品红降），最后回到紫色单位面 ∏ = 1。', 'Columns ln|r|ᵥ end to end (cyan up, magenta down) return to the violet unit level ∏ = 1.');
      case 'fractran':
        return lens
          ? L('经典读法：FRACTRAN 是图灵完备的寄存器机；这个四门程序 15 步后停机。', 'Classical reading: FRACTRAN is a Turing-complete register machine; this four-gate program halts after 15 steps.')
          : L('每一排是一个状态的素指数；第一道分母整除 N 的门（琥珀）把一个指数减 2、下一个加 1。', 'Each row: the prime exponents of one state; the first gate whose denominator divides N (amber) takes 2 from one and adds 1 to the next.');
      case 'mat2':
        return lens
          ? L('经典读法：特征多项式的根是特征值（可能是复数）；整数恒等式不需要求根。', 'Classical reading: the roots of the characteristic polynomial are the eigenvalues (possibly complex); the integer identity needs no roots.')
          : L('A²、−tr(A)·A、det(A)·I 逐项加进右边的和；加完第三项，和变平：零矩阵。', 'A², −tr(A)·A and det(A)·I are added into the sum on the right; after the third term it is flat: zero.');
      default:
        if (lens) return L('经典读法：洛伦兹因子 γ = 1/√(1 − v²) 要开平方；记忆切分只用平方之比。', 'Classical reading: the Lorentz factor γ = 1/√(1 − v²) takes a square root; the memory split uses ratios of squares only.');
        if (m.idle) return L('每拍都重扫种子：没有新结构，焦点不动，结构时间不走。', 'Every beat re-scans the seed: nothing new, the focus stays and structural time stands still.');
        return L(`画布不动，琥珀焦点按 cos²α = ${fstr(m.kt)} 滚落，每拍带来新结构就走一格：青腿² + 品红腿² = 一步²。`, `The ball stays; the amber focus rolls at cos²α = ${fstr(m.kt)}, one notch per beat of new structure: cyan leg² + magenta leg² = step².`);
    }
  }
  function legendItems(m) {
    switch (m.mode) {
      case 'escape':
        return [
          ['ik box', L('S 的素数轴', 'prime rods of S')],
          ['cy box', L('余 1 的格 · N', 'cell 1 · N')],
          ['mg box', L('逃逸素数 q', 'escape prime q')],
          ['am', L('N 落在 0 格', 'N on cell 0')]
        ];
      case 'ladder':
        return [
          ['vi box', L('欧几里得正方形', 'squares of Euclid')],
          ['cy', L('偶数阶（下）', 'even (below)')],
          ['mg', L('奇数阶（上）', 'odd (above)')],
          ['am', 'pₙ/qₙ']
        ];
      case 'depth':
        return [
          ['cy', L('容差 p/q', 'tolerance p/q')],
          ['mg box', L('份额 ≥ p/q', 'share ≥ p/q')],
          ['cy box', L('份额 &lt; p/q', 'share &lt; p/q')],
          ['am', L('当前深度', 'current depth')]
        ];
      case 'tree':
        return [
          ['vi box', L('既约词', 'reduced words')],
          ['cy', L('最新一层', 'newest level')],
          ['dm', L('较早的层', 'earlier levels')],
          ['am', L('当前词', 'current word')]
        ];
      case 'balance':
        return [
          ['cy box', '|r|ᵥ &gt; 1'],
          ['mg box', '|r|ᵥ &lt; 1'],
          ['vi box', L('单位面 ∏ = 1', 'unit level ∏ = 1')],
          ['am', L('累计积', 'running product')]
        ];
      case 'fractran':
        return [
          ['cy box', L('当前状态的指数', 'exponents now')],
          ['vi box', L('较早的状态', 'earlier states')],
          ['am', L('打开的门 · 刚加一', 'open gate · just raised')],
          ['dm', L('关闭的门', 'shut gate')]
        ];
      case 'mat2':
        return [
          ['cy box', L('正项', 'positive')],
          ['mg box', L('负项', 'negative')],
          ['am', L('当前项', 'current term')]
        ];
      default:
        return [
          ['vi box', L('静止画布', 'static canvas')],
          ['cy', 'κ<sub>time</sub>'],
          ['mg', 'κ<sub>space</sub>'],
          ['am', L('焦点', 'focus')]
        ];
    }
  }
  const ACT = { horizon: ['下一读法 ▸', 'Next reading ▸'], adelic: ['下一读法 ▸', 'Next reading ▸'], machine: ['下一读法 ▸', 'Next reading ▸'], canvas: ['空转 ↔ 吸收', 'Idle ↔ absorb'] };
  function hud(m) {
    $('hudBig').innerHTML = kept(bigline(m));
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACT[state.scene]);
    b.hidden = TRV.still;
    if (b.textContent !== text) b.textContent = text;
  }

  /* ---------- the ledger ---------- */
  const put = (id, html) => {
    const el = $(id);
    if (el.innerHTML !== html) el.innerHTML = html;
  };
  const yes = '<span class="nummark">✓</span>';
  const list = (xs) => `[${xs.map(bstr).join(', ')}]`;
  function rows(m) {
    switch (m.mode) {
      case 'escape': {
        const last = m.bezout[m.bezout.length - 1];
        return {
          key: [L('逃逸见证 N = 1 + ∏S', 'Escape witness N = 1 + ∏S'), String(m.N), m.q === m.N ? L('（素数）', ' (prime)') : ` = ${m.q} × ${m.cof}`],
          r: [
            [L(`S = 前 ${m.k} 个素数`, `S = the first ${m.k} primes`), list(m.S)],
            ['∏S · N = ∏S + 1', `${m.prod} · ${m.N}`],
            [L('N mod p，p ∈ S', 'N mod p, p ∈ S'), m.k ? `${m.rems.join(', ')} ${m.rems.every((r) => r === 1n) ? yes : '✗'}` : L('（空表，无需检验）', '(empty list, nothing to test)')],
            [L('q = minPrimeDiv(N) · 是否在 S 中', 'q = minPrimeDiv(N) · in S?'), `${m.q} · ${m.fresh ? L('不在 S 中', 'not in S') : L('在 S 中', 'in S')} ${m.fresh && m.qPrime ? yes : '✗'}`],
            [L('裴蜀证书 1·N − (∏S/p)·p', 'Bézout certificate 1·N − (∏S/p)·p'), last ? `1·${m.N} − ${last.m}·${last.p} = ${last.value} ${last.value === 1n ? yes : '✗'}` : '—'],
            [L('经典：N/ln N（浮点）', 'Classical: N/ln N (floating point)'), `≈ ${fix(Number(m.N) / Math.log(Number(m.N)), 2)}`]
          ],
          note: L(`N 不必是素数：k = 6 时 30031 = 59 × 509。完全分解 N = ${facStr(m.factors)}；在 2 … N 中搜索到的第一个因子就是 S 之外的素数。`, `N need not be prime: at k = 6, 30031 = 59 × 509. Fully, N = ${facStr(m.factors)}; the first factor found in 2 … N is a prime outside S.`)
        };
      }
      case 'ladder': {
        const sideTxt = m.side < 0n ? L('&lt; 0：在下方', '&lt; 0: below') : m.side > 0n ? L('&gt; 0：在上方', '&gt; 0: above') : L('= 0：就是 P/Q', '= 0: it is P/Q');
        return {
          key: [L(`前 ${m.count} 个系数：pₙqₙ₋₁ − pₙ₋₁qₙ`, `First ${m.count} coefficients: pₙqₙ₋₁ − pₙ₋₁qₙ`), bstr(m.det), ` = (−1)${sup1(m.count)} ${m.det === (m.count % 2 ? -1n : 1n) ? yes : '✗'}`],
          r: [
            [L('P/Q = [a₀; a₁, …]', 'P/Q = [a₀; a₁, …]'), `${m.cf.P}/${m.cf.Q} = [${m.a[0]}${m.a.length > 1 ? '; ' + m.a.slice(1).join(', ') : ''}]`],
            [`p${sub1(m.n)}/q${sub1(m.n)} · ${L('前一项', 'previous')}`, `${m.conv[0]}/${m.conv[1]} · ${m.prev[0]}/${m.prev[1]}`],
            [`p${sub1(m.n)}Q − q${sub1(m.n)}P`, `${bstr(m.side)} ${sideTxt}`],
            [`gcd(p${sub1(m.n)}, q${sub1(m.n)})`, `${m.gcd} ${m.gcd === 1n ? yes : '✗'}`],
            [`p${sub1(m.n)}/q${sub1(m.n)} − P/Q`, fstr(m.err) + (m.bound ? ` · |…| ≤ ${fstr(m.bound)} ${cmp(babsF(m.err), m.bound) <= 0 ? yes : '✗'}` : '')],
            [L('经典：P/Q 的小数（浮点）', 'Classical: P/Q as a decimal (floating point)'), `≈ ${fix(fval([m.cf.P, m.cf.Q]), 8)}`]
          ],
          note: L('行列式交替为 ±1，所以每个渐近分数都是既约分数，相邻两项之差是 ±1/(qₙqₙ₋₁)。', 'The determinants are ±1 in turn, so every convergent is a reduced fraction and adjacent ones differ by ±1/(qₙqₙ₋₁).')
        };
      }
      case 'depth': {
        const r = m.row,
          prevRhs = m.N0 > 0 ? m.dp * pow(4n, m.N0) : null;
        return {
          key: ['quarterDepth(c, d, p, q)', String(m.N0), L(` · ${m.cq} &lt; ${m.dp}·4${sup1(m.N0 + 1)} = ${m.dp * pow(4n, m.N0 + 1)}`, ` · ${m.cq} &lt; ${m.dp}·4${sup1(m.N0 + 1)} = ${m.dp * pow(4n, m.N0 + 1)}`)],
          r: [
            ['c/d · p/q', `${m.c}/${m.d} · ${m.p}/${m.q}`],
            ['cq · dp', `${m.cq} · ${m.dp}`],
            [L(`N = ${m.N}：cq 与 dp·4ᴺ⁺¹`, `N = ${m.N}: cq against dp·4ᴺ⁺¹`), `${m.cq} ${r.ok ? '&lt;' : '≥'} ${r.rhs} ${r.ok ? yes : '✗'}`],
            [L(`N = ${m.N}：(c/d)/4ᴺ⁺¹ 与 p/q`, `N = ${m.N}: (c/d)/4ᴺ⁺¹ against p/q`), `${fstr(r.share)} ${cmp(r.share, m.eps) < 0 ? '&lt;' : '≥'} ${fstr(m.eps)}`],
            [L('少一层不够：cq ≥ dp·4ᴺ⁰', 'One level less fails: cq ≥ dp·4ᴺ⁰'), prevRhs != null ? `${m.cq} ≥ ${prevRhs} ${m.cq >= prevRhs ? yes : '✗'}` : L('N₀ = 0，无更浅的深度', 'N₀ = 0, no shallower depth')],
            [L('经典：log₄(cq/dp) − 1（浮点）', 'Classical: log₄(cq/dp) − 1 (floating point)'), Number(m.cq) > 0 ? `≈ ${fix(Math.log(Number(m.cq) / Number(m.dp)) / Math.log(4) - 1, 4)}` : '−∞']
          ],
          note: L('定理只要求 quarterDepth ≤ N；整数不等式 cq &lt; dp·4ᴺ⁺¹ 与 (1/4)ᴺ⁺¹·(c/d) &lt; p/q 等价，不用对数，也不用极限。', 'The theorem asks only quarterDepth ≤ N; the integer inequality cq &lt; dp·4ᴺ⁺¹ is equivalent to (1/4)ᴺ⁺¹·(c/d) &lt; p/q, with no logarithm and no limit.')
        };
      }
      case 'tree': {
        const s = m.split,
          g = GENS[m.gen],
          zeros = GENS.filter((_, j) => s.zeroWith[j]).map((h) => h.name);
        return {
          key: [L(`长度 L = ${m.L} 的既约词数`, `Reduced words of length L = ${m.L}`), String(m.now), m.L ? ` = 6·5${sup1(m.L - 1)}` : ''],
          r: [
            [L('各层词数 L = 0 … 5 · 累计', 'Words per level L = 0 … 5 · in all'), `${m.words.join(' · ')} · ${m.total}`],
            [L(`当前词 w（${m.w.L} 个字母）：5ᴸR(w) mod 5`, `Current word w (${m.w.L} letters): 5ᴸR(w) mod 5`), m.w.L ? `${m.w.word.map((g) => GENS[g].name).join('·')} ≢ 0 → ${L('分母恰为', 'denominator exactly')} 5${sup1(m.w.L)} ${m.w.exact ? yes : '✗'}` : L('空词 = 单位元', 'empty word = identity')],
            [L(`g = ${g.name}：分裂 → mod 5`, `g = ${g.name}: split → mod 5`), `${mat(s.S)} ≡ ${mat(s.S5)}`],
            [L('外积 (u, v)ᵀ(s, t) mod 5', 'Outer product (u, v)ᵀ(s, t) mod 5'), `(${s.F[0]}, ${s.F[1]})ᵀ(${s.F[2]}, ${s.F[3]}) = ${mat(s.O)} ${s.rankOne && s.nonzero ? yes : '✗'}`],
            [L('与 g 相乘为零的 h', 'h with split5(g)·split5(h) = 0'), zeros.length === 1 && zeros[0] === GENS[m.gen ^ 1].name ? L(`只有 ${zeros[0]}（g 的逆）`, `only ${zeros[0]} (the inverse of g)`) : zeros.join(', ')],
            [L('经典：每门比特 ½log₂5（浮点）', 'Classical: bits per gate ½log₂5 (floating point)'), `≈ ${fix(Math.log2(5) / 2, 6)}`]
          ],
          note: L('模 5 下每个生成元都成为非零秩一外积，只有和自己的逆相乘才为零；第十四章由此在伴随表示里论证既约词永不回到单位元。', 'Mod 5 every generator becomes a nonzero rank-one outer product, and only its inverse multiplies it to zero; from this Chapter 14 argues in the adjoint representation that no reduced word returns to the identity.')
        };
      }
      case 'balance': {
        const sign = m.r[0] < 0n ? '−' : '',
          pw = m.powers.map(([p, e]) => `${p}${sup1(e)}`).join('·');
        return {
          key: ['|r|∞ · ∏ₚ |r|ₚ', fstr(m.product), ` ${same(m.product, ONE) ? yes : '✗'}`],
          r: [
            [L('r = P/Q（约分）', 'r = P/Q (reduced)'), fstr(m.r)],
            [L('素幂分解', 'Prime powers'), pw ? `${sign}${pw}` : `${sign}1`],
            ['|r|∞', fstr(m.places[0].f)],
            ['|r|ₚ = p⁻ᵛᵖ', m.places.slice(1).map((p) => `|r|${sub1(p.v)} = ${fstr(p.f)}`).join(' · ') || L('（没有素数）', '(no primes)')],
            [L(`累计积（第 ${m.j} 位）`, `Running product (place ${m.j})`), m.running.map((x, i) => (i === m.j ? `<b>${fstr(x)}</b>` : fstr(x))).join(' → ')],
            [L('经典：Σ ln|r|ᵥ（浮点）', 'Classical: Σ ln|r|ᵥ (floating point)'), `≈ ${fix(m.places.reduce((s, p) => s + Math.log(fval(p.f)), 0), 9)}`]
          ],
          note: L('除有限个素数外 |r|ₚ = 1；有限个因子之积恰为 1（第十四章的冻结定理，本页只算它的实例）。', 'Apart from finitely many primes |r|ₚ = 1, and the finitely many factors multiply to exactly 1 (a frozen theorem of Chapter 14; the page computes instances only).')
        };
      }
      case 'fractran': {
        const st = m.step;
        return {
          key: [`M${sub1(m.t + 1)}`, String(m.N), ` = ${m.regs.map((e, i) => (e ? `${REG[i]}${e > 1 ? sup1(e) : ''}` : '')).filter(Boolean).join('·')}`],
          r: [
            ['P<sub>Ω</sub>', '[11/49, 7/25, 5/9, 3/4]'],
            ['(v₂, v₃, v₅, v₇, v₁₁)', `(${m.regs.join(', ')})`],
            [L('分母整除 N 的门', 'Gates whose denominator divides N'), st.enabled.some(Boolean) ? RULE_STR.filter((_, i) => st.enabled[i]).join(', ') : L('没有', 'none')],
            [L('第一道门 → 唯一后继', 'First gate → the one successor'), st.i >= 0 ? `${RULE_STR[st.i]} : ${m.N} → ${st.m}` : L(`停机：${m.N} 不动`, `halt: ${m.N} stays`)],
            [L('停机检验 49, 25, 9, 4 ∤ N', 'Halting test 49, 25, 9, 4 ∤ N'), m.halted ? `${L('全部不整除', 'none divides')} ${yes}` : L('尚有门打开', 'a gate is still open')],
            [L('经典：log₂ N（浮点）', 'Classical: log₂ N (floating point)'), `≈ ${fix(Math.log2(Number(m.N)), 4)}`]
          ],
          note: L('17 = 1 + 2⁴：指数 v₂ 中的 16 逐级两两并成 v₁₁ 的 1，剩下 v₂ = 1，停在 22 = 2·11。', '17 = 1 + 2⁴: sixteen units of v₂ merge pairwise level by level into one unit of v₁₁, v₂ = 1 is left over, and the machine halts at 22 = 2·11.')
        };
      }
      case 'mat2':
        return {
          key: ['A² − tr(A)A + det(A)I', mat(m.CH), ` ${m.CH.every((x) => x === 0n) ? yes : '✗'}`],
          r: [
            ['A · B', `${mat(m.A)} · ${mat(m.B)}`],
            ['tr(A) · det(A) · adj(A)', `${bstr(m.tr)} · ${bstr(m.det)} · ${mat(m.adj)}`],
            ['A·adj(A) = adj(A)·A = det(A)I', `${mat(m.adjL)} ${same4(m.adjL, m.adjR) && same4(m.adjL, msc(m.det, I2)) ? yes : '✗'}`],
            ['tr(AB) = tr(BA)', `${bstr(m.trAB)} = ${bstr(m.trBA)} ${m.trAB === m.trBA ? yes : '✗'}`],
            ['det(AB) = det(A)det(B)', `${bstr(m.detAB)} = ${bstr(m.detA)}·${bstr(m.detB)} ${m.detAB === m.detA * m.detB ? yes : '✗'}`],
            [L('经典：特征值（浮点）', 'Classical: eigenvalues (floating point)'), eig(m)]
          ],
          note: L('凯莱—哈密顿是整数恒等式：不用特征值、复数或基底，只用加与乘。', 'Cayley–Hamilton is an identity of integers: no eigenvalues, complex numbers or bases, only addition and multiplication.')
        };
      default: {
        const b = m.beat,
          tauTxt = m.t === 0 ? L('t = 0：只有种子，τ = 0', 't = 0: the seed only, τ = 0') : m.idle ? L(`t = ${m.t}：重扫种子，Δτ = 0，τ = 0`, `t = ${m.t}: the seed again, Δτ = 0, τ = 0`) : `t = ${m.t}: Δτ = ${fstr(b.schur)} + ${b.graph.deltaBetti} · τ = ${m.taus.slice(0, m.t + 1).map(fstr).join(' → ')}`;
        return {
          key: ['κ<sub>time</sub> + κ<sub>space</sub>', `${fstr(m.kt)} + ${fstr(m.ks)} = ${fstr(m.sum)}`, ` ${same(m.sum, ONE) ? yes : '✗'}`],
          r: [
            [L('(Δτ<sub>mem</sub>)² = Δt² − Δx²（Δt² = Q）', '(Δτ<sub>mem</sub>)² = Δt² − Δx² (Δt² = Q)'), `${m.dtau2} = ${m.dt2} − ${m.dx2} ${m.dtau2 === m.dt2 - m.dx2 ? yes : '✗'}`],
            [L('Δτ<sub>mem</sub>/Δt · v · u（有理时）', 'Δτ<sub>mem</sub>/Δt · v · u (when rational)'), m.root && m.vel ? `${fstr(m.root)} · ${fstr(m.vel)} · u = ${fstr(m.u)}` : L(`κ_time = ${fstr(m.kt)} 不是有理数的平方`, `κ_time = ${fstr(m.kt)} is not a rational square`).replace('κ_time', 'κ<sub>time</sub>')],
            ['γ² − (γv)²', m.gamma2 ? `${fstr(m.gamma2)} − ${fstr(m.gv2)} = ${fstr(minus(m.gamma2, m.gv2))} ${same(minus(m.gamma2, m.gv2), ONE) ? yes : '✗'}` : L('κ_time = 0：无定义', 'κ_time = 0: undefined').replace('κ_time', 'κ<sub>time</sub>')],
            [L('结构时间 Δτ = ΔI<sub>Schur</sub> + Δb₁', 'Structural time Δτ = ΔI<sub>Schur</sub> + Δb₁'),
              tauTxt + '<br>b₁ = |E| − |V| + c = ' + b.graph.edges + ' − ' + b.graph.vertices + ' + ' + b.graph.components + ' = ' + b.graph.betti],
            [`ΔE(N) = C(N, 2) − (3N − 6)`, `N = ${m.nb}: ${m.pairs} − ${m.dof} = ${fstr(m.dE)}`],
            [L('sin²θ<sub>W</sub> = Tr(T₃²)/Tr(Q²)（MODEL）', 'sin²θ<sub>W</sub> = Tr(T₃²)/Tr(Q²) (MODEL)'), `${fstr(m.trT3)}/(${fstr(m.trQ)}) = ${fstr(m.weinberg)}`]
          ],
          note: L('时间份额与空间份额是同一步比较预算的两份，和恒为 1；把 Δx² 移到等号右边，闵可夫斯基的负号就出现了。结构时钟从单个种子起步。第二拍把 h₁ 接到种子，第三拍把 h₂ 接到种子和 h₁，闭合一个三角形。第四拍把乘积 h₁h₂ 接到种子。第五、六拍分别把新点接到种子与 h₁、种子与 h₂，各闭合一个环。', 'The time share and the space share are two parts of one step of comparison budget and always add up to 1; moving Δx² to the right-hand side brings out the minus sign of Minkowski. The structural clock starts at the seed. Beat 2 attaches h₁ to the seed. Beat 3 attaches h₂ to both and closes a triangle. Beat 4 attaches the product h₁h₂ to the seed. Beats 5 and 6 attach each new vertex to the seed and to h₁ or h₂ respectively, adding one cycle each.')
        };
      }
    }
  }
  const babsF = ([p, q]) => [babs(p), q];
  const same4 = (a, b) => a.every((v, i) => v === b[i]);
  const SCENE_NAMES = { horizon: ['地平线', 'Horizon'], adelic: ['阿代尔', 'Adelic'], machine: ['机器', 'Machine'], canvas: ['画布', 'Canvas'] };
  function readings(m) {
    const R = rows(m);
    put('roKeyL', R.key[0]);
    put('roKey', kept(R.key[1]));
    put('roKeySub', kept(R.key[2]));
    R.r.forEach(([l, v], i) => {
      put('roL' + (i + 1), kept(l));
      put('roV' + (i + 1), kept(v));
    });
    put('roNote', R.note);
    $('scenePill').innerHTML = `${L(...SCENE_NAMES[state.scene])} <strong>${state.lens ? 'ℝ' : 'Ω'}</strong>`;
    $('keyPill').innerHTML = `P/Q <strong>${kept(R.key[1])}</strong>`;
    $('ctlAside').textContent = `${SCENES.indexOf(state.scene) + 1}/4`;
    for (const g of document.querySelectorAll('#ctlPanel .grp')) g.hidden = g.dataset.scene !== state.scene;
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(!!state.lens));
    const setF = (id, v) => {
      if ($(id).value !== String(v)) $(id).value = String(v);
      $(id + 'Out').textContent = String(v).replace('-', '−');
    };
    setF('cfP', state.cfP);
    setF('cfQ', state.cfQ);
    ['qc', 'qd', 'qp', 'qq'].forEach((id, i) => setF(id, state.dq[i]));
    setF('rP', state.rP);
    setF('rQ', state.rQ);
    ['ma', 'mb', 'mc', 'md'].forEach((id, i) => setF(id, state.A[i]));
    ['me', 'mf', 'mg', 'mh'].forEach((id, i) => setF(id, state.B[i]));
    setF('kP', state.kP);
    setF('kQ', state.kQ);
    hzChips.set(state.hz, true);
    adChips.set(state.ad, true);
    mcChips.set(state.mc, true);
    kChips.set(state.scene === 'horizon' && state.hz === 'escape' ? String(whole(state.at.escape, KMAX)) : null, true);
    cfChips.set(`${state.cfP}/${state.cfQ}`, true);
    genChips.set(String(state.gen), true);
    rChips.set(`${state.rP}/${state.rQ}`, true);
    uChips.set(U_CHIPS.find((u) => U_TO[u][0] === state.kP && U_TO[u][1] === state.kQ) || null, true);
    idleChips.set(String(state.idle), true);
    nbChips.set(String(state.nb), true);
    $('hint').textContent = L('Space 播放 · ← → 一步 · 拖空白处转视角', 'Space plays · ← → one step · drag empty space to orbit');
    $('formula').textContent = {
      escape: 'N = 1 + ∏S, q = minPrimeDiv(N) ∉ S',
      ladder: 'pₙqₙ₋₁ − pₙ₋₁qₙ = (−1)ⁿ⁺¹',
      depth: 'quarterDepth ≤ N ⇒ cq < dp·4ᴺ⁺¹',
      tree: '#words(L) = 6·5ᴸ⁻¹, split5(g) = u vᵀ ≠ 0',
      balance: '|r|∞ · ∏ₚ |r|ₚ = 1',
      fractran: 'N → N·a/b for the first b | N',
      mat2: 'A² − tr(A)A + det(A)I = 0',
      canvas: 'κtime + κspace = 1, (Δτ_mem)² = Δt² − Δx²'
    }[m.mode];
  }

  /* ---------- the strip ---------- */
  const LEGEND_PX = 10.5,
    ROWH = 14,
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
      need = 9 + ROWH * (rws - 1) + 24,
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
      const y = g.pt + 9 + ROWH * k;
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
  const ticks = (lo, hi, n = 4) => {
    const span = hi - lo,
      step = 10 ** Math.floor(Math.log10(span / n)),
      e = [1, 2, 5, 10].find((f) => span / (f * step) <= n) * step;
    const out = [];
    for (let v = Math.ceil(lo / e) * e; v <= hi + 1e-9; v += e) out.push([v, fix(v, e < 1 ? (e < 0.1 ? 2 : 1) : 0)]);
    return out;
  };
  const intTicks = (n) => range(n + 1).map((k) => [k, String(k)]);
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
    switch (m.mode) {
      case 'escape': {
        $('plotTitle').textContent = L('沿时间轴：log₁₀ N 与 log₁₀ q（N 不必是素数）', 'Along the rail: log₁₀ N and log₁₀ q (N need not be prime)');
        $('plotMeta').textContent = `k = ${m.k}`;
        const pts = ESC.map((e, k) => [k, Math.log10(Number(e.N))]),
          qs = ESC.map((e, k) => [k, Math.log10(Number(e.q))]);
        const [g, rws] = frame(
          [
            [P.ink, 'log₁₀ N'],
            [P.magenta, 'log₁₀ q', 'dash']
          ],
          [-0.3, KMAX + 0.3],
          0,
          6,
          intTicks(KMAX)
        );
        g.line(pts, P.ink, { width: 1.8 });
        g.line(qs, P.magenta, { width: 1.6, dash: [4, 3] });
        pts.forEach(([x, y]) => g.dot(x, y, P.ink, 2.4));
        qs.forEach(([x, y]) => g.dot(x, y, P.magenta, 2.4));
        g.dot(m.k, Math.log10(Number(m.q)), P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'ladder': {
        $('plotTitle').textContent = L('每个前缀的行列式：交替为 ±1', 'Determinant of each prefix: ±1 in turn');
        $('plotMeta').textContent = `n = ${m.n}`;
        const cf = m.cf;
        const [g, rws] = frame(
          [
            [P.cyan, '+1'],
            [P.magenta, '−1']
          ],
          [-0.6, cf.m + 0.6],
          -1.3,
          1.3,
          intTicks(cf.m),
          [[-1, '−1'], [0, '0'], [1, '+1']]
        );
        g.hline(0, P.dim, { alpha: 0.7 });
        const bw = Math.min(18, g.iw / (2.5 * (cf.m + 1)));
        cf.pairs.forEach((p, j) => {
          const d = Number(p.det);
          g.rect(j - bw / g.scale / 2, 0, j + bw / g.scale / 2, d, d > 0 ? P.cyan : P.magenta, { alpha: j <= m.n ? 0.9 : 0.25 });
        });
        g.dot(m.n, Number(m.det), P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'depth': {
        $('plotTitle').textContent = L('cq 与 dp·4ᴺ⁺¹（以 4 为底的对数刻度）', 'cq against dp·4ᴺ⁺¹ (log base 4)');
        $('plotMeta').textContent = `N₀ = ${m.N0}`;
        const l4 = (x) => Math.log(Math.max(1e-9, Number(x))) / Math.log(4),
          ys = m.rows.map((r) => l4(r.rhs)),
          cq = Number(m.cq) > 0 ? l4(m.cq) : null;
        const lo = Math.min(0, ...(cq != null ? [cq] : [])) - 0.3,
          hi = Math.max(...ys) + 0.4;
        const [g, rws] = frame(
          [
            [P.violet, 'log₄(dp·4ᴺ⁺¹)'],
            [P.cyan, 'log₄(cq)', 'dash']
          ],
          [-0.5, NMAX + 0.5],
          lo,
          hi,
          intTicks(NMAX)
        );
        const bw = Math.min(16, g.iw / 16);
        m.rows.forEach((r, k) => g.rect(k - bw / g.scale / 2, lo, k + bw / g.scale / 2, ys[k], r.ok ? P.violet : P.magenta, { alpha: k === m.N ? 0.95 : 0.45 }));
        if (cq != null) g.hline(cq, P.cyan, { dash: [4, 3], width: 1.5 });
        g.dot(m.N, ys[m.N], P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'tree': {
        $('plotTitle').textContent = L('每层既约词数（对数刻度）：6·5ᴸ⁻¹', 'Reduced words per level (log scale): 6·5ᴸ⁻¹');
        $('plotMeta').textContent = `L = ${m.L}`;
        const ys = m.words.map((x) => Math.log10(Number(x)));
        const [g, rws] = frame([[P.cyan, 'log₁₀ #words(L)']], [-0.5, LMAX + 0.5], 0, 4, intTicks(LMAX));
        const bw = Math.min(16, g.iw / 16);
        ys.forEach((y, k) => g.rect(k - bw / g.scale / 2, 0, k + bw / g.scale / 2, Math.max(0.04, y), P.cyan, { alpha: k <= m.L ? 0.9 : 0.25 }));
        g.dot(m.L, ys[m.L], P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'balance': {
        $('plotTitle').textContent = L('累计积 ln ∏（回到 0 = 积为 1）', 'Running product ln ∏ (back to 0 = product 1)');
        $('plotMeta').textContent = `∏ = ${fstr(m.now)}`;
        const ys = m.running.map((r) => Math.log(fval(r))),
          lo = Math.min(0, ...ys) - 0.3,
          hi = Math.max(0, ...ys) + 0.3;
        const [g, rws] = frame([[P.amber, 'ln ∏', 'dot']], [-0.4, m.J + 0.4], lo, hi, m.places.map((p, i) => [i + 1, p.v === '∞' ? '∞' : String(p.v)]).concat([[0, '1']]));
        g.hline(0, P.violet, { alpha: 0.9, width: 1.4 });
        g.line(ys.map((y, i) => [i, y]), P.ink, { width: 1.4 });
        ys.forEach((y, i) => g.dot(i, y, i === m.j ? P.amber : P.ink, i === m.j ? 4.6 : 2.6));
        drawLegend(g, rws);
        break;
      }
      case 'fractran': {
        $('plotTitle').textContent = L('沿时间轴：log₂ N，每步换一道门', 'Along the rail: log₂ N, one gate per step');
        $('plotMeta').textContent = `M${sub1(m.t + 1)} = ${m.N}`;
        const ys = TRACE.states.map((n) => Math.log2(Number(n)));
        const [g, rws] = frame([[P.cyan, 'log₂ N']], [-0.5, TMAX + 0.5], 0, 18, range(TMAX + 1).filter((k) => k % 3 === 0).map((k) => [k, String(k)]));
        g.line(ys.map((y, i) => [i, y]), P.cyan, { width: 1.8 });
        ys.forEach((y, i) => g.dot(i, y, i === m.t ? P.amber : P.cyan, i === m.t ? 4.6 : 2.4));
        drawLegend(g, rws);
        break;
      }
      case 'mat2': {
        $('plotTitle').textContent = L('χ_A(λ) = λ² − tr(A)λ + det(A)：A 代入后为零矩阵', 'χ_A(λ) = λ² − tr(A)λ + det(A): A substituted gives the zero matrix');
        $('plotMeta').textContent = `tr ${bstr(m.tr)} · det ${bstr(m.det)}`;
        const t = Number(m.tr),
          d = Number(m.det),
          c = t / 2,
          span = Math.max(3, Math.sqrt(Math.abs(t * t / 4 - d)) * 1.8 + 1),
          pts = sample(80, (u) => {
            const x = c - span + 2 * span * u;
            return [x, x * x - t * x + d];
          }),
          lo = Math.min(...pts.map((p) => p[1])) - 1,
          hi = Math.max(...pts.map((p) => p[1])) + 1;
        const [g, rws] = frame([[P.violet, 'χ_A(λ)']], [c - span, c + span], lo, hi, ticks(c - span, c + span, 5));
        g.hline(0, P.dim, { alpha: 0.8 });
        g.line(pts, P.violet, { width: 1.8 });
        const disc = t * t - 4 * d;
        if (disc >= 0) [(t - Math.sqrt(disc)) / 2, (t + Math.sqrt(disc)) / 2].forEach((x) => g.dot(x, 0, P.magenta, 3.6));
        drawLegend(g, rws);
        break;
      }
      default: {
        $('plotTitle').textContent = L('沿时间轴：结构时间 τ（空转时不动）', 'Along the rail: structural time τ (still under the idle loop)');
        $('plotMeta').textContent = `τ = ${fstr(m.tau)}`;
        const run = BEATS[0].map((b) => fval(b.tau)),
          idle = BEATS[1].map((b) => fval(b.tau));
        const [g, rws] = frame(
          [
            [P.cyan, L('吸收新结构', 'absorbing')],
            [P.dim, L('空转', 'idle loop'), 'dash']
          ],
          [-0.3, CMAX + 0.3],
          0,
          Math.ceil(run.at(-1)),
          intTicks(CMAX),
          [[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4']]
        );
        g.line(idle.map((y, i) => [i, y]), P.dim, { width: 1.4, dash: [4, 3] });
        g.line(run.map((y, i) => [i, y]), P.cyan, { width: 1.8, alpha: m.idle ? 0.4 : 1 });
        run.forEach((y, i) => g.dot(i, y, P.cyan, 2.4, { alpha: m.idle ? 0.4 : 1 }));
        g.dot(m.t, fval(m.tau), P.amber, 4.6);
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
    rate: RATE.escape,
    step: 1,
    max: 6,
    t: STILL.escape,
    format: (t) => {
      const k = Math.round(t);
      switch (mode()) {
        case 'escape':
          return `k = ${k}`;
        case 'ladder':
          return `n = ${k}`;
        case 'depth':
          return `N = ${k}`;
        case 'tree':
          return `L = ${k}`;
        case 'balance':
          return L(`第 ${k} 位`, `place ${k}`);
        case 'fractran':
          return `M${sub1(k + 1)}`;
        case 'mat2':
          return L(`已加 ${k}/3 项`, `${k}/3 terms`);
        default:
          return `t = ${k}`;
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
      state.at[mode()] = c.playing ? t : Math.round(t);
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
    const md = mode();
    clock.rate = RATE[md];
    clock.step = 1;
    $('now').step = '1';
    const max = railMax(),
      at = Math.min(state.at[md], max);
    clock.setMax(max, true);
    clock.set(at, true);
    state.at[md] = at;
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
    const before = mode();
    change();
    setRail();
    if (mode() !== before) {
      state.cam = 'card';
      camChips.set('card', true);
      sc.view(camOf('card'), TRV.still || booting ? 0 : 500);
    }
    paint();
  }
  const signed = (v) => String(v).replace('-', '−');
  kit.field($('cfP'), { out: $('cfPOut'), onInput: (v) => steer('horizon', () => ((state.hz = 'ladder'), (state.cfP = Math.round(v)))) });
  kit.field($('cfQ'), { out: $('cfQOut'), onInput: (v) => steer('horizon', () => ((state.hz = 'ladder'), (state.cfQ = Math.round(v)))) });
  ['qc', 'qd', 'qp', 'qq'].forEach((id, i) =>
    kit.field($(id), {
      out: $(id + 'Out'),
      onInput: (v) =>
        steer('horizon', () => {
          state.hz = 'depth';
          state.dq[i] = Math.round(v);
          state.at.depth = depthOf(...state.dq).N0 <= NMAX ? Math.min(NMAX, depthOf(...state.dq).N0) : NMAX;
        })
    })
  );
  kit.field($('rP'), {
    out: $('rPOut'),
    fmt: signed,
    onInput: (v) =>
      steer('adelic', () => {
        state.ad = 'balance';
        state.rP = Math.round(v) || (state.rP > 0 ? -1 : 1);
        state.at.balance = balNow().J;
      })
  });
  kit.field($('rQ'), {
    out: $('rQOut'),
    onInput: (v) =>
      steer('adelic', () => {
        state.ad = 'balance';
        state.rQ = Math.round(v);
        state.at.balance = balNow().J;
      })
  });
  ['ma', 'mb', 'mc', 'md'].forEach((id, i) => kit.field($(id), { out: $(id + 'Out'), fmt: signed, onInput: (v) => steer('machine', () => ((state.mc = 'mat2'), (state.A[i] = Math.round(v)))) }));
  ['me', 'mf', 'mg', 'mh'].forEach((id, i) => kit.field($(id), { out: $(id + 'Out'), fmt: signed, onInput: (v) => steer('machine', () => ((state.mc = 'mat2'), (state.B[i] = Math.round(v)))) }));
  kit.field($('kP'), {
    out: $('kPOut'),
    onInput: (v) =>
      steer('canvas', () => {
        state.kP = Math.min(Math.round(v), state.kQ);
      })
  });
  kit.field($('kQ'), {
    out: $('kQOut'),
    onInput: (v) =>
      steer('canvas', () => {
        state.kQ = Math.round(v);
        state.kP = Math.min(state.kP, state.kQ);
      })
  });
  const hzChips = kit.chips($('hzChips'), 'hz', (v) => steer('horizon', () => (state.hz = MODES.horizon.includes(v) ? v : 'escape')));
  const adChips = kit.chips($('adChips'), 'ad', (v) => steer('adelic', () => (state.ad = MODES.adelic.includes(v) ? v : 'tree')));
  const mcChips = kit.chips($('mcChips'), 'mc', (v) => steer('machine', () => (state.mc = MODES.machine.includes(v) ? v : 'fractran')));
  const kChips = kit.chips($('kChips'), 'k', (v) =>
    steer('horizon', () => {
      state.hz = 'escape';
      state.at.escape = clamp(Number(v), 0, KMAX);
    })
  );
  const cfChips = kit.chips($('cfChips'), 'cf', (v) =>
    steer('horizon', () => {
      const [p, q] = v.split('/').map(Number);
      state.hz = 'ladder';
      state.cfP = p;
      state.cfQ = q;
      state.at.ladder = cfOf(p, q).m;
    })
  );
  const genChips = kit.chips($('genChips'), 'gen', (v) =>
    steer('adelic', () => {
      const g = clamp(Number(v), 0, 5),
        w = state.word;
      state.ad = 'tree';
      state.gen = g;
      // free reduction: a letter next to its inverse cancels; a full word starts again
      if (w.length && w[w.length - 1] === (g ^ 1)) w.pop();
      else if (w.length < LMAX) w.push(g);
      else state.word = [g];
      state.at.tree = state.word.length;
    })
  );
  $('wordClear').addEventListener('click', () =>
    steer('adelic', () => {
      state.ad = 'tree';
      state.word = [];
      state.at.tree = 0;
    })
  );
  const rChips = kit.chips($('rChips'), 'r', (v) =>
    steer('adelic', () => {
      const [p, q] = v.split('/').map(Number);
      state.ad = 'balance';
      state.rP = p;
      state.rQ = q;
      state.at.balance = balNow().J;
    })
  );
  const U_TO = { 0: [1, 1], '1/5': [144, 169], '1/3': [16, 25], '1/2': [9, 25], '2/3': [25, 169] };
  const U_CHIPS = Object.keys(U_TO);
  const uChips = kit.chips($('uChips'), 'u', (v) =>
    steer('canvas', () => {
      [state.kP, state.kQ] = U_TO[v] || U_TO['1/3'];
    })
  );
  const idleChips = kit.chips($('idleChips'), 'idle', (v) => steer('canvas', () => (state.idle = v === '1' ? 1 : 0)));
  const nbChips = kit.chips($('nbChips'), 'nb', (v) => steer('canvas', () => (state.nb = clamp(Number(v), 3, 8))));
  $('stageAct').addEventListener('click', () => {
    const scene = state.scene;
    if (scene === 'canvas') steer('canvas', () => (state.idle = state.idle ? 0 : 1));
    else
      steer(scene, () => {
        const key = { horizon: 'hz', adelic: 'ad', machine: 'mc' }[scene],
          ms = MODES[scene];
        state[key] = ms[(ms.indexOf(state[key]) + 1) % ms.length];
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
    Object.assign(state, copy(FRESH), copy(p.set), { lens, at: { ...STILL } });
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
    'euclid-cf-quarter-depth': [
      'k 从 0 走到 6：N = 1 + ∏S 在每根素数轴上都落在青色的余 1 格；k = 6 时最小因子 59 不在表中，30031 = 59 × 509。',
      'k runs from 0 to 6: N = 1 + ∏S lands on the cyan cell 1 of every prime rod; at k = 6 its least factor 59 is not in the list, 30031 = 59 × 509.'
    ],
    'adelic-balance-and-f3-tree': [
      '六个模 5 生成元沿 ±x、±y、±z 长出 F₃ 的树，每步只避开上一步的逆：1、6、30、150、750、3750 个既约词。',
      'The six generators of norm 5 grow the tree of F₃ along ±x, ±y, ±z, each step avoiding only the inverse of the last: 1, 6, 30, 150, 750, 3750 reduced words.'
    ],
    'scalar-fractran-and-mat2': [
      '每拍第一道分母整除 N 的门打开，一个素指数减 2、下一个加 1：131072 = 2¹⁷ 经 15 步停在 22 = 2·11，四道门全关。',
      'Each step the first gate whose denominator divides N opens, one prime exponent drops by 2 and the next rises by 1: 131072 = 2¹⁷ halts at 22 = 2·11 after 15 steps.'
    ],
    'static-canvas-memory-split': [
      '紫色画布不动，琥珀焦点按 cos²α = 16/25 滚落：青色时间份额 16/25 加品红空间份额 9/25 恒为 1；三拍结构时间 τ = 0 → 1/2 → 2。',
      'The violet canvas stays; the amber focus rolls at cos²α = 16/25: the cyan time share 16/25 plus the magenta space share 9/25 is 1; three beats of structural time τ = 0 → 1/2 → 2.'
    ]
  };
  const cards = kit.cards($('presets'), {
    presets: PRESETS,
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：时间轴、琥珀手柄与右栏旋钮改的是本卡的量，账本里的每个数都是整数或约分后的整数之比。', 'Free play: the rail, the amber handle and the dials change the quantity of the card; every number of the ledger is an integer or a reduced ratio of integers.']
  });

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
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top;
    // the whole step of the rail nearest the pointer, the present one before others at the same distance
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= clock.max; k++) {
      const p = sc.p(handleWorld(k)),
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
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  const BOX = { list: 10, P: 60, Q: 40, depth: 8, rP: 30, rQ: 30, trace: 3000, mA: 2, mB: 1, chA: 3, kQ: 60, tree: 4 };
  function benchmarks() {
    // Euclid: every list of length 1 … 3 with entries in 1 … BOX.list, and the empty list
    let lists = 1,
      escBad = 0;
    const tryList = (s) => {
      const prod = s.reduce((a, x) => a * BigInt(x), 1n),
        p = minPrimeDiv(prod + 1n);
      if (minPrimeDiv(p) !== p || (prod + 1n) % p !== 0n || s.some((x) => BigInt(x) === p)) escBad++;
    };
    tryList([]);
    const R = range(BOX.list).map((i) => i + 1);
    for (const a of R) {
      lists++;
      tryList([a]);
      for (const b of R) {
        lists++;
        tryList([a, b]);
        for (const c of R) {
          lists++;
          tryList([a, b, c]);
        }
      }
    }
    // continued fractions: every prefix of every P/Q in the box has determinant (−1)^count, and gcd 1
    let fracs = 0,
      prefixes = 0,
      cfBad = 0;
    for (let Pn = 1; Pn <= BOX.P; Pn++)
      for (let Qn = 1; Qn <= BOX.Q; Qn++) {
        fracs++;
        const cf = cfOf(Pn, Qn);
        for (const pr of cf.pairs) {
          prefixes++;
          if (pr.det !== (pr.count % 2 ? -1n : 1n) || bgcd(pr.cur[0], pr.cur[1]) !== 1n) cfBad++;
        }
        const last = cf.pairs[cf.m].cur;
        if (last[0] * cf.Q !== last[1] * cf.P) cfBad++;
      }
    // quarter depth: soundness at N₀ … N₀ + 2 and minimality, on c, d, p, q in 1 … BOX.depth
    let depths = 0,
      depthBad = 0;
    for (let c = 1; c <= BOX.depth; c++)
      for (let d = 1; d <= BOX.depth; d++)
        for (let p = 1; p <= BOX.depth; p++)
          for (let q = 1; q <= BOX.depth; q++) {
            depths++;
            const D = depthOf(c, d, p, q),
              cq = BigInt(c * q),
              dp = BigInt(d * p);
            for (let N = D.N0; N <= D.N0 + 2; N++) if (!(cq < dp * pow(4n, N + 1))) depthBad++;
            if (D.N0 > 0 && cq < dp * pow(4n, D.N0)) depthBad++;
          }
    // adelic: the product over the places is 1 for every r = P/Q in the box
    let rats = 0,
      adelicBad = 0;
    for (let Pn = -BOX.rP; Pn <= BOX.rP; Pn++)
      for (let Qn = 1; Qn <= BOX.rQ; Qn++) {
        if (!Pn) continue;
        rats++;
        if (!same(balanceOf(Pn, Qn).product, ONE)) adelicBad++;
      }
    // the free group: count reduced words by brute force, and check that 5^L R(w) is never 0 mod 5 (adjoint matrices)
    const M5 = [
      [5, 0, 0, 0, -3, -4, 0, 4, -3],
      [5, 0, 0, 0, -3, 4, 0, -4, -3],
      [-3, 0, 4, 0, 5, 0, -4, 0, -3],
      [-3, 0, -4, 0, 5, 0, 4, 0, -3],
      [-3, -4, 0, 4, -3, 0, 0, 0, 5],
      [-3, 4, 0, -4, -3, 0, 0, 0, 5]
    ].map((r) => r.map(BigInt));
    const mm3 = (A, B) => range(9).map((i) => range(3).reduce((s, k) => s + A[3 * Math.floor(i / 3) + k] * B[3 * k + (i % 3)], 0n));
    let words = [{ M: [1n, 0n, 0n, 0n, 1n, 0n, 0n, 0n, 1n], last: -1 }];
    const counts = [1n];
    let mod5Bad = 0,
      collisions = 0;
    for (let l = 1; l <= BOX.tree; l++) {
      const next = [];
      for (const w of words)
        for (let g = 0; g < 6; g++) {
          if (w.last >= 0 && g === (w.last ^ 1)) continue;
          const M = mm3(w.M, M5[g]);
          if (M.every((x) => x % 5n === 0n)) mod5Bad++;
          next.push({ M, last: g });
        }
      const seen = new Set(next.map((w) => w.M.join()));
      collisions += next.length - seen.size;
      counts.push(BigInt(next.length));
      words = next;
    }
    const splitBad = SPLIT.filter((s, i) => !s.rankOne || !s.nonzero || s.zeroWith.some((z, j) => z !== (j === (i ^ 1)))).length;
    // FRACTRAN: from every n in 1 … BOX.trace the first enabled rule gives one successor; the trace halts at 22
    let fracBad = 0;
    for (let n = 1n; n <= BigInt(BOX.trace); n++) {
      const st = fstep(n),
        firing = RULES.map(([a, b], i) => (n % b === 0n && RULES.slice(0, i).every(([, bb]) => n % bb !== 0n) ? (n / b) * a : null)).filter((x) => x != null);
      if (firing.length > 1 || (st.i < 0 ? firing.length !== 0 : firing[0] !== st.m)) fracBad++;
    }
    // Mat₂ (integers): trace cyclicity and det multiplicativity on A in [−2, 2]⁴, B in [−1, 1]⁴; Cayley–Hamilton on A in [−3, 3]⁴
    const span = (n) => range(2 * n + 1).map((k) => k - n),
      quad = (n) => span(n).flatMap((a) => span(n).flatMap((b) => span(n).flatMap((c) => span(n).map((d) => [a, b, c, d])))),
      nm = (A, B) => [A[0] * B[0] + A[1] * B[2], A[0] * B[1] + A[1] * B[3], A[2] * B[0] + A[3] * B[2], A[2] * B[1] + A[3] * B[3]];
    let pairsAB = 0,
      matBad = 0,
      chTried = 0,
      chBad = 0;
    const QA = quad(BOX.mA),
      QB = quad(BOX.mB);
    for (const A of QA)
      for (const B of QB) {
        pairsAB++;
        const AB = nm(A, B),
          BA = nm(B, A);
        if (AB[0] + AB[3] !== BA[0] + BA[3] || AB[0] * AB[3] - AB[1] * AB[2] !== (A[0] * A[3] - A[1] * A[2]) * (B[0] * B[3] - B[1] * B[2])) matBad++;
      }
    for (const A of quad(BOX.chA)) {
      chTried++;
      const A2 = nm(A, A),
        t = A[0] + A[3],
        d = A[0] * A[3] - A[1] * A[2],
        CH = [A2[0] - t * A[0] + d, A2[1] - t * A[1], A2[2] - t * A[2], A2[3] - t * A[3] + d],
        adj = [A[3], -A[1], -A[2], A[0]],
        L1 = nm(A, adj),
        R1 = nm(adj, A);
      if (CH.some((x) => x !== 0) || L1.join() !== [d, 0, 0, d].join() || R1.join() !== [d, 0, 0, d].join()) chBad++;
    }
    // the memory split: κ_time + κ_space = 1 and (Δτ_mem)² = Δt² − Δx² on every P/Q with 0 ≤ P ≤ Q ≤ BOX.kQ
    let splits = 0,
      splitSumBad = 0;
    for (let Qn = 1; Qn <= BOX.kQ; Qn++)
      for (let Pn = 0; Pn <= Qn; Pn++) {
        splits++;
        const c = canvasOf({ kP: Pn, kQ: Qn, idle: 0, nb: 5 }, 0);
        if (!same(c.sum, ONE) || c.dtau2 !== c.dt2 - c.dx2 || (c.gamma2 && !same(minus(c.gamma2, c.gv2), ONE))) splitSumBad++;
      }
    const dEBad = [3, 4, 5, 6, 7, 8].filter((n) => !same(deltaE(n), frac(BigInt((n - 3) * (n - 4)), 2n))).length;
    return { lists, escBad, fracs, prefixes, cfBad, depths, depthBad, rats, adelicBad, counts, mod5Bad, collisions, splitBad, fracBad, pairsAB, matBad, chTried, chBad, splits, splitSumBad, dEBad };
  }
  const BENCH = benchmarks();
  const CF34 = cfOf(34, 21),
    QD = depthOf(7, 2, 1, 10),
    AD = balanceOf(-18, 35),
    MAT = matOf({ A: [2, 3, 1, 4], B: [1, -2, 5, 3] }),
    CAN = canvasOf({ kP: 16, kQ: 25, idle: 0, nb: 5 }, 3);
  const NUMBERS = {
    escN: () => String(ESC[6].N),
    escQ: () => `${ESC[6].q}（× ${ESC[6].cof}）`.replace('（', ' (').replace('）', ')'),
    escR: () => ESC[6].rems.join(', '),
    cfA: () => `${CF34.a[0]}; ${CF34.a.slice(1).join(', ')}`,
    cfDet: () => CF34.pairs.map((p) => bstr(p.det)).join(', '),
    qdN: () => String(QD.N0),
    qdIneq: () => `${QD.cq} < ${QD.dp}·4³ = ${QD.rows[2].rhs}`,
    words: () => [...BENCH.counts, WORDS[5]].map(String).join(', '),
    split: (say) => (SPLIT.every((s) => s.rankOne && s.nonzero) ? say('全部是非零秩一外积', 'all nonzero rank-one outer products') : say('有不符', 'mismatch')),
    adelic: () => AD.places.map((p) => fstr(p.f)).join(' · '),
    adelicProd: () => fstr(AD.product),
    trace: () => TRACE.states.join(' → '),
    halt: () => String(TRACE.states[TMAX]),
    trAB: () => bstr(MAT.trAB),
    ch: () => mat(MAT.CH),
    kt: () => fstr(CAN.kt),
    ks: () => fstr(CAN.ks),
    lorentz: () => fstr(minus(CAN.gamma2, CAN.gv2)),
    tau: () => BEATS[0].slice(0, 4).map((b) => fstr(b.tau)).join(' → '),
    weinberg: () => fstr(WEINBERG),
    dE: () => [3, 4, 5, 6, 7, 8].map((n) => fstr(deltaE(n))).join(', ')
  };
  function numText(say) {
    const B = BENCH,
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`);
    return say(
      `打开页面时由脚本用大整数现算，是上面各条定理与推导的个别实例，不检验定理的前提。素数逃逸：空表与元素在 1 … ${BOX.list} 的 ${B.lists - 1} 个长度 1 … 3 的列表，有界最小因子是素数、整除积加一且不在表中，${bad(B.escBad)}。连分数：P ≤ ${BOX.P}、Q ≤ ${BOX.Q} 的 ${B.fracs} 个分数共 ${B.prefixes} 个前缀，行列式 = (−1) 的系数个数次方且渐近分数既约，${bad(B.cfBad)}。四分深度：c、d、p、q ∈ 1 … ${BOX.depth} 的 ${B.depths} 组，在 N₀、N₀ + 1、N₀ + 2 处 cq < dp·4ᴺ⁺¹ 且 N₀ 最小，${bad(B.depthBad)}。阿代尔：|P| ≤ ${BOX.rP}、Q ≤ ${BOX.rQ} 的 ${B.rats} 个 r，|r|∞ ∏ |r|ₚ = 1，${bad(B.adelicBad)}。自由群：暴力枚举的各层词数 ${B.counts.join('、')}，伴随整矩阵 5ᴸR(w) 模 5 为零 ${B.mod5Bad} 次、同层重合 ${B.collisions} 次；六个生成元的模 5 分裂与互逆零积，${bad(B.splitBad)}。FRACTRAN：n = 1 … ${BOX.trace}，第一道打开的门给出唯一后继，${bad(B.fracBad)}。Mat₂：${B.pairsAB} 对 (A, B) 的迹循环与行列式乘性，${bad(B.matBad)}；${B.chTried} 个 A 的凯莱—哈密顿与伴随恒等式，${bad(B.chBad)}。记忆切分：0 ≤ P ≤ Q ≤ ${BOX.kQ} 的 ${B.splits} 个 κ_time，和为 1、(Δτ_mem)² = Δt² − Δx² 与 γ² − (γv)² = 1，${bad(B.splitSumBad)}；ΔE(N) 的两种写法，${bad(B.dEBad)}。数值演示，不是证明。`,
      `Computed in big integers by the script when the page opens, single instances of the theorems and derivations above; it does not check their hypotheses. Prime escape: the empty list and the ${B.lists - 1} lists of length 1 … 3 with entries in 1 … ${BOX.list}: the bounded least factor is prime, divides the product plus one and is not in the list, ${bad(B.escBad)}. Continued fractions: the ${B.prefixes} prefixes of the ${B.fracs} fractions with P ≤ ${BOX.P}, Q ≤ ${BOX.Q}: determinant (−1) to the number of coefficients and reduced convergents, ${bad(B.cfBad)}. Quarter depth: ${B.depths} choices of c, d, p, q in 1 … ${BOX.depth}: cq < dp·4ᴺ⁺¹ at N₀, N₀ + 1, N₀ + 2 and N₀ least, ${bad(B.depthBad)}. Adelic: ${B.rats} rationals r with |P| ≤ ${BOX.rP}, Q ≤ ${BOX.rQ}: |r|∞ ∏ |r|ₚ = 1, ${bad(B.adelicBad)}. Free group: words per level by brute force ${B.counts.join(', ')}; the adjoint integer matrices 5ᴸR(w) vanish mod 5 ${B.mod5Bad} times and coincide within a level ${B.collisions} times; the mod-5 splits of the six generators and their zero products with inverses, ${bad(B.splitBad)}. FRACTRAN: n = 1 … ${BOX.trace}, the first open gate gives one successor, ${bad(B.fracBad)}. Mat₂: trace cyclicity and multiplicativity of det on ${B.pairsAB} pairs (A, B), ${bad(B.matBad)}; Cayley–Hamilton and the adjugate identities on ${B.chTried} matrices A, ${bad(B.chBad)}. Memory split: the ${B.splits} values κ_time = P/Q with 0 ≤ P ≤ Q ≤ ${BOX.kQ}: sum 1, (Δτ_mem)² = Δt² − Δx² and γ² − (γv)² = 1, ${bad(B.splitSumBad)}; the two forms of ΔE(N), ${bad(B.dEBad)}. A numerical illustration, not a proof.`
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
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.ARCLAB_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        mode: mode(),
        preset: cards.current,
        lens: state.lens,
        hz: state.hz,
        ad: state.ad,
        mc: state.mc,
        cfP: state.cfP,
        cfQ: state.cfQ,
        dq: state.dq,
        gen: state.gen,
        word: state.word,
        rP: state.rP,
        rQ: state.rQ,
        A: state.A,
        B: state.B,
        kP: state.kP,
        kQ: state.kQ,
        idle: state.idle,
        nb: state.nb,
        at: state.at,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        cam: state.cam,
        camera: { ...sc.cam },
        ledger: m.mode === 'ladder' ? { ...m, cf: { P: m.cf.P, Q: m.cf.Q, a: m.cf.a, pairs: m.cf.pairs, m: m.cf.m } } : m,
        key: $('roKey').textContent
      });
    },
    presets: plain(PRESETS),
    bench: () => plain(BENCH),
    trace: () => plain(TRACE),
    split: () => plain(SPLIT),
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
