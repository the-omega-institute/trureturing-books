/* Film · The gate that takes no time · 零耗时的门
   (book quantum-geometry, part III: chapter 11). Scenes for theme/film/engine.js.

   Bloch vectors r = (x, y, z), north pole |0⟩ = (0, 0, 1), P(0) = (1 + z) / 2. R_φ(θ) turns r by θ about the
   equatorial axis n_φ = (cos φ, sin φ, 0) (right-handed); R_z(λ) turns it by λ about the vertical axis.

   What each scene shows, and where it rests:
     hook   an X(π/2) pulse of about 25 ns and a Z turn of 0 ns (chapter 11, §11.2 and §11.4: engineering
            literature, rem-pulses-literature; argued).
     area   in the rotating frame, under resonance and the rotating-wave approximation, a fixed-phase pulse turns the
            state by its area θ = ∫Ω dt (rem-rwa-pulse-area-literature: literature, not formalized; argued). The tap and
            jug are an analogy (argued). Ω/2π = 10 MHz for 25 ns: θ = 2π · 10⁷ · 25 · 10⁻⁹ = π/2, north pole → −y,
            P(0) = 1/2; Ω/2π = 20 MHz for 12.5 ns: the same area (computed).
     order  three real symmetric 2×2 matrices of Frobenius norm 1 (L = 1), A = diag(0.8, 0.6), B = σx/√2,
            C = [[½, ½], [½, −½]] (pairwise non-commuting); pulse0(X, t) = (it)⁻¹(exp(itX) − 1); the imaginary part and the real deviation of
            Tr(pulse0 A · pulse0 B · pulse0 C) from Tr(ABC) at t = 0.4, 0.2, 0.1 (computed) under the bound 5/4 L⁵ t²
            ..... OrderedThreePulseTrace.ordered_three_pulse_real_trace_bound (LEAN). The two-column ledger is an
            analogy for the proof's first-order term being purely imaginary (chapter 11; argued).
     vz     a Z turn keeps the height, hence P(0) (computed). |0⟩ → X(π/2) → Z(60°) → X(π/2) ends at
            (√3/2, 0, −1/2); skipping the Z turn and firing the second pulse at phase −60° ends at (√3/4, −3/4, −1/2),
            which is R_z(−60°) of the literal end: same height, P(0) = 1/4 (computed). The scheduling rule
            φ_phys = φ − λ is literature (rem-virtual-z-scheduling-literature; argued). Map and hiker: an analogy.
     pull   one step U = R_x(60°) on the state |0⟩, or its pull-back U* E U on the effect E = |0⟩⟨0|: P(0) after
            t = 0, 1, 2, 3 steps is 1, 0.75, 0.25, 0 on both sides (computed) ..... ObserverPullbackTraceIdentity.
            observer_pullback_trace_identity (LEAN): for a channel and a completely positive map dual to it under the
            trace, Tr(Φᵗ(ρ) E) = Tr(ρ Φ*ᵗ(E)) for every t ∈ ℕ. The photo and camera are an analogy (argued).
     edge   the limits as chapter 11 states them (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by a second
   route (complex 2×2 matrices for the pulses and the readouts, a numerical integral for pulse0). Any disagreement is
   pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const VZ_LEAN = {
  ordered_three_pulse_real_trace_bound: 'D5/S3/Quantum/Dynamics/OrderedThreePulseTrace.ordered_three_pulse_real_trace_bound',
  observer_pullback_trace_identity: 'D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity'
};
const V3 = () => QG_SPHERE.v3;
const NORTH = [0, 0, 1];
const axisPhi = phi => [Math.cos(phi), Math.sin(phi), 0];
const DEG = Math.PI / 180;
/* scene area: the two pulses, Rabi frequency in MHz and length in ns */
const AR_P = [{ mhz: 10, ns: 25 }, { mhz: 20, ns: 12.5 }];
const arTheta = (mhz, ns) => 2 * Math.PI * mhz * 1e6 * ns * 1e-9;
/* scene vz: λ = 60° */
const VZ_LAM = 60 * DEG;
const vzAfter1 = () => V3().rot(NORTH, [1, 0, 0], Math.PI / 2);                       // (0, −1, 0)
const vzLiteralMid = () => V3().rot(vzAfter1(), [0, 0, 1], VZ_LAM);                    // (√3/2, −1/2, 0)
const vzLiteralEnd = () => V3().rot(vzLiteralMid(), [1, 0, 0], Math.PI / 2);           // (√3/2, 0, −1/2)
const vzVirtualEnd = () => V3().rot(vzAfter1(), axisPhi(-VZ_LAM), Math.PI / 2);        // (√3/4, −3/4, −1/2)
const p0 = r => (1 + r[2]) / 2;

