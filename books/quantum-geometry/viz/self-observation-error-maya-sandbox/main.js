/* MAYA//ERROR · 唯一点场自观测误差生万象 · Single point-field self-observation error
   World (kit.solid): z up. The ontological point-field Ω sits at the origin: a sigma core inside its field, the unit
   ball of the budget ‖Ω‖² = 1, whose far half is drawn as an opaque wall; Ω points along e₃ = (0, 0, 1).
   The observer ruler I(ε, φ) = cos ε e₃ + sin ε (cos φ e₁ + sin φ e₂) (amber) misses Ω by the self-observation error ε.
   The rail τ ∈ [0, 1] sets its azimuth φ = 2π(τ − ½) (τ = ½ gives I = (sin ε, 0, cos ε)), or, for the collapse card,
   the error itself, ε(τ) = 60°(1 − τ) at φ = 0.
   static lens  (projection results) the direct projection (cos ε)I and the round-trip echo (cos²ε)Ω (cyan); the residual
                r₁ = Ω − (cos ε)I = (sin ε)e⊥ with I·e⊥ = 0, on the blind disk î: the plane through (cos ε)I orthogonal
                to I, which cuts the ball in the circle of radius sin ε through Ω (magenta); the 2-wedge r₁ ∧ r₂ with
                r₂ = (sin ε)e_t, area sin²ε, beside the right spherical triangle with legs ε, ε on the ball, excess
                Ω(ε, ε) = 2 arctan(tan²(ε/2)) (magenta); the 3-cell of three orthogonal error legs of length sin ε,
                volume sin³ε = √det G₃, around the point (violet, cut away towards the reader).
   dynamic lens (observation actions) Ω does not move; the observer steps I⁽ᵏ⁾ = I(ε, φ_k), φ_k = −π + 2πk/K, around the
                cone of half-angle ε (violet), joined by cyan rotor arcs; the current step is amber; the monitored
                survival s_k = sin²ε cos^{2(k−1)}ε stands as a magenta spike on step k; the Dottie card adds the
                self-focusing spiral θ_{k+1} = cos θ_k from θ₀ = 0 towards θ* = 0.739085 rad = 42.3465°.
   Every auxiliary mark fades with clamp(sin ε / 0.06, 0, 1): at ε = 0 only Ω is left. Every number is computed here;
   the instances of the cited Lean theorems are checked in instances(). Read-only probe: window.MAYA_ERROR_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  /* ---------- constants ---------- */
  const OMEGA = [0, 0, 1], ORIGIN = [0, 0, 0];
  const DOTTIE = (() => { let x = 0.7; for (let k = 0; k < 60; k++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const DOTTIE_DEG = DOTTIE / DEG;
  const R_FIELD = 1.03, R_CORE = 0.075, L_SPIKE = 0.34, EPS_MAX = 90, K_MAX = 16, COLLAPSE_FROM = 60;
  const VIEW0 = [-0.52, 0.5];
  const FADE_AT = 0.06;
  const fadeOf = (eps) => clamp(Math.sin(eps) / FADE_AT, 0, 1);

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => Math.hypot(a[0], a[1], a[2]);
  const unit = (a) => { const n = norm(a); return n > 1e-12 ? scale(a, 1 / n) : [0, 0, 1]; };
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  /** The great-circle arc from the unit vector u to the unit vector w, n + 1 points at radius r. */
  function slerpArc(u, w, n, r = 1) {
    const om = Math.acos(clamp(dot(u, w), -1, 1));
    if (om < 1e-9) return range(0, 1, n).map(() => scale(u, r));
    return range(0, 1, n).map((t) => scale(add(scale(u, Math.sin((1 - t) * om) / Math.sin(om)), scale(w, Math.sin(t * om) / Math.sin(om))), r));
  }
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  /* 3 × 3 matrices */
  const ID3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const outer = (a, b) => a.map((x) => b.map((y) => x * y));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
  const mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((t, x, k) => t + x * B[k][j], 0)));
  const mvec = (A, v) => A.map((r) => r.reduce((t, x, k) => t + x * v[k], 0));
  const mmax = (A) => Math.max(...A.flat().map(Math.abs));
  const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  /* complex numbers and 2 × 2 complex matrices */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const cm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => { const x = cmul(A[i][0], B[0][j]), y = cmul(A[i][1], B[1][j]); return [x[0] + y[0], x[1] + y[1]]; }));
  const cadd = (A, B, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * B[i][j][0], z[1] + s * B[i][j][1]]));
  const cdag = (A) => [[cconj(A[0][0]), cconj(A[1][0])], [cconj(A[0][1]), cconj(A[1][1])]];
  const cmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const CI2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];

  /* ---------- state ---------- */
  const S = { epsDeg: 42.35, K: 8, lens: 'static', dottie: false, drive: 'phase', tau: 0.5, from: null, blend: 1 };
  const collapseEps = (t) => COLLAPSE_FROM * (1 - t);
  const phiOf = (t) => (S.drive === 'collapse' ? 0 : TAU * (t - 0.5));
  function targets() { return { epsDeg: S.drive === 'collapse' ? collapseEps(S.tau) : S.epsDeg, lam: S.lens === 'dynamic' ? 1 : 0 }; }
  /** The values the page shows: the targets, blended from the previous values during a transition. */
  function eff() {
    const t = targets();
    if (!S.from || S.blend >= 1) return t;
    return { epsDeg: lerp(S.from.epsDeg, t.epsDeg, S.blend), lam: lerp(S.from.lam, t.lam, S.blend) };
  }

  /** Everything the page shows, from the state. */
  function model() {
    // at the ends of the slider the cosine is exact: cos 90° = 0 (Math.cos gives 6e−17), sin 0 = 0
    const e = eff(), epsDeg = e.epsDeg, eps = epsDeg * DEG, c = epsDeg >= 90 ? 0 : Math.cos(eps), s = Math.sin(eps), lam = e.lam;
    const tau = S.tau, K = S.K, phi = phiOf(tau);
    const er = [Math.cos(phi), Math.sin(phi), 0], et = [-Math.sin(phi), Math.cos(phi), 0];
    const I = add(scale(OMEGA, c), scale(er, s));
    const foot = scale(I, c), eperp = sub(scale(OMEGA, s), scale(er, c)), r1 = sub(OMEGA, foot), r2 = scale(et, s);
    const echo = scale(OMEGA, c * c);
    const triA = sph(eps, phi + PI), triB = sph(eps, phi - PI / 2);
    // the observation actions: K steps of the precession, the monitored survival tail, the Dottie spiral
    const kNow = K * tau, kInt = Math.min(K, Math.floor(kNow + 1e-9));
    const phis = range(0, K, K).map((k) => -PI + TAU * k / K);
    const survival = [1];
    for (let k = 1; k <= K; k++) survival.push(s * s * Math.pow(c, 2 * (k - 1)));
    const returns = [0];
    for (let k = 1; k <= K; k++) returns.push(survival[k - 1] - survival[k]);
    const thetas = [0];
    for (let k = 0; k < K; k++) thetas.push(Math.cos(thetas[k]));
    const thetaNow = kInt >= K ? thetas[K] : lerp(thetas[kInt], thetas[kInt + 1], kNow - kInt);
    const dyn = S.dottie ? sph(thetaNow, phi) : I;
    return {
      epsDeg, eps, cos: c, sin: s, cos2: c * c, sin2: s * s, sin3: s * s * s, lam, fade: fadeOf(eps),
      tau, K, phi, er, et, I, foot, eperp, r1, r2, echo, triA, triB,
      girard: 2 * Math.atan(Math.tan(eps / 2) ** 2), halfSin2: 0.5 * s * s, cellHalf: s / 2,
      kNow, kInt, phis, survival, returns, conservation: returns.slice(1).reduce((t, x) => t + x, 0) + survival[K],
      speedRatio: s, mtSpread: 0.5 * Math.sin(eps), thetas, thetaNow, dyn, dynTheta: S.dottie ? thetaNow : eps,
      omegaPos: ORIGIN.slice(), omegaShift: 0
    };
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(M) {
    const key = `${M.epsDeg}|${M.tau}|${M.K}|${S.drive}`;
    if (instCache.has(key)) return instCache.get(key);
    const c = M.cos, s = M.sin;
    // 1. unit Gram overlap: for unit records ⟨I, Ω⟩ = 1 exactly when I = Ω (here: when ε = 0)
    const gram = dot(M.I, OMEGA), same = norm(sub(M.I, OMEGA)) < 1e-12, isOne = Math.abs(gram - 1) < 1e-12;
    const unitGram = { gram, same, isOne, iff: same === isOne, norms: [norm(M.I), norm(OMEGA)] };
    // 2. the projection onto span(I) and onto its orthogonal complement
    const Pm = outer(M.I, M.I), Qm = madd(ID3, Pm, -1);
    const projections = {
      idemP: mmax(madd(mmul(Pm, Pm), Pm, -1)), idemQ: mmax(madd(mmul(Qm, Qm), Qm, -1)), PQ: mmax(mmul(Pm, Qm)), QP: mmax(mmul(Qm, Pm)),
      sum: mmax(madd(madd(Pm, Qm), ID3, -1)), complement: mmax(madd(Qm, madd(ID3, Pm, -1), -1)),
      projResidual: norm(sub(mvec(Pm, OMEGA), M.foot)), compResidual: norm(sub(mvec(Qm, OMEGA), M.r1)),
      orth: dot(M.I, M.eperp), residualNorm: norm(M.r1)
    };
    // 3. the self-application fragment on a finite table: A = the K + 1 steps, Y = Bool,
    //    g(a, b) = "step a reads the ruler of step b as its own" (a = b), f = not (no fixed point)
    const A = M.K + 1, f = (y) => !y;
    const table = (g) => Array.from({ length: A }, (_, a) => Array.from({ length: A }, (__, b) => g(a, b)));
    const fragment = (ff, rows) => {
      const diag = rows.map((r, a) => ff(r[a]));
      const inRange = rows.some((r) => r.every((y, b) => y === diag[b]));
      return { diag, escaped: !inRange };
    };
    const own = fragment(f, table((a, b) => a === b)), other = fragment(f, table((a, b) => ((3 * a + 5 * b) % 7) < 3));
    const idExample = fragment((y) => y, [[true]]);
    const selfApplication = {
      size: A, diagonalFormula: own.diag.every((y, a) => y === f(a === a)), escaped: own.escaped, otherEscaped: other.escaped,
      noFixedPoint: f(true) !== true && f(false) !== false, idExampleEscaped: idExample.escaped, diag: own.diag
    };
    // 4. the Dottie number: the unique positive fixed point of cos, and the self-focusing iteration towards it
    let signChanges = 0, prev = Math.cos(1e-6) - 1e-6;
    for (let j = 1; j <= 6000; j++) { const t = j * 1e-3, v = Math.cos(t) - t; if (Math.sign(v) !== Math.sign(prev)) signChanges++; prev = v; }
    const dottie = { theta: DOTTIE, thetaDeg: DOTTIE_DEG, residual: Math.abs(Math.cos(DOTTIE) - DOTTIE), inUnit: DOTTIE > 0 && DOTTIE < 1,
      roots: signChanges, ratio: -Math.sin(DOTTIE), iterates: M.thetas, gapK: Math.abs(M.thetas[M.K] - DOTTIE) };
    // 5. the Lagrange identity, on (I, Ω) and on (r₁, r₂)
    const lag = (u, v) => {
      const su = dot(u, u), sv = dot(v, v), uv = dot(u, v);
      let w = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) w += (u[i] * v[j] - u[j] * v[i]) ** 2;
      return { lhs: su * sv - uv * uv, rhs: w / 2 };
    };
    const lagrange = { pair: lag(M.I, OMEGA), wedge: lag(M.r1, M.r2) };
    // 6. three anchors: the three orthogonal error legs of length sin ε
    const legs = [[s, 0, 0], [0, s, 0], [0, 0, s]], G = legs.map((u) => legs.map((v) => dot(u, v)));
    const detG = det3(G), detLegs = det3(legs), independent = Math.abs(detLegs) > 1e-12;
    const threeAnchor = { gram: G, det: detG, detPos: detG > 0, independent, iff: (detG > 0) === independent, sqrtDet: Math.sqrt(Math.max(0, detG)), volume: M.sin3 };
    // 7. the skew-adjoint unitary J = [[0, −1], [1, 0]]: Jᴴ = −J, JJᴴ = 1, J² = −1; exp(εJ)(1, 0) = (cos ε, sin ε)
    const J = [[[0, 0], [-1, 0]], [[1, 0], [0, 0]]];
    const expJ = cadd(cadd(CI2, CI2, c - 1), J, s);
    const rotor = { skewAdjoint: cmax(cadd(cdag(J), J)), unitary: cmax(cadd(cm(J, cdag(J)), CI2, -1)), square: cmax(cadd(cm(J, J), CI2)),
      image: [expJ[0][0][0], expJ[1][0][0]], imageResidual: Math.hypot(expJ[0][0][0] - c, expJ[1][0][0] - s) };
    // 8. Bloch polar angle ε: H = σ_z/2 (ħ = ω = 1), U = exp(−itH), t = 2πτ
    const t = TAU * M.tau, U = [[[Math.cos(-t / 2), Math.sin(-t / 2)], [0, 0]], [[0, 0], [Math.cos(t / 2), Math.sin(t / 2)]]];
    const rhoOmega = [[[1, 0], [0, 0]], [[0, 0], [0, 0]]], psi = [[Math.cos(M.eps / 2), 0], [Math.sin(M.eps / 2), 0]];
    const rhoPsi = [0, 1].map((i) => [0, 1].map((j) => cmul(psi[i], cconj(psi[j]))));
    const moved = cm(cm(U, rhoPsi), cdag(U));
    const H = [[[0.5, 0], [0, 0]], [[0, 0], [-0.5, 0]]], expH = (v) => { const Hv = [cmul(H[0][0], v[0]), cmul(H[1][1], v[1])]; return Hv[0][0] * v[0][0] + Hv[0][1] * v[0][1] + Hv[1][0] * v[1][0] + Hv[1][1] * v[1][1]; };
    const meanH = expH(psi), meanH2 = 0.25;
    const energy = { unitary: cmax(cadd(cm(U, cdag(U)), CI2, -1)), stationary: cmax(cadd(cm(cm(U, rhoOmega), cdag(U)), rhoOmega, -1)),
      omegaVariance: 0, psiMoved: cmax(cadd(moved, rhoPsi, -1)), meanH, spread: Math.sqrt(Math.max(0, meanH2 - meanH * meanH)), mtSpread: M.mtSpread, t };
    // 9. monitored return: U = the turn by ε in the plane (Ω, e⊥), v = Ω, Q = 1 − |v⟩⟨v|
    const hist = [[1, 0]], surv = [1], ret = [0];
    for (let n = 1; n <= M.K; n++) {
      const h = hist[n - 1], Uh = [c * h[0] - s * h[1], s * h[0] + c * h[1]];
      ret.push(Uh[0] * Uh[0]); hist.push([0, Uh[1]]); surv.push(Uh[1] * Uh[1]);
    }
    let stepResidual = 0, totalResidual = 0;
    for (let n = 0; n < M.K; n++) stepResidual = Math.max(stepResidual, Math.abs(ret[n + 1] - (surv[n] - surv[n + 1])));
    for (let N = 0; N <= M.K; N++) totalResidual = Math.max(totalResidual, Math.abs(ret.slice(1, N + 1).reduce((a, x) => a + x, 0) + surv[N] - 1));
    const monitored = { survival: surv, returns: ret, start: surv[0], stepResidual, totalResidual,
      formulaResidual: Math.max(...surv.map((x, k) => Math.abs(x - M.survival[k]))), allPositive: surv.every((x) => x > 0) };
    const out = { unitGram, projections, selfApplication, dottie, lagrange, threeAnchor, rotor, energy, monitored };
    instCache.set(key, out);
    if (instCache.size > 120) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 10, y: top, w: Math.max(40, W - 20), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let sz = sizes.get(k);
    if (!sz) { probeEl.className = 'tag ' + cls; probeEl.innerHTML = html; probeEl.hidden = false; sz = [probeEl.offsetWidth, probeEl.offsetHeight]; probeEl.hidden = true; if (sz[0] > 0) sizes.set(k, sz); }
    return sz;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 42]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
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
      placed.push(Object.assign({ key: l.key, text: l.html }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* ---------- fit: the field ball (and the spikes of the tail) in the free part of the stage ---------- */
  const BOX = { x0: -1.1, x1: 1.1, y0: -1.08, y1: 1.22 };
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 6 : 10, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  let FRAME = null, FIT = null, TAGS = [], AX = null, dragging = null;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  const vis = (a) => a > 0.02;

  /** The field: the far half of the ball (opaque wall), a camera-facing hemisphere shaded by height; the point core. */
  function drawField(M) {
    const D = AX.D, R = AX.R, U = AX.U;
    const dirAt = (u, v) => { const th = u * PI / 2, ph = TAU * v; return add(scale(D, -Math.cos(th)), scale(add(scale(R, Math.cos(ph)), scale(U, Math.sin(ph))), Math.sin(th))); };
    sc.surface('field', (u, v) => scale(dirAt(u, v), R_FIELD), { u: [0, 1], v: [0, 1], nu: 26, nv: 84, value: (u, v) => dirAt(u, v)[2],
      colors: [P.panelEdge, P.faint, P.dim], range: [-1.1, 1.1], pick: false });
    sc.surface('core', (u, v) => scale(sph(u * PI, v * TAU), R_CORE), { u: [0, 1], v: [0, 1], nu: 14, nv: 24, color: P.sigma, pick: false, occlude: false });
    const f = M.fade;
    if (vis(f)) {
      sc.circle(ORIGIN, OMEGA, 1, { color: P.dim, width: 1.1, alpha: 0.55 * f, back: 0.4 });
      for (const z of [0.5, Math.sqrt(3) / 2]) sc.circle([0, 0, z], OMEGA, Math.sqrt(1 - z * z), { color: P.dim, width: 0.9, alpha: 0.32 * f, back: 0.4 });
    }
    // Ω: the point-field's own direction, never moved
    sc.arrow(ORIGIN, OMEGA, { color: P.sigma, width: 3, headSize: 12 });
    sc.ring(OMEGA, { normal: OMEGA, color: P.sigma, r: 8, key: 'omega' });
    at(OMEGA, M.eps === 0 ? 'Ω · ‖Ω‖² = 1 · 1 = 1' : 'Ω · ‖Ω‖² = 1', 'raw c-sg backed', 10, [-0.4, -1]);
  }

  /** The meridian the observer rides (with its calibration ticks), the ε arc, the observer and its residual. */
  function drawObserver(M) {
    const f = M.fade, phi = M.phi;
    if (vis(f)) {
      sc.line(range(0, PI / 2, 60).map((t) => sph(t, phi)), { color: P.dim, width: 1.2, dash: [4, 4], alpha: 0.75 * f });
      for (const deg of [15, 30, 45, 60, 75, 90]) { const p = sph(deg * DEG, phi); sc.line([p, scale(p, 1.05)], { color: P.dim, width: 1.4, alpha: 0.85 * f }); }
      const ps = sph(DOTTIE, phi); sc.line([scale(ps, 0.97), scale(ps, 1.08)], { color: P.ink, width: 1.6, alpha: 0.7 * f });
      // the angle ε between Ω and I, near the point
      const arc = slerpArc(OMEGA, unit(M.I), 30, 0.34);
      sc.line(arc, { color: P.ink, width: 1.4, alpha: 0.85 * f });
      at(arc[18], `ε = ${fix(M.epsDeg, 2)}°`, 'raw c-ik backed', 9, null);
    }
    // on the Dottie spiral the drawn ruler is the current iterate at θ, not I(ε): its residual is sin θ
    const onSpiral = M.lam > 0.5 && S.dottie, obs = onSpiral ? M.dyn : M.I;
    if (vis(f)) {
      sc.arrow(ORIGIN, obs, { color: P.amber, width: 2.6, headSize: 11, alpha: f });
      sc.bead(obs, { color: P.amber, r: 5, key: 'observer', alpha: f });
      const label = M.lam > 0.5 ? (S.dottie ? `I⁽${M.kInt}⁾ · θ = ${fix(M.thetaNow / DEG, 2)}°` : `I⁽${M.kInt}⁾ = I(ε, φ<sub>${M.kInt}</sub>)`) : 'I(ε)';
      at(obs, label, 'raw c-ik backed', 9, null);
      // the residual of the current reading: what the ruler misses of Ω
      const ft = scale(obs, dot(obs, OMEGA));
      tube('residual', [ft, OMEGA], P.magenta, 4.5, { glow: 0.45, alpha: f });
      if (M.lam < 0.5) at(lerp3(ft, OMEGA, 0.5), `r₁ = sin ε e<sub>⊥</sub> · I·e<sub>⊥</sub> = 0`, 'raw c-mg backed', 8, null);
      else at(lerp3(ft, OMEGA, 0.5), onSpiral ? `‖r‖ = sin θ = ${fix(Math.sin(M.thetaNow), 4)}` : `‖r‖ = sin ε = ${fix(M.sin, 4)}`, 'raw c-mg backed', 7, null);
    }
  }

  /** Projection results: projection and echo, residual on the blind disk, the 2-wedge and the spherical triangle, the 3-cell. */
  function drawStatic(M, A0) {
    const { I, foot, eperp, et, r2 } = M, s = M.sin;
    // cyan: the direct projection (cos ε)I and the round-trip echo (cos²ε)Ω
    tube('proj', [ORIGIN, foot], P.cyan, 7, { glow: 0.4, alpha: A0 });
    sc.bead(foot, { color: P.cyan, r: 4.2, key: 'foot', alpha: A0 });
    tube('echo', [ORIGIN, M.echo], P.cyan, 6.5, { glow: 0.4, alpha: A0 });
    sc.line([foot, M.echo], { color: P.cyan, width: 1.4, dash: [5, 4], alpha: 0.9 * A0 });
    sc.bead(M.echo, { color: P.cyan, r: 4.2, key: 'echo', alpha: A0 });
    at(foot, `(cos ε) I = ${fix(M.cos, 4)}`, 'raw c-cy backed', 8, null);
    at(M.echo, `(cos²ε) Ω = ${fix(M.cos2, 4)}`, 'raw c-cy backed', 7, [-1, 0.2]);
    // the right angle at the foot
    const q = 0.055 * Math.min(1, s / 0.25);
    sc.line([add(foot, scale(I, -q)), add(add(foot, scale(I, -q)), scale(eperp, q)), add(foot, scale(eperp, q))], { color: P.ink, width: 1.2, alpha: 0.8 * A0 });
    // magenta: the blind disk î through the foot, orthogonal to I (it cuts the ball in the circle of radius sin ε)
    sc.circle(foot, I, s, { color: P.magenta, width: 1.3, dash: [5, 4], alpha: 0.8 * A0, fade: false });
    at(add(foot, scale(eperp, -0.82 * s)), L('î：⊥ I 的盲区', 'î: the blind plane ⊥ I'), 'raw c-mg backed', 5, null);
    // the 2-wedge r₁ ∧ r₂ (area sin²ε) in the blind plane
    const sq = [foot, OMEGA, add(OMEGA, r2), add(foot, r2)];
    sc.fan(sq, { fill: P.magenta, alpha: 0.36 * A0, color: P.magenta, width: 1.6, strokeAlpha: 0.9 * A0 });
    tube('leg2', [foot, add(foot, r2)], P.magenta, 3, { glow: 0.35, alpha: A0 });
    at(add(foot, scale(add(M.r1, r2), 0.5)), `r₁ ∧ r₂ = sin²ε = ${fix(M.sin2, 4)}`, 'raw c-mg backed', 7, null);
    // a right spherical triangle with legs ε, ε at the pole Ω (on the far side of the pole from I, so that it hides
    // neither Ω nor the residual): its excess is the curved area
    const A = M.triA, B = M.triB;
    if (s > 1e-4) {
      const om = Math.acos(clamp(dot(A, B), -1, 1));
      const arcAB = (v) => (om < 1e-9 ? A : add(scale(A, Math.sin((1 - v) * om) / Math.sin(om)), scale(B, Math.sin(v * om) / Math.sin(om))));
      sc.surface('girard', (u, v) => scale(unit(add(scale(OMEGA, 1 - u), scale(arcAB(v), u))), 1.006),
        { u: [0, 1], v: [0, 1], nu: 16, nv: 16, color: P.magenta, alpha: A0 >= 0.999 ? 1 : A0, grid: { every: [4, 4], color: P.ink, alpha: 0.2 }, pick: false });
      at(scale(unit(add(add(OMEGA, A), B)), 1.02), `Ω(ε, ε) = ${fix(M.girard, 4)} · ½ sin²ε = ${fix(M.halfSin2, 4)}`, 'raw c-mg backed', 6, null);
    }
    // violet: the 3-cell of three orthogonal error legs around the point, cut away towards the reader
    const h = M.cellHalf;
    if (h > 1e-4) {
      const V = [];
      for (const z of [-h, h]) for (const y of [-h, h]) for (const x of [-h, h]) V.push([x, y, z]);
      const FACES = [[[0, 2, 6, 4], [-1, 0, 0]], [[1, 5, 7, 3], [1, 0, 0]], [[0, 4, 5, 1], [0, -1, 0]], [[2, 3, 7, 6], [0, 1, 0]], [[0, 1, 3, 2], [0, 0, -1]], [[4, 6, 7, 5], [0, 0, 1]]];
      const back = FACES.filter(([, n]) => dot(n, AX.D) <= 0).map(([fc]) => fc), front = FACES.filter(([, n]) => dot(n, AX.D) > 0).map(([fc]) => fc);
      sc.poly('cell-back', { vertices: V, faces: back }, { color: P.violet, alpha: A0 >= 0.999 ? 1 : A0, edges: P.ink, pick: false });
      sc.poly('cell-front', { vertices: V, faces: front }, { color: P.violet, alpha: 0.16 * A0, edges: P.ink, pick: false, occlude: false });
      at([h, -h, -h], `r₁ ∧ r₂ ∧ r₃ = sin³ε I₃ = ${fix(M.sin3, 4)}`, 'raw c-vi backed', 6, [0.3, 1]);
    }
  }

  /** Observation actions: the precession cone, the steps and rotor arcs, the survival tail, or the Dottie spiral. */
  function drawDynamic(M, A1) {
    const eps = M.eps, c = M.cos, s = M.sin;
    if (s > 1e-4) {
      sc.surface('cone', (u, v) => scale(sph(eps, u), v), { u: [0, TAU], v: [0, 1], nu: 72, nv: 6, color: P.violet, alpha: 0.2 * A1, grid: { every: [6, 6], color: P.ink, alpha: 0.12 }, pick: false, occlude: false });
      sc.circle([0, 0, c], OMEGA, s, { color: P.cyan, width: 1.3, dash: [4, 4], alpha: 0.6 * A1 });
    }
    at([0, 0, -0.16], '‖Δx<sub>Ω</sub>‖ = 0.000000', 'raw c-sg backed', 8, [0.2, 1]);
    if (S.dottie) {
      // the self-focusing spiral θ_{k+1} = cos θ_k, one step per azimuth step
      const pts = [];
      for (let k = 0; k < M.K; k++) {
        const a = sph(M.thetas[k], M.phis[k]), b = sph(M.thetas[k + 1], M.phis[k + 1]);
        for (let j = 0; j < 12; j++) { const t = j / 12; pts.push(sph(lerp(M.thetas[k], M.thetas[k + 1], t), lerp(M.phis[k], M.phis[k + 1], t))); }
        if (k === M.K - 1) pts.push(b);
        sc.bead(a, { color: P.cyan, r: 3, key: `step${k}`, alpha: A1 });
      }
      tube('spiral', pts, P.cyan, 2.6, { glow: 0.4, alpha: A1 });
      at(sph(M.thetas[1], M.phis[1]), 'θ<sub>k+1</sub> = cos θ<sub>k</sub>', 'raw c-cy backed', 7, null);
      at(sph(DOTTIE, M.phis[Math.max(0, M.K - 2)]), `θ* = ${fix(DOTTIE_DEG, 4)}°`, 'raw c-vi backed', 7, null);
      return;
    }
    // K steps around the cone, rotor arcs between them, the current partial arc
    const ring = (a, b) => range(a, b, Math.max(2, Math.ceil(Math.abs(b - a) / TAU * 96))).map((p) => sph(eps, p));
    for (let k = 0; k <= M.K; k++) {
      const T = sph(eps, M.phis[k]), done = k <= M.kInt;
      sc.line([ORIGIN, T], { color: P.cyan, width: 1, alpha: (done ? 0.55 : 0.2) * A1 });
      if (k < M.K) tube(`rotor${k}`, ring(M.phis[k], M.phis[k + 1]), P.cyan, k < M.kInt ? 3 : 1.6, { glow: 0.35, alpha: (k < M.kInt ? 1 : 0.32) * A1 });
      if (k > 0) {
        const len = L_SPIKE * M.survival[k];
        if (len > 1e-4) tube(`tail${k}`, [T, scale(T, 1 + len)], P.magenta, 4, { glow: 0.45, alpha: (done ? 1 : 0.35) * A1 });
      }
    }
    if (M.kInt < M.K) tube('rotor-now', ring(M.phis[M.kInt], M.phi), P.cyan, 3.4, { glow: 0.5, alpha: A1 });
    if (M.K >= 1) { const T1 = sph(eps, M.phis[1]); at(scale(T1, 1 + L_SPIKE * M.survival[1]), `s₁ = sin²ε = ${fix(M.survival[1], 4)}`, 'raw c-mg backed', 6, null); }
    at(sph(eps * 0.55, M.phis[0] + PI * 0.9), L('进动锥 · 半角 ε', 'precession cone · half-angle ε'), 'raw c-vi backed', 4, null);
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: BOX };
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    drawField(M);
    const A0 = (1 - M.lam) * M.fade, A1 = M.lam * M.fade;
    if (vis(A0)) drawStatic(M, A0);
    if (vis(A1)) drawDynamic(M, A1);
    drawObserver(M);
    sc.end();
    const show = !thumb && !TRV.still;
    const hq = show ? sc.p(sph(M.eps, M.phi)) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p(ORIGIN);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 10 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: a button on the meridian of the observer ---------- */
  const handle = $('epsHandle');
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The error ε (degrees) whose point on the current meridian lies nearest the pointer. */
  function epsAt(ev) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const phi = phiOf(S.tau);
    let best = S.epsDeg, bd = Infinity;
    for (let j = 0; j <= 3600; j++) { const d = j * EPS_MAX / 3600, q = sc.p(sph(d * DEG, phi)), dd = (q[0] - x) ** 2 + (q[1] - y) ** 2; if (dd < bd) { bd = dd; best = d; } }
    return Math.round(best * 100) / 100;
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
    setEps(epsAt(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    setEps(Math.round((S.epsDeg + (ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 0.5 : -0.5)) * 100) / 100);
  });

  /* ---------- HUD, legend, readouts ---------- */
  function legendItems(M) {
    if (M.lam >= 0.5) {
      return S.dottie
        ? [['sg', L('Ω 点场（不动）', 'Ω point-field (fixed)')], ['cy', L('自指螺线 θ<sub>k</sub>', 'self-focusing spiral θ<sub>k</sub>')], ['vi', L('θ* 锥', 'θ* cone')], ['mg', L('残差', 'residual')]]
        : [['sg', L('Ω 点场（不动）', 'Ω point-field (fixed)')], ['cy', L('旋子步 I⁽ᵏ⁾', 'rotor steps I⁽ᵏ⁾')], ['vi', L('进动锥', 'precession cone')], ['mg', L('残差 · 尾 s<sub>k</sub>', 'residual · tail s<sub>k</sub>')]];
    }
    if (M.fade < 0.02) return [['sg', L('Ω 点场', 'Ω point-field')]];
    return [['sg', L('Ω 点场', 'Ω point-field')], ['cy', L('投影 · 回声', 'projection · echo')], ['mg', L('残差 · 面积', 'residual · area')], ['vi', L('体积 sin³ε', 'volume sin³ε')]];
  }
  function hudText(M) {
    let big, sub;
    if (M.fade < 0.02) {
      big = `${L('零误差', 'ZERO ERROR')} · ε = ${fix(M.epsDeg, 2)}°`;
      sub = `‖Ω‖² = ${fix(M.cos2 + M.sin2, 4)} · 1 = 1`;
    } else if (M.lam >= 0.5 && S.dottie) {
      big = `${L('自指对焦', 'SELF-FOCUS')} · θ → θ* = ${fix(DOTTIE_DEG, 4)}°`;
      sub = `k = ${M.kInt}/${M.K} · θ<sub>k</sub> = ${fix(M.thetaNow / DEG, 2)}° · |θ<sub>K</sub> − θ*| = ${fix(Math.abs(M.thetas[M.K] - DOTTIE) / DEG, 3)}°`;
    } else if (M.lam >= 0.5) {
      big = `${L('观测动作', 'OBSERVATION ACTIONS')} · k = ${M.kInt}/${M.K}`;
      sub = `‖Δx<sub>Ω</sub>‖ = 0.000000 · ${L('轨速', 'speed')} sin ε = ${fix(M.speedRatio, 4)} · ΔE/ħω = ${fix(M.mtSpread, 4)}`;
    } else {
      big = `${L('投影结果', 'PROJECTION RESULTS')} · ε = ${fix(M.epsDeg, 2)}°`;
      sub = `‖Ω‖² = cos²ε + sin²ε = ${fix(M.cos2, 4)} + ${fix(M.sin2, 4)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems(M).map(([k, t]) => `<span><i class="sw ${k}"></i>${t}</span>`).join('');
  }
  function drawText(M) {
    const I = instances(M);
    $('roKey').textContent = `${fix(M.cos2, 4)} + ${fix(M.sin2, 4)} = ${fix(M.cos2 + M.sin2, 6)}`;
    $('roKeySub').innerHTML = ` · ε = ${fix(M.epsDeg, 2)}°`;
    $('roProj').innerHTML = `${fix(M.cos, 4)} · ${fix(M.cos2, 4)}`;
    $('roResidual').innerHTML = `${fix(M.sin, 4)} · I·e<sub>⊥</sub> = ${fix(Math.abs(I.projections.orth) < 5e-17 ? 0 : I.projections.orth, 6)} · ${fix(M.sin2, 4)}`;
    $('roGirard').innerHTML = `${fix(M.girard, 4)} · ${fix(M.halfSin2, 4)} · ${L('比', 'ratio')} ${M.halfSin2 > 1e-12 ? fix(M.girard / M.halfSin2, 4) : '—'}`;
    $('roVolume').innerHTML = `${fix(M.sin3, 4)} · √det G₃ = ${fix(I.threeAnchor.sqrtDet, 4)}`;
    $('roAction').innerHTML = `k = ${M.kInt}/${M.K} · s<sub>${Math.max(1, M.kInt)}</sub> = ${fix(M.survival[Math.max(1, M.kInt)], 4)} · Σp + s<sub>K</sub> = ${fix(M.conservation, 6)} · ΔE/ħω = ${fix(M.mtSpread, 4)}`;
    $('roNote').innerHTML = noteFor(M, I);
    $('epsPill').innerHTML = `ε <strong>${fix(M.epsDeg, 2)}°</strong>`;
    $('keyPill').innerHTML = M.lam >= 0.5 ? `Σp + s<sub>K</sub> <strong>${fix(M.conservation, 6)}</strong>` : `sin³ε <strong>${fix(M.sin3, 4)}</strong>`;
    $('hint').innerHTML = L('拖琥珀手柄沿经线改 ε · 拖空白处转视角', 'drag the amber handle along the meridian to set ε · drag empty space to orbit');
    $('formula').innerHTML = M.lam >= 0.5
      ? (S.dottie ? 'θ<sub>k+1</sub> = cos θ<sub>k</sub> → θ* = cos θ* = 0.739085' : 'I(φ) = cos ε e₃ + sin ε (cos φ e₁ + sin φ e₂) · s<sub>k</sub> = sin²ε cos<sup>2(k−1)</sup>ε')
      : 'Ω = (cos ε) I + (sin ε) e<sub>⊥</sub> · r₁ ∧ r₂ ∧ r₃ = sin³ε I₃';
    lensBtn.setAttribute('aria-pressed', String(S.lens === 'dynamic'));
  }
  /** s_K for 0 < ε < 90°, from its logarithm, so that a tail far below 10⁻⁶ is never printed as 0. */
  function tailText(M) {
    const lg = 2 * Math.log10(M.sin) + 2 * (M.K - 1) * Math.log10(M.cos);
    if (lg >= -4) return fix(M.survival[M.K], 6);
    let e = Math.floor(lg), m = fix(10 ** (lg - e), 2);
    if (m === '10.00') { m = '1.00'; e += 1; }
    return `${m} × 10<sup>−${-e}</sup>`;
  }
  /** The chase: s_k = sin²ε cos^{2(k−1)}ε stays positive for 0 < ε < 90°; at ε = 0 it is 0 from beat 1, at ε = 90° from beat 2. */
  function chaseNote(M) {
    const K = M.K, zeroFrom = (k) => (k === K ? `s<sub>${K}</sub> = 0` : `s<sub>${k}</sub> = … = s<sub>${K}</sub> = 0`);
    if (M.sin === 0) {
      return L(`ε = 0：I 与 Ω 重合，残差 sin ε = 0；第 1 拍全部返回（p<sub>1</sub> = 1），存活 ${zeroFrom(1)}：没有追赶，只剩点场。`,
        `ε = 0: I coincides with Ω and the residual sin ε = 0; everything returns on beat 1 (p<sub>1</sub> = 1) and the survival ${zeroFrom(1)}: no chase, only the point-field.`);
    }
    if (M.cos === 0 && K >= 2) {
      return L(`ε = 90°：每一步的残差都是 sin ε = 1；第 1 拍什么也没返回（p<sub>1</sub> = 0，s<sub>1</sub> = 1），第 2 拍全部返回（p<sub>2</sub> = 1），此后 ${zeroFrom(2)}：存活在第 2 拍归零。`,
        `ε = 90°: every step leaves the residual sin ε = 1; nothing returns on beat 1 (p<sub>1</sub> = 0, s<sub>1</sub> = 1), everything returns on beat 2 (p<sub>2</sub> = 1) and then ${zeroFrom(2)}: the survival reaches 0 on beat 2.`);
    }
    if (M.cos === 0) {
      return L('ε = 90°：每一步的残差都是 sin ε = 1；第 1 拍什么也没返回，s<sub>1</sub> = 1 > 0。但 cos ε = 0，第 2 拍会全部返回（p<sub>2</sub> = 1），存活从 s<sub>2</sub> 起归零。',
        'ε = 90°: every step leaves the residual sin ε = 1; nothing returns on beat 1, so s<sub>1</sub> = 1 > 0. But cos ε = 0: everything would return on beat 2 (p<sub>2</sub> = 1) and the survival is 0 from s<sub>2</sub> on.');
    }
    return L(`每一步的残差都是 sin ε；受监测的存活尾 s<sub>k</sub> > 0：到第 ${K} 步仍剩 s<sub>K</sub> = ${tailText(M)}，校准没有在有限步内完成。`,
      `Every step leaves the residual sin ε; the monitored survival tail s<sub>k</sub> > 0: after ${K} steps s<sub>K</sub> = ${tailText(M)} remains, the calibration does not finish in finitely many steps.`);
  }
  function noteFor(M, I) {
    // the chase states its survival tail for every ε, the point-field case included
    if (M.lam >= 0.5 && !S.dottie) return chaseNote(M);
    if (M.fade < 0.02) return L('ε = 0：⟨I, Ω⟩ = 1，I 与 Ω 重合，正交余项为零，没有盲区、面积、体积与追赶：只剩点场。', 'ε = 0: ⟨I, Ω⟩ = 1, I coincides with Ω, the orthogonal remainder is zero: no blind plane, area, volume or chase, only the point-field.');
    if (M.lam >= 0.5 && S.dottie) return L(`自指对焦从 θ₀ = 0 出发，每步取 θ<sub>k+1</sub> = cos θ<sub>k</sub>，在 θ* 两侧来回，误差按 −sin θ* = ${fix(-Math.sin(DOTTIE), 4)} 倍缩小，落不回 0。`, `Self-focusing starts at θ₀ = 0 and takes θ<sub>k+1</sub> = cos θ<sub>k</sub>, swinging about θ*; the gap shrinks by −sin θ* = ${fix(-Math.sin(DOTTIE), 4)} a step and never returns to 0.`);
    return L(`往返只收回 cos²ε = ${fix(M.cos2, 4)}；余下的 sin ε 立在 î 盲区里，两条正交误差围出 sin²ε，三条围出 sin³ε。`, `The round trip brings back only cos²ε = ${fix(M.cos2, 4)}; the remaining sin ε stands in the blind plane î, two orthogonal errors enclose sin²ε and three enclose sin³ε.`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('误差的四个阶：沿 ε，什么在长', 'Four orders of the error: what grows along ε');
    const g = kit.plot(cv, { x: [0, 90], y: [0, 1.05], pad: [34, 12, 10, 22] });
    g.axes({ xTicks: [0, 15, 30, 45, 60, 75, 90], yTicks: [0, 0.5, 1], xLabel: 'ε (°)' });
    const xs = range(0, 90, 180);
    g.vline(DOTTIE_DEG, P.dim, { alpha: 0.9, dash: [4, 4] });
    g.line(xs.map((x) => [x, Math.cos(x * DEG) ** 2]), P.sigma, { width: 2 });
    g.line(xs.map((x) => [x, Math.sin(x * DEG)]), P.cyan, { width: 2 });
    g.line(xs.map((x) => [x, Math.sin(x * DEG) ** 2]), P.magenta, { width: 2 });
    g.line(xs.map((x) => [x, Math.sin(x * DEG) ** 3]), P.violet, { width: 2 });
    g.vline(M.epsDeg, P.amber, { alpha: 0.9 });
    [[P.sigma, 'cos^{2}ε', 0.66], [P.cyan, 'sin ε', 0.54], [P.magenta, 'sin^{2}ε', 0.42], [P.violet, 'sin^{3}ε', 0.30]].forEach(([col, t, y]) => g.text(88.5, y, t, col, { size: 10.5, align: 'right' }));
    $('plotMeta').innerHTML = `θ* = ${fix(DOTTIE_DEG, 4)}° · ${L('当前', 'now')} ε = ${fix(M.epsDeg, 2)}°`;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const railLabel = (t) => (S.drive === 'collapse' ? `τ ${fix(t, 2)} · ε ${fix(collapseEps(t), 2)}°` : `τ ${fix(t, 2)} · k ${fix(S.K * t, 1)}/${S.K}`);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0.5, rate: 0.08, step: 0.05, loop: true,
    format: (t) => `${railLabel(t)} <small>/ 1</small>`,
    onChange: (t) => { S.tau = t; if (S.drive === 'collapse') syncFields(); paint(); }
  });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
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
  let transition = null, booting = true;
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    clock.pause();
    S.epsDeg = Math.round(e.epsDeg * 100) / 100; S.from = null; S.blend = 1;
    if (S.drive === 'collapse') { S.drive = 'phase'; clock.set(0.5); }
    cards.mark(null);
  }
  const fEps = kit.field($('epsDeg'), { fmt: (v) => `${fix(clamp(v, 0, EPS_MAX), 2)}°`, onInput: (v) => { leave(); S.epsDeg = clamp(v, 0, EPS_MAX); paint(); } });
  const fK = kit.field($('chaseSteps'), { fmt: (v) => String(Math.round(clamp(v, 1, K_MAX))), onInput: (v) => { leave(); S.K = Math.round(clamp(v, 1, K_MAX)); paint(); } });
  function syncFields() { const e = eff(); fEps.set(Math.round(e.epsDeg * 100) / 100); fK.set(S.K); }
  function setEps(v) { S.epsDeg = clamp(v, 0, EPS_MAX); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  function setLens(lens, ms) {
    const from = eff();
    leave();
    S.lens = lens;
    if (ms > 0 && !TRV.still) startBlend(from, ms);
    paint();
  }
  lensBtn.addEventListener('click', () => setLens(S.lens === 'static' ? 'dynamic' : 'static', 600));

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'zero-error-turiya-silence': { epsDeg: 0, lens: 'static', dottie: false, drive: 'phase', chaseSteps: 8, play: false, still: 0 },
    'dottie-self-focus-steady-state': { epsDeg: 42.35, lens: 'dynamic', dottie: true, drive: 'phase', chaseSteps: 12, play: true, still: 0.65 },
    'static-projection-results-hierarchy': { epsDeg: 42.35, lens: 'static', dottie: false, drive: 'phase', chaseSteps: 8, play: false, still: 0.5 },
    'dynamic-observation-action-chase': { epsDeg: 42.35, lens: 'dynamic', dottie: false, drive: 'phase', chaseSteps: 12, play: true, still: 0.5 },
    'maya-scaling-collapse-audit': { epsDeg: 15, lens: 'static', dottie: false, drive: 'collapse', chaseSteps: 8, play: true, still: 0.75 }
  };
  const NOTES = {
    'zero-error-turiya-silence': ['零误差：ε = 0 时观测尺 I 与点场 Ω 重合，⟨I, Ω⟩ = 1，正交余项 sin ε = 0。盲区、面积、体积、刻度与追赶全部淡出，只剩银白的点场：‖Ω‖² = 1.0000，1 = 1。拖琥珀手柄离开 0，万象才一起出现。',
      'Zero error: at ε = 0 the ruler I coincides with the point-field Ω, ⟨I, Ω⟩ = 1 and the orthogonal remainder sin ε = 0. The blind plane, the area, the volume, the ticks and the chase all fade out, leaving only the silver point-field: ‖Ω‖² = 1.0000, 1 = 1. Drag the amber handle away from 0 and everything appears at once.'],
    'dottie-self-focus-steady-state': ['自指对焦：观察者以自己上一步的读数为下一步的目标，θ<sub>k+1</sub> = cos θ<sub>k</sub>。青色螺线从 Ω 出发（θ₀ = 0），第一步跳到 57.30°，此后在紫色 θ* 锥两侧来回收拢，落向 θ* = 42.3465°，而不是回到 0。τ = 0.65 时走到第 7 步。',
      'Self-focusing: the observer aims each step at its own previous reading, θ<sub>k+1</sub> = cos θ<sub>k</sub>. The cyan spiral leaves Ω (θ₀ = 0), jumps to 57.30° on the first step and then swings in on both sides of the violet θ* cone towards θ* = 42.3465°, never back to 0. At τ = 0.65 it is at step 7.'],
    'static-projection-results-hierarchy': ['投影结果：ε = 42.35° 时，青色的投影 (cos ε)I = 0.7390，往返回声 (cos²ε)Ω = 0.5462；品红残差 r₁ = sin ε e<sub>⊥</sub> = 0.6737 立在 î 盲区里（I·e<sub>⊥</sub> = 0）。两条正交误差围出品红面积 sin²ε = 0.4538，旁边球面直角三角形的角盈 Ω(ε, ε) = 0.2979（领头项 ½ sin²ε = 0.2269）；三条围出紫色体积 sin³ε = 0.3057。',
      'Projection results: at ε = 42.35° the cyan projection (cos ε)I = 0.7390 and the round-trip echo (cos²ε)Ω = 0.5462; the magenta residual r₁ = sin ε e<sub>⊥</sub> = 0.6737 stands in the blind plane î (I·e<sub>⊥</sub> = 0). Two orthogonal errors enclose the magenta area sin²ε = 0.4538, beside the spherical right triangle of excess Ω(ε, ε) = 0.2979 (leading term ½ sin²ε = 0.2269); three enclose the violet volume sin³ε = 0.3057.'],
    'dynamic-observation-action-chase': ['观测动作：Ω 不动（‖Δx<sub>Ω</sub>‖ = 0），观测尺沿半角 ε 的紫色进动锥一步步重新寻址，青色旋子弧连起 12 步，每步残差都是 sin ε = 0.6737，轨速比 sin ε，ΔE/ħω = ½ sin ε = 0.3368。品红尖刺是受监测的存活尾 s<sub>k</sub> = sin²ε cos<sup>2(k−1)</sup>ε，处处大于 0。τ = 0.5 时走到第 6 步。',
      'Observation actions: Ω does not move (‖Δx<sub>Ω</sub>‖ = 0) while the ruler re-addresses step by step around the violet precession cone of half-angle ε; cyan rotor arcs join 12 steps, each leaving the residual sin ε = 0.6737, speed ratio sin ε, ΔE/ħω = ½ sin ε = 0.3368. The magenta spikes are the monitored survival tail s<sub>k</sub> = sin²ε cos<sup>2(k−1)</sup>ε, positive everywhere. At τ = 0.5 it is at step 6.'],
    'maya-scaling-collapse-audit': ['归零审计：时间轴把误差从 60° 收向 0，ε(τ) = 60°(1 − τ)。体积按 sin³ε 最先隐退，面积按 sin²ε，残差与盲区按 sin ε，最后观测尺并入 Ω。τ = 0.75 时 ε = 15°：sin ε = 0.2588，sin²ε = 0.0670，sin³ε = 0.0173。',
      'Collapse audit: the rail draws the error from 60° to 0, ε(τ) = 60°(1 − τ). The volume fades first, as sin³ε, then the area as sin²ε, the residual and the blind plane as sin ε, and the ruler finally merges into Ω. At τ = 0.75, ε = 15°: sin ε = 0.2588, sin²ε = 0.0670, sin³ε = 0.0173.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'zero-error-turiya-silence': ['ε = 0：观测尺并入 Ω，一切淡出，只剩点场，‖Ω‖² = 1。', 'ε = 0: the ruler merges into Ω, everything fades and only the point-field is left, ‖Ω‖² = 1.'],
    'dottie-self-focus-steady-state': ['青色螺线 θ ↦ cos θ 从 0 出发，收向 θ* = 42.3465°，回不到 0。', 'The cyan spiral θ ↦ cos θ leaves 0 and closes on θ* = 42.3465°, never back to 0.'],
    'static-projection-results-hierarchy': ['ε = 42.35°：残差 sin ε、面积 sin²ε、体积 sin³ε 从同一个误差长出。', 'ε = 42.35°: the residual sin ε, the area sin²ε and the volume sin³ε grow from one error.'],
    'dynamic-observation-action-chase': ['Ω 不动，观测尺绕进动锥追赶，每步残差 sin ε，存活尾不归零。', 'Ω stays still while the ruler chases around the cone; each step leaves sin ε, the tail never vanishes.'],
    'maya-scaling-collapse-audit': ['误差收到 15°：体积 0.0173 最先隐退，面积 0.0670，残差 0.2588。', 'The error closed to 15°: the volume 0.0173 fades first, the area 0.0670, the residual 0.2588.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.epsDeg = p.epsDeg; S.lens = p.lens; S.dottie = !!p.dottie; S.drive = p.drive; S.K = p.chaseSteps; S.from = null; S.blend = 1;
    sc.view([VIEW0[0], VIEW0[1], 1], booting || TRV.still ? 0 : 600);
    const plays = p.play && !TRV.still && (!booting || TRV.embed);
    clock.set(plays ? 0 : p.still);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (plays) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉误差 ε 与追赶步数 K，换透镜，拖琥珀手柄。时间轴现在是观测尺的方位。随时可以再选一张卡。', 'Free play: pull the error ε and the chase steps K, switch the lens, drag the amber handle. The rail is now the azimuth of the ruler. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.MAYA_ERROR_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, lens: S.lens, lam: M.lam, dottie: S.dottie, drive: S.drive, blending: !!(S.from && S.blend < 1),
        epsDeg: M.epsDeg, eps: M.eps, K: M.K, tau: M.tau, phi: M.phi, fade: M.fade,
        observer: M.I, foot: M.foot, residual: M.r1, eperp: M.eperp, leg2: M.r2, echo: M.echo, dyn: M.dyn,
        cos: M.cos, sin: M.sin, cos2: M.cos2, sin2: M.sin2, sin3: M.sin3, budget: M.cos2 + M.sin2,
        girard: M.girard, halfSin2: M.halfSin2, cellHalf: M.cellHalf,
        kNow: M.kNow, kInt: M.kInt, phis: M.phis, survival: M.survival, returns: M.returns, conservation: M.conservation,
        speedRatio: M.speedRatio, mtSpread: M.mtSpread, thetas: M.thetas, thetaNow: M.thetaNow, dottieTheta: DOTTIE,
        omegaPos: M.omegaPos, omegaShift: M.omegaShift,
        leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.lens != null) S.lens = o.lens === 'dynamic' ? 'dynamic' : 'static';
      if (o.dottie != null) S.dottie = !!o.dottie;
      if (o.epsDeg != null) S.epsDeg = clamp(o.epsDeg, 0, EPS_MAX);
      if (o.K != null) S.K = Math.round(clamp(o.K, 1, K_MAX));
      syncFields();
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the point of the current meridian at the error epsDeg, for drag targets. */
    dragTarget(epsDeg) {
      const b = stageEl.getBoundingClientRect(), q = sc.p(sph(epsDeg * DEG, phiOf(S.tau)));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    }
  });
  window.TRV_THUMB = () => { cards.pick('static-projection-results-hierarchy'); clock.pause(); clock.set(0.5); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('static-projection-results-hierarchy'));
  booting = false;
  paint();
})();
