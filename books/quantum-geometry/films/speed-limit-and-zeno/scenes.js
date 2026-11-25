/* Film · How fast to the wall, how many steps home · 多快撞墙，几步回家
   (book quantum-geometry, chapter 7). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     tick   an old reading m0 and a new state at angle θ: the cyan shadow is the overlap |⟨m0, ψ⟩| = cos θ for unit
            arrows in a real plane; the Fubini–Study angle arccos|overlap| reaches 90° (the wall) when the overlap is
            zero (computed; chapter 7.2).
     limit  an angle ruler from m0 (0°) to m1 (90°) and an anchor a between them; each leg grows at most at
            energy·τ/ħ, and the two legs must cover 90° (the triangle inequality of the chapter); towns, depot and
            vans are an analogy (argued).
     clock  ψ(t) = (|0⟩ + e^{−iEt/ħ}|1⟩)/√2: overlap |cos(Et/2ħ)|, angle Et/2ħ, wall at πħ/E, 45° + 45° from the
            halfway anchor (computed) ..... FubiniStudyRecordTime.record_time_lower_bound (LEAN):
            τ ≥ πħ/(4·energy); equality with energy = E/2, τ = πħ/(2E) (computed); 5 GHz: 1/(2f) = 100 ps (computed).
     watch  H = (ħω/2)σx over T = π/ω, N projective checks on |0⟩: one step survives with cos²(π/2N); four checks
            0.854, 0.729, 0.622, 0.531; sixty-four checks 0.962; off-line amount sin vs loss sin² (computed;
            example ex-zeno-strobe-freezing); "a watched pot" is an analogy (argued).
     back   the monitored first-return protocol for U = exp(−iδX/2), δ = 45°, v = |0⟩: p1 = c², conditional mean
            1 + 1/s² = 7.83, mean 2 (computed; example ex-first-return-qubit)
            ..... MonitoredSpectralMean.monitored_spectral_mean (LEAN): finite dimensions, unitary U, ‖v‖ = 1:
            certain return and mean = number of distinct occupied eigenvalues; the dial of U's eigenvalues; four
            levels with eigenvalues 1, 1, i, −1 and v = (1, 1, 1, 1)/2 give 3 (computed by iterating the protocol);
            pitches and strings are an analogy (argued).
     edge   energy is a supplied parameter; Mandelstam–Tamm and Margolus–Levitin are literature results; the mean
            counts detection steps in finite-dimensional unitary protocols (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route: the overlap of the two-level clock from complex amplitudes, the strobe products, and the
   monitored protocol by direct iteration of complex vectors (total return 1, mean 2 and 3). Any disagreement is
   pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const SZ_DEG = Math.PI / 180;
const SZ_LEAN = {
  record_time_lower_bound: 'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
  monitored_spectral_mean: 'D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredSpectralMean.monitored_spectral_mean'
};
/* complex numbers as [re, im] */
const szC = {
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  conj: a => [a[0], -a[1]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  abs2: a => a[0] * a[0] + a[1] * a[1],
  ex: t => [Math.cos(t), Math.sin(t)]
};
/* the monitored first-return protocol for a diagonal unitary (eigenvalues lams) and start v:
   x ← U x, amp = ⟨v, x⟩, p = |amp|², x ← x − v amp. Returns the return probabilities p_1 … p_n. */
function szMonitor(lams, v, n) {
  let x = v.map(z => z.slice());
  const ps = [];
  for (let k = 0; k < n; k++) {
    const y = x.map((z, i) => szC.mul(lams[i], z));
    let amp = [0, 0];
    y.forEach((z, i) => { amp = szC.add(amp, szC.mul(szC.conj(v[i]), z)); });
    ps.push(szC.abs2(amp));
    x = y.map((z, i) => szC.sub(z, szC.mul(v[i], amp)));
  }
  return ps;
}
/* the qubit of scene back: U = exp(−iδX/2) has eigenvalues e^{∓iδ/2} on |±⟩, and |0⟩ = (|+⟩ + |−⟩)/√2 */
const SZ_DELTA = 45 * SZ_DEG;
const SZ_Q = { lams: [szC.ex(-SZ_DELTA / 2), szC.ex(SZ_DELTA / 2)], v: [[Math.SQRT1_2, 0], [Math.SQRT1_2, 0]] };
/* four levels: eigenvalues 1, 1, i, −1 (angles 0°, 0°, 90°, 180°), equal weights */
const SZ_4 = { ang: [0, 0, 90, 180], v: [[0.5, 0], [0.5, 0], [0.5, 0], [0.5, 0]] };
SZ_4.lams = SZ_4.ang.map(d => szC.ex(d * SZ_DEG));
const SZ_N = 400;
const SZ_PQ = szMonitor(SZ_Q.lams, SZ_Q.v, SZ_N);
const SZ_P4 = szMonitor(SZ_4.lams, SZ_4.v, SZ_N);
/* running means Σ_{k ≤ n} k p_k */
const szRun = ps => { let m = 0; return ps.map((p, k) => (m += (k + 1) * p)); };
const SZ_RQ = szRun(SZ_PQ), SZ_R4 = szRun(SZ_P4);
/* the strobe: one step of the half-turn split in N keeps |0⟩ with cos²(π/2N) */
const szKeep = N => Math.pow(Math.cos(Math.PI / (2 * N)), 2);
const SZ_CHAIN4 = [1, 2, 3, 4].map(k => Math.pow(szKeep(4), k));
const SZ_P64 = Math.pow(szKeep(64), 64);
/* the two-level clock: overlap |⟨ψ(0), ψ(t)⟩| with t in units of πħ/E */
function szClock(s) {
  const z = szC.add([1, 0], szC.ex(-Math.PI * s));
  return Math.sqrt(szC.abs2(z)) / 2;
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('speed-limit-and-zeno film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(SZ_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(SZ_LEAN).length}`);
  for (const [short, gid] of Object.entries(SZ_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. CLOCK: overlap cos(πs/2), angle 90°·s, the halfway split and the bound with equality */
  for (let k = 0; k <= 8; k++) {
    const s = k / 8, ov = szClock(s);
    check(near(ov, Math.cos(Math.PI * s / 2), 1e-12), `clock overlap at ${s}`);
    check(near(Math.acos(Math.min(1, ov)) / SZ_DEG, 90 * s, 1e-6), `clock angle at ${s}`);
  }
  check(near(szClock(0.25), 0.9238795325), 'overlap 0.924'); check(near(szClock(0.75), 0.3826834324), 'overlap 0.383');
  /* the angle between ψ(T/2) and each end is 45°: |⟨ψ(½), ψ(0)⟩| = |⟨ψ(½), ψ(1)⟩| = cos 45° */
  check(near(szClock(0.5), Math.SQRT1_2, 1e-12), 'halfway overlap √½');
  /* with energy = E/2 and τ = τ⊥/2 = πħ/(2E): energy·τ/ħ = π/4 and πħ/(4·energy) = πħ/(2E) = τ (units ħ = E = 1) */
  { const En = 0.5, tau = Math.PI / 2; check(near(En * tau, Math.PI / 4) && near(Math.PI / (4 * En), tau), 'equality case'); }
  /* 5 GHz: τ⊥ = πħ/E = 1/(2f) */
  check(near(1 / (2 * 5e9), 100e-12, 1e-20), '100 ps');

  /* 2. WATCH: the strobe numbers */
  check(near(szKeep(4), 0.8535533906) && near(SZ_CHAIN4[3], 0.5307900429), 'four checks 0.854 → 0.531');
  check(SZ_CHAIN4.map(x => x.toFixed(3)).join() === '0.854,0.729,0.622,0.531', 'the chain');
  check(SZ_P64.toFixed(3) === '0.962' && szKeep(1) < 1e-15, 'sixty-four checks 0.962, one check 0');
  check(Math.sin(Math.PI / 8).toFixed(3) === '0.383' && Math.pow(Math.sin(Math.PI / 8), 2).toFixed(3) === '0.146', 'step 45°: 0.383 vs 0.146');
  check(near(1 - szKeep(4), Math.pow(Math.sin(Math.PI / 8), 2), 1e-12), 'loss is the square');

  /* 3. BACK: the qubit ledger, total 1, mean 2; four levels, mean 3 */
  const c2 = Math.pow(Math.cos(SZ_DELTA / 2), 2), s2 = 1 - c2;
  check(near(SZ_PQ[0], c2, 1e-12) && c2.toFixed(3) === '0.854', 'p1 = c² = 0.854');
  for (let n = 1; n < 12; n++) check(near(SZ_PQ[n], s2 * s2 * Math.pow(c2, n - 1), 1e-12), `p_${n + 1} = s⁴c^{2(n−1)}`);
  check((1 + 1 / s2).toFixed(2) === '7.83' && near(c2 + s2 * (1 + 1 / s2), 2, 1e-12), '0.854·1 + 0.146·7.83 = 2');
  check(near(SZ_PQ.reduce((a, b) => a + b, 0), 1, 1e-9) && near(SZ_RQ[SZ_N - 1], 2, 1e-8), 'qubit: total 1, mean 2');
  check(near(SZ_P4.reduce((a, b) => a + b, 0), 1, 1e-9) && near(SZ_R4[SZ_N - 1], 3, 1e-8), 'four levels: total 1, mean 3');
  check(new Set(SZ_4.ang).size === 3, 'three distinct eigenvalues');
  /* random diagonal unitaries: the mean is the number of distinct occupied phases */
  for (let k = 0; k < 10; k++) {
    const d = 2 + (k % 4), ang = [], v = [];
    for (let i = 0; i < d; i++) { ang.push(i === d - 1 && k % 2 ? ang[0] : 1.2 * i + 0.5 * rnd(k, i)); /* separated phases, one repeated when k is odd */ v.push([0.2 + rnd(k, i + 9), 0]); }
    const nv = Math.sqrt(v.reduce((a, z) => a + z[0] * z[0], 0)); v.forEach(z => { z[0] /= nv; });
    const ps = szMonitor(ang.map(szC.ex), v, 6000), m = ps.reduce((a, p, i) => a + (i + 1) * p, 0);
    check(Math.abs(m - new Set(ang).size) < 1e-4, `random unitary ${k}: mean ${m}`);
  }
});
Object.assign(FILM.speed, { tick: 0.02, limit: 0.014, clock: 0.016, watch: 0.012, back: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const szFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function szRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
const SZ_MISSING = new Set();
function szLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!SZ_MISSING.has(gid)) { SZ_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* an arc of radius r around O from angle t0 to t1 (radians, counter-clockwise, screen y down) */
function szArc(O, r, t0, t1, col, a, lw = 3, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(O[0], O[1], r, -t1, -t0); ctx.stroke(); ctx.restore();
}
/* a small analogy tag in violet */
function szAnalogy(s, x, y, a, o = {}) {
  if (a <= 0.003) return;
  txt(s, x, y, { size: o.size || 20, fam: F.zh, w: 700, c: C.argued, a, align: o.align });
}
/* the dial: a fixed old reading m0 along +x and a state at angle θ; cyan shadow, magenta wall at 90° */
function szDial(O, R, th, a, o = {}) {
  const P = (t, r = R) => [O[0] + r * Math.cos(t), O[1] - r * Math.sin(t)];
  /* the wall */
  const wa = a * (o.wall == null ? 1 : o.wall);
  if (wa > 0.003) {
    line(O[0], O[1], O[0], O[1] - R - 40, C.mag, wa, 7);
    for (let k = 0; k < 9; k++) line(O[0], O[1] - 30 - k * (R / 9), O[0] - 18, O[1] - 30 - k * (R / 9) + 14, C.mag, wa * 0.6, 2);
    txt(o.wallLabel || '90° wall · 正交墙', O[0] - 22, O[1] - R - 20, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.mag, a: wa });
  }
  szArc(O, R, 0, Math.PI / 2, C.dim, a * 0.5, 1.5, [4, 8]);
  const m0 = P(0), ps = P(th), foot = [O[0] + R * Math.cos(th), O[1]];
  /* shadow of the state on m0 */
  const sa = a * (o.shadow == null ? 1 : o.shadow);
  if (sa > 0.003) {
    if (Math.cos(th) > 0.004) line(O[0], O[1], foot[0], foot[1], C.cyan, sa, 9);
    ctx.save(); ctx.setLineDash([6, 6]); line(ps[0], ps[1], foot[0], foot[1], C.white, sa * 0.45, 1.5); ctx.restore();
  }
  szArc(O, 70, 0, th, C.now, a * 0.9, 3);
  arrow(O[0], O[1], m0[0], m0[1], C.white, a, 5);
  arrow(O[0], O[1], ps[0], ps[1], C.now, a, 5);
  return { m0, ps, foot };
}
/* opening title */
function szTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('HOW FAST TO THE WALL', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt(scramble('HOW MANY STEPS HOME', p, 9), W / 2, 642, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: ta, ls: 5, ab: 1 });
  txt('OVERLAP · WALL · SPEED LIMIT · STROBE · RETURN · EIGENVALUES', W / 2, 720, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                                scene 1 · ONE TICK                         */
/* ======================================================================= */
const TK_O = [430, 760], TK_R = 470;
SCENES.tick = S => {
  const u = S.u;
  szTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the state turns from 20° (line 1) to 90° (line 2, 'The angle') */
  const th = (lerp(18, 62, ease(at(S, 1, 2.6))) + 28 * ease(Q(S, 2, 'The angle', 1.6))) * SZ_DEG;
  const D = szDial(TK_O, TK_R, th, a, { wall: Q(S, 2, 'zero overlap', 0.8), shadow: at(S, 0, 0.8, 1.0) });
  txt('old · 旧读数 m₀', D.m0[0] - 30, D.m0[1] + 52, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a });
  txt('new · 新的态 ψ', D.ps[0] + 18, D.ps[1] - 14, { size: 26, fam: F.zh, w: 700, c: C.now, a });
  const c = Math.cos(th);
  if (c > 0.05) txt('shadow · 影子', (TK_O[0] + D.foot[0]) / 2, TK_O[1] + 46, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * clamp(c * 3) });
  /* readout */
  panel(1120, 220, 700, 420, a, C.cyan, 'ONE TICK · 一声滴答');
  szRich([['overlap |⟨m₀, ψ⟩| = ', C.white], [Math.abs(c).toFixed(2), C.cyan]], 1150, 300, { size: 30, a });
  fillBox(1150, 322, 520 * Math.max(0, c), 30, C.cyan, a * 0.6); box(1150, 322, 520, 30, C.cyan, a * 0.5, 1.2);
  szRich([['angle θ = arccos|overlap| = ', C.white], [`${Math.round(th / SZ_DEG)}°`, C.now]], 1150, 410, { size: 30, a });
  const ma = a * at(S, 1, 0.6);
  txt('read as old with probability overlap²', 1150, 474, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ma });
  txt('用旧读数去测，被读成旧的概率 = 重叠的平方', 1150, 506, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ma });
  const za = a * Q(S, 2, 'zero overlap', 0.6) * clamp((th / SZ_DEG - 86) / 3);
  if (za > 0.003) chip(1470, 585, 560, 56, 'overlap 0  ⇔  θ = 90°', C.mag, za, 28, F.math);
};

/* ======================================================================= */
/*                              scene 2 · A SPEED LIMIT                      */
/* ======================================================================= */
const LM = { x0: 220, x1: 1420, y: 520, a: 40 };   // the ruler: 0° at x0, 90° at x1; the anchor at 40°
const lmX = d => lerp(LM.x0, LM.x1, d / 90);
SCENES.limit = S => {
  const u = S.u, a = szFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the ruler: magenta 90° between the two perpendicular states */
  line(LM.x0, LM.y, LM.x1, LM.y, C.mag, a * 0.9, 5);
  for (let d = 0; d <= 90; d += 15) { line(lmX(d), LM.y - 10, lmX(d), LM.y + 10, C.mag, a * 0.6, 2); txt(`${d}°`, lmX(d), LM.y + 92, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  dot(LM.x0, LM.y, 18, 'w', a); dot(LM.x1, LM.y, 18, 'w', a);
  txt('m₀', LM.x0, LM.y - 34, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('m₁', LM.x1, LM.y - 34, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('⟨m₀, m₁⟩ = 0  ·  90°', 1100, LM.y - 150, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a });
  /* the anchor and the two legs: each leg ≤ energy·τ/ħ; τ grows on line 1 and through line 3 */
  const xa = lmX(LM.a);
  const la = a * at(S, 1, 0.6);
  const reach = 50 * ease(at(S, 1, 3.0)) * 0.6 + 50 * 0.4 * ease(Q(S, 3, 'together', 1.6));   // degrees per leg
  if (la > 0.003) {
    const l0 = Math.min(reach, LM.a), l1 = Math.min(reach, 90 - LM.a);
    line(xa, LM.y - 4, lmX(LM.a - l0), LM.y - 4, C.cyan, la, 12);
    line(xa, LM.y + 4, lmX(LM.a + l1), LM.y + 4, C.cyan, la, 12);
    /* speed-limit brackets: how far a leg may go */
    ctx.save(); ctx.setLineDash([5, 7]);
    line(lmX(LM.a - reach), LM.y - 46, lmX(LM.a + reach), LM.y - 46, C.cyan, la * 0.6, 2); ctx.restore();
    txt(`each leg ≤ energy·τ/ħ = ${Math.round(reach)}°`, xa, LM.y - 64, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: la });
    const done = reach >= 90 - LM.a - 1e-9;
    if (done) chip(lmX(LM.a + l1) - 20, LM.y - 120, 220, 46, 'both reached', C.cyan, la * Q(S, 3, 'together', 0.4, 1.2), 22);
  }
  dot(xa, LM.y, 16, 'g', a * at(S, 0, 0.6));
  txt('a', xa, LM.y + 52, { size: 32, fam: F.math, w: 700, align: 'center', c: C.now, a: a * at(S, 0, 0.6) });
  /* the analogy: towns, depot, vans */
  const va = a * Q(S, 2, 'two towns', 0.6);
  if (va > 0.003) {
    for (const [x, nm] of [[LM.x0, 'town · 镇'], [LM.x1, 'town · 镇']]) {
      ctx.save(); ctx.globalAlpha = va; ctx.strokeStyle = C.argued; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - 30, LM.y - 120); ctx.lineTo(x - 30, LM.y - 160); ctx.lineTo(x, LM.y - 185); ctx.lineTo(x + 30, LM.y - 160); ctx.lineTo(x + 30, LM.y - 120); ctx.closePath(); ctx.stroke(); ctx.restore();
      szAnalogy(nm, x, LM.y - 200, va, { align: 'center' });
    }
    box(xa - 34, LM.y - 230, 68, 40, C.argued, va, 2);
    szAnalogy('depot · 车站', xa, LM.y - 244, va, { align: 'center' });
  }
  /* the detour (line 3): an anchor off the ruler, two longer legs */
  const da = a * Q(S, 3, 'A detour', 0.6);
  if (da > 0.003) {
    const off = [lmX(62), LM.y + 230];
    ctx.save(); ctx.setLineDash([8, 8]);
    line(off[0], off[1], LM.x0 + 10, LM.y + 14, C.cyan, da * 0.55, 2.5); line(off[0], off[1], LM.x1 - 10, LM.y + 14, C.cyan, da * 0.55, 2.5); ctx.restore();
    dot(off[0], off[1], 12, 'g', da * 0.7);
    txt('detour · 绕路：两段更长', off[0] + 22, off[1] + 10, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: da * 0.8 });
  }
  /* the readout */
  panel(1500, 200, 360, 470, a, C.cyan, 'THE RULE · 规则');
  szRich([['θ(a, m₀) ≤ energy·τ/ħ', C.cyan]], 1520, 270, { size: 22, a: la });
  szRich([['θ(a, m₁) ≤ energy·τ/ħ', C.cyan]], 1520, 310, { size: 22, a: la });
  szAnalogy('analogy · 比方', 1520, 370, va);
  szAnalogy('towns = m₀, m₁', 1520, 402, va, { size: 18 });
  szAnalogy('depot = anchor a', 1520, 430, va, { size: 18 });
  szAnalogy('van speed = energy/ħ', 1520, 458, va, { size: 18 });
  const ta = a * Q(S, 3, 'together', 0.6);
  szRich([['90° ≤ θ(a,m₀) + θ(a,m₁)', C.mag]], 1520, 530, { size: 21, a: ta });
  szRich([['    ≤ 2·energy·τ/ħ', C.white]], 1520, 568, { size: 21, a: ta });
  txt('triangle inequality · 三角不等式', 1520, 620, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ta });
};