/* complex numbers [re, im] and complex 2×2 matrices [m00, m01, m10, m11] */
const cx = {
  add: (p, q) => [p[0] + q[0], p[1] + q[1]], sub: (p, q) => [p[0] - q[0], p[1] - q[1]],
  mul: (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]], conj: p => [p[0], -p[1]],
  sc: (p, k) => [p[0] * k, p[1] * k], div: (p, q) => { const d = q[0] * q[0] + q[1] * q[1]; return [(p[0] * q[0] + p[1] * q[1]) / d, (p[1] * q[0] - p[0] * q[1]) / d]; }
};
const cm = {
  real: R => [[R[0][0], 0], [R[0][1], 0], [R[1][0], 0], [R[1][1], 0]],
  mul: (A, B) => [0, 1, 2, 3].map(q => { const i = q >> 1, j = q & 1; return cx.add(cx.mul(A[2 * i], B[j]), cx.mul(A[2 * i + 1], B[2 + j])); }),
  add: (A, B) => A.map((z, k) => cx.add(z, B[k])), sub: (A, B) => A.map((z, k) => cx.sub(z, B[k])),
  sc: (A, z) => A.map(w => cx.mul(w, z)), dag: A => [cx.conj(A[0]), cx.conj(A[2]), cx.conj(A[1]), cx.conj(A[3])],
  tr: A => cx.add(A[0], A[3]), I: () => [[1, 0], [0, 0], [0, 0], [1, 0]]
};
/* exp(i s X) for a real symmetric 2×2 X = m I + K, K traceless with K² = k² I: e^{ism}(cos(sk) I + i sin(sk)/k K) */
function expIsX(X, s) {
  const m = (X[0][0] + X[1][1]) / 2, K = [[X[0][0] - m, X[0][1]], [X[1][0], X[1][1] - m]];
  const k = Math.hypot(K[0][0], K[0][1]), ph = [Math.cos(s * m), Math.sin(s * m)];
  const c = Math.cos(s * k), sk = k > 1e-15 ? Math.sin(s * k) / k : s;
  const M = [[c + 0, sk * K[0][0]], [0, sk * K[0][1]], [0, sk * K[1][0]], [c, sk * K[1][1]]];
  return M.map(z => cx.mul(z, ph));
}
/* pulse0(X, s) = (s i)⁻¹ (exp(s i X) − 1) for s ≠ 0 (the closed form of the proposition) */
const pulse0 = (X, s) => cm.sc(cm.sub(expIsX(X, s), cm.I()), cx.div([1, 0], [0, s]));
/* the three matrices of scene order (Frobenius norm 1 each) */
const OR_A = [[0.8, 0], [0, 0.6]], OR_B = [[0, Math.SQRT1_2], [Math.SQRT1_2, 0]], OR_C = [[0.5, 0.5], [0.5, -0.5]];
const OR_T = [0.4, 0.2, 0.1];
const rmul = (P, Q) => [[P[0][0] * Q[0][0] + P[0][1] * Q[1][0], P[0][0] * Q[0][1] + P[0][1] * Q[1][1]], [P[1][0] * Q[0][0] + P[1][1] * Q[1][0], P[1][0] * Q[0][1] + P[1][1] * Q[1][1]]];
const OR_TRABC = (() => { const M = rmul(rmul(OR_A, OR_B), OR_C); return M[0][0] + M[1][1]; })();
const orRow = t => {
  const T = cm.tr(cm.mul(cm.mul(pulse0(OR_A, t), pulse0(OR_B, t)), pulse0(OR_C, t)));
  return { t, im: T[1], dev: Math.abs(T[0] - OR_TRABC), bound: 1.25 * t * t };
};
/* scene pull: one step R_x(60°) */
const PL_STEP = 60 * DEG;
const ux = a => [[Math.cos(a / 2), 0], [0, -Math.sin(a / 2)], [0, -Math.sin(a / 2)], [Math.cos(a / 2), 0]];   // exp(−i a X/2)
const uz = a => [[Math.cos(a / 2), -Math.sin(a / 2)], [0, 0], [0, 0], [Math.cos(a / 2), Math.sin(a / 2)]];     // exp(−i a Z/2)
const uphi = (phi, a) => { const c = Math.cos(a / 2), s = Math.sin(a / 2); return [[c, 0], cx.mul([0, -s], [Math.cos(phi), -Math.sin(phi)]), cx.mul([0, -s], [Math.cos(phi), Math.sin(phi)]), [c, 0]]; };
const rhoOf = r => [[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2], [r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]];
const blochOf = A => [2 * A[2][0], 2 * A[2][1], A[0][0] - A[3][0]];
const conjU = (U, A) => cm.mul(cm.mul(U, A), cm.dag(U));
const E0 = [[1, 0], [0, 0], [0, 0], [0, 0]];
const fmt = (v, n) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('virtual-z film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
  const nearV = (p, q, eps = 1e-12) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < eps;
  const nearM = (A, B, eps = 1e-12) => A.every((z, k) => near(z[0], B[k][0], eps) && near(z[1], B[k][1], eps));

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(VZ_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(VZ_LEAN).length}`);
  for (const [short, gid] of Object.entries(VZ_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  check(typeof QG_SPHERE === 'object' && typeof QG_SPHERE.ball === 'function', 'QG_SPHERE (viz/two-angle-addressing/model.js) is missing');

  /* 1. AREA: the two pulse areas, the quarter turn, and the same turn from the matrix exp(−iθX/2) */
  for (const p of AR_P) check(near(arTheta(p.mhz, p.ns), Math.PI / 2), `area of ${p.mhz} MHz × ${p.ns} ns is π/2`);
  const q = V3().rot(NORTH, [1, 0, 0], Math.PI / 2);
  check(nearV(q, [0, -1, 0]) && near(p0(q), 0.5), 'a quarter turn about X takes the north pole to −y, P(0) = 1/2');
  for (let k = 0; k <= 12; k++) {
    const th = Math.PI * k / 12, r = blochOf(conjU(ux(th), rhoOf(NORTH)));
    check(nearV(r, V3().rot(NORTH, [1, 0, 0], th)), `R_x(${k}π/12) on the sphere and as a matrix`);
  }

  /* 2. ORDER: Frobenius norms, the closed form against a numerical integral, the table, the bound */
  const frob = R => Math.hypot(R[0][0], R[0][1], R[1][0], R[1][1]);
  for (const R of [OR_A, OR_B, OR_C]) check(near(frob(R), 1, 1e-15) && near(R[0][1], R[1][0]), 'symmetric with Frobenius norm 1');
  check(near(OR_TRABC, 0.7 * Math.SQRT1_2, 1e-15), 'Tr(ABC) = 0.7/√2');
  for (const t of OR_T) for (const X of [OR_A, OR_B, OR_C]) {
    /* ∫₀¹ exp(s r i X) X dr by Simpson's rule, 400 intervals */
    const n = 400, XC = cm.real(X);
    let S = [[0, 0], [0, 0], [0, 0], [0, 0]];
    for (let i = 0; i <= n; i++) { const w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2; S = cm.add(S, cm.sc(cm.mul(expIsX(X, t * i / n), XC), [w / (3 * n), 0])); }
    check(nearM(S, pulse0(X, t), 1e-10), `pulse0 closed form at t = ${t}`);
  }
  const rows = OR_T.map(orRow);
  rows.forEach(r => check(r.dev <= r.bound, `deviation under 5/4 t² at t = ${r.t}`));
  check(['0.0758', '0.0397', '0.0201'].every((s, i) => rows[i].im.toFixed(4) === s), 'imaginary readouts');
  check(['0.0360', '0.0092', '0.0023'].every((s, i) => rows[i].dev.toFixed(4) === s), 'deviation readouts');
  /* the three matrices pairwise do not commute, and the trace does not depend on the order of the three kernels */
  const comm = (P, Q) => { const a = rmul(P, Q), b = rmul(Q, P); return Math.hypot(a[0][0] - b[0][0], a[0][1] - b[0][1], a[1][0] - b[1][0], a[1][1] - b[1][1]); };
  check(comm(OR_A, OR_B) > 0.1 && comm(OR_B, OR_C) > 0.1 && comm(OR_A, OR_C) > 0.1, 'A, B, C pairwise non-commuting');
  for (const t of OR_T) {
    const P = [OR_A, OR_B, OR_C].map(X => pulse0(X, t)), T0 = cm.tr(cm.mul(cm.mul(P[0], P[1]), P[2]));
    for (const [i, j, k] of [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]) { const T = cm.tr(cm.mul(cm.mul(P[i], P[j]), P[k])); check(near(T[0], T0[0], 1e-12) && near(T[1], T0[1], 1e-12), `order-free trace at t = ${t}`); }
  }
  check(['0.2000', '0.0500', '0.0125'].every((s, i) => rows[i].bound.toFixed(4) === s), 'bound readouts');
  check(rows[0].im / rows[1].im > 1.85 && rows[0].im / rows[1].im < 2.05 && rows[1].im / rows[2].im > 1.85 && rows[1].im / rows[2].im < 2.05, 'imaginary part about halves');
  check(rows[0].dev / rows[1].dev > 3.8 && rows[0].dev / rows[1].dev < 4.1 && rows[1].dev / rows[2].dev > 3.8 && rows[1].dev / rows[2].dev < 4.1, 'real error to about a quarter');

  /* 3. VZ: the literal and the virtual circuit, as matrices on |0⟩ and as turns of the sphere */
  check(nearV(vzLiteralEnd(), [Math.sqrt(3) / 2, 0, -0.5]) && nearV(vzVirtualEnd(), [Math.sqrt(3) / 4, -0.75, -0.5]), 'end points');
  check(nearV(V3().rot(vzVirtualEnd(), [0, 0, 1], VZ_LAM), vzLiteralEnd()), 'the literal end is R_z(60°) of the virtual end');
  const r0 = rhoOf(NORTH);
  const lit = conjU(cm.mul(ux(Math.PI / 2), cm.mul(uz(VZ_LAM), ux(Math.PI / 2))), r0);
  const vir = conjU(uphi(-VZ_LAM, Math.PI / 2), conjU(ux(Math.PI / 2), r0));
  check(nearV(blochOf(lit), vzLiteralEnd()) && nearV(blochOf(vir), vzVirtualEnd()), 'circuits as matrices');
  /* the identity R_φ(θ) R_z(λ) = R_z(λ) R_{φ−λ}(θ) behind the trick (literature, re-checked here) */
  for (let k = 0; k < 8; k++) {
    const ph = rnd(k, 1) * TAU, th = rnd(k, 2) * TAU, la = rnd(k, 3) * TAU;
    check(nearM(cm.mul(uphi(ph, th), uz(la)), cm.mul(uz(la), uphi(ph - la, th))), `commutation identity ${k}`);
  }
  check(near(p0(vzLiteralEnd()), 0.25) && near(p0(vzVirtualEnd()), 0.25) && near(cm.tr(cm.mul(lit, E0))[0], 0.25) && near(cm.tr(cm.mul(vir, E0))[0], 0.25), 'P(0) = 1/4 both ways');
  for (let k = 0; k <= 24; k++) { const r = V3().sph(60 * DEG, k * TAU / 24); check(near(p0(V3().rot(r, [0, 0, 1], 1.3 * k)), 0.75), `Z turn keeps P(0) ${k}`); }

  /* 4. PULL: push the state t steps, or pull the effect back t steps */
  const U = ux(PL_STEP), Ud = cm.dag(U);
  let rho = r0, eff = E0;
  [1, 0.75, 0.25, 0].forEach((v, t) => {
    const push = cm.tr(cm.mul(rho, E0)), pull = cm.tr(cm.mul(r0, eff));
    check(near(push[0], v) && near(pull[0], v) && near(push[1], 0) && near(pull[1], 0), `step ${t}: ${v} on both sides`);
    rho = conjU(U, rho); eff = cm.mul(cm.mul(Ud, eff), U);
  });
});
Object.assign(FILM.speed, { hook: 0.02, area: 0.014, order: 0.016, vz: 0.014, pull: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const vzFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx0 = x;
  if (o.align === 'center') cx0 = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx0, y, { size, fam, w, c: col, a, ab: o.ab }); cx0 += tw(s, size, fam, w); }
  return cx0;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const VZ_MISSING = new Set();
function leanChip(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!VZ_MISSING.has(gid)) { VZ_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* orthographic view of the sphere: world (x, y, z), z up → [screen x, screen y, depth]; the solid shot uses the same camera */
function view(cx0, cy0, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => { const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2]; return [cx0 + X * R, cy0 - (Z * ce + Y * se) * R, Y * ce - Z * se]; };
  return Object.assign(V, { cx: cx0, cy: cy0, R, yaw, el });
}
function shot(key, V, r) {
  return solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
}
const ballStyle = { glass: C.cyan, ink: C.blue, width: 1.4, alpha: 0.55, back: 0.35, shell: { alpha: 0.07, rim: 0.45 } };
/* a 2D sketch of the sphere (no solid): outline, equator, axis */
function sketchBall(cx0, cy0, R, a) {
  if (a <= 0.003) return;
  ring(cx0, cy0, R, C.white, a * 0.6, 2);
  ctx.save(); ctx.globalAlpha = a * 0.5; ctx.strokeStyle = C.blue; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(cx0, cy0, R, R * 0.28, 0, 0, TAU); ctx.stroke(); ctx.restore();
  dashed(cx0, cy0 + R * 1.15, cx0, cy0 - R * 1.2, C.dim, a * 0.8, 1.5);
}
/* a pulse box on a time axis: magenta envelope of height h (px) and length len (px), filled up to fill (0..1) */
function pulseBox(x, y, len, h, fill, a, col = C.mag) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a * 0.35; ctx.fillStyle = col; ctx.fillRect(x, y - h, len * clamp(fill), h); ctx.restore();
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.lineTo(x + len, y - h); ctx.lineTo(x + len, y); ctx.stroke(); ctx.restore();
}
function vzTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE GATE THAT TAKES NO TIME', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('AREA · ORDER · FRAME · DUALITY · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                          scene 1 · TWO KINDS OF TURN                      */
/* ======================================================================= */
SCENES.hook = S => {
  const u = S.u;
  vzTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the sphere: a sideways turn (about X) and a turn about the vertical axis */
  const cx0 = 520, cy0 = 500, R = 250;
  sketchBall(cx0, cy0, R, a);
  const V = view(cx0, cy0, R, -0.55, 0.28);
  const sx = Q(S, 0, 'sideways turn', 1.6), sz = Q(S, 1, 'vertical axis', 1.6);
  const ax0 = V([-1.25, 0, 0]), ax1 = V([1.3, 0, 0]);
  line(ax0[0], ax0[1], ax1[0], ax1[1], C.vio, a * 0.9, 3);
  txt('X', ax1[0] + 10, ax1[1] + 8, { size: 28, fam: F.math, w: 700, c: C.vio, a });
  txt('Z', cx0 + 14, cy0 - R * 1.2, { size: 28, fam: F.math, w: 700, c: C.vio, a });
  /* the X turn: north pole → −y, then (line 1) the state spins round the vertical axis on the equator */
  const th = Math.PI / 2 * ease(sx);
  let r = V3().rot(NORTH, [1, 0, 0], th);
  const arcX = QG_SPHERE.arcAbout(NORTH, [1, 0, 0], th).map(V);
  ctx.save(); ctx.globalAlpha = a * 0.9; ctx.strokeStyle = C.now; ctx.lineWidth = 4; ctx.beginPath();
  arcX.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  if (sz > 0) {
    const ph = TAU * 0.75 * ease(sz);
    r = V3().rot(r, [0, 0, 1], ph);
    const arcZ = QG_SPHERE.arcAbout(V3().rot(NORTH, [1, 0, 0], Math.PI / 2), [0, 0, 1], ph).map(V);
    ctx.save(); ctx.globalAlpha = a * 0.9; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath();
    arcZ.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  }
  const pr = V(r);
  dot(pr[0], pr[1], 13, 'g', a);
  /* the two gate cards */
  const ca = a * at(S, 0, 0.6);
  panel(1000, 220, 800, 230, ca, C.mag, 'SIDEWAYS · 侧向   X(π/2)');
  line(1040, 400, 1760, 400, C.dim, ca * 0.8, 1.5);
  pulseBox(1080, 400, 500, 90, sx, ca);
  txt('25 ns', 1330, 432, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ca });
  txt('a microwave pulse · 一个微波脉冲', 1080, 292, { size: 20, fam: F.zh, w: 700, c: C.white, a: ca });
  const za = a * at(S, 1, 0.6);
  panel(1000, 490, 800, 200, za, C.cyan, 'VERTICAL · 竖轴   Z(λ)');
  line(1040, 640, 1760, 640, C.dim, za * 0.8, 1.5);
  line(1080, 640, 1080, 560, C.cyan, za, 4);
  txt('0 ns', 1100, 600, { size: 34, fam: F.mono, w: 700, c: C.cyan, a: za });
  txt('no pulse at all · 根本不发脉冲', 1300, 600, { size: 22, fam: F.zh, w: 700, c: C.white, a: za });
  /* line 2: the idol */
  const qa = a * Q(S, 2, 'needs a push', 0.6);
  if (qa > 0.003) {
    chip(1400, 760, 600, 70, 'every turn = a push ?', C.white, qa, 30, F.mono);
    txt('谁在推？', 1400, 830, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * Q(S, 2, 'Who is pushing', 0.6) });
  }
  txt('typical numbers: engineering literature · 典型数值：工程文献', 120, 830, { size: 22, fam: F.zh, w: 700, c: C.argued, a: a * 0.9 });
};

/* ======================================================================= */
/*                            scene 2 · AREA IS ANGLE                        */
/* ======================================================================= */
const AR_V = { cx: 470, cy: 520, R: 270, yaw: 1.0, el: 0.3 };
SCENES.area = S => {
  const u = S.u, a = vzFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  const V = view(AR_V.cx, AR_V.cy, AR_V.R, AR_V.yaw + 0.01 * u, AR_V.el);
  /* time in ns into pulse 1 (line 2) and pulse 2 (line 3) */
  const t1 = 25 * clamp((u - phraseAt(S, 2, 'Ten megahertz')) / 4.2);
  const t2 = 12.5 * clamp((u - phraseAt(S, 3, 'Twice as strong')) / 2.6);
  const second = u >= phraseAt(S, 3, 'Twice as strong');
  /* line 1: the jug analogy previews a full pour before the numbers */
  const pre = ease(clamp((u - phraseAt(S, 1, 'total water')) / 2.0)) * (1 - clamp((u - lineAt(S, 2).s) / 0.4));
  const th = second ? arTheta(20, t2) : (u >= lineAt(S, 2).s ? arTheta(10, t1) : Math.PI / 2 * pre);
  const r = V3().rot(NORTH, [1, 0, 0], th);
  const sh = shot('area', V, [110, 200, 740, 660]);
  sh.begin();
  QG_SPHERE.ball(sh, ballStyle);
  sh.line([[-1.3, 0, 0], [1.3, 0, 0]], { color: C.vio, width: 4, alpha: 0.95 });
  sh.line([[0, 0, -1.2], [0, 0, 1.25]], { color: C.dim, width: 1.4, alpha: 0.7, dash: [8, 6] });
  if (th > 0.01) {
    sh.line(QG_SPHERE.arcAbout(NORTH, [1, 0, 0], th), { color: C.now, width: 4, alpha: 0.95 });
    sh.fan([[0, 0, 0]].concat(QG_SPHERE.arcAbout(NORTH, [1, 0, 0], th)), { fill: C.mag, alpha: 0.22 });
  }
  sh.bead(NORTH, { color: C.white, r: 7, alpha: 0.7 });
  sh.bead(r, { color: C.now, r: 11 });
  sh.end(a);
  const lx = V([-1.3, 0, 0]), ln = V(NORTH), lr = V(r);
  txt('X  axis · 转轴', lx[0] - 10, lx[1] + 32, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.vio, a });
  txt('|0⟩', ln[0] - 54, ln[1] - 10, { size: 26, fam: F.math, w: 700, c: C.white, a });
  txt('ψ', lr[0] + 16, lr[1] - 14, { size: 32, fam: F.math, w: 700, c: C.now, a });
  txt('rotating frame · 旋转参考系', 130, 196, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6) });

  /* the envelope plot: Ω (MHz) against time (ns), 0..30 ns */
  const pa = a * at(S, 0, 0.6, 0.4);
  const X0 = 1010, Y0 = 520, PX = 22, PY = 9;         // px per ns, px per MHz
  panel(960, 190, 860, 400, pa, C.mag, 'ENVELOPE · 包络   Ω/2π (MHz) vs t (ns)');
  line(X0, Y0, X0 + 30 * PX + 20, Y0, C.dim, pa, 1.5);
  line(X0, Y0, X0, Y0 - 25 * PY - 20, C.dim, pa, 1.5);
  for (const v of [0, 12.5, 25]) txt(String(v), X0 + v * PX, Y0 + 28, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
  for (const v of [10, 20]) txt(String(v), X0 - 10, Y0 - v * PY + 6, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: pa });
  const p1a = pa * (second ? 0.3 : 1), p2a = pa * (second ? 1 : 0);
  pulseBox(X0, Y0, 25 * PX, 10 * PY, (u >= lineAt(S, 2).s ? t1 / 25 : pre), p1a);
  if (p2a > 0.003) pulseBox(X0, Y0, 12.5 * PX, 20 * PY, t2 / 12.5, p2a);
  /* the jug (analogy) */
  const ja = pa * at(S, 1, 0.6);
  if (ja > 0.003) {
    const jx = 1650, jy = 500, jw = 110, jh = 220, lvl = clamp(th / (Math.PI / 2));
    ctx.save(); ctx.globalAlpha = ja * 0.4; ctx.fillStyle = C.mag; ctx.fillRect(jx, jy - jh * lvl, jw, jh * lvl); ctx.restore();
    box(jx, jy - jh, jw, jh, C.argued, ja, 2);
    txt('jug · 壶', jx + jw / 2, jy - jh - 14, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ja });
    txt('analogy · 比方', jx + jw / 2, jy + 34, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ja });
  }
  /* readout */
  const ra = a * at(S, 2, 0.6);
  if (ra > 0.003) {
    panel(960, 615, 860, 210, ra, C.cyan, 'AREA = ANGLE · 面积 = 转角');
    const cur = second ? AR_P[1] : AR_P[0], tt = second ? t2 : t1;
    rich([['θ = 2π × ', C.white], [`${cur.mhz} MHz`, C.mag], [' × ', C.white], [`${fmt(tt, 1)} ns`, C.now], [' = ', C.white], [`${fmt(th / Math.PI, 3)} π`, C.mag]], 990, 690, { size: 30, a: ra });
    const done = (second ? t2 >= 12.5 : t1 >= 25);
    rich([['P(0) = cos²(θ/2) = ', C.white], [fmt(p0(r), 3), C.cyan]], 990, 742, { size: 28, a: ra });
    txt(done ? 'quarter turn · 四分之一转  ✓ π/2' : '', 990, 794, { size: 24, fam: F.zh, w: 700, c: C.now, a: ra });
  }
  txt('area law: literature, not formalized here · 面积律：文献结果，未形式化', 140, 836, { size: 22, fam: F.zh, w: 700, c: C.argued, a: a * 0.95 });
};

/* ======================================================================= */
/*                            scene 3 · PULSES IN A ROW                      */
/* ======================================================================= */
function matSmall(x, y, M, name, col, a) {
  if (a <= 0.003) return;
  const cw = 72, rh = 36, size = 22;
  txt(name, x - 14, y + 26, { size: 28, fam: F.math, w: 700, align: 'right', c: col, a });
  line(x, y - 10, x, y + rh + 22, C.white, a * 0.8, 2); line(x + 2 * cw + 8, y - 10, x + 2 * cw + 8, y + rh + 22, C.white, a * 0.8, 2);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const v = M[i][j], s = Math.abs(v - Math.SQRT1_2) < 1e-12 ? '1/√2' : String(v);
    txt(s, x + 4 + cw * (j + 0.5), y + 14 + rh * i, { size, fam: F.mono, w: 700, align: 'center', c: col, a });
  }
}
SCENES.order = S => {
  const u = S.u, a = vzFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* three pulses on a time line, each about a different axis */
  const pa = a * at(S, 0, 0.6);
  panel(120, 190, 760, 300, pa, C.mag, 'THREE PULSES · 三个脉冲');
  const names = ['A', 'B', 'C'], cols = [C.mag, C.cyan, C.vio];
  line(160, 330, 840, 330, C.dim, pa * 0.8, 1.5);
  names.forEach((n, i) => {
    const on = clamp((u - lineAt(S, 0).s - 0.5 * i) / 0.5);
    pulseBox(190 + i * 220, 330, 170, 70, on, pa * on, cols[i]);
    txt(n, 275 + i * 220, 300, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: pa * on });
  });
  txt('three axes, chained · 三根轴，依次相乘', 160, 380, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
  txt('this trace does not depend on the order · 这个迹与次序无关', 160, 430, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pa * at(S, 1, 0.6) });
  /* the matrices (shown with the Lean line) */
  const ma = a * at(S, 2, 0.6, 0.6);
  if (ma > 0.003) {
    panel(120, 520, 760, 300, ma, C.cyan, 'L = 1   ‖A‖, ‖B‖, ‖C‖ ≤ 1 (Frobenius)');
    matSmall(210, 600, OR_A, 'A', C.mag, ma);
    matSmall(460, 600, OR_B, 'B', C.cyan, ma);
    matSmall(710, 600, OR_C, 'C', C.vio, ma);
    txt('real symmetric · 实对称', 150, 740, { size: 20, fam: F.zh, w: 700, c: C.white, a: ma });
    rich([['Tr(ABC) = ', C.white], [fmt(OR_TRABC, 4), C.white]], 150, 790, { size: 24, a: ma });
  }
  /* the two-column ledger */
  const la = a * at(S, 1, 0.6);
  const X1 = 960, Y1 = 190;
  panel(X1, Y1, 860, 420, la, C.argued, 'LEDGER · 两栏账');
  if (la > 0.003) {
    const c1 = X1 + 40, c2 = X1 + 260, c3 = X1 + 480, c4 = X1 + 680;
    txt('t', c1, Y1 + 76, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    txt('Im Tr', c2, Y1 + 76, { size: 24, fam: F.mono, w: 700, c: C.mag, a: la });
    txt('|Re Tr − Tr(ABC)|', c3 - 20, Y1 + 76, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: la });
    txt('5/4 L⁵ t²', c4 + 10, Y1 + 76, { size: 22, fam: F.mono, w: 700, c: C.lean, a: la * Q(S, 2, 't squared', 0.5) });
    line(c1, Y1 + 96, X1 + 830, Y1 + 96, C.dim, la * 0.7, 1.2);
    txt('leading term ∝ t · 主项是一阶', c2, Y1 + 152, { size: 18, fam: F.zh, w: 700, c: C.mag, a: la * 0.8 });
    txt('imaginary · 虚部栏', c2, Y1 + 124, { size: 20, fam: F.zh, w: 700, c: C.mag, a: la * 0.9 });
    txt('real · 实部栏', c3, Y1 + 124, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: la * 0.9 });
    const rows = OR_T.map(orRow);
    rows.forEach((rw, i) => {
      const ra = la * (i === 0 ? at(S, 1, 0.6, 1.0) : at(S, 3, 0.6, 1.2 * (i - 1) + 0.6));
      if (ra <= 0.003) return;
      const y = Y1 + 190 + i * 70, cur = i === (u >= phraseAt(S, 3, 'real error drops') ? 2 : u >= lineAt(S, 3).s ? 1 : 0);
      txt(rw.t.toFixed(1), c1, y, { size: 28, fam: F.mono, w: 700, c: cur ? C.now : C.white, a: ra });
      txt(rw.im.toFixed(4), c2, y, { size: 28, fam: F.mono, w: 700, c: C.mag, a: ra });
      txt(rw.dev.toFixed(4), c3, y, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: ra });
      txt(rw.bound.toFixed(4), c4 + 10, y, { size: 28, fam: F.mono, w: 700, c: C.lean, a: ra * Q(S, 2, 't squared', 0.5) });
      if (i > 0) {
        txt(`÷${(rows[i - 1].im / rw.im).toFixed(2)}`, c2 + 120, y - 2, { size: 18, fam: F.mono, w: 700, c: C.mag, a: ra * 0.85 });
        txt(`÷${(rows[i - 1].dev / rw.dev).toFixed(2)}`, c3 + 120, y - 2, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: ra * 0.85 });
      }
    });
    txt('computed here · 屏幕上算出', X1 + 40, Y1 + 400, { size: 18, fam: F.zh, w: 700, c: C.dim, a: la * at(S, 1, 0.6, 1.0) });
  }
  /* line 2: Lean */
  const ga = a * Q(S, 2, 'Lean checks', 0.6);
  if (ga > 0.003) {
    panel(X1, 640, 860, 185, ga, C.lean, 'REAL SYMMETRIC, ‖·‖_F ≤ L, t > 0 · 实对称、范数 ≤ L');
    rich([['|Re Tr(p₀A · p₀B · p₀C) − Tr(ABC)| ', C.white], ['≤ 5/4 · L⁵ · t²', C.lean]], X1 + 30, 712, { size: 26, a: ga });
    txt('p₀ = pulse0: an integral kernel, not a gate fidelity · 积分核，不是门保真度', X1 + 30, 752, { size: 21, fam: F.zh, w: 700, c: C.white, a: ga * 0.95 });
    leanChip(X1 + 30, 798, VZ_LEAN.ordered_three_pulse_real_trace_bound, ga, { size: 17 });
  }
  stamp('O(t²)', 1690, 560, Q(S, 2, 'squared', 0.5) * (1 - at(S, 3, 0.4, 2.0)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                              scene 4 · TURN THE MAP                       */
/* ======================================================================= */
const VZ_V = { cx: 480, cy: 520, R: 275, yaw: -1.05, el: 0.45 };
SCENES.vz = S => {
  const u = S.u, a = vzFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'The trick', 'argued'], [3, null, 'computed'], [4, null, 'argued']]);
  const V = view(VZ_V.cx, VZ_V.cy, VZ_V.R, VZ_V.yaw + 0.004 * u, VZ_V.el);
  const sh = shot('vz', V, [120, 200, 720, 650]);
  /* line 0: a state at height 1/2 spins round the vertical axis */
  const l0 = u < lineAt(S, 1).s;
  const spin = TAU * ease(clamp((u - phraseAt(S, 0, 'vertical turn')) / 3.5));
  const s0 = V3().rot(V3().sph(60 * DEG, -0.4), [0, 0, 1], spin);
  /* line 1: the literal circuit X(π/2), Z(60°), X(π/2); line 2–3: the virtual one */
  const L1 = lineAt(S, 1).s;
  const k1 = ease(clamp((u - L1 - 0.6) / 1.6)), k2 = ease(clamp((u - L1 - 2.4) / 1.4)), k3 = ease(clamp((u - L1 - 4.0) / 1.6));
  const kv = ease(clamp((u - phraseAt(S, 2, 'set the phase')) / 2.2));
  const show1 = !l0, showV = u >= phraseAt(S, 2, 'set the phase');
  const mid = vzAfter1(), litMid = vzLiteralMid(), litEnd = vzLiteralEnd(), virEnd = vzVirtualEnd();
  let lit = NORTH;
  if (show1) { lit = V3().rot(NORTH, [1, 0, 0], Math.PI / 2 * k1); if (k1 >= 1) lit = V3().rot(mid, [0, 0, 1], VZ_LAM * k2); if (k2 >= 1) lit = V3().rot(litMid, [1, 0, 0], Math.PI / 2 * k3); }
  const vir = V3().rot(mid, axisPhi(-VZ_LAM), Math.PI / 2 * kv);
  sh.begin();
  QG_SPHERE.ball(sh, ballStyle);
  sh.line([[0, 0, -1.2], [0, 0, 1.25]], { color: C.dim, width: 1.4, alpha: 0.7, dash: [8, 6] });
  if (l0) {
    sh.line(QG_SPHERE.circleThrough(s0, [0, 0, 1]), { color: C.cyan, width: 3, alpha: 0.9 });
    sh.bead(s0, { color: C.now, r: 11 });
  } else {
    /* the latitude z = −1/2: same height, same readout */
    const ringA = Q(S, 3, 'same height', 0.6);
    if (ringA > 0.003) sh.line(QG_SPHERE.circlePts([0, 0, -0.5], [0, 0, 1], Math.sqrt(0.75)), { color: C.cyan, width: 3, alpha: ringA });
    const litA = showV ? 0.75 : 1;
    sh.line(QG_SPHERE.arcAbout(NORTH, [1, 0, 0], Math.PI / 2 * k1), { color: C.white, width: 3, alpha: litA, dash: [10, 8] });
    if (k2 > 0) sh.line(QG_SPHERE.arcAbout(mid, [0, 0, 1], VZ_LAM * k2), { color: C.white, width: 3, alpha: litA, dash: [10, 8] });
    if (k3 > 0) sh.line(QG_SPHERE.arcAbout(litMid, [1, 0, 0], Math.PI / 2 * k3), { color: C.white, width: 3, alpha: litA, dash: [10, 8] });
    sh.bead(lit, { color: C.white, r: 9, alpha: litA });
    if (showV) {
      const n = axisPhi(-VZ_LAM);
      sh.line([V3().scale(n, -1.55), V3().scale(n, 1.3)], { color: C.vio, width: 4, alpha: 0.95 });
      sh.line(QG_SPHERE.arcAbout(mid, n, Math.PI / 2 * kv), { color: C.now, width: 4.5, alpha: 1 });
      sh.bead(vir, { color: C.now, r: 11 });
    }
  }
  sh.end(a);
  /* labels on the sphere */
  if (l0) {
    const q = V(s0);
    txt('z = 0.5', q[0] + 18, q[1] - 12, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  } else {
    const q = V(lit);
    txt('literal · 照字面', q[0] + 16, q[1] + 34, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * (showV ? 0.8 : 1) });
    if (showV) {
      const n = V(V3().scale(axisPhi(-VZ_LAM), -1.55)), qv = V(vir);
      txt('axis φ = −60°', n[0] + 12, n[1] - 8, { size: 24, fam: F.mono, w: 700, c: C.vio, a: a * kv });
      txt('virtual · 虚拟', qv[0] - 20, qv[1] + 40, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a: a * kv });
    }
    const ra = a * Q(S, 3, 'same height', 0.6), rr = Math.sqrt(0.75), rq = V([-Math.cos(V.yaw) * rr, Math.sin(V.yaw) * rr, -0.5]);
    txt('z = −0.5', rq[0] - 16, rq[1] + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ra });
  }

  /* right: the readout, the circuit and the phase register */
  const X1 = 960;
  if (l0) {
    panel(X1, 230, 860, 220, a, C.cyan, 'READOUT · 读数   P(0) = (1 + z) / 2');
    rich([['z = 0.5  →  P(0) = ', C.white], [fmt(p0(s0), 2), C.cyan]], X1 + 30, 320, { size: 32, a });
    txt('height unchanged · 高度不变 → 读数不变', X1 + 30, 390, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * Q(S, 0, 'readout never changes', 0.6) });
  } else {
    const ca = a * at(S, 1, 0.6);
    panel(X1, 200, 860, 250, ca, C.white, 'THE CIRCUIT · 电路');
    const gates = [['X(π/2)', 'φ = 0°'], ['Z(60°)', ''], ['X(π/2)', 'φ = 0°']];
    gates.forEach(([g, ph], i) => {
      const gx = X1 + 60 + i * 270, isZ = i === 1;
      const skip = isZ && Q(S, 2, 'skip the turn', 0.6) > 0;
      const sk = Q(S, 2, 'skip the turn', 0.6);
      box(gx, 260, 210, 70, isZ ? C.cyan : C.mag, ca * (skip ? 1 - 0.7 * sk : 1), 2);
      txt(g, gx + 105, 306, { size: 28, fam: F.mono, w: 700, align: 'center', c: isZ ? C.cyan : C.white, a: ca * (skip ? 1 - 0.7 * sk : 1) });
      if (skip) line(gx + 10, 320, gx + 200, 270, C.cyan, ca * sk, 3);
      if (i === 2) {
        const sw = Q(S, 2, 'set the phase', 0.6);
        txt(ph, gx + 105, 370, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ca * (1 - sw) });
        txt('φ = −60°', gx + 105, 370, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.vio, a: ca * sw });
      } else if (ph) txt(ph, gx + 105, 370, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ca });
      if (isZ) txt('0 ns', gx + 105, 410, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ca * sk * (1 - Q(S, 4, 'zero nanoseconds', 0.3)) });
    });
    /* the phase register */
    const fa = a * Q(S, 2, 'set the phase', 0.6);
    panel(X1, 470, 420, 150, fa, C.vio, 'FRAME REGISTER · 相位寄存器');
    rich([['φ_frame: 0° → ', C.white], ['60°', C.vio]], X1 + 24, 540, { size: 28, a: fa });
    rich([['pulse: φ − 60°', C.vio]], X1 + 24, 590, { size: 26, a: fa });
    /* the two readouts */
    const ea = a * at(S, 3, 0.6);
    panel(X1 + 440, 470, 420, 150, ea, C.cyan, 'P(0)');
    rich([['literal  ', C.white], [fmt(p0(litEnd), 2), C.cyan]], X1 + 464, 540, { size: 28, a: ea });
    rich([['virtual  ', C.now], [fmt(p0(virEnd), 2), C.cyan]], X1 + 464, 590, { size: 28, a: ea * Q(S, 3, 'one quarter', 0.5) });
    /* end points */
    const pa = a * Q(S, 3, 'sixty degrees around', 0.6);
    txt(`literal (${fmt(litEnd[0], 3)}, ${fmt(litEnd[1], 3)}, ${fmt(litEnd[2], 3)})  ·  virtual (${fmt(virEnd[0], 3)}, ${fmt(virEnd[1], 3)}, ${fmt(virEnd[2], 3)})`, X1, 662, { size: 21, fam: F.mono, w: 700, c: C.dim, a: pa });
    /* the map analogy */
    const ma = a * at(S, 4, 0.6);
    if (ma > 0.003) {
      panel(X1, 690, 860, 140, ma, C.argued, 'ANALOGY · 比方');
      txt('turn the map, not the hiker · 不转登山者，只转地图', X1 + 24, 760, { size: 24, fam: F.zh, w: 700, c: C.white, a: ma });
      txt('φ_phys = φ − λ: literature, not formalized here · 文献结果，本书未形式化', X1 + 24, 802, { size: 21, fam: F.zh, w: 700, c: C.argued, a: ma * 0.95 });
    }
  }
  if (!l0) stamp('0 ns', 1395, 395, Q(S, 4, 'zero nanoseconds', 0.5), C.cyan, 40, -0.06);
};

/* ======================================================================= */
/*                              scene 5 · PUSH OR PULL                       */
/* ======================================================================= */
/* a circle in the y–z plane: centre (cx, cy), R px per unit; world (y, z) → screen (x right = −y, up = z) */
function yz(cx0, cy0, R) { return p => [cx0 - p[1] * R, cy0 - p[2] * R]; }
SCENES.pull = S => {
  const u = S.u, a = vzFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  /* step count: 0..3 during line 2, one step per number spoken */
  const L2 = lineAt(S, 2), mark = ['read one', 'three quarters', 'one quarter', 'quarter, zero'];
  let step = 0;
  if (u >= L2.s) for (let k = 1; k < 4; k++) if (u >= phraseAt(S, 2, mark[k])) step = k;
  const cont = u < L2.s ? 1 * ease(clamp((u - phraseAt(S, 0, 'push the state')) / 1.6)) : 0;
  const ang = u < L2.s ? (u < phraseAt(S, 1, 'Like a photo') ? PL_STEP * cont : PL_STEP) : step * PL_STEP;
  const anim = u >= L2.s ? ease(clamp((u - phraseAt(S, 2, mark[step])) / 0.4)) : 1;
  const prevAng = u >= L2.s && step > 0 ? (step - 1) * PL_STEP : ang;
  const th = u >= L2.s ? lerp(prevAng, ang, anim) : ang;
  const cols = [{ x: 500, name: 'PUSH THE STATE · 推态' }, { x: 1420, name: 'PULL THE READOUT · 拉回读数' }];
  const R = 190, cy0 = 450;
  cols.forEach((cl, k) => {
    const ca = a * (k === 0 ? 1 : Q(S, 0, 'pull the measurement', 0.6)) * (1 - 0.8 * Q(S, 3, 'Lean checks', 0.6));
    if (ca <= 0.003) return;
    const P = yz(cl.x, cy0, R);
    panel(cl.x - 400, 190, 800, 600, ca, k === 0 ? C.now : C.white, cl.name);
    ring(cl.x, cy0, R, C.white, ca * 0.55, 1.6);
    line(cl.x - R * 1.15, cy0, cl.x + R * 1.15, cy0, C.dim, ca * 0.4, 1.2);
    /* the state (amber) and the readout direction (white) */
    const st = k === 0 ? V3().rot(NORTH, [1, 0, 0], th) : NORTH;
    const rd = k === 0 ? NORTH : V3().rot(NORTH, [1, 0, 0], -th);
    const ps = P(st), pd = P(rd);
    line(cl.x, cy0, pd[0], pd[1], C.white, ca * 0.9, 3);
    ctx.save(); ctx.setLineDash([6, 6]); line(pd[0], pd[1], cl.x + (pd[0] - cl.x) * 1.25, cy0 + (pd[1] - cy0) * 1.25, C.white, ca * 0.5, 2); ctx.restore();
    txt('readout · 读出方向', pd[0] + (k === 0 ? 16 : -16), pd[1] - 18, { size: 20, fam: F.zh, w: 700, align: k === 0 ? 'left' : 'right', c: C.white, a: ca });
    arrow(cl.x, cy0, ps[0], ps[1], C.now, ca, 4);
    dot(ps[0], ps[1], 12, 'g', ca);
    txt('ψ', ps[0] + 14, ps[1] + 30, { size: 30, fam: F.math, w: 700, c: C.now, a: ca });
    /* the angle between them (cyan arc) */
    const a0 = Math.atan2(-(ps[1] - cy0), ps[0] - cl.x), a1 = Math.atan2(-(pd[1] - cy0), pd[0] - cl.x);
    if (th > 0.02) { ctx.save(); ctx.globalAlpha = ca; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cl.x, cy0, 70, -Math.max(a0, a1), -Math.min(a0, a1)); ctx.stroke(); ctx.restore(); }
    /* the readout and the step table */
    const pv = (1 + Math.cos(th)) / 2;
    rich([['P(0) = ', C.white], [fmt(pv, 2), C.cyan]], cl.x - 100, cy0 + R + 66, { size: 32, a: ca });
    const ta = ca * at(S, 2, 0.6);
    if (ta > 0.003) {
      for (let t = 0; t <= 3; t++) {
        const ea = ta * (t <= step ? 1 : 0.25), v = (1 + Math.cos(t * PL_STEP)) / 2;
        txt(`t=${t}`, cl.x - 330 + t * 180, cy0 + R + 116, { size: 20, fam: F.mono, w: 700, c: t === step ? C.now : C.dim, a: ea });
        txt(fmt(v, 2), cl.x - 280 + t * 180, cy0 + R + 116, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ea });
      }
    }
  });
  txt('one step: a 60° turn about X · 每步：绕 X 转 60°（屏幕上算出）', W / 2, 176, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 2, 0.6) });
  /* line 1: the photo analogy */
  const fa = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.5));
  if (fa > 0.003) chip(W / 2, 820, 760, 60, 'analogy · 比方：turn the subject, or the camera', C.argued, fa, 24, F.zh);
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6) * (1 - clamp((S.u - lineAt(S, 4).s + 0.6) / 0.5));
  if (la > 0.003) {
    panel(460, 300, 1000, 230, la, C.lean, 'ANY CHANNEL Φ, ITS TRACE-DUAL Φ* · 任意信道及其迹对偶映射');
    rich([['Tr(Φᵗ(ρ) · E) ', C.white], ['=', C.lean], [' Tr(ρ · Φ*ᵗ(E))', C.white]], W / 2, 390, { size: 38, a: la, align: 'center' });
    txt('for every whole number of steps t ∈ ℕ · 任意整数步', W / 2, 440, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: la });
    leanChip(640, 494, VZ_LEAN.observer_pullback_trace_identity, la, { size: 17 });
  }
  /* line 4: the aphorism */
  const xa = a * at(S, 4, 0.6, 0.1);
  if (xa > 0.003) {
    panel(460, 330, 1000, 170, xa, C.white);
    txt('A gate need not be a push.', W / 2, 400, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.white, a: xa });
    txt('门不一定是推一把；有时，只是换了站的位置。', W / 2, 456, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: xa });
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = vzFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const rows = [
    { k: 0, en: 'area rule & virtual Z: literature', zh: '面积律与虚拟 Z：工程文献结果', note: 'not formalized in this book · 本书未形式化' },
    { k: 1, en: '0 ns ≠ 0 error', zh: '零纳秒 ≠ 零误差', note: 'detuning, leakage, noise still cost · 失谐、泄漏、噪声照样要付账' },
    { k: 2, en: 'kernel bound ≠ gate fidelity', zh: '积分核误差界 ≠ 门保真度', note: 'the duality counts steps t ∈ ℕ, not seconds · 对偶定理数步数，不数秒' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(260, y, 1400, 180, ra, C.argued);
    txt(rw.en, 300, y + 58, { size: 32, fam: F.mono, w: 700, c: C.argued, a: ra });
    txt(rw.zh, 300, y + 108, { size: 30, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 152, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const cx0 = 540, cy0 = 520, R = 300;
  sketchBall(cx0, cy0, R, 1);
  const V = view(cx0, cy0, R, -1.05, 0.45);
  const mid = vzAfter1(), n = axisPhi(-VZ_LAM);
  const path = (pts, col, w, dash) => { const P = pts.map(V); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash); ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore(); };
  path(QG_SPHERE.circlePts([0, 0, -0.5], [0, 0, 1], Math.sqrt(0.75)), C.cyan, 3);
  path(QG_SPHERE.arcAbout(NORTH, [1, 0, 0], Math.PI / 2), C.white, 3, [10, 8]);
  path(QG_SPHERE.arcAbout(mid, [0, 0, 1], VZ_LAM), C.white, 3, [10, 8]);
  path(QG_SPHERE.arcAbout(vzLiteralMid(), [1, 0, 0], Math.PI / 2), C.white, 3, [10, 8]);
  path(QG_SPHERE.arcAbout(mid, n, Math.PI / 2), C.now, 5);
  const a0 = V(V3().scale(n, -1.3)), a1 = V(V3().scale(n, 1.3));
  line(a0[0], a0[1], a1[0], a1[1], C.vio, 1, 4);
  const pl = V(vzLiteralEnd()), pv = V(vzVirtualEnd());
  dot(pl[0], pl[1], 11, 'w', 1);
  dot(pv[0], pv[1], 13, 'g', 1);
  txt(DATA.film.title_zh, 1340, 430, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE GATE THAT', 1340, 528, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('TAKES NO TIME', 1340, 590, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 5 });
  rich([['Z(λ) · ', C.white], ['0 ns', C.cyan], ['   φ → φ − λ', C.vio]], 1340, 690, { size: 38, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
