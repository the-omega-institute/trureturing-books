/* ORTHO//COMPASS: two pictures from the second half of Chapter 32, on one rail.
   Compass: the three diagnostic axes of §32.3 (θ grade, η resolution, λ observer) as a cube [0, 1]³; each of the
          eight programmes of §32.4 sits in the band of each axis that the words of the §32.4 table name (one end,
          the other end, or the middle third when the table names neither or both). These places are the book's
          comparative diagnostic coordinates (MODEL); the rail reads the four camps one by one.
   Bridge: the binary icosahedral group 2I computed exactly in ℤ[φ]; the icosian ring with Q(q) = 2(a + b) for
          Nrd q = a + bφ; its 240 vectors with Q = 2 (2I and φ⁻¹·2I); the pure part; and the weighted embedding
          q ↦ (√(2φ/√5) q, √(2φ⁻¹/√5) q^σ) into E∥ ⊕ E⊥, so that ‖∥‖² + ‖⊥‖² = Q.
   Read-only probe for the browser suite: window.COMPASS_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PHI = (1 + Math.sqrt(5)) / 2, SQ5 = Math.sqrt(5);
  const WPAR = Math.sqrt(2 * PHI / SQ5), WPERP = Math.sqrt(2 / (PHI * SQ5));

  /* ---------- ℤ[φ]: a coordinate (p + rφ)/2 is kept as the integer pair [p, r] ---------- */
  /** (p + rφ)(s + tφ) with φ² = φ + 1, as an integer pair (not halved). */
  const zmul = (p, r, s, t) => [p * s + r * t, p * t + r * s + r * t];
  /** A quaternion is 8 integers [p₀, r₀, p₁, r₁, p₂, r₂, p₃, r₃]: coordinate k is (p_k + r_k φ)/2. */
  const qnum = (q, k) => (q[2 * k] + q[2 * k + 1] * PHI) / 2;
  const key = (q) => q.join(',');
  /** The quaternion product, exact; null if a coordinate leaves ½ℤ[φ]. */
  function qmul(a, b) {
    const c = (i) => [a[2 * i], a[2 * i + 1]], d = (i) => [b[2 * i], b[2 * i + 1]];
    // rows: [sign, i, j] for each output coordinate of (a₀ + a⃗)(b₀ + b⃗)
    const T = [[[1, 0, 0], [-1, 1, 1], [-1, 2, 2], [-1, 3, 3]], [[1, 0, 1], [1, 1, 0], [1, 2, 3], [-1, 3, 2]],
      [[1, 0, 2], [-1, 1, 3], [1, 2, 0], [1, 3, 1]], [[1, 0, 3], [1, 1, 2], [-1, 2, 1], [1, 3, 0]]];
    const out = [];
    for (const row of T) {
      let A = 0, B = 0;
      for (const [s, i, j] of row) { const [x, y] = zmul(...c(i), ...d(j)); A += s * x; B += s * y; }
      // each product of two halved coordinates is a quarter; the result is kept halved
      if (A % 2 !== 0 || B % 2 !== 0) return null;
      out.push(A / 2, B / 2);
    }
    return out;
  }
  /** ⟨x, y⟩ = Σ x_k y_k = (A + Bφ)/4. */
  function zdot(x, y) { let A = 0, B = 0; for (let k = 0; k < 4; k++) { const [a, b] = zmul(x[2 * k], x[2 * k + 1], y[2 * k], y[2 * k + 1]); A += a; B += b; } return [A, B]; }
  /** Nrd q = q q̄ = a + bφ, returned as [a, b] (integers on the icosian ring). */
  const nrd = (q) => { const [A, B] = zdot(q, q); return [A / 4, B / 4]; };
  /** The bilinear form of Q: B(x, y) = 2(s + t) when ⟨x, y⟩ = s + tφ. */
  const bform = (x, y) => { const [A, B] = zdot(x, y); return (A + B) / 2; };
  const Qof = (q) => bform(q, q);
  /** φ⁻¹ · x, coordinatewise: (p + rφ)(φ − 1) = (r − p) + pφ. */
  const shrink = (q) => { const o = []; for (let k = 0; k < 4; k++) o.push(q[2 * k + 1] - q[2 * k], q[2 * k]); return o; };
  /** The Galois conjugate σ: φ ↦ 1 − φ, coordinatewise: (p + rφ) ↦ (p + r) − rφ. */
  const sigma = (q) => { const o = []; for (let k = 0; k < 4; k++) o.push(q[2 * k] + q[2 * k + 1], -q[2 * k + 1]); return o; };

  /* ---------- 2I: 8 + 16 + 96 elements ---------- */
  const TWO_I = (() => {
    const E = [];
    for (let k = 0; k < 4; k++) for (const s of [1, -1]) { const q = [0, 0, 0, 0, 0, 0, 0, 0]; q[2 * k] = 2 * s; E.push(q); }
    for (let m = 0; m < 16; m++) { const q = []; for (let k = 0; k < 4; k++) q.push(m & (1 << k) ? -1 : 1, 0); E.push(q); }
    // (0, 1, φ⁻¹, φ)/2 with φ⁻¹ = φ − 1, under the 12 even permutations and the 8 signs of the non-zero entries
    const base = [[0, 0], [1, 0], [-1, 1], [0, 1]], perms = [];
    const permute = (a, n) => { if (n === 1) { perms.push(a.slice()); return; } for (let i = 0; i < n; i++) { permute(a, n - 1); const j = n % 2 ? 0 : i; [a[j], a[n - 1]] = [a[n - 1], a[j]]; } };
    permute([0, 1, 2, 3], 4);
    const even = (p) => { let c = 0; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (p[i] > p[j]) c++; return c % 2 === 0; };
    for (const p of perms.filter(even)) for (let m = 0; m < 8; m++) {
      const q = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let k = 0; k < 4; k++) { const s = k === 0 ? 1 : (m & (1 << (k - 1)) ? -1 : 1); q[2 * p[k]] = s * base[k][0]; q[2 * p[k] + 1] = s * base[k][1]; }
      E.push(q);
    }
    return E;
  })();
  const IN_2I = new Set(TWO_I.map(key));
  /** The 240 vectors of Q = 2: 2I, then φ⁻¹·2I in the same order. */
  const ROOTS = TWO_I.map((q) => ({ q, gold: false })).concat(TWO_I.map((q) => ({ q: shrink(q), gold: true })));
  ROOTS.forEach((R, i) => {
    const q = R.q, x = [0, 1, 2, 3].map((k) => qnum(q, k)), s = sigma(q), y = [0, 1, 2, 3].map((k) => qnum(s, k));
    const n = Math.hypot(...x);
    R.i = i; R.x = x; R.w = x[0] / n;   // the real part of the unit direction: equal for q and φ⁻¹q
    R.par = [WPAR * x[1], WPAR * x[2], WPAR * x[3]];
    R.perp = [WPERP * y[1], WPERP * y[2], WPERP * y[3]];
    R.par2 = WPAR * WPAR * (x[0] ** 2 + x[1] ** 2 + x[2] ** 2 + x[3] ** 2);
    R.perp2 = WPERP * WPERP * (y[0] ** 2 + y[1] ** 2 + y[2] ** 2 + y[3] ** 2);
    R.pure = q[0] === 0 && q[1] === 0;
    R.nrd = nrd(q); R.Q = Qof(q);
  });

  /* ---------- the checks the page reports (all exact) ---------- */
  const FACTS = (() => {
    let closed = 0, unit = 0, hurwitz = 0;
    for (const a of TWO_I) { if (key(nrd(a)) === '1,0') unit++; if (a.every((v, k) => k % 2 === 1 ? v === 0 : true)) hurwitz++; for (const b of TWO_I) { const c = qmul(a, b); if (c && IN_2I.has(key(c))) closed++; } }
    let integral = true, lo = Infinity, hi = -Infinity, nbOk = true, nbCount = -1;
    for (const a of ROOTS) {
      let nb = 0;
      for (const b of ROOTS) { const v = bform(a.q, b.q); if (!Number.isInteger(v)) integral = false; lo = Math.min(lo, v); hi = Math.max(hi, v); if (v === 1) nb++; }
      if (nbCount < 0) nbCount = nb; else if (nb !== nbCount) nbOk = false;
    }
    // a ℤ-basis of the icosian ring by integer row reduction of the 120 coordinate vectors, then Gram determinants
    const basis = hnf(TWO_I.map((q) => q.slice()));
    const pureBasis = basis.filter((v) => v[0] === 0 && v[1] === 0);
    const gram = (Bs) => Bs.map((x) => Bs.map((y) => bform(x, y)));
    const pureRoots = ROOTS.filter((R) => R.pure);
    let pureNb = -1;
    for (const a of pureRoots) { let nb = 0; for (const b of pureRoots) if (bform(a.q, b.q) === 1) nb++; pureNb = nb; }
    const shells = {};
    for (const q of TWO_I) { const w = key([q[0], q[1]]); shells[w] = (shells[w] || 0) + 1; }
    return {
      size: TWO_I.length, distinct: IN_2I.size, unit, hurwitz, closed, products: TWO_I.length ** 2,
      roots: ROOTS.length, qTwo: ROOTS.filter((R) => R.Q === 2).length, integral, bRange: [lo, hi], neighbours: nbOk ? nbCount : null,
      rank: basis.length, det: det(gram(basis)), pureRank: pureBasis.length, pureDet: det(gram(pureBasis)), pureRoots: pureRoots.length, pureNeighbours: pureNb,
      shells
    };
  })();
  /** Row echelon form over ℤ (rows are integer vectors); returns the non-zero rows, a ℤ-basis of their span. */
  function hnf(rows) {
    const A = rows.map((r) => r.slice()), n = A[0].length;
    let r0 = 0;
    for (let c = 0; c < n && r0 < A.length; c++) {
      for (;;) {
        let piv = -1;
        for (let i = r0; i < A.length; i++) if (A[i][c] !== 0 && (piv < 0 || Math.abs(A[i][c]) < Math.abs(A[piv][c]))) piv = i;
        if (piv < 0) break;
        [A[r0], A[piv]] = [A[piv], A[r0]];
        let clean = true;
        for (let i = r0 + 1; i < A.length; i++) if (A[i][c] !== 0) { const f = Math.floor(A[i][c] / A[r0][c]); for (let j = c; j < n; j++) A[i][j] -= f * A[r0][j]; if (A[i][c] !== 0) clean = false; }
        if (clean) { r0++; break; }
      }
    }
    return A.slice(0, r0);
  }
  /** Determinant of an integer matrix (fraction-free elimination). */
  function det(M) {
    const A = M.map((r) => r.slice()), n = A.length;
    let sign = 1, prev = 1;
    for (let k = 0; k < n - 1; k++) {
      if (A[k][k] === 0) { const s = A.findIndex((r, i) => i > k && r[k] !== 0); if (s < 0) return 0; [A[k], A[s]] = [A[s], A[k]]; sign = -sign; }
      for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) A[i][j] = (A[i][j] * A[k][k] - A[i][k] * A[k][j]) / prev;
      prev = A[k][k];
    }
    return sign * A[n - 1][n - 1];
  }

  /* ---------- shells: the elements of one family (2I or φ⁻¹·2I) with one |w|, and the convex hull of their places ----------
     Each shell is computed from the elements themselves: its distinct places in E∥ (and, for the pure ones, in E⊥),
     their convex hull by brute force over all triples (a face is a plane that has every place on one side; places on
     the plane are ordered round the face), and the counts V, E, F with the sizes of the faces. */
  function hull(pts) {
    const n = pts.length, faces = [], seen = new Set(), c0 = v3.scale(pts.reduce((a, p) => v3.add(a, p), [0, 0, 0]), 1 / n);
    const scale = Math.max(...pts.map((p) => v3.len(v3.sub(p, c0))));
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
      let nm = v3.cross(v3.sub(pts[j], pts[i]), v3.sub(pts[k], pts[i]));
      const L = v3.len(nm); if (L < 1e-9 * scale * scale) continue;
      nm = v3.scale(nm, 1 / L);
      const tol = 1e-9 * scale, on = []; let pos = 0, neg = 0;
      for (let m = 0; m < n; m++) { const s = v3.dot(nm, v3.sub(pts[m], pts[i])); if (s > tol) pos++; else if (s < -tol) neg++; else on.push(m); }
      if (pos && neg) continue;
      const id = on.join(','); if (seen.has(id)) continue; seen.add(id);
      if (pos) nm = v3.scale(nm, -1);   // outward
      const fc = v3.scale(on.reduce((a, m) => v3.add(a, pts[m]), [0, 0, 0]), 1 / on.length);
      const e1 = v3.unit(v3.sub(pts[on[0]], fc)), e2 = v3.cross(nm, e1);
      on.sort((a, b) => { const pa = v3.sub(pts[a], fc), pb = v3.sub(pts[b], fc); return Math.atan2(v3.dot(pa, e2), v3.dot(pa, e1)) - Math.atan2(v3.dot(pb, e2), v3.dot(pb, e1)); });
      faces.push({ v: on, n: nm, d: v3.dot(nm, pts[on[0]]) });
    }
    const edges = new Set();
    for (const f of faces) f.v.forEach((a, t) => { const b = f.v[(t + 1) % f.v.length]; edges.add(a < b ? `${a},${b}` : `${b},${a}`); });
    const sizes = {}; for (const f of faces) sizes[f.v.length] = (sizes[f.v.length] || 0) + 1;
    return { faces, V: n, E: edges.size, F: faces.length, sizes };
  }
  const NAMES = { '12,30,20,3:20': ['正二十面体', 'icosahedron'], '20,30,12,5:12': ['正十二面体', 'dodecahedron'], '30,60,32,3:20,5:12': ['截半二十面体', 'icosidodecahedron'] };
  const nameOf = (h) => NAMES[[h.V, h.E, h.F, ...Object.keys(h.sizes).sort().map((s) => `${s}:${h.sizes[s]}`)].join(',')] || null;
  const placeKey = (p) => p.map((x) => (Math.abs(x) < 5e-10 ? 0 : x).toFixed(8)).join(',');
  const SHELLS = (() => {
    const out = [];
    for (const gold of [false, true]) {
      const ws = [...new Set(ROOTS.filter((R) => R.gold === gold).map((R) => Math.abs(R.w).toFixed(9)))].map(Number).sort((a, b) => b - a);
      for (const aw of ws) {
        const members = ROOTS.filter((R) => R.gold === gold && Math.abs(Math.abs(R.w) - aw) < 1e-9).map((R) => R.i);
        const sh = { gold, w: aw, members, count: members.length };
        for (const [sp, field] of [['par', 'par'], ['perp', 'perp']]) {
          if (sp === 'perp' && aw > 1e-9) continue;
          const places = new Map();
          for (const i of members) { const p = ROOTS[i][field]; const k = placeKey(p); if (!places.has(k)) places.set(k, p); }
          const pts = [...places.values()], h = pts.length >= 4 ? hull(pts) : null;
          sh[sp] = { pts, key: [...places.keys()].sort().join('|'), hull: h, name: h ? nameOf(h) : null, radius: Math.max(...pts.map((p) => v3.len(p))) };
        }
        out.push(sh);
      }
    }
    return out;
  })();
  const shellOf = (i) => SHELLS.find((s) => s.members.includes(i));
  /* ---------- how to write a coordinate (p + rφ)/2 ---------- */
  function coef(p, r) {
    const v = (p + r * PHI) / 2;
    if (Math.abs(v) < 1e-12) return '0';
    const neg = v < 0 ? '−' : '', a = Math.abs(r);
    let body;
    if (r === 0) body = p % 2 === 0 ? String(Math.abs(p / 2)) : Math.abs(p) === 1 ? '½' : `${Math.abs(p)}/2`;
    else if (p === 0) body = a === 2 ? 'φ' : a === 1 ? '½φ' : `${a}φ/2`;
    else if (p === -r) body = a === 2 ? 'φ⁻¹' : a === 1 ? '½φ⁻¹' : `${a}φ⁻¹/2`;
    else if (p === -2 * r) body = a === 2 ? 'φ⁻²' : a === 1 ? '½φ⁻²' : `${a}φ⁻²/2`;
    else return `(${p} ${r < 0 ? '−' : '+'} ${a}φ)/2`.replace('(-', '(−');
    return neg + body;
  }
  function qtext(q) {
    const parts = [];
    ['', 'i', 'j', 'k'].forEach((u, k) => {
      const c = coef(q[2 * k], q[2 * k + 1]);
      if (c === '0') return;
      const neg = c[0] === '−', body = neg ? c.slice(1) : c, term = u && body === '1' ? u : `${body}${u}`;
      parts.push(parts.length ? `${neg ? '−' : '+'} ${term}` : `${neg ? '−' : ''}${term}`);
    });
    return parts.join(' ') || '0';
  }
  const nrdText = ([a, b]) => (b === 0 ? String(a).replace('-', '−') : `${a === 0 ? '' : `${a} ${b < 0 ? '−' : '+'} `}${a === 0 && b < 0 ? '−' : ''}${Math.abs(b) === 1 ? '' : Math.abs(b)}φ`);

  /* ---------- compass: the eight programmes, coded from the words of §32.4 ---------- */
  const LO = 0.12, HI = 0.88;
  // [id, camp, θ, η, λ, short zh, short en, name zh, name en, why θ, why η, why λ] — middle values spread inside the middle third
  const PROG = [
    ['strings', 1, HI, LO, 0.5, '弦/M', 'String/M', '弦论 / M 理论', 'String / M theory',
      ['面：“用二维有向世界面取代零维点粒子”', 'area: “a two-dimensional oriented worldsheet in place of the zero-dimensional point particle”'],
      ['光滑：“预设光滑连续流形”', 'smooth: “presupposes a smooth continuous manifold”'],
      ['未述：总表没有点明', 'not named in the table']],
    ['lqg', 1, HI, HI, 0.5, 'LQG', 'LQG', '圈量子引力', 'Loop quantum gravity',
      ['面：“偏重纯外积旋转面”', 'area: “leans on the pure outer-product plane of rotation”'],
      ['多面体：“无背景离散多面体与 SU(2) 二维面积量子”', 'polytope: “background-free discrete polyhedra and SU(2) quanta of area”'],
      ['未述：总表没有点明', 'not named in the table']],
    ['ads', 2, 0.36, 0.64, LO, 'AdS/CFT', 'AdS/CFT', 'AdS/CFT 全息', 'AdS/CFT holography',
      ['未述：总表没有点明', 'not named in the table'], ['未述：总表没有点明', 'not named in the table'],
      ['球外：“站在无穷远共形上帝边界”', 'outside: “stands on the conformal God’s-eye boundary at infinity”']],
    ['twistor', 2, 0.64, 0.36, LO, '扭量', 'Twistors', '扭量与振幅多面体', 'Twistors and the amplituhedron',
      ['未述：总表没有点明', 'not named in the table'], ['未述：总表没有点明', 'not named in the table'],
      ['球外：“局限于渐近散射边界……缺内生主观时间读出”', 'outside: “confined to the asymptotic scattering boundary … no inner reading of subjective time”']],
    ['ncg', 3, LO, 0.5, LO, 'NCG · E₈', 'NCG · E₈', '非对易几何 & E₈ 晶格', 'Noncommutative geometry & the E₈ lattice',
      ['线：“局部丢弃外积面”', 'line: “locally drops the outer-product plane”'],
      ['两者：“一阶狄拉克算子重构度规；八维偶幺模 E₈ 根系”', 'both: “a first-order Dirac operator rebuilds the metric; the eight-dimensional even unimodular E₈ root system”'],
      ['球外：“静态 E₈ 缺观察者切片”', 'outside: “a static E₈ lacks an observer slice”']],
    ['wolfram', 3, 0.5, HI, 0.5, '超图', 'Hypergraph', 'Wolfram 超图 / 因果集', 'Wolfram hypergraphs / causal sets',
      ['未述：总表没有点明', 'not named in the table'],
      ['多面体：离散重写与离散因果集', 'polytope: discrete rewriting and discrete causal sets'],
      ['两者：“计算有界观察者粗粒化”，却“退守无穷冗余 Ruliad”', 'both: “coarse-graining by computationally bounded observers”, yet “falls back on the infinitely redundant Ruliad”']],
    ['langlands', 4, 0.36, 0.36, LO, '朗兰兹', 'Langlands', '朗兰兹纲领 & HoTT', 'The Langlands programme & HoTT',
      ['未述：总表没有点明', 'not named in the table'], ['未述：总表没有点明', 'not named in the table'],
      ['球外：“纯数学框架缺……热力学观察者实现载体”', 'outside: “a purely mathematical frame lacking … a thermodynamic observer to carry it”']],
    ['entropic', 4, 0.5, LO, HI, '熵引力', 'Entropic', '熵引力 & 主动推理 / 惠勒 U', 'Entropic gravity & active inference / Wheeler\'s U',
      ['未述：总表没有点明', 'not named in the table'],
      ['光滑：“缺底层离散几何代数”', 'smooth: “lacks an underlying discrete geometric algebra”'],
      ['场内：马尔可夫毯与参与式自激回路', 'inside: the Markov blanket and the participatory self-excited circuit']]
  ].map(([id, camp, th, et, la, sz, se, nz, ne, wt, we, wl]) => ({ id, camp, c: [th, et, la], short: [sz, se], name: [nz, ne], why: [wt, we, wl] }));
  const BOOK = { id: 'book', camp: 0, c: [0.5, HI, HI], short: ['本书', 'This book'], name: ['正交自指统一场（本书）', 'The orthogonal self-referential unified field (this book)'],
    why: [['两者：几何积同时保留线与面积', 'both: the geometric product keeps line and area together'], ['多面体：有限多面体近似律', 'polytope: the law of finite polytope approximation'], ['场内：零号元公理砍掉外部点 C', 'inside: the zeroth axiom removes the external point C']] };
  const CAMPS = [null, ['世界面 vs. 面积量子', 'worldsheet vs. quanta of area'], ['边界全息 vs. 无时间正几何', 'boundary holography vs. timeless positive geometry'],
    ['算子谱与 E₈ vs. 重写因果网', 'operator spectra and E₈ vs. rewriting causal networks'], ['算术谱与类型等价 vs. 视界自由能与自激回路', 'arithmetic spectra and type equivalence vs. horizon free energy and self-excited circuits']];
  const band = (v) => (v < 1 / 3 ? 0 : v > 2 / 3 ? 2 : 1);
  const AXES = [
    [['线', 'line'], ['面积', 'area'], ['θ 阶数', 'θ grade']],
    [['光滑', 'smooth'], ['多面体', 'polytope'], ['η 分辨率', 'η resolution']],
    [['球外 C', 'outside C'], ['场内', 'inside'], ['λ 观察者', 'λ observer']]
  ];
  const BAND_WORD = (axis, v) => { const b = band(v); return b === 1 ? L('中段', 'middle') : L(...AXES[axis][b === 0 ? 0 : 1]); };
  const CUBE = 1.5;
  const world = (c) => [(c[0] - 0.5) * CUBE, (c[1] - 0.5) * CUBE, (c[2] - 0.5) * CUBE + 0.16];   // lifted clear of the legend
  const byId = (id) => (id === 'book' ? BOOK : PROG.find((p) => p.id === id));

  /* ---------- state and scenes ---------- */
  let booting = true;
  const S = { scene: 'compass', ta: 0, tb: 1, prog: null, book: false, sel: 0 };
  const SCENES = {
    compass: { max: 4, rate: 0.7, step: 1, get: () => S.ta, set: (v) => { S.ta = v; } },
    bridge: { max: 4, rate: 0.45, step: 0.25, get: () => S.tb, set: (v) => { S.tb = v; } }
  };
  const campAt = (t) => (t <= 1e-9 ? 0 : Math.min(4, Math.ceil(t - 1e-9)));
  /** What the bridge shows at rail value t: which roots, where, and the leg. */
  function bridgeAt(t) {
    const eps = 1e-9, leg = t <= 1 + eps ? 0 : t <= 2 + eps ? 1 : t <= 3 + eps ? 2 : 3;
    const cut0 = 1 - 2 * Math.min(1, t), cut1 = 1 - 2 * kit.clamp(t - 1, 0, 1), keep = 1 - kit.clamp(t - 2, 0, 1), alpha = kit.clamp(t - 3, 0, 1) * Math.PI / 2;
    const vis = ROOTS.map((R) => {
      if (!R.gold && R.w < cut0 - eps) return false;
      if (R.gold && (t <= 1 + eps || R.w < cut1 - eps)) return false;
      if (t > 2 && Math.abs(R.w) > keep + eps) return false;
      return true;
    });
    const ca = Math.cos(alpha), sa = Math.sin(alpha);
    const pos = ROOTS.map((R) => [ca * R.par[0] + sa * R.perp[0], ca * R.par[1] + sa * R.perp[1], ca * R.par[2] + sa * R.perp[2]]);
    const n = vis.filter(Boolean).length, units = vis.filter((v, i) => v && !ROOTS[i].gold).length;
    return { t, leg, vis, pos, alpha, n, units, golden: n - units, cut: leg === 0 ? cut0 : leg === 1 ? cut1 : null };
  }

  /* ---------- the stage ---------- */
  const DISP = 0.78;
  const CAM = { compass: [-0.3, 0.5], bridge: [0.35, 0.62] };   // world units per unit of the weighted coordinates
  let lastBridge = null;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.38 : 0.36, cy: TRV.figure ? 0.54 : 0.56, yaw: -0.3, pitch: 0.5,
    onChange: () => paint(),
    onPick: (ev, st) => pickAt(ev, st)
  });
  // The first leg of the bridge (2I shell by shell) draws its shells as lit solids on a second stage, which follows the
  // camera of the first: dragging and picking stay with the 2D stage; this one only draws and tells what a solid hides.
  // Every other picture of the page is drawn on the 2D stage as before.
  const solid = kit.solid($('stage'), {
    canvas: $('cvs'), radius: TRV.thumbMode ? 0.38 : 0.36, cy: TRV.figure ? 0.54 : 0.56, yaw: -0.3, pitch: 0.5,
    rotate: false, onChange: () => paint(), onPick: () => true
  });
  const solidLeg = (B) => S.scene === 'bridge' && B.leg === 0;
  function pickAt(ev, st) {
    let best = null, bd = 14;
    if (S.scene === 'compass') {
      for (const p of PROG.concat(S.book ? [BOOK] : [])) { const d = st.near(ev, world(p.c)); if (d < bd) { bd = d; best = p.id; } }
      if (!best) return false;
      cards.mark(null); S.prog = best; paint(); return true;
    }
    const B = lastBridge || bridgeAt(S.tb);
    // the nearest dot under the pointer; of dots drawn on the same place, the one nearest the viewer
    let bz = -Infinity;
    const hides = solidLeg(B);
    ROOTS.forEach((R, i) => { if (!B.vis[i]) return; const w = v3.scale(B.pos[i], DISP), d = st.near(ev, w), z = st.p(w)[2]; if (hides && solid.occluded(w, 0.02)) return; if (d < bd - 0.5 || (d < bd + 0.5 && d < 14 && z > bz)) { bd = Math.min(bd, d); bz = z; best = i; } });
    if (best == null) return false;
    cards.mark(null); select(best); return true;
  }

  function drawCompass() {
    const st = stage, c = st.begin(), camp = campAt(S.ta), thumb = TRV.thumbMode;
    // the cube, its three axis edges split into thirds, the bands marked by ticks
    const corners = []; for (let m = 0; m < 8; m++) corners.push([m & 1, (m >> 1) & 1, (m >> 2) & 1]);
    for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) {
      const d = corners[a].reduce((s, x, k) => s + Math.abs(x - corners[b][k]), 0);
      if (d === 1 && !(a === 0 && [1, 2, 4].includes(b))) st.line(world(corners[a]), world(corners[b]), { color: P.faint, width: 1, alpha: 0.9, back: 0.5 });
    }
    const axisEdge = (k, lo, hi) => {
      const e = (t) => { const v = [0, 0, 0]; v[k] = t; return world(v); };
      st.line(e(0), e(1 / 3), { color: lo, width: 2.6, back: 0.6 });
      st.line(e(1 / 3), e(2 / 3), { color: P.dim, width: 1.4, back: 0.6 });
      st.line(e(2 / 3), e(1), { color: hi, width: 2.6, back: 0.6 });
      return e;
    };
    const ends = [axisEdge(0, P.cyan, P.magenta), axisEdge(1, P.dim, P.ink), axisEdge(2, P.dim, P.ink)];
    // the four camps read so far: their pairs joined; the current one in amber
    for (let k = 1; k <= camp; k++) {
      const [a, b] = PROG.filter((p) => p.camp === k), now = k === camp;
      if (now) { c.save(); c.shadowColor = P.amber; c.shadowBlur = 10; }
      st.line(world(a.c), world(b.c), { color: now ? P.amber : P.ink, width: now ? 2.6 : 1.4, alpha: now ? 1 : 0.55, back: 0.6 });
      if (now) c.restore();
    }
    // the selected programme: drop lines to the three walls through which its coordinates are read
    const sel = S.prog ? byId(S.prog) : null;
    if (sel && (sel !== BOOK || S.book)) {
      for (let k = 0; k < 3; k++) { const f = sel.c.slice(); f[k] = 0; st.line(world(sel.c), world(f), { color: P.amber, width: 1, dash: [3, 4], alpha: 0.8, back: 0.6 }); }
    }
    const list = PROG.concat(S.book ? [BOOK] : []).map((p) => [p, st.p(world(p.c))[2]]).sort((a, b) => a[1] - b[1]);
    for (const [p] of list) {
      const inCamp = camp > 0 && p.camp === camp, isSel = sel === p, w = world(p.c);
      if (p === BOOK) { st.dot(w, 9, P.ink, { ring: true, width: 2.2, fade: false }); st.dot(w, 3.5, P.ink, { fade: false }); }
      else st.dot(w, inCamp ? 7 : 5.5, inCamp ? P.amber : P.ink, { glow: inCamp ? 12 : 0, alpha: inCamp || camp === 0 ? 1 : 0.7, fade: false });
      if (isSel) st.dot(w, 12, P.amber, { ring: true, width: 2, fade: false });
      if (!thumb) st.tag('p-' + p.id, w, L(...p.short), `raw ${inCamp || isSel ? 'c-am' : 'ink'}`, { dy: p.id === 'langlands' ? 17 : p === BOOK ? -24 : -16, dx: p.id === 'entropic' ? -26 : 0, fade: false });
    }
    if (!thumb) {
      // each pole word sits beside the middle of its band, pushed away from the cube
      // on a narrow stage the axis names shrink to their letters so the words stay inside the frame
      const narrow = st.W < 560, OUT = [[0, 0, 0.13], [-0.2, 0, -0.2], narrow ? [-0.24, -0.06, 0] : [-0.42, -0.1, 0]];
      for (let k = 0; k < 3; k++) {
        const cl = k === 0 ? ['raw c-cy', 'raw c-mg'] : ['raw ink', 'raw ink'], name = narrow ? 'θηλ'[k] : L(...AXES[k][2]);
        st.tag(`ax${k}a`, v3.add(ends[k](1 / 6), OUT[k]), L(...AXES[k][0]), cl[0], { fade: false });
        st.tag(`ax${k}b`, k === 1 ? v3.add(ends[1](1.06), [narrow ? -0.15 : -0.3, 0, 0]) : v3.add(ends[k](5 / 6), OUT[k]), `${name} → ${L(...AXES[k][1])}`, cl[1], { fade: false });
      }
    }
    st.end();
  }

  function drawBridge() {
    const st = stage, c = st.begin(), B = lastBridge = bridgeAt(S.tb), thumb = TRV.thumbMode;
    // the sphere Q = 2 holds every projection of a root (a projection is never longer than the vector)
    st.sphere(Math.SQRT2 * DISP, { lat: [0], lon: 0, alpha: 0.18, shade: 0.04 });
    // the two shells the pure roots live on: radius √(2φ/√5) and √(2φ⁻¹/√5) for the unit and golden imaginary parts
    if (B.leg >= 1) for (const r of [WPAR, WPERP]) st.circle([0, 0, 0], st.facing(), r * DISP, { color: P.dim, width: 1, alpha: 0.55, dash: [3, 4], fade: false, n: 96 });
    // in the last leg, the E∥ places stay behind as faint rings
    if (B.leg === 3) ROOTS.forEach((R, i) => { if (B.vis[i]) st.dot(v3.scale(R.par, DISP), 2.4, R.gold ? P.magenta : P.cyan, { ring: true, width: 1, alpha: 0.3 }); });
    const order = ROOTS.map((R, i) => [i, B.vis[i] ? st.p(v3.scale(B.pos[i], DISP))[2] : -9]).filter(([i]) => B.vis[i]).sort((a, b) => a[1] - b[1]);
    const front = [frontier(B, false), frontier(B, true)];
    for (const [i] of order) {
      const R = ROOTS[i], p = v3.scale(B.pos[i], DISP), col = R.gold ? P.magenta : P.cyan;
      const fresh = B.leg === (R.gold ? 1 : 0) && Math.abs(R.w - front[R.gold ? 1 : 0]) < 1e-9;
      if (R.w < -1e-9 && B.leg < 3) st.dot(p, R.gold ? 4.6 : 5.6, col, { ring: true, width: 1.4 });
      else st.dot(p, R.gold ? 3.2 : 4, col, { glow: fresh ? 10 : 0, alpha: fresh ? 1 : 0.92 });
    }
    // the selected element
    if (B.vis[S.sel]) {
      const p = v3.scale(B.pos[S.sel], DISP);
      c.save(); c.shadowColor = P.amber; c.shadowBlur = 12;
      st.dot(p, 7.5, P.amber, { ring: true, width: 2.4, fade: false });
      c.restore();
    }
    if (!thumb) {
      const R = Math.SQRT2 * DISP;
      st.tag('qsphere', [R * 0.72, -R * 0.72, -0.05], L('球面：Q = 2', 'sphere: Q = 2'), 'raw ink', { dx: 34, dy: 10 });
    }
    st.end();
  }
  /* ---------- the first leg of the bridge: the shells as a solid and as cages ----------
     While 2I appears shell by shell, every shell with a hull whose elements are on the stage is drawn. The shell of the
     selected element (or, when it is not on the stage yet, the newest shell) is a lit, flat-shaded polyhedron; every
     other shell is a cage of its edges, so that the shells around the solid stay visible and the solid hides what is
     behind and inside it. */
  let lastShells = [];
  function shellsAt(B) {
    const space = B.leg < 3 || B.alpha < 1e-9 ? 'par' : B.alpha > Math.PI / 2 - 1e-9 ? 'perp' : null;
    if (!space) return [];
    const list = [], keys = new Set();
    for (const sh of SHELLS) {
      const g = sh[space];
      if (!g || !g.hull || !sh.members.some((i) => B.vis[i]) || keys.has(g.key)) continue;
      keys.add(g.key); list.push({ sh, g, space, solid: false });
    }
    // the solid: the shell of the selected element; else the shell admitted last (its |w| nearest the cut)
    let focus = B.vis[S.sel] ? list.find((x) => x.sh.members.includes(S.sel)) : null;
    if (!focus && list.length) focus = list.slice().sort((x, y) => (B.leg < 2 ? x.sh.w - y.sh.w : y.sh.w - x.sh.w) || (x.sh.gold ? -1 : 1))[0];
    if (focus) focus.solid = true;
    return list;
  }
  /** The polyhedron of a shell on the stage: its vertices and faces. */
  const solidOf = (s) => ({ vertices: s.g.pts.map((p) => v3.scale(p, DISP)), faces: s.g.hull.faces.map((f) => f.v.slice()) });
  /** The edges of a shell (pairs of vertex indices). */
  const edgesOf = (s) => { const e = new Map(); for (const f of s.g.hull.faces) f.v.forEach((a, t) => { const b = f.v[(t + 1) % f.v.length]; e.set(a < b ? `${a},${b}` : `${b},${a}`, [Math.min(a, b), Math.max(a, b)]); }); return [...e.values()]; };

  function drawSolid() {
    const st = solid, B = lastBridge = bridgeAt(S.tb), thumb = TRV.thumbMode;
    Object.assign(st.cam, stage.cam);
    st.begin();
    // the sphere Q = 2 holds every projection of a root (a projection is never longer than the vector): a glass shell
    st.glass('qsphere', [0, 0, 0], Math.SQRT2 * DISP, { color: P.cyan, alpha: 0.04, rim: 0.22 });
    const shells = lastShells = shellsAt(B);
    for (const s of shells) {
      const col = s.sh.gold ? P.magenta : P.cyan, m = solidOf(s);
      if (s.solid) st.poly('shell', m, { color: col, edges: P.stage, id: s.g.key });
      else for (const [a, b] of edgesOf(s)) st.line([m.vertices[a], m.vertices[b]], { color: col, width: 1.1, alpha: 0.5 });
    }
    const front = [frontier(B, false), frontier(B, true)];
    ROOTS.forEach((R, i) => {
      if (!B.vis[i]) return;
      const p = v3.scale(B.pos[i], DISP), col = R.gold ? P.magenta : P.cyan;
      const fresh = B.leg === (R.gold ? 1 : 0) && Math.abs(R.w - front[R.gold ? 1 : 0]) < 1e-9;
      if (R.w < -1e-9) st.ring(p, { r: R.gold ? 4.6 : 5.6, color: col, key: 'r' + i });
      else st.bead(p, { r: R.gold ? 3.2 : 4, color: col, glow: fresh ? 0.9 : 0.45, key: 'r' + i });
    });
    // the selected element, and the name of the polyhedron its shell makes
    if (B.vis[S.sel]) {
      const p = v3.scale(B.pos[S.sel], DISP), s = shells.find((x) => x.sh.members.includes(S.sel));
      st.ring(p, { r: 7.5, color: P.amber, key: 'sel' });
      if (!thumb && s && s.g.name) st.tag('shell', p, `${L(...s.g.name)} · ${s.g.hull.V}`, 'raw c-am', { dy: -20 });
    }
    if (!thumb) {
      const R = Math.SQRT2 * DISP;
      st.tag('qsphere', [R * 0.72, -R * 0.72, -0.05], L('球面：Q = 2', 'sphere: Q = 2'), 'raw ink', { dx: 34, dy: 10, occlude: false });
    }
    st.end();
  }

  /** The real part of the shell admitted last in the current leg (for the glow of the newest shell). */
  function frontier(B, gold) {
    let m = Infinity;
    ROOTS.forEach((R, i) => { if (B.vis[i] && R.gold === gold) m = Math.min(m, R.w); });
    return m;
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    const cv = $('plot');
    if (S.scene === 'compass') {
      const g = kit.plot(cv, { x: [0, 1], y: [0, 3], pad: [74, 64, 8, 8] });
      const camp = campAt(S.ta), sel = S.prog ? byId(S.prog) : null;
      for (const x of [1 / 3, 2 / 3]) g.vline(x, P.faint, { dash: [3, 3] });
      for (let k = 0; k < 3; k++) {
        const y = 2.5 - k;
        g.line([[0, y], [1, y]], P.panelEdge, { width: 1 });
        g.text(0, y, L(...AXES[k][0]), k === 0 ? P.cyan : P.dim, { align: 'right', dx: -8, size: 10.5, face: 'body' });
        g.text(1, y, L(...AXES[k][1]), k === 0 ? P.magenta : P.dim, { align: 'left', dx: 8, size: 10.5, face: 'body' });
        for (const p of PROG.concat(S.book ? [BOOK] : [])) {
          const hot = camp > 0 && p.camp === camp;
          if (p === BOOK) g.dot(p.c[k], y, P.ink, 5, { ring: true, width: 1.8 });
          else g.dot(p.c[k], y, hot ? P.amber : P.ink, hot ? 4.5 : 3.2, { alpha: hot || camp === 0 ? 0.95 : 0.55 });
        }
        if (sel && (sel !== BOOK || S.book)) g.dot(sel.c[k], y, P.amber, 7.5, { ring: true, width: 1.6 });
      }
      $('plotTitle').innerHTML = L('<span>三根轴上，各家落在哪一段</span>', '<span>Which band of each axis each programme falls in</span>');
      $('plotMeta').textContent = camp ? L(`第 ${camp} 阵营`, `camp ${camp}`) : L('四大阵营', 'four camps');
    } else {
      const B = lastBridge || bridgeAt(S.tb);
      if (B.leg === 0) {
        const W = [1, PHI / 2, 0.5, (PHI - 1) / 2, 0, -(PHI - 1) / 2, -0.5, -PHI / 2, -1];
        const counts = W.map((w) => TWO_I.filter((q) => Math.abs(qnum(q, 0) - w) < 1e-9).length);
        const g = kit.plot(cv, { x: [-0.6, 8.6], y: [0, 36], pad: [30, 10, 8, 22] });
        g.axes({ yTicks: [0, 10, 20, 30], xTicks: W.map((w, k) => [k, fix(w, 2)]) });
        W.forEach((w, k) => {
          const on = w >= B.cut - 1e-9;
          g.rect(k - 0.34, 0, k + 0.34, counts[k], P.cyan, { alpha: on ? 0.55 : 0.12, stroke: P.cyan, strokeAlpha: on ? 0.9 : 0.3 });
          g.text(k, counts[k], String(counts[k]), on ? P.ink : P.dim, { align: 'center', base: 'bottom', dy: -2, size: 10 });
        });
        const xc = (1 - B.cut) / 2 * 8;
        g.vline(kit.clamp(xc, 0, 8), P.amber, { width: 1.4 });
        $('plotTitle').innerHTML = L('<span>按实部分层：每一层有几个元素</span>', '<span>Shells by real part: how many elements in each</span>');
        $('plotMeta').textContent = `w ≥ ${fix(B.cut, 3)} · ${B.units} / 120`;
      } else {
        const g = kit.plot(cv, { x: [0, 2.2], y: [0, 2], pad: [132, 12, 8, 22] });
        g.axes({ xTicks: [0, 0.5, 1, 1.5, 2], frame: true });
        const R0 = ROOTS[0], R1 = ROOTS[120];
        [[R0, 1.35, P.cyan, ['2I（Nrd = 1）', '2I (Nrd = 1)']], [R1, 0.55, P.magenta, ['φ⁻¹·2I（Nrd = 2 − φ）', 'φ⁻¹·2I (Nrd = 2 − φ)']]].forEach(([R, y, col, lab]) => {
          g.rect(0, y - 0.28, R.par2, y + 0.28, col, { alpha: 0.6 });
          g.rect(R.par2, y - 0.28, R.par2 + R.perp2, y + 0.28, col, { alpha: 0.18, stroke: col, strokeAlpha: 0.7 });
          g.text(0, y, L(...lab), col, { align: 'right', dx: -6, size: 10, face: 'body' });
          g.text(R.par2 / 2, y, `∥ ${fix(R.par2, 3)}`, P.ink, { align: 'center', size: 10 });
          g.text(R.par2 + R.perp2 / 2, y, `⊥ ${fix(R.perp2, 3)}`, P.ink, { align: 'center', size: 10 });
        });
        g.vline(2, P.ink, { dash: [4, 3], alpha: 0.8 });
        $('plotTitle').innerHTML = L('<span>每个根：E∥ 里的长度² 加 E⊥ 里的长度²，都是 2</span>', '<span>Every root: length² in E∥ plus length² in E⊥ is 2</span>');
        $('plotMeta').textContent = `Q = ${fix(R0.par2 + R0.perp2, 3)} = ${fix(R1.par2 + R1.perp2, 3)}`;
      }
    }
  }

  /* ---------- readouts, hud ---------- */
  /** The shell of element i as the page computed it: how many elements, the polyhedron its places make, V · E · F. */
  function shellText(i) {
    const sh = shellOf(i), g = sh.par;
    const n = L(`${sh.count} 个元素`, `${sh.count} elements`);
    if (!g.hull) return `${n} · ${L('落在原点', 'at the origin')}`;
    return `${n} · ${g.name ? L(...g.name) : '—'} · ${L('顶点', 'vertices')} ${g.hull.V} · ${L('棱', 'edges')} ${g.hull.E} · ${L('面', 'faces')} ${g.hull.F}`;
  }
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const LEGEND = {
    compass: [['cy', '线（内积）', 'line (inner product)'], ['mg', '面积（外积）', 'area (outer product)'], ['am', '正在读 · 选中', 'being read · selected'], ['dm', '纲领（MODEL）', 'programmes (MODEL)']],
    bridge: [['cy', '2I · Nrd 1', '2I · Nrd 1'], ['mg', 'φ⁻¹·2I · Nrd 2 − φ', 'φ⁻¹·2I · Nrd 2 − φ'], ['am', '选中', 'selected'], ['dm', '空心：实部为负', 'open: real part < 0']]
  };
  function drawText() {
    syncProg();
    let big, sub, keyVal, keyName, rows, note, aside, pill;
    if (S.scene === 'compass') {
      const camp = campAt(S.ta), p = S.prog ? byId(S.prog) : null;
      big = camp ? L(`罗盘 · 第 ${camp} 阵营`, `Compass · camp ${camp}`) : L('罗盘 · 三根轴', 'Compass · three axes');
      sub = camp ? L(CAMPS[camp][0], CAMPS[camp][1]) : L('θ 阶数 · η 分辨率 · λ 观察者（本书的诊断坐标）', 'θ grade · η resolution · λ observer (the book\'s diagnostic coordinates)');
      if (p && (p !== BOOK || S.book)) {
        keyName = L(`${p.name[0]} 的三段（MODEL）`, `${p.name[1]}: its three bands (MODEL)`);
        keyVal = `${BAND_WORD(0, p.c[0])} · ${BAND_WORD(1, p.c[1])} · ${BAND_WORD(2, p.c[2])}`;
        rows = row('wide', 'θ 阶数', 'θ grade', L(...p.why[0])) + row('wide', 'η 分辨率', 'η resolution', L(...p.why[1])) + row('wide', 'λ 观察者', 'λ observer', L(...p.why[2]))
          + row('', '阵营', 'camp', p.camp ? `${p.camp} · ${L(...CAMPS[p.camp])}` : L('本书（诠释）', 'the book (a reading)'));
        note = p === BOOK ? L('这是本书给自己标的位置，是诠释，不是结论：它不说明本书推出或取代了任何一家纲领。', 'This is where the book places itself, a reading and not a result: it does not say the book derives or replaces any programme.')
          : L('坐标只说落在哪一段，依据就是上面引的 §32.4 原话；没点明的轴落在中段。这是本书的比较诊断，不是对这门学科的评判。', 'A coordinate says only which band, on the strength of the §32.4 words quoted above; an axis the table does not name falls in the middle band. This is the book\'s comparative diagnosis, not a verdict on the field.');
      } else {
        keyName = L('八家纲领 · 四大阵营', 'eight programmes · four camps');
        keyVal = camp ? PROG.filter((q) => q.camp === camp).map((q) => L(...q.short)).join(' ↔ ') : L('8 个点 · 每根轴三段', '8 dots · three bands per axis');
        rows = row('', '在线（内积）一端', 'at the line (inner product) end', String(PROG.filter((q) => band(q.c[0]) === 0).length))
          + row('', '在面积（外积）一端', 'at the area (outer product) end', String(PROG.filter((q) => band(q.c[0]) === 2).length))
          + row('', '在多面体一端', 'at the polytope end', String(PROG.filter((q) => band(q.c[1]) === 2).length))
          + row('', '在球外 C 一端', 'at the outside-C end', String(PROG.filter((q) => band(q.c[2]) === 0).length));
        note = L('每个点只说那一家在三根轴上各落在哪一段：§32.4 总表点明偏向哪一端，就落在那一端；没点明或两端都有，落在中段。点一个点看依据。', 'Each dot says only which band of each axis a programme falls in: where the §32.4 table names the end it leans to, it sits at that end; where it names neither or both, in the middle. Click a dot to see the words behind it.');
      }
      aside = 'MODEL';
      pill = ['θ·η·λ', camp ? L(`阵营 ${camp}`, `CAMP ${camp}`) : '—'];
    } else {
      const B = lastBridge || bridgeAt(S.tb), R = ROOTS[S.sel], F = FACTS;
      const legName = [L('2I 一层层出现', '2I shell by shell'), L('加上黄金缩小版', 'adding the golden copies'), L('只留纯虚的', 'keeping the pure ones'), L('从 E∥ 转到 E⊥', 'turning from E∥ to E⊥')][B.leg];
      big = L(`黄金桥 · ${legName}`, `Bridge · ${legName}`);
      sub = B.leg === 0 ? L(`实部 w ≥ ${fix(B.cut, 3)}：已画出 ${B.units} / 120`, `real part w ≥ ${fix(B.cut, 3)}: ${B.units} of 120 drawn`)
        : B.leg === 1 ? L(`Q = 2 的根：${B.n} / 240`, `roots with Q = 2: ${B.n} of 240`)
          : B.leg === 2 ? L(`留下 ${B.n} 个（纯虚的 60 个最后留下）`, `${B.n} left (the 60 pure ones stay to the end)`)
            : L(`投影平面转过 ${fix(B.alpha * 180 / Math.PI, 1)}°：E∥ → E⊥`, `plane of projection turned by ${fix(B.alpha * 180 / Math.PI, 1)}°: E∥ → E⊥`);
      keyName = L('选中元素的 ‖∥‖² + ‖⊥‖² = Q', 'the selected element: ‖∥‖² + ‖⊥‖² = Q');
      keyVal = `<span class="c-cy">${fix(R.par2, 3)}</span> + <span class="c-mg">${fix(R.perp2, 3)}</span> = ${fix(R.par2 + R.perp2, 3)}`;
      rows = row('wide', '选中的元素 q', 'selected element q', qtext(R.q))
        + row('', 'Nrd q · Q', 'Nrd q · Q', `${nrdText(R.nrd)} · ${R.Q}`)
        + row('', '2I 乘法封闭', '2I closed under products', `${F.closed} / ${F.products}`)
        + row('wide', '选中元素所在的层', 'the shell of the selected element', shellText(S.sel))
        + row('', 'Q = 2 的元素 · 两两的 B · B = 1 的邻居', 'elements with Q = 2 · B between them · neighbours with B = 1', `${F.qTwo} · ${F.integral ? L('整数', 'integers') : '—'} ${F.bRange[0]}…${F.bRange[1]} · ${F.neighbours}`.replace('-', '−'))
        + row('', '格拉姆行列式：𝓘（秩 8）· Im 𝓘（秩 6）', 'Gram determinant: 𝓘 (rank 8) · Im 𝓘 (rank 6)', `${F.det} · ${F.pureDet}`);
      note = B.leg === 0 ? L('去掉实部 w 投到三维：同一个 |w| 落在同一层球面上，层的大小 1、12、20、12、30……；实部为负的一半落在同样的位置，画成空心圈。', 'Dropping the real part w: elements with the same |w| land on one spherical shell, of sizes 1, 12, 20, 12, 30, …; the half with negative real part lands on the same places and is drawn as open rings.')
        : B.leg === 1 ? L('每个单位元乘上 φ⁻¹：在 E∥ 里缩短，Nrd 变成 2 − φ，可 Q = 2(a + b) 仍是 2。两份合起来 240 个，两两的 B 都是整数，每个恰有 56 个邻居：这是 E₈ 的根。', 'Each unit times φ⁻¹: shorter in E∥, Nrd becomes 2 − φ, yet Q = 2(a + b) is still 2. Together 240 of them, every B between two of them an integer, each with exactly 56 neighbours: the roots of E₈.')
          : B.leg === 2 ? L('只留实部为零的根：30 个单位、30 个黄金缩小版。纯虚部分秩为 6；配上 Q，它的格拉姆行列式是 4，最短向量正是这 60 个（D₆ 格）。', 'Only the roots with real part zero stay: 30 units and 30 golden copies. The pure part has rank 6; with Q its Gram determinant is 4 and its shortest vectors are exactly these 60 (the lattice D₆).')
            : L('投影平面从 E∥ 转到 E⊥：青色的单位从外层落到内层，品红的黄金缩小版从内层翻到外层；每一个的 ‖∥‖² + ‖⊥‖² 始终是 2。', 'The plane of projection turns from E∥ to E⊥: the cyan units fall from the outer shell to the inner, the magenta golden copies rise from the inner to the outer; ‖∥‖² + ‖⊥‖² stays 2 for each one.');
      aside = 'ℤ[φ]';
      pill = ['N', String(B.n)];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${keyVal}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = { compass: L('罗盘', 'COMPASS'), bridge: L('黄金桥', 'BRIDGE') }[S.scene];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[S.scene].concat(S.scene === 'compass' && S.book ? [['dm', '大空心圈：本书（MODEL）', 'large open ring: the book (MODEL)']] : [])
      .concat(S.scene === 'bridge' && bridgeAt(S.tb).leg === 0 ? [['dm', '实体：选中那一层 · 细线：其余各层', 'solid: the selected shell · lines: the other shells']] : []).map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  function drawStage() {
    if (S.scene === 'bridge' && bridgeAt(S.tb).leg === 0) { stage.begin(); stage.end(); drawSolid(); return; }
    lastShells = [];
    solid.begin(); solid.end();
    if (S.scene === 'compass') drawCompass(); else drawBridge();
  }
  const paint = kit.painter(() => { drawStage(); drawText(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail ---------- */
  let stopAt = null, lastCamp = 0;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 4, rate: 0.7, step: 1, t: 0,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => S.scene === 'compass' ? `${L('阵营', 'camp')} ${campAt(t)} <small>/ ${fix(max, 0)}</small>` : `${L('段', 'leg')} ${fix(t, 2)} <small>/ ${fix(max, 0)}</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      SCENES[S.scene].set(t);
      if (S.scene === 'compass') {
        const camp = campAt(t);
        if (camp !== lastCamp && camp > 0 && !booting) S.prog = PROG.find((p) => p.camp === camp).id;
        lastCamp = camp;
      }
      paint();
    }
  });
  function setScene(sc) {
    // pause first: the pause reports the old rail value, which still belongs to the old scene
    stopAt = null; clock.pause();
    if (S.scene !== sc) { const v = CAM[sc]; stage.cam.yaw = v[0]; stage.cam.pitch = v[1]; }
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    const cf = SCENES[sc];
    clock.rate = cf.rate; clock.step = cf.step; clock.setMax(cf.max, true);
    lastCamp = campAt(S.ta);
    clock.set(cf.get());
  }
  function select(i) { S.sel = i; pickChips.set(PICKS.find(([, j]) => j === i)?.[0] ?? null, true); paint(); }

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const progChips = kit.chips($('progChips'), 'prog', (v) => { leave(); S.prog = v; paint(); });
  const bookChips = kit.chips($('bookChips'), 'book', (v) => { leave(); S.book = v === 'on'; if (!S.book && S.prog === 'book') S.prog = null; paint(); });
  const find = (q) => ROOTS.findIndex((R) => key(R.q) === key(q));
  const GOLDEN = [0, 0, 1, 0, -1, 1, 0, 1];
  const PICKS = [['one', find([2, 0, 0, 0, 0, 0, 0, 0])], ['i', find([0, 0, 2, 0, 0, 0, 0, 0])], ['hurwitz', find([1, 0, 1, 0, 1, 0, 1, 0])], ['golden', find(GOLDEN)], ['shrunk', 120 + TWO_I.findIndex((q) => key(q) === key(GOLDEN))], ['inner', find([0, 1, -1, 1, 1, 0, 0, 0])]];
  const pickChips = kit.chips($('pickChips'), 'pick', (v) => { leave(); const hit = PICKS.find(([n]) => n === v); if (hit) select(hit[1]); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('compass'); }, 2: () => { leave(); setScene('bridge'); } });
  // keep the programme chips in step with the selection
  const syncProg = () => progChips.set(S.prog && S.prog !== 'book' ? S.prog : null, true);

  /* ---------- experiment cards: scene, where the rail starts and stops, the still, and what else the card sets ---------- */
  const PRESETS = {
    cube: { scene: 'compass', book: false, prog: null, still: 0 },
    camps: { scene: 'compass', book: false, prog: null, from: 0, to: 4, still: 4 },
    crystal: { scene: 'compass', book: true, prog: 'book', still: 0 },
    icosians: { scene: 'bridge', sel: PICKS[2][1], from: 0, to: 1, still: 1 },
    e8: { scene: 'bridge', sel: PICKS[4][1], from: 1, to: 2, still: 2 },
    fold: { scene: 'bridge', sel: PICKS[3][1], from: 2, to: 4, still: 4 }
  };
  const NOTES = {
    cube: ['三根轴取自 §32.3：θ 从线（青）到面积（品红），η 从光滑到多面体，λ 从球外的点 C 到场内的观察者。八个点是 §32.4 的八家纲领，按总表原话落在各轴的三段之一（本书的诊断坐标）。', 'The three axes come from §32.3: θ runs from line (cyan) to area (magenta), η from smooth to polytope, λ from the outside point C to the observer inside. The eight dots are the eight programmes of §32.4, each in one of three bands of every axis according to the words of the table (the book\'s diagnostic coordinates).'],
    camps: ['时间轴逐个读四大阵营，每一对连成一条线，琥珀色是正在读的那一对：弦论与圈量子引力只在 η 上分开（光滑对多面体）；AdS/CFT 与扭量都贴着 λ 的球外一端；第三、第四阵营的两家在两三根轴上都不同。', 'The rail reads the four camps one by one and joins each pair with a line; the pair being read is amber. String theory and loop quantum gravity part only along η (smooth against polytope); AdS/CFT and twistors both sit at the outside end of λ; the two programmes of the third and fourth camps differ along two or three axes.'],
    crystal: ['画出本书给自己标的位置：θ 中段（几何积同时保留线与面积）、η 多面体一端、λ 场内一端。这是本书的诠释（MODEL），不是由八家纲领推出的结论。', 'The book\'s place for itself, drawn in: θ in the middle (the geometric product keeps line and area together), η at the polytope end, λ at the inside end. This is the book\'s reading (MODEL), not a conclusion derived from the eight programmes.'],
    icosians: ['二元二十面体群的 120 个单位四元数，去掉实部 w 投到三维，按 w 从 1 到 −1 一层层出现：1、12、20、12、30、12、20、12、1；实部为负的一半落在同样的位置，画成空心圈。琥珀圈是 (1 + i + j + k)/2：它那一层的 20 个位置围成实心的正十二面体，其余各层只画出棱。', 'The 120 unit quaternions of the binary icosahedral group, projected to three dimensions by dropping the real part w, appear shell by shell as w runs from 1 to −1: 1, 12, 20, 12, 30, 12, 20, 12, 1; the half with negative real part lands on the same places, drawn as open rings. The amber ring is (1 + i + j + k)/2: the 20 places of its shell enclose a solid dodecahedron, and the other shells are drawn by their edges.'],
    e8: ['再加上 120 个乘了 φ⁻¹ 的品红点：它们在 E∥ 里更短，Nrd = 2 − φ，Q = 2(a + b) 却仍是 2。青色与品红合起来 240 个，正是 E₈ 的根数。琥珀圈是 φ⁻¹(i + φ⁻¹j + φk)/2。', 'Add the 120 magenta points multiplied by φ⁻¹: shorter in E∥, with Nrd = 2 − φ, yet Q = 2(a + b) is still 2. Cyan and magenta together make 240, exactly the number of roots of E₈. The amber ring is φ⁻¹(i + φ⁻¹j + φk)/2.'],
    fold: ['只留实部为零的 60 个根，再把投影平面从 E∥ 转到 E⊥：青色的 30 个单位从外层落到内层，品红的 30 个从内层翻到外层，淡色的圈是它们在 E∥ 里的位置。琥珀圈是 (i + φ⁻¹j + φk)/2：‖∥‖² + ‖⊥‖² 始终是 2。', 'Keep the 60 roots with real part zero and turn the plane of projection from E∥ to E⊥: the 30 cyan units fall from the outer shell to the inner, the 30 magenta ones rise from the inner to the outer, and the faint rings are where they were in E∥. The amber ring is (i + φ⁻¹j + φk)/2: ‖∥‖² + ‖⊥‖² stays 2.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopAt = null; clock.pause();
    if (p.book != null) { S.book = p.book; bookChips.set(p.book ? 'on' : 'off', true); }
    if ('prog' in p) S.prog = p.prog;
    if (p.sel != null) select(p.sel);
    SCENES[p.scene].set(p.still);
    setScene(p.scene);
    if ('prog' in p) { S.prog = p.prog; syncProg(); }
    paint();
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed) || p.to == null) return;
    clock.set(p.from);
    if (id === 'camps') { S.prog = null; syncProg(); }
    stopAt = p.to < clock.max - 1e-9 ? p.to : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景；在“罗盘”里点一家纲领、用时间轴逐个读阵营；在“黄金桥”里用时间轴走折叠链，点一个点看它的精确坐标。随时可以再选一张卡。', 'Free play: switch scenes; in Compass pick a programme and read the camps along the rail; on the Bridge walk the chain along the rail and click a dot to see its exact coordinates. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.COMPASS_DEBUG = {
    get state() {
      const B = bridgeAt(S.tb);
      return {
        scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current,
        compass: { t: S.ta, camp: campAt(S.ta), prog: S.prog, book: S.book, programmes: PROG.map((p) => ({ id: p.id, camp: p.camp, c: p.c.slice() })), bookAt: BOOK.c.slice() },
        bridge: { t: S.tb, leg: B.leg, n: B.n, units: B.units, golden: B.golden, alpha: B.alpha, sel: S.sel, visible: B.vis.map((v, i) => (v ? i : -1)).filter((i) => i >= 0), pos: B.pos.map((p) => p.slice()) },
        roots: ROOTS.map((R) => ({ q: R.q.slice(), gold: R.gold, nrd: R.nrd.slice(), Q: R.Q, par: R.par.slice(), perp: R.perp.slice(), par2: R.par2, perp2: R.perp2, text: qtext(R.q) })),
        facts: JSON.parse(JSON.stringify(FACTS)),
        shells: SHELLS.map((sh) => ({ gold: sh.gold, w: sh.w, members: sh.members.slice(), count: sh.count,
          spaces: Object.fromEntries(['par', 'perp'].filter((k) => sh[k]).map((k) => [k, { pts: sh[k].pts.map((p) => p.slice()), name: sh[k].name && sh[k].name[1],
            hull: sh[k].hull && { V: sh[k].hull.V, E: sh[k].hull.E, F: sh[k].hull.F, sizes: Object.assign({}, sh[k].hull.sizes), faces: sh[k].hull.faces.map((f) => f.v.slice()) } }])) })),
        drawn: lastShells.map((s) => ({ gold: s.sh.gold, w: s.sh.w, space: s.space, solid: s.solid, poly: solidOf(s), edges: edgesOf(s) })),
        hud: $('hudBig').textContent, sub: $('hudSub').textContent, key: $('ro').querySelector('.key dd').textContent
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of a programme's dot, or of root i on the bridge, for pointer tests. */
    screen: (what) => {
      const b = $('cv').getBoundingClientRect(), w = typeof what === 'number' ? v3.scale(bridgeAt(S.tb).pos[what], DISP) : world(byId(what).c), q = stage.p(w);
      return [b.left + q[0], b.top + q[1]];
    },
    /** The world point where root i is drawn on the bridge now. */
    world: (i) => v3.scale(bridgeAt(S.tb).pos[i], DISP),
    camera: () => Object.assign({}, stage.cam)
  };
  window.TRV_THUMB = () => { applyPreset('e8'); cards.mark('e8'); clock.pause(); clock.set(2); paint.now(); };
  cards.pick(cards.initial('cube'));
  booting = false;
  paint();
})();
