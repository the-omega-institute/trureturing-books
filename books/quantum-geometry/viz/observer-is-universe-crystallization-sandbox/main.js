/* OMEGA//UNIVERSE · 观察者即宇宙 · the observer is the universe (Chapter 38, §38.13)
   World (kit.solid): z up. The violet glass ball is the receivable carrier 𝒮 of one observer: 28 canonical integer
   ternions (w, x, y, z), the first nonzero entry 1, entries −1, 0, 1, with no two nonzero entries among x, y, z when w = 1.
   A node of 𝒮 floats inside the ball in the direction dir(p): its height is w/‖p‖, whose square is the reading κ(o, p)
   against the seed o = (1, 0, 0, 0); its azimuth is a drawing choice. A latent node of the horizon ℋ½ = 𝒮 \ V(K₀) stands
   at the radius R_LAT, a crystallized node of the core K₀ at the radius R_CORE, near the centre.
     pentad  nine readings of the observer: three tree sprouts, three chords, three tautologies; τ = Σ (ΔI_Schur + Δb₁);
     ledger  the same readings with the orthogonal basis u_j, the residual x⊥ and the cycles of the graph;
     flip    the three steps of 𝔒 ≅ 𝒰: coupled exterior modes fold back onto their nodes, the uncoupled ghosts ℰ⊥ form
             one fibre of readout zero and are dropped, the camera enters the core and the horizon surrounds it;
     monad   three observers, each in its own order, and the trunk they share;
     lean    the four states u0 … u3 of ObserverUniverse, crystallizeStep as the zero-import Lean listing defines it.
   The rail is the reading of the card (a step, a proof step, a resonance step or a state of the listing). Fractions are
   pairs of big integers [p, q], q > 0. A number is printed after “=” only when the printed decimal is the value, decided on
   fractions, and after “≈” when it rounds it. LEAN_RUN holds what Lean printed once; everything else is computed here.
   Read-only probe: window.UNIVERSE_DEBUG. */
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
  const ease = (u) => u * u * (3 - 2 * u);
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / norm(a));
  const mix = (a, b, u) => a.map((x, i) => lerp(x, b[i], u));
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
  const ZERO = whole(0),
    ONE = whole(1),
    QUARTER = [1n, 4n];
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
  /** d + 1 significant digits with a power of ten. */
  const sci = (x, d = 3) => {
    const [m, e] = x.toExponential(d).split('e').map(Number);
    return `${kit.fix(m, d)}×10${superscript(e)}`;
  };
  /* The relation before a printed number, one rule for the whole page. “=” stands before digits that are the value itself;
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as one
     of them. An inequality of the page stands between exact expressions; a value never follows it in rounded digits. */
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction; x: the value as computed, a double. */
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
  /** A fraction and its decimal: 1/2 = 0.5000, 13/3 ≈ 4.3333. */
  const both = (q, d = 4) => `${fstr(q)} ${relQ(q, d)}`;
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  /** A signed increment: +1, +1/2, 0. */
  const inc = (q) => (q[0] > 0n ? '+' : '') + fstr(q);

  /* ---------- integer ternions: the Hamilton product, the triad and the canonical tuple ---------- */
  const gcdI = (m, n) => {
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
  const conj = ([w, x, y, z]) => [w, -x + 0, -y + 0, -z + 0];
  /** ProjTernion.normalize: divide by the gcd and make the first nonzero entry positive; the zero tuple goes to the unit. */
  function normalize(t) {
    const g = t.reduce((s, v) => gcdI(s, v), 0);
    if (!g) return [1, 0, 0, 0];
    const r = t.map((v) => v / g),
      lead = r.find((v) => v !== 0);
    return r.map((v) => (lead < 0 ? -v : v) + 0);
  }
  /** [a, b, c] = normalize(a · b̄ · c). */
  const triad = (a, b, c) => normalize(qmul(qmul(a, conj(b)), c));
  const tuple = (t) => `(${t.map((v) => String(v).replace('-', '−')).join(', ')})`;
  /** κ(a, b) = ⟨a, b⟩²/(‖a‖²‖b‖²) in lowest terms; 0 when a tuple is zero. */
  const kappa = (a, b) => {
    const den = BigInt(dot(a, a) * dot(b, b));
    return den === 0n ? ZERO : frac(BigInt(dot(a, b)) ** 2n, den);
  };

  /* ---------- rational vectors: projection, residual and the Schur innovation ---------- */
  const vecQ = (t) => t.map(whole);
  const dotQ = (a, b) => a.reduce((s, x, i) => plus(s, times(x, b[i])), ZERO);
  const subQ = (a, b) => a.map((x, i) => minus(x, b[i]));
  const smulQ = (k, a) => a.map((x) => times(k, x));
  const isZero = (q) => q[0] === 0n;
  /** Remove the components along an orthogonal basis, skipping zero vectors (QVec4.projectOut). */
  const projectOut = (v, basis) =>
    basis.reduce((r, e) => {
      const ee = dotQ(e, e);
      return isZero(ee) ? r : subQ(r, smulQ(quo(dotQ(r, e), ee), e));
    }, v);
  /** ⟨x⊥, x⊥⟩/⟨x, x⟩ (QVec4.schurInnovation). */
  function schur(v, basis) {
    const vv = dotQ(v, v);
    if (isZero(vv)) return ZERO;
    const r = projectOut(v, basis);
    return quo(dotQ(r, r), vv);
  }
  const vecText = (v) => `(${v.map(fstr).join(', ')})`;
  const vecNum = (v) => v.map(fval);

  /* ---------- graphs: components, the first Betti number, pairs ---------- */
  const pairKey = ([u, v]) => (u < v ? `${u}|${v}` : `${v}|${u}`);
  function components(V, E) {
    const parent = new Map(V.map((v) => [v, v]));
    const find = (x) => {
      while (parent.get(x) !== x) x = parent.get(x);
      return x;
    };
    for (const [u, v] of E) parent.set(find(u), find(v));
    return new Set(V.map(find)).size;
  }
  const betti = (V, E) => E.length - V.length + components(V, E);
  const choose2 = (n) => (n * (n - 1)) / 2;

  /* ---------- the receivable carrier 𝒮 ---------- */
  const CARRIER = [];
  for (const w of [-1, 0, 1])
    for (const x of [-1, 0, 1])
      for (const y of [-1, 0, 1])
        for (const z of [-1, 0, 1]) {
          const t = [w, x, y, z],
            lead = t.find((v) => v !== 0),
            inner = [x, y, z].filter((v) => v !== 0).length;
          if (lead === 1 && !(w === 1 && inner === 2)) CARRIER.push(t);
        }
  const keyOf = (t) => t.join(',');
  const NAMED = { o: [1, 0, 0, 0], a: [1, 1, 0, 0], b: [1, 0, 1, 0], g: [1, 1, 1, 1], d: [0, 1, 0, 1], e: [0, 1, 1, 0], f: [1, 1, 1, -1] };
  const NAME_OF = new Map(Object.entries(NAMED).map(([n, t]) => [keyOf(t), n]));
  const nameOf = (t) => NAME_OF.get(keyOf(t)) || tuple(t);
  /** The private node of the third observer: its carrier is ℚ⁴ ⊕ ℚ, the fifth axis its own. */
  const PRIVATE = [1, 0, 0, 0, 1];
  const TUPLE = { ...NAMED, p: PRIVATE };
  const pad = (t, n) => [...t, ...range(n - t.length).map(() => 0)];

  /* ---------- the ledger of an observer: what each reading adds ----------
     sprout x from y: a node of the horizon enters K₀ with the edge (y, y, x ↦ x); chord (u, v): a pair of K₀ enters with the
     edge (u, o, v ↦ [u, o, v]); taut: [x, x, x] = x is read again, or an edge already in K₀. ΔI_Schur is the Schur innovation
     of the node a reading adds over the orthogonal basis of K₀ (0 when it adds none), Δb₁ the change of |E| − |V| + c. */
  function close(a, b, c) {
    const [A, B, C] = [a, b, c].map((n) => TUPLE[n]);
    if (A.length === 4 && B.length === 4 && C.length === 4) return nameOf(triad(A, B, C));
    return a === b ? c : null;
  }
  function ledger(steps, dims = 4) {
    const seed = 'o';
    let V = [seed],
      E = [],
      basis = [vecQ(pad(TUPLE[seed], dims))],
      tau = ZERO;
    const closures = new Map();
    const snap = (extra) => ({ V: [...V], E: E.map((e) => [...e]), c: components(V, E), b1: betti(V, E), tau, basis: basis.map((v) => [...v]), pairs: choose2(V.length), open: choose2(V.length) - E.length, latent: CARRIER.length - V.filter((v) => v !== 'p').length, ...extra });
    const states = [snap({ k: 0, kind: 'genesis', dI: ZERO, dB: 0, dTau: ZERO, ok: true })];
    steps.forEach((s, i) => {
      const before = betti(V, E);
      let dI = ZERO,
        closure = null,
        residual = null,
        ok = true,
        target = null;
      if (s.kind === 'sprout') {
        const x = vecQ(pad(TUPLE[s.node], dims));
        residual = projectOut(x, basis);
        dI = schur(x, basis);
        if (cmp(dI, ZERO) > 0) basis = [...basis, residual];
        ok = !V.includes(s.node);
        V = [...V, s.node];
        E = [...E, [s.from, s.node]];
        closure = [s.from, s.from, s.node, close(s.from, s.from, s.node)];
        closures.set(pairKey([s.from, s.node]), closure);
        target = { node: s.node };
      } else if (s.kind === 'chord') {
        ok = s.edge.every((v) => V.includes(v)) && !E.some((e) => pairKey(e) === pairKey(s.edge));
        E = [...E, [...s.edge]];
        closure = [s.edge[0], seed, s.edge[1], close(s.edge[0], seed, s.edge[1])];
        closures.set(pairKey(s.edge), closure);
        target = { edge: s.edge };
      } else if (s.at) {
        closure = [s.at, s.at, s.at, close(s.at, s.at, s.at)];
        ok = V.includes(s.at) && closure[3] === s.at;
        dI = schur(vecQ(pad(TUPLE[s.at], dims)), basis);
        target = { node: s.at };
      } else {
        closure = closures.get(pairKey(s.edge)) || null;
        ok = !!closure;
        target = { edge: s.edge };
      }
      const dB = betti(V, E) - before,
        dTau = plus(dI, whole(dB));
      tau = plus(tau, dTau);
      states.push(snap({ k: i + 1, kind: s.kind, step: s, closure, residual, dI, dB, dTau, ok, target }));
    });
    return states;
  }
  const MAIN_STEPS = [
    { kind: 'taut', at: 'o' },
    { kind: 'sprout', node: 'a', from: 'o' },
    { kind: 'sprout', node: 'b', from: 'o' },
    { kind: 'taut', edge: ['o', 'a'] },
    { kind: 'chord', edge: ['a', 'b'] },
    { kind: 'sprout', node: 'g', from: 'o' },
    { kind: 'chord', edge: ['a', 'g'] },
    { kind: 'taut', at: 'g' },
    { kind: 'chord', edge: ['b', 'g'] }
  ];
  const MAIN = ledger(MAIN_STEPS);
  const N_MAIN = MAIN_STEPS.length;
  /** The state of the core that the flip card works on: K₀ after the fifth reading. */
  const FLIP_AT = 5;
  const OBS = ['A', 'B', 'C'];
  const OBS_STEPS = {
    A: [
      { kind: 'sprout', node: 'a', from: 'o' },
      { kind: 'sprout', node: 'b', from: 'o' },
      { kind: 'chord', edge: ['a', 'b'] },
      { kind: 'sprout', node: 'g', from: 'o' },
      { kind: 'chord', edge: ['a', 'g'] },
      { kind: 'chord', edge: ['b', 'g'] },
      { kind: 'taut', at: 'g' }
    ],
    B: [
      { kind: 'sprout', node: 'g', from: 'o' },
      { kind: 'sprout', node: 'a', from: 'o' },
      { kind: 'chord', edge: ['a', 'g'] },
      { kind: 'sprout', node: 'b', from: 'o' },
      { kind: 'chord', edge: ['b', 'g'] },
      { kind: 'chord', edge: ['a', 'b'] },
      { kind: 'taut', at: 'a' }
    ],
    C: [
      { kind: 'sprout', node: 'p', from: 'o' },
      { kind: 'sprout', node: 'a', from: 'o' },
      { kind: 'sprout', node: 'b', from: 'o' },
      { kind: 'chord', edge: ['a', 'b'] },
      { kind: 'sprout', node: 'g', from: 'o' },
      { kind: 'chord', edge: ['a', 'g'] },
      { kind: 'chord', edge: ['b', 'g'] }
    ]
  };
  const MONAD = Object.fromEntries(OBS.map((o) => [o, ledger(OBS_STEPS[o], o === 'C' ? 5 : 4)]));
  const N_MONAD = 7;
  /** The shared atlas 𝒞 and the trunk ⋂ ι_i⁻¹(K₀,i) at a resonance step: its nodes and its edges. */
  const SHARED = ['o', 'a', 'b', 'g'];
  function trunkAt(k) {
    const at = OBS.map((o) => MONAD[o][k]);
    const nodes = SHARED.filter((n) => at.every((s) => s.V.includes(n)));
    const keys = at.map((s) => new Set(s.E.map(pairKey)));
    const edges = [];
    for (let i = 0; i < SHARED.length; i++) for (let j = i + 1; j < SHARED.length; j++) if (keys.every((s) => s.has(pairKey([SHARED[i], SHARED[j]])))) edges.push([SHARED[i], SHARED[j]]);
    return { nodes, edges };
  }
  const TRUNK = range(N_MONAD + 1).map(trunkAt);

  /* ---------- ObserverUniverse: crystallizeStep as the zero-import listing of §38.13.4 defines it ---------- */
  const LEAN_HORIZON = [[1, 0, 0, 0], normalize([1, 1, 0, 0]), normalize([1, 0, 1, 0])];
  function genesis(seed, receivable) {
    return { horizon: [seed, ...receivable], core: [seed], basis: [vecQ(seed)], dag: [], tau: ZERO, cursor: 0, last: null };
  }
  function crystallizeStep(u) {
    const cand = u.horizon[u.cursor % u.horizon.length];
    if (!cand) return u;
    const anchor = u.core[0] || [1, 0, 0, 0],
      last = u.core[u.core.length - 1] || anchor,
      edge = [last, anchor, cand, triad(last, anchor, cand)];
    const inDag = u.dag.some((e) => same(e, edge)),
      inCore = u.core.some((v) => same(v, cand));
    const v = vecQ(cand),
      residual = projectOut(v, u.basis),
      dGeom = schur(v, u.basis),
      dTopo = !inDag && !same(cand, anchor) ? QUARTER : ZERO,
      dTau = plus(dGeom, dTopo);
    return {
      horizon: u.horizon,
      core: inCore ? u.core : [...u.core, cand],
      basis: cmp(ZERO, dGeom) < 0 ? [...u.basis, residual] : u.basis,
      dag: !inDag && cmp(ZERO, dTau) < 0 ? [...u.dag, edge] : u.dag,
      tau: plus(u.tau, dTau),
      cursor: u.cursor + 1,
      last: { cursor: u.cursor, cand, anchor, edge, residual, dGeom, dTopo, dTau, inDag, inCore }
    };
  }
  const LEAN = [genesis(LEAN_HORIZON[0], LEAN_HORIZON.slice(1))];
  for (let i = 0; i < 3; i++) LEAN.push(crystallizeStep(LEAN[i]));
  /** What Lean v4.35.0 printed once on this machine (the page does not run Lean). */
  const LEAN_RUN = {
    version: 'v4.35.0',
    qrat: { decide: true, axioms: [] },
    rat: { decide: false, axioms: ['propext', 'sorryAx', 'Classical.choice', 'Quot.sound'] }
  };

  /* ---------- the flip: what lies outside 𝒮, and what the core can see ---------- */
  /** Raw integer tuples outside the list of 𝒮: each is a multiple of a node of 𝒮 and couples to 𝔒. */
  const COUPLED = [
    [2, 2, 0, 0],
    [-3, 0, -3, 0],
    [0, 2, 0, 2],
    [3, 3, 3, 3],
    [0, 0, -2, 0]
  ];
  /** Ghosts: vectors of ℚ⁴ ⊕ ℚ², orthogonal to every node of 𝒮. */
  const GHOSTS = [
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, -1],
    [0, 0, 0, 0, 2, 1]
  ];
  /** The readout of a vector of any length: κ against each node of 𝒮. */
  const readout = (v) => CARRIER.map((s) => kappa(v, pad(s, v.length)));
  const readKey = (r) => r.map(fstr).join(' ');
  const CARRIER_READ = CARRIER.map((s) => readKey(readout(s)));
  /** The fibre of a readout: the index of the node of 𝒮 with the same readout, or −1 (no node: the fibre over 0). */
  const fibreOf = (v) => CARRIER_READ.indexOf(readKey(readout(v)));
  const EXTERIOR = {
    coupled: COUPLED.map((t) => ({ t, fibre: fibreOf(t), node: normalize(t) })),
    ghosts: GHOSTS.map((t) => ({ t, fibre: fibreOf(t), zero: readout(t).every(isZero) }))
  };
  /** The share of a node the core sees, 1 − ΔI_Schur(x | K₀), and the latent share, over the horizon of K₀ at FLIP_AT. */
  function shares(state) {
    const horizon = CARRIER.filter((t) => !state.V.some((n) => same(TUPLE[n], t)));
    const latent = horizon.map((t) => schur(vecQ(t), state.basis));
    const mean = latent.reduce((s, q) => plus(s, q), ZERO);
    const lat = quo(mean, whole(horizon.length));
    return { n: horizon.length, latent: lat, visible: minus(ONE, lat), each: latent };
  }
  const FLIP_SHARES = shares(MAIN[FLIP_AT]);

  /* ---------- the state: one rail value per card, and everything the page shows of it ---------- */
  const SCENES = ['pentad', 'ledger', 'flip', 'monad', 'lean'];
  const RAILS = {
    pentad: { max: N_MAIN, rate: 1.2, step: 1 },
    ledger: { max: N_MAIN, rate: 1.2, step: 1 },
    flip: { max: 3, rate: 0.55, step: 1 },
    monad: { max: N_MONAD, rate: 1.2, step: 1 },
    lean: { max: 3, rate: 0.7, step: 1 }
  };
  const STILL = { pentad: N_MAIN, ledger: 5, flip: 3, monad: N_MONAD, lean: 3 };
  const FRESH = { focus: 'A', idle: false, spin: 0, replays: 0 };
  const state = { scene: 'pentad', at: { ...STILL }, ...FRESH, lens: 0, cam: 'panorama', from: null, blend: 1 };
  /** The whole part and the rest of a rail value. */
  function split(t) {
    const k = Math.floor(t + 1e-9);
    return { k, f: t - k < 1e-9 ? 0 : t - k };
  }
  function mainAt(t) {
    const { k, f } = split(Math.min(t, N_MAIN));
    const kk = Math.min(k, N_MAIN);
    return { t, k: kk, f: kk >= N_MAIN ? 0 : f, now: MAIN[kk], next: kk < N_MAIN ? MAIN[kk + 1] : null };
  }
  function compute(s) {
    const main = mainAt(s.at[s.scene === 'ledger' ? 'ledger' : 'pentad']);
    const flipT = s.at.flip,
      absorb = clamp(flipT, 0, 1),
      quotient = clamp(flipT - 1, 0, 1),
      gaze = clamp(flipT - 2, 0, 1);
    const outsideCoupled = absorb >= 1 ? 0 : COUPLED.length,
      outsideGhosts = quotient >= 1 ? 0 : GHOSTS.length;
    const m = split(Math.min(s.at.monad, N_MONAD)),
      mk = Math.min(m.k, N_MONAD);
    const l = split(Math.min(s.at.lean, 3)),
      lk = Math.min(l.k, 3);
    return {
      main,
      pentad: mainAt(s.at.pentad),
      ledger: mainAt(s.at.ledger),
      flip: { t: flipT, absorb, quotient, gaze, state: MAIN[FLIP_AT], outsideCoupled, outsideGhosts, outside: outsideCoupled + outsideGhosts, carrier: CARRIER.length, shares: FLIP_SHARES },
      monad: { t: s.at.monad, k: mk, f: mk >= N_MONAD ? 0 : m.f, focus: s.focus, at: Object.fromEntries(OBS.map((o) => [o, MONAD[o][mk]])), trunk: TRUNK[mk] },
      lean: { t: s.at.lean, k: lk, f: lk >= 3 ? 0 : l.f, u: LEAN[lk], next: lk < 3 ? LEAN[lk + 1] : null },
      idle: s.idle,
      spin: s.spin,
      replays: s.replays
    };
  }
  const calc = () => compute(state);
  /** The main ledger of a card: the reading the HUD and the readouts speak about; the flip works on the core after FLIP_AT. */
  const mainOf = (m) => (state.scene === 'ledger' ? m.ledger : state.scene === 'flip' ? mainAt(FLIP_AT) : m.pentad);

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  const cams = { panorama: [-0.46, 0.4, 1], face: [-0.14, 0.16, 1], zenith: [-0.32, 0.98, 1] };
  const PRESETS = {
    'port-free-pentad-crystallization': { scene: 'pentad', cam: 'panorama', play: true, still: STILL.pentad },
    'rational-schur-betti-time-arrow': { scene: 'ledger', cam: 'face', play: true, still: STILL.ledger },
    'core-inside-out-starry-sky-flip': { scene: 'flip', cam: 'panorama', play: true, still: STILL.flip },
    'trureturing-monad-resonant-span': { scene: 'monad', cam: 'zenith', play: true, still: STILL.monad },
    'lean4-observer-universe-decide-trace': { scene: 'lean', cam: 'face', play: true, still: STILL.lean }
  };
  const DEFAULT = 'port-free-pentad-crystallization';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.panorama[0], pitch: cams.panorama[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis3 = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis3(...cams.panorama);
  /** A point x to the right, y up and d towards the viewer. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  const R_LAT = 0.84,
    R_CORE = 0.5;
  /* the azimuth of a node: a projection of (x, y, z) to the horizontal plane, chosen to spread the 28 nodes */
  const AXON = [
    [cs(PI / 2), sn(PI / 2)],
    [0.7 * cs((4 * PI) / 3), 0.7 * sn((4 * PI) / 3)],
    [cs((11 * PI) / 6), sn((11 * PI) / 6)]
  ];
  /** The direction of a tuple of ℚ⁴: the height w/‖p‖ (its square is κ(o, p)), the azimuth of its axis. A fifth
      coordinate (the private axis of the third observer) points down. */
  function dir(q) {
    const extra = q.length > 4 ? q[4] : 0,
      n = norm(q),
      h = (q[0] - abs(extra) * 0.9) / n,
      r = Math.sqrt(Math.max(0, 1 - h * h)),
      a = [0, 1].map((i) => q[1] * AXON[0][i] + q[2] * AXON[1][i] + q[3] * AXON[2][i]),
      m = hypot(...a);
    if (extra) return unit([0.35, -0.5, h]);
    return r < 1e-12 || m < 1e-12 ? [0, 0, h] : [(r * a[0]) / m, (r * a[1]) / m, h];
  }
  const at = (q, r) => scale(dir(q), r);
  /** A slerp of two directions at a radius. */
  function arc(p, q, n = 24, r = 1) {
    const u = unit(p),
      v = unit(q),
      om = Math.acos(clamp(dot(u, v), -1, 1));
    if (om < 1e-6) return [scale(u, r)];
    return sample(n, (t) => scale(add(scale(u, sn((1 - t) * om) / sn(om)), scale(v, sn(t * om) / sn(om))), r));
  }
  /** An arc between two world points bulging outward by `bow` of their distance. */
  function bowed(p, q, bow = 0.25, n = 24) {
    const mid = scale(add(p, q), 0.5),
      out = norm(mid) > 1e-9 ? unit(mid) : cam.U,
      c = add(mid, scale(out, bow * norm(sub(p, q))));
    return sample(n, (t) => add(add(scale(p, (1 - t) * (1 - t)), scale(c, 2 * t * (1 - t))), scale(q, t * t)));
  }
  const bez = (p, c, q, t) => add(add(scale(p, (1 - t) * (1 - t)), scale(c, 2 * t * (1 - t))), scale(q, t * t));

  /* ---------- where things stand ---------- */
  /** The world point of a node of the main observer at a ledger state; the flip pulls the core in and pushes the horizon out. */
  function nodePos(name, st, g = 0) {
    const t = TUPLE[name],
      core = st.V.includes(name);
    return at(t, core ? R_CORE * (1 - 0.78 * g) : lerp(R_LAT, 0.95, g));
  }
  const latentPos = (t, g = 0) => at(t, lerp(R_LAT, 0.95, g));
  const edgePath = (u, v, st, g = 0) => arc(nodePos(u, st, g), nodePos(v, st, g), 18, R_CORE * (1 - 0.78 * g));
  const edgeMid = (u, v, st) => {
    const p = edgePath(u, v, st);
    return p[Math.floor(p.length / 2)];
  };
  /** Where the crystallization cursor rests after a reading of a ledger: its node, or the middle of its edge. */
  function restOf(st, prev) {
    if (!st.target) return nodePos('o', st);
    if (st.target.node) return nodePos(st.target.node, st);
    return edgeMid(st.target.edge[0], st.target.edge[1], st.kind === 'chord' ? st : prev);
  }
  /** The capture of a sprout: from the latent node along the curvature arc into the core. */
  function capture(st, prev, u) {
    const x = TUPLE[st.step.node],
      from = at(x, R_LAT),
      to = at(x, R_CORE),
      anchor = nodePos(st.step.from, prev),
      c = add(scale(add(from, anchor), 0.5), scale(unit(add(from, to)), 0.18));
    return bez(from, c, to, u);
  }
  /** The cursor of a ledger at a rail value: it travels to the next candidate, then carries it into the core. */
  function cursorOf(states, t, n) {
    const { k, f } = split(Math.min(t, n)),
      kk = Math.min(k, n);
    const here = restOf(states[kk], states[Math.max(0, kk - 1)]);
    if (kk >= n || f === 0) return here;
    const next = states[kk + 1];
    if (next.kind === 'sprout') {
      const from = at(TUPLE[next.step.node], R_LAT);
      if (f < 0.5) return mix(here, from, ease(f / 0.5));
      return capture(next, states[kk], ease((f - 0.5) / 0.5));
    }
    const to = restOf(next, states[kk]);
    return mix(here, to, ease(f));
  }
  /* the three observers of the monad card: three small balls round the shared atlas */
  const OBS_R = 0.5,
    OBS_AT = { A: [0, 1.22, 0], B: [-1.06, -0.61, 0], C: [1.06, -0.61, 0] };
  const obsPos = (o, name, st) => add(OBS_AT[o], scale(dir(pad(TUPLE[name], o === 'C' ? 5 : 4)), OBS_R * (st.V.includes(name) ? 0.42 : 0.8)));
  const TRUNK_AT = [0, 0, 0.05],
    TRUNK_R = 0.27;
  /** The shared atlas 𝒞 as a tetrahedron at the centre: o on top. */
  const trunkPos = (name) =>
    add(TRUNK_AT, scale({ o: [0, 0, 1], a: [0.943, 0, -0.333], b: [-0.471, 0.816, -0.333], g: [-0.471, -0.816, -0.333] }[name], TRUNK_R));
  function monadCursor(t) {
    const { k, f } = split(Math.min(t, N_MONAD)),
      kk = Math.min(k, N_MONAD),
      o = state.focus,
      L0 = MONAD[o];
    const rest = (s) => (!s.target ? obsPos(o, 'o', s) : s.target.node ? obsPos(o, s.target.node, s) : scale(add(obsPos(o, s.target.edge[0], s), obsPos(o, s.target.edge[1], s)), 0.5));
    const here = rest(L0[kk]);
    if (kk >= N_MONAD || f === 0) return here;
    return mix(here, rest(L0[kk + 1]), ease(f));
  }
  /* the Lean card: three nodes of the listing, the DAG edges and the basis */
  const LEAN_SIDE = () => (small() ? [1.42, -0.62] : [1.6, -0.5]);
  function leanCursor(t) {
    const { k, f } = split(Math.min(t, 3)),
      kk = Math.min(k, 3);
    const rest = (u) => (u.last ? at(u.last.cand, u.core.some((v) => same(v, u.last.cand)) ? R_CORE : R_LAT) : at(LEAN_HORIZON[0], R_CORE));
    const here = rest(LEAN[kk]);
    if (kk >= 3 || f === 0) return here;
    const cand = LEAN[kk + 1].last.cand,
      from = at(cand, R_LAT),
      to = at(cand, R_CORE);
    if (LEAN[kk + 1].last.inCore) return mix(here, to, ease(f));
    return f < 0.5 ? mix(here, from, ease(f / 0.5)) : mix(from, to, ease((f - 0.5) / 0.5));
  }
  /* the flip: the amber mark is the place of the camera, from outside the ball into the core */
  const FLIP_FROM = () => seen(1.32, 0.86, 0.3);
  function flipCursor(t) {
    const u = clamp(t / 3, 0, 1),
      from = FLIP_FROM(),
      c = seen(0.95, -0.15, 0.3);
    return bez(from, c, [0, 0, 0], ease(u));
  }
  /** The world point of the amber mark for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'flip':
        return flipCursor(v);
      case 'monad':
        return monadCursor(v);
      case 'lean':
        return leanCursor(v);
      default:
        return cursorOf(MAIN, v, N_MAIN);
    }
  }
  const coupledPos = (c, u) => at(c.node, lerp(1.46, R_LAT, ease(u)));
  const GHOST_DIRS = [
    [0.92, 0.3, 0.3],
    [-0.75, 0.55, 0.42],
    [-0.62, -0.72, 0.36],
    [0.38, -0.88, -0.3],
    [0.12, 0.9, -0.42]
  ].map(unit);
  const GHOST_MEET = () => seen(-1.38, -0.92, 0.2);
  function ghostPos(i, u) {
    const from = scale(GHOST_DIRS[i], 1.62);
    return mix(from, GHOST_MEET(), ease(clamp(u / 0.6, 0, 1)));
  }

  /* ---------- fit what the card draws between the title and the legend ---------- */
  const BALL = [-1.04, 1.04, -1.04, 1.04];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const grow = ([x0, x1, y0, y1], l, r, b, t) => [x0 - l, x1 + r, y0 - b, y1 + t];
  const SIDE = {
    pentad: () => grow(BALL, 0.06, small() ? 0.06 : 0.14, 0.04, 0.06),
    ledger: () => grow(BALL, 0.06, small() ? 0.06 : 0.14, 0.04, 0.06),
    flip: (m) => {
      const outside = around([...range(5).map((i) => scale(GHOST_DIRS[i], 1.66)), ...EXTERIOR.coupled.map((c) => at(c.node, 1.5)), FLIP_FROM(), GHOST_MEET()]);
      const inside = [-0.6, 0.6, -0.6, 0.6];
      const g = ease(m.flip.gaze);
      return outside.map((x, i) => lerp(x, inside[i], g));
    },
    monad: () => grow(around(OBS.flatMap((o) => [add(OBS_AT[o], seen(OBS_R, 0)), add(OBS_AT[o], seen(-OBS_R, 0)), add(OBS_AT[o], seen(0, OBS_R)), add(OBS_AT[o], seen(0, -OBS_R))]), [0, 0, 0, 0]), 0.08, 0.08, 0.06, 0.1),
    lean: () => {
      const [x, y] = LEAN_SIDE();
      return [-1.06, Math.max(1.06, x + 0.42), Math.min(-1.06, y - 0.34), 1.06];
    }
  };
  /* the room of the title: while a card, a lens and a size last, a line that gets shorter gives none of it back */
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
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k](m)]),
      [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- drawing ---------- */
  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  /* the weights of the two lenses: the self-contained reading cyan, the classical contrast magenta */
  const weight = () => (state.lens ? { own: 0.5, ext: 1 } : { own: 1, ext: 0.75 });
  /** The ball of a carrier: the far half as an opaque bowl seen from inside, a faint glass in front. */
  function drawBall(key, c, r, a, inside = 0) {
    if (a < 0.01) return;
    const D = sc.facing(),
      far = scale(D, -1),
      e1 = unit(abs(far[2]) < 0.9 ? [far[1], -far[0], 0] : [1, 0, 0]),
      e2 = [far[1] * e1[2] - far[2] * e1[1], far[2] * e1[0] - far[0] * e1[2], far[0] * e1[1] - far[1] * e1[0]];
    const point = (u, v) => add(scale(far, cs(u)), add(scale(e1, sn(u) * cs(v)), scale(e2, sn(u) * sn(v))));
    const solid = a > 0.99;
    sc.surface(key + (solid ? '' : '~'), (u, v) => add(c, scale(point(u, v), r * 0.992)), {
      u: [0, PI / 2 + 0.02],
      v: [0, TAU],
      nu: 22,
      nv: 64,
      colors: [P.stage, P.violet],
      range: [0, 1],
      value: (u, v) => 0.16 + 0.22 * (1 + point(u, v)[2]) / 2 + 0.06 * inside,
      alpha: solid ? 1 : a,
      pick: false,
      occlude: false
    });
    sc.glass(key + '-glass', c, r, { color: P.violet, alpha: 0.035 * a * (1 - inside), rim: 0.55 * a * (1 - 0.7 * inside) });
    sc.circle(c, [0, 0, 1], r * 1.002, { color: P.violet, width: 1.2, alpha: 0.6 * a * (1 - inside), back: 0.25 });
  }
  const bead = (key, p, color, r, alpha = 1) => alpha > 0.01 && sc.bead(p, { color, r, alpha, key });
  /** The latent stars of a carrier: every node of 𝒮 that is not in K₀. */
  function drawStars(st, a, g = 0, skip = null) {
    const big = lerp(2.6, 4.4, g);
    CARRIER.forEach((t, i) => {
      const name = NAME_OF.get(keyOf(t));
      if (name && st.V.includes(name)) return;
      if (skip && skip(t, name)) return;
      bead('star' + i, latentPos(t, g), P.violet, big, a);
    });
  }
  /** The core K₀: cyan nodes and edges; pairs of K₀ that are not edges yet are the second-order candidates. */
  function drawCore(prefix, st, a, g = 0) {
    const { own } = weight();
    for (const [u, v] of st.E) tube(`${prefix}e-${pairKey([u, v])}`, edgePath(u, v, st, g), P.cyan, 0.016, a * own);
    for (let i = 0; i < st.V.length; i++)
      for (let j = i + 1; j < st.V.length; j++) {
        const [u, v] = [st.V[i], st.V[j]];
        if (!st.E.some((e) => pairKey(e) === pairKey([u, v]))) sc.line(edgePath(u, v, st, g), { color: P.violet, width: 1.1, dash: [3, 4], alpha: 0.75 * a });
      }
    for (const n of st.V) bead(`${prefix}n-${n}`, nodePos(n, st, g), P.cyan, n === 'o' ? 5.2 : 4.6, a * own);
  }
  /** A tautology at a node or an edge: a magenta ring and a bead that goes round it once; the core does not change. */
  function drawLoop(key, p, phase, a, normal) {
    if (a < 0.01) return;
    const n = normal || unit(p),
      e1 = unit(abs(n[2]) < 0.9 ? [n[1], -n[0], 0] : [1, 0, 0]),
      e2 = [n[1] * e1[2] - n[2] * e1[1], n[2] * e1[0] - n[0] * e1[2], n[0] * e1[1] - n[1] * e1[0]];
    const R = 0.075,
      ring = sample(40, (u) => add(p, add(scale(e1, R * cs(TAU * u)), scale(e2, R * sn(TAU * u)))));
    sc.line(ring, { color: P.magenta, width: 2, alpha: a });
    const q = add(p, add(scale(e1, R * cs(TAU * phase)), scale(e2, R * sn(TAU * phase))));
    bead(key, q, P.magenta, 4.2, a);
    const ahead = add(p, add(scale(e1, R * cs(TAU * phase + 0.5)), scale(e2, R * sn(TAU * phase + 0.5))));
    sc.line([q, ahead], { color: P.magenta, width: 2.4, alpha: a });
  }
  /** The classical contrast: a port cut into the ball, input arrows in and waste heat out. */
  function drawPort(a, c = [0, 0, 0], r = 1) {
    if (!state.lens || a < 0.01) return;
    const { ext } = weight(),
      d = unit(seen(1, 0.18, 0.25)),
      port = add(c, scale(d, r));
    sc.ring(port, { color: P.magenta, r: 13, normal: d, alpha: a * ext, key: 'port' });
    for (const k of [-1, 0, 1]) {
      const s = add(c, add(scale(d, r + 0.62), seen(0, 0.16 * k)));
      sc.arrow(s, add(c, add(scale(d, r + 0.08), seen(0, 0.05 * k))), { color: P.magenta, width: 1.8, headSize: 8, alpha: a * ext });
    }
    const out = unit(seen(-0.4, -1, 0.2));
    for (const k of [0, 1]) sc.arrow(add(c, add(scale(out, r + 0.04), seen(0.14 * k, 0))), add(c, add(scale(out, r + 0.48), seen(0.24 * k, 0))), { color: P.magenta, width: 1.4, headSize: 7, dash: [4, 4], alpha: 0.85 * a * ext });
  }
  /** Readings of a ledger, drawn: pentad and ledger share it. */
  function drawLedger(m, a, scene) {
    if (a < 0.01) return;
    const { own } = weight(),
      M = m[scene],
      st = M.now,
      next = M.next;
    drawBall('ball', [0, 0, 0], 1, a);
    // a sprout in flight: its node is carried along the capture arc; its edge grows behind it
    const flying = next && M.f > 0 && next.kind === 'sprout' ? next.step.node : null;
    drawStars(st, a, 0, (t, name) => name === flying && M.f >= 0.5);
    drawCore(scene, st, a);
    if (next && M.f > 0) {
      if (next.kind === 'sprout') {
        const arcPts = sample(30, (u) => capture(next, st, u));
        sc.line(arcPts, { color: P.cyan, width: 1.4, dash: [4, 4], alpha: 0.85 * a * own });
        if (M.f >= 0.5) {
          const u = ease((M.f - 0.5) / 0.5);
          tube(`${scene}-grow`, sample(18, (s) => mix(nodePos(next.step.from, st), capture(next, st, u), s)), P.cyan, 0.012, a * own);
          bead(`${scene}-fly`, capture(next, st, u), P.violet, 4, a);
        }
        if (scene === 'ledger') drawResidual(next, a);
      } else if (next.kind === 'chord') {
        const path = edgePath(next.step.edge[0], next.step.edge[1], next);
        tube(`${scene}-chord`, path.slice(0, Math.max(2, Math.round(path.length * ease(M.f)))), P.cyan, 0.016, a * own);
      } else {
        const p = next.step.at ? nodePos(next.step.at, st) : edgeMid(next.step.edge[0], next.step.edge[1], st);
        drawLoop(`${scene}-taut`, p, ease(M.f), a);
      }
    }
    // the last reading, when it was a tautology, keeps its ring; the idle switch spins one more turn
    if (!M.f && st.kind === 'taut') drawLoop(`${scene}-taut`, restOf(st, MAIN[Math.max(0, M.k - 1)]), 1, 0.85 * a);
    if (m.idle && scene === 'pentad') drawLoop('idle', restOf(st, MAIN[Math.max(0, M.k - 1)]), m.spin, a);
    if (scene === 'ledger') drawBasis(st, a);
    // the closure of the last chord names a node: a cyan ring on it
    if (!M.f && st.closure && st.kind === 'chord') {
      const d = st.closure[3],
        t = TUPLE[d];
      if (t) sc.ring(st.V.includes(d) ? nodePos(d, st) : latentPos(t), { color: P.cyan, r: 9, alpha: a * own, key: `${scene}-named` });
    }
    drawPort(a);
  }
  /** The orthogonal basis u_j of K₀: cyan needles from the centre. */
  function drawBasis(st, a) {
    const { own } = weight();
    st.basis.forEach((u, j) => {
      const d = dir(vecNum(u));
      sc.arrow(scale(d, 0.04), scale(d, R_CORE + 0.2), { color: P.cyan, width: 2, headSize: 8, alpha: 0.9 * a * own });
    });
  }
  /** The residual x⊥ of the candidate of a sprout: a dashed cyan needle. */
  function drawResidual(next, a) {
    const { own } = weight(),
      r = next.residual;
    if (!r || r.every(isZero)) return;
    const d = dir(vecNum(r));
    sc.line([scale(d, 0.04), scale(d, R_LAT - 0.08)], { color: P.cyan, width: 1.6, dash: [5, 4], alpha: a * own });
  }
  function drawFlip(m, a) {
    if (a < 0.01) return;
    const { own, ext } = weight(),
      F = m.flip,
      g = ease(F.gaze),
      st = F.state;
    drawBall('ball', [0, 0, 0], lerp(1, 1.0, g), a, g);
    drawStars(st, a, g);
    drawCore('flip', st, a, g);
    // the first step: coupled modes outside fold back onto their nodes
    EXTERIOR.coupled.forEach((c, i) => {
      const u = F.absorb;
      if (u >= 1) return;
      const p = coupledPos(c, u);
      sc.line([at(c.node, 1.5), at(c.node, R_LAT + 0.04)], { color: P.magenta, width: 1, dash: [3, 4], alpha: 0.5 * a * ext * (1 - u) });
      bead('cpl' + i, p, P.magenta, 4.4, a * ext);
    });
    // the second step: the ghosts meet in one fibre of readout zero, and that fibre is dropped
    const q = F.quotient;
    if (q < 1)
      GHOSTS.forEach((_, i) => {
        const fade = q < 0.6 ? 1 : 1 - (q - 0.6) / 0.4;
        bead('ghost' + i, ghostPos(i, q), P.magenta, lerp(3.6, 6.2, clamp(q / 0.6, 0, 1)), 0.75 * a * ext * fade);
        if (q < 0.6) sc.line([scale(GHOST_DIRS[i], 1.62), GHOST_MEET()], { color: P.magenta, width: 0.9, dash: [2, 5], alpha: 0.35 * a * ext });
      });
    // the classical contrast: a container round the observer, the boundary of an outer world (MODEL)
    if (state.lens) sc.circle([0, 0, 0], cam.D, lerp(1.12, 0.58, g), { color: P.magenta, width: 1.6, dash: [6, 5], alpha: a * ext, fade: false });
  }
  function drawMonad(m, a) {
    if (a < 0.01) return;
    const { own, ext } = weight(),
      M = m.monad;
    for (const o of OBS) {
      const st = M.at[o],
        focus = o === M.focus;
      drawBall('obs' + o, OBS_AT[o], OBS_R, a);
      CARRIER.forEach((t, i) => {
        const name = NAME_OF.get(keyOf(t));
        if (name && st.V.includes(name)) return;
        if (i % 2 && !focus) return;
        bead(`o${o}s${i}`, add(OBS_AT[o], scale(dir(t), OBS_R * 0.8)), P.violet, 2, a);
      });
      if (o === 'C' && !st.V.includes('p')) bead('oCp', obsPos('C', 'p', st), P.violet, 2.6, a);
      for (const [u, v] of st.E) tube(`o${o}e-${pairKey([u, v])}`, [obsPos(o, u, st), obsPos(o, v, st)], P.cyan, 0.011, a * own * (focus ? 1 : 0.8));
      for (const n of st.V) bead(`o${o}n-${n}`, obsPos(o, n, st), P.cyan, n === 'p' ? 3.4 : 3.8, a * own);
      // the span map ι from the shared atlas into this observer: dashed, through no corridor
      sc.line([add(trunkPos('o'), [0, 0, 0]), add(OBS_AT[o], scale(unit(sub(TRUNK_AT, OBS_AT[o])), OBS_R * 1.02))], { color: P.cyan, width: 1.1, dash: [4, 5], alpha: 0.6 * a * own });
    }
    // the shared atlas 𝒞 as a tetrahedron; its trunk lights up as all three observers hold it
    const T = M.trunk;
    for (let i = 0; i < SHARED.length; i++)
      for (let j = i + 1; j < SHARED.length; j++) {
        const e = [SHARED[i], SHARED[j]],
          held = T.edges.some((x) => pairKey(x) === pairKey(e));
        if (held) tube('tr' + pairKey(e), [trunkPos(e[0]), trunkPos(e[1])], P.cyan, 0.016, a * own);
        else sc.line([trunkPos(e[0]), trunkPos(e[1])], { color: P.violet, width: 1, dash: [3, 4], alpha: 0.8 * a });
      }
    for (const n of SHARED) bead('trn' + n, trunkPos(n), T.nodes.includes(n) ? P.cyan : P.violet, T.nodes.includes(n) ? 5 : 3.2, a);
    if (state.lens) {
      // the classical contrast: corridors through a common environment between the observers
      for (const o of OBS) sc.line([add(OBS_AT[o], scale(unit(sub([0, 0, -0.5], OBS_AT[o])), OBS_R)), [0, 0, -0.5]], { color: P.magenta, width: 2, alpha: a * ext });
      sc.ring([0, 0, -0.5], { color: P.magenta, r: 14, normal: [0, 0, 1], alpha: a * ext, key: 'env' });
    }
  }
  function drawLean(m, a) {
    if (a < 0.01) return;
    const { own, ext } = weight(),
      Lm = m.lean,
      u = Lm.u,
      next = Lm.next;
    drawBall('ball', [0, 0, 0], 1, a);
    const inCore = (t) => u.core.some((v) => same(v, t));
    LEAN_HORIZON.forEach((t, i) => {
      const core = inCore(t),
        flying = next && Lm.f > 0 && !next.last.inCore && same(next.last.cand, t) && Lm.f >= 0.5;
      if (!flying) bead('lh' + i, at(t, core ? R_CORE : R_LAT), core ? P.cyan : P.violet, core ? 5 : 4, core ? a * own : a);
    });
    // the DAG: each edge ⟨last, anchor, candidate, d⟩ drawn from last to candidate, with d named by a dashed spur
    u.dag.forEach((e, i) => {
      tube('ldag' + i, arc(at(e[0], R_CORE), at(e[2], R_CORE), 18, R_CORE), P.cyan, 0.016, a * own);
      if (!same(e[3], e[2])) {
        sc.line([at(e[2], R_CORE), at(e[3], R_LAT)], { color: P.cyan, width: 1.2, dash: [4, 4], alpha: 0.9 * a * own });
        sc.ring(at(e[3], R_LAT), { color: P.cyan, r: 9, alpha: a * own, key: 'g120' });
      }
    });
    u.basis.forEach((b, j) => {
      const d = dir(vecNum(b));
      sc.arrow(scale(d, 0.04), scale(d, R_CORE + 0.2), { color: P.cyan, width: 2, headSize: 8, alpha: 0.9 * a * own });
    });
    if (next && Lm.f > 0 && next.last.inCore) drawLoop('lean-taut', at(next.last.cand, R_CORE), ease(Lm.f), a);
    if (!Lm.f && u.last && u.last.inCore) drawLoop('lean-taut', at(u.last.cand, R_CORE), 1, 0.85 * a);
    if (next && Lm.f >= 0.5 && !next.last.inCore) {
      const t = next.last.cand,
        p = mix(at(t, R_LAT), at(t, R_CORE), ease((Lm.f - 0.5) / 0.5));
      bead('lean-fly', p, P.violet, 4, a);
      tube('lean-grow', arc(at(next.last.edge[0], R_CORE), p, 12, norm(p)), P.cyan, 0.012, a * own);
    }
    // the contrast of the listing: Init Rat with == leaves decide stuck; the crystal of QRat stays empty of axioms
    const [x, y] = LEAN_SIDE(),
      crystal = seen(x, y, 0.4),
      r = 0.11,
      oct = { vertices: [[r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]].map((d) => add(crystal, d)), faces: [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]] };
    const ea = (state.lens ? 1 : 0.7) * a * ext;
    if (ea > 0.01) sc.poly(ea < 0.99 ? 'stuck~' : 'stuck', oct, { color: P.magenta, alpha: ea, edges: P.ink, pick: false, occlude: false });
    sc.line([seen(x - 0.32, y + 0.18, 0.4), crystal], { color: P.magenta, width: 1.4, dash: [4, 4], alpha: ea });
  }
  /** The stage: every scene by its weight, the amber cursor, the labels. */
  function drawStage(m) {
    const w = layers();
    cam = basis3(sc.cam.yaw, sc.cam.pitch);
    fit(w, m);
    sc.begin();
    drawLedger(m, w.pentad, 'pentad');
    drawLedger(m, w.ledger, 'ledger');
    drawFlip(m, w.flip);
    drawMonad(m, w.monad);
    drawLean(m, w.lean);
    const here = handleWorld(state.at[state.scene]);
    sc.bead(here, { color: P.amber, r: 6.4, key: 'current' });
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    tags(m);
    sc.end();
    const q = sc.p(here);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- words ---------- */
  const KIND = {
    genesis: ['创生', 'genesis'],
    sprout: ['树枝', 'sprout'],
    chord: ['弦边', 'chord'],
    taut: ['同义反复', 'tautology']
  };
  const SCENE_NAME = {
    pentad: [['无端口五元组', 'PORT-FREE PENTAD'], ['开环主体（MODEL）', 'OPEN-LOOP ACTOR (MODEL)']],
    ledger: [['有理时间账', 'RATIONAL TIME LEDGER'], ['外部时钟（MODEL）', 'EXTERNAL CLOCK (MODEL)']],
    flip: [['观察者即宇宙', 'OBSERVER ≡ UNIVERSE'], ['外部环境（MODEL）', 'EXTERNAL WORLD (MODEL)']],
    monad: [['单子共振跨度', 'MONAD RESONANT SPAN'], ['外部走廊（MODEL）', 'EXTERNAL CORRIDORS (MODEL)']],
    lean: [['ObserverUniverse', 'ObserverUniverse'], ['Init Rat 与 ==（对照）', 'Init Rat AND == (CONTRAST)']]
  };
  const LENS_NAME = [
    ['自包含观察者', 'SELF-CONTAINED'],
    ['开环对照（MODEL）', 'OPEN LOOP (MODEL)']
  ];
  const edgeText = ([u, v]) => `${u}–${v}`;
  const closureText = (c) => (c ? `[${c[0]}, ${c[1]}, ${c[2]}] = ${c[3]}` : '');
  /** What one reading of a ledger does, in a phrase. */
  function readingText(st, say = L) {
    if (st.kind === 'genesis') return say('创生：K₀ = {o}', 'genesis: K₀ = {o}');
    if (st.kind === 'sprout') return say(`树枝 ${st.step.node}：${closureText(st.closure)}`, `sprout ${st.step.node}: ${closureText(st.closure)}`);
    if (st.kind === 'chord') return say(`弦边 ${edgeText(st.step.edge)}：${closureText(st.closure)}`, `chord ${edgeText(st.step.edge)}: ${closureText(st.closure)}`);
    if (st.step.at) return say(`同义反复 ${closureText(st.closure)}`, `tautology ${closureText(st.closure)}`);
    return say(`重读旧边 ${edgeText(st.step.edge)}`, `re-reading the edge ${edgeText(st.step.edge)}`);
  }
  const deltaText = (st) => `ΔI = ${fstr(st.dI)} · Δb₁ = ${inc(whole(st.dB))} · Δτ = ${inc(st.dTau)}`;
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read this one value. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'flip': {
        const t = m.flip.t;
        return t <= 0 ? 'audit' : t < 1 ? 'absorb' : t < 2 ? 'quotient' : t < 3 ? 'turning' : 'gaze';
      }
      case 'monad':
        return m.monad.f > 0 ? 'moving' : m.monad.k >= N_MONAD ? 'trunk' : 'step';
      case 'lean':
        return m.lean.f > 0 ? 'moving' : 'u' + m.lean.k;
      default: {
        const M = mainOf(m);
        return M.f > 0 ? 'moving' : M.now.kind;
      }
    }
  }
  function subline(m) {
    const s = state.scene,
      tiny = compact();
    if (s === 'pentad' || s === 'ledger') {
      const M = mainOf(m),
        st = M.now;
      if (state.lens)
        return L(
          `对照（MODEL）：外部时钟数到第 ${M.k} 拍，同义反复也算一拍；τ = ${fstr(st.tau)} 只数新结构。`,
          `Contrast (MODEL): an external clock counts ${M.k} reads, tautologies included; τ = ${fstr(st.tau)} counts new structure only.`
        );
      if (M.f > 0) {
        const nx = M.next;
        return L(`第 ${M.k + 1} 拍进行中：${readingText(nx)}。`, `Reading ${M.k + 1} under way: ${readingText(nx)}.`);
      }
      if (s === 'pentad' && m.idle)
        return L(`同义反复空转 ${m.replays} 圈：[x, x, x] = x，相位转动，ΔI = 0，Δb₁ = 0，Δτ = 0。`, `Idling on tautologies, ${m.replays} turns: [x, x, x] = x, the phase turns, ΔI = 0, Δb₁ = 0, Δτ = 0.`);
      if (tiny) return `${readingText(st)} · ${deltaText(st)}`;
      if (s === 'ledger')
        return L(
          `${readingText(st)}。${deltaText(st)}；|V| = ${st.V.length}，|E| = ${st.E.length}，c = ${st.c}，b₁ = ${st.b1}；正交基 ${st.basis.length} 个。`,
          `${readingText(st)}. ${deltaText(st)}; |V| = ${st.V.length}, |E| = ${st.E.length}, c = ${st.c}, b₁ = ${st.b1}; ${st.basis.length} basis vectors.`
        );
      return L(
        `${readingText(st)}。${deltaText(st)}；K₀ 有 ${st.V.length} 个节点、${st.E.length} 条边，ℋ½ 还有 ${st.latent} 个潜伏节点。`,
        `${readingText(st)}. ${deltaText(st)}; K₀ holds ${st.V.length} nodes and ${st.E.length} edges, ℋ½ still ${st.latent} latent nodes.`
      );
    }
    if (s === 'flip') {
      const F = m.flip,
        r = regimeOf(m);
      if (state.lens) return L(`对照（MODEL）：把 ${COUPLED.length} 个耦合模态与 ${GHOSTS.length} 个幽灵当作外部世界；它们的读数与本页相同。`, `Contrast (MODEL): the ${COUPLED.length} coupled modes and ${GHOSTS.length} ghosts taken as an external world; their readouts are the same.`);
      if (r === 'audit' || r === 'absorb') return L(`第一步：${COUPLED.length} 个耦合模态各是 𝒮 中节点的整数倍，读数相同，折回 𝒮；|𝒮| = ${F.carrier} 不变。`, `Step one: each of the ${COUPLED.length} coupled modes is a multiple of a node of 𝒮 with its readout; they fold back, |𝒮| = ${F.carrier} stays.`);
      if (r === 'quotient') return L(`第二步：${GHOSTS.length} 个幽灵对 𝒮 的读数全是 0，落在同一根纤维上；商掉它，ℰ⊥ = ∅。`, `Step two: the ${GHOSTS.length} ghosts read 0 on all of 𝒮 and share one fibre; the quotient drops it, ℰ⊥ = ∅.`);
      return L(
        `第三步：镜头进入 K₀，${F.shares.n} 个潜伏节点环绕四周成为星空；平均可见份额 ${both(F.shares.visible)}。`,
        `Step three: the camera enters K₀ and ${F.shares.n} latent nodes surround it as a sky; mean visible share ${both(F.shares.visible)}.`
      );
    }
    if (s === 'monad') {
      const M = m.monad,
        T = M.trunk,
        taus = OBS.map((o) => `τ<sub>${o}</sub> = ${fstr(M.at[o].tau)}`).join(L('，', ', '));
      if (state.lens) return L('对照（MODEL）：三个观察者经外部走廊交换信号；本页的跨度 ι 不经任何走廊。', 'Contrast (MODEL): three observers exchange signals through corridors; the span maps ι of the page use none.');
      return tiny
        ? L(`${taus}；主干 ${T.nodes.length} 点 ${T.edges.length} 边。`, `${taus}; trunk ${T.nodes.length} nodes, ${T.edges.length} edges.`)
        : L(`第 ${M.k} 拍：${taus}；公共主干 ⋂ ι⁻¹(K₀) 有 ${T.nodes.length} 个节点、${T.edges.length} 条边。`, `Step ${M.k}: ${taus}; the common trunk ⋂ ι⁻¹(K₀) holds ${T.nodes.length} nodes and ${T.edges.length} edges.`);
    }
    const Lm = m.lean,
      u = Lm.u;
    if (state.lens) return L(`对照：同一断言改用 Init 的 Rat 与 ==，decide 归约卡住，#print axioms 列出 ${LEAN_RUN.rat.axioms.length} 项。`, `Contrast: with Init Rat and ==, decide gets stuck and #print axioms lists ${LEAN_RUN.rat.axioms.length} entries.`);
    if (Lm.f > 0) return L(`u${Lm.k} → u${Lm.k + 1}：cursor = ${Lm.k}，读 ${tuple(LEAN[Lm.k + 1].last.cand)}。`, `u${Lm.k} → u${Lm.k + 1}: cursor = ${Lm.k}, reading ${tuple(LEAN[Lm.k + 1].last.cand)}.`);
    if (!u.last) return L(`u0：seed = ${tuple(LEAN_HORIZON[0])}，τ = 0，|DAG| = 0，|orthoBasis| = 1。`, `u0: seed = ${tuple(LEAN_HORIZON[0])}, τ = 0, |DAG| = 0, |orthoBasis| = 1.`);
    const s0 = u.last;
    return L(
      `u${Lm.k}：cand = ${tuple(s0.cand)}，Δ_geom = ${fstr(s0.dGeom)}，Δ_topo = ${fstr(s0.dTopo)}，τ = ${fstr(u.tau)}，|DAG| = ${u.dag.length}，|orthoBasis| = ${u.basis.length}。`,
      `u${Lm.k}: cand = ${tuple(s0.cand)}, Δ_geom = ${fstr(s0.dGeom)}, Δ_topo = ${fstr(s0.dTopo)}, τ = ${fstr(u.tau)}, |DAG| = ${u.dag.length}, |orthoBasis| = ${u.basis.length}.`
    );
  }
  function bigline(m) {
    const s = state.scene;
    const key = {
      pentad: () => `τ = ${fstr(m.pentad.now.tau)}`,
      ledger: () => `ΔI + Δb₁ = ${fstr(m.ledger.now.dTau)}`,
      flip: () => `|𝒰 \\ 𝔒| = ${m.flip.outside}`,
      monad: () => OBS.map((o) => fstr(m.monad.at[o].tau)).join(' · '),
      lean: () => `u${m.lean.k} · τ = ${fstr(m.lean.u.tau)}`
    };
    const flat = {
      pentad: () => `t<sub>ext</sub> = ${m.pentad.k}`,
      ledger: () => `t<sub>ext</sub> = ${m.ledger.k}`,
      flip: () => `ℰ = ${COUPLED.length + GHOSTS.length}`,
      monad: () => L('走廊 3', '3 corridors'),
      lean: () => `axioms ${LEAN_RUN.rat.axioms.length}`
    };
    return `${L(...SCENE_NAME[s][state.lens])} · <span class="nb">${(state.lens ? flat : key)[s]()}</span>`;
  }
  function legendItems(m) {
    const items = [];
    switch (state.scene) {
      case 'flip':
        items.push(['vi', L('ℋ½ 潜伏节点', 'ℋ½ latent nodes')], ['cy', 'K₀'], ...(m.flip.outside || state.lens ? [['mg', L('耦合模态 · 幽灵 ℰ⊥', 'coupled modes · ghosts ℰ⊥')]] : []), ['am', L('视点', 'viewpoint')]);
        break;
      case 'monad':
        items.push(['vi', '𝒮<sub>A</sub>, 𝒮<sub>B</sub>, 𝒮<sub>C</sub>'], ['cy', L('K₀ · 公共主干', 'K₀ · trunk')], ...(state.lens ? [['mg', L('外部走廊', 'corridors')]] : []), ['am', L(`${m.monad.focus} 的游标`, `cursor of ${m.monad.focus}`)]);
        break;
      case 'lean':
        items.push(['vi', 'internalHorizon'], ['cy', 'core · DAG · basis'], ['mg', 'Init Rat · decide'], ['am', 'cursor']);
        break;
      default: {
        const M = mainOf(m);
        items.push(['vi', L('𝒮 · 潜伏 ℋ½', '𝒮 · latent ℋ½')], ['cy', state.scene === 'ledger' ? L('K₀ · 正交基 u<sub>j</sub>', 'K₀ · basis u<sub>j</sub>') : L('结构核 K₀', 'core K₀')]);
        if (state.lens || (M.f > 0 ? M.next && M.next.kind === 'taut' : M.now.kind === 'taut') || (state.scene === 'pentad' && m.idle)) items.push(['mg', state.lens ? L('端口 · 废热', 'port · heat') : '[x, x, x] = x']);
        items.push(['am', L('游标 1 ↦ 0′', 'cursor 1 ↦ 0′')]);
      }
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const s = state.scene,
      r = regimeOf(m),
      pair = (zh, en) => [zh, en];
    if (state.lens) {
      const lens = {
        pentad: pair('对照（MODEL）：品红箭头从外部穿过端口进出。', 'Contrast (MODEL): magenta arrows pass a port in and out.'),
        ledger: pair('对照（MODEL）：外部时钟每读一拍都走，τ 不走。', 'Contrast (MODEL): an external clock ticks on every read; τ does not.'),
        flip: pair('对照（MODEL）：品红点当作外部世界，读数不变。', 'Contrast (MODEL): the magenta points as an outer world.'),
        monad: pair('对照（MODEL）：品红走廊连起三个观察者。', 'Contrast (MODEL): magenta corridors join the observers.'),
        lean: pair('对照：Init Rat 与 == 让 decide 卡住，4 项公理。', 'Contrast: Init Rat and == leave decide stuck, 4 axioms.')
      }[s];
      return { long: lens, fig: lens };
    }
    if (s === 'pentad' || s === 'ledger') {
      const M = mainOf(m),
        st = M.now;
      if (r === 'moving') {
        const nx = M.next;
        const what = nx.kind === 'sprout' ? pair(`琥珀游标把紫星 ${nx.step.node} 沿弧拉进青色核。`, `The amber cursor pulls the violet star ${nx.step.node} into the cyan core.`) : nx.kind === 'chord' ? pair(`青色弦边 ${edgeText(nx.step.edge)} 正在合拢一个环。`, `The cyan chord ${edgeText(nx.step.edge)} is closing a cycle.`) : pair('品红小环转一圈：同义反复，核不变。', 'A magenta ring turns once: a tautology; the core stays.');
        return { long: what, fig: what };
      }
      if (s === 'pentad' && m.idle) {
        const idle = pair(`品红小环空转 ${m.replays} 圈，τ = ${fstr(st.tau)} 不动。`, `The magenta ring idles, ${m.replays} turns; τ = ${fstr(st.tau)} stays.`);
        return { long: idle, fig: idle };
      }
      if (s === 'ledger') {
        const fig = st.kind === 'chord' ? pair(`弦边 ${edgeText(st.step.edge)} 合拢一个环：Δb₁ = +1，ΔI = 0。`, `The chord ${edgeText(st.step.edge)} closes a cycle: Δb₁ = +1, ΔI = 0.`) : st.kind === 'sprout' ? pair(`树枝 ${st.step.node}：ΔI = ${fstr(st.dI)}，Δb₁ = 0。`, `Sprout ${st.step.node}: ΔI = ${fstr(st.dI)}, Δb₁ = 0.`) : st.kind === 'taut' ? pair('同义反复：ΔI = 0，Δb₁ = 0，Δτ = 0。', 'Tautology: ΔI = 0, Δb₁ = 0, Δτ = 0.') : pair('创生：K₀ = {o}，τ = 0。', 'Genesis: K₀ = {o}, τ = 0.');
        return {
          long: pair(
            `青色针是 K₀ 的正交基 uⱼ（${st.basis.length} 根），虚线针是候选的 x⊥；紫色虚线是还没结晶的关系对。${fig[0]}拖琥珀游标逐拍走。`,
            `The cyan needles are the orthogonal basis uⱼ of K₀ (${st.basis.length}), the dashed needle the residual x⊥ of a candidate; violet dashes are pairs not yet crystallized. ${fig[1]} Drag the amber cursor reading by reading.`
          ),
          fig
        };
      }
      const fig = r === 'genesis' ? pair('创生：紫球里只有青色种子 o，τ = 0。', 'Genesis: only the cyan seed o, τ = 0.') : pair(`第 ${M.k} 拍后 τ = ${fstr(st.tau)}；核有 ${st.V.length} 点 ${st.E.length} 边。`, `After reading ${M.k}, τ = ${fstr(st.tau)}; the core has ${st.V.length} nodes, ${st.E.length} edges.`);
      return {
        long: pair(
          `紫色玻璃球是可接收全集 𝒮（没有边界），球里的紫星是潜伏视界 ℋ½，中心的青色图是结构核 K₀。${fig[0]}琥珀游标把星点拉进核；品红小环是同义反复，τ 不动。`,
          `The violet glass ball is the receivable carrier 𝒮 (no boundary), its violet stars the latent horizon ℋ½, the cyan graph at the centre the core K₀. ${fig[1]} The amber cursor pulls stars into the core; a magenta ring is a tautology and leaves τ.`
        ),
        fig
      };
    }
    if (s === 'flip') {
      const fig = {
        audit: pair('外部审计：品红点在球外，紫星在球里。', 'Outside audit: magenta points outside, violet stars inside.'),
        absorb: pair('品红耦合模态沿虚线折回各自的紫星。', 'The magenta coupled modes fold back onto their stars.'),
        quotient: pair('品红幽灵汇成一点后消失：ℰ⊥ = ∅。', 'The magenta ghosts meet in one point and vanish.'),
        turning: pair('镜头进入青色核，紫星退向四周。', 'The camera enters the cyan core; the stars recede.'),
        gaze: pair('核内视角：紫色星空环绕青色核。', 'Inside the core: a violet sky surrounds the cyan core.')
      }[r];
      return {
        long: pair(
          `${fig[0]}琥珀点是镜头的位置：从球外推进到核心。三步之后 |𝒰 \\ 𝔒| = 0，四周的星空就是自己的 ℋ½。`,
          `${fig[1]} The amber point is the camera, moving from outside into the core. After three steps |𝒰 \\ 𝔒| = 0 and the sky around is its own ℋ½.`
        ),
        fig
      };
    }
    if (s === 'monad') {
      const M = m.monad,
        T = M.trunk;
      const fig = r === 'trunk' ? pair('三个观察者顺序不同，青色主干同为 4 点 6 边。', 'Three orders, one cyan trunk of 4 nodes and 6 edges.') : pair(`第 ${M.k} 拍：青色主干 ${T.nodes.length} 点 ${T.edges.length} 边。`, `Step ${M.k}: the cyan trunk has ${T.nodes.length} nodes, ${T.edges.length} edges.`);
      return {
        long: pair(
          `三个紫球是三个没有外部走廊的观察者，各按自己的顺序结晶；虚线 ι 把中间的共享图谱 𝒞 嵌进每个球。${fig[0]}琥珀游标属于 ${M.focus}。`,
          `The three violet balls are observers with no corridor, each crystallizing in its own order; the dashed maps ι embed the shared atlas 𝒞 in each. ${fig[1]} The amber cursor belongs to ${M.focus}.`
        ),
        fig
      };
    }
    const Lm = m.lean;
    const fig =
      r === 'moving'
        ? pair(`u${Lm.k} → u${Lm.k + 1}：琥珀游标读下一个候选。`, `u${Lm.k} → u${Lm.k + 1}: the cursor reads the next candidate.`)
        : [
            pair('u0：只有种子 (1, 0, 0, 0)，τ = 0。', 'u0: the seed (1, 0, 0, 0) alone, τ = 0.'),
            pair('u1：重读种子，品红环转一圈，τ = 0。', 'u1: the seed read again, a magenta turn, τ = 0.'),
            pair('u2：(1, 1, 0, 0) 入核，τ = 3/4。', 'u2: (1, 1, 0, 0) enters the core, τ = 3/4.'),
            pair('u3：(1, 0, 1, 0) 入核，DAG 指向 (1, 1, 1, 1)，τ = 3/2。', 'u3: (1, 0, 1, 0) enters; the DAG names (1, 1, 1, 1); τ = 3/2.')
          ][Lm.k];
    return {
      long: pair(
        `三个节点是 ObserverUniverse 的 internalHorizon；青色是 coreVertices、atlasDAG 与 orthoBasis。${fig[0]}品红晶体是 Init Rat 的对照。`,
        `The three nodes are the internalHorizon of ObserverUniverse; cyan are coreVertices, atlasDAG and orthoBasis. ${fig[1]} The magenta crystal is the Init Rat contrast.`
      ),
      fig
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      tiny = small(),
      { R, U } = cam;
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'pentad' || s === 'ledger') {
      const M = mainOf(m),
        st = M.now;
      for (const n of st.V) N('n-' + n, off(nodePos(n, st), n === 'o' ? -16 : 14, n === 'o' ? 12 : -12), n, 'c-cy');
      if (!M.f && st.closure && !tiny) {
        const where = st.target.node ? nodePos(st.target.node, st) : edgeMid(st.target.edge[0], st.target.edge[1], st);
        N('closure', off(where, 0, -28), closureText(st.closure), st.kind === 'taut' ? 'c-mg' : 'c-cy');
      }
      if (M.next && M.f > 0 && M.next.kind === 'sprout') N('cand', off(at(TUPLE[M.next.step.node], R_LAT), 18, 14), M.next.step.node, 'c-vi');
      if (!M.f && st.kind === 'chord' && TUPLE[st.closure[3]] && !st.V.includes(st.closure[3])) N('named', off(latentPos(TUPLE[st.closure[3]]), 16, 14), st.closure[3], 'c-vi');
      if (!tiny) N('carrier', seen(0.78, 0.94, 0.2), state.lens ? L('𝒮 带端口（MODEL）', '𝒮 with a port (MODEL)') : '∂𝒮 = ∅', state.lens ? 'c-mg' : 'c-vi');
      if (s === 'ledger' && !tiny) st.basis.forEach((u, j) => N('u' + j, off(scale(dir(vecNum(u)), R_CORE + 0.26), 0, 0), `u<sub>${j + 1}</sub>`, 'c-cy'));
    }
    if (s === 'flip') {
      const F = m.flip,
        st = F.state,
        g = ease(F.gaze);
      for (const n of st.V) N('n-' + n, off(nodePos(n, st, g), n === 'o' ? -14 : 12, 12), n, 'c-cy');
      if (F.absorb < 1 && !tiny) N('cpl', off(at(EXTERIOR.coupled[3].node, 1.5), 0, 16), L('耦合模态', 'coupled modes'), 'c-mg');
      if (F.quotient < 1 && F.absorb >= 1) N('ghost', off(GHOST_MEET(), 0, -18), F.quotient < 0.6 ? 'ℰ⊥' : 'ℰ⊥ → ∅', 'c-mg');
      if (F.gaze > 0.5) N('sky', seen(0, 0.5, 0.2), state.lens ? L('外部宇宙（MODEL）', 'outer cosmos (MODEL)') : L('ℋ½：自己的星空', 'ℋ½: its own sky'), state.lens ? 'c-mg' : 'c-vi');
      if (!tiny && F.gaze < 0.5) N('carrier', seen(0.74, 0.94, 0.2), '𝒮', 'c-vi');
    }
    if (s === 'monad') {
      const M = m.monad;
      for (const o of OBS) N('obs' + o, add(OBS_AT[o], seen(0, -OBS_R - (tiny ? 0.12 : 0.14))), `𝔒<sub>${o}</sub> · τ = ${fstr(M.at[o].tau)}`, o === M.focus ? 'c-ik' : 'c-vi');
      N('trunk', off(TRUNK_AT, 0, tiny ? 34 : 40), tiny ? '𝒞' : `𝒞 · ${M.trunk.nodes.length}/${M.trunk.edges.length}`, 'c-cy');
    }
    if (s === 'lean') {
      const u = m.lean.u;
      LEAN_HORIZON.forEach((t, i) => {
        const core = u.core.some((v) => same(v, t));
        N('lh' + i, off(at(t, core ? R_CORE : R_LAT), 16, 14), tiny ? ['seed', 'h1', 'h2'][i] : tuple(t), core ? 'c-cy' : 'c-vi');
      });
      if (u.dag.length > 1) N('g120', off(at(u.dag[1][3], R_LAT), 18, -14), 'g120', 'c-cy');
      const [x, y] = LEAN_SIDE();
      N('stuck', seen(x, y - (tiny ? 0.22 : 0.26), 0.4), tiny ? 'Rat ✗' : L('Init Rat · decide 卡住', 'Init Rat · decide stuck'), 'c-mg');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d.]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*(?:\/\d+)?/g, '<span class="nb">$&</span>').replace(/‖/g, '<span class="nm">$&</span>');
  const ACTS = {
    pentad: ['⟲ 同义反复', '⟲ Tautology'],
    ledger: ['下一拍 ▸', 'Next reading ▸'],
    flip: ['⇄ 翻转视角', '⇄ Flip view'],
    monad: ['换观察者 ▸', 'Next observer ▸'],
    lean: ['下一步 ▸', 'Next step ▸']
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
    b.setAttribute('aria-pressed', String(state.scene === 'pentad' && state.idle));
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
    const place = (i, dx, dy, spot) => {
      list[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(spot);
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
          const spot = free(box, dx + sx, dy);
          if (spot) {
            best = { cost, dx: dx + sx, dy, spot };
            break;
          }
        }
      }
      if (best) place(i, best.dx, best.dy, best.spot);
      else list[i].hidden = true;
    }
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
        ctx.setLineDash(kind === 'dash' ? [4, 3] : kind === 'dot2' ? [1.5, 3] : []);
        ctx.beginPath();
        if (kind === 'dot') {
          ctx.arc(x + 7, y, 3.5, 0, TAU);
          ctx.fill();
        } else if (kind === 'bar') ctx.fillRect(x + 3, y - 4, 8, 8);
        else {
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
  /** The staircase of a list of τ values: a horizontal run on every step, a riser where τ grows. */
  const stairs = (taus) => taus.flatMap((q, k) => (k ? [[k, fval(taus[k - 1])], [k, fval(q)]] : [[0, fval(q)]]));
  function bar(g, x, y, lo, color, width, dx, alpha = 1) {
    const ctx = g.ctx,
      px = g.X(x) + dx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(px - width / 2, g.Y(y), width, g.Y(lo) - g.Y(y));
    ctx.restore();
  }
  /** What the two strips plot at a frame, as numbers: the suites read the same table. */
  function plotData(m) {
    const s = state.scene;
    if (s === 'monad') {
      const o = m.monad.focus;
      return { kind: 'monad', taus: MONAD[o].map((st) => st.tau), cursor: m.monad.t, kinds: MONAD[o].map((st) => st.kind), all: Object.fromEntries(OBS.map((x) => [x, MONAD[x].map((st) => st.tau)])), trunk: TRUNK.map((T) => [T.nodes.length, T.edges.length]) };
    }
    if (s === 'lean') return { kind: 'lean', taus: LEAN.map((u) => u.tau), cursor: m.lean.t, kinds: LEAN.map((u) => (!u.last ? 'genesis' : u.last.inCore ? 'taut' : 'sprout')), geom: LEAN.slice(1).map((u) => u.last.dGeom), topo: LEAN.slice(1).map((u) => u.last.dTopo), axioms: [LEAN_RUN.qrat.axioms.length, LEAN_RUN.rat.axioms.length] };
    if (s === 'flip') return { kind: 'flip', taus: MAIN.map((st) => st.tau), cursor: FLIP_AT, kinds: MAIN.map((st) => st.kind), t: m.flip.t, visible: FLIP_SHARES.visible, latent: FLIP_SHARES.latent, outside: COUPLED.length + GHOSTS.length };
    const M = mainOf(m);
    return { kind: 'main', taus: MAIN.map((st) => st.tau), cursor: M.t, kinds: MAIN.map((st) => st.kind), edges: MAIN.map((st) => st.E.length), pairs: MAIN.map((st) => st.pairs), latent: MAIN.map((st) => st.latent), basis: MAIN.map((st) => st.basis.length) };
  }
  /** The share of exterior points still outside at a value of the flip rail. */
  const outsideShare = (t) => {
    const total = COUPLED.length + GHOSTS.length;
    return (COUPLED.length * (1 - clamp(t, 0, 1)) + GHOSTS.length * (1 - clamp(t - 1, 0, 1))) / total;
  };
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const D = plotData(m);
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      const n = D.taus.length - 1;
      $('plotTitle').textContent = L('结构固有时 τ：同义反复处是平台', 'Structural time τ: tautologies are plateaus');
      $('plotMeta').textContent = D.kind === 'lean' ? 'Δ_topo = 1/4' : D.kind === 'monad' ? `τ(${m.monad.focus})` : 'ΔI + Δb₁';
      const items = [
        [P.cyan, D.kind === 'lean' ? 'τ = Σ (Δ_geom + Δ_topo)' : 'τ = Σ (ΔI + Δb₁)'],
        [P.magenta, L('同义反复 Δτ = 0', 'tautology Δτ = 0'), 'dot']
      ];
      const top = Math.max(...D.taus.map(fval));
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cv, { x: [-0.3, n + 0.3], y: [0, headroom(cv, PAD, rows.length, 0, top)], pad: PAD });
      const ticks = top > 3 ? [0, 1, 2, 3, 4] : [0, 0.5, 1, 1.5];
      g.axes({ xTicks: range(n + 1).filter((k) => n < 8 || k % (cv.clientWidth < 260 ? 3 : 1) === 0).map((k) => [k, D.kind === 'lean' ? `u${k}` : String(k)]), yTicks: ticks.map((v) => [v, fstr(ratio(v))]) });
      g.line(stairs(D.taus), P.cyan, { width: 2 });
      D.taus.forEach((q, k) => {
        const flat = k > 0 && D.kinds[k] === 'taut';
        g.dot(k, fval(q), flat ? P.magenta : P.cyan, flat ? 4 : 3);
      });
      const c = clamp(D.cursor, 0, n);
      g.line([[c, 0], [c, top * 1.02]], P.amber, { width: 1.4 });
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const narrow = cb.clientWidth < 260;
      if (D.kind === 'main') {
        $('plotTitleB').textContent = L('关系对涌现：C(|V|, 2) 与已结晶的边', 'Pairs emerge: C(|V|, 2) and crystallized edges');
        $('plotMetaB').textContent = `|𝒮| = ${CARRIER.length}`;
        const items = [
          [P.cyan, L('边 |E|', 'edges |E|')],
          [P.violet, 'C(|V|, 2)', 'dash'],
          [P.ink, L('正交基个数', 'basis size'), 'dot2']
        ];
        const n = D.edges.length - 1,
          hi = Math.max(...D.pairs);
        const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
        const g = kit.plot(cb, { x: [-0.3, n + 0.3], y: [0, headroom(cb, PAD, rows.length, 0, hi)], pad: PAD });
        g.axes({ xTicks: range(n + 1).filter((k) => !narrow || k % 3 === 0).map((k) => [k, String(k)]), yTicks: [0, 2, 4, 6].map((v) => [v, String(v)]) });
        g.line(D.pairs.map((v, k) => [k, v]), P.violet, { width: 1.6, dash: [4, 3] });
        g.line(D.edges.map((v, k) => [k, v]), P.cyan, { width: 2 });
        g.line(D.basis.map((v, k) => [k, v]), P.ink, { width: 1.2, dash: [1.5, 3] });
        D.edges.forEach((v, k) => g.dot(k, v, P.cyan, 2.6));
        const c = clamp(D.cursor, 0, n);
        g.line([[c, 0], [c, hi]], P.amber, { width: 1.4 });
        drawLegend(g, rows);
      } else if (D.kind === 'flip') {
        $('plotTitleB').textContent = L('商化：球外的点归零，可见与潜伏份额不变', 'Quotient: the outside empties, the shares stay');
        $('plotMetaB').textContent = `ℋ½ = ${FLIP_SHARES.n}`;
        const items = [
          [P.magenta, L('球外 |ℰ| 份额', 'outside share |ℰ|')],
          [P.cyan, L('平均可见份额', 'mean visible share')],
          [P.violet, L('平均潜伏份额', 'mean latent share'), 'dash']
        ];
        const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
        const g = kit.plot(cb, { x: [0, 3], y: [0, headroom(cb, PAD, rows.length, 0, 1)], pad: PAD });
        g.axes({ xTicks: [0, 1, 2, 3].map((k) => [k, String(k)]), yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
        g.line(sample(60, (u) => [3 * u, outsideShare(3 * u)]), P.magenta, { width: 2 });
        g.line([[0, fval(FLIP_SHARES.visible)], [3, fval(FLIP_SHARES.visible)]], P.cyan, { width: 2 });
        g.line([[0, fval(FLIP_SHARES.latent)], [3, fval(FLIP_SHARES.latent)]], P.violet, { width: 1.6, dash: [4, 3] });
        g.line([[D.t, 0], [D.t, 1]], P.amber, { width: 1.4 });
        drawLegend(g, rows);
      } else if (D.kind === 'monad') {
        $('plotTitleB').textContent = L('三个固有时与公共主干', 'Three proper times and the common trunk');
        $('plotMetaB').textContent = OBS.map((o) => fstr(D.all[o][N_MONAD])).join(' · ');
        const items = [
          ['A', ''],
          ['B', 'dash'],
          ['C', 'dot2']
        ].map(([o, kind]) => [o === m.monad.focus ? P.ink : P.violet, `τ(${o})`, kind]);
        items.push([P.cyan, L('主干的边', 'trunk edges'), 'bar'], [P.cyan, L('主干的点', 'trunk nodes'), 'dot']);
        const top = 6;
        const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
        const g = kit.plot(cb, { x: [-0.4, N_MONAD + 0.4], y: [0, headroom(cb, PAD, rows.length, 0, top)], pad: PAD });
        g.axes({ xTicks: range(N_MONAD + 1).map((k) => [k, String(k)]), yTicks: [0, 2, 4, 6].map((v) => [v, String(v)]) });
        const bw = Math.min(14, g.iw / 18);
        D.trunk.forEach(([, e], k) => bar(g, k, e, 0, P.cyan, bw, 0, 0.45));
        D.trunk.forEach(([n], k) => g.dot(k, n, P.cyan, 3.2));
        OBS.forEach((o, i) => g.line(stairs(D.all[o]), o === m.monad.focus ? P.ink : P.violet, { width: o === m.monad.focus ? 2.2 : 1.4, dash: [undefined, [5, 3], [1.5, 3]][i] }));
        const c = clamp(m.monad.t, 0, N_MONAD);
        g.line([[c, 0], [c, top]], P.amber, { width: 1.4 });
        drawLegend(g, rows);
      } else {
        $('plotTitleB').textContent = L('精确分数：Δ_geom、Δ_topo 与公理个数', 'Exact fractions: Δ_geom, Δ_topo and axioms');
        $('plotMetaB').textContent = `#print axioms ${D.axioms[0]} ↔ ${D.axioms[1]}`;
        const items = [
          [P.cyan, 'Δ_geom', 'bar'],
          [P.violet, 'Δ_topo', 'bar'],
          [P.magenta, L('Init Rat 公理', 'Init Rat axioms'), 'bar']
        ];
        const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12);
        const g = kit.plot(cb, { x: [0.4, 5.6], y: [0, headroom(cb, PAD, rows.length, 0, 1)], pad: PAD });
        g.axes({ xTicks: [[1, 'u1'], [2, 'u2'], [3, 'u3'], [4.8, narrow ? 'ax' : 'axioms']], yTicks: [[0, '0'], [0.25, '1/4'], [0.5, '1/2']] });
        const bw = Math.min(16, g.iw / 16);
        D.geom.forEach((q, k) => bar(g, k + 1, fval(q), 0, P.cyan, bw, -bw * 0.6));
        D.topo.forEach((q, k) => bar(g, k + 1, fval(q), 0, P.violet, bw, bw * 0.6));
        // the axioms on a scale of their own: four to the top of the data
        bar(g, 4.8, (D.axioms[1] / 4) * 0.5, 0, P.magenta, bw, bw * 0.6);
        g.line([[4.8 - 0.25, 0], [4.8 - 0.05, 0]], P.cyan, { width: 3 });
        g.text(4.8 + (0.6 * bw) / g.scale, (D.axioms[1] / 4) * 0.5, String(D.axioms[1]), P.magenta, { align: 'center', base: 'bottom', dy: -2 });
        g.text(4.8 - 0.15, 0, String(D.axioms[0]), P.cyan, { align: 'center', base: 'bottom', dy: -4 });
        const c = clamp(m.lean.t, 0, 3);
        if (c > 0.5) g.line([[c, 0], [c, 0.55]], P.amber, { width: 1.4 });
        drawLegend(g, rows);
      }
    }
  }

  /* ---------- readouts ---------- */
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html));
    const M = mainOf(m),
      st = M.now,
      F = m.flip,
      Mo = m.monad,
      Lm = m.lean;
    const keyText = {
      pentad: `τ = ${fstr(m.pentad.now.tau)} · b₁ = ${m.pentad.now.b1}`,
      ledger: `τ = ${fstr(m.ledger.now.tau)} · b₁ = ${m.ledger.now.b1}`,
      flip: `|𝒰 \\ 𝔒| = ${F.outside}`,
      monad: OBS.map((o) => fstr(Mo.at[o].tau)).join(' ↔ '),
      lean: `τ = ${fstr(Lm.u.tau)} · ∅`
    }[state.scene];
    put('roKey', keyText);
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roStep', `${L(...KIND[st.kind])}${st.k ? ' ' + st.k : ''} · ${fstr(st.dI)} · ${inc(whole(st.dB))} · ${inc(st.dTau)}`);
    put('roGraph', `${st.V.length} · ${st.E.length} · ${st.c} · ${st.b1}`);
    put('roHorizon', `${st.latent} · ${st.open} · ${CARRIER.length}`);
    put('roOutside', `${F.outsideCoupled} · ${F.outsideGhosts} · ${F.outside} · ${both(F.shares.visible)}`);
    put('roMonad', `${OBS.map((o) => fstr(Mo.at[o].tau)).join(' · ')} · ${Mo.trunk.nodes.length}/${Mo.trunk.edges.length}`);
    const ls = Lm.u.last;
    put('roLean', `u${Lm.k} · ${ls ? fstr(ls.dGeom) : '—'} · ${ls ? fstr(ls.dTopo) : '—'} · ${fstr(Lm.u.tau)} · ${Lm.u.dag.length} · ${Lm.u.basis.length}`);
    put('roNote', readNote(m));
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    put('keyPill', `τ <strong>${state.scene === 'lean' ? fstr(Lm.u.tau) : state.scene === 'monad' ? fstr(Mo.at[Mo.focus].tau) : fstr((state.scene === 'flip' ? MAIN[FLIP_AT] : st).tau)}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = { pentad: '𝔒 = (𝒮, [−, −, −], κ, K₀, Φ<sub>ε</sub>)', ledger: 'ΔI = ⟨x⊥, x⊥⟩/⟨x, x⟩ · b₁ = |E| − |V| + c', flip: '𝒰 \\ 𝔒 = ∅', monad: '𝔒<sub>A</sub> ← 𝒞 → 𝔒<sub>B</sub>', lean: 'crystallizeStep · decide' }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    $('idleBtn').setAttribute('aria-pressed', String(state.idle));
    obsChips.set(state.focus, true);
    proofChips.set(F.t % 1 === 0 && state.scene === 'flip' ? String(F.t) : null, true);
    uChips.set(Lm.f === 0 && state.scene === 'lean' ? String(Lm.k) : null, true);
    $('stepRange').value = String(M.k);
    put('stepOut', `${M.k}/${N_MAIN}`);
  }
  function readNote(m) {
    const s = state.scene;
    if (s === 'flip')
      return L(
        `${COUPLED.length} 个耦合模态各落在 𝒮 中一个节点的纤维上；${GHOSTS.length} 个幽灵的读数全为 0，同在一根纤维。`,
        `Each of the ${COUPLED.length} coupled modes lies in the fibre of one node of 𝒮; the ${GHOSTS.length} ghosts read 0 everywhere and share one fibre.`
      );
    if (s === 'monad')
      return L(
        `三条路的 b₁ 都是 3；ΣΔI 依次是 ${OBS.map((o) => fstr(minus(MONAD[o][N_MONAD].tau, whole(MONAD[o][N_MONAD].b1)))).join('、')}：顺序改变舒尔部分，不改变主干。`,
        `All three end with b₁ = 3; their ΣΔI are ${OBS.map((o) => fstr(minus(MONAD[o][N_MONAD].tau, whole(MONAD[o][N_MONAD].b1)))).join(', ')}: the order changes the Schur part, not the trunk.`
      );
    if (s === 'lean') return L(`Lean ${LEAN_RUN.version} 实测：QRat 版 decide 通过，公理 ∅；Init Rat 版 decide 卡住。`, `Measured in Lean ${LEAN_RUN.version}: the QRat version passes decide with no axiom; the Init Rat version gets stuck.`);
    return L(
      `τ 依次为 ${MAIN.map((st) => fstr(st.tau)).join('、')}；同义反复的三拍是平台。`,
      `τ runs ${MAIN.map((st) => fstr(st.tau)).join(', ')}; the three tautologies are plateaus.`
    );
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
    rate: RAILS.pentad.rate,
    step: 1,
    max: RAILS.pentad.max,
    t: STILL.pentad,
    format: (t) => {
      const v = settled(t),
        { k, f } = split(v);
      switch (state.scene) {
        case 'flip':
          return v >= 3 ? L('核内', 'inside') : [L('吸纳', 'absorb'), L('商化', 'quotient'), L('翻转', 'flip')][Math.min(2, k)];
        case 'monad':
          return f > 0 ? `${k} → ${k + 1}` : `${k}/${N_MONAD}`;
        case 'lean':
          return f > 0 ? `u${k} → u${k + 1}` : `u${k}`;
        default:
          return f > 0 ? `${k} → ${k + 1}` : `${k}/${N_MAIN}`;
      }
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
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
    const r = rail();
    clock.rate = r.rate;
    clock.step = r.step;
    $('now').step = 'any';
    const v = Math.min(state.at[state.scene], r.max);
    clock.setMax(r.max, true);
    clock.set(v, true);
    state.at[state.scene] = v;
  }
  /** A pointer comes to rest on a whole reading when it comes close to one; close is less than an arrow key moves. */
  function snap(v, close = clock.max / 222) {
    const k = Math.round(v);
    return abs(v - k) < close ? k : v;
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
  /** One step of the rail played forward, from the start again at the end. The card stays marked. */
  function nextStep() {
    stopBootPlay();
    clock.pause();
    const k = Math.round(state.at[state.scene]),
      end = rail().max;
    if (k >= end) clock.set(0);
    stopAt = (k >= end ? 0 : Math.floor(state.at[state.scene] + 1e-9)) + 1;
    clock.play();
  }
  /** The tautology switch: idle on [x, x, x] = x; every switch on turns the phase once more and counts it. */
  let spinning = null;
  function setIdle(on) {
    if (spinning) {
      spinning.cancel();
      spinning = null;
    }
    state.idle = on;
    if (!on) {
      state.spin = 0;
      paint();
      return;
    }
    state.replays += 1;
    state.spin = 0;
    const run = kit.tween(
      TRV.still ? 0 : 1100,
      (x) => {
        state.spin = x;
        paint();
      },
      () => {
        state.spin = 1;
        if (spinning === run) spinning = null;
        paint();
      }
    );
    if (state.spin < 1) spinning = run;
    paint();
  }
  const toggleIdle = () =>
    steer('pentad', () => {
      setIdle(!state.idle);
    });
  $('idleBtn').addEventListener('click', toggleIdle);
  kit.field($('stepRange'), {
    out: $('stepOut'),
    fmt: (v) => `${v}/${N_MAIN}`,
    onInput: (v) => steer(state.scene === 'ledger' ? 'ledger' : 'pentad', () => clock.set(Math.round(v)))
  });
  const proofChips = kit.chips($('proofChips'), 'proof', (v) => steer('flip', () => clock.set(Number(v))));
  const obsChips = kit.chips($('obsChips'), 'obs', (v) => steer('monad', () => (state.focus = v)));
  const uChips = kit.chips($('uChips'), 'u', (v) => steer('lean', () => clock.set(Number(v))));
  const nextObserver = () => steer('monad', () => (state.focus = OBS[(OBS.indexOf(state.focus) + 1) % OBS.length]));
  function flipView() {
    const now = state.at.flip;
    steer('flip', () => {});
    stopAt = now >= 3 - 1e-9 ? null : 3;
    if (now >= 3 - 1e-9) clock.set(2);
    else {
      clock.set(Math.max(2, Math.min(now, 2)));
      clock.play();
    }
  }
  $('stageAct').addEventListener('click', () => ({ pentad: toggleIdle, ledger: nextStep, flip: flipView, monad: nextObserver, lean: nextStep })[state.scene]());
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
    if (spinning) {
      spinning.cancel();
      spinning = null;
    }
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
    const n = 240;
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

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  function benchmarks() {
    // the projection identities on every node of 𝒮 for the core of every reading: P² = P, P(I − P) = 0, and ΔI ∈ [0, 1]
    let projBad = 0,
      projTried = 0;
    for (const st of MAIN)
      for (const t of CARRIER) {
        projTried++;
        const x = vecQ(t),
          r = projectOut(x, st.basis),
          px = subQ(x, r),
          again = subQ(px, projectOut(px, st.basis)),
          dI = schur(x, st.basis);
        const orth = st.basis.every((u) => isZero(dotQ(r, u)));
        const idem = px.every((q, i) => equal(q, again[i]));
        const pyth = equal(plus(dotQ(px, px), dotQ(r, r)), dotQ(x, x));
        if (!orth || !idem || !pyth || cmp(dI, ZERO) < 0 || cmp(dI, ONE) > 0) projBad++;
      }
    // the basis stays pairwise orthogonal, and over any order of the 27 other nodes the innovation is positive at most
    // dim − 1 = 3 times, and zero for good once the span is full
    const orders = [CARRIER.filter((t) => !same(t, NAMED.o)), [...CARRIER.filter((t) => !same(t, NAMED.o))].reverse()];
    const growth = orders.map((list) => {
      let basis = [vecQ(NAMED.o)],
        positive = 0,
        after = 0,
        full = false;
      for (const t of list) {
        const dI = schur(vecQ(t), basis);
        if (cmp(dI, ZERO) > 0) {
          positive++;
          if (full) after++;
          basis = [...basis, projectOut(vecQ(t), basis)];
        }
        if (basis.length === 4) full = true;
      }
      const pairwise = basis.every((u, i) => basis.every((v, j) => i === j || isZero(dotQ(u, v))));
      return { positive, after, pairwise };
    });
    // the six orders of the three sprouts a, b, g after o: ΣΔI and the final b₁
    const perms = [
      ['a', 'b', 'g'],
      ['a', 'g', 'b'],
      ['b', 'a', 'g'],
      ['b', 'g', 'a'],
      ['g', 'a', 'b'],
      ['g', 'b', 'a']
    ].map((order) => {
      const steps = [...order.map((n) => ({ kind: 'sprout', node: n, from: 'o' })), { kind: 'chord', edge: ['a', 'b'] }, { kind: 'chord', edge: ['a', 'g'] }, { kind: 'chord', edge: ['b', 'g'] }];
      const run = ledger(steps),
        end = run[run.length - 1];
      return { order: order.join(''), schur: minus(end.tau, whole(end.b1)), b1: end.b1 };
    });
    // Betti numbers: |E| − |V| + c against the number of chords outside a spanning forest, built greedily
    let bettiBad = 0;
    for (const st of [...MAIN, ...OBS.flatMap((o) => MONAD[o])]) {
      const parent = new Map(st.V.map((v) => [v, v])),
        find = (x) => (parent.get(x) === x ? x : find(parent.get(x)));
      let chords = 0;
      for (const [u, v] of st.E) {
        const [a, b] = [find(u), find(v)];
        if (a === b) chords++;
        else parent.set(a, b);
      }
      if (chords !== st.b1) bettiBad++;
    }
    // the closures of the readings, and the law [x, x, z] = z on all of 𝒮
    let lawBad = 0;
    for (const x of CARRIER) for (const z of CARRIER) if (!same(triad(x, x, z), z) || !same(triad(x, z, z), x)) lawBad++;
    const closures = MAIN.filter((st) => st.closure).map((st) => st.closure);
    // the readouts: overlap 1 only on the diagonal of 𝒮, coupled modes in the fibre of their node, ghosts in the fibre of 0
    let gramBad = 0;
    CARRIER.forEach((x, i) => CARRIER.forEach((y, j) => (equal(kappa(x, y), ONE) !== (i === j) ? gramBad++ : 0)));
    const coupledOk = EXTERIOR.coupled.filter((c) => c.fibre >= 0 && same(CARRIER[c.fibre], c.node)).length,
      ghostsZero = EXTERIOR.ghosts.filter((g) => g.zero && g.fibre === -1).length;
    const ghostsPairwise = GHOSTS.every((u, i) => GHOSTS.every((v, j) => i === j || !equal(kappa(u, v), ONE)));
    return {
      projTried,
      projBad,
      growth,
      perms,
      bettiBad,
      lawTried: CARRIER.length ** 2,
      lawBad,
      closures,
      gramBad,
      coupledOk,
      ghostsZero,
      ghostsPairwise,
      tauMain: MAIN.map((st) => st.tau),
      tauObs: Object.fromEntries(OBS.map((o) => [o, MONAD[o][N_MONAD].tau])),
      trunk: TRUNK[N_MONAD],
      lean: LEAN.map((u) => u.tau)
    };
  }
  const BENCH = benchmarks();
  const NUMBERS = {
    tauEnd: () => both(MAIN[N_MAIN].tau),
    b1End: () => `= ${MAIN[N_MAIN].b1}`,
    visible: () => both(FLIP_SHARES.visible),
    tauA: () => both(BENCH.tauObs.A),
    tauB: () => both(BENCH.tauObs.B),
    tauC: () => both(BENCH.tauObs.C),
    leanTau: () => both(LEAN[3].tau),
    axQ: () => String(LEAN_RUN.qrat.axioms.length),
    axR: () => String(LEAN_RUN.rat.axioms.length)
  };
  function numText(say) {
    const B = BENCH,
      list = (xs) => xs.join(say('、', ', ')),
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`),
      sums = list(B.perms.map((p) => `${p.order}${say('：', ': ')}${fstr(p.schur)}`)),
      grow = list(B.growth.map((g) => String(g.positive)));
    return say(
      `打开页面时由脚本用大整数分数现算，是上面各条定理的个别实例，不检验定理的前提。主观察者九拍的 τ 依次为 ${list(B.tauMain.map(fstr))}，终值 ${both(MAIN[N_MAIN].tau)}，b₁ = ${MAIN[N_MAIN].b1}。投影：${B.projTried} 次（十个核态 × 𝒮 的 ${CARRIER.length} 个节点）核对 x⊥ 与基正交、P² = P、勾股分解与 0 ≤ ΔI ≤ 1，${bad(B.projBad)}；按两种次序读完其余 27 个节点，ΔI > 0 依次出现 ${grow} 次，基满之后再无正增量，基两两正交。三根树枝的六种次序（随后三条弦边）：ΣΔI 依次 ${sums}，b₁ 都是 ${B.perms[0].b1}。贝蒂数 |E| − |V| + c 与生成森林外的弦数：${bad(B.bettiBad)}。三元律 [x, x, z] = z 与 [x, z, z] = x 在 ${B.lawTried} 对上${bad(B.lawBad)}；各拍闭合 ${list(B.closures.map(closureText))}。读出：𝒮 上 κ = 1 只在对角线上（${bad(B.gramBad)}），${COUPLED.length} 个耦合模态里 ${B.coupledOk} 个落在本节点的纤维，${GHOSTS.length} 个幽灵里 ${B.ghostsZero} 个读数全为 0、不在任何节点的纤维里；第五拍的核看 ℋ½ 的平均可见份额 ${both(FLIP_SHARES.visible)}。三个观察者：τ<sub>A</sub> = ${fstr(B.tauObs.A)}，τ<sub>B</sub> = ${fstr(B.tauObs.B)}，τ<sub>C</sub> = ${fstr(B.tauObs.C)}，公共主干 ${B.trunk.nodes.length} 个节点、${B.trunk.edges.length} 条边。ObserverUniverse：τ = ${list(B.lean.map(fstr))}。<br>Lean 实测（${LEAN_RUN.version}，零导入，本页不重算）：§38.13.4 的 observer_is_universe_verified 由 decide 证明，#print axioms 回答 does not depend on any axioms；同一断言改用 Init 的 Rat 与 ==，decide 无法归约而报错，#print axioms 列出 ${LEAN_RUN.rat.axioms.join(', ')}（sorryAx 来自报错）。数值演示，不是证明。`,
      `Computed in big-integer fractions by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Over the nine readings of the main observer τ runs ${list(B.tauMain.map(fstr))}, ending at ${both(MAIN[N_MAIN].tau)} with b₁ = ${MAIN[N_MAIN].b1}. Projection: ${B.projTried} cases (ten states of the core × the ${CARRIER.length} nodes of 𝒮) check x⊥ orthogonal to the basis, P² = P, the Pythagorean split and 0 ≤ ΔI ≤ 1, ${bad(B.projBad)}; reading the other 27 nodes in two orders, ΔI > 0 occurs ${grow} times and never once the basis is full, which stays pairwise orthogonal. The six orders of the three sprouts (then three chords): ΣΔI ${sums}, b₁ = ${B.perms[0].b1} each time. Betti numbers |E| − |V| + c against the chords outside a spanning forest: ${bad(B.bettiBad)}. The laws [x, x, z] = z and [x, z, z] = x on ${B.lawTried} pairs, ${bad(B.lawBad)}; the closures of the readings ${list(B.closures.map(closureText))}. Readouts: κ = 1 on 𝒮 only on the diagonal (${bad(B.gramBad)}); of ${COUPLED.length} coupled modes ${B.coupledOk} lie in the fibre of their node; of ${GHOSTS.length} ghosts ${B.ghostsZero} read 0 everywhere and lie in no fibre of a node; the core of the fifth reading sees a mean visible share ${both(FLIP_SHARES.visible)} of ℋ½. Three observers: τ<sub>A</sub> = ${fstr(B.tauObs.A)}, τ<sub>B</sub> = ${fstr(B.tauObs.B)}, τ<sub>C</sub> = ${fstr(B.tauObs.C)}, a common trunk of ${B.trunk.nodes.length} nodes and ${B.trunk.edges.length} edges. ObserverUniverse: τ = ${list(B.lean.map(fstr))}.<br>Measured in Lean (${LEAN_RUN.version}, no imports; not recomputed here): observer_is_universe_verified of §38.13.4 is proved by decide and #print axioms answers does not depend on any axioms; the same statement with Init Rat and == fails to reduce, the error is reported, and #print axioms lists ${LEAN_RUN.rat.axioms.join(', ')} (sorryAx from the error). A numerical illustration, not a proof.`
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
  if (document.fonts)
    document.fonts.ready.then(() => {
      title.key = '';
      paint();
    });

  /* ---------- probe, cover, start ---------- */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  const ledgerPlain = (states) => plain(states.map(({ k, kind, step, closure, V, E, c, b1, tau, basis, pairs, open, latent, dI, dB, dTau, ok, residual }) => ({ k, kind, step: step || null, closure, V, E, c, b1, tau, basis, pairs, open, latent, dI, dB, dTau, ok, residual })));
  window.UNIVERSE_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        regime: regimeOf(m),
        at: state.at,
        lens: state.lens,
        cam: state.cam,
        focus: state.focus,
        idle: state.idle,
        spin: state.spin,
        replays: state.replays,
        layers: layers(),
        clock: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        main: { k: mainOf(m).k, f: mainOf(m).f, tau: mainOf(m).now.tau, b1: mainOf(m).now.b1, V: mainOf(m).now.V, E: mainOf(m).now.E, kind: mainOf(m).now.kind },
        flip: { t: m.flip.t, outside: m.flip.outside, coupled: m.flip.outsideCoupled, ghosts: m.flip.outsideGhosts, visible: FLIP_SHARES.visible, latent: FLIP_SHARES.latent, n: FLIP_SHARES.n },
        monad: { k: m.monad.k, f: m.monad.f, taus: Object.fromEntries(OBS.map((o) => [o, m.monad.at[o].tau])), trunk: m.monad.trunk },
        lean: { k: m.lean.k, f: m.lean.f, tau: m.lean.u.tau, dag: m.lean.u.dag.length, basis: m.lean.u.basis.length, core: m.lean.u.core },
        plot: plotData(m),
        cursor: handleWorld(state.at[state.scene])
      });
    },
    carrier: plain(CARRIER),
    named: plain(NAMED),
    main: () => ledgerPlain(MAIN),
    monad: () => Object.fromEntries(OBS.map((o) => [o, ledgerPlain(MONAD[o])])),
    trunk: () => plain(TRUNK),
    lean: () => plain(LEAN.map((u) => ({ core: u.core, basis: u.basis, dag: u.dag, tau: u.tau, cursor: u.cursor, last: u.last }))),
    leanRun: () => plain(LEAN_RUN),
    exterior: () => plain({ coupled: EXTERIOR.coupled, ghosts: EXTERIOR.ghosts, shares: FLIP_SHARES, flipAt: FLIP_AT }),
    presets: plain(PRESETS),
    core: {
      normalize: (t) => normalize(t),
      triad: (a, b, c) => triad(a, b, c),
      kappa: (a, b) => plain(kappa(a, b)),
      schur: (v, basis) => plain(schur(vecQ(v), basis.map(vecQ))),
      betti: (V, E) => betti(V, E),
      dir: (q) => dir(q)
    },
    bench: () => plain(BENCH),
    print: { rel: (x, d) => rel(ratio(x), x, d), sci },
    dragTarget: viewportPoint,
    pointTarget: (p) => {
      const s = sc.p(p),
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
