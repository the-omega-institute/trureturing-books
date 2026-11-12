/* ORTHO//HAIRY · 毛球、环面与法向逃逸 · Hairy balls, tori and the normal escape
   One stage, four scenes, one rail each:
     sphere  the zonal field (−y, x, 0) with a +1 zero at each pole, deformed through the pull-back of the plane field
             f(u) = e^{iψ}(a − u)/(1 + a) under stereographic projection u = (x + iy)/(1 − z): the second zero climbs a
             meridian from the South Pole and merges at the North Pole into the dipole field
             w = (((1 − z)² − x² + y²)/2, −xy, x(1 − z)) with a single zero of index +2 (rail: t, a = tan(πt/2));
     torus   ((R + r cos θ) cos φ, (R + r cos θ) sin φ, r sin θ) with the unit field ê_φ = (−sin φ, cos φ, 0)
             (rail: an amber point once round the big circle);
     defect  the icosahedron cut into ν² triangles per face, vertices pushed onto the sphere, joined by flat triangles;
             the defect 2π − Σ angles at every vertex (rail: ν − 1);
     escape  the lifted field w̃_λ = (1 − λ) w + λ (1 + z)/2 · x (rail: λ).
   Every index is counted by winding along a small loop; every defect and every minimum is computed point by point.
   Read-only probe for the browser suite: window.HAIRY_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const wrap = (a) => a - TAU * Math.round(a / TAU);
  const NP = [0, 0, 1], SP = [0, 0, -1];
  const RBIG = 0.68;            // torus: radius of the big circle
  const NU_MAX = 6;             // finest subdivision on the rail
  const S = { scene: 'sphere', tube: 0.28, stop: null };

  /* ---------- the fields on the sphere ---------- */
  /** Dipole field: the pull-back of the constant plane field ∂u; tangent, of length 1 − z, zero only at N. */
  const dipole = (x) => [((1 - x[2]) ** 2 - x[0] * x[0] + x[1] * x[1]) / 2, -x[0] * x[1], x[0] * (1 - x[2])];
  /** The merging family at rail value t ∈ [0, 1]: zonal at t = 0, dipole at t = 1. */
  function merged(x, t) {
    if (t >= 1 - 1e-12) return dipole(x);
    const z = x[2];
    if (1 - z < 1e-12) return [0, 0, 0];
    const p = x[0] / (1 - z), q = x[1] / (1 - z), a = Math.tan(PI * t / 2), psi = -(PI / 2) * (1 - t);
    const fr = (a - p) / (1 + a), fi = -q / (1 + a), c = Math.cos(psi), s = Math.sin(psi);
    const f1 = c * fr - s * fi, f2 = s * fr + c * fi;
    const D = 1 + p * p + q * q, D2 = D * D;
    const dp = [2 * (D - 2 * p * p) / D2, -4 * p * q / D2, 4 * p / D2], dq = [-4 * p * q / D2, 2 * (D - 2 * q * q) / D2, 4 * q / D2];
    return [f1 * dp[0] + f2 * dq[0], f1 * dp[1] + f2 * dq[1], f1 * dp[2] + f2 * dq[2]];
  }
  /** The second zero of the merging family (on the +X meridian), or null once it has reached the North Pole. */
  function movingZero(t) {
    if (t >= 1 - 1e-12) return null;
    const a = Math.tan(PI * t / 2), d = 1 + a * a;
    return [2 * a / d, 0, (a * a - 1) / d];
  }
  /** Rail value that puts the moving zero at height z. */
  const tOfHeight = (z) => { z = clamp(z, -1, 1 - 1e-9); return 2 / PI * Math.atan(Math.sqrt((1 + z) / (1 - z))); };
  /** The lifted field. */
  const lifted = (x, lam) => v3.add(v3.scale(dipole(x), 1 - lam), v3.scale(x, lam * (1 + x[2]) / 2));

  /** Index of the tangent field F at the zero q: the winding of F along a small loop of angular radius eps. */
  function indexAt(F, q, eps, N = 360) {
    const e1 = v3.unit(v3.cross(q, Math.abs(q[2]) < 0.9 ? NP : [1, 0, 0])), e2 = v3.cross(q, e1);
    let tot = 0, prev = null;
    for (let i = 0; i <= N; i++) {
      const a = TAU * i / N, d = v3.add(v3.scale(e1, Math.cos(a)), v3.scale(e2, Math.sin(a)));
      const p = v3.add(v3.scale(q, Math.cos(eps)), v3.scale(d, Math.sin(eps))), w = F(p), ang = Math.atan2(v3.dot(w, e2), v3.dot(w, e1));
      if (prev != null) tot += wrap(ang - prev);
      prev = ang;
    }
    return Math.round(tot / TAU);
  }
  /** The zeros of the merging family at t, each with its counted index. */
  function sphereZeros(t) {
    const F = (x) => merged(x, t), m = movingZero(t), Z = [];
    const sep = m ? Math.acos(clamp(m[2], -1, 1)) : PI;
    const eps = Math.min(0.08, sep / 3);
    Z.push({ p: NP.slice(), name: 'N', index: indexAt(F, NP, eps) });
    if (m) Z.push({ p: m, name: 'moving', index: indexAt(F, m, eps) });
    return Z;
  }
  /** Largest |x·F(x)| over a grid: how far the field is from tangent (should be rounding error). */
  function tangencyError(F) {
    let worst = 0;
    for (let i = 1; i < 60; i++) for (let j = 0; j < 60; j++) { const x = v3.sph(PI * i / 60, TAU * j / 60); worst = Math.max(worst, Math.abs(v3.dot(x, F(x)))); }
    return worst;
  }

  /* ---------- arrow sites: a Fibonacci lattice on the sphere ---------- */
  const SITES = (() => {
    const n = 300, out = [], g = PI * (3 - Math.sqrt(5));
    for (let k = 0; k < n; k++) { const z = 1 - 2 * (k + 0.5) / n, r = Math.sqrt(1 - z * z); out.push([r * Math.cos(g * k), r * Math.sin(g * k), z]); }
    return out;
  })();

  /* ---------- the lifted field: its shortest arrow ---------- */
  /** Smallest ‖w̃_λ‖ over the sphere and the height z where it is reached (the norm depends on z only). */
  function liftMin(lam) {
    const norm = (z) => Math.hypot((1 - lam) * (1 - z), lam * (1 + z) / 2);
    let best = { z: -1, v: norm(-1) };
    for (let i = 0; i <= 2000; i++) { const z = -1 + i / 1000, v = norm(z); if (v < best.v) best = { z, v }; }
    let lo = Math.max(-1, best.z - 0.001), hi = Math.min(1, best.z + 0.001);
    for (let k = 0; k < 80; k++) { const a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3; if (norm(a) <= norm(b)) hi = b; else lo = a; }
    const z = (lo + hi) / 2;
    return norm(z) < best.v ? { z, v: norm(z) } : best;
  }

  /* ---------- the torus ---------- */
  const torusPoint = (th, ph, r) => [(RBIG + r * Math.cos(th)) * Math.cos(ph), (RBIG + r * Math.cos(th)) * Math.sin(ph), r * Math.sin(th)];
  const torusNormal = (th, ph) => [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), Math.sin(th)];
  const ePhi = (ph) => [-Math.sin(ph), Math.cos(ph), 0];
  const NPHI = 36, NTH = 14;
  const PHI0 = -2.95;           // where the amber point sets out (in front for the opening view)
  /** V − E + F of the drawn quad mesh (vertices, unique edges, faces). */
  function torusEuler() {
    const id = (i, j) => ((i + NPHI) % NPHI) * NTH + (j + NTH) % NTH, edges = new Set();
    let F = 0;
    for (let i = 0; i < NPHI; i++) for (let j = 0; j < NTH; j++) {
      const a = id(i, j), b = id(i + 1, j), c = id(i + 1, j + 1), d = id(i, j + 1);
      for (const [u, v] of [[a, b], [b, c], [c, d], [d, a]]) edges.add(u < v ? `${u}-${v}` : `${v}-${u}`);
      F++;
    }
    return { V: NPHI * NTH, E: edges.size, F };
  }
  const TORUS_EULER = torusEuler();
  /** Shortest ê_φ over a fine grid (it is a unit vector everywhere). */
  function torusMin() { let m = Infinity; for (let i = 0; i < 360; i++) m = Math.min(m, v3.len(ePhi(TAU * i / 360))); return m; }
  const TORUS_MIN = torusMin();

  /* ---------- geodesic domes ---------- */
  const ICO = (() => {
    const g = (1 + Math.sqrt(5)) / 2;
    const V = [[-1, g, 0], [1, g, 0], [-1, -g, 0], [1, -g, 0], [0, -1, g], [0, 1, g], [0, -1, -g], [0, 1, -g], [g, 0, -1], [g, 0, 1], [-g, 0, -1], [-g, 0, 1]].map(v3.unit);
    const F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
    return { V, F };
  })();
  const DOMES = {};
  function dome(nu) {
    if (DOMES[nu]) return DOMES[nu];
    const V = [], key = new Map(), T = [];
    const vid = (x) => { const u = v3.unit(x), k = u.map((c) => Math.round(c * 1e9)).join(','); if (!key.has(k)) { key.set(k, V.length); V.push(u); } return key.get(k); };
    for (const [ia, ib, ic] of ICO.F) {
      const A = ICO.V[ia], B = ICO.V[ib], C = ICO.V[ic], grid = [];
      for (let i = 0; i <= nu; i++) { grid.push([]); for (let j = 0; i + j <= nu; j++) grid[i].push(vid(v3.scale(v3.add(v3.add(v3.scale(A, i), v3.scale(B, j)), v3.scale(C, nu - i - j)), 1 / nu))); }
      for (let i = 0; i < nu; i++) for (let j = 0; i + j < nu; j++) {
        T.push([grid[i][j], grid[i + 1][j], grid[i][j + 1]]);
        if (i + j < nu - 1) T.push([grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]]);
      }
    }
    const angle = new Array(V.length).fill(0), deg = new Array(V.length).fill(0), E = new Set();
    for (const t of T) for (let k = 0; k < 3; k++) {
      const a = t[k], b = t[(k + 1) % 3], c = t[(k + 2) % 3];
      const u = v3.unit(v3.sub(V[b], V[a])), w = v3.unit(v3.sub(V[c], V[a]));
      angle[a] += Math.acos(clamp(v3.dot(u, w), -1, 1)); deg[a]++;
      E.add(a < b ? `${a}-${b}` : `${b}-${a}`);
    }
    const defect = angle.map((s) => TAU - s);
    const total = defect.reduce((s, d) => s + d, 0);
    const fivefold = defect.reduce((s, d, i) => s + (deg[i] === 5 ? d : 0), 0);
    let max = -Infinity, min = Infinity; for (const d of defect) { max = Math.max(max, d); min = Math.min(min, d); }
    DOMES[nu] = { nu, V, T, deg, defect, total, fivefold, max, min, E: E.size, F: T.length };
    return DOMES[nu];
  }
  const nuOf = (t) => 1 + clamp(Math.round(t), 0, NU_MAX - 1);

  /* ---------- drawing ---------- */
  const ARROW = 0.15;           // drawn length of a unit arrow
  function fieldArrows(st, F, s) {
    const D = st.facing();
    for (const x of SITES) {
      const w = F(x), n = v3.len(w);
      if (n < 1e-4 || (s.skip && s.skip.some((k) => v3.dot(x, k.q) > Math.cos(k.rho * 1.2)))) continue;
      const len = Math.min(0.26, ARROW * Math.sqrt(n)), front = v3.dot(x, D) >= 0, b = v3.add(x, v3.scale(w, len / n));
      st.arrow(x, b, { color: s.color || P.cyan, width: front ? 1.4 : 1, alpha: front ? 0.9 : 0.12, headSize: 5, fade: false });
      if (s.normal && front) {
        const k = v3.dot(w, x) * len / n;
        if (k > 0.004) st.line(x, v3.add(x, v3.scale(x, k)), { color: P.magenta, width: 1.7, alpha: 0.75, fade: false });
      }
    }
  }
  /** A small loop round the zero q of F (angular radius rho) with the field's direction drawn at 18 points on it. */
  function indexLoop(st, F, q, rho) {
    const e1 = v3.unit(v3.cross(q, Math.abs(q[2]) < 0.9 ? NP : [1, 0, 0])), e2 = v3.cross(q, e1), pts = [], front = v3.dot(q, st.facing()) >= 0;
    for (let i = 0; i <= 72; i++) { const a = TAU * i / 72; pts.push(v3.add(v3.scale(q, Math.cos(rho)), v3.scale(v3.add(v3.scale(e1, Math.cos(a)), v3.scale(e2, Math.sin(a))), Math.sin(rho)))); }
    st.path(pts, { color: P.magenta, width: 1.2, alpha: front ? 0.75 : 0.3, fade: false });
    for (let i = 0; i < 18; i++) {
      const x = pts[i * 4], w = F(x), n = v3.len(w);
      if (n < 1e-9) continue;
      st.arrow(x, v3.add(x, v3.scale(w, Math.min(0.17, rho * 0.55) / n)), { color: P.cyan, width: front ? 2.2 : 1.2, alpha: front ? 1 : 0.35, headSize: 6, fade: false });
    }
    return pts.reduce((b, x) => (st.p(x)[0] > st.p(b)[0] ? x : b), pts[0]);   // rightmost point: where the label goes
  }
  function zeroRing(st, p, key, label, s) {
    st.dot(p, 11, P.magenta, { ring: true, width: 2.6, fade: false, alpha: st.p(p)[2] >= 0 ? 1 : 0.45 });
    st.dot(p, 16, P.magenta, { ring: true, width: 1, fade: false, alpha: st.p(p)[2] >= 0 ? 0.45 : 0.2 });
    if (s && s.amber) st.dot(p, 4.5, P.amber, { glow: 12, fade: false });
    if (label) st.tag(key, p, label, 'raw c-mg', { dx: (s && s.dx) || 40, dy: (s && s.dy) || -14 });
  }

  function drawSphere(st) {
    const t = clock.t, F = (x) => merged(x, t);
    st.sphere(1, { lat: [0], lon: 0, shade: 0.08, alpha: 0.35 });
    st.arc(SP, [1, 0, 0], { color: P.dim, width: 1.1, dash: [3, 4], alpha: 0.6 });
    st.arc([1, 0, 0], NP, { color: P.dim, width: 1.1, dash: [3, 4], alpha: 0.6 });
    const Z = sphereZeros(t), m = movingZero(t), rho = Math.min(0.4, (m ? Math.acos(clamp(m[2], -1, 1)) : PI) * 0.42);
    fieldArrows(st, F, { skip: rho > 0.03 ? Z.map((z) => ({ q: z.p, rho })) : null });
    for (const z of Z) {
      const lab = `${z.index > 0 ? '+' : ''}${z.index}`, at = rho > 0.03 ? indexLoop(st, F, z.p, rho) : z.p;
      zeroRing(st, z.p, null, null, { amber: z.name !== 'N' });
      st.tag(z.name === 'N' ? 'zN' : 'zM', at, z.name === 'N' ? L(`北极 · 指标 ${lab}`, `North Pole · index ${lab}`) : L(`拖我 · 指标 ${lab}`, `drag me · index ${lab}`), 'raw c-mg', { dx: 96, dy: z.name === 'N' ? -10 : 10 });
    }
    return Z;
  }

  function drawTorus(st) {
    const r = S.tube, D = st.facing(), ph0 = PHI0 + TAU * clock.t, th0 = PI / 3;
    for (let i = 0; i < NPHI; i++) {
      const ph = TAU * i / NPHI, pts = []; for (let j = 0; j <= 48; j++) pts.push(torusPoint(TAU * j / 48, ph, r));
      st.path(pts, { color: P.lineHot, width: 0.6, alpha: 0.35, back: 0.35 });
    }
    for (let j = 0; j < 8; j++) {
      const th = TAU * j / 8, pts = []; for (let i = 0; i <= 96; i++) pts.push(torusPoint(th, TAU * i / 96, r));
      st.path(pts, { color: P.lineHot, width: 0.6, alpha: 0.35, back: 0.35 });
    }
    for (let i = 0; i < NPHI; i++) for (let j = 0; j < NTH; j++) {
      const ph = TAU * (i + 0.5 * (j % 2)) / NPHI, th = TAU * j / NTH, x = torusPoint(th, ph, r), front = v3.dot(torusNormal(th, ph), D) >= 0;
      st.arrow(x, v3.add(x, v3.scale(ePhi(ph), 0.1)), { color: P.cyan, width: front ? 1.4 : 1, alpha: front ? 0.9 : 0.2, headSize: 5, fade: false });
    }
    const x = torusPoint(th0, ph0, r), trail = [];
    for (let i = 0; i <= 96; i++) trail.push(torusPoint(th0, PHI0 + TAU * clock.t * i / 96, r));
    if (clock.t > 1e-6) st.path(trail, { color: P.amber, width: 1.6, alpha: 0.6, back: 0.35 });
    st.arrow(x, v3.add(x, v3.scale(ePhi(ph0), 0.26)), { color: P.amber, width: 2.6, glow: 10, headSize: 11, fade: false });
    st.dot(x, 5.5, P.amber, { glow: 12, fade: false });
    st.tag('tp', x, `|ê<sub>φ</sub>| = ${fix(v3.len(ePhi(ph0)), 2)}`, 'raw c-am', { dx: 54, dy: -18 });
  }

  function drawDefect(st) {
    const M = dome(nuOf(clock.t)), D = st.facing(), maxD = 60 * DEG;
    const faces = M.T.map((t) => { const c = v3.scale(v3.add(v3.add(M.V[t[0]], M.V[t[1]]), M.V[t[2]]), 1 / 3); return { t, c, f: v3.dot(c, D) }; });
    faces.sort((a, b) => a.f - b.f);
    for (const q of faces) {
      const pts = q.t.map((i) => M.V[i]);
      if (q.f < 0) st.poly(pts, { color: P.lineHot, strokeAlpha: 0.12, width: 0.6 });
      else st.poly(pts, { fill: P.cyan, alpha: 0.05 + 0.07 * q.f, color: P.lineHot, strokeAlpha: 0.55, width: 0.8 });
    }
    M.V.forEach((v, i) => {
      if (v3.dot(v, D) < -0.05) return;
      const r = 1.6 + 8 * Math.sqrt(Math.max(0, M.defect[i]) / maxD);
      st.dot(v, r, P.magenta, { alpha: 0.9, fade: false, glow: M.deg[i] === 5 ? 8 : 0 });
    });
    return M;
  }

  function drawEscape(st) {
    const lam = clock.t, F = (x) => lifted(x, lam), m = liftMin(lam);
    st.sphere(1, { lat: [0], lon: 0, shade: 0.08, alpha: 0.35 });
    // the tangent plane at the North Pole, seen edge-on the arrow stands out of it
    const h = 0.26, sq = [[-h, -h, 1], [h, -h, 1], [h, h, 1], [-h, h, 1]];
    st.poly(sq, { fill: P.dim, alpha: 0.22, color: P.dim, strokeAlpha: 0.6, width: 1 });
    if (m.v > 1e-9 && m.z > -1 + 1e-6 && m.z < 1 - 1e-6) st.circle([0, 0, m.z], NP, Math.sqrt(1 - m.z * m.z), { color: P.magenta, width: 1.4, dash: [4, 4], alpha: 0.7, back: 0.3 });
    fieldArrows(st, F, { normal: true });
    const wN = F(NP);
    if (v3.len(wN) > 1e-6) st.arrow(NP, v3.add(NP, v3.scale(wN, 0.42)), { color: P.amber, width: 2.8, glow: 12, headSize: 12, fade: false });
    st.dot(NP, 5, P.amber, { glow: 12, fade: false });
    st.tag('wN', NP, `|w̃(N)| = ${fix(v3.len(wN), 2)}`, 'raw c-am', { dx: 62, dy: -20 });
    if (lam < 1e-9) zeroRing(st, NP, 'zE', L('零点 · 指标 +2', 'zero · index +2'), { dx: -70, dy: -26 });
    if (lam > 1 - 1e-9) zeroRing(st, SP, 'zS', L('南极：又是零点', 'South Pole: a zero again'), { dx: 0, dy: 28 });
    return m;
  }

  function drawStage() {
    const st = stage;
    st.begin();
    let hudBig = '', hudSub = '', leg = [];
    if (S.scene === 'sphere') {
      const Z = drawSphere(st), sum = Z.reduce((s, z) => s + z.index, 0), m = movingZero(clock.t);
      hudBig = L(`球面 · 指标和 = ${sum}`, `Sphere · index sum = ${sum}`);
      hudSub = m ? L(`两个零点，各 +1；第二个离北极 ${fix(Math.acos(clamp(m[2], -1, 1)) / DEG, 0)}°`, `two zeros, +1 each; the second is ${fix(Math.acos(clamp(m[2], -1, 1)) / DEG, 0)}° from the North Pole`)
        : L('两个零点合成一个，指标 +2', 'the two zeros have merged into one of index +2');
      leg = [['cy', L('切向箭头', 'tangent arrows')], ['mg', L('零点（发旋）与绕它的小圈', 'zeros (whorls) and the loops round them')]];
      if (m) leg.push(['am', L('可拖动的那个零点', 'the zero you can drag')]);
    } else if (S.scene === 'torus') {
      drawTorus(st);
      hudBig = L('环面 · 零点 0 个', 'Torus · 0 zeros');
      hudSub = L(`箭头处处长 1：χ(T²) = ${TORUS_EULER.V - TORUS_EULER.E + TORUS_EULER.F}，不必留发旋`, `every arrow has length 1: χ(T²) = ${TORUS_EULER.V - TORUS_EULER.E + TORUS_EULER.F}, no whorl is needed`);
      leg = [['cy', L('单位切场 ê<sub>φ</sub>', 'unit tangent field ê<sub>φ</sub>')], ['am', L('当前的点与它的箭头', 'the current point and its arrow')]];
    } else if (S.scene === 'defect') {
      const M = drawDefect(st);
      hudBig = L(`角亏 · 每边切 ${M.nu} 段`, `Defect · ${M.nu} cuts per edge`);
      hudSub = L(`${M.V.length} 个顶点的角亏加起来 = ${fix(M.total / DEG, 2)}° = 4π`, `the defects of ${M.V.length} vertices add up to ${fix(M.total / DEG, 2)}° = 4π`);
      leg = [['box mg', L('顶点角亏（圆点面积）', 'vertex defect (dot area)')], ['cy', L('平的三角面', 'flat triangles')]];
    } else {
      const m = drawEscape(st), lam = clock.t;
      hudBig = L(`立起 · λ = ${fix(lam, 2)}`, `Stand up · λ = ${fix(lam, 2)}`);
      hudSub = m.v < 1e-6 ? (lam < 0.5 ? L('还贴在球面上：北极是零点', 'still lying on the sphere: the North Pole is a zero') : L('全部立直：南极成了零点', 'all the way up: the South Pole is a zero'))
        : L(`最短的箭头也有 ${fix(m.v, 3)}：处处不为零`, `even the shortest arrow is ${fix(m.v, 3)} long: nowhere zero`);
      leg = [['cy', L('抬起后的箭头 w̃', 'lifted arrows w̃')], ['mg', L('沿法向立起的部分', 'the part standing along the normal')], ['am', L('北极处的箭头', 'the arrow at the North Pole')], ['dm', L('北极的切平面', 'tangent plane at the North Pole')]];
    }
    st.end();
    $('hudBig').textContent = hudBig; $('hudSub').innerHTML = hudSub;
    $('legend').innerHTML = leg.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    if (S.scene === 'sphere') {
      const g = kit.plot($('plot'), { x: [0, 1], y: [-1.1, 1.15], pad: [42, 10, 8, 22] });
      g.axes({ yTicks: [[-1, L('南极', 'S')], [0, L('赤道', 'eq.')], [1, L('北极', 'N')]], xTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
      const pts = []; for (let i = 0; i <= 100; i++) { const m = movingZero(i / 100); pts.push([i / 100, m ? m[2] : 1]); }
      g.hline(1, P.magenta, { dash: [4, 3], alpha: 0.7 });
      g.line(pts, P.magenta, { width: 2.2 });
      const m = movingZero(clock.t);
      g.vline(clock.t, P.amber, { alpha: 0.8 }); g.dot(clock.t, m ? m[2] : 1, P.amber, 4);
      g.legend([[P.magenta, L('第二个零点的高度', 'height of the second zero')], [P.magenta, L('北极的零点', 'the zero at the North Pole'), 'dash']], { bottom: true });
      $('plotMeta').textContent = `z = ${fix(m ? m[2] : 1, 2)}`;
      $('plotTitle').innerHTML = '<span class="zh">零点往北爬，指标和不变</span><span class="en">The zero climbs north, the index sum stays</span>';
    } else if (S.scene === 'torus') {
      const g = kit.plot($('plot'), { x: [0, 1], y: [0, 1.2], pad: [38, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0'], [0.5, '½'], [1, '1']] });
      const sph = [], tor = []; for (let i = 0; i <= 100; i++) { sph.push([i / 100, Math.sin(PI * i / 100)]); tor.push([i / 100, v3.len(ePhi(TAU * i / 100))]); }
      g.line(sph, P.dim, { width: 1.4, dash: [4, 3] });
      g.line(tor, P.cyan, { width: 2.4 });
      g.vline(clock.t, P.amber, { alpha: 0.8 }); g.dot(clock.t, 1, P.amber, 4);
      g.legend([[P.cyan, L('环面：箭头长度', 'torus: arrow length')], [P.dim, L('球面纬向场：沿经线从南到北', 'sphere, zonal field: south to north'), 'dash']], { bottom: true });
      $('plotMeta').textContent = fix(1, 3);
      $('plotTitle').innerHTML = '<span class="zh">走一路，箭头长度从不缩成零</span><span class="en">All the way round, the arrow never shrinks to nothing</span>';
    } else if (S.scene === 'defect') {
      const g = kit.plot($('plot'), { x: [0.6, NU_MAX + 0.4], y: [0, 820], pad: [42, 10, 8, 22] });
      const xt = []; for (let k = 1; k <= NU_MAX; k++) xt.push([k, String(k)]);
      g.axes({ yTicks: [[0, '0°'], [360, '360°'], [720, '720°']], xTicks: xt });
      const tot = [], five = []; for (let k = 1; k <= NU_MAX; k++) { const M = dome(k); tot.push([k, M.total / DEG]); five.push([k, M.fivefold / DEG]); }
      g.line(tot, P.magenta, { width: 2.2 }); tot.forEach(([x, y]) => g.dot(x, y, P.magenta, 3.5));
      g.line(five, P.cyan, { width: 1.6 }); five.forEach(([x, y]) => g.dot(x, y, P.cyan, 3));
      const nu = nuOf(clock.t);
      g.vline(nu, P.amber, { alpha: 0.8 });
      g.legend([[P.magenta, L('全部顶点的角亏之和', 'sum of all vertex defects')], [P.cyan, L('其中十二个五重顶点的份额', 'share of the twelve five-fold vertices')]], { bottom: true });
      $('plotMeta').textContent = `${fix(dome(nu).total / DEG, 2)}°`;
      $('plotTitle').innerHTML = '<span class="zh">切得越细，角亏摊得越开，总和不动</span><span class="en">Finer cuts spread the defect, the total stays</span>';
    } else {
      const g = kit.plot($('plot'), { x: [0, 1], y: [0, 1.1], pad: [38, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
      const mn = [], nn = []; for (let i = 0; i <= 100; i++) { mn.push([i / 100, liftMin(i / 100).v]); nn.push([i / 100, v3.len(lifted(NP, i / 100))]); }
      g.line(mn, P.cyan, { width: 2.2 });
      g.line(nn, P.magenta, { width: 1.6, dash: [4, 3] });
      g.vline(clock.t, P.amber, { alpha: 0.8 }); g.dot(clock.t, liftMin(clock.t).v, P.amber, 4);
      g.legend([[P.cyan, L('球面上最短的箭头', 'shortest arrow on the sphere')], [P.magenta, L('北极处的箭头长度', 'length of the arrow at the North Pole'), 'dash']], { bottom: true });
      $('plotMeta').textContent = fix(liftMin(clock.t).v, 3);
      $('plotTitle').innerHTML = '<span class="zh">立起多少，最短的箭头就有多长</span><span class="en">How far up, and how short the shortest arrow</span>';
    }
  }

  /* ---------- readouts ---------- */
  function row(id, dt, dd) { $('dt' + id).innerHTML = dt; $('ro' + id).innerHTML = dd == null ? '' : dd; $('ro' + id).parentElement.hidden = dd == null; }
  function drawText() {
    let note = '', zeros = '—', sum = '—';
    if (S.scene === 'sphere') {
      const Z = sphereZeros(clock.t), s = Z.reduce((a, z) => a + z.index, 0), m = movingZero(clock.t);
      $('dtKey').textContent = L('零点指标之和', 'sum of the indices of the zeros');
      $('roKey').textContent = String(s); $('roKeySub').textContent = L(' = χ(S²)', ' = χ(S²)');
      $('roAside').textContent = clock.t >= 1 - 1e-12 ? L('偶极场', 'dipole field') : clock.t <= 1e-12 ? L('纬向场', 'zonal field') : L('中间的场', 'in between');
      row('A', L('零点个数', 'number of zeros'), String(Z.length));
      row('B', L('各零点的指标', 'index of each zero'), Z.map((z) => (z.name === 'N' ? L('北极 ', 'N ') : L('第二个 ', 'second ')) + (z.index > 0 ? '+' : '') + z.index).join(' · '));
      row('C', L('第二个零点离北极', 'second zero from the North Pole'), m ? `${fix(Math.acos(clamp(m[2], -1, 1)) / DEG, 1)}°` : L('已并入北极', 'merged into the pole'));
      row('D', L('箭头离切平面最多', 'largest departure from tangency'), tangencyError((x) => merged(x, clock.t)).toExponential(1).replace('-', '−'));
      note = m ? L('拖动琥珀色的零点或时间轴，把它往北推：两个零点越来越近，各自的指标不变。', 'Drag the amber zero or the rail to push it north: the two zeros close in, each keeping its index.')
        : L('两个 +1 合成了一个 +2：零点可以合并，却消不掉，指标和仍是 2。', 'Two +1 zeros have become one +2: zeros can merge but not disappear, and the sum is still 2.');
      zeros = String(Z.length); sum = String(s);
    } else if (S.scene === 'torus') {
      const e = TORUS_EULER;
      $('dtKey').textContent = L('最短的箭头', 'shortest arrow');
      $('roKey').textContent = fix(TORUS_MIN, 3); $('roKeySub').textContent = L(' 处处是单位长', ' unit length everywhere');
      $('roAside').textContent = `R = ${fix(RBIG, 2)} · r = ${fix(S.tube, 2)}`;
      row('A', L('零点个数', 'number of zeros'), '0');
      row('B', L('网格 V − E + F', 'mesh V − E + F'), `${e.V} − ${e.E} + ${e.F} = ${e.V - e.E + e.F}`);
      row('C', L('当前点绕大圈走了', 'current point round the big circle'), `${fix(360 * clock.t, 0)}°`);
      row('D', '', null);
      note = L('环面的欧拉示性数是 0，箭头可以一路顺着大圈走，不必在任何地方停下。', 'The torus has Euler characteristic 0: the arrows can run round the big circle without stopping anywhere.');
      zeros = '0'; sum = '0';
    } else if (S.scene === 'defect') {
      const M = dome(nuOf(clock.t));
      $('dtKey').textContent = L('顶点角亏之和', 'sum of the vertex defects');
      $('roKey').textContent = `${fix(M.total / DEG, 4)}°`; $('roKeySub').textContent = ' = 4π';
      $('roAside').textContent = `ν = ${M.nu}`;
      row('A', L('顶点 · 棱 · 面', 'vertices · edges · faces'), `${M.V.length} · ${M.E} · ${M.F}`);
      row('B', 'V − E + F', String(M.V.length - M.E + M.F));
      row('C', L('最大 / 最小角亏', 'largest / smallest defect'), `${fix(M.max / DEG, 2)}° / ${fix(M.min / DEG, 2)}°`);
      row('D', L('十二个五重顶点合计', 'the twelve five-fold vertices together'), `${fix(M.fivefold / DEG, 1)}°`);
      note = M.nu === 1 ? L('正二十面体：十二个顶点各缺 60°，合起来 720°。', 'The icosahedron: each of the twelve vertices lacks 60°, 720° in all.')
        : L(`顶点多了，每个缺得少了；${M.V.length} 个顶点的角亏仍然加成 720°。`, `More vertices, each lacking less; the defects of ${M.V.length} vertices still add up to 720°.`);
      zeros = '—'; sum = `${fix(M.total / DEG, 0)}°`;
    } else {
      const lam = clock.t, m = liftMin(lam);
      $('dtKey').textContent = L('球面上最短的箭头', 'shortest arrow on the sphere');
      $('roKey').textContent = fix(m.v, 3); $('roKeySub').textContent = m.v < 1e-6 ? L(' 有零点', ' there is a zero') : L(' 处处不为零', ' nowhere zero');
      $('roAside').textContent = `λ = ${fix(lam, 2)}`;
      row('A', L('北极处的箭头长度', 'length of the arrow at the North Pole'), fix(v3.len(lifted(NP, lam)), 3));
      row('B', L('最短的箭头在高度', 'the shortest arrows sit at height'), `z = ${fix(m.z, 2)}`);
      row('C', L('沿法向的那一份在北极', 'normal part at the North Pole'), fix(v3.dot(lifted(NP, lam), NP), 3));
      row('D', '', null);
      note = lam < 1e-9 ? L('λ = 0：箭头全贴在球面上，就是只在北极为零的偶极场。', 'λ = 0: all arrows lie on the sphere; this is the dipole field, zero only at the North Pole.')
        : lam > 1 - 1e-9 ? L('λ = 1：箭头全部沿法向朝外，长度 (1 + z)/2，到南极又缩成零。', 'λ = 1: every arrow points straight out with length (1 + z)/2, which shrinks to zero again at the South Pole.')
          : L('0 < λ < 1：贴着的部分与立起的部分互相垂直，两者不会同时为零，箭头处处不为零；但它已不是切向量。', '0 < λ < 1: the lying part and the standing part are perpendicular and never vanish together, so the arrow is nowhere zero; but it is no longer tangent.');
      zeros = m.v < 1e-6 ? '1' : '0'; sum = '—';
    }
    $('roNote').textContent = note;
    $('pillZeros').querySelector('strong').textContent = zeros;
    $('pillSum').querySelector('strong').textContent = sum;
    $('torusPanel').hidden = S.scene !== 'torus';
    $('howNote').textContent = {
      sphere: L('拖动琥珀色的零点（或时间轴）把它沿经线往北推；拖空白处转动球。', 'Drag the amber zero (or the rail) north along its meridian; drag empty space to turn the sphere.'),
      torus: L('时间轴让琥珀色的点绕大圈走；拖动滑块改变管的粗细；拖空白处转动环面。', 'The rail walks the amber point round the big circle; the slider changes the thickness of the tube; drag empty space to turn the torus.'),
      defect: L('时间轴是细分次数 ν：每个面切成 ν² 个小三角形；拖空白处转动。', 'The rail is the subdivision ν: each face is cut into ν² small triangles; drag empty space to turn.'),
      escape: L('时间轴是抬升量 λ：从贴在球面上（0）到完全沿法向（1）；拖空白处转动球。', 'The rail is the lift λ: from lying on the sphere (0) to pointing straight out (1); drag empty space to turn the sphere.')
    }[S.scene];
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const MAX = { sphere: 1, torus: 1, defect: NU_MAX - 1, escape: 1 };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.25, step: 0.1,
    format: (t) => (S.scene === 'sphere' ? (t >= 1 - 1e-12 ? L('零点已并入北极', 'zero merged at the pole') : L(`第二个零点高 z = ${fix(movingZero(t)[2], 2)}`, `second zero at z = ${fix(movingZero(t)[2], 2)}`))
      : S.scene === 'torus' ? L(`绕大圈 ${fix(360 * t, 0)}° <small>/ 360°</small>`, `round the big circle ${fix(360 * t, 0)}° <small>/ 360°</small>`)
        : S.scene === 'defect' ? L(`每边切 ${nuOf(t)} 段 <small>/ ${NU_MAX}</small>`, `${nuOf(t)} cuts per edge <small>/ ${NU_MAX}</small>`)
          : `λ = ${fix(t, 2)} <small>/ 1</small>`),
    onChange: (t) => {
      if (S.stop != null && clock.playing && t >= S.stop - 1e-12) { const s = S.stop; S.stop = null; clock.pause(); clock.set(s); return; }
      paint();
    }
  });
  const RATE = { sphere: 0.22, torus: 0.18, defect: 0.9, escape: 0.25 }, STEP = { sphere: 0.1, torus: 0.125, defect: 1, escape: 0.1 };
  function setScene(sc) {
    S.scene = sc; sceneChips.set(sc, true); S.stop = null;
    clock.pause(); clock.rate = RATE[sc]; clock.step = STEP[sc];
    clock.setMax(MAX[sc], true); clock.set(0);
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { cards.mark(null); setScene(v); paint(); });
  const fTube = kit.field($('tube'), { fmt: (v) => fix(v, 2), onInput: (v) => { cards.mark(null); S.tube = v; paint(); } });
  $('rew').addEventListener('click', () => { S.stop = null; clock.pause(); clock.set(0); });
  kit.keys({ 1: () => sceneChips.set('sphere'), 2: () => sceneChips.set('torus'), 3: () => sceneChips.set('defect'), 4: () => sceneChips.set('escape') });
  for (const id of ['now', 'play']) $(id).addEventListener('pointerdown', () => { S.stop = null; });

  // direct manipulation: drag the moving zero along its meridian
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: 0.4, onChange: () => paint(),
    onPick: (ev, st) => {
      if (S.scene !== 'sphere') return false;
      const m = movingZero(clock.t) || NP;
      if (st.near(ev, m) > 22) return false;
      cards.mark(null); S.stop = null; clock.pause();
      return true;
    },
    onDrag: (ev, st) => { const p = st.pick(ev), t = tOfHeight(p[2]); clock.set(t > 0.995 ? 1 : t); }
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    merge: { scene: 'sphere', view: [-0.9, 1.0], start: 0, play: true, still: 1 },
    torus: { scene: 'torus', view: [-0.5, 0.78, 1.22], start: 0, play: true, still: 0.3 },
    defect: { scene: 'defect', view: [-0.5, 0.35], start: 0, play: true, still: 3 },
    escape: { scene: 'escape', view: [-0.75, 0.3, 0.9], start: 0, play: true, stop: 0.5, still: 0.5 }
  };
  const NOTES = {
    merge: ['琥珀色的零点从南极沿经线爬到北极，箭头场跟着连续地变。到北极时两个 +1 合成一个指标 +2 的零点：箭头在它周围转两圈，别处一个零点也没有。', 'The amber zero climbs a meridian from the South Pole to the North Pole while the field changes continuously. At the pole the two +1 zeros become one zero of index +2: the arrows turn twice round it, and there is no zero anywhere else.'],
    torus: ['环面上的青色箭头都沿大圈的方向，长度处处为 1；琥珀色的点绕大圈走一周，它的箭头一刻也没有缩短，环面上没有品红的环。', 'On the torus every cyan arrow points along the big circle, with length 1 everywhere; the amber point goes once round, its arrow never shortening, and there is no magenta ring on the torus.'],
    defect: ['正二十面体的每个面切成 ν² 个平的三角形，顶点推到球面上。品红圆点的面积是那个顶点的角亏：点越来越多、越来越小，加起来始终是 720°。', 'Each face of the icosahedron is cut into ν² flat triangles and the vertices pushed out to the sphere. The area of each magenta dot is that vertex’s defect: the dots grow in number and shrink in size, and always add up to 720°.'],
    escape: ['偶极场的箭头沿外法向立起一半（λ = ½）：品红的短线是立起的部分，北极处琥珀色的箭头竖出切平面。最短的箭头在品红虚线那一圈，长度仍大于零，球面上不再有零点。', 'The arrows of the dipole field stand half-way up along the outward normal (λ = ½): the short magenta strokes are the standing part, and at the North Pole the amber arrow sticks out of the tangent plane. The shortest arrows lie on the dashed magenta circle and are still longer than zero: no zero is left on the sphere.'],
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    setScene(p.scene);
    if (booting || TRV.still) { stage.cam.yaw = p.view[0]; stage.cam.pitch = p.view[1]; stage.cam.zoom = p.view[2] || 1; } else stage.view(p.view, 600);
    clock.set(p.start);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed) || !p.play) clock.set(p.still);
    else { S.stop = p.stop == null ? null : p.stop; if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换一个场景，拖动零点或时间轴，转动球面与环面。随时可以再选一张卡。', 'Free play: change the scene, drag the zero or the rail, turn the sphere and the torus. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.HAIRY_DEBUG = {
    get state() {
      const base = { scene: S.scene, preset: cards.current, t: clock.t, max: clock.max, playing: clock.playing, stop: S.stop, yaw: stage.cam.yaw, pitch: stage.cam.pitch };
      if (S.scene === 'sphere') {
        const Z = sphereZeros(clock.t);
        return Object.assign(base, { zeros: Z.map((z) => ({ p: z.p.slice(), index: z.index })), indexSum: Z.reduce((s, z) => s + z.index, 0), moving: movingZero(clock.t) });
      }
      if (S.scene === 'torus') return Object.assign(base, { R: RBIG, r: S.tube, euler: Object.assign({}, TORUS_EULER), minLength: TORUS_MIN, phi: PHI0 + TAU * clock.t });
      if (S.scene === 'defect') {
        const M = dome(nuOf(clock.t));
        return Object.assign(base, { nu: M.nu, V: M.V.length, E: M.E, F: M.F, total: M.total, fivefold: M.fivefold, max: M.max, min: M.min,
          vertices: M.V.map((v) => v.slice()), defects: M.defect.slice(), triangles: M.T.map((t) => t.slice()) });
      }
      const m = liftMin(clock.t);
      return Object.assign(base, { lambda: clock.t, minLength: m.v, minHeight: m.z, north: lifted(NP, clock.t) });
    },
    /** The field the current scene draws, evaluated at a list of points (sphere: merging family, escape: lifted). */
    field: (pts) => pts.map((x) => (S.scene === 'escape' ? lifted(x, clock.t) : merged(x, clock.t))),
    /** The torus field at angles (θ, φ): [point, arrow]. */
    torus: (th, ph) => [torusPoint(th, ph, S.tube), ePhi(ph)],
    seek: (t) => { S.stop = null; clock.pause(); clock.set(t); },
    /** Push the rail forward while it plays, keeping the card's stop point (for the suite on slow machines). */
    advance: (t) => { if (clock.playing) clock.set(Math.max(clock.t, t)); },
    /** Viewport coordinates of a world point. */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; }
  };
  window.TRV_THUMB = () => { cards.pick('merge'); setScene('sphere'); stage.cam.yaw = -0.9; stage.cam.pitch = 0.62; clock.set(0.62); paint.now(); };
  cards.pick(cards.initial('merge'));
  booting = false;
  paint();
})();
