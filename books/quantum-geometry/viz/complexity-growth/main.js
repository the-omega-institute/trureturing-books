/* COMPLEXITY//GROWTH · 复杂度增长 · How complexity grows
   Two scenes on one rail (the number of layers a circuit has run):
     growth  a fixed-seed brick wall of Haar-random two-qubit gates on an open chain of 8 qubits. After every layer the
             page computes the half-chain entanglement entropy exactly (eigenvalues of the 16 × 16 reduced density
             matrix) and counts the gates used. Entropy (cyan) stops under its ceilings; the gate count (white) keeps
             climbing; the magenta "expected complexity" is the model min(gate count, 2^N). CV is marked as open.
     depth   the open-boundary integrable circuit of Chapter 20: N sites, gates K1, U(1) … U(N − 1), KN on a path
             k = 0 … N; the set of cuts S fixes the order of each neighbouring pair; every gate sits in the earliest
             layer it can take. The white line is minDepth(N, κ) = ⌊N/(κ + 1)⌋ + 1 (Lean), the grey dashed line the
             old formula (refuted in Lean).
   Read-only probe for the browser suite: window.GROWTH_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const TH = TRV.thumbMode ? 2 : 1;

  /* ======================= growth: the random brick wall ======================= */
  const NQ = 8, DIM = 1 << NQ, HALF = 4, DA = 1 << HALF, TMAX = 90, CEIL = 1 << NQ, SEED = 20;
  function mulberry32(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const rand = mulberry32(SEED);
  const gauss = () => { let u = 0; while (u <= 1e-12) u = rand(); const v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  /** A Haar-random 4 × 4 unitary: Gram–Schmidt on the columns of a complex Gaussian matrix. Row-major re/im. */
  function haar4() {
    const cols = [];
    for (let c = 0; c < 4; c++) {
      let re = [0, 1, 2, 3].map(() => gauss()), im = [0, 1, 2, 3].map(() => gauss());
      for (const q of cols) {
        let pr = 0, pi = 0; // ⟨q, v⟩ = Σ conj(q) v
        for (let i = 0; i < 4; i++) { pr += q.re[i] * re[i] + q.im[i] * im[i]; pi += q.re[i] * im[i] - q.im[i] * re[i]; }
        re = re.map((x, i) => x - (pr * q.re[i] - pi * q.im[i])); im = im.map((x, i) => x - (pr * q.im[i] + pi * q.re[i]));
      }
      const n = Math.sqrt(re.reduce((s, x, i) => s + x * x + im[i] * im[i], 0));
      cols.push({ re: re.map((x) => x / n), im: im.map((x) => x / n) });
    }
    const U = { re: new Array(16), im: new Array(16) };
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { U.re[r * 4 + c] = cols[c].re[r]; U.im[r * 4 + c] = cols[c].im[r]; }
    return U;
  }
  /** Pairs (a, a + 1) of layer t ≥ 1: odd layers (1,2)(3,4)(5,6), even layers (0,1)(2,3)(4,5)(6,7). */
  const pairsOf = (t) => { const out = []; for (let a = t % 2 ? 1 : 0; a + 1 < NQ; a += 2) out.push(a); return out; };
  const CUT = HALF - 1; // the gate on (3, 4) crosses the cut between the left four qubits and the right four
  /** Apply U to qubits (a, a + 1); local index l = 2·bit(a) + bit(a + 1). */
  function applyGate(re, im, a, U) {
    const m = (1 << a) | (1 << (a + 1)), idx = [0, 0, 0, 0], xr = [0, 0, 0, 0], xi = [0, 0, 0, 0];
    for (let i = 0; i < DIM; i++) {
      if (i & m) continue;
      idx[0] = i; idx[1] = i | (1 << (a + 1)); idx[2] = i | (1 << a); idx[3] = i | m;
      for (let l = 0; l < 4; l++) { xr[l] = re[idx[l]]; xi[l] = im[idx[l]]; }
      for (let r = 0; r < 4; r++) {
        let sr = 0, si = 0;
        for (let c = 0; c < 4; c++) { const ur = U.re[r * 4 + c], ui = U.im[r * 4 + c]; sr += ur * xr[c] - ui * xi[c]; si += ur * xi[c] + ui * xr[c]; }
        re[idx[r]] = sr; im[idx[r]] = si;
      }
    }
  }
  /** Eigenvalues of a real symmetric matrix (cyclic Jacobi). */
  function jacobi(A) {
    const n = A.length, a = A.map((r) => r.slice());
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] * a[i][j];
      if (off < 1e-26) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue;
        const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; }
      }
    }
    return a.map((r, i) => r[i]);
  }
  /** The 16 eigenvalues of ρ_A (left four qubits = the low four bits of the index), largest first. */
  function spectrum(re, im) {
    const Rr = [], Ri = [];
    for (let a = 0; a < DA; a++) { Rr.push(new Array(DA).fill(0)); Ri.push(new Array(DA).fill(0)); }
    for (let a = 0; a < DA; a++) for (let a2 = a; a2 < DA; a2++) {
      let sr = 0, si = 0;
      for (let b = 0; b < DA; b++) { const i = a + DA * b, j = a2 + DA * b; sr += re[i] * re[j] + im[i] * im[j]; si += im[i] * re[j] - re[i] * im[j]; }
      Rr[a][a2] = Rr[a2][a] = sr; Ri[a][a2] = si; Ri[a2][a] = -si;
    }
    // the real symmetric embedding [[Re, −Im], [Im, Re]] carries every eigenvalue twice
    const E = [];
    for (let i = 0; i < 2 * DA; i++) { const row = new Array(2 * DA); for (let j = 0; j < 2 * DA; j++) { const bi = i < DA, bj = j < DA, r = i % DA, c = j % DA; row[j] = bi === bj ? Rr[r][c] : bi ? -Ri[r][c] : Ri[r][c]; } E.push(row); }
    const ev = jacobi(E).sort((x, y) => y - x);
    return ev.filter((_, i) => i % 2 === 0).map((x) => Math.max(0, x));
  }
  const entropyOf = (sp) => sp.reduce((s, l) => (l > 1e-15 ? s - l * Math.log2(l) : s), 0);

  const GATES = [];                  // { layer, a, U }
  const RUN = { gates: [0], cross: [0], S: [0], spec: [], re: [], im: [] };
  (function simulate() {
    const re = new Float64Array(DIM), im = new Float64Array(DIM); re[0] = 1;
    RUN.re.push(Float64Array.from(re)); RUN.im.push(Float64Array.from(im));
    RUN.spec.push(spectrum(re, im));
    let g = 0, x = 0;
    for (let t = 1; t <= TMAX; t++) {
      for (const a of pairsOf(t)) { const U = haar4(); GATES.push({ layer: t, a, U }); applyGate(re, im, a, U); g++; if (a === CUT) x++; }
      const sp = spectrum(re, im);
      RUN.gates.push(g); RUN.cross.push(x); RUN.spec.push(sp); RUN.S.push(entropyOf(sp));
      RUN.re.push(Float64Array.from(re)); RUN.im.push(Float64Array.from(im));
    }
  })();
  const lerpAt = (arr, t) => { const i = clamp(Math.floor(t), 0, TMAX), j = Math.min(TMAX, i + 1), f = clamp(t - i, 0, 1); return arr[i] + (arr[j] - arr[i]) * f; };
  const model = (g) => Math.min(g, CEIL);
  const cutBound = (t) => Math.min(HALF, 2 * RUN.cross[clamp(Math.floor(t), 0, TMAX)]);
  /** The late window (layers `from` … TMAX): its mean, lowest and highest entropy; and the first layer t0 at which the
      entropy comes within 0.25 bit of that mean (the onset, which lies far before the window). */
  const LATE = (() => { const from = 40, tail = RUN.S.slice(from); const m = tail.reduce((s, v) => s + v, 0) / tail.length; let t0 = 0; while (t0 < TMAX && RUN.S[t0] < m - 0.25) t0++; return { from, mean: m, t0, min: Math.min(...tail), max: Math.max(...tail) }; })();
  const T_CEIL = RUN.gates.findIndex((g) => g >= CEIL);

  /* ======================= depth: the open chain of Chapter 20 ======================= */
  /** Layers of the N + 1 path gates for the cut set S (a Set of sites 1…N): the earliest layer each can take. */
  function layersOf(N, S) {
    const up = (k) => S.has(k + 1);           // step k (0 ≤ k < N): gate k before gate k + 1
    const left = new Array(N + 1).fill(0), right = new Array(N + 1).fill(0);
    for (let k = 1; k <= N; k++) left[k] = up(k - 1) ? left[k - 1] + 1 : 0;
    for (let k = N - 1; k >= 0; k--) right[k] = up(k) ? 0 : right[k + 1] + 1;
    return left.map((l, k) => Math.max(l, right[k]));
  }
  const depthOf = (N, S) => Math.max(...layersOf(N, S)) + 1;
  const formula = (N, k) => Math.floor(N / (k + 1)) + 1;
  const valid = (N, k) => k >= 1 && 2 * k <= N;
  /** The old formulas of arXiv:2607.02093v1, inside their own ranges (natural-number division), else null. */
  function guessOf(N, k) {
    if (k < 1) return null;
    if (N % 2) return k <= (N - 1) / 2 ? Math.floor((N + 3) / 2) - k : null;
    return k <= N / 2 ? Math.floor((N + 4) / 2) - k : null;
  }
  /** The cuts of the recursive construction in the proof (exists_pathLayers). */
  function construct(N, kappa) {
    const q = Math.floor(N / (kappa + 1)), S = [];
    let n = N;
    for (let k = kappa; k > 0; k--) { const j = k - 1, d = Math.min(q, n - 2 * j - 1), M = n - d - 1; S.push(M + 1); n = M; }
    return S.sort((a, b) => a - b);
  }
  /** Gate name and sites of path index k. */
  const gateOf = (N, k) => (k === 0 ? { name: 'K1', sites: [1] } : k === N ? { name: 'KN', sites: [N] } : { name: `U${k}`, sites: [k, k + 1] });
  /** The list circuit(N, S): indices not in S descending, then those in S ascending. */
  const orderOf = (N, S) => { const out = []; for (let k = N; k >= 0; k--) if (!S.has(k)) out.push(k); for (let k = 0; k <= N; k++) if (S.has(k)) out.push(k); return out; };
  const bruteCache = new Map();
  /** min over |S| = κ of the depth, by trying every S (only where that is cheap). */
  function brute(N, k) {
    const key = `${N}:${k}`; if (bruteCache.has(key)) return bruteCache.get(key);
    let count = 1; for (let i = 0; i < k; i++) count = count * (N - i) / (i + 1);
    if (k < 1 || k > N || count > 20000) return null;
    let best = Infinity; const pick = [];
    const rec = (start) => {
      if (pick.length === k) { best = Math.min(best, depthOf(N, new Set(pick))); return; }
      for (let s = start; s <= N - (k - pick.length) + 1; s++) { pick.push(s); rec(s + 1); pick.pop(); }
    };
    rec(1); bruteCache.set(key, best); return best;
  }

  /* ======================= state ======================= */
  const S = { scene: 'growth', t: 12, cv: false, N: 8, kappa: 2, cuts: new Set([3, 6]), lt: 3, hold: 0, ghost: null };
  const sortedCuts = () => [...S.cuts].sort((a, b) => a - b);
  function depthInfo() {
    const lay = layersOf(S.N, S.cuts), D = Math.max(...lay) + 1, k = S.cuts.size;
    return { lay, D, k, floor: valid(S.N, k) ? formula(S.N, k) : null, guess: guessOf(S.N, k), brute: brute(S.N, k) };
  }

  /* ======================= stage ======================= */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { if (!G) return false; if (S.scene === 'depth') toggleAt(ev); else seekAt(ev); return true; },
    onDrag: (ev) => { if (G && S.scene === 'growth') seekAt(ev); }, onDrop: () => {}
  });
  let G = null, G2 = null;
  function tag(key, x, y, html, cls) { stage.tag(key, [x, y], html, cls, { screen: true }); }
  function layout() {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    return { top: thumb ? 22 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 8, bottom: thumb ? 22 : Math.max(18, $('legend').offsetHeight + 20), H: st.height, W: st.width };
  }

  function drawGrowth() {
    const lo = layout(), cv = $('cv'), t = S.t, thumb = TRV.thumbMode;
    const inner = lo.H - lo.top - lo.bottom - 24, gap = 34, hTop = Math.max(60, (inner - gap) * 0.58), left = thumb ? 24 : 48, right = thumb ? 24 : 30;
    const tTicks = thumb ? [] : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => [v, String(v)]);
    // the complexity lane
    const g = kit.plot(cv, { x: [0, TMAX], y: [0, 340], pad: [left, right, lo.top, lo.H - lo.top - hTop] });
    G = g;
    g.axes({ yTicks: thumb ? [] : [[0, '0'], [100, '100'], [200, '200'], [CEIL, '256']], xTicks: [] });
    const full = (fn) => { const pts = []; for (let i = 0; i <= TMAX * 4; i++) { const x = i / 4; pts.push([x, fn(x)]); } return pts; };
    const upto = (fn) => { const pts = []; const n = Math.ceil(t * 4); for (let i = 0; i <= n; i++) { const x = Math.min(t, i / 4); pts.push([x, fn(x)]); } return pts; };
    const gatesAt = (x) => lerpAt(RUN.gates, x);
    g.hline(CEIL, P.ink, { width: 1.4 * TH, dash: [7, 5], alpha: 0.75 });
    if (S.cv) {
      const t1 = Math.min(t, T_CEIL), pts = upto((x) => model(gatesAt(x))).filter((p) => p[0] <= t1);
      if (pts.length > 1) g.area(pts, P.warn, { alpha: 0.1 });
      g.vline(t1, P.warn, { alpha: 0.6, dash: [3, 4] });
    }
    g.line(full((x) => model(gatesAt(x))), P.magenta, { width: 4 * TH, alpha: 0.16 });
    g.line(full(gatesAt), P.ink, { width: 1.2 * TH, alpha: 0.22 });
    g.line(upto((x) => model(gatesAt(x))), P.magenta, { width: 4.2 * TH, alpha: 0.85, glow: 8 });
    g.line(upto(gatesAt), P.ink, { width: 1.6 * TH, alpha: 0.95 });
    g.vline(t, P.amber, { width: 1.4 * TH, alpha: 0.9 });
    g.dot(t, gatesAt(t), P.amber, 5 * TH, { glow: 10 });
    g.dot(t, model(gatesAt(t)), P.magenta, 4 * TH, {});
    // the entropy lane
    const g2 = kit.plot(cv, { x: [0, TMAX], y: [0, 4.6], pad: [left, right, lo.top + hTop + gap, lo.bottom + 18], clear: false });
    G2 = g2;
    g2.axes({ yTicks: thumb ? [] : [[0, '0'], [2, '2'], [4, '4']], xTicks: tTicks });
    g2.hline(HALF, P.ink, { width: 1.6 * TH, alpha: 0.85 });
    const stair = []; for (let i = 0; i <= TMAX; i++) { stair.push([i, cutBound(i)]); if (i < TMAX) stair.push([i + 1, cutBound(i)]); }
    g2.line(stair, P.dim, { width: 1.3 * TH, dash: [4, 4], alpha: 0.9 });
    const sAt = (x) => lerpAt(RUN.S, x);
    g2.line(full(sAt), P.cyan, { width: 1.2 * TH, alpha: 0.25 });
    g2.area(upto(sAt), P.cyan, { alpha: 0.1 });
    g2.line(upto(sAt), P.cyan, { width: 2.6 * TH, glow: 8 });
    g2.vline(t, P.amber, { width: 1.4 * TH, alpha: 0.9 });
    g2.dot(t, sAt(t), P.amber, 5 * TH, { glow: 10 });
    if (!thumb) {
      const R = g.pl + g.iw;
      tag('gGates', clamp(g.X(t) + 14, g.pl + 60, R - 70), g.Y(gatesAt(t)) - 16, `${L('门数', 'gates')} ${RUN.gates[Math.floor(t)]}`, 'raw ink');
      tag('gCeil', R - 92, g.Y(CEIL) - 12, L('≈ 2^N 天花板（量级）', '≈ 2^N ceiling (order)'), 'raw ink');
      tag('gModel', g.pl + 120, g.Y(model(gatesAt(Math.min(TMAX, 46)))) - 4, L('预期复杂度（模型）', 'expected complexity (model)'), 'raw mg');
      if (S.cv && t > 4) tag('gCV', g.pl + g.iw * 0.42, g.Y(26), L('CV：这段线 ∝ 虫洞体积？OPEN', 'CV: this stretch ∝ wormhole volume? OPEN'), 'raw wn');
      tag('sCeil', R - 92, g2.Y(HALF) - 11, L('上限 log₂16 = 4 比特', 'ceiling log₂16 = 4 bits'), 'raw ink');
      tag('sCurve', clamp(g2.X(t) + 12, g2.pl + 60, R - 60), g2.Y(sAt(t)) + 18, `S = ${fix(sAt(t), 2)}`, 'raw cy');
    }
    return {};
  }

  function drawDepth() {
    const lo = layout(), cv = $('cv'), d = depthInfo(), N = S.N, thumb = TRV.thumbMode;
    const top = Math.max(d.D, d.guess || 0, d.floor || 0, S.hold, 4);
    const g = kit.plot(cv, { x: [0.2, N + 0.8], y: [-1.3, top + 0.25], pad: [thumb ? 20 : 54, thumb ? 20 : 22, lo.top, lo.bottom + 6] });
    G = g; G2 = null;
    const lt = S.lt;
    g.axes({ yTicks: thumb ? [] : Array.from({ length: Math.min(top, 14) }, (_, i) => [i, String(i)]), xTicks: [], frame: false });
    // site columns and their numbers
    const c = g.ctx;
    for (let j = 1; j <= N; j++) {
      c.save(); c.strokeStyle = P.dim; c.globalAlpha = 0.28; c.lineWidth = 1; c.beginPath(); c.moveTo(g.X(j), g.Y(-0.55)); c.lineTo(g.X(j), g.Y(top)); c.stroke(); c.restore();
      if (!thumb) g.text(j, -1.02, String(j), S.cuts.has(j) ? P.magenta : P.dim, { align: 'center', base: 'middle', size: N > 16 ? 9 : 11 });
      if (S.cuts.has(j)) g.poly([[j, -0.74], [j - 0.2, -0.42], [j + 0.2, -0.42]], P.magenta, { alpha: 0.95 });
    }
    // the floor (Lean) and the old guess
    if (d.guess != null) g.hline(d.guess - 0.5, P.dim, { width: 1.6 * TH, dash: [8, 6], alpha: 0.95 });
    if (d.floor != null) g.hline(d.floor - 0.5, P.ink, { width: 2 * TH, alpha: 0.95 });
    // the dependency chain through the gate centres (path order)
    const centre = (k) => { const s = gateOf(N, k).sites; return [(s[0] + s[s.length - 1]) / 2, d.lay[k]]; };
    const chain = []; for (let k = 0; k <= N; k++) chain.push(centre(k));
    g.line(chain, P.ink, { width: 1.1 * TH, alpha: 0.35 });
    // the floor card's still: the starting placement, as faint dashed outlines, so the drop from it is visible
    if (S.ghost) {
      const gl = layersOf(N, new Set(S.ghost)), gD = Math.max(...gl) + 1;
      for (let k = 0; k <= N; k++) {
        const gt = gateOf(N, k), a = gt.sites[0] - 0.36, b = gt.sites[gt.sites.length - 1] + 0.36;
        if (gl[k] === d.lay[k]) continue;
        c.save(); c.strokeStyle = P.dim; c.globalAlpha = 0.6; c.lineWidth = 1.1 * TH; c.setLineDash([4, 3]);
        c.strokeRect(g.X(a), g.Y(gl[k] + 0.3), g.X(b) - g.X(a), g.Y(gl[k] - 0.3) - g.Y(gl[k] + 0.3)); c.restore();
      }
      for (const j of S.ghost) g.poly([[j, -0.74], [j - 0.2, -0.42], [j + 0.2, -0.42]], P.magenta, { alpha: 0.3 });
      if (!thumb) tag('dGhost', g.pl + 70, g.Y(gD - 0.5) - 12, L(`起点 {${S.ghost.join(', ')}}：${gD} 层`, `start {${S.ghost.join(', ')}}: ${gD} layers`), 'raw');
    }
    // the gates
    for (let k = 0; k <= N; k++) {
      const gt = gateOf(N, k), l = d.lay[k], a = gt.sites[0] - 0.36, b = gt.sites[gt.sites.length - 1] + 0.36;
      const state = l + 1 <= lt + 1e-9 ? 'done' : l <= lt ? 'now' : 'todo';
      const col = state === 'now' ? P.amber : P.cyan;
      g.rect(a, l - 0.3, b, l + 0.3, col, { alpha: state === 'todo' ? 0.05 : state === 'now' ? 0.5 : 0.3, stroke: col, strokeAlpha: state === 'todo' ? 0.4 : 1, width: 1.4 * TH, glow: state === 'todo' ? 0 : 6 });
      if (!thumb && N <= 14) g.text((a + b) / 2, l, gt.name, state === 'todo' ? P.dim : P.ink, { align: 'center', base: 'middle', size: 10 });
    }
    if (!thumb) {
      const R = g.pl + g.iw;
      if (d.floor != null) tag('dFloor', R - 96, g.Y(d.floor - 0.5) - 12, L(`定理：最少 ${d.floor} 层`, `theorem: at least ${d.floor} layers`), 'raw ink');
      if (d.guess != null && d.guess !== d.floor) tag('dGuess', R - 84, g.Y(d.guess - 0.5) - 12, L(`旧公式：${d.guess} 层`, `old formula: ${d.guess} layers`), 'raw');
      tag('dDepth', g.pl + 70, g.Y(d.D - 0.5) - 12, L(`这组切点：${d.D} 层`, `these cuts: ${d.D} layers`), 'raw cy');
    }
    return d;
  }

  /** Pointing at the growth stage moves the rail to that layer. */
  function seekAt(ev) { const r = $('cv').getBoundingClientRect(); stopFloor(); cards.mark(null); clock.pause(); clock.set(clamp(G.invX(ev.clientX - r.left), 0, TMAX)); }
  /** Clicking a site toggles it in S. */
  function toggleAt(ev) {
    const r = $('cv').getBoundingClientRect(), j = Math.round(G.invX(ev.clientX - r.left));
    if (j < 1 || j > S.N) return;
    stopFloor(); cards.mark(null);
    if (S.cuts.has(j)) S.cuts.delete(j); else S.cuts.add(j);
    if (S.cuts.size >= 1 && S.cuts.size <= 4) kappaChips.set(String(S.cuts.size), true); else kappaChips.set(null, true);
    refitDepth(true);
  }

  function drawStage() {
    stage.begin();
    if (S.scene === 'growth') drawGrowth(); else drawDepth();
    stage.end();
  }

  /* ======================= strip ======================= */
  function drawPlot() {
    const cv = $('plot');
    if (S.scene === 'growth') {
      $('plotTitle').innerHTML = L('此刻半链的谱：越平，熵越大', 'The half-chain spectrum now: the flatter, the more entropy');
      const sp = RUN.spec[clamp(Math.round(S.t), 0, TMAX)];
      const g = kit.plot(cv, { x: [0.4, 16.6], y: [0, 1.02], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[1 / 16, '1/16'], [0.5, '0.5'], [1, '1']], xTicks: [[1, '1'], [8, '8'], [16, '16']] });
      sp.forEach((l, i) => g.rect(i + 1 - 0.36, 0, i + 1 + 0.36, l, P.cyan, { alpha: 0.75 }));
      g.hline(1 / 16, P.ink, { dash: [4, 4], alpha: 0.8 });
      $('plotMeta').textContent = L(`第 ${Math.round(S.t)} 层 · 16 个本征值`, `layer ${Math.round(S.t)} · 16 eigenvalues`);
    } else {
      $('plotTitle').innerHTML = L('最少层数与旧公式，沿 N', 'Minimum layers and the old formula, along N');
      const k = Math.max(1, S.cuts.size), Ns = []; for (let n = 4; n <= 24; n++) Ns.push(n);
      const g = kit.plot(cv, { x: [3.5, 24.5], y: [0, 14], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[0, '0'], [4, '4'], [8, '8'], [12, '12']], xTicks: [[4, '4'], [8, '8'], [11, '11'], [16, '16'], [24, '24']] });
      const gs = Ns.map((n) => { const v = guessOf(n, k); return v == null ? null : [n, v]; });
      g.line(gs, P.dim, { width: 1.4, dash: [5, 4] });
      for (const n of Ns) if (valid(n, k)) g.dot(n, formula(n, k), P.ink, 3);
      g.vline(S.N, P.amber, { alpha: 0.85 });
      g.legend([[P.ink, L(`⌊N/(κ+1)⌋ + 1，κ = ${k}`, `⌊N/(κ+1)⌋ + 1, κ = ${k}`)], [P.dim, L('旧公式', 'old formula'), 'dash']], {});
      $('plotMeta').textContent = 'N';
    }
  }

  /* ======================= text ======================= */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const LEGEND = {
    growth: [['dm', '白线：已用的门数', 'white line: gates used'], ['mg', '预期复杂度（模型）', 'expected complexity (model)'], ['cy', '半链纠缠熵', 'half-chain entanglement entropy'], ['dm', '灰色台阶：2 × 跨割门数', 'grey steps: 2 × gates across the cut']],
    depth: [['cy', '门（已执行）', 'gates (done)'], ['am', '正在执行的层', 'the layer running now'], ['mg', '折返点 S', 'turning points S'], ['dm', '白线：定理的最少层数 · 灰色虚线：旧公式', 'white line: minimum by the theorem · grey dashed: old formula']]
  };
  function drawText() {
    let big, sub, key, keyName, rows, note, aside, pill;
    if (S.scene === 'growth') {
      const t = S.t, i = clamp(Math.floor(t), 0, TMAX), s = RUN.S[i], gc = RUN.gates[i];
      big = L(`增长 · 第 ${i} 层`, `Growth · layer ${i}`);
      sub = `<span class="c-cy">S = ${fix(s, 3)} bit</span> · ${L('门数', 'gates')} ${gc} · <span class="c-mg">${L('模型', 'model')} ${model(gc)}</span>`;
      keyName = L('半链熵 · 已用门数', 'half-chain entropy · gates used');
      key = `${fix(s, 3)} <small>bit · ${gc} ${L('道门', 'gates')}</small>`;
      rows = row('', '层数（深度）', 'layers (depth)', String(i)) + row('', '跨过割线的门', 'gates across the cut', String(RUN.cross[i]))
        + row('c', '熵的上限 min(2 × 跨割门数, 4)', 'entropy ceiling min(2 × across, 4)', `${cutBound(i)} bit`) + row('m', '预期复杂度 min(门数, 2^N)', 'expected complexity min(gates, 2^N)', String(model(gc)));
      note = i < LATE.t0 ? L('熵还在爬：每道跨割门至多给它 2 比特。', 'The entropy is still climbing: each gate across the cut gives it at most 2 bits.')
        : gc < CEIL ? L(`熵已到 ${fix(s, 2)} 比特（第 ${LATE.from}–${TMAX} 层在 ${fix(LATE.min, 2)}–${fix(LATE.max, 2)} 比特之间起伏），门数还在长。`, `The entropy is at ${fix(s, 2)} bits (layers ${LATE.from}–${TMAX} wander between ${fix(LATE.min, 2)} and ${fix(LATE.max, 2)} bits); the gate count is still growing.`)
          : L('门数已过 2^N：模型里的复杂度停在天花板上，白线还在往上走。', 'The gate count is past 2^N: the model complexity stays on its ceiling while the white line keeps rising.');
      aside = 'S = −Σ λ log₂ λ';
      pill = ['S', fix(s, 2)];
    } else {
      const d = depthInfo(), cuts = sortedCuts();
      big = L(`深度 · N = ${S.N}, κ = ${d.k}`, `Depth · N = ${S.N}, κ = ${d.k}`);
      sub = `<span class="c-cy">${L('层数', 'layers')} ${d.D}</span>${d.floor != null ? ` · ${L('最少', 'minimum')} ${d.floor}` : ''}${d.guess != null ? ` · ${L('旧公式', 'old formula')} ${d.guess}` : ''}`;
      keyName = L('这组切点的层数 · 定理的最少层数', 'layers of these cuts · minimum by the theorem');
      key = `${d.D} <small>· ${d.floor == null ? '—' : d.floor}</small>`;
      rows = row('', '切点集 S', 'cut set S', `{${cuts.join(', ')}}`) + row('', '门数 N + 1', 'gates N + 1', String(S.N + 1))
        + row('', '旧公式的预测', 'old formula predicts', d.guess == null ? '—' : String(d.guess)) + row('', '穷举 |S| = κ 的最少层数', 'exhaustive minimum over |S| = κ', d.brute == null ? '—' : String(d.brute));
      note = d.floor == null ? L('定理要求 1 ≤ κ 且 2κ ≤ N；这组切点不在它的范围里。', 'The theorem needs 1 ≤ κ and 2κ ≤ N; this set of cuts is outside its range.')
        : d.D === d.floor ? L(`最高的砖顶在白线上：${d.D} 层，已经是 |S| = ${d.k} 时最少的。`, `The top brick sits on the white line: ${d.D} layers, already the fewest for |S| = ${d.k}.`)
          : L(`比白线高出 ${d.D - d.floor} 层：挪一挪品红的折返点还能更低，但低不过白线。`, `${d.D - d.floor} layers above the white line: moving the magenta turning points can bring it down, never below the line.`);
      aside = '⌊N/(κ+1)⌋ + 1';
      pill = [L('层', 'layers'), String(d.D)];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = S.scene === 'growth' ? L('增长', 'GROWTH') : L('深度', 'DEPTH');
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    $('cvBtn').setAttribute('aria-pressed', String(S.cv));
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ======================= the rail ======================= */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: TMAX, rate: 6, step: 1, t: S.t,
    format: (t, max) => `${L('层', 'layer')} ${fix(t, S.scene === 'growth' ? 1 : 2)} <small>/ ${fix(max, 0)}</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      if (S.scene === 'growth') S.t = t; else S.lt = t;
      paint();
    }
  });
  /** After S or N changed: the rail spans the layers of the new schedule. */
  function refitDepth(toEnd) {
    const D = depthOf(S.N, S.cuts);
    if (S.scene === 'depth') { clock.pause(); clock.setMax(D, true); if (toEnd) S.lt = D; clock.set(Math.min(S.lt, D)); }
    paint();
  }
  function setScene(sc) {
    S.scene = sc; sceneChips.set(sc, true); stopAt = null;
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause();
    if (sc === 'growth') { clock.rate = 6; clock.step = 1; clock.setMax(TMAX, true); clock.set(S.t); }
    else { const D = depthOf(S.N, S.cuts); clock.rate = 1.4; clock.step = 1; clock.setMax(D, true); clock.set(Math.min(S.lt, D)); }
  }

  /* ======================= controls ======================= */
  const leave = () => { stopFloor(); cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); paint(); });
  const kappaChips = kit.chips($('kappaChips'), 'kappa', (v) => { leave(); S.kappa = +v; placeCuts(); });
  function placeCuts() {
    if (!valid(S.N, S.kappa)) S.kappa = Math.max(1, Math.floor(S.N / 2));
    kappaChips.set(String(S.kappa), true);
    S.cuts = new Set(construct(S.N, S.kappa)); refitDepth(true);
  }
  const fN = kit.field($('nSites'), { fmt: (v) => String(v), onInput: (v) => { leave(); S.N = v; placeCuts(); } });
  $('cvBtn').addEventListener('click', () => { leave(); S.cv = !S.cv; paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('growth'); paint(); }, 2: () => { leave(); setScene('depth'); paint(); } });

  /* ======================= experiment cards ======================= */
  const FLOOR_PATH = [[2, 3], [2, 4], [3, 5], [3, 6], [4, 7], [4, 8]];
  const PRESETS = {
    saturate: { scene: 'growth', cv: false, from: 0, to: 14, still: 14, rate: 3 },
    ceiling: { scene: 'growth', cv: false, from: 14, to: TMAX, still: TMAX, rate: 10 },
    cv: { scene: 'growth', cv: true, from: 10, to: 60, still: 60, rate: 8 },
    floor: { scene: 'depth', N: 11, cuts: [4, 8], path: FLOOR_PATH },
    eight: { scene: 'depth', N: 8, cuts: [3, 6], from: 0, to: 3, still: 3 },
    eleven: { scene: 'depth', N: 11, cuts: [4, 8], from: 0, to: 4, still: 4 }
  };
  const fmtS = (x) => fix(x, 2), SAT = PRESETS.saturate.still;
  const NOTES = {
    saturate: [`从第 0 层走到第 ${SAT} 层：青色的熵沿灰色台阶爬上去，第 ${LATE.t0} 层升到 ${fmtS(RUN.S[LATE.t0])} 比特，第 ${SAT} 层仍是 ${fmtS(RUN.S[SAT])}，压在 4 比特的白线下面；同一段时间里白线（门数）从 0 一直涨到 ${RUN.gates[SAT]}，没有停的意思。淡色的后段（第 ${LATE.from}–${TMAX} 层）在 ${fmtS(LATE.min)}–${fmtS(LATE.max)} 比特之间起伏。`, `From layer 0 to layer ${SAT}: the cyan entropy climbs along the grey staircase, reaches ${fmtS(RUN.S[LATE.t0])} bits at layer ${LATE.t0} and is still ${fmtS(RUN.S[SAT])} at layer ${SAT}, under the white 4-bit line; over the same stretch the white line (gate count) rises from 0 to ${RUN.gates[SAT]} with no sign of stopping. The faint later stretch (layers ${LATE.from}–${TMAX}) wanders between ${fmtS(LATE.min)} and ${fmtS(LATE.max)} bits.`],
    ceiling: [`接着一直走到第 ${TMAX} 层：青色的熵一直趴在原处；白线（门数）一路涨到 ${RUN.gates[TMAX]}；品红的预期复杂度跟着白线走，到第 ${T_CEIL} 层碰到虚线 2^N = ${CEIL}，就横着走了——门可以一直加，复杂度过不了这道天花板。`, `Run on to layer ${TMAX}: the cyan entropy stays where it was; the white line (gate count) climbs to ${RUN.gates[TMAX]}; the magenta expected complexity follows it until layer ${T_CEIL}, meets the dashed 2^N = ${CEIL} and runs flat from there — gates can always be added, the complexity cannot pass this ceiling.`],
    cv: ['红色标出的是品红线上升的那一段：熵早已停住，它还在涨。复杂度等于体积猜想把这一段读成黑洞内部切片的体积——这是开放猜想，舞台上没有画任何体积。', 'The red mark covers the rising stretch of the magenta line: the entropy stopped long ago, and this line is still climbing. The complexity = volume conjecture reads this stretch as the volume of a slice through the black-hole interior — an open conjecture; no volume is drawn on the stage.'],
    floor: ['N = 11、两个折返点。品红三角从 {2, 3} 一步步挪到 {4, 8}：最高的砖从 9 层降到 8、7、6、5，最后 4 层，正好落在白线上；再怎么挪也到不了白线下面。灰色虚线框与淡品红三角是起点 {2, 3} 的 9 层。', 'N = 11 with two turning points. The magenta triangles move step by step from {2, 3} to {4, 8}: the tallest stack drops from 9 layers to 8, 7, 6, 5 and finally 4, right on the white line; no placement gets below it. The grey dashed outlines and faint magenta triangles are the 9 layers of the start {2, 3}.'],
    eight: ['N = 8、S = {3, 6}：9 道门一层一层亮起，第 0 层是 KN、U5、U2，第 1 层是 U7、U4、U1，第 2 层是 K1、U3、U6，3 层就排完，顶在白线上；灰色虚线是旧公式说的 4 层。', 'N = 8, S = {3, 6}: the 9 gates light up layer by layer — layer 0 is KN, U5, U2, layer 1 is U7, U4, U1, layer 2 is K1, U3, U6 — and three layers finish it, topping out on the white line; the grey dashed line is the 4 layers the old formula says.'],
    eleven: ['N = 11、S = {4, 8}：12 道门排成 4 层，每层 3 道，顶在白线上；灰色虚线是旧公式说的 5 层，高出一层。', 'N = 11, S = {4, 8}: the 12 gates stack into 4 layers of 3 and top out on the white line; the grey dashed line is the 5 layers the old formula says, one too many.']
  };
  let booting = true, floorTween = null, floorPlaying = false;
  function stopFloor() { if (floorTween) { floorTween.cancel(); floorTween = null; } floorPlaying = false; S.hold = 0; S.ghost = null; }
  function floorPlayer(path) {
    const run = {
      playing: false, pause() {},
      play() {
        stopFloor(); S.hold = 9;
        run.playing = floorPlaying = true; S.cuts = new Set(path[0]); refitDepth(true);
        floorTween = kit.tween(3600, (e) => { const i = Math.min(path.length - 1, Math.floor(e * path.length)); S.cuts = new Set(path[i]); refitDepth(true); },
          () => { run.playing = floorPlaying = false; floorTween = null; S.cuts = new Set(path[path.length - 1]); refitDepth(true); });
      }
    };
    return run;
  }
  function applyPreset(id) {
    const p = PRESETS[id];
    stopFloor();
    if (p.cv != null) S.cv = p.cv;
    S.ghost = null;
    if (p.N != null) { S.N = p.N; fN.set(p.N); S.cuts = new Set(p.cuts); S.kappa = p.cuts.length; kappaChips.set(String(S.kappa), true); }
    if (p.scene === 'growth' && p.still != null) S.t = p.still;
    if (p.scene === 'depth') { S.lt = depthOf(S.N, S.cuts); if (p.path) S.hold = 9; }
    setScene(p.scene);
    if (TRV.still || (booting && !TRV.embed)) { if (p.path) { S.hold = 9; S.ghost = p.path[0].slice(); } paint(); return; }
    if (p.path) {
      const player = floorPlayer(p.path);
      S.cuts = new Set(p.path[0]); S.hold = 9; refitDepth(true);
      if (booting) kit.autoplay(player, $('stage')); else player.play();
      return;
    }
    if (p.rate) clock.rate = p.rate;
    clock.set(p.from);
    stopAt = p.to < clock.max - 1e-9 ? p.to : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖时间轴看电路一层层走；在“深度”里改 N 与 κ，或直接点格点挪动折返点。随时可以再选一张卡。', 'Free play: drag the rail to run the circuit layer by layer; in Depth change N and κ, or click sites to move the turning points. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ======================= probe, cover, start ======================= */
  window.GROWTH_DEBUG = {
    get state() {
      const d = depthInfo();
      return {
        scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing || floorPlaying, preset: cards.current, cv: S.cv, ghost: S.ghost ? S.ghost.slice() : null, ghostDepth: S.ghost ? Math.max(...layersOf(S.N, new Set(S.ghost))) + 1 : null,
        growth: { layer: Math.floor(S.t), entropy: RUN.S[clamp(Math.floor(S.t), 0, TMAX)], gates: RUN.gates[clamp(Math.floor(S.t), 0, TMAX)], cross: RUN.cross[clamp(Math.floor(S.t), 0, TMAX)], tCeil: T_CEIL, late: LATE },
        depth: { N: S.N, cuts: sortedCuts(), layers: d.lay.slice(), D: d.D, floor: d.floor, guess: d.guess, brute: d.brute, lt: S.lt, order: orderOf(S.N, S.cuts) },
        hud: $('hudBig').textContent, key: $('ro').querySelector('.key dd').textContent
      };
    },
    /** The whole run: per layer entropy, gate count, cut crossings and spectrum; the gate list (layer, a, U). */
    run: () => ({ NQ, TMAX, entropy: RUN.S.slice(), gates: RUN.gates.slice(), cross: RUN.cross.slice(), spectra: RUN.spec.map((s) => s.slice()), list: GATES.map((g) => ({ layer: g.layer, a: g.a, re: g.U.re.slice(), im: g.U.im.slice() })) }),
    stateAt: (t) => ({ re: Array.from(RUN.re[t]), im: Array.from(RUN.im[t]) }),
    construct: (N, k) => construct(N, k),
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of site j at layer y on the depth stage, for pointer tests. */
    point: (j, y) => { const b = $('cv').getBoundingClientRect(); return G ? [b.left + G.X(j), b.top + G.Y(y)] : null; }
  };
  window.TRV_THUMB = () => { applyPreset('ceiling'); cards.mark('ceiling'); paint.now(); };
  cards.pick(cards.initial('saturate'));
  booting = false;
  paint();
})();
