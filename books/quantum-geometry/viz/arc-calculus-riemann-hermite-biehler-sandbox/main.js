/* RIEMANN//STOKES · 极小圆弧体微积分证明推演台 · Minimal circular-arc calculus proof workbench
   The stage is one lit terrain block over the window z = s − 1/2 = u + it, u ∈ [−0.45, 0.45] (world x = u/0.45), t ∈
   [11.5, 34.8] (world y = 0.12(t − 23.15)), carved by a symmetric Hadamard product model of the completed ξ:
     ξ_model(s) = ½ ∏_{k≤12} (γ_k² + z²)/(γ_k² + ¼) · Q_δ(z),  Q_0 = 1,
     Q_δ(z) = ((z − δ)² + γ₀²)((z + δ)² + γ₀²) / |¼ − (δ + iγ₀)²|²  (the counterfactual quartet ½ ± δ ± iγ₀, γ₀ = 23),
   with the first twelve ordinates γ₁ … γ₁₂ of the zeros of ζ. The height is the wing-levelled log potential
   L = ln(|ξ|²/W₀(t) + 10⁻⁴), W₀(t) = |ξ_model(½ + 0.45 + it)|² at the current δ, drawn by the monotone map
   Z = −A ln(1 − L/ℓ)/ln(1 − ln 10⁻⁴/ℓ): every zero on the grid reaches the same depth −A, and ∂_u Z has the sign of
   ∂_u|ξ|² = Δ_ε^HB/ε. Four scenes share it:
     sagitta  the prime-rotor sagittas Σ_{p≤P_ε} (1 − cos p^{−σ}), P_ε = e^{1/ε}, as a fence along the front edge
     shell    a slice t = t_s with the profile |ξ|²/W₀, and the dual-shell step E_ε(½ ± u + it), E_ε = ξ + (ε/2)ξ′ with the
              holomorphic involution E_ε^#(s) = E_ε(1 − s) = ξ(s) − (ε/2)ξ′(s) (never the anti-holomorphic E_ε(1 − s̄)):
              Δ_ε^HB = |E_ε(½ + u + it)|² − |E_ε(½ − u + it)|² = 2ε Re(conj ξ · ξ′) = 4uε K(s, s); the 4 × 4 Gram matrix of
              K(w, s) = (ξ′(s) conj ξ(w) + ξ(s) conj ξ′(w)) / (2[(s − ½) + (conj w − ½)]) at four nodes
     stokes   the box [½ + u₀, ½ + 0.42] × [12, 34.5] cut into n_u × n_t cells; every edge carries one phase increment
              (16 substeps, each the exact continuous phase Σ_a Arg((z₁ − a)/(z₀ − a))), its reverse the negated value
     bridge   F_L = ½ ∏ of the first L layers (12 on-line pairs, then the quartet): the kernel of a product splits as
              K_{Mξ} = (M ⊗ conj M)∘K_ξ + (ξ ⊗ conj ξ)∘K_M; block Schur complement of the Gram matrix on two pivots
   Every number is computed here. Read-only probe: window.RIEMANN_STOKES_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI;
  const SCENES = ['sagitta', 'shell', 'stokes', 'bridge'];

  /* ---------- the model ---------- */
  /** The first twelve ordinates of the zeros of ζ on the critical line (Odlyzko table, 15 digits). */
  const GAMMAS = [14.134725141734695, 21.022039638771556, 25.01085758014569, 30.424876125859512, 32.93506158773919, 37.586178158825675,
    40.9187190121475, 43.327073280915, 48.00515088116716, 49.7738324776723, 52.970321477714464, 56.44624769706339];
  const G0 = 23, U_MAX = 0.45, T_LO = 11.5, T_HI = 34.8, LN_FLOOR = Math.log(1e-4), LAYERS = 13;
  const BOX = { uR: 0.42, t0: 12, t1: 34.5 };
  const MERTENS_M = 0.26149721284764278, DC_SAG = -0.018602816348290326, C_SAG = MERTENS_M / 2 + DC_SAG, EULER_GAMMA = 0.5772156649015329;
  const SUP = { '-': '⁻', '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** A number in a short scientific form (3.21×10⁻⁵); plain decimals between 10⁻² and 10⁴. */
  function sci(x, d = 2) {
    if (x === 0) return '0';
    if (!Number.isFinite(x)) return '—';
    const sg = x < 0 ? '−' : '', a = Math.abs(x);
    let e = Math.floor(Math.log10(a));
    if (e >= -2 && e < 4) return sg + fix(a, Math.max(0, d + 1 - e));
    let m = a / 10 ** e;
    if (Number(m.toFixed(d)) >= 10) { m /= 10; e += 1; }
    return `${sg}${m.toFixed(d)}×10${String(e).split('').map((ch) => SUP[ch]).join('')}`;
  }
  const sgnFix = (x, d) => (x > 0 ? '+' : '') + fix(x, d);

  /** F_L(z) and F_L′(z) at z = u + it as [Re F, Im F, Re F′, Im F′]: ½ times the first `layers` layers (product rule). */
  function evalF(u, t, layers, delta) {
    let fr = 0.5, fi = 0, dr = 0, di = 0;
    const z2r = u * u - t * t, z2i = 2 * u * t;
    const mul = (ar, aImag, br, bi) => {
      const nfr = fr * ar - fi * aImag, nfi = fr * aImag + fi * ar;
      const ndr = dr * ar - di * aImag + fr * br - fi * bi, ndi = dr * aImag + di * ar + fr * bi + fi * br;
      fr = nfr; fi = nfi; dr = ndr; di = ndi;
    };
    for (let k = 0, nk = Math.min(layers, 12); k < nk; k++) {
      const g2 = GAMMAS[k] * GAMMAS[k], n = g2 + 0.25;
      mul((g2 + z2r) / n, z2i / n, 2 * u / n, 2 * t / n);
    }
    if (layers >= 13 && delta > 0) {
      const den = ((0.5 - delta) ** 2 + G0 * G0) * ((0.5 + delta) ** 2 + G0 * G0), mr = u - delta, pr = u + delta;
      const Ar = mr * mr - t * t + G0 * G0, leftImag = 2 * mr * t, Br = pr * pr - t * t + G0 * G0, Bi = 2 * pr * t;
      mul((Ar * Br - leftImag * Bi) / den, (Ar * Bi + leftImag * Br) / den,
        (2 * (mr * Br - t * Bi) + 2 * (pr * Ar - t * leftImag)) / den, (2 * (mr * Bi + t * Br) + 2 * (pr * leftImag + t * Ar)) / den);
    }
    return [fr, fi, dr, di];
  }
  /** One layer M alone (k = 1 … 12: the pair at γ_k; 13: the quartet) as [Re M, Im M, Re M′, Im M′]. */
  function evalLayer(k, u, t, delta) {
    if (k <= 12) { const g2 = GAMMAS[k - 1] ** 2, n = g2 + 0.25; return [(g2 + u * u - t * t) / n, 2 * u * t / n, 2 * u / n, 2 * t / n]; }
    if (!(delta > 0)) return [1, 0, 0, 0];
    const den = ((0.5 - delta) ** 2 + G0 * G0) * ((0.5 + delta) ** 2 + G0 * G0), mr = u - delta, pr = u + delta;
    const Ar = mr * mr - t * t + G0 * G0, leftImag = 2 * mr * t, Br = pr * pr - t * t + G0 * G0, Bi = 2 * pr * t;
    return [(Ar * Br - leftImag * Bi) / den, (Ar * Bi + leftImag * Br) / den, (2 * (mr * Br - t * Bi) + 2 * (pr * Ar - t * leftImag)) / den, (2 * (mr * Bi + t * Br) + 2 * (pr * leftImag + t * Ar)) / den];
  }
  /** ln |F_L(u + it)|² from the moduli of the linear factors (−∞ exactly at a zero). */
  function ln2F(u, t, layers, delta) {
    let s = Math.log(0.25);
    for (let k = 0, nk = Math.min(layers, 12); k < nk; k++) {
      const g = GAMMAS[k];
      s += Math.log((u * u + (t - g) ** 2) * (u * u + (t + g) ** 2)) - 2 * Math.log(g * g + 0.25);
    }
    if (layers >= 13 && delta > 0) {
      const a = (u - delta) ** 2, b = (u + delta) ** 2, c = (t - G0) ** 2, d = (t + G0) ** 2;
      s += Math.log((a + c) * (a + d) * (b + c) * (b + d)) - 2 * Math.log(((0.5 - delta) ** 2 + G0 * G0) * ((0.5 + delta) ** 2 + G0 * G0));
    }
    return s;
  }
  /** ∂_u ln|F_L|² at u + it: Σ over the zeros a of 2(u − Re a)/|z − a|². */
  function radial(u, t, layers, delta) {
    let s = 0;
    for (let k = 0, nk = Math.min(layers, 12); k < nk; k++) { const g = GAMMAS[k]; s += 2 * u / (u * u + (t - g) ** 2) + 2 * u / (u * u + (t + g) ** 2); }
    if (layers >= 13 && delta > 0) for (const a of [delta, -delta]) for (const b of [G0, -G0]) s += 2 * (u - a) / ((u - a) ** 2 + (t - b) ** 2);
    return s;
  }
  /** The zeros of F_L as [u, t] (both half-planes). */
  function zerosOf(layers, delta) {
    const out = [];
    for (let k = 0, nk = Math.min(layers, 12); k < nk; k++) out.push([0, GAMMAS[k]], [0, -GAMMAS[k]]);
    if (layers >= 13 && delta > 0) for (const a of [delta, -delta]) for (const b of [G0, -G0]) out.push([a, b]);
    return out;
  }
  const lnW0 = (t, layers, delta) => ln2F(U_MAX, t, layers, delta);
  /** The wing-levelled log potential L = ln(|F|²/W₀(t) + 10⁻⁴). */
  const levelled = (u, t, layers, delta) => Math.log(Math.exp(ln2F(u, t, layers, delta) - lnW0(t, layers, delta)) + 1e-4);
  const A_DEPTH = 0.62, ELL = 0.04, MAP_DEN = Math.log(1 - LN_FLOOR / ELL);
  /** The display height of L: monotone, 0 at L = 0, −A at the floor ln 10⁻⁴. */
  const zmap = (Lv) => -A_DEPTH * Math.log(1 - Lv / ELL) / MAP_DEN;

  /* ---------- the terrain grid ---------- */
  const X = (u) => u / U_MAX, Y = (t) => 0.15 * (t - 23.15), BOT = -0.8;
  const terrainCache = new Map();
  /** Rows t: a uniform base plus refinement around every zero in view, exact rows through the zeros. */
  function rowsFor(layers, delta) {
    const special = [], zs = GAMMAS.slice(0, Math.min(layers, 12)).filter((g) => g > T_LO && g < T_HI);
    if (layers >= 13 && delta > 0) zs.push(G0);
    for (const g of zs) for (const o of [0, 0.025, 0.06, 0.11, 0.18, 0.28]) { special.push(g + o); if (o) special.push(g - o); }
    const base = Array.from({ length: 95 }, (_, j) => T_LO + (T_HI - T_LO) * j / 94);
    return special.concat(base.filter((b) => special.every((s) => Math.abs(s - b) > 0.03))).sort((a, b) => a - b);
  }
  function terrain(layers, delta) {
    const key = `${layers}|${delta.toFixed(4)}`;
    if (terrainCache.has(key)) return terrainCache.get(key);
    if (terrainCache.size > 48) terrainCache.clear();
    const us = Array.from({ length: 73 }, (_, i) => (i - 36) / 80);
    if (layers >= 13 && delta > 0) for (const d of [delta, -delta]) if (us.every((x) => Math.abs(x - d) > 1e-9)) us.push(d);
    us.sort((a, b) => a - b);
    const ts = rowsFor(layers, delta), Z = [], neg = [], Lv = [];
    for (const t of ts) {
      const w = lnW0(t, layers, delta), zr = [], nr = [], lr = [];
      for (const u of us) {
        const l = Math.log(Math.exp(ln2F(u, t, layers, delta) - w) + 1e-4);
        lr.push(l); zr.push(zmap(l)); nr.push(Math.sign(u) * radial(u, t, layers, delta) < 0 ? 1 : 0);
      }
      Z.push(zr); neg.push(nr); Lv.push(lr);
    }
    const T = { layers, delta, us, ts, Z, neg, Lv };
    terrainCache.set(key, T);
    return T;
  }
  /** The height of the drawn surface at (u, t), bilinear in its grid. */
  const upper = (arr, x) => { const k = arr.findIndex((v) => v >= x); return Math.max(1, k < 0 ? arr.length - 1 : k); };
  function zAt(T, u, t) {
    const i = upper(T.us, u), j = upper(T.ts, t);
    const a = clamp((u - T.us[i - 1]) / (T.us[i] - T.us[i - 1]), 0, 1), b = clamp((t - T.ts[j - 1]) / (T.ts[j] - T.ts[j - 1]), 0, 1);
    const z00 = T.Z[j - 1][i - 1], z10 = T.Z[j - 1][i], z01 = T.Z[j][i - 1], z11 = T.Z[j][i];
    return (1 - b) * ((1 - a) * z00 + a * z10) + b * ((1 - a) * z01 + a * z11);
  }

  /* ---------- the dual shells, the kernel and its Gram matrix ---------- */
  /** Δ_ε^HB at ½ + u + it three ways: |E(½+u+it)|² − |E(½−u+it)|², 2ε Re(conj ξ ξ′), 4uε K(s, s). */
  function shell(u, t, eps, layers, delta) {
    const a = evalF(u, t, layers, delta), b = evalF(-u, t, layers, delta), h = eps / 2;
    const Eo = [a[0] + h * a[2], a[1] + h * a[3]], Em = [b[0] + h * b[2], b[1] + h * b[3]];
    const outer = Eo[0] ** 2 + Eo[1] ** 2, mirror = Em[0] ** 2 + Em[1] ** 2, reXX = a[0] * a[2] + a[1] * a[3];
    const Kss = kernelOf([[u, t]], [a]).re[0][0];                // K(s, s) by the kernel formula
    const w0 = Math.exp(lnW0(t, layers, delta));
    return { u, t, eps, outer, mirror, delta: outer - mirror, identity: 2 * eps * reXX, kernel: 4 * u * eps * Kss, Kss, W0: w0,
      xi: [a[0], a[1]], dxi: [a[2], a[3]], ximirror: [b[0], b[1]], dximirror: [b[2], b[3]], ratio: (a[0] ** 2 + a[1] ** 2) / w0 };
  }
  const T_SLICE = [14.5, 31.8];
  /** The four Gram nodes [u, t]: the probe, and three fixed offsets from the slice. */
  const gramNodes = (up, ts) => [[up, ts], [0.25, ts - 3], [0.18, ts + 3], [0.35, ts - 6 >= T_LO ? ts - 6 : ts + 6]];
  /** The kernel matrix G_ab = K(s_a, s_b) of values v_a = [F, F′] at nodes [u, t]: (F′_b conj F_a + F_b conj F′_a)/(2(z_b + conj z_a)). */
  function kernelOf(nodes, vals) {
    const n = nodes.length, re = [], im = [];
    for (let a = 0; a < n; a++) {
      re.push([]); im.push([]);
      for (let b = 0; b < n; b++) {
        const [Far, Fai, dar, dai] = vals[a], [Fbr, Fbi, dbr, dbi] = vals[b];
        // N = F′_b conj(F_a) + F_b conj(F′_a)
        const Nr = dbr * Far + dbi * Fai + Fbr * dar + Fbi * dai, Ni = dbi * Far - dbr * Fai + Fbi * dar - Fbr * dai;
        const Dr = 2 * (nodes[b][0] + nodes[a][0]), Di = 2 * (nodes[b][1] - nodes[a][1]), dd = Dr * Dr + Di * Di;
        re[a].push((Nr * Dr + Ni * Di) / dd); im[a].push((Ni * Dr - Nr * Di) / dd);
      }
    }
    return { re, im };
  }
  /** Eigenvalues of a Hermitian matrix (re, im) through its real symmetric double [[Re, −Im], [Im, Re]] (cyclic Jacobi). */
  function eigHerm(re, im) {
    const n = re.length, m = 2 * n, A = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => {
      const a = i % n, b = j % n, top = i < n, left = j < n;
      return top === left ? re[a][b] : top ? -im[a][b] : im[a][b];
    }));
    for (let sweep = 0; sweep < 80; sweep++) {
      let off = 0; for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) off += A[i][j] ** 2;
      if (off < 1e-30) break;
      for (let p = 0; p < m; p++) for (let q = p + 1; q < m; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), tt = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(tt * tt + 1), s = tt * c;
        for (let k = 0; k < m; k++) { const x = A[k][p], y = A[k][q]; A[k][p] = c * x - s * y; A[k][q] = s * x + c * y; }
        for (let k = 0; k < m; k++) { const x = A[p][k], y = A[q][k]; A[p][k] = c * x - s * y; A[q][k] = s * x + c * y; }
      }
    }
    const ev = A.map((r, i) => r[i]).sort((a, b) => a - b);
    return ev.filter((_, i) => i % 2 === 0);                       // each eigenvalue appears twice
  }
  /** Normalize by D = diag(1/√|K_aa|): congruent, so it keeps the signs of the eigenvalues (Sylvester). */
  function normalized(K) {
    const d = K.re.map((r, a) => { const v = Math.abs(r[a]); return v > 0 ? 1 / Math.sqrt(v) : 1; });
    return { re: K.re.map((r, a) => r.map((x, b) => x * d[a] * d[b])), im: K.im.map((r, a) => r.map((x, b) => x * d[a] * d[b])), d };
  }
  /** The 2 × 2 Hermitian Schur complement S = A − B C⁻¹ B* of the pivots {3, 4}, and the least value of the quadratic form. */
  function schur(N) {
    const c = (a, b) => [N.re[a][b], N.im[a][b]];
    const mul = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]], add = (x, y) => [x[0] + y[0], x[1] + y[1]], sub = (x, y) => [x[0] - y[0], x[1] - y[1]], cj = (x) => [x[0], -x[1]];
    const C = [[c(2, 2), c(2, 3)], [c(3, 2), c(3, 3)]], det = sub(mul(C[0][0], C[1][1]), mul(C[0][1], C[1][0]));
    const dv = (x) => { const q = det[0] ** 2 + det[1] ** 2; return [(x[0] * det[0] + x[1] * det[1]) / q, (x[1] * det[0] - x[0] * det[1]) / q]; };
    const Ci = [[dv(C[1][1]), dv([-C[0][1][0], -C[0][1][1]])], [dv([-C[1][0][0], -C[1][0][1]]), dv(C[0][0])]];
    const B = [[c(0, 2), c(0, 3)], [c(1, 2), c(1, 3)]], S = [[0, 0], [0, 0]];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      let s = c(i, j);
      for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) s = sub(s, mul(mul(B[i][k], Ci[k][l]), cj(B[j][l])));
      S[i][j] = s;
    }
    const a = S[0][0][0], d = S[1][1][0], b2 = S[0][1][0] ** 2 + S[0][1][1] ** 2, m = (a + d) / 2, r = Math.sqrt(((a - d) / 2) ** 2 + b2);
    const cEv = (() => { const a2 = C[0][0][0], d2 = C[1][1][0], q = C[0][1][0] ** 2 + C[0][1][1] ** 2, mm = (a2 + d2) / 2, rr = Math.sqrt(((a2 - d2) / 2) ** 2 + q); return [mm - rr, mm + rr]; })();
    // x = e₁: y* = −C⁻¹ B* x, and the quadratic form there against x* S x = S₁₁
    const bx = [cj(B[0][0]), cj(B[0][1])], y = [0, 1].map((k) => { let s = [0, 0]; for (let l = 0; l < 2; l++) s = add(s, mul(Ci[k][l], bx[l])); return [-s[0], -s[1]]; });
    let q = c(0, 0)[0];
    for (let l = 0; l < 2; l++) q += 2 * mul(B[0][l], y[l])[0];
    for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) q += mul(mul(cj(y[k]), C[k][l]), y[l])[0];
    return { S, ev: [m - r, m + r], cEv, least: q, xSx: a };
  }
  /** Everything about the Gram matrix of F_L at the four nodes. */
  function gram(layers, delta, up, ts) {
    const nodes = gramNodes(up, ts), vals = nodes.map(([u, t]) => evalF(u, t, layers, delta));
    const K = kernelOf(nodes, vals), N = normalized(K), ev = eigHerm(N.re, N.im);
    let herm = 0; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) herm = Math.max(herm, Math.abs(K.re[a][b] - K.re[b][a]) + Math.abs(K.im[a][b] + K.im[b][a]));
    const scale = Math.max(...K.re.map((r, a) => Math.abs(r[a])));
    return { nodes, K, N: { re: N.re, im: N.im }, ev, lamMin: ev[0], diag: K.re.map((r, a) => r[a]), herm: scale > 0 ? herm / scale : 0, schur: schur(N) };
  }
  /** Layer L of the bridge: K_{F_L} against (M ⊗ conj M)∘K_{F_{L−1}} + (F_{L−1} ⊗ conj F_{L−1})∘K_M, and λ_min of K_M. */
  function layerSplit(Lc, delta, up, ts) {
    if (Lc < 1) return null;
    const nodes = gramNodes(up, ts), prev = nodes.map(([u, t]) => evalF(u, t, Lc - 1, delta)), M = nodes.map(([u, t]) => evalLayer(Lc, u, t, delta));
    const Kp = kernelOf(nodes, prev), KM = kernelOf(nodes, M), K = kernelOf(nodes, nodes.map(([u, t]) => evalF(u, t, Lc, delta)));
    let res = 0, scale = 0;
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
      const m = [M[b][0] * M[a][0] + M[b][1] * M[a][1], M[b][1] * M[a][0] - M[b][0] * M[a][1]];          // M_b conj M_a
      const f = [prev[b][0] * prev[a][0] + prev[b][1] * prev[a][1], prev[b][1] * prev[a][0] - prev[b][0] * prev[a][1]];
      const r = m[0] * Kp.re[a][b] - m[1] * Kp.im[a][b] + f[0] * KM.re[a][b] - f[1] * KM.im[a][b];
      const i = m[0] * Kp.im[a][b] + m[1] * Kp.re[a][b] + f[0] * KM.im[a][b] + f[1] * KM.re[a][b];
      res = Math.max(res, Math.hypot(r - K.re[a][b], i - K.im[a][b])); scale = Math.max(scale, Math.hypot(K.re[a][b], K.im[a][b]));
    }
    const NM = normalized(KM);
    return { layer: Lc, kind: Lc <= 12 ? 'pair' : delta > 0 ? 'quartet' : 'none', residual: scale > 0 ? res / scale : 0, layerMin: Lc === 13 && !(delta > 0) ? 0 : eigHerm(NM.re, NM.im)[0] };
  }
  /** λ_min of the normalized Gram matrix of F_L for L = 1 … 13 (the strip of the bridge). */
  function ladderOf(delta, up, ts) { return Array.from({ length: LAYERS }, (_, k) => gram(k + 1, delta, up, ts).lamMin); }

  /* ---------- the finite-mesh Stokes cochain ---------- */
  const meshDims = (eps) => ({ nu: clamp(Math.round(0.5 / eps), 1, 7), nt: clamp(Math.round(2 / eps), 4, 27) });
  /** The continuous phase change of F along the straight segment z₀ → z₁: Σ over the zeros a of Arg((z₁ − a)/(z₀ − a)). */
  function segPhase(u0, t0, u1, t1, zeros) {
    let s = 0;
    for (const [au, at] of zeros) {
      const pr = u0 - au, pi = t0 - at, qr = u1 - au, qi = t1 - at;
      s += Math.atan2(qi * pr - qr * pi, qr * pr + qi * pi);
    }
    return s;
  }
  const SUB = 16;
  /** N(∂R) from the rim alone (the same 16-substep continuous phases), for u₀ = −0.2, −0.195, …, 0.3; NaN when the rim meets a zero. */
  const rimCache = new Map();
  function rimCurve(eps, delta) {
    const key = `${eps.toFixed(4)}|${delta.toFixed(4)}`;
    if (rimCache.has(key)) return rimCache.get(key);
    if (rimCache.size > 32) rimCache.clear();
    const { nu, nt } = meshDims(eps), zeros = zerosOf(LAYERS, delta), out = [];
    const run = (a, b) => { let s = 0, near = Infinity; for (let j = 1; j <= SUB; j++) s += segPhase(a[0] + (b[0] - a[0]) * (j - 1) / SUB, a[1] + (b[1] - a[1]) * (j - 1) / SUB, a[0] + (b[0] - a[0]) * j / SUB, a[1] + (b[1] - a[1]) * j / SUB, zeros);
      for (const [au, at] of zeros) { const dx = b[0] - a[0], dy = b[1] - a[1], w = clamp(((au - a[0]) * dx + (at - a[1]) * dy) / (dx * dx + dy * dy), 0, 1); near = Math.min(near, Math.hypot(a[0] + w * dx - au, a[1] + w * dy - at)); }
      return [s, near]; };
    for (let k = 0; k <= 100; k++) {
      const u0 = -0.2 + 0.005 * k, U = (i) => u0 + (BOX.uR - u0) * i / nu, Tt = (j) => BOX.t0 + (BOX.t1 - BOX.t0) * j / nt;
      let s = 0, near = Infinity;
      const add = (a, b, sign) => { const [v, d] = run(a, b); s += sign * v; near = Math.min(near, d); };
      for (let i = 0; i < nu; i++) { add([U(i), Tt(0)], [U(i + 1), Tt(0)], 1); add([U(i), Tt(nt)], [U(i + 1), Tt(nt)], -1); }
      for (let j = 0; j < nt; j++) { add([U(nu), Tt(j)], [U(nu), Tt(j + 1)], 1); add([U(0), Tt(j)], [U(0), Tt(j + 1)], -1); }
      out.push([u0, near > 1e-9 ? s / TAU : NaN]);
    }
    rimCache.set(key, out);
    return out;
  }
  const stokesCache = new Map();
  function stokes(u0, eps, delta) {
    const key = `${u0.toFixed(6)}|${eps.toFixed(4)}|${delta.toFixed(4)}`;
    if (stokesCache.has(key)) return stokesCache.get(key);
    if (stokesCache.size > 64) stokesCache.clear();
    const { nu, nt } = meshDims(eps), zeros = zerosOf(LAYERS, delta);
    const U = (i) => u0 + (BOX.uR - u0) * i / nu, Tt = (j) => BOX.t0 + (BOX.t1 - BOX.t0) * j / nt;
    let sampledGap = 0, nearest = Infinity;
    /** One undirected edge from a to b: 16 substeps of exact continuous phase, and the vertex-sampled principal phase;
        returns the phase and records how close the edge comes to a zero. */
    const near = new Map();
    function edge(a, b) {
      const before = nearest; nearest = Infinity;
      let s = 0, prev = evalF(a[0], a[1], LAYERS, delta);
      for (let j = 1; j <= SUB; j++) {
        const p0 = [a[0] + (b[0] - a[0]) * (j - 1) / SUB, a[1] + (b[1] - a[1]) * (j - 1) / SUB], p1 = [a[0] + (b[0] - a[0]) * j / SUB, a[1] + (b[1] - a[1]) * j / SUB];
        const c = segPhase(p0[0], p0[1], p1[0], p1[1], zeros);
        s += c;
        const cur = evalF(p1[0], p1[1], LAYERS, delta), samp = Math.atan2(cur[1] * prev[0] - cur[0] * prev[1], cur[0] * prev[0] + cur[1] * prev[1]);
        sampledGap = Math.max(sampledGap, Math.abs(samp - c)); prev = cur;
      }
      for (const [au, at] of zeros) {                              // distance from the zero to the segment
        const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, w = clamp(((au - a[0]) * dx + (at - a[1]) * dy) / l2, 0, 1);
        nearest = Math.min(nearest, Math.hypot(a[0] + w * dx - au, a[1] + w * dy - at));
      }
      near.set(`${a}|${b}`, nearest); nearest = Math.min(before, nearest);
      return s;
    }
    const H = [], V = [];                                          // H[j][i]: (U_i, T_j) → (U_{i+1}, T_j); V[j][i]: (U_i, T_j) → (U_i, T_{j+1})
    for (let j = 0; j <= nt; j++) { H.push([]); for (let i = 0; i < nu; i++) H[j].push(edge([U(i), Tt(j)], [U(i + 1), Tt(j)])); }
    for (let j = 0; j < nt; j++) { V.push([]); for (let i = 0; i <= nu; i++) V[j].push(edge([U(i), Tt(j)], [U(i), Tt(j + 1)])); }
    // every cell, counter-clockwise: its four darts; an interior edge appears in two cells with opposite signs
    const cells = [], darts = new Map();
    const dart = (kind, j, i, sign) => { const k = `${kind}${j},${i}`, v = sign * (kind === 'h' ? H[j][i] : V[j][i]); if (!darts.has(k)) darts.set(k, []); darts.get(k).push(v); return v; };
    let cellSum = 0;
    for (let j = 0; j < nt; j++) for (let i = 0; i < nu; i++) {
      const w = dart('h', j, i, 1) + dart('v', j, i + 1, 1) + dart('h', j + 1, i, -1) + dart('v', j, i, -1);
      cells.push({ i, j, omega: w, n: Math.round(w / TAU) }); cellSum += w;
    }
    let cancel = 0, interior = 0;
    darts.forEach((list) => { if (list.length === 2) { interior++; cancel = Math.max(cancel, Math.abs(list[0] + list[1])); } });
    let boundary = 0;
    for (let i = 0; i < nu; i++) boundary += H[0][i] - H[nt][i];
    for (let j = 0; j < nt; j++) boundary += V[j][nu] - V[j][0];
    const inside = zeros.filter(([au, at]) => au > u0 && au < BOX.uR && at > BOX.t0 && at < BOX.t1);
    let rimNear = Infinity;                                        // only the rim decides whether N(∂R) is defined
    for (let i = 0; i < nu; i++) rimNear = Math.min(rimNear, near.get(`${[U(i), Tt(0)]}|${[U(i + 1), Tt(0)]}`), near.get(`${[U(i), Tt(nt)]}|${[U(i + 1), Tt(nt)]}`));
    for (let j = 0; j < nt; j++) rimNear = Math.min(rimNear, near.get(`${[U(nu), Tt(j)]}|${[U(nu), Tt(j + 1)]}`), near.get(`${[U(0), Tt(j)]}|${[U(0), Tt(j + 1)]}`));
    const out = { u0, eps, delta, nu, nt, cells: nu * nt, edges: H.flat().length + V.flat().length, interior, cancel, boundary, N: boundary / TAU, cellN: cellSum / TAU,
      gap: Math.abs(cellSum - boundary), sampledGap, aliasFree: sampledGap < 1e-9, nearest, rimNear, defined: rimNear > 1e-9, meshClear: nearest > 1e-9, inside: inside.length, vortices: cells.filter((c) => c.n !== 0).map((c) => [c.i, c.j, c.n]),
      U: Array.from({ length: nu + 1 }, (_, i) => U(i)), T: Array.from({ length: nt + 1 }, (_, j) => Tt(j)) };
    stokesCache.set(key, out);
    return out;
  }

  /* ---------- the prime-rotor sagittas ---------- */
  const EPS_MIN = 0.075, EPS_MAX = 0.5, EPS_STEP = 0.0025, NLAD = Math.round((EPS_MAX - EPS_MIN) / EPS_STEP);
  const SIG_N = 46, SIGS = Array.from({ length: SIG_N }, (_, k) => 0.5 + k / 100);
  const snapEps = (e) => EPS_MIN + EPS_STEP * Math.round((clamp(e, EPS_MIN, EPS_MAX) - EPS_MIN) / EPS_STEP);
  const ladderIndex = (e) => Math.round((snapEps(e) - EPS_MIN) / EPS_STEP);
  let sag = null;
  /** Σ_{p≤P} (1 − cos p^{−σ}) = Σ 2 sin²(p^{−σ}/2) for every σ sample and every horizon P = e^{1/ε} of the ladder;
      also Σ ln(1 − 1/p), Σ −ln(1 − p⁻²) and the number of primes. One sieve, one pass over the primes. */
  function sagitta() {
    if (sag) return sag;
    const pmax = Math.ceil(Math.exp(1 / EPS_MIN)), comp = new Uint8Array(pmax + 1);
    for (let i = 2; i * i <= pmax; i++) if (!comp[i]) for (let j = i * i; j <= pmax; j += i) comp[j] = 1;
    const sums = Array.from({ length: NLAD + 1 }, () => new Float64Array(SIG_N)), mert = new Float64Array(NLAD + 1), eul = new Float64Array(NLAD + 1), count = new Int32Array(NLAD + 1);
    const PS = Array.from({ length: NLAD + 1 }, (_, m) => Math.exp(1 / (EPS_MIN + EPS_STEP * m)));
    const acc = new Float64Array(SIG_N), first = [];
    let lm = 0, le = 0, n = 0, m = NLAD;                          // m runs from the smallest horizon (ε = 0.5) upwards
    const flush = (upto) => { while (m >= 0 && PS[m] < upto) { sums[m].set(acc); mert[m] = lm; eul[m] = le; count[m] = n; m--; } };
    for (let p = 2; p <= pmax; p++) {
      if (comp[p]) continue;
      flush(p);
      const lp = Math.log(p);
      for (let k = 0; k < SIG_N; k++) { const x = Math.exp(-SIGS[k] * lp), s = Math.sin(x / 2); acc[k] += 2 * s * s; }
      lm += Math.log1p(-1 / p); le -= Math.log1p(-1 / (p * p)); n++;
      if (first.length < 10) first.push({ p, v: 2 * Math.sin(1 / Math.sqrt(p) / 2) ** 2 });
    }
    flush(Infinity);
    sag = { PS, sums, mert, eul, count, first };
    return sag;
  }
  /** ζ(x) − 1 for real x > 1 (direct sum to 29 and an Euler–Maclaurin tail at 30). */
  function zetaMinus1(x) {
    const N = 30;
    let s = 0;
    for (let n = 2; n < N; n++) s += Math.exp(-x * Math.log(n));
    const Nx = Math.exp(-x * Math.log(N));
    s += N * Nx / (x - 1) + 0.5 * Nx;
    const B = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66];
    let poch = x, fact = 2, pw = Nx / N;
    for (let k = 1; k <= B.length; k++) { s += B[k - 1] / fact * poch * pw; poch *= (x + 2 * k - 1) * (x + 2 * k); fact *= (2 * k + 1) * (2 * k + 2); pw /= N * N; }
    return s;
  }
  const MU = [0, 1, -1, -1, 0, -1, 1, -1, 0, 0, 1, -1, 0, -1, 1, 1, 0, -1, 0, -1, 0, 1, 1, -1, 0, 0, 1, 0, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 1, 0, 1, 1, -1, 0, -1, 1, 0, 0];
  /** The prime zeta function P(s) = Σ_p p^{−s} = Σ μ(n)/n · ln ζ(ns), s > 1. */
  function primeZeta(s) {
    let sum = 0;
    for (let n = 1; n < MU.length; n++) { if (!MU[n]) continue; if (n * s * Math.LN2 > 48) break; sum += MU[n] / n * Math.log1p(zetaMinus1(n * s)); }
    return sum;
  }
  const limitCache = new Map();
  /** Σ_p (1 − cos p^{−σ}) summed to infinity, σ > ½: Σ_{k≥1} (−1)^{k+1} P(2kσ)/(2k)!. */
  function sagLimit(sig) {
    const key = sig.toFixed(4);
    if (limitCache.has(key)) return limitCache.get(key);
    let s = 0, f = 1;
    for (let k = 1; k <= 10; k++) { f *= (2 * k - 1) * (2 * k); const term = primeZeta(2 * k * sig) / f; s += k % 2 ? term : -term; if (term < 1e-18) break; }
    limitCache.set(key, s);
    return s;
  }
  /** What the sagitta scene reads at ε. */
  function sagittaAt(eps) {
    const sg = sagitta(), m = ladderIndex(eps), e = EPS_MIN + EPS_STEP * m, Pe = sg.PS[m], lnP = 1 / e;
    return { eps: e, P: Pe, primes: sg.count[m], sums: Array.from(sg.sums[m]), half: sg.sums[m][0], lead: 0.5 * Math.log(lnP) + C_SAG,
      mertens: Math.exp(sg.mert[m]) * lnP, eulerTwo: Math.exp(sg.eul[m]), first: sg.first.filter((x) => x.p <= Pe) };
  }

  /* ---------- state ---------- */
  const S = { scene: 'sagitta', lens: 'arc', eps: 0.075, delta: 0, ts: 25.5, up: 0.3, u0: 0.08, layers: 13, tau: 1 };
  const RAIL = {
    sagitta: { of: (t) => 0.5 * 0.15 ** t, to: (e) => Math.log(e / 0.5) / Math.log(0.15) },
    shell: { of: (t) => 0.02 + 0.4 * t, to: (u) => (u - 0.02) / 0.4 },
    stokes: { of: (t) => -0.2 + 0.5 * t, to: (u) => (u + 0.2) / 0.5 },
    bridge: { of: (t) => Math.round(13 * t), to: (l) => l / 13 }
  };
  /** Everything the page shows, from the state. */
  function model() {
    const layers = S.scene === 'bridge' ? S.layers : LAYERS;
    return {
      layers, sag: sagittaAt(S.eps), shell: shell(S.up, S.ts, S.eps, layers, S.delta), gram: layers >= 1 ? gram(layers, S.delta, S.up, S.ts) : null,
      split: S.scene === 'bridge' ? layerSplit(layers, S.delta, S.up, S.ts) : null, stokes: stokes(S.u0, S.eps, S.delta), mesh: meshDims(S.eps)
    };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const VIEWS = { sagitta: [-0.55, 0.46], shell: [-0.72, 0.5], stokes: [-1.0, 0.72], bridge: [-0.82, 0.58] };
  const options = { canvas: $('cv'), yaw: VIEWS.sagitta[0], pitch: VIEWS.sagitta[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 14, y: top, w: Math.max(40, W - 28), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
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
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 10 : o.r });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* the projection is fitted to the HUD-free rect from the scene's own outline; it is held while the handle drags */
  const FENCE_K = 0.42, FENCE_Y = Y(T_LO) - 0.03, SCREEN = { z0: 0.3, z1: 0.84 }, TOWER = { x: 1.24, dz: 0.045 };
  /** The t-range the camera frames: the whole block, or (shells, bridge) a magnified stretch around the slice. */
  function frameRange(scene) {
    if (scene === 'shell') { const a = clamp(S.ts - 4.2, T_LO, T_HI - 8.4); return [a, a + 8.4]; }
    if (scene === 'bridge') { const lo = Math.min(...gramNodes(S.up, S.ts).map((n) => n[1])) - 1.4, hi = Math.max(...gramNodes(S.up, S.ts).map((n) => n[1])) + 1.4; return [clamp(lo, T_LO, T_HI), clamp(hi, T_LO, T_HI)]; }
    return [T_LO, T_HI];
  }
  const towerY = () => Y(clamp(S.ts + 1.5, T_LO + 1, T_HI - 1));
  function fitPts(scene) {
    const pts = [], [t0, t1] = frameRange(scene), bottom = scene === 'shell' || scene === 'bridge' ? -A_DEPTH - 0.05 : BOT;
    for (const x of [-1, 1]) for (const y of [Y(t0), Y(t1)]) for (const z of [bottom, 0.04]) pts.push([x, y, z]);
    if (scene === 'sagitta') pts.push([0, FENCE_Y, 0.66], [1, FENCE_Y, 0.2]);
    if (scene === 'shell') for (const x of [-1, 1]) pts.push([x, Y(S.ts), SCREEN.z1 + 0.04]);
    if (scene === 'bridge') pts.push([TOWER.x + 0.08, towerY(), LAYERS * TOWER.dz + 0.1], [TOWER.x + 0.08, towerY(), 0]);
    return pts;
  }
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  }
  function fitTo(area, W, H) {
    const { R, U } = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of fitPts(S.scene)) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const px = 0.03 * (x1 - x0), py = 0.03 * (y1 - y0);
    const unit = Math.max(20, Math.min(area.w / (x1 - x0 + 2 * px), area.h / (y1 - y0 + 2 * py)));
    const u = unit * (sc.cam.zoom || 1);
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2 - u * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + u * (y0 + y1) / 2) / Math.max(1, H);
    return unit;
  }

  /** The terrain block: the lit top, its four walls, the mirror plane σ = ½ and the spine. */
  function drawTerrain(T) {
    const nr = T.ts.length, nc = T.us.length;
    const pts = T.ts.map((t, j) => T.us.map((u, i) => [X(u), Y(t), T.Z[j][i]]));
    sc.surface('top', pts, { value: (u, v) => T.neg[Math.round(v * (nr - 1))][Math.round(u * (nc - 1))], colors: [P.violet, P.magenta], range: [0, 1],
      grid: { every: [6, 100000], color: P.ink, alpha: 0.16 }, id: 'terrain' });
    const front = T.us.map((u, i) => [X(u), Y(T.ts[0]), T.Z[0][i]]), back = T.us.map((u, i) => [X(u), Y(T.ts[nr - 1]), T.Z[nr - 1][i]]);
    sc.surface('front', [front.map((p) => [p[0], p[1], BOT]), front], { color: P.violet, pick: false, grid: { every: [12, 1], color: P.ink, alpha: 0.12 } });
    sc.surface('back', [back.map((p) => [p[0], p[1], BOT]), back], { color: P.violet, pick: false });
    const side = (i) => T.ts.map((t, j) => [X(T.us[i]), Y(t), T.Z[j][i]]);
    sc.surface('left', [side(0).map((p) => [p[0], p[1], BOT]), side(0)], { color: P.violet, pick: false });
    sc.surface('right', [side(nc - 1).map((p) => [p[0], p[1], BOT]), side(nc - 1)], { color: P.violet, pick: false });
    // the mirror plane σ = ½ and the spine on the surface
    sc.surface('mirror', [[[0, Y(T_LO), BOT + 0.02], [0, Y(T_HI), BOT + 0.02]], [[0, Y(T_LO), 0.22], [0, Y(T_HI), 0.22]]], { color: P.sigma, alpha: 0.1, pick: false, occlude: false });
    const ic = T.us.indexOf(0);
    sc.line(T.ts.map((t, j) => [0, Y(t), T.Z[j][ic] + 0.006]), { color: P.sigma, width: 1.5, alpha: 0.85 });
    // the zeros: rings at the floors (σ = ½ in sigma, the quartet in magenta)
    GAMMAS.slice(0, Math.min(T.layers, 12)).forEach((g, k) => { if (g > T_LO && g < T_HI) sc.ring([0, Y(g), zmap(LN_FLOOR) + 0.012], { key: `zero${k + 1}`, color: P.sigma, r: 5, normal: [0, 0, 1] }); });
    if (T.layers >= 13 && T.delta > 0) for (const s of [1, -1]) sc.ring([X(s * T.delta), Y(G0), zAt(T, s * T.delta, G0) + 0.012], { key: s > 0 ? 'rogueR' : 'rogueL', color: P.magenta, r: 6, normal: [0, 0, 1] });
  }
  /** A polyline draped on the drawn surface, a little above it. */
  const drape = (T, pairs, lift = 0.01) => pairs.map(([u, t]) => [X(u), Y(t), zAt(T, u, t) + lift]);
  const along = (a, b, n) => Array.from({ length: n + 1 }, (_, k) => [a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
  /** Points of the segment (u, t₀) → (u, t₁) at every grid row, so that the drape follows the canyons. */
  const alongT = (T, u, t0, t1) => [[u, t0]].concat(T.ts.filter((t) => t > t0 && t < t1).map((t) => [u, t])).concat([[u, t1]]);

  let FRAME = null, FIT = null, HANDLE = null;
  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode, scene = S.scene, arc = S.lens === 'arc';
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FIT) { FIT = { area }; fitTo(area, W, H); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [], at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    HANDLE = null;
    const T = terrain(M.layers, S.delta);
    sc.begin();
    drawTerrain(T);
    if (scene === 'sagitta') drawSagitta(M, T, at, arc);
    else if (scene === 'shell') drawShell(M, T, at, arc);
    else if (scene === 'stokes') drawStokes(M, T, at, arc);
    else drawBridge(M, T, at, arc);
    if (scene !== 'sagitta') at([0, Y(T_HI), 0.02], 'σ = ½', 'raw c-sg backed', 4, [0.3, -1]);
    sc.end();

    const hq = !thumb && HANDLE ? sc.p(HANDLE) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = [W / 2, H / 2];
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* scene 1: the sagitta fence along the front edge (σ = ½ + u, u ≥ 0) */
  function drawSagitta(M, T, at, arc) {
    const g = M.sag, top = g.sums.map((v, k) => [X(SIGS[k] - 0.5), FENCE_Y, 0.02 + FENCE_K * v]);
    sc.surface('fence', [top.map((p) => [p[0], p[1], 0.02]), top], { value: (u) => clamp((u * (SIG_N - 1) - 0.5) / 4, 0, 1), colors: [P.magenta, P.cyan], range: [0, 1], pick: false,
      grid: { every: [5, 1], color: P.ink, alpha: 0.18 } });
    sc.line(top.map((p) => [p[0], p[1] - 0.004, p[2] + 0.004]), { color: P.ink, width: 1.2, alpha: 0.6 });
    sc.tube('halfColumn', [[0, FENCE_Y - 0.006, 0.02], [0, FENCE_Y - 0.006, 0.02 + FENCE_K * g.half]], { color: P.magenta, width: 6, glow: 0.5, pick: false, occlude: false });
    // the limits P → ∞ for σ ≥ 0.55 (dashed cyan) and the lead ½ ln ln P_ε + C_sag at σ = ½ (an ink tick)
    const lim = SIGS.filter((s) => s >= 0.55 - 1e-9).map((s) => [X(s - 0.5), FENCE_Y - 0.01, 0.02 + FENCE_K * sagLimit(s)]);
    sc.line(lim, { color: P.cyan, width: 1.6, dash: [5, 4] });
    const lead = [0, FENCE_Y - 0.01, 0.02 + FENCE_K * g.lead];
    sc.line([[-0.09, lead[1], lead[2]], [0.09, lead[1], lead[2]]], { color: P.ink, width: 2 });
    // the prime rotors: the single sagittas of 2, 3, 5, … stacked up the σ = ½ column
    let cum = 0;
    g.first.forEach((x, k) => { cum += x.v; sc.bead([0.012, FENCE_Y - 0.012, 0.02 + FENCE_K * cum], { key: `p${x.p}`, color: P.violet, r: k < 3 ? 3.8 : 2.8 }); });
    at([0, FENCE_Y, 0.02 + FENCE_K * g.half], arc ? `σ = ½ · Σ<sub>sag</sub> = ${fix(g.half, 4)}` : `σ = ½ · ½Σ1/p ≈ ${fix(g.half, 4)}`, 'raw c-mg backed', 10, [-1, -0.6]);
    at(lead, `½ ln ln P<sub>ε</sub> + C<sub>sag</sub> = ${fix(g.lead, 4)}`, 'raw c-ik backed', 8, [-1, 0.5]);
    at(lim[Math.round(lim.length * 0.45)], arc ? L('σ &gt; ½ 收敛 · 虚线 = P → ∞', 'σ &gt; ½ converges · dashed = P → ∞') : L('σ &gt; ½：Σp<sup>−2σ</sup> 收敛', 'σ &gt; ½: Σp<sup>−2σ</sup> converges'), 'raw c-cy backed', 9, [0.6, -1]);
    at([0.012, FENCE_Y, 0.02 + FENCE_K * (g.first[0] ? g.first[0].v : 0)], L('素数旋子 p = 2, 3, 5, …', 'prime rotors p = 2, 3, 5, …'), 'raw c-vi backed', 6, [1, 0.6]);
    at([X(0.3), Y(29), 0.02], L('五道峡谷 γ₁ … γ₅', 'five canyons γ₁ … γ₅'), 'raw c-sg backed', 5, [0.5, -1]);
    at([X(-0.3), Y(18), 0.02], `P<sub>ε</sub> = e<sup>1/ε</sup> = ${sci(g.P, 2)}`, 'raw c-ik backed', 7, [-0.6, -1]);
  }

  /* scene 2: the slice screen, its profile and the dual shells; the Gram nodes on the surface */
  function screenMap(lo, hi) { const pad = 0.05 * (hi - lo || 1); return (v) => SCREEN.z0 + 0.04 + (SCREEN.z1 - SCREEN.z0 - 0.08) * (v - lo + pad) / (hi - lo + 2 * pad || 1); }
  let SHELLVIEW = null;
  function drawShell(M, T, at, arc) {
    const t = S.ts, y = Y(t), sh = M.shell, w0 = sh.W0;
    const us = Array.from({ length: 91 }, (_, k) => -U_MAX + 0.01 * k), R = us.map((u) => Math.exp(ln2F(u, t, M.layers, S.delta)) / w0);
    const outerN = sh.outer / w0, mirrorN = sh.mirror / w0, lo = Math.min(...R, outerN, mirrorN), hi = Math.max(...R, outerN, mirrorN), zs = screenMap(lo, hi);
    sc.fan([[-1, y, SCREEN.z0], [1, y, SCREEN.z0], [1, y, SCREEN.z1], [-1, y, SCREEN.z1]], { fill: P.void, alpha: 0.62, color: P.lineHot, width: 1 });
    // the profile on the screen: cyan where it rises outwards, magenta where it sinks
    let run = [], rising = null;
    const flush = () => { if (run.length > 1) sc.line(run, { color: rising ? P.cyan : P.magenta, width: 2.2 }); };
    us.forEach((u, k) => {
      const out = Math.sign(u) * radial(u || 1e-9, t, M.layers, S.delta) >= 0 || u === 0, p = [X(u), y - 0.006, zs(R[k])];
      if (rising !== null && out !== rising) { run.push(p); flush(); run = []; }
      rising = out; run.push(p);
    });
    flush();
    sc.line([[0, y - 0.005, SCREEN.z0], [0, y - 0.005, SCREEN.z1]], { color: P.sigma, width: 1, alpha: 0.55, dash: [3, 3] });
    // the screen stands on two posts at the rim
    for (const x of [-1, 1]) sc.line([[x, y, 0], [x, y, SCREEN.z0]], { color: P.lineHot, width: 1.2, alpha: 0.9 });
    // the cut on the surface
    sc.line(drape(T, along([-U_MAX, t], [U_MAX, t], 90), 0.008), { color: P.sigma, width: 1.4, alpha: 0.8 });
    // the dual shells at ±u: beads on the screen at |E_ε(½ ± u + it)|²/W₀ and the bar of their difference
    const up = S.up, pos = sh.delta >= 0, xo = X(up), xm = X(-up);
    const pO = [xo, y - 0.012, zs(outerN)], pM = [xm, y - 0.012, zs(mirrorN)];
    sc.bead(pO, { key: 'outerShell', color: pos ? P.cyan : P.magenta, r: 5.5 });
    sc.bead(pM, { key: 'mirrorShell', color: P.sigma, r: 5 });
    sc.line([pM, [xo + 0.06, pM[1], pM[2]]], { color: P.ink, width: 1.1, alpha: 0.75, dash: [4, 3] });
    sc.line([[xo + 0.06, y - 0.012, pM[2]], [xo + 0.06, y - 0.012, pO[2]]], { color: pos ? P.cyan : P.magenta, width: 3.4 });
    for (const s of [1, -1]) {
      const foot = [X(s * up), y, zAt(T, s * up, t) + 0.012];
      sc.ring(foot, { key: s > 0 ? 'probeR' : 'probeL', color: P.ink, r: 4.5, normal: [0, 0, 1] });
      sc.line([foot, s > 0 ? pO : pM], { color: P.ink, width: 1, alpha: 0.5, dash: [3, 4] });
    }
    drawNodes(M, T, false);
    at(pO, arc ? `|E<sub>ε</sub>(½ + u + it)|²` : `|E(s)|`, pos ? 'raw c-cy backed' : 'raw c-mg backed', 8, [1, -0.8]);
    at(pM, arc ? `|E<sub>ε</sub>(½ − u + it)|²` : `|E<sup>#</sup>(s)|`, 'raw c-sg backed', 7, [-1, -0.6]);
    at([xo + 0.06, y, (pO[2] + pM[2]) / 2], `Δ<sub>ε</sub><sup>HB</sup> ${relOf(sh)} 0`, pos ? 'raw c-cy backed' : 'raw c-mg backed', 9, [1, 0.2]);
    at([X(-0.9 * U_MAX), y, SCREEN.z1], `t = ${fix(t, 2)} · |ξ|²/W₀`, 'raw c-ik backed', 6, [-0.3, -1]);
    if (M.layers >= 13 && S.delta > 0) at([X(S.delta), Y(G0), zAt(T, S.delta, G0)], L(`假想四元组 δ = ${fix(S.delta, 3)}`, `hypothetical quartet δ = ${fix(S.delta, 3)}`), 'raw c-mg backed', 9, [0.6, 1]);
    SHELLVIEW = { lo, hi, outer: outerN, mirror: mirrorN, rising: R.length };
    HANDLE = [X(U_MAX) + 0.07, y, 0.02];
  }
  /** The four Gram nodes on the surface (beads), and in the bridge the kernel chords between them. */
  function drawNodes(M, T, chords) {
    const G = M.gram;
    if (!G) return;
    const pts = G.nodes.map(([u, t]) => [X(u), Y(t), zAt(T, u, t) + 0.03]);
    const ok = G.lamMin >= -1e-9;
    if (chords) for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) {
      const m = Math.hypot(G.N.re[a][b], G.N.im[a][b]), lift = (p) => [p[0], p[1], p[2] + 0.06];
      sc.line([lift(pts[a]), v3.add(v3.lerp(lift(pts[a]), lift(pts[b]), 0.5), [0, 0, 0.05]), lift(pts[b])], { color: ok ? P.cyan : P.magenta, width: 0.8 + 2.4 * clamp(m, 0, 1), alpha: 0.85 });
    }
    pts.forEach((p, a) => sc.bead(chords ? [p[0], p[1], p[2] + 0.06] : p, { key: `node${a + 1}`, color: G.diag[a] < 0 ? P.magenta : a >= 2 ? P.violet : P.cyan, r: a === 0 ? 4.6 : 3.8 }));
    return pts;
  }

  /* scene 3: the Stokes box and its mesh */
  function drawStokes(M, T, at, arc) {
    const st = M.stokes;
    // interior mesh lines (ink), then the boundary (cyan)
    for (let i = 1; i < st.nu; i++) sc.line(drape(T, alongT(T, st.U[i], BOX.t0, BOX.t1)), { color: P.ink, width: 1.1, alpha: 0.55 });
    for (let j = 1; j < st.nt; j++) sc.line(drape(T, along([st.U[0], st.T[j]], [BOX.uR, st.T[j]], 40)), { color: P.ink, width: 1.1, alpha: 0.55 });
    const rim = drape(T, along([st.U[0], BOX.t0], [BOX.uR, BOX.t0], 40), 0.014)
      .concat(drape(T, alongT(T, BOX.uR, BOX.t0, BOX.t1), 0.014))
      .concat(drape(T, along([BOX.uR, BOX.t1], [st.U[0], BOX.t1], 40), 0.014))
      .concat(drape(T, alongT(T, st.U[0], BOX.t0, BOX.t1).reverse(), 0.014));
    sc.tube('rim', rim.filter((p, k) => !k || v3.len(v3.sub(p, rim[k - 1])) > 1e-9), { color: P.cyan, width: 3.2, glow: 0.45, pick: false, occlude: false });
    const nTxt = st.defined ? fix(st.N, 4) : '—';
    at([X(BOX.uR), Y(BOX.t1), zAt(T, BOX.uR, BOX.t1)], `N(∂R) = ${nTxt}`, 'raw c-cy backed', 10, [1, -1]);
    at([X(st.U[0]), Y(BOX.t0), zAt(T, st.U[0], BOX.t0)], `u₀ = ${sgnFix(S.u0, 3)}`, 'raw c-sg backed', 8, [-0.6, 1]);
    at([X((st.U[0] + BOX.uR) / 2), Y(BOX.t0 + (BOX.t1 - BOX.t0) * 0.62), zAt(T, (st.U[0] + BOX.uR) / 2, 26)],
      arc ? L(`${st.nu} × ${st.nt} 胞 · 内棱正反相消`, `${st.nu} × ${st.nt} cells · interior arcs cancel`) : L(`辐角原理 · ${st.nu} × ${st.nt} 胞`, `argument principle · ${st.nu} × ${st.nt} cells`), 'raw c-ik backed', 7, [0.4, -1]);
    HANDLE = [X(st.U[0]), Y((BOX.t0 + BOX.t1) / 2), zAt(T, st.U[0], (BOX.t0 + BOX.t1) / 2) + 0.02];
  }

  /* scene 4: the layers multiplied in, the Gram web and the tower of layers */
  function drawBridge(M, T, at, arc) {
    const pts = drawNodes(M, T, true), G = M.gram, sp = M.split;
    sc.line(drape(T, along([-U_MAX, S.ts], [U_MAX, S.ts], 90), 0.008), { color: P.sigma, width: 1.2, alpha: 0.6, dash: [5, 4] });
    // the tower: one disc per layer, cyan for an on-line pair, magenta for the quartet; layers not yet in are dim rings
    for (let k = 1; k <= LAYERS; k++) {
      const p = [TOWER.x, towerY(), 0.02 + k * TOWER.dz], quart = k === 13, inn = k <= S.layers, none = quart && !(S.delta > 0);
      if (inn && !none) sc.bead(p, { key: `layer${k}`, color: quart ? P.magenta : P.cyan, r: 4.4 });
      else sc.ring(p, { key: `layer${k}`, color: P.dim, r: 4, normal: [0, 0, 1] });
    }
    sc.line([[TOWER.x, towerY(), 0], [TOWER.x, towerY(), 0.02 + (LAYERS + 0.6) * TOWER.dz]], { color: P.ink, width: 1, alpha: 0.45 });
    if (pts && G) {
      const ok = G.lamMin >= -1e-9;
      at(pts[0], arc ? `λ<sub>min</sub>(K<sub>ε</sub>) = ${fix(G.lamMin, 4)}` : `λ<sub>min</sub>(K) = ${fix(G.lamMin, 4)}`, ok ? 'raw c-cy backed' : 'raw c-mg backed', 10, [-0.6, -1]);
    }
    at([TOWER.x, towerY(), 0.02 + (S.layers + 0.5) * TOWER.dz], `L = ${S.layers}`, 'raw c-ik backed', 9, [1, -0.4]);
    if (sp) at([TOWER.x, towerY(), 0.02 + 13 * TOWER.dz], sp.kind === 'quartet' ? L('第 13 层：离轴四元组', 'layer 13: off-line quartet') : sp.kind === 'none' ? L('第 13 层：无（δ = 0）', 'layer 13: none (δ = 0)') : L('临界线因子层', 'on-line pair layers'),
      sp.kind === 'quartet' ? 'raw c-mg backed' : 'raw c-cy backed', 7, [1, -1]);
    HANDLE = [X(U_MAX) + 0.07, Y(S.ts), 0.02];
  }

  /* ---------- the handle: the slice t (shell, bridge) or the left edge u₀ (stokes) ---------- */
  const handle = $('stageHandle');
  let dragging = null;
  const handleKind = () => (S.scene === 'stokes' ? 'u0' : S.scene === 'shell' || S.scene === 'bridge' ? 'ts' : null);
  function placeHandle(q) {
    const show = !!q && !TRV.still && !!handleKind();
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    handle.setAttribute('aria-label', handleKind() === 'u0' ? L('拖动琥珀圆环移动检验框左界 u₀', 'Drag the amber ring to move the left edge u₀ of the box') : L('拖动琥珀圆环移动切面 t', 'Drag the amber ring to move the slice t'));
  }
  /** The anchor of a parameter value: the slice meets the right rim, or the middle of the left edge of the box. */
  function anchorOf(kind, v) {
    const T = terrain(S.scene === 'bridge' ? S.layers : LAYERS, S.delta);
    return kind === 'u0' ? [X(v), Y((BOX.t0 + BOX.t1) / 2), zAt(T, v, (BOX.t0 + BOX.t1) / 2) + 0.02] : [X(U_MAX) + 0.07, Y(v), 0.02];
  }
  function paramAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left - stageEl.clientLeft, y = ev.clientY - b.top - stageEl.clientTop, kind = handleKind();
    let best = kind === 'u0' ? S.u0 : S.ts, bd = Infinity;
    const n = kind === 'u0' ? 100 : 346;
    for (let k = 0; k <= n; k++) {
      const v = kind === 'u0' ? -0.2 + 0.005 * k : T_SLICE[0] + 0.05 * k, q = sc.p(anchorOf(kind, v)), d = Math.hypot(q[0] - x, q[1] - y);
      if (d < bd) { bd = d; best = v; }
    }
    return best;
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
    const v = paramAt(ev);
    if (handleKind() === 'u0') setU0(v); else setTs(v);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const k = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    if (handleKind() === 'u0') setU0(S.u0 + 0.005 * k); else setTs(S.ts + 0.05 * k);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE_NAMES = { sagitta: ['矢高相变', 'Sagitta transition'], shell: ['双壳旋子步', 'Dual-shell step'], stokes: ['有限网格斯托克斯', 'Finite-mesh Stokes'], bridge: ['乘性枢轴层', 'Multiplicative layers'] };
  const ZFC_NAMES = { sagitta: ['梅滕斯第二定理', 'Second theorem of Mertens'], shell: ['埃尔米特—比勒', 'Hermite–Biehler'], stokes: ['辐角原理', 'Argument principle'], bridge: ['德布朗热核', 'de Branges kernel'] };
  function legendOf(M) {
    const rogue = M.layers >= 13 && S.delta > 0;
    if (S.scene === 'sagitta') return [['mg', L('σ = ½ 矢高（发散）', 'σ = ½ sagitta (diverges)')], ['cy', L('σ &gt; ½ 与极限虚线', 'σ &gt; ½, dashed limit')], ['vi', L('势面与素数旋子', 'terrain, prime rotors')], ['ik', '½ ln ln P<sub>ε</sub> + C<sub>sag</sub>']];
    if (S.scene === 'shell') return [['vi', L('对数径向势面', 'log radial terrain')], ['cy', L('外翼上升 Δ &gt; 0', 'rising wings Δ &gt; 0')]].concat(rogue ? [['mg', L('内陷沟 Δ &lt; 0', 'sinking trough Δ &lt; 0')]] : []).concat([['ik', L('镜面 σ = ½ 与切面', 'mirror σ = ½, slice')]]);
    if (S.scene === 'stokes') return [['cy', L('外边界 ∂R', 'outer rim ∂R')], ['ik', L('内棱（正反相消）', 'interior arcs (cancel)')], ['vi', L('势面', 'terrain')]].concat(rogue ? [['mg', L('假想离轴零点', 'hypothetical off-line zeros')]] : []);
    const ok = M.gram && M.gram.lamMin >= -1e-9;
    return [['vi', L('势面', 'terrain')], [ok ? 'cy' : 'mg', ok ? L('核半正定 λ<sub>min</sub> ≥ 0', 'kernel PSD λ<sub>min</sub> ≥ 0') : L('核失去正定 λ<sub>min</sub> &lt; 0', 'kernel not PSD λ<sub>min</sub> &lt; 0')], ['ik', L('Gram 节点与层塔', 'Gram nodes, layer tower')]];
  }
  /** The sign of Δ_ε^HB as a relation to 0 (= 0 when it vanishes to rounding, e.g. with the probe on a zero). */
  const relOf = (sh) => (Math.abs(sh.delta) <= 1e-12 * (sh.outer + sh.mirror) ? '=' : sh.delta > 0 ? '&gt;' : '&lt;');
  function hudText(M) {
    const sc0 = S.scene, name = L(...(S.lens === 'arc' ? SCENE_NAMES : ZFC_NAMES)[sc0]), g = M.sag, sh = M.shell, st = M.stokes, G = M.gram;
    let big, sub;
    if (sc0 === 'sagitta') {
      big = `${name} · P<sub>ε</sub> = ${sci(g.P, 2)}`;
      sub = L(`ε = ${fix(g.eps, 4)} · σ = ½：Σ<sub>sag</sub> = ${fix(g.half, 4)}，σ &gt; ½ 收敛`, `ε = ${fix(g.eps, 4)} · σ = ½: Σ<sub>sag</sub> = ${fix(g.half, 4)}; σ &gt; ½ converges`);
    } else if (sc0 === 'shell') {
      big = `${name} · Δ<sub>ε</sub><sup>HB</sup> ${relOf(sh)} 0`;
      sub = `u = ${fix(S.up, 3)} · t = ${fix(S.ts, 2)} · λ<sub>min</sub> = ${G ? fix(G.lamMin, 4) : '—'}`;
    } else if (sc0 === 'stokes') {
      big = `${name} · N(∂R) = ${st.defined ? fix(st.N, 4) : '—'}`;
      sub = st.defined ? L(`u₀ = ${sgnFix(S.u0, 3)} · ${st.nu} × ${st.nt} 胞 · 框内零点 ${st.inside}`, `u₀ = ${sgnFix(S.u0, 3)} · ${st.nu} × ${st.nt} cells · ${st.inside} zeros inside`)
        : L(`u₀ = ${sgnFix(S.u0, 3)}：边界穿过零点，绕数无定义`, `u₀ = ${sgnFix(S.u0, 3)}: the rim runs through zeros, no winding number`);
    } else {
      big = `${name} · L = ${S.layers}`;
      sub = `λ<sub>min</sub>(K) = ${G ? fix(G.lamMin, 4) : '—'} · ${M.split ? (M.split.kind === 'quartet' ? L('第 13 层：离轴四元组', 'layer 13: off-line quartet') : M.split.kind === 'none' ? L('第 13 层：无', 'layer 13: none') : L(`第 ${S.layers} 层：γ<sub>${S.layers}</sub> 处的一对`, `layer ${S.layers}: the pair at γ<sub>${S.layers}</sub>`)) : L('尚无一层', 'no layer yet')}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendOf(M).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const FORMULA = {
    sagitta: 'Σ<sub>sag</sub>(σ; P<sub>ε</sub>) = Σ<sub>p≤P<sub>ε</sub></sub> (1 − cos p<sup>−σ</sup>) · σ = ½: ½ ln ln P<sub>ε</sub> + C<sub>sag</sub>',
    shell: 'Δ<sub>ε</sub><sup>HB</sup> = |E<sub>ε</sub>(½ + u + it)|² − |E<sub>ε</sub>(½ − u + it)|² = 2ε Re(ξ̄ξ′) = 4uε K(s, s)',
    stokes: 'N(∂R) = (1/2π) Σ<sub>e⊂∂R</sub> φ(e) · φ(AB) + φ(BA) = 0',
    bridge: 'K<sub>Mξ</sub> = (M ⊗ M̄)∘K<sub>ξ</sub> + (ξ ⊗ ξ̄)∘K<sub>M</sub> · S = A − BC<sup>−1</sup>B*'
  };
  function drawText(M) {
    const g = M.sag, sh = M.shell, st = M.stokes, G = M.gram, arc = S.lens === 'arc';
    const keys = {
      sagitta: [arc ? L('σ = ½ 的矢高总和 Σ<sub>sag</sub>(½; P<sub>ε</sub>)', 'Sagitta sum Σ<sub>sag</sub>(½; P<sub>ε</sub>) at σ = ½') : L('½ Σ<sub>p≤P</sub> 1/p 的双对数增长', 'Double-log growth of ½ Σ<sub>p≤P</sub> 1/p'), fix(g.half, 5), ` · ${L('主项', 'lead')} ${fix(g.lead, 5)}`],
      shell: [arc ? L('双壳差 Δ<sub>ε</sub><sup>HB</sup>（÷ W₀）', 'Dual-shell defect Δ<sub>ε</sub><sup>HB</sup> (÷ W₀)') : L('|E|² − |E<sup>#</sup>|²（÷ W₀）', '|E|² − |E<sup>#</sup>|² (÷ W₀)'), sci(sh.delta / sh.W0, 3), ` · ${sh.delta >= 0 ? L('外壳更高', 'outer shell higher') : L('外壳更低', 'outer shell lower')}`],
      stokes: [arc ? L('有限网格斯托克斯绕数 N(∂R)', 'Finite-mesh Stokes winding N(∂R)') : L('辐角原理 N = Δarg/2π', 'Argument principle N = Δarg/2π'), st.defined ? fix(st.N, 4) : '—', ` · ${L('框内零点', 'zeros inside')} ${st.inside}`],
      bridge: [L('核 Gram 矩阵 λ<sub>min</sub>（归一化）', 'Kernel Gram λ<sub>min</sub> (normalized)'), G ? fix(G.lamMin, 4) : '—', ` · L = ${S.layers}`]
    }[S.scene];
    $('roKeyLabel').innerHTML = keys[0]; $('roKey').innerHTML = keys[1]; $('roKeySub').innerHTML = keys[2];
    $('roSagLabel').innerHTML = arc ? L('矢高相变：σ = ½ 对 σ &gt; ½', 'Sagitta transition: σ = ½ against σ &gt; ½') : L('梅滕斯第二定理与 Σp<sup>−2σ</sup>', 'Mertens II and Σp<sup>−2σ</sup>');
    $('roSag').innerHTML = `P<sub>ε</sub> = ${sci(g.P, 2)} (${g.primes} ${L('个素数', 'primes')}) · σ = ½: ${fix(g.half, 5)} · σ = 0.6: ${fix(g.sums[10], 5)} → ${fix(sagLimit(0.6), 5)}`;
    $('roShellLabel').innerHTML = arc ? L('双壳旋子步：三种算法', 'Dual-shell step: three ways') : L('Lagarias：Re(ξ′/ξ) &gt; 0', 'Lagarias: Re(ξ′/ξ) &gt; 0');
    $('roShell').innerHTML = `|E|² − |E<sup>#</sup>|² = ${sci(sh.delta, 4)} · 2ε Re(ξ̄ξ′) = ${sci(sh.identity, 4)} · 4uεK(s, s) = ${sci(sh.kernel, 4)}`;
    $('roGramLabel').innerHTML = arc ? L('比较格拉姆核 K<sub>ε</sub>（4 × 4，与 ε 无关）', 'Comparison Gram kernel K<sub>ε</sub> (4 × 4, independent of ε)') : L('德布朗热核与舒尔补（枢轴 s₃, s₄）', 'de Branges kernel and Schur complement (pivots s₃, s₄)');
    $('roGram').innerHTML = G ? `λ = ${G.ev.map((x) => fix(x, 4)).join(', ')} · λ(C) = ${G.schur.cEv.map((x) => fix(x, 3)).join(', ')} · λ(S) = ${G.schur.ev.map((x) => fix(x, 4)).join(', ')}` : '—';
    $('roStokesLabel').innerHTML = arc ? L('共棱相消（d² = 0）', 'Shared arcs cancel (d² = 0)') : L('辐角原理：边界和与胞和', 'Argument principle: rim and cells');
    $('roStokes').innerHTML = st.defined ? `${st.nu} × ${st.nt}, ${st.edges} ${L('条棱', 'edges')} · ${L('内棱', 'interior')} ${st.interior}: max|φ(AB) + φ(BA)| = ${st.cancel === 0 ? '0' : sci(st.cancel, 1)} · Σ ${L('胞', 'cells')}/2π = ${fix(st.cellN, 4)} · ${!st.meshClear ? L('有内棱穿过零点（相邻两胞各记一半）', 'an interior arc runs through a zero (half to each cell)') : st.aliasFree ? L('顶点采样不混叠', 'vertex sampling does not alias') : L('顶点采样混叠', 'vertex sampling aliases')}`
      : L('边界穿过零点：相位无定义', 'the rim runs through a zero: no phase');
    $('roEulerLabel').innerHTML = arc ? L('欧拉旋子乘积与梅滕斯第三定理', 'Euler rotor product and Mertens III') : L('欧拉乘积（s = 2）与梅滕斯第三定理', 'Euler product (s = 2) and Mertens III');
    $('roEuler').innerHTML = `∏(1 − p<sup>−2</sup>)<sup>−1</sup> = ${fix(g.eulerTwo, 6)} (π²/6 = ${fix(PI * PI / 6, 6)}) · ∏(1 − 1/p)·ln P<sub>ε</sub> = ${fix(g.mertens, 5)} (e<sup>−γ</sup> = ${fix(Math.exp(-EULER_GAMMA), 5)})`;
    $('roNote').innerHTML = L(...NOTES_RO[S.scene]);
    const pill = { sagitta: ['ε', fix(g.eps, 4)], shell: ['u', fix(S.up, 3)], stokes: ['u₀', sgnFix(S.u0, 3)], bridge: ['L', `${S.layers}`] }[S.scene];
    $('scenePill').innerHTML = `${pill[0]} <strong>${pill[1]}</strong>`;
    $('keyPill').innerHTML = `N <strong>${st.defined ? fix(st.N, 4) : '—'}</strong>`;
    $('hint').innerHTML = handleKind() === 'u0' ? L('拖琥珀圆环移动左界 u₀ · 拖空白处转视角', 'drag the amber ring to move u₀ · drag empty space to orbit')
      : handleKind() === 'ts' ? L('拖琥珀圆环移动切面 t · 拖空白处转视角', 'drag the amber ring to move the slice t · drag empty space to orbit') : L('拖空白处转视角', 'drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.scene];
  }
  const NOTES_RO = {
    sagitta: ['σ = ½ 一列与主项只差 O(1/ln P)；C<sub>sag</sub> = M/2 + Σ<sub>p</sub>[1 − cos p<sup>−1/2</sup> − 1/(2p)] = 0.1121458。σ &gt; ½ 的虚线是 P → ∞ 的极限（素数 ζ 函数）。', 'The σ = ½ column differs from the lead by O(1/ln P); C<sub>sag</sub> = M/2 + Σ<sub>p</sub>[1 − cos p<sup>−1/2</sup> − 1/(2p)] = 0.1121458. The dashed line right of σ = ½ is the limit P → ∞ (prime zeta function).'],
    shell: ['K 与 ε 无关：E<sub>ε</sub>(s)Ē<sub>ε</sub>(w) − E<sub>ε</sub><sup>#</sup>(s)Ē<sub>ε</sub><sup>#</sup>(w) = ε(ξ′(s)ξ̄(w) + ξ(s)ξ̄′(w))。模型的零点都在临界线上时 λ<sub>min</sub> ≥ 0；注入离轴四元组后一个节点落进沟里，λ<sub>min</sub> &lt; 0。', 'K does not depend on ε: E<sub>ε</sub>(s)Ē<sub>ε</sub>(w) − E<sub>ε</sub><sup>#</sup>(s)Ē<sub>ε</sub><sup>#</sup>(w) = ε(ξ′(s)ξ̄(w) + ξ(s)ξ̄′(w)). With every zero of the model on the line, λ<sub>min</sub> ≥ 0; with an off-line quartet a node falls into the trough and λ<sub>min</sub> &lt; 0.'],
    stokes: ['每条棱的相位只算一次（16 个子步，每步是直线段上精确的连续相位），反方向取负；所以内棱两两相消到 0，网格多粗都一样。数的是模型的零点。', 'Each edge phase is computed once (16 substeps, each the exact continuous phase of a straight piece) and negated for the reverse; interior arcs therefore cancel to 0 however coarse the mesh. It counts the zeros of the model.'],
    bridge: ['乘一层 M，核加一项 (ξ ⊗ ξ̄)∘K<sub>M</sub>（舒尔乘积）：K<sub>M</sub> 半正定的层保持正性。临界线因子层都是这样；离轴四元组那层的 K<sub>M</sub> 不定。对真正的 ξ 证明正性是开放问题。', 'Multiplying a layer M adds (ξ ⊗ ξ̄)∘K<sub>M</sub> to the kernel (a Schur product): a layer with K<sub>M</sub> PSD keeps positivity. Every on-line pair layer is such; the off-line quartet layer has an indefinite K<sub>M</sub>. Proving positivity for the true ξ is open.']
  };

  /* ---------- strip plot ---------- */
  const PLOTS = {
    sagitta: ['矢高总和对 ln ln P<sub>ε</sub>：只有 σ = ½ 一直涨', 'Sagitta sum against ln ln P<sub>ε</sub>: only σ = ½ keeps climbing'],
    shell: ['沿切面的双壳差 Δ<sub>ε</sub><sup>HB</sup>(u)/W₀：何处为负', 'The dual-shell defect Δ<sub>ε</sub><sup>HB</sup>(u)/W₀ along the slice: where it turns negative'],
    stokes: ['左界 u₀ 移动时边界数出的零点 N(∂R)', 'Zeros counted by the rim N(∂R) as the left edge u₀ moves'],
    bridge: ['每乘一层，核的 λ<sub>min</sub>（归一化）', 'λ<sub>min</sub> of the kernel (normalized) as layers are multiplied in']
  };
  let PLOT = null;
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22], sc0 = S.scene;
    $('plotTitle').innerHTML = L(...PLOTS[sc0]);
    let meta = '';
    PLOT = { scene: sc0 };
    if (sc0 === 'sagitta') {
      const sg = sagitta(), xs = [], half = [], s6 = [], s75 = [];
      for (let m = NLAD; m >= 0; m--) { const x = Math.log(1 / (EPS_MIN + EPS_STEP * m)); xs.push(x); half.push([x, sg.sums[m][0]]); s6.push([x, sg.sums[m][10]]); s75.push([x, sg.sums[m][25]]); }
      const g = kit.plot(cv, { x: [xs[0], xs[xs.length - 1]], y: [0.2, 1.6], pad });
      g.axes({ xTicks: [1, 1.5, 2, 2.5], yTicks: [0.4, 0.8, 1.2, 1.6], xLabel: 'ln ln P' });
      g.line([[xs[0], 0.5 * xs[0] + C_SAG], [xs[xs.length - 1], 0.5 * xs[xs.length - 1] + C_SAG]], P.ink, { width: 1.2, dash: [4, 4] });
      g.line(half, P.magenta, { width: 2.2 });
      g.line(s6, P.cyan, { width: 2 }); g.line(s75, P.cyan, { width: 1.6, alpha: 0.75 });
      g.hline(sagLimit(0.6), P.cyan, { dash: [3, 4], width: 1, alpha: 0.7 }); g.hline(sagLimit(0.75), P.cyan, { dash: [3, 4], width: 1, alpha: 0.7 });
      g.vline(Math.log(1 / M.sag.eps), P.sigma, { alpha: 0.8 });
      const xe = xs[xs.length - 1] - 0.03;
      g.text(xe, 1.53, 'σ = ½', P.magenta, { align: 'right', size: 10.5 });
      g.text(xe, sagLimit(0.6) + 0.12, 'σ = 0.6', P.cyan, { align: 'right', size: 10.5 });
      g.text(xe, sagLimit(0.75) + 0.12, 'σ = 0.75', P.cyan, { align: 'right', size: 10.5 });
      meta = `σ = ½: ${fix(M.sag.half, 4)} · ${L('主项', 'lead')} ${fix(M.sag.lead, 4)}`;
    } else if (sc0 === 'shell') {
      const us = Array.from({ length: 85 }, (_, k) => 0.01 + 0.005 * k), vals = us.map((u) => { const s = shell(u, S.ts, S.eps, M.layers, S.delta); return [u, s.delta / s.W0]; });
      let lo = Math.min(0, ...vals.map((p) => p[1])), hi = Math.max(0, ...vals.map((p) => p[1]));
      const span = hi - lo || 1; lo -= 0.12 * span; hi += 0.12 * span;
      const g = kit.plot(cv, { x: [0, 0.45], y: [lo, hi], pad });
      g.axes({ xTicks: [0, 0.1, 0.2, 0.3, 0.4], yTicks: [], xLabel: 'u' });
      g.hline(0, P.dim, { width: 1 });
      let run = [], pos = null;
      const flush = () => { if (run.length > 1) g.line(run, pos ? P.cyan : P.magenta, { width: 2.2 }); };
      vals.forEach((p) => { const s = p[1] >= 0; if (pos !== null && s !== pos) { run.push(p); flush(); run = []; } pos = s; run.push(p); });
      flush();
      g.vline(S.up, P.sigma, { alpha: 0.8 }); g.dot(S.up, M.shell.delta / M.shell.W0, P.sigma, 3.6);
      meta = `t = ${fix(S.ts, 2)} · ε = ${fix(S.eps, 4)} · ${vals.some((p) => p[1] < 0) ? L('有负段', 'has a negative stretch') : L('处处为正', 'positive throughout')}`;
      PLOT.negative = vals.filter((p) => p[1] < 0).map((p) => p[0]);
    } else if (sc0 === 'stokes') {
      const ns = rimCurve(S.eps, S.delta);
      const g = kit.plot(cv, { x: [-0.2, 0.3], y: [-0.6, 6.6], pad });
      g.axes({ xTicks: [-0.2, -0.1, 0, 0.1, 0.2, 0.3], yTicks: [0, 1, 5, 6], xLabel: 'u₀' });
      g.vline(0, P.sigma, { dash: [3, 3], alpha: 0.6 });
      let run = [];
      const flush = () => { if (run.length > 1) g.line(run, P.cyan, { width: 2.2 }); run = []; };
      ns.forEach((p) => { if (Number.isFinite(p[1])) run.push(p); else flush(); });
      flush();
      g.vline(S.u0, P.sigma, { alpha: 0.8 }); if (M.stokes.defined) g.dot(S.u0, M.stokes.N, P.sigma, 3.6);
      meta = `N = ${M.stokes.defined ? fix(M.stokes.N, 4) : '—'} · ${M.stokes.nu} × ${M.stokes.nt}`;
      PLOT.steps = ns.filter((p) => Number.isFinite(p[1])).map((p) => [p[0], Math.round(p[1])]);
    } else {
      const lad = ladderOf(S.delta, S.up, S.ts), lo = Math.min(-0.2, ...lad) * 1.15, hi = Math.max(0.2, ...lad) * 1.15;
      const g = kit.plot(cv, { x: [0.4, 13.6], y: [lo, hi], pad });
      g.axes({ xTicks: [1, 4, 8, 12, 13], yTicks: [0], xLabel: 'L' });
      g.hline(0, P.dim, { width: 1 });
      lad.forEach((v, k) => g.rect(k + 1 - 0.32, Math.min(0, v), k + 1 + 0.32, Math.max(0, v), v >= -1e-9 ? P.cyan : P.magenta, { alpha: k + 1 <= S.layers ? 0.95 : 0.3 }));
      g.vline(S.layers, P.sigma, { alpha: 0.8 });
      meta = `L = ${S.layers} · λ<sub>min</sub> = ${M.gram ? fix(M.gram.lamMin, 4) : '—'}`;
      PLOT.ladder = lad;
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const RATES = { sagitta: 0.1, shell: 0.12, stokes: 0.1, bridge: 0.08 };
  const STEPS = { sagitta: 1 / 40, shell: 1 / 40, stokes: 1 / 100, bridge: 1 / 13 };
  const playBtn = $('playBtn');
  const railText = (t) => {
    if (S.scene === 'sagitta') return `ε ${fix(snapEps(RAIL.sagitta.of(t)), 4)} <small>→ 0.075</small>`;
    if (S.scene === 'shell') return `u ${fix(RAIL.shell.of(t), 3)} <small>/ 0.42</small>`;
    if (S.scene === 'stokes') return `u₀ ${sgnFix(RAIL.stokes.of(t), 3)} <small>/ +0.300</small>`;
    return `L ${RAIL.bridge.of(t)} <small>/ 13</small>`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: S.tau, rate: RATES.sagitta, step: STEPS.sagitta, loop: true,
    format: (t) => railText(t),
    onChange: (t, C) => {
      S.tau = t;
      fromRail();
      playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint();
    }
  });
  /** Write the rail's parameter of the current scene from τ. */
  function fromRail() {
    const t = S.tau;
    if (S.scene === 'sagitta') { S.eps = snapEps(RAIL.sagitta.of(t)); fEps.set(S.eps); }
    else if (S.scene === 'shell') S.up = RAIL.shell.of(t);
    else if (S.scene === 'stokes') { S.u0 = RAIL.stokes.of(t); fU0.set(Math.round(S.u0 * 200) / 200); }
    else S.layers = RAIL.bridge.of(t);
  }
  /** The rail position of the current scene for the state. */
  function railOf() {
    if (S.scene === 'sagitta') return clamp(RAIL.sagitta.to(S.eps), 0, 1);
    if (S.scene === 'shell') return clamp(RAIL.shell.to(S.up), 0, 1);
    if (S.scene === 'stokes') return clamp(RAIL.stokes.to(S.u0), 0, 1);
    return clamp(RAIL.bridge.to(S.layers), 0, 1);
  }
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  let bootIO = null;
  function bootPlay() {
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stageEl);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let booting = true;
  function leave() { stopBootPlay(); cards.mark(null); clock.pause(); }
  /** Put the rail where the state is (quietly: the rail does not write the state back). */
  function syncRail() { clock.rate = RATES[S.scene]; clock.step = STEPS[S.scene]; clock.set(railOf(), true); S.tau = clock.t; }
  function setScene(v, quiet) {
    S.scene = SCENES.includes(v) ? v : 'sagitta';
    sceneChips.set(S.scene, true);
    syncRail();
    if (!quiet) paint();
  }
  function setEps(v, quiet) { S.eps = snapEps(v); fEps.set(S.eps); if (S.scene === 'sagitta') syncRail(); if (!quiet) paint(); }
  function setDelta(v, quiet) { S.delta = clamp(Math.round(v * 200) / 200, 0, 0.3); fDelta.set(S.delta); if (!quiet) paint(); }
  function setTs(v, quiet) { S.ts = clamp(Math.round(v * 20) / 20, T_SLICE[0], T_SLICE[1]); fTs.set(S.ts); if (!quiet) paint(); }
  function setU0(v, quiet) { S.u0 = clamp(Math.round(v * 200) / 200, -0.2, 0.3); fU0.set(S.u0); if (S.scene === 'stokes') syncRail(); if (!quiet) paint(); }
  function setUp(v, quiet) { S.up = clamp(v, 0.02, 0.42); if (S.scene === 'shell') syncRail(); if (!quiet) paint(); }
  function setLayers(v, quiet) { S.layers = clamp(Math.round(v), 0, LAYERS); if (S.scene === 'bridge') syncRail(); if (!quiet) paint(); }
  function setLens(v, quiet) { S.lens = v === 'zfc' ? 'zfc' : 'arc'; lens.set(S.lens, true); if (!quiet) paint(); }
  const fU0 = kit.field($('stokesU0'), { fmt: (v) => `u₀ = ${sgnFix(v, 3)}`, onInput: (v) => { leave(); if (S.scene !== 'stokes') { setScene('stokes', true); sc.view(VIEWS.stokes, 600); } setU0(v); } });
  const fEps = kit.field($('apertureEps'), { fmt: (v) => `ε = ${fix(v, 4)}`, onInput: (v) => { leave(); setEps(v); } });
  const fDelta = kit.field($('rogueDelta'), { fmt: (v) => (v > 0 ? `δ = ${fix(v, 3)}` : L('δ = 0（无）', 'δ = 0 (none)')), onInput: (v) => { leave(); setDelta(v); } });
  const fTs = kit.field($('sliceT'), { fmt: (v) => `t = ${fix(v, 2)}`, onInput: (v) => { leave(); if (S.scene === 'sagitta' || S.scene === 'stokes') { setScene('shell', true); sc.view(VIEWS.shell, 600); } setTs(v); } });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, true); sc.view(VIEWS[S.scene], TRV.still ? 0 : 600); paint(); });
  const lens = kit.chips($('lensToggle'), 'lens', (v) => { setLens(v); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'sagitta-mertens-critical-ridge': { scene: 'sagitta', delta: 0, eps: 0.075, ts: 25.5, up: 0.3, u0: 0.08, layers: 13, play: true, still: 'end' },
    'hermite-biehler-convex-wings': { scene: 'shell', delta: 0, eps: 0.2, ts: 25.5, up: 0.3, u0: 0.08, layers: 13, play: true, still: 0.7 },
    'rogue-quartet-mexican-hat-breach': { scene: 'shell', delta: 0.22, eps: 0.2, ts: 23, up: 0.11, u0: 0.08, layers: 13, play: true, still: 0.225 },
    'finite-stokes-zero-vortex-lock': { scene: 'stokes', delta: 0, eps: 0.2, ts: 25.5, up: 0.3, u0: 0.08, layers: 13, play: true, still: 0.56 },
    'schur-modifier-conrey-li-bridge': { scene: 'bridge', delta: 0.22, eps: 0.2, ts: 23, up: 0.11, u0: 0.08, layers: 13, play: true, still: 'end' }
  };
  const NOTES = {
    'sagitta-mertens-critical-ridge': ['时间轴把停机精度 ε 从 0.5 收到 0.075，视界 P<sub>ε</sub> = e<sup>1/ε</sup> 从 7.4 推到 6.17×10⁵。前沿的栅栏是矢高总和 Σ<sub>p≤P<sub>ε</sub></sub>(1 − cos p<sup>−σ</sup>)：σ = ½ 一列（品红）沿墨色刻度 ½ ln ln P<sub>ε</sub> + C<sub>sag</sub> 一直涨，停在 1.4073（主项也是 1.4073）；σ &gt; ½（青色）很快贴到虚线极限上。紫色珠子是 p = 2, 3, 5, … 各自的矢高，叠在 σ = ½ 一列上。', 'The rail tightens the halting precision ε from 0.5 to 0.075, pushing the horizon P<sub>ε</sub> = e<sup>1/ε</sup> from 7.4 to 6.17×10⁵. The fence at the front is the sagitta sum Σ<sub>p≤P<sub>ε</sub></sub>(1 − cos p<sup>−σ</sup>): the σ = ½ column (magenta) keeps climbing along the ink tick ½ ln ln P<sub>ε</sub> + C<sub>sag</sub> and stops at 1.4073 (the lead is 1.4073 too); the cyan part σ &gt; ½ soon sits on its dashed limit. The violet beads are the single sagittas of p = 2, 3, 5, …, stacked up the σ = ½ column.'],
    'hermite-biehler-convex-wings': ['切面 t = 25.50。屏上是 |ξ|²/W₀ 沿 u 的剖面，两翼从 σ = ½ 单调上升（青色）。时间轴把双壳探针从 u = 0.02 推到 0.42：外壳 |E<sub>ε</sub>(½ + u + it)|²（青珠）总高于镜像壳 |E<sub>ε</sub>(½ − u + it)|²（白珠），Δ<sub>ε</sub><sup>HB</sup> &gt; 0；停在 u = 0.30，四个 Gram 节点的核 λ<sub>min</sub> = 0.0552 &gt; 0。', 'Slice t = 25.50. The screen shows the profile |ξ|²/W₀ along u, its wings rising from σ = ½ (cyan). The rail pushes the dual-shell probe from u = 0.02 to 0.42: the outer shell |E<sub>ε</sub>(½ + u + it)|² (cyan bead) always stands above the mirror shell |E<sub>ε</sub>(½ − u + it)|² (white bead), Δ<sub>ε</sub><sup>HB</sup> &gt; 0; it stops at u = 0.30, where the kernel on the four Gram nodes has λ<sub>min</sub> = 0.0552 &gt; 0.'],
    'rogue-quartet-mexican-hat-breach': ['注入假想四元组 ½ ± 0.22 ± 23i：t = 23 处挖出一对品红坑，切面剖面成了墨西哥帽，中间隆起、两侧下陷。探针在 0 &lt; u &lt; 0.22 时外壳反而低于镜像壳，Δ<sub>ε</sub><sup>HB</sup> &lt; 0，势面上出现品红沟；停在 u = 0.11，核 λ<sub>min</sub> = −1.0585 &lt; 0。', 'Inject the hypothetical quartet ½ ± 0.22 ± 23i: two magenta pits open at t = 23 and the slice profile becomes a Mexican hat, raised in the middle and sunk at both sides. For 0 &lt; u &lt; 0.22 the outer shell lies below the mirror shell, Δ<sub>ε</sub><sup>HB</sup> &lt; 0, and a magenta trough appears on the terrain; at u = 0.11 the kernel has λ<sub>min</sub> = −1.0585 &lt; 0.'],
    'finite-stokes-zero-vortex-lock': ['检验框 [½ + u₀, ½ + 0.42] × [12, 34.5] 切成 3 × 10 胞（ε = 0.2）。时间轴把左界 u₀ 从 −0.20 推到 +0.30：u₀ &lt; 0 时青色外边界数出 N = 5.0000（五道峡谷），越过 σ = ½ 后 N = 0.0000，停在 u₀ = 0.08。每条内棱只算一次相位，反方向取负，两两相消恰为 0。', 'The box [½ + u₀, ½ + 0.42] × [12, 34.5] is cut into 3 × 10 cells (ε = 0.2). The rail pushes the left edge u₀ from −0.20 to +0.30: while u₀ &lt; 0 the cyan rim counts N = 5.0000 (the five canyons); past σ = ½, N = 0.0000, and it stops at u₀ = 0.08. Each interior arc carries one phase, negated for the reverse direction, and the pairs cancel to exactly 0.'],
    'schur-modifier-conrey-li-bridge': ['四个 Gram 节点之间的弦是核；右侧的层塔记下乘进来的层。时间轴把 F<sub>L</sub> = ½∏<sub>k≤L</sub> 一层层乘进来：十二层临界线因子的核都半正定，λ<sub>min</sub> 一直非负（L = 12 时 0.0582）；第 13 层是假想离轴四元组 δ = 0.22，它自己的核不定，λ<sub>min</sub> 跌到 −1.0585，弦变成品红。', 'The chords between the four Gram nodes are the kernel; the tower on the right records the layers multiplied in. The rail multiplies F<sub>L</sub> = ½∏<sub>k≤L</sub> in layer by layer: the kernels of the twelve on-line layers are all PSD and λ<sub>min</sub> stays non-negative (0.0582 at L = 12); layer 13 is the hypothetical off-line quartet δ = 0.22, whose own kernel is indefinite, and λ<sub>min</sub> drops to −1.0585 as the chords turn magenta.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'sagitta-mertens-critical-ridge': ['σ = ½ 的矢高柱涨到 1.4073，贴着 ½ ln ln P + C；σ > ½ 已停在极限虚线上。', 'At σ = ½ the sagitta column reaches 1.4073 on ½ ln ln P + C; right of it the fence rests on its limit.'],
    'hermite-biehler-convex-wings': ['u = 0.30：外壳高于镜像壳，Δ > 0，青色两翼上升，核 λmin = 0.0552 > 0。', 'At u = 0.30 the outer shell stands above its mirror: Δ > 0, cyan wings rise, kernel λmin = 0.0552.'],
    'rogue-quartet-mexican-hat-breach': ['离轴四元组 δ = 0.22 在 t = 23 挖出双阱；品红沟里 Δ < 0，核 λmin < 0。', 'An off-line quartet δ = 0.22 digs a double well at t = 23: Δ < 0 in the magenta trough, λmin < 0.'],
    'finite-stokes-zero-vortex-lock': ['u₀ = 0.08：3 × 10 胞的内棱两两相消，青色外圈数出 N = 0.0000。', 'u₀ = 0.08: interior arcs of the 3 × 10 mesh cancel in pairs; the cyan rim counts N = 0.0000.'],
    'schur-modifier-conrey-li-bridge': ['十二层临界线因子保持核半正定；第 13 层离轴四元组让 λmin 变负。', 'Twelve on-line layers keep the kernel PSD; the off-line 13th layer turns λmin negative.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    if (!booting) stopBootPlay();
    clock.pause();
    S.delta = p.delta; fDelta.set(p.delta); setEps(p.eps, true); setTs(p.ts, true); S.up = p.up; S.u0 = p.u0; fU0.set(p.u0); S.layers = p.layers;
    setScene(p.scene, true);
    sc.view(VIEWS[p.scene], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootPlay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景或透镜，拉 u₀、ε、δ 与 t，拖琥珀圆环。随时可以再选一张卡。', 'Free play: switch the scene or the lens, pull u₀, ε, δ and t, drag the amber ring. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const evalOut = (a) => ({ re: a[0], im: a[1], dre: a[2], dim: a[3] });
  window.RIEMANN_STOKES_DEBUG = Object.freeze({
    get state() {
      const M = model(), G = M.gram, st = M.stokes, sh = M.shell, g = M.sag;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, tau: S.tau, playing: clock.playing, scene: S.scene, lens: S.lens,
        eps: S.eps, delta: S.delta, ts: S.ts, up: S.up, u0: S.u0, layers: M.layers, mesh: M.mesh,
        sagitta: { eps: g.eps, P: g.P, primes: g.primes, sigmas: SIGS, sums: g.sums, half: g.half, lead: g.lead, C: C_SAG, M: MERTENS_M, dC: DC_SAG, mertens: g.mertens, eulerTwo: g.eulerTwo,
          first: g.first, limits: [0.55, 0.6, 0.75, 0.95].map((s) => [s, sagLimit(s)]) },
        shell: { u: sh.u, t: sh.t, eps: sh.eps, outer: sh.outer, mirror: sh.mirror, delta: sh.delta, identity: sh.identity, kernel: sh.kernel, Kss: sh.Kss, W0: sh.W0, ratio: sh.ratio, xi: sh.xi, dxi: sh.dxi },
        gram: G ? { nodes: G.nodes, re: G.K.re, im: G.K.im, ev: G.ev, lamMin: G.lamMin, diag: G.diag, herm: G.herm, schur: { S: G.schur.S, ev: G.schur.ev, cEv: G.schur.cEv, least: G.schur.least, xSx: G.schur.xSx } } : null,
        split: M.split,
        stokes: { u0: st.u0, eps: st.eps, nu: st.nu, nt: st.nt, cells: st.cells, edges: st.edges, interior: st.interior, cancel: st.cancel, boundary: st.boundary, N: st.N, cellN: st.cellN, gap: st.gap,
          sampledGap: st.sampledGap, aliasFree: st.aliasFree, nearest: st.nearest, rimNear: st.rimNear, defined: st.defined, meshClear: st.meshClear, inside: st.inside, vortices: st.vortices, U: st.U, T: st.T },
        gammas: GAMMAS, gamma0: G0, shellView: SHELLVIEW,
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME, plot: PLOT
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, true);
      if (o.lens != null) setLens(o.lens, true);
      if (o.eps != null) setEps(o.eps, true);
      if (o.delta != null) setDelta(o.delta, true);
      if (o.ts != null) setTs(o.ts, true);
      if (o.up != null) setUp(o.up, true);
      if (o.u0 != null) setU0(o.u0, true);
      if (o.layers != null) setLayers(o.layers, true);
      if (o.tau != null) clock.set(clamp(o.tau, 0, 1));
      paint();
    },
    /** Pure computations (no page change), for the suite's sweeps. */
    evalF(u, t, layers = LAYERS, delta = 0) { return evalOut(evalF(u, t, layers, delta)); },
    height(u, t, layers = LAYERS, delta = 0) { return { L: levelled(u, t, layers, delta), Z: zmap(levelled(u, t, layers, delta)) }; },
    grid(layers = LAYERS, delta = 0) { const T = terrain(layers, delta); return { us: T.us, ts: T.ts, Z: T.Z, neg: T.neg }; },
    shell(u, t, eps, layers = LAYERS, delta = 0) { const s = shell(u, t, eps, layers, delta); return { outer: s.outer, mirror: s.mirror, delta: s.delta, identity: s.identity, kernel: s.kernel, W0: s.W0 }; },
    gram(layers, delta, up, ts) { const G = gram(layers, delta, up, ts); return { nodes: G.nodes, re: G.K.re, im: G.K.im, ev: G.ev, lamMin: G.lamMin, schur: { S: G.schur.S, ev: G.schur.ev, cEv: G.schur.cEv, least: G.schur.least, xSx: G.schur.xSx } }; },
    split(layers, delta, up, ts) { return layerSplit(layers, delta, up, ts); },
    stokes(u0, eps, delta = 0) { const s = stokes(u0, eps, delta); return { N: s.N, cellN: s.cellN, cancel: s.cancel, interior: s.interior, defined: s.defined, meshClear: s.meshClear, inside: s.inside, nu: s.nu, nt: s.nt, aliasFree: s.aliasFree, gap: s.gap }; },
    sagitta(eps) { const g = sagittaAt(eps); return { eps: g.eps, P: g.P, primes: g.primes, sums: g.sums, half: g.half, lead: g.lead, mertens: g.mertens, eulerTwo: g.eulerTwo }; },
    sagLimit(sig) { return sagLimit(sig); },
    /** Viewport coordinates of the handle, or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the anchor of a value of the handle's parameter (u₀ in the Stokes scene, t elsewhere). */
    anchorPoint(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(anchorOf(handleKind(), v)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    /** Viewport coordinates of a world point under the current camera. */
    project(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('rogue-quartet-mexican-hat-breach'); clock.pause(); clock.set(PRESETS['rogue-quartet-mexican-hat-breach'].still); sc.view(VIEWS.shell, 0); paint.now(); };
  cards.pick(cards.initial('sagitta-mertens-critical-ridge'));
  booting = false;
  paint();
})();
