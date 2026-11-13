/* ORTHO//CAUSAL: necessity without time, in four scenes on one sphere and two in the plane.
   window  unit vectors A, B, C: given A·B = cos θ₁ and B·C = cos θ₂, A·C = c₁c₂ + s₁s₂ cos φ lies in
           [cos(θ₁ + θ₂), cos(θ₁ − θ₂)]; det G = (s₁ s₂ sin φ)² is the squared volume they span
   pages   a clock with N positions and one qubit: N page states drawn at once; conditioning picks one
   field   the gradient flow of V = 1 − cos α on the sphere: V(0) − V(t) = ∫ |ẋ|² dt
   line    amplitude amplification among N = 2ⁿ candidates: the angle to the target axis grows by 2θ per step
   sos     random 2-CNF formulas closed under resolution: every resolvent of two 2-clauses has at most two literals;
           beside it a schematic line c·n for the order at which Lasserre / SoS relaxations of random 3-XOR stay consistent
   wild    one autonomous field F = g(ỹ)(1, h′(x)) + (1 − g(ỹ)) F_swirl, ỹ = y − h(x): the thread ỹ = 0 is invariant,
           probes are integrated by one RK4 stepper
   Read-only probe for the browser suite: window.CAUSAL_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, Z = [0, 0, 1];
  const S = { scene: 'window', th1: 60, th2: 45, wish: null, N: 12, tilt: 35, alpha0: 150, n: 8, M: 8, eps: 0.15, user: null };
  const sci = (x) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); return Math.abs(e) < 3 ? x.toPrecision(3) : `${m.toFixed(1)}×10${String(e).replace('-', '−').split('').map((c) => ({ '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }[c])).join('')}`; };

  /* ---------- window ---------- */
  function gram(phiDeg) {
    const t1 = S.th1 * DEG, t2 = S.th2 * DEG, ph = phiDeg * DEG, c1 = Math.cos(t1), c2 = Math.cos(t2), s1 = Math.sin(t1), s2 = Math.sin(t2);
    const A = v3.sph(t1, 0), C = v3.sph(t2, ph), cAC = v3.dot(A, C);
    return { A, B: Z, C, c1, c2, s1, s2, cAC, det: 1 - c1 * c1 - c2 * c2 - cAC * cAC + 2 * c1 * c2 * cAC, vol: Math.abs(v3.dot(A, v3.cross(Z, C))), lo: Math.cos(t1 + t2), hi: Math.cos(t1 - t2), angle: Math.acos(kit.clamp(cAC, -1, 1)) / DEG };
  }
  /** det G for an arbitrary third cosine x (negative outside the window: no such vectors). */
  const detFor = (x) => { const g = gram(0); return g.s1 * g.s1 * g.s2 * g.s2 - (x - g.c1 * g.c2) ** 2; };

  /* ---------- pages: a finite Page–Wootters book ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  function book() {
    const N = S.N, ax = v3.sph(S.tilt * DEG, 0), step = kit.TAU / N, r = [], psi = [[[1, 0], [0, 0]]];
    for (let j = 0; j < N; j++) r.push(v3.rot(Z, ax, step * j));
    // U' = e^{iπ/N}(cos(π/N) − i sin(π/N) n·σ): the page turn as a 2 × 2 matrix whose N-th power is exactly the identity
    const c = Math.cos(Math.PI / N), s = Math.sin(Math.PI / N), ph = [Math.cos(Math.PI / N), Math.sin(Math.PI / N)];
    const U = [[[c, -s * ax[2]], [-s * ax[1], -s * ax[0]]], [[s * ax[1], -s * ax[0]], [c, s * ax[2]]]].map((row) => row.map((z) => cmul(ph, z)));
    const apply = (v) => [cadd(cmul(U[0][0], v[0]), cmul(U[0][1], v[1])), cadd(cmul(U[1][0], v[0]), cmul(U[1][1], v[1]))];
    for (let j = 1; j < N; j++) psi.push(apply(psi[j - 1]));
    // ‖(T ⊗ U' − 1)Ψ‖ for Ψ = N^{-1/2} Σ |j⟩ ⊗ ψ_j: every page must be U' applied to the page before it, around the clock
    let res = 0;
    for (let j = 0; j < N; j++) { const w = apply(psi[(j + N - 1) % N]); res += (w[0][0] - psi[j][0][0]) ** 2 + (w[0][1] - psi[j][0][1]) ** 2 + (w[1][0] - psi[j][1][0]) ** 2 + (w[1][1] - psi[j][1][1]) ** 2; }
    const bloch = psi.map((v) => { const x = cmul([v[0][0], -v[0][1]], v[1]); return [2 * x[0], 2 * x[1], v[0][0] ** 2 + v[0][1] ** 2 - v[1][0] ** 2 - v[1][1] ** 2]; });
    return { N, ax, r, bloch, residual: Math.sqrt(res / N), overlap: (i, j) => (1 + v3.dot(r[i], r[j])) / 2 };
  }

  /* ---------- field: gradient flow of V = 1 − cos α ---------- */
  const TF = 6;
  const alphaAt = (a0, t) => 2 * Math.atan(Math.tan(a0 / 2) * Math.exp(-t));
  function flow(t) {
    const a0 = S.alpha0 * DEG, a = alphaAt(a0, t), n = 200; let sum = 0;
    for (let i = 0; i <= n; i++) { const w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2; sum += w * Math.sin(alphaAt(a0, t * i / n)) ** 2; }
    return { a0, a, V0: 1 - Math.cos(a0), V: 1 - Math.cos(a), diss: sum * t / (3 * n), speed: Math.sin(a) };
  }
  const SEEDS = []; for (let i = 0; i < 40; i++) SEEDS.push([Math.acos(1 - 2 * (i + 0.5) / 40), i * 2.399963229728653]);

  /* ---------- line: amplitude amplification ---------- */
  function grover(n) { const N = Math.pow(2, n), th = Math.asin(1 / Math.sqrt(N)), tstar = Math.max(0, Math.round(Math.PI / (4 * th) - 0.5)); return { n, N, th, tstar, tmax: Math.min(2 * tstar + 2, 140), prob: (t) => Math.sin((2 * t + 1) * th) ** 2 }; }

  /* ---------- order: the resolution closure of 2-CNF formulas ---------- */
  const ORD = { lo: 4, hi: 60, every: 4, c: 0.25 };
  /** A small seeded generator (mulberry32), so that every reader sees the same formulas. */
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  /** Random 2-CNF on n variables with 2n clauses; literal l is variable l >> 1, negated when l & 1. */
  function formula(n) { const r = rng(7919 * n + 13), cl = []; for (let i = 0; i < 2 * n; i++) { const a = Math.floor(r() * 2 * n); let b; do b = Math.floor(r() * 2 * n); while (b >> 1 === a >> 1); cl.push(a < b ? [a, b] : [b, a]); } return cl; }
  /** Close the formula under resolution and count the clauses by width; the empty clause means it is unsatisfiable. */
  function closure(n) {
    const seen = new Map(), byLit = Array.from({ length: 2 * n }, () => []), queue = [], width = [0, 0, 0, 0];
    let empty = false;
    const add = (c) => { const key = c.length === 0 ? 'e' : c.join(','); if (seen.has(key)) return; seen.set(key, c); width[Math.min(3, c.length)]++; if (c.length === 0) { empty = true; return; } c.forEach((l) => byLit[l].push(c)); queue.push(c); };
    formula(n).forEach(add);
    while (queue.length) {
      const c = queue.shift();
      for (const l of c) for (const d of byLit[l ^ 1].slice()) {
        const lits = [...new Set([...c.filter((x) => x !== l), ...d.filter((x) => x !== (l ^ 1))])].sort((x, y) => x - y);
        if (lits.some((x) => lits.includes(x ^ 1))) continue;   // a tautology tells nothing
        add(lits);
      }
    }
    return { n, clauses: formula(n), size: seen.size, width, widest: width[3] ? 3 : width[2] ? 2 : width[1] ? 1 : 0, empty };
  }
  const CLOSE = new Map(), closed = (n) => { if (!CLOSE.has(n)) CLOSE.set(n, closure(n)); return CLOSE.get(n); };
  const ordN = (t) => Math.min(ORD.hi, Math.max(ORD.lo, ORD.every * Math.round(t / ORD.every)));

  /* ---------- wilderness: one autonomous field, a thread and vortices ---------- */
  const WL = { L: 6, A: 0.35, w: 0.9, k: Math.PI / 1.5, q: Math.PI / 1.6, U: 1.4, T: 8, dt: 0.01 };
  const hW = (x) => WL.A * Math.sin(WL.w * x), dhW = (x) => WL.A * WL.w * Math.cos(WL.w * x);
  /** F(x, y) = g(ỹ)(1, h′(x)) + (1 − g(ỹ)) F_swirl, with F_swirl from the stream function ψ = U sin(k(x + 0.75)) sin²(qỹ), zero on ỹ = 0. */
  function fieldW(x, y) {
    const yt = y - hW(x), g = Math.exp(-yt * yt / (S.eps * S.eps)), s = Math.sin(WL.q * yt), c = Math.cos(WL.q * yt), sk = Math.sin(WL.k * (x + 0.75)), ck = Math.cos(WL.k * (x + 0.75));
    const u = WL.U * 2 * WL.q * sk * s * c, v = -WL.U * WL.k * ck * s * s, hp = dhW(x);
    return [g + (1 - g) * u, g * hp + (1 - g) * (hp * u + v)];
  }
  /** One classical Runge–Kutta step of the same field for every probe. */
  function rk4(p, h) {
    const k1 = fieldW(p[0], p[1]), k2 = fieldW(p[0] + h / 2 * k1[0], p[1] + h / 2 * k1[1]), k3 = fieldW(p[0] + h / 2 * k2[0], p[1] + h / 2 * k2[1]), k4 = fieldW(p[0] + h * k3[0], p[1] + h * k3[1]);
    return [p[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), p[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])];
  }
  /** Integrate from a start (x, ỹ₀) until t = T, or until the probe reaches the target column x = L. */
  function probe(x0, yt0) {
    const pts = [[x0, hW(x0) + yt0]]; let arrive = null;
    for (let i = 1; i <= Math.round(WL.T / WL.dt); i++) { const p = rk4(pts[i - 1], WL.dt); pts.push(p); if (p[0] >= WL.L) { arrive = i * WL.dt; break; } }
    return { x0, yt0, on: yt0 === 0, pts, arrive };
  }
  const OFF = [0.25, -0.4, 0.6];
  let probesKey = '', probesVal = null;
  function probes() {
    const key = `${S.eps}|${S.user ? S.user.join(',') : ''}`;
    if (key !== probesKey) { probesKey = key; probesVal = [probe(0, 0), ...OFF.map((d) => probe(0, d))]; if (S.user) probesVal.push(Object.assign(probe(S.user[0], S.user[1]), { user: true })); }
    return probesVal;
  }
  /** Where a probe is at time t (it stays on the target once it has arrived). */
  const probeAt = (pr, t) => pr.pts[Math.min(pr.pts.length - 1, Math.round(t / WL.dt))];
  const ytOf = (p) => p[1] - hW(p[0]);

  /* ---------- scenes ---------- */
  const SC = {
    window: { max: () => 360, rate: 50, step: 15, start: () => 70, view: 'iso', name: ['窗口', 'WINDOW'] },
    pages: { max: () => S.N, rate: 2, step: 1, start: () => 3, view: 'iso', name: ['书页', 'PAGES'] },
    field: { max: () => TF, rate: 0.8, step: 0.5, start: () => 1.5, view: 'iso', name: ['场', 'FIELD'] },
    line: { max: () => grover(S.n).tmax, rate: 4, step: 1, start: () => 3, view: 'front', name: ['线', 'THREAD'] },
    sos: { max: () => ORD.hi, rate: 8, step: ORD.every, start: () => 24, view: 'front', name: ['阶', 'ORDER'], flat: true },
    wild: { max: () => WL.T, rate: 1.2, step: 0.5, start: () => 3, view: 'front', name: ['荒野', 'WILDERNESS'], flat: true }
  };
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.4 : 0.33, cy: 0.52,
    onChange: () => paint(),
    onPick: (ev, st) => { if (SC[S.scene].flat) { if (flatPick(ev)) { leave(); return true; } return false; } return S.scene === 'window' && st.near(ev, gram(clock.t).C) < 24; },
    onDrag: (ev, st) => { if (SC[S.scene].flat) { flatPick(ev); return; } const q = st.pick(ev); S.th2 = Math.round(Math.acos(kit.clamp(q[2], -1, 1)) / DEG); fTh2.set(S.th2); S.wish = null; cards.mark(null); clock.pause(); clock.set(((Math.atan2(q[1], q[0]) / DEG) + 360) % 360); }
  });

  function drawWindow(st, c) {
    const g = gram(clock.t), { A, B, C } = g;
    // where C may go: the circle about B; its nearest and farthest points from A are the edges of the window
    st.circle([0, 0, g.c2], Z, g.s2, { color: P.amber, width: 1.2, alpha: 0.75, dash: [4, 4], back: 0.4 });
    st.dot(v3.sph(S.th2 * DEG, 0), 4, P.sigma, { ring: true }); st.dot(v3.sph(S.th2 * DEG, Math.PI), 4, P.sigma, { ring: true });
    // the solid they span: three faces at the origin and the far triangle; it flattens when they are coplanar
    for (const [u, w] of [[A, B], [B, C], [A, C]]) st.poly([[0, 0, 0], u, w], { fill: P.violet, alpha: 0.13 });
    st.poly([A, B, C], { fill: P.violet, alpha: 0.2, color: P.violet, strokeAlpha: 0.7 });
    st.arc(A, B, { color: P.cyan, width: 2.4 }); st.arc(B, C, { color: P.magenta, width: 2.4 }); st.arc(A, C, { color: P.amber, width: 2.4 });
    st.arrow([0, 0, 0], A, { color: P.cyan, width: 2, headSize: 10 }); st.arrow([0, 0, 0], B, { color: P.sigma, width: 2, headSize: 10 }); st.arrow([0, 0, 0], C, { color: P.amber, width: 2.4, glow: 10, headSize: 11, fade: false });
    st.dot(C, 5.5, P.amber, { glow: 12, fade: false });
    st.tag('A', v3.scale(A, 1.12), 'A', 'cy'); st.tag('B', v3.scale(B, 1.12), 'B', 'ink'); st.tag('C', v3.scale(C, 1.13), 'C', 'hot');
    // each angle label sits just outside the middle of its own arc; when the arcs are short and meet near B (as on the
    // IMPOSSIBLE card: C at an edge of the window, the three coplanar, the A–C arc running through B) the labels would
    // pile up on B, so θ₁ moves towards A, θ₂ towards C, and the A–C angle goes just inside the amber arc
    const m1 = v3.scale(v3.slerp(A, B, 0.5), 1.13), m2 = v3.scale(v3.slerp(B, C, 0.5), 1.13), mac = v3.scale(v3.slerp(A, C, 0.5), 1.15);
    const sB = st.p(B), dist = (u, w) => { const a = st.p(u), b = st.p(w); return Math.hypot(a[0] - b[0], a[1] - b[1]); };
    const side = (u) => Math.sign(st.p(u)[0] - sB[0]) || 1, crowded = g.vol < 1e-3 && (dist(m1, m2) < 90 || dist(mac, B) < 45);
    st.tag('t1', m1, `θ₁ ${S.th1}°`, 'num c-cy', crowded ? { dx: 22 * side(A) } : undefined);
    st.tag('t2', m2, `θ₂ ${S.th2}°`, 'num c-mg', crowded ? { dx: 22 * side(C) } : undefined);
    st.tag('ac', crowded ? v3.scale(v3.slerp(A, C, 0.5), 0.84) : mac, `${fix(g.angle, 0)}°`, 'num c-am', crowded ? { dx: 18 * side(C) } : undefined);
    $('hudBig').textContent = `A·C = ${sgn(g.cAC, 3)}`;
    $('hudSub').textContent = g.vol < 1e-3 ? L('C 贴在窗边：三根向量共面，体积为零', 'C is at the edge of the window: the three vectors are coplanar and the volume is zero')
      : L(`只能落在 [${sgn(g.lo, 3)}, ${sgn(g.hi, 3)}] 里；三根向量撑开的体积 ${fix(g.vol, 3)}`, `It can only lie in [${sgn(g.lo, 3)}, ${sgn(g.hi, 3)}]; the three vectors span a volume of ${fix(g.vol, 3)}`);
  }
  function drawPages(st) {
    const bk = book(), j = Math.floor(clock.t + 1e-9) % bk.N, f = clock.t - Math.floor(clock.t + 1e-9);
    st.line(v3.scale(bk.ax, -1.15), v3.scale(bk.ax, 1.15), { color: P.violet, width: 1.2, dash: [5, 4], alpha: 0.9, back: 0.45 });
    st.circle(v3.scale(bk.ax, v3.dot(bk.ax, Z)), bk.ax, Math.sin(S.tilt * DEG), { color: P.cyan, width: 1.2, alpha: 0.7, back: 0.35 });
    bk.r.forEach((r, i) => { st.line([0, 0, 0], r, { color: P.cyan, width: 1, alpha: i === j ? 0 : 0.35, back: 0.4 }); st.dot(r, i === j ? 0 : 4, P.cyan); if (bk.N <= 16 || i % 2 === 0) st.tag(`p${i}`, v3.scale(r, 1.12), String(i), 'num'); });
    const head = v3.unit(v3.slerp(bk.r[j], bk.r[(j + 1) % bk.N], kit.clamp(f, 0, 1)));
    st.arrow([0, 0, 0], bk.r[j], { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false }); st.dot(bk.r[j], 6, P.amber, { glow: 14, fade: false });
    st.dot(head, 9, P.amber, { ring: true, width: 1.6, fade: false });
    st.tag('ax', v3.scale(bk.ax, 1.25), L('翻页轴', 'paging axis'), 'raw c-vi');
    $('hudBig').textContent = L(`读头在第 ${j} 页 · 共 ${bk.N} 页`, `READING PAGE ${j} OF ${bk.N}`);
    $('hudSub').textContent = L('所有页一直都在；移动的只有读头', 'Every page is there all along; only the reading head moves');
  }
  function drawField(st) {
    const F = flow(clock.t), t = clock.t;
    for (const [a0, ph] of SEEDS) {
      const a = alphaAt(a0, t), pts = []; for (let i = 0; i <= 14; i++) pts.push(v3.sph(a0 + (a - a0) * i / 14, ph));
      st.path(pts, { color: P.cyan, width: 1, alpha: 0.5, back: 0.3 }); st.dot(v3.sph(a, ph), 2.6, P.cyan);
    }
    const hp = 0.6, pts = []; for (let i = 0; i <= 40; i++) pts.push(v3.sph(F.a0 + (F.a - F.a0) * i / 40, hp));
    st.path(pts, { color: P.amber, width: 2.4, back: 0.4 }); st.dot(v3.sph(F.a0, hp), 4, P.sigma, { ring: true }); st.dot(v3.sph(F.a, hp), 6, P.amber, { glow: 14, fade: false });
    st.dot(Z, 7, P.sigma, { ring: true, width: 2 }); st.dot([0, 0, -1], 6, P.dim, { ring: true, width: 2 });
    st.tag('tg', [0, 0, 1.14], L('目标', 'target'), 'raw ink'); st.tag('sg', [0, 0, -1.14], L('场为零', 'field is zero'), 'raw');
    $('hudBig').textContent = `t = ${fix(t, 2)} · α = ${fix(F.a / DEG, 1)}°`;
    $('hudSub').textContent = L(`从 ${S.alpha0}° 顺着坡度走；此刻的速度 sin α = ${fix(F.speed, 3)}`, `Following the slope from ${S.alpha0}°; the speed right now is sin α = ${fix(F.speed, 3)}`);
  }
  function drawLine(st) {
    const G = grover(S.n), t = clock.t, ang = (u) => (2 * u + 1) * G.th, at = (u) => [Math.cos(ang(u)), 0, Math.sin(ang(u))];
    st.circle([0, 0, 0], [0, 1, 0], 1, { color: P.cyan, width: 1.4, alpha: 0.8, back: 0.5 });
    st.line([0, 0, 0], [1.15, 0, 0], { color: P.dim, width: 1.2 }); st.line([0, 0, 0], [0, 0, 1.15], { color: P.sigma, width: 1.4 });
    for (let u = 0; u <= Math.floor(t + 1e-9); u++) st.dot(at(u), G.tmax > 40 ? 2 : 3.2, P.cyan, { fade: false });
    const k = Math.floor(t + 1e-9), arcp = []; for (let i = 0; i <= 12; i++) arcp.push(v3.scale(at(Math.max(0, k - 1) + (t - Math.max(0, k - 1)) * i / 12), 1.0));
    if (t > 0) st.path(arcp, { color: P.amber, width: 3, fade: false });
    st.arrow([0, 0, 0], at(t), { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false }); st.dot(at(t), 5.5, P.amber, { glow: 12, fade: false });
    st.tag('w', [0, 0, 1.15], L('目标', 'target'), 'raw ink', { dx: 40, dy: 10 }); st.tag('r', [1.3, 0, 0], L('其余', 'the rest'), 'raw');
    if (!TRV.thumbMode) st.tag('th', v3.scale(at(t), 1.18), `${fix(ang(t) / DEG, 1)}°`, 'num c-am');
    $('hudBig').textContent = L(`第 ${k} 步 · 命中概率 ${fix(G.prob(t), 3)}`, `STEP ${k} · SUCCESS PROBABILITY ${fix(G.prob(t), 3)}`);
    $('hudSub').textContent = L(`每步只能向目标转 2θ = ${fix(2 * G.th / DEG, 2)}°；N = ${G.N} 时约需 ${G.tstar} 步`, `Each step turns only 2θ = ${fix(2 * G.th / DEG, 2)}° towards the target; with N = ${G.N} it takes about ${G.tstar} steps`);
  }
  /* the plane scenes share the canvas: the sphere stage is cleared, then kit.plot draws into the free box under the HUD */
  let flat = null;
  const box = () => {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    return TRV.thumbMode ? { top: 26, bottom: 26 } : { top: Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10, bottom: Math.max(18, $('legend').offsetHeight + 20) };
  };
  const tag = (key, x, y, html, cls, o) => stage.tag(key, [flat.X(x) + ((o && o.dx) || 0), flat.Y(y) + ((o && o.dy) || 0)], html, cls, { screen: true });
  function drawOrder(st) {
    const n = ordN(clock.t), b = box(), top = 17;
    const g = flat = kit.plot($('cv'), { x: [0, ORD.hi + 4], y: [0, top], pad: [44, 24, b.top, b.bottom + 22] });
    g.axes({ yTicks: [0, 2, 4, 8, 12, 16], xTicks: [4, 12, 20, 28, 36, 44, 52, 60], xLabel: L('变量数 n', 'variables n'), yLabel: L('阶', 'order') });
    const cn = (x) => ORD.c * x, line = [[0, 0], [ORD.hi + 4, cn(ORD.hi + 4)]];
    g.poly([[0, 0], ...line.slice(1), [ORD.hi + 4, 0]], P.magenta, { alpha: 0.07 });
    g.line(line, P.magenta, { width: 2, dash: [6, 4] });
    g.hline(2, P.cyan, { width: 2, alpha: 0.9 });
    for (let m = ORD.lo; m <= ORD.hi; m += ORD.every) { if (m > n) continue; const k = closed(m); g.dot(m, k.widest, P.cyan, TRV.thumbMode ? 7 : 4.5, k.empty ? {} : { ring: true, width: 1.8 }); }
    g.hline(S.M, P.amber, { width: 1.6, dash: [3, 3], alpha: 0.9 }); g.vline(n, P.amber, { alpha: 0.6 });
    g.dot(n, cn(n), P.magenta, 4.5); g.dot(n, S.M, P.amber, 6, { glow: 12 });
    if (!TRV.thumbMode) {
      tag('o2', ORD.hi + 4, 2, L('2-SAT：消解后仍是两元', '2-SAT: resolvents stay two-literal'), 'raw c-cy', { dx: -96, dy: -13 });
      tag('o3', ORD.hi - 16, cn(ORD.hi - 16), L('3-XOR：阶 c·n 内仍相容（示意）', '3-XOR: consistent below order c·n (schematic)'), 'raw c-mg', { dx: -70, dy: -16 });
      tag('oM', 2, S.M, `M = ${S.M}`, 'raw c-am', { dx: 26, dy: -11 });
    }
    const below = S.M < cn(n);
    $('hudBig').textContent = L(`n = ${n} · 观察者的阶 M = ${S.M}`, `n = ${n} · OBSERVER'S ORDER M = ${S.M}`);
    $('hudSub').textContent = below ? L('两元的推理在阶 2 闭合；三元奇偶在阶 M 处仍处处相容（示意）', 'Two-literal reasoning closes at order 2; three-literal parity still looks consistent at order M (schematic)')
      : L('M 已高过示意线 c·n；文献只给出 Ω(n) 的下界，不给出这条线的斜率', 'M is above the schematic line c·n; the literature gives an Ω(n) lower bound, not the slope of this line');
  }
  function drawWild(st) {
    const t = clock.t, b = box(), prs = probes();
    const g = flat = kit.plot($('cv'), { x: [-0.45, WL.L + 0.45], y: [-1.9, 1.9], pad: [16, 16, b.top, b.bottom], equal: true });
    // the vortices: closed level sets of ψ in every cell above and below the thread
    for (let j = 0; j < 5; j++) for (const sg of [1, -1]) for (const lev of [0.12, 0.4, 0.75]) {
      const xc = 1.5 * j, up = [], dn = [];
      for (let i = 0; i <= 60; i++) { const x = xc - 0.75 + 1.5 * i / 60, sk = Math.abs(Math.sin(WL.k * (x + 0.75))); if (sk < lev) continue; const y1 = Math.asin(Math.sqrt(lev / sk)) / WL.q; up.push([x, hW(x) + sg * y1]); dn.push([x, hW(x) + sg * (Math.PI / WL.q - y1)]); }
      if (up.length > 1) g.line([...up, ...dn.reverse(), up[0]], P.magenta, { width: 1, alpha: 0.32 });
    }
    // the channel |ỹ| < ε and the thread y = h(x)
    const band = []; for (let i = 0; i <= 120; i++) { const x = -0.45 + (WL.L + 0.9) * i / 120; band.push([x, hW(x) + S.eps]); }
    for (let i = 120; i >= 0; i--) { const x = -0.45 + (WL.L + 0.9) * i / 120; band.push([x, hW(x) - S.eps]); }
    g.poly(band, P.cyan, { alpha: 0.1 });
    const th = []; for (let i = 0; i <= 120; i++) { const x = -0.45 + (WL.L + 0.9) * i / 120; th.push([x, hW(x)]); } g.line(th, P.cyan, { width: 1.4, alpha: 0.75 });
    g.dot(0, hW(0), P.sigma, 6, { ring: true, width: 2 }); g.dot(WL.L, hW(WL.L), P.sigma, 9, { ring: true, width: 2.4 });
    for (const pr of prs) {
      const k = Math.min(pr.pts.length - 1, Math.round(t / WL.dt)), path = pr.pts.slice(0, k + 1);
      g.line(path, pr.on ? P.cyan : P.magenta, { width: pr.on ? 3 : 2, alpha: 0.95 });
      g.dot(pr.pts[0][0], pr.pts[0][1], pr.on ? P.cyan : P.magenta, 3);
      g.dot(path[k][0], path[k][1], P.amber, TRV.thumbMode ? 8 : 5.5, { glow: 12 });
    }
    if (!TRV.thumbMode) {
      tag('s0', 0, hW(0), 'S₀', 'raw ink', { dx: -16, dy: 14 }); tag('st', WL.L, hW(WL.L), 'S*', 'raw ink', { dx: 6, dy: -20 });
      tag('hx', 4.6, hW(4.6), 'y = h(x)', 'raw c-cy', { dy: 24 });
    }
    const w = prs[0], wp = probeAt(w, t), trapped = prs.slice(1).filter((pr) => Math.abs(pr.yt0) > S.eps && pr.arrive == null).length, outside = prs.slice(1).filter((pr) => Math.abs(pr.yt0) > S.eps).length;
    $('hudBig').textContent = L(`t = ${fix(t, 2)} · 见证探针 x = ${fix(Math.min(wp[0], WL.L), 2)}`, `t = ${fix(t, 2)} · WITNESS PROBE AT x = ${fix(Math.min(wp[0], WL.L), 2)}`);
    $('hudSub').textContent = L(`同一个场：丝上的探针直达 S*；通道外出发的 ${outside} 根有 ${trapped} 根被涡旋卷住`, `One field: the probe on the thread runs to S*; of the ${outside} probes started outside the channel, ${trapped} are caught by the vortices`);
  }
  /** Pointer on a plane scene: in ORDER it sets M, in WILDERNESS it drops a probe (snapped onto the thread within a few pixels). */
  function flatPick(ev) {
    if (!flat) return false;
    const r = $('cv').getBoundingClientRect(), px = ev.clientX - r.left, py = ev.clientY - r.top, x = flat.invX(px), y = flat.invY(py);
    if (px < flat.pl || px > flat.pl + flat.iw || py < flat.pt || py > flat.pt + flat.ih) return false;
    if (S.scene === 'sos') { S.M = kit.clamp(Math.round(y), 2, 16); fOrd.set(S.M); paint(); return true; }
    const xs = kit.clamp(x, -0.4, WL.L - 0.2); let yt = y - hW(xs); if (Math.abs(flat.Y(hW(xs)) - py) < 5) yt = 0;
    S.user = [xs, kit.clamp(yt, -1.55, 1.55)]; clock.pause(); clock.set(0); paint(); return true;
  }
  function drawStage() {
    const st = stage;
    if (SC[S.scene].flat) { st.begin(); (S.scene === 'sos' ? drawOrder : drawWild)(st); st.end(); return; }
    flat = null;
    const c = st.begin();
    st.sphere(1, { lat: [0], lon: 2 });
    ({ window: drawWindow, pages: drawPages, field: drawField, line: drawLine })[S.scene](st, c);
    st.end();
  }

  /* ---------- plots ---------- */
  function drawPlots() {
    const A = $('plotA'), B = $('plotB'), t = clock.t;
    if (S.scene === 'window') {
      const g = gram(t), mx = Math.max(0.05, g.s1 * g.s1 * g.s2 * g.s2), pl = kit.plot(A, { x: [-1, 1], y: [-mx * 0.9, mx * 1.25], pad: [38, 10, 10, 22] });
      pl.axes({ yTicks: [[0, '0'], [mx, fix(mx, 2)]], xTicks: [[-1, '−1'], [g.lo, fix(g.lo, 2)], [g.hi, fix(g.hi, 2)], [1, '1']] });
      pl.rect(g.lo, 0, g.hi, mx * 1.25, P.cyan, { alpha: 0.1 }); pl.rect(-1, -mx * 0.9, g.lo, 0, P.warn, { alpha: 0.12 }); pl.rect(g.hi, -mx * 0.9, 1, 0, P.warn, { alpha: 0.12 });
      const inside = [], out1 = [], out2 = []; for (let i = 0; i <= 200; i++) { const x = -1 + i / 100, d = detFor(x); (x < g.lo ? out1 : x > g.hi ? out2 : inside).push([x, Math.max(d, -mx * 0.9)]); }
      pl.hline(0, P.lineHot); pl.line(out1, P.warn, { dash: [4, 3] }); pl.line(out2, P.warn, { dash: [4, 3] }); pl.line(inside, P.cyan, { width: 2 });
      if (S.wish != null && (S.wish < g.lo - 1e-9 || S.wish > g.hi + 1e-9)) { pl.vline(S.wish, P.warn); pl.dot(S.wish, Math.max(detFor(S.wish), -mx * 0.9), P.warn, 5); }
      pl.vline(g.cAC, P.amber, { alpha: 0.8 }); pl.dot(g.cAC, g.det, P.amber, 5, { glow: 10 });
      $('pATitle').textContent = L('体积² 随 A·C 的变化', 'Volume² against A·C'); $('pAMeta').textContent = `det G = ${sgn(g.det, 3)}`;
      const p2 = kit.plot(B, { x: [0, 360], y: [-1.1, 1.1], pad: [38, 10, 10, 22] });
      p2.axes({ yTicks: [[-1, '−1'], [g.lo, fix(g.lo, 2)], [g.hi, fix(g.hi, 2)], [1, '1']], xTicks: [[0, '0°'], [90, '90°'], [180, '180°'], [270, '270°'], [360, '360°']] });
      p2.rect(0, g.lo, 360, g.hi, P.cyan, { alpha: 0.1 });
      const cv = []; for (let i = 0; i <= 180; i++) cv.push([2 * i, gram(2 * i).cAC]); p2.line(cv, P.amber, { width: 1.8 }); p2.vline(t, P.amber, { alpha: 0.7 }); p2.dot(t, g.cAC, P.amber, 5, { glow: 10 });
      $('pBTitle').textContent = L('C 绕 B 转一圈', 'C once around B'); $('pBMeta').textContent = `φ = ${fix(t, 0)}°`;
    } else if (S.scene === 'pages') {
      const bk = book(), j = Math.floor(t + 1e-9) % bk.N, pl = kit.plot(A, { x: [-0.6, bk.N - 0.4], y: [-1.15, 1.15], pad: [30, 10, 10, 22] });
      pl.axes({ yTicks: [-1, 0, 1], xTicks: bk.r.map((_, i) => i).filter((i) => bk.N <= 12 || i % 2 === 0) });
      pl.hline(0, P.lineHot); bk.r.forEach((r, i) => { pl.rect(i - 0.3, 0, i + 0.3, r[2], i === j ? P.amber : P.cyan, { alpha: i === j ? 0.95 : 0.55 }); });
      $('pATitle').textContent = L('每一页的 ⟨Z⟩，同时都在', '⟨Z⟩ on every page, all at once'); $('pAMeta').textContent = L(`第 ${j} 页：${sgn(bk.r[j][2], 3)}`, `page ${j}: ${sgn(bk.r[j][2], 3)}`);
      const p2 = kit.plot(B, { x: [0, bk.N], y: [0, bk.N], pad: [12, 12, 8, 8], equal: true });
      let lowest = 1; for (let b = 0; b < bk.N; b++) lowest = Math.min(lowest, bk.overlap(0, b));
      for (let a = 0; a < bk.N; a++) for (let b = 0; b < bk.N; b++) p2.rect(b, bk.N - 1 - a, b + 1, bk.N - a, P.cyan, { alpha: 0.08 + 0.84 * (bk.overlap(a, b) - lowest) / Math.max(1e-9, 1 - lowest) });
      p2.rect(0, bk.N - 1 - j, bk.N, bk.N - j, P.amber, { fill: false, stroke: P.amber, width: 1.4 }); p2.rect(j, 0, j + 1, bk.N, P.amber, { fill: false, stroke: P.amber, width: 1.4 });
      $('pBTitle').textContent = L('页与页的重叠', 'Overlap between pages'); $('pBMeta').textContent = L('只依赖页码之差', 'depends only on the difference');
    } else if (S.scene === 'field') {
      const F0 = flow(0), pl = kit.plot(A, { x: [0, TF], y: [0, Math.max(0.2, F0.V0 * 1.18)], pad: [34, 10, 10, 22] });
      pl.axes({ yTicks: [[0, '0'], [F0.V0, fix(F0.V0, 2)]], xTicks: [0, 1, 2, 3, 4, 5, 6] });
      const vs = [], ds = []; for (let i = 0; i <= 60; i++) { const u = TF * i / 60, f = flow(u); vs.push([u, f.V]); ds.push([u, f.diss]); }
      pl.area(vs, P.cyan, { alpha: 0.12 }); pl.line(vs, P.cyan); pl.line(ds, P.magenta); pl.hline(F0.V0, P.amber, { dash: [4, 3] });
      const F = flow(t); pl.vline(t, P.amber, { alpha: 0.7 }); pl.dot(t, F.V, P.cyan, 4.5); pl.dot(t, F.diss, P.magenta, 4.5);
      pl.legend([[P.cyan, L('势能 V', 'potential V')], [P.magenta, L('已耗散 ∫|ẋ|²', 'dissipated ∫|ẋ|²')], [P.amber, L('两者之和', 'their sum'), 'dash']]);
      $('pATitle').textContent = L('降下的势能 = 走过的耗散', 'Potential lost = dissipation paid'); $('pAMeta').textContent = `${fix(F.V0 - F.V, 4)} = ${fix(F.diss, 4)}`;
      const p2 = kit.plot(B, { x: [0, TF], y: [0, 180], pad: [34, 10, 10, 22] });
      p2.axes({ yTicks: [[0, '0°'], [90, '90°'], [180, '180°']], xTicks: [0, 1, 2, 3, 4, 5, 6] });
      for (const a0 of [30, 60, 90, 120, 150, 170]) { const cv = []; for (let i = 0; i <= 60; i++) cv.push([TF * i / 60, alphaAt(a0 * DEG, TF * i / 60) / DEG]); p2.line(cv, P.cyan, { width: 1, alpha: 0.55 }); }
      const hv = []; for (let i = 0; i <= 60; i++) hv.push([TF * i / 60, alphaAt(S.alpha0 * DEG, TF * i / 60) / DEG]); p2.line(hv, P.amber, { width: 2 }); p2.vline(t, P.amber, { alpha: 0.7 }); p2.dot(t, F.a / DEG, P.amber, 4.5);
      $('pBTitle').textContent = L('从哪里出发都流向目标', 'From anywhere, it flows to the target'); $('pBMeta').textContent = `α = ${fix(F.a / DEG, 1)}°`;
    } else if (S.scene === 'sos') {
      const n = ordN(t), k = closed(n), pl = kit.plot(A, { x: [-0.6, 3.6], y: [0, Math.max(...k.width) * 1.15 + 1], pad: [38, 10, 10, 22] });
      pl.axes({ yTicks: [[0, '0'], [Math.max(...k.width), String(Math.max(...k.width))]], xTicks: [[0, L('空', 'empty')], [1, '1'], [2, '2'], [3, '≥ 3']] });
      k.width.forEach((c, w) => { if (c) pl.rect(w - 0.32, 0, w + 0.32, c, w === 0 ? P.magenta : P.cyan, { alpha: 0.75 }); });
      $('pATitle').textContent = L('推出的子句按宽度', 'Derived clauses by width'); $('pAMeta').textContent = L(`n = ${n}：共 ${k.size} 条`, `n = ${n}: ${k.size} in all`);
      const pts = [], cap = []; for (let m = ORD.lo; m <= ORD.hi; m += ORD.every) { pts.push([m, closed(m).size]); cap.push([m, 2 * m * (2 * m - 1) / 2 + 2 * m]); }
      const p2 = kit.plot(B, { x: [ORD.lo, ORD.hi], y: [0, cap[cap.length - 1][1] * 1.05], pad: [44, 10, 10, 22] });
      p2.axes({ yTicks: [0, 2000, 4000, 6000], xTicks: [4, 20, 36, 52], xLabel: 'n' });
      p2.line(cap, P.dim, { dash: [4, 3] }); p2.line(pts, P.cyan, { width: 2 }); pts.forEach((q) => p2.dot(q[0], q[1], P.cyan, 2.6)); p2.vline(n, P.amber, { alpha: 0.7 }); p2.dot(n, k.size, P.amber, 5);
      p2.legend([[P.cyan, L('推出的子句', 'clauses derived')], [P.dim, L('两元子句的总数', 'all two-literal clauses'), 'dash']], { right: false });
      $('pBTitle').textContent = L('闭包有多大', 'How large the closure gets'); $('pBMeta').textContent = L('至多 n 的平方级', 'at most of order n²');
    } else if (S.scene === 'wild') {
      const prs = probes(), pl = kit.plot(A, { x: [0, WL.T], y: [0, 1.65], pad: [34, 10, 10, 22] });
      pl.axes({ yTicks: [[0, '0'], [S.eps, 'ε'], [1.6, '1.6']], xTicks: [0, 2, 4, 6, 8] });
      pl.hline(S.eps, P.cyan, { dash: [4, 3], alpha: 0.8 });
      for (const pr of prs) pl.line(pr.pts.map((q, i) => [i * WL.dt, Math.abs(ytOf(q))]), pr.on ? P.cyan : P.magenta, { width: pr.on ? 2.4 : 1.4 });
      pl.vline(t, P.amber, { alpha: 0.7 });
      $('pATitle').textContent = L('离丝多远', 'Distance from the thread'); $('pAMeta').textContent = `|ỹ|`;
      const p2 = kit.plot(B, { x: [0, WL.T], y: [-0.6, WL.L + 0.4], pad: [34, 10, 10, 22] });
      p2.axes({ yTicks: [[0, '0'], [WL.L, 'S*']], xTicks: [0, 2, 4, 6, 8] }); p2.hline(WL.L, P.sigma, { dash: [4, 3] });
      for (const pr of prs) p2.line(pr.pts.map((q, i) => [i * WL.dt, q[0]]), pr.on ? P.cyan : P.magenta, { width: pr.on ? 2.4 : 1.4 });
      p2.vline(t, P.amber, { alpha: 0.7 });
      $('pBTitle').textContent = L('沿 x 走了多远', 'How far along x'); $('pBMeta').textContent = `x(t)`;
    } else {
      const G = grover(S.n), pl = kit.plot(A, { x: [0, G.tmax], y: [0, 1.08], pad: [30, 10, 10, 22] });
      pl.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0'], [G.tstar, `t* = ${G.tstar}`], [G.tmax, String(G.tmax)]] });
      const pr = [], bl = []; for (let i = 0; i <= 200; i++) { const u = G.tmax * i / 200; pr.push([u, G.prob(u)]); bl.push([u, Math.min(1, (u + 1) / G.N)]); }
      pl.line(bl, P.magenta, { dash: [5, 3] }); pl.line(pr, P.cyan, { width: 2 }); pl.vline(G.tstar, P.sigma, { dash: [2, 3], alpha: 0.7 }); pl.vline(t, P.amber, { alpha: 0.7 }); pl.dot(t, G.prob(t), P.amber, 5, { glow: 10 });
      pl.legend([[P.cyan, L('沿线转动', 'turning along the thread')], [P.magenta, L('逐个试', 'trying one by one'), 'dash']], { right: false, bottom: G.tstar < 4 });
      $('pATitle').textContent = L('命中概率随步数', 'Success probability by step'); $('pAMeta').textContent = `P = ${fix(G.prob(t), 3)}`;
      const p2 = kit.plot(B, { x: [2, 12], y: [1, 4096], logY: true, pad: [38, 10, 10, 22] });
      p2.axes({ yTicks: [[1, '1'], [10, '10'], [100, '100'], [1000, '1000']], xTicks: [2, 4, 6, 8, 10, 12], xLabel: 'n' });
      const a = [], b = []; for (let n = 2; n <= 12; n++) { a.push([n, Math.max(1, grover(n).tstar)]); b.push([n, Math.pow(2, n) / 2]); }
      p2.line(b, P.magenta, { dash: [5, 3] }); p2.line(a, P.cyan, { width: 2 }); a.forEach((q) => p2.dot(q[0], q[1], P.cyan, 2.6)); p2.vline(S.n, P.amber, { alpha: 0.7 }); p2.dot(S.n, Math.max(1, G.tstar), P.amber, 5);
      p2.legend([[P.magenta, 'N/2', 'dash'], [P.cyan, '(π/4)√N']], { right: false });
      $('pBTitle').textContent = L('需要多少步', 'How many steps it takes'); $('pBMeta').textContent = `N = ${G.N}`;
    }
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const t = clock.t, set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    let what = '', key = '';
    if (S.scene === 'window') {
      const g = gram(t), bad = S.wish != null && (S.wish < g.lo - 1e-9 || S.wish > g.hi + 1e-9);
      $('roKeyL').textContent = L('三根向量撑开的体积的平方 det G', 'det G, the squared volume the three span');
      $('roKey').innerHTML = `${sgn(g.det, 4)} ≥ 0 ✓`; $('roKeySub').textContent = '(sin θ₁ · sin θ₂ · sin φ)²';
      set(1, 'A·B = cos θ₁', sgn(g.c1, 4)); set(2, 'B·C = cos θ₂', sgn(g.c2, 4)); set(3, 'A·C', `<span class="c-am">${sgn(g.cAC, 4)}</span>`); set(4, L('窗口', 'the window'), `[${sgn(g.lo, 3)}, ${sgn(g.hi, 3)}]`);
      $('roNote').innerHTML = bad ? L(`<b class="c-wn">指定的 A·C = ${sgn(S.wish, 2)} 在窗口之外</b>：那里 det G = ${sgn(detFor(S.wish), 3)} 为负，没有三根单位向量能同时给出这三个余弦。C 停在最近的窗边。`, `<b class="c-wn">The requested A·C = ${sgn(S.wish, 2)} is outside the window</b>: there det G = ${sgn(detFor(S.wish), 3)} is negative, and no three unit vectors give these three cosines together. C stays at the nearest edge.`)
        : g.vol < 1e-3 ? L('贴上窗边：三根向量落在同一个平面里，A·C 等于 cos(θ₁ ∓ θ₂)。', 'At the edge of the window: the three vectors lie in one plane and A·C equals cos(θ₁ ∓ θ₂).')
          : L('前两条余弦一旦给定，第三条就被关在窗口里；窗口里取哪一点，由 C 绕 B 的转角决定。', 'Once the first two cosines are given the third is confined to the window; where in the window it falls is set by the angle of C about B.');
      what = `θ₁ ${S.th1}° · θ₂ ${S.th2}°`; key = `det G ${sgn(g.det, 3)}`;
    } else if (S.scene === 'pages') {
      const bk = book(), j = Math.floor(t + 1e-9) % bk.N;
      $('roKeyL').textContent = L('把时钟拨一格、系统转一格之后，整本书的变化', 'change of the whole book after one tick of clock and system');
      $('roKey').innerHTML = `${sci(bk.residual)} = 0 ✓`; $('roKeySub').textContent = '‖(T ⊗ U − 1)Ψ‖';
      set(1, L('读头所在的页', 'page under the head'), `${j} / ${bk.N}`); set(2, L('这一页的权重', 'weight of this page'), `1/${bk.N} = ${fix(1 / bk.N, 4)}`);
      set(3, L('这一页的态 (x, y, z)', 'state on this page (x, y, z)'), bk.r[j].map((x) => fix(x, 2)).join(', ')); set(4, L('与下一页的重叠', 'overlap with the next page'), fix(bk.overlap(j, (j + 1) % bk.N), 4));
      $('roNote').textContent = L('整本书在“拨一格”之下不变，它没有哪一页是“现在”。对时钟读数条件化，才得到读头下面那一页。', 'The whole book is unchanged by a tick, and no page of it is “now”. Only conditioning on the clock reading gives the page under the head.');
      what = `N = ${bk.N}`; key = L(`第 ${j} 页`, `page ${j}`);
    } else if (S.scene === 'field') {
      const F = flow(t);
      $('roKeyL').textContent = L('降下的势能 与 走过的耗散', 'potential lost and dissipation paid');
      $('roKey').innerHTML = `${fix(F.V0 - F.V, 5)} = ${fix(F.diss, 5)} ✓`; $('roKeySub').textContent = 'V(0) − V(t) = ∫₀ᵗ |ẋ|² ds';
      set(1, L('到目标的角度 α', 'angle α to the target'), `${fix(F.a / DEG, 2)}°`); set(2, L('势能 V = 1 − cos α', 'potential V = 1 − cos α'), fix(F.V, 5));
      set(3, L('速度 |ẋ| = sin α', 'speed |ẋ| = sin α'), fix(F.speed, 4)); set(4, L('流过的时间 t', 'flow time t'), fix(t, 2));
      $('roNote').textContent = L('场在每一点都给出方向，所以不需要知道路线。它只在两处为零：目标，和目标正对面的那个不稳定点。', 'The field gives a direction at every point, so no route needs to be known. It vanishes at two places only: the target, and the unstable point exactly opposite it.');
      what = `α₀ = ${S.alpha0}°`; key = `α ${fix(F.a / DEG, 1)}°`;
    } else if (S.scene === 'sos') {
      const n = ordN(t), k = closed(n), cn = ORD.c * n;
      $('roKeyL').textContent = L('两元子句消解后最宽的子句', 'the widest clause that resolution of 2-clauses derives');
      $('roKey').innerHTML = `${k.widest} <small>${L('个文字', 'literals')}</small>`; $('roKeySub').textContent = L(`n = ${n}，${2 * n} 条随机子句，推出 ${k.size} 条`, `n = ${n}, ${2 * n} random clauses, ${k.size} derived`);
      set(1, L('变量数 n', 'variables n'), String(n)); set(2, L('两元闭包的结论', 'what the two-literal closure decides'), k.empty ? L('推出空子句：不可满足', 'derives the empty clause: unsatisfiable') : L('无空子句：可满足', 'no empty clause: satisfiable'));
      set(3, L('观察者的阶 M', 'the observer\'s order M'), `<span class="c-am">${S.M}</span>`); set(4, L('示意线 c·n（c = 1/4）', 'schematic line c·n (c = 1/4)'), fix(cn, 1));
      $('roNote').textContent = L('两条两元子句消去一个变量，剩下的至多两个文字，所以闭包永远停在阶 2，并在 n² 级的子句里判定可满足性。随机 3-XOR / 3-SAT 没有这样的闭合：文献证明阶 o(n) 的 Lasserre / 平方和松弛仍高概率相容。品红的直线只是示意斜率；这些下界不推出 P ≠ NP。', 'Two 2-clauses that eliminate a variable leave at most two literals, so the closure stays at order 2 and decides satisfiability among order n² clauses. Random 3-XOR / 3-SAT has no such closure: the literature proves that Lasserre / sum-of-squares relaxations of order o(n) stay consistent with high probability. The magenta line only shows a schematic slope; these lower bounds do not imply P ≠ NP.');
      what = `n = ${n}`; key = `M ${S.M}`;
    } else if (S.scene === 'wild') {
      const prs = probes(), w = prs[0], wp = probeAt(w, t), off = prs.slice(1).filter((pr) => Math.abs(pr.yt0) > S.eps);
      let dev = 0; for (const q of w.pts) dev = Math.max(dev, Math.abs(ytOf(q)));
      $('roKeyL').textContent = L('丝上出发的探针离丝的最大距离 max|ỹ|', 'largest distance max|ỹ| of the probe started on the thread');
      $('roKey').innerHTML = sci(dev); $('roKeySub').textContent = L(`同一个 RK4 积分器，步长 ${WL.dt}`, `the same RK4 stepper, step ${WL.dt}`);
      set(1, L('时间 t', 'time t'), fix(t, 2)); set(2, L('见证探针到达 S*', 'witness probe reaches S*'), w.arrive == null ? '—' : `t = ${fix(w.arrive, 2)}`);
      set(3, L('通道外出发、到达 S* 的', 'started outside the channel and reached S*'), `<span class="c-mg">${off.filter((pr) => pr.arrive != null).length} / ${off.length}</span>`); set(4, L('通道半宽 ε', 'half-width ε of the channel'), fix(S.eps, 2));
      $('roNote').textContent = L('只有一个场。在丝上 g(ỹ) = 1、F_swirl = 0，场恰好是丝的切向 (1, h′(x))，所以 ỹ = 0 是不变的；离开通道，涡旋那一半占了上风，探针在格子里打转。这是示意模型：它画出“有线无场”的图景，不是复杂度下界。', 'There is only one field. On the thread g(ỹ) = 1 and F_swirl = 0, so the field is exactly the tangent (1, h′(x)) of the thread and ỹ = 0 is invariant; away from the channel the swirling half takes over and the probes circle in their cells. This is a schematic model: it draws the picture of “a thread without a field”, not a complexity lower bound.');
      what = `ε = ${fix(S.eps, 2)}`; key = `t ${fix(t, 1)}`;
    } else {
      const G = grover(S.n), k = Math.floor(t + 1e-9);
      $('roKeyL').textContent = L('每一步向目标转过的角度 2θ', 'the angle 2θ turned towards the target per step');
      $('roKey').innerHTML = `${fix(2 * G.th / DEG, 3)}°`; $('roKeySub').textContent = `sin θ = 1/√N, N = 2^${G.n} = ${G.N}`;
      set(1, L('已走步数', 'steps taken'), String(k)); set(2, L('命中概率 sin²((2t + 1)θ)', 'success probability sin²((2t + 1)θ)'), fix(G.prob(t), 4));
      set(3, L('大约需要 (π/4)√N', 'needed, about (π/4)√N'), `${G.tstar} <small>${L('步', 'steps')}</small>`); set(4, L('逐个试，平均 N/2', 'one by one, N/2 on average'), `${G.N / 2} <small>${L('次', 'tries')}</small>`);
      $('roNote').textContent = L('线上没有坡度可循：每一步都是同一个平面里固定的一小段转动，走过头命中概率反而下降。', 'There is no slope to follow along the thread: every step is the same small rotation in one plane, and stepping past the target makes the success probability fall again.');
      what = `N = ${G.N}`; key = `P ${fix(G.prob(t), 2)}`;
    }
    $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const LEG = {
      window: [['cy', 'A 到 B：θ₁', 'A to B: θ₁'], ['mg', 'B 到 C：θ₂', 'B to C: θ₂'], ['am', 'A 到 C：被锁住的那条', 'A to C: the one that is fixed'], ['box vi', '三者撑开的体积', 'the volume they span']],
      pages: [['cy', '全部书页', 'all the pages'], ['am', '读头所在的页', 'the page under the head'], ['vi', '翻页轴', 'the paging axis']],
      field: [['cy', '各处出发的流线', 'flow lines from everywhere'], ['am', '选中的那条', 'the chosen one'], ['dm', '场为零的对面点', 'the opposite point, where the field is zero']],
      line: [['cy', '走过的每一步', 'every step taken'], ['am', '当前的态', 'the current state'], ['dm', '起点附近的“其余”轴', 'the “rest” axis near the start']],
      sos: [['cy', '2-SAT：消解闭包的阶', '2-SAT: resolution closure order'], ['cy', '实心：推出空子句；空心：可满足', 'filled: empty clause; hollow: satisfiable'], ['mg', '3-XOR：示意的阶数阈值', '3-XOR: schematic order threshold'], ['am', '观察者的阶 M', 'the observer\'s order M']],
      wild: [['cy', '见证丝与丝上的探针', 'the thread and the probe on it'], ['mg', '涡旋与通道外的探针', 'the vortices and the probes off the channel'], ['am', '探针此刻的位置', 'where the probes are now']]
    };
    const html = LEG[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); TRV.hudFit(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 360, rate: 50, step: 15,
    format: (t, max) => ({ window: `φ ${t.toFixed(0)}° <small>/ 360°</small>`, pages: `${L('页', 'page')} ${Math.floor(t + 1e-9) % S.N} <small>/ ${S.N}</small>`, field: `t ${t.toFixed(2)} <small>/ ${max.toFixed(0)}</small>`, line: `${L('步', 'step')} ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)}</small>`, sos: `n ${ordN(t)} <small>/ ${ORD.hi}</small>`, wild: `t ${t.toFixed(2)} <small>/ ${max.toFixed(0)}</small>` })[S.scene],
    onChange: () => { if (clock && clock.playing) S.wish = null; paint(); }
  });
  let booting = true;
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); clock.rate = SC[sc].rate; clock.step = SC[sc].step; clock.setMax(SC[sc].max(), true); clock.set(t == null ? SC[sc].start() : t);
    $('stage').classList.toggle('still', !!SC[sc].flat);
    if (!booting) stage.view(SC[sc].view); else { const v = { iso: [-0.62, 0.34], front: [0, 0.06] }[SC[sc].view]; stage.cam.yaw = v[0]; stage.cam.pitch = v[1]; }
  }
  /** Start a card that plays: play for the reader, or jump to the frame its still shows (its `still` in PRESETS). */
  function run(id) { const still = PRESETS[id].still; if (TRV.still || (booting && !TRV.embed)) clock.set(still === 'end' ? clock.max : still); else if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const fTh1 = kit.field($('th1'), { fmt: (v) => `${v}°`, onInput: (v) => { S.th1 = v; S.wish = null; leave(); paint(); } });
  const fTh2 = kit.field($('th2'), { fmt: (v) => `${v}°`, onInput: (v) => { S.th2 = v; S.wish = null; leave(); paint(); } });
  /** Ask for a value of A·C: inside the window C moves there; outside, C goes to the nearest edge and the page says why. */
  function ask(x, quiet) {
    const g = gram(0), span = g.s1 * g.s2; S.wish = x; clock.pause();
    const cosPhi = span > 1e-12 ? (x - g.c1 * g.c2) / span : 0;
    clock.set(Math.acos(kit.clamp(cosPhi, -1, 1)) / DEG);
    if (!quiet && (x < g.lo - 1e-9 || x > g.hi + 1e-9)) TRV.toast($('toast'), L(`A·C = ${sgn(x, 2)} 不可能：det G 会变成 <b>${sgn(detFor(x), 3)}</b>`, `A·C = ${sgn(x, 2)} cannot exist: det G would be <b>${sgn(detFor(x), 3)}</b>`));
  }
  const fWish = kit.field($('wish'), { fmt: () => (S.wish == null ? '—' : sgn(S.wish, 2)), onInput: (v) => { leave(); ask(v); fWish.show(); } });
  const fN = kit.field($('npages'), { onInput: (v) => { S.N = v; leave(); clock.setMax(v, true); clock.set(Math.min(clock.t, v)); } });
  const fTilt = kit.field($('tilt'), { fmt: (v) => `${v}°`, onInput: (v) => { S.tilt = v; leave(); paint(); } });
  const fA0 = kit.field($('alpha0'), { fmt: (v) => `${v}°`, onInput: (v) => { S.alpha0 = v; leave(); paint(); } });
  const fQ = kit.field($('qubits'), { onInput: (v) => { S.n = v; leave(); clock.setMax(grover(v).tmax, true); clock.set(Math.min(clock.t, grover(v).tmax)); } });
  const fOrd = kit.field($('order'), { onInput: (v) => { S.M = v; leave(); paint(); } });
  const fEps = kit.field($('eps'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.eps = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('window'); }, 2: () => { leave(); setScene('pages'); }, 3: () => { leave(); setScene('field'); }, 4: () => { leave(); setScene('line'); }, 5: () => { leave(); setScene('sos'); }, 6: () => { leave(); setScene('wild'); } });

  /* ---------- experiment cards ---------- */
  // the cards that play, with the frame their still shows (kit.cards writes it onto the card as data-still)
  const PRESETS = { window: { still: 70 }, right: { still: 120 }, crystal: { still: 3 }, field: { still: 1.6 }, thread: { still: 6 }, sos: { still: ORD.hi }, wilderness: { still: 6.4 } };
  const NOTES = {
    window: ['A 与 B 夹 60°，B 与 C 夹 45°。让 C 绕 B 转一圈：A·C 只在 cos 105° 与 cos 15° 之间来回，出不了这个窗口；贴上窗边时三根共面，体积为零。这三根是实向量，det G = 1 − c²_AB − c²_BC − c²_AC + 2c_AB c_BC c_AC 是实截面（Bargmann 相位 Φ 只取 0 或 π）；复态的末项要换成 2|c_AB||c_BC||c_AC| cos Φ。', 'A and B are 60° apart, B and C 45°. Let C go once around B: A·C only swings between cos 105° and cos 15° and cannot leave that window; at its edges the three are coplanar and the volume is zero. These are real vectors, and det G = 1 − c²_AB − c²_BC − c²_AC + 2c_AB c_BC c_AC is the real section (Bargmann phase Φ only 0 or π); for complex states the last term becomes 2|c_AB||c_BC||c_AC| cos Φ.'],
    impossible: ['A 与 B 只夹 30°，B 与 C 只夹 40°，却要求 A 与 C 接近反向（A·C = −0.5）。det G 变成负数：没有任何三根向量能做到。', 'A and B are only 30° apart and B and C only 40°, yet A and C are asked to be nearly opposite (A·C = −0.5). det G turns negative: no three vectors can do this.'],
    right: ['两个夹角都是 90° 时，前两条余弦都是 0，对第三条不加任何限制：窗口是整个 [−1, 1]，C 可以沿赤道到任何地方。', 'With both angles at 90° the first two cosines are 0 and put no constraint on the third: the window is all of [−1, 1], and C can go anywhere along the equator.'],
    crystal: ['十二页一直都画在球上，没有哪一页先出现。播放时移动的只有琥珀色的读头：“现在”是读头的位置，不是书的性质。', 'All twelve pages are on the sphere the whole time; none appears first. When it plays, only the amber reading head moves: “now” is where the head is, not a property of the book.'],
    field: ['每条细线从不同的地方出发，都只看脚下的坡度，都流到目标。', 'Each thin line starts somewhere else, looks only at the slope underfoot, and flows to the target.'],
    thread: ['256 个候选里找一个：态从“其余”轴出发，每步向目标转 7.2°，12 步之后几乎对准。逐个试平均要 128 次。', 'One target among 256 candidates: the state starts near the “rest” axis and turns 7.2° towards the target per step, almost aligned after 12 steps. Trying one by one takes 128 tries on average.'],
    sos: ['青色：随机 2-SAT 的两元子句两两消解，推出的子句至多两个文字，n 再大也停在阶 2，并由此判定可满足性。品红：对随机 3-XOR / 3-SAT，文献证明阶 o(n) 的平方和松弛仍处处相容，直线只是示意斜率。琥珀色是观察者的阶 M。这些下界不推出 P ≠ NP，它仍是开放问题。', 'Cyan: resolving the two-literal clauses of random 2-SAT pairwise never yields more than two literals, so it stays at order 2 however large n is, and decides satisfiability that way. Magenta: for random 3-XOR / 3-SAT the literature proves that sum-of-squares relaxations of order o(n) stay consistent; the straight line only shows a schematic slope. Amber is the observer\'s order M. These lower bounds do not imply P ≠ NP, which remains open.'],
    wilderness: ['同一个场、同一个积分器：从丝上 S₀ 出发的青色探针沿 y = h(x) 直达 S*；离丝只差一点、但在通道（|ỹ| < ε）之外出发的三根品红探针被第一个涡旋卷住，到不了目标。示意模型，不是复杂度下界。', 'One field, one integrator: the cyan probe that starts on the thread at S₀ runs along y = h(x) straight to S*; three magenta probes that start only a little off it, but outside the channel (|ỹ| < ε), are caught by the first vortex and never reach the target. A schematic model, not a complexity lower bound.']
  };
  function applyPreset(id) {
    S.wish = null;
    const win = (a, b, phi) => { S.th1 = a; S.th2 = b; fTh1.set(a); fTh2.set(b); setScene('window', phi); };
    if (id === 'window') { win(60, 45, 0); run(id); }
    else if (id === 'impossible') { win(30, 40, 180); ask(-0.5, TRV.still || booting); $('wish').value = '-0.5'; fWish.show(); }
    else if (id === 'right') { win(90, 90, 0); run(id); }
    else if (id === 'crystal') { S.N = 12; S.tilt = 35; fN.set(12); fTilt.set(35); setScene('pages', 0); run(id); }
    else if (id === 'field') { S.alpha0 = 150; fA0.set(150); setScene('field', 0); run(id); }
    else if (id === 'thread') { S.n = 8; fQ.set(8); setScene('line', 0); run(id); }
    else if (id === 'sos') { S.M = 8; fOrd.set(8); setScene('sos', ORD.lo); run(id); }
    else if (id === 'wilderness') { S.eps = 0.15; S.user = null; fEps.set(0.15); setScene('wild', 0); run(id); }
    if (id !== 'impossible') fWish.show();
  }
  // Cited figures use a single sentence; the full laboratory keeps the detailed card notes.
  const FIGURE_NOTES = {
    "window": ["实向量夹角 60° 与 45° 固定时，A·C 只能在 cos 105° 与 cos 15° 之间，边界共面。", "For real vectors with angles 60° and 45° fixed, A·C stays between cos 105° and cos 15°; edges are coplanar."],
    "sos": ["2-SAT 消解闭包停在阶 2；随机 3-XOR/3-SAT 的文献平方和下界不推出 P ≠ NP。", "2-SAT resolution closes at order 2; literature sum-of-squares lower bounds for random 3-XOR/3-SAT do not settle P ≠ NP."],
    "wilderness": ["青色探针沿丝到达目标，通道外的品红探针被涡旋困住；这是示意模型。", "The cyan probe follows the thread to the target; magenta probes outside the channel are trapped: a schematic model."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拖滑块、在球上拖动 C、在荒野里点一下放一根探针。随时可以再选一张卡。', 'Free play: switch scenes, move the sliders, drag C on the sphere, click the wilderness to drop a probe. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.CAUSAL_DEBUG = {
    get state() {
      const t = clock.t, g = gram(t), bk = book(), F = flow(Math.min(t, TF)), G = grover(S.n);
      return { scene: S.scene, t, max: clock.max, playing: clock.playing, preset: cards.current, th1: S.th1, th2: S.th2, wish: S.wish, c1: g.c1, c2: g.c2, cAC: g.cAC, det: g.det, vol: g.vol, lo: g.lo, hi: g.hi, A: g.A, C: g.C,
        N: S.N, tilt: S.tilt, residual: bk.residual, pages: bk.r, bloch: bk.bloch, alpha0: S.alpha0, alpha: F.a, V0: F.V0, V: F.V, diss: F.diss, speed: F.speed, n: S.n, theta: G.th, tstar: G.tstar, tmax: G.tmax, prob: G.prob(t),
        M: S.M, ordN: ordN(t), eps: S.eps, user: S.user };
    },
    /** The 2-CNF of the ORDER scene at n variables and what its closure found. */
    order: (n) => { const k = closed(n); return { clauses: k.clauses, size: k.size, width: k.width.slice(), widest: k.widest, empty: k.empty, c: ORD.c }; },
    /** The probes of the WILDERNESS scene: start, arrival time, and the path sampled every `every` steps. */
    probes: (every) => probes().map((pr) => ({ x0: pr.x0, yt0: pr.yt0, on: pr.on, user: !!pr.user, arrive: pr.arrive, n: pr.pts.length, pts: pr.pts.filter((_, i) => i % (every || 1) === 0 || i === pr.pts.length - 1) })),
    wild: () => ({ L: WL.L, A: WL.A, w: WL.w, k: WL.k, q: WL.q, U: WL.U, T: WL.T, dt: WL.dt, shift: 0.75, eps: S.eps }),
    plane: () => (flat ? { pl: flat.pl, pt: flat.pt, iw: flat.iw, ih: flat.ih, x0: flat.x0, x1: flat.x1, y0: flat.y0, y1: flat.y1, rect: (() => { const b = $('cv').getBoundingClientRect(); return [b.left, b.top]; })() } : null),
    seek: (t) => { clock.pause(); clock.set(t); }, detFor, camera: () => Object.assign({}, stage.cam),
    tip: () => { const q = stage.p(gram(clock.t).C), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { S.wish = null; S.th1 = 60; S.th2 = 45; setScene('window', 70); stage.cam.yaw = -0.5; stage.cam.pitch = 0.36; paint.now(); };
  cards.pick(cards.initial('window'));
  booting = false;
  paint();
})();
