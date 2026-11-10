/* ORTHO//ESCAPE · 多面体割圆、毛球角亏与余弦不动点
   Polyhedral approximation of S² (geodesic triangulations with V ∈ {12, 42, 60, 162, 642}, Euler χ = 2, Descartes's
   720° total defect carried by 12 degree-5 vertices), the Taylor truncation seam R₂N(θ), the open helix whose axial
   shadow is a closed circle, and three self-referential iterations side by side: the Dottie cosine cobweb θ ↦ cos θ,
   the golden reciprocal map x ↦ 1 + 1/x, and a finite contracting set update S ↦ U(S) ⊆ S.
   Every number on the page is computed here; colours come exclusively from design tokens via TRV.palette / TRV.alpha.
   Read-only probe for browser tests: window.SE_DEBUG. Thumbnail hook: window.TRV_THUMB. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const L = TRV.L;
  const MINUS = '−';
  const TAU = Math.PI * 2;
  const DEG = Math.PI / 180;
  const PHI = (1 + Math.sqrt(5)) / 2;
  const SIN1 = Math.sin(1);
  const V_LEVELS = [12, 42, 60, 162, 642];
  const GRID = 16;                                // finite reading grid q = j / 16
  const GRID_MAX = Math.floor(GRID * Math.PI);    // j = 0 … 50, so every reading lies in [0, π]

  /* ---------- the 60-vertex sphere triangulation (12 degree-5 and 48 degree-6 vertices) ----------
     Obtained offline as the convex hull of 60 points relaxed under Coulomb repulsion on S², rotated so that one
     degree-5 vertex sits at the north pole; coordinates are stored to five decimals and renormalized below.
     Edge counts, degrees and angular defects are all recomputed on the page. */
  const P60 = [-0.43458,-0.21549,-0.87447,-0.41745,-0.72484,-0.54803,0.74946,0.57799,-0.32286,0.62921,-0.77147,0.09455,-0.73131,-0.38191,-0.56509,0.42117,0.13618,0.8967,-0.07519,0.43512,0.89723,-0.82119,0.20131,0.53396,-0.72564,0.10768,-0.67959,0.16417,-0.94344,0.28806,-0.68093,0.66318,0.31071,0,0,1,0.29151,-0.94473,-0.15001,-0.15951,0.79354,0.58724,0.90256,0.42152,0.08783,0.30267,0.85368,-0.42382,0.77089,0.23494,0.59205,0.03004,-0.13347,-0.9906,0.01015,-0.73419,0.67887,-0.50414,0.50756,0.69873,0.09646,0.99502,-0.02511,-0.2576,-0.36641,0.89408,-0.22477,0.90918,-0.35052,-0.96414,-0.01391,-0.26503,0.12754,-0.81581,-0.56408,-0.757,-0.58761,0.28578,0.65224,0.63536,0.4134,-0.16329,-0.96635,-0.19877,0.48199,-0.0052,-0.87616,-0.11129,-0.54392,-0.83172,0.38121,-0.46711,-0.7978,-0.964,-0.13675,0.22806,0.55264,0.83342,0.0012,0.97662,0.05198,-0.20859,0.90231,-0.41152,-0.12841,0.26136,-0.37954,0.88749,0.46175,0.52695,-0.71352,0.78182,0.20154,-0.59003,-0.49602,0.5987,-0.62891,0.23836,0.8854,0.39907,0.96585,-0.02062,0.25826,-0.33001,0.25881,-0.9078,0.6006,-0.68572,-0.41117,-0.31092,0.93353,0.17848,-0.59269,-0.7966,-0.1189,-0.62326,0.76839,-0.14532,0.83091,-0.4402,0.34031,-0.83122,0.42795,-0.35488,-0.93676,0.33805,0.09058,0.33545,0.56887,0.7509,-0.0393,0.68901,-0.72369,0.67082,-0.22182,0.70767,-0.4451,-0.66228,0.60272,-0.88376,-0.44547,-0.14328,0.77484,-0.27442,-0.56949,-0.46747,0.07499,0.88082,-0.71603,-0.25677,0.64912,0.47462,-0.6785,0.56069,0.12766,0.3152,-0.9404,-0.30217,-0.91899,0.25327];
  const F60 = [0,1,4,0,29,1,0,4,8,0,8,41,0,17,29,0,41,17,1,44,4,1,24,27,1,29,24,1,27,44,2,32,14,2,14,33,2,15,32,2,36,15,2,33,37,2,37,36,3,9,12,3,57,9,3,12,42,3,42,34,3,34,46,3,46,57,4,23,8,4,53,23,4,44,53,5,6,11,5,49,6,5,11,35,5,16,49,5,51,16,5,35,51,6,55,11,6,13,19,6,49,13,6,19,55,7,19,10,7,10,48,7,55,19,7,48,31,7,31,56,7,56,55,8,23,47,8,38,41,8,47,38,9,27,12,9,57,18,9,18,59,9,59,27,10,19,13,10,13,43,10,43,45,10,45,48,11,21,35,11,55,21,12,27,24,12,24,42,13,39,43,13,49,39,14,26,16,14,16,40,14,32,26,14,40,33,15,22,20,15,20,32,15,50,22,15,36,50,16,26,49,16,51,40,17,28,30,17,58,28,17,30,29,17,41,58,18,35,21,18,21,52,18,57,35,18,52,59,20,22,43,20,39,32,20,43,39,21,56,52,21,55,56,22,38,45,22,50,38,22,45,43,23,31,48,23,53,31,23,48,47,24,29,30,24,30,42,25,31,53,25,56,31,25,53,44,25,44,59,25,52,56,25,59,52,26,32,39,26,39,49,27,59,44,28,54,30,28,36,37,28,58,36,28,37,54,30,54,42,33,40,34,33,34,54,33,54,37,34,40,46,34,42,54,35,57,51,36,58,50,38,50,41,38,47,45,40,51,46,41,50,58,45,47,48,46,51,57];

  /* ---------- small vector helpers ---------- */
  const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm3 = (v) => { const h = Math.hypot(v[0], v[1], v[2]); return [v[0] / h, v[1] / h, v[2] / h]; };

  /** Orient every face counter-clockwise seen from outside (normal · centroid > 0). */
  function orient(P, faces) {
    return faces.map((f) => {
      const a = P[f[0]], b = P[f[1]], c = P[f[2]];
      const n = cross3(sub3(b, a), sub3(c, a));
      return dot3(n, [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]]) > 0 ? [f[0], f[1], f[2]] : [f[0], f[2], f[1]];
    });
  }

  /** Icosahedron with a vertex at each pole: two pentagonal rings at z = ±1/√5. */
  function icosahedron() {
    const h = 1 / Math.sqrt(5), r = 2 / Math.sqrt(5);
    const P = [[0, 0, 1]];
    for (let k = 0; k < 5; k++) P.push([r * Math.cos(TAU * k / 5), r * Math.sin(TAU * k / 5), h]);
    for (let k = 0; k < 5; k++) P.push([r * Math.cos(TAU * k / 5 + Math.PI / 5), r * Math.sin(TAU * k / 5 + Math.PI / 5), -h]);
    P.push([0, 0, -1]);
    const F = [];
    for (let k = 0; k < 5; k++) {
      const k1 = (k + 1) % 5;
      F.push([0, 1 + k, 1 + k1], [1 + k, 6 + k, 1 + k1], [1 + k1, 6 + k, 6 + k1], [11, 6 + k1, 6 + k]);
    }
    const Pn = P.map(norm3);
    return { P: Pn, faces: orient(Pn, F) };
  }

  /** One geodesic subdivision: split every triangle into four at the edge midpoints, push midpoints onto S². */
  function subdivide(mesh) {
    const P = mesh.P.slice(), cache = new Map(), faces = [];
    const mid = (a, b) => {
      const key = a < b ? a * 65536 + b : b * 65536 + a;
      let m = cache.get(key);
      if (m === undefined) {
        m = P.length;
        P.push(norm3([(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2, (P[a][2] + P[b][2]) / 2]));
        cache.set(key, m);
      }
      return m;
    };
    for (const [a, b, c] of mesh.faces) {
      const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
      faces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    return { P, faces };
  }

  function sixty() {
    const P = [], F = [];
    for (let i = 0; i < P60.length; i += 3) P.push(norm3([P60[i], P60[i + 1], P60[i + 2]]));
    for (let i = 0; i < F60.length; i += 3) F.push([F60[i], F60[i + 1], F60[i + 2]]);
    return { P, faces: orient(P, F) };
  }

  /** Interior angle at o of the triangle (o, p, q). */
  function cornerAngle(o, p, q) {
    const u = sub3(p, o), v = sub3(q, o);
    const c = cross3(u, v);
    return Math.atan2(Math.hypot(c[0], c[1], c[2]), dot3(u, v));
  }

  /** Counts, degrees, equilateral-model and metric angular defects of a closed triangulated surface. */
  function analyze(m) {
    const V = m.P.length, F = m.faces.length;
    const deg = new Array(V).fill(0), angle = new Array(V).fill(0);
    const edges = [], seen = new Set();
    for (const f of m.faces) {
      for (let k = 0; k < 3; k++) {
        const a = f[k], b = f[(k + 1) % 3], c = f[(k + 2) % 3];
        angle[a] += cornerAngle(m.P[a], m.P[b], m.P[c]);
        const key = a < b ? a * 65536 + b : b * 65536 + a;
        if (!seen.has(key)) { seen.add(key); edges.push([Math.min(a, b), Math.max(a, b)]); deg[a]++; deg[b]++; }
      }
    }
    const E = edges.length;
    const defect = angle.map((s) => TAU - s);                 // metric defect δᵥ = 2π − Σ corner angles
    const pent = [];
    let hex = 0, other = 0, comboTotal = 0, metricTotal = 0, pentMetric = 0, hexMax = 0, hexMin = Infinity, minDefect = Infinity;
    for (let i = 0; i < V; i++) {
      comboTotal += (6 - deg[i]) * Math.PI / 3;                 // equilateral model: (6 − deg)·60°
      metricTotal += defect[i];
      minDefect = Math.min(minDefect, defect[i]);
      if (deg[i] === 5) { pent.push(i); pentMetric += defect[i]; }
      else if (deg[i] === 6) { hex++; hexMax = Math.max(hexMax, defect[i]); hexMin = Math.min(hexMin, defect[i]); }
      else other++;
    }
    const isPent = new Uint8Array(V);
    pent.forEach((i) => { isPent[i] = 1; });
    const capFace = m.faces.map((f) => isPent[f[0]] || isPent[f[1]] || isPent[f[2]]);
    return {
      V, E, F, chi: V - E + F, deg, defect, edges, pent, hex, other, capFace,
      comboTotal, metricTotal, pentMetric, hexMax, hexMin: hex ? hexMin : 0, minDefect
    };
  }

  const MESH = [];
  function meshAt(idx) {
    if (MESH[idx]) return MESH[idx];
    let m;
    if (idx === 0) m = icosahedron();
    else if (idx === 1) m = subdivide(meshAt(0));
    else if (idx === 2) m = sixty();
    else if (idx === 3) m = subdivide(meshAt(1));
    else m = subdivide(meshAt(3));
    m.stats = analyze(m);
    MESH[idx] = m;
    return m;
  }

  /* ---------- Taylor truncation: cos₂N(θ) = Σ_{j<N} (−1)ʲ θ²ʲ/(2j)!, remainder R₂N(θ) = Σ_{j≥N} (−1)ʲ θ²ʲ/(2j)! ---------- */
  function taylor(theta, N) {
    const t2 = theta * theta;
    let term = 1, poly = 0;
    for (let j = 0; j < N; j++) {
      if (j > 0) term *= -t2 / ((2 * j - 1) * (2 * j));
      poly += term;
    }
    // the remainder is summed directly from its own series, so it stays accurate far below double-precision cancellation
    let t = term * (-t2 / ((2 * N - 1) * (2 * N)));
    const bound = Math.abs(t);                                   // Lagrange: |R₂N(θ)| ≤ |θ|²ᴺ/(2N)!
    let tail = 0;
    for (let j = N; j < N + 80; j++) {
      tail += t;
      const nt = t * (-t2 / ((2 * j + 1) * (2 * j + 2)));
      if (nt === 0 || Math.abs(nt) <= Math.abs(tail) * 1e-18) break;
      t = nt;
    }
    const exact = Math.cos(theta);
    return { poly, exact, tail, residual: Math.abs(tail), direct: Math.abs(exact - poly), bound, degree: 2 * N - 2 };
  }
  const taylorPoly = (theta, N) => {
    const t2 = theta * theta;
    let term = 1, s = 1;
    for (let j = 1; j < N; j++) { term *= -t2 / ((2 * j - 1) * (2 * j)); s += term; }
    return s;
  };

  /* ---------- the Dottie fixed point θ* = cos θ* (Newton on cos θ − θ) ---------- */
  function dottieStar() {
    let x = 0.739;
    for (let i = 0; i < 60; i++) {
      const nx = x - (Math.cos(x) - x) / (-Math.sin(x) - 1);
      if (nx === x) break;
      x = nx;
    }
    return x;
  }
  const THETA_STAR = dottieStar();
  const SIN_STAR = Math.sqrt(1 - THETA_STAR * THETA_STAR);

  /* ---------- finite contracting set update on the reading grid X = { j/16 : 0 ≤ j ≤ 50 } ---------- */
  const qOf = (j) => j / GRID;
  const resid = (q) => Math.abs(Math.cos(q) - q);
  /** U(A) ⊆ A: keep the better half of A by residual |cos q − q| (ties: smaller q), never fewer than one element. */
  function contract(A) {
    if (A.length <= 1) return A.slice();
    const keep = Math.ceil(A.length / 2);
    return A.slice().sort((a, b) => (resid(qOf(a)) - resid(qOf(b))) || (a - b)).slice(0, keep).sort((a, b) => a - b);
  }
  const sameSet = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  function finiteSets(theta0, steps) {
    const c0 = Math.cos(theta0);
    const lo = Math.min(theta0, c0) - 1 / GRID, hi = Math.max(theta0, c0) + 1 / GRID;
    const S0 = [];
    for (let j = 0; j <= GRID_MAX; j++) { const q = qOf(j); if (q >= lo - 1e-12 && q <= hi + 1e-12) S0.push(j); }
    if (!S0.length) S0.push(Math.min(GRID_MAX, Math.round(theta0 * GRID)));
    const horizon = Math.max(steps, S0.length) + 1;
    const seq = [S0];
    for (let n = 0; n < horizon; n++) seq.push(contract(seq[n]));
    let N = 0;
    while (N < horizon && !sameSet(seq[N], seq[N + 1])) N++;
    let changes = 0;
    for (let n = 0; n < horizon; n++) if (!sameSet(seq[n], seq[n + 1])) changes++;
    const fin = seq[N];
    return {
      S0, seq, N, changes, card0: S0.length, final: fin.slice(), atSteps: seq[steps].slice(),
      jBest: fin[0], qBest: qOf(fin[0]), rBest: resid(qOf(fin[0]))
    };
  }

  /* ---------- state ---------- */
  const clampInt = (x, lo, hi, fallback) => {
    const n = Number(x);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(lo, Math.min(hi, Math.round(n)));
  };
  const clampPitch = (x, fallback) => {
    const n = Number(x);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(0, Math.min(0.5, Math.round(n * 100) / 100));
  };
  const DEFAULTS = { vIdx: 3, theta0: 60, taylorN: 3, pitch: 0.25, steps: 10 };
  const VIEW0 = { yaw: -0.55, elev: 0.36 };
  const q = new URLSearchParams(location.search);
  const S = {
    vIdx: q.has('v') ? clampInt(q.get('v'), 0, 4, DEFAULTS.vIdx) : DEFAULTS.vIdx,
    theta0: q.has('theta0') ? clampInt(q.get('theta0'), 0, 180, DEFAULTS.theta0) : DEFAULTS.theta0,
    taylorN: q.has('n') ? clampInt(q.get('n'), 1, 6, DEFAULTS.taylorN) : DEFAULTS.taylorN,
    pitch: q.has('pitch') ? clampPitch(q.get('pitch'), DEFAULTS.pitch) : DEFAULTS.pitch,
    steps: q.has('steps') ? clampInt(q.get('steps'), 1, 20, DEFAULTS.steps) : DEFAULTS.steps,
    yaw: VIEW0.yaw,
    elev: VIEW0.elev
  };
  const stateKey = () => `${S.vIdx},${S.theta0},${S.taylorN},${S.pitch.toFixed(2)},${S.steps}`;

  let R = null, Rkey = '';
  let frames = 0, pending = false, built = '';
  let labels = [];
  let lastLayout = null;

  function derive() {
    const mesh = meshAt(S.vIdx), st = mesh.stats;
    const th0 = S.theta0 * DEG;
    const tay = taylor(th0, S.taylorN);
    const tayStar = taylor(THETA_STAR, S.taylorN);

    const theta = [th0];
    for (let k = 0; k < S.steps; k++) theta.push(Math.cos(theta[k]));
    const dRes = theta.map((t) => Math.abs(Math.cos(t) - t));
    const dErr = theta.map((t) => Math.abs(t - THETA_STAR));

    const x0 = Math.max(0.2, th0);
    const xs = [x0];
    for (let k = 0; k < S.steps; k++) xs.push(1 + 1 / xs[k]);
    const gRes = xs.map((x) => Math.abs(1 + 1 / x - x));
    const gErr = xs.map((x) => Math.abs(x - PHI));

    const sets = finiteSets(th0, S.steps);
    R = {
      vIdx: S.vIdx, V: st.V, E: st.E, F: st.F, chi: st.chi,
      deg5: st.pent.length, deg6: st.hex, degOther: st.other,
      comboTotalDeg: st.comboTotal / DEG, metricTotalDeg: st.metricTotal / DEG, metricTotalRad: st.metricTotal,
      pentShare: st.pentMetric / st.metricTotal, pentMeanDeg: st.pent.length ? st.pentMetric / st.pent.length / DEG : 0,
      hexMaxDeg: st.hexMax / DEG, hexMinDeg: st.hexMin / DEG, minDefectDeg: st.minDefect / DEG,
      theta0Deg: S.theta0, theta0: th0, taylorN: S.taylorN, taylor: tay, taylorStar: tayStar,
      pitch: S.pitch, helixLift: S.pitch, helixClosed: S.pitch === 0,
      steps: S.steps, thetaStar: THETA_STAR, sinStar: SIN_STAR, sin1: SIN1, phi: PHI,
      dottie: { theta, residual: dRes, err: dErr },
      golden: { x0, x: xs, residual: gRes, err: gErr },
      sets
    };
    Rkey = stateKey();
    return R;
  }
  const fresh = () => (R && Rkey === stateKey() ? R : derive());

  /* ---------- number formatting ---------- */
  const fx = (x, k = 4) => (x < -1e-12 ? MINUS : '') + Math.abs(x).toFixed(k);
  const SUP = { '-': '⁻', '+': '', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  const sup = (s) => String(s).split('').map((c) => (SUP[c] !== undefined ? SUP[c] : c)).join('');
  const sub = (s) => String(s).split('').map((c) => (SUB[c] !== undefined ? SUB[c] : c)).join('');
  /** Compact scientific format: fixed for moderate magnitudes, m×10ᵉ otherwise. */
  function fsci(x, k = 3) {
    if (!Number.isFinite(x)) return '∞';
    if (x === 0) return '0';
    const a = Math.abs(x), s = x < 0 ? MINUS : '';
    if (a >= 1e-3 && a < 1e5) return s + a.toFixed(a >= 1 ? k : Math.min(9, k + Math.ceil(-Math.log10(a))));
    const [m, e] = a.toExponential(k).split('e');
    return `${s}${m}×10${sup(e)}`;
  }
  const qLabel = (j) => `${j}/16 = ${qOf(j).toFixed(4)}`;

  /* ---------- readouts ---------- */
  function updateReadouts() {
    const d = fresh();
    const okE = d.E === 3 * d.V - 6, okF = d.F === 2 * d.V - 4, okChi = d.chi === 2;
    $('vOut').textContent = `V = ${d.V}`;
    $('vIdx').setAttribute('aria-valuetext', `V = ${d.V}`);
    $('roVEF').innerHTML = `${d.V} − ${d.E} + ${d.F} = <b class="okmark">${d.chi} ${okChi ? '✓' : '✗'}</b>`
      + `<span class="sub">E = 3·${d.V} − 6 = ${3 * d.V - 6} ${okE ? '✓' : '✗'} · F = 2·${d.V} − 4 = ${2 * d.V - 4} ${okF ? '✓' : '✗'}</span>`;
    $('roDeg').innerHTML = `<span class="vmg">${d.deg5}</span> / ${d.deg6}`
      + `<span class="sub">${L('其他度数', 'other degrees')}: ${d.degOther}</span>`;
    $('roCombo').innerHTML = `<span class="vmg">${d.deg5} × 60° = ${fx(d.comboTotalDeg, 0)}°</span>`
      + `<span class="sub">${L('六度顶点', 'degree-6 vertices')}: 0° · = 4π</span>`;
    const hexText = d.deg6
      ? L(`六度顶点 ${fx(d.hexMinDeg, 3)}°–${fx(d.hexMaxDeg, 3)}°`, `degree-6 ${fx(d.hexMinDeg, 3)}°–${fx(d.hexMaxDeg, 3)}°`)
      : L('没有六度顶点', 'no degree-6 vertices');
    $('roMetric').innerHTML = `Σδᵥ = ${fx(d.metricTotalDeg, 6)}° = ${fx(d.metricTotalRad / Math.PI, 9)}π <span class="okmark">${Math.abs(d.metricTotalDeg - 720) < 1e-6 ? '✓' : '✗'}</span>`
      + `<span class="sub">${L(
        `五度顶点平均 ${fx(d.pentMeanDeg, 3)}°，占总量 ${fx(d.pentShare * 100, 2)}% · ${hexText} · 最小 δᵥ = ${fx(d.minDefectDeg, 4)}° > 0`,
        `degree-5 mean ${fx(d.pentMeanDeg, 3)}°, ${fx(d.pentShare * 100, 2)}% of the total · ${hexText} · min δᵥ = ${fx(d.minDefectDeg, 4)}° > 0`
      )}</span>`;
    const t = d.taylor;
    const okT = t.residual <= t.bound;
    $('roTaylor').innerHTML = `cos<sub>${2 * d.taylorN}</sub>(${d.theta0Deg}°) = <span class="vvi">${fx(t.poly, 8)}</span> · cos(${d.theta0Deg}°) = <span class="vcy">${fx(t.exact, 8)}</span>`
      + `<span class="sub">|R<sub>${2 * d.taylorN}</sub>| = <b class="vmg">${fsci(t.residual)}</b> ≤ θ₀<sup>${2 * d.taylorN}</sup>/(${2 * d.taylorN})! = ${fsci(t.bound)} <span class="okmark">${okT ? '✓' : '✗'}</span> · ${L('次数', 'degree')} ${t.degree} · ${L('在 θ* 处', 'at θ*')} |R| = ${fsci(d.taylorStar.residual)}</span>`;
    $('roHelix').innerHTML = `<span class="vam">${d.pitch.toFixed(2)}</span>`
      + `<span class="sub">${d.helixClosed ? L('螺距为零：影子即闭合圆', 'zero pitch: the closed circle itself') : L(`一圈后 (1, 0, ${d.pitch.toFixed(2)}) ≠ (1, 0, 0)`, `after one turn (1, 0, ${d.pitch.toFixed(2)}) ≠ (1, 0, 0)`)}</span>`;
    $('roSin').innerHTML = `${fx(d.sinStar, 10)}<span class="sub">sin 1 = ${fx(d.sin1, 10)} &lt; 1</span>`;

    const k = d.steps, th = d.dottie.theta[k];
    $('roDottie').innerHTML = `θ${sub(k)} = <span class="vam">${fx(th, 10)}</span> · θ* = <span class="vcy">${fx(d.thetaStar, 12)}</span>`
      + `<span class="sub">ε${sub(k)} = ${fsci(d.dottie.residual[k])} > 0 · |θ${sub(k)} − θ*| = ${fsci(d.dottie.err[k])} · θ₀ = ${d.theta0Deg}° = ${fx(d.theta0, 6)} rad</span>`;
    const xk = d.golden.x[k];
    $('roGolden').innerHTML = `x${sub(k)} = <span class="vvi">${fx(xk, 10)}</span> → φ = ${fx(d.phi, 10)}`
      + `<span class="sub">x₀ = max(0.2, θ₀) = ${fx(d.golden.x0, 6)} · |1 + 1/x${sub(k)} − x${sub(k)}| = ${fsci(d.golden.residual[k])} · |1 + 1/φ − φ| = ${fsci(Math.abs(1 + 1 / d.phi - d.phi))}</span>`;
    const st = d.sets;
    const okN = st.N <= st.card0, okC = st.changes <= st.card0;
    $('roSets').innerHTML = `|S₀| = ${st.card0} → N = <b class="okmark">${st.N} ≤ ${st.card0} ${okN ? '✓' : '✗'}</b> · ${L('严格变化', 'strict changes')} <b class="okmark">${st.changes} ≤ ${st.card0} ${okC ? '✓' : '✗'}</b>`
      + `<span class="sub">|S${sub(k)}| = ${st.atSteps.length}${k >= st.N ? L('（已稳定）', ' (stable)') : ''} · S<sub>N</sub> = {${qLabel(st.jBest)}} · |cos q − q| = ${fsci(st.rBest)} > 0</span>`;

    $('roNote').textContent = L(
      `当前：V = ${d.V}，N = ${d.taylorN}，螺距 ${d.pitch.toFixed(2)}，θ₀ = ${d.theta0Deg}°，k = ${d.steps}。`,
      `Current: V = ${d.V}, N = ${d.taylorN}, pitch ${d.pitch.toFixed(2)}, θ₀ = ${d.theta0Deg}°, k = ${d.steps}.`
    );
    $('pillChi').innerHTML = `V − E + F <strong class="okmark">${d.chi}</strong>`;
    $('pillDefect').innerHTML = `Σδ <strong>${fx(d.metricTotalDeg, 2)}°</strong>`;
    $('pillTheta').innerHTML = `θ${sub(k)} <strong>${fx(th, 6)}</strong>`;
    $('stageSub').textContent = `V=${d.V} · N=${d.taylorN} · p=${d.pitch.toFixed(2)} · θ₀=${d.theta0Deg}° · k=${d.steps}`;
  }

  /* ---------- canvas ---------- */
  const cv = $('view');

  /** Rotation by yaw about z, then a camera raised by elev: returns [screen X, screen Y (up), depth toward viewer]. */
  function viewer(yaw, elev) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), ce = Math.cos(elev), se = Math.sin(elev);
    return (p) => {
      const x1 = p[0] * cy - p[1] * sy, y1 = p[0] * sy + p[1] * cy, z1 = p[2];
      return [x1, y1 * se + z1 * ce, -y1 * ce + z1 * se];
    };
  }

  function layout(W, H) {
    const landscape = W / H >= 1.2;
    if (landscape) {
      const sx = Math.round(W * 0.5);
      return {
        landscape,
        poly: { x: 0, y: 0, w: sx, h: H * 0.7 },
        taylor: { x: 0, y: H * 0.7, w: sx, h: H * 0.3 },
        cobweb: { x: sx, y: 0, w: W - sx, h: H * 0.55 },
        ledger: { x: sx, y: H * 0.55, w: W - sx, h: H * 0.45 }
      };
    }
    return {
      landscape,
      poly: { x: 0, y: 0, w: W, h: H * 0.36 },
      taylor: { x: 0, y: H * 0.36, w: W, h: H * 0.14 },
      cobweb: { x: 0, y: H * 0.5, w: W, h: H * 0.27 },
      ledger: { x: 0, y: H * 0.77, w: W, h: H * 0.23 }
    };
  }

  function drawScene(thumbCover = false) {
    const dpr = TRV.fitCanvas(cv);
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const lay = layout(W, H);
    const u = lay.landscape ? Math.min(W / 960, H / 540) : Math.min(W / 520, H / 860);
    const fu = Math.max(u, 0.92 * dpr);                     // text never drops below ~8.3 CSS px
    const compact = W / dpr < 560;
    const pal = TRV.palette, mono = TRV.fonts.data, disp = TRV.fonts.display;
    const d = fresh();
    labels = [];
    lastLayout = { dpr, ...lay };

    const T = (s, x, y) => { labels.push(s); ctx.fillText(s, x, y); };
    const font = (px, fam = mono, w = '') => { ctx.font = `${w ? w + ' ' : ''}${px * fu}px ${fam}`; };

    ctx.fillStyle = pal.stage;
    ctx.fillRect(0, 0, W, H);
    const g1 = ctx.createRadialGradient(lay.poly.x + lay.poly.w * 0.5, lay.poly.y + lay.poly.h * 0.55, 0, lay.poly.x + lay.poly.w * 0.5, lay.poly.y + lay.poly.h * 0.55, Math.max(lay.poly.w, lay.poly.h) * 0.55);
    g1.addColorStop(0, TRV.alpha(pal.magenta, 0.07));
    g1.addColorStop(1, TRV.alpha(pal.magenta, 0));
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);
    const g2 = ctx.createRadialGradient(lay.cobweb.x + lay.cobweb.w * 0.5, lay.cobweb.y + lay.cobweb.h * 0.5, 0, lay.cobweb.x + lay.cobweb.w * 0.5, lay.cobweb.y + lay.cobweb.h * 0.5, lay.cobweb.w * 0.55);
    g2.addColorStop(0, TRV.alpha(pal.cyan, 0.06));
    g2.addColorStop(1, TRV.alpha(pal.cyan, 0));
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    // dividers
    ctx.strokeStyle = pal.panelEdge;
    ctx.lineWidth = Math.max(1, u);
    ctx.beginPath();
    if (lay.landscape) {
      ctx.moveTo(lay.cobweb.x, 14 * u); ctx.lineTo(lay.cobweb.x, H - 14 * u);
      ctx.moveTo(10 * u, lay.taylor.y); ctx.lineTo(lay.cobweb.x - 10 * u, lay.taylor.y);
      ctx.moveTo(lay.cobweb.x + 10 * u, lay.ledger.y); ctx.lineTo(W - 10 * u, lay.ledger.y);
    } else {
      for (const r of [lay.taylor, lay.cobweb, lay.ledger]) { ctx.moveTo(10 * u, r.y); ctx.lineTo(W - 10 * u, r.y); }
    }
    ctx.stroke();

    drawPoly(ctx, lay.poly, d, pal, u, fu, T, font, mono, disp, thumbCover, compact);
    drawTaylor(ctx, lay.taylor, d, pal, u, fu, T, font, compact);
    drawCobweb(ctx, lay.cobweb, d, pal, u, fu, T, font, disp, compact);
    drawLedger(ctx, lay.ledger, d, pal, u, fu, T, font, disp, compact);
  }

  function arrowHead(ctx, x1, y1, x2, y2, color, size) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - size * Math.cos(a - 0.42), y2 - size * Math.sin(a - 0.42));
    ctx.lineTo(x2 - size * Math.cos(a + 0.42), y2 - size * Math.sin(a + 0.42));
    ctx.closePath();
    ctx.fill();
  }

  /* ===== polyhedron inscribed in S², 12 degree-5 defect vertices and the open helix ===== */
  function drawPoly(ctx, rect, d, pal, u, fu, T, font, mono, disp, thumbCover, compact) {
    const m = meshAt(S.vIdx), st = m.stats;
    const view = viewer(S.yaw, S.elev);
    const top = rect.y + (compact ? 50 : 64) * fu;
    const avail = rect.h - (top - rect.y) - 14 * u;
    const rad = Math.max(10, Math.min(rect.w * 0.33, avail * (compact ? 0.45 : 0.40)));
    const cx = rect.x + rect.w * 0.5, cy = top + avail * 0.5;
    const Q = m.P.map(view);
    const X = (q) => cx + rad * q[0], Y = (q) => cy - rad * q[1];

    // helix samples (two turns) and the visibility rule: a point outside the ball is hidden iff it projects inside
    // the disc and lies behind the centre plane
    const turns = 2, samples = 240, helix = [];
    for (let i = 0; i <= samples; i++) {
      const t = TAU * turns * i / samples;
      const p = view([Math.cos(t), Math.sin(t), d.pitch * t / TAU]);
      helix.push({ p, hidden: p[0] * p[0] + p[1] * p[1] < 1 && p[2] < 0 });
    }
    const strokeRun = (pts, hiddenWanted) => {
      ctx.beginPath();
      let on = false;
      for (let i = 0; i < pts.length; i++) {
        const vis = pts[i].hidden === hiddenWanted;
        if (vis) { if (!on) { ctx.moveTo(X(pts[i].p), Y(pts[i].p)); on = true; } else ctx.lineTo(X(pts[i].p), Y(pts[i].p)); }
        else on = false;
      }
      ctx.stroke();
    };

    // axis (the new normal direction) and the hidden part of the helix
    const zA = view([0, 0, -1.25]), zB = view([0, 0, 1.4]);
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.5);
    ctx.lineWidth = Math.max(1, u);
    ctx.setLineDash([3 * u, 4 * u]);
    ctx.beginPath(); ctx.moveTo(X(zA), Y(zA)); ctx.lineTo(X(zB), Y(zB)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = TRV.alpha(pal.violet, 0.28);
    ctx.lineWidth = 1.4 * u;
    strokeRun(helix, true);

    // back edges
    ctx.strokeStyle = TRV.alpha(pal.lineHot, 0.55);
    ctx.lineWidth = Math.max(0.6, 0.7 * u);
    ctx.beginPath();
    for (const [a, b] of st.edges) {
      if (Q[a][2] + Q[b][2] < 0) { ctx.moveTo(X(Q[a]), Y(Q[a])); ctx.lineTo(X(Q[b]), Y(Q[b])); }
    }
    ctx.stroke();

    // sphere S² outline
    ctx.strokeStyle = TRV.alpha(pal.cyan, 0.35);
    ctx.lineWidth = 1.2 * u;
    ctx.beginPath(); ctx.arc(cx, cy, rad, 0, TAU); ctx.stroke();

    // front faces, back to front, lightly shaded; caps around degree-5 vertices in magenta
    const light = norm3([-0.45, 0.55, 0.7]);
    const order = [];
    m.faces.forEach((f, i) => {
      const a = Q[f[0]], b = Q[f[1]], c = Q[f[2]];
      const n = cross3(sub3(b, a), sub3(c, a));
      if (n[2] <= 0) return;
      const nn = norm3(n);
      order.push([a[2] + b[2] + c[2], i, Math.max(0, dot3(nn, light))]);
    });
    order.sort((p, r) => p[0] - r[0]);
    for (const [, i, shade] of order) {
      const f = m.faces[i];
      ctx.fillStyle = st.capFace[i] ? TRV.alpha(pal.magenta, 0.16 + 0.16 * shade) : TRV.alpha(pal.cyan, 0.03 + 0.09 * shade);
      ctx.beginPath();
      ctx.moveTo(X(Q[f[0]]), Y(Q[f[0]])); ctx.lineTo(X(Q[f[1]]), Y(Q[f[1]])); ctx.lineTo(X(Q[f[2]]), Y(Q[f[2]]));
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = TRV.alpha(pal.cyan, st.V > 200 ? 0.45 : 0.7);
    ctx.lineWidth = Math.max(0.6, (st.V > 200 ? 0.7 : 1.05) * u);
    ctx.beginPath();
    for (const [a, b] of st.edges) {
      if (Q[a][2] + Q[b][2] >= 0) { ctx.moveTo(X(Q[a]), Y(Q[a])); ctx.lineTo(X(Q[b]), Y(Q[b])); }
    }
    ctx.stroke();

    // equator = the helix's shadow (a closed circle)
    const eq = [];
    for (let i = 0; i <= 144; i++) { const t = TAU * i / 144; const p = view([Math.cos(t), Math.sin(t), 0]); eq.push({ p, hidden: p[2] < 0 }); }
    ctx.setLineDash([5 * u, 4 * u]);
    ctx.strokeStyle = TRV.alpha(pal.cyan, 0.9);
    ctx.lineWidth = 1.6 * u;
    strokeRun(eq, false);
    ctx.setLineDash([]);

    // hexagonal vertices (small) and the 12 pentagonal defect vertices (magenta, glowing)
    if (st.V <= 162) {
      ctx.fillStyle = TRV.alpha(pal.sigma, 0.55);
      for (let i = 0; i < st.V; i++) {
        if (st.deg[i] !== 6 || Q[i][2] < 0) continue;
        ctx.beginPath(); ctx.arc(X(Q[i]), Y(Q[i]), 1.3 * u, 0, TAU); ctx.fill();
      }
    }
    for (const i of st.pent) {
      const front = Q[i][2] >= 0;
      ctx.fillStyle = front ? pal.magenta : TRV.alpha(pal.magenta, 0.35);
      ctx.shadowColor = pal.magenta;
      ctx.shadowBlur = front ? 10 * u : 0;
      ctx.beginPath(); ctx.arc(X(Q[i]), Y(Q[i]), (front ? 4.2 : 2.6) * u, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
    }

    // visible part of the open helix
    ctx.strokeStyle = pal.violet;
    ctx.lineWidth = 2.2 * u;
    ctx.shadowColor = pal.violet;
    ctx.shadowBlur = 6 * u;
    strokeRun(helix, false);
    ctx.shadowBlur = 0;

    // lift after one turn: (1, 0, 0) → (1, 0, p)
    const A0 = view([1, 0, 0]), A1 = view([1, 0, d.pitch]), A2 = view([1, 0, 2 * d.pitch]);
    ctx.fillStyle = pal.cyan;
    ctx.beginPath(); ctx.arc(X(A0), Y(A0), 3.4 * u, 0, TAU); ctx.fill();
    if (d.pitch > 0) {
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.4 * u;
      ctx.beginPath(); ctx.moveTo(X(A0), Y(A0)); ctx.lineTo(X(A1), Y(A1)); ctx.stroke();
      arrowHead(ctx, X(A0), Y(A0), X(A1), Y(A1), pal.amber, 7 * u);
      ctx.fillStyle = TRV.alpha(pal.violet, 0.9);
      ctx.beginPath(); ctx.arc(X(A2), Y(A2), 2.6 * u, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = pal.amber;
    ctx.shadowColor = pal.amber;
    ctx.shadowBlur = 8 * u;
    ctx.beginPath(); ctx.arc(X(A1), Y(A1), 4 * u, 0, TAU); ctx.fill();
    ctx.shadowBlur = 0;
    font(10.5);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = pal.amber;
    T(d.pitch > 0 ? `Δz = ${d.pitch.toFixed(2)}` : L('Δz = 0（闭合）', 'Δz = 0 (closed)'), X(A1) + 8 * u, Y(A1) - 6 * fu);

    // text block
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const lx = rect.x + 16 * u;
    let ly = rect.y + 12 * u;
    if (thumbCover) {
      font(13, mono, '600');
      ctx.fillStyle = pal.cyan;
      T(`ORTHO//ESCAPE · V = ${d.V}`, lx, ly);
    } else {
      font(11, disp, '600');
      ctx.fillStyle = pal.cyan;
      T(L(`测地割圆多面体 V = ${d.V} · 内接于 S²`, `GEODESIC POLYHEDRON V = ${d.V} · INSCRIBED IN S²`), lx, ly);
    }
    ly += 16 * fu;
    font(10.5);
    ctx.fillStyle = pal.ink;
    T(`V − E + F = ${d.V} − ${d.E} + ${d.F} = ${d.chi}`, lx, ly);
    ly += 14 * fu;
    ctx.fillStyle = pal.magenta;
    T(L(`${d.deg5} 个五度顶点 × 60° = 720° = 4π`, `${d.deg5} degree-5 vertices × 60° = 720° = 4π`), lx, ly);
    if (!compact) {
      ly += 14 * fu;
      ctx.fillStyle = pal.dim;
      T(d.deg6
        ? L(`实际角亏 Σδᵥ = ${fx(d.metricTotalDeg, 4)}° · 六度最大 ${fx(d.hexMaxDeg, 2)}°`, `metric Σδᵥ = ${fx(d.metricTotalDeg, 4)}° · degree-6 max ${fx(d.hexMaxDeg, 2)}°`)
        : L(`实际角亏 Σδᵥ = ${fx(d.metricTotalDeg, 4)}° · 无六度顶点`, `metric Σδᵥ = ${fx(d.metricTotalDeg, 4)}° · no degree-6 vertices`), lx, ly);
    }
    if (compact) return;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    font(10);
    ctx.fillStyle = pal.violet;
    T(L('开口螺旋 (cos t, sin t, p·t/2π)', 'open helix (cos t, sin t, p·t/2π)'), rect.x + rect.w - 14 * u, rect.y + rect.h - 22 * fu);
    ctx.fillStyle = pal.cyan;
    T(L('沿轴的影子：闭合单位圆', 'shadow along the axis: closed unit circle'), rect.x + rect.w - 14 * u, rect.y + rect.h - 8 * fu);
  }

  /* ===== Taylor truncation strip: cos θ vs cos₂N(θ) on [0, π] ===== */
  function drawTaylor(ctx, rect, d, pal, u, fu, T, font, compact) {
    const x0 = rect.x + 40 * u, x1 = rect.x + rect.w - 16 * u;
    const y0 = rect.y + (compact ? 22 : 30) * fu, y1 = rect.y + rect.h - 16 * fu;
    if (y1 - y0 < 12) return;
    const YMAX = 1.3;
    const X = (t) => x0 + (x1 - x0) * t / Math.PI;
    const Y = (v) => y0 + (y1 - y0) * (YMAX - Math.max(-YMAX, Math.min(YMAX, v))) / (2 * YMAX);
    // axes
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.5);
    ctx.lineWidth = Math.max(1, 0.8 * u);
    ctx.beginPath();
    ctx.moveTo(x0, Y(0)); ctx.lineTo(x1, Y(0));
    ctx.moveTo(x0, y0); ctx.lineTo(x0, y1);
    ctx.stroke();
    font(9);
    ctx.fillStyle = pal.dim;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    T('0', X(0), Y(0) + 2 * u);
    T('π/2', X(Math.PI / 2), Y(0) + 2 * u);
    T('π', X(Math.PI), Y(0) + 2 * u);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    T('1', x0 - 4 * u, Y(1));
    T(`${MINUS}1`, x0 - 4 * u, Y(-1));

    const n = 160, N = d.taylorN;
    const exact = [], poly = [];
    for (let i = 0; i <= n; i++) { const t = Math.PI * i / n; exact.push([X(t), Y(Math.cos(t))]); poly.push([X(t), Y(taylorPoly(t, N))]); }
    // the seam between the curves
    ctx.fillStyle = TRV.alpha(pal.magenta, 0.2);
    ctx.beginPath();
    exact.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    for (let i = poly.length - 1; i >= 0; i--) ctx.lineTo(poly[i][0], poly[i][1]);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 1.8 * u;
    ctx.beginPath();
    exact.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.strokeStyle = pal.violet;
    ctx.setLineDash([5 * u, 3 * u]);
    ctx.beginPath();
    poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.setLineDash([]);

    // the current angle θ₀
    const t0 = d.theta0, tx = X(t0);
    ctx.strokeStyle = TRV.alpha(pal.amber, 0.8);
    ctx.lineWidth = 1.2 * u;
    ctx.beginPath(); ctx.moveTo(tx, y0); ctx.lineTo(tx, y1); ctx.stroke();
    ctx.fillStyle = pal.cyan;
    ctx.beginPath(); ctx.arc(tx, Y(d.taylor.exact), 3 * u, 0, TAU); ctx.fill();
    ctx.fillStyle = pal.violet;
    ctx.beginPath(); ctx.arc(tx, Y(d.taylor.poly), 3 * u, 0, TAU); ctx.fill();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    font(10, TRV.fonts.display, '600');
    ctx.fillStyle = pal.violet;
    T(compact
      ? L(`泰勒 N = ${N}（次数 ${2 * N - 2}）`, `TAYLOR N = ${N} (DEG ${2 * N - 2})`)
      : L(`泰勒截断 · N = ${N} · 次数 ${2 * N - 2}`, `TAYLOR TRUNCATION · N = ${N} · DEGREE ${2 * N - 2}`), rect.x + 16 * u, rect.y + 8 * u);
    font(compact ? 9 : 10);
    ctx.fillStyle = pal.magenta;
    ctx.textAlign = 'right';
    T(compact
      ? `|R| = ${fsci(d.taylor.residual)} ≤ ${fsci(d.taylor.bound)}`
      : `|R| = ${fsci(d.taylor.residual)} ≤ θ₀^${2 * N}/(${2 * N})! = ${fsci(d.taylor.bound)}`, x1, rect.y + 8 * u);
  }

  /* ===== Dottie cosine cobweb ===== */
  function drawCobweb(ctx, rect, d, pal, u, fu, T, font, disp, compact) {
    const x0 = rect.x + 36 * u, x1 = rect.x + rect.w - 18 * u;
    const y0 = rect.y + (compact ? 40 : 54) * fu, y1 = rect.y + rect.h - 22 * fu;
    if (y1 - y0 < 20) return;
    const XA = -1.05, XB = Math.PI + 0.05, YA = -1.1, YB = 1.2;
    const X = (t) => x0 + (x1 - x0) * (t - XA) / (XB - XA);
    const Y = (v) => y1 - (y1 - y0) * (v - YA) / (YB - YA);
    ctx.save();
    ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip();
    // grid
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.18);
    ctx.lineWidth = Math.max(1, 0.7 * u);
    ctx.beginPath();
    for (const gx of [-1, 1, Math.PI / 2, Math.PI]) { ctx.moveTo(X(gx), y0); ctx.lineTo(X(gx), y1); }
    for (const gy of [-1, 1]) { ctx.moveTo(x0, Y(gy)); ctx.lineTo(x1, Y(gy)); }
    ctx.stroke();
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.55);
    ctx.beginPath();
    ctx.moveTo(X(0), y0); ctx.lineTo(X(0), y1);
    ctx.moveTo(x0, Y(0)); ctx.lineTo(x1, Y(0));
    ctx.stroke();
    // diagonal y = θ and the curve y = cos θ
    ctx.strokeStyle = TRV.alpha(pal.sigma, 0.6);
    ctx.lineWidth = 1.2 * u;
    ctx.beginPath(); ctx.moveTo(X(XA), Y(XA)); ctx.lineTo(X(1.25), Y(1.25)); ctx.stroke();
    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const t = XA + (XB - XA) * i / 200; const px = X(t), py = Y(Math.cos(t)); if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
    ctx.stroke();

    // cobweb path from (θ₀, 0)
    const th = d.dottie.theta, k = d.steps;
    const segs = [];
    let px = th[0], py = 0;
    for (let j = 0; j < k; j++) {
      segs.push([px, py, th[j], th[j + 1]]);        // vertical to the curve
      segs.push([th[j], th[j + 1], th[j + 1], th[j + 1]]); // horizontal to the diagonal
      px = th[j + 1]; py = th[j + 1];
    }
    segs.forEach((s, i) => {
      const last = i >= segs.length - 2;
      ctx.strokeStyle = last ? pal.amber : TRV.alpha(pal.cyan, 0.35 + 0.5 * (i / Math.max(1, segs.length)));
      ctx.lineWidth = (last ? 2 : 1.3) * u;
      ctx.beginPath(); ctx.moveTo(X(s[0]), Y(s[1])); ctx.lineTo(X(s[2]), Y(s[3])); ctx.stroke();
    });
    // θ* and the current iterate
    ctx.strokeStyle = pal.sigma;
    ctx.lineWidth = 1.4 * u;
    ctx.beginPath(); ctx.arc(X(d.thetaStar), Y(d.thetaStar), 6 * u, 0, TAU); ctx.stroke();
    ctx.fillStyle = pal.amber;
    ctx.beginPath(); ctx.arc(X(th[0]), Y(0), 3.6 * u, 0, TAU); ctx.fill();
    ctx.shadowColor = pal.amber;
    ctx.shadowBlur = 8 * u;
    ctx.beginPath(); ctx.arc(X(th[k]), Y(th[k]), 4 * u, 0, TAU); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // tick labels
    font(9);
    ctx.fillStyle = pal.dim;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    T(`${MINUS}1`, X(-1), y1 + 3 * u);
    T('0', X(0), y1 + 3 * u);
    T('1', X(1), y1 + 3 * u);
    T('π/2', X(Math.PI / 2), y1 + 3 * u);
    T('π', X(Math.PI), y1 + 3 * u);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    T('1', x0 - 4 * u, Y(1));
    T(`${MINUS}1`, x0 - 4 * u, Y(-1));

    // labels on the plot
    font(10);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = pal.sigma;
    T(`θ* ≈ ${fx(d.thetaStar, 6)}`, X(d.thetaStar) + 9 * u, Y(d.thetaStar) - 5 * u);
    ctx.fillStyle = pal.amber;
    ctx.textBaseline = 'top';
    T(`θ₀ = ${d.theta0Deg}°`, Math.min(X(th[0]) + 5 * u, x1 - 60 * fu), Y(0) + 4 * u);
    ctx.fillStyle = pal.cyan;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    T('y = cos θ', X(Math.PI) - 2 * u, Y(Math.cos(Math.PI)) - 6 * u);
    ctx.fillStyle = TRV.alpha(pal.sigma, 0.85);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    T('y = θ', X(-0.8) + 8 * u, Y(-0.8) + 2 * u);

    // inset: angle θ* on the unit circle, cos θ* = θ* (cyan) and sin θ* (violet)
    if (!compact) {
      const ir = Math.min(30 * u, (y1 - y0) * 0.22), icx = x1 - ir - 10 * u, icy = y0 + ir + 34 * fu;
      ctx.strokeStyle = TRV.alpha(pal.dim, 0.7);
      ctx.lineWidth = Math.max(1, 0.8 * u);
      ctx.beginPath(); ctx.arc(icx, icy, ir, -Math.PI / 2, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(icx, icy); ctx.lineTo(icx + ir * 1.05, icy); ctx.moveTo(icx, icy); ctx.lineTo(icx, icy - ir * 1.05); ctx.stroke();
      const ex = icx + ir * d.thetaStar, ey = icy - ir * d.sinStar;
      ctx.strokeStyle = pal.cyan; ctx.lineWidth = 2 * u;
      ctx.beginPath(); ctx.moveTo(icx, icy); ctx.lineTo(ex, icy); ctx.stroke();
      ctx.strokeStyle = pal.violet;
      ctx.beginPath(); ctx.moveTo(ex, icy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.strokeStyle = pal.sigma; ctx.lineWidth = 1.4 * u;
      ctx.beginPath(); ctx.moveTo(icx, icy); ctx.lineTo(ex, ey); ctx.stroke();
      font(9);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillStyle = pal.violet;
      T(`sin θ* = √(1 − θ*²) ≈ ${fx(d.sinStar, 6)}`, x1, icy + 4 * u);
    }

    // header
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    font(11, disp, '600');
    ctx.fillStyle = pal.cyan;
    T(L('Dottie 余弦蛛网 θₖ₊₁ = cos θₖ', 'DOTTIE COSINE COBWEB θₖ₊₁ = cos θₖ'), rect.x + 16 * u, rect.y + 10 * u);
    font(10);
    ctx.fillStyle = pal.amber;
    T(`ε${sub(k)} = |cos θ${sub(k)} − θ${sub(k)}| = ${fsci(d.dottie.residual[k])} > 0`, rect.x + 16 * u, rect.y + 10 * u + 15 * fu);
    if (!compact) {
      ctx.fillStyle = pal.dim;
      T(L(`压缩率 sin 1 ≈ ${fx(d.sin1, 6)} < 1（巴拿赫，文献结果）`, `contraction rate sin 1 ≈ ${fx(d.sin1, 6)} < 1 (Banach, literature)`), rect.x + 16 * u, rect.y + 10 * u + 29 * fu);
    }
  }

  /* ===== convergence ledger: residuals on a log scale and the contracting set sizes ===== */
  function drawLedger(ctx, rect, d, pal, u, fu, T, font, disp, compact) {
    const k = d.steps;
    const head = rect.y + 10 * u;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    font(11, disp, '600');
    ctx.fillStyle = pal.cyan;
    T(compact ? L('收敛账本', 'CONVERGENCE LEDGER') : L('收敛账本 · 残差（对数）与集合收缩', 'CONVERGENCE LEDGER · LOG RESIDUALS & SET CONTRACTION'), rect.x + 16 * u, head);

    const cw = rect.w * 0.58;
    const lineH = 13 * fu, nLines = compact ? 2 : 3;
    const px0 = rect.x + 42 * u, px1 = rect.x + cw - 8 * u;
    const py0 = head + 16 * fu + nLines * lineH + 6 * fu, py1 = rect.y + rect.h - 20 * fu;
    if (py1 - py0 < 16) return;
    const LMIN = -12, LMAX = 1;
    const X = (j) => px0 + (px1 - px0) * j / Math.max(1, k);
    const Y = (v) => { const l = Math.log10(Math.max(v, 1e-300)); return py1 - (py1 - py0) * (Math.max(LMIN, Math.min(LMAX, l)) - LMIN) / (LMAX - LMIN); };
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.2);
    ctx.lineWidth = Math.max(1, 0.7 * u);
    ctx.beginPath();
    for (const e of [0, -4, -8, -12]) { ctx.moveTo(px0, Y(10 ** e)); ctx.lineTo(px1, Y(10 ** e)); }
    ctx.stroke();
    font(8.5);
    ctx.fillStyle = pal.dim;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (const e of [0, -4, -8, -12]) T(`10${sup(e)}`, px0 - 4 * u, Y(10 ** e));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    T('k = 0', px0, py1 + 3 * u);
    T(`k = ${k}`, px1, py1 + 3 * u);

    const series = (vals, col) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.8 * u;
      ctx.beginPath();
      vals.forEach((v, j) => (j ? ctx.lineTo(X(j), Y(v)) : ctx.moveTo(X(j), Y(v))));
      ctx.stroke();
      ctx.fillStyle = col;
      vals.forEach((v, j) => { ctx.beginPath(); ctx.arc(X(j), Y(v), 2.1 * u, 0, TAU); ctx.fill(); });
    };
    series(d.dottie.residual, pal.cyan);
    series(d.golden.residual, pal.violet);
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 1.6 * u;
    for (const v of [d.dottie.residual[k], d.golden.residual[k]]) { ctx.beginPath(); ctx.arc(X(k), Y(v), 5 * u, 0, TAU); ctx.stroke(); }

    // legend lines, left column (residual chart) and right column (set sizes)
    const bx0 = rect.x + cw + 10 * u, bx1 = rect.x + rect.w - 16 * u;
    const l1 = head + 16 * fu, l2 = l1 + lineH, l3 = l2 + lineH;
    font(9);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = pal.cyan;
    T(compact ? 'Dottie εₖ' : 'Dottie  εₖ = |cos θₖ − θₖ|', rect.x + 16 * u, l1);
    ctx.fillStyle = pal.violet;
    T(compact
      ? L('黄金 |1 + 1/xₖ − xₖ|', 'golden |1 + 1/xₖ − xₖ|')
      : L(`黄金  |1 + 1/xₖ − xₖ|，xₖ → φ = ${fx(d.phi, 6)}`, `golden  |1 + 1/xₖ − xₖ|, xₖ → φ = ${fx(d.phi, 6)}`), rect.x + 16 * u, l2);
    if (!compact) {
      ctx.fillStyle = pal.ok;
      font(9, TRV.fonts.data, '600');
      T(L('LEAN ✓ φ 是 1 + 1/x = x 的唯一正解', 'LEAN ✓ x > 0: 1 + 1/x = x ⇔ x = φ'), rect.x + 16 * u, l3);
    }

    // set sizes |S_n| for n = 0 … k
    const by0 = py0, by1 = py1;
    const sets = d.sets, card0 = sets.card0;
    const nBars = k + 1, gap = Math.max(1, 1.5 * u);
    const bw = Math.max(1, (bx1 - bx0 - gap * (nBars - 1)) / nBars);
    const BH = (c) => (by1 - by0) * c / Math.max(1, card0);
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.6);
    ctx.setLineDash([4 * u, 3 * u]);
    ctx.lineWidth = Math.max(1, 0.8 * u);
    ctx.beginPath(); ctx.moveTo(bx0, by1 - BH(card0)); ctx.lineTo(bx1, by1 - BH(card0)); ctx.stroke();
    ctx.setLineDash([]);
    for (let n = 0; n < nBars; n++) {
      const c = sets.seq[n].length, x = bx0 + n * (bw + gap), h = BH(c);
      ctx.fillStyle = n === sets.N ? TRV.alpha(pal.blue, 1) : TRV.alpha(pal.blue, n > sets.N ? 0.45 : 0.75);
      ctx.fillRect(x, by1 - h, bw, h);
      if (n === k) { ctx.strokeStyle = pal.amber; ctx.lineWidth = 1.5 * u; ctx.strokeRect(x - 0.5 * u, by1 - h - 0.5 * u, bw + u, h + u); }
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = pal.ok;
    font(9, TRV.fonts.data, '600');
    T(`LEAN ✓ N = ${sets.N} ≤ |S₀| = ${card0}`, bx0, l1);
    font(9);
    ctx.fillStyle = pal.blue;
    T(compact
      ? L(`变化 ${sets.changes} ≤ ${card0}`, `changes ${sets.changes} ≤ ${card0}`)
      : L(`|Sₙ|：严格变化 ${sets.changes} ≤ ${card0}`, `|Sₙ|: strict changes ${sets.changes} ≤ ${card0}`), bx0, l2);
    if (!compact) {
      ctx.fillStyle = pal.dim;
      T(`→ q = ${sets.qBest.toFixed(4)} · |cos q − q| > 0`, bx0, l3);
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = pal.dim;
    T(`|S₀| = ${card0}`, bx1, by1 - BH(card0) + 3 * u);
    T(`n = 0 … ${k}`, bx1, py1 + 3 * u);
  }

  /* ---------- render & state updates ---------- */
  function render() {
    pending = false;
    const key = `${stateKey()},${TRV.lang()}`;
    if (key !== built) {
      fresh();
      updateReadouts();
      built = key;
    }
    $('vIdx').value = String(S.vIdx);
    $('taylorN').value = $('taylorNNum').value = String(S.taylorN);
    $('pitch').value = String(S.pitch);
    $('pitchNum').value = S.pitch.toFixed(2);
    $('theta0').value = $('theta0Num').value = String(S.theta0);
    $('steps').value = $('stepsNum').value = String(S.steps);
    $('taylorNDec').disabled = S.taylorN <= 1;
    $('taylorNInc').disabled = S.taylorN >= 6;
    $('pitchDec').disabled = S.pitch <= 0;
    $('pitchInc').disabled = S.pitch >= 0.5;
    $('theta0Dec').disabled = S.theta0 <= 0;
    $('theta0Inc').disabled = S.theta0 >= 180;
    $('stepsDec').disabled = S.steps <= 1;
    $('stepsInc').disabled = S.steps >= 20;
    document.querySelectorAll('#vChips [data-v]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === S.vIdx)));
    const cur = stateKey();
    document.querySelectorAll('#presets [data-preset]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.preset === cur)));
    drawScene(TRV.thumbMode);
    frames++;
  }

  function schedule() {
    if (!pending) {
      pending = true;
      requestAnimationFrame(render);
    }
  }

  function setParams(vIdx, theta0, taylorN, pitch, steps) {
    S.vIdx = clampInt(vIdx, 0, 4, S.vIdx);
    S.theta0 = clampInt(theta0, 0, 180, S.theta0);
    S.taylorN = clampInt(taylorN, 1, 6, S.taylorN);
    S.pitch = clampPitch(pitch, S.pitch);
    S.steps = clampInt(steps, 1, 20, S.steps);
    built = '';
    schedule();
  }
  const resetAll = () => {
    S.yaw = VIEW0.yaw;
    S.elev = VIEW0.elev;
    setParams(DEFAULTS.vIdx, DEFAULTS.theta0, DEFAULTS.taylorN, DEFAULTS.pitch, DEFAULTS.steps);
  };

  /* ---------- wire controls ---------- */
  function bindStepper(key, lo, hi, step, clamp) {
    const apply = (v) => { S[key] = clamp(v, lo, hi, S[key]); built = ''; schedule(); };
    $(key).addEventListener('input', (ev) => apply(ev.target.value));
    $(key + 'Num').addEventListener('change', (ev) => apply(ev.target.value));
    $(key + 'Num').addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.target.blur(); });
    $(key + 'Dec').addEventListener('click', () => apply(S[key] - step));
    $(key + 'Inc').addEventListener('click', () => apply(S[key] + step));
  }
  const clampP = (v, lo, hi, fb) => clampPitch(v, fb);
  bindStepper('taylorN', 1, 6, 1, clampInt);
  bindStepper('pitch', 0, 0.5, 0.01, clampP);
  bindStepper('theta0', 0, 180, 1, clampInt);
  bindStepper('steps', 1, 20, 1, clampInt);
  $('vIdx').addEventListener('input', (ev) => { S.vIdx = clampInt(ev.target.value, 0, 4, S.vIdx); built = ''; schedule(); });
  document.querySelectorAll('#vChips [data-v]').forEach((b) => {
    b.addEventListener('click', () => { S.vIdx = clampInt(b.dataset.v, 0, 4, S.vIdx); built = ''; schedule(); });
  });

  document.querySelectorAll('#presets [data-preset]').forEach((b) => {
    b.addEventListener('click', () => {
      const [v, th, n, p, k] = b.dataset.preset.split(',').map(Number);
      setParams(v, th, n, p, k);
      const name = (b.querySelector(TRV.lang() === 'en' ? '.en' : '.zh') || b).textContent;
      TRV.toast($('toast'), L(`载入预设 <b>${TRV.esc(name)}</b>`, `Preset loaded: <b>${TRV.esc(name)}</b>`), 2600);
    });
  });

  // drag on the left (polyhedron) region rotates the view
  let dragging = false, lastPt = null;
  cv.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType !== 'mouse' && ev.pointerType !== 'pen') return;
    const r = cv.getBoundingClientRect();
    const lx = (ev.clientX - r.left) * (cv.width / r.width), ly = (ev.clientY - r.top) * (cv.height / r.height);
    const p = lastLayout && lastLayout.poly;
    if (!p || lx < p.x || lx > p.x + p.w || ly < p.y || ly > p.y + p.h) return;
    dragging = true;
    lastPt = [ev.clientX, ev.clientY];
    cv.setPointerCapture(ev.pointerId);
  });
  cv.addEventListener('pointermove', (ev) => {
    if (!dragging || !lastPt) return;
    const dx = ev.clientX - lastPt[0], dy = ev.clientY - lastPt[1];
    lastPt = [ev.clientX, ev.clientY];
    S.yaw += dx * 0.01;
    S.elev = Math.max(-1.2, Math.min(1.2, S.elev + dy * 0.008));
    schedule();
  });
  const endDrag = () => { dragging = false; lastPt = null; };
  cv.addEventListener('pointerup', endDrag);
  cv.addEventListener('pointercancel', endDrag);

  document.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const t = ev.target;
    if (t && (t.closest('input, textarea, select, [contenteditable]') || !$('drawer').hidden)) return;
    const k = ev.key;
    if (k === 'v' || k === 'V') { setParams((S.vIdx + 1) % V_LEVELS.length, S.theta0, S.taylorN, S.pitch, S.steps); ev.preventDefault(); }
    else if (k === ']') { setParams(S.vIdx, S.theta0, S.taylorN, S.pitch, S.steps + 1); ev.preventDefault(); }
    else if (k === '[') { setParams(S.vIdx, S.theta0, S.taylorN, S.pitch, S.steps - 1); ev.preventDefault(); }
    else if (k === 'r' || k === 'R') { resetAll(); ev.preventDefault(); }
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch($('app'));
  TRV.onLang(() => { built = ''; schedule(); });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(cv);
  schedule();

  /** Thumbnail cover hook (?thumb=1): a dense dome, a cobweb from π and a visible helix lift; renders two frames. */
  window.TRV_THUMB = () => new Promise((resolve) => {
    S.yaw = VIEW0.yaw;
    S.elev = VIEW0.elev;
    setParams(3, 180, 3, 0.35, 12);
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  /** Read-only probe for browser regression tests (tests/sphere-escape.test.mjs). */
  const copySets = (s) => ({
    S0: s.S0.slice(), seq: s.seq.map((a) => a.slice()), N: s.N, changes: s.changes, card0: s.card0,
    final: s.final.slice(), atSteps: s.atSteps.slice(), jBest: s.jBest, qBest: s.qBest, rBest: s.rBest
  });
  window.SE_DEBUG = Object.freeze({
    frames: () => frames,
    pending: () => pending,
    levels: () => V_LEVELS.slice(),
    grid: () => ({ denominator: GRID, maxIndex: GRID_MAX }),
    state: () => ({ vIdx: S.vIdx, theta0: S.theta0, taylorN: S.taylorN, pitch: S.pitch, steps: S.steps, yaw: S.yaw, elev: S.elev }),
    info: () => {
      const d = fresh();
      return {
        vIdx: d.vIdx, V: d.V, E: d.E, F: d.F, chi: d.chi, deg5: d.deg5, deg6: d.deg6, degOther: d.degOther,
        comboTotalDeg: d.comboTotalDeg, metricTotalDeg: d.metricTotalDeg, pentShare: d.pentShare, pentMeanDeg: d.pentMeanDeg,
        hexMaxDeg: d.hexMaxDeg, hexMinDeg: d.hexMinDeg, minDefectDeg: d.minDefectDeg,
        theta0Deg: d.theta0Deg, theta0: d.theta0, taylorN: d.taylorN,
        taylor: { ...d.taylor }, taylorStar: { ...d.taylorStar },
        pitch: d.pitch, helixLift: d.helixLift, helixClosed: d.helixClosed,
        steps: d.steps, thetaStar: d.thetaStar, sinStar: d.sinStar, sin1: d.sin1, phi: d.phi,
        dottie: { theta: d.dottie.theta.slice(), residual: d.dottie.residual.slice(), err: d.dottie.err.slice() },
        golden: { x0: d.golden.x0, x: d.golden.x.slice(), residual: d.golden.residual.slice(), err: d.golden.err.slice() },
        sets: copySets(d.sets)
      };
    },
    mesh: (idx = S.vIdx) => {
      const m = meshAt(clampInt(idx, 0, 4, S.vIdx));
      return { P: m.P.map((p) => p.slice()), faces: m.faces.map((f) => f.slice()) };
    },
    taylorAt: (thetaRad, N) => ({ ...taylor(Number(thetaRad), clampInt(N, 1, 6, 1)) }),
    labels: () => labels.slice(),
    set: (vIdx, theta0, taylorN = S.taylorN, pitch = S.pitch, steps = S.steps) => setParams(vIdx, theta0, taylorN, pitch, steps),
    reset: () => resetAll()
  });
})();
