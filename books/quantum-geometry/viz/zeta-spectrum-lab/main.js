/* ZETA//SPECTRUM · 有限和、合成四根与有限零点样本 · Finite sums, a synthetic quartet and a finite line-zero sample
   Three scenes on one 3D stage (kit.stage3, x right, z up):
     phasor   the partial sums S_n(s) = Σ_{m≤n} m^{−s}, recomputed from m^{−σ−it}, drawn head to tail and lifted along
              log n: [log n, Re S_n, Im S_n] (cyan); for σ > 1 also the finite Euler product E_p(s) = ∏_{q≤p} (1 − q^{−s})^{−1}
              over primes (magenta); the end screen shows both projected on the complex plane. Neither is called ζ(s).
              μ(n) comes from the inverse Dirichlet convolution, and Σ μ(n) n^{−s} is read against 1/S_N only for σ > 1.
              At finite N, S_N and E_N are in general different numbers; the page lists their difference and claims no
              universal statement about every N.
              The rail is the number of terms n; the amber ring at 2^{−s} sets σ and t.
     quartet  the synthetic polynomial Q(s) = ∏ (s − ρ) over β ± iγ and 1 − β ± iγ (γ = 0.7): a lattice of paths over the
              complex s-plane at height √|Q(s)| (rescaled), the roots on the floor, the violet line σ = ½; the rail is β.
     powers   ψ₀(x) = ½ Σ_{n<x} Λ(n) + ½ Σ_{n≤x} Λ(n) for real x > 1 (cyan stair, Λ by trial division), and behind it
              the finite spectral sums x − Σ_{k≤K} 2 Re(x^{ρ_k}/ρ_k) − log 2π − ½ log(1 − x^{−2}) with the first K of ten
              numerical line-zero ordinates, one layer per K (magenta); the rail is K, the amber ring is x, dragged by
              reading x where the pointer's ray meets the stair's plane (independent of the stair height there).
              Sources: DLMF §25.2 (representations of ζ), 27.4.E5 (1/ζ as the Möbius series), §27.5 (Dirichlet
              convolution and inversion), §25.16 (ψ: definition and asymptotics only); the full pointwise explicit formula
              is in Davenport, Multiplicative Number Theory, 3rd ed., ch. 17, and in the book at §22.4.1.
   Every number is computed here; there is no analytic continuation and no error bound. Probe: window.ZETA_SPECTRUM_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, v3 } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, LN2 = Math.log(2);
  const lin = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
  const sci = (x) => (x === 0 ? '0' : x < 1e-3 ? x.toExponential(1).replace('e-', 'e−') : fix(x, 6));

  /* ---------- complex numbers as [re, im] ---------- */
  const C = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
    sc: (a, k) => [a[0] * k, a[1] * k],
    abs: (a) => Math.hypot(a[0], a[1])
  };
  const cstr = (z, d = 4) => `${fix(z[0], d)} ${z[1] < 0 ? '−' : '+'} ${fix(Math.abs(z[1]), d)}i`;
  /** n^{−s} for s = σ + it. */
  const npow = (n, sig, tt) => { const l = Math.log(n), m = Math.exp(-sig * l); return [m * Math.cos(tt * l), -m * Math.sin(tt * l)]; };

  /* ---------- arithmetic: primes by trial division, μ by the inverse Dirichlet convolution, Λ by trial division ---------- */
  const NMAX = 96;
  const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const PRIMES = []; for (let n = 2; n <= NMAX; n++) if (isPrime(n)) PRIMES.push(n);
  const MU = new Array(NMAX + 1).fill(0);
  MU[1] = 1;
  for (let n = 2; n <= NMAX; n++) { let s = 0; for (let d = 1; d < n; d++) if (n % d === 0) s += MU[d]; MU[n] = -s; }
  function vonMangoldt(n) {
    if (n < 2) return 0;
    let p = 2; while (n % p !== 0) p++;
    let m = n; while (m % p === 0) m /= p;
    return m === 1 ? Math.log(p) : 0;
  }
  const LAM = Array.from({ length: 22 }, (_, n) => vonMangoldt(n));

  /* ---------- scene 1: partial sums and the finite Euler product ---------- */
  function phasor(sig, tt, N) {
    const partial = [], recip = [];
    let S = [0, 0], M = [0, 0], absMu = 0;
    for (let n = 1; n <= N; n++) {
      const z = npow(n, sig, tt);
      S = C.add(S, z); partial.push([n, S[0], S[1]]);
      if (MU[n]) { M = C.add(M, C.sc(z, MU[n])); absMu += Math.exp(-sig * Math.log(n)); }
      recip.push([n, C.abs(C.sub(C.mul(S, M), [1, 0]))]);
    }
    const euler = [[1, 1, 0]];
    let E = [1, 0];
    for (const p of PRIMES) { if (p > N) break; E = C.div(E, C.sub([1, 0], npow(p, sig, tt))); euler.push([p, E[0], E[1]]); }
    const product = C.mul(S, M);
    return { sig, tt, N, partial, euler, SN: S, EN: E, MN: M, absMu, product, reciprocalGap: C.abs(C.sub(product, [1, 0])), gap: C.abs(C.sub(S, E)), recip, converges: sig > 1 };
  }
  const phCache = new Map();
  function phasorOf(sig, tt, N) {
    const key = `${sig}|${tt}|${N}`;
    let v = phCache.get(key);
    if (!v) { v = phasor(sig, tt, N); phCache.set(key, v); if (phCache.size > 120) phCache.delete(phCache.keys().next().value); }
    return v;
  }

  /* ---------- scene 2: the synthetic quartet ---------- */
  const GAMMA_Q = 0.7;
  const TEST_POINTS = [[0.1, 0.2], [0.9, -0.4], [0.5, 1.1], [-0.2, 0.6], [1.2, -1.3], [0.3, -0.9], [0.75, 0.05], [0, -1.2], [1.05, 0.95], [0.45, -0.3], [0.62, 0.7], [-0.15, -0.05]];
  function quartet(b) {
    const g = GAMMA_Q, roots = [[b, g], [b, -g], [1 - b, g], [1 - b, -g]];
    const Q = (s) => roots.reduce((acc, r) => C.mul(acc, C.sub(s, r)), [1, 0]);
    const A1 = -2 * b, A0 = b * b + g * g, B1 = -2 * (1 - b), B0 = (1 - b) * (1 - b) + g * g;
    const coeffs = [1, A1 + B1, A0 + B0 + A1 * B1, A1 * B0 + A0 * B1, A0 * B0];   // s⁴, s³, s², s, 1
    let reflection = 0, conjugation = 0;
    const tests = TEST_POINTS.map((s) => {
      const q = Q(s), qr = Q([1 - s[0], -s[1]]), qc = Q([s[0], -s[1]]);
      reflection = Math.max(reflection, C.abs(C.sub(qr, q)));
      conjugation = Math.max(conjugation, C.abs(C.sub(qc, [q[0], -q[1]])));
      return { s, Q: q };
    });
    return { beta: b, gamma: g, roots, Q, coeffs, reflection, conjugation, tests, distance: Math.abs(b - 0.5), rootValues: roots.map((r) => C.abs(Q(r))) };
  }

  /* ---------- scene 3: ψ₀ and its finite spectral sums ---------- */
  const GAMMAS = [14.134725141734693, 21.022039638771555, 25.01085758014569, 30.424876125859512, 32.93506158773919, 37.58617815882567, 40.9187190121475, 43.327073280915, 48.00515088116716, 49.7738324776723];
  const X0 = 1.2, X1 = 20;
  /** −2 Re(x^ρ/ρ) for ρ = ½ + iγ_k: the k-th conjugate pair of line zeros, as a harmonic of log x. */
  const harmonic = (k, x) => { const l = Math.log(x), r = Math.sqrt(x); return -2 * C.div([r * Math.cos(GAMMAS[k] * l), r * Math.sin(GAMMAS[k] * l)], [0.5, GAMMAS[k]])[0]; };
  const mainTerm = (x) => x - Math.log(TAU) - 0.5 * Math.log(1 - 1 / (x * x));
  const psiK = (x, K) => { let s = mainTerm(x); for (let k = 0; k < K; k++) s += harmonic(k, x); return s; };
  const isInt = (x) => Math.abs(x - Math.round(x)) < 1e-9;
  function psi0(x) {
    const xi = isInt(x), top = xi ? Math.round(x) - 1 : Math.floor(x);
    let s = 0;
    for (let n = 2; n <= top; n++) s += LAM[n];
    return xi ? s + 0.5 * LAM[Math.round(x)] : s;
  }
  const POWERS = []; for (let n = 2; n <= X1; n++) if (LAM[n] > 0) POWERS.push(n);
  const STAIR = (() => {
    const pts = [[X0, 0]]; let s = 0;
    for (const n of POWERS) { pts.push([n, s]); s += LAM[n]; pts.push([n, s]); }
    pts.push([X1, s]);
    return pts;
  })();
  const XS = lin(X0, X1, 380);
  const LAYERS = Array.from({ length: 11 }, (_, K) => XS.map((x) => [x, psiK(x, K)]));

  /* ---------- state ---------- */
  const S = { scene: 'phasor', sigma: 1.6, tIm: 6, N: 48, x: 9 };
  const VIEWS = { phasor: [-0.5, 0.32], quartet: [-0.55, 0.62], powers: [-0.42, 0.42] };
  const railOf = (sc) => (sc === 'phasor' ? { max: S.N - 1, rate: (S.N - 1) / 10, step: 1 } : sc === 'quartet' ? { max: 0.6, rate: 0.06, step: 0.05 } : { max: 10, rate: 1, step: 1 });
  const nNow = () => clamp(1 + Math.floor(clock.t + 1e-9), 1, S.N);
  const betaNow = () => clamp(0.2 + clock.t, 0.2, 0.8);
  const kNow = () => clamp(Math.floor(clock.t + 1e-9), 0, 10);

  /* display maps */
  const Xn = (n) => -1.7 + 3.4 * Math.log(n) / Math.log(S.N);
  const XSCREEN = 2.05;
  let AMP = 0.5;                                                    // world units per unit of the sums (refit unless dragging)
  const Wn = (n, re, im) => [Xn(n), AMP * re, AMP * im];
  const Xs = (sig) => (sig - 0.5) * 2;
  const Yt = (tau) => tau;
  const SIG = [-0.2, 1.2], TAUS = [-1.3, 1.3], HQ = 0.95;
  const Xp = (x) => (x - (X0 + X1) / 2) * 3.4 / (X1 - X0);
  const Zp = (psi) => (psi - 9.5) * 0.1;
  const Yd = (j) => -1.1 + 0.2 * j;                                // j = 0: the stair; j = K + 1: the sum with K zeros
  const corners = (xs, ys, zs) => xs.flatMap((x) => ys.flatMap((y) => zs.map((z) => [x, y, z])));
  const BOX = {
    phasor: corners([-1.8, XSCREEN + 0.05], [-1.25, 1.25], [-1.25, 1.25]),
    quartet: corners([-1.45, 1.45], [-1.35, 1.35], [0, HQ]),
    powers: corners([-1.8, 1.8], [-1.15, 1.15], [-1, 1.05])
  };

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const opts = { canvas: $('cv'), yaw: VIEWS.phasor[0], pitch: VIEWS.phasor[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const st = kit.stage3(stageEl, opts);
  stageEl.classList.toggle('still', !!TRV.still);
  let FITCAM = VIEWS.phasor.slice(), FIT = null, FRAME = null, dragging = null;

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), ...$('legend').children]) { const b = boxOf(el, sr); if (b) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 16, y: top + 4, w: Math.max(40, W - 32), h: Math.max(60, bottom - top - 8) };
  }
  const basis = (cam) => { const cy = Math.cos(cam[0]), sy = Math.sin(cam[0]), cp = Math.cos(cam[1]), sp = Math.sin(cam[1]); return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] }; };
  function fitTo(box, area, W, H) {
    const { R, U } = basis(FITCAM);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of box) { const a = v3.dot(p, R), b = -v3.dot(p, U); x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b); }
    const unit = Math.max(16, Math.min(area.w / (x1 - x0), area.h / (y1 - y0)));
    opts.radius = unit / Math.max(1, Math.min(W, H));
    opts.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    opts.cy = (area.y + area.h / 2 - unit * (y0 + y1) / 2) / Math.max(1, H);
  }

  const sizes = new Map();
  TRV.onLang(() => sizes.clear());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function want(key, world, html, cls, pri, dir) { if (!TRV.thumbMode) LB.push({ key, q: st.p(world), html, cls, pri, dir }); }
  function placeLabels(center) {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const d = l.dir || [l.q[0] - center[0] || 0.01, l.q[1] - center[1] || -1], base = Math.atan2(d[1], d[0]);
      let ok = null;
      for (const r of [10, 20, 34, 50]) {
        for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
          const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
          const b = { x: l.q[0] + ux * (r + ext) - w / 2, y: l.q[1] + uy * (r + ext) - h / 2, w, h };
          if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
          if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
          ok = b; break;
        }
        if (ok) break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      st.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed.map((p) => ({ key: p.key, x: p.x, y: p.y, w: p.w, h: p.h }));
  }

  /* ---------- drawing ---------- */
  function drawPhasor(M) {
    const ph = M.ph, n = M.n, xl = Xn(1), xr = Xn(S.N);
    // the log n axis (violet) and the projection screen with its complex axes
    st.path([[xl - 0.08, 0, 0], [xr + 0.06, 0, 0]], { color: P.violet, width: 1.2, alpha: 0.8, fade: false });
    for (const m of [2, 4, 8, 16, 32, 64].filter((m) => m <= S.N)) st.path([[Xn(m), 0, -0.04], [Xn(m), 0, 0.04]], { color: P.violet, width: 1, alpha: 0.7, fade: false });
    const sq = 1.2;
    st.poly([[XSCREEN, -sq, -sq], [XSCREEN, sq, -sq], [XSCREEN, sq, sq], [XSCREEN, -sq, sq]], { fill: P.ink, alpha: 0.03, color: P.lineHot, strokeAlpha: 0.8, width: 1 });
    st.path([[XSCREEN, -sq, 0], [XSCREEN, sq, 0]], { color: P.violet, width: 1, alpha: 0.45, fade: false });
    st.path([[XSCREEN, 0, -sq], [XSCREEN, 0, sq]], { color: P.violet, width: 1, alpha: 0.45, fade: false });
    // the finite sum: drawn to n, the rest faint
    const all = ph.partial.map(([m, re, im]) => Wn(m, re, im));
    if (n < S.N) st.path(all.slice(n - 1), { color: P.cyan, width: 1, alpha: 0.22, fade: false });
    if (n >= 2) st.path(all.slice(0, n), { color: P.cyan, width: 2.2, fade: false });
    else st.path(all.slice(0, 2), { color: P.cyan, width: 1, alpha: 0.4, dash: [3, 3], fade: false });
    st.path(ph.partial.slice(0, n).map(([, re, im]) => [XSCREEN, AMP * re, AMP * im]), { color: P.cyan, width: 1.3, alpha: 0.85, fade: false });
    // the finite Euler product, only where both converge (σ > 1)
    if (ph.converges) {
      const eAll = ph.euler.map(([p, re, im]) => Wn(p, re, im)), k = ph.euler.filter(([p]) => p <= n).length;
      if (k < eAll.length) st.path(eAll.slice(Math.max(0, k - 1)), { color: P.magenta, width: 1, alpha: 0.22, fade: false });
      if (k >= 2) st.path(eAll.slice(0, k), { color: P.magenta, width: 2, fade: false });
      for (let i = 1; i < k; i++) st.dot(eAll[i], 2.4, P.magenta, { fade: false });
      st.path(ph.euler.slice(0, k).map(([, re, im]) => [XSCREEN, AMP * re, AMP * im]), { color: P.magenta, width: 1.2, alpha: 0.85, fade: false });
      const last = ph.euler[k - 1];
      want('E', Wn(last[0], last[1], last[2]), 'E<sub>p</sub>(s) = ∏ (1 − p<sup>−s</sup>)<sup>−1</sup>', 'raw c-mg backed', 8);
    }
    // the current partial sum (amber) on the curve and on the screen
    const cur = ph.partial[n - 1];
    st.dot(Wn(n, cur[1], cur[2]), 5, P.amber, { glow: 12, fade: false });
    st.dot([XSCREEN, AMP * cur[1], AMP * cur[2]], 3.4, P.amber, { fade: false });
    st.dot(Wn(1, 1, 0), 3, P.cyan, { fade: false });
    want('S', Wn(n, cur[1], cur[2]), `S<sub>n</sub>(s) = Σ<sub>m≤n</sub> m<sup>−s</sup>`, 'raw c-cy backed', 9);
    const s2 = ph.partial[1];
    want('two', Wn(2, s2[1], s2[2]), '1 + 2<sup>−s</sup>', 'raw c-am backed', 7);
    want('axis', [xr + 0.1, 0, 0], 'log n', 'raw c-vi', 4, [0.3, 1]);
    want('screen', [XSCREEN, 0, sq], L('复平面投影', 'complex-plane projection'), 'raw ink backed', 5, [0, -1]);
    return { handle: Wn(2, s2[1], s2[2]) };
  }

  function drawQuartet(M) {
    const q = M.q, nL = 26, nS = 56;
    const sigs = lin(SIG[0], SIG[1], nL), taus = lin(TAUS[0], TAUS[1], nL);
    // heights √|Q| rescaled to the largest value of the lattice
    const val = (s, t) => C.abs(q.Q([s, t]));
    let qmax = 0;
    for (const s of sigs) for (const t of taus) qmax = Math.max(qmax, val(s, t));
    const H = (s, t) => HQ * Math.sqrt(val(s, t) / qmax);
    // the floor: frame, real axis, and the violet line σ = ½
    st.poly([[Xs(SIG[0]), Yt(TAUS[0]), 0], [Xs(SIG[1]), Yt(TAUS[0]), 0], [Xs(SIG[1]), Yt(TAUS[1]), 0], [Xs(SIG[0]), Yt(TAUS[1]), 0]], { fill: P.ink, alpha: 0.03, color: P.lineHot, strokeAlpha: 0.7, width: 1 });
    st.path([[Xs(SIG[0]), 0, 0], [Xs(SIG[1]), 0, 0]], { color: P.dim, width: 1, alpha: 0.7, fade: false });
    st.path([[Xs(0.5), Yt(TAUS[0]), 0], [Xs(0.5), Yt(TAUS[1]), 0]], { color: P.violet, width: 2, fade: false });
    // the surface as two families of paths
    for (const t of taus) st.path(lin(SIG[0], SIG[1], nS).map((s) => [Xs(s), Yt(t), H(s, t)]), { color: P.lineHot, width: 1, alpha: 0.85, fade: false });
    for (const s of sigs) st.path(lin(TAUS[0], TAUS[1], nS).map((t) => [Xs(s), Yt(t), H(s, t)]), { color: P.lineHot, width: 1, alpha: 0.85, fade: false });
    // |Q| along the line σ = ½ (violet, lifted) and along σ = β (ink)
    st.path(lin(TAUS[0], TAUS[1], 120).map((t) => [Xs(0.5), Yt(t), H(0.5, t)]), { color: P.violet, width: 1.6, alpha: 0.9, fade: false });
    // the mirror pairs and the roots
    const [r1, r2, r3, r4] = q.roots, at = (r) => [Xs(r[0]), Yt(r[1]), 0];
    st.path([at(r1), at(r3)], { color: P.dim, width: 1, dash: [4, 4], fade: false });
    st.path([at(r2), at(r4)], { color: P.dim, width: 1, dash: [4, 4], fade: false });
    st.path([at(r1), at(r2)], { color: P.dim, width: 1, dash: [2, 4], fade: false });
    for (const r of q.roots) st.dot(at(r), 5, P.magenta, { glow: 8, fade: false });
    // the distance of β + iγ to the line (amber)
    st.path([at(r1), [Xs(0.5), Yt(r1[1]), 0]], { color: P.amber, width: 2.2, fade: false });
    want('line', [Xs(0.5), Yt(TAUS[1]), 0], 'σ = ½', 'raw c-vi backed', 9, [0, -1]);
    want('dist', [(Xs(0.5) + Xs(r1[0])) / 2, Yt(r1[1]), 0], `|β − ½| = ${fix(q.distance, 3)}`, 'raw c-am backed', 8, [0, -1]);
    want('r2', at(r2), 'β − iγ', 'raw c-mg backed', 6);
    want('r3', at(r3), '1 − β + iγ', 'raw c-mg backed', 6);
    want('r4', at(r4), '1 − β − iγ', 'raw c-mg backed', 6);
    want('height', [Xs(SIG[1]), Yt(TAUS[1]), H(SIG[1], TAUS[1])], '√|Q(s)|', 'raw ink backed', 5);
    return { handle: at(r1) };
  }

  function drawPowers(M) {
    const K = M.K, x = S.x, y0 = Yd(0), ax0 = Xp(X0), ax1 = Xp(X1), zb = Zp(0);
    // axes (violet): x along the front floor, the layer axis at x = 1.2
    st.path([[ax0, y0, zb], [ax1 + 0.08, y0, zb]], { color: P.violet, width: 1.2, alpha: 0.8, fade: false });
    st.path([[ax0, y0, zb], [ax0, Yd(11), zb]], { color: P.violet, width: 1.2, alpha: 0.8, fade: false });
    for (let j = 1; j <= 11; j++) st.path([[ax0, Yd(j), zb - 0.03], [ax0, Yd(j), zb + 0.03]], { color: P.violet, width: 1, alpha: j - 1 <= K ? 0.9 : 0.35, fade: false });
    // the layers ψ_k behind, faint for k < K, bold for k = K
    for (let k = 0; k <= K; k++) {
      const yk = Yd(k + 1);
      st.path(LAYERS[k].map(([xx, v]) => [Xp(xx), yk, Zp(v)]), k === K ? { color: P.magenta, width: 2.4, fade: false } : { color: P.magenta, width: 1, alpha: 0.18 + 0.4 * k / Math.max(1, K), fade: false });
    }
    // the stair ψ₀ in front
    st.path(STAIR.map(([xx, v]) => [Xp(xx), y0, Zp(v)]), { color: P.cyan, width: 2.6, fade: false });
    // at the current x: the value of every layer, joined in order of k (ink), and the stair point (amber)
    const col = [[Xp(x), y0, Zp(M.psi0)], ...Array.from({ length: K + 1 }, (_, k) => [Xp(x), Yd(k + 1), Zp(psiK(x, k))])];
    st.path(col, { color: P.ink, width: 1.4, fade: false });
    for (let i = 1; i < col.length; i++) st.dot(col[i], 2.4, P.ink, { fade: false });
    st.path([[Xp(x), y0, zb], [Xp(x), y0, Zp(M.psi0)]], { color: P.amber, width: 1.2, dash: [3, 3], fade: false });
    st.dot([Xp(x), y0, Zp(M.psi0)], 5, P.amber, { glow: 12, fade: false });
    // labels
    // one formula on the whole real domain x > 1: the two sums differ only where x is an integer, by Λ(x), so a jump
    // takes the mean of its left and right limits (the value psi0 computes) and elsewhere both give ψ(x)
    want('stair', [Xp(17.5), y0, Zp(psi0(17.5))], `ψ₀(x) = ½ Σ<sub>n&lt;x</sub> Λ(n) + ½ Σ<sub>n≤x</sub> Λ(n)<br>${L('实数 x &gt; 1；跳点取左右极限的平均', 'real x &gt; 1; at a jump, mean of left and right limits')}`, 'raw c-cy backed', 9, [0.3, 1]);
    want('top', [Xp(19.5), Yd(K + 1), Zp(psiK(19.5, K))], `K = ${K}`, 'raw c-mg backed', 8, [0.6, -1]);
    for (const n of [4, 8, 9, 16]) want(`pp${n}`, [Xp(n), y0, Zp(psi0(n))], `${n}`, 'raw ink backed', 5, [1, 0.8]);
    want('xaxis', [ax1 + 0.1, y0, zb], 'x', 'raw c-vi', 4, [1, 0.3]);
    want('kaxis', [ax0, Yd(11), zb], 'k', 'raw c-vi', 4, [-1, 0]);
    return { handle: [Xp(x), y0, Zp(M.psi0)] };
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FIT) {
      FIT = { area }; fitTo(BOX[S.scene], area, W, H);
      if (S.scene === 'phasor') {
        const ph = M.ph; let r = 1.2;
        for (const p of ph.partial) r = Math.max(r, Math.hypot(p[1], p[2]));
        if (ph.converges) for (const p of ph.euler) r = Math.max(r, Math.hypot(p[1], p[2]));
        AMP = 1.15 / r;
      }
    }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    st.begin();
    const out = S.scene === 'phasor' ? drawPhasor(M) : S.scene === 'quartet' ? drawQuartet(M) : drawPowers(M);
    const hq = !thumb && !TRV.still ? st.p(out.handle) : null;
    if (hq) OBST.push({ x: hq[0] - 17, y: hq[1] - 17, w: 34, h: 34 });
    placeHandle(hq);
    if (!thumb) placeLabels(st.p([0, 0, 0]));
    st.end();
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: st.unit, cx: st.cx, cy: st.cy, amp: AMP };
  }

  /* ---------- the handle: 2^{−s} (σ, t), the root β + iγ (β), the stair point (x) ---------- */
  const handle = $('handle');
  const HANDLE_TEXT = {
    phasor: ['拖动 1 + 2⁻ˢ 的尖端改变 σ 与 t（← → 调 t，↑ ↓ 调 σ）', 'Drag the tip of 1 + 2⁻ˢ to change σ and t (← → for t, ↑ ↓ for σ)'],
    quartet: ['拖动根 β + iγ 改变 β（← → 微调）', 'Drag the root β + iγ to change β (← → fine steps)'],
    powers: ['拖动阶梯上的点改变 x（← → 0.1，↑ ↓ 1）', 'Drag the point on the stair to change x (← → 0.1, ↑ ↓ 1)']
  };
  function placeHandle(q) {
    handle.hidden = !q;
    const [zh, en] = HANDLE_TEXT[S.scene];
    if (handle.dataset.ariaEn !== en) { handle.dataset.ariaZh = zh; handle.dataset.ariaEn = en; }
    handle.setAttribute('aria-label', L(zh, en));
    if (q) { handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`; }
  }
  const local = (ev) => { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; };
  /** World offset along the projected x axis from the world point h to the screen point q. */
  function alongX(q, h) {
    const o = st.p([0, 0, 0]), e = st.p([1, 0, 0]), dx = [e[0] - o[0], e[1] - o[1]], d2 = dx[0] * dx[0] + dx[1] * dx[1];
    if (d2 < 9) return 0;
    const hp = st.p(h);
    return ((q[0] - hp[0]) * dx[0] + (q[1] - hp[1]) * dx[1]) / d2;
  }
  /** The world point [X, y0, Z] of the vertical plane y = y0 under the screen point q (the camera is orthographic, so its
      ray meets the plane once), as [X, Z]; null where the plane is seen nearly edge-on. */
  function onPlaneY(q, y0) {
    const o = st.p([0, y0, 0]), ex = st.p([1, y0, 0]), ez = st.p([0, y0, 1]);
    const a = [ex[0] - o[0], ex[1] - o[1]], b = [ez[0] - o[0], ez[1] - o[1]], det = a[0] * b[1] - a[1] * b[0];
    if (Math.abs(det) < 0.04 * st.unit * st.unit) return null;
    const r = [q[0] - o[0], q[1] - o[1]];
    return [(r[0] * b[1] - r[1] * b[0]) / det, (a[0] * r[1] - a[1] * r[0]) / det];
  }
  /** x on the stair whose world abscissa is X (inverse of Xp), on the 0.01 grid of the slider. */
  const xOfX = (X) => clamp(Math.round(((X1 - X0) * X / 3.4 + (X0 + X1) / 2) * 100) / 100, X0, X1);
  /** (σ, t) whose point 1 + 2^{−s} lies, in the plane x = log 2, under the screen point q; t on the branch nearest now. */
  function stepAt(pt) {
    const Xc = Xn(2), o = st.p([Xc, 0, 0]), ey = st.p([Xc, 1, 0]), ez = st.p([Xc, 0, 1]);
    const a1 = [ey[0] - o[0], ey[1] - o[1]], b1 = [ez[0] - o[0], ez[1] - o[1]], det = a1[0] * b1[1] - a1[1] * b1[0];
    if (Math.abs(det) < 0.04 * st.unit * st.unit) return null;
    const r = [pt[0] - o[0], pt[1] - o[1]], y = (r[0] * b1[1] - r[1] * b1[0]) / det, z = (a1[0] * r[1] - a1[1] * r[0]) / det;
    const w = [y / AMP - 1, z / AMP], m = Math.hypot(w[0], w[1]);
    if (m < 1e-9) return null;
    const sigma = clamp(-Math.log(m) / LN2, 0.2, 2.5), th = Math.atan2(w[1], w[0]);
    const k = Math.round((S.tIm * LN2 + th) / TAU), tIm = clamp((TAU * k - th) / LN2, 0, 35);
    return { sigma, tIm };
  }
  function dragTo(pt) {
    if (S.scene === 'phasor') { const v = stepAt(pt); if (!v) return; S.sigma = v.sigma; S.tIm = v.tIm; }
    else if (S.scene === 'quartet') { const b = betaNow(), X = Xs(b) + alongX(pt, [Xs(b), Yt(GAMMA_Q), 0]); clock.set(clamp(0.5 + X / 2, 0.2, 0.8) - 0.2); }
    else {
      // The stair lies in the plane y = Yd(0). Read x where the pointer's ray meets that plane: a jump of ψ₀ moves the
      // handle straight up the plane (along z), never along x, so the reading does not depend on the stair height at the
      // handle and nothing accumulates from one move to the next. Seen edge-on, fall back to the x line through the
      // point grabbed at pointerdown (a fixed anchor, not the handle of the previous move).
      const w = onPlaneY(pt, Yd(0)), A = dragging && dragging.anchor;
      if (w) S.x = xOfX(w[0]);
      else if (A) S.x = xOfX(A[0] + alongX(pt, A));
    }
    syncFields(); paint();
  }
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    dragging = { id: ev.pointerId, anchor: S.scene === 'powers' ? [Xp(S.x), Yd(0), Zp(psi0(S.x))] : null }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => { if (!dragging || ev.pointerId !== dragging.id) return; ev.preventDefault(); dragTo(local(ev)); });
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.id)) return;
    const id = dragging.id; dragging = null; handle.classList.remove('dragging');
    try { if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id); } catch (e) { /* already released */ }
    paint();
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = ev.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = k === 'ArrowRight' || k === 'ArrowUp' ? 1 : -1, horiz = k === 'ArrowLeft' || k === 'ArrowRight';
    const r2 = (v) => Math.round(v * 1000) / 1000;
    if (S.scene === 'phasor') { if (horiz) S.tIm = clamp(r2(S.tIm + sgn * 0.1), 0, 35); else S.sigma = clamp(r2(S.sigma + sgn * 0.02), 0.2, 2.5); }
    else if (S.scene === 'quartet') clock.set(clamp(r2(betaNow() + sgn * 0.01), 0.2, 0.8) - 0.2);
    else S.x = clamp(Math.round((S.x + sgn * (horiz ? 0.1 : 1)) * 100) / 100, X0, X1);
    syncFields(); paint();
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendHtml = (items) => items.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  function model() {
    if (S.scene === 'phasor') return { ph: phasorOf(S.sigma, S.tIm, S.N), n: nNow() };
    if (S.scene === 'quartet') return { q: quartet(betaNow()) };
    const K = kNow();
    return { K, psi0: psi0(S.x), psiK: psiK(S.x, K) };
  }
  function hudText(M) {
    let big, sub, legend;
    if (S.scene === 'phasor') {
      const ph = M.ph, cur = ph.partial[M.n - 1];
      big = `${L('有限部分和', 'Finite partial sums')} · s = ${fix(S.sigma, 3)} + ${fix(S.tIm, 3)}i`;
      sub = ph.converges
        ? `n = ${M.n} / N = ${S.N} · |S<sub>n</sub>| = ${fix(Math.hypot(cur[1], cur[2]), 4)} · |S<sub>N</sub> − E<sub>N</sub>| = ${fix(ph.gap, 4)}`
        : `n = ${M.n} / N = ${S.N} · |S<sub>n</sub>| = ${fix(Math.hypot(cur[1], cur[2]), 4)} · ${L('σ ≤ 1：有限和不是 ζ(s)，不画欧拉积', 'σ ≤ 1: a finite sum, not ζ(s); no Euler product')}`;
      legend = [['cy', L('有限和 S<sub>n</sub>(s)', 'finite sum S<sub>n</sub>(s)')], ['mg', L('有限欧拉积（只在 σ > 1）', 'finite Euler product (σ > 1 only)')],
        ['vi', L('log n 轴 · 屏上的实轴与虚轴', 'log n axis · real and imaginary axes')], ['am', L('当前 n · 手柄 2<sup>−s</sup>', 'current n · handle 2<sup>−s</sup>')]];
    } else if (S.scene === 'quartet') {
      const q = M.q;
      big = `${L('合成四根', 'Synthetic quartet')} · |β − ½| = ${fix(q.distance, 3)}`;
      sub = `β = ${fix(q.beta, 3)} · γ = 0.7 · Q(1 − s) = Q(s) · Q(s̄) = Q(s)* · ${L('模型，不是 ζ', 'a model, not ζ')}`;
      legend = [['mg', L('四个根', 'the four roots')], ['ik', L('高度 √|Q(s)|（缩放）', 'height √|Q(s)| (rescaled)')], ['vi', L('直线 σ = ½', 'the line σ = ½')], ['am', L('β 手柄 · 到直线的距离', 'β handle · distance to the line')]];
    } else {
      big = `${L('显式公式的有限截断', 'Truncated explicit formula')} · K = ${M.K}`;
      sub = `x = ${fix(S.x, 2)} · ψ₀(x) = ${fix(M.psi0, 4)} · ψ<sub>K</sub>(x) = ${fix(M.psiK, 4)} · ${L('有限线上零点样本，无余项界', 'finite line-zero sample, no remainder bound')}`;
      legend = [['cy', L('阶梯 ψ₀(x)，含素数幂', 'stair ψ₀(x), prime powers included')], ['mg', L('ψ<sub>k</sub>(x)：前 k 个零点，一层一个 k', 'ψ<sub>k</sub>(x): first k zeros, one layer per k')],
        ['ik', L('当前 x 处逐层的值', 'each layer at the current x')], ['vi', L('x 轴 · 层轴 k', 'x axis · layer axis k')], ['am', L('当前 x · 手柄', 'current x · handle')]];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const html = legendHtml(legend);
    if ($('legend').innerHTML !== html) $('legend').innerHTML = html;
  }
  const row = (cls, dt, dd) => `<div class="${cls}"><dt>${dt}</dt><dd>${dd}</dd></div>`;
  function drawText(M) {
    let rows, note, pill1, pill2;
    if (S.scene === 'phasor') {
      const ph = M.ph, cv = ph.converges;
      rows = [
        `<div class="key"><dt>${L(`有限部分和 S<sub>N</sub>(s)，N = ${S.N}（不是 ζ(s)）`, `Finite partial sum S<sub>N</sub>(s), N = ${S.N} (not ζ(s))`)}</dt><dd><b>${cstr(ph.SN)}</b><span>|S<sub>N</sub>| = ${fix(C.abs(ph.SN), 6)}</span></dd></div>`,
        row('m wide', L('有限欧拉积 E<sub>N</sub>(s)，p ≤ N', 'Finite Euler product E<sub>N</sub>(s), p ≤ N'), cv ? cstr(ph.EN) : L('— σ ≤ 1 时不画', '— not drawn for σ ≤ 1')),
        row('wide', L('两种有限近似之差 |S<sub>N</sub> − E<sub>N</sub>|', 'Difference of the two approximants |S<sub>N</sub> − E<sub>N</sub>|'), cv ? fix(ph.gap, 6) : '—'),
        row('wide', L('M<sub>N</sub>(s) = Σ μ(n) n<sup>−s</sup> · |S<sub>N</sub>M<sub>N</sub> − 1|', 'M<sub>N</sub>(s) = Σ μ(n) n<sup>−s</sup> · |S<sub>N</sub>M<sub>N</sub> − 1|'),
          `${cstr(ph.MN)} · ${fix(ph.reciprocalGap, 6)}${cv ? '' : L('（σ ≤ 1：不作断言）', ' (σ ≤ 1: no claim)')}`),
        row('c', L('Σ<sub>n≤N</sub> |μ(n)| n<sup>−σ</sup>', 'Σ<sub>n≤N</sub> |μ(n)| n<sup>−σ</sup>'), fix(ph.absMu, 6)),
        row('mu wide', L('μ(1…12)，由逆狄利克雷卷积算出', 'μ(1…12), from the inverse Dirichlet convolution'), MU.slice(1, 13).map((m) => (m < 0 ? '−1' : String(m))).join(' '))
      ];
      note = cv
        ? L('σ > 1：两条折线走向同一处，但有限 N 下两者一般不相等（这里的差 |S<sub>N</sub> − E<sub>N</sub>| 列在上面）；页面不称其中任何一个为 ζ(s)。', 'σ > 1: both polylines head to the same place, but at finite N they are in general not equal (their difference |S<sub>N</sub> − E<sub>N</sub>| here is listed above); the page calls neither of them ζ(s).')
        : L('σ ≤ 1：级数不收敛；青色折线只是有限和，不是解析延拓，也没有误差证书。', 'σ ≤ 1: the series does not converge; the cyan polyline is only a finite sum, not the analytic continuation, with no error certificate.');
      pill1 = `s <strong>${fix(S.sigma, 2)} + ${fix(S.tIm, 2)}i</strong>`; pill2 = `n <strong>${M.n} / ${S.N}</strong>`;
    } else if (S.scene === 'quartet') {
      const q = M.q, c = q.coeffs;
      rows = [
        `<div class="key"><dt>${L('根 β + iγ 到直线 σ = ½ 的距离', 'Distance of the root β + iγ to the line σ = ½')}</dt><dd><b>${fix(q.distance, 6)}</b><span>β = ${fix(q.beta, 3)} · γ = 0.7</span></dd></div>`,
        row('wide', L('反射残差 max |Q(1 − s) − Q(s)|，12 个测试点', 'Reflection residual max |Q(1 − s) − Q(s)|, 12 test points'), sci(q.reflection)),
        row('wide', L('共轭残差 max |Q(s̄) − Q(s)*|', 'Conjugation residual max |Q(s̄) − Q(s)*|'), sci(q.conjugation)),
        row('m wide', L('四个根', 'The four roots'), `${fix(q.beta, 3)} ± 0.7i · ${fix(1 - q.beta, 3)} ± 0.7i`),
        row('wide', 'Q(s) = s⁴ + c₃s³ + c₂s² + c₁s + c₀', `${fix(c[1], 4)} · ${fix(c[2], 4)} · ${fix(c[3], 4)} · ${fix(c[4], 4)}`),
        row('wide', L('根处的 |Q|', '|Q| at the roots'), sci(Math.max(...q.rootValues)))
      ];
      note = q.distance < 1e-9
        ? L('β = ½：两对根并成直线上的二重根；这是参数选出来的，不是对称推出来的。', 'β = ½: the pairs merge into double roots on the line; the parameter put them there, not the symmetry.')
        : L('两种对称处处成立（残差是舍入量级），四个根却离开直线：对称本身推不出根在直线上。模型，不是 ζ。', 'Both symmetries hold everywhere (residuals at rounding level), yet the four roots sit off the line: symmetry alone does not put roots on it. A model, not ζ.');
      pill1 = `β <strong>${fix(q.beta, 3)}</strong>`; pill2 = `|β − ½| <strong>${fix(q.distance, 3)}</strong>`;
    } else {
      const x = S.x, xi = isInt(x), nx = Math.round(x), jump = xi && LAM[nx] > 0;
      const below = POWERS.filter((n) => n < x || (xi && n === nx));
      rows = [
        `<div class="key"><dt>${L('ψ₀(x) 与有限截断 ψ<sub>K</sub>(x)', 'ψ₀(x) and the truncation ψ<sub>K</sub>(x)')}</dt><dd><b>${fix(M.psi0, 6)} · ${fix(M.psiK, 6)}</b><span>${L('差', 'difference')} ${fix(M.psiK - M.psi0, 6)} · K = ${M.K}</span></dd></div>`,
        row('c wide', L('≤ x 的素数幂（含 4、8、9、16）', 'Prime powers ≤ x (4, 8, 9, 16 included)'), below.length ? below.join(' ') : '—'),
        row('wide', L('x 处的跳', 'The jump at x'), jump ? L(`x = ${nx} 是素数幂：取跳的一半 ½Λ(${nx}) = ${fix(LAM[nx] / 2, 6)}`, `x = ${nx} is a prime power: half the jump, ½Λ(${nx}) = ${fix(LAM[nx] / 2, 6)}`) : L('x 不是素数幂：此处没有跳', 'x is not a prime power: no jump here')),
        row('m wide', L(`所用的零点纵坐标 γ₁…γ<sub>${M.K}</sub>`, `Zero ordinates used, γ₁…γ<sub>${M.K}</sub>`), M.K ? GAMMAS.slice(0, M.K).map((g) => fix(g, 4)).join(' ') : '—'),
        row('wide', L('主项 x − log 2π − ½ log(1 − x<sup>−2</sup>)', 'Main term x − log 2π − ½ log(1 − x<sup>−2</sup>)'), fix(mainTerm(x), 6)),
        row('m wide', L(`前 K 对零点之和 −Σ 2 Re(x<sup>ρ</sup>/ρ)`, `Sum over the first K pairs −Σ 2 Re(x<sup>ρ</sup>/ρ)`), fix(M.psiK - mainTerm(x), 6))
      ];
      note = L('完整公式对全部非平凡零点（按重数、对称高度截断取极限）求和；这里只有十个线上零点，没有余项界，也不意味着零点都在线上。', 'The full formula sums over all nontrivial zeros (with multiplicity, as a limit of symmetric height cutoffs); here there are only ten line zeros, with no remainder bound, and nothing implies that all zeros lie on the line.');
      pill1 = `x <strong>${fix(S.x, 2)}</strong>`; pill2 = `K <strong>${M.K}</strong>`;
    }
    $('roList').innerHTML = rows.join('');
    $('roNote').innerHTML = note;
    $('pillParam').innerHTML = pill1; $('pillKey').innerHTML = pill2;
  }

  /* ---------- the strip ---------- */
  const PAD = [42, 12, 10, 22];
  function drawPlots(M) {
    const ca = $('plotA'), cb = $('plotB');
    if (TRV.thumbMode || !ca.clientWidth || !ca.clientHeight) return;
    if (S.scene === 'phasor') {
      const ph = M.ph;
      $('plotATitle').textContent = L('|S_n| 与 |E_p| 随 n：两种有限近似', '|S_n| and |E_p| against n: two finite approximants');
      let ymax = 0.5;
      for (const p of ph.partial) ymax = Math.max(ymax, Math.hypot(p[1], p[2]));
      if (ph.converges) for (const p of ph.euler) ymax = Math.max(ymax, Math.hypot(p[1], p[2]));
      let g = kit.plot(ca, { x: [1, S.N], y: [0, ymax * 1.12], pad: PAD });
      g.axes({ xTicks: [1, ...[16, 32, 48, 64, 80, 96].filter((v) => v <= S.N)], yTicks: [0, +fix(ymax / 2, 2), +fix(ymax, 2)], xLabel: 'n' });
      if (ph.converges) g.line(ph.euler.map(([p, re, im], i) => [p, Math.hypot(re, im)]).concat([[S.N, C.abs(ph.EN)]]), P.magenta, { width: 1.6 });
      g.line(ph.partial.map(([n, re, im]) => [n, Math.hypot(re, im)]), P.cyan, { width: 2 });
      const cur = ph.partial[M.n - 1];
      g.vline(M.n, P.amber, { alpha: 0.8 }); g.dot(M.n, Math.hypot(cur[1], cur[2]), P.amber, 4.2);
      g.legend(ph.converges ? [[P.cyan, '|S_{n}|'], [P.magenta, '|E_{p}|']] : [[P.cyan, '|S_{n}|']], { bottom: true });
      $('plotAMeta').textContent = ph.converges ? `|S_N − E_N| = ${fix(ph.gap, 6)}` : L('σ ≤ 1：只画有限和', 'σ ≤ 1: the finite sum only');
      $('plotBTitle').textContent = L('|S_n·M_n − 1| 随 n（对数纵轴）', '|S_n·M_n − 1| against n (log scale)');
      const vals = ph.recip.map(([n, v]) => [n, v >= 1e-8 ? v : NaN]);   // below the drawn range (n = 1 gives exactly 0) the curve is cut
      const hi = Math.max(10, ...vals.map((v) => v[1]).filter(Number.isFinite)) * 2;
      g = kit.plot(cb, { x: [1, S.N], y: [1e-8, hi], logY: true, pad: PAD });
      g.axes({ xTicks: [1, ...[16, 32, 48, 64, 80, 96].filter((v) => v <= S.N)], yTicks: [[1e-6, '10⁻⁶'], [1e-3, '10⁻³'], [1, '1']].filter((t) => t[0] < hi), xLabel: 'n' });
      g.line(vals, ph.converges ? P.ink : P.dim, { width: 1.8, dash: ph.converges ? [] : [4, 3] });
      g.vline(M.n, P.amber, { alpha: 0.8 }); if (Number.isFinite(vals[M.n - 1][1])) g.dot(M.n, vals[M.n - 1][1], P.amber, 4.2);
      $('plotBMeta').textContent = ph.converges ? L('σ > 1：绝对收敛', 'σ > 1: absolutely convergent') : L('σ ≤ 1：不作断言', 'σ ≤ 1: no claim');
    } else if (S.scene === 'quartet') {
      const q = M.q;
      $('plotATitle').textContent = L('|Q| 沿直线 σ = ½ 与沿 σ = β', '|Q| along the line σ = ½ and along σ = β');
      const ts = lin(TAUS[0], TAUS[1], 200), onLine = ts.map((t) => [t, C.abs(q.Q([0.5, t]))]), onBeta = ts.map((t) => [t, C.abs(q.Q([q.beta, t]))]);
      const ymax = Math.max(0.2, ...onLine.map((p) => p[1]), ...onBeta.map((p) => p[1])) * 1.1;
      let g = kit.plot(ca, { x: TAUS, y: [0, ymax], pad: PAD });
      g.axes({ xTicks: [[-1, '−1'], [-0.7, '−γ'], [0, '0'], [0.7, 'γ'], [1, '1']], yTicks: [0, +fix(ymax / 2, 2)], xLabel: 'Im s' });
      g.line(onLine, P.violet, { width: 2 });
      g.line(onBeta, P.magenta, { width: 1.6, dash: [5, 3] });
      g.legend([[P.violet, 'σ = ½'], [P.magenta, 'σ = β', 'dash']]);
      $('plotAMeta').textContent = `min |Q(½ + it)| = ${fix(Math.min(...onLine.map((p) => p[1])), 6)}`;
      $('plotBTitle').textContent = L('随 β：对称残差不变，到直线的距离在变', 'Against β: the symmetry residual stays, the distance to the line moves');
      const bs = lin(0.2, 0.8, 60), qs = bs.map((b) => quartet(b));
      g = kit.plot(cb, { x: [0.2, 0.8], y: [0, 0.32], pad: PAD });
      g.axes({ xTicks: [0.2, 0.35, 0.5, 0.65, 0.8], yTicks: [0, 0.1, 0.2, 0.3], xLabel: 'β' });
      g.line(qs.map((x) => [x.beta, x.distance]), P.ink, { width: 2 });
      g.line(qs.map((x) => [x.beta, Math.max(x.reflection, x.conjugation) * 1e14]), P.cyan, { width: 1.6 });
      g.vline(q.beta, P.amber, { alpha: 0.8 }); g.dot(q.beta, q.distance, P.amber, 4.2);
      g.legend([[P.ink, '|β − ½|'], [P.cyan, L('对称残差 × 10^{14}', 'symmetry residual × 10^{14}')]]);
      $('plotBMeta').textContent = `${sci(Math.max(q.reflection, q.conjugation))}`;
    } else {
      $('plotATitle').textContent = L('ψ₀(x) 与 ψ_K(x)：有限截断', 'ψ₀(x) and ψ_K(x): a finite truncation');
      let g = kit.plot(ca, { x: [X0, X1], y: [-1, 21], pad: PAD });
      g.axes({ xTicks: [2, 4, 8, 9, 12, 16, 20], yTicks: [0, 10, 20], xLabel: 'x' });
      g.line(LAYERS[M.K], P.magenta, { width: 1.6 });
      g.line(STAIR, P.cyan, { width: 2 });
      g.vline(S.x, P.amber, { alpha: 0.8 }); g.dot(S.x, M.psi0, P.amber, 4.2);
      g.legend([[P.cyan, 'ψ_{0}(x)'], [P.magenta, `ψ_{${M.K}}(x)`]], { bottom: true });
      $('plotAMeta').textContent = `ψ₀ = ${fix(M.psi0, 4)} · ψK = ${fix(M.psiK, 4)}`;
      $('plotBTitle').textContent = L('x 处每一对零点的贡献 −2 Re(x^ρ/ρ)', 'The contribution −2 Re(x^ρ/ρ) of each pair of zeros at x');
      const hs = GAMMAS.map((_, k) => harmonic(k, S.x)), m = Math.max(0.5, ...hs.map(Math.abs)) * 1.15;
      g = kit.plot(cb, { x: [0.4, 10.6], y: [-m, m], pad: PAD });
      g.axes({ xTicks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], yTicks: [-+fix(m / 1.15, 1), 0, +fix(m / 1.15, 1)], xLabel: 'k' });
      g.hline(0, P.dim, { alpha: 0.8 });
      hs.forEach((h, k) => g.rect(k + 1 - 0.32, 0, k + 1 + 0.32, h, k < M.K ? P.magenta : P.dim, { alpha: k < M.K ? 0.7 : 0.3 }));
      $('plotBMeta').textContent = `Σ = ${fix(hs.slice(0, M.K).reduce((a, b) => a + b, 0), 4)}`;
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlots(M);
  }, [stageEl, $('plotA'), $('plotB')]);

  /* ---------- the rail: n terms, β, or K zeros ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: S.N - 1, t: S.N - 1, rate: (S.N - 1) / 10, step: 1,
    format: (t) => (S.scene === 'phasor' ? `n = ${clamp(1 + Math.floor(t + 1e-9), 1, S.N)} <small>/ N = ${S.N}</small>`
      : S.scene === 'quartet' ? `β = ${fix(0.2 + t, 3)} <small>|β − ½| = ${fix(Math.abs(t - 0.3), 3)}</small>`
        : `K = ${clamp(Math.floor(t + 1e-9), 0, 10)} <small>${L('个零点', 'zeros')}</small>`),
    onChange: () => { if (S.scene === 'quartet') fB.set(betaNow()); paint(); }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  const leave = () => { if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); };
  const fS = kit.field($('sigma'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); S.sigma = clamp(v, 0.2, 2.5); paint(); } });
  const fT = kit.field($('tim'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); S.tIm = clamp(v, 0, 35); paint(); } });
  const fN = kit.field($('terms'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); setTerms(Math.round(v)); } });
  const fB = kit.field($('beta'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); clock.set(clamp(v, 0.2, 0.8) - 0.2); } });
  const fX = kit.field($('xval'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.x = clamp(v, X0, X1); paint(); } });
  function syncFields() { fS.set(S.sigma); fT.set(S.tIm); fN.set(S.N); fX.set(S.x); fB.set(betaNow()); }
  function setTerms(N) {
    const atEnd = S.scene === 'phasor' && clock.t >= clock.max - 1e-9;
    S.N = clamp(N, 8, NMAX);
    if (S.scene === 'phasor') { const R = railOf('phasor'); clock.rate = R.rate; clock.setMax(R.max, true); if (atEnd) clock.set(R.max); }
    fN.set(S.N); paint();
  }
  function setScene(sc, ms) {
    S.scene = ['phasor', 'quartet', 'powers'].includes(sc) ? sc : 'phasor';
    const R = railOf(S.scene);
    clock.rate = R.rate; clock.step = R.step; clock.setMax(R.max, true);
    sceneChips.set(S.scene, true);
    document.querySelectorAll('#ctlPanel .grp').forEach((g) => { g.hidden = g.dataset.scene !== S.scene; });
    FITCAM = VIEWS[S.scene].slice(); FIT = null;
    st.view(VIEWS[S.scene], ms);
    paint();
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, 600); clock.set(v === 'quartet' ? 0.1 : clock.max); syncFields(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    domain: { scene: 'phasor', sigma: 1.6, tIm: 6, N: 48, at: 0, play: true, still: 'end' },
    partial: { scene: 'phasor', sigma: 0.5, tIm: GAMMAS[0], N: 48, at: 0, play: true, still: 'end' },
    quartet: { scene: 'quartet', at: 0, play: true, still: 0.1 },
    powers: { scene: 'powers', x: 9, at: 0, play: true, still: 'end' }
  };
  const NOTES = {
    domain: ['σ = 1.6、t = 6：青色的有限和 S<sub>n</sub> 与品红的有限欧拉积 E<sub>p</sub> 沿 log n 首尾相接地走，最后停在相近的地方；可 N = 48 时它们是两个不同的数，页面不称其中任何一个为 ζ(s)。', 'σ = 1.6, t = 6: the cyan finite sum S<sub>n</sub> and the magenta finite Euler product E<sub>p</sub> walk head to tail along log n and end near each other; yet at N = 48 they are two different numbers, and the page calls neither of them ζ(s).'],
    partial: ['σ = ½、t = 14.134725（第一个零点的纵坐标）：青色的有限和并不靠近 0，n 增大时还在转。σ ≤ 1 不在级数的收敛域里：页面不画欧拉积，也不计算解析延拓。', 'σ = ½, t = 14.134725 (the ordinate of the first zero): the cyan finite sum does not approach 0 and keeps turning as n grows. σ ≤ 1 is outside the series: the page draws no Euler product and computes no analytic continuation.'],
    quartet: ['β 从 0.2 走到 0.8：品红的四个根 β ± 0.7i 与 1 − β ± 0.7i 始终关于紫色直线 σ = ½ 和实轴成镜像，只在 β = ½ 时落到线上。对称本身不把它们放到线上；这是模型，不是 ζ。', 'β runs from 0.2 to 0.8: the four magenta roots β ± 0.7i and 1 − β ± 0.7i stay mirror images across the violet line σ = ½ and across the real axis, and reach the line only at β = ½. Symmetry alone does not put them there; a model, not ζ.'],
    powers: ['x = 9：青色阶梯 ψ₀ 在素数处跳，也在素数幂 4、8、9、16 处跳；x = 9 恰是跳点，取跳的一半 ½ log 3。后面一层一层是用 K = 0…10 个线上零点的品红有限和；没有余项界。', 'x = 9: the cyan stair ψ₀ steps at primes and also at the prime powers 4, 8, 9 and 16; x = 9 is a jump, where it takes half the step, ½ log 3. Behind it, layer by layer, the magenta finite sums with K = 0…10 line zeros; no remainder bound.']
  };
  const FIGURE_NOTES = {
    domain: ['σ = 1.6：青色有限和与品红有限欧拉积停在相近处；两种有限近似，都不是 ζ(s)。', 'σ = 1.6: the cyan finite sum and the magenta finite Euler product end near each other; two finite approximants, neither is ζ(s).'],
    partial: ['σ = ½，t 取第一个零点纵坐标：有限和离 0 很远且还在转；它不是解析延拓。', 'σ = ½ at the first zero ordinate: the finite sum stays away from 0 and keeps turning; it is not the analytic continuation.'],
    quartet: ['β = 0.3：两种对称都成立，根却离紫色直线 0.2；模型，不是 ζ。', 'β = 0.3: both symmetries hold, the roots sit 0.2 off the violet line; a model, not ζ.'],
    powers: ['x = 9：阶梯在跳点取一半 ½ log 3；后面十个线上零点只给有限样本，没有余项界。', 'x = 9: the stair takes half its jump, ½ log 3; behind it ten line zeros give a finite sample, no remainder bound.']
  };
  const PARAMS = ['sigma', 'tIm', 'N', 'x'];
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    if (transition) { transition.cancel(); transition = null; }
    const same = S.scene === p.scene;
    if (p.N != null) S.N = p.N;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    const from = {}, to = {};
    for (const k of PARAMS) { from[k] = S[k]; to[k] = p[k] == null ? S[k] : p[k]; }
    const finish = () => { Object.assign(S, to); syncFields(); paint(); };
    if (booting || TRV.still || !same) finish();
    else transition = kit.tween(550, (e) => { for (const k of ['sigma', 'tIm', 'x']) S[k] = from[k] + (to[k] - from[k]) * e; syncFields(); paint(); }, finish);
    const still = p.still === 'end' ? clock.max : p.still;
    if (TRV.still || (booting && !TRV.embed)) clock.set(still);
    else clock.set(p.at);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    syncFields(); paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉参数、拖琥珀环、拖空白处转视角。随时可以再选一张卡。', 'Free play: move the parameters, drag the amber ring, drag empty space to orbit. Pick a card again at any time.']
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const viewport = (v) => { const b = stageEl.getBoundingClientRect(), q = st.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1], depth: q[2] }; };
  window.ZETA_SPECTRUM_DEBUG = Object.freeze({
    get state() {
      const ph = phasorOf(S.sigma, S.tIm, S.N), q = quartet(S.scene === 'quartet' ? betaNow() : 0.3);
      const K = S.scene === 'powers' ? kNow() : 10, x = S.x, xi = isInt(x);
      return JSON.parse(JSON.stringify({
        scene: S.scene, preset: cards.current, playing: clock.playing, t: clock.t, max: clock.max, step: clock.step,
        params: { sigma: S.sigma, tIm: S.tIm, N: S.N, beta: q.beta, x, K, n: S.scene === 'phasor' ? nNow() : S.N },
        phasor: {
          partial: ph.partial, euler: ph.euler, eulerDrawn: ph.converges, SN: ph.SN, EN: ph.EN, gap: ph.gap,
          mobius: MU.slice(1, S.N + 1), MN: ph.MN, absMu: ph.absMu, product: ph.product, reciprocalGap: ph.reciprocalGap, recip: ph.recip, primes: PRIMES.filter((p) => p <= S.N), scale: AMP
        },
        quartet: { beta: q.beta, gamma: q.gamma, roots: q.roots, coeffs: q.coeffs, tests: q.tests, reflection: q.reflection, conjugation: q.conjugation, distance: q.distance, rootValues: q.rootValues },
        powers: {
          x, K, psi0: psi0(x), psiK: psiK(x, K), main: mainTerm(x), harmonics: GAMMAS.map((_, k) => harmonic(k, x)), gammas: GAMMAS, used: GAMMAS.slice(0, K),
          primePowers: POWERS.filter((n) => n < x || (xi && n === Math.round(x))).map((n) => [n, LAM[n]]), endpoint: xi && LAM[Math.round(x)] > 0,
          curve: lin(X0, X1, 40).map((xx) => ({ x: xx, psi0: psi0(xx), psiK: psiK(xx, K) }))
        },
        camera: { yaw: st.cam.yaw, pitch: st.cam.pitch, zoom: st.cam.zoom }, handle: FRAME ? FRAME.handle : null, labels: PLACED, frame: FRAME
      }));
    },
    /** Set parameters as a reader would with the controls (leaves the card, pauses the clock). */
    setParams(o) {
      leave();
      if (o.scene) setScene(o.scene, 0);
      if (o.sigma != null) S.sigma = clamp(o.sigma, 0.2, 2.5);
      if (o.tIm != null) S.tIm = clamp(o.tIm, 0, 35);
      if (o.N != null) setTerms(Math.round(o.N));
      if (o.x != null) S.x = clamp(o.x, X0, X1);
      if (o.beta != null && S.scene === 'quartet') clock.set(clamp(o.beta, 0.2, 0.8) - 0.2);
      if (o.t != null) clock.set(o.t);
      syncFields(); paint();
    },
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport point where dragging the handle sets (σ, t), β or x, with the camera and scale of now. For x: the point of
        the stair's plane at the current stair height, or with { stair: true } the stair point (x, ψ₀(x)) itself. */
    dragTarget(o) {
      if (S.scene === 'phasor') { const w = C.add([1, 0], npow(2, o.sigma, o.tIm)); return viewport(Wn(2, w[0], w[1])); }
      if (S.scene === 'quartet') return viewport([Xs(o.beta), Yt(GAMMA_Q), 0]);
      return viewport([Xp(o.x), Yd(0), Zp(psi0(o.stair ? o.x : S.x))]);
    },
    /** The pure numerical methods of the page (for coverage only; the suite checks them with its own mathematics). */
    methods: { phasor, quartet: (b) => { const q = quartet(b); return { roots: q.roots, coeffs: q.coeffs, Q: (s) => q.Q(s) }; }, psi0, psiK, harmonic, mobius: MU.slice() }
  });
  window.TRV_THUMB = () => { cards.pick('domain'); clock.pause(); clock.set(clock.max); paint.now(); };
  cards.pick(cards.initial('domain'));
  booting = false;
  paint();
})();
