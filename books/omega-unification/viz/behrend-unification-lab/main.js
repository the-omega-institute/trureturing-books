/* OMEGA//UNIFY · OMEGA 统一交互实验室 · the Omega Unification laboratory (Chapters 1, 7, 12, 13, 14)
   One object, the 19-point Behrend shell x² + y² + z² = 867 = 3·17², read five ways:
     shell   (kit.solid) the shell turned so that the pole (17, 17, 17) is on top: the pole and six orbits of the cyclic
             shift of coordinates, the chord arcs d² = 12, 244, 724, 804, and the current triad with its Gram
             determinant det G₃ = det(a, b, c)²/867³ and its signed solid angle Ω; the rail is the dual-clock time t,
             and the clock beads sit at the fractions φ/2π of the 724 and 804 arcs, (φ₁, φ₂) = t·(θ₇₂₄ − θ₂₄₄, θ₈₀₄ − θ₂₄₄);
     gap     (2D) the spectra of the magnetic Laplacians H_q(φ₁, φ₂), q ∈ {1, 2, −3, −4, 6}, block by block in the three
             characters of the cyclic shift; the amber spectral cut Λ and the site-variance cut T; the rail is t;
     bands   (2D) the three height bands of the certificates and the bracket of 2³⁵F₇ from six input cells, computed
             exactly in big-integer fractions; the rail is the number of input bits;
     ladder  (2D) the winding ladder of the certificates and the m-th winding term W_m of the 529 triangles near the
             zero phases; the rail is m;
     memory  (2D) the local memory rank against the chord cutoff D and the chords d² ≤ D, projected along the pole;
             the rail is D.
   Exact numbers are reduced fractions [p, q] of big integers; spectra and drawings use doubles.
   Read-only probe: window.BUL_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI;
  const cs = Math.cos,
    sn = Math.sin,
    abs = Math.abs,
    hypot = Math.hypot;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => {
    const n = norm(a);
    return n > 0 ? scale(a, 1 / n) : a.slice();
  };
  const fix = (x, d = 3) => kit.fix(x, d);
  const minus1 = (s) => String(s).replace('-', '−');

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
    TWO = [2n, 1n];
  const plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d),
    over = ([a, b], [c, d]) => frac(a * d, b * c),
    neg = ([a, b]) => [-a, b];
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const sumF = (xs) => xs.reduce(plus, ZERO);
  const floorF = ([p, q]) => (p >= 0n ? p / q : -((-p + q - 1n) / q));
  const fval = ([p, q]) => Number(p) / Number(q);
  const fstr = ([p, q]) => minus1(String(p)) + (q === 1n ? '' : '/' + q);
  const sub1 = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  /** 1.234 × 10⁻¹² */
  const sci = (x, d = 3) => {
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(abs(x))),
      m = x / 10 ** e;
    return `${fix(m, d)} × 10${String(e).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])}`;
  };
  const group3 = (s) => String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  /* ---------- 1. the shell: every positive integer point of x² + y² + z² = 867 ---------- */
  const R = 867,
    R2 = 2 * R,
    SQR = Math.sqrt(R);
  const lex = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  const same3 = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  const found = [];
  for (let x = 0; x * x <= R; x++)
    for (let y = 0; x * x + y * y <= R; y++) {
      const r = R - x * x - y * y,
        z = Math.round(Math.sqrt(r));
      if (z * z === r) found.push([x, y, z]);
    }
  const permsOf = (t) => {
    const out = new Map();
    for (const [i, j, k] of [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0]
    ])
      out.set([t[i], t[j], t[k]].join(), [t[i], t[j], t[k]]);
    return [...out.values()].sort(lex);
  };
  const OUTER = permsOf([1, 5, 29]),
    INNER = permsOf([13, 13, 23]);
  const inList = (list, p) => list.some((q) => same3(q, p));
  // the order of the replay repository: the outer permutations of (1, 5, 29), the inner orbit of (13, 13, 23), the rest
  const SITES = [...OUTER, ...INNER, ...found.filter((p) => !inList(OUTER, p) && !inList(INNER, p)).sort(lex)];
  const N = SITES.length;
  if (found.length !== 19 || N !== 19 || !SITES.every((p) => p.every((v) => v > 0))) throw new Error('x² + y² + z² = 867 must have exactly 19 positive points');
  const POLE = SITES.findIndex((p) => same3(p, [17, 17, 17]));
  const idxOf = (p) => SITES.findIndex((q) => same3(q, p));
  const rot = (p) => [p[1], p[2], p[0]];
  const SHIFT = SITES.map((p) => idxOf(rot(p)));
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const det3 = (a, b, c) => a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
  const sumOf = (p) => p[0] + p[1] + p[2];
  /** The six orbits of the cyclic shift (x, y, z) ↦ (y, z, x), ring by ring from the pole, each from its least member. */
  const ORBITS = [];
  {
    const seen = new Set([POLE]);
    const order = range(N).sort((a, b) => sumOf(SITES[b]) - sumOf(SITES[a]) || lex(SITES[a], SITES[b]));
    for (const i of order) {
      if (seen.has(i)) continue;
      const o = [i, SHIFT[i], SHIFT[SHIFT[i]]];
      o.forEach((k) => seen.add(k));
      ORBITS.push(o);
    }
  }
  if (ORBITS.length !== 6 || !ORBITS.every((o) => new Set(o).size === 3)) throw new Error('the shell must be a pole and six orbits of three');
  const ORBIT_OF = range(N).map((i) => ORBITS.findIndex((o) => o.includes(i)));
  const chord = (i, j) => 2 * (R - dot3(SITES[i], SITES[j]));
  const PAIRS = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) PAIRS.push({ i, j, d: chord(i, j) });
  const CLASSES = [...new Set(PAIRS.map((p) => p.d))].sort((a, b) => a - b);
  const theta = (d) => Math.acos(1 - d / R2);
  const A1 = theta(724) - theta(244),
    A2 = theta(804) - theta(244);
  /** The link phase of an edge: the argument of R(R + p·x + x·y + y·p) − i√R det(p, x, y), p the pole, and π more on d² = 200. */
  function zArg(i, j, d) {
    const p = SITES[POLE],
      x = SITES[i],
      y = SITES[j];
    return Math.atan2(-SQR * det3(p, x, y), R * (R + dot3(p, x) + dot3(x, y) + dot3(y, p))) + (d === 200 ? PI : 0);
  }
  const EDGES = PAIRS.filter((p) => p.d <= 804).map((p) => ({ ...p, arg: zArg(p.i, p.j, p.d), spoke: p.i === POLE || p.j === POLE, clock: p.d === 724 ? 1 : p.d === 804 ? 2 : 0 }));
  const EDGE_AT = new Map(EDGES.map((e) => [e.i * N + e.j, e]));
  const edgeOf = (i, j) => EDGE_AT.get(Math.min(i, j) * N + Math.max(i, j)) || null;
  const DEG = range(N).map((i) => EDGES.filter((e) => e.i === i || e.j === i).length);
  /** Triangles of the edge graph, with the unit-charge holonomy c + n₁φ₁ + n₂φ₂ (spokes carry no phase). */
  const TRIANGLES = [];
  for (let i = 0; i < N; i++)
    for (let j = i + 1; j < N; j++)
      for (let k = j + 1; k < N; k++) {
        const a = edgeOf(i, j),
          b = edgeOf(j, k),
          c = edgeOf(i, k);
        if (!a || !b || !c) continue;
        const base = (e) => (e.spoke ? 0 : e.arg),
          n = (e, w) => (e.clock === w && !e.spoke ? 1 : 0);
        TRIANGLES.push({ t: [i, j, k], c: base(a) + base(b) - base(c), n1: n(a, 1) + n(b, 1) - n(c, 1), n2: n(a, 2) + n(b, 2) - n(c, 2) });
      }
  const WCLASSES = new Map();
  for (const T of TRIANGLES) {
    const k = `${T.n1},${T.n2}`;
    if (!WCLASSES.has(k)) WCLASSES.set(k, { n1: T.n1, n2: T.n2, list: [] });
    WCLASSES.get(k).list.push(T);
  }
  /** The world frame of the drawing: the pole on top. */
  const E1 = [1 / Math.SQRT2, -1 / Math.SQRT2, 0],
    E2 = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)],
    E3 = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
  const WORLD = SITES.map((p) => [dot(p, E1), dot(p, E2), dot(p, E3)].map((v) => v / SQR));
  const ptName = (i) => `(${SITES[i].join(', ')})`;
  const orbitName = (k) => `O${sub1(k + 1)}`;

  /** det G₃, B, κ, chords and the signed solid angle of a triad of shell points, all exact but the angle. */
  function triadOf(tr) {
    const [a, b, c] = tr.map((i) => SITES[i]),
      ab = dot3(a, b),
      bc = dot3(b, c),
      ca = dot3(c, a),
      dt = det3(a, b, c),
      RR = BigInt(R);
    const detG = frac(BigInt(dt) ** 2n, RR ** 3n),
      B = frac(BigInt(ab) * BigInt(bc) * BigInt(ca), RR ** 3n),
      kap = [ab, bc, ca].map((x) => frac(BigInt(x) ** 2n, RR ** 2n)),
      gram = minus(plus(ONE, times(TWO, B)), sumF(kap)),
      omega = 2 * Math.atan2(dt, SQR * (R + ab + bc + ca));
    const chords = [chord(tr[0], tr[1]), chord(tr[1], tr[2]), chord(tr[2], tr[0])];
    // the link phase of the Laplacian is the Bargmann phase of (pole, i, j): arg z = −Ω(pole, i, j)/2, π more on d² = 200
    let link = null;
    if (tr[0] === POLE && tr[1] !== POLE && tr[2] !== POLE) {
      const e = edgeOf(tr[1], tr[2]);
      if (e) {
        const half = (-omega / 2) * (tr[1] < tr[2] ? 1 : -1) + (e.d === 200 ? PI : 0),
          wrap = (x) => Math.atan2(sn(x), cs(x));
        link = { d: e.d, arg: e.arg, half, gap: abs(wrap(e.arg - half)) };
      }
    }
    return { tr: tr.slice(), dot: [ab, bc, ca], det: dt, detG, B, kap, gram, omega, chords, link, orbits: tr.map((i) => ORBIT_OF[i]) };
  }

  /* ---------- 2. the magnetic Laplacian H_q(φ₁, φ₂), block by block in the characters of the cyclic shift ---------- */
  const CHARGES = [1, 2, -3, -4, 6];
  const LIGHT = 8.685,
    HEAVY = 9.6;
  /** Eigenvalues of a real symmetric n × n matrix (cyclic Jacobi), ascending. */
  function jacobi(a, n) {
    const A = Float64Array.from(a);
    for (let sweep = 0; sweep < 80; sweep++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p * n + q] * A[p * n + q];
      if (off < 1e-28) break;
      for (let p = 0; p < n - 1; p++)
        for (let q = p + 1; q < n; q++) {
          const apq = A[p * n + q];
          if (abs(apq) < 1e-300) continue;
          const th = (A[q * n + q] - A[p * n + p]) / (2 * apq),
            t = (th >= 0 ? 1 : -1) / (abs(th) + Math.sqrt(th * th + 1)),
            c = 1 / Math.sqrt(t * t + 1),
            s = t * c;
          for (let k = 0; k < n; k++) {
            const akp = A[k * n + p],
              akq = A[k * n + q];
            A[k * n + p] = c * akp - s * akq;
            A[k * n + q] = s * akp + c * akq;
          }
          for (let k = 0; k < n; k++) {
            const apk = A[p * n + k],
              aqk = A[q * n + k];
            A[p * n + k] = c * apk - s * aqk;
            A[q * n + k] = s * apk + c * aqk;
          }
        }
    }
    return range(n)
      .map((k) => A[k * n + k])
      .sort((x, y) => x - y);
  }
  /** The basis of the character ω^j of the cyclic shift: the pole (j = 0) and Σ_r ω^{−jr} e_{C^r s}/√3 for each orbit. */
  const BASES = [0, 1, 2].map((j) => {
    const out = j === 0 ? [[[POLE, 1, 0]]] : [];
    for (const o of ORBITS) out.push(o.map((s, r) => [s, cs((-TAU * j * r) / 3) / Math.sqrt(3), sn((-TAU * j * r) / 3) / Math.sqrt(3)]));
    return out;
  });
  /** H_q(φ₁, φ₂): degree on the diagonal, −1 on a spoke, −(z e^{iφ})^q on the other edges (φ = φ₁ on d² = 724, φ₂ on 804). */
  function laplacian(q, f1, f2) {
    const re = new Float64Array(N * N),
      im = new Float64Array(N * N);
    for (const e of EDGES) {
      const ang = e.spoke ? 0 : q * (e.arg + (e.clock === 1 ? f1 : e.clock === 2 ? f2 : 0)),
        vr = -cs(ang),
        vi = -sn(ang);
      re[e.i * N + e.i] += 1;
      re[e.j * N + e.j] += 1;
      re[e.i * N + e.j] = vr;
      im[e.i * N + e.j] = vi;
      re[e.j * N + e.i] = vr;
      im[e.j * N + e.i] = -vi;
    }
    return { re, im };
  }
  const specCache = new Map();
  /** The spectrum of H_q(φ₁, φ₂): the eigenvalues of each character block, and all 19 with their characters. */
  function spectrum(q, f1, f2) {
    const key = `${q}|${f1.toFixed(10)}|${f2.toFixed(10)}`;
    if (specCache.has(key)) return specCache.get(key);
    const H = laplacian(q, f1, f2),
      blocks = BASES.map((basis) => {
        const n = basis.length,
          M = new Float64Array(4 * n * n);
        for (let a = 0; a < n; a++)
          for (let b = 0; b < n; b++) {
            let sr = 0,
              si = 0;
            for (const [s, ar, ai] of basis[a])
              for (const [t, br, bi] of basis[b]) {
                const hr = H.re[s * N + t],
                  hi = H.im[s * N + t];
                // conj(u_a) · h · u_b
                const xr = hr * br - hi * bi,
                  xi = hr * bi + hi * br;
                sr += ar * xr + ai * xi;
                si += ar * xi - ai * xr;
              }
            const m = 2 * n;
            M[a * m + b] = sr;
            M[(a + n) * m + (b + n)] = sr;
            M[(a + n) * m + b] = si;
            M[a * m + (b + n)] = -si;
          }
        return jacobi(M, 2 * n).filter((_, k) => k % 2 === 0);
      });
    const modes = blocks.flatMap((vals, j) => vals.map((v) => ({ v, j }))).sort((x, y) => x.v - y.v);
    const out = { q, blocks, modes, values: modes.map((m) => m.v) };
    if (specCache.size > 6000) specCache.clear();
    specCache.set(key, out);
    return out;
  }
  /** The site-variance cut: the least, over the sites, of the sum of squared moduli of the off-diagonal entries. */
  function siteVariance(q, f1, f2) {
    const H = laplacian(q, f1, f2);
    return Math.min(...range(N).map((i) => range(N).reduce((s, j) => (j === i ? s : s + H.re[i * N + j] ** 2 + H.im[i * N + j] ** 2), 0)));
  }
  const SITE_T = Math.round(siteVariance(1, 0, 0) * 1e9) / 1e9;
  const CHAR = ['1', 'ω', 'ω²'];

  /* ---------- 3. the seventh time: six input cells, a bracket of 2³⁵F₇ in exact fractions ---------- */
  const DEPTH = 288n;
  // the levels n_j of F_j ∈ [n_j, n_j + 1]/2²⁸⁸, j = 1 … 7, of the replay data; the sixth carries the offset 1.360900010 × 10⁻⁸
  const LEVELS = [
    '496526204166806104809146132915362806115122482516082300210006834237629213805746677697001',
    '494171507489744981785351311956014103521800517946248284662406570684193699469657759672828',
    '490363540191561505304286528547580650130232508108412817068335362165688288136181926052571',
    '485261478348426035025710356147107376941747088629703660696398841275842415959560345150890',
    '479060809233957382407700584728896225226649623008097105483710682086089494741280524277747',
    '471973518785576699632971905817097725166221865858123666694233207794827643188964080668909',
    '464210376851985475367065625841913378623082606729478038833802607555794041585955213462114'
  ].map(BigInt);
  const OFFSET6 = frac(136090001n, 10n ** 16n);
  const TWO288 = 1n << DEPTH;
  const XS = range(6).map((k) => plus([LEVELS[k], TWO288], k === 5 ? OFFSET6 : ZERO));
  const C0 = 32071996606n;
  const REF_CODE = LEVELS[6] >> (DEPTH - 35n);
  const SLOPES = [3n, 8n, 15n, 24n, 35n].map((s) => [s, 1n]);
  const denomD = (y) => SLOPES.reduce((acc, s) => times(acc, plus(ONE, times(s, y))), ONE);
  const kernelN = (y) => times(minus(ONE, y), denomD(y));
  /** The multipliers of the certificate: H/D = c₀ + c₁(1 − y) + Σ_j c_j (1 − y)/(1 + (j² − 1)y), with
      H = [N − QP]/(1 + 48y), P = (y − e)∏(y − rᵢ)², Q = N(−1/48)/P(−1/48) < 0. */
  function multipliers(endpoint, nums) {
    const nodes = nums.map((v) => [BigInt(v), 10n ** 9n]),
      nodal = (y) => nodes.reduce((acc, r) => times(acc, times(minus(y, r), minus(y, r))), minus(y, endpoint)),
      pole = [-1n, 48n],
      coeff = over(kernelN(pole), nodal(pole)),
      interp = (y) => over(minus(kernelN(y), times(coeff, nodal(y))), plus(ONE, times([48n, 1n], y))),
      constant = over(interp(ONE), denomD(ONE)),
      residues = SLOPES.map((s) => {
        const t = neg(over(ONE, s)),
          rest = SLOPES.filter((x) => x !== s).reduce((acc, x) => times(acc, plus(ONE, times(x, t))), ONE);
        return over(interp(t), times(minus(ONE, t), rest));
      });
    return { coeff, list: [constant, minus(minus(interp(ZERO), constant), sumF(residues)), ...residues] };
  }
  const LOWER = multipliers(ONE, [15, 1212594, 4902081]),
    UPPER = multipliers(ZERO, [1212564, 4902077, 997741029]);
  const boundOf = (m, cells, upper) => m.list.slice(1).reduce((total, c, k) => plus(total, times(c, (cmp(c, ZERO) > 0) === upper ? cells[k][1] : cells[k][0])), m.list[0]);
  const T35 = [1n << 35n, 1n];
  function bracketOf(cells) {
    const lo = boundOf(LOWER, cells, false),
      hi = boundOf(UPPER, cells, true),
      lo35 = times(lo, T35),
      hi35 = times(hi, T35),
      cLo = floorF(lo35),
      cHi = floorF(hi35);
    return { lo, hi, cLo, cHi, span: Number(cHi - cLo) + 1, rLo: fval(minus(lo35, [C0, 1n])), rHi: fval(minus(hi35, [C0, 1n])), width: fval(minus(hi, lo)), rel: fval(over(minus(hi, lo), lo)) };
  }
  const BITS0 = 36,
    BITS1 = 52;
  const BRACKETS = new Map();
  for (let b = BITS0; b <= BITS1; b++) {
    const den = 1n << BigInt(b),
      codes = XS.map((x) => floorF(times(x, [den, 1n]))),
      cells = codes.map((n) => [[n, den], [n + 1n, den]]);
    BRACKETS.set(b, { bits: b, codes, ...bracketOf(cells.map(([lo, hi]) => [frac(...lo), frac(...hi)])) });
  }
  const EXACT = bracketOf(XS.map((x, k) => [x, plus(x, [1n, TWO288])]));
  const BANDS = [
    { lo: 3.8e10, hi: 4.5e10, arith: [23.4396, 23.4415], flavor: [23.517, 23.5695], show: '23.44%' },
    { lo: 7e10, hi: 1e11, arith: [37.3874, 37.4041], flavor: [37.3504, 37.4095], show: '37.4%' },
    { lo: 1e12, hi: Infinity, arith: [39.0879, 39.1568], flavor: [39.0067, 39.0759], show: '39.1%' }
  ];
  const S_RESP = 0.00208104,
    RESP = [1.0020816770805, 1.0020816771057];

  /* ---------- 4. the winding ladder (certificates) and the m-th winding term of the 529 triangles ---------- */
  const STEPS = [
    { m: 18, level: 0 },
    { m: 19, level: 1 },
    { m: 21, level: 2 },
    { m: 27, level: 3 },
    { m: 31, level: 4 },
    { m: 36, level: 5 },
    { m: 105, level: 6 }
  ];
  const LEVEL_NAMES = [
    ['三窗内无驻点', 'no critical point in the three windows'],
    ['三窗内鞍点', 'a saddle in the three windows'],
    ['三窗内严格局部极小', 'a strict local minimum in the three windows'],
    ['合窗全局最低', 'a global minimum in the windows'],
    ['参考味局部极小', 'a local minimum with the reference flavour'],
    ['逐高度全局味真空', 'a global flavour vacuum, height by height'],
    ['固定权重跨高度参考味真空', 'fixed-weight flavour vacuum for all heights']
  ];
  const M0 = 14,
    MMAX = 110;
  const levelAt = (m) => STEPS.reduce((lv, s) => (m >= s.m ? s.level : lv), 0);
  // the drawing of the m axis: the thresholds evenly spaced, linear in m between them
  const MANCHOR = [
    [M0, -0.6],
    [18, 0],
    [19, 1],
    [21, 2],
    [27, 3],
    [31, 4],
    [36, 5],
    [105, 6],
    [MMAX, 6.45]
  ];
  const mx = (m) => {
    for (let k = 1; k < MANCHOR.length; k++) {
      const [a, xa] = MANCHOR[k - 1],
        [b, xb] = MANCHOR[k];
      if (m <= b) return xa + ((xb - xa) * (m - a)) / (b - a);
    }
    return MANCHOR[MANCHOR.length - 1][1];
  };
  const mOfX = (x) => {
    for (let k = 1; k < MANCHOR.length; k++) {
      const [a, xa] = MANCHOR[k - 1],
        [b, xb] = MANCHOR[k];
      if (x <= xb) return a + ((b - a) * (x - xa)) / (xb - xa);
    }
    return MMAX;
  };
  const WIN = 0.3,
    BOX = TAU / 32,
    GRID = 80;
  /** W_m(φ₁, φ₂) = Σ_T cos(m(c_T + n₁φ₁ + n₂φ₂))/529, through the seven classes (n₁, n₂). */
  function wTerms(m) {
    return [...WCLASSES.values()].map((K) => {
      let re = 0,
        im = 0;
      for (const T of K.list) {
        re += cs(m * T.c);
        im += sn(m * T.c);
      }
      return { n1: K.n1, n2: K.n2, re, im, count: K.list.length };
    });
  }
  const wAt = (terms, m, f1, f2) => terms.reduce((s, K) => s + K.re * cs(m * (K.n1 * f1 + K.n2 * f2)) - K.im * sn(m * (K.n1 * f1 + K.n2 * f2)), 0) / TRIANGLES.length;
  const wCache = new Map();
  function wField(m) {
    if (wCache.has(m)) return wCache.get(m);
    const terms = wTerms(m),
      vals = new Float64Array(GRID * GRID);
    let lo = Infinity,
      hi = -Infinity,
      boxLo = Infinity,
      boxHi = -Infinity,
      sum = 0;
    for (let a = 0; a < GRID; a++)
      for (let b = 0; b < GRID; b++) {
        const f1 = -WIN + ((2 * WIN) * (a + 0.5)) / GRID,
          f2 = -WIN + ((2 * WIN) * (b + 0.5)) / GRID,
          v = wAt(terms, m, f1, f2);
        vals[b * GRID + a] = v;
        sum += v;
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
        if (abs(f1) <= BOX && abs(f2) <= BOX) {
          boxLo = Math.min(boxLo, v);
          boxHi = Math.max(boxHi, v);
        }
      }
    const out = { m, terms, vals, lo, hi, mean: sum / (GRID * GRID), boxLo, boxHi, origin: wAt(terms, m, 0, 0) };
    wCache.set(m, out);
    return out;
  }

  /* ---------- 5. the local memory rank (certificates) and the chord graph ---------- */
  // [from D, below D, least rank, largest rank, kind]: 'cert' a certified value or range, 'mono' filled in because the
  // rank does not increase with D
  const RANKS = [
    [0, 12, 38, 38, 'cert'],
    [12, 56, 29, 38, 'mono'],
    [56, 68, 29, 31, 'cert'],
    [68, 216, 26, 31, 'mono'],
    [216, 224, 26, 27, 'cert'],
    [224, 296, 25, 26, 'cert'],
    [296, 392, 24, 26, 'mono'],
    [392, 544, 24, 24, 'cert'],
    [544, 1152, 23, 23, 'cert'],
    [1152, 1376, 21, 21, 'cert'],
    [1376, 1568, 20, 20, 'cert'],
    [1568, Infinity, 19, 19, 'cert']
  ];
  const DMAX = 1600,
    CUTOFFS = [0, 56, 216, 224, 392, 512, 544, 1152, 1376, 1568];
  const rankAt = (D) => {
    const r = RANKS.find(([a, b]) => D >= a && D < b);
    return { lo: r[2], hi: r[3], kind: r[4], from: r[0], to: r[1] };
  };
  function chordGraph(D) {
    const live = PAIRS.filter((p) => p.d <= D),
      parent = range(N),
      find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    for (const p of live) parent[find(p.i)] = find(p.j);
    const comps = new Set(range(N).map(find)).size;
    return { live, count: live.length, classes: new Set(live.map((p) => p.d)).size, comps };
  }
  const CONNECT = CLASSES.find((d) => chordGraph(d).comps === 1);

  /* ---------- state, cards, rails ---------- */
  const SCENES = ['shell', 'gap', 'bands', 'ladder', 'memory'];
  const G1 = 14.134725141734694,
    G3 = 25.010857580145689;
  const RAILS = {
    shell: { max: 50, rate: 4.2, step: 0.5, rangeStep: 'any' },
    gap: { max: 50, rate: 6, step: 0.5, rangeStep: 'any' },
    bands: { max: BITS1 - BITS0, rate: 3, step: 1, rangeStep: '1' },
    ladder: { max: MMAX - M0, rate: 32, step: 1, rangeStep: '1' },
    memory: { max: DMAX, rate: 520, step: 4, rangeStep: '4' }
  };
  const STILL = { shell: G1, gap: G3, bands: 44 - BITS0, ladder: 105 - M0, memory: DMAX };
  const TRIADS = { clock: [POLE, 0, 7], inner: [6, 7, 8], mirror: [POLE, 6, 11] };
  const FRESH = { hl: 'clocks', triad: TRIADS.clock, free: false, f1: 0, f2: 0, charge: 'all', cut: 'compare', lambda: 9, stiff: 0.01, exact: true, weights: 'free' };
  const copy = (o) => JSON.parse(JSON.stringify(o));
  const state = { ...copy(FRESH), scene: 'shell', at: { ...STILL } };
  const PRESETS = {
    'shell-clocks': { scene: 'shell', play: true, still: STILL.shell, set: { hl: 'clocks', triad: TRIADS.clock } },
    'three-gen-gap': { scene: 'gap', play: true, still: STILL.gap, set: { charge: 'all', cut: 'compare', lambda: 9 } },
    'clock-bands': { scene: 'bands', play: true, still: STILL.bands, set: { stiff: 0.01, exact: true } },
    'winding-ladder': { scene: 'ladder', play: true, still: STILL.ladder, set: { weights: 'free' } },
    'memory-rank': { scene: 'memory', play: true, still: STILL.memory, set: {} }
  };
  const DEFAULT = 'shell-clocks';
  const isWhole = () => RAILS[state.scene].rangeStep !== 'any';
  const phases = () => (state.free ? [state.f1, state.f2] : [(A1 * state.at.shell) % TAU, (A2 * state.at.shell) % TAU]);
  const gapPhases = () => [(A1 * state.at.gap) % TAU, (A2 * state.at.gap) % TAU];
  const bitsNow = () => BITS0 + Math.round(clamp(state.at.bands, 0, BITS1 - BITS0));
  const mNow = () => M0 + Math.round(clamp(state.at.ladder, 0, MMAX - M0));
  const dNow = () => Math.round(clamp(state.at.memory, 0, DMAX) / 4) * 4;

  function compute() {
    switch (state.scene) {
      case 'gap': {
        const [f1, f2] = gapPhases(),
          spec = CHARGES.map((q) => spectrum(q, f1, f2)),
          below = spec.map((s) => s.values.filter((v) => v < state.lambda).length),
          belowT = spec.map((s) => s.values.filter((v) => v < SITE_T).length),
          light = spec.map((s) => s.modes.slice(0, 3).map((x) => ({ v: x.v, j: x.j })));
        return { scene: 'gap', t: state.at.gap, f1, f2, spec: spec.map((s) => ({ q: s.q, values: s.values, chars: s.modes.map((x) => x.j) })), below, belowT, light, lambda: state.lambda, T: SITE_T, max3: Math.max(...spec.map((s) => s.values[2])), min4: Math.min(...spec.map((s) => s.values[3])) };
      }
      case 'bands': {
        const b = BRACKETS.get(bitsNow());
        return { scene: 'bands', bits: b.bits, codes: b.codes.map(String), cLo: String(b.cLo), cHi: String(b.cHi), span: b.span, rLo: b.rLo, rHi: b.rHi, width: b.width, exact: { rLo: EXACT.rLo, rHi: EXACT.rHi, width: EXACT.width, rel: EXACT.rel, cLo: String(EXACT.cLo), cHi: String(EXACT.cHi) }, ref: String(REF_CODE), refGap: String(C0 - REF_CODE), stiff: state.stiff, band: [RESP[0] - S_RESP * state.stiff, RESP[1] + S_RESP * state.stiff] };
      }
      case 'ladder': {
        const m = mNow(),
          W = wField(m);
        return { scene: 'ladder', m, level: levelAt(m), weights: state.weights, origin: W.origin, boxLo: W.boxLo, boxHi: W.boxHi, classes: W.terms.map((K) => ({ n1: K.n1, n2: K.n2, count: K.count })) };
      }
      case 'memory': {
        const D = dNow(),
          g = chordGraph(D),
          r = rankAt(D);
        return { scene: 'memory', D, rank: r, active: g.count, classes: g.classes, comps: g.comps, clocks: D < 512 ? 9 : 10 };
      }
      default: {
        const [f1, f2] = phases(),
          tri = triadOf(state.triad);
        return { scene: 'shell', t: state.at.shell, f1, f2, free: state.free, hl: state.hl, tri };
      }
    }
  }

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    cv = $('cv'),
    handle = $('stageHandle');
  const CAM = [0.42, 1.02];
  const opts = { canvas: cv, yaw: CAM[0], pitch: CAM[1], radius: 0.36, wheel: false, onChange: () => paint(), onPick: (ev) => pick(ev), onDrag: (ev) => drag(ev) };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(...CAM);
  const CORE = 0.965,
    LIFT = 1.004;
  const slerp = (u, v, t) => {
    const om = Math.acos(clamp(dot(u, v), -1, 1));
    if (om < 1e-9) return u.slice();
    return add(scale(u, sn((1 - t) * om) / sn(om)), scale(v, sn(t * om) / sn(om)));
  };
  const arc = (i, j, r = LIFT, n = 24) => range(n + 1).map((k) => scale(slerp(WORLD[i], WORLD[j], k / n), r));
  const at3 = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  const tube = (key, pts, color, width, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, width, glow, occlude: false, pick: false, alpha });

  /* the band of the title and buttons, and the legend: the room the pictures may use */
  const title = { key: '', top: 0 };
  function hudRoom() {
    const W = stage.clientWidth,
      H = stage.clientHeight,
      box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend'),
      act = $('stageAct');
    const key = [state.scene, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    if (shown(act) && !act.hidden) title.top = Math.max(title.top, act.getBoundingClientRect().bottom - box.top + 8);
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    return { W, H, top: title.top, bottom: Math.max(title.top + 40, H - bottom), left: 12, right: W - 12 };
  }
  function fitShell() {
    const r = hudRoom();
    if (!r.W || !r.H) return;
    let box = [Infinity, -Infinity, Infinity, -Infinity];
    for (const p of WORLD) {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      box = [Math.min(box[0], x), Math.max(box[1], x), Math.min(box[2], y), Math.max(box[3], y)];
    }
    const [x0, x1, y0, y1] = box.map((v, i) => v + [-0.3, 0.3, -0.22, 0.26][i]);
    const room = Math.max(40, r.bottom - r.top),
      u = Math.max(8, Math.min((r.W - 28) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(r.W, r.H);
    opts.cx = (r.W / 2 - (u * (x0 + x1)) / 2) / r.W;
    opts.cy = (r.top + room / 2 + (u * (y0 + y1)) / 2) / r.H;
  }

  /* ---------- the shell (kit.solid) ---------- */
  function drawShell(m) {
    const [f1, f2] = [m.f1, m.f2],
      tr = m.tri.tr,
      inTri = (i) => tr.includes(i);
    sc.surface('core', (u, v) => scale(at3(u, v), CORE), { u: [0, PI], v: [0, TAU], nu: 48, nv: 96, colors: [P.stage, P.violet], range: [-0.75, 1.35], value: (u) => cs(u), grid: { every: [6, 12], alpha: 0.16 } });
    sc.glass('glass', [0, 0, 0], 1, { color: P.violet, alpha: 0.06, rim: 0.6 });
    // the spherical triangle of the triad: magenta, its area is the solid angle Ω
    if (abs(m.tri.omega) > 1e-9) {
      const [A, B, C] = tr.map((i) => WORLD[i]),
        patch = (u, s) => scale(unit(add(scale(A, 1 - u), scale(add(scale(B, 1 - s), scale(C, s)), u))), 1.002);
      sc.surface('tri~', patch, { u: [0.002, 1], v: [0, 1], nu: 16, nv: 16, color: P.magenta, alpha: 0.42, grid: { every: [6, 6], alpha: 0.2 }, pick: false, occlude: false });
    }
    // the arcs of the chosen kind
    if (m.hl === 'clocks') {
      for (const e of EDGES.filter((x) => x.d === 244)) tube('a244-' + e.i + '-' + e.j, arc(e.i, e.j), P.ink, 1.1, 0.4, 0.1);
      for (const e of EDGES.filter((x) => x.d === 12)) tube('a12-' + e.i + '-' + e.j, arc(e.i, e.j), P.ink, 2.6, 0.95, 0.3);
      EDGES.filter((x) => x.clock).forEach((e) => {
        const color = e.clock === 1 ? P.cyan : P.violet,
          f = ((e.clock === 1 ? f1 : f2) % TAU) / TAU,
          // from the outer site to the inner one
          [o, i] = e.i < 6 ? [e.i, e.j] : [e.j, e.i];
        tube('clk-' + e.i + '-' + e.j, arc(e.i, e.j), color, 2.6, 0.95, 0.4);
        sc.bead(scale(slerp(WORLD[o], WORLD[i], f), 1.012), { color, r: 5.2, key: 'cb-' + e.i + '-' + e.j });
      });
    } else if (m.hl === 'short') {
      for (const e of EDGES.filter((x) => x.d === 12)) tube('s12-' + e.i + '-' + e.j, arc(e.i, e.j), P.cyan, 3.4, 1, 0.45);
    } else if (m.hl === 'mid') {
      for (const e of EDGES.filter((x) => x.d === 244)) tube('m244-' + e.i + '-' + e.j, arc(e.i, e.j), P.violet, 2.8, 1, 0.4);
    } else {
      ORBITS.forEach((o, k) => {
        const loop = [...arc(o[0], o[1]), ...arc(o[1], o[2]).slice(1), ...arc(o[2], o[0]).slice(1)];
        tube('orb' + k, loop, P.violet, 2.2, 0.95, 0.35);
      });
    }
    // the triad: amber arcs and beads
    [
      [tr[0], tr[1]],
      [tr[1], tr[2]],
      [tr[2], tr[0]]
    ].forEach(([a, b], k) => tube('tri' + k, arc(a, b, 1.008), P.amber, 1.6, 0.9, 0.3));
    range(N).forEach((i) => {
      if (inTri(i)) sc.bead(scale(WORLD[i], 1.01), { color: P.amber, r: 6.4, key: 'p' + i });
      else sc.bead(scale(WORLD[i], 1.006), { color: P.ink, r: 4.2, key: 'p' + i });
    });
  }
  function shellTags(m) {
    if (TRV.thumbMode) return;
    const N_ = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls);
    const out = (p, d) => scale(unit(p), 1 + d);
    m.tri.tr.forEach((i, k) => N_('v' + k, out(WORLD[i], 0.13), ptName(i), 'c-am'));
    if (m.hl === 'clocks') {
      const c1 = EDGES.find((e) => e.clock === 1 && !m.tri.tr.includes(e.i)),
        c2 = EDGES.find((e) => e.clock === 2 && !m.tri.tr.includes(e.i));
      if (c1) N_('phi1', out(slerp(WORLD[c1.i], WORLD[c1.j], 0.5), 0.1), 'φ₁', 'c-cy');
      if (c2) N_('phi2', out(slerp(WORLD[c2.i], WORLD[c2.j], 0.5), 0.1), 'φ₂', 'c-vi');
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
    const free = (b, dx, dy) => {
      const l = b.left + dx,
        r = b.right + dx,
        t = b.top + dy,
        bt = b.bottom + dy;
      if (l < bounds.left + 4 || r > bounds.right - 4 || t < bounds.top + 4 || bt > bounds.bottom - 4) return null;
      if (occupied.some((o) => l < o.right + 3 && r > o.left - 3 && t < o.bottom + 3 && bt > o.top - 3)) return null;
      return { left: l, right: r, top: t, bottom: bt };
    };
    const STEP_X = 18,
      cols = 2 * Math.ceil(bounds.width / STEP_X);
    for (const [i, b] of boxes.entries()) {
      const dx = clamp(0, bounds.left + 5 - b.left, bounds.right - 5 - b.right),
        here = free(b, dx, 0);
      if (here) {
        list[i].style.translate = `${dx}px 0px`;
        occupied.push(here);
        continue;
      }
      const row = b.height + 4,
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
          const got = free(b, dx + sx, dy);
          if (got) {
            best = { cost, dx: dx + sx, dy, got };
            break;
          }
        }
      }
      if (best) {
        list[i].style.translate = `${best.dx}px ${best.dy}px`;
        occupied.push(best.got);
      } else list[i].hidden = true;
    }
  }

  /* ---------- the flat cards (kit.plot on the same canvas) ---------- */
  const THICK = () => (TRV.thumbMode ? 2 : 1);
  /** The vertical axis of the spectra: [0, 7] and [11.5, 24] pressed together, [7, 11.5] stretched. */
  const LMAXY = 24;
  const uOf = (v) => (v <= 7 ? (0.22 * Math.max(0, v)) / 7 : v <= 11.5 ? 0.22 + (0.56 * (v - 7)) / 4.5 : 0.78 + 0.22 * Math.min(1, (v - 11.5) / (LMAXY - 11.5)));
  const vOfU = (u) => (u <= 0.22 ? (7 * u) / 0.22 : u <= 0.78 ? 7 + (4.5 * (u - 0.22)) / 0.56 : 11.5 + ((LMAXY - 11.5) * (u - 0.78)) / 0.22);
  const frame = { scene: null, g: null, g2: null, anchor: null };
  /** Two panels of the canvas, side by side on a wide stage, one above the other on a narrow one. */
  function split(r, share = 0.56) {
    const wide = r.W > 1.2 * (r.bottom - r.top) && r.W > 560;
    if (wide) {
      const mid = r.left + (r.right - r.left) * share;
      return { wide, a: [r.left, r.top, mid - 10, r.bottom], b: [mid + 10, r.top, r.right, r.bottom] };
    }
    const mid = r.top + (r.bottom - r.top) * share;
    return { wide, a: [r.left, r.top, r.right, mid - 8], b: [r.left, mid + 8, r.right, r.bottom] };
  }
  const padOf = (r, rect, extra = [0, 0, 0, 0]) => [rect[0] + extra[0], r.W - rect[2] + extra[1], rect[1] + extra[2], r.H - rect[3] + extra[3]];

  function drawGap(m, r) {
    const g = kit.plot(cv, { x: [0.4, 5.6], y: [0, 1], pad: padOf(r, [r.left, r.top, r.right, r.bottom], [28, 6, 16, 18]), minHeight: 60 });
    frame.g = g;
    g.axes({ yTicks: [0, 4, 7, 8, 9, 10, 11, 16, 24].map((v) => [uOf(v), String(v)]), xTicks: CHARGES.map((q, c) => [c + 1, `q = ${minus1(q)}`]) });
    // the common gap: no eigenvalue of any charge at any phase enters it
    g.rect(0.4, uOf(LIGHT), 5.6, uOf(HEAVY), P.ink, { alpha: 0.1, stroke: P.ink, strokeAlpha: 0.32 });
    g.text(0.46, uOf(HEAVY), L('共同谱隙', 'common gap'), P.dim, { size: 9.5, face: 'body', dy: 8 });
    const w = THICK();
    m.spec.forEach((s, c) => {
      const x = c + 1,
        picked = state.charge === String(s.q);
      if (picked) g.rect(x - 0.42, 0, x + 0.42, 1, P.amber, { alpha: 0.06 });
      s.values.forEach((v, k) => {
        const light = k < 3,
          intruder = !light && state.cut === 'compare' && v < SITE_T,
          color = light ? P.cyan : intruder ? P.magenta : P.violet;
        g.line(
          [
            [x - 0.27, uOf(v)],
            [x + 0.27, uOf(v)]
          ],
          color,
          { width: (light || intruder ? 2.6 : 1.5) * w, alpha: light || intruder ? 1 : 0.75 }
        );
      });
      // the counts: below Λ (amber, the current cut) and below T (magenta)
      g.text(x, 1, String(m.below[c]), P.amber, { align: 'center', dy: -9, size: 11, face: 'data' });
      if (state.cut === 'compare') g.text(x + 0.2, 1, String(m.belowT[c]), P.magenta, { align: 'left', dy: -9, size: 9.5, face: 'data' });
      // the characters of the three light modes of the picked charge
      if (picked) {
        const ys = m.light[c].map((x0) => g.Y(uOf(x0.v))),
          order = [0, 1, 2].sort((a, b) => ys[b] - ys[a]),
          place = [];
        for (const k of order) {
          let y = ys[k];
          for (const p of place) if (abs(p - y) < 11) y = p - 11;
          place.push(y);
          g.text(x + 0.31, g.invY(y), CHAR[m.light[c][k].j], P.cyan, { size: 10, face: 'data' });
        }
      }
    });
    if (state.cut === 'compare') {
      g.hline(uOf(SITE_T), P.magenta, { dash: [5, 4], width: 1.4 * w });
      g.text(0.42, uOf(SITE_T), `T = ${fix(SITE_T, 0)}`, P.magenta, { align: 'left', dy: -8, size: 10, face: 'data' });
    }
    g.hline(uOf(state.lambda), P.amber, { width: 2 * w });
    g.text(5.6, uOf(state.lambda), `Λ = ${fix(state.lambda, 3)}`, P.amber, { align: 'right', dx: -32, dy: -9, size: 10, face: 'data' });
    frame.anchor = [g.X(5.6) - 14, g.Y(uOf(state.lambda))];
  }

  function drawBands(m, r) {
    const span = r.bottom - r.top,
      a = [r.left, r.top, r.right, r.top + span * 0.5],
      b = [r.left, r.top + span * 0.5 + 10, r.right, r.bottom];
    const g = kit.plot(cv, { x: [1e10, 1e13], y: [0, 56], logX: true, pad: padOf(r, a, [30, 8, 14, 16]), minHeight: 40 });
    frame.g = g;
    g.axes({ yTicks: [0, 20, 40].map((v) => [v, v + '%']), xTicks: [1e10, 1e11, 1e12, 1e13].map((v) => [v, `10${['¹⁰', '¹¹', '¹²', '¹³'][Math.round(Math.log10(v)) - 10]}`]) });
    BANDS.forEach((B, k) => {
      const hi = Math.min(B.hi, 1e13),
        mid = (B.arith[0] + B.arith[1]) / 2;
      g.rect(B.lo, 0, hi, mid, P.violet, { alpha: 0.38, stroke: P.violet, strokeAlpha: 0.9 });
      g.text(B.hi === Infinity ? 3.2e12 : Math.sqrt(B.lo * hi), mid, B.show + (B.hi === Infinity ? ' → ∞' : ''), P.violet, { align: 'center', dy: -9, size: 10, face: 'data' });
      if (k === 0) g.text(1.05e10, 52, L('γ 的三条高度带（证书）', 'three height bands of γ (certificate)'), P.dim, { size: 9.5, face: 'body' });
    });
    // the bracket of 2³⁵F₇ − 32071996606, in integer cells
    const lo = Math.min(m.rLo, -0.4),
      hi = Math.max(m.rHi, 1.4),
      pad = 0.12 * (hi - lo) + 0.08,
      x0 = lo - pad,
      x1 = hi + pad;
    const g2 = kit.plot(cv, { x: [x0, x1], y: [0, 1], pad: padOf(r, b, [30, 8, 6, 18]), clear: false, minHeight: 30 });
    frame.g2 = g2;
    const stepC = x1 - x0 > 60 ? 20 : x1 - x0 > 24 ? 5 : 1;
    const ticks = [];
    for (let c = Math.ceil(x0 / stepC) * stepC; c <= x1; c += stepC) ticks.push([c, c === 0 ? '…606' : c > 0 ? `+${c}` : minus1(c)]);
    g2.axes({ xTicks: ticks, yTicks: [] });
    for (let c = Math.ceil(x0); c <= x1 && x1 - x0 <= 60; c++) g2.vline(c, P.ink, { alpha: 0.22 });
    if (m.span === 1) g2.rect(Number(BigInt(m.cLo) - C0), 0, Number(BigInt(m.cLo) - C0) + 1, 1, P.cyan, { alpha: 0.07 });
    g2.rect(m.rLo, 0.42, m.rHi, 0.72, P.amber, { alpha: 0.5, stroke: P.amber });
    g2.text((m.rLo + m.rHi) / 2, 0.72, `${m.bits} ${L('位', 'bits')}`, P.amber, { align: 'center', dy: -8, size: 10, face: 'data' });
    if (state.exact) {
      g2.rect(m.exact.rLo, 0.12, m.exact.rHi, 0.28, P.cyan, { alpha: 0.85, stroke: P.cyan });
      g2.text(m.exact.rHi, 0.2, L(' 288 位', ' 288 bits'), P.cyan, { align: 'left', size: 9.5, face: 'data' });
    }
    // the reference code lies 4130 cells to the left
    g2.arrow([x0 + 0.42 * (x1 - x0) * 0.25, 0.9], [x0 + 0.01 * (x1 - x0), 0.9], { color: P.ink, width: 1.4, headSize: 7, alpha: 0.8 });
    g2.text(x0 + 0.115 * (x1 - x0), 0.9, L(`参考码 −${m.refGap} 格`, `reference −${m.refGap} cells`), P.dim, { align: 'left', size: 9.5, face: 'body' });
    frame.anchor = null;
  }

  function drawLadder(m, r) {
    const parts = split(r, 0.55);
    const g = kit.plot(cv, { x: [-0.8, 6.7], y: [-0.6, 7.5], pad: padOf(r, parts.a, [24, 6, 12, 18]), minHeight: 40 });
    frame.g = g;
    g.axes({ yTicks: range(7).map((k) => [k, String(k)]), xTicks: STEPS.map((s) => [mx(s.m), s.m === 18 ? '≤18' : String(s.m)]) });
    const w = THICK();
    // the certified staircase (violet) and the monotone barrier
    const stair = [];
    for (let k = 0; k <= 400; k++) {
      const mm = M0 + ((MMAX - M0) * k) / 400;
      stair.push([mx(mm), levelAt(Math.floor(mm + 1e-9))]);
    }
    g.line(stair, P.violet, { width: 2 * w, alpha: 0.95 });
    if (m.weights === 'monotone') {
      g.rect(-0.8, 4.5, 6.7, 7.5, P.magenta, { alpha: 0.08 });
      g.hline(4.5, P.magenta, { dash: [5, 4], width: 1.6 * w });
      g.text(-0.7, 4.5, L('非增权：能差 > 1/4', 'non-increasing: gap > 1/4'), P.magenta, { size: 9.5, dy: -8, face: 'body' });
    }
    // the joint witness at 105 windings
    g.dot(mx(105), 6, P.cyan, 7, { ring: true, width: 1.6 });
    g.text(mx(105), 6, '#2,306,888,100,085', P.cyan, { align: 'right', dx: -10, dy: -12, size: 9.5, face: 'data' });
    // now
    const x = mx(m.m),
      lv = m.level;
    g.vline(x, P.amber, { alpha: 0.55, width: 1.2 });
    g.dot(x, lv, P.amber, 5.5);
    frame.anchor = [g.X(x), g.Y(lv)];
    // the m-th winding term of the 529 triangles near the zero phases
    const F = wField(m.m),
      g2 = kit.plot(cv, { x: [-WIN, WIN], y: [-WIN, WIN], equal: true, pad: padOf(r, parts.b, [26, 6, 6, 16]), clear: false, minHeight: 40 });
    frame.g2 = g2;
    heat(g2, F);
    g2.axes({ xTicks: [-0.2, 0, 0.2].map((v) => [v, fix(v, 1)]), yTicks: [-0.2, 0, 0.2].map((v) => [v, fix(v, 1)]), xLabel: 'φ₁', yLabel: 'φ₂' });
    g2.rect(-BOX, -BOX, BOX, BOX, P.ink, { fill: false, stroke: P.ink, strokeAlpha: 0.75, width: 1.2 });
    g2.text(-BOX, BOX, `W${sub1(m.m)}`, P.ink, { dy: -8, size: 10, face: 'data' });
  }
  const heatCanvas = document.createElement('canvas');
  function heat(g, F) {
    heatCanvas.width = GRID;
    heatCanvas.height = GRID;
    const c = heatCanvas.getContext('2d'),
      img = c.createImageData(GRID, GRID),
      up = TRV.rgb.cyan,
      down = TRV.rgb.magenta,
      half = Math.max(1e-12, F.hi - F.mean, F.mean - F.lo);
    for (let b = 0; b < GRID; b++)
      for (let a = 0; a < GRID; a++) {
        const v = (F.vals[b * GRID + a] - F.mean) / half,
          col = v >= 0 ? up : down,
          k = ((GRID - 1 - b) * GRID + a) * 4;
        img.data[k] = Math.round(col[0] * 255);
        img.data[k + 1] = Math.round(col[1] * 255);
        img.data[k + 2] = Math.round(col[2] * 255);
        img.data[k + 3] = Math.round(255 * Math.min(1, abs(v)) * 0.85);
      }
    c.putImageData(img, 0, 0);
    const x0 = g.X(-WIN),
      y0 = g.Y(WIN),
      wpx = g.X(WIN) - x0,
      hpx = g.Y(-WIN) - y0;
    g.ctx.save();
    g.ctx.imageSmoothingEnabled = true;
    g.ctx.drawImage(heatCanvas, x0, y0, wpx, hpx);
    g.ctx.restore();
  }

  function drawMemory(m, r) {
    const parts = split(r, 0.56);
    const g = kit.plot(cv, { x: [0, DMAX], y: [17, 40], pad: padOf(r, parts.a, [26, 6, 22, 18]), minHeight: 40 });
    frame.g = g;
    g.axes({ yTicks: [19, 24, 29, 31, 38].map((v) => [v, String(v)]), xTicks: [0, 400, 800, 1200, 1600].map((v) => [v, String(v)]) });
    const w = THICK();
    for (const [a, b, lo, hi, kind] of RANKS) {
      const x1 = Math.min(b, DMAX);
      if (lo === hi)
        g.line(
          [
            [a, lo],
            [x1, lo]
          ],
          P.violet,
          { width: 2.4 * w }
        );
      else g.rect(a, lo, x1, hi, kind === 'cert' ? P.violet : P.ink, { alpha: kind === 'cert' ? 0.34 : 0.12, stroke: kind === 'cert' ? P.violet : P.ink, strokeAlpha: kind === 'cert' ? 0.8 : 0.35 });
    }
    g.vline(216, P.ink, { dash: [2, 3], alpha: 0.55 });
    g.vline(392, P.ink, { dash: [3, 3], alpha: 0.7 });
    g.vline(512, P.violet, { dash: [5, 4], alpha: 0.9, width: 1.3 });
    g.text(216, 17, '216', P.dim, { align: 'left', dy: -7, size: 9.5, face: 'data', dx: 3 });
    g.text(392, 40, L('三循环 24', '3-cycle 24'), P.dim, { align: 'right', dy: -9, size: 9.5, face: 'body', dx: -2 });
    g.text(512, 40, L('9 → 10 钟', '9 → 10 clocks'), P.violet, { align: 'left', dy: -9, size: 9.5, face: 'body', dx: 4 });
    const D = m.D;
    g.vline(D, P.amber, { width: 1.6 * w });
    g.line(
      [
        [D, m.rank.lo],
        [D, m.rank.hi]
      ],
      P.amber,
      { width: 5 * w }
    );
    g.dot(D, m.rank.lo, P.amber, 4.5);
    frame.anchor = [g.X(D), g.Y((m.rank.lo + m.rank.hi) / 2)];
    // the chord graph, projected along the pole
    const g2 = kit.plot(cv, { x: [-0.82, 0.82], y: [-0.82, 0.82], equal: true, pad: padOf(r, parts.b, [6, 6, 6, 6]), clear: false, minHeight: 40 });
    frame.g2 = g2;
    const live = new Set(chordGraph(D).live.map((p) => p.i * N + p.j));
    for (const p of PAIRS) {
      const on = live.has(p.i * N + p.j),
        A = WORLD[p.i],
        B = WORLD[p.j];
      g2.line(
        [
          [A[0], A[1]],
          [B[0], B[1]]
        ],
        on ? P.cyan : P.dim,
        { width: on ? 1.3 * w : 0.8, alpha: on ? 0.75 : 0.14 }
      );
    }
    WORLD.forEach((p, i) => g2.dot(p[0], p[1], i === POLE ? P.ink : P.ink, i === POLE ? 4.2 * w : 3.2 * w));
  }

  function drawStage(m) {
    if (state.scene === 'shell') {
      sc.active(true);
      cam = basis(sc.cam.yaw, sc.cam.pitch);
      fitShell();
      sc.begin();
      drawShell(m);
      shellTags(m);
      sc.end();
      handle.hidden = true;
      fitLabels();
      frame.scene = 'shell';
      return;
    }
    sc.active(false);
    const r = hudRoom();
    frame.scene = state.scene;
    frame.g2 = null;
    if (state.scene === 'gap') drawGap(m, r);
    else if (state.scene === 'bands') drawBands(m, r);
    else if (state.scene === 'ladder') drawLadder(m, r);
    else drawMemory(m, r);
    handle.hidden = TRV.still || !frame.anchor;
    if (frame.anchor) {
      handle.style.left = frame.anchor[0] + 'px';
      handle.style.top = frame.anchor[1] + 'px';
    }
  }

  /* ---------- the title, the legend and the stage button ---------- */
  const kept = (html) => html.replace(/(?:&lt;|&gt;|[=≈≥≤<>]) [−+]?\d[\d./,]*/g, '<span class="nb">$&</span>');
  const lv = (k) => L(...LEVEL_NAMES[k]);
  function bigline(m) {
    switch (m.scene) {
      case 'gap': {
        const all3 = m.below.every((n) => n === 3);
        return all3 ? L(`磁拉普拉斯 H_q · 每荷 3 个轻模 < Λ`, `Magnetic Laplacian H_q · 3 light modes per charge < Λ`) : L(`磁拉普拉斯 H_q · Λ 之下 ${m.below.join('、')} 个模`, `Magnetic Laplacian H_q · ${m.below.join(', ')} modes < Λ`);
      }
      case 'bands':
        return m.span === 1 ? L(`第七时间 · ${m.bits} 位 → ⌊2³⁵F₇⌋ = ${m.cLo}`, `Seventh time · ${m.bits} bits → ⌊2³⁵F₇⌋ = ${m.cLo}`) : L(`第七时间 · ${m.bits} 位：括号跨 ${m.span} 格`, `Seventh time · ${m.bits} bits: the bracket spans ${m.span} cells`);
      case 'ladder':
        return L(`绕数阶梯 · K = ${m.m}：${lv(m.level)}`, `Winding ladder · K = ${m.m}: ${lv(m.level)}`);
      case 'memory': {
        const rk = m.rank.lo === m.rank.hi ? String(m.rank.lo) : `${m.rank.lo}–${m.rank.hi}`;
        return L(`局部记忆秩 · D = ${m.D}：${rk}`, `Local memory rank · D = ${m.D}: ${rk}`);
      }
      default:
        return L('x² + y² + z² = 867 · 19 = 1 + 6 × 3', 'x² + y² + z² = 867 · 19 = 1 + 6 × 3');
    }
  }
  function subline(m) {
    switch (m.scene) {
      case 'gap': {
        const extra = m.belowT.map((n, c) => [n, CHARGES[c]]).filter(([n]) => n > 3).map(([, q]) => minus1(q));
        const tail = state.cut !== 'compare' ? L('浅色带里没有本征值。', 'no eigenvalue enters the pale band.') : extra.length ? L(`品红 T = 10 之下荷 ${extra.join('、')} 多出第四个模。`, `under the magenta T = 10, charge ${extra.join(', ')} admits a fourth mode.`) : L('品红 T = 10 之下此相位也恰为三个。', 'under the magenta T = 10, also three at this phase.');
        return L(`γ = ${fix(m.t, 2)}：青色轻模、紫色重模；`, `γ = ${fix(m.t, 2)}: cyan light, violet heavy modes; `) + tail;
      }
      case 'bands':
        return L(`琥珀括号 [${fix(m.rLo, 3)}, ${fix(m.rHi, 3)}] 格；紫柱是三条高度带的算术权，合计 > 99.915%。`, `Amber bracket [${fix(m.rLo, 3)}, ${fix(m.rHi, 3)}] cells; violet bars: the arithmetic weight of three height bands, > 99.915% together.`);
      case 'ladder':
        return L('紫色阶梯是证书的门槛；旁边是 529 个三角面第 K 圈项 W_K 在零相位附近的起伏，方框是两钟距 0 不超过 1/32 圈。', 'The violet ladder: the certified thresholds; beside it the K-th winding term W_K of the 529 triangles near the zero phases, the square is both clocks within 1/32 turn of 0.');
      case 'memory':
        return L(`青色是 d² ≤ D 的 ${m.active} 条弦（共 171）；紫色是证书给出的秩，灰框由单调性补出。`, `Cyan: the ${m.active} chords with d² ≤ D (of 171); violet: the certified rank, grey boxes filled in by monotonicity.`);
      default: {
        const how = {
          clocks: L(`γ = ${fix(m.t, 2)}：青 724 弧与紫 804 弧上的珠子是两只钟（φ₁ = ${fix(m.f1, 2)}，φ₂ = ${fix(m.f2, 2)}），墨色是 244 弧与粗的最短弧 12；`, `γ = ${fix(m.t, 2)}: beads on the cyan 724 and violet 804 arcs are the clocks (φ₁ = ${fix(m.f1, 2)}, φ₂ = ${fix(m.f2, 2)}); ink: 244 arcs, bold shortest arcs 12; `),
          short: L('青色是三条最短弧 d² = 12；', 'Cyan: the three shortest arcs d² = 12; '),
          mid: L('紫色是六条中间弧 d² = 244；', 'Violet: the six middle arcs d² = 244; '),
          orbits: L('紫色是六条坐标轮换轨道；', 'Violet: the six orbits of the cyclic shift; ')
        }[m.hl];
        return how + L('琥珀三点围成品红三角形。', 'the amber triad spans the magenta triangle.');
      }
    }
  }
  function legendItems(m) {
    switch (m.scene) {
      case 'gap':
        return [
          ['cy', L('轻模 1、ω、ω²', 'light modes 1, ω, ω²')],
          ['vi', L('重模', 'heavy modes')],
          ['am', L('谱分界 Λ', 'spectral cut Λ')],
          ...(state.cut === 'compare' ? [['mg', L('站点方差 T', 'site variance T')]] : []),
          ['ik box', L('共同谱隙', 'common gap')]
        ];
      case 'bands':
        return [
          ['vi box', L('高度带算术权', 'arithmetic weight of the bands')],
          ['am', L('当前位数的括号', 'bracket at the current bits')],
          ...(state.exact ? [['cy', L('288 位输入的括号', 'bracket with 288-bit inputs')]] : [])
        ];
      case 'ladder':
        return [
          ['vi', L('证书阶梯', 'certified ladder')],
          ['am', L('当前绕数 K', 'current winding K')],
          ['cy box', L('W_K 高于平均', 'W_K above its mean')],
          ['mg box', L('低于平均', 'below its mean')]
        ];
      case 'memory':
        return [
          ['vi', L('证书给出的秩', 'certified rank')],
          ['ik box', L('单调性补出的范围', 'filled in by monotonicity')],
          ['am', L('当前截止 D', 'current cutoff D')],
          ['cy', L('d² ≤ D 的弦', 'chords d² ≤ D')]
        ];
      default:
        return [
          ['am', L('当前三点', 'current triad')],
          ...{
            clocks: [
              ['cy', L('钟一 d² = 724', 'clock 1 d² = 724')],
              ['vi', L('钟二 d² = 804', 'clock 2 d² = 804')],
              ['ik', 'd² = 244 · 12']
            ],
            short: [['cy', L('最短弧 d² = 12', 'shortest arcs d² = 12')]],
            mid: [['vi', L('中间弧 d² = 244', 'middle arcs d² = 244')]],
            orbits: [['vi', L('三点轨道', '3-point orbits')]]
          }[m.hl],
          ['mg box', L('角盈 Ω', 'excess Ω')]
        ];
    }
  }
  const ACTS = {
    shell: ['下一组三点 ▸', 'Next triad ▸'],
    gap: ['换一种荷 ▸', 'Next charge ▸'],
    bands: ['多一位 ▸', 'One more bit ▸'],
    ladder: ['下一门槛 ▸', 'Next threshold ▸'],
    memory: ['下一截止 ▸', 'Next cutoff ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = kept(bigline(m));
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACTS[state.scene]);
    b.hidden = TRV.still;
    if (b.textContent !== text) b.textContent = text;
  }

  /* ---------- the readouts ---------- */
  const put = (id, html) => {
    const el = $(id);
    if (el.innerHTML !== html) el.innerHTML = html;
  };
  const yes = '<span class="nummark">✓</span>';
  function rows(m) {
    switch (m.scene) {
      case 'gap': {
        const pickC = CHARGES.indexOf(Number(state.charge));
        return {
          key: [L('Λ 之下的模数（q = 1, 2, −3, −4, 6）', 'Modes below Λ (q = 1, 2, −3, −4, 6)'), m.below.join(' · '), m.below.every((n) => n === 3) ? ` ${yes}` : ''],
          r: [
            [L('γ · (φ₁, φ₂)', 'γ · (φ₁, φ₂)'), `${fix(m.t, 3)} · (${fix(m.f1, 4)}, ${fix(m.f2, 4)})`],
            [L('此相位：最大 λ₃ · 最小 λ₄', 'At this phase: largest λ₃ · least λ₄'), `${fix(m.max3, 4)} · ${fix(m.min4, 4)}`],
            [L('站点方差 T = 9 + (1 − δ)² 之下的模数（δ = 0）', 'Modes below the site variance T = 9 + (1 − δ)² (δ = 0)'), `${m.belowT.join(' · ')} (T = ${fix(SITE_T, 0)})`],
            pickC >= 0
              ? [L(`q = ${minus1(CHARGES[pickC])} 的轻模（特征标）`, `Light modes of q = ${minus1(CHARGES[pickC])} (character)`), m.light[pickC].map((x) => `${fix(x.v, 3)} (${CHAR[x.j]})`).join(' · ')]
              : [L('每荷三个轻模的特征标', 'Characters of the three light modes'), m.light.every((ls) => new Set(ls.map((x) => x.j)).size === 3) ? `1 · ω · ω² ${yes}` : '—'],
            [L('24 × 24 网格：max λ₃ · min λ₄', '24 × 24 grid: max λ₃ · min λ₄'), BENCH ? `${fix(BENCH.max3, 4)} · ${fix(BENCH.min4, 4)}` : '—'],
            [L('谱分界 Λ', 'Spectral cut Λ'), fix(m.lambda, 3) + (m.lambda > LIGHT && m.lambda < HEAVY ? L('（在谱隙里）', ' (inside the gap)') : L('（在谱隙外）', ' (outside the gap)'))]
          ],
          note: L('三个字符块各有一个最低模在 8.685 之下、其余在 9.6 之上；Λ 只要落在这段空隙里，每荷就恰好三个。', 'Each of the three character blocks has one lowest mode below 8.685 and the rest above 9.6; with Λ anywhere in this gap every charge keeps exactly three.')
        };
      }
      case 'bands':
        return {
          key: [L('第七时间的 35 位码 ⌊2³⁵F₇⌋', '35-bit code of the seventh time ⌊2³⁵F₇⌋'), m.span === 1 ? m.cLo : `${m.cLo} … ${m.cHi}`, m.span === 1 ? L('（唯一）', ' (unique)') : L(`（${m.span} 个可能）`, ` (${m.span} possible)`)],
          r: [
            [L('输入位数 · 第一与第六个输入码', 'Input bits · first and sixth input code'), `${m.bits} · ${m.codes[0]} … ${m.codes[5]}`],
            [L('括号 2³⁵F₇ − 32071996606', 'Bracket 2³⁵F₇ − 32071996606'), `[${fix(m.rLo, 4)}, ${fix(m.rHi, 4)}]`],
            [L('288 位输入：F₇ 括号宽（相对）', '288-bit inputs: width of F₇ (relative)'), `${sci(m.exact.width, 3)} (${sci(m.exact.rel, 2)})`],
            [L('参考 T₇ 的码 · 第六项偏移造成的刚性位移', 'Code of the reference T₇ · rigid shift from the sixth offset'), `${m.ref} · ${m.refGap} ${L('格', 'cells')}`],
            [L('一阶响应带 R₀ ± S·s（S ≈ 0.00208104，证书）', 'First-order band R₀ ± S·s (S ≈ 0.00208104, certificate)'), `[${fix(m.band[0], 7)}, ${fix(m.band[1], 7)}]`, 'v'],
            [L('留出的平均 J 亏额（证书）', 'Held-out deficit of the mean J (certificate)'), L('8 点 6.0833% · 11 点 6.1691%–6.4132% · 23 点 5.5700%–9.3435%', '8 points 6.0833% · 11 points 6.1691%–6.4132% · 23 points 5.5700%–9.3435%'), 'v']
          ],
          note: L('乘子由有理节点精确算出：两组的 Q 都小于 0，各项系数的符号决定取输入格的哪一端。', 'The multipliers come exactly from the rational nodes: both groups have Q < 0, and the sign of each coefficient picks the end of its input cell.')
        };
      case 'ladder': {
        const cls = m.classes
          .slice()
          .sort((a, b) => b.count - a.count)
          .map((K) => `(${minus1(K.n1)}, ${minus1(K.n2)}) ${K.count}`)
          .join(' · ');
        return {
          key: [L('K 圈以内能做到的最好一级', 'Best level within K windings'), `${m.level} · ${lv(m.level)}`, ''],
          r: [
            [L('门槛（证书）', 'Thresholds (certificate)'), '18 · 19 · 21 · 27 · 31 · 36 · 105', 'v'],
            [L('529 个三角形按钟绕数 (n₁, n₂)', 'The 529 triangles by clock windings (n₁, n₂)'), cls],
            [L('W_K(0, 0) · 方框内的范围', 'W_K(0, 0) · range in the square'), `${fix(m.origin, 4)} · [${fix(m.boxLo, 4)}, ${fix(m.boxHi, 4)}]`],
            [L('随圈数不增的权', 'Weights not increasing in K'), m.weights === 'monotone' ? L('参考味能差 > 1/4：第 5、6 级被排除', 'reference flavour gap > 1/4: levels 5 and 6 excluded') : L('未加限制', 'not imposed')],
            [L('联合见证（证书）', 'Joint witness (certificate)'), '#2,306,888,100,085 · ΔS = 4.857224 × 10⁻⁸', 'v'],
            [L('105 圈真空的自由系数（证书）', 'Free coefficients of the 105-winding vacuum (certificate)'), L('100 个连续系数', '100 continuous coefficients'), 'v']
          ],
          note: L('只有 96 个三角形的和乐带着钟的绕数，其余 433 个与钟无关；第 K 圈项把这些相位乘以 K，所以 K 越大，零相位附近的起伏越密。', 'Only 96 triangles carry a winding of the clocks in their holonomy, the other 433 do not; the K-th term multiplies these phases by K, so the larger K, the finer the ripples near the zero phases.')
        };
      }
      case 'memory': {
        const rk = m.rank.lo === m.rank.hi ? String(m.rank.lo) : `${m.rank.lo} – ${m.rank.hi}`;
        return {
          key: [L('辅助记忆秩（三时钟响应）', 'Auxiliary memory rank (three-clock response)'), rk, m.rank.kind === 'cert' ? L('（证书）', ' (certificate)') : L('（单调性补出）', ' (by monotonicity)')],
          r: [
            [L('截止 D · 可改的弦', 'Cutoff D · chords that may change'), `${m.D} · ${m.active}/171`],
            [L('点亮的弦距种类 · 连通分支', 'Chord classes lit · components'), `${m.classes}/${CLASSES.length} · ${m.comps}`],
            [L('适用区间', 'Interval'), `[${m.rank.from}, ${m.rank.to === Infinity ? '∞' : m.rank.to})`],
            [L('局部旧块所需时钟数（证书）', 'Clocks a local old block needs (certificate)'), String(m.clocks), 'v'],
            [L('交替相消门槛 · 三循环 24 态门槛（证书）', 'Alternating cancellation · three-cycle 24-state threshold (certificate)'), '216 · 392', 'v'],
            [L('选点准则 → 零点编号（证书）', 'Selection rule → zero number (certificate)'), L('最小作用 #11431 · 谱权上升 #10875 · 有限读出 #11737 · 多体真空能 #11618', 'least action #11431 · rising weight #10875 · finite readout #11737 · many-body vacuum #11618'), 'v']
          ],
          note: L('可修改的条目随 D 只增不减，所以秩对 D 不增：证书之间的灰框就是由此得到的上下界。两端：旧块固定时 38，任意修正时 19。', 'The entries that may change only grow with D, so the rank does not increase with D: the grey boxes between the certificates are the bounds this gives. The ends: 38 with the old block fixed, 19 with any change.')
        };
      }
      default: {
        const t = m.tri,
          names = t.tr.map((i) => `${ptName(i)} ${i === POLE ? L('极点', 'pole') : orbitName(ORBIT_OF[i])}`).join(' · ');
        return {
          key: [L('三点组的格拉姆行列式 det G₃', 'Gram determinant det G₃ of the triad'), fstr(t.detG), ` = det(a, b, c)²/867³ ≈ ${fix(fval(t.detG), 5)}`],
          r: [
            [L('三点（所属轨道）', 'Triad (orbits)'), names],
            [L('平方弦距 d²_ab · d²_bc · d²_ca', 'Squared chords d²_ab · d²_bc · d²_ca'), t.chords.join(' · ')],
            [L('1 + 2B − Σκ（同一个数）', '1 + 2B − Σκ (the same number)'), `${fstr(t.gram)} ${cmp(t.gram, t.detG) === 0 ? yes : '✗'}`],
            [L('有向立体角 Ω · 巴格曼相位 −Ω/2', 'Signed solid angle Ω · Bargmann phase −Ω/2'), `${fix(t.omega, 5)} · ${fix(-t.omega / 2, 5)}`],
            [L('两只钟 (φ₁, φ₂)', 'Two clocks (φ₁, φ₂)'), `(${fix(m.f1, 3)}, ${fix(m.f2, 3)})` + (m.free ? L(' 自由', ' free') : ` = γ·(${fix(A1, 4)}, ${fix(A2, 4)}) mod 2π`)],
            [L('弧角 θ₁₂ · θ₂₄₄ · θ₇₂₄ · θ₈₀₄（弧度）', 'Arc angles θ₁₂ · θ₂₄₄ · θ₇₂₄ · θ₈₀₄ (radians)'), [12, 244, 724, 804].map((d) => fix(theta(d), 5)).join(' · ')]
          ],
          note: t.link
            ? L(`这条边 (d² = ${t.link.d}) 的联络相位 arg z = ${fix(t.link.arg, 5)}，正是 −Ω(极点, i, j)/2${t.link.d === 200 ? ' + π' : ''}：磁拉普拉斯的每条边都带着这样一个巴格曼相位。`, `The link phase of this edge (d² = ${t.link.d}) is arg z = ${fix(t.link.arg, 5)}, exactly −Ω(pole, i, j)/2${t.link.d === 200 ? ' + π' : ''}: every edge of the magnetic Laplacian carries such a Bargmann phase.`)
            : L('三点共一个大圆时 det G₃ = 0、Ω = 0；点一个整点就把它换进三点组。', 'Three points on one great circle give det G₃ = 0 and Ω = 0; click an integer point to put it into the triad.')
        };
      }
    }
  }
  function readings(m) {
    const Rw = rows(m);
    put('roKeyL', Rw.key[0]);
    put('roKey', kept(Rw.key[1]));
    put('roKeySub', kept(Rw.key[2]));
    Rw.r.forEach(([l, v, kind], i) => {
      put('roL' + (i + 1), kept(l));
      put('roV' + (i + 1), kept(v));
      const cls = `${kind || 'c'} wide`;
      if ($('roRow' + (i + 1)).className !== cls) $('roRow' + (i + 1)).className = cls;
    });
    put('roNote', Rw.note);
    const names = { shell: ['球壳', 'Shell'], gap: ['谱隙', 'Gap'], bands: ['算术钟', 'Clock'], ladder: ['阶梯', 'Ladder'], memory: ['记忆', 'Memory'] };
    $('scenePill').innerHTML = `${L(...names[state.scene])} <strong>${SCENES.indexOf(state.scene) + 1}/5</strong>`;
    const keyShort = { shell: `det G₃ ${fix(fval(m.tri ? m.tri.detG : ZERO), 4)}`, gap: `Λ ${fix(state.lambda, 2)}`, bands: `${bitsNow()} bits`, ladder: `K ${mNow()}`, memory: `D ${dNow()}` }[state.scene];
    $('keyPill').innerHTML = `<strong>${keyShort}</strong>`;
    $('ctlAside').textContent = `${SCENES.indexOf(state.scene) + 1}/5`;
    for (const gr of document.querySelectorAll('#ctlPanel .grp')) gr.hidden = gr.dataset.scene !== state.scene;
    const setF = (id, v, d) => {
      if (Math.abs(parseFloat($(id).value) - v) > 1e-9) $(id).value = String(v);
      $(id + 'Out').textContent = fix(v, d);
    };
    const [f1, f2] = phases();
    setF('phi1', Number(fix(f1, 2)), 2);
    setF('phi2', Number(fix(f2, 2)), 2);
    setF('lam', state.lambda, 3);
    setF('stiff', state.stiff, 3);
    hlChips.set(state.hl, true);
    triadChips.set(Object.keys(TRIADS).find((k) => TRIADS[k].join() === state.triad.join()) || null, true);
    chargeChips.set(state.charge, true);
    cutChips.set(state.cut, true);
    exactChips.set(state.exact ? 'on' : 'off', true);
    weightChips.set(state.weights, true);
    cutoffChips.set(CUTOFFS.includes(dNow()) ? String(dNow()) : null, true);
    $('hint').textContent = L('Space 播放 · ← → 一步 · 拖动琥珀标记或转动球', 'Space plays · ← → one step · drag the amber mark or turn the ball');
    $('formula').textContent = {
      shell: 'det G₃ = det(a, b, c)² / 867³',
      gap: 'λ₃(H_q) < 8.685 < 9.6 < λ₄(H_q)',
      bands: '⌊2³⁵ F₇⌋ = 32071996606',
      ladder: 'W_K = Σ_T cos K(c_T + n·φ) / 529',
      memory: 'rank(D) ↓ : 38 → 19'
    }[state.scene];
  }

  /* ---------- the strip ---------- */
  const PAD = [42, 12, 10, 20];
  const gapSeries = new Map();
  function seriesOf(q) {
    if (gapSeries.has(q)) return gapSeries.get(q);
    const out = range(201).map((k) => {
      const t = (50 * k) / 200,
        s = spectrum(q, (A1 * t) % TAU, (A2 * t) % TAU).values;
      return [t, s[2], s[3]];
    });
    gapSeries.set(q, out);
    return out;
  }
  const ticks = (lo, hi, n = 4) => {
    const span = hi - lo,
      step = 10 ** Math.floor(Math.log10(span / n)),
      e = [1, 2, 5, 10].find((f) => span / (f * step) <= n) * step,
      out = [];
    for (let v = Math.ceil(lo / e) * e; v <= hi + 1e-9; v += e) out.push([v, fix(v, e < 1 ? (e < 0.1 ? 2 : 1) : 0)]);
    return out;
  };
  function drawPlot(m) {
    if (TRV.thumbMode) return;
    const pc = $('plot');
    if (!pc.clientWidth || !pc.clientHeight) return;
    const setHead = (zh, en, meta) => {
      put('plotTitle', L(zh, en));
      put('plotMeta', meta);
    };
    if (m.scene === 'shell') {
      setHead('双钟环面：(φ₁, φ₂) 沿 γ 绕行', 'Dual-clock torus: (φ₁, φ₂) winds along γ', `γ = ${fix(m.t, 2)}`);
      const g = kit.plot(pc, { x: [0, TAU], y: [0, TAU], equal: true, pad: PAD });
      g.axes({ xTicks: [0, PI, TAU].map((v, i) => [v, ['0', 'π', '2π'][i]]), yTicks: [0, PI, TAU].map((v, i) => [v, ['0', 'π', '2π'][i]]), xLabel: 'φ₁', yLabel: 'φ₂' });
      const pts = [];
      let prev = null;
      for (let k = 0; k <= 600; k++) {
        const t = (m.t * k) / 600,
          p = [(A1 * t) % TAU, (A2 * t) % TAU];
        if (prev && (abs(p[0] - prev[0]) > PI || abs(p[1] - prev[1]) > PI)) pts.push(null);
        pts.push(p);
        prev = p;
      }
      g.line(pts, P.cyan, { width: 1.2, alpha: m.free ? 0.35 : 0.8 });
      g.dot(m.f1, m.f2, P.amber, 4.5);
      return;
    }
    if (m.scene === 'gap') {
      const q = CHARGES.includes(Number(state.charge)) ? Number(state.charge) : null,
        sets = q == null ? CHARGES.map(seriesOf) : [seriesOf(q)];
      setHead(q == null ? '沿 γ：五荷的 λ₃ 与 λ₄ 不进谱隙' : `沿 γ：q = ${minus1(q)} 的 λ₃ 与 λ₄`, q == null ? 'Along γ: λ₃ and λ₄ of five charges stay out of the gap' : `Along γ: λ₃ and λ₄ of q = ${minus1(q)}`, `γ = ${fix(m.t, 2)}`);
      const g = kit.plot(pc, { x: [0, 50], y: [7, 11.2], pad: PAD });
      g.axes({ xTicks: ticks(0, 50), yTicks: [7, 8, 9, 10, 11].map((v) => [v, String(v)]) });
      g.rect(0, LIGHT, 50, HEAVY, P.ink, { alpha: 0.1 });
      g.hline(SITE_T, P.magenta, { dash: [5, 4], width: 1.2 });
      for (const s of sets) {
        g.line(s.map(([t, l3]) => [t, l3]), P.cyan, { width: 1.1, alpha: 0.75 });
        g.line(s.map(([t, , l4]) => [t, Math.min(11.2, l4)]), P.violet, { width: 1.1, alpha: 0.75 });
      }
      g.vline(m.t, P.amber, { width: 1.4 });
      return;
    }
    if (m.scene === 'bands') {
      setHead('沿位数：括号宽（格）', 'Along the bits: width of the bracket (cells)', `${m.bits} ${L('位', 'bits')}`);
      const pts = [...BRACKETS.values()].map((b) => [b.bits, Math.log10(Math.max(1e-6, b.rHi - b.rLo))]);
      const g = kit.plot(pc, { x: [BITS0, BITS1], y: [-1.6, 2.4], pad: PAD });
      g.axes({ xTicks: [36, 40, 44, 48, 52].map((v) => [v, String(v)]), yTicks: [-1, 0, 1, 2].map((v) => [v, ['0.1', '1', '10', '100'][v + 1]]) });
      g.hline(0, P.ink, { dash: [4, 3], alpha: 0.7 });
      g.hline(Math.log10(EXACT.rHi - EXACT.rLo), P.cyan, { dash: [4, 3], alpha: 0.8 });
      g.line(pts, P.amber, { width: 1.2, alpha: 0.6 });
      pts.forEach(([x, y]) => g.dot(x, y, x === m.bits ? P.amber : P.dim, x === m.bits ? 4.5 : 2.4));
      return;
    }
    if (m.scene === 'ladder') {
      setHead('沿 K：W_K 在方框里的范围', 'Along K: the range of W_K inside the square', `K = ${m.m}`);
      const pts = range(MMAX - M0 + 1).map((k) => {
        const F = wField(M0 + k);
        return [M0 + k, F.boxLo, F.boxHi];
      });
      const lo = Math.min(...pts.map((p) => p[1])),
        hi = Math.max(...pts.map((p) => p[2]));
      const g = kit.plot(pc, { x: [M0, MMAX], y: [lo - 0.02, hi + 0.02], pad: PAD });
      g.axes({ xTicks: [18, 36, 54, 72, 90, 105].map((v) => [v, String(v)]), yTicks: ticks(lo, hi, 3) });
      g.area(pts.map(([x, , b]) => [x, b]), P.cyan, { alpha: 0.14, base: lo - 0.02 });
      g.line(pts.map(([x, , b]) => [x, b]), P.cyan, { width: 1.1 });
      g.line(pts.map(([x, a]) => [x, a]), P.magenta, { width: 1.1 });
      g.vline(m.m, P.amber, { width: 1.4 });
      return;
    }
    setHead('沿 D：可改的弦（共 171 条）', 'Along D: chords that may change (171 in all)', `D = ${m.D}`);
    const pts = range(DMAX / 4 + 1).map((k) => [4 * k, chordGraph(4 * k).count]);
    const g = kit.plot(pc, { x: [0, DMAX], y: [0, 180], pad: PAD });
    g.axes({ xTicks: [0, 400, 800, 1200, 1600].map((v) => [v, String(v)]), yTicks: [0, 60, 120, 171].map((v) => [v, String(v)]) });
    g.line(pts, P.cyan, { width: 1.3 });
    g.vline(m.D, P.amber, { width: 1.4 });
    g.dot(m.D, m.active, P.amber, 4);
  }

  const paint = kit.painter(() => {
    const m = compute();
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail ---------- */
  let stopAt = null;
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.shell.rate,
    step: RAILS.shell.step,
    max: RAILS.shell.max,
    t: STILL.shell,
    format: (t) => {
      switch (state.scene) {
        case 'gap':
          return `γ = ${fix(t, 2)}`;
        case 'bands':
          return L(`${BITS0 + Math.round(t)} 位`, `${BITS0 + Math.round(t)} bits`);
        case 'ladder':
          return `K = ${M0 + Math.round(t)}`;
        case 'memory':
          return `D = ${Math.round(t / 4) * 4}`;
        default:
          return `γ = ${fix(t, 2)}`;
      }
    },
    onChange: (t, c) => {
      // a rail that counts comes to rest on a whole step
      if (!c.playing && isWhole()) {
        const s = RAILS[state.scene].step,
          r = Math.round(t / s) * s;
        if (abs(t - r) > 1e-9) {
          c.set(r);
          return;
        }
      }
      state.at[state.scene] = t;
      if (state.scene === 'shell' && c.playing) state.free = false;
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
    const r = RAILS[state.scene];
    clock.rate = r.rate;
    clock.step = r.step;
    $('now').step = r.rangeStep;
    const at = Math.min(state.at[state.scene], r.max);
    clock.setMax(r.max, true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
  $('rew').addEventListener('click', () => {
    stopBootPlay();
    clock.pause();
    clock.set(0);
  });
  $('now').addEventListener('input', () => {
    if (state.scene === 'shell') state.free = false;
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
    if (scene === 'shell') sc.view(CAM, 0);
  }
  /** A control of a card shows the card and changes it. */
  function steer(scene, change) {
    leave();
    show(scene);
    change();
    setRail();
    paint();
  }
  const hlChips = kit.chips($('hlChips'), 'hl', (v) => steer('shell', () => (state.hl = ['clocks', 'short', 'mid', 'orbits'].includes(v) ? v : 'clocks')));
  const triadChips = kit.chips($('triadChips'), 'triad', (v) => steer('shell', () => (state.triad = (TRIADS[v] || TRIADS.clock).slice())));
  for (const [id, k] of [
    ['phi1', 'f1'],
    ['phi2', 'f2']
  ])
    kit.field($(id), {
      out: $(id + 'Out'),
      fmt: (v) => fix(v, 2),
      onInput: (v) =>
        steer('shell', () => {
          const [f1, f2] = phases();
          state.f1 = f1;
          state.f2 = f2;
          state[k] = v;
          state.free = true;
        })
    });
  const chargeChips = kit.chips($('chargeChips'), 'charge', (v) => steer('gap', () => (state.charge = ['all', ...CHARGES.map(String)].includes(v) ? v : 'all')));
  const cutChips = kit.chips($('cutChips'), 'cut', (v) => steer('gap', () => (state.cut = v === 'spectral' ? 'spectral' : 'compare')));
  kit.field($('lam'), { out: $('lamOut'), fmt: (v) => fix(v, 3), onInput: (v) => steer('gap', () => (state.lambda = clamp(v, 7.5, 11))) });
  kit.field($('stiff'), { out: $('stiffOut'), fmt: (v) => fix(v, 3), onInput: (v) => steer('bands', () => (state.stiff = clamp(v, 0, 0.1))) });
  const exactChips = kit.chips($('exactChips'), 'exact', (v) => steer('bands', () => (state.exact = v !== 'off')));
  const weightChips = kit.chips($('weightChips'), 'weights', (v) => steer('ladder', () => (state.weights = v === 'monotone' ? 'monotone' : 'free')));
  const cutoffChips = kit.chips($('cutoffChips'), 'cutoff', (v) =>
    steer('memory', () => {
      state.at.memory = clamp(Number(v) || 0, 0, DMAX);
      clock.set(state.at.memory, true);
    })
  );
  $('stageAct').addEventListener('click', () => {
    const scene = state.scene;
    if (scene === 'shell')
      steer('shell', () => {
        const keys = Object.keys(TRIADS),
          k = keys.findIndex((x) => TRIADS[x].join() === state.triad.join());
        state.triad = TRIADS[keys[(k + 1) % keys.length]].slice();
      });
    else if (scene === 'gap')
      steer('gap', () => {
        const list = ['all', ...CHARGES.map(String)];
        state.charge = list[(list.indexOf(state.charge) + 1) % list.length];
      });
    else if (scene === 'bands')
      steer('bands', () => {
        state.at.bands = (Math.round(state.at.bands) + 1) % (BITS1 - BITS0 + 1);
        clock.set(state.at.bands, true);
      });
    else if (scene === 'ladder')
      steer('ladder', () => {
        const m = mNow(),
          next = STEPS.find((s) => s.m > m),
          to = next ? next.m : STEPS[0].m;
        state.at.ladder = to - M0;
        clock.set(state.at.ladder, true);
      });
    else
      steer('memory', () => {
        const D = dNow(),
          next = CUTOFFS.find((c) => c > D);
        state.at.memory = next == null ? 0 : next;
        clock.set(state.at.memory, true);
      });
  });

  /* ---------- picking on the ball, dragging the flat cards ---------- */
  function pick(ev) {
    if (state.scene === 'shell') {
      const k = sc.nearest(
        ev,
        WORLD.map((p) => scale(p, 1.006)),
        14
      );
      if (k < 0) return false;
      leave();
      if (!state.triad.includes(k)) state.triad = [state.triad[1], state.triad[2], k];
      paint();
      return true;
    }
    if (TRV.still) return true;
    leave();
    dragTo(ev.clientX, ev.clientY);
    return true;
  }
  function drag(ev) {
    if (state.scene === 'shell' || TRV.still) return;
    dragTo(ev.clientX, ev.clientY);
  }
  /** Move the parameter of a flat card to a pointer position (viewport pixels). */
  function dragTo(cx, cy) {
    const g = frame.g;
    if (!g) return;
    const b = cv.getBoundingClientRect(),
      x = cx - b.left,
      y = cy - b.top;
    if (state.scene === 'gap') {
      state.lambda = Math.round(clamp(vOfU(clamp(g.invY(y), 0, 1)), 7.5, 11) / 0.005) * 0.005;
      paint();
    } else if (state.scene === 'ladder') {
      const m = Math.round(clamp(mOfX(g.invX(x)), M0, MMAX));
      clock.set(m - M0);
    } else if (state.scene === 'memory') {
      const D = Math.round(clamp(g.invX(x), 0, DMAX) / 4) * 4;
      clock.set(D);
    } else if (state.scene === 'bands') {
      const g2 = frame.g2;
      if (!g2) return;
    }
  }
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    ev.stopPropagation();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    dragTo(ev.clientX, ev.clientY);
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
    const d = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 0;
    if (state.scene === 'gap') {
      state.lambda = ev.key === 'Home' ? 7.5 : ev.key === 'End' ? 11 : clamp(Math.round((state.lambda + 0.05 * d) / 0.005) * 0.005, 7.5, 11);
      paint();
      return;
    }
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(clock.max);
    else clock.stepBy(d);
  };

  /* ---------- experiment cards ---------- */
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay();
    stopAt = null;
    clock.pause();
    Object.assign(state, copy(FRESH), copy(p.set), { at: { ...STILL } });
    // a still, a reader who asked for reduced motion and a freshly opened page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting;
    setScene(p.scene);
    if (p.scene === 'shell') sc.view(CAM, booting || TRV.still ? 0 : 600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    } else if (booting && TRV.embed && !TRV.still && !TRV.reduceMotion) bootAutoplay(p.still);
    paint();
  }
  const NOTES = {
    'shell-clocks': [
      '琥珀是当前三点（含极点 (17, 17, 17)）与它的品红球面三角形；青色 724 弧与紫色 804 弧上的珠子是两只钟的相位，γ 走到第一个零点高度 γ₁ ≈ 14.13；墨色是 244 弧与最短弧 12。',
      'Amber marks the current triad, with the pole (17, 17, 17), and magenta its spherical triangle; the beads on the cyan 724 and violet 804 arcs are the two clock phases, run up to the first zero height γ₁ ≈ 14.13; ink marks the 244 arcs and the shortest arcs 12.'
    ],
    'three-gen-gap': [
      '五列各有三根青色轻模在琥珀 Λ = 9 之下，浅色带 [8.685, 9.6] 里没有本征值；在第三个零点高度 γ₃ ≈ 25.01，品红虚线 T = 10 之下荷 −4 多出第四个模。',
      'Each of the five columns keeps three cyan light modes under the amber Λ = 9, and no eigenvalue enters the pale band [8.685, 9.6]; at the third zero height γ₃ ≈ 25.01 the magenta dashed T = 10 lets a fourth mode of charge −4 through.'
    ],
    'clock-bands': [
      '44 位输入时琥珀括号落进同一个整数格 32071996606，青色是 288 位输入的括号；参考码 32071992476 在左边 4130 格外。紫柱是三条高度带的算术权。',
      'With 44-bit inputs the amber bracket falls inside the single integer cell 32071996606, the cyan one is the bracket with 288-bit inputs; the reference code 32071992476 lies 4130 cells to the left. Violet bars: the arithmetic weight of three height bands.'
    ],
    'winding-ladder': [
      '琥珀点沿紫色阶梯走到 K = 105：三窗内 18 圈以内无驻点、19 圈首现鞍点、21 圈首现严格局部极小；27、31 与逐高度权重的 36 圈依次解锁，105 圈才以固定权重给出跨所有高度的三窗精确参考味共同真空；旁边是 W₁₀₅ 在零相位附近的起伏。',
      'The amber point climbs the violet ladder to K = 105: inside the three-window domain, no critical point up to 18 windings, a saddle at 19 and a strict local minimum at 21; then 27, 31 and height-dependent 36 unlock, and only at 105 do fixed weights give one global three-window, exact-reference-flavour vacuum for all heights; beside it W₁₀₅ ripples near the zero phases.'
    ],
    'memory-rank': [
      'D 走到 1600：171 条弦全部点亮成青色，紫色的记忆秩从 38 经 [29, 31]、26–27、24、23 降到 19；216 是交替相消门槛，512 处时钟数从 9 跳到 10。',
      'D runs to 1600: all 171 chords light up in cyan and the violet memory rank falls from 38 through [29, 31], 26–27, 24 and 23 to 19; 216 is the alternating-cancellation threshold, and at 512 the clock count jumps from 9 to 10.'
    ]
  };
  const cards = kit.cards($('presets'), {
    presets: PRESETS,
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：时间轴、琥珀标记与右栏旋钮改的是本卡的量；实时读数由脚本现算，标注“证书”的数取自随页打包的第四层复算证书。', 'Free play: the rail, the amber mark and the dials change the quantity of the card; live readouts are computed by the script, while certified numbers come from bundled Tier-4 replay certificates.']
  });

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  let BENCH = null;
  function benchmarks() {
    const G = 24;
    let max3 = -Infinity,
      min4 = Infinity,
      top = -Infinity,
      bad = 0,
      charBad = 0;
    const intrude = CHARGES.map(() => 0);
    for (let a = 0; a < G; a++)
      for (let b = 0; b < G; b++) {
        const f1 = (TAU * a) / G,
          f2 = (TAU * b) / G;
        CHARGES.forEach((q, c) => {
          const s = spectrum(q, f1, f2);
          max3 = Math.max(max3, s.values[2]);
          min4 = Math.min(min4, s.values[3]);
          top = Math.max(top, s.values[18]);
          if (!(s.values[2] < LIGHT && s.values[3] > HEAVY)) bad++;
          if (new Set(s.modes.slice(0, 3).map((x) => x.j)).size !== 3) charBad++;
          if (s.values.filter((v) => v < SITE_T).length > 3) intrude[c]++;
        });
      }
    const b43 = BRACKETS.get(43),
      b44 = BRACKETS.get(44);
    return {
      sites: N,
      orbits: ORBITS.length,
      classes: CLASSES.length,
      edgeClasses: new Set(EDGES.map((e) => e.d)).size,
      edges: EDGES.length,
      triangles: TRIANGLES.length,
      a1: A1,
      a2: A2,
      grid: G,
      max3,
      min4,
      top,
      bad,
      charBad,
      intrude,
      siteT: SITE_T,
      low44: b44.rLo,
      high44: b44.rHi,
      code44: [String(b44.cLo), String(b44.cHi)],
      codes43: b43.span,
      exactW: EXACT.width,
      exactRel: EXACT.rel,
      refCode: String(REF_CODE),
      qLower: fval(LOWER.coeff),
      qUpper: fval(UPPER.coeff),
      wclasses: [...WCLASSES.values()].map((K) => [K.n1, K.n2, K.list.length]),
      connect: CONNECT
    };
  }
  BENCH = benchmarks();
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  const NUMBERS = {
    sites: () => String(BENCH.sites),
    orbits: () => String(BENCH.orbits),
    classes: () => String(BENCH.classes),
    edgeClasses: () => String(BENCH.edgeClasses),
    edges: () => String(BENCH.edges),
    triangles: () => String(BENCH.triangles),
    a1: () => fix(BENCH.a1, 6),
    a2: () => fix(BENCH.a2, 6),
    max3: () => fix(BENCH.max3, 4),
    min4: () => fix(BENCH.min4, 4),
    siteT: () => fix(BENCH.siteT, 0),
    intrude: () => BENCH.intrude.map((n, c) => `q = ${minus1(CHARGES[c])}: ${n}`).join(' · '),
    low44: () => `32071996606 + ${fix(BENCH.low44, 4)}`,
    high44: () => `32071996606 + ${fix(BENCH.high44, 4)}`,
    codes43: () => String(BENCH.codes43),
    exactW: () => sci(BENCH.exactW, 3),
    refCode: () => BENCH.refCode,
    classesW: (say) =>
      BENCH.wclasses
        .slice()
        .sort((a, b) => b[2] - a[2])
        .map(([a, b, n]) => `(${minus1(a)}, ${minus1(b)}) ${n}`)
        .join(' · ') + say(' 共 529 个', ', 529 in all'),
    connect: () => String(BENCH.connect)
  };
  function numText(say) {
    const B = BENCH;
    return say(
      `打开页面时由脚本现算。球壳：枚举 x² + y² + z² = 867 的非负整点得 ${B.sites} 个，全为正，极点 (17, 17, 17) 与 ${B.orbits} 条三点轨道；${B.classes} 种平方弦距，d² ≤ 804 的 ${B.edgeClasses} 种给出 ${B.edges} 条边与 ${B.triangles} 个三角形。谱：每个字符块的厄米矩阵用实嵌入的雅可比迭代对角化（双精度）；在 ${B.grid} × ${B.grid} 相位网格与五种荷上 max λ₃ = ${fix(B.max3, 4)}、min λ₄ = ${fix(B.min4, 4)}，λ₃ < 8.685 < 9.6 < λ₄ 不成立的格点 ${B.bad} 个，三个轻模不是三种特征标的格点 ${B.charBad} 个，最大本征值 ${fix(B.top, 3)}；站点方差 T = ${fix(B.siteT, 0)} 之下出现第四个模的格点数为 ${B.intrude.join('、')}。第七时间：乘子与括号全用大整数分数，两组 Q 为 ${fix(B.qLower, 6)} 与 ${fix(B.qUpper, 9)}（都小于 0）；44 位时两端都落在 32071996606，43 位时括号跨 ${B.codes43} 格，288 位输入的括号宽 ${sci(B.exactW, 4)}（相对 ${sci(B.exactRel, 3)}），参考码 ${B.refCode}。记忆：使弦图连通的最小截止 D = ${B.connect}。网格只覆盖有限多个相位；环面上处处成立的结论与其余证书数见下方随页面打包的复算证书 NUM 框，那些数不由本页脚本现算。`,
      `Computed by the script when the page opens. Shell: enumerating the nonnegative integer points of x² + y² + z² = 867 gives ${B.sites}, all positive: the pole (17, 17, 17) and ${B.orbits} orbits of three; ${B.classes} squared chord lengths, of which the ${B.edgeClasses} with d² ≤ 804 give ${B.edges} edges and ${B.triangles} triangles. Spectra: the Hermitian matrix of each character block is diagonalised by Jacobi iteration on its real embedding (double precision); over a ${B.grid} × ${B.grid} grid of phases and the five charges, max λ₃ = ${fix(B.max3, 4)} and min λ₄ = ${fix(B.min4, 4)}, ${B.bad} grid points fail λ₃ < 8.685 < 9.6 < λ₄, at ${B.charBad} the three light modes do not carry the three characters, and the largest eigenvalue is ${fix(B.top, 3)}; the grid points with a fourth mode below the site variance T = ${fix(B.siteT, 0)} number ${B.intrude.join(', ')}. Seventh time: multipliers and brackets in big-integer fractions, the two Q are ${fix(B.qLower, 6)} and ${fix(B.qUpper, 9)} (both below 0); at 44 bits both ends fall in 32071996606, at 43 bits the bracket spans ${B.codes43} cells, with 288-bit inputs the bracket is ${sci(B.exactW, 4)} wide (relative ${sci(B.exactRel, 3)}), and the reference code is ${B.refCode}. Memory: the least cutoff that connects the chord graph is D = ${B.connect}. The grid covers finitely many phases; for the statement on the whole torus and the other certified numbers see the bundled replay-certificate NUM box below, whose numbers the page script does not compute.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basisLive .${lang}`).innerHTML = numText(say);
  for (const el of document.querySelectorAll('[data-bench]')) el.innerHTML = NUMBERS[el.dataset.bench](el.closest('.en') ? EN : ZH);
  // the drawer repeats every evidence box of the panel, filled (the copies drop the ids of #basisLive and #basisCert)
  $('drawerEvidence').append(
    ...[...document.querySelectorAll('#basis .lean')].map((el) => {
      const copy = el.cloneNode(true);
      copy.removeAttribute('id');
      return copy;
    })
  );
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);
  if (document.fonts)
    document.fonts.ready.then(() => {
      title.key = '';
      paint();
    });

  /* ---------- probe, cover, start ---------- */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v === Infinity ? 'Infinity' : v)));
  window.BUL_DEBUG = Object.freeze({
    get state() {
      return plain({
        scene: state.scene,
        preset: cards.current,
        hl: state.hl,
        triad: state.triad,
        free: state.free,
        charge: state.charge,
        cut: state.cut,
        lambda: state.lambda,
        stiff: state.stiff,
        exact: state.exact,
        weights: state.weights,
        at: state.at,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        camera: { ...sc.cam },
        ledger: compute(),
        key: $('roKey').textContent
      });
    },
    presets: plain(PRESETS),
    shell: () => plain({ sites: SITES, pole: POLE, orbits: ORBITS, classes: CLASSES, edges: EDGES.map((e) => [e.i, e.j, e.d, e.arg]), triangles: TRIANGLES.length, a1: A1, a2: A2, world: WORLD }),
    spectrum: (q, f1, f2) => plain(spectrum(q, f1, f2)),
    bench: () => plain(BENCH),
    bracket: (bits) => plain(bits === 'exact' ? EXACT : BRACKETS.get(bits)),
    ranks: () => plain(RANKS),
    steps: () => plain(STEPS),
    /** Viewport coordinates of the integer point i on the ball (shell card), with its depth (> 0 faces the viewer). */
    pointTarget: (i) => {
      const q = sc.p(scale(WORLD[i], 1.006)),
        b = cv.getBoundingClientRect();
      return { x: b.left + q[0], y: b.top + q[1], depth: q[2] };
    },
    /** Viewport coordinates of the amber handle. */
    handleTarget: () => {
      const b = handle.getBoundingClientRect();
      return { x: b.left + b.width / 2, y: b.top + b.height / 2, hidden: handle.hidden };
    },
    /** Viewport coordinates of a data point of the main flat chart (Λ on the gap card is given as an eigenvalue). */
    chartTarget: (x, y) => {
      const g = frame.g,
        b = cv.getBoundingClientRect();
      if (!g) return null;
      const yy = state.scene === 'gap' ? uOf(y) : y,
        xx = state.scene === 'ladder' ? mx(x) : x;
      return { x: b.left + g.X(xx), y: b.top + g.Y(yy) };
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
