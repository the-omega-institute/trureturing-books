/* OMEGA//AURIC · AURIC 四重本相：破晓词源、三价金平面破缺与 0 · 1/2 · 1 观察者焦点 · the fourfold identity of AURIC
   (Chapter 38, §38.17)
   World (kit.solid): z up. The hero is the 5d shell of gold drawn as a radial picture of its angular number density
   ρ(n) = 10 − t·d(n), d(n) = (15/4)(n_x² − n_y²)² the normalized density of 5d(x² − y²) (mean 1), t the electrons
   taken from that orbital; the radius is R0·(0.62 + 0.38·ρ/10) and the colour follows ρ minus its mean 10 − t.
     dawn    the full shell 5d¹⁰ on a floor disk with three roots: the cognate *h₂ews- (aurum, Aurora) reaches the gold,
             the look-alikes *h₂ew- (aura) and *h₂ows- (auris) stop short; a quadrupole gauge on the axes; t on a dial;
     d4h     Au³⁺ 5d⁸ with four ligands on ±x, ±y, the empty 5d(x² − y²) window (P_LUMO, rank 1), the filled rest
             (P_occ, rank 4), the axial channels and the relativistic 6s shell (λ_rel = 0 or 1);
     ledger  the 5d⁸ body with the gauge at (−4/7, −4/7, 8/7) = 12/7·(−1/3, −1/3, 2/3), a dial of rotations about y
             with κ = cos²(θ/2) at the landmarks 1, 1/2, 1/4, 1/5, 0, and the average over the twelve Hurwitz rotations;
     focus   the 5d⁸ focus gliding over the still grooves of the canvas 𝒮, its equatorial window ℋ_{1/2}, and the spine
             along +z on which the memory crystal 𝒦₀ grows over the fifteen steps of pOmega (τ, b₁ from the atlas);
     ring    four stations on a closed ring around the twelve-node atlas, I → II → III → IV → I.
   The rail is t, the landmark, the step or the station. Fractions are pairs of big integers [p, q], q > 0; a number is
   printed after “=” only when the printed digits are the value, and after “≈” when they round it. The drawing uses
   floating-point roots and trigonometry; the readings use integers and fractions. Read-only probe: window.AURIC_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    DEG = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot,
    abs = Math.abs;
  /** A tolerance for floating-point comparisons (one part in a billion). */
  const TINY = 0.000000001;
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
  /** A fixed-point decimal that never prints −0. */
  const fix = (x, d) => {
    const s = abs(x).toFixed(d);
    return (x < 0 && Number(s) !== 0 ? '−' : '') + s;
  };

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
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const equal = (a, b) => cmp(a, b) === 0;
  const isZero = (a) => a[0] === 0n;
  /** A fraction as a double. */
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
  /** The relation before a printed number: “=” before digits that are the value, “≈” before digits that round it. */
  function relQ(q, d = 4) {
    const { text, exact } = decimals(q, d);
    return `${exact ? '=' : '≈'} ${text}`;
  }
  const approx = (x, d = 2) => `≈ ${fix(x, d)}`;
  const int = (n) => String(n).replace('-', '−');
  const tuple = (t) => `(${t.map(fstr).join(', ')})`;
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;

  /* ---------- integer quaternions ---------- */
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
  /** The heap of the ternions: triad(a, b, c) = (a · b̄) · c. */
  const triad = (a, b, c) => qmul(qmul(a, qconj(b)), c);
  /** The rotation of a quaternion: v ↦ q·v·q̄/‖q‖², an exact 3 × 3 matrix of fractions. */
  function rotOf([w, x, y, z]) {
    const n = BigInt(norm2([w, x, y, z]));
    return [
      [w * w + x * x - y * y - z * z, 2 * (x * y - w * z), 2 * (x * z + w * y)],
      [2 * (x * y + w * z), w * w - x * x + y * y - z * z, 2 * (y * z - w * x)],
      [2 * (x * z - w * y), 2 * (y * z + w * x), w * w - x * x - y * y + z * z]
    ].map((row) => row.map((v) => frac(BigInt(v), n)));
  }
  const matN = (A, B) => range(A.length).map((i) => range(B[0].length).map((j) => range(B.length).reduce((s, k) => plus(s, times(A[i][k], B[k][j])), ZERO)));
  const trN = (A) => range(A[0].length).map((i) => range(A.length).map((j) => A[j][i]));
  const addM = (A, B) => A.map((r, i) => r.map((v, j) => plus(v, B[i][j])));
  const scaleM = (A, k) => A.map((r) => r.map((v) => times(v, k)));
  const zeroM = (n) => range(n).map(() => range(n).map(() => ZERO));
  const eyeM = (n) => range(n).map((i) => range(n).map((j) => (i === j ? ONE : ZERO)));
  const diagOf = (M) => [M[0][0], M[1][1], M[2][2]];
  const traceOf = (M) => M.reduce((s, r, i) => plus(s, r[i]), ZERO);
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
  const AXES3 = [poly({ '1,0,0': 1 }), poly({ '0,1,0': 1 }), poly({ '0,0,1': 1 })];
  /** Per orbital: Q_ab = ⟨p²(3 n_a n_b − δ_ab)⟩/⟨p²⟩, exactly; its diagonal is diagonal(o, a) of the Lean module. */
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
      return [k, { N, Q }];
    })
  );
  const FULL = ORBS.reduce((S, k) => addM(S, ORB[k].Q), zeroM(3));
  const CLOSED = scaleM(FULL, whole(2));
  const DELETED = scaleM(
    ORBS.filter((k) => k !== 'x2y2').reduce((S, k) => addM(S, ORB[k].Q), zeroM(3)),
    whole(2)
  );
  const Q_AURIC = [frac(-1n, 3n), frac(-1n, 3n), frac(2n, 3n)];
  const RATIO = frac(12n, 7n);
  /** The quadrupole of the shell with t electrons taken from 5d(x² − y²): −t·Q(x² − y²), t a fraction. */
  const shellQ = (tQ) => scaleM(ORB.x2y2.Q, minus(ZERO, tQ));
  const Q_X2Y2F = diagOf(ORB.x2y2.Q).map(fval);
  /** Its diagonal as doubles for any t on the way between whole values. */
  const shellQf = (t) => Q_X2Y2F.map((v) => -t * v);

  /* ---------- the projections P_occ and P_LUMO on the five real d orbitals (z², xz, yz, xy, x² − y²) ---------- */
  const P_LUMO = range(5).map((i) => range(5).map((j) => (i === 4 && j === 4 ? ONE : ZERO)));
  const P_OCC = eyeM(5).map((r, i) => r.map((v, j) => minus(v, P_LUMO[i][j])));
  const PROJ = (() => {
    const z = zeroM(5);
    return {
      rankOcc: rankF(P_OCC),
      rankLumo: rankF(P_LUMO),
      idemOcc: same(matN(P_OCC, P_OCC), P_OCC),
      idemLumo: same(matN(P_LUMO, P_LUMO), P_LUMO),
      crossA: same(matN(P_OCC, P_LUMO), z),
      crossB: same(matN(P_LUMO, P_OCC), z),
      sum: same(addM(P_OCC, P_LUMO), eyeM(5))
    };
  })();
  PROJ.ok = PROJ.idemOcc && PROJ.idemLumo && PROJ.crossA && PROJ.crossB && PROJ.sum;

  /* ---------- the spin-two character and the rotations of the five-dimensional quadrupole space ---------- */
  /** The even character E(k, n): E(k, 0) = 1, E(k, 1) = 4k − 1, E(k, n + 1) = (4k − 2)E(k, n) − E(k, n − 1). */
  function evenChar(k, n) {
    let a = ONE,
      b = minus(times(whole(4), k), ONE);
    if (n === 0) return a;
    for (let i = 1; i < n; i++) [a, b] = [b, minus(times(minus(times(whole(4), k), whole(2)), b), a)];
    return b;
  }
  const chi2 = (k) => plus(minus(times(whole(16), times(k, k)), times(whole(12), k)), ONE);
  /** A basis of the traceless symmetric 3 × 3 matrices: x² − y², 2z² − x² − y², xy, xz, yz. */
  const B5 = [
    [[1, 0, 0], [0, -1, 0], [0, 0, 0]],
    [[-1, 0, 0], [0, -1, 0], [0, 0, 2]],
    [[0, 1, 0], [1, 0, 0], [0, 0, 0]],
    [[0, 0, 1], [0, 0, 0], [1, 0, 0]],
    [[0, 0, 0], [0, 0, 1], [0, 1, 0]]
  ].map((M) => M.map((r) => r.map(whole)));
  /** The coordinates of a traceless symmetric S in B5. */
  function coords5(S) {
    const b = quo(S[2][2], whole(2));
    return [plus(S[0][0], b), b, S[0][1], S[0][2], S[1][2]];
  }
  /** The 5 × 5 matrix of S ↦ R S Rᵀ in B5. */
  function adMatrix(R) {
    const cols = B5.map((B) => coords5(matN(matN(R, B), trN(R))));
    return range(5).map((i) => range(5).map((k) => cols[k][i]));
  }
  const LANDMARKS = [
    { k: ONE, q: [1, 0, 0, 0] },
    { k: frac(1n, 2n), q: [1, 1, 0, 0] },
    { k: frac(1n, 4n), q: [1, 1, 1, 1] },
    { k: frac(1n, 5n), q: [1, 2, 0, 0] },
    { k: ZERO, q: [0, 1, 0, 0] }
  ].map((l) => ({ ...l, label: fstr(l.k), chi: chi2(l.k), chiE: evenChar(l.k, 2), trace: traceOf(adMatrix(rotOf(l.q))), cosT: minus(times(whole(2), l.k), ONE), theta: Math.acos(clamp(2 * fval(l.k) - 1, -1, 1)) }));
  /** The six generators of norm 5 and the sum of their rotations on the quadrupole space. */
  const ROTORS = [
    [1, 2, 0, 0],
    [1, -2, 0, 0],
    [1, 0, 2, 0],
    [1, 0, -2, 0],
    [1, 0, 0, 2],
    [1, 0, 0, -2]
  ];
  const HECKE = (() => {
    const A = ROTORS.reduce((S, q) => addM(S, adMatrix(rotOf(q))), zeroM(5)),
      levels = [frac(-74n, 25n), frac(54n, 25n)].map((lam) => ({ lam, mult: 5 - rankF(A.map((r, i) => r.map((v, j) => (i === j ? minus(v, lam) : v)))) })),
      shift = (lam) => A.map((r, i) => r.map((v, j) => (i === j ? minus(v, lam) : v))),
      minimal = same(matN(shift(levels[0].lam), shift(levels[1].lam)), zeroM(5));
    return { trace: traceOf(A), levels, minimal, norms: ROTORS.map(norm2), kappas: ROTORS.map((q) => frac(BigInt(q[0] * q[0]), BigInt(norm2(q)))) };
  })();
  /** The trace representatives of the Lean table: a(n)/5ⁿ with a(n + 2) = −6a(n + 1) − 25a(n). */
  const S5 = (() => {
    const a = [1n, -1n];
    for (let n = 2; n <= 6; n++) a.push(-6n * a[n - 1] - 25n * a[n - 2]);
    const rep = a.map((v, n) => frac(v, 5n ** BigInt(n)));
    return { rep, ok: rep.every((r, n) => equal(r, evenChar(frac(1n, 5n), n))) };
  })();
  /* the Haar moments of κ and the expectations of the even characters */
  const factB = (n) => {
    let r = 1n;
    for (let k = 2n; k <= n; k++) r *= k;
    return r;
  };
  const haarMoment = (k) => frac(factB(2n * BigInt(k)), 4n ** BigInt(k) * factB(BigInt(k) + 1n) * factB(BigInt(k)));
  function evenCharPoly(r) {
    let a = [ONE],
      b = [whole(-1), whole(4)];
    if (r === 0) return a;
    for (let i = 1; i < r; i++) {
      const n = range(b.length + 1).map(() => ZERO);
      b.forEach((c, j) => {
        n[j] = plus(n[j], times(whole(-2), c));
        n[j + 1] = plus(n[j + 1], times(whole(4), c));
      });
      a.forEach((c, j) => (n[j] = minus(n[j], c)));
      [a, b] = [b, n];
    }
    return b;
  }
  const HAAR = range(7).map((r) => evenCharPoly(r).reduce((s, c, j) => plus(s, times(c, haarMoment(j))), ZERO));

  /* ---------- the twelve Hurwitz cores, their rotations and the atlas of the sixteen milestones ---------- */
  const DOUBLED = [
    [2, 0, 0, 0],
    [1, 1, 1, 1],
    [1, -1, 1, 1],
    [1, 1, -1, 1],
    [1, 1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, 1, -1],
    [1, 1, -1, -1],
    [1, -1, -1, -1],
    [0, 2, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 2]
  ];
  const NODES = DOUBLED.map(canon);
  const ROTS = NODES.map(rotOf);
  const ROT_F = ROTS.map((R) => R.map((row) => row.map(fval)));
  const ROTATED = ROTS.map((R) => matN(matN(R, DELETED), trN(R)));
  const AVG_DELETED = scaleM(ROTATED.reduce(addM, zeroM(3)), frac(1n, 12n));
  /** The milestones: the node and the directed edges each one adds (node numbers from 1). */
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
    { node: 0, edges: [] },
    { node: 0, edges: [[5, 12]] },
    { node: 0, edges: [] },
    { node: 0, edges: [[3, 12]] }
  ];
  const STEPS = MILESTONES.length - 1;
  /** The four gates of pOmega in priority order, and the states the Lean theorem lists after the start. */
  const PROGRAM = [
    [11n, 49n],
    [7n, 25n],
    [5n, 9n],
    [3n, 4n]
  ];
  const PROGRAM_TEXT = PROGRAM.map(([a, b]) => `${a}/${b}`);
  const LEAN_TRACE = [98304n, 73728n, 40960n, 30720n, 23040n, 12800n, 3584n, 2688n, 2016n, 1120n, 840n, 630n, 350n, 98n, 22n];
  const FR = (() => {
    let N = 131072n;
    const states = [N],
      gates = [-1];
    for (let k = 0; k < 64; k++) {
      const g = PROGRAM.findIndex(([, d]) => N % d === 0n);
      if (g < 0) break;
      N = (N / PROGRAM[g][1]) * PROGRAM[g][0];
      states.push(N);
      gates.push(g);
    }
    return { states, gates, steps: states.length - 1, halts: PROGRAM.every(([, d]) => N % d !== 0n), matches: same(states.slice(1), LEAN_TRACE), blocked: PROGRAM.map(([, d]) => String(d)) };
  })();
  /** The whole run: graph, Gram–Schmidt, loop rank and structural time, milestone by milestone. */
  function runAtlas() {
    const parent = range(13).map((i) => i),
      find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
    const nodes = [],
      edges = [],
      basis = [];
    let tau = ZERO,
      b1 = 0;
    const rows = [];
    for (let k = 0; k <= STEPS; k++) {
      const m = MILESTONES[k];
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
      for (const [a, b] of m.edges) parent[find(a)] = find(b);
      edges.push(...m.edges.map(([a, b]) => ({ a, b, k })));
      const comps = new Set(nodes.map(find)).size,
        nb1 = edges.length - nodes.length + comps,
        db1 = nb1 - b1;
      b1 = nb1;
      const dTau = plus(dI, whole(db1));
      tau = plus(tau, dTau);
      rows.push({ k, M: k + 1, node: m.node, added: m.edges, V: nodes.length, E: edges.length, c: comps, dI, db1, b1, dTau, tau, N: FR.states[k], gate: FR.gates[k] });
    }
    return { rows, edges };
  }
  const RUN = runAtlas();
  const FINAL = RUN.rows[STEPS];
  /** The milestone at which each node joins. */
  const JOIN = Object.fromEntries(RUN.rows.filter((r) => r.node).map((r) => [r.node, r.k]));

  /* ---------- second-order jets, the Gram excess, the heap, the simplicial cochains ---------- */
  const jmul = (a, b) => [times(a[0], b[0]), plus(times(a[0], b[1]), times(a[1], b[0])), plus(plus(times(a[0], b[2]), times(a[1], b[1])), times(a[2], b[0]))];
  function jinv(a) {
    const i0 = quo(ONE, a[0]),
      u1 = times(a[1], i0),
      u2 = times(a[2], i0);
    return [i0, minus(ZERO, times(i0, u1)), times(i0, minus(times(u1, u1), u2))];
  }
  /** kappaJetAt(x₀): the inverse of 1 + (x₀ + η)² = ⟨1 + x₀², 2x₀, 1⟩. */
  const kappaJetAt = (x0) => jinv([plus(ONE, times(x0, x0)), times(whole(2), x0), ONE]);
  const JET1 = kappaJetAt(ONE);
  const ETA = [ZERO, ONE, ZERO];
  const ETA_CUBE = jmul(jmul(ETA, ETA), ETA);
  const JET_OK = jmul(JET1, [whole(2), whole(2), ONE]).every((v, i) => equal(v, i ? ZERO : ONE));
  const qdot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const kap = (a, b) => frac(BigInt(qdot(a, b)) ** 2n, BigInt(norm2(a) * norm2(b)));
  const barg = (a, b, c) => frac(BigInt(qdot(a, b) * qdot(b, c) * qdot(c, a)), BigInt(norm2(a) * norm2(b) * norm2(c)));
  const detGram3 = (a, b, c) => minus(plus(ONE, times(whole(2), barg(a, b, c))), plus(plus(kap(a, b), kap(b, c)), kap(c, a)));
  const GRAM = detGram3([1, 0, 0, 0], [1, 1, 0, 0], [1, 0, 1, 0]);
  /** triad(x, x, z) = ‖x‖²z against z on sample quaternions: how many pairs keep the ray. */
  const ABSORB = (() => {
    const xs = [[1, 2, 0, 0], [1, 1, 1, 1], [2, 0, 0, 0], [3, -1, 4, 1]],
      zs = [[1, 1, 1, 1], [0, 1, 0, 0], [3, 1, 4, 1], [1, -2, 0, 5]];
    let ok = 0;
    for (const x of xs) for (const z of zs) if (same(canon(triad(x, x, z)), canon(z))) ok++;
    return { ok, total: xs.length * zs.length };
  })();
  /** d₁e and d₂F on V = {0, 1, 2, 3} over ℚ: a coboundary has d₂ = 0 everywhere; one changed face breaks it. */
  const COB = (() => {
    const V = 4,
      e = (x, y) => frac(BigInt(3 * x - 2 * y + x * y + 1), 7n),
      d1 = (f) => (x, y, z) => minus(plus(f(y, z), f(x, y)), f(x, z)),
      d2 = (F) => (x, y, z, w) => minus(plus(F(y, z, w), F(x, y, w)), plus(F(x, z, w), F(x, y, z))),
      F = d1(e),
      G = (x, y, z) => (x === 0 && y === 1 && z === 2 ? plus(F(x, y, z), ONE) : F(x, y, z));
    let closed = 0,
      defect = 0;
    for (let x = 0; x < V; x++)
      for (let y = 0; y < V; y++)
        for (let z = 0; z < V; z++)
          for (let w = 0; w < V; w++) {
            if (!isZero(d2(F)(x, y, z, w))) closed++;
            if (!isZero(d2(G)(x, y, z, w))) defect++;
          }
    return { closed, defect, total: V ** 4 };
  })();

  /* ---------- the state: one rail value per card ---------- */
  const SCENES = ['dawn', 'd4h', 'ledger', 'focus', 'ring'];
  const RAILS = {
    dawn: { max: 8, rate: 4 },
    d4h: { max: 8, rate: 4 },
    ledger: { max: 4, rate: 1 },
    focus: { max: STEPS, rate: 3 },
    ring: { max: 4, rate: 1 }
  };
  /** The rail of cards 1 and 2 counts quarters: t = v/4 electrons taken, 0 … 2. */
  const STILL = { dawn: 0, d4h: 8, ledger: 3, focus: STEPS, ring: 4 };
  const FRESH = { rel: 1, haar: false };
  const state = { scene: 'dawn', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  function split(t) {
    const k = Math.floor(t + TINY);
    return { k, f: t - k < TINY ? 0 : t - k };
  }
  const isWhole = (v) => abs(v - Math.round(v)) < TINY;
  /** Everything the page shows of the present state. */
  function compute(s) {
    const tv = (v) => {
      const tQ = isWhole(v) ? frac(BigInt(Math.round(v)), 4n) : null;
      return { v, t: v / 4, tQ, tw: tQ && tQ[1] === 1n ? Number(tQ[0]) : null, Qf: shellQf(v / 4), Q: tQ ? shellQ(tQ) : null };
    };
    const lv = split(s.at.ledger),
      lk = Math.min(lv.k, 4),
      lf = lk >= 4 ? 0 : lv.f,
      theta = lerp(LANDMARKS[lk].theta, LANDMARKS[Math.min(lk + 1, 4)].theta, lf);
    const fv = split(s.at.focus),
      fk = Math.min(fv.k, STEPS),
      ff = fk >= STEPS ? 0 : fv.f;
    const rv = split(s.at.ring),
      rk = Math.min(rv.k, 4),
      rf = rk >= 4 ? 0 : rv.f;
    return {
      dawn: tv(s.at.dawn),
      d4h: { ...tv(s.at.d4h), rel: s.rel },
      ledger: { v: s.at.ledger, k: lk, f: lf, mark: LANDMARKS[lk], theta, haar: s.haar },
      focus: { v: s.at.focus, k: fk, f: ff, row: RUN.rows[fk], next: RUN.rows[Math.min(fk + 1, STEPS)] },
      ring: { v: s.at.ring, k: rk, f: rf }
    };
  }
  const calc = () => compute(state);

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  const PRESETS = {
    'pie-dawn-and-noble-aurous-sphere': { scene: 'dawn', cam: 'panorama', play: false, still: STILL.dawn },
    'relativistic-z79-d4h-lumo-window': { scene: 'd4h', cam: 'panorama', play: true, still: STILL.d4h },
    'trivalent-rank-and-j2-quadrupole-ledger': { scene: 'ledger', cam: 'panorama', play: true, still: STILL.ledger },
    'observer-focus-half-horizon-and-tau-spine': { scene: 'focus', cam: 'panorama', play: true, still: STILL.focus },
    'auric-ouroboros-matter-to-omega-closure': { scene: 'ring', cam: 'panorama', play: true, still: STILL.ring }
  };
  const DEFAULT = 'pie-dawn-and-noble-aurous-sphere';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  /** The azimuth of the viewer of each scene: the camera looks at the gold from this side. */
  const VIEW_AZ = 30 * DEG;
  const AZ_OF = { dawn: VIEW_AZ, d4h: VIEW_AZ, ledger: -58 * DEG, focus: VIEW_AZ, ring: VIEW_AZ };
  const PITCH = { dawn: [0.36, 0.12, 1.05], d4h: [0.4, 0.12, 1.05], ledger: [0.3, 0.08, 1.0], focus: [0.4, 0.14, 1.0], ring: [0.62, 0.22, 1.2] };
  const CAMI = { panorama: 0, side: 1, above: 2 };
  /** The yaw that puts the viewer at azimuth θ: R then points to θ + 90°. */
  const yawAt = (th) => Math.atan2(-cs(th), -sn(th));
  function camFor(scene, name) {
    const i = CAMI[name] == null ? 0 : CAMI[name];
    return [yawAt(AZ_OF[scene]) + [0, 0.55, 0][i], PITCH[scene][i], 1];
  }
  const START = camFor('dawn', 'panorama');
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
  const small = () => stage.clientWidth < 480;
  /** The pixel offset (right, up) of a world point, for labels. */
  const off = (p, right, up) => add(add(p, scale(cam.R, right / sc.unit)), scale(cam.U, up / sc.unit));
  const sphereAt = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  const matVec = (R, p) => [dot(R[0], p), dot(R[1], p), dot(R[2], p)];
  const rotY = (th) => [
    [cs(th), 0, sn(th)],
    [0, 1, 0],
    [-sn(th), 0, cs(th)]
  ];
  const AT = (az, r, z) => [r * cs(az), r * sn(az), z];
  const C0 = [0, 0, 0];

  /* the density picture of the shell */
  /** The normalized density of 5d(x² − y²) at a unit vector: mean 1 over the sphere, 15/4 on the axes x and y. */
  const dx2 = (n) => 3.75 * (n[0] * n[0] - n[1] * n[1]) ** 2;
  const rhoAt = (t, n) => 10 - t * dx2(n);
  /** The same shell averaged over the rotations of the twelve Hurwitz nodes. */
  const rhoAvg = (t, n) => {
    let s = 0;
    for (const R of ROT_F) s += rhoAt(t, matVec(R, n));
    return s / ROT_F.length;
  };
  const radiusAt = (R0, rho) => R0 * (0.62 + (0.38 * rho) / 10);

  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  const solid = (key, mesh, color, alpha = 1, edges = P.ink) => alpha > 0.01 && sc.poly(alpha < 0.99 ? key + '~' : key, mesh, { color, alpha, edges, pick: false, occlude: alpha >= 0.99 });
  /* the weights of the two readings in the two lenses: exact objects cyan, the empty window and the flat contrasts magenta */
  const weight = () => (state.lens ? { exact: 0.62, flat: 1 } : { exact: 1, flat: 0.78 });

  /** The shell: a lit body whose colour follows the density minus its mean (dark below, violet at the mean, cyan above). */
  function drawBody(key, c, R0, t, a, o = {}) {
    if (a < 0.01) return;
    const dens = o.haar ? (n) => rhoAvg(t, n) : (n) => rhoAt(t, n),
      mean = 10 - t,
      R = o.rot || null,
      glow = o.glow ? (n) => 0.42 * Math.max(0, dot(n, o.glow)) ** 2 : () => 0;
    /* the colour ramp: violet at the mean density (the full shell is violet), darker towards stage where the shell is
       dented, a light cyan tint where it exceeds the mean; cyan itself is left to the gauge and the 5d(z²) lobes */
    const shade = (n) => {
      const dev = dens(n) - mean;
      return clamp((dev >= 0 ? 0.5 + 0.09 * Math.min(dev, 2) : 0.5 + (0.5 * Math.max(dev, -2.5)) / 2.5) + glow(n), 0, 1);
    };
    const place = (n) => {
      const p = scale(n, radiusAt(R0, dens(n)));
      return add(c, R ? matVec(R, p) : p);
    };
    if (o.ghost) {
      sc.surface(key + '~', (u, v) => place(sphereAt(u, v)), { u: [0, PI], v: [0, TAU], nu: 24, nv: 48, color: P.violet, alpha: a, pick: false, occlude: false });
      return;
    }
    sc.surface(key + (a < 0.99 ? '~' : ''), (u, v) => place(sphereAt(u, v)), {
      u: [0, PI],
      v: [0, TAU],
      nu: o.nu || 40,
      nv: o.nv || 80,
      colors: [P.stage, P.violet, P.cyan],
      range: [0, 1],
      value: (u, v) => shade(sphereAt(u, v)),
      grid: { every: [4, 8], alpha: 0.16 },
      alpha: a < 0.99 ? a : 1,
      pick: false
    });
  }
  /** The emptied electrons: magenta lobes of 5d(x² − y²) lifted off the dents they leave. */
  function drawLobes(key, c, R0, t, a) {
    if (a < 0.01 || t < 0.01) return;
    const lift = R0 * 0.5 * (t / 2);
    sc.surface(
      key + '~',
      (u, v) => {
        const n = sphereAt(u, v);
        return add(c, scale(n, radiusAt(R0, rhoAt(t, n)) + 0.004 + (lift * dx2(n)) / 3.75));
      },
      { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, color: P.magenta, alpha: (u, v) => clamp((dx2(sphereAt(u, v)) / 3.75) * 1.6, 0, 1) * 0.42 * a, pick: false, occlude: false }
    );
  }
  /** The quadrupole gauge: on each axis a bead at G0 + G1·Q_aa on both sides, the tick circle of Q = 0 at G0. */
  function drawGauge(pre, c, Qd, G0, G1, a, w, len) {
    if (a < 0.01) return;
    for (let k = 0; k < 3; k++) {
      const e = [0, 0, 0];
      e[k] = 1;
      sc.line([add(c, scale(e, -len)), add(c, scale(e, len))], { color: P.violet, width: 1.1, alpha: 0.55 * a });
      for (const s of [1, -1]) {
        sc.circle(add(c, scale(e, s * G0)), e, 0.055, { color: P.cyan, width: 1, alpha: 0.5 * a, fade: false });
        sc.bead(add(c, scale(e, s * (G0 + G1 * Qd[k]))), { color: P.cyan, r: 4.6, alpha: a * w, key: `${pre}${k}${s}` });
      }
    }
  }
  /** A flat disk of radius r at the height of c, with a polar grid. */
  function floorDisk(key, c, r, a) {
    if (a < 0.01) return;
    sc.surface(key + (a < 0.99 ? '~' : ''), (u, v) => [c[0] + u * r * cs(v), c[1] + u * r * sn(v), c[2]], { u: [0, 1], v: [0, TAU], nu: 6, nv: 72, colors: [P.stage, P.violet], range: [0, 1], value: (u) => 0.1 + 0.22 * u, grid: { every: [1, 6], alpha: 0.3 }, alpha: a < 0.99 ? a : 1, pick: false });
  }
  function ball(key, c, r, color, a, nu = 14) {
    if (a < 0.01) return;
    sc.surface(key + (a < 0.99 ? '~' : ''), (u, v) => add(c, scale(sphereAt(u, v), r)), { u: [0, PI], v: [0, TAU], nu, nv: 2 * nu, color, alpha: a < 0.99 ? a : 1, pick: false });
  }

  /* ---------- the dial of t (cards 1 and 2) ---------- */
  const FLOOR = -0.86,
    R_MAIN = 0.62,
    DIAL_R = 1.22,
    DIAL_SPAN = 34 * DEG;
  /** The point of the dial for t ∈ [0, 2]: from the left of the viewer (t = 0) to the right (t = 2). */
  const tDial = (t) => AT(VIEW_AZ - DIAL_SPAN + DIAL_SPAN * t, DIAL_R, FLOOR + 0.02);
  /** The dial with a tick at every quarter, larger at the whole t = 0, 1, 2. */
  function drawTDial(a, t) {
    if (a < 0.01) return;
    sc.line(sample(40, (u) => tDial(2 * u)), { color: P.violet, width: 1.6, alpha: 0.85 * a });
    for (let k = 0; k <= 8; k++) sc.circle(tDial(k / 4), [0, 0, 1], k % 4 ? 0.026 : 0.05, { color: k / 4 <= t + TINY ? P.cyan : P.violet, width: k % 4 ? 1.2 : 1.6, alpha: a, fade: false });
  }
  /* the three roots on the floor of card 1 */
  const ROOTS = [
    { key: 'cog', az: VIEW_AZ - 62 * DEG, cog: true },
    { key: 'aura', az: VIEW_AZ + 58 * DEG, cog: false },
    { key: 'auris', az: VIEW_AZ + 128 * DEG, cog: false }
  ];
  const ROOT_TIP = 1.44;
  const rootTip = (r) => AT(r.az, ROOT_TIP, FLOOR + 0.015);
  /** Where the cognate beam enters the shell: towards its tip and a little down. */
  const DAWN_DIR = (() => {
    const tip = rootTip(ROOTS[0]);
    return unit([tip[0], tip[1], -0.45]);
  })();

  function drawDawn(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      t = m.dawn.t;
    floorDisk('floor-d', [0, 0, FLOOR], 1.52, a);
    // the side the cognate beam reaches is lit towards cyan (solidified dawn light, a drawing of the page)
    drawBody('body-d', C0, R_MAIN, t, a, { glow: DAWN_DIR });
    drawLobes('lobe-d', C0, R_MAIN, t, a * flat);
    drawGauge('gd', C0, m.dawn.Qf, 0.95, 0.3, a, exact, 1.32);
    for (const r of ROOTS) {
      const tip = rootTip(r);
      if (r.cog) {
        // the cognate root reaches the gold: a cyan beam from its tip up into the shell (solidified dawn light, MODEL)
        const end = scale(DAWN_DIR, R_MAIN * 1.03);
        const pts = sample(24, (u) => add(mix(tip, end, u), [0, 0, 0.16 * sn(PI * u)]));
        tube('ray-cog', pts, P.cyan, 0.02, a * exact, 0.6);
        sc.arrow(pts[20], pts[24], { color: P.cyan, width: 2.4, headSize: 11, alpha: a * exact });
        sc.bead(tip, { color: P.cyan, r: 5, alpha: a * exact, key: 'tip-cog' });
      } else {
        // a look-alike: a violet dashed ray on the floor that stops short of the gold
        sc.line([tip, AT(r.az, 0.82, FLOOR + 0.015)], { color: P.violet, width: 2, dash: [6, 5], alpha: a * (0.55 + 0.45 * flat) });
        sc.bead(tip, { color: P.violet, r: 4.4, alpha: a * (0.6 + 0.4 * flat), key: 'tip-' + r.key });
      }
    }
    drawTDial(a, t);
  }

  /* ---------- card 2: Au³⁺ 5d⁸ in the square plane ---------- */
  const LIG = 1.2,
    LIG_R = 0.12;
  const LIGANDS = [
    [LIG, 0, 0],
    [-LIG, 0, 0],
    [0, LIG, 0],
    [0, -LIG, 0]
  ];
  const R6S = [1.04, 0.9];
  function drawD4h(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      t = m.d4h.t,
      lam = m.d4h.rel,
      R0 = R_MAIN * (lam ? 1 : 0.95);
    drawBody('body-q', C0, R0, t, a);
    drawLobes('lobe-q', C0, R0, t, a * flat);
    // four ligands on ±x, ±y and their bonds
    LIGANDS.forEach((p, i) => {
      ball('lig' + i, p, LIG_R, P.violet, a);
      sc.line([scale(unit(p), R0 * 0.75), scale(unit(p), LIG - LIG_R)], { color: P.violet, width: 1.6, dash: [3, 3], alpha: 0.75 * a });
    });
    // the square plane of the four ligands
    sc.line([...LIGANDS.slice(0, 1), LIGANDS[2], LIGANDS[1], LIGANDS[3], LIGANDS[0]], { color: P.violet, width: 1, alpha: 0.35 * a });
    // the filled 5d(z²): cyan lobes along ±z (its axial part), and the open axial channels beyond them
    sc.surface(
      'z2lobe~',
      (u, v) => {
        const n = sphereAt(u, v);
        return scale(n, radiusAt(R0, rhoAt(t, n)) + 0.004 + 0.3 * Math.max(0, (3 * n[2] * n[2] - 1) / 2) ** 2);
      },
      { u: [0, PI], v: [0, TAU], nu: 40, nv: 48, color: P.cyan, alpha: (u) => clamp((cs(u) ** 2 - 0.45) / 0.25, 0, 1) * 0.5 * a * exact, pick: false, occlude: false }
    );
    for (const s of [1, -1]) sc.arrow([0, 0, s * (R0 + 0.32)], [0, 0, s * 1.42], { color: P.cyan, width: 2.6, headSize: 11, alpha: a * exact });
    // the 6s shell: contracted (cyan) at λ = 1; the nonrelativistic radius stays as a magenta dashed circle
    const r6 = R6S[lam];
    sc.glass('s6', C0, r6, { color: lam ? P.cyan : P.magenta, alpha: 0.025 * a, rim: 0.2 * a });
    sc.circle(C0, [0, 0, 1], R6S[0], { color: P.magenta, width: 1.4, dash: [5, 4], alpha: a * flat * (lam ? 0.85 : 1), back: 0.3 });
    if (lam) sc.circle(C0, [0, 0, 1], R6S[1], { color: P.cyan, width: 1.8, alpha: a * exact, back: 0.3 });
    drawTDial(a, t);
  }

  /* ---------- card 3: the j = 2 ledger ---------- */
  const R_LEDGER = 0.6,
    G0 = 0.9,
    G1 = 0.36,
    DIAL_K = 1.45;
  const DELETED_F = diagOf(DELETED).map(fval);
  const AURIC_F = Q_AURIC.map(fval);
  /** The point of the rotation dial at angle θ about y: the image of the long axis e_z. */
  const kDial = (th, r = DIAL_K) => [r * sn(th), 0, r * cs(th)];
  function drawLedger(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      l = m.ledger,
      haar = l.haar;
    drawBody('body-l', C0, R_LEDGER, 2, a, { haar });
    // the gauge: Q = (−4/7, −4/7, 8/7) in cyan, Q_Auric = (−1/3, −1/3, 2/3) as violet rings; averaged to 0 with the Haar toggle
    drawGauge('gl', C0, haar ? [0, 0, 0] : DELETED_F, G0, G1, a, exact, 1.38);
    for (let k = 0; k < 3; k++) {
      const e = [0, 0, 0];
      e[k] = 1;
      for (const s of [1, -1]) sc.ring(scale(e, s * (G0 + G1 * AURIC_F[k])), { color: P.violet, r: 7, alpha: 0.85 * a, normal: e, key: `qa${k}${s}` });
    }
    if (haar)
      // the twelve rotated gauges: their diagonal entries (R Q Rᵀ)_aa, violet, on the + side of each axis
      ROTATED.forEach((M, r) =>
        diagOf(M).forEach((v, k) => {
          const e = [0, 0, 0];
          e[k] = 1;
          sc.bead(add(scale(e, G0 + G1 * fval(v)), scale([1, 1, 1].map((x, i) => (i === k ? 0 : x)), 0.014 * (r % 3 - 1))), { color: P.violet, r: 2.8, alpha: 0.8 * a, key: `hr${k}-${r}` });
        })
      );
    // the dial of rotations about y: the long axis e_z turns to (sin θ, 0, cos θ); ticks at the five landmarks
    sc.line(sample(60, (u) => kDial(u * PI)), { color: P.violet, width: 1.5, alpha: 0.8 * a });
    LANDMARKS.forEach((lm, i) => sc.circle(kDial(lm.theta), [0, 1, 0], 0.05, { color: P.cyan, width: i === l.k && !l.f ? 2.2 : 1.5, alpha: a * exact, fade: false }));
    const th = l.theta;
    if (th > 0.01) {
      sc.arrow([0, 0, 0], kDial(th, DIAL_K * 0.96), { color: P.violet, width: 2.2, headSize: 10, alpha: a });
      drawBody('ghost-l', C0, R_LEDGER, 2, 0.16 * a * (0.6 + 0.4 * flat), { ghost: true, rot: rotY(th) });
    }
  }

  /* ---------- card 4: the observer focus over the canvas ---------- */
  const CANVAS_Z = -0.94,
    FOCUS_Z = -0.3,
    R_FOCUS = 0.3,
    HORIZON = 0.47,
    SPINE_H = 1.32,
    TAU_MAX = fval(FINAL.tau);
  const GROOVES = [0.32, 0.62, 0.92, 1.22];
  /** The focus glides on a spiral over the grooves and halts at the centre after the fifteenth step. */
  const pathAt = (v) => {
    const u = clamp(v / STEPS, 0, 1),
      r = 0.98 * (1 - u),
      az = VIEW_AZ - 95 * DEG + 230 * DEG * u;
    return [r * cs(az), r * sn(az), FOCUS_Z];
  };
  /** The height of a proper time on the spine above the focus. */
  const spineZ = (tau) => FOCUS_Z + R_FOCUS + 0.06 + (SPINE_H * tau) / TAU_MAX;
  /** A node of the memory crystal, relative to the focus centre: on a helix round the spine, at the time it joined. */
  const crystalAt = (c, node) => {
    const az = node * 137.5 * DEG,
      h = spineZ(fval(RUN.rows[JOIN[node]].tau));
    return [c[0] + 0.19 * cs(az), c[1] + 0.19 * sn(az), h];
  };
  /** The direction from which the comparison of step k comes in: the four lobes of the window in turn. */
  const inDir = (k) => {
    const az = (k % 4) * 90 * DEG;
    return [cs(az), sn(az), 0];
  };
  function drawFocus(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      f = m.focus,
      v = f.v,
      c = pathAt(v),
      k = f.k,
      row = f.row;
    // the static canvas 𝒮 and its still grooves
    floorDisk('canvas', [0, 0, CANVAS_Z], 1.42, a);
    GROOVES.forEach((r) => sc.circle([0, 0, CANVAS_Z + 0.006], [0, 0, 1], r, { color: P.cyan, width: 1.3, alpha: 0.55 * a * exact, fade: false }));
    // the track of the focus read off the grooves so far
    const track = sample(Math.max(2, Math.round(v * 6)), (u) => {
      const p = pathAt(u * v);
      return [p[0], p[1], CANVAS_Z + 0.01];
    });
    sc.line(track, { color: P.cyan, width: 2.2, alpha: 0.9 * a * exact });
    sc.line([c, [c[0], c[1], CANVAS_Z + 0.01]], { color: P.violet, width: 1, dash: [3, 4], alpha: 0.6 * a });
    // the focus: the 5d⁸ body, its empty window and the horizon ring ℋ_{1/2}
    drawBody('body-f', c, R_FOCUS, 2, a, { nu: 28, nv: 56 });
    drawLobes('lobe-f', c, R_FOCUS, 2, a * flat);
    sc.circle(c, [0, 0, 1], HORIZON, { color: P.violet, width: 1.8, alpha: 0.9 * a, back: 0.35 });
    // the spine along +z up to the present proper time, with a ring at the time of every step so far
    const top = spineZ(lerp(fval(row.tau), fval(f.next.tau), f.f));
    tube('spine', [[c[0], c[1], FOCUS_Z + R_FOCUS * 0.95], [c[0], c[1], top]], P.cyan, 0.016, a * exact, 0.5);
    for (let j = 1; j <= k; j++) if (!isZero(RUN.rows[j].dTau)) sc.circle([c[0], c[1], spineZ(fval(RUN.rows[j].tau))], [0, 0, 1], 0.045, { color: P.cyan, width: 1.2, alpha: 0.7 * a * exact, fade: false });
    // the memory crystal 𝒦₀: the nodes and edges welded so far, the edges of this step amber
    RUN.rows.slice(0, k + 1).forEach((r) => {
      if (r.node) sc.bead(crystalAt(c, r.node), { color: r.k === k && !f.f ? P.amber : P.cyan, r: r.k === k && !f.f ? 5.4 : 3.8, alpha: a, key: 'kn' + r.node });
      r.added.forEach(([p, q]) => {
        const now = r.k === k && !f.f;
        tube(`ke${p}-${q}`, [crystalAt(c, p), crystalAt(c, q)], now ? P.amber : P.cyan, now ? 0.011 : 0.007, now ? a : 0.85 * a * exact, 0.2);
      });
    });
    // between steps: the next incoming candidate comparison triangle flies into the window
    if (f.f > 0 && k < STEPS) {
      const d = inDir(k),
        from = add(c, scale(d, 1.25)),
        to = add(c, scale(d, HORIZON)),
        p = mix(from, to, f.f),
        side = unit([-d[1], d[0], 0]),
        s = 0.1;
      solid('tri', { vertices: [add(p, scale(d, s)), add(p, add(scale(d, -s * 0.5), scale(side, s * 0.87))), add(p, add(scale(d, -s * 0.5), scale(side, -s * 0.87)))], faces: [[0, 1, 2]] }, P.magenta, a, P.magenta);
      sc.line([from, to], { color: P.magenta, width: 1, dash: [3, 4], alpha: 0.6 * a * flat });
    }
  }

  /* ---------- card 5: the ring of four stations around the twelve-node atlas ---------- */
  const RING_R = 1.3,
    RING_T = 0.075,
    ATLAS_S = 0.6,
    ATLAS_Z = 0.2;
  /** The azimuth of the rotor at station value s: I front-left, then a quarter turn clockwise per station. */
  const ringAz = (s) => VIEW_AZ - 45 * DEG - 90 * DEG * s;
  const ringPoint = (s, lift = 0) => AT(ringAz(s), RING_R, RING_T + lift);
  /** A node of the atlas in the stereographic chart v/(‖q‖ + w) of S³: the scalar at the centre, a small cube, three axes. */
  const atlasAt = (q) => {
    const n = Math.sqrt(norm2(q));
    return [ATLAS_S * (q[1] / (n + q[0])), ATLAS_S * (q[2] / (n + q[0])), ATLAS_Z + ATLAS_S * (q[3] / (n + q[0]))];
  };
  function torusPts(u, v) {
    return [(RING_R + RING_T * cs(v)) * cs(u), (RING_R + RING_T * cs(v)) * sn(u), RING_T * sn(v)];
  }
  function tetra(c, s) {
    const v = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((d) => add(c, scale(d, s / Math.sqrt(3))));
    return { vertices: v, faces: [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]] };
  }
  function cube(c, h) {
    const v = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]].map((d) => add(c, scale(d, h)));
    return { vertices: v, faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] };
  }
  /** Where the object of station i stands: above the ring at its azimuth. */
  const stationAt = (i, lift = 0.22) => ringPoint(i, lift);
  function drawRing(m, a) {
    if (a < 0.01) return;
    const { exact } = weight(),
      s = m.ring.v,
      walked = 90 * DEG * s;
    // the ring: cyan where the rotor has walked (from station I clockwise), violet ahead
    sc.surface('ring' + (a < 0.99 ? '~' : ''), torusPts, {
      u: [0, TAU],
      v: [0, TAU],
      nu: 144,
      nv: 12,
      colors: [P.violet, P.cyan],
      range: [0, 1],
      value: (u) => {
        const d = (((ringAz(0) - u) % TAU) + TAU) % TAU;
        return s >= 4 - TINY ? 1 : clamp((walked - d) / 0.06, 0, 1) * (exact > 0.9 ? 1 : 0.8);
      },
      grid: { every: [12, 3], alpha: 0.18 },
      alpha: a < 0.99 ? a : 1,
      pick: false
    });
    // the twelve-node atlas at the centre: the small cube of the eight (1, ±1, ±1, ±1), the scalar, the three axes
    const pts = NODES.map(atlasAt);
    solid('atlas', cube([0, 0, ATLAS_Z], ATLAS_S / 3), P.violet, 0.3 * a, P.violet);
    RUN.edges.forEach((e) => sc.line([pts[e.a - 1], pts[e.b - 1]], { color: P.cyan, width: 1.2, alpha: 0.6 * a * exact }));
    pts.forEach((p, i) => sc.bead(p, { color: P.violet, r: 3.6, alpha: a, key: 'an' + i }));
    // the four stations
    const lit = (i) => (s >= i - TINY ? 1 : 0.45);
    {
      // I: the dawn ray, a cyan arrow up and out of the ring
      const p = ringPoint(0, 0.02),
        out = unit([p[0], p[1], 0]);
      sc.arrow(p, add(p, add(scale(out, 0.26), [0, 0, 0.42])), { color: P.cyan, width: 3, headSize: 12, alpha: a * lit(0) });
      ball('st-i', add(p, [0, 0, 0.06]), 0.07, P.cyan, a * lit(0), 10);
    }
    drawBody('st-ii', stationAt(1, 0.24), 0.2, 2, a * lit(1), { nu: 20, nv: 40 });
    solid('st-iii', tetra(stationAt(2, 0.24), 0.2), P.violet, a * lit(2), P.cyan);
    {
      // IV: the halting fixed point, a closed loop round a bead
      const c = stationAt(3, 0.24),
        out = unit([c[0], c[1], 0]),
        side = [-out[1], out[0], 0];
      tube('st-iv', sample(48, (u) => add(c, add(scale(side, 0.15 * cs(TAU * u)), [0, 0, 0.15 * sn(TAU * u)]))), P.cyan, 0.022, a * lit(3), 0.4);
      sc.bead(c, { color: P.cyan, r: 4.6, alpha: a * lit(3), key: 'st-iv-b' });
    }
    // the closing arc IV → I glows once the rotor has come back
    if (s > 3)
      tube(
        'close',
        sample(32, (u) => AT(ringAz(3 + u * (s - 3)), RING_R, RING_T * 2.2)),
        P.cyan,
        0.02,
        a * exact,
        0.6
      );
  }

  /* ---------- words ---------- */
  const LENS_NAME = [
    ['OmegaMath 观察者焦点', 'OMEGAMATH FOCUS'],
    ['配位化学与词源（MODEL）', 'COORDINATION & ETYMOLOGY (MODEL)']
  ];
  const SCENE_NAME = {
    dawn: [['破晓词根与满壳', 'DAWN ROOT & FULL SHELL'], ['Au⁰ / Au⁺ 5d¹⁰', 'Au⁰ / Au⁺ 5d¹⁰']],
    d4h: [['P<sub>occ</sub> + P<sub>LUMO</sub>', 'P<sub>occ</sub> + P<sub>LUMO</sub>'], ['Z = 79 · D<sub>4h</sub> [AuCl₄]⁻', 'Z = 79 · D<sub>4h</sub> [AuCl₄]⁻']],
    ledger: [['j = 2 四极账本', 'j = 2 LEDGER'], ['Au³⁺ 的四方四极', 'Au³⁺ TETRAGONAL QUADRUPOLE']],
    focus: [['0 · 1/2 · 1 观察者焦点', '0 · 1/2 · 1 OBSERVER FOCUS'], ['空的受体窗口（MODEL）', 'EMPTY ACCEPTOR (MODEL)']],
    ring: [['AURIC 衔尾环', 'AURIC RING'], ['从词根到停机', 'ROOT TO HALT']]
  };
  const STATION = [
    { zh: '破晓词根', en: 'dawn root', omega: ['I · 5d¹⁰ · Q = 0', 'I · 5d¹⁰ · Q = 0'], chem: ['I · *h₂ews- → aurum · Aurora', 'I · *h₂ews- → aurum · Aurora'] },
    { zh: '相对论金', en: 'relativistic gold', omega: ['II · Q = 12/7 · Q<sub>Auric</sub>', 'II · Q = 12/7 · Q<sub>Auric</sub>'], chem: ['II · Au³⁺ 5d⁸ · Z = 79', 'II · Au³⁺ 5d⁸ · Z = 79'] },
    { zh: '零公理核', en: 'zero-axiom kernel', omega: ['III · d = 3 · r = 5 · χ₂(1/5) = −19/25', 'III · d = 3 · r = 5 · χ₂(1/5) = −19/25'], chem: ['III · AURICOmega · (d, r) = (3, 5)', 'III · AURICOmega · (d, r) = (3, 5)'] },
    { zh: '停机不动点', en: 'halting fixed point', omega: ['IV · N₁₆ = 22 · b₁ = 11 · τ = 155/12', 'IV · N₁₆ = 22 · b₁ = 11 · τ = 155/12'], chem: ['IV · ObserverUniverse · 22', 'IV · ObserverUniverse · 22'] }
  ];
  const ROMAN = ['I', 'II', 'III', 'IV'];
  /** The diagonal of Q after its relation: “= (…)” when exact, “≈ (…)” on the way between whole t. */
  const qRel = (q) => (q.Q ? `= ${tuple(diagOf(q.Q))}` : `≈ (${q.Qf.map((x) => fix(x, 3)).join(', ')})`);
  const tText = (q) => (q.tQ ? `t = ${fstr(q.tQ)}` : `t ${approx(q.t, 2)}`);
  const isFull = (q) => !!q.tQ && isZero(q.tQ);
  const configOf = (q) => (q.tw === 0 ? '5d¹⁰' : q.tw === 1 ? '5d⁹' : q.tw === 2 ? '5d⁸' : q.tQ ? `5d · ${fstr(minus(whole(10), q.tQ))} e` : '5d');
  const ionOf = (q) => (q.tw === 0 ? 'Au⁺' : q.tw === 1 ? 'Au²⁺' : q.tw === 2 ? 'Au³⁺' : 'Au');
  /** The ion and its shell when t is whole, the shell alone otherwise. */
  const headOf = (q) => (q.tw != null ? `${ionOf(q)} ${configOf(q)}` : configOf(q));
  /** “1/4 个电子” / “1/4 electron”: the electrons taken, in both languages. */
  const taken = (q, say = L) => (q.tQ ? say(`${fstr(q.tQ)} 个电子`, `${fstr(q.tQ)} electron${equal(q.tQ, ONE) ? '' : 's'}`) : say(`${approx(q.t, 2).replace('≈ ', '约 ')} 个电子`, `about ${fix(q.t, 2)} electrons`));
  const kText = (l) => (l.f ? `κ ${approx(cs(l.theta / 2) ** 2, 3)}` : `κ = ${l.mark.label}`);
  const thetaText = (l) => `θ ${l.f || l.k === 3 ? '≈ ' + fix(l.theta / DEG, 2) : '= ' + Math.round(l.theta / DEG)}°`;
  const stepText = (f) => (f.f ? `${f.k} → ${f.k + 1}` : String(f.k));
  /** The live regime of the scene: the HUD line and the card note both read it. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'dawn':
        return m.dawn.tQ ? 't' + fstr(m.dawn.tQ) : 'moving';
      case 'd4h':
        return (m.d4h.tQ ? 't' + fstr(m.d4h.tQ) : 'moving') + 'r' + m.d4h.rel;
      case 'ledger':
        return (m.ledger.f ? 'moving' : 'k' + m.ledger.k) + (m.ledger.haar ? 'h' : '');
      case 'focus':
        return m.focus.f ? 'moving' : 's' + m.focus.k;
      default:
        return m.ring.f ? 'moving' : 'st' + m.ring.k;
    }
  }
  function bigline(m) {
    const s = state.scene,
      lens = state.lens;
    const key = {
      dawn: () => (isFull(m.dawn) ? 'Q = (0, 0, 0)' : `${tText(m.dawn)} · Q<sub>zz</sub> ${m.dawn.Q ? '= ' + fstr(m.dawn.Q[2][2]) : approx(m.dawn.Qf[2], 3)}`),
      d4h: () => (lens ? `${headOf(m.d4h)} · λ<sub>rel</sub> = ${m.d4h.rel}` : `${L('秩', 'rank')} 4 + 1 = 5 · ${tText(m.d4h)}`),
      ledger: () => (m.ledger.haar ? '⟨Q⟩ = (0, 0, 0)' : m.ledger.f ? kText(m.ledger) : `χ₂(${m.ledger.mark.label}) = ${fstr(m.ledger.mark.chi)}`),
      focus: () => (m.focus.f ? `${L('第 ', 'step ')}${stepText(m.focus)}${L(' 步', '')}` : `N = ${m.focus.row.N} · τ = ${fstr(m.focus.row.tau)} · b₁ = ${m.focus.row.b1}`),
      ring: () => (m.ring.f ? `${ROMAN[m.ring.k]} → ${ROMAN[(m.ring.k + 1) % 4]}` : m.ring.k >= 4 ? `IV → I · ${L('闭合', 'closed')}` : `${L('第 ', 'station ')}${ROMAN[m.ring.k]}${L(' 站', '')}`)
    }[s]();
    return `${L(...SCENE_NAME[s][lens])} · <span class="nb">${key}</span>`;
  }
  function subline(m) {
    const s = state.scene,
      tiny = small(),
      lens = state.lens;
    if (s === 'dawn') {
      const q = m.dawn,
        head = headOf(q);
      if (!q.tQ) return L(`移走${taken(q, ZH)}的路上：壳层沿 ±x、±y 凹下。`, `On the way to ${taken(q, EN)} taken: the shell dents along ±x and ±y.`);
      if (lens) {
        if (tiny) return L('aurum 与 Aurora 同出 *h₂ews-（青）；aura、auris 只是形近（紫）。', 'aurum and Aurora share *h₂ews- (cyan); aura and auris only look alike (violet).');
        return L(`aurum（金）与 Aurora（曙光）同出原始印欧语词根 *h₂ews-“破晓”，青色光线照进金里；aura（*h₂ew-“吹”）与 auris（*h₂ows-“耳”）只是拼写相近，紫色虚线停在金外。${isFull(q) ? 'Au⁺ 5d¹⁰ 是 ¹S₀ 的满壳。' : `${head}：从 5d(x² − y²) 移走${taken(q, ZH)}。`}`, `aurum (gold) and Aurora (dawn) share the Proto-Indo-European root *h₂ews- 'to dawn': the cyan beam reaches the gold; aura (*h₂ew- 'to blow') and auris (*h₂ows- 'ear') only look alike, and their violet dashed rays stop short. ${isFull(q) ? 'Au⁺ 5d¹⁰ is the full shell ¹S₀.' : `${head}: ${taken(q, EN)} taken from 5d(x² − y²).`}`);
      }
      if (isFull(q)) return tiny ? L('满壳 5d¹⁰：角向密度处处是 10，closedShell = (0, 0, 0)。', 'Full shell 5d¹⁰: density 10 everywhere, closedShell = (0, 0, 0).') : L('满壳 5d¹⁰：五条实 d 轨道都双占，角向密度处处是 10，三根轴上的青色 Q 刻度都停在中间的刻度圈：closedShell = (0, 0, 0)；静止画布 𝒮 上 Δτ = 0。', 'Full shell 5d¹⁰: all five real d orbitals doubly occupied, the angular density is 10 everywhere and the cyan Q gauges sit on the middle tick circles of the three axes: closedShell = (0, 0, 0); on the still canvas 𝒮, Δτ = 0.');
      return tiny ? `${head} · Q ${qRel(q)}` : L(`${head}：从 5d(x² − y²) 移走${taken(q, ZH)}${q.tw == null ? '（平均占据）' : ''}，壳层沿 ±x、±y 凹下，品红是被移走的部分；Q = −t·Q(x² − y²) ${qRel(q)}，迹为 0。`, `${head}: ${taken(q, EN)} taken from 5d(x² − y²)${q.tw == null ? ' (an average occupation)' : ''}; the shell dents along ±x and ±y and the magenta lobes are what left; Q = −t·Q(x² − y²) ${qRel(q)}, trace 0.`);
    }
    if (s === 'd4h') {
      const q = m.d4h;
      if (!q.tQ) return L(`t ${approx(q.t, 2)}：空窗口正在打开。`, `t ${approx(q.t, 2)}: the empty window is opening.`);
      if (lens) {
        if (tiny) return q.rel ? L('λ = 1：6s 收缩、5d 扩张，吸收边约 2.4 eV。', 'λ = 1: 6s contracts, 5d expands, edge near 2.4 eV.') : L('λ = 0：类银，吸收边在紫外（银约 3.9 eV）。', 'λ = 0: silver-like, edge in the ultraviolet (Ag near 3.9 eV).');
        return q.rel
          ? L(`相对论（λ<sub>rel</sub> = 1，Z = 79）：6s 收缩（青圈在品红虚圈之内）、5d 扩张，5d → 6s 吸收边移到约 2.4 eV 的可见光，金呈金色。平面四方 [AuCl₄]⁻（王水 HNO₃ : HCl ≈ 1 : 3 溶金）的 5d(x² − y²) 空着，指向四个 Cl⁻。`, `Relativistic (λ<sub>rel</sub> = 1, Z = 79): 6s contracts (the cyan circle inside the magenta dashed one) and 5d expands; the 5d → 6s edge moves to about 2.4 eV in the visible and gold looks golden. In square-planar [AuCl₄]⁻ (aqua regia, HNO₃ : HCl ≈ 1 : 3, dissolves gold) 5d(x² − y²) is empty and points at the four Cl⁻.`)
          : L('非相对论（λ<sub>rel</sub> = 0）：类银的画面，6s 不收缩（品红虚圈），吸收边留在紫外（银约 3.9 eV），金会像银一样白。', 'Nonrelativistic (λ<sub>rel</sub> = 0): a silver-like picture, 6s uncontracted (the magenta dashed circle), the edge stays in the ultraviolet (silver near 3.9 eV) and gold would look white like silver.');
      }
      if (tiny) return `${configOf(q)} · P<sub>occ</sub> + P<sub>LUMO</sub> = I₅`;
      return q.tw === 2
        ? L(`Au³⁺ 5d⁸：四条双占轨道张成 P<sub>occ</sub>（秩 4），空的 5d(x² − y²) 是 P<sub>LUMO</sub>（秩 1），P<sub>occ</sub> + P<sub>LUMO</sub> = I₅；品红的空窗口指向四个紫色配体，青色的轴向通道沿 ±z 打开，Q ${qRel(q)}。`, `Au³⁺ 5d⁸: the four doubly occupied orbitals span P<sub>occ</sub> (rank 4), the empty 5d(x² − y²) is P<sub>LUMO</sub> (rank 1), P<sub>occ</sub> + P<sub>LUMO</sub> = I₅; the magenta empty window points at the four violet ligands and the cyan axial channels open along ±z, Q ${qRel(q)}.`)
        : L(`${headOf(q)}：5d(x² − y²) 里还有 ${fstr(minus(whole(2), q.tQ))} 个电子，Q ${qRel(q)}；推到 t = 2 窗口全空。`, `${headOf(q)}: 5d(x² − y²) still holds ${fstr(minus(whole(2), q.tQ))} electron${equal(minus(whole(2), q.tQ), ONE) ? '' : 's'}, Q ${qRel(q)}; at t = 2 the window is empty.`);
    }
    if (s === 'ledger') {
      const l = m.ledger;
      if (l.haar) return tiny ? L('十二节点平均：⟨Q⟩ = (0, 0, 0)。', 'Twelve-node average: ⟨Q⟩ = (0, 0, 0).') : L('十二个胡尔维茨节点的旋转：紫点是十二份旋转后的对角元，每根轴的正向只落在 −4/7 与 8/7 两处（各 8 份与 4 份），平均回到中间的刻度圈，⟨Q⟩ = (0, 0, 0)；壳层只剩四阶的小起伏。', 'Rotations of the twelve Hurwitz nodes: the violet dots are the diagonal entries of the twelve rotated copies; on the plus side of each axis they fall only at −4/7 and 8/7 (8 and 4 copies), and the average is back on the middle tick circle, ⟨Q⟩ = (0, 0, 0); the shell keeps only a small ripple of order four.');
      if (l.f) return L(`转角 ${thetaText(l)}，正在走向下一个路标。`, `Turn ${thetaText(l)}, on the way to the next landmark.`);
      const lm = l.mark;
      if (tiny) return `${kText(l)} · ${thetaText(l)} · χ₂ = ${fstr(lm.chi)}`;
      const extra = equal(lm.k, frac(1n, 5n)) ? L('；六个范数 5 的生成元之和的迹 6 · (−19/25) = −114/25 = 3(−74/25) + 2(54/25)', '; the six generators of norm 5 add to trace 6 · (−19/25) = −114/25 = 3(−74/25) + 2(54/25)') : '';
      return L(`κ = ${lm.label}：绕 y 轴转 ${thetaText(l)}（cos θ = 2κ − 1 = ${fstr(lm.cosT)}），这一转在五维四极空间上的迹 χ₂(${lm.label}) = ${fstr(lm.chi)}${extra}。Q = (−4/7, −4/7, 8/7) = 12/7 · (−1/3, −1/3, 2/3)。`, `κ = ${lm.label}: a turn about y with ${thetaText(l)} (cos θ = 2κ − 1 = ${fstr(lm.cosT)}) acts on the five-dimensional quadrupole space with trace χ₂(${lm.label}) = ${fstr(lm.chi)}${extra}. Q = (−4/7, −4/7, 8/7) = 12/7 · (−1/3, −1/3, 2/3).`);
    }
    if (s === 'focus') {
      const f = m.focus,
        r = f.row;
      if (f.f) return L(`第 ${f.k} → ${f.k + 1} 步：待检的品红候选三角飞进视界 ℋ<sub>1/2</sub>（核验 d₂F = 0）；门 ${PROGRAM_TEXT[f.next.gate]} 把 N 乘上它。`, `Step ${f.k} → ${f.k + 1}: an incoming magenta candidate triangle flies into the horizon ℋ<sub>1/2</sub> (testing d₂F = 0); the gate ${PROGRAM_TEXT[f.next.gate]} multiplies N.`);
      if (lens) return L('化学读法（MODEL）：Au³⁺ 空的 5d(x² − y²) 是接受配体电子的窗口，填满的 5d(z²) 沿轴向；对照的 Au⁺ 满壳不破缺，τ ≡ 0（条带里的品红平线）。', 'Chemical reading (MODEL): the empty 5d(x² − y²) of Au³⁺ is the window that accepts ligand electrons and the filled 5d(z²) lies along the axis; the full shell of Au⁺ does not break, τ ≡ 0 (the magenta flat line of the strip).');
      if (tiny) return `${L('第 ', 'step ')}${f.k}${L(' 步', '')} · N = ${r.N} · τ = ${fstr(r.tau)}`;
      const last = f.k === STEPS ? L('22 = 2 · 11，四个分母都不整除它：停机。', '22 = 2 · 11 and none of the four denominators divides it: halt.') : r.gate >= 0 ? L(`上一步过门 ${PROGRAM_TEXT[r.gate]}。`, `The last gate was ${PROGRAM_TEXT[r.gate]}.`) : L('起点 2¹⁷。', 'The start 2¹⁷.');
      return L(`焦点沿静止沟纹滑行：赤道的空窗口是当下接收视界 ℋ<sub>1/2</sub>（κ(1) = 1/2，射流 ${tuple(JET1)}，η³ = 0）；沿 +z 的 5d(z²) 脊柱把闭合的比较（d₂F = 0 ⇔ F = d₁e）焊进记忆晶体 𝒦₀。第 ${f.k} 步：N = ${r.N}，τ = ${fstr(r.tau)}，b₁ = ${r.b1}。${last}`, `The focus glides over the still grooves: its equatorial empty window is the present receiving horizon ℋ<sub>1/2</sub> (κ(1) = 1/2, jet ${tuple(JET1)}, η³ = 0); the 5d(z²) spine along +z welds closed comparisons (d₂F = 0 ⇔ F = d₁e) into the memory crystal 𝒦₀. Step ${f.k}: N = ${r.N}, τ = ${fstr(r.tau)}, b₁ = ${r.b1}. ${last}`);
    }
    const g = m.ring;
    if (g.f) return L(`转子从第 ${ROMAN[g.k]} 站走向第 ${ROMAN[(g.k + 1) % 4]} 站。`, `The rotor moves from station ${ROMAN[g.k]} to station ${ROMAN[(g.k + 1) % 4]}.`);
    if (g.k >= 4) return L('第 IV 站回到第 I 站：停机不动点 N₁₆ = 22 的读数又回到破晓词根，环闭合，四站都点亮。', 'Station IV returns to station I: the halting fixed point N₁₆ = 22 reads back into the dawn root, the ring closes and all four stations are lit.');
    const st = STATION[g.k];
    return L(`第 ${ROMAN[g.k]} 站，${st.zh}：${st.omega[0].replace(/^[IV]+ · /, '')}。`, `Station ${ROMAN[g.k]}, the ${st.en}: ${st.omega[1].replace(/^[IV]+ · /, '')}.`);
  }
  function legendItems() {
    switch (state.scene) {
      case 'dawn':
        return [['vi', L('满壳 5d¹⁰ · 形近的词根', 'full shell 5d¹⁰ · look-alike roots')], ['cy', L('Q 刻度 · 同源词根 *h₂ews- 与它照亮的一侧', 'Q gauge · cognate root *h₂ews- and the side it lights')], ...(state.at.dawn > TINY ? [['mg', L('移走的电子', 'electrons taken')]] : []), ['am', L('当前 t', 'current t')]];
      case 'd4h':
        return [['vi', L('d 壳 · 配体', 'd shell · ligands')], ['cy', L('P<sub>occ</sub> · 轴向 5d(z²) 瓣 · 收缩的 6s', 'P<sub>occ</sub> · axial 5d(z²) lobes · contracted 6s')], ['mg', L('P<sub>LUMO</sub> 空窗口 · 非相对论 6s', 'P<sub>LUMO</sub> empty window · nonrelativistic 6s')], ['am', L('当前 t', 'current t')]];
      case 'ledger':
        return [['vi', L('转过 θ 的壳 · Q<sub>Auric</sub> 环', 'shell turned by θ · Q<sub>Auric</sub> rings')], ['cy', L('Q 刻度 · κ 路标', 'Q gauge · κ landmarks')], ['am', L('当前 κ', 'current κ')]];
      case 'focus':
        return [['vi', L('静止画布 𝒮 · 视界环', 'still canvas 𝒮 · horizon ring')], ['cy', L('沟纹 · 焊合的边 · τ 脊柱', 'grooves · welded edges · τ spine')], ['mg', L('空窗口 · 待检候选三角', 'empty window · candidate triangle')], ['am', L('当前一步', 'current step')]];
      default:
        return [['vi', L('三元环 · 十二节点图谱', 'ternion ring · twelve-node atlas')], ['cy', L('走过的弧 · 各站', 'walked arc · stations')], ['am', L('当前站', 'current station')]];
    }
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. */
  function noteOf(m) {
    const s = state.scene,
      pair = (zh, en) => [zh, en];
    if (s === 'dawn') {
      const q = m.dawn;
      if (isFull(q))
        return {
          long: pair('满壳 5d¹⁰ 是一个紫色的圆球，三根轴上的青色 Q 刻度都停在中间的刻度圈上：Q = (0, 0, 0)。地面上只有青色的 *h₂ews- 光线照进金里，紫色虚线的 aura 与 auris 停在外面。拖琥珀点把 5d(x² − y²) 的电子移走。', 'The full shell 5d¹⁰ is a round violet ball and the cyan Q gauges sit on the middle tick circles of the three axes: Q = (0, 0, 0). On the floor only the cyan *h₂ews- beam reaches the gold; the violet dashed aura and auris stop outside. Drag the amber point to take electrons from 5d(x² − y²).'),
          fig: pair('满壳 5d¹⁰ 是圆球，Q = (0, 0, 0)；只有青色的 *h₂ews- 照进金里。', 'The full shell 5d¹⁰ is round, Q = (0, 0, 0); only the cyan *h₂ews- beam reaches the gold.')
        };
      return {
        long: pair(`移走${taken(q, ZH)}：壳层沿 ±x、±y 凹下，品红波瓣是被移走的部分；青色刻度沿 z 向外、沿 x、y 向里，Q ${qRel(q)}。`, `${taken(q, EN)} taken: the shell dents along ±x and ±y, the magenta lobes are what left; the cyan gauges move out along z and in along x and y, Q ${qRel(q)}.`),
        fig: pair(`移走${taken(q, ZH)}：Q ${qRel(q)}。`, `${taken(q, EN)} taken: Q ${qRel(q)}.`)
      };
    }
    if (s === 'd4h') {
      const q = m.d4h;
      return {
        long: pair(`四个紫色配体在 ±x、±y，品红的空窗口 5d(x² − y²) 正对它们（秩 1），其余四条填满的轨道（秩 4）在 ±z 留出青色通道；${q.rel ? '青色的 6s 圈缩在品红虚圈之内' : '6s 停在品红虚圈（非相对论）'}。`, `Four violet ligands sit on ±x and ±y, the magenta empty window 5d(x² − y²) faces them (rank 1), and the four filled orbitals (rank 4) leave cyan channels along ±z; ${q.rel ? 'the cyan 6s circle lies inside the magenta dashed one' : '6s stays on the magenta dashed circle (nonrelativistic)'}.`),
        fig: pair('品红的空窗口正对四个配体：秩 4 + 1 = 5。', 'The magenta empty window faces the four ligands: rank 4 + 1 = 5.')
      };
    }
    if (s === 'ledger') {
      const l = m.ledger;
      if (l.haar)
        return {
          long: pair('十二份旋转后的对角元（紫点）在每根轴上只落两处，它们的平均（青点）回到中间的刻度圈：⟨Q⟩ = (0, 0, 0)。', 'The diagonal entries of the twelve rotated copies (violet dots) fall at two places on each axis, and their average (cyan) is back on the middle tick circle: ⟨Q⟩ = (0, 0, 0).'),
          fig: pair('十二节点平均后，青色刻度回到中间：⟨Q⟩ = (0, 0, 0)。', 'After the twelve-node average the cyan gauge is back in the middle: ⟨Q⟩ = (0, 0, 0).')
        };
      return {
        long: pair(`青色刻度给出 Q = (−4/7, −4/7, 8/7)，紫环是 Q<sub>Auric</sub> = (−1/3, −1/3, 2/3)，比值 12/7。紫色箭头把长轴绕 y 转过 θ，琥珀点在 ${kText(l)}：χ₂ = ${l.f ? '…' : fstr(l.mark.chi)}。`, `The cyan gauge gives Q = (−4/7, −4/7, 8/7), the violet rings Q<sub>Auric</sub> = (−1/3, −1/3, 2/3), ratio 12/7. The violet arrow turns the long axis about y by θ; the amber point is at ${kText(l)}: χ₂ = ${l.f ? '…' : fstr(l.mark.chi)}.`),
        fig: pair(`琥珀点在 ${kText(l)}：χ₂ = ${l.f ? '…' : fstr(l.mark.chi)}；Q = 12/7 · (−1/3, −1/3, 2/3)。`, `The amber point is at ${kText(l)}: χ₂ = ${l.f ? '…' : fstr(l.mark.chi)}; Q = 12/7 · (−1/3, −1/3, 2/3).`)
      };
    }
    if (s === 'focus') {
      const r = m.focus.row;
      return {
        long: pair(`焦点沿青色沟纹的轨迹滑向中心；紫色的视界环 ℋ<sub>1/2</sub> 围着赤道的品红空窗口，青色脊柱上的记忆晶体 𝒦₀ 随 τ 长高，琥珀是这一步焊上的边。第 ${m.focus.k} 步：N = ${r.N}、τ = ${fstr(r.tau)}、b₁ = ${r.b1}。`, `The focus glides along its cyan track to the centre; the violet horizon ring ℋ<sub>1/2</sub> circles the magenta empty window at its equator, and the memory crystal 𝒦₀ on the cyan spine grows with τ, amber for the edges welded at this step. Step ${m.focus.k}: N = ${r.N}, τ = ${fstr(r.tau)}, b₁ = ${r.b1}.`),
        fig: pair(`第 ${m.focus.k} 步：N = ${r.N}，τ = ${fstr(r.tau)}，b₁ = ${r.b1}。`, `Step ${m.focus.k}: N = ${r.N}, τ = ${fstr(r.tau)}, b₁ = ${r.b1}.`)
      };
    }
    const g = m.ring;
    return {
      long: pair(`紫色的三元环围着中央的十二节点图谱；转子从第 I 站顺时针走，走过的弧变青。${g.k >= 4 ? '第 IV 站回到第 I 站，整环点亮。' : `现在在第 ${ROMAN[g.k]} 站。`}`, `The violet ternion ring circles the twelve-node atlas at the centre; the rotor walks clockwise from station I and the walked arc turns cyan. ${g.k >= 4 ? 'Station IV returns to station I and the whole ring is lit.' : `Now at station ${ROMAN[g.k]}.`}`),
      fig: pair(g.k >= 4 ? 'IV 回到 I：整环点亮，衔尾闭合。' : `第 ${ROMAN[g.k]} 站。`, g.k >= 4 ? 'IV returns to I: the whole ring is lit and closed.' : `Station ${ROMAN[g.k]}.`)
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      tiny = small(),
      chem = state.lens === 1;
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'dawn') {
      const q = m.dawn;
      const words = {
        cog: chem ? '*h₂ews- → aurum · Aurora' : 'aurum · Aurora',
        aura: chem ? '*h₂ew- → αὔρα · aura' : 'aura',
        auris: chem ? '*h₂ows- → auris' : 'auris'
      };
      for (const r of ROOTS) N('root-' + r.key, off(rootTip(r), 0, 16), words[r.key], r.cog ? 'c-cy' : 'c-vi');
      N('qz', off([0, 0, 0.95 + 0.3 * q.Qf[2]], 34, 10), isFull(q) ? 'Q = (0, 0, 0)' : `Q<sub>zz</sub> ${q.Q ? '= ' + fstr(q.Q[2][2]) : approx(q.Qf[2], 3)}`, 'c-cy');
      if (!tiny) N('canvas', off(AT(VIEW_AZ + 115 * DEG, 1.5, FLOOR), 0, -14), chem ? `${headOf(q)}${q.tw === 0 ? ' · ¹S₀' : ''}` : '𝒮 · Δτ = 0', 'c-vi');
      N('tdial', off(tDial(q.t), 0, -20), tText(q), 'c-am');
    }
    if (s === 'd4h') {
      const q = m.d4h;
      if (chem) {
        LIGANDS.forEach((p, i) => {
          if (dot(unit(p), cam.D) > -0.35 || i === 0) N('lig' + i, off(p, 0, 16), 'Cl⁻', 'c-vi');
        });
        N('z79', off([0, 0, 1.42], 0, 16), `Z = 79 · ${q.rel ? '6s ↓ · 5d ↑' : 'λ = 0'}`, 'c-cy');
        if (!tiny) N('aqua', off(AT(VIEW_AZ + 100 * DEG, 1.25, -0.62), 0, 0), 'HNO₃ : HCl ≈ 1 : 3 → [AuCl₄]⁻', 'c-ik');
      } else {
        N('pocc', off([0, 0, 1.42], 0, 16), `P<sub>occ</sub> · ${L('秩', 'rank')} 4`, 'c-cy');
        if (q.t > 0.5) N('plumo', off(scale(unit(LIGANDS[2]), R_MAIN * 1.12), 40, 10), `P<sub>LUMO</sub> · ${L('秩', 'rank')} 1`, 'c-mg');
        if (!tiny) N('i5', off([0, 0, -1.42], 0, -16), 'I₅ = P<sub>occ</sub> + P<sub>LUMO</sub>', 'c-ik');
      }
      N('tdial', off(tDial(q.t), 0, -20), tText(q), 'c-am');
    }
    if (s === 'ledger') {
      const l = m.ledger;
      N('qz', off([0, 0, G0 + G1 * (l.haar ? 0 : DELETED_F[2])], 40, 0), l.haar ? '⟨Q⟩ = 0' : 'Q<sub>zz</sub> = 8/7', 'c-cy');
      if (!tiny && !l.haar) N('qa', off([0, 0, G0 + G1 * AURIC_F[2]], -46, 0), `2/3 · 12/7 = 8/7`, 'c-vi');
      N('kdial', off(kDial(l.theta), 34, 12), l.f ? kText(l) : `κ = ${l.mark.label} · χ₂ = ${fstr(l.mark.chi)}`, 'c-am');
      if (!tiny) N('j2', off(kDial(PI), 0, -18), chem ? 'Au³⁺ 5d⁸ · D<sub>4h</sub>' : 'j = 2 · dim 5', 'c-vi');
    }
    if (s === 'focus') {
      const f = m.focus,
        c = pathAt(f.v);
      N('hor', off(add(c, scale(cam.R, -HORIZON)), -10, 8), chem ? 'LUMO 5d(x² − y²)' : 'ℋ<sub>1/2</sub> · κ(1) = 1/2', chem ? 'c-mg' : 'c-vi');
      N('kry', off([c[0], c[1], spineZ(lerp(fval(f.row.tau), fval(f.next.tau), f.f))], 30, 8), chem ? '5d(z²)' : `1 ↦ 0 · 𝒦₀ · b₁ = ${f.row.b1}`, 'c-cy');
      if (!tiny) N('canvas', off(AT(VIEW_AZ + 120 * DEG, 1.42, CANVAS_Z), 0, -12), '𝒮 · Δτ = 0', 'c-vi');
      if (f.f && f.k < STEPS) N('tri', off(add(c, scale(inDir(f.k), lerp(1.25, HORIZON, f.f))), 0, 16), L('待检 F · d₂F = 0?', 'incoming F · d₂F = 0?'), 'c-mg');
      else if (!tiny) N('nval', off(add(c, [0, 0, -R_FOCUS]), 0, -16), `N = ${f.row.N}`, 'c-ik');
    }
    if (s === 'ring') {
      const g = m.ring;
      for (let i = 0; i < 4; i++) {
        const p = stationAt(i, 0.5),
          html = L(...STATION[i][chem ? 'chem' : 'omega']),
          now = !g.f && (g.k === i || (g.k >= 4 && i === 0));
        if (tiny && !now) {
          N('st' + i, off(p, 0, 10), ROMAN[i], 'c-cy');
          continue;
        }
        N('st' + i, off(p, 0, 10), html, now ? 'c-am' : 'c-cy');
      }
      if (!tiny) N('atlas', off([0, 0, ATLAS_Z + ATLAS_S], 0, 16), chem ? 'Hurwitz · 12' : L('十二节点图谱', 'twelve-node atlas'), 'c-vi');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈≥]) −?\d[\d./]*/g, '<span class="nb">$&</span>').replace(/‖|ℚ/g, '<span class="nm">$&</span>');
  const ACTS = {
    dawn: ['换 t ▸', 'Next t ▸'],
    d4h: ['切换 λ<sub>rel</sub> ▸', 'Toggle λ<sub>rel</sub> ▸'],
    ledger: ['十二节点旋转平均', 'Twelve-node average'],
    focus: ['下一步 ▸', 'Next step ▸'],
    ring: ['下一站 ▸', 'Next station ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems()
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      html = state.scene === 'ledger' ? L(`十二节点旋转平均：${state.haar ? '开' : '关'}`, `Twelve-node average: ${state.haar ? 'on' : 'off'}`) : L(...ACTS[state.scene]);
    b.hidden = TRV.still;
    if (b.innerHTML !== html) b.innerHTML = html;
    if (state.scene === 'ledger') b.setAttribute('aria-pressed', String(state.haar));
    else b.removeAttribute('aria-pressed');
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
  const around = (pts) =>
    pts.reduce(
      (b, p) => {
        const x = dot(p, cam.R),
          y = dot(p, cam.U);
        return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
      },
      [Infinity, -Infinity, Infinity, -Infinity]
    );
  const grow = ([x0, x1, y0, y1], d) => [x0 - d, x1 + d, y0 - d, y1 + d];
  const rim = (c, r, n = 16) => range(n).map((k) => add(c, [r * cs((TAU * k) / n), r * sn((TAU * k) / n), 0]));
  const axes = (len) => range(3).flatMap((k) => [1, -1].map((s) => scale(range(3).map((i) => (i === k ? 1 : 0)), len * s)));
  const SIDE = {
    dawn: () => grow(around([...rim([0, 0, FLOOR], 1.52, 24), ...axes(1.32)]), 0.06),
    d4h: () => grow(around([...rim([0, 0, FLOOR], DIAL_R, 12), ...rim(C0, LIG + LIG_R, 16), ...axes(1.44)]), 0.06),
    ledger: () => grow(around([...sample(16, (u) => kDial(u * PI)), ...axes(1.38)]), 0.06),
    focus: () => grow(around([...rim([0, 0, CANVAS_Z], 1.42, 24), ...sample(15, (u) => pathAt(u * STEPS)).map((p) => [p[0], p[1], spineZ(TAU_MAX) + 0.05])]), 0.06),
    ring: () => grow(around([...rim([0, 0, 0], RING_R + RING_T, 24), ...rim([0, 0, 0.72], RING_R, 12), [0, 0, ATLAS_Z + ATLAS_S + 0.1]]), 0.06)
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
    const key = [state.scene, state.lens, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k]()]),
      total = boxes.reduce((s, [k]) => s + k, 0) || 1,
      [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + (k / total) * b[i], 0));
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- the stage ---------- */
  /** The world point of the amber mark for a rail value v of the present scene. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'dawn':
      case 'd4h':
        return tDial(v / 4);
      case 'ledger': {
        const k = Math.min(Math.floor(v + TINY), 4),
          f = clamp(v - k, 0, 1);
        return kDial(lerp(LANDMARKS[k].theta, LANDMARKS[Math.min(k + 1, 4)].theta, f));
      }
      case 'focus':
        return pathAt(v);
      default:
        return ringPoint(v, 0.03);
    }
  }
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(w);
    sc.begin();
    drawDawn(m, w.dawn);
    drawD4h(m, w.d4h);
    drawLedger(m, w.ledger);
    drawFocus(m, w.focus);
    drawRing(m, w.ring);
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

  /* ---------- the strip ---------- */
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
      need = 9 + ROW * (rows - 1) + 22,
      share = clamp(need / ih, 0.3, 0.75);
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
        } else if (kind === 'box') {
          ctx.fillRect(x + 2, y - 4, 10, 8);
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
      px = g.X(x) + dx,
      top = g.Y(Math.max(y, lo)),
      bottom = g.Y(Math.min(y, lo));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(px - width / 2, Math.min(top, bottom), width, Math.max(1, abs(bottom - top)));
    ctx.restore();
  }
  /** One strip plot: the legend items, the ranges and the drawing. */
  function strip(cv, items, x, lo, hi, axesOpt, draw) {
    const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
    const g = kit.plot(cv, { x, y: [lo, headroom(cv, PAD, rows.length, lo, hi)], pad: PAD });
    g.axes(axesOpt);
    draw(g);
    drawLegend(g, rows);
  }
  const ORB_LABEL = ['z²', 'xz', 'yz', 'xy', 'x²−y²'];
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot'),
      s = state.scene;
    if (!cv.clientWidth || !cv.clientHeight) return;
    const narrow = cv.clientWidth < 300;
    if (s === 'dawn') {
      const q = m.dawn;
      $('plotTitle').textContent = L('五条实 d 轨道的四极矩之和为 0', 'The five real d orbitals add to zero quadrupole');
      $('plotMeta').textContent = tText(q);
      const groups = [...ORBS.map((k) => diagOf(ORB[k].Q).map(fval)), [0, 0, 0], q.Qf];
      strip(cv, [[P.cyan, 'Qxx', 'box'], [P.violet, 'Qyy', 'box'], [P.ink, 'Qzz', 'box']], [-0.6, 6.6], -1.25, 1.25, { xTicks: [...ORB_LABEL.map((l, i) => [i, narrow && i === 4 ? 'x²' : l]), [5, 'Σ'], [6, q.tQ ? `t = ${fstr(q.tQ)}` : 't']], yTicks: [[-8 / 7, '−8/7'], [0, '0'], [8 / 7, '8/7']] }, (g) => {
        const bw = Math.max(3, Math.min(9, g.iw / 30));
        g.line([[-0.6, 0], [6.6, 0]], P.dim, { width: 1 });
        groups.forEach((d, i) => d.forEach((v, k) => bar(g, i, v, 0, [P.cyan, P.violet, P.ink][k], bw, (k - 1) * (bw + 2), i === 6 ? 1 : 0.85)));
        // the sum: a cyan ring on 0 for each entry
        for (let k = 0; k < 3; k++) g.dot(5 + ((k - 1) * (bw + 2)) / g.scale, 0, P.cyan, 3, { ring: true });
        g.line([[5.55, -1.2], [5.55, 1.2]], P.dim, { width: 1, dash: [2, 3] });
        g.line([[6 - 0.42, -1.18], [6 + 0.42, -1.18]], P.amber, { width: 3 });
      });
    } else if (s === 'd4h') {
      const q = m.d4h,
        lam = q.rel;
      $('plotTitle').textContent = L('5d → 6s 吸收边（eV）与 D4h 能级（示意）', 'The 5d → 6s edge (eV) and the D4h levels (schematic)');
      $('plotMeta').textContent = `λ = ${lam}`;
      strip(cv, [[P.magenta, L('银 / 非相对论', 'Ag / nonrelativistic'), 'dash'], [P.cyan, L('金 Z = 79', 'Au Z = 79')], [P.violet, L('可见光', 'visible'), 'box']], [0, 4.2], 0, 4.4, { xTicks: [[0.75, 'λ = 0'], [1.85, 'λ = 1'], [3.25, 'D4h']], yTicks: [[0, '0'], [2.4, '2.4'], [3.9, '3.9']] }, (g) => {
        // the visible band 1.65–3.26 eV behind the two columns
        g.poly([[0.25, 1.65], [2.35, 1.65], [2.35, 3.26], [0.25, 3.26]], P.violet, { alpha: 0.12 });
        const col = (x, e, color, dash, now) => {
          g.line([[x - 0.35, 0], [x + 0.35, 0]], P.violet, { width: 3 });
          g.line([[x - 0.35, e], [x + 0.35, e]], color, { width: 2.4, dash });
          g.arrow([x, 0.08], [x, e - 0.06], { color, width: 1.8, headSize: 8, dash });
          g.text(x + 0.38, e, `${e} eV`, color, { align: 'left', size: 10 });
          if (now) g.line([[x - 0.42, -0.12], [x + 0.42, -0.12]], P.amber, { width: 3 });
        };
        col(0.75, 3.9, P.magenta, [5, 4], lam === 0);
        col(1.85, 2.4, P.cyan, null, lam === 1);
        if (!narrow) g.text(2.23, 1.2, '6s↓ 5d↑', P.cyan, { size: 10 });
        // D4h levels of 5d⁸ (schematic): four filled levels low, the empty x² − y² far above
        const lv = [[0.7, 'xz yz'], [1.05, 'z²'], [1.4, 'xy']],
          x = 3.25;
        g.line([[x - 0.3, lv[0][0]], [x - 0.04, lv[0][0]]], P.cyan, { width: 2.4 });
        g.line([[x + 0.04, lv[0][0]], [x + 0.3, lv[0][0]]], P.cyan, { width: 2.4 });
        for (const [y] of lv.slice(1)) g.line([[x - 0.3, y], [x + 0.3, y]], P.cyan, { width: 2.4 });
        g.line([[x - 0.3, 3.4], [x + 0.3, 3.4]], P.magenta, { width: 2.4, dash: [4, 3] });
        if (!narrow) {
          g.text(x + 0.36, 3.4, 'x²−y²', P.magenta, { size: 10 });
          g.text(x + 0.36, 1.05, L('填满 ×4', 'filled ×4'), P.cyan, { size: 10 });
        }
      });
    } else if (s === 'ledger') {
      const l = m.ledger;
      $('plotTitle').textContent = L('自旋 2 的特征 χ₂(κ) = 16κ² − 12κ + 1', 'The spin-two character χ₂(κ) = 16κ² − 12κ + 1');
      $('plotMeta').textContent = l.f ? '…' : `χ₂(${l.mark.label}) = ${fstr(l.mark.chi)}`;
      strip(cv, [[P.cyan, 'χ₂(κ)'], [P.cyan, L('有理路标', 'rational landmarks'), 'dot'], [P.amber, L('当前 κ', 'current κ'), 'dot']], [-0.04, 1.04], -1.6, 5.4, { xTicks: [[0, '0'], [0.25, '1/4'], [0.5, '1/2'], [1, '1']], yTicks: [[-1, '−1'], [5, '5']] }, (g) => {
        g.line([[-0.04, 0], [1.04, 0]], P.dim, { width: 1 });
        g.line(sample(80, (u) => [u, 16 * u * u - 12 * u + 1]), P.cyan, { width: 2 });
        LANDMARKS.forEach((lm) => g.dot(fval(lm.k), fval(lm.chi), P.cyan, 3.4));
        const kk = l.f ? cs(l.theta / 2) ** 2 : fval(l.mark.k);
        g.dot(kk, 16 * kk * kk - 12 * kk + 1, P.amber, 5);
        if (!l.f && !narrow) g.text(fval(l.mark.k) + (fval(l.mark.k) > 0.8 ? -0.03 : 0.03), fval(l.mark.chi) + 1.1, `χ₂(${l.mark.label}) = ${fstr(l.mark.chi)}`, P.amber, { align: fval(l.mark.k) > 0.8 ? 'right' : 'left', size: 10 });
      });
    } else if (s === 'focus') {
      const f = m.focus;
      $('plotTitle').textContent = L('pOmega 十五步：结构时间 τ 与环秩 b₁', 'pOmega over fifteen steps: structural time τ and loop rank b₁');
      $('plotMeta').textContent = `N = ${f.row.N}`;
      strip(cv, [[P.cyan, 'τ'], [P.violet, 'b₁', 'dash'], [P.magenta, L('Au⁺ 满壳 τ ≡ 0', 'Au⁺ full shell τ ≡ 0')]], [-0.4, STEPS + 0.4], 0, 13.5, { xTicks: [[0, '0'], [5, '5'], [10, '10'], [15, '15']], yTicks: [[0, '0'], [11, '11']] }, (g) => {
        const steps = (key) => RUN.rows.flatMap((r, i) => (i ? [[r.k - 0.5, key(RUN.rows[i - 1])], [r.k - 0.5, key(r)]] : [[-0.4, key(r)]])).concat([[STEPS + 0.4, key(FINAL)]]);
        g.line([[-0.4, 0.04], [STEPS + 0.4, 0.04]], P.magenta, { width: 2 });
        g.line(steps((r) => fval(r.tau)), P.cyan, { width: 2 });
        g.line(steps((r) => r.b1), P.violet, { width: 1.6, dash: [5, 4] });
        g.line([[f.v, 0], [f.v, 13.5]], P.amber, { width: 1.2 });
        if (!narrow) g.text(STEPS - 0.6, fval(FINAL.tau) + 1.3, `τ = ${fstr(FINAL.tau)} · b₁ = ${FINAL.b1}`, P.cyan, { align: 'right', size: 10 });
      });
    } else {
      const r = m.ring;
      $('plotTitle').textContent = L('四站的有理不变量', 'The rational invariants of the four stations');
      $('plotMeta').textContent = r.k >= 4 ? 'IV → I' : ROMAN[r.k];
      const g = kit.plot(cv, { x: [0, 4], y: [0, 4], pad: [8, 8, 8, 8] });
      const rowsText = [
        ['*h₂ews-', 'aurum · Aurora', 'Q = 0'],
        ['Au³⁺ 5d⁸', `Q_{zz} = ${fstr(DELETED[2][2])}`, '12/7 · Q_{Auric}'],
        ['d = 3 · r = 5', `χ₂(1/5) = ${fstr(chi2(frac(1n, 5n)))}`, `6χ₂ = ${fstr(HECKE.trace)}`],
        [`${FR.steps} → ${FR.states[FR.steps]}`, `b₁ = ${FINAL.b1}`, `τ = ${fstr(FINAL.tau)}`]
      ];
      const size = narrow ? 9 : cv.clientWidth < 420 ? 9.5 : 10.5;
      rowsText.forEach((lines, i) => {
        const cx = i + 0.5,
          now = !r.f && (r.k === i || (r.k >= 4 && i === 0)),
          walked = r.v >= i - TINY;
        g.poly([[i + 0.05, 0.1], [i + 0.95, 0.1], [i + 0.95, 3.9], [i + 0.05, 3.9]], walked ? P.cyan : P.violet, { alpha: walked ? 0.1 : 0.06, stroke: now ? P.amber : walked ? P.cyan : P.violet, strokeAlpha: now ? 1 : 0.5, width: now ? 2 : 1 });
        g.text(cx, 3.35, ROMAN[i], now ? P.amber : walked ? P.cyan : P.violet, { align: 'center', size: size + 1.5, face: 'display' });
        lines.forEach((t, j) => g.text(cx, 2.45 - j * 0.75, t, P.ink, { align: 'center', size }));
      });
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    switch (state.scene) {
      case 'dawn':
        return L('五条实 d 轨道的 Q 之和为 0（fullShell），所以满壳 closedShell = 2·fullShell = 0；从一条轨道移走 t 个电子后 Q = −t·Q(该轨道)。', 'The five real d orbitals add to Q = 0 (fullShell), so the full shell closedShell = 2·fullShell = 0; with t electrons taken from one orbital, Q = −t·Q(that orbital).');
      case 'd4h':
        return L(`P<sub>occ</sub> = I₅ − P<sub>LUMO</sub>：P² = P、PP<sup>⊥</sup> = 0 与 P + P<sup>⊥</sup> = I₅ 在五维有理矩阵上逐项成立 ${PROJ.ok ? '（核对无误）' : '（核对失败）'}。`, `P<sub>occ</sub> = I₅ − P<sub>LUMO</sub>: P² = P, PP<sup>⊥</sup> = 0 and P + P<sup>⊥</sup> = I₅ hold entry by entry on the rational 5 × 5 matrices ${PROJ.ok ? '(checked)' : '(check failed)'}.`);
      case 'ledger':
        return L(`六个范数 5 的生成元之和在五维四极空间上：迹 ${fstr(HECKE.trace)}，特征值 ${HECKE.levels.map((l) => `${fstr(l.lam)}（${l.mult} 重）`).join('、')}。`, `The sum of the six generators of norm 5 on the five-dimensional quadrupole space: trace ${fstr(HECKE.trace)}, eigenvalues ${HECKE.levels.map((l) => `${fstr(l.lam)} (multiplicity ${l.mult})`).join(' and ')}.`);
      case 'focus':
        return L(`程序 [${PROGRAM_TEXT.join(', ')}] 每步取第一个能整除的分数；22 = 2 · 11 不被 49、25、9、4 整除，所以停机。`, `The program [${PROGRAM_TEXT.join(', ')}] takes the first fraction that divides at every step; 22 = 2 · 11 is divisible by none of 49, 25, 9, 4, so it halts.`);
      default:
        return L('四站各守一个有理不变量；第 IV 站的读数回到第 I 站，环闭合。', 'Each station keeps a rational invariant; station IV reads back into station I and the ring closes.');
    }
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      s = state.scene,
      tq = s === 'dawn' ? m.dawn : m.d4h,
      l = m.ledger,
      f = m.focus,
      g = m.ring;
    const key = {
      dawn: isFull(tq) ? 'Q = (0, 0, 0) · Δτ = 0' : `Q ${qRel(tq)}`,
      d4h: state.lens ? `${tq.rel ? '≈ 2.4' : '≈ 3.9'} eV · ${configOf(tq)}` : `P<sub>occ</sub> + P<sub>LUMO</sub> = I₅`,
      ledger: l.haar ? '⟨Q⟩ = (0, 0, 0)' : `χ₂(1/5) = −19/25 · 6χ₂ = ${fstr(HECKE.trace)}`,
      focus: `N = ${f.row.N} · τ = ${fstr(f.row.tau)} · b₁ = ${f.row.b1}`,
      ring: g.k >= 4 ? `IV → I · ${L('闭合', 'closed')}` : `${ROMAN[g.k]} · ${L(STATION[g.k].zh, STATION[g.k].en)}`
    }[s];
    put('roKey', key);
    put('roKeySub', ` · ${L(...SCENE_NAME[s][state.lens])}`);
    put('roShell', `${tText(tq)} · ${(tq.Q ? diagOf(tq.Q).map(fstr) : tq.Qf.map((x) => approx(x, 3))).join(' · ')} · 0`);
    put('roProj', `${PROJ.rankOcc} · ${PROJ.rankLumo} · ${PROJ.sum ? '= I₅' : '≠ I₅'}`);
    put('roChar', `${kText(l)} · ${thetaText(l)} · ${l.f ? '…' : fstr(l.mark.chi)} · ${l.f ? '…' : fstr(times(whole(6), l.mark.chi))}`);
    put('roFocus', `${stepText(f)} · ${f.row.N} · ${fstr(f.row.tau)} · ${f.row.b1}`);
    put('roRing', g.k >= 4 ? `IV → I · N₁₆ = ${FR.states[FR.steps]} → *h₂ews-` : `${ROMAN[g.k]} · ${STATION[g.k].omega[0].replace(/^[IV]+ · /, '')}`);
    put('roNote', readNote(m));
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[s][state.lens]).replace(/ ?[（(]MODEL[）)]/, '')}</strong>`);
    put('keyPill', `Q<sub>zz</sub> <strong>${s === 'ledger' || s === 'focus' || s === 'ring' ? fstr(DELETED[2][2]) : tq.Q ? fstr(tq.Q[2][2]) : approx(tq.Qf[2], 3)}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = {
      dawn: 'Q<sub>ab</sub> = ⟨3n<sub>a</sub>n<sub>b</sub> − δ<sub>ab</sub>⟩ · Σ<sub>o</sub> Q(o) = 0',
      d4h: 'P<sub>occ</sub> + P<sub>LUMO</sub> = I₅ · P<sub>occ</sub>P<sub>LUMO</sub> = 0',
      ledger: 'χ₂(κ) = 16κ² − 12κ + 1 · κ = cos²(θ/2)',
      focus: `[${PROGRAM_TEXT.join(', ')}] · τ = Σ(ΔI + Δb₁)`,
      ring: 'I → II → III → IV → I'
    }[s];
    for (const id of ['lens', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    tChips.set(tq.tw == null ? null : String(tq.tw), true);   // the chips name the whole t only
    relChips.set(String(state.rel), true);
    kappaChips.set(l.f ? null : String(l.k), true);
    $('haarBtn').setAttribute('aria-pressed', String(state.haar));
    $('stepRange').value = String(Math.round(f.v));
    put('stepOut', `= ${Math.round(f.v)}`);
    stationChips.set(g.f ? null : String(g.k), true);
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
  }, [stage, $('plot')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  const rail = () => RAILS[state.scene];
  function settled(v) {
    const back = Math.round(v);
    return abs(v - back) < TINY ? back : v;
  }
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.dawn.rate,
    step: 1,
    max: RAILS.dawn.max,
    t: STILL.dawn,
    format: (t) => {
      const v = settled(t),
        { k, f } = split(v);
      switch (state.scene) {
        case 'dawn':
        case 'd4h':
          return Number.isInteger(v) ? `t = ${fstr(frac(BigInt(v), 4n))}` : `t ${approx(v / 4, 2)}`;
        case 'ledger':
          return f > 0 ? `κ ${LANDMARKS[k].label} → ${LANDMARKS[Math.min(k + 1, 4)].label}` : `κ = ${LANDMARKS[Math.min(k, 4)].label}`;
        case 'focus':
          return f > 0 ? `${k} → ${k + 1}` : `${L('步', 'step')} ${k} · N = ${FR.states[Math.min(k, STEPS)]}`;
        default:
          return f > 0 ? `${ROMAN[k]} → ${ROMAN[(k + 1) % 4]}` : k >= 4 ? 'IV → I' : ROMAN[k];
      }
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a rail that counts comes to rest on a whole number
      if (!c.playing && abs(t - Math.round(t)) > TINY) {
        c.set(Math.round(t));
        return;
      }
      state.at[state.scene] = settled(t);
      // a card plays from its start up to its still and parks there; a step button plays one step
      if (stopAt != null && c.playing && t >= stopAt - TINY) {
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
  const tScene = () => (state.scene === 'dawn' ? 'dawn' : 'd4h');
  const tChips = kit.chips($('tChips'), 't', (v) => steer(tScene(), () => clock.set(4 * Number(v))));
  const relChips = kit.chips($('relChips'), 'rel', (v) => steer('d4h', () => (state.rel = Number(v))));
  const kappaChips = kit.chips($('kappaChips'), 'k', (v) => steer('ledger', () => clock.set(Number(v))));
  const toggleHaar = () => steer('ledger', () => (state.haar = !state.haar));
  $('haarBtn').addEventListener('click', toggleHaar);
  kit.field($('stepRange'), { out: $('stepOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('focus', () => clock.set(Math.round(v))) });
  const stationChips = kit.chips($('stationChips'), 'st', (v) => steer('ring', () => clock.set(Number(v))));
  /** One step forward on the rail of the card, from the start again once the rail has ended. */
  function nextStep() {
    stopBootPlay();
    clock.pause();
    const k = Math.round(state.at[state.scene]),
      end = rail().max;
    if (k >= end) clock.set(0);
    stopAt = (k >= end ? 0 : k) + 1;
    clock.play();
  }
  /** The next whole t: 0 → 1 → 2 → 0. */
  const nextT = () => {
    const k = Math.floor(state.at[state.scene] / 4 + TINY);
    steer(tScene(), () => clock.set(k >= 2 ? 0 : 4 * (k + 1)));
  };
  const toggleRel = () => steer('d4h', () => (state.rel = state.rel ? 0 : 1));
  $('stageAct').addEventListener('click', () => ({ dawn: nextT, d4h: toggleRel, ledger: toggleHaar, focus: nextStep, ring: nextStep })[state.scene]());
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = CAMI[v] == null ? 'panorama' : v;
    aim(600);
    paint();
  });
  // the lens renames the picture and keeps the state; the switch in the right column and its mirror in the tour bar
  // (narrow pages and embeds) both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lens', 'lensMirror']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards ---------- */
  const CARD_OF = Object.fromEntries(Object.entries(PRESETS).map(([id, p]) => [p.scene, id]));
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay();
    stopAt = null;
    clock.pause();
    Object.assign(state, FRESH, { at: { ...STILL } });
    // a still, a reader who asked for reduced motion and a freshly opened page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting || !p.play;
    if (!parked) state.at[p.scene] = 0;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    aim(600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    } else if (booting && p.play && TRV.embed && !TRV.still && !TRV.reduceMotion) bootAutoplay(p.still);
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
        d = hypot(p[0] - x, p[1] - y) + abs(clock.t - k) * 0.0001;
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
    const unsoldGrid = range(24).flatMap((i) => range(48).map((j) => sphereAt((PI * (i + 0.5)) / 24, (TAU * j) / 48)));
    const fn = { z2: ([x, y, z]) => 2 * z * z - x * x - y * y, xz: ([x, , z]) => x * z, yz: ([, y, z]) => y * z, xy: ([x, y]) => x * y, x2y2: ([x, y]) => x * x - y * y };
    const unsold = unsoldGrid.reduce((worst, n) => Math.max(worst, abs(ORBS.reduce((s, k) => s + fn[k](n) ** 2 / fval(ORB[k].N), 0) - 5)), 0);
    const key = (R) => JSON.stringify(R, bigText),
      keys = new Set(ROTS.map(key));
    let groupBad = 0;
    for (const A of ROTS) for (const B of ROTS) if (!keys.has(key(matN(A, B)))) groupBad++;
    const avg = unsoldGrid.map((n) => rhoAvg(2, n));
    return {
      fullZero: diagOf(FULL).every(isZero) && FULL.flat().every(isZero),
      closedZero: CLOSED.flat().every(isZero),
      deleted: diagOf(DELETED),
      ratioOk: diagOf(DELETED).every((v, i) => equal(v, times(RATIO, Q_AURIC[i]))),
      traceZero: isZero(traceOf(DELETED)),
      landmarks: LANDMARKS.map((l) => ({ k: l.label, chi: l.chi, ok: equal(l.chi, l.chiE) && equal(l.chi, l.trace) })),
      hecke: HECKE,
      s5: S5,
      haar: HAAR,
      cores: DOUBLED.map(norm2),
      groupBad,
      products: ROTS.length ** 2,
      avgZero: AVG_DELETED.flat().every(isZero),
      ripple: [Math.min(...avg), Math.max(...avg)],
      unsold,
      gram: GRAM,
      jet: JET1,
      jetOk: JET_OK,
      cubeZero: ETA_CUBE.every(isZero),
      absorb: ABSORB,
      cob: COB,
      fr: FR,
      final: FINAL,
      proj: PROJ
    };
  }
  const BENCH = benchmarks();
  const bad = (say, n) => say(`不符 ${n} 处`, `${n} failures`);
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    full: () => (BENCH.fullZero ? '= 0' : '≠ 0'),
    closed: () => (BENCH.closedZero ? '= (0, 0, 0)' : '≠ 0'),
    deleted: () => tuple(BENCH.deleted),
    proj: () => (BENCH.proj.ok ? `${L('秩', 'rank')} ${BENCH.proj.rankOcc} + ${BENCH.proj.rankLumo}` : '≠'),
    chi: () => BENCH.landmarks.map((l) => fstr(l.chi)).join(', '),
    hecke: () => `= ${fstr(HECKE.trace)}`,
    haar: () => (BENCH.avgZero ? '(0, 0, 0)' : '≠ 0'),
    steps: () => String(FR.steps),
    n16: () => String(FR.states[FR.steps]),
    tau: () => fstr(FINAL.tau),
    b1: () => String(FINAL.b1),
    jet: () => tuple(JET1)
  };
  /** The text of the NUM box. */
  function numText(say) {
    const B = BENCH,
      okLand = B.landmarks.filter((l) => l.ok).length,
      list = (xs) => xs.join(say('、', ', '));
    return say(
      `打开页面时由脚本用整数与分数现算，是上面各条定理与文献结果的个别实例，不检验定理的前提。5d 壳：五条轨道按单位球面矩算出的 Q 之和 ${B.fullZero ? '为 0' : '不为 0'}，满壳 ${B.closedZero ? '为 0' : '不为 0'}，去掉 5d(x² − y²) 得 ${tuple(B.deleted)}，迹 ${B.traceZero ? '为 0' : '不为 0'}，与 12/7 · (−1/3, −1/3, 2/3) ${B.ratioOk ? '相同' : '不同'}；P<sub>occ</sub>、P<sub>LUMO</sub> 的秩 ${B.proj.rankOcc}、${B.proj.rankLumo}，五条投影恒等式 ${B.proj.ok ? '都成立' : '有不成立'}。χ₂ 在五个路标上由多项式、递推与有理旋转（(1, 0, 0, 0)、(1, 1, 0, 0)、(1, 1, 1, 1)、(1, 2, 0, 0)、(0, 1, 0, 0)）的五维迹三种算法核对 ${okLand}/5 一致，取值 ${list(B.landmarks.map((l) => fstr(l.chi)))}；六个生成元的模方 ${list(HECKE.norms.map(String))}、κ ${list(HECKE.kappas.map(fstr))}，其和的迹 ${fstr(HECKE.trace)}，特征值 ${list(HECKE.levels.map((l) => `${fstr(l.lam)} × ${l.mult}`))}，最小多项式 ${HECKE.minimal ? '成立' : '不成立'}；a(n)/5ⁿ 与 E(1/5, n)（n ≤ 6）${S5.ok ? '一致' : '不一致'}：${list(S5.rep.slice(1).map(fstr))}。偶特征 E₀ … E₆ 的哈尔期望 ${list(B.haar.map(fstr))}。十二个胡尔维茨核的二倍坐标模方 ${list([...new Set(B.cores)].map(String))}，${B.products} 个乘积的群封闭${bad(say, B.groupBad)}，对 5d⁸ 的旋转平均 ${B.avgZero ? '= (0, 0, 0)' : '≠ 0'}；平均后的密度在 ${fix(B.ripple[0], 3)} 与 ${fix(B.ripple[1], 3)} 之间起伏（四阶部分，浮点）；满壳密度离 5 最远 ${B.unsold < 0.000001 ? '小于百万分之一' : fix(B.unsold, 6)}（浮点）。detGram3(1, pHalf, qHalf) = ${fstr(B.gram)}；kappaJetAt(1) = ${tuple(B.jet)}${B.jetOk ? '，与 ⟨2, 2, 1⟩ 相乘得 1' : ''}；η³ ${B.cubeZero ? '= 0' : '≠ 0'}；triad(x, x, z) 与 z 同射线 ${B.absorb.ok}/${B.absorb.total}。四点上的 d₂(d₁e) 在 ${B.cob.total} 个四元组上非零 ${B.cob.closed} 处，改动一面后非零 ${B.cob.defect} 处。pOmega 从 131072 走 ${B.fr.steps} 步到 ${B.fr.states[B.fr.steps]}，${B.fr.halts ? '停机' : '未停'}，与 Lean 列出的十五个状态 ${B.fr.matches ? '一致' : '不一致'}；图谱 |V| = ${B.final.V}、|E| = ${B.final.E}、b₁ = ${B.final.b1}、τ = ${fstr(B.final.tau)}。数值演示，不是证明。`,
      `Computed in integers and fractions by the script when the page opens, single instances of the theorems and literature results above; it does not check their hypotheses. The 5d shell: the five Q computed from the moments of the unit sphere add to ${B.fullZero ? '0' : 'a nonzero matrix'}, the full shell gives ${B.closedZero ? '0' : 'a nonzero matrix'}, without 5d(x² − y²) the shell gives ${tuple(B.deleted)} with trace ${B.traceZero ? '0' : 'not 0'}, ${B.ratioOk ? 'equal to' : 'different from'} 12/7 · (−1/3, −1/3, 2/3); P<sub>occ</sub> and P<sub>LUMO</sub> have ranks ${B.proj.rankOcc} and ${B.proj.rankLumo}, and the five projection identities ${B.proj.ok ? 'all hold' : 'do not all hold'}. χ₂ at the five landmarks agrees ${okLand}/5 among three computations, the polynomial, the recursion and the five-dimensional trace of the rational rotations (1, 0, 0, 0), (1, 1, 0, 0), (1, 1, 1, 1), (1, 2, 0, 0), (0, 1, 0, 0), with values ${list(B.landmarks.map((l) => fstr(l.chi)))}; the six generators have squared norms ${list(HECKE.norms.map(String))} and κ ${list(HECKE.kappas.map(fstr))}, their sum has trace ${fstr(HECKE.trace)} and eigenvalues ${list(HECKE.levels.map((l) => `${fstr(l.lam)} × ${l.mult}`))}, the minimal polynomial ${HECKE.minimal ? 'holds' : 'fails'}; a(n)/5ⁿ ${S5.ok ? 'agrees' : 'disagrees'} with E(1/5, n) for n ≤ 6: ${list(S5.rep.slice(1).map(fstr))}. The Haar expectations of the even characters E₀ … E₆ are ${list(B.haar.map(fstr))}. The doubled coordinates of the twelve Hurwitz cores have squared norm ${list([...new Set(B.cores)].map(String))}; closure of the ${B.products} products, ${bad(say, B.groupBad)}; the rotation average of 5d⁸ ${B.avgZero ? '= (0, 0, 0)' : 'is not 0'}; after the average the density ripples between ${fix(B.ripple[0], 3)} and ${fix(B.ripple[1], 3)} (the part of order four, floating point); the full-shell density is ${B.unsold < 0.000001 ? 'within one part in a million of' : fix(B.unsold, 6) + ' away from'} 5 (floating point). detGram3(1, pHalf, qHalf) = ${fstr(B.gram)}; kappaJetAt(1) = ${tuple(B.jet)}${B.jetOk ? ', which times ⟨2, 2, 1⟩ is 1' : ''}; η³ ${B.cubeZero ? '= 0' : '≠ 0'}; triad(x, x, z) on the ray of z in ${B.absorb.ok}/${B.absorb.total} samples. On four points d₂(d₁e) is nonzero on ${B.cob.closed} of the ${B.cob.total} quadruples, and on ${B.cob.defect} after one face is changed. pOmega walks ${B.fr.steps} steps from 131072 to ${B.fr.states[B.fr.steps]}, ${B.fr.halts ? 'halts' : 'runs on'}, and ${B.fr.matches ? 'agrees' : 'disagrees'} with the fifteen states the Lean theorem lists; the atlas has |V| = ${B.final.V}, |E| = ${B.final.E}, b₁ = ${B.final.b1}, τ = ${fstr(B.final.tau)}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = kept(numText(say));
  const fillBench = () => {
    for (const el of document.querySelectorAll('[data-bench]')) el.innerHTML = kept(NUMBERS[el.dataset.bench]());
  };
  fillBench();
  // the drawer repeats every evidence box of the panel, filled
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(() => {
    fillBench();
    paint();
  });
  // the first frames may be set in a fallback font: measure the title afresh once the fonts are in
  if (document.fonts)
    document.fonts.ready.then(() => {
      title.key = '';
      paint();
    });

  /* ---------- probe, cover, start ---------- */
  /** Big integers as strings, so that the probe survives JSON. */
  const plain = (x) => JSON.parse(JSON.stringify(x, bigText));
  const snapshot = () => {
    const m = calc();
    return plain({
      scene: state.scene,
      at: state.at,
      regime: regimeOf(m),
      rel: state.rel,
      t: { dawn: m.dawn.t, d4h: m.d4h.t, dawnQ: m.dawn.tQ, d4hQ: m.d4h.tQ },
      Q: { dawn: m.dawn.Q ? diagOf(m.dawn.Q) : null, d4h: m.d4h.Q ? diagOf(m.d4h.Q) : null, deleted: diagOf(DELETED), auric: Q_AURIC, ratio: RATIO },
      kappa: m.ledger.f ? null : { k: m.ledger.mark.k, chi: m.ledger.mark.chi, theta: m.ledger.theta },
      haarAvg: state.haar ? diagOf(AVG_DELETED) : null,
      focus: { step: m.focus.k, moving: m.focus.f > 0, N: m.focus.row.N, tau: m.focus.row.tau, b1: m.focus.row.b1, V: m.focus.row.V, E: m.focus.row.E },
      ring: { station: m.ring.k, moving: m.ring.f > 0 },
      layers: layers(),
      clock: clock.t,
      max: clock.max,
      playing: clock.playing,
      blending: !!(state.from && state.blend < 1),
      camera: { ...sc.cam },
      hud: { big: $('hudBig').textContent, sub: $('hudSub').textContent }
    });
  };
  const DEBUG = {};
  const getters = {
    preset: () => cards.current || null,
    lens: () => (state.lens ? 'chem' : 'omega'),
    lang: () => (TRV.lang ? TRV.lang() : document.documentElement.dataset.lang || 'zh'),
    tRemoved: () => (state.scene === 'dawn' ? state.at.dawn : state.at.d4h) / 4,
    haarAvg: () => state.haar,
    kappaStop: () => {
      const l = calc().ledger;
      return l.f ? null : l.mark.label;
    },
    omegaStep: () => state.at.focus,
    stateSnapshot: snapshot,
    /** The mathematics of the page, without touching it. */
    math: () =>
      plain({
        orbitals: Object.fromEntries(ORBS.map((k) => [k, diagOf(ORB[k].Q)])),
        full: diagOf(FULL),
        closed: diagOf(CLOSED),
        deleted: diagOf(DELETED),
        auric: Q_AURIC,
        landmarks: LANDMARKS.map((l) => ({ k: l.k, chi: l.chi, trace: l.trace, q: l.q })),
        hecke: { trace: HECKE.trace, levels: HECKE.levels },
        traces: S5.rep,
        haar: HAAR,
        cores: DOUBLED,
        rotated: ROTATED.map(diagOf),
        average: diagOf(AVG_DELETED),
        jet: JET1,
        cube: ETA_CUBE,
        gram: GRAM,
        program: PROGRAM_TEXT,
        states: FR.states,
        atlas: RUN.rows.map((r) => ({ k: r.k, V: r.V, E: r.E, b1: r.b1, dI: r.dI, tau: r.tau, N: r.N })),
        projections: PROJ,
        cochains: COB
      }),
    presets: () => plain(PRESETS),
    /** Viewport coordinates of the amber handle at the rail value v of the present card, for drag targets. */
    dragTarget: () => viewportPoint
  };
  for (const [k, get] of Object.entries(getters)) Object.defineProperty(DEBUG, k, { get, enumerable: true });
  window.AURIC_DEBUG = Object.freeze(DEBUG);
  window.TRV_THUMB = () => {
    cards.pick('relativistic-z79-d4h-lumo-window');
    clock.pause();
    clock.set(STILL.d4h);
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