/* ======================================================================= */
/*                          scene 3 · THE SIMPLEST CLOCK                     */
/* ======================================================================= */
const CK_O = [340, 790], CK_R = 430;
SCENES.clock = S => {
  const u = S.u, a = szFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed']]);
  /* s = t / (πħ/E) runs 0 → 1 over lines 1–2 */
  const s = clamp(ease(at(S, 1, 3.2)) * 0.5 + 0.5 * ease(at(S, 2, 2.4)));
  const th = 90 * s * SZ_DEG, ov = szClock(s);
  const D = szDial(CK_O, CK_R, th, a, { wall: 1, shadow: at(S, 1, 0.6), wallLabel: '90° wall · 墙' });
  txt('ψ(0)', D.m0[0] - 10, D.m0[1] + 50, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('ψ(t)', CK_O[0] + (CK_R - 90) * Math.cos(th) + 26, CK_O[1] - (CK_R - 90) * Math.sin(th) + 10, { size: 28, fam: F.math, w: 700, c: C.now, a });
  /* halfway anchor and the two 45° legs (line 2) */
  const ha = a * Q(S, 2, 'Halfway', 0.6);
  if (ha > 0.003) {
    szArc(CK_O, CK_R + 26, 0, Math.PI / 4, C.cyan, ha, 5); szArc(CK_O, CK_R + 26, Math.PI / 4, Math.PI / 2, C.cyan, ha, 5);
    const pm = [CK_O[0] + (CK_R + 26) * Math.cos(Math.PI / 4), CK_O[1] - (CK_R + 26) * Math.sin(Math.PI / 4)];
    dot(pm[0], pm[1], 14, 'g', ha);
    txt('a = ψ(½)', pm[0] + 22, pm[1] - 8, { size: 24, fam: F.math, w: 700, c: C.now, a: ha });
    txt('45°', CK_O[0] + (CK_R + 70) * Math.cos(Math.PI / 8), CK_O[1] - (CK_R + 70) * Math.sin(Math.PI / 8), { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ha });
    txt('45°', CK_O[0] + (CK_R + 70) * Math.cos(3 * Math.PI / 8), CK_O[1] - (CK_R + 70) * Math.sin(3 * Math.PI / 8), { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ha });
  }
  /* the table of stops */
  panel(960, 190, 880, 300, a, C.cyan, 'EQUAL TWO-LEVEL CLOCK · 二能级等权');
  szRich([['ψ(t) = (|0⟩ + e^(−iEt/ħ)|1⟩)/√2', C.white]], 990, 252, { size: 26, a: a * at(S, 0, 0.6) });
  szRich([['overlap = |cos(Et/2ħ)|', C.cyan]], 990, 296, { size: 24, a: a * at(S, 1, 0.6) });
  const cols = [0, 0.25, 0.5, 0.75, 1];
  txt('t / (πħ/E)', 990, 350, { size: 20, fam: F.mono, w: 700, c: C.dim, a: a * at(S, 1, 0.6) });
  txt('overlap', 990, 392, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a * at(S, 1, 0.6) });
  txt('angle', 990, 434, { size: 20, fam: F.mono, w: 700, c: C.now, a: a * at(S, 1, 0.6) });
  cols.forEach((t, k) => {
    const ca = a * at(S, 1, 0.6) * clamp((s - t) * 12 + 1);
    const x = 1170 + k * 128;
    const cur = Math.abs(s - t) < 0.06;
    txt(['0', '¼', '½', '¾', '1'][k], x, 350, { size: 24, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : C.white, a: ca });
    txt(szClock(t).toFixed(3), x, 392, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ca });
    txt(`${(90 * t).toFixed(1)}°`, x, 434, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: ca });
  });
  txt(`now · 此刻  overlap ${ov.toFixed(3)}  ·  ${(90 * s).toFixed(1)}°`, 990, 474, { size: 18, fam: F.zh, w: 700, c: C.now, a: a * at(S, 1, 0.6) });
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(960, 510, 880, 200, la, C.lean, 'ANY ANCHOR, ANY TWO ⊥ STATES · 任意锚点与正交态');
    szRich([['θ(a,m₀), θ(a,m₁) ≤ energy·τ/ħ   ⇒   ', C.white], ['τ ≥ πħ / (4·energy)', C.lean]], 984, 584, { size: 26, a: la });
    szLean(984, 640, SZ_LEAN.record_time_lower_bound, la, { size: 19 });
    txt('unit vectors, complex inner product space, energy > 0, ħ > 0', 984, 686, { size: 17, fam: F.mono, w: 700, c: C.dim, a: la });
  }
  /* line 4: equality; line 5: 5 GHz */
  const ea = a * at(S, 4, 0.6);
  if (ea > 0.003) {
    panel(960, 730, 880, 120, ea, C.cyan, null);
    szRich([['energy = E/2,  τ = πħ/(2E):  ', C.white], ['τ = πħ/(4·energy)', C.cyan], ['  equality', C.white]], 984, 782, { size: 24, a: ea });
    szRich([['f = 5 GHz:  πħ/E = 1/(2f) = ', C.white], ['100 ps', C.now]], 984, 826, { size: 24, a: a * at(S, 5, 0.6) });
  }
  stamp('τ ≥ πħ/(4·energy)', 470, 260, Q(S, 3, 'Lean checks', 0.5, 0.8) * (1 - at(S, 4, 0.5, 1.5)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                              scene 4 · A WATCHED POT                      */
/* ======================================================================= */
SCENES.watch = S => {
  const u = S.u, a = szFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* left: one small step against the old line, scaled up: off-line height sin(δ/2), loss sin²(δ/2) */
  const O = [150, 640], R = 520;
  const step = lerp(lerp(45, 22.5, ease(Q(S, 1, 'loses only', 1.5))), 45, ease(Q(S, 2, 'Four checks', 1.0))) * SZ_DEG;  // a Bloch step δ is a turn of δ/2 of the arrow
  const half = step / 2;
  const sa = a * at(S, 1, 0.6);
  line(O[0], O[1], O[0] + R, O[1], C.white, a, 3);
  txt('home · 家  |0⟩', O[0] + R + 16, O[1] + 10, { size: 26, fam: F.zh, w: 700, c: C.white, a });
  const p = [O[0] + R * Math.cos(half), O[1] - R * Math.sin(half)];
  arrow(O[0], O[1], p[0], p[1], C.now, a, 5);
  szArc(O, 90, 0, half, C.now, a, 3);
  if (sa > 0.003) {
    line(p[0], p[1], p[0], O[1], C.mag, sa, 6);
    line(O[0], O[1] + 30, p[0], O[1] + 30, C.cyan, sa, 8);
    txt(`off · 偏离  sin(δ/2) = ${Math.sin(half).toFixed(3)}`, p[0], p[1] - 30, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: sa });
    txt(`shadow · 影子  cos(δ/2) = ${Math.cos(half).toFixed(3)}`, O[0], O[1] + 76, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: sa });
    txt(`loss · 损失  1 − shadow² = sin²(δ/2) = ${Math.pow(Math.sin(half), 2).toFixed(3)}`, O[0], O[1] + 116, { size: 24, fam: F.zh, w: 700, c: C.white, a: sa });
    txt(`Bloch step · 布洛赫角每步 δ = ${(2 * half / SZ_DEG).toFixed(1)}° · arrow turns δ/2 = ${(half / SZ_DEG).toFixed(1)}°`, O[0], O[1] + 156, { size: 22, fam: F.zh, w: 700, c: C.now, a: sa });
  }
  szAnalogy('analogy · 比方：盯着的水壶烧不开 · a watched pot never boils', 120, 240, a * at(S, 0, 0.8, 1.0), { size: 22 });
  /* right: the chain of four checks, then sixty-four */
  const ca = a * Q(S, 2, 'Four checks', 0.6);
  panel(1000, 300, 840, 520, a, C.cyan, 'CHECKS ON THE WAY TO A FULL FLIP · 翻到底的路上');
  txt('stay home after each check · 每次检查后仍在家的概率', 1028, 362, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  const BX = 1028, BW = 740, BY = 390;
  const cur4 = Q(S, 2, 'Four checks', 2.4);
  SZ_CHAIN4.forEach((v, k) => {
    const ka = ca * clamp(cur4 * 4 - k);
    if (ka <= 0.003) return;
    const y = BY + k * 58;
    fillBox(BX, y, BW * v, 40, C.cyan, ka * 0.55); box(BX, y, BW, 40, C.cyan, ka * 0.4, 1.2);
    txt(`${k + 1}`, BX - 6, y + 29, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.now, a: ka });
    txt(v.toFixed(3), BX + BW * v + 12, y + 29, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: ka });
  });
  txt('N = 4:  0.854⁴ = 0.531', BX, BY + 270, { size: 26, fam: F.mono, w: 700, c: C.white, a: ca * clamp(cur4 * 4 - 3.5) });
  const sa64 = a * Q(S, 2, 'Sixty-four', 0.6);
  if (sa64 > 0.003) {
    const y = BY + 300;
    fillBox(BX, y, BW * SZ_P64, 40, C.cyan, sa64 * 0.55); box(BX, y, BW, 40, C.cyan, sa64 * 0.4, 1.2);
    txt(`N = 64:  ${SZ_P64.toFixed(3)}`, BX + 12, y + 29, { size: 24, fam: F.mono, w: 700, c: C.white, a: sa64 });
    txt('N = 1:  0  ·  no checks on the way · 途中不查，全部翻走', BX, y + 84, { size: 20, fam: F.zh, w: 700, c: C.dim, a: sa64 });
  }
};

