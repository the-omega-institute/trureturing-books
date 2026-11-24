/* OMEGA//BANDWIDTH · 恒定速率与凯莱引力 · constant rate and Cayley gravity (Chapter 38, §38.16)
   World (kit.solid): z up. The still canvas S is the plane of isotropic coordinates around a mass: the world radius is S·R,
   with R in units of r_s/4 and μ = 1/R, drawn from the horizon R = 1 (μ = 1) out to R = RMAX. Its height is the rate of a
   static clock X = Δτ/Δt = (1 − μ)/(1 + μ) = (R − 1)/(R + 1). Cyan rings are still phase contours (grooves) at equal steps
   of T(R) = ∫ n dR with the optical index n(μ) = (1 + μ)³/(1 − μ); a violet glass cluster stands in the hole inside the
   horizon. The violet glass ball is the legless ternion sphere, the needle; its amber focus is the only thing that moves.
     groove   the needle at the addresses a = 0…3 (μ = 1/5, 1/4, 1/3, 1/2) reads D(a) = (1 − μ)/(1 + μ) and the register
              takes r + D(a); the grooves are never written
     gear     one bandwidth R_Ω ≡ 1 = κ_self + κ_kin + κ_mass with κ_mass = 4μ/(1 + μ)², κ_kin = (1 − κ_mass)β²,
              κ_self = (1 − κ_mass)(1 − β²); a master flywheel at ν₀ = 1 and an inner gear at Δτ/Δt = √κ_self, over 8 beats
     land     the rational stops μ ∈ {0, 1/5, 1/4, 1/3, 1/2, 2/3, 1}: rational rates and r/r_s, on the Cayley circle (X, Y),
              X = (1 − μ)/(1 + μ), Y² = κ_mass, against the areal stops r/r_s ∈ {5/4, 3/2, 2} with radical rates
     horizon  μ = (10 + k)/20 from 1/2 to 1: κ_mass → 1 fills the bandwidth, the inner gear stops, the master keeps turning
     wave     a front between R = 3 and R = 4 (μ = 1/3 and 1/4) moving through the medium n(μ): the flanks advance at
              9/32 and 48/125 and the front turns towards the mass
   The lens changes the frame only: lens 0 keeps the canvas still on the screen and moves the focus; lens 1 (MODEL) keeps
   the focus in the middle and slides the canvas past, and on the last card shows an illusory Newtonian pull for contrast.
   The readings are the same in both. Fractions are pairs of big integers [p, q], q > 0. A number is printed after “=” only
   when the printed decimal is the value, decided on fractions, and after “≈” when it rounds it.
   Read-only probe: window.__constantRateGravityLab (getState()). */
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
  /** Rodrigues: v turned by the angle a about the unit axis n. */
  const turn = (v, n, a) => {
    const c = cs(a),
      s = sn(a),
      d = dot(n, v),
      x = cross(n, v);
    return v.map((vi, i) => vi * c + x[i] * s + n[i] * d * (1 - c));
  };

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
  const sq = (a) => times(a, a),
    cube = (a) => times(a, times(a, a));
  const fr = (p, q) => frac(BigInt(p), BigInt(q));
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
  /** A fraction and its decimal (3/20 = 0.1500, 2/3 ≈ 0.6667); a value known only as a double: its decimal. */
  const both = (v, d = 4) => (v.q ? `${fstr(v.q)} ${relQ(v.q, d)}` : rel(null, v.x, d));
  /** A fraction alone when it is known, else the decimal with its relation. */
  const short = (v, d = 4) => (v.q ? fstr(v.q) : rel(null, v.x, d));
  /** “= fraction” when it is known, else the relation and the decimal: what follows a name. */
  const is = (v, d = 4) => (v.q ? `= ${fstr(v.q)}` : rel(null, v.x, d));
  /** As short and is, for a pill, a title or a label: a fraction longer than seven characters gives way to its decimal. */
  const brief = (v, d = 4) => (v.q && fstr(v.q).length <= 7 ? fstr(v.q) : say(v, d)),
    isb = (v, d = 4) => (v.q && fstr(v.q).length <= 7 ? `= ${fstr(v.q)}` : say(v, d));

  /* ---------- the exact core ---------- */
  /** The value of a rail, freed from the rounding of its own steps. */
  function settled(v) {
    const back = Math.round(v);
    return abs(v - back) < 1e-9 ? back : v;
  }
  /** The static clock rate X = (1 − μ)/(1 + μ), the share of the mass κ_mass = r_s/r = 4μ/(1 + μ)², the coordinate speed
      of light v = (1 − μ)/(1 + μ)³ and the index n = 1/v, r/R = (1 + μ)², r/r_s = (1 + μ)²/(4μ). */
  const rateQ = (mu) => quo(minus(ONE, mu), plus(ONE, mu));
  const kMassQ = (mu) => quo(times(whole(4), mu), sq(plus(ONE, mu)));
  const vTravQ = (mu) => quo(minus(ONE, mu), cube(plus(ONE, mu)));
  const nOptQ = (mu) => (equal(mu, ONE) ? null : quo(cube(plus(ONE, mu)), minus(ONE, mu)));
  const rOverRQ = (mu) => sq(plus(ONE, mu));
  const rOverRsQ = (mu) => (mu[0] === 0n ? null : quo(sq(plus(ONE, mu)), times(whole(4), mu)));
  const rateF = (mu) => (1 - mu) / (1 + mu),
    kMassF = (mu) => (4 * mu) / (1 + mu) ** 2,
    vTravF = (mu) => (1 - mu) / (1 + mu) ** 3;
  /** The canvas: R from the horizon 1 to RMAX, world radius S·R. */
  const RMAX = 6;
  /** The optical depth from the rim: T(R) = ∫_R^RMAX n dR with n = (R + 1)³/(R²(R − 1)) = 1 − 4/R − 1/R² + 8/(R − 1). */
  const Fopt = (R) => R - 4 * Math.log(R) + 1 / R + 8 * Math.log(R - 1);
  const depth = (R) => Fopt(RMAX) - Fopt(R);
  /** The grooves: one every LAMBDA of optical depth, down to R = R_LOW. */
  const LAMBDA = 0.8,
    R_LOW = 1.28;

  /** groove: the addresses a = 0…3 at μ = 1/5, 1/4, 1/3, 1/2 (R = 5, 4, 3, 2) and the data D(a) = (1 − μ)/(1 + μ). */
  const ADDR_MU = [fr(1, 5), fr(1, 4), fr(1, 3), fr(1, 2)],
    DMEM = ADDR_MU.map(rateQ),
    CELLS = DMEM.length,
    ADDR_R = ADDR_MU.map((m) => fval(quo(ONE, m)));
  const grooveR = (v) => {
    const t = clamp(v, 0, CELLS - 1),
      i = Math.min(CELLS - 2, Math.floor(t));
    return lerp(ADDR_R[i], ADDR_R[i + 1], t - i);
  };
  /** The register after the queries at the addresses 0…n: r = D(0) + … + D(n). */
  const REG = DMEM.reduce((acc, d, i) => [...acc, i ? plus(acc[i - 1], d) : d], []);
  function grooveAt(t) {
    const v = settled(t),
      n = Math.min(CELLS - 1, Math.floor(v + 1e-9)),
      f = v - n < 1e-9 ? 0 : v - n,
      R = grooveR(v),
      T = depth(R);
    const common = { t: v, ptr: n, f, reg: num(REG[n]), roll: n, shift: CELLS * n, grooves: 0, R, T, signal: cs((TAU * T) / LAMBDA) };
    if (f === 0) return { ...common, exact: true, mu: num(ADDR_MU[n]), D: num(DMEM[n]), dD: n > 0 ? num(minus(DMEM[n], DMEM[n - 1])) : null };
    return { ...common, exact: false, mu: flo(1 / R), D: flo(rateF(1 / R)), dD: null };
  }
  /** gear: the composite at μ ∈ {0, 1/4, 1/3, 1/2} with β² ∈ {0, 2/5}, over 8 beats of the master. */
  const GEAR_MU = [ZERO, fr(1, 4), fr(1, 3), fr(1, 2)],
    BETA2 = [ZERO, fr(2, 5)],
    BEATS = 8;
  function gearAt(t, mi, bi) {
    const v = settled(t),
      mu = GEAR_MU[mi],
      b2 = BETA2[bi],
      km = kMassQ(mu),
      rest = minus(ONE, km),
      self = times(rest, minus(ONE, b2)),
      kin = times(rest, b2),
      root = rootQ(self),
      clock = root ? num(root) : flo(Math.sqrt(fval(self))),
      int = Number.isInteger(v),
      ch2 = quo(ONE, minus(ONE, b2)),
      sh2 = quo(b2, minus(ONE, b2));
    return {
      t: v,
      exact: int,
      mi,
      bi,
      mu: num(mu),
      b2: num(b2),
      km: num(km),
      self: num(self),
      kin: num(kin),
      sum: num(plus(plus(self, kin), km)),
      rate: num(rateQ(mu)),
      clock,
      clock2: num(self),
      tau: root && int ? num(times(root, whole(v))) : flo(clock.x * v),
      master: v / BEATS,
      gear: (clock.x * v) / BEATS,
      cosh2: num(ch2),
      sinh2: num(sh2),
      hyp: num(minus(ch2, sh2)),
      moving: bi > 0
    };
  }
  /** land: the rational stops of μ, and the areal stops r/r_s = q with the radical rate √(1 − 1/q). */
  const LAND_MU = [ZERO, fr(1, 5), fr(1, 4), fr(1, 3), fr(1, 2), fr(2, 3), ONE];
  const AREAL = [fr(5, 4), fr(3, 2), whole(2)].map((q) => {
    const Q = fval(q),
      mu = 2 * Q - 1 - 2 * Math.sqrt(Q * (Q - 1));
    return { q, rate2: minus(ONE, quo(ONE, q)), rate: Math.sqrt(1 - 1 / Q), mu, R: 1 / mu };
  });
  /** The place R of a stop: μ = 0 lies at infinity and is parked on the rim. */
  const muR = (mu) => (mu <= 1 / RMAX ? RMAX : 1 / mu);
  function landAt(t) {
    const v = settled(t);
    if (!Number.isInteger(v)) {
      const i = Math.min(LAND_MU.length - 2, Math.floor(v)),
        mu = lerp(fval(LAND_MU[i]), fval(LAND_MU[i + 1]), v - i);
      return { k: v, exact: false, mu: flo(mu), rate: flo(rateF(mu)), km: flo(kMassF(mu)), Y: flo(Math.sqrt(kMassF(mu))), rR: flo((1 + mu) ** 2), rrs: mu > 0 ? flo((1 + mu) ** 2 / (4 * mu)) : null, kap: flo(1 / (1 + mu)), pq: null, R: muR(mu) };
    }
    const mu = LAND_MU[v],
      km = kMassQ(mu),
      Yq = rootQ(km),
      root = rootQ(mu),
      rrs = rOverRsQ(mu);
    return {
      k: v,
      exact: true,
      mu: num(mu),
      rate: num(rateQ(mu)),
      km: num(km),
      Y: Yq ? num(Yq) : flo(Math.sqrt(fval(km))),
      rR: num(rOverRQ(mu)),
      rrs: rrs ? num(rrs) : null,
      kap: num(quo(ONE, plus(ONE, mu))),
      pq: root ? [root[0], root[1]] : null,
      R: muR(fval(mu))
    };
  }
  /** horizon: μ = (10 + k)/20 for k from 0 to 10; the inner gear turns by ∫ (1 − μ)/(1 + μ) dk = 20[2 ln(1 + μ) − μ]. */
  const HOR = 10;
  const horMu = (k) => (10 + k) / 20;
  const gearBeats = (k) => {
    const G = (mu) => 20 * (2 * Math.log(1 + mu) - mu);
    return G(horMu(k)) - G(horMu(0));
  };
  function horizonAt(t) {
    const v = settled(t),
      int = Number.isInteger(v),
      muQ = int ? fr(10 + v, 20) : null,
      mu = int ? num(muQ) : flo(horMu(v));
    const km = int ? num(kMassQ(muQ)) : flo(kMassF(mu.x)),
      rate = int ? num(rateQ(muQ)) : flo(rateF(mu.x));
    return { k: v, exact: int, mu, km, rate, arcs: int ? num(times(whole(20), km.q)) : flo(20 * km.x), master: v, gear: gearBeats(v), R: 1 / mu.x };
  }
  /** wave: nine rays across the front from R = 3 to R = 4 (μ = 1/3 to 1/4), all starting along the same direction, traced
      in coordinate time through the medium n(R): dx/dt = k̂/n, dk̂/dt = (∇ ln n − (∇ ln n · k̂) k̂)/n. Plane coordinates: x across
      the ray of the page, y along it. */
  const WAVE_T = 8,
    NRAY = 9,
    DT = 0.02,
    NSTEP = Math.round(WAVE_T / DT);
  const nOfR = (R) => (R + 1) ** 3 / (R * R * (R - 1));
  const dlnn = (R) => -3 / (R * (R + 1)) - 1 / (R * (R - 1));
  const RAYS = (() => {
    const f = ([x, y, kx, ky]) => {
      const R = hypot(x, y),
        n = nOfR(R),
        g = dlnn(R),
        gx = (g * x) / R,
        gy = (g * y) / R,
        d = gx * kx + gy * ky;
      return [kx / n, ky / n, (gx - d * kx) / n, (gy - d * ky) / n];
    };
    return range(NRAY).map((j) => {
      let s = [0, 3 + j / (NRAY - 1), 1, 0];
      const out = [s.slice()];
      for (let i = 0; i < NSTEP; i++) {
        const a = f(s),
          b = f(s.map((x, m) => x + (DT / 2) * a[m])),
          c = f(s.map((x, m) => x + (DT / 2) * b[m])),
          d = f(s.map((x, m) => x + DT * c[m]));
        s = s.map((x, m) => x + (DT / 6) * (a[m] + 2 * b[m] + 2 * c[m] + d[m]));
        const k = hypot(s[2], s[3]);
        s[2] /= k;
        s[3] /= k;
        out.push(s.slice());
      }
      return out;
    });
  })();
  /** A ray at the time t: [x, y, kx, ky]. */
  const rayAt = (j, t) => {
    const u = clamp(t, 0, WAVE_T) / DT,
      i = Math.min(NSTEP - 1, Math.floor(u)),
      a = RAYS[j][i],
      b = RAYS[j][i + 1];
    return a.map((x, m) => lerp(x, b[m], u - i));
  };
  const MID = (NRAY - 1) / 2;
  const V_IN = vTravQ(fr(1, 3)),
    V_OUT = vTravQ(fr(1, 4));
  function waveAt(t) {
    const v = settled(t),
      inn = rayAt(0, v),
      out = rayAt(NRAY - 1, v),
      mid = rayAt(MID, v),
      dv = minus(V_OUT, V_IN);
    // the direction of the front (inner flank to outer flank) and how far the middle ray has turned from its start
    const turned = Math.atan2(-mid[3], mid[2]);
    return {
      t: v,
      exact: Number.isInteger(v),
      vin: num(V_IN),
      vout: num(V_OUT),
      dv: num(dv),
      nin: num(nOptQ(fr(1, 3))),
      nout: num(nOptQ(fr(1, 4))),
      omega: num(dv),
      turned,
      inR: hypot(inn[0], inn[1]),
      outR: hypot(out[0], out[1]),
      mid
    };
  }

  /* ---------- the state: one rail value per card ---------- */
  const SCENES = ['groove', 'gear', 'land', 'horizon', 'wave'];
  // the rail of a card: its length, its speed (units per second), its keyboard step, and whether it rests on whole stops
  const RAILS = {
    groove: { max: CELLS - 1, rate: 0.75, step: 1, whole: false },
    gear: { max: BEATS, rate: 1.5, step: 1, whole: false },
    land: { max: LAND_MU.length - 1, rate: 1.3, step: 1, whole: true },
    horizon: { max: HOR, rate: 1.8, step: 1, whole: false },
    wave: { max: WAVE_T, rate: 1.4, step: 1, whole: false }
  };
  const STILL = { groove: CELLS - 1, gear: BEATS, land: 3, horizon: HOR, wave: WAVE_T };
  const FRESH = { mi: 2, bi: 1 };
  const state = { scene: 'groove', at: { ...STILL }, ...FRESH, lens: 0, lensT: 0, cam: 'panorama', from: null, blend: 1 };
  function compute(s) {
    return { groove: grooveAt(s.at.groove), gear: gearAt(s.at.gear, s.mi, s.bi), land: landAt(s.at.land), horizon: horizonAt(s.at.horizon), wave: waveAt(s.at.wave) };
  }
  const calc = () => compute(state);

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  /** The ray of the page OUT, chosen from the panorama so that the needle runs on the far wall, towards the viewer. */
  const YAW0 = -0.62;
  const FAR = [sn(YAW0), cs(YAW0), 0],
    RIGHT = [cs(YAW0), -sn(YAW0), 0];
  const OUT = unit(add(scale(FAR, 0.78), scale(RIGHT, 0.62))),
    TH0 = Math.atan2(OUT[1], OUT[0]);
  /** Across the ray: PERP, towards the right of the panorama. */
  const PERP = (() => {
    const p = [-OUT[1], OUT[0], 0];
    return dot(p, RIGHT) > 0 ? p : scale(p, -1);
  })();
  const cams = { panorama: [YAW0, 0.62, 1], side: [-TH0, 0.4, 1], above: [Math.atan2(OUT[0], OUT[1]), 0.95, 1] };
  const PRESETS = {
    'phonograph-needle-static-wave-grooves': { scene: 'groove', cam: 'panorama', play: true, still: STILL.groove },
    'constant-bandwidth-cayley-clock-gear': { scene: 'gear', cam: 'panorama', play: true, still: STILL.gear },
    'isotropic-rational-landmarks-vs-radical': { scene: 'land', cam: 'panorama', play: true, still: STILL.land },
    'horizon-io-saturation-clock-stall': { scene: 'horizon', cam: 'panorama', play: true, still: STILL.horizon },
    'differential-decoding-wavefront-refraction': { scene: 'wave', cam: 'above', play: true, still: STILL.wave }
  };
  const DEFAULT = 'phonograph-needle-static-wave-grooves';

  /* ---------- the world: the canvas, the cluster, the sphere and the panel ---------- */
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
  let cam = basis(cams.panorama[0], cams.panorama[1]);
  /** A point x to the right, y up and d towards the viewer, as the camera sees it now. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  const compact = () => stage.clientWidth < 560,
    small = () => stage.clientWidth < 480;
  const RX = 1.7,
    S = RX / RMAX,
    HZ = 0.95,
    Z0 = -0.36,
    ZUP = [0, 0, 1];
  const Xof = (R) => (R - 1) / (R + 1);
  const zOfR = (R) => Z0 + HZ * Xof(R);
  /** A point of the canvas at the horizontal place (x, y), lifted along z. */
  const ground = (x, y, lift = 0) => [x, y, zOfR(Math.max(1, hypot(x, y) / S)) + lift];
  /** The unit direction on the canvas at the angle az from OUT towards PERP. */
  const dirAt = (az) => add(scale(OUT, cs(az)), scale(PERP, sn(az)));
  /** The normal of the canvas at the horizontal place (x, y). */
  function normalAt(x, y) {
    const r = hypot(x, y),
      R = Math.max(1, r / S);
    if (r < 1e-9) return ZUP;
    const g = (HZ * 2) / ((R + 1) ** 2 * S);
    return unit([(-g * x) / r, (-g * y) / r, 1]);
  }
  /** At R on the direction az: the contact point, the normal and the centre of the ball. */
  const RB = 0.13;
  function placeAt(R, az = 0) {
    const d = dirAt(az),
      h = scale(d, S * R),
      P0 = ground(h[0], h[1]),
      n = normalAt(h[0], h[1]);
    return { R, az, P: P0, n, C: add(P0, scale(n, RB)), dir: d };
  }
  /** A point of the plane of the front (x across the ray, y along it, in units of R) on the canvas. */
  const planePoint = (x, y, lift = 0.012) => {
    const h = add(scale(PERP, S * x), scale(OUT, S * y));
    return ground(h[0], h[1], lift);
  };
  /** Where the sphere stands in each scene: the radius R and the angle az from OUT. */
  const ORBIT = 0.055;
  function spotFor(scene, s = state) {
    switch (scene) {
      case 'gear': {
        const mu = fval(GEAR_MU[s.mi]);
        return { R: muR(mu), az: s.bi ? ORBIT * s.at.gear : 0 };
      }
      case 'land':
        return { R: landAt(s.at.land).R, az: 0 };
      case 'horizon':
        return { R: 1 / horMu(clamp(s.at.horizon, 0, HOR)), az: 0 };
      case 'wave': {
        const m = rayAt(MID, s.at.wave);
        return { R: hypot(m[0], m[1]), az: Math.atan2(m[0], m[1]) };
      }
      default:
        return { R: grooveR(s.at.groove), az: 0 };
    }
  }
  /** The place of the sphere in this frame of the animation (the weights of the cards blend it). */
  function sphereNow(w = layers()) {
    const R = SCENES.reduce((s, k) => s + w[k] * spotFor(k).R, 0),
      az = SCENES.reduce((s, k) => s + w[k] * spotFor(k).az, 0);
    return placeAt(R, az);
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
      return sample(48, (t) => {
        const a = TAU * t,
          x = [c * cs(phi + a), c * sn(phi + a), s * cs(a), s * sn(a)],
          d = 1 - x[3];
        return [x[0] / d, x[1] / d, x[2] / d];
      });
    });
    const squeeze = (p) => scale(p, 1 / (1 + 0.38 * norm(p)));
    const sq3 = raw.map((c) => c.map(squeeze));
    const big = Math.max(...sq3.flat().map(norm));
    return sq3.map((c) => c.map((p) => scale(p, 0.8 / big)));
  })();
  /** The turn of the ball: the way it has rolled in from the rim and round the ring, over its radius (a sketch). */
  const rollOf = (o) => (S * (RMAX - o.R) * 1.15 + S * o.R * o.az) / RB;
  /** A local point of the ball, turned by the angle a about its axis of rolling, in the world at the centre C. */
  const ballPoint = (p, a, o) => {
    const inw = scale(o.dir, -1),
      axis = unit(cross(inw, ZUP)),
      y = p[1] * cs(a) - p[2] * sn(a),
      z = p[1] * sn(a) + p[2] * cs(a);
    return add(o.C, scale(add(add(scale(axis, p[0]), scale(inw, y)), scale(ZUP, z)), RB));
  };
  /** The violet cluster in the hole inside the horizon: six integer quaternions 2 ± i, 2 ± j, 2 ± k; their imaginary parts
      give the nodes. */
  const CLUSTER_Q = [
    [2, 1, 0, 0],
    [2, -1, 0, 0],
    [2, 0, 1, 0],
    [2, 0, -1, 0],
    [2, 0, 0, 1],
    [2, 0, 0, -1]
  ];
  const CL_C = [0, 0, Z0 - 0.05],
    CL_R = 0.25;
  const CL_NODES = CLUSTER_Q.map((q) => {
    const v = unit(q.slice(1)),
      t1 = turn(v, unit([1, 1, 0.4]), 0.5);
    return add(CL_C, scale(t1, CL_R * 0.62));
  });
  /** The panel facing the camera: the bandwidth column and the flywheels (gear, horizon) or the Cayley circle (land). */
  const FRAMES = {
    wide: { c: [2.6, 0.12], h: 1.05 },
    narrow: { c: [0.0, -1.74], h: 0.92 }
  };
  const frames = () => FRAMES[small() ? 'narrow' : 'wide'];
  let PAN = FRAMES.wide;
  /** A point (x, y) of the panel, d towards the viewer. */
  const pp = (x, y, d = 0, F = PAN) => seen(F.c[0] + F.h * x, F.c[1] + F.h * y, 0.9 + F.h * d);
  const PLATE = { band: [-0.8, 0.74, -0.64, 0.7], circle: [-0.82, 0.82, -0.42, 0.74] };
  const plateOf = (kind, F = PAN) => {
    const [x0, x1, y0, y1] = PLATE[kind];
    return [pp(x0, y0, 0, F), pp(x1, y0, 0, F), pp(x1, y1, 0, F), pp(x0, y1, 0, F)];
  };
  /** The column: base at (COL_X, COL_Y0) of the panel, height COL_H for the whole bandwidth. */
  const COL_X = -0.52,
    COL_Y0 = -0.5,
    COL_H = 1.0,
    COL_W = 0.26,
    COL_D = 0.22;
  /** The flywheels: centre FW, the master ring of radius FW_M, the inner gear of radius FW_G. */
  const FW = [0.27, 0.04],
    FW_M = 0.42,
    FW_G = 0.24;
  /** The Cayley circle: centre CC, radius CC_R. */
  const CC = [0, -0.26],
    CC_R = 0.78;
  const ccPoint = (X, Y, d = 0) => pp(CC[0] + CC_R * X, CC[1] + CC_R * Y, d);
  /** The angle of a flywheel spoke after the given number of turns: clockwise from the top. */
  const spokeAngle = (turns) => PI / 2 - TAU * turns;
  const wheelPoint = (r, a, d = 0.02) => pp(FW[0] + r * cs(a), FW[1] + r * sn(a), d);

  /** The world point of the amber handle for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'gear':
        return wheelPoint(FW_M, spokeAngle(v / BEATS), 0.03);
      case 'land':
        return placeAt(landAt(v).R).P;
      case 'horizon':
        return placeAt(1 / horMu(clamp(v, 0, HOR))).P;
      case 'wave': {
        const m = rayAt(MID, v);
        return planePoint(m[0], m[1]);
      }
      default:
        return placeAt(grooveR(v)).P;
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
  /** The canvas itself: its rim, its floor, the cluster and the ball on the ray. */
  const CANVAS_PTS = () => [...range(36).map((k) => [RX * cs((k * TAU) / 36), RX * sn((k * TAU) / 36), zOfR(RMAX)]), [0, 0, Z0 - 0.3], add(CL_C, [0, 0, CL_R]), ...[RMAX, 1.4].flatMap((R) => [add(placeAt(R).C, scale(ZUP, RB)), add(placeAt(R).C, scale(OUT, RB))])];
  const SIDE = {
    groove: () => grow(around(CANVAS_PTS()), 0.03, 0.03, 0.03, 0.06),
    gear: () => grow(around([...CANVAS_PTS(), ...plateOf('band', frames())]), 0.03, 0.03, 0.03, 0.03),
    land: () => grow(around([...CANVAS_PTS(), ...plateOf('circle', frames())]), 0.03, 0.03, 0.03, 0.03),
    horizon: () => grow(around([...CANVAS_PTS(), ...plateOf('band', frames())]), 0.03, 0.03, 0.03, 0.03),
    wave: () => grow(around([...[0, NRAY - 1].flatMap((j) => sample(16, (u) => planePoint(...rayAt(j, u * WAVE_T).slice(0, 2)))), planePoint(0, 3.5), planePoint(3.4, 3.5), planePoint(0, 4.6), add(CL_C, [0, 0, CL_R]), add(CL_C, [-CL_R, 0, 0]), add(CL_C, [0, -CL_R, 0])]), 0.08, 0.08, 0.06, 0.1)
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
    const key = [state.scene, state.lens, state.mi, state.bi, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: shown(tl) && !TRV.still ? titleRoom(box) : 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k]()]);
    let [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    // the first-person lens: the same box, moved so that the focus is in its middle
    if (state.lensT > 0) {
      const C = sphereNow(w).P,
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
  /** A ring of the canvas at R. */
  const ringAt = (R, lift = 0.008, n = 96) => sample(n, (t) => ground(S * R * cs(TAU * t), S * R * sn(TAU * t), lift));
  /** The radii of the grooves: T(R) = k·LAMBDA from the rim inwards. */
  const GROOVES = (() => {
    const out = [];
    for (let k = 1; ; k++) {
      let lo = R_LOW,
        hi = RMAX;
      if (depth(lo) < k * LAMBDA) break;
      for (let i = 0; i < 60; i++) {
        const mid = (lo + hi) / 2;
        if (depth(mid) > k * LAMBDA) lo = mid;
        else hi = mid;
      }
      out.push((lo + hi) / 2);
    }
    return out;
  })();
  /** A box with the axes e1 (width w), e2 (height h, from the base up) and e3 (depth d), its base centred at b. */
  function boxMesh(b, e, w, h, d) {
    const V = [];
    for (const y of [0, h]) for (const z of [-d / 2, d / 2]) for (const x of [-w / 2, w / 2]) V.push(add(add(add(b, scale(e[0], x)), scale(e[1], y)), scale(e[2], z)));
    return {
      vertices: V,
      faces: [
        [0, 1, 3, 2],
        [4, 6, 7, 5],
        [0, 4, 5, 1],
        [2, 3, 7, 6],
        [0, 2, 6, 4],
        [1, 5, 7, 3]
      ]
    };
  }
  /** The axes of the column: the camera axes turned a little, so that its front, a side and its lid show. */
  function columnAxes() {
    const yawed = [turn(cam.R, cam.U, -0.5), cam.U, turn(cam.D, cam.U, -0.5)];
    return yawed.map((v) => turn(v, cam.R, 0.26));
  }

  /* ---------- drawing ---------- */
  function drawCanvas(w) {
    // the funnel: its height is the clock rate X; dark at the horizon, lighter at the rim; a faint violet grid of the chart
    sc.surface('canvas', (u, v) => {
      const R = 1 + (RMAX - 1) * u ** 1.4;
      return [S * R * cs(v), S * R * sn(v), zOfR(R)];
    }, { u: [0, 1], v: [0, TAU], nu: 56, nv: 120, colors: [P.stage, P.faint, P.dim], range: [-0.15, 0.85], value: (u) => Xof(1 + (RMAX - 1) * u ** 1.4), grid: { every: [7, 10], color: P.violet, alpha: 0.22 } });
    // the horizon R = 1, where X = 0
    sc.line(ringAt(1, 0.01, 120), { color: P.cyan, width: 2, alpha: 0.9, dash: [7, 4] });
    // the grooves: still phase contours, on cards 1 and 5 strong, faint elsewhere
    const ga = 0.2 + 0.5 * w.groove + 0.08 * w.wave;
    for (const R of GROOVES) sc.line(ringAt(R), { color: P.cyan, width: 1, alpha: ga });
    // the landmarks: rational stops in cyan, areal stops in magenta
    const lw = w.land,
      bw = w.gear + w.horizon;
    if (lw > 0.01 || bw > 0.01)
      LAND_MU.forEach((mu, i) => {
        const R = muR(fval(mu)),
          cur = lw > 0.01 && Math.round(state.at.land) === i;
        if (i === LAND_MU.length - 1) return;
        sc.line(ringAt(R, 0.012), { color: P.cyan, width: cur ? 2.6 : 1.5, alpha: 0.85 * Math.max(lw, 0.45 * bw) });
      });
    if (lw > 0.01) for (const a of AREAL) sc.line(ringAt(a.R, 0.014), { color: P.magenta, width: 1.6, alpha: 0.85 * lw });
  }
  /** The violet cluster: a glass shell in the hole, six nodes and the magenta relations between them. */
  function drawCluster() {
    sc.glass('cluster', CL_C, CL_R, { color: P.violet, alpha: 0.12, rim: 0.75 });
    for (let i = 0; i < CL_NODES.length; i++) for (let j = i + 1; j < CL_NODES.length; j++) sc.line([CL_NODES[i], CL_NODES[j]], { color: P.magenta, width: 1, alpha: 0.5 });
    CL_NODES.forEach((p, i) => sc.bead(p, { color: P.violet, r: 3.2, key: 'node' + i }));
  }
  /** The legless sphere: a violet glass ball with its Hopf circles, turned by the way it has rolled. */
  function drawSphere(o, w) {
    const a = rollOf(o),
      seenBall = 1 - w.wave;
    if (seenBall > 0.01) {
      sc.glass('ball', o.C, RB, { color: P.violet, alpha: 0.1 * seenBall, rim: 0.65 * seenBall });
      HOPF.forEach((c, i) => sc.line(c.map((p) => ballPoint(p, a, o)), { color: P.violet, width: i === 0 ? 1.6 : 1.1, alpha: (i === 0 ? 0.95 : 0.8) * seenBall }));
    }
    // the focus: where the ball touches the canvas
    sc.ring(add(o.P, scale(o.n, 0.006)), { color: P.amber, r: 8, normal: o.n, key: 'focus' });
  }
  function drawGroove(m, o, a) {
    if (a < 0.01) return;
    // the four addresses on the ray, the data cut into the still canvas
    for (let i = 0; i < CELLS; i++) {
      const c = placeAt(ADDR_R[i]);
      sc.bead(add(c.P, scale(c.n, 0.02)), { color: P.cyan, r: 5.2, alpha: a, key: 'cell' + i });
    }
    // the trace of the needle along the ray, from address 0 to where it is now
    const g = m.groove,
      pts = sample(40, (t) => add(placeAt(grooveR(t * g.t)).P, [0, 0, 0.012]));
    if (g.t > 0.02) sc.line(pts, { color: P.cyan, width: 2.2, alpha: 0.9 * a });
    sc.line(sample(40, (t) => add(placeAt(grooveR(t * (CELLS - 1))).P, [0, 0, 0.01])), { color: P.cyan, width: 1, alpha: 0.4 * a, dash: [5, 4] });
  }
  /** The relation arcs from the cluster to the sphere: share·20 of the 20 are lit. */
  function drawArcs(o, share, a) {
    if (a < 0.01) return;
    const from = add(CL_C, [0, 0, CL_R * 0.6]),
      to = o.C,
      side = unit(cross(sub(to, from), ZUP)),
      lit = 20 * share;
    for (let k = 0; k < 20; k++) {
      const mid = add(scale(add(from, to), 0.5), add(scale(ZUP, 0.22 + 0.05 * (k % 4)), scale(side, (k - 9.5) * 0.034))),
        pts = sample(18, (t) => add(add(scale(from, (1 - t) ** 2), scale(mid, 2 * t * (1 - t))), scale(to, t * t))),
        on = clamp(lit - k, 0, 1);
      sc.line(pts, { color: P.magenta, width: on > 0 ? 1.5 : 1, alpha: a * (0.14 + 0.76 * on) });
    }
  }
  /** The plate of the panel and a faint lead from the sphere. */
  function drawPlate(kind, a) {
    sc.fan(plateOf(kind), { fill: P.stage, alpha: 0.5 * a, color: P.ink, strokeAlpha: 0.28 * a });
  }
  /** The bandwidth column: κ_self (cyan) at the foot, κ_kin (violet), κ_mass (magenta) on top; its lid never moves. */
  function drawColumn(shares, a) {
    const e = columnAxes(),
      base = pp(COL_X, COL_Y0, 0.05),
      H = COL_H * PAN.h,
      Wd = COL_W * PAN.h,
      Dp = COL_D * PAN.h;
    let y = 0;
    for (const [key, share, color] of shares) {
      const h = H * share;
      if (h > 1e-4 && a > 0.01) sc.poly(key + (a < 0.99 ? '~' : ''), boxMesh(add(base, scale(e[1], y)), e, Wd, h, Dp), { color, alpha: a < 0.99 ? a : 1, edges: P.ink, pick: false });
      y += h;
    }
    // the lid of the whole bandwidth: an ink frame at the height of R_Ω ≡ 1
    const lid = boxMesh(add(base, scale(e[1], H)), e, Wd * 1.12, 0, Dp * 1.12).vertices.slice(0, 4);
    sc.line([lid[0], lid[1], lid[3], lid[2]], { color: P.ink, width: 1.6, alpha: 0.9 * a, close: true });
  }
  /** The master flywheel (violet, one turn in 8 beats) and the inner gear (cyan, at the clock rate). */
  function drawWheels(master, gear, rate, a) {
    if (a < 0.01) return;
    const ring = sample(96, (t) => wheelPoint(FW_M, TAU * t, 0.01));
    tube('master', ring, P.violet, 0.016 * PAN.h, a, 0.35);
    for (let k = 0; k < BEATS; k++) {
      const ang = PI / 2 - (TAU * k) / BEATS;
      sc.line([wheelPoint(FW_M - 0.05, ang), wheelPoint(FW_M + 0.05, ang)], { color: P.violet, width: 1.6, alpha: 0.85 * a });
    }
    const aM = spokeAngle(master),
      aG = spokeAngle(gear);
    // the sweep of the last beat: violet for the master, cyan for the inner gear (rate × one eighth of a turn)
    const sector = (r, from, span) => [wheelPoint(0, 0, 0.005), ...sample(24, (t) => wheelPoint(r, from + span * t, 0.005))];
    sc.fan(sector(FW_M - 0.06, aM, TAU / BEATS), { fill: P.violet, alpha: 0.13 * a });
    if (rate > 1e-6) sc.fan(sector(FW_G - 0.03, aG, (TAU * rate) / BEATS), { fill: P.cyan, alpha: 0.22 * a });
    sc.arrow(wheelPoint(0, 0, 0.03), wheelPoint(FW_M - 0.07, aM, 0.03), { color: P.violet, width: 2.4, headSize: 9, alpha: a });
    // the inner gear: twelve teeth, turned by the gear angle
    const teeth = sample(144, (t) => {
      const ang = aG + TAU * t,
        bump = cs(12 * (ang - aG)) > 0.3 ? 1 : 0;
      return wheelPoint(FW_G + 0.035 * bump, ang, 0.02);
    });
    sc.line(teeth, { color: P.cyan, width: 1.8, alpha: a });
    sc.arrow(wheelPoint(0, 0, 0.04), wheelPoint(FW_G - 0.03, aG, 0.04), { color: P.cyan, width: 2.6, headSize: 9, alpha: a });
    sc.bead(wheelPoint(0, 0, 0.05), { color: P.ink, r: 3, alpha: a, key: 'hub' });
  }
  function drawBand(m, o, a, kind) {
    if (a < 0.01) return;
    const g = m.gear,
      h = m.horizon;
    const shares = kind === 'gear' ? [['colSelf', g.self.x, P.cyan], ['colKin', g.kin.x, P.violet], ['colMass', g.km.x, P.magenta]] : [['colSelf', 1 - h.km.x, P.cyan], ['colKin', 0, P.violet], ['colMass', h.km.x, P.magenta]];
    drawArcs(o, kind === 'gear' ? g.km.x : h.km.x, a);
    drawPlate('band', a);
    sc.line([o.C, pp(PLATE.band[0], 0)], { color: P.ink, width: 1, dash: [2, 4], alpha: 0.45 * a });
    drawColumn(shares, a);
    if (kind === 'gear') drawWheels(g.master, g.gear, g.clock.x, a);
    else drawWheels(h.master / BEATS, h.gear / BEATS, h.rate.x, a);
    if (kind === 'gear' && g.moving) {
      // the ring the moving sphere runs along
      sc.line(ringAt(muR(g.mu.x), 0.016), { color: P.violet, width: 1.2, alpha: 0.45 * a, dash: [4, 5] });
    }
  }
  /** The violet Cayley circle: X = Δτ/Δt along, Y = √κ_mass up; the rational stops in cyan and the areal stops in magenta. */
  function drawCircle(m, o, a) {
    if (a < 0.01) return;
    drawPlate('circle', a);
    sc.line([o.C, pp(PLATE.circle[0], 0.1)], { color: P.ink, width: 1, dash: [2, 4], alpha: 0.45 * a });
    sc.line(sample(96, (t) => ccPoint(cs(PI * t), sn(PI * t))), { color: P.violet, width: 2, alpha: 0.9 * a });
    sc.line([ccPoint(-1.06, 0), ccPoint(1.06, 0)], { color: P.ink, width: 1, alpha: 0.6 * a });
    // the antipode [p : 0] at (−1, 0): the far end of the chart, not a stop
    sc.ring(ccPoint(-1, 0, 0.02), { color: P.ink, r: 5, alpha: a, key: 'antipode' });
    const l = m.land;
    LAND_MU.forEach((mu, i) => {
      const X = fval(rateQ(mu)),
        Y = Math.sqrt(fval(kMassQ(mu)));
      sc.bead(ccPoint(X, Y, 0.02), { color: P.cyan, r: i === Math.round(l.k) ? 5.6 : 3.6, alpha: a, key: 'stop' + i });
    });
    for (const s of AREAL) sc.bead(ccPoint(s.rate, Math.sqrt(1 - s.rate * s.rate), 0.02), { color: P.magenta, r: 3.6, alpha: a, key: 'areal' + fstr(s.q) });
    // the present stop: its rate along the axis (cyan), the root of κ_mass up (magenta), and the radius
    const X = l.rate.x,
      Y = l.Y.x;
    sc.line([ccPoint(0, 0, 0.01), ccPoint(X, Y, 0.01)], { color: P.ink, width: 1, alpha: 0.6 * a });
    if (abs(X) > 1e-6) sc.line([ccPoint(0, 0, 0.015), ccPoint(X, 0, 0.015)], { color: P.cyan, width: 3.4, alpha: a });
    if (Y > 1e-6) sc.line([ccPoint(X, 0, 0.015), ccPoint(X, Y, 0.015)], { color: P.magenta, width: 3, alpha: a });
  }
  /** The front: nine rays from R = 3 to R = 4 through the medium; the front every unit of time, the flanks, the straight path. */
  function drawWave(m, o, a) {
    if (a < 0.01) return;
    const t = m.wave.t,
      steps = sample(40, (u) => u * t);
    // the rays so far (faint cyan) and the front at every whole time (cyan), the present front (strong)
    for (let j = 2; j < NRAY - 1; j += 2) if (t > 0.02) sc.line(steps.map((s) => planePoint(...rayAt(j, s).slice(0, 2), 0.01)), { color: P.cyan, width: 1.1, alpha: 0.5 * a });
    // the tracks of the two flanks: the inner one, on the side of the mass, magenta; the outer one cyan
    if (t > 0.02) {
      tube('trackIn', steps.map((s) => planePoint(...rayAt(0, s).slice(0, 2), 0.018)), P.magenta, 0.007, 0.95 * a, 0.4);
      tube('trackOut', steps.map((s) => planePoint(...rayAt(NRAY - 1, s).slice(0, 2), 0.018)), P.cyan, 0.007, 0.95 * a, 0.4);
    }
    for (let k = 0; k <= Math.floor(t + 1e-9); k++) sc.line(range(NRAY).map((j) => planePoint(...rayAt(j, k).slice(0, 2), 0.014)), { color: P.cyan, width: 2, alpha: 0.75 * a });
    const front = range(NRAY).map((j) => planePoint(...rayAt(j, t).slice(0, 2), 0.02));
    tube('front', front, P.cyan, 0.012, a, 0.5);
    sc.bead(front[0], { color: P.magenta, r: 4.6, alpha: a, key: 'flankIn' });
    sc.bead(front[NRAY - 1], { color: P.cyan, r: 4.6, alpha: a, key: 'flankOut' });
    // the path of the middle, and the straight path it would take without the medium (ink, dashed)
    if (t > 0.02) tube('path', steps.map((s) => planePoint(...rayAt(MID, s).slice(0, 2), 0.02)), P.cyan, 0.008, 0.9 * a, 0.4);
    const len = steps.reduce((s, u, i) => (i ? s + hypot(...sub(rayAt(MID, u).slice(0, 2), rayAt(MID, steps[i - 1]).slice(0, 2))) : 0), 0);
    sc.line([planePoint(0, 3.5, 0.016), planePoint(Math.max(len, 0.01), 3.5, 0.016)], { color: P.ink, width: 1.2, alpha: 0.75 * a, dash: [5, 4] });
    // the first-person lens: the illusory Newtonian pull towards the centre (MODEL)
    if (state.lensT > 0.01) {
      const inner = planePoint(...rayAt(0, t).slice(0, 2), 0.05),
        toward = unit(sub([0, 0, inner[2]], inner));
      sc.arrow(add(inner, scale(toward, 0.03)), add(inner, scale(toward, 0.4)), { color: P.magenta, width: 2.6, headSize: 11, alpha: a * state.lensT });
    }
  }
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    PAN = frames();
    fit(w);
    const o = sphereNow(w);
    sc.begin();
    drawCanvas(w);
    drawCluster();
    drawGroove(m, o, w.groove);
    drawBand(m, o, w.gear, 'gear');
    drawBand(m, o, w.horizon, 'horizon');
    drawCircle(m, o, w.land);
    drawWave(m, o, w.wave);
    drawSphere(o, w);
    const here = handleWorld(state.at[state.scene]);
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
    groove: [['唱针 · 静止沟纹', 'NEEDLE · STILL GROOVES'], ['焦点不动，波列迎面（MODEL）', 'FOCUS STILL, WAVES STRIKE (MODEL)']],
    gear: [['恒定带宽 · 时钟齿轮', 'CONSTANT BANDWIDTH · CLOCK GEAR'], ['焦点不动，质量拉住时钟（MODEL）', 'FOCUS STILL, MASS HOLDS THE CLOCK (MODEL)']],
    land: [['有理路标 · 凯莱圆', 'RATIONAL LANDMARKS · CAYLEY CIRCLE'], ['焦点不动，路标迎面（MODEL）', 'FOCUS STILL, LANDMARKS COME (MODEL)']],
    horizon: [['视界 · 带宽饱和', 'HORIZON · BANDWIDTH FULL'], ['焦点不动，关系涌来（MODEL）', 'FOCUS STILL, RELATIONS POUR IN (MODEL)']],
    wave: [['差分解码 · 波前折射', 'DIFFERENTIAL DECODING · REFRACTION'], ['焦点不动，似被拉拽（MODEL）', 'FOCUS STILL, A SEEMING PULL (MODEL)']]
  };
  const LENS_NAME = [
    ['静止画布', 'STILL CANVAS'],
    ['第一人称 (MODEL)', 'FIRST PERSON (MODEL)']
  ];
  /** The exact titles of the two lenses. */
  const LENS_TITLE = [
    ['恒定速率静止画布透镜 · 波纹不动，唯 R<sub>Ω</sub> ≡ 1 唱针焦点滑行解码', 'Constant-Rate Static-Canvas Lens · Grooves Still, R<sub>Ω</sub> ≡ 1 Needle Focus Scans &amp; Decodes'],
    ['被动场论第一人称透镜（MODEL）· 焦点似静止而波列迎面撞来与超距拉拽', 'Passive Field-Theory First-Person Lens (MODEL) · Focus Seems Still as Waves Strike &amp; Gravity Pulls']
  ];
  const sub2 = (x) => `<sub>${x}</sub>`;
  const named = (name, exact, value, x) => (exact ? `${name} = ${value}` : `${name} ${rel(null, x, 2)}`);
  const KS = `κ${sub2('self')}`,
    KK = `κ${sub2('kin')}`,
    KM = `κ${sub2('mass')}`,
    ROM = `R${sub2('Ω')}`;
  /** The live regime of the scene. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'groove':
        return m.groove.f > 0 ? 'moving' : m.groove.ptr === 0 ? 'start' : 'read';
      case 'gear':
        return m.gear.moving ? 'moving' : 'hover';
      case 'land':
        return !m.land.exact ? 'moving' : m.land.pq ? 'square' : 'rational';
      case 'horizon':
        return m.horizon.exact && m.horizon.k === HOR ? 'stall' : 'approach';
      default:
        return 'refract';
    }
  }
  /** The lit arcs: a whole number when it is one, else its decimal. */
  const arcText = (h) => (h.arcs.q && h.arcs.q[1] === 1n ? `= ${fstr(h.arcs.q)}` : say(h.arcs, 2));
  const muText = (v) => (v.q ? `μ = ${fstr(v.q)}` : `μ ${rel(null, v.x, 3)}`);
  function subline(m) {
    const s = state.scene,
      lens = state.lens,
      tiny = compact();
    if (s === 'groove') {
      const g = m.groove,
        a = named('a', g.f === 0, g.ptr, g.t);
      if (lens) return tiny ? L(`${a}：D ${isb(g.D)}，搬动 ${g.shift} 格（MODEL）。`, `${a}: D ${isb(g.D)}, ${g.shift} cells moved (MODEL).`) : L(`${a}：焦点停在中央，沟纹迎面而来（MODEL）；同一读数 D(a) ${isb(g.D)}，r ${isb(g.reg)}，搬画布改写 ${g.shift} 格。`, `${a}: the focus stays in the middle and the grooves come at it (MODEL); the same reading D(a) ${isb(g.D)}, r ${isb(g.reg)}, ${g.shift} cells rewritten.`);
      return tiny ? L(`${a}：D ${isb(g.D)}，r ${isb(g.reg)}，沟纹改写 0 次。`, `${a}: D ${isb(g.D)}, r ${isb(g.reg)}, grooves rewritten 0 times.`) : L(`${a}（${muText(g.mu)}）：D(a) ${isb(g.D)}，r ${isb(g.reg)}；指针改写 ${g.roll} 次，沟纹改写 0 次。`, `${a} (${muText(g.mu)}): D(a) ${isb(g.D)}, r ${isb(g.reg)}; the pointer rewritten ${g.roll} times, the grooves 0 times.`);
    }
    if (s === 'gear') {
      const g = m.gear,
        t = named('t', g.exact, g.t, g.t);
      if (lens) return tiny ? L(`${t}：Δτ/Δt ${isb(g.clock)}（MODEL）。`, `${t}: Δτ/Δt ${isb(g.clock)} (MODEL).`) : L(`${t}：焦点停在中央，质量关系似在拉住时钟（MODEL）；分账仍是 ${fstr(g.self.q)} + ${fstr(g.kin.q)} + ${fstr(g.km.q)} ${is(g.sum)}。`, `${t}: the focus stays in the middle and the mass seems to hold the clock (MODEL); the shares are still ${fstr(g.self.q)} + ${fstr(g.kin.q)} + ${fstr(g.km.q)} ${is(g.sum)}.`);
      return tiny ? L(`${t}：${fstr(g.self.q)} + ${fstr(g.kin.q)} + ${fstr(g.km.q)} ${is(g.sum)}。`, `${t}: ${fstr(g.self.q)} + ${fstr(g.kin.q)} + ${fstr(g.km.q)} ${is(g.sum)}.`) : L(`${t}，${muText(g.mu)}，β² = ${fstr(g.b2.q)}：${KS} + ${KK} + ${KM} = ${fstr(g.self.q)} + ${fstr(g.kin.q)} + ${fstr(g.km.q)} ${is(g.sum)}；齿轮 Δτ/Δt ${isb(g.clock)}。`, `${t}, ${muText(g.mu)}, β² = ${fstr(g.b2.q)}: ${KS} + ${KK} + ${KM} = ${fstr(g.self.q)} + ${fstr(g.kin.q)} + ${fstr(g.km.q)} ${is(g.sum)}; gear Δτ/Δt ${isb(g.clock)}.`);
    }
    if (s === 'land') {
      const l = m.land,
        mu = muText(l.mu),
        rrs = l.rrs ? `r/r${sub2('s')} ${isb(l.rrs)}` : `r/r${sub2('s')} → ∞`;
      if (lens) return tiny ? L(`${mu}：Δτ/Δt ${isb(l.rate)}（MODEL）。`, `${mu}: Δτ/Δt ${isb(l.rate)} (MODEL).`) : L(`${mu}：焦点停在中央，路标环迎面而来（MODEL）；Δτ/Δt ${isb(l.rate)}，${rrs}。`, `${mu}: the focus stays in the middle and the landmark rings come at it (MODEL); Δτ/Δt ${isb(l.rate)}, ${rrs}.`);
      return tiny ? L(`${mu}：Δτ/Δt ${isb(l.rate)}，${rrs}。`, `${mu}: Δτ/Δt ${isb(l.rate)}, ${rrs}.`) : L(`${mu}：Δτ/Δt ${isb(l.rate)}，${KM} ${isb(l.km)}，${rrs}；面积路标的 Δτ/Δt 是 √(1/5)、√(1/3)、√(1/2)。`, `${mu}: Δτ/Δt ${isb(l.rate)}, ${KM} ${isb(l.km)}, ${rrs}; the areal landmarks have Δτ/Δt = √(1/5), √(1/3), √(1/2).`);
    }
    if (s === 'horizon') {
      const h = m.horizon,
        mu = muText(h.mu);
      if (lens) return tiny ? L(`${mu}：齿轮 ${isb(h.rate)}（MODEL）。`, `${mu}: gear ${isb(h.rate)} (MODEL).`) : L(`${mu}：焦点停在中央，关系弧涌来占满带宽（MODEL）；内部齿轮 Δτ/Δt ${isb(h.rate)}，主节拍仍是 1。`, `${mu}: the focus stays in the middle and the relation arcs pour in to fill the bandwidth (MODEL); inner gear Δτ/Δt ${isb(h.rate)}, the master beat still 1.`);
      return tiny ? L(`${mu}：${KM} ${isb(h.km)}，齿轮 ${isb(h.rate)}。`, `${mu}: ${KM} ${isb(h.km)}, gear ${isb(h.rate)}.`) : L(`${mu}：${KM} ${isb(h.km)}，亮弧 ${arcText(h)} / 20；主飞轮 ν${sub2('0')} = 1，内部齿轮 Δτ/Δt ${isb(h.rate)}。`, `${mu}: ${KM} ${isb(h.km)}, lit arcs ${arcText(h)} / 20; master ν${sub2('0')} = 1, inner gear Δτ/Δt ${isb(h.rate)}.`);
    }
    const v = m.wave,
      t = named('t', v.exact, v.t, v.t),
      deg = `${fmt((v.turned * 180) / PI, 1)}°`;
    if (lens) return tiny ? L(`${t}：似有拉力（MODEL），转过 ≈ ${deg}。`, `${t}: a seeming pull (MODEL), turned ≈ ${deg}.`) : L(`${t}：焦点停在中央，波前像被一支看不见的手拉向中心（MODEL）；实际只是 Δv ${is(v.dv)}，转过 ≈ ${deg}。`, `${t}: the focus stays in the middle and the front seems pulled to the centre by an unseen hand (MODEL); it is only Δv ${is(v.dv)}, turned ≈ ${deg}.`);
    return tiny ? L(`${t}：Δv ${is(v.dv)}，转过 ≈ ${deg}。`, `${t}: Δv ${is(v.dv)}, turned ≈ ${deg}.`) : L(`${t}：内翼 v ${is(v.vin)}，外翼 v ${is(v.vout)}，Δv ${is(v.dv)}；波前转向质量，转过 ≈ ${deg}。`, `${t}: inner flank v ${is(v.vin)}, outer flank v ${is(v.vout)}, Δv ${is(v.dv)}; the front turns towards the mass, by ≈ ${deg}.`);
  }
  /** The key value of the card: the same in both lenses. */
  function keyOf(m) {
    switch (state.scene) {
      case 'groove':
        return `r ${isb(m.groove.reg)}`;
      case 'gear':
        return `${ROM} ${is(m.gear.sum)}`;
      case 'land':
        return `Δτ/Δt ${isb(m.land.rate)}`;
      case 'horizon':
        return `Δτ/Δt ${isb(m.horizon.rate)}`;
      default:
        return `Δv ${isb(m.wave.dv)}`;
    }
  }
  const bigline = (m) => `${L(...SCENE_NAME[state.scene][state.lens])} · <span class="nb">${keyOf(m)}</span>`;
  function legendItems() {
    const lens = state.lens,
      items = state.scene === 'wave' ? [] : [['vi', L('无腿球 · 霍普夫圆', 'legless sphere · Hopf circles')]];
    switch (state.scene) {
      case 'groove':
        items.push(['cy', L('静止沟纹 · 地址 D(a)', 'still grooves · addresses D(a)')], ['am', L('唱针焦点 · 手柄', 'needle focus · handle')]);
        break;
      case 'gear':
        items.push(['cy', `${KS} · ${L('内部齿轮', 'inner gear')}`], ['mg', `${KM} · ${L('关系弧', 'relation arcs')}`], ['vi', `${KK} · ${L('主飞轮', 'master flywheel')}`], ['am', L('辐条手柄', 'spoke handle')]);
        break;
      case 'land':
        items.push(['vi', L('凯莱圆', 'Cayley circle')], ['cy', L('有理路标 · Δτ/Δt', 'rational landmarks · Δτ/Δt')], ['mg', L(`面积路标 · √${KM}`, `areal landmarks · √${KM}`)], ['am', L('焦点', 'focus')]);
        break;
      case 'horizon':
        items.push(['cy', `${KS} · ${L('内部齿轮', 'inner gear')}`], ['mg', `${KM} · ${L('二十条关系弧', '20 relation arcs')}`], ['vi', L('主飞轮', 'master flywheel')], ['am', L('焦点', 'focus')]);
        break;
      default:
        items.push(['cy', L('观察者波前 · 外翼轨迹 · 光线', 'observer front · outer track · rays')], ['mg', L('内翼轨迹', 'inner track')], ['ik', L('无介质的直线', 'straight path')], ...(lens ? [['mg', L('牛顿拉力（错觉，MODEL）', 'Newtonian pull (illusion, MODEL)')]] : []), ['am', L('手柄', 'handle')]);
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const s = state.scene,
      lens = state.lens;
    if (s === 'groove') {
      const g = m.groove;
      return lens
        ? {
            long: [`以焦点为中心（MODEL）：紫色唱针停在中央，整幅画布带着青色沟纹迎面滑来；地址 ${g.ptr} 处读到同样的 D = ${fstr(DMEM[g.ptr])}，寄存器 r = ${fstr(REG[g.ptr])}，代价是每步搬动 ${CELLS} 个格子，已改写 ${g.shift} 格。`, `Centred on the focus (MODEL): the violet needle stays in the middle while the whole canvas with its cyan grooves slides at it; at address ${g.ptr} it reads the same D = ${fstr(DMEM[g.ptr])} and register r = ${fstr(REG[g.ptr])}, at the price of moving ${CELLS} cells a step, ${g.shift} rewritten so far.`],
            fig: [`第一人称（MODEL）：读数相同，搬画布每步改写 4 格。`, `First person (MODEL): the same readings, 4 cells rewritten a step.`]
          }
        : {
            long: [`淡紫色网格上的青色同心沟纹是静止的相位等值线，越靠近中央的紫色团簇越密。紫色唱针沿射线滑过四个青色地址，琥珀焦点每到一处读出 D(a) = (1 − μ)/(1 + μ) 并把它加进寄存器：走到地址 ${g.ptr} 时 r = ${fstr(REG[g.ptr])}。指针改写 ${g.roll} 次，沟纹一次也不改写。`, `The cyan concentric grooves over the faint violet grid are still phase contours, denser towards the violet cluster in the middle. The violet needle slides along the ray over four cyan addresses; at each the amber focus reads D(a) = (1 − μ)/(1 + μ) and adds it to the register: at address ${g.ptr}, r = ${fstr(REG[g.ptr])}. The pointer is rewritten ${g.roll} times, the grooves never.`],
            fig: [`沟纹不动，唯针在走：r = 2/3 + 3/5 + 1/2 + 1/3 = 21/10。`, `The grooves stay, the needle moves: r = 2/3 + 3/5 + 1/2 + 1/3 = 21/10.`]
          };
    }
    if (s === 'gear') {
      const g = m.gear,
        mv = g.moving;
      return lens
        ? {
            long: [`以焦点为中心（MODEL）：唱针停在中央，品红关系弧像在把内部时钟往回拉；可青色、紫色、品红三段柱子的总高仍是 R_Ω ≡ 1，齿轮 Δτ/Δt ${is(g.clock)} 与静止画布透镜相同。`, `Centred on the focus (MODEL): the needle stays in the middle and the magenta relation arcs seem to hold the inner clock back; yet the cyan, violet and magenta column still stands at R_Ω ≡ 1, and the gear has Δτ/Δt ${is(g.clock)}, as in the static-canvas lens.`],
            fig: [`第一人称（MODEL）：分账与齿轮读数不变。`, `First person (MODEL): the same shares, the same gear.`]
          }
        : {
            long: [`紫色球${mv ? '沿紫色虚线环运动' : '悬停'}在 μ = ${fstr(g.mu.q)} 处，品红关系弧从团簇伸来。柱子的总高恒为 1：青色 κ_self = ${fstr(g.self.q)}、紫色 κ_kin = ${fstr(g.kin.q)}、品红 κ_mass = ${fstr(g.km.q)}。紫色主飞轮 8 拍转一圈，青色齿轮只转 Δτ/Δt ${is(g.clock)} 圈，它的平方就是 κ_self。`, `The violet sphere ${mv ? 'runs along the dashed violet ring' : 'hovers'} at μ = ${fstr(g.mu.q)}, magenta relation arcs reaching it from the cluster. The column always stands at 1: cyan κ_self = ${fstr(g.self.q)}, violet κ_kin = ${fstr(g.kin.q)}, magenta κ_mass = ${fstr(g.km.q)}. The violet master turns once in 8 beats, the cyan gear only Δτ/Δt ${is(g.clock)} of a turn, whose square is κ_self.`],
            fig: [`柱高恒为 1 = 3/20 + 2/20 + 15/20；齿轮的速率平方是 κ_self。`, `The column stays at 1 = 3/20 + 2/20 + 15/20; the gear rate squared is κ_self.`]
          };
    }
    if (s === 'land') {
      const l = m.land,
        rrs = l.rrs ? `r/r_s ${is(l.rrs)}` : `r/r_s → ∞`;
      return lens
        ? {
            long: [`以焦点为中心（MODEL）：焦点停在中央，青色路标环与品红面积环迎面而来；μ = ${l.exact ? fstr(l.mu.q) : fmt(l.mu.x, 3)} 处的时钟率与静止画布透镜相同。`, `Centred on the focus (MODEL): the focus stays in the middle while the cyan landmark rings and the magenta areal rings come at it; the clock rate at μ = ${l.exact ? fstr(l.mu.q) : fmt(l.mu.x, 3)} is that of the static-canvas lens.`],
            fig: [`第一人称（MODEL）：路标迎面，时钟率不变。`, `First person (MODEL): landmarks come, the rates stay.`]
          }
        : {
            long: [`青色环是有理路标 μ = 0、1/5、1/4、1/3、1/2、2/3、1（μ = 0 停在边沿），右边的紫色凯莱圆上 X = Δτ/Δt 是青色线段、Y = √κ_mass 是品红线段。青色的时钟率全是有理数：现在 Δτ/Δt ${is(l.rate)}，${rrs}。品红的面积路标 r/r_s = 5/4、3/2、2 却只有 √(1/5)、√(1/3)、√(1/2)。`, `The cyan rings are the rational landmarks μ = 0, 1/5, 1/4, 1/3, 1/2, 2/3, 1 (μ = 0 parked on the rim); on the violet Cayley circle at the right X = Δτ/Δt is the cyan segment and Y = √κ_mass the magenta one. Every cyan clock rate is rational: now Δτ/Δt ${is(l.rate)}, ${rrs}. The magenta areal landmarks r/r_s = 5/4, 3/2, 2 have only √(1/5), √(1/3), √(1/2).`],
            fig: [`μ = 1/3：Δτ/Δt = 1/2，r/r_s = 4/3；面积路标是根式。`, `μ = 1/3: Δτ/Δt = 1/2, r/r_s = 4/3; the areal landmarks are radicals.`]
          };
    }
    if (s === 'horizon') {
      const h = m.horizon;
      return lens
        ? {
            long: [`以焦点为中心（MODEL）：焦点停在中央，二十条品红关系弧涌来；μ = ${h.exact ? fstr(h.mu.q) : fmt(h.mu.x, 3)} 时 κ_mass ${is(h.km)}，青色齿轮 Δτ/Δt ${is(h.rate)}，与静止画布透镜相同。`, `Centred on the focus (MODEL): the focus stays in the middle while twenty magenta relation arcs pour in; at μ = ${h.exact ? fstr(h.mu.q) : fmt(h.mu.x, 3)}, κ_mass ${is(h.km)} and the cyan gear has Δτ/Δt ${is(h.rate)}, as in the static-canvas lens.`],
            fig: [`第一人称（MODEL）：同样饱和，同样停摆。`, `First person (MODEL): the same saturation, the same stall.`]
          }
        : {
            long: [`紫色球从 μ = 1/2 滑向青色虚线视界 μ = 1。品红的二十条关系弧一条条点亮，柱子里品红 κ_mass ${is(h.km)} 挤掉青色；紫色主飞轮照样每拍转八分之一圈，青色内部齿轮的速率 Δτ/Δt ${is(h.rate)}，到 μ = 1 停在 0。`, `The violet sphere slides from μ = 1/2 towards the dashed cyan horizon μ = 1. The twenty magenta relation arcs light up one by one and magenta κ_mass ${is(h.km)} crowds out the cyan in the column; the violet master still turns an eighth of a turn a beat, while the cyan inner gear runs at Δτ/Δt ${is(h.rate)} and stops at 0 when μ = 1.`],
            fig: [`μ = 1：二十条弧占满带宽，主飞轮照转，内部齿轮停在 0。`, `μ = 1: twenty arcs fill the bandwidth, the master turns, the inner gear stops at 0.`]
          };
    }
    const v = m.wave;
    return lens
      ? {
          long: [`以焦点为中心（MODEL）：焦点停在中央，波前像被品红箭头拉向团簇；这支“牛顿拉力”是错觉，偏折只来自两翼的速度差 Δv = 411/4000。`, `Centred on the focus (MODEL): the focus stays in the middle and the front seems pulled towards the cluster by the magenta arrow; this Newtonian pull is an illusion, the bending comes only from the difference of the flank speeds Δv = 411/4000.`],
          fig: [`第一人称（MODEL）：品红拉力是错觉，偏折来自 Δv。`, `First person (MODEL): the magenta pull is an illusion; Δv bends the front.`]
        }
      : {
          long: [`青色波前横跨 μ = 1/3 与 1/4 两环。内翼（品红轨迹）的沟纹更密，以 9/32 前进，外翼（青色轨迹）以 48/125 前进，差 411/4000：波前每走一步都向质量一侧转一点，到 t = ${fmt(v.t, 1)} 已转过约 ${fmt((v.turned * 180) / PI, 1)}°，离开墨色虚线直线，没有任何拉力箭头。`, `The cyan front spans the rings μ = 1/3 and 1/4. The inner flank (magenta track) reads denser grooves and advances at 9/32, the outer (cyan track) at 48/125, a difference of 411/4000: at every step the front turns a little towards the mass, by about ${fmt((v.turned * 180) / PI, 1)}° at t = ${fmt(v.t, 1)}, leaving the dashed ink straight line without any pull arrow.`],
          fig: [`9/32 对 48/125：速度差让波前转向质量。`, `9/32 against 48/125: the speed difference turns the front.`]
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
    if (!low && s !== 'wave') N('sphere', off(add(o.C, scale(ZUP, RB)), 0, 16), tiny ? '𝕋₃' : '𝕋₃ ≅ S³', 'c-vi');
    const hr = placeAt(1, PI * 0.9).P;
    if (!tiny && s !== 'wave') N('horizon', off(hr, 0, -12), L('视界 μ = 1', 'horizon μ = 1'), 'c-cy');
    if (s === 'groove') {
      const g = m.groove;
      for (let i = 0; i < CELLS; i++) if (!low || i === g.ptr) N('cell' + i, off(placeAt(ADDR_R[i]).P, -26, 12), `D(${i}) = ${fstr(DMEM[i])}`, 'c-cy');
      N('ptr', off(o.P, 24, -16), `r ${isb(g.reg)}`, 'c-am');
      if (!tiny) N('still', off(placeAt(RMAX * 0.8, -PI * 0.55).P, 0, 0), L('∂ₜS = 0 · 沟纹改写 0 次', '∂ₜS = 0 · grooves rewritten 0 times'), 'c-ik');
      if (lens && !low) N('moved', off(placeAt(RMAX * 0.7, PI * 0.5).P, 0, 0), L(`搬动 ${g.shift} 格`, `${g.shift} cells moved`), 'c-ik');
    }
    if (s === 'gear' || s === 'horizon') {
      const g = m.gear,
        h = m.horizon,
        e = columnAxes(),
        top = add(pp(COL_X, COL_Y0, 0.05), scale(e[1], COL_H * PAN.h)),
        self = s === 'gear' ? g.self : h.exact ? num(minus(ONE, h.km.q)) : flo(1 - h.km.x),
        km = s === 'gear' ? g.km : h.km;
      N('lid', off(top, 0, 14), `${ROM} ≡ 1`, 'c-ik');
      if (!tiny) {
        const mid = (a, b) => add(pp(COL_X, COL_Y0, 0.05), scale(e[1], ((a + b) / 2) * COL_H * PAN.h));
        const sx = s === 'gear' ? g.self.x : 1 - h.km.x,
          kx = s === 'gear' ? g.kin.x : 0;
        if (sx > 0.06) N('kSelf', off(mid(0, sx), -48, 0), `${KS} ${isb(self)}`, 'c-cy');
        if (kx > 0.06) N('kKin', off(mid(sx, sx + kx), -48, 0), `${KK} ${isb(g.kin)}`, 'c-vi');
        N('kMass', off(mid(sx + kx, 1), -48, 0), `${KM} ${isb(km)}`, 'c-mg');
      }
      N('master', off(wheelPoint(FW_M, PI * 0.25), 22, 10), `ν${sub2('0')} = 1`, 'c-vi');
      N('gearRate', off(wheelPoint(0, 0), 0, -FW_G * PAN.h * sc.unit - 26), `Δτ/Δt ${s === 'gear' ? isb(g.clock) : isb(h.rate)}`, 'c-cy');
      N('mu', off(o.P, 22, -16), s === 'gear' ? `μ = ${fstr(g.mu.q)}` : muText(h.mu), 'c-am');
      if (s === 'horizon' && !low) N('arcs', off(add(scale(add(CL_C, o.C), 0.5), [0, 0, 0.36]), 0, 12), L(`亮弧 ${arcText(h)} / 20`, `lit arcs ${arcText(h)} / 20`), 'c-mg');
    }
    if (s === 'land') {
      const l = m.land;
      N('X', off(ccPoint(l.rate.x / 2, 0), 0, -14), `Δτ/Δt ${isb(l.rate)}`, 'c-cy');
      if (l.Y.x > 0.08) N('Y', off(ccPoint(l.rate.x, l.Y.x / 2), 30, 0), `√${KM} ${isb(l.Y)}`, 'c-mg');
      if (!tiny) N('circle', off(ccPoint(-0.7, 0.71), -6, 12), 'X² + Y² = 1', 'c-ik');
      if (!tiny) N('antipode', off(ccPoint(-1, 0), 0, -16), '[p : 0]', 'c-ik');
      N('stop', off(o.P, 24, -16), muText(l.mu), 'c-am');
      if (!tiny) for (const a of AREAL) N('areal' + fstr(a.q), off(placeAt(a.R, -PI * 0.32).P, 0, 0), `r/r${sub2('s')} = ${fstr(a.q)}`, 'c-mg');
    }
    if (s === 'wave') {
      const v = m.wave,
        fin = planePoint(...rayAt(0, v.t).slice(0, 2)),
        fout = planePoint(...rayAt(NRAY - 1, v.t).slice(0, 2));
      N('vin', off(fin, -18, -14), `v${sub2('in')} = ${fstr(v.vin.q)}`, 'c-mg');
      N('vout', off(fout, 18, 14), `v${sub2('out')} = ${fstr(v.vout.q)}`, 'c-cy');
      N('t', off(planePoint(...v.mid.slice(0, 2)), 24, -16), named('t', v.exact, v.t, v.t), 'c-am');
      if (!tiny) N('straight', off(planePoint(1.6, 3.5), 0, 12), L('无介质的直线', 'straight path'), 'c-ik');
      if (lens && !low) {
        const inner = planePoint(...rayAt(0, v.t).slice(0, 2), 0.05);
        N('pull', off(add(inner, scale(unit(sub([0, 0, inner[2]], inner)), 0.42)), 0, -14), L('“拉力”（错觉）', '“pull” (illusion)'), 'c-mg');
      }
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d./]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>');
  const ACTS = {
    groove: ['下一个地址 ▸', 'Next address ▸'],
    gear: ['下一拍 ▸', 'Next beat ▸'],
    land: ['下一个路标 ▸', 'Next landmark ▸'],
    horizon: ['μ + 1/20 ▸', 'μ + 1/20 ▸'],
    wave: ['t + 1 ▸', 't + 1 ▸']
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
  /** The μ of the present focus, as a double. */
  function muNow(m) {
    switch (state.scene) {
      case 'gear':
        return m.gear.mu.x;
      case 'land':
        return m.land.mu.x;
      case 'horizon':
        return m.horizon.mu.x;
      case 'wave':
        return 1 / hypot(m.wave.mid[0], m.wave.mid[1]);
      default:
        return m.groove.mu.x;
    }
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const lens = state.lens,
      Rf = sphereNow().R;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').textContent = lens ? L('以焦点为原点：焦点不动，Δτ/Δt 的截面滑过（MODEL）', 'Focus as origin: the focus stays, the section of Δτ/Δt slides past (MODEL)') : state.scene === 'groove' ? L('沿射线读到什么：静止时钟的速率 Δτ/Δt 与唱针的沟纹信号', 'What the needle reads along the ray: the static clock rate Δτ/Δt and the groove signal') : L('沿射线读到什么：静止时钟的速率 Δτ/Δt', 'What the focus reads along the ray: the static clock rate Δτ/Δt');
      $('plotMeta').textContent = `R ${rel(null, Rf, 2)} · Δτ/Δt ${rel(null, Xof(Rf), 3)}`;
      const sc5 = state.scene,
        wavy = sc5 === 'groove',
        massy = sc5 === 'gear' || sc5 === 'horizon' || sc5 === 'land';
      const items = [
        [P.cyan, 'Δτ/Δt = (R − 1)/(R + 1)'],
        ...(wavy ? [[P.cyan, L('沟纹信号 cos 2πT/λ（下移）', 'groove signal cos 2πT/λ (shifted down)')]] : []),
        ...(massy ? [[P.magenta, 'κ_mass = 1 − (Δτ/Δt)²']] : []),
        ...(sc5 === 'wave' ? [[P.ink, L('光速 v = (1 − μ)/(1 + μ)³', 'light speed v = (1 − μ)/(1 + μ)³'), 'dash']] : []),
        ...(sc5 === 'land' ? [[P.magenta, L('面积路标', 'areal landmarks'), 'dot']] : [])
      ];
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12),
        yLo = wavy ? -0.85 : -0.06;
      const x0 = lens ? Rf - 2.5 : 1,
        x1 = lens ? Rf + 2.5 : RMAX,
        g = kit.plot(cv, { x: [x0, x1], y: [yLo, headroom(cv, PAD, rows.length, yLo, 1.05)], pad: PAD });
      const ticks = lens ? [-2, -1, 0, 1, 2].map((d) => [Rf + d, d === 0 ? '0' : String(d).replace('-', '−')]) : [1, 2, 3, 4, 5, 6].map((x) => [x, String(x)]);
      g.axes({ xTicks: ticks, yTicks: [[0, '0'], [1, '1']] });
      const lo = Math.max(1, x0),
        hi = Math.min(RMAX, x1);
      if (hi > lo) {
        g.line(sample(120, (t) => [lerp(lo, hi, t), Xof(lerp(lo, hi, t))]), P.cyan, { width: 1.8 });
        if (massy) g.line(sample(120, (t) => [lerp(lo, hi, t), 1 - Xof(lerp(lo, hi, t)) ** 2]), P.magenta, { width: 1.3 });
        if (sc5 === 'wave') g.line(sample(120, (t) => [lerp(lo, hi, t), vTravF(1 / lerp(lo, hi, t))]), P.ink, { width: 1.1, dash: [4, 3] });
        const sl = Math.max(lo, R_LOW);
        if (wavy && hi > sl) g.line(sample(400, (t) => [lerp(sl, hi, t), -0.55 + 0.2 * cs((TAU * depth(lerp(sl, hi, t))) / LAMBDA)]), P.cyan, { width: 1, alpha: 0.85 });
      }
      if (state.scene === 'groove') ADDR_R.forEach((R, i) => R > x0 && R < x1 && g.dot(R, fval(DMEM[i]), P.cyan, 3.4));
      if (state.scene === 'land') {
        LAND_MU.forEach((mu) => {
          const R = muR(fval(mu));
          if (R > x0 && R < x1 && fval(mu) > 0) g.dot(R, fval(rateQ(mu)), P.cyan, 3);
        });
        for (const a of AREAL) if (a.R > x0 && a.R < x1) g.dot(a.R, a.rate, P.magenta, 3);
      }
      if (state.scene === 'wave') [m.wave.inR, m.wave.outR].forEach((R) => R > x0 && R < x1 && g.dot(R, vTravF(1 / R), P.cyan, 3.2));
      if (Rf >= x0 && Rf <= x1) {
        g.line([[Rf, yLo], [Rf, 1.02]], P.amber, { width: 1 });
        g.dot(Rf, Xof(Rf), P.amber, 4);
      }
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (!cb.clientWidth || !cb.clientHeight) return;
    const b2 = state.scene === 'gear' ? fval(BETA2[state.bi]) : 0,
      mn = muNow(m);
    $('plotTitleB').textContent = L(`沿 μ 的三份带宽：份额在变，总和恒为 1（β² = ${state.scene === 'gear' ? fstr(BETA2[state.bi]) : '0'}）`, `The three shares along μ: the shares change, their sum stays 1 (β² = ${state.scene === 'gear' ? fstr(BETA2[state.bi]) : '0'})`);
    $('plotMetaB').textContent = `μ ${rel(null, mn, 3)}`;
    const items = [
      [P.cyan, L('κ_self：内部时钟', 'κ_self: inner clock')],
      [P.violet, L('κ_kin：运动', 'κ_kin: motion')],
      [P.magenta, L('κ_mass：质量关系', 'κ_mass: mass relations')],
      [P.ink, 'R_Ω ≡ 1']
    ];
    const rows = legendRows(cb, items, cb.clientWidth - PAD[0] - PAD[1] - 12),
      g = kit.plot(cb, { x: [0, 1], y: [0, headroom(cb, PAD, rows.length, 0, 1.06)], pad: PAD });
    g.axes({ xTicks: [[0, '0'], [1 / 3, '1/3'], [0.5, '1/2'], [1, '1']], yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
    const xs = sample(80, (t) => t),
      self = (u) => (1 - kMassF(u)) * (1 - b2),
      kin = (u) => (1 - kMassF(u)) * b2;
    g.poly([...xs.map((u) => [u, 0]), ...xs.slice().reverse().map((u) => [u, self(u)])], P.cyan, { alpha: 0.42 });
    if (b2 > 0) g.poly([...xs.map((u) => [u, self(u)]), ...xs.slice().reverse().map((u) => [u, self(u) + kin(u)])], P.violet, { alpha: 0.42 });
    g.poly([...xs.map((u) => [u, self(u) + kin(u)]), ...xs.slice().reverse().map((u) => [u, 1])], P.magenta, { alpha: 0.34 });
    g.line([[0, 1], [1, 1]], P.ink, { width: 1.8 });
    if (mn >= 0 && mn <= 1) {
      g.line([[mn, 0], [mn, 1.03]], P.amber, { width: 1.2 });
      g.dot(mn, self(mn), P.amber, 3.6);
    }
    drawLegend(g, rows);
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    switch (state.scene) {
      case 'groove':
        return L(`查询 query(D, a) 只把 D(a) 加进寄存器：指针每步改写 1 个字（O(1)），搬画布每步改写 |S| = ${CELLS} 个格子（Θ(|S|)）；两者读到同一串 D。`, `A query query(D, a) only adds D(a) to the register: the pointer rewrites 1 word a step (O(1)), moving the canvas |S| = ${CELLS} cells a step (Θ(|S|)); both read the same D.`);
      case 'gear':
        return L(`(Δτ/Δt)² = ${KS}：时钟的速率平方就是留给内部时钟的那一份；cosh² r − sinh² r = 1 给出运动的那一份。`, `(Δτ/Δt)² = ${KS}: the squared rate of the clock is the share left for the inner clock; cosh² r − sinh² r = 1 gives the share of motion.`);
      case 'land':
        return m.land.pq ? L(`μ = p²/q²，(p, q) = (${m.land.pq.join(', ')})：Δτ/Δt = cayleyX(p, q)，${KM} = cayleyY(p, q)²，κ(p, q) = 1/(1 + μ) ${is(m.land.kap)}。`, `μ = p²/q² with (p, q) = (${m.land.pq.join(', ')}): Δτ/Δt = cayleyX(p, q), ${KM} = cayleyY(p, q)², κ(p, q) = 1/(1 + μ) ${is(m.land.kap)}.`) : L(`μ 不是有理数的平方：Δτ/Δt 与 ${KM} 仍是有理数，只有 √${KM} 是根式。`, `μ is not the square of a rational: Δτ/Δt and ${KM} are still rational, only √${KM} is a radical.`);
      case 'horizon':
        return L(`视界 μ = 1 是射影点 [1 : 1]（cayleyX = 0）；对径点 [p : 0] 属于 μ → ∞，是坐标的另一端，不是视界。`, `The horizon μ = 1 is the projective point [1 : 1] (cayleyX = 0); the antipode [p : 0] belongs to μ → ∞, the far end of the chart, not the horizon.`);
      default:
        return L(`折射率 n = 1/v：内翼 ${fstr(m.wave.nin.q)}，外翼 ${fstr(m.wave.nout.q)}；两翼的初始（t = 0）间距 ΔR = 1，波前在 t = 0 时每单位坐标时间转过 Δv/ΔR = 411/4000 弧度（初始转向速率）。`, `The index n = 1/v: ${fstr(m.wave.nin.q)} on the inner flank, ${fstr(m.wave.nout.q)} on the outer; the initial (t = 0) flank separation is ΔR = 1, so the initial turning rate of the front is Δv/ΔR = 411/4000 radians per unit of coordinate time.`);
    }
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      g = m.groove,
      e = m.gear,
      l = m.land,
      h = m.horizon,
      v = m.wave;
    const keys = {
      groove: () => `r ${is(g.reg)} · ${L('沟纹改写', 'groove writes')} 0`,
      gear: () => `${fstr(e.self.q)} + ${fstr(e.kin.q)} + ${fstr(e.km.q)} ${is(e.sum)}`,
      land: () => `Δτ/Δt ${is(l.rate)} · ${l.rrs ? `r/r${sub2('s')} ${is(l.rrs)}` : `r/r${sub2('s')} → ∞`}`,
      horizon: () => `${KM} ${is(h.km)} · Δτ/Δt ${is(h.rate)}`,
      wave: () => `Δv ${is(v.dv)}`
    };
    put('roKey', keys[state.scene]());
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roGroove', `${g.f === 0 ? g.ptr : rel(null, g.t, 2).replace('≈ ', '≈')} · ${short(g.D)} · ${short(g.reg)} · ${g.roll} / 0 / ${g.shift}`);
    put('roGear', `${short(e.self)} + ${short(e.kin)} + ${short(e.km)} ${is(e.sum)}`);
    put('roClock', `${brief(e.clock)} · ${short(e.clock2)} · 1 · ${short(e.cosh2)} − ${short(e.sinh2)} ${is(e.hyp)}`);
    put('roLand', `${short(l.mu)} · ${short(l.rate)} · ${short(l.rR)} · ${l.rrs ? short(l.rrs) : '∞'} · ${short(l.km)}`);
    put('roWave', `${short(v.vin)} · ${short(v.vout)} · ${short(v.dv)} · ${short(v.nin)} / ${short(v.nout)}`);
    put('roNote', readNote(m));
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${state.lens ? name.replace(/ ?[（(]MODEL[）)]/, '') : name}</strong>`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = {
      groove: 'query(D, a, r) = (a, r + D(a)) · D(a) = (1 − μ)/(1 + μ)',
      gear: 'κ<sub>self</sub> + κ<sub>kin</sub> + κ<sub>mass</sub> = 1 · (Δτ/Δt)² = κ<sub>self</sub>',
      land: 'r = R(1 + μ)² · Δτ/Δt = (1 − μ)/(1 + μ) · r/r<sub>s</sub> = (1 + μ)²/(4μ)',
      horizon: 'κ<sub>mass</sub> = 4μ/(1 + μ)² → 1 · Δτ/Δt → 0',
      wave: 'v(μ) = (1 − μ)/(1 + μ)³ · n(μ) = (1 + μ)³/(1 − μ)'
    }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    const badge = $('lensBadge');
    if (badge.dataset.lens !== String(state.lens)) {
      badge.dataset.lens = String(state.lens);
      badge.innerHTML = `<span class="zh">${LENS_TITLE[state.lens][0]}</span><span class="en">${LENS_TITLE[state.lens][1]}</span>`;
    }
    $('lensMirror').title = L(...LENS_TITLE[state.lens]).replace(/<\/?sub>/g, '').replace(/&amp;/g, '&');
    addrChips.set(g.f === 0 ? String(g.ptr) : null, true);
    muChips.set(String(state.mi), true);
    betaChips.set(String(state.bi), true);
    landChips.set(l.exact ? String(l.k) : null, true);
    horChips.set(h.exact && [0, 5, 8, 10].includes(h.k) ? String(h.k) : null, true);
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
    rate: RAILS.groove.rate,
    step: 1,
    max: RAILS.groove.max,
    t: STILL.groove,
    format: (t) => {
      const v = settled(t),
        int = Number.isInteger(v);
      switch (state.scene) {
        case 'gear':
          return `t = ${int ? v : kit.fix(v, 2)}`;
        case 'land':
          return int ? `μ = ${fstr(LAND_MU[v])}` : `μ ≈ ${kit.fix(landAt(v).mu.x, 3)}`;
        case 'horizon':
          return int ? `μ = ${fstr(fr(10 + v, 20))}` : `μ ≈ ${kit.fix(horMu(v), 3)}`;
        case 'wave':
          return `t = ${int ? v : kit.fix(v, 2)}`;
        default:
          return `a = ${int ? v : kit.fix(v, 2)}`;
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
  const addrChips = kit.chips($('addrChips'), 'addr', (v) => steer('groove', () => clock.set(Number(v))));
  const muChips = kit.chips($('muChips'), 'mu', (v) => steer('gear', () => (state.mi = Number(v))));
  const betaChips = kit.chips($('betaChips'), 'beta', (v) => steer('gear', () => (state.bi = Number(v))));
  const landChips = kit.chips($('landChips'), 'land', (v) => steer('land', () => clock.set(Number(v))));
  const horChips = kit.chips($('horChips'), 'hor', (v) => steer('horizon', () => clock.set(Number(v))));
  /** One unit of the rail forward, from the start again once the end is reached. The card stays marked. */
  function stepOne() {
    stopBootPlay();
    clock.pause();
    const r = rail(),
      k = Math.round(state.at[state.scene]);
    if (r.whole) {
      clock.set(k >= r.max ? 0 : k + 1);
      return;
    }
    if (k >= r.max) clock.set(0);
    stopAt = (k >= r.max ? 0 : k) + 1;
    clock.play();
  }
  $('stageAct').addEventListener('click', stepOne);
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
  const FRAME = { pq: 6, schur: 3, schurY: 36, heap: 8, box: 2, records: 20 };
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
  /** Integer quaternions [w, x, y, z] as big integers. */
  const imul = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const iconj = (a) => [a[0], -a[1], -a[2], -a[3]];
  const idot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0n);
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
    return { addrs, allWires, clean, route, oneHot, leaf, readAmount, query, same };
  })();
  /** The index of a depth-2 address (b₁, (b₀, ())) in D: b₁ is the outer bit. */
  const addrIndex = (a) => (a[0] ? 2 : 0) + (a[1][0] ? 1 : 0);
  function benchmarks() {
    const F = FRAME,
      span = (n) => range(2 * n + 1).map((k) => k - n);
    // 1 · the projective circle on every pair (p, q) ≠ (0, 0) of the box: κ + spread = 1 and cayleyX² + cayleyY² = 1;
    // the antipode [p : 0] for p ≠ 0
    let circleTried = 0,
      kapBad = 0,
      unitBad = 0,
      antiBad = 0;
    for (const p of span(F.pq))
      for (const q of span(F.pq)) {
        if (!p && !q) continue;
        circleTried++;
        const P2 = BigInt(p * p),
          Q2 = BigInt(q * q),
          N = P2 + Q2,
          kap = frac(Q2, N),
          spr = frac(P2, N),
          X = frac(Q2 - P2, N),
          Y = frac(BigInt(2 * p * q), N);
        if (!equal(plus(kap, spr), ONE)) kapBad++;
        if (!equal(plus(sq(X), sq(Y)), ONE)) unitBad++;
        if (q === 0 && !(equal(kap, ZERO) && equal(spr, ONE) && equal(X, neg(ONE)) && equal(Y, ZERO))) antiBad++;
      }
    // 2 · the page: on every μ = a/b with 0 ≤ a ≤ b ≤ 12 and β² ∈ {0, 1/5, 2/5, 3/5}: (1 − κ_mass) = X², the three shares add
    // to 1 and (Δτ/Δt)² = κ_self for the moving clock; the square stops μ = p²/q² give X = cayleyX(p, q), κ_mass = cayleyY²
    let shareTried = 0,
      shareBad = 0,
      squareBad = 0;
    const squares = [];
    for (let b = 1; b <= 12; b++)
      for (let a = 0; a <= b; a++) {
        const mu = fr(a, b),
          X = rateQ(mu),
          km = kMassQ(mu);
        for (const b2 of [ZERO, fr(1, 5), fr(2, 5), fr(3, 5)]) {
          shareTried++;
          const self = times(minus(ONE, km), minus(ONE, b2)),
            kin = times(minus(ONE, km), b2),
            clock2 = times(sq(X), minus(ONE, b2));
          if (!equal(minus(ONE, km), sq(X)) || !equal(plus(plus(self, kin), km), ONE) || !equal(clock2, self)) shareBad++;
        }
        const root = rootQ(mu);
        if (root && a > 0 && gcdB(BigInt(a), BigInt(b)) === 1n) {
          const [p, q] = root,
            N = p * p + q * q,
            cx = frac(q * q - p * p, N),
            cy = frac(2n * p * q, N);
          if (!equal(cx, X) || !equal(sq(cy), km) || !equal(frac(q * q, N), quo(ONE, plus(ONE, mu)))) squareBad++;
          squares.push(fstr(mu));
        }
      }
    // 3 · the landmarks of the page and the areal stops
    const rates = LAND_MU.map(rateQ),
      rrs13 = rOverRsQ(fr(1, 3)),
      arealRoots = AREAL.map((a) => rootQ(a.rate2));
    // 4 · the Schur completion and minimum on a grid of rationals
    let schurTried = 0,
      schurBad = 0,
      minBad = 0;
    const vals = [fr(-3, 2), fr(-1, 1), fr(-1, 3), ZERO, fr(1, 2), fr(1, 1), fr(5, 3)];
    for (const a of vals)
      for (const b of vals)
        for (const c of vals) {
          if (c[0] === 0n) continue;
          for (const x of [fr(-1, 2), ONE, fr(3, 2)]) {
            const shift = times(quo(b, c), x),
              value = times(minus(a, quo(sq(b), c)), sq(x)),
              form = (y) => plus(plus(times(a, sq(x)), times(times(times(whole(2), b), x), y)), times(c, sq(y)));
            for (const y of [fr(-2, 1), fr(-1, 3), ZERO, fr(3, 4), fr(2, 1)]) {
              schurTried++;
              if (!equal(form(y), plus(value, times(c, sq(plus(y, shift)))))) schurBad++;
            }
            if (cmp(c, ZERO) > 0) {
              const ystar = neg(shift);
              if (!equal(form(ystar), value)) minBad++;
              for (let j = -F.schurY; j <= F.schurY; j++) if (cmp(form(fr(j, 12)), value) < 0) minBad++;
            }
          }
        }
    // 5 · the Gram determinants of the 20 triads of the cluster and of a box of integer quaternions
    const gram = (a, b, c) => {
      const na = idot(a, a),
        nb = idot(b, b),
        nc = idot(c, c),
        ab = idot(a, b),
        bc = idot(b, c),
        ca = idot(c, a);
      return minus(minus(minus(plus(ONE, times(whole(2), frac(ab * bc * ca, na * nb * nc))), frac(ab * ab, na * nb)), frac(bc * bc, nb * nc)), frac(ca * ca, nc * na));
    };
    const CQ = CLUSTER_Q.map((q) => q.map(BigInt));
    let triads = 0,
      gramBad = 0,
      gramMin = null;
    for (let i = 0; i < CQ.length; i++)
      for (let j = i + 1; j < CQ.length; j++)
        for (let k = j + 1; k < CQ.length; k++) {
          triads++;
          const d = gram(CQ[i], CQ[j], CQ[k]);
          if (cmp(d, ZERO) < 0) gramBad++;
          if (!gramMin || cmp(d, gramMin) < 0) gramMin = d;
        }
    const BOXQ = [];
    for (const w of [0, 1, 2]) for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [0, 1]) if (w || x || y || z) BOXQ.push([w, x, y, z].map(BigInt));
    let boxTried = 0;
    for (let i = 0; i < BOXQ.length; i += 3)
      for (let j = 1; j < BOXQ.length; j += 4)
        for (let k = 2; k < BOXQ.length; k += 5) {
          boxTried++;
          if (cmp(gram(BOXQ[i], BOXQ[j], BOXQ[k]), ZERO) < 0) gramBad++;
        }
    // 6 · FRACTRAN determinism: whenever ψA = p·q, q is ψA/p and no other quaternion gives p·q′ = ψA
    let fracTried = 0,
      fracBad = 0;
    for (const psi of CQ)
      for (const A of [...CQ, [1n, 1n, 1n, 1n], [3n, 0n, 4n, 0n]])
        for (const p of [2n, 3n, 5n, 13n]) {
          const prod = imul(psi, A);
          if (prod.some((x) => x % p !== 0n)) continue;
          fracTried++;
          const q1 = prod.map((x) => x / p),
            q2 = imul(psi, A).map((x) => x / p);
          if (!q1.every((x, i) => x * p === prod[i]) || !q1.every((x, i) => x === q2[i])) fracBad++;
        }
    // 7 · heaps of Pythagorean spinors: x₀ = a, x₁ = b, x_{n+2} = x_{n+1} x_n* x_{n+1}, numerators over r^(…); squared norm 1
    const spinors = [
      [[1n, 0n, 0n, 0n], 1n],
      [[3n, 4n, 0n, 0n], 5n],
      [[12n, 0n, 5n, 0n], 13n],
      [[1n, 2n, 2n, 4n], 5n],
      [[2n, 3n, 6n, 0n], 7n]
    ];
    let heapTried = 0,
      heapBad = 0;
    for (const a of spinors)
      for (const b of spinors) {
        const xs = [a, b];
        for (let n = 2; n <= F.heap; n++) {
          const [u, ru] = xs[n - 1],
            [v, rv] = xs[n - 2];
          xs.push([imul(imul(u, iconj(v)), u), ru * rv * ru]);
        }
        for (const [m, r] of xs) {
          heapTried++;
          if (idot(m, m) !== r * r) heapBad++;
        }
      }
    // 8 · the null cones of the medium: at μ = 1/3 and 1/4 the coordinate null vectors (1, v cos ψ, v sin ψ) at nine rational ψ;
    // the quadratic forms vanishing on them form a line spanned by v² t² − x² − y² (rank 5 of the 6 monomials)
    const monos = ([t, x, y]) => [times(t, t), times(x, x), times(y, y), times(t, x), times(t, y), times(x, y)];
    const coneRows = [V_IN, V_OUT, ONE].map((v) => {
      const vecs = [0, 5, 10, 15, 20, 25, 30, 35, 40].map((k) => {
        const u = fr(k - 20, 20),
          den = plus(ONE, sq(u));
        return [ONE, times(v, quo(minus(ONE, sq(u)), den)), times(v, quo(times(whole(2), u), den))];
      });
      const rows = vecs.map(monos),
        Q = [sq(v), neg(ONE), neg(ONE), ZERO, ZERO, ZERO],
        onCone = rows.every((r) => equal(r.reduce((s, x, i) => plus(s, times(x, Q[i])), ZERO), ZERO));
      return { v, rank: rankQ(rows), onCone };
    });
    // 9 · the rapidity of the moving clock: cosh² r = 1/(1 − β²), sinh² r = β²/(1 − β²), difference 1; β = 3/5 gives 5/4, 3/4
    const boosts = [fr(2, 5), fr(9, 25)].map((b2) => {
      const ch2 = quo(ONE, minus(ONE, b2)),
        sh2 = quo(b2, minus(ONE, b2));
      return { b2, ch2, sh2, ch: rootQ(ch2), sh: rootQ(sh2), hyp: minus(ch2, sh2) };
    });
    // 10 · the record slots: ħ = 1 and energy = π/4 give τ ≥ πħ/(4·energy) = 1 per record; in T = 20 at most 20 fit
    const tauMin = (PI * 1) / (4 * (PI / 4)),
      countMax = (4 * (PI / 4) * F.records) / (PI * 1);
    // 11 · complementary projections onto integer lines of ℝ³
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
    // 12 · the QRAM of depth 2 with D = [2/3, 3/5, 1/2, 1/3] in ℚ: routing a clean register lights the leaf a alone; the query
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
        const r = fr(1, 7),
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
    // the register of the needle: query after query from r = 0
    let reg = ZERO;
    const regs = [];
    for (let i = 0; i < CELLS; i++) {
      const a = A2.find((x) => addrIndex(x) === i);
      reg = QR.query(2, Dq, [a, QR.clean(2, true), reg], plus, ZERO)[2];
      regs.push(reg);
    }
    // 13 · the observable Krylov tower of the pointer: T moves the readout one cell on, C reads cell 0; dimensions 1, 2, 3, 4
    const Tt = range(4).map((i) => range(4).map((j) => (i === j + 1 ? 1 : 0))),
      tower = [];
    let gen = [[1, 0, 0, 0]],
      vec = [1, 0, 0, 0];
    for (let k = 0; k <= 6; k++) {
      tower.push(rankOf(gen));
      vec = range(4).map((i) => range(4).reduce((s, j) => s + Tt[i][j] * vec[j], 0));
      gen = [...gen, vec];
    }
    const strict = tower.filter((d, k) => k + 1 < tower.length && tower[k + 1] > d).length;
    // 14 · the readout topology of the frame reversal: states (ptr t, shift s) read D[(t + s) mod 4]; two states lie in the
    // same open sets exactly when they read the same, and (t, 0) ~ (0, t)
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
    // 15 · the front: the exact flank speeds and the turning of the traced front
    const w8 = waveAt(WAVE_T);
    return {
      circle: { tried: circleTried, kapBad, unitBad, antiBad, box: F.pq },
      shares: { tried: shareTried, bad: shareBad, squareBad, squares },
      landmarks: { rates, rrs13, arealRoots: arealRoots.map((r) => r === null) },
      schur: { tried: schurTried, bad: schurBad, minBad, grid: 2 * F.schurY + 1 },
      gram: { triads, boxTried, bad: gramBad, min: gramMin },
      fractran: { tried: fracTried, bad: fracBad },
      heap: { tried: heapTried, bad: heapBad, spinors: spinors.length },
      nullCone: coneRows,
      boosts,
      records: { tauMin, countMax, n: F.records },
      proj: { tried: projTried, bad: projBad },
      qram: { leafBad, queryBad, cleanBad, configs, images: seen4.size, regs },
      krylov: { tower, strict, bound: 4 - 1 },
      topology: { pairs, bad: insepBad, reversal },
      wave: { vin: V_IN, vout: V_OUT, dv: minus(V_OUT, V_IN), turnedDeg: (w8.turned * 180) / PI }
    };
  }
  const BENCH = benchmarks();
  const DEMO = { groove: grooveAt(STILL.groove), gear: gearAt(BEATS, 2, 1), hover: gearAt(BEATS, 2, 0), horizon: horizonAt(HOR) };
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    reg: () => `= ${fstr(DEMO.groove.reg.q)}`,
    roll: () => String(DEMO.groove.roll),
    shift: () => String(DEMO.groove.shift),
    split: () => `${fstr(DEMO.gear.self.q)} + ${fstr(DEMO.gear.kin.q)} + ${fstr(DEMO.gear.km.q)} = ${fstr(DEMO.gear.sum.q)}`,
    clock: () => `${say(DEMO.gear.clock)} ((Δτ/Δt)² = ${fstr(DEMO.gear.clock2.q)})`,
    hover: () => `= ${fstr(DEMO.hover.clock.q)}`,
    rates: () => BENCH.landmarks.rates.map(fstr).join(', '),
    rrs: () => `= ${fstr(BENCH.landmarks.rrs13)}`,
    kmax: () => `= ${fstr(DEMO.horizon.km.q)}`,
    stall: () => `= ${fstr(DEMO.horizon.rate.q)}`,
    vin: () => `= ${fstr(BENCH.wave.vin)} ${relQ(BENCH.wave.vin, 5)}`,
    vout: () => `= ${fstr(BENCH.wave.vout)} ${relQ(BENCH.wave.vout, 5)}`,
    dv: () => `= ${fstr(BENCH.wave.dv)} ${relQ(BENCH.wave.dv, 5)}`
  };
  /** The text of the NUM box. */
  function numText(sayIt) {
    const B = BENCH,
      list = (xs) => xs.join(sayIt('、', ', ')),
      bad = (n) => sayIt(`不符 ${n} 处`, `${n} failures`),
      cones = list(B.nullCone.map((c) => `v = ${fstr(c.v)}${sayIt('：秩 ', ': rank ')}${c.rank}${c.onCone ? '' : sayIt('（不在其中）', ' (not in it)')}`)),
      boosts = list(B.boosts.map((b) => `β² = ${fstr(b.b2)}: cosh² r = ${fstr(b.ch2)}, sinh² r = ${fstr(b.sh2)}, ${sayIt('差', 'difference')} ${fstr(b.hyp)}`));
    return sayIt(
      `打开页面时由脚本用分数现算，是上面各条定理的个别实例，不检验定理的前提。射影圆：|p|, |q| ≤ ${B.circle.box} 的 ${B.circle.tried} 个点上 κ + spread = 1 ${bad(B.circle.kapBad)}，cayleyX² + cayleyY² = 1 ${bad(B.circle.unitBad)}，对径点 [p : 0] ${bad(B.circle.antiBad)}。页面的分账：μ = a/b（0 ≤ a ≤ b ≤ 12）与四个 β² 共 ${B.shares.tried} 组上 1 − κ_mass = (Δτ/Δt)²、三份之和为 1、运动时钟的 (Δτ/Δt)² = κ_self ${bad(B.shares.bad)}；平方点 μ = ${list(B.shares.squares)} 上 Δτ/Δt = cayleyX(p, q)、κ_mass = cayleyY²、κ(p, q) = 1/(1 + μ) ${bad(B.shares.squareBad)}。路标的时钟率 ${list(B.landmarks.rates.map(fstr))}；μ = 1/3 时 r/r_s = ${fstr(B.landmarks.rrs13)}；面积路标的 (Δτ/Δt)² = 1/5、1/3、1/2 都没有有理平方根${B.landmarks.arealRoots.every(Boolean) ? '' : '（不符）'}。舒尔：${B.schur.tried} 组有理数上配方恒等式${bad(B.schur.bad)}；c > 0 时最小值在 y = −(b/c)x 取到，${B.schur.grid} 个 y 上无更小值，${bad(B.schur.minBad)}。格拉姆：团簇 2 ± i、2 ± j、2 ± k 的 ${B.gram.triads} 个三元组与另外 ${B.gram.boxTried} 个整数四元数三元组上 detGram3 ≥ 0 ${bad(B.gram.bad)}，团簇里最小为 ${fstr(B.gram.min)}。分数指令：${B.fractran.tried} 次整除的解码唯一${bad(B.fractran.bad)}。旋子堆：${B.heap.spinors} 个毕达哥拉斯旋子两两成堆、各 ${FRAME.heap + 1} 项共 ${B.heap.tried} 项模方为 1 ${bad(B.heap.bad)}。零锥：九个有理零向量上为 0 的二次型（${cones}）都是 v²t² − x² − y² 的倍数。快度：${boosts}。记录：ħ = 1、能量 π/4 时每条记录至少 τ ${rel(ONE, B.records.tauMin)}，T = ${B.records.n} 内至多 ${rel(whole(B.records.n), B.records.countMax)} 条。正交补：${B.proj.tried} 条整数直线上六条恒等式${bad(B.proj.bad)}。QRAM（深度 2，D = [2/3, 3/5, 1/2, 1/3]）：干净路由只点亮地址 a 的叶线${bad(B.qram.leafBad)}，查询等于 r + readAmount(route a w) ${bad(B.qram.queryBad)}，干净线上加上 D a ${bad(B.qram.cleanBad)}；唱针逐址查询的寄存器依次为 ${list(B.qram.regs.map(fstr))}；在 ℤ/4 上 ${B.qram.configs} 个构型的像有 ${B.qram.images} 个${B.qram.images === B.qram.configs ? '，是双射' : '，不是双射'}。克雷洛夫塔的维数 ${list(B.krylov.tower)}：严格增长 ${B.krylov.strict} 次，不超过 4 − 1 = ${B.krylov.bound}。读出拓扑：${B.topology.pairs} 对状态 (指针, 平移) 中不可分当且仅当读数相等${bad(B.topology.bad)}；(t, 0) 与 (0, t) 读数相同${B.topology.reversal ? '' : '（不符）'}。波前：v_in = ${fstr(B.wave.vin)}、v_out = ${fstr(B.wave.vout)}、Δv = ${fstr(B.wave.dv)}；九条光线按 n(R) 用四阶龙格—库塔积到 t = ${WAVE_T}，中线转过约 ${fmt(B.wave.turnedDeg, 1)}°（浮点数值积分）。数值演示，不是证明。`,
      `Computed in fractions by the script when the page opens, single instances of the theorems above; it does not check their hypotheses. Projective circle: on the ${B.circle.tried} points with |p|, |q| ≤ ${B.circle.box}, κ + spread = 1, ${bad(B.circle.kapBad)}; cayleyX² + cayleyY² = 1, ${bad(B.circle.unitBad)}; the antipode [p : 0], ${bad(B.circle.antiBad)}. The split of the page: on ${B.shares.tried} pairs (μ = a/b with 0 ≤ a ≤ b ≤ 12, four values of β²), 1 − κ_mass = (Δτ/Δt)², the three shares add to 1 and the moving clock has (Δτ/Δt)² = κ_self, ${bad(B.shares.bad)}; on the squares μ = ${list(B.shares.squares)}, Δτ/Δt = cayleyX(p, q), κ_mass = cayleyY² and κ(p, q) = 1/(1 + μ), ${bad(B.shares.squareBad)}. The clock rates of the landmarks are ${list(B.landmarks.rates.map(fstr))}; at μ = 1/3, r/r_s = ${fstr(B.landmarks.rrs13)}; the areal landmarks have (Δτ/Δt)² = 1/5, 1/3 and 1/2, none with a rational square root${B.landmarks.arealRoots.every(Boolean) ? '' : ' (failed)'}. Schur: the completion on ${B.schur.tried} rational tuples, ${bad(B.schur.bad)}; for c > 0 the least value at y = −(b/c)x, none smaller over ${B.schur.grid} values of y, ${bad(B.schur.minBad)}. Gram: detGram3 ≥ 0 on the ${B.gram.triads} triads of the cluster 2 ± i, 2 ± j, 2 ± k and ${B.gram.boxTried} further triples of integer quaternions, ${bad(B.gram.bad)}, the least in the cluster ${fstr(B.gram.min)}. FRACTRAN: ${B.fractran.tried} exact divisions decode uniquely, ${bad(B.fractran.bad)}. Spinor heaps: ${B.heap.spinors} Pythagorean spinors taken in pairs, ${FRAME.heap + 1} terms each, ${B.heap.tried} terms of squared norm 1, ${bad(B.heap.bad)}. Null cones: the quadratic forms vanishing on nine rational null vectors (${cones}) are multiples of v²t² − x² − y². Rapidity: ${boosts}. Records: with ħ = 1 and energy π/4 each record takes at least τ ${rel(ONE, B.records.tauMin)}, and at most ${rel(whole(B.records.n), B.records.countMax)} records fit in T = ${B.records.n}. Complements: the six identities on ${B.proj.tried} integer lines, ${bad(B.proj.bad)}. QRAM (depth 2, D = [2/3, 3/5, 1/2, 1/3]): clean routing lights the leaf of a alone, ${bad(B.qram.leafBad)}; the query is r + readAmount(route a w), ${bad(B.qram.queryBad)}; on clean wires it adds D a, ${bad(B.qram.cleanBad)}; the register of the needle, query after query, runs ${list(B.qram.regs.map(fstr))}; over ℤ/4 the ${B.qram.configs} configurations have ${B.qram.images} images${B.qram.images === B.qram.configs ? ', a bijection' : ', not a bijection'}. The Krylov tower has dimensions ${list(B.krylov.tower)}: ${B.krylov.strict} strict steps, at most 4 − 1 = ${B.krylov.bound}. Readout topology: of ${B.topology.pairs} pairs of states (pointer, shift), inseparable exactly when the readings agree, ${bad(B.topology.bad)}; (t, 0) and (0, t) read the same${B.topology.reversal ? '' : ' (failed)'}. Front: v_in = ${fstr(B.wave.vin)}, v_out = ${fstr(B.wave.vout)}, Δv = ${fstr(B.wave.dv)}; nine rays traced through n(R) by fourth-order Runge–Kutta to t = ${WAVE_T}, the middle one turned by about ${fmt(B.wave.turnedDeg, 1)}° (a floating-point integration). A numerical illustration, not a proof.`
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
  function getState() {
    const m = calc(),
      o = sphereNow();
    return plainJSON({
      ...m,
      at: state.at,
      scene: state.scene,
      regime: regimeOf(m),
      lens: state.lens,
      lensT: state.lensT,
      mi: state.mi,
      bi: state.bi,
      cam: state.cam,
      layers: layers(),
      clock: clock.t,
      t: clock.t,
      max: clock.max,
      playing: clock.playing,
      preset: cards.current,
      blending: !!(state.from && state.blend < 1),
      camera: { ...sc.cam },
      sphere: { R: o.R, az: o.az, mu: 1 / o.R, rate: Xof(o.R), centre: o.C, contact: o.P, screen: sc.p(o.C).slice(0, 2) },
      view: { cx: opts.cx, cy: opts.cy, radius: opts.radius, titleTop: title.top }
    });
  }
  window.__constantRateGravityLab = Object.freeze({
    getState,
    get state() {
      return getState();
    },
    /** The mathematics at a state, without touching the page. */
    calc: (over = {}) => plainJSON(compute({ ...FRESH, ...over, at: { ...STILL, ...(over.at || {}) } })),
    presets: plainJSON(PRESETS),
    /** The exact core, for tests. */
    core: {
      groove: (t) => plainJSON(grooveAt(t)),
      gear: (t, mi = FRESH.mi, bi = FRESH.bi) => plainJSON(gearAt(t, mi, bi)),
      land: (k) => plainJSON(landAt(k)),
      horizon: (k) => plainJSON(horizonAt(k)),
      wave: (t) => plainJSON(waveAt(t)),
      memory: () => plainJSON(DMEM),
      landmarks: () => plainJSON(LAND_MU),
      areal: () => plainJSON(AREAL)
    },
    /** What the NUM box and the drawer are written from. */
    bench: () => plainJSON({ ...BENCH, frame: FRAME }),
    /** The world geometry: the chart, the ray, the grooves and the rays of the front. */
    geometry: () => plainJSON({ RMAX, RX, S, HZ, Z0, RB, out: OUT, perp: PERP, theta: TH0, grooves: GROOVES, lambda: LAMBDA, addresses: ADDR_R, lensTitles: LENS_TITLE }),
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
