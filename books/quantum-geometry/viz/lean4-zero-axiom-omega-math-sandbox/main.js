/* OMEGA//LEAN4 · 零公理 Lean 4 形式化基座 · the zero-axiom Lean 4 foundation (Chapter 32, §32.8)
   World (kit.solid): z up. A point of the ball stands for a rational line of ℚ⁴, an element of ℚP³ ≅ SO(3, ℚ): the line
   of (w, x, y, z) is drawn at the height w/‖p‖, whose square is κ(p0, p), with an azimuth from an axonometric projection
   of (x, y, z); a tuple and its negative are antipodes, and canonical tuples lie in the northern half.
     kernel   the five stages of compiling and auditing as prisms on an arch, and three routes through them;
     carrier  the integer points of one ray, their gcd and sign, and the canonical tuple with its rotation Ad(p);
     master   the eight conjuncts of omega_zero_axiom_master_check, the guard CanonProjTernion and the second-order jet;
     bridge   the form 2x² + 2xy + (3/2)y² on the line x = 1, its least value S, and the bridge to the real shell;
     tasks    four tasks on three routes through the five stages.
   The rail is the stage, the place in the normalization, the conjunct or y. The integer core follows the listing of
   §32.8; every integer operation is counted. Fractions are pairs of big integers [p, q], q > 0. A number is printed after
   “=” only when the printed decimal is the value, decided on fractions, and after “≈” when it rounds it. CENSUS holds
   counts measured once in Lean; everything else is computed here. Read-only probe: window.LEAN4_DEBUG. */
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
  const frac = (p, q = 1n) => {
    let [a, b] = [p < 0n ? -p : p, q];
    while (b) [a, b] = [b, a % b];
    return [p / a, q / a];
  };
  const whole = (n) => [BigInt(n), 1n],
    quo = ([a, b], [c, d]) => (c < 0n ? frac(-a * d, -b * c) : frac(a * d, b * c)),
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d);
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const equal = (a, b) => cmp(a, b) === 0;
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
  const parse = (s) => {
    const [p, q = '1'] = s.split('/');
    return frac(BigInt(p), BigInt(q));
  };
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
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as one
     of them. An inequality of the page stands between exact expressions; the value follows it in a parenthesis of its own. */
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction; x: the value as computed, a double. A fraction counts only while the computed double
      agrees with it: a page that computes something else says what it computes. */
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
  /** A fraction and its decimal: 1/2 = 0.5000, 4/3 ≈ 1.3333, 1 = 1.0000. */
  const both = (q, d = 4) => `${fstr(q)} ${relQ(q, d)}`;
  const ONE = whole(1);

  /* ---------- the integer core, as the listing of §32.8 defines it ----------
     Every integer +, −, ×, ÷, negation and comparison counts one step, and so does every remainder of a gcd. */
  let ticks = 0;
  const op = (x) => {
    ticks++;
    return x;
  };
  /** The value of fn and the integer steps it took. */
  function counted(fn) {
    const before = ticks,
      value = fn();
    return { value, steps: ticks - before };
  }
  const gcd = (m, n) => {
    while (m !== 0) [m, n] = [op(n % m), m];
    return n;
  };
  const Q = (num, den = 1) => ({ num, den });
  /** QRat.mkNorm. */
  function mkNorm(n, d) {
    if (op(d === 0) || op(n === 0)) return Q(0);
    const dn = abs(d),
      g = gcd(abs(n), dn),
      s = op(d > 0) ? n : op(-n);
    return Q(op(s / g), op(dn / g));
  }
  const qAdd = (a, b) => mkNorm(op(op(a.num * b.den) + op(b.num * a.den)), op(a.den * b.den)),
    qSub = (a, b) => mkNorm(op(op(a.num * b.den) - op(b.num * a.den)), op(a.den * b.den)),
    qMul = (a, b) => mkNorm(op(a.num * b.num), op(a.den * b.den)),
    qInv = (a) => mkNorm(a.den, a.num),
    qEq = (a, b) => op(a.num === b.num) && op(a.den === b.den);
  /** A QRat as a fraction. */
  const fr = (a) => frac(BigInt(a.num), BigInt(a.den));
  /** ProjTernion.normalize: the gcd, the sign that makes the first nonzero entry positive, and the tuple. */
  function normal([w, x, y, z]) {
    const g = gcd(gcd(abs(w), abs(x)), gcd(abs(y), abs(z)));
    if (op(g === 0)) return { p: [1, 0, 0, 0], g: 0, s: 1 };
    const r = [w, x, y, z].map((v) => op(v / g)),
      lead = r.findIndex((v, i) => i === 3 || op(v !== 0)),
      s = op(r[lead] > 0) ? 1 : -1;
    return { p: r.map((v) => op(s * v + 0)), g, s };
  }
  const normalize = (t) => normal(t).p;
  const qmulRaw = (a, b) => [
    op(op(op(op(a[0] * b[0]) - op(a[1] * b[1])) - op(a[2] * b[2])) - op(a[3] * b[3])),
    op(op(op(op(a[0] * b[1]) + op(a[1] * b[0])) + op(a[2] * b[3])) - op(a[3] * b[2])),
    op(op(op(op(a[0] * b[2]) - op(a[1] * b[3])) + op(a[2] * b[0])) + op(a[3] * b[1])),
    op(op(op(op(a[0] * b[3]) + op(a[1] * b[2])) - op(a[2] * b[1])) + op(a[3] * b[0]))
  ];
  const qconj = ([w, x, y, z]) => [w, op(-x), op(-y), op(-z)];
  const rawTriad = (a, b, c) => qmulRaw(qmulRaw(a, qconj(b)), c);
  const triad = (a, b, c) => normalize(rawTriad(a, b, c));
  const dotZ = (a, b) => op(op(op(op(a[0] * b[0]) + op(a[1] * b[1])) + op(a[2] * b[2])) + op(a[3] * b[3]));
  const kappa = (a, b) => mkNorm(op(dotZ(a, b) * dotZ(a, b)), op(dotZ(a, a) * dotZ(b, b)));
  const tEq = (a, b) => a.every((x, i) => op(x === b[i]));
  /** Jet2Rat: ℚ[η]/(η³). */
  const jAdd = (a, b) => a.map((x, i) => qAdd(x, b[i])),
    jMul = (a, b) => [qMul(a[0], b[0]), qAdd(qMul(a[0], b[1]), qMul(a[1], b[0])), qAdd(qAdd(qMul(a[0], b[2]), qMul(a[1], b[1])), qMul(a[2], b[0]))],
    jEq = (a, b) => a.every((x, i) => qEq(x, b[i]));
  function jInv(a) {
    const i0 = qInv(a[0]),
      u1 = qMul(a[1], i0),
      u2 = qMul(a[2], i0);
    return [i0, qSub(Q(0), qMul(i0, u1)), qMul(i0, qSub(qMul(u1, u1), u2))];
  }
  const jetBase = (x0) => {
    const x = [x0, Q(1), Q(0)];
    return jAdd([Q(1), Q(0), Q(0)], jMul(x, x));
  };
  const kappaJetAt = (x0) => jInv(jetBase(x0));
  /** The least value A − B C⁻¹ B of a rational 2 × 2 block, and rationalQuarterDepth. */
  const schur = (A, B, C) => qSub(A, qMul(qMul(B, qInv(C)), B));
  function quarterDepth(c, d, p, q) {
    let n = op(op(c * q) / op(d * p)),
      k = 0;
    for (n = Math.floor(n); !op(n < 4); k++) n = Math.floor(op(n / 4));
    return k;
  }
  const power4 = (k) => range(k).reduce((x) => op(x * 4), 1);
  /** c·q < (d·p)·4^(N+1) in integers. */
  const certified = (c, d, p, q, N) => op(op(c * q) < op(op(d * p) * power4(N + 1)));

  const P0 = [1, 0, 0, 0],
    PHALF = [1, 1, 0, 0],
    PINF = [0, 1, 0, 0],
    QHALF = [1, 0, 1, 0],
    G120 = [1, 1, 1, 1],
    ZERO4 = [0, 0, 0, 0],
    TWO4 = [2, 0, 0, 0];
  const int = (n) => String(n).replace('-', '−');
  const tuple = (t) => `(${t.map(int).join(', ')})`;
  const qText = (a) => (a.den === 1 ? int(a.num) : `${int(a.num)}/${a.den}`);
  const jetText = (j) => `(${j.map(qText).join(', ')})`;
  /** ‖p‖² and the numerators of the rotation v ↦ p v p̄/‖p‖². */
  const norm2 = (p) => p.reduce((s, x) => s + x * x, 0);
  const turn = ([w, x, y, z]) => [
    [w * w + x * x - y * y - z * z, 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), w * w - x * x + y * y - z * z, 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), w * w - x * x - y * y + z * z]
  ];
  /** The rotation written on coordinates: (x, −z, y). */
  function turnText(p) {
    const n = norm2(p);
    return `(${turn(p)
      .map((row) => {
        const terms = row.map((v, j) => [frac(BigInt(v), BigInt(n)), 'xyz'[j]]).filter(([c]) => c[0] !== 0n);
        return terms.map(([c, v], k) => `${c[0] < 0n ? '−' : k ? '+' : ''}${equal(c, ONE) || equal(c, whole(-1)) ? '' : fstr(c).replace('−', '')}${v}`).join('') || '0';
      })
      .join(', ')})`;
  }

  /* ---------- the eight conjuncts and the four tasks ---------- */
  const G2 = [1, -1, -1, -1];
  const beat2 = () => triad(G120, P0, G120);
  const CONJUNCTS = [
    { law: 'κ(p0, p0) = ⟨1, 1⟩', kappa: P0, run: () => qEq(kappa(P0, P0), Q(1)) },
    { law: 'κ(p0, pHalf) = ⟨1, 2⟩', kappa: PHALF, run: () => qEq(kappa(P0, PHALF), Q(1, 2)) },
    { law: 'κ(p0, pInf) = ⟨0, 1⟩', kappa: PINF, run: () => qEq(kappa(P0, PINF), Q(0)) },
    { law: 'κ(p0, g120) = ⟨1, 4⟩', kappa: G120, run: () => qEq(kappa(P0, G120), Q(1, 4)) },
    { law: 'gStep3 = p0', run: () => tEq(triad(beat2(), P0, G120), P0) },
    { law: 'triad pHalf pHalf g120 = g120', run: () => tEq(triad(PHALF, PHALF, G120), G120) },
    { law: 'triad pHalf p0 qHalf ≠ triad qHalf p0 pHalf', run: () => !tEq(triad(PHALF, P0, QHALF), triad(QHALF, P0, PHALF)) },
    { law: 'Jet2Rat.kappaJetAt ⟨1, 1⟩ = ⟨1/2, −1/2, 1/4⟩', run: () => jEq(kappaJetAt(Q(1)), [Q(1, 2), Q(-1, 2), Q(1, 4)]) }
  ].map((c) => {
    const { value, steps } = counted(c.run);
    return { ...c, ok: value, steps };
  });
  const MASTER_STEPS = CONJUNCTS.reduce((s, c) => s + c.steps, 0),
    MASTER_OK = CONJUNCTS.filter((c) => c.ok).length;
  const FORM = { A: Q(2), B: Q(1), C: Q(3, 2) },
    SCHUR = fr(schur(FORM.A, FORM.B, FORM.C)),
    YSTAR = minus(whole(0), fr(qMul(qInv(FORM.C), FORM.B)));
  const MAJOR = [7, 2];
  const DEPTH_MAX = 6;
  const TASKS = [
    { run: () => [qEq(kappa(P0, P0), Q(1)), qEq(kappa(P0, PHALF), Q(1, 2)), qEq(kappa(P0, PINF), Q(0)), tEq(beat2(), G2), tEq(triad(beat2(), P0, G120), P0)].every(Boolean) },
    { run: () => [tEq(triad(PHALF, P0, QHALF), G120), tEq(triad(QHALF, P0, PHALF), [1, 1, 1, -1]), !tEq(triad(PHALF, P0, QHALF), triad(QHALF, P0, PHALF))].every(Boolean) },
    { run: () => jEq(kappaJetAt(Q(1)), [Q(1, 2), Q(-1, 2), Q(1, 4)]) },
    { run: () => [qEq(schur(FORM.A, FORM.B, FORM.C), Q(4, 3)), op(quarterDepth(7, 2, 1, 10) === 2), certified(7, 2, 1, 10, 2)].every(Boolean) }
  ].map((t) => {
    const { value, steps } = counted(t.run);
    return { ok: value, steps };
  });
  /** Measured once in Lean (v4.35.0, Mathlib 56a005855ea1): the declarations reachable from one proof of each task, the set
      #print axioms walks, on the two stacks; the axioms it lists; and the one-line proof of False from the custom axiom. */
  const CENSUS = {
    lean: 'v4.35.0',
    mathlib: '56a005855ea1',
    omega: [396, 372, 379, 380],
    real: [7480, 7144, 17786, 7395],
    boom: 363,
    axioms: { omega: [], real: ['propext', 'Classical.choice', 'Quot.sound'], axiom: ['kappa_refl_bad'] },
    tendsto: [false, false, true, false]
  };
  const axiomText = (r) => (CENSUS.axioms[r].length ? `{${CENSUS.axioms[r].join(', ')}}` : '∅');

  /* ---------- the state: one rail value per card, and everything the page shows of it ---------- */
  const SCENES = ['kernel', 'carrier', 'master', 'bridge', 'tasks'];
  const ROUTES = ['omega', 'real', 'axiom'];
  /** The last stage a route reaches, counted from 0. */
  const REACH = { omega: 4, real: 3, axiom: 2 };
  const ONARCH = (scene) => scene === 'kernel' || scene === 'tasks';
  const RAYS = { half: PHALF, past: P0, inf: PINF, g: G120 },
    RAY_NAME = { half: 'pHalf', past: 'p0', inf: 'pInf', g: 'g120' };
  const GRID_Y = 48,
    Y_LOW = -64;
  // the rail of a card: its length, its speed (units per second), its keyboard step
  const RAILS = {
    kernel: { max: 4, rate: 0.9, step: 1, whole: false },
    carrier: { max: 3, rate: 0.8, step: 0.5, whole: false },
    master: { max: 7, rate: 1.6, step: 1, whole: true },
    bridge: { max: 64, rate: 16, step: 1, whole: true },
    tasks: { max: 4, rate: 0.9, step: 1, whole: false }
  };
  const STILL = { kernel: 3, carrier: 3, master: 7, bridge: 32, tasks: 4 };
  const FRESH = { route: 'omega', task: 0, ray: 'half', mult: -3, x0: 4, guard: true, N: 2, target: '1/10' };
  const state = { scene: 'kernel', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  /** The whole part and the rest of a rail value that counts. */
  function split(t) {
    const k = Math.floor(t + 1e-9);
    return { k, f: t - k < 1e-9 ? 0 : t - k };
  }
  const yAt = (v) => frac(BigInt(Y_LOW + Math.round(v)), BigInt(GRID_Y));
  /** 2 + 2y + (3/2)y², the form on the line x = 1. */
  const formAt = (y) => plus(plus(fr(FORM.A), times(times(whole(2), fr(FORM.B)), y)), times(fr(FORM.C), times(y, y)));
  function rawOf(ray, k) {
    const raw = RAYS[ray].map((x) => x * k + 0),
      n = normal(raw);
    return { k, raw, g: n.g, s: n.s, p: n.p };
  }
  function compute(s) {
    const arch = (v) => ({ ...split(Math.min(v, REACH[s.route])), route: s.route, end: REACH[s.route] }),
      p = RAYS[s.ray],
      x0 = frac(BigInt(s.x0), 4n),
      xq = Q(Number(x0[0]), Number(x0[1])),
      y = yAt(s.at.bridge),
      value = formAt(y),
      [c, d] = MAJOR,
      tq = parse(s.target),
      tp = Number(tq[0]),
      tden = Number(tq[1]),
      power = 4n ** BigInt(s.N + 1),
      left = BigInt(c * tden),
      right = BigInt(d * tp) * power;
    return {
      kernel: arch(s.at.kernel),
      carrier: { t: s.at.carrier, ray: s.ray, p, first: rawOf(s.ray, 2), second: rawOf(s.ray, s.mult), norm: norm2(p), kappa: fr(kappa(P0, p)), turn: turn(p) },
      master: { k: split(s.at.master).k, ...CONJUNCTS[split(s.at.master).k], x0, base: jetBase(xq).map(fr), jet: kappaJetAt(xq).map(fr), point: [Number(x0[1]), Number(x0[0]), 0, 0], guard: s.guard },
      bridge: { y, value, least: equal(value, SCHUR), S: SCHUR, N: s.N, target: tq, c, d, p: tp, q: tden, left, right, ok: left < right, depth: quarterDepth(c, d, tp, tden), bound: frac(BigInt(c), BigInt(d) * power), power },
      tasks: { ...arch(s.at.tasks), task: s.task, steps: TASKS[s.task].steps, ok: TASKS[s.task].ok, omega: CENSUS.omega[s.task], real: CENSUS.real[s.task] }
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
  const cams = { panorama: [-0.3, 0.34, 1], face: [-0.08, 0.1, 1], under: [0.26, -0.24, 1] };
  const PRESETS = {
    'cic-kernel-vs-axiom-and-real-tax': { scene: 'kernel', cam: 'panorama', play: true, still: STILL.kernel },
    'canonical-proj-ternion-zero-quotient': { scene: 'carrier', cam: 'face', play: true, still: STILL.carrier },
    'typeclass-consistency-and-jet2-decide': { scene: 'master', cam: 'face', play: true, still: STILL.master },
    'rational-schur-and-shadow-functor-bridge': { scene: 'bridge', cam: 'face', play: true, still: STILL.bridge },
    'three-step-omegacore-roadmap-benchmark': { scene: 'tasks', cam: 'panorama', play: true, still: STILL.tasks }
  };
  const DEFAULT = 'cic-kernel-vs-axiom-and-real-tax';

  /* ---------- the stage ---------- */
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
  let cam = basis(...cams.panorama);
  /** A point x to the right, y up and d towards the viewer. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  const LIFT = 1.014;
  /* the azimuth of a line: an axonometric projection of (x, y, z) to the horizontal plane */
  const AXON = [
    [cs((-20 * PI) / 180), sn((-20 * PI) / 180)],
    [cs((-160 * PI) / 180), sn((-160 * PI) / 180)],
    [0.45, 0]
  ];
  /** The direction of a quaternion: the height w/‖p‖, the azimuth of its axis. */
  function dir(q) {
    const n = norm(q),
      h = q[0] / n,
      r = Math.sqrt(Math.max(0, 1 - h * h)),
      a = [0, 1].map((i) => q[1] * AXON[0][i] + q[2] * AXON[1][i] + q[3] * AXON[2][i]),
      m = hypot(...a);
    return r < 1e-12 || m < 1e-12 ? [0, 0, h] : [(r * a[0]) / m, (r * a[1]) / m, h];
  }
  const on = (q, r = LIFT) => scale(dir(q), r);
  /** The great arc between two lines, through the unit quaternions. */
  const arcOf = (a, b, n = 40, r = LIFT) => {
    const u = unit(a),
      v = unit(b),
      om = Math.acos(clamp(dot(u, v), -1, 1));
    return om < 1e-9 ? [on(u, r)] : sample(n, (t) => on(add(scale(u, sn((1 - t) * om)), scale(v, sn(t * om))), r));
  };
  /* the arch of the pipeline: five stages over the ball, three lanes side by side */
  const ARCH_R = 1.38,
    ARCH_X = 1.42,
    ARCH_Z = 1.17,
    LANE = { omega: 0, axiom: -0.44, real: 0.42 };
  const archAngle = (v) => ((158 - 34 * v) * PI) / 180;
  /** The elliptic arch; r − ARCH_R is the distance outward from it. */
  const archPoint = (v, lane, r = ARCH_R) => [(ARCH_X + r - ARCH_R) * cs(archAngle(v)), lane, (ARCH_Z + r - ARCH_R) * sn(archAngle(v))];
  const plateAngle = (k) => ((172 - (164 / 7) * k) * PI) / 180;
  const platePoint = (k, r = ARCH_R) => [(ARCH_X + r - ARCH_R) * cs(plateAngle(k)), 0, (ARCH_Z + r - ARCH_R) * sn(plateAngle(k))];
  const FLOAT = 0.18;
  /* the rays of the carrier card: the multiple k of a tuple stands at the distance 1 + STEP |k| */
  const STEP = 0.16;
  const rayPoint = (p, k) => scale(dir(p), Math.sign(k) * (1 + STEP * abs(k)));
  /** From −p to p by half a turn in front of the ball. */
  function swing(p, u, r = 1 + STEP) {
    const d = dir(p),
      front = [0.25, -1, 0],
      v = unit(sub(front, scale(d, dot(front, d)))),
      a = PI * (1 - u);
    return add(scale(d, r * cs(a)), scale(v, r * sn(a)));
  }
  /** The place of a raw multiple on its way through the normalization, t from 0 to 3. */
  function wayOf(p, k, t) {
    const s = Math.sign(k);
    if (t <= 1) return rayPoint(p, s * lerp(abs(k), 1, t));
    if (t <= 2) return s > 0 ? rayPoint(p, 1) : swing(p, t - 1);
    return scale(dir(p), lerp(1 + STEP, LIFT, t - 2));
  }
  /* the form on the bridge card: a section of the ellipsoid {2x² + 2xy + (3/2)y² = value}, to scale, beside the ball */
  const FORM_AT = [-1.28, -0.66, -0.3],
    FORM_S = 0.36,
    formPoint = (x, y, d = 0) => [FORM_AT[0] + FORM_S * x, FORM_AT[1] + d, FORM_AT[2] + FORM_S * (y + 0.45)];
  /** The half axes of x² A + 2xyB + y² C = v, and their directions. */
  function ellipse(v) {
    const [A, B, C] = [2, 1, 1.5],
      m = (A + C) / 2,
      r = hypot((A - C) / 2, B),
      th = 0.5 * Math.atan2(2 * B, A - C);
    return { a: Math.sqrt(v / (m + r)), b: Math.sqrt(v / (m - r)), e: [cs(th), sn(th)], f: [-sn(th), cs(th)] };
  }
  const SHELL = 1.36;
  const BRIDGE_DIR = unit([0.93, -0.28, 0.22]);
  /** The world point of the amber mark for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'carrier':
        return wayOf(RAYS[state.ray], state.mult, v);
      case 'master':
        return platePoint(v, ARCH_R + FLOAT);
      case 'bridge':
        return formPoint(1, fval(yAt(v)), -0.02);
      default:
        return archPoint(Math.min(v, REACH[state.route]), LANE[state.route], ARCH_R + FLOAT);
    }
  }
  /** Fit what the cards draw, between the title and the legend. */
  const BALL = [-1.03, 1.03, -1.03, 1.03];
  /** The right, left, low and high ends of the ball and some world points as they are seen now. */
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const grow = ([x0, x1, y0, y1], l, r, b, t) => [x0 - l, x1 + r, y0 - b, y1 + t];
  const lanePoints = () => ROUTES.flatMap((r) => range(9).map((k) => archPoint(k / 2, LANE[r], ARCH_R + (r === 'omega' ? 0.2 : 0.12))));
  const SIDE = {
    kernel: () => grow(around(lanePoints()), small() ? 0.02 : 0.2, small() ? 0.02 : 0.2, 0, 0.04),
    carrier: () => {
      const b = around([PHALF, RAYS[state.ray]].flatMap((p) => [rayPoint(p, 4), rayPoint(p, -4)]));
      return [Math.min(-1.2, b[0]), Math.max(small() ? 1.95 : 2.2, b[1]), b[2], b[3]];
    },
    master: () => grow(around(range(8).map((k) => platePoint(k, ARCH_R + 0.14))), 0.02, below ? 0.02 : small() ? 0.62 : 1.02, below ? 0.94 : 0, 0.04),
    bridge: () => [-1.82, small() ? 1.42 : 1.7, -1.26, 1.26],
    tasks: () => grow(around(lanePoints()), small() ? 0.02 : 0.2, small() ? 0.02 : 0.2, 0, 0.04)
  };
  /* the room of the title: while a card, a lens and a size last, a line that gets shorter gives none of it back, so that
     the picture keeps its place under a drag */
  const title = { key: '', top: 0 };
  function fit(w, m) {
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
    const unitOf = ([x0, x1, y0, y1]) => Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0));
    if (w.master > 0) {
      const [beside, under] = [false, true].map((b) => {
        below = b;
        return unitOf(SIDE.master(m));
      });
      below = small() && under > beside;
    }
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k](m)]),
      [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    const u = Math.max(8, unitOf([x0, x1, y0, y1]));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }
  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  const solid = (key, mesh, color, alpha = 1, edges = P.ink) => alpha > 0.01 && sc.poly(alpha < 0.99 ? key + '~' : key, mesh, { color, alpha, edges, pick: false, occlude: false });
  /* the weights of the two stacks in the two lenses: the zero-axiom stack cyan, the classical contrast magenta */
  const weight = () => (state.lens ? { exact: 0.45, flat: 1 } : { exact: 1, flat: 0.8 });
  function drawBall() {
    // brighter towards p0, darker in the southern half: the shade follows the height w/‖p‖, whose square is κ(p0, p)
    const at = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface('ball', at, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03, rim: 0.4 });
    sc.circle([0, 0, 0], [0, 0, 1], LIFT, { color: P.violet, width: 1.6, alpha: 0.9, back: 0.2 });
  }
  /** A six-sided prism at c: its axis along y, its outer face along the direction u of the arch. */
  function prism(c, u, r = 0.095, half = 0.12) {
    const t = cross([0, 1, 0], u),
      ring = (y) => range(6).map((k) => add(add(c, scale(u, r * cs((TAU * (k + 0.5)) / 6))), add(scale(t, r * sn((TAU * (k + 0.5)) / 6)), [0, y, 0])));
    return { vertices: [...ring(-half), ...ring(half)], faces: [[5, 4, 3, 2, 1, 0], [6, 7, 8, 9, 10, 11], ...range(6).map((k) => [k, (k + 1) % 6, 6 + ((k + 1) % 6), 6 + k])] };
  }
  const octahedron = (c, r) => ({ vertices: [[r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]].map((d) => add(c, d)), faces: [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]] });
  /** A thin slab across a lane: the route ends here. */
  function slab(v, lane, r = 0.17) {
    const c = archPoint(v, lane),
      a = archAngle(v),
      u = [cs(a), 0, sn(a)],
      t = [-sn(a), 0, cs(a)];
    const corner = (x, y, z) => add(c, add(scale(u, x * r), add([0, y * 0.13, 0], scale(t, z * 0.022))));
    return { vertices: [corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1), corner(-1, -1, 1), corner(1, -1, 1), corner(1, 1, 1), corner(-1, 1, 1)], faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] };
  }
  const archRun = (from, to, lane, r = ARCH_R) => sample(Math.max(2, Math.ceil(12 * abs(to - from))), (u) => archPoint(lerp(from, to, u), lane, r));
  const FALSE_AT = [0.14, -1.0, 0.86];
  /** The three lanes: how far each is lit, its prisms, its end. */
  function drawLanes(a, m, full, trees) {
    const { exact, flat } = weight(),
      at = m.k + m.f;
    for (const r of ROUTES) {
      const lane = LANE[r],
        own = r === m.route,
        color = r === 'omega' ? P.cyan : P.magenta,
        strong = (r === 'omega' ? exact : flat) * a,
        // the routes that are not followed stand lit up to their end
        lit = own ? at : REACH[r];
      tube('lane-' + r, archRun(0, Math.max(0.02, lit), lane), color, r === 'omega' ? 0.03 : 0.02, strong);
      if (lit < 4) sc.line(archRun(Math.max(0.02, lit), 4, lane), { color, width: 1.2, dash: [4, 5], alpha: 0.5 * strong });
      const shown = full || r === 'omega' ? 5 : REACH[r] + 1;
      for (let k = 0; k < shown; k++) {
        const here = own && m.f === 0 && k === m.k,
          reached = k <= lit + 1e-9 && k <= REACH[r],
          ang = archAngle(k),
          big = r === 'omega' || full;
        solid(`prism-${r}${k}`, prism(archPoint(k, lane), [cs(ang), 0, sn(ang)], big ? 0.095 : 0.062, big ? 0.12 : 0.08), here ? P.amber : reached ? color : P.violet, here ? a : reached ? strong : 0.4 * a);
      }
      if (r !== 'omega' && lit >= REACH[r] - 1e-9) solid('slab-' + r, slab(REACH[r] + (r === 'axiom' ? 0.32 : 0.4), lane), P.magenta, strong);
    }
    // the side trees of the real lane: filters where a limit is taken
    for (const v of trees ? [1.25, 1.67, 2.09, 2.51] : []) {
      sc.line([archPoint(v, LANE.real, ARCH_R + 0.03), archPoint(v + 0.06, LANE.real + 0.04, ARCH_R + 0.2)], { color: P.magenta, width: 1.6, alpha: 0.85 * flat * a });
      for (const s of [-1, 1]) sc.line([archPoint(v + 0.04, LANE.real + 0.03, ARCH_R + 0.12), archPoint(v + 0.05 + 0.1 * s, LANE.real + 0.03, ARCH_R + 0.2)], { color: P.magenta, width: 1.2, alpha: 0.75 * flat * a });
    }
    // the custom axiom falls from its stop to the crystal False
    if (m.route !== 'axiom' || at >= REACH.axiom - 1e-9) {
      const from = archPoint(REACH.axiom, LANE.axiom, ARCH_R - 0.08);
      sc.line([from, FALSE_AT], { color: P.magenta, width: 1.8, dash: [5, 4], alpha: flat * a });
      solid('false', octahedron(FALSE_AT, 0.085), P.magenta, flat * a);
    }
  }
  /** The stations of κ on the ball: p0, pHalf, pInf, g120 and the circles κ = 1/2, 1/4. */
  const STATIONS = [
    ['p0', P0],
    ['pHalf', PHALF],
    ['pInf', PINF],
    ['g120', G120]
  ];
  function drawStations(a, rings = true) {
    const { exact } = weight();
    if (rings)
      for (const h of [Math.SQRT1_2, 0.5]) sc.circle([0, 0, h], [0, 0, 1], Math.sqrt(1 - h * h) * LIFT, { color: P.cyan, width: 1.1, alpha: 0.55 * a * exact, back: 0.2 });
    for (const [name, p] of STATIONS) sc.bead(on(p), { color: P.cyan, r: 4.2, alpha: a * exact, key: 'st-' + name });
  }
  function drawKernel(m, a) {
    if (a < 0.01) return;
    const { exact } = weight();
    drawLanes(a, m.kernel, false, true);
    drawStations(a);
    tube('kernel-arc', arcOf(P0, PHALF), P.cyan, 0.016, a * exact);
    // what the present stage works on: the reading κ(p0, pHalf) on the ball
    if (m.kernel.route === 'omega') sc.line([archPoint(m.kernel.k + m.kernel.f, 0, ARCH_R - 0.09), on(PHALF)], { color: P.cyan, width: 1.2, dash: [3, 4], alpha: 0.8 * a * exact });
  }
  const GLYPH = () => ({ c: [small() ? 1.5 : 1.72, small() ? -0.62 : -0.52], r: small() ? 0.4 : 0.44 });
  const GLYPH_AXES = [
    [0.8, -0.42],
    [-0.8, -0.42],
    [0, 0.98]
  ];
  const glyphPoint = (v, k = 1) => {
    const { c, r } = GLYPH();
    return seen(c[0] + k * r * (v[0] * GLYPH_AXES[0][0] + v[1] * GLYPH_AXES[1][0] + v[2] * GLYPH_AXES[2][0]), c[1] + k * r * (v[0] * GLYPH_AXES[0][1] + v[1] * GLYPH_AXES[1][1] + v[2] * GLYPH_AXES[2][1]), 0.4);
  };
  /** The vector v turned by the share u of the rotation of p. */
  function turned(p, u, v) {
    const n = norm(p),
      im = p.slice(1),
      s = norm(im);
    if (s < 1e-12) return v;
    const half = u * Math.atan2(s, p[0]),
      q = [cs(half), ...scale(im, sn(half) / s)],
      M = turn(q);
    return M.map((row) => dot(row, v));
  }
  function drawCarrier(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      c = m.carrier,
      { p } = c;
    drawStations(a);
    // the line of p through the ball, with its integer points
    for (const s of [1, -1]) {
      sc.line([rayPoint(p, s * 0.05), rayPoint(p, s * 4.5)], { color: P.cyan, width: 1.3, alpha: 0.75 * a * exact });
      for (let k = 1; k <= 4; k++) sc.bead(rayPoint(p, s * k), { color: P.cyan, r: 2.8, alpha: a * exact, key: `lattice${s * k}` });
    }
    // the two raw tuples: the first in cyan, the second carries the amber mark; magenta marks where they came from
    for (const [key, k] of [['raw1', c.first.k], ['raw2', c.second.k]]) {
      sc.bead(rayPoint(p, k), { color: P.cyan, r: 4.6, alpha: a * exact, key });
      sc.ring(rayPoint(p, k), { color: P.cyan, r: 9, alpha: a * exact, key: key + 'ring' });
    }
    const first = wayOf(p, c.first.k, c.t);
    if (c.t < 3 - 1e-9) sc.bead(first, { color: P.cyan, r: 5.4, alpha: a * exact, key: 'first' });
    // the trace of the amber tuple: along the ray, round the ball, down to the surface
    const trace = (t0, t1) => sample(30, (u) => wayOf(p, c.second.k, lerp(t0, t1, u)));
    if (c.t > 1e-6) tube('slide', trace(0, Math.min(1, c.t)), P.cyan, 0.02, a * exact);
    if (c.second.s < 0) {
      sc.line(trace(1, 2), { color: P.cyan, width: 1.2, dash: [5, 5], alpha: 0.6 * a * exact });
      if (c.t > 1 + 1e-6) tube('swing', trace(1, Math.min(2, c.t)), P.cyan, 0.014, a * exact);
    }
    // Ad(p): the axes before (violet) and after (cyan) the rotation, an integer matrix
    const share = clamp(c.t - 2, 0, 1),
      E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    E.forEach((v) => sc.line([glyphPoint([0, 0, 0]), glyphPoint(v)], { color: P.violet, width: 1.6, alpha: 0.9 * a }));
    E.forEach((v) => sc.arrow(glyphPoint(turned(p, share, v), 0.04), glyphPoint(turned(p, share, v), 0.84), { color: P.cyan, width: 2.4, headSize: 9, alpha: a * exact }));
    if (state.lens && c.norm !== 1 && Math.sqrt(c.norm) % 1 !== 0) {
      // the decimal unit spinor of the contrast: a magenta ring just off the point
      sc.ring(on(p, LIFT + 0.02), { color: P.magenta, r: 12, alpha: a * flat, normal: dir(p), key: 'decimal' });
    }
  }
  /* the half circle of the three beats: 1, g120, its square and its cube before the signs are locked */
  const beatPoint = (u) => on([cs(PI * u), ...range(3).map(() => sn(PI * u) / Math.sqrt(3))]);
  /** On a narrow tall stage the panel and the guard stand below the ball instead of beside it. */
  let below = false;
  const PANEL = () => (below ? { c: [0.72, -1.56], w: 0.62, h: 0.3 } : { c: [small() ? 1.68 : 1.98, -0.6], w: small() ? 0.4 : 0.56, h: 0.38 });
  const panelPoint = (x, y) => {
    const { c, w, h } = PANEL();
    return seen(c[0] + (w * x) / 2.2, c[1] + h * (2 * y - 1), 0.5);
  };
  const GATE = () => (below ? [-1.05, -1.56] : [small() ? 1.7 : 1.96, 0.5]);
  function drawMaster(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      k = m.master.k,
      done = (j) => j <= k,
      at = (j) => (j === k ? 1 : done(j) ? 0.5 : 0) * a * exact;
    // the plates of the eight conjuncts
    tube('plates', sample(60, (u) => platePoint(u * Math.max(k, 0.02))), P.cyan, 0.016, a * exact);
    sc.line(sample(60, (u) => platePoint(7 * u)), { color: P.cyan, width: 1, dash: [3, 5], alpha: 0.45 * a * exact });
    for (let j = 0; j < 8; j++) {
      const ang = plateAngle(j),
        here = j === k;
      solid('plate' + j, prism(platePoint(j), [cs(ang), 0, sn(ang)], 0.085, 0.07), here ? P.amber : done(j) ? (CONJUNCTS[j].ok ? P.cyan : P.magenta) : P.violet, here ? a : done(j) ? a * exact : 0.4 * a);
    }
    drawStations(a, false);
    for (const [j, h] of [[1, Math.SQRT1_2], [3, 0.5]]) if (done(j)) sc.circle([0, 0, h], [0, 0, 1], Math.sqrt(1 - h * h) * LIFT, { color: P.cyan, width: j === k ? 1.8 : 1.1, alpha: (j === k ? 0.95 : 0.5) * a * exact, back: 0.2 });
    if (k === 0) sc.ring(on(P0), { color: P.cyan, r: 9, alpha: a * exact, normal: [0, 0, 1], key: 'self' });
    if (at(1)) tube('c1', arcOf(P0, PHALF), P.cyan, 0.016, at(1));
    if (at(2)) tube('c2', arcOf(P0, PINF), P.cyan, 0.012, at(2));
    if (at(3)) tube('c3', arcOf(P0, G120), P.cyan, 0.016, at(3));
    if (done(4)) {
      tube('beats', sample(60, beatPoint), P.cyan, k === 4 ? 0.022 : 0.014, at(4));
      for (const u of [2 / 3, 1]) sc.bead(beatPoint(u), { color: P.cyan, r: 4, alpha: at(4), key: 'beat' + u });
    }
    if (k === 5) {
      tube('c5', arcOf(PHALF, G120), P.cyan, 0.016, at(5));
      sc.ring(on(PHALF), { color: P.cyan, r: 9, alpha: at(5), normal: dir(PHALF), key: 'absorb' });
      sc.ring(on(G120), { color: P.cyan, r: 9, alpha: at(5), normal: dir(G120), key: 'kept' });
    }
    if (done(6)) {
      // (1 + i)(1 + tj) and (1 + j)(1 + ti): two orders, two ends
      tube('fwd', sample(24, (t) => on([1, 1, t, t])), P.cyan, 0.018, at(6));
      tube('fwd0', arcOf(P0, PHALF), P.cyan, 0.018, at(6));
      tube('rev', sample(24, (t) => on([1, t, 1, -t])), P.magenta, 0.018, (k === 6 ? 1 : 0.6) * a * flat);
      tube('rev0', arcOf(P0, QHALF), P.magenta, 0.018, (k === 6 ? 1 : 0.6) * a * flat);
      sc.bead(on(QHALF), { color: P.magenta, r: 4.2, alpha: a * flat, key: 'qHalf' });
      sc.bead(on([1, 1, 1, -1]), { color: P.magenta, r: 5, alpha: a * flat, key: 'other' });
      sc.line(sample(20, (t) => on([1, 1, 1, 1 - 2 * t])), { color: P.magenta, width: 1.6, dash: [4, 4], alpha: a * flat });
    }
    // the panel of the jet: κ = 1/(1 + x²), and the parabola j₀ + j₁η + j₂η² at x₀
    const bright = (k === 7 ? 1 : 0.55) * a,
      x0 = fval(m.master.x0),
      [j0, j1, j2] = m.master.jet.map(fval),
      kap = (x) => 1 / (1 + x * x);
    sc.line([panelPoint(-2.2, 0), panelPoint(2.2, 0)], { color: P.ink, width: 1, alpha: 0.6 * a });
    sc.line([panelPoint(0, 0), panelPoint(0, 1.1)], { color: P.ink, width: 1, alpha: 0.4 * a });
    sc.line(sample(60, (u) => panelPoint(-2.2 + 4.4 * u, kap(-2.2 + 4.4 * u))), { color: P.cyan, width: 2.2, alpha: bright * exact });
    const span = [0.75, 0.6, 0.45, 0.3].find((d) => [-d, d].every((e) => abs(x0 + e) <= 2.2 && j0 + j1 * e + j2 * e * e > -0.12 && j0 + j1 * e + j2 * e * e < 1.2)) || 0.25;
    sc.line(sample(24, (u) => { const e = span * (2 * u - 1); return panelPoint(clamp(x0 + e, -2.2, 2.2), j0 + j1 * e + j2 * e * e); }), { color: P.violet, width: 2.6, alpha: bright });
    sc.bead(panelPoint(x0, j0), { color: P.cyan, r: 4.4, alpha: bright * exact, key: 'jet' });
    if (k === 7) sc.bead(on(m.master.point), { color: P.cyan, r: 5.6, alpha: a * exact, key: 'jetBall' });
    // the guard: a cyan ring that stops the two raw tuples, or lets them through to p0
    const [gx, gy] = GATE(),
      closed = m.master.guard;
    sc.line(sample(48, (u) => seen(gx - 0.02 + 0.1 * cs(TAU * u), gy + 0.34 * sn(TAU * u), 0.45)), { color: P.cyan, width: closed ? 3 : 1.2, dash: closed ? null : [3, 5], alpha: (closed ? 1 : 0.6) * a * exact });
    [[0.2, ZERO4], [-0.14, TWO4]].forEach(([dy, t], i) => {
      const far = seen(gx + (small() ? 0.3 : 0.38), gy + dy, 0.45),
        stop = closed ? seen(gx + 0.12, gy + dy, 0.45) : on(P0, 1.05 + 0.05 * i);
      sc.arrow(far, stop, { color: P.magenta, width: 1.8, headSize: 8, alpha: a * flat, dash: closed ? null : [5, 4] });
      sc.bead(closed ? far : stop, { color: P.magenta, r: 4.6, alpha: a * flat, key: i ? 'z2' : 'z0' });
    });
  }
  function drawBridge(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      b = m.bridge,
      v = fval(b.value),
      E = ellipse(v);
    drawStations(0.8 * a, false);
    // the section of the present value, thickened to an ellipsoid; the line x = 1 and the least section
    const at = (u, w) => {
      const x = E.a * sn(u) * cs(w),
        y = E.b * sn(u) * sn(w);
      return formPoint(x * E.e[0] + y * E.f[0], x * E.e[1] + y * E.f[1], 0.14 * cs(u));
    };
    sc.surface('form' + (a * exact < 0.99 ? '~' : ''), at, { u: [0, PI], v: [0, TAU], nu: 18, nv: 48, colors: [P.stage, P.cyan], range: [-0.9, 1.1], value: (u) => -cs(u), alpha: a * exact < 0.99 ? a * exact : 1, grid: { every: [6, 8], alpha: 0.16 }, pick: false, occlude: false });
    const section = (val, d) => {
      const e = ellipse(val);
      return sample(64, (u) => formPoint(e.a * cs(TAU * u) * e.e[0] + e.b * sn(TAU * u) * e.f[0], e.a * cs(TAU * u) * e.e[1] + e.b * sn(TAU * u) * e.f[1], d));
    };
    sc.line(section(fval(b.S), -0.15), { color: P.ink, width: 1.4, dash: [4, 4], alpha: 0.9 * a });
    sc.line([formPoint(1, -1.75, -0.02), formPoint(1, 0.62, -0.02)], { color: P.ink, width: 1.8, alpha: 0.95 * a });
    // the real shell outside, and the one-way bridge to it
    sc.glass('shell', [0, 0, 0], SHELL, { color: P.magenta, alpha: 0.02 * a, rim: 0.42 * flat * a });
    for (const n of [[0, 0, 1], [0.5, -0.4, 0.77]]) sc.circle([0, 0, 0], n, SHELL, { color: P.magenta, width: 1, alpha: 0.5 * a * flat, back: 0.3, dash: [4, 6] });
    const from = scale(BRIDGE_DIR, 1.02),
      to = scale(BRIDGE_DIR, SHELL);
    sc.bead(from, { color: P.cyan, r: 5, alpha: a * exact, key: 'cert' });
    if (b.ok) {
      tube('bridge', [from, scale(BRIDGE_DIR, SHELL - 0.12)], P.amber, 0.03, a, 0.5);
      sc.arrow(scale(BRIDGE_DIR, SHELL - 0.2), to, { color: P.amber, width: 3, headSize: 15, alpha: a });
      sc.bead(to, { color: P.magenta, r: 5, alpha: a * flat, key: 'real' });
    } else sc.line([from, to], { color: P.magenta, width: 1.6, dash: [4, 5], alpha: a * flat });
  }
  function drawTasks(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      t = m.tasks.task;
    drawLanes(a, m.tasks, true, CENSUS.tendsto[t]);
    drawStations(a, t !== 3);
    if (t === 0) {
      tube('t-beats', sample(60, beatPoint), P.cyan, 0.02, a * exact);
      for (const u of [1 / 3, 2 / 3, 1]) sc.bead(beatPoint(u), { color: P.cyan, r: 4.6, alpha: a * exact, key: 't-beat' + u });
    }
    if (t === 1) {
      tube('t-fwd0', arcOf(P0, PHALF), P.cyan, 0.02, a * exact);
      tube('t-fwd', sample(24, (u) => on([1, 1, u, u])), P.cyan, 0.02, a * exact);
      tube('t-rev0', arcOf(P0, QHALF), P.magenta, 0.016, a * flat);
      tube('t-rev', sample(24, (u) => on([1, u, 1, -u])), P.magenta, 0.016, a * flat);
      sc.bead(on([1, 1, 1, -1]), { color: P.magenta, r: 5, alpha: a * flat, key: 't-other' });
    }
    if (t === 2) {
      tube('t-mer', arcOf(P0, PINF, 60), P.cyan, 0.02, a * exact);
      sc.bead(on(PHALF, LIFT + 0.02), { color: P.cyan, r: 6, alpha: a * exact, key: 't-x0' });
    }
    if (t === 3) {
      const h = Math.sqrt(1 / 3);
      sc.circle([0, 0, h], [0, 0, 1], Math.sqrt(2 / 3) * LIFT, { color: P.cyan, width: 2, alpha: a * exact, back: 0.2 });
      tube('t-schur', arcOf(P0, [1, 1, 1, 0]), P.cyan, 0.018, a * exact);
    }
  }

  /* ---------- words ---------- */
  const ROUTE_NAME = { omega: 'QRat (Init)', real: 'Mathlib.Real', axiom: 'axiom' };
  const STAGE_NAME = [
    ['载体', 'carrier'],
    ['类型检查', 'typecheck'],
    ['decide', 'decide'],
    ['#print axioms', '#print axioms'],
    ['#eval', '#eval']
  ];
  const TASK_NAME = [
    ['{0, 1/2, 1} 与三拍闭合', '{0, 1/2, 1} & 3-beat closure'],
    ['非阿贝尔三元和乐', 'non-abelian triad holonomy'],
    ['二阶射流曲率', 'Jet2 algebraic curvature'],
    ['有理舒尔与深度证书', 'rational Schur & depth certificate']
  ];
  const TASK_SHORT = [
    ['三拍', 'beats'],
    ['和乐', 'holonomy'],
    ['射流', 'jet'],
    ['舒尔', 'Schur']
  ];
  const taskName = (t, say = L) => say(...TASK_NAME[t]).replace('&', '&amp;');
  const SCENE_NAME = {
    kernel: [['五阶流水线', 'FIVE STAGES'], ['三条公理与一条假公理（MODEL）', 'THREE AXIOMS, ONE FALSE (MODEL)']],
    carrier: [['规范整数载体', 'CANONICAL INTEGER CARRIER'], ['先归一化的旋量（MODEL）', 'NORMALIZED SPINOR (MODEL)']],
    master: [['八条断言', 'EIGHT CONJUNCTS'], ['实数栈里的断言（MODEL）', 'THE REAL STACK (MODEL)']],
    bridge: [['有理舒尔与单向桥', 'RATIONAL SCHUR, ONE-WAY BRIDGE'], ['实数侧的证明（MODEL）', 'THE REAL SIDE (MODEL)']],
    tasks: [['四项任务（MODEL）', 'FOUR TASKS (MODEL)'], ['实数栈的账（MODEL）', 'THE REAL STACK (MODEL)']]
  };
  const LENS_NAME = [
    ['有理算例', 'RATIONAL EXAMPLES'],
    ['传统对照 (MODEL)', 'CONTRAST (MODEL)']
  ];
  /** The task whose Lean statement holds a conjunct. */
  const taskOf = (k) => (k < 5 ? 0 : k < 7 ? 1 : 2);
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read this one value. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'kernel':
      case 'tasks': {
        const r = m[state.scene];
        return r.f > 0 ? 'moving' : r.route + (r.k + 1);
      }
      case 'carrier':
        return m.carrier.t < 1 ? 'raw' : m.carrier.t < 2 ? 'gcd' : m.carrier.t < 3 ? 'sign' : 'canon';
      case 'master':
        return 'c' + (m.master.k + 1);
      default:
        return m.bridge.least ? 'least' : 'above';
    }
  }
  const signed = (s) => (s < 0 ? '−1' : '+1');
  const reduced = (r) => tuple(r.raw.map((x) => x / r.g + 0));
  /** The spinor of a tuple in four decimals, cut towards 0: 1/√n, and the squared norm it leaves. */
  function decimalSpinor(n) {
    const root = Math.round(Math.sqrt(n));
    if (root * root === n) return { root };
    let d = Math.floor(10000 / Math.sqrt(n));
    while ((d + 1) * (d + 1) * n <= 1e8) d++;
    while (d * d * n > 1e8) d--;
    return { root: 0, d: frac(BigInt(d), 10000n), rest: frac(BigInt(d * d * n), 100000000n) };
  }
  const kappaText = (q) => `κ = ${both(q)}`;
  /** What a route does at a stage, in one sentence. */
  function stageText(route, k, say = L) {
    if (route === 'omega')
      return [
        say('原型隐式导入标准 Init。ProjTernion 存储四个整数，QRat 存储 Int × Nat。', 'The prototype implicitly imports standard Init. ProjTernion stores four integers and QRat stores an Int × Nat pair.'),
        say('原型声明 OmegaSpace 的字段，构造实例还须证明各字段。', 'The prototype declares the OmegaSpace fields. An instance requires proofs of those fields.'),
        say(`decide 核验 ${MASTER_OK} 条有限断言。网页重算这些例子用了 ${MASTER_STEPS} 步整数运算。`, `Lean checks ${MASTER_OK} finite assertions by decide. The browser recomputes the examples in ${MASTER_STEPS} integer steps.`),
        say('在隐式导入标准 Init 的原型中，#print axioms omega_zero_axiom_master_check 给出空清单。', 'With implicit standard Init, #print axioms omega_zero_axiom_master_check reports an empty list.'),
        say(`#eval 原生执行：triad pHalf p0 qHalf 输出 ${tuple(triad(PHALF, P0, QHALF))}。`, `#eval runs natively: triad pHalf p0 qHalf prints ${tuple(triad(PHALF, P0, QHALF))}.`)
      ][k];
    if (route === 'real')
      return [
        say('Real 用柯西列的商构造。这里对照的实数圆周桥接定理在官方端有三条公理。', 'Real is built from a quotient of Cauchy sequences. The official real circle bridge has three recorded axioms.'),
        say('类型检查照常通过。', 'It typechecks as usual.'),
        say('decide 停在 Classical.choice；要改用 norm_num 一类的证明。', 'decide stops at Classical.choice; a proof by norm_num and the like takes its place.'),
        say(`官方 OmegaShadowBridge.cayley_circle_unit 的公理为 ${axiomText('real')}；1/2 : ℝ 是 noncomputable，第 5 阶不通。`, `Official OmegaShadowBridge.cayley_circle_unit uses ${axiomText('real')}. The example 1/2 : ℝ is noncomputable, so stage 5 is closed.`)
      ][k];
    return [
      say('axiom kappa_refl_bad 写在全部四元组上：κ(x, x) = ⟨1, 1⟩，漏掉了零元组。', 'axiom kappa_refl_bad is stated for all quadruples, κ(x, x) = ⟨1, 1⟩: the zero tuple is forgotten.'),
      say('内核照单全收，类型检查不拦。', 'The kernel accepts it; typechecking does not stop it.'),
      say(`代入 z₀ = ${tuple(ZERO4)}：⟨0, 1⟩ = ⟨1, 1⟩，一步推出 False；decide 在没有归约规则的常量上卡住。`, `At z₀ = ${tuple(ZERO4)} it says ⟨0, 1⟩ = ⟨1, 1⟩, hence False; decide is stuck on a constant without a reduction rule.`)
    ][k];
  }
  const movingText = (r) => L(`${ROUTE_NAME[r.route]}：从第 ${r.k + 1} 阶走向第 ${r.k + 2} 阶。`, `${ROUTE_NAME[r.route]}: from stage ${r.k + 1} to stage ${r.k + 2}.`);
  const contrastText = () =>
    L(
      `Mathlib.Real：decide 停在 Classical.choice，公理 ${axiomText('real')}，1/2 : ℝ 是 noncomputable。axiom kappa_refl_bad：代入 ${tuple(ZERO4)} 推出 False。`,
      `Mathlib.Real: decide stops at Classical.choice, axioms ${axiomText('real')}, 1/2 : ℝ is noncomputable. axiom kappa_refl_bad: ${tuple(ZERO4)} yields False.`
    );
  const boundText = (b) => `(1/4)${superscript(b.N + 1)} C ≤ ${fstr(b.bound)} &lt; ${fstr(b.target)}`;
  const certText = (b) => `cq = ${b.left} ${b.ok ? '&lt;' : '≥'} dp·4${superscript(b.N + 1)} = ${b.right}`;
  const guardText = (g, say = L) =>
    g
      ? say(`守卫开：${tuple(ZERO4)} 与 ${tuple(TWO4)} 不是规范元，被拦下。`, `Guard on: ${tuple(ZERO4)} and ${tuple(TWO4)} are not canonical and are stopped.`)
      : say(`守卫关：κ(z₀, z₀) = ⟨0, 1⟩ ≠ ⟨1, 1⟩，triad p0 p0 z₂ = ${tuple(triad(P0, P0, TWO4))} ≠ z₂。`, `Guard off: κ(z₀, z₀) = ⟨0, 1⟩ ≠ ⟨1, 1⟩ and triad p0 p0 z₂ = ${tuple(triad(P0, P0, TWO4))} ≠ z₂.`);
  /** What a conjunct shows besides its law. */
  function conjunctDetail(m, say = L) {
    const c = CONJUNCTS[m.master.k];
    if (c.kappa) return `κ = ${both(fr(kappa(P0, c.kappa)))}`;
    if (m.master.k === 4) return `${tuple(G120)} → ${tuple(beat2())} → ${tuple(triad(beat2(), P0, G120))}`;
    if (m.master.k === 5) return `triad pHalf pHalf g120 = ${tuple(triad(PHALF, PHALF, G120))}`;
    if (m.master.k === 6) return `${tuple(triad(PHALF, P0, QHALF))} ≠ ${tuple(triad(QHALF, P0, PHALF))}`;
    return `x₀ = ${fstr(m.master.x0)}${say('：', ': ')}1 + x₀² = ${fstr(m.master.base[0])} ≥ 1${say('，射流 ', ', jet ')}(${m.master.jet.map(fstr).join(', ')})`;
  }
  function subline(m) {
    const s = state.scene,
      r = regimeOf(m),
      tiny = compact();
    if (s === 'kernel') {
      if (state.lens) return contrastText();
      return m.kernel.f > 0 ? movingText(m.kernel) : stageText(m.kernel.route, m.kernel.k);
    }
    if (s === 'carrier') {
      const c = m.carrier;
      if (state.lens) {
        const d = decimalSpinor(c.norm);
        return d.root
          ? L(`先归一化（MODEL）：‖p‖ = ${d.root} 是整数，这条射线不用根号；pHalf 就要 √2，它在实数栈里是 noncomputable。`, `Normalize first (MODEL): ‖p‖ = ${d.root} is an integer, no root on this ray; pHalf needs √2, noncomputable in the real stack.`)
          : L(`先归一化（MODEL）：1/√${c.norm} ${rel(null, 1 / Math.sqrt(c.norm))}，截成四位后模方 ${c.norm}·d² ${relQ(d.rest, 8)}；√${c.norm} 在实数栈里是 noncomputable，模去 ±1 还要 Quot.sound。`, `Normalize first (MODEL): 1/√${c.norm} ${rel(null, 1 / Math.sqrt(c.norm))}, cut to four decimals d the squared norm ${c.norm}·d² ${relQ(d.rest, 8)}; √${c.norm} is noncomputable in the real stack, and the quotient by ±1 needs Quot.sound.`);
      }
      if (r === 'raw') return L(`${tuple(c.first.raw)} 与 ${tuple(c.second.raw)} 在同一条有理直线上，先除以 gcd = ${c.first.g}、${c.second.g}。`, `${tuple(c.first.raw)} and ${tuple(c.second.raw)} lie on one rational line; first divide by gcd = ${c.first.g} and ${c.second.g}.`);
      if (r === 'gcd') return L(`约成 ${reduced(c.first)} 与 ${reduced(c.second)}；再把首个非零分量锁成正，符号 ${signed(c.second.s)}。`, `Reduced to ${reduced(c.first)} and ${reduced(c.second)}; now make the first nonzero entry positive, sign ${signed(c.second.s)}.`);
      if (r === 'sign') return L(`同一个四元组 ${tuple(c.p)}，落向球面上它的方向。`, `One tuple ${tuple(c.p)}, settling on its direction on the ball.`);
      return tiny
        ? L(`${tuple(c.second.raw)} ↦ ${tuple(c.p)}，${kappaText(c.kappa)}，Ad(p)：(x, y, z) ↦ ${turnText(c.p)}。`, `${tuple(c.second.raw)} ↦ ${tuple(c.p)}, ${kappaText(c.kappa)}, Ad(p): (x, y, z) ↦ ${turnText(c.p)}.`)
        : L(`${tuple(c.first.raw)} 与 ${tuple(c.second.raw)} 落到同一个 ${RAY_NAME[c.ray]} = ${tuple(c.p)}：‖p‖² = ${c.norm}，${kappaText(c.kappa)}，整数旋转 Ad(p)：(x, y, z) ↦ ${turnText(c.p)}，不用根号，也不用商类型。`, `${tuple(c.first.raw)} and ${tuple(c.second.raw)} reach one ${RAY_NAME[c.ray]} = ${tuple(c.p)}: ‖p‖² = ${c.norm}, ${kappaText(c.kappa)}, integer rotation Ad(p): (x, y, z) ↦ ${turnText(c.p)}, without a root and without a quotient type.`);
    }
    if (s === 'master') {
      const c = m.master,
        t = taskOf(c.k);
      if (state.lens)
        return L(`同一条在实数栈里（MODEL）：decide 停在 Classical.choice，一份证明的声明闭包 ${CENSUS.real[t]} 个，公理 ${CENSUS.axioms.real.length} 条；这里 ${CENSUS.omega[t]} 个，公理 ${CENSUS.axioms.omega.length} 条。`, `The same in the real stack (MODEL): decide stops at Classical.choice, one proof reaches ${CENSUS.real[t]} declarations with ${CENSUS.axioms.real.length} axioms; here ${CENSUS.omega[t]} with ${CENSUS.axioms.omega.length}.`);
      return tiny
        ? L(`第 ${c.k + 1} 条：${conjunctDetail(m)}，${c.steps} 步。`, `Conjunct ${c.k + 1}: ${conjunctDetail(m)}, ${c.steps} steps.`)
        : L(`第 ${c.k + 1} 条 ${c.law}：归约到 ${c.ok}，${c.steps} 步整数运算；${conjunctDetail(m)}。${guardText(c.guard)}`, `Conjunct ${c.k + 1}, ${c.law}: reduces to ${c.ok} in ${c.steps} integer steps; ${conjunctDetail(m)}. ${guardText(c.guard)}`);
    }
    if (s === 'bridge') {
      const b = m.bridge;
      if (state.lens)
        return L(`实数侧（MODEL）：同一结论用 IsLeast 与 nlinarith 证，声明闭包 ${CENSUS.real[3]} 个，公理 ${CENSUS.axioms.real.length} 条；整数证书一次 decide，${CENSUS.omega[3]} 个，公理 ${CENSUS.axioms.omega.length} 条。`, `The real side (MODEL): the same by IsLeast and nlinarith reaches ${CENSUS.real[3]} declarations with ${CENSUS.axioms.real.length} axioms; the integer certificate is one decide, ${CENSUS.omega[3]} with ${CENSUS.axioms.omega.length}.`);
      const form = `y = ${fstr(b.y)}${L('：', ': ')}2 + 2y + (3/2)y² = ${fstr(b.value)}`;
      const head = b.least ? L(`${form} = S，取到最小。`, `${form} = S, the least value.`) : L(`${form} ≥ S = ${fstr(b.S)}。`, `${form} ≥ S = ${fstr(b.S)}.`);
      const tail = b.ok ? `${certText(b)}${L('，过桥：', ', across the bridge: ')}${boundText(b)}` : L(`${certText(b)}，证书不成立，桥不通`, `${certText(b)}: no certificate, the bridge stays open`);
      return tiny ? L(`${head}${tail}。`, `${head} ${tail}.`) : L(`${head}N = ${b.N}：${tail}。`, `${head} N = ${b.N}: ${tail}.`);
    }
    const t = m.tasks;
    if (state.lens)
      return L(
        `${taskName(t.task)}（MODEL）：Mathlib.Real 的一份证明声明闭包 ${t.real} 个，公理 ${CENSUS.axioms.real.length} 条，闭包里${CENSUS.tendsto[t.task] ? '有' : '没有'} Filter.Tendsto；decide 停在 Classical.choice。`,
        `${taskName(t.task)} (MODEL): one Mathlib.Real proof reaches ${t.real} declarations and ${CENSUS.axioms.real.length} axioms, ${CENSUS.tendsto[t.task] ? 'with' : 'without'} Filter.Tendsto among them; decide stops at Classical.choice.`
      );
    const where = t.f > 0 ? movingText(t) : stageText(t.route, t.k);
    return tiny
      ? L(`${t.omega} 个声明、公理 ${CENSUS.axioms.omega.length} 条，对比 ${t.real} 个、${CENSUS.axioms.real.length} 条；整数 ${t.steps} 步。`, `${t.omega} declarations, ${CENSUS.axioms.omega.length} axioms against ${t.real}, ${CENSUS.axioms.real.length}; ${t.steps} integer steps.`)
      : L(`${taskName(t.task)}：OmegaMath 声明闭包 ${t.omega} 个、公理 ${CENSUS.axioms.omega.length} 条、整数 ${t.steps} 步；Mathlib.Real ${t.real} 个、公理 ${CENSUS.axioms.real.length} 条。${where}`, `${taskName(t.task)}: OmegaMath ${t.omega} declarations, ${CENSUS.axioms.omega.length} axioms, ${t.steps} integer steps; Mathlib.Real ${t.real}, ${CENSUS.axioms.real.length} axioms. ${where}`);
  }
  function bigline(m) {
    const s = state.scene,
      c = m.carrier,
      b = m.bridge,
      arch = (r) => (r.f > 0 ? `${ROUTE_NAME[r.route]} ${r.k + 1} → ${r.k + 2}` : `${ROUTE_NAME[r.route]} ${r.k + 1}/5 · ${L(...STAGE_NAME[r.k])}`);
    const key = {
      kernel: () => arch(m.kernel),
      carrier: () => ({ raw: tuple(c.second.raw), gcd: reduced(c.second), sign: tuple(c.p), canon: `${tuple(c.second.raw)} ↦ ${tuple(c.p)}` })[regimeOf(m)],
      master: () => `${m.master.k + 1}/8 · ${m.master.ok}`,
      bridge: () => (b.least ? `S = ${fstr(b.S)}` : `${fstr(b.value)} ≥ ${fstr(b.S)}`),
      tasks: () => `${m.tasks.omega} ↔ ${m.tasks.real}`
    };
    const d = decimalSpinor(c.norm);
    const flat = {
      kernel: () => `${L('八项算例', 'eight checks')} ∅ ↔ ${CENSUS.axioms.real.length} ↔ False`,
      carrier: () => (d.root ? `‖p‖ = ${d.root}` : `1/√${c.norm} ${rel(null, 1 / Math.sqrt(c.norm))}`),
      master: () => `${CENSUS.real[taskOf(m.master.k)]} ↔ ${CENSUS.omega[taskOf(m.master.k)]}`,
      bridge: () => `${CENSUS.real[3]} ↔ ${CENSUS.omega[3]}`,
      tasks: () => `${m.tasks.real} ↔ ${m.tasks.omega}`
    };
    return `${L(...SCENE_NAME[s][state.lens])} · <span class="nb">${(state.lens ? flat : key)[s]()}</span>`;
  }
  function legendItems(m) {
    const items = [['vi', L('有理三元球面 ℚP³', 'rational ternion sphere ℚP³')]];
    switch (state.scene) {
      case 'kernel':
        items.push(['cy', L('QRat 原型', 'QRat prototype')], ['mg', L('Mathlib.Real · axiom', 'Mathlib.Real · axiom')], ['am', L('当前这一阶', 'current stage')]);
        break;
      case 'carrier':
        items.push(['cy', L('整数射线 · κ 纬圈', 'integer ray · κ circles')], ...(state.lens ? [['mg', L('四位小数的旋量', 'four-decimal spinor')]] : []), ['am', L('当前四元组', 'current tuple')]);
        break;
      case 'master':
        items.push(['cy', L('已归约到 true', 'reduced to true')], ['mg', L('反序 · 边界反例', 'reversed order · raw tuples')], ['am', L('当前断言', 'current conjunct')]);
        break;
      case 'bridge':
        items.push(['cy', L('舒尔椭球 · 整数证书', 'Schur ellipsoid · integer certificate')], ['mg', L('实连续统壳层', 'real shell')], ['am', L('y 与桥 Π', 'y and the bridge Π')]);
        break;
      default:
        items.push(['cy', 'OmegaMath'], ['mg', 'Mathlib.Real · axiom'], ['am', L('当前这一阶', 'current stage')]);
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const r = regimeOf(m),
      s = state.scene;
    if (s === 'kernel' || s === 'tasks') {
      const a = m[s],
        name = ROUTE_NAME[a.route],
        pair = (zh, en) => [zh, en],
        lanes = s === 'tasks' ? ['三条轨道各有五枚棱柱。', 'Three lanes of five prisms each. '] : ['', ''];
      if (a.f > 0) return { long: pair(`${lanes[0]}琥珀点沿 ${name} 的轨道走在第 ${a.k + 1} 与第 ${a.k + 2} 枚棱柱之间。`, `${lanes[1]}The amber point is on the lane of ${name}, between prisms ${a.k + 1} and ${a.k + 2}.`), fig: pair(`琥珀点在 ${name} 的第 ${a.k + 1} 与第 ${a.k + 2} 枚棱柱之间。`, `The amber point is between prisms ${a.k + 1} and ${a.k + 2} of ${name}.`) };
      if (s === 'kernel')
        return {
          omega: {
            long: pair(`紫球上方五枚棱柱是编译与审计的五阶。青色光束沿 QRat 原型的轨道走到第 ${a.k + 1} 阶（琥珀）；靠前的品红轨道是自定义 axiom，停在第 3 阶，掉到 False 晶体；靠后的品红轨道是 Mathlib.Real，长出支线，停在第 4 阶。拖琥珀点换阶。`, `The five prisms above the violet ball are the stages of compiling and auditing. The cyan beam on the QRat prototype lane has reached stage ${a.k + 1} (amber); the magenta lane in front is the custom axiom, which stops at stage 3 and drops to the crystal False; the magenta lane behind is Mathlib.Real, which grows side branches and stops at stage 4. Drag the amber point to change the stage.`),
            fig: pair(`青色光束走到第 ${a.k + 1} 阶；品红的 axiom 停在第 3 阶，Mathlib.Real 停在第 4 阶。`, `The cyan beam is at stage ${a.k + 1}; magenta axiom stops at 3, Mathlib.Real at 4.`)
          },
          real: {
            long: pair(`琥珀点在靠后的品红轨道 Mathlib.Real 的第 ${a.k + 1} 阶${a.k === 3 ? '，前面的挡板不让它到第 5 阶' : ''}；支线是极限任务里的滤子引理。`, `The amber point is at stage ${a.k + 1} of the magenta lane behind, Mathlib.Real${a.k === 3 ? '; the slab keeps it from stage 5' : ''}; the side branches are the filter lemmas of a task with a limit.`),
            fig: pair(`Mathlib.Real 走到第 ${a.k + 1} 阶，挡板在第 4 阶之后。`, `Mathlib.Real is at stage ${a.k + 1}; the slab stands after stage 4.`)
          },
          axiom: {
            long: pair(`琥珀点在靠前的品红轨道 axiom 的第 ${a.k + 1} 阶${a.k === 2 ? '：挡板挡住去路，虚线掉到 False 晶体' : ''}。`, `The amber point is at stage ${a.k + 1} of the magenta lane in front, axiom${a.k === 2 ? ': a slab bars the way and the dashed line drops to the crystal False' : ''}.`),
            fig: pair(`axiom 走到第 ${a.k + 1} 阶${a.k === 2 ? '，掉到 False' : ''}。`, `axiom is at stage ${a.k + 1}${a.k === 2 ? ' and drops to False' : ''}.`)
          }
        }[a.route];
      return {
        long: pair(`三条轨道各有五枚棱柱：中间青色是 OmegaMath，靠前与靠后的品红是 axiom 与 Mathlib.Real，挡板是各自停下的地方。琥珀点在 ${name} 的第 ${a.k + 1} 阶；球面上画的是任务“${TASK_NAME[a.task][0]}”。`, `Three lanes of five prisms each: OmegaMath in cyan in the middle, axiom and Mathlib.Real in magenta in front and behind, a slab where each of them ends. The amber point is at stage ${a.k + 1} of ${name}; the ball shows the task ${TASK_NAME[a.task][1]}.`),
        fig: pair(`${name} 第 ${a.k + 1} 阶；任务：${TASK_NAME[a.task][0]}。`, `${name} at stage ${a.k + 1}; task: ${TASK_NAME[a.task][1]}.`)
      };
    }
    if (s === 'carrier') {
      const c = m.carrier;
      const raw = tuple(c.second.raw);
      return {
        raw: {
          long: [`同一条青色直线穿过球心，两个圈是原始整数点 ${tuple(c.first.raw)} 与 ${raw}。琥珀点从 ${raw} 沿直线往里走，每一步约掉一个公因子。`, `One cyan line runs through the centre; the two rings are the raw integer points ${tuple(c.first.raw)} and ${raw}. The amber point slides in from ${raw} as common factors are divided out.`],
          fig: [`琥珀点从 ${raw} 沿直线约到最近的整数点。`, `The amber point slides from ${raw} to the nearest integer point.`]
        },
        gcd: {
          long: [c.second.s < 0 ? `约完公因子，琥珀点在直线的另一端；沿青色半圆绕到对径点，就是把符号锁成正。` : `约完公因子，琥珀点已经在正的一端，符号不用改。`, c.second.s < 0 ? 'With the common factor gone the amber point is at the far end of the line; the cyan half circle to the antipode is the sign lock.' : 'With the common factor gone the amber point is at the positive end already; the sign stays.'],
          fig: [c.second.s < 0 ? '沿青色半圆绕到对径点：锁定符号。' : '符号已经是正的。', c.second.s < 0 ? 'Along the cyan half circle to the antipode: the sign lock.' : 'The sign is positive already.']
        },
        sign: {
          long: [`两条路汇到 ${tuple(c.p)}，琥珀点落向球面；右下的三根青色轴转到 Ad(p) 的像。`, `Both ways meet in ${tuple(c.p)} and the amber point settles on the ball; the three cyan axes at the lower right turn to their images under Ad(p).`],
          fig: [`两条路汇到 ${tuple(c.p)}。`, `Both ways meet in ${tuple(c.p)}.`]
        },
        canon: {
          long: [`一条有理直线只有一个规范代表 ${tuple(c.p)}。球面上 p0、pHalf、g120、pInf 的高度的平方就是 κ；青色纬圈是 κ = 1/2 与 1/4，赤道是 κ = 0。右下：紫色是原来的轴，青色是整数旋转 Ad(p) 的像。拖琥珀点把约分倒回去。`, `A rational line has one canonical representative, ${tuple(c.p)}. On the ball the squared height of p0, pHalf, g120 and pInf is κ; the cyan circles are κ = 1/2 and 1/4, the equator κ = 0. At the lower right: the axes in violet, their images under the integer rotation Ad(p) in cyan. Drag the amber point to run the reduction backwards.`],
          fig: [`一条有理直线只有一个规范代表 ${tuple(c.p)}；高度的平方是 κ。`, `One rational line, one canonical ${tuple(c.p)}; the squared height is κ.`]
        }
      }[r];
    }
    if (s === 'master') {
      // [zh, en] and, where the English runs long, a shorter English for the two lines of a cited figure or a phone
      const c = m.master,
        what = [
          ['北极 p0 与自己比', 'the pole p0 with itself'],
          ['从 p0 到 pHalf 的弧停在 κ = 1/2 的纬圈上', 'the arc from p0 to pHalf ends on the circle κ = 1/2'],
          ['从 p0 到 pInf 的弧走到赤道，κ = 0', 'the arc from p0 to pInf ends on the equator, κ = 0'],
          ['从 p0 到 g120 的弧停在 κ = 1/4 的纬圈上', 'the arc from p0 to g120 ends on the circle κ = 1/4'],
          ['三拍走完半个大圆，终点与 p0 对径，是同一个射影点', 'three beats run half a great circle; its end is the antipode of p0, the same projective point', 'three beats end at the antipode of p0, the same projective point'],
          ['pHalf 与自己抵消，g120 原样留下', 'pHalf cancels against itself and g120 is kept'],
          ['青色与品红两种次序落在两个不同的点', 'the cyan and the magenta order end in two different points'],
          ['右下紫色抛物线在 x₀ 处贴着青色的 κ = 1/(1 + x²)，它就是射流', 'the violet parabola touching the cyan κ = 1/(1 + x²) at x₀ is the jet']
        ][c.k];
      return {
        long: [
          `球面上方八枚棱柱是八条断言，青色已归约到 true，琥珀是第 ${c.k + 1} 条：${what[0]}。右上的青环是守卫：${c.guard ? '两个品红原始四元组停在环外' : '守卫关上，两个品红原始四元组穿过环跑向 p0'}。`,
          `The eight prisms above the ball are the eight conjuncts, cyan once reduced to true, amber for number ${c.k + 1}: ${what[1]}. The cyan ring at the upper right is the guard: ${c.guard ? 'the two magenta raw tuples stop outside' : 'switched off, the two magenta raw tuples run through it to p0'}.`
        ],
        fig: [`第 ${c.k + 1}/8 条：${what[0]}。`, `Conjunct ${c.k + 1} of 8: ${what[2] || what[1]}.`]
      };
    }
    const b = m.bridge;
    return {
      long: [
        `左边青色椭球是 2x² + 2xy + (3/2)y² 的一层，穿过直线 x = 1 上的琥珀点；${b.least ? '现在它最小，恰与直线相切' : '把琥珀点推向虚线椭圆的切点，它会变小，小到 4/3 为止'}。${b.ok ? '右边琥珀箭头把整数证书单向送到品红的实数壳层' : '证书不成立，右边的桥断开'}。`,
        `The cyan ellipsoid on the left is a layer of 2x² + 2xy + (3/2)y² through the amber point of the line x = 1; ${b.least ? 'it is smallest now and touches the line' : 'push the amber point to the tangent point of the dashed ellipse and it shrinks, but not below 4/3'}. ${b.ok ? 'On the right the amber arrow carries the integer certificate one way to the magenta real shell' : 'Without a certificate the bridge on the right is broken'}.`
      ],
      fig: [b.least ? '椭球最小，恰与直线 x = 1 相切；琥珀箭头单向通到实数壳层。' : '琥珀点离开切点，椭球就变大。', b.least ? 'The ellipsoid is smallest, tangent to x = 1; the amber arrow leads one way out.' : 'Off the tangent point the ellipsoid is larger.']
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      flat = state.lens === 1,
      tiny = small(),
      { R, U } = cam;
    // a label sits (right, up) pixels from its point
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'kernel' || s === 'tasks') {
      const a = m[s];
      for (let k = 0; k < 5; k++) {
        const here = a.f === 0 && a.k === k,
          ang = archAngle(k);
        N('stage' + k, off(archPoint(k, 0, ARCH_R + 0.1), (tiny ? 22 : 42) * cs(ang), (tiny ? 22 : 38) * sn(ang)), tiny ? `${k + 1}` : `${k + 1} ${L(...STAGE_NAME[k])}`, here && a.route === 'omega' ? 'c-am' : 'c-cy');
      }
      N('false', off(FALSE_AT, tiny ? 24 : 46, -2), tiny ? 'False' : 'z₀ → False', 'c-mg');
      const end = archPoint(REACH.real + 0.4, LANE.real);
      N('real', off(end, tiny ? 0 : s === 'kernel' ? 96 : 66, tiny ? 20 : 4), tiny ? L('公理 3', '3 axioms') : `Mathlib.Real<br>${flat || a.route === 'real' || s === 'kernel' ? CENSUS.axioms.real.join('<br>') : L('公理 3', '3 axioms')}`, 'c-mg');
      N('axiom', off(archPoint(0, LANE.axiom), tiny ? 8 : 12, tiny ? -18 : -26), 'axiom', 'c-mg');
      if (!tiny) {
        if (s === 'kernel' || CENSUS.tendsto[a.task]) N('filter', off(archPoint(2.62, LANE.real, ARCH_R + 0.2), 124, 0), s === 'kernel' ? 'Filter.Tendsto · T3' : 'Filter.Tendsto', 'c-mg');
        if (s === 'kernel') N('empty', off(archPoint(3, 0, ARCH_R - 0.12), -22, -16), L('八项算例 · ∅', 'eight checks · ∅'), 'c-cy');
        if (s === 'kernel') N('kap', off(on(PHALF), 8, -22), `κ(p0, pHalf) = ${fstr(fr(kappa(P0, PHALF)))}`, 'c-cy');
      }
      if (s === 'tasks') {
        const t = a.task,
          spot = [beatPoint(0.5), on([1, 1, 0.5, 0.5]), on([2, 3, 0, 0]), on([1, 1, 1, 0])][t];
        N('task', off(spot, t === 0 ? -56 : t === 3 ? 0 : -40, t === 3 ? -20 : -18), [`g120³ = p0`, `(1, 1, 1, 1) ≠ (1, 1, 1, −1)`, `x₀ = 1${L('，射流 ', ', jet ')}${jetText(kappaJetAt(Q(1)))}`, `B²/(AC) = 1/3`][t], 'c-cy');
        if (!tiny) N('count', seen(0, -0.72, 1.05), `${a.omega} ↔ ${a.real}`, 'c-ik');
      }
    }
    if (s === 'carrier') {
      const c = m.carrier;
      N('raw1', off(rayPoint(c.p, c.first.k), tiny ? 6 : 40, tiny ? 18 : 12), tuple(c.first.raw), 'c-cy');
      N('raw2', off(rayPoint(c.p, c.second.k), tiny ? 44 : 54, 0), tuple(c.second.raw), 'c-cy');
      for (const [name, p] of STATIONS) {
        const q = fr(kappa(P0, p)),
          own = RAYS[c.ray] === p;
        if (tiny && name === 'g120') continue;
        N('st-' + name, off(on(p), { p0: -34, pHalf: -84, pInf: 20, g120: -58 }[name], { p0: 14, pHalf: -14, pInf: -20, g120: -20 }[name]), tiny ? name : own ? `${name} = ${tuple(p)}<br>κ = ${both(q)}` : `${name} · κ = ${both(q)}`, own ? 'c-ik' : 'c-cy');
      }
      const g = GLYPH();
      N('ad', seen(g.c[0], g.c[1] - g.r - (tiny ? 0.16 : 0.2), 0.4), tiny ? 'Ad(p)' : `Ad(p) = ${turnText(c.p)}`, 'c-vi');
      if (!tiny) ['x', 'y', 'z'].forEach((v, k) => N('ax' + v, glyphPoint([0, 1, 2].map((i) => (i === k ? 1.2 : 0))), v, 'c-vi'));
      if (flat && !decimalSpinor(c.norm).root) N('dec', off(on(c.p), 46, 18), `d = ${decimals(decimalSpinor(c.norm).d, 4).text}`, 'c-mg');
    }
    if (s === 'master') {
      const c = m.master;
      const plate = platePoint(c.k, ARCH_R + FLOAT);
      if (!tiny) N('now', off(plate, 0, 24), `${c.k + 1}/8 ${c.ok}`, 'c-am');
      for (const [name, p] of STATIONS) {
        if (tiny && name !== 'p0') continue;
        N('st-' + name, off(on(p), { p0: -36, pHalf: 26, pInf: 22, g120: 24 }[name], { p0: -7, pHalf: 14, pInf: -16, g120: -16 }[name]), name, 'c-cy');
      }
      if (c.k >= 6) N('other', off(on([1, 1, 1, -1]), tiny ? -10 : -26, -18), tiny ? '≠' : '(1, 1, 1, −1)', 'c-mg');
      if (c.k === 4 && !tiny) {
        N('g2', off(beatPoint(2 / 3), 46, -4), '(−2, 2, 2, 2)', 'c-cy');
        N('g3', off(beatPoint(1), 26, -10), '(−1, 0, 0, 0)', 'c-cy');
      }
      const [gx, gy] = GATE();
      N('z0', seen(gx + (tiny ? 0.22 : 0.3), gy + 0.36, 0.45), tiny ? 'z₀' : `z₀ = ${tuple(ZERO4)}`, 'c-mg');
      N('z2', seen(gx + (tiny ? 0.22 : 0.3), gy - 0.3, 0.45), tiny ? 'z₂' : `z₂ = ${tuple(TWO4)}`, 'c-mg');
      const low = tiny || sc.unit < 120;
      N('jet', off(panelPoint(0, low ? 0 : 1.1), 0, low ? -11 : 18), low ? `x₀ = ${fstr(c.x0)}` : `κ = 1/(1 + x²) · x₀ = ${fstr(c.x0)}`, 'c-vi');
      if (!tiny && sc.unit > 150) N('jetv', off(panelPoint(0, 0), 0, -14), `(${c.jet.map(fstr).join(', ')})`, 'c-vi');
    }
    if (s === 'bridge') {
      const b = m.bridge;
      N('line', off(formPoint(1, 0.62), 0, 12), 'x = 1', 'c-ik');
      N('S', off(formPoint(-0.2, -1.5), -6, -18), b.least ? `S = ${both(b.S)}` : `${fstr(b.value)} ≥ ${fstr(b.S)}`, 'c-cy');
      if (!tiny) N('y', off(formPoint(1, fval(b.y)), 48, 0), `y = ${fstr(b.y)}`, 'c-ik');
      N('cert', off(scale(BRIDGE_DIR, 0.98), tiny ? -34 : -64, 18), b.ok ? `${b.left} &lt; ${b.right}` : `${b.left} ≥ ${b.right}`, 'c-cy');
      N('pi', off(scale(BRIDGE_DIR, SHELL - 0.2), 0, tiny ? 22 : 26), 'Π<sub>ℝ</sub>', 'c-am');
      N('bound', off(scale(BRIDGE_DIR, SHELL), tiny ? -10 : 8, tiny ? -26 : -32), b.ok ? (tiny ? `&lt; ${fstr(b.target)}` : `${fstr(b.bound)} &lt; ${fstr(b.target)}`) : L('桥不通', 'no bridge'), 'c-mg');
      if (!tiny) N('shell', seen(0.72, 1.28, 0.2), L('实连续统壳层', 'real continuum shell'), 'c-mg');
      N('core', seen(0.1, -0.62, 1.05), tiny ? 'ℚ' : L('有理证书', 'rational certificate'), 'c-cy');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d.]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>').replace(/‖|ℚ/g, '<span class="nm">$&</span>');
  const ACTS = {
    kernel: ['下一阶 ▸', 'Next stage ▸'],
    carrier: ['换射线 ▸', 'Next ray ▸'],
    master: ['守卫 开/关', 'Guard on/off'],
    bridge: ['回到最小 ▸', 'To the least ▸'],
    tasks: ['换任务 ▸', 'Next task ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems(m)
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
    // the place of a label shifted by (dx, dy), or null when it leaves the stage or meets an occupied box
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
    // each label takes the free place nearest its anchor, rows and side steps weighed together by distance
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
    fit(w, m);
    sc.begin();
    drawBall();
    drawKernel(m, w.kernel);
    drawCarrier(m, w.carrier);
    drawMaster(m, w.master);
    drawBridge(m, w.bridge);
    drawTasks(m, w.tasks);
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
  const log10 = Math.log10;
  /** A bar from the foot of the plot to the value y, in pixels of width. */
  function bar(g, x, y, lo, color, width, dx, alpha = 1) {
    const ctx = g.ctx,
      px = g.X(x) + dx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(px - width / 2, g.Y(y), width, g.Y(lo) - g.Y(y));
    ctx.restore();
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      const t = state.scene === 'master' ? taskOf(m.master.k) : m.tasks.task;
      $('plotTitle').textContent = L('声明闭包与整数步数（对数轴）', 'Declarations and integer steps (log axis)');
      $('plotMeta').textContent = `T${t + 1}`;
      const items = [
        [P.cyan, L('OmegaMath 声明', 'OmegaMath declarations')],
        [P.magenta, L('Mathlib.Real 声明', 'Mathlib.Real declarations')],
        [P.violet, L('整数步数', 'integer steps'), 'dot']
      ];
      const lo = 1,
        hi = log10(Math.max(...CENSUS.real));
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cv, { x: [-0.5, 3.5], y: [lo, headroom(cv, PAD, rows.length, lo, hi)], pad: PAD });
      const narrow = cv.clientWidth < 260;
      g.axes({ xTicks: range(4).map((k) => [k, narrow ? `T${k + 1}` : `T${k + 1} ${L(...TASK_SHORT[k])}`]), yTicks: [[1, '10'], [2, '100'], [3, '1000'], [4, '10000']] });
      const bw = Math.min(22, g.iw / 14);
      range(4).forEach((k) => {
        const faint = k === t ? 1 : 0.55;
        bar(g, k, log10(CENSUS.omega[k]), lo, P.cyan, bw, -bw * 0.62, faint);
        bar(g, k, log10(CENSUS.real[k]), lo, P.magenta, bw, bw * 0.62, faint);
        g.dot(k - ((0.62 * bw) / g.iw) * 4, log10(TASKS[k].steps), P.violet, 3.4);
      });
      // the cursor of the current task stands under the axis of the bars: the legend rows above stay clear
      g.line([[t - 0.42, lo], [t + 0.42, lo]], P.amber, { width: 3 });
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const b = m.bridge;
      $('plotTitleB').textContent = L('四分深度：上界降到目标之下', 'Quarter depth: the bound below the target');
      $('plotMetaB').textContent = `N = ${b.N}`;
      const items = [
        [P.cyan, `(7/2)/4ᴺ⁺¹`],
        [P.magenta, `p/q = ${fstr(b.target)}`, 'dash']
      ];
      const at = (N) => log10(MAJOR[0] / MAJOR[1]) - (N + 1) * log10(4),
        goal = log10(fval(b.target)),
        lo = at(DEPTH_MAX) - 0.25,
        hi = at(0);
      const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cb, { x: [-0.3, DEPTH_MAX + 0.3], y: [lo, headroom(cb, PAD, rows.length, lo, hi)], pad: PAD });
      g.axes({ xTicks: range(DEPTH_MAX + 1).map((N) => [N, N ? String(N) : cb.clientWidth < 260 ? '0' : 'N = 0']), yTicks: [[0, '1'], [-1, '1/10'], [-2, '1/100'], [-3, '1/1000']] });
      g.line([[-0.3, goal], [DEPTH_MAX + 0.3, goal]], P.magenta, { width: 1.6, dash: [4, 4] });
      g.line(range(DEPTH_MAX + 1).map((N) => [N, at(N)]), P.cyan, { width: 1.6 });
      range(DEPTH_MAX + 1).forEach((N) => g.dot(N, at(N), P.cyan, at(N) < goal ? 4 : 2.6));
      g.line([[b.N, lo], [b.N, hi]], P.amber, { width: 1 });
      g.dot(b.N, at(b.N), P.amber, 3.6);
      drawLegend(g, rows);
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    const s = state.scene;
    if (s === 'tasks')
      return L(
        '三步路线（MODEL）：一、OmegaCore 整数核（T1、T2、T3）；二、有理格拉姆—舒尔层（T4）；三、单向桥 Π 通到 Mathlib。',
        'Three-step roadmap (MODEL): 1, the integer core OmegaCore (T1, T2, T3); 2, the rational Gram–Schur layer (T4); 3, the one-way bridge Π into Mathlib.'
      );
    if (s === 'kernel')
      return L(
        `T1 … T4 的整数步数 ${TASKS.map((t) => t.steps).join('、')}；False 的一行证明的声明闭包 ${CENSUS.boom} 个，公理 ${axiomText('axiom')}（Lean 实测）。`,
        `Integer steps of T1 … T4: ${TASKS.map((t) => t.steps).join(', ')}; the one-line proof of False reaches ${CENSUS.boom} declarations, axioms ${axiomText('axiom')} (measured in Lean).`
      );
    if (s === 'carrier')
      return L(
        `${RAY_NAME[m.carrier.ray]} 的阶（triad 以 p0 为单位元）：${orderOf(m.carrier.p)}。`,
        `Order of ${RAY_NAME[m.carrier.ray]} (triad with the identity p0): ${orderOf(m.carrier.p)}.`
      );
    if (s === 'master')
      return L(
        `${CONJUNCTS.length} 条各 ${CONJUNCTS.map((c) => c.steps).join('、')} 步，共 ${MASTER_STEPS} 步，成立 ${MASTER_OK} 条。`,
        `Steps of the ${CONJUNCTS.length} conjuncts: ${CONJUNCTS.map((c) => c.steps).join(', ')}, together ${MASTER_STEPS}; ${MASTER_OK} hold.`
      );
    const b = m.bridge;
    return L(
      `rationalQuarterDepth ${b.c} ${b.d} ${b.p} ${b.q} = ${b.depth}；y* = −C⁻¹B = ${fstr(YSTAR)}；B²/(AC) = 1/3，S/A = 2/3。`,
      `rationalQuarterDepth ${b.c} ${b.d} ${b.p} ${b.q} = ${b.depth}; y* = −C⁻¹B = ${fstr(YSTAR)}; B²/(AC) = 1/3, S/A = 2/3.`
    );
  }
  /** The order of a rotation in the group of triads with the identity p0, by the power test; 0 when no power up to 48 returns. */
  function orderOf(p) {
    let x = p;
    for (let k = 1; k <= 48; k++) {
      if (same(x, P0)) return k;
      x = triad(x, P0, p);
    }
    return 0;
  }
  function tracks(m) {
    const c = m.carrier;
    return {
      kernel: [`${L('八项算例', 'eight checks')} · ${axiomText('omega')}`, `${L('公理', 'axioms')} ${CENSUS.axioms.real.length} · False`],
      carrier: [`${tuple(c.second.raw)} ↦ ${tuple(c.p)}`, decimalSpinor(c.norm).root ? `‖p‖ = ${decimalSpinor(c.norm).root}` : `${c.norm}·d² ${relQ(decimalSpinor(c.norm).rest, 8)}`],
      master: [`${MASTER_OK}/8 · ${CENSUS.omega[taskOf(m.master.k)]}`, `${CENSUS.real[taskOf(m.master.k)]}`],
      bridge: [`S = ${both(m.bridge.S)}`, `${fstr(m.bridge.bound)} ${relQ(m.bridge.bound, 6)}`],
      tasks: [`${m.tasks.omega}`, `${m.tasks.real}`]
    }[state.scene];
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      c = m.carrier,
      b = m.bridge,
      t = m.tasks,
      arch = state.scene === 'tasks' ? m.tasks : m.kernel;
    put('roKey', tracks(m).join(' ↔ '));
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roRoute', ROUTES.map(axiomText).join(' · '));
    put('roTuple', `${tuple(c.second.raw)} ↦ ${tuple(c.p)} · ${c.second.g} · ${signed(c.second.s)} · ${c.norm} · ${both(c.kappa)}`);
    put('roTurn', turnText(c.p));
    put('roMaster', `${m.master.k + 1}/8 · ${CONJUNCTS[m.master.k].law} · ${CONJUNCTS[m.master.k].steps}`);
    put('roJet', `${fstr(m.master.x0)} · (${m.master.jet.map(fstr).join(', ')}) · ${m.master.jet.map((x) => relQ(x)).join(' · ')}`);
    put('roSchur', `${fstr(b.y)} · ${both(b.value)} · ${fstr(b.S)}`);
    put('roDepth', `N = ${b.N} · ${b.left} ${b.ok ? '&lt;' : '≥'} ${b.right} · ${fstr(b.bound)} ${relQ(b.bound, 6)}`);
    put('roTask', `T${t.task + 1} · ${t.omega} ↔ ${t.real} · ${t.steps}`);
    put('roNote', readNote(m));
    // the lens already says MODEL in the contrast: the pill does not repeat it
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    const auditRoute = state.lens ? 'real' : ONARCH(state.scene) ? arch.route : 'omega';
    const auditLabel = { omega: L('八项算例', 'eight checks'), real: L('实数圆周桥', 'real circle bridge'), axiom: 'kappa_refl_bad' }[auditRoute];
    put('keyPill', `${auditLabel} · ${L('公理', 'axioms')} <strong>${CENSUS.axioms[auditRoute].length}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = { kernel: 'decide → #print axioms → #eval', carrier: 'κ = ⟨p, q⟩²/(‖p‖²‖q‖²)', master: '[x, y, z] = normalize(x · ȳ · z)', bridge: 'S = A − BC⁻¹B · cq &lt; dp·4<sup>N+1</sup>', tasks: 'T1 … T4 × 3 × 5' }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    routeChips.set(state.route, true);
    stageChips.set(arch.f > 0 ? null : arch.k, true);
    for (const el of document.querySelectorAll('#stageChips [data-stage]')) el.disabled = Number(el.dataset.stage) > REACH[state.route];
    taskChips.set(state.task, true);
    rayChips.set(state.ray, true);
    multChips.set(state.mult, true);
    $('cRange').value = String(m.master.k + 1);
    put('cOut', `${m.master.k + 1}/8`);
    $('xRange').value = String(state.x0);
    put('xOut', `= ${fstr(m.master.x0)}`);
    $('guardBtn').setAttribute('aria-pressed', String(state.guard));
    $('yRange').value = String(Y_LOW + Math.round(state.at.bridge));
    put('yOut', `= ${fstr(b.y)}`);
    $('nRange').value = String(state.N);
    put('nOut', `= ${state.N}`);
    targetChips.set(state.target, true);
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
  const railMax = () => (ONARCH(state.scene) ? REACH[state.route] : rail().max);
  /** The value of the rail, freed from the rounding of its own steps. */
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
    rate: RAILS.kernel.rate,
    step: 1,
    max: RAILS.kernel.max,
    t: STILL.kernel,
    format: (t) => {
      const v = settled(t),
        { k, f } = split(v);
      switch (state.scene) {
        case 'carrier':
          return v >= 3 ? L('规范元', 'canonical') : [L('÷ gcd', '÷ gcd'), L('锁符号', 'sign'), L('落点', 'settle')][Math.min(2, k)];
        case 'master':
          return `${k + 1}/8`;
        case 'bridge':
          return `y = ${fstr(yAt(v))}`;
        default:
          return f > 0 ? `${k + 1} → ${k + 2}` : `${k + 1}/5`;
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
    const at = Math.min(state.at[state.scene], railMax());
    clock.setMax(railMax(), true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
  /** A pointer lands on whole numbers where the rail counts, and on a whole place when it comes close to one. On the rail
      close is less than an arrow key of the range moves, so that no key press is swallowed. */
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
  const archScene = () => (ONARCH(state.scene) ? state.scene : 'kernel');
  const routeChips = kit.chips($('routeChips'), 'route', (v) =>
    steer(archScene(), () => {
      state.route = v;
      state.at[state.scene] = Math.min(state.at[state.scene], REACH[v]);
      setRail();
    })
  );
  const stageChips = kit.chips($('stageChips'), 'stage', (v) => steer(archScene(), () => clock.set(Math.min(Number(v), REACH[state.route]))));
  const taskChips = kit.chips($('taskChips'), 'task', (v) => steer('tasks', () => (state.task = Number(v))));
  const rayChips = kit.chips($('rayChips'), 'ray', (v) => steer('carrier', () => (state.ray = v)));
  const multChips = kit.chips($('multChips'), 'mult', (v) =>
    steer('carrier', () => {
      state.mult = Number(v);
      clock.set(0);
    })
  );
  const targetChips = kit.chips($('targetChips'), 'target', (v) =>
    steer('bridge', () => {
      state.target = v;
      const q = parse(v);
      state.N = quarterDepth(MAJOR[0], MAJOR[1], Number(q[0]), Number(q[1]));
    })
  );
  kit.field($('cRange'), { out: $('cOut'), fmt: (v) => `${v}/8`, onInput: (v) => steer('master', () => clock.set(v - 1)) });
  kit.field($('xRange'), {
    out: $('xOut'),
    fmt: (v) => `= ${fstr(frac(BigInt(v), 4n))}`,
    onInput: (v) =>
      steer('master', () => {
        state.x0 = Math.round(v);
        clock.set(7);
      })
  });
  kit.field($('yRange'), { out: $('yOut'), fmt: (v) => `= ${fstr(frac(BigInt(v), BigInt(GRID_Y)))}`, onInput: (v) => steer('bridge', () => clock.set(v - Y_LOW)) });
  kit.field($('nRange'), { out: $('nOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('bridge', () => (state.N = Math.round(v))) });
  const toggleGuard = () => steer('master', () => (state.guard = !state.guard));
  $('guardBtn').addEventListener('click', toggleGuard);
  /** One stage forward, from the first again once the route has ended. The card stays marked: this is its clock. */
  function nextStage() {
    stopBootPlay();
    clock.pause();
    const k = Math.round(state.at[state.scene]),
      end = railMax();
    if (k >= end) clock.set(0);
    stopAt = (k >= end ? 0 : k) + 1;
    clock.play();
  }
  function nextRay() {
    const names = Object.keys(RAYS);
    steer('carrier', () => (state.ray = names[(names.indexOf(state.ray) + 1) % names.length]));
  }
  const nextTask = () => steer('tasks', () => (state.task = (state.task + 1) % TASKS.length));
  const toLeast = () => steer('bridge', () => clock.set(STILL.bridge));
  $('stageAct').addEventListener('click', () => ({ kernel: nextStage, carrier: nextRay, master: toggleGuard, bridge: toLeast, tasks: nextTask })[state.scene]());
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
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
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
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
  const FRAME = { box: 2, mults: [-3, -2, -1, 1, 2, 3], sample: 8, reach: 5, dens: 30, lists: 4, budget: 8, x0: 8 };
  function benchmarks() {
    const F = FRAME,
      span = (n) => range(2 * n + 1).map((k) => k - n),
      all = (n) => span(n).flatMap((w) => span(n).flatMap((x) => span(n).flatMap((y) => span(n).map((z) => [w, x, y, z])))).filter((t) => t.some((v) => v)),
      canonical = (t) => same(normalize(t), t);
    // normalize: every multiple of a tuple reaches one canonical tuple, primitive, with a positive first entry
    const box = all(F.box);
    let normalBad = 0;
    for (const t of box) {
      const p = normalize(t),
        lead = p.find((v) => v !== 0);
      if (!(lead > 0 && canonical(p) && p.reduce((g, v) => gcd(abs(v), g), 0) === 1 && F.mults.every((k) => same(normalize(t.map((v) => v * k)), p)))) normalBad++;
    }
    const canon = all(1).filter(canonical),
      some = canon.filter((_, k) => k % Math.floor(canon.length / F.sample) === 0).slice(0, F.sample);
    // the six laws of OmegaSpace on canonical tuples, and the multiplicative norm
    const law = { idem: 0, refl: 0, symm: 0, assoc: 0, inv: 0, norm: 0 };
    let lawTried = 0;
    const eqQ = (a, b) => a.num === b.num && a.den === b.den;
    for (const x of canon) {
      if (!eqQ(kappa(x, x), Q(1))) law.refl++;
      for (const z of canon) {
        if (!same(triad(x, x, z), z) || !same(triad(x, z, z), x)) law.idem++;
        if (!eqQ(kappa(x, z), kappa(z, x))) law.symm++;
        lawTried++;
      }
    }
    let lawTuples = 0;
    for (const x of some)
      for (const y of some)
        for (const z of some) {
          if (norm2(rawTriad(x, y, z)) !== norm2(x) * norm2(y) * norm2(z)) law.norm++;
          const t = triad(x, y, z);
          for (const u of some) {
            if (!eqQ(kappa(triad(x, z, u), triad(y, z, u)), kappa(x, y))) law.inv++;
            for (const v of some) {
              lawTuples++;
              if (!same(triad(t, u, v), triad(x, y, triad(z, u, v)))) law.assoc++;
            }
          }
        }
    // the rotations: R Rᵀ = n²1 and det R = n³ in integers, and the Gram-preserving 3-cycle of the axes
    let turnBad = 0;
    for (const p of canon) {
      const R = turn(p),
        n = norm2(p),
        det = dot(R[0], cross(R[1], R[2]));
      if (det !== n ** 3 || R.some((a, i) => R.some((b, j) => dot(a, b) !== (i === j ? n * n : 0)))) turnBad++;
    }
    const R3 = turn(G120),
      cycle = range(3).map((k) => R3.map((row) => row[k] / norm2(G120)).findIndex((v) => v === 1));
    // Lagrange–Gram on all pairs: ‖p‖²‖q‖² − ⟨p, q⟩² = ½ ΣΣ (pᵢqⱼ − pⱼqᵢ)²
    let gramBad = 0;
    for (const p of canon)
      for (const q of canon) {
        let s = 0;
        for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += (p[i] * q[j] - p[j] * q[i]) ** 2;
        if (norm2(p) * norm2(q) - dot(p, q) ** 2 !== s / 2) gramBad++;
      }
    // the 24 Hurwitz units, doubled: readings, chords, ray kernel against spinors, the group at a base point, the heap
    const units = [...span(1).flatMap((s) => (s ? range(4).map((i) => range(4).map((k) => (k === i ? 2 * s : 0))) : [])), ...range(16).map((b) => range(4).map((k) => ((b >> k) & 1 ? -1 : 1)))];
    const half = (t) => t.map((v) => v / 2),
      mul = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]],
      con = ([w, x, y, z]) => [w, -x, -y, -z],
      U = units.map(half),
      I = [0, 1, 0, 0],
      read = (x, y) => (1 + dot(x, y)) / 2;
    let chordBad = 0,
      rayBad = 0,
      pairs = 0;
    for (const x of U)
      for (const y of U) {
        pairs++;
        if (read(x, y) !== 1 - dot(sub(x, y), sub(x, y)) / 4) chordBad++;
        const ray = (2 * read(x, y) - 1) ** 2 + (2 * read(x, mul(y, I)) - 1) ** 2,
          re = x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3],
          im = x[0] * y[1] - x[1] * y[0] + (x[3] * y[2] - x[2] * y[3]);
        if (ray !== re * re + im * im) rayBad++;
      }
    const tri = (x, y, z) => mul(mul(x, con(y)), z),
      o = U[U.length - 1],
      prod = (x, y) => tri(x, o, y),
      inv = (x) => tri(o, x, o),
      few = U.filter((_, k) => k % 3 === 0);
    let groupBad = 0;
    for (const x of few) for (const y of few) for (const z of few) if (!same(tri(x, y, z).map((v) => v + 0), prod(prod(x, inv(y)), z).map((v) => v + 0))) groupBad++;
    const heap = [[1, 0, 0, 0], half([1, 1, 1, 1])],
      c0 = dot(heap[0], heap[1]),
      Un = [0, 1],
      Tn = [1, c0];
    let heapBad = 0;
    for (let n = 2; n <= 6; n++) {
      heap.push(mul(mul(heap[n - 1], con(heap[n - 2])), heap[n - 1]));
      Un.push(2 * c0 * Un[n - 1] - Un[n - 2]);
      Tn.push(2 * c0 * Tn[n - 1] - Tn[n - 2]);
      const form = heap[1].map((v, i) => Un[n] * v - Un[n - 1] * heap[0][i]);
      if (!same(heap[n].map((v) => v + 0), form.map((v) => v + 0)) || dot(heap[0], heap[n]) !== Tn[n] || dot(heap[n], heap[n]) !== 1) heapBad++;
    }
    // the Schur form on the whole rail: the least value and where it is attained
    const line = range(RAILS.bridge.max + 1).map((v) => formAt(yAt(v))),
      least = line.reduce((a, b) => (cmp(b, a) < 0 ? b : a)),
      at = line.map((v, k) => [v, k]).filter(([v]) => equal(v, least)).map(([, k]) => fstr(yAt(k)));
    // six axes: integer directions all covered
    const AXES = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]],
      dirs = span(F.reach).flatMap((x) => span(F.reach).flatMap((y) => span(F.reach).map((z) => [x, y, z]))).filter((v) => v.some((e) => e)),
      open = dirs.filter((v) => !AXES.some((e) => 5 * dot(v, v) < 2 * dot(v, e) ** 2)).length;
    // reduced fractions and the list of convergents
    let denBad = 0,
      lenBad = 0,
      longest = 0,
      fractions = 0;
    for (let r = 1; r <= F.dens; r++)
      for (let s = 0; s <= F.dens; s++) {
        fractions++;
        const x = mkNorm(s, r);
        if (x.den !== r / gcd(s, r)) denBad++;
        let length = 1;
        for (let [a, b] = [s, r]; a % b; [a, b] = [b, a % b]) length++;
        longest = Math.max(longest, length);
        if (length > 2 * Math.floor(Math.log2(x.den)) + 1) lenBad++;
      }
    // prime-factor stripping in the group of triads: x^m = 1 tested by repeated products
    const power = (p, k) => range(k).reduce((acc) => triad(acc, P0, p), P0),
      strip = (p, primes, m) =>
        primes.reduce((n, q) => {
          while (q > 1 && n > 0 && n % q === 0 && same(power(p, n / q), P0)) n /= q;
          return n;
        }, m);
    const stripped = ['g', 'half', 'inf'].map((r) => [RAY_NAME[r], strip(RAYS[r], [2, 3], 12), orderOf(RAYS[r])]);
    // the comparison machine: its steps and its answer on all pairs of short lists
    const lists = range(F.lists + 1).flatMap((n) => range(2 ** n).map((b) => range(n).map((k) => (b >> k) & 1)));
    let machineBad = 0,
      machineMost = 0,
      machinePairs = 0;
    for (const a of lists)
      for (const b of lists) {
        const r = machine(a, b);
        machinePairs++;
        machineMost = Math.max(machineMost, r.steps);
        if (r.answer !== same(a, b) || !same(r.left, a) || !same(r.right, b) || r.steps > 2 * (a.length + b.length) + 4) machineBad++;
      }
    // the depth budget: the integer inequality at the depth, and that no smaller depth has it
    let depthBad = 0,
      depthTried = 0,
      loose = 0;
    for (let c = 1; c <= F.budget; c++)
      for (let d = 1; d <= F.budget; d++)
        for (let p = 1; p <= F.budget; p++)
          for (let q = 1; q <= F.budget; q++) {
            const N = quarterDepth(c, d, p, q);
            depthTried++;
            if (!certified(c, d, p, q, N)) depthBad++;
            if (N > 0 && certified(c, d, p, q, N - 1)) loose++;
          }
    // the jets: inverse times base is 1, on the slider of x₀
    let jetBad = 0;
    for (let k = -F.x0; k <= F.x0; k++) {
      const x = frac(BigInt(k), 4n),
        q = Q(Number(x[0]), Number(x[1]));
      if (!jMul(kappaJetAt(q), jetBase(q)).every((v, i) => eqQ(v, Q(i ? 0 : 1)))) jetBad++;
    }
    return {
      normal: { tried: box.length, bad: normalBad, canon: canon.length },
      law,
      lawTried,
      lawTuples,
      turnBad,
      cycle,
      gramBad,
      gramTried: canon.length ** 2,
      pairs,
      chordBad,
      rayBad,
      groupBad,
      groupTried: few.length ** 3,
      heapBad,
      least,
      at,
      dirs: dirs.length,
      open,
      fractions,
      denBad,
      lenBad,
      longest,
      stripped,
      machinePairs,
      machineBad,
      machineMost,
      depthTried,
      depthBad,
      loose,
      jets: 2 * F.x0 + 1,
      jetBad,
      raw: { z0: kappa(ZERO4, ZERO4), z2: triad(P0, P0, TWO4) },
      depth: quarterDepth(7, 2, 1, 10),
      bound: frac(7n, 2n * 4n ** 3n)
    };
  }
  /** The comparison machine of binary names: compare, restore left, restore right, finish, one label a step. */
  function machine(a, b) {
    let left = [...a],
      right = [...b],
      equalSoFar = true,
      steps = 0,
      answer = null,
      label = 'compare';
    const savedLeft = [],
      savedRight = [];
    while (label) {
      steps++;
      if (label === 'compare') {
        const x = left.length ? left.shift() : null,
          y = right.length ? right.shift() : null;
        if (x === null && y === null) label = 'left';
        else {
          equalSoFar = equalSoFar && x === y;
          if (x !== null) savedLeft.unshift(x);
          if (y !== null) savedRight.unshift(y);
        }
      } else if (label === 'left') {
        if (savedLeft.length) left.unshift(savedLeft.shift());
        else label = 'right';
      } else if (label === 'right') {
        if (savedRight.length) right.unshift(savedRight.shift());
        else label = 'finish';
      } else {
        answer = equalSoFar;
        label = null;
      }
    }
    return { steps, answer, left, right };
  }
  const BENCH = benchmarks();
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    master: () => String(MASTER_STEPS),
    axOmega: () => String(CENSUS.axioms.omega.length),
    axReal: () => String(CENSUS.axioms.real.length),
    half: () => relQ(fr(kappa(P0, PHALF))),
    one: () => relQ(fr(kappa(P0, P0))),
    zero: () => relQ(fr(kappa(P0, PINF))),
    quarter: () => relQ(fr(kappa(P0, G120))),
    schur: () => relQ(SCHUR),
    depth: () => `= ${BENCH.depth}`,
    bound: () => relQ(BENCH.bound),
    cenOmega: () => CENSUS.omega.join(' · '),
    cenReal: () => CENSUS.real.join(' · '),
    steps: () => TASKS.map((t) => t.steps).join(' · ')
  };
  /** The text of the NUM box. */
  function numText(say) {
    const B = BENCH,
      list = (xs) => xs.join(say('、', ', ')),
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`),
      lawBad = Object.values(B.law).reduce((s, n) => s + n, 0),
      spectrum = list(CONJUNCTS.filter((c) => c.kappa).map((c) => both(fr(kappa(P0, c.kappa))))),
      orders = list(B.stripped.map(([name, M, o]) => `${name}${say('：', ': ')}M = ${M}${M === o ? '' : say(`（应为 ${o}）`, ` (should be ${o})`)}`));
    return say(
      `打开页面时由脚本用整数与分数现算，是上面各条定理的个别实例，不检验定理的前提。八条断言成立 ${MASTER_OK} 条，步数 ${list(CONJUNCTS.map((c) => String(c.steps)))}，共 ${MASTER_STEPS} 步整数运算；κ 谱 ${spectrum}；四项任务 ${list(TASKS.map((t) => String(t.steps)))} 步。normalize：${B.normal.tried} 个四元组的 ${FRAME.mults.length} 种倍数归到同一本原代表，${bad(B.normal.bad)}；${B.normal.canon} 个规范元上六条律（${B.lawTried} 对，${B.lawTuples} 个五元组）与模方乘性${bad(lawBad)}，Ad(p) 的正交与行列式${bad(B.turnBad)}，格拉姆—拉格朗日恒等式（${B.gramTried} 对）${bad(B.gramBad)}；Ad(g120) 把 e₁, e₂, e₃ 送到 ${B.cycle.map((k) => 'e' + subscript(k + 1)).join(', ')}。边界反例：κ(z₀, z₀) = ⟨${B.raw.z0.num}, ${B.raw.z0.den}⟩，triad p0 p0 z₂ = ${tuple(B.raw.z2)}。赫维茨单位 24 个：${B.pairs} 对上 κ 与 1 − 弦长²/4 ${bad(B.chordBad)}，射线核与旋量内积模方${bad(B.rayBad)}；${B.groupTried} 个三元组的群分解${bad(B.groupBad)}；堆序列到 n = 6 与切比雪夫公式${bad(B.heapBad)}。舒尔：${RAILS.bridge.max + 1} 个 y 上最小值 ${both(B.least)}，在 y = ${list(B.at)} 取到。六轴：${B.dirs} 个整方向未被覆盖 ${B.open} 个。分母 ≤ ${FRAME.dens} 的 ${B.fractions} 个分数：既约分母${bad(B.denBad)}，收敛子列表最长 ${B.longest}，长度界${bad(B.lenBad)}。素因子剥离（m = 12，P = 2, 3）：${orders}。比较机：${B.machinePairs} 对列表最多 ${B.machineMost} 步，${bad(B.machineBad)}。深度：${B.depthTried} 组的整数不等式${bad(B.depthBad)}，可再减小的 ${B.loose} 组；rationalQuarterDepth 7 2 1 10 = ${B.depth}，70 &lt; 128，7/128 ${relQ(B.bound, 6)}。射流：${B.jets} 个 x₀ 上逆元乘回${bad(B.jetBad)}。<br>Lean 实测（${CENSUS.lean}，Mathlib ${CENSUS.mathlib}，本页不重算）：§32.8 的清单公理为空；四项任务各取一份证明，#print axioms 走过的声明，OmegaMath ${list(CENSUS.omega.map(String))} 个、公理 ${axiomText('omega')}，Mathlib.Real ${list(CENSUS.real.map(String))} 个、公理 ${axiomText('real')}，其中只有 T3 用到 Filter.Tendsto；由 kappa_refl_bad 推出 False 的证明 ${CENSUS.boom} 个。decide 在 (1 : ℝ) + 1 = 2 上停在 Classical.choice；#eval (1 + 1 : ℝ) 只打印柯西列，1/2 : ℝ 是 noncomputable。Init 里 Nat.gcd、Int.natAbs、Int.decEq、Int.decLt 不依赖公理，Rat.add、Rat.mul、Rat.div 与 Int 的 == 依赖三条，Rat.inv 依赖 propext 与 Quot.sound。integer_sound 与 real_sound 的所钉声明行缺少官方公理测量，只能给出三条标准公理的许可上界。数值演示，不是证明。`,
      `Computed in integers and fractions by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Of the eight conjuncts ${MASTER_OK} hold, in ${list(CONJUNCTS.map((c) => String(c.steps)))} steps, ${MASTER_STEPS} integer steps together; spectrum of κ ${spectrum}; the four tasks take ${list(TASKS.map((t) => String(t.steps)))} steps. normalize: ${FRAME.mults.length} multiples of ${B.normal.tried} tuples reach one primitive representative, ${bad(B.normal.bad)}; on ${B.normal.canon} canonical elements the six laws (${B.lawTried} pairs, ${B.lawTuples} quintuples) and the multiplicative norm, ${bad(lawBad)}; Ad(p) orthogonal with its determinant, ${bad(B.turnBad)}; the Lagrange–Gram identity (${B.gramTried} pairs), ${bad(B.gramBad)}; Ad(g120) sends e₁, e₂, e₃ to ${B.cycle.map((k) => 'e' + subscript(k + 1)).join(', ')}. Raw counterexamples: κ(z₀, z₀) = ⟨${B.raw.z0.num}, ${B.raw.z0.den}⟩, triad p0 p0 z₂ = ${tuple(B.raw.z2)}. The 24 Hurwitz units: on ${B.pairs} pairs κ vs 1 − chord²/4, ${bad(B.chordBad)}; ray kernel vs squared spinor product, ${bad(B.rayBad)}; the group on ${B.groupTried} triples, ${bad(B.groupBad)}; the heap up to n = 6 vs the Chebyshev formulas, ${bad(B.heapBad)}. Schur: the least value over ${RAILS.bridge.max + 1} values of y is ${both(B.least)}, attained at y = ${list(B.at)}. Six axes: of ${B.dirs} integer directions ${B.open} are not covered. ${B.fractions} fractions with denominators ≤ ${FRAME.dens}: reduced denominators, ${bad(B.denBad)}; longest list of convergents ${B.longest}, length bound, ${bad(B.lenBad)}. Stripping (m = 12, P = 2, 3): ${orders}. The comparison machine: ${B.machinePairs} pairs of lists, at most ${B.machineMost} steps, ${bad(B.machineBad)}. Depth: the integer inequality for ${B.depthTried} budgets, ${bad(B.depthBad)}, ${B.loose} with a smaller depth; rationalQuarterDepth 7 2 1 10 = ${B.depth}, 70 &lt; 128, 7/128 ${relQ(B.bound, 6)}. Jets: inverse times base at ${B.jets} points x₀, ${bad(B.jetBad)}.<br>Measured in Lean (${CENSUS.lean}, Mathlib ${CENSUS.mathlib}; not recomputed here): the listing of §32.8 has no axioms; with one proof per task, the declarations #print axioms walks are ${list(CENSUS.omega.map(String))} for OmegaMath, axioms ${axiomText('omega')}, and ${list(CENSUS.real.map(String))} for Mathlib.Real, axioms ${axiomText('real')}, Filter.Tendsto only in T3; the proof of False from kappa_refl_bad has ${CENSUS.boom}. decide stops at Classical.choice on (1 : ℝ) + 1 = 2; #eval (1 + 1 : ℝ) prints a Cauchy sequence, 1/2 : ℝ is noncomputable. In Init, Nat.gcd, Int.natAbs, Int.decEq and Int.decLt depend on no axiom, Rat.add, Rat.mul, Rat.div and == on Int on three, Rat.inv on propext and Quot.sound. The pinned rows for integer_sound and real_sound omit the official axiom measurement. The three standard axioms give an upper bound. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
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
  window.LEAN4_DEBUG = Object.freeze({
    get state() {
      return plain({
        ...calc(),
        at: state.at,
        scene: state.scene,
        regime: regimeOf(calc()),
        route: state.route,
        ray: state.ray,
        mult: state.mult,
        target: state.target,
        guard: state.guard,
        lens: state.lens,
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
    calc: (over = {}) => plain(compute({ ...FRESH, at: { ...STILL, ...(over.at || {}) }, ...over, ...{ at: { ...STILL, ...(over.at || {}) } } })),
    presets: plain(PRESETS),
    conjuncts: () => plain(CONJUNCTS.map(({ law, ok, steps }) => ({ law, ok, steps }))),
    tasks: () => plain(TASKS.map(({ ok, steps }) => ({ ok, steps }))),
    census: () => plain(CENSUS),
    /** The integer core, for tests: normalize, triad, κ and the jet at a rational point. */
    core: {
      normal: (t) => plain(normal(t)),
      triad: (a, b, c) => triad(a, b, c),
      kappa: (a, b) => plain(kappa(a, b)),
      jet: (num, den) => plain(kappaJetAt(Q(num, den))),
      depth: (c, d, p, q) => quarterDepth(c, d, p, q),
      dir: (q) => dir(q)
    },
    /** What the NUM box and the drawer are written from. */
    bench: () => plain({ ...BENCH, frame: FRAME }),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), sci },
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of the direction of a tuple on the ball. */
    pointTarget: (q) => {
      const s = sc.p(on(q)),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + s[0], y: b.top + s[1], depth: s[2] };
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
