/* Film 002 · Pairwise measurement: from two arrows to the Born weight · 两子丈量：从一对箭头到玻恩权重
   (book quantum-geometry, part I: chapters 1–4). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     pair    Two unit arrows x, y at 60°; the parallelogram diagonals give |x + y|² = 3, |x − y|² = 1.
             3 + 1 = 2(1² + 1²) ..... ParallelogramNormLaw.inner_product_norm_parallelogram_law (ch. 1, LEAN)
             ⟨x, y⟩ = (3 − 1)/4 = 1/2 = cos 60° (polarization) is computed here.
     shadow  A is its own axis; the foot of the perpendicular from b is C, c = (a·b) a, b⊥ = b − c (ch. 2 §2.2),
             computed here from the drawn vectors.
     born    The affine squeeze x ↦ (1 + x)/2 of the shadow cos θ is the weight cos²(θ/2) (ch. 2, example
             "half angle"), computed here; the trace pairing Tr(ρ P) = |⟨φ|ψ⟩|² for rank-one ρ, P is
             BornReduction.rank_one_pure_state_modulus_square_reduction (ch. 2, LEAN).
     square  cosⁿ(θ/2) + sinⁿ(θ/2) for n = 1, 2, 4 (computed); Tr(ρ I) = 1, additivity and 0 ≤ Tr(ρ P) for
             projections ..... FiniteDimensional.born_probability_skeleton (ch. 2, LEAN).
     chord   The ch. 4 environment model with the ch. 2 state |ψ⟩ = (√3/2, 1/2): tracing out the records
             |e₀⟩, |e₁⟩ gives ρ_S with off-diagonal (√3/4)⟨e₀|e₁⟩ (computed here, by an explicit partial trace).
             For orthogonal records ρ_S = Σ P_a ρ P_a ..... NonselectiveMarginalization.nonselective_recording_marginal
             (ch. 4, LEAN); ⟨ρ, ρ⟩ = ⟨P(ρ), P(ρ)⟩ + ⟨ρ − P(ρ), ρ − P(ρ)⟩, i.e. 1 = 5/8 + 3/8 ..... PinchingProjection.
             pinching_hilbert_schmidt_pythagorean (ch. 4, LEAN; the values are computed here).

   On load, FILM.init checks DATA.lean against these five theorems, re-derives every rational shown on screen
   with exact fractions, and checks the floating-point pictures against independent computations (2×2 complex
   traces, an explicit partial trace over the environment). Any disagreement is pushed to window.FILM_ERRORS,
   which stops the render. */
'use strict';

/* ======================================================================= */
/*                      exact fractions (small integers)                     */
/* ======================================================================= */
const PQ = (() => {
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const r = a % b; a = b; b = r; } return a || 1; };
  const q = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; };
  const add = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
  const sub = (a, b) => q(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => q(a.n * b.n, a.d * b.d);
  const div = (a, b) => q(a.n * b.d, a.d * b.n);
  const eq = (a, b) => a.n === b.n && a.d === b.d;
  const val = a => a.n / a.d;
  const str = a => (a.n < 0 ? '−' : '') + Math.abs(a.n) + (a.d === 1 ? '' : '/' + a.d);
  /* the rational with denominator ≤ 64 nearest to x, required to be exact to 1e-12 */
  const of = x => {
    for (let d = 1; d <= 64; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-12) return q(n, d); }
    return null;
  };
  return { q, add, sub, mul, div, eq, val, str, of, ONE: q(1), ZERO: q(0), HALF: q(1, 2) };
})();

/* ======================================================================= */
/*                     numbers shown on screen (computed)                    */
/* ======================================================================= */
const PB_DEG = Math.PI / 180;
const PB_PAIR_THETA = 60;                         // the angle between x and y in the PAIR scene (ch. 1)
const PB_PAIR = (() => {                          // |x ± y|² = 2 ± 2 cos θ for unit x, y; polarization
  const c = PQ.of(Math.cos(PB_PAIR_THETA * PB_DEG));
  const plus = PQ.add(PQ.q(2), PQ.mul(PQ.q(2), c)), minus = PQ.sub(PQ.q(2), PQ.mul(PQ.q(2), c));
  return { c, plus, minus, sum: PQ.add(plus, minus), inner: PQ.div(PQ.sub(plus, minus), PQ.q(4)) };
})();
/* the half-angle table of chapter 2: θ, θ/2, cos θ, p = (1 + cos θ)/2 */
const PB_ROWS = [0, 60, 90, 120, 180].map(t => {
  const c = PQ.of(Math.cos(t * PB_DEG));
  return { t, half: t / 2, c, p: PQ.mul(PQ.HALF, PQ.add(PQ.ONE, c)) };
});
/* the chapter 2 state |ψ⟩ = (cos 30°, sin 30°) = (√3/2, 1/2): Bloch angle 60° from |0⟩ */
const PB_PSI_THETA = 60;
const PB_PSI = (() => {
  const a = Math.cos(PB_PSI_THETA / 2 * PB_DEG), b = Math.sin(PB_PSI_THETA / 2 * PB_DEG);
  const p0 = PQ.of(a * a), p1 = PQ.of(b * b);
  const off2 = PQ.of(a * a * b * b);                       // |ρ₀₁|² = 3/16 for the pure ρ = |ψ⟩⟨ψ|
  const diagHS = PQ.add(PQ.mul(p0, p0), PQ.mul(p1, p1));   // ⟨P(ρ), P(ρ)⟩ = 9/16 + 1/16
  const discarded = PQ.add(off2, off2);                    // |ρ₀₁|² + |ρ₁₀|² = 3/8
  return { a, b, p0, p1, off2, diagHS, discarded, total: PQ.add(diagHS, discarded) };
})();
/* the local state after the environment has recorded the branch with ⟨e₀|e₁⟩ = cos θenv (real records) */
function pbRhoS(thEnv) {
  const k = Math.cos(thEnv);
  return [[PB_PSI.a * PB_PSI.a, PB_PSI.a * PB_PSI.b * k], [PB_PSI.a * PB_PSI.b * k, PB_PSI.b * PB_PSI.b]];
}
/* an explicit partial trace: Ψ = a|0⟩|e₀⟩ + b|1⟩|e₁⟩ with e₀ = (1, 0), e₁ = (cos, sin); (ρ_S)ᵢⱼ = Σₖ Ψᵢₖ Ψⱼₖ */
function pbPartialTrace(thEnv) {
  const e = [[1, 0], [Math.cos(thEnv), Math.sin(thEnv)]], amp = [PB_PSI.a, PB_PSI.b];
  const Psi = [0, 1].map(i => [0, 1].map(k => amp[i] * e[i][k]));
  return [0, 1].map(i => [0, 1].map(j => Psi[i][0] * Psi[j][0] + Psi[i][1] * Psi[j][1]));
}

