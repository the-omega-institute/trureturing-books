/* OMEGA//FRACTRAN · 观察者原生有理指令集 · the observer-native rational instruction set (Chapter 38, §38.14)
   World (kit.solid): z up. One fraction gate a/b on five stages:
     adder   the orthogonal prime crystal: one pillar per prime, its height the exponent; 3/2 moves a block from 2 to 3;
     mult    Conway's six-fraction multiplier 2^a·3^b → 5^(ab), the flag primes 11 and 13 in magenta;
     prime   PRIMEGAME from 2: pure powers of 2 at beats 19, 69, 281, 710, and two levels of lemmas that fold the beats;
     rotor   p = 5 rotors on S³(1), drawn stereographically from −1: the word Ψ is a stack, Q = π̄/5 pops its top;
     audit   three lanes: an overwritten register, the scalar crystal of PRIMEGAME, the rotor stack.
   A beat of a gate: the guard b | N reads the past (0), attention takes the first rule that passes in the order
   q₁ ≻ … ≻ q_k (1/2), closure writes the integer N′ = N·a/b (1). The rail is the beat. Every state is a big integer
   (BigInt) or an integer quadruple; nothing is rounded. A number is printed after “=” only when the printed digits are
   the value, and after “≈” when they round it. Read-only probe: window.OFISA_DEBUG. */
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
  const int = (n) => String(n).replace('-', '−');
  const tuple = (t) => `(${t.map(int).join(', ')})`;
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  const subscript = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;

  /* ---------- exact fractions [p, q] of big integers, q > 0 ---------- */
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
  const fstr = ([p, q]) => int(p) + (q === 1n ? '' : '/' + q);
  /** A fraction in d decimals, rounded to the nearest: the text, and whether the decimal is the fraction itself. */
  function decimals([p, q], d) {
    const a = (p < 0n ? -p : p) * 10n ** BigInt(d),
      k = (2n * a + q) / (2n * q),
      s = String(k).padStart(d + 1, '0');
    return { text: (p < 0n && k > 0n ? '−' : '') + s.slice(0, s.length - d) + (d ? '.' + s.slice(s.length - d) : ''), exact: a === k * q };
  }
  /** “= 0.2000” for a fraction its digits are, “≈ 0.6667” for one they round. */
  const relQ = (q, d = 4) => {
    const { text, exact } = decimals(q, d);
    return `${exact ? '=' : '≈'} ${text}`;
  };
  /** A double that is not a fraction of the page (a logarithm): always “≈”. */
  const approx = (x, d = 4) => `≈ ${fmt(x, d)}`;

  /* ---------- the scalar machine: a list of fractions acting on a big integer ---------- */
  const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
    PRB = PR.map(BigInt),
    LOGP = PR.map(Math.log);
  /** The exponent ledger of a positive integer over PR, and the part left over (1 for every state of this page). */
  function ledgerOf(n) {
    const e = PR.map(() => 0);
    let r = n;
    PRB.forEach((p, i) => {
      while (r % p === 0n) {
        r /= p;
        e[i]++;
      }
    });
    return { e, rest: r };
  }
  const ruleOf = (s) => {
    const [a, b = '1'] = s.split('/').map((x) => x.trim()),
      A = BigInt(a),
      B = BigInt(b);
    return { text: `${a}/${b}`, a: A, b: B, ea: ledgerOf(A).e, eb: ledgerOf(B).e };
  };
  const PROGRAMS = {
    adder: { rules: ['3/2'].map(ruleOf), flags: [], primes: [2, 3, 5, 7] },
    mult: { rules: ['455/33', '11/13', '1/11', '3/7', '11/2', '1/3'].map(ruleOf), flags: [11, 13], primes: [2, 3, 5, 7, 11, 13] },
    prime: { rules: ['17/91', '78/85', '19/51', '23/38', '29/33', '77/29', '95/23', '77/19', '1/17', '11/13', '13/11', '15/2', '1/7', '55/1'].map(ruleOf), flags: [11, 13, 17, 19, 23, 29], primes: PR }
  };
  /* every guard test b | N (and every integrality test of a rotor candidate) counts one */
  let guards = 0;
  /** One beat: the first rule whose guard b | N passes; the rules before it tear. r = −1: no rule passes, the machine halts. */
  function beat(rules, N, count = true) {
    for (let i = 0; i < rules.length; i++) {
      if (count) guards++;
      if (N % rules[i].b === 0n) return { r: i, N: (N / rules[i].b) * rules[i].a };
    }
    return { r: -1, N };
  }
  const isFlag = (flags, e) => flags.some((f) => e[PR.indexOf(f)] > 0);
  /** A run from N0 for at most cap beats: the states, the rule fired at every beat, the rule of the next beat, the
      ledgers, ln N from the ledger, and which states carry a flag prime. */
  function run(prog, N0, cap) {
    const states = [N0],
      fired = [];
    let N = N0,
      next = -1;
    for (;;) {
      const s = beat(prog.rules, N, fired.length < cap);
      if (s.r < 0 || fired.length >= cap) {
        next = s.r;
        break;
      }
      fired.push(s.r);
      N = s.N;
      states.push(N);
    }
    const led = states.map((x) => ledgerOf(x).e);
    return {
      states,
      fired,
      next,
      n: fired.length,
      halted: next < 0,
      led,
      ln: led.map((e) => e.reduce((s, k, i) => s + k * LOGP[i], 0)),
      flagged: led.map((e) => isFlag(prog.flags, e)),
      maxE: Math.max(1, ...led.flat())
    };
  }
  /** The two levels of lemmas of a run: A merges a beat that brings a flag prime in with the next beat when their
      product carries no flag prime; B merges repeats of one step. Each level is the list of state indices where its
      steps begin and end, with the fraction and the repeat count of every step. */
  function folds(prog, tr) {
    const flagFree = (e) => prog.flags.every((f) => e[PR.indexOf(f)] === 0);
    const A = [];
    for (let i = 0; i < tr.n; ) {
      const q = prog.rules[tr.fired[i]];
      if (i + 1 < tr.n) {
        const q2 = prog.rules[tr.fired[i + 1]],
          pair = frac(q.a * q2.a, q.b * q2.b);
        if (!(flagFree(q.ea) && flagFree(q.eb)) && flagFree(ledgerOf(pair[0]).e) && flagFree(ledgerOf(pair[1]).e)) {
          A.push({ from: i, to: i + 2, q: pair, k: 1, pair: true });
          i += 2;
          continue;
        }
      }
      A.push({ from: i, to: i + 1, q: [q.a, q.b], k: 1, pair: false });
      i++;
    }
    const B = [];
    for (const s of A) {
      const last = B[B.length - 1];
      if (last && last.q[0] === s.q[0] && last.q[1] === s.q[1]) {
        last.to = s.to;
        last.k++;
      } else B.push({ ...s });
    }
    const bounds = (steps) => [0, ...steps.map((s) => s.to)];
    return { raw: range(tr.n + 1), A: bounds(A), B: bounds(B), stepsA: A, stepsB: B, lemmas: [...new Set(A.filter((s) => s.pair).map((s) => fstr(s.q)))] };
  }
  const traces = new Map();
  /** The run of a scalar card for its inputs, kept once computed. */
  function traceOf(scene, s = state) {
    const key = scene === 'adder' ? `adder|${s.a}|${s.b}` : scene === 'mult' ? `mult|${s.ma}|${s.mb}` : 'prime';
    if (!traces.has(key)) {
      const prog = PROGRAMS[scene === 'audit' ? 'prime' : scene];
      const N0 = scene === 'adder' ? 2n ** BigInt(s.a) * 3n ** BigInt(s.b) : scene === 'mult' ? 2n ** BigInt(s.ma) * 3n ** BigInt(s.mb) : 2n;
      const tr = run(prog, N0, scene === 'prime' || scene === 'audit' ? PG_BEATS : 400);
      tr.folds = folds(prog, tr);
      traces.set(key, tr);
    }
    return traces.get(key);
  }
  const PG_BEATS = 710;

  /* ---------- the rotor machine: integer quadruples, p = 5 ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = ([w, x, y, z]) => [w, -x + 0, -y + 0, -z + 0];
  const qn2 = (q) => dot(q, q);
  const GEN = { '+x': [1, 2, 0, 0], '-x': [1, -2, 0, 0], '+y': [1, 0, 2, 0], '-y': [1, 0, -2, 0], '+z': [1, 0, 0, 2], '-z': [1, 0, 0, -2] };
  const GEN_NAMES = Object.keys(GEN);
  const INV = { '+x': '-x', '-x': '+x', '+y': '-y', '-y': '+y', '+z': '-z', '-z': '+z' };
  const ONE4 = [1, 0, 0, 0];
  const Q_RULES = { Q1: { gen: '+y', name: 'Q₁', text: '(1 − 2j)/5' }, Q2: { gen: '+x', name: 'Q₂', text: '(1 − 2i)/5' } };
  const WORDS = { XY: ['+x', '+y'], YX: ['+y', '+x'] };
  const wordOf = (w) => w.reduce((p, g) => qmul(p, GEN[g]), ONE4);
  /** The candidate Ψ·π̄/5 as five times itself, and whether it is integral. */
  const candidate = (psi, g) => {
    const c5 = qmul(psi, qconj(GEN[g]));
    return { c5, whole: c5.every((v) => v % 5 === 0) };
  };
  const quarterText = (c5) => `(${c5.map((v) => fstr(frac(BigInt(v), 5n))).join(', ')})`;
  /** Pop the stack Ψ with the gates in the attention order: every beat the first Q whose candidate is integral fires. */
  function rotorRun(order, attn) {
    const list = attn === 'Q2' ? ['Q2', 'Q1'] : ['Q1', 'Q2'];
    let psi = wordOf(WORDS[order]);
    const states = [psi],
      beats = [];
    let halt = null;
    for (let t = 0; t < 6; t++) {
      const torn = [];
      let fired = null;
      for (const q of list) {
        guards++;
        const c = candidate(psi, Q_RULES[q].gen);
        if (c.whole) {
          fired = q;
          psi = c.c5.map((v) => v / 5 + 0);
          break;
        }
        torn.push({ q, c5: c.c5 });
      }
      if (!fired) {
        halt = { torn };
        break;
      }
      beats.push({ fired, torn, rank: list.indexOf(fired) });
      states.push(psi);
    }
    return { order, attn, list, states, beats, halt, n: beats.length, word: WORDS[order] };
  }
  const rotors = new Map();
  const rotorOf = (order, attn) => {
    const key = order + attn;
    if (!rotors.has(key)) rotors.set(key, rotorRun(order, attn));
    return rotors.get(key);
  };
  /** Reduced words of the six generators up to a length: no letter followed by its inverse. */
  function wordsUpTo(n) {
    const out = [];
    let layer = [[]];
    for (let k = 1; k <= n; k++) {
      layer = layer.flatMap((w) => GEN_NAMES.filter((g) => !w.length || INV[w[w.length - 1]] !== g).map((g) => [...w, g]));
      out.push(...layer);
    }
    return out;
  }
  /* the words of length two in the northern half w > 0, the part of S³ that the ball shows; the six squares such as
     (1, 2, 0, 0)² = (−3, 4, 0, 0) lie in the southern half, outside it */
  const LEVEL2 = wordsUpTo(2)
    .filter((w) => w.length === 2)
    .map(wordOf)
    .filter((q) => q[0] > 0);
  /** The one-hot six-bit word of a generator: the register of the overwrite lane. */
  const onehot = (g) => GEN_NAMES.map((h) => (h === g ? 1 : 0));

  /* ---------- the state: one rail value per card ---------- */
  const SCENES = ['adder', 'mult', 'prime', 'rotor', 'audit'];
  const STILL = { adder: 3, mult: 18, prime: PG_BEATS, rotor: 2, audit: PG_BEATS };
  const FRESH = { a: 3, b: 2, ma: 2, mb: 2, level: 'raw', order: 'XY', attn: 'Q1' };
  const RAILS = {
    adder: { rate: 0.75, whole: false },
    mult: { rate: 2.4, whole: false },
    prime: { rate: 0, whole: true },
    rotor: { rate: 0.5, whole: false },
    audit: { rate: 100, whole: true }
  };
  const state = { scene: 'adder', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  /** The end of the rail of a scene: its beats, or its lemma steps. */
  function railMaxOf(scene, s = state) {
    if (scene === 'adder' || scene === 'mult') return traceOf(scene, s).n;
    if (scene === 'prime') return traceOf('prime').folds[s.level].length - 1;
    if (scene === 'rotor') return rotorOf(s.order, s.attn).n;
    return PG_BEATS;
  }
  function split(t) {
    const k = Math.floor(t + 1e-9);
    return { k, f: t - k < 1e-9 ? 0 : t - k };
  }
  const isHit = (N) => N > 2n && (N & (N - 1n)) === 0n;
  /** What a scalar card shows at the rail value v: the state k, the share f of the beat to the next, the rule that
      fires next (or −1), the rules it tears, and for PRIMEGAME the beat behind a lemma step. */
  function scalarView(scene, s, v) {
    const tr = traceOf(scene, s),
      prog = PROGRAMS[scene === 'audit' ? 'prime' : scene],
      bounds = scene === 'prime' ? tr.folds[s.level] : null,
      steps = bounds ? bounds.length - 1 : tr.n,
      { k: k0, f: f0 } = split(clamp(v, 0, steps)),
      k = Math.min(k0, steps),
      f = k >= steps ? 0 : f0,
      at = bounds ? bounds[k] : k,
      to = bounds ? bounds[Math.min(k + 1, steps)] : Math.min(k + 1, tr.n),
      r = at < tr.n ? tr.fired[at] : tr.next,
      N = tr.states[at],
      e = tr.led[at];
    const torn = (r < 0 ? prog.rules.map((_, i) => i) : range(r)).map((j) => ({ j, gap: prog.rules[j].eb.map((b, i) => Math.max(0, b - e[i])) }));
    const flagsSoFar = tr.flagged.slice(1, at + 1).filter(Boolean).length;
    return { scene, k, f, at, to, steps, beats: tr.n, r, N, e, ln: tr.ln[at], torn, flagged: tr.flagged[at], flagsSoFar, halted: at >= tr.n && tr.halted, hit: isHit(N), N0: tr.states[0], end: tr.states[tr.n], prog };
  }
  function rotorView(s, v) {
    const R = rotorOf(s.order, s.attn),
      { k: k0, f: f0 } = split(clamp(v, 0, R.n)),
      k = Math.min(k0, R.n),
      f = k >= R.n ? 0 : f0,
      b = k < R.n ? R.beats[k] : null;
    return { k, f, n: R.n, psi: R.states[k], start: R.states[0], next: b ? b.fired : null, torn: b ? b.torn : R.halt.torn, run: R, halted: k >= R.n };
  }
  function compute(s) {
    const t = s.at;
    return {
      adder: scalarView('adder', s, t.adder),
      mult: scalarView('mult', s, t.mult),
      prime: scalarView('prime', s, t.prime),
      rotor: rotorView(s, t.rotor),
      audit: { t: t.audit, pg: scalarView('audit', s, t.audit), om: rotorView(s, Math.min(t.audit, 2)), vn: Math.min(t.audit, 2) }
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
  const cams = { panorama: [-0.5, 0.42, 1], face: [-0.1, 0.2, 1], top: [-0.3, 1.05, 1] };
  const PRESETS = {
    'prime-orthogonal-register-adder': { scene: 'adder', cam: 'panorama', play: true, still: STILL.adder },
    'conway-multiplier-18-beat-closure': { scene: 'mult', cam: 'panorama', play: true, still: STILL.mult },
    'primegame-self-crystallization-and-lemma-shortcut': { scene: 'prime', cam: 'panorama', play: true, still: STILL.prime },
    'nonabelian-p5-lps-word-order-stack': { scene: 'rotor', cam: 'face', play: true, still: STILL.rotor },
    'three-paradigm-isa-and-zero-tear-audit': { scene: 'audit', cam: 'face', play: true, still: STILL.audit }
  };
  const DEFAULT = 'prime-orthogonal-register-adder';

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
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  /* the weights of the two lenses: the observer lens brightens cyan, the classical contrast magenta */
  const weight = () => (state.lens ? { exact: 0.5, flat: 1 } : { exact: 1, flat: 0.72 });

  /* --- the crystal of a scalar card: pillars on a ring, the rack of gates above, the rim of beats on the floor --- */
  const Z0 = -0.85;
  const LAYOUT = new Map();
  /** Where everything of a scalar card stands: c is the centre of the card, k a scale (the audit lane is smaller). */
  function layout(scene, s = state) {
    const tr = traceOf(scene, s),
      key = `${scene}|${tr.states[0]}`;
    if (LAYOUT.has(key)) return LAYOUT.get(key);
    const prog = PROGRAMS[scene === 'audit' ? 'prime' : scene],
      mini = scene === 'audit',
      k = mini ? 0.62 : 1,
      c = mini ? [0, 0.1, 0] : [0, 0, 0],
      n = prog.primes.length,
      R = ({ adder: 0.62, mult: 0.8, prime: 1.0 }[scene] || 1.0) * k,
      size = Math.min(scene === 'adder' ? 0.24 : 0.2, 1.3 / tr.maxE) * k,
      z0 = mini ? -0.5 : Z0,
      top = z0 + tr.maxE * size,
      theta = (i) => PI + PI / n + (TAU * i) / n,
      pillar = (i) => [c[0] + R * cs(theta(i)), c[1] + R * sn(theta(i)), z0],
      m = prog.rules.length,
      RR = R + 0.26 * k,
      ZR = top + 0.5 * k,
      span = Math.min(PI * 1.2, m * 0.34),
      phi = (j) => (m === 1 ? PI / 2 : PI / 2 + span * (0.5 - j / (m - 1))),
      tile = (j) => (m === 1 ? [c[0], c[1] + 0.05, ZR] : [c[0] + RR * cs(phi(j)), c[1] + RR * sn(phi(j)), ZR]),
      eye = m === 1 ? [c[0], c[1] + 0.05, ZR + 0.42 * k] : [c[0], c[1], ZR + 0.06 * k],
      rim = R + 0.42 * k;
    const L0 = { scene, prog, n, R, size, z0, top, theta, pillar, m, tile, phi, eye, rim, c, k, mini, tr, lnMax: Math.max(1e-9, ...tr.ln) };
    LAYOUT.set(key, L0);
    return L0;
  }
  /** The angle of the rim at the share u of the rail: clockwise from the first pillar, leaving a gap at the end. */
  const rimAngle = (Ly, u) => Ly.theta(0) - TAU * 0.9 * u - 0.12;
  const rimPoint = (Ly, u) => [Ly.c[0] + Ly.rim * cs(rimAngle(Ly, u)), Ly.c[1] + Ly.rim * sn(rimAngle(Ly, u)), Ly.z0];
  /** A box with half extents along a right-handed frame A, B, C (A × B along C). */
  function box(c, A, B, C) {
    const corner = (x, y, z) => add(c, add(scale(A, x), add(scale(B, y), scale(C, z))));
    return {
      vertices: [corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1), corner(-1, -1, 1), corner(1, -1, 1), corner(1, 1, 1), corner(-1, 1, 1)],
      faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]]
    };
  }
  const cube = (c, h) => box(c, [h, 0, 0], [0, h, 0], [0, 0, h]);
  /** A six-sided prism standing on the floor at c: the echo column. */
  function prism(c, r, h) {
    const ring = (z) => range(6).map((k) => [c[0] + r * cs((TAU * k) / 6), c[1] + r * sn((TAU * k) / 6), c[2] + z]);
    return { vertices: [...ring(0), ...ring(h)], faces: [[5, 4, 3, 2, 1, 0], [6, 7, 8, 9, 10, 11], ...range(6).map((k) => [k, (k + 1) % 6, 6 + ((k + 1) % 6), 6 + k])] };
  }
  /** The tile of a gate: a slab facing the centre of the rack. */
  function slab(Ly, j) {
    const c = Ly.tile(j),
      w = Ly.m === 1 ? 0.2 : Math.min(0.13, (Ly.R + 0.26 * Ly.k) * Math.min(PI * 1.2, Ly.m * 0.34) * 0.34 / Math.max(1, Ly.m - 1)) * Ly.k,
      ph = Ly.m === 1 ? PI / 2 : Ly.phi(j),
      t = [-sn(ph), cs(ph), 0],
      inward = [-cs(ph), -sn(ph), 0];
    return box(c, scale(t, w), scale(inward, 0.018 * Ly.k), [0, 0, 0.075 * Ly.k]);
  }
  const cubeAt = (Ly, i, level) => add(Ly.pillar(i), [0, 0, Ly.size * (level + 0.5)]);
  /** The floor of a crystal: a disc on a polar grid out to the rim, without the cells round the foot of every pillar. */
  function floorMesh(Ly) {
    const rOut = Ly.rim + 0.14 * Ly.k,
      NR = 10,
      NA = 96,
      hole = 0.13 * Ly.k,
      bases = Ly.prog.primes.map((_, i) => Ly.pillar(i)),
      vertices = [],
      faces = [],
      idx = (i, j) => i * NA + j;
    for (let i = 0; i <= NR; i++)
      for (let j = 0; j < NA; j++) {
        const r = (rOut * i) / NR,
          th = (TAU * j) / NA;
        vertices.push([Ly.c[0] + r * cs(th), Ly.c[1] + r * sn(th), Ly.z0 - 0.004]);
      }
    for (let i = 0; i < NR; i++)
      for (let j = 0; j < NA; j++) {
        const q = [idx(i, j), idx(i + 1, j), idx(i + 1, (j + 1) % NA), idx(i, (j + 1) % NA)],
          mid = scale(q.reduce((s2, k) => add(s2, vertices[k]), [0, 0, 0]), 0.25);
        if (bases.some((b) => hypot(mid[0] - b[0], mid[1] - b[1]) < hole)) continue;
        faces.push(q);
      }
    return { vertices, faces };
  }
  /** From the top of a pillar up to a tile and back down: one quadratic Bézier for every block that moves. */
  const bezier = (a, b, u, lift) => {
    const m = add(scale(add(a, b), 0.5), [0, 0, lift]);
    return add(add(scale(a, (1 - u) * (1 - u)), scale(m, 2 * u * (1 - u))), scale(b, u * u));
  };
  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  const solid = (key, mesh, color, alpha = 1, edges = P.ink) => alpha > 0.01 && sc.poly(alpha < 0.99 ? key + '~' : key, mesh, { color, alpha, edges, pick: false, occlude: false });
  const primeColor = (prog, p) => (prog.flags.includes(p) ? P.magenta : P.cyan);
  /** The moving blocks of the beat from the state at to the next, at the share f: removed ones rise to the gate in the
      first half, new ones fall from it in the second. */
  function flights(Ly, v, f) {
    const q = Ly.prog.rules[v.r],
      T = Ly.tile(v.r),
      out = [];
    Ly.prog.primes.forEach((p, i) => {
      const gi = PR.indexOf(p);
      for (let j = 0; j < q.eb[gi]; j++) out.push({ i, p, from: cubeAt(Ly, i, v.e[gi] - 1 - j), to: T, u: clamp(2 * f, 0, 1), out: true });
      for (let j = 0; j < q.ea[gi]; j++) out.push({ i, p, from: T, to: cubeAt(Ly, i, v.e[gi] - q.eb[gi] + j), u: clamp(2 * f - 1, 0, 1), out: false });
    });
    return out;
  }
  /** One scalar card: pillars, echo column, tears below the floor, the rack, the beam, the moving blocks, the rim. */
  function drawCrystal(scene, v, a, keyBase, opts2 = {}) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      Ly = layout(scene),
      prog = Ly.prog,
      moving = v.f > 0 && v.r >= 0,
      q = v.r >= 0 ? prog.rules[v.r] : null,
      h = Ly.size * 0.44;
    // the floor is exponent 0: an opaque plate with a socket under every pillar, through which a tear hangs down
    if (!Ly.floor) Ly.floor = floorMesh(Ly);
    solid(keyBase + 'floor', Ly.floor, P.faint, a, false);
    sc.circle(add(Ly.c, [0, 0, Ly.z0 + 0.004]), [0, 0, 1], Ly.R, { color: P.violet, width: 1, alpha: 0.45 * a, back: 0.5, fade: false });
    prog.primes.forEach((p, i) => {
      const gi = PR.indexOf(p),
        color = primeColor(prog, p),
        strong = (prog.flags.includes(p) ? flat : exact) * a,
        base = Ly.pillar(i),
        keep = moving && q ? v.e[gi] - q.eb[gi] : v.e[gi];
      sc.line([base, add(base, [0, 0, Ly.top - Ly.z0 + 0.06])], { color, width: 1, dash: [3, 4], alpha: 0.4 * strong });
      // a tear: the part of a rejected denominator taller than the pillar, hanging below the floor in its socket
      const gap = Math.max(0, ...v.torn.map((t) => t.gap[gi]));
      sc.circle(add(base, [0, 0, 0.006]), [0, 0, 1], 0.12 * Ly.k, { color: gap ? P.magenta : v.e[gi] ? color : P.violet, width: gap ? 2 : 1.4, alpha: (gap ? flat : 0.8) * a, fade: false });
      for (let l = 0; l < keep; l++) solid(`${keyBase}c${p}_${l}`, cube(cubeAt(Ly, i, l), h), color, strong);
      for (let l = 0; l < gap; l++) solid(`${keyBase}t${p}_${l}`, cube(add(base, [0, 0, -Ly.size * (l + 0.5)]), h * 0.9), P.magenta, 0.6 * flat * a);
    });
    // the echo column: ln N as one scalar, banded by e_p ln p
    const hs = (Ly.top - Ly.z0) / Ly.lnMax,
      base = add(Ly.c, [0, 0, Ly.z0]);
    if (v.ln > 1e-9) solid(keyBase + 'echo', prism(base, 0.07 * Ly.k, v.ln * hs), P.violet, (state.lens ? 0.85 : 0.5) * a);
    let acc = 0;
    prog.primes.forEach((p) => {
      const gi = PR.indexOf(p);
      if (!v.e[gi]) return;
      acc += v.e[gi] * LOGP[gi];
      sc.circle(add(base, [0, 0, acc * hs]), [0, 0, 1], 0.085 * Ly.k, { color: primeColor(prog, p), width: 1.4, alpha: 0.9 * a, fade: false });
    });
    // the rim of beats on the floor: ticks at the beats (or at the pure powers of 2); the amber bead is the present
    sc.circle(add(Ly.c, [0, 0, Ly.z0 + 0.006]), [0, 0, 1], Ly.rim, { color: P.cyan, width: 1, alpha: 0.35 * a, back: 0.6, fade: false });
    const steps = v.steps;
    if (steps <= 40) for (let j = 0; j <= steps; j++) sc.bead(add(rimPoint(Ly, j / Math.max(1, steps)), [0, 0, 0.01]), { color: P.cyan, r: 2.2, alpha: 0.7 * exact * a, key: `${keyBase}tick${j}` });
    else hitIndices(v).forEach(({ j }, n) => sc.bead(add(rimPoint(Ly, j / steps), [0, 0, 0.01]), { color: P.cyan, r: 3.6, alpha: exact * a, key: `${keyBase}hit${n}` }));
    if (opts2.rackless) return;
    // the rack of gates: torn (magenta), selected (amber), dormant (violet)
    for (let j = 0; j < Ly.m; j++) {
      const torn = v.torn.some((t) => t.j === j),
        here = j === v.r;
      solid(`${keyBase}g${j}`, slab(Ly, j), here ? P.amber : torn ? P.magenta : P.violet, here ? a : torn ? 0.85 * flat * a : 0.55 * a);
    }
    sc.bead(Ly.eye, { color: P.violet, r: 5, alpha: a, key: keyBase + 'eye' });
    if (v.r >= 0) {
      tube(keyBase + 'beam', [Ly.eye, Ly.tile(v.r)], P.amber, 0.012 * Ly.k, a, 0.6);
      // the way of every block of the next beat: 0 at the pillar, 1/2 at the gate, 1 at the new top
      flights(Ly, v, moving ? v.f : 0).forEach((fl, n) => {
        const lift = 0.22 * Ly.k;
        sc.line(sample(18, (u) => bezier(fl.from, fl.to, u, lift)), { color: P.cyan, width: 1.2, dash: moving ? null : [3, 4], alpha: 0.7 * exact * a });
        if (moving && fl.u > 0 && fl.u < 1) solid(`${keyBase}fly${n}`, cube(bezier(fl.from, fl.to, fl.u, lift), h * 0.9), primeColor(prog, fl.p), a);
      });
    }
  }
  /** The pure powers of 2 of PRIMEGAME as places on the rail of the present level. */
  function hitIndices(v) {
    const tr = traceOf('prime'),
      bounds = v.scene === 'prime' ? tr.folds[state.level] : tr.folds.raw;
    return HITS.map((h) => ({ beat: h.beat, p: h.p, j: bounds.indexOf(h.beat) })).filter((h) => h.j >= 0);
  }

  /* --- the rotor stage: S³(1) drawn stereographically from −1, the identity in the centre --- */
  const RB = 1;
  const unitQ = (q) => scale(q, 1 / norm(q));
  /** The stereographic image of the line of q (scaled to the ball of radius r at c). */
  function st(q, r = RB, c = [0, 0, 0]) {
    const u = unitQ(q),
      k = r / (1 + u[0]);
    return [c[0] + u[1] * k, c[1] + u[2] * k, c[2] + u[3] * k];
  }
  const slerp = (a, b, t) => {
    const u = unitQ(a),
      v = unitQ(b),
      om = Math.acos(clamp(dot(u, v), -1, 1));
    if (om < 1e-9) return u;
    return add(scale(u, sn((1 - t) * om) / sn(om)), scale(v, sn(t * om) / sn(om)));
  };
  const geodesic = (a, b, r, c, n = 40, t0 = 0, t1 = 1) => sample(n, (u) => st(slerp(a, b, lerp(t0, t1, u)), r, c));
  /** The whole great circle through a and b, cut where it leaves a box around the ball. */
  function greatCircle(a, b, r, c, reach = 2.1) {
    const u = unitQ(a),
      w = unitQ(b),
      perp = unitQ(sub(w, scale(u, dot(u, w)))),
      out = [];
    let run2 = [];
    for (let k = 0; k <= 160; k++) {
      const th = (TAU * k) / 160,
        q = add(scale(u, cs(th)), scale(perp, sn(th)));
      if (q[0] < -0.96) {
        if (run2.length > 1) out.push(run2);
        run2 = [];
        continue;
      }
      const p = st(q, r, c);
      if (norm(sub(p, c)) > reach * r) {
        if (run2.length > 1) out.push(run2);
        run2 = [];
        continue;
      }
      run2.push(p);
    }
    if (run2.length > 1) out.push(run2);
    return out;
  }
  /** Where the rotor card keeps its gates, its eye and its stack, around a ball of radius r at c. */
  const ROT = (r = RB, c = [0, 0, 0]) => ({
    r,
    c,
    tile: (rank) => add(c, scale([1.62, 0.05, 0.58 - 0.4 * rank], r)),
    eye: add(c, scale([1.62, 0.05, 1.08], r)),
    block: (lvl) => add(c, scale([-1.62, 0.05, -0.34 + 0.32 * lvl], r))
  });
  /** The point of the pop path at the rail value v. */
  function popPoint(R, v, r = RB, c = [0, 0, 0]) {
    const { k, f } = split(clamp(v, 0, R.n));
    if (k >= R.n) return st(R.states[R.n], r, c);
    return st(slerp(R.states[k], R.states[k + 1], f), r, c);
  }
  function drawRotor(v, a, r = RB, c = [0, 0, 0], keyBase = 'r', mini = false) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      R = v.run,
      G = ROT(r, c);
    // the ball: S³(1) with its equator w = 0 as the violet sphere, three great circles through the axes
    sc.glass(keyBase + 'ball', c, r, { color: P.violet, alpha: 0.05 * a, rim: 0.5 * a });
    for (const n of [[0, 0, 1], [0, 1, 0], [1, 0, 0]]) sc.circle(c, n, r, { color: P.violet, width: 1, alpha: 0.4 * a, back: 0.25 });
    // the identity, the six generators and the twenty-four words of length two with w > 0
    sc.bead(c, { color: P.violet, r: mini ? 3.4 : 4.6, alpha: a, key: keyBase + 'one' });
    GEN_NAMES.forEach((g) => sc.bead(st(GEN[g], r, c), { color: P.violet, r: mini ? 2.6 : 3.8, alpha: 0.9 * a, key: keyBase + 'gen' + g }));
    if (!mini) LEVEL2.forEach((q, i) => sc.bead(st(q, r, c), { color: P.violet, r: 2, alpha: 0.55 * a, key: keyBase + 'l2_' + i }));
    // the other order: a violet ring where its word sits
    const other = rotorOf(R.order === 'XY' ? 'YX' : 'XY', R.attn).states[0];
    sc.ring(st(other, r, c), { color: P.violet, r: mini ? 6 : 9, alpha: 0.8 * a, normal: cam.D, key: keyBase + 'other' });
    // the way the word was pushed: dashed cyan, 1 → first letter → Ψ
    const pushed = [ONE4, GEN[R.word[0]], R.states[0]];
    for (let j = 0; j < 2; j++) sc.line(geodesic(pushed[j], pushed[j + 1], r, c), { color: P.cyan, width: 1.1, dash: [4, 4], alpha: 0.55 * exact * a });
    // the pop path up to the present: cyan tubes along geodesics of S³
    const at = v.k + v.f;
    for (let j = 0; j < R.n; j++) {
      const t1 = clamp(at - j, 0, 1);
      if (t1 > 0.001) tube(`${keyBase}pop${j}`, geodesic(R.states[j], R.states[j + 1], r, c, 40, 0, t1), P.cyan, (mini ? 0.012 : 0.018) * r, exact * a);
      sc.bead(st(R.states[j + 1], r, c), { color: P.cyan, r: mini ? 3 : 4.2, alpha: (at >= j + 1 ? 1 : 0.45) * exact * a, key: `${keyBase}st${j}` });
    }
    // the other order: its pops dashed and faint, and the tears of its beats, so that both words stand on one picture
    const O = rotorOf(R.order === 'XY' ? 'YX' : 'XY', R.attn);
    for (let j = 0; j < O.n; j++) sc.line(geodesic(O.states[j], O.states[j + 1], r, c), { color: P.cyan, width: 1, dash: [2, 4], alpha: 0.4 * exact * a });
    O.beats.forEach((b, j) =>
      b.torn.forEach((t) => {
        sc.line(geodesic(O.states[j], t.c5, r, c, 24, 0, 0.62), { color: P.magenta, width: 1.2, dash: [3, 4], alpha: 0.75 * flat * a });
        sc.ring(st(t.c5, r, c), { color: P.magenta, r: mini ? 5 : 8, alpha: 0.85 * flat * a, normal: cam.D, key: `${keyBase}otear${j}${t.q}` });
      })
    );
    // the closed geodesic of the present pop, faint and dashed
    if (!mini && !v.halted) for (const [n, seg] of greatCircle(R.states[v.k], R.states[v.k + 1], r, c).entries()) sc.line(seg, { color: P.cyan, width: 1, dash: [2, 5], alpha: 0.35 * exact * a, key: keyBase + 'gc' + n });
    // the tears of this beat: magenta rings off the lattice, a broken dashed arc towards them
    for (const t of v.halted ? [] : v.torn) {
      const q = t.c5,
        p = st(q, r, c);
      sc.line(geodesic(v.psi, q, r, c, 24, 0, 0.62), { color: P.magenta, width: 1.4, dash: [3, 4], alpha: flat * a });
      sc.ring(p, { color: P.magenta, r: mini ? 6 : 10, alpha: flat * a, normal: cam.D, key: `${keyBase}tear${t.q}` });
    }
    // the halt ε_self: a cyan ring round the identity
    if (v.halted) sc.ring(c, { color: P.cyan, r: mini ? 9 : 14, alpha: exact * a, normal: cam.D, key: keyBase + 'eps' });
    if (mini) return;
    // the gates Q₁ and Q₂ in the attention order, the eye and its beam
    R.list.forEach((qName, rank) => {
      const torn = v.torn.some((t) => t.q === qName),
        here = qName === v.next;
      solid(`${keyBase}Q${qName}`, box(G.tile(rank), [0.2 * r, 0, 0], [0, 0.02 * r, 0], [0, 0, 0.1 * r]), here ? P.amber : torn ? P.magenta : P.violet, here ? a : torn ? 0.85 * flat * a : 0.55 * a);
    });
    sc.bead(G.eye, { color: P.violet, r: 5, alpha: a, key: keyBase + 'eye' });
    if (v.next) tube(keyBase + 'beam', [G.eye, G.tile(R.list.indexOf(v.next))], P.amber, 0.012, a, 0.6);
    // the stack: a base plate, the first letter below, the last on top; a popped letter rises and leaves
    solid(keyBase + 'base', box(add(G.block(0), [0, 0, -0.17]), [0.17, 0, 0], [0, 0.17, 0], [0, 0, 0.02]), P.violet, 0.7 * a);
    R.word.forEach((g, lvl) => {
      const popAt = R.n - 1 - lvl,
        u = clamp(at - popAt, 0, 1);
      if (u >= 1) return;
      const p = add(G.block(lvl), [0, 0, 0.5 * u]),
        reading = popAt === v.k && v.f > 0;
      solid(`${keyBase}blk${lvl}`, box(p, [0.13, 0, 0], [0, 0.13, 0], [0, 0, 0.13]), reading ? P.cyan : P.violet, (1 - u) * a);
    });
  }

  /* --- the audit: an overwritten register, the scalar crystal, the rotor stack --- */
  const LANE = { vn: -1.75, cw: 0, om: 1.8 };
  const OM_R = 0.74;
  /** The cell i of the overwritten register: a column of six bits, the first on top. */
  const cellAt = (i) => [LANE.vn, 0.1, 0.72 - 0.27 * i];
  function drawRegister(v, a) {
    const { flat, exact } = weight(),
      word = WORDS[state.order],
      t = v.vn,
      written = (k) => onehot(word[k]),
      now = t >= 2 ? written(1) : t >= 1 ? written(0) : GEN_NAMES.map(() => 0),
      lost = t >= 2 ? written(0).map((b, i) => b && !now[i]) : GEN_NAMES.map(() => false);
    GEN_NAMES.forEach((g, i) => {
      const p = cellAt(i);
      if (now[i]) solid('vn' + i, cube(p, 0.11), P.cyan, exact * a);
      else if (lost[i]) solid('vnl' + i, cube(p, 0.11), P.magenta, 0.8 * flat * a);
      else solid('vne' + i, cube(p, 0.11), P.violet, 0.3 * a);
    });
    // the write head: it brings the word of the present write down onto the register
    const { k, f } = split(Math.min(t, 1.999));
    if (t < 2) {
      const i = GEN_NAMES.indexOf(word[k]);
      sc.bead(add(cellAt(i), [0.62 - 0.42 * f, 0, 0]), { color: P.amber, r: 6, alpha: a, key: 'vnHead' });
    }
  }
  function drawAudit(m, a) {
    if (a < 0.01) return;
    const v = m.audit;
    drawRegister(v, a);
    drawCrystal('audit', v.pg, a, 'cw', { rackless: true });
    drawRotor(v.om, a, OM_R, [LANE.om, 0.1, 0.05], 'om', true);
  }

  /* ---------- words ---------- */
  const SCENE_NAME = {
    adder: [['素数正交晶格', 'ORTHOGONAL PRIME CRYSTAL'], ['计数器机：搬运循环（MODEL）', 'COUNTER MACHINE: A MOVE LOOP (MODEL)']],
    mult: [['康威乘法器', "CONWAY'S MULTIPLIER"], ['计数器机：双重循环（MODEL）', 'COUNTER MACHINE: A DOUBLE LOOP (MODEL)']],
    prime: [['PRIMEGAME 结晶', 'PRIMEGAME CRYSTALLIZES'], ['标量旗标的账（MODEL）', 'THE BILL OF SCALAR FLAGS (MODEL)']],
    rotor: [['p = 5 旋子栈', 'THE p = 5 ROTOR STACK'], ['标量只看见模方（MODEL）', 'A SCALAR SEES THE NORM (MODEL)']],
    audit: [['三种指令集（MODEL）', 'THREE ISAS (MODEL)'], ['寄存器机的读法（MODEL）', 'THE REGISTER-MACHINE READING (MODEL)']]
  };
  const LENS_NAME = [
    ['观察者透镜', 'OBSERVER LENS'],
    ['经典对照 (MODEL)', 'CONTRAST (MODEL)']
  ];
  /** N written over its primes: 2³·3² = 72. */
  function ledgerText(N, e) {
    const parts = PR.map((p, i) => (e[i] ? `${p}${e[i] > 1 ? superscript(e[i]) : ''}` : '')).filter(Boolean);
    if (!parts.length) return '1';
    const f = parts.join('·');
    return f === String(N) ? f : `${f} = ${N}`;
  }
  const ruleText = (prog, r) => (r >= 0 ? prog.rules[r].text : '—');
  /** N·a/b written as a reduced fraction: the tear of a gate whose guard fails. */
  const tearText = (N, q) => fstr(frac(N * q.a, q.b));
  const gateName = (r) => `q${subscript(r + 1)}`;
  /** The live regime of a card: the HUD, the card note and the free-play note read this one value. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'adder':
      case 'mult': {
        const v = m[state.scene];
        return v.f > 0 ? 'moving' : v.halted ? 'halt' : v.at === 0 ? 'start' : 'beat';
      }
      case 'prime': {
        const v = m.prime;
        return v.f > 0 ? 'moving' : v.at === 0 ? 'start' : v.hit ? 'hit' : v.flagged ? 'flagged' : 'register';
      }
      case 'rotor': {
        const v = m.rotor;
        return v.halted ? 'halt' : v.f > 0 ? 'pop' + (v.k + 1) : v.k === 0 ? 'start' : 'mid';
      }
      default:
        return m.audit.t >= PG_BEATS ? 'done' : m.audit.t >= 2 ? 'scalar' : 'early';
    }
  }
  const torns = (v) => v.torn.filter((t) => t.j < (v.r < 0 ? Infinity : v.r));
  /** The selected gate, the torn ones and the dormant ones, in one line. */
  function gateLine(v, say = L) {
    if (v.r < 0) return say(`没有门能过（${v.prog.rules.length} 条都撕裂），停机`, `no gate passes (all ${v.prog.rules.length} tear), halt`);
    const n = v.prog.rules.length,
      torn = v.r,
      dormant = n - v.r - 1;
    return say(`${gateName(v.r)} = ${ruleText(v.prog, v.r)} · 撕裂 ${torn} · 未触发 ${dormant}`, `${gateName(v.r)} = ${ruleText(v.prog, v.r)} · torn ${torn} · dormant ${dormant}`);
  }
  /** e(N) + e(a) − e(b) on the primes the gate touches: the closure in ledger terms. */
  function closureLine(v) {
    if (v.r < 0) {
      const t = v.torn.find((x) => x.gap.some((g) => g > 0));
      if (!t) return '—';
      const i = t.gap.findIndex((g) => g > 0);
      return `${gateName(t.j)}: e${subscript(PR[i])} = ${v.e[i]} − ${v.prog.rules[t.j].eb[i]} = ${int(v.e[i] - v.prog.rules[t.j].eb[i])} &lt; 0`;
    }
    const q = v.prog.rules[v.r],
      touched = PR.map((p, i) => i).filter((i) => q.ea[i] || q.eb[i]);
    return touched.map((i) => `e${subscript(PR[i])}: ${v.e[i]}${q.ea[i] ? ` + ${q.ea[i]}` : ''}${q.eb[i] ? ` − ${q.eb[i]}` : ''} = ${v.e[i] + q.ea[i] - q.eb[i]}`).join(' · ') + ' ≥ 0';
  }
  function subline(m) {
    const s = state.scene,
      tiny = compact(),
      lens = state.lens;
    if (s === 'adder' || s === 'mult') {
      const v = m[s],
        q = v.r >= 0 ? v.prog.rules[v.r] : null;
      if (lens) {
        if (s === 'adder')
          return L(`计数器机的读法（MODEL）：寄存器 R₂ = ${v.e[0]}、R₃ = ${v.e[1]}；循环“R₂ 减一、R₃ 加一”，R₂ = 0 时跳出。指数就是计数器，分母的守卫就是“是否为零”的测试。`, `In counter-machine terms (MODEL): registers R₂ = ${v.e[0]}, R₃ = ${v.e[1]}; the loop “decrement R₂, increment R₃” exits when R₂ = 0. The exponents are the counters, the guard of the denominator is the zero test.`);
        return L(`计数器机的读法（MODEL）：R₂、R₃ 是输入，R₅ 收结果，R₇ 暂存，11 与 13 是控制状态（旗标）；交换的乘法记不住“下一步做什么”，只能靠旗标素数。`, `In counter-machine terms (MODEL): R₂ and R₃ hold the input, R₅ the result, R₇ a copy; 11 and 13 are control states (flags): a commutative product cannot remember what comes next except through flag primes.`);
      }
      if (v.halted) return s === 'adder' ? L(`${ledgerText(v.N, v.e)}：${v.N} × 3/2 = ${tearText(v.N, v.prog.rules[0])} ∉ ℤ，3/2 撕裂，停机。a + b = ${v.e[1]} 写在 3 柱上。`, `${ledgerText(v.N, v.e)}: ${v.N} × 3/2 = ${tearText(v.N, v.prog.rules[0])} ∉ ℤ, 3/2 tears, halt. a + b = ${v.e[1]} stands on the pillar of 3.`) : L(`${ledgerText(v.N, v.e)}：六条门全部撕裂，停机；a·b = ${v.e[2]} 写在 5 柱上。`, `${ledgerText(v.N, v.e)}: all six gates tear, halt; a·b = ${v.e[2]} stands on the pillar of 5.`);
      const head = v.f > 0 ? (v.f < 0.5 ? L('½ · 注意力：分母的块升向选中的门', '½ · attention: the blocks of the denominator rise to the selected gate') : L('1 · 闭合：分子的块落回柱顶，N′ 仍是整数', '1 · closure: the blocks of the numerator fall onto the pillars, N′ is an integer')) : L(`0 · 守卫：${q.b} | ${v.N}，读的是过去`, `0 · guard: ${q.b} | ${v.N}, a reading of the past`);
      const tail = s === 'adder' ? L(`第 ${v.at + 1}/${v.beats} 拍：${v.N} × ${q.text} = ${(v.N / q.b) * q.a}。`, `beat ${v.at + 1} of ${v.beats}: ${v.N} × ${q.text} = ${(v.N / q.b) * q.a}.`) : L(`第 ${v.at + 1}/${v.beats} 拍：${gateLine(v)}。`, `beat ${v.at + 1} of ${v.beats}: ${gateLine(v)}.`);
      return tiny ? `${head}；${tail}`.replace(/；/, L('；', '; ')) : `${head}${L('。', '. ')}${tail}`;
    }
    if (s === 'prime') {
      const v = m.prime,
        lv = LEVEL_NAME[state.level];
      if (lens) return L(`标量的账（MODEL）：前 ${v.at} 拍里 N 带旗标素数 ${v.flagsSoFar} 拍。控制状态只能写成旗标素数，因为乘法交换，N 记不住先后。`, `The scalar bill (MODEL): N carried a flag prime on ${v.flagsSoFar} of the first ${v.at} beats. The control state can only be written as flag primes, because multiplication commutes and N keeps no order.`);
      const where = v.hit ? L(`第 ${v.at} 拍：N = 2${superscript(v.e[0])}，只剩 2 柱，指数 ${v.e[0]} 是素数。`, `Beat ${v.at}: N = 2${superscript(v.e[0])}, only the pillar of 2 is left, and its exponent ${v.e[0]} is a prime.`) : v.at === 0 ? L('从 N = 2 出发：十四条门，十根素数柱。', 'From N = 2: fourteen gates, ten prime pillars.') : L(`第 ${v.at} 拍：${v.flagged ? 'N 带旗标素数' : 'N 不带旗标'}，下一门 ${v.r >= 0 ? `${gateName(v.r)} = ${ruleText(v.prog, v.r)}` : '—'}。`, `Beat ${v.at}: ${v.flagged ? 'N carries a flag prime' : 'N carries no flag'}, next gate ${v.r >= 0 ? `${gateName(v.r)} = ${ruleText(v.prog, v.r)}` : '—'}.`);
      const fold = state.level === 'raw' ? '' : L(`${L(...lv)}：第 ${v.k}/${v.steps} 步。`, `${L(...lv)}: step ${v.k} of ${v.steps}. `);
      return tiny ? `${fold}${where}` : `${fold}${where}${L(`纯 2 的幂出现在第 ${HITS.slice(0, 4).map((h) => h.beat).join('、')} 拍。`, ` Pure powers of 2 at beats ${HITS.slice(0, 4).map((h) => h.beat).join(', ')}.`)}`;
    }
    if (s === 'rotor') {
      const v = m.rotor,
        R = v.run;
      if (lens) return L(`标量对照（MODEL）：‖Ψ_XY‖² = ‖Ψ_YX‖² = 25 = 5·5；标量 FRACTRAN 只看见 25，分不出先 x 还是先 y。`, `Scalar contrast (MODEL): ‖Ψ_XY‖² = ‖Ψ_YX‖² = 25 = 5·5; a scalar FRACTRAN sees only 25 and cannot tell whether x or y came first.`);
      if (v.halted) return L(`两拍回到 1：栈空，没有门再给出整数，ε_self 停机。弹出次序 ${R.beats.map((b) => Q_RULES[b.fired].name).join(' → ')} 读回了字 ${R.order}。`, `Back at 1 after two beats: the stack is empty, no gate gives an integer, halt at ε_self. The pops ${R.beats.map((b) => Q_RULES[b.fired].name).join(' → ')} read back the word ${R.order}.`);
      const b = R.beats[v.k],
        tear = b.torn.length ? L(`${Q_RULES[b.torn[0].q].name} 给出 ${quarterText(b.torn[0].c5)} ∉ ℤ⁴，撕裂跳过；`, `${Q_RULES[b.torn[0].q].name} gives ${quarterText(b.torn[0].c5)} ∉ ℤ⁴ and is skipped as a tear; `) : '';
      return L(`第 ${v.k + 1} 拍：Ψ = ${tuple(v.psi)}，${tear}${Q_RULES[b.fired].name} = ${Q_RULES[b.fired].text} 给出 ${tuple(R.states[v.k + 1])} ∈ ℤ⁴。`, `Beat ${v.k + 1}: Ψ = ${tuple(v.psi)}; ${tear}${Q_RULES[b.fired].name} = ${Q_RULES[b.fired].text} gives ${tuple(R.states[v.k + 1])} ∈ ℤ⁴.`);
    }
    const v = m.audit;
    if (lens) return L(`寄存器机的读法（MODEL）：一个格子只留最后写的字；标量 FRACTRAN 把控制写成旗标素数，${PG_BEATS} 拍里 ${FLAG_TOTAL} 拍带旗标；旋子字两拍读回次序。`, `Register-machine reading (MODEL): a cell keeps only the last word written; scalar FRACTRAN writes control as flag primes, with a flag on ${FLAG_TOTAL} of ${PG_BEATS} beats; the rotor word reads the order back in two beats.`);
    return L(`左：覆盖写改了 ${FLIPS} 位，先写的 ${WORDS[state.order][0]} 丢了；中：第 ${v.pg.at} 拍，N 带旗标 ${v.pg.flagsSoFar} 拍；右：旋子栈 ${Math.min(2, Math.floor(v.t))}/2 拍。写下的状态没有一个撕裂。`, `Left: the overwrite changed ${FLIPS} bits and lost ${WORDS[state.order][0]}, written first; middle: beat ${v.pg.at}, a flag in N on ${v.pg.flagsSoFar}; right: the rotor stack at ${Math.min(2, Math.floor(v.t))} of 2 beats. No state written is torn.`);
  }
  function bigline(m) {
    const s = state.scene;
    const key = {
      adder: () => `${m.adder.N0} → ${m.adder.N} · ${m.adder.at}/${m.adder.beats}`,
      mult: () => `${m.mult.N0} → ${m.mult.N} · ${m.mult.at}/${m.mult.beats}`,
      prime: () => (m.prime.hit ? `2${superscript(m.prime.e[0])} · ${m.prime.at}` : `${m.prime.at}/${PG_BEATS}`),
      rotor: () => `${tuple(m.rotor.psi)} · ${m.rotor.k}/${m.rotor.n}`,
      audit: () => `${L('覆盖', 'overwrite')} ${FLIPS} · ${m.audit.pg.at}/${PG_BEATS} · Ω ${Math.min(2, Math.floor(m.audit.t))}/2`
    };
    const flat = {
      adder: () => `R₂ = ${m.adder.e[0]} · R₃ = ${m.adder.e[1]}`,
      mult: () => `R₅ = ${m.mult.e[2]} · ${m.mult.at}/${m.mult.beats}`,
      prime: () => `${m.prime.flagsSoFar}/${m.prime.at}`,
      rotor: () => '25 = 25',
      audit: () => `${FLAG_TOTAL}/${PG_BEATS} ↔ 2`
    };
    return `${L(...SCENE_NAME[s][state.lens])} · <span class="nb">${(state.lens ? flat : key)[s]()}</span>`;
  }
  function legendItems() {
    switch (state.scene) {
      case 'adder':
        return [['cy', L('素数柱 · 整数闭合', 'prime pillars · integer closure')], ['vi', L('回声柱 ln N · 未触发', 'echo column ln N · dormant')], ['mg', L('撕裂', 'tear')], ['am', L('注意力 · 当前拍', 'attention · present beat')]];
      case 'mult':
      case 'prime':
        return [['cy', L('寄存器素数柱', 'register pillars')], ['mg', L('旗标素数 · 撕裂', 'flag primes · tears')], ['vi', L('回声柱 · 未触发的门', 'echo column · dormant gates')], ['am', L('注意力 · 当前拍', 'attention · present beat')]];
      case 'rotor':
        return [['vi', L('S³(1) · 字长 ≤ 2 的整点（w > 0）', 'S³(1) · words of length ≤ 2, w > 0')], ['cy', L('弹栈的测地弧', 'geodesic pops')], ['mg', L('撕裂 ∉ ℤ⁴', 'tear ∉ ℤ⁴')], ['am', L('注意力 · 当前 Ψ', 'attention · present Ψ')]];
      default:
        return [['cy', L('写下的整数状态', 'integer states written')], ['mg', L('覆盖 · 旗标 · 撕裂', 'overwrite · flags · tears')], ['vi', L('S³(1) · 回声柱', 'S³(1) · echo column')], ['am', L('写头 · 当前拍', 'write head · present beat')]];
    }
  }
  const LEVEL_NAME = { raw: ['逐拍', 'raw beats'], A: ['引理 A', 'lemma A'], B: ['引理 A + B', 'lemmas A + B'] };
  /** The first tear of the word of the other order, as text, or ''. */
  function otherTear(R) {
    const O = rotorOf(R.order === 'XY' ? 'YX' : 'XY', R.attn),
      b = O.beats.find((x) => x.torn.length);
    return b ? `${quarterText(b.torn[0].c5)} ∉ ℤ⁴` : '';
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const s = state.scene,
      r = regimeOf(m),
      pair = (zh, en) => [zh, en];
    if (s === 'adder') {
      const v = m.adder;
      if (r === 'halt')
        return {
          long: pair(`2 柱空了，3 柱有 ${v.e[1]} 块：${v.N0} 经 ${v.beats} 拍停在 ${ledgerText(v.N, v.e)}。地面下的品红块是撕裂：3/2 的分母比 2 柱还高。中央紫色回声柱的高是 ln N。拖地面上的琥珀点倒回去。`, `The pillar of 2 is empty and the pillar of 3 holds ${v.e[1]} blocks: ${v.N0} stops at ${ledgerText(v.N, v.e)} after ${v.beats} beats. The magenta block below the floor is the tear: the denominator of 3/2 is taller than the pillar of 2. The violet echo column in the middle has the height ln N. Drag the amber point on the floor to go back.`),
          fig: pair(`${v.N0} 经 ${v.beats} 拍到 ${ledgerText(v.N, v.e)}；品红的撕裂让 3/2 停下。`, `${v.N0} reaches ${ledgerText(v.N, v.e)} in ${v.beats} beats; the magenta tear stops 3/2.`)
        };
      return {
        long: pair(`青色的柱是素数 2、3、5、7 的指数，一柱一个方向。琥珀光束选中唯一的门 3/2；青色弧线从 2 柱顶（0）经过门（1/2）落到 3 柱顶（1）。每一拍搬一块，N 一直是整数。`, `The cyan pillars are the exponents of the primes 2, 3, 5, 7, one direction each. The amber beam selects the only gate, 3/2; the cyan arc runs from the top of the pillar of 2 (0) through the gate (1/2) to the top of the pillar of 3 (1). Every beat moves one block, and N stays an integer.`),
        fig: pair(`3/2 每拍把一块从 2 柱搬到 3 柱：0 · 1/2 · 1。`, `3/2 moves one block from 2 to 3 per beat: 0 · 1/2 · 1.`)
      };
    }
    if (s === 'mult') {
      const v = m.mult;
      if (r === 'halt')
        return {
          long: pair(`${v.beats} 拍后只剩 5 柱：${v.N0} 变成 ${ledgerText(v.N, v.e)}。后方架上六块门全成品红：没有一条的分母够得着，机器停下。辅助的 7 柱与品红的旗标 11、13 柱都已清空，它们只在中途出现。`, `After ${v.beats} beats only the pillar of 5 is left: ${v.N0} has become ${ledgerText(v.N, v.e)}. All six gates on the rack turn magenta: no denominator fits, and the machine halts. The auxiliary pillar 7 and the magenta flag pillars 11 and 13 are empty again; they appear only on the way.`),
          fig: pair(`${v.beats} 拍：${v.N0} → ${ledgerText(v.N, v.e)}，六块门全部撕裂。`, `${v.beats} beats: ${v.N0} → ${ledgerText(v.N, v.e)}, all six gates torn.`)
        };
      return {
        long: pair(`架上六块门从左到右是注意力的次序。品红的门已试过、撕裂；琥珀的门被选中；紫色的还没轮到。品红的 11、13 柱是旗标素数：交换的乘法记不住下一步，只能把控制写进它们。`, `The six gates on the rack, left to right, are the order of attention. Magenta gates have been tried and tear; the amber one is selected; violet ones are not reached. The magenta pillars 11 and 13 are flag primes: a commutative product cannot remember what comes next, so control is written into them.`),
        fig: pair(`第 ${v.at} 拍：琥珀的门 ${ruleText(v.prog, v.r)}，品红的旗标 11、13。`, `Beat ${v.at}: the amber gate ${ruleText(v.prog, v.r)}, the magenta flags 11 and 13.`)
      };
    }
    if (s === 'prime') {
      const v = m.prime,
        lv = L(...LEVEL_NAME[state.level]);
      if (r === 'hit' || (r !== 'moving' && v.at === PG_BEATS))
        return {
          long: pair(`第 ${v.at} 拍：只有 2 柱立着，高 ${v.e[0]}，是素数；其余九柱都空了。地面边上的青点是纯 2 的幂出现的拍：${HITS.slice(0, 4).map((h) => h.beat).join('、')}。现在按${LEVEL_NAME[state.level][0]}走，共 ${v.steps} 步。`, `Beat ${v.at}: only the pillar of 2 stands, ${v.e[0]} high, a prime; the other nine are empty. The cyan points on the rim are the beats of pure powers of 2: ${HITS.slice(0, 4).map((h) => h.beat).join(', ')}. The rail now counts ${LEVEL_NAME[state.level][1]}, ${v.steps} steps.`),
          fig: pair(`第 ${v.at} 拍只剩 2 柱，高 ${v.e[0]}。`, `At beat ${v.at} only the pillar of 2 is left, ${v.e[0]} high.`)
        };
      return {
        long: pair(`十根柱：青色是寄存器 2、3、5、7，品红是旗标 11 到 29。十四块门围成一圈，琥珀光束指着下一条。按${lv}，时间轴走 ${v.steps} 步；中央紫色回声柱是 ln N。`, `Ten pillars: cyan registers 2, 3, 5, 7 and magenta flags 11 to 29. Fourteen gates ring the rack, the amber beam points at the next. With ${lv} the rail takes ${v.steps} steps; the violet echo column in the middle is ln N.`),
        fig: pair(`第 ${v.at} 拍：${v.flagged ? '品红的旗标柱立着' : '只有青色的寄存器柱'}。`, `Beat ${v.at}: ${v.flagged ? 'magenta flag pillars stand' : 'only cyan register pillars'}.`)
      };
    }
    if (s === 'rotor') {
      const v = m.rotor,
        R = v.run,
        first = R.beats[0];
      if (r === 'halt')
        return {
          long: pair(`青色的测地弧从琥珀的 Ψ_${R.order} = ${tuple(R.states[0])} 两拍走回球心 1，青环是 ε_self：栈空了。左边的块按 ${R.order === 'XY' ? '先 y 后 x' : '先 x 后 y'} 弹出；紫环是另一种次序的字，模方同为 25，它的弹栈画成虚线${otherTear(R) ? `，品红环是它的撕裂 ${otherTear(R)}` : ''}。`, `The cyan geodesics run from the amber Ψ_${R.order} = ${tuple(R.states[0])} back to the centre 1 in two beats; the cyan ring is ε_self, the stack is empty. The blocks on the left popped ${R.order === 'XY' ? 'y first, then x' : 'x first, then y'}; the violet ring is the word of the other order, also of squared norm 25, its pops dashed${otherTear(R) ? `, and the magenta ring is its tear ${otherTear(R)}` : ''}.`),
          fig: pair(`Ψ_${R.order} 两拍弹回 1；品红环：${first.torn.length ? `它的撕裂 ${quarterText(first.torn[0].c5)}` : `Ψ_${R.order === 'XY' ? 'YX' : 'XY'} 的撕裂`}。`, `Ψ_${R.order} pops back to 1 in two beats; magenta ring: ${first.torn.length ? `its tear ${quarterText(first.torn[0].c5)}` : `the tear of Ψ_${R.order === 'XY' ? 'YX' : 'XY'}`}.`)
        };
      return {
        long: pair(`紫色球是 S³(1) 的球极投影，1 在球心，紫点是 w > 0 的字长 ≤ 2 的整点。琥珀点是 Ψ_${R.order}；右边两块门按注意力次序排，品红的那块撕裂：${first.torn.length ? `${quarterText(first.torn[0].c5)} 落在紫点之外` : '这一拍没有撕裂'}。`, `The violet ball is S³(1) seen stereographically, 1 in the centre; the violet points are the words of length ≤ 2 with w > 0. The amber point is Ψ_${R.order}; the two gates on the right stand in the order of attention, and a magenta one tears: ${first.torn.length ? `${quarterText(first.torn[0].c5)} lands off the violet points` : 'there is no tear in this beat'}.`),
        fig: pair(`Ψ_${R.order}：${first.torn.length ? `${Q_RULES[first.torn[0].q].name} 撕裂，${Q_RULES[first.fired].name} 先弹` : `${Q_RULES[first.fired].name} 直接弹出栈顶`}。`, `Ψ_${R.order}: ${first.torn.length ? `${Q_RULES[first.torn[0].q].name} tears, ${Q_RULES[first.fired].name} pops first` : `${Q_RULES[first.fired].name} pops the top at once`}.`)
      };
    }
    const v = m.audit;
    return {
      long: pair(`左：六位寄存器，琥珀写头先写 ${WORDS[state.order][0]} 再写 ${WORDS[state.order][1]}，品红块是被覆盖的位。中：PRIMEGAME 的晶格，品红柱是旗标，${v.pg.at} 拍里 ${v.pg.flagsSoFar} 拍带旗标。右：旋子栈两拍弹回 1，青环是 ε_self。`, `Left: a six-bit register; the amber head writes ${WORDS[state.order][0]}, then ${WORDS[state.order][1]}, and the magenta block is the overwritten bit. Middle: the crystal of PRIMEGAME, magenta flag pillars, a flag on ${v.pg.flagsSoFar} of ${v.pg.at} beats. Right: the rotor stack pops back to 1 in two beats, the cyan ring is ε_self.`),
      fig: pair(`覆盖丢 1 个字；标量 ${v.pg.at} 拍里 ${v.pg.flagsSoFar} 拍带旗标；旋子 2 拍。`, `The overwrite loses a word; the scalar has a flag on ${v.pg.flagsSoFar} of ${v.pg.at} beats; the rotor takes 2.`)
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      tiny = small(),
      { R, U } = cam;
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'adder' || s === 'mult' || s === 'prime') {
      const v = m[s],
        Ly = layout(s);
      Ly.prog.primes.forEach((p, i) => {
        const gi = PR.indexOf(p);
        if (s === 'prime' && tiny && !v.e[gi]) return;
        const outward = scale([cs(Ly.theta(i)), sn(Ly.theta(i)), 0], 1);
        N('p' + p, off(add(Ly.pillar(i), scale(outward, 0.18)), 0, -14), v.e[gi] > 1 ? `${p}${superscript(v.e[gi])}` : `${p}`, Ly.prog.flags.includes(p) ? 'c-mg' : 'c-cy');
      });
      if (v.r >= 0 && (Ly.m <= 6 || !tiny)) N('gate', off(Ly.tile(v.r), 0, 22), `${gateName(v.r)} = ${ruleText(Ly.prog, v.r)}`, 'c-am');
      if (Ly.m > 1 && Ly.m <= 6 && !tiny)
        for (let j = 0; j < Ly.m; j++) if (j !== v.r) N('g' + j, off(Ly.tile(j), 0, 20), ruleText(Ly.prog, j), v.torn.some((t) => t.j === j) ? 'c-mg' : 'c-vi');
      if (v.r < 0) N('halt', off(Ly.eye, 0, 20), L('停机', 'halt'), 'c-mg');
      if (v.r < 0 && Ly.m === 1) N('tearq', off(Ly.tile(0), 0, 22), `${v.N} · ${ruleText(Ly.prog, 0)} = ${tearText(v.N, Ly.prog.rules[0])} ∉ ℤ`, 'c-mg');
      if (s === 'adder' && v.r >= 0 && !tiny) {
        const fl = flights(Ly, v, 0),
          from = fl.find((x) => x.out),
          to = fl.find((x) => !x.out);
        if (from) N('a0', off(from.from, -46, 6), `0 · 2 | N`, 'c-cy');
        if (to) N('a1', off(to.to, 50, 6), `1 · N′ ∈ ℤ`, 'c-cy');
        N('ahalf', off(Ly.tile(0), 62, -6), `½ · q${subscript(1)}`, 'c-cy');
      }
      N('echo', off(add(Ly.c, [0, 0, Ly.z0 + (v.ln * (Ly.top - Ly.z0)) / Ly.lnMax]), 34, 10), tiny ? 'ln N' : `ln N ${approx(v.ln, 3)}`, 'c-vi');
      if (s === 'prime' && !tiny)
        hitIndices(v).forEach((h, n) => n < 4 && N('hit' + n, off(rimPoint(Ly, h.j / v.steps), 0, -14), `2${superscript(h.p)} · ${h.beat}`, 'c-cy'));
    }
    if (s === 'rotor') {
      const v = m.rotor,
        Rr = v.run,
        G = ROT();
      N('psi', off(st(Rr.states[0]), 30, 14), tiny ? `Ψ<sub>${Rr.order}</sub>` : `Ψ<sub>${Rr.order}</sub> = ${tuple(Rr.states[0])}`, 'c-am');
      const otherOrder = Rr.order === 'XY' ? 'YX' : 'XY';
      if (!tiny) N('other', off(st(rotorOf(otherOrder, Rr.attn).states[0]), 34, -12), `Ψ<sub>${otherOrder}</sub> = ${tuple(rotorOf(otherOrder, Rr.attn).states[0])}`, 'c-vi');
      N('one', off([0, 0, 0], -18, -16), '1', v.halted ? 'c-cy' : 'c-vi');
      if (v.halted) N('eps', off([0, 0, 0], 22, -20), 'ε<sub>self</sub>', 'c-cy');
      for (const g of ['+x', '+y']) N('g' + g, off(st(GEN[g]), g === '+x' ? 30 : -30, 12), `π<sub>5,${g}</sub>`, 'c-vi');
      Rr.list.forEach((q, rank) => N('Q' + q, off(G.tile(rank), 0, 18), tiny ? Q_RULES[q].name : `${Q_RULES[q].name} = ${Q_RULES[q].text}`, q === v.next ? 'c-am' : v.torn.some((t) => t.q === q) ? 'c-mg' : 'c-vi'));
      const O = rotorOf(otherOrder, Rr.attn);
      if (!tiny) O.beats.forEach((b, j) => b.torn.forEach((t) => N(`otear${j}${t.q}`, off(st(t.c5), 0, -16), `Ψ<sub>${otherOrder}</sub>·${Q_RULES[t.q].name} = ${quarterText(t.c5)} ∉ ℤ⁴`, 'c-mg')));
      for (const t of v.halted ? [] : v.torn) N('tear' + t.q, off(st(t.c5), 0, -18), tiny ? '∉ ℤ⁴' : `${quarterText(t.c5)} ∉ ℤ⁴`, 'c-mg');
      Rr.word.forEach((g, lvl) => {
        const popAt = Rr.n - 1 - lvl;
        if (v.k + v.f < popAt + 1) N('blk' + lvl, off(G.block(lvl), -34, 0), g.replace('+', ''), 'c-vi');
      });
      if (!tiny) N('stack', off(G.block(0), 0, -30), L('栈', 'stack'), 'c-vi');
    }
    if (s === 'audit') {
      const v = m.audit,
        Lc = layout('audit');
      N('lvn', add(cellAt(0), [0, 0, 0.3]), L('覆盖写', 'overwrite'), 'c-mg');
      N('lcw', add(Lc.c, [0, 0, 0.95]), L('标量 FRACTRAN', 'scalar FRACTRAN'), 'c-mg');
      N('lom', [LANE.om, 0.1, OM_R + 0.3], 'Ω-FRACTRAN', 'c-cy');
      if (!tiny) N('vnw', add(cellAt(5), [0, 0, -0.3]), v.vn >= 2 ? L(`改了 ${FLIPS} 位 · ${WORDS[state.order][0]} 丢失`, `${FLIPS} bits changed · ${WORDS[state.order][0]} lost`) : `ACC ← ${WORDS[state.order][Math.min(1, Math.floor(v.vn))]}`, v.vn >= 2 ? 'c-mg' : 'c-am');
      N('cwn', add(Lc.c, [0, 0, -0.85]), `${v.pg.at}/${PG_BEATS} · ${L('旗标', 'flags')} ${v.pg.flagsSoFar}`, 'c-mg');
      N('omn', [LANE.om, 0.1, -OM_R - 0.22], v.om.halted ? `2 · ε<sub>self</sub>` : `${v.om.k}/2`, 'c-cy');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈≥]) −?\d[\d.]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>').replace(/‖|ℤ⁴/g, '<span class="nm">$&</span>');
  const ACTS = {
    adder: ['单拍 ▸', 'One beat ▸'],
    mult: ['单拍 ▸', 'One beat ▸'],
    prime: ['换引理 ▸', 'Next lemma level ▸'],
    rotor: ['XY ↔ YX', 'XY ↔ YX'],
    audit: ['XY ↔ YX', 'XY ↔ YX']
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
    const free = (b, dx, dy) => {
      const left = b.left + dx,
        right = b.right + dx,
        top = b.top + dy,
        bottom = b.bottom + dy;
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
    for (const [i, b] of boxes.entries()) {
      const dx = clamp(0, bounds.left + 5 - b.left, bounds.right - 5 - b.right);
      const here = free(b, dx, 0);
      if (here) {
        place(i, dx, 0, here);
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
          const at = free(b, dx + sx, dy);
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

  /* ---------- fitting the picture between the title and the legend ---------- */
  const around = (pts) =>
    pts.reduce(
      (b, p) => {
        const x = dot(p, cam.R),
          y = dot(p, cam.U);
        return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
      },
      [Infinity, -Infinity, Infinity, -Infinity]
    );
  const grow = ([x0, x1, y0, y1], l, r, b, t) => [x0 - l, x1 + r, y0 - b, y1 + t];
  function crystalPoints(scene) {
    const Ly = layout(scene),
      pts = [Ly.eye];
    for (let j = 0; j < Ly.m; j++) pts.push(Ly.tile(j));
    for (let k = 0; k < 16; k++) {
      const th = (TAU * k) / 16;
      pts.push(add(Ly.c, [Ly.rim * cs(th), Ly.rim * sn(th), Ly.z0]));
    }
    Ly.prog.primes.forEach((_, i) => pts.push(add(Ly.pillar(i), [0, 0, Ly.top - Ly.z0])));
    return pts;
  }
  const ballPoints = (r, c) => [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1], [0.7, 0.7, 0], [-0.7, -0.7, 0], [0.7, -0.7, 0], [-0.7, 0.7, 0]].map((d) => add(c, scale(d, r)));
  const SIDE = {
    adder: () => grow(around(crystalPoints('adder')), small() ? 0.12 : 0.42, small() ? 0.12 : 0.42, 0.12, 0.08),
    mult: () => grow(around(crystalPoints('mult')), 0.22, 0.22, 0.12, 0.08),
    prime: () => grow(around(crystalPoints('prime')), 0.1, 0.1, 0.12, 0.06),
    rotor: () => grow(around([...ballPoints(RB, [0, 0, 0]), ROT().eye, ROT().tile(1), ROT().block(0), add(ROT().block(1), [0, 0, 0.3])]), 0.32, 0.4, 0.12, 0.1),
    audit: () => grow(around([...ballPoints(OM_R, [LANE.om, 0.1, 0.05]), add(cellAt(0), [-0.2, 0, 0.42]), add(cellAt(5), [0.68, 0, -0.42]), ...crystalPoints('audit')]), 0.08, 0.08, 0.16, 0.12)
  };
  const title = { key: '', top: 0 };
  function fit(w) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const box2 = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const key = [state.scene, state.lens, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box2.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box2.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const unitOf = ([x0, x1, y0, y1]) => Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0));
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k]()]),
      [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    const u = Math.max(8, unitOf([x0, x1, y0, y1]));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /** The world point of the amber handle for a rail value v of the present card. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'rotor':
        return popPoint(rotorOf(state.order, state.attn), v);
      case 'audit':
        return rimPoint(layout('audit'), v / PG_BEATS);
      default: {
        const Ly = layout(state.scene),
          max = railMaxOf(state.scene);
        return rimPoint(Ly, max > 0 ? v / max : 0);
      }
    }
  }
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(w);
    sc.begin();
    drawCrystal('adder', m.adder, w.adder, 'ad');
    drawCrystal('mult', m.mult, w.mult, 'mu');
    drawCrystal('prime', m.prime, w.prime, 'pg');
    drawRotor(m.rotor, w.rotor);
    drawAudit(m, w.audit);
    const here = handleWorld(state.at[state.scene]);
    sc.bead(here, { color: P.amber, r: 6.6, key: 'current' });
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
  /** The run a strip plots for the present card. */
  function stripRun(m) {
    const s = state.scene;
    if (s === 'adder' || s === 'mult') return { tr: traceOf(s), at: m[s].at, scene: s };
    return { tr: traceOf('prime'), at: s === 'prime' ? m.prime.at : m.audit.pg.at, scene: 'prime' };
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      if (state.scene === 'rotor') {
        const v = m.rotor,
          R = v.run,
          other = rotorOf(R.order === 'XY' ? 'YX' : 'XY', R.attn);
        $('plotTitle').textContent = L('每一拍的 log₅ ‖Ψ‖²：两种次序同一条线', 'log₅ ‖Ψ‖² per beat: one line for both orders');
        $('plotMeta').textContent = `Ψ_${R.order}`;
        const items = [
          [P.cyan, L(`Ψ_${R.order} 弹栈`, `Ψ_${R.order} popped`)],
          [P.magenta, L(`Ψ_${other.order}（标量看来相同）`, `Ψ_${other.order} (the same to a scalar)`), 'dash']
        ];
        const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
        const g = kit.plot(cv, { x: [-0.2, 2.2], y: [-0.1, headroom(cv, PAD, rows.length, -0.1, 2.1)], pad: PAD });
        g.axes({ xTicks: [[0, '0'], [1, '1'], [2, '2']], yTicks: [[0, '1'], [1, '5'], [2, '25']] });
        const lg = (q) => Math.log(qn2(q)) / Math.log(5);
        g.line(other.states.map((q, k) => [k, lg(q)]), P.magenta, { width: 1.6, dash: [4, 4] });
        g.line(R.states.map((q, k) => [k, lg(q)]), P.cyan, { width: 2 });
        R.states.forEach((q, k) => g.dot(k, lg(q), P.cyan, 3.4));
        const x = v.k + v.f;
        g.line([[x, -0.1], [x, 2.1]], P.amber, { width: 1 });
        drawLegend(g, rows);
      } else {
        const { tr, at, scene } = stripRun(m),
          n = tr.n;
        $('plotTitle').textContent = L('每一拍的 ln N：青色不带旗标，品红带旗标', 'ln N per beat: cyan without a flag, magenta with one');
        $('plotMeta').textContent = `${at}/${n}`;
        const items = [
          [P.cyan, L('N 不带旗标', 'no flag in N')],
          [P.magenta, L('N 带旗标素数', 'a flag prime in N')]
        ];
        const hi = Math.max(1, ...tr.ln) * 1.02;
        const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
        const g = kit.plot(cv, { x: [0, Math.max(1, n)], y: [0, headroom(cv, PAD, rows.length, 0, hi)], pad: PAD });
        const yt = [0, 5, 10, 15, 20, 25].filter((y) => y <= hi + 0.5).map((y) => [y, String(y)]);
        g.axes({ xTicks: (n > 40 ? [0, 100, 200, 300, 400, 500, 600, 700] : range(Math.min(n, 18) + 1).filter((k) => n <= 18 || k % 2 === 0)).filter((k) => k <= n).map((k) => [k, String(k)]), yTicks: yt });
        for (let k = 0; k < n; k++) g.line([[k, tr.ln[k]], [k + 1, tr.ln[k + 1]]], tr.flagged[k + 1] || tr.flagged[k] ? P.magenta : P.cyan, { width: 1.4 });
        if (scene === 'prime') HITS.filter((h) => h.beat <= n).forEach((h) => g.dot(h.beat, tr.ln[h.beat], P.cyan, 3.6));
        g.line([[at, 0], [at, hi]], P.amber, { width: 1 });
        g.dot(at, tr.ln[at], P.amber, 3.4);
        drawLegend(g, rows);
      }
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const { tr, at, scene } = stripRun(m),
        n = tr.n,
        fl = traceOf(scene === 'prime' ? 'prime' : scene).folds,
        level = scene === 'prime' ? state.level : 'raw',
        cum = [0];
      for (let k = 1; k <= n; k++) cum.push(cum[k - 1] + (tr.flagged[k] ? 1 : 0));
      const bounds = fl[level],
        stepCum = [0];
      for (let k = 1, j = 1; k <= n; k++) {
        let c = stepCum[k - 1];
        while (j < bounds.length && bounds[j] <= k) {
          c++;
          j++;
        }
        stepCum.push(c);
      }
      const steps = (k) => stepCum[k];
      const omega = state.scene === 'rotor' || state.scene === 'audit';
      $('plotTitleB').textContent = L('读出次序的代价：旗标的拍与引理后的步', 'The price of the order: flag beats and steps after lemmas');
      $('plotMetaB').textContent = `${cum[at]} · ${steps(at)}${omega ? ' · Ω 2' : ''}`;
      const items = [
        [P.magenta, L('累计带旗标的拍', 'beats with a flag, so far')],
        [P.cyan, level === 'raw' ? L('累计的拍', 'beats so far') : L(`累计的步（${LEVEL_NAME[level][0]}）`, `steps so far (${LEVEL_NAME[level][1]})`)],
        ...(omega ? [[P.cyan, L('旋子栈：2 步', 'rotor stack: 2 steps'), 'dot']] : [])
      ];
      const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
      const hi = Math.max(2, n);
      const g = kit.plot(cb, { x: [0, Math.max(1, n)], y: [0, headroom(cb, PAD, rows.length, 0, hi)], pad: PAD });
      g.axes({ xTicks: (n > 40 ? [0, 200, 400, 600] : range(Math.min(n, 18) + 1).filter((k) => n <= 18 || k % 3 === 0)).filter((k) => k <= n).map((k) => [k, String(k)]), yTicks: (n > 40 ? [0, 200, 400, 600] : [0, Math.round(n / 2), n]).map((y) => [y, String(y)]) });
      g.line(range(n + 1).map((k) => [k, steps(k)]), P.cyan, { width: 1.6 });
      g.line(range(n + 1).map((k) => [k, cum[k]]), P.magenta, { width: 1.6 });
      if (omega) g.dot(2, 2, P.cyan, 4.2);
      g.line([[at, 0], [at, hi]], P.amber, { width: 1 });
      drawLegend(g, rows);
    }
  }

  /* ---------- readouts ---------- */
  function readNote() {
    const s = state.scene;
    if (s === 'adder') return L(`守卫、注意力、闭合：0 · 1/2 · 1。a 拍之后 2^a·3^b 停在 3^(a+b)：页面在 a ≤ 5、b ≤ 4 上逐个核对，${BENCH.adder.bad ? `不符 ${BENCH.adder.bad} 处` : '全部相符'}。`, `Guard, attention, closure: 0 · 1/2 · 1. After a beats 2^a·3^b stops at 3^(a+b); the page checks a ≤ 5, b ≤ 4 one by one, ${BENCH.adder.bad ? `${BENCH.adder.bad} failures` : 'all agree'}.`);
    if (s === 'mult') return L(`输入 2^a·3^b（a, b ≤ 4）都停在 5^(ab)，${BENCH.mult.bad ? `不符 ${BENCH.mult.bad} 处` : '全部相符'}；a = b = 2 用 ${BENCH.mult.beats22} 拍。`, `Every input 2^a·3^b (a, b ≤ 4) stops at 5^(ab), ${BENCH.mult.bad ? `${BENCH.mult.bad} failures` : 'all agree'}; a = b = 2 takes ${BENCH.mult.beats22} beats.`);
    if (s === 'prime') return L(`引理 A：${BENCH.lemmas.join('、')}；引理 B 把同一步的重复并起来，最长 ${BENCH.longestRun} 次。710 拍 → ${BENCH.folds.A} → ${BENCH.folds.B} 步。`, `Lemma A: ${BENCH.lemmas.join(', ')}; lemma B merges repeats of one step, at most ${BENCH.longestRun}. 710 beats → ${BENCH.folds.A} → ${BENCH.folds.B} steps.`);
    if (s === 'rotor') return L(`字长 ≤ 4 的 ${BENCH.lps.words} 个约化字：积互不相同，Ψ·π̄/5 是整数恰好当 π 是最后一个字母（不符 ${BENCH.lps.bad} 处）。`, `${BENCH.lps.words} reduced words of length ≤ 4: distinct products, and Ψ·π̄/5 is integral exactly when π is the last letter (${BENCH.lps.bad} failures).`);
    return L(`三条轨道做的不是同一件事（MODEL）；页面只数它们各自写下的状态：撕裂 ${BENCH.torn} 个。`, `The three lanes do not do the same task (MODEL); the page only counts the states each one writes: ${BENCH.torn} torn.`);
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      s = state.scene;
    const sv = s === 'audit' ? m.audit.pg : m[s];
    if (s === 'rotor') {
      const v = m.rotor,
        R = v.run;
      put('roKey', `Ψ<sub>${R.order}</sub> → ${same(v.psi, ONE4) ? '1' : tuple(v.psi)} · ${v.k}/${R.n}`);
      put('roState', `Ψ = ${tuple(v.psi)} · ‖Ψ‖² = ${qn2(v.psi)}`);
      put('roRule', v.next ? `${Q_RULES[v.next].name} = ${Q_RULES[v.next].text} · ${L('撕裂', 'torn')} ${v.torn.length} · ${L('未触发', 'dormant')} ${R.list.length - 1 - R.list.indexOf(v.next)}` : L(`没有门给出整数：停机`, 'no gate gives an integer: halt'));
      const c = v.next ? candidate(v.psi, Q_RULES[v.next].gen).c5 : null;
      put('roLedger', c ? `5·Ψ·Q = ${tuple(c)} ≡ 0 (mod 5)` : `${v.torn.map((t) => `${Q_RULES[t.q].name}: ${quarterText(t.c5)} ∉ ℤ⁴`).join(' · ')}`);
      put('roFlag', L(`旗标 0 · 标量影子 ‖Ψ‖² = 25 对两种次序相同`, `flags 0 · the scalar shadow ‖Ψ‖² = 25 is the same for both orders`));
      put('roFold', L(`栈 ${R.word.slice(0, R.n - v.k).map((g) => g.replace('+', '')).join(' ') || '∅'}（底 → 顶）`, `stack ${R.word.slice(0, R.n - v.k).map((g) => g.replace('+', '')).join(' ') || '∅'} (bottom → top)`));
      put('roEcho', `⟨1, π<sub>5</sub>⟩²/‖π<sub>5</sub>‖² = ${fstr(BENCH.kappa)} ${relQ(BENCH.kappa)}`);
    } else {
      const v = sv,
        tr = traceOf(s === 'audit' ? 'prime' : s);
      put('roKey', `${v.N0} → ${v.N} · ${v.at}/${v.beats}`);
      put('roState', `N = ${ledgerText(v.N, v.e)}`);
      put('roRule', gateLine(v));
      put('roLedger', closureLine(v));
      put('roFlag', `${v.flagsSoFar}/${v.at}${v.prog.flags.length ? ` · ${L('旗标', 'flags')} {${v.prog.flags.join(', ')}}` : L(' · 无旗标素数', ' · no flag primes')}`);
      const f = tr.folds;
      put('roFold', s === 'prime' ? `${L('逐拍', 'raw')} ${f.raw.length - 1} · A ${f.A.length - 1} · A + B ${f.B.length - 1} · ${L('当前', 'now')} ${v.k}/${v.steps}` : s === 'audit' ? L(`覆盖改 ${FLIPS} 位 · 旋子 ${Math.min(2, Math.floor(m.audit.t))}/2 拍 · 撕裂 ${BENCH.torn}`, `overwrite ${FLIPS} bits · rotor ${Math.min(2, Math.floor(m.audit.t))}/2 beats · torn ${BENCH.torn}`) : `${L('逐拍', 'raw')} ${f.raw.length - 1} · A ${f.A.length - 1} · A + B ${f.B.length - 1}`);
      put('roEcho', `ln N ${approx(v.ln, 4)}`);
    }
    put('roKeySub', ` · ${L(...SCENE_NAME[s][state.lens])}`);
    put('roNote', readNote());
    const name = L(...SCENE_NAME[s][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    put('keyPill', `${L('拍', 'beat')} <strong>${s === 'rotor' ? `${m.rotor.k}/${m.rotor.n}` : `${sv.at}/${sv.beats}`}</strong>`);
    $('hint').textContent = L('拖琥珀手柄换拍 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the beat · drag empty space to orbit · Space plays');
    $('formula').innerHTML = { adder: 'N′ = N · a/b ∈ ℤ ⇔ b | N·a', mult: '2<sup>a</sup>3<sup>b</sup> → 5<sup>ab</sup>', prime: '2 → 2<sup>p</sup>', rotor: 'Ψ · π̄/5 ∈ ℤ⁴ ⇔ Ψ ∈ ℤ⁴·π', audit: 'overwrite · 2·3 = 3·2 · Ψ<sub>XY</sub> ≠ Ψ<sub>YX</sub>' }[s];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    $('aRange').value = String(state.a);
    put('aOut', `= ${state.a}`);
    $('bRange').value = String(state.b);
    put('bOut', `= ${state.b}`);
    maChips.set(state.ma, true);
    mbChips.set(state.mb, true);
    levelChips.set(state.level, true);
    orderChips.set(state.order, true);
    attnChips.set(state.attn, true);
    $('runBtn').setAttribute('aria-pressed', String(clock.playing));
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
  const railMax = () => railMaxOf(state.scene);
  const rateOf = (scene) => (scene === 'prime' ? Math.max(4, railMaxOf('prime') / 8) : RAILS[scene].rate);
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
    rate: RAILS.adder.rate,
    step: 1,
    max: STILL.adder,
    t: STILL.adder,
    format: (t, max) => {
      const v = settled(t),
        { k, f } = split(v);
      if (state.scene === 'prime' && state.level !== 'raw') return `${Math.min(k, max)}/${max}`;
      return f > 0 ? `${k} → ${k + 1}` : `${k}/${Math.round(max)}`;
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      if (!c.playing && rail().whole && abs(t - Math.round(t)) > 1e-9) {
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
    clock.rate = rateOf(state.scene);
    clock.step = 1;
    $('now').step = rail().whole ? '1' : 'any';
    const at = Math.min(state.at[state.scene], railMax());
    clock.setMax(railMax(), true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
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
    setRail();
    paint();
  }
  kit.field($('aRange'), {
    out: $('aOut'),
    fmt: (v) => `= ${v}`,
    onInput: (v) =>
      steer('adder', () => {
        state.a = Math.round(v);
        state.at.adder = railMaxOf('adder');
      })
  });
  kit.field($('bRange'), {
    out: $('bOut'),
    fmt: (v) => `= ${v}`,
    onInput: (v) =>
      steer('adder', () => {
        state.b = Math.round(v);
        state.at.adder = railMaxOf('adder');
      })
  });
  const maChips = kit.chips($('maChips'), 'ma', (v) =>
    steer('mult', () => {
      state.ma = Number(v);
      state.at.mult = railMaxOf('mult');
    })
  );
  const mbChips = kit.chips($('mbChips'), 'mb', (v) =>
    steer('mult', () => {
      state.mb = Number(v);
      state.at.mult = railMaxOf('mult');
    })
  );
  /** A new lemma level keeps the beat: the rail lands on the step that holds it. */
  function setLevel(v) {
    const tr = traceOf('prime'),
      beatNow = tr.folds[state.level][Math.min(Math.round(state.at.prime), tr.folds[state.level].length - 1)];
    state.level = v;
    const b = tr.folds[v];
    let k = b.findIndex((x) => x >= beatNow);
    if (k < 0) k = b.length - 1;
    state.at.prime = k;
  }
  const levelChips = kit.chips($('levelChips'), 'level', (v) => steer('prime', () => setLevel(v)));
  const rotorScene = () => (state.scene === 'audit' ? 'audit' : 'rotor');
  const orderChips = kit.chips($('orderChips'), 'order', (v) =>
    steer(rotorScene(), () => {
      state.order = v;
    })
  );
  const attnChips = kit.chips($('attnChips'), 'attn', (v) =>
    steer('rotor', () => {
      state.attn = v;
    })
  );
  const swapOrder = () =>
    steer(rotorScene(), () => {
      state.order = state.order === 'XY' ? 'YX' : 'XY';
    });
  $('swapBtn').addEventListener('click', swapOrder);
  /** One beat forward, from the start again once the card has ended. The card stays marked: this is its clock. */
  function oneBeat() {
    stopBootPlay();
    clock.pause();
    const k = Math.floor(state.at[state.scene] + 1e-9),
      end = railMax();
    if (k >= end) clock.set(0);
    stopAt = (k >= end ? 0 : k) + 1;
    clock.play();
  }
  $('beatBtn').addEventListener('click', oneBeat);
  $('runBtn').addEventListener('click', () => {
    stopBootPlay();
    stopAt = null;
    clock.toggle();
  });
  const nextLevel = () => steer('prime', () => setLevel({ raw: 'A', A: 'B', B: 'raw' }[state.level]));
  $('stageAct').addEventListener('click', () => ({ adder: oneBeat, mult: oneBeat, prime: nextLevel, rotor: swapOrder, audit: swapOrder })[state.scene]());
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
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

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  function benchmarks() {
    // the adder and the multiplier on a grid of inputs, against their closed forms
    let adderBad = 0,
      adderTried = 0;
    for (let a = 1; a <= 5; a++)
      for (let b = 0; b <= 4; b++) {
        adderTried++;
        const tr = run(PROGRAMS.adder, 2n ** BigInt(a) * 3n ** BigInt(b), 400);
        if (tr.n !== a || tr.states[tr.n] !== 3n ** BigInt(a + b) || !tr.halted) adderBad++;
      }
    let multBad = 0,
      multTried = 0;
    for (let a = 0; a <= 4; a++)
      for (let b = 0; b <= 4; b++) {
        multTried++;
        const tr = run(PROGRAMS.mult, 2n ** BigInt(a) * 3n ** BigInt(b), 400);
        if (tr.states[tr.n] !== 5n ** BigInt(a * b) || !tr.halted) multBad++;
      }
    const t22 = run(PROGRAMS.mult, 36n, 400);
    // PRIMEGAME: the pure powers of 2 in the first 2375 beats
    const long = run(PROGRAMS.prime, 2n, 2375),
      hits = long.states.map((N, beat) => ({ N, beat })).filter((x) => isHit(x.N)).map((x) => ({ beat: x.beat, p: x.N.toString(2).length - 1 }));
    const isPrime = (n) => n > 1 && range(Math.floor(Math.sqrt(n)) - 1).every((k) => n % (k + 2) !== 0);
    const pg = traceOf('prime'),
      flagTotal = pg.flagged.slice(1).filter(Boolean).length;
    // the lemmas: every step applied as one fraction to its start gives its end
    let foldBad = 0;
    for (const lv of ['stepsA', 'stepsB'])
      for (const s of pg.folds[lv]) {
        let N = pg.states[s.from],
          whole = true;
        for (let r = 0; r < s.k; r++) {
          if ((N * s.q[0]) % s.q[1] !== 0n) whole = false;
          N = (N * s.q[0]) / s.q[1];
        }
        if (!whole || N !== pg.states[s.to]) foldBad++;
      }
    // the ledger: N back from its exponents, the product formula, and closure ⇔ ledger ≥ 0, on every state of the runs
    const runs = [pg, traceOf('adder', FRESH), traceOf('mult', FRESH)];
    let recBad = 0,
      prodBad = 0,
      closeBad = 0,
      closeTried = 0,
      statesTried = 0;
    for (const tr of runs) {
      const prog = tr === pg ? PROGRAMS.prime : tr === runs[1] ? PROGRAMS.adder : PROGRAMS.mult;
      tr.states.forEach((N, k) => {
        statesTried++;
        const e = tr.led[k];
        const back = e.reduce((acc, x, i) => acc * PRB[i] ** BigInt(x), 1n);
        if (back !== N) recBad++;
        // |N| · ∏ p^(−e_p) as a fraction: the product of the p-adic norms is 1/N
        const pn = frac(1n, e.reduce((acc, x, i) => acc * PRB[i] ** BigInt(x), 1n)),
          prod = frac(N * pn[0], pn[1]);
        if (prod[0] !== 1n || prod[1] !== 1n) prodBad++;
        for (const q of prog.rules) {
          closeTried++;
          const integral = (N * q.a) % q.b === 0n,
            ledgerOk = e.every((x, i) => x + q.ea[i] - q.eb[i] >= 0);
          if (integral !== ledgerOk) closeBad++;
        }
      });
    }
    // a finite list of primes is escaped: ∏ + 1 for the ten primes of the crystal
    const prodS = PRB.reduce((a, b) => a * b, 1n) + 1n;
    let q = 2n;
    while (prodS % q !== 0n) q++;
    const escape = { value: prodS, residues: PRB.every((p) => prodS % p === 1n), q, outside: !PRB.includes(q) };
    // the rotors: reduced words up to length 4, their products, and which pops are integral
    const words = wordsUpTo(4);
    let lpsBad = 0,
      lpsTears = 0;
    const seen = new Set();
    for (const w of words) {
      const psi = wordOf(w);
      seen.add(`${w.length}|${psi.join(',')}`);
      if (qn2(psi) !== 5 ** w.length) lpsBad++;
      for (const g of GEN_NAMES) {
        const c = candidate(psi, g);
        if (c.whole !== (g === w[w.length - 1])) lpsBad++;
        if (!c.whole) lpsTears++;
      }
    }
    const kappa = frac(1n, 5n);
    const kappaOk = GEN_NAMES.every((g) => GEN[g][0] ** 2 * 5 === qn2(GEN[g]));
    // the two-word code: one letter each (they do not commute) against a letter and its square (they do)
    const strings = range(9).flatMap((n) => range(2 ** n).map((b) => range(n).map((k) => !!((b >> k) & 1))));
    const encode = (s, a, b) => s.flatMap((t) => (t ? b : a)).join('');
    const collisions = (a, b) => strings.length - new Set(strings.map((s) => encode(s, a, b))).size;
    const code = { strings: strings.length, free: collisions(['x'], ['y']), stuck: collisions(['x'], ['x', 'x']) };
    // descent to multisets: the scalar update commutes, the rotor update does not
    const lettersS = [2n, 3n, 5n],
      lettersR = ['+x', '+y', '+z'];
    let scalarSplit = 0,
      rotorSame = 0,
      pairs = 0;
    for (const i of range(3))
      for (const j of range(3)) {
        if (i === j) continue;
        pairs++;
        if (lettersS[i] * lettersS[j] !== lettersS[j] * lettersS[i]) scalarSplit++;
        if (same(qmul(GEN[lettersR[i]], GEN[lettersR[j]]), qmul(GEN[lettersR[j]], GEN[lettersR[i]]))) rotorSame++;
      }
    // the record pinching of the spinor states of both words: ψ(a + bi + cj + dk) = (a + bI, −c + dI)
    const spinor = (qq) => [
      [qq[0], qq[1]],
      [-qq[2], qq[3]]
    ];
    const pinch = (order) => {
      const s = spinor(wordOf(WORDS[order])),
        n2 = BigInt(qn2(wordOf(WORDS[order]))),
        cm = (x, y) => [x[0] * y[0] + x[1] * y[1], x[1] * y[0] - x[0] * y[1]],
        diag = s.map((z) => frac(BigInt(z[0] * z[0] + z[1] * z[1]), n2)),
        off = cm(s[0], s[1]).map((v) => frac(BigInt(v), n2));
      return { diag, off };
    };
    const pin = { XY: pinch('XY'), YX: pinch('YX') };
    // the exact divider: guard tests of the first 710 beats of PRIMEGAME, and the steps of one test at the word width
    const tests = pg.fired.reduce((s, r) => s + r + 1, 0),
      width = pg.states.reduce((w, N) => Math.max(w, N.toString(2).length), 0),
      perTest = 2 * (width + 1) + 3 + width * (6 * (width + 1) + 10) + 1;
    // the overwrite: bits changed by the second write, in both orders
    const flips = GEN_NAMES.filter((g, i) => onehot(WORDS.XY[0])[i] !== onehot(WORDS.XY[1])[i]).length;
    // torn states written by all runs of the page: none, since every write passed its guard first
    const xy = rotorRun('XY', 'Q1'),
      yx = rotorRun('YX', 'Q1');
    const rotorStates = [...xy.states, ...yx.states, ...rotorRun('XY', 'Q2').states, ...rotorRun('YX', 'Q2').states];
    const torn = rotorStates.filter((s) => !s.every(Number.isInteger)).length + runs.reduce((s, tr) => s + tr.states.filter((N) => N <= 0n).length, 0);
    return {
      adder: { tried: adderTried, bad: adderBad },
      mult: { tried: multTried, bad: multBad, beats22: t22.n, flags22: t22.flagged.slice(1).filter(Boolean).length },
      hits,
      hitsPrime: hits.every((h) => isPrime(h.p)),
      flagTotal,
      folds: { A: pg.folds.A.length - 1, B: pg.folds.B.length - 1 },
      lemmas: pg.folds.lemmas,
      longestRun: Math.max(...pg.folds.stepsB.map((s) => s.k)),
      foldBad,
      ledger: { states: statesTried, recBad, prodBad, closeTried, closeBad },
      escape,
      lps: { words: words.length, distinct: seen.size, bad: lpsBad, tears: lpsTears },
      kappa,
      kappaOk,
      code,
      descent: { pairs, scalarSplit, rotorSame },
      pin,
      divider: { tests, width, perTest, total: tests * perTest },
      flips,
      torn,
      xy: xy.states[0],
      yx: yx.states[0],
      tear: yx.beats[0].torn[0] ? yx.beats[0].torn[0].c5 : null
    };
  }
  const BENCH = benchmarks();
  const HITS = BENCH.hits;
  const FLAG_TOTAL = BENCH.flagTotal;
  const FLIPS = BENCH.flips;
  const NUMBERS = {
    adder: () => traceOf('adder', FRESH).states.map(String).join(' → '),
    multBeats: () => String(BENCH.mult.beats22),
    multEnd: () => `${traceOf('mult', FRESH).states[BENCH.mult.beats22]} = 5⁴`,
    multFlags: () => String(BENCH.mult.flags22),
    pgFlags: () => String(FLAG_TOTAL),
    folds: () => `${BENCH.folds.A} · ${BENCH.folds.B}`,
    xy: () => tuple(BENCH.xy),
    yx: () => tuple(BENCH.yx),
    tear: () => (BENCH.tear ? quarterText(BENCH.tear) : '—'),
    flips: () => String(FLIPS),
    torn: () => String(BENCH.torn)
  };
  function numText(say) {
    const B = BENCH,
      list = (xs) => xs.join(say('、', ', ')),
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`),
      pinStr = (o) => `diag(${B.pin[o].diag.map(fstr).join(', ')})`,
      offStr = (o) => {
        const [re, im] = B.pin[o].off;
        return im[0] === 0n ? fstr(re) : `${fstr(re)} ${im[0] < 0n ? '−' : '+'} ${fstr([im[0] < 0n ? -im[0] : im[0], im[1]])}i`;
      };
    return say(
      `打开页面时由脚本用大整数现算，是上面各条定理的个别实例，不检验定理的前提。加法器：${B.adder.tried} 组输入 2^a·3^b 在 a 拍后停在 3^(a+b)，${bad(B.adder.bad)}；乘法器：${B.mult.tried} 组输入停在 5^(ab)，${bad(B.mult.bad)}，36 → 625 用 ${B.mult.beats22} 拍，其中 N 带旗标 ${B.mult.flags22} 拍。PRIMEGAME 前 2375 拍里纯 2 的幂在第 ${list(HITS.map((h) => `${h.beat} 拍（2${superscript(h.p)}）`))}，指数${B.hitsPrime ? '都是素数' : '不全是素数'}；前 710 拍里 N 带旗标素数 ${FLAG_TOTAL} 拍。引理 A（${list(B.lemmas)}）与 A + B 把 710 拍压成 ${B.folds.A} 与 ${B.folds.B} 步，每一步作为一个分数作用在起点上得到终点，${bad(B.foldBad)}。账本：${B.ledger.states} 个状态由指数还原${bad(B.ledger.recBad)}，乘积公式 |N|·∏|N|_p = 1 ${bad(B.ledger.prodBad)}；${B.ledger.closeTried} 对（状态，门）上“N·a/b ∈ ℤ ⇔ 账本相加 ≥ 0”${bad(B.ledger.closeBad)}。十个素数之积加一 = ${B.escape.value}，模每个素数余 1 ${B.escape.residues ? '成立' : '不成立'}，最小素因子 ${B.escape.q} ${B.escape.outside ? '不在表里' : '在表里'}。旋子：字长 ≤ 4 的 ${B.lps.words} 个约化字，积互不相同 ${B.lps.distinct} 个，模方 5^L 与“Ψ·π̄/5 ∈ ℤ⁴ 恰当 π 是最后一个字母”${bad(B.lps.bad)}，撕裂的候选 ${B.lps.tears} 个；六个生成元的 ⟨1, π⟩²/‖π‖² = ${fstr(B.kappa)}${B.kappaOk ? '' : '（不符）'}。两字编码：长度 ≤ 8 的 ${B.code.strings} 个布尔串，a = x、b = y 时碰撞 ${B.code.free} 对，a = x、b = xx 时碰撞 ${B.code.stuck} 对。${B.descent.pairs} 对不同字母：标量积换序后不同 ${B.descent.scalarSplit} 对，旋子积换序后相同 ${B.descent.rotorSame} 对。按 z 记录捏合：Ψ_XY 与 Ψ_YX 的旋量态都是 ${pinStr('XY')}，捏合前的相干项分别是 ${offStr('XY')} 与 ${offStr('YX')}，再捏一次不变。精确除法机：PRIMEGAME 前 710 拍共做 ${B.divider.tests} 次守卫测试，状态最长 ${B.divider.width} 位，按 divPositiveRunTime 每次 ${B.divider.perTest} 步，共 ${B.divider.total} 步。覆盖写改 ${B.flips} 位；页面写下的状态里撕裂 ${B.torn} 个。数值演示，不是证明。`,
      `Computed in big integers by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Adder: ${B.adder.tried} inputs 2^a·3^b stop at 3^(a+b) after a beats, ${bad(B.adder.bad)}; multiplier: ${B.mult.tried} inputs stop at 5^(ab), ${bad(B.mult.bad)}, and 36 → 625 takes ${B.mult.beats22} beats, ${B.mult.flags22} of them with a flag in N. In the first 2375 beats of PRIMEGAME the pure powers of 2 come at ${list(HITS.map((h) => `beat ${h.beat} (2${superscript(h.p)})`))}, ${B.hitsPrime ? 'all exponents prime' : 'not all exponents prime'}; on ${FLAG_TOTAL} of the first 710 beats N carries a flag prime. Lemma A (${list(B.lemmas)}) and A + B fold the 710 beats into ${B.folds.A} and ${B.folds.B} steps; every step, applied as one fraction to its start, gives its end, ${bad(B.foldBad)}. Ledgers: ${B.ledger.states} states recovered from their exponents, ${bad(B.ledger.recBad)}; the product formula |N|·∏|N|_p = 1, ${bad(B.ledger.prodBad)}; “N·a/b ∈ ℤ ⇔ the ledgers add up to ≥ 0” on ${B.ledger.closeTried} pairs (state, gate), ${bad(B.ledger.closeBad)}. The product of the ten primes plus one is ${B.escape.value}, ≡ 1 modulo each of them: ${B.escape.residues ? 'yes' : 'no'}; its least prime factor ${B.escape.q} is ${B.escape.outside ? 'not in the list' : 'in the list'}. Rotors: ${B.lps.words} reduced words of length ≤ 4, ${B.lps.distinct} distinct products; squared norm 5^L and “Ψ·π̄/5 ∈ ℤ⁴ exactly when π is the last letter”, ${bad(B.lps.bad)}; ${B.lps.tears} torn candidates; ⟨1, π⟩²/‖π‖² = ${fstr(B.kappa)} for the six generators${B.kappaOk ? '' : ' (failed)'}. Two-word code: ${B.code.strings} Boolean strings of length ≤ 8, ${B.code.free} collisions with a = x, b = y and ${B.code.stuck} with a = x, b = xx. ${B.descent.pairs} pairs of different letters: scalar products that change with the order ${B.descent.scalarSplit}, rotor products that do not ${B.descent.rotorSame}. Pinching by the z record: the spinor states of Ψ_XY and Ψ_YX both become ${pinStr('XY')}; their coherences before pinching are ${offStr('XY')} and ${offStr('YX')}; a second pinching changes nothing. The exact divider: the first 710 beats of PRIMEGAME make ${B.divider.tests} guard tests on states of at most ${B.divider.width} bits, ${B.divider.perTest} steps each by divPositiveRunTime, ${B.divider.total} together. The overwrite changes ${B.flips} bits; torn states written by the page: ${B.torn}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
  for (const el of document.querySelectorAll('[data-bench]')) {
    const zh = !!el.closest('.zh');
    el.innerHTML = el.dataset.bench === 'hits' ? HITS.slice(0, 4).map((h) => `${h.beat}${zh ? '（' : ' ('}2${superscript(h.p)}${zh ? '）' : ')'}`).join(zh ? '、' : ', ') : NUMBERS[el.dataset.bench]();
  }
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  /* the crumb leads to §38.14 in the language of the page; the static href stays the index of the visualizations */
  const crumb = $('crumb');
  const crumbTo = () => {
    crumb.setAttribute('href', TRV.lang() === 'en' ? crumb.dataset.chapterEn : crumb.dataset.chapterZh);
  };
  crumbTo();
  TRV.onLang(() => {
    crumbTo();
    paint();
  });
  if (document.fonts)
    document.fonts.ready.then(() => {
      title.key = '';
      paint();
    });

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
    const n = rail().whole ? Math.min(clock.max, 720) : 240;
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

  /* ---------- probe, cover, start ---------- */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  const viewOut = (m) => {
    const strip = (v) => {
      if (!v || typeof v !== 'object') return v;
      const { prog, run: r, ...rest } = v;
      return rest;
    };
    return { adder: strip(m.adder), mult: strip(m.mult), prime: strip(m.prime), rotor: strip(m.rotor), audit: { t: m.audit.t, vn: m.audit.vn, pg: strip(m.audit.pg), om: strip(m.audit.om) } };
  };
  window.OFISA_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        ...viewOut(m),
        at: state.at,
        scene: state.scene,
        regime: regimeOf(m),
        inputs: { a: state.a, b: state.b, ma: state.ma, mb: state.mb, level: state.level, order: state.order, attn: state.attn },
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
    presets: plain(PRESETS),
    programs: plain(Object.fromEntries(Object.entries(PROGRAMS).map(([k, p]) => [k, { rules: p.rules.map((r) => r.text), flags: p.flags, primes: p.primes }]))),
    /** The runs of the page, as it holds them. */
    trace: (scene, over = {}) => {
      const tr = traceOf(scene, { ...FRESH, ...over });
      return plain({ states: tr.states, fired: tr.fired, next: tr.next, halted: tr.halted, flagged: tr.flagged, folds: { raw: tr.folds.raw.length - 1, A: tr.folds.A, B: tr.folds.B, lemmas: tr.folds.lemmas } });
    },
    rotor: (order, attn = 'Q1') => plain(rotorRun(order, attn)),
    bench: () => plain(BENCH),
    railMax: (scene, over = {}) => railMaxOf(scene, { ...state, ...over }),
    guards: () => guards,
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates and depth of a world point. */
    pointTarget: (p) => {
      const s = sc.p(p),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + s[0], y: b.top + s[1], depth: s[2] };
    },
    /** The stereographic place of an integer quadruple on the rotor stage. */
    stereo: (q) => st(q)
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
