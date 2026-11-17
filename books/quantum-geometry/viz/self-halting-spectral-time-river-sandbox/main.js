/* HALT//SORT · 自指停机精度、时间长河正交折叠与测量基谱排序
   Self-halting precision, the time-river fold and measurement-basis spectral sorting (Chapter 39, §39.7).
   One 3D stage (kit.solid; x right, y away from the default viewer, z up), five scenes, one card each:
     halt   x₀ = 0, xₖ = cos xₖ₋₁. The observer stops at the first k with |xₖ − xₖ₋₁| = |cos xₖ₋₁ − xₖ₋₁| ≤ ε, i.e. once
            xₖ₋₁ lies in the residual cap {x : |cos x − x| ≤ ε} around θ*. An angle x is the point (cos x, 0, sin x) of the
            meridian in the plane I; the iterates sit on it, and half-turns about θ* (drawn, not computed) join them into a
            spiral (λ = −sin θ* < 0 flips the side each step). Rail: u = log₁₀(1/ε) ∈ [0, 3].
     fold   six modes with amplitudes σ = (1, .76, .54, .35, .2, .1) normalized; Born weight w ≥ ε stands on the wall I,
            the rest turns 90° about the hinge î into the river. Downstream, one folded mode surfaces per step (heaviest
            first) and so does one digit of the tail of θ*. ‖Π≥‖² + ‖Π<‖² = 1 at every step. Rail: t ∈ [0, 4].
     power  G = diag(σ); after Gⁿ the m-th mode stands to the first as (σₘ/σ₁)ⁿ; the violet ellipsoid has the first three as
            semi-axes. The Krylov tower span{b, Gb, …, Gᵐb}, b = (1, …, 1)/√6, grows 5 times and then stops. Rail: n ∈ [0, 8].
     basis  ψ = (1, 2, 5)/√30; B(α) the shortest turn from the position basis (α = 0°) to the DCT-II frequency basis
            (α = 90°); w(k) = ⟨bₖ|ρ|bₖ⟩ = (bₖ·ψ)². Rail: α ∈ [0°, 90°].
     zeno   N even checks across ΩT = π/2; between checks the state turns π/(4N) (amplitude angle); each check multiplies the
            staying probability by cos²(π/(4N)). Rail: u ∈ [0, N] (checks done).
   Every number is computed here. Read-only probe: window.HALT_SORT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, v3 } = kit;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI;
  const P = () => TRV.palette;
  const sum = (a) => a.reduce((s, x) => s + x, 0);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const smooth = (u) => { const x = clamp(u, 0, 1); return x * x * (3 - 2 * x); };
  const lin = (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1));
  const pct = (x, d = 2) => `${fix(100 * x, d)}%`;
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map((c) => SUB[+c] || c).join('');

  /* ---------- halt: the cosine iteration and its residual cap ---------- */
  const DOTTIE = (() => { let x = 0.74; for (let i = 0; i < 60; i++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const LAMBDA = -Math.sin(DOTTIE);
  const KMAX = 60;
  const ITER = [0];
  for (let k = 1; k <= KMAX; k++) ITER.push(Math.cos(ITER[k - 1]));
  /** The first k ≥ 1 with |xₖ − xₖ₋₁| ≤ ε (KMAX when none comes earlier). */
  function haltStep(eps) { for (let k = 1; k <= KMAX; k++) if (Math.abs(ITER[k] - ITER[k - 1]) <= eps) return k; return KMAX; }
  const gres = (x) => Math.cos(x) - x;   // strictly decreasing: g′ = −sin x − 1 ≤ 0
  function solveG(target) { let a = -1, b = 3; for (let i = 0; i < 90; i++) { const m = (a + b) / 2; if (gres(m) > target) a = m; else b = m; } return (a + b) / 2; }
  function haltCore(eps) {
    const k = haltStep(eps), lo = Math.max(0, solveG(eps)), hi = solveG(-eps);
    return { eps, k, xk: ITER[k], prev: ITER[k - 1], step: Math.abs(ITER[k] - ITER[k - 1]), lo, hi, center: (lo + hi) / 2, radius: (hi - lo) / 2,
      firstIn: k - 1, residual: Math.abs(ITER[k] - DOTTIE), iterates: ITER.slice(0, k + 1) };
  }

  /* ---------- fold: six modes, the hinge î and the digits of θ* ---------- */
  const SIGMA = [1.00, 0.76, 0.54, 0.35, 0.20, 0.10];
  const S2 = sum(SIGMA.map((s) => s * s));
  const W6 = SIGMA.map((s) => s * s / S2), A6 = W6.map(Math.sqrt);
  const DIGITS = DOTTIE.toFixed(13);              // "0.7390851332152"
  const HEAD0 = 3, TMAX = 4;
  const J = [[0, -1], [1, 0]];
  const mat2 = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
  const JJ = mat2(J, J), JT = [[J[0][0], J[1][0]], [J[0][1], J[1][1]]], JJT = mat2(J, JT);
  const QC = Math.cos(DOTTIE) ** 2, QS = Math.sin(DOTTIE) ** 2;
  const QUBIT = { diag: QC * QC + QS * QS, coherence: 2 * (Math.cos(DOTTIE) * Math.sin(DOTTIE)) ** 2, offDiag: Math.cos(DOTTIE) * Math.sin(DOTTIE) };
  function foldCore(eps, t) {
    const kept0 = W6.map((w) => w >= eps);
    let j = 0;
    const station = kept0.map((k) => (k ? 0 : ++j));   // the j-th folded mode (heaviest first) surfaces at station j
    const tf = Math.floor(t + 1e-9);
    const up = station.map((s) => s <= tf);
    const pK = A6.map((a, m) => (up[m] ? a : 0)), pF = A6.map((a, m) => (up[m] ? 0 : a));
    const keptW = dot(pK, pK), foldW = dot(pF, pF);
    const nd = HEAD0 + Math.min(TMAX, tf);
    const head = Math.trunc(DOTTIE * 10 ** nd) / 10 ** nd;
    return { eps, t, kept0, station, up, keptW, foldW, total: keptW + foldW, cross: dot(pK, pF), folded0: j, standing0: 6 - j,
      nd, head, tail: DOTTIE - head, headStr: DIGITS.slice(0, 2 + nd), tailStr: `0.${'0'.repeat(nd)}${DIGITS.slice(2 + nd, 2 + nd + 7)}…` };
  }

  /* ---------- power: (σₘ/σ₁)ⁿ, shares and the Krylov tower ---------- */
  const KRY_B = SIGMA.map(() => 1 / Math.sqrt(6));
  const KRYLOV = (() => {
    const basis = [], dims = [];
    let v = KRY_B.slice();
    for (let m = 0; m <= 8; m++) {
      if (m) v = v.map((x, i) => x * SIGMA[i]);
      let w = v.slice();
      for (let pass = 0; pass < 2; pass++) for (const q of basis) { const d = dot(w, q); w = w.map((x, i) => x - d * q[i]); }
      const nw = norm(w);
      if (nw > 1e-10 * norm(v)) basis.push(w.map((x) => x / nw));
      dims.push(basis.length);
    }
    const strict = dims.reduce((c, d, i) => c + (i && d > dims[i - 1] ? 1 : 0), dims[0] > 0 ? 0 : 0);
    return { dims, strict, bound: 6 - 1, stableFrom: dims.findIndex((d, i) => i + 1 < dims.length && d === dims[i + 1]) };
  })();
  function powerCore(n, eps) {
    const r = SIGMA.map((s) => (s / SIGMA[0]) ** n);
    const above = r.map((x) => x >= eps), R = above.filter(Boolean).length;
    const p2n = SIGMA.map((s) => s ** (2 * n)), tot = sum(p2n);
    const share = sum(p2n.slice(0, R)) / tot, raw = sum(SIGMA.slice(0, R).map((s) => s * s)) / S2;
    return { n, eps, r, above, R, share, raw, errIter: 1 - share, errRaw: 1 - raw, axes: r.slice(0, 3) };
  }

  /* ---------- basis: the turn from the position basis to the DCT-II basis ---------- */
  const F3 = (() => {
    const f0 = [1, 1, 1].map((x) => x / Math.sqrt(3)), f1 = [1, 0, -1].map((x) => x / Math.sqrt(2)), f2 = [-1, 2, -1].map((x) => x / Math.sqrt(6));
    return [[f0[0], f1[0], f2[0]], [f0[1], f1[1], f2[1]], [f0[2], f1[2], f2[2]]];   // columns f₀, f₁, f₂ (det +1)
  })();
  const F3ANG = Math.acos((F3[0][0] + F3[1][1] + F3[2][2] - 1) / 2);
  const F3AX = (() => { const s = 2 * Math.sin(F3ANG); return [(F3[2][1] - F3[1][2]) / s, (F3[0][2] - F3[2][0]) / s, (F3[1][0] - F3[0][1]) / s]; })();
  function basisR(alpha) {
    const b = alpha / 90 * F3ANG, c = Math.cos(b), s = Math.sin(b), C = 1 - c, [x, y, z] = F3AX;
    return [[c + x * x * C, x * y * C - z * s, x * z * C + y * s], [y * x * C + z * s, c + y * y * C, y * z * C - x * s], [z * x * C - y * s, z * y * C + x * s, c + z * z * C]];
  }
  const col = (M, k) => [M[0][k], M[1][k], M[2][k]];
  const PSI = [1, 2, 5].map((x) => x / Math.sqrt(30));
  function basisCore(alpha, eps) {
    const M = basisR(alpha), b = [0, 1, 2].map((k) => col(M, k)), amp = b.map((bk) => dot(bk, PSI)), w = amp.map((a) => a * a);
    const order = [0, 1, 2].sort((i, j) => w[j] - w[i]), rank = [0, 0, 0];
    order.forEach((k, i) => { rank[k] = i + 1; });
    return { alpha, eps, b, amp, w, total: sum(w), order, rank, above: w.map((x) => x >= eps), orth: Math.max(...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => Math.abs(dot(b[i], b[j]) - (i === j ? 1 : 0))))) };
  }

  /* ---------- zeno: strobe checks across ΩT = π/2 ---------- */
  function zenoCore(N, u) {
    const d = PI / (4 * N), c = Math.cos(d) ** 2, j = Math.min(N, Math.floor(u + 1e-9)), s = clamp(u - j, 0, 1);
    const surv = c ** j, leaks = Array.from({ length: j }, (_, i) => c ** i * (1 - c)), leaked = sum(leaks);
    return { N, u, d, c, j, s, surv, now: j >= N ? surv : surv * Math.cos(d * s) ** 2, leaked, ledger: leaked + surv,
      free: Math.cos((PI / 4) * (u / N)) ** 2, final: c ** N, finalFree: Math.cos(PI / 4) ** 2, leakPer: 1 - c, sin2: Math.sin(d) ** 2 };
  }

  /* ---------- state ---------- */
  const SCENES = ['halt', 'fold', 'power', 'basis', 'zeno'];
  const RAIL = {
    halt: { max: 3, step: 0.125, rate: 0.3 },
    fold: { max: TMAX, step: 1, rate: 0.55 },
    power: { max: 8, step: 1, rate: 1.1 },
    basis: { max: 90, step: 5, rate: 14 },
    zeno: { max: 16, step: 1, rate: 2.4 }
  };
  const S = { scene: 'fold', eps: 0.1, N: 16, t: 2, n: 4, alpha: 65, u: 16, lens: false, view: 'card', camFit: [-0.5, 0.5] };
  const VIEWS = { front: [0, 0.14], top: [0, 1.42] };

  function cores() {
    return { halt: haltCore(S.eps), fold: foldCore(S.eps, S.t), power: powerCore(S.n, S.eps), basis: basisCore(S.alpha, S.eps), zeno: zenoCore(S.N, S.u) };
  }

  /* ---------- the stage ---------- */
  const stageEl = $('stage');
  if (TRV.still) stageEl.classList.add('still');
  const options = { canvas: $('cv'), yaw: -0.5, pitch: 0.5, wheel: false, radius: 0.34, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('viewChips'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }

  /* labels: placed after drawing, by priority, clear of each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}|${stageEl.clientWidth < 620 || stageEl.clientHeight < 330}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, p, html, cls, o = {}) => LB.push({ key, p, html, cls, pri: o.pri || 0, r: o.r == null ? 10 : o.r, dir: o.dir || null, occ: o.occ !== false });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels(center) {
    const placed = [], cq = sc.p(center), ctx = leadCtx();
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      if (l.occ && sc.occluded(l.p, 0.03)) continue;          // a mark the solid hides gets no label
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const q = sc.p(l.p), d = l.dir ? [l.dir[0], l.dir[1]] : [q[0] - cq[0], q[1] - cq[1]], base = Math.atan2(d[1], d[0]) || -PI / 2, cands = [];
      for (const r of [l.r, l.r + 12, l.r + 28, l.r + 48]) for (const da of [0, 0.45, -0.45, 0.9, -0.9, 1.4, -1.4, 2.0, -2.0, 2.6, -2.6, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: q[0] + dx - w / 2, y: q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 3))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(ok);
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
      const cx0 = ok.x + w / 2, cy0 = ok.y + h / 2, dx = q[0] - cx0, dy = q[1] - cy0;
      if (ctx && Math.hypot(dx, dy) > 22) {
        const f = Math.min((w / 2 + 2) / Math.max(0.001, Math.abs(dx)), (h / 2 + 2) / Math.max(0.001, Math.abs(dy)));
        ctx.beginPath(); ctx.moveTo(cx0 + dx * f, cy0 + dy * f); ctx.lineTo(q[0], q[1]); ctx.stroke();
      }
    }
    PLACED = placed.map((b) => ({ x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.w), h: Math.round(b.h) }));
  }
  function leadCtx() {
    if (TRV.thumbMode) return null;
    const ov = sc.overlay(), dpr = TRV.fitCanvas(ov), c = ov.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, sc.W, sc.H);
    c.strokeStyle = P().dim; c.globalAlpha = 0.6; c.lineWidth = 0.8;
    return c;
  }

  /* ---------- shared pieces ---------- */
  const fib = (n, r, c = [0, 0, 0]) => Array.from({ length: n }, (_, i) => { const z = 1 - 2 * (i + 0.5) / n, rr = Math.sqrt(1 - z * z), a = i * PI * (3 - Math.sqrt(5)); return v3.add(c, [r * rr * Math.cos(a), r * rr * Math.sin(a), r * z]); });
  /** The far half of a ball about the view direction, opaque and lit: the ball reads as a body, its front stays open. */
  function bowl(key, c, r) {
    const D = sc.facing(), e1 = v3.unit(v3.cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = v3.cross(D, e1), p = P();
    const at = (u, v) => v3.add(c, v3.scale(v3.add(v3.scale(D, -Math.cos(u)), v3.scale(v3.add(v3.scale(e1, Math.cos(v)), v3.scale(e2, Math.sin(v))), Math.sin(u))), r * 0.985));
    sc.surface(key, at, { u: [0, PI / 2], v: [0, TAU], nu: 22, nv: 64, colors: [p.panelEdge, p.lineHot, p.sigma], value: (u, v) => at(u, v)[2] - c[2], range: [-r * 1.4, r * 2.2],
      grid: { every: [4, 8], color: p.cyan, alpha: 0.14 } });
  }
  /** A flat-shaded box: hinge edge centred at H, length along d, thickness along b, width along x. */
  function barBox(H, d, b, len, w, th) {
    const c = (sx, sl, sb) => v3.add(v3.add(v3.add(H, [sx * w / 2, 0, 0]), v3.scale(d, sl)), v3.scale(b, sb));
    return { vertices: [c(-1, 0, 0), c(1, 0, 0), c(1, len, 0), c(-1, len, 0), c(-1, 0, th), c(1, 0, th), c(1, len, th), c(-1, len, th)],
      faces: [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0]] };
  }
  const arcPts = (c, a, b, ang, n) => Array.from({ length: n + 1 }, (_, i) => { const f = ang * i / n; return v3.add(c, v3.add(v3.scale(a, Math.cos(f)), v3.scale(b, Math.sin(f)))); });

  /* ---------- scene: halt ---------- */
  const MER = (x) => [Math.cos(x), 0, Math.sin(x)];
  const TSTAR = MER(DOTTIE), T1 = [-Math.sin(DOTTIE), 0, Math.cos(DOTTIE)], T2 = [0, -1, 0];
  const onSphere = (r, phi, lift = 1.012) => v3.scale(v3.add(v3.scale(TSTAR, Math.cos(r)), v3.scale(v3.add(v3.scale(T1, -Math.cos(phi)), v3.scale(T2, -Math.sin(phi))), Math.sin(r))), lift);
  const ERR = ITER.map((x) => Math.abs(x - DOTTIE));
  /** The spiral through the iterates from half-turn k0 to k1 (φ = kπ at xₖ, radius geometric between them). */
  function spiral(k0, k1, per = 22, lift = 1.012) {
    const pts = [];
    for (let k = k0; k < k1; k++) for (let i = (k === k0 ? 0 : 1); i <= per; i++) {
      const s = i / per, r = ERR[k] ** (1 - s) * ERR[k + 1] ** s;
      pts.push(onSphere(r, PI * (k + s), lift));
    }
    return pts;
  }
  const capCentre = (h) => MER(h.center);
  const capFrame = (h) => [[-Math.sin(h.center), 0, Math.cos(h.center)], [0, -1, 0]];
  const LEVER = 0.16;
  /** A point at geodesic distance r from the cap centre, towards the right of the card camera. */
  function capRay(h, r) {
    const C = capCentre(h), [e1, e2] = capFrame(h), cy = Math.cos(S.camFit[0]), sy = Math.sin(S.camFit[0]), cp = Math.cos(S.camFit[1]), sp = Math.sin(S.camFit[1]);
    const R = v3.add([cy, -sy, 0], v3.scale([sy * sp, cy * sp, cp], -0.35)), dir = v3.unit(v3.add(v3.scale(e1, dot(R, e1)), v3.scale(e2, dot(R, e2))));
    return v3.scale(v3.add(v3.scale(C, Math.cos(r)), v3.scale(dir, Math.sin(r))), 1.012);
  }
  /** The handle: on a lever a fixed LEVER beyond the rim of the cap, so it never covers the cap itself. */
  const capRim = (eps) => { const h = haltCore(eps); return capRay(h, h.radius + LEVER); };
  function drawHalt(M, lab) {
    const h = M.halt, p = P(), op = S.lens;
    bowl('halt-bowl', [0, 0, 0], 1);
    sc.glass('halt-glass', [0, 0, 0], 1, { color: p.cyan, alpha: 0.05, rim: 0.32 });
    sc.circle([0, 0, 0], [0, 0, 1], 1, { color: p.dim, width: 1, alpha: 0.55 });
    sc.circle([0, 0, 0], [0, 1, 0], 1, { color: p.cyan, width: 1.3, alpha: 0.6 });
    // the cap {x : |cos x − x| ≤ ε}: a violet patch around θ*, its rim, and the handle on the rim
    const C = capCentre(h), [e1, e2] = capFrame(h);
    const capAt = (u, v) => v3.scale(v3.add(v3.scale(C, Math.cos(u)), v3.scale(v3.add(v3.scale(e1, Math.cos(v)), v3.scale(e2, Math.sin(v))), Math.sin(u))), 1.006);
    sc.surface('halt-cap', capAt, { u: [0, h.radius], v: [0, TAU], nu: 8, nv: 48, color: p.violet, alpha: 0.4, pick: false });
    sc.line(Array.from({ length: 65 }, (_, i) => capAt(h.radius, TAU * i / 64)).map((q) => v3.scale(q, 1.003)), { color: p.violet, width: 2.2 });
    if (!TRV.still && !TRV.thumbMode) sc.line(lin(h.radius, h.radius + LEVER, 8).map((r) => capRay(h, r)), { color: p.violet, width: 1.4, alpha: 0.8 });
    // the I axis: the locked value [0, xₖ] cyan, the residual [xₖ, θ*] magenta
    sc.line([[0, 0, 0], [1.32, 0, 0]], { color: p.cyan, width: 1.2, alpha: 0.7 });
    sc.tube('halt-locked', [[0, 0, 0], [h.xk, 0, 0]], { color: p.cyan, width: 5, glow: 0.45 });
    if (h.residual > 1e-4) sc.tube('halt-resid', [[h.xk, 0, 0], [DOTTIE, 0, 0]], { color: p.magenta, width: 5, glow: 0.45 });
    sc.bead([DOTTIE, 0, 0], { key: 'halt-axis-star', color: p.sigma, r: 3 });
    // the walked spiral, the iterates, and the folded remainder (dashed magenta)
    if (h.k >= 1) sc.tube('halt-walk', spiral(0, h.k), { color: p.sigma, width: 2.6, glow: 0.3 });
    const kEnd = Math.min(KMAX - 1, h.k + 18);
    if (h.k < kEnd) sc.line(spiral(h.k, kEnd, 14), { color: p.magenta, width: 1.6, dash: [5, 4], alpha: 0.9 });
    h.iterates.forEach((x, k) => sc.bead(v3.scale(MER(x), 1.012), { key: `halt-x${k}`, color: p.sigma, r: k === h.k ? 5.4 : 3 }));
    sc.ring(v3.scale(TSTAR, 1.012), { key: 'halt-star', color: p.sigma, r: 8, normal: TSTAR });
    if (lab) {
      want('star', v3.scale(TSTAR, 1.012), `θ* = ${fix(DOTTIE, 4)}`, 'raw ink backed', { pri: 9 });
      want('xk', v3.scale(MER(h.xk), 1.012), op ? `x${sub(h.k)} = F(x${sub(h.k - 1)}) = ${fix(h.xk, 4)}` : `${L('第', 'step')} ${h.k} ${L('步停', 'halts')} · x${sub(h.k)} = ${fix(h.xk, 4)}`, 'raw ink backed', { pri: 10 });
      want('x0', v3.scale(MER(0), 1.012), 'x₀ = 0', 'raw c-dm backed', { pri: 4 });
      want('cap', capAt(h.radius, PI), op ? `|F(x) − x| ≤ ${fix(h.eps, 3)}` : `${L('精度帽', 'precision cap')} ε = ${fix(h.eps, 3)}`, 'raw c-vi backed', { pri: 8 });
      want('locked', [h.xk / 2, 0, 0], op ? `Π<sub>≥ε</sub> · ${fix(h.xk, 4)}` : `I · ${L('锁定', 'locked')} ${fix(h.xk, 4)}`, 'raw c-cy backed', { pri: 7, dir: [0, 1] });
      if (h.residual > 1e-4) want('resid', onSphere(ERR[h.k] * 0.6, PI * (h.k + 0.5)), op ? `Π<sub>&lt;ε</sub> · ${fix(h.residual, 4)}` : `${L('折入', 'folded')} ${fix(h.residual, 4)}`, 'raw c-mg backed', { pri: 6 });
    }
    return { handle: TRV.still ? null : capRim(h.eps), center: TSTAR };
  }

  /* ---------- scene: fold ---------- */
  const XS = [-1.25, -0.75, -0.25, 0.25, 0.75, 1.25], BW = 0.3, BT = 0.1, HB = 1.4, YH = -0.1;
  const XF = [-1.5, -1.1, -0.7, 0.7, 1.1, 1.5], BWF = 0.28, RG = 0.92, GX = 0.44;   // fold: the bars leave the middle to the state ellipsoid
  const RX = 1.72, RY = 2.78, WALLH = 1.55;
  const stationY = (t) => -0.3 - 0.58 * t;
  const barLen = (m) => HB * A6[m] / A6[0];
  const riverZ = (x, y) => { const a = Math.max(0, Math.abs(x) - 1.66); return 0.7 * a * a - 0.006 + 0.004 * Math.sin(7 * y + 2 * x); };
  /** Where a mode stands at time t: its hinge point, fold angle (0 upright … π/2 lying downstream) and colour role. */
  function modePose(F, m, t) {
    const st = F.station[m];
    if (st === 0) return { H: [XF[m], YH, 0], phi: 0, up: true };
    const rise0 = st - 0.35, ys = stationY(st);
    const drift = clamp(t / Math.max(0.05, rise0), 0, 1), y = YH + (ys - YH) * drift;
    const phi = (PI / 2) * (1 - smooth((t - rise0) / 0.35));
    return { H: [XF[m], y, 0], phi, up: F.up[m] };
  }
  function riverSurface(key, colors, value) {
    sc.surface(key, (u, v) => [u, v, riverZ(u, v)], { u: [-RX, RX], v: [-RY, 0.02], nu: 48, nv: 36, colors, value, range: [0, 1],
      grid: { every: [6, 4], color: P().ink, alpha: 0.1 } });
  }
  function wall(key) {
    const p = P();
    sc.surface(key, (u, v) => [u, 0.004, v], { u: [-RX, RX], v: [0, WALLH], nu: 12, nv: 6, color: p.cyan, alpha: 0.09, grid: { every: [2, 2], color: p.cyan, alpha: 0.2 }, pick: false });
    sc.line([[-RX, 0.004, 0], [-RX, 0.004, WALLH], [RX, 0.004, WALLH], [RX, 0.004, 0]], { color: p.cyan, width: 1.2, alpha: 0.55 });
  }
  function drawFold(M, lab) {
    const F = M.fold, p = P(), op = S.lens;
    riverSurface('fold-river', [p.panelEdge, p.magenta], (u, v) => 0.04 + 0.4 * (1 + v / RY) ** 1.8);
    wall('fold-wall');
    // the hinge î and its 90° glyph
    sc.tube('fold-hinge', [[-RX, YH, 0.012], [RX, YH, 0.012]], { color: p.violet, width: 4.4, glow: 0.4 });
    const g0 = [RX + 0.22, YH, 0];
    sc.line(arcPts(g0, [0, 0, 0.38], [0, -0.38, 0], PI / 2, 18), { color: p.violet, width: 2.2 });
    sc.arrow(v3.add(g0, [0, -0.3, 0.06]), v3.add(g0, [0, -0.38, 0.0]), { color: p.violet, width: 2, headSize: 9 });
    // the six modes: standing on I (cyan) or lying in the river (magenta)
    for (let m = 0; m < 6; m++) {
      const q = modePose(F, m, S.t), d = [0, -Math.sin(q.phi), Math.cos(q.phi)], b = [0, Math.cos(q.phi), Math.sin(q.phi)];
      sc.poly(`fold-bar${m}`, barBox(q.H, d, b, barLen(m), BWF, BT), { color: q.up ? p.cyan : p.magenta, edges: p.ink });
      if (F.station[m] > 0) sc.line(arcPts([XF[m], YH, 0], [0, 0, barLen(m)], [0, -barLen(m), 0], PI / 2, 16), { color: p.violet, width: 1.3, dash: [4, 4], alpha: 0.75 });
    }
    // stations and the time cursor
    for (let s = 1; s <= TMAX; s++) sc.line([[RX - 0.16, stationY(s), 0.012], [RX, stationY(s), 0.012]], { color: p.dim, width: 1.4, alpha: 0.9 });
    const yc = stationY(S.t);
    sc.tube('fold-cursor', [[-RX + 0.04, yc, 0.03], [RX - 0.04, yc, 0.03]], { color: p.amber, width: 2.4, glow: 0.5 });
    // the state ellipsoid at the hinge: its height on I is RG·‖Π≥ψ‖, its reach into the river RG·‖Π<ψ‖
    const cb = Math.sqrt(F.keptW), sb = Math.sqrt(F.foldW), C0 = [0, YH, 0], ez = RG * cb, ey = Math.max(0.025, RG * sb), ex = 0.36;
    const ell = (u, v) => [C0[0] + ex * Math.sin(u) * Math.cos(v), C0[1] - ey * Math.sin(u) * Math.sin(v), C0[2] + ez * Math.cos(u)];
    sc.surface('fold-state', ell, { u: [0, PI / 2], v: [-0.02, PI + 0.02], nu: 22, nv: 40, colors: [p.magenta, p.violet, p.cyan],
      value: (u, v) => { const q = ell(u, v); return Math.atan2(q[2] / ez, Math.max(0, C0[1] - q[1]) / ey) / (PI / 2); }, range: [0, 1], grid: { every: [4, 5], color: p.ink, alpha: 0.18 } });
    // beside it, in the plane across the hinge: the unit circle, the cyan leg on I, the magenta leg into the river
    const G0 = [GX, YH, 0];
    sc.fan(arcPts(G0, [0, 0, RG], [0, -RG, 0], PI / 2, 18).concat([G0]), { fill: p.violet, alpha: 0.1, color: p.violet, width: 1, strokeAlpha: 0.55 });
    const tipK = v3.add(G0, [0, 0, ez]), tip = v3.add(G0, [0, -RG * sb, ez]);
    sc.tube('fold-gk', [G0, tipK], { color: p.cyan, width: 4.2, glow: 0.4 });
    if (sb > 0.004) sc.tube('fold-gf', [tipK, tip], { color: p.magenta, width: 4.2, glow: 0.4 });
    sc.arrow(G0, tip, { color: p.sigma, width: 2, headSize: 10 });
    if (lab) {
      const keptHtml = `I · <span class="hd">${F.headStr}</span>`;
      want('wall', [-RX + 0.25, 0, WALLH], op ? `Π<sub>≥</sub>ψ · ${keptHtml}` : keptHtml, 'raw c-cy backed', { pri: 9, dir: [0, -1] });
      want('tail', [RX - 0.4, -0.55, 0.05], `î · <span class="tl">${F.tailStr}</span>`, 'raw c-mg backed', { pri: 8, dir: [1, 0.4] });
      want('hinge', v3.add(g0, [0, -0.27, 0.27]), op ? 'î² = −1' : 'î · 90°', 'raw c-vi backed', { pri: 7, dir: [1, -0.2] });
      want('cursor', [RX - 0.05, yc, 0.03], `t = ${fix(S.t, 2)}`, 'raw c-am backed', { pri: 10, dir: [1, 0.3] });
      want('gk', v3.add(G0, [0, 0, ez * 0.6]), `${op ? '‖Π<sub>≥</sub>ψ‖²' : L('留在 I', 'on I')} ${fix(F.keptW, 4)}`, 'raw c-cy backed', { pri: 6, dir: [1, -0.2] });
      want('gf', tip, `${op ? '‖Π<sub>&lt;</sub>ψ‖²' : L('河里', 'river')} ${fix(F.foldW, 4)}`, 'raw c-mg backed', { pri: 5, dir: [1, 0.5] });
      want('state', [-ex * 0.7, YH - ey * 0.5, ez * 0.75], op ? 'ψ = Π<sub>≥</sub>ψ + Π<sub>&lt;</sub>ψ' : L('六模态的态', 'six-mode state'), 'raw ink backed', { pri: 4, dir: [-1, -0.6] });
    }
    return { handle: TRV.still ? null : [RX + 0.06, yc, 0.03], center: [0, -1.1, 0.4] };
  }

  /* ---------- scene: power ---------- */
  const E0 = [0.86, -1.7, 1.0], RE = 0.8;
  function drawPower(M, lab) {
    const W = M.power, p = P(), op = S.lens;
    riverSurface('power-floor', [p.panelEdge, p.lineHot], (u, v) => 0.25 + 0.5 * (1 + v / RY));
    wall('power-wall');
    for (let m = 0; m < 6; m++) {
      const len = Math.max(0.014, HB * W.r[m]);
      sc.poly(`power-bar${m}`, barBox([XS[m], YH, 0], [0, 0, 1], [0, 1, 0], len, BW, BT), { color: W.above[m] ? p.cyan : p.magenta, edges: p.ink });
    }
    const zc = HB * W.eps;
    sc.tube('power-cut', [[-RX, YH - 0.03, zc], [RX, YH - 0.03, zc]], { color: p.amber, width: 2.6, glow: 0.55 });
    // the violet ellipsoid of Gⁿ (first three modes) and its principal axes
    const ax = W.axes.map((a) => RE * Math.max(a, 0.004));
    sc.surface('power-ell', (u, v) => [E0[0] + ax[0] * Math.sin(u) * Math.cos(v), E0[1] + ax[2] * Math.sin(u) * Math.sin(v), E0[2] + ax[1] * Math.cos(u)],
      { u: [0, PI], v: [0, TAU], nu: 18, nv: 36, color: p.violet, alpha: 0.16, grid: { every: [3, 3], color: p.violet, alpha: 0.75 }, pick: false });
    const dirs = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
    dirs.forEach((d, m) => sc.tube(`power-ax${m}`, [v3.add(E0, v3.scale(d, -ax[m])), v3.add(E0, v3.scale(d, ax[m]))], { color: W.above[m] ? p.cyan : p.magenta, width: 3.2, glow: 0.35 }));
    if (lab) {
      want('cut', [RX - 0.1, YH - 0.03, zc], `ε = ${fix(W.eps, 3)} · n = ${fix(W.n, W.n % 1 ? 2 : 0)} · r = ${W.R}`, 'raw c-am backed', { pri: 10, dir: [1, -0.3] });
      want('ell', v3.add(E0, [0, 0, ax[1] + 0.02]), op ? `Gⁿ: (${W.axes.map((a) => fix(a, 3)).join(', ')})` : `${L('椭球', 'ellipsoid')} (${W.axes.map((a) => fix(a, 3)).join(', ')})`, 'raw c-vi backed', { pri: 8, dir: [0, -1] });
      want('top', [XS[0], YH, HB * W.r[0]], op ? `(σ₁/σ₁)ⁿ = 1` : L('最重的模', 'heaviest mode'), 'raw c-cy backed', { pri: 7, dir: [-0.3, -1] });
      const tailM = W.above.indexOf(false);
      if (tailM >= 0) want('tail', [XS[Math.min(5, tailM + 1)], YH, Math.max(0.02, HB * W.r[Math.min(5, tailM + 1)])], op ? `(σₘ/σ₁)ⁿ &lt; ε` : L('品红尾巴', 'magenta tail'), 'raw c-mg backed', { pri: 6, dir: [0.4, -1] });
    }
    return { handle: TRV.still ? null : [RX + 0.08, YH - 0.03, zc], center: [0, -0.8, 0.6] };
  }

  /* ---------- scene: basis ---------- */
  const basisTip = (alpha) => v3.scale(col(basisR(alpha), 0), 1.0);
  const TRAILS = [0, 1, 2].map((k) => lin(0, 90, 46).map((a) => v3.scale(col(basisR(a), k), 1.006)));
  function drawBasis(M, lab) {
    const B = M.basis, p = P(), op = S.lens;
    bowl('basis-bowl', [0, 0, 0], 1);
    sc.glass('basis-glass', [0, 0, 0], 1, { color: p.cyan, alpha: 0.05, rim: 0.3 });
    sc.circle([0, 0, 0], [0, 0, 1], 1, { color: p.dim, width: 1, alpha: 0.45 });
    TRAILS.forEach((tr, k) => sc.line(tr, { color: p.violet, width: 1.2, dash: [3, 4], alpha: k === 0 ? 0.7 : 0.4 }));
    // the state ψ
    sc.arrow([0, 0, 0], PSI, { color: p.sigma, width: 2.4, headSize: 11 });
    sc.bead(PSI, { key: 'basis-psi', color: p.sigma, r: 4 });
    // the turned triad (violet), each projection of ψ on it (cyan above ε, magenta below), the drop lines
    B.b.forEach((bk, k) => {
      sc.arrow([0, 0, 0], v3.scale(bk, 1.22), { color: p.violet, width: 2, headSize: 10 });
      const foot = v3.scale(bk, B.amp[k]);
      if (Math.abs(B.amp[k]) > 0.01) sc.tube(`basis-proj${k}`, [[0, 0, 0], foot], { color: B.above[k] ? p.cyan : p.magenta, width: 5.4, glow: 0.45 });
      sc.line([PSI, foot], { color: p.dim, width: 1, dash: [3, 3], alpha: 0.8 });
    });
    if (lab) {
      want('psi', PSI, op ? 'ρ = |ψ⟩⟨ψ|' : 'ψ = (1, 2, 5)/√30', 'raw ink backed', { pri: 9 });
      B.b.forEach((bk, k) => {
        const html = op ? `⟨b${sub(k)}|ρ|b${sub(k)}⟩ = ${fix(B.w[k], 4)}` : `b${sub(k)} · ${fix(B.w[k], 4)} · #${B.rank[k]}`;
        want(`w${k}`, v3.scale(bk, B.amp[k]), html, `raw ${B.above[k] ? 'c-cy' : 'c-mg'} backed`, { pri: 8 - B.rank[k], occ: false });
      });
      want('alpha', basisTip(B.alpha), `α = ${fix(B.alpha, 1)}°`, 'raw c-am backed', { pri: 4 });
    }
    return { handle: TRV.still ? null : basisTip(B.alpha), center: [0, 0, 0] };
  }

  /* ---------- scene: zeno ---------- */
  const ZX = 1.75, RR = 0.24, RD = 1.0;
  const zx = (u, N) => -ZX + 2 * ZX * u / N;
  const zenoHead = (u) => { const N = S.N, j = Math.min(N, Math.floor(u + 1e-9)), s = j >= N ? 0 : u - j; return [zx(u, N), 0, RD * Math.sin((PI / (2 * N)) * s)]; };
  function drawZeno(M, lab) {
    const Z = M.zeno, p = P(), N = Z.N, op = S.lens;
    sc.surface('zeno-channel', (u, v) => [u, RR * 0.72 * Math.cos(v), RR * 0.72 * Math.sin(v)], { u: [-ZX, ZX], v: [0, TAU], nu: 24, nv: 24, color: p.cyan, alpha: 0.14, pick: false });
    sc.tube('zeno-backbone', [[-ZX - 0.1, 0, 0], [ZX + 0.1, 0, 0]], { color: p.cyan, width: 5, glow: 0.45 });
    for (let j = 1; j <= N; j++) {
      const x = zx(j, N), ring = Array.from({ length: 33 }, (_, i) => [x, RR * Math.cos(TAU * i / 32), RR * Math.sin(TAU * i / 32)]);
      sc.tube(`zeno-ring${j}`, ring, { color: p.violet, width: N > 32 ? 1.6 : 2.8, glow: j <= Z.j ? 0.5 : 0.2 });
    }
    // the unwatched turn: transverse sin θ, ending at the equator
    sc.line(lin(0, N, 64).map((u) => [zx(u, N), 0, RD * Math.sin((PI / 2) * u / N)]), { color: p.dim, width: 1.6, dash: [6, 5], alpha: 0.9 });
    // the watched teeth up to now (magenta), each pinched back at its ring
    const teeth = [];
    for (let i = 0; i < Math.min(N, Math.ceil(S.u - 1e-9)); i++) {
      const sEnd = i < Z.j ? 1 : Z.s;
      for (let k = 0; k <= 8; k++) { const s = sEnd * k / 8; teeth.push([zx(i + s, N), 0, RD * Math.sin((PI / (2 * N)) * s)]); }
      if (i < Z.j) teeth.push([zx(i + 1, N), 0, 0]);
    }
    if (teeth.length > 1) sc.tube('zeno-teeth', teeth, { color: p.magenta, width: 2.2, glow: 0.45 });
    const head = zenoHead(S.u);
    sc.bead(head, { key: 'zeno-head', color: p.amber, r: 5.6 });
    if (lab) {
      want('surv', [ZX + 0.1, 0, 0], op ? `[cos²(π/${4 * N})]<sup>${N}</sup> = ${fix(Z.final, 4)}` : `${L('存活', 'stays')} ${fix(Z.surv, 4)}`, 'raw c-cy backed', { pri: 10, dir: [1, 0.6] });
      want('free', [ZX, 0, RD], `${L('不看', 'unwatched')} ${fix(Z.free, 4)}`, 'raw c-dm backed', { pri: 9, dir: [0.4, -1] });
      want('rings', [zx(Math.max(1, Math.round(N / 4)), N), 0, -RR], `N = ${N} ${L('次检查', 'checks')}`, 'raw c-vi backed', { pri: 8, dir: [0, 1] });
      want('leak', [zx(Math.max(0.5, Math.min(N - 0.5, 2.5)), N), 0, RD * Math.sin(PI / (2 * N)) + 0.02], op ? `sin²(π/${4 * N}) = ${fix(Z.sin2, 4)}` : `${L('每次漏', 'leak per check')} ${fix(Z.sin2, 4)}`, 'raw c-mg backed', { pri: 7, dir: [-0.3, -1] });
      want('head', head, `j = ${fix(S.u, 1)}`, 'raw c-am backed', { pri: 5, dir: [0, 1] });
    }
    return { handle: TRV.still ? null : head, center: [0, 0, 0.35] };
  }
  const DRAW = { halt: drawHalt, fold: drawFold, power: drawPower, basis: drawBasis, zeno: drawZeno };

  /* ---------- fit: the scene outline into the part of the stage the HUD leaves free ---------- */
  function outline(key) {
    if (key === 'halt') return fib(90, 1.03).concat([[1.34, 0, 0]]);
    if (key === 'basis') return fib(90, 1.24);
    if (key === 'fold') return [[-RX, 0, 0], [RX, 0, 0], [-RX, -RY, 0], [RX, -RY, 0], [-RX, 0, WALLH], [RX, 0, WALLH], [RX + 0.3, YH - 0.4, 0], [RX + 0.22, YH, 0.4]];
    if (key === 'power') return [[-RX, 0, 0], [RX, 0, 0], [-RX, -RY, 0], [RX, -RY, 0], [-RX, 0, WALLH], [RX, 0, WALLH], [RX + 0.1, YH, 0]].concat(fib(40, RE, E0));
    return [[-ZX - 0.12, 0, 0], [ZX + 0.12, 0, 0]].flatMap((p) => [[p[0], RR, RR], [p[0], -RR, -RR], [p[0], RR, -RR], [p[0], -RR, RR], [p[0], 0, RD + 0.05]]);
  }
  function hull2(pts) {
    const q = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [], upper = [];
    for (const p of q) { while (lower.length >= 2 && cr(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
    for (const p of q.reverse()) { while (upper.length >= 2 && cr(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
    return lower.slice(0, -1).concat(upper.slice(0, -1));
  }
  /** Separating-axis test of a convex polygon (screen) against a rectangle. */
  function polyRect(poly, r) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const [x, y] of poly) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    if (x1 <= r.x0 || x0 >= r.x1 || y1 <= r.y0 || y0 >= r.y1) return false;
    const corners = [[r.x0, r.y0], [r.x1, r.y0], [r.x1, r.y1], [r.x0, r.y1]];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], n = [a[1] - b[1], b[0] - a[0]];
      let p0 = Infinity, p1 = -Infinity, c0 = Infinity, c1 = -Infinity;
      for (const p of poly) { const d = p[0] * n[0] + p[1] * n[1]; p0 = Math.min(p0, d); p1 = Math.max(p1, d); }
      for (const p of corners) { const d = p[0] * n[0] + p[1] * n[1]; c0 = Math.min(c0, d); c1 = Math.max(c1, d); }
      if (c1 <= p0 || c0 >= p1) return false;
    }
    return true;
  }
  const CAPF = { halt: 0.34, basis: 0.36, fold: 0.5, power: 0.5, zeno: 0.46 };
  const fitCache = new Map();
  let lastFit = null;
  function fitFor(key, W, H, huds) {
    const cam = S.camFit, q = (v) => Math.ceil(v / 12) * 12;
    const rects = huds.map((b) => ({ x0: Math.floor((b.x - 6) / 12) * 12, y0: Math.floor((b.y - 6) / 12) * 12, x1: q(b.x + b.w + 6), y1: q(b.y + b.h + 6) }));
    const sig = `${key}|${W}|${H}|${cam[0]}|${cam[1]}|${rects.map((r) => [r.x0, r.y0, r.x1, r.y1].join(',')).join(';')}`;
    if (fitCache.has(sig)) return fitCache.get(sig);
    const cy0 = Math.cos(cam[0]), sy0 = Math.sin(cam[0]), cp = Math.cos(cam[1]), sp = Math.sin(cam[1]);
    const Rv = [cy0, -sy0, 0], Uv = [sy0 * sp, cy0 * sp, cp];
    const hull = hull2(outline(key).map((p) => [dot(p, Rv), dot(p, Uv)]));
    let amin = Infinity, amax = -Infinity, bmin = Infinity, bmax = -Infinity, area = 0;
    hull.forEach(([a, b], i) => { amin = Math.min(amin, a); amax = Math.max(amax, a); bmin = Math.min(bmin, b); bmax = Math.max(bmax, b); const n = hull[(i + 1) % hull.length]; area += a * n[1] - n[0] * b; });
    area = Math.abs(area) / 2;
    const Mg = 10, am = (amin + amax) / 2;
    const place = (u) => {
      const cx = W / 2 - u * am, lo = Mg + u * bmax, hi = H - Mg + u * bmin;
      if (lo > hi + 1e-9 || cx + u * amin < Mg - 1e-9 || cx + u * amax > W - Mg + 1e-9) return null;
      const mid = (lo + hi) / 2, span = Math.max(0, hi - lo);
      for (let k = 0; k <= 48; k++) {
        const cyC = k === 0 ? mid : mid + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * span / 48;
        const poly = hull.map(([a, b]) => [cx + u * a, cyC - u * b]);
        if (!rects.some((r) => polyRect(poly, r))) return { cx, cy: cyC };
      }
      return null;
    };
    const uCap = Math.sqrt((CAPF[key] || 0.4) * W * H / Math.max(area, 1e-6));
    let lo = 8, hi = Math.min(uCap, (W - 2 * Mg) / Math.max(1e-6, amax - amin), (H - 2 * Mg) / Math.max(1e-6, bmax - bmin));
    if (place(hi)) lo = hi; else for (let it = 0; it < 22; it++) { const mid = (lo + hi) / 2; if (place(mid)) lo = mid; else hi = mid; }
    const u = Math.max(4, lo), at = place(u) || { cx: W / 2 - u * am, cy: H / 2 + u * (bmin + bmax) / 2 };
    const fit = { unit: u, cx: at.cx, cy: at.cy };
    fitCache.set(sig, fit);
    if (fitCache.size > 80) fitCache.delete(fitCache.keys().next().value);
    return fit;
  }

  let FRAME = null;
  function drawStage(M) {
    const W0 = stageEl.clientWidth, H0 = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes(), key = S.scene;
    const fit = dragging && lastFit && lastFit.key === key ? lastFit : Object.assign({ key }, fitFor(key, W0, H0, huds));
    lastFit = fit;
    const base = Math.max(1, Math.min(W0, H0));
    options.radius = fit.unit / base; options.cx = fit.cx / Math.max(1, W0); options.cy = fit.cy / Math.max(1, H0);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W0 - 12, h: H0 - 12 }; LB = [];
    const lab = !thumb;
    sc.begin();
    const r = DRAW[key](M, lab);
    sc.end();
    const hq = r.handle && !thumb ? sc.p(r.handle) : null;
    const visible = !!hq && hq[0] > 14 && hq[0] < W0 - 14 && hq[1] > 14 && hq[1] < H0 - 14 && !sc.occluded(r.handle, 0.06) && !OBST.some((b) => hq[0] > b.x - 4 && hq[0] < b.x + b.w + 4 && hq[1] > b.y - 4 && hq[1] < b.y + b.h + 4);
    placeHandle(visible ? hq : null);
    if (visible) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    if (lab) placeLabels(r.center);
    FRAME = { W: W0, H: H0, unit: sc.unit, handle: visible ? { x: hq[0], y: hq[1] } : null, key };
  }

  /* ---------- the handle: an amber ring on the card's parameter; drag it ---------- */
  const handle = $('handle');
  let dragging = null;
  const HANDLE = {
    halt: { grid: () => lin(-3, 0, 301).map((e) => 10 ** e), point: (e) => capRim(e), set: (e) => { clock.set(-Math.log10(e)); S.eps = Math.round(e * 1000) / 1000 || 0.001; fEps.set(S.eps); paint(); }, get: () => S.eps },
    fold: { grid: () => lin(0, TMAX, 401), point: (t) => [RX + 0.06, stationY(t), 0.03], set: (t) => clock.set(t), get: () => S.t },
    power: { grid: () => lin(0.005, 0.95, 190), point: (e) => [RX + 0.08, YH - 0.03, HB * e], set: (e) => setEps(Math.round(e * 1000) / 1000), get: () => S.eps },
    basis: { grid: () => lin(0, 90, 181), point: (a) => basisTip(a), set: (a) => clock.set(a), get: () => S.alpha },
    zeno: { grid: () => lin(0, S.N, S.N * 20 + 1), point: (u) => zenoHead(u), set: (u) => clock.set(u), get: () => S.u }
  };
  function placeHandle(q) {
    const show = !!q && !TRV.still && !TRV.thumbMode;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The value of the card's handle parameter whose anchor projects nearest to the pointer. */
  function paramAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, H = HANDLE[S.scene];
    let best = H.get(), bd = Infinity;
    for (const v of H.grid()) { const q = sc.p(H.point(v)), d = Math.hypot(q[0] - x, q[1] - y); if (d < bd) { bd = d; best = v; } }
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
    cards.mark(null); clock.pause();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    const v = paramAt(ev), H = HANDLE[S.scene];
    if (Math.abs(v - H.get()) > 1e-12) H.set(v);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); cards.mark(null); clock.pause();
    const H = HANDLE[S.scene], g = H.grid(), cur = H.get();
    let i = 0, bd = Infinity; g.forEach((v, k) => { const d = Math.abs(v - cur); if (d < bd) { bd = d; i = k; } });
    const step = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    H.set(g[clamp(i + step * Math.max(1, Math.round(g.length / 60)), 0, g.length - 1)]);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const NAMES = {
    halt: ['停机窗口', 'Halting window'], fold: ['正交折叠', 'Orthogonal fold'], power: ['幂迭代排序', 'Power-iteration sort'],
    basis: ['换基排序', 'Basis re-ranking'], zeno: ['频闪雕基', 'Strobe sculpting']
  };
  function hudText(M) {
    const op = S.lens, k = S.scene;
    let big, sub2, leg;
    if (k === 'halt') {
      const h = M.halt;
      big = `${L(...NAMES.halt)} · ε = ${fix(h.eps, 3)} · k = ${h.k}`;
      sub2 = op ? `|F(x${sub(h.k - 1)}) − x${sub(h.k - 1)}| = ${fix(h.step, 4)} ≤ ε · Π<sub>&lt;ε</sub> = ${fix(h.residual, 4)}`
        : `${L('第一次相邻两步差', 'first step to move')} ≤ ε: |x${sub(h.k)} − x${sub(h.k - 1)}| = ${fix(h.step, 4)}`;
      leg = [['cy', L('锁定值 x<sub>k</sub>', 'locked value x<sub>k</sub>')], ['mg', L('折入的余差与螺旋', 'folded residual and spiral')], ['vi', L('精度帽 ε', 'precision cap ε')], ['am', L('拖动 ε', 'drag ε')]];
    } else if (k === 'fold') {
      const F = M.fold;
      big = `${L(...NAMES.fold)} · ε = ${fix(F.eps, 3)} · t = ${fix(S.t, 2)}`;
      sub2 = op ? `‖Π<sub>≥</sub>ψ‖² + ‖Π<sub>&lt;</sub>ψ‖² = ${fix(F.keptW, 4)} + ${fix(F.foldW, 4)} = ${fix(F.total, 4)}`
        : `${L('留在 I', 'on I')} ${fix(F.keptW, 4)} + ${L('折在河里', 'in the river')} ${fix(F.foldW, 4)} = ${fix(F.total, 4)}`;
      leg = [['cy', L('I 墙：立着的模', 'wall I: standing modes')], ['mg', L('î 河：折入的模', 'river î: folded modes')], ['vi', L('铰链 î · 90°', 'hinge î · 90°')], ['am', L('时间步 t', 'time step t')]];
    } else if (k === 'power') {
      const W = M.power;
      big = `${L(...NAMES.power)} · n = ${fix(W.n, W.n % 1 ? 2 : 0)} · r = ${W.R}`;
      sub2 = op ? `‖Gⁿ<sub>r</sub>‖²/‖Gⁿ‖² = ${pct(W.share)} · ‖G<sub>r</sub>‖²/‖G‖² = ${pct(W.raw)}`
        : `${L('前', 'top')} ${W.R} ${L('模份额', 'modes hold')} ${pct(W.share)} · ${L('原始', 'raw')} ${pct(W.raw)}`;
      leg = [['cy', L('过 ε 的模与主轴', 'modes and axes above ε')], ['mg', L('压下去的尾巴', 'suppressed tail')], ['vi', L('Gⁿ 椭球', 'ellipsoid of Gⁿ')], ['am', L('截断线 ε', 'cutoff ε')]];
    } else if (k === 'basis') {
      const B = M.basis;
      big = `${L(...NAMES.basis)} · α = ${fix(B.alpha, 1)}°`;
      sub2 = `${op ? 'Σ ⟨b<sub>k</sub>|ρ|b<sub>k</sub>⟩' : L('三个权重之和', 'the three weights add to')} = ${fix(B.total, 4)} · ${B.order.map((i) => `b${sub(i)}`).join(' &gt; ')}`;
      leg = [['cy', L('过 ε 的分量', 'components above ε')], ['mg', L('降级的分量', 'demoted components')], ['vi', L('基底 B(α)', 'basis B(α)')], ['am', L('拖动 α', 'drag α')]];
    } else {
      const Z = M.zeno;
      big = `${L(...NAMES.zeno)} · N = ${Z.N} · j = ${fix(S.u, 1)}`;
      sub2 = op ? `[cos²(π/(4N))]<sup>j</sup> = ${fix(Z.surv, 4)} · ${L('漏 + 存', 'leak + stay')} = ${fix(Z.ledger, 4)}`
        : `${L('看着', 'watched')} ${fix(Z.surv, 4)} · ${L('不看', 'unwatched')} ${fix(Z.free, 4)} · ${L('漏 + 存', 'leak + stay')} = ${fix(Z.ledger, 4)}`;
      leg = [['cy', L('稳住的基态脊', 'stabilized backbone')], ['mg', L('平方阶的横漏', 'quadratic leak')], ['vi', L('频闪环', 'strobe rings')], ['am', L('当前检查', 'current check')]];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub2;
    $('legend').innerHTML = leg.map(([c, s]) => `<span><i class="sw ${c}"></i>${s}</span>`).join('');
  }
  const ro = (cls, dt, dd) => `<div class="${cls}"><dt>${dt}</dt><dd>${dd}</dd></div>`;
  const roKey = (dt, b, rest) => `<div class="key"><dt>${dt}</dt><dd><b>${b}</b><span>${rest}</span></dd></div>`;
  function drawText(M) {
    const k = S.scene;
    let rows, note, aside, ctl;
    if (k === 'halt') {
      const h = M.halt;
      rows = [roKey(L('停机步 k', 'Halting step k'), `k = ${h.k}`, ` · x${sub(h.k)} = ${fix(h.xk, 4)}`),
        ro('v', L('相邻两步差 |x<sub>k</sub> − x<sub>k−1</sub>|', 'Last step |x<sub>k</sub> − x<sub>k−1</sub>|'), `${fix(h.step, 4)} ≤ ${fix(h.eps, 3)}`),
        ro('v', L('残差帽 |cos x − x| ≤ ε', 'Residual cap |cos x − x| ≤ ε'), `[${fix(h.lo, 4)}, ${fix(h.hi, 4)}] · ${L('首入', 'first in')} x${sub(h.firstIn)}`),
        ro('c', L('锁定值 x<sub>k</sub>', 'Locked value x<sub>k</sub>'), fix(h.xk, 4)),
        ro('m', L('折入的余差 |x<sub>k</sub> − θ*|', 'Folded residual |x<sub>k</sub> − θ*|'), fix(h.residual, 4)),
        ro('', 'θ* = cos θ* · λ = −sin θ*', `${fix(DOTTIE, 10)} · ${fix(LAMBDA, 4)}`)];
      note = L('ε 越细，停得越晚：ε → 0 时帽缩成 θ*，步数无界；ε = 1 时 x₀ 已在帽里，第一次检查就停。', 'The finer ε, the later the stop: as ε → 0 the cap shrinks to θ* and the count grows without bound; at ε = 1 the start x₀ is already inside the cap and the first check stops.');
      aside = `ε = ${fix(h.eps, 3)}`;
      ctl = L('时间轴是 log₁₀(1/ε)：从 ε = 1 扫到 0.001。拖帽边上的琥珀环也能改 ε。', 'The rail is log₁₀(1/ε): it sweeps ε from 1 down to 0.001. Dragging the amber ring on the rim of the cap changes ε too.');
    } else if (k === 'fold') {
      const F = M.fold;
      rows = [roKey('‖Π<sub>≥</sub>‖² + ‖Π<sub>&lt;</sub>‖²', fix(F.total, 4), ` · t = ${fix(S.t, 2)}`),
        ro('c', L('留在 I 上 ‖Π<sub>≥</sub>ψ‖²', 'On I ‖Π<sub>≥</sub>ψ‖²'), fix(F.keptW, 4)),
        ro('m', L('折在河里 ‖Π<sub>&lt;</sub>ψ‖²', 'In the river ‖Π<sub>&lt;</sub>ψ‖²'), fix(F.foldW, 4)),
        ro('', L('ε 处立着 / 折入', 'Standing / folded at ε'), `${F.standing0} / ${F.folded0}`),
        ro('', L('θ* 的头 | 尾', 'Head | tail of θ*'), `${F.headStr} | ${F.tailStr}`),
        ro('', L('θ* 量子比特：对角 + 相干', 'θ* qubit: diagonal + coherence'), `${fix(QUBIT.diag, 4)} + ${fix(QUBIT.coherence, 4)} = ${fix(QUBIT.diag + QUBIT.coherence, 4)}`),
        ro('v', 'î² = −1', `[[${fix(JJ[0][0], 0)}, ${fix(JJ[0][1], 0)}], [${fix(JJ[1][0], 0)}, ${fix(JJ[1][1], 0)}]]`)];
      note = L('六个玻恩权重 0.4898、0.2829、0.1428、0.0600、0.0196、0.0049：ε 以上的立在 I 墙上，以下的转 90° 躺进河里；下游每步浮出一份，两份之和始终是 1。', 'The six Born weights are 0.4898, 0.2829, 0.1428, 0.0600, 0.0196, 0.0049: those at or above ε stand on the wall I, the rest turn 90° into the river; one surfaces per step downstream, and the two parts always add up to 1.');
      aside = `ε = ${fix(F.eps, 3)}`;
      ctl = L('时间轴是下游步数 t ∈ [0, 4]；拖河右岸的琥珀环也能走。ε 决定一开始哪些模立着。', 'The rail is the downstream step t ∈ [0, 4]; the amber ring on the right bank moves it too. ε decides which modes stand at the start.');
    } else if (k === 'power') {
      const W = M.power;
      rows = [roKey(L(`前 ${W.R} 模份额（Gⁿ）`, `Share of the top ${W.R} (Gⁿ)`), pct(W.share), ` · n = ${fix(W.n, W.n % 1 ? 2 : 0)}`),
        ro('c', '(σ<sub>m</sub>/σ<sub>1</sub>)ⁿ', W.r.map((x) => fix(x, x < 0.01 ? 4 : 3)).join(', ')),
        ro('', L(`原始秩 ${W.R} 能量（G）`, `Raw rank-${W.R} energy (G)`), pct(W.raw)),
        ro('m', L('截断误差²：Gⁿ / G', 'Squared truncation error: Gⁿ / G'), `${pct(W.errIter)} / ${pct(W.errRaw)}`),
        ro('v', L('克雷洛夫维数 dim 𝒦<sub>m</sub>', 'Krylov dimension dim 𝒦<sub>m</sub>'), KRYLOV.dims.join(', ')),
        ro('v', L('严格增长次数 ≤ dim V − rank C', 'Strict steps ≤ dim V − rank C'), `${KRYLOV.strict} ≤ 6 − 1`)];
      note = L('同一份谱 σ = (1.00, 0.76, 0.54, 0.35, 0.20, 0.10)：迭代 n 次后第 m 模只剩 (σₘ/σ₁)ⁿ，重的越来越突出，轻的沉到 ε 以下。', 'The same spectrum σ = (1.00, 0.76, 0.54, 0.35, 0.20, 0.10): after n iterations the m-th mode keeps only (σₘ/σ₁)ⁿ, so the heavy ones stand out more and more while the light ones sink below ε.');
      aside = `ε = ${fix(W.eps, 3)}`;
      ctl = L('时间轴是迭代次数 n ∈ [0, 8]；拖墙右侧的琥珀环改截断线 ε。', 'The rail is the number of iterations n ∈ [0, 8]; the amber ring at the right of the wall moves the cutoff ε.');
    } else if (k === 'basis') {
      const B = M.basis;
      rows = [roKey('Σ w<sub>B</sub>(k)', fix(B.total, 4), ` · α = ${fix(B.alpha, 1)}°`)].concat(
        [0, 1, 2].map((i) => ro(B.above[i] ? 'c' : 'm', `w(b${sub(i)}) = ⟨b${sub(i)}|ρ|b${sub(i)}⟩ · #${B.rank[i]}`, fix(B.w[i], 4))),
        [ro('', L('排序', 'Order'), B.order.map((i) => `b${sub(i)}`).join(' &gt; ')),
          ro('v', L('三脚架正交性 max|bᵢ·bⱼ − δᵢⱼ|', 'Triad orthonormality max|bᵢ·bⱼ − δᵢⱼ|'), B.orth.toExponential(1).replace('e-', 'e−'))]);
      note = L('ψ = (1, 2, 5)/√30。位置基里排序 0.8333、0.1333、0.0333；频率基里倒过来 0.7111、0.2667、0.0222。用什么基去量，什么就排在前面。', 'ψ = (1, 2, 5)/√30. In the position basis the order is 0.8333, 0.1333, 0.0333; in the frequency basis it is reversed, 0.7111, 0.2667, 0.0222. The basis you measure in decides what comes first.');
      aside = `ε = ${fix(B.eps, 3)}`;
      ctl = L('时间轴是基底角 α ∈ [0°, 90°]：0° 是位置基，90° 是 DCT-II 频率基；拖 b₀ 端的琥珀环也能转。', 'The rail is the basis angle α ∈ [0°, 90°]: 0° is the position basis, 90° the DCT-II frequency basis; the amber ring at the tip of b₀ turns it too.');
    } else {
      const Z = M.zeno;
      rows = [roKey(L(`存活（N = ${Z.N}）`, `Stays (N = ${Z.N})`), fix(Z.final, 4), ` · ${L('不看', 'unwatched')} ${fix(Z.finalFree, 4)}`),
        ro('c', L(`${Z.j} 次检查后留在 |0⟩`, `In |0⟩ after ${Z.j} checks`), fix(Z.surv, 4)),
        ro('m', L('每次横漏 sin²(π/(4N))', 'Leak per check sin²(π/(4N))'), fix(Z.sin2, 4)),
        ro('', L('已漏 + 存活', 'Leaked + staying'), `${fix(Z.leaked, 4)} + ${fix(Z.surv, 4)} = ${fix(Z.ledger, 4)}`),
        ro('', L('此刻不看的话', 'Unwatched at this moment'), fix(Z.free, 4)),
        ro('v', L('每段转角 π/(4N)', 'Turn per interval π/(4N)'), `${fix(Z.d, 4)} rad`)];
      note = L('不看时态在 ΩT = π/2 内转到赤道，留下 0.5000；均匀检查 N 次，每次只转 π/(4N)，留下的概率每次乘 cos²(π/(4N))，漏失是步长的平方阶。', 'Unwatched, the state turns to the equator within ΩT = π/2 and stays with 0.5000; with N even checks it turns only π/(4N) between them, each check multiplies the staying probability by cos²(π/(4N)), and the leak is of the order of the square of the step.');
      aside = `N = ${Z.N}`;
      ctl = L('时间轴是已做的检查 j ∈ [0, N]；拖走廊上的琥珀珠也能走。', 'The rail is the number of checks done, j ∈ [0, N]; the amber bead in the corridor moves it too.');
    }
    $('roList').innerHTML = rows.join('');
    $('roNote').textContent = note;
    $('ctlAside').textContent = aside;
    $('ctlNote').textContent = ctl;
    $('pillEps').textContent = k === 'zeno' ? `N ${S.N}` : fix(S.eps, 3);
    const key = k === 'halt' ? `k <strong>${M.halt.k}</strong>` : k === 'fold' ? `Σ <strong>${fix(M.fold.total, 4)}</strong>` : k === 'power' ? `r <strong>${M.power.R}</strong>`
      : k === 'basis' ? `Σw <strong>${fix(M.basis.total, 4)}</strong>` : `P <strong>${fix(M.zeno.surv, 4)}</strong>`;
    $('pillKey').innerHTML = key;
    for (const g of document.querySelectorAll('#ctlPanel .grp')) g.hidden = !g.dataset.scene.split(' ').includes(k);
    lensBtn.setAttribute('aria-pressed', String(S.lens));
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    halt: ['停机步数 k 随自定精度 ε 变细而增长', 'The halting step k grows as the chosen precision ε gets finer'],
    fold: ['每一步：留在 I 上的 + 折在河里的 = 1', 'Each step: what stands on I + what lies in the river = 1'],
    power: ['(σₘ/σ₁)ⁿ：谁还留在 ε 之上', '(σₘ/σ₁)ⁿ: which modes stay above ε'],
    basis: ['转动基底，三个瑞利权重换位', 'Turning the basis re-ranks the three Rayleigh weights'],
    zeno: ['看得越勤，留得越多', 'The more often watched, the more stays']
  };
  function drawPlot(M) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight || TRV.thumbMode) return;
    const p = P(), pad = [38, 12, 10, 22], k = S.scene;
    $('plotTitle').textContent = L(...PLOTS[k]);
    let meta = '';
    if (k === 'halt') {
      const g = kit.plot(cv, { x: [0, 3], y: [0, 20], pad });
      g.axes({ xTicks: [[0, '1'], [1, '0.1'], [2, '0.01'], [3, '0.001']], yTicks: [0, 5, 10, 15, 20], xLabel: 'ε' });
      const us = lin(0, 3, 241);
      g.line(us.map((u) => [u, haltStep(10 ** -u)]), p.violet, { width: 2 });
      const u0 = -Math.log10(S.eps), h = M.halt;
      g.vline(u0, p.amber, { alpha: 0.85 }); g.dot(u0, h.k, p.amber, 4);
      meta = `ε = ${fix(h.eps, 3)} · k = ${h.k} · |x${sub(h.k)} − x${sub(h.k - 1)}| = ${fix(h.step, 4)}`;
    } else if (k === 'fold') {
      const g = kit.plot(cv, { x: [0, TMAX], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 1, 2, 3, 4], yTicks: [0, 0.5, 1], xLabel: 't' });
      const ts = lin(0, TMAX, 161), fk = ts.map((t) => foldCore(S.eps, t));
      g.area(ts.map((t, i) => [t, fk[i].keptW]), p.cyan, { alpha: 0.3 });
      g.line(ts.map((t, i) => [t, fk[i].keptW]), p.cyan, { width: 2 });
      g.line(ts.map((t, i) => [t, fk[i].total]), p.magenta, { width: 1.6, dash: [4, 3] });
      g.vline(S.t, p.amber, { alpha: 0.85 }); g.dot(S.t, M.fold.keptW, p.amber, 4);
      meta = `${fix(M.fold.keptW, 4)} + ${fix(M.fold.foldW, 4)} = ${fix(M.fold.total, 4)}`;
    } else if (k === 'power') {
      const g = kit.plot(cv, { x: [0, 8], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 2, 4, 6, 8], yTicks: [0, 0.5, 1], xLabel: 'n' });
      const ns = lin(0, 8, 161);
      for (let m = 1; m < 6; m++) g.line(ns.map((n) => [n, (SIGMA[m] / SIGMA[0]) ** n]), M.power.above[m] ? p.cyan : p.magenta, { width: 1.6 });
      g.hline(S.eps, p.amber, { alpha: 0.8, dash: [4, 3] });
      g.vline(S.n, p.amber, { alpha: 0.85 });
      meta = `n = ${fix(S.n, 2)} · ${L('前', 'top')} ${M.power.R}: ${pct(M.power.share)}`;
    } else if (k === 'basis') {
      const g = kit.plot(cv, { x: [0, 90], y: [0, 1], pad });
      g.axes({ xTicks: [[0, '0°'], [30, '30°'], [60, '60°'], [90, '90°']], yTicks: [0, 0.5, 1], xLabel: 'α' });
      const as = lin(0, 90, 181), bs = as.map((a) => basisCore(a, S.eps));
      for (let i = 0; i < 3; i++) g.line(as.map((a, j) => [a, bs[j].w[i]]), M.basis.above[i] ? p.cyan : p.magenta, { width: 2 });
      g.hline(S.eps, p.amber, { alpha: 0.8, dash: [4, 3] });
      g.vline(S.alpha, p.amber, { alpha: 0.85 });
      meta = `α = ${fix(S.alpha, 1)}° · ${M.basis.w.map((w) => fix(w, 4)).join(' + ')} = ${fix(M.basis.total, 4)}`;
    } else {
      const Z = M.zeno, g = kit.plot(cv, { x: [0, Z.N], y: [0.4, 1.02], pad });
      g.axes({ xTicks: [0, Z.N / 2, Z.N].map((x) => [x, fix(x, 0)]), yTicks: [0.5, 0.75, 1], xLabel: 'j' });
      const us = lin(0, Z.N, 241);
      g.line(us.map((u) => [u, Math.cos((PI / 4) * (u / Z.N)) ** 2]), p.dim, { width: 1.6, dash: [5, 4] });
      g.line(us.map((u) => [u, zenoCore(Z.N, u).surv]), p.cyan, { width: 2.2 });
      g.vline(S.u, p.amber, { alpha: 0.85 }); g.dot(S.u, Z.surv, p.amber, 4);
      meta = `N = ${Z.N} · ${fix(Z.surv, 4)} · ${L('不看', 'unwatched')} ${fix(Z.free, 4)}`;
    }
    $('plotMeta').textContent = meta;
  }

  /* ---------- painter ---------- */
  let LAST = null;
  const paint = kit.painter(() => {
    const M = cores();
    drawText(M); hudText(M); TRV.hudFit();
    drawStage(M); drawPlot(M);
    LAST = M;
  }, [stageEl, $('plot')]);

  /* ---------- the rail: one quantity per scene ---------- */
  const railLabel = (t) => {
    const k = S.scene;
    if (k === 'halt') return `ε = ${fix(10 ** -t, 3)} · k = ${haltStep(10 ** -t)}`;
    if (k === 'fold') return `t = ${fix(t, 2)} <small>/ ${TMAX}</small>`;
    if (k === 'power') return `n = ${fix(t, 2)} <small>/ 8</small>`;
    if (k === 'basis') return `α = ${fix(t, 1)}° <small>/ 90°</small>`;
    return `j = ${fix(t, 1)} <small>/ ${S.N}</small>`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: TMAX, t: 2, rate: RAIL.fold.rate, step: 1, loop: true,
    format: (t) => railLabel(t),
    onChange: (t) => {
      const k = S.scene;
      if (k === 'halt') { S.eps = clamp(10 ** -t, 0.001, 1); fEps.set(Math.round(S.eps * 1000) / 1000); }
      else if (k === 'fold') S.t = t;
      else if (k === 'power') S.n = t;
      else if (k === 'basis') S.alpha = t;
      else S.u = t;
      paint();
    }
  });
  function railFor(scene) {
    const r = RAIL[scene];
    clock.step = r.step; clock.rate = r.rate;
    clock.setMax(scene === 'zeno' ? S.N : r.max, true);
  }

  /* ---------- controls ---------- */
  const lensBtn = $('lensBtn');
  const fEps = kit.field($('eps'), { fmt: (v) => fix(v, 3), onInput: (v) => { cards.mark(null); setEps(v); } });
  const fChecks = kit.field($('checks'), { fmt: (v) => fix(v, 0), onInput: (v) => { cards.mark(null); setN(v); } });
  function setEps(v) {
    S.eps = clamp(Math.round(v * 1000) / 1000, 0.001, 1); fEps.set(S.eps);
    if (S.scene === 'halt') { clock.pause(); clock.set(-Math.log10(S.eps), true); S.eps = clamp(Math.round(v * 1000) / 1000, 0.001, 1); }
    paint();
  }
  function setN(v) {
    const N = clamp(Math.round(v), 1, 64), f = S.N ? S.u / S.N : 1;
    S.N = N; fChecks.set(N);
    if (S.scene === 'zeno') { clock.pause(); clock.setMax(N, true); clock.set(f * N); } else paint();
  }
  const viewChips = kit.chips($('viewChips'), 'view', (v) => setView(v));
  function setView(v, instant) {
    S.view = v;
    const cam = v === 'card' ? PRESETS[cards.current || DEFAULT].cam : VIEWS[v];
    S.camFit = cam.slice(); sc.view([cam[0], cam[1], 1], instant || TRV.still ? 0 : 600);
    viewChips.set(v, true);
    paint();
  }
  lensBtn.addEventListener('click', (ev) => {
    S.lens = !S.lens; paint();
    if (ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ l: () => { S.lens = !S.lens; paint(); } });

  /* ---------- experiment cards ---------- */
  const DEFAULT = 'time-river-orthogonal-fold';
  const PRESETS = {
    'precision-agency-window': { scene: 'halt', eps: 0.15, still: -Math.log10(0.15), cam: [-1.15, 0.66] },
    'time-river-orthogonal-fold': { scene: 'fold', eps: 0.1, still: 2, cam: [-0.78, 0.48] },
    'power-iteration-spectral-sort': { scene: 'power', eps: 0.12, still: 4, cam: [-0.5, 0.36] },
    'basis-rayleigh-attention': { scene: 'basis', eps: 0.15, still: 65, cam: [-0.75, 0.36] },
    'zeno-basis-sculpting': { scene: 'zeno', N: 16, still: 16, cam: [-0.3, 0.3] }
  };
  const NOTES = {
    'precision-agency-window': ['余弦迭代从 x₀ = 0 绕 θ* 盘旋。ε = 0.150 的紫色精度帽是 |cos x − x| ≤ ε，x₄ 第一个落进帽里，第 5 步 |x₅ − x₄| = 0.1392 ≤ ε 就停：青色的 x₅ = 0.7935 锁定，品红的余差 0.0544 与没走完的螺旋折了进去。ε → 0 螺旋无尽，ε → 1 一步不细化。',
      'The cosine iteration from x₀ = 0 spirals about θ*. The violet precision cap for ε = 0.150 is |cos x − x| ≤ ε; x₄ is the first point inside it, and step 5 stops with |x₅ − x₄| = 0.1392 ≤ ε: the cyan x₅ = 0.7935 is locked, and the magenta residual 0.0544 with the unwalked spiral is folded away. As ε → 0 the spiral never ends; at ε → 1 nothing is refined.'],
    'time-river-orthogonal-fold': ['六个模按玻恩权重排开。ε = 0.100 以上的三个青色模立在 I 墙上，其余三个绕紫色铰链 î 转 90° 躺进品红的河；琥珀的时间步 t 每往下游走一步，浮出一份（从重到轻），θ* = 0.739… 的尾数 0.0000851332… 也每步浮出一位。任何时刻 ‖Π≥‖² + ‖Π<‖² = 1.0000。',
      'Six modes in order of Born weight. The three cyan modes at or above ε = 0.100 stand on the wall I; the other three turn 90° about the violet hinge î and lie in the magenta river. Each step of the amber time step t downstream brings one of them up (heaviest first), and one digit of the tail 0.0000851332… of θ* = 0.739… surfaces too. At every moment ‖Π≥‖² + ‖Π<‖² = 1.0000.'],
    'power-iteration-spectral-sort': ['谱 (1.00, 0.76, 0.54, 0.35, 0.20, 0.10) 迭代 n = 4 次：(σₘ/σ₁)⁴ 只让前两模过琥珀截断线 ε = 0.120，成为青色的主轴与柱，其余沉成品红的尾巴，紫色椭球压成一根针。迭代份额 99.33%，原始秩 2 能量只有 77.27%。',
      'The spectrum (1.00, 0.76, 0.54, 0.35, 0.20, 0.10) iterated n = 4 times: (σₘ/σ₁)⁴ lets only the first two modes clear the amber cutoff ε = 0.120, as cyan axes and bars; the rest sink into the magenta tail and the violet ellipsoid flattens into a needle. Iterated share 99.33%, against a raw rank-2 energy of only 77.27%.'],
    'basis-rayleigh-attention': ['紫色测量基 B(α) 从位置基（0°）转向频率基（90°）。α = 65° 时 ψ 在三根轴上的瑞利权重 w = cos²θₖ 是 0.6273、0.2525、0.1202，和为 1；过 ε = 0.150 的两份是青色，第三份降成品红。位置基里排第一的那根，到频率基里排最后。',
      'The violet measurement basis B(α) turns from the position basis (0°) towards the frequency basis (90°). At α = 65° the Rayleigh weights w = cos²θₖ of ψ on the three axes are 0.6273, 0.2525, 0.1202, adding up to 1; the two above ε = 0.150 are cyan, the third is demoted to magenta. The axis ranked first in the position basis ends last in the frequency basis.'],
    'zeno-basis-sculpting': ['走廊里 N = 16 道紫色频闪环把 ΩT = π/2 均分。每段态只偏 π/64，品红的横漏 sin²(π/64) = 0.0024 是平方阶，每道环把它掐回青色的基态脊：最后留下 [cos²(π/64)]¹⁶ = 0.9622；不看的虚线一路转到赤道，只留 0.5000。',
      'In the corridor N = 16 violet strobe rings divide ΩT = π/2 evenly. Between rings the state strays only π/64, the magenta sideways leak sin²(π/64) = 0.0024 is of second order, and each ring pinches it back onto the cyan backbone: in the end [cos²(π/64)]¹⁶ = 0.9622 stays; the dashed unwatched path turns all the way to the equator and keeps only 0.5000.']
  };
  // A cited figure has a fixed frame: one short sentence per card, without sub- or superscripts.
  const FIGURE_NOTES = {
    'precision-agency-window': ['紫色帽 ε = 0.150：第 5 步停，青色 x₅ = 0.7935 锁定，品红余差 0.0544 折入。', 'Violet cap ε = 0.150: halts at step 5, cyan x₅ = 0.7935 locked, magenta residual 0.0544 folded.'],
    'time-river-orthogonal-fold': ['三个青色模立在 I 上，三个折进品红的河，下游逐个浮出；两份之和恒为 1.0000。', 'Three cyan modes stand on I, three fold into the magenta river; together always 1.0000.'],
    'power-iteration-spectral-sort': ['n = 4：只有两个青色模过琥珀线 ε = 0.120，份额 99.33%，原始 77.27%。', 'n = 4: only two cyan modes clear the amber line ε = 0.120, share 99.33%, raw 77.27%.'],
    'basis-rayleigh-attention': ['α = 65°：权重 0.6273、0.2525 为青色，0.1202 降为品红，三者之和为 1。', 'α = 65°: weights 0.6273 and 0.2525 cyan, 0.1202 demoted to magenta, summing to 1.'],
    'zeno-basis-sculpting': ['16 道紫色环把品红横漏掐回青色脊：留下 0.9622，不看只留 0.5000。', '16 violet rings pinch the magenta leak back to the cyan backbone: 0.9622 stays, 0.5000 unwatched.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.scene = p.scene;
    if (p.eps != null) { S.eps = p.eps; fEps.set(p.eps); }
    if (p.N != null) { S.N = p.N; fChecks.set(p.N); }
    railFor(p.scene);
    clock.set(p.still);
    if (p.eps != null) { S.eps = p.eps; fEps.set(p.eps); }
    S.view = 'card'; viewChips.set('card', true);
    S.camFit = p.cam.slice(); sc.view([p.cam[0], p.cam[1], 1], booting || TRV.still ? 0 : 600);
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄或滑块，切换读法与视角。随时可以再选一张卡。', 'Free play: drag the amber handle or a slider, switch the reading or the view. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.HALT_SORT_DEBUG = Object.freeze({
    get state() {
      const M = LAST || cores();
      return JSON.parse(JSON.stringify({
        preset: cards.current, scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, lens: S.lens, view: S.view,
        eps: S.eps, foldT: S.t, n: S.n, alpha: S.alpha, N: S.N, u: S.u,
        dottie: DOTTIE, lambda: LAMBDA, iterates: ITER.slice(0, 25),
        halt: M.halt, fold: M.fold, power: M.power, basis: M.basis, zeno: M.zeno,
        weights: W6, amplitudes: A6, sigma: SIGMA, krylov: KRYLOV, qubit: QUBIT, hinge: { J, JJ, JJT },
        dct: F3, dctAngle: F3ANG, dctAxis: F3AX, psi: PSI,
        camera: Object.assign({}, sc.cam), camFit: S.camFit, frame: FRAME, labels: PLACED,
        handle: FRAME ? FRAME.handle : null
      }));
    },
    /** Values of every scene at other parameters, for independent checks. */
    at: (o) => JSON.parse(JSON.stringify({
      halt: haltCore(o.eps == null ? S.eps : o.eps), fold: foldCore(o.eps == null ? S.eps : o.eps, o.t == null ? S.t : o.t),
      power: powerCore(o.n == null ? S.n : o.n, o.eps == null ? S.eps : o.eps), basis: basisCore(o.alpha == null ? S.alpha : o.alpha, o.eps == null ? S.eps : o.eps),
      zeno: zenoCore(o.N == null ? S.N : o.N, o.u == null ? S.u : o.u), basisMatrix: basisR(o.alpha == null ? S.alpha : o.alpha)
    })),
    setState: (o) => {
      cards.mark(null); clock.pause();
      if (o.eps != null) setEps(o.eps);
      if (o.N != null) setN(o.N);
      if (o.lens != null) S.lens = !!o.lens;
      if (o.rail != null) clock.set(clamp(o.rail, 0, clock.max));
      paint();
    },
    handleBox: () => { const r = handle.getBoundingClientRect(); return handle.hidden ? null : { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    handleAt: (v) => { const q = sc.p(HANDLE[S.scene].point(v)), b = stageEl.getBoundingClientRect(); return { x: b.left + q[0], y: b.top + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick(DEFAULT); clock.pause(); clock.set(PRESETS[DEFAULT].still); S.camFit = PRESETS[DEFAULT].cam.slice(); sc.view([S.camFit[0], S.camFit[1], 1], 0); paint.now(); };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint();
})();
