/* SELFREF//PENTAD · 五阶自指不动点谱系 · The fivefold self-referential fixed-point spectrum
   One equation, x* = F(x*), five instances on one lit stage (kit.solid), one experiment card each:
     F₁ pointer   a ring of 12 pointer slots on a violet table disk. In the initial forest 9 → 6 → 3 → 1 → 0 is a chain
                  of four hops and slot 0 points at itself (Lookup(0) = 0, p ≡ *p). Rail 0–4: the amber read head walks
                  the chain from slot x; 4–5: every slot is looked up once with path compression; 5–6: one hop. The
                  compressed table P has P² = P.
     F₂ dottie    the unit circle in the horizontal blind plane i and the vertical real plane I through the real axis:
                  the cyan shadow cos θ, the magenta arc θ (and the same arc straightened into a ruler), and on I the
                  cobweb of θ ↦ cos θ from θ₀. Rail = iteration count. θ* = cos θ*, λ = −sin θ*.
     F₃ channel   the Bloch ball: the eigenstate |0⟩ is a fixed cyan arrow whose phase turns on a violet fibre (|λ| = 1);
                  the channel ℰ(ρ) = |λ| UρU† + (1 − |λ|) ρ* spirals any state into ρ*. Rail = channel steps.
     F₄ distill   the [[15, 1, 3]] code as 15 points of a tetrahedron with 4 check cells of 8, one accepted cyan branch
                  to the purified T gate, 15 rejected magenta branches, and the ε ruler (cyan basin below ε_th, magenta
                  above). Rail = distillation rounds.
     F₅ lawvere   a 4 × 4 table g(a, b); the read head walks the diagonal and lifts ¬g(a, a) with a half twist to a row
                  at level ℓ + 1 that differs from every row. Rail = the diagonal scan.
   Every number is computed here; the instances of the cited Lean theorems are checked in instances(). Read-only
   probe: window.SELFREF_PENTAD_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, UP = [0, 0, 1];
  const ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
  const mix3 = (a, b, s) => [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, a[2] + (b[2] - a[2]) * s];
  const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  /** x as m×10ⁿ with d decimals (Unicode exponent, true minus sign). */
  function sci(x, d = 2) {
    if (!Number.isFinite(x)) return '∞';
    if (x === 0) return '0';
    let e = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** e;
    if (Math.abs(Number(m.toFixed(d))) >= 10) { e += 1; m /= 10; }
    return `${fix(m, d)}×10${String(e).split('').map((c) => SUP[c]).join('')}`;
  }
  const pct = (x, d = 2) => `${fix(100 * x, d)}%`;
  /** a residual as computed: exactly 0, or its size */
  const resid = (x) => (x === 0 ? '0' : sci(x, 1));
  const popcount = (n) => { let c = 0; while (n) { n &= n - 1; c++; } return c; };

  /* ---------- the five scenes ---------- */
  const CODES = ['F₁', 'F₂', 'F₃', 'F₄', 'F₅'];
  const MAXT = [6, 30, 12, 3, 4], RATE = [1.2, 4, 1.6, 0.6, 0.8];
  const VIEW = [[-0.62, 0.7], [-0.6, 0.44], [-0.5, 0.3], [-0.62, 0.32], [-0.5, 0.64]];

  /* ---------- F₁ · the pointer table ---------- */
  const NSLOT = 12;
  /** parent pointers of the initial forest: 9 → 6 → 3 → 1 → 0 is a chain of four hops, slot 0 points at itself */
  const PARENT0 = Object.freeze([0, 0, 1, 1, 3, 0, 3, 6, 0, 6, 0, 0]);
  /** the path of pointers from x to its root (x, p(x), p(p(x)), …, root) */
  function pathOf(par, x) {
    const p = [x];
    for (let k = 0; k < 64; k++) { const y = par[p[p.length - 1]]; if (y === p[p.length - 1]) break; p.push(y); }
    return p;
  }
  /** look up every slot once, in order, with path compression: each pointer met on the way turns to the root */
  function compressAll(par) {
    const q = par.slice();
    for (let x = 0; x < q.length; x++) { const path = pathOf(q, x), r = path[path.length - 1]; for (const y of path) q[y] = r; }
    return q;
  }
  const PARENT1 = Object.freeze(compressAll(PARENT0));
  const hopsOf = (par, x) => pathOf(par, x).length - 1;
  /** M[i][x] = 1 exactly when p(x) = i: the table as a 0/1 matrix; P² = P is checked on it */
  const matrixOf = (par) => par.map((_, i) => par.map((p) => (p === i ? 1 : 0)));
  function idemResidual(par) {
    const M = matrixOf(par), n = M.length;
    let r = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { let s = 0; for (let k = 0; k < n; k++) s += M[i][k] * M[k][j]; r = Math.max(r, Math.abs(s - M[i][j])); }
    return r;
  }
  /** the recursive page table of the instance: the root directory 0 lists every slot (entry 0 is the root itself),
      every other page answers with its pointer */
  const lookupOf = (par) => (a, i) => (a === 0 ? i : par[a]);
  const pageWalk = (lookup, root, list) => list.reduce((a, i) => lookup(a, i), root);

  /* ---------- F₂ · the cosine ---------- */
  const THETA_STAR = (() => { let t = 0.739; for (let k = 0; k < 60; k++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1); return t; })();
  const LAMBDA_COS = -Math.sin(THETA_STAR);
  /** The compositional inverse of forward(X) = 2X + 2 arcsin X (rational coefficients α(2k+1) = C(2k, k)/(4ᵏ(2k+1)) for
      arcsin), by Lagrange inversion c_n = [yⁿ⁻¹] (y/forward(y))ⁿ / n in floating point, and its partial sums at π. */
  const SERIES = (() => {
    const N = 48, f = new Float64Array(N + 2);
    let c = 1;
    for (let k = 0; 2 * k + 1 <= N + 1; k++) { if (k > 0) c *= (2 * k - 1) / (2 * k); f[2 * k + 1] = 2 * c / (2 * k + 1); }
    f[1] += 2;
    const q = new Float64Array(N), h = new Float64Array(N);
    for (let k = 0; k < N; k++) q[k] = f[k + 1];
    h[0] = 1 / q[0];
    for (let n = 1; n < N; n++) { let s = 0; for (let k = 1; k <= n; k++) s += q[k] * h[n - k]; h[n] = -s / q[0]; }
    const coef = new Float64Array(N + 1);
    let pw = new Float64Array(N); pw[0] = 1;
    for (let n = 1; n <= N; n++) {
      const nx = new Float64Array(N);
      for (let i = 0; i < N; i++) { if (!pw[i]) continue; for (let j = 0; i + j < N; j++) nx[i + j] += pw[i] * h[j]; }
      pw = nx; coef[n] = pw[n - 1] / n;
    }
    const partial = []; let sum = 0;
    for (let n = 0; n <= N; n++) { sum += coef[n] * PI ** n; partial.push(sum); }
    return { terms: N, coef: Array.from(coef), partial, sum };
  })();
  function dottieIterates(theta0, n) { const it = [theta0]; for (let k = 0; k < n; k++) it.push(Math.cos(it[k])); return it; }
  /** The cobweb on the plane I up to rail time t: points [θ, y]; iteration n draws (θₙ, θₙ) → (θₙ, θₙ₊₁) → (θₙ₊₁, θₙ₊₁)
      (from (θ₀, 0) for n = 0), each half taking half a unit of t. */
  function cobweb(it, t) {
    const pts = [[it[0], 0]];
    const n = Math.min(Math.floor(t), it.length - 2), f = t - n;
    for (let k = 0; k < n; k++) { pts.push([it[k], it[k + 1]]); pts.push([it[k + 1], it[k + 1]]); }
    if (n < it.length - 1 && f > 0) {
      const y0 = n === 0 ? 0 : it[n];
      if (f <= 0.5) pts.push([it[n], y0 + (it[n + 1] - y0) * (f / 0.5)]);
      else { pts.push([it[n], it[n + 1]]); pts.push([it[n] + (it[n + 1] - it[n]) * ((f - 0.5) / 0.5), it[n + 1]]); }
    }
    const tip = pts[pts.length - 1];
    return { pts, tip, theta: tip[0] };
  }

  /* ---------- F₃ · eigenstate and channel ---------- */
  const ZSTAR = 0.5, OMEGA = PI / 4, E0 = OMEGA / 2, E1 = -OMEGA / 2;
  const R0_DEFAULT = Object.freeze(v3.sph(105 * DEG, -40 * DEG));
  const EXTRA_STARTS = [v3.sph(68 * DEG, 70 * DEG), v3.sph(128 * DEG, 190 * DEG)];
  /** r* + |λ|ˢ R_z(ωs)(r₀ − r*): the Bloch vector after s channel steps */
  function channelPoint(r0, p, s) {
    const d = [r0[0], r0[1], r0[2] - ZSTAR], k = Math.pow(p, s), a = OMEGA * s, c = Math.cos(a), sn = Math.sin(a);
    return [k * (c * d[0] - sn * d[1]), k * (sn * d[0] + c * d[1]), ZSTAR + k * d[2]];
  }
  /* 2 × 2 complex matrices, entries [re, im] */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * B[i][j][0], z[1] + s * B[i][j][1]]));
  const mscale = (A, s) => A.map((r) => r.map((z) => [z[0] * s, z[1] * s]));
  const mdag = (A) => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]];
  const mmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
  /** exp(A) for a 2 × 2 complex matrix: scale by 2⁻ˢ, 24 Taylor terms, square s times */
  function expm2(A) {
    let s = 0; const nrm = mmax(A);
    while (nrm / 2 ** s > 0.25) s++;
    const B = mscale(A, 2 ** -s);
    let term = I2, sum = I2;
    for (let k = 1; k <= 24; k++) { term = mscale(mmul(term, B), 1 / k); sum = madd(sum, term); }
    for (let k = 0; k < s; k++) sum = mmul(sum, sum);
    return sum;
  }
  const rhoOf = (r) => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
  const blochOf = (R) => [2 * R[1][0][0], 2 * R[1][0][1], R[0][0][0] - R[1][1][0]];
  /** U(τ) = exp(−iτH), H = diag(E₀, E₁) */
  const evolution = (tau) => expm2([[[0, -tau * E0], [0, 0]], [[0, 0], [0, -tau * E1]]]);
  const U_STEP = evolution(1);
  const RHO_STAR = rhoOf([0, 0, ZSTAR]);
  const channelMatrix = (R, p) => madd(mscale(mmul(mmul(U_STEP, R), mdag(U_STEP)), p), mscale(RHO_STAR, 1 - p));
  const pinch = (R) => [[R[0][0], [0, 0]], [[0, 0], R[1][1]]];

  /* ---------- F₄ · fifteen-to-one distillation ---------- */
  const NQ = 15;
  /** qubit m = 1 … 15 is the non-empty set of tetrahedron corners whose bits m carries; check cell i holds the qubits
      with bit i, so the 4 × 15 incidence matrix has the binary digits of m as its columns (the Hamming check matrix) */
  const CHECKS = [0, 1, 2, 3].map((i) => Array.from({ length: NQ }, (_, k) => ((k + 1) >> i) & 1));
  /** the weights of the accepted Z-error patterns (zero syndrome), from all 2¹⁵ patterns */
  const ACCEPTED = (() => {
    const A = new Array(NQ + 1).fill(0);
    for (let e = 0; e < 1 << NQ; e++) { let s = 0; for (let k = 0; k < NQ; k++) if ((e >> k) & 1) s ^= k + 1; if (!s) A[popcount(e)]++; }
    return A;
  })();
  /** acceptance probability and output error at input error ε, from the accepted patterns: odd weight = logical error */
  function distillAt(e) {
    let acc = 0, odd = 0;
    for (let w = 0; w <= NQ; w++) if (ACCEPTED[w]) { const p = ACCEPTED[w] * e ** w * (1 - e) ** (NQ - w); acc += p; if (w & 1) odd += p; }
    return { ps: acc, out: acc > 0 ? odd / acc : 0 };
  }
  /** the MacWilliams closed form of Bravyi–Kitaev, x = 1 − 2ε */
  const epsOutClosed = (e) => { const x = 1 - 2 * e; return (1 + 15 * x ** 8 - 15 * x ** 7 - x ** 15) / (2 * (1 + 15 * x ** 8)); };
  const EPS_TH = (() => { let lo = 0.05, hi = 0.3; for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (distillAt(m).out < m) lo = m; else hi = m; } return (lo + hi) / 2; })();
  function rounds(e, n = 3) { const r = [e]; for (let k = 0; k < n; k++) r.push(distillAt(r[k]).out); return r; }

  /* ---------- F₅ · the diagonal ---------- */
  /** the diagonal cell the head stands on: (a, a) while t ∈ (a, a + 1], where cell a is lifted */
  const headOf = (t) => (t <= 0 ? 0 : Math.min(3, Math.ceil(t - 1e-9) - 1));
  const GTAB = Object.freeze([[1, 0, 0, 1], [0, 1, 1, 1], [1, 1, 0, 0], [0, 1, 1, 0]].map((r) => Object.freeze(r)));
  const TWIST = { not: (b) => 1 - b, id: (b) => b };
  function lawvere(tw) {
    const f = TWIST[tw], diag = GTAB.map((row, a) => f(row[a]));
    const equal = GTAB.map((row) => row.every((v, b) => v === diag[b]));
    return {
      twist: tw, diag, escaped: !equal.some(Boolean), capturedRow: equal.indexOf(true),
      differAtDiag: GTAB.map((row, a) => row[a] !== diag[a]), hamming: GTAB.map((row) => row.reduce((s, v, b) => s + (v !== diag[b] ? 1 : 0), 0)),
      fixedPointFree: [0, 1].every((b) => f(b) !== b)
    };
  }
  /** every 4 × 4 table over Bool (2¹⁶ listings): how many does the twisted diagonal escape? */
  const ALL_LISTINGS = (() => {
    const out = {};
    for (const tw of ['not', 'id']) {
      const f = TWIST[tw]; let esc = 0;
      for (let m = 0; m < 1 << 16; m++) {
        const bit = (a, b) => (m >> (4 * a + b)) & 1;
        let d = 0; for (let a = 0; a < 4; a++) d |= f(bit(a, a)) << a;
        let hit = false; for (let a = 0; a < 4 && !hit; a++) { let row = 0; for (let b = 0; b < 4; b++) row |= bit(a, b) << b; if (row === d) hit = true; }
        if (!hit) esc++;
      }
      out[tw] = esc;
    }
    return { listings: 1 << 16, escapedNot: out.not, escapedId: out.id };
  })();

  /* ---------- state ---------- */
  const S = { scene: 1, lens: 'phys', slot: 9, theta0: 0.1, lam: 0.65, r0: R0_DEFAULT.slice(), eps: 0.05, twist: 'not', t: 30 };

  /* ---------- the instances of the cited theorems ---------- */
  const R3 = (ax, t) => { const c = Math.cos(t), s = Math.sin(t); return ax === 'x' ? [[1, 0, 0], [0, c, -s], [0, s, c]] : ax === 'y' ? [[c, 0, s], [0, 1, 0], [-s, 0, c]] : [[c, -s, 0], [s, c, 0], [0, 0, 1]]; };
  const mm3 = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const instCache = new Map();
  function instances(M) {
    const key = `${S.slot}|${M.t}|${S.lam}|${S.r0.join(',')}|${M.chan ? M.chan.r.join(',') : ''}`;
    if (instCache.has(key)) return instCache.get(key);
    // recursive page table on the current table, i = 9
    const table = M.ptr.table, lk = lookupOf(table), leaf = lk(0, 9), data = lk(leaf, 3);
    let closure = true; for (let d = 0; d <= 64; d++) if (pageWalk(lk, 0, new Array(d).fill(0)) !== 0) closure = false;
    const pageTable = { root: 0, selfSlot: 0, i: 9, j: 3, leaf, data, hypothesis: lk(0, 0) === 0, walkData: pageWalk(lk, 0, [9, 3]) === data, walkLeaf: pageWalk(lk, 0, [0, 9]) === leaf, selfClosure: closure, depths: 65 };
    // pinching of the current qubit state of F₃, twice and once
    const rho = rhoOf(M.chan.r), once = pinch(rho), twice = pinch(once);
    const pinching = { residual: mmax(madd(twice, once, -1)), coherenceBefore: Math.hypot(rho[0][1][0], rho[0][1][1]), coherenceAfter: Math.hypot(once[0][1][0], once[0][1][1]) };
    // the eigenstate at the current time
    const U = evolution(M.t), rho0 = rhoOf([0, 0, 1]);
    const stationary = { tau: M.t, unitaryResidual: mmax(madd(mmul(mdag(U), U), I2, -1)), stationaryResidual: mmax(madd(mmul(mmul(U, rho0), mdag(U)), rho0, -1)) };
    // the channel: its fixed point, and the Bloch formula against 12 matrix steps
    let R = rhoOf(S.r0), stepResidual = 0;
    for (let n = 0; n < 12; n++) { R = channelMatrix(R, S.lam); stepResidual = Math.max(stepResidual, v3.len(v3.sub(blochOf(R), channelPoint(S.r0, S.lam, n + 1)))); }
    const channel = { fixedResidual: mmax(madd(channelMatrix(RHO_STAR, S.lam), RHO_STAR, -1)), stepResidual };
    // the T gate as a two-axis word
    const W = mm3(R3('x', PI / 2), mm3(R3('y', PI / 4), R3('x', -PI / 2))), Z = R3('z', PI / 4);
    let wd = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wd = Math.max(wd, Math.abs(W[i][j] - Z[i][j]));
    const twoAxis = { letters: 3, residual: wd };
    // the series at π
    const dottie = { thetaStar: THETA_STAR, cosResidual: Math.abs(Math.cos(THETA_STAR) - THETA_STAR), seriesTerms: SERIES.terms, seriesSum: SERIES.sum, seriesResidual: Math.abs(SERIES.sum - THETA_STAR) };
    const lw = lawvere('not'), li = lawvere('id');
    const diagonal = { not: lw, id: li, ...ALL_LISTINGS };
    const out = { pageTable, pinching, stationary, channel, twoAxis, dottie, diagonal };
    instCache.set(key, out);
    if (instCache.size > 60) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /** Everything the page shows, from the state. */
  function model() {
    const t = S.t;
    // F₁
    const x = S.slot, path = pathOf(PARENT0, x), hops0 = path.length - 1, hops1 = hopsOf(PARENT1, x);
    const swing = ease(clamp(t - 4, 0, 1)), table = t >= 5 ? PARENT1 : PARENT0;
    let head;
    if (t < 4) { const k = Math.min(Math.floor(t), hops0); head = x === 0 ? { loop: (t / 4) % 1 } : k >= hops0 ? { at: path[hops0] } : { from: path[k], to: path[k + 1], f: t - k }; }
    else if (t < 5) head = x === 0 ? { loop: 0 } : { at: path[hops0] };
    else { const f = clamp(t - 5, 0, 1); head = x === 0 ? { loop: f % 1 } : { from: x, to: PARENT1[x], f }; }
    const ptr = { x, path, hops0, hops1, swing, table, head, compressed: t >= 5, idem: idemResidual(table) };
    // F₂
    const it = dottieIterates(S.theta0, MAXT[1]), cw = cobweb(it, S.scene === 1 ? t : MAXT[1]);
    const th = cw.theta;
    const dot = { it, cw, theta: th, cos: Math.cos(th), sin: Math.sin(th), gap: Math.cos(th) - th, err: Math.abs(th - THETA_STAR) };
    // F₃
    const st = S.scene === 2 ? t : MAXT[2], r = channelPoint(S.r0, S.lam, st);
    const chan = { r, dist: v3.len(v3.sub(r, [0, 0, ZSTAR])), dist0: v3.len(v3.sub(S.r0, [0, 0, ZSTAR])), coherence: Math.hypot(r[0], r[1]) / 2, phase: -E0 * st, step: st };
    // F₄
    const rs = rounds(S.eps, 3), d1 = distillAt(S.eps), k = clamp(Math.ceil(t - 1e-9), 1, 3), prog = S.scene === 3 ? clamp(t - (k - 1), 0, 1) : 1;
    const dis = { eps: S.eps, rounds: rs, out: d1.out, closed: epsOutClosed(S.eps), ps: d1.ps, cubic: 35 * S.eps ** 3, suppression: d1.out > 0 ? S.eps / d1.out : Infinity, threshold: EPS_TH, basin: S.eps < EPS_TH, round: S.scene === 3 ? k : 1, progress: S.scene === 3 ? prog : 1 };
    dis.inEps = rs[dis.round - 1]; dis.outEps = rs[dis.round];
    // F₅
    const lw = lawvere(S.twist), sc5 = S.scene === 4 ? t : MAXT[4];
    const law = { ...lw, scan: sc5, head: headOf(sc5), lifted: [0, 1, 2, 3].map((a) => clamp((sc5 - a - 0.25) / 0.75, 0, 1)) };
    return { t, scene: S.scene, lens: S.lens, ptr, dot, chan, dis, law };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEW[1][0], pitch: VIEW[1][1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the marks */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 42]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 1))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key, text: l.html }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* The projection is fitted to the HUD-free rect at the scene's home view: the outline points of the scene (OUTLINE,
     filled in below, once the geometry constants exist) are projected with the home camera, and the unit is the
     largest that keeps their box inside the rect. While the reader orbits, the scene centre C stays where the fit put
     it, so nothing breathes; the fit is frozen during a handle drag. */
  const CENTRES = [[0, 0, 0.12], [0.6, -0.4, 0.45], [0, 0, 0.05], [0, -0.3, 0.45], [0, 0, 0.42]];
  const OUTLINE = [];
  const camAxes = (yaw, pitch) => { const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch); return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] }; };
  function fitTo(area, W, H, k) {
    const C = CENTRES[k], home = camAxes(VIEW[k][0], VIEW[k][1]);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const w of OUTLINE[k]) { const d = v3.sub(w, C), x = v3.dot(d, home.R), y = v3.dot(d, home.U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const pad = 8, unit = Math.max(20, Math.min((area.w - 2 * pad) / Math.max(0.2, x1 - x0), (area.h - 2 * pad) / Math.max(0.2, y1 - y0)));
    const X = area.x + area.w / 2 - unit * (x0 + x1) / 2, Y = area.y + area.h / 2 + unit * (y0 + y1) / 2;   // where C goes
    const now = camAxes(sc.cam.yaw, sc.cam.pitch), z = sc.cam.zoom || 1;
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (X - unit * z * v3.dot(C, now.R)) / Math.max(1, W);
    options.cy = (Y + unit * z * v3.dot(C, now.U)) / Math.max(1, H);
    return unit;
  }

  /* shared drawing helpers */
  function cylinder(key, c, z0, h, r, color, grid) {
    if (h <= 1e-4) return;
    sc.surface(key, (u, v) => [c[0] + r * Math.cos(v), c[1] + r * Math.sin(v), z0 + u * h], { u: [0, 1], v: [0, TAU], nu: 1, nv: 24, color, grid, pick: false });
    sc.surface(`${key}-cap`, (u, v) => [c[0] + u * r * Math.cos(v), c[1] + u * r * Math.sin(v), z0 + h], { u: [0, 1], v: [0, TAU], nu: 1, nv: 24, color, pick: false });
  }
  const ball = (key, c, r, color, n = 12) => sc.surface(key, (u, v) => v3.add(c, v3.scale(v3.sph(u, v), r)), { u: [0, PI], v: [0, TAU], nu: n, nv: 2 * n, color, pick: false });
  /** the quadratic Bézier arc a → b raised by h at its middle */
  function arcPts(a, b, h, n = 24) {
    const c = v3.add(mix3(a, b, 0.5), [0, 0, h]);
    return Array.from({ length: n + 1 }, (_, i) => { const s = i / n; return v3.add(v3.add(v3.scale(a, (1 - s) ** 2), v3.scale(c, 2 * s * (1 - s))), v3.scale(b, s * s)); });
  }
  const along = (pts, f) => { const x = clamp(f, 0, 1) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(x)); return mix3(pts[i], pts[i + 1], x - i); };
  function boxFaces(V, F, x0, y0, z0, x1, y1, z1) {
    const b = V.length;
    V.push([x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]);
    F.push([b, b + 1, b + 2, b + 3], [b + 4, b + 5, b + 6, b + 7], [b, b + 1, b + 5, b + 4], [b + 1, b + 2, b + 6, b + 5], [b + 2, b + 3, b + 7, b + 6], [b + 3, b, b + 4, b + 7]);
  }

  /* ---------- F₁ drawing ---------- */
  const RING_R = 0.8, DISK_R = 1.02, DISK_T = 0.1, PED_R = 0.075, PED_H = 0.05, SLOT0_ANG = 126 * DEG;
  const slotAng = (k) => SLOT0_ANG - k * TAU / NSLOT;
  const slotPos = (k, z = 0) => [RING_R * Math.cos(slotAng(k)), RING_R * Math.sin(slotAng(k)), z];
  const slotTop = (k) => slotPos(k, PED_H + 0.012);
  const ptrArc = (a, b) => arcPts(slotTop(a), slotTop(b), 0.16 + 0.28 * v3.len(v3.sub(slotPos(a), slotPos(b))));
  function loopPts(n = 40) {
    // the loop stands in the plane of the ring's tangent at slot 0, so the camera sees it open
    const c = slotTop(0), rad = [-Math.sin(SLOT0_ANG), Math.cos(SLOT0_ANG), 0], r = 0.15, ctr = v3.add(c, [0, 0, r]);
    return Array.from({ length: n + 1 }, (_, i) => { const a = -PI / 2 + TAU * i / n; return v3.add(ctr, v3.add(v3.scale(rad, r * Math.cos(a) * 0.9), v3.scale(UP, r * Math.sin(a)))); });
  }
  /** the arc from a towards a target swinging from b0 to b1 along the ring */
  function swingArc(a, b0, b1, s) {
    let a0 = slotAng(b0), a1 = slotAng(b1), d = Math.atan2(Math.sin(a1 - a0), Math.cos(a1 - a0));
    const ang = a0 + d * s, end = [RING_R * Math.cos(ang), RING_R * Math.sin(ang), PED_H + 0.012];
    return arcPts(slotTop(a), end, 0.16 + 0.28 * v3.len(v3.sub(slotTop(a), end)));
  }
  function drawPointer(M, at) {
    const { ptr } = M, fixedLens = S.lens === 'fixed';
    sc.surface('ptr-disk', (u, v) => [u * Math.cos(v + SLOT0_ANG), u * Math.sin(v + SLOT0_ANG), 0], { u: [0, DISK_R], v: [0, TAU], nu: 10, nv: 96, colors: [P.faint, P.violet], value: (u) => (u / DISK_R) ** 1.6, range: [0, 1], grid: { every: [4, 8], color: P.violet, alpha: 0.45 }, pick: false });
    sc.surface('ptr-wall', (u, v) => [DISK_R * Math.cos(v), DISK_R * Math.sin(v), -DISK_T * u], { u: [0, 1], v: [0, TAU], nu: 1, nv: 96, color: P.violet, pick: false });
    for (let k = 0; k < NSLOT; k++) cylinder(`ptr-ped-${k}`, slotPos(k), 0, PED_H, PED_R, k === 0 ? P.cyan : P.sigma);
    // pointers: cyan when they reach the root in one hop, magenta when they need more
    for (let a = 1; a < NSLOT; a++) {
      const b0 = PARENT0[a], b1 = PARENT1[a];
      let pts, direct;
      if (b0 === b1) { pts = ptrArc(a, b0); direct = b0 === 0; }
      else if (M.t < 4) { pts = ptrArc(a, b0); direct = false; }
      else if (M.t < 5) { pts = swingArc(a, b0, b1, ptr.swing); direct = ptr.swing >= 1; }
      else { pts = ptrArc(a, b1); direct = true; }
      const onPath = M.t < 4 && ptr.path.includes(a) && a !== ptr.path[ptr.path.length - 1];
      const color = direct ? P.cyan : P.magenta;
      sc.tube(`ptr-arc-${a}`, pts, { color, width: onPath ? 3.6 : 2.2, glow: onPath ? 0.5 : 0.25, pick: false });
      sc.arrow(along(pts, 0.84), pts[pts.length - 1], { color, width: 1, headSize: 8 });
    }
    const loop = loopPts();
    sc.tube('ptr-self', loop, { color: P.cyan, width: 3, glow: 0.45, pick: false });
    // the amber read head
    let hp;
    if (ptr.head.loop != null) hp = along(loop, ptr.head.loop);
    else if (ptr.head.at != null) hp = slotTop(ptr.head.at);
    else hp = along(ptrArc(ptr.head.from, ptr.head.to), ptr.head.f);
    sc.bead(v3.add(hp, [0, 0, 0.02]), { key: 'ptr-head', color: P.amber, r: 6 });
    sc.ring(slotTop(ptr.x), { key: 'ptr-start', color: P.amber, r: 11, normal: UP });
    // labels
    at(v3.add(slotTop(0), [0, 0, 0.36]), fixedLens ? 'x* = F(x*) = 0' : `Lookup(0) = 0 · p ≡ *p`, 'raw c-cy backed', 10, [-0.3, -1]);
    const xs = ptr.x;
    at(slotTop(xs), `x = ${xs}`, 'raw c-am backed', 9, null);
    if (!ptr.compressed && xs !== 0 && ptr.hops0 > 1) {
      const mid = ptr.path[Math.floor(ptr.hops0 / 2)], nx = ptr.path[Math.floor(ptr.hops0 / 2) + 1];
      at(along(ptrArc(mid, nx), 0.5), fixedLens ? `F(${xs}) = ${PARENT0[xs]} ≠ F(F(${xs}))` : L(`${ptr.hops0} 跳 · ${ptr.path.join(' → ')}`, `${ptr.hops0} hops · ${ptr.path.join(' → ')}`), 'raw c-mg backed', 8, null);
    } else if (ptr.compressed && xs !== 0) {
      at(along(ptrArc(xs, 0), 0.5), fixedLens ? 'F ∘ F = F · λ = 0' : L('1 跳 · O(1)', '1 hop · O(1)'), 'raw c-cy backed', 8, null);
    }
    const front = Math.atan2(-Math.cos(sc.cam.yaw), -Math.sin(sc.cam.yaw));
    const fp = [DISK_R * 0.98 * Math.cos(front + 0.5), DISK_R * 0.98 * Math.sin(front + 0.5), -DISK_T / 2];
    at(fp, ptr.idem === 0 ? 'P² = P' : 'P² ≠ P', 'raw c-vi backed', 7, [0.6, 1]);
    for (let k = 0; k < NSLOT; k++) at(slotPos(k), String(k), 'raw c-dm', 2, null);
  }

  /* ---------- F₂ drawing ---------- */
  const XA = [1, 0, 0], YI = [0, -1, 0], PLATE = { x0: -0.12, x1: 1.62, z1: 1.15 }, FACE = -0.008;
  const onCircle = (a, z = 0.012) => [Math.cos(a), -Math.sin(a), z];
  const onPlate = (x, y) => [x, FACE, y];
  function drawDottie(M, at) {
    const { dot } = M, fixedLens = S.lens === 'fixed', th = dot.theta;
    sc.surface('dot-disk', (u, v) => [u * Math.cos(v), u * Math.sin(v), 0], { u: [0, 1.12], v: [0, TAU], nu: 14, nv: 96, color: P.faint, grid: { every: [7, 8], color: P.magenta, alpha: 0.3 }, pick: false });
    sc.surface('dot-plate', (u, v) => [u, 0, v], { u: [PLATE.x0, PLATE.x1], v: [0, PLATE.z1], nu: 29, nv: 23, color: P.lineHot, grid: { every: [5, 5], color: P.cyan, alpha: 0.28 }, pick: false });
    // the unit circle and the ticks of 0 and θ*
    sc.line(Array.from({ length: 121 }, (_, i) => onCircle(TAU * i / 120, 0.006)), { color: P.sigma, width: 1.4, alpha: 0.85 });
    sc.bead(onCircle(THETA_STAR, 0.014), { key: 'dot-star-circle', color: P.violet, r: 3.6 });
    // the magenta arc θ, the magenta leg sin θ, the cyan shadow cos θ, and the arc straightened into a ruler
    if (th > 1e-3) sc.tube('dot-arc', Array.from({ length: 49 }, (_, i) => onCircle(th * i / 48, 0.016)), { color: P.magenta, width: 4.2, glow: 0.4, pick: false });
    sc.line([onCircle(th, 0.014), [Math.cos(th), 0, 0.014]], { color: P.magenta, width: 1.4, dash: [4, 3] });
    sc.line([[0, 0, 0.012], onCircle(th, 0.012)], { color: P.sigma, width: 1.1, dash: [3, 4], alpha: 0.7 });
    const yB = -0.03, yR = -0.13;
    sc.tube('dot-cos', [[0, yB, 0.018], [Math.max(1e-3, dot.cos), yB, 0.018]], { color: P.cyan, width: 4.6, glow: 0.5, pick: false });
    if (th > 1e-3) sc.tube('dot-ruler', [[0, yR, 0.018], [th, yR, 0.018]], { color: P.magenta, width: 4.2, glow: 0.4, pick: false });
    sc.line([[dot.cos, yB + 0.05, 0.02], [dot.cos, yB - 0.03, 0.02]], { color: P.cyan, width: 1.6 });
    sc.line([[th, yR + 0.03, 0.02], [th, yR - 0.05, 0.02]], { color: P.magenta, width: 1.6 });
    sc.line([[dot.cos, yB, 0.024], [th, yR, 0.024]], { color: P.ink, width: 1, dash: [2, 3], alpha: 0.8 });
    // the plane I: y = cos θ, y = θ and the cobweb from θ₀
    sc.tube('dot-curve', Array.from({ length: 61 }, (_, i) => { const x = (PI / 2) * i / 60; return onPlate(x, Math.cos(x)); }), { color: P.sigma, width: 2.4, glow: 0.2, pick: false });
    sc.line([onPlate(0, 0), onPlate(PLATE.z1, PLATE.z1)], { color: P.dim, width: 1.4, dash: [5, 4] });
    const cw = dot.cw.pts.map(([x, y]) => onPlate(x, y));
    if (cw.length > 1) sc.tube('dot-cobweb', cw, { color: P.violet, width: 2.8, glow: 0.45, pick: false });
    sc.bead(onPlate(THETA_STAR, THETA_STAR), { key: 'dot-star', color: P.violet, r: 5 });
    sc.bead(onPlate(dot.cw.tip[0], dot.cw.tip[1]), { key: 'dot-tip', color: P.amber, r: 3.8 });
    // the amber angle on the circle
    sc.bead(onCircle(th, 0.03), { key: 'dot-now', color: P.amber, r: 6 });
    // labels
    const T4 = fix(th, 4);
    at(mix3([0, yB, 0.02], [dot.cos, yB, 0.02], 0.55), fixedLens ? `F(θ) = cos θ = ${fix(dot.cos, 4)}` : `cos θ = ${fix(dot.cos, 4)}`, 'raw c-cy backed', 9, [0.2, -1]);
    at(onCircle(th * 0.55, 0.02), fixedLens ? `θ = ${T4}` : L(`弧长 θ = ${T4}`, `arc θ = ${T4}`), 'raw c-mg backed', 9, [0.5, 1]);
    at([th * 0.5, yR, 0.02], L('拉直的弧', 'arc straightened'), 'raw c-mg', 3, [-0.4, 1]);
    at(onPlate(THETA_STAR, THETA_STAR), fixedLens ? `θ* = F(θ*) = ${fix(THETA_STAR, 4)}` : `θ* = cos θ* = ${fix(THETA_STAR, 4)} · ${fix(THETA_STAR / DEG, 2)}°`, 'raw c-vi backed', 10, [1, -0.5]);
    at(onPlate(0.3, 0.62), fixedLens ? `λ = F′(θ*) = ${fix(LAMBDA_COS, 4)}` : `λ = −sin θ* = ${fix(LAMBDA_COS, 4)}`, 'raw c-vi backed', 7, [-1, -0.2]);
    at(onPlate(PLATE.x1 - 0.06, PLATE.z1 - 0.04), L('I · 实平面', 'I · real plane'), 'raw c-cy', 5, [-0.4, -1]);
    at([1.12 * Math.cos(-115 * DEG), 1.12 * Math.sin(-115 * DEG), 0], L('i · 盲平面', 'i · blind plane'), 'raw c-mg', 5, [-0.3, 1]);
    at(onPlate(0.12, 1.0), 'y = cos θ', 'raw c-ik', 4, [-1, -0.3]);
  }

  /* ---------- F₃ drawing ---------- */
  function drawChannel(M, at) {
    const { chan } = M, fixedLens = S.lens === 'fixed', p = S.lam;
    // the far half of the ball (about the view direction) is an opaque inner wall, the near half glass
    const D = sc.facing(), a1 = v3.unit(v3.cross(D, Math.abs(D[2]) < 0.9 ? UP : [1, 0, 0])), a2 = v3.cross(D, a1);
    sc.surface('ch-back', (u, v) => v3.scale(v3.add(v3.scale(D, -Math.cos(u)), v3.add(v3.scale(a1, Math.sin(u) * Math.cos(v)), v3.scale(a2, Math.sin(u) * Math.sin(v)))), 0.985),
      { u: [0, PI / 2], v: [0, TAU], nu: 14, nv: 48, color: P.faint, grid: { every: [3, 6], color: P.cyan, alpha: 0.16 }, pick: false });
    sc.glass('ch-ball', [0, 0, 0], 1, { color: P.sigma, alpha: 0.06, rim: 0.28 });
    sc.circle([0, 0, 0], UP, 1, { color: P.sigma, width: 1.2, alpha: 0.7 });
    sc.circle([0, 0, 0], [0, 1, 0], 1, { color: P.sigma, width: 1, alpha: 0.4 });
    sc.circle([0, 0, 0], [1, 0, 0], 1, { color: P.sigma, width: 1, alpha: 0.4 });
    // the invariant axis, the eigenstate and its phase fibre
    sc.line([[0, 0, -1.18], [0, 0, 1.16]], { color: P.cyan, width: 1.5, dash: [6, 4] });
    sc.arrow([0, 0, 0], [0, 0, 1], { color: P.cyan, width: 3.4, headSize: 14 });
    const fib = (a) => [0.3 * Math.cos(a), 0.3 * Math.sin(a), 1.1];
    sc.tube('ch-fibre', Array.from({ length: 73 }, (_, i) => fib(TAU * i / 72)), { color: P.violet, width: 3.2, glow: 0.5, pick: false });
    sc.bead(fib(chan.phase), { key: 'ch-phase', color: P.violet, r: 6 });
    sc.arrow(fib(chan.phase + 0.5), fib(chan.phase + 0.18), { color: P.violet, width: 1.2, headSize: 8 });
    ball('ch-star', [0, 0, ZSTAR], 0.045, P.cyan, 10);
    // the channel: two faint paths and the main one, its traversed part solid
    const path = (r0, s1, n = 160) => Array.from({ length: n + 1 }, (_, i) => channelPoint(r0, p, s1 * i / n));
    EXTRA_STARTS.forEach((r0, k) => { sc.tube(`ch-extra-${k}`, path(r0, MAXT[2]), { color: P.magenta, width: 1.6, alpha: 0.42, pick: false }); sc.bead(r0, { key: `ch-extra-start-${k}`, color: P.magenta, r: 3.2, alpha: 0.7 }); });
    sc.tube('ch-future', path(S.r0, MAXT[2]), { color: P.magenta, width: 1.6, alpha: 0.35, pick: false });
    if (chan.step > 0.02) sc.tube('ch-main', path(S.r0, chan.step, Math.max(8, Math.round(chan.step * 14))), { color: P.magenta, width: 3, glow: 0.4, pick: false });
    for (let n = 1; n <= Math.floor(chan.step + 1e-9); n++) sc.bead(channelPoint(S.r0, p, n), { key: `ch-step-${n}`, color: P.magenta, r: 2.6 });
    // the transverse coherence (magenta) and the pinched state on the axis (cyan)
    const foot = [0, 0, chan.r[2]];
    if (chan.coherence > 1e-4) sc.tube('ch-coh', [foot, chan.r], { color: P.magenta, width: 3.6, glow: 0.5, pick: false });
    sc.ring(foot, { key: 'ch-pinch', color: P.cyan, r: 6, normal: UP });
    sc.bead(chan.r, { key: 'ch-now', color: P.amber, r: 6.4 });
    sc.ring(S.r0, { key: 'ch-start', color: P.amber, r: 8, normal: S.r0 });
    // labels
    at([0, 0, 1], fixedLens ? 'U|0⟩ = e<sup>−iE₀t</sup>|0⟩' : '|0⟩ · H|0⟩ = E₀|0⟩', 'raw c-cy backed', 8, [1, 0.2]);
    at(fib(PI * 0.8), fixedLens ? '|λ| = 1' : L('相位 e<sup>−iE₀t</sup> · |λ| = 1', 'phase e<sup>−iE₀t</sup> · |λ| = 1'), 'raw c-vi backed', 10, [-0.6, -1]);
    at([0, 0, ZSTAR], fixedLens ? `ρ* = ℰ(ρ*) · λ = ${fix(p, 2)}` : 'ρ* = ℰ(ρ*)', 'raw c-cy backed', 9, [-1, 0.3]);
    if (chan.coherence > 1e-3) at(mix3(foot, chan.r, 0.5), `|ρ₀₁| = ${fix(chan.coherence, 4)}`, 'raw c-mg backed', 7, [0.4, 1]);
    at(chan.r, `ρ<sub>${Math.round(chan.step)}</sub>`, 'raw c-am backed', 6, [1, -0.6]);
    at([0, 0, -1], '|1⟩', 'raw c-dm', 3, [1, 0.4]);
  }

  /* ---------- F₄ drawing ---------- */
  const TET_C = [0, 0, 0.3], TET_R = 0.78;
  const TET = [0, 1, 2, 3].map((k) => (k === 0 ? v3.add(TET_C, [0, 0, TET_R]) : v3.add(TET_C, [TET_R * (2 * Math.SQRT2 / 3) * Math.cos(TAU * (k - 1) / 3 - 1.2), TET_R * (2 * Math.SQRT2 / 3) * Math.sin(TAU * (k - 1) / 3 - 1.2), -TET_R / 3])));
  const QPOS = Array.from({ length: NQ }, (_, k) => { const m = k + 1, cs = [0, 1, 2, 3].filter((i) => (m >> i) & 1); return v3.scale(cs.reduce((s, i) => v3.add(s, TET[i]), [0, 0, 0]), 1 / cs.length); });
  const TET_FACES = [[1, 2, 3], [0, 2, 1], [0, 3, 2], [0, 1, 3]];
  /** the edges of the four check cells (each a cube on the 8 qubits containing corner i), shared edges once: 28 */
  const CELL_EDGES = (() => {
    const e = [];
    for (let m = 1; m <= NQ; m++) for (let j = 0; j < 4; j++) if (!((m >> j) & 1) && (m | (1 << j)) <= NQ && popcount(m) <= 3) e.push([m - 1, (m | (1 << j)) - 1]);
    return e;
  })();
  const OUT_POS = v3.add(TET[0], [0, 0, 0.5]);
  /** the ε ruler lies across the home view of the scene (along its screen-right axis), in front of and below the prism */
  const RULER = (() => {
    const yaw = VIEW[3][0], d = [Math.cos(yaw), -Math.sin(yaw), 0], n = [-Math.sin(yaw), -Math.cos(yaw), 0];
    return { d, n, c: v3.add([0, 0, -0.4], v3.scale(n, 0.62)), half: 1.0 };
  })();
  const rulerPt = (e, dz = 0) => v3.add(v3.add(RULER.c, v3.scale(RULER.d, RULER.half * (2 * clamp(e / 0.5, 0, 1) - 1))), [0, 0, dz]);
  const rulerAt = (e, w, dz = 0) => v3.add(rulerPt(e, dz), v3.scale(RULER.n, w));
  const haloR = (e) => 0.05 + 0.22 * Math.sqrt(clamp(e, 0, 0.5));
  function drawDistill(M, at) {
    const { dis } = M, fixedLens = S.lens === 'fixed', D = sc.facing(), s = dis.progress;
    // the tetrahedron: walls that face away are opaque (seen from inside), walls that face the viewer are glass
    const back = [], front = [];
    TET_FACES.forEach((f) => {
      const n = v3.cross(v3.sub(TET[f[1]], TET[f[0]]), v3.sub(TET[f[2]], TET[f[0]])), mid = v3.scale(v3.add(v3.add(TET[f[0]], TET[f[1]]), TET[f[2]]), 1 / 3);
      const out = v3.dot(n, v3.sub(mid, TET_C)) > 0 ? n : v3.scale(n, -1);
      (v3.dot(out, D) < 0 ? back : front).push(f);
    });
    if (back.length) sc.poly('tet-back', { vertices: TET, faces: back }, { color: P.faint, edges: P.violet });
    if (front.length) sc.poly('tet-front', { vertices: TET, faces: front }, { color: P.violet, alpha: 0.08, edges: false });
    for (const [a, b] of [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]]) sc.tube(`tet-edge-${a}${b}`, [TET[a], TET[b]], { color: P.violet, width: 2.6, glow: 0.4, pick: false });
    for (const [a, b] of CELL_EDGES) sc.line([QPOS[a], QPOS[b]], { color: P.violet, width: 1.1, alpha: 0.55 });
    // the 15 noisy T gates with their error halos
    const hIn = haloR(dis.inEps);
    QPOS.forEach((q, k) => { ball(`q-${k}`, q, 0.042, P.sigma, 8); sc.glass(`q-halo-${k}`, q, hIn * 0.5, { color: P.magenta, alpha: 0.1, rim: 0.4 }); });
    // syndrome branches: the 15 rejected ones point at the qubit whose single error they report
    const grow = ease(clamp(s / 0.6, 0, 1));
    const wRej = 1.2 + 10 * Math.sqrt((1 - dis.ps) / 15), wAcc = 1.6 + 7 * Math.sqrt(dis.ps);
    QPOS.forEach((q, k) => {
      const d = k === NQ - 1 ? [0, 0, -1] : v3.unit(v3.sub(q, TET_C)), end = v3.add(q, v3.scale(d, 0.28 * grow));
      if (grow > 0.02) sc.tube(`rej-${k}`, [v3.add(q, v3.scale(d, 0.05)), end], { color: P.magenta, width: wRej, alpha: (t) => 1 - 0.75 * t, pick: false });
    });
    const accPts = [TET_C, mix3(TET_C, TET[0], 0.55), v3.add(TET[0], [0, 0, 0.12]), OUT_POS];
    const acc = Array.from({ length: 31 }, (_, i) => along(accPts, i / 30 * grow));
    if (grow > 0.02) sc.tube('acc', acc, { color: P.cyan, width: wAcc, glow: 0.5, pick: false });
    const outOn = ease(clamp((s - 0.55) / 0.45, 0, 1));
    if (outOn > 0) { ball('t-out', OUT_POS, 0.07 * outOn, P.cyan, 12); sc.glass('t-out-halo', OUT_POS, 0.07 + 0.5 * haloR(dis.outEps) * outOn, { color: P.magenta, alpha: 0.08, rim: 0.35 }); }
    // the ε ruler: the cyan basin below the threshold, magenta above
    const strip = (key, e0, e1, color) => sc.surface(key, (u, v) => rulerAt(e0 + (e1 - e0) * u, 0.07 * v), { u: [0, 1], v: [-1, 1], nu: 12, nv: 1, color, pick: false });
    strip('ruler-basin', 0, EPS_TH, P.cyan); strip('ruler-above', EPS_TH, 0.5, P.magenta);
    sc.surface('ruler-base', (u, v) => v3.add(v3.add(RULER.c, v3.scale(RULER.d, RULER.half * (2.1 * u - 1.05))), v3.add([0, 0, -0.012], v3.scale(RULER.n, 0.1 * v))), { u: [0, 1], v: [-1, 1], nu: 1, nv: 1, color: P.panelEdge, pick: false });
    for (const e of [0, 0.1, 0.2, 0.3, 0.4, 0.5]) sc.line([rulerAt(e, -0.07, 0.004), rulerAt(e, -0.16, 0.004)], { color: P.ink, width: 1, alpha: 0.7 });
    sc.line([rulerAt(EPS_TH, 0.07, 0.004), rulerAt(EPS_TH, 0.17, 0.06)], { color: P.ink, width: 1.6 });
    // the hops of the completed rounds on the ruler
    for (let j = 1; j <= dis.round; j++) {
      const a = rulerPt(dis.rounds[j - 1], 0.01), b = rulerPt(dis.rounds[j], 0.01), f = j < dis.round ? 1 : ease(clamp((s - 0.4) / 0.6, 0, 1));
      if (f <= 0 || Math.abs(a[0] - b[0]) < 1e-4) continue;
      const hop = arcPts(a, b, 0.08 + 0.35 * Math.abs(a[0] - b[0]), 28).slice(0, Math.max(2, Math.round(28 * f) + 1));
      sc.tube(`hop-${j}`, hop, { color: dis.basin ? P.cyan : P.magenta, width: 2, glow: 0.3, pick: false });
    }
    sc.bead(rulerPt(dis.out, 0.02), { key: 'ruler-out', color: dis.basin ? P.cyan : P.magenta, r: 4.2 });
    sc.ring(rulerPt(S.eps, 0.016), { key: 'ruler-eps', color: P.amber, r: 9, normal: UP });
    // labels
    const outTxt = dis.outEps < 1e-3 ? sci(dis.outEps, 2) : fix(dis.outEps, 5);
    at(OUT_POS, fixedLens ? `F(ε) = ${outTxt}` : `T · ε<sub>out</sub> = ${outTxt}`, 'raw c-cy backed', 10, [1, -0.4]);
    at(QPOS[1], L(`15 × T · ε = ${dis.inEps < 1e-3 ? sci(dis.inEps, 2) : fix(dis.inEps, 4)}`, `15 × T · ε = ${dis.inEps < 1e-3 ? sci(dis.inEps, 2) : fix(dis.inEps, 4)}`), 'raw c-mg backed', 8, [-1, 0.2]);
    if (grow > 0.5) at(mix3(TET_C, TET[0], 0.35), L(`接受 ${pct(dis.ps)}`, `accepted ${pct(dis.ps)}`), 'raw c-cy backed', 7, [1, 0.3]);
    if (grow > 0.5) at(v3.add(QPOS[2], v3.scale(v3.unit(v3.sub(QPOS[2], TET_C)), 0.3)), L(`丢弃 ${pct(1 - dis.ps)}`, `discarded ${pct(1 - dis.ps)}`), 'raw c-mg backed', 6, null);
    at(rulerPt(EPS_TH, 0.06), fixedLens ? `ε<sub>th</sub> = F(ε<sub>th</sub>) = ${fix(EPS_TH, 4)}` : `ε<sub>th</sub> = ${fix(EPS_TH, 4)}`, 'raw c-ik backed', 9, [0.3, -1]);
    at(rulerPt(S.eps, 0.02), `ε = ${fix(S.eps, 4)}`, 'raw c-am backed', 9, [-0.3, 1]);
    at(rulerAt(0, -0.16), '0', 'raw c-dm', 3, [-0.3, 1]);
    at(rulerAt(0.5, -0.16), '0.5', 'raw c-dm', 3, [0.3, 1]);
    at(TET[2], L('4 个检验胞 × 8', '4 check cells × 8'), 'raw c-vi', 4, null);
  }

  /* ---------- F₅ drawing ---------- */
  const CELL = 0.4, ZD = 0.95, YD = 0.0;
  const colX = (b) => (b - 1.5) * CELL, rowY = (a) => (a - 1.5) * CELL;
  const cellH = (v) => (v ? 0.16 : 0.035);
  function ribbon(key, a, grow, twist, color) {
    const B = [colX(a), rowY(a), cellH(GTAB[a][a]) + 0.02], T = [colX(a), YD, ZD - 0.03], d = v3.sub(T, B), dn = v3.unit(d), e1 = [1, 0, 0], e2 = v3.cross(dn, e1);
    const w = 0.055;
    sc.surface(key, (u, v) => { const c = v3.add(B, v3.scale(d, u * grow)), ph = twist * u * grow, e = v3.add(v3.scale(e1, Math.cos(ph)), v3.scale(e2, Math.sin(ph))); return v3.add(c, v3.scale(e, w * v)); },
      { u: [0, 1], v: [-1, 1], nu: 24, nv: 1, color, pick: false });
    return v3.add(B, v3.scale(d, grow));
  }
  function drawLawvere(M, at) {
    const { law } = M, fixedLens = S.lens === 'fixed', twist = S.twist === 'not' ? PI : 0;
    sc.surface('lw-base', (u, v) => [u, v, -0.06], { u: [-0.92, 0.92], v: [-0.92, 0.92], nu: 1, nv: 1, color: P.panelEdge, pick: false });
    sc.surface('lw-base-side', (u, v) => { const a = u * 4, k = Math.floor(Math.min(3.999, a)), f = a - k, c = [[-0.92, -0.92], [0.92, -0.92], [0.92, 0.92], [-0.92, 0.92], [-0.92, -0.92]]; return [c[k][0] + (c[k + 1][0] - c[k][0]) * f, c[k][1] + (c[k + 1][1] - c[k][1]) * f, -0.06 - 0.06 * v]; }, { u: [0, 1], v: [0, 1], nu: 4, nv: 1, color: P.panelEdge, pick: false });
    const V = [], F = [], colors = [];
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
      const v = GTAB[a][b], g = 0.035;
      boxFaces(V, F, colX(b) - CELL / 2 + g, rowY(a) - CELL / 2 + g, 0, colX(b) + CELL / 2 - g, rowY(a) + CELL / 2 - g, cellH(v));
      for (let q = 0; q < 6; q++) colors.push(v ? P.cyan : P.lineHot);
    }
    sc.poly('lw-cells', { vertices: V, faces: F }, { colors, edges: P.ink });
    // the escaped row at level ℓ + 1, cell by cell as the head lifts it
    const capt = S.twist === 'id' && law.capturedRow >= 0, rowColor = capt ? P.cyan : P.magenta;
    sc.surface('lw-level', (u, v) => [u, YD + v, ZD - 0.035], { u: [-0.9, 0.9], v: [-0.26, 0.26], nu: 1, nv: 1, color: P.violet, alpha: 0.12, pick: false });
    const DV = [], DF = [], dcol = [];
    for (let a = 0; a < 4; a++) {
      const f = law.lifted[a];
      if (f <= 0) continue;
      const tip = ribbon(`lw-rib-${a}`, a, ease(Math.min(1, f / 0.8)), twist, P.violet);
      if (f < 1) sc.bead(tip, { key: `lw-tip-${a}`, color: P.violet, r: 4 });
      if (f >= 0.8) {
        const k = ease((f - 0.8) / 0.2), h = (law.diag[a] ? 0.2 : 0.012) * k, g = 0.035;
        boxFaces(DV, DF, colX(a) - CELL / 2 + g, YD - CELL / 2 + g, ZD, colX(a) + CELL / 2 - g, YD + CELL / 2 - g, ZD + Math.max(0.006, h));
        for (let q = 0; q < 6; q++) dcol.push(rowColor);
      }
    }
    if (DF.length) sc.poly('lw-diag', { vertices: DV, faces: DF }, { colors: dcol, edges: P.ink });
    // the amber head on (a, a)
    const ha = law.head, hp = [colX(ha), rowY(ha), cellH(GTAB[ha][ha]) + 0.03];
    sc.ring(hp, { key: 'lw-head', color: P.amber, r: 15, normal: UP });
    // labels
    const wide = stageEl.clientWidth >= 520;   // narrow frames name the rows only; the readouts list their bits
    for (let a = 0; a < 4; a++) at([colX(0) - CELL / 2, rowY(a), 0.04], wide ? `g(${a}, ·) = ${GTAB[a].join('')}` : `g(${a}, ·)`, 'raw c-cy', 5 - a * 0.1, [-1, 0.15]);
    const done = law.lifted.every((f) => f >= 1), dtxt = law.diag.join('');
    if (done) {
      at([colX(3) + CELL / 2, YD, ZD + 0.1], fixedLens ? (capt ? `x* = id(x*) · = g(${law.capturedRow}, ·)` : '¬b ≠ b · x* = ¬x* ✗')
        : capt ? `diagonal(id, g) = ${dtxt} = g(${law.capturedRow}, ·)` : `diagonal(¬, g) = ${dtxt} <span class="sym">∉</span> range g`, `raw ${capt ? 'c-cy' : 'c-mg'} backed`, 10, [1, -0.5]);
    }
    if (law.lifted[ha] > 0.3) at(mix3([colX(ha), rowY(ha), 0.2], [colX(ha), YD, ZD], 0.5), S.twist === 'not' ? (fixedLens ? '¬ = î², î² = −1' : `¬ · ${GTAB[ha][ha]} → ${law.diag[ha]}`) : `id · ${GTAB[ha][ha]} → ${law.diag[ha]}`, 'raw c-vi backed', 8, [1, 0]);
    at([colX(-0.6), YD, ZD], 'ℓ + 1', 'raw c-vi', 6, [-1, -0.3]);
    at(hp, `(${ha}, ${ha})`, 'raw c-am backed', 9, [0.6, 1]);
  }

  /* the outline points of each scene, for fitTo */
  const ring = (r, z, n = 24, c = [0, 0]) => Array.from({ length: n }, (_, i) => [c[0] + r * Math.cos(TAU * i / n), c[1] + r * Math.sin(TAU * i / n), z]);
  OUTLINE[0] = [...ring(DISK_R, 0), ...ring(DISK_R, -DISK_T), v3.add(slotTop(0), [0, 0, 0.42]), [0, 0, 0.5]];
  OUTLINE[1] = [...ring(1.12, 0), [PLATE.x0, 0, 0], [PLATE.x1, 0, 0], [PLATE.x0, 0, PLATE.z1 + 0.06], [PLATE.x1, 0, PLATE.z1 + 0.06]];
  OUTLINE[2] = [...Array.from({ length: 64 }, (_, i) => { const z = 1 - 2 * (i + 0.5) / 64, r = Math.sqrt(1 - z * z), a = i * 2.399963229728653; return [r * Math.cos(a), r * Math.sin(a), z]; }), ...ring(0.36, 1.1, 12), [0, 0, -1.2], [0, 0, 1.2]];
  OUTLINE[3] = [...TET, v3.add(OUT_POS, [0, 0, 0.12]), ...QPOS.map((q, k) => v3.add(q, v3.scale(k === NQ - 1 ? [0, 0, -1] : v3.unit(v3.sub(q, TET_C)), 0.3))),
    rulerAt(0, -0.2), rulerAt(0.5, -0.2), rulerAt(0, 0.18), rulerAt(0.5, 0.18), rulerAt(0, -0.32, -0.05), rulerAt(0.5, -0.32, -0.05)];
  OUTLINE[4] = [[-0.92, -0.92, -0.12], [0.92, -0.92, -0.12], [0.92, 0.92, -0.12], [-0.92, 0.92, -0.12], [-0.92, 0.92, 0.2], [0.92, 0.92, 0.2], [-0.92, -0.92, 0.2], [0.92, -0.92, 0.2],
    [-0.82, YD - 0.22, ZD + 0.22], [0.82, YD - 0.22, ZD + 0.22], [-0.82, YD + 0.22, ZD + 0.22], [0.82, YD + 0.22, ZD + 0.22]];

  /* ---------- the stage frame ---------- */
  let FRAME = null, FIT = null, dragging = null;
  const DRAW = [drawPointer, drawDottie, drawChannel, drawDistill, drawLawvere];
  function handleWorld(M) {
    if (S.scene === 0) return v3.add(slotTop(S.slot), [0, 0, 0.02]);
    if (S.scene === 1) return onCircle(M.dot.theta, 0.03);
    if (S.scene === 2) return S.r0;
    if (S.scene === 3) return rulerPt(S.eps, 0.016);
    return [colX(M.law.head), rowY(M.law.head), cellH(GTAB[M.law.head][M.law.head]) + 0.03];
  }
  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    if (!dragging || !FIT || FIT.scene !== S.scene) FIT = { area, scene: S.scene };
    fitTo(FIT.area, W, H, S.scene);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    sc.begin();
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    DRAW[S.scene](M, at);
    sc.end();
    const hw = handleWorld(M), hq = !thumb ? sc.p(hw) : null;
    if (hq) OBST.push({ x: hq[0] - 17, y: hq[1] - 17, w: 34, h: 34 });
    placeHandle(hq);
    if (!thumb) {
      for (const m of sc.marks()) { const b = stageEl.getBoundingClientRect(); OBST.push({ x: m.x - b.left - 5, y: m.y - b.top - 5, w: 10, h: 10 }); }
      const cen = sc.p(CENTRES[S.scene]);
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${S.scene}-${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the amber handle: a button on the stage, dragged along its object ---------- */
  const handle = $('handle');
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  const local = (ev) => { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; };
  function nearestIndex(list, xy) { let best = 0, bd = Infinity; list.forEach((w, k) => { const q = sc.p(w), d = Math.hypot(q[0] - xy[0], q[1] - xy[1]); if (d < bd) { bd = d; best = k; } }); return best; }
  const THETA_SAMPLES = Array.from({ length: 601 }, (_, i) => 1.5 * i / 600);
  const EPS_SAMPLES = Array.from({ length: 1001 }, (_, i) => 0.5 * i / 1000);
  /** what the pointer at stage coordinates xy means for the scene's handle */
  function dragValue(xy) {
    if (S.scene === 0) return { slot: nearestIndex(Array.from({ length: NSLOT }, (_, k) => slotTop(k)), xy) };
    if (S.scene === 1) return { theta0: THETA_SAMPLES[nearestIndex(THETA_SAMPLES.map((a) => onCircle(a, 0.03)), xy)] };
    if (S.scene === 2) {
      const o = sc.p([0, 0, 0]), x = (xy[0] - o[0]) / sc.unit, y = (o[1] - xy[1]) / sc.unit, r2 = x * x + y * y;
      const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
      const R = [cy, -sy, 0], U = [sy * sp, cy * sp, cp], D = [-sy * cp, -cy * cp, sp];
      const k = r2 > 1 ? 1 / Math.sqrt(r2) : 1, dz = r2 > 1 ? 0 : Math.sqrt(1 - r2);
      return { r0: v3.unit(v3.add(v3.add(v3.scale(R, x * k), v3.scale(U, y * k)), v3.scale(D, dz))) };
    }
    if (S.scene === 3) return { eps: EPS_SAMPLES[nearestIndex(EPS_SAMPLES.map((e) => rulerPt(e, 0.016)), xy)] };
    return { head: nearestIndex([0, 1, 2, 3].map((a) => [colX(a), rowY(a), cellH(GTAB[a][a]) + 0.03]), xy) };
  }
  function applyDrag(v) {
    if (v.slot != null) { S.slot = v.slot; fSlot.set(v.slot); }
    if (v.theta0 != null) { S.theta0 = v.theta0; fTheta.set(v.theta0); clock.set(0); return; }
    if (v.r0) S.r0 = v.r0;
    if (v.eps != null) { S.eps = v.eps; fEps.set(v.eps); }
    if (v.head != null) { clock.set(v.head + 1); return; }
    paint();
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    applyDrag(dragValue(local(ev)));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const k = ev.key === 'ArrowRight' ? 1 : -1;
    if (S.scene === 0) applyDrag({ slot: (S.slot + k + NSLOT) % NSLOT });
    else if (S.scene === 1) applyDrag({ theta0: clamp(Math.round((S.theta0 + 0.05 * k) * 100) / 100, 0, 1.5) });
    else if (S.scene === 2) applyDrag({ r0: v3.unit(v3.rot(S.r0, UP, 10 * DEG * k)) });
    else if (S.scene === 3) applyDrag({ eps: clamp(Math.round((S.eps + 0.005 * k) * 2000) / 2000, 0, 0.5) });
    else applyDrag({ head: clamp(headOf(S.t) + k, 0, 3) });
  });

  /* ---------- HUD, legend, readouts ---------- */
  const isFixed = () => S.lens === 'fixed';
  const LEGENDS = [
    () => [['cy', L('直连根的指针 · 自环 0', 'direct root links · self-loop 0')], ['mg', L('多跳链', 'multi-hop chain')], ['vi', L('表盘 P² = P', 'table P² = P')], ['am', L('读头 x', 'read head x')]],
    () => [['cy', L('I 投影 cos θ', 'I-projection cos θ')], ['mg', L('i 弧长 θ', 'i-arc θ')], ['vi', L('蛛网 θ ↦ cos θ', 'cobweb θ ↦ cos θ')], ['am', L('当前角 θ', 'current angle θ')]],
    () => [['cy', L('不变轴 · |0⟩ · ρ*', 'invariant axis · |0⟩ · ρ*')], ['mg', L('横向相干', 'transverse coherence')], ['vi', L('相位纤维', 'phase fibre')], ['am', L('当前态', 'current state')]],
    () => [['cy', L('接受 · ε < ε<sub>th</sub>', 'accepted · ε < ε<sub>th</sub>')], ['mg', L('丢弃 · ε > ε<sub>th</sub>', 'discarded · ε > ε<sub>th</sub>')], ['vi', L('检验骨架', 'check scaffold')], ['am', L('噪声 ε', 'noise ε')]],
    () => [['cy', L('目录行 g(a, ·)', 'rows g(a, ·)')], ['mg', L('逃逸对角线', 'escaped diagonal')], ['vi', L('升层扭转', 'lifting twist')], ['am', L('读头 (a, a)', 'head (a, a)')]]
  ];
  function hudText(M) {
    const f = isFixed(), { ptr, dot, chan, dis, law } = M;
    let big, sub;
    if (S.scene === 0) {
      big = f ? 'F₁ · x* = F(x*) = 0' : 'F₁ · Lookup(0) = 0 · p ≡ *p';
      sub = f ? `F = find · ${ptr.idem === 0 ? 'F ∘ F = F' : 'F ∘ F ≠ F'} · λ = 0`
        : L(`Lookup(${ptr.x})：${ptr.hops0} 跳 → ${ptr.hops1} 跳 · ${ptr.idem === 0 ? 'P² = P' : 'P² ≠ P'} · |λ| = 0`, `Lookup(${ptr.x}): ${ptr.hops0} hops → ${ptr.hops1} · ${ptr.idem === 0 ? 'P² = P' : 'P² ≠ P'} · |λ| = 0`);
    } else if (S.scene === 1) {
      big = f ? `F₂ · θ* = F(θ*) = ${fix(THETA_STAR, 4)}` : `F₂ · cos θ* = θ* = ${fix(THETA_STAR, 4)}`;
      sub = f ? `λ = F′(θ*) = ${fix(LAMBDA_COS, 4)} · |θ<sub>n</sub> − θ*| = ${dot.err < 1e-4 ? sci(dot.err, 1) : fix(dot.err, 4)}`
        : `λ = −sin θ* = ${fix(LAMBDA_COS, 4)} · cos²θ* = ${pct(THETA_STAR ** 2)} · sin²θ* = ${pct(1 - THETA_STAR ** 2)}`;
    } else if (S.scene === 2) {
      big = f ? `F₃ · ρ* = ℰ(ρ*) · λ = ${fix(S.lam, 2)}` : 'F₃ · UρU† = ρ';
      sub = f ? L(`U 的相位 |λ| = 1 · 距离 ${fix(chan.dist, 4)} = ${fix(S.lam, 2)}ⁿ · ${fix(chan.dist0, 3)}`, `phase of U |λ| = 1 · distance ${fix(chan.dist, 4)} = ${fix(S.lam, 2)}ⁿ · ${fix(chan.dist0, 3)}`)
        : L(`相位 |λ| = 1 · 信道 |λ| = ${fix(S.lam, 2)} → ℰ(ρ*) = ρ*`, `phase |λ| = 1 · channel |λ| = ${fix(S.lam, 2)} → ℰ(ρ*) = ρ*`);
    } else if (S.scene === 3) {
      const o = dis.out < 1e-3 ? sci(dis.out, 2) : fix(dis.out, 5);
      big = f ? `F₄ · ε* = F(ε*) ∈ {0, ${fix(EPS_TH, 4)}, 0.5}` : `F₄ · ε<sub>out</sub> = ${o}`;
      sub = f ? L(`F′(0) = 0 · 立方收缩 35ε³ · ε = ${fix(S.eps, 4)} → ${o}`, `F′(0) = 0 · cubic 35ε³ · ε = ${fix(S.eps, 4)} → ${o}`)
        : `35ε³ = ${fix(dis.cubic, 5)} · ε<sub>th</sub> = ${fix(EPS_TH, 4)} · dε<sub>out</sub>/dε|₀ = 0`;
    } else {
      const capt = S.twist === 'id' && law.capturedRow >= 0;
      big = f ? (capt ? 'F₅ · id(b) = b' : 'F₅ · ¬b ≠ b') : (capt ? `F₅ · diagonal(id, g) = g(${law.capturedRow}, ·)` : 'F₅ · diagonal(¬, g) <span class="sym">∉</span> range g');
      sub = f ? (capt ? L('有不动点 · 对角线被目录收住', 'fixed points · the listing catches the diagonal') : L('没有 x* = F(x*) · 对角线逃出每个目录', 'no x* = F(x*) · the diagonal escapes every listing'))
        : capt ? L(`${law.diag.join('')} 恰是第 ${law.capturedRow} 行`, `${law.diag.join('')} is row ${law.capturedRow}`) : L(`${law.diag.join('')} 在 (a, a) 处与每一行不同 · 升到 ℓ + 1`, `${law.diag.join('')} differs from every row at (a, a) · up to ℓ + 1`);
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = LEGENDS[S.scene]().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const LAMBDA_TXT = () => ['|λ| = 0', `λ = ${fix(LAMBDA_COS, 4)}`, `|λ| = 1 · ${fix(S.lam, 2)}`, "F′(0) = 0", L('无不动点', 'no fixed point')][S.scene];
  function readouts(M) {
    const { ptr, dot, chan, dis, law } = M, I = instances(M), f = isFixed();
    const rows = [];
    if (S.scene === 0) {
      rows.push([L('查找 Lookup(x)', 'Lookup(x)'), `Lookup(${ptr.x}) = 0 · ${L(`${ptr.hops0} 跳 → ${ptr.hops1} 跳`, `${ptr.hops0} hops → ${ptr.hops1}`)}`]);
      rows.push([L('根自指 p ≡ *p', 'root self-reference p ≡ *p'), `Lookup(0) = 0 · walk(0, [0]⁶⁴) = 0`]);
      rows.push([L('链（压缩前）', 'chain (before compression)'), ptr.path.join(' → ')]);
      rows.push([L('幂等表 P² = P', 'idempotent table P² = P'), `max |P² − P| = ${ptr.idem} · ${ptr.compressed ? L('压缩后', 'compressed') : L('压缩前', 'before')}`]);
      rows.push([L('递归页表 walk(0, [9, j])', 'page walk walk(0, [9, j])'), `= p(9) = ${I.pageTable.data} · walk(0, [0, 9]) = 9`]);
      rows.push([f ? L('乘子', 'multiplier') : L('一步到位', 'one step'), f ? 'F ∘ F = F ⇒ λ = 0' : '|λ| = 0']);
    } else if (S.scene === 1) {
      rows.push([L('当前迭代 θₙ', 'current iterate θₙ'), `θ = ${fix(dot.theta, 4)} rad = ${fix(dot.theta / DEG, 2)}° · n = ${Math.floor(M.t + 1e-9)}`]);
      rows.push([L('I 投影 cos θ（青）', 'I-projection cos θ (cyan)'), fix(dot.cos, 4)]);
      rows.push([L('i 弧长 θ（品红）', 'i-arc θ (magenta)'), `${fix(dot.theta, 4)} · cos θ − θ = ${kit.sgn(dot.gap, 4)}`]);
      rows.push([f ? 'λ = F′(θ*)' : L('蛛网乘子 λ = −sin θ*', 'cobweb multiplier λ = −sin θ*'), `${fix(LAMBDA_COS, 4)} · |θₙ − θ*| = ${dot.err < 1e-4 ? sci(dot.err, 1) : fix(dot.err, 4)}`]);
      rows.push(['cos²θ + sin²θ', `${pct(dot.cos ** 2)} + ${pct(dot.sin ** 2)} = ${pct(dot.cos ** 2 + dot.sin ** 2, 0)}`]);
      rows.push([L('有理反级数 Σ cₙπⁿ', 'rational inverse series Σ cₙπⁿ'), `${SERIES.terms} ${L('项', 'terms')} = ${fix(SERIES.sum, 10)} · θ* = ${fix(THETA_STAR, 10)}`]);
    } else if (S.scene === 2) {
      rows.push([L('到 ρ* 的距离', 'distance to ρ*'), `${fix(chan.dist, 4)} = ${fix(S.lam, 2)}^${fix(chan.step, 1)} × ${fix(chan.dist0, 3)}`]);
      rows.push([L('本征态 UρU† = ρ', 'eigenstate UρU† = ρ'), `${L('残差', 'residual')} ${resid(I.stationary.stationaryResidual)} · U†U = I ${L('残差', 'residual')} ${resid(I.stationary.unitaryResidual)}`]);
      rows.push([L('横向相干 |ρ₀₁|', 'transverse coherence |ρ₀₁|'), fix(chan.coherence, 4)]);
      rows.push([L('相位纤维 e^(−iE₀t)', 'phase fibre e^(−iE₀t)'), `${fix((chan.phase / DEG) % 360, 1)}° · |λ| = 1`]);
      rows.push(['ℰ(ρ*) = ρ*', `${L('残差', 'residual')} ${resid(I.channel.fixedResidual)}`]);
      rows.push([L('捏合 𝒫 ∘ 𝒫 = 𝒫', 'pinching 𝒫 ∘ 𝒫 = 𝒫'), `${L('残差', 'residual')} ${resid(I.pinching.residual)} · |ρ₀₁| → 0`]);
    } else if (S.scene === 3) {
      rows.push([L('输出误差 ε_out（第 1 轮）', 'output error ε_out (round 1)'), `${dis.out < 1e-3 ? sci(dis.out, 2) : fix(dis.out, 5)} · 35ε³ = ${fix(dis.cubic, 5)}`]);
      rows.push([L('阈值 ε_th（青色盆地）', 'threshold ε_th (cyan basin)'), `${fix(EPS_TH, 4)} · ε = ${fix(S.eps, 4)} ${dis.basin ? L('在盆地内', 'in the basin') : L('在阈值以上', 'above threshold')}`]);
      rows.push([L('接受 / 丢弃', 'accepted / discarded'), `${pct(dis.ps)} / ${pct(1 - dis.ps)}`]);
      rows.push([L('压低倍数 ε/ε_out', 'suppression ε/ε_out'), Number.isFinite(dis.suppression) ? `${fix(dis.suppression, 2)}×` : '∞']);
      rows.push([L('斜率与立方律', 'slope and cubic law'), `dε_out/dε|₀ = 0 · ε_out/ε³ → ${fix(distillAt(1e-4).out / 1e-12, 2)}`]);
      rows.push([L('逐轮 ε₁ → ε₂ → ε₃', 'rounds ε₁ → ε₂ → ε₃'), dis.rounds.slice(1).map((e) => sci(e, 2)).join(' → ')]);
    } else {
      const capt = S.twist === 'id' && law.capturedRow >= 0;
      rows.push([`diagonal(${S.twist === 'not' ? '¬' : 'id'}, g)`, `${law.diag.join('')} ${capt ? `= g(${law.capturedRow}, ·)` : '∉ range g'}`]);
      rows.push([L('目录行 g(a, ·)', 'rows g(a, ·)'), GTAB.map((r) => r.join('')).join(' · ')]);
      rows.push([L('与各行的汉明距离', 'Hamming distance to each row'), law.hamming.join(' · ')]);
      rows.push([L('扭转的不动点', 'fixed points of the twist'), law.fixedPointFree ? L('¬b ≠ b：没有', '¬b ≠ b: none') : L('id(b) = b：0 与 1', 'id(b) = b: 0 and 1')]);
      rows.push([L('全部 2¹⁶ 张 4 × 4 表', 'all 2¹⁶ tables 4 × 4'), L(`¬ 逃出 ${I.diagonal.escapedNot} 张 · id 逃出 ${I.diagonal.escapedId} 张`, `¬ escapes ${I.diagonal.escapedNot} · id escapes ${I.diagonal.escapedId}`)]);
      rows.push([L('扫描到', 'scanned to'), `(${law.head}, ${law.head}) · ℓ → ℓ + 1`]);
    }
    const ids = ['roKey', 'ro1', 'ro2', 'ro3', 'ro4', 'ro5'];
    rows.forEach(([dt, dd], k) => { $(`${ids[k]}L`).innerHTML = dt; $(ids[k]).innerHTML = dd; });
  }
  const RO_NOTES = [
    ['压缩前查 9 要走 4 跳；对每个槽查一次之后，每个指针都直接指根，表 P 满足 P² = P：再查一遍什么也不变。', 'Before compression a lookup of 9 takes 4 hops; after every slot has been looked up once, every pointer points straight at the root and the table P has P² = P: another pass changes nothing.'],
    ['乘子 λ = −sin θ* 为负：迭代每一步跳到 θ* 的另一边，距离按 0.6736 缩小。', 'The multiplier λ = −sin θ* is negative: each iteration jumps to the other side of θ* and the distance shrinks by 0.6736.'],
    ['本征态的密度矩阵不变，只有全局相位转圈；信道把距离按 |λ|ⁿ 缩短，捏合一步删掉全部相干。', 'The density matrix of the eigenstate does not change, only its global phase turns; the channel shortens the distance as |λ|ⁿ, and pinching deletes all coherence in one step.'],
    ['15 个门中奇数重的可接受错误才会骗过检验：最少 3 个，35 种，所以领头项是 35ε³。', 'Only accepted error patterns of odd weight fool the checks: at least 3 errors, in 35 ways, so the leading term is 35ε³.'],
    ['¬ 没有不动点，所以对角线在第 a 位与第 a 行必不相同；换成 id，对角线可以恰好是某一行。', '¬ has no fixed point, so the diagonal differs from row a in place a; with id the diagonal can be one of the rows.']
  ];
  const CTL_NOTES = [
    ['拖琥珀环换查找起点 x；时间轴 0–4 沿链走，4–5 压缩，5–6 一跳到根。', 'Drag the amber ring to change the start slot x; on the rail 0–4 walks the chain, 4–5 compresses, 5–6 is one hop to the root.'],
    ['拖圆上的琥珀珠选起点角 θ₀，时间轴是迭代次数 n；拖空白处转视角。', 'Drag the amber bead on the circle to pick the start angle θ₀; the rail is the iteration count n. Drag empty space to orbit.'],
    ['拖球面上的琥珀环换起始纯态；|λ| = 1 只转不缩，|λ| = 0 一步到 ρ*。', 'Drag the amber ring on the sphere to change the starting pure state; |λ| = 1 turns without shrinking, |λ| = 0 reaches ρ* in one step.'],
    ['沿底部标尺拖琥珀环改输入噪声 ε；时间轴是蒸馏轮数。', 'Drag the amber ring along the ruler to change the input noise ε; the rail counts distillation rounds.'],
    ['换扭转 f 看对角线逃出或被收住；拖琥珀环把读头放到 (a, a)。', 'Switch the twist f to see the diagonal escape or be caught; drag the amber ring to put the head on (a, a).']
  ];
  const FORMULA = ['find(find(x)) = find(x) · P² = P', 'θₙ₊₁ = cos θₙ · θ* = cos θ*', 'ℰ(ρ) = |λ| UρU† + (1 − |λ|) ρ*', 'ε<sub>out</sub> = (1 + 15x⁸ − 15x⁷ − x¹⁵)/(2(1 + 15x⁸)), x = 1 − 2ε', 'diagonal(f, g)(a) = f(g(a, a))'];
  function drawText(M) {
    readouts(M);
    $('roNote').innerHTML = L(...RO_NOTES[S.scene]);
    $('ctlNote').innerHTML = L(...CTL_NOTES[S.scene]);
    $('ctlScene').textContent = CODES[S.scene];
    $('scenePill').innerHTML = `${CODES[S.scene]} <strong>${L(['查表', '余弦', '本征态', '蒸馏', '对角线'][S.scene], ['Lookup', 'Cosine', 'Eigenstate', 'Distil', 'Diagonal'][S.scene])}</strong>`;
    $('lambdaPill').innerHTML = `${isFixed() ? 'x* = F(x*)' : L('乘子', 'multiplier')} <strong>${LAMBDA_TXT()}</strong>`;
    $('hint').innerHTML = L('拖琥珀手柄 · 拖空白处转视角 · 空格播放 · L 换读法', 'drag the amber handle · drag empty space to orbit · Space plays · L switches the lens');
    $('formula').innerHTML = FORMULA[S.scene];
    document.querySelectorAll('#ctlPanel .field[data-scene]').forEach((el) => { el.hidden = Number(el.dataset.scene) !== S.scene; });
  }

  /* ---------- strip plot: physical reading (what changes on the rail) or fixed-point reading (F against y = x) ---------- */
  const PLOT_TITLES = [
    [['每个槽查一次要走几跳：压缩前与压缩后', 'Hops per lookup, before and after compression'], ['F = 指针表：只有 0 落在 y = x 上', 'F = the pointer table: only 0 sits on y = x']],
    [['θₙ 交替逼近 θ*', 'θₙ approaches θ* from alternate sides'], ['y = cos θ 与 y = θ 的蛛网', 'The cobweb of y = cos θ against y = θ']],
    [['相干按 |λ|ⁿ 衰减，相位模长保持 1', 'Coherence decays as |λ|ⁿ, the phase keeps modulus 1'], ['距离映射 d ↦ |λ| d 与 d ↦ d', 'The distance maps d ↦ |λ| d and d ↦ d']],
    [['逐轮误差：立方收缩', 'Error per round: cubic shrinking'], ['ε ↦ ε_out(ε) 与 y = ε：三个不动点', 'ε ↦ ε_out(ε) against y = ε: three fixed points']],
    [['对角线到每一行的汉明距离', 'Hamming distance from the diagonal to each row'], ['F = ¬ 与 F = id 在 {0, 1} 上', 'F = ¬ and F = id on {0, 1}']]
  ];
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const f = isFixed() ? 1 : 0, pad = [44, 12, 10, 22];
    $('plotTitle').textContent = L(...PLOT_TITLES[S.scene][f]);
    let meta = '';
    const { ptr, dot, chan, dis, law } = M;
    if (S.scene === 0 && !f) {
      const g = kit.plot(cv, { x: [-0.6, 11.6], y: [0, 4.9], pad });
      g.axes({ xTicks: Array.from({ length: 12 }, (_, k) => k), yTicks: [0, 1, 2, 3, 4] });
      for (let k = 0; k < NSLOT; k++) {
        const h0 = hopsOf(PARENT0, k), h1 = hopsOf(PARENT1, k);
        if (h0) g.rect(k - 0.36, 0, k - 0.02, h0, P.magenta, { alpha: 0.5, stroke: P.magenta, width: 1 });
        if (h1 && ptr.compressed) g.rect(k + 0.02, 0, k + 0.36, h1, P.cyan, { alpha: 0.55, stroke: P.cyan, width: 1 });
        if (k === ptr.x) g.rect(k - 0.44, 0, k + 0.44, Math.max(h0, 0.2) + 0.25, P.amber, { fill: false, stroke: P.amber, width: 1.6 });
      }
      g.text(11.5, 4.5, L('品红：压缩前 · 青：压缩后', 'magenta: before · cyan: after'), P.ink, { align: 'right', size: 10 });
      meta = `Lookup(${ptr.x}): ${ptr.hops0} → ${ptr.hops1} · max ${Math.max(...PARENT0.map((_, k) => hopsOf(PARENT0, k)))} → 1`;
    } else if (S.scene === 0) {
      const g = kit.plot(cv, { x: [-0.6, 11.6], y: [-0.6, 11.6], pad });
      g.axes({ xTicks: [0, 3, 6, 9], yTicks: [0, 3, 6, 9], xLabel: 'x' });
      g.line([[-0.5, -0.5], [11.5, 11.5]], P.dim, { width: 1.2, dash: [5, 4] });
      for (let k = 0; k < NSLOT; k++) {
        if (!ptr.compressed) g.dot(k, PARENT0[k], P.magenta, 3.4);
        g.dot(k, PARENT1[k], P.cyan, ptr.compressed ? 3.6 : 2.4, { alpha: ptr.compressed ? 1 : 0.6 });
      }
      g.dot(0, 0, P.cyan, 6, { ring: true, width: 1.8 });
      g.dot(ptr.x, ptr.table[ptr.x], P.amber, 6, { ring: true, width: 1.6 });
      g.text(11.4, 10.4, 'y = x', P.dim, { align: 'right', size: 10 });
      meta = `x* = F(x*) = 0 · F ∘ F ${ptr.idem === 0 ? '=' : '≠'} F`;
    } else if (S.scene === 1 && !f) {
      const n = MAXT[1], g = kit.plot(cv, { x: [0, n], y: [0, 1.15], pad });
      g.axes({ xTicks: [0, 5, 10, 15, 20, 25, 30], yTicks: [0, 0.5, 1], xLabel: 'n' });
      g.hline(THETA_STAR, P.cyan, { width: 1.4, dash: [5, 4] });
      g.line(dot.it.map((v, k) => [k, v]), P.violet, { width: 1.8 });
      dot.it.forEach((v, k) => g.dot(k, v, P.violet, 2.4));
      const nn = Math.min(n, Math.floor(M.t + 1e-9));
      g.dot(nn, dot.it[nn], P.amber, 4.4);
      g.text(n - 0.4, THETA_STAR + 0.12, `θ* = ${fix(THETA_STAR, 4)}`, P.cyan, { align: 'right', size: 10.5 });
      meta = `θ₀ = ${fix(S.theta0, 2)} · θ<sub>${nn}</sub> = ${fix(dot.it[nn], 6)} · λ = ${fix(LAMBDA_COS, 4)}`;
    } else if (S.scene === 1) {
      const g = kit.plot(cv, { x: [0, PI / 2], y: [0, 1.1], pad });
      g.axes({ xTicks: [0, 0.5, 1, 1.5], yTicks: [0, 0.5, 1], xLabel: 'θ' });
      g.line([[0, 0], [1.1, 1.1]], P.dim, { width: 1.2, dash: [5, 4] });
      g.line(Array.from({ length: 81 }, (_, i) => { const x = (PI / 2) * i / 80; return [x, Math.cos(x)]; }), P.sigma, { width: 2 });
      g.line(dot.cw.pts, P.violet, { width: 1.8 });
      g.dot(THETA_STAR, THETA_STAR, P.violet, 4.4);
      g.dot(dot.cw.tip[0], dot.cw.tip[1], P.amber, 4);
      g.text(1.5, 0.18, 'y = cos θ', P.sigma, { align: 'right', size: 10.5 });
      g.text(1.06, 0.98, 'y = θ', P.dim, { align: 'right', size: 10.5 });
      meta = `F(θ) = cos θ · F′(θ*) = ${fix(LAMBDA_COS, 4)} · ${L('级数', 'series')} Σ cₙπⁿ = ${fix(SERIES.sum, 8)}`;
    } else if (S.scene === 2 && !f) {
      const n = MAXT[2], g = kit.plot(cv, { x: [0, n], y: [0, 1.12], pad });
      g.axes({ xTicks: [0, 2, 4, 6, 8, 10, 12], yTicks: [0, 0.5, 1], xLabel: 'n' });
      g.hline(1, P.violet, { width: 2 });
      g.line(Array.from({ length: 121 }, (_, i) => { const s = n * i / 120; return [s, Math.pow(S.lam, s)]; }), P.magenta, { width: 2.2 });
      g.dot(chan.step, Math.pow(S.lam, chan.step), P.amber, 4.2);
      g.text(n - 0.2, 1.05, L('|e^(−iE₀t)| = 1（紫）', '|e^(−iE₀t)| = 1 (violet)'), P.violet, { align: 'right', size: 10 });
      g.text(0.5, 0.18, L(`|ρ₀₁|/|ρ₀₁(0)| = ${fix(S.lam, 2)}ⁿ`, `|ρ₀₁|/|ρ₀₁(0)| = ${fix(S.lam, 2)}ⁿ`), P.magenta, { align: 'left', size: 10 });
      meta = `n = ${fix(chan.step, 1)} · |ρ₀₁| = ${fix(chan.coherence, 4)} · ${L('距离', 'distance')} ${fix(chan.dist, 4)}`;
    } else if (S.scene === 2) {
      const d0 = Math.max(chan.dist0, 0.05), g = kit.plot(cv, { x: [0, d0 * 1.05], y: [0, d0 * 1.05], pad });
      g.axes({ xTicks: [0, 0.5, 1, 1.5].filter((v) => v <= d0 * 1.05), yTicks: [0, 0.5, 1, 1.5].filter((v) => v <= d0 * 1.05), xLabel: 'd' });
      g.line([[0, 0], [d0, d0]], P.violet, { width: 2 });
      g.line([[0, 0], [d0, S.lam * d0]], P.magenta, { width: 2 });
      const cwp = [[d0, 0]]; let d = d0;
      for (let k = 0; k < 12; k++) { cwp.push([d, S.lam * d]); cwp.push([S.lam * d, S.lam * d]); d *= S.lam; }
      g.line(cwp, P.magenta, { width: 1.2, alpha: 0.7 });
      g.dot(0, 0, P.cyan, 5);
      g.dot(chan.dist, chan.dist, P.amber, 4);
      g.text(d0 * 0.98, d0 * 0.92, L('U：d ↦ d（紫）', 'U: d ↦ d (violet)'), P.violet, { align: 'right', size: 10 });
      g.text(d0 * 0.98, S.lam * d0 * 0.7, `ℰ: d ↦ ${fix(S.lam, 2)} d`, P.magenta, { align: 'right', size: 10 });
      meta = `ρ* = ℰ(ρ*) · λ = ${fix(S.lam, 2)} · ${L('相位', 'phase')} |λ| = 1`;
    } else if (S.scene === 3 && !f) {
      const g = kit.plot(cv, { x: [-0.2, 3.2], y: [1e-16, 1], pad, logY: true });
      g.axes({ xTicks: [[0, 'ε₀'], [1, 'ε₁'], [2, 'ε₂'], [3, 'ε₃']], yTicks: [[1, '1'], [1e-4, '10⁻⁴'], [1e-8, '10⁻⁸'], [1e-12, '10⁻¹²'], [1e-16, '10⁻¹⁶']] });
      const rs = dis.rounds.map((e, k) => [k, Math.max(e, 1e-16)]);
      g.line(rs, dis.basin ? P.cyan : P.magenta, { width: 2.2 });
      rs.forEach(([k, e]) => g.dot(k, e, dis.basin ? P.cyan : P.magenta, 3.4));
      g.dot(dis.round, Math.max(dis.rounds[dis.round], 1e-16), P.amber, 5, { ring: true, width: 1.6 });
      g.line([0, 1, 2, 3].map((k) => [k, Math.max(1e-16, EPS_TH)]), P.ink, { width: 1, dash: [4, 4] });
      g.text(3.1, EPS_TH * 2.2, `ε_{th} = ${fix(EPS_TH, 4)}`, P.ink, { align: 'right', size: 10 });
      meta = dis.rounds.map((e) => (e < 1e-3 ? sci(e, 2) : fix(e, 4))).join(' → ');
    } else if (S.scene === 3) {
      const g = kit.plot(cv, { x: [0, 0.5], y: [0, 0.5], pad });
      g.axes({ xTicks: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yTicks: [0, 0.25, 0.5], xLabel: 'ε' });
      g.line([[0, 0], [0.5, 0.5]], P.dim, { width: 1.2, dash: [5, 4] });
      const pts = Array.from({ length: 201 }, (_, i) => { const e = 0.5 * i / 200; return [e, distillAt(e).out]; });
      g.line(pts.filter(([e]) => e <= EPS_TH), P.cyan, { width: 2.2 });
      g.line(pts.filter(([e]) => e >= EPS_TH), P.magenta, { width: 2.2 });
      g.line(Array.from({ length: 41 }, (_, i) => { const e = 0.16 * i / 40; return [e, 35 * e ** 3]; }), P.ink, { width: 1, dash: [3, 3] });
      const cwp = [[S.eps, 0]]; let e = S.eps;
      for (let k = 0; k < 6; k++) { const o = distillAt(e).out; cwp.push([e, o]); cwp.push([o, o]); e = o; }
      g.line(cwp, P.amber, { width: 1.2, alpha: 0.8 });
      g.dot(0, 0, P.cyan, 4.4); g.dot(EPS_TH, EPS_TH, P.ink, 4.4); g.dot(0.5, 0.5, P.magenta, 4.4);
      g.dot(S.eps, dis.out, P.amber, 4);
      g.text(0.49, 0.42, 'y = ε', P.dim, { align: 'right', size: 10 });
      g.text(0.17, 0.2, '35ε³', P.ink, { align: 'left', size: 10 });
      meta = `F(0) = 0 · F(${fix(EPS_TH, 4)}) = ${fix(EPS_TH, 4)} · F(0.5) = 0.5`;
    } else if (S.scene === 4 && !f) {
      const g = kit.plot(cv, { x: [-0.6, 3.6], y: [0, 4.4], pad });
      g.axes({ xTicks: [[0, 'g(0, ·)'], [1, 'g(1, ·)'], [2, 'g(2, ·)'], [3, 'g(3, ·)']], yTicks: [0, 1, 2, 3, 4] });
      law.hamming.forEach((h, a) => {
        g.rect(a - 0.32, 0, a + 0.32, Math.max(h, 0.04), h ? P.magenta : P.cyan, { alpha: 0.5, stroke: h ? P.magenta : P.cyan, width: 1.2 });
        g.text(a, h + 0.35, String(h), h ? P.magenta : P.cyan, { align: 'center', size: 10.5 });
      });
      g.hline(1, P.ink, { width: 1, dash: [4, 4] });
      if (law.head <= 3) g.rect(law.head - 0.42, 0, law.head + 0.42, Math.max(law.hamming[law.head], 0.04) + 0.6, P.amber, { fill: false, stroke: P.amber, width: 1.6 });
      meta = `diagonal(${S.twist === 'not' ? '¬' : 'id'}, g) = ${law.diag.join('')} · min ${Math.min(...law.hamming)}`;
    } else {
      const g = kit.plot(cv, { x: [-0.5, 1.5], y: [-0.5, 1.5], pad });
      g.axes({ xTicks: [0, 1], yTicks: [0, 1], xLabel: 'b' });
      g.line([[-0.4, -0.4], [1.4, 1.4]], P.dim, { width: 1.2, dash: [5, 4] });
      const tw = TWIST[S.twist];
      [0, 1].forEach((b) => g.dot(b, tw(b), tw(b) === b ? P.cyan : P.magenta, 6));
      g.text(1.4, 1.22, 'y = b', P.dim, { align: 'right', size: 10 });
      g.text(-0.4, 1.3, S.twist === 'not' ? L('¬：两个点都不在 y = b 上', '¬: neither point is on y = b') : L('id：两个点都在 y = b 上', 'id: both points are on y = b'), S.twist === 'not' ? P.magenta : P.cyan, { align: 'left', size: 10 });
      meta = S.twist === 'not' ? L('¬ 没有不动点 ⇒ 逃逸', '¬ has no fixed point ⇒ escape') : L('id 有不动点 ⇒ 可被收住', 'id has fixed points ⇒ can be caught');
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: one quantity per scene (hops, iterations, steps, rounds, diagonal) ---------- */
  const RAIL_UNIT = [['步', 'step'], ['n', 'n'], ['n', 'n'], ['轮', 'round'], ['a', 'a']];
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: MAXT[1], t: MAXT[1], rate: RATE[1], step: 1,
    format: (t, max) => `${L(...RAIL_UNIT[S.scene])} ${fix(t, 1)} <small>/ ${max}</small>`,
    onChange: (t) => { S.t = t; paint(); }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  const cancelTransition = () => { if (transition) transition.cancel(); transition = null; };
  function leave() { cancelTransition(); cards.mark(null); clock.pause(); }
  function setScene(k) {
    S.scene = k; FIT = null;
    clock.rate = RATE[k];
    clock.setMax(MAXT[k], true);
  }
  const fSlot = kit.field($('slotIn'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); S.slot = clamp(Math.round(v), 0, NSLOT - 1); paint(); } });
  const fTheta = kit.field($('theta0In'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.theta0 = clamp(v, 0, 1.5); paint(); } });
  const fLam = kit.field($('lambdaIn'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.lam = clamp(v, 0, 1); paint(); } });
  const fEps = kit.field($('epsIn'), { fmt: (v) => fix(v, 4), onInput: (v) => { leave(); S.eps = clamp(v, 0, 0.5); paint(); } });
  const twistChips = kit.chips($('twistChips'), 'twist', (v) => { leave(); S.twist = v === 'id' ? 'id' : 'not'; paint(); });
  const lensChips = kit.chips($('lensToggle'), 'lens', (v) => { S.lens = v === 'fixed' ? 'fixed' : 'phys'; paint(); });
  kit.keys({ l: () => { lensChips.set(S.lens === 'fixed' ? 'phys' : 'fixed'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'pointer-path-compression': { scene: 0, slot: 9, play: true, still: 'end' },
    'dottie-real-imag-spiral': { scene: 1, theta0: 0.1, play: true, still: 'end' },
    'eigenstate-channel-anchor': { scene: 2, lam: 0.65, r0: R0_DEFAULT, play: true, still: 'end' },
    'fifteen-to-one-gate-distill': { scene: 3, eps: 0.05, play: false, still: 1 },
    'lawvere-diagonal-escape': { scene: 4, twist: 'not', play: true, still: 'end' }
  };
  const NOTES = {
    'pointer-path-compression': ['12 个指针槽排在紫色表盘上：琥珀读头从 x = 9 沿品红链 9 → 6 → 3 → 1 → 0 走 4 跳，槽 0 的青色自环就是 Lookup(0) = 0、p ≡ *p。路径压缩之后每条指针都成了直连根的青色箭头，再查只要 1 跳，表盘 P² = P，乘子 |λ| = 0。', 'Twelve pointer slots stand on the violet table: the amber read head walks from x = 9 along the magenta chain 9 → 6 → 3 → 1 → 0 in 4 hops, and the cyan self-loop at slot 0 is Lookup(0) = 0, p ≡ *p. After path compression every pointer is a cyan direct link to the root, a lookup takes 1 hop, the table has P² = P, and the multiplier is |λ| = 0.'],
    'dottie-real-imag-spiral': ['单位圆躺在水平盲平面 i 上，竖直实平面 I 立在实轴上。青色影子 cos θ* 与品红弧长 θ*（旁边拉直成尺）一样长：0.7391 rad = 42.35°。紫色蛛网从 θ₀ = 0.10 出发，乘子 λ = −sin θ* = −0.6736，每步换边收缩；cos²θ* = 54.62%，sin²θ* = 45.38%。', 'The unit circle lies in the horizontal blind plane i, and the vertical real plane I stands on the real axis. The cyan shadow cos θ* and the magenta arc θ* (straightened into a ruler beside it) have the same length: 0.7391 rad = 42.35°. The violet cobweb starts at θ₀ = 0.10 with multiplier λ = −sin θ* = −0.6736, changing side and shrinking at every step; cos²θ* = 54.62%, sin²θ* = 45.38%.'],
    'eigenstate-channel-anchor': ['布洛赫球里青色箭头 |0⟩ 是能量本征态：e<sup>−iE₀t</sup>|0⟩ 只让紫色相位纤维上的珠子转圈，|λ| = 1，ρ 不变。品红轨迹是信道 ℰ(ρ) = 0.65 UρU† + 0.35 ρ*：横向相干按 0.65ⁿ 衰减，螺旋落进青色的 ρ* = ℰ(ρ*)，琥珀珠是当前态。', 'In the Bloch ball the cyan arrow |0⟩ is an energy eigenstate: e<sup>−iE₀t</sup>|0⟩ only turns the bead on the violet phase fibre, |λ| = 1, and ρ does not change. The magenta paths follow the channel ℰ(ρ) = 0.65 UρU† + 0.35 ρ*: the transverse coherence decays as 0.65ⁿ and spirals into the cyan ρ* = ℰ(ρ*); the amber bead is the current state.'],
    'fifteen-to-one-gate-distill': ['四面体上的 15 个噪声 T 门（ε = 0.0500）过 4 个 8 比特的紫色检验胞：校验子为 0 的青色分支接受（46.61%），输出一个 ε<sub>out</sub> = 0.00514 的 T 门（领头项 35ε³ = 0.00438），压低 9.73 倍；15 条品红分支丢弃。底部标尺：ε<sub>th</sub> = 0.1415 以下是青色盆地，以上是品红区。', 'Fifteen noisy T gates on the tetrahedron (ε = 0.0500) pass four violet check cells of 8 qubits: the cyan branch of zero syndrome is accepted (46.61%) and outputs one T gate with ε<sub>out</sub> = 0.00514 (leading term 35ε³ = 0.00438), a suppression by 9.73; the 15 magenta branches are discarded. On the ruler below, ε<sub>th</sub> = 0.1415 separates the cyan basin from the magenta region.'],
    'lawvere-diagonal-escape': ['4 × 4 表的每一行是青色目录 g(a, ·)。琥珀读头沿对角线 (a, a) 走，紫色扭转（两次 90°，î² = −1）把 g(a, a) 翻转后升到 ℓ + 1：品红行 diagonal(¬, g) = 0011 在 (a, a) 处与每一行都不同，所以不在目录里。', 'Each row of the 4 × 4 table is a cyan entry g(a, ·). The amber head walks the diagonal (a, a), and the violet twist (two quarter-turns, î² = −1) negates g(a, a) and lifts it to ℓ + 1: the magenta row diagonal(¬, g) = 0011 differs from every row at (a, a), so it is not in the listing.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'pointer-path-compression': ['琥珀读头沿品红链 9 → 6 → 3 → 1 → 0 走 4 跳；压缩后每条指针都是青色直连，再查只要 1 跳，紫色表盘 P² = P。', 'The amber head walks the magenta chain 9 → 6 → 3 → 1 → 0 in 4 hops; after compression every pointer is a cyan direct link, one hop suffices, and the violet table has P² = P.'],
    'dottie-real-imag-spiral': ['青色影子 cos θ* 与品红弧长 θ* 一样长，都是 0.7391；紫色蛛网从 θ₀ = 0.10 换边收缩，乘子 −0.6736。', 'The cyan shadow cos θ* and the magenta arc θ* have the same length, 0.7391; the violet cobweb from θ₀ = 0.10 changes side and shrinks by −0.6736.'],
    'eigenstate-channel-anchor': ['青色本征态箭头不动，只有紫色相位纤维上的珠子转圈；品红轨迹按 0.65 每步螺旋落进青色的 ρ*。', 'The cyan eigenstate arrow stays put while the bead on the violet phase fibre turns; the magenta paths spiral into the cyan ρ* by 0.65 per step.'],
    'fifteen-to-one-gate-distill': ['15 个噪声 T 门（ε = 0.0500）过 4 个紫色检验胞：青色分支接受，输出误差 0.00514（35ε³ = 0.00438），15 条品红分支丢弃。', 'Fifteen noisy T gates (ε = 0.0500) pass four violet check cells: the cyan branch is accepted with output error 0.00514 (35ε³ = 0.00438), the 15 magenta branches are discarded.'],
    'lawvere-diagonal-escape': ['琥珀读头沿对角线翻转 g(a, a)，紫色扭转把它升到 ℓ + 1：品红行 0011 在 (a, a) 处与每一行青色目录都不同。', 'The amber head negates g(a, a) along the diagonal and the violet twist lifts it to ℓ + 1: the magenta row 0011 differs from every cyan row at (a, a).']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); cancelTransition();
    setScene(p.scene);
    sc.view(VIEW[p.scene], booting || TRV.still ? 0 : 650);
    if (p.slot != null) { S.slot = p.slot; fSlot.set(p.slot); }
    if (p.twist) { S.twist = p.twist; twistChips.set(p.twist, true); }
    if (p.r0) S.r0 = p.r0.slice();
    const from = { theta0: S.theta0, lam: S.lam, eps: S.eps }, to = { theta0: p.theta0 != null ? p.theta0 : S.theta0, lam: p.lam != null ? p.lam : S.lam, eps: p.eps != null ? p.eps : S.eps };
    const step = (e) => { S.theta0 = from.theta0 + (to.theta0 - from.theta0) * e; S.lam = from.lam + (to.lam - from.lam) * e; S.eps = from.eps + (to.eps - from.eps) * e; fTheta.set(S.theta0); fLam.set(S.lam); fEps.set(S.eps); paint(); };
    if (booting || TRV.still) step(1);
    else {
      // the token exists before kit.tween runs: under reduced motion the tween finishes inside the call
      const token = { run: null, cancel() { if (token.run) token.run.cancel(); } };
      transition = token;
      token.run = kit.tween(450, step, () => { if (transition === token) transition = null; });
    }
    const still = p.still === 'end' ? MAXT[p.scene] : p.still;
    if (TRV.still || (booting && !TRV.embed) || !p.play) clock.set(still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄、换读法透镜、拉参数。随时可以再选一张卡。', 'Free play: drag the amber handle, switch the lens, pull the parameters. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.SELFREF_PENTAD_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M);
      return JSON.parse(JSON.stringify({
        preset: cards.current, scene: S.scene, sceneCode: CODES[S.scene], lens: S.lens, t: clock.t, max: clock.max, playing: clock.playing,
        params: { slot: S.slot, theta0: S.theta0, lambda: S.lam, r0: S.r0, eps: S.eps, twist: S.twist },
        pointer: { parentBefore: PARENT0, parentAfter: PARENT1, table: M.ptr.table, start: M.ptr.x, path: M.ptr.path, hopsBefore: M.ptr.hops0, hopsAfter: M.ptr.hops1, compressed: M.ptr.compressed, idempotentResidual: M.ptr.idem, rootSelf: PARENT0[0] === 0 },
        dottie: { theta0: S.theta0, iterates: M.dot.it, theta: M.dot.theta, cos: M.dot.cos, sin: M.dot.sin, gap: M.dot.gap, error: M.dot.err, thetaStar: THETA_STAR, thetaStarDeg: THETA_STAR / DEG, lambda: LAMBDA_COS, cos2Star: Math.cos(THETA_STAR) ** 2, sin2Star: Math.sin(THETA_STAR) ** 2, seriesTerms: SERIES.terms, seriesSum: SERIES.sum, seriesPartial: SERIES.partial, seriesCoef: SERIES.coef.slice(0, 12), cobwebTip: M.dot.cw.tip },
        channel: { lambda: S.lam, omega: OMEGA, energies: [E0, E1], zStar: ZSTAR, r0: S.r0, r: M.chan.r, step: M.chan.step, distance: M.chan.dist, distance0: M.chan.dist0, coherence: M.chan.coherence, phase: M.chan.phase },
        distill: { eps: S.eps, epsOut: M.dis.out, epsOutClosed: M.dis.closed, acceptance: M.dis.ps, cubic: M.dis.cubic, suppression: Number.isFinite(M.dis.suppression) ? M.dis.suppression : null, threshold: EPS_TH, basin: M.dis.basin, rounds: M.dis.rounds, round: M.dis.round, progress: M.dis.progress, acceptedWeights: ACCEPTED, checks: CHECKS, cubicLimit: distillAt(1e-4).out / 1e-12 },
        lawvere: { table: GTAB, twist: S.twist, diag: M.law.diag, escaped: M.law.escaped, capturedRow: M.law.capturedRow, differAtDiag: M.law.differAtDiag, hamming: M.law.hamming, fixedPointFree: M.law.fixedPointFree, head: M.law.head, lifted: M.law.lifted },
        leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED.map((b) => ({ key: b.key, x: b.x, y: b.y, w: b.w, h: b.h })), stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(clamp(Math.round(o.scene), 0, 4));
      if (o.slot != null) { S.slot = clamp(Math.round(o.slot), 0, NSLOT - 1); fSlot.set(S.slot); }
      if (o.theta0 != null) { S.theta0 = clamp(o.theta0, 0, 1.5); fTheta.set(S.theta0); }
      if (o.lambda != null) { S.lam = clamp(o.lambda, 0, 1); fLam.set(S.lam); }
      if (o.r0) S.r0 = v3.unit(o.r0);
      if (o.eps != null) { S.eps = clamp(o.eps, 0, 0.5); fEps.set(S.eps); }
      if (o.twist) { S.twist = o.twist === 'id' ? 'id' : 'not'; twistChips.set(S.twist, true); }
      if (o.t != null) clock.set(o.t);
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for a value (slot, theta0, r0, eps or head). */
    target(v) {
      const b = stageEl.getBoundingClientRect(), o = [b.left + stageEl.clientLeft, b.top + stageEl.clientTop];
      let w;
      if (v.slot != null) w = v3.add(slotTop(v.slot), [0, 0, 0.02]);
      else if (v.theta0 != null) w = onCircle(v.theta0, 0.03);
      else if (v.r0) w = v3.unit(v.r0);
      else if (v.eps != null) w = rulerPt(v.eps, 0.016);
      else w = [colX(v.head), rowY(v.head), cellH(GTAB[v.head][v.head]) + 0.03];
      const q = sc.p(w);
      return { x: o[0] + q[0], y: o[1] + q[1] };
    }
  });
  window.TRV_THUMB = () => { cards.pick('dottie-real-imag-spiral'); clock.pause(); clock.set(MAXT[1]); sc.view(VIEW[1], 0); paint.now(); };
  cards.pick(cards.initial('dottie-real-imag-spiral'));
  booting = false;
  paint();
})();
