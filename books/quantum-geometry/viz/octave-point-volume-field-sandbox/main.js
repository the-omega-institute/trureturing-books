/* OCTAVE//FIELD：点体八度螺旋、(ℤ/9ℤ)³ 格点格林场、缀饰核心与 ℤ/12ℤ 泊松对偶。 */
(() => {
  'use strict';
  const { kit } = TRV, { v3, clamp, fix } = kit, $ = (id) => document.getElementById(id), L = TRV.L;
  const PI = Math.PI, TAU = 2 * PI, PHI = (1 + Math.sqrt(5)) / 2;

  /* ---------- the lattice (ℤ/9ℤ)³: exact Green function by a three-dimensional DFT ---------- */
  const N = 9, M = N * N * N, MID = 4, H = 0.17, IR2 = 1 / 81, RING = 12, A_FLOOR = 0.5, A_MAX = 2.5, ISO_Q = 0.12;
  const C9 = [], S9 = [];
  for (let j = 0; j < N; j++) { C9.push(Math.cos(TAU * j / N)); S9.push(Math.sin(TAU * j / N)); }
  const lam1 = (k) => 2 - 2 * C9[k];
  const idx = (i, j, k) => (i * N + j) * N + k;
  const wrap = (i) => ((i % N) + N) % N;
  const m2eff = (m) => m * m + IR2;
  const LAMBDA = new Float64Array(M);
  for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) for (let c = 0; c < N; c++) LAMBDA[idx(a, b, c)] = lam1(a) + lam1(b) + lam1(c);
  const dressA = (p) => Math.max(A_FLOOR, A_MAX * (1 - p));
  const unfloored = (p) => A_MAX * (1 - p);

  /** G(x, x₀) = (1/M) Σₖ e^{−a²λ/2} e^{ik·(x−x₀)} / (λ(k) + m²): three one-dimensional inverse DFTs, one axis at a time,
      each carrying the phase of the source x₀ (no translation shortcut), so that the reciprocity check is a real one. */
  function solve(x0, m2, a) {
    let re = new Float64Array(M), im = new Float64Array(M);
    for (let q = 0; q < M; q++) re[q] = Math.exp(-a * a * LAMBDA[q] / 2) / (LAMBDA[q] + m2);
    const strides = [N * N, N, 1];
    for (let axis = 2; axis >= 0; axis--) {
      const st = strides[axis], src = x0[axis], nr = new Float64Array(M), ni = new Float64Array(M);
      for (let p = 0; p < M; p++) {
        const x = Math.floor(p / st) % N, base = p - x * st;
        let sr = 0, si = 0;
        for (let k = 0; k < N; k++) {
          const q = base + k * st, ph = wrap(k * (x - src)), c = C9[ph], s = S9[ph];
          sr += re[q] * c - im[q] * s; si += re[q] * s + im[q] * c;
        }
        nr[p] = sr; ni[p] = si;
      }
      re = nr; im = ni;
    }
    let maxIm = 0;
    for (let p = 0; p < M; p++) { re[p] /= M; im[p] /= M; maxIm = Math.max(maxIm, Math.abs(im[p])); }
    return { G: re, maxIm };
  }
  /** max over the 729 sites of |(−Δ + m²)G − δ_{x₀}| (the seven-point lattice Laplacian, periodic). */
  function residual(G, x0, m2) {
    let worst = 0;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      let r = (6 + m2) * G[idx(i, j, k)] - G[idx(wrap(i + 1), j, k)] - G[idx(wrap(i - 1), j, k)]
        - G[idx(i, wrap(j + 1), k)] - G[idx(i, wrap(j - 1), k)] - G[idx(i, j, wrap(k + 1))] - G[idx(i, j, wrap(k - 1))];
      if (i === x0[0] && j === x0[1] && k === x0[2]) r -= 1;
      worst = Math.max(worst, Math.abs(r));
    }
    return worst;
  }
  const cache = new Map();
  function field(x0, m, a) {
    const m2 = m2eff(m), key = `${x0.join(',')}|${m2}|${a}`;
    let f = cache.get(key);
    if (f) { cache.delete(key); cache.set(key, f); return f; }
    const { G, maxIm } = solve(x0, m2, a);
    let lo = Infinity;
    for (let p = 0; p < M; p++) lo = Math.min(lo, G[p]);
    f = { key, x0: x0.slice(), m2, a, G, maxIm, core: G[idx(...x0)], min: lo, res: a === 0 ? residual(G, x0, m2) : null, shells: new Map() };
    cache.set(key, f);
    if (cache.size > 36) cache.delete(cache.keys().next().value);
    return f;
  }
  /** E(a) = ½ (ρₐ, G ρₐ) = (1/2M) Σₖ e^{−a²λ(k)} / (λ(k) + m²). */
  function selfEnergy(m, a) {
    const m2 = m2eff(m); let s = 0;
    for (let q = 0; q < M; q++) s += Math.exp(-a * a * LAMBDA[q]) / (LAMBDA[q] + m2);
    return s / (2 * M);
  }
  const curves = new Map();
  /** E(a(p)) along the probe axis, cached per mass (the strip redraws on every camera move). */
  function selfCurve(m, ps) {
    const key = String(m);
    if (!curves.has(key)) { curves.set(key, ps.map((p) => [p, selfEnergy(m, dressA(p))])); if (curves.size > 24) curves.delete(curves.keys().next().value); }
    return curves.get(key);
  }
  /** Periodic trilinear sample of a lattice field at fractional site coordinates. */
  function sample(G, u, v, w) {
    const i0 = Math.floor(u), j0 = Math.floor(v), k0 = Math.floor(w), fu = u - i0, fv = v - j0, fw = w - k0;
    let s = 0;
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) {
      s += (a ? fu : 1 - fu) * (b ? fv : 1 - fv) * (c ? fw : 1 - fw) * G[idx(wrap(i0 + a), wrap(j0 + b), wrap(k0 + c))];
    }
    return s;
  }
  const siteWorld = (s) => s.map((c) => (c - MID) * H);
  /** Ratio G(x₀ + r d)/G(x₀) along a world direction d, r in sites. */
  const ratioAt = (f, d, r) => sample(f.G, f.x0[0] + d[0] * r, f.x0[1] + d[1] * r, f.x0[2] + d[2] * r) / f.core;
  /** Distance in sites from the core where the ratio first falls to q (capped at half the torus). */
  function isoRadius(f, d, q) {
    const cap = N / 2, step = 0.1;
    let prev = 1;
    for (let r = step; r <= cap + 1e-9; r += step) {
      const now = ratioAt(f, d, r);
      if (now <= q) return r - step + step * (prev - q) / Math.max(1e-12, prev - now);
      prev = now;
    }
    return cap;
  }
  /** The iso-shell G = q·G(x₀) as rows of points relative to the core (world units), cached per field. */
  const SHELL = { nu: 18, nv: 36 };
  function shellRows(f, q) {
    if (f.shells.has(q)) return f.shells.get(q);
    const rows = [];
    for (let j = 0; j <= SHELL.nv; j++) {
      const row = [], ph = TAU * j / SHELL.nv;
      for (let i = 0; i <= SHELL.nu; i++) {
        const th = PI * i / SHELL.nu, d = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
        row.push(v3.scale(d, isoRadius(f, d, q) * H));
      }
      rows.push(row);
    }
    f.shells.set(q, rows);
    return rows;
  }

  /* ---------- the golden-angle filaments ---------- */
  const GA = PI * (3 - Math.sqrt(5)), FIL_N = 21, FIL_LEN = 0.68, FIL_S = 18;
  const DIRS = Array.from({ length: FIL_N }, (_, n) => {
    const z = 1 - 2 * (n + 0.5) / FIL_N, r = Math.sqrt(1 - z * z);
    return [r * Math.cos(GA * n), r * Math.sin(GA * n), z];
  });
  function filamentProfile(f, d, len, step = H) {
    const out = [];
    for (let s = 0; s <= FIL_S; s++) out.push(ratioAt(f, d, s / FIL_S * len / step));
    return out;
  }
  const lerpProfile = (prof, t) => { const x = clamp(t, 0, 1) * FIL_S, i = Math.min(FIL_S - 1, Math.floor(x)), u = x - i; return prof[i] * (1 - u) + prof[i + 1] * u; };

  /* ---------- the octave: grades, frame, volume, helix readout ---------- */
  const PASCAL = [1, 3, 3, 1];
  const gradeOf = (z) => { const r = Math.round(clamp(z, -1, 3)); return r === -1 ? 3 : r; };
  const dofAt = (z) => PASCAL[gradeOf(z)];
  const helixS = (z) => (z + 1) / 4;
  /* The helix runs along a horizontal axis (the camera's right at the octave view): wide frames hold it whole. The
     frame e₁, e₂, e₃ turns about the same axis by the helix angle 2πs, so z = −1 and z = 3 show the same frame. At
     s = 0 the frame stands on the axis by its body diagonal, e₁ + e₂ + e₃ = √3 · AXIS: the cube it spans then turns
     about its own diagonal, from the point (grade 0) to the far corner (grade 3), and stays inside the helix. */
  const AXIS = [Math.cos(0.62), Math.sin(0.62), 0], UPV = [0, 0, 1], SIDE = v3.cross(AXIS, UPV);
  const turn = (v, k, th) => v3.add(v3.add(v3.scale(v, Math.cos(th)), v3.scale(v3.cross(k, v), Math.sin(th))), v3.scale(k, v3.dot(k, v) * (1 - Math.cos(th))));
  const radial = (th, r) => v3.add(v3.scale(UPV, r * Math.cos(th)), v3.scale(SIDE, r * Math.sin(th)));
  const SPIN = 1.05;
  const BASE = (() => {
    const b = [0, 1, 2].map((k) => v3.add(v3.scale(AXIS, 1 / Math.sqrt(3)), radial(SPIN + TAU * k / 3, Math.sqrt(2 / 3))));
    return v3.dot(v3.cross(b[0], b[1]), b[2]) > 0 ? b : [b[0], b[2], b[1]];
  })();
  const frameAt = (s) => BASE.map((e) => turn(e, AXIS, TAU * s));
  /** The Gram determinant of u, v, w by the expansion of three_anchor_gram_det_formula. */
  function gramDet(u, v, w) {
    const uu = v3.dot(u, u), vv = v3.dot(v, v), ww = v3.dot(w, w), uv = v3.dot(u, v), uw = v3.dot(u, w), vw = v3.dot(v, w);
    return uu * vv * ww + 2 * uv * uw * vw - uu * vw * vw - vv * uw * uw - ww * uv * uv;
  }
  const rotZ = (a) => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
  const rotX = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
  const mmul = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const mvec = (A, x) => A.map((r) => r[0] * x[0] + r[1] * x[1] + r[2] * x[2]);
  /** |det G(Ru, Rv, Rw) − det G(u, v, w)| over 24 Euler rotations and the frame of every station. */
  function so3Error(frame) {
    const base = gramDet(...frame);
    let worst = 0;
    for (let k = 0; k < 24; k++) {
      const R = mmul(mmul(rotZ(0.37 * k), rotX(0.71 + 0.53 * k)), rotZ(1.13 * k * k));
      worst = Math.max(worst, Math.abs(gramDet(...frame.map((e) => mvec(R, e))) - base));
    }
    for (let z = -1; z <= 3; z++) worst = Math.max(worst, Math.abs(gramDet(...frameAt(helixS(z))) - base));
    return worst;
  }
  /** tr(ρ₁ρ₂ρ₃) with ρ = (I + r·σ)/2, by 2 × 2 complex products, and its Bloch form (triple_bargmann_bloch). */
  function tripleBargmann(r1, r2, r3) {
    const rho = (r) => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
    const cm = (A, B) => A.map((row) => [0, 1].map((j) => {
      let re = 0, im = 0;
      for (let k = 0; k < 2; k++) { const a = row[k], b = B[k][j]; re += a[0] * b[0] - a[1] * b[1]; im += a[0] * b[1] + a[1] * b[0]; }
      return [re, im];
    }));
    const P = cm(cm(rho(r1), rho(r2)), rho(r3)), direct = [P[0][0][0] + P[1][1][0], P[0][0][1] + P[1][1][1]];
    const bloch = [(1 + v3.dot(r1, r2) + v3.dot(r2, r3) + v3.dot(r3, r1)) / 4, v3.dot(r1, v3.cross(r2, r3)) / 4];
    return { direct, bloch, err: Math.hypot(direct[0] - bloch[0], direct[1] - bloch[1]) };
  }
  /** Hodge pairs line ↔ plane as projectors, and the pinching by the four grade projections of Λ(ℝ³) (8 × 8). */
  function projectorError(frame) {
    let worst = 0;
    const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    for (const u of frame) {
      const P = u.map((a) => u.map((b) => a * b)), Q = P.map((r, i) => r.map((x, j) => I[i][j] - x));
      const PP = mmul(P, P), QQ = mmul(Q, Q), PQ = mmul(P, Q), QP = mmul(Q, P);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        worst = Math.max(worst, Math.abs(PP[i][j] - P[i][j]), Math.abs(QQ[i][j] - Q[i][j]), Math.abs(PQ[i][j]), Math.abs(QP[i][j]), Math.abs(P[i][j] + Q[i][j] - I[i][j]));
      }
    }
    return Math.max(worst, PINCH_ERR);
  }
  const PINCH_ERR = (() => {
    let seed = 20261115;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 - 0.5; };
    const n = 8, grade = (i) => (i & 1) + ((i >> 1) & 1) + ((i >> 2) & 1);
    const A = Array.from({ length: n }, () => Array.from({ length: n }, () => [rnd(), rnd()]));
    const mul = (X, Y) => X.map((row) => Y[0].map((_, j) => {
      let re = 0, im = 0;
      for (let k = 0; k < n; k++) { const a = row[k], b = Y[k][j]; re += a[0] * b[0] - a[1] * b[1]; im += a[0] * b[1] + a[1] * b[0]; }
      return [re, im];
    }));
    const dag = (X) => X[0].map((_, i) => X.map((row) => [row[i][0], -row[i][1]]));
    let rho = mul(A, dag(A));
    const tr = rho.reduce((s, row, i) => s + row[i][0], 0);
    rho = rho.map((row) => row.map(([a, b]) => [a / tr, b / tr]));
    const Pk = [0, 1, 2, 3].map((k) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [i === j && grade(i) === k ? 1 : 0, 0])));
    const pinch = (X) => Pk.reduce((acc, P) => { const Y = mul(mul(P, X), P); return acc.map((row, i) => row.map((c, j) => [c[0] + Y[i][j][0], c[1] + Y[i][j][1]])); },
      Array.from({ length: n }, () => Array.from({ length: n }, () => [0, 0])));
    const once = pinch(rho), twice = pinch(once);
    let worst = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) worst = Math.max(worst, Math.abs(twice[i][j][0] - once[i][j][0]), Math.abs(twice[i][j][1] - once[i][j][1]));
    return worst;
  })();
  /** Integer Fourier readouts χ_mode(σ) = e^{2πi·mode·σ} at the normalized helix coordinate σ = ℓ + s. */
  const readout = (mode, sigma) => [Math.cos(TAU * mode * sigma), Math.sin(TAU * mode * sigma)];
  function deckCheck(level) {
    let diff = 0;
    for (let mode = -3; mode <= 3; mode++) {
      const a = readout(mode, level + helixS(-1)), b = readout(mode, level + helixS(3));
      diff = Math.max(diff, Math.hypot(a[0] - b[0], a[1] - b[1]));
    }
    return { sameDeck: diff < 1e-12, diff, levelShift: Math.floor(level + helixS(3) + 1e-9) - Math.floor(level + helixS(-1) + 1e-9) };
  }

  /* ---------- ℤ/12ℤ: position comb, momentum comb, finite Poisson summation ---------- */
  const DIVISORS = [12, 6, 4, 3, 2, 1];
  const ringStep = (p) => DIVISORS[Math.min(5, Math.floor(p * 6))];
  function poisson(m, p) {
    const m2 = m2eff(m), f = [], fh = [];
    for (let x = 0; x < RING; x++) { let s = 0; for (let k = 0; k < RING; k++) s += Math.cos(TAU * k * x / RING) / (2 - 2 * Math.cos(TAU * k / RING) + m2); f.push(s / RING); }
    for (let k = 0; k < RING; k++) { let re = 0, im = 0; for (let x = 0; x < RING; x++) { re += f[x] * Math.cos(TAU * x * k / RING); im -= f[x] * Math.sin(TAU * x * k / RING); } fh.push([re, im]); }
    let err = 0, shown = null;
    for (const d of DIVISORS) {
      const Hs = [], Hp = [];
      for (let x = 0; x < RING; x += d) Hs.push(x);
      for (let k = 0; k < RING; k++) if (Hs.every((h) => (h * k) % RING === 0)) Hp.push(k);
      const left = Hs.reduce((s, h) => s + f[h], 0);
      let rr = 0, ri = 0;
      for (const k of Hp) { rr += fh[k][0]; ri += fh[k][1]; }
      rr *= Hs.length / RING; ri *= Hs.length / RING;
      err = Math.max(err, Math.abs(left - rr), Math.abs(ri));
      for (let x = 0; x < RING; x++) {
        let cr = 0, ci = 0;
        for (const k of Hp) { cr += Math.cos(TAU * k * x / RING); ci += Math.sin(TAU * k * x / RING); }
        err = Math.max(err, Math.abs(cr - (Hs.includes(x) ? Hp.length : 0)), Math.abs(ci));
      }
      if (d === ringStep(p)) shown = { d, H: Hs, Hp, left, right: rr };
    }
    return { f, fh: fh.map((c) => c[0]), err, ...shown };
  }

  /* ---------- the golden model set: packing radius from the gaps, computed in ℤ[φ] ---------- */
  const DELONE = (() => {
    const pts = [], lo = PHI - 2, hi = PHI - 1;
    for (let b = -60; b <= 60; b++) for (let a = -110; a <= 110; a++) {
      const x = a + b * PHI, c = a + b * (1 - PHI);
      if (Math.abs(x) <= 40 && c >= lo - 1e-12 && c <= hi + 1e-12) pts.push([a, b, x]);
    }
    pts.sort((p, q) => p[2] - q[2]);
    let minGap = Infinity, maxGap = 0;
    for (let i = 1; i < pts.length; i++) { const g = (pts[i][0] - pts[i - 1][0]) + (pts[i][1] - pts[i - 1][1]) * PHI; minGap = Math.min(minGap, g); maxGap = Math.max(maxGap, g); }
    return { count: pts.length, packing: minGap / 2, maxGap };
  })();

  /* ---------- state, cards, controls ---------- */
  const LENSES = ['octave-hodge', 'green-yukawa', 'fourier-dressed'];
  const S = { octaveZoom: 0, dualityLens: 'octave-hodge', massScale: 0.35, probeScale: 0.5, core: [MID, MID, MID], level: 0, trailFrom: null };
  const PRESETS = {
    'pascal-hodge-1331': { z: 3, lens: 'octave-hodge', m: 0.35, p: 0.35, play: false, still: 1 },
    'octave-helix-zoom': { z: -1, lens: 'octave-hodge', m: 0.35, p: 0.75, play: true, still: 1 },
    'green-yukawa-reciprocity': { z: 0, lens: 'green-yukawa', m: 0.35, p: 0.40, play: false, still: 0.25 },
    'dressed-uv-cutoff': { z: -0.65, lens: 'fourier-dressed', m: 0.50, p: 0.90, play: false, still: 0.0875 },
    'position-momentum-duality': { z: 0, lens: 'fourier-dressed', m: 0, p: 0.50, play: false, still: 0.25 }
  };
  const NOTES = {
    'pascal-hodge-1331': ['z = 3：一个点、三条青线、三块品红面、一块紫色体，1 3 3 1；每条青线垂直于与它霍奇对偶的品红面。', 'z = 3: one point, three cyan lines, three magenta planes, one violet volume, 1 3 3 1; each cyan line is normal to the magenta plane Hodge-dual to it.'],
    'octave-helix-zoom': ['沿紫色螺旋爬满一圈：起点的场体与终点的体落在同一条虚线的两端，读出相同，层级加一。', 'Climb one full turn of the violet helix: the field body at the start and the volume at the end sit at the two ends of one dashed line; same readout, one level up.'],
    'green-yukawa-reciprocity': ['琥珀核心向外长出青色场丝；品红探针处 G(xₚ, x₀) 与反向的 G(x₀, xₚ) 相等。', 'Cyan filaments grow out of the amber core; at the magenta probe G(xₚ, x₀) equals the reverse G(x₀, xₚ).'],
    'dressed-uv-cutoff': ['探针调到 0.90，紫色缀饰云停在玻璃壳上：半径不小于 1/2，自能保持有限。', 'With the probe at 0.90 the violet dressing cloud stops at the glass shell: its radius stays 1/2 and the self-energy stays finite.'],
    'position-momentum-duality': ['m = 0：左边位置盘 4 个品红齿，右边动量盘 3 个青色齿，两边加和相等。', 'm = 0: four magenta teeth on the position dial at left, three cyan teeth on the momentum dial at right; the two sums agree.']
  };
  const CAM = { 'octave-hodge': [-0.62, 0.52, 1], 'green-yukawa': [-0.55, 0.36, 1], 'fourier-dressed': [-0.62, 0.40, 1] };
  let clock, cards, fields, lensChips, jumpChips, transition = null, plotG = null, booting = true, lastT = 0.25, Q = null;
  // kit.solid re-reads radius, cx and cy at every frame: fit() sets them so that the scene fills the band between
  // the title (with the lens buttons) and the legend, in every frame size, for the lens's own camera.
  const solidOpts = { canvas: $('cv'), wheel: false, yaw: -0.62, pitch: 0.40, radius: 0.34, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid($('stage'), solidOpts);
  const paint = kit.painter(() => {
    Q = compute();
    drawText();
    TRV.hudFit();
    fit();
    drawStage();
    drawPlot();
  }, [$('stage'), $('plot')]);

  function compute() {
    const m = S.massScale, p = S.probeScale, z = S.octaveZoom, s = helixS(z), frame = frameAt(s);
    const bare = field(S.core, m, 0), a = dressA(p), dressed = field(S.core, m, a);
    const rp = clamp(Math.round(p * 4), 1, 4), probe = [wrap(S.core[0] + rp), S.core[1], S.core[2]];
    const fromProbe = field(probe, m, 0);
    const gp0 = bare.G[idx(...probe)], g0p = fromProbe.G[idx(...S.core)];
    const deck = deckCheck(S.level), bargmann = tripleBargmann(...frame);
    return {
      z, s, frame, bare, dressed, a, rp, probe, gp0, g0p, recip: Math.abs(gp0 - g0p),
      neighbour: bare.G[idx(wrap(S.core[0] + 1), S.core[1], S.core[2])] / bare.core,
      volume: gramDet(...frame), so3: so3Error(frame), proj: projectorError(frame), bargmann, deck,
      chi: readout(1, S.level + s), self: selfEnergy(m, a), poisson: poisson(m, p)
    };
  }

  function syncFields() {
    fields.z.set(S.octaveZoom); fields.m.set(S.massScale); fields.p.set(S.probeScale);
    const near = [-1, 0, 1, 2, 3].find((v) => Math.abs(v - S.octaveZoom) < 0.005);
    jumpChips.set(near == null ? null : String(near), true);
  }
  function leave() { if (transition) transition.cancel(); transition = null; clock.pause(); cards.mark(null); S.trailFrom = null; }
  function setZoom(z) { leave(); S.octaveZoom = clamp(z, -1, 3); lastT = helixS(S.octaveZoom); clock.set(lastT); }
  function setMass(v) { leave(); S.massScale = clamp(v, 0, 2); syncFields(); paint(); }
  function setProbe(v) { leave(); S.probeScale = clamp(v, 0, 1); syncFields(); paint(); }
  function setCore(site) {
    const next = site.map((c) => clamp(Math.round(c), 0, N - 1));
    if (next.every((c, i) => c === S.core[i])) return;
    S.core = next; paint();
  }
  function setLens(lens, instant = false) {
    if (!LENSES.includes(lens)) return;
    S.dualityLens = lens; lensChips.set(lens, true);
    sc.view(CAM[lens], instant || TRV.still ? 0 : 650); paint();
  }
  function timeline(t, C) {
    if (C && C.playing && t < lastT - 0.5) S.level += 1;
    lastT = t;
    const z = 4 * t - 1;
    if (Math.abs(z - S.octaveZoom) > 1e-9) S.octaveZoom = z;
    if (fields) syncFields();
    paint();
  }
  clock = kit.clock({ range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, step: 0.25, rate: 0.125, loop: true, t: 0.25,
    format: (t) => `z ${fix(4 * t - 1, 2)} <small>· ℓ ${S.level}</small>`, onChange: timeline });
  fields = {
    z: kit.field($('octaveZoom'), { fmt: (v) => fix(v, 2), onInput: setZoom }),
    m: kit.field($('massScale'), { fmt: (v) => fix(v, 2), onInput: setMass }),
    p: kit.field($('probeScale'), { fmt: (v) => fix(v, 2), onInput: setProbe })
  };
  jumpChips = kit.chips($('zoomJumps'), 'zoom', (v) => setZoom(Number(v)));
  lensChips = kit.chips($('dualityLens'), 'lens', (v) => { cards.mark(null); S.trailFrom = null; setLens(v); });

  function applyPreset(id) {
    const p = PRESETS[id], from = { m: S.massScale, p: S.probeScale };
    if (transition) transition.cancel();
    transition = null;
    clock.pause();
    S.level = 0; S.core = [MID, MID, MID]; S.trailFrom = id === 'octave-helix-zoom' ? -1 : null;
    S.octaveZoom = p.z; lastT = helixS(p.z); clock.set(lastT, true);
    setLens(p.lens, booting);
    if (TRV.still || (booting && !TRV.embed)) { lastT = p.still; clock.set(p.still, true); S.octaveZoom = 4 * p.still - 1; if (Math.abs(S.octaveZoom - p.z) < 1e-9) S.octaveZoom = p.z; }
    if (!booting && !TRV.still) {
      transition = kit.tween(550, (e) => { S.massScale = from.m + (p.m - from.m) * e; S.probeScale = from.p + (p.p - from.p) * e; syncFields(); paint(); });
    } else { S.massScale = p.m; S.probeScale = p.p; }
    if (TRV.reduceMotion || booting || TRV.still) { S.massScale = p.m; S.probeScale = p.p; }
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    paint();
  }
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动琥珀圆环移动核心，或换一副透镜。', 'Explore: drag the amber ring to move the core, or switch the lens.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ l: () => { cards.mark(null); S.trailFrom = null; setLens(LENSES[(LENSES.indexOf(S.dualityLens) + 1) % LENSES.length]); } });

  /* ---------- the core handle: an amber ring on the projected core; drag it in the plane facing the viewer ---------- */
  const handle = $('coreHandle');
  let hdrag = null;
  const camAxes = () => {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    ev.preventDefault(); ev.stopPropagation();
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
    leave();
    hdrag = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, from: siteWorld(S.core) };
    handle.classList.add('dragging');
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!hdrag || ev.pointerId !== hdrag.id) return;
    const { R, U } = camAxes(), k = 1 / sc.unit;
    const w = v3.add(hdrag.from, v3.add(v3.scale(R, (ev.clientX - hdrag.x) * k), v3.scale(U, -(ev.clientY - hdrag.y) * k)));
    setCore(w.map((c) => c / H + MID));
  });
  const endDrag = (ev) => {
    if (!hdrag || (ev && ev.pointerId !== hdrag.id)) return;
    const id = hdrag.id;
    hdrag = null; handle.classList.remove('dragging');
    try { if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id); } catch (e) { /* already released */ }
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const step = { ArrowLeft: [-1, 0, 0], ArrowRight: [1, 0, 0], ArrowUp: [0, 1, 0], ArrowDown: [0, -1, 0], PageUp: [0, 0, 1], PageDown: [0, 0, -1] }[ev.key];
    if (!step) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    setCore(S.core.map((c, i) => c + step[i]));
  });
  if (TRV.thumbMode) handle.hidden = true;

  /* ---------- the plot strip: drag to set z (octave), the probe distance (Green) or the probe (Fourier) ---------- */
  const plotDrag = (ev) => {
    if (!plotG) return;
    const x = plotG.invX(ev.clientX - $('plot').getBoundingClientRect().left);
    if (S.dualityLens === 'octave-hodge') setZoom(x);
    else if (S.dualityLens === 'green-yukawa') setProbe(clamp(Math.round(x), 1, 4) / 4);
    else setProbe(x);
  };
  $('plot').addEventListener('pointerdown', (ev) => { $('plot').setPointerCapture(ev.pointerId); plotDrag(ev); });
  $('plot').addEventListener('pointermove', (ev) => { if ($('plot').hasPointerCapture(ev.pointerId)) plotDrag(ev); });
  const plotUp = (ev) => { if ($('plot').hasPointerCapture(ev.pointerId)) $('plot').releasePointerCapture(ev.pointerId); };
  $('plot').addEventListener('pointerup', plotUp); $('plot').addEventListener('pointercancel', plotUp);

  /* ---------- the stage ---------- */
  const expo = (x) => (x === 0 ? '0' : x.toExponential(1).replace('e-', 'e−').replace('e+', 'e+'));
  const GRADE_HTML = (z) => {
    const g = Math.round(clamp(z, -1, 3));
    return [
      `Λ³<sub>ℓ−1</sub> ${L('场体', 'field body')}`, `Λ⁰<sub>ℓ</sub> ${L('点', 'point')}`, `Λ¹<sub>ℓ</sub> ${L('线', 'lines')}`,
      `Λ²<sub>ℓ</sub> ${L('面', 'planes')}`, `Λ³<sub>ℓ</sub> ≡ Λ⁰<sub>ℓ+1</sub>`
    ][g + 1];
  };
  /* The octave body: the cube spanned by the frame from the point x₀, its diagonal on the helix axis (length √3·CUBE,
     radius √(2/3)·CUBE about the axis, inside the helix of radius HELIX.r). The helix is centred on the body; its
     pitch px follows the frame's shape (fit), and the station of grade k sits at the layer of the cube's corners of
     that grade when px = CUBE/√3. */
  const CUBE = 0.73, BODY_LEN = CUBE * Math.sqrt(3), BODY_R = CUBE * Math.sqrt(2 / 3), PX_MIN = 0.3, PX_MAX = 0.62;
  const HELIX = { r: 0.64, px: CUBE / Math.sqrt(3), th0: -2.614 };
  const helixPoint = (sigma, o) => v3.add(o, v3.add(v3.scale(AXIS, BODY_LEN / 2 + (sigma - 1.5) * HELIX.px), radial(TAU * (sigma + 1) / 4 + HELIX.th0, HELIX.r)));
  // the Fourier lens looks at the dressed core through a two-fold close-up (HF world units per lattice step)
  const HF = 2.5 * H, DIAL = { r: 0.30, stem: 0.15, off: 0.92 };
  const dialOffset = () => Math.max(DIAL.off, dressA(S.probeScale) * HF + DIAL.r + 0.14);
  /** The direction at polar angle th from the viewing direction D and azimuth ph about it (R, U: the camera's axes). */
  const aboutView = (D, ax, th, ph) => v3.add(v3.scale(D, Math.cos(th)), v3.add(v3.scale(ax.R, Math.sin(th) * Math.cos(ph)), v3.scale(ax.U, Math.sin(th) * Math.sin(ph))));
  /** Half-extents and centre of the scene in the plane of the lens's own camera (world units, core at the origin). */
  function extents(lens) {
    const [yaw, pitch] = CAM[lens], cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const R = [cyw, -syw, 0], U = [syw * sp, cyw * sp, cp];
    const pts = [];
    const ball = (c, r) => { for (const d of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) pts.push(v3.add(c, v3.scale(d, r))); for (const a of [R, U]) for (const k of [1, -1]) pts.push(v3.add(c, v3.scale(a, k * r))); };
    if (lens === 'octave-hodge') {
      for (const sg of range(-1.45, 3.45, 80)) pts.push(helixPoint(sg, [0, 0, 0]));
      // the body turns about the axis: its bounding cylinder, from the point to the far corner
      for (const a of [0, BODY_LEN]) for (let k = 0; k < 12; k++) pts.push(v3.add(v3.scale(AXIS, a), radial(TAU * k / 12, BODY_R)));
    } else if (lens === 'green-yukawa') {
      ball([0, 0, 0], FIL_LEN);
      const h = MID * H;
      for (const [x, y] of [[-h, -h], [h, -h], [h, h], [-h, h]]) pts.push([x, y, 0]);
    } else {
      ball([0, 0, 0], Math.max(0.46, dressA(S.probeScale) * HF));
      const reach = DIAL.r + DIAL.stem + 0.04;
      for (const k of [1, -1]) {
        const c = v3.scale(R, k * dialOffset());
        for (const a of [R, U]) for (const j of [1, -1]) pts.push(v3.add(c, v3.scale(a, j * reach)));
      }
    }
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of pts) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    return { ex: (x1 - x0) / 2, ey: (y1 - y0) / 2, ox: (x0 + x1) / 2, oy: (y0 + y1) / 2 };
  }
  const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none';
  function fit() {
    if (hdrag) return;   // the projection holds still under a dragging pointer
    const cv = $('cv'), W = cv.clientWidth || 300, Hh = cv.clientHeight || 150, st = cv.getBoundingClientRect();
    let top = 10, bottom = Hh - 10;
    if (!TRV.thumbMode) {
      for (const el of [$('hudTl'), $('dualityLens')]) if (visible(el) && el.textContent.trim()) top = Math.max(top, el.getBoundingClientRect().bottom - st.top + 10);
      const lg = $('legend');
      if (visible(lg) && lg.children.length) bottom = Math.min(bottom, lg.getBoundingClientRect().top - st.top - 8);
    }
    if (bottom - top < 80) { top = Math.max(10, (Hh - 80) / 2); bottom = top + 80; }
    // the octave lens fills the height with the helix and the body inside it: a wide frame puts the labels beside the
    // helix, so the helix may span the band; a squarer frame keeps a margin above and below it
    const lens = S.dualityLens, bw = W - 20, bh = bottom - top, padX = TRV.thumbMode ? 1.04 : 1.14;
    const padY = lens === 'octave-hodge' && !TRV.thumbMode ? 1.1 - 0.1 * clamp((bw / bh - 1.7) / 0.6, 0, 1) : padX;
    if (lens === 'octave-hodge') spreadHelix(bw / padX, bh / padY);
    const e = extents(lens), unit = Math.max(30, Math.min(bw / (2 * e.ex * padX), bh / (2 * e.ey * padY)));
    solidOpts.radius = unit / Math.min(W, Hh);
    solidOpts.cx = (W / 2 - e.ox * unit) / W;
    solidOpts.cy = ((top + bottom) / 2 + e.oy * unit) / Hh;
  }
  /** The widest pitch (between PX_MIN and PX_MAX) at which the height still binds the scale: a wide frame spreads the
      stations along the axis, a narrow one winds the helix tighter around the body, which keeps its size. */
  let spread = '';
  function spreadHelix(w, h) {
    const key = `${w.toFixed(1)}|${h.toFixed(1)}`;
    if (key === spread) return;   // the pitch depends on the band only, not on the camera
    spread = key;
    for (let px = PX_MAX; px > PX_MIN; px -= 0.01) {
      HELIX.px = px;
      const e = extents('octave-hodge');
      if (e.ex / e.ey <= w / h) return;
    }
    HELIX.px = PX_MIN;
  }
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);

  let labels = [];
  function drawStage() {
    const P = TRV.palette, lens = S.dualityLens, core = siteWorld(S.core);
    labels = [];
    sc.begin();
    const overlay = sc.overlay(), dpr = TRV.fitCanvas(overlay), ctx = overlay.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, sc.W, sc.H);
    if (lens === 'octave-hodge') drawOctave(P, core);
    else if (lens === 'green-yukawa') drawGreen(P, core);
    else drawFourier(P, core);
    sc.bead(core, { key: 'core', color: lens === 'octave-hodge' ? P.sigma : P.amber, r: lens === 'octave-hodge' ? 9 : 6.5 });
    placeLabels(ctx);
    sc.end();
    const q = sc.p(core);
    handle.style.transform = `translate(${q[0].toFixed(1)}px, ${q[1].toFixed(1)}px)`;
  }

  function drawFilaments(P, core, f, opts) {
    const alpha = opts.alpha;
    DIRS.forEach((d, n) => {
      if (alpha <= 0.01) return;
      const len = opts.len || FIL_LEN, prof = filamentProfile(f, d, len, opts.step || H), pts = range(0, 1, 12).map((t) => v3.add(core, v3.scale(d, t * len)));
      sc.tube(`fil-${n}`, pts, { color: opts.color || P.cyan, width: opts.width || 2.2, glow: 0.45, pick: false,
        alpha: (t) => alpha * (0.12 + 0.88 * Math.pow(clamp(lerpProfile(prof, t), 0, 1), 0.7)) });
    });
  }
  /** The lattice plane of (ℤ/9ℤ)³ through the core: the sites the field lives on. */
  function drawPlane(P, core, alpha) {
    const h = MID * H, z = core[2];
    for (let i = 0; i < N; i++) {
      const u = (i - MID) * H, edge = i === 0 || i === N - 1;
      sc.line([[u, -h, z], [u, h, z]], { color: P.dim, alpha: (edge ? 0.5 : 0.22) * alpha, width: 1 });
      sc.line([[-h, u, z], [h, u, z]], { color: P.dim, alpha: (edge ? 0.5 : 0.22) * alpha, width: 1 });
    }
  }

  /** A quad of the octave body, cut away towards the viewer: a quad whose outward normal points away is a lit opaque
      wall, seen from inside; a quad that faces the viewer is glass, so the point, the lines and the inside stay in view. */
  function wall(key, quad, out, color, glass) {
    const solid = v3.dot(out, sc.facing()) < 0;
    sc.poly(key, { vertices: quad, faces: [[0, 1, 2, 3]] }, { color, alpha: solid ? 1 : glass, edges: color, pick: false });
  }

  function drawOctave(P, core) {
    const z = Q.z, frame = Q.frame, hp = (sg) => helixPoint(sg, core);
    const body = z < 0, size = CUBE * (body ? -z : 1);
    const g1 = body ? 1 : clamp(z, 0, 1), g2 = body ? 1 : clamp(z - 1, 0, 1), g3 = body ? 1 : clamp(z - 2, 0, 1);
    const E = frame.map((e) => v3.scale(e, size));
    // the field through which the volume condenses into the point (only on the way, so that z = −1 and z = 3 agree)
    if (body) drawFilaments(P, core, Q.bare, { alpha: 0.85 * Math.sin(PI * -z), width: 1.8 });
    if (size > 1e-3) {
      // Λ³: the violet volume spanned by e₁, e₂ and g₃·e₃: its three far faces (the faces at the point are the planes)
      if (g3 > 0.002) {
        const A = [E[0], E[1], v3.scale(E[2], g3)];
        for (let i = 0; i < 3; i++) {
          const j = (i + 1) % 3, k = (i + 2) % 3, o = v3.add(core, A[i]);
          wall(`volume-${i}`, [o, v3.add(o, A[j]), v3.add(v3.add(o, A[j]), A[k]), v3.add(o, A[k])], frame[i], P.violet, 0.1);
        }
        // the points of the finer level that the probe resolves inside the volume
        const n = S.probeScale < 1 / 3 ? 1 : S.probeScale < 2 / 3 ? 2 : 3;
        for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) {
          const p = v3.add(core, v3.add(v3.add(v3.scale(A[0], (a + 0.5) / n), v3.scale(A[1], (b + 0.5) / n)), v3.scale(A[2], (c + 0.5) / n)));
          sc.bead(p, { color: P.sigma, r: n === 3 ? 2.6 : 3.2, glow: 0.3 });
        }
      }
      // Λ²: three magenta planes through the point, each the Hodge dual of the cyan line normal to it
      if (g2 > 0.002) for (let i = 0; i < 3; i++) {
        const j = (i + 1) % 3, k = (i + 2) % 3, A = E[j], B = v3.scale(E[k], g2);
        const quad = [core, v3.add(core, A), v3.add(v3.add(core, A), B), v3.add(core, B)];
        wall(`plane-${i}`, quad, v3.scale(frame[i], -1), P.magenta, 0.3);
        sc.line(quad, { color: P.magenta, alpha: 0.9, width: 1.4, close: true });
      }
      // Λ¹: three cyan rods out of the point, along the edges of the body, each ending in a lit cone
      if (g1 > 0.002) for (let i = 0; i < 3; i++) {
        const len = 1.06 * g1 * size, head = 15 / sc.unit, at = (d) => v3.add(core, v3.scale(frame[i], Math.max(0, d)));
        if (len > head) sc.tube(`rod-${i}`, [core, at(len - head)], { color: P.cyan, width: 6, glow: 0.35, pick: false, occlude: false });
        sc.arrow(at(len - head / 0.6), at(len), { color: P.cyan, width: 6, headSize: 15 });
      }
    }
    // the helix: one turn is one octave; the stations −1 and 3 sit one pitch apart at the same angle (same deck, level + 1)
    const sig = range(-1.45, 3.45, 140), stub = 0.45 / 4.9;
    sc.tube('helix', sig.map(hp), { color: P.violet, width: 5, glow: 0.35, pick: false, occlude: false, alpha: (t) => clamp(Math.min(t, 1 - t) / stub, 0.12, 1) });
    if (S.trailFrom != null && z > S.trailFrom + 0.01) {
      sc.tube('trail', range(S.trailFrom, z, 70).map(hp), { color: P.violet, width: 7, glow: 0.7, pick: false, occlude: false });
      sc.ring(hp(S.trailFrom), { key: 'trail-start', color: P.violet, r: 11, normal: sc.facing() });
    }
    sc.line([hp(-1), hp(3)], { color: P.dim, dash: [5, 5], width: 1.2, alpha: 0.9 });
    const STATION = [P.violet, P.sigma, P.cyan, P.magenta, P.violet];
    for (let g = -1; g <= 3; g++) sc.bead(hp(g), { key: `station${g}`, color: STATION[g + 1], r: 7 });
    const now = hp(z);
    sc.bead(now, { key: 'now', color: P.amber, r: 7 });
    sc.ring(now, { key: 'now-ring', color: P.amber, r: 13, normal: sc.facing() });
    const CLS = ['c-vi', 'ink', 'c-cy', 'c-mg', 'c-vi'];
    for (let g = -1; g <= 3; g++) labels.push({ key: `st${g}`, p: hp(g), html: GRADE_HTML(g), cls: CLS[g + 1], pri: g === -1 || g === 3 ? 11 : 9, near: true });
    labels.push({ key: 'deck', p: v3.lerp(hp(-1), hp(3), 0.2), html: L('同一层面 · 层级 +1', 'same deck · level +1'), cls: 'ink', pri: 7 });
  }

  function drawGreen(P, core) {
    drawPlane(P, core, 1);
    const f = Q.bare;
    drawFilaments(P, core, f, { alpha: 1, width: 2.4 });
    const rows = shellRows(f, ISO_Q).map((row) => row.map((p) => v3.add(core, p)));
    sc.surface('shell', rows, { color: P.violet, alpha: 0.26, grid: { every: [3, 3], color: P.violet, alpha: 0.45 }, pick: false });
    // the far half of the same shell as a lit opaque bowl just inside it (built about the viewing direction): the core,
    // the filaments in front of it and the probe stay in view through the glass half that faces the viewer
    const D = sc.facing(), ax = camAxes(), bowl = [];
    for (let j = 0; j <= 36; j++) {
      const row = [];
      for (let i = 0; i <= 9; i++) { const d = aboutView(D, ax, PI / 2 + PI / 2 * i / 9, TAU * j / 36); row.push(v3.add(core, v3.scale(d, 0.985 * isoRadius(f, d, ISO_Q) * H))); }
      bowl.push(row);
    }
    sc.surface('shell-back', bowl, { color: P.violet, grid: { every: [3, 3], color: P.violet, alpha: 0.5 }, pick: false });
    // the probe x_p on the torus, and the two directions of the same number G(x_p, x₀) = G(x₀, x_p)
    const xp = siteWorld(Q.probe), lift = [0, 0, 0.13 + 0.03 * Q.rp];
    const arc = (a, b, up) => range(0, 1, 24).map((t) => v3.add(v3.add(v3.scale(a, 1 - t), v3.scale(b, t)), v3.scale(lift, up * 4 * t * (1 - t))));
    const over = arc(core, xp, 1), under = arc(xp, core, -1);
    sc.line(over.slice(0, -2), { color: P.cyan, width: 1.8 }); sc.arrow(over.at(-3), over.at(-1), { color: P.cyan, width: 1.8, headSize: 8 });
    sc.line(under.slice(0, -2), { color: P.magenta, width: 1.8 }); sc.arrow(under.at(-3), under.at(-1), { color: P.magenta, width: 1.8, headSize: 8 });
    sc.bead(xp, { key: 'probe', color: P.magenta, r: 5.5 });
    labels.push({ key: 'x0', p: core, html: 'x₀', cls: 'c-am', pri: 12, near: true });
    labels.push({ key: 'xp', p: xp, html: 'xₚ', cls: 'c-mg', pri: 11, near: true });
    labels.push({ key: 'recip', p: over[12], html: `G(xₚ, x₀) = G(x₀, xₚ) = ${fix(Q.gp0, 4)}`, cls: 'num c-cy', pri: 10 });
    labels.push({ key: 'shell', p: rows[0][0], html: `${L('等值壳', 'iso-shell')} G = ${ISO_Q} G(x₀)`, cls: 'c-vi', pri: 8 });
    labels.push({ key: 'grid', p: [MID * H, -MID * H, core[2]], html: '(ℤ/9ℤ)³ · 729', cls: 'ink', pri: 6 });
  }

  function drawFourier(P, core) {
    const f = Q.dressed, pz = Q.poisson, ax = camAxes();
    drawFilaments(P, core, f, { alpha: 0.55, width: 1.8, len: 0.5, step: HF });
    const ra = Q.a * HF, rf = A_FLOOR * HF, asked = unfloored(S.probeScale);
    sc.surface('cloud', (th, ph) => v3.add(core, v3.scale([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)], ra)),
      { u: [0, PI], v: [0, TAU], nu: 18, nv: 36, color: P.violet, alpha: 0.45, grid: { every: [3, 4], color: P.violet, alpha: 0.55 }, pick: false });
    // its far half as a lit opaque bowl just inside it; the core and the dashed radius stay in front of it
    const D = sc.facing();
    sc.surface('cloud-back', (th, ph) => v3.add(core, v3.scale(aboutView(D, ax, th, ph), 0.985 * ra)),
      { u: [PI / 2, PI], v: [0, TAU], nu: 9, nv: 36, color: P.violet, grid: { every: [3, 4], color: P.violet, alpha: 0.5 }, pick: false });
    sc.glass('floor', core, rf * 1.06, { color: P.sigma, alpha: 0.12, rim: 0.9 });
    // what the probe asks for below the floor: a dashed circle inside the glass that the cloud does not follow
    if (asked < A_FLOOR - 1e-9) sc.circle(core, sc.facing(), Math.max(0.012, asked * HF), { color: P.sigma, dash: [3, 3], width: 1.2, alpha: 0.95, fade: false });
    // the two dials of ℤ/12ℤ face the viewer: position (the comb H) and momentum (the comb H⊥); bars point outwards
    const dial = (c, values, teeth, color, tag) => {
      const top = Math.max(...values.map(Math.abs)) || 1;
      sc.circle(c, sc.facing(), DIAL.r, { color: P.dim, alpha: 0.7, width: 1.1, fade: false });
      values.forEach((v, x) => {
        const th = PI / 2 - TAU * x / RING, dir = v3.add(v3.scale(ax.R, Math.cos(th)), v3.scale(ax.U, Math.sin(th)));
        const b = v3.add(c, v3.scale(dir, DIAL.r)), t = v3.add(b, v3.scale(dir, DIAL.stem * v / top)), on = teeth.includes(x);
        sc.line([b, t], { color: on ? color : P.dim, width: on ? 2.4 : 1, alpha: on ? 1 : 0.6 });
        sc.bead(t, { color: on ? color : P.dim, r: on ? 3.6 : 2.1, glow: on ? 0.55 : 0.2 });
      });
      sc.bead(c, { color: P.dim, r: 2 });
      labels.push({ key: tag.key, p: v3.sub(c, v3.scale(ax.U, DIAL.r + DIAL.stem + 0.05)), html: tag.html, cls: tag.cls, pri: 9, near: true });
    };
    const side = (k) => v3.add(core, v3.scale(ax.R, k * dialOffset())), compact = sc.W < 520;
    dial(side(-1), pz.f, pz.H, P.magenta, { key: 'pos', html: `${compact ? '' : `${L('位置', 'position')} · `}|H| = ${pz.H.length}`, cls: 'c-mg' });
    dial(side(1), pz.fh, pz.Hp, P.cyan, { key: 'mom', html: `${compact ? '' : `${L('动量', 'momentum')} · `}|H⊥| = ${pz.Hp.length}`, cls: 'c-cy' });
    labels.push({ key: 'cloud', p: v3.add(core, v3.scale(ax.U, ra)), html: `${L('缀饰云', 'dressing')} a = ${fix(Q.a, 2)}`, cls: 'c-vi', pri: 11, near: true });
    labels.push({ key: 'floor', p: v3.sub(core, v3.scale(ax.U, rf)), html: `${L('下限', 'floor')} 1/2`, cls: 'ink', pri: 8, near: true });
  }

  /* labels: by priority, into free room clear of the HUD, the handle and each other; a thin leader when far */
  const measure = document.createElement('span');
  measure.className = 'tag'; measure.hidden = true; $('stage').appendChild(measure);
  const sizes = new Map();
  TRV.onLang(() => sizes.clear());
  if (document.fonts) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  function placeLabels(ctx) {
    if (TRV.thumbMode) return;
    const stage = $('stage'), b = stage.getBoundingClientRect(), boxes = [];
    const shown = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).opacity !== '0';
    for (const el of stage.querySelectorAll(':scope > .hud-tl, :scope > .hud-tr, :scope > .hud-bl, :scope > .core-handle')) if (shown(el)) {
      for (const r of el.matches('.hud-bl, .hud-tl') ? [...el.children].filter(shown).map((c) => c.getBoundingClientRect()) : [el.getBoundingClientRect()]) {
        if (r.width && r.height) boxes.push({ x: r.left - b.left - 4, y: r.top - b.top - 4, w: r.width + 8, h: r.height + 8 });
      }
    }
    const center = sc.p([0, 0, 0]), placed = [];
    const meets = (a, c) => a.x < c.x + c.w + 3 && c.x < a.x + a.w + 3 && a.y < c.y + c.h + 3 && c.y < a.y + a.h + 3;
    const narrow = sc.W < 520;
    for (const l of labels.sort((a, c) => c.pri - a.pri)) {
      if (narrow && l.pri < 7) continue;
      const cls = `raw backed ${l.cls}`, key = `${cls}|${l.html}|${narrow}`;
      let size = sizes.get(key);
      if (!size) {
        measure.className = `tag ${cls}`; measure.innerHTML = l.html; measure.hidden = false; measure.style.visibility = 'hidden';
        size = [measure.offsetWidth, measure.offsetHeight]; measure.hidden = true; sizes.set(key, size);
      }
      const [w, h] = size, q = sc.p(l.p), cands = [];
      if (q[0] < -20 || q[0] > sc.W + 20 || q[1] < -20 || q[1] > sc.H + 20) continue;
      const dx = q[0] - center[0], dy = q[1] - center[1], len = Math.hypot(dx, dy) || 1;
      const pref = (l.near ? [16, 26] : [22, 40, 60]).map((r) => [q[0] + dx / len * (w / 2 + r), q[1] + dy / len * (h / 2 + r)]);
      pref.push([q[0] + w / 2 + 14, q[1] - h / 2 - 6], [q[0] - w / 2 - 14, q[1] - h / 2 - 6], [q[0], q[1] - h - 10], [q[0], q[1] + h + 10]);
      cands.push(...pref);
      for (const radius of [26, 46, 70, 100, 136]) for (let a = 0; a < 16; a++) cands.push([q[0] + radius * Math.cos(TAU * a / 16), q[1] + radius * Math.sin(TAU * a / 16)]);
      let best = null, score = Infinity;
      for (const [ci, [x, y]] of cands.entries()) {
        const r = { x: x - w / 2, y: y - h / 2, w, h };
        if (r.x < 8 || r.y < 8 || r.x + w > sc.W - 8 || r.y + h > sc.H - 8) continue;
        if (boxes.some((c) => meets(r, c)) || placed.some((p) => meets(r, p.box))) continue;
        const d = (x - q[0]) ** 2 + (y - q[1]) ** 2 - (ci < pref.length ? 9000 : 0);
        if (d < score) { best = r; score = d; }
      }
      if (!best) continue;
      placed.push({ box: best, q });
      sc.tag(l.key, [best.x + w / 2, best.y + h / 2], l.html, cls, { screen: true });
    }
    ctx.strokeStyle = TRV.palette.dim; ctx.globalAlpha = 0.5; ctx.lineWidth = 0.8;
    for (const { box, q } of placed) {
      const x = box.x + box.w / 2, y = box.y + box.h / 2, dx = q[0] - x, dy = q[1] - y;
      if (Math.hypot(dx, dy) < box.w / 2 + 10 && Math.abs(dy) < box.h / 2 + 10) continue;
      const k = Math.min((box.w / 2 + 2) / Math.max(1e-3, Math.abs(dx)), (box.h / 2 + 2) / Math.max(1e-3, Math.abs(dy)));
      ctx.beginPath(); ctx.moveTo(x + dx * k, y + dy * k); ctx.lineTo(q[0], q[1]); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- text: HUD, legend, readouts ---------- */
  function drawText() {
    const lens = S.dualityLens, z = S.octaveZoom, pz = Q.poisson;
    let big, sub, legend;
    if (lens === 'octave-hodge') {
      big = `${L('八度螺旋', 'Octave helix')} · ${GRADE_HTML(z)}`;
      sub = `z = ${fix(z, 2)} · 1 3 3 1 · ${L('方向', 'directions')} ${dofAt(z)} · det G = ${fix(Q.volume, 6)}`;
      legend = [['ik', L('点 Λ⁰', 'point Λ⁰')], ['cy', L('线 Λ¹ ×3', 'lines Λ¹ ×3')], ['mg box', L('面 Λ² ×3', 'planes Λ² ×3')], ['vi box', L('体 Λ³ · 螺旋', 'volume Λ³ · helix')], ['ring', L('当前 z', 'now: z')]];
    } else if (lens === 'green-yukawa') {
      big = `${L('格林—汤川', 'Green–Yukawa')} · G(x, x₀)`;
      sub = `m = ${fix(S.massScale, 2)} · ${L('残差', 'residual')} ${expo(Q.bare.res)} · ${L('互易差', 'reciprocity gap')} ${expo(Q.recip)}`;
      legend = [['ring drag', L('核心 x₀', 'core x₀')], ['cy', L('场丝 G(x, x₀)', 'filaments G(x, x₀)')], ['vi box', L('等值壳', 'iso-shell')], ['mg', L('探针 xₚ', 'probe xₚ')]];
    } else {
      big = `${L('傅里叶缀饰', 'Fourier dressing')} · a = ${fix(Q.a, 2)}`;
      sub = `E(a) = ${fix(Q.self, 5)} · ${L('泊松两边', 'Poisson sides')} ${fix(pz.left, 4)} = ${fix(pz.right, 4)}`;
      legend = [['vi box', L('缀饰云 a', 'dressing a')], ['ik', L('玻璃壳：下限 1/2', 'glass: floor 1/2')], ['mg', L('位置梳 H', 'position comb H')], ['cy', L('动量梳 H⊥', 'momentum comb H⊥')]];
      if (unfloored(S.probeScale) < A_FLOOR - 1e-9) legend.splice(2, 0, ['dash', L('探针要的 a', 'a the probe asks for')]);
    }
    $('hudBig').innerHTML = big; $('hudSub').textContent = sub;
    $('legend').innerHTML = legend.map(([sw, t]) => `<span><i class="sw ${sw}"></i>${t}</span>`).join('');
    $('pillZ').textContent = fix(z, 2); $('pillL').textContent = String(S.level);
    $('roGrade').innerHTML = GRADE_HTML(z);
    $('roPascal').textContent = ` · 1 3 3 1 · ${L('方向自由度', 'directions')} ${dofAt(z)}`;
    const im = Math.abs(Q.chi[1]) < 5e-4 ? 0 : Q.chi[1];
    $('roDeck').textContent = `χ = ${fix(Q.chi[0], 3)} ${im < 0 ? '−' : '+'} ${fix(Math.abs(im), 3)}i · ℓ = ${S.level}`;
    $('roVolume').textContent = `${fix(Q.volume, 6)} · ${expo(Q.so3)} · Im B₃ = ${fix(Q.bargmann.bloch[1], 4)}`;
    $('roResidual').textContent = `${expo(Q.bare.res)} · ${L('互易差', 'reciprocity')} ${expo(Q.recip)}`;
    $('roCore').textContent = fix(Q.neighbour, 4);
    $('roSelf').textContent = `${fix(Q.self, 5)} · a = ${fix(Q.a, 2)}`;
    $('roPoisson').textContent = `${expo(pz.err)} · |H| = ${pz.H.length}, |H⊥| = ${pz.Hp.length}`;
  }

  /* ---------- the strip: one question per lens ---------- */
  function drawPlot() {
    const P = TRV.palette, lens = S.dualityLens;
    if (lens === 'octave-hodge') {
      plotG = kit.plot($('plot'), { x: [-1.4, 3.4], y: [-1.25, 3.5], pad: [30, 12, 8, 22] });
      const g = plotG, COL = [P.violet, P.sigma, P.cyan, P.magenta, P.violet];
      g.axes({ xTicks: [-1, 0, 1, 2, 3], yTicks: [-1, 0, 1, 3] });
      for (let k = -1; k <= 3; k++) g.rect(k - 0.16, 0, k + 0.16, dofAt(k), COL[k + 1], { alpha: 0.75 });
      const zs = range(-1, 3, 160);
      g.line(zs.map((z) => [z, Math.cos(TAU * helixS(z))]), P.cyan, { width: 1.6, dash: [4, 3] });
      g.vline(S.octaveZoom, P.amber); g.dot(S.octaveZoom, Math.cos(TAU * helixS(S.octaveZoom)), P.amber, 3.5);
      $('plotTitle').textContent = L('一整圈：1 3 3 1，读出回到原值', 'One turn: 1 3 3 1, and the readout comes back');
      $('plotMeta').textContent = L('方向数 · Re χ(s)', 'directions · Re χ(s)');
    } else if (lens === 'green-yukawa') {
      plotG = kit.plot($('plot'), { x: [-0.2, 4.4], y: [5e-4, 1.6], logY: true, pad: [36, 12, 8, 22] });
      const g = plotG, f = Q.bare, me = Math.sqrt(f.m2);
      g.axes({ xTicks: [0, 1, 2, 3, 4], yTicks: [[1e-3, '10⁻³'], [1e-2, '10⁻²'], [1e-1, '10⁻¹'], [1, '1']] });
      const lat = [0, 1, 2, 3, 4].map((r) => [r, f.G[idx(wrap(S.core[0] + r), S.core[1], S.core[2])] / f.core]);
      const ref = lat[1][1] * Math.exp(me);
      g.line(range(0.6, 4.3, 80).map((r) => [r, ref * Math.exp(-me * r) / r]), P.dim, { width: 1.4, dash: [4, 3] });
      g.line(lat, P.cyan, { width: 1.4, alpha: 0.6 });
      lat.forEach(([r, v]) => g.dot(r, Math.max(v, 6e-4), P.cyan, 3.5));
      g.vline(Q.rp, P.amber); g.dot(Q.rp, Math.max(lat[Q.rp][1], 6e-4), P.amber, 4.5);
      $('plotTitle').textContent = L('离核越远，场按汤川衰减', 'Away from the core the field falls off like Yukawa');
      $('plotMeta').textContent = 'G(r)/G(0) · e⁻ᵐʳ/r';
    } else {
      plotG = kit.plot($('plot'), { x: [0, 1], y: [1e-4, 1], logY: true, pad: [36, 12, 8, 22] });
      const g = plotG, ps = range(0, 0.985, 120);
      g.axes({ xTicks: [0, 0.2, 0.4, 0.6, 0.8, 1], yTicks: [[1e-4, '10⁻⁴'], [1e-3, '10⁻³'], [1e-2, '10⁻²'], [1e-1, '10⁻¹'], [1, '1']] });
      g.line(ps.map((p) => [p, 1 / (8 * Math.pow(PI, 1.5) * unfloored(p))]), P.dim, { width: 1.4, dash: [4, 3] });
      g.line(selfCurve(S.massScale, ps), P.cyan, { width: 2 });
      g.vline(1 - A_FLOOR / A_MAX, P.violet, { dash: [3, 3] });
      g.vline(S.probeScale, P.amber); g.dot(S.probeScale, Q.self, P.amber, 4);
      $('plotTitle').textContent = L('探针再细，缀饰自能也停在下限上', 'However fine the probe, the dressed self-energy stops at the floor');
      $('plotMeta').textContent = L('E(a) · 连续点 1/(8π^1.5 a)', 'E(a) · continuum point 1/(8π^1.5 a)');
    }
  }

  /* ---------- the read-only probe ---------- */
  const snapshot = () => {
    const q = Q || compute();
    return JSON.parse(JSON.stringify({
      octaveZoom: S.octaveZoom, dualityLens: S.dualityLens, massScale: S.massScale, probeScale: S.probeScale, corePos: S.core.slice(),
      level: S.level, preset: cards.current, t: clock.t, playing: clock.playing,
      pascalDims: PASCAL.slice(), directionalDof: dofAt(S.octaveZoom), grade: gradeOf(S.octaveZoom),
      so3VolumeInvarianceErr: q.so3, volumeGramDet: q.volume, tripleBargmann: q.bargmann.direct, tripleBargmannErr: q.bargmann.err,
      octaveHelixSameDeck: q.deck.sameDeck, octaveHelixLevelShift: q.deck.levelShift, octaveReadout: q.chi,
      idempotentProjectorErr: q.proj, pinchingErr: PINCH_ERR,
      greenOperatorResidualMax: q.bare.res, greenImagMax: q.bare.maxIm, greenSites: M, massEffSquared: q.bare.m2,
      reciprocityErr: q.recip, probeSite: q.probe, probeDistance: q.rp, greenProbe: q.gp0,
      yukawaCoreRatio: q.neighbour, delonePackingRadius: DELONE.packing, deloneMaxGap: DELONE.maxGap,
      dressingRadius: q.a, dressedSelfEnergy: q.self,
      poissonPointFieldMaxErr: q.poisson.err, poissonSubgroup: q.poisson.H, poissonAnnihilator: q.poisson.Hp,
      poissonSides: [q.poisson.left, q.poisson.right], camera: sc.cam
    }));
  };
  window.OCTAVE_FIELD_DEBUG = Object.freeze({
    get state() { return snapshot(); },
    setZoom, setMass, setProbe, setCore, setLens: (v) => { cards.mark(null); setLens(v); },
    field: (x0, m, a) => { const f = field(x0, m, a || 0); return { G: Array.from(f.G), core: f.core, res: f.res }; },
    screen: (p) => { const b = $('stage').getBoundingClientRect(), q = sc.p(p); return [b.left + q[0], b.top + q[1]]; },
    coreScreen: () => { const b = $('stage').getBoundingClientRect(), q = sc.p(siteWorld(S.core)); return [b.left + q[0], b.top + q[1]]; }
  });
  window.TRV_THUMB = () => { cards.pick('green-yukawa-reciprocity'); sc.view([-0.55, 0.40, 1], 0); paint.now(); };
  cards.pick(cards.initial('octave-helix-zoom')); booting = false; paint();
})();