/* ======================================================================= */
/*                            scene 5 · THE RETURN LEDGER                    */
/* ======================================================================= */
/* a dial of eigenvalues on the unit circle */
function bkDial(O, R, angs, a, label) {
  ring(O[0], O[1], R, C.dim, a * 0.7, 2);
  line(O[0] - R - 20, O[1], O[0] + R + 20, O[1], C.dim, a * 0.3, 1);
  line(O[0], O[1] - R - 20, O[0], O[1] + R + 20, C.dim, a * 0.3, 1);
  const seen = {};
  angs.forEach(d => {
    const k = (seen[d] = (seen[d] || 0) + 1), t = d * SZ_DEG;
    const x = O[0] + R * Math.cos(t), y = O[1] - R * Math.sin(t);
    dot(x, y, 16, 'g', a);
    if (k > 1) ring(x, y, 16 + 10 * (k - 1), C.now, a, 2);
  });
  txt(label, O[0], O[1] + R + 54, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a });
}
SCENES.back = S => {
  const u = S.u, a = szFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed']]);
  /* left (lines 0–2): the two branches of the ledger */
  const qa = a * (1 - at(S, 3, 0.6));
  if (qa > 0.003) {
    panel(100, 200, 900, 640, qa, C.cyan, 'QUBIT, BLOCH STEP δ = 45° · 比特，布洛赫角每步 45°');
    txt('ask each step: back at |0⟩?  ·  每一步问：回到 |0⟩ 了吗？', 130, 270, { size: 22, fam: F.zh, w: 700, c: C.white, a: qa });
    const b1 = qa * at(S, 1, 0.6), b2 = qa * Q(S, 2, 'If not', 0.6), b3 = qa * Q(S, 2, 'Together', 0.6);
    const c2 = SZ_PQ[0], s2 = 1 - c2;
    /* a branching ledger: width ∝ probability */
    fillBox(130, 330, 820 * c2, 70, C.cyan, b1 * 0.25); box(130, 330, 820 * c2, 70, C.cyan, b1, 1.5);
    txt(`back at step 1 · 第一步就回来  ${c2.toFixed(3)}`, 150, 375, { size: 24, fam: F.zh, w: 700, c: C.white, a: b1 });
    fillBox(130 + 820 * c2, 330, 820 * s2, 70, C.mag, b2 * 0.55); box(130 + 820 * c2, 330, 820 * s2, 70, C.mag, b2, 1.5);
    txt(`not yet · 没回来  ${s2.toFixed(3)}`, 950, 440, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.mag, a: b2 });
    szRich([[`${c2.toFixed(3)} × 1`, C.cyan], ['  +  ', C.white], [`${s2.toFixed(3)} × ${(1 + 1 / s2).toFixed(2)}`, C.mag], ['  =  ', C.white], ['2', C.now]], 130, 530, { size: 32, a: b2 });
    txt('mean steps · 平均步数', 130, 580, { size: 20, fam: F.zh, w: 700, c: C.dim, a: b2 });
    /* the running mean */
    const n = Math.max(1, Math.round(lerp(1, 60, ease(at(S, 1, 9)))));
    txt(`Σ n·pₙ  after ${String(n).padStart(2, ' ')} steps = ${SZ_RQ[n - 1].toFixed(3)}`, 130, 660, { size: 28, fam: F.mono, w: 700, c: C.now, a: b1 });
    txt('computed by running the protocol · 逐步运行协议算出', 130, 704, { size: 18, fam: F.zh, w: 700, c: C.dim, a: b1 });
    /* right: the first few return probabilities, and the mailbox analogy */
    panel(1080, 200, 760, 590, qa, C.cyan, 'FIRST RETURN AT STEP n · 第 n 步首次回来');
    for (let k = 0; k < 7; k++) {
      const ka = qa * clamp(at(S, 1, 0.5) * 7 - k), y = 270 + k * 58, p = SZ_PQ[k];
      if (ka <= 0.003) continue;
      txt(`n = ${k + 1}`, 1110, y + 26, { size: 22, fam: F.mono, w: 700, c: C.white, a: ka });
      fillBox(1230, y + 4, Math.max(2, 440 * p), 30, k ? C.mag : C.cyan, ka * 0.6);
      txt(p.toFixed(3), 1690, y + 28, { size: 22, fam: F.mono, w: 700, align: 'right', c: k ? C.mag : C.cyan, a: ka });
    }
    txt('… a long, thin tail · 一条又长又细的尾巴', 1110, 700, { size: 20, fam: F.zh, w: 700, c: C.mag, a: b2 });
    szAnalogy('analogy · 比方：check the mailbox daily · 每天查信箱，信到就停', 1110, 728, qa * at(S, 0, 0.6, 1.0));
    szAnalogy('but here each look changes the state · 但这里每次查看都会改动态', 1110, 756, qa * at(S, 0, 0.6, 1.0), { size: 18 });
  }
  /* lines 3–5: Lean, the dial of eigenvalues */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(100, 200, 900, 220, la, C.lean, 'FINITE DIMENSIONS, UNITARY STEP · 有限维、幺正');
    szRich([['Σ pₙ = 1   and   Σ n·pₙ = #{distinct occupied eigenvalues}', C.white]], 124, 268, { size: 22, a: la });
    txt('占据：本征向量与初态 v 的内积不为零；不计重数', 124, 310, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la });
    szLean(124, 370, SZ_LEAN.monitored_spectral_mean, la, { size: 19 });
    bkDial([320, 640], 120, [-22.5, 22.5], la, 'qubit: 2 notes → mean 2');
    const fa = a * Q(S, 4, 'all four strings', 0.6);
    bkDial([760, 640], 120, SZ_4.ang, fa, '1, 1, i, −1: 3 notes');
    txt('v = (1, 1, 1, 1)/2 · every string is played · 四根弦都被拨响', 760, 496, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: fa });
    if (fa > 0.003) {
      const n = Math.max(1, Math.round(lerp(1, 80, ease(Q(S, 4, 'the mean is three', 1.6)))));
      txt(`mean after ${n} steps = ${SZ_R4[n - 1].toFixed(3)}`, 760, 850, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: fa * Q(S, 4, 'the mean is three', 0.4) });
    }
  }
  /* right: the strings (analogy) */
  const sa = a * at(S, 4, 0.6);
  panel(1080, 200, 760, 460, sa, C.argued, 'ANALOGY · 比方');
  if (sa > 0.003) {
    const tags = ['pitch 1', 'pitch 1', 'pitch i', 'pitch −1'];
    for (let k = 0; k < 4; k++) {
      const y = 290 + k * 70, amp = 30 * Math.sin(S.t * (5 + 4 * SZ_4.ang[k] / 90) + SZ_4.ang[k] * SZ_DEG);   /* same pitch, same motion */
      ctx.save(); ctx.globalAlpha = sa; ctx.strokeStyle = C.argued; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(1110, y); ctx.quadraticCurveTo(1340, y + amp, 1570, y); ctx.stroke(); ctx.restore();
      txt(tags[k], 1600, y + 8, { size: 22, fam: F.mono, w: 700, c: k < 2 ? C.now : C.argued, a: sa });
    }
    txt('string = eigenvector the start plays · 弦 = 初态弹到的本征方向', 1110, 590, { size: 19, fam: F.zh, w: 700, c: C.argued, a: sa });
    txt('pitch = eigenvalue · 音高 = 本征值', 1110, 626, { size: 19, fam: F.zh, w: 700, c: C.argued, a: sa });
  }
  /* line 5: the maxim */
  const ma = a * at(S, 5, 0.6);
  if (ma > 0.003) {
    chip(1460, 740, 760, 64, 'this qubit: the wait changes shape, the mean stays 2', C.now, ma, 26, F.disp);
    txt('这只比特：只改等待的形状，平均仍是 2', 1460, 820, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: ma });
  }
  stamp('mean = #eigenvalues', 1460, 300, Q(S, 3, 'Lean checks', 0.5, 0.8) * (1 - at(S, 4, 0.5, 0.0)), C.lean, 30, -0.06);
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = szFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* a small dial: the wall is still there */
  szDial([300, 760], 360, 90 * SZ_DEG * (0.6 + 0.4 * ease(clamp(u / 4))), a * 0.8, { wall: 1, shadow: 1, wallLabel: '90°' });
  const rows = [
    { k: 0, col: C.argued, en: 'energy: a speed bound you supply', zh: 'energy 是给定的上界参数，不自动等于设备的能量', note: 'the Lean theorem assumes both leg bounds · 定理把两段位移界当作前提' },
    { k: 1, col: C.argued, en: 'Mandelstam–Tamm, Margolus–Levitin', zh: '经典速度极限：文献结果，本书未形式化', note: 'strobe numbers: computed on screen · 频闪数字：屏幕上的计算' },
    { k: 2, col: C.cyan, en: 'mean = detection steps, not seconds', zh: '平均数的是探测步数，不是秒', note: 'finite-dimensional unitary steps only · 只管有限维幺正步' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * (i === 2 ? Q(S, 0, 'not seconds', 0.6) : at(S, rw.k, 0.6, i === 0 ? 1.4 : 0));
    if (ra <= 0.003) return;
    const y = 190 + i * 215;
    panel(820, y, 1000, 190, ra, rw.col);
    txt(rw.en, 850, y + 60, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 850, y + 108, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 850, y + 152, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.end - 1.0;
  background(t, sc, 2, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const O = [240, 860], R = 560;
  szDial(O, R, 72 * SZ_DEG, 1, { wall: 1, shadow: 1, wallLabel: '90°' });
  szArc(O, R + 26, 0, Math.PI / 4, C.cyan, 1, 5); szArc(O, R + 26, Math.PI / 4, Math.PI / 2, C.cyan, 1, 5);
  txt(DATA.film.title_zh, 1340, 400, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('HOW FAST TO THE WALL', 1340, 500, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 3, ls: 4 });
  txt('HOW MANY STEPS HOME', 1340, 562, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 4 });
  szRich([['τ ≥ πħ/(4·energy)', C.white], ['   ·   ', C.dim], ['mean = 2', C.now]], 1340, 660, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 750, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
