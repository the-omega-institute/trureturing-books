/* OMEGA//SPACETIME · 时空运动的本体等效与观察者记忆舒尔补强行分类 · the Schur split of one arc by a memory window
   (Chapter 38, §38.12)
   World (kit.solid): z up. The violet ball stands for the ternion sphere 𝕋₃ ≅ S³(1); one great arc Γ lies on it, with no
   label of time or space. At the point C of Γ the observer holds a memory window W, another great circle through C at
   the angle φ to Γ. In the tangent plane at C the budget d of Γ (length 1) splits into P_W d (cyan, inside the window)
   and (I − P_W) d (magenta, outside): cos²φ + sin²φ = 1.
     split    the window turns about C; the foot of P_W d runs on the Thales circle of d; squares on the legs
     minus    the same ledger transposed: Δτ² = Δt² − Δx² as an L-shaped gnomon, the hyperbola beside the ball, and a
              horizon load gauge (MODEL)
     regimes  eight orthogonal modes with weights (9 − k)/36; a capacity M keeps the first M inside the window
     dual     two windows W_A and W_B = R(σ) W_A, a rational Cayley rotor, on the same arc
     forget   twelve beats along Γ; a first-in-first-out window keeps M anchors and turns the oldest out by 90°
   The rail is u = tan(φ/2) on a grid of 1/60, M, σ on the same grid, or the beat. Every stop of u and σ is a rational
   point of the circle, cos φ = (1 − u²)/(1 + u²), sin φ = 2u/(1 + u²). Fractions are pairs of big integers [p, q], q > 0.
   A number is printed after “=” only when the printed decimal is the value, decided on fractions, and after “≈” when it
   rounds it. Read-only probe: window.SPACETIME_DEBUG. */
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
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
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
     of them. An inequality of the page stands between exact expressions; the value follows it in a parenthesis of its own. */
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
  /** An exact inequality, then its value in a parenthesis of its own. */
  const valued = (law, r, say = L) => law + say(`（值 ${r}）`, ` (value ${r})`);
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

  /* ---------- the exact core ---------- */
  /** u and σ run on the grid k/GRID. */
  const GRID = 60;
  /** The value of a rail, freed from the rounding of its own steps. */
  function settled(v) {
    const back = Math.round(v);
    return abs(v - back) < 1e-9 ? back : v;
  }
  /** The rational point of the quarter circle at u = k/GRID (k a whole number of the grid), or its double between stops. */
  function splitAt(t) {
    const k = settled(t);
    if (Number.isInteger(k)) {
      const G = BigInt(GRID),
        K = BigInt(k),
        den = G * G + K * K,
        a = G * G - K * K,
        b = 2n * G * K,
        cos = frac(a, den),
        sin = frac(b, den),
        g = gcdB(a, b) || 1n;
      return {
        k,
        exact: true,
        u: num(frac(K, G)),
        cos: num(cos),
        sin: num(sin),
        kt: num(times(cos, cos)),
        ks: num(times(sin, sin)),
        sum: num(plus(times(cos, cos), times(sin, sin))),
        slope: [Number(b / g), Number(a / g)],
        phi: Math.atan2(fval(sin), fval(cos)),
        cosh: a > 0n ? num(frac(den, a)) : null,
        sinh: a > 0n ? num(frac(b, a)) : null
      };
    }
    const u = k / GRID,
      c = (1 - u * u) / (1 + u * u),
      s = (2 * u) / (1 + u * u);
    // between stops the shares are doubles, but their sum is the identity cos²φ + sin²φ = 1 itself
    return { k, exact: false, u: flo(u), cos: flo(c), sin: flo(s), kt: flo(c * c), ks: flo(s * s), sum: { q: ONE, x: c * c + s * s }, slope: null, phi: Math.atan2(s, c), cosh: c > 1e-12 ? flo(1 / c) : null, sinh: c > 1e-12 ? flo(s / c) : null };
  }
  /** cosh² r − sinh² r of a split, exactly where the split is exact. */
  const hyperbola = (s) => (!s.cosh ? null : s.exact ? num(minus(times(s.cosh.q, s.cosh.q), times(s.sinh.q, s.sinh.q))) : flo(s.cosh.x * s.cosh.x - s.sinh.x * s.sinh.x));
  /** The eight orthogonal modes of the carrier and their weights w_k = (9 − k)/36, k = 1 … 8. */
  const MODES = 8;
  const WEIGHTS = range(MODES).map((i) => frac(BigInt(MODES - i), 36n));
  const partial = (M) => WEIGHTS.slice(0, M).reduce(plus, ZERO);
  function regimeAt(t) {
    const v = settled(t);
    if (Number.isInteger(v)) {
      const kt = partial(v),
        root = rootQ(kt);
      return { M: v, exact: true, kt: num(kt), ks: num(minus(ONE, kt)), cos: root ? num(root) : flo(Math.sqrt(fval(kt))), sin: rootQ(minus(ONE, kt)) ? num(rootQ(minus(ONE, kt))) : flo(Math.sqrt(1 - fval(kt))), regime: v === 0 ? 'photon' : v === MODES ? 'whole' : 'finite' };
    }
    const M = Math.floor(v),
      x = fval(partial(M)) + (v - M) * fval(WEIGHTS[M]);
    return { M: v, exact: false, kt: flo(x), ks: flo(1 - x), cos: flo(Math.sqrt(x)), sin: flo(Math.sqrt(1 - x)), regime: 'moving' };
  }
  /** Two windows: W_A orthogonal to the arc, W_B = R(σ) W_A with σ = k/GRID; the turn α has cos α, sin α of the grid. */
  function dualAt(t) {
    const s = splitAt(t),
      G = BigInt(GRID),
      K = s.exact ? BigInt(s.k) : 0n,
      g = s.exact ? gcdB(G, K) || 1n : 1n;
    return {
      k: s.k,
      exact: s.exact,
      sigma: s.u,
      cosA: s.cos,
      sinA: s.sin,
      alpha: s.phi,
      aTime: num(ZERO),
      aSpace: num(ONE),
      bTime: s.ks,
      bSpace: s.kt,
      sumA: num(ONE),
      sumB: s.sum,
      rotor: s.exact ? [Number(G / g), Number(K / g), 0, 0] : null,
      matrix: s.exact ? [[ONE, ZERO, ZERO], [ZERO, s.cos.q, minus(ZERO, s.sin.q)], [ZERO, s.sin.q, s.cos.q]] : null
    };
  }
  const BEATS = 12,
    BUDGET = 8;
  /** A first-in-first-out window of capacity M after the rail value t of beats. */
  function forgetAt(t, M) {
    const v = settled(t),
      n = Math.floor(v + 1e-9),
      f = v - n < 1e-9 ? 0 : v - n;
    return { t: v, n, f, M, kept: Math.min(n, M), lost: Math.max(0, n - M), seq: M, ch: BUDGET - M, K: BUDGET };
  }
  /** The horizon load η = e/20 (MODEL): what the window retains, and the composite clock √((1 − η) κ_time). */
  function loadAt(e, s) {
    const eta = frac(BigInt(e), 20n),
      keep = minus(ONE, eta),
      prod = s.exact ? times(keep, s.kt.q) : null,
      root = prod ? rootQ(prod) : null;
    return { e, eta: num(eta), keep: num(keep), theta: Math.asin(Math.sqrt(fval(eta))), clock: root ? num(root) : flo(Math.sqrt(fval(keep) * s.kt.x)), clock2: prod ? num(prod) : flo(fval(keep) * s.kt.x) };
  }

  /* ---------- the state: one rail value per card ---------- */
  const SCENES = ['split', 'minus', 'regimes', 'dual', 'forget'];
  // the rail of a card: its length, its speed (units per second), its keyboard step, and whether it rests on whole stops
  const RAILS = {
    split: { max: GRID, rate: 14, step: 1, whole: true },
    minus: { max: 40, rate: 12, step: 1, whole: true },
    regimes: { max: MODES, rate: 2, step: 1, whole: true },
    dual: { max: GRID, rate: 20, step: 1, whole: true },
    forget: { max: BEATS, rate: 2.4, step: 1, whole: false }
  };
  const STILL = { split: 20, minus: 30, regimes: 4, dual: GRID, forget: BEATS };
  const FRESH = { load: false, eta: 10, kseq: 4 };
  const state = { scene: 'split', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  /** The landmarks [p:q] = [Δx:Δτ] of the slope chips and the stop of the grid that gives each. */
  const SLOPES = { '0:1': 0, '3:4': 20, '5:12': 12, '8:15': 15, '1:0': GRID };
  function compute(s) {
    const mi = splitAt(s.at.minus);
    return {
      split: splitAt(s.at.split),
      minus: { ...mi, hyp: hyperbola(mi) },
      regimes: regimeAt(s.at.regimes),
      dual: dualAt(s.at.dual),
      forget: forgetAt(s.at.forget, s.kseq),
      load: { ...loadAt(s.eta, mi), on: s.load }
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
  const cams = { panorama: [-0.42, 0.36, 1], face: [-0.62, 0.16, 1], under: [-0.22, -0.3, 1] };
  const PRESETS = {
    'isotropic-arc-memory-schur-split': { scene: 'split', cam: 'panorama', play: true, still: STILL.split },
    'minkowski-minus-from-pythagorean-budget': { scene: 'minus', cam: 'panorama', play: true, still: STILL.minus, load: true },
    'memory-capacity-three-regime-phase': { scene: 'regimes', cam: 'panorama', play: true, still: STILL.regimes },
    'dual-observer-simultaneity-rotor-tilt': { scene: 'dual', cam: 'panorama', play: true, still: STILL.dual },
    'forgetting-generates-space-and-kv-cache': { scene: 'forget', cam: 'panorama', play: true, still: STILL.forget }
  };
  const DEFAULT = 'isotropic-arc-memory-schur-split';

  /* ---------- the stage: world-fixed geometry, chosen once from the panorama view ---------- */
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
  const LIFT = 1.014;
  /* C: the point of Γ where the window turns, ALPHA away from the line of sight towards the upper right. A great circle
     through C looks open in the measure of the sine of the angle between its tangent at C and the tangent TX that points
     along the line of sight; Γ runs at PSI to TX and the window sweeps from PSI to PSI + 90°, so that every window and the
     arc stay open ellipses, while the tangent plane at C is foreshortened by cos ALPHA only. */
  const ALPHA = (36 * PI) / 180,
    CHI = (-35 * PI) / 180,
    PSI = (50 * PI) / 180;
  const X0 = unit(add(scale(B0.R, cs(CHI)), scale(B0.U, sn(CHI)))),
    Y0 = unit(add(scale(B0.R, sn(CHI)), scale(B0.U, -cs(CHI)))),
    C = add(scale(B0.D, cs(ALPHA)), scale(X0, sn(ALPHA))),
    TX = add(scale(B0.D, -sn(ALPHA)), scale(X0, cs(ALPHA)));
  /** The tangent of Γ at C (to the right and down) and the tangent across it (down). */
  const E1 = add(scale(TX, cs(PSI)), scale(Y0, sn(PSI))),
    E2 = add(scale(TX, -sn(PSI)), scale(Y0, cs(PSI)));
  /** The great circle of Γ: γ(θ) = cos θ C + sin θ E1. */
  const gamma = (th, r = LIFT) => scale(add(scale(C, cs(th)), scale(E1, sn(th))), r);
  /** The small true tangent figure at C on the ball: x along Γ, y across, in world units. */
  const TSMALL = 0.3,
    TLIFT = 0.012;
  const tp = (x, y) => add(scale(C, 1 + TLIFT), add(scale(E1, TSMALL * x), scale(E2, TSMALL * y)));
  /** The window direction at the angle φ from Γ, in the tangent plane at C. */
  const wdir = (phi) => add(scale(E1, cs(phi)), scale(E2, sn(phi)));
  /* the ledger: the tangent plane at C enlarged on a panel that faces the camera (a MODEL drawing). Local x runs along d
     from 0 to 1, y across it towards the side of the window. On a wide stage the panel stands to the upper right of the
     ball, on a narrow one below it. */
  const UP = [-0.12, 1.32],
    DOWN = [-1.1, 0.62];
  const FRAMES = {
    wide: {
      ledger: { c: [1.4, 0.6], h: 0.86, oy: 0.6 },
      minus: { c: [1.7, -0.5], h: 0.64, oy: -0.24 },
      panel: { c: [1.74, 0.96], s: 0.3 },
      dial: { c: [-1.3, -0.9], r: 0.24 }
    },
    narrow: {
      ledger: { c: [0.12, -1.5], h: 0.8, oy: 0.6 },
      minus: { c: [0.58, -1.66], h: 0.52, oy: -0.24 },
      panel: { c: [-0.62, -1.62], s: 0.27 },
      dial: { c: [1.22, 0.92], r: 0.22 }
    }
  };
  const frames = () => FRAMES[small() ? 'narrow' : 'wide'];
  const frameOf = (k) => (k === 'minus' ? frames().minus : frames().ledger);
  /** The frame of the ledger in this frame of the animation (the weights of the cards blend it). */
  let LED = FRAMES.wide.ledger;
  /** A point (x, y) of the ledger panel. */
  const lp = (x, y, F = LED) => seen(F.c[0] + F.h * (x - 0.5), F.c[1] + F.h * (y - F.oy), 0.6);
  const footXY = (phi) => [cs(phi) * cs(phi), cs(phi) * sn(phi)];
  /** The foot of P_W d on the panel. */
  const foot = (phi, F = LED) => lp(...footXY(phi), F);
  /* the beats of the last card: twelve anchors along Γ, each the last turned by b = (99 + 20i)/101 */
  const BEAT = Math.atan2(20, 99);
  const anchor = (n, r = LIFT) => gamma((n - 9) * BEAT, r);
  /* the arch of the eight modes (and of the eight slots of the budget) round the left and the top of the ball */
  const ARCH_R = 1.3;
  const archAngle = (v) => ((206 - (120 * v) / MODES) * PI) / 180;
  const archPoint = (v, r = ARCH_R) => add(add(scale(B0.R, r * cs(archAngle(v))), scale(B0.U, r * sn(archAngle(v)))), scale(B0.D, 0.18));
  const archNormal = (v) => unit(add(scale(B0.R, cs(archAngle(v))), scale(B0.U, sn(archAngle(v)))));
  /* the flat panel of the hyperbola and the dial of the horizon load (they face the camera) */
  const HX = [-0.3, 2.6],
    HT = [0, 2.8];
  /** A point (x = sinh r, t = cosh r) of the panel of the hyperbola. */
  const panelPoint = (x, t) => {
    const { c, s } = frames().panel;
    return seen(c[0] + s * (x - 1.15), c[1] + s * (t - 1.4), 0.6);
  };
  const dialPoint = (ang, k = 1) => {
    const { c, r } = frames().dial;
    return seen(c[0] + k * r * sn(ang), c[1] + k * r * cs(ang), 0.6);
  };

  /** The world point of the amber mark for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'minus': {
        const u = v / GRID;
        return panelPoint((2 * u) / (1 - u * u), (1 + u * u) / (1 - u * u));
      }
      case 'regimes':
        return archPoint(v, ARCH_R + 0.03);
      case 'dual':
        return foot(PI / 2 - 2 * Math.atan(v / GRID));
      case 'forget':
        return anchor(v, LIFT + 0.01);
      default:
        return foot(2 * Math.atan(v / GRID));
    }
  }
  /** Fit what the cards draw, between the title and the legend. */
  const BALL = [-1.03, 1.03, -1.03, 1.03];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const grow = ([x0, x1, y0, y1], l, r, b, t) => [x0 - l, x1 + r, y0 - b, y1 + t];
  /** The corners of the plate of the ledger. */
  const plate = (F, [y0, y1]) => [lp(-0.62, y0, F), lp(1.62, y0, F), lp(1.62, y1, F), lp(-0.62, y1, F)];
  /** The arch with its cells: the pillars of the modes stand out by up to 0.55, the slots of the budget by 0.3. */
  const ARCH = (top) => range(MODES + 1).flatMap((k) => [archPoint(k, ARCH_R + top), archPoint(k, ARCH_R - 0.06)]);
  const SIDE = {
    split: () => grow(around(plate(frameOf('split'), UP)), 0.03, 0.03, 0.03, 0.03),
    minus: () => grow(around([...plate(frameOf('minus'), DOWN), panelPoint(HX[0], HT[0]), panelPoint(HX[1], HT[1]), dialPoint(0, 1.6), dialPoint(PI, 1.4), dialPoint(-PI / 2, 1.3), dialPoint(PI / 2, 1.8)]), 0.03, 0.03, 0.03, 0.03),
    regimes: () => grow(around([...plate(frameOf('regimes'), UP), ...ARCH(0.62)]), 0.03, 0.03, 0.03, 0.03),
    dual: () => grow(around(plate(frameOf('dual'), UP)), 0.03, 0.03, 0.03, 0.03),
    forget: () => grow(around([...range(BEATS + 1).flatMap((n) => [anchor(n), anchor(n, LIFT + 0.4)]), ...ARCH(0.34)]), 0.02, 0.02, 0.02, 0.02)
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
    // under a drag the picture holds still: a HUD line that wraps anew must not move the point under the pointer
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
  const solid = (key, mesh, color, alpha = 1, edges = P.ink) => alpha > 0.01 && sc.poly(alpha < 0.99 ? key + '~' : key, mesh, { color, alpha, edges, pick: false, occlude: false });
  /* the weights of the two readings in the two lenses: the ontology lens is even, the observer lens brightens the split */
  const weight = () => (state.lens ? { arc: 0.8, part: 1 } : { arc: 1, part: 0.9 });
  function drawBall(w) {
    // brighter towards the top, darker below; no axis is drawn on it
    const at = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface('ball', at, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.55, 2.4], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.22 } });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03, rim: 0.4 });
    if (w.forget > 0.01) sc.glass('shell~', [0, 0, 0], 1.4, { color: P.violet, alpha: 0.02 * w.forget, rim: 0.3 * w.forget });
  }
  /** The arc Γ: one violet tube on the ball, the same on every card. */
  function drawArc(a, long) {
    if (a < 0.01) return;
    const { arc } = weight(),
      [from, to] = long ? [-9.6 * BEAT, 3.6 * BEAT] : [-1.2, 0.7];
    tube(long ? 'arcLong' : 'arc', sample(60, (t) => gamma(lerp(from, to, t))), P.violet, 0.022, arc * a, 0.45);
    if (!long) sc.bead(C, { color: P.violet, r: 4.4, alpha: a, key: 'C' });
    else sc.bead(anchor(0), { color: P.violet, r: 4, alpha: a, key: 'start' });
  }
  /** The ledger of a window at the angle φ: on the ball the window circle and the true tangent figure at C; on the panel
      d, P_W d and (I − P_W) d, the Thales circle, the line of W⊥ and the squares on the legs. */
  function drawLedger(phi, a, o = {}) {
    if (a < 0.01) return;
    const { part } = weight(),
      c0 = cs(phi),
      s0 = sn(phi),
      cyanA = (o.dashed ? 0.75 : 1) * a * part;
    // on the ball: the window, a great circle through C, and the small true figure in the tangent plane at C
    sc.circle([0, 0, 0], cross(C, wdir(phi)), LIFT, { color: P.cyan, width: o.dashed ? 1.4 : 2, alpha: (o.dashed ? 0.75 : 0.95) * a, back: 0.2, dash: o.dashed ? [5, 4] : null });
    if (!o.bare) {
      sc.line([tp(0, 0), tp(1, 0)], { color: P.violet, width: 2.6, alpha: a });
      if (c0 > 1e-6) sc.line([tp(0, 0), tp(c0 * c0, c0 * s0)], { color: P.cyan, width: 2.6, alpha: cyanA });
      if (s0 > 1e-6) sc.line([tp(c0 * c0, c0 * s0), tp(1, 0)], { color: P.magenta, width: 2.6, alpha: a * part });
    }
    // the panel
    const O = lp(0, 0),
      T = lp(1, 0),
      [fx, fy] = footXY(phi),
      F = lp(fx, fy),
      W = (t) => lp(t * c0, t * s0),
      Wp = (t) => lp(-t * s0, t * c0);
    sc.line([W(-0.16), W(1.16)], { color: P.cyan, width: 1.3, dash: o.dashed ? [5, 4] : [9, 4], alpha: (o.dashed ? 0.75 : 0.8) * a });
    if (!o.bare) sc.line([Wp(-0.2), Wp(0.5)], { color: P.magenta, width: 1.1, dash: [3, 4], alpha: 0.6 * a });
    if (o.bare) return;
    sc.line(sample(48, (t) => lp(0.5 + 0.5 * cs(PI * t), 0.5 * sn(PI * t))), { color: P.ink, width: 1, dash: [3, 5], alpha: 0.55 * a });
    sc.arrow(O, T, { color: P.violet, width: 3.2, headSize: 12, alpha: a });
    if (o.legs === false) return;
    if (c0 > 1e-6) sc.arrow(O, F, { color: P.cyan, width: 3.4, headSize: 11, alpha: cyanA });
    if (s0 > 1e-6) sc.line([F, T], { color: P.magenta, width: 3.4, alpha: a * part });
    // the right angle at the foot
    if (c0 > 0.1 && s0 > 0.1) {
      const k = 0.06;
      sc.line([lp(fx - k * c0, fy - k * s0), lp(fx - k * c0 + k * s0, fy - k * s0 - k * c0), lp(fx + k * s0, fy - k * c0)], { color: P.ink, width: 1, alpha: 0.75 * a });
    }
    if (o.squares === false) return;
    // squares on the legs: cyan on P_W d (away from the tip of d), magenta on (I − P_W) d (away from C)
    if (c0 > 1e-6) sc.fan([O, F, lp(fx - c0 * s0, fy + c0 * c0), lp(-c0 * s0, c0 * c0)], { fill: P.cyan, alpha: 0.2 * a * part, color: P.cyan, strokeAlpha: 0.6 * a });
    if (s0 > 1e-6) sc.fan([F, T, lp(1 + s0 * c0, s0 * s0), lp(fx + s0 * c0, fy + s0 * s0)], { fill: P.magenta, alpha: 0.2 * a * part, color: P.magenta, strokeAlpha: 0.6 * a });
  }
  /** The plate of the ledger, and the dashed leader from C to it: the panel is the tangent plane at C, enlarged. */
  function drawPlate(a, ys) {
    if (a < 0.01) return;
    sc.fan(plate(LED, ys), { fill: P.stage, alpha: 0.42 * a, color: P.ink, strokeAlpha: 0.28 * a });
    sc.line([scale(C, 1 + TLIFT), lp(0, 0)], { color: P.ink, width: 1, dash: [2, 4], alpha: 0.5 * a });
  }
  /** The square on d with the magenta square of Δx² in its far corner and the cyan gnomon Δt² − Δx² = Δτ². */
  function drawGnomon(phi, a) {
    if (a < 0.01) return;
    const s = sn(phi),
      Q = (x, y) => lp(x, -y);
    sc.fan([Q(0, 0), Q(1, 0), Q(1, 1), Q(0, 1)], { color: P.violet, width: 1.6, strokeAlpha: 0.9 * a });
    if (s > 1e-6) sc.fan([Q(1 - s, 1 - s), Q(1, 1 - s), Q(1, 1), Q(1 - s, 1)], { fill: P.magenta, alpha: 0.34 * a, color: P.magenta, strokeAlpha: 0.85 * a });
    if (s < 1 - 1e-6) {
      const g = [Q(0, 0), Q(1, 0), Q(1, 1 - s), Q(1 - s, 1 - s), Q(1 - s, 1), Q(0, 1)];
      sc.fan([g[0], g[1], g[2], Q(0, 1 - s)], { fill: P.cyan, alpha: 0.28 * a });
      sc.fan([Q(0, 1 - s), g[3], g[4], g[5]], { fill: P.cyan, alpha: 0.28 * a });
      sc.line([...g, g[0]], { color: P.cyan, width: 1.4, alpha: 0.85 * a });
    }
  }
  function drawSplit(m, a) {
    if (a < 0.01) return;
    drawLedger(m.split.phi, a);
  }
  function drawMinus(m, a) {
    if (a < 0.01) return;
    const s = m.minus,
      { part } = weight();
    drawLedger(s.phi, a, { squares: false });
    drawGnomon(s.phi, a);
    // the panel: the light cone, the hyperbola t² − x² = 1 and the point (sinh r, cosh r)
    const corners = [panelPoint(HX[0], HT[0]), panelPoint(HX[1], HT[0]), panelPoint(HX[1], HT[1]), panelPoint(HX[0], HT[1])];
    sc.fan(corners, { fill: P.stage, alpha: 0.5 * a, color: P.ink, strokeAlpha: 0.3 * a });
    sc.line([panelPoint(0, HT[0]), panelPoint(0, HT[1])], { color: P.ink, width: 1, alpha: 0.6 * a });
    sc.line([panelPoint(HX[0], 0.02), panelPoint(HX[1], 0.02)], { color: P.ink, width: 1, alpha: 0.6 * a });
    sc.line([panelPoint(0, 0), panelPoint(HX[1], HX[1])], { color: P.ink, width: 1, dash: [4, 4], alpha: 0.6 * a });
    const top = Math.asinh(HX[1]);
    sc.line(sample(60, (t) => panelPoint(Math.sinh(top * t), Math.cosh(top * t))), { color: P.cyan, width: 2.4, alpha: a * part });
    if (s.cosh && s.sinh.x <= HX[1] && s.cosh.x <= HT[1]) {
      const x = s.sinh.x,
        t = s.cosh.x;
      sc.line([panelPoint(0, t), panelPoint(x, t)], { color: P.magenta, width: 2, alpha: a });
      sc.line([panelPoint(x, 0.02), panelPoint(x, t)], { color: P.violet, width: 2, dash: [4, 3], alpha: a });
    }
    // the horizon load gauge (MODEL): a record of the archive turns from the window (up) to W⊥ (right) as η grows
    const L0 = m.load,
      on = L0.on ? 1 : 0.3,
      th = L0.theta,
      tipD = dialPoint(th, 1);
    sc.line(sample(30, (t) => dialPoint((PI / 2) * t)), { color: P.ink, width: 1, dash: [3, 4], alpha: 0.7 * a * on });
    sc.line([dialPoint(0, 0), dialPoint(0, 1.1)], { color: P.cyan, width: 1.2, alpha: 0.7 * a * on });
    sc.line([dialPoint(0, 0), dialPoint(PI / 2, 1.1)], { color: P.magenta, width: 1.2, alpha: 0.7 * a * on });
    sc.line([dialPoint(PI / 4, 0.9), dialPoint(PI / 4, 1.14)], { color: P.ink, width: 1.6, alpha: 0.9 * a * on });
    sc.arrow(dialPoint(0, 0), tipD, { color: P.ink, width: 2.2, headSize: 9, alpha: a * on });
    sc.line([dialPoint(0, 0), dialPoint(0, cs(th))], { color: P.cyan, width: 3, alpha: a * on });
    sc.line([dialPoint(0, cs(th)), tipD], { color: P.magenta, width: 3, dash: [3, 3], alpha: a * on });
  }
  /** A box on the arch at the cell v (from v − 1/2 to v + 1/2 of the arch), standing out by h. */
  function cell(v, h) {
    const n = archNormal(v),
      t = unit(sub(archPoint(v + 0.3), archPoint(v - 0.3))),
      d = unit(cross(n, t)),
      base = archPoint(v),
      corner = (x, y, z) => add(base, add(scale(t, x * 0.07), add(scale(d, y * 0.07), scale(n, z))));
    const s = 0.9;
    return {
      vertices: [corner(-s, -1, 0), corner(s, -1, 0), corner(s, 1, 0), corner(-s, 1, 0), corner(-s, -1, h), corner(s, -1, h), corner(s, 1, h), corner(-s, 1, h)],
      faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]]
    };
  }
  /** The arch of eight cells: inside the window (cyan) up to `fill`, outside (magenta) after; heights by the weights. */
  function drawArch(key, fill, a, equal) {
    if (a < 0.01) return;
    const { part } = weight();
    sc.line(sample(60, (t) => archPoint(MODES * t, ARCH_R - 0.02)), { color: P.violet, width: 1.2, alpha: 0.6 * a });
    for (let k = 1; k <= MODES; k++) {
      const h = equal ? 0.3 : 0.06 + 2.2 * fval(WEIGHTS[k - 1]),
        share = clamp(fill - (k - 1), 0, 1),
        inside = share >= 1 - 1e-9;
      solid(`${key}${k}`, cell(k - 0.5, h), inside ? P.cyan : share > 1e-9 ? P.violet : P.magenta, a * (inside ? part : share > 1e-9 ? 0.8 : 0.85 * part));
    }
  }
  function drawRegimes(m, a) {
    if (a < 0.01) return;
    const r = m.regimes,
      phi = Math.acos(clamp(r.cos.x, 0, 1));
    drawLedger(phi, a);
    drawArch('mode', r.M, a, false);
  }
  function drawDual(m, a) {
    if (a < 0.01) return;
    const d = m.dual,
      { part } = weight(),
      phiB = PI / 2 - d.alpha;
    // A: the window across the arc, which reads d as outside only; B: the window turned by R(σ)
    drawLedger(PI / 2, 0.8 * a, { dashed: true, bare: true });
    drawLedger(phiB, a, { squares: false });
    sc.line([lp(0, -0.07), lp(1, -0.07)], { color: P.magenta, width: 2.4, dash: [6, 4], alpha: 0.85 * a * part });
    sc.bead(lp(0, 0), { color: P.cyan, r: 4, alpha: 0.85 * a, key: 'footA' });
    // the rotor: a violet arc from W_A to W_B, on the panel and small at C on the ball
    if (d.alpha > 0.02) {
      const arc = sample(30, (t) => lp(0.3 * cs(PI / 2 - d.alpha * t), 0.3 * sn(PI / 2 - d.alpha * t)));
      sc.line(arc, { color: P.violet, width: 2.4, alpha: a });
      sc.arrow(arc[arc.length - 5], arc[arc.length - 1], { color: P.violet, width: 2.4, headSize: 10, alpha: a });
      tube('rotor', sample(24, (t) => tp(0.55 * cs(PI / 2 - d.alpha * t), 0.55 * sn(PI / 2 - d.alpha * t))), P.violet, 0.008, a, 0.5);
    }
  }
  function drawForget(m, a) {
    if (a < 0.01) return;
    const f = m.forget,
      { part } = weight(),
      first = f.n - f.M + 1;
    // the anchors: not yet (faint violet), inside the window (cyan), forgotten (magenta, turned out by 90°)
    for (let j = 1; j <= BEATS; j++) {
      const p = anchor(j),
        turned = j < first,
        swing = j === first && f.f > 0 && first >= 1 ? f.f : 0;
      if (j > f.n + (f.f > 0 ? 1 : 0)) sc.bead(p, { color: P.violet, r: 2.6, alpha: 0.6 * a, key: 'later' + j });
      else if (turned) {
        tube('lost' + j, [anchor(j, LIFT + 0.004), anchor(j, LIFT + 0.36)], P.magenta, 0.012, a * part, 0.4);
        sc.bead(anchor(j, LIFT + 0.36), { color: P.magenta, r: 4.2, alpha: a * part, key: 'lost' + j });
      } else {
        sc.bead(p, { color: P.cyan, r: j === f.n ? 3.2 : 4.6, alpha: (j === f.n + 1 ? f.f : 1) * a * part, key: 'kept' + j });
        if (swing > 0) {
          // the oldest record of the window turns from along the arc to straight out, as the next beat comes in
          const along = unit(sub(anchor(j + 0.5), anchor(j - 0.5))),
            out = unit(anchor(j)),
            dir = add(scale(along, cs((PI / 2) * swing)), scale(out, sn((PI / 2) * swing)));
          sc.arrow(anchor(j, LIFT + 0.004), add(anchor(j, LIFT + 0.004), scale(dir, 0.34)), { color: P.magenta, width: 2.2, headSize: 8, alpha: a * part });
        }
      }
    }
    // the window: a cyan tube along the kept anchors
    const lo = Math.max(1, first),
      hi = f.n + f.f;
    if (hi > lo + 1e-6) tube('window', sample(30, (t) => anchor(lerp(lo, hi, t), LIFT + 0.006)), P.cyan, 0.02, a * part, 0.5);
    drawArch('slot', f.seq, a, true);
  }

  /* ---------- words ---------- */
  const SCENE_NAME = {
    split: [['舒尔二分', 'SCHUR SPLIT'], ['记忆分类（MODEL）', 'MEMORY CLASSES (MODEL)']],
    minus: [['勾股账本移项', 'LEDGER TRANSPOSED'], ['闵氏减号（MODEL）', 'MINKOWSKI MINUS (MODEL)']],
    regimes: [['八个正交模', 'EIGHT ORTHOGONAL MODES'], ['三态与静质量税（MODEL）', 'THREE REGIMES (MODEL)']],
    dual: [['两个记忆窗', 'TWO MEMORY WINDOWS'], ['同时性的相对性（MODEL）', 'RELATIVE SIMULTANEITY (MODEL)']],
    forget: [['先进先出窗口', 'FIRST IN, FIRST OUT'], ['遗忘生空与 KV 缓存（MODEL）', 'FORGETTING & KV-CACHE (MODEL)']]
  };
  const LENS_NAME = [
    ['本体读法', 'ONTOLOGY'],
    ['观察者读法 (MODEL)', 'OBSERVER (MODEL)']
  ];
  const slopeText = (s) => (s.slope ? `[${s.slope[0]}:${s.slope[1]}]` : `u ${rel(null, s.u.x)}`);
  const angleText = (x) => {
    const deg = (x * 180) / PI;
    return abs(deg - Math.round(deg)) < 1e-9 ? `${Math.round(deg)}°` : `≈ ${kit.fix(deg, 2)}°`;
  };
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read this one value. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'split':
      case 'minus': {
        const s = m[state.scene];
        return !s.exact ? 'moving' : s.k === 0 ? 'time' : s.k === GRID ? 'space' : 'mixed';
      }
      case 'regimes':
        return m.regimes.regime;
      case 'dual':
        return !m.dual.exact ? 'moving' : m.dual.k === 0 ? 'same' : m.dual.k === GRID ? 'swapped' : 'turned';
      default:
        return m.forget.f > 0 ? 'moving' : m.forget.lost > 0 ? 'forgetting' : 'filling';
    }
  }
  const sub2 = (x) => `<sub>${x}</sub>`;
  /** “name = value” at a whole stop of the rail, “name ≈ x.xx” between stops. */
  const named = (name, exact, value, x) => (exact ? `${name} = ${value}` : `${name} ${rel(null, x, 2)}`);
  const PW = `P${sub2('W')}`;
  function subline(m) {
    const s = state.scene,
      tiny = compact();
    if (s === 'split') {
      const p = m.split;
      if (state.lens)
        return tiny
          ? L(`Δτ/Δt ${is(p.cos)}，Δx/Δt ${is(p.sin)}（MODEL）。`, `Δτ/Δt ${is(p.cos)}, Δx/Δt ${is(p.sin)} (MODEL).`)
          : L(`同一分解读作时间与空间（MODEL）：Δτ/Δt ${is(p.cos)}，Δx/Δt ${is(p.sin)}，Δτ² + Δx² = Δt² = 1。`, `The same split read as time and space (MODEL): Δτ/Δt ${is(p.cos)}, Δx/Δt ${is(p.sin)}, Δτ² + Δx² = Δt² = 1.`);
      return tiny
        ? L(`${slopeText(p)}：${both(p.kt)} + ${short(p.ks)} = 1。`, `${slopeText(p)}: ${both(p.kt)} + ${short(p.ks)} = 1.`)
        : L(`${p.exact ? `u = ${fstr(p.u.q)}，${slopeText(p)}` : `u ${is(p.u)}`}：窗内 ${PW}d ${is(p.cos)}，窗外 (I − ${PW})d ${is(p.sin)}；${both(p.kt)} 加 ${both(p.ks)}，和 ${say(p.sum)}。`, `${p.exact ? `u = ${fstr(p.u.q)}, ${slopeText(p)}` : `u ${is(p.u)}`}: inside ${PW}d ${is(p.cos)}, outside (I − ${PW})d ${is(p.sin)}; ${both(p.kt)} plus ${both(p.ks)}, sum ${say(p.sum)}.`);
    }
    if (s === 'minus') {
      const p = m.minus,
        ld = m.load;
      const gauge = ld.on ? L(`视界负载 η ${is(ld.eta)}：合成钟速 ${both(ld.clock)}（MODEL）。`, `Horizon load η ${is(ld.eta)}: composite clock ${both(ld.clock)} (MODEL).`) : '';
      if (!p.cosh) return L('u = 1：Δτ = 0，没有双曲线上的点。', 'u = 1: Δτ = 0, no point on the hyperbola.');
      if (state.lens)
        return tiny
          ? L(`cosh r ${is(p.cosh)}，sinh r ${is(p.sinh)}，差的平方 ${say(p.hyp)}。`, `cosh r ${is(p.cosh)}, sinh r ${is(p.sinh)}, difference of squares ${say(p.hyp)}.`)
          : L(`快度读法（MODEL）：cosh r ${is(p.cosh)}，sinh r ${is(p.sinh)}，cosh² r − sinh² r ${say(p.hyp)}。${gauge}`, `Rapidity reading (MODEL): cosh r ${is(p.cosh)}, sinh r ${is(p.sinh)}, cosh² r − sinh² r ${say(p.hyp)}. ${gauge}`);
      return tiny
        ? L(`Δτ² = 1 − ${short(p.ks)} ${is(p.kt)}。`, `Δτ² = 1 − ${short(p.ks)} ${is(p.kt)}.`)
        : L(`u ${is(p.u)}：Δt² − Δx² = 1 − ${short(p.ks)} ${is(p.kt)} = Δτ²，曲尺形的面积就是窗内的份额。${gauge}`, `u ${is(p.u)}: Δt² − Δx² = 1 − ${short(p.ks)} ${is(p.kt)} = Δτ², the area of the L-shaped gnomon is the share inside. ${gauge}`);
    }
    if (s === 'regimes') {
      const r = m.regimes,
        Mnamed = named('M', r.exact, r.M, r.M);
      if (state.lens) {
        const what = { photon: L('光子：Δτ = 0，静质量税为 0', 'photon: Δτ = 0, no rest-mass tax'), whole: L('整体：窗外什么也不剩', 'the whole: nothing is left outside'), finite: L('有限的有质量观察者', 'a finite massive observer'), moving: L('正在填入下一个模', 'filling the next mode') }[r.regime];
        return tiny ? L(`${Mnamed}：${what}（MODEL）。`, `${Mnamed}: ${what} (MODEL).`) : L(`${Mnamed}：${what}（MODEL）；Δτ/Δt ${say(r.cos)}，静质量税 m₀/E 读作 Δτ/Δt。`, `${Mnamed}: ${what} (MODEL); Δτ/Δt ${say(r.cos)}, the rest-mass tax m₀/E read as Δτ/Δt.`);
      }
      return tiny
        ? L(`${Mnamed}：窗内 ${both(r.kt)}。`, `${Mnamed}: inside ${both(r.kt)}.`)
        : L(`${Mnamed}：前 ${Math.floor(r.M)} 个模在窗内，份额 ${both(r.kt)}；窗外 ${both(r.ks)}。`, `${Mnamed}: the first ${Math.floor(r.M)} modes inside, share ${both(r.kt)}; outside ${both(r.ks)}.`);
    }
    if (s === 'dual') {
      const d = m.dual;
      if (state.lens)
        return tiny ? L('A 读作同时的空间，B 读作先后的时间（MODEL）。', 'A reads simultaneous space, B sequential time (MODEL).') : L(`同一条弧（MODEL）：A 的窗内份额 0，读作同时的空间；B 的窗内份额 ${short(d.bTime)}，σ = 1 时读作纯粹先后的时间。`, `One arc (MODEL): A has share 0 inside and reads simultaneous space; B has share ${short(d.bTime)} inside and reads pure sequential time at σ = 1.`);
      return tiny
        ? L(`σ ${is(d.sigma)}：A 0 + 1，B ${short(d.bTime)} + ${short(d.bSpace)}。`, `σ ${is(d.sigma)}: A 0 + 1, B ${short(d.bTime)} + ${short(d.bSpace)}.`)
        : L(`σ ${is(d.sigma)}，转角 ${angleText(d.alpha)}：A 窗内 0、窗外 1；B 窗内 ${both(d.bTime)}、窗外 ${short(d.bSpace)}，各自之和为 1。`, `σ ${is(d.sigma)}, turn ${angleText(d.alpha)}: A inside 0, outside 1; B inside ${both(d.bTime)}, outside ${short(d.bSpace)}, each adding to 1.`);
    }
    const f = m.forget;
    if (state.lens)
      return tiny ? L(`序列槽 ${f.seq} + 通道槽 ${f.ch} = ${f.K}（MODEL）。`, `${f.seq} sequence + ${f.ch} channel slots = ${f.K} (MODEL).`) : L(`KV 缓存（MODEL）：序列槽 K_seq = ${f.seq} 记住先后，通道槽 K − K_seq = ${f.ch} 并排展开，合计 ${f.K}。`, `KV-Cache (MODEL): ${f.seq} sequence slots K_seq keep the order, ${f.ch} channel slots K − K_seq lie side by side, ${f.K} in all.`);
    const beat = f.f > 0 ? L(`第 ${f.n} 拍走向第 ${f.n + 1} 拍`, `beat ${f.n} going to ${f.n + 1}`) : L(`第 ${f.n} 拍`, `beat ${f.n}`);
    return tiny ? L(`${beat}：记住 ${f.kept}，遗忘 ${f.lost}。`, `${beat}: ${f.kept} kept, ${f.lost} forgotten.`) : L(`${beat}，M = ${f.M}：窗内记住 ${f.kept} 个锚点，${f.lost} 个记录已转出 90° 成为窗外，${f.kept} + ${f.lost} = ${f.n}。`, `${beat}, M = ${f.M}: ${f.kept} anchors kept inside, ${f.lost} records turned out by 90°, ${f.kept} + ${f.lost} = ${f.n}.`);
  }
  function bigline(m) {
    const s = state.scene,
      key = {
        split: () => (state.lens ? `Δτ/Δt ${isb(m.split.cos)}` : slopeText(m.split)),
        minus: () => (state.lens ? (m.minus.cosh ? `cosh r ${isb(m.minus.cosh)}` : 'u = 1') : `Δτ² ${isb(m.minus.kt)}`),
        regimes: () => (state.lens ? { photon: 'm₀ = 0', whole: `M = M${sub2('Ω')}`, finite: 'm₀ ≠ 0', moving: 'M → ' + Math.ceil(m.regimes.M) }[m.regimes.regime] : (m.regimes.exact ? `M = ${m.regimes.M}/8` : named('M', false, 0, m.regimes.M))),
        dual: () => (state.lens ? `A 0 · B ${brief(m.dual.bTime)}` : `σ ${is(m.dual.sigma)}`),
        forget: () => (state.lens ? `${m.forget.seq} + ${m.forget.ch} = 8` : named('n', !(m.forget.f > 0), m.forget.n, m.forget.t))
      };
    return `${L(...SCENE_NAME[s][state.lens])} · <span class="nb">${key[s]()}</span>`;
  }
  function legendItems() {
    const lens = state.lens;
    const items = [['vi', L('三元球 𝕋₃ · 弧 Γ', 'ternion sphere 𝕋₃ · arc Γ')]];
    const inside = lens ? L('时间 Δτ', 'time Δτ') : L(`窗内 ${PW}d`, `inside ${PW}d`),
      outside = lens ? L('空间 Δx', 'space Δx') : L(`窗外 (I − ${PW})d`, `outside (I − ${PW})d`);
    switch (state.scene) {
      case 'split':
        items.push(['cy', inside], ['mg', outside], ['am', L('手柄', 'handle')]);
        break;
      case 'minus':
        items.push(['cy', lens ? L('Δτ² · 双曲线', 'Δτ² · hyperbola') : L('窗内 · 双曲线', 'inside · hyperbola')], ['mg', lens ? '−Δx²' : L('窗外', 'outside')], ['am', L('当前点', 'current point')]);
        break;
      case 'regimes':
        items.push(['cy', L('窗内的模', 'modes inside')], ['mg', L('窗外的模', 'modes outside')], ['am', L('容量 M', 'capacity M')]);
        break;
      case 'dual':
        items[0] = ['vi', L('弧 Γ · 旋子 R(σ)', 'arc Γ · rotor R(σ)')];
        items.push(['cy', `W${sub2('A')} · W${sub2('B')}`], ['mg', L('窗外', 'outside')], ['am', L('B 的垂足', 'foot of B')]);
        break;
      default:
        items.push(['cy', lens ? L('序列槽', 'sequence slots') : L('窗内锚点', 'kept anchors')], ['mg', lens ? L('通道槽', 'channel slots') : L('遗忘的记录', 'forgotten records')], ['am', L('当前拍', 'current beat')]);
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
        at = slopeText(p);
      return lens
        ? {
            long: [`同一个直角三角形换一种读法（MODEL）：青色的直角边读作时间 Δτ ${is(p.cos)}，品红的直角边读作空间 Δx ${is(p.sin)}，紫色的斜边是预算 Δt = 1。球面上没有画时间轴或空间轴，读法属于记忆窗。`, `The same right triangle, read otherwise (MODEL): the cyan leg is read as time Δτ ${is(p.cos)}, the magenta leg as space Δx ${is(p.sin)}, the violet hypotenuse is the budget Δt = 1. No axis of time or space is drawn on the sphere; the reading belongs to the window.`],
            fig: [`读作时间 Δτ 与空间 Δx（MODEL）：Δτ² + Δx² = Δt²。`, `Read as time Δτ and space Δx (MODEL): Δτ² + Δx² = Δt².`]
          }
        : {
            long: [`紫色的弧 Γ 不动。青色的记忆窗是过 C 的大圆，转到 ${at}：紫色箭头 d 分成窗内的青色箭头与窗外的品红边，垂足总落在虚线半圆上；两块正方形的面积之和就是 d 的平方 1。拖琥珀手柄换窗口。`, `The violet arc Γ stays put. The cyan memory window is a great circle through C, turned to ${at}: the violet arrow d splits into the cyan arrow inside and the magenta edge outside, and the foot always lies on the dashed half circle; the two squares add up to d², which is 1. Drag the amber handle to turn the window.`],
            fig: [`紫弧不动，窗口转到 ${at}：青² + 品红² = 1。`, `Fixed violet arc, window at ${at}: cyan² + magenta² = 1.`]
          };
    }
    if (s === 'minus') {
      const p = m.minus;
      return lens
        ? {
            long: [`左边的平面图是快度的读法（MODEL）：青色双曲线 t² − x² = 1 上的琥珀点在 (sinh r, cosh r) = (${p.sinh ? short(p.sinh) : '—'}, ${p.cosh ? short(p.cosh) : '—'})，虚线是光锥。下方的表盘是视界负载 η（MODEL）：记录从窗内（向上）转向窗外（向右），η = 1/2 时转过 45°，η → 1 时转满 90°。`, `The flat panel on the left is the rapidity reading (MODEL): the amber point on the cyan hyperbola t² − x² = 1 is at (sinh r, cosh r) = (${p.sinh ? short(p.sinh) : '—'}, ${p.cosh ? short(p.cosh) : '—'}), the dashed line is the light cone. The dial below is the horizon load η (MODEL): a record turns from inside the window (up) to outside (right), by 45° at η = 1/2 and all 90° as η → 1.`],
            fig: [`闵氏减号（MODEL）：cosh² r − sinh² r = 1，u ${is(p.u)}。`, `Minkowski minus (MODEL): cosh² r − sinh² r = 1 at u ${is(p.u)}.`]
          }
        : {
            long: [`把勾股账本移项：紫色正方形是 Δt² = 1，角上的品红正方形是 Δx² ${is(p.ks)}，剩下的青色曲尺形就是 Δτ² ${is(p.kt)}。左边的琥珀点沿青色双曲线滑动；下方的表盘是视界负载（MODEL）。`, `Transpose the Pythagorean ledger: the violet square is Δt² = 1, the magenta square in its corner is Δx² ${is(p.ks)}, and the cyan L-shaped gnomon left over is Δτ² ${is(p.kt)}. On the left the amber point slides along the cyan hyperbola; the dial below is the horizon load (MODEL).`],
            fig: [`移项：Δτ² = Δt² − Δx²；琥珀点沿双曲线滑动。`, `Transposed: Δτ² = Δt² − Δx²; amber slides on the hyperbola.`]
          };
    }
    if (s === 'regimes') {
      const r = m.regimes,
        k = Math.floor(r.M);
      const fig = {
        photon: [`M = 0：没有青色的模，窗内份额 0，是光子。`, `M = 0: no cyan mode, share inside 0: the photon.`],
        whole: [`M = 8：八个模全是青色，窗外什么也不剩。`, `M = 8: all eight modes cyan, nothing left outside.`],
        finite: lens ? [`M = ${k}：有限的有质量观察者，m₀ 不为 0（MODEL）。`, `M = ${k}: a finite massive observer, m₀ not 0 (MODEL).`] : [`M = ${k}：八个模里 ${k} 个青色在窗内，份额 ${short(r.kt)}。`, `M = ${k}: ${k} of 8 modes cyan inside, share ${short(r.kt)}.`],
        moving: [`琥珀手柄正把第 ${k + 1} 个模填进窗内。`, `The amber handle fills mode ${k + 1} into the window.`]
      }[r.regime];
      return {
        long: [`球上方的八个柱子是八个正交模，高度是权重 (9 − k)/36。容量 M 把前 M 个放进记忆窗（青色），其余留在窗外（品红）；右边三角形的青色边平方就是窗内份额。M = 0 是光子，1 到 7 是有限的观察者，M = 8 时窗外为空。拖琥珀手柄改 M。`, `The eight pillars above the ball are eight orthogonal modes, their heights the weights (9 − k)/36. The capacity M puts the first M into the memory window (cyan) and leaves the rest outside (magenta); the squared cyan side of the triangle on the right is the share inside. M = 0 is the photon, 1 to 7 a finite observer, and at M = 8 nothing is outside. Drag the amber handle to change M.`],
        fig
      };
    }
    if (s === 'dual') {
      const d = m.dual;
      return {
        long: [`两个记忆窗都过 C：虚线青圈 W_A 垂直于弧，A 把整条 d 读作窗外（品红虚线）；实线青圈 W_B 由紫色旋子 R(σ) 转过 ${angleText(d.alpha)}，B 的垂足沿同一个虚线半圆移动。σ = 1 时 B 把同一条弧全读作窗内。`, `Both memory windows pass through C: the dashed cyan circle W_A is across the arc, and A reads the whole of d as outside (dashed magenta); the solid cyan circle W_B is turned by the violet rotor R(σ) through ${angleText(d.alpha)}, and the foot of B moves on the same dashed half circle. At σ = 1, B reads the same arc as inside only.`],
        fig: lens
          ? [`同时性的相对性（MODEL）：A、B 切出不同的同时面。`, `Relative simultaneity (MODEL): A and B cut different slices.`]
          : d.k === GRID && d.exact
            ? [`同一条弧：A 读作纯空间，B 经旋子 σ = 1 读作纯时间。`, `One arc: A reads pure space, B turned by σ = 1 reads pure time.`]
            : [`旋子 σ ${is(d.sigma)}：A 窗内 0，B 窗内 ${short(d.bTime)}。`, `Rotor σ ${is(d.sigma)}: inside 0 for A, ${short(d.bTime)} for B.`]
      };
    }
    const f = m.forget;
    return {
      long: [`十二拍沿弧排开。容量 M = ${f.M} 的窗口留着最近的青色锚点；每来一拍，最老的一个转出 90°，成为窗外的品红记录（遗忘生成空间）。上方八个槽是预算：${f.seq} 个青色序列槽，${f.ch} 个品红通道槽。`, `Twelve beats lie along the arc. A window of capacity M = ${f.M} keeps the latest cyan anchors; at each beat the oldest turns out by 90° and becomes a magenta record outside (forgetting makes space). The eight slots above are the budget: ${f.seq} cyan sequence slots and ${f.ch} magenta channel slots.`],
      fig: lens ? [`KV 缓存（MODEL）：序列 ${f.seq} 槽 + 通道 ${f.ch} 槽 = 8。`, `KV-Cache (MODEL): ${f.seq} sequence + ${f.ch} channel slots = 8.`] : f.f > 0 ? [`第 ${f.n + 1} 拍进来，最老的记录正转出 90°。`, `Beat ${f.n + 1} comes in; the oldest record turns out by 90°.`] : [`第 ${f.n} 拍：留 ${f.kept} 个青色锚点，${f.lost} 个品红记录转出 90°。`, `Beat ${f.n}: ${f.kept} cyan anchors kept, ${f.lost} magenta records turned out.`]
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      lens = state.lens,
      tiny = small(),
      { R, U } = cam;
    // a label sits (right, up) pixels from its point
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    /** The labels of the ledger of a window at the angle φ, on the panel. */
    const ledgerTags = (phi, o = {}) => {
      const c0 = cs(phi),
        s0 = sn(phi),
        [fx, fy] = footXY(phi);
      N('gamma', off(gamma(-0.8), -12, 12), 'Γ', 'c-vi');
      N('C', off(scale(C, LIFT), -12, -10), 'C', 'c-vi');
      N('d', off(lp(1, 0), 14, -12), lens ? 'Δt = 1' : 'd', 'c-vi');
      if (o.cyan && c0 > 0.14) N('cyan', off(lp(fx / 2, fy / 2), -14 - 18 * s0, 10 + 10 * c0), o.cyan, 'c-cy');
      if (o.magenta && s0 > 0.14) N('magenta', off(lp((fx + 1) / 2, fy / 2), 16 + 10 * c0, 4 - 10 * s0), o.magenta, 'c-mg');
      if (!tiny) N('window', off(lp(1.16 * c0, 1.16 * s0), 12, 8), `W${sub2(o.win || 'M')}`, 'c-cy');
      if (!compact() && o.title !== false) N('plate', off(lp(-0.62, o.top == null ? UP[1] : o.top), 6, -10), L('C 处切平面 · 放大', 'tangent plane at C · enlarged'), 'c-ik');
      if (o.squares) {
        if (c0 > 0.3 && s0 > 0.3) {
          N('sqC', lp(fx / 2 - (c0 * s0) / 2, fy / 2 + (c0 * c0) / 2), o.squares[0], 'c-cy');
          N('sqM', lp((fx + 1) / 2 + (s0 * c0) / 2, fy / 2 + (s0 * s0) / 2), o.squares[1], 'c-mg');
        }
      }
    };
    if (s === 'split') {
      const p = m.split;
      ledgerTags(p.phi, { cyan: `${lens ? 'Δτ' : `${PW}d`} ${isb(p.cos)}`, magenta: `${lens ? 'Δx' : `(I − ${PW})d`} ${isb(p.sin)}`, squares: tiny ? null : [brief(p.kt), brief(p.ks)] });
    }
    if (s === 'minus') {
      const p = m.minus;
      ledgerTags(p.phi, { cyan: lens ? 'Δτ' : `${PW}d`, magenta: lens ? 'Δx' : `(I − ${PW})d`, title: false });
      N('gnomon', lp(0.3, -0.32), `Δτ² ${isb(p.kt)}`, 'c-cy');
      if (p.sin.x > 0.3) N('corner', lp(1 - p.sin.x / 2, -(1 - p.sin.x / 2)), `Δx² ${isb(p.ks)}`, 'c-mg');
      if (!tiny) N('square', off(lp(0, -1), -8, -12), 'Δt² = 1', 'c-vi');
      N('hyp', off(panelPoint(1.9, Math.cosh(Math.asinh(1.9))), 22, -10), 't² − x² = 1', 'c-cy');
      if (p.cosh && p.sinh.x <= HX[1] && p.cosh.x <= HT[1]) N('pt', off(panelPoint(p.sinh.x, p.cosh.x), -12, 16), `(${brief(p.sinh)}, ${brief(p.cosh)})`, 'c-am');
      if (!tiny) N('cone', off(panelPoint(2.45, 2.45), 10, -8), lens ? L('光锥', 'light cone') : 'x = t', 'c-ik');
      const ld = m.load;
      N('dial', off(dialPoint(PI / 4, 1.25), 12, 10), ld.on ? `η ${is(ld.eta)}` : L('负载仪 关', 'gauge off'), 'c-ik');
      if (ld.on && !tiny) N('half', off(dialPoint(PI / 4, 1.12), 24, -10), '1/2 · 45°', 'c-ik');
    }
    if (s === 'regimes') {
      const r = m.regimes,
        phi = Math.acos(clamp(r.cos.x, 0, 1));
      ledgerTags(phi, { cyan: lens ? 'Δτ' : brief(r.kt), magenta: lens ? 'Δx' : brief(r.ks) });
      N('M0', off(archPoint(0, ARCH_R + 0.1), -14, -12), tiny ? '0' : L('M = 0 光子', 'M = 0 photon'), 'c-mg');
      N('M8', off(archPoint(MODES, ARCH_R + 0.1), 18, 8), tiny ? '8' : L('M = 8 整体', 'M = 8 whole'), 'c-cy');
      N('Mnow', off(archPoint(r.M, ARCH_R + 0.66), 0, 14), named('M', r.exact, r.M, r.M), 'c-am');
    }
    if (s === 'dual') {
      const d = m.dual,
        phiB = PI / 2 - d.alpha;
      ledgerTags(phiB, { cyan: `B ${brief(d.bTime)}`, magenta: `B ${brief(d.bSpace)}`, win: 'B' });
      N('A', off(lp(0, 0), -18, -14), tiny ? 'A' : L('A：窗内 0', 'A: inside 0'), 'c-cy');
      N('Aspace', off(lp(0.5, -0.07), 0, -14), tiny ? 'A 1' : L('A：窗外 1', 'A: outside 1'), 'c-mg');
      if (!tiny) N('winA', off(lp(0, 1.16), -10, 8), `W${sub2('A')}`, 'c-cy');
      if (d.alpha > 0.15) N('rotor', off(lp(0.36 * cs(PI / 2 - d.alpha / 2), 0.36 * sn(PI / 2 - d.alpha / 2)), 18, 10), `R(σ) · σ ${is(d.sigma)}`, 'c-vi');
    }
    if (s === 'forget') {
      const f = m.forget;
      N('gamma', off(anchor(0), -14, 12), 'Γ', 'c-vi');
      N('now', off(anchor(f.t, LIFT + 0.02), 8, 22), named('n', !(f.f > 0), f.n, f.t), 'c-am');
      if (f.lost > 0) N('lost', off(anchor(Math.max(1, (f.n - f.M + 1) / 2), LIFT + 0.42), 0, 14), tiny ? `${f.lost}` : L(`遗忘 ${f.lost} → 窗外`, `${f.lost} forgotten → outside`), 'c-mg');
      if (!tiny) N('kept', off(anchor(Math.max(1, f.n - (f.kept - 1) / 2), LIFT), 0, -22), L(`窗内 ${f.kept}`, `${f.kept} kept`), 'c-cy');
      N('slots', off(archPoint(MODES / 2, ARCH_R + 0.42), 0, 14), `K${sub2('seq')} + K${sub2('ch')} = ${f.seq} + ${f.ch} = 8`, 'c-ik');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d./]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>');
  const ACTS = {
    split: ['下一个有理点 ▸', 'Next rational point ▸'],
    minus: ['负载仪 开/关', 'Load gauge on/off'],
    regimes: ['容量 + 1 ▸', 'Capacity + 1 ▸'],
    dual: ['σ：0 ↔ 1', 'σ: 0 ↔ 1'],
    forget: ['下一拍 ▸', 'Next beat ▸']
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
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    // the ledger stands where the cards in view put it, blended while a card changes
    LED = ['c', 'h', 'oy'].reduce((F, key) => {
      const v = (k) => frameOf(k)[key];
      F[key] = key === 'c' ? [0, 1].map((i) => SCENES.reduce((s, k) => s + w[k] * v(k)[i], 0)) : SCENES.reduce((s, k) => s + w[k] * v(k), 0);
      return F;
    }, {});
    fit(w);
    sc.begin();
    drawBall(w);
    drawPlate(w.split + w.regimes + w.dual, UP);
    drawPlate(w.minus, DOWN);
    drawArc(1 - w.forget, false);
    drawArc(w.forget, true);
    drawSplit(m, w.split);
    drawMinus(m, w.minus);
    drawRegimes(m, w.regimes);
    drawDual(m, w.dual);
    drawForget(m, w.forget);
    const here = handleWorld(state.at[state.scene]);
    sc.bead(here, { color: P.amber, r: 6.4, key: 'current' });
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
  const PAD = [40, 14, 10, 22];
  /** The Pythagorean points of the slope chips on the circle: (Δx/Δt, Δτ/Δt). */
  const LANDMARK_POINTS = Object.entries(SLOPES).map(([name, k]) => [name, splitAt(k)]);
  /** The current point of the plot of the circle: the amplitudes (Δx/Δt, Δτ/Δt) of the card, one or two of them. */
  function circlePoints(m) {
    switch (state.scene) {
      case 'minus':
        return [[m.minus.sin.x, m.minus.cos.x]];
      case 'regimes':
        return [[m.regimes.sin.x, m.regimes.cos.x]];
      case 'dual':
        return [[1, 0], [Math.sqrt(m.dual.bSpace.x), Math.sqrt(m.dual.bTime.x)]];
      case 'forget': {
        const k = m.forget.seq / BUDGET;
        return [[Math.sqrt(1 - k), Math.sqrt(k)]];
      }
      default:
        return [[m.split.sin.x, m.split.cos.x]];
    }
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').textContent = L('勾股圆与预算线：窗内² + 窗外² = 1', 'Pythagorean circle and budget line: inside² + outside² = 1');
      $('plotMeta').textContent = state.scene === 'split' || state.scene === 'minus' ? slopeText(m[state.scene]) : L(...SCENE_NAME[state.scene][0]);
      const items = [
        [P.violet, L('圆 (Δx/Δt)² + (Δτ/Δt)² = 1', 'circle (Δx/Δt)² + (Δτ/Δt)² = 1')],
        [P.violet, L('直线：窗外 + 窗内 = 1', 'line: outside + inside = 1'), 'dash'],
        [P.ink, '[p:q]', 'dot']
      ];
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cv, { x: [-0.04, 1.12], y: [-0.04, headroom(cv, PAD, rows.length, -0.04, 1.08)], pad: PAD });
      g.axes({ xTicks: [[0, '0'], [0.5, '1/2'], [1, '1']], yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
      g.line(sample(80, (t) => [sn((PI / 2) * t), cs((PI / 2) * t)]), P.violet, { width: 1.8 });
      g.line([[0, 1], [1, 0]], P.violet, { width: 1.2, dash: [4, 3] });
      for (const [, s] of LANDMARK_POINTS) {
        g.dot(s.sin.x, s.cos.x, P.ink, 2.6);
        g.dot(s.ks.x, s.kt.x, P.ink, 2);
      }
      for (const [x, y] of circlePoints(m)) {
        g.line([[x, 0], [x, y]], P.cyan, { width: 1.4 });
        g.line([[0, y], [x, y]], P.magenta, { width: 1.4 });
        g.line([[x, y], [x * x, y * y]], P.amber, { width: 1, dash: [2, 3] });
        g.dot(x, y, P.amber, 3.8);
        g.dot(x * x, y * y, P.amber, 3);
      }
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (!cb.clientWidth || !cb.clientHeight) return;
    const s = state.scene;
    if (s === 'split' || s === 'minus') {
      const p = m[s],
        ld = m.load;
      $('plotTitleB').textContent = L('双曲线 cosh² r − sinh² r = 1 · 视界负载 1 − η_load（MODEL）', 'Hyperbola cosh² r − sinh² r = 1 · horizon load 1 − η_load (MODEL)');
      $('plotMetaB').textContent = p.cosh ? `u ${is(p.u)}` : 'u = 1';
      const items = [
        [P.cyan, 't² − x² = 1'],
        [P.ink, 'x = t', 'dash'],
        [P.cyan, '1 − η', 'dot'],
        [P.magenta, 'η', 'dot']
      ];
      const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
      const top = 2.8,
        g = kit.plot(cb, { x: [-0.05, 3.3], y: [0, headroom(cb, PAD, rows.length, 0, top)], pad: PAD });
      g.axes({ xTicks: [[0, '0'], [1, '1'], [2, '2']], yTicks: [[0, '0'], [1, '1'], [2, '2']] });
      g.line([[0, 0], [2.6, 2.6]], P.ink, { width: 1, dash: [4, 4] });
      const end = Math.asinh(2.6);
      g.line(sample(80, (t) => [Math.sinh(end * t), Math.cosh(end * t)]), P.cyan, { width: 1.8 });
      for (const k of [20, 30, 40]) {
        const q = splitAt(k);
        g.dot(q.sinh.x, q.cosh.x, P.ink, 2.4);
      }
      if (p.cosh && p.sinh.x <= 2.6) {
        g.line([[0, p.cosh.x], [p.sinh.x, p.cosh.x]], P.magenta, { width: 1.4 });
        g.line([[p.sinh.x, 0], [p.sinh.x, p.cosh.x]], P.violet, { width: 1.2, dash: [3, 3] });
        g.dot(p.sinh.x, p.cosh.x, P.amber, 3.8);
      }
      // the gauge: a column of height 1 split into 1 − η (cyan) and η (magenta), with its mark at one half
      const x0 = 2.9,
        x1 = 3.15,
        dim = ld.on ? 1 : 0.4;
      g.rect(x0, 0, x1, ld.keep.x, P.cyan, { alpha: 0.75 * dim });
      g.rect(x0, ld.keep.x, x1, 1, P.magenta, { alpha: 0.75 * dim });
      g.line([[x0 - 0.06, 0.5], [x1 + 0.06, 0.5]], P.ink, { width: 1.2 });
      drawLegend(g, rows);
      return;
    }
    if (s === 'regimes') {
      const r = m.regimes;
      $('plotTitleB').textContent = L('容量阶梯：窗内与窗外的份额', 'Capacity staircase: shares inside and outside');
      $('plotMetaB').textContent = named('M', r.exact, r.M, r.M);
      const items = [
        [P.cyan, L('窗内', 'inside')],
        [P.magenta, L('窗外', 'outside')],
        [P.violet, L('和 = 1', 'sum = 1'), 'dash']
      ];
      const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cb, { x: [-0.5, MODES + 0.5], y: [0, headroom(cb, PAD, rows.length, 0, 1.04)], pad: PAD });
      g.axes({ xTicks: range(MODES + 1).map((k) => [k, String(k)]), yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
      const stairs = (f) => range(MODES + 1).flatMap((k) => [[k - 0.5, f(k)], [k + 0.5, f(k)]]);
      g.line(stairs((k) => fval(partial(k))), P.cyan, { width: 1.8 });
      g.line(stairs((k) => 1 - fval(partial(k))), P.magenta, { width: 1.8 });
      g.line([[-0.5, 1], [MODES + 0.5, 1]], P.violet, { width: 1.2, dash: [4, 3] });
      g.dot(r.M, r.kt.x, P.amber, 3.8);
      g.dot(r.M, r.ks.x, P.amber, 3.2);
      drawLegend(g, rows);
      return;
    }
    if (s === 'dual') {
      const d = m.dual;
      $('plotTitleB').textContent = L('两位观察者的分账随旋子 σ', 'Split of two observers along the rotor σ');
      $('plotMetaB').textContent = `σ ${is(d.sigma)}`;
      const items = [
        [P.cyan, L('B 窗内', 'B inside')],
        [P.magenta, L('B 窗外', 'B outside')],
        [P.cyan, L('A 窗内', 'A inside'), 'dash'],
        [P.magenta, L('A 窗外', 'A outside'), 'dash']
      ];
      const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cb, { x: [0, 1.04], y: [-0.03, headroom(cb, PAD, rows.length, -0.03, 1.04)], pad: PAD });
      g.axes({ xTicks: [[0, '0'], [0.5, '1/2'], [1, '1']], yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
      const bt = (x) => (4 * x * x) / (1 + x * x) ** 2;
      g.line(sample(80, (t) => [t, bt(t)]), P.cyan, { width: 1.8 });
      g.line(sample(80, (t) => [t, 1 - bt(t)]), P.magenta, { width: 1.8 });
      g.line([[0, 0.004], [1, 0.004]], P.cyan, { width: 1.4, dash: [4, 3] });
      g.line([[0, 0.996], [1, 0.996]], P.magenta, { width: 1.4, dash: [4, 3] });
      g.line([[d.sigma.x, -0.03], [d.sigma.x, 1.04]], P.amber, { width: 1 });
      g.dot(d.sigma.x, d.bTime.x, P.amber, 3.8);
      g.dot(d.sigma.x, d.bSpace.x, P.amber, 3.2);
      drawLegend(g, rows);
      return;
    }
    const f = m.forget;
    $('plotTitleB').textContent = L('记住与遗忘的累计 · 槽位预算 8', 'Kept and forgotten so far · slot budget 8');
    $('plotMetaB').textContent = `M = ${f.M}`;
    const items = [
      [P.cyan, L('记住 min(n, M)', 'kept min(n, M)')],
      [P.magenta, L('遗忘 max(0, n − M)', 'forgotten max(0, n − M)')],
      [P.violet, L('和 n', 'sum n'), 'dash'],
      [P.ink, 'K = 8', 'dash']
    ];
    const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
    const g = kit.plot(cb, { x: [-0.3, BEATS + 0.3], y: [0, headroom(cb, PAD, rows.length, 0, BEATS)], pad: PAD });
    g.axes({ xTicks: [0, 4, 8, 12].map((k) => [k, String(k)]), yTicks: [0, 4, 8, 12].map((k) => [k, String(k)]) });
    const nn = range(BEATS + 1);
    g.line(nn.map((n) => [n, n]), P.violet, { width: 1.2, dash: [4, 3] });
    g.line([[-0.3, BUDGET], [BEATS + 0.3, BUDGET]], P.ink, { width: 1, dash: [2, 4] });
    g.line(nn.map((n) => [n, Math.min(n, f.M)]), P.cyan, { width: 1.8 });
    g.line(nn.map((n) => [n, Math.max(0, n - f.M)]), P.magenta, { width: 1.8 });
    g.line([[f.t, 0], [f.t, BEATS]], P.amber, { width: 1 });
    drawLegend(g, rows);
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    switch (state.scene) {
      case 'split':
        return L(`垂足 ${PW}d 落在以 d 为直径的圆上（泰勒斯）；轨道上每一站 u = k/60 都给出有理的 cos φ 与 sin φ。`, `The foot ${PW}d lies on the circle with diameter d (Thales); every stop u = k/60 of the rail gives a rational cos φ and sin φ.`);
      case 'minus':
        return L(`Δτ² = (Δt − Δx)(Δt + Δx)；u = tanh(r/2)。`, `Δτ² = (Δt − Δx)(Δt + Δx); u = tanh(r/2).`);
      case 'regimes':
        return L(`前 M 个权重之和 = M(17 − M)/72：${range(MODES + 1).map((k) => fstr(partial(k))).join('、')}。`, `The first M weights add to M(17 − M)/72: ${range(MODES + 1).map((k) => fstr(partial(k))).join(', ')}.`);
      case 'dual': {
        const d = m.dual;
        return d.rotor ? L(`旋子四元数 (${d.rotor.join(', ')})，R(σ) 的第二行 (0, ${short(d.cosA)}, −${short(d.sinA)})。`, `Rotor quaternion (${d.rotor.join(', ')}); the second row of R(σ) is (0, ${short(d.cosA)}, −${short(d.sinA)}).`) : L('旋子在两站之间。', 'The rotor is between two stops.');
      }
      default:
        return L('每一拍乘上同一个有理单位四元数 b = (99 + 20i)/101：相隔 n 拍的两个锚点读数只依赖 n。', 'Each beat multiplies by one rational unit quaternion b = (99 + 20i)/101: two anchors n beats apart have a reading that depends on n only.');
    }
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      sp = state.scene === 'minus' ? m.minus : m.split,
      r = m.regimes,
      d = m.dual,
      f = m.forget,
      ld = m.load,
      mi = m.minus;
    const keys = {
      split: () => `${short(m.split.kt)} + ${short(m.split.ks)} ${is(m.split.sum)}`,
      minus: () => `${short(mi.kt)} = 1 − ${short(mi.ks)}`,
      regimes: () => `${short(r.kt)} + ${short(r.ks)} = 1`,
      dual: () => `A 0 + 1 = 1 · B ${short(d.bTime)} + ${short(d.bSpace)} ${is(d.sumB)}`,
      forget: () => `${f.kept} + ${f.lost} = ${f.n} · ${f.seq} + ${f.ch} = 8`
    };
    put('roKey', keys[state.scene]());
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roPair', `${short(sp.u)} · ${slopeText(sp)} · ${short(sp.cos)} · ${short(sp.sin)}`);
    put('roMink', mi.cosh ? `${short(mi.cosh)} · ${short(mi.sinh)} · ${both(mi.hyp)}` : L('u = 1：没有双曲线上的点', 'u = 1: no point on the hyperbola'));
    put('roLoad', `${short(ld.eta)} · ${short(ld.keep)} · √(${short(ld.clock2)}) ${say(ld.clock)}${ld.on ? '' : L('（负载仪关）', ' (gauge off)')}`);
    put('roRegime', `${r.exact ? r.M : rel(null, r.M, 2).replace('≈ ', '≈')} · ${both(r.kt)} · ${both(r.ks)}`);
    put('roRotor', `${short(d.sigma)} · ${angleText(d.alpha)} · 0 ↔ ${short(d.bTime)}`);
    put('roFifo', `${f.f > 0 ? rel(null, f.t, 2).replace('≈ ', '≈') : f.n} · ${f.kept} · ${f.lost} · ${f.seq} + ${f.ch} = ${f.K}`);
    put('roNote', readNote(m));
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    const kt = { split: m.split.kt, minus: mi.kt, regimes: r.kt, dual: d.bTime, forget: num(frac(BigInt(f.seq), BigInt(BUDGET))) }[state.scene];
    put('keyPill', `κ_time <strong>${brief(kt)}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = {
      split: 'κ_time + κ_space = cos²φ + sin²φ ≡ 1',
      minus: 'Δτ² = Δt² − Δx² = (Δt − Δx)(Δt + Δx)',
      regimes: 'κ_time(M) = Σ<sub>k≤M</sub> w<sub>k</sub> = M(17 − M)/72',
      dual: 'R(σ) = Ad(1 + σi) ∈ SO(3, ℚ)',
      forget: 'min(n, M) + max(0, n − M) = n · K<sub>seq</sub> + K<sub>ch</sub> = 8'
    }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    const name0 = Object.keys(SLOPES).find((k) => m.split.exact && SLOPES[k] === m.split.k) || null;
    slopeChips.set(name0, true);
    $('uRange').value = String(Math.round(state.at.split));
    put('uOut', `${is(m.split.u)}`);
    $('loadBtn').setAttribute('aria-pressed', String(state.load));
    $('etaRange').value = String(state.eta);
    put('etaOut', `${is(ld.eta)}`);
    $('mRange').value = String(Math.round(state.at.regimes));
    put('mOut', `= ${Math.round(state.at.regimes)}`);
    $('sigmaRange').value = String(Math.round(state.at.dual));
    put('sigmaOut', `${is(splitAt(Math.round(state.at.dual)).u)}`);
    $('kRange').value = String(state.kseq);
    put('kOut', `= ${state.kseq}`);
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
      const v = settled(t);
      switch (state.scene) {
        case 'regimes':
          return `M = ${Number.isInteger(v) ? v : kit.fix(v, 2)}`;
        case 'dual':
          return `σ = ${Number.isInteger(v) ? fstr(frac(BigInt(v), BigInt(GRID))) : kit.fix(v / GRID, 3)}`;
        case 'forget':
          return `n = ${Number.isInteger(v) ? v : kit.fix(v, 2)}`;
        default:
          return `u = ${Number.isInteger(v) ? fstr(frac(BigInt(v), BigInt(GRID))) : kit.fix(v / GRID, 3)}`;
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
  const slopeChips = kit.chips($('slopeChips'), 'slope', (v) => steer('split', () => clock.set(SLOPES[v])));
  kit.field($('uRange'), { out: $('uOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), BigInt(GRID)))}`, onInput: (v) => steer('split', () => clock.set(Math.round(v))) });
  const toggleLoad = () => steer('minus', () => (state.load = !state.load));
  $('loadBtn').addEventListener('click', toggleLoad);
  kit.field($('etaRange'), {
    out: $('etaOut'),
    fmt: (v) => `= ${fstr(frac(BigInt(v), 20n))}`,
    onInput: (v) =>
      steer('minus', () => {
        state.eta = Math.round(v);
        state.load = true;
      })
  });
  kit.field($('mRange'), { out: $('mOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('regimes', () => clock.set(Math.round(v))) });
  kit.field($('sigmaRange'), { out: $('sigmaOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), BigInt(GRID)))}`, onInput: (v) => steer('dual', () => clock.set(Math.round(v))) });
  kit.field($('kRange'), { out: $('kOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('forget', () => (state.kseq = Math.round(v))) });
  /** The next landmark [p:q] after the present stop. */
  function nextSlope() {
    const stops = Object.values(SLOPES).sort((a, b) => a - b),
      k = Math.round(state.at.split);
    steer('split', () => clock.set(stops.find((s) => s > k) ?? stops[0]));
  }
  const nextCapacity = () => steer('regimes', () => clock.set((Math.round(state.at.regimes) + 1) % (MODES + 1)));
  const flipRotor = () => steer('dual', () => clock.set(Math.round(state.at.dual) === GRID ? 0 : GRID));
  /** One beat forward, from the first again once the twelve are done. The card stays marked: this is its clock. */
  function nextBeat() {
    stopBootPlay();
    clock.pause();
    const k = Math.round(state.at.forget);
    if (k >= BEATS) clock.set(0);
    stopAt = (k >= BEATS ? 0 : k) + 1;
    clock.play();
  }
  $('stageAct').addEventListener('click', () => ({ split: nextSlope, minus: toggleLoad, regimes: nextCapacity, dual: flipRotor, forget: nextBeat })[state.scene]());
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
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
    Object.assign(state, FRESH, { at: { ...STILL }, load: !!p.load });
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

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ----------
     Only the sizes of the samples are given here; the sentences take their numbers from the results. */
  const FRAME = { box: 2, entries: 1, bloch: 4, schurY: 48, heap: 8, beats: BEATS, forms: 3 };
  /** Exact 3 × 3 matrices of fractions. */
  const mmul = (A, B) => A.map((row) => range(B[0].length).map((j) => row.reduce((s, x, k) => plus(s, times(x, B[k][j])), ZERO)));
  const meq = (A, B) => A.every((row, i) => row.every((x, j) => equal(x, B[i][j])));
  const madd = (A, B) => A.map((row, i) => row.map((x, j) => plus(x, B[i][j])));
  const msub = (A, B) => A.map((row, i) => row.map((x, j) => minus(x, B[i][j])));
  const ID3 = range(3).map((i) => range(3).map((j) => (i === j ? ONE : ZERO)));
  const Z3 = range(3).map(() => range(3).map(() => ZERO));
  /** The projection v vᵀ/(vᵀ v) of a nonzero integer vector. */
  const projOf = (v) => {
    const n = v.reduce((s, x) => s + x * x, 0);
    return v.map((a) => v.map((b) => frac(BigInt(a * b), BigInt(n))));
  };
  /** Exact quaternions [w, x, y, z] of fractions. */
  const qm = (a, b) => [
    minus(minus(minus(times(a[0], b[0]), times(a[1], b[1])), times(a[2], b[2])), times(a[3], b[3])),
    minus(plus(plus(times(a[0], b[1]), times(a[1], b[0])), times(a[2], b[3])), times(a[3], b[2])),
    plus(plus(minus(times(a[0], b[2]), times(a[1], b[3])), times(a[2], b[0])), times(a[3], b[1])),
    plus(minus(plus(times(a[0], b[3]), times(a[1], b[2])), times(a[2], b[1])), times(a[3], b[0]))
  ];
  const qc = ([w, x, y, z]) => [w, minus(ZERO, x), minus(ZERO, y), minus(ZERO, z)];
  const qdot = (a, b) => a.reduce((s, x, i) => plus(s, times(x, b[i])), ZERO);
  const qeq = (a, b) => a.every((x, i) => equal(x, b[i]));
  const quat = (t, d) => t.map((x) => frac(BigInt(x), BigInt(d)));
  /** Complex fractions [re, im]. */
  const cmul = ([a, b], [c, d]) => [minus(times(a, c), times(b, d)), plus(times(a, d), times(b, c))];
  const cadd = ([a, b], [c, d]) => [plus(a, c), plus(b, d)];
  const conj = ([a, b]) => [a, minus(ZERO, b)];
  const cnorm2 = ([a, b]) => plus(times(a, a), times(b, b));
  function benchmarks() {
    const F = FRAME,
      span = (n) => range(2 * n + 1).map((k) => k - n);
    // 1 · the rail: every stop of u is a rational point of the circle, its foot lies on the Thales circle, the legs are orthogonal
    let circleBad = 0,
      thalesBad = 0,
      orthoBad = 0,
      rationalStops = 0;
    for (let k = 0; k <= GRID; k++) {
      const s = splitAt(k),
        c = s.cos.q,
        si = s.sin.q;
      if (s.exact) rationalStops++;
      if (!equal(plus(times(c, c), times(si, si)), ONE)) circleBad++;
      const fx = times(c, c),
        fy = times(c, si),
        dx = minus(fx, [1n, 2n]);
      if (!equal(plus(times(dx, dx), times(fy, fy)), [1n, 4n])) thalesBad++;
      if (!equal(plus(times(fx, minus(ONE, fx)), times(fy, minus(ZERO, fy))), ZERO)) orthoBad++;
    }
    const landmarks = Object.entries(SLOPES).map(([name, k]) => [name, splitAt(k).slope.join(':') === name]);
    // 2 · the hyperbola: cosh² − sinh² = 1, cosh = Δt/Δτ, sinh = Δx/Δτ, and u = tanh(r/2) = (cosh r − 1)/sinh r
    let hyperBad = 0,
      halfBad = 0,
      hyperStops = 0;
    for (let k = 0; k < GRID; k++) {
      const s = splitAt(k);
      hyperStops++;
      if (!equal(minus(times(s.cosh.q, s.cosh.q), times(s.sinh.q, s.sinh.q)), ONE) || !equal(times(s.cosh.q, s.cos.q), ONE) || !equal(times(s.sinh.q, s.cos.q), s.sin.q)) hyperBad++;
      if (k > 0 && !equal(quo(minus(s.cosh.q, ONE), s.sinh.q), s.u.q)) halfBad++;
    }
    // 3 · the null cone: integer quadratic forms on ℝ × ℝ¹ and ℝ × ℝ² that vanish on the null vectors are multiples of η
    const nulls1 = [[1, 1], [1, -1]],
      nulls2 = [0, 12, 15, 20, 30, 40, 45, 60].flatMap((k) => {
        const s = splitAt(k);
        return [[ONE, s.cos.q, s.sin.q], [ONE, minus(ZERO, s.sin.q), s.cos.q], [ONE, minus(ZERO, s.cos.q), minus(ZERO, s.sin.q)]];
      });
    let forms1 = 0,
      vanish1 = 0,
      cone1Bad = 0;
    for (const a of span(F.forms))
      for (const b of span(F.forms))
        for (const c of span(F.forms)) {
          forms1++;
          const S = (t, x) => a * t * t + b * t * x + c * x * x;
          if (!nulls1.every(([t, x]) => S(t, x) === 0)) continue;
          vanish1++;
          for (const t of span(3)) for (const x of span(3)) if (S(t, x) !== S(1, 0) * (t * t - x * x)) cone1Bad++;
        }
    let forms2 = 0,
      vanish2 = 0,
      cone2Bad = 0;
    const one = span(1);
    for (const A of one)
      for (const Bc of one)
        for (const Cc of one)
          for (const Dd of one)
            for (const Ee of one)
              for (const Ff of one) {
                forms2++;
                const S = ([t, x, y]) => [times(whole(A), times(t, t)), times(whole(Bc), times(x, x)), times(whole(Cc), times(y, y)), times(whole(2 * Dd), times(t, x)), times(whole(2 * Ee), times(t, y)), times(whole(2 * Ff), times(x, y))].reduce(plus, ZERO);
                if (!nulls2.every((v) => equal(S(v), ZERO))) continue;
                vanish2++;
                for (const t of span(2))
                  for (const x of span(2))
                    for (const y of span(2)) {
                      const v = [whole(t), whole(x), whole(y)];
                      if (!equal(S(v), times(S([ONE, ZERO, ZERO]), whole(t * t - x * x - y * y)))) cone2Bad++;
                    }
              }
    // 4 · complementary projections onto the lines of integer vectors: Q from an orthogonal basis of the complement
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
    // 5 · pinching on Gaussian integer 2 × 2 matrices: ⟨ρ, ρ⟩ = ⟨𝒫ρ, 𝒫ρ⟩ + ⟨ρ − 𝒫ρ, ρ − 𝒫ρ⟩, the discarded part = |ρ₀₁|² + |ρ₁₀|²
    const gauss = span(F.entries).flatMap((a) => span(F.entries).map((b) => [whole(a), whole(b)]));
    const hs = (A, B) => [0, 1].flatMap((i) => [0, 1].map((j) => cmul(conj(A[i][j]), B[i][j]))).reduce(cadd, [ZERO, ZERO]);
    let pinchTried = 0,
      pinchBad = 0,
      massBad = 0;
    for (const a of gauss)
      for (const b of gauss)
        for (const c of gauss)
          for (const d of gauss) {
            pinchTried++;
            const rho = [[a, b], [c, d]],
              pin = [[a, [ZERO, ZERO]], [[ZERO, ZERO], d]],
              rest = [[[ZERO, ZERO], b], [c, [ZERO, ZERO]]],
              lhs = hs(rho, rho),
              rhs = cadd(hs(pin, pin), hs(rest, rest));
            if (!equal(lhs[0], rhs[0]) || !equal(lhs[1], rhs[1])) pinchBad++;
            const mass = hs(rest, rest);
            if (!equal(mass[0], plus(cnorm2(b), cnorm2(c))) || !equal(mass[1], ZERO)) massBad++;
          }
    // 6 · complementary contexts of a qubit: Re Tr ρ² − 1/2 = Σ (p − 1/2)² over the z-context + ‖P_{V⊥} s‖², s = r/√2
    let contextTried = 0,
      contextBad = 0;
    const q4 = span(F.bloch).map((k) => frac(BigInt(k), BigInt(F.bloch)));
    for (const rx of q4)
      for (const ry of q4)
        for (const rz of q4) {
          const r2 = plus(plus(times(rx, rx), times(ry, ry)), times(rz, rz));
          if (cmp(r2, ONE) > 0) continue;
          contextTried++;
          const half = [1n, 2n],
            rho = [[[times(plus(ONE, rz), half), ZERO], [times(rx, half), times(minus(ZERO, ry), half)]], [[times(rx, half), times(ry, half)], [times(minus(ONE, rz), half), ZERO]]],
            sq = [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(rho[i][0], rho[0][j]), cmul(rho[i][1], rho[1][j])))),
            purity = minus(plus(sq[0][0][0], sq[1][1][0]), half),
            probs = [rho[0][0][0], rho[1][1][0]],
            visible = probs.reduce((s, p) => plus(s, times(minus(p, half), minus(p, half))), ZERO),
            residual = times(plus(times(rx, rx), times(ry, ry)), half);
          if (!equal(purity, plus(visible, residual)) || !equal(visible, times(times(rz, rz), half))) contextBad++;
        }
    // 7 · the Schur minimum at x = 1: A + 2By + Cy² ≥ A − B²/C on a grid of y, attained exactly at y = −B/C
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
    // 8 · rational unit quaternions: the heap x_{n+2} = x_{n+1} x_n* x_{n+1} is b^n, equal spacing gives equal readings,
    // ⟨x₀, x_n⟩ = T_n(c), κ = 1 − dist²/4, and tri(x, y, z) = x · y⁻¹ · z in the group at a base point
    const units = [[[1, 2, 2, 4], 5], [[3, 0, 4, 0], 5], [[1, 1, 1, 1], 2], [[2, 3, 6, 0], 7], [[99, 20, 0, 0], 101]].map(([t, d]) => quat(t, d));
    const kap = (x, y) => times(plus(ONE, qdot(x, y)), [1n, 2n]);
    let heapBad = 0,
      spacingBad = 0,
      chebBad = 0,
      chordBad = 0,
      groupBad = 0,
      spacingTried = 0;
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
          const o = units[2],
            mul = (u, v) => qm(qm(u, qc(o)), v),
            inv = (u) => qm(qm(o, qc(u)), o);
          if (!qeq(qm(qm(b, qc(y)), z), mul(mul(b, inv(y)), z))) groupBad++;
        }
      }
    }
    // 9 · the twelve beats: anchors b^n, b = (99 + 20i)/101, readings depend on the spacing only
    const beat = units[4];
    const beats = [quat([1, 0, 0, 0], 1)];
    for (let n = 1; n <= F.beats; n++) beats.push(qm(beats[n - 1], beat));
    let beatBad = 0;
    for (let mm = 0; mm <= F.beats; mm++) for (let n = 0; mm + n <= F.beats; n++) if (!equal(kap(beats[mm], beats[mm + n]), kap(beats[0], beats[n]))) beatBad++;
    // 10 · the modes: the weights add to 1 and their partial sums are M(17 − M)/72
    const weightSum = partial(MODES);
    let partialBad = 0;
    for (let M = 0; M <= MODES; M++) if (!equal(partial(M), frac(BigInt(M * (17 - M)), 72n))) partialBad++;
    // 11 · the rotor: R(σ) is orthogonal with determinant 1 and both observers keep the sum 1, at every stop of σ
    let rotorBad = 0,
      sumBad = 0;
    for (let k = 0; k <= GRID; k++) {
      const d = dualAt(k),
        R = d.matrix,
        Rt = R[0].map((_, j) => R.map((row) => row[j])),
        det = [0, 1, 2].reduce((s, j) => {
          const minor = [1, 2].map((i) => [0, 1, 2].filter((c) => c !== j).map((c) => R[i][c])),
            mdet = minus(times(minor[0][0], minor[1][1]), times(minor[0][1], minor[1][0])),
            term = times(R[0][j], mdet);
          return j === 1 ? minus(s, term) : plus(s, term);
        }, ZERO);
      if (!meq(mmul(Rt, R), ID3) || !equal(det, ONE)) rotorBad++;
      if (!equal(plus(d.bTime.q, d.bSpace.q), ONE) || !equal(plus(d.aTime.q, d.aSpace.q), ONE)) sumBad++;
    }
    // 12 · the window: kept + forgotten = n, kept ≤ M, and the slots add to 8, for every capacity and beat
    let fifoTried = 0,
      fifoBad = 0;
    for (let M = 1; M <= 7; M++)
      for (let n = 0; n <= BEATS; n++) {
        fifoTried++;
        const f = forgetAt(n, M);
        if (f.kept + f.lost !== n || f.kept > M || f.seq + f.ch !== BUDGET) fifoBad++;
      }
    // 13 · one copy left unreversed: seven unimodular rational overlaps and one of 3/5; ρ₀₁ = 1/2
    const overlaps = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [-4, 3, 5], [0, 1, 1], [-1, 0, 1], [1, 0, 1]].map(([a, b, c]) => [frac(BigInt(a), BigInt(c)), frac(BigInt(b), BigInt(c))]),
      blocker = [[3n, 5n], ZERO],
      rho01 = [[1n, 2n], ZERO],
      all = [...overlaps, blocker],
      written = all.reduce(cmul, rho01),
      undone = overlaps.reduce((v, o) => cmul(v, conj(o)), written);
    const unimodular = overlaps.filter((o) => equal(cnorm2(o), ONE)).length;
    // 14 · the observable Krylov tower of a shift on ℚ⁴ read through one coordinate: its dimensions stop growing once
    const Tm = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 1]],
      Cv = [1, 0, 0, 1],
      tower = [];
    let gen = [Cv],
      vec = Cv;
    for (let k = 0; k <= 8; k++) {
      tower.push(rankOf(gen));
      vec = range(4).map((j) => range(4).reduce((s, i) => s + Tm[i][j] * vec[i], 0));
      gen = [...gen, vec];
    }
    const stableAt = tower.findIndex((d, k) => k + 1 < tower.length && d === tower[k + 1]),
      stableBad = tower.slice(stableAt).filter((d) => d !== tower[stableAt]).length;
    // 15 · the record time: a = (m₀ + m₁)/√2 sits at fsAngle π/4 from both orthogonal records
    const fs = Math.acos(Math.SQRT1_2) / (PI / 4);
    return {
      rail: { stops: GRID + 1, rationalStops, circleBad, thalesBad, orthoBad },
      landmarks,
      hyper: { stops: hyperStops, bad: hyperBad, halfBad },
      cone: { forms1, vanish1, cone1Bad, forms2, vanish2, cone2Bad, nulls: nulls2.length },
      proj: { tried: projTried, bad: projBad },
      pinch: { tried: pinchTried, bad: pinchBad, massBad },
      context: { tried: contextTried, bad: contextBad },
      schur: { tried: schurTried, bad: schurBad, grid: 2 * F.schurY + 1 },
      quaternion: { units: units.length, heapBad, chebBad, spacingTried, spacingBad, chordBad, groupBad, groupTried: units.length ** 3 },
      beats: { n: F.beats, bad: beatBad },
      weights: { sum: weightSum, partialBad },
      rotor: { stops: GRID + 1, bad: rotorBad, sumBad },
      fifo: { tried: fifoTried, bad: fifoBad },
      copies: { n: all.length, unimodular, written, undone, rho01 },
      krylov: { tower, stableAt, bad: stableBad },
      record: fs
    };
  }
  /** The rank of a list of integer vectors, by elimination over the fractions. */
  function rankOf(rows) {
    const M = rows.map((r) => r.map((x) => whole(x)));
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
  const BENCH = benchmarks();
  const DEMO = { split: splitAt(STILL.split), minus: splitAt(STILL.minus), regime: regimeAt(STILL.regimes), dual: dualAt(STILL.dual), forget: forgetAt(STILL.forget, FRESH.kseq) };
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    kTime: () => relQ(DEMO.split.kt.q),
    kSpace: () => relQ(DEMO.split.ks.q),
    cosh: () => relQ(DEMO.minus.cosh.q),
    sinh: () => relQ(DEMO.minus.sinh.q),
    hyp: () => relQ(hyperbola(DEMO.minus).q),
    regime: () => relQ(DEMO.regime.kt.q),
    dualB: () => relQ(DEMO.dual.bTime.q),
    kept: () => String(DEMO.forget.kept),
    lost: () => String(DEMO.forget.lost)
  };
  /** The text of the NUM box. */
  function numText(sayIt) {
    const B = BENCH,
      list = (xs) => xs.join(sayIt('、', ', ')),
      bad = (n) => sayIt(`不符 ${n} 处`, `${n} failures`),
      cx = (z) => (equal(z[1], ZERO) ? fstr(z[0]) : `${fstr(z[0])} ${z[1][0] < 0n ? '−' : '+'} ${fstr(z[1]).replace('−', '')}i`),
      marks = list(B.landmarks.map(([name, ok]) => `[${name}]${ok ? '' : sayIt('（不符）', ' (failed)')}`));
    return sayIt(
      `打开页面时由脚本用分数现算，是上面各条定理的个别实例，不检验定理的前提。轨道：u 的 ${B.rail.stops} 站中有理点 ${B.rail.rationalStops} 个，cos²φ + sin²φ = 1 ${bad(B.rail.circleBad)}，垂足在泰勒斯圆上${bad(B.rail.thalesBad)}，两直角边正交${bad(B.rail.orthoBad)}；斜率按钮 ${marks} 各落在它的一站。双曲线：${B.hyper.stops} 站上 cosh² r − sinh² r = 1、cosh r = Δt/Δτ、sinh r = Δx/Δτ ${bad(B.hyper.bad)}，(cosh r − 1)/sinh r = u ${bad(B.hyper.halfBad)}。零锥：ℝ × ℝ¹ 上 ${B.cone.forms1} 个整系数二次型有 ${B.cone.vanish1} 个在零向量上为 0，与 S(1, 0) · η 相比${bad(B.cone.cone1Bad)}；ℝ × ℝ² 上 ${B.cone.forms2} 个中有 ${B.cone.vanish2} 个在 ${B.cone.nulls} 个有理零向量上为 0，相比${bad(B.cone.cone2Bad)}。正交补：${B.proj.tried} 条整数直线上六条恒等式${bad(B.proj.bad)}。捏合：${B.pinch.tried} 个高斯整数矩阵上勾股${bad(B.pinch.bad)}，丢掉的质量 = |ρ₀₁|² + |ρ₁₀|² ${bad(B.pinch.massBad)}。互补语境：${B.context.tried} 个有理布洛赫向量上${bad(B.context.bad)}。舒尔：${B.schur.tried} 个二次型在 ${B.schur.grid} 个 y 上的最小值都是 A − B²/C，只在 y = −B/C 取到，${bad(B.schur.bad)}。有理单位四元数 ${B.quaternion.units} 个：堆序列与幂${bad(B.quaternion.heapBad)}，⟨x₀, xₙ⟩ = Tₙ(c) ${bad(B.quaternion.chebBad)}，${B.quaternion.spacingTried} 对等间距读数${bad(B.quaternion.spacingBad)}，κ = 1 − dist²/4 ${bad(B.quaternion.chordBad)}，${B.quaternion.groupTried} 个三元组的群分解${bad(B.quaternion.groupBad)}。十二拍 b = (99 + 20i)/101：等间距读数${bad(B.beats.bad)}。八个权重之和 ${fstr(B.weights.sum)}，前 M 项 = M(17 − M)/72 ${bad(B.weights.partialBad)}。旋子：σ 的 ${B.rotor.stops} 站上 RᵀR = I 且 det R = 1 ${bad(B.rotor.bad)}，两位观察者各自之和为 1 ${bad(B.rotor.sumBad)}。窗口：${B.fifo.tried} 种容量与拍数上 记住 + 遗忘 = n 且槽位和为 8 ${bad(B.fifo.bad)}。副本：${B.copies.n} 份记录，其中 ${B.copies.unimodular} 份重叠的模为 1、一份为 3/5；ρ₀₁ = ${cx(B.copies.rho01)} 经通道成 ${cx(B.copies.written)}，逆转那 ${B.copies.unimodular} 份后为 ${cx(B.copies.undone)}，不回到 ${cx(B.copies.rho01)}。克雷洛夫塔的维数 ${list(B.krylov.tower)}，在 m = ${B.krylov.stableAt} 处第一次不再增长，之后${bad(B.krylov.bad)}。正交记录：a = (m₀ + m₁)/√2 时 fsAngle/(π/4) ${rel(ONE, B.record)}。数值演示，不是证明。`,
      `Computed in fractions by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Rail: of the ${B.rail.stops} stops of u, ${B.rail.rationalStops} are rational points; cos²φ + sin²φ = 1, ${bad(B.rail.circleBad)}; the foot on the Thales circle, ${bad(B.rail.thalesBad)}; orthogonal legs, ${bad(B.rail.orthoBad)}; the slope buttons ${marks} each land on their stop. Hyperbola: on ${B.hyper.stops} stops cosh² r − sinh² r = 1, cosh r = Δt/Δτ and sinh r = Δx/Δτ, ${bad(B.hyper.bad)}; (cosh r − 1)/sinh r = u, ${bad(B.hyper.halfBad)}. Null cone: of ${B.cone.forms1} integer quadratic forms on ℝ × ℝ¹, ${B.cone.vanish1} vanish on the null vectors, against S(1, 0) · η, ${bad(B.cone.cone1Bad)}; of ${B.cone.forms2} on ℝ × ℝ², ${B.cone.vanish2} vanish on ${B.cone.nulls} rational null vectors, ${bad(B.cone.cone2Bad)}. Complements: the six identities on ${B.proj.tried} integer lines, ${bad(B.proj.bad)}. Pinching: Pythagoras on ${B.pinch.tried} Gaussian integer matrices, ${bad(B.pinch.bad)}; the discarded mass = |ρ₀₁|² + |ρ₁₀|², ${bad(B.pinch.massBad)}. Complementary contexts: on ${B.context.tried} rational Bloch vectors, ${bad(B.context.bad)}. Schur: for ${B.schur.tried} quadratic forms the least value over ${B.schur.grid} values of y is A − B²/C, attained only at y = −B/C, ${bad(B.schur.bad)}. ${B.quaternion.units} rational unit quaternions: heap against powers, ${bad(B.quaternion.heapBad)}; ⟨x₀, xₙ⟩ = Tₙ(c), ${bad(B.quaternion.chebBad)}; ${B.quaternion.spacingTried} equally spaced readings, ${bad(B.quaternion.spacingBad)}; κ = 1 − dist²/4, ${bad(B.quaternion.chordBad)}; the group on ${B.quaternion.groupTried} triples, ${bad(B.quaternion.groupBad)}. Twelve beats b = (99 + 20i)/101: equally spaced readings, ${bad(B.beats.bad)}. The eight weights add to ${fstr(B.weights.sum)}, the first M to M(17 − M)/72, ${bad(B.weights.partialBad)}. Rotor: at the ${B.rotor.stops} stops of σ, RᵀR = I and det R = 1, ${bad(B.rotor.bad)}; each observer adds to 1, ${bad(B.rotor.sumBad)}. Window: kept + forgotten = n and slots adding to 8 for ${B.fifo.tried} capacities and beats, ${bad(B.fifo.bad)}. Copies: ${B.copies.n} records, ${B.copies.unimodular} with overlaps of modulus 1 and one of 3/5; ρ₀₁ = ${cx(B.copies.rho01)} becomes ${cx(B.copies.written)} through the channel and ${cx(B.copies.undone)} after the ${B.copies.unimodular} are reversed, not ${cx(B.copies.rho01)} again. The Krylov tower has dimensions ${list(B.krylov.tower)}, first stops growing at m = ${B.krylov.stableAt}, and after that ${bad(B.krylov.bad)}. Orthogonal records: at a = (m₀ + m₁)/√2, fsAngle/(π/4) ${rel(ONE, B.record)}. A numerical illustration, not a proof.`
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
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.SPACETIME_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        ...m,
        at: state.at,
        scene: state.scene,
        regime: regimeOf(m),
        lens: state.lens,
        eta: state.eta,
        kseq: state.kseq,
        cam: state.cam,
        layers: layers(),
        clock: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam }
      });
    },
    /** The mathematics at a state, without touching the page. */
    calc: (over = {}) => plain(compute({ ...FRESH, ...over, at: { ...STILL, ...(over.at || {}) } })),
    presets: plain(PRESETS),
    slopes: plain(SLOPES),
    weights: () => plain(WEIGHTS),
    /** The exact core, for tests. */
    core: {
      split: (k) => plain(splitAt(k)),
      regime: (M) => plain(regimeAt(M)),
      dual: (k) => plain(dualAt(k)),
      fifo: (n, M) => plain(forgetAt(n, M)),
      load: (e, k) => plain(loadAt(e, splitAt(k))),
      rank: (rows) => rankOf(rows)
    },
    /** What the NUM box and the drawer are written from. */
    bench: () => plain({ ...BENCH, frame: FRAME }),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), sci },
    /** The world geometry: the point C, the tangent frame and the arc. */
    geometry: () => plain({ C, E1, E2, frame: LED, beat: BEAT }),
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
