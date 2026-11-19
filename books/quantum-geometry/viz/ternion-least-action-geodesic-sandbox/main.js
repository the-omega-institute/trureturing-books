/* TERNION//GEODESIC · 三元数场的最小作用量与测地线沙盘 · Least action as sagitta (Chapter 37, §37.2)
   The ternion field of the chapter is one rotor σ ∈ B₁(ℝ³) (modified Rodrigues coordinates, chapter axes e₁, e₂, e₃)
   per beat. A beat δ = (−σₜ₋₁) ⋆ σₜ turns by Δθ = 4 arctan‖δ‖ and pays the sagitta 1 − cos Δθ = 2q_MRP(δ) = 2P_leak.
   World (kit.solid): z up. Chapter coordinates map to world as (c₁, c₂, c₃) ↦ (c₂, c₃, c₁): the common axis û = e₁ is
   the vertical violet axis, and the orthogonal probe n̂₀ = e₃ starts on the equator.
     sphere   the Bloch sphere of the probe n̂ₜ = R(σₜ)n̂₀ (opaque, violet, shaded by the Born weight (1 + n̂₀·n̂)/2
              against the starting probe); paths are drawn as shortest-gate arcs between the probes of the beats;
              each beat raises a bar parallel to the axis of length 0.5 (1 − cos Δθ) (MODEL scale).
     plate    the spinor slice: the great circle of S³ through +1 and i, always facing the reader, with the rational
              coordinate axis (the slice of B₁ through i) across it; the line from −1 through Ψ meets it at ‖δ‖.
   Scenes: step (one beat), heap (point-reflection relay), cadence (even beats against a last-beat jump), detour (the
   chapter's mirror detours and the flat chord), focus (Jacobi focusing and the conformal gradient).
   The rail τ ∈ [0, 1] runs along the drawn path; the parameters do not move with it.
   Every number is computed here; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.TERNION_GEODESIC_DEBUG = { state, calc, presets }. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => {
    const n = norm(a);
    return n > 0 ? scale(a, 1 / n) : a.slice();
  };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));

  /* ---------- quaternions, rotors and the ternion product ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = (q) => [q[0], -q[1], -q[2], -q[3]];
  /** The unit quaternion ((1 − s²) + 2σ)/(1 + s²) of a rotor σ (inverse stereographic projection from −1). */
  const toQ = (s) => {
    const s2 = dot(s, s);
    return [(1 - s2) / (1 + s2), (2 * s[0]) / (1 + s2), (2 * s[1]) / (1 + s2), (2 * s[2]) / (1 + s2)];
  };
  /** Back to B₁: the representative with w ≥ 0 (the quotient B₁/∼ glues the antipodes of the boundary). */
  const toS = (q) => {
    const k = q[0] < 0 ? -1 : 1,
      w = k * q[0];
    return [(k * q[1]) / (1 + w), (k * q[2]) / (1 + w), (k * q[3]) / (1 + w)];
  };
  const star = (a, b) => toS(qmul(toQ(a), toQ(b)));
  const neg = (s) => s.map((x) => -x);
  /** The heap bracket [x, y, z] = x ⋆ (−y) ⋆ z. */
  const heap = (x, y, z) => star(x, star(neg(y), z));
  const rotq = (q, v) => qmul(qmul(q, [0, ...v]), qconj(q)).slice(1);
  const E1 = [1, 0, 0],
    N0 = [0, 0, 1];
  const mrpAbout = (axis, angle) => scale(axis, Math.tan(angle / 4));
  /** Chapter coordinates → world. */
  const W = (c) => [c[1], c[2], c[0]];
  const probe = (s) => W(rotq(toQ(s), N0));
  const AXIS = W(E1);

  /** One beat from σa to σb: its rotor, angle and the three rulers. */
  function beatOf(sa, sb) {
    const qr = qmul(qconj(toQ(sa)), toQ(sb));
    // at the half-turn cut locus cos(Δθ/2) vanishes; rounding leaves ~1e-16, which would print a finite surprisal
    const w0 = Math.abs(qr[0]),
      w = w0 < 1e-12 ? 0 : Math.min(1, w0);
    const delta = toS(qr),
      nd = norm(delta);
    const dTheta = 4 * Math.atan(nd);
    const v = 1 - cs(dTheta),
      q2 = (8 * nd * nd) / (1 + nd * nd) ** 2,
      stay = w * w,
      leak2 = 2 * (1 - stay);
    return { delta, nd, dTheta, v, q2, leak2, stay, I: stay > 0 ? -Math.log(stay) : Infinity, w };
  }
  function ledger(path, count) {
    const beats = [];
    for (let t = 1; t <= count; t++) beats.push(beatOf(path[t - 1], path[t]));
    return {
      beats,
      S: beats.reduce((s, b) => s + b.v, 0),
      stay: beats.reduce((p, b) => p * b.stay, 1),
      I: beats.reduce((s, b) => s + b.I, 0)
    };
  }

  /* ---------- the paths of the five scenes (chapter coordinates) ---------- */
  const evenPath = (N, span) => Array.from({ length: N + 1 }, (_, k) => mrpAbout(E1, (k * span) / N));
  const jumpPath = (N, span) => Array.from({ length: N + 1 }, (_, k) => (k < N ? [0, 0, 0] : mrpAbout(E1, span)));
  const DETOUR = [
    [0, 0, 0],
    [1 / 6, 1 / 6, 0],
    [1 / 3, 1 / 4, 0],
    [1 / 2, 1 / 6, 0],
    [1 / Math.sqrt(3), 0, 0]
  ];
  const detourPath = (sign) => DETOUR.map(([x, y, z]) => [x, sign * y, z]);
  function relayPath(step, N) {
    const p = [[0, 0, 0], mrpAbout(E1, step)];
    for (let t = 1; t < N; t++) p.push(heap(p[t], p[t - 1], p[t]));
    return p;
  }
  /* Jacobi focusing: initial deviation J₀ (an angle) and initial rate J̇₀ of the two neighbours of the ridge. */
  const J0 = 0.16,
    JD = 0.16;
    const GRAD = [0.48, -0.6, 0.64]; // a test gradient ∇L of unit length for the conformal check
  const WDIR = [0.6, 0.8, 0]; // the direction of σ_W in the chart

  /* ---------- 2 × 2 complex matrices, Choi vectors ---------- */
  const cm = (re, im = 0) => [re, im];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const mmul = (X, Y) => X.map((row, i) => Y[0].map((_, j) => row.reduce((s, x, k) => { const p = cmul(x, Y[k][j]); return [s[0] + p[0], s[1] + p[1]]; }, [0, 0])));
  const madd = (X, Y) => X.map((row, i) => row.map((x, j) => [x[0] + Y[i][j][0], x[1] + Y[i][j][1]]));
  const mscale = (X, z) => X.map((row) => row.map((x) => cmul(x, z)));
  const adj = (X) => X[0].map((_, j) => X.map((row) => cconj(row[j])));
  const gap = (X, Y) => Math.max(...X.flatMap((row, i) => row.map((x, j) => hypot(x[0] - Y[i][j][0], x[1] - Y[i][j][1]))));
  const I2 = [[cm(1), cm(0)], [cm(0), cm(1)]];
  const SX = [[cm(0), cm(1)], [cm(1), cm(0)]],
    SY = [[cm(0), cm(0, -1)], [cm(0, 1), cm(0)]],
    SZ = [[cm(1), cm(0)], [cm(0), cm(-1)]];
  const pauli = (a) => madd(madd(mscale(SX, cm(a[0])), mscale(SY, cm(a[1]))), mscale(SZ, cm(a[2])));
  /** The SU(2) matrix of a unit quaternion (i ↦ −iσx, j ↦ −iσy, k ↦ −iσz). */
  const su2 = (q) => [
    [cm(q[0], -q[3]), cm(-q[2], -q[1])],
    [cm(q[2], -q[1]), cm(q[0], q[3])]
  ];
  /** The Choi vector (U ⊗ I)|Φ⁺⟩ = vec(U)/√2. */
  const choi = (q) => su2(q).flat().map((z) => [z[0] / Math.SQRT2, z[1] / Math.SQRT2]);
  const inner = (a, b) => a.reduce((s, x, k) => { const p = cmul(cconj(x), b[k]); return [s[0] + p[0], s[1] + p[1]]; }, [0, 0]);
  const fsAngle = (a, b) => Math.acos(Math.min(1, hypot(...inner(a, b))));
  /** rotor a b = (1 + σ_b σ_a)/√(2(1 + a·b)) of the Lean statement. */
  const rotor = (a, b) => mscale(madd(I2, mmul(pauli(b), pauli(a))), cm(1 / Math.sqrt(2 * (1 + dot(a, b)))));
  function triangle(a, b, c) {
    const S = 1 + dot(a, b) + dot(b, c) + dot(c, a);
    let D = dot(a, cross(b, c));
    if (Math.abs(D) < 1e-12) D = 0;
    return { S, D, lhs: S * S + D * D, rhs: 2 * (1 + dot(a, b)) * (1 + dot(b, c)) * (1 + dot(c, a)), omega: 2 * Math.atan2(D, S) };
  }

  /* ---------- the state; during a card transition the angles blend from `from` (kit.tween) ---------- */
  const state = { scene: 'cadence', stepDeg: 120, spanDeg: 120, beats: 4, sigmaW: 0.8, lens: 0, from: null, blend: 1 };
  function eff() {
    const keys = ['stepDeg', 'spanDeg', 'sigmaW'];
    const out = Object.fromEntries(keys.map((k) => [k, state[k]]));
    if (state.from && state.blend < 1) for (const k of keys) out[k] = lerp(state.from[k], state[k], state.blend);
    return out;
  }
  const SCENES = ['step', 'heap', 'cadence', 'detour', 'focus'];
  const CAMS = { step: [2.09, 0.62], heap: [2.09, 0.62], cadence: [2.09, 0.62], detour: [2.09, 0.2], focus: [1.963, 0.36] };
  const presets = {
    'sagitta-mrp-surprisal-lock': { scene: 'step', stepDeg: 120, play: true, still: 'end' },
    'heap-autoparallel-point-reflection': { scene: 'heap', stepDeg: 30, play: true, still: 'end' },
    'uniform-cadence-vs-jump-hallucination': { scene: 'cadence', spanDeg: 120, beats: 4, play: true, still: 'end' },
    'lateral-detour-vs-chord-collapse': { scene: 'detour', play: true, still: 'end' },
    'jacobi-focusing-conformal-gradient': { scene: 'focus', sigmaW: 0.8, play: true, still: 'end' }
  };
  const ids = Object.keys(presets);

  /* ---------- everything the page shows, from the (blended) state and the rail ---------- */
  function calculate(tau) {
    const e = eff(),
      scene = state.scene;
    const stepRad = e.stepDeg * deg,
      span = e.spanDeg * deg,
      N = state.beats;
    let main,
      other = null,
      mirror = null,
      count,
      progress,
      perBeat;
    if (scene === 'step') {
      // one beat, opened by the rail from 0 to Δθ
      main = [[0, 0, 0], mrpAbout(E1, tau * stepRad)];
      count = 1;
      progress = 1;
      perBeat = stepRad;
    } else if (scene === 'heap') {
      main = relayPath(stepRad, 4);
      count = 1 + Math.min(3, Math.floor(3 * tau + 1e-9)); // σ₂, σ₃, σ₄ appear at τ = 1/3, 2/3, 1
      progress = count;
      perBeat = stepRad;
    } else if (scene === 'cadence') {
      main = evenPath(N, span);
      other = jumpPath(N, span);
      count = Math.min(N, Math.floor(N * tau + 1e-9));
      progress = N * tau;
      perBeat = span / N;
    } else if (scene === 'detour') {
      main = detourPath(1);
      mirror = detourPath(-1);
      other = evenPath(4, 120 * deg);
      count = Math.min(4, Math.floor(4 * tau + 1e-9));
      progress = 4 * tau;
      perBeat = 30 * deg;
    } else {
      main = evenPath(4, PI);
      count = Math.min(4, Math.floor(4 * tau + 1e-9));
      progress = 4 * tau;
      perBeat = PI / 4;
    }
    const led = ledger(main, count);
    const full = ledger(main, main.length - 1);
    const otherLed = other ? ledger(other, count) : null,
      otherFull = other ? ledger(other, other.length - 1) : null;
    const probes = main.map(probe);
    // the latest probe triangle (t − 1, t, t + 1) among the beats taken so far
    let tri = null;
    const k = Math.max(2, count);
    if (main.length >= 3) {
      const a = probes[k - 2],
        b = probes[k - 1],
        c = probes[k];
      const anti = [[a, b], [b, c], [c, a]].some(([x, y]) => dot(x, y) < -1 + 1e-9);
      tri = { ...triangle(a, b, c), anti, at: k - 1 };
    }
    // the detour loop: out along the path, back along the even geodesic, cut into triangles from the start
    let loop = null;
    if (scene === 'detour') {
      const back = other.map(probe);
      const loopOf = (path) => {
        const pr = path.map(probe),
          verts = [...pr.slice(1), ...back.slice(1, -1).reverse()];
        let omega = 0,
          re = 1,
          im = 0;
        const parts = [];
        for (let j = 0; j + 1 < verts.length; j++) {
          const t = triangle(pr[0], verts[j], verts[j + 1]);
          omega += t.omega;
          const r = Math.sqrt(t.lhs),
            ph = [t.S / r, -t.D / r];
          [re, im] = [re * ph[0] - im * ph[1], re * ph[1] + im * ph[0]];
          parts.push(t);
        }
        return { omega, phase: [re, im], parts };
      };
      const plus = loopOf(main),
        minus = loopOf(mirror);
      loop = { plus, minus, average: [(plus.phase[0] + minus.phase[0]) / 2, (plus.phase[1] + minus.phase[1]) / 2] };
    }
    // the step rotors ω and the sideways torque of the latest pair
    const omegas = led.beats.map((b) => b.delta);
    let torque = null;
    {
      const allOm = full.beats.map((b) => b.delta),
        j = Math.max(0, Math.min(allOm.length - 2, count - 2));
      if (allOm.length >= 2) {
        const u = allOm[j],
          v = allOm[j + 1];
        const lhs = dot(u, u) * dot(v, v) - dot(u, v) ** 2;
        let rhs = 0;
        for (let i = 0; i < 3; i++) for (let m = 0; m < 3; m++) rhs += (u[i] * v[m] - u[m] * v[i]) ** 2;
        torque = { u, v, lhs, rhs: rhs / 2, cross: norm(cross(u, v)) ** 2, at: j + 1 };
      }
    }
    // the flat chord of the two ends (their representatives in B₁)
    const U0 = toQ(main[0]),
      UN = toQ(main[main.length - 1]);
    const mid = scale(add(U0, UN), 0.5);
    const chord = { U0, UN, mid, norm2: dot(mid, mid), pulled: unit(mid) };
    // the conformal gradient at σ_W = ‖σ_W‖ · WDIR
    const s = e.sigmaW,
      s2 = s * s;
    const grad = { s, factor: ((1 + s2) ** 2) / 4, metric: 4 / (1 + s2) ** 2, lambda: 2 / (1 + s2) };
    // Jacobi: the deviation of the two neighbours at the ridge parameter of the rail
    const sNow = scene === 'focus' ? tau * PI : 0;
    const jacobi = { s: sNow, sphere: J0 * cs(sNow) + JD * sn(sNow), exact: Math.asin(sn(J0) * cs(sNow) + JD * cs(J0) * sn(sNow)), flat: J0 + JD * sNow };
    const latest = led.beats.length ? led.beats[led.beats.length - 1] : beatOf([0, 0, 0], [0, 0, 0]);
    return {
      scene,
      lens: state.lens,
      stepDeg: e.stepDeg,
      spanDeg: e.spanDeg,
      beats: N,
      sigmaW: e.sigmaW,
      tau,
      perBeat,
      count,
      progress,
      path: main,
      other,
      mirror,
      probes,
      ledger: { S: led.S, stay: led.stay, I: led.I, beats: led.beats.map(({ delta, nd, dTheta, v, q2, leak2, stay, I }) => ({ delta, nd, dTheta, v, q2, leak2, stay, I })) },
      total: { S: full.S, stay: full.stay, I: full.I },
      otherLedger: otherLed && { S: otherLed.S, stay: otherLed.stay, I: otherLed.I },
      otherTotal: otherFull && { S: otherFull.S, stay: otherFull.stay, I: otherFull.I },
      latest: { delta: latest.delta, nd: latest.nd, dTheta: latest.dTheta, v: latest.v, q2: latest.q2, leak2: latest.leak2, stay: latest.stay, I: latest.I },
      omegas,
      triangle: tri,
      loop,
      torque,
      chord,
      grad,
      jacobi
    };
  }

  /** The instances of the cited Lean theorems at the current state, computed here. */
  const CHOI_0 = choi(toQ([0, 0, 0])),
    CHOI_PI = choi(toQ(mrpAbout(E1, PI))),
    CHOI_MID = choi(toQ(mrpAbout(E1, PI / 2)));
  function instances(m) {
    const qs = m.path.map(toQ),
      ch = qs.map(choi);
    // Fubini–Study triangle along the beats of the whole path
    const fsBeats = ch.slice(1).map((c, t) => fsAngle(ch[t], c));
    const fs = { beats: fsBeats, sum: fsBeats.reduce((a, b) => a + b, 0), ends: fsAngle(ch[0], ch[ch.length - 1]) };
    // Born weight and Schur minimum of the latest beat (at least the first)
    const t = Math.max(1, m.count);
    const prev = ch[t - 1],
      cur = ch[t];
    const ip = inner(prev, cur);
    const weight = ip[0] ** 2 + ip[1] ** 2;
    // Tr(ρP) with ρ = |cur⟩⟨cur|, P = |prev⟩⟨prev|
    let trace = 0;
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        const rho = cmul(cur[i], cconj(cur[j])),
          proj = cmul(prev[j], cconj(prev[i]));
        trace += cmul(rho, proj)[0];
      }
    const b = inner(cur, prev)[0];
    let least = Infinity,
      arg = 0;
    for (let y = -1.5; y <= 1.5 + 1e-12; y += 0.0005) {
      const v = cur.map((z, k) => [z[0] + y * prev[k][0], z[1] + y * prev[k][1]]);
      const q = inner(v, v)[0];
      if (q < least) {
        least = q;
        arg = y;
      }
    }
    // shortest rotors along the beats of the whole path
    let unitary = 0,
      carry = 0;
    for (let k = 1; k < m.probes.length; k++) {
      const a = m.probes[k - 1],
        c = m.probes[k];
      if (dot(a, c) < -1 + 1e-9) continue;
      const R = rotor(a, c);
      unitary = Math.max(unitary, gap(mmul(R, adj(R)), I2));
      carry = Math.max(carry, gap(mmul(mmul(R, pauli(a)), adj(R)), pauli(c)));
    }
    // the triangle of the latest three beats: rotor c a · rotor b c · rotor a b against (S I − iD a·σ)/√(S² + D²)
    let holonomy = null;
    if (m.triangle && !m.triangle.anti && m.triangle.lhs > 1e-12) {
      const j = m.triangle.at,
        [a, bb, c] = [m.probes[j - 1], m.probes[j], m.probes[j + 1]];
      const prod = mmul(mmul(rotor(c, a), rotor(bb, c)), rotor(a, bb));
      const r = Math.sqrt(m.triangle.lhs);
      const want = mscale(madd(mscale(I2, cm(m.triangle.S)), mscale(pauli(a), cm(0, -m.triangle.D))), cm(1 / r));
      holonomy = { gap: gap(prod, want), identity: Math.abs(m.triangle.lhs - m.triangle.rhs), phase: [m.triangle.S / r, -m.triangle.D / r] };
    }
    // a stationary energy eigenstate: H = û·σ, v its +1 eigenvector, U = exp(−itH) = cos t I − i sin t H
    const H = pauli([1, 0, 0]); // û = e₁ in the chapter frame of the spin matrices
    const tt = m.tau * PI;
    const U = madd(mscale(I2, cm(cs(tt))), mscale(H, cm(0, -sn(tt))));
    const v = [cm(Math.SQRT1_2), cm(Math.SQRT1_2)];
    const rho = v.map((x) => v.map((y) => cmul(x, cconj(y))));
    const stationary = { t: tt, unitary: gap(mmul(U, adj(U)), I2), drift: gap(mmul(mmul(U, rho), adj(U)), rho) };
    // the observable Krylov tower of one beat: span{(Tᵀ)ᵏ n̂₀ : k ≤ m}
    const T = (x) => rotq(toQ(mrpAbout(E1, -m.perBeat)), x); // Tᵀ = R(û, −Δθ)
    const dims = [];
    const basis = [];
    let gen = N0.slice();
    for (let stage = 0; stage <= 5; stage++) {
      let r = gen.slice();
      for (const e of basis) r = sub(r, scale(e, dot(r, e)));
      if (norm(r) > 1e-9) basis.push(unit(r));
      dims.push(basis.length);
      gen = T(gen);
    }
    // the conformal gradient: Choi quantum Fisher matrix and the right pull-back by finite differences
    const sw = scale(WDIR, m.sigmaW),
      h = 1e-5;
    const psi = choi(toQ(sw));
    const dpsi = [0, 1, 2].map((i) => {
      const ep = sw.slice(),
        em = sw.slice();
      ep[i] += h;
      em[i] -= h;
      const a = choi(toQ(ep)),
        c = choi(toQ(em));
      return a.map((z, k) => [(z[0] - c[k][0]) / (2 * h), (z[1] - c[k][1]) / (2 * h)]);
    });
    const fisher = [0, 1, 2].map((i) => [0, 1, 2].map((j) => {
      const a = inner(dpsi[i], dpsi[j]),
        bi = inner(dpsi[i], psi),
        bj = inner(psi, dpsi[j]);
      return 4 * (a[0] - cmul(bi, bj)[0]);
    }));
    const fisherGap = Math.max(...fisher.flatMap((row, i) => row.map((x, j) => Math.abs(x - (i === j ? 4 * m.grad.metric : 0)))));
    const JR = [0, 1, 2].map((k) => {
      const d = [0, 0, 0];
      d[k] = h;
      return scale(sub(star(sw, d), star(sw, neg(d))), 1 / (2 * h));
    }); // JR[k] = ∂(σ ⋆ δ)/∂δ_k, the k-th column
    const JRt = JR.map((col) => dot(col, GRAD));
    const pullback = dot(JRt, JRt) / 4;
    return {
      fs,
      recordTime: { orth: hypot(...inner(CHOI_0, CHOI_PI)), fs0: fsAngle(CHOI_MID, CHOI_0), fs1: fsAngle(CHOI_MID, CHOI_PI), bound: PI / 4 },
      born: { weight, trace, stay: m.latest.stay, leak: 1 - weight },
      schur: { b, least, arg, complement: 1 - b * b },
      rotors: { unitary, carry },
      holonomy,
      lagrange: m.torque,
      stationary,
      krylov: dims,
      conformal: { fisherGap, pullback, riemann: m.grad.factor * dot(GRAD, GRAD), metric: m.grad.metric }
    };
  }

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('geoHandle');
  const opts = { canvas: $('cv'), yaw: CAMS.cadence[0], pitch: CAMS.cadence[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const camAxes = () => {
    const y = sc.cam.yaw,
      p = sc.cam.pitch;
    return { R: [cs(y), -sn(y), 0], U: [sn(y) * sn(p), cs(y) * sn(p), cs(p)], D: [-sn(y) * cs(p), -cs(y) * cs(p), sn(p)] };
  };
  const tube = (key, pts, color, r, extra = {}) => sc.tube(key, pts, { color, r, glow: 0.25, occlude: false, pick: false, ...extra });
  /** A shortest-gate arc between two unit vectors (along the rotation about û when they are antipodal). */
  function arc(a, b, n = 24) {
    const c = clamp(dot(a, b), -1, 1);
    if (c < -1 + 1e-9) {
      const az = Math.atan2(a[1], a[0]);
      return sample(n, (u) => [cs(az + u * PI) * hypot(a[0], a[1]), sn(az + u * PI) * hypot(a[0], a[1]), a[2]]);
    }
    const th = Math.acos(c);
    if (th < 1e-9) return sample(1, () => a.slice());
    return sample(n, (u) => add(scale(a, sn((1 - u) * th) / sn(th)), scale(b, sn(u * th) / sn(th))));
  }
  /** The probe path through the beats, up to the continuous beat index `upto`. */
  function polyline(probes, upto, n = 24) {
    const out = [probes[0]];
    for (let k = 1; k < probes.length && k - 1 < upto; k++) {
      const f = Math.min(1, upto - (k - 1));
      const pts = arc(probes[k - 1], probes[k], n);
      const cut = Math.max(1, Math.round(f * n));
      out.push(...pts.slice(1, cut + 1));
    }
    return out;
  }
  const at = (probes, b) => {
    const k = Math.min(probes.length - 1, Math.floor(b)),
      f = b - k;
    if (k >= probes.length - 1) return probes[probes.length - 1];
    const pts = arc(probes[k], probes[k + 1], 48);
    return pts[Math.round(f * 48)];
  };
  const lift = (pts, r) => pts.map((p) => scale(p, r));
  /* The sagitta of a beat is drawn as a bar parallel to the axis û, of length BAR · (1 − cos Δθ) (MODEL scale). */
  const BAR = 0.5;
  const turnZ = (p, a) => [p[0] * cs(a) - p[1] * sn(a), p[0] * sn(a) + p[1] * cs(a), p[2]];
  const equator = (th) => W(rotq(toQ(mrpAbout(E1, th)), N0));
  function bar(key, p, v, color, offset = 0) {
    const base = scale(offset ? turnZ(p, offset) : p, 1.012);
    if (v > 1e-6) tube(key, [base, add(base, scale(AXIS, BAR * v))], color, 0.021);
    return add(base, scale(AXIS, BAR * v));
  }

  /* ---------- labels, HUD, legend ---------- */
  const SCENE_NAME = {
    step: ['单拍', 'ONE BEAT'],
    heap: ['接力', 'RELAY'],
    cadence: ['节拍', 'CADENCE'],
    detour: ['绕路', 'DETOUR'],
    focus: ['聚焦', 'FOCUS']
  };
  const LENS_NAME = [
    ['矢高与测地', 'SAGITTA & GEODESIC'],
    ['宇宙与推理', 'COSMOS & REASONING']
  ];
  function title(m) {
    const name = L(...SCENE_NAME[m.scene]);
    if (m.scene === 'step') return `${name} · 1 − cos Δθ = ${fmt(m.latest.v)}`;
    if (m.scene === 'heap') return `${name} · Ω = ${m.triangle && !m.triangle.anti ? (m.triangle.S > 0 ? '0' : '2π') : '—'}`;
    if (m.scene === 'cadence') return `${name} · S ${fmt(m.ledger.S)} vs ${fmt(m.otherLedger.S)}`;
    if (m.scene === 'detour') return `${name} · S ${fmt(m.ledger.S)} · |m|² ${fmt(m.chord.norm2)}`;
    return `${name} · ¼(1 + ‖σ‖²)² = ${fmt(m.grad.factor)}`;
  }
  function subline(m) {
    const lens = state.lens;
    if (m.scene === 'step') {
      if (m.latest.dTheta >= PI - 1e-9)
        return L('Δθ = 180°：有理坐标到达单位球边界 ‖δ‖ = 1，留存为 0，惊奇度发散。', 'Δθ = 180°: the rational coordinate reaches the unit sphere ‖δ‖ = 1, the stay is 0 and the surprisal diverges.');
      return lens
        ? L(`一拍转 ${fmt(m.latest.dTheta / deg, 1)}°：每一单位矢高都按节拍付账，惊奇度 I = ${fmt(m.latest.I)} nat。`, `A beat of ${fmt(m.latest.dTheta / deg, 1)}°: every unit of sagitta is paid in beats; surprisal I = ${fmt(m.latest.I)} nat.`)
        : L(`一拍转 ${fmt(m.latest.dTheta / deg, 1)}°：品红的漏失腿与有理坐标 ‖δ‖ = ${fmt(m.latest.nd)} 给出同一个数。`, `A beat of ${fmt(m.latest.dTheta / deg, 1)}°: the magenta leak leg and the rational coordinate ‖δ‖ = ${fmt(m.latest.nd)} give the same number.`);
    }
    if (m.scene === 'heap') {
      if (!m.triangle || m.triangle.anti) return L('每拍 90°：第三拍落在第一拍的对径点，最短门不唯一。', 'At 90° per beat the third beat is antipodal to the first: the shortest gate is not unique.');
      return m.triangle.S > 0
        ? L(`两拍共 ${fmt((2 * m.stepDeg), 0)}° &lt; 180°：新珠是前一颗关于支点的镜像，三角形角盈 Ω = 0，相位 +1。`, `Two beats make ${fmt(2 * m.stepDeg, 0)}° &lt; 180°: each new bead mirrors the one before through the pivot; excess Ω = 0, phase +1.`)
        : L(`两拍共 ${fmt((2 * m.stepDeg), 0)}° &gt; 180°：第三边走补弧，围出品红的半球 Ω = 2π，相位 −1。`, `Two beats make ${fmt(2 * m.stepDeg, 0)}° &gt; 180°: the third side takes the other arc and encloses the magenta hemisphere, Ω = 2π, phase −1.`);
    }
    if (m.scene === 'cadence')
      return lens
        ? L(`匀速推理链每拍付一点；末步跳步前 ${m.beats - 1} 拍空转，最后一拍付清 ${fmt(m.otherTotal.S)}。`, `A steady chain of reasoning pays a little each beat; the leap idles ${m.beats - 1} beats and pays ${fmt(m.otherTotal.S)} at the end.`)
        : L(`同样转 ${fmt(m.spanDeg, 0)}°：青色 ${m.beats} 拍共付 ${fmt(m.total.S)}，品红一跳付 ${fmt(m.otherTotal.S)}，是 ${fmt(m.otherTotal.S / m.total.S)} 倍。`, `Over the same ${fmt(m.spanDeg, 0)}°: ${m.beats} cyan beats pay ${fmt(m.total.S)}, one magenta jump pays ${fmt(m.otherTotal.S)}, ${fmt(m.otherTotal.S / m.total.S)} times as much.`);
    if (m.scene === 'detour')
      return L(`品红的两条镜像绕路各付 ${fmt(m.total.S)}，围出 ±Ω = ±${fmt(Math.abs(m.loop.plus.omega))} sr；平直弦中点的模方只剩 ${fmt(m.chord.norm2)}。`, `Each magenta mirror detour pays ${fmt(m.total.S)} and encloses ±Ω = ±${fmt(Math.abs(m.loop.plus.omega))} sr; the flat chord midpoint keeps a squared norm of only ${fmt(m.chord.norm2)}.`);
    return L(`s = ${fmt(m.jacobi.s / deg, 0)}°：球面上的偏离 ${fmt(m.jacobi.sphere)} 按余弦回摆，平直空间里 ${fmt(m.jacobi.flat)} 线性漂开。`, `s = ${fmt(m.jacobi.s / deg, 0)}°: on the sphere the deviation ${fmt(m.jacobi.sphere)} swings back as a cosine; in flat space ${fmt(m.jacobi.flat)} drifts away linearly.`);
  }
  function legendItems(m) {
    const geo = !state.lens;
    const items = [['vi', geo ? L('探针球与转轴 û', 'probe sphere, axis û') : L('宇宙 / 推理的状态球', 'state sphere')]];
    if (m.scene === 'cadence') items.push(['cy', geo ? L('匀速测地线', 'even geodesic') : L('惯性 · 匀速推理链', 'inertia · steady chain')], ['mg', geo ? L('末步跳步', 'last-beat jump') : L('跳步幻觉', 'hallucinated leap')]);
    else if (m.scene === 'detour') items.push(['cy', geo ? L('匀速测地线', 'even geodesic') : L('主干推理', 'main chain')], ['mg', geo ? L('侧向绕路 ±Ω 与弦', 'detours ±Ω, chord') : L('兜圈与塌缩', 'loops, collapse')]);
    else if (m.scene === 'focus') items.push(['cy', geo ? L('测地脊与邻线', 'ridge, neighbours') : L('引力聚焦 · 抗噪', 'focusing · robust')], ['mg', geo ? L('平直漂移', 'flat drift') : L('平直空间发散', 'flat divergence')]);
    else if (m.scene === 'heap') items.push(['cy', geo ? L('点反射接力', 'point-reflection relay') : L('自平行思维链', 'self-parallel chain')], ['mg', L('补弧半球', 'wrapped hemisphere')]);
    else items.push(['cy', geo ? L('留存与弧', 'stay, arc') : L('同相留存', 'kept in phase')], ['mg', geo ? L('矢高与漏失', 'sagitta, leak') : L('盲区漏失', 'blind-zone leak')]);
    items.push(['sg', L('旋量切片', 'spinor slice')]);
    return items;
  }
  function hud(m) {
    $('hudBig').innerHTML = title(m);
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems(m).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  // Keep each caption near its anchor and reserve the HUD and handle rectangles.
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const row = box.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = box.left + dx,
          right = box.right + dx,
          top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }

  /* ---------- layout: the sphere and the plate inside the stage rectangle free of the HUD ---------- */
  const PLATE = 0.62,
    GAP = 0.3,
    SPH_X = 1.2,
    SPH_Y = 1.12;
  let frozen = null;
  function fit() {
    if (frozen) return frozen;
    const Wd = stage.clientWidth || 300,
      Hd = stage.clientHeight || 150;
    const sr = stage.getBoundingClientRect();
    const tl = $('hudTl').getBoundingClientRect(),
      lg = $('legend').getBoundingClientRect();
    const top = TRV.thumbMode ? 12 : Math.max(10, (tl.height ? tl.bottom - sr.top : 0) + 6);
    const bottom = TRV.thumbMode ? Hd - 12 : Math.min(Hd - 10, (lg.height ? lg.top - sr.top : Hd) - 6);
    const left = 10,
      w = Wd - 20,
      h = Math.max(40, bottom - top);
    const wideW = 2 * SPH_X + GAP + 2 * PLATE,
      wideH = 2 * SPH_Y,
      tallW = 2 * SPH_X,
      tallH = 2 * SPH_Y + GAP + 2 * PLATE;
    const uw = Math.min(w / wideW, h / wideH),
      ut = Math.min(w / tallW, h / tallH);
    const wide = uw >= ut,
      u = Math.max(8, wide ? uw : ut);
    const cw = (wide ? wideW : tallW) * u,
      chh = (wide ? wideH : tallH) * u;
    const ox = left + (w - cw) / 2,
      oy = top + (h - chh) / 2;
    return { wide, unit: u, cx: ox + SPH_X * u, cy: oy + SPH_Y * u, W: Wd, H: Hd, plate: wide ? [SPH_X + GAP + PLATE, 0] : [0, -(SPH_Y + GAP + PLATE)] };
  }

  /* ---------- the spinor slice plate (always facing the reader) ---------- */
  const RHO = 0.78,
    YC = -0.06;
  function plateFrame(f) {
    const { R, U, D } = camAxes();
    const C = add(scale(R, f.plate[0]), scale(U, f.plate[1]));
    const at2 = (a, b, lift = 0.004) => add(add(C, scale(R, PLATE * a)), add(scale(U, PLATE * b), scale(D, lift)));
    const circ = (phi) => [RHO * sn(phi), YC + RHO * cs(phi)];
    return { C, at2, circ, R, U, D };
  }
  function drawPlate(m, f) {
    const pl = plateFrame(f),
      { at2, circ } = pl;
    const pt = (xy, lift) => at2(xy[0], xy[1], lift);
    const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map((c) => at2(c[0], c[1], 0));
    sc.fan(corners, { fill: P.faint, alpha: 0.22, color: P.dim, strokeAlpha: 0.55 });
    sc.line(sample(96, (u) => pt(circ(u * TAU))), { color: P.sigma, width: 1.4 });
    sc.line([pt([-RHO, YC]), pt([RHO, YC])], { color: P.violet, width: 2.2 });
    for (const x of [-RHO, RHO]) sc.line([pt([x, YC - 0.05]), pt([x, YC + 0.05])], { color: P.violet, width: 1.6 });
    sc.tag('plate', at2(0, 0.93, 0.01), L('旋量切片 · +1 与 i', 'SPINOR SLICE · +1, i'), 'raw backed c-sg', { occlude: false });
    const top = pt(circ(0)),
      bottom = pt(circ(PI));
    sc.bead(top, { color: P.sigma, r: 3, key: 'plateOne' });
    const spinArc = (phi0, phi1, color, width = 3) => sc.line(sample(48, (u) => pt(circ(lerp(phi0, phi1, u)), 0.006)), { color, width });
    if (m.scene === 'step' || m.scene === 'cadence') {
      // the Born split of a beat: the shadow on the +1 axis (√P_stay) and the leak leg (√P_leak)
      const jump = m.scene === 'cadence';
      const phi = jump ? (m.count >= m.beats ? m.spanDeg * deg / 2 : 0) : m.latest.dTheta / 2;
      const phiA = jump ? (m.progress * m.spanDeg * deg) / (2 * m.beats) : phi;
      spinArc(0, phiA, P.cyan);
      if (jump)
        for (let k = 1; k <= m.beats; k++) {
          const p = circ((k * m.spanDeg * deg) / (2 * m.beats));
          if (k <= m.count) sc.bead(pt(p, 0.008), { color: P.cyan, r: 3, key: 'plateBeat' + k });
        }
      const psi = circ(phi);
      const foot = [0, YC + RHO * cs(phi)];
      if (phi > 1e-6) {
        sc.line([pt([0, YC], 0.007), pt(foot, 0.007)], { color: P.cyan, width: 2.4 });
        sc.line([pt(foot, 0.007), pt(psi, 0.007)], { color: P.magenta, width: 2.4 });
        if (!jump) {
          // the stereographic line from −1 through Ψ meets the rational axis at ‖δ‖ = tan(Δθ/4)
          const hitX = RHO * Math.tan(phi / 2);
          sc.line([bottom, pt(psi, 0.006)], { color: P.violet, width: 1.2, dash: [4, 4], alpha: 0.85 });
          sc.bead(pt([Math.min(RHO, hitX), YC], 0.01), { color: P.violet, r: 3.6, key: 'delta' });
          sc.tag('delta', pt([Math.min(RHO, hitX), YC - 0.16], 0.01), `‖δ‖ = ${fmt(m.latest.nd)}`, 'raw backed c-vi', { occlude: false });
        }
        sc.bead(pt(psi, 0.01), { color: jump ? P.magenta : P.cyan, r: 3.4, key: 'plateEnd' });
        sc.tag('leak', pt([Math.max(0.28, psi[0] / 2), foot[1] - 0.13], 0.01), `P<sub>leak</sub> ${fmt(1 - cs(phi) ** 2)}`, 'raw backed c-mg', { occlude: false });
      }
    } else if (m.scene === 'heap') {
      const step = (m.stepDeg * deg) / 2;
      const shown = m.count + 1;
      spinArc(0, step * (shown - 1), P.cyan);
      for (let k = 0; k < shown; k++) sc.bead(pt(circ(k * step), 0.008), { color: P.cyan, r: 3, key: 'plateRelay' + k });
      if (shown >= 3) {
        // σₜ₊₁ is the mirror image of σₜ₋₁ in the diameter through σₜ
        const pivot = circ((shown - 2) * step);
        const dir = [pivot[0] / RHO, (pivot[1] - YC) / RHO];
        sc.line([pt([-dir[0] * RHO, YC - dir[1] * RHO], 0.006), pt(pivot, 0.006)], { color: P.violet, width: 1.2, dash: [4, 4] });
        sc.ring(pt(pivot, 0.01), { color: P.violet, r: 6, normal: pl.D, key: 'platePivot' });
      }
    } else if (m.scene === 'detour') {
      const end = circ((120 * deg) / 2);
      spinArc(0, ((m.progress * 120) / 4) * deg / 2, P.cyan);
      for (let k = 1; k <= 4; k++) if (k <= m.count) sc.bead(pt(circ((k * 15) * deg), 0.008), { color: P.cyan, r: 3, key: 'plateBeat' + k });
      // the flat chord of the quaternion embedding and its midpoint at radius √|m|²
      const m2 = m.chord.norm2,
        r = Math.sqrt(m2);
      const midXY = [RHO * r * sn(PI / 6), YC + RHO * r * cs(PI / 6)];
      sc.line([top, pt(end, 0.006)], { color: P.magenta, width: 2.2 });
      sc.bead(pt(midXY, 0.01), { color: P.magenta, r: 3.6, key: 'chordMid' });
      sc.line([pt(midXY, 0.008), pt(circ(PI / 6), 0.008)], { color: P.cyan, width: 1.6, dash: [3, 3] });
      sc.tag('chord', pt([midXY[0] - 0.5, midXY[1] - 0.12], 0.01), `|m|² = ${fmt(m2)}`, 'raw backed c-mg', { occlude: false });
    } else {
      // the conformal gradient at σ_W on the rational axis, lifted to the circle
      const s = m.sigmaW,
        x = RHO * s;
      const phi = 2 * Math.atan(s);
      const lifted = circ(phi);
      sc.line([bottom, pt(lifted, 0.006)], { color: P.violet, width: 1.2, dash: [4, 4], alpha: 0.85 });
      const L0 = 0.42;
      sc.arrow(pt([x, YC + 0.05], 0.008), pt([x - L0, YC + 0.05], 0.008), { color: P.dim, width: 2, headSize: 7 });
      sc.arrow(pt([x, YC - 0.05], 0.008), pt([x - L0 * m.grad.factor, YC - 0.05], 0.008), { color: P.cyan, width: 2.4, headSize: 7 });
      const tang = [-cs(phi), sn(phi)]; // towards +1 along the circle
      const len = L0 * m.grad.factor * m.grad.lambda;
      sc.arrow(pt(lifted, 0.008), pt([lifted[0] + tang[0] * len, lifted[1] + tang[1] * len], 0.008), { color: P.cyan, width: 2.4, headSize: 7 });
      sc.bead(pt([x, YC], 0.01), { color: P.violet, r: 3.6, key: 'sigmaW' });
      sc.bead(pt(lifted, 0.01), { color: P.violet, r: 3.2, key: 'sigmaLift' });
      sc.tag('factor', pt([x - 0.3, YC - 0.2], 0.01), `×${fmt(m.grad.factor)}`, 'raw backed c-cy', { occlude: false });
    }
    return pl;
  }

  /* ---------- the sphere and the paths ---------- */
  function drawSphere(m) {
    const ref = m.probes[0];
    sc.surface(
      'probeSphere',
      (u, v) => [sn(v) * cs(u), sn(v) * sn(u), cs(v)],
      {
        u: [0, TAU],
        v: [0, PI],
        nu: 72,
        nv: 36,
        value: (u, v) => (1 + dot(ref, [sn(v) * cs(u), sn(v) * sn(u), cs(v)])) / 2,
        colors: [P.faint, P.violet],
        range: [0, 1],
        grid: { every: [6, 6], alpha: 0.26 }
      }
    );
    tube('axis', [scale(AXIS, -1.08), scale(AXIS, 1.08)], P.violet, 0.011);
    sc.bead(scale(AXIS, 1.08), { color: P.violet, r: 4.4, key: 'axisNorth' });
    sc.bead(scale(AXIS, -1.08), { color: P.violet, r: 4.4, key: 'axisSouth' });
  }
  function drawPaths(m) {
    const P0 = m.probes;
    if (m.scene === 'step') {
      const end = P0[1];
      tube('ridge', lift(arc(P0[0], end, 48), 1.012), P.cyan, 0.018);
      const tip = bar('barStep', end, m.latest.v, P.magenta);
      sc.bead(scale(P0[0], 1.02), { color: P.cyan, r: 4.4, key: 'start' });
      sc.bead(scale(end, 1.02), { color: P.amber, r: 4.6, key: 'cursor' });
      sc.tag('bar', add(tip, scale(AXIS, 0.1)), `1 − cos Δθ = ${fmt(m.latest.v)}`, 'raw backed c-mg');
    } else if (m.scene === 'heap') {
      const shown = m.count + 1;
      tube('ridge', lift(polyline(P0, shown - 1, 24), 1.012), P.cyan, 0.018);
      for (let k = 0; k < shown; k++) sc.bead(scale(P0[k], 1.02), { color: P.cyan, r: 4.6, key: 'relay' + k });
      if (m.triangle && shown >= 3) {
        const [a, b, c] = [P0[shown - 3], P0[shown - 2], P0[shown - 1]];
        sc.ring(scale(b, 1.02), { color: P.violet, r: 9, normal: b, key: 'pivot' });
        // the point reflection: σₜ₋₁ hops over the pivot σₜ to σₜ₊₁
        const th0 = (shown - 3) * m.stepDeg * deg,
          span2 = 2 * m.stepDeg * deg;
        const hop = sample(48, (u) => add(scale(equator(th0 + span2 * u), 1.02), scale(AXIS, 0.42 * sn(PI * u))));
        sc.line(hop.slice(0, 45), { color: P.violet, width: 2 });
        sc.arrow(hop[44], hop[48], { color: P.violet, width: 2, headSize: 10 });
        sc.tag('prev', add(scale(a, 1.03), scale(AXIS, -0.16)), 'σₜ₋₁', 'raw backed c-cy');
        sc.tag('pivotTag', add(scale(b, 1.03), scale(AXIS, -0.16)), 'σₜ', 'raw backed c-vi');
        sc.tag('next', add(scale(c, 1.03), scale(AXIS, -0.16)), 'σₜ₊₁ = [σₜ, σₜ₋₁, σₜ]', 'raw backed c-cy');
        if (!m.triangle.anti && m.triangle.S < 0) {
          // the third side takes the complementary arc: the loop bounds a hemisphere
          sc.surface('wrap', (u, v) => [sn(v) * cs(u) * 1.006, sn(v) * sn(u) * 1.006, cs(v) * 1.006], { u: [0, TAU], v: [0, PI / 2], nu: 48, nv: 10, color: P.magenta, alpha: 0.33, pick: false });
        }
        sc.tag('omega', add(scale(b, 1.02), scale(AXIS, 0.58)), m.triangle.anti ? L('对径 · 无最短门', 'antipodal · no shortest gate') : m.triangle.S > 0 ? 'Ω = 0 · +1' : 'Ω = 2π · −1', m.triangle.S > 0 ? 'raw backed c-cy' : 'raw backed c-mg');
      }
      sc.bead(scale(at(P0, Math.min(m.count, 4)), 1.03), { color: P.amber, r: 4.6, key: 'cursor' });
    } else if (m.scene === 'cadence') {
      const N = m.beats,
        jumpProbes = m.other.map(probe);
      tube('ridge', lift(polyline(P0, m.progress, 24), 1.012), P.cyan, 0.018);
      sc.line(lift(arc(P0[0], P0[N], 64), 1.004), { color: P.cyan, width: 1, alpha: 0.35 });
      for (let k = 1; k <= N; k++) {
        if (k > m.count) continue;
        const b = m.ledger.beats[k - 1];
        bar('barEven' + k, P0[k], b.v, P.cyan, -3 * deg);
        sc.bead(scale(P0[k], 1.02), { color: P.cyan, r: 3, key: 'even' + k });
      }
      sc.bead(scale(P0[0], 1.03), { color: P.magenta, r: 4.6, key: 'idle' });
      // the jump: an arch leaping over the face of the sphere during the last beat
      const f = clamp(m.progress - (N - 1), 0, 1);
      if (f > 0) {
        const pts = arc(jumpProbes[N - 1], jumpProbes[N], 48).slice(0, Math.max(2, Math.round(f * 48) + 1));
        tube('arch', pts.map((p, i) => add(scale(p, 1.012), scale(AXIS, 0.62 * sn((PI * i) / 48)))), P.magenta, 0.016);
      }
      if (m.count >= N) {
        bar('barJump', jumpProbes[N], m.otherLedger.S, P.magenta, 4 * deg);
        sc.bead(scale(turnZ(jumpProbes[N], 4 * deg), 1.03), { color: P.magenta, r: 4, key: 'jumpEnd' });
      }
      sc.bead(scale(at(P0, m.progress), 1.03), { color: P.amber, r: 4.6, key: 'cursorEven' });
      sc.tag('idle', scale(add(P0[0], scale(AXIS, 0.3)), 1.12), `× ${N - 1} · 0°`, 'raw backed c-mg');
      sc.tag('even', add(scale(P0[Math.ceil(N / 2)], 1.02), scale(AXIS, -0.2)), `${N} × ${fmt(m.spanDeg / N, 1)}°`, 'raw backed c-cy');
      sc.tag('jump', add(scale(arc(P0[0], P0[N], 2)[1], 1.02), scale(AXIS, 0.78)), `0 + … + ${fmt(m.spanDeg, 0)}°`, 'raw backed c-mg');
    } else if (m.scene === 'detour') {
      const A = m.other.map(probe),
        Cm = m.mirror.map(probe);
      tube('ridge', lift(polyline(A, m.progress, 24), 1.012), P.cyan, 0.018);
      tube('detourPlus', lift(polyline(P0, m.progress, 24), 1.014), P.magenta, 0.016);
      tube('detourMinus', lift(polyline(Cm, m.progress, 24), 1.014), P.magenta, 0.016);
      const fillBetween = (key, C) =>
        sc.surface(key, (u, v) => scale(unit(add(scale(at(A, u * 4), 1 - v), scale(at(C, u * 4), v))), 1.006), { u: [0, 1], v: [0, 1], nu: 64, nv: 6, color: P.magenta, alpha: 0.3, pick: false });
      if (m.count >= 4) {
        fillBetween('omegaPlus', P0);
        fillBetween('omegaMinus', Cm);
      }
      for (let k = 1; k <= 4; k++)
        if (k <= m.count) {
          sc.bead(scale(A[k], 1.02), { color: P.cyan, r: 3.4, key: 'geo' + k });
          if (k < 4) {
            sc.bead(scale(P0[k], 1.02), { color: P.magenta, r: 3.4, key: 'plus' + k });
            sc.bead(scale(Cm[k], 1.02), { color: P.magenta, r: 3.4, key: 'minus' + k });
          }
        }
      sc.bead(scale(at(A, m.progress), 1.03), { color: P.amber, r: 4.6, key: 'cursorGeo' });
      if (m.count >= 2) {
        sc.tag('sigmaPlus', scale(P0[2], 1.16), 'σ₂⁺ = (1/3, 1/4, 0)', 'raw backed c-mg');
        sc.tag('sigmaMinus', scale(Cm[2], 1.16), 'σ₂⁻ = (1/3, −1/4, 0)', 'raw backed c-mg');
      }
      if (m.count >= 4) {
        sc.tag('omegaPlus', scale(unit(add(A[2], P0[2])), 1.02), `Ω = ${kit.sgn(m.loop.plus.omega, 4)} sr`, 'raw backed c-mg');
        sc.tag('omegaMinus', scale(unit(add(A[2], Cm[2])), 1.02), `Ω = ${kit.sgn(m.loop.minus.omega, 4)} sr`, 'raw backed c-mg');
      }
    } else {
      // focus: the ridge, two neighbours with the same initial deviation, and the flat drift J₀ + J̇₀s drawn as a latitude offset
      const n0 = P0[0],
        tr = unit(cross(AXIS, n0)),
        en = AXIS;
      const sMax = m.jacobi.s;
      const ridgeAt = (s) => add(scale(n0, cs(s)), scale(tr, sn(s)));
      sc.line(lift(sample(64, (u) => ridgeAt(u * PI)), 1.004), { color: P.cyan, width: 1, alpha: 0.35 });
      if (sMax > 1e-6) tube('ridge', lift(sample(48, (u) => ridgeAt(u * sMax)), 1.012), P.cyan, 0.016);
      const alpha = Math.asin(JD);
      for (const sgn of [1, -1]) {
        const p0 = add(scale(n0, cs(J0)), scale(en, sgn * sn(J0)));
        const north = add(scale(n0, -sgn * sn(J0)), scale(en, cs(J0)));
        const t0 = add(scale(tr, cs(alpha)), scale(north, sgn * sn(alpha)));
        const curve = (s) => add(scale(p0, cs(s)), scale(t0, sn(s)));
        const flat = (s) => add(scale(ridgeAt(s), cs(J0 + JD * s)), scale(en, sgn * sn(J0 + JD * s)));
        if (sMax > 1e-6) {
          tube('neighbour' + sgn, lift(sample(48, (u) => curve(u * sMax)), 1.012), P.cyan, 0.008, { glow: 0.12 });
          sc.line(lift(sample(48, (u) => flat(u * sMax)), 1.01), { color: P.magenta, width: 1.8, dash: [5, 4] });
        }
        sc.bead(scale(p0, 1.02), { color: P.cyan, r: 3.4, key: 'neighbourStart' + sgn });
      }
      sc.bead(scale(ridgeAt(sMax), 1.03), { color: P.amber, r: 4.6, key: 'cursor' });
      if (sMax > 0.7 * PI) {
        const sf = 0.72 * PI;
        sc.tag('flat', scale(add(scale(ridgeAt(sf), cs(J0 + JD * sf)), scale(en, sn(J0 + JD * sf + 0.16))), 1.06), 'J₀ + J̇₀s', 'raw backed c-mg');
        sc.tag('cosine', scale(add(scale(ridgeAt(0.4 * PI), cs(0.42)), scale(en, -sn(0.42))), 1.04), 'J₀ cos s + J̇₀ sin s', 'raw backed c-cy');
      }
    }
  }
  function drawStage(m) {
    const f = fit();
    opts.radius = f.unit / Math.min(f.W, f.H);
    opts.cx = f.cx / f.W;
    opts.cy = f.cy / f.H;
    sc.begin();
    drawSphere(m);
    drawPaths(m);
    drawPlate(m, f);
    sc.end();
    placeHandle(m, f);
    fitLabels();
  }

  /* ---------- the handle: the parameter of the scene, on the sphere or on the plate ---------- */
  function handleAnchor(m, f) {
    if (m.scene === 'step' || m.scene === 'heap') return probe(mrpAbout(E1, m.stepDeg * deg));
    if (m.scene === 'cadence') return probe(mrpAbout(E1, m.spanDeg * deg));
    if (m.scene === 'focus') {
      const pl = plateFrame(f);
      return pl.at2(RHO * m.sigmaW, YC, 0.012);
    }
    return null;
  }
  function placeHandle(m, f) {
    const a = handleAnchor(m, f);
    handle.hidden = TRV.still || !a;
    if (!a) return;
    const q = sc.p(m.scene === 'focus' ? a : scale(a, 1.02));
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
  }

  /* ---------- strip plot: along the rail, what grows and what stays ---------- */
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    if (m.scene === 'step') {
      $('plotTitle').textContent = L('沿 Δθ：三把尺子重合，惊奇度在 180° 发散', 'Along Δθ: the three rulers coincide, the surprisal diverges at 180°');
      $('plotMeta').textContent = '1 − cos Δθ = 2q_MRP = 2P_leak · I = −ln(1 − v/2)';
      const g = kit.plot(cv, { x: [0, 180], y: [0, 2.4], pad: [32, 14, 12, 22] });
      g.axes({ xTicks: [0, 45, 90, 135, 180], yTicks: [0, 1, 2], xLabel: 'Δθ (°)' });
      const xs = sample(180, (u) => u * 180);
      g.line(xs.map((x) => [x, 1 - cs(x * deg)]), P.cyan, { width: 2.4 });
      g.line(xs.map((x) => { const d = Math.tan((x * deg) / 4); return [x, (8 * d * d) / (1 + d * d) ** 2]; }), P.violet, { width: 1.6, dash: [5, 4] });
      g.line(xs.map((x) => [x, 2 * sn((x * deg) / 2) ** 2]), P.sigma, { width: 1.2, dash: [1, 4] });
      g.line(xs.filter((x) => x < 179.5).map((x) => [x, Math.min(2.4, -Math.log(cs((x * deg) / 2) ** 2))]), P.magenta, { width: 1.8 });
      g.vline(m.latest.dTheta / deg, P.amber);
      g.legend([[P.cyan, '1 − cos Δθ'], [P.violet, '2q_{MRP}', 'dash'], [P.magenta, 'I = −ln cos²(Δθ/2)']], { right: false });
      return;
    }
    if (m.scene === 'heap') {
      $('plotTitle').textContent = L('沿每拍转角：S 在 90° 变号，角盈从 0 跳到 2π', 'Along the beat angle: S changes sign at 90°, the excess jumps from 0 to 2π');
      $('plotMeta').textContent = 'S = 2c(1 + c), c = cos Δθ · D = 0';
      const g = kit.plot(cv, { x: [0, 180], y: [-1, 4.2], pad: [32, 14, 12, 22] });
      g.axes({ xTicks: [0, 45, 90, 135, 180], yTicks: [-1, 0, 2, 4], xLabel: L('每拍 Δθ (°)', 'Δθ per beat (°)') });
      const xs = sample(180, (u) => u * 180);
      g.line(xs.map((x) => { const c = cs(x * deg); return [x, 2 * c * (1 + c)]; }), P.cyan, { width: 2.2 });
      g.line(xs.map((x) => [x, x < 90 ? 0 : x > 90 ? 2 : null]), P.magenta, { width: 2 });
      g.vline(m.stepDeg, P.amber);
      g.legend([[P.cyan, 'S'], [P.magenta, 'Ω / π']]);
      return;
    }
    if (m.scene === 'cadence' || m.scene === 'detour') {
      const N = m.scene === 'cadence' ? m.beats : 4;
      $('plotTitle').textContent = m.scene === 'cadence' ? L('沿节拍：匀速一拍一拍地付，跳步在最后一次付清', 'Along the beats: the even path pays beat by beat, the jump pays all at the end') : L('沿节拍：绕路每拍都比测地线付得多', 'Along the beats: the detour pays more than the geodesic at every beat');
      $('plotMeta').textContent = 'S(t) = Σ (1 − cos Δθ)';
      const full = (path) => ledger(path, N).beats.reduce((acc, b) => { acc.push(acc[acc.length - 1] + b.v); return acc; }, [0]);
      const sA = full(m.path),
        sB = full(m.other);
      const yMax = Math.max(1.6, sA[N] * 1.1, sB[N] * 1.1);
      const g = kit.plot(cv, { x: [0, N], y: [0, yMax], pad: [32, 14, 12, 22] });
      g.axes({ xTicks: Array.from({ length: N + 1 }, (_, k) => k), yTicks: [0, 0.5, 1, 1.5].filter((y) => y <= yMax), xLabel: L('拍', 'beat') });
      const stairs = (arr) => arr.flatMap((s, k) => (k ? [[k, arr[k - 1]], [k, s]] : [[0, s]]));
      const main = m.scene === 'cadence' ? sA : sB,
        alt = m.scene === 'cadence' ? sB : sA;
      g.line(stairs(main), P.cyan, { width: 2.2 });
      g.line(stairs(alt), P.magenta, { width: 2 });
      g.vline(m.progress, P.amber);
      g.legend(m.scene === 'cadence' ? [[P.cyan, L('匀速', 'even')], [P.magenta, L('跳步', 'jump')]] : [[P.cyan, L('测地线', 'geodesic')], [P.magenta, L('绕路', 'detour')]], { right: false });
      return;
    }
    $('plotTitle').textContent = L('沿测地线：球面上的偏离按余弦回摆，平直空间里的偏离线性漂开', 'Along the geodesic: on the sphere the deviation swings back, in flat space it drifts away');
    $('plotMeta').textContent = 'J̈ + J = 0 · J = J₀ cos s + J̇₀ sin s';
    const g = kit.plot(cv, { x: [0, 180], y: [-0.3, 0.72], pad: [36, 14, 12, 22] });
    g.axes({ xTicks: [0, 45, 90, 135, 180], yTicks: [-0.2, 0, 0.2, 0.4, 0.6], xLabel: 's (°)' });
    const xs = sample(180, (u) => u * 180);
    g.line(xs.map((x) => [x, J0 * cs(x * deg) + JD * sn(x * deg)]), P.cyan, { width: 2.2 });
    g.line(xs.map((x) => [x, J0 + JD * x * deg]), P.magenta, { width: 1.8, dash: [5, 4] });
    g.vline(m.jacobi.s / deg, P.amber);
    g.legend([[P.cyan, L('球面', 'sphere')], [P.magenta, L('平直', 'flat'), 'dash']], { right: false, bottom: true });
  }

  /* ---------- readouts ---------- */
  function readings(m, I) {
    const ratio = (a, b) => (b > 0 ? fmt(a / b) : '—');
    $('roKey').textContent = fmt(m.ledger.S);
    const keySub = {
      step: ` · 2q = ${fmt(m.latest.q2)} · 2P = ${fmt(m.latest.leak2)}`,
      heap: ` · ${L('每拍', 'per beat')} ${fmt(1 - cs(m.stepDeg * deg))}`,
      cadence: m.otherLedger ? ` · ${L('跳步', 'jump')} ${fmt(m.otherLedger.S)} (${ratio(m.otherTotal.S, m.total.S)}×)` : '',
      detour: m.otherLedger ? ` · ${L('测地线', 'geodesic')} ${fmt(m.otherLedger.S)}` : '',
      focus: ` · ${L('测地脊', 'ridge')}`
    }[m.scene];
    $('roKeySub').textContent = keySub;
    $('roStay').textContent = fmt(m.ledger.stay, 8) + (m.otherLedger ? ` · ${L('对照', 'vs')} ${fmt(m.otherLedger.stay, 8)}` : '');
    $('roSurprisal').textContent = `${fmt(m.ledger.I, 8)} nat` + (m.otherLedger ? ` · ${L('对照', 'vs')} ${fmt(m.otherLedger.I, 8)}` : '');
    $('roLock').textContent = `${fmt(m.latest.v)} = ${fmt(m.latest.q2)} = ${fmt(m.latest.leak2)} · ‖δ‖ = ${fmt(m.latest.nd)}`;
    let omega = '—';
    if (m.scene === 'detour' && m.loop) omega = `±Ω = ${fmt(m.loop.plus.omega)} / ${fmt(m.loop.minus.omega)} sr · ${L('平均相位', 'mean phase')} ${fmt(m.loop.average[0])} + ${fmt(m.loop.average[1])}i`;
    else if (m.triangle) omega = m.triangle.anti ? L('对径：最短门不唯一', 'antipodal: no unique shortest gate') : `Ω = ${fmt(Math.abs(m.triangle.omega))} sr · ${L('相位', 'phase')} ${m.triangle.S > 0 ? '+1' : '−1'} · S = ${fmt(m.triangle.S)}`;
    else omega = L('单拍：没有三角形', 'one beat: no triangle');
    $('roOmega').textContent = omega;
    $('roChord').textContent = `${fmt(m.chord.norm2)} · ${L('模方损失', 'lost')} ${fmt(1 - m.chord.norm2)}`;
    $('roGrad').textContent = `${fmt(m.grad.factor)} · g = ${fmt(m.grad.metric, 8)} · ‖σ‖ = ${fmt(m.sigmaW, 2)}`;
    $('roNote').textContent =
      L(
        `舒尔：min ‖Ψₜ + yΨₜ₋₁‖² = ${fmt(I.schur.least)}（y = ${fmt(I.schur.arg, 3)}）= 1 − b² = ${fmt(I.schur.complement)} = P_leak；T − V = ${fmt(m.latest.v)} − 0。fsAngle：${fmt(I.fs.sum / deg, 2)}° ≥ ${fmt(I.fs.ends / deg, 2)}°。`,
        `Schur: min ‖Ψₜ + yΨₜ₋₁‖² = ${fmt(I.schur.least)} (y = ${fmt(I.schur.arg, 3)}) = 1 − b² = ${fmt(I.schur.complement)} = P_leak; T − V = ${fmt(m.latest.v)} − 0. fsAngle: ${fmt(I.fs.sum / deg, 2)}° ≥ ${fmt(I.fs.ends / deg, 2)}°.`
      );
    $('scenePill').innerHTML = `S² <strong>${L(...SCENE_NAME[m.scene])}</strong>`;
    $('keyPill').innerHTML = `S <strong>${fmt(m.ledger.S)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改参数 · 拖空白处转视角 · 空格播放', 'drag the amber handle to set the parameter · drag empty space to orbit · Space plays');
    $('formula').textContent = 'v = 1 − cos Δθ = 8‖δ‖²/(1 + ‖δ‖²)² = 2P_leak';
    $('lensToggleBtn').setAttribute('aria-pressed', String(state.lens === 1));
    for (const el of document.querySelectorAll('#ctlPanel .field[data-for]')) el.hidden = !el.dataset.for.split(' ').includes(m.scene);
    $('ctlNote').textContent =
      m.scene === 'detour'
        ? L('绕路节点取自正文：总转角 120°、四拍，没有可调参数；时间轴沿三条路同步走。', 'The detour nodes come from the text: 120° in four beats, with nothing to adjust; the rail walks the three paths together.')
        : L('拖琥珀手柄或滑块改参数；时间轴只推进沿路的进度。', 'Drag the amber handle or a slider to set the parameter; the rail only moves along the path.');
  }
  const paint = kit.painter(() => {
    const m = calculate(clock.t),
      I = instances(m);
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: 0.1,
    step: 0.125,
    max: 1,
    format: (t) => 'τ ' + t.toFixed(2),
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  for (const id of ['rew', 'rewindBtn']) $(id).addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stage);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); state.blend = 1; state.from = null; };
    token.run = kit.tween(ms, (e) => { state.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; state.blend = 1; state.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, e, { from: null, blend: 1 });
    cards.mark(null);
    clock.pause();
  }
  const setParam = (k, v) => { state[k] = v; syncFields(); paint(); };
  const fStep = kit.field($('stepDeg'), { fmt: (v) => v + '°', onInput: (v) => { leave(); setParam('stepDeg', v); } });
  const fSpan = kit.field($('spanDeg'), { fmt: (v) => v + '°', onInput: (v) => { leave(); setParam('spanDeg', v); } });
  const fBeats = kit.field($('beats'), { fmt: (v) => String(v), onInput: (v) => { leave(); setParam('beats', v); } });
  const fSigma = kit.field($('sigmaW'), { fmt: (v) => v.toFixed(2), onInput: (v) => { leave(); setParam('sigmaW', v); } });
  function syncFields() {
    const e = eff();
    fStep.set(Math.round(e.stepDeg));
    fSpan.set(Math.round(e.spanDeg));
    fBeats.set(state.beats);
    fSigma.set(Math.round(e.sigmaW * 100) / 100);
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => {
    leave();
    state.scene = SCENES.includes(v) ? v : 'cadence';
    sc.view(CAMS[state.scene], TRV.still ? 0 : 600);
    clock.set(1);
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => { state.lens = state.lens ? 0 : 1; paint(); });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'sagitta-mrp-surprisal-lock': [
      '一拍转 120°：品红竖条高 1 − cos Δθ = 1.5000，切片板上的漏失腿给出 P<sub>leak</sub> = 0.7500，紫色射线落在 ‖δ‖ = 0.5774。',
      'One beat of 120°: the magenta bar stands 1 − cos Δθ = 1.5000 high, the leak leg on the plate gives P<sub>leak</sub> = 0.7500, and the violet ray lands at ‖δ‖ = 0.5774.'
    ],
    'heap-autoparallel-point-reflection': [
      '从前两拍出发，每颗新珠都是前一颗关于紫环支点的镜像：每拍 30°，三角形角盈 Ω = 0。',
      'From the first two beats, each new bead mirrors the one before through the violet pivot ring: 30° per beat, triangle excess Ω = 0.'
    ],
    'uniform-cadence-vs-jump-hallucination': [
      '同样转 120°：青色四拍各竖一根矮条，共 0.5359；品红前三拍不动，最后一跳竖起 1.5000 的高条。',
      'Over the same 120°: four cyan beats raise four short bars, 0.5359 in all; magenta idles three beats and then raises one tall bar of 1.5000.'
    ],
    'lateral-detour-vs-chord-collapse': [
      '两条品红绕路在青色测地线两侧各围出 ±Ω，各付 0.9532；切片板上的品红平直弦中点只剩模方 0.75。',
      'The two magenta detours enclose ±Ω on either side of the cyan geodesic and pay 0.9532 each; on the plate the magenta flat chord midpoint keeps a squared norm of 0.75.'
    ],
    'jacobi-focusing-conformal-gradient': [
      '两条青色邻线按 J₀ cos s + J̇₀ sin s 回摆、在约 135° 处越过测地脊，品红虚线按 J₀ + J̇₀s 漂开；切片板上青色梯度箭头是灰色的 0.6724 倍。',
      'The two cyan neighbours swing back as J₀ cos s + J̇₀ sin s and cross the ridge near 135°, while the magenta dashes drift away as J₀ + J̇₀s; on the plate the cyan gradient arrow is 0.6724 times the grey one.'
    ]
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'sagitta-mrp-surprisal-lock': ['120°：竖条 1.5000，漏失 0.7500，‖δ‖ = 0.5774。', '120°: bar 1.5000, leak 0.7500, ‖δ‖ = 0.5774.'],
    'heap-autoparallel-point-reflection': ['每颗新珠是前一颗关于支点的镜像，Ω = 0。', 'Each new bead mirrors the last through the pivot; Ω = 0.'],
    'uniform-cadence-vs-jump-hallucination': ['匀速四拍共 0.5359，末步一跳 1.5000。', 'Four even beats pay 0.5359; one last jump pays 1.5000.'],
    'lateral-detour-vs-chord-collapse': ['绕路各付 0.9532，围出 ±Ω；弦中点模方 0.75。', 'Each detour pays 0.9532 around ±Ω; chord midpoint 0.75.'],
    'jacobi-focusing-conformal-gradient': ['邻线按余弦回摆，平直偏离线性漂开；梯度乘 0.6724。', 'Neighbours swing back, flat lines drift; gradient × 0.6724.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, { scene: p.scene, from: null, blend: 1 });
    for (const k of ['stepDeg', 'spanDeg', 'beats', 'sigmaW']) if (p[k] != null) state[k] = p[k];
    sceneChips.set(p.scene, true);
    sc.view(CAMS[p.scene], booting || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) {
      if (booting) bootAutoplay();
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets,
    notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：换场景、拖琥珀手柄或滑块，换透镜或转视角。时间轴沿当前的路走。随时可以再选一张卡。', 'Free play: switch the scene, drag the amber handle or a slider, change the lens or the view. The rail walks the current path. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- dragging the handle (frozen layout while the pointer is down), or arrow keys ---------- */
  const PARAM = { step: ['stepDeg', 0, 180], heap: ['stepDeg', 0, 180], cadence: ['spanDeg', 1, 179], focus: ['sigmaW', 0, 0.95] };
  function point(scene, value) {
    const f = fit();
    const a = scene === 'focus' ? plateFrame(f).at2(RHO * value, YC, 0.012) : scale(probe(mrpAbout(E1, value * deg)), 1.02);
    const q = sc.p(a),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  }
  function valueAt(ev) {
    const [key, lo, hi] = PARAM[state.scene];
    const rect = $('cv').getBoundingClientRect(),
      x = ev.clientX - rect.left,
      y = ev.clientY - rect.top;
    if (state.scene === 'focus') {
      const pl = plateFrame(fit()),
        a = sc.p(pl.at2(0, YC, 0.012)),
        b = sc.p(pl.at2(RHO, YC, 0.012));
      const t = ((x - a[0]) * (b[0] - a[0]) + (y - a[1]) * (b[1] - a[1])) / ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
      return { key, value: Math.round(clamp(t, lo, hi) * 100) / 100 };
    }
    let best = state[key],
      gapPx = Infinity;
    for (let d = lo; d <= hi; d += 0.5) {
      const p = sc.p(scale(probe(mrpAbout(E1, d * deg)), 1.02));
      const dist = hypot(p[0] - x, p[1] - y) + (p[2] < 0 ? 24 : 0) + Math.abs(state[key] - d) * 1e-6;
      if (dist < gapPx) {
        gapPx = dist;
        best = d;
      }
    }
    return { key, value: Math.round(best) };
  }
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still || !PARAM[state.scene]) return;
    ev.preventDefault();
    leave();
    frozen = fit();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const { key, value } = valueAt(ev);
    setParam(key, value);
  };
  const endDrag = (ev) => {
    if (ev && handle.hasPointerCapture && handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointerup = endDrag;
  handle.onpointercancel = endDrag;
  handle.onlostpointercapture = () => {
    dragging = null;
    frozen = null;
    handle.classList.remove('dragging');
    paint();
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key) || !PARAM[state.scene]) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    const [key, lo, hi] = PARAM[state.scene],
      dv = key === 'sigmaW' ? 0.01 : 1;
    const next = ev.key === 'Home' ? lo : ev.key === 'End' ? hi : state[key] + (ev.key === 'ArrowLeft' ? -dv : dv);
    setParam(key, Math.round(clamp(next, lo, hi) * 100) / 100);
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  const clean = (x) => JSON.parse(JSON.stringify(x, (k, v) => (typeof v === 'number' && !Number.isFinite(v) ? null : v)));
  window.TERNION_GEODESIC_DEBUG = Object.freeze({
    get state() {
      const m = calculate(clock.t);
      return clean({
        ...m,
        t: clock.t,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        handleHidden: handle.hidden,
        leanInstances: instances(m)
      });
    },
    /** Pure computations of the page at a given state: calc({ scene, stepDeg, spanDeg, beats, sigmaW, tau }). */
    calc(s = {}) {
      const saved = { ...state };
      Object.assign(state, { from: null, blend: 1 }, s);
      try {
        const m = calculate(s.tau == null ? 1 : s.tau);
        return clean({ ...m, leanInstances: instances(m) });
      } finally {
        Object.assign(state, saved);
      }
    },
    presets: clean(presets),
    /** Viewport coordinates of the handle for a parameter value of the current scene, for drag targets. */
    dragTarget: (value) => point(state.scene, value)
  });
  window.TRV_THUMB = () => {
    cards.pick(ids[2]);
    clock.pause();
    clock.set(1);
    paint.now();
  };
  cards.pick(cards.initial(ids[2]));
  booting = false;
  paint.now();
})();
