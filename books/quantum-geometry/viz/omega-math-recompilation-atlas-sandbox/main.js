/* OMEGA//RECOMPILE · OmegaMath 零公理去近似重编译与全书自指结晶图谱收束 · OmegaMath recompilation and the atlas of the
   monograph (Chapter 39, §39.8)
   World (kit.solid): z up. The violet ball is the projective ternion sphere ℚP³: a canonical integer tuple p = (w, x, y, z)
   (gcd 1, first nonzero entry positive) stands at the height w/‖p‖, whose square is κ(p0, p) = ⟨p0, p⟩²/(‖p0‖²‖p‖²) for the
   seed p0 = (1, 0, 0, 0) at the north pole, with an azimuth from a fixed linear projection of (x, y, z).
     pillars   six formulas of the monograph. A flat shadow puts each point on the tangent plate at the seed, at its angle
               arccos(w/‖p‖) in radians from the pole; β (MODEL) carries the plate back onto the ball;
     quad      the angular number density of a gold 5d shell with t electrons taken from one orbital, its quadrupole
               Q = −t·Q(orbital), and the average over the rotations of the twelve canonical nodes;
     hecke     the six Lipschitz rotors of norm 5 and a tower of the squared eigenvalues λ² of their normalized sum on the
               spin shells j = 0 … 2, against the bound 4p = 20;
     atlas     the twelve canonical Hurwitz nodes, the edges of the sixteen milestones, and five flat scaffolds that leave
               at milestone 13 by [a, c, c] = a;
     fractran  five prime towers whose cubes are the exponents of N, and the four gates of [11/49, 7/25, 5/9, 3/4].
   The rail is β, the electrons taken, the spin shell or the milestone. Fractions are pairs of big integers [p, q], q > 0;
   a number is printed after “=” only when the printed decimal is the value, and after “≈” when it rounds it. The drawing
   uses floating-point roots and trigonometry; the readings use integers and fractions. Read-only probe:
   window.RECOMPILE_DEBUG. */
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
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / norm(a));
  const mix = (a, b, u) => a.map((x, i) => lerp(x, b[i], u));
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const bigText = (_, v) => (typeof v === 'bigint' ? String(v) : v);
  const same = (a, b) => JSON.stringify(a, bigText) === JSON.stringify(b, bigText);
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));

  /* ---------- exact numbers: fractions [p, q] of big integers, q > 0 ---------- */
  const frac = (p, q = 1n) => {
    if (q < 0n) [p, q] = [-p, -q];
    let [a, b] = [p < 0n ? -p : p, q];
    while (b) [a, b] = [b, a % b];
    return a ? [p / a, q / a] : [0n, 1n];
  };
  const whole = (n) => [BigInt(n), 1n],
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d),
    quo = ([a, b], [c, d]) => frac(a * d, b * c);
  const ZERO = whole(0),
    ONE = whole(1);
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const equal = (a, b) => cmp(a, b) === 0;
  const isZero = (a) => a[0] === 0n;
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
  const sci = (x, d = 3) => {
    const [m, e] = x.toExponential(d).split('e').map(Number);
    return `${kit.fix(m, d)}×10${superscript(e)}`;
  };
  /* The relation before a printed number, one rule for the whole page. “=” stands before digits that are the value itself;
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as one
     of them. An inequality of the page stands between exact expressions; a rounded value follows it in a parenthesis. */
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction (or null); x: the value as computed, a double. */
  function rel(q, x, d = 4) {
    if (q && !(abs(fval(q) - x) <= 1e-9 * Math.max(1, abs(x)))) q = null;
    const { text, exact } = q ? decimals(q, d) : { text: fmt(x, d), exact: false };
    if (exact) return `= ${text}`;
    const mark = LANDMARKS.find(([v]) => Number(text.replace('−', '-')) === v);
    if (mark) {
      const [v, name] = mark,
        gap = q ? fval(minus(q, ratio(v))) : x - v;
      if (gap !== 0) return name ? `≈ ${name} ${gap < 0 ? '−' : '+'} ${sci(abs(gap))}` : `≈ ${sci(gap)}`;
    }
    return `≈ ${text}`;
  }
  /** A fraction that is its own value. */
  const relQ = (q, d = 4) => rel(q, fval(q), d);
  /** A double that is only computed: always after “≈”, never as a landmark it is not. */
  const approx = (x, d = 4) => rel(null, x, d);
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  /** A fraction and its decimal: 1/2 = 0.5000, 2/5 = 0.4000, 1/3 ≈ 0.3333. */
  const both = (q, d = 4) => `${fstr(q)} ${relQ(q, d)}`;
  const int = (n) => String(n).replace('-', '−');
  const tuple = (t) => `(${t.map(int).join(', ')})`;
  const diag = (v) => `diag(${v.map(fstr).join(', ')})`;

  /* ---------- integer quaternions and ProjTernion ---------- */
  const gcdN = (m, n) => {
    m = abs(m);
    n = abs(n);
    while (m) [m, n] = [n % m, m];
    return n;
  };
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = ([w, x, y, z]) => [w, -x, -y, -z];
  const norm2 = (p) => p.reduce((s, x) => s + x * x, 0);
  /** The canonical representative of a rational line: divide by the gcd, make the first nonzero entry positive. */
  function canon(t) {
    const g = t.reduce((a, v) => gcdN(a, v), 0);
    if (!g) return [0, 0, 0, 0];
    const r = t.map((v) => v / g),
      s = r.find((v) => v !== 0) > 0 ? 1 : -1;
    return r.map((v) => s * v + 0);
  }
  /** The heap of ProjTernion: [a, b, c] = canon(a · b* · c). */
  const triad = (a, b, c) => canon(qmul(qmul(a, qconj(b)), c));
  /** κ(p, q) = ⟨p, q⟩²/(‖p‖²‖q‖²), a fraction. */
  const kappa = (p, q) => frac(BigInt(dot(p, q)) ** 2n, BigInt(norm2(p)) * BigInt(norm2(q)));
  const isqrt = (n) => {
    const r = Math.round(Math.sqrt(n));
    return r * r === n ? r : null;
  };
  const SEED = [1, 0, 0, 0];

  /* ---------- the second-order jets ℚ[η]/(η³) ---------- */
  const jmul = (a, b) => [times(a[0], b[0]), plus(times(a[0], b[1]), times(a[1], b[0])), plus(plus(times(a[0], b[2]), times(a[1], b[1])), times(a[2], b[0]))];
  function jinv(a) {
    const i0 = quo(ONE, a[0]),
      u1 = times(a[1], i0),
      u2 = times(a[2], i0);
    return [i0, minus(ZERO, times(i0, u1)), times(i0, minus(times(u1, u1), u2))];
  }
  /** The jet of κ(x) = 1/(1 + x²) at a rational x₀: the inverse of 1 + (x₀ + η)². */
  const kappaJet = (x0) => jinv([plus(ONE, times(x0, x0)), times(whole(2), x0), ONE]);
  const kappaAt = (x) => quo(ONE, plus(ONE, times(x, x)));

  /* ---------- the 5d shell: real d orbitals as polynomials, exact moments on the unit sphere ---------- */
  /** A polynomial in x, y, z: a Map from "i,j,k" to a fraction. */
  const poly = (o) => new Map(Object.entries(o).map(([k, v]) => [k, whole(v)]));
  function pmul(A, B) {
    const C = new Map();
    for (const [ka, va] of A)
      for (const [kb, vb] of B) {
        const e = ka.split(',').map((x, i) => Number(x) + Number(kb.split(',')[i])).join(',');
        C.set(e, plus(C.get(e) || ZERO, times(va, vb)));
      }
    return C;
  }
  const dfact = (n) => {
    let r = 1n;
    for (let k = n; k > 0; k -= 2) r *= BigInt(k);
    return r;
  };
  /** The mean of x^i y^j z^k over the unit sphere. */
  const moment = (i, j, k) => (i % 2 || j % 2 || k % 2 ? ZERO : frac(dfact(i - 1) * dfact(j - 1) * dfact(k - 1), dfact(i + j + k + 1)));
  const mean = (A) => [...A].reduce((t, [k, v]) => plus(t, times(v, moment(...k.split(',').map(Number)))), ZERO);
  const ORBS = ['z2', 'xz', 'yz', 'xy', 'x2y2'];
  const ORB_POLY = {
    z2: poly({ '0,0,2': 2, '2,0,0': -1, '0,2,0': -1 }),
    xz: poly({ '1,0,1': 1 }),
    yz: poly({ '0,1,1': 1 }),
    xy: poly({ '1,1,0': 1 }),
    x2y2: poly({ '2,0,0': 1, '0,2,0': -1 })
  };
  const ORB_FN = {
    z2: ([x, y, z]) => 2 * z * z - x * x - y * y,
    xz: ([x, , z]) => x * z,
    yz: ([, y, z]) => y * z,
    xy: ([x, y]) => x * y,
    x2y2: ([x, y]) => x * x - y * y
  };
  const AXES3 = [poly({ '1,0,0': 1 }), poly({ '0,1,0': 1 }), poly({ '0,0,1': 1 })];
  /** Per orbital: the squared norm and Q_ab = ⟨p²(3 n_a n_b − δ_ab)⟩/⟨p²⟩, exactly. */
  const ORB = Object.fromEntries(
    ORBS.map((k) => {
      const p2 = pmul(ORB_POLY[k], ORB_POLY[k]),
        N = mean(p2),
        Q = range(3).map((a) =>
          range(3).map((b) => {
            let v = times(whole(3), mean(pmul(p2, pmul(AXES3[a], AXES3[b]))));
            if (a === b) v = minus(v, N);
            return quo(v, N);
          })
        );
      return [k, { N, Q, Nf: fval(N) }];
    })
  );
  /** The quadrupole of the shell with t electrons taken from orbital k: every orbital doubly occupied except k. */
  const shellQ = (k, t) => ORB[k].Q.map((row) => row.map((v) => times(minus(ZERO, t), v)));
  /** The rotation of a canonical tuple: v ↦ q·v·conj(q)/‖q‖², an exact 3 × 3 matrix of fractions. */
  function rotOf([w, x, y, z]) {
    const n = BigInt(norm2([w, x, y, z]));
    return [
      [w * w + x * x - y * y - z * z, 2 * (x * y - w * z), 2 * (x * z + w * y)],
      [2 * (x * y + w * z), w * w - x * x + y * y - z * z, 2 * (y * z - w * x)],
      [2 * (x * z - w * y), 2 * (y * z + w * x), w * w - x * x - y * y + z * z]
    ].map((row) => row.map((v) => frac(BigInt(v), n)));
  }
  const mat3 = (A, B) => range(3).map((i) => range(3).map((j) => range(3).reduce((s, k) => plus(s, times(A[i][k], B[k][j])), ZERO)));
  const tr3 = (A) => range(3).map((i) => range(3).map((j) => A[j][i]));

  /* ---------- the twelve canonical Hurwitz nodes of the atlas ---------- */
  const NODES = [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, -1, 1, 1],
    [1, 1, -1, 1],
    [1, 1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, 1, -1],
    [1, 1, -1, -1],
    [1, -1, -1, -1],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  const TOPIC = [
    ['三元比较与恒等', 'ternary comparison and identity'],
    ['最小作用量与测地线', 'least action and geodesics'],
    ['自指与二阶射流', 'self-reference and second-order jets'],
    ['时空与记忆二分', 'spacetime and the memory split'],
    ['量子公设', 'quantum postulates'],
    ['规范几何', 'gauge geometry'],
    ['金的 d 壳四极矩', 'the quadrupole of the gold d shell'],
    ['整赫克生成元', 'integral Hecke generators'],
    ['素数寄存器与 ζ 零点', 'prime registers and zeta zeros'],
    ['三元数场 Transformer', 'the ternion field Transformer'],
    ['OmegaMath 与精确算术', 'OmegaMath and exact arithmetic'],
    ['观察者宇宙与图谱收束', 'observer universe and atlas closure']
  ];
  const ROTS = NODES.map(rotOf);
  const nodeIndex = (t) => NODES.findIndex((n) => same(n, canon(t)));
  /** The milestones: the node and the directed edges each one adds (node numbers from 1), and the audit of 13 and 15. */
  const MILESTONES = [
    { node: 1, edges: [] },
    { node: 2, edges: [[1, 2]] },
    { node: 3, edges: [[2, 3], [1, 3]] },
    { node: 4, edges: [[3, 4]] },
    { node: 5, edges: [[4, 5], [2, 5]] },
    { node: 6, edges: [[5, 6], [3, 6]] },
    { node: 7, edges: [[6, 7], [4, 7]] },
    { node: 8, edges: [[7, 8], [2, 8]] },
    { node: 9, edges: [[8, 9], [5, 9]] },
    { node: 10, edges: [[9, 10], [4, 10]] },
    { node: 11, edges: [[10, 11], [6, 11]] },
    { node: 12, edges: [[11, 12], [8, 12]] },
    { node: 0, edges: [], audit: 'bridge' },
    { node: 0, edges: [[5, 12]] },
    { node: 0, edges: [], audit: 'edges' },
    { node: 0, edges: [[3, 12]] }
  ];
  const MCOUNT = MILESTONES.length;
  const PRIMES = [2, 3, 5, 7, 11];
  const PROGRAM = [
    [11n, 49n],
    [7n, 25n],
    [5n, 9n],
    [3n, 4n]
  ];
  const PROGRAM_TEXT = PROGRAM.map(([a, b]) => `${a}/${b}`);
  const REGISTER = [
    ['三元几何', 'ternary geometry'],
    ['物理力场', 'physical fields'],
    ['算术素谱', 'arithmetic spectrum'],
    ['测地智能', 'geodesic intelligence'],
    ['观察者自指', 'observer self-reference']
  ];
  const SCAFFOLDS = ['π', 'e', 'φ', '∞', 'lim'];
  /** The scaffolds still standing at milestone M (MODEL): five through M12, none from M13 on. */
  const scaffoldsAt = (M) => (M <= 12 ? SCAFFOLDS.length : 0);
  const exps = (N) =>
    PRIMES.map((p) => {
      let k = 0,
        n = N;
      while (n % BigInt(p) === 0n) {
        n /= BigInt(p);
        k++;
      }
      return k;
    });
  /** The whole run: graph, Gram–Schmidt, Betti rank, structural time and the FRACTRAN register, milestone by milestone. */
  function runAtlas() {
    const parent = range(13).map((i) => i),
      find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
    const nodes = [],
      edges = [],
      basis = [];
    let tau = ZERO,
      b1 = 0,
      N = 2n ** 17n;
    const rows = [];
    for (let k = 0; k < MCOUNT; k++) {
      const m = MILESTONES[k];
      let gate = -1;
      if (k > 0) {
        gate = PROGRAM.findIndex(([, d]) => N % d === 0n);
        N = (N * PROGRAM[gate][0]) / PROGRAM[gate][1];
      }
      let dI = ZERO;
      if (m.node) {
        nodes.push(m.node);
        // exact Gram–Schmidt in ℚ⁴: the part of the new vector orthogonal to those before, as a share of its squared norm
        const v = NODES[m.node - 1].map((x) => whole(x));
        let perp = v;
        for (const b of basis) {
          const c = quo(
            b.reduce((s, x, i) => plus(s, times(x, v[i])), ZERO),
            b.reduce((s, x) => plus(s, times(x, x)), ZERO)
          );
          perp = perp.map((x, i) => minus(x, times(c, b[i])));
        }
        const pn = perp.reduce((s, x) => plus(s, times(x, x)), ZERO);
        if (!isZero(pn)) {
          basis.push(perp);
          if (k > 0) dI = quo(pn, v.reduce((s, x) => plus(s, times(x, x)), ZERO));
        }
      }
      const added = m.edges.map(([a, b]) => {
        const g = canon(qmul(qconj(NODES[a - 1]), NODES[b - 1]));
        parent[find(a)] = find(b);
        return { a, b, g, gNode: nodeIndex(g) + 1, back: same(triad(NODES[a - 1], SEED, g), NODES[b - 1]) };
      });
      edges.push(...added);
      const comps = new Set(nodes.map(find)).size,
        nb1 = edges.length - nodes.length + comps,
        db1 = nb1 - b1;
      b1 = nb1;
      const dTau = plus(dI, whole(db1));
      tau = plus(tau, dTau);
      rows.push({ M: k + 1, node: m.node, audit: m.audit || null, added, V: nodes.length, E: edges.length, c: comps, rank: basis.length, dI, db1, b1, dTau, tau, N, exps: exps(N), gate, scaffolds: scaffoldsAt(k + 1) });
    }
    // the replay M16 → M16: the arithmetic scan finds no gate, the graph scan adds nothing
    const blocked = PROGRAM.map(([, d]) => N % d !== 0n);
    const replay = { M: MCOUNT, gate: PROGRAM.findIndex(([, d]) => N % d === 0n), N, exps: exps(N), dI: ZERO, db1: 0, dTau: ZERO, tau, b1, blocked, V: nodes.length, E: edges.length };
    return { rows, replay, edges };
  }
  const RUN = runAtlas();
  const FINAL = RUN.rows[MCOUNT - 1];
  /** The chord 3 → 12 of M16 against the product of the transports along the path that existed before it. */
  function chordCheck() {
    const before = RUN.edges.slice(0, -1),
      adj = new Map(range(12).map((i) => [i + 1, []]));
    for (const e of before) {
      adj.get(e.a).push([e.b, e.g]);
      adj.get(e.b).push([e.a, qconj(e.g)]);
    }
    const prev = new Map([[3, null]]),
      queue = [3];
    while (queue.length) {
      const u = queue.shift();
      for (const [v, g] of adj.get(u)) if (!prev.has(v)) (prev.set(v, [u, g]), queue.push(v));
    }
    const steps = [];
    for (let v = 12; v !== 3; ) {
      const [u, g] = prev.get(v);
      steps.unshift({ u, v, g });
      v = u;
    }
    let prod = [1, 0, 0, 0];
    for (const st of steps) prod = qmul(prod, st.g);
    const chord = RUN.edges[RUN.edges.length - 1].g;
    return { path: [3, ...steps.map((st) => st.v)], ok: same(canon(prod), chord), chord };
  }

  /* ---------- the Hecke sum of the six Lipschitz rotors of norm p = 5 on Sym^d(ℂ²), d = 2j ---------- */
  const HP = 5;
  const ROTORS = [
    [1, 2, 0, 0],
    [1, -2, 0, 0],
    [1, 0, 2, 0],
    [1, 0, -2, 0],
    [1, 0, 0, 2],
    [1, 0, 0, -2]
  ];
  const SPINS = ['0', '1/2', '1', '3/2', '2'];
  const cx = (re, im = 0n) => [re, im],
    cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  /** (a u + b v)^n as the list of its coefficients in powers of v. */
  function linPow(a, b, n) {
    let r = [cx(1n)];
    for (let t = 0; t < n; t++) {
      const next = Array.from({ length: r.length + 1 }, () => cx(0n));
      r.forEach((c, i) => {
        next[i] = cadd(next[i], cmul(c, a));
        next[i + 1] = cadd(next[i + 1], cmul(c, b));
      });
      r = next;
    }
    return r;
  }
  /** A_d = Σ_a ρ_d(π_a) in the monomial basis u^(d−r) v^r, from (u, v) ↦ (u, v)·[[w + ix, y + iz], [−y + iz, w − ix]]. */
  function heckeMatrix(d) {
    const A = range(d + 1).map(() => range(d + 1).map(() => cx(0n)));
    for (const [w, x, y, z] of ROTORS.map((q) => q.map(BigInt))) {
      const a = cx(w, x),
        b = cx(y, z),
        c = cx(-y, z),
        e = cx(w, -x);
      for (let r = 0; r <= d; r++) {
        const p1 = linPow(a, c, d - r),
          p2 = linPow(b, e, r);
        p1.forEach((x1, i) => p2.forEach((x2, j) => (A[i + j][r] = cadd(A[i + j][r], cmul(x1, x2)))));
      }
    }
    return A;
  }
  const binom = (n, k) => range(k).reduce((s, i) => (s * BigInt(n - i)) / BigInt(i + 1), 1n);
  /** The determinant of a square matrix of fractions, by elimination. */
  function detF(M) {
    const A = M.map((r) => r.slice()),
      n = A.length;
    let det = ONE;
    for (let i = 0; i < n; i++) {
      const piv = range(n - i).map((k) => k + i).find((r) => !isZero(A[r][i]));
      if (piv == null) return ZERO;
      if (piv !== i) {
        [A[i], A[piv]] = [A[piv], A[i]];
        det = minus(ZERO, det);
      }
      det = times(det, A[i][i]);
      for (let r = i + 1; r < n; r++) {
        const f = quo(A[r][i], A[i][i]);
        for (let c = i; c < n; c++) A[r][c] = minus(A[r][c], times(f, A[i][c]));
      }
    }
    return det;
  }
  function rankF(M) {
    const A = M.map((r) => r.slice()),
      n = A.length,
      m = A[0].length;
    let rk = 0;
    for (let c = 0; c < m && rk < n; c++) {
      const piv = range(n - rk).map((k) => k + rk).find((r) => !isZero(A[r][c]));
      if (piv == null) continue;
      [A[rk], A[piv]] = [A[piv], A[rk]];
      for (let r = rk + 1; r < n; r++) {
        const f = quo(A[r][c], A[rk][c]);
        for (let k = c; k < m; k++) A[r][k] = minus(A[r][k], times(f, A[rk][k]));
      }
      rk++;
    }
    return rk;
  }
  /** Everything the page shows of a shell: the matrix, its symmetry, the integer eigenvalues, λ², 20 − λ², the minors. */
  function heckeShell(d) {
    const Ac = heckeMatrix(d),
      real = Ac.every((row) => row.every((c) => c[1] === 0n)),
      A = Ac.map((row) => row.map((c) => [c[0], 1n])),
      n = d + 1,
      G = range(n).map((i) => range(n).map((j) => (i === j ? frac(1n, binom(d, i)) : ZERO))),
      At = range(n).map((i) => range(n).map((j) => A[j][i])),
      mul = (X, Y) => range(n).map((i) => range(n).map((j) => range(n).reduce((s, k) => plus(s, times(X[i][k], Y[k][j])), ZERO))),
      selfAdjoint = same(mul(At, G), mul(G, A));
    const bound = A.reduce((m, row) => Math.max(m, row.reduce((s, c) => s + abs(Number(c[0])), 0)), 0),
      eig = [];
    for (let lam = -bound; lam <= bound; lam++) {
      const shifted = A.map((row, i) => row.map((c, j) => (i === j ? minus(c, whole(lam)) : c))),
        mult = n - rankF(shifted);
      if (mult > 0) eig.push({ eig: lam, mult });
    }
    const p5 = 5n ** BigInt(d),
      levels = eig.map(({ eig: e, mult }) => {
        const lam2 = frac(BigInt(e) * BigInt(e), p5);
        return { eig: e, mult, lam2, margin: minus(whole(4 * HP), lam2), lambda: d % 2 === 0 ? frac(BigInt(e), 5n ** BigInt(d / 2)) : null };
      });
    const energy = mul(mul(At, G), A),
      form = range(n).map((i) => range(n).map((j) => minus(times(whole(4 * HP), G[i][j]), quo(energy[i][j], [p5, 1n]))));
    const minors = range(n).map((k) => detF(form.slice(0, k + 1).map((r) => r.slice(0, k + 1))));
    return { d, j: SPINS[d], A, real, selfAdjoint, levels, full: levels.reduce((s, l) => s + l.mult, 0) === n, minors };
  }
  const SHELLS = range(5).map(heckeShell);

  /* ---------- the six pillars: exact objects and their flat shadows ---------- */
  const B1 = [9, 8, 8, 4]; // a unit quaternion of ℚ⁴ times 15: (3/5, 8/15, 8/15, 4/15)
  const dottie = (() => {
    let t = 0.74;
    for (let k = 0; k < 40; k++) t -= (cs(t) - t) / (-sn(t) - 1);
    return t;
  })();
  const chi1 = (k) => minus(times(whole(4), k), ONE);
  const chi2 = (k) => plus(minus(times(whole(16), times(k, k)), times(whole(12), k)), ONE);
  const SECANTS = [2n, 4n, 8n, 16n].map((m) => {
    const h = frac(1n, m);
    return { h, slope: quo(minus(kappaAt(plus(ONE, h)), kappaAt(ONE)), h) };
  });
  const PILLARS = (() => {
    const len = isqrt(norm2(B1)),
      cosD = frac(BigInt(B1[0]), BigInt(len)),
      read = quo(plus(ONE, cosD), whole(2)),
      sag = minus(ONE, cosD),
      phi = Math.acos(fval(cosD));
    const before = canon(qconj(B1));
    const action = { key: 'action', lead: B1, points: [before, SEED, B1], cosD, read, sag, sagOk: equal(sag, times(whole(2), minus(ONE, read))), heapOk: same(triad(SEED, before, SEED), B1), phi, taylor: (phi * phi) / 2 };
    const HALF = [[1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1]];
    const fixed = { key: 'fixed', lead: HALF[0], points: HALF, kStar: quo(ONE, whole(2)), ok: HALF.every((p) => equal(kappa(SEED, p), quo(ONE, whole(2)))), theta: dottie, kDottie: cs(dottie) ** 2 };
    const JET = [[1, 0, 0, 0], [3, 2, 2, 1], [0, 2, 2, 1]];
    const jet = { key: 'jet', lead: JET[1], points: JET, kappas: JET.map((p) => kappa(SEED, p)), x0: ONE, jet: kappaJet(ONE), secants: SECANTS, base: [whole(2), whole(2), ONE] };
    jet.jetOk = jmul(jet.jet, jet.base).every((v, i) => equal(v, i ? ZERO : ONE));
    const ST = [4, 3, 0, 0];
    const kt = kappa(SEED, ST),
      ks = frac(BigInt(norm2(ST.slice(1))), BigInt(norm2(ST)));
    const spacetime = { key: 'spacetime', lead: ST, points: [ST], kTime: kt, kSpace: ks, sumOk: equal(plus(kt, ks), ONE), clock: frac(4n, 5n), speed: frac(3n, 5n), phi: Math.atan2(3, 4) };
    const hecke = { key: 'hecke', lead: ROTORS[0], points: ROTORS, kappas: ROTORS.map((p) => kappa(SEED, p)), count: ROTORS.length, ring: Math.acos(1 / Math.sqrt(HP)), twoRoot: 2 * Math.sqrt(HP) };
    const ks2 = NODES.map((p) => kappa(SEED, p));
    const cheb = { key: 'cheb', lead: NODES[1], points: NODES, chi2: ks2.map(chi2), chi1: ks2.map(chi1), sum2: ks2.map(chi2).reduce(plus, ZERO), sum1: ks2.map(chi1).reduce(plus, ZERO), nodal: [PI / 5, (2 * PI) / 5] };
    return [action, fixed, jet, spacetime, hecke, cheb];
  })();
  const PILLAR_NAME = [
    ['最小作用量与堆测地线', 'least action & heap geodesic'],
    ['自指不动点', 'self-referential fixed point'],
    ['因果射流环 ℚ[η]/(η³)', 'causal jet ring ℚ[η]/(η³)'],
    ['时空记忆勾股', 'spacetime memory Pythagoras'],
    ['临界线赫克正定界', 'critical-line Hecke PSD'],
    ['球面切比雪夫谱', 'spherical Chebyshev spectrum']
  ];

  /* ---------- the state: one rail value per card, and everything the page shows of it ---------- */
  const SCENES = ['pillars', 'quad', 'hecke', 'atlas', 'fractran'];
  // the rail of a card: its length and its speed (units per second); every rail counts whole steps
  const RAILS = {
    pillars: { max: 20, rate: 5 },
    quad: { max: 8, rate: 2 },
    hecke: { max: 4, rate: 1 },
    atlas: { max: MCOUNT - 1, rate: 2 },
    fractran: { max: MCOUNT, rate: 2 }
  };
  const STILL = { pillars: 20, quad: 8, hecke: 4, atlas: MCOUNT - 1, fractran: MCOUNT };
  const FRESH = { pillar: 1, orb: 'x2y2', haar: false };
  const state = { scene: 'pillars', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  /** The whole part and the rest of a rail value. */
  function split(t) {
    const k = Math.floor(t + 1e-9);
    return { k, f: t - k < 1e-9 ? 0 : t - k };
  }
  /** A rail value as an exact fraction over den when it rests on a whole step, else null. */
  const exactOf = (v, den) => (abs(v - Math.round(v)) < 1e-9 ? frac(BigInt(Math.round(v)), BigInt(den)) : null);
  const FMAX = Object.fromEntries(ORBS.map((k) => [k, k === 'z2' ? 4 / ORB[k].Nf : (k === 'x2y2' ? 1 : 0.25) / ORB[k].Nf]));
  /** The normalized angular density of orbital k at the unit vector n (its mean over the sphere is 1). */
  const density = (k, n) => ORB_FN[k](n) ** 2 / ORB[k].Nf;
  const ROT_F = ROTS.map((R) => R.map((row) => row.map(fval)));
  /** The number density of the shell with t electrons taken from orbital k (10 for the full shell), or its average over the
      rotations of the twelve nodes. */
  function shellDensity(k, t, haar, n) {
    if (!haar) return 10 - t * density(k, n);
    let s = 0;
    for (const R of ROT_F) s += 10 - t * density(k, [dot(R[0], n), dot(R[1], n), dot(R[2], n)]);
    return s / ROT_F.length;
  }
  function compute(s) {
    const pv = s.at.pillars,
      qv = s.at.quad,
      hv = split(s.at.hecke),
      av = split(s.at.atlas),
      fv = split(s.at.fractran);
    const tQ = exactOf(qv, 4),
      t = qv / 4,
      Q = tQ ? shellQ(s.orb, tQ) : null,
      Qf = ORB[s.orb].Q.map((row) => row.map((v) => -t * fval(v)));
    let avg = null;
    if (Q) {
      avg = Q.map((row) => row.map(() => ZERO));
      for (const R of ROTS) {
        const M = mat3(mat3(R, Q), tr3(R));
        avg = avg.map((row, i) => row.map((v, j) => plus(v, quo(M[i][j], whole(ROTS.length)))));
      }
    }
    const fk = Math.min(fv.k, MCOUNT),
      frow = fk < MCOUNT ? RUN.rows[fk] : null;
    return {
      pillars: { v: pv, beta: pv / 20, betaQ: exactOf(pv, 20), k: s.pillar, p: PILLARS[s.pillar] },
      quad: { v: qv, t, tQ, orb: s.orb, haar: s.haar, Q, Qf, avg, own: ORB[s.orb].Q },
      hecke: { v: s.at.hecke, k: Math.min(hv.k, 4), f: hv.k >= 4 ? 0 : hv.f, shell: SHELLS[Math.min(hv.k, 4)], next: SHELLS[Math.min(hv.k + 1, 4)] },
      atlas: { v: s.at.atlas, k: Math.min(av.k, MCOUNT - 1), f: av.k >= MCOUNT - 1 ? 0 : av.f, row: RUN.rows[Math.min(av.k, MCOUNT - 1)], next: RUN.rows[Math.min(av.k + 1, MCOUNT - 1)] },
      fractran: { v: s.at.fractran, k: fk, f: fk >= MCOUNT ? 0 : fv.f, row: frow || RUN.replay, replay: fk >= MCOUNT, next: fk + 1 < MCOUNT ? RUN.rows[fk + 1] : null, rowAt: RUN.rows[Math.min(fk, MCOUNT - 1)] }
    };
  }
  const calc = () => compute(state);
  /** The milestone (1 … 16) the page shows on the ball. */
  const milestoneOf = (m) => (state.scene === 'fractran' ? Math.min(m.fractran.k + 1, MCOUNT) : m.atlas.k + 1);

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  const PRESETS = {
    'six-pillar-deapproximation-compiler': { scene: 'pillars', cam: 'panorama', play: true, still: STILL.pillars },
    'au3-d8-quadrupole-anisotropy-slice': { scene: 'quad', cam: 'panorama', play: true, still: STILL.quad },
    'hecke-ramanujan-rational-psd-shell': { scene: 'hecke', cam: 'panorama', play: true, still: STILL.hecke },
    'twelve-node-atlas-dag-crystallization': { scene: 'atlas', cam: 'panorama', play: true, still: STILL.atlas },
    'five-prime-omega-fractran-fixed-point': { scene: 'fractran', cam: 'panorama', play: true, still: STILL.fractran }
  };
  const DEFAULT = 'six-pillar-deapproximation-compiler';

  /* ---------- the drawing of ℚP³ on the ball ---------- */
  /** A fixed linear projection of (x, y, z) to the horizontal plane: it keeps the twelve nodes at least 32° apart and the
      six rotors at least 25° apart. */
  const AZ = [
    [-0.8, 0.84],
    [0.98, 0.31],
    [0.18, -0.69]
  ];
  const azOf = (q) => {
    const a = [q[1] * AZ[0][0] + q[2] * AZ[1][0] + q[3] * AZ[2][0], q[1] * AZ[0][1] + q[2] * AZ[1][1] + q[3] * AZ[2][1]],
      m = hypot(...a);
    return m < 1e-12 ? null : [a[0] / m, a[1] / m];
  };
  /** The point of a rational line on the unit ball: the height w/‖p‖, the azimuth of its axis. */
  function dir(q) {
    const s = q[0] < 0 ? -1 : 1,
      n = hypot(...q),
      h = (s * q[0]) / n,
      r = Math.sqrt(Math.max(0, 1 - h * h)),
      a = azOf(q.map((v) => s * v));
    return a ? [r * a[0], r * a[1], h] : [0, 0, h];
  }
  const LIFT = 1.012;
  const on = (q, r = LIFT) => scale(dir(q), r);
  /** The tangent plate at the seed, and a point laid on it by its angle in radians from the pole (the flat ruler). */
  const PLATE = 1.006;
  const polarBall = (rho, a, r = LIFT) => [r * sn(rho) * a[0], r * sn(rho) * a[1], r * cs(rho)];
  const polarFlat = (rho, a) => [rho * a[0], rho * a[1], PLATE];
  function polarOf(q) {
    const s = q[0] < 0 ? -1 : 1,
      h = (s * q[0]) / hypot(...q);
    return { rho: Math.acos(clamp(h, -1, 1)), a: azOf(q.map((v) => s * v)) || [1, 0] };
  }
  const flatOf = (q) => {
    const { rho, a } = polarOf(q);
    return polarFlat(rho, a);
  };
  /** A flat shadow carried towards the ball: β = 0 on the plate, β = 1 on the ball. */
  const morph = (q, b) => mix(flatOf(q), on(q), b);
  const morphPolar = (rho, a, b) => mix(polarFlat(rho, a), polarBall(rho, a), b);
  const ringBall = (rho, r = LIFT) => sample(96, (u) => polarBall(rho, [cs(TAU * u), sn(TAU * u)], r));
  const ringMorph = (rho, b) => sample(96, (u) => morphPolar(rho, [cs(TAU * u), sn(TAU * u)], b));
  /** The great arc of S³ between two rational lines, drawn through their unit vectors. */
  function arc3(p, q, n = 32, r = LIFT) {
    const u = unit(p),
      v0 = unit(q),
      v = dot(u, v0) < 0 ? scale(v0, -1) : v0,
      om = Math.acos(clamp(dot(u, v), -1, 1));
    return om < 1e-9 ? [on(u, r)] : sample(n, (t) => on(add(scale(u, sn((1 - t) * om)), scale(v, sn(t * om))), r));
  }
  /** The arc of the ball between two of its points. */
  function arc2(a, b, n = 28, r = LIFT) {
    const u = unit(a),
      v = unit(b),
      om = Math.acos(clamp(dot(u, v), -1, 1));
    return om < 1e-9 ? [scale(u, r)] : sample(n, (t) => scale(add(scale(u, sn((1 - t) * om)), scale(v, sn(t * om))), r / sn(om)));
  }

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  /** The azimuth of the viewer of each scene: the camera looks at the ball from this side. */
  const VIEW_AZ = (30 * PI) / 180;
  const PITCH = { pillars: [0.62, 0.24, -0.3], quad: [0.48, 0.14, -0.36], hecke: [0.3, 0.1, -0.3], atlas: [0.5, 0.16, -0.36], fractran: [0.34, 0.12, -0.3] };
  const CAMI = { panorama: 0, face: 1, under: 2 };
  /** The yaw that puts the viewer at azimuth θ: R then points to θ + 90°. */
  const yawAt = (th) => Math.atan2(-cs(th), -sn(th));
  /** Pillars i, iii and iv are drawn on one meridian: the viewer stands 90° before it, so that the meridian runs to the right. */
  function pillarView(k) {
    const p = PILLARS[k];
    if (!['action', 'jet', 'spacetime'].includes(p.key)) return VIEW_AZ;
    const a = polarOf(p.lead).a;
    return Math.atan2(a[1], a[0]) - PI / 2;
  }
  function camFor(scene, name, pillar = state.pillar) {
    const i = CAMI[name] == null ? 0 : CAMI[name],
      th = scene === 'pillars' ? pillarView(pillar) : VIEW_AZ;
    return [yawAt(th) + [0, 0.22, -0.18][i], PITCH[scene][i], 1];
  }
  const START = camFor('pillars', 'panorama', FRESH.pillar);
  const opts = { canvas: $('cv'), yaw: START[0], pitch: START[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(START[0], START[1]);
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  /** The pixel offset (right, up) of a world point, for labels. */
  const off = (p, right, up) => add(add(p, scale(cam.R, right / sc.unit)), scale(cam.U, up / sc.unit));

  /* fixed world places: the Hecke tower and the prime towers right of the ball, the milestone dial in front of it */
  const AT = (th, r, z) => [r * cs(th), r * sn(th), z];
  const TOWER_AT = AT(VIEW_AZ + PI / 2, 1.78, 0);
  const LOG_LO = -1.3,
    LOG_HI = 2.45,
    TOWER_Z = [-1.0, 1.18];
  /** The height of a value on the Hecke tower: its logarithm to base 5, laid out between the two ends of the tower. */
  const towerZ = (v) => lerp(TOWER_Z[0], TOWER_Z[1], (Math.log(v) / Math.log(HP) - LOG_LO) / (LOG_HI - LOG_LO));
  const FLOOR = -1.12,
    CUBE = 0.1,
    STEP = 0.112;
  /** The five prime towers stand in a row right of the ball, a little towards the viewer. */
  const ROW_R = [cs(VIEW_AZ + PI / 2), sn(VIEW_AZ + PI / 2), 0],
    ROW_D = [cs(VIEW_AZ), sn(VIEW_AZ), 0];
  const PRIME_AT = PRIMES.map((_, k) => add(add(scale(ROW_R, 1.5 + 0.42 * k), scale(ROW_D, 0.35)), [0, 0, FLOOR]));
  const DIAL_R = 1.12,
    DIAL_Z = -1.24;
  /** The milestone dial: a front arc of 200° below the ball, from milestone 1 on the left to the end on the right. */
  const dialPoint = (v, max) => AT(VIEW_AZ - ((100 - (200 * v) / max) * PI) / 180, DIAL_R, DIAL_Z);
  const SCAFFOLD_AT = SCAFFOLDS.map((_, k) => scale(unit([cs(VIEW_AZ + ((k - 2) * 38 * PI) / 180), sn(VIEW_AZ + ((k - 2) * 38 * PI) / 180), 1.15]), 1.62));

  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  const solid = (key, mesh, color, alpha = 1, edges = P.ink) => alpha > 0.01 && sc.poly(alpha < 0.99 ? key + '~' : key, mesh, { color, alpha, edges, pick: false, occlude: alpha >= 0.99 });
  /* the weights of the two readings in the two lenses: exact objects cyan, flat shadows and scaffolds magenta */
  const weight = () => (state.lens ? { exact: 0.5, flat: 1 } : { exact: 1, flat: 0.78 });
  function drawBall(a) {
    if (a < 0.01) return;
    // brighter towards the seed, darker towards the equator: the shade follows the height w/‖p‖, whose square is κ(p0, p)
    const at = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface('ball' + (a < 0.99 ? '~' : ''), at, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 }, alpha: a < 0.99 ? a : 1, pick: false });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03 * a, rim: 0.4 * a });
    sc.circle([0, 0, 0], [0, 0, 1], LIFT, { color: P.violet, width: 1.4, alpha: 0.8 * a, back: 0.2 });
  }
  /** A horizontal disc of radius r and thickness h centred at c, as a 28-sided prism. */
  function disc(c, r, h) {
    const n = 28,
      ring = (z) => range(n).map((k) => [c[0] + r * cs((TAU * k) / n), c[1] + r * sn((TAU * k) / n), c[2] + z]);
    return { vertices: [...ring(-h / 2), ...ring(h / 2)], faces: [range(n).reverse(), range(n).map((k) => n + k), ...range(n).map((k) => [k, (k + 1) % n, n + ((k + 1) % n), n + k])] };
  }
  /** A cube of side s centred at c. */
  function cube(c, s) {
    const h = s / 2,
      v = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]].map((d) => add(c, scale(d, h)));
    return { vertices: v, faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] };
  }

  /* ---------- card 1: the six pillars ---------- */
  /** The largest radius the flat ruler needs for a pillar, and so the radius of its plate. */
  const plateRadius = (p) => 0.2 + Math.max(...p.points.map((q) => polarOf(q).rho), p.key === 'fixed' ? dottie : 0, p.key === 'cheb' ? (2 * PI) / 5 : 0, p.key === 'jet' ? PI / 2 : 0);
  /** The lead point of a pillar and its way from the plate to the ball. */
  const leadAt = (p, b) => morph(p.lead, b);
  /** The point x of the meridian of pillar iii: the line of (1, x·(2, 2, 1)/3), with κ(p0, ·) = 1/(1 + x²). */
  const jetPoint = (x) => [1, (2 * x) / 3, (2 * x) / 3, x / 3];
  function drawPillars(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      pl = m.pillars,
      p = pl.p,
      b = pl.beta,
      ex = a * exact * (0.4 + 0.6 * b),
      sh = a * flat * (1 - b),
      PR = plateRadius(p);
    // the tangent plate at the seed: the flat shadows live on it; a dashed rim stays as a faint reference
    if (sh > 0.01) sc.surface('plate~', (u, v) => [u * PR * cs(TAU * v), u * PR * sn(TAU * v), PLATE - 0.002], { u: [0, 1], v: [0, 1], nu: 4, nv: 64, color: P.magenta, alpha: 0.13 * sh, pick: false, occlude: false });
    sc.circle([0, 0, PLATE], [0, 0, 1], PR, { color: P.magenta, width: 1.2, dash: [4, 5], alpha: a * flat * (0.22 + 0.6 * (1 - b)), fade: false });
    sc.bead(on(SEED), { color: P.cyan, r: 4.6, alpha: a * exact, key: 'seed' });
    const shadowBead = (q, key, r = 4.2) => sh > 0.01 && sc.bead(morph(q, b), { color: P.magenta, r, alpha: sh, key });
    if (p.key === 'action') {
      const ah = polarOf(p.lead).a,
        span = p.phi * 1.22;
      tube('p-geo', sample(48, (u) => polarBall(lerp(-span, span, u), ah)), P.cyan, 0.014, ex);
      p.points.forEach((q, i) => sc.bead(on(q), { color: P.cyan, r: 4.6, alpha: ex, key: 'p-x' + i }));
      // the sagitta of one step: the drop from the plate down to x(t + 1), exactly 1 − ⟨x(t), x(t + 1)⟩
      for (const q of [p.points[0], p.points[2]]) {
        const d = dir(q);
        sc.line([[d[0], d[1], 1], d], { color: P.cyan, width: 2.4, alpha: ex });
        sc.line([[0, 0, 1], [d[0], d[1], 1]], { color: P.cyan, width: 1, dash: [3, 4], alpha: 0.6 * ex });
      }
      if (sh > 0.01) {
        // the flat ruler: the same three points at their angle in radians, on a straight line, and the Taylor drop φ²/2
        sc.line(sample(24, (u) => morphPolar(lerp(-span, span, u), ah, b)), { color: P.magenta, width: 1.6, alpha: sh });
        p.points.forEach((q, i) => shadowBead(q, 'p-s' + i));
        const at = morph(p.points[2], b);
        sc.line([[at[0], at[1], PLATE], [at[0], at[1], PLATE - p.taylor]], { color: P.magenta, width: 2, dash: [5, 3], alpha: sh });
      }
    }
    if (p.key === 'fixed') {
      sc.circle([0, 0, LIFT * Math.SQRT1_2], [0, 0, 1], LIFT * Math.SQRT1_2, { color: P.cyan, width: 2.2, alpha: ex, back: 0.25 });
      p.points.forEach((q, i) => {
        sc.bead(on(q), { color: P.cyan, r: 4.6, alpha: ex, key: 'p-h' + i });
        tube('p-hm' + i, arc3(SEED, q, 24), P.cyan, 0.01, 0.7 * ex);
        shadowBead(q, 'p-hs' + i);
      });
      if (sh > 0.01) sc.line(ringMorph(dottie, b), { color: P.magenta, width: 2, alpha: sh });
    }
    if (p.key === 'jet') {
      const ah = polarOf(p.lead).a;
      tube('p-mer', sample(48, (u) => polarBall((u * PI) / 2, ah)), P.cyan, 0.012, ex);
      p.points.forEach((q, i) => {
        sc.bead(on(q), { color: P.cyan, r: 4.6, alpha: ex, key: 'p-j' + i });
        shadowBead(q, 'p-js' + i);
      });
      // the jet at x₀ = 1: the tangent of the meridian, exact in one algebraic step
      const here = on(p.lead),
        along = unit(sub(polarBall(PI / 4 + 0.01, ah), polarBall(PI / 4 - 0.01, ah)));
      sc.arrow(here, add(here, scale(along, 0.42)), { color: P.cyan, width: 2.6, headSize: 11, alpha: ex });
      if (sh > 0.01)
        // the secants of the limit: from x₀ = 1 to x₀ + h, h = 1/2, 1/4, 1/8, carried as the plate is carried
        p.secants.slice(0, 3).forEach((s, i) => {
          const x = 1 + fval(s.h);
          sc.line([morph(p.lead, b), morph(jetPoint(x), b)], { color: P.magenta, width: 1.6, alpha: sh * (1 - 0.25 * i) });
        });
    }
    if (p.key === 'spacetime') {
      const ah = polarOf(p.lead).a,
        rho = polarOf(p.lead).rho;
      tube('p-time', sample(24, (u) => polarBall(u * rho, ah)), P.cyan, 0.018, ex);
      sc.line(sample(24, (u) => polarBall(lerp(rho, PI / 2, u), ah)), { color: P.cyan, width: 2.4, dash: [6, 4], alpha: ex });
      for (const [q, key] of [[p.lead, 'p-p'], [[0, 1, 0, 0], 'p-e']]) sc.bead(on(q), { color: P.cyan, r: 4.8, alpha: ex, key });
      if (sh > 0.01) {
        sc.line([polarFlat(0, ah), morphPolar(rho, ah, b)], { color: P.magenta, width: 1.8, alpha: sh });
        shadowBead(p.lead, 'p-ps');
        shadowBead([0, 1, 0, 0], 'p-es');
      }
    }
    if (p.key === 'hecke') {
      const h = 1 / Math.sqrt(HP);
      sc.circle([0, 0, LIFT * h], [0, 0, 1], LIFT * Math.sqrt(1 - h * h), { color: P.cyan, width: 1.6, alpha: ex, back: 0.25 });
      p.points.forEach((q, i) => {
        sc.bead(on(q), { color: P.cyan, r: 4.4, alpha: ex, key: 'p-r' + i });
        tube('p-ra' + i, arc3(SEED, q, 20), P.cyan, 0.009, 0.7 * ex);
        shadowBead(q, 'p-rs' + i, 3.6);
      });
      if (sh > 0.01) sc.line(ringMorph(p.ring, b), { color: P.magenta, width: 2, alpha: sh });
    }
    if (p.key === 'cheb') {
      p.points.forEach((q, i) => {
        const c = fval(p.chi2[i]),
          at = on(q);
        sc.bead(at, { color: P.cyan, r: 4, alpha: ex, key: 'p-n' + i });
        if (c > 0) tube('p-sp' + i, [at, scale(dir(q), LIFT + 0.07 * c)], P.cyan, 0.016, ex);
        else sc.ring(at, { color: P.cyan, r: 8, alpha: ex, normal: dir(q), key: 'p-nr' + i });
        shadowBead(q, 'p-ns' + i, 3.4);
      });
      if (sh > 0.01) p.nodal.forEach((rho, i) => sc.line(ringMorph(rho, b), { color: P.magenta, width: 1.8, dash: i ? [5, 4] : null, alpha: sh }));
    }
  }

  /* ---------- card 2: the 5d shell ---------- */
  const SH0 = 0.55,
    SH1 = 0.45;
  const shellRadius = (q, n) => SH0 + (SH1 * shellDensity(q.orb, q.t, q.haar, n)) / 10;
  const sphereAt = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  /** The lobe directions of an orbital, where its density is largest. */
  const LOBES = {
    z2: [[0, 0, 1], [0, 0, -1]],
    xz: [[1, 0, 1], [-1, 0, -1], [1, 0, -1], [-1, 0, 1]].map(unit),
    yz: [[0, 1, 1], [0, -1, -1], [0, 1, -1], [0, -1, 1]].map(unit),
    xy: [[1, 1, 0], [-1, -1, 0], [1, -1, 0], [-1, 1, 0]].map(unit),
    x2y2: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]]
  };
  /** The lobe of the vacated orbital that faces the viewer most: the handle sits on it. */
  const frontLobe = (orb) => LOBES[orb].reduce((best, n) => (dot(n, cam.D) + 0.15 * n[2] > dot(best, cam.D) + 0.15 * best[2] ? n : best));
  /** The quadrupole gauge: a bead on each axis at 1.24 + 0.18·Q_aa; |Q_aa| ≤ 8/7 keeps it outside the shell (radius ≤ 1). */
  const GAUGE = (v) => 1.24 + 0.18 * v;
  function drawQuad(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      q = m.quad,
      fmax = FMAX[q.orb];
    sc.surface('shell' + (a < 0.99 ? '~' : ''), (u, v) => scale(sphereAt(u, v), shellRadius(q, sphereAt(u, v))), { u: [0, PI], v: [0, TAU], nu: 44, nv: 88, colors: [P.violet, P.cyan], range: [0.1, 1], value: (u, v) => shellDensity(q.orb, q.t, q.haar, sphereAt(u, v)) / 10, grid: { every: [4, 8], alpha: 0.14 }, alpha: a < 0.99 ? a : 1, pick: false });
    // the vacated electrons: magenta lobes lifted off the dent they leave
    const lift = 0.46 * (q.t / 2);
    if (!q.haar && q.t > 0.01)
      sc.surface('hole~', (u, v) => {
        const n = sphereAt(u, v);
        return scale(n, shellRadius(q, n) + 0.004 + (lift * density(q.orb, n)) / fmax);
      }, { u: [0, PI], v: [0, TAU], nu: 44, nv: 88, color: P.magenta, alpha: (u, v) => clamp((density(q.orb, sphereAt(u, v)) / fmax) * 1.6, 0, 1) * 0.42 * a * flat, pick: false, occlude: false });
    // the quadrupole gauge: on each axis a bead at 1.24 + 0.34·Q_aa; the twelve rotated copies faint when averaged
    for (let k = 0; k < 3; k++) {
      const e = [0, 0, 0];
      e[k] = 1;
      sc.line([scale(e, -1.48), scale(e, 1.48)], { color: P.violet, width: 1.1, alpha: 0.55 * a });
      const v = q.haar ? 0 : q.Qf[k][k];
      for (const s of [1, -1]) {
        sc.bead(scale(e, s * GAUGE(v)), { color: P.cyan, r: 4.6, alpha: a * exact, key: `g${k}${s}` });
        sc.circle(scale(e, s * GAUGE(0)), e, 0.07, { color: P.cyan, width: 1, alpha: 0.5 * a * exact, fade: false });
      }
      // a rotated copy R Q Rᵀ has the diagonal entry Σᵢ R_kᵢ² Q_ii on axis k
      if (q.haar)
        ROT_F.forEach((R, r) => {
          const qq = range(3).reduce((s, i) => s + R[k][i] * R[k][i] * q.Qf[i][i], 0);
          sc.bead(scale(e, GAUGE(qq)), { color: P.violet, r: 2.6, alpha: 0.7 * a, key: `gr${k}-${r}` });
        });
    }
    if (state.lens && q.haar)
      // the continuous Haar average (MODEL): a sphere, the l = 4 part of the finite average gone too
      sc.glass('haarC', [0, 0, 0], SH0 + SH1 * (10 - q.t) / 10 + 0.02, { color: P.magenta, alpha: 0.05 * a, rim: 0.5 * a * flat });
  }

  /* ---------- card 3: the Hecke tower ---------- */
  const towerPoint = (v) => [TOWER_AT[0], TOWER_AT[1], towerZ(v)];
  /** The top of the tower for a rail value: the largest λ² of the shell, between two shells while the rail moves. */
  const shellTop = (sh) => Math.max(...sh.levels.map((l) => fval(l.lam2)));
  function drawHecke(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      h = m.hecke;
    sc.bead(on(SEED), { color: P.cyan, r: 4.6, alpha: a * exact, key: 'h-seed' });
    const k5 = 1 / Math.sqrt(HP);
    sc.circle([0, 0, LIFT * k5], [0, 0, 1], LIFT * Math.sqrt(1 - k5 * k5), { color: P.cyan, width: 1.3, alpha: 0.8 * a * exact, back: 0.25 });
    ROTORS.forEach((q, i) => {
      sc.bead(on(q), { color: P.cyan, r: 4.4, alpha: a * exact, key: 'h-r' + i });
      tube('h-ra' + i, arc3(SEED, q, 20), P.cyan, 0.01, 0.75 * a * exact);
    });
    // the tower: an axis on a logarithm to base 5, ticks at p⁰, p¹, p², the ceiling 4p and the pole mode (p + 1)²
    const [z0, z1] = TOWER_Z;
    sc.line([[TOWER_AT[0], TOWER_AT[1], z0], [TOWER_AT[0], TOWER_AT[1], z1]], { color: P.violet, width: 1.6, alpha: a });
    for (const v of [1, 5, 25]) sc.circle(towerPoint(v), [0, 0, 1], 0.075, { color: P.violet, width: 1.6, alpha: a, fade: false });
    solid('ceiling', disc(towerPoint(4 * HP), 0.34, 0.016), P.cyan, 0.32 * a * exact);
    sc.circle(towerPoint(4 * HP), [0, 0, 1], 0.34, { color: P.cyan, width: 2, alpha: a * exact, fade: false });
    sc.circle(towerPoint((HP + 1) ** 2), [0, 0, 1], 0.26, { color: P.magenta, width: 1.4, dash: [4, 4], alpha: a * flat, fade: false });
    const draw = (sh, w, tag) =>
      sh.levels.forEach((l, i) => {
        const v = fval(l.lam2),
          over = v > 4 * HP,
          col = over ? P.magenta : P.cyan;
        solid(`lev${tag}${i}`, disc(towerPoint(v), 0.1 + 0.04 * l.mult, 0.04), col, w * a * (over ? flat : exact));
      });
    draw(h.shell, 1 - h.f, 'a');
    if (h.f > 0) draw(h.next, h.f, 'b');
  }

  /* ---------- card 4 and 5: the atlas on the ball ---------- */
  const nodeAt = (i) => on(NODES[i - 1]);
  /** The arc of a directed edge on the ball, cut to the share u of its length. */
  const edgeArc = (e, u = 1) => {
    const pts = arc2(dir(NODES[e.a - 1]), dir(NODES[e.b - 1]), 28);
    return pts.slice(0, Math.max(2, Math.round(1 + u * (pts.length - 1))));
  };
  function drawAtlas(m, a, mute = 1) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      at = state.scene === 'fractran' ? m.fractran : m.atlas,
      k = Math.min(at.k, MCOUNT - 1),
      f = state.scene === 'fractran' ? 0 : at.f,
      row = RUN.rows[k],
      next = RUN.rows[Math.min(k + 1, MCOUNT - 1)],
      live = a * exact * mute;
    RUN.rows.slice(0, k + 1).forEach((r) => {
      const now = r.M === k + 1 && f === 0 && state.scene === 'atlas';
      if (r.node) sc.bead(nodeAt(r.node), { color: now ? P.amber : P.cyan, r: now ? 6.4 : 4.6, alpha: now ? a : live, key: 'n' + r.node });
      r.added.forEach((e) => {
        const pts = edgeArc(e);
        tube(`e${e.a}-${e.b}`, pts, now ? P.amber : P.cyan, now ? 0.016 : 0.011, now ? a : 0.85 * live);
        sc.arrow(pts[pts.length - 6], pts[pts.length - 2], { color: now ? P.amber : P.cyan, width: 1.6, headSize: 7, alpha: now ? a : 0.85 * live });
      });
    });
    if (f > 0 && next !== row) {
      if (next.node) sc.bead(nodeAt(next.node), { color: P.amber, r: 6.4, alpha: f * a, key: 'n' + next.node });
      next.added.forEach((e) => tube(`e${e.a}-${e.b}`, edgeArc(e, f), P.amber, 0.016, a));
    }
    // the five flat scaffolds: bridges from the seed out to π, e, φ, ∞, lim; at milestone 13 they fold back ([a, c, c] = a)
    const M = k + 1,
      fold = M === 12 ? f : M >= 13 ? 1 : 0;
    if (fold < 1)
      SCAFFOLD_AT.forEach((s, i) => {
        const tip = mix(s, on(SEED), fold);
        sc.line([on(SEED), tip], { color: P.magenta, width: 1.6, dash: [4, 4], alpha: (1 - fold) * a * flat * mute });
        sc.bead(tip, { color: P.magenta, r: 4.2, alpha: (1 - fold) * a * flat * mute, key: 'sc' + i });
      });
  }
  function drawDial(a, v, max) {
    if (a < 0.01) return;
    sc.line(sample(80, (u) => dialPoint(u * max, max)), { color: P.violet, width: 1.4, alpha: 0.8 * a });
    for (let k = 0; k <= max; k++) sc.bead(dialPoint(k, max), { color: k <= v + 1e-9 ? P.cyan : P.violet, r: k === 12 || k === max ? 3.4 : 2.4, alpha: a, key: 'd' + k });
  }
  /** Where the cubes of tower i stand: the top of the stack at height n. */
  const cubeAt = (i, n) => add(PRIME_AT[i], [0, 0, CUBE / 2 + STEP * n]);
  function drawFractran(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      fr = m.fractran,
      row = fr.replay ? RUN.replay : RUN.rows[fr.k],
      next = fr.next,
      g = next ? next.gate : -1,
      f = fr.f;
    // the gate g takes two cubes of tower 3 − g and gives one to tower 4 − g: 3/4 from 2 to 3, … , 11/49 from 7 to 11
    const from = g >= 0 ? 3 - g : -1,
      to = g >= 0 ? 4 - g : -1;
    PRIMES.forEach((_, i) => {
      const n = row.exps[i],
        keep = i === from && f > 0 ? n - 2 : n;
      for (let c = 0; c < keep; c++) solid(`c${i}-${c}`, cube(cubeAt(i, c), CUBE), P.cyan, a * exact);
      sc.circle(PRIME_AT[i], [0, 0, 1], 0.1, { color: P.violet, width: 1.4, alpha: a, fade: false });
    });
    if (f > 0 && from >= 0) {
      // two cubes leave tower `from` and merge into one that lands on tower `to`
      const n = row.exps[from],
        land = cubeAt(to, row.exps[to]);
      for (const c of [n - 2, n - 1]) {
        const start = cubeAt(from, c),
          mid = add(mix(start, land, 0.5), [0, 0, 0.5]),
          u = f,
          p = add(scale(start, (1 - u) * (1 - u)), add(scale(mid, 2 * u * (1 - u)), scale(land, u * u)));
        solid(`fly${c - n + 2}`, cube(p, CUBE * (1 - 0.3 * u)), P.amber, a);
      }
    }
    // the four gates: arcs between the feet of neighbouring towers; the firing one amber, blocked ones dashed
    PROGRAM.forEach((_, gi) => {
      const i = 3 - gi,
        j = 4 - gi,
        p0 = add(PRIME_AT[i], [0, 0, -0.02]),
        p1 = add(PRIME_AT[j], [0, 0, -0.02]),
        mid = add(mix(p0, p1, 0.5), scale(ROW_D, 0.22)),
        curve = sample(20, (u) => add(scale(p0, (1 - u) * (1 - u)), add(scale(mid, 2 * u * (1 - u)), scale(p1, u * u)))),
        firing = gi === g && !fr.replay,
        blocked = fr.replay || (fr.k === MCOUNT - 1 && !next);
      sc.line(curve, { color: firing ? P.amber : P.cyan, width: firing ? 2.6 : 1.4, dash: blocked ? [3, 4] : null, alpha: (firing ? 1 : 0.6) * a * (firing ? 1 : exact) });
      if (firing) sc.arrow(curve[16], curve[20], { color: P.amber, width: 2, headSize: 9, alpha: a });
    });
    if (state.lens)
      // the real logarithm (MODEL): ln N = Σ v_p ln p, a magenta bar beside each tower
      PRIMES.forEach((p, i) => {
        const hgt = row.exps[i] * Math.log(p) * 0.12;
        const foot = add(PRIME_AT[i], scale(ROW_R, 0.12));
        if (hgt > 0.001) sc.line([foot, add(foot, [0, 0, hgt])], { color: P.magenta, width: 3, alpha: a * flat });
      });
  }

  /* ---------- words ---------- */
  const SCENE_NAME = {
    pillars: [['去近似重编译', 'DE-APPROXIMATION'], ['平直阴影（MODEL）', 'FLAT SHADOWS (MODEL)']],
    quad: [['金的 5d 壳层', 'GOLD 5d SHELL'], ['连续哈尔平均（MODEL）', 'CONTINUOUS HAAR (MODEL)']],
    hecke: [['赫克谱壳 p = 5', 'HECKE SHELLS p = 5'], ['拉马努金界 2√p（MODEL）', 'RAMANUJAN 2√p (MODEL)']],
    atlas: [['十二晶核图谱', 'TWELVE-NODE ATLAS'], ['平直脚手架（MODEL）', 'FLAT SCAFFOLDS (MODEL)']],
    fractran: [['五素数 Ω-FRACTRAN', 'FIVE-PRIME Ω-FRACTRAN'], ['实对数账（MODEL）', 'REAL LOGARITHM (MODEL)']]
  };
  const LENS_NAME = [
    ['OmegaMath 有理重编译', 'OMEGAMATH COMPILER'],
    ['平直对照 (MODEL)', 'FLAT CONTRAST (MODEL)']
  ];
  const ORB_NAME = { z2: 'd<sub>z²</sub>', xz: 'd<sub>xz</sub>', yz: 'd<sub>yz</sub>', xy: 'd<sub>xy</sub>', x2y2: 'd<sub>x²−y²</sub>' };
  const ORB_PLAIN = { z2: 'z²', xz: 'xz', yz: 'yz', xy: 'xy', x2y2: 'x² − y²' };
  const GATE_TEXT = (g) => (g < 0 ? '—' : PROGRAM_TEXT[g]);
  /** The exact key and the flat key of a pillar. */
  function pillarKeys(p, say = L) {
    switch (p.key) {
      case 'action':
        return { exact: `2s = ${fstr(p.sag)}`, flat: `φ²/2 ${approx(p.taylor)}`, long: say(`κ = (1 + ⟨x(t), x(t + 1)⟩)/2 = ${fstr(p.read)}，矢高 1 − ⟨x(t), x(t + 1)⟩ = 2(1 − κ) = ${fstr(p.sag)}`, `κ = (1 + ⟨x(t), x(t + 1)⟩)/2 = ${fstr(p.read)}, sagitta 1 − ⟨x(t), x(t + 1)⟩ = 2(1 − κ) = ${fstr(p.sag)}`) };
      case 'fixed':
        return { exact: `κ* = ${fstr(p.kStar)}`, flat: `θ* ${approx(p.theta)}`, long: say(`κ = 1 − κ 只有一个解 κ* = ${fstr(p.kStar)}，落在 (1, 1, 0, 0)、(1, 0, 1, 0)、(1, 0, 0, 1) 的纬圈上`, `κ = 1 − κ has the one solution κ* = ${fstr(p.kStar)}, on the circle of (1, 1, 0, 0), (1, 0, 1, 0), (1, 0, 0, 1)`) };
      case 'jet':
        return { exact: `(${p.jet.map(fstr).join(', ')})`, flat: `lim${say('（割线斜率 ', ' (secant slope ')}${fstr(p.secants[3].slope)} ${relQ(p.secants[3].slope)}${say('）', ')')}`, long: say(`x₀ = 1 处 κ = 1/(1 + x²) 的射流 (${p.jet.map(fstr).join(', ')})，η³ ≡ 0，一步代数`, `the jet of κ = 1/(1 + x²) at x₀ = 1 is (${p.jet.map(fstr).join(', ')}), η³ ≡ 0, one algebraic step`) };
      case 'spacetime':
        return { exact: `${fstr(p.kTime)} + ${fstr(p.kSpace)} = 1`, flat: `φ ${approx(p.phi)} rad`, long: say(`(4, 3, 0, 0)：κ<sub>time</sub> = ${fstr(p.kTime)}，κ<sub>space</sub> = ${fstr(p.kSpace)}，钟速 ${fstr(p.clock)}、移速 ${fstr(p.speed)}，不开根号`, `(4, 3, 0, 0): κ<sub>time</sub> = ${fstr(p.kTime)}, κ<sub>space</sub> = ${fstr(p.kSpace)}, clock rate ${fstr(p.clock)} and speed ${fstr(p.speed)} without a root`) };
      case 'hecke':
        return { exact: `κ = ${fstr(p.kappas[0])} × ${p.count}`, flat: `2√5 ${approx(p.twoRoot)}`, long: say(`p + 1 = ${p.count} 枚利普希茨旋子都有 κ(p0, π) = ${fstr(p.kappas[0])} = 1/p，界写成有理的 4p = ${4 * HP}`, `p + 1 = ${p.count} Lipschitz rotors, each with κ(p0, π) = ${fstr(p.kappas[0])} = 1/p; the bound reads 4p = ${4 * HP}, rational`) };
      default:
        return { exact: `Σχ₂ = ${fstr(p.sum2)}`, flat: `π/5 ${approx(PI / 5)}`, long: say(`χ₂(κ) = 16κ² − 12κ + 1 在十二个节点上是 5、−1、1：5 − 8 + 3 = ${fstr(p.sum2)}；χ₁ = 4κ − 1 之和 ${fstr(p.sum1)}`, `χ₂(κ) = 16κ² − 12κ + 1 is 5, −1, 1 on the twelve nodes: 5 − 8 + 3 = ${fstr(p.sum2)}; χ₁ = 4κ − 1 adds to ${fstr(p.sum1)}`) };
    }
  }
  /** The flat sentence of a pillar: what the shadow uses. */
  function pillarFlat(p, say = L) {
    switch (p.key) {
      case 'action':
        return say(`平直阴影：步长按弧度 φ = arccos(3/5) ${approx(p.phi)} 量，矢高用泰勒近似 φ²/2 ${approx(p.taylor)}。`, `Flat shadow: the step measured in radians, φ = arccos(3/5) ${approx(p.phi)}, the sagitta by the Taylor value φ²/2 ${approx(p.taylor)}.`);
      case 'fixed':
        return say(`平直阴影：cos θ = θ 的解 θ* ${approx(p.theta)}，它的纬圈上 κ = cos²θ* ${approx(p.kDottie)}。`, `Flat shadow: the solution θ* ${approx(p.theta)} of cos θ = θ, whose circle has κ = cos²θ* ${approx(p.kDottie)}.`);
      case 'jet':
        return say(`平直阴影：割线斜率 ${p.secants.map((s) => fstr(s.slope)).join('、')} 要取极限才到导数；弧度尺把三点放在 0、π/4、π/2。`, `Flat shadow: the secant slopes ${p.secants.map((s) => fstr(s.slope)).join(', ')} reach the derivative only in the limit; the radian ruler puts the three points at 0, π/4, π/2.`);
      case 'spacetime':
        return say(`平直阴影：快度角 φ = arctan(3/4) ${approx(p.phi)} rad，钟速写成 √(1 − v²)。`, `Flat shadow: the angle φ = arctan(3/4) ${approx(p.phi)} rad, the clock rate written as √(1 − v²).`);
      case 'hecke':
        return say(`平直阴影：界写成 |λ| ≤ 2√5 ${approx(p.twoRoot)}，纬圈的弧度 arccos(1/√5) ${approx(p.ring)}。`, `Flat shadow: the bound written as |λ| ≤ 2√5 ${approx(p.twoRoot)}, the circle at arccos(1/√5) ${approx(p.ring)} rad.`);
      default:
        return say(`平直阴影：U₄(cos φ) = sin 5φ/sin φ 的节圆在 π/5 ${approx(PI / 5)} 与 2π/5 ${approx((2 * PI) / 5)}，φ = 0 处要取极限。`, `Flat shadow: the nodal circles of U₄(cos φ) = sin 5φ/sin φ at π/5 ${approx(PI / 5)} and 2π/5 ${approx((2 * PI) / 5)}, with a limit at φ = 0.`);
    }
  }
  const betaText = (pl) => (pl.betaQ ? `β = ${fstr(pl.betaQ)}` : `β ${approx(pl.beta, 2)}`);
  const qText = (q) => (q.Q ? diag(range(3).map((i) => q.Q[i][i])) : `diag(${range(3).map((i) => approx(q.Qf[i][i], 3)).join(', ')})`);
  const tText = (q) => (q.tQ ? `t = ${fstr(q.tQ)}` : `t ${approx(q.t, 2)}`);
  const levelText = (sh) => sh.levels.map((l) => `λ² = ${fstr(l.lam2)}`).join(' · ');
  const marginText = (sh) => sh.levels.map((l) => fstr(l.margin)).join(L('、', ', '));
  const expText = (e) => `(${e.join(', ')})`;
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read it. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'pillars':
        return m.pillars.beta >= 1 - 1e-9 ? 'exact' : m.pillars.beta <= 1e-9 ? 'flat' : 'moving';
      case 'quad':
        return m.quad.haar ? 'haar' : m.quad.t <= 1e-9 ? 'full' : m.quad.tQ && equal(m.quad.tQ, whole(2)) ? 'vacated' : 'moving';
      case 'hecke':
        return m.hecke.f > 0 ? 'moving' : 'j' + m.hecke.k;
      case 'atlas':
        return m.atlas.f > 0 ? 'moving' : 'M' + (m.atlas.k + 1);
      default:
        return m.fractran.replay ? 'replay' : m.fractran.f > 0 ? 'moving' : 'M' + (m.fractran.k + 1);
    }
  }
  function bigline(m) {
    const s = state.scene,
      pl = m.pillars,
      q = m.quad,
      h = m.hecke,
      at = m.atlas.row,
      fr = m.fractran;
    const key = {
      pillars: () => pillarKeys(pl.p).exact,
      quad: () => (q.haar ? '⟨Q⟩ = 0' : q.t <= 1e-9 ? 'Q = 0' : `Q<sub>zz</sub> ${q.Q ? '= ' + fstr(q.Q[2][2]) : approx(q.Qf[2][2], 3)}`),
      hecke: () => `j = ${h.shell.j} · 20 − λ² ≥ ${fstr(h.shell.levels.reduce((lo, l) => (cmp(l.margin, lo) < 0 ? l.margin : lo), h.shell.levels[0].margin))}`,
      atlas: () => `M${at.M} · b₁ = ${at.b1} · τ = ${fstr(at.tau)}`,
      fractran: () => (fr.replay ? `M16 → M16 · Δτ = 0` : `M${fr.k + 1} · N = ${fr.row.N}`)
    };
    const flatKey = {
      pillars: () => pillarKeys(pl.p).flat,
      quad: () => '∫ dR/(8π²)',
      hecke: () => `|λ| ≤ 2√5 ${approx(2 * Math.sqrt(HP))}`,
      atlas: () => L(`脚手架 ${at.scaffolds}`, `scaffolds ${at.scaffolds}`),
      fractran: () => `ln N ${approx(Math.log(Number(fr.row.N)))}`
    };
    return `${L(...SCENE_NAME[s][state.lens])} · <span class="nb">${(state.lens ? flatKey : key)[s]()}</span>`;
  }
  function subline(m) {
    const s = state.scene,
      tiny = compact();
    if (s === 'pillars') {
      const pl = m.pillars,
        p = pl.p,
        k = pillarKeys(p);
      if (state.lens) return pillarFlat(p);
      const name = L(...PILLAR_NAME[pl.k]);
      if (tiny) return `${name}${L('：', ': ')}${k.exact}${L('；', '; ')}${betaText(pl)}${L('。', '.')}`;
      return pl.beta >= 1 - 1e-9 ? L(`${name}：${k.long}。阴影已收回球面。`, `${name}: ${k.long}. The shadow is back on the sphere.`) : L(`${name}：${betaText(pl)}，品红阴影正从切平面收回球面；${k.long}。`, `${name}: ${betaText(pl)}, the magenta shadow is moving from the tangent plate to the sphere; ${k.long}.`);
    }
    if (s === 'quad') {
      const q = m.quad,
        orb = ORB_NAME[q.orb];
      if (state.lens) return L(`连续的哈尔平均（MODEL）∫ dR/(8π²) 用到 π，把四阶部分也抹平；十二个节点的有限平均已经把 Q 消成 0。`, `The continuous Haar average (MODEL) ∫ dR/(8π²) uses π and smooths the part of order four too; the finite average of the twelve nodes already makes Q zero.`);
      if (q.haar) return L(`十二个节点的旋转平均：${tText(q)}、空出 ${orb}，⟨Q⟩ = 0（精确），剩下的起伏是四阶部分。`, `Average over the rotations of the twelve nodes: ${tText(q)} from ${orb}, ⟨Q⟩ = 0 exactly; what still ripples is the part of order four.`);
      if (q.t <= 1e-9) return L(`Au<sup>+</sup> 5d<sup>10</sup>：五条轨道都占满，角向密度处处是 10，Q = 0。`, `Au<sup>+</sup> 5d<sup>10</sup>: all five orbitals full, the angular density is 10 everywhere and Q = 0.`);
      const head = q.orb === 'x2y2' && q.tQ && equal(q.tQ, whole(2)) ? L('Au<sup>3+</sup> 5d<sup>8</sup>：', 'Au<sup>3+</sup> 5d<sup>8</sup>: ') : '';
      const many = q.tQ ? fstr(q.tQ) : approx(q.t, 2);
      return tiny ? `${head}${tText(q)} · Q = ${qText(q)}` : L(`${head}从 ${orb} 移走 ${many} 个电子：Q = −t·Q(${ORB_PLAIN[q.orb]}) = ${qText(q)}，迹为 0。`, `${head}${many} electrons taken from ${orb}: Q = −t·Q(${ORB_PLAIN[q.orb]}) = ${qText(q)}, trace 0.`);
    }
    if (s === 'hecke') {
      const h = m.hecke,
        sh = h.shell;
      if (state.lens) return L(`平直读法（MODEL）：拉马努金界 |λ| ≤ 2√p ${approx(2 * Math.sqrt(HP))}，临界线 Re s = 1/2 要用复数、对数与 π；这里平方成 λ² ≤ 4p = 20。`, `Flat reading (MODEL): the Ramanujan bound |λ| ≤ 2√p ${approx(2 * Math.sqrt(HP))}, the critical line Re s = 1/2 needs complex numbers, logarithms and π; squared, it is λ² ≤ 4p = 20.`);
      if (h.f > 0) return L(`从 j = ${sh.j} 走向 j = ${h.next.j}。`, `From j = ${sh.j} to j = ${h.next.j}.`);
      if (sh.d === 0) return L(`j = 0 是常值壳：λ = p + 1 = 6，λ² = 36 = (p + 1)²，20 − λ² = −16 &lt; 0，所以要求 f ⊥ V₀。`, `j = 0 is the constant shell: λ = p + 1 = 6, λ² = 36 = (p + 1)², 20 − λ² = −16 &lt; 0, which is why f ⊥ V₀ is required.`);
      return tiny ? `j = ${sh.j}${L('：', ': ')}${levelText(sh)}` : L(`j = ${sh.j}：${levelText(sh)}，20 − λ² = ${marginText(sh)}，都 ≥ 0；顺序主子式 ${sh.minors.length} 个都为正。`, `j = ${sh.j}: ${levelText(sh)}, 20 − λ² = ${marginText(sh)}, all ≥ 0; the ${sh.minors.length} leading principal minors are positive.`);
    }
    if (s === 'atlas') {
      const a = m.atlas,
        r = a.row;
      if (state.lens) return L(`平直脚手架（MODEL）：${SCAFFOLDS.join('、')} 是渡河的桥 c，第 1 至 12 站各在，第 13 站按 [a, c, c] = a 折回；现在 ${r.scaffolds} 座。`, `Flat scaffolds (MODEL): ${SCAFFOLDS.slice(0, -1).join(', ')} and ${SCAFFOLDS[SCAFFOLDS.length - 1]} are bridges c, standing from milestone 1 to 12 and folding back at 13 by [a, c, c] = a; ${r.scaffolds} now.`);
      if (a.f > 0) return L(`从第 ${r.M} 站走向第 ${r.M + 1} 站。`, `From milestone ${r.M} to ${r.M + 1}.`);
      const what = r.node ? L(`加入节点 ${r.node}（${TOPIC[r.node - 1][0]}）`, `node ${r.node} (${TOPIC[r.node - 1][1]}) joins`) : r.audit === 'bridge' ? L('撤桥 [a, c, c] = a，五座脚手架折回', 'bridge erasure [a, c, c] = a, five scaffolds fold back') : r.audit === 'edges' ? L('审计已有的边，不加东西', 'an audit of the edges, nothing added') : L(`加入弦 ${r.added.map((e) => `${e.a}→${e.b}`).join('、')}`, `the chord ${r.added.map((e) => `${e.a}→${e.b}`).join(', ')} joins`);
      return tiny ? `M${r.M}${L('：', ': ')}${what}${L('；', '; ')}ΔI = ${fstr(r.dI)}, Δb₁ = ${int(r.db1)}` : L(`第 ${r.M} 站：${what}；点 ${r.V}、边 ${r.E}，ΔI<sub>Schur</sub> = ${fstr(r.dI)}，Δb₁ = ${int(r.db1)}，τ = ${fstr(r.tau)}。`, `Milestone ${r.M}: ${what}; ${r.V} points, ${r.E} edges, ΔI<sub>Schur</sub> = ${fstr(r.dI)}, Δb₁ = ${int(r.db1)}, τ = ${fstr(r.tau)}.`);
    }
    const fr = m.fractran,
      r = fr.row;
    if (state.lens) return L(`实对数（MODEL）：ln N = Σ v<sub>p</sub> ln p ${approx(Math.log(Number(r.N)))}，每一步加上 ln(分数)；整数账本只数方块。`, `Real logarithm (MODEL): ln N = Σ v<sub>p</sub> ln p ${approx(Math.log(Number(r.N)))}, each step adds ln(fraction); the integer ledger only counts cubes.`);
    if (fr.replay) return L(`回放：22 = 2 · 11，49、25、9、4 都不整除它，没有门开；ΔI = 0，Δb₁ = 0，Δτ = 0，b₁ 停在 ${RUN.replay.b1}，τ 停在 ${fstr(RUN.replay.tau)}。`, `Replay: 22 = 2 · 11, none of 49, 25, 9, 4 divides it and no gate opens; ΔI = 0, Δb₁ = 0, Δτ = 0; b₁ stays at ${RUN.replay.b1} and τ at ${fstr(RUN.replay.tau)}.`);
    if (fr.f > 0 && !fr.next) return L('回放扫描：四个门依次试过，没有一个能整除 22。', 'Replay scan: the four gates are tried in order, and none divides 22.');
    if (fr.f > 0) return L(`门 ${GATE_TEXT(fr.next.gate)}：两块方块合成一块，交给下一座塔。`, `Gate ${GATE_TEXT(fr.next.gate)}: two cubes merge into one and move to the next tower.`);
    const gate = r.gate >= 0 ? L(`，上一步过门 ${GATE_TEXT(r.gate)}`, `, after the gate ${GATE_TEXT(r.gate)}`) : '';
    return tiny ? `M${r.M} · N = ${r.N} = ${expText(r.exps)}` : L(`第 ${r.M} 站：N = ${r.N}，指数 (v₂, v₃, v₅, v₇, v₁₁) = ${expText(r.exps)}${gate}。`, `Milestone ${r.M}: N = ${r.N}, exponents (v₂, v₃, v₅, v₇, v₁₁) = ${expText(r.exps)}${gate}.`);
  }
  function legendItems() {
    const s = state.scene;
    const items = s === 'quad' ? [['vi', L('5d 壳层（紫 → 青：密度）', '5d shell (violet → cyan: density)')]] : [['vi', L('射影三元球 ℚP³', 'projective ternion sphere ℚP³')]];
    switch (s) {
      case 'pillars':
        items.push(['cy', L('精确：整数四元组与分数', 'exact: integer tuples, fractions')], ['mg', L('平直阴影（切平面）', 'flat shadow (tangent plate)')], ['am', L('当前点 β', 'current point β')]);
        break;
      case 'quad':
        items.push(['cy', L('Q 刻度', 'Q gauge')], ['mg', L('移走的电子', 'electrons taken')], ['am', L('当前 t', 'current t')]);
        break;
      case 'hecke':
        items.push(['cy', L('旋子 · λ² · 上界 4p', 'rotors · λ² · bound 4p')], ['mg', L('常值壳 (p + 1)²', 'constant shell (p + 1)²')], ['am', L('当前自旋壳', 'current shell')]);
        break;
      case 'atlas':
        items.push(['cy', L('节点与边', 'nodes and edges')], ['mg', L('平直脚手架', 'flat scaffolds')], ['am', L('当前这一站', 'current milestone')]);
        break;
      default:
        items.push(['cy', L('指数方块 · 门', 'exponent cubes · gates')], ['am', L('正在过门', 'gate firing')]);
        if (state.lens) items.push(['mg', 'ln N']);
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const s = state.scene,
      pair = (zh, en) => [zh, en];
    if (s === 'pillars') {
      const pl = m.pillars,
        p = pl.p,
        name = PILLAR_NAME[pl.k],
        k = pillarKeys(p, ZH),
        ke = pillarKeys(p, EN);
      if (pl.beta >= 1 - 1e-9)
        return {
          long: pair(`支柱 ${pl.k + 1}/6 ${name[0]}：青色是球面上的精确对象，${k.exact}；北极上方的品红虚线圈是切平面原来的位置，阴影已经蒸发。拖琥珀点把它拉回切平面。`, `Pillar ${pl.k + 1}/6, ${name[1]}: the cyan objects on the sphere are exact, ${ke.exact}; the magenta dashed circle above the pole marks where the tangent plate was, and the shadow has evaporated. Drag the amber point to pull it back to the plate.`),
          fig: pair(`${name[0]}：青色精确，${k.exact}；品红阴影已蒸发。`, `${name[1]}: cyan exact, ${ke.exact}; the magenta shadow is gone.`)
        };
      return {
        long: pair(`支柱 ${pl.k + 1}/6 ${name[0]}：品红阴影在北极的切平面上按弧度摆放，琥珀点带着它向球面收回；青色是球面上的精确对象，${k.exact}。`, `Pillar ${pl.k + 1}/6, ${name[1]}: the magenta shadow lies on the tangent plate at the pole, set out in radians, and the amber point carries it back to the sphere; the cyan objects on the sphere are exact, ${ke.exact}.`),
        fig: pair(`品红阴影从切平面收回球面；青色 ${k.exact}。`, `The magenta shadow moves back to the sphere; cyan ${ke.exact}.`)
      };
    }
    if (s === 'quad') {
      const q = m.quad,
        o = ORB_PLAIN[q.orb];
      if (q.haar)
        return {
          long: pair(`十二个节点的旋转平均：轴上的紫点是十二份旋转后的 Q 刻度，它们的平均（青点）回到中间的刻度圈，⟨Q⟩ = 0；壳层只剩四阶的小起伏。`, `Average over the rotations of the twelve nodes: the violet dots on the axes are the twelve rotated Q gauges, and their average (cyan) is back on the middle tick circles, ⟨Q⟩ = 0; the shell keeps only a small ripple of order four.`),
          fig: pair('十二份旋转平均后，青色 Q 刻度回到中间：⟨Q⟩ = 0。', 'After the twelve rotations the cyan Q gauge is back in the middle: ⟨Q⟩ = 0.')
        };
      if (q.t <= 1e-9)
        return {
          long: pair('满壳 5d¹⁰：壳层是一个圆球，三根轴上的青色 Q 刻度都停在中间的刻度圈上，Q = 0。拖琥珀点把电子从轨道里移走。', 'Full shell 5d¹⁰: the shell is a round ball and the cyan Q gauges sit on the middle tick circles of all three axes, Q = 0. Drag the amber point to take electrons out of the orbital.'),
          fig: pair('满壳 5d¹⁰ 是圆球，Q = 0。', 'The full shell 5d¹⁰ is round, Q = 0.')
        };
      return {
        long: pair(`从 ${o} 轨道移走电子：壳层在它的波瓣方向凹下去，品红的波瓣是被移走的部分；青色 Q 刻度沿长轴向外、沿短轴向里，${q.Q ? 'Q = ' + qText(q) : ''}。`, `Electrons taken from the orbital ${o}: the shell is dented along its lobes and the magenta lobes are what was taken; the cyan Q gauges move out along the long axis and in along the short ones${q.Q ? ', Q = ' + qText(q) : ''}.`),
        fig: pair(`空出 ${o}：凹陷与品红波瓣，青色刻度给出 Q。`, `${o} vacated: the dent, the magenta lobes, the cyan gauge shows Q.`)
      };
    }
    if (s === 'hecke') {
      const h = m.hecke,
        sh = h.shell;
      return {
        long: pair(`紫球北极是种子，六枚青色旋子都在 κ = 1/5 的纬圈上。右边的塔按以 5 为底的对数排列：p⁰、p¹、p² 三个刻度等距，青色圆盘是上界 4p = 20，品红虚圈是 (p + 1)² = 36。j = ${sh.j} 的圆盘${sh.d === 0 ? '在上界之上（品红）' : '都在上界之下'}。`, `The seed is at the north pole of the violet ball and the six cyan rotors lie on the circle κ = 1/5. The tower on the right is on a logarithm to base 5: the ticks p⁰, p¹, p² are evenly spaced, the cyan disc is the bound 4p = 20 and the magenta dashed circle (p + 1)² = 36. The discs of j = ${sh.j} lie ${sh.d === 0 ? 'above the bound (magenta)' : 'below the bound'}.`),
        fig: pair(`j = ${sh.j}：圆盘${sh.d === 0 ? '在上界 4p = 20 之上' : '都在上界 4p = 20 之下'}。`, `j = ${sh.j}: the discs lie ${sh.d === 0 ? 'above' : 'below'} the bound 4p = 20.`)
      };
    }
    if (s === 'atlas') {
      const r = m.atlas.row;
      return {
        long: pair(`球面上的节点与有向边按十六站长出来，琥珀是这一站加的；品红虚线是从种子伸出的五座平直脚手架，第 13 站折回。球下的弧是里程碑刻度，第 ${r.M} 站：点 ${r.V}、边 ${r.E}、b₁ = ${r.b1}。`, `Nodes and directed edges grow on the sphere over sixteen milestones, amber for what this one adds; the magenta dashed lines are the five flat scaffolds reaching out of the seed, which fold back at milestone 13. The arc under the ball is the milestone dial; milestone ${r.M}: ${r.V} points, ${r.E} edges, b₁ = ${r.b1}.`),
        fig: pair(`第 ${r.M} 站：${r.V} 个点、${r.E} 条边，b₁ = ${r.b1}，τ = ${fstr(r.tau)}。`, `Milestone ${r.M}: ${r.V} points, ${r.E} edges, b₁ = ${r.b1}, τ = ${fstr(r.tau)}.`)
      };
    }
    const fr = m.fractran,
      r = fr.row;
    return {
      long: pair(`球右边五座塔是素数 2、3、5、7、11，方块数就是 N 的指数；塔脚之间的四道弧是四个门，琥珀是正在过的门。${fr.replay ? '回放时没有门开，方块一块不动。' : `第 ${r.M} 站 N = ${r.N}。`}`, `The five towers right of the ball are the primes 2, 3, 5, 7, 11, and their cubes are the exponents of N; the four arcs between their feet are the four gates, amber when one fires. ${fr.replay ? 'On the replay no gate opens and no cube moves.' : `Milestone ${r.M}: N = ${r.N}.`}`),
      fig: pair(fr.replay ? 'N = 22 = 2 · 11：四个门都不开，Δτ = 0。' : `第 ${r.M} 站：N = ${r.N}。`, fr.replay ? 'N = 22 = 2 · 11: no gate opens, Δτ = 0.' : `Milestone ${r.M}: N = ${r.N}.`)
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      tiny = small(),
      flat = state.lens === 1;
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'pillars') {
      const pl = m.pillars,
        p = pl.p,
        b = pl.beta,
        shade = b < 0.85;
      N('seed', off(on(SEED), -30, 12), 'p0', 'c-cy');
      if (p.key === 'action') {
        const d = dir(p.points[2]);
        N('sag', off([d[0], d[1], 0.5 * (1 + d[2])], 44, 0), `2s = ${fstr(p.sag)}`, 'c-cy');
        if (!tiny) N('x1', off(on(p.points[2]), 34, -14), 'x(t + 1)', 'c-cy');
        if (!tiny) N('x-1', off(on(p.points[0]), -34, -14), 'x(t − 1)', 'c-cy');
        if (shade) N('tay', off(add(morph(p.points[2], b), [0, 0, -p.taylor]), 44, -8), `φ²/2 ${approx(p.taylor)}`, 'c-mg');
      }
      if (p.key === 'fixed') {
        N('half', off(on(p.points[0]), 30, 12), `κ* = ${fstr(p.kStar)}`, 'c-cy');
        if (shade) N('dot', off(morphPolar(dottie, [cs(VIEW_AZ + PI / 2), sn(VIEW_AZ + PI / 2)], b), 40, 14), `θ* ${approx(p.theta)}`, 'c-mg');
      }
      if (p.key === 'jet') {
        p.points.forEach((q, i) => N('k' + i, off(on(q), i === 0 ? 30 : 34, i === 0 ? -10 : 12), `κ = ${fstr(p.kappas[i])}`, 'c-cy'));
        if (!tiny) N('jet', off(on(p.lead), 30, -26), `(${p.jet.map(fstr).join(', ')})`, 'c-cy');
        if (shade && !tiny) N('lim', off(morph(jetPoint(1.5), b), 26, 14), 'lim h → 0', 'c-mg');
      }
      if (p.key === 'spacetime') {
        const ah = polarOf(p.lead).a,
          rho = polarOf(p.lead).rho;
        N('time', off(polarBall(rho / 2, ah), 40, 8), `κ<sub>time</sub> = ${fstr(p.kTime)}`, 'c-cy');
        N('space', off(polarBall((rho + PI / 2) / 2, ah), 44, 0), `κ<sub>space</sub> = ${fstr(p.kSpace)}`, 'c-cy');
        if (!tiny) N('p43', off(on(p.lead), 36, -14), '(4, 3, 0, 0)', 'c-ik');
        if (shade) N('phi', off(morph(p.lead, b), -10, 22), `φ ${approx(p.phi)}`, 'c-mg');
      }
      if (p.key === 'hecke') {
        N('k5', off(on(ROTORS[2]), 26, 14), `κ = ${fstr(p.kappas[0])}`, 'c-cy');
        if (!tiny) N('n6', off(on(SEED), 34, 22), `p + 1 = ${p.count}`, 'c-cy');
        if (shade) N('ring', off(morphPolar(p.ring, [cs(VIEW_AZ + PI / 2), sn(VIEW_AZ + PI / 2)], b), 40, 10), `arccos(1/√5) ${approx(p.ring)}`, 'c-mg');
      }
      if (p.key === 'cheb') {
        N('c0', off(on(SEED), 30, 24), `χ₂ = ${fstr(p.chi2[0])}`, 'c-cy');
        N('c1', off(on(NODES[1]), 28, 12), `χ₂ = ${fstr(p.chi2[1])}`, 'c-cy');
        if (!tiny) N('c9', off(on(NODES[10]), 28, -12), `χ₂ = ${fstr(p.chi2[10])}`, 'c-cy');
        if (shade) N('pi5', off(morphPolar(PI / 5, [cs(VIEW_AZ + PI / 2), sn(VIEW_AZ + PI / 2)], b), 34, 10), 'π/5', 'c-mg');
      }
      if (flat) N('plate', off([0, 0, PLATE], 0, 34), L('切平面 · 弧度尺', 'tangent plate · radian ruler'), 'c-mg');
    }
    if (s === 'quad') {
      const q = m.quad;
      ['x', 'y', 'z'].forEach((name, k) => {
        const e = [0, 0, 0];
        e[k] = 1.56;
        N('ax' + name, e, name, 'c-vi');
      });
      const zv = q.haar ? 0 : q.Qf[2][2];
      N('qzz', off([0, 0, GAUGE(zv)], 52, 0), q.haar ? '⟨Q⟩ = 0' : q.Q ? `Q<sub>zz</sub> = ${fstr(q.Q[2][2])}` : `Q<sub>zz</sub> ${approx(q.Qf[2][2], 3)}`, 'c-cy');
      if (!tiny && !q.haar) N('qxx', off([GAUGE(q.Qf[0][0]), 0, 0], 0, -18), q.Q ? `Q<sub>xx</sub> = ${fstr(q.Q[0][0])}` : `Q<sub>xx</sub> ${approx(q.Qf[0][0], 3)}`, 'c-cy');
      if (!q.haar && q.t > 0.01) N('lobe', off(scale(frontLobe(q.orb), 1.18), 30, 16), `5${ORB_NAME[q.orb]}`, 'c-mg');
    }
    if (s === 'hecke') {
      const h = m.hecke,
        right = 36;
      N('h-seed', off(on(SEED), -30, 12), 'p0', 'c-cy');
      if (!tiny) N('h-k5', off(on(ROTORS[2]), 26, 14), 'κ = 1/5', 'c-cy');
      [[1, 'p⁰ = 1'], [5, 'p¹ = 5'], [25, 'p² = 25']].forEach(([v, t], i) => N('t' + i, off(towerPoint(v), -right - 10, 0), t, 'c-vi'));
      N('ceil', off(towerPoint(4 * HP), right + 34, 0), state.lens ? `|λ| ≤ 2√5` : '4p = 20', 'c-cy');
      N('pole', off(towerPoint((HP + 1) ** 2), right + 28, 6), '(p + 1)² = 36', 'c-mg');
      if (h.f === 0) {
        const top = h.shell.levels.reduce((best, l) => (cmp(l.lam2, best.lam2) > 0 ? l : best));
        N('lev', off(towerPoint(fval(top.lam2)), right + 30, -14), `j = ${h.shell.j} · λ² = ${fstr(top.lam2)}`, 'c-am');
      }
    }
    if (s === 'atlas' || s === 'fractran') {
      const M = milestoneOf(m),
        row = RUN.rows[M - 1];
      RUN.rows.slice(0, M).forEach((r) => {
        if (!r.node || (tiny && ![1, 12].includes(r.node))) return;
        const d = dir(NODES[r.node - 1]);
        N('nn' + r.node, off(on(NODES[r.node - 1]), 14 * Math.sign(dot(d, cam.R) || 1), 12), String(r.node), r.M === M && s === 'atlas' ? 'c-am' : 'c-cy');
      });
      if (s === 'atlas' && M <= 12 && !tiny) SCAFFOLD_AT.forEach((p, i) => N('sc' + i, off(p, 0, 14), SCAFFOLDS[i], 'c-mg'));
      const max = s === 'atlas' ? MCOUNT - 1 : MCOUNT;
      N('d1', off(dialPoint(0, max), -18, -14), 'M1', 'c-vi');
      if (!tiny) N('d13', off(dialPoint(12, max), 0, -16), 'M13', 'c-vi');
      N('dend', off(dialPoint(max, max), 22, -14), s === 'atlas' ? 'M16' : '↺', 'c-vi');
      if (s === 'atlas' && !tiny) N('b1', off(on(SEED), 0, 30), `b₁ = ${row.b1}`, 'c-cy');
    }
    if (s === 'fractran') {
      const fr = m.fractran,
        r = fr.row;
      PRIMES.forEach((p, i) => N('pr' + i, off(PRIME_AT[i], 0, -16), `${p}${superscript(r.exps[i])}`, 'c-cy'));
      if (!tiny)
        PROGRAM_TEXT.forEach((t, gi) => {
          const i = 3 - gi,
            j = 4 - gi,
            mid = mix(PRIME_AT[i], PRIME_AT[j], 0.5),
            firing = fr.next && fr.next.gate === gi && !fr.replay;
          N('g' + gi, off(add(mid, scale(ROW_D, 0.2)), 0, -22), fr.replay ? `${PROGRAM[gi][1]} <span class="nm">∤</span> 22` : t, firing ? 'c-am' : 'c-cy');
        });
      const tall = r.exps.indexOf(Math.max(...r.exps));
      N('nval', off(cubeAt(tall, r.exps[tall]), 0, 18), `N = ${r.N}`, 'c-ik');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈≥]) −?\d[\d./]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>').replace(/‖|ℚ|∤/g, '<span class="nm">$&</span>');
  const ACTS = {
    pillars: ['下一条支柱 ▸', 'Next pillar ▸'],
    quad: ['换轨道 ▸', 'Next orbital ▸'],
    hecke: ['下一自旋壳 ▸', 'Next shell ▸'],
    atlas: ['下一站 ▸', 'Next milestone ▸'],
    fractran: ['回放 ↺', 'Replay ↺']
  };
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = kept(subline(m));
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
      if (best) place(i, best.dx, best.dy, best.at);
      else list[i].hidden = true;
    }
  }

  /* ---------- the frame: fit what the card draws between the title and the legend ---------- */
  const BALL = [-1.03, 1.03, -1.03, 1.03];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const grow = ([x0, x1, y0, y1], d) => [x0 - d, x1 + d, y0 - d, y1 + d];
  const rim = (c, r, n = 16) => range(n).map((k) => add(c, [r * cs((TAU * k) / n), r * sn((TAU * k) / n), 0]));
  const SIDE = {
    pillars: () => grow(around(rim([0, 0, PLATE], plateRadius(PILLARS[state.pillar]))), 0.06),
    quad: () => grow(around(range(3).flatMap((k) => [1, -1].map((s) => scale(range(3).map((i) => (i === k ? 1 : 0)), 1.5 * s)))), 0.03),
    hecke: () => grow(around([...rim([TOWER_AT[0], TOWER_AT[1], TOWER_Z[0]], 0.34, 8), ...rim([TOWER_AT[0], TOWER_AT[1], TOWER_Z[1]], 0.34, 8)]), 0.08),
    atlas: () => grow(around([...SCAFFOLD_AT, ...range(9).map((k) => dialPoint(k, 8))]), 0.08),
    fractran: () => grow(around([...PRIME_AT.flatMap((p) => [p, add(p, [0, 0, STEP * 17])]), ...range(9).map((k) => dialPoint(k, 8))]), 0.1)
  };
  /* the room of the title: while a card, a lens and a size last, a line that gets shorter gives none of it back, so that
     the picture keeps its place under a drag */
  const title = { key: '', top: 0 };
  let dragging = null;
  function fit(w) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H || dragging != null) return;
    const box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const key = [state.scene, state.lens, state.pillar, document.documentElement.dataset.lang, W, H, TRV.still].join();
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

  /* ---------- the stage ---------- */
  /** The world point of the amber mark for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'pillars':
        return leadAt(PILLARS[state.pillar], v / 20);
      case 'quad': {
        const n = frontLobe(state.orb);
        return scale(n, SH0 + (SH1 * shellDensity(state.orb, v / 4, state.haar, n)) / 10 + 0.02);
      }
      case 'hecke': {
        const k = Math.min(Math.floor(v + 1e-9), 4),
          f = v - k,
          a = shellTop(SHELLS[k]),
          b = shellTop(SHELLS[Math.min(k + 1, 4)]);
        return towerPoint(Math.exp(lerp(Math.log(a), Math.log(b), f)));
      }
      case 'atlas':
        return dialPoint(v, MCOUNT - 1);
      default:
        return dialPoint(v, MCOUNT);
    }
  }
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(w);
    sc.begin();
    drawBall(1 - w.quad);
    drawPillars(m, w.pillars);
    drawQuad(m, w.quad);
    drawHecke(m, w.hecke);
    drawAtlas(m, w.atlas + w.fractran, w.fractran > 0.5 ? 0.55 : 1);
    drawDial(w.atlas, m.atlas.v, MCOUNT - 1);
    drawDial(w.fractran, m.fractran.v, MCOUNT);
    drawFractran(m, w.fractran);
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
  const PAD = [46, 14, 10, 22];
  function bar(g, x, y, lo, color, width, dx = 0, alpha = 1) {
    const ctx = g.ctx,
      px = g.X(x) + dx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(px - width / 2, g.Y(Math.max(y, lo)), width, g.Y(lo) - g.Y(Math.max(y, lo)));
    ctx.restore();
  }
  /** One strip plot: a title, items of its legend, the ranges and the drawing. */
  function strip(cv, items, x, lo, hi, axes, draw) {
    const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
    const g = kit.plot(cv, { x, y: [lo, headroom(cv, PAD, rows.length, lo, hi)], pad: PAD });
    g.axes(axes);
    draw(g);
    drawLegend(g, rows);
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot'),
      narrow = cv.clientWidth < 260,
      s = state.scene;
    if (cv.clientWidth && cv.clientHeight) {
      if (s === 'pillars') {
        const pl = m.pillars,
          p = pl.p;
        $('plotTitle').textContent = L('平直弧度尺 φ 与有理 κ = cos²φ', 'Flat radian ruler φ against the rational κ = cos²φ');
        $('plotMeta').textContent = `${pl.k + 1}/6`;
        const marks = { action: [p.phi], fixed: [dottie], jet: [PI / 4, PI / 2], spacetime: [p.phi], hecke: [p.ring], cheb: [PI / 5, (2 * PI) / 5] }[p.key];
        strip(cv, [[P.violet, 'κ = cos²φ'], [P.cyan, L('精确点', 'exact points'), 'dot'], [P.magenta, L('阴影的弧度', 'radians of the shadow'), 'dash']], [0, PI / 2], 0, 1, { xTicks: [[0, '0'], [PI / 4, 'π/4'], [PI / 2, 'π/2']], yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] }, (g) => {
          g.line(sample(60, (u) => [(u * PI) / 2, cs((u * PI) / 2) ** 2]), P.violet, { width: 1.6 });
          for (const x of marks) g.line([[x, 0], [x, 1]], P.magenta, { width: 1.4, dash: [4, 4] });
          for (const q of p.points) {
            const { rho } = polarOf(q);
            if (rho <= PI / 2 + 1e-9) g.dot(rho, fval(kappa(SEED, q)), P.cyan, 3.4);
          }
          const lead = polarOf(p.lead).rho;
          g.dot(lead, fval(kappa(SEED, p.lead)), P.amber, 4.4);
        });
      } else if (s === 'quad') {
        const q = m.quad,
          own = q.own.map((row, i) => fval(row[i]));
        $('plotTitle').textContent = L(`移走 t 个电子：Q = −t·Q(${ORB_PLAIN[q.orb]})`, `t electrons taken: Q = −t·Q(${ORB_PLAIN[q.orb]})`);
        $('plotMeta').textContent = q.haar ? '⟨Q⟩ = 0' : tText(q);
        strip(cv, [[P.cyan, 'Qxx'], [P.violet, 'Qyy'], [P.ink, 'Qzz', 'dash']], [0, 2], -1.25, 1.25, { xTicks: [[0, '0'], [1, '1'], [2, '2']], yTicks: [[-8 / 7, '−8/7'], [0, '0'], [8 / 7, '8/7']] }, (g) => {
          [[P.cyan, null], [P.violet, null], [P.ink, [5, 4]]].forEach(([c, dash], i) => g.line([[0, 0], [2, -2 * own[i]]], c, { width: 1.8, dash }));
          if (q.haar) g.line([[0, 0], [2, 0]], P.cyan, { width: 2.4 });
          g.line([[q.t, -1.25], [q.t, 1.25]], P.amber, { width: 1 });
        });
      } else if (s === 'hecke') {
        $('plotTitle').textContent = L('各自旋壳的 λ² 与上界 4p = 20', 'λ² of each spin shell against the bound 4p = 20');
        $('plotMeta').textContent = `j = ${m.hecke.shell.j}`;
        strip(cv, [[P.cyan, 'λ²'], [P.cyan, '4p = 20', 'dash'], [P.magenta, '(p + 1)² = 36', 'dash']], [-0.5, 4.5], 0, 38, { xTicks: SPINS.map((j, k) => [k, narrow ? j : `j = ${j}`]), yTicks: [[0, '0'], [20, '20'], [36, '36']] }, (g) => {
          g.line([[-0.5, 20], [4.5, 20]], P.cyan, { width: 1.4, dash: [4, 4] });
          g.line([[-0.5, 36], [4.5, 36]], P.magenta, { width: 1.2, dash: [4, 4] });
          SHELLS.forEach((sh, k) => {
            const n = sh.levels.length,
              bw = Math.min(14, g.iw / 16);
            sh.levels.forEach((l, i) => bar(g, k, fval(l.lam2), 0, fval(l.lam2) > 20 ? P.magenta : P.cyan, bw, (i - (n - 1) / 2) * (bw + 3), k === m.hecke.k ? 1 : 0.5));
          });
          g.line([[m.hecke.k - 0.42, 0], [m.hecke.k + 0.42, 0]], P.amber, { width: 3 });
        });
      } else if (s === 'atlas') {
        const M = m.atlas.k + 1;
        $('plotTitle').textContent = L('点、边与环秩 b₁ = E − V + 1', 'Points, edges and the loop rank b₁ = E − V + 1');
        $('plotMeta').textContent = `M${M}`;
        strip(cv, [[P.cyan, L('点', 'points')], [P.violet, L('边', 'edges')], [P.ink, 'b₁', 'dash']], [0.5, MCOUNT + 0.5], 0, 23, { xTicks: [[1, 'M1'], [8, 'M8'], [13, 'M13'], [16, 'M16']], yTicks: [[0, '0'], [12, '12'], [22, '22']] }, (g) => {
          g.line(RUN.rows.map((r) => [r.M, r.V]), P.cyan, { width: 1.8 });
          g.line(RUN.rows.map((r) => [r.M, r.E]), P.violet, { width: 1.8 });
          g.line(RUN.rows.map((r) => [r.M, r.b1]), P.ink, { width: 1.6, dash: [5, 4] });
          g.line([[M, 0], [M, 23]], P.amber, { width: 1 });
        });
      } else {
        const k = m.fractran.k;
        $('plotTitle').textContent = L('方块总数：每过一门少 1', 'Cubes: one fewer at every gate');
        $('plotMeta').textContent = m.fractran.replay ? '↺' : `M${k + 1}`;
        const cubes = [...RUN.rows.map((r) => r.exps.reduce((s, e) => s + e, 0)), RUN.replay.exps.reduce((s, e) => s + e, 0)];
        strip(cv, [[P.cyan, L('方块数 Σ vₚ', 'cubes Σ vₚ')]], [0.5, MCOUNT + 1.5], 0, 18, { xTicks: [[1, 'M1'], [8, 'M8'], [16, 'M16'], [17, '↺']], yTicks: [[0, '0'], [17, '17']] }, (g) => {
          const bw = Math.min(12, g.iw / 26);
          cubes.forEach((c, i) => bar(g, i + 1, c, 0, P.cyan, bw, 0, i === k ? 1 : 0.55));
          g.line([[k + 0.6, 0], [k + 1.4, 0]], P.amber, { width: 3 });
        });
      }
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const M = ['atlas', 'fractran'].includes(s) ? milestoneOf(m) : null;
      $('plotTitleB').textContent = L('结构时间 τ = Σ(ΔI + Δb₁) 与脚手架', 'Structural time τ = Σ(ΔI + Δb₁) and the scaffolds');
      $('plotMetaB').textContent = `τ = ${fstr(FINAL.tau)}`;
      strip(cb, [[P.cyan, 'τ'], [P.violet, 'b₁', 'dash'], [P.magenta, L('脚手架', 'scaffolds')]], [0.5, MCOUNT + 0.5], 0, 13.5, { xTicks: [[1, 'M1'], [13, 'M13'], [16, 'M16']], yTicks: [[0, '0'], [5, '5'], [11, '11']] }, (g) => {
        const steps = (key) => RUN.rows.flatMap((r, i) => (i ? [[r.M - 0.5, key(RUN.rows[i - 1])], [r.M - 0.5, key(r)]] : [[0.5, key(r)]])).concat([[MCOUNT + 0.5, key(FINAL)]]);
        g.line(steps((r) => fval(r.tau)), P.cyan, { width: 2 });
        g.line(steps((r) => r.b1), P.violet, { width: 1.6, dash: [5, 4] });
        g.line(steps((r) => r.scaffolds), P.magenta, { width: 1.6 });
        if (M) g.line([[M, 0], [M, 13.5]], P.amber, { width: 1 });
      });
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    const s = state.scene;
    if (s === 'pillars') return pillarFlat(m.pillars.p);
    if (s === 'quad') return L(`五条轨道的 Q 之和为 0；十二个节点的旋转平均对每条轨道都给出 0。${ORB_NAME[m.quad.orb]} 自己的 Q = ${diag(range(3).map((i) => m.quad.own[i][i]))}。`, `The five Q add to 0; the average over the twelve rotations is 0 for every orbital. ${ORB_NAME[m.quad.orb]} alone has Q = ${diag(range(3).map((i) => m.quad.own[i][i]))}.`);
    if (s === 'hecke') {
      const sh = m.hecke.shell;
      return L(`j = ${sh.j} 的顺序主子式：${sh.minors.map(fstr).join('、')}；A<sup>T</sup>G = GA ${sh.selfAdjoint ? '成立' : '不成立'}。`, `Leading principal minors of j = ${sh.j}: ${sh.minors.map(fstr).join(', ')}; A<sup>T</sup>G = GA ${sh.selfAdjoint ? 'holds' : 'fails'}.`);
    }
    if (s === 'atlas') {
      const c = chordCheck();
      return L(`第 16 站的弦 3→12 与原有路径 ${c.path.join('→')} 的传输之积 ${c.ok ? '相同' : '不同'}：${tuple(c.chord)}。图是有向无圈的：每条边都从小号指向大号。`, `The chord 3→12 of milestone 16 ${c.ok ? 'equals' : 'differs from'} the product of the transports along the older path ${c.path.join('→')}: ${tuple(c.chord)}. The graph is a directed acyclic one: every edge points from a smaller to a larger number.`);
    }
    return L(`程序 [${PROGRAM_TEXT.join(', ')}] 的每个门拿走两块、放回一块，所以方块总数每步少 1，有限步内必停。`, `Each gate of the program [${PROGRAM_TEXT.join(', ')}] takes two cubes and puts back one, so the number of cubes drops by 1 at every step and the run stops after finitely many.`);
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      pl = m.pillars,
      q = m.quad,
      h = m.hecke,
      at = m.atlas.row,
      fr = m.fractran,
      rows = fr.row,
      k = pillarKeys(pl.p);
    const key = {
      pillars: `${k.exact} ↔ ${k.flat}`,
      quad: q.haar ? `⟨Q⟩ = 0 ↔ ∫ dR/(8π²)` : `Q = ${qText(q)}`,
      hecke: `20 − λ² = ${marginText(h.shell)}`,
      atlas: `τ = ${fstr(at.tau)} · b₁ = ${at.b1}`,
      fractran: fr.replay ? 'Δτ = 0 · ΔI = 0 · Δb₁ = 0' : `N = ${rows.N}`
    }[state.scene];
    put('roKey', key);
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roPillar', `${pl.k + 1}/6 · ${k.exact} · ${k.flat} · ${betaText(pl)}`);
    put('roQuad', q.haar ? `0 · 0 · 0 · 0` : `${range(3).map((i) => (q.Q ? fstr(q.Q[i][i]) : approx(q.Qf[i][i], 3))).join(' · ')} · 0`);
    put('roHecke', `j = ${h.shell.j} · ${h.shell.levels.map((l) => fstr(l.lam2)).join(', ')} · ${marginText(h.shell)}`);
    put('roAtlas', `M${at.M} · ${at.V} · ${at.E} · ${at.b1} · ${fstr(at.tau)}`);
    put('roFrac', `${rows.N} · ${expText(rows.exps)} · ${fr.replay ? '∅' : GATE_TEXT(fr.rowAt.gate)}`);
    const st = fr.replay ? RUN.replay : state.scene === 'fractran' ? fr.rowAt : at;
    put('roStep', `${state.scene === 'fractran' && fr.replay ? 0 : st.scaffolds} · ${fstr(st.dI)} · ${int(st.db1)} · ${fstr(st.dTau)}`);
    put('roNote', readNote(m));
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    put('keyPill', `τ <strong>${fstr(['atlas', 'fractran'].includes(state.scene) ? (fr.replay && state.scene === 'fractran' ? RUN.replay.tau : RUN.rows[milestoneOf(m) - 1].tau) : FINAL.tau)}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = { pillars: 'v = 1 − cos Δθ = 2(1 − κ) = 2s', quad: 'Q<sub>ab</sub> = ⟨3n<sub>a</sub>n<sub>b</sub> − δ<sub>ab</sub>⟩', hecke: '4p⟨f, f⟩ − ⟨T<sub>p</sub>f, T<sub>p</sub>f⟩ ≥ 0', atlas: 'τ = Σ (ΔI<sub>Schur</sub> + Δb₁) · [a, c, c] = a', fractran: `[${PROGRAM_TEXT.join(', ')}]` }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    pillarChips.set(String(state.pillar), true);
    $('betaRange').value = String(Math.round(state.at.pillars));
    put('betaOut', pl.betaQ ? `= ${fstr(pl.betaQ)}` : approx(pl.beta, 2));
    ionChips.set(state.orb === 'x2y2' && q.tQ ? (isZero(q.tQ) ? 'd10' : equal(q.tQ, whole(2)) ? 'd8' : null) : null, true);
    orbChips.set(state.orb, true);
    $('tRange').value = String(Math.round(state.at.quad));
    put('tOut', q.tQ ? `= ${fstr(q.tQ)}` : approx(q.t, 2));
    $('haarBtn').setAttribute('aria-pressed', String(state.haar));
    spinChips.set(h.f > 0 ? null : String(h.k), true);
    const Mshown = ['atlas', 'fractran'].includes(state.scene) ? milestoneOf(m) : m.atlas.k + 1;
    $('mRange').value = String(Mshown);
    put('mOut', `= M${Mshown}`);
    $('replayBtn').setAttribute('aria-pressed', String(state.scene === 'fractran' && fr.replay));
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
  function settled(v) {
    const back = Math.round(v);
    return abs(v - back) < 1e-10 ? back : v;
  }
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.pillars.rate,
    step: 1,
    max: RAILS.pillars.max,
    t: STILL.pillars,
    format: (t) => {
      const v = settled(t),
        { k, f } = split(v);
      switch (state.scene) {
        case 'pillars':
          return Number.isInteger(v) ? `β = ${fstr(frac(BigInt(v), 20n))}` : `β ${approx(v / 20, 2)}`;
        case 'quad':
          return Number.isInteger(v) ? `t = ${fstr(frac(BigInt(v), 4n))}` : `t ${approx(v / 4, 2)}`;
        case 'hecke':
          return f > 0 ? `j ${SPINS[k]} → ${SPINS[Math.min(k + 1, 4)]}` : `j = ${SPINS[Math.min(k, 4)]}`;
        case 'atlas':
          return f > 0 ? `M${k + 1} → M${k + 2}` : `M${k + 1}`;
        default:
          return v >= MCOUNT ? 'M16 ↺' : f > 0 ? `M${k + 1} → M${k + 2}` : `M${k + 1}`;
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
  /** Give the rail to the scene: its length and speed, and the value it drives. */
  function setRail() {
    const r = rail();
    clock.rate = r.rate;
    clock.step = 1;
    $('now').step = '1';
    const at = Math.min(state.at[state.scene], r.max);
    clock.setMax(r.max, true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
  $('now').addEventListener('input', () => {
    const v = Math.round(clock.t);
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
  function aim(ms) {
    sc.view(camFor(state.scene, state.cam), TRV.still || booting ? 0 : ms);
  }
  function show(scene) {
    if (state.scene === scene) return;
    setScene(scene, 0);
    state.cam = 'panorama';
    camChips.set(state.cam, true);
    aim(0);
  }
  /** A control of a card shows the card and changes it. */
  function steer(scene, change) {
    leave();
    show(scene);
    change();
    paint();
  }
  const pillarChips = kit.chips($('pillarChips'), 'pillar', (v) =>
    steer('pillars', () => {
      state.pillar = Number(v);
      title.key = '';
      aim(600);
    })
  );
  kit.field($('betaRange'), { out: $('betaOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), 20n))}`, onInput: (v) => steer('pillars', () => clock.set(Math.round(v))) });
  const ionChips = kit.chips($('ionChips'), 'ion', (v) =>
    steer('quad', () => {
      state.orb = 'x2y2';
      state.haar = false;
      clock.set(v === 'd10' ? 0 : 8);
    })
  );
  const orbChips = kit.chips($('orbChips'), 'orb', (v) => steer('quad', () => (state.orb = v)));
  kit.field($('tRange'), { out: $('tOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), 4n))}`, onInput: (v) => steer('quad', () => clock.set(Math.round(v))) });
  const toggleHaar = () => steer('quad', () => (state.haar = !state.haar));
  $('haarBtn').addEventListener('click', toggleHaar);
  const spinChips = kit.chips($('spinChips'), 'spin', (v) => steer('hecke', () => clock.set(Number(v))));
  const milestoneScene = () => (state.scene === 'fractran' ? 'fractran' : 'atlas');
  kit.field($('mRange'), { out: $('mOut'), fmt: (v) => `= M${v}`, onInput: (v) => steer(milestoneScene(), () => clock.set(Math.round(v) - 1)) });
  /** One step forward on the rail of the card, from the start again once the rail has ended. The card stays marked. */
  function nextStep() {
    stopBootPlay();
    clock.pause();
    const k = Math.round(state.at[state.scene]),
      end = rail().max;
    if (k >= end) clock.set(0);
    stopAt = (k >= end ? 0 : k) + 1;
    clock.play();
  }
  function replay() {
    steer('fractran', () => {
      clock.set(MCOUNT - 1);
      stopAt = MCOUNT;
      clock.play();
    });
  }
  $('replayBtn').addEventListener('click', replay);
  const nextPillar = () =>
    steer('pillars', () => {
      state.pillar = (state.pillar + 1) % PILLARS.length;
      title.key = '';
      aim(600);
    });
  const nextOrbital = () => steer('quad', () => (state.orb = ORBS[(ORBS.indexOf(state.orb) + 1) % ORBS.length]));
  $('stageAct').addEventListener('click', () => ({ pillars: nextPillar, quad: nextOrbital, hecke: nextStep, atlas: nextStep, fractran: replay })[state.scene]());
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = CAMI[v] == null ? 'panorama' : v;
    aim(600);
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
    Object.assign(state, FRESH, { at: { ...STILL } });
    // a still, a reader who asked for reduced motion and a freshly opened page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting;
    if (!parked) state.at[p.scene] = 0;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    aim(600);
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
      key = (cards.current || 'idle') + '|' + regimeOf(m) + '|' + pair.join('|');
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

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  function benchmarks() {
    // the heap geodesic through the seed and B1: x(n + 2) = [x(n + 1), x(n), x(n + 1)] against the powers of B1, equal steps,
    // and ⟨x(0), x(n)⟩ = T_n(3/5) for the unit quaternions x(n)/15ⁿ
    const heap = [SEED, B1];
    for (let n = 2; n <= 8; n++) heap.push(triad(heap[n - 1], heap[n - 2], heap[n - 1]));
    let pow = SEED,
      heapBad = 0,
      stepBad = 0,
      chebBad = 0;
    const c = frac(3n, 5n),
      T = [ONE, c];
    for (let n = 2; n <= 8; n++) T.push(minus(times(times(whole(2), c), T[n - 1]), T[n - 2]));
    let raw = SEED;
    for (let n = 0; n <= 8; n++) {
      if (!same(heap[n], canon(pow))) heapBad++;
      if (n < 8 && !equal(kappa(heap[n], heap[n + 1]), kappa(SEED, B1))) stepBad++;
      if (!equal(frac(BigInt(raw[0]), 15n ** BigInt(n)), T[n])) chebBad++;
      pow = qmul(pow, B1);
      raw = qmul(raw, B1);
    }
    // the 5d shell: the five Q add to 0; each averages to 0 over the twelve rotations; the twelve rotations are a group;
    // the full shell has constant density (Unsöld) at sample points
    const sumQ = ORBS.reduce((S, k) => S.map((row, i) => row.map((v, j) => plus(v, ORB[k].Q[i][j]))), range(3).map(() => range(3).map(() => ZERO)));
    const sumBad = sumQ.flat().filter((v) => !isZero(v)).length;
    let haarBad = 0;
    for (const k of ORBS) {
      let acc = range(3).map(() => range(3).map(() => ZERO));
      for (const R of ROTS) {
        const M = mat3(mat3(R, ORB[k].Q), tr3(R));
        acc = acc.map((row, i) => row.map((v, j) => plus(v, M[i][j])));
      }
      haarBad += acc.flat().filter((v) => !isZero(v)).length;
    }
    let groupBad = 0;
    const key = (R) => JSON.stringify(R, bigText);
    const keys = new Set(ROTS.map(key));
    for (const A of ROTS) for (const B of ROTS) if (!keys.has(key(mat3(A, B)))) groupBad++;
    const grid = range(24).flatMap((i) => range(48).map((j) => sphereAt((PI * (i + 0.5)) / 24, (TAU * j) / 48)));
    const unsold = grid.reduce((worst, n) => Math.max(worst, abs(ORBS.reduce((s, k) => s + density(k, n), 0) - 5)), 0);
    const avg = grid.map((n) => shellDensity('x2y2', 2, true, n)),
      ripple = [Math.min(...avg), Math.max(...avg)];
    // the Hecke shells: integer matrices, self-adjoint for G, all eigenvalues integral; the rotors are all norm-5 quaternions
    // with a positive odd first entry and even other entries
    let rotorCount = 0;
    for (let w = 1; w <= 3; w += 2) for (let x = -2; x <= 2; x += 2) for (let y = -2; y <= 2; y += 2) for (let z = -2; z <= 2; z += 2) if (w * w + x * x + y * y + z * z === HP) rotorCount++;
    const heckeBad = SHELLS.filter((sh) => !(sh.real && sh.selfAdjoint && sh.full)).length,
      minorBad = SHELLS.filter((sh) => sh.d > 0 && sh.minors.some((v) => cmp(v, ZERO) <= 0)).length;
    // the atlas: witnesses, the chord, a directed acyclic graph, the final ledger
    const edges = RUN.edges,
      witnessBad = edges.filter((e) => !e.back || e.gNode < 1).length,
      dag = edges.every((e) => e.a < e.b),
      chord = chordCheck(),
      dISum = RUN.rows.reduce((s, r) => plus(s, r.dI), ZERO);
    // the register: N is the product of its prime powers, each step multiplies by its gate, the cubes drop by one
    let ledgerBad = 0,
      gateBad = 0,
      dropBad = 0;
    RUN.rows.forEach((r, i) => {
      if (PRIMES.reduce((N, p, k) => N * BigInt(p) ** BigInt(r.exps[k]), 1n) !== r.N) ledgerBad++;
      if (i) {
        const prev = RUN.rows[i - 1];
        if (r.N * PROGRAM[r.gate][1] !== prev.N * PROGRAM[r.gate][0]) gateBad++;
        if (r.exps.reduce((s, e) => s + e, 0) !== prev.exps.reduce((s, e) => s + e, 0) - 1) dropBad++;
      }
    });
    const cheb = PILLARS[5];
    return {
      heapBad,
      stepBad,
      chebBad,
      sumBad,
      haarBad,
      groupBad,
      products: ROTS.length ** 2,
      unsold,
      ripple,
      rotorCount,
      heckeBad,
      minorBad,
      witnessBad,
      dag,
      chord,
      dISum,
      ledgerBad,
      gateBad,
      dropBad,
      steps: RUN.rows.length - 1,
      halts: RUN.replay.gate < 0,
      sum0: cheb.points.length,
      sum1: cheb.sum1,
      sum2: cheb.sum2,
      dottie: [dottie, cs(dottie) - dottie],
      pillarsOk: [PILLARS[0].sagOk && PILLARS[0].heapOk, PILLARS[1].ok, PILLARS[2].jetOk, PILLARS[3].sumOk, PILLARS[4].kappas.every((k) => equal(k, frac(1n, 5n))), isZero(cheb.sum2)]
    };
  }
  const BENCH = benchmarks();
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    sag: () => relQ(PILLARS[0].sag),
    sagFlat: () => approx(PILLARS[0].taylor),
    half: () => relQ(PILLARS[1].kStar),
    dottie: () => approx(dottie),
    jet: () => `(${PILLARS[2].jet.map(fstr).join(', ')})`,
    pyth: () => `= ${fstr(plus(PILLARS[3].kTime, PILLARS[3].kSpace))}`,
    rotor: () => `= ${fstr(PILLARS[4].kappas[0])}`,
    cheb: () => `= ${fstr(PILLARS[5].sum2)}`,
    d8: () => diag(range(3).map((i) => shellQ('x2y2', whole(2))[i][i])),
    haar: () => `= ${BENCH.haarBad ? '≠ 0' : '0'}`,
    margins: () => SHELLS.slice(1).flatMap((sh) => sh.levels.map((l) => fstr(l.margin))).join(' · '),
    atlas: () => `|V| = ${FINAL.V}, |E| = ${FINAL.E}, b₁ = ${FINAL.b1}, τ = ${fstr(FINAL.tau)}`,
    scaff: () => String(SCAFFOLDS.length - scaffoldsAt(13)),
    n16: () => String(FINAL.N),
    replay: () => `ΔI = ${fstr(RUN.replay.dI)}, Δb₁ = ${RUN.replay.db1}, Δτ = ${fstr(RUN.replay.dTau)}`
  };
  /** The text of the NUM box. */
  function numText(say) {
    const B = BENCH,
      list = (xs) => xs.join(say('、', ', ')),
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`);
    return say(
      `打开页面时由脚本用整数与分数现算，是上面各条定理与文献结果的个别实例，不检验定理的前提。六大支柱的精确核对 ${B.pillarsOk.filter(Boolean).length}/6 成立：矢高 2s = ${fstr(PILLARS[0].sag)}，κ* = ${fstr(PILLARS[1].kStar)}，射流 (${PILLARS[2].jet.map(fstr).join(', ')})，${fstr(PILLARS[3].kTime)} + ${fstr(PILLARS[3].kSpace)} = 1，κ = ${fstr(PILLARS[4].kappas[0])}，Σχ₂ = ${fstr(B.sum2)}、Σχ₁ = ${fstr(B.sum1)}、Σχ₀ = ${B.sum0}。堆测地线到 n = 8：与 (9, 8, 8, 4) 的幂${bad(B.heapBad)}，等步 κ${bad(B.stepBad)}，⟨x(0), x(n)⟩ = T<sub>n</sub>(3/5)${bad(B.chebBad)}。5d 壳：五条轨道的 Q 之和${bad(B.sumBad)}，十二个节点的平均（五条轨道）${bad(B.haarBad)}，${B.products} 个乘积的群封闭${bad(B.groupBad)}；满壳密度离 5 最远 ${B.unsold ? '≈ ' + sci(B.unsold) : '0'}（浮点）；5d<sup>8</sup> 平均后的四阶起伏在 ${approx(B.ripple[0], 3)} 与 ${approx(B.ripple[1], 3)} 之间（浮点）。赫克：范数 5、首项为正奇数、其余为偶数的整四元数 ${B.rotorCount} 个；五个自旋壳的整数性、A<sup>T</sup>G = GA 与特征值整数${bad(B.heckeBad)}，j ≥ 1/2 的主子式非正${bad(B.minorBad)}；20 − λ² 依次为 ${list(SHELLS.map((sh) => sh.levels.map((l) => fstr(l.margin)).join('/')))}。图谱：${edges()} 条边的传输见证与 [a, o, g] = b${bad(B.witnessBad)}，${B.dag ? '有向无圈' : '有圈'}，弦 3→12 与路径 ${B.chord.path.join('→')} 的传输之积${B.chord.ok ? '相同' : '不同'}，ΣΔI = ${fstr(B.dISum)}，b₁ = ${FINAL.b1}，τ = ${fstr(FINAL.tau)}。寄存器：${B.steps} 步后${B.halts ? '停机' : '未停'}，N 与素数幂之积${bad(B.ledgerBad)}，逐步乘以门${bad(B.gateBad)}，方块逐步少 1${bad(B.dropBad)}。θ* ${approx(B.dottie[0], 8)}，cos θ* − θ* ${approx(B.dottie[1], 3)}（浮点牛顿法）。数值演示，不是证明。`,
      `Computed in integers and fractions by the script when the page opens, single instances of the theorems and literature results above; it does not check their hypotheses. The exact checks of the six pillars hold ${B.pillarsOk.filter(Boolean).length}/6: the sagitta 2s = ${fstr(PILLARS[0].sag)}, κ* = ${fstr(PILLARS[1].kStar)}, the jet (${PILLARS[2].jet.map(fstr).join(', ')}), ${fstr(PILLARS[3].kTime)} + ${fstr(PILLARS[3].kSpace)} = 1, κ = ${fstr(PILLARS[4].kappas[0])}, Σχ₂ = ${fstr(B.sum2)}, Σχ₁ = ${fstr(B.sum1)}, Σχ₀ = ${B.sum0}. The heap geodesic up to n = 8: against the powers of (9, 8, 8, 4), ${bad(B.heapBad)}; equal steps of κ, ${bad(B.stepBad)}; ⟨x(0), x(n)⟩ = T<sub>n</sub>(3/5), ${bad(B.chebBad)}. The 5d shell: the sum of the five Q, ${bad(B.sumBad)}; the average over the twelve nodes (five orbitals), ${bad(B.haarBad)}; closure of the ${B.products} products, ${bad(B.groupBad)}; the full-shell density is at most ${B.unsold ? '≈ ' + sci(B.unsold) : '0'} from 5 (floating point); after the average the 5d<sup>8</sup> density ripples of order four between ${approx(B.ripple[0], 3)} and ${approx(B.ripple[1], 3)} (floating point). Hecke: ${B.rotorCount} integer quaternions of norm 5 with a positive odd first entry and even other entries; integrality, A<sup>T</sup>G = GA and integral eigenvalues on the five shells, ${bad(B.heckeBad)}; nonpositive minors for j ≥ 1/2, ${bad(B.minorBad)}; 20 − λ² is ${list(SHELLS.map((sh) => sh.levels.map((l) => fstr(l.margin)).join('/')))}. Atlas: transport witnesses and [a, o, g] = b on ${edges()} edges, ${bad(B.witnessBad)}; ${B.dag ? 'directed and acyclic' : 'with a cycle'}; the chord 3→12 ${B.chord.ok ? 'equals' : 'differs from'} the product of the transports along ${B.chord.path.join('→')}; ΣΔI = ${fstr(B.dISum)}, b₁ = ${FINAL.b1}, τ = ${fstr(FINAL.tau)}. Register: ${B.halts ? 'halts' : 'runs on'} after ${B.steps} steps; N against the product of its prime powers, ${bad(B.ledgerBad)}; each step multiplied by its gate, ${bad(B.gateBad)}; one cube fewer per step, ${bad(B.dropBad)}. θ* ${approx(B.dottie[0], 8)}, cos θ* − θ* ${approx(B.dottie[1], 3)} (floating-point Newton steps). A numerical illustration, not a proof.`
    );
  }
  const edges = () => RUN.edges.length;
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = kept(numText(say));
  for (const el of document.querySelectorAll('[data-bench]')) el.innerHTML = kept(NUMBERS[el.dataset.bench]());
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
  const plain = (x) => JSON.parse(JSON.stringify(x, bigText));
  window.RECOMPILE_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        at: state.at,
        regime: regimeOf(m),
        pillar: state.pillar,
        pillarKey: m.pillars.p.key,
        beta: m.pillars.beta,
        betaQ: m.pillars.betaQ,
        orb: state.orb,
        haar: state.haar,
        t: m.quad.t,
        tQ: m.quad.tQ,
        Q: m.quad.Q,
        avg: m.quad.avg,
        spin: m.hecke.shell.j,
        levels: m.hecke.shell.levels,
        milestone: milestoneOf(m),
        atlas: m.atlas.row,
        fractran: { k: m.fractran.k, replay: m.fractran.replay, row: m.fractran.row },
        lens: state.lens,
        cam: state.cam,
        layers: layers(),
        clock: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        hud: { big: $('hudBig').textContent, sub: $('hudSub').textContent }
      });
    },
    /** The mathematics of the page, without touching it. */
    run: () => plain(RUN),
    shells: () => plain(SHELLS),
    orbitals: () => plain(Object.fromEntries(ORBS.map((k) => [k, { N: ORB[k].N, Q: ORB[k].Q }]))),
    pillars: () => plain(PILLARS),
    presets: plain(PRESETS),
    nodes: plain(NODES),
    rotors: plain(ROTORS),
    program: PROGRAM_TEXT.slice(),
    /** The integer core, for tests: canon, the heap, κ, the drawing of a line and the shell density. */
    core: {
      canon: (t) => canon(t),
      triad: (a, b, c) => triad(a, b, c),
      kappa: (a, b) => plain(kappa(a, b)),
      dir: (q) => dir(q),
      density: (k, t, haar, n) => shellDensity(k, t, haar, n)
    },
    /** What the NUM box and the drawer are written from. */
    bench: () => plain(BENCH),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), approx, sci },
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of a rational line on the ball. */
    pointTarget: (q) => {
      const s = sc.p(on(q)),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + s[0], y: b.top + s[1], depth: s[2] };
    }
  });
  window.TRV_THUMB = () => {
    cards.pick('twelve-node-atlas-dag-crystallization');
    clock.pause();
    clock.set(STILL.atlas);
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
