/* OMEGA//SPIN · 三元流群与三维凯莱旋转实验室 · the ternion heap and 3D Cayley rotation lab (Chapters 2–5)
   World (kit.solid): z up, one violet ball (an opaque core inside a glass unit shell), four readings of it.
     circle   the homogeneous integer pair [p : q] on a great circle through the top: X = (q² − p²)/(p² + q²) up,
              Y = (pq + qp)/(p² + q²) sideways; the rail walks [kP : 16 − k + kQ] from [0 : 1] to the end [P : Q];
     ternion  a canonical integer ternion drawn as the rotation Ad(a) it induces on S²: v₀ = (2, 3, 6)/7 is turned by
              qHalf then a (cyan, [a, p₀, qHalf]) and by a then qHalf (magenta, [qHalf, p₀, a]); the rail is the turning;
     spinor   the PythSpinor heap heapAt(e, Φ(a, b, c, d), n) on a great circle of S³: the real part w/r up (+e on top,
              −e at the bottom), the imaginary part along the axis sideways; the rail is the beat n = 0 … 6;
     cayley   R(σ)ⁿv₀ (exact, on the sphere) against T₂(X)ⁿv₀ (second-order Taylor, drifting out), v₀ = (0, 0, 1),
              and the dual-chart denominators of τₙ = σ ⋆ τₙ₋₁; the rail is the step n = 0 … 12.
   Every number of the ledger is a reduced fraction [p, q] of big integers, q > 0; the drawing alone uses doubles.
   Read-only probe: window.OMEGASPIN_DEBUG. */
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
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fix = (x, d = 4) => kit.fix(x, d);
  const deg = (r, d = 2) => fix((r * 180) / PI, d);

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
  const same = (x, y) => x[0] === y[0] && x[1] === y[1];
  const sumF = (xs) => xs.reduce(plus, ZERO);
  const fval = ([p, q]) => Number(p) / Number(q);
  const istr = (n) => String(n).replace('-', '−');
  const fstr = ([p, q]) => istr(p) + (q === 1n ? '' : '/' + q);
  const sub1 = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  const sup1 = (n) => String(n).replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  /** A big integer, or a power of base when it is one, for the ledger. */
  function powStr(n, base) {
    if (base > 1n && n > 1n) {
      let e = 0,
        m = n;
      while (m % base === 0n) {
        m /= base;
        e++;
      }
      if (m === 1n && e > 1) return `${base}${sup1(e)}`;
    }
    const s = String(n);
    return s.length <= 14 ? s : L(`${s.slice(0, 4)}…（${s.length} 位）`, `${s.slice(0, 4)}… (${s.length} digits)`);
  }

  /* ---------- integer quaternions (big integers) ---------- */
  const Z4 = (t) => t.map((v) => BigInt(v));
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = ([w, x, y, z]) => [w, -x, -y, -z];
  const qdot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0n);
  const qn2 = (a) => qdot(a, a);
  /** The canonical tuple of the ray of a nonzero integer quadruple: divided by the gcd, first nonzero entry positive. */
  function canon(t) {
    const g = t.reduce((m, v) => bgcd(m, v), 0n);
    if (g === 0n) return null;
    const r = t.map((v) => v / g),
      lead = r.find((v) => v !== 0n);
    return lead < 0n ? r.map((v) => -v) : r;
  }
  /** triad(a, b, c) = (a·conj(b))·c, unreduced, as in Lean. */
  const triadRaw = (a, b, c) => qmul(qmul(a, qconj(b)), c);
  const kappa4 = (a, b) => frac(qdot(a, b) ** 2n, qn2(a) * qn2(b));
  const tup = (t) => `(${t.map(istr).join(', ')})`;
  const brk = (t) => `[${t.map(istr).join(' : ')}]`;
  const same4 = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
  const O4 = Z4([1, 0, 0, 0]),
    PHALF = Z4([1, 1, 0, 0]),
    QHALF = Z4([1, 0, 1, 0]);
  /** A rational 3-vector [num, den], reduced, den > 0. */
  function vred(num, den) {
    let g = num.reduce((m, v) => bgcd(m, v), den);
    if (den < 0n) g = -g;
    return [num.map((v) => v / g), den / g];
  }
  const vsame = ([a, d], [b, e]) => a.every((x, i) => x * e === b[i] * d);
  const vstr = ([num, den]) => `(${num.map(istr).join(', ')})${den === 1n ? '' : '/' + den}`;
  const vfloat = ([num, den]) => num.map((v) => Number(v) / Number(den));
  /** Ad(p) v = Im(p·v·conj(p))/‖p‖², exactly. */
  const ad = (p, [num, den]) => vred(qmul(qmul(p, [0n, ...num]), qconj(p)).slice(1), den * qn2(p));

  /* ---------- 1. ℚP¹ ↔ S¹(ℚ): the homogeneous pair on the Cayley circle ---------- */
  const K1 = 16;
  /** The canonical pair of a projective point: divided by the gcd, q > 0 (or q = 0 and p > 0). */
  function pairCanon(p, q) {
    const g = bgcd(p, q);
    if (g === 0n) return null;
    const r = [p / g, q / g];
    return r[1] < 0n || (r[1] === 0n && r[0] < 0n) ? [-r[0], -r[1]] : r;
  }
  /** The point of the rail: [kP : 16 − k + kQ], and its κ, spread and Cayley image from the raw pair. */
  function circleAt(Pn, Qn, k) {
    const kk = BigInt(k),
      p = kk * Pn,
      q = BigInt(K1) - kk + kk * Qn,
      n2 = p * p + q * q;
    return { raw: [p, q], red: pairCanon(p, q), g: bgcd(p, q), n2, kappa: frac(q * q, n2), spread: frac(p * p, n2), X: frac(q * q - p * p, n2), Y: frac(p * q + q * p, n2) };
  }
  const circleCache = new Map();
  function circleOf(S) {
    const Pn = BigInt(S.P),
      Qn = BigInt(S.Q),
      key = `${S.P}:${S.Q}`,
      k = clamp(Math.floor(S.at.circle + 1e-9), 0, K1);
    if (!circleCache.has(key)) circleCache.set(key, range(K1 + 1).map((j) => circleAt(Pn, Qn, j)));
    const series = circleCache.get(key),
      now = series[k];
    const anchors = [
      [0n, 1n],
      [1n, 1n],
      [1n, 0n]
    ].map(([p, q]) => ({ pq: [p, q], kappa: frac(q * q, p * p + q * q), spread: frac(p * p, p * p + q * q), X: frac(q * q - p * p, p * p + q * q), Y: frac(2n * p * q, p * p + q * q) }));
    const antipodal = now.raw[1] === 0n;
    return {
      P: Pn,
      Q: Qn,
      end: pairCanon(Pn, Qn),
      k,
      ...now,
      sum: plus(now.kappa, now.spread),
      unitCircle: plus(times(now.X, now.X), times(now.Y, now.Y)),
      x: antipodal ? null : frac(now.raw[0], now.raw[1]),
      antipodal,
      anchors,
      series
    };
  }

  /* ---------- 2. canonical ternions, the triad and its two orders ---------- */
  const K2 = 16;
  const V0T = [Z4([2, 3, 6]), 7n]; // a rational point of S²: (2, 3, 6)/7
  function ternionOf(S) {
    const base = Z4(S.a),
      k = BigInt(S.k),
      raw = base.map((v) => v * k),
      a = canon(raw),
      b = QHALF,
      g = raw.reduce((m, v) => bgcd(m, v), 0n);
    const abRaw = triadRaw(raw, O4, b),
      baRaw = triadRaw(b, O4, raw),
      ab = canon(abRaw),
      ba = canon(baRaw);
    const midAB = ad(b, V0T),
      endAB = ad(a, midAB),
      endAB2 = ad(ab, V0T),
      midBA = ad(a, V0T),
      endBA = ad(b, midBA),
      endBA2 = ad(ba, V0T);
    // the three beats of the composite: its square and cube, canonical (for g120 the cube is p₀ again)
    const pow2 = canon(qmul(ab, ab)),
      pow3 = canon(qmul(qmul(ab, ab), ab));
    const assocL = triadRaw(triadRaw(a, O4, b), a, b),
      assocR = triadRaw(a, O4, triadRaw(b, a, b));
    const t = clamp(S.at.ternion, 0, K2);
    return {
      raw,
      k,
      g,
      flip: raw.find((v) => v !== 0n) < 0n,
      a,
      b,
      abRaw,
      baRaw,
      ab,
      ba,
      sameRay: same4(ab, ba),
      kappa: kappa4(ab, ba),
      pow2,
      pow3,
      closes: same4(pow3, O4),
      v0: V0T,
      midAB,
      endAB,
      endAB2,
      midBA,
      endBA,
      endBA2,
      homAB: vsame(endAB, endAB2),
      homBA: vsame(endBA, endBA2),
      apart: !vsame(endAB, endBA),
      assocL,
      assocR,
      assocOk: same4(assocL, assocR),
      order: S.order,
      t,
      leg: t < K2 / 2 ? 1 : 2
    };
  }

  /* ---------- 3. PythSpinors, the Cayley lift Φ and the heap recurrence ---------- */
  const BEATS = 6;
  const E = { num: O4, r: 1n };
  const smul = (p, q) => ({ num: qmul(p.num, q.num), r: p.r * q.r });
  const sconj = (p) => ({ num: qconj(p.num), r: p.r });
  const striad = (p, q, r) => smul(smul(p, sconj(q)), r);
  /** Φ(a, b, c, d) = (a² − s, 2ab, 2ac, 2ad; a² + s), s = b² + c² + d², unreduced (liftNum, liftRadius). */
  function lift(t) {
    const [a, b, c, d] = t.map(BigInt),
      s = b * b + c * c + d * d;
    return { num: [a * a - s, 2n * a * b, 2n * a * c, 2n * a * d], r: a * a + s };
  }
  /** Divide a spinor by the positive gcd of its numerator and radius: the sign is kept. */
  function sred(p) {
    const g = p.num.reduce((m, v) => bgcd(m, v), p.r);
    return { num: p.num.map((v) => v / g), r: p.r / g };
  }
  /** heapAt(a, b, n) for n = 0 … count: (cur, next) ↦ (next, triad(next, cur, next)). */
  function heap(a, b, count) {
    let cur = a,
      next = b;
    const out = [a];
    for (let i = 0; i < count; i++) {
      [cur, next] = [next, striad(next, cur, next)];
      out.push(cur);
    }
    return out;
  }
  const kspin = (p, q) => frac(p.r * q.r + qdot(p.num, q.num), 2n * p.r * q.r);
  const kproj = (p, q) => frac(qdot(p.num, q.num) ** 2n, qn2(p.num) * qn2(q.num));
  const spinNorm = (p) => frac(qn2(p.num), p.r * p.r);
  const sstr = (p) => `(${p.num.map(istr).join(', ')}; ${p.r})`;
  const spinCache = new Map();
  function spinorOf(S) {
    const key = S.lift.join(),
      k = clamp(Math.floor(S.at.spinor + 1e-9), 0, BEATS);
    if (!spinCache.has(key)) {
      const G = lift(S.lift),
        beats = heap(E, G, BEATS).map((h, n) => {
          const ks = kspin(E, h),
            kp = kproj(E, h),
            d = minus(times(TWO, ks), ONE);
          return { n, raw: h, red: sred(h), norm: spinNorm(h), kspin: ks, kproj: kp, bridge: times(d, d) };
        });
      spinCache.set(key, { G, Gred: sred(G), liftNormSq: qn2(G.num), beats });
    }
    const c = spinCache.get(key),
      [a, b, cc, d] = S.lift.map(BigInt),
      s = b * b + cc * cc + d * d;
    return { lift: S.lift.map(BigInt), s, ...c, liftOk: c.liftNormSq === c.G.r * c.G.r, k, now: c.beats[k] };
  }

  /* ---------- 4. the rational Cayley rotation, the Taylor truncation, the dual chart ---------- */
  const NMAX = 12;
  const V0C = [Z4([0, 0, 1]), 1n];
  /** The integer numerator of Cayley s for s = (x, y, z)/d, as in Lean (cayleyNum). */
  function cayleyNum(d, [x, y, z]) {
    const b = d * d - (x * x + y * y + z * z),
      tw = (v) => v + v;
    return [
      [b + tw(x * x), tw(x * y - d * z), tw(x * z + d * y)],
      [tw(y * x + d * z), b + tw(y * y), tw(y * z - d * x)],
      [tw(z * x - d * y), tw(z * y + d * x), b + tw(z * z)]
    ];
  }
  const mT = (A) => A[0].map((_, j) => A.map((row) => row[j]));
  const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0n)));
  const mvec = (A, v) => A.map((row) => row.reduce((s, x, j) => s + x * v[j], 0n));
  const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  const v3 = {
    add: (a, b) => a.map((x, i) => plus(x, b[i])),
    scale: (k, a) => a.map((x) => times(k, x)),
    dot: (a, b) => sumF(a.map((x, i) => times(x, b[i]))),
    cross: (a, b) => [minus(times(a[1], b[2]), times(a[2], b[1])), minus(times(a[2], b[0]), times(a[0], b[2])), minus(times(a[0], b[1]), times(a[1], b[0]))]
  };
  /** The dual-chart product of §5.2: N = (1 − a)σ_B + (1 − b)σ_A + 2σ_A × σ_B, D₊ = 1 + ab − 2c, D₋ = ‖σ_A + σ_B‖². */
  function star(A, B) {
    const a = v3.dot(A, A),
      b = v3.dot(B, B),
      c = v3.dot(A, B),
      N = v3.add(v3.add(v3.scale(minus(ONE, a), B), v3.scale(minus(ONE, b), A)), v3.scale(TWO, v3.cross(A, B))),
      Dp = minus(plus(ONE, times(a, b)), times(TWO, c)),
      Dm = v3.dot(v3.add(A, B), v3.add(A, B)),
      plusBranch = cmp(Dp, Dm) >= 0,
      out = plusBranch ? N.map((x) => over(x, Dp)) : N.map((x) => neg(over(x, Dm)));
    const sum = plus(Dp, Dm),
      prod = times(plus(ONE, a), plus(ONE, b)),
      big = plusBranch ? Dp : Dm;
    return { a, b, c, N, Dp, Dm, sum, prod, big, plusBranch, out, nN: v3.dot(N, N), outN: v3.dot(out, out) };
  }
  const cayCache = new Map();
  function cayleyOf(S) {
    const key = `${S.sig.join()}/${S.d}`,
      k = clamp(Math.floor(S.at.cayley + 1e-9), 0, NMAX);
    if (!cayCache.has(key)) {
      const d = BigInt(S.d),
        s0 = S.sig.map(BigInt),
        N = d * d + s0.reduce((t, x) => t + x * x, 0n),
        C = cayleyNum(d, s0),
        CtC = mmul(mT(C), C),
        orth = CtC.every((row, i) => row.every((v, j) => v === (i === j ? N * N : 0n))),
        detC = det3(C);
      const g = C.flat().reduce((m, v) => bgcd(m, v), N);
      // the Taylor truncation T₂ = I + X + X²/2, X = K/d, K = [s₀]×: numerator 2d²I + 2dK + K² over 2d²
      const [x, y, z] = s0,
        K = [
          [0n, -z, y],
          [z, 0n, -x],
          [-y, x, 0n]
        ],
        K2m = mmul(K, K),
        T2 = range(3).map((i) => range(3).map((j) => (i === j ? 2n * d * d : 0n) + 2n * d * K[i][j] + K2m[i][j])),
        Tden = 2n * d * d;
      const iter = [V0C],
        tay = [V0C];
      for (let n = 1; n <= NMAX; n++) {
        const [vn, vd] = iter[n - 1],
          [wn, wd] = tay[n - 1];
        iter.push(vred(mvec(C, vn), vd * N));
        tay.push(vred(mvec(T2, wn), wd * Tden));
      }
      const nrm = ([num, den]) => frac(num.reduce((t, v) => t + v * v, 0n), den * den);
      const sigma = s0.map((v) => frac(v, d)),
        u = v3.dot(sigma, sigma),
        M2 = plus(ONE, over(times(u, u), [4n, 1n]));
      const taus = [[ZERO, ZERO, ZERO]],
        stars = [null];
      for (let n = 1; n <= NMAX; n++) {
        const st = star(sigma, taus[n - 1]);
        stars.push(st);
        taus.push(st.out);
      }
      cayCache.set(key, {
        d,
        s0,
        N,
        C,
        orth,
        detC,
        det: frac(detC, N * N * N),
        Rred: { M: C.map((row) => row.map((v) => v / g)), den: N / g },
        T2,
        Tden,
        iter,
        tay,
        norms: iter.map(nrm),
        tnorms: tay.map(nrm),
        sigma,
        u,
        M2,
        perp: z === 0n,
        adPHalf: x === d && y === 0n && z === 0n,
        taus,
        stars
      });
    }
    const c = cayCache.get(key);
    return { ...c, k, now: c.iter[k], norm: c.norms[k], tnow: c.tay[k], tnorm: c.tnorms[k], step: c.stars[Math.max(1, k)], tau: c.taus[k] };
  }

  /* ---------- state, cards, rails ---------- */
  const SCENES = ['circle', 'ternion', 'spinor', 'cayley'];
  const STILL = { circle: K1, ternion: K2, spinor: BEATS, cayley: NMAX };
  const FRESH = { lens: 0, P: 1, Q: 0, a: [1, 1, 0, 0], k: -2, order: 'ab', lift: [3, 1, 1, 1], sig: [1, 1, 0], d: 2 };
  const copy = (o) => JSON.parse(JSON.stringify(o));
  const state = { ...copy(FRESH), scene: 'circle', cam: 'card', at: { ...STILL } };
  const PRESETS = {
    'qp1-antipodal-circle': { scene: 'circle', play: true, still: STILL.circle, set: { P: 1, Q: 0 } },
    'canonical-ternion-noncomm': { scene: 'ternion', play: true, still: STILL.ternion, set: { a: [1, 1, 0, 0], k: -2, order: 'ab' } },
    'pythspinor-720-double-cover': { scene: 'spinor', play: true, still: STILL.spinor, set: { lift: [3, 1, 1, 1] } },
    'cayley3d-vs-taylor-drift': { scene: 'cayley', play: true, still: STILL.cayley, set: { sig: [1, 1, 0], d: 2 } }
  };
  const DEFAULT = 'qp1-antipodal-circle';
  const RAILS = { circle: { max: K1, rate: 4 }, ternion: { max: K2, rate: 4 }, spinor: { max: BEATS, rate: 1.2 }, cayley: { max: NMAX, rate: 2.4 } };
  function compute(S) {
    switch (S.scene) {
      case 'ternion':
        return ternionOf(S);
      case 'spinor':
        return spinorOf(S);
      case 'cayley':
        return cayleyOf(S);
      default:
        return circleOf(S);
    }
  }
  const calc = () => compute(state);

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const CAMS = { circle: [0.26, 0.25], ternion: [-1.373, 0.39], spinor: [0.26, 0.25], cayley: [-2.356, 0.5] };
  /** The camera of the Cayley card looks along σ, tilted up by half a radian. */
  function cayleyCam() {
    const s = state.sig.map((v) => v / state.d),
      n = norm(s);
    if (n < 1e-9) return CAMS.cayley;
    const h = unit(s),
      up = abs(h[2]) > 0.95 ? [1, 0, 0] : [0, 0, 1],
      w = unit(sub(up, scale(h, dot(up, h)))),
      D = add(scale(h, cs(0.5)), scale(w, sn(0.5)));
    return [Math.atan2(-D[0], -D[1]), Math.asin(clamp(D[2], -1, 1))];
  }
  const camOf = (name) => {
    const base = state.scene === 'cayley' ? cayleyCam() : CAMS[state.scene];
    if (name === 'pole') return [base[0], 1.25];
    if (name === 'side') return [base[0] + 1.15, 0.12];
    return base;
  };
  const opts = { canvas: $('cv'), yaw: CAMS.circle[0], pitch: CAMS.circle[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(...CAMS.circle);
  const LIFT = 1.012,
    CORE = 0.84,
    TCAP = 1.6;
  // the picture of a great circle: UP is the real (or X) direction, A2 the imaginary (or Y) direction
  const AZ = (-38 * PI) / 180,
    A2 = [cs(AZ), sn(AZ), 0],
    UP = [0, 0, 1];
  const JN = unit(cross(UP, A2));
  const cayPt = (X, Y, r = 1) => scale(add(scale(UP, X), scale(A2, Y)), r);
  const lat = (h) => Math.sqrt(Math.max(0, 1 - h * h));
  /** Turn v about the axis of the integer quaternion q by the fraction f of its angle (the sign with w ≥ 0). */
  function turn(q, f, v) {
    let [w, x, y, z] = q.map(Number);
    if (w < 0) [w, x, y, z] = [-w, -x, -y, -z];
    const n = hypot(w, x, y, z),
      vn = hypot(x, y, z);
    if (vn < 1e-12) return v.slice();
    const ang = 2 * Math.atan2(vn, w) * f,
      k = [x / vn, y / vn, z / vn],
      c = cs(ang),
      s = sn(ang);
    void n;
    return add(add(scale(v, c), scale(cross(k, v), s)), scale(k, dot(k, v) * (1 - c)));
  }

  /* ---------- the geometry of each card at a rail value v (doubles, for drawing only) ---------- */
  const circlePt = (m, t, r = LIFT) => {
    const Pf = Number(m.P),
      Qf = Number(m.Q),
      p = t * Pf,
      q = K1 - t + t * Qf,
      n = p * p + q * q;
    return cayPt((q * q - p * p) / n, (2 * p * q) / n, r);
  };
  function ternionGeo(m, v) {
    const t = clamp(v, 0, K2),
      f1 = clamp(t / (K2 / 2), 0, 1),
      f2 = clamp((t - K2 / 2) / (K2 / 2), 0, 1),
      v0 = vfloat(m.v0);
    const path = (first, second, mid, f1n, f2n, n = 28) => {
      const one = sample(n, (s) => turn(first, s * f1n, v0)),
        two = f2n > 0 ? sample(n, (s) => turn(second, s * f2n, vfloat(mid))) : [];
      return [...one, ...two];
    };
    const ab = path(m.b, m.a, m.midAB, f1, f2),
      ba = path(m.a, m.b, m.midBA, f1, f2),
      abFull = path(m.b, m.a, m.midAB, 1, 1),
      baFull = path(m.a, m.b, m.midBA, 1, 1);
    return { v0, ab, ba, abFull, baFull, hereAB: ab[ab.length - 1], hereBA: ba[ba.length - 1] };
  }
  const axisOf = (t) => {
    const v = t.slice(1).map(Number);
    return norm(v) < 1e-12 ? null : unit(v);
  };
  /** The spinor angle of Φ(a, b, c, d) in the plane of 1 and the axis (b, c, d): atan2(2a√s, a² − s). */
  const spinAngle = (m) => Math.atan2(2 * Number(m.lift[0]) * Math.sqrt(Number(m.s)), Number(m.lift[0]) ** 2 - Number(m.s));
  const spinPt = (psi, r = LIFT) => cayPt(cs(psi), sn(psi), r);
  /** The exact Cayley iterate n (a point of S²) and the rotation angle 2·arctan‖σ‖ of one step. */
  const cayAxis = (m) => {
    const s = m.sigma.map(fval);
    return norm(s) < 1e-12 ? null : unit(s);
  };
  function cayleyGeo(m, v) {
    const t = clamp(v, 0, NMAX),
      n = Math.floor(t + 1e-9),
      f = t - n,
      ax = cayAxis(m),
      th = 2 * Math.atan(Math.sqrt(fval(m.u)));
    const exactAt = (j) => scale(vfloat(m.iter[clamp(j, 0, NMAX)]), LIFT);
    const turnBy = (p, ang) => {
      if (!ax) return p.slice();
      const c = cs(ang),
        s = sn(ang);
      return add(add(scale(p, c), scale(cross(ax, p), s)), scale(ax, dot(ax, p) * (1 - c)));
    };
    const here = f > 1e-9 && n < NMAX ? turnBy(exactAt(n), th * f) : exactAt(n);
    const tayAt = (j) => {
      const p = vfloat(m.tay[clamp(j, 0, NMAX)]),
        r = norm(p);
      return r > TCAP ? scale(p, TCAP / r) : p;
    };
    const tayPath = (upTo) => {
      const pts = [];
      for (let j = 0; j < Math.ceil(upTo - 1e-9) && j < NMAX; j++) {
        const a = vfloat(m.tay[j]),
          b = vfloat(m.tay[j + 1]),
          ra = norm(a),
          rb = norm(b),
          end = Math.min(1, upTo - j);
        for (let i = 0; i <= 10; i++) {
          const s = (i / 10) * end,
            d = unit(add(scale(unit(a), 1 - s), scale(unit(b), s))),
            r = Math.min(TCAP, ra + (rb - ra) * s);
          pts.push(scale(d, r));
        }
      }
      return pts;
    };
    return { ax, th, here, exactAt, tayAt, tayPath, turnBy, tHere: f > 1e-9 && n < NMAX ? tayPath(t).slice(-1)[0] || tayAt(n) : tayAt(n) };
  }
  function handleWorld(v) {
    const m = calc();
    switch (state.scene) {
      case 'ternion': {
        const g = ternionGeo(m, v);
        return scale(state.order === 'ab' ? g.hereAB : g.hereBA, LIFT);
      }
      case 'spinor':
        return spinPt(spinAngle(m) * clamp(v, 0, BEATS));
      case 'cayley':
        return cayleyGeo(m, v).here;
      default:
        return circlePt(m, clamp(v, 0, K1));
    }
  }

  /* ---------- fitting the picture between the title and the legend ---------- */
  const BALL = [-1.04, 1.04, -1.04, 1.04];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  function extras(m) {
    if (state.scene === 'ternion') return [m.ab, m.ba].map(axisOf).filter(Boolean).map((a) => scale(a, 1.3));
    if (state.scene === 'cayley') {
      const g = cayleyGeo(m, NMAX),
        pts = range(NMAX + 1).map((j) => g.tayAt(j));
      return g.ax ? [...pts, scale(g.ax, 1.28)] : pts;
    }
    return [];
  }
  const title = { key: '', top: 0 };
  function fit(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
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
    const [x0, x1, y0, y1] = around(extras(m)).map((v, i) => v + [-0.1, 0.1, -0.06, 0.08][i]);
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- drawing ---------- */
  const strong = () => (state.lens ? { exact: 0.5, flat: 1 } : { exact: 1, flat: 0.7 });
  const tube = (key, pts, color, width, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, width, glow, occlude: false, pick: false, alpha });
  const at3 = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  /** A circle as a keyed tube: it keeps its mesh and material from frame to frame. */
  const loop = (key, c, n, r, color, width, alpha = 1) => {
    const nn = unit(n),
      e1 = unit(cross(nn, abs(nn[2]) < 0.9 ? UP : [1, 0, 0])),
      e2 = cross(nn, e1);
    tube(key, sample(96, (t) => add(c, add(scale(e1, r * cs(TAU * t)), scale(e2, r * sn(TAU * t))))), color, width, alpha, 0.35);
  };
  /** The unit sphere as glass round an opaque violet core: marks on the unit sphere stay in view all round. */
  function drawBall() {
    sc.surface('core', (u, v) => scale(at3(u, v), CORE), { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });
    sc.glass('unit', [0, 0, 0], 1, { color: P.violet, alpha: 0.07, rim: 0.7 });
  }
  function drawCircle(m, v) {
    const w = strong(),
      t = clamp(v, 0, K1);
    loop('circle', [0, 0, 0], JN, LIFT, P.ink, 1.6, 0.85);
    tube('path', sample(64, (s) => circlePt(m, K1 * s)), P.cyan, 1.1, 0.4 * w.exact + 0.1, 0.2);
    if (t > 0.01) tube('walked', sample(48, (s) => circlePt(m, t * s)), P.cyan, 3, w.exact, 0.4);
    range(K1 + 1).forEach((k) => sc.bead(circlePt(m, k), { color: P.cyan, r: 2.4, alpha: 0.75 * w.exact, key: 'st' + k }));
    [
      [1, 0],
      [0, 1],
      [-1, 0]
    ].forEach(([X, Y], i) => sc.ring(cayPt(X, Y, LIFT), { color: P.cyan, r: 7, alpha: 0.85, normal: cayPt(X, Y), key: 'anchor' + i }));
    // κ is the height: the circle of latitude through the current point is a level set of κ = (1 + X)/2
    const here = circlePt(m, t),
      X = here[2] / LIFT;
    if (lat(X) > 2e-3) loop('level', [0, 0, X * LIFT], UP, lat(X) * LIFT, P.cyan, 1.1, 0.5 * w.exact + 0.1);
    if (state.lens) {
      const phi = Math.atan2(dot(here, A2), here[2]);
      if (abs(phi) > 1e-3) tube('theta', sample(40, (s) => cayPt(cs(phi * s), sn(phi * s), 0.93)), P.magenta, 2.6, 1, 0.4);
    }
    return { here };
  }
  function drawTernion(m, v) {
    const w = strong(),
      g = ternionGeo(m, v),
      onAB = state.order === 'ab',
      L1 = (p) => scale(p, LIFT);
    tube('abFull', g.abFull.map(L1), P.cyan, 1.1, 0.3, 0.2);
    tube('baFull', g.baFull.map(L1), P.magenta, 1.1, 0.3, 0.2);
    tube('ab', g.ab.map(L1), P.cyan, onAB ? 3.4 : 2, onAB ? 1 : 0.6, 0.45);
    tube('ba', g.ba.map(L1), P.magenta, onAB ? 2 : 3.4, onAB ? 0.6 : 1, 0.45);
    sc.bead(L1(g.v0), { color: P.ink, r: 5.4, key: 'v0' });
    sc.bead(L1(vfloat(m.midAB)), { color: P.cyan, r: 3.4, alpha: 0.8, key: 'midAB' });
    sc.bead(L1(vfloat(m.midBA)), { color: P.magenta, r: 3.4, alpha: 0.8, key: 'midBA' });
    sc.bead(L1(vfloat(m.endAB)), { color: P.cyan, r: 5.2, key: 'endAB' });
    sc.bead(L1(vfloat(m.endBA)), { color: P.magenta, r: 5.2, key: 'endBA' });
    // the axes of the two composites: the rotation each canonical ray induces
    const axAB = axisOf(m.ab),
      axBA = axisOf(m.ba);
    if (axAB) sc.arrow(scale(axAB, 1.0), scale(axAB, 1.3), { color: P.cyan, width: 2.4, alpha: 0.6 + 0.4 * w.exact, key: 'axAB' });
    if (axBA) sc.arrow(scale(axBA, 1.0), scale(axBA, 1.3), { color: P.magenta, width: 2.4, alpha: 0.6 + 0.4 * w.exact, key: 'axBA' });
    return { here: L1(onAB ? g.hereAB : g.hereBA), g, axAB, axBA };
  }
  function drawSpinor(m, v) {
    const w = strong(),
      t = clamp(v, 0, BEATS),
      al = spinAngle(m),
      psi = al * t;
    loop('great', [0, 0, 0], JN, LIFT, P.ink, 1.6, 0.85);
    if (abs(psi) > 1e-3) tube('walked', sample(Math.max(8, Math.ceil(abs(psi) * 16)), (s) => spinPt(psi * s)), P.cyan, 3, w.exact, 0.4);
    range(BEATS + 1).forEach((n) => sc.bead(spinPt(al * n), { color: P.ink, r: 3, alpha: 0.85, key: 'beat' + n }));
    // +e on top, −e at the bottom; the input ray (a, b, c, d) at half the angle of Φ
    sc.ring(spinPt(0), { color: P.cyan, r: 8, alpha: 0.9, normal: UP, key: 'plusE' });
    sc.ring(spinPt(PI), { color: P.magenta, r: 8, alpha: 0.9, normal: scale(UP, -1), key: 'minusE' });
    sc.bead(spinPt(al / 2), { color: P.ink, r: 3.6, alpha: 0.7, key: 'input' });
    // the projective twin: −gⁿ has the same projective kernel
    sc.ring(spinPt(psi + PI), { color: P.magenta, r: 6, alpha: 0.55 + 0.45 * w.flat, normal: spinPt(psi + PI, 1), key: 'twin' });
    // κ_spin is the height: the circle of latitude through the current spinor
    const h = cs(psi);
    if (lat(h) > 2e-3) loop('level', [0, 0, h * LIFT], UP, lat(h) * LIFT, P.cyan, 1.1, 0.5 * w.exact + 0.1);
    return { here: spinPt(psi), al, psi };
  }
  function drawCayley(m, v) {
    const w = strong(),
      g = cayleyGeo(m, v),
      t = clamp(v, 0, NMAX),
      v0 = scale(vfloat(V0C), LIFT);
    if (g.ax) {
      const c = dot(UP, g.ax),
        r = lat(c);
      if (r > 2e-3) loop('orbit', scale(g.ax, c * LIFT), g.ax, r * LIFT, P.cyan, 1.1, 0.45 * w.exact + 0.1);
      sc.arrow(scale(g.ax, 1.0), scale(g.ax, 1.28), { color: P.violet, width: 2.6, key: 'axis' });
    }
    // the exact orbit: every R(σ)ⁿv₀ on the sphere, the walked part bright
    range(NMAX + 1).forEach((n) => sc.bead(g.exactAt(n), { color: P.cyan, r: n <= t + 1e-9 ? 3.6 : 2.4, alpha: n <= t + 1e-9 ? w.exact : 0.45, key: 'R' + n }));
    if (g.ax && t > 0.01) {
      const steps = Math.max(8, Math.ceil(g.th * t * 14));
      tube('walked', sample(steps, (s) => g.turnBy(v0, g.th * t * s)), P.cyan, 2.6, w.exact, 0.4);
    }
    // the Taylor points: off the sphere, drawn at their norm (up to 1.6)
    const tp = g.tayPath(t);
    if (tp.length > 1) tube('taylor', tp, P.magenta, 2.6, 0.55 + 0.45 * w.flat, 0.4);
    range(Math.floor(t + 1e-9) + 1).forEach((n) => sc.bead(g.tayAt(n), { color: P.magenta, r: 3.6, alpha: 0.6 + 0.4 * w.flat, key: 'T' + n }));
    sc.bead(g.tHere, { color: P.magenta, r: 5, alpha: 0.7 + 0.3 * w.flat, key: 'Tnow' });
    sc.bead(v0, { color: P.ink, r: 5, key: 'v0' });
    return { here: g.here, g };
  }

  /* ---------- labels on the stage ---------- */
  function tags(m, v, drawn) {
    if (TRV.thumbMode) return;
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls);
    const out = (p, d = 0.16) => scale(unit(p), 1 + d);
    // off a point in the picture plane: outwards from the centre of the view, or to the right when the point faces us
    const aside = (p, d = 0.26) => {
      const q = sub(p, scale(cam.D, dot(p, cam.D))),
        dir = norm(q) < 0.35 ? cam.R : unit(q);
      return add(p, scale(dir, d));
    };
    const near = (p, q) => norm(sub(p, q)) < 0.15;
    if (state.scene === 'circle') {
      const ANCH = [
        ['top', cayPt(1, 0, LIFT), '[0:1]'],
        ['mid', cayPt(0, 1, LIFT), '[1:1]'],
        ['bot', cayPt(-1, 0, LIFT), state.lens ? 'x = ∞' : '[1:0]']
      ];
      const on = ANCH.find(([, p]) => near(p, drawn.here));
      for (const [key, p, txt] of ANCH) if (!on || on[0] !== key) N(key, aside(p, 0.16), txt, 'c-cy');
      const what = state.lens ? `θ ≈ ${deg(Math.atan2(dot(drawn.here, A2), drawn.here[2]), 1)}°` : `${brk(m.raw)}`;
      N('here', aside(drawn.here, 0.3), on && !state.lens ? `${what} = ${on[2]}` : what, state.lens ? 'c-mg' : 'c-am');
      const X = drawn.here[2] / LIFT;
      if (lat(X) > 0.12) N('lev', add(scale(UP, X * LIFT), scale(unit([-cam.R[0], -cam.R[1], 0]), lat(X) * 1.16)), `κ = ${fstr(m.kappa)}`, 'c-cy');
    } else if (state.scene === 'ternion') {
      const g = drawn.g;
      N('v0', out(g.v0, 0.14), 'v₀', 'c-ik');
      N('endAB', aside(scale(vfloat(m.endAB), LIFT), 0.24), state.lens ? `${deg(2 * Math.acos(clamp(Number(m.ab[0]) / Math.sqrt(Number(qn2(m.ab))), -1, 1)), 0)}°` : '[a, p₀, b]·v₀', 'c-cy');
      N('endBA', aside(scale(vfloat(m.endBA), LIFT), 0.24), state.lens ? `${deg(2 * Math.acos(clamp(Number(m.ba[0]) / Math.sqrt(Number(qn2(m.ba))), -1, 1)), 0)}°` : '[b, p₀, a]·v₀', 'c-mg');
      if (drawn.axAB) N('axAB', scale(drawn.axAB, 1.42), tup(m.ab), 'c-cy');
      if (drawn.axBA && !m.sameRay) N('axBA', scale(drawn.axBA, 1.42), tup(m.ba), 'c-mg');
    } else if (state.scene === 'spinor') {
      const n = clamp(Math.floor(v + 1e-9), 0, BEATS),
        b = m.beats[n];
      const hit = m.beats.findIndex((x) => x.n > 0 && x.red.r === 1n && x.red.num[0] === -1n),
        atPlus = near(spinPt(0), drawn.here),
        atMinus = near(spinPt(PI), drawn.here);
      if (!atPlus) N('plus', aside(spinPt(0), 0.16), '+e', 'c-cy');
      if (!atMinus) N('minus', aside(spinPt(PI), 0.18), hit > 0 ? `−e = g${sup1(hit)}` : '−e', 'c-mg');
      const what = atPlus ? L(`第 ${n} 拍 = +e`, `beat ${n} = +e`) : atMinus ? L(`第 ${n} 拍 = −e`, `beat ${n} = −e`) : L(`第 ${n} 拍 ${sstr(b.red)}`, `beat ${n} ${sstr(b.red)}`);
      N('here', aside(drawn.here, 0.3), state.lens ? `${deg(2 * spinAngle(m) * clamp(v, 0, BEATS), 0)}°` : what, state.lens ? 'c-mg' : 'c-am');
      if (!state.lens && !near(spinPt(drawn.al / 2), drawn.here)) N('input', aside(spinPt(drawn.al / 2), 0.2), `(${m.lift.map(istr).join(', ')})`, 'c-ik');
    } else {
      const g = drawn.g,
        n = clamp(Math.floor(v + 1e-9), 0, NMAX);
      N('v0', out(scale(vfloat(V0C), 1), 0.14), 'v₀', 'c-ik');
      if (g.ax) N('sigma', scale(g.ax, 1.4), 'σ', 'c-vi');
      N('Rn', aside(g.here, 0.22), `R${sup1(n)}v₀`, 'c-am');
      N('Tn', aside(g.tHere, 0.18), state.lens ? `≈ ${fix(fval(m.tnorm), 3)}` : `T₂${sup1(n)}v₀`, 'c-mg');
    }
  }
  // labels keep near their anchors and stay off the title, the buttons, the legend, the handle and each other
  function fitLabels(spot) {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect(),
      cvBox = $('cv').getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), $('stageAct'), handle].filter((el) => !el.hidden && el.getClientRects().length).map((el) => el.getBoundingClientRect());
    if (spot) occupied.push({ left: cvBox.left + spot[0] - 15, right: cvBox.left + spot[0] + 15, top: cvBox.top + spot[1] - 15, bottom: cvBox.top + spot[1] + 15 });
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
  function drawStage(m) {
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(m);
    const v = state.at[state.scene];
    sc.begin();
    drawBall();
    const drawn = { circle: drawCircle, ternion: drawTernion, spinor: drawSpinor, cayley: drawCayley }[state.scene](m, v);
    const here = drawn.here;
    sc.bead(here, { color: P.amber, r: 6.6, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    tags(m, v, drawn);
    sc.end();
    const q = sc.p(here);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels(q);
  }

  /* ---------- the title, the legend and the stage button ---------- */
  const kept = (html) => html.replace(/(?:&lt;|&gt;|[=≈≥≤<>]) [−+]?\d[\d./]*/g, '<span class="nb">$&</span>').replace(/‖/g, '<span class="nm">$&</span>');
  const ternAngle = (t) => 2 * Math.acos(clamp(Number(t[0]) / Math.sqrt(Number(qn2(t))), -1, 1));
  function bigline(m) {
    switch (state.scene) {
      case 'ternion':
        return state.lens
          ? L(`经典转动 · ${deg(ternAngle(m.ab), 0)}° 与 ${deg(ternAngle(m.ba), 0)}°，两条转轴`, `Classical rotations · ${deg(ternAngle(m.ab), 0)}° and ${deg(ternAngle(m.ba), 0)}°, two axes`)
          : L(`规范三元数 · ${tup(m.ab)} ${m.sameRay ? '=' : '≠'} ${tup(m.ba)}`, `Canonical ternions · ${tup(m.ab)} ${m.sameRay ? '=' : '≠'} ${tup(m.ba)}`);
      case 'spinor': {
        const b = m.now;
        return state.lens
          ? L(`经典转角 · ${m.k} × ${deg(2 * spinAngle(m), 0)}° = ${deg(2 * spinAngle(m) * m.k, 0)}°`, `Classical angle · ${m.k} × ${deg(2 * spinAngle(m), 0)}° = ${deg(2 * spinAngle(m) * m.k, 0)}°`)
          : L(`720° 旋量 · 第 ${m.k} 拍 = ${sstr(b.red)}`, `720° spinor · beat ${m.k} = ${sstr(b.red)}`);
      }
      case 'cayley':
        return state.lens
          ? L(`泰勒 T₂ · ‖T₂${sup1(m.k)}v₀‖² ≈ ${fix(fval(m.tnorm), 4)}`, `Taylor T₂ · ‖T₂${sup1(m.k)}v₀‖² ≈ ${fix(fval(m.tnorm), 4)}`)
          : L(`有理凯莱 · ‖R${sup1(m.k)}v₀‖² = ${fstr(m.norm)}`, `Rational Cayley · ‖R${sup1(m.k)}v₀‖² = ${fstr(m.norm)}`);
      default:
        return state.lens
          ? L(`经典圆 · θ = 2·arctan(P/Q) ≈ ${deg(2 * Math.atan2(Number(m.raw[0]), Number(m.raw[1])), 1)}°`, `Classical circle · θ = 2·arctan(P/Q) ≈ ${deg(2 * Math.atan2(Number(m.raw[0]), Number(m.raw[1])), 1)}°`)
          : L(`射影圆 · ${brk(m.raw)} → (${fstr(m.X)}, ${fstr(m.Y)})`, `Projective circle · ${brk(m.raw)} → (${fstr(m.X)}, ${fstr(m.Y)})`);
    }
  }
  function subline(m) {
    switch (state.scene) {
      case 'ternion':
        return state.lens
          ? L('经典读法：两个 90° 转动按两种次序合成，得到绕不同轴的 120° 转动。', 'Classical reading: two 90° turns composed in both orders give 120° turns about different axes.')
          : L('青色先转 qHalf 再转 a，品红次序相反；v₀ 落到两个不同的有理点。', 'Cyan turns by qHalf then a, magenta in the other order; v₀ lands on two different rational points.');
      case 'spinor':
        return state.lens
          ? L('经典读法：每拍转 120°，转满 360° 时物体已复原，旋量还在 −e。', 'Classical reading: 120° per beat; after 360° the object is back, the spinor sits at −e.')
          : L('高度是 κ（顶 +e，底 −e）；品红圈是 −gⁿ，射影核把两者读成同一个数。', 'Height is κ (top +e, bottom −e); the magenta ring is −gⁿ, which the projective kernel cannot tell apart.');
      case 'cayley':
        return state.lens
          ? L('经典读法：exp 的二阶截断每步都把模方放大，只能靠再归一化拉回。', 'Classical reading: the second-order truncation of exp enlarges the squared norm at every step; only renormalising pulls it back.')
          : L('青色是 R(σ)ⁿv₀，每一步都在球面上；品红是泰勒点，逐步离开球面；紫色是 σ。', 'Cyan is R(σ)ⁿv₀, on the sphere at every step; magenta is the Taylor point, leaving the sphere; violet is σ.');
      default:
        return state.lens
          ? L('经典读法：角度要用反正切，[1 : 0] 要取 P/Q → ∞ 的极限。', 'Classical reading: the angle needs an arctangent, and [1 : 0] needs the limit P/Q → ∞.')
          : L('高度是 κ（纬圈是 κ 的等值圈）；[1:0] 不取极限，直接落在底部的对径点。', 'Height is κ (circles of latitude are its level sets); [1:0] needs no limit and lands on the antipode at the bottom.');
    }
  }
  function legendItems() {
    switch (state.scene) {
      case 'ternion':
        return [
          ['cy', '[a, p₀, b]'],
          ['mg', '[b, p₀, a]'],
          ['ik', 'v₀'],
          ['am', L('当前', 'now')]
        ];
      case 'spinor':
        return [
          ['ik', L('旋量圆', 'spinor circle')],
          ['cy', L('已走的拍', 'beats walked')],
          ['mg', '−e · −gⁿ'],
          ['am', 'gⁿ']
        ];
      case 'cayley':
        return [
          ['cy', 'R(σ)ⁿv₀'],
          ['mg', 'T₂ⁿv₀'],
          ['vi', 'σ'],
          ['am', L('当前', 'now')]
        ];
      default:
        return [
          ['ik', L('凯莱圆', 'Cayley circle')],
          ['cy', L('κ 与有理点', 'κ, rational points')],
          ['am', '[P : Q]']
        ];
    }
  }
  const ACTS = {
    circle: ['下一个终点 ▸', 'Next end ▸'],
    ternion: ['⇄ 交换次序', '⇄ Swap order'],
    spinor: ['下一个生成元 ▸', 'Next generator ▸'],
    cayley: ['下一个 σ ▸', 'Next σ ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = kept(bigline(m));
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems()
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACTS[state.scene]);
    b.hidden = TRV.still;
    if (b.textContent !== text) b.textContent = text;
  }

  /* ---------- the ledger ---------- */
  const put = (id, html) => {
    const el = $(id);
    if (el.innerHTML !== html) el.innerHTML = html;
  };
  const matStr = (M, den) => `${den === 1n ? '' : `(1/${den})·`}[${M.map((row) => `(${row.map(istr).join(', ')})`).join(', ')}]`;
  function rows(m) {
    const yes = '<span class="nummark">✓</span>',
      no = ' ✗';
    switch (state.scene) {
      case 'ternion': {
        const lead = m.raw.findIndex((x) => x !== 0n),
          factor = m.raw[lead] / m.a[lead],
          kTxt = factor === 1n ? tup(m.a) : `${tup(m.raw)} = ${istr(factor)}·${tup(m.a)}`;
        return {
          key: [L('[a, p₀, b] 与 [b, p₀, a]（规范）', '[a, p₀, b] and [b, p₀, a] (canonical)'), `${tup(m.ab)} ${m.sameRay ? '=' : '≠'} ${tup(m.ba)}`, (m.sameRay ? L(' · 同一条射线', ' · one ray') : L(' · 两条射线', ' · two rays')) + ` · κ = ${fstr(m.kappa)}`],
          r: [
            [L('k·a → 规范代表（gcd，首项为正）', 'k·a → canonical (gcd, first entry positive)'), kTxt],
            [L('未约分 triad：a·b · b·a', 'Unreduced triads: a·b · b·a'), `${tup(m.abRaw)} · ${tup(m.baRaw)}`],
            [L('[a, p₀, b] 的三拍（规范）', 'Three beats of [a, p₀, b] (canonical)'), `${tup(m.ab)} → ${tup(m.pow2)} → ${tup(m.pow3)}${m.closes ? ' = p₀ ' + yes : ''}`],
            [L('Ad(a·b)v₀ = Ad(a)(Ad(qHalf)v₀) · Ad(b·a)v₀', 'Ad(a·b)v₀ = Ad(a)(Ad(qHalf)v₀) · Ad(b·a)v₀'), `${vstr(m.endAB)} ${m.homAB ? yes : no} · ${vstr(m.endBA)} ${m.homBA ? yes : no}`, 'v'],
            [L('外结合：[[a, p₀, b], a, b] 与 [a, p₀, [b, a, b]]', 'Outer associativity: [[a, p₀, b], a, b] and [a, p₀, [b, a, b]]'), m.assocOk ? L(`两侧都是 ${tup(m.assocL)} `, `both sides ${tup(m.assocL)} `) + yes : `${tup(m.assocL)} ≠ ${tup(m.assocR)}${no}`],
            [L('经典：两种次序的转角', 'Classical: the angles of both orders'), `≈ ${deg(ternAngle(m.ab), 2)}° · ${deg(ternAngle(m.ba), 2)}°`, 'm']
          ],
          note: L('a 乘以非零整数 k，规范代表不变：除以最大公约数、首个非零分量取正，用不到商公理 Quot.sound；两种次序把 v₀ = (2, 3, 6)/7 送到不同的有理点。', 'Multiplying a by a nonzero integer k leaves the canonical representative unchanged: divide by the gcd and make the first nonzero entry positive, no quotient axiom Quot.sound needed; the two orders send v₀ = (2, 3, 6)/7 to different rational points.')
        };
      }
      case 'spinor': {
        const b = m.now,
          factor = b.raw.r / b.red.r;
        return {
          key: [L(`第 ${m.k} 拍 heapAt(e, Φ, ${m.k})（约分）`, `Beat ${m.k}: heapAt(e, Φ, ${m.k}) (reduced)`), sstr(b.red), ` · κ<sub>spin</sub> = ${fstr(b.kspin)}`],
          r: [
            [L('Φ(a, b, c, d) = (a² − s, 2ab, 2ac, 2ad; a² + s)', 'Φ(a, b, c, d) = (a² − s, 2ab, 2ac, 2ad; a² + s)'), `${sstr(m.G)} → ${sstr(m.Gred)}`, 'v'],
            [L('凯莱提升：‖num‖² = r²', 'Cayley lift: ‖num‖² = r²'), `${m.liftNormSq} = ${m.G.r}² ${m.liftOk ? yes : no}`],
            [L('未约分的拍：半径 r（约分后）· ‖num‖²/r²', 'Unreduced beat: radius r (reduced) · ‖num‖²/r²'), `r = ${powStr(b.raw.r, m.G.r)}${factor > 1n ? ` (${b.red.r})` : ''} · ${fstr(b.norm)} ${same(b.norm, ONE) ? yes : no}`],
            [L('κ<sub>spin</sub>(e, gⁿ) · κ<sub>proj</sub>(e, gⁿ)', 'κ<sub>spin</sub>(e, gⁿ) · κ<sub>proj</sub>(e, gⁿ)'), `${fstr(b.kspin)} · ${fstr(b.kproj)}`],
            [L('(2κ<sub>spin</sub> − 1)² 与 κ<sub>proj</sub>', '(2κ<sub>spin</sub> − 1)² and κ<sub>proj</sub>'), `${fstr(b.bridge)} = ${fstr(b.kproj)} ${same(b.bridge, b.kproj) ? yes : no}`],
            [L('经典：转角 n·2α 与 cos(nα)', 'Classical: angle n·2α and cos(nα)'), `≈ ${deg(2 * spinAngle(m) * m.k, 1)}° · ${fix(cs(spinAngle(m) * m.k), 4)}`, 'm']
          ],
          note: L(`六拍的有号核：${m.beats.slice(1).map((x) => fstr(x.kspin)).join('、')}；射影核：${m.beats.slice(1).map((x) => fstr(x.kproj)).join('、')}。射影核把 g 与 −g 读成同一个数，有号核分得开。`, `Signed kernel over the six beats: ${m.beats.slice(1).map((x) => fstr(x.kspin)).join(', ')}; projective kernel: ${m.beats.slice(1).map((x) => fstr(x.kproj)).join(', ')}. The projective kernel reads g and −g as one number; the signed kernel tells them apart.`)
        };
      }
      case 'cayley': {
        const st = m.step,
          n = m.k,
          sigTxt = `(${m.sigma.map(fstr).join(', ')})`;
        return {
          key: [L(`‖R(σ)ⁿv₀‖²，n = ${n}`, `‖R(σ)ⁿv₀‖², n = ${n}`), fstr(m.norm), L(` · σ = ${sigTxt}`, ` · σ = ${sigTxt}`)],
          r: [
            [m.adPHalf ? L('R(σ) = Cayley(1, 0, 0) = Ad(pHalf)', 'R(σ) = Cayley(1, 0, 0) = Ad(pHalf)') : L('R(σ) = C/N（约分）', 'R(σ) = C/N (reduced)'), matStr(m.Rred.M, m.Rred.den), 'v'],
            [L('Rᵀ·R 与 det R', 'Rᵀ·R and det R'), `${m.orth ? L('= I ', '= I ') + yes : no} · det = ${fstr(m.det)}`],
            [L(`R(σ)ⁿv₀，n = ${n}`, `R(σ)ⁿv₀, n = ${n}`), vstr(m.now)],
            [L(`泰勒 ‖T₂ⁿv₀‖²，n = ${n}`, `Taylor ‖T₂ⁿv₀‖², n = ${n}`), `${fstr(m.tnorm)}${m.perp && n > 0 ? ` = (${fstr(m.M2)})${sup1(n)}` : ''}`, 'm'],
            [L(`有理 MRP 双卡 τ${sub1(Math.max(1, n))} = σ ★ τ${sub1(Math.max(1, n) - 1)}：D₊ · D₋ · D₊ + D₋`, `Rational MRP dual chart τ${sub1(Math.max(1, n))} = σ ★ τ${sub1(Math.max(1, n) - 1)}: D₊ · D₋ · D₊ + D₋`), `${fstr(st.Dp)} · ${fstr(st.Dm)} · ${fstr(st.sum)} = (1 + ${fstr(st.a)})(1 + ${fstr(st.b)}) ${same(st.sum, st.prod) ? yes : no} · max ≥ 1/2 ${cmp(st.big, [1n, 2n]) >= 0 ? yes : no}`],
            [L('经典：每步转角 2·arctan‖σ‖ · 泰勒小数', 'Classical: angle per step 2·arctan‖σ‖ · Taylor decimal'), `≈ ${deg(2 * Math.atan(Math.sqrt(fval(m.u))), 2)}° · ${fix(fval(m.tnorm), 6)}`, 'm']
          ],
          note: L(`凯莱矩阵的分子是整数、分母是 N = ${m.N}：RᵀR = I 与 ‖Rⁿv₀‖² = 1 都是整数恒等式；泰勒截断每步把垂直于 σ 的模方乘以 1 + u²/4 = ${fstr(m.M2)}。账本把同一组数 σ 另作有理 MRP 输入。双卡乘法的大分母至少是 1/2。`, `The Cayley matrix has integer numerators over N = ${m.N}: RᵀR = I and ‖Rⁿv₀‖² = 1 are integer identities; the Taylor truncation multiplies the squared norm perpendicular to σ by 1 + u²/4 = ${fstr(m.M2)} per step. The ledger also uses the same coordinates as rational MRP input. The larger denominator of the dual-chart product is at least 1/2.`)
        };
      }
      default: {
        const red = m.g > 1n ? ` = ${m.g}·${brk(m.red)}` : '';
        return {
          key: [L('凯莱像 (X, Y)', 'Cayley image (X, Y)'), `(${fstr(m.X)}, ${fstr(m.Y)})`, m.antipodal ? L(' · [p : 0] 落在对径点', ' · [p : 0] lands on the antipode') : ' · X² + Y² = 1'],
          r: [
            [L('时间轴 [kP : 16 − k + kQ]', 'Rail [kP : 16 − k + kQ]'), `k = ${m.k} → ${brk(m.raw)}${red}`],
            ['κ · spread · κ + spread', `${fstr(m.kappa)} · ${fstr(m.spread)} · ${fstr(m.sum)} ${same(m.sum, ONE) ? yes : no}`],
            [L('X² + Y²（精确）', 'X² + Y² (exact)'), `${fstr(m.unitCircle)} ${same(m.unitCircle, ONE) ? yes : no}`],
            [L('图卡 x = P/Q', 'Chart x = P/Q'), m.x ? `x = ${fstr(m.x)}` : L('q = 0：不用极限，[p : 0] 是一个普通的点', 'q = 0: no limit, [p : 0] is an ordinary point'), 'v'],
            [L('终点 [P : Q] · 锚点 [0:1] · [1:1] · [1:0] 的 κ', 'End [P : Q] · κ of the anchors [0:1] · [1:1] · [1:0]'), `${brk(m.end)} · ${m.anchors.map((a) => fstr(a.kappa)).join(' · ')}`],
            [L('经典：θ = 2·arctan(P/Q)', 'Classical: θ = 2·arctan(P/Q)'), m.x ? `≈ ${deg(2 * Math.atan(fval(m.x)), 2)}°` : L('P/Q → ∞：θ → 180°（极限）', 'P/Q → ∞: θ → 180° (a limit)'), 'm']
          ],
          note: L('κ、spread 与凯莱像都由整数对直接算出；整数对同乘一个非零整数，读数不变；q = 0 时也不需要极限。', 'κ, spread and the Cayley image come straight from the integer pair; scaling the pair by a nonzero integer leaves the readings unchanged, and q = 0 needs no limit.')
        };
      }
    }
  }
  const ROW_CLS = ['c', 'c', 'c', 'c', 'c', 'm'];
  function readings(m) {
    const R = rows(m);
    put('roKeyL', R.key[0]);
    put('roKey', kept(R.key[1]));
    put('roKeySub', kept(R.key[2]));
    R.r.forEach(([l, v, cls], i) => {
      put('roL' + (i + 1), kept(l));
      put('roV' + (i + 1), kept(v));
      const want = `${cls || ROW_CLS[i]} wide`;
      if ($('roRow' + (i + 1)).className !== want) $('roRow' + (i + 1)).className = want;
    });
    put('roNote', R.note);
    const idx = SCENES.indexOf(state.scene);
    $('scenePill').innerHTML = `${L(['射影圆', '三元数', '旋量', '凯莱'][idx], ['Circle', 'Ternion', 'Spinor', 'Cayley'][idx])} <strong>${state.lens ? 'ℝ' : 'Ω'}</strong>`;
    $('keyPill').innerHTML = `P/Q <strong>${kept(R.key[1])}</strong>`;
    $('ctlAside').textContent = `${idx + 1}/4`;
    for (const g of document.querySelectorAll('#ctlPanel .grp')) g.hidden = g.dataset.scene !== state.scene;
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(!!state.lens));
    // the dials follow the state
    const setF = (id, v) => {
      if ($(id).value !== String(v)) $(id).value = String(v);
      $(id + 'Out').textContent = istr(v);
    };
    setF('pP', state.P);
    setF('pQ', state.Q);
    ['w', 'x', 'y', 'z'].forEach((c, i) => setF('a' + c, state.a[i]));
    setF('sk', state.k);
    ['a', 'b', 'c', 'd'].forEach((c, i) => setF('l' + c, state.lift[i]));
    ['x', 'y', 'z'].forEach((c, i) => setF('s' + c, state.sig[i]));
    setF('sd', state.d);
    anchorChips.set(`${state.P}:${state.Q}`, true);
    orderChips.set(state.order, true);
    genChips.set(state.lift.join(), true);
    sigChips.set(`${state.sig.join()},${state.d}`, true);
    $('hint').textContent = L('Space 播放 · ← → 一步 · 拖空白处转视角', 'Space plays · ← → one step · drag empty space to orbit');
    $('formula').textContent = {
      circle: '[p : q] ↦ ((q² − p²)/(p² + q²), 2pq/(p² + q²))',
      ternion: '[a, b, c] = (a·conj(b))·c, then gcd and sign',
      spinor: 'κ_proj = (2κ_spin − 1)², heapAt(n + 2) = [h(n + 1), h(n), h(n + 1)]',
      cayley: 'R(σ) = ((d² − ‖s‖²)I + 2d[s]× + 2ssᵀ)/(d² + ‖s‖²)'
    }[state.scene];
  }

  /* ---------- the strip ---------- */
  const LEGEND_PX = 10.5,
    ROW = 14,
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
      need = 9 + ROW * (rws - 1) + 24,
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
  const ticks = (lo, hi, n = 4) => {
    const span = hi - lo,
      step = 10 ** Math.floor(Math.log10(span / n)),
      e = [1, 2, 5, 10].find((f) => span / (f * step) <= n) * step;
    const out = [];
    for (let v = Math.ceil(lo / e) * e; v <= hi + 1e-9; v += e) out.push([v, fix(v, e < 1 ? (e < 0.1 ? 2 : 1) : 0)]);
    return out;
  };
  function drawPlot(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const width = cv.clientWidth - PAD[0] - PAD[1] - 12;
    const frame = (items, x, lo, hi, xt) => {
      const rws = legendRows(cv, items, width);
      const g = kit.plot(cv, { x, y: [lo, headroom(cv, rws.length, lo, hi)], pad: PAD });
      g.axes({ xTicks: xt, yTicks: ticks(lo, hi) });
      return [g, rws];
    };
    if (state.scene === 'circle') {
      $('plotTitle').textContent = L('沿时间轴：κ 与 spread，和恒为 1', 'Along the rail: κ and spread, always adding up to 1');
      $('plotMeta').textContent = `k = ${m.k}/16`;
      const K = m.series.map((s, k) => [k, fval(s.kappa)]),
        S = m.series.map((s, k) => [k, fval(s.spread)]);
      const [g, rws] = frame(
        [
          [P.cyan, 'κ'],
          [P.magenta, 'spread', 'dash'],
          [P.ink, 'κ + spread']
        ],
        [-0.4, 16.4],
        -0.05,
        1.08,
        [0, 4, 8, 12, 16].map((k) => [k, String(k)])
      );
      g.hline(1, P.ink, { alpha: 0.7, width: 1.2 });
      g.hline(0, P.dim, { alpha: 0.6 });
      g.line(S, P.magenta, { width: 1.5, dash: [4, 3] });
      g.line(K, P.cyan, { width: 2 });
      K.forEach(([x, y]) => g.dot(x, y, P.cyan, 2.2));
      g.dot(m.k, fval(m.kappa), P.amber, 4.6);
      drawLegend(g, rws);
    } else if (state.scene === 'ternion') {
      $('plotTitle').textContent = L('两种次序的规范分量', 'Canonical entries of both orders');
      $('plotMeta').textContent = m.sameRay ? L('相同', 'equal') : L('不成比例', 'not proportional');
      const vals = [...m.ab, ...m.ba].map(Number),
        lo = Math.min(0, ...vals) - 0.5,
        hi = Math.max(0, ...vals) + 0.5;
      const [g, rws] = frame(
        [
          [P.cyan, '[a, p₀, b]'],
          [P.magenta, '[b, p₀, a]']
        ],
        [-0.5, 3.5],
        lo,
        hi,
        [
          [0, 'w'],
          [1, 'x'],
          [2, 'y'],
          [3, 'z']
        ]
      );
      g.hline(0, P.dim, { alpha: 0.7 });
      const bw = Math.min(16, g.iw / 14);
      range(4).forEach((i) => {
        const a = Number(m.ab[i]),
          b = Number(m.ba[i]);
        g.rect(i - 0.18 - bw / g.scale / 2, 0, i - 0.18 + bw / g.scale / 2, Math.abs(a) < 1e-9 ? 0.04 : a, P.cyan, { alpha: 0.85 });
        g.rect(i + 0.18 - bw / g.scale / 2, 0, i + 0.18 + bw / g.scale / 2, Math.abs(b) < 1e-9 ? 0.04 : b, P.magenta, { alpha: 0.85 });
      });
      drawLegend(g, rws);
    } else if (state.scene === 'spinor') {
      $('plotTitle').textContent = L('逐拍：κ_spin 与 κ_proj = (2κ_spin − 1)²', 'Beat by beat: κ_spin and κ_proj = (2κ_spin − 1)²');
      $('plotMeta').textContent = L(`第 ${m.k} 拍`, `beat ${m.k}`);
      const S = m.beats.map((b) => [b.n, fval(b.kspin)]),
        Pj = m.beats.map((b) => [b.n, fval(b.kproj)]);
      const [g, rws] = frame(
        [
          [P.cyan, 'κ_spin'],
          [P.magenta, 'κ_proj', 'dash']
        ],
        [-0.3, 6.3],
        -0.05,
        1.08,
        range(7).map((k) => [k, String(k)])
      );
      g.hline(0, P.dim, { alpha: 0.6 });
      g.hline(1, P.dim, { alpha: 0.4 });
      g.line(Pj, P.magenta, { width: 1.5, dash: [4, 3] });
      Pj.forEach(([x, y]) => g.dot(x, y, P.magenta, 2.4));
      g.line(S, P.cyan, { width: 2 });
      S.forEach(([x, y]) => g.dot(x, y, P.cyan, 2.6));
      g.dot(m.k, fval(m.now.kspin), P.amber, 4.6);
      drawLegend(g, rws);
    } else {
      $('plotTitle').textContent = L('逐步：凯莱模方恒为 1，泰勒外漂', 'Step by step: the Cayley norm stays 1, Taylor drifts');
      $('plotMeta').textContent = `n = ${m.k}`;
      const C = m.norms.map((x, n) => [n, fval(x)]),
        T = m.tnorms.map((x, n) => [n, fval(x)]),
        hi = Math.max(1.1, ...T.map((p) => p[1])) + 0.05;
      const [g, rws] = frame(
        [
          [P.cyan, '‖R(σ)ⁿv₀‖²'],
          [P.magenta, '‖T₂ⁿv₀‖²', 'dash']
        ],
        [-0.4, 12.4],
        0.9,
        hi,
        [0, 3, 6, 9, 12].map((k) => [k, String(k)])
      );
      g.line(T, P.magenta, { width: 1.6, dash: [4, 3] });
      T.forEach(([x, y]) => g.dot(x, y, P.magenta, 2.4));
      g.line(C, P.cyan, { width: 2 });
      C.forEach(([x, y]) => g.dot(x, y, P.cyan, 2.4));
      g.dot(m.k, fval(m.norm), P.amber, 4.6);
      drawLegend(g, rws);
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
    rate: RAILS.circle.rate,
    step: 1,
    max: RAILS.circle.max,
    t: STILL.circle,
    format: (t) => {
      // a counting rail names the whole step it has reached, as the ledger does
      const k = Math.floor(t + 1e-9);
      switch (state.scene) {
        case 'ternion':
          return k <= K2 / 2 ? L(`第一步 · ${k}/16`, `first turn · ${k}/16`) : L(`第二步 · ${k}/16`, `second turn · ${k}/16`);
        case 'spinor':
          return L(`第 ${clamp(k, 0, BEATS)} 拍`, `beat ${clamp(k, 0, BEATS)}`);
        case 'cayley':
          return `n = ${clamp(k, 0, NMAX)}`;
        default:
          return `k = ${k}/16`;
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
      state.at[state.scene] = c.playing ? t : Math.round(t);
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
    clock.step = 1;
    $('now').step = '1';
    const max = r.max,
      at = Math.min(state.at[state.scene], max);
    clock.setMax(max, true);
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
    change();
    setRail();
    paint();
  }
  /** A tuple of the dials: the zero tuple is no point, so the moved entry falls back to 1. */
  const nonzero = (t, i) => {
    if (t.every((v) => v === 0)) t[i] = 1;
  };
  const dialFmt = (v) => istr(v);
  kit.field($('pP'), {
    out: $('pPOut'),
    fmt: dialFmt,
    onInput: (v) =>
      steer('circle', () => {
        state.P = Math.round(v);
        if (state.P === 0 && state.Q === 0) state.Q = 1;
      })
  });
  kit.field($('pQ'), {
    out: $('pQOut'),
    fmt: dialFmt,
    onInput: (v) =>
      steer('circle', () => {
        state.Q = Math.round(v);
        if (state.P === 0 && state.Q === 0) state.P = 1;
      })
  });
  ['w', 'x', 'y', 'z'].forEach((c, i) =>
    kit.field($('a' + c), {
      out: $('a' + c + 'Out'),
      fmt: dialFmt,
      onInput: (v) =>
        steer('ternion', () => {
          state.a[i] = Math.round(v);
          nonzero(state.a, i);
        })
    })
  );
  kit.field($('sk'), {
    out: $('skOut'),
    fmt: dialFmt,
    onInput: (v) =>
      steer('ternion', () => {
        const k = Math.round(v);
        // k = 0 is no scaling of a ray: the dial steps over it in the direction it was moved
        state.k = k !== 0 ? k : state.k > 0 ? -1 : 1;
      })
  });
  ['a', 'b', 'c', 'd'].forEach((c, i) =>
    kit.field($('l' + c), {
      out: $('l' + c + 'Out'),
      fmt: dialFmt,
      onInput: (v) =>
        steer('spinor', () => {
          state.lift[i] = Math.round(v);
          nonzero(state.lift, i);
        })
    })
  );
  ['x', 'y', 'z'].forEach((c, i) =>
    kit.field($('s' + c), {
      out: $('s' + c + 'Out'),
      fmt: dialFmt,
      onInput: (v) => steer('cayley', () => (state.sig[i] = Math.round(v)))
    })
  );
  kit.field($('sd'), { out: $('sdOut'), fmt: dialFmt, onInput: (v) => steer('cayley', () => (state.d = clamp(Math.round(v), 1, 6))) });
  const anchorChips = kit.chips($('anchorChips'), 'anchor', (v) =>
    steer('circle', () => {
      const [p, q] = v.split(':').map(Number);
      state.P = p;
      state.Q = q;
      state.at.circle = K1;
      clock.set(K1, true);
    })
  );
  const orderChips = kit.chips($('orderChips'), 'order', (v) => steer('ternion', () => (state.order = v === 'ba' ? 'ba' : 'ab')));
  const genChips = kit.chips($('genChips'), 'gen', (v) => steer('spinor', () => (state.lift = v.split(',').map(Number))));
  const sigChips = kit.chips($('sigChips'), 'sig', (v) =>
    steer('cayley', () => {
      const t = v.split(',').map(Number);
      state.sig = t.slice(0, 3);
      state.d = t[3];
      sc.view(camOf('card'), TRV.still ? 0 : 600);
    })
  );
  const ENDS = [
    [1, 0],
    [-1, 0],
    [1, 1]
  ];
  const GENS = [
    [3, 1, 1, 1],
    [1, 1, 0, 0],
    [2, 1, 0, 0]
  ];
  const SIGS = [
    [1, 1, 0, 2],
    [1, 0, 0, 1],
    [1, 2, 2, 3]
  ];
  $('stageAct').addEventListener('click', () => {
    const scene = state.scene;
    if (scene === 'circle')
      steer('circle', () => {
        const k = ENDS.findIndex(([p, q]) => p === state.P && q === state.Q);
        [state.P, state.Q] = ENDS[(k + 1) % ENDS.length];
        state.at.circle = K1;
        clock.set(K1, true);
      });
    else if (scene === 'ternion') steer('ternion', () => (state.order = state.order === 'ab' ? 'ba' : 'ab'));
    else if (scene === 'spinor')
      steer('spinor', () => {
        const k = GENS.findIndex((g) => g.join() === state.lift.join());
        state.lift = GENS[(k + 1) % GENS.length].slice();
      });
    else
      steer('cayley', () => {
        const k = SIGS.findIndex((s) => s.join() === `${state.sig.join()},${state.d}`);
        const t = SIGS[(k + 1) % SIGS.length];
        state.sig = t.slice(0, 3);
        state.d = t[3];
        sc.view(camOf('card'), TRV.still ? 0 : 600);
      });
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = ['card', 'pole', 'side'].includes(v) ? v : 'card';
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
    'qp1-antipodal-circle': [
      '琥珀点沿 [k : 16 − k] 从顶上的 [0:1] 走到底部对径点：[16 : 0] = 16·[1 : 0]，κ = 0，像为 (−1, 0)。',
      'The amber point walks [k : 16 − k] from [0:1] down to the antipode: [16 : 0] = 16·[1 : 0], κ = 0, image (−1, 0).'
    ],
    'canonical-ternion-noncomm': [
      '青色先转 qHalf 再转 pHalf，品红相反：v₀ 落到两个点，(1, 1, 1, 1) ≠ (1, 1, 1, −1)。',
      'Cyan turns by qHalf then pHalf, magenta the other way: v₀ lands on two points, (1, 1, 1, 1) ≠ (1, 1, 1, −1).'
    ],
    'pythspinor-720-double-cover': [
      'g = (1, 1, 1, 1; 2) 每拍转 120°：第 3 拍落在底部 −e（有号核 0），第 6 拍回到顶上 +e（有号核 1）。',
      'g = (1, 1, 1, 1; 2) turns 120° per beat: beat 3 lands on −e (signed kernel 0), beat 6 is back on +e (kernel 1).'
    ],
    'cayley3d-vs-taylor-drift': [
      'σ = (1/2, 1/2, 0)：青色 R(σ)ⁿv₀ 十二步都在球面上；品红泰勒点每步模方乘 17/16，外漂到 2.07。',
      'σ = (1/2, 1/2, 0): cyan R(σ)ⁿv₀ stays on the sphere; the magenta Taylor point gains 17/16 per step, out to 2.07.'
    ]
  };
  const cards = kit.cards($('presets'), {
    presets: PRESETS,
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：时间轴、琥珀手柄与右栏旋钮改的是本卡的量，账本里的每个数都是约分后的整数之比。', 'Free play: the rail, the amber handle and the dials change the quantity of the card; every number of the ledger is a reduced ratio of integers.']
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
  const FRAME = { P: 12, Q: 12, box: 1, triadSet: 6, lift: 2, sig: 2, dMax: 3 };
  function benchmarks() {
    const F = FRAME,
      span = (n) => range(2 * n + 1).map((k) => k - n),
      tuples = (n, dim = 4) => {
        let out = [[]];
        for (let i = 0; i < dim; i++) out = out.flatMap((t) => span(n).map((v) => [...t, v]));
        return out.filter((t) => t.some((v) => v !== 0));
      };
    // 1. the projective circle: X² + Y² = 1, κ + spread = 1, scaling, the antipode
    let pairs = 0,
      circleBad = 0,
      scaleBad = 0,
      antipodes = 0,
      antiBad = 0;
    for (let p = -F.P; p <= F.P; p++)
      for (let q = 0; q <= F.Q; q++) {
        if (!p && !q) continue;
        pairs++;
        const P1 = BigInt(p),
          Q1 = BigInt(q),
          n2 = P1 * P1 + Q1 * Q1,
          k = frac(Q1 * Q1, n2),
          s = frac(P1 * P1, n2),
          X = frac(Q1 * Q1 - P1 * P1, n2),
          Y = frac(2n * P1 * Q1, n2);
        if (!same(plus(k, s), ONE) || !same(plus(times(X, X), times(Y, Y)), ONE)) circleBad++;
        for (const kk of [-3n, 2n, 5n]) {
          const p2 = P1 * kk,
            q2 = Q1 * kk,
            m2 = p2 * p2 + q2 * q2;
          if (!same(frac(q2 * q2, m2), k) || !same(frac(q2 * q2 - p2 * p2, m2), X) || !same(frac(p2 * q2 + q2 * p2, m2), Y)) scaleBad++;
        }
        if (q === 0) {
          antipodes++;
          if (!same(k, ZERO) || !same(s, ONE) || !same(X, [-1n, 1n]) || !same(Y, ZERO)) antiBad++;
        }
      }
    // 2. ternions: canonical lines of [−1, 1]⁴, the two orders, Ad(a·b) = Ad(a)∘Ad(b), outer associativity
    const lines = tuples(F.box)
      .map(Z4)
      .filter((t) => same4(canon(t), t));
    let ternPairs = 0,
      noncomm = 0,
      homBad = 0,
      scaleRayBad = 0;
    for (const a of lines)
      for (const b of lines) {
        ternPairs++;
        if (!same4(canon(qmul(a, b)), canon(qmul(b, a)))) noncomm++;
        if (!vsame(ad(qmul(a, b), V0T), ad(a, ad(b, V0T)))) homBad++;
      }
    for (const a of lines) for (const k of [-3n, -1n, 2n]) if (!same4(canon(a.map((v) => v * k)), a)) scaleRayBad++;
    const small = lines.slice(0, F.triadSet);
    let assocTried = 0,
      assocBad = 0;
    for (const x of small)
      for (const y of small)
        for (const z of small)
          for (const u of small)
            for (const v of small) {
              assocTried++;
              if (!same4(triadRaw(triadRaw(x, y, z), u, v), triadRaw(x, y, triadRaw(z, u, v)))) assocBad++;
            }
    // 3. spinors: the lift, the quadratic bridge, the heap norms
    const lifts = tuples(F.lift).map((t) => lift(t));
    let liftBad = 0,
      bridgeTried = 0,
      bridgeBad = 0,
      heapTried = 0,
      heapBad = 0;
    const g120Beats = heap(E, lift([3, 1, 1, 1]), BEATS);
    for (const G of lifts) {
      if (qn2(G.num) !== G.r * G.r) liftBad++;
      for (const h of g120Beats) {
        bridgeTried++;
        const d = minus(times(TWO, kspin(G, h)), ONE);
        if (!same(times(d, d), kproj(G, h))) bridgeBad++;
      }
      for (const h of heap(E, G, BEATS)) {
        heapTried++;
        if (!same(spinNorm(h), ONE)) heapBad++;
      }
    }
    // 4. Cayley: RᵀR = N²I, det = N³, twelve iterates on the sphere; the dual chart on pairs of parameters
    let sigmas = 0,
      orthBad = 0,
      detBad = 0,
      iterBad = 0;
    const params = [];
    for (let d = 1; d <= F.dMax; d++)
      for (const s of tuples(F.sig, 3).concat([[0, 0, 0]])) {
        sigmas++;
        const dd = BigInt(d),
          s0 = s.map(BigInt),
          N = dd * dd + s0.reduce((t, x) => t + x * x, 0n),
          C = cayleyNum(dd, s0),
          CtC = mmul(mT(C), C);
        if (!CtC.every((row, i) => row.every((v, j) => v === (i === j ? N * N : 0n)))) orthBad++;
        if (det3(C) !== N * N * N) detBad++;
        let v = V0C;
        for (let n = 1; n <= NMAX; n++) {
          v = vred(mvec(C, v[0]), v[1] * N);
          if (v[0].reduce((t, x) => t + x * x, 0n) !== v[1] * v[1]) iterBad++;
        }
        params.push(s0.map((x) => frac(x, dd)));
      }
    let duals = 0,
      sumBad = 0,
      boundBad = 0,
      numBad = 0;
    for (let i = 0; i < params.length; i += 7)
      for (let j = 0; j < params.length; j += 11) {
        duals++;
        const st = star(params[i], params[j]);
        if (!same(st.sum, st.prod)) sumBad++;
        if (cmp(st.big, [1n, 2n]) < 0) boundBad++;
        if (!same(st.nN, times(st.Dp, st.Dm)) || cmp(st.outN, ONE) > 0) numBad++;
      }
    return { pairs, circleBad, scaleBad, antipodes, antiBad, lines: lines.length, ternPairs, noncomm, homBad, scaleRayBad, assocTried, assocBad, lifts: lifts.length, liftBad, bridgeTried, bridgeBad, heapTried, heapBad, sigmas, orthBad, detBad, iterBad, duals, sumBad, boundBad, numBad };
  }
  const BENCH = benchmarks();
  const C1 = circleOf({ P: 1, Q: 0, at: { circle: K1 } }),
    T1 = ternionOf({ a: [1, 1, 0, 0], k: -2, order: 'ab', at: { ternion: K2 } }),
    S1 = spinorOf({ lift: [3, 1, 1, 1], at: { spinor: BEATS } }),
    R1 = cayleyOf({ sig: [1, 1, 0], d: 2, at: { cayley: NMAX } });
  const NUMBERS = {
    antiK: () => fstr(C1.kappa),
    antiS: () => fstr(C1.spread),
    antiXY: () => `(${fstr(C1.X)}, ${fstr(C1.Y)})`,
    ab: () => tup(T1.ab),
    ba: () => tup(T1.ba),
    kab: () => fstr(T1.kappa),
    endAB: () => vstr(T1.endAB),
    endBA: () => vstr(T1.endBA),
    lift: () => sstr(S1.G),
    kspin: (say) => S1.beats.slice(1).map((b) => fstr(b.kspin)).join(say('、', ', ')),
    kproj: (say) => S1.beats.slice(1).map((b) => fstr(b.kproj)).join(say('、', ', ')),
    beat3: () => sstr(S1.beats[3].red),
    beat6: () => sstr(S1.beats[6].red),
    R: () => matStr(R1.Rred.M, R1.Rred.den),
    den12: () => String(R1.iter[NMAX][1]),
    n12: () => fstr(R1.norms[NMAX]),
    t12: () => `${fstr(R1.tnorms[NMAX])} ≈ ${fix(fval(R1.tnorms[NMAX]), 4)}`,
    dplus: () => fstr(star(R1.sigma, R1.sigma).Dp),
    dminus: () => fstr(star(R1.sigma, R1.sigma).Dm),
    dsum: () => fstr(star(R1.sigma, R1.sigma).sum)
  };
  function numText(say) {
    const B = BENCH,
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`);
    return say(
      `打开页面时由脚本用大整数现算，是上面各条定理与推导的个别实例，不检验定理的前提。射影圆：|P| ≤ ${FRAME.P}、0 ≤ Q ≤ ${FRAME.Q} 的 ${B.pairs} 个齐次对上，κ + spread = 1 与 X² + Y² = 1 ${bad(B.circleBad)}，乘以 −3、2、5 后 κ 与凯莱像不变${bad(B.scaleBad)}，${B.antipodes} 个 [p : 0] 都落在 κ = 0、spread = 1、(−1, 0)，${bad(B.antiBad)}。三元数：坐标在 [−${FRAME.box}, ${FRAME.box}] 的 ${B.lines} 条规范射线两两组成 ${B.ternPairs} 对，其中 ${B.noncomm} 对的两种次序不是同一条射线；Ad(a·b)v₀ = Ad(a)(Ad(b)v₀) ${bad(B.homBad)}；乘以 −3、−1、2 后规范代表不变${bad(B.scaleRayBad)}；${B.assocTried} 组 (x, y, z, u, v) 上外结合律${bad(B.assocBad)}。旋量：坐标在 [−${FRAME.lift}, ${FRAME.lift}] 的 ${B.lifts} 个非零四元组的凯莱提升 ‖num‖² = r² ${bad(B.liftBad)}，与 g120 的七拍组成的 ${B.bridgeTried} 对上二次桥${bad(B.bridgeBad)}，以它们为生成元的 ${B.heapTried} 个流群拍模方为 1，${bad(B.heapBad)}。凯莱：分子在 [−${FRAME.sig}, ${FRAME.sig}]、1 ≤ d ≤ ${FRAME.dMax} 的 ${B.sigmas} 个 σ 上 CᵀC = N²I ${bad(B.orthBad)}，det C = N³ ${bad(B.detBad)}，十二步 ‖Rⁿv₀‖² = 1 ${bad(B.iterBad)}；${B.duals} 对参数的双卡乘法 D₊ + D₋ = (1 + a)(1 + b) ${bad(B.sumBad)}，max(D₊, D₋) ≥ 1/2 ${bad(B.boundBad)}，‖N‖² = D₊D₋ 且结果落在单位闭球内${bad(B.numBad)}。数值演示，不是证明。`,
      `Computed in big integers by the script when the page opens, single instances of the theorems and derivations above; it does not check their hypotheses. Projective circle: on ${B.pairs} homogeneous pairs with |P| ≤ ${FRAME.P}, 0 ≤ Q ≤ ${FRAME.Q}, κ + spread = 1 and X² + Y² = 1, ${bad(B.circleBad)}; κ and the Cayley image unchanged by the factors −3, 2, 5, ${bad(B.scaleBad)}; all ${B.antipodes} pairs [p : 0] land at κ = 0, spread = 1, (−1, 0), ${bad(B.antiBad)}. Ternions: the ${B.lines} canonical rays with entries in [−${FRAME.box}, ${FRAME.box}] form ${B.ternPairs} pairs, and for ${B.noncomm} of them the two orders are different rays; Ad(a·b)v₀ = Ad(a)(Ad(b)v₀), ${bad(B.homBad)}; canonical representatives unchanged by the factors −3, −1, 2, ${bad(B.scaleRayBad)}; outer associativity on ${B.assocTried} quintuples (x, y, z, u, v), ${bad(B.assocBad)}. Spinors: the Cayley lifts of the ${B.lifts} nonzero quadruples with entries in [−${FRAME.lift}, ${FRAME.lift}] have ‖num‖² = r², ${bad(B.liftBad)}; the quadratic bridge on ${B.bridgeTried} pairs with the seven beats of g120, ${bad(B.bridgeBad)}; ${B.heapTried} heap beats generated by them have squared norm 1, ${bad(B.heapBad)}. Cayley: on ${B.sigmas} parameters σ with numerators in [−${FRAME.sig}, ${FRAME.sig}] and 1 ≤ d ≤ ${FRAME.dMax}, CᵀC = N²I, ${bad(B.orthBad)}; det C = N³, ${bad(B.detBad)}; ‖Rⁿv₀‖² = 1 for twelve steps, ${bad(B.iterBad)}; on ${B.duals} pairs of parameters the dual chart has D₊ + D₋ = (1 + a)(1 + b), ${bad(B.sumBad)}, max(D₊, D₋) ≥ 1/2, ${bad(B.boundBad)}, and ‖N‖² = D₊D₋ with the result in the closed unit ball, ${bad(B.numBad)}. A numerical illustration, not a proof.`
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
  window.OMEGASPIN_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        preset: cards.current,
        lens: state.lens,
        P: state.P,
        Q: state.Q,
        a: state.a,
        k: state.k,
        order: state.order,
        lift: state.lift,
        sig: state.sig,
        d: state.d,
        at: state.at,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        cam: state.cam,
        camera: { ...sc.cam },
        ledger: { ...m, series: undefined },
        key: $('roKey').textContent
      });
    },
    presets: plain(PRESETS),
    bench: () => plain(BENCH),
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
