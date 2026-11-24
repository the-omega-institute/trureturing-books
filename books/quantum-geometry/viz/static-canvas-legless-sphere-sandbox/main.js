/* OMEGA//CANVAS · 静止画布与无腿三元球观察者 · the static canvas and the legless sphere observer (Chapter 38, §38.15)
   World (kit.solid): z up. The still canvas S is a lit basin over a disc of radius RX: its height is the relational
   fidelity κ, drawn in the compressed radial chart ρ = RC/(1 + η) with η = √(r_s/r), so that κ(ρ) = ρ²/(ρ² + (RC − ρ)²)
   is 1 on the flat rim (η = 0, r → ∞), 1/2 on the horizon (η = 1) and 0 on the floor. Cyan rings are contours of S,
   magenta flow lines fall along −∇κ. The violet glass ball is the legless ternion sphere 𝕋₃ ≅ S³ (Hopf circles inside);
   its amber focus, where it touches the canvas, is the only thing that moves.
     split  one gradient ∇κ at the focus split by a memory window W_M: ‖P_W ∇κ‖² + ‖(I − P_W)∇κ‖² = ‖∇κ‖² = 1
     heap   the sphere rolls down the heap geodesic x_{n+2} = x_{n+1} x_n* x_{n+1}, x_n = b^n, b = (12 + 5i)/13, with no
            push; a legged walker (MODEL) pushes against an outside ground once per step
     cone   the Gullstrand–Painlevé future cone at the sphere: dr/(c dT) = β cos ψ − η at the stops η ∈ {0, 3/5, 4/5, 1,
            5/4, 3/2, 2}; time is drawn along the normal of the canvas
     yaw    at η = 3/2, β = 1, the half-tangent yaw u = (k − 20)/20 gives (cos ψ, sin ψ) = ((1 − u²)/(1 + u²), 2u/(1 + u²))
            and the step (dr/(c dT), v⊥/c) = (cos ψ − 3/2, sin ψ); every branch goes down
     wdw    the memory D = [1, 3/4, 1/2, 1/4] on the still canvas (Ĥ|Ψ⟩ = 0) and a pointer ptr from 0 to 3
   The lens changes the frame only: lens 0 keeps the canvas still on the screen and moves the focus; lens 1 (MODEL)
   keeps the sphere in the middle and slides the canvas past. The readings are the same in both. Fractions are pairs of
   big integers [p, q], q > 0. A number is printed after “=” only when the printed decimal is the value, decided on
   fractions, and after “≈” when it rounds it. Read-only probe: window.CANVAS_DEBUG. */
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
  const cross = (a, b) => [0, 1, 2].map((i) => a[(i + 1) % 3] * b[(i + 2) % 3] - a[(i + 2) % 3] * b[(i + 1) % 3]);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / norm(a));
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));

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
    quo = ([a, b], [c, d]) => frac(a * d, b * c),
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d);
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const equal = (a, b) => cmp(a, b) === 0;
  const ZERO = whole(0),
    ONE = whole(1);
  const neg = (a) => minus(ZERO, a);
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
  /** The rational square root of a fraction, or null. */
  function rootQ([p, q]) {
    if (p < 0n) return null;
    const isqrt = (n) => {
      if (n < 2n) return n;
      let x = BigInt(Math.floor(Math.sqrt(Number(n))));
      while (x * x > n) x--;
      while ((x + 1n) * (x + 1n) <= n) x++;
      return x;
    };
    const a = isqrt(p),
      b = isqrt(q);
    return a * a === p && b * b === q ? frac(a, b) : null;
  }
  /** A fraction in d decimals, rounded to the nearest: the text, and whether the decimal is the fraction itself. */
  function decimals([p, q], d) {
    const a = (p < 0n ? -p : p) * 10n ** BigInt(d),
      k = (2n * a + q) / (2n * q),
      s = String(k).padStart(d + 1, '0');
    return { text: (p < 0n && k > 0n ? '−' : '') + s.slice(0, s.length - d) + (d ? '.' + s.slice(s.length - d) : ''), exact: a === k * q };
  }
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  /** d + 1 significant digits with a power of ten. */
  const sci = (x, d = 3) => {
    const [m, e] = x.toExponential(d).split('e').map(Number);
    return `${kit.fix(m, d)}×10${superscript(e)}`;
  };
  /* The relation before a printed number, one rule for the whole page. “=” stands before digits that are the value itself;
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as one
     of them. */
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction (null: not rational, or not known exactly); x: the value as computed, a double. A fraction
      counts only while the computed double agrees with it. */
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
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  /** A value of the page: a fraction q when it is known exactly, and the double x. */
  const num = (q) => ({ q, x: fval(q) }),
    flo = (x) => ({ q: null, x });
  /** The relation and digits of a value. */
  const say = (v, d = 4) => rel(v.q, v.x, d);
  /** A fraction and its decimal (4/5 = 0.8000, 13/18 ≈ 0.7222); a value known only as a double: its decimal. */
  const both = (v, d = 4) => (v.q ? `${fstr(v.q)} ${relQ(v.q, d)}` : rel(null, v.x, d));
  /** A fraction alone when it is known, else the decimal with its relation. */
  const short = (v, d = 4) => (v.q ? fstr(v.q) : rel(null, v.x, d));
  /** “= fraction” when it is known, else the relation and the decimal: what follows a name. */
  const is = (v, d = 4) => (v.q ? `= ${fstr(v.q)}` : rel(null, v.x, d));
  /** As short and is, for a pill, a title or a label: a fraction longer than seven characters gives way to its decimal. */
  const brief = (v, d = 4) => (v.q && fstr(v.q).length <= 7 ? fstr(v.q) : say(v, d)),
    isb = (v, d = 4) => (v.q && fstr(v.q).length <= 7 ? `= ${fstr(v.q)}` : say(v, d));
  /** A pair of values in parentheses: two short exact fractions, else rounded decimals after “≈”. */
  const fits = (v) => !!v.q && fstr(v.q).length <= 7;
  const pair = (a, b) => (fits(a) && fits(b) ? `(${fstr(a.q)}, ${fstr(b.q)})` : `≈ (${fmt(a.x, 3)}, ${fmt(b.x, 3)})`);
  const isPair = (a, b) => (fits(a) && fits(b) ? `= (${fstr(a.q)}, ${fstr(b.q)})` : `≈ (${fmt(a.x, 3)}, ${fmt(b.x, 3)})`);

  /* ---------- the exact core ---------- */
  /** The value of a rail, freed from the rounding of its own steps. */
  function settled(v) {
    const back = Math.round(v);
    return abs(v - back) < 1e-9 ? back : v;
  }
  /** split: the memory window at u = k/GRID; cos φ, sin φ of the rational point of the quarter circle. */
  const GRID = 60;
  function splitAt(t) {
    const k = settled(t);
    if (Number.isInteger(k)) {
      const G = BigInt(GRID),
        K = BigInt(k),
        den = G * G + K * K,
        cos = frac(G * G - K * K, den),
        sin = frac(2n * G * K, den);
      return { k, exact: true, u: num(frac(K, G)), cos: num(cos), sin: num(sin), kt: num(times(cos, cos)), ks: num(times(sin, sin)), sum: num(plus(times(cos, cos), times(sin, sin))), phi: Math.atan2(fval(sin), fval(cos)) };
    }
    const u = k / GRID,
      c = (1 - u * u) / (1 + u * u),
      s = (2 * u) / (1 + u * u);
    // between stops the shares are doubles, but their sum is the identity cos²φ + sin²φ = 1 itself
    return { k, exact: false, u: flo(u), cos: flo(c), sin: flo(s), kt: flo(c * c), ks: flo(s * s), sum: { q: ONE, x: c * c + s * s }, phi: Math.atan2(s, c) };
  }
  /** cone: the flow speed η = √(r_s/r) at the seven stops of the rail, and between them. */
  const ETAS = [
    [0n, 1n],
    [3n, 5n],
    [4n, 5n],
    [1n, 1n],
    [5n, 4n],
    [3n, 2n],
    [2n, 1n]
  ].map(([p, q]) => frac(p, q));
  const etaRail = (t) => {
    const v = clamp(t, 0, ETAS.length - 1),
      i = Math.min(ETAS.length - 2, Math.floor(v));
    return lerp(fval(ETAS[i]), fval(ETAS[i + 1]), v - i);
  };
  /** The Gullstrand–Painlevé cone at η: free fall (β = 0) at −η, the outward rim (ψ = 0, β = 1) at 1 − η, the inward rim at
      −1 − η; r/r_s = 1/η²; g_tt ∝ 1 − η²; for η < 1 the static observer sees free fall at the speed η, with cosh r = 1/√(1 − η²)
      and sinh r = η/√(1 − η²). */
  function etaFacts(eta, exact) {
    if (exact) {
      const e2 = times(eta, eta),
        gtt = minus(ONE, e2),
        g2 = cmp(gtt, ZERO) > 0 ? quo(ONE, gtt) : null,
        root = g2 ? rootQ(g2) : null;
      const cosh = root ? num(root) : g2 ? flo(Math.sqrt(fval(g2))) : null,
        sinh = root ? num(times(root, eta)) : g2 ? flo(Math.sqrt(fval(g2)) * fval(eta)) : null;
      return {
        exact: true,
        eta: num(eta),
        rsr: num(e2),
        rrs: eta[0] === 0n ? null : num(quo(ONE, e2)),
        free: num(neg(eta)),
        out: num(minus(ONE, eta)),
        inn: num(minus(neg(ONE), eta)),
        gtt: num(gtt),
        regime: cmp(eta, ONE) < 0 ? 'sub' : equal(eta, ONE) ? 'critical' : 'super',
        cosh,
        sinh,
        hyp: root ? num(minus(times(root, root), times(times(root, eta), times(root, eta)))) : g2 ? { q: ONE, x: fval(g2) * (1 - fval(e2)) } : null
      };
    }
    const e = eta,
      g = e < 1 ? 1 / Math.sqrt(1 - e * e) : null;
    return { exact: false, eta: flo(e), rsr: flo(e * e), rrs: e > 0 ? flo(1 / (e * e)) : null, free: flo(-e), out: flo(1 - e), inn: flo(-1 - e), gtt: flo(1 - e * e), regime: 'moving', cosh: g ? flo(g) : null, sinh: g ? flo(g * e) : null, hyp: g ? { q: ONE, x: g * g - g * g * e * e } : null };
  }
  function coneAt(t) {
    const k = settled(t);
    return { k, ...(Number.isInteger(k) ? etaFacts(ETAS[k], true) : etaFacts(etaRail(k), false)) };
  }
  /** yaw: u = (k − YAW)/YAW on k ∈ [0, 2·YAW]; η = 3/2 and β = 1. */
  const YAW = 20,
    ETA_Y = frac(3n, 2n);
  const BRANCH = { 0: 'sweepL', 10: 'dagL', 20: 'ridge', 30: 'dagR', 40: 'sweepR' };
  function yawAt(t) {
    const k = settled(t);
    if (Number.isInteger(k)) {
      const u = frac(BigInt(k - YAW), BigInt(YAW)),
        u2 = times(u, u),
        den = plus(ONE, u2),
        cos = quo(minus(ONE, u2), den),
        sin = quo(times(whole(2), u), den),
        dr = minus(cos, ETA_Y),
        back = plus(dr, ETA_Y);
      // (dr/(c dT) + η)² + (v⊥/c)²: the step seen from the free-falling frame lies on the unit circle (β = 1)
      return { k, exact: true, u: num(u), cos: num(cos), sin: num(sin), dr: num(dr), vp: num(sin), rim: num(plus(times(back, back), times(sin, sin))), psi: Math.atan2(fval(sin), fval(cos)), branch: BRANCH[k] || null };
    }
    const u = (k - YAW) / YAW,
      c = (1 - u * u) / (1 + u * u),
      s = (2 * u) / (1 + u * u);
    // between stops the parts are doubles, but (dr + η)² + v⊥² is the identity cos²ψ + sin²ψ = 1 itself
    return { k, exact: false, u: flo(u), cos: flo(c), sin: flo(s), dr: flo(c - 1.5), vp: flo(s), rim: { q: ONE, x: (c - 1.5 + 1.5) ** 2 + s * s }, psi: Math.atan2(s, c), branch: null };
  }
  /** Exact quaternions [w, x, y, z] of fractions. */
  const qm = (a, b) => [
    minus(minus(minus(times(a[0], b[0]), times(a[1], b[1])), times(a[2], b[2])), times(a[3], b[3])),
    minus(plus(plus(times(a[0], b[1]), times(a[1], b[0])), times(a[2], b[3])), times(a[3], b[2])),
    plus(plus(minus(times(a[0], b[2]), times(a[1], b[3])), times(a[2], b[0])), times(a[3], b[1])),
    plus(minus(plus(times(a[0], b[3]), times(a[1], b[2])), times(a[2], b[1])), times(a[3], b[0]))
  ];
  const qc = ([w, x, y, z]) => [w, neg(x), neg(y), neg(z)];
  const qdot = (a, b) => a.reduce((s, x, i) => plus(s, times(x, b[i])), ZERO);
  const qeq = (a, b) => a.every((x, i) => equal(x, b[i]));
  const quat = (t, d) => t.map((x) => frac(BigInt(x), BigInt(d)));
  /** heap: x₀ = 1, x₁ = b = (12 + 5i)/13 and x_{n+2} = x_{n+1} x_n* x_{n+1}, eight beats. */
  const BEATS = 8,
    HEAP_B = quat([12, 5, 0, 0], 13),
    HEAP_C = qdot(quat([1, 0, 0, 0], 1), HEAP_B);
  const HEAP = (() => {
    const xs = [quat([1, 0, 0, 0], 1), HEAP_B];
    for (let n = 2; n <= BEATS; n++) xs.push(qm(qm(xs[n - 1], qc(xs[n - 2])), xs[n - 1]));
    return xs;
  })();
  const kap = (x, y) => times(plus(ONE, qdot(x, y)), [1n, 2n]);
  /** The half turn α of b: cos α = 12/13; the sphere turns by 2α a beat, and eight beats bring it to the floor. */
  const ALPHA = Math.acos(12 / 13);
  function heapAt(t) {
    const v = settled(t),
      n = Math.floor(v + 1e-9),
      f = v - n < 1e-9 ? 0 : v - n;
    if (f === 0) {
      const x = HEAP[n];
      return { t: v, n, f, exact: true, x, dot: num(qdot(HEAP[0], x)), kappa: num(kap(HEAP[0], x)), step: num(kap(HEAP[Math.max(0, n - 1)], HEAP[Math.max(1, n)])), sphere: 0, walker: n };
    }
    // between beats the ball has turned by 2α·t: x(t) = cos(αt) + i sin(αt), so ⟨x₀, x(t)⟩ = cos(αt), a double
    const d = cs(ALPHA * v);
    return { t: v, n, f, exact: false, x: null, dot: flo(d), kappa: flo((1 + d) / 2), step: num(kap(HEAP[0], HEAP[1])), sphere: 0, walker: n };
  }
  /** wdw: the memory D on the still canvas and the pointer ptr. */
  const DMEM = [ONE, frac(3n, 4n), frac(1n, 2n), frac(1n, 4n)],
    CELLS = DMEM.length;
  function qramAt(t) {
    const v = settled(t),
      n = Math.min(CELLS - 1, Math.floor(v + 1e-9)),
      f = v - n < 1e-9 ? 0 : v - n;
    if (f === 0) return { t: v, ptr: n, f, exact: true, D: num(DMEM[n]), dD: n > 0 ? num(minus(DMEM[n], DMEM[n - 1])) : null, roll: n, shift: CELLS * n, mem: 0 };
    const x = lerp(fval(DMEM[n]), fval(DMEM[n + 1]), f);
    return { t: v, ptr: n, f, exact: false, D: flo(x), dD: null, roll: n, shift: CELLS * n, mem: 0 };
  }

  /* ---------- the state: one rail value per card ---------- */
  const SCENES = ['split', 'heap', 'cone', 'yaw', 'wdw'];
  // the rail of a card: its length, its speed (units per second), its keyboard step, and whether it rests on whole stops
  const RAILS = {
    split: { max: GRID, rate: 14, step: 1, whole: true },
    heap: { max: BEATS, rate: 1.1, step: 1, whole: false },
    cone: { max: ETAS.length - 1, rate: 1.3, step: 1, whole: true },
    yaw: { max: 2 * YAW, rate: 11, step: 1, whole: true },
    wdw: { max: CELLS - 1, rate: 0.75, step: 1, whole: false }
  };
  const STILL = { split: 20, heap: BEATS, cone: 5, yaw: 30, wdw: CELLS - 1 };
  const FRESH = { walker: true };
  const state = { scene: 'split', at: { ...STILL }, ...FRESH, lens: 0, lensT: 0, cam: 'panorama', from: null, blend: 1 };
  function compute(s) {
    return { split: splitAt(s.at.split), heap: heapAt(s.at.heap), cone: coneAt(s.at.cone), yaw: yawAt(s.at.yaw), wdw: qramAt(s.at.wdw), walker: s.walker };
  }
  const calc = () => compute(state);

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  /** The ray of descent: outward OUT, chosen from the panorama so that the ball rolls on the far wall, towards the viewer. */
  const YAW0 = -0.62;
  const FAR = [sn(YAW0), cs(YAW0), 0],
    RIGHT = [cs(YAW0), -sn(YAW0), 0];
  const OUT = unit(add(scale(FAR, 0.78), scale(RIGHT, 0.62))),
    TH0 = Math.atan2(OUT[1], OUT[0]);
  /** The views: the panorama; from the side, with the ray running to the right; from above the floor, the ray pointing up. */
  const cams = { panorama: [YAW0, 0.6, 1], side: [-TH0, 0.42, 1], above: [Math.atan2(OUT[0], OUT[1]), 0.9, 1] };
  const PRESETS = {
    'single-gradient-memory-spacetime-projection': { scene: 'split', cam: 'panorama', play: true, still: STILL.split },
    'portfree-legless-sphere-heap-geodesic': { scene: 'heap', cam: 'panorama', play: true, still: STILL.heap },
    'gullstrand-painleve-tilted-cone-supercritical': { scene: 'cone', cam: 'side', play: true, still: STILL.cone },
    'transverse-yaw-scenery-atlas-branching': { scene: 'yaw', cam: 'above', play: true, still: STILL.yaw },
    'wheeler-dewitt-static-canvas-frame-reversal': { scene: 'wdw', cam: 'panorama', play: true, still: STILL.wdw }
  };
  const DEFAULT = 'single-gradient-memory-spacetime-projection';

  /* ---------- the world: the canvas, the descent ray and the sphere ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.panorama[0], pitch: cams.panorama[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  const B0 = basis(cams.panorama[0], cams.panorama[1]);
  let cam = B0;
  /** A point x to the right, y up and d towards the viewer, as the camera sees it now. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  /** The canvas: radius RC of the chart, a flat rim out to RX, height Z0 + HZ·κ. */
  const RC = 1.5,
    RX = 1.64,
    HZ = 0.8,
    Z0 = -0.42,
    ZUP = [0, 0, 1];
  const kap0 = (r) => (r >= RC ? 1 : r <= 0 ? 0 : (r * r) / (r * r + (RC - r) ** 2));
  const dkap = (r) => (r >= RC || r <= 0 ? 0 : (2 * RC * r * (RC - r)) / (r * r + (RC - r) ** 2) ** 2);
  const zOf = (r) => Z0 + HZ * kap0(r);
  const rhoOf = (eta) => RC / (1 + eta);
  const etaOf = (r) => (r >= RC ? 0 : RC / r - 1);
  /** Across the ray: PERP, towards the right of the panorama. */
  const PERP = (() => {
    const p = [-OUT[1], OUT[0], 0];
    return dot(p, RIGHT) > 0 ? p : scale(p, -1);
  })();
  /** A point of the canvas at the horizontal place (x, y), lifted along z. */
  const ground = (x, y, lift = 0) => [x, y, zOf(hypot(x, y)) + lift];
  /** The normal of the canvas at the horizontal place (x, y). */
  function normalAt(x, y) {
    const r = hypot(x, y);
    if (r < 1e-9) return ZUP;
    const g = HZ * dkap(r);
    return unit([(-g * x) / r, (-g * y) / r, 1]);
  }
  /** On the ray: the contact point, the normal, the uphill tangent and the centre of the ball. */
  const RB = 0.24;
  function onRay(r) {
    const h = scale(OUT, r),
      P0 = ground(h[0], h[1]),
      n = normalAt(h[0], h[1]),
      up = unit(add(OUT, scale(ZUP, HZ * dkap(r))));
    return { r, P: P0, n, up, C: add(P0, scale(n, RB)) };
  }
  /* the arc length s of the path of the centre, from the rim inwards, tabulated once */
  const NS = 2400,
    RHO_LO = 0.1;
  const rhoTab = new Float64Array(NS + 1),
    sTab = new Float64Array(NS + 1);
  (() => {
    let prev = null,
      s = 0;
    for (let i = 0; i <= NS; i++) {
      const r = RX - ((RX - RHO_LO) * i) / NS,
        C = onRay(r).C;
      if (prev) s += norm(sub(C, prev));
      rhoTab[i] = r;
      sTab[i] = s;
      prev = C;
    }
  })();
  const lookup = (xs, ys, x, decreasing) => {
    let lo = 0,
      hi = xs.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (decreasing ? xs[mid] > x : xs[mid] < x) lo = mid;
      else hi = mid;
    }
    const f = (x - xs[lo]) / (xs[hi] - xs[lo] || 1);
    return lerp(ys[lo], ys[hi], clamp(f, 0, 1));
  };
  const sOf = (r) => lookup(rhoTab, sTab, r, true),
    rhoAtS = (s) => lookup(sTab, rhoTab, s, false);
  /** heap: beat 0 near the rim; each beat the centre travels 2α·RB, so that the ball has turned by b. */
  const RHO_A = 1.42,
    S_A = sOf(RHO_A),
    DS = 2 * ALPHA * RB;
  const heapRho = (v) => rhoAtS(S_A + v * DS);
  /** wdw: the cells D_t sit where κ = D_t on the ray. */
  const rhoForKappa = (k) => (k >= 1 ? RC : (RC * Math.sqrt(k / (1 - k))) / (1 + Math.sqrt(k / (1 - k))));
  const CELL_RHO = DMEM.map((d) => rhoForKappa(fval(d)));
  const wdwRho = (v) => {
    const t = clamp(v, 0, CELLS - 1),
      i = Math.min(CELLS - 2, Math.floor(t));
    return lerp(CELL_RHO[i], CELL_RHO[i + 1], t - i);
  };
  const RHO_SPLIT = rhoOf(3 / 5),
    RHO_YAW = rhoOf(1.5);
  /** Where the sphere is on the ray in each scene. */
  function rhoFor(scene, at = state.at) {
    switch (scene) {
      case 'heap':
        return heapRho(at.heap);
      case 'cone':
        return rhoOf(etaRail(at.cone));
      case 'yaw':
        return RHO_YAW;
      case 'wdw':
        return wdwRho(at.wdw);
      default:
        return RHO_SPLIT;
    }
  }
  /** The place of the sphere in this frame of the animation (the weights of the cards blend it). */
  function sphereNow(w = layers()) {
    const r = SCENES.reduce((s, k) => s + w[k] * rhoFor(k), 0);
    return onRay(r);
  }
  /* the Hopf picture: fibres of S³ → S² through stereographic projection, squeezed into the ball. Local axes: i along the
     axis of rolling, j inwards along the ray, k up. */
  const HOPF = (() => {
    const fibres = [[0, 0]];
    for (let k = 0; k < 4; k++) fibres.push([(40 * PI) / 180, (k * TAU) / 4 + 0.4]);
    for (let k = 0; k < 6; k++) fibres.push([(78 * PI) / 180, (k * TAU) / 6]);
    const raw = fibres.map(([chi, phi]) => {
      const c = cs(chi / 2),
        s = sn(chi / 2);
      return sample(64, (t) => {
        const a = TAU * t,
          x = [c * cs(phi + a), c * sn(phi + a), s * cs(a), s * sn(a)],
          d = 1 - x[3];
        return [x[0] / d, x[1] / d, x[2] / d];
      });
    });
    const squeeze = (p) => scale(p, 1 / (1 + 0.38 * norm(p)));
    const sq = raw.map((c) => c.map(squeeze));
    const big = Math.max(...sq.flat().map(norm));
    return sq.map((c) => c.map((p) => scale(p, 0.8 / big)));
  })();
  /** The axis of rolling (horizontal, across the ray) and the inward direction. */
  const INW = scale(OUT, -1),
    AXIS = unit(cross(INW, ZUP));
  /** The turn of the ball at the place r: the arc travelled from beat 0, over RB. */
  const rollAt = (r) => (sOf(r) - S_A) / RB;
  /** A local point of the ball, turned by the angle a about i, in the world at the centre C. */
  const ballPoint = (p, a, C) => {
    const y = p[1] * cs(a) - p[2] * sn(a),
      z = p[1] * sn(a) + p[2] * cs(a);
    return add(C, scale(add(add(scale(AXIS, p[0]), scale(INW, y)), scale(ZUP, z)), RB));
  };
  /* the ledger: the tangent plane at the focus enlarged on a panel that faces the camera (a MODEL drawing). Local x runs
     along ∇κ from 0 to 1, y across it towards the side of the window. */
  const UPR = [-0.12, 1.3];
  const FRAMES = {
    wide: { ledger: { c: [2.42, 0.5], h: 0.8, oy: 0.6 }, walker: { c: [2.5, 0.3], w: 1.1, h: 0.64 } },
    narrow: { ledger: { c: [0.15, -1.62], h: 0.74, oy: 0.6 }, walker: { c: [0.1, -1.5], w: 1.2, h: 0.6 } }
  };
  const frames = () => FRAMES[small() ? 'narrow' : 'wide'];
  let LED = FRAMES.wide.ledger;
  /** A point (x, y) of the ledger panel. */
  const lp = (x, y, F = LED) => seen(F.c[0] + F.h * (x - 0.5), F.c[1] + F.h * (y - F.oy), 0.9);
  const footXY = (phi) => [cs(phi) * cs(phi), cs(phi) * sn(phi)];
  const foot = (phi, F = LED) => lp(...footXY(phi), F);
  /** A point (x, y) ∈ [0, 1]² of the walker panel. */
  const wp = (x, y) => {
    const F = frames().walker;
    return seen(F.c[0] + F.w * (x - 0.5), F.c[1] + F.h * (y - 0.5), 0.9);
  };
  /** The future cone at the centre of the ball: time drawn straight up, the base of radius CONE_L shifted inwards by η. */
  const CONE_L = 0.5,
    FOOT_K = 0.6;
  /** The across direction in the tangent plane at the sphere (to the right of the panorama). */
  const ACROSS = PERP;
  /** The point of the rim of the base at the angle v (v = 0: outward along the ray, v = π/2: across to the right). */
  const conePoint = (o, eta, v, k = 1) => add(o.C, scale(add(add(ZUP, scale(OUT, cs(v) - eta)), scale(ACROSS, sn(v))), CONE_L * k));
  /** The end of the axis of the cone: free fall, β = 0. */
  const coneAxis = (o, eta) => add(o.C, scale(add(ZUP, scale(OUT, -eta)), CONE_L));
  /** The footprint: the cone cut at the height FOOT_K·CONE_L, dropped straight down onto the canvas. */
  const footPoint = (o, eta, v, lift = 0.012) => {
    const k = CONE_L * FOOT_K,
      h = add(o.P, add(scale(OUT, k * (cs(v) - eta)), scale(ACROSS, k * sn(v))));
    return ground(h[0], h[1], lift);
  };
  /** yaw: the branch at the angle ψ, from the focus to the footprint, laid on the canvas. */
  const branchPath = (o, psi, n = 24) => {
    const end = footPoint(o, 1.5, psi),
      h0 = o.P;
    return sample(n, (t) => ground(lerp(h0[0], end[0], t), lerp(h0[1], end[1], t), 0.012));
  };

  /** The world point of the amber handle for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'heap':
        return onRay(heapRho(v)).P;
      case 'cone':
        return onRay(rhoOf(etaRail(v))).P;
      case 'yaw':
        return footPoint(onRay(RHO_YAW), 1.5, yawAt(v).psi);
      case 'wdw':
        return onRay(wdwRho(v)).P;
      default:
        return foot(2 * Math.atan(v / GRID));
    }
  }
  /** Fit what the cards draw, between the title and the legend. */
  const around = (pts, box = [Infinity, -Infinity, Infinity, -Infinity]) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const grow = ([x0, x1, y0, y1], l, r, b, t) => [x0 - l, x1 + r, y0 - b, y1 + t];
  /** The canvas itself: its rim, its floor, and the ball at both ends of the ray. */
  const CANVAS_PTS = () => [...range(36).map((k) => [RX * cs((k * TAU) / 36), RX * sn((k * TAU) / 36), zOf(RX)]), [0, 0, Z0], ...[RC, 0.5].flatMap((r) => [add(onRay(r).C, scale(ZUP, RB)), add(onRay(r).C, scale(OUT, RB))])];
  /** The strip of the canvas along the ray, from the floor to the rim, and the ball at its ends. */
  const RAY_PTS = () => [...sample(16, (t) => lerp(0.36, RX, t)).flatMap((r) => [-0.45, 0, 0.45].map((d) => ground(r * OUT[0] + d * PERP[0], r * OUT[1] + d * PERP[1]))), ...[RX, 0.45].map((r) => add(onRay(r).C, scale(ZUP, RB)))];
  /** The canvas within the distance d of the place r on the ray. */
  const NEAR_PTS = (r, d) => range(24).map((k) => ground(r * OUT[0] + d * cs((k * TAU) / 24) * OUT[0] + d * sn((k * TAU) / 24) * PERP[0], r * OUT[1] + d * cs((k * TAU) / 24) * OUT[1] + d * sn((k * TAU) / 24) * PERP[1]));
  const plate = (F, [y0, y1]) => [lp(-0.62, y0, F), lp(1.62, y0, F), lp(1.62, y1, F), lp(-0.62, y1, F)];
  const SIDE = {
    split: () => grow(around([...CANVAS_PTS(), ...plate(frames().ledger, UPR)]), 0.03, 0.03, 0.03, 0.03),
    heap: () => grow(around([...CANVAS_PTS(), wp(-0.05, -0.12), wp(1.05, -0.12), wp(1.05, 1.12), wp(-0.05, 1.12)]), 0.03, 0.03, 0.03, 0.03),
    cone: () => grow(around([...RAY_PTS(), ...range(ETAS.length).flatMap((i) => [0, PI / 2, PI, -PI / 2].map((v) => conePoint(onRay(rhoOf(fval(ETAS[i]))), fval(ETAS[i]), v)))]), 0.05, 0.05, 0.05, 0.05),
    yaw: () => grow(around([...NEAR_PTS(RHO_YAW, 0.62), add(onRay(RHO_YAW).C, scale(ZUP, RB)), ...[0, PI / 2, PI, -PI / 2].map((v) => conePoint(onRay(RHO_YAW), 1.5, v, FOOT_K))]), 0.05, 0.05, 0.05, 0.05),
    wdw: () => grow(around(CANVAS_PTS()), 0.03, 0.03, 0.03, 0.03)
  };
  /* the room of the title: when a card, a lens, a language or a size begins, the title is measured at a few places of the
     whole rail and the tallest is kept, so that the canvas holds still on the screen while the rail runs (and under a drag) */
  const title = { key: '', top: 0 },
    held = { W: 0, H: 0 };
  function titleRoom(box) {
    const tl = $('hudTl'),
      big = $('hudBig'),
      line = $('hudSub'),
      keep = [big.innerHTML, line.innerHTML],
      r = RAILS[state.scene];
    let top = 12;
    // every whole stop of the rail, and a few places between them where the rail does not rest on stops
    const places = [...range(r.max + 1), ...(r.whole ? [] : [0.37, 0.5, 0.81].map((f) => f * r.max))];
    for (const v of places) {
      const m = compute({ ...state, at: { ...state.at, [state.scene]: v } });
      big.innerHTML = bigline(m);
      line.innerHTML = kept(subline(m));
      TRV.hudFit();
      top = Math.max(top, tl.getBoundingClientRect().bottom - box.top + 8);
    }
    big.innerHTML = keep[0];
    line.innerHTML = keep[1];
    TRV.hudFit();
    return top;
  }
  /** The pointer that drags the amber handle, or null. */
  let dragging = null;
  function fit(w) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    // under a drag the picture holds still: a HUD line that wraps anew must not move the point under the pointer
    if (!W || !H || (dragging != null && W === held.W && H === held.H)) return;
    Object.assign(held, { W, H });
    const box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const key = [state.scene, state.lens, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: shown(tl) && !TRV.still ? titleRoom(box) : 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k]()]);
    let [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    // the sphere-centred lens: the same box, moved so that the centre of the ball is in its middle
    if (state.lensT > 0) {
      const C = sphereNow(w).C,
        dx = (dot(C, cam.R) - (x0 + x1) / 2) * state.lensT,
        dy = (dot(C, cam.U) - (y0 + y1) / 2) * state.lensT;
      x0 += dx;
      x1 += dx;
      y0 += dy;
      y1 += dy;
    }
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }
  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });

  /* ---------- drawing ---------- */
  function drawCanvas(w) {
    // the basin: dark on the floor, lighter on the rim; a faint cyan grid of the chart
    sc.surface('canvas', (u, v) => [u * cs(v), u * sn(v), zOf(u)], { u: [0.03, RX], v: [0, TAU], nu: 64, nv: 120, colors: [P.stage, P.faint, P.dim], range: [-0.15, 1.25], value: (u) => kap0(u), grid: { every: [6, 10], color: P.cyan, alpha: 0.16 } });
    // contour rings: the flow speeds η of the chart on cards 1–4, the cells of the memory on card 5
    const etaW = 1 - w.wdw,
      RINGS = [...ETAS.slice(1).map(fval), 2.5, 3];
    if (etaW > 0.01)
      for (const eta of RINGS) {
        const r = rhoOf(eta),
          horizon = eta === 1,
          start = eta === 1.5 && w.yaw > 0.01;
        sc.line(sample(120, (t) => ground(r * cs(TAU * t), r * sn(TAU * t), 0.008)), { color: P.cyan, width: horizon ? 2.2 : start ? 1.4 + 1.4 * w.yaw : 1.2, alpha: (horizon ? 0.95 : 0.62) * etaW, dash: horizon ? [7, 4] : null });
      }
    if (w.wdw > 0.01)
      for (let i = 0; i < CELLS; i++) {
        const r = CELL_RHO[i];
        sc.line(sample(120, (t) => ground(r * cs(TAU * t), r * sn(TAU * t), 0.008)), { color: P.cyan, width: 1.4, alpha: 0.8 * w.wdw });
      }
    // flow lines along −∇κ, between the ray and its neighbours
    for (let k = 0; k < 12; k++) {
      const th = TH0 + ((k + 0.5) * TAU) / 12,
        c = cs(th),
        s = sn(th);
      sc.line(sample(40, (t) => ground(lerp(RX - 0.04, 0.12, t) * c, lerp(RX - 0.04, 0.12, t) * s, 0.01)), { color: P.magenta, width: 1.1, alpha: 0.42 });
      sc.arrow(ground(0.84 * c, 0.84 * s, 0.012), ground(0.7 * c, 0.7 * s, 0.012), { color: P.magenta, width: 1.4, headSize: 8, alpha: 0.7 });
    }
  }
  /** The legless sphere: a violet glass ball with its Hopf circles, turned by the way it has rolled. */
  function drawSphere(o) {
    const a = rollAt(o.r);
    sc.glass('ball', o.C, RB, { color: P.violet, alpha: 0.08, rim: 0.6 });
    HOPF.forEach((c, i) => sc.line(c.map((p) => ballPoint(p, a, o.C)), { color: P.violet, width: i === 0 ? 1.8 : 1.2, alpha: i === 0 ? 0.95 : 0.8 }));
    // the focus of attention: where the ball touches the canvas
    sc.ring(add(o.P, scale(o.n, 0.006)), { color: P.amber, r: 8, normal: o.n, key: 'focus' });
  }
  /** The ledger of a window at the angle φ on the panel: ∇κ, P_W∇κ and (I − P_W)∇κ, the Thales circle and the squares. */
  function drawLedger(phi, a, o) {
    if (a < 0.01) return;
    const c0 = cs(phi),
      s0 = sn(phi);
    sc.fan(plate(LED, UPR), { fill: P.stage, alpha: 0.45 * a, color: P.ink, strokeAlpha: 0.28 * a });
    sc.line([add(o.P, scale(o.n, 0.01)), lp(0, 0)], { color: P.ink, width: 1, dash: [2, 4], alpha: 0.5 * a });
    const O = lp(0, 0),
      T = lp(1, 0),
      [fx, fy] = footXY(phi),
      F = lp(fx, fy),
      W = (t) => lp(t * c0, t * s0),
      Wp = (t) => lp(-t * s0, t * c0);
    sc.line([W(-0.16), W(1.16)], { color: P.cyan, width: 1.3, dash: [9, 4], alpha: 0.8 * a });
    sc.line([Wp(-0.2), Wp(0.5)], { color: P.magenta, width: 1.1, dash: [3, 4], alpha: 0.6 * a });
    sc.line(sample(48, (t) => lp(0.5 + 0.5 * cs(PI * t), 0.5 * sn(PI * t))), { color: P.ink, width: 1, dash: [3, 5], alpha: 0.55 * a });
    sc.arrow(O, T, { color: P.violet, width: 3.2, headSize: 12, alpha: a });
    if (c0 > 1e-6) sc.arrow(O, F, { color: P.cyan, width: 3.4, headSize: 11, alpha: a });
    if (s0 > 1e-6) sc.line([F, T], { color: P.magenta, width: 3.4, alpha: a });
    if (c0 > 0.1 && s0 > 0.1) {
      const k = 0.06;
      sc.line([lp(fx - k * c0, fy - k * s0), lp(fx - k * c0 + k * s0, fy - k * s0 - k * c0), lp(fx + k * s0, fy - k * c0)], { color: P.ink, width: 1, alpha: 0.75 * a });
    }
    if (c0 > 1e-6) sc.fan([O, F, lp(fx - c0 * s0, fy + c0 * c0), lp(-c0 * s0, c0 * c0)], { fill: P.cyan, alpha: 0.2 * a, color: P.cyan, strokeAlpha: 0.6 * a });
    if (s0 > 1e-6) sc.fan([F, T, lp(1 + s0 * c0, s0 * s0), lp(fx + s0 * c0, fy + s0 * s0)], { fill: P.magenta, alpha: 0.2 * a, color: P.magenta, strokeAlpha: 0.6 * a });
  }
  /** −∇κ at the focus: the way down, in the tangent plane. */
  function drawDescent(o, a) {
    if (a < 0.01) return;
    const lift = scale(o.n, 0.012);
    sc.arrow(add(o.P, lift), add(add(o.P, lift), scale(o.up, -0.42)), { color: P.violet, width: 2.4, headSize: 10, alpha: a });
  }
  function drawSplit(m, o, a) {
    if (a < 0.01) return;
    drawDescent(o, a);
    drawLedger(m.split.phi, a, o);
  }
  /** The legged walker (MODEL): an ink figure on an outside ground, a push at every step. */
  function drawWalker(m, a) {
    if (a < 0.01 || !m.walker) return;
    const h = m.heap,
      x = 0.1 + (0.8 * h.t) / BEATS,
      step = h.t - Math.floor(h.t),
      swing = sn(PI * step);
    sc.fan([wp(-0.04, -0.1), wp(1.04, -0.1), wp(1.04, 1.1), wp(-0.04, 1.1)], { fill: P.stage, alpha: 0.45 * a, color: P.ink, strokeAlpha: 0.28 * a });
    // the ground outside the canvas: hatched
    sc.line([wp(0, 0.12), wp(1, 0.12)], { color: P.ink, width: 2, alpha: 0.85 * a });
    for (let k = 0; k <= 10; k++) sc.line([wp(k / 10, 0.12), wp(k / 10 - 0.04, 0.03)], { color: P.ink, width: 1, alpha: 0.5 * a });
    // body, head and two legs; the planted foot pushes back on the ground
    const hip = [x, 0.5],
      neckY = 0.8,
      footA = [x - 0.06 + 0.12 * swing, 0.12],
      footB = [x + 0.06 - 0.12 * swing, 0.12 + 0.06 * swing];
    sc.line([wp(...hip), wp(x, neckY)], { color: P.ink, width: 2.4, alpha: a });
    sc.line(sample(24, (t) => wp(x + 0.05 * cs(TAU * t), 0.9 + 0.08 * sn(TAU * t))), { color: P.ink, width: 2, alpha: a });
    sc.line([wp(...hip), wp(...footA)], { color: P.ink, width: 2.4, alpha: a });
    sc.line([wp(...hip), wp(...footB)], { color: P.ink, width: 2.4, alpha: a });
    sc.arrow(wp(footA[0], 0.16), wp(footA[0] - 0.16, 0.16), { color: P.ink, width: 1.8, headSize: 8, alpha: 0.9 * a });
  }
  function drawHeap(m, a) {
    if (a < 0.01) return;
    // the path of the beats along the ray: a violet trace with a tick at every beat
    const pts = sample(60, (t) => onRay(heapRho(t * BEATS)).P.map((x, i) => x + (i === 2 ? 0.012 : 0)));
    sc.line(pts, { color: P.violet, width: 1.6, alpha: 0.55 * a, dash: [5, 4] });
    for (let n = 0; n <= BEATS; n++) {
      const o = onRay(heapRho(n));
      sc.line([add(o.P, scale(o.n, 0.008)), add(o.P, scale(o.n, 0.07))], { color: P.violet, width: 1.6, alpha: (n <= m.heap.t + 1e-9 ? 0.95 : 0.45) * a });
    }
    drawWalker(m, a);
  }
  /** The tilted future cone at the ball for the flow speed η, up to the height top·CONE_L; short: only the cone, its axis
      and the line of rest (card 4), else also the two rims along the ray (card 3). */
  function drawCone(o, eta, a, top = 1, short = false) {
    if (a < 0.01) return;
    sc.surface('cone' + (short ? 'S' : '') + '~', (u, v) => add(o.C, scale(sub(conePoint(o, eta, v, top), o.C), u)), { u: [0, 1], v: [0, TAU], nu: 8, nv: 48, color: P.magenta, alpha: 0.24 * a, grid: { every: [4, 6], color: P.magenta, alpha: 0.4 * a }, pick: false, occlude: false });
    sc.line(sample(64, (t) => conePoint(o, eta, TAU * t, top)), { color: P.magenta, width: 1.8, alpha: 0.9 * a });
    // the line of rest (straight up), free fall (the axis) and the two rims along the ray
    sc.line([o.C, add(o.C, scale(ZUP, CONE_L * top * 1.2))], { color: P.ink, width: 1.4, dash: [4, 4], alpha: 0.85 * a });
    sc.arrow(o.C, add(o.C, scale(sub(coneAxis(o, eta), o.C), top)), { color: P.violet, width: 2.6, headSize: 10, alpha: a });
    if (!short) {
      sc.arrow(o.C, conePoint(o, eta, 0), { color: P.ink, width: 2.2, headSize: 9, alpha: a });
      sc.line([o.C, conePoint(o, eta, PI)], { color: P.magenta, width: 2, alpha: 0.9 * a });
    }
    // the footprint on the canvas: the section of the cone at the height FOOT_K·CONE_L, dropped straight down
    const ring = sample(64, (t) => footPoint(o, eta, TAU * t));
    sc.line(ring, { color: P.magenta, width: 1.6, alpha: 0.85 * a });
    sc.fan(ring, { fill: P.magenta, alpha: 0.08 * a });
  }
  function drawConeScene(m, o, a) {
    if (a < 0.01) return;
    drawCone(o, m.cone.eta.x, a);
  }
  /** The five branches of the yaw at η = 3/2 and the chosen one. */
  const BRANCH_KS = [0, 10, 20, 30, 40];
  function drawYaw(m, o, a) {
    if (a < 0.01) return;
    drawCone(o, 1.5, a, FOOT_K, true);
    const y = m.yaw;
    for (const k of BRANCH_KS) {
      const path = branchPath(o, yawAt(k).psi);
      sc.line(path, { color: P.magenta, width: 1.8, alpha: 0.9 * a });
      sc.bead(path[path.length - 1], { color: P.ink, r: 4.2, alpha: a, key: 'node' + k });
    }
    // the chosen branch on the canvas and the world line on the cone above it
    tube('chosen', branchPath(o, y.psi), P.violet, 0.012, a, 0.5);
    const rimTip = conePoint(o, 1.5, y.psi, FOOT_K);
    sc.line([o.C, rimTip], { color: P.violet, width: 2.4, alpha: 0.95 * a });
    sc.line([rimTip, footPoint(o, 1.5, y.psi, 0.02)], { color: P.ink, width: 1, dash: [2, 3], alpha: 0.7 * a });
    sc.bead(footPoint(o, 1.5, y.psi, 0.02), { color: P.amber, r: 5.4, alpha: a, key: 'tip' });
  }
  function drawWdw(m, a) {
    if (a < 0.01) return;
    for (let i = 0; i < CELLS; i++) {
      const o = onRay(CELL_RHO[i]);
      sc.bead(add(o.P, scale(o.n, 0.02)), { color: P.cyan, r: 5.4, alpha: a, key: 'cell' + i });
    }
    // the trace of the pointer along the ray
    sc.line(sample(40, (t) => add(onRay(wdwRho(t * (CELLS - 1))).P, [0, 0, 0.012])), { color: P.cyan, width: 1.4, alpha: 0.5 * a, dash: [5, 4] });
  }
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    LED = frames().ledger;
    fit(w);
    const o = sphereNow(w);
    sc.begin();
    drawCanvas(w);
    drawSplit(m, o, w.split);
    drawHeap(m, w.heap);
    drawConeScene(m, o, w.cone);
    drawYaw(m, o, w.yaw);
    drawWdw(m, w.wdw);
    drawSphere(o);
    const here = handleWorld(state.at[state.scene]);
    if (state.scene === 'split') sc.bead(here, { color: P.amber, r: 6.4, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    tags(m, o);
    sc.end();
    const q = sc.p(here);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- words ---------- */
  const SCENE_NAME = {
    split: [['同一梯度 · 两个投影', 'ONE GRADIENT · TWO PROJECTIONS'], ['焦点处：时间与引力（MODEL）', 'AT THE FOCUS: TIME & GRAVITY (MODEL)']],
    heap: [['无腿球 · 堆测地', 'LEGLESS SPHERE · HEAP GEODESIC'], ['画布迎面滑来（MODEL）', 'THE CANVAS SLIDES IN (MODEL)']],
    cone: [['GP 光锥 · 流速 η', 'GP CONE · FLOW SPEED η'], ['盆地迎面上涌（MODEL）', 'THE BASIN RISES (MODEL)']],
    yaw: [['横向偏航 · 图册分支', 'TRANSVERSE YAW · ATLAS BRANCHES'], ['分支迎面展开（MODEL）', 'BRANCHES OPEN AHEAD (MODEL)']],
    wdw: [['静止画布 · 指针 ptr', 'STILL CANVAS · POINTER ptr'], ['整幅画布平移（MODEL）', 'THE WHOLE CANVAS SHIFTS (MODEL)']]
  };
  const LENS_NAME = [
    ['全景', 'PANORAMA'],
    ['球心 (MODEL)', 'SPHERE (MODEL)']
  ];
  /** The exact titles of the two lenses. */
  const LENS_TITLE = [
    ['全景静止画布透镜 · 山与时间皆不动，唯无腿三元球顺 ∇κ 滚落', 'Panoramic Static-Canvas Lens · Mountain & Time Still, Legless Ternion Sphere Rolls Down ∇κ'],
    ['观察者球心第一人称透镜（MODEL）· 球似静止而山岳与等时线迎面奔流', 'Observer Sphere-Centered First-Person Lens (MODEL) · Sphere Seems Still as Mountains & Isochrones Rush Past']
  ];
  const sub2 = (x) => `<sub>${x}</sub>`;
  const named = (name, exact, value, x) => (exact ? `${name} = ${value}` : `${name} ${rel(null, x, 2)}`);
  const BRANCH_NAME = { sweepL: ['−90° 扫掠', '−90° sweep'], dagL: ['左谷 DAG_L', 'left valley DAG_L'], ridge: ['正中脊线', 'central ridge'], dagR: ['右谷 DAG_R', 'right valley DAG_R'], sweepR: ['+90° 扫掠', '+90° sweep'] };
  const REGIME = { sub: ['亚临界', 'subcritical'], critical: ['临界（视界）', 'critical (horizon)'], super: ['超临界', 'supercritical'], moving: ['两站之间', 'between stops'] };
  /** The live regime of the scene. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'split':
        return !m.split.exact ? 'moving' : m.split.k === 0 ? 'inside' : m.split.k === GRID ? 'outside' : 'split';
      case 'heap':
        return m.heap.f > 0 ? 'moving' : m.heap.n === 0 ? 'start' : m.heap.n === BEATS ? 'end' : 'beat';
      case 'cone':
        return m.cone.regime;
      case 'yaw':
        return m.yaw.branch || (m.yaw.exact ? 'between' : 'moving');
      default:
        return m.wdw.f > 0 ? 'moving' : m.wdw.ptr === 0 ? 'start' : 'read';
    }
  }
  const coneWords = (c) => (c.rrs ? `r/r${sub2('s')} ${is(c.rrs)}` : `r/r${sub2('s')} → ∞`);
  function subline(m) {
    const s = state.scene,
      lens = state.lens,
      tiny = compact();
    if (s === 'split') {
      const p = m.split,
        u = p.exact ? `u = ${fstr(p.u.q)}` : `u ${is(p.u)}`;
      if (lens) return tiny ? L(`时间 ${is(p.cos)}，引力 ${is(p.sin)}（MODEL）。`, `time ${is(p.cos)}, gravity ${is(p.sin)} (MODEL).`) : L(`${u}：焦点把青色一份读作时间 ${is(p.cos)}，把品红一份读作引力 ${is(p.sin)}（MODEL）；平方和 ${say(p.sum)}。`, `${u}: the focus reads the cyan part as time ${is(p.cos)} and the magenta part as gravity ${is(p.sin)} (MODEL); squares add ${say(p.sum)}.`);
      return tiny ? L(`${u}：${short(p.kt)} + ${short(p.ks)} ${is(p.sum)}。`, `${u}: ${short(p.kt)} + ${short(p.ks)} ${is(p.sum)}.`) : L(`${u}：窗内 ∇${sub2('∥')}κ ${is(p.cos)}，窗外 ∇${sub2('⊥')}κ ${is(p.sin)}；${both(p.kt)} 加 ${both(p.ks)}，和 ${say(p.sum)}。`, `${u}: inside ∇${sub2('∥')}κ ${is(p.cos)}, outside ∇${sub2('⊥')}κ ${is(p.sin)}; ${both(p.kt)} plus ${both(p.ks)}, sum ${say(p.sum)}.`);
    }
    if (s === 'heap') {
      const h = m.heap,
        n = named('n', h.f === 0, h.n, h.t);
      if (lens) return tiny ? L(`${n}：球在中央，画布滑过（MODEL）。`, `${n}: the sphere stays, the canvas slides (MODEL).`) : L(`${n}：球停在中央，画布与等高环迎面滑来（MODEL）；⟨x${sub2('0')}, x${sub2('n')}⟩ ${isb(h.dot)}，外推 球 0 · 行者 ${h.walker}。`, `${n}: the sphere stays in the middle, the canvas and its rings slide in (MODEL); ⟨x${sub2('0')}, x${sub2('n')}⟩ ${isb(h.dot)}, pushes sphere 0 · walker ${h.walker}.`);
      return tiny ? L(`${n}：外推 球 0 · 行者 ${h.walker}。`, `${n}: pushes sphere 0 · walker ${h.walker}.`) : L(`${n}：x${sub2('n')} = b${h.f === 0 ? `<sup>${h.n}</sup>` : '<sup>n</sup>'}，⟨x${sub2('0')}, x${sub2('n')}⟩ ${isb(h.dot)}；外推 球 0 · 行者 ${h.walker}。`, `${n}: x${sub2('n')} = b${h.f === 0 ? `<sup>${h.n}</sup>` : '<sup>n</sup>'}, ⟨x${sub2('0')}, x${sub2('n')}⟩ ${isb(h.dot)}; pushes sphere 0 · walker ${h.walker}.`);
    }
    if (s === 'cone') {
      const c = m.cone,
        e = `η ${is(c.eta)}`;
      if (lens) return tiny ? L(`${e}：外向光沿 ${is(c.out)}（MODEL）。`, `${e}: outward rim ${is(c.out)} (MODEL).`) : L(`${e}：球与光锥停在中央，盆地迎面上涌（MODEL）；外向光沿仍 ${is(c.out)}。`, `${e}: the sphere and its cone stay in the middle, the basin rises (MODEL); the outward rim is still ${is(c.out)}.`);
      return tiny ? L(`${e}：外向光沿 ${is(c.out)}。`, `${e}: outward rim ${is(c.out)}.`) : L(`${e}（${coneWords(c)}）：自由下落 ${is(c.free)}，外向光沿 ${is(c.out)}，${L(...REGIME[c.regime])}。`, `${e} (${coneWords(c)}): free fall ${is(c.free)}, outward rim ${is(c.out)}, ${L(...REGIME[c.regime])}.`);
    }
    if (s === 'yaw') {
      const y = m.yaw,
        u = y.exact ? `u = ${fstr(y.u.q)}` : `u ${is(y.u)}`;
      if (lens) return tiny ? L(`${u}：${pair(y.dr, y.vp)}（MODEL）。`, `${u}: ${pair(y.dr, y.vp)} (MODEL).`) : L(`${u}：分支在球前展开（MODEL）；(dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}，Δr &lt; 0。`, `${u}: the branches open ahead of the sphere (MODEL); (dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}, Δr &lt; 0.`);
      return tiny ? L(`${u}：${pair(y.dr, y.vp)}，下行。`, `${u}: ${pair(y.dr, y.vp)}, down.`) : L(`${u}：(cos ψ, sin ψ) ${isPair(y.cos, y.sin)}，(dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}，Δr &lt; 0。`, `${u}: (cos ψ, sin ψ) ${isPair(y.cos, y.sin)}, (dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}, Δr &lt; 0.`);
    }
    const q = m.wdw,
      p = named('ptr', q.f === 0, q.ptr, q.t),
      dD = q.dD ? `ΔD ${is(q.dD)}` : q.f > 0 ? L('ΔD 在路上', 'ΔD on the way') : L('尚未迈步', 'no step yet');
    if (lens) return tiny ? L(`${p}：${dD}，搬动 ${q.shift} 格。`, `${p}: ${dD}, ${q.shift} cells moved.`) : L(`${p}：同一读数 ${dD}，球不动则画布平移 ${q.ptr} 格，改写 ${q.shift} 个格子（MODEL）。`, `${p}: the same reading ${dD}; with the sphere fixed the canvas shifts by ${q.ptr} cells and ${q.shift} cells are rewritten (MODEL).`);
    return tiny ? L(`${p}：${dD}，D 改写 0 次。`, `${p}: ${dD}, D rewritten 0 times.`) : L(`${p}：D${sub2('ptr')} ${is(q.D)}，${dD}；指针改写 ${q.roll} 次，D 改写 0 次。`, `${p}: D${sub2('ptr')} ${is(q.D)}, ${dD}; the pointer rewritten ${q.roll} times, D 0 times.`);
  }
  /** The key value of the card: the same in both lenses. */
  function keyOf(m) {
    switch (state.scene) {
      case 'split':
        return `‖∇${sub2('∥')}κ‖² ${isb(m.split.kt)}`;
      case 'heap':
        return named('n', m.heap.f === 0, m.heap.n, m.heap.t);
      case 'cone':
        return `1 − η ${isb(m.cone.out)}`;
      case 'yaw':
        return `dr/(c dT) ${isb(m.yaw.dr)}`;
      default:
        return m.wdw.dD ? `ΔD ${isb(m.wdw.dD)}` : named('ptr', m.wdw.f === 0, m.wdw.ptr, m.wdw.t);
    }
  }
  const bigline = (m) => `${L(...SCENE_NAME[state.scene][state.lens])} · <span class="nb">${keyOf(m)}</span>`;
  function legendItems() {
    const lens = state.lens,
      items = [['vi', L('无腿球 𝕋₃ · 霍普夫圆', 'legless sphere 𝕋₃ · Hopf circles')]];
    switch (state.scene) {
      case 'split':
        items.push(['cy', lens ? L('读作时间', 'read as time') : L(`窗内 ∇${sub2('∥')}κ`, `inside ∇${sub2('∥')}κ`)], ['mg', lens ? L('读作引力', 'read as gravity') : L(`窗外 ∇${sub2('⊥')}κ`, `outside ∇${sub2('⊥')}κ`)], ['am', L('焦点 · 手柄', 'focus · handle')]);
        break;
      case 'heap':
        items.push(['cy', L('等高环', 'contours')], ['mg', L('流线 −∇κ', 'flow −∇κ')], ['ik', L('有腿行者（MODEL）', 'legged walker (MODEL)')], ['am', L('焦点', 'focus')]);
        break;
      case 'cone':
        items.push(['mg', L('未来光锥', 'future cone')], ['ik', L('外向光沿 · 静止线', 'outward rim · rest line')], ['cy', L('视界 η = 1', 'horizon η = 1')], ['am', L('焦点', 'focus')]);
        break;
      case 'yaw':
        items.push(['mg', L('光锥 · 五条分支', 'cone · five branches')], ['cy', L('起始环 η = 3/2', 'start ring η = 3/2')], ['am', L('舵点', 'steering tip')]);
        break;
      default:
        items.push(['cy', L('记忆格 D', 'memory cells D')], ['mg', L('流线 −∇κ', 'flow −∇κ')], ['am', L('指针 ptr', 'pointer ptr')]);
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const s = state.scene,
      lens = state.lens;
    if (s === 'split') {
      const p = m.split,
        at = p.exact ? `u = ${fstr(p.u.q)}` : `u ${is(p.u)}`;
      return lens
        ? {
            long: [`以球为中心（MODEL）：放大板上同一个紫色箭头 ∇κ 被焦点读成两份，青色读作时间的推进 ${is(p.cos)}，品红读作空间的引力 ${is(p.sin)}；两块正方形之和仍是 1。`, `Centred on the sphere (MODEL): on the panel the focus reads one violet arrow ∇κ as two parts, cyan as the advance of time ${is(p.cos)} and magenta as the pull of space ${is(p.sin)}; the two squares still add to 1.`],
            fig: [`球心读法（MODEL）：时间² + 引力² = ∇κ² = 1。`, `Sphere reading (MODEL): time² + gravity² = ∇κ² = 1.`]
          }
        : {
            long: [`紫色玻璃球停在画布上 η = 3/5 处，紫色短箭头指向 −∇κ；右边的放大板是那里的梯度 ∇κ（紫色箭头，长 1）。青色记忆窗 W${sub2('M')} 转到 ${at}：∇κ 分成窗内的青色箭头与窗外的品红边，垂足总在虚线半圆上，两块正方形面积之和是 1。拖琥珀手柄转窗。`, `The violet glass ball rests on the canvas at η = 3/5, its short violet arrow pointing along −∇κ; the panel on the right enlarges the gradient ∇κ there (violet arrow, length 1). The cyan memory window W${sub2('M')} is turned to ${at}: ∇κ splits into the cyan arrow inside and the magenta edge outside, the foot always on the dashed half circle, and the two squares add up to 1. Drag the amber handle to turn the window.`],
            fig: [`同一梯度 ∇κ：窗口转到哪里，青² + 品红² 都等于 1。`, `One gradient ∇κ: wherever the window turns, cyan² + magenta² = 1.`]
          };
    }
    if (s === 'heap') {
      const h = m.heap;
      return lens
        ? {
            long: [`以球为中心（MODEL）：紫色无腿球停在中央，整幅画布带着青色等高环与品红流线迎面滑来；第 ${h.n} 拍的读数与全景透镜相同，外推仍是 0 次。`, `Centred on the sphere (MODEL): the violet legless sphere stays in the middle while the whole canvas with its cyan rings and magenta flow lines slides in; the reading at beat ${h.n} is the same as in the panorama, still with 0 pushes.`],
            fig: [`球心视角（MODEL）：球不动，画布滑来；外推 0 次。`, `Sphere frame (MODEL): the sphere stays, the canvas slides; 0 pushes.`]
          }
        : {
            long: [`紫色无腿球沿虚线从盆沿滚向盆底，每一拍转过同一个有理旋子 b = (12 + 5i)/13，青色等高环与品红流线一动不动。右边的墨色行者要用腿蹬画布外的地面才能前进，每步一次外推；球的外推始终是 0 次。`, `The violet legless sphere rolls along the dashed line from the rim towards the floor, turned by the same rational rotor b = (12 + 5i)/13 at every beat, while the cyan rings and the magenta flow lines never move. The ink walker on the right must push its legs against a ground outside the canvas, one push a step; the sphere takes 0 pushes throughout.`],
            fig: [`无腿球等步滚落，外推 0 次；有腿行者每步外推一次。`, `The legless sphere rolls in equal beats with 0 pushes; the walker pushes once a step.`]
          };
    }
    if (s === 'cone') {
      const c = m.cone;
      const fig = [`η 越过 1，整个光锥倒向盆底，外向光沿变负。`, `Past η = 1 the whole cone tips to the floor; the outward rim turns negative.`];
      return lens
        ? {
            long: [`以球为中心（MODEL）：球与品红光锥停在中央，盆地带着青色视界环迎面上涌；光锥的倾角与读数与全景透镜相同，外向光沿 ${is(c.out)}。`, `Centred on the sphere (MODEL): the sphere and its magenta cone stay in the middle while the basin with its cyan horizon ring rises towards it; the tilt and the readings are those of the panorama, outward rim ${is(c.out)}.`],
            fig: [`球心视角（MODEL）：光锥的倾角与读数不变。`, `Sphere frame (MODEL): the same tilt, the same readings.`]
          }
        : {
            long: [`品红是球心处的未来光锥（时间竖直向上画）：底面中心向内偏 η，半径 1。η = 3/5 时墨色外向光沿以 2/5 外逃；η = 1（青色虚线视界环）时停在 0，贴着墨色虚线静止线；η = 3/2 时整个光锥倒向盆底，外向光沿以 −1/2 下落，脚下的品红投影圈离开了琥珀焦点。`, `Magenta is the future cone at the centre of the ball (time drawn straight up): its base is shifted inwards by η, radius 1. At η = 3/5 the ink outward rim escapes at 2/5; at η = 1 (the dashed cyan horizon ring) it stalls at 0, on the dashed ink rest line; at η = 3/2 the whole cone tips towards the floor, the outward rim falls at −1/2, and the magenta footprint leaves the amber focus.`],
            fig
          };
    }
    if (s === 'yaw') {
      const y = m.yaw,
        at = y.exact ? `u = ${fstr(y.u.q)}` : `u ${is(y.u)}`,
        bn = y.branch ? L(...BRANCH_NAME[y.branch]) : L('两条分支之间', 'between branches');
      return lens
        ? {
            long: [`以球为中心（MODEL）：五条品红分支在球前展开，紫色那条是 ${at} 选中的 ${bn}；(dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}，与全景透镜相同。`, `Centred on the sphere (MODEL): five magenta branches open ahead of it, the violet one chosen at ${at} is the ${bn}; (dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}, as in the panorama.`],
            fig: [`球心视角（MODEL）：分支在球前展开，读数不变。`, `Sphere frame (MODEL): branches open ahead, the same readings.`]
          }
        : {
            long: [`η = 3/2 处整个品红光锥已内倾。琥珀舵点沿光锥底沿转动，${at} 时紫色分支是 ${bn}，(dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}；五条分支（±90°、左谷、正中、右谷）的墨色端点都落在青色起始环之内：每一条都下行。`, `At η = 3/2 the whole magenta cone already tips inwards. The amber steering tip turns round the rim of the cone; at ${at} the violet branch is the ${bn}, (dr/(c dT), v${sub2('⊥')}/c) ${isPair(y.dr, y.vp)}; the ink ends of all five branches (±90°, left valley, ridge, right valley) lie inside the cyan start ring: every one goes down.`],
            fig: [`η = 3/2：五条分支（±90°、左谷、正中、右谷）都下行。`, `η = 3/2: all five branches (±90°, valleys, ridge) go down.`]
          };
    }
    const q = m.wdw;
    return lens
      ? {
          long: [`以球为中心（MODEL）：球固定在中央，同一串读数要求整幅画布每步平移一格，改写 |S| = 4 个格子；读到的 ΔD = −1/4 与全景透镜完全相同。`, `Centred on the sphere (MODEL): with the sphere fixed in the middle the same readings ask the whole canvas to shift by one cell at every step, rewriting |S| = 4 cells; the reading ΔD = −1/4 is exactly that of the panorama.`],
          fig: [`球心视角（MODEL）：同样 ΔD = −1/4，每步搬动 4 格。`, `Sphere frame (MODEL): the same ΔD = −1/4, 4 cells moved a step.`]
        }
      : {
          long: [`四个青色记忆格 D = [1, 3/4, 1/2, 1/4] 刻在静止画布上，画布本身从不改写（Ĥ|Ψ⟩ = 0）。琥珀指针 ptr 从 0 走到 3，紫色球随之滚下，每走一步读到 ΔD = −1/4，只改写指针这一个字。`, `The four cyan memory cells D = [1, 3/4, 1/2, 1/4] are cut into the still canvas, which is never rewritten (Ĥ|Ψ⟩ = 0). The amber pointer ptr runs from 0 to 3, the violet sphere rolling down with it; each step reads ΔD = −1/4 and rewrites the pointer alone.`],
          fig: [`画布从不改写；指针每走一步读到 ΔD = −1/4。`, `The canvas is never rewritten; each pointer step reads ΔD = −1/4.`]
        };
  }

  /* ---------- labels ---------- */
  function tags(m, o) {
    const s = state.scene,
      lens = state.lens,
      low = stage.clientHeight < 300,
      tiny = small() || low,
      { R, U } = cam;
    // a label sits (right, up) pixels from its point
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (!low) N('sphere', off(add(o.C, scale(ZUP, RB)), 0, 16), tiny ? '𝕋₃' : '𝕋₃ ≅ S³', 'c-vi');
    if (s !== 'wdw') {
      const hr = rhoOf(1),
        th = TH0 + PI * 0.62;
      if (!tiny || (s === 'cone' && !low)) N('horizon', off(ground(hr * cs(th), hr * sn(th), 0.01), 0, -12), L('视界 η = 1', 'horizon η = 1'), 'c-cy');
    }
    if (s === 'split') {
      const p = m.split,
        c0 = cs(p.phi),
        s0 = sn(p.phi),
        [fx, fy] = footXY(p.phi);
      N('grad', off(lp(1, 0), 14, -12), '∇κ', 'c-vi');
      N('down', off(add(o.P, scale(o.up, -0.42)), -16, -8), '−∇κ', 'c-vi');
      if (c0 > 0.14) N('par', off(lp(fx / 2, fy / 2), -14 - 18 * s0, 10 + 10 * c0), `${lens ? L('时间', 'time') : `∇${sub2('∥')}κ`} ${isb(p.cos)}`, 'c-cy');
      if (s0 > 0.14) N('perp', off(lp((fx + 1) / 2, fy / 2), 16 + 10 * c0, 4 - 10 * s0), `${lens ? L('引力', 'gravity') : `∇${sub2('⊥')}κ`} ${isb(p.sin)}`, 'c-mg');
      if (!tiny) N('window', off(lp(1.16 * c0, 1.16 * s0), 12, 8), `W${sub2('M')}`, 'c-cy');
      if (!compact()) N('plate', off(lp(-0.62, UPR[1]), 6, -10), L('焦点处切平面 · 放大', 'tangent plane at the focus · enlarged'), 'c-ik');
      if (!tiny && c0 > 0.3 && s0 > 0.3) {
        N('sqC', lp(fx / 2 - (c0 * s0) / 2, fy / 2 + (c0 * c0) / 2), brief(p.kt), 'c-cy');
        N('sqM', lp((fx + 1) / 2 + (s0 * c0) / 2, fy / 2 + (s0 * s0) / 2), brief(p.ks), 'c-mg');
      }
    }
    if (s === 'heap') {
      const h = m.heap;
      N('x0', off(onRay(heapRho(0)).P, 18, 10), `x${sub2('0')}`, 'c-vi');
      N('xN', off(onRay(heapRho(BEATS)).P, -18, -10), `x${sub2(BEATS)}`, 'c-vi');
      N('now', off(o.P, 18, -18), named('n', h.f === 0, h.n, h.t), 'c-am');
      if (!low) N('pushS', off(add(o.C, scale(ZUP, RB)), 0, 36), L('外推 0', 'pushes 0'), 'c-vi');
      if (m.walker) N('walker', off(wp(0.5, 1.1), 0, 10), tiny ? L(`行者 ${h.walker}`, `walker ${h.walker}`) : L(`有腿行者（MODEL）· 外推 ${h.walker}`, `legged walker (MODEL) · pushes ${h.walker}`), 'c-ik');
    }
    if (s === 'cone') {
      const c = m.cone,
        eta = c.eta.x;
      N('out', off(conePoint(o, eta, 0), 14, 6), `1 − η ${isb(c.out)}`, 'c-ik');
      if (!low) N('free', off(coneAxis(o, eta), -16, 10), `−η ${isb(c.free)}`, 'c-vi');
      N('eta', off(o.P, 20, -16), `η ${isb(c.eta)}`, 'c-am');
      if (!tiny) N('rest', off(add(o.C, scale(ZUP, CONE_L * 1.2)), 0, 12), L('静止线', 'rest line'), 'c-ik');
    }
    if (s === 'yaw') {
      const y = m.yaw;
      for (const k of BRANCH_KS) {
        const b = yawAt(k),
          end = footPoint(o, 1.5, b.psi),
          name = { 0: '−90°', 10: 'DAG<sub>L</sub>', 20: L('脊', 'ridge'), 30: 'DAG<sub>R</sub>', 40: '+90°' }[k];
        if (!tiny || k % 20 === 10) N('b' + k, off(end, 0, -13), name, 'c-ik');
      }
      N('tip', off(footPoint(o, 1.5, y.psi), 18, 14), y.exact ? `u = ${fstr(y.u.q)}` : `u ${is(y.u)}`, 'c-am');
    }
    if (s === 'wdw') {
      const q = m.wdw;
      for (let i = 0; i < CELLS; i++) if (!low || i === q.ptr) N('cell' + i, off(onRay(CELL_RHO[i]).P, -22, 12), `D${sub2(i)} = ${fstr(DMEM[i])}`, 'c-cy');
      N('ptr', off(o.P, 22, -16), named('ptr', q.f === 0, q.ptr, q.t), 'c-am');
      if (!tiny) N('wdwEq', off(ground(-0.95 * OUT[0] + 0.55 * PERP[0], -0.95 * OUT[1] + 0.55 * PERP[1]), 0, 0), 'Ĥ|Ψ⟩ = 0', 'c-ik');
      if (!low) N('rewrites', off(ground(0.2 * OUT[0] - 0.9 * PERP[0], 0.2 * OUT[1] - 0.9 * PERP[1]), 0, 0), lens ? L(`搬动 ${q.shift} 格`, `${q.shift} cells moved`) : L('D 改写 0 次', 'D rewritten 0 times'), 'c-ik');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d./]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>');
  const ACTS = {
    split: ['下一个有理点 ▸', 'Next rational point ▸'],
    heap: ['下一拍 ▸', 'Next beat ▸'],
    cone: ['下一个流速 ▸', 'Next flow speed ▸'],
    yaw: ['下一条分支 ▸', 'Next branch ▸'],
    wdw: ['ptr + 1 ▸', 'ptr + 1 ▸']
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
  const PAD = [40, 14, 10, 22];
  /** The flow speed η where the sphere is now (the rim of the chart: 0). */
  const etaNow = () => etaOf(sphereNow().r);
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const lens = state.lens,
      rs = sphereNow().r,
      ks = kap0(rs);
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').textContent = lens ? L('以焦点为原点：焦点不动，κ 的截面滑过（MODEL）', 'Focus as origin: the focus stays, the section of κ slides past (MODEL)') : L('静止画布的截面 κ(ρ)：曲线不动，琥珀焦点在走', 'Section κ(ρ) of the still canvas: the curve stays, the amber focus moves');
      $('plotMeta').textContent = `κ ${state.scene === 'wdw' && m.wdw.f === 0 ? is(m.wdw.D) : rel(null, ks, 3)}`;
      const items = [
        [P.cyan, L('κ(ρ)：画布的高度', 'κ(ρ): height of the canvas')],
        [P.magenta, L('Δρ：空间的一步', 'Δρ: the step in space')],
        [P.cyan, L('Δκ：读数的变化', 'Δκ: the change of reading'), 'dash'],
        [P.ink, L('视界 η = 1', 'horizon η = 1'), 'dash']
      ];
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
      const x0 = lens ? rs - 0.95 : 0,
        x1 = lens ? rs + 0.95 : RX,
        g = kit.plot(cv, { x: [x0, x1], y: [-0.06, headroom(cv, PAD, rows.length, -0.06, 1.08)], pad: PAD });
      const ticks = lens ? [-0.8, -0.4, 0, 0.4, 0.8].map((d) => [rs + d, d === 0 ? '0' : kit.fix(d, 1).replace('-', '−')]) : [0, 0.5, 1, 1.5].map((x) => [x, kit.fix(x, 1)]);
      g.axes({ xTicks: ticks, yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
      const lo = Math.max(0, x0),
        hi = Math.min(RX, x1);
      g.line(sample(160, (t) => [lerp(lo, hi, t), kap0(lerp(lo, hi, t))]), P.cyan, { width: 1.8 });
      if (rhoOf(1) > x0 && rhoOf(1) < x1) g.line([[rhoOf(1), -0.06], [rhoOf(1), 1.04]], P.ink, { width: 1, dash: [4, 3] });
      if (state.scene === 'wdw') CELL_RHO.forEach((r, i) => r > x0 && r < x1 && g.dot(r, fval(DMEM[i]), P.cyan, 3.2));
      if (state.scene === 'cone' || state.scene === 'yaw') ETAS.forEach((e) => rhoOf(fval(e)) > x0 && rhoOf(fval(e)) < x1 && g.dot(rhoOf(fval(e)), kap0(rhoOf(fval(e))), P.ink, 2.4));
      // the step down from the focus: on card 5 to the next cell, else a fixed run
      const toR = state.scene === 'wdw' && m.wdw.f === 0 && m.wdw.ptr < CELLS - 1 ? CELL_RHO[m.wdw.ptr + 1] : Math.max(0.02, rs - 0.16),
        kTo = kap0(toR);
      g.line([[rs, ks], [toR, ks]], P.magenta, { width: 2 });
      g.line([[toR, ks], [toR, kTo]], P.cyan, { width: 2, dash: [4, 3] });
      g.line([[rs, ks], [toR, kTo]], P.violet, { width: 1.2 });
      g.dot(rs, ks, P.amber, 4);
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (!cb.clientWidth || !cb.clientHeight) return;
    const eNow = state.scene === 'cone' ? m.cone.eta.x : state.scene === 'yaw' ? 1.5 : etaNow();
    $('plotTitleB').textContent = L('沿画布的 GP 光锥：外向光沿 1 − η、自由下落 −η、内向光沿 −1 − η', 'GP cone along the canvas: outward rim 1 − η, free fall −η, inward rim −1 − η');
    $('plotMetaB').textContent = `η ${state.scene === 'cone' ? is(m.cone.eta) : state.scene === 'yaw' ? '= 3/2' : rel(null, eNow, 3)}`;
    const items = [
      [P.ink, L('1 − η 外向光沿', '1 − η outward rim')],
      [P.violet, L('−η 自由下落', '−η free fall')],
      [P.magenta, L('−1 − η 内向光沿', '−1 − η inward rim')],
      [P.magenta, L('r < rₛ：g_tt < 0 < g_rr', 'r < rₛ: g_tt < 0 < g_rr'), 'dash']
    ];
    const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12),
      X1 = 2.6,
      g = kit.plot(cb, { x: [0, X1], y: [-3.7, headroom(cb, PAD, rows.length, -3.7, 1.15)], pad: PAD });
    g.axes({ xTicks: [[0, '0'], [1, '1'], [2, '2']], yTicks: [[1, '1'], [0, '0'], [-1, '−1'], [-2, '−2'], [-3, '−3']] });
    g.rect(1, -3.7, X1, 1.15, P.magenta, { alpha: 0.08 });
    g.line([[0, 0], [X1, 0]], P.ink, { width: 1, dash: [2, 4] });
    g.line([[1, -3.7], [1, 1.15]], P.ink, { width: 1, dash: [4, 3] });
    g.line([[0, 1], [X1, 1 - X1]], P.ink, { width: 1.6 });
    g.line([[0, 0], [X1, -X1]], P.violet, { width: 1.6 });
    g.line([[0, -1], [X1, -1 - X1]], P.magenta, { width: 1.6 });
    for (const e of ETAS) g.dot(fval(e), 1 - fval(e), P.ink, 2.4);
    if (state.scene === 'yaw') for (const k of BRANCH_KS) g.dot(1.5, yawAt(k).dr.x, k === m.yaw.k ? P.amber : P.magenta, k === m.yaw.k ? 3.8 : 2.6);
    if (eNow <= X1) {
      g.line([[eNow, -3.7], [eNow, 1.15]], P.amber, { width: 1 });
      g.dot(eNow, 1 - eNow, P.amber, 3.8);
      g.dot(eNow, -eNow, P.amber, 3);
    } else g.arrow([X1 - 0.3, -1.3], [X1 - 0.02, -1.3], { color: P.amber, width: 1.6, headSize: 7 });
    drawLegend(g, rows);
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    switch (state.scene) {
      case 'split':
        return L(`垂足落在以 ∇κ 为直径的圆上（泰勒斯）；u = k/60 的每一站都给出有理的 cos φ 与 sin φ。`, `The foot lies on the circle with diameter ∇κ (Thales); every stop u = k/60 gives a rational cos φ and sin φ.`);
      case 'heap':
        return L(`⟨x${sub2('0')}, x${sub2('n')}⟩ = T${sub2('n')}(12/13)：${HEAP.map((x) => fstr(qdot(HEAP[0], x))).slice(0, 4).join('、')}、…；相隔 n 拍的两点读数只依赖 n。`, `⟨x${sub2('0')}, x${sub2('n')}⟩ = T${sub2('n')}(12/13): ${HEAP.map((x) => fstr(qdot(HEAP[0], x))).slice(0, 4).join(', ')}, …; two beats n apart have a reading that depends on n only.`);
      case 'cone':
        return L(`g${sub2('tt')} ∝ 1 − η² ${m.cone.gtt ? is(m.cone.gtt) : ''}：η &gt; 1（r &lt; r${sub2('s')}）时它与 g${sub2('rr')} 一起变号。`, `g${sub2('tt')} ∝ 1 − η² ${m.cone.gtt ? is(m.cone.gtt) : ''}: for η &gt; 1 (r &lt; r${sub2('s')}) it changes sign together with g${sub2('rr')}.`);
      case 'yaw':
        return L(`(dr/(c dT) + η)² + (v${sub2('⊥')}/c)² ${is(m.yaw.rim)}：舵点总在光锥底沿上（β = 1）。`, `(dr/(c dT) + η)² + (v${sub2('⊥')}/c)² ${is(m.yaw.rim)}: the steering tip stays on the rim of the cone (β = 1).`);
      default:
        return L(`滚焦点每步改写 1 个字（O(1)），搬画布每步改写 |S| = ${CELLS} 个格子（Θ(|S|)）；两者读到同一串 D。`, `Rolling the focus rewrites 1 word a step (O(1)), moving the canvas |S| = ${CELLS} cells a step (Θ(|S|)); both read the same D.`);
    }
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      p = m.split,
      h = m.heap,
      c = m.cone,
      y = m.yaw,
      q = m.wdw;
    const keys = {
      split: () => `${short(p.kt)} + ${short(p.ks)} ${is(p.sum)}`,
      heap: () => `${L('相邻两拍', 'adjacent beats')} κ ${is(h.step)} · ${L('外推', 'pushes')} 0`,
      cone: () => `1 − η ${is(c.out)} · ${L(...REGIME[c.regime])}`,
      yaw: () => `${pair(y.dr, y.vp)} · Δr &lt; 0`,
      wdw: () => (q.dD ? `ΔD ${is(q.dD)} · ${q.roll} / ${q.shift}` : `D${sub2('ptr')} ${is(q.D)} · ${q.roll} / ${q.shift}`)
    };
    put('roKey', keys[state.scene]());
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roSplit', `${short(p.u)} · ${short(p.cos)} · ${short(p.sin)} · ${short(p.kt)} + ${short(p.ks)} ${is(p.sum)}`);
    put('roHeap', `${h.f === 0 ? h.n : rel(null, h.t, 2).replace('≈ ', '≈')} · ${brief(h.dot)} · ${brief(h.kappa)} · 0 / ${h.walker}`);
    put('roCone', `${short(c.eta)} · ${c.rrs ? short(c.rrs) : '∞'} · ${short(c.free)} · ${short(c.out)}`);
    put('roBoost', c.cosh ? `${short(c.cosh)} · ${short(c.sinh)} · ${both(c.hyp)}` : L('η ≥ 1：没有静止观察者', 'η ≥ 1: no static observer'));
    put('roYaw', `${short(y.u)} · ${pair(y.cos, y.sin)} · ${pair(y.dr, y.vp)}`);
    put('roQram', `${q.f === 0 ? q.ptr : rel(null, q.t, 2).replace('≈ ', '≈')} · ${short(q.D)} · ${q.dD ? short(q.dD) : '—'} · ${q.roll} / ${q.shift}`);
    put('roNote', readNote(m));
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    put('keyPill', state.lens ? L('S <strong>滑过</strong>', 'S <strong>slides</strong>') : L('S <strong>不动</strong>', 'S <strong>still</strong>'));
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = {
      split: '‖P<sub>W</sub>∇κ‖² + ‖(I − P<sub>W</sub>)∇κ‖² = ‖∇κ‖²',
      heap: 'x<sub>n+2</sub> = x<sub>n+1</sub>x<sub>n</sub><sup>*</sup>x<sub>n+1</sub> · x<sub>n</sub> = b<sup>n</sup>',
      cone: 'dr/(c dT) = β cos ψ − η · η = √(r<sub>s</sub>/r)',
      yaw: '(cos ψ, sin ψ) = ((1 − u²)/(1 + u²), 2u/(1 + u²))',
      wdw: 'Ĥ|Ψ⟩ = 0 · ΔD = D<sub>ptr</sub> − D<sub>ptr−1</sub>'
    }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    const badge = $('lensBadge');
    if (badge.dataset.lens !== String(state.lens)) {
      badge.dataset.lens = String(state.lens);
      badge.innerHTML = `<span class="zh">${LENS_TITLE[state.lens][0]}</span><span class="en">${LENS_TITLE[state.lens][1].replace(/&/g, '&amp;')}</span>`;
    }
    $('lensMirror').title = L(...LENS_TITLE[state.lens]);
    $('uRange').value = String(Math.round(state.at.split));
    put('uOut', `${is(p.u)}`);
    $('walkerBtn').setAttribute('aria-pressed', String(state.walker));
    etaChips.set(c.k != null && Number.isInteger(c.k) ? String(c.k) : null, true);
    yawChips.set(Number.isInteger(y.k) && BRANCH[y.k] ? String(y.k) : null, true);
    curChips.set(q.f === 0 ? String(q.ptr) : null, true);
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
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.split.rate,
    step: 1,
    max: RAILS.split.max,
    t: STILL.split,
    format: (t) => {
      const v = settled(t),
        int = Number.isInteger(v);
      switch (state.scene) {
        case 'heap':
          return `n = ${int ? v : kit.fix(v, 2)}`;
        case 'cone':
          return int ? `η = ${fstr(ETAS[v])}` : `η ≈ ${kit.fix(etaRail(v), 2)}`;
        case 'yaw':
          return `u = ${int ? fstr(frac(BigInt(v - YAW), BigInt(YAW))) : kit.fix((v - YAW) / YAW, 3)}`;
        case 'wdw':
          return `ptr = ${int ? v : kit.fix(v, 2)}`;
        default:
          return `u = ${int ? fstr(frac(BigInt(v), BigInt(GRID))) : kit.fix(v / GRID, 3)}`;
      }
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a rail that counts comes to rest on a whole number
      if (!c.playing && rail().whole && abs(t - Math.round(t)) > 1e-9) {
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
  /** Give the rail to the scene: its length, speed and step, and the value it drives. */
  function setRail() {
    const r = rail();
    clock.rate = r.rate;
    clock.step = r.step;
    $('now').step = r.whole ? '1' : 'any';
    const at = Math.min(state.at[state.scene], r.max);
    clock.setMax(r.max, true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
  /** A pointer lands on whole numbers where the rail counts, and on a whole place when it comes close to one. */
  function snap(v, close = clock.max / 222) {
    const k = Math.round(v);
    return rail().whole || abs(v - k) < close ? k : v;
  }
  $('now').addEventListener('input', () => {
    const v = snap(clock.t);
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
  const camFor = (scene) => Object.values(PRESETS).find((p) => p.scene === scene).cam;
  function show(scene) {
    if (state.scene === scene) return;
    setScene(scene, 0);
    state.cam = camFor(scene);
    camChips.set(state.cam, true);
    sc.view(cams[state.cam], 0);
  }
  /** A control of a card shows the card and changes it. */
  function steer(scene, change) {
    leave();
    show(scene);
    change();
    paint();
  }
  kit.field($('uRange'), { out: $('uOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), BigInt(GRID)))}`, onInput: (v) => steer('split', () => clock.set(Math.round(v))) });
  $('walkerBtn').addEventListener('click', () => steer('heap', () => (state.walker = !state.walker)));
  const etaChips = kit.chips($('etaChips'), 'eta', (v) => steer('cone', () => clock.set(Number(v))));
  const yawChips = kit.chips($('yawChips'), 'yaw', (v) => steer('yaw', () => clock.set(Number(v))));
  const curChips = kit.chips($('curChips'), 'cur', (v) => steer('wdw', () => clock.set(Number(v))));
  /** The next rational landmark u ∈ {0, 1/3, 1/2, 1} after the present stop. */
  function nextSplit() {
    const stops = [0, 20, 30, 60],
      k = Math.round(state.at.split);
    steer('split', () => clock.set(stops.find((s) => s > k) ?? stops[0]));
  }
  /** One unit of the rail forward, from the start again once the end is reached. The card stays marked. */
  function stepOne() {
    stopBootPlay();
    clock.pause();
    const r = rail(),
      k = Math.round(state.at[state.scene]);
    if (r.whole) {
      const stops = state.scene === 'yaw' ? BRANCH_KS : range(r.max + 1);
      clock.set(stops.find((s) => s > k) ?? stops[0]);
      return;
    }
    if (k >= r.max) clock.set(0);
    stopAt = (k >= r.max ? 0 : k) + 1;
    clock.play();
  }
  $('stageAct').addEventListener('click', () => (state.scene === 'split' ? nextSplit() : stepOne()));
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens changes the frame and keeps the state; the rail switch and its mirror in the tour bar both flip it
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
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
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
  /** The notes are plain text: subscripts of the HUD become underscores. */
  const plain = (s) => s.replace(/<sub>(.*?)<\/sub>/g, '_$1').replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/&lt;/g, '<');
  function writeNotes(m) {
    const n = noteOf(m),
      pr = (shortNotes() ? n.fig : n.long).map(plain);
    notesObj[CARD_OF[state.scene]] = pr;
    idlePair[0] = '自由探索：' + pr[0];
    idlePair[1] = 'Free play: ' + pr[1];
    return pr;
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
      y = ev.clientY - b.top;
    // the place of the rail nearest the pointer, the present one before others at the same distance
    const n = rail().whole ? clock.max : 240;
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= n; k++) {
      const v = (clock.max * k) / n,
        p = sc.p(handleWorld(v)),
        d = hypot(p[0] - x, p[1] - y) + abs(clock.t - v) * 1e-4;
      if (d < gap) {
        gap = d;
        best = v;
      }
    }
    clock.set(snap(best, 0.04));
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
  const FRAME = { box: 2, schurY: 48, heap: BEATS, records: 3 };
  const mmul = (A, B) => A.map((row) => range(B[0].length).map((j) => row.reduce((s, x, k) => plus(s, times(x, B[k][j])), ZERO)));
  const meq = (A, B) => A.every((row, i) => row.every((x, j) => equal(x, B[i][j])));
  const madd = (A, B) => A.map((row, i) => row.map((x, j) => plus(x, B[i][j])));
  const msub = (A, B) => A.map((row, i) => row.map((x, j) => minus(x, B[i][j])));
  const ID3 = range(3).map((i) => range(3).map((j) => (i === j ? ONE : ZERO)));
  const Z3 = range(3).map(() => range(3).map(() => ZERO));
  const projOf = (v) => {
    const n = v.reduce((s, x) => s + x * x, 0);
    return v.map((a) => v.map((b) => frac(BigInt(a * b), BigInt(n))));
  };
  /** The rank of a list of rows of fractions, by elimination. */
  function rankQ(rows) {
    const M = rows.map((r) => r.slice());
    let rank = 0;
    for (let col = 0; col < (M[0] || []).length && rank < M.length; col++) {
      const piv = M.findIndex((r, i) => i >= rank && r[col][0] !== 0n);
      if (piv < 0) continue;
      [M[rank], M[piv]] = [M[piv], M[rank]];
      for (let i = 0; i < M.length; i++) {
        if (i === rank || M[i][col][0] === 0n) continue;
        const f = quo(M[i][col], M[rank][col]);
        M[i] = M[i].map((x, j) => minus(x, times(f, M[rank][j])));
      }
      rank++;
    }
    return rank;
  }
  const rankOf = (rows) => rankQ(rows.map((r) => r.map((x) => whole(x))));
  /* the reversible QRAM of depth 2, written after the definitions of ReversibleQram: addresses (b, (b′, ())), wires as nested
     pairs of Booleans; the routing network of splits, the one-hot specification, the leaves and the query */
  const QR = (() => {
    const addrs = (n) => (n === 0 ? [null] : addrs(n - 1).flatMap((a) => [false, true].map((b) => [b, a])));
    const allWires = (n) => (n === 0 ? [false, true] : allWires(n - 1).flatMap((l) => allWires(n - 1).map((r) => [l, r])));
    const root = (n, w) => (n === 0 ? w : root(n - 1, w[0]));
    const clean = (n, e) => (n === 0 ? e : [clean(n - 1, e), clean(n - 1, false)]);
    const xorRoot = (n, b, w) => (n === 0 ? w !== b : [xorRoot(n - 1, b, w[0]), w[1]]);
    /** Toffoli from the address and the left root into the right scratch root, then CNOT from the right root into the left. */
    const split = (n, b, [l, r]) => {
      const r1 = xorRoot(n, b && root(n, l), r);
      return [xorRoot(n, root(n, r1), l), r1];
    };
    const route = (n, a, w) => {
      if (n === 0) return w;
      const [l, r] = split(n - 1, a[0], w);
      return [route(n - 1, a[1], l), route(n - 1, a[1], r)];
    };
    const oneHot = (n, a, e) => (n === 0 ? e : [oneHot(n - 1, a[1], e && !a[0]), oneHot(n - 1, a[1], e && a[0])]);
    const leaf = (n, w, i) => (n === 0 ? w : leaf(n - 1, i[0] ? w[1] : w[0], i[1]));
    /** readAmount: the data of the lit leaves, added, in the order of the Lean definition. */
    const readAmount = (n, D, w, plusG, zeroG) => (n === 0 ? (w === true ? D(null) : zeroG) : plusG(readAmount(n - 1, (a) => D([false, a]), w[0], plusG, zeroG), readAmount(n - 1, (a) => D([true, a]), w[1], plusG, zeroG)));
    /** The inverse of the routing network: undo the splits from the leaves up. */
    const unroute = (n, a, w) => {
      if (n === 0) return w;
      // undo the routing of both halves, then the CNOT (right root into left), then the Toffoli (address and left root)
      const l = unroute(n - 1, a[1], w[0]),
        r = unroute(n - 1, a[1], w[1]),
        l0 = xorRoot(n - 1, root(n - 1, r), l),
        r0 = xorRoot(n - 1, a[0] && root(n - 1, l0), r);
      return [l0, r0];
    };
    const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);
    /** query: route, add the data of every lit leaf, unroute; the address is a control. */
    const query = (n, D, [a, w, r], plusG, zeroG) => {
      const routed = route(n, a, w),
        amount = readAmount(n, D, routed, plusG, zeroG);
      return [a, unroute(n, a, routed), plusG(r, amount)];
    };
    return { addrs, allWires, clean, route, unroute, oneHot, leaf, readAmount, query, same };
  })();
  /** The index of a depth-2 address (b₁, (b₀, ())) in D: b₁ is the outer bit. */
  const addrIndex = (a) => (a[0] ? 2 : 0) + (a[1][0] ? 1 : 0);
  function benchmarks() {
    const F = FRAME,
      span = (n) => range(2 * n + 1).map((k) => k - n);
    // 1 · the window: every stop of u is a rational point, the foot is on the Thales circle, the legs are orthogonal
    let circleBad = 0,
      thalesBad = 0,
      orthoBad = 0;
    for (let k = 0; k <= GRID; k++) {
      const s = splitAt(k),
        c = s.cos.q,
        si = s.sin.q;
      if (!equal(plus(times(c, c), times(si, si)), ONE)) circleBad++;
      const fx = times(c, c),
        fy = times(c, si),
        dx = minus(fx, [1n, 2n]);
      if (!equal(plus(times(dx, dx), times(fy, fy)), [1n, 4n])) thalesBad++;
      if (!equal(plus(times(fx, minus(ONE, fx)), times(fy, neg(fy))), ZERO)) orthoBad++;
    }
    // 2 · complementary projections onto integer lines: Q from an orthogonal basis of the complement
    let projTried = 0,
      projBad = 0;
    for (const x of span(F.box))
      for (const y of span(F.box))
        for (const z of span(F.box)) {
          const v = [x, y, z];
          if (!v.some(Boolean)) continue;
          projTried++;
          const Pm = projOf(v),
            e = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].find((u) => cross(v, u).some(Boolean)),
            b1 = cross(v, e),
            b2 = cross(v, b1),
            Qm = madd(projOf(b1), projOf(b2));
          const ok = meq(Qm, msub(ID3, Pm)) && meq(mmul(Pm, Pm), Pm) && meq(mmul(Qm, Qm), Qm) && meq(mmul(Pm, Qm), Z3) && meq(mmul(Qm, Pm), Z3) && meq(madd(Pm, Qm), ID3);
          if (!ok) projBad++;
        }
    // 3 · the Schur minimum at x = 1: A + 2By + Cy² ≥ A − B²/C on a grid of y, attained exactly at y = −B/C
    let schurTried = 0,
      schurBad = 0;
    for (let A = -2; A <= 3; A++)
      for (let B = -3; B <= 3; B++)
        for (let Cc = 1; Cc <= 4; Cc++) {
          schurTried++;
          const S = minus(whole(A), frac(BigInt(B * B), BigInt(Cc))),
            val = (y) => plus(plus(whole(A), times(whole(2 * B), y)), times(whole(Cc), times(y, y))),
            ystar = frac(BigInt(-B), BigInt(Cc));
          let bad = !equal(val(ystar), S);
          for (let j = -F.schurY; j <= F.schurY; j++) {
            const y = frac(BigInt(j), 12n),
              c = cmp(val(y), S);
            if (c < 0 || (c === 0 && !equal(y, ystar))) bad = true;
          }
          if (bad) schurBad++;
        }
    // 4 · rational unit quaternions: the heap is b^n, ⟨x₀, x_n⟩ = T_n(c), equal spacing gives equal readings,
    // κ = 1 − dist²/4, and tri(x, y, z) = x · y⁻¹ · z in the group at a base point
    const units = [[[12, 5, 0, 0], 13], [[1, 2, 2, 4], 5], [[3, 0, 4, 0], 5], [[1, 1, 1, 1], 2], [[2, 3, 6, 0], 7]].map(([t, d]) => quat(t, d));
    let heapBad = 0,
      spacingBad = 0,
      chebBad = 0,
      chordBad = 0,
      groupBad = 0,
      spacingTried = 0,
      normBad = 0;
    for (const b of units) {
      const xs = [quat([1, 0, 0, 0], 1), b];
      for (let n = 2; n <= F.heap; n++) xs.push(qm(qm(xs[n - 1], qc(xs[n - 2])), xs[n - 1]));
      let pw = quat([1, 0, 0, 0], 1);
      const c0 = qdot(xs[0], xs[1]),
        T = [ONE, c0];
      for (let n = 2; n <= F.heap; n++) T.push(minus(times(times(whole(2), c0), T[n - 1]), T[n - 2]));
      for (let n = 0; n <= F.heap; n++) {
        if (!qeq(xs[n], pw)) heapBad++;
        if (!equal(qdot(xs[0], xs[n]), T[n])) chebBad++;
        if (!equal(qdot(xs[n], xs[n]), ONE)) normBad++;
        pw = qm(pw, b);
      }
      for (let mm = 0; mm <= F.heap; mm++)
        for (let n = 0; mm + n <= F.heap; n++) {
          spacingTried++;
          if (!equal(kap(xs[mm], xs[mm + n]), kap(xs[0], xs[n]))) spacingBad++;
        }
      for (const y of units) {
        const dd = range(4).map((i) => minus(b[i], y[i])),
          dist2 = qdot(dd, dd);
        if (!equal(kap(b, y), minus(ONE, times(dist2, [1n, 4n])))) chordBad++;
        for (const z of units) {
          const o = units[3],
            mul = (u, v) => qm(qm(u, qc(o)), v),
            inv = (u) => qm(qm(o, qc(u)), o);
          if (!qeq(qm(qm(b, qc(y)), z), mul(mul(b, inv(y)), z))) groupBad++;
        }
      }
    }
    // 5 · the heap of the page: x₈ and its reading
    const heap8 = qdot(HEAP[0], HEAP[BEATS]);
    // 6 · the cone: (dr + η)² + v⊥² = 1 on the rim at every stop of η and of u; for η > 1 every direction goes down;
    // at η = 1 the outward rim is exactly 0; for η < 1 it is positive
    let rimTried = 0,
      rimBad = 0,
      downBad = 0,
      signBad = 0;
    const signs = [];
    for (const eta of ETAS) {
      const outward = minus(ONE, eta),
        e2 = times(eta, eta),
        gtt = minus(ONE, e2);
      signs.push(cmp(gtt, ZERO));
      const want = cmp(eta, ONE) < 0 ? 1 : equal(eta, ONE) ? 0 : -1;
      if (cmp(outward, ZERO) !== want) signBad++;
      for (let k = 0; k <= 2 * YAW; k++) {
        rimTried++;
        const u = frac(BigInt(k - YAW), BigInt(YAW)),
          u2 = times(u, u),
          den = plus(ONE, u2),
          cos = quo(minus(ONE, u2), den),
          sin = quo(times(whole(2), u), den),
          dr = minus(cos, eta);
        if (!equal(plus(times(plus(dr, eta), plus(dr, eta)), times(sin, sin)), ONE)) rimBad++;
        if (cmp(eta, ONE) > 0 && cmp(dr, ZERO) >= 0) downBad++;
      }
    }
    const rim = (i) => minus(ONE, ETAS[i]);
    // 7 · the yaw at η = 3/2: the five named branches
    const yawRows = BRANCH_KS.map((k) => {
      const y = yawAt(k);
      return [k, y.dr.q, y.vp.q];
    });
    // 8 · the null cone of the river: in (t, x, y) the null vectors (1, cos ψ − η, sin ψ) at nine rational ψ; the quadratic
    // forms vanishing on them form a line spanned by Q_η = t² − (x + ηt)² − y² (rank 5 of the 6 monomials)
    const monos = ([t, x, y]) => [times(t, t), times(x, x), times(y, y), times(t, x), times(t, y), times(x, y)];
    const coneRows = [];
    for (const eta of [ETAS[1], ETAS[3], ETAS[5]]) {
      const vecs = [0, 5, 10, 15, 20, 25, 30, 35, 40].map((k) => {
        const u = frac(BigInt(k - YAW), BigInt(YAW)),
          u2 = times(u, u),
          den = plus(ONE, u2);
        return [ONE, minus(quo(minus(ONE, u2), den), eta), quo(times(whole(2), u), den)];
      });
      const rows = vecs.map(monos),
        rk = rankQ(rows),
        Q = [minus(ONE, times(eta, eta)), neg(ONE), neg(ONE), times(whole(-2), eta), ZERO, ZERO],
        onCone = rows.every((r) => equal(r.reduce((s, x, i) => plus(s, times(x, Q[i])), ZERO), ZERO));
      coneRows.push({ eta, rank: rk, onCone });
    }
    // 9 · the boost of free fall seen from rest: cosh² − sinh² = 1 at η = 3/5 and 4/5
    const boosts = [ETAS[1], ETAS[2]].map((eta) => {
      const f = etaFacts(eta, true);
      return { eta, cosh: f.cosh.q, sinh: f.sinh.q, hyp: f.hyp.q };
    });
    // 10 · the records of the pointer: ħ = 1 and energy = π/4 give τ ≥ πħ/(4·energy) = 1 per record; three records need T ≥ 3,
    // and in T = 3 at most 4·energy·T/(πħ) = 3 records fit
    const tauMin = (PI * 1) / (4 * (PI / 4)),
      countMax = (4 * (PI / 4) * F.records) / (PI * 1);
    // 11 · the QRAM of depth 2 with D = [1, 3/4, 1/2, 1/4] in ℚ: routing a clean register lights the leaf a alone; the query
    // agrees with r + readAmount(route a w) on every wire configuration, adds D a on clean wires, and on ℤ/4 it is a bijection
    const A2 = QR.addrs(2),
      W2 = QR.allWires(2);
    let leafBad = 0,
      queryBad = 0,
      cleanBad = 0;
    const Dq = (a) => DMEM[addrIndex(a)];
    for (const a of A2)
      for (const e of [false, true]) {
        const w = QR.route(2, a, QR.clean(2, e));
        if (!QR.same(w, QR.oneHot(2, a, e))) leafBad++;
        for (const i of A2) if (QR.leaf(2, w, i) !== (QR.same(i, a) ? e : false)) leafBad++;
      }
    for (const a of A2) {
      for (const w of W2) {
        const r = frac(1n, 3n),
          out = QR.query(2, Dq, [a, w, r], plus, ZERO);
        if (!QR.same(out[1], w) || !equal(out[2], plus(r, QR.readAmount(2, Dq, QR.route(2, a, w), plus, ZERO)))) queryBad++;
      }
      const out = QR.query(2, Dq, [a, QR.clean(2, true), ZERO], plus, ZERO);
      if (!QR.same(out[1], QR.clean(2, true)) || !equal(out[2], Dq(a))) cleanBad++;
    }
    const D4 = [0, 3, 2, 1],
      seen4 = new Set();
    for (const a of A2) for (const w of W2) for (let r = 0; r < 4; r++) seen4.add(JSON.stringify(QR.query(2, (x) => D4[addrIndex(x)], [a, w, r], (p, q) => (p + q) % 4, 0)));
    const configs = A2.length * W2.length * 4;
    // 12 · the observable Krylov tower of the pointer: T moves the readout one cell on (Tᵀ e_k = e_{k+1}), C reads cell 0;
    // the dimensions grow 1, 2, 3, 4 and then stay: 3 strict steps, at most dim V − rank C = 4 − 1
    const Tt = range(4).map((i) => range(4).map((j) => (i === j + 1 ? 1 : 0))),
      tower = [];
    let gen = [[1, 0, 0, 0]],
      vec = [1, 0, 0, 0];
    for (let k = 0; k <= 6; k++) {
      tower.push(rankOf(gen));
      vec = range(4).map((i) => range(4).reduce((s, j) => s + Tt[i][j] * vec[j], 0));
      gen = [...gen, vec];
    }
    const strict = tower.filter((d, k) => k + 1 < tower.length && tower[k + 1] > d).length,
      stableAt = tower.findIndex((d, k) => k + 1 < tower.length && d === tower[k + 1]),
      stableBad = tower.slice(stableAt).filter((d) => d !== tower[stableAt]).length;
    // 13 · the readout topology of the frame reversal: states (ptr t, shift s) read D[(t + s) mod 4]; the open sets are the
    // unions of fibres; two states lie in the same open sets exactly when they read the same, and (t, 0) ~ (0, t)
    const statesTS = range(CELLS).flatMap((t) => range(CELLS).map((s) => [t, s])),
      readOf = ([t, s]) => (t + s) % CELLS,
      opens = range(1 << CELLS).map((mask) => statesTS.filter((x) => (mask >> readOf(x)) & 1).map((x) => x.join()));
    let insepBad = 0,
      pairs = 0;
    for (const x of statesTS)
      for (const y of statesTS) {
        pairs++;
        const insep = opens.every((U) => U.includes(x.join()) === U.includes(y.join()));
        if (insep !== (readOf(x) === readOf(y))) insepBad++;
      }
    const reversal = range(CELLS).every((t) => readOf([t, 0]) === readOf([0, t]));
    // 14 · the memory D: ΔD = −1/4 at every step, the rewrites 1 (roll) and |S| (shift) a step
    const steps = range(CELLS - 1).map((i) => minus(DMEM[i + 1], DMEM[i])),
      stepBad = steps.filter((d) => !equal(d, frac(-1n, 4n))).length;
    return {
      window: { stops: GRID + 1, circleBad, thalesBad, orthoBad },
      proj: { tried: projTried, bad: projBad },
      schur: { tried: schurTried, bad: schurBad, grid: 2 * F.schurY + 1 },
      quaternion: { units: units.length, heapBad, chebBad, normBad, spacingTried, spacingBad, chordBad, groupBad, groupTried: units.length ** 3 },
      heap8,
      cone: { tried: rimTried, rimBad, downBad, signBad, signs, rims: [rim(1), rim(3), rim(5)] },
      yaw: yawRows,
      nullCone: coneRows,
      boosts,
      records: { tauMin, countMax, n: F.records },
      qram: { leafBad, queryBad, cleanBad, configs, images: seen4.size },
      krylov: { tower, strict, bound: 4 - 1, stableAt, bad: stableBad },
      topology: { pairs, bad: insepBad, reversal },
      memory: { steps, stepBad }
    };
  }
  const BENCH = benchmarks();
  const DEMO = { split: splitAt(STILL.split), wdw: qramAt(STILL.wdw) };
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    kPar: () => relQ(DEMO.split.kt.q),
    kPerp: () => relQ(DEMO.split.ks.q),
    heap8: () => `= ${fstr(BENCH.heap8)} ${relQ(BENCH.heap8)}`,
    walker: () => String(BEATS),
    rim35: () => `= ${fstr(BENCH.cone.rims[0])}`,
    rim1: () => `= ${fstr(BENCH.cone.rims[1])}`,
    rim32: () => `= ${fstr(BENCH.cone.rims[2])}`,
    yawR: () => {
      const r = BENCH.yaw.find(([k]) => k === 30);
      return `(${fstr(r[1])}, ${fstr(r[2])})`;
    },
    dD: () => `= ${fstr(DEMO.wdw.dD.q)}`,
    roll: () => String(DEMO.wdw.roll),
    shift: () => String(DEMO.wdw.shift)
  };
  /** The text of the NUM box. */
  function numText(sayIt) {
    const B = BENCH,
      list = (xs) => xs.join(sayIt('、', ', ')),
      bad = (n) => sayIt(`不符 ${n} 处`, `${n} failures`),
      sign = (s) => (s > 0 ? '+' : s < 0 ? '−' : '0'),
      cones = list(B.nullCone.map((c) => `η = ${fstr(c.eta)}${sayIt('：秩 ', ': rank ')}${c.rank}${c.onCone ? '' : sayIt('（Q_η 不在其中）', ' (Q_η not in it)')}`)),
      boosts = list(B.boosts.map((b) => `η = ${fstr(b.eta)}: cosh r = ${fstr(b.cosh)}, sinh r = ${fstr(b.sinh)}, cosh² − sinh² = ${fstr(b.hyp)}`)),
      yaws = list(B.yaw.map(([k, dr, vp]) => `u = ${fstr(frac(BigInt(k - YAW), BigInt(YAW)))} → (${fstr(dr)}, ${fstr(vp)})`));
    return sayIt(
      `打开页面时由脚本用分数现算，是上面各条定理的个别实例，不检验定理的前提。记忆窗：u 的 ${B.window.stops} 站上 cos²φ + sin²φ = 1 ${bad(B.window.circleBad)}，垂足在泰勒斯圆上${bad(B.window.thalesBad)}，两直角边正交${bad(B.window.orthoBad)}。正交补：${B.proj.tried} 条整数直线上六条恒等式${bad(B.proj.bad)}。舒尔：${B.schur.tried} 个二次型在 ${B.schur.grid} 个 y 上的最小值都是 A − B²/C，只在 y = −B/C 取到，${bad(B.schur.bad)}。有理单位四元数 ${B.quaternion.units} 个：模方为 1 ${bad(B.quaternion.normBad)}，堆序列与幂${bad(B.quaternion.heapBad)}，⟨x₀, xₙ⟩ = Tₙ(c) ${bad(B.quaternion.chebBad)}，${B.quaternion.spacingTried} 对等间距读数${bad(B.quaternion.spacingBad)}，κ = 1 − dist²/4 ${bad(B.quaternion.chordBad)}，${B.quaternion.groupTried} 个三元组的群分解${bad(B.quaternion.groupBad)}。页面的堆：b = (12 + 5i)/13，⟨x₀, x₈⟩ = ${fstr(B.heap8)}。光锥：${ETAS.length} 个流速与 u 的 ${2 * YAW + 1} 站共 ${B.cone.tried} 个方向上 (dr/(c dT) + η)² + (v⊥/c)² = 1 ${bad(B.cone.rimBad)}；η > 1 时每个方向 dr < 0 ${bad(B.cone.downBad)}；外向光沿 1 − η 的符号（η < 1 为正、η = 1 为 0、η > 1 为负）${bad(B.cone.signBad)}；g_tt ∝ 1 − η² 的符号依次为 ${B.cone.signs.map(sign).join(' ')}。偏航（η = 3/2）：${yaws}。零锥：九个有理零向量 (1, cos ψ − η, sin ψ) 上为 0 的二次型（${cones}）都是 Q_η = t² − (x + ηt)² − y² 的倍数。快度：${boosts}。记录：ħ = 1、energy = π/4 时每条记录至少 τ ${rel(ONE, B.records.tauMin)}，T = ${B.records.n} 内至多 ${rel(whole(B.records.n), B.records.countMax)} 条。QRAM（深度 2，D = [1, 3/4, 1/2, 1/4]）：干净路由只点亮地址 a 的叶线${bad(B.qram.leafBad)}，查询等于 r + readAmount(route a w) ${bad(B.qram.queryBad)}，干净线上加上 D a ${bad(B.qram.cleanBad)}；在 ℤ/4 上 ${B.qram.configs} 个构型的像有 ${B.qram.images} 个${B.qram.images === B.qram.configs ? '，是双射' : '，不是双射'}。克雷洛夫塔的维数 ${list(B.krylov.tower)}：严格增长 ${B.krylov.strict} 次，不超过 4 − 1 = ${B.krylov.bound}，从 m = ${B.krylov.stableAt} 起不再增长，之后${bad(B.krylov.bad)}。读出拓扑：${B.topology.pairs} 对状态 (ptr, 平移) 中不可分当且仅当读数相等${bad(B.topology.bad)}；(t, 0) 与 (0, t) 读数相同${B.topology.reversal ? '' : '（不符）'}。记忆：ΔD 依次为 ${list(B.memory.steps.map(fstr))}，${bad(B.memory.stepBad)}。数值演示，不是证明。`,
      `Computed in fractions by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Window: on the ${B.window.stops} stops of u, cos²φ + sin²φ = 1, ${bad(B.window.circleBad)}; the foot on the Thales circle, ${bad(B.window.thalesBad)}; orthogonal legs, ${bad(B.window.orthoBad)}. Complements: the six identities on ${B.proj.tried} integer lines, ${bad(B.proj.bad)}. Schur: for ${B.schur.tried} quadratic forms the least value over ${B.schur.grid} values of y is A − B²/C, attained only at y = −B/C, ${bad(B.schur.bad)}. ${B.quaternion.units} rational unit quaternions: squared norm 1, ${bad(B.quaternion.normBad)}; heap against powers, ${bad(B.quaternion.heapBad)}; ⟨x₀, xₙ⟩ = Tₙ(c), ${bad(B.quaternion.chebBad)}; ${B.quaternion.spacingTried} equally spaced readings, ${bad(B.quaternion.spacingBad)}; κ = 1 − dist²/4, ${bad(B.quaternion.chordBad)}; the group on ${B.quaternion.groupTried} triples, ${bad(B.quaternion.groupBad)}. The heap of the page: b = (12 + 5i)/13, ⟨x₀, x₈⟩ = ${fstr(B.heap8)}. Cone: on ${B.cone.tried} directions (${ETAS.length} flow speeds times ${2 * YAW + 1} stops of u), (dr/(c dT) + η)² + (v⊥/c)² = 1, ${bad(B.cone.rimBad)}; for η > 1 every direction has dr < 0, ${bad(B.cone.downBad)}; the sign of the outward rim 1 − η (positive for η < 1, 0 at η = 1, negative for η > 1), ${bad(B.cone.signBad)}; the signs of g_tt ∝ 1 − η² are ${B.cone.signs.map(sign).join(' ')}. Yaw (η = 3/2): ${yaws}. Null cone: the quadratic forms vanishing on nine rational null vectors (1, cos ψ − η, sin ψ) (${cones}) are multiples of Q_η = t² − (x + ηt)² − y². Rapidity: ${boosts}. Records: with ħ = 1 and energy = π/4 each record takes at least τ ${rel(ONE, B.records.tauMin)}, and at most ${rel(whole(B.records.n), B.records.countMax)} records fit in T = ${B.records.n}. QRAM (depth 2, D = [1, 3/4, 1/2, 1/4]): clean routing lights the leaf of a alone, ${bad(B.qram.leafBad)}; the query is r + readAmount(route a w), ${bad(B.qram.queryBad)}; on clean wires it adds D a, ${bad(B.qram.cleanBad)}; over ℤ/4 the ${B.qram.configs} configurations have ${B.qram.images} images${B.qram.images === B.qram.configs ? ', a bijection' : ', not a bijection'}. The Krylov tower has dimensions ${list(B.krylov.tower)}: ${B.krylov.strict} strict steps, at most 4 − 1 = ${B.krylov.bound}, no growth from m = ${B.krylov.stableAt}, and after that ${bad(B.krylov.bad)}. Readout topology: of ${B.topology.pairs} pairs of states (ptr, shift), inseparable exactly when the readings agree, ${bad(B.topology.bad)}; (t, 0) and (0, t) read the same${B.topology.reversal ? '' : ' (failed)'}. Memory: ΔD runs ${list(B.memory.steps.map(fstr))}, ${bad(B.memory.stepBad)}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, sayIt] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(sayIt);
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
  const plainJSON = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.CANVAS_DEBUG = Object.freeze({
    get state() {
      const m = calc(),
        o = sphereNow();
      return plainJSON({
        ...m,
        at: state.at,
        scene: state.scene,
        regime: regimeOf(m),
        lens: state.lens,
        lensT: state.lensT,
        walker: state.walker,
        cam: state.cam,
        layers: layers(),
        clock: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        sphere: { rho: o.r, eta: etaOf(o.r), kappa: kap0(o.r), centre: o.C, contact: o.P, screen: sc.p(o.C).slice(0, 2), roll: rollAt(o.r) },
        view: { cx: opts.cx, cy: opts.cy, radius: opts.radius, titleTop: title.top }
      });
    },
    /** The mathematics at a state, without touching the page. */
    calc: (over = {}) => plainJSON(compute({ ...FRESH, ...over, at: { ...STILL, ...(over.at || {}) } })),
    presets: plainJSON(PRESETS),
    /** The exact core, for tests. */
    core: {
      split: (k) => plainJSON(splitAt(k)),
      cone: (k) => plainJSON(coneAt(k)),
      yaw: (k) => plainJSON(yawAt(k)),
      heap: (n) => plainJSON(heapAt(n)),
      qram: (t) => plainJSON(qramAt(t)),
      etas: () => plainJSON(ETAS),
      memory: () => plainJSON(DMEM)
    },
    /** What the NUM box and the drawer are written from. */
    bench: () => plainJSON({ ...BENCH, frame: FRAME }),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), sci },
    /** The world geometry: the chart, the ray and the sphere. */
    geometry: () => plainJSON({ RC, RX, HZ, Z0, RB, out: OUT, perp: PERP, theta: TH0, cells: CELL_RHO, heapStart: RHO_A, beatArc: DS, lensTitles: LENS_TITLE }),
    /** Where the sphere sits for a scene and a rail value, and the canvas height there. */
    place: (scene, v) => {
      const r = rhoFor(scene, { ...state.at, [scene]: v });
      return plainJSON({ rho: r, eta: etaOf(r), kappa: kap0(r), roll: rollAt(r) });
    },
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
