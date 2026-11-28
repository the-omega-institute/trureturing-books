/* OMEGA//PRIMORIAL · 级联素数阶乘、游标分辨率与有限寄存器封顶 · primorial cascade, Vernier resolution and the finite
   register cap (Chapter 31, §31.8)
   World (kit.solid): z up. One lit object per card, each drawn from exact big-integer arithmetic:
     ray      a T-sided prism with the integers wound round it, T to a turn, so that a residue class r + mT is a vertical
              rail; the rails r = 1 and r = 5 carry a bead per m (cyan prime, magenta composite, ink 1); the two lines of
              arithmetic put a composite on every rail: m = T + 2 gives (T + 1)² on r = 1, m = r gives r(1 + T) on r > 1;
              the magenta ring on the floor is the quotient ℤ/T that a fixed period keeps replaying (a reading, MODEL)
     wheel    the integers 2 … N on a coil of 30 a turn round a lit core: base primes violet, closed residues muted,
              open hits cyan (prime) or magenta (composite); the violet ring at the square horizon p_{k+1}²
     jit      a lit violet ternion sphere [1 : 0 : 0 : 0] (q⁰ = 1, no slot), the five states S0 … S4 above it and the minted
              registers on a bus round it; a camera-facing beam of the finite adelic ledger of r
     vernier  a glass sphere T₃(ℚ) whose height is 2κ − 1: the box ratios ∏ p^v nearest 1 crowd to the equator κ = 1/2;
              a camera-facing caliper magnifies Δκ of the box minimum and of the full-support witness
     tower    a glass sphere among prime pillars (height = exponent): the serial FRACTRAN path winds round it beat by beat,
              the one-beat lemma arc goes straight from the input to the target
     crt      an observer sphere inside six prime rings (awake cyan, dark violet), the CRT ring ℤ/P_K# and an 8-slot memory
   The lens changes the frame of reference only: lens 1 (MODEL) adds the fixed-period loop and an ℵ₀ tape of blanks.
   Every number shown is computed here; integers that can grow are BigInt. Read-only probe: window.__primorialVernierLab. */
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
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / (norm(a) || 1));
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fmt = (x, d = 3) => kit.fix(x, d);
  const ZUP = [0, 0, 1];
  const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = (n) => String(n).replace(/\d/g, (c) => SUPS[c]);
  const subd = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  const sub2 = (x) => `<sub>${x}</sub>`;
  /** Digits in groups of three: 30,030 and 6,469,693,230. */
  const group = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  /* ---------- exact arithmetic ---------- */
  const PRIMES = (() => {
    const out = [];
    for (let n = 2; out.length < 64; n++) if (out.every((p) => p * p > n || n % p)) out.push(n);
    return out;
  })();
  const gcdN = (a, b) => {
    a = abs(a);
    b = abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };
  const gcdB = (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) [a, b] = [b, a % b];
    return a;
  };
  /** A fraction [p, q] of big integers in lowest terms, q > 0. */
  const frac = (p, q = 1n) => {
    if (q < 0n) [p, q] = [-p, -q];
    const g = gcdB(p, q) || 1n;
    return [p / g, q / g];
  };
  const fstr = ([p, q]) => String(p).replace('-', '−') + (q === 1n ? '' : '/' + q);
  const fval = ([p, q]) => Number(p) / Number(q);
  /** The least prime factor of a big integer n ≥ 2, by trial division. */
  function spfB(n) {
    if (n % 2n === 0n) return 2n;
    for (let d = 3n; d * d <= n; d += 2n) if (n % d === 0n) return d;
    return n;
  }
  const isPrimeB = (n) => n >= 2n && spfB(n) === n;
  const isPrimeN = (n) => {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  };
  const prodB = (xs) => xs.reduce((a, p) => a * BigInt(p), 1n);
  const totB = (xs) => xs.reduce((a, p) => a * BigInt(p - 1), 1n);
  /** The prime factorization of a positive big integer: [[p, e], …]. */
  function factorB(n) {
    const out = [];
    for (let d = 2n; d * d <= n; d += d === 2n ? 1n : 2n) {
      let e = 0;
      while (n % d === 0n) {
        n /= d;
        e++;
      }
      if (e) out.push([Number(d), e]);
    }
    if (n > 1n) out.push([Number(n), 1]);
    return out;
  }
  const valB = (n, p) => {
    let e = 0;
    const P_ = BigInt(p);
    while (n > 0n && n % P_ === 0n) {
      n /= P_;
      e++;
    }
    return e;
  };
  /** a × b for a composite, from its least prime factor. */
  const timesText = (pair) => (pair ? `${group(pair[0])} × ${group(pair[1])}` : '');

  /** The residue rail r + mT at m: its value, whether it is composite, and the least prime factor with its cofactor. */
  function evalStaticRay(T, r, m) {
    const n = BigInt(r) + BigInt(m) * BigInt(T),
      comp = n > 1n && !isPrimeB(n),
      f = comp ? spfB(n) : null;
    return { value: String(n), isComposite: comp, factorPair: comp ? [String(f), String(n / f)] : null };
  }
  /** The least prime factor of n and its cofactor, or null for 1 and the primes. */
  const pairOf = (n) => evalStaticRay(1, n, 0).factorPair;
  /** The m at which the two lines of arithmetic put a composite on the rail r + mT: T + 2 for r = 1, r for r > 1. */
  const killM = (T, r) => (r === 1 ? T + 2 : r);

  /** The wheel of the first k primes: M_k, φ(M_k), the square horizon p_{k+1}², the open integers inside (1, p_{k+1}²),
      the first composite on an open spoke and the errors inside the horizon. */
  const WHEELS = new Map();
  function evalPrimorialWheel(k) {
    if (WHEELS.has(k)) return WHEELS.get(k);
    const base = PRIMES.slice(0, k),
      next = PRIMES[k],
      horizon = next * next,
      open = (n) => base.every((p) => n % p);
    const inside = [];
    for (let n = 2; n < horizon; n++) if (open(n)) inside.push(n);
    let leak = 0;
    for (let n = 2; !leak; n++) if (open(n) && !isPrimeN(n)) leak = n;
    const out = { primes: base, primorial: String(prodB(base)), totient: String(totB(base)), squareHorizon: horizon, newPrimesInHorizon: inside, firstCompositeLeak: leak, errorsInHorizon: inside.filter((n) => !isPrimeN(n)).length };
    WHEELS.set(k, out);
    return out;
  }
  /** The registers minted from the seed 2: each beat takes the least n > 1 coprime to all registers (the next prime) and
      mints it while n ≤ M_Ω; the first n > M_Ω is rejected and the machine halts. */
  const GROWN = new Map();
  function growUntilHorizon(Momega) {
    const M = Math.floor(Number(Momega));
    if (GROWN.has(M)) return GROWN.get(M);
    const primes = [];
    let next = 2;
    while (next <= M) {
      primes.push(next);
      let n = next + 1;
      while (primes.some((p) => n % p === 0)) n++;
      next = n;
    }
    const out = { primes, nextCandidate: next, primorial: String(prodB(primes)), halted: next > M };
    GROWN.set(M, out);
    return out;
  }
  const kmaxOf = (M) => growUntilHorizon(M).primes.length;
  /** The least spread 1 − w²/p over the integer quaternions w + xi + yj + zk of norm p, found by enumeration. */
  function sMin(p) {
    let best = -1;
    for (let w = 0; w * w <= p; w++)
      for (let x = 0; w * w + x * x <= p; x++)
        for (let y = 0; w * w + x * x + y * y <= p; y++) {
          const z2 = p - w * w - x * x - y * y,
            z = Math.round(Math.sqrt(z2));
          if (z * z === z2 && w * w > best) best = w * w;
        }
    return frac(BigInt(p - best), BigInt(p));
  }
  /** The finite adelic ledger of r = num/den: its support, |r|_∞, ∏ |r|_p over the support and the total. */
  function finiteAdelicProduct(num, den) {
    let [a, b] = frac(BigInt(num), BigInt(den));
    if (a < 0n) a = -a;
    const support = [...factorB(a), ...factorB(b)].map(([p]) => p).sort((x, y) => x - y);
    let padic = [1n, 1n];
    const norms = support.map((p) => {
      const v = valB(a, p) - valB(b, p),
        pw = BigInt(p) ** BigInt(abs(v)),
        nr = v > 0 ? [1n, pw] : [pw, 1n];
      padic = frac(padic[0] * nr[0], padic[1] * nr[1]);
      return { p, v, norm: nr };
    });
    const total = frac(a * padic[0], b * padic[1]);
    return { support, archimedean: [String(a), String(b)], padicProduct: padic.map(String), total: total.map(String), norms, arch: [a, b], padic, totalQ: total };
  }
  const ADELIC = [
    [12, 5],
    [42, 11],
    [1716, 1715],
    [10648, 10647]
  ];

  /** The Vernier box of the first K primes with exponents |v_i| ≤ H: the least ratio above 1, the least full-support
      superparticular ratio (n + 1)/n (all v_i ≠ 0), Δκ = 1/2 − κ with κ = b²/(a² + b²) for a/b, and the ratios nearest 1. */
  const VCACHE = new Map();
  const GOLD = 0.6180339887498949;
  const PHASE = range(16).map((i) => TAU * (((i + 1) * GOLD) % 1));
  function vernierCore(K, H) {
    const key = K + ',' + H;
    if (VCACHE.has(key)) return VCACHE.get(key);
    const ps = PRIMES.slice(0, K),
      side = 2 * H + 1,
      count = side ** K,
      logs = ps.map(Math.log),
      Ls = new Float64Array(count);
    const vecOf = (idx) => {
      const v = [];
      for (let i = 0; i < K; i++) {
        v.push((idx % side) - H);
        idx = Math.floor(idx / side);
      }
      return v;
    };
    // a/b < c/d for the gaps of ratios above 1, decided in big integers when the doubles come close
    const less = (x, y) => {
      const gx = (x.num - x.den) / x.den,
        gy = (y.num - y.den) / y.den;
      if (abs(gx - gy) > 1e-9 * Math.max(gx, gy)) return gx < gy;
      return BigInt(x.num) * BigInt(y.den) < BigInt(y.num) * BigInt(x.den);
    };
    let best = null,
      wit = null,
      above = 0;
    for (let idx = 0; idx < count; idx++) {
      let t = idx,
        num = 1,
        den = 1,
        lg = 0,
        full = true;
      for (let i = 0; i < K; i++) {
        const e = (t % side) - H;
        t = Math.floor(t / side);
        if (e > 0) num *= ps[i] ** e;
        else if (e < 0) den *= ps[i] ** -e;
        else full = false;
        lg += e * logs[i];
      }
      Ls[idx] = lg;
      if (num > den) {
        above++;
        const c = { num, den, idx };
        if (!best || less(c, best)) best = c;
        if (full && num === den + 1 && (!wit || less(c, wit))) wit = c;
      }
    }
    const dk = (c) => {
      const a = BigInt(c.num),
        b = BigInt(c.den);
      return frac(a * a - b * b, 2n * (a * a + b * b));
    };
    // the ratios nearest 1 (both sides), for the constellation
    const NPTS = 150,
      sorted = Float64Array.from(Ls, Math.abs).sort(),
      cut = sorted[Math.min(sorted.length - 1, NPTS)],
      near = [];
    for (let idx = 0; idx < count && near.length < NPTS + 1; idx++) if (abs(Ls[idx]) <= cut && Ls[idx] !== 0) near.push({ idx, L: Ls[idx], v: vecOf(idx) });
    const phase = (v) => v.reduce((s, e, i) => s + e * PHASE[i], 0);
    const out = {
      K,
      H,
      primes: ps,
      count,
      above,
      best: { ...best, v: vecOf(best.idx), L: Ls[best.idx], dk: dk(best) },
      wit: wit ? { ...wit, v: vecOf(wit.idx), L: Ls[wit.idx], dk: dk(wit) } : null,
      near,
      phase
    };
    VCACHE.set(key, out);
    return out;
  }
  function vernierStats(K, H) {
    const c = vernierCore(clamp(Math.round(K), 1, 6), clamp(Math.round(H), 1, 3));
    return {
      stateCount: String(BigInt(c.count)),
      boxMin: [String(c.best.num), String(c.best.den)],
      boxExponents: c.best.v.slice(),
      fullSupportWitness: c.wit ? [String(c.wit.num), String(c.wit.den)] : null,
      kappaShift: c.best.dk.map(String)
    };
  }

  /** FRACTRAN in big integers: each beat fires the first fraction whose denominator divides n. */
  const MULT = [[455, 33], [11, 13], [1, 11], [3, 7], [11, 2], [1, 3]];
  const PRIMEGAME = [[17, 91], [78, 85], [19, 51], [23, 38], [29, 33], [77, 29], [95, 23], [77, 19], [1, 17], [11, 13], [13, 11], [15, 2], [1, 7], [55, 1]];
  function fractranTrace(prog, start, stop, limit) {
    const F = prog.map(([a, b]) => [BigInt(a), BigInt(b)]);
    let n = BigInt(start);
    const trace = [n],
      fired = [];
    for (let s = 0; s < limit; s++) {
      const k = F.findIndex(([, d]) => n % d === 0n);
      if (k < 0) return { trace, fired, halted: true };
      n = (n / F[k][1]) * F[k][0];
      trace.push(n);
      fired.push(k);
      if (stop && stop(n)) return { trace, fired, halted: false };
    }
    return { trace, fired, halted: false };
  }
  const expOf = (n, primes) => primes.map((p) => valB(n, p));
  const TOWER = (() => {
    const make = (name, prog, start, stop, limit, primes, target) => {
      const r = fractranTrace(prog, start, stop, limit),
        peak = r.trace.reduce((m, x) => (x > m ? x : m), 0n),
        logs = r.trace.map((x) => Math.log(Number(x)));
      return { name, ...r, primes, input: BigInt(start), target, beats: r.trace.length - 1, peak, peakAt: r.trace.indexOf(peak), logs, logMax: Math.log(Number(peak)), exps: r.trace.map((x) => expOf(x, primes)) };
    };
    return {
      multiply: make('multiply', MULT, 36, null, 200, [2, 3, 5, 7, 11, 13], 625n),
      primegame: make('primegame', PRIMEGAME, 2, (n) => n === 32n, 2000, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29], 32n)
    };
  })();
  /** The residues of 7 and 37 modulo P_K#: they collide while P_K# divides 30 = 37 − 7. */
  function crtAt(K) {
    const ps = PRIMES.slice(0, K),
      M = prodB(ps),
      rx = 7n % M,
      ry = 37n % M;
    let w = 1;
    while (30 % PRIMES[w - 1] === 0) w++;
    return { K, primes: ps, M, rx, ry, collide: rx === ry, witness: w, g77: gcdB(77n, M), states: 7n ** BigInt(K), injectiveUpTo: M - 1n, mem: 8 };
  }

  /* ---------- the state: one rail value per card, and the dials ---------- */
  const SCENES = ['ray', 'wheel', 'jit', 'vernier', 'tower', 'crt'];
  const FRESH = { T: 6, r: 1, M: 15, adelic: 0, vh: 3, prog: 'multiply' };
  const stillOf = (scene, s = state) => ({ ray: killM(s.T, s.r), wheel: 2, jit: kmaxOf(s.M), vernier: 5, tower: TOWER[s.prog].beats, crt: 1 })[scene];
  const state = { scene: 'ray', lens: 0, lensT: 0, fade: 1, ...FRESH, at: { ray: 8, wheel: 2, jit: 6, vernier: 5, tower: 18, crt: 1 } };
  /** The rail of a card: its length, speed (units per second), keyboard step and whether it rests on whole stops. */
  function railOf(scene, s = state) {
    switch (scene) {
      case 'ray':
        return { max: s.T + 3, rate: 2.4, whole: true };
      case 'wheel':
        return { max: 4, rate: 0.9, whole: true };
      case 'jit':
        return { max: kmaxOf(s.M), rate: 0.7, whole: false };
      case 'vernier':
        return { max: 5, rate: 0.9, whole: true };
      case 'tower':
        return { max: TOWER[s.prog].beats, rate: s.prog === 'multiply' ? 3 : 36, whole: false };
      default:
        return { max: 8, rate: 1, whole: true };
    }
  }
  const settled = (v) => (abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v);
  function compute(s) {
    // ray
    const T = s.T,
      mMax = T + 3,
      vRay = clamp(s.at.ray, 0, mMax),
      mRay = Math.round(vRay);
    const lanes = [1, 5].map((r) => ({ r, kill: killM(T, r), beads: range(mMax + 1).map((m) => ({ m, ...evalStaticRay(T, r, m) })) }));
    const ray = { T, r: s.r, v: vRay, m: mRay, mMax, cur: evalStaticRay(T, s.r, mRay), kill: killM(T, s.r), killRay: evalStaticRay(T, s.r, killM(T, s.r)), lanes, other: s.r === 1 ? 5 : 1 };
    ray.otherKill = evalStaticRay(T, ray.other, killM(T, ray.other));
    // wheel
    const vW = clamp(s.at.wheel, 0, 4),
      k = Math.round(vW) + 1,
      W = evalPrimorialWheel(k);
    const wheel = { v: vW, k, W, next: PRIMES[k] };
    // jit
    const G = growUntilHorizon(s.M),
      Kmax = G.primes.length,
      vJ = clamp(s.at.jit, 0, Kmax),
      whole = Math.min(Kmax, Math.floor(vJ + 1e-9)),
      f = vJ - whole < 1e-9 ? 0 : vJ - whole;
    const node = vJ === 0 ? 0 : f === 0 ? 4 : 1 + Math.min(3, Math.floor(f * 4));
    const cand = whole < Kmax ? G.primes[whole] : G.nextCandidate;
    const ad = finiteAdelicProduct(...ADELIC[s.adelic]);
    const jit = { v: vJ, whole, f, node, G, Kmax, minted: G.primes.slice(0, whole), cand, accepted: cand <= s.M, halted: whole === Kmax && f === 0 && Kmax > 0, M: s.M, ad, product: prodB(G.primes.slice(0, whole)) };
    // vernier
    const vV = clamp(s.at.vernier, 0, 5),
      K = Math.round(vV) + 1,
      core = vernierCore(K, s.vh);
    const vernier = { v: vV, K, H: s.vh, core };
    // tower
    const tw = TOWER[s.prog],
      vT = clamp(s.at.tower, 0, tw.beats),
      beat = Math.min(tw.beats, Math.floor(vT + 1e-9));
    const tower = { v: vT, beat, tw, N: tw.trace[beat], exps: tw.exps[beat], lemma: clamp(vT, 0, 1) };
    // crt
    const vC = clamp(s.at.crt, 0, 8),
      KC = Math.round(vC) + 2;
    const crt = { v: vC, ...crtAt(KC) };
    return { ray, wheel, jit, vernier, tower, crt };
  }
  const calc = () => compute(state);

  /* ---------- the stage ---------- */
  const CAMS = {
    ray: [-PI / 2, 0.3],
    wheel: [-PI / 2 + 0.3, 0.36],
    jit: [-PI / 2 + 0.32, 0.4],
    vernier: [-PI / 2 + 0.3, 0.22],
    tower: [-PI / 2 + 0.25, 0.34],
    crt: [-PI / 2 + 0.42, 0.42]
  };
  /** The azimuth the camera of a card sees face on. */
  const frontAz = (scene) => {
    const y = CAMS[scene][0];
    return Math.atan2(-cs(y), -sn(y));
  };
  const PRESETS = {
    'static-period-composite-refutation': { scene: 'ray', play: false, still: 8 },
    'primorial-wheel-square-horizon': { scene: 'wheel', play: false, still: 2 },
    'jit-allocator-epsilon-horizon-cap': { scene: 'jit', play: false, still: 6 },
    'rational-vernier-caliper-sphere': { scene: 'vernier', play: false, still: 5 },
    'minsky-tower-vs-lemma-shortcut': { scene: 'tower', play: false, still: 18 },
    'crt-dark-sector-and-memory-refresh': { scene: 'crt', play: false, still: 1 }
  };
  const DEFAULT = 'static-period-composite-refutation';
  const CARD_OF = Object.fromEntries(Object.entries(PRESETS).map(([id, p]) => [p.scene, id]));

  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: CAMS.ray[0], pitch: CAMS.ray[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(CAMS.ray[0], CAMS.ray[1]);
  /** A point x to the right, y up and d towards the viewer, as the camera sees it now. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  const narrow = () => stage.clientWidth < 520 || stage.clientWidth < stage.clientHeight * 0.95;
  const tiny = () => stage.clientWidth < 480 || stage.clientHeight < 330;

  /* the drawing primitives; a translucent keyed object takes a key of its own, because a key keeps its first shader */
  const eff = (s, a) => (s.alpha == null ? 1 : s.alpha) * a;
  const surf = (key, f, s, a = 1) => a > 0.01 && sc.surface(eff(s, a) < 0.99 ? key + '~' : key, f, { ...s, alpha: eff(s, a) });
  const poly = (key, mesh, s, a = 1) => a > 0.01 && sc.poly(eff(s, a) < 0.99 ? key + '~' : key, mesh, { ...s, alpha: eff(s, a) });
  const tube = (key, pts, color, r, a = 1, glow = 0.35) => a > 0.01 && pts.length > 1 && sc.tube(a < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha: a });
  const line = (pts, s, a = 1) => a > 0.01 && pts.length > 1 && sc.line(pts, { ...s, alpha: eff(s, a) });
  const bead = (p, s, a = 1) => a > 0.01 && sc.bead(p, { ...s, alpha: eff(s, a) });
  const ring = (p, s, a = 1) => a > 0.01 && sc.ring(p, { ...s, alpha: eff(s, a) });
  const circle = (c, n, r, s, a = 1) => a > 0.01 && sc.circle(c, n, r, { ...s, alpha: eff(s, a) });
  const px = (n) => n / (sc.unit || 1);
  /** Small octahedra, one per point: muted ticks and constellations in one mesh. */
  function dotsMesh(pts, s) {
    const V = [],
      F = [];
    for (const p of pts) {
      const b = V.length;
      V.push([p[0] + s, p[1], p[2]], [p[0] - s, p[1], p[2]], [p[0], p[1] + s, p[2]], [p[0], p[1] - s, p[2]], [p[0], p[1], p[2] + s], [p[0], p[1], p[2] - s]);
      for (const [i, j, l] of [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]]) F.push([b + i, b + j, b + l]);
    }
    return { vertices: V, faces: F };
  }
  /** A box with the axes e (unit), width w along e[0], height h along e[1] from the base b, depth d along e[2]. */
  function boxMesh(b, e, w, h, d) {
    const V = [];
    for (const y of [0, h]) for (const z of [-d / 2, d / 2]) for (const x of [-w / 2, w / 2]) V.push(add(add(add(b, scale(e[0], x)), scale(e[1], y)), scale(e[2], z)));
    return { vertices: V, faces: [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]] };
  }
  /** A flat disc floor at height z, radius r, darker at the middle. */
  const floorDisc = (key, z, r, a, c = [0, 0]) => surf(key, (u, v) => [c[0] + r * u * cs(v), c[1] + r * u * sn(v), z], { u: [0.02, 1], v: [0, TAU], nu: 10, nv: 96, colors: [P.stage, P.faint], range: [0, 1], value: (u) => 0.25 + 0.6 * u, pick: false }, a);
  /** The far hemisphere of a ball about the present view, opaque and tinted: the ball reads as a ball, its inside visible. */
  function bowl(key, c, r, a, tint = 0.2) {
    const D = sc.facing(),
      e1 = unit(cross(D, abs(D[2]) < 0.9 ? ZUP : [1, 0, 0])),
      e2 = cross(D, e1);
    surf(key, (u, v) => add(c, scale(add(scale(D, -cs(u)), add(scale(e1, sn(u) * cs(v)), scale(e2, sn(u) * sn(v)))), r)), { u: [0, PI / 2], v: [0, TAU], nu: 18, nv: 72, colors: [P.stage, P.violet], range: [0, 1], value: (u) => tint * (0.55 + 0.45 * u / (PI / 2)), pick: false }, a);
  }
  /** A lit ball with a gradient from the floor up, and a faint grid of meridians and parallels. */
  const ball = (key, c, r, a, colors = [P.stage, P.violet]) =>
    surf(key, (u, v) => add(c, [r * sn(v) * cs(u), r * sn(v) * sn(u), r * cs(v)]), { u: [0, TAU], v: [0.001, PI - 0.001], nu: 64, nv: 32, colors, range: [-r, r * 1.1], value: (u, v) => r * cs(v), grid: { every: [8, 8], color: P.violet, alpha: 0.22 }, pick: false }, a);

  /* ray: the T-sided prism */
  const RAY = { rho: 0.5, zA: -0.92, zB: 1.02, floor: -1.06, rf: 1.1 };
  const RAYG = new Map();
  function rayGeom(T) {
    if (RAYG.has(T)) return RAYG.get(T);
    const a1 = TAU / T,
      a5 = (TAU * 5) / T,
      mid = Math.atan2(sn(a1) + sn(a5), cs(a1) + cs(a5)),
      c0 = frontAz('ray') - mid,
      w = TAU / T;
    const mMax = T + 3,
      dz = (RAY.zB - RAY.zA) / (mMax + 1);
    const ang = (n) => c0 + (TAU * n) / T;
    const z = (n) => RAY.zA + (n / T) * dz;
    const face = (th) => {
      let u = (((th - c0) % w) + w) % w;
      if (u > w / 2) u -= w;
      return RAY.rho / cs(u);
    };
    const at = (n, lift = 0) => {
      const th = ang(n),
        rr = face(th) + lift;
      return [rr * cs(th), rr * sn(th), z(n)];
    };
    const out = (r) => [cs(ang(r)), sn(ang(r)), 0];
    const rail = (r, m, lift = 0.045) => add(scale(out(r), RAY.rho + lift), [0, 0, z(r + m * T)]);
    const corner = RAY.rho / cs(PI / T),
      z0 = RAY.zA - 0.07,
      z1 = RAY.zB + 0.05,
      V = [];
    for (const zz of [z0, z1]) for (let j = 0; j < T; j++) V.push([corner * cs(ang(j) - w / 2), corner * sn(ang(j) - w / 2), zz]);
    const F = range(T).map((j) => [j, (j + 1) % T, T + ((j + 1) % T), T + j]);
    F.push(range(T).map((j) => T + j), range(T).map((j) => T - 1 - j));
    const g = { T, mMax, dz, ang, z, at, out, rail, mesh: { vertices: V, faces: F }, corner, z0, z1 };
    RAYG.set(T, g);
    return g;
  }
  function drawRay(m, a) {
    const R = m.ray,
      T = R.T,
      G = rayGeom(T),
      lens = state.lensT;
    floorDisc('rayFloor', RAY.floor, RAY.rf, a);
    poly('prism', G.mesh, { colors: [...range(T).map((j) => (gcdN(j, T) === 1 ? P.violet : P.faint)), P.violet, P.faint], edges: P.ink, pick: false }, a);
    // one spoke per residue on the floor; the spokes of the two rails cyan
    for (let j = 0; j < T; j++) {
      const th = G.ang(j),
        rail = j === 1 % T || j === 5 % T;
      line([[0.6 * cs(th), 0.6 * sn(th), RAY.floor + 0.004], [RAY.rf * 0.96 * cs(th), RAY.rf * 0.96 * sn(th), RAY.floor + 0.004]], { color: rail ? P.cyan : P.dim, width: rail ? 1.8 : 1, alpha: rail ? 0.85 : 0.4 }, a);
    }
    // the quotient ℤ/T: the floor ring a fixed period keeps replaying (a reading, MODEL)
    circle([0, 0, RAY.floor + 0.006], ZUP, 0.86, { color: P.magenta, width: 1.4 + 1.6 * lens, fade: false }, (0.5 + 0.45 * lens) * a);
    const ra = G.ang(R.r) + 0.5,
      tip = [0.86 * cs(ra), 0.86 * sn(ra), RAY.floor + 0.006],
      tan = [-sn(ra), cs(ra), 0];
    sc.arrow(sub(tip, scale(tan, 0.12)), tip, { color: P.magenta, width: 1.6 + lens, headSize: 9, alpha: (0.55 + 0.4 * lens) * a });
    if (lens > 0.01)
      for (let mm = 0; mm <= G.mMax; mm++) circle([0, 0, G.z(R.r + mm * T)], ZUP, RAY.rho + 0.11, { color: P.magenta, width: 1, fade: true, back: 0.15 }, 0.42 * lens * a);
    // the integers wound round the prism, T to a turn
    const total = (G.mMax + 1) * T,
      per = Math.max(2, Math.ceil(48 / T));
    line(sample(total * per, (t) => G.at(t * total, 0.012)), { color: P.ink, width: 1, alpha: 0.3 }, a);
    if (T <= 10) {
      const ticks = [];
      for (let n = 0; n <= total; n++) if (n % T !== 1 % T && n % T !== 5 % T) ticks.push(G.at(n, 0.02));
      poly('rayTicks', dotsMesh(ticks, px(2.4)), { color: P.dim, edges: false, pick: false, occlude: false }, a);
    }
    for (const lane of R.lanes) {
      const sel = lane.r === R.r,
        out = G.out(lane.r);
      line([G.rail(lane.r, -0.4, 0.02), G.rail(lane.r, G.mMax + 0.4, 0.02)], { color: P.cyan, width: sel ? 2 : 1.2, alpha: sel ? 0.75 : 0.45 }, a);
      for (const b of lane.beads) {
        const p = G.rail(lane.r, b.m),
          one = b.value === '1',
          kill = b.m === lane.kill;
        bead(p, { color: one ? P.ink : b.isComposite ? P.magenta : P.cyan, r: kill ? 7.2 : b.isComposite ? 5.4 : one ? 3.4 : 4.6, key: `ray${lane.r}-${b.m}` }, a);
        if (kill) ring(add(p, scale(out, 0.004)), { color: P.magenta, r: 11.5, normal: out, key: 'kill' + lane.r }, a);
      }
    }
    return { focus: G.rail(R.r, R.v), normal: G.out(R.r) };
  }

  /* wheel: the coil of 30 a turn round the lit core */
  const WH = { core: 0.4, coil: 0.62, zA: -0.9, zB: 1.02, floor: -1.04, rf: 1.1 };
  function wheelGeom(k) {
    const W = evalPrimorialWheel(k),
      N = Math.max(95, W.squareHorizon + 40),
      c0 = frontAz('wheel');
    const ang = (n) => c0 + (TAU * (n - 7)) / 30;
    const z = (n) => WH.zA + ((n - 1) / (N - 1)) * (WH.zB - WH.zA);
    const at = (n, lift = 0) => [(WH.coil + lift) * cs(ang(n)), (WH.coil + lift) * sn(ang(n)), z(n)];
    return { N, ang, z, at, W };
  }
  function drawWheel(m, a) {
    const w = m.wheel,
      k = w.k,
      G = wheelGeom(k),
      W = G.W,
      base = W.primes,
      Mk = Number(W.primorial),
      hz = W.squareHorizon,
      lens = state.lensT;
    floorDisc('wheelFloor', WH.floor, WH.rf, a);
    surf('wheelCore', (u, v) => [WH.core * cs(u), WH.core * sn(u), v], { u: [0, TAU], v: [WH.zA - 0.08, WH.zB + 0.04], nu: 72, nv: 12, colors: [P.stage, P.violet], range: [WH.zA - 0.3, WH.zB + 0.3], value: (u, v) => v, grid: { every: [6, 3], color: P.violet, alpha: 0.2 }, pick: false }, a);
    surf('wheelCap', (u, v) => [WH.core * u * cs(v), WH.core * u * sn(v), WH.zB + 0.04], { u: [0.01, 1], v: [0, TAU], nu: 4, nv: 72, colors: [P.violet], pick: false }, a);
    // the 30 spokes of the floor: open for the wheel cyan, closed dim; one violet ring per tier of the cascade
    const openRes = (j) => (k <= 3 ? gcdN(j, Mk) === 1 : gcdN(j, 30) === 1);
    for (let j = 0; j < 30; j++) {
      const th = G.ang(j),
        o = openRes(j);
      line([[0.48 * cs(th), 0.48 * sn(th), WH.floor + 0.004], [WH.rf * 0.95 * cs(th), WH.rf * 0.95 * sn(th), WH.floor + 0.004]], { color: o ? P.cyan : P.dim, width: o ? 1.5 : 0.9, alpha: o ? 0.75 : 0.3 }, a);
      if (o) line([[WH.coil * cs(th), WH.coil * sn(th), WH.zA], [WH.coil * cs(th), WH.coil * sn(th), WH.zB]], { color: P.cyan, width: 1, alpha: 0.2 }, a);
    }
    for (let i = 1; i <= k; i++) circle([0, 0, WH.floor + 0.008], ZUP, 0.5 + 0.1 * i, { color: P.violet, width: i === k ? 2.2 : 1.2, fade: false }, (i === k ? 0.95 : 0.5) * a);
    line(sample(Math.round((G.N - 1) * 3), (t) => G.at(1 + t * (G.N - 1), 0.01)), { color: P.ink, width: 1, alpha: 0.3 }, a);
    const muted = [];
    for (let n = 2; n <= G.N; n++) {
      const p = G.at(n, 0.03),
        isBase = base.includes(n),
        open = base.every((q) => n % q);
      if (isBase) bead(p, { color: P.violet, r: 5.4, key: 'base' + n }, a);
      else if (!open) muted.push(p);
      else if (n < hz) bead(p, { color: n === w.next ? P.amber : P.cyan, r: n === w.next ? 6.8 : 4.6, key: 'open' + n }, a);
      else if (!isPrimeN(n)) {
        bead(p, { color: P.magenta, r: n === hz ? 7 : 5.2, key: 'leak' + n }, a);
        if (n === hz) ring(p, { color: P.magenta, r: 11, normal: unit([p[0], p[1], 0]), key: 'leakRing' }, a);
      } else ring(p, { color: P.cyan, r: 4.4, normal: unit([p[0], p[1], 0]), key: 'far' + n }, 0.85 * a);
      // the fixed wheel of period 6 (lens 1, MODEL): its composites on open spokes
      if (lens > 0.01 && n > 1 && n % 2 && n % 3 && !isPrimeN(n)) ring(G.at(n, 0.07), { color: P.magenta, r: 8, normal: unit([p[0], p[1], 0]), key: 'fix6-' + n }, lens * a);
    }
    poly('wheelMuted', dotsMesh(muted, px(2.4)), { color: P.dim, edges: false, pick: false, occlude: false }, a);
    // the square horizon: a violet ring and a faint violet plane at p_{k+1}²
    const zh = G.z(hz);
    tube('horizon', sample(96, (t) => [(WH.coil + 0.1) * cs(TAU * t), (WH.coil + 0.1) * sn(TAU * t), zh]), P.violet, px(2.2), a, 0.6);
    sc.fan(sample(48, (t) => [(WH.coil + 0.1) * cs(TAU * t), (WH.coil + 0.1) * sn(TAU * t), zh]), { fill: P.violet, alpha: 0.1 * a });
    const fa = frontAz('wheel') + 0.18;
    return { focus: [(WH.coil + 0.1) * cs(fa), (WH.coil + 0.1) * sn(fa), zh], normal: [cs(fa), sn(fa), 0] };
  }

  /* jit: the ternion sphere, the five states and the registers; the adelic beam on a camera-facing panel */
  const JIT = { R: 0.56, bus: 0.95, busZ: -0.08, pent: 0.78, pz: 0.98 };
  const FRAMES = { wide: { c: [1.95, 0.02], h: 0.86 }, narrow: { c: [0, -1.78], h: 0.82 } };
  let PAN = FRAMES.wide;
  /** A point (x, y) of the panel, d towards the viewer. */
  const pp = (x, y, d = 0, F = PAN) => seen(F.c[0] + F.h * x, F.c[1] + F.h * y, 1.1 + F.h * d);
  const PLATE = [-0.95, 0.95, -0.72, 0.72];
  const plate = (F = PAN) => [pp(PLATE[0], PLATE[2], 0, F), pp(PLATE[1], PLATE[2], 0, F), pp(PLATE[1], PLATE[3], 0, F), pp(PLATE[0], PLATE[3], 0, F)];
  const regAngle = (i) => frontAz('jit') + 0.55 - i * 2.399963229728653;
  const regAt = (i) => [JIT.bus * cs(regAngle(i)), JIT.bus * sn(regAngle(i)), JIT.busZ];
  const nodeAt = (j) => {
    const th = frontAz('jit') + PI - (j * TAU) / 5;
    return [JIT.pent * cs(th), JIT.pent * sn(th), JIT.pz];
  };
  function drawJit(m, a) {
    const J = m.jit;
    ball('jitBall', [0, 0, 0], JIT.R, a);
    ring([0, 0, JIT.R + 0.004], { color: P.ink, r: 9, normal: ZUP, key: 'pole' }, a);
    bead([0, 0, JIT.R + 0.01], { color: P.ink, r: 3, key: 'poleDot' }, a);
    circle([0, 0, JIT.busZ], ZUP, JIT.bus, { color: P.violet, width: 1.4, fade: true, back: 0.25 }, 0.7 * a);
    // the minted registers: no slot exists before its prime is minted
    for (let i = 0; i < J.whole; i++) {
      const p = regAt(i),
        newest = i === J.whole - 1 && J.f === 0;
      line([scale(unit(p), JIT.R), p], { color: P.cyan, width: 1, alpha: 0.4 }, a);
      bead(p, { color: newest ? P.amber : P.cyan, r: newest ? 6.6 : 5.2, key: 'reg' + i }, a);
    }
    // the five states and the loop between them
    const nodes = range(5).map(nodeAt);
    tube('loop', sample(100, (t) => {
      const u = t * 5,
        i = Math.min(4, Math.floor(u));
      return add(nodes[i], scale(sub(nodes[(i + 1) % 5], nodes[i]), u - i));
    }), P.violet, px(1.6), 0.75 * a, 0.3);
    for (let j = 0; j < 5; j++) {
      const A = nodes[j],
        B = nodes[(j + 1) % 5];
      sc.arrow(add(A, scale(sub(B, A), 0.42)), add(A, scale(sub(B, A), 0.6)), { color: P.violet, width: 2, headSize: 8, alpha: 0.9 * a });
      bead(A, { color: P.violet, r: 6, key: 'S' + j }, a);
    }
    ring(nodes[J.node], { color: P.amber, r: 12, key: 'nodeNow' }, a);
    // the candidate at the gate S3: cyan when p ≤ M_Ω, magenta and walled off when p > M_Ω
    const g = nodes[3],
      outw = unit([g[0], g[1], 0]),
      cp = add(g, scale(outw, 0.2));
    bead(cp, { color: J.accepted ? P.cyan : P.magenta, r: 6.4, key: 'cand' }, a);
    if (!J.accepted) {
      const side = unit(cross(ZUP, outw)),
        wc = add(g, scale(outw, 0.1));
      sc.fan([add(add(wc, scale(side, -0.14)), [0, 0, -0.12]), add(add(wc, scale(side, 0.14)), [0, 0, -0.12]), add(add(wc, scale(side, 0.14)), [0, 0, 0.14]), add(add(wc, scale(side, -0.14)), [0, 0, 0.14])], { fill: P.magenta, alpha: 0.3 * a, color: P.magenta, strokeAlpha: 0.8 * a });
    }
    drawLedger(J.ad, a);
    const newest = J.whole > 0 ? regAt(J.whole - 1) : nodes[0];
    const v = J.v;
    if (J.f > 0 && J.whole < J.Kmax) {
      // between two mints the focus travels from the gate to the slot of the next register
      const from = nodes[Math.max(1, J.node)],
        to = regAt(J.whole);
      return { focus: add(from, scale(sub(to, from), J.f)), normal: null, v };
    }
    return { focus: newest, normal: null, v };
  }
  /** The ledger of r: one bar per place, the height log₁₀ of its norm; the bars balance on the beam, their logs add to 0. */
  function drawLedger(ad, a) {
    sc.fan(plate(), { fill: P.stage, alpha: 0.55 * a, color: P.ink, strokeAlpha: 0.28 * a });
    const items = [{ key: '∞', q: ad.arch, color: P.violet }, ...ad.norms.map((n) => ({ key: String(n.p), q: n.norm, color: P.cyan }))];
    const logs = items.map((it) => Math.log10(fval(it.q))),
      big = Math.max(0.5, ...logs.map(abs)),
      n = items.length,
      e = [cam.R, cam.U, cam.D];
    items.forEach((it, i) => {
      const x = lerp(-0.72, 0.72, n === 1 ? 0.5 : i / (n - 1)),
        h = (logs[i] / big) * 0.5 * PAN.h,
        b = pp(x, -0.02, 0.05);
      if (abs(h) > 1e-4) poly('bar' + i, boxMesh(h > 0 ? b : add(b, scale(cam.U, h)), e, 0.13 * PAN.h, abs(h), 0.1 * PAN.h), { color: it.color, edges: P.ink, pick: false }, a);
      else line([add(b, scale(cam.R, -0.06 * PAN.h)), add(b, scale(cam.R, 0.06 * PAN.h))], { color: it.color, width: 3 }, a);
    });
    line([pp(-0.9, -0.02, 0.04), pp(0.9, -0.02, 0.04)], { color: P.ink, width: 2 }, a);
    sc.fan([pp(-0.05, -0.12, 0.04), pp(0.05, -0.12, 0.04), pp(0, -0.03, 0.04)], { fill: P.ink, alpha: 0.7 * a });
    return { items, logs, big };
  }

  /* vernier: the glass sphere, the box ratios nearest 1, the caliper panel and the K dial */
  const VER = { R: 0.86, az: 0.62 };
  const verAz = () => frontAz('vernier') + VER.az;
  /** The place of a ratio of log L and exponent vector v: height 2κ − 1 = −tanh L; azimuth by its prime phase. */
  function verPoint(core, L0, v, rad = VER.R * 0.97) {
    const h = -Math.tanh(L0),
      w = core.phase(v) - core.phase(core.best.v),
      az = verAz() + Math.atan2(sn(w), cs(w)),
      rr = rad * Math.sqrt(Math.max(0, 1 - h * h));
    return [rr * cs(az), rr * sn(az), rad * h];
  }
  /** The dials of the vernier (K = 1 … 6) and of the CRT card (K = 2 … 10): a camera-facing arc of stops. */
  const DIALS = { vernier: { n: 6, c: [0, 0, 0], r: 1.12, a0: -2.5, a1: -0.64 }, crt: { n: 9, c: [0, 0, 0.12], r: 1.3, a0: 2.55, a1: 0.59 } };
  const dialPoint = (scene, v) => {
    const D = DIALS[scene],
      ang = lerp(D.a0, D.a1, clamp(v / (D.n - 1), 0, 1));
    return add(D.c, add(scale(cam.R, D.r * cs(ang)), scale(cam.U, D.r * sn(ang))));
  };
  function drawDial(scene, v, a) {
    const D = DIALS[scene];
    line(sample(48, (t) => dialPoint(scene, t * (D.n - 1))), { color: P.violet, width: 1.4, alpha: 0.7 }, a);
    for (let i = 0; i < D.n; i++) bead(dialPoint(scene, i), { color: P.violet, r: 3.6, key: scene + 'Stop' + i }, a);
    return dialPoint(scene, v);
  }
  function drawVernier(m, a) {
    const V = m.vernier,
      core = V.core;
    bowl('verBowl', [0, 0, 0], VER.R * 0.99, a);
    sc.glass('verGlass', [0, 0, 0], VER.R, { color: P.violet, alpha: 0.1 * a, rim: 0.6 * a });
    circle([0, 0, 0], ZUP, VER.R, { color: P.ink, width: 1.4, dash: [6, 4], back: 0.25 }, 0.85 * a);
    const az = verAz();
    circle([0, 0, 0], [-sn(az), cs(az), 0], VER.R, { color: P.violet, width: 1.8, back: 0.3 }, 0.9 * a);
    const one = [VER.R * cs(az), VER.R * sn(az), 0];
    ring(one, { color: P.ink, r: 9, normal: unit(one), key: 'oneOne' }, a);
    const pts = core.near.map((q) => verPoint(core, q.L, q.v));
    poly('verPts', dotsMesh(pts, px(2.8)), { color: P.cyan, edges: false, pick: false, occlude: false }, a);
    const bm = verPoint(core, core.best.L, core.best.v, VER.R * 0.985);
    bead(bm, { color: P.amber, r: 6.6, key: 'boxMin' }, a);
    let wp = null;
    if (core.wit && core.wit.idx !== core.best.idx) {
      wp = verPoint(core, core.wit.L, core.wit.v, VER.R * 0.985);
      bead(wp, { color: P.cyan, r: 6, key: 'witness' }, a);
      ring(wp, { color: P.cyan, r: 10, normal: unit(wp), key: 'witRing' }, a);
    }
    drawCaliper(core, one, a);
    const dial = drawDial('vernier', V.v, a);
    return { focus: dial, normal: null, bm, wp, one };
  }
  /** The caliper: Δκ from κ = 1/2 magnified along the panel; the box minimum amber, the witness cyan. */
  function drawCaliper(core, one, a) {
    sc.fan(plate(), { fill: P.stage, alpha: 0.55 * a, color: P.ink, strokeAlpha: 0.28 * a });
    const dkB = fval(core.best.dk),
      dkW = core.wit ? fval(core.wit.dk) : 0,
      w = 1.18 * Math.max(dkB, dkW),
      X = (d) => lerp(-0.8, 0.8, d / w);
    line([pp(-0.8, -0.1, 0.03), pp(0.8, -0.1, 0.03)], { color: P.ink, width: 1.6 }, a);
    for (let i = 0; i <= 10; i++) line([pp(lerp(-0.8, 0.8, i / 10), -0.1, 0.03), pp(lerp(-0.8, 0.8, i / 10), i % 5 ? -0.16 : -0.2, 0.03)], { color: P.ink, width: 1, alpha: 0.6 }, a);
    // the other ratios of the box that fall inside the window
    const inside = [];
    for (const q of core.near) {
      if (q.L <= 0) continue;
      const r = Math.exp(q.L),
        d = (r * r - 1) / (2 * (r * r + 1));
      if (d <= w) inside.push(pp(X(d), 0.06, 0.05));
    }
    poly('calDots', dotsMesh(inside, px(2.6)), { color: P.cyan, edges: false, pick: false, occlude: false }, 0.8 * a);
    line([pp(X(0), -0.3, 0.03), pp(X(0), 0.32, 0.03)], { color: P.ink, width: 1.8 }, a);
    bead(pp(X(dkB), 0.18, 0.06), { color: P.amber, r: 6.4, key: 'calMin' }, a);
    line([pp(X(dkB), -0.1, 0.04), pp(X(dkB), 0.18, 0.04)], { color: P.amber, width: 1.6 }, a);
    if (core.wit && core.wit.idx !== core.best.idx) {
      bead(pp(X(dkW), 0.18, 0.06), { color: P.cyan, r: 6, key: 'calWit' }, a);
      line([pp(X(dkW), -0.1, 0.04), pp(X(dkW), 0.18, 0.04)], { color: P.cyan, width: 1.6 }, a);
    }
    line([one, pp(X(0), -0.3, 0.03)], { color: P.ink, width: 1, dash: [3, 4], alpha: 0.5 }, a);
    return { w, X };
  }

  /* tower: the glass sphere, the prime pillars, the serial path and the lemma arc */
  const TW = { R: 0.5, ped: 1.42, floor: -0.78, rf: 1.66, zA: -0.4, zB: 0.52, r0: 0.6, r1: 1.12 };
  function towerPoint(tw, s) {
    const B = tw.beats,
      x = clamp(s, 0, B),
      i = Math.min(B - 1, Math.floor(x)),
      f = x - i,
      lg = lerp(tw.logs[i], tw.logs[i + 1], f),
      t = x / B,
      turns = tw.name === 'multiply' ? 2.6 : 6,
      th = frontAz('tower') - 1.9 + TAU * turns * t,
      rr = TW.r0 + (TW.r1 - TW.r0) * (lg / tw.logMax);
    return [rr * cs(th), rr * sn(th), lerp(TW.zA, TW.zB, t)];
  }
  /** The prime pillars stand on a front arc of the floor, below the path: a bar chart of the exponents. */
  const pillarAt = (i, n) => {
    const th = frontAz('tower') - 1.2 + (n > 1 ? i / (n - 1) : 0.5) * 2.4;
    return [TW.ped * cs(th), TW.ped * sn(th), TW.floor];
  };
  function lemmaArc(A, B, t) {
    const mid = add(scale(add(A, B), 0.5), [0, 0, 0.95]);
    return sample(40, (u) => {
      const s = u * t;
      return add(add(scale(A, (1 - s) ** 2), scale(mid, 2 * s * (1 - s))), scale(B, s * s));
    });
  }
  function drawTower(m, a) {
    const T_ = m.tower,
      tw = T_.tw;
    floorDisc('towerFloor', TW.floor, TW.rf, a);
    bowl('towerBowl', [0, 0, 0], TW.R * 0.99, a);
    sc.glass('towerGlass', [0, 0, 0], TW.R, { color: P.violet, alpha: 0.1 * a, rim: 0.6 * a });
    const n = tw.primes.length;
    tw.primes.forEach((p, i) => {
      const b = pillarAt(i, n),
        ex = T_.exps[i],
        h = 0.02 + 0.12 * ex;
      poly('pillar' + i, boxMesh(b, [unit(cross(ZUP, unit([b[0], b[1], 0]))), ZUP, unit([b[0], b[1], 0])], 0.13, h, 0.13), { color: ex > 0 ? P.violet : P.faint, edges: P.ink, pick: false }, a);
    });
    // the serial path: the whole route faint, the beats so far bright
    const B = tw.beats,
      steps = Math.max(40, Math.min(900, B * 6));
    line(sample(steps, (t) => towerPoint(tw, t * B)), { color: P.magenta, width: 1, dash: [3, 4], alpha: 0.35 }, a);
    if (T_.v > 0.02) tube('serial', sample(Math.max(8, Math.round(steps * (T_.v / B))), (t) => towerPoint(tw, t * T_.v)), P.magenta, px(2.4), a, 0.45);
    if (B <= 40) for (let i = 1; i < B; i++) if (i <= T_.v) bead(towerPoint(tw, i), { color: P.magenta, r: 3.2, key: 'st' + i }, a);
    const peak = towerPoint(tw, tw.peakAt);
    ring(peak, { color: P.magenta, r: 10, key: 'peak' }, (T_.v >= tw.peakAt ? 1 : 0.45) * a);
    const A = towerPoint(tw, 0),
      Bp = towerPoint(tw, B);
    bead(A, { color: P.ink, r: 5.6, key: 'in' }, a);
    bead(Bp, { color: P.cyan, r: 6.4, key: 'out' }, a);
    // the lemma register: one beat, straight from the input to the target
    const arc = lemmaArc(A, Bp, Math.max(0.02, T_.lemma));
    tube('lemma', arc, P.cyan, px(3), a, 0.5);
    if (T_.lemma >= 1) sc.arrow(arc[arc.length - 6], arc[arc.length - 1], { color: P.cyan, width: 3, headSize: 12, alpha: a });
    return { focus: towerPoint(tw, T_.v), normal: null, A, B: Bp, peak, arcTop: arc[20] };
  }

  /* crt: the observer, six prime rings, the CRT ring, the external structure and the memory */
  const CR = { R: 0.32, ring0: 0.5, dr: 0.1, crt: 1.36, z: -0.9, rf: 1.56, mem: 1.06 };
  const ringNormal = (i) => {
    const az = frontAz('crt') + (i * TAU) / 6 + 0.4,
      tilt = 0.28 + 0.13 * i;
    return [sn(tilt) * cs(az), sn(tilt) * sn(az), cs(tilt)];
  };
  const ringPts = (i, n = 96) => {
    const nn = ringNormal(i),
      e1 = unit(cross(nn, abs(nn[2]) < 0.9 ? ZUP : [1, 0, 0])),
      e2 = cross(nn, e1),
      r = CR.ring0 + CR.dr * i;
    return sample(n, (t) => add(scale(e1, r * cs(TAU * t)), scale(e2, r * sn(TAU * t))));
  };
  const crtAngle = (j, M) => frontAz('crt') - 0.75 + (TAU * j) / M;
  const crtPoint = (j, M, lift = 0) => [(CR.crt + lift) * cs(crtAngle(j, M)), (CR.crt + lift) * sn(crtAngle(j, M)), CR.z + 0.03];
  const NEXT = [[-1.55, 0.85, 0.62], [1.5, -0.95, -0.36]];
  function drawCrt(m, a) {
    const C = m.crt,
      lens = state.lensT,
      Mn = Number(C.M);
    floorDisc('crtFloor', CR.z, CR.rf, a);
    ball('crtBall', [0, 0, 0], CR.R, a);
    for (let i = 0; i < 6; i++) {
      const awake = i < C.K,
        pts = ringPts(i);
      tube('ring' + i, pts, awake ? P.cyan : P.violet, px(awake ? 2.6 : 2), awake ? a : 0.3 * a, awake ? 0.5 : 0.2);
      if (awake) {
        const q = pts[Math.round(8 + 11 * i) % 96];
        line([q, scale(unit(q), CR.R)], { color: P.cyan, width: 1, dash: [3, 3], alpha: 0.55 }, a);
      }
    }
    // the CRT ring ℤ/P_K#, one tick per residue while it is small enough to draw
    tube('crtRing', sample(144, (t) => [CR.crt * cs(TAU * t), CR.crt * sn(TAU * t), CR.z + 0.02]), P.violet, px(2.2), a, 0.4);
    if (Mn <= 210) poly('crtTicks', dotsMesh(range(Mn).map((j) => crtPoint(j, Mn, 0.0)), px(Mn > 60 ? 1.6 : 2.2)), { color: P.dim, edges: false, pick: false, occlude: false }, a);
    const px7 = crtPoint(Number(C.rx), Mn, 0.06),
      px37 = crtPoint(Number(C.ry), Mn, 0.06);
    if (C.collide) {
      bead(px7, { color: P.magenta, r: 7.4, key: 'alias' }, a);
      ring(px7, { color: P.magenta, r: 12, normal: ZUP, key: 'aliasRing' }, a);
    } else {
      bead(px7, { color: P.cyan, r: 5.6, key: 'x7' }, a);
      bead(px37, { color: P.cyan, r: 5.6, key: 'x37' }, a);
    }
    line([[0, 0, -CR.R], px7], { color: P.ink, width: 1, dash: [3, 4], alpha: 0.45 }, a);
    // the external structure N_ext = 77 = 7 × 11: it passes through while gcd(77, P_K#) = 1
    const coupled = C.g77 > 1n;
    line(NEXT, { color: coupled ? P.cyan : P.violet, width: coupled ? 2.2 : 1.6, dash: coupled ? [] : [6, 5], alpha: coupled ? 0.95 : 0.7 }, a);
    sc.arrow(add(NEXT[0], scale(sub(NEXT[1], NEXT[0]), 0.78)), add(NEXT[0], scale(sub(NEXT[1], NEXT[0]), 0.9)), { color: coupled ? P.cyan : P.violet, width: 2, headSize: 10, alpha: 0.9 * a });
    if (coupled) bead([0, 0, 0.0], { color: P.cyan, r: 4.6, key: 'couple' }, a);
    // the memory W_M: 8 slots on the floor, the oldest anchor leaving
    const memA = (i) => frontAz('crt') + 0.55 + i * 0.16;
    const slots = range(8).map((i) => [CR.mem * cs(memA(i)), CR.mem * sn(memA(i)), CR.z + 0.01]);
    slots.forEach((p, i) => {
      const out = unit([p[0], p[1], 0]),
        e = [unit(cross(ZUP, out)), ZUP, out];
      poly('slot' + i, boxMesh(p, e, 0.13, 0.05, 0.13), { color: P.violet, edges: P.ink, pick: false }, a);
      bead(add(p, [0, 0, 0.09]), { color: P.cyan, r: 3.8, key: 'mem' + i }, a);
    });
    const gone = [CR.mem * cs(memA(-1.4)), CR.mem * sn(memA(-1.4)), CR.z + 0.1];
    bead(gone, { color: P.dim, r: 3.8, key: 'memOld' }, 0.5 * a);
    sc.arrow(add(slots[0], [0, 0, 0.12]), add(gone, [0, 0, 0.04]), { color: P.dim, width: 1.4, headSize: 8, alpha: 0.6 * a });
    // the fixed modulus 30 (lens 1, MODEL): the alias that never goes away
    if (lens > 0.01) {
      circle([0, 0, CR.z + 0.02], ZUP, CR.crt + 0.16, { color: P.magenta, width: 1.6, fade: false }, 0.6 * lens * a);
      const g = [(CR.crt + 0.16) * cs(crtAngle(7, 30)), (CR.crt + 0.16) * sn(crtAngle(7, 30)), CR.z + 0.04];
      ring(g, { color: P.magenta, r: 9, normal: ZUP, key: 'ghost' }, lens * a);
    }
    const dial = drawDial('crt', C.v, a);
    return { focus: dial, normal: null, px7, px37, slots, gone };
  }

  /** The ℵ₀ tape of blanks (lens 1, MODEL): cells with a '0' each, running off the floor and fading. */
  const TAPE = { ray: [-1.06, 1.1], wheel: [-1.04, 1.1], jit: [-0.62, 1.0], vernier: [-0.95, 1.0], tower: [-0.78, 1.58], crt: [-0.9, 1.56] };
  function drawTape(scene, a) {
    if (a < 0.01) return null;
    const [z, r] = TAPE[scene],
      th = frontAz(scene) - 1.05,
      start = [(r + 0.12) * cs(th), (r + 0.12) * sn(th), z],
      dir = unit([cs(th - 1.15), sn(th - 1.15), 0]),
      side = unit(cross(ZUP, dir)),
      cell = 0.2;
    let last = start;
    for (let i = 0; i < 13; i++) {
      const c = add(start, scale(dir, cell * (i + 0.5))),
        al = a * 0.75 * (1 - i / 14),
        q = (x, y) => add(c, add(scale(dir, x), scale(side, y)));
      line([q(-0.09, -0.09), q(0.09, -0.09), q(0.09, 0.09), q(-0.09, 0.09)], { color: P.magenta, width: 1.2, close: true }, al);
      line(sample(20, (t) => q(0.032 * cs(TAU * t), 0.05 * sn(TAU * t))), { color: P.magenta, width: 1.2 }, al);
      last = c;
    }
    return last;
  }

  /* ---------- where the amber focus stands for a rail value v ---------- */
  function jitFocusAt(v) {
    const G = growUntilHorizon(state.M),
      Kmax = G.primes.length,
      x = clamp(v, 0, Kmax),
      whole = Math.min(Kmax, Math.floor(x + 1e-9)),
      f = x - whole < 1e-9 ? 0 : x - whole;
    if (f > 0 && whole < Kmax) {
      const node = 1 + Math.min(3, Math.floor(f * 4));
      return add(nodeAt(node), scale(sub(regAt(whole), nodeAt(node)), f));
    }
    return whole > 0 ? regAt(whole - 1) : nodeAt(0);
  }
  function wheelHorizonZ(v) {
    const lo = Math.floor(clamp(v, 0, 4)),
      hi = Math.min(4, lo + 1),
      za = wheelGeom(lo + 1),
      zb = wheelGeom(hi + 1);
    return lerp(za.z(za.W.squareHorizon), zb.z(zb.W.squareHorizon), clamp(v, 0, 4) - lo);
  }
  function handleWorld(v) {
    switch (state.scene) {
      case 'wheel': {
        const fa = frontAz('wheel') + 0.18;
        return [(WH.coil + 0.1) * cs(fa), (WH.coil + 0.1) * sn(fa), wheelHorizonZ(v)];
      }
      case 'jit':
        return jitFocusAt(v);
      case 'vernier':
        return dialPoint('vernier', v);
      case 'tower':
        return towerPoint(TOWER[state.prog], v);
      case 'crt':
        return dialPoint('crt', v);
      default:
        return rayGeom(state.T).rail(state.r, clamp(v, 0, state.T + 3));
    }
  }

  /* ---------- framing: what each card draws, between the title and the legend ---------- */
  const rim = (r, z, n = 24) => range(n).map((k) => [r * cs((k * TAU) / n), r * sn((k * TAU) / n), z]);
  const ballBox = (c, r) => [add(c, scale(cam.R, r)), add(c, scale(cam.R, -r)), add(c, scale(cam.U, r)), add(c, scale(cam.U, -r))];
  const FIT = {
    ray: () => {
      const G = rayGeom(state.T);
      return [...rim(RAY.rf, RAY.floor), ...rim(G.corner + 0.08, G.z1 + 0.16)];
    },
    wheel: () => [...rim(WH.rf, WH.floor), ...rim(WH.coil + 0.14, WH.zB + 0.12)],
    jit: () => [...ballBox([0, 0, 0], JIT.R), ...rim(JIT.bus + 0.08, JIT.busZ), ...rim(JIT.pent + 0.24, JIT.pz + 0.12), ...plate()],
    vernier: () => [...ballBox([0, 0, 0], VER.R + 0.04), ...range(6).map((i) => dialPoint('vernier', i)), ...plate()],
    tower: () => [...rim(TW.rf, TW.floor), ...rim(TW.r1 + 0.05, TW.zB + 0.08), [0, 0, 1.05], ...rim(TW.ped + 0.1, TW.floor + 0.68)],
    crt: () => [...rim(CR.rf, CR.z), ...ballBox([0, 0, 0], CR.ring0 + 5 * CR.dr + 0.04), ...NEXT, ...range(9).map((i) => dialPoint('crt', i))]
  };
  const around = (pts) =>
    pts.reduce(
      (b, p) => {
        const x = dot(p, cam.R),
          y = dot(p, cam.U);
        return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
      },
      [Infinity, -Infinity, Infinity, -Infinity]
    );
  /* the room of the title, measured at a few places of the whole rail when a card, a dial, a lens, a language or a size
     begins, so that the picture holds still while the rail runs */
  const title = { key: '', top: 0 },
    held = { W: 0, H: 0 };
  function titleRoom(box) {
    const tl = $('hudTl'),
      big = $('hudBig'),
      line_ = $('hudSub'),
      keep = [big.innerHTML, line_.innerHTML],
      r = railOf(state.scene);
    let top = 12;
    const n = Math.min(10, Math.ceil(r.max)),
      places = r.whole ? range(n + 1).map((i) => Math.round((i * r.max) / n)) : [0, 0.37, 0.5, 0.81, 1].map((f) => f * r.max);
    for (const v of places) {
      const m = compute({ ...state, at: { ...state.at, [state.scene]: v } });
      big.innerHTML = bigline(m);
      line_.innerHTML = kept(subline(m));
      TRV.hudFit();
      top = Math.max(top, tl.getBoundingClientRect().bottom - box.top + 8);
    }
    big.innerHTML = keep[0];
    line_.innerHTML = keep[1];
    TRV.hudFit();
    return top;
  }
  let dragging = null;
  function fit() {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H || (dragging != null && W === held.W && H === held.H)) return;
    Object.assign(held, { W, H });
    const box = stage.getBoundingClientRect(),
      shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden',
      tl = $('hudTl'),
      bl = $('legend');
    const key = [state.scene, state.lens, state.T, state.r, state.M, state.vh, state.prog, state.adelic, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: shown(tl) && !TRV.still ? titleRoom(box) : 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top,
      bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12,
      side = 14,
      room = Math.max(40, H - top - bottom);
    const [x0, x1, y0, y1] = around(FIT[state.scene]());
    const pad = 0.06,
      u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0 + 2 * pad), room / (y1 - y0 + 2 * pad)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- words ---------- */
  const SCENE_NAME = {
    ray: [['固定周期 · 余数轨', 'FIXED PERIOD · RESIDUE RAILS'], ['静态单周期的回放（MODEL）', 'STATIC PERIOD REPLAY (MODEL)']],
    wheel: [['级联筛轮 · 平方视界', 'CASCADING WHEEL · SQUARE HORIZON'], ['对照固定的 T = 6（MODEL）', 'AGAINST A FIXED T = 6 (MODEL)']],
    jit: [['零槽位 · ε<sub>self</sub> 停机门', 'ZERO SLOT · ε<sub>self</sub> HALT GATE'], ['对照 ℵ₀ 空格纸带（MODEL）', 'AGAINST AN ℵ₀ BLANK TAPE (MODEL)']],
    vernier: [['有理游标 · 赤道星壳', 'RATIONAL VERNIER · EQUATOR SHELL'], ['对照 ℵ₀ 空格纸带（MODEL）', 'AGAINST AN ℵ₀ BLANK TAPE (MODEL)']],
    tower: [['串行幂塔 · 单拍引理', 'SERIAL TOWER · ONE-BEAT LEMMA'], ['对照 ℵ₀ 空格纸带（MODEL）', 'AGAINST AN ℵ₀ BLANK TAPE (MODEL)']],
    crt: [['同余解混叠 · 暗态 · 记忆', 'CRT ANTI-ALIASING · DARK SECTOR · MEMORY'], ['对照固定的模 30（MODEL）', 'AGAINST A FIXED MODULUS 30 (MODEL)']]
  };
  const LENS_NAME = [
    ['级联视界', 'CASCADE'],
    ['静态对照 (MODEL)', 'STATIC CONTRAST (MODEL)']
  ];
  const LENS_TITLE = [
    ['级联素数阶乘与有限视界透镜 · 单种子扩轮 / q⁰ = 1 零槽位 / ε<sub>self</sub> 停机门', 'Cascading Primorial &amp; Finite-Horizon Lens · Dynamic Wheel / q⁰ = 1 Zero-Slot / ε<sub>self</sub> Halt Gate'],
    ['静态单周期与图灵无限纸带对照透镜（MODEL）· 固定 T 必撞合数与 ℵ₀ 空格预设', 'Static-Period &amp; Infinite-Tape Contrast Lens (MODEL) · Fixed-T Composite Crash &amp; ℵ₀ Blank Tape']
  ];
  const MO = `M${sub2('Ω')}`,
    ES = `ε${sub2('self')}`,
    KMX = `K${sub2('max')}`;
  const Mk = (k) => `M${sub2(k)}`;
  const pk = (k) => `p${sub2(k)}`;
  const nText = (c) => (c.isComposite ? `${group(c.value)} = ${timesText(c.factorPair)}` : c.value === '1' ? '1' : group(c.value));
  const list = (xs) => xs.join(L('、', ', '));
  function keyOf(m) {
    switch (state.scene) {
      case 'ray':
        return nText(m.ray.cur);
      case 'wheel': {
        const W = m.wheel.W;
        return L(`(1, ${W.squareHorizon}) 内误差 ${W.errorsInHorizon}`, `${W.errorsInHorizon} errors in (1, ${W.squareHorizon})`);
      }
      case 'jit':
        return m.jit.halted ? `${KMX} = ${m.jit.Kmax}` : `K = ${m.jit.whole} / ${m.jit.Kmax}`;
      case 'vernier':
        return `${m.vernier.core.best.num}/${m.vernier.core.best.den}`;
      case 'tower':
        return L(`${m.tower.tw.beats} 拍 : 1 拍`, `${m.tower.tw.beats} beats : 1`);
      default:
        return m.crt.collide ? `7 ≡ 37 (mod ${group(m.crt.M)})` : `7 ≠ 37 (mod ${group(m.crt.M)})`;
    }
  }
  const bigline = (m) => `${L(...SCENE_NAME[state.scene][state.lens])} · <span class="nb">${keyOf(m)}</span>`;
  const killText = (T, r) => nText(evalStaticRay(T, r, killM(T, r)));
  function subline(m) {
    const t = tiny(),
      lens = state.lens;
    switch (state.scene) {
      case 'ray': {
        const R = m.ray,
          n = nText(R.cur),
          k1 = killText(R.T, 1),
          k5 = killText(R.T, 5);
        if (t) return `m = ${R.m}: ${n} · (T + 1)² = ${k1}`;
        const tail = lens ? L('；固定周期每 T 个整数重放同一圈 ℤ/T（MODEL）。', '; a fixed period replays the same loop ℤ/T every T integers (MODEL).') : L('。', '.');
        return L(`T = ${R.T}、r = ${R.r}、m = ${R.m}：n = ${R.r} + ${R.m} × ${R.T} = ${n}；r = 1 在 m = T + 2 撞上 (T + 1)² = ${k1}，r = 5 在 m = 5 撞上 ${k5}${tail}`, `T = ${R.T}, r = ${R.r}, m = ${R.m}: n = ${R.r} + ${R.m} × ${R.T} = ${n}; r = 1 meets (T + 1)² = ${k1} at m = T + 2, r = 5 meets ${k5} at m = 5${tail}`);
      }
      case 'wheel': {
        const w = m.wheel,
          W = w.W,
          c = W.newPrimesInHorizon.length,
          leak = W.firstCompositeLeak;
        const lk = `${leak} = ${timesText(pairOf(leak))}`;
        if (t) return L(`${Mk(w.k)} = ${group(W.primorial)} · (1, ${W.squareHorizon}) 内 ${c} 颗素数`, `${Mk(w.k)} = ${group(W.primorial)} · ${c} primes in (1, ${W.squareHorizon})`);
        const tail = lens ? L('；固定的 T = 6 在 25 就撞上合数（品红圈，MODEL）。', '; a fixed T = 6 already meets 25 (magenta rings, MODEL).') : L('。', '.');
        return L(`k = ${w.k}：${Mk(w.k)} = ${group(W.primorial)}，φ = ${group(W.totient)} 条开放余数；(1, ${W.squareHorizon}) 内开放辐条上的 ${c} 个整数全是素数，误差 ${W.errorsInHorizon}，第一个合数 ${lk}${tail}`, `k = ${w.k}: ${Mk(w.k)} = ${group(W.primorial)}, φ = ${group(W.totient)} open residues; the ${c} integers on open spokes inside (1, ${W.squareHorizon}) are all prime, ${W.errorsInHorizon} errors, the first composite ${lk}${tail}`);
      }
      case 'jit': {
        const J = m.jit,
          regs = J.minted.length ? list(J.minted) : '—';
        if (t) return J.halted ? L(`${KMX} = ${J.Kmax} · ${J.cand} > ${J.M} 停机`, `${KMX} = ${J.Kmax} · ${J.cand} > ${J.M}: halt`) : `K = ${J.whole} · ${J.cand} ≤ ${J.M}`;
        if (J.halted) {
          const sm = fstr(sMin(J.cand));
          return L(`${MO} = ${J.M}（${ES} = 1/${J.M}）：寄存器 ${regs}，积 ${group(J.product)}；候选 ${J.cand} > ${J.M}（1/${J.cand} &lt; 1/${J.M}，s${sub2('min')}(${J.cand}) = ${sm}）在 S3 被拒，停机。`, `${MO} = ${J.M} (${ES} = 1/${J.M}): registers ${regs}, product ${group(J.product)}; the candidate ${J.cand} > ${J.M} (1/${J.cand} &lt; 1/${J.M}, s${sub2('min')}(${J.cand}) = ${sm}) is rejected at S3, halt.`);
        }
        if (J.whole === 0 && J.f === 0) return L(`S0：还没有寄存器，零槽位 q⁰ = 1；种子 2 ≤ ${J.M} 将被铸造。`, `S0: no register yet, the zero slot q⁰ = 1; the seed 2 ≤ ${J.M} is about to be minted.`);
        return L(`${MO} = ${J.M}：已铸造 ${regs}；下一个候选是与积互素的最小数 ${J.cand} ≤ ${J.M}，经 S1 至 S4 铸造。`, `${MO} = ${J.M}: minted ${regs}; the next candidate is the least number coprime to the product, ${J.cand} ≤ ${J.M}, minted through S1 to S4.`);
      }
      case 'vernier': {
        const V = m.vernier,
          c = V.core,
          wit = c.wit ? `${c.wit.num}/${c.wit.den}` : L('盒内没有', 'none in the box');
        if (t) return `K = ${V.K}, H = ${V.H}: ${c.best.num}/${c.best.den} · ${wit}`;
        return L(`K = ${V.K}、H = ${V.H}：${2 * V.H + 1}${sup(V.K)} = ${group(c.count)} 个有理比，大于 1 的 ${group(c.above)} 个里最小的是 ${c.best.num}/${c.best.den}；满支撑超特殊见证 ${wit}；Δκ = ${fstr(c.best.dk)}。`, `K = ${V.K}, H = ${V.H}: ${2 * V.H + 1}${sup(V.K)} = ${group(c.count)} ratios; of the ${group(c.above)} above 1 the least is ${c.best.num}/${c.best.den}; full-support superparticular witness ${wit}; Δκ = ${fstr(c.best.dk)}.`);
      }
      case 'tower': {
        const T_ = m.tower,
          tw = T_.tw,
          nm = tw.name === 'multiply' ? L('乘法', 'Multiply') : 'PRIMEGAME';
        if (t) return `t = ${T_.beat}/${tw.beats} · N = ${group(T_.N)} · ${tw.beats} : 1`;
        return L(`${nm}：t = ${T_.beat} / ${tw.beats}，N = ${group(T_.N)}；串行轨迹 ${tw.beats} 拍、峰值 ${group(tw.peak)}，引理寄存器 1 拍直达（${tw.beats} 倍）。`, `${nm}: t = ${T_.beat} / ${tw.beats}, N = ${group(T_.N)}; the serial path takes ${tw.beats} beats with peak ${group(tw.peak)}, the lemma register 1 beat (${tw.beats}×).`);
      }
      default: {
        const C = m.crt,
          M = group(C.M);
        if (t) return `P${sub2(C.K)}# = ${M} · ${C.collide ? '7 ≡ 37' : '7 ≠ 37'} · gcd(77, ${M}) = ${C.g77}`;
        const head = C.collide ? L(`P${sub2(C.K)}# = ${M} 整除 37 − 7 = 30，7 与 37 混叠`, `P${sub2(C.K)}# = ${M} divides 37 − 7 = 30, so 7 and 37 alias`) : L(`P${sub2(C.K)}# = ${M} > 30，7 ≠ 37`, `P${sub2(C.K)}# = ${M} > 30, so 7 ≠ 37`);
        const dark = C.g77 === 1n ? L(`gcd(77, ${M}) = 1，N${sub2('ext')} = 77 穿过不耦合`, `gcd(77, ${M}) = 1, N${sub2('ext')} = 77 passes through uncoupled`) : L(`gcd(77, ${M}) = ${C.g77}，N${sub2('ext')} 已耦合`, `gcd(77, ${M}) = ${C.g77}, N${sub2('ext')} is coupled`);
        return L(`K = ${C.K}：${head}；${dark}；记忆 8 格 ≪ 7${sup(C.K)} = ${group(C.states)}。`, `K = ${C.K}: ${head}; ${dark}; memory 8 slots ≪ 7${sup(C.K)} = ${group(C.states)}.`);
      }
    }
  }
  function legendItems() {
    const lens = state.lensT > 0.5,
      tape = lens ? [['mg', L('ℵ₀ 纸带（MODEL）', 'ℵ₀ tape (MODEL)')]] : [];
    switch (state.scene) {
      case 'ray':
        return [['cy', L('轨上的素数', 'prime on a rail')], ['mg', L('合数 · ℤ/T 回放', 'composite · ℤ/T replay')], ['vi', L('与 T 互素的余数面', 'faces coprime to T')], ['am', L('当前的 m', 'present m')], ...tape];
      case 'wheel':
        return [['cy', L('开放辐条：素数', 'open spoke: prime')], ['mg', L('合数渗漏', 'composite leak')], ['vi', L('基础素数 · 视界环', 'base primes · horizon')], ['dm', L('封闭余数', 'closed residue')], ['am', 'p' + sub2('k+1')]];
      case 'jit':
        return [['vi', L('三元球 · 状态机', 'ternion sphere · states')], ['cy', L('寄存器 · 账本', 'registers · ledger')], ['mg', L('被拒的候选', 'rejected candidate')], ['am', L('当前状态', 'present state')], ...tape];
      case 'vernier':
        return [['vi', 'T₃(ℚ) · ℚP¹'], ['cy', L('盒内的比 · 见证', 'box ratios · witness')], ['ik', L('赤道 κ = 1/2', 'equator κ = 1/2')], ['am', L('盒最小值 · 拨盘', 'box minimum · dial')], ...tape];
      case 'tower':
        return [['vi', L('素数柱：指数', 'pillars: exponents')], ['mg', L('串行轨迹', 'serial path')], ['cy', L('引理弧 · 目标', 'lemma arc · target')], ['am', L('当前拍', 'present beat')], ...tape];
      default:
        return [['cy', L('已唤醒的轨道', 'awake ring')], ['vi', L('暗态轨道 · ℤ/P', 'dark ring · ℤ/P') + sub2('K') + '#'], ['mg', L('混叠', 'alias')], ['am', L('拨盘 K', 'dial K')], ...tape];
    }
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone; it names
      only what is drawn on the stage, in the title and in the tour bar. */
  function noteOf(m) {
    switch (state.scene) {
      case 'ray': {
        const R = m.ray;
        return {
          long: [`紫色棱柱把整数按每圈 T = ${R.T} 个绕上去，余数类 r + mT 成了竖直的青色轨。r = 1 的轨在 m = T + 2 = ${R.T + 2} 撞上 (T + 1)² = ${killText(R.T, 1)}，r = 5 的轨在 m = 5 撞上 ${killText(R.T, 5)}：两颗品红珠来自两行算术，与 T 无关。琥珀圈是当前的 m；地上的品红环是 ℤ/T，固定周期一圈圈重放它（MODEL）。`, `The violet prism winds the integers round it, T = ${R.T} to a turn, so that a residue class r + mT is a vertical cyan rail. The rail r = 1 meets (T + 1)² = ${killText(R.T, 1)} at m = T + 2 = ${R.T + 2}, the rail r = 5 meets ${killText(R.T, 5)} at m = 5: the two magenta beads come from two lines of arithmetic, whatever T is. The amber ring is the present m; the magenta ring on the floor is ℤ/T, which a fixed period replays turn after turn (MODEL).`],
          fig: [`m = T + 2 = ${R.T + 2} 给出 ${killText(R.T, 1)}，r = 5 的轨在 m = 5 撞上 ${killText(R.T, 5)}：固定周期必撞合数。`, `m = T + 2 = ${R.T + 2} gives ${killText(R.T, 1)}, and the rail r = 5 meets ${killText(R.T, 5)} at m = 5: a fixed period meets a composite.`]
        };
      }
      case 'wheel': {
        const w = m.wheel,
          W = w.W,
          c = W.newPrimesInHorizon.length;
        return {
          long: [`线圈每圈 30 个整数，绕在受光的紫色芯柱上。紫珠是基础素数 ${list(W.primes)}，暗点是它们的倍数，青色竖线是开放辐条。紫环是平方视界 ${W.squareHorizon}：环下开放辐条上的 ${c} 颗珠全是素数（1 颗琥珀新素数 ${w.next} 与 ${c - 1} 颗青珠）；环上第一颗品红珠是 ${W.firstCompositeLeak}，青色空心圈是视界外碰巧也是素数的数。`, `The coil holds 30 integers a turn round the lit violet core. Violet beads are the base primes ${list(W.primes)}, dim points their multiples, the faint cyan lines the open spokes. The violet ring is the square horizon ${W.squareHorizon}: below it all ${c} beads on open spokes are prime (1 freshly crystallized amber ${w.next} and ${c - 1} cyan beads); right on it the first magenta bead is ${W.firstCompositeLeak}, and hollow cyan rings are numbers beyond the horizon that happen to be prime.`],
          fig: [`M${subd(w.k)} = ${group(W.primorial)}：(1, ${W.squareHorizon}) 内开放辐条上 ${c} 个整数全是素数；第一个合数恰在 ${W.squareHorizon}。`, `M${subd(w.k)} = ${group(W.primorial)}: all ${c} integers on open spokes inside (1, ${W.squareHorizon}) are prime; the first composite is ${W.squareHorizon} exactly.`]
        };
      }
      case 'jit': {
        const J = m.jit;
        return {
          long: [`紫色三元球的顶点是 [1 : 0 : 0 : 0]，零槽位 q⁰ = 1：没有一个空格事先铺好。上方的五个紫珠是状态 S0 至 S4，琥珀圈是当前状态；青珠是已铸造的寄存器 ${J.minted.length ? list(J.minted) : '—'}。候选 ${J.cand} ${J.accepted ? `≤ ${J.M}，青色，通过 S3` : `> ${J.M}，品红，被 S3 的品红墙挡住`}。右边的账本里每根柱是一处的 log₁₀ 范数，它们在墨色横梁上平衡：积为 1。`, `The top of the violet ternion sphere is [1 : 0 : 0 : 0], the zero slot q⁰ = 1: not one blank is laid out in advance. The five violet beads above are the states S0 to S4, the amber ring the present one; cyan beads are the minted registers ${J.minted.length ? list(J.minted) : '—'}. The candidate ${J.cand} is ${J.accepted ? `≤ ${J.M}, cyan, through S3` : `> ${J.M}, magenta, stopped by the magenta wall at S3`}. In the ledger each bar is the log₁₀ norm of one place, and the bars balance on the ink beam: the product is 1.`],
          fig: [`M_Ω = ${J.M}：铸造 ${J.minted.length ? list(J.minted) : '—'}，候选 ${J.cand} ${J.accepted ? '≤' : '>'} ${J.M}${J.accepted ? '' : '，在 S3 被拒'}。`, `M_Ω = ${J.M}: minted ${J.minted.length ? list(J.minted) : '—'}; the candidate ${J.cand} ${J.accepted ? '≤' : '>'} ${J.M}${J.accepted ? '' : ', rejected at S3'}.`]
        };
      }
      case 'vernier': {
        const V = m.vernier,
          c = V.core,
          wit = c.wit ? `${c.wit.num}/${c.wit.den}` : null;
        return {
          long: [`玻璃球的高度是 2κ − 1，墨色虚线赤道是 κ = 1/2，紫色经线是 ℚP¹。前 ${V.K} 个素数、指数不超过 ${V.H} 的比里最接近 1 的那些是青点，K 越大越贴近赤道。琥珀珠是盒内大于 1 的最小比 ${c.best.num}/${c.best.den}${wit && c.wit.idx !== c.best.idx ? `，带青圈的是满支撑见证 ${wit}` : ''}；右边的卡尺把 Δκ 放大，琥珀拨盘是 K。`, `The height on the glass sphere is 2κ − 1: the dashed ink equator is κ = 1/2, the violet meridian ℚP¹. The ratios of the first ${V.K} primes with exponents up to ${V.H} that lie nearest 1 are the cyan points, closer to the equator as K grows. The amber bead is the least ratio above 1 in the box, ${c.best.num}/${c.best.den}${wit && c.wit.idx !== c.best.idx ? `, the ringed cyan one the full-support witness ${wit}` : ''}; the caliper on the right magnifies Δκ, and the amber dial is K.`],
          fig: [`K = ${V.K}、H = ${V.H}：${group(c.count)} 个比挤向赤道，盒内最小 ${c.best.num}/${c.best.den}${wit ? `，满支撑见证 ${wit}` : ''}。`, `K = ${V.K}, H = ${V.H}: ${group(c.count)} ratios crowd to the equator; least in the box ${c.best.num}/${c.best.den}${wit ? `, full-support witness ${wit}` : ''}.`]
        };
      }
      case 'tower': {
        const T_ = m.tower,
          tw = T_.tw,
          io = `${tw.input} → ${tw.target}`,
          fin = tw.primes
            .map((p, i) => [p, tw.exps[tw.beats][i]])
            .filter(([, e]) => e > 0)
            .map(([p, e]) => p + (e > 1 ? sup(e) : ''))
            .join(' · '),
          onTarget = T_.beat === tw.beats;
        return {
          long: [`品红轨迹是串行 FRACTRAN 程序 ${io}：每拍乘一个分数，绕着玻璃球走 ${tw.beats} 拍，半径随 log N 鼓起，品红圈处到达峰值 ${group(tw.peak)}。球下的前弧上立着 ${tw.primes.length} 座寄存器底座，紫柱的高是各素数寄存器的指数，随 t 移动而升降；t = ${tw.beats} 时只有紫柱 ${fin} 立起。青色引理弧把输入一拍送到目标。琥珀圈标出当前拍 t = ${T_.beat}，N = ${group(T_.N)}${onTarget ? `，正落在青色目标珠 ${group(tw.target)} = ${fin} 上` : ''}。`, `The magenta path is the serial FRACTRAN program ${io}: each beat multiplies by one fraction, ${tw.beats} beats round the glass sphere, its radius swelling with log N up to the peak ${group(tw.peak)} at the magenta ring. The ${tw.primes.length} register plinths stand on the front arc below the sphere, their violet pillars rising and falling with the exponents of the prime registers as t moves; at t = ${tw.beats} only the violet pillar ${fin} stands raised. The cyan lemma arc takes the input to the target in one beat. The amber ring marks the present beat t = ${T_.beat}, N = ${group(T_.N)}${onTarget ? `, on the cyan target bead ${group(tw.target)} = ${fin}` : ''}.`],
          fig: [`串行 ${io} 走 ${tw.beats} 拍、途经 ${group(tw.peak)}；青色引理弧 1 拍直达。`, `Serial ${io} takes ${tw.beats} beats through ${group(tw.peak)}; the cyan lemma arc takes 1.`]
        };
      }
      default: {
        const C = m.crt,
          M = group(C.M);
        return {
          long: [`紫球是观察者，六条环是素数 2 至 13：前 ${Math.min(6, C.K)} 条已唤醒，青色并耦合到球上；其余是半透明紫色的暗态。地上的紫环是 ℤ/${M}：${C.collide ? `7 与 37 落在同一处，品红` : '7 与 37 分在两处，青色'}。斜穿的 N_ext = 77 ${C.g77 === 1n ? '是紫色虚线，不耦合' : '变成青色，已耦合'}。地上 8 个紫格是滑动记忆，最旧的锚点正在移出。`, `The violet ball is the observer and the six rings are the primes 2 to 13: the first ${Math.min(6, C.K)} are awake, cyan and coupled to the ball; the others are translucent violet, dark. The violet ring on the floor is ℤ/${M}: ${C.collide ? '7 and 37 fall on one place, magenta' : '7 and 37 fall apart, cyan'}. The slanting N_ext = 77 ${C.g77 === 1n ? 'is a dashed violet line, uncoupled' : 'turns cyan, coupled'}. The 8 violet slots on the floor are the sliding memory, its oldest anchor moving out.`],
          fig: [`P${subd(C.K)}# = ${M}：${C.collide ? '7 与 37 在品红处混叠' : '7 与 37 已分开'}；紫环是未唤醒的暗态。`, `P${subd(C.K)}# = ${M}: ${C.collide ? '7 and 37 alias at the magenta mark' : '7 and 37 have come apart'}; violet rings are dark.`]
        };
      }
    }
  }

  /* ---------- labels ---------- */
  function tags(m, o, tapeEnd) {
    const s = state.scene,
      lens = state.lensT > 0.5,
      tn = tiny(),
      low = stage.clientHeight < 300;
    const off = (p, right, up) => add(add(p, scale(cam.R, right / sc.unit)), scale(cam.U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (lens && tapeEnd && !low) N('tape', off(tapeEnd, 0, 14), L('ℵ₀ 个空格 0（MODEL）', 'ℵ₀ blanks 0 (MODEL)'), 'c-mg');
    if (s === 'ray') {
      const R = m.ray,
        G = rayGeom(R.T);
      N('focus', off(G.rail(R.r, R.v), 30, -16), `m = ${R.m} · ${nText(R.cur)}`, 'c-am');
      const ok = R.otherKill;
      if (R.mMax >= killM(R.T, R.other)) N('otherKill', off(G.rail(R.other, killM(R.T, R.other)), -30, 14), nText(ok), 'c-mg');
      if (!tn) {
        const lane = R.lanes.find((l) => l.r === R.r),
          first = lane.beads.find((b) => b.isComposite && b.m !== lane.kill && b.m !== R.m);
        if (first && first.m < lane.kill) N('first', off(G.rail(R.r, first.m), 30, 0), nText(first), 'c-mg');
        for (const rr of [1, 5]) N('rail' + rr, off(G.rail(rr, G.mMax + 0.9), 0, 10), `r = ${rr}`, 'c-cy');
        N('ring', off([0.86 * cs(frontAz('ray') + 0.9), 0.86 * sn(frontAz('ray') + 0.9), RAY.floor], 0, -14), `ℤ/${R.T} · ΔI${sub2('Schur')} = 0`, 'c-mg');
      }
      N('period', off([0, 0, G.z1], 0, 18), `T = ${R.T}`, 'c-vi');
    }
    if (s === 'wheel') {
      const w = m.wheel,
        W = w.W,
        G = wheelGeom(w.k),
        zh = G.z(W.squareHorizon),
        fa = frontAz('wheel');
      N('next', off(G.at(w.next, 0.03), 28, 12), `${pk(w.k + 1)} = ${w.next}`, 'c-am');
      N('horizon', off([(WH.coil + 0.1) * cs(fa - 1.1), (WH.coil + 0.1) * sn(fa - 1.1), zh], -10, 14), `${pk(w.k + 1)}² = ${W.squareHorizon}`, 'c-vi');
      const leak = W.firstCompositeLeak;
      N('leak', off(G.at(leak, 0.03), 30, -2), `${leak} = ${timesText(pairOf(leak))}`, 'c-mg');
      if (!tn) {
        let second = 0;
        for (let n = leak + 1; n <= G.N && !second; n++) if (W.primes.every((q) => n % q) && !isPrimeN(n)) second = n;
        if (second) N('leak2', off(G.at(second, 0.03), 30, 0), `${second} = ${timesText(pairOf(second))}`, 'c-mg');
        N('Mk', off([WH.rf * 0.9 * cs(fa + 0.6), WH.rf * 0.9 * sn(fa + 0.6), WH.floor], 0, -14), `${Mk(w.k)} = ${group(W.primorial)} · φ = ${group(W.totient)}`, 'c-vi');
        if (lens) N('fix6', off(G.at(25, 0.07), -34, 0), L('T = 6 固定：25、35 … (MODEL)', 'T = 6 fixed: 25, 35 … (MODEL)'), 'c-mg');
      }
    }
    if (s === 'jit') {
      const J = m.jit,
        names = J.halted ? [['S0 种子 2', 'S0 seed 2'], ['S1 账本', 'S1 ledger'], ['S2 最小互素', 'S2 least coprime'], [`S3 p ≤ ${MO}`, `S3 p ≤ ${MO}`], ['S4 停机', 'S4 halt']] : [['S0 种子 2', 'S0 seed 2'], ['S1 账本', 'S1 ledger'], ['S2 最小互素', 'S2 least coprime'], [`S3 p ≤ ${MO}`, `S3 p ≤ ${MO}`], ['S4 铸造', 'S4 mint']];
      for (let j = 0; j < 5; j++) {
        const p = nodeAt(j),
          outw = unit([p[0], p[1], 0]),
          r = dot(outw, cam.R);
        N('S' + j, off(p, r >= 0 ? 34 : -34, 12), tn ? 'S' + j : L(...names[j]), j === J.node ? 'c-am' : 'c-vi');
      }
      N('pole', off([0, 0, JIT.R], 0, 16), 'q⁰ = 1 · [1 : 0 : 0 : 0]', 'c-ik');
      const cp = add(nodeAt(3), scale(unit([nodeAt(3)[0], nodeAt(3)[1], 0]), 0.2));
      N('cand', off(cp, 0, -16), J.accepted ? `${J.cand} ≤ ${J.M}` : `${J.cand} > ${J.M}`, J.accepted ? 'c-cy' : 'c-mg');
      if (!tn) J.minted.forEach((p, i) => N('reg' + i, off(regAt(i), 0, -14), String(p), i === J.whole - 1 && J.f === 0 ? 'c-am' : 'c-cy'));
      // the ledger
      const ad = J.ad,
        items = [{ k: `|r|${sub2('∞')}`, q: ad.arch, c: 'c-vi' }, ...ad.norms.map((nn) => ({ k: `|r|${sub2(nn.p)}`, q: nn.norm, c: 'c-cy' }))],
        n = items.length;
      items.forEach((it, i) => {
        const x = lerp(-0.72, 0.72, n === 1 ? 0.5 : i / (n - 1)),
          lg = Math.log10(fval(it.q));
        if (!tn || i === 0) N('led' + i, pp(x, lg >= 0 ? -0.2 : 0.17, 0.1), tn ? it.k : `${it.k} = ${fstr(it.q)}`, it.c);
      });
      N('ledTitle', pp(0, 0.6, 0.1), `|r|${sub2('∞')} · ∏ |r|${sub2('p')} = ${fstr(ad.totalQ)}`, 'c-ik');
    }
    if (s === 'vernier') {
      const V = m.vernier,
        c = V.core;
      N('boxMin', off(o.bm, 34, -12), `${c.best.num}/${c.best.den}`, 'c-am');
      if (o.wp && !tn) N('witness', off(o.wp, 34, 12), `${c.wit.num}/${c.wit.den}`, 'c-cy');
      N('one', off(o.one, 0, 16), '[1 : 1] · κ = 1/2', 'c-ik');
      N('dial', off(o.focus, 0, -20), `K = ${V.K}`, 'c-am');
      if (!tn) N('count', off([0, 0, VER.R], 0, 16), `${2 * V.H + 1}${sup(V.K)} = ${group(c.count)}`, 'c-cy');
      const dkB = fval(c.best.dk),
        dkW = c.wit ? fval(c.wit.dk) : 0,
        w = 1.18 * Math.max(dkB, dkW),
        X = (d) => lerp(-0.8, 0.8, d / w),
        mag = (1.6 * PAN.h) / w / (2 * VER.R * 0.97);
      N('calMin', pp(X(dkB), 0.36, 0.1), `Δκ = ${fstr(c.best.dk)}`, 'c-am');
      if (c.wit && c.wit.idx !== c.best.idx && !tn) N('calWit', pp(X(dkW), -0.32, 0.1), fstr([BigInt(c.wit.num), BigInt(c.wit.den)]), 'c-cy');
      N('calTitle', pp(0, 0.6, 0.1), L(`Δκ 放大 ×${fmtMag(mag)}`, `Δκ magnified ×${fmtMag(mag)}`), 'c-ik');
      N('calZero', pp(X(0), -0.42, 0.1), 'κ = 1/2', 'c-ik');
    }
    if (s === 'tower') {
      const T_ = m.tower,
        tw = T_.tw;
      const fac = (n) =>
        factorB(n)
          .map(([p, e]) => p + (e > 1 ? sup(e) : ''))
          .join(' · ');
      N('in', off(o.A, -36, -10), `${group(tw.input)} = ${fac(tw.input)}`, 'c-ik');
      N('out', off(o.B, 36, 10), `${group(tw.target)} = ${fac(tw.target)}`, 'c-cy');
      N('lemma', off(o.arcTop, 0, 16), L('引理 1 拍', 'lemma 1 beat'), 'c-cy');
      N('now', off(o.focus, 30, -14), `t = ${T_.beat} · N = ${group(T_.N)}`, 'c-am');
      if (!tn) {
        N('peak', off(o.peak, -36, 12), L(`峰值 ${group(tw.peak)}`, `peak ${group(tw.peak)}`), 'c-mg');
        N('beats', off(towerPoint(tw, tw.beats * 0.5), 36, 0), L(`${tw.beats} 拍`, `${tw.beats} beats`), 'c-mg');
        tw.primes.forEach((p, i) => {
          const e = T_.exps[i];
          if (e > 0) N('pil' + i, off(add(pillarAt(i, tw.primes.length), [0, 0, 0.02 + 0.12 * e]), 0, 12), `${p}${sup(e)}`, 'c-vi');
        });
      }
    }
    if (s === 'crt') {
      const C = m.crt,
        M = group(C.M);
      N('alias', off(o.px7, 0, -18), C.collide ? `7 ≡ 37 (mod ${M})` : `7 · 37 (mod ${M})`, C.collide ? 'c-mg' : 'c-cy');
      N('dial', off(o.focus, 0, 18), `K = ${C.K}`, 'c-am');
      N('next', off(NEXT[0], 30, 12), `N${sub2('ext')} = 77 · gcd = ${C.g77}`, C.g77 === 1n ? 'c-vi' : 'c-cy');
      if (!tn) {
        for (let i = 0; i < 6; i++) {
          const q = ringPts(i)[Math.round(30 + 9 * i) % 96];
          N('ring' + i, off(q, 0, 0), String(PRIMES[i]), i < C.K ? 'c-cy' : 'c-vi');
        }
        N('mem', off(o.slots[4], 0, -16), `W${sub2('M')} · 8 ≪ 7${sup(C.K)} = ${group(C.states)}`, 'c-vi');
        if (lens) N('ghost', off([(CR.crt + 0.16) * cs(crtAngle(7, 30)), (CR.crt + 0.16) * sn(crtAngle(7, 30)), CR.z], 0, -16), L('固定模 30：7 ≡ 37（MODEL）', 'fixed 30: 7 ≡ 37 (MODEL)'), 'c-mg');
      }
    }
  }
  const fmtMag = (x) => {
    if (!(x > 0)) return '—';
    const e = Math.floor(Math.log10(x)),
      d = Math.round(x / 10 ** (e - 1));
    return group(d * 10 ** (e - 1));
  };
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈≡≤>]) −?[\d,./]+/g, '<span class="nb">$&</span>');
  const ACTS = {
    ray: ['m + 1 ▸', 'm + 1 ▸'],
    wheel: ['k + 1 ▸', 'k + 1 ▸'],
    jit: ['下一拍 ▸', 'Next beat ▸'],
    vernier: ['K + 1 ▸', 'K + 1 ▸'],
    tower: ['下一拍 ▸', 'Next beat ▸'],
    crt: ['K + 1 ▸', 'K + 1 ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems()
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACTS[state.scene]);
    b.hidden = !!TRV.still;
    if (b.textContent !== text) b.textContent = text;
  }
  // labels keep near their anchors and stay off the title, the buttons, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), $('stageAct'), handle].filter((el) => !el.hidden && el.getClientRects().length).map((el) => el.getBoundingClientRect());
    const tagsNow = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const t of tagsNow) t.style.translate = '';
    const boxes = tagsNow.map((t) => t.getBoundingClientRect());
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
      tagsNow[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(at);
    };
    const STEP_X = 20,
      cols = 2 * Math.ceil(bounds.width / STEP_X);
    for (const [i, box] of boxes.entries()) {
      const dx = clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right),
        here = free(box, dx, 0);
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
      else tagsNow[i].hidden = true;
    }
  }

  /* ---------- the stage, drawn ---------- */
  const DRAW = { ray: drawRay, wheel: drawWheel, jit: drawJit, vernier: drawVernier, tower: drawTower, crt: drawCrt };
  function drawStage(m) {
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    PAN = narrow() ? FRAMES.narrow : FRAMES.wide;
    fit();
    const a = state.fade;
    sc.begin();
    const o = DRAW[state.scene](m, a) || {};
    const tapeEnd = drawTape(state.scene, state.lensT * a);
    const here = handleWorld(state.at[state.scene]);
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 12, normal: cam.D, key: 'halo' });
    tags(m, o, tapeEnd);
    sc.end();
    const q = sc.p(here);
    handle.hidden = !!TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- the strip ---------- */
  const PAD = [44, 14, 12, 22];
  const SUPM = (n) => '10' + String(n).replace('-', '⁻').replace(/\d/g, (c) => SUPS[c]);
  function drawPlot(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const s = state.scene,
      T_ = $('plotTitle'),
      M_ = $('plotMeta');
    if (s === 'ray') {
      const R = m.ray,
        g = kit.plot(cv, { x: [-0.6, R.mMax + 0.6], y: [-0.7, 1.7], pad: PAD }),
        step = R.T <= 10 ? 1 : 5;
      T_.textContent = L('沿 m：两条余数轨上的素数（青）与合数（品红）', 'Along m: primes (cyan) and composites (magenta) on the two rails');
      M_.textContent = `m = ${R.m} · n = ${R.cur.value}`;
      g.axes({ xTicks: range(R.mMax + 1).filter((x) => x % step === 0), yTicks: [[0, 'r = 5'], [1, 'r = 1']] });
      R.lanes.forEach((lane) => {
        const y = lane.r === 1 ? 1 : 0;
        for (const b of lane.beads) {
          if (b.value === '1') g.dot(b.m, y, P.ink, 3.4, { ring: true });
          else g.dot(b.m, y, b.isComposite ? P.magenta : P.cyan, b.isComposite ? 4.4 : 3.6);
          if (b.m === lane.kill) g.dot(b.m, y, P.magenta, 8, { ring: true, width: 1.6 });
        }
      });
      g.line([[R.v, -0.55], [R.v, 1.55]], P.amber, { width: 1.2 });
    } else if (s === 'wheel') {
      const w = m.wheel,
        counts = [1, 2, 3, 4, 5].map((k) => evalPrimorialWheel(k).newPrimesInHorizon.length),
        g = kit.plot(cv, { x: [0.4, 5.6], y: [-2, 40], pad: PAD });
      T_.textContent = L('沿 k：平方视界内的新素数（青柱）与误差（品红，恒为 0）', 'Along k: new primes inside the square horizon (cyan bars) and errors (magenta, always 0)');
      M_.textContent = `k = ${w.k} · ${counts[w.k - 1]} · 0`;
      g.axes({ xTicks: [1, 2, 3, 4, 5].map((k) => [k, `k = ${k}`]), yTicks: [0, 10, 20, 30] });
      counts.forEach((c, i) => {
        const k = i + 1;
        g.rect(k - 0.28, 0, k + 0.28, c, P.cyan, { alpha: k === w.k ? 0.6 : 0.32, stroke: k === w.k ? P.amber : null, width: 1.4 });
        g.text(k, c + 2.5, String(c), P.cyan, { align: 'center', size: 10.5 });
        g.dot(k, evalPrimorialWheel(k).errorsInHorizon, P.magenta, 3.6);
      });
      g.line([[0.6, 0], [5.4, 0]], P.magenta, { width: 1.2, alpha: 0.8 });
    } else if (s === 'jit') {
      const J = m.jit,
        g = kit.plot(cv, { x: [0, 56], y: [-0.5, 18], pad: PAD });
      T_.textContent = L('K_max 随 M_Ω 的台阶：越细的 ε_self 装下越多寄存器，但总是有限', 'K_max along M_Ω: a finer ε_self holds more registers, always finitely many');
      M_.textContent = `M_Ω = ${J.M} · K_max = ${J.Kmax} · 2²⁵⁶ ⇒ 43 · 2³²⁷ ⇒ 53`;
      g.axes({ xTicks: [3, 5, 10, 15, 20, 30, 50], yTicks: [0, 5, 10, 15] });
      const pts = [];
      for (let x = 1; x <= 56; x++) {
        const k = kmaxOf(x);
        pts.push([x, kmaxOf(x - 1)], [x, k]);
      }
      g.line(pts, P.cyan, { width: 1.6 });
      for (const x of [3, 5, 10, 15, 20, 30, 50]) g.dot(x, kmaxOf(x), P.violet, 3.4);
      g.dot(J.M, J.Kmax, P.amber, 5);
    } else if (s === 'vernier') {
      const V = m.vernier,
        rows = [1, 2, 3, 4, 5, 6].map((K) => vernierCore(K, V.H)),
        lg = (c) => (c ? Math.log10((c.num - c.den) / c.den) : null),
        g = kit.plot(cv, { x: [0.5, 6.5], y: [-5.4, 0.6], pad: PAD });
      T_.textContent = L('沿 K：盒内最小步长 r − 1（青）与满支撑见证（空心）按指数缩小', 'Along K: the least step r − 1 in the box (cyan) and the full-support witness (hollow) shrink exponentially');
      M_.textContent = `H = ${V.H} · K = ${V.K} · r − 1 = ${V.core.best.num - V.core.best.den}/${V.core.best.den}`;
      g.axes({ xTicks: [1, 2, 3, 4, 5, 6].map((k) => [k, `K = ${k}`]), yTicks: [0, -1, -2, -3, -4, -5].map((e) => [e, e ? SUPM(e) : '1']) });
      g.line(rows.map((c, i) => [i + 1, lg(c.best)]), P.cyan, { width: 1.4 });
      rows.forEach((c, i) => {
        g.dot(i + 1, lg(c.best), i + 1 === V.K ? P.amber : P.cyan, i + 1 === V.K ? 5 : 3.6);
        if (c.wit) g.dot(i + 1, lg(c.wit), P.cyan, 6, { ring: true, width: 1.4 });
      });
    } else if (s === 'tower') {
      const tw = m.tower.tw,
        top = Math.log10(Number(tw.peak)) * 1.12,
        g = kit.plot(cv, { x: [0, tw.beats], y: [0, top], pad: PAD });
      T_.textContent = L('沿节拍：串行轨迹的 log₁₀ N（品红）对单拍引理（青）', 'Along the beats: log₁₀ N of the serial path (magenta) against the one-beat lemma (cyan)');
      M_.textContent = `t = ${m.tower.beat} · N = ${group(m.tower.N)}`;
      const step = tw.beats > 40 ? 50 : 3;
      g.axes({ xTicks: range(Math.floor(tw.beats / step) + 1).map((i) => i * step), yTicks: range(Math.floor(top) + 1).map((e) => [e, e ? SUPM(e) : '1']) });
      g.line(tw.trace.map((x, i) => [i, Math.log10(Number(x))]), P.magenta, { width: 1.3 });
      g.line([[0, Math.log10(Number(tw.input))], [1, Math.log10(Number(tw.target))], [tw.beats, Math.log10(Number(tw.target))]], P.cyan, { width: 1.8 });
      g.dot(tw.peakAt, Math.log10(Number(tw.peak)), P.magenta, 6, { ring: true });
      g.line([[m.tower.v, 0], [m.tower.v, top]], P.amber, { width: 1.2 });
    } else {
      const C = m.crt,
        g = kit.plot(cv, { x: [1.5, 10.5], y: [0, 10.5], pad: PAD });
      T_.textContent = L('沿 K：log₁₀ P_K#（紫）越过 log₁₀ 30 时混叠解除；状态数 7^K（品红）远超 8 格记忆', 'Along K: aliasing ends once log₁₀ P_K# (violet) passes log₁₀ 30; the 7^K states (magenta) dwarf the 8 memory slots');
      M_.textContent = `K = ${C.K} · P_K# = ${group(C.M)}`;
      g.axes({ xTicks: range(9).map((i) => i + 2), yTicks: [0, 2, 4, 6, 8, 10].map((e) => [e, e ? SUPM(e) : '1']) });
      const Ks = range(9).map((i) => i + 2);
      g.line(Ks.map((K) => [K, Math.log10(Number(prodB(PRIMES.slice(0, K))))]), P.violet, { width: 1.6 });
      g.line(Ks.map((K) => [K, K * Math.log10(7)]), P.magenta, { width: 1.3, dash: [4, 3] });
      g.line([[1.6, Math.log10(30)], [10.4, Math.log10(30)]], P.ink, { width: 1, alpha: 0.8 });
      g.line([[1.6, Math.log10(8)], [10.4, Math.log10(8)]], P.dim, { width: 1, dash: [3, 3] });
      for (const K of Ks) g.dot(K, Math.log10(Number(prodB(PRIMES.slice(0, K)))), K <= 3 ? P.magenta : P.violet, 3.4);
      g.line([[C.K, 0], [C.K, 10.3]], P.amber, { width: 1.2 });
    }
  }

  /* ---------- readouts ---------- */
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      R = m.ray,
      w = m.wheel,
      J = m.jit,
      V = m.vernier,
      Tw = m.tower,
      C = m.crt;
    put('roKey', keyOf(m));
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roRay', `T = ${R.T} · r = ${R.r} · m = ${R.m} · ${group(R.cur.value)} · ${R.cur.isComposite ? timesText(R.cur.factorPair) : R.cur.value === '1' ? L('单位', 'unit') : L('素数', 'prime')}`);
    put('roWheel', `${w.k} · ${group(w.W.primorial)} · ${group(w.W.totient)} · ${w.W.squareHorizon} · ${w.W.newPrimesInHorizon.length} · ${w.W.errorsInHorizon}`);
    put('roJit', `${J.M} · ${J.minted.length ? J.minted.join(', ') : '—'} · ${J.Kmax} · ${group(J.product)} · ${J.cand} ${J.accepted ? '≤' : '>'} ${J.M} · ${fstr(J.ad.arch)} × ${fstr(J.ad.padic)} = ${fstr(J.ad.totalQ)}`);
    put('roVernier', `${V.K} · ${V.H} · ${group(V.core.count)} · ${V.core.best.num}/${V.core.best.den} · ${V.core.wit ? `${V.core.wit.num}/${V.core.wit.den}` : '—'} · ${fstr(V.core.best.dk)}`);
    put('roTower', `${Tw.tw.name === 'multiply' ? L('乘法', 'multiply') : 'PRIMEGAME'} · ${Tw.beat} / ${Tw.tw.beats} · ${group(Tw.N)} · ${group(Tw.tw.peak)} · 1`);
    put('roCrt', `${C.K} · ${group(C.M)} · ${C.collide ? '7 ≡ 37' : '7 ≠ 37'} · ${C.g77} · 8 / ${group(C.states)}`);
    put('roNote', {
      ray: L('两行算术：r > 1 时 r + rT = r(1 + T)，r = 1 时 1 + (T + 2)T = (T + 1)²；页面在 T ≤ 60 的全部余数轨上核对过（NUM）。', 'Two lines of arithmetic: r + rT = r(1 + T) for r > 1 and 1 + (T + 2)T = (T + 1)² for r = 1; the page checks them on every residue rail with T ≤ 60 (NUM).'),
      wheel: L('φ(M<sub>k</sub>) = ∏(p − 1) 是无平方因子数的欧拉函数（LEAN ✓）；视界内零误差是手工推导：合数有不超过其平方根的素因子。', 'φ(M<sub>k</sub>) = ∏(p − 1) is the totient of a squarefree number (LEAN ✓); zero errors inside the horizon is derived by hand: a composite has a prime factor at most its square root.'),
      jit: L('与积互素的最小数不在已有寄存器中，欧几里得逃逸保证总有下一颗素数（LEAN ✓）；账本 |r|<sub>∞</sub> ∏ |r|<sub>p</sub> = 1 是乘积公式（LEAN ✓）。s<sub>min</sub>(p) = 1 − max w²/p 取遍范数为 p 的整四元数 w + xi + yj + zk（NUM）。若以 P<sub>K</sub># ≤ N<sub>Ω</sub> 封顶：N<sub>Ω</sub> = 2²⁵⁶ ⇒ K<sub>max</sub> = 43（p<sub>43</sub> = 191），N<sub>Ω</sub> = 2³²⁷ ⇒ K<sub>max</sub> = 53（p<sub>53</sub> = 241）。', 'The least number coprime to the product is not among the registers, and the prime escape of Euclid guarantees a next prime (LEAN ✓); the ledger |r|<sub>∞</sub> ∏ |r|<sub>p</sub> = 1 is the product formula (LEAN ✓). s<sub>min</sub>(p) = 1 − max w²/p over the integer quaternions w + xi + yj + zk of norm p (NUM). With the cap P<sub>K</sub># ≤ N<sub>Ω</sub>: N<sub>Ω</sub> = 2²⁵⁶ ⇒ K<sub>max</sub> = 43 (p<sub>43</sub> = 191), N<sub>Ω</sub> = 2³²⁷ ⇒ K<sub>max</sub> = 53 (p<sub>53</sub> = 241).'),
      vernier: L('比与指数向量一一对应（带符号素数账本，LEAN ✓）；log p 在 ℚ 上线性无关（LEAN ✓），所以盒内只有零向量给出 1，最小的比严格大于 1。', 'Ratios and exponent vectors correspond one to one (signed prime ledgers, LEAN ✓); the log p are linearly independent over ℚ (LEAN ✓), so only the zero vector gives 1 and the least ratio is strictly above 1.'),
      tower: L('FRACTRAN 每拍确定（LEAN ✓）、保持正数（LEAN ✓），停机后不再变（LEAN ✓）：625 之后再走多少拍仍是 625。', 'A FRACTRAN beat is deterministic (LEAN ✓), keeps numbers positive (LEAN ✓) and changes nothing after the halt (LEAN ✓): 625 stays 625 however many beats follow.'),
      crt: L('x ↦ (x mod p<sub>1</sub>, …, x mod p<sub>K</sub>) 在 [0, N] 上单射当且仅当 N &lt; P<sub>K</sub>#（LEAN ✓）；|37 − 7| = 30 &lt; P<sub>4</sub># 给出见证序号 ≤ 4（LEAN ✓）。', 'x ↦ (x mod p<sub>1</sub>, …, x mod p<sub>K</sub>) is injective on [0, N] exactly when N &lt; P<sub>K</sub># (LEAN ✓); |37 − 7| = 30 &lt; P<sub>4</sub># gives a witness index ≤ 4 (LEAN ✓).')
    }[state.scene]);
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    $('keyPill').innerHTML = `${KMX} <strong>= ${kmaxOf(state.M)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = {
      ray: 'r + mT · m = r ⇒ r(1 + T) · m = T + 2 ⇒ (T + 1)²',
      wheel: 'M<sub>k</sub> = p<sub>1</sub> ⋯ p<sub>k</sub> · φ(M<sub>k</sub>) = ∏(p<sub>i</sub> − 1) · (1, p<sub>k+1</sub>²)',
      jit: 'p<sub>k+1</sub> = min{n &gt; 1 : gcd(n, M<sub>k</sub>) = 1} ≤ M<sub>Ω</sub> · |r|<sub>∞</sub> ∏ |r|<sub>p</sub> = 1',
      vernier: 'κ(a/b) = b²/(a² + b²) · Δκ = (a² − b²)/(2(a² + b²))',
      tower: 'n ↦ n · f<sub>i</sub> (first f<sub>i</sub> with f<sub>i</sub> n ∈ ℕ) · R<sub>Ω</sub> ≡ 1',
      crt: 'x ↦ (x mod p<sub>i</sub>)<sub>i ≤ K</sub> injective on [0, N] ⟺ N &lt; P<sub>K</sub>#'
    }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    const badge = $('lensBadge');
    if (badge.dataset.lens !== String(state.lens)) {
      badge.dataset.lens = String(state.lens);
      badge.innerHTML = `<span class="zh">${LENS_TITLE[state.lens][0]}</span><span class="en">${LENS_TITLE[state.lens][1]}</span>`;
    }
    $('lensMirror').title = L(...LENS_TITLE[state.lens]).replace(/<\/?sub>/g, '').replace(/&amp;/g, '&');
    tChips.set(String(state.T), true);
    rChips.set(String(state.r), true);
    kChips.set(Number.isInteger(settled(state.at.wheel)) ? String(w.k) : null, true);
    mChips.set(String(state.M), true);
    aChips.set(String(state.adelic), true);
    vkChips.set(Number.isInteger(settled(state.at.vernier)) ? String(V.K) : null, true);
    vhChips.set(String(state.vh), true);
    pChips.set(state.prog, true);
    cChips.set([2, 3, 4, 5, 6, 10].includes(C.K) && Number.isInteger(settled(state.at.crt)) ? String(C.K) : null, true);
  }
  let syncNotes = null;
  const paint = kit.painter(() => {
    const m = calc();
    hud(m);
    if (syncNotes) syncNotes(m);
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
    rate: 2.4,
    step: 1,
    max: 9,
    t: 8,
    format: (t) => {
      const v = settled(t),
        whole = Number.isInteger(v),
        k = Math.round(v);
      switch (state.scene) {
        case 'wheel':
          return `k = ${k + 1}`;
        case 'jit':
          return whole ? `K = ${v}` : `K ≈ ${kit.fix(v, 2)}`;
        case 'vernier':
          return `K = ${k + 1}`;
        case 'tower':
          return whole ? `t = ${v}` : `t ≈ ${kit.fix(v, 1)}`;
        case 'crt':
          return `K = ${k + 2}`;
        default:
          return `m = ${k}`;
      }
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a rail that counts comes to rest on a whole number
      if (!c.playing && railOf(state.scene).whole && abs(t - Math.round(t)) > 1e-9) {
        c.set(Math.round(t));
        return;
      }
      state.at[state.scene] = settled(t);
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
    const r = railOf(state.scene);
    clock.rate = r.rate;
    clock.step = 1;
    $('now').step = r.whole ? '1' : 'any';
    const at = clamp(state.at[state.scene], 0, r.max);
    clock.setMax(r.max, true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
  $('now').addEventListener('input', () => {
    if (railOf(state.scene).whole) {
      const v = Math.round(clock.t);
      if (v !== clock.t) clock.set(v);
    }
  });
  playBtn.addEventListener('click', () => clock.toggle());
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      clock.pause();
      clock.set(0);
    });

  /* ---------- controls ---------- */
  let booting = true,
    fadeRun = null;
  function fadeIn() {
    if (fadeRun) fadeRun.cancel();
    state.fade = 0.3;
    fadeRun = kit.tween(
      480,
      (x) => {
        state.fade = 0.3 + 0.7 * x;
        paint();
      },
      () => {
        state.fade = 1;
        fadeRun = null;
        paint();
      }
    );
  }
  function setScene(scene) {
    clock.pause();
    state.scene = scene;
    setRail();
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopAt = null;
    cards.mark(null);
    clock.pause();
  }
  function show(scene) {
    if (state.scene === scene) return;
    setScene(scene);
    sc.view(CAMS[scene], 0);
  }
  /** A control of a card shows the card and changes it. */
  function steer(scene, change) {
    leave();
    show(scene);
    change();
    setRail();
    paint();
  }
  const tChips = kit.chips($('tChips'), 'period', (v) =>
    steer('ray', () => {
      state.T = Number(v);
      setRail();
      clock.set(killM(state.T, state.r));
    })
  );
  const rChips = kit.chips($('rChips'), 'start', (v) =>
    steer('ray', () => {
      state.r = Number(v);
      clock.set(killM(state.T, state.r));
    })
  );
  const kChips = kit.chips($('kChips'), 'wheel', (v) => steer('wheel', () => clock.set(Number(v) - 1)));
  const mChips = kit.chips($('mChips'), 'horizon', (v) =>
    steer('jit', () => {
      state.M = Number(v);
      setRail();
      clock.set(kmaxOf(state.M));
    })
  );
  const aChips = kit.chips($('aChips'), 'adelic', (v) => steer('jit', () => (state.adelic = Number(v))));
  const vkChips = kit.chips($('vkChips'), 'vk', (v) => steer('vernier', () => clock.set(Number(v) - 1)));
  const vhChips = kit.chips($('vhChips'), 'vh', (v) => steer('vernier', () => (state.vh = Number(v))));
  const pChips = kit.chips($('pChips'), 'prog', (v) =>
    steer('tower', () => {
      state.prog = v === 'primegame' ? 'primegame' : 'multiply';
      setRail();
      clock.set(TOWER[state.prog].beats);
    })
  );
  const cChips = kit.chips($('cChips'), 'crt', (v) => steer('crt', () => clock.set(Number(v) - 2)));
  /** One unit of the rail forward, from the start again once the end is reached. The card stays marked. */
  function stepOne() {
    clock.pause();
    const r = railOf(state.scene),
      k = Math.floor(state.at[state.scene] + 1e-9);
    if (r.whole) {
      clock.set(k >= r.max ? 0 : k + 1);
      return;
    }
    if (k >= r.max) clock.set(0);
    stopAt = Math.min(r.max, (k >= r.max ? 0 : k) + 1);
    clock.play();
  }
  $('stageAct').addEventListener('click', stepOne);
  // the lens changes the frame and keeps the state; the switch in the deck and its mirror in the tour bar both flip it
  let lensRun = null;
  function setLens(v) {
    state.lens = v ? 1 : 0;
    const from = state.lensT,
      to = state.lens;
    if (lensRun) lensRun.cancel();
    lensRun = null;
    if (TRV.still || booting) {
      state.lensT = to;
      paint();
      return;
    }
    lensRun = kit.tween(
      500,
      (x) => {
        state.lensT = lerp(from, to, x);
        paint();
      },
      () => {
        state.lensT = to;
        lensRun = null;
        paint();
      }
    );
  }
  for (const id of ['lensToggleBtn', 'lensMirror']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards: each opens paused on its still ---------- */
  function applyPreset(id) {
    const p = PRESETS[id];
    stopAt = null;
    clock.pause();
    Object.assign(state, FRESH);
    for (const s of SCENES) state.at[s] = stillOf(s);
    const instant = booting || !!TRV.still;
    setScene(p.scene);
    sc.view(CAMS[p.scene], instant ? 0 : 650);
    clock.set(state.at[p.scene]);
    if (!instant && !TRV.reduceMotion) fadeIn();
    paint();
  }
  const notesObj = Object.fromEntries(Object.keys(PRESETS).map((id) => [id, ['', '']])),
    idlePair = ['', ''];
  const shortNotes = () => TRV.figure || window.innerWidth <= 520;
  const plain = (s) => s.replace(/<sub>(.*?)<\/sub>/g, '_$1').replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  function writeNotes(m) {
    const n = noteOf(m),
      pr = (shortNotes() ? n.fig : n.long).map(plain);
    notesObj[CARD_OF[state.scene]] = pr;
    idlePair[0] = '自由探索：' + pr[0];
    idlePair[1] = 'Free play: ' + pr[1];
    return pr;
  }
  writeNotes(calc());
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: notesObj, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset, idle: idlePair });
  let noteKey = null;
  syncNotes = (m) => {
    const pr = writeNotes(m),
      key = (cards.current || 'idle') + '|' + pr.join('|');
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
      r = railOf(state.scene),
      n = r.whole ? r.max : Math.min(600, Math.max(120, r.max * 4));
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= n; k++) {
      const v = (r.max * k) / n,
        p = sc.p(handleWorld(v)),
        d = hypot(p[0] - x, p[1] - y) + abs(clock.t - v) * 1e-4;
      if (d < gap) {
        gap = d;
        best = v;
      }
    }
    clock.set(r.whole ? Math.round(best) : settled(best));
  };
  const release = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onpointerup = release;
  handle.onpointercancel = release;
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
    // 1 · every residue rail of every period T ≤ 60: the point of the two lines of arithmetic is composite
    let rays = 0,
      rayBad = 0;
    for (let T = 1; T <= 60; T++)
      for (let r = 1; r <= T; r++) {
        rays++;
        if (!evalStaticRay(T, r, killM(T, r)).isComposite) rayBad++;
      }
    // 2 · the wheels k = 1 … 6: zero errors inside (1, p²), the first leak at p², φ by counting against ∏(p − 1)
    const wheels = [1, 2, 3, 4, 5, 6].map((k) => {
      const W = evalPrimorialWheel(k),
        M = Number(W.primorial);
      let count = 0;
      for (let n = 1; n <= M; n++) if (gcdN(n, M) === 1) count++;
      return { k, M, phi: W.totient, counted: count, primes: W.newPrimesInHorizon.length, errors: W.errorsInHorizon, leak: W.firstCompositeLeak, horizon: W.squareHorizon };
    });
    let sqfTried = 0,
      sqfBad = 0;
    for (let d = 1; d <= 400; d++) {
      const f = factorB(BigInt(d));
      if (f.some(([, e]) => e > 1)) continue;
      sqfTried++;
      let c = 0;
      for (let n = 1; n <= d; n++) if (gcdN(n, d) === 1) c++;
      if (BigInt(c) !== totB(f.map(([p]) => p))) sqfBad++;
    }
    // 3 · the cap: K_max for the seven horizons and for N_Ω = 2²⁵⁶, 2³²⁷ (P_K# ≤ N_Ω < P_{K+1}#)
    const kmax = [3, 5, 10, 15, 20, 30, 50].map((M) => kmaxOf(M));
    const capOf = (bits) => {
      const N = 1n << BigInt(bits);
      let k = 0,
        prod = 1n;
      while (prod * BigInt(PRIMES[k]) <= N) prod *= BigInt(PRIMES[k++]);
      return { K: k, p: PRIMES[k - 1] };
    };
    const cap256 = capOf(256),
      cap327 = capOf(327);
    // 4 · the product formula on the four ledgers and on every a/b with 1 ≤ a, b ≤ 40
    const ledgers = ADELIC.map(([a, b]) => finiteAdelicProduct(a, b));
    let ledTried = 0,
      ledBad = 0;
    for (let a = 1; a <= 40; a++)
      for (let b = 1; b <= 40; b++) {
        ledTried++;
        const t = finiteAdelicProduct(a, b).totalQ;
        if (t[0] !== 1n || t[1] !== 1n) ledBad++;
      }
    // 5 · the Vernier box: minima and witnesses for H = 3, and the 7⁶ ratios of K = 6 all distinct (the ledger is injective)
    const vrows = [1, 2, 3, 4, 5, 6].map((K) => vernierCore(K, 3));
    const seen = new Set(),
      side = 7,
      ps6 = PRIMES.slice(0, 6);
    for (let idx = 0; idx < side ** 6; idx++) {
      let t = idx,
        num = 1,
        den = 1;
      for (let i = 0; i < 6; i++) {
        const e = (t % side) - 3;
        t = Math.floor(t / side);
        if (e > 0) num *= ps6[i] ** e;
        else if (e < 0) den *= ps6[i] ** -e;
      }
      seen.add(num + '/' + den);
    }
    // 6 · Bézout and continued fractions: a·x + b·y = gcd(a, b) for a, b ≤ 60; convergents in lowest terms with determinant (−1)ⁿ
    let bezTried = 0,
      bezBad = 0;
    const egcd = (a, b) => {
      if (b === 0) return [a, 1, 0];
      const [g, x, y] = egcd(b, a % b);
      return [g, y, x - Math.floor(a / b) * y];
    };
    for (let a = 0; a <= 60; a++)
      for (let b = 0; b <= 60; b++) {
        bezTried++;
        const [g, x, y] = egcd(a, b);
        if (a * x + b * y !== g || g !== gcdN(a, b)) bezBad++;
      }
    let cfTried = 0,
      cfBad = 0;
    const lists = [];
    for (let len = 1; len <= 7; len++) for (let s = 0; s < 4 ** Math.min(len, 4); s++) lists.push(range(len).map((i) => 1 + (Math.floor(s / 4 ** (i % 4)) % 4)));
    for (const coeffs of lists) {
      let cur = [1n, 0n],
        prev = [0n, 1n];
      for (const a of coeffs) [cur, prev] = [[BigInt(a) * cur[0] + prev[0], BigInt(a) * cur[1] + prev[1]], cur];
      cfTried++;
      const det = cur[0] * prev[1] - prev[0] * cur[1];
      if (gcdB(cur[0], cur[1]) !== 1n || det !== (coeffs.length % 2 ? -1n : 1n)) cfBad++;
    }
    // 7 · Euclid: for the first k primes (k ≤ 10), a prime factor of their product + 1 is new
    let euBad = 0;
    for (let k = 1; k <= 10; k++) {
      const q = spfB(prodB(PRIMES.slice(0, k)) + 1n);
      if (PRIMES.slice(0, k).includes(Number(q)) || !isPrimeB(q)) euBad++;
    }
    // 8 · FRACTRAN: the traces, their positivity, their determinism and the stability after the halt
    const mult = TOWER.multiply,
      pg = TOWER.primegame;
    const after = fractranTrace(MULT, 625, null, 12);
    const powers = pg.trace.map((x, i) => [x, i]).filter(([x]) => x > 2n && (x & (x - 1n)) === 0n);
    // 9 · CRT: x ↦ residues mod the first K primes is injective on [0, P_K# − 1] and not on [0, P_K#]; the witness of 7, 37
    const crt = [1, 2, 3, 4, 5].map((K) => {
      const ps = PRIMES.slice(0, K),
        M = Number(prodB(ps)),
        keys = new Set();
      let inj = true;
      for (let x = 0; x <= M; x++) {
        const k = ps.map((p) => x % p).join();
        if (keys.has(k)) {
          inj = x === M;
          break;
        }
        keys.add(k);
      }
      return { K, M, ok: inj };
    });
    return { rays, rayBad, wheels, sqfTried, sqfBad, kmax, cap256, cap327, ledgers, ledTried, ledBad, vrows, distinct: seen.size, boxSize: side ** 6, bezTried, bezBad, cfTried, cfBad, euBad, mult, pg, after, powers, crt, witness: crtAt(3).witness };
  }
  const BENCH = benchmarks();
  /** The numbers of the drawer, by the data-bench of the spans that show them: [Chinese, English]. */
  const NUMBERS = {
    kill: () => nText(evalStaticRay(6, 1, 8)),
    leak: () => nText(evalStaticRay(6, 5, 5)),
    rays: () => `${group(BENCH.rays - BENCH.rayBad)} / ${group(BENCH.rays)}`,
    wheel: () => BENCH.wheels.slice(0, 5).map((w) => w.primes).join(', '),
    leaks: () => BENCH.wheels.slice(0, 5).map((w) => w.leak).join(', '),
    kmax: () => BENCH.kmax.join(', '),
    cap256: () => `K_max = ${BENCH.cap256.K} (p${BENCH.cap256.K} = ${BENCH.cap256.p})`,
    cap327: () => `K_max = ${BENCH.cap327.K} (p${BENCH.cap327.K} = ${BENCH.cap327.p})`,
    adelic: () => {
      const l = BENCH.ledgers[0];
      return `12/5 × ${l.norms.map((n) => fstr(n.norm)).join(' × ')} = ${fstr(l.totalQ)}`;
    },
    boxmin: () => BENCH.vrows.map((c) => `${c.best.num}/${c.best.den}`.replace(/\/1$/, '')).join(', '),
    witness: () => BENCH.vrows.map((c) => (c.wit ? `${c.wit.num}/${c.wit.den}`.replace(/\/1$/, '') : '—')).join(', '),
    dk: () => `= ${fstr(vernierCore(6, 3).best.dk)}`,
    mult: () => [`走 ${BENCH.mult.beats} 拍、峰值 ${group(BENCH.mult.peak)}`, `takes ${BENCH.mult.beats} beats, peak ${group(BENCH.mult.peak)}`],
    pg: () => [`走 ${BENCH.pg.beats} 拍、峰值 ${group(BENCH.pg.peak)}`, `takes ${BENCH.pg.beats} beats, peak ${group(BENCH.pg.peak)}`],
    crt: () => [`K = 2、3 时 P_K# = 6、30 整除 37 − 7 = 30，7 与 37 混叠；K ≥ 4 时 P_K# ≥ 210 > 30，两者分开，见证序号为 ${BENCH.witness}（第 ${BENCH.witness} 个素数 7）。`, `For K = 2, 3, P_K# = 6, 30 divides 37 − 7 = 30 and 7 and 37 alias; for K ≥ 4, P_K# ≥ 210 > 30 separates them, with witness index ${BENCH.witness} (the ${BENCH.witness}th prime, 7).`]
  };
  function numText(say) {
    const B = BENCH,
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`),
      wl = B.wheels.map((w) => say(`k = ${w.k}：φ = ${w.phi}（数得 ${w.counted}），视界 ${w.horizon} 内 ${w.primes} 颗、误差 ${w.errors}，首个合数 ${w.leak}`, `k = ${w.k}: φ = ${w.phi} (counted ${w.counted}), ${w.primes} inside the horizon ${w.horizon}, ${w.errors} errors, first composite ${w.leak}`)).join(say('；', '; '));
    const vr = B.vrows.map((c) => `K = ${c.K}: ${c.best.num}/${c.best.den}, ${c.wit ? `${c.wit.num}/${c.wit.den}` : '—'}`).join(say('；', '; '));
    const pw = B.powers.map(([x, i]) => `2${sup(valB(x, 2))}@${i}`).join(', ');
    const crt = B.crt.map((c) => `K = ${c.K}${say('：', ': ')}${c.ok ? say('恰到 P_K# − 1', 'up to P_K# − 1 exactly') : say('不符', 'failed')}`).join(say('；', '; '));
    return say(
      `打开页面时由脚本用大整数现算，是上面各条定理的个别实例，不检验定理的前提。余数轨：T ≤ 60 的 ${group(B.rays)} 条轨上，两行算术给出的点都是合数，${bad(B.rayBad)}。筛轮：${wl}。无平方因子的 d ≤ 400 共 ${B.sqfTried} 个，φ(d) = ∏(p − 1) ${bad(B.sqfBad)}。封顶：M_Ω = 3、5、10、15、20、30、50 时 K_max = ${B.kmax.join('、')}；P_K# ≤ 2²⁵⁶ 的最大 K 是 ${B.cap256.K}（p = ${B.cap256.p}），P_K# ≤ 2³²⁷ 的最大 K 是 ${B.cap327.K}（p = ${B.cap327.p}）。乘积公式：12/5、42/11、1716/1715、10648/10647 与 1 ≤ a, b ≤ 40 的 ${B.ledTried} 个 a/b 上 |r|_∞ ∏ |r|_p = 1，${bad(B.ledBad)}。游标（H = 3，盒最小值与满支撑见证）：${vr}；K = 6 的 ${group(B.boxSize)} 个比两两不同（${group(B.distinct)} 个）。裴蜀：0 ≤ a, b ≤ 60 的 ${B.bezTried} 对上扩展欧几里得给出 a·x + b·y = gcd(a, b)，${bad(B.bezBad)}；${B.cfTried} 个系数表的渐近分数既约且行列式为 (−1)ⁿ，${bad(B.cfBad)}；前 k ≤ 10 个素数之积加 1 的最小素因子都是新的，${bad(B.euBad)}。FRACTRAN：乘法 36 → ${B.mult.trace[B.mult.beats]} 走 ${B.mult.beats} 拍后停机，峰值 ${group(B.mult.peak)}，停机后再走 ${B.after.trace.length - 1} 拍仍是 625；PRIMEGAME 从 2 出发的 2 的幂：${pw}，峰值 ${group(B.pg.peak)}；每个状态都为正。同余读出：${crt}；7 与 37 的见证序号 ${B.witness}。数值演示，不是证明。`,
      `Computed in big integers by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Residue rails: on the ${group(B.rays)} rails with T ≤ 60 the point of the two lines of arithmetic is composite, ${bad(B.rayBad)}. Wheels: ${wl}. On the ${B.sqfTried} squarefree d ≤ 400, φ(d) = ∏(p − 1), ${bad(B.sqfBad)}. Caps: for M_Ω = 3, 5, 10, 15, 20, 30, 50, K_max = ${B.kmax.join(', ')}; the largest K with P_K# ≤ 2²⁵⁶ is ${B.cap256.K} (p = ${B.cap256.p}), with P_K# ≤ 2³²⁷ it is ${B.cap327.K} (p = ${B.cap327.p}). Product formula: |r|_∞ ∏ |r|_p = 1 on 12/5, 42/11, 1716/1715, 10648/10647 and the ${B.ledTried} ratios a/b with 1 ≤ a, b ≤ 40, ${bad(B.ledBad)}. Vernier (H = 3, box minimum and full-support witness): ${vr}; the ${group(B.boxSize)} ratios of K = 6 are pairwise distinct (${group(B.distinct)} of them). Bézout: on the ${B.bezTried} pairs 0 ≤ a, b ≤ 60 the extended Euclidean algorithm gives a·x + b·y = gcd(a, b), ${bad(B.bezBad)}; the convergents of ${B.cfTried} coefficient lists are in lowest terms with determinant (−1)ⁿ, ${bad(B.cfBad)}; the least prime factor of the product of the first k ≤ 10 primes plus 1 is new, ${bad(B.euBad)}. FRACTRAN: multiplication 36 → ${B.mult.trace[B.mult.beats]} halts after ${B.mult.beats} beats with peak ${group(B.mult.peak)} and stays 625 for ${B.after.trace.length - 1} more beats; the powers of 2 of PRIMEGAME from 2: ${pw}, peak ${group(B.pg.peak)}; every state is positive. Residue reading: ${crt}; the witness index of 7 and 37 is ${B.witness}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', (zh) => zh],
    ['en', (zh, en) => en]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
  for (const el of document.querySelectorAll('[data-bench]')) {
    const v = NUMBERS[el.dataset.bench](),
      en = !!el.closest('.en');
    el.textContent = Array.isArray(v) ? v[en ? 1 : 0] : v;
  }
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

  /* ---------- the read-only probe, the cover and the start ---------- */
  const plainJSON = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  function probeState() {
    const m = calc(),
      J = m.jit,
      V = m.vernier.core,
      C = m.crt,
      active = {
        ray: factorB(BigInt(state.T)).map(([p]) => p),
        wheel: m.wheel.W.primes,
        jit: J.minted,
        vernier: V.primes,
        tower: m.tower.tw.primes.filter((p, i) => m.tower.exps[i] > 0),
        crt: C.primes
      }[state.scene];
    const prime = prodB(active),
      nextP = PRIMES.find((p) => !active.includes(p) && p > Math.max(1, ...active)) || 2,
      horizon = nextP * nextP;
    let zero = true;
    for (let n = 2; n < horizon && zero; n++) if (active.every((p) => n % p) && !isPrimeN(n)) zero = false;
    return plainJSON({
      preset: cards.current,
      scene: state.scene,
      lens: state.lens,
      lensT: state.lensT,
      cam: { yaw: sc.cam.yaw, pitch: sc.cam.pitch, zoom: sc.cam.zoom },
      playing: clock.playing,
      railValue: clock.t,
      railMax: clock.max,
      T: state.T,
      r: state.r,
      m: m.ray.m,
      wheelK: m.wheel.k,
      horizonM: state.M,
      jitStep: J.v,
      vernierK: m.vernier.K,
      vernierH: state.vh,
      shortcutMode: state.prog,
      crtK: C.K,
      activePrimes: active,
      primorial: String(prime),
      totient: String(totB(active)),
      squareHorizon: horizon,
      zeroErrorsInSquareHorizon: zero,
      halted: J.halted,
      boxMinRatio: [String(V.best.num), String(V.best.den)],
      fullSupportRatio: V.wit ? [String(V.wit.num), String(V.wit.den)] : null,
      kappaShift: V.best.dk.map(String),
      adelicProduct: J.ad.totalQ.map(String),
      crtInjectiveUpTo: String(C.injectiveUpTo),
      stateCount: String(state.scene === 'crt' ? C.states : BigInt(V.count)),
      ray: { value: m.ray.cur.value, isComposite: m.ray.cur.isComposite, factorPair: m.ray.cur.factorPair, kill: m.ray.kill },
      tower: { beat: m.tower.beat, beats: m.tower.tw.beats, N: m.tower.N, peak: m.tower.tw.peak },
      crt: { M: C.M, rx: C.rx, ry: C.ry, collide: C.collide, g77: C.g77 },
      view: { cx: opts.cx, cy: opts.cy, radius: opts.radius, titleTop: title.top }
    });
  }
  window.__primorialVernierLab = Object.freeze({
    state: probeState,
    evalStaticRay: (T, r, m) => evalStaticRay(T, r, m),
    evalPrimorialWheel: (k) => plainJSON(evalPrimorialWheel(k)),
    growUntilHorizon: (M) => plainJSON(growUntilHorizon(M)),
    finiteAdelicProduct: (num, den) => {
      const f = finiteAdelicProduct(num, den);
      return { support: f.support.slice(), archimedean: f.archimedean.slice(), padicProduct: f.padicProduct.slice(), total: f.total.slice() };
    },
    vernierStats: (K, H) => vernierStats(K, H),
    presets: plainJSON(PRESETS),
    bench: () => plainJSON({ rays: BENCH.rays, rayBad: BENCH.rayBad, wheels: BENCH.wheels, kmax: BENCH.kmax, cap256: BENCH.cap256, cap327: BENCH.cap327, ledBad: BENCH.ledBad, distinct: BENCH.distinct, boxSize: BENCH.boxSize, bezBad: BENCH.bezBad, cfBad: BENCH.cfBad, euBad: BENCH.euBad, multBeats: BENCH.mult.beats, multPeak: BENCH.mult.peak, pgBeats: BENCH.pg.beats, pgPeak: BENCH.pg.peak, crt: BENCH.crt }),
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint
  });
  window.TRV_THUMB = () => {
    cards.pick(DEFAULT);
    clock.pause();
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