/* the five cited theorems, by short name (film.json "lean") */
const PB_LEAN = {
  inner_product_norm_parallelogram_law: 'D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law',
  rank_one_pure_state_modulus_square_reduction: 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction',
  born_probability_skeleton: 'D5/S3/Quantum/FiniteDimensional.born_probability_skeleton',
  nonselective_recording_marginal: 'D5/S3/Quantum/Decoherence/NonselectiveMarginalization.nonselective_recording_marginal',
  pinching_hilbert_schmidt_pythagorean: 'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('pairwise film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(PB_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(PB_LEAN).length}`);
  for (const [short, gid] of Object.entries(PB_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. PAIR: exact parallelogram arithmetic, and the drawn vectors at many orientations */
  check(PB_PAIR.c && PQ.eq(PB_PAIR.c, PQ.HALF), 'cos 60° is not 1/2');
  check(PQ.eq(PB_PAIR.plus, PQ.q(3)) && PQ.eq(PB_PAIR.minus, PQ.ONE), '|x ± y|² ≠ 3, 1');
  check(PQ.eq(PB_PAIR.sum, PQ.q(4)), '3 + 1 ≠ 2(1² + 1²)');
  check(PQ.eq(PB_PAIR.inner, PB_PAIR.c), 'polarization does not return cos 60°');
  for (let k = 0; k < 64; k++) {
    const al = k * TAU / 64, x = [Math.cos(al), Math.sin(al)], y = [Math.cos(al + PB_PAIR_THETA * PB_DEG), Math.sin(al + PB_PAIR_THETA * PB_DEG)];
    const s2 = (x[0] + y[0]) ** 2 + (x[1] + y[1]) ** 2, d2 = (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2;
    check(Math.abs(s2 - 3) < 1e-12 && Math.abs(d2 - 1) < 1e-12, `drawn diagonals wrong at α = ${al.toFixed(3)}`);
    check(Math.abs((s2 - d2) / 4 - (x[0] * y[0] + x[1] * y[1])) < 1e-12, 'polarization fails on the drawn vectors');
  }

  /* 2. BORN: the table, and Tr(ρ_a P_b) = |⟨φ|ψ⟩|² = (1 + a·b)/2 for Bloch vectors, by 2×2 complex arithmetic */
  const want = ['1', '3/4', '1/2', '1/4', '0'];
  PB_ROWS.forEach((r, i) => {
    check(r.c !== null, `cos ${r.t}° is not a small rational`);
    check(PQ.str(r.p) === want[i], `p(${r.t}°) = ${PQ.str(r.p)}, expected ${want[i]}`);
    check(Math.abs(PQ.val(r.p) - Math.cos(r.half * PB_DEG) ** 2) < 1e-12, `p(${r.t}°) ≠ cos²(θ/2)`);
  });
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ket = (th, ph) => [[Math.cos(th / 2), 0], [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)]];
  const outer = v => [0, 1].map(i => [0, 1].map(j => cm(v[i], [v[j][0], -v[j][1]])));
  const trProd = (A, B) => { let re = 0, im = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const z = cm(A[i][j], B[j][i]); re += z[0]; im += z[1]; } return [re, im]; };
  const bloch = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
    const t1 = 0.37 * i, p1 = 0.71 * i + 0.2, t2 = 0.33 * j + 0.1, p2 = 1.3 * j;
    const psi = ket(t1, p1), phi = ket(t2, p2), tr = trProd(outer(psi), outer(phi));
    const ov = [phi[0][0] * psi[0][0] + phi[0][1] * psi[0][1] + phi[1][0] * psi[1][0] + phi[1][1] * psi[1][1],
      phi[0][0] * psi[0][1] - phi[0][1] * psi[0][0] + phi[1][0] * psi[1][1] - phi[1][1] * psi[1][0]];
    const a = bloch(t1, p1), b = bloch(t2, p2), ab = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    check(Math.abs(tr[1]) < 1e-12 && Math.abs(tr[0] - (ov[0] ** 2 + ov[1] ** 2)) < 1e-12, `Tr(ρP) ≠ |⟨φ|ψ⟩|² at ${i}, ${j}`);
    check(Math.abs(tr[0] - (1 + ab) / 2) < 1e-12, `Tr(ρP) ≠ (1 + a·b)/2 at ${i}, ${j}`);
  }

  /* 3. SQUARE: the three sums at 0°, 45°, 90° */
  const sums = ph => [1, 2, 4].map(n => Math.cos(ph) ** n + Math.sin(ph) ** n);
  [0, Math.PI / 2].forEach(ph => sums(ph).forEach(s => check(Math.abs(s - 1) < 1e-12, 'a power sum ≠ 1 at the ends')));
  const s45 = sums(Math.PI / 4);
  check(Math.abs(s45[0] - Math.SQRT2) < 1e-12 && Math.abs(s45[1] - 1) < 1e-12 && Math.abs(s45[2] - 0.5) < 1e-12, 'power sums at 45°');
  for (let k = 0; k <= 90; k++) check(Math.abs(sums(k * PB_DEG)[1] - 1) < 1e-12, `cos² + sin² ≠ 1 at ${k}°`);

  /* 4. CHORD: exact weights and Hilbert–Schmidt masses; the formula for ρ_S against an explicit partial trace */
  check(PQ.str(PB_PSI.p0) === '3/4' && PQ.str(PB_PSI.p1) === '1/4', 'weights of |ψ⟩ are not 3/4, 1/4');
  check(PQ.str(PB_PSI.diagHS) === '5/8' && PQ.str(PB_PSI.discarded) === '3/8' && PQ.eq(PB_PSI.total, PQ.ONE), 'HS split ≠ 1 = 5/8 + 3/8');
  for (let k = 0; k <= 90; k++) {
    const th = k * PB_DEG, A = pbRhoS(th), B = pbPartialTrace(th);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) check(Math.abs(A[i][j] - B[i][j]) < 1e-12, `ρ_S formula ≠ partial trace at ${k}°`);
    check(Math.abs(A[0][0] - 0.75) < 1e-12 && Math.abs(A[1][1] - 0.25) < 1e-12, `weights moved at ${k}°`);
  }
  const R90 = pbPartialTrace(Math.PI / 2);
  check(Math.abs(R90[0][1]) < 1e-12 && Math.abs(R90[1][0]) < 1e-12, 'orthogonal records leave coherence');
  /* Σ P_a ρ P_a for the Z basis keeps the diagonal of the pure ρ = |ψ⟩⟨ψ| */
  const rho = pbRhoS(0), pinch = [[rho[0][0], 0], [0, rho[1][1]]];
  check(Math.abs(pinch[0][0] - R90[0][0]) < 1e-12 && Math.abs(pinch[1][1] - R90[1][1]) < 1e-12, 'ρ_S(90°) ≠ Σ P_a ρ P_a');
  const hs = M => M[0][0] ** 2 + M[0][1] ** 2 + M[1][0] ** 2 + M[1][1] ** 2;
  check(Math.abs(hs(rho) - 1) < 1e-12 && Math.abs(hs(pinch) - 5 / 8) < 1e-12 && Math.abs(hs(rho) - hs(pinch) - 3 / 8) < 1e-12, 'HS masses of ρ');
});
Object.assign(FILM.speed, { pair: 0.02, shadow: 0.014, born: 0.016, square: 0.02, chord: 0.012, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
const pbNum = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '+') + Math.abs(v).toFixed(d); };
const pbAbs = (x, d = 3) => (Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x).toFixed(d).replace('-', '−');
const pbDeg = (r, d = 1) => (r / PB_DEG).toFixed(d) + '°';
/* a point at angle t (radians, counter-clockwise) and radius r from the screen point O */
const pbAt = (O, R, t, r = 1) => [O[0] + R * r * Math.cos(t), O[1] - R * r * Math.sin(t)];
/* coloured runs of text on one baseline: parts = [[text, colour], …] */
function pbRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* a 2×2 matrix with bracket rails; y is the baseline of the first row */
function pbMat(x, y, cells, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 24, cw = o.cw || 150, rh = o.rh || 44, col = o.c || C.white;
  const top = y - size * 1.1, bot = y + rh + size * 0.5, xr = x + 20 + cw * 2;
  for (const [x0, d] of [[x, 1], [xr, -1]]) {
    line(x0, top, x0, bot, col, a * 0.85, 2);
    line(x0, top, x0 + 12 * d, top, col, a * 0.85, 2);
    line(x0, bot, x0 + 12 * d, bot, col, a * 0.85, 2);
  }
  cells.forEach((row, i) => row.forEach((s, j) => txt(s, x + 10 + cw * j + cw / 2, y + rh * i,
    { size, fam: F.mono, w: 700, align: 'center', c: (o.cols && o.cols[i][j]) || col, a })));
  return xr;
}
/* LEAN ✓ chip for one cited theorem, by short name */
const PB_MISSING = new Set();
function pbLean(x, y, short, a, o = {}) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) {
    if (!PB_MISSING.has(short)) { PB_MISSING.add(short); window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* NUM tag: computed on screen, not a proof */
function pbNumTag(x, y, a) { chip(x + 32, y - 9, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }
/* angle arc at O from t0 to t1 with a label */
function pbArc(O, r, t0, t1, col, a, label, lw = 2.5, frac = 0.5) {
  if (a <= 0.003) return;
  const n = Math.max(6, Math.ceil(Math.abs(t1 - t0) * 24));
  curve(s => pbAt(O, r, t0 + (t1 - t0) * s), n, col, a, lw);
  if (label) { const p = pbAt(O, r + 34, t0 + (t1 - t0) * frac); txt(label, p[0], p[1] + 10, { size: 28, fam: F.math, w: 700, align: 'center', c: col, a: a * clamp(Math.abs(t1 - t0) / 0.25) }); }
}
/* right-angle mark at P between unit directions u and v (screen space) */
function pbRight(P, u, v, s, col, a) {
  if (a <= 0.003) return;
  const p1 = [P[0] + u[0] * s, P[1] + u[1] * s], p2 = [p1[0] + v[0] * s, p1[1] + v[1] * s], p3 = [P[0] + v[0] * s, P[1] + v[1] * s];
  line(p1[0], p1[1], p2[0], p2[1], col, a, 2); line(p2[0], p2[1], p3[0], p3[1], col, a, 2);
}
/* piecewise eased path through keyframes [[time, value], …] */
function pbPath(keys, u) {
  if (u <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
    if (u <= t1) return lerp(v0, v1, ease((u - t0) / Math.max(1e-6, t1 - t0)));
  }
  return keys[keys.length - 1][1];
}
const pbFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);

/* ======================================================================= */
/*                            scene 1 · TWO ARROWS                           */
/* ======================================================================= */
const PB_O1 = [560, 540], PB_R1 = 215;
function pbPairAngle(S) {
  const tB = phraseAt(S, 0, 'A second arrow');
  if (S.u < tB) return 1.15 * S.u + 0.3;                         // the lone arrow spins: nothing tells its direction
  const a0 = 1.15 * tB + 0.3, target = 12 * PB_DEG;
  const k = ease(clamp((S.u - tB) / 1.4));
  /* settle to a gentle tumble about 12° (the nearest copy of it): the pair turns together, the angle between stays */
  const base = target + TAU * Math.round((a0 - target) / TAU);
  return lerp(a0, base, k) + 0.22 * Math.sin(0.45 * (S.u - tB)) * k;
}
SCENES.pair = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* opening title, decoding in during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.3);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 480, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble('PAIRWISE MEASUREMENT', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 8, ab: 2 });
    txt(scramble('FROM TWO ARROWS TO THE BORN WEIGHT', p, 7), W / 2, 640, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: ta * 0.9, ls: 5 });
    txt('LINE · SHADOW · WEIGHT · CHORD', W / 2, 712, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 8 });
  }
  const ma = at(S, 0, 0.8, -0.2) * clamp((S.d - u) / 0.5);
  if (ma <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Three plus one', 'lean'], [2, 'Three minus one', 'computed']]);
  const O = PB_O1, R = PB_R1, al = pbPairAngle(S), th = PB_PAIR_THETA * PB_DEG;
  const bA = Q(S, 0, 'A second arrow', 0.6);
  /* the outside frame C: drawn, then struck out */
  const fA = Q(S, 1, 'No outside frame', 0.6, -0.4) * ma, fX = Q(S, 1, 'the two diagonals', 0.5);
  if (fA > 0) {
    const g = -0.35, k = 1 - 0.75 * fX;
    for (const t of [g, g + Math.PI / 2]) {
      const p = pbAt(O, R * 1.65, t), q = pbAt(O, R * 1.65, t + Math.PI);
      dashed(q[0], q[1], p[0], p[1], C.white, 0.45 * fA * k, 2);
    }
    const lc = pbAt(O, R * 1.65, g + Math.PI / 2);
    txt('C', lc[0] - 30, lc[1] + 4, { size: 40, fam: F.math, w: 700, c: C.white, a: fA * (0.5 + 0.5 * k) });
    txt('(x, y, z)?', lc[0] - 30, lc[1] + 40, { size: 20, fam: F.mono, w: 700, c: C.white, a: 0.8 * fA * k });
    if (fX > 0) line(lc[0] - 44, lc[1] + 12, lc[0] - 44 + 64 * fX, lc[1] - 38 * fX, C.white, fA * fX, 4);
  }
  /* the lone arrow's ghosts: every orientation looks the same */
  const lone = 1 - bA;
  if (lone > 0) for (let k = 1; k <= 5; k++) {
    const p = pbAt(O, R, al - k * 0.55);
    dashed(O[0], O[1], p[0], p[1], C.dim, 0.5 * lone * ma * (1 - k / 7), 2);
  }
  if (lone > 0.05) txt('θ = ?', O[0] + 40, O[1] + R + 110, { size: 34, fam: F.math, w: 700, c: C.dim, a: lone * ma * at(S, 0, 0.6, 0.3) });
  const X = pbAt(O, R, al), Y = pbAt(O, R, al + th);
  /* parallelogram and its diagonals */
  const dA = Q(S, 1, 'the two diagonals', 0.7) * ma;
  if (dA > 0) {
    const XY = [X[0] + Y[0] - O[0], X[1] + Y[1] - O[1]];
    line(X[0], X[1], XY[0], XY[1], C.dim, 0.7 * dA, 1.6);
    line(Y[0], Y[1], XY[0], XY[1], C.dim, 0.7 * dA, 1.6);
    const gS = ease(clamp(dA * 1.2)), gD = ease(clamp(dA * 1.2 - 0.2));
    line(O[0], O[1], lerp(O[0], XY[0], gS), lerp(O[1], XY[1], gS), C.cyan, dA, 5);
    if (gD > 0) dashed(Y[0], Y[1], lerp(Y[0], X[0], gD), lerp(Y[1], X[1], gD), C.cyan, dA, 3.5);
    txt('x + y', XY[0] + 16, XY[1] - 8, { size: 30, fam: F.math, w: 700, c: C.cyan, a: dA });
    /* label the short diagonal near x, on the side away from O */
    const q = [lerp(Y[0], X[0], 0.78), lerp(Y[1], X[1], 0.78)], dd = Math.hypot(X[0] - Y[0], X[1] - Y[1]);
    let nx = -(X[1] - Y[1]) / dd, ny = (X[0] - Y[0]) / dd;
    if (nx * (O[0] - q[0]) + ny * (O[1] - q[1]) > 0) { nx = -nx; ny = -ny; }
    txt('x − y', q[0] + nx * 34, q[1] + ny * 34 + 8, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: dA });
  }
  /* the two arrows and the angle */
  arrow(O[0], O[1], X[0], X[1], C.cyan, ma, 4.5);
  dot(X[0], X[1], 12, 'c', ma);
  txt(bA > 0.5 ? 'x' : 'A', X[0] + 34 * Math.cos(al), X[1] - 34 * Math.sin(al) + 12, { size: 34, fam: F.math, w: 700, c: C.cyan, a: ma });
  if (bA > 0) {
    const Yg = pbAt(O, R * bA, al + th);
    arrow(O[0], O[1], Yg[0], Yg[1], C.now, ma * bA, 4.5);
    dot(Yg[0], Yg[1], 12, 'g', ma * bA);
    txt('y', Yg[0] + 22 * Math.cos(al + th) - 8, Yg[1] - 22 * Math.sin(al + th) + 6, { size: 34, fam: F.math, w: 700, c: C.now, a: ma * bA });
    /* θ from the drawn vectors */
    const dx = [X[0] - O[0], X[1] - O[1]], dy = [Y[0] - O[0], Y[1] - O[1]];
    const ang = Math.acos(clamp((dx[0] * dy[0] + dx[1] * dy[1]) / (Math.hypot(...dx) * Math.hypot(...dy)), -1, 1));
    pbArc(O, 64, al, al + th, C.now, ma * bA, 'θ', 2.5, 0.8);
    txt(`θ = ${pbDeg(ang)}   ·   the pair turns, θ stays`, O[0] - R - 40, O[1] + R + 110, { size: 22, fam: F.mono, w: 700, c: C.now, a: ma * bA * (1 - dA * 0.4) });
  }
  dot(O[0], O[1], 9, 'w', ma);
  /* the identity panel */
  const pa = dA;
  if (pa > 0) {
    const x = 1010, y = 180, w = 790;
    panel(x, y, w, 640, pa, C.cyan, 'PARALLELOGRAM · 平行四边形');
    txt('‖x + y‖² + ‖x − y‖² = 2(‖x‖² + ‖y‖²)', x + 28, y + 84, { size: 32, fam: F.math, w: 700, c: C.white, a: pa });
    pbLean(x + 28, y + 136, 'inner_product_norm_parallelogram_law', pa * Q(S, 1, 'already read', 0.6), { size: 20 });
    /* the squared lengths of the drawn diagonals: they stay put while the pair turns */
    const XY = [X[0] + Y[0] - 2 * O[0], X[1] + Y[1] - 2 * O[1]], XmY = [X[0] - Y[0], X[1] - Y[1]];
    const s2 = (XY[0] ** 2 + XY[1] ** 2) / R ** 2, d2 = (XmY[0] ** 2 + XmY[1] ** 2) / R ** 2;
    pbRich([['‖x + y‖² = ', C.white], [s2.toFixed(3), C.cyan], ['     ‖x − y‖² = ', C.white], [d2.toFixed(3), C.cyan]], x + 28, y + 214, { size: 28, a: pa });
    txt('measured on the drawn diagonals, ‖x‖ = ‖y‖ = 1', x + 28, y + 252, { size: 19, fam: F.mono, w: 700, c: C.dim, a: pa });
    const P = PB_PAIR, q1 = Q(S, 2, 'Three plus one', 0.6);
    pbRich([[`${PQ.str(P.plus)} + ${PQ.str(P.minus)} = ${PQ.str(P.sum)} = 2(1² + 1²)`, C.white]], x + 28, y + 340, { size: 36, a: pa * q1, ab: 1 });
    const q2 = Q(S, 2, 'Three minus one', 0.6), q3 = Q(S, 2, 'sixty degrees', 0.6);
    txt('⟨x, y⟩ = (‖x + y‖² − ‖x − y‖²) / 4', x + 28, y + 430, { size: 30, fam: F.math, w: 700, c: C.white, a: pa * q2 });
    pbRich([[`= (${PQ.str(P.plus)} − ${PQ.str(P.minus)}) / 4 = `, C.white], [PQ.str(P.inner), C.cyan], [' = cos 60°', C.now]], x + 28, y + 494, { size: 36, a: pa * q2, ab: 1 });
    pbNumTag(x + w - 110, y + 410, pa * q2);
    txt('no axis, no third point: only x and y', x + 28, y + 580, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: pa * q3 });
  }
};

/* ======================================================================= */
/*                              scene 2 · POINT C                            */
/* ======================================================================= */
const PB_O2 = [560, 560], PB_R2 = 300;
function pbShadowState(S) {
  const L0 = lineAt(S, 0);
  const rot = (1 - ease(clamp((S.u - L0.s + 0.2) / 1.6))) * 25 * PB_DEG;        // A turns to become the axis
  const t0 = phraseAt(S, 1, 'cosine theta'), t1 = lineAt(S, 2).e;
  const th = pbPath([[t0, 60], [t1, 120]], S.u) * PB_DEG;
  return { rot, th };
}
/* the A-line with ticks at ±1, the arrow a and the unit circle */
function pbAxisStage(O, R, rot, a, o = {}) {
  ring(O[0], O[1], R, C.dim, 0.45 * a, 1.5);
  const p = pbAt(O, R * 1.18, rot), q = pbAt(O, R * 1.18, rot + Math.PI);
  dashed(q[0], q[1], p[0], p[1], C.cyan, 0.55 * a, 2);
  if (o.ticks) for (const [v, s] of [[-1, '−1'], [0, '0'], [1, '+1']]) {
    const t = pbAt(O, R * v, rot);
    line(t[0], t[1] - 10, t[0], t[1] + 10, C.white, 0.8 * a * o.ticks, 2);
    txt(s, t[0] + (v === 1 ? 18 : 0), t[1] + 42, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: 0.85 * a * o.ticks });
  }
  const A = pbAt(O, R, rot);
  arrow(O[0], O[1], A[0], A[1], C.cyan, a, 5);
  txt('a', A[0] - (o.ticks ? 34 : -8), A[1] - 22, { size: 34, fam: F.math, w: 700, c: C.cyan, a });
  dot(O[0], O[1], 9, 'w', a);
}
/* b, the perpendicular, the foot C, the shadow c and the rest b⊥ */
function pbShadowFigure(O, R, rot, th, a, show) {
  const B = pbAt(O, R, rot + th), c = Math.cos(th), Cf = pbAt(O, R * c, rot);
  if (show.perp > 0) dashed(B[0], B[1], Cf[0], Cf[1], C.white, 0.6 * a * show.perp * (1 - show.rest), 2);
  if (show.shadow > 0) {
    const off = [16 * Math.sin(rot), 16 * Math.cos(rot)];      // just below the a-line, so a negative shadow reads
    line(O[0] + off[0], O[1] + off[1], Cf[0] + off[0], Cf[1] + off[1], C.cyan, a * show.shadow, 9);
    const m = pbAt(O, R * c / 2, rot);
    txt('cos θ', m[0], m[1] + (show.labelDy || 44), { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * show.shadow });
  }
  if (show.rest > 0) {
    dashed(Cf[0], Cf[1], B[0], B[1], C.mag, a * show.rest, 4);
    const m = [(Cf[0] + B[0]) / 2, (Cf[1] + B[1]) / 2];
    txt('sin θ', m[0] + (c >= 0 ? 18 : -18), m[1] + 8, { size: 28, fam: F.math, w: 700, align: c >= 0 ? 'left' : 'right', c: C.mag, a: a * show.rest * clamp((Math.abs(Math.sin(th)) - 0.1) * 5) });
    const unit = (p, q) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]); return d > 1e-6 ? [(q[0] - p[0]) / d, (q[1] - p[1]) / d] : null; };
    const ux = unit(Cf, c >= 0 ? O : pbAt(O, R, rot + Math.PI)), uy = unit(Cf, B);
    if (ux && uy && Math.abs(Math.sin(th)) > 0.12) pbRight(Cf, ux, uy, 20, C.mag, a * show.rest);
  }
  if (show.foot > 0) {
    dot(Cf[0], Cf[1], 14, 'c', a * show.foot);
    txt('C', Cf[0] + (c >= 0 ? 14 : -14), Cf[1] - 20, { size: 34, fam: F.math, w: 700, align: c >= 0 ? 'left' : 'right', c: C.white, a: a * show.foot * clamp((Math.abs(Math.sin(th)) - 0.12) / 0.15) });
  }
  pbArc(O, 60, rot, rot + th, C.now, a, 'θ');
  arrow(O[0], O[1], B[0], B[1], C.now, a, 5);
  dot(B[0], B[1], 13, 'g', a);
  const bl = pbAt(O, R + 40, rot + th + (th <= Math.PI / 2 ? 0.14 : -0.14));
  txt('b', bl[0], Math.max(bl[1] + 12, 190), { size: 34, fam: F.math, w: 700, align: 'center', c: C.now, a });
  return { B, Cf, c };
}
SCENES.shadow = S => {
  const a = pbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const O = PB_O2, R = PB_R2, { rot, th } = pbShadowState(S);
  pbAxisStage(O, R, rot, a);
  const show = { perp: Q(S, 0, 'drop a perpendicular', 0.6), foot: Q(S, 1, 'The foot', 0.5), shadow: Q(S, 1, "B's shadow", 0.6), rest: Q(S, 2, 'The rest', 0.6) };
  const { B, Cf } = pbShadowFigure(O, R, rot, th, a, show);
  if (rot > 0.01) txt('A turns to become the axis', O[0], O[1] - R - 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * clamp(rot / (10 * PB_DEG)) });
  /* the panel: everything from the drawn points */
  const x = 1010, y = 180, w = 790, pa = a * at(S, 0, 0.6, 0.4);
  panel(x, y, w, 560, pa, C.cyan, 'POINT C · 点 C');
  pbRich([['c = (a·b) a = (', C.white], ['cos θ', C.cyan], [') a', C.white]], x + 28, y + 90, { size: 34, a: pa * Math.max(show.foot, 0.25) });
  pbRich([['b⊥ = b − c,    a·b⊥ = 0', C.mag]], x + 28, y + 160, { size: 32, a: pa * Math.max(show.rest, 0.2) });
  pbRich([['‖b⊥‖² = 1 − cos²θ = ', C.white], ['sin²θ', C.mag]], x + 28, y + 222, { size: 32, a: pa * Math.max(show.rest, 0.2) });
  const ax = [Math.cos(rot), Math.sin(rot)], bv = [(B[0] - O[0]) / R, -(B[1] - O[1]) / R];
  const ab = ax[0] * bv[0] + ax[1] * bv[1], cv = [ab * ax[0], ab * ax[1]], bp = [bv[0] - cv[0], bv[1] - cv[1]];
  const ycur = y + 320;
  txt(`θ = ${pbDeg(th)}`, x + 28, ycur, { size: 26, fam: F.mono, w: 700, c: C.now, a: pa });
  txt(`a·b = ${pbNum(ab)}`, x + 250, ycur, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: pa });
  txt(`‖b⊥‖ = ${pbAbs(Math.hypot(...bp))}`, x + 510, ycur, { size: 26, fam: F.mono, w: 700, c: C.mag, a: pa * Math.max(show.rest, 0.3) });
  txt(`a·b⊥ = ${pbNum(ax[0] * bp[0] + ax[1] * bp[1])}`, x + 28, ycur + 50, { size: 24, fam: F.mono, w: 700, c: C.white, a: pa * Math.max(show.rest, 0.3) });
  txt(`‖c‖² + ‖b⊥‖² = ${(cv[0] ** 2 + cv[1] ** 2 + bp[0] ** 2 + bp[1] ** 2).toFixed(3)}`, x + 380, ycur + 50, { size: 24, fam: F.mono, w: 700, c: C.white, a: pa * Math.max(show.rest, 0.3) });
  pbNumTag(x + w - 110, y + 25, pa);
  txt('C is not a third object: it is b’s shadow on a', x + 28, y + 470, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: pa * Q(S, 1, "B's shadow", 0.6, 0.8) });
  txt('“点 C”是 b 落在 a 上的影子', x + 28, y + 520, { size: 28, fam: F.zh, w: 700, c: C.white, a: pa * Q(S, 1, "B's shadow", 0.6, 1.0) });
  void Cf;
};

/* ======================================================================= */
/*                            scene 3 · BORN WEIGHT                          */
/* ======================================================================= */
const PB_O3 = [540, 440], PB_R3 = 270, PB_RULER_Y = 800;
function pbBornTheta(S) {
  const L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  return pbPath([[L1.s + 0.1, 120], [L1.s + 2.0, 180], [L2.e - 0.2, 0]], S.u) * PB_DEG;
}
SCENES.born = S => {
  const a = pbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  const O = PB_O3, R = PB_R3, th = pbBornTheta(S);
  pbAxisStage(O, R, 0, a, { ticks: 1 });
  const { c } = pbShadowFigure(O, R, 0, th, a, { perp: 1, foot: 1, shadow: 1, rest: 0.5, labelDy: 84 });
  /* the affine squeeze: a copy of the diameter drops to the ruler and shrinks, x ↦ (1 + x)/2 */
  const k = ease(Q(S, 0, 'Squeeze', 1.6)), drop = ease(Q(S, 0, 'Squeeze', 0.8, -0.3));
  const sx = v => O[0] + R * lerp(v, (1 + v) / 2 - 0.5, k), yy = lerp(O[1], PB_RULER_Y, drop);
  if (drop > 0) {
    const p = (1 + c) / 2, x0 = sx(-1), x1 = sx(1), xc = sx(c);
    if (k > 0.05) {
      fillBox(x0, yy - 14, xc - x0, 28, C.cyan, 0.75 * a * k);
      fillBox(xc, yy - 14, x1 - xc, 28, C.mag, 0.35 * a * k);
    }
    line(x0, yy, x1, yy, C.white, 0.8 * a * drop, 2);
    for (const [v, s0, s1] of [[-1, '−1', '0'], [0, '0', '½'], [1, '+1', '1']]) {
      const t = sx(v);
      line(t, yy - 18, t, yy + 18, C.white, 0.8 * a * drop, 2);
      txt(s0, t, yy + 50, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * drop * (1 - k) });
      txt(s1, t, yy + 50, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: a * drop * k });
    }
    /* the image of C */
    dot(xc, yy, 14, 'c', a * drop);
    const Cf = pbAt(O, R * c, 0);
    dashed(Cf[0], Cf[1] + 16, xc, yy - 18, C.cyan, 0.45 * a * drop * (1 - 0.6 * k), 2);
    txt(`p = ${p.toFixed(3)}`, xc, yy - 30, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * k });
    txt('x ↦ (1 + x)/2', x1 + 40, yy + 10, { size: 26, fam: F.math, w: 700, c: C.white, a: a * k });
  }
  /* panel 1: the weight */
  const x = 1010, w = 790, y = 180, pa = a * at(S, 0, 0.6, 0.2);
  panel(x, y, w, 290, pa, C.cyan, 'BORN WEIGHT · 玻恩权重');
  const q1 = Q(S, 1, 'One plus cosine', 0.6);
  pbRich([['p = (1 + ', C.white], ['cos θ', C.cyan], [')/2 = ', C.white], ['cos²(θ/2)', C.cyan]], x + 28, y + 86, { size: 36, a: pa * Math.max(q1, 0.3), ab: 1 });
  txt(`θ = ${pbDeg(th)}   θ/2 = ${pbDeg(th / 2)}   cos θ = ${pbNum(c)}   p = ${pbAbs((1 + c) / 2)}`, x + 28, y + 140, { size: 22, fam: F.mono, w: 700, c: C.now, a: pa });
  const q2 = Q(S, 2, 'trace pairing', 0.6);
  pbRich([['Tr(ρ P) = |⟨φ|ψ⟩|²', C.white], ['     ρ = ψψ*,  P = φφ*', C.dim]], x + 28, y + 208, { size: 28, a: pa * q2 });
  pbLean(x + 28, y + 258, 'rank_one_pure_state_modulus_square_reduction', pa * Q(S, 2, 'squared overlap', 0.6), { size: 19 });
  /* panel 2: the half-angle table, rows light as θ passes */
  const y2 = 490, ta = a * at(S, 1, 0.6, -0.2);
  panel(x, y2, w, 346, ta, C.cyan, 'HALF ANGLE · 半角换算');
  const cols = [x + 70, x + 220, x + 400, x + 620];
  ['θ', 'θ/2', 'cos θ', 'p = cos²(θ/2)'].forEach((s, i) => txt(s, cols[i], y2 + 72, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: ta }));
  /* which rows has θ swept through so far (sampled along the path) */
  const L1 = lineAt(S, 1);
  PB_ROWS.forEach((r, i) => {
    let seen = false, prev = pbBornTheta({ u: L1.s, L: S.L }) / PB_DEG;
    for (let s = L1.s + 0.05; s <= S.u + 1e-9 && !seen; s += 0.05) {
      const cur = pbBornTheta({ u: s, L: S.L }) / PB_DEG;
      if ((prev - r.t) * (cur - r.t) <= 0 || Math.abs(cur - r.t) < 0.6) seen = true;
      prev = cur;
    }
    const cur = Math.abs(th / PB_DEG - r.t) < 3, yr = y2 + 124 + i * 50;
    if (cur) fillBox(x + 20, yr - 34, w - 40, 46, rgba(C.now, 1), 0.12 * ta);
    const col = cur ? C.now : seen ? C.white : C.dim, ra = ta * (cur || seen ? 1 : 0.55);
    txt(`${r.t}°`, cols[0], yr, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: ra });
    txt(`${r.half}°`, cols[1], yr, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: ra });
    txt((r.c.n > 0 ? '+' : '') + PQ.str(r.c), cols[2], yr, { size: 26, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : C.cyan, a: ra });
    txt(PQ.str(r.p), cols[3], yr, { size: 26, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : C.cyan, a: ra });
  });
  pbNumTag(x + w - 110, y2 + 25, ta);
};

/* ======================================================================= */
/*                            scene 4 · WHY SQUARES                          */
/* ======================================================================= */
const PB_O4 = [330, 690], PB_R4 = 430;
function pbSquarePhi(S) {
  const L0 = lineAt(S, 0), t45 = phraseAt(S, 1, 'First powers') + 0.4;
  return pbPath([[L0.s + 0.4, 0], [L0.s + 0.4 + (t45 - L0.s) * 0.45, 90], [t45, 45]], S.u) * PB_DEG;
}
SCENES.square = S => {
  const a = pbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'as Lean confirms', 'lean']]);
  const O = PB_O4, R = PB_R4, ph = pbSquarePhi(S), c = Math.cos(ph), s = Math.sin(ph);
  /* the shutter P (horizontal) and its complement I − P (vertical), a quarter circle */
  curve(t => pbAt(O, R, t * Math.PI / 2), 40, C.dim, 0.5 * a, 1.5);
  const Px = pbAt(O, R * 1.12, 0), Py = pbAt(O, R * 1.12, Math.PI / 2);
  line(O[0], O[1], Px[0], Px[1], C.white, 0.6 * a, 2);
  line(O[0], O[1], Py[0], Py[1], C.white, 0.6 * a, 2);
  txt('P', Px[0] + 14, Px[1] + 10, { size: 32, fam: F.math, w: 700, c: C.white, a });
  txt('I − P', Py[0] + 14, Py[1] + 4, { size: 30, fam: F.math, w: 700, c: C.white, a });
  const T = pbAt(O, R, ph), F0 = pbAt(O, R * c, 0);
  const sp = Q(S, 0, 'Split', 0.6);
  line(O[0], O[1], F0[0], F0[1], C.cyan, a * sp, 9);
  dashed(F0[0], F0[1], T[0], T[1], C.mag, a * sp, 4);
  txt('cos(θ/2)', (O[0] + F0[0]) / 2, O[1] + 46, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * sp });
  txt('sin(θ/2)', F0[0] + 16, (F0[1] + T[1]) / 2 + 8, { size: 28, fam: F.math, w: 700, c: C.mag, a: a * sp * clamp(s * 4) });
  pbArc(O, 80, 0, ph, C.now, a, 'θ/2');
  arrow(O[0], O[1], T[0], T[1], C.now, a, 5);
  dot(T[0], T[1], 13, 'g', a);
  txt('ψ', T[0] + 16, T[1] - 14, { size: 34, fam: F.math, w: 700, c: C.now, a });
  dot(O[0], O[1], 9, 'w', a);
  txt(`θ/2 = ${pbDeg(ph)}   ·   θ = ${pbDeg(2 * ph)}`, O[0], O[1] + 110, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  /* three meters: cosⁿ + sinⁿ for n = 1, 2, 4 */
  const x = 1010, w = 790, y = 180, ma = a * at(S, 0, 0.6, 0.6);
  panel(x, y, w, 420, ma, C.cyan, 'POWER SUMS · 幂次之和');
  pbRich([['cosⁿ(θ/2)', C.cyan], [' + ', C.white], ['sinⁿ(θ/2)', C.mag]], x + w - 200, y + 70, { size: 24, align: 'center', a: ma });
  const U = 340, bx = x + 140, unitX = bx + U;
  const q1 = Q(S, 1, 'First powers', 0.5), q2 = Q(S, 1, 'fourth powers', 0.5), q3 = Q(S, 1, 'Only squares', 0.5);
  [[1, 'n = 1', q1, 'overshoots'], [2, 'n = 2', q3, 'always 1'], [4, 'n = 4', q2, 'leaks']].forEach(([n, lab, hi, note], i) => {
    const yb = y + 124 + i * 100, cn = c ** n, sn = s ** n, tot = cn + sn;
    txt(lab, x + 28, yb + 10, { size: 26, fam: F.mono, w: 700, c: n === 2 ? C.white : C.dim, a: ma });
    fillBox(bx, yb - 18, U * cn, 36, C.cyan, 0.75 * ma);
    fillBox(bx + U * cn, yb - 18, U * sn, 36, C.mag, 0.55 * ma);
    box(bx - 3, yb - 21, U * 1.45 + 6, 42, C.dim, 0.5 * ma, 1);
    txt(tot.toFixed(3), x + w - 40, yb + 10, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: ma });
    txt(note, bx, yb + 46, { size: 18, fam: F.mono, w: 700, c: n === 2 ? C.cyan : C.white, a: ma * hi });
  });
  dashed(unitX, y + 90, unitX, y + 370, C.white, 0.8 * ma, 2);
  txt('1', unitX, y + 392, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: ma });
  pbNumTag(x + w - 110, y + 25, ma);
  /* panel 2: the trace pairing is a probability */
  const y2 = 620, la = a * at(S, 2, 0.6, -0.2);
  panel(x, y2, w, 216, la, C.cyan, 'TRACE PAIRING · 迹配对');
  txt('Tr(ρ I) = 1    Tr(ρ(P + Q)) = Tr(ρ P) + Tr(ρ Q)', x + 28, y2 + 74, { size: 25, fam: F.math, w: 700, c: C.white, a: la });
  txt('P* = P,  P² = P   ⇒   0 ≤ Tr(ρ P)', x + 28, y2 + 116, { size: 25, fam: F.math, w: 700, c: C.white, a: la });
  pbLean(x + 28, y2 + 160, 'born_probability_skeleton', la * Q(S, 2, 'as Lean confirms', 0.5), { size: 20 });
  pbRich([['⇒  ', C.white], ['Tr(ρ P)', C.cyan], [' + ', C.white], ['Tr(ρ(I − P))', C.mag], [' = 1', C.white]], x + 28, y2 + 200, { size: 25, a: la * Q(S, 2, 'share the whole', 0.6) });
};

/* ======================================================================= */
/*                          scene 5 · INSIDE THE BALL                        */
/* ======================================================================= */
const PB_OE = [300, 420], PB_RE = 150, PB_OB = [820, 500], PB_RB = 290;
function pbEnvAngle(S) {
  const t0 = phraseAt(S, 1, 'its sideways part'), t1 = phraseAt(S, 2, 'orthogonal') + 0.3;
  return pbPath([[t0, 0], [t1, 90]], S.u) * PB_DEG;
}
SCENES.chord = S => {
  const a = pbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'orthogonal', 'lean']]);
  const te = pbEnvAngle(S), k = Math.cos(te);
  /* the environment's two records and the shadow of one on the other */
  const ea = a * at(S, 0, 0.6, 0.3);
  if (ea > 0) {
    const O = PB_OE, R = PB_RE;
    txt('ENVIRONMENT · 环境记录', O[0] - 40, O[1] - R - 50, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ea, ls: 2 });
    ring(O[0], O[1], R, C.dim, 0.4 * ea, 1.3);
    const E0 = pbAt(O, R, 0), E1 = pbAt(O, R, te), Cf = pbAt(O, R * k, 0);
    line(O[0], O[1], Cf[0], Cf[1], C.cyan, ea, 8);
    if (te > 0.02) dashed(Cf[0], Cf[1], E1[0], E1[1], C.mag, ea, 3);
    arrow(O[0], O[1], E0[0], E0[1], C.white, ea, 3.5);
    arrow(O[0], O[1], E1[0], E1[1], C.white, ea, 3.5);
    txt('|e₀⟩', E0[0] + 14, E0[1] + 10, { size: 26, fam: F.math, w: 700, c: C.white, a: ea });
    txt('|e₁⟩', E1[0] + 10, E1[1] - 14, { size: 26, fam: F.math, w: 700, c: C.white, a: ea * clamp(te / 0.3) });
    if (te > 0.02) pbArc(O, 46, 0, te, C.now, ea, null, 2);
    txt(`⟨e₀|e₁⟩ = cos θ_env = ${pbAbs(k)}`, O[0] - R, O[1] + 70, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: ea });
    txt(`θ_env = ${pbDeg(te)}`, O[0] - R, O[1] + 104, { size: 21, fam: F.mono, w: 700, c: C.now, a: ea });
  }
  /* the Bloch ball, vertical section through x and z */
  const O = PB_OB, R = PB_RB;
  ring(O[0], O[1], R, C.cyan, 0.7 * a, 2.4);
  ring(O[0], O[1], R + 8, C.cyan, 0.15 * a, 1);
  dot(O[0] - R * 0.18, O[1] - R * 0.22, R * 1.2, 'b', 0.07 * a);
  dashed(O[0] - R - 20, O[1], O[0] + R + 20, O[1], C.dim, 0.5 * a, 1.5);
  line(O[0], O[1] - R - 26, O[0], O[1] + R + 26, C.vio, 0.85 * a, 2.5);
  txt('|0⟩', O[0] + 14, O[1] - R - 12, { size: 28, fam: F.math, w: 700, c: C.white, a });
  txt('|1⟩', O[0] + 14, O[1] + R + 36, { size: 28, fam: F.math, w: 700, c: C.white, a });
  txt('x', O[0] + R + 30, O[1] + 8, { size: 24, fam: F.math, w: 700, c: C.dim, a });
  const th = PB_PSI_THETA * PB_DEG, rx = Math.sin(th) * k, rz = Math.cos(th);
  const toS = (X, Z) => [O[0] + R * X, O[1] - R * Z];
  const pure = toS(Math.sin(th), rz), tip = toS(rx, rz), hz = toS(0, rz);
  dashed(O[0], O[1], pure[0], pure[1], C.now, 0.45 * a, 2);
  dot(pure[0], pure[1], 8, 'w', 0.6 * a);
  txt('pure', pure[0] + 14, pure[1] + 30, { size: 20, fam: F.mono, w: 700, c: C.dim, a: a * clamp((1 - k) * 2) });
  const sw = Q(S, 1, 'its sideways part', 0.6);
  line(hz[0], hz[1], tip[0], tip[1], C.cyan, a * Math.max(sw, 0.35), 7);
  if (sw > 0) txt('r_x = sin θ · cos θ_env', hz[0] + 12, hz[1] - 18, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a * sw * clamp(k * 3) });
  line(hz[0] - 12, hz[1], hz[0] + 12, hz[1], C.white, a, 2);
  txt('r_z = 1/2', hz[0] - 18, hz[1] + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: a * Q(S, 1, 'while its height', 0.6) });
  arrow(O[0], O[1], tip[0], tip[1], C.now, a, 5);
  dot(tip[0], tip[1], 13, 'g', a);
  txt('r', (O[0] + tip[0]) / 2 + 16, (O[1] + tip[1]) / 2 + 30, { size: 32, fam: F.math, w: 700, c: C.now, a });
  dot(O[0], O[1], 8, 'w', a);
  const len = Math.hypot(rx, rz);
  txt(`‖r‖ = ${len.toFixed(3)}`, O[0] - R, O[1] + R + 70, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  const fin = Q(S, 2, 'a short line', 0.6);
  if (fin > 0) stamp('A SHORT LINE INSIDE', PB_OE[0], 720, fin, C.cyan, 24, -0.05);
  /* the panel: ρ_S, the weights, and the two theorems */
  const x = 1180, w = 620, y = 180, pa = a * at(S, 0, 0.6, 0.4);
  panel(x, y, w, 656, pa, C.cyan, 'LOCAL STATE · 局部态');
  txt('|Ψ⟩ = (√3/2)|0⟩|e₀⟩ + (1/2)|1⟩|e₁⟩', x + 24, y + 72, { size: 24, fam: F.math, w: 700, c: C.white, a: pa });
  txt('ρ_S = Tr_E |Ψ⟩⟨Ψ| =', x + 24, y + 128, { size: 24, fam: F.math, w: 700, c: C.white, a: pa * at(S, 1, 0.6, -0.3) });
  const M = pbRhoS(te), ma = pa * at(S, 1, 0.6, -0.3);
  pbMat(x + 60, y + 196, [[M[0][0].toFixed(3), M[0][1].toFixed(3)], [M[1][0].toFixed(3), M[1][1].toFixed(3)]], ma,
    { size: 26, cw: 200, cols: [[C.white, C.mag], [C.mag, C.white]] });
  txt('off-diagonal = (√3/4) cos θ_env', x + 24, y + 290, { size: 19, fam: F.mono, w: 700, c: C.mag, a: ma });
  /* the weights on |0⟩, |1⟩: they do not move */
  const wy = y + 330, ww = 300;
  fillBox(x + 24, wy, ww * M[0][0], 24, C.cyan, 0.75 * ma);
  fillBox(x + 24 + ww * M[0][0], wy, ww * M[1][1], 24, C.mag, 0.45 * ma);
  box(x + 21, wy - 3, ww + 6, 30, C.dim, 0.6 * ma, 1);
  txt(`p₀ = ${PQ.str(PB_PSI.p0)}  p₁ = ${PQ.str(PB_PSI.p1)}`, x + 24 + ww + 18, wy + 21, { size: 20, fam: F.mono, w: 700, c: C.white, a: ma });
  const la = pa * at(S, 2, 0.6, -0.1), q2 = Q(S, 2, 'orthogonal', 0.6), q3 = Q(S, 2, 'The weights survive', 0.6);
  txt('θ_env = 90°:   ρ_S = Σₐ Pₐ ρ Pₐ', x + 24, y + 428, { size: 26, fam: F.math, w: 700, c: C.white, a: la * Math.max(q2, 0.3) });
  pbLean(x + 24, y + 470, 'nonselective_recording_marginal', la * q2, { size: 19 });
  pbRich([['⟨ρ,ρ⟩ = ', C.white], [PQ.str(PB_PSI.total), C.white], [' = ', C.white], [PQ.str(PB_PSI.diagHS), C.cyan], [' + ', C.white], [PQ.str(PB_PSI.discarded), C.mag]], x + 24, y + 540, { size: 28, a: la * q3 });
  pbLean(x + 24, y + 582, 'pinching_hilbert_schmidt_pythagorean', la * q3, { size: 19 });
  txt('kept diagonal + discarded coherence', x + 24, y + 628, { size: 18, fam: F.mono, w: 700, c: C.dim, a: la * q3 });
};

/* ======================================================================= */
/*                               scene 6 · LEDGER                            */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 270 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.start + 1.0;
  background(t, sc, 2, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.2, cx: 1320, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const O = [440, 470], R = 270, th = 60 * PB_DEG, c = Math.cos(th);
  pbAxisStage(O, R, 0, 1, { ticks: 1 });
  pbShadowFigure(O, R, 0, th, 1, { perp: 1, foot: 1, shadow: 1, rest: 1 });
  /* the weight ruler: x ↦ (1 + x)/2 */
  const y = 860, x0 = O[0] - R / 2, x1 = O[0] + R / 2, xc = x0 + R * (1 + c) / 2;
  fillBox(x0, y - 14, xc - x0, 28, C.cyan, 0.75);
  fillBox(xc, y - 14, x1 - xc, 28, C.mag, 0.35);
  line(x0, y, x1, y, C.white, 0.8, 2);
  dot(xc, y, 14, 'c', 1);
  txt(`p = cos²30° = ${PQ.str(PB_ROWS[1].p)}`, xc, y - 32, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan });
  txt(DATA.film.title_zh, 1330, 300, { size: 62, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('PAIRWISE MEASUREMENT', 1330, 396, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 6 });
  txt('FROM TWO ARROWS TO THE BORN WEIGHT', 1330, 456, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, ab: 2, ls: 4 });
  pbRich([['p = (1 + ', C.white], ['cos θ', C.cyan], [')/2 = ', C.white], ['cos²(θ/2)', C.cyan]], 1330, 560, { size: 44, align: 'center', ab: 1 });
  pbRich([['Tr(ρ P) = |⟨φ|ψ⟩|²', C.white]], 1330, 630, { size: 36, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 1330, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(1330, 770, 1, { align: 'center', size: 18, gap: 34 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(2);
};
