/* ARC//MACRO · 量子极小圆弧微分元与路径积分缝合宏观物理
   单位球面上，(ψ, λ) 是以 x–z 大圆为“赤道”的经纬坐标：sph(ψ, λ) = (cos λ sin ψ, sin λ, cos λ cos ψ)。
   测地脊线从 A = sph(−Θ/2, 0) 走到 B = sph(Θ/2, 0)，越过北极附近的球顶。
     arc        一段微弧的切线 sin ε 与矢高 1 − cos ε；N 段费曼—伊东锯齿链（ε = Θ/√N）或牛顿光滑链（ε = Θ/N）
     hallmarks  N = 1 的单段极小弧：先横后竖与先竖后横不闭合（角超 Ω），矢高下限，赤道上的紫色旋量带转 720°
     bundle     41 条拱形路径 λₘ(s) = ηₘ·4s(1 − s) 的相量和：相位 Φ = k[ΔL − 2βΩ/Θ]，Ω 由 Bargmann 连乘给出
     zoom       三层同心壳：r = 1 的微弧链、r = 1.3 的相位筛、r = 1.6 的宏观轨道、铰链包络与熵税
   所有读数都由本文件算出；舞台只负责把它们画出来。浏览器测试只读探针：window.ARC_MACRO_DEBUG。 */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, $ = id => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, PHI = (1 + Math.sqrt(5)) / 2;
  const STEPS = [1, 4, 16, 64, 256], PATHS = 41, MID = 20, SAMPLES = 48;
  const R_SIEVE = 1.3, R_MACRO = 1.6;
  const SCENE_OF = { 'arc-sagitta-ito': 'arc', 'quantum-three-hallmarks': 'hallmarks', 'curve-stitches-straight': 'bundle', 'force-from-phase-gradient': 'bundle', 'calculus-duality-zoom': 'zoom' };
  const PLOT_OF = { 'arc-sagitta-ito': 'sagitta', 'quantum-three-hallmarks': 'hallmarks', 'curve-stitches-straight': 'stitch', 'force-from-phase-gradient': 'force', 'calculus-duality-zoom': 'channels' };
  const PRESETS = {
    'arc-sagitta-ito': { stepCount: 64, scalingMode: 'feynman-ito', arcScale: 1.00, phaseGradient: 0.00, still: 0.5, play: true },
    'quantum-three-hallmarks': { stepCount: 1, scalingMode: 'feynman-ito', arcScale: 0.85, phaseGradient: 0.00, still: 0.5, play: true },
    'curve-stitches-straight': { stepCount: 16, scalingMode: 'feynman-ito', arcScale: 1.00, phaseGradient: 0.00, still: 1, play: true },
    'force-from-phase-gradient': { stepCount: 16, scalingMode: 'feynman-ito', arcScale: 1.00, phaseGradient: 0.55, still: 1, play: true },
    'calculus-duality-zoom': { stepCount: 64, scalingMode: 'feynman-ito', arcScale: 1.00, phaseGradient: 0.25, still: 1, play: false }
  };
  /** Camera [yaw, pitch] of each scene: arc and zoom look along the dome (radial = up), the bundle looks down on it. */
  const VIEW = { arc: [-0.2, 0.5], hallmarks: [-0.32, 0.62], bundle: [-0.18, 0.95], zoom: [-0.24, 0.3] };
  const NOTES = {
    'arc-sagitta-ito': ['青色切线 sin ε，品红矢高 1 − cos ε ≈ ε²/2；64 段 ε = Θ/√N 的矢高加起来仍有 0.499 ≈ Θ²/2。', 'Cyan tangent sin ε, magenta sagitta 1 − cos ε ≈ ε²/2; 64 steps of ε = Θ/√N still add up to 0.499 ≈ Θ²/2.'],
    'quantum-three-hallmarks': ['单步 ε = 0.85：先横后竖与先竖后横不闭合，留下品红角超 Ω；紫色旋量带转到 360° 读数为 −1，720° 才回到 +1。', 'One step ε = 0.85: across-then-up and up-then-across do not meet, leaving the magenta excess Ω; the violet spinor band reads −1 at 360° and +1 only at 720°.'],
    'curve-stitches-straight': ['41 条弧链按相位相加：两侧品红链卷成螺线相消，±Ω 左右成对抵消，只剩青色直线 δS = 0。', 'The 41 arc chains add as phasors: magenta side chains coil up and cancel, ±Ω pairs cancel left against right, leaving the cyan line δS = 0.'],
    'force-from-phase-gradient': ['相位梯度 β = 0.55 把驻相点推到 η* = 0.15：青色轨道弯向一侧，品红通量 ∬F 与回路 ∮A 相等。', 'The phase gradient β = 0.55 moves the stationary point to η* = 0.15: the cyan orbit bends to one side, and the magenta flux ∬F equals the loop ∮A.'],
    'calculus-duality-zoom': ['下层品红微弧 N = 64，中层相位筛只放过中央，上层青色光滑轨道、紫色铰链包络与品红熵税 ΔS > 0。', 'Bottom: magenta micro-arcs, N = 64; middle: the phase sieve passes only the centre; top: the cyan smooth orbit, violet hinge envelope and magenta entropy tax ΔS > 0.']
  };
  const TITLES = {
    arc: ['极小圆弧 · 切线 sin ε 对矢高 1 − cos ε', 'Minimal arc · tangent sin ε vs sagitta 1 − cos ε'],
    hallmarks: ['单段极小弧 · 三个量子印记', 'One minimal arc · three quantum hallmarks'],
    bundle: ['41 条弧链 · 以曲拼直', '41 arc chains · curves stitch a line'],
    force: ['相位梯度 · 直线弯成受力轨道', 'Phase gradient · the line bends into a force'],
    zoom: ['微积分对偶 · δ ↔ ∫', 'Calculus duality · δ ↔ ∫']
  };
  const S = { scene: 'arc', plot: 'sagitta', stepCount: 64, scalingMode: 'feynman-ito', arcScale: 1, phaseGradient: 0 };

  /* ---------- the sphere in (ψ, λ) coordinates ---------- */
  const sph = (psi, lam) => [Math.cos(lam) * Math.sin(psi), Math.sin(lam), Math.cos(lam) * Math.cos(psi)];
  /** Great-circle angle between unit vectors (atan2: accurate for tiny steps). */
  const angle = (a, b) => Math.atan2(v3.len(v3.cross(a, b)), v3.dot(a, b));
  const stepEpsOf = (mode, th, n) => (mode === 'feynman-ito' ? th / Math.sqrt(n) : th / n);
  const halfWidth = th => 0.4 * th, waveK = th => 30 / th;
  const lamOf = (eta, s) => eta * 4 * s * (1 - s);
  const pathAt = (th, eta, s) => sph(-th / 2 + th * s, lamOf(eta, s));
  const pathSamples = (th, eta, n = SAMPLES) => Array.from({ length: n + 1 }, (_, i) => pathAt(th, eta, i / n));
  function pathLength(pts) { let s = 0; for (let i = 1; i < pts.length; i++) s += angle(pts[i - 1], pts[i]); return s; }
  /** Unit tangent at p of the great circle towards q. */
  const toward = (p, q) => v3.unit(v3.sub(q, v3.scale(p, v3.dot(p, q))));
  /** Signed turning angle at p between the arc arriving from a and the arc leaving to b (left turn > 0, seen from outside). */
  function turnAt(a, p, b) { const tin = v3.scale(toward(p, a), -1), tout = toward(p, b); return Math.atan2(v3.dot(p, v3.cross(tin, tout)), v3.dot(tin, tout)); }

  /* ---------- spinors and the Bargmann cycle ---------- */
  /** The qubit spinor of a Bloch direction n (away from the south pole): (1 + z, x + iy)/√(2(1 + z)); y → −y conjugates it. */
  const spinor = n => { const k = 1 / Math.sqrt(2 * (1 + n[2])); return [[(1 + n[2]) * k, 0], [n[0] * k, n[1] * k]]; };
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  /** ⟨p | q⟩ = Σ conj(pᵢ) qᵢ. */
  const braket = (p, q) => [p[0][0] * q[0][0] + p[0][1] * q[0][1] + p[1][0] * q[1][0] + p[1][1] * q[1][1], p[0][0] * q[0][1] - p[0][1] * q[0][0] + p[1][0] * q[1][1] - p[1][1] * q[1][0]];
  /** Bargmann cycle ⟨ψ₀|ψ₁⟩⟨ψ₁|ψ₂⟩…⟨ψₙ|ψ₀⟩ of the states at the given points (bargmann_path_product's factorization). */
  function bargmann(points) {
    const psi = points.map(spinor);
    let z = [1, 0];
    for (let j = 0; j + 1 < psi.length; j++) z = cmul(z, braket(psi[j], psi[j + 1]));
    return cmul(z, braket(psi[psi.length - 1], psi[0]));
  }
  /** Signed solid angle of the geodesic triangle (a, b, c), counterclockwise seen from outside > 0 (Van Oosterom–Strackee). */
  const triAngle = (a, b, c) => 2 * Math.atan2(v3.dot(a, v3.cross(b, c)), 1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a));
  /** The patch bounded by a sampled path and the closing geodesic B → A, by three routes that do not call each other. */
  function stokesPatch(pts) {
    const n = pts.length;
    let turn = 0;
    for (let k = 0; k < n; k++) turn += turnAt(pts[(k - 1 + n) % n], pts[k], pts[(k + 1) % n]);
    const loop = turn > 0 ? TAU - turn : -(TAU + turn);                         // ∮A: Gauss–Bonnet holonomy of the loop
    const c = v3.unit(pts.reduce((s, p) => v3.add(s, p), [0, 0, 0]));
    let flux = 0;
    for (let k = 0; k < n; k++) flux += triAngle(c, pts[k], pts[(k + 1) % n]);   // ∬F: fan of solid angles
    const z = bargmann(pts), viaBargmann = 2 * Math.atan2(z[1], z[0]);
    return { loop, flux, bargmann: viaBargmann, residual: Math.max(Math.abs(loop - flux), Math.abs(viaBargmann - flux)) };
  }

  /* ---------- the path bundle ---------- */
  function pathInfo(th, eta) {
    const pts = pathSamples(th, eta), len = pathLength(pts), z = bargmann(pts), gamma = Math.atan2(z[1], z[0]);
    return { pts, len, gamma, area: -2 * gamma };
  }
  /** Φ(η) = k[L(η) − L(0) − 2βΩ(η)/Θ] with Ω = −2 arg Π. */
  const phaseOf = (th, beta, eta, base) => { const P = pathInfo(th, eta); return waveK(th) * (P.len - base + 4 * beta * P.gamma / th); };
  /** The stationary point of Φ by Newton steps from η = 0; at β = 0, Φ(h) = Φ(−h) exactly, so η* stays 0. */
  function stationaryEta(th, beta, base) {
    const W = halfWidth(th), h = 1e-4 * th, f = e => phaseOf(th, beta, e, base);
    let eta = 0;
    for (let it = 0; it < 16; it++) {
      const fp = f(eta + h), fm = f(eta - h), d1 = fp - fm;
      if (d1 === 0) break;
      const d2 = fp - 2 * f(eta) + fm;
      if (!(d2 > 0)) break;
      const step = d1 * h / (2 * d2);
      eta = clamp(eta - step, -W, W);
      if (Math.abs(step) < 1e-13 * th) break;
    }
    return eta;
  }
  /** Signed geodesic curvature of the path η at its midpoint (> 0 bending towards +λ). */
  function midCurvature(th, eta) {
    const hs = 1e-3, p = pathAt(th, eta, 0.5), a = pathAt(th, eta, 0.5 - hs), b = pathAt(th, eta, 0.5 + hs);
    const d1 = v3.scale(v3.sub(b, a), 1 / (2 * hs * th)), d2 = v3.scale(v3.add(v3.sub(b, v3.scale(p, 2)), a), 1 / (hs * hs * th * th));
    return -v3.dot(p, v3.cross(d1, d2)) / v3.len(d1) ** 3 + 0;
  }
  const memo = new Map();
  function cached(key, fn) { if (!memo.has(key)) { if (memo.size > 64) memo.clear(); memo.set(key, fn()); } return memo.get(key); }
  function bundleOf(th, beta) {
    return cached(`bundle|${th}|${beta}`, () => {
      const W = halfWidth(th), k = waveK(th), base = pathLength(pathSamples(th, 0)), paths = [];
      for (let m = 0; m < PATHS; m++) {
        const eta = W * (m - MID) / MID, P = pathInfo(th, eta);
        paths.push({ eta, len: P.len, gamma: P.gamma, area: P.area, phase: k * (P.len - base + 4 * beta * P.gamma / th), pts: P.pts });
      }
      const chain = [[0, 0]];
      for (const p of paths) { const c = chain[chain.length - 1]; chain.push([c[0] + Math.cos(p.phase) / PATHS, c[1] + Math.sin(p.phase) / PATHS]); }
      // ±Ω pairs, added pair by pair: at β = 0 every pair is e^{iΦ}(Ω − Ω) = 0 exactly
      let tr = 0, ti = 0, absArea = 0;
      for (let j = 1; j <= MID; j++) {
        const a = paths[MID + j], b = paths[MID - j];
        tr += Math.cos(a.phase) * a.area + Math.cos(b.phase) * b.area; ti += Math.sin(a.phase) * a.area + Math.sin(b.phase) * b.area;
        absArea += Math.abs(a.area) + Math.abs(b.area);
      }
      const etaStar = stationaryEta(th, beta, base), phaseStar = phaseOf(th, beta, etaStar, base);
      for (const p of paths) p.align = Math.cos(p.phase - phaseStar);
      const sieve = Array.from({ length: 161 }, (_, i) => Math.cos(phaseOf(th, beta, -W + 2 * W * i / 160, base) - phaseStar));
      // the coherent amplitude of a Gaussian window of neighbouring paths around each lateral offset
      const sigma = W / 6, local = [];
      for (let i = 0; i <= 80; i++) {
        const c = -W + 2 * W * i / 80;
        let re = 0, im = 0, wsum = 0;
        for (const p of paths) { const w = Math.exp(-(((p.eta - c) / sigma) ** 2)); re += w * Math.cos(p.phase); im += w * Math.sin(p.phase); wsum += w; }
        local.push([c, Math.hypot(re, im) / wsum]);
      }
      const outer = stokesPatch(paths[PATHS - 1].pts);
      const spinePts = pathSamples(th, etaStar);
      const spinePatch = Math.abs(etaStar) > 1e-9 ? stokesPatch(spinePts) : null;
      const amp = chain[PATHS];
      return {
        W, k, base, paths, chain, amplitude: Math.hypot(amp[0], amp[1]), etaStar, phaseStar, local, sieve,
        transverseResidual: Math.hypot(tr, ti) / absArea,
        symmetric: paths.every((p, m) => p.phase === paths[PATHS - 1 - m].phase && p.area === -paths[PATHS - 1 - m].area),
        spinePts, spineArea: spinePatch ? -spinePatch.flux : 0, curvature: midCurvature(th, etaStar),
        outer, spinePatch, stokesResidual: Math.max(outer.residual, spinePatch ? spinePatch.residual : 0)
      };
    });
  }
  /** η*(β) and the spine flux over β ∈ [−1, 1] (for the force plot). */
  function sweepOf(th) {
    return cached(`sweep|${th}`, () => {
      const base = pathLength(pathSamples(th, 0)), out = [];
      for (let i = 0; i <= 20; i++) {
        const beta = -1 + i / 10, eta = stationaryEta(th, beta, base), patch = Math.abs(eta) > 1e-9 ? stokesPatch(pathSamples(th, eta)) : { loop: 0, flux: 0 };
        out.push({ beta, eta, curvature: midCurvature(th, eta), flux: -patch.flux, loop: -patch.loop });
      }
      return out;
    });
  }

  /* ---------- micro chains, hinges and the pinching tax ---------- */
  /** The chain of n micro-arcs along the path η: Newton vertices on the path; Itô vertices on a triangular sawtooth
      (even vertices on the path, odd ones alternately ±a off it, a = arccos(cos ε / cos(Θ/n)), each step exactly ε). */
  function microChain(th, eta, n, mode) {
    const eps = stepEpsOf(mode, th, n), d = th / n;
    const amp = mode === 'feynman-ito' ? Math.acos(clamp(Math.cos(eps) / Math.cos(d), -1, 1)) : 0;
    const pts = [];
    for (let k = 0; k <= n; k++) { const s = k / n, z = [0, 1, 0, -1][k % 4]; pts.push(sph(-th / 2 + th * s, lamOf(eta, s) + z * amp)); }
    return { pts, amp, eps };
  }
  const hingeTurns = pts => { const out = []; for (let k = 1; k + 1 < pts.length; k++) out.push(turnAt(pts[k - 1], pts[k], pts[k + 1])); return out; };
  const h2 = p => (p > 0 ? -p * Math.log(p) : 0) + (p < 1 ? -(1 - p) * Math.log(1 - p) : 0);
  /** Turn by ε about y, pinch in the z basis, n times, from |0⟩. Each step: S(ρₖ₊₁) − S(ρₖ) against D(σ‖Pσ) (σ by its eigenvalues). */
  function pinching(eps, n) {
    let z = 1, sum = 0, worst = 0;
    const cum = [0];
    for (let k = 0; k < n; k++) {
      const bx = z * Math.sin(eps), bz = z * Math.cos(eps), a = (1 + bz) / 2, d = (1 - bz) / 2, o = bx / 2;
      const tr = a + d, det = a * d - o * o, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det)), l1 = tr / 2 + disc, l2 = tr / 2 - disc;
      const sSigma = (l1 > 0 ? -l1 * Math.log(l1) : 0) + (l2 > 0 ? -l2 * Math.log(l2) : 0);
      const rel = -sSigma - ((a > 0 ? a * Math.log(a) : 0) + (d > 0 ? d * Math.log(d) : 0));
      const step = h2((1 + bz) / 2) - h2((1 + z) / 2);
      worst = Math.max(worst, Math.abs(step - rel));
      sum += rel; z = bz; cum.push(sum);
    }
    const tax = h2((1 + z) / 2);
    return { tax, sum, cum, identity: Math.max(worst, Math.abs(sum - tax)), coherence: z };
  }
  const N_GRID = [1, 2, 3, 4, 6, 8, 11, 16, 23, 32, 45, 64, 91, 128, 181, 256];
  /** The four macroscopic channels against N for the current mode, Θ and β. */
  function channelsOf(mode, th, beta) {
    return cached(`channels|${mode}|${th}|${beta}`, () => {
      const B = bundleOf(th, beta), eta = B.etaStar;
      return N_GRID.map(n => {
        const micro = microChain(th, eta, n, mode), macro = pathSamples(th, eta, n);
        let dev = 0;
        micro.pts.forEach((p, k) => { dev = Math.max(dev, angle(p, pathAt(th, eta, k / n))); });
        for (let k = 0; k < n; k++) dev = Math.max(dev, angle(v3.slerp(micro.pts[k], micro.pts[k + 1], 0.5), pathAt(th, eta, (k + 0.5) / n)));
        // hinge turns are left-positive seen from outside, midCurvature is positive bending towards +λ: flip the sum so
        // that κ_N (the mean hinge curvature) and the spine's κ carry the same sign
        const turns = hingeTurns(macro), total = turns.reduce((s, x) => s + x, 0);
        return { n, deviation: dev, curvature: -total / th, hingeMax: turns.reduce((s, x) => Math.max(s, Math.abs(x)), 0), tax: pinching(micro.eps, n).tax };
      });
    });
  }

  /* ---------- the Lean-cited checks ---------- */
  /** ‖·‖ of a 2×2 real matrix (largest singular value). */
  function op2(M) { const T = M[0][0] ** 2 + M[0][1] ** 2 + M[1][0] ** 2 + M[1][1] ** 2, D = M[0][0] * M[1][1] - M[0][1] * M[1][0]; return Math.sqrt((T + Math.sqrt(Math.max(0, T * T - 4 * D * D))) / 2); }
  /** exp_tail_le for z = εJ: ‖exp z − Σ_{k<n} zᵏ/k!‖ against rⁿ/n!·eʳ, r = ‖z‖ = ε. */
  function taylorTails(eps) {
    const r = op2([[0, -eps], [eps, 0]]), E = [[Math.cos(eps), -Math.sin(eps)], [Math.sin(eps), Math.cos(eps)]], out = [];
    let T = [[0, 0], [0, 0]], P = [[1, 0], [0, 1]], fact = 1;
    for (let n = 0; n <= 6; n++) {
      if (n > 0) { T = T.map((row, i) => row.map((x, j) => x + P[i][j] / fact)); P = [[-eps * P[1][0], -eps * P[1][1]], [eps * P[0][0], eps * P[0][1]]]; fact *= n; }
      const tail = op2(E.map((row, i) => row.map((x, j) => x - T[i][j])));
      out.push({ n, tail, bound: r ** n / fact * Math.exp(r) });
    }
    return { r, tails: out, holds: out.every(t => t.tail <= t.bound), secondDiagonal: E[0][0] - T[0][0] };
  }
  const mat3 = (A, B) => A.map((row, i) => B[0].map((_, j) => row[0] * B[0][j] + row[1] * B[1][j] + row[2] * B[2][j]));
  /** exp(θK_n) for a unit axis n (Rodrigues: the closed form of the exponential of a rotation generator). */
  function expAxis(n, th) {
    const c = Math.cos(th), s = Math.sin(th), C = 1 - c, [x, y, z] = n;
    return [[c + x * x * C, x * y * C - z * s, x * z * C + y * s], [y * x * C + z * s, c + y * y * C, y * z * C - x * s], [z * x * C - y * s, z * y * C + x * s, c + z * z * C]];
  }
  function trotterError(th, n) {
    const P = mat3(expAxis([1, 0, 0], th / n), expAxis([0, 1, 0], th / n)), E = expAxis([Math.SQRT1_2, Math.SQRT1_2, 0], th * Math.SQRT2);
    let M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    for (let k = 0; k < n; k++) M = mat3(M, P);
    let f = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) f += (M[i][j] - E[i][j]) ** 2;
    return Math.sqrt(f);
  }
  const trotterOf = th => cached(`trotter|${th}`, () => Array.from({ length: 9 }, (_, j) => ({ n: 2 ** j, err: trotterError(th, 2 ** j) })));
  /** robertson_schrodinger on the qubit ψ = (cos(ε/2), e^{iπ/4} sin(ε/2)) with A = σx, B = σy: the four clauses. */
  function robertson(eps) {
    const c = Math.cos(eps / 2), s = Math.sin(eps / 2), psi = [[c, 0], [s * Math.SQRT1_2, s * Math.SQRT1_2]];
    const ap = v => [v[1], v[0]], bp = v => [cmul([0, -1], v[1]), cmul([0, 1], v[0])];
    const inner = (u, v) => [u[0][0] * v[0][0] + u[0][1] * v[0][1] + u[1][0] * v[1][0] + u[1][1] * v[1][1], u[0][0] * v[0][1] - u[0][1] * v[0][0] + u[1][0] * v[1][1] - u[1][1] * v[1][0]];
    const sub = (u, v) => u.map((x, i) => [x[0] - v[i][0], x[1] - v[i][1]]), scl = (z, v) => v.map(x => cmul(z, x));
    const Ap = ap(psi), Bp = bp(psi), eA = inner(psi, Ap), eB = inner(psi, Bp);
    const u = sub(Ap, scl(eA, psi)), v = sub(Bp, scl(eB, psi)), ABp = ap(Bp), BAp = bp(Ap);
    const sym = inner(psi, ABp.map((x, i) => [x[0] + BAp[i][0], x[1] + BAp[i][1]])), com = inner(psi, sub(ABp, BAp));
    const cov = 0.5 * sym[0] - eA[0] * eB[0], half = [com[1] / 2, -com[0] / 2];    // z / (2i)
    const nu = inner(u, u)[0], nv = inner(v, v)[0], uv = inner(u, v), G = nu * nv - (uv[0] ** 2 + uv[1] ** 2);
    const product = nu * nv, split = cov ** 2 + half[0] ** 2 + half[1] ** 2 + G;
    return { product, cov, half, G, uv, diff: Math.max(Math.abs(product - split), Math.abs(uv[0] - cov), Math.abs(uv[1] - half[0]), Math.abs(half[1])), gramNonnegative: G >= -1e-15, floor: Math.hypot(half[0], half[1]) };
  }
  /** circle_double_cover_history_lift: the square root of e^{iα} followed by continuity (the principal root jumps at π). */
  function liftAt(alpha, steps = 1440) {
    let w = [1, 0];
    const n = Math.max(1, Math.ceil(steps * Math.abs(alpha) / (2 * TAU)));
    for (let k = 1; k <= n; k++) {
      const a = alpha * k / n, z = [Math.cos(a), Math.sin(a)], half = Math.atan2(z[1], z[0]) / 2, r = [Math.cos(half), Math.sin(half)];
      w = (w[0] - r[0]) ** 2 + (w[1] - r[1]) ** 2 <= (w[0] + r[0]) ** 2 + (w[1] + r[1]) ** 2 ? r : [-r[0], -r[1]];
    }
    return w;
  }
  const SPINOR = { at360: liftAt(TAU), at720: liftAt(2 * TAU) };
  /** exists_golden_modelSet_delone: the points a + bφ with a + b(1 − φ) in the window [φ − 2, φ − 1], |x| ≤ 30. */
  const DELONE = (() => {
    const pts = [];
    for (let b = -60; b <= 60; b++) {
      for (let a = Math.ceil(PHI - 2 - b * (1 - PHI)) - 1; a <= Math.floor(PHI - 1 - b * (1 - PHI)) + 1; a++) {
        const star = a + b * (1 - PHI), x = a + b * PHI;
        if (star >= PHI - 2 && star <= PHI - 1 && Math.abs(x) <= 30) pts.push({ a, b, x });
      }
    }
    pts.sort((p, q) => p.x - q.x);
    const gaps = pts.slice(1).map((p, i) => (p.a - pts[i].a) + (p.b - pts[i].b) * PHI);
    return { count: pts.length, packing: Math.min(...gaps) / 2, halfGapMax: Math.max(...gaps) / 2 };
  })();
  /** tetra_defects_incidence_repair_and_exactness on V = {A, B, left apex, right apex}: edge phases quantized in
      units of π/8 (integers), the exact cochain δe and the same cochain with one hinge defect on (A, B, left apex). */
  function tetraCheck(th) {
    return cached(`tetra|${th}`, () => {
      const W = halfWidth(th), P = [sph(-th / 2, 0), sph(th / 2, 0), sph(0, W), sph(0, -W)].map(spinor), V = [0, 1, 2, 3];
      const edge = V.map(i => V.map(j => { const z = braket(P[i], P[j]); return Math.round(8 * Math.atan2(z[1], z[0]) / PI); }));
      const exact = (i, j, k) => edge[j][k] - edge[i][k] + edge[i][j];
      const hinge = (i, j, k) => exact(i, j, k) + (i === 0 && j === 1 && k === 2 ? 1 : 0);
      const faceErrors = (F, r) => { let c = 0; for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== F(r, j, k) - F(r, i, k) + F(r, i, j)) c++; return c; };
      const tetraDefects = F => { let c = 0; for (const r of V) for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) !== 0) c++; return c; };
      const edgeErrors = (F, e) => { let c = 0; for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== e[j][k] - e[i][k] + e[i][j]) c++; return c; };
      const anchored = (F, r) => V.map(j => V.map(k => F(r, j, k)));
      const report = F => {
        const faces = V.map(r => faceErrors(F, r)), defects = tetraDefects(F);
        const repairs = [edge, ...V.map(r => anchored(F, r))].map(e => edgeErrors(F, e));
        return { faces, defects, incidence: faces.reduce((s, x) => s + x, 0) === defects, anchor: faces.some(f => V.length * f <= defects),
          bounded: repairs.every(e => defects <= 4 * V.length * e), cocycle: defects === 0, repaired: repairs.some(e => e === 0) };
      };
      const a = report(exact), b = report(hinge);
      return { exact: a, hinge: b, ok: [a, b].every(x => x.incidence && x.anchor && x.bounded && x.cocycle === x.repaired) && a.cocycle && !b.cocycle };
    });
  }

  /* ---------- the state the page shows ---------- */
  let clock, cards, chipsN, chipsMode, fields, booting = true;
  function model() {
    const th = S.arcScale, n = S.stepCount, beta = S.phaseGradient, mode = S.scalingMode;
    const eps = stepEpsOf(mode, th, n), c = Math.cos(eps), s = Math.sin(eps);
    const u = [1, 0, 0], v = [c, s, 0];
    let wedge = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge += (u[i] * v[j] - u[j] * v[i]) ** 2;
    const lagrange = Math.abs((v3.dot(u, u) * v3.dot(v, v) - v3.dot(u, v) ** 2) - wedge / 2);
    const B = bundleOf(th, beta), taylor = taylorTails(eps), trot = trotterOf(th), rs = robertson(eps), pin = pinching(eps, n);
    const t = clock ? clock.t : 0;
    return {
      th, n, beta, mode, eps, t,
      tangentSin: s, sagittaVersine: 1 - c, girardExcess: 2 * Math.atan(Math.tan(eps / 2) ** 2), cumulativeSagitta: n * (1 - c),
      lagrangeGramResidual: lagrange, pythagoreanResidual: Math.abs(c * c + s * s - 1), versineResidual: Math.abs((1 - c) - 2 * Math.sin(eps / 2) ** 2),
      taylor, trotter: trot, trotterOperatorError: trotterError(th, n), robertson: rs, pinch: pin,
      bundle: B, micro: microChain(th, B.etaStar, n, mode), tetra: tetraCheck(th), alpha: 2 * TAU * t, lift: liftAt(2 * TAU * t)
    };
  }

  /* ---------- the stage ---------- */
  const stageEl = $('stage'), handleEl = $('arcHandle');
  let drag = null, frame = null, bounds = null, labelBoxes = [], handlePoint = null, lastFit = null, blend = null;
  const paint = kit.painter(draw, [stageEl, $('plot')]);
  const options = { canvas: $('cv'), yaw: VIEW.arc[0], pitch: VIEW.arc[1], wheel: false, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  /** A change of card blends the fit over the camera's move instead of jumping. */
  function startBlend(ms) {
    if (!lastFit || ms <= 0) { blend = null; return; }
    const token = { from: Object.assign({}, lastFit), e: 0 };
    blend = token;
    kit.tween(ms, e => { if (blend === token) { token.e = e; paint(); } }, () => { if (blend === token) blend = null; paint(); });
  }
  /** Points the camera must keep in view, per scene. */
  function fitPoints(G) {
    const th = G.th, W = halfWidth(th), pts = [];
    const patch = (r, lw, margin) => { for (let i = 0; i <= 8; i++) for (const l of [-lw, 0, lw]) pts.push(v3.scale(sph(-th / 2 - margin + (th + 2 * margin) * i / 8, l), r)); };
    if (S.scene === 'arc') { patch(1, Math.max(G.micro.amp, 0.06), 0.16); pts.push(v3.scale(sph(0, 0), 1.06)); for (const s of [-1, 1]) pts.push(sph(s * (th / 2 + 0.34), 0)); }
    else if (S.scene === 'hallmarks') {
      for (let k = 0; k < 24; k++) pts.push(v3.scale([Math.cos(TAU * k / 24), Math.sin(TAU * k / 24), 0], 1.42));
      for (let j = 0; j <= 12; j++) for (let k = 0; k < 12; k++) pts.push(v3.sph(PI * j / 12, TAU * k / 12));   // the whole solid sphere
    } else if (S.scene === 'bundle') patch(1, W * 1.12, 0.12);
    else { for (const r of [1, R_SIEVE, R_MACRO]) patch(r, W, 0.06); patch(1, W * 0.55 + 0.22, 0.22); pts.push(v3.scale(sph(0, 0), R_MACRO + 0.18)); }   // + the lit dome under the micro-arcs
    return pts;
  }
  /** The box of a visible element in stage pixels, or null. */
  function boxOf(el) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(), sr = stageEl.getBoundingClientRect();
    return r.width < 1 || r.height < 1 ? null : { x: r.left - sr.left - stageEl.clientLeft, y: r.top - sr.top - stageEl.clientTop, w: r.width, h: r.height };
  }
  /** The geometry fills the band between the title block and the legend; the plot has its own strip under the stage. */
  function fit(G) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight;
    const hud = TRV.thumbMode ? null : boxOf($('hudTl')), leg = TRV.thumbMode ? null : boxOf($('legend'));
    const top = hud ? hud.y + hud.h + 8 : 14;
    const bottom = leg && leg.y > H / 2 ? leg.y - 8 : H - 14;
    if (!drag) {
      const y = sc.cam.yaw, p = sc.cam.pitch, right = [Math.cos(y), -Math.sin(y), 0], up = [Math.sin(y) * Math.sin(p), Math.cos(y) * Math.sin(p), Math.cos(p)];
      const pts = fitPoints(G), xs = pts.map(q => v3.dot(q, right)), ys = pts.map(q => v3.dot(q, up));
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const pad = TRV.thumbMode ? 26 : W < 500 ? 18 : 30, h = Math.max(60, bottom - top - 16);
      const unit = Math.min((W - 2 * pad) / Math.max(1e-3, x1 - x0), h / Math.max(1e-3, y1 - y0));
      const target = { radius: unit / Math.min(W, H) / sc.cam.zoom, cx: (W / 2 - unit * (x0 + x1) / 2) / W, cy: ((top + bottom) / 2 + unit * (y0 + y1) / 2) / H };
      const f = blend ? { radius: blend.from.radius + (target.radius - blend.from.radius) * blend.e, cx: blend.from.cx + (target.cx - blend.from.cx) * blend.e, cy: blend.from.cy + (target.cy - blend.from.cy) * blend.e } : target;
      Object.assign(options, f); lastFit = Object.assign({}, f);
    }
    bounds = { W, H, top, bottom };
  }

  /* ---------- drawing on the sphere ---------- */
  function sphere(P, solidBack) {
    const facing = sc.facing();
    sc.surface('sphere', (u, v) => v3.sph(u, v), { u: [0, PI], v: [0, TAU], nu: 28, nv: 48, color: P.sigma,
      alpha: (u, v) => (v3.dot(v3.sph(u, v), facing) < -0.06 && solidBack ? 1 : 0.03), grid: { every: [4, 6], color: P.sigma, alpha: 0.14 }, pick: false });
    sc.glass('shell', [0, 0, 0], 1.002, { color: P.sigma, alpha: 0.012, rim: 0.12 });
  }
  /** The dome patch under the paths: an opaque lit piece of the sphere with a sparse grid; margins mu along the arc
      (ψ) and mv across it (λ). */
  function dome(G, P, lw, mu = 0.22, mv = mu) {
    const th = G.th;
    sc.surface('dome', (u, v) => sph(u, v), { u: [-th / 2 - mu, th / 2 + mu], v: [-lw - mv, lw + mv], nu: 44, nv: 28, color: P.dim,
      grid: { every: [4, 4], color: P.sigma, alpha: 0.26 }, pick: false });
  }
  const lift = (p, r) => v3.scale(p, r);
  const arcPts = (a, b, n = 10, r = 1.004) => Array.from({ length: n + 1 }, (_, i) => v3.scale(v3.slerp(a, b, i / n), r));
  function chainPts(pts, r = 1.004, per = 6) { const out = [lift(pts[0], r)]; for (let k = 0; k + 1 < pts.length; k++) out.push(...arcPts(pts[k], pts[k + 1], per, r).slice(1)); return out; }
  /** The walker on a chain: the current micro-arc index and the point at progress t. */
  function walker(pts, t) { const n = pts.length - 1, x = clamp(t, 0, 1) * n, k = Math.min(n - 1, Math.floor(x)); return { k, p: v3.slerp(pts[k], pts[k + 1], x - k) }; }
  /** A stage label: key, text, world point, colour role (cy, mg, am, vi, dm) and priority. */
  const tag = (labels, key, text, p, c, pri) => labels.push({ key, text, p, c, pri });
  /** Tangent sin ε and sagitta 1 − cos ε of the micro-arc from a to b (drawn at r = 1: the arc ends on the sphere). */
  function sagittaMarks(a, b, P, labels) {
    const e = angle(a, b), t = toward(a, b), tip = v3.add(a, v3.scale(t, Math.sin(e))), end = v3.add(v3.scale(a, Math.cos(e)), v3.scale(t, Math.sin(e)));
    sc.line([a, tip], { color: P.cyan, width: 3 });
    sc.line([tip, end], { color: P.magenta, width: 3.2 });
    sc.line(arcPts(a, b, 16, 1.0), { color: P.amber, width: 3.4 });
    sc.bead(tip, { key: 'tangent-tip', color: P.cyan, r: 3.2 });
    tag(labels, 'sin', 'sin ε', v3.lerp(a, tip, 0.5), 'cy', 3);
    tag(labels, 'sag', '1 − cos ε', v3.lerp(tip, end, 0.5), 'mg', 3);
    return { tip, end };
  }
  function drawArc(G, P, labels) {
    const th = G.th, chain = G.micro.pts, w = walker(chain, G.t);
    // wider across the arc than along it: the curvature of the sphere shows in the shading, and the ends of the
    // dome stay above the legend
    dome(G, P, Math.max(G.micro.amp, 0.06) + 0.06, 0.22, 0.52);
    sc.line(arcPts(sph(-th / 2, 0), sph(th / 2, 0), 40, 1.002), { color: P.cyan, width: 1.4, alpha: 0.55, dash: [5, 4] });
    sc.line(chainPts(chain, 1.004, chain.length > 70 ? 2 : 6), { color: P.magenta, width: chain.length > 70 ? 1.3 : 1.8, alpha: 0.9 });
    sagittaMarks(chain[w.k], chain[w.k + 1], P, labels);
    sc.bead(w.p, { key: 'walker', color: P.amber, r: 4.6 });
    for (const [id, p] of [['A', sph(-th / 2, 0)], ['B', sph(th / 2, 0)]]) { sc.bead(p, { key: `end-${id}`, color: P.sigma, r: 3.6 }); tag(labels, `end-${id}`, id, p, 'dm', 1); }
    tag(labels, 'eps', G.mode === 'feynman-ito' ? 'ε = Θ/√N' : 'ε = Θ/N', w.p, 'am', 2);
  }
  function drawHallmarks(G, P, labels) {
    const e = G.eps, A = sph(-e / 2, 0), across = sph(e / 2, 0);
    // across then up: A → B along the spine, then up the meridian at B by ε to C;
    // up then across: A up its meridian by ε to D, then across along the great circle tangent to ψ at D, by ε, to C′
    const C = v3.add(v3.scale(across, Math.cos(e)), v3.scale(toward(across, [0, 1, 0]), Math.sin(e)));
    const D = sph(-e / 2, e), tD = [Math.cos(-e / 2), 0, -Math.sin(-e / 2)], C2 = v3.add(v3.scale(D, Math.cos(e)), v3.scale(tD, Math.sin(e)));
    sc.surface('excess', (u, v) => v3.unit(v3.add(v3.scale(A, 1 - u), v3.scale(v3.slerp(across, C, v), u))), { u: [0, 1], v: [0, 1], nu: 14, nv: 14, color: P.magenta, alpha: 0.42, pick: false });
    sc.line(arcPts(A, across, 24), { color: P.amber, width: 3.4 });
    sc.line(arcPts(across, C, 24), { color: P.cyan, width: 3 });
    sc.line(arcPts(A, D, 24), { color: P.cyan, width: 2.4, dash: [6, 4] });
    sc.line(arcPts(D, C2, 24), { color: P.cyan, width: 2.4, dash: [6, 4] });
    sc.line(arcPts(C, C2, 10, 1.006), { color: P.magenta, width: 3.2 });
    sc.line(arcPts(C, A, 24), { color: P.magenta, width: 1.4, alpha: 0.7 });
    sagittaMarks(A, across, P, labels);
    for (const [id, p] of [['A', A], ['B', across], ['C', C], ['C′', C2]]) { sc.bead(p, { key: `hm-${id}`, color: P.sigma, r: 3.4 }); tag(labels, `hm-${id}`, id, p, 'dm', 1); }
    tag(labels, 'omega', 'Ω', v3.unit(v3.add(v3.add(A, across), C)), 'mg', 3);
    // the spinor band on the equator z = 0: radius grows through two turns, the band twists by α/2
    const alpha = Math.max(1e-3, G.alpha), band = (u, v) => {
      const r = 1.2 + 0.11 * u / TAU, c = [r * Math.cos(u), r * Math.sin(u), 0], out = [Math.cos(u), Math.sin(u), 0];
      const d = v3.add(v3.scale([0, 0, 1], Math.cos(u / 2)), v3.scale(out, Math.sin(u / 2)));
      return v3.add(c, v3.scale(d, v));
    };
    sc.surface('spinor-band', band, { u: [0, alpha], v: [-0.07, 0.07], nu: Math.max(8, Math.ceil(96 * alpha / (2 * TAU))), nv: 2, color: P.violet, back: P.magenta, alpha: 0.9, pick: false });
    sc.line(Array.from({ length: 97 }, (_, i) => v3.scale([Math.cos(TAU * i / 96), Math.sin(TAU * i / 96), 0], 1.2)), { color: P.violet, width: 1, alpha: 0.35, dash: [3, 5] });
    const tipP = band(alpha, 0.07), baseP = band(alpha, -0.07);
    sc.line([baseP, tipP], { color: P.amber, width: 3 });
    sc.bead(tipP, { key: 'spinor-tip', color: P.amber, r: 4.4 });
    tag(labels, 'spinor', `α = ${fix(G.alpha * 180 / PI, 0)}° · ${G.lift[0] >= 0 ? '+1' : '−1'}`, tipP, 'vi', 4);
  }
  function drawBundle(G, P, labels, force) {
    const th = G.th, B = G.bundle, W = B.W, summed = Math.round(G.t * PATHS);
    dome(G, P, W);
    sc.surface('sieve', (u, v) => v3.scale(pathAt(th, u, v), 1.006), { u: [-W, W], v: [0, 1], nu: 82, nv: 24,
      value: u => alignAt(B, u), colors: [P.magenta, P.cyan], range: [-1, 1], alpha: 0.5, pick: false });
    B.paths.forEach((p, m) => {
      const on = m < summed, central = p.align > 0.6 && Math.abs(p.eta - B.etaStar) < W * 0.35;
      sc.line(p.pts.map(q => v3.scale(q, 1.01)), { color: central ? P.cyan : P.magenta, width: m === MID ? 1.6 : 1.1, alpha: on ? (central ? 0.85 : 0.5) : 0.14 });
    });
    const geo = arcPts(sph(-th / 2, 0), sph(th / 2, 0), 40, 1.014);
    if (force && Math.abs(B.etaStar) > 1e-9) {
      sc.line(geo, { color: P.cyan, width: 1.6, alpha: 0.7, dash: [6, 5] });
      sc.surface('flux', (u, v) => v3.scale(pathAt(th, B.etaStar * v, u), 1.012), { u: [0, 1], v: [0, 1], nu: 40, nv: 6, color: P.magenta, alpha: 0.4, pick: false });
      tag(labels, 'flux', '∬F = ∮A', pathAt(th, B.etaStar * 0.5, 0.5), 'mg', 3);
    }
    sc.tube('spine', B.spinePts.map(q => v3.scale(q, 1.016)), { color: P.cyan, width: 4.2, glow: 0.6 });
    const probe = pathAt(th, B.etaStar, G.t);
    sc.bead(v3.scale(probe, 1.016), { key: 'probe', color: P.amber, r: 4.4 });
    for (const [id, p] of [['A', sph(-th / 2, 0)], ['B', sph(th / 2, 0)]]) { sc.bead(v3.scale(p, 1.012), { key: `b-${id}`, color: P.sigma, r: 3.6 }); tag(labels, `b-${id}`, id, p, 'dm', 1); }
    tag(labels, 'spine', force ? `κ = ${fix(B.curvature, 3)}` : 'δS = 0', pathAt(th, B.etaStar, 0.68), 'cy', 4);
    if (!force) { tag(labels, 'plus', '+Ω', pathAt(th, W * 0.92, 0.5), 'mg', 2); tag(labels, 'minus', '−Ω', pathAt(th, -W * 0.92, 0.5), 'mg', 2); }
  }
  /** cos(Φ(η) − Φ*) on the sieve, from the bundle's fine table (linear between its 161 samples). */
  function alignAt(B, eta) {
    const x = clamp((eta + B.W) / (2 * B.W), 0, 1) * (B.sieve.length - 1), i = Math.min(B.sieve.length - 2, Math.floor(x)), f = x - i;
    return B.sieve[i] * (1 - f) + B.sieve[i + 1] * f;
  }
  function drawZoom(G, P, labels) {
    const th = G.th, B = G.bundle, W = B.W, chain = G.micro.pts, w = walker(chain, G.t), n = G.n;
    // bottom: the micro-arc chain on the sphere
    dome(G, P, W * 0.55);
    sc.line(chainPts(chain, 1.004, chain.length > 70 ? 2 : 4), { color: P.magenta, width: 1.3, alpha: 0.9 });
    sc.line(arcPts(chain[w.k], chain[w.k + 1], 8, 1.006), { color: P.amber, width: 3.2 });
    // middle: the phase sieve at r = 1.3 and its 41 paths
    sc.surface('sieve', (u, v) => v3.scale(pathAt(th, u, v), R_SIEVE), { u: [-W, W], v: [0, 1], nu: 82, nv: 22,
      value: u => alignAt(B, u), colors: [P.magenta, P.cyan], range: [-1, 1], alpha: 0.62, pick: false });
    B.paths.forEach((p, m) => { if (m % 2 === 0) sc.line(p.pts.map(q => v3.scale(q, R_SIEVE + 0.004)), { color: p.align > 0.6 ? P.cyan : P.magenta, width: 0.9, alpha: 0.45 }); });
    // top: the smooth orbit, the hinge envelope of the n-chain and the entropy tax ribbon
    const macro = pathSamples(th, B.etaStar, n), turns = hingeTurns(macro), tmax = Math.max(1e-9, ...turns.map(Math.abs));
    sc.tube('orbit', B.spinePts.map(q => v3.scale(q, R_MACRO)), { color: P.cyan, width: 4.4, glow: 0.6 });
    const comb = [];
    macro.forEach((q, k) => { if (k > 0 && k < n) { const base = v3.scale(q, R_MACRO + 0.01), tip = v3.scale(q, R_MACRO + 0.01 + 0.16 * Math.abs(turns[k - 1]) / tmax); comb.push(base, tip, base); } });
    if (comb.length) sc.line(comb, { color: P.violet, width: 1.4, alpha: 0.85 });
    const env = macro.slice(1, -1).map((q, k) => v3.scale(q, R_MACRO + 0.01 + 0.16 * Math.abs(turns[k]) / tmax));
    if (env.length > 1) sc.line(env, { color: P.violet, width: 2 });
    const cum = G.pinch.cum, top = Math.max(1e-9, cum[cum.length - 1]);
    sc.surface('tax', (u, v) => {
      const s = u, k = Math.min(n, Math.round(s * n)), q = pathAt(th, B.etaStar, s), side = toward(q, sph(-th / 2 + th * s, lamOf(B.etaStar, s) - 0.2));
      return v3.add(v3.scale(q, R_MACRO), v3.scale(side, 0.05 + v * 0.22 * cum[k] / top));
    }, { u: [0, Math.max(0.02, G.t)], v: [0, 1], nu: 48, nv: 2, color: P.magenta, alpha: 0.55, pick: false });
    // the walker through the three layers
    const s = G.t, q = pathAt(th, B.etaStar, s);
    sc.line([v3.scale(w.p, 1.006), v3.scale(q, R_SIEVE), v3.scale(q, R_MACRO)], { color: P.amber, width: 1.2, alpha: 0.75, dash: [3, 4] });
    sc.bead(v3.scale(w.p, 1.006), { key: 'z-micro', color: P.amber, r: 3.8 });
    sc.bead(v3.scale(q, R_MACRO), { key: 'z-macro', color: P.amber, r: 4.4 });
    tag(labels, 'delta', 'δ', chain[Math.max(1, Math.floor(chain.length * 0.2))], 'mg', 3);
    tag(labels, 'sum', 'Σ exp(iΦ)', v3.scale(pathAt(th, W * 0.8, 0.3), R_SIEVE), 'cy', 3);
    tag(labels, 'int', '∫', v3.scale(pathAt(th, B.etaStar, 0.85), R_MACRO), 'cy', 3);
    tag(labels, 'tax', 'ΔS', v3.scale(pathAt(th, B.etaStar, Math.max(0.1, G.t * 0.6)), R_MACRO), 'mg', 2);
  }

  /* ---------- stage labels: DOM tags kept clear of each other, the title, the legend and the Θ handle ---------- */
  const ROLE = { cy: 'cyan', mg: 'magenta', am: 'amber', vi: 'violet', dm: 'dim' };
  const measure = document.createElement('span');
  measure.className = 'tag'; measure.hidden = true; measure.setAttribute('aria-hidden', 'true'); stageEl.appendChild(measure);
  const labelSizes = new Map();
  TRV.onLang(() => labelSizes.clear());
  if (document.fonts) document.fonts.ready.then(() => { labelSizes.clear(); paint(); });
  function placeLabels(entries) {
    const cv = sc.overlay(), dpr = TRV.fitCanvas(cv), ctx = cv.getContext('2d'), { W, H, top, bottom } = bounds;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); labelBoxes = [];
    if (TRV.thumbMode) return;
    const P = TRV.palette, small = W < 620, gap = 3, placed = [];
    const avoid = [boxOf($('hudTl')), boxOf($('legend')), boxOf(handleEl)].filter(Boolean).map(b => ({ x: b.x - 4, y: b.y - 4, w: b.w + 8, h: b.h + 8 }));
    const clear = (a, b) => a.x + a.w + gap <= b.x || b.x + b.w + gap <= a.x || a.y + a.h + gap <= b.y || b.y + b.h + gap <= a.y;
    entries.sort((a, b) => b.pri - a.pri);
    for (const e of entries) {
      const cls = `backed c-${e.c}`, cache = `${e.text}|${small}`;
      let size = labelSizes.get(cache);
      if (!size) {
        measure.className = `tag ${cls}`; measure.textContent = e.text; measure.hidden = false; measure.style.visibility = 'hidden';
        size = [measure.offsetWidth, measure.offsetHeight]; measure.hidden = true; labelSizes.set(cache, size);
      }
      const [w, h] = size, q = sc.p(e.p), cands = [[0, -(h / 2 + 12)], [0, h / 2 + 12], [w / 2 + 14, 0], [-(w / 2 + 14), 0],
        [w / 2 + 10, -(h / 2 + 8)], [-(w / 2 + 10), -(h / 2 + 8)], [w / 2 + 10, h / 2 + 8], [-(w / 2 + 10), h / 2 + 8]];
      for (const r of [34, 50, 70, 96]) for (let a = 0; a < 16; a++) cands.push([(r + w / 2) * Math.cos(TAU * a / 16), (r * 0.7 + h / 2) * Math.sin(TAU * a / 16)]);
      let box = null;
      for (const [dx, dy] of cands) {
        const b = { x: q[0] + dx - w / 2, y: q[1] + dy - h / 2, w, h };
        if (b.x < 8 || b.x + w > W - 8 || b.y < Math.max(8, top) || b.y + h > Math.min(H - 8, bottom)) continue;
        if (placed.every(o => clear(b, o)) && avoid.every(o => clear(b, o))) { box = b; break; }
      }
      if (!box) continue;
      placed.push(box); labelBoxes.push(Object.assign({ text: e.text }, box));
      sc.tag(`lbl-${e.key}`, [box.x + w / 2, box.y + h / 2], e.text, cls, { screen: true });
      // a thin leader from the anchor to the nearest edge of the label
      const cx = box.x + w / 2, cy = box.y + h / 2, dx = q[0] - cx, dy = q[1] - cy;
      if (Math.hypot(dx, dy) < Math.max(w, h) / 2 + 6) continue;
      const k = Math.min((w / 2 + 2) / Math.max(1e-3, Math.abs(dx)), (h / 2 + 2) / Math.max(1e-3, Math.abs(dy)));
      ctx.strokeStyle = TRV.alpha(P[ROLE[e.c]], 0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(cx + dx * k, cy + dy * k); ctx.stroke();
    }
  }
  function placeHandle(G) {
    const show = !TRV.thumbMode && !TRV.shot && !!bounds;
    handleEl.hidden = !show;
    if (!show) { handlePoint = null; return; }
    const B = S.scene === 'hallmarks' ? sph(G.eps / 2, 0) : sph(G.th / 2, 0), q = sc.p(B);
    handlePoint = q;
    handleEl.style.left = `${q[0].toFixed(1)}px`; handleEl.style.top = `${q[1].toFixed(1)}px`;
  }

  /* ---------- text, readouts and the plot ---------- */
  const swatches = items => items.map(([c, t]) => `<span><i class="sw ${c}"></i>${t}</span>`).join('');
  const keyOf = items => items.map(([c, t]) => `<span class="k"><i class="sw ${c}"></i>${t}</span>`).join('');
  const sci = (x, d) => x.toExponential(d).replace('-', '−');
  function text(G) {
    const B = G.bundle, mode = G.mode === 'feynman-ito', eLabel = mode ? 'Θ/√N' : 'Θ/N';
    $('hudBig').textContent = L(...TITLES[S.plot === 'force' ? 'force' : S.scene]);
    let sub, legend, key, title;
    if (S.plot === 'sagitta') {
      sub = `N = ${G.n} · ε = ${eLabel} = ${fix(G.eps, 4)} · N(1 − cos ε) = ${fix(G.cumulativeSagitta, 3)}`;
      legend = [['cy', L('切线 sin ε', 'Tangent sin ε')], ['mg', L('矢高 1 − cos ε · 微弧链', 'Sagitta 1 − cos ε · micro-arc chain')], ['am', L('当前这一段 · Θ 手柄', 'Current arc · Θ handle')]];
      key = [['mg', 'N(1 − cos Θ/√N)'], ['mg dash', 'N(1 − cos Θ/N)'], ['vi', L('特罗特误差', 'Trotter error')], ['ik dash', `Θ²/2 = ${fix(G.th * G.th / 2, 3)}`], ['am', `N = ${G.n}`]];
      title = L('放大镜 · 累计矢高 · 特罗特误差', 'Lens · cumulative sagitta · Trotter error');
    } else if (S.plot === 'hallmarks') {
      const rs = G.robertson;
      sub = `ε = ${fix(G.eps, 3)} · Ω = ${fix(G.girardExcess, 4)} · 1 − cos ε = ${fix(G.sagittaVersine, 3)} · ${L('旋量', 'spinor')} ${G.lift[0] >= 0 ? '+1' : '−1'}`;
      legend = [['cy', L('先横后竖 · 先竖后横', 'Across then up · up then across')], ['mg', L('角超 Ω · 缺口', 'Excess Ω · gap')], ['vi', L('旋量带 720°', 'Spinor band 720°')], ['am', L('当前转角 α', 'Current turn α')]];
      key = [['ik', '‖u‖²‖v‖²'], ['mg', '|C½|²'], ['cy', 'cov²'], ['vi dash', `G = ${fix(rs.G, 3)}`], ['cy', 'cos α'], ['vi dash', 'cos(α/2)']];
      title = L('测不准分解 · 360°/720° 抬升', 'Uncertainty split · 360°/720° lift');
    } else if (S.plot === 'stitch') {
      sub = `M = 41 · |A₄₁| = ${fix(B.amplitude, 3)} · η* = ${fix(B.etaStar, 3)} · ${L('横向残差', 'transverse residual')} ${fix(B.transverseResidual, 3)}`;
      legend = [['cy', L('驻相直线 δS = 0', 'Stationary line δS = 0')], ['mg', L('两侧卷曲相消 · ±Ω', 'Side chains cancel · ±Ω')], ['am', L('求和进度', 'Summation progress')]];
      key = [['cy', '|K(η)|'], ['mg', 'Ω(η)'], ['cy', L('相量链', 'phasor chain')], ['am', `m = ${Math.round(G.t * PATHS)}`]];
      title = L('路径束振幅 · 科纽螺线', 'Bundle amplitude · Cornu spiral');
    } else if (S.plot === 'force') {
      sub = `β = ${fix(G.beta, 2)} · η* = ${fix(B.etaStar, 3)} · κ = ${fix(B.curvature, 3)} · ∬F = ${fix(B.spineArea, 4)}`;
      legend = [['cy', L('受力轨道 · 测地线（虚线）', 'Forced orbit · geodesic (dashed)')], ['mg', L('通量 ∬F', 'Flux ∬F')], ['am', L('求和进度', 'Summation progress')]];
      key = [['cy', 'κ(β)'], ['mg', '∬F'], ['vi ring', '∮A'], ['am', `β = ${fix(G.beta, 2)}`]];
      title = L('偏转与斯托克斯通量', 'Deflection and Stokes flux');
    } else {
      sub = `N = ${G.n} · ε = ${eLabel} · ΔS = ${fix(G.pinch.tax, 3)} · κ = ${fix(B.curvature, 3)}`;
      legend = [['mg', L('微弧 δ · 熵税 ΔS', 'Micro-arcs δ · entropy tax ΔS')], ['cy', L('相位筛 → 宏观轨道 ∫', 'Phase sieve → macro orbit ∫')], ['vi', L('铰链包络', 'Hinge envelope')], ['am', L('当前一步', 'Current step')]];
      key = [['cy', L('脊线偏离', 'spine offset')], ['cy dash', 'κ<sub>N</sub>'], ['vi', L('最大铰链角', 'max hinge')], ['mg', 'ΔS']];
      title = L(`四条宏观通道 · ${mode ? 'ε ~ 1/√N' : 'ε ~ 1/N'}`, `Four macroscopic channels · ${mode ? 'ε ~ 1/√N' : 'ε ~ 1/N'}`);
    }
    $('hudSub').textContent = sub; $('legend').innerHTML = swatches(legend);
    $('plotTitle').textContent = title; $('plotMeta').innerHTML = keyOf(key);
    $('pillN').textContent = String(G.n); $('pillSag').textContent = fix(G.cumulativeSagitta, 3);
    $('roSag').textContent = fix(G.cumulativeSagitta, 4);
    $('roSagNote').textContent = mode ? L(`→ Θ²/2 = ${fix(G.th * G.th / 2, 4)}`, `→ Θ²/2 = ${fix(G.th * G.th / 2, 4)}`) : L('≈ Θ²/(2N) → 0', '≈ Θ²/(2N) → 0');
    $('roEps').textContent = `${eLabel} = ${fix(G.eps, 4)}`;
    $('roTanSag').textContent = `${fix(G.tangentSin, 4)} · ${G.sagittaVersine < 1e-3 ? sci(G.sagittaVersine, 2) : fix(G.sagittaVersine, 4)}`;
    $('roTrotter').textContent = sci(G.trotterOperatorError, 2);
    $('roKappa').textContent = fix(B.curvature, 4);
    $('roAmp').textContent = fix(B.amplitude, 4);
    $('roTax').textContent = `${fix(G.pinch.tax, 4)} nat`;
    $('readoutNote').textContent = L(
      `${mode ? '费曼—伊东' : '牛顿'}标度：N = ${G.n} 段，每段 ε = ${fix(G.eps, 4)}。斯托克斯残差 ${sci(B.stokesResidual, 1)}；熵恒等式残差 ${sci(G.pinch.identity, 1)}。`,
      `${mode ? 'Feynman–Itô' : 'Newton'} scaling: N = ${G.n} steps of ε = ${fix(G.eps, 4)}. Stokes residual ${sci(B.stokesResidual, 1)}; entropy identity residual ${sci(G.pinch.identity, 1)}.`);
    TRV.hudFit();
  }
  const logTicks = (lo, hi) => { const out = []; for (let e = Math.floor(Math.log10(lo)); e <= Math.ceil(Math.log10(hi)); e++) { const v = 10 ** e; if (v >= lo * 0.999 && v <= hi * 1.001) out.push([v, e === 0 ? '1' : `1e${e}`.replace('-', '−')]); } return out; };
  function drawPlot(G) {
    if (TRV.thumbMode) return;
    const P = TRV.palette, cv = $('plot'), W = cv.clientWidth, H = cv.clientHeight, small = W < 440;
    if (W < 20 || H < 20) return;
    if (S.plot === 'sagitta') {
      const lensW = Math.round(clamp(W * 0.3, 92, 170));
      lens(kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [4, W - lensW, 4, 4] }), G, P, lensW);
      const th = G.th, curve = f => Array.from({ length: 81 }, (_, i) => { const n = 2 ** (8 * i / 80); return [n, f(n)]; });
      const ito = curve(n => n * (1 - Math.cos(th / Math.sqrt(n)))), newton = curve(n => n * (1 - Math.cos(th / n))), trot = G.trotter.map(r => [r.n, r.err]);
      const ys = [...ito, ...newton, ...trot].map(p => p[1]), lo = Math.min(...ys) * 0.6, hi = Math.max(...ys) * 1.8;
      const g = kit.plot(cv, { x: [1, 256], y: [lo, hi], logX: true, logY: true, pad: [lensW + 40, 10, 8, 18], clear: false });
      g.axes({ xTicks: small ? [1, 16, 256] : [1, 4, 16, 64, 256], yTicks: logTicks(lo, hi), xLabel: 'N' });
      g.hline(th * th / 2, P.ink, { dash: [3, 4], alpha: 0.6 });
      g.line(ito, P.magenta, { width: 2.2 }); g.line(newton, P.magenta, { width: 1.8, dash: [5, 4] }); g.line(trot, P.violet, { width: 1.8 });
      for (const n of STEPS) { g.dot(n, n * (1 - Math.cos(th / Math.sqrt(n))), P.magenta, 2.4); g.dot(n, n * (1 - Math.cos(th / n)), P.magenta, 2.4); }
      g.dot(G.n, G.cumulativeSagitta, P.amber, 4.6); g.dot(G.n, G.trotterOperatorError, P.amber, 3.4, { ring: true });
    } else if (S.plot === 'hallmarks') {
      const half = Math.round(W / 2), g = kit.plot(cv, { x: [0, 1.5], y: [0, 1.05], pad: [30, half + 8, 8, 18] });
      g.axes({ xTicks: [0, 0.5, 1, 1.5], yTicks: [0, 0.5, 1], xLabel: 'ε' });
      const curve = f => Array.from({ length: 61 }, (_, i) => { const e = 1.5 * i / 60, r = robertson(e); return [e, f(r)]; });
      g.line(curve(r => r.product), P.ink, { width: 2 }); g.line(curve(r => r.half[0] ** 2 + r.half[1] ** 2), P.magenta, { width: 1.8 });
      g.line(curve(r => r.cov ** 2), P.cyan, { width: 1.8 }); g.line(curve(r => Math.max(0, r.G)), P.violet, { width: 1.4, dash: [4, 3] });
      g.vline(G.eps, P.amber, { alpha: 0.6, dash: [3, 3] }); g.dot(G.eps, G.robertson.product, P.amber, 3.6);
      const h = kit.plot(cv, { x: [0, 720], y: [-1.15, 1.15], pad: [half + 28, 8, 8, 18], clear: false });
      h.axes({ xTicks: [0, 360, 720], yTicks: [-1, 0, 1], xLabel: 'α (°)' });
      h.line(Array.from({ length: 145 }, (_, i) => [5 * i, Math.cos(5 * i * PI / 180)]), P.cyan, { width: 1.4, alpha: 0.7 });
      h.line(Array.from({ length: 145 }, (_, i) => [5 * i, Math.cos(5 * i * PI / 360)]), P.violet, { width: 2, dash: [5, 3] });
      h.dot(360, SPINOR.at360[0], P.violet, 4); h.dot(720, SPINOR.at720[0], P.violet, 4);
      h.dot(G.alpha * 180 / PI, G.lift[0], P.amber, 4.2);
    } else if (S.plot === 'stitch') {
      const half = Math.round(W * 0.55), B = G.bundle, W2 = B.W, areaMax = Math.max(...B.paths.map(p => Math.abs(p.area)));
      const g = kit.plot(cv, { x: [-W2, W2], y: [-1.05, 1.05], pad: [30, W - half + 6, 8, 18] });
      g.axes({ xTicks: [[-W2, '−W'], [0, '0'], [W2, 'W']], yTicks: [-1, 0, 1], xLabel: 'η' });
      g.area(B.local.map(([c, a]) => [c, a]), P.cyan, { alpha: 0.16, base: 0 }); g.line(B.local, P.cyan, { width: 2 });
      g.line(B.paths.map(p => [p.eta, p.area / areaMax]), P.magenta, { width: 1.6 });
      g.vline(B.etaStar, P.cyan, { alpha: 0.7, dash: [3, 3] });
      const m = Math.min(PATHS - 1, Math.round(G.t * PATHS));
      g.dot(B.paths[m].eta, 0, P.amber, 3.4);
      const xs = B.chain.map(p => p[0]), ys = B.chain.map(p => p[1]);
      const h = kit.plot(cv, { x: [Math.min(...xs) - 0.05, Math.max(...xs) + 0.05], y: [Math.min(...ys) - 0.05, Math.max(...ys) + 0.05], pad: [half + 10, 8, 6, 6], clear: false, equal: true });
      const upto = Math.round(G.t * PATHS);
      for (let i = 0; i < PATHS; i++) h.line([B.chain[i], B.chain[i + 1]], B.paths[i].align > 0.6 && Math.abs(B.paths[i].eta - B.etaStar) < W2 * 0.35 ? P.cyan : P.magenta, { width: 1.6, alpha: i < upto ? 1 : 0.18 });
      h.arrow([0, 0], B.chain[PATHS], { color: P.cyan, width: 2, alpha: 0.75, headSize: 7 });
      h.dot(...B.chain[upto], P.amber, 3.4);
    } else if (S.plot === 'force') {
      const half = Math.round(W / 2), sw = sweepOf(G.th), kMax = Math.max(1e-6, ...sw.map(r => Math.abs(r.curvature)));
      const g = kit.plot(cv, { x: [-1, 1], y: [-kMax * 1.15, kMax * 1.15], pad: [40, half + 8, 8, 18] });
      g.axes({ xTicks: [-1, 0, 1], yTicks: [[-kMax, fix(-kMax, 2)], [0, '0'], [kMax, fix(kMax, 2)]], xLabel: 'β' });
      g.line(sw.map(r => [r.beta, r.curvature]), P.cyan, { width: 2 }); g.dot(G.beta, G.bundle.curvature, P.amber, 4);
      const fMax = Math.max(1e-6, ...sw.map(r => Math.abs(r.flux)));
      const h = kit.plot(cv, { x: [-1, 1], y: [-fMax * 1.15, fMax * 1.15], pad: [half + 44, 8, 8, 18], clear: false });
      h.axes({ xTicks: [-1, 0, 1], yTicks: [[-fMax, fix(-fMax, 3)], [0, '0'], [fMax, fix(fMax, 3)]], xLabel: 'β' });
      h.line(sw.map(r => [r.beta, r.flux]), P.magenta, { width: 2 });
      for (const r of sw) h.dot(r.beta, r.loop, P.violet, 2.4, { ring: true });
      h.dot(G.beta, G.bundle.spineArea, P.amber, 4);
    } else {
      const rows = channelsOf(G.mode, G.th, G.beta), lanes = [['deviation', P.cyan, []], ['curvature', P.cyan, [4, 3]], ['hingeMax', P.violet, []], ['tax', P.magenta, []]];
      const top = 4, gap = 4, lane = (H - top - 16 - gap * 3) / 4;
      lanes.forEach(([k, color, dash], i) => {
        // each lane spans 0 and its own extreme (either sign) with 15% headroom; its one tick names that extreme
        const vals = rows.map(r => r[k]), vmin = Math.min(0, ...vals), vmax = Math.max(0, ...vals), span = Math.max(1e-12, vmax - vmin);
        const lo = vmin < 0 ? vmin - 0.15 * span : 0, hi = vmax > 0 ? vmax + 0.15 * span : 0.05 * span, peak = -vmin > vmax ? vmin : vmax;
        const g = kit.plot(cv, { x: [1, 256], y: [lo, hi], logX: true, pad: [44, 10, top + i * (lane + gap), H - (top + i * (lane + gap) + lane)], clear: i === 0, minHeight: 6 });
        g.axes({ xTicks: i === 3 ? (small ? [1, 16, 256] : [1, 4, 16, 64, 256]) : [], yTicks: [[peak, peak === 0 ? '0' : Math.abs(peak) >= 0.1 ? fix(peak, 2) : sci(peak, 0)]], frame: true });
        g.line(rows.map(r => [r.n, r[k]]), color, { width: 1.8, dash });
        const now = rows.find(r => r.n === G.n);
        if (now) g.dot(G.n, now[k], P.amber, 3.4);
      });
    }
  }
  /** The magnifier: the current micro-arc at true proportions, tangent sin ε (cyan) over sagitta 1 − cos ε (magenta). */
  function lens(g, G, P, lensW) {
    const ctx = g.ctx, H = g.H, e = G.eps, x0 = 8, y0 = 10, w = lensW - 16, h = H - 22;
    const M = Math.min(0.8 * w / Math.sin(e), 0.62 * h / Math.max(1e-9, 1 - Math.cos(e)), 4000);
    const ox = x0 + 4, oy = y0 + 14, X = x => ox + M * x, Y = y => oy - M * y;
    ctx.save();
    ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(x0 - 4, y0 - 6, w + 8, h + 8);
    ctx.lineCap = 'round';
    ctx.strokeStyle = P.amber; ctx.lineWidth = 2.4; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const a = e * i / 40, x = X(Math.sin(a)), y = Y(Math.cos(a) - 1); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke();
    ctx.strokeStyle = P.cyan; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(Math.sin(e)), Y(0)); ctx.stroke();
    ctx.strokeStyle = P.magenta; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(X(Math.sin(e)), Y(0)); ctx.lineTo(X(Math.sin(e)), Y(Math.cos(e) - 1)); ctx.stroke();
    ctx.font = `9.5px ${TRV.fonts.data}`; ctx.textBaseline = 'top'; ctx.textAlign = 'left'; ctx.fillStyle = P.dim;
    ctx.fillText(`×${M >= 100 ? Math.round(M) : fix(M, 0)}`, x0, y0 + h - 10);
    ctx.textAlign = 'right'; ctx.fillStyle = P.magenta;
    ctx.fillText(`${(1 - Math.cos(e)) < 1e-3 ? sci(1 - Math.cos(e), 1) : fix(1 - Math.cos(e), 4)}`, x0 + w, y0 + h - 10);
    ctx.restore();
  }

  function draw() {
    if (!clock || !cards || !fields) return;
    const G = model(), P = TRV.palette;
    frame = G;
    stageEl.classList.toggle('still', !!TRV.still);
    text(G); fit(G);
    sc.begin();
    sphere(P, S.scene === 'hallmarks');
    const labels = [];
    if (S.scene === 'arc') drawArc(G, P, labels);
    else if (S.scene === 'hallmarks') drawHallmarks(G, P, labels);
    else if (S.scene === 'bundle') drawBundle(G, P, labels, S.plot === 'force');
    else drawZoom(G, P, labels);
    placeHandle(G);
    placeLabels(labels);
    sc.end();
    drawPlot(G);
  }

  /* ---------- controls ---------- */
  clock = kit.clock({ range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, step: 0.05, rate: 0.12, loop: true,
    format: t => `t ${fix(t, 2)} <small>/ 1</small>`, onChange: () => paint() });
  const free = () => { cards.mark(null); };
  fields = {
    arcScale: kit.field($('arcScale'), { fmt: v => fix(v, 2), onInput: v => { free(); S.arcScale = v; paint(); } }),
    phaseGradient: kit.field($('phaseGradient'), { fmt: v => (v > 0 ? '+' : '') + fix(v, 2), onInput: v => { free(); S.phaseGradient = v; paint(); } })
  };
  chipsN = kit.chips($('stepCount'), 'steps', v => { free(); S.stepCount = Number(v); paint(); });
  chipsMode = kit.chips($('scalingMode'), 'mode', v => { free(); S.scalingMode = v; paint(); });
  function sync() {
    fields.arcScale.set(S.arcScale); fields.phaseGradient.set(S.phaseGradient);
    chipsN.set(String(S.stepCount), true); chipsMode.set(S.scalingMode, true);
  }
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'),
    idle: ['自由探索：舞台、读数与小图随参数同步更新。', 'Free exploration: the stage, readouts and plot follow the parameters.'],
    onPick: id => {
      const p = PRESETS[id], scene = SCENE_OF[id], instant = booting || !!TRV.still;
      clock.pause();
      const changed = scene !== S.scene;
      Object.assign(S, { scene, plot: PLOT_OF[id], stepCount: p.stepCount, scalingMode: p.scalingMode, arcScale: p.arcScale, phaseGradient: p.phaseGradient });
      sync();
      if (changed || booting) { startBlend(instant ? 0 : 600); sc.view(VIEW[scene], instant ? 0 : 600); }
      // the still frame for covers, cited stills and a page opened whole; a click or a cited figure starts at 0 and plays
      clock.set(TRV.still || !p.play || (booting && !TRV.embed) ? p.still : 0);
      if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
      paint();
    } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  kit.keys({ n: () => { const i = STEPS.indexOf(S.stepCount); free(); S.stepCount = STEPS[(i + 1) % STEPS.length]; chipsN.set(String(S.stepCount), true); paint(); } });

  /* ---------- the Θ handle: drag the end of the arc; the projection stays frozen while the pointer is down ---------- */
  function dragTo(ev) {
    if (!drag || ev.pointerId !== drag.pointer) return;
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    let best = S.arcScale, dist = Infinity;
    for (let i = 0; i <= 120; i++) {
      const th = 0.2 + 0.01 * i, q = sc.p(sph((S.scene === 'hallmarks' ? stepEpsOf(S.scalingMode, th, S.stepCount) : th) / 2, 0)), d = Math.hypot(q[0] - x, q[1] - y);
      if (d < dist) { dist = d; best = th; }
    }
    best = Math.round(best * 100) / 100;
    if (best !== S.arcScale) { S.arcScale = best; fields.arcScale.set(best); paint(); }
  }
  const endDrag = ev => { if (!drag || (ev && ev.pointerId !== drag.pointer)) return; drag = null; handleEl.classList.remove('dragging'); paint(); };
  handleEl.addEventListener('pointerdown', ev => {
    if (ev.button > 0) return;
    ev.preventDefault(); ev.stopPropagation();
    free(); drag = { pointer: ev.pointerId }; handleEl.classList.add('dragging');
    try { handleEl.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handleEl.addEventListener('pointermove', dragTo);
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handleEl.addEventListener(type, endDrag);

  window.ARC_MACRO_DEBUG = Object.freeze({
    get state() {
      const G = frame || model(), B = G.bundle, rs = G.robertson;
      return JSON.parse(JSON.stringify({
        preset: cards.current, scene: S.scene, plot: S.plot, t: clock.t, playing: clock.playing,
        stepCount: G.n, scalingMode: G.mode, arcScale: G.th, phaseGradient: G.beta,
        stepEps: G.eps, tangentSin: G.tangentSin, sagittaVersine: G.sagittaVersine, girardExcess: G.girardExcess,
        lagrangeGramResidual: G.lagrangeGramResidual, pythagoreanResidual: G.pythagoreanResidual, versineResidual: G.versineResidual,
        taylorBoundHolds: G.taylor.holds, taylorTails: G.taylor.tails, cumulativeSagitta: G.cumulativeSagitta,
        trotterOperatorError: G.trotterOperatorError, trotterByN: G.trotter,
        robertsonEqualityDiff: rs.diff, robertsonGramNonnegative: rs.gramNonnegative, commutatorFloor: rs.floor, robertson: { product: rs.product, cov: rs.cov, half: rs.half, G: rs.G },
        delonePackingRadius: DELONE.packing, deloneHalfGapMax: DELONE.halfGapMax, minSagittaFloor: G.sagittaVersine,
        spinor360Sign: Math.sign(SPINOR.at360[0]), spinor720Sign: Math.sign(SPINOR.at720[0]), spinorNow: G.lift, spinorAngle: G.alpha,
        bundlePathCount: B.paths.length, bundleAmplitude: B.amplitude, bundleSymmetric: B.symmetric, stationaryEta: B.etaStar,
        stationarySpineCurvature: B.curvature, transverseResidual: B.transverseResidual, spineFlux: B.spineArea,
        stokesLoopFluxMatch: B.stokesResidual, stokesOuter: B.outer, pathPhases: B.paths.map(p => p.phase), pathAreas: B.paths.map(p => p.area),
        tetraCoboundaryExactCheck: G.tetra.ok, tetra: G.tetra,
        coarsePinchingEntropyTax: G.pinch.tax, pinchingIdentityResidual: G.pinch.identity, coherenceLeft: G.pinch.coherence,
        microAmplitude: G.micro.amp, channels: channelsOf(G.mode, G.th, G.beta),
        camera: sc.cam, bounds, labels: labelBoxes, handle: handlePoint, surfaceMode: sc.mode
      }));
    }
  });
  window.TRV_THUMB = () => { cards.pick('curve-stitches-straight'); sc.view(VIEW.bundle, 0); clock.pause(); clock.set(1); paint.now(); };
  cards.pick(cards.initial('arc-sagitta-ito'));
  booting = false;
  paint();
})();
