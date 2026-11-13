/* ORTHO//RAUZY: Chapter 39's Pisot–Clifford–Rauzy sandtable, in four scenes that share one rail.
   sand     3D. Every word ε of length q with no K ones in a row gives e(X) = Σ εⱼXʲ; the point with internal
            position e(α) and height e(β)·β^−q stands over the internal plane, its shadow on the floor. Rail: q.
   plane    2D. rauzy: the internal points e(α), coloured by the prefix 0 / 10 / 110 (the maps f₀, f₁₀, f₁₁₀; rail: q);
            roots: the roots of X^K − (X^{K−1} + … + 1) against the unit circle (rail: K);
            spiral: the cobweb of θ ↦ cos θ beside the powers αⁿ (rail: n).
   tree     words: the binary tree pruned of K ones in a row, with the golden window at K = 2 (rail: depth);
            padic: the residue tree mod pᵏ with three integers (rail: k);
            cut: the junction matrix τ(x) + ι(y) < K and the page rank caps R₀, R₁ (rail: the pair under the head).
   entropy  the Parry reset ladder with its stationary law, and the ordered pairs a finite catalog cannot separate
            (rail: the catalog step).
   Read-only probe for the browser suite: window.RAUZY_SANDTABLE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp, TAU } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const face = (f) => (f === 'body' ? TRV.fonts.body : f === 'display' ? TRV.fonts.display : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.halo !== false) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
  }
  const SUBS = '₀₁₂₃₄₅₆₇₈₉', SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sub = (n) => String(n).replace(/\d/g, (d) => SUBS[d]), sup = (n) => String(n).replace(/\d/g, (d) => SUPS[d]).replace('-', '⁻');
  const PHI = (1 + Math.sqrt(5)) / 2;

  /* ---------- complex numbers and the K-Bonacci polynomial P_K(X) = X^K − (X^{K−1} + … + X + 1) ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const cabs = (a) => Math.hypot(a[0], a[1]);
  const cpow = (a, n) => { let r = [1, 0]; for (let i = 0; i < n; i++) r = cmul(r, a); return r; };
  const pK = (K, x) => { let s = 0; for (let j = 0; j < K; j++) s += Math.pow(x, j); return Math.pow(x, K) - s; };
  /** P_K at a complex z, by Horner: ((1·z − 1)·z − 1)… */
  const pKc = (K, z) => { let r = [1, 0]; for (let j = 0; j < K; j++) r = [r[0] * z[0] - r[1] * z[1] - 1, r[0] * z[1] + r[1] * z[0]]; return r; };
  /** The Perron root β_K: bisection of P_K on (1, 2), where P_K(1) = 1 − K < 0 and P_K(2) = 1 > 0. */
  function perron(K) { let lo = 1, hi = 2; for (let i = 0; i < 90; i++) { const m = (lo + hi) / 2; if (pK(K, m) > 0) hi = m; else lo = m; } return (lo + hi) / 2; }
  const ROOTS = {};
  /** All K roots: β_K by bisection, the other K − 1 by Durand–Kerner. alpha: the internal root (ψ = 1 − φ for K = 2,
      else the root of largest modulus in the upper half-plane; for K = 3 the unique one). */
  function rootsOf(K) {
    if (ROOTS[K]) return ROOTS[K];
    let zs = Array.from({ length: K }, (_, i) => cpow([0.4, 0.9], i));
    for (let it = 0; it < 600; it++) {
      let moved = 0;
      zs = zs.map((z, i) => { let d = [1, 0]; zs.forEach((w, j) => { if (j !== i) d = cmul(d, [z[0] - w[0], z[1] - w[1]]); }); const q = cdiv(pKc(K, z), d); moved = Math.max(moved, cabs(q)); return [z[0] - q[0], z[1] - q[1]]; });
      if (moved < 1e-17) break;
    }
    const beta = perron(K);
    let k = 0; zs.forEach((z, i) => { if (cabs([z[0] - beta, z[1]]) < cabs([zs[k][0] - beta, zs[k][1]])) k = i; });
    const conj = zs.filter((_, i) => i !== k).map((z) => [z[0], Math.abs(z[1]) < 1e-12 ? 0 : z[1]]).sort((a, b) => Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]));
    const upper = conj.filter((z) => z[1] > 1e-9);
    const alpha = K === 2 ? [1 - PHI, 0] : upper.reduce((m, z) => (cabs(z) > cabs(m) + 1e-12 ? z : m), upper[0]);
    return (ROOTS[K] = { beta, conj, alpha, residual: cabs(pKc(K, alpha)), perronResidual: Math.abs(pK(K, beta)) });
  }
  /** dbonacci d n, exactly as the Lean definition: 0, 1, then 2^q for q < d, else the sum of the d previous values. */
  const DB = {};
  function dbon(K, n) {
    const m = DB[K] || (DB[K] = []);
    if (m[n] != null) return m[n];
    let v;
    if (n === 0) v = 0; else if (n === 1) v = 1;
    else { const q = n - 2; if (q < K) v = Math.pow(2, q); else { v = 0; for (let i = 0; i < K; i++) v += dbon(K, q - K + i + 2); } }
    return (m[n] = v);
  }
  const count = (K, Q) => dbon(K, Q + 2);           // dbonacci_name_card: the number of legal words of length Q
  const CAP = 12000, KS = [2, 3, 4, 5, 6, 7, 8];
  const qCap = (K) => { let Q = 2; while (Q < 19 && count(K, Q + 1) <= CAP) Q++; return Q; };
  const THETA = (() => { let lo = 0, hi = 1; for (let i = 0; i < 90; i++) { const m = (lo + hi) / 2; if (m - Math.cos(m) > 0) hi = m; else lo = m; } return (lo + hi) / 2; })();
  const ALPHA3 = () => rootsOf(3).alpha, ABS3 = () => cabs(ALPHA3());
  const relDiff = () => 100 * Math.abs(THETA - ABS3()) / THETA;

  /* ---------- the words: every legal word up to the longest length, with its two images ---------- */
  const WORDS = {};
  /** Words of length qCap(K) with no K ones in a row, sorted by the position of their last 1, so that the words of
      length q (padded with zeros) are the first upto[q] entries. re, im: e(α); ph: e(β); br: the number of leading ones. */
  function wordsOf(K) {
    if (WORDS[K]) return WORDS[K];
    const Q = qCap(K), { alpha, beta } = rootsOf(K), ar = [], ai = [], bp = [];
    let z = [1, 0], b = 1;
    for (let j = 0; j < Q; j++) { ar.push(z[0]); ai.push(z[1]); bp.push(b); z = cmul(z, alpha); b *= beta; }
    const tmp = [];
    const rec = (j, run, bits, last, re, im, ph) => {
      if (j === Q) { tmp.push([bits, last, re, im, ph]); return; }
      rec(j + 1, 0, bits, last, re, im, ph);
      if (run + 1 < K) rec(j + 1, run + 1, bits | (1 << j), j, re + ar[j], im + ai[j], ph + bp[j]);
    };
    rec(0, 0, 0, -1, 0, 0, 0);
    tmp.sort((u, v) => u[1] - v[1] || u[0] - v[0]);
    const n = tmp.length, W = { K, Q, n, bits: new Int32Array(n), last: new Int8Array(n), re: new Float64Array(n), im: new Float64Array(n), ph: new Float64Array(n), br: new Int8Array(n), upto: [], index: new Map() };
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    tmp.forEach((t, i) => {
      W.bits[i] = t[0]; W.last[i] = t[1]; W.re[i] = t[2]; W.im[i] = t[3]; W.ph[i] = t[4];
      let lead = 0; while ((t[0] >> lead) & 1) lead++; W.br[i] = lead; W.index.set(t[0], i);
      x0 = Math.min(x0, t[2]); x1 = Math.max(x1, t[2]); y0 = Math.min(y0, t[3]); y1 = Math.max(y1, t[3]);
    });
    let c = 0; for (let q = 0; q <= Q; q++) { while (c < n && W.last[c] < q) c++; W.upto.push(c); }
    W.box = [x0, x1, y0, y1];
    W.matches = W.upto.every((m, q) => m === count(K, q));
    return (WORDS[K] = W);
  }
  const bitsStr = (bits, len) => { let s = ''; for (let j = 0; j < len; j++) s += (bits >> j) & 1; return s; };
  const lastOne = (bits) => (bits ? 31 - Math.clz32(bits) : -1);
  /** The selected word for K: the remembered one when it is legal, else 1…10 1…10 … (K − 1 ones, then a zero). */
  function selOf(K) {
    const W = wordsOf(K);
    if (W.index.has(S.sel)) return S.sel;
    let b = 0; for (let j = 0; j < 7; j++) if (j % K !== K - 1) b |= 1 << j;
    return W.index.has(b) ? b : 1;
  }

  /* ---------- the binary word tree, pruned of K ones in a row ---------- */
  const TREE_CAP = 144;
  const treeDepth = () => { let D = 1; while (D < Math.min(S.Q, 10) && count(S.K, D + 1) <= TREE_CAP) D++; return D; };
  const TREES = {};
  function treeOf(K, D) {
    const key = `${K}:${D}`; if (TREES[key]) return TREES[key];
    const nodes = [], stubs = [], level = Array.from({ length: D + 1 }, () => []);
    const add = (d, digit, run, parent, bits) => {
      const id = nodes.length, nd = { id, d, digit, run, parent, bits, kids: [], x: 0 };
      nodes.push(nd); level[d].push(id);
      if (d < D) {
        nd.kids.push(add(d + 1, 0, 0, id, bits));
        if (run + 1 < K) nd.kids.push(add(d + 1, 1, run + 1, id, bits | (1 << d))); else stubs.push({ parent: id, d: d + 1 });
      }
      return id;
    };
    add(0, -1, 0, -1, 0);
    const leaves = level[D]; leaves.forEach((id, i) => { nodes[id].x = (i + 0.5) / leaves.length; });
    for (let d = D - 1; d >= 0; d--) for (const id of level[d]) { const k = nodes[id].kids; nodes[id].x = k.reduce((s, c) => s + nodes[c].x, 0) / k.length; }
    return (TREES[key] = { K, D, nodes, stubs, level });
  }

  /* ---------- p-adic residue tree ---------- */
  const HOF = { 2: 6, 3: 4, 5: 3 };
  const mod = (x, m) => ((x % m) + m) % m;
  const vp = (p, n) => { n = Math.abs(n); if (!n) return Infinity; let v = 0; while (n % p === 0) { n /= p; v++; } return v; };
  const common = (p, H, a, b) => Math.min(vp(p, a - b), H);
  const dist = (p, H, a, b) => H - common(p, H, a, b);
  /** Horizontal place in [0, 1] of the residue r mod pᵏ: its low digits read as a p-adic fraction (children contiguous). */
  const placeOf = (p, k, r) => { let x = 0, s = 1 / p; for (let i = 0; i < k; i++) { x += (r % p) * s; r = Math.floor(r / p); s /= p; } return x + 0.5 * Math.pow(p, -k); };

  /* ---------- the direct encoder across a cut ---------- */
  const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  function legalWords(K, m) {
    const out = [];
    const rec = (j, run, w) => { if (j === m) { out.push(w.slice()); return; } w.push(0); rec(j + 1, 0, w); w.pop(); if (run + 1 < K) { w.push(1); rec(j + 1, run + 1, w); w.pop(); } };
    rec(0, 0, []);
    return out;
  }
  const initialRun = (w) => { let i = 0; while (i < w.length && w[i]) i++; return i; };
  const terminalRun = (w) => { let i = 0; while (i < w.length && w[w.length - 1 - i]) i++; return i; };
  const lex = (a, b) => { for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i]; return 0; };
  const ENC = {};
  function encoder(N, K, mX, mY) {
    const key = [N, K, mX, mY].join(':'); if (ENC[key]) return ENC[key];
    let M0 = 0, M1 = 0; for (let n = 0; n <= N; n++) { if (isPrime(n)) M1++; else M0++; }
    const X = legalWords(K, mX), Y = legalWords(K, mY);
    const X0 = X.filter((w) => w[0] === 0), X1 = X.filter((w) => w[0] === 1), Y0 = Y.filter((w) => w[0] === 0), Y1 = Y.filter((w) => w[0] === 1);
    const a = [], nn = [];
    for (let s = 0; s < K; s++) { a.push(X1.filter((x) => terminalRun(x) < s).length); nn.push(Y1.filter((y) => initialRun(y) < K - s).length); }
    const R0 = Math.min(X0.length, Math.floor(Y0.length / M0));
    let R1 = X1.length; for (let s = 0; s < K; s++) R1 = Math.min(R1, a[s] + Math.floor(nn[s] / M1));
    const rows = X1.slice().sort((u, v) => terminalRun(u) - terminalRun(v) || lex(u, v)), cols = Y1.slice().sort((u, v) => initialRun(u) - initialRun(v) || lex(u, v));
    const legal = rows.map((x) => cols.map((y) => terminalRun(x) + initialRun(y) < K));
    let forbidden = 0; legal.forEach((r) => r.forEach((ok) => { if (!ok) forbidden++; }));
    return (ENC[key] = { N, K, mX, mY, M: [M0, M1], cX: [X0.length, X1.length], cY: [Y0.length, Y1.length], a, n: nn, R: [R0, R1], rows, cols, legal, forbidden });
  }
  const pairOf = (E, t) => { const i = clamp(Math.floor(t + 1e-9), 0, E.rows.length * E.cols.length - 1); return { i, r: Math.floor(i / E.cols.length), c: i % E.cols.length }; };
  const firstForbidden = (E) => { for (let r = 0; r < E.rows.length; r++) for (let c = 0; c < E.cols.length; c++) if (!E.legal[r][c]) return r * E.cols.length + c; return 0; };

  /* ---------- the Parry reset chain on Bool × Fin K ---------- */
  const PARRY = {};
  function parry(K) {
    if (PARRY[K]) return PARRY[K];
    const p = 1 / rootsOf(K).beta;
    const W = Array.from({ length: K }, (_, j) => { let s = 0; for (let a = 0; a < K - j; a++) s += Math.pow(p, a + 1); return s; });   // suffixWeight
    const states = []; for (const sg of [true, false]) for (let j = 0; j < K; j++) states.push([sg, j]);
    const ker = (s, t) => (t[0] === !s[0] && t[1] === 0 ? p / W[s[1]] : t[0] === s[0] && t[1] === s[1] + 1 ? p * W[t[1]] / W[s[1]] : 0);
    let norm = 0; for (let j = 0; j < K; j++) norm += Math.pow(p, j) * W[j];
    const law = states.map((s) => Math.pow(p, s[1]) * W[s[1]] / (2 * norm));
    let rootSum = 0; for (let a = 0; a < K; a++) rootSum += Math.pow(p, a + 1);
    let rowErr = 0, statErr = 0, flipErr = 0, minKer = Infinity;
    states.forEach((s) => { let r = 0; states.forEach((t) => { const k = ker(s, t); r += k; minKer = Math.min(minKer, k); }); rowErr = Math.max(rowErr, Math.abs(r - 1)); });
    states.forEach((t, ti) => { let m = 0; states.forEach((s, si) => { m += law[si] * ker(s, t); }); statErr = Math.max(statErr, Math.abs(m - law[ti])); });
    states.forEach((s, si) => { const fi = states.findIndex((t) => t[0] === !s[0] && t[1] === s[1]); flipErr = Math.max(flipErr, Math.abs(law[fi] - law[si])); });
    const total = law.reduce((a, b) => a + b, 0), byRun = Array.from({ length: K }, (_, j) => law[j] + law[K + j]);
    return (PARRY[K] = { K, p, W, norm, states, ker, law, byRun, rootSum, rowErr, statErr, flipErr, minKer, total });
  }

  /* ---------- the escape pairs of a finite catalog ---------- */
  const ESC_LEN = 4, ESC_STEPS = 10;
  const OBS = [
    { id: 'tau', name: ['τ（末尾 1 的个数）', 'τ (ones at the end)'], short: 'τ', f: (w) => terminalRun(w) },
    { id: 'd0', name: ['第 0 位', 'digit 0'], short: 'ε₀', f: (w) => w[0] },
    { id: 'd1', name: ['第 1 位', 'digit 1'], short: 'ε₁', f: (w) => w[1] },
    { id: 'd2', name: ['第 2 位', 'digit 2'], short: 'ε₂', f: (w) => w[2] },
    { id: 'd3', name: ['第 3 位', 'digit 3'], short: 'ε₃', f: (w) => w[3] }
  ];
  const ARENA = {};
  /** The arena: the legal words of length 4, sorted by (τ, ε₀, ε₁, ε₂, ε₃), so that adding the observations in order
      leaves E(S) as shrinking blocks along the diagonal. */
  function arenaOf(K) {
    if (ARENA[K]) return ARENA[K];
    const key = (w) => OBS.map((o) => o.f(w));
    const words = legalWords(K, ESC_LEN).sort((u, v) => { const a = key(u), b = key(v); for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i]; return 0; });
    return (ARENA[K] = { words, q: words.length, vals: words.map(key) });
  }
  /** E(S): ordered pairs of distinct states that agree on every selected observation (indices into OBS). */
  function escapeSet(A, sel) { const out = new Set(); for (let i = 0; i < A.q; i++) for (let j = 0; j < A.q; j++) if (i !== j && sel.every((o) => A.vals[i][o] === A.vals[j][o])) out.add(i * A.q + j); return out; }
  function escapeAt(K, t) {
    const A = arenaOf(K), step = clamp(Math.floor(t + 1e-9), 0, ESC_STEPS), all = OBS.map((_, i) => i);
    let sel, prev, removed = null;
    if (step <= OBS.length) { sel = all.slice(0, step); prev = step ? all.slice(0, step - 1) : null; }
    else { removed = step - OBS.length - 1; sel = all.filter((i) => i !== removed); }
    const E = escapeSet(A, sel), full = escapeSet(A, all), denom = A.q * (A.q - 1);
    let changed = new Set();
    if (prev) { const Ep = escapeSet(A, prev); changed = new Set([...Ep].filter((c) => !E.has(c))); }
    if (removed != null) changed = new Set([...E].filter((c) => !full.has(c)));               // U_i = E(C \ {i}) \ E(C)
    const unique = all.map((i) => { const Ei = escapeSet(A, all.filter((j) => j !== i)); let u = 0; Ei.forEach((c) => { if (!full.has(c)) u++; }); return u; });
    return { A, step, sel, removed, E, changed, full, denom, count: E.size, rate: E.size / denom, unique, lowers: unique.map((u) => u > 0) };
  }

  /* ---------- state ---------- */
  const S = { scene: 'sand', view: 'sand', K: 3, Q: 12, sel: 109, p: 3, x: 7, y: 34, z: 16, N: 2, mX: 4, mY: 5, escStep: 8, last: { sand: 'sand', plane: 'rauzy', tree: 'words', entropy: 'entropy' } };
  const SCENE_OF = { sand: 'sand', rauzy: 'plane', roots: 'plane', spiral: 'plane', words: 'tree', padic: 'tree', cut: 'tree', entropy: 'entropy' };
  const SPIRAL_N = 24;
  const RAIL = {
    sand: () => ({ max: S.Q, rate: 1.1, step: 1 }),
    rauzy: () => ({ max: S.Q, rate: 1.1, step: 1 }),
    roots: () => ({ max: 6, rate: 0.85, step: 1 }),
    spiral: () => ({ max: SPIRAL_N, rate: 2.2, step: 1 }),
    words: () => ({ max: treeDepth(), rate: 0.9, step: 1 }),
    padic: () => ({ max: HOF[S.p], rate: 0.7, step: 1 }),
    cut: () => { const E = encoder(S.N, S.K, S.mX, S.mY); return { max: E.rows.length * E.cols.length - 1, rate: 5, step: 1 }; },
    entropy: () => ({ max: ESC_STEPS, rate: 0.8, step: 1 })
  };
  const depthOf = (t, max) => { const d = clamp(Math.floor(t + 1e-9), 0, max); return { depth: d, frac: d >= max ? 0 : clamp(t - d, 0, 1) }; };
  function state() {
    const t = clock.t, v = S.view;
    if (v === 'sand' || v === 'rauzy') { const W = wordsOf(S.K); return Object.assign({ W }, depthOf(t, Math.min(S.Q, W.Q))); }
    if (v === 'roots') return { K: 2 + clamp(Math.round(t), 0, 6) };
    if (v === 'spiral') return depthOf(t, SPIRAL_N);
    if (v === 'words') { const D = treeDepth(); return Object.assign({ T: treeOf(S.K, D), D }, depthOf(t, D)); }
    if (v === 'padic') { const H = HOF[S.p]; return { H, k: clamp(Math.floor(t + 1e-9), 0, H) }; }
    if (v === 'cut') { const E = encoder(S.N, S.K, S.mX, S.mY); return Object.assign({ E }, pairOf(E, t)); }
    return Object.assign({ par: parry(S.K) }, escapeAt(S.K, t));
  }

  /* ---------- the stage ---------- */
  const box = { top: 70, bottom: 44 };
  let view = null, lastSand = null, lastPlot = null;
  const cv = $('cv');
  const BR = () => [P.cyan, P.violet, P.magenta, P.sigma, P.ink, P.dim, P.dim, P.dim];
  const st = kit.stage3($('stage'), {
    canvas: cv, yaw: -0.62, pitch: 0.5, zoom: 1, radius: 0.34, cy: 0.56, wheel: false, onChange: () => paint(),
    onPick: (ev) => {
      if (S.view === 'sand') { if (pickSand(ev)) { leave(); return true; } return false; }
      if (S.view === 'rauzy' || S.view === 'cut') { leave(); pick2d(ev); }
      return true;
    },
    onDrag: (ev) => { if (S.view === 'sand') pickSand(ev); else if (S.view === 'rauzy' || S.view === 'cut') pick2d(ev); }
  });
  function pickSand(ev) {
    if (!lastSand) return false;
    const b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    let best = -1, bd = 14 * 14;
    for (const [i, px, py] of lastSand.pts) { const d = (px - x) * (px - x) + (py - y) * (py - y); if (d < bd) { bd = d; best = i; } }
    if (best < 0) return false;
    S.sel = wordsOf(S.K).bits[best]; paint(); return true;
  }
  function pick2d(ev) {
    if (!lastPlot) return;
    const b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (S.view === 'rauzy' && lastPlot.kind === 'rauzy') {
      const W = wordsOf(S.K), g = lastPlot.g; let best = -1, bd = 16 * 16;
      for (let i = 0; i < lastPlot.n; i++) { const dx = g.X(W.re[i]) - x, dy = g.Y(S.K === 2 ? 0 : W.im[i]) - y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; } }
      if (best >= 0) { S.sel = W.bits[best]; paint(); }
    } else if (S.view === 'cut' && lastPlot.kind === 'cut') {
      const m = lastPlot.m, c = Math.floor((x - m.x0) / m.cell), r = Math.floor((y - m.y0) / m.cell);
      if (r >= 0 && c >= 0 && r < m.rows && c < m.cols) { clock.pause(); clock.set(r * m.cols + c); }
    }
  }

  /* sand: the 3D sandtable */
  const SANDZ = [-0.5, 0.82], FLOOR = -0.78;
  function drawSand(q) {
    const ctx = st.begin(), W = q.W, thumb = TRV.thumbMode, words = !thumb, col = BR();
    const [x0, x1, y0, y1] = W.box, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, s = 1.12 / Math.max((x1 - x0) / 2, (y1 - y0) / 2, 0.5);
    const beta = rootsOf(S.K).beta, d = q.depth, fr = q.frac, n0 = W.upto[d], n1 = W.upto[Math.min(d + 1, W.Q)];
    const kOld = Math.pow(beta, -(d + fr)), kNew = Math.pow(beta, -(d + 1)), Z = (v) => SANDZ[0] + (SANDZ[1] - SANDZ[0]) * v;
    const ox = -cx * s, oy = -cy * s, F = 1.25;
    st.path([[-F, -F, FLOOR], [F, -F, FLOOR], [F, F, FLOOR], [-F, F, FLOOR]], { color: P.lineHot, width: 1.1, alpha: 0.8, close: true, fade: false });
    for (const g of [-0.6, 0, 0.6]) { st.line([g, -F, FLOOR], [g, F, FLOOR], { color: P.panelEdge, width: 0.8, alpha: 0.7, fade: false }); st.line([-F, g, FLOOR], [F, g, FLOOR], { color: P.panelEdge, width: 0.8, alpha: 0.7, fade: false }); }
    const sq = (p, r, c, a) => { ctx.globalAlpha = a; ctx.fillStyle = c; ctx.fillRect(p[0] - r, p[1] - r, 2 * r, 2 * r); };
    const rs = thumb ? 2.3 : n1 > 3000 ? 1.0 : 1.3, rl = thumb ? 2.6 : n1 > 3000 ? 1.15 : 1.5;
    for (let i = 0; i < n1; i++) { const a = (i < n0 ? 0.7 : 0.7 * fr); if (a > 0.01) sq(st.p([(W.re[i] - cx) * s, (W.im[i] - cy) * s, FLOOR]), rs, col[W.br[i]], a); }
    st.arrow([ox, oy, FLOOR], [ox, oy, 1.02], { color: P.ink, width: 1.4, alpha: 0.9, fade: false, headSize: 9 });
    const pts = [];
    for (let i = 0; i < n1; i++) {
      const v = W.ph[i] * (i < n0 ? kOld : kNew), p = st.p([(W.re[i] - cx) * s, (W.im[i] - cy) * s, Z(v)]);
      const a = (i < n0 ? 1 : fr) * (0.35 + 0.5 * clamp((p[2] + 1.3) / 2.6, 0, 1));
      if (a > 0.01) { sq(p, rl, col[W.br[i]], a); pts.push([i, p[0], p[1]]); }
    }
    ctx.globalAlpha = 1;
    lastSand = { pts };
    const sel = selOf(S.K), si = W.index.get(sel);
    if (si != null && si < n1 && (si < n0 || fr > 0.5)) {
      const v = W.ph[si] * (si < n0 ? kOld : kNew), X = (W.re[si] - cx) * s, Y = (W.im[si] - cy) * s, Zs = Z(v);
      st.line([X, Y, Zs], [X, Y, FLOOR], { color: P.amber, width: 1.2, dash: [3, 4], alpha: 0.9, fade: false });
      st.line([X, Y, Zs], [ox, oy, Zs], { color: P.amber, width: 1.2, dash: [3, 4], alpha: 0.9, fade: false });
      st.dot([X, Y, FLOOR], 4.5, P.amber, { ring: true, width: 1.8, fade: false });
      st.dot([ox, oy, Zs], 3.5, P.amber, { fade: false });
      st.dot([X, Y, Zs], 5.5, P.amber, { glow: 12, fade: false });
      if (words) st.tag('sel', [X, Y, Zs], `ε = ${bitsStr(sel, Math.max(lastOne(sel) + 1, 1))}`, 'hot raw', { dy: -16, fade: false });
    }
    if (words) {
      st.tag('axis', [ox, oy, 1.02], L('E∥ 物理直线 · e(β)/β^q', 'E∥ physical line · e(β)/β^q'), 'raw ink', { dy: -14, fade: false });
      if (st.W >= 560) st.tag('floor', [F, F, FLOOR], L('E⊥ 内部平面 · e(α)', 'E⊥ internal plane · e(α)'), 'raw', { dx: -70, dy: 16, fade: false });
    }
    st.end();
  }

  /* rauzy: the internal plane */
  function drawRauzy(q) {
    const W = q.W, thumb = TRV.thumbMode, words = !thumb, col = BR(), d = q.depth, fr = q.frac, n0 = W.upto[d], n1 = W.upto[Math.min(d + 1, W.Q)];
    if (S.K === 2) return drawWindow1D(q);
    const [x0, x1, y0, y1] = W.box, m = 0.1 * Math.max(x1 - x0, y1 - y0);
    const g = kit.plot(cv, { x: [x0 - m, x1 + m], y: [y0 - m, y1 + m], equal: true, pad: [12, 12, box.top, box.bottom] }), ctx = g.ctx; view = g;
    lastPlot = { kind: 'rauzy', g, n: n1 };
    const r = thumb ? 2.4 : n1 > 4000 ? 1.0 : n1 > 1500 ? 1.3 : n1 > 300 ? 1.8 : 2.6;
    for (let i = 0; i < n1; i++) { ctx.globalAlpha = i < n0 ? 0.9 : 0.9 * fr; ctx.fillStyle = col[W.br[i]]; ctx.fillRect(g.X(W.re[i]) - r, g.Y(W.im[i]) - r, 2 * r, 2 * r); }
    ctx.globalAlpha = 1;
    for (const [z, lab] of [[[0, 0], '0'], [[1, 0], '1']]) { g.dot(z[0], z[1], P.ink, thumb ? 6 : 4.5, { ring: true, width: 1.6 }); if (words) text(ctx, lab, g.X(z[0]) + 8, g.Y(z[1]) + 9, P.ink, { size: 11 }); }
    if (words && n0 > 6) {
      const sum = Array.from({ length: S.K }, () => [0, 0, 0]);
      for (let i = 0; i < n0; i++) { const b = sum[W.br[i]]; b[0] += W.re[i]; b[1] += W.im[i]; b[2]++; }
      const al = rootsOf(S.K).alpha, labels = S.K === 3 ? ['f₀(w) = αw', 'f₁₀(w) = 1 + α²w', 'f₁₁₀(w) = 1 + α + α³w'] : null;
      sum.forEach((b, k) => {
        if (b[2] < 2 || (!labels && k > 3)) return;
        const lab = labels ? labels[k] : `${'1'.repeat(k)}0…`;
        text(ctx, lab, clamp(g.X(b[0] / b[2]), g.pl + 70, g.pl + g.iw - 70), g.Y(b[1] / b[2]), col[k], { size: 12, align: 'center', weight: 600 });
      });
      if (S.K !== 3) text(ctx, L(`K = ${S.K}：内部坐标的计算样本，取根 α = ${fix(al[0], 4)} + ${fix(al[1], 4)}i`, `K = ${S.K}: a computed internal-coordinate sample, root α = ${fix(al[0], 4)} + ${fix(al[1], 4)}i`), g.pl + 8, g.pt + g.ih - 10, P.dim, { size: 11, face: 'body' });
    }
    const sel = selOf(S.K), si = W.index.get(sel);
    if (si != null && si < n0) {
      const b = W.br[si], tail = sel >> (b + 1), ti = W.index.get(tail);
      if (ti != null) {
        const ax = g.X(W.re[ti]), ay = g.Y(W.im[ti]), bx = g.X(W.re[si]), by = g.Y(W.im[si]), L2 = Math.hypot(bx - ax, by - ay);
        ctx.strokeStyle = P.amber; ctx.lineWidth = 1.4; ctx.setLineDash([4, 4]); ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]);
        if (L2 > 14) { const ux = (bx - ax) / L2, uy = (by - ay) / L2, h = 9; ctx.fillStyle = P.amber; ctx.beginPath(); ctx.moveTo(bx - ux * 6, by - uy * 6); ctx.lineTo(bx - ux * (6 + h) - uy * h * 0.45, by - uy * (6 + h) + ux * h * 0.45); ctx.lineTo(bx - ux * (6 + h) + uy * h * 0.45, by - uy * (6 + h) - ux * h * 0.45); ctx.closePath(); ctx.fill(); }
        ctx.globalAlpha = 1; g.dot(W.re[ti], W.im[ti], P.amber, 5, { ring: true, width: 1.6 });
      }
      g.dot(W.re[si], W.im[si], P.amber, 5.5, { glow: 12 });
      if (words) text(ctx, `ε = ${bitsStr(sel, lastOne(sel) + 1)}`, g.X(W.re[si]) + 10, g.Y(W.im[si]) - 12, P.amber, { size: 11.5 });
    }
  }
  /** K = 2: the internal coordinate Σ εⱼψʲ is real; the golden window [−1, φ] and the two maps f₀, f₁₀. */
  function drawWindow1D(q) {
    const W = q.W, thumb = TRV.thumbMode, words = !thumb, col = BR(), n0 = W.upto[q.depth], n1 = W.upto[Math.min(q.depth + 1, W.Q)];
    const g = kit.plot(cv, { x: [-1.3, PHI + 0.3], y: [-1, 1], pad: [16, 16, box.top, box.bottom] }), ctx = g.ctx; view = g;
    lastPlot = { kind: 'rauzy', g, n: n1 };
    const y = g.Y(0), h = thumb ? 40 : 26;
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.X(-1), y); ctx.lineTo(g.X(PHI), y); ctx.stroke();
    for (let i = 0; i < n1; i++) { ctx.globalAlpha = (i < n0 ? 0.75 : 0.75 * q.frac); ctx.fillStyle = col[W.br[i]]; ctx.fillRect(g.X(W.re[i]) - 0.75, y - h / 2, 1.5, h); }
    ctx.globalAlpha = 1;
    const psi = 1 - PHI, img = [[psi * PHI, -psi, 0], [1 - psi * psi, 1 + psi * psi * PHI, 1]];
    for (const [a, b, k] of img) { const yy = y + h / 2 + 14 + 10 * k; ctx.strokeStyle = col[k]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.X(a), yy - 4); ctx.lineTo(g.X(a), yy); ctx.lineTo(g.X(b), yy); ctx.lineTo(g.X(b), yy - 4); ctx.stroke(); if (words) text(ctx, k ? 'f₁₀(w) = 1 + ψ²w' : 'f₀(w) = ψw', (g.X(a) + g.X(b)) / 2, yy + 12, col[k], { size: 11.5, align: 'center' }); }
    if (words) { text(ctx, '−1', g.X(-1), y - h / 2 - 12, P.ink, { align: 'center' }); text(ctx, 'φ', g.X(PHI), y - h / 2 - 12, P.ink, { align: 'center' }); text(ctx, L('黄金窗口 [−1, φ] · ψ = 1 − φ', 'the golden window [−1, φ] · ψ = 1 − φ'), g.X((PHI - 1) / 2), y - h / 2 - 32, P.dim, { align: 'center', face: 'body' }); }
  }

  /* roots: P_K and the unit circle */
  function drawRoots(q) {
    const K = q.K, R = rootsOf(K), thumb = TRV.thumbMode, words = !thumb, k2 = thumb ? 1.8 : 1;
    const g = kit.plot(cv, { x: [-1.25, 2.2], y: [-1.15, 1.15], equal: true, pad: [14, 14, box.top, box.bottom] }), ctx = g.ctx; view = g;
    lastPlot = { kind: 'roots', g };
    g.hline(0, P.lineHot, { alpha: 0.8 }); g.vline(0, P.panelEdge, { alpha: 0.9 });
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.4 * k2; ctx.beginPath(); ctx.arc(g.X(0), g.Y(0), g.scale, 0, TAU); ctx.stroke();
    for (let k = 2; k < K; k++) for (const z of rootsOf(k).conj) g.dot(z[0], z[1], P.dim, 2.4 * k2, { alpha: 0.55 });
    for (const z of R.conj) g.dot(z[0], z[1], P.cyan, 4.6 * k2, { glow: 6 });
    for (let k = 2; k <= 8; k++) if (k !== K) g.dot(rootsOf(k).beta, 0, P.dim, 2.6 * k2, { alpha: k < K ? 0.9 : 0.35 });
    const yb = g.Y(0) + 16 * k2;
    ctx.strokeStyle = P.magenta; ctx.lineWidth = 3 * k2; ctx.beginPath(); ctx.moveTo(g.X(R.beta), yb); ctx.lineTo(g.X(2), yb); ctx.stroke();
    ctx.lineWidth = 1.4 * k2; ctx.beginPath(); ctx.moveTo(g.X(2), g.Y(0) - 10); ctx.lineTo(g.X(2), yb + 6); ctx.stroke();
    g.dot(R.beta, 0, P.amber, 6 * k2, { glow: 14 });
    if (!words) return;
    text(ctx, `β${sub(K)} = ${fix(R.beta, 6)}`, g.X(R.beta) - 8, g.Y(0) - 20, P.amber, { align: 'right', size: 12.5, weight: 600 });
    text(ctx, '2', g.X(2) + 6, g.Y(0) - 20, P.magenta, { size: 12 });
    text(ctx, `2 − β = β⁻${sup(K)} = ${fix(2 - R.beta, 4)}`, clamp(g.X((R.beta + 2) / 2), g.pl + 90, g.pl + g.iw - 90), yb + 16, P.magenta, { align: 'center', size: 11.5 });
    text(ctx, '|z| = 1', g.X(Math.cos(2.2)) - 4, g.Y(Math.sin(2.2)) - 10, P.dim, { align: 'right', size: 11 });
    text(ctx, L(`其余 ${K - 1} 个根都在圆内`, `the other ${K - 1} roots are all inside`), g.X(0), g.Y(-0.62), P.cyan, { align: 'center', size: 11.5, face: 'body' });
  }

  /* spiral: the cosine cobweb beside the powers of α */
  const cosSeq = (() => { const a = [0]; for (let i = 0; i < SPIRAL_N + 2; i++) a.push(Math.cos(a[a.length - 1])); return a; })();
  function drawSpiral(q) {
    const W = cv.clientWidth, H = cv.clientHeight, thumb = TRV.thumbMode, words = !thumb, k2 = thumb ? 1.8 : 1, wide = W >= 1.25 * (H - box.top - box.bottom);
    const n = q.depth, fr = q.frac, top = box.top, bot = box.bottom, midY = top + (H - top - bot) / 2;
    const padA = wide ? [words ? 34 : 14, W / 2 + 12, top, bot + (words ? 18 : 4)] : [words ? 34 : 14, 14, top, H - midY + 10];
    const g = kit.plot(cv, { x: [0, 1.06], y: [0, 1.06], equal: true, pad: padA }), ctx = g.ctx; view = g;
    lastPlot = { kind: 'spiral', g };
    if (words) g.axes({ xTicks: [0, 0.5, 1], yTicks: [0.5, 1], frame: true });
    const cosPts = []; for (let i = 0; i <= 80; i++) { const x = 1.06 * i / 80; cosPts.push([x, Math.cos(x)]); }
    g.line([[0, 0], [1.06, 1.06]], P.dim, { width: 1, dash: [4, 4], alpha: 0.8 }); g.line(cosPts, P.cyan, { width: 1.8 * k2 });
    const web = []; for (let i = 0; i < n; i++) { const a = cosSeq[i], b = cosSeq[i + 1]; web.push([a, i ? a : 0], [a, b], [b, b]); }
    if (web.length) g.line(web, P.ink, { width: 1.1 * k2, alpha: 0.55 });
    const a = cosSeq[n], b = cosSeq[n + 1], c = cosSeq[n + 2];
    const cur = [[a, n ? a : 0], [a, b], [b, b]]; if (fr > 0) { cur.push([b, b + (c - b) * Math.min(1, fr * 2)]); if (fr > 0.5) cur.push([b + (c - b) * (fr - 0.5) * 2, c]); }
    g.line(cur, P.amber, { width: 1.8 * k2 });
    g.dot(THETA, THETA, P.cyan, 5 * k2, { ring: true, width: 1.8 }); g.dot(b, b, P.amber, 4 * k2, { glow: 8 });
    // labels: the curve name hangs under the right end of y = cos θ (nothing of the cobweb goes below cos 1 ≈ 0.54),
    // the current iterate sits in the empty bottom-right corner, so neither meets the other or the cobweb at any step n
    if (words) { text(ctx, 'y = cos θ', g.X(1.04), g.Y(Math.cos(1.04)) + 18, P.cyan, { align: 'right', size: 11.5 }); text(ctx, `θ* = ${fix(THETA, 6)}`, g.X(THETA) + 10, g.Y(THETA) + 14, P.cyan, { size: 11.5 }); text(ctx, `θ${sub(n + 1)} = ${fix(b, 4)}`, g.pl + g.iw - 8, g.pt + g.ih - 12, P.amber, { align: 'right', size: 11.5 }); }
    const padB = wide ? [W / 2 + 12, 14, top, bot] : [14, 14, midY + 10, bot];
    const h = kit.plot(cv, { x: [-1.08, 1.08], y: [-1.08, 1.08], equal: true, pad: padB, clear: false }), al = ALPHA3(), ab = ABS3();
    const ring = (r, color, dash) => { ctx.strokeStyle = color; ctx.lineWidth = 1.2 * k2; ctx.setLineDash(dash); ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(h.X(0), h.Y(0), r * h.scale, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; };
    h.hline(0, P.panelEdge); h.vline(0, P.panelEdge);
    ring(THETA, P.cyan, [5, 4]); ring(ab, P.violet, [2, 3]); ring(1, P.lineHot, []);
    const sp = []; for (let i = 0; i <= n; i++) sp.push(cpow(al, i));
    const nx = cpow(al, n + 1), last = sp[sp.length - 1];
    const path = sp.slice(); if (fr > 0) path.push([last[0] + (nx[0] - last[0]) * fr, last[1] + (nx[1] - last[1]) * fr]);
    h.line(path, P.violet, { width: 1.8 * k2 });
    sp.forEach((z, i) => h.dot(z[0], z[1], P.violet, (i === n ? 0 : 3) * k2));
    h.dot(last[0], last[1], P.amber, 5 * k2, { glow: 10 });
    if (!words) return;
    text(ctx, `α${sup(n)}`, h.X(last[0]) + 9, h.Y(last[1]) - 10, P.amber, { size: 11.5 });
    text(ctx, `|α| = ${fix(ab, 6)}`, h.X(-0.98), h.Y(0.98), P.violet, { size: 11.5 }); text(ctx, `θ* = ${fix(THETA, 6)}`, h.X(-0.98), h.Y(0.98) + 16, P.cyan, { size: 11.5 });
    text(ctx, `arg α = ${fix(Math.atan2(al[1], al[0]) * 180 / Math.PI, 2)}°`, h.X(-0.98), h.Y(0.98) + 32, P.dim, { size: 11 });
    // magnifier: the two circles near angle 0, radially stretched about 160×
    const mw = Math.min(170, h.iw * 0.45), mh = 78, mx = h.pl + h.iw - mw - 4, my = h.pt + h.ih - mh - 4, r0 = (THETA + ab) / 2, zoom = 24 / (THETA - ab);
    ctx.fillStyle = P.stage; ctx.globalAlpha = 0.92; ctx.fillRect(mx, my, mw, mh); ctx.globalAlpha = 1; ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(mx + 0.5, my + 0.5, mw - 1, mh - 1);
    const ly = (r) => my + mh / 2 - (r - r0) * zoom;
    ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]); ctx.strokeStyle = P.cyan; ctx.beginPath(); ctx.moveTo(mx + 6, ly(THETA)); ctx.lineTo(mx + mw - 6, ly(THETA)); ctx.stroke();
    ctx.setLineDash([2, 3]); ctx.strokeStyle = P.violet; ctx.beginPath(); ctx.moveTo(mx + 6, ly(ab)); ctx.lineTo(mx + mw - 6, ly(ab)); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(mx + mw / 2, ly(THETA)); ctx.lineTo(mx + mw / 2, ly(ab)); ctx.stroke();
    text(ctx, `${fix(relDiff(), 4)}%`, mx + mw / 2 + 6, my + mh / 2, P.magenta, { size: 11, weight: 600 });
    text(ctx, L(`放大 ×${Math.round(zoom / h.scale)}`, `zoom ×${Math.round(zoom / h.scale)}`), mx + 6, my + 9, P.dim, { size: 9.5, halo: false });
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.globalAlpha = 0.8; ctx.strokeRect(h.X(r0) - 4, h.Y(0) - 4, 8, 8); ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(h.X(r0), h.Y(0) + 4); ctx.lineTo(mx + mw / 2, my); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
  }

  /* words: the pruned binary tree */
  function drawWords(q) {
    const T = q.T, D = q.D, thumb = TRV.thumbMode, words = !thumb, k2 = thumb ? 1.8 : 1, golden = S.K === 2;
    const g = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [words ? 18 : 10, words ? 84 : 10, box.top, box.bottom + (golden ? (words ? 74 : 54) : 4)] }), ctx = g.ctx; view = g;
    lastPlot = { kind: 'words', g };
    const rowY = (d) => g.pt + (D ? d / D : 0) * g.ih, X = (x) => g.pl + x * g.iw, vis = (d) => (d <= q.depth ? 1 : d === q.depth + 1 ? q.frac : 0);
    for (const nd of T.nodes) {
      if (nd.parent < 0) continue;
      const a = vis(nd.d); if (!a) continue;
      const pa = T.nodes[nd.parent];
      ctx.globalAlpha = a * (nd.digit ? 0.85 : 0.5); ctx.strokeStyle = nd.digit ? P.cyan : P.ink; ctx.lineWidth = (nd.digit ? 1.5 : 1) * k2;
      ctx.beginPath(); ctx.moveTo(X(pa.x), rowY(pa.d)); ctx.lineTo(X(nd.x), rowY(nd.d)); ctx.stroke();
    }
    const dx = Math.min(16, g.iw / T.level[D].length * 0.7);
    for (const s of T.stubs) {
      const a = vis(s.d); if (!a) continue;
      const pa = T.nodes[s.parent], x2 = X(pa.x) + dx, y2 = rowY(pa.d) + (rowY(s.d) - rowY(pa.d)) * 0.55, r = 3.2 * k2;
      ctx.globalAlpha = a * 0.9; ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.2 * k2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(pa.x), rowY(pa.d)); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
      ctx.lineWidth = 1.6 * k2; ctx.beginPath(); ctx.moveTo(x2 - r, y2 - r); ctx.lineTo(x2 + r, y2 + r); ctx.moveTo(x2 + r, y2 - r); ctx.lineTo(x2 - r, y2 + r); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const rr = clamp(g.iw / T.level[D].length * 0.28, 1.6, 4.5) * k2;
    for (const nd of T.nodes) {
      const a = vis(nd.d); if (!a) continue;
      const front = nd.d === Math.min(q.depth, D);
      ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(X(nd.x), rowY(nd.d), front ? rr + 1 : rr, 0, TAU);
      if (front) { ctx.fillStyle = P.amber; ctx.fill(); } else if (nd.digit === 1) { ctx.fillStyle = P.cyan; ctx.fill(); } else { ctx.fillStyle = P.stage; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1; ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
    // the right column (header and counts) is right-aligned 10 px inside the canvas edge, so it never clips
    const colR = cv.clientWidth - 10;
    if (words) for (let d = 0; d <= D; d++) { const a = vis(d); if (!a) continue; text(ctx, String(T.level[d].length), colR, rowY(d), d === Math.min(q.depth, D) ? P.amber : P.ink, { align: 'right', size: 12, weight: 600, alpha: a }); }
    if (words) text(ctx, L('合法字数', 'legal words'), colR, g.pt - 14, P.dim, { align: 'right', size: 10.5, face: 'body' });
    if (!golden) return;
    // K = 2: the internal coordinate Σ εⱼψʲ of the words on the front row, in the golden window [−1, φ]
    const fd = Math.min(q.depth, D), psi = 1 - PHI, wy = g.pt + g.ih + (words ? 44 : 34), wx = (v) => g.pl + (v + 1) / (PHI + 1) * g.iw;
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.2 * k2; ctx.beginPath(); ctx.moveTo(wx(-1), wy); ctx.lineTo(wx(PHI), wy); ctx.stroke();
    for (const e of [-1, PHI]) { ctx.beginPath(); ctx.moveTo(wx(e), wy - 6); ctx.lineTo(wx(e), wy + 6); ctx.stroke(); }
    for (const id of T.level[fd]) { let v = 0, b = T.nodes[id].bits; for (let j = 0; b; j++, b >>= 1) if (b & 1) v += Math.pow(psi, j); ctx.fillStyle = P.cyan; ctx.globalAlpha = 0.9; ctx.fillRect(wx(v) - 1 * k2, wy - 9 * k2, 2 * k2, 18 * k2); }
    ctx.globalAlpha = 1;
    if (words) { text(ctx, '−1', wx(-1), wy + 16, P.dim, { align: 'center', size: 10.5 }); text(ctx, 'φ', wx(PHI), wy + 16, P.dim, { align: 'center', size: 10.5 });
      // the caption keeps inside the canvas: a shorter wording on a narrow stage, centred but clamped to the edges
      const capW = cv.clientWidth;
      let cap = L('每个字的内部坐标 Σ εⱼψʲ 都落在黄金窗口 [−1, φ] 里', 'the internal coordinate Σ εⱼψʲ of every word lies in the golden window [−1, φ]');
      ctx.font = `11px ${face('body')}`;
      if (ctx.measureText(cap).width > capW - 20) { cap = L('内部坐标 Σ εⱼψʲ 都在黄金窗口 [−1, φ] 里', 'internal coordinates Σ εⱼψʲ lie in [−1, φ]'); }
      const half = ctx.measureText(cap).width / 2;
      text(ctx, cap, clamp((wx(-1) + wx(PHI)) / 2, 10 + half, capW - 10 - half), wy - 22, P.dim, { align: 'center', size: 11, face: 'body' }); }
  }

  /* padic: the residue tree */
  function drawPadic(q) {
    const p = S.p, H = q.H, thumb = TRV.thumbMode, words = !thumb, k2 = thumb ? 1.8 : 1;
    const g = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [words ? 70 : 12, 14, box.top + 6, box.bottom + 8] }), ctx = g.ctx; view = g;
    lastPlot = { kind: 'padic', g };
    const rowY = (k) => g.pt + k / H * g.ih, X = (k, r) => g.pl + placeOf(p, k, r) * g.iw;
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.globalAlpha = 0.75;
    for (let k = 0; k < H; k++) { const pk = Math.pow(p, k); for (let r = 0; r < pk; r++) for (let j = 0; j < p; j++) { ctx.beginPath(); ctx.moveTo(X(k, r), rowY(k)); ctx.lineTo(X(k + 1, r + j * pk), rowY(k + 1)); ctx.stroke(); } }
    ctx.globalAlpha = 1;
    const kk = q.k;
    ctx.fillStyle = P.amber; ctx.globalAlpha = 0.1; ctx.fillRect(g.pl - 6, rowY(kk) - 12, g.iw + 12, 24); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.amber; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.pl - 6, rowY(kk) + 12.5); ctx.lineTo(g.pl + g.iw + 6, rowY(kk) + 12.5); ctx.stroke();
    const trio = [[S.x, P.cyan, -3], [S.y, P.magenta, 0], [S.z, P.violet, 3]];
    for (const [v, c, off] of trio) {
      ctx.strokeStyle = c; ctx.lineWidth = 2.6 * k2; ctx.beginPath();
      for (let k = 0; k <= H; k++) { const x = X(k, mod(v, Math.pow(p, k))) + off * k2, y = rowY(k); if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
      for (let k = 0; k <= H; k++) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(X(k, mod(v, Math.pow(p, k))) + off * k2, rowY(k), (k === kk ? 4.5 : 2.6) * k2, 0, TAU); ctx.fill(); }
    }
    const v = vp(p, S.x - S.y), split = v + 1;
    if (S.x !== S.y && split <= H) { const xs = X(split - 1, mod(S.x, Math.pow(p, split - 1))); ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(xs, rowY(split - 1), 10 * k2, 0, TAU); ctx.stroke(); }
    if (!words) return;
    for (let k = 0; k <= H; k++) text(ctx, `k = ${k}`, g.pl - 16, rowY(k), k === kk ? P.amber : P.dim, { align: 'right', size: 11 });
    const pk = Math.pow(p, kk), rd = (val) => mod(val, pk);
    text(ctx, L(`精度 ${p}${sup(kk)}：x → ${rd(S.x)}，y → ${rd(S.y)}，z → ${rd(S.z)}`, `precision ${p}${sup(kk)}: x → ${rd(S.x)}, y → ${rd(S.y)}, z → ${rd(S.z)}`), g.pl + g.iw / 2, rowY(kk) + (kk < H ? 26 : -26), P.amber, { align: 'center', size: 11.5, face: 'body' });
    if (S.x !== S.y && split <= H) { const xs = X(split - 1, mod(S.x, Math.pow(p, split - 1))); text(ctx, L(`x、y 在 k = ${split} 第一次分开`, `x and y part at k = ${split}`), clamp(xs + 16, g.pl, g.pl + g.iw - 150), rowY(split - 1) - 16, P.magenta, { size: 11.5, face: 'body' }); }
  }

  /* cut: the junction matrix and the rank rectangle */
  function drawCut(q) {
    const E = q.E, Wd = cv.clientWidth, H = cv.clientHeight, thumb = TRV.thumbMode, words = !thumb, wide = Wd > 620;
    const g = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g.ctx; view = null;
    const x = E.rows[q.r], y = E.cols[q.c], tx = terminalRun(x), iy = initialRun(y), ok = tx + iy < S.K;
    // the selected pair as chips, with the cut between them
    const chip = words ? clamp(Math.min(26, (Wd - 80) / (S.mX + S.mY + 2)), 12, 26) : 22, top = box.top + 4, cx = Wd / 2, gap = chip * 1.2;
    const xl = cx - gap / 2 - S.mX * chip, yl = cx + gap / 2;
    const seam = new Set(); for (let i = 0; i < tx; i++) seam.add(`x${S.mX - 1 - i}`); for (let i = 0; i < iy; i++) seam.add(`y${i}`);
    const cell = (x0, b, k, id) => {
      const hot = seam.has(id), c = hot ? (ok ? P.cyan : P.magenta) : P.ink;
      ctx.strokeStyle = c; ctx.lineWidth = hot ? 2 : 1; ctx.globalAlpha = hot ? 1 : 0.7; ctx.strokeRect(x0 + 2.5, top + 0.5, chip - 4, chip - 1);
      if (b) { ctx.fillStyle = c; ctx.globalAlpha = hot ? 0.85 : 0.55; ctx.fillRect(x0 + 4, top + 2, chip - 7, chip - 4); }
      ctx.globalAlpha = 1; if (words && chip >= 18) text(ctx, String(b), x0 + chip / 2, top + chip / 2 + 1, b ? P.stage : P.ink, { align: 'center', size: 11.5, halo: false, weight: 600 });
    };
    x.forEach((b, k) => cell(xl + k * chip, b, k, `x${k}`)); y.forEach((b, k) => cell(yl + k * chip, b, k, `y${k}`));
    ctx.strokeStyle = P.amber; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, top - 6); ctx.lineTo(cx, top + chip + 6); ctx.stroke();
    if (words) {
      text(ctx, 'x', xl - 10, top + chip / 2, P.ink, { align: 'right', size: 12 }); text(ctx, 'y', yl + S.mY * chip + 10, top + chip / 2, P.ink, { size: 12 });
      text(ctx, ok ? L(`τ(x) + ι(y) = ${tx} + ${iy} < ${S.K}：接缝合法`, `τ(x) + ι(y) = ${tx} + ${iy} < ${S.K}: the seam is legal`) : L(`τ(x) + ι(y) = ${tx} + ${iy} ≥ ${S.K}：接缝上凑满 ${S.K} 个 1`, `τ(x) + ι(y) = ${tx} + ${iy} ≥ ${S.K}: ${S.K} ones meet at the seam`), cx, top + chip + 16, ok ? P.cyan : P.magenta, { align: 'center', size: 12, face: 'body', weight: 600 });
    }
    // the junction matrix (page 1: both words start with 1) and the rank rectangle
    const y0 = top + chip + (words ? 44 : 20), availH = H - y0 - box.bottom - (words ? 20 : 6), leftW = wide ? Wd * 0.58 : Wd - 40, rows = E.rows.length, cols = E.cols.length;
    const rk = Math.max(E.R[0], E.R[1], S.K) + 1, rightW = wide ? Wd - leftW - 60 : 0;
    const matH = wide ? availH : availH * 0.6, cellM = Math.max(3, Math.min((leftW - (words ? 60 : 20)) / cols, (matH - (words ? 22 : 4)) / rows, 40));
    const mx0 = wide ? 30 + (words ? 34 : 0) + Math.max(0, (leftW - 30 - (words ? 34 : 0) - cols * cellM) / 2) : (Wd - cols * cellM) / 2, my0 = y0 + (words ? 18 : 0) + (wide ? Math.max(0, (matH - (words ? 22 : 4) - rows * cellM) / 2) : 0);
    lastPlot = { kind: 'cut', m: { x0: mx0, y0: my0, cell: cellM, rows, cols } };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { ctx.fillStyle = E.legal[r][c] ? P.cyan : P.magenta; ctx.globalAlpha = E.legal[r][c] ? 0.45 : 0.6; ctx.fillRect(mx0 + c * cellM + 0.5, my0 + r * cellM + 0.5, cellM - 1, cellM - 1); }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = P.ink; ctx.lineWidth = 1; ctx.globalAlpha = 0.6;
    for (let r = 1; r < rows; r++) if (terminalRun(E.rows[r]) !== terminalRun(E.rows[r - 1])) { ctx.beginPath(); ctx.moveTo(mx0, my0 + r * cellM); ctx.lineTo(mx0 + cols * cellM, my0 + r * cellM); ctx.stroke(); }
    for (let c = 1; c < cols; c++) if (initialRun(E.cols[c]) !== initialRun(E.cols[c - 1])) { ctx.beginPath(); ctx.moveTo(mx0 + c * cellM, my0); ctx.lineTo(mx0 + c * cellM, my0 + rows * cellM); ctx.stroke(); }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = P.amber; ctx.lineWidth = 2.2; ctx.strokeRect(mx0 + q.c * cellM - 1, my0 + q.r * cellM - 1, cellM + 2, cellM + 2);
    if (words) {
      for (let r = 0; r < rows; r++) if (!r || terminalRun(E.rows[r]) !== terminalRun(E.rows[r - 1])) text(ctx, `τ=${terminalRun(E.rows[r])}`, mx0 - 6, my0 + r * cellM + Math.min(cellM, 14) / 2 + 1, P.dim, { align: 'right', size: 10.5 });
      for (let c = 0; c < cols; c++) if (!c || initialRun(E.cols[c]) !== initialRun(E.cols[c - 1])) text(ctx, `ι=${initialRun(E.cols[c])}`, mx0 + c * cellM + 2, my0 - 9, P.dim, { size: 10.5 });
      text(ctx, L(`第 1 页：${rows} 个 x × ${cols} 个 y`, `page 1: ${rows} x × ${cols} y`), mx0, my0 + rows * cellM + 13, P.dim, { size: 10.5, face: 'body' });
    }
    // rank rectangle
    const rx0 = wide ? leftW + 40 : 30, ry1 = wide ? my0 + Math.min(availH - 24, rightW) : H - box.bottom - 24, size = wide ? Math.min(rightW - 10, availH - 30) : Math.min(Wd - 60, availH - matH - 46), cr = size / (rk + 1);
    const ry0 = wide ? my0 + 6 : y0 + matH + 30, ox = rx0 + (words ? 18 : 0), oy = ry0 + size;
    if (size > 40) {
      for (let a = 0; a <= rk; a++) for (let b = 0; b <= rk; b++) {
        const inside = a >= 1 && b >= 1 && a <= E.R[0] && b <= E.R[1], X0 = ox + a * cr, Y0 = oy - (b + 1) * cr;
        ctx.fillStyle = inside ? P.cyan : P.panelEdge; ctx.globalAlpha = inside ? 0.42 : 0.5; ctx.fillRect(X0 + 1, Y0 + 1, cr - 2, cr - 2);
      }
      ctx.globalAlpha = 1;
      if (words && cr >= 11) for (let a = 0; a <= rk; a++) { text(ctx, String(a), ox + (a + 0.5) * cr, oy + 9, P.dim, { align: 'center', size: 9.5, halo: false }); text(ctx, String(a), ox - 4, oy - (a + 0.5) * cr, P.dim, { align: 'right', size: 9.5, halo: false }); }
      const chosen = S.K <= E.R[0] && S.K <= E.R[1];
      ctx.strokeStyle = chosen ? P.amber : P.magenta; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(ox + (S.K + 0.5) * cr, oy - (S.K + 0.5) * cr, cr * 0.42, 0, TAU); ctx.stroke();
      if (words) {
        text(ctx, 'r₀ →', ox + (rk + 1) * cr, oy + 22, P.dim, { align: 'right', size: 10.5 }); text(ctx, '↑ r₁', ox - 4, oy - (rk + 1) * cr - 8, P.dim, { size: 10.5 });
        text(ctx, `R₀ = ${E.R[0]} · R₁ = ${E.R[1]}`, ox, oy - (rk + 1) * cr - 24, P.cyan, { size: 12, weight: 600 });
        text(ctx, chosen ? `(${S.K}, ${S.K})` : L(`(${S.K}, ${S.K}) 不可取`, `(${S.K}, ${S.K}) not allowed`), ox + (S.K + 1) * cr + 4, oy - (S.K + 0.5) * cr, chosen ? P.amber : P.magenta, { size: 11.5 });
      }
    }
  }

  /* entropy: the Parry ladder and the escape grid */
  function drawEntropy(q) {
    const Wd = cv.clientWidth, H = cv.clientHeight, thumb = TRV.thumbMode, words = !thumb, k2 = thumb ? 1.8 : 1, wide = Wd > 640, K = S.K, par = q.par;
    const g = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g.ctx; view = null;
    lastPlot = { kind: 'entropy' };
    const top = box.top + 8, bot = H - box.bottom - 6, availH = bot - top;
    const lw = wide ? Wd * 0.46 : Wd - 32, lx0 = wide ? 28 : 16, lh = wide ? availH : availH * 0.45;
    // ladder: rows + (top) and − (bottom), columns j = 0 … K − 1
    const colX = (j) => lx0 + 46 + (lw - 76) * (K === 1 ? 0.5 : j / (K - 1)), rowsY = [top + lh * 0.24, top + lh * 0.62], maxLaw = Math.max(...par.law), rmax = Math.min(26, (lw - 60) / (K - 1 || 1) * 0.32, lh * 0.12) * (thumb ? 1.2 : 1);
    const node = (si) => { const s = par.states[si]; return [colX(s[1]), rowsY[s[0] ? 0 : 1]]; };
    const rad = (si) => Math.max(3, rmax * Math.sqrt(par.law[si] / maxLaw));
    const head = (x, y, ux, uy, hs, c, a) => { ctx.globalAlpha = a; ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - ux * hs - uy * hs * 0.45, y - uy * hs + ux * hs * 0.45); ctx.lineTo(x - ux * hs + uy * hs * 0.45, y - uy * hs - ux * hs * 0.45); ctx.closePath(); ctx.fill(); };
    par.states.forEach((s, si) => par.states.forEach((t, ti) => {
      const k = par.ker(s, t); if (!k) return;
      const [ax, ay] = node(si), [bx, by] = node(ti), ra = rad(si), rb = rad(ti), a = 0.3 + 0.65 * k;
      if (t[1] === s[1] + 1) {
        ctx.strokeStyle = P.cyan; ctx.globalAlpha = a; ctx.lineWidth = (1 + 2.5 * k) * k2;
        ctx.beginPath(); ctx.moveTo(ax + ra + 2, ay); ctx.lineTo(bx - rb - 8, by); ctx.stroke();
        head(bx - rb - 2, by, 1, 0, 9 * k2, P.cyan, a);
      } else {
        const bow = s[0] ? -1 : 1, qx = (ax + bx) / 2 + bow * (s[1] ? 14 : 34), qy = (ay + by) / 2;
        let ux = bx - qx, uy = by - qy; const ul = Math.hypot(ux, uy) || 1; ux /= ul; uy /= ul;
        let vx = qx - ax, vy = qy - ay; const vl = Math.hypot(vx, vy) || 1; vx /= vl; vy /= vl;
        const ex = bx - ux * (rb + 2), ey = by - uy * (rb + 2);
        ctx.strokeStyle = P.magenta; ctx.globalAlpha = a; ctx.lineWidth = (0.8 + 2 * k) * k2;
        ctx.beginPath(); ctx.moveTo(ax + vx * ra, ay + vy * ra); ctx.quadraticCurveTo(qx, qy, ex - ux * 6, ey - uy * 6); ctx.stroke();
        head(ex, ey, ux, uy, 9 * k2, P.magenta, a);
      }
    }));
    ctx.globalAlpha = 1;
    par.states.forEach((s, si) => { const [x, y] = node(si), r = rad(si); ctx.fillStyle = P.cyan; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = P.ink; ctx.lineWidth = 1; ctx.stroke(); });
    if (words) {
      for (let j = 0; j < K; j++) text(ctx, `j=${j}`, colX(j), rowsY[1] + rmax + 14, P.dim, { align: 'center', size: 10.5 });
      text(ctx, '+', colX(0) - rmax - 10, rowsY[0], P.ink, { size: 15, weight: 600, align: 'right' }); text(ctx, '−', colX(0) - rmax - 10, rowsY[1], P.ink, { size: 15, weight: 600, align: 'right' });
      text(ctx, `π(+, 0) = ${fix(par.law[0], 4)}`, colX(0), rowsY[0] - rmax - 12, P.cyan, { align: 'center', size: 11 });
    }
    // the unit bar p + p² + … + p^K = 1
    const by0 = top + lh * 0.86, bw = lw - 40, bx0 = lx0 + 20, bh = 14 * k2;
    let acc = 0;
    for (let a = 1; a <= K; a++) { const w = Math.pow(par.p, a) * bw; ctx.fillStyle = P.cyan; ctx.globalAlpha = a % 2 ? 0.75 : 0.4; ctx.fillRect(bx0 + acc, by0, w - 1, bh); ctx.globalAlpha = 1; if (words && w > 26) text(ctx, a === 1 ? 'p' : `p${sup(a)}`, bx0 + acc + w / 2, by0 + bh / 2, P.stage, { align: 'center', size: 11, halo: false, weight: 600 }); acc += w; }
    ctx.strokeStyle = P.ink; ctx.lineWidth = 1; ctx.strokeRect(bx0 - 0.5, by0 - 0.5, bw + 1, bh + 1);
    if (words) text(ctx, L(`p = 1/β${sub(K)} = ${fix(par.p, 5)} · p + … + p${sup(K)} = ${fix(par.rootSum, 12)}`, `p = 1/β${sub(K)} = ${fix(par.p, 5)} · p + … + p${sup(K)} = ${fix(par.rootSum, 12)}`), bx0, by0 + bh + 14, P.dim, { size: 11 });
    // the escape grid
    const A = q.A, gx0 = wide ? Wd * 0.52 + 30 : 40, gy0 = wide ? top + 26 : top + lh + 34, gsz = wide ? Math.min(Wd - gx0 - 24, availH - 50) : Math.min(Wd - 60, bot - gy0 - 26), c = gsz / A.q;
    for (let i = 0; i < A.q; i++) for (let j = 0; j < A.q; j++) {
      const id = i * A.q + j, X0 = gx0 + j * c, Y0 = gy0 + i * c;
      if (i === j) { ctx.fillStyle = P.panelEdge; ctx.globalAlpha = 0.9; }
      else if (q.changed.has(id)) { ctx.fillStyle = P.amber; ctx.globalAlpha = 0.85; }
      else if (q.E.has(id)) { ctx.fillStyle = P.magenta; ctx.globalAlpha = 0.6; }
      else { ctx.fillStyle = P.cyan; ctx.globalAlpha = 0.12; }
      ctx.fillRect(X0 + 0.5, Y0 + 0.5, c - 1, c - 1);
    }
    ctx.globalAlpha = 1;
    if (words) {
      const sel = q.removed != null ? L(`C 去掉 ${OBS[q.removed].short}`, `C without ${OBS[q.removed].short}`) : `S = {${q.sel.map((i) => OBS[i].short).join(', ')}}`;
      text(ctx, `${sel} · |E| = ${q.count} / ${q.denom}`, gx0, gy0 - 12, q.removed != null ? P.amber : P.magenta, { size: 11.5, weight: 600 });
      if (c >= 13) A.words.forEach((w, i) => text(ctx, w.join(''), gx0 - 4, gy0 + (i + 0.5) * c, P.dim, { align: 'right', size: Math.min(10, c * 0.7) }));
    }
  }

  function drawStage(q) {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    box.top = TRV.thumbMode ? 26 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10;
    box.bottom = TRV.thumbMode ? 26 : Math.max(18, $('legend').offsetHeight + 20);
    lastSand = null; lastPlot = null;
    if (S.view === 'sand') return drawSand(q);
    st.begin(); st.end();
    ({ rauzy: drawRauzy, roots: drawRoots, spiral: drawSpiral, words: drawWords, padic: drawPadic, cut: drawCut, entropy: drawEntropy })[S.view](q);
  }

  /* ---------- strips ---------- */
  function drawPlots(q) {
    if (TRV.still || TRV.figure) return;
    const A = $('plotA'), B = $('plotB'), title = (a, am, b, bm) => { $('pATitle').textContent = a; $('pAMeta').textContent = am; $('pBTitle').textContent = b; $('pBMeta').textContent = bm; };
    const v = S.view, pad = [40, 10, 8, 20];
    if (v === 'sand' || v === 'rauzy') {
      const W = q.W, Qm = Math.min(S.Q, W.Q), d = q.depth;
      if (v === 'sand') {
        const g = kit.plot(A, { x: [0, Qm], y: [1, Math.max(10, count(S.K, Qm)) * 1.3], pad, logY: true });
        g.axes({ xTicks: [0, Math.round(Qm / 2), Qm], yTicks: [1, 10, 100, 1000, 10000].filter((x) => x <= g.y1), xLabel: 'q' });
        const pts = []; for (let k = 0; k <= Qm; k++) pts.push([k, count(S.K, k)]);
        g.line(pts, P.cyan, { width: 1.6 }); pts.forEach(([k, c]) => g.dot(k, c, k === d ? P.amber : P.cyan, k === d ? 4.5 : 2.4));
        const h = kit.plot(B, { x: [0, Qm], y: [0.1, Math.pow(rootsOf(S.K).beta, Qm) * 1.5], pad, logY: true }), ph = [], ip = [];
        for (let k = 0; k <= Qm; k++) { let mp = 0, mi = 0; for (let i = 0; i < W.upto[k]; i++) { mp = Math.max(mp, W.ph[i]); mi = Math.max(mi, Math.hypot(W.re[i], W.im[i])); } ph.push([k, Math.max(mp, 0.1)]); ip.push([k, Math.max(mi, 0.1)]); }
        h.axes({ xTicks: [0, Math.round(Qm / 2), Qm], yTicks: [[1, '1'], [10, '10'], [100, '10²'], [1000, '10³']].filter((x) => x[0] <= h.y1), xLabel: 'q' });
        h.line(ph, P.magenta, { width: 1.8 }); h.line(ip, P.cyan, { width: 1.8 }); h.vline(d, P.amber, { alpha: 0.8 });
        h.legend([[P.magenta, L('最大的 e(β)', 'largest e(β)')], [P.cyan, L('最大的 |e(α)|', 'largest |e(α)|')]], { right: false });
        title(L('每个字长的合法字数', 'Legal words per length'), `dbonacci ${S.K} (q + 2)`, L('物理方向放大，内部有界', 'Physical grows, internal stays bounded'), L('对数坐标', 'log scale'));
      } else {
        const bars = Array.from({ length: S.K }, () => 0); for (let i = 0; i < W.upto[d]; i++) bars[W.br[i]]++;
        const g = kit.plot(A, { x: [-0.6, S.K - 0.4], y: [0, Math.max(...bars, 1) * 1.2], pad });
        g.axes({ xTicks: bars.map((_, k) => [k, k === 0 ? '0…' : `${'1'.repeat(k)}0…`]), yTicks: [0, Math.round(Math.max(...bars, 1) / 2), Math.max(...bars, 1)] });
        bars.forEach((b, k) => g.rect(k - 0.32, 0, k + 0.32, b, BR()[k], { alpha: 0.75 }));
        const h = kit.plot(B, { x: [0, Qm], y: [0, 1 / (1 - cabs(rootsOf(S.K).alpha)) * 1.1], pad }), ip = [];
        for (let k = 0; k <= Qm; k++) { let mi = 0; for (let i = 0; i < W.upto[k]; i++) mi = Math.max(mi, Math.hypot(W.re[i], W.im[i])); ip.push([k, mi]); }
        h.axes({ xTicks: [0, Math.round(Qm / 2), Qm], yTicks: [0, 1, 2, 3].filter((x) => x <= h.y1), xLabel: 'q' });
        h.hline(1 / (1 - cabs(rootsOf(S.K).alpha)), P.dim, { dash: [4, 3] }); h.line(ip, P.cyan, { width: 1.8 }); h.vline(d, P.amber, { alpha: 0.8 });
        title(L('每一支有多少个点', 'Points in each branch'), S.K === 3 ? L('= C(q − 1)、C(q − 2)、C(q − 3)', '= C(q − 1), C(q − 2), C(q − 3)') : '', L('内部坐标一直有界', 'The internal coordinate stays bounded'), L('虚线：1/(1 − |α|)', 'dashed: 1/(1 − |α|)'));
      }
    } else if (v === 'roots') {
      const g = kit.plot(A, { x: [1.5, 8.5], y: [1e-3, 1], pad, logY: true });
      g.axes({ xTicks: [2, 3, 4, 5, 6, 7, 8], yTicks: [[1, '1'], [0.1, '0.1'], [0.01, '0.01'], [0.001, '10⁻³']], xLabel: 'K' });
      for (let k = 2; k <= 8; k++) { const b = rootsOf(k).beta; g.line([[k, 1e-3], [k, 2 - b]], P.magenta, { width: k === q.K ? 6 : 4, alpha: k === q.K ? 1 : 0.6 }); g.dot(k, Math.pow(b, -k), k === q.K ? P.amber : P.ink, 3.5, { ring: true }); }
      const h = kit.plot(B, { x: [1.5, 8.5], y: [0.5, 1.05], pad });
      h.axes({ xTicks: [2, 3, 4, 5, 6, 7, 8], yTicks: [0.6, 0.8, 1], xLabel: 'K' }); h.hline(1, P.dim, { dash: [4, 3] });
      const mm = []; for (let k = 2; k <= 8; k++) mm.push([k, Math.max(...rootsOf(k).conj.map(cabs))]);
      h.line(mm, P.cyan, { width: 1.6 }); mm.forEach(([k, m]) => h.dot(k, m, k === q.K ? P.amber : P.cyan, k === q.K ? 4.5 : 2.8));
      title(L('离 2 还差多少', 'How far from 2'), L('条：2 − β · 圈：β⁻ᴷ', 'bars: 2 − β · rings: β⁻ᴷ'), L('共轭根的最大模', 'Largest conjugate modulus'), L('虚线：单位圆', 'dashed: the unit circle'));
    } else if (v === 'spiral') {
      const g = kit.plot(A, { x: [0, SPIRAL_N], y: [1e-4, 1.2], pad, logY: true }), e1 = [], e2 = [];
      for (let i = 0; i <= SPIRAL_N; i++) { e1.push([i, Math.max(Math.abs(cosSeq[i] - THETA), 1e-4)]); e2.push([i, Math.max(Math.pow(ABS3(), i), 1e-4)]); }
      g.axes({ xTicks: [0, 8, 16, 24], yTicks: [[1, '1'], [1e-2, '10⁻²'], [1e-4, '10⁻⁴']], xLabel: 'n' });
      g.line(e1, P.cyan, { width: 1.6 }); g.line(e2, P.violet, { width: 1.6 }); g.vline(q.depth, P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, '|θₙ − θ*|'], [P.violet, '|α|ⁿ']], { right: true });
      const h = kit.plot(B, { x: [0, SPIRAL_N], y: [0.45, 1.05], pad }), th = cosSeq.slice(0, SPIRAL_N + 1).map((v2, i) => [i, v2]);
      h.axes({ xTicks: [0, 8, 16, 24], yTicks: [0.5, 0.75, 1], xLabel: 'n' });
      h.hline(THETA, P.cyan, { dash: [5, 4] }); h.hline(ABS3(), P.violet, { dash: [2, 3] }); h.line(th, P.ink, { width: 1.2, alpha: 0.7 }); h.dot(q.depth, cosSeq[q.depth], P.amber, 4);
      title(L('两种收缩，两个比例', 'Two contractions, two ratios'), `sin θ* ≈ ${fix(Math.sin(THETA), 4)} · |α| ≈ ${fix(ABS3(), 4)}`, L('余弦迭代的值', 'Values of the cosine iteration'), L('收向青线，不收向紫线', 'to the cyan line, not the violet'));
    } else if (v === 'words') {
      const D = q.D, g = kit.plot(A, { x: [-0.6, D + 0.6], y: [0, count(S.K, D) * 1.15], pad });
      g.axes({ xTicks: [0, Math.round(D / 2), D], yTicks: [0, Math.round(count(S.K, D) / 2), count(S.K, D)], xLabel: 'q' });
      for (let k = 0; k <= D; k++) g.rect(k - 0.3, 0, k + 0.3, count(S.K, k), k === q.depth ? P.amber : P.cyan, { alpha: k <= q.depth ? 0.8 : 0.25 });
      const h = kit.plot(B, { x: [0, 12], y: [1, 2.05], pad }), rt = [];
      for (let k = 0; k < 12; k++) rt.push([k + 1, count(S.K, k + 1) / count(S.K, k)]);
      h.axes({ xTicks: [1, 6, 12], yTicks: [1, 1.5, 2], xLabel: 'q' }); h.hline(rootsOf(S.K).beta, P.amber, { dash: [4, 3] }); h.line(rt, P.cyan, { width: 1.6 });
      title(L('每一层的合法字数', 'Legal words on each level'), S.K === 2 ? L('斐波那契数', 'Fibonacci numbers') : `C(q) = C(q − 1) + … + C(q − ${S.K})`, L('相邻两层之比', 'Ratio of consecutive levels'), `→ β${sub(S.K)} = ${fix(rootsOf(S.K).beta, 4)}`);
    } else if (v === 'padic') {
      const H = q.H, g = kit.plot(A, { x: [-0.6, H + 0.6], y: [0, 1.2], pad });
      g.axes({ xTicks: Array.from({ length: H + 1 }, (_, k) => k), yTicks: [], xLabel: 'k' });
      for (let k = 0; k <= H; k++) { const same = mod(S.x, Math.pow(S.p, k)) === mod(S.y, Math.pow(S.p, k)); g.rect(k - 0.3, 0, k + 0.3, 1, same ? P.cyan : P.magenta, { alpha: k === q.k ? 0.9 : 0.5 }); }
      const ds = [dist(S.p, H, S.x, S.y), dist(S.p, H, S.y, S.z), dist(S.p, H, S.x, S.z)], h = kit.plot(B, { x: [-0.6, 2.6], y: [0, H + 0.5], pad });
      h.axes({ xTicks: [[0, 'd(x,y)'], [1, 'd(y,z)'], [2, 'd(x,z)']], yTicks: Array.from({ length: H + 1 }, (_, k) => k) });
      ds.forEach((dv, i) => h.rect(i - 0.3, 0, i + 0.3, dv, i === 2 ? P.violet : P.cyan, { alpha: 0.75 })); h.hline(Math.max(ds[0], ds[1]), P.amber, { dash: [4, 3] });
      title(L('每一层上两个数的读数相同吗', 'Same reading on each level?'), L('x 与 y · 青：相同 · 品红：不同', 'x and y · cyan: same · magenta: different'), L('视界内的距离', 'Distance within the horizon'), L('虚线：前两项的较大者', 'dashed: the larger of the first two'));
    } else if (v === 'cut') {
      const E = q.E, terms = E.a.map((a, s) => a + Math.floor(E.n[s] / E.M[1])).concat([E.cX[1]]), top = Math.max(...terms, 1) * 1.2;
      const g = kit.plot(A, { x: [-0.6, terms.length - 0.4], y: [0, top], pad });
      g.axes({ xTicks: terms.map((_, i) => [i, i < S.K ? `s=${i}` : 'c']), yTicks: [0, Math.round(top / 2.4), Math.round(top / 1.2)] });
      terms.forEach((tv, i) => g.rect(i - 0.32, 0, i + 0.32, tv, tv === E.R[1] ? P.magenta : P.cyan, { alpha: 0.75 }));
      const rm = Math.max(E.R[0], E.R[1], 2), h = kit.plot(B, { x: [0.5, rm + 0.5], y: [0, Math.log(rm) * 1.2 + 0.1], pad }), lr = [];
      for (let r = 1; r <= rm; r++) lr.push([r, Math.log(r)]);
      h.axes({ xTicks: Array.from({ length: rm }, (_, i) => i + 1).filter((r) => rm <= 10 || r % 2 === 1), yTicks: [0, 1, 2].filter((y) => y <= h.y1), xLabel: 'r' });
      h.line(lr, P.cyan, { width: 1.6 }); h.vline(E.R[0], P.cyan, { dash: [4, 3] }); h.vline(E.R[1], P.magenta, { dash: [4, 3] }); if (S.K <= rm) h.dot(S.K, Math.log(S.K), P.amber, 4.5);
      title(L('第 1 页的上限取哪一项', 'Which term caps page 1'), L(`aₛ + ⌊nₛ/M₁⌋ 与 c · 最小者 R₁ = ${E.R[1]}`, `aₛ + ⌊nₛ/M₁⌋ and c · least R₁ = ${E.R[1]}`), L('熵的上限', 'The entropy cap'), `ln r · R₀ = ${E.R[0]} · R₁ = ${E.R[1]}`);
    } else {
      const g = kit.plot(A, { x: [-0.3, ESC_STEPS + 0.3], y: [0, 1.05], pad }), ln = [];
      for (let s = 0; s <= ESC_STEPS; s++) ln.push([s, escapeAt(S.K, s).rate]);
      g.axes({ xTicks: [0, 5, 10], yTicks: [0, 0.5, 1], xLabel: L('步', 'step') }); g.line(ln, P.magenta, { width: 1.6 }); ln.forEach(([s, r]) => g.dot(s, r, s === q.step ? P.amber : P.magenta, s === q.step ? 4.5 : 2.4));
      const h = kit.plot(B, { x: [1.5, 8.5], y: [0.6, 1.02], pad });
      h.axes({ xTicks: [2, 4, 6, 8], yTicks: [0.7, 0.85, 1], xLabel: 'K' }); h.hline(1, P.dim, { dash: [4, 3] });
      for (let k = 2; k <= 8; k++) h.rect(k - 0.3, 0.6, k + 0.3, Math.log2(rootsOf(k).beta), k === S.K ? P.amber : P.violet, { alpha: 0.7 });
      title(L('逃逸率', 'Escape rate'), L('|E(S)| / q(q − 1) · 先加观测，再逐个拿走', '|E(S)| / q(q − 1) · adding, then leaving one out'), L('拓扑熵（文献结果）', 'Topological entropy (literature)'), L('log₂ β 比特 → 1', 'log₂ β bits → 1'));
    }
  }

  /* ---------- words on screen ---------- */
  const SCN = { sand: ['3D 沙盘', '3D SANDTABLE'], plane: ['劳齐 · 螺线', 'RAUZY · SPIRAL'], tree: ['树 · 切口', 'TREE · CUT'], entropy: ['熵 · 逃逸', 'ENTROPY · ESCAPE'] };
  const BRL = (k) => (k === 0 ? '0…' : `${'1'.repeat(k)}0…`);
  function legend() {
    const v = S.view, k3 = S.K === 3;
    if (v === 'sand' || v === 'rauzy') {
      const br = [['cy', k3 ? '0…：f₀ 的像' : '0…', k3 ? '0…: image of f₀' : '0…'], ['vi', k3 ? '10…：f₁₀ 的像' : '10…', k3 ? '10…: image of f₁₀' : '10…']];
      if (S.K > 2) br.push(['mg', k3 ? '110…：f₁₁₀ 的像' : '110…', k3 ? '110…: image of f₁₁₀' : '110…']);
      if (S.K > 3) br.push(['dm', '1110… 及更长', '1110… and longer']);
      return br.concat(v === 'sand' ? [['am', '选中的字与它的两个影子', 'the chosen word and its two shadows']] : [['am', '选中的点，箭头来自它去掉前缀后的点', 'the chosen point, the arrow from it without its prefix']]);
    }
    if (v === 'roots') return [['am', '皮索根 β<sub>K</sub>', 'the Pisot root β<sub>K</sub>'], ['cy', '其余的根', 'the other roots'], ['mg', '缺口 2 − β<sub>K</sub>', 'the gap 2 − β<sub>K</sub>'], ['dm', '较小的 K', 'smaller K']];
    if (v === 'spiral') return [['cy', 'cos θ 与不动点 θ*', 'cos θ and the fixed point θ*'], ['vi', 'αⁿ 与半径 |α|', 'αⁿ and the radius |α|'], ['am', '此刻这一步', 'the current step'], ['mg', '两圆之间的缝', 'the gap between the circles']];
    if (v === 'words') return [['cy', '加一个 1', 'one more 1'], ['mg', '凑满 K 个 1，剪掉', 'K ones in a row: pruned'], ['am', '正在长出的一层', 'the level now growing']];
    if (v === 'padic') return [['cy', `x = ${S.x}`, `x = ${S.x}`], ['mg', `y = ${S.y}`, `y = ${S.y}`], ['vi', `z = ${S.z}`, `z = ${S.z}`], ['am', '此刻读到的精度', 'the precision being read']];
    if (v === 'cut') return [['cy', '接缝合法', 'legal seam'], ['mg', '接缝凑满 K 个 1', 'K ones at the seam'], ['am', '切口与读头', 'the cut and the head']];
    return [['cy', '平稳律 · 加一个 1', 'stationary law · one more 1'], ['mg', '重置 · 区分不了的点对', 'reset · pairs not separated'], ['am', '这一步变了的点对', 'pairs changed at this step']];
  }
  function drawText(q) {
    const set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    const keyRO = (lab, val, sb) => { $('roKeyL').textContent = lab; $('roKey').innerHTML = val; $('roKeySub').textContent = sb || ''; };
    const v = S.view, K = S.K, R = rootsOf(K);
    let big, hud, what, key, note;
    if (v === 'sand' || v === 'rauzy') {
      const W = q.W, d = q.depth, n = W.upto[d], sel = selOf(K), si = W.index.get(sel), al = R.alpha;
      big = `${L(v === 'sand' ? '沙盘' : '劳齐', v === 'sand' ? 'Sandtable' : 'Rauzy')} · q = ${d}`;
      hud = v === 'sand' ? L(`${n} 个不含 ${'1'.repeat(K)} 的字：高度 e(β)/β^q，β = ${fix(R.beta, 4)}；水平面里 e(α)，|α| = ${fix(cabs(al), 4)}`, `${n} words without ${'1'.repeat(K)}: height e(β)/β^q, β = ${fix(R.beta, 4)}; in the plane e(α), |α| = ${fix(cabs(al), 4)}`)
        : K === 3 ? L(`${n} 个点 Σ εⱼαʲ，α = ${fix(al[0], 4)} + ${fix(al[1], 4)}i：三支收缩比 |α|、|α|²、|α|³`, `${n} points Σ εⱼαʲ, α = ${fix(al[0], 4)} + ${fix(al[1], 4)}i: three contractions by |α|, |α|², |α|³`)
          : K === 2 ? L(`${n} 个点 Σ εⱼψʲ 落在黄金窗口里`, `${n} points Σ εⱼψʲ in the golden window`) : L(`${n} 个点：K = ${K} 的内部坐标样本（NUM）`, `${n} points: an internal-coordinate sample for K = ${K} (NUM)`);
      keyRO(L(`长为 ${d} 的合法字`, `legal words of length ${d}`), `<span class="c-cy">${n}</span>`, `= dbonacci ${K} (${d} + 2) ${W.matches ? '✓' : '✗'}`);
      set(1, `β${sub(K)}`, fix(R.beta, 6)); set(2, K === 2 ? 'ψ = 1 − φ' : 'α', K === 2 ? fix(al[0], 6) : `${fix(al[0], 6)} ${al[1] < 0 ? '−' : '+'} ${fix(Math.abs(al[1]), 6)}i`);
      set(3, '|α| · arg α', K === 2 ? `${fix(Math.abs(al[0]), 6)} · 180°` : `${fix(cabs(al), 6)} · ${fix(Math.atan2(al[1], al[0]) * 180 / Math.PI, 2)}°`);
      set(4, L('选中的字', 'chosen word'), si != null && si < W.upto[Math.max(d, 0)] ? `<span class="c-am">${bitsStr(sel, lastOne(sel) + 1)}</span>` : '—');
      note = v === 'sand' ? L('同一个字，竖直方向随 β^q 放大（这里按 β^q 缩回来画），水平面里却始终留在一块有界的区域：这是皮索数的两面。', 'The same word grows like β^q vertically (drawn here scaled back by β^q) yet always stays in one bounded region of the plane: the two faces of a Pisot number.')
        : L('每一块都是整体缩小、转过的副本；画出的是有限深度的点云，内部与边界的结论来自 Lean 定理，不来自像素。', 'Each part is a shrunken, turned copy of the whole; the picture is a point cloud of finite depth, and the statements about interior and boundary come from the Lean theorems, not from the pixels.');
      what = `K = ${K} · q = ${d}`; key = String(n);
    } else if (v === 'roots') {
      const KK = q.K, RR = rootsOf(KK), mm = Math.max(...RR.conj.map(cabs));
      big = L(`皮索根 · K = ${KK}`, `Pisot root · K = ${KK}`);
      hud = L(`β${sub(KK)} = ${fix(RR.beta, 6)} 在圆外，其余 ${KK - 1} 个根都在圆内；2 − β = β⁻ᴷ = ${fix(2 - RR.beta, 6)}`, `β${sub(KK)} = ${fix(RR.beta, 6)} lies outside the circle, the other ${KK - 1} roots inside; 2 − β = β⁻ᴷ = ${fix(2 - RR.beta, 6)}`);
      keyRO(`2 − β${sub(KK)} = β${sub(KK)}⁻ᴷ`, `<span class="c-mg">${fix(2 - RR.beta, 6)}</span>`, `β⁻ᴷ = ${fix(Math.pow(RR.beta, -KK), 6)}`);
      set(1, `β${sub(KK)}`, fix(RR.beta, 6)); set(2, L('共轭根的最大模', 'largest conjugate modulus'), `${fix(mm, 4)} &lt; 1`);
      set(3, L('β 代回多项式的残差', 'residual of β in the polynomial'), RR.perronResidual.toExponential(1)); set(4, L('根的个数', 'number of roots'), `1 + ${KK - 1}`);
      note = L('K 越大，皮索根离 2 越近，缺口恰是它的 −K 次方；其余的根留在圆内，越来越贴近圆周。', 'The larger K, the closer the Pisot root is to 2, and the gap is exactly its power −K; the other roots stay inside the circle, ever closer to it.');
      what = `K = ${KK}`; key = `β ${fix(RR.beta, 4)}`;
    } else if (v === 'spiral') {
      const n = q.depth, ab = ABS3();
      big = L(`自指 · n = ${n}`, `Self-reference · n = ${n}`);
      hud = L(`θ ↦ cos θ 收向 θ* = ${fix(THETA, 6)}；αⁿ 以 |α| = ${fix(ab, 6)} 绕进原点。相差 ${fix(relDiff(), 4)}%，不是恒等式`, `θ ↦ cos θ contracts to θ* = ${fix(THETA, 6)}; αⁿ spirals in by |α| = ${fix(ab, 6)}. They differ by ${fix(relDiff(), 4)}%, not an identity`);
      keyRO(L('θ* 与 |α| 的相对差', 'relative difference of θ* and |α|'), `<span class="c-mg">${fix(relDiff(), 4)}%</span>`, L('相对 θ*', 'relative to θ*'));
      set(1, 'θ*', fix(THETA, 6)); set(2, '|α| = 1/√β₃', fix(ab, 6)); set(3, `θ${sub(n + 1)}`, fix(cosSeq[n + 1], 6)); set(4, `|α|${sup(n)}`, fix(Math.pow(ab, n), 6));
      note = L('两个都在收缩，比例却不同：余弦迭代每步约乘 sin θ* ≈ 0.674，αⁿ 每步乘 |α| ≈ 0.737。两条虚线圆只在放大镜里才分得开。', 'Both contract, by different ratios: the cosine iteration by about sin θ* ≈ 0.674 per step, αⁿ by |α| ≈ 0.737. The two dashed circles separate only under the magnifier.');
      what = `n = ${n}`; key = `${fix(relDiff(), 3)}%`;
    } else if (v === 'words') {
      const d = Math.min(q.depth, q.D), c = q.T.level[d].length, pruned = q.T.stubs.filter((s) => s.d <= d).length;
      big = L(`字树 · q = ${d}`, `Word tree · q = ${d}`);
      hud = K === 2 ? L(`没有相邻的 1：长为 ${d} 的字有 F${sub(d + 2)} = ${c} 个，剪掉 ${pruned} 枝`, `no two adjacent 1s: F${sub(d + 2)} = ${c} words of length ${d}, ${pruned} branches pruned`) : L(`没有 ${K} 个连续的 1：长为 ${d} 的字有 ${c} 个，剪掉 ${pruned} 枝`, `no ${K} ones in a row: ${c} words of length ${d}, ${pruned} branches pruned`);
      keyRO(L(`长为 ${d} 的合法字`, `legal words of length ${d}`), `<span class="c-cy">${c}</span>`, `= dbonacci ${K} (${d} + 2) = ${count(K, d)} ${c === count(K, d) ? '✓' : '✗'}`);
      set(1, L('剪掉的枝', 'pruned branches'), String(pruned)); set(2, L('相邻两层之比', 'ratio of levels'), d ? fix(c / q.T.level[d - 1].length, 4) : '—');
      set(3, `β${sub(K)}`, fix(R.beta, 6)); set(4, L('递推', 'recurrence'), d >= K ? `${Array.from({ length: K }, (_, i) => count(K, d - 1 - i)).join(' + ')}` : `2${sup(d)}`);
      note = K === 2 ? L('自动机读到两个相邻的 1 就失败；树上每个剪掉的枝都是这样一处。底下的点是每个字在黄金窗口里的内部坐标。', 'The automaton fails as soon as it reads two adjacent 1s; each pruned branch is such a place. The marks below are the internal coordinates of the words in the golden window.')
        : L('每层的字数是前 K 层之和；相邻两层之比趋向皮索根。', 'Each level holds the sum of the previous K levels; the ratio of consecutive levels tends to the Pisot root.');
      what = `q = ${d}`; key = String(c);
    } else if (v === 'padic') {
      const H = q.H, k = q.k, p = S.p, v0 = vp(p, S.x - S.y), first = S.x === S.y ? '—' : String(v0 + 1);
      const dxy = dist(p, H, S.x, S.y), dyz = dist(p, H, S.y, S.z), dxz = dist(p, H, S.x, S.z);
      big = L(`余数树 · k = ${k}`, `Residue tree · k = ${k}`);
      hud = S.x === S.y ? L('x = y：每一层的读数都相同', 'x = y: the readings agree on every level') : L(`v${sub(p)}(x − y) = ${v0}：x、y 在前 ${v0} 层同路，第 ${v0 + 1} 层第一次读出不同`, `v${sub(p)}(x − y) = ${v0}: x and y share the first ${v0} levels and first read differently at level ${v0 + 1}`);
      keyRO(L('第一次读出不同的精度', 'first distinguishing precision'), `<span class="c-mg">${first}</span>`, S.x === S.y ? '' : `= v${sub(p)}(${S.x} − ${S.y}) + 1`);
      set(1, `x mod ${p}${sup(k)}`, String(mod(S.x, Math.pow(p, k)))); set(2, `y mod ${p}${sup(k)}`, String(mod(S.y, Math.pow(p, k))));
      set(3, `d(x,y) · d(y,z) · d(x,z)`, `${dxy} · ${dyz} · ${dxz}`); set(4, L('强三角不等式', 'strong triangle'), `${dxz} ≤ max(${dxy}, ${dyz}) ${dxz <= Math.max(dxy, dyz) ? '✓' : '✗'}`);
      note = L(`视界 H = ${H}：距离 d = H − 一致的层数，所以在视界内都一致的两个数距离为 0，哪怕它们不相等。`, `Horizon H = ${H}: the distance is H − (levels in agreement), so two numbers agreeing on every level within the horizon are at distance 0 even when they differ.`);
      what = `k = ${k}`; key = L(`分岔 ${first}`, `SPLIT ${first}`);
    } else if (v === 'cut') {
      const E = q.E, x = E.rows[q.r], y = E.cols[q.c], ok = terminalRun(x) + initialRun(y) < K;
      big = L(`切口 · R₀ = ${E.R[0]}, R₁ = ${E.R[1]}`, `Cut · R₀ = ${E.R[0]}, R₁ = ${E.R[1]}`);
      hud = L(`N = ${S.N}、K = ${K}、x 长 ${S.mX}、y 长 ${S.mY}：第 1 页 ${E.rows.length * E.cols.length} 对里 ${E.forbidden} 对在接缝上凑满 ${K} 个 1`, `N = ${S.N}, K = ${K}, |x| = ${S.mX}, |y| = ${S.mY}: ${E.forbidden} of ${E.rows.length * E.cols.length} pairs on page 1 put ${K} ones at the seam`);
      keyRO(L('两页的秩上限 (R₀, R₁)', 'page rank caps (R₀, R₁)'), `<span class="c-cy">(${E.R[0]}, ${E.R[1]})</span>`, L(`秩 ${K} ${K <= Math.min(E.R[0], E.R[1]) ? '可取' : '不可取'}`, `rank ${K} ${K <= Math.min(E.R[0], E.R[1]) ? 'allowed' : 'not allowed'}`));
      set(1, 'M₀ · M₁', `${E.M[0]} · ${E.M[1]}`); set(2, L('x 与 y 按首位 0、1 计数', 'x and y by first digit 0, 1'), `(${E.cX.join(', ')}) · (${E.cY.join(', ')})`);
      set(3, 'aₛ · nₛ', `(${E.a.join(', ')}) · (${E.n.join(', ')})`); set(4, L('此刻的一对', 'this pair'), `<span class="${ok ? 'c-cy' : 'c-mg'}">${x.join('')}|${y.join('')}</span>`);
      note = L('只看两边各自合法还不够：接缝上 x 末尾的 1 与 y 开头的 1 连起来也不能凑满 K 个。秩上限由这些合法的拼接数出来。', 'Each side being legal is not enough: the ones at the end of x and at the start of y together may not make K. The rank caps are counted from these legal joins.');
      what = `${x.join('')}|${y.join('')}`; key = `(${E.R[0]}, ${E.R[1]})`;
    } else {
      const par = q.par, rm = q.removed;
      big = L(`熵 · 第 ${q.step} 步`, `Entropy · step ${q.step}`);
      hud = rm != null ? L(`拿走 ${OBS[rm].short}：只有它区分的点对 |U| = ${q.unique[rm]}，逃逸率${q.unique[rm] > 0 ? '上升' : '不变'}`, `without ${OBS[rm].short}: pairs only it separates |U| = ${q.unique[rm]}, the escape rate ${q.unique[rm] > 0 ? 'rises' : 'stays'}`)
        : L(`目录 S 有 ${q.sel.length} 个观测：还有 ${q.count} 对区分不了；帕里参数 p = ${fix(par.p, 5)}`, `catalog S with ${q.sel.length} observations: ${q.count} pairs still not separated; Parry parameter p = ${fix(par.p, 5)}`);
      keyRO(L('区分不了的有序点对', 'ordered pairs not separated'), `<span class="c-mg">${q.count}</span> <small>/ ${q.denom}</small>`, `e = ${fix(q.rate, 4)}`);
      set(1, `p = 1/β${sub(K)}`, fix(par.p, 6)); set(2, L('平稳残差 · 行和残差', 'stationarity · row-sum residual'), `${par.statErr.toExponential(1)} · ${par.rowErr.toExponential(1)}`);
      set(3, L('各观测独自区分的对 |Uᵢ|', 'pairs each alone separates |Uᵢ|'), OBS.map((o, i) => `${o.short}:${q.unique[i]}`).join(' '));
      set(4, L('平稳律按 j', 'stationary law by j'), par.byRun.map((w) => fix(w, 3)).join(' · '));
      note = L('|Uᵢ| = 0 的观测拿走了也不让逃逸率上升（它区分的对别的观测也能区分）；|Uᵢ| > 0 的拿走就上升。这是有限的计数，不是香农熵。', 'An observation with |Uᵢ| = 0 can be taken away without raising the escape rate (others separate its pairs too); one with |Uᵢ| > 0 cannot. This is finite counting, not a Shannon entropy.');
      what = rm != null ? `C − ${OBS[rm].short}` : `|S| = ${q.sel.length}`; key = `${q.count}/${q.denom}`;
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note; $('roAside').textContent = L(SCN[S.scene][0], SCN[S.scene][1]);
    $('pillScene').querySelector('strong').textContent = SCN[S.scene][1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = legend().map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
    $('planeNote').textContent = S.view === 'roots' ? L('时间轴是 K，从 2 到 8。', 'The rail is K, from 2 to 8.') : S.view === 'spiral' ? L(`时间轴是步数 n，从 0 到 ${SPIRAL_N}。`, `The rail is the step n, from 0 to ${SPIRAL_N}.`) : L('时间轴是字长 q。按住舞台拖动，选中离指针最近的点。', 'The rail is the word length q. Press and drag on the stage to pick the point nearest the pointer.');
    $('treeNote').textContent = S.view === 'padic' ? L('时间轴是精度 k，从 0 到视界 H。', 'The rail is the precision k, from 0 to the horizon H.') : S.view === 'cut' ? L('时间轴把读头逐对走过第 1 页的矩阵；也可以直接点一格。', 'The rail moves the head pair by pair over the matrix of page 1; or click a cell.') : L('时间轴是树的深度；K = 2 时底下画出黄金窗口。', 'The rail is the depth of the tree; at K = 2 the golden window is drawn below.');
  }
  const paint = kit.painter(() => { const q = state(); drawText(q); drawStage(q); drawPlots(q); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 12, rate: 1.1, step: 1, t: 11,
    format: (t, max) => {
      const v = S.view, i = Math.floor(t + 1e-9);
      if (v === 'roots') return `K ${2 + clamp(Math.round(t), 0, 6)} <small>/ 8</small>`;
      if (v === 'spiral') return `n ${i} <small>/ ${SPIRAL_N}</small>`;
      if (v === 'padic') return `k ${i} <small>/ ${Math.round(max)}</small>`;
      if (v === 'cut') return `${i + 1} <small>/ ${Math.round(max) + 1}</small>`;
      if (v === 'entropy') return `${L('步', 'step')} ${i} <small>/ ${ESC_STEPS}</small>`;
      return `q ${i} <small>/ ${Math.round(max)}</small>`;
    },
    onChange: (t) => { if (S.view === 'roots') { const k = 2 + clamp(Math.round(t), 0, 6); if (k !== S.K) setK(k, true, true); } paint(); }
  });
  function fitClock(t) { const r = RAIL[S.view](); clock.pause(); clock.rate = r.rate; clock.step = r.step; clock.setMax(r.max, true); clock.set(t == null ? r.max : clamp(t, 0, r.max)); }
  function setView(v, t) {
    S.view = v; S.scene = SCENE_OF[v]; S.last[S.scene] = v;
    sceneChips.set(S.scene, true); planeChips.set(S.scene === 'plane' ? v : S.last.plane, true); treeChips.set(S.scene === 'tree' ? v : S.last.tree, true);
    $('stage').classList.toggle('still', v !== 'sand');
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(S.scene); });
    document.querySelectorAll('[data-views]').forEach((el) => { el.hidden = !el.dataset.views.split(' ').includes(v); });
    fitClock(t);
  }
  /** Set K; refit the word-length slider to the words the page enumerates for it. */
  function setK(k, quiet, fromRail) {
    S.K = k; kChips.set(String(k), true);
    const qm = qCap(k); $('qmax').max = String(qm); if (S.Q > qm) S.Q = qm; fQ.set(S.Q);
    if (!fromRail && !quiet) { if (S.view === 'roots') { clock.pause(); clock.set(k - 2); } else fitClock(clock.t); }
  }
  function setQ(qv) { S.Q = clamp(qv, 2, qCap(S.K)); fQ.set(S.Q); }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setView(S.last[v]); });
  const planeChips = kit.chips($('planeChips'), 'view', (v) => { leave(); setView(v); });
  const treeChips = kit.chips($('treeChips'), 'view', (v) => { leave(); setView(v); });
  const kChips = kit.chips($('kChips'), 'k', (v) => { leave(); setK(Number(v)); paint(); });
  const CAMS = { iso: [-0.62, 0.5, 1], top: 'top', front: 'front' };
  const camChips = kit.chips($('camChips'), 'cam', (v) => { leave(); st.view(CAMS[v]); });
  const pChips = kit.chips($('pChips'), 'p', (v) => { leave(); S.p = Number(v); fitClock(); });
  const fQ = kit.field($('qmax'), { onInput: (v) => { leave(); S.Q = v; fitClock(clock.t); } });
  const fX = kit.field($('px'), { onInput: (v) => { leave(); S.x = v; paint(); } }), fY = kit.field($('py'), { onInput: (v) => { leave(); S.y = v; paint(); } }), fZ = kit.field($('pz'), { onInput: (v) => { leave(); S.z = v; paint(); } });
  const fN = kit.field($('cn'), { onInput: (v) => { leave(); S.N = v; fitClock(clock.t); } }), fMX = kit.field($('cx'), { onInput: (v) => { leave(); S.mX = v; fitClock(clock.t); } }), fMY = kit.field($('cy'), { onInput: (v) => { leave(); S.mY = v; fitClock(clock.t); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setView(S.last.sand); }, 2: () => { leave(); setView(S.last.plane); }, 3: () => { leave(); setView(S.last.tree); }, 4: () => { leave(); setView(S.last.entropy); } });

  /* ---------- experiment cards ---------- */
  // still: the rail value a card's still (and the opening of the full page) shows; a click plays the rail from 0.
  // ENTANGLEMENT stops on the first forbidden pair of its encoder (N = 2, K = 3, mX = 4, mY = 5)
  const PRESETS = {
    zeckendorf: { view: 'words', K: 2, Q: 7, still: 7, play: true },
    kbonacci: { view: 'roots', still: 4, play: true },
    padic: { view: 'padic', p: 3, xyz: [7, 34, 16], still: 4, play: true },
    rauzy: { view: 'rauzy', K: 3, Q: 12, still: 12, sel: 109, play: true },
    clifford: { view: 'sand', K: 3, Q: 11, still: 11, sel: 109, cam: 'iso', play: true },
    'self-reference': { view: 'spiral', still: 12, play: true },
    entanglement: { view: 'cut', K: 3, enc: [2, 4, 5], still: firstForbidden(encoder(2, 3, 4, 5)), play: true },
    entropy: { view: 'entropy', K: 3, still: 8, play: true }
  };
  const NOTES = {
    zeckendorf: ['K = 2 的字树：从顶上的空字开始，每层添一位，青色的枝添 1、白色的枝添 0；会出现两个相邻 1 的枝被剪掉（品红 ×）。右边是每层留下的字数 1、2、3、5、8、13、21、34，正是斐波那契数；琥珀色的是正在长出的一层。底下是黄金窗口 [−1, φ]，每一道竖线是一个字的内部坐标 Σ εⱼψʲ。', 'The word tree for K = 2: from the empty word at the top each level adds one digit, a cyan branch a 1 and a white branch a 0; a branch that would make two adjacent 1s is pruned (magenta ×). On the right is the number of words on each level, 1, 2, 3, 5, 8, 13, 21, 34: the Fibonacci numbers; the amber level is the one now growing. Below is the golden window [−1, φ], each tick the internal coordinate Σ εⱼψʲ of one word.'],
    kbonacci: ['复平面与单位圆。琥珀色的点是此刻 K 的皮索根 β<sub>K</sub>，落在圆外的实轴上；青色的点是其余 K − 1 个根，都在圆内。K 从 2 走到 8，β<sub>K</sub> 一步步逼近 2，品红的缺口 2 − β<sub>K</sub> = β<sub>K</sub><sup>−K</sup> 越来越短；淡色的点是较小 K 的根。', 'The complex plane and the unit circle. The amber point is the Pisot root β<sub>K</sub> for the current K, on the real axis outside the circle; the cyan points are the other K − 1 roots, all inside. As K runs from 2 to 8, β<sub>K</sub> creeps towards 2 and the magenta gap 2 − β<sub>K</sub> = β<sub>K</sub><sup>−K</sup> shrinks; the faint points are the roots for smaller K.'],
    padic: ['p = 3 的余数树：第 k 层的结点是模 3ᵏ 的余数，往下按下一位低位数字分成三支。青、品红、紫三条路是 x = 7、y = 34、z = 16。7 − 34 = −27 = −3³，所以 x、y 在 k = 0…3 同路，在 k = 4 第一次分开（品红圈）。琥珀色的横带是此刻读到的精度 k。', 'The residue tree for p = 3: the nodes at level k are the residues mod 3ᵏ, each splitting into three by the next low digit. The cyan, magenta and violet paths are x = 7, y = 34 and z = 16. Since 7 − 34 = −27 = −3³, x and y share the path for k = 0…3 and part for the first time at k = 4 (magenta ring). The amber band is the precision k being read.'],
    rauzy: ['K = 3 的内部平面：每个不含 111 的字 ε 画成一个点 Σ εⱼαʲ，α ≈ −0.4196 + 0.6063i。开头是 0、10、110 的字分成青、紫、品红三块，标着三支收缩 f₀(w) = αw、f₁₀(w) = 1 + α²w、f₁₁₀(w) = 1 + α + α³w；每一块都是整体缩小、转过的副本，三块合起来是整体。字越长点越密；画出的只是有限深度的样本。', 'The internal plane for K = 3: each word ε without 111 is drawn as the point Σ εⱼαʲ, with α ≈ −0.4196 + 0.6063i. Words beginning with 0, 10 and 110 form the cyan, violet and magenta parts, labelled by the three contractions f₀(w) = αw, f₁₀(w) = 1 + α²w and f₁₁₀(w) = 1 + α + α³w; each part is a shrunken, turned copy of the whole, and the three together make the whole. Longer words make the cloud denser; what is drawn is a sample of finite depth.'],
    clifford: ['三维沙盘：每个不含 111 的字 ε 立成一个点，在水平面上的位置是 e(α) = Σ εⱼαʲ，高度是 e(β)/β<sup>q</sup>（β ≈ 1.8393）。地面上的彩色影子是劳齐点云，白色竖线是物理轴。字长每加 1，原有的点都降到 1/β 的高度，新的点从上面补进来；水平面里的点却一直挤在同一块有界的区域。琥珀色的是一个选中的字和它落到轴上、地面上的两个影子。', 'The 3D sandtable: each word ε without 111 stands as a point whose place in the horizontal plane is e(α) = Σ εⱼαʲ and whose height is e(β)/β<sup>q</sup> (β ≈ 1.8393). The coloured shadow on the floor is the Rauzy cloud and the white vertical line is the physical axis. Each time the length grows by one, the old points sink to 1/β of their height and new points fill in from above, while in the horizontal plane the points stay crowded in the same bounded region. In amber: one chosen word and its two shadows, on the axis and on the floor.'],
    'self-reference': ['左边：θ ↦ cos θ 从 θ₀ = 0 出发的蛛网，琥珀色是此刻这一步，一步步收向青色的不动点 θ* ≈ 0.739085。右边：αⁿ 每步转过 124.69°、长度乘 |α|，紫色的螺线绕进原点。两个虚线圆的半径是 θ*（青）与 |α| ≈ 0.737353（紫），只有在放大镜里才看得见它们之间的缝：约 0.2344%，近但不相等。', 'Left: the cobweb of θ ↦ cos θ from θ₀ = 0, the current step in amber, closing in on the cyan fixed point θ* ≈ 0.739085. Right: αⁿ turns by 124.69° and shrinks by |α| at each step, a violet spiral into the origin. The two dashed circles have radii θ* (cyan) and |α| ≈ 0.737353 (violet); only the magnifier shows the gap between them: about 0.2344%, close but not equal.'],
    entanglement: ['上面：左边长 4 的字 x 与右边长 5 的字 y 在琥珀色的切口处拼接（K = 3）。接缝两边连着的 1 若凑满 3 个就标成品红。下面左边每一格是一对 (x, y)，按 x 末尾 1 的个数 τ 与 y 开头 1 的个数 ι 分组：τ + ι < 3 合法（青），否则不合法（品红），琥珀框是此刻的一对。右边是两页的秩 (r₀, r₁)：青色矩形 1 ≤ r₀ ≤ 6、1 ≤ r₁ ≤ 5 都可以取到，琥珀圈 (3, 3) 只是其中一种。', 'Top: a word x of length 4 on the left joins a word y of length 5 on the right at the amber cut (K = 3). If the ones meeting at the seam make three, they turn magenta. Below left, each cell is a pair (x, y), grouped by the number τ of ones at the end of x and ι at the start of y: τ + ι < 3 is legal (cyan), otherwise not (magenta); the amber frame is the current pair. Right: the ranks (r₀, r₁) of the two pages; the whole cyan rectangle 1 ≤ r₀ ≤ 6, 1 ≤ r₁ ≤ 5 can be attained, and the amber ring (3, 3) is just one choice.'],
    entropy: ['左边是 K = 3 的帕里重置链：上下两行是符号 + 与 −，从左到右是当前连续 1 的个数 j = 0、1、2；圆的面积是平稳律，青色箭头添一个 1，品红弧重置并翻转符号。下面的长条是 p + p² + p³ = 1，p = 1/β₃。右边的格子是长 4 的 13 个合法字组成的有序点对：品红格是目录还区分不了的对。先逐个加入观测，品红块一块块缩小；再逐个拿走一个，琥珀格是只有它才区分的对。', 'Left: the Parry reset chain for K = 3. The two rows are the signs + and −, and from left to right the current number j = 0, 1, 2 of ones in a row; the area of each disc is the stationary law, a cyan arrow adds a 1 and a magenta arc resets and flips the sign. The bar below is p + p² + p³ = 1 with p = 1/β₃. Right: the ordered pairs of the 13 legal words of length 4; magenta cells are pairs the catalog cannot yet separate. Observations are first added one by one and the magenta blocks shrink; then each is taken away in turn, and the amber cells are the pairs that it alone separates.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (p.K) setK(p.K, true); if (p.Q) setQ(p.Q);
    if (p.sel != null) S.sel = p.sel;
    if (p.xyz) { S.p = p.p; pChips.set(String(p.p), true); [S.x, S.y, S.z] = p.xyz; fX.set(S.x); fY.set(S.y); fZ.set(S.z); }
    if (p.enc) { [S.N, S.mX, S.mY] = p.enc; fN.set(S.N); fMX.set(S.mX); fMY.set(S.mY); }
    if (p.cam) { camChips.set(p.cam, true); st.view(CAMS[p.cam], TRV.still ? 0 : 600); }
    setView(p.view, p.still);
    if (!p.play || TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、改 K 与字长，拖动舞台转动沙盘或选一个点，拖时间轴。随时可以再选一张卡。', 'Free play: change the scene, K and the word length, drag the stage to turn the sandtable or pick a point, scrub the rail. Pick a card again at any time.']
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- read-only probe ---------- */
  const probe = {};
  const def = (k, f) => Object.defineProperty(probe, k, { get: f, enumerable: true });
  const cplx = (z) => ({ re: z[0], im: z[1], abs: cabs(z) });
  def('preset', () => cards.current); def('scene', () => S.scene); def('view', () => S.view);
  def('K', () => S.K); def('Q', () => S.Q); def('t', () => clock.t); def('max', () => clock.max); def('playing', () => clock.playing);
  def('depth', () => { const q = state(); return q.depth != null ? q.depth : null; });
  def('perronRoot', () => rootsOf(S.K).beta);
  def('conjugateRoots', () => rootsOf(S.K).conj.map(cplx));
  def('admissibleCount', () => { const W = wordsOf(S.K); return W.upto[Math.min(S.Q, W.Q)]; });
  def('admissibleCounts', () => wordsOf(S.K).upto.slice());
  def('rauzyBranches', () => {
    const W = wordsOf(3), al = ALPHA3(), d = S.view === 'rauzy' || S.view === 'sand' ? Math.min(state().depth, W.Q) : Math.min(S.Q, W.Q), n = [0, 0, 0];
    for (let i = 0; i < W.upto[d]; i++) n[W.br[i]]++;
    return { K: 3, depth: d, alpha: cplx(al), argDeg: Math.atan2(al[1], al[0]) * 180 / Math.PI, residual: rootsOf(3).residual,
      maps: [{ prefix: '0', shift: cplx([0, 0]), scale: cplx(al) }, { prefix: '10', shift: cplx([1, 0]), scale: cplx(cpow(al, 2)) }, { prefix: '110', shift: cplx([1 + al[0], al[1]]), scale: cplx(cpow(al, 3)) }],
      contraction: [cabs(al), cabs(al) ** 2, cabs(al) ** 3], counts: n };
  });
  def('thetaStar', () => THETA); def('alphaAbs', () => ABS3()); def('relDiffPct', () => relDiff());
  def('encoderCaps', () => { const E = encoder(S.N, S.K, S.mX, S.mY); return { N: E.N, K: E.K, mX: E.mX, mY: E.mY, M: E.M.slice(), cX: E.cX.slice(), cY: E.cY.slice(), a: E.a.slice(), n: E.n.slice(), R: E.R.slice(), forbidden: E.forbidden }; });
  def('parryParam', () => parry(S.K).p);
  def('parryWeights', () => { const r = parry(S.K); return { K: r.K, p: r.p, rootSum: r.rootSum, suffixWeight: r.W.slice(), normalizer: r.norm, states: r.states.map((s, i) => ({ sign: s[0] ? '+' : '−', j: s[1], mass: r.law[i] })), byRun: r.byRun.slice(), total: r.total, rowSumMaxErr: r.rowErr, stationarityMaxErr: r.statErr, flipMaxErr: r.flipErr, minKernel: r.minKer }; });
  const esc = () => escapeAt(S.K, S.view === 'entropy' ? clock.t : S.escStep);
  def('escapeCount', () => esc().count); def('escapeDenom', () => esc().denom);
  def('escape', () => { const e = esc(); return { step: e.step, q: e.A.q, selected: e.sel.map((i) => OBS[i].id), removed: e.removed == null ? null : OBS[e.removed].id, count: e.count, denom: e.denom, rate: e.rate, unique: Object.fromEntries(OBS.map((o, i) => [o.id, e.unique[i]])), arena: e.A.words.map((w) => w.join('')) }; });
  def('padic', () => { const H = HOF[S.p]; return { p: S.p, H, x: S.x, y: S.y, z: S.z, k: S.view === 'padic' ? state().k : null, v: vp(S.p, S.x - S.y), first: S.x === S.y ? null : vp(S.p, S.x - S.y) + 1, d: { xy: dist(S.p, H, S.x, S.y), yz: dist(S.p, H, S.y, S.z), xz: dist(S.p, H, S.x, S.z) } }; });
  def('cut', () => { if (S.view !== 'cut') return null; const q = state(), x = q.E.rows[q.r], y = q.E.cols[q.c]; return { x: x.join(''), y: y.join(''), tau: terminalRun(x), iota: initialRun(y), legal: terminalRun(x) + initialRun(y) < S.K }; });
  def('selected', () => bitsStr(selOf(S.K), Math.max(lastOne(selOf(S.K)) + 1, 1)));
  def('state', () => { const o = {}; for (const k of Object.keys(probe)) if (k !== 'state' && typeof probe[k] !== 'function') o[k] = probe[k]; return o; });
  probe.seek = (t) => { clock.pause(); clock.set(t); };
  /** The words of length Q (≤ the page's longest) for K as the page enumerates them: digits ε₀ε₁…, e(α), e(β), branch. */
  probe.words = (K, Q) => { const W = wordsOf(K), m = W.upto[Math.min(Q, W.Q)], out = []; for (let i = 0; i < m; i++) out.push({ word: bitsStr(W.bits[i], Q), re: W.re[i], im: W.im[i], ph: W.ph[i], branch: W.br[i] }); return out; };
  probe.roots = (K) => { const r = rootsOf(K); return { beta: r.beta, conj: r.conj.map(cplx), alpha: cplx(r.alpha) }; };
  probe.cos = (n) => cosSeq[n];
  window.RAUZY_SANDTABLE_DEBUG = Object.freeze(probe);

  window.TRV_THUMB = () => { setK(3, true); setQ(12); S.sel = 109; setView('sand', 12); st.view([-0.7, 0.6, 0.94], 0); paint.now(); };
  cards.pick(cards.initial('clifford'));
  booting = false;
  paint();
})();
