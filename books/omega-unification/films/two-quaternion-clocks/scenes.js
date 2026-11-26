/* Film · Two Quaternion Clocks · 两只四元数时钟 (book omega-unification, chapter 2).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     clocks  complex phases commute (e^{ia} e^{ib} = e^{ib} e^{ia}, computed); the sample pair U = (1 + 2i)/√5,
             V = (1 + 2j)/√5 of unit quaternions; half-traces x = Re U, y = Re V, z = Re(U V⁻¹) = xy + u·v, the
             commutator defect E = 1 + 2xyz − x² − y² − z² = |u × v|² (definition def-ou-ch02-dual-clocks);
             here x = y = 1/√5, z = 1/5, E = 16/25, |UV − VU|² = 4E = 64/25, Re(UVU⁻¹V⁻¹) = 1 − 2E = −7/25
             (computed, quaternion products done on load).
     body    E = det of the 3×3 Gram matrix of the anchors (1, U, V) (computed); the admissible (x, y, z) body,
             whose boundary is {(cos a, cos b, cos(a − b))} = {E = 0}, volume π²/2 (definition; volume recomputed
             numerically on load) ..... OmegaBargmannHaarHecke.detGram3_nonneg (LEAN: three nonzero integer
             quaternions, 0 ≤ detGram3 in IntRatio.Le); worked example a = 1, b = 1 + 2i, c = 1 + 2j gives
             16/25 (computed) ..... OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature (LEAN:
             ⟨{u, v, u}, v⟩ = gramAreaSq u v for integer 3-vectors); example u = (2, 0, 0), v = (0, 2, 0): 16 (computed).
     words   the six norm-5 Hurwitz generators; (1 + 2i)(1 + 2j) = (1, 2, 2, 4), (1 + 2j)(1 + 2i) = (1, 2, 2, −4)
             (computed); the images Ad(w)(axisX) of all 186 reduced words of length 1–3, and 186 distinct
             frames (Ad(w) axisX, Ad(w) axisY) (computed exactly in integers) ..... OmegaLieTripleAndFreeGroup.
             reduced_words_adjoint_injective (LEAN: reduced words with equal X and Y images are equal).
     hear    the two-component shell operator, the three shortest winding classes reading x, z, y, the doubled
             spectrum iff E = 0 (ARGUED, chapter 2.2); three probes with Lip ≤ 0.331 < 1 and amplification
             ≤ 5.196 × 10¹⁰ (CERT, copied from the chapter's table); two probes cannot be injective (invariance of
             domain, argued). The loop pictures are schematic.
     haar    the Haar selection rule u < sin²p sin²q |sin v| at the first 128 positive zeros (data/zeros.json,
             ordinates to 9 decimals); 16 kept, first six 8, 15, 28, 31, 38, 50 (computed here and re-derived on
             load from Riemann–Siegel roots); density 1/(2π) and its optimality under classical RH (external Lean
             proof, ARGUED).
     schur   the 22 shell frequencies split 4 + 2 + 16 (chapter 2.3, argued) ..... SchurOrthogonality.
             integral_dual_mul_dual_inv_eq_zero and integral_dual_mul_dual_inv_self (LEAN); ∫ χ_n([U, V]) = 1/(n + 1)
             (argued from Schur in the chapter), recomputed for n = 0…3 from exact Haar moments (computed).
             The closing remark that the zeros give a sampler, not the dynamics (couplings, the string tension and
             the 2D lattice action are inputs) is the chapter's MODEL boundary (2.4, 2.5), argued.

   On load, FILM.init checks DATA.lean against the five theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const QC_LEAN = {
  detGram3_nonneg: ['D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg', 'detGram3_nonneg'],
  lieTriple_unit_sectional_curvature: ['D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature', 'lieTriple_unit_sectional_curvature'],
  reduced_words_adjoint_injective: ['D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective', 'reduced_words_adjoint_injective'],
  integral_dual_mul_dual_inv_eq_zero: ['D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero', 'integral_dual_mul_dual_inv_eq_zero'],
  integral_dual_mul_dual_inv_self: ['D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self', 'integral_dual_mul_dual_inv_self']
};
/* quaternions as [w, x, y, z] = w + x i + y j + z k */
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qConj = a => [a[0], -a[1], -a[2], -a[3]];
const qN2 = a => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
const qDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
const R5 = Math.sqrt(5);
const QU = [1 / R5, 2 / R5, 0, 0], QV = [1 / R5, 0, 2 / R5, 0];
/* the half-traces and the defect of the sample pair */
const QX = QU[0], QY = QV[0], QZ = qMul(QU, qConj(QV))[0];
const QE = 1 + 2 * QX * QY * QZ - QX * QX - QY * QY - QZ * QZ;

/* the six norm-5 Hurwitz generators; letter k and k ^ 1 are conjugate inverses */
const HW_GEN = [[1, 2, 0, 0], [1, -2, 0, 0], [1, 0, 2, 0], [1, 0, -2, 0], [1, 0, 0, 2], [1, 0, 0, -2]];
const HW_NAME = ['1+2i', '1−2i', '1+2j', '1−2j', '1+2k', '1−2k'];
/* reduced words of length 1…L (no letter followed by its conjugate) */
function hwWords(L) {
  const out = []; let layer = [[]];
  for (let n = 1; n <= L; n++) {
    const next = [];
    for (const w of layer) for (let g = 0; g < 6; g++) if (!w.length || (w[w.length - 1] ^ 1) !== g) next.push(w.concat(g));
    out.push(...next); layer = next;
  }
  return out;
}
const hwEval = w => w.reduce((p, g) => qMul(p, HW_GEN[g]), [1, 0, 0, 0]);
/* the integer numerator of Ad(p)(e) = p e p̄ / |p|², e a pure axis */
const hwAdNum = (p, e) => qMul(qMul(p, [0, e[0], e[1], e[2]]), qConj(p)).slice(1);
const HW_WORDS = hwWords(3);
const HW_PTS = HW_WORDS.map(w => { const p = hwEval(w), n2 = qN2(p), X = hwAdNum(p, [1, 0, 0]); return { w, len: w.length, v: X.map(c => c / n2) }; });

/* the shell angles: chord d² on the sphere of squared radius 867, cos θ_d = 1 − d²/(2·867) */
const TH = d => Math.acos(1 - d / (2 * 867));
const ZE = (DATA.data && DATA.data.zeros) || [];
function hzSel(g) {
  const p = (TH(724) - TH(244)) * g, q = (TH(804) - TH(244)) * g, v = TH(12) * g;
  const t = TH(200) * g / TAU, u = t - Math.floor(t);
  const s = Math.pow(Math.sin(p), 2) * Math.pow(Math.sin(q), 2) * Math.abs(Math.sin(v));
  return { g, p, q, v, u, s, keep: u < s };
}
const HZ = ZE.map(hzSel);
const HZ_KEPT = HZ.map((z, i) => (z.keep ? i + 1 : 0)).filter(Boolean);

/* exact Haar moments: E = (1 − x²)(1 − y²)(1 − c²), x, y semicircle, c uniform on [−1, 1] */
const fr = (n, d) => { const g = (a, b) => (b ? g(b, a % b) : Math.abs(a)); const k = g(n, d) * Math.sign(d); return [n / k, d / k]; };
const frAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const frMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
/* semicircle: E[x^{2m}] = Catalan(m) / 4^m;  uniform: E[c^{2m}] = 1/(2m + 1) */
const catalan = m => binom(2 * m, m) / (m + 1);
function momE(k) {
  let a = [0, 1], b = [0, 1];
  for (let m = 0; m <= k; m++) {
    const sg = m % 2 ? -1 : 1;
    a = frAdd(a, fr(sg * binom(k, m) * catalan(m), Math.pow(4, m)));
    b = frAdd(b, fr(sg * binom(k, m), 2 * m + 1));
  }
  return frMul(frMul(a, a), b);
}
/* χ_n(g) = U_n(c) (Chebyshev, second kind) at c = Re g = 1 − 2E; average over Haar via the moments of E */
function charAvg(n) {
  /* U_n(c) coefficients by recursion U_{n+1} = 2c U_n − U_{n−1} */
  let U0 = [1], U1 = [0, 2];
  const polys = [U0, U1];
  for (let k = 2; k <= n; k++) {
    const a = polys[k - 1], b = polys[k - 2], c = new Array(k + 1).fill(0);
    a.forEach((x, i) => { c[i + 1] += 2 * x; }); b.forEach((x, i) => { c[i] -= x; });
    polys.push(c);
  }
  const P = polys[n];
  /* c^j = (1 − 2E)^j = Σ_i binom(j, i) (−2)^i E^i */
  let tot = [0, 1];
  P.forEach((cj, j) => {
    if (!cj) return;
    for (let i = 0; i <= j; i++) tot = frAdd(tot, frMul(fr(cj * binom(j, i) * Math.pow(-2, i), 1), momE(i)));
  });
  return tot;
}
const SC_AVG = [0, 1, 2, 3].map(charAvg);
const SC_MEAN_E = momE(1);


/* Riemann–Siegel Z(t), for an independent look at the zero ordinates */
const rsTheta = t => t / 2 * Math.log(t / TAU) - t / 2 - Math.PI / 8 + 1 / (48 * t) + 7 / (5760 * t * t * t);
const rsPsi = p => Math.cos(TAU * (p * p - p - 1 / 16)) / Math.cos(TAU * p);
function rsZ(t) {
  const a = Math.sqrt(t / TAU), N = Math.floor(a), p = a - N, T = rsTheta(t), h = 1e-3;
  let s = 0;
  for (let n = 1; n <= N; n++) s += Math.cos(T - t * Math.log(n)) / Math.sqrt(n);
  const d3 = (rsPsi(p + 2 * h) - 2 * rsPsi(p + h) + 2 * rsPsi(p - h) - rsPsi(p - 2 * h)) / (2 * h * h * h);
  return 2 * s + ((N - 1) % 2 ? -1 : 1) * Math.pow(a, -0.5) * (rsPsi(p) - d3 / (96 * Math.PI * Math.PI) / a);
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('two-quaternion-clocks film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
  const frEq = (a, n, d) => a[0] * d === n * a[1];

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(QC_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(QC_LEAN).length}`);
  for (const [short, [gid]] of Object.entries(QC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. CLOCKS: units, half-traces, the defect three ways, the commutator */
  check(near(qN2(QU), 1) && near(qN2(QV), 1), 'U, V are unit quaternions');
  check(near(QX, 1 / R5) && near(QY, 1 / R5) && near(QZ, 0.2), 'x = y = 1/√5, z = 1/5');
  check(near(QZ, QX * QY + (QU[1] * QV[1] + QU[2] * QV[2] + QU[3] * QV[3])), 'z = xy + u·v');
  {
    const u = QU.slice(1), v = QV.slice(1), cr = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    check(near(QE, 16 / 25) && near(cr[0] ** 2 + cr[1] ** 2 + cr[2] ** 2, 16 / 25), 'E = |u × v|² = 16/25');
    const uv = qMul(QU, QV), vu = qMul(QV, QU), dlt = uv.map((c, i) => c - vu[i]);
    check(near(qN2(dlt), 64 / 25) && near(qN2(dlt), 4 * QE), '|UV − VU|² = 4E = 64/25');
    const grp = qMul(qMul(QU, QV), qMul(qConj(QU), qConj(QV)));
    check(near(grp[0], 1 - 2 * QE) && near(grp[0], -7 / 25), 'Re(U V U⁻¹ V⁻¹) = 1 − 2E = −7/25');
    /* complex phases commute: e^{ia} e^{ib} = e^{ib} e^{ia} for the drawn angles */
    const ca = [Math.cos(CL_A), Math.sin(CL_A)], cb = [Math.cos(CL_B), Math.sin(CL_B)];
    const m = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
    check(near(m(ca, cb)[0], m(cb, ca)[0]) && near(m(ca, cb)[1], m(cb, ca)[1]), 'complex phases commute');
  }

  /* 2. BODY: Gram determinant = E; volume π²/2; boundary = commuting pairs; the integer examples */
  {
    const G = [[1, QX, QY], [QX, 1, QZ], [QY, QZ, 1]];
    const det = G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
    check(near(det, QE), 'det Gram(1, U, V) = E');
    /* volume: ∫∫ 2√((1−x²)(1−y²)) dx dy by the midpoint rule */
    const M = 2000; let s = 0;
    for (let i = 0; i < M; i++) s += Math.sqrt(1 - Math.pow(-1 + (i + 0.5) * 2 / M, 2)) * 2 / M;
    check(Math.abs(2 * s * s - Math.PI * Math.PI / 2) < 1e-4, `body volume ${2 * s * s} = π²/2`);
    /* boundary points (cos a, cos b, cos(a − b)) are commuting pairs: E = 0 */
    for (let k = 0; k < 40; k++) { const a = rnd(k, 1) * TAU, b = rnd(k, 2) * TAU, x = Math.cos(a), y = Math.cos(b), z = Math.cos(a - b); check(near(1 + 2 * x * y * z - x * x - y * y - z * z, 0, 1e-12), `boundary point ${k}`); }
    check(Math.abs(QZ - QX * QY) <= Math.sqrt((1 - QX * QX) * (1 - QY * QY)), 'the sample lies in the body');
    /* detGram3 for a = 1, b = 1 + 2i, c = 1 + 2j, in exact rationals: 1 + 2B − (κab + κbc + κca) */
    const a = [1, 0, 0, 0], b = HW_GEN[0], c = HW_GEN[2];
    const k = (p, q) => fr(qDot(p, q) ** 2, qN2(p) * qN2(q));
    const B = fr(qDot(a, b) * qDot(b, c) * qDot(c, a), qN2(a) * qN2(b) * qN2(c));
    const kab = k(a, b), kbc = k(b, c), kca = k(c, a);
    check(frEq(kab, 1, 5) && frEq(kbc, 1, 25) && frEq(kca, 1, 5) && frEq(B, 1, 25), 'κ = 1/5, 1/25, 1/5; B = 1/25');
    const dG = frAdd(frAdd(fr(1, 1), frMul(fr(2, 1), B)), fr(-(kab[0] * 25 / kab[1] + kbc[0] * 25 / kbc[1] + kca[0] * 25 / kca[1]), 25));
    check(frEq(dG, 16, 25), 'det G₃(1, 1 + 2i, 1 + 2j) = 16/25');
    /* Lie triple: {u, v, w} = ⟨u, w⟩ v − ⟨v, w⟩ u */
    const d3 = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
    const lt = (u, v, w) => v.map((x, i) => d3(u, w) * x - d3(v, w) * u[i]);
    const u = [2, 0, 0], v = [0, 2, 0], L = lt(u, v, u);
    check(L[0] === 0 && L[1] === 8 && L[2] === 0 && d3(L, v) === 16 && d3(u, u) * d3(v, v) - d3(u, v) ** 2 === 16, '⟨{u, v, u}, v⟩ = 16 = gramAreaSq');
    for (let t = 0; t < 30; t++) { const p = [0, 1, 2].map(i => Math.floor(rnd(t, i) * 11) - 5), q = [0, 1, 2].map(i => Math.floor(rnd(t, i + 7) * 11) - 5); check(d3(lt(p, q, p), q) === d3(p, p) * d3(q, q) - d3(p, q) ** 2, `Lie triple identity ${t}`); }
  }

  /* 3. WORDS: the products, 186 reduced words, distinct frames, the mod-5 obstruction */
  {
    const ab = qMul(HW_GEN[0], HW_GEN[2]), ba = qMul(HW_GEN[2], HW_GEN[0]);
    check(ab.join() === '1,2,2,4' && ba.join() === '1,2,2,-4' && qN2(ab) === 25, '(1+2i)(1+2j) = (1,2,2,4), reversed (1,2,2,−4)');
    HW_GEN.forEach((g, i) => check(qN2(g) === 5, `generator ${i} has norm 5`));
    check(HW_WORDS.length === 186 && HW_WORDS.length === 6 + 30 + 150, '186 reduced words of length 1–3');
    const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
    const key = w => {
      const p = hwEval(w), n2 = qN2(p);
      return [[1, 0, 0], [0, 1, 0]].map(e => { const num = hwAdNum(p, e); const g = num.reduce((s, c) => gcd(s, c), n2); return num.map(c => c / g).join(',') + '/' + n2 / g; }).join(';');
    };
    const keys = new Set(HW_WORDS.map(key));
    check(keys.size === 186, `186 distinct frames, got ${keys.size}`);
    check(!keys.has(key([])), 'no word of length ≥ 1 fixes both axes');
    let ok5 = true;
    for (const w of hwWords(5)) { const p = hwEval(w); if (p.every(c => c % 5 === 0)) ok5 = false; }
    check(ok5, 'no reduced word up to length 5 has all four coordinates divisible by 5');
    HW_PTS.forEach((pt, i) => check(near(pt.v[0] ** 2 + pt.v[1] ** 2 + pt.v[2] ** 2, 1, 1e-12), `Ad(w) axisX is a unit vector (${i})`));
  }

  /* 4. HAAR: 128 zeros, the kept indices, an independent Riemann–Siegel look at each ordinate */
  {
    check(ZE.length === 128, `data/zeros.json holds ${ZE.length} ordinates, expected 128`);
    check(HZ_KEPT.length === 16, `16 kept zeros, got ${HZ_KEPT.length}`);
    check(HZ_KEPT.slice(0, 6).join() === '8,15,28,31,38,50', `first six kept: ${HZ_KEPT.slice(0, 6).join()}`);
    check(Math.abs(TH(12) - Math.acos(287 / 289)) < 1e-15, 'cos θ₁₂ = 287/289');
    const roots = ZE.map((g, i) => {
      let lo = g - 0.02, hi = g + 0.02, flo = rsZ(lo);
      if (flo * rsZ(hi) > 0) { fail(`no sign change of Z near zero ${i + 1}`); return g; }
      for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2, fm = rsZ(m); if (fm * flo > 0) { lo = m; flo = fm; } else hi = m; }
      const r = (lo + hi) / 2;
      check(Math.abs(r - g) < 3e-3, `zero ${i + 1}: Riemann–Siegel root ${r} vs ${g}`);
      check(Math.abs(rsTheta(g) / Math.PI + 1 - (i + 1)) < 1, `zero ${i + 1} sits at its place in the count`);
      return r;
    });
    for (let i = 1; i < ZE.length; i++) check(ZE[i] > ZE[i - 1], 'ordinates increase');
    const kept2 = roots.map((g, i) => (hzSel(g).keep ? i + 1 : 0)).filter(Boolean);
    check(kept2.join() === HZ_KEPT.join(), 'the selection is the same from the Riemann–Siegel roots');
    check(near(1 / TAU, 0.159154943091895, 1e-15), '1/(2π) = 0.159154943091895…');
    const z8 = HZ[7];
    check(Math.abs(z8.u - 0.3446) < 5e-4 && Math.abs(z8.s - 0.6355) < 5e-4, 'zero 8: u = 0.345, bar = 0.636');
  }

  /* 5. SCHUR: 4 + 2 + 16 = 22; the character averages 1/(n + 1); the mean defect 3/8 */
  {
    check(SC_TILES.length === 22 && SC_TILES.filter(t => t.g === 0).length === 4 && SC_TILES.filter(t => t.g === 1).length === 2 && SC_TILES.filter(t => t.g >= 2).length === 16, '22 = 4 + 2 + 16');
    check(new Set(SC_TILES.map(t => t.d)).size === 22, 'the 22 chords are distinct');
    SC_AVG.forEach((v, n) => check(frEq(v, 1, n + 1), `∫ χ_${n}([U, V]) = 1/${n + 1}, got ${v[0]}/${v[1]}`));
    check(frEq(SC_MEAN_E, 3, 8), 'mean E = 3/8');
    check(frEq(momE(2), 5, 24), 'E[E²] = 5/24');
    /* a second route for n = 1: χ₁ = 2c, c = 1 − 2E, average 2(1 − 2·3/8) = 1/2; and a Monte Carlo look at E[E] */
    check(near(2 * (1 - 2 * 3 / 8), 0.5), 'χ₁ average 1/2');
    let s = 0; const M = 60;
    for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) for (let k = 0; k < M; k++) {
      const a = (i + 0.5) / M * Math.PI, b = (j + 0.5) / M * Math.PI, c = -1 + (k + 0.5) * 2 / M;
      /* Haar on Sp(1): the angle a has density (2/π) sin² a on [0, π] */
      s += (2 / Math.PI) * Math.sin(a) ** 2 * (2 / Math.PI) * Math.sin(b) ** 2 * 0.5 * Math.sin(a) ** 2 * Math.sin(b) ** 2 * (1 - c * c);
    }
    s *= (Math.PI / M) * (Math.PI / M) * (2 / M);
    check(Math.abs(s - 3 / 8) < 1e-3, `mean defect by quadrature ${s}`);
  }

});
Object.assign(FILM.speed, { clocks: 0.02, body: 0.014, words: 0.016, hear: 0.016, haar: 0.018, schur: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const qcFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function qcRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const QC_MISSING = new Set();
function qcLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = QC_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!QC_MISSING.has(gid)) { QC_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function qcPoly(pts, col, a, fill = 0.2, lw = 2) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
function qcArc(cx, cy, r, a0, a1, col, a, lw = 3) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
/* orthographic view: turn by yaw about the vertical axis k, tilt by pitch; returns [sx, sy, depth] */
function qcP(v, cx, cy, s, yaw, pitch) {
  const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw), z1 = v[2];
  return [cx + s * x1, cy - s * (z1 * Math.cos(pitch) - y1 * Math.sin(pitch)), y1 * Math.cos(pitch) + z1 * Math.sin(pitch)];
}
function qcTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TWO QUATERNION CLOCKS', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('DEFECT · GRAM BODY · FREE WORDS · SPECTRA · HAAR ZEROS', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                          scene 1 · TWO CLOCKS                             */
/* ======================================================================= */
const CL_A = 0.95, CL_B = 0.75, CL_O = [540, 540];
SCENES.clocks = S => {
  const u = S.u;
  qcTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* line 0: two complex phases composed in both orders */
  const ca = a * (1 - at(S, 1, 0.7));
  if (ca > 0.003) {
    const R = 250, [ox, oy] = CL_O;
    ring(ox, oy, R, C.dim, ca * 0.5, 1.5);
    line(ox - R - 30, oy, ox + R + 30, oy, C.dim, ca * 0.5, 1.2); line(ox, oy + R + 30, ox, oy - R - 30, C.dim, ca * 0.5, 1.2);
    const pa = Q(S, 0, 'always commute', 1.6);
    const t1 = clamp(pa * 2), t2 = clamp(pa * 2 - 1);
    /* path A then B on the outer track, B then A on the inner track */
    qcArc(ox, oy, R + 18, 0, CL_A * t1, C.cyan, ca, 6);
    qcArc(ox, oy, R + 18, CL_A, CL_A + CL_B * t2, C.mag, ca * (t2 > 0 ? 1 : 0), 6);
    qcArc(ox, oy, R - 18, 0, CL_B * t1, C.mag, ca, 6);
    qcArc(ox, oy, R - 18, CL_B, CL_B + CL_A * t2, C.cyan, ca * (t2 > 0 ? 1 : 0), 6);
    const end = CL_A + CL_B;
    if (t2 >= 1) { arrow(ox, oy, ox + R * Math.cos(end), oy - R * Math.sin(end), C.now, ca, 4); dot(ox + R * Math.cos(end), oy - R * Math.sin(end), 14, 'g', ca); }
    txt('A', ox + (R + 50) * Math.cos(CL_A / 2), oy - (R + 50) * Math.sin(CL_A / 2), { size: 30, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: ca });
    txt('B', ox + (R + 50) * Math.cos(CL_A + CL_B / 2), oy - (R + 50) * Math.sin(CL_A + CL_B / 2), { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: ca * t2 });
    panel(1000, 380, 780, 260, ca, C.cyan, 'U(1) · 复数相位');
    qcRich([['e', C.white], ['ⁱᵃ', C.cyan], [' · e', C.white], ['ⁱᵇ', C.mag], ['  =  e', C.white], ['ⁱᵇ', C.mag], [' · e', C.white], ['ⁱᵃ', C.cyan]], 1390, 500, { size: 46, align: 'center', a: ca });
    txt('order never matters · 次序无关', 1390, 590, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.now, a: ca * t2 });
  }
  /* lines 1–4: the two quaternion axes in 3D, the area they span, the ledger */
  const qa = a * at(S, 1, 0.7);
  if (qa <= 0.003) return;
  const yaw = -0.62 + 0.012 * u, pitch = 0.5, sc = 330, [ox, oy] = [CL_O[0], CL_O[1] + 40];
  const P = v => qcP(v, ox, oy, sc, yaw, pitch);
  /* a label just beyond the tip of a drawn segment, on the far side from the origin */
  const tag = (o, p, s, col, al, size = 26, off = 34) => {
    const dx = p[0] - o[0], dy = p[1] - o[1], n = Math.hypot(dx, dy) || 1;
    txt(s, p[0] + dx / n * off, p[1] + dy / n * off + size * 0.35, { size, fam: F.math, w: 700, align: dx > 0 ? 'left' : 'right', c: col, a: al });
  };
  const po = P([0, 0, 0]);
  [[[1, 0, 0], 'i'], [[0, 1, 0], 'j'], [[0, 0, 1], 'k']].forEach(([e, n]) => {
    const p0 = P(e.map(c => -c * 0.9)), p1 = P(e.map(c => c * 1.2));
    line(p0[0], p0[1], p1[0], p1[1], C.dim, qa * 0.6, 1.5);
    tag(po, p1, n, C.dim, qa, 26, 16);
  });
  const uv = QU.slice(1), vv = QV.slice(1);
  const pu = P(uv), pv = P(vv), puv = P(uv.map((c, i) => c + vv[i]));
  /* line 3: the parallelogram u ∧ v and the normal u × v */
  const ea = qa * Q(S, 3, 'squared area', 0.8);
  qcPoly([po, pu, puv, pv], C.white, ea, 0.16, 1.5);
  if (ea > 0.003) {
    const cr = P([0, 0, 0.8]);
    arrow(po[0], po[1], cr[0], cr[1], C.now, ea, 4);
    txt('u × v', cr[0] + 16, cr[1] + 30, { size: 28, fam: F.math, w: 700, c: C.now, a: ea });
    const mid = [(po[0] + puv[0]) / 2, (po[1] + puv[1]) / 2];
    txt('E = |u × v|²', mid[0], mid[1] + 10, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: ea });
  }
  arrow(po[0], po[1], pu[0], pu[1], C.cyan, qa, 5);
  arrow(po[0], po[1], pv[0], pv[1], C.mag, qa, 5);
  tag(po, pu, 'u', C.cyan, qa, 30, 22);
  tag(po, pv, 'v', C.mag, qa, 30, 22);
  if (qa > 0.003) {
    txt('u = axis of U · U 的虚轴', 140, 790, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: qa });
    txt('v = axis of V · V 的虚轴', 140, 825, { size: 22, fam: F.zh, w: 700, c: C.mag, a: qa });
  }
  /* the ledger */
  panel(1000, 200, 800, 630, qa, C.cyan, 'TWO CLOCKS · 两只时钟');
  const r1 = qa * Q(S, 1, 'Our sample', 0.6), r2 = qa * Q(S, 2, 'half-traces', 0.6), r3 = qa * Q(S, 2, 'x and y are', 0.6), r3b = qa * at(S, 3, 0.6), r4 = qa * Q(S, 3, 'and U V minus', 0.6);
  qcRich([['U = (1 + 2i)/√5', C.cyan], ['    ', C.white], ['V = (1 + 2j)/√5', C.mag]], 1030, 280, { size: 32, a: r1 });
  qcRich([['x = Re U    y = Re V', C.white]], 1030, 350, { size: 30, a: r2 });
  qcRich([['z = Re(U V⁻¹) = xy + u·v', C.white]], 1030, 400, { size: 30, a: r2 });
  qcRich([['x = y = 1/√5 ≈ 0.4472    z = 1/5', C.white]], 1030, 475, { size: 30, a: r3 });
  qcRich([['E = 1 + 2xyz − x² − y² − z²', C.white]], 1030, 530, { size: 30, a: r3b });
  qcRich([['  = ', C.white], ['16/25', C.now]], 1030, 585, { size: 36, a: r3b });
  qcRich([['|u × v|² = 16/25 = E', C.white]], 1030, 665, { size: 30, a: ea });
  qcRich([['|UV − VU|² = 4E = ', C.white], ['64/25', C.now]], 1030, 720, { size: 30, a: r4 });
  qcRich([['Re(U V U⁻¹ V⁻¹) = 1 − 2E = −7/25', C.white]], 1030, 775, { size: 28, a: r4 });
  if (r4 > 0.003) txt('UV ≠ VU · 次序要紧', 1770, 812, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a: r4 });
};

/* ======================================================================= */
/*                          scene 2 · THE GRAM BODY                          */
/* ======================================================================= */
/* the admissible body: slices x = cos a are the ellipses (cos a, cos b, cos(a − b)), b ∈ [0, 2π] */
function qcBody(cx, cy, sc, yaw, pitch, a, o = {}) {
  if (a <= 0.003) return;
  const P = v => qcP(v, cx, cy, sc, yaw, pitch);
  /* the cube [−1, 1]³ */
  const V = [-1, 1];
  for (const i of [0, 1, 2]) for (const s of V) for (const t of V) {
    const p = [0, 0, 0], q = [0, 0, 0]; const j = (i + 1) % 3, k = (i + 2) % 3;
    p[i] = -1; q[i] = 1; p[j] = q[j] = s; p[k] = q[k] = t;
    const A = P(p), B = P(q); dashed(A[0], A[1], B[0], B[1], C.dim, a * 0.35, 1.2);
  }
  const N = 13;
  for (const fam of [0, 1]) for (let k = 1; k < N; k++) {
    const al = Math.PI * k / N, pts = [];
    for (let i = 0; i <= 72; i++) {
      const b = TAU * i / 72;
      pts.push(fam ? P([Math.cos(b), Math.cos(al), Math.cos(b - al)]) : P([Math.cos(al), Math.cos(b), Math.cos(al - b)]));
    }
    ctx.save(); ctx.globalAlpha = a * (fam ? 0.35 : 0.8); ctx.strokeStyle = C.cyan; ctx.lineWidth = fam ? 1.2 : 2;
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  }
  if (o.point) {
    const p = P([QX, QY, QZ]);
    dot(p[0], p[1], 16, 'g', a); ring(p[0], p[1], 24, C.now, a, 2);
    if (o.label) {
      const lw = tw('(x, y, z) = (0.447, 0.447, 0.2)', 24, F.math, 700);
      fillBox(p[0] + 26, p[1] - 40, lw + 16, 36, C.bg, a * 0.8);
      txt('(x, y, z) = (0.447, 0.447, 0.2)', p[0] + 34, p[1] - 14, { size: 24, fam: F.math, w: 700, c: C.now, a });
    }
  }
  if (o.axes) [[[1.25, 0, 0], 'x'], [[0, 1.25, 0], 'y'], [[0, 0, 1.25], 'z']].forEach(([e, n]) => {
    const p0 = P([0, 0, 0]), p1 = P(e); arrow(p0[0], p0[1], p1[0], p1[1], C.white, a * 0.6, 1.6);
    txt(n, p1[0] + 8, p1[1] - 6, { size: 26, fam: F.math, w: 700, c: C.white, a: a * 0.8 });
  });
}
SCENES.body = S => {
  const a = qcFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, 'curvature identity', 'lean']]);
  const ba = a * Q(S, 1, 'convex body', 0.8);
  qcBody(500, 495, 205, 0.5 + 0.03 * u, 0.38, ba, { point: true, label: ba > 0.5, axes: true });
  if (ba > 0.003) {
    txt('vol = π²/2', 140, 215, { size: 36, fam: F.math, w: 700, c: C.white, a: ba });
    const sa = a * Q(S, 1, 'whose skin', 0.7);
    txt('skin: E = 0 · clocks commute', 160, 790, { size: 28, fam: F.disp, w: 700, c: C.cyan, a: sa });
    txt('表皮：E = 0，两钟交换', 160, 828, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: sa });
  }
  /* the Gram matrix of the anchors 1, U, V */
  const ga = a * Q(S, 0, 'Gram determinant', 0.7);
  panel(960, 190, 840, 200, ga, C.cyan, 'GRAM(1, U, V) · 格拉姆矩阵');
  if (ga > 0.003) {
    const mx = 1000, my = 262, cw = 70, rows = [['1', 'x', 'y'], ['x', '1', 'z'], ['y', 'z', '1']];
    line(mx, my - 30, mx, my + 2 * 42 + 14, C.white, ga, 2); line(mx + 3 * cw + 10, my - 30, mx + 3 * cw + 10, my + 2 * 42 + 14, C.white, ga, 2);
    rows.forEach((r, i) => r.forEach((s, j) => txt(s, mx + 40 + j * cw, my + i * 42 + 8, { size: 32, fam: F.math, w: 700, align: 'center', c: s === '1' ? C.dim : C.white, a: ga })));
    qcRich([['det = 1 + 2xyz − x² − y² − z²', C.white]], 1270, 270, { size: 28, a: ga });
    qcRich([['     = E = ', C.white], ['16/25', C.now]], 1270, 330, { size: 30, a: ga });
  }
  /* Lean 1: the integer Gram determinant */
  const l1 = a * Q(S, 2, 'Lean checks', 0.6);
  panel(960, 410, 840, 200, l1, C.lean);
  if (l1 > 0.003) {
    qcRich([['a, b, c : Quad4, all ≠ 0  ⇒  0 ≤ detGram3 a b c', C.white]], 985, 458, { size: 25, a: l1 });
    qcLean(985, 506, 'detGram3_nonneg', l1, { size: 19 });
    qcRich([['a = 1, b = 1 + 2i, c = 1 + 2j:  κ = 1/5, 1/25, 1/5;  B = 1/25', C.white]], 985, 552, { size: 21, a: l1 * Q(S, 2, 'never negative', 0.6) });
    qcRich([['det G₃ = 1 + 2/25 − 11/25 = ', C.white], ['16/25', C.now], ['   (computed)', C.dim]], 985, 590, { size: 22, a: l1 * Q(S, 2, 'never negative', 0.6) });
  }
  /* Lean 2: the curvature identity */
  const l2 = a * Q(S, 3, 'curvature identity', 0.6);
  panel(960, 630, 840, 200, l2, C.lean);
  if (l2 > 0.003) {
    qcRich([['⟨{u, v, u}, v⟩ = gramAreaSq(u, v)    u, v : Vec3', C.white]], 985, 678, { size: 25, a: l2 });
    qcLean(985, 726, 'lieTriple_unit_sectional_curvature', l2, { size: 19 });
    qcRich([['u = (2, 0, 0), v = (0, 2, 0):  {u, v, u} = 4v,  ⟨4v, v⟩ = 16 = 4·4 − 0²', C.white]], 985, 772, { size: 21, a: l2 * Q(S, 3, 'Gram area squared', 0.6) });
    qcRich([['{u, v, w} := ⟨u, w⟩v − ⟨v, w⟩u      (computed example)', C.dim]], 985, 810, { size: 20, a: l2 * Q(S, 3, 'Gram area squared', 0.6) });
  }
};

/* ======================================================================= */
/*                          scene 3 · FREE WORDS                             */
/* ======================================================================= */
const WD_O = [1390, 520], WD_R = 280;
SCENES.words = S => {
  const a = qcFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* the six generators */
  const g0 = a * Q(S, 0, 'six Hurwitz', 0.8);
  HW_NAME.forEach((n, i) => {
    const x = 220 + (i % 3) * 230, y = 230 + Math.floor(i / 3) * 74;
    chip(x, y, 200, 56, n, i < 2 ? C.cyan : i < 4 ? C.mag : C.white, g0 * clamp(Q(S, 0, 'six Hurwitz', 0.4, 0.12 * i)), 28, F.math);
  });
  if (g0 > 0.003) txt('norm 5 · 模方 5', 220 - 100, 360, { size: 22, fam: F.zh, w: 700, c: C.dim, a: g0 });
  /* line 1: two orders */
  const p1 = a * at(S, 1, 0.6), p2 = a * Q(S, 1, 'reversed', 0.6);
  panel(120, 390, 780, 200, p1, C.cyan, 'ORDER · 次序');
  qcRich([['(1 + 2i)(1 + 2j) = ', C.white], ['(1, 2, 2, 4)', C.cyan]], 145, 470, { size: 30, a: p1 });
  qcRich([['(1 + 2j)(1 + 2i) = ', C.white], ['(1, 2, 2, ', C.mag], ['−4', C.now], [')', C.mag]], 145, 525, { size: 30, a: p2 });
  if (p2 > 0.003) txt('both of norm 25 = 5² · 两者模方都是 25', 145, 570, { size: 21, fam: F.zh, w: 700, c: C.dim, a: p2 });
  /* line 2: the frames of all reduced words up to length 3 */
  const fa = a * at(S, 2, 0.6);
  const yaw = 0.3 + 0.12 * u, pitch = 0.35;
  ring(WD_O[0], WD_O[1], WD_R, C.dim, a * 0.6, 1.5);
  {
    const e = qcP([1, 0, 0], WD_O[0], WD_O[1], WD_R, yaw, pitch);
    txt('Ad(w) · axisX', WD_O[0], WD_O[1] - WD_R - 22, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a });
    dot(e[0], e[1], 10, 'w', a * (e[2] < 0 ? 1 : 0.4));
  }
  const reveal = n => (n === 1 ? Q(S, 0, 'six Hurwitz', 0.8) : n === 2 ? at(S, 2, 0.6) : Q(S, 2, '186 words', 0.6));
  HW_PTS.forEach((pt, i) => {
    const ra = a * reveal(pt.len);
    if (ra <= 0.003) return;
    const p = qcP(pt.v, WD_O[0], WD_O[1], WD_R, yaw, pitch), front = p[2] < 0;
    dot(p[0], p[1], pt.len === 1 ? 11 : pt.len === 2 ? 8 : 6, pt.len === 1 ? 'c' : pt.len === 2 ? 'm' : 'w', ra * (front ? 1 : 0.35));
  });
  /* the current word: amber */
  if (fa > 0.003) {
    const k = Math.floor(u * 1.5) % HW_PTS.length, pt = HW_PTS[(k * 37) % HW_PTS.length];
    const p = qcP(pt.v, WD_O[0], WD_O[1], WD_R, yaw, pitch);
    ring(p[0], p[1], 16, C.now, fa, 3);
    txt(pt.w.map(g => '(' + HW_NAME[g] + ')').join(''), WD_O[0], WD_O[1] + WD_R + 44, { size: 24, fam: F.math, w: 700, align: 'center', c: C.now, a: fa });
    qcRich([['length ', C.dim], ['1', C.cyan], [' · ', C.dim], ['2', C.mag], [' · ', C.dim], ['3', C.white]], WD_O[0] + WD_R - 20, WD_O[1] - WD_R + 6, { size: 20, fam: F.mono, a: fa });
  }
  const ca = a * Q(S, 2, 'different frames', 0.6);
  if (ca > 0.003) {
    qcRich([['186 words → ', C.white], ['186', C.now], [' distinct frames', C.white]], 145, 650, { size: 32, a: ca });
    txt('(Ad(w) axisX, Ad(w) axisY), exact rationals · 精确有理数', 145, 690, { size: 21, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  panel(120, 720, 780, 115, la, C.lean);
  if (la > 0.003) {
    qcRich([['u, v reduced, same X and Y images  ⇒  u = v', C.white]], 145, 765, { size: 25, a: la });
    qcLean(145, 812, 'reduced_words_adjoint_injective', la, { size: 19 });
  }
  stamp('NO HIDDEN RELATION', WD_O[0], WD_O[1], Q(S, 3, 'letter for letter', 0.5), C.lean, 30, -0.05);
};

/* ======================================================================= */
/*                        scene 4 · HEARING THE CLOCKS                       */
/* ======================================================================= */
/* a small closed walk: a triangle loop with the clock edges coloured */
function hrLoop(x, y, a, edges) {
  if (a <= 0.003) return;
  const pts = [[x, y - 70], [x + 80, y + 55], [x - 80, y + 55]];
  for (let i = 0; i < 3; i++) {
    const p = pts[i], q = pts[(i + 1) % 3], e = edges[i];
    if (!e) { line(p[0], p[1], q[0], q[1], C.dim, a * 0.8, 2); continue; }
    arrow(p[0], p[1], q[0] * 0.92 + p[0] * 0.08, q[1] * 0.92 + p[1] * 0.08, e[1], a, 5);
    const off = [[36, -4], [0, 42], [-36, -4]][i];
    txt(e[0], (p[0] + q[0]) / 2 + off[0], (p[1] + q[1]) / 2 + off[1], { size: 26, fam: F.math, w: 700, align: 'center', c: e[1], a });
  }
  pts.forEach(p => dot(p[0], p[1], 9, 'w', a));
}
SCENES.hear = S => {
  const a = qcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'certificate', 'computed'], [3, 'Two readings never could', 'argued']]);
  /* line 0: the edge rule */
  const e0 = a * at(S, 0, 0.6);
  qcRich([['every ', C.white], ['724', C.cyan], [' edge × ', C.white], ['U', C.cyan], ['      every ', C.white], ['804', C.mag], [' edge × ', C.white], ['V', C.mag], ['      two components per site', C.dim]], W / 2, 215, { size: 28, align: 'center', a: e0 });
  /* line 0: a schematic shell with its clock edges, and a column of levels (pictures, not data) */
  const sa = a * at(S, 0, 0.6) * (1 - Q(S, 1, 'closed walks', 0.6));
  if (sa > 0.003) {
    const cx = 700, cy = 540, R = 230, N = 19;
    const pt = k => [cx + R * Math.cos(TAU * k / N - Math.PI / 2), cy + R * Math.sin(TAU * k / N - Math.PI / 2)];
    for (let k = 0; k < N; k++) { const p = pt(k), q = pt((k + 1) % N); line(p[0], p[1], q[0], q[1], C.dim, sa * 0.5, 1.5); }
    [[0, 7], [5, 12], [10, 17], [15, 3]].forEach(([i, j]) => { const p = pt(i), q = pt(j); line(p[0], p[1], q[0], q[1], C.cyan, sa, 3); });
    [[2, 10], [7, 14], [12, 1], [17, 6]].forEach(([i, j]) => { const p = pt(i), q = pt(j); line(p[0], p[1], q[0], q[1], C.mag, sa, 3); });
    for (let k = 0; k < N; k++) { const p = pt(k); dot(p[0], p[1], 8, 'w', sa); }
    txt('U', cx - R - 60, cy - 10, { size: 34, fam: F.math, w: 700, c: C.cyan, a: sa });
    txt('V', cx + R + 36, cy - 10, { size: 34, fam: F.math, w: 700, c: C.mag, a: sa });
    txt('axes hidden · 轴藏起来 · schematic shell 示意', cx, cy + R + 62, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: sa });
    const lx = 1200, la0 = sa * at(S, 0, 0.8, 2.0);
    for (let k = 0; k < 14; k++) { const y = 760 - 470 * Math.pow(k / 13, 0.8); line(lx, y, lx + 300, y, C.white, la0 * 0.85, 2.5); }
    txt('levels only · 只留能级', lx + 150, 270, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: la0 });
    txt('schematic · 示意', lx + 150, 800, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la0 });
  }
  /* line 1: three winding classes in length order */
  const cards = [
    { k: 'i', edges: [['U', C.cyan], null, null], read: 'x', note: 'one 724 edge' },
    { k: 'ii', edges: [['U', C.cyan], ['V⁻¹', C.mag], null], read: 'z', note: '724 + reversed 804' },
    { k: 'iii', edges: [null, null, ['V', C.mag]], read: 'y', note: 'one 804 edge' }
  ];
  cards.forEach((c, i) => {
    const ca = a * Q(S, 1, 'closed walks', 0.5, 0.5 * i);
    const x = 140 + i * 560, y = 250;
    panel(x, y, 520, 250, ca, C.argued, `WALK (${c.k}) · 闭走`);
    hrLoop(x + 140, y + 140, ca, c.edges);
    txt('reads →', x + 268, y + 150, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ca });
    chip(x + 430, y + 140, 120, 80, c.read, C.now, ca * Q(S, 1, 'recovers all three', 0.5), 50, F.math);
    txt(c.note, x + 268, y + 226, { size: 20, fam: F.mono, w: 700, c: C.white, a: ca * 0.85 });
    if (i < 2) arrow(x + 522, y + 125, x + 556, y + 125, C.dim, ca, 2);
  });
  if (a * Q(S, 1, 'closed walks', 0.5) > 0.003) txt('shorter → longer · 由短到长 · schematic loops 示意', W / 2, 532, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * Q(S, 1, 'closed walks', 0.5) });
  /* line 2: the doubled spectrum */
  const da = a * at(S, 2, 0.6);
  panel(140, 560, 760, 270, da, C.argued, 'HEAR IT · 听出来');
  if (da > 0.003) {
    qcRich([['spec⁽²⁾ = 2 × spec(scalar)', C.white]], 170, 640, { size: 32, a: da });
    qcRich([['⇔  E = 0', C.now]], 170, 700, { size: 40, a: da * Q(S, 2, 'exactly when E is zero', 0.5) });
    txt('E > 0 is audible in the levels · E > 0 能从能级里听出', 170, 760, { size: 22, fam: F.zh, w: 700, c: C.white, a: da * Q(S, 2, 'hear', 0.5) });
    txt('written argument, chapter 2.2 · 书面论证', 170, 800, { size: 20, fam: F.zh, w: 700, c: C.argued, a: da });
  }
  /* line 3: the three-probe certificate */
  const pa = a * at(S, 3, 0.6);
  panel(940, 560, 840, 270, pa, C.cyan, 'THREE PROBES · 三个读数');
  if (pa > 0.003) {
    qcRich([['shifts u = (−1000, −204000, −215000)', C.white]], 965, 630, { size: 25, a: pa });
    const ka = a * Q(S, 3, 'certificate', 0.5);
    const bx = 965, by = 690, bw = 520;
    line(bx, by, bx + bw, by, C.dim, ka, 2);
    fillBox(bx, by - 10, bw * 0.331, 20, C.cyan, ka * 0.7);
    line(bx + bw, by - 22, bx + bw, by + 22, C.white, ka, 2.5);
    txt('1', bx + bw + 12, by + 9, { size: 24, fam: F.mono, w: 700, c: C.white, a: ka });
    txt('Lip∞ ≤ 0.331', bx + bw * 0.331 + 14, by - 18, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ka });
    txt('interval certificate · amplification ≤ 5.196 × 10¹⁰', 965, 740, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: ka });
    txt('three readings: injective on the whole body · 全局单射', 965, 774, { size: 21, fam: F.zh, w: 700, c: C.white, a: ka });
    txt('two readings: impossible (invariance of domain) · 两个不够', 965, 808, { size: 21, fam: F.zh, w: 700, c: C.argued, a: a * Q(S, 3, 'Two readings never could', 0.5) });
  }
};

/* ======================================================================= */
/*                          scene 5 · ZEROS AS DICE                          */
/* ======================================================================= */
const HZ_X0 = 175, HZ_X1 = 1745, HZ_Y0 = 770, HZ_H = 330;
const hzX = i => HZ_X0 + (i + 0.5) * (HZ_X1 - HZ_X0) / 128;
SCENES.haar = S => {
  const a = qcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Assuming classical R H', 'argued']]);
  /* the rule */
  const ra = a * at(S, 1, 0.6);
  panel(120, 185, 1680, 165, a, C.cyan, 'HAAR ZERO SELECTION · 哈尔零点挑选');
  qcRich([['keep γ  if  ', C.white], ['u', C.now], ['  <  sin²p · sin²q · |sin v|', C.cyan]], W / 2, 262, { size: 38, align: 'center', a: a * Q(S, 2, 'Keep the zero', 0.6) });
  qcRich([['p = (θ₇₂₄ − θ₂₄₄)γ     q = (θ₈₀₄ − θ₂₄₄)γ     v = θ₁₂γ     u = {θ₂₀₀γ / 2π}', C.white]], W / 2, 320, { size: 24, align: 'center', a: ra });
  if (a * (1 - Q(S, 2, 'Keep the zero', 0.6)) > 0.003) txt('Riemann zeros as dice? · 黎曼零点当骰子？', W / 2, 270, { size: 36, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * (1 - Q(S, 2, 'Keep the zero', 0.6)) });
  /* the chart */
  const ca = a * at(S, 1, 0.6);
  if (ca <= 0.003) return;
  line(HZ_X0 - 10, HZ_Y0, HZ_X1 + 10, HZ_Y0, C.dim, ca, 1.5);
  line(HZ_X0 - 10, HZ_Y0 - HZ_H, HZ_X1 + 10, HZ_Y0 - HZ_H, C.dim, ca * 0.3, 1);
  txt('1', HZ_X0 - 22, HZ_Y0 - HZ_H + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: ca });
  txt('0', HZ_X0 - 22, HZ_Y0 + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: ca });
  qcRich([['▮ bar = sin²p · sin²q · |sin v|     ', C.cyan], ['● u', C.now], ['   (zero #1 … #128)', C.dim]], HZ_X0, HZ_Y0 - HZ_H - 26, { size: 20, fam: F.mono, a: ca });
  [1, 32, 64, 96, 128].forEach(n => txt(`#${n}`, hzX(n - 1), HZ_Y0 + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ca }));
  const sweep = Q(S, 2, 'Keep the zero', 0.1) ? 128 * ease(clamp((S.u - phraseAt(S, 2, 'Keep the zero')) / (lineAt(S, 3).s + 2.2 - phraseAt(S, 2, 'Keep the zero')))) : 0;
  const first = Q(S, 1, 'fourth angle', 0.6);
  let kept = 0;
  HZ.forEach((z, i) => {
    const show = i === 7 ? Math.max(first, clamp(sweep - i)) : clamp(sweep - i);
    if (show <= 0.003) return;
    const x = hzX(i), bh = z.s * HZ_H, ky = HZ_Y0 - z.u * HZ_H, done = sweep >= i + 1;
    const hit = z.keep && (done || i === 7);
    fillBox(x - 4, HZ_Y0 - bh, 8, bh, hit ? C.cyan : C.dim, ca * show * (hit ? 0.75 : 0.35));
    dot(x, ky, hit ? 9 : 5, hit ? 'g' : 'w', ca * show * (hit ? 1 : 0.55));
    if (z.keep && done) kept++;
  });
  /* the first six kept indices */
  HZ_KEPT.slice(0, 6).forEach((n, j) => {
    const z = HZ[n - 1], la = ca * clamp(sweep - n) * (1 - first * (n === 8 ? 0 : 0));
    if (la > 0.003) txt(String(n), hzX(n - 1), HZ_Y0 - z.s * HZ_H - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: la });
  });
  /* zero 8, the worked case */
  const z8 = HZ[7], ea = ca * first * (1 - clamp(sweep - 20));
  if (ea > 0.003) {
    const x = hzX(7);
    panel(x + 40, 400, 470, 150, ea, C.now);
    txt(`γ₈ = ${z8.g.toFixed(5)}`, x + 64, 450, { size: 26, fam: F.math, w: 700, c: C.white, a: ea });
    qcRich([['u = ', C.white], [z8.u.toFixed(3), C.now], ['  <  bar = ', C.white], [z8.s.toFixed(3), C.cyan], ['  ✓', C.now]], x + 64, 500, { size: 26, a: ea });
    txt('kept · 保留', x + 64, 534, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ea });
  }
  /* the count */
  const na = ca * clamp(sweep / 4);
  if (na > 0.003) {
    const done = sweep >= 128 ? ca * Q(S, 3, '16 pass', 0.6) : 0;
    qcRich([['kept ', C.white], [`${kept}`, C.now], [` / ${Math.min(128, Math.ceil(sweep))}`, C.white], [done > 0.5 ? ' = 0.125' : '', C.white]], 1745, 414, { size: 30, align: 'right', a: na, fam: F.mono });
  }
  /* line 4: the limit density */
  const da = ca * Q(S, 4, 'Assuming classical R H', 0.7);
  if (da > 0.003) {
    panel(680, 450, 620, 120, da, C.argued, null, { fill: 'rgba(4,10,24,0.9)' });
    qcRich([['density → ', C.white], ['1/(2π) = 0.159155…', C.now]], 705, 502, { size: 28, a: da });
    txt('under classical RH (external Lean proof) · optimal', 705, 546, { size: 19, fam: F.mono, w: 700, c: C.argued, a: da });
  }
};

/* ======================================================================= */
/*                      scene 6 · TWENTY-TWO FREQUENCIES                     */
/* ======================================================================= */
const SC_TILES = [
  ...[['724*', 724], ['804*', 804], ['12', 12], ['200', 200]].map(([s, d]) => ({ s, d, g: 0 })),
  ...[32, 52].map(d => ({ s: String(d), d, g: 1 })),
  ...[56, 68, 72, 152, 172, 216, 224, 244].map(d => ({ s: String(d), d, g: 2 })),
  ...[292, 296, 372, 392, 504, 512, 544, 632].map(d => ({ s: String(d), d, g: 3 }))
];
const SC_COL = [C.cyan, C.white, C.mag, C.mag];
SCENES.schur = S => {
  const a = qcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean'], [2, 'Built on it', 'argued'], [2, 'We recompute', 'computed'], [3, null, 'argued']]);
  const tw0 = 64, gap = 8, x0 = W / 2 - (22 * tw0 + 21 * gap + 3 * 18) / 2;
  let x = x0;
  const xs = [];
  SC_TILES.forEach((t, i) => {
    if (i && SC_TILES[i - 1].g !== t.g) x += 18;
    xs.push(x);
    const ta = a * clamp(at(S, 0, 0.3, 0.05 * i));
    fillBox(x, 200, tw0, 80, SC_COL[t.g], ta * 0.18); box(x, 200, tw0, 80, SC_COL[t.g], ta, 1.5);
    txt(t.s, x + tw0 / 2, 250, { size: t.s.length > 3 ? 17 : 21, fam: F.mono, w: 700, align: 'center', c: C.white, a: ta });
    x += tw0 + gap;
  });
  const grp = [['weak clocks + test', 0, 3, 'four,'], ['U(1)²', 4, 5, 'two, and'], ['SU(3)', 6, 13, 'sixteen'], ['SU(3)', 14, 21, 'sixteen']];
  grp.forEach(([lab, i0, i1, ph], g) => {
    const ga = a * Q(S, 0, ph, 0.6);
    const xa = xs[i0], xb = xs[i1] + tw0;
    line(xa, 296, xb, 296, SC_COL[g], ga, 2.5);
    txt(lab, (xa + xb) / 2, 328, { size: 21, fam: F.mono, w: 700, align: 'center', c: SC_COL[g], a: ga });
  });
  if (a * at(S, 0, 0.6) > 0.003) txt('squared chord d² · 弦长平方 (* = minus 244)', W / 2, 186, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 0, 0.6) });
  /* Schur orthogonality */
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  panel(120, 365, 850, 385, la, C.lean, 'SCHUR ORTHOGONALITY · 舒尔正交');
  if (la > 0.003) {
    txt('G compact, μ finite left-invariant Haar measure', 145, 428, { size: 22, fam: F.mono, w: 700, c: C.white, a: la });
    qcRich([['ρ ≇ σ irreducible:', C.white]], 145, 480, { size: 24, a: la });
    qcRich([['∫ φ(ρ(g)v) ψ(σ(g⁻¹)w) dμ = 0', C.white]], 165, 520, { size: 28, a: la });
    qcLean(165, 562, 'integral_dual_mul_dual_inv_eq_zero', la, { size: 18 });
    qcRich([['ρ irreducible, finite-dimensional complex:', C.white]], 145, 612, { size: 24, a: la });
    qcRich([['∫ φ(ρ(g)v) ψ(ρ(g⁻¹)w) dμ = μ(G)/dim V · φ(w)ψ(v)', C.white]], 165, 652, { size: 25, a: la });
    qcLean(165, 694, 'integral_dual_mul_dual_inv_self', la, { size: 18 });
    txt('continuity hypotheses as in the chapter · 连续性前提见本章定理', 145, 732, { size: 17, fam: F.zh, w: 700, c: C.dim, a: la });
  }
  /* the commutator characters */
  const ca = a * Q(S, 2, 'Built on it', 0.6);
  panel(1010, 365, 790, 385, ca, C.argued, 'COMMUTATOR · 交换子');
  if (ca > 0.003) {
    qcRich([['∫∫ χₙ(U V U⁻¹ V⁻¹) dU dV = 1/(n + 1)', C.white]], 1035, 428, { size: 27, a: ca });
    txt('argued from Schur in the chapter · 由舒尔关系论证', 1035, 462, { size: 18, fam: F.zh, w: 700, c: C.argued, a: ca });
    const ra = a * Q(S, 2, 'We recompute', 0.6);
    txt('n', 1080, 508, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    txt('dim', 1190, 508, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    txt('exact Haar average (computed)', 1500, 508, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    SC_AVG.forEach((v, n) => {
      const rr = a * Q(S, 2, 'We recompute', 0.5, 0.35 * n);
      const y = 548 + n * 40, hi = n === 1;
      txt(String(n), 1080, y, { size: 26, fam: F.mono, w: 700, align: 'center', c: hi ? C.now : C.white, a: rr });
      txt(String(n + 1), 1190, y, { size: 26, fam: F.mono, w: 700, align: 'center', c: hi ? C.now : C.white, a: rr });
      txt(`${v[0]}/${v[1]}`, 1500, y, { size: 28, fam: F.mono, w: 700, align: 'center', c: hi ? C.now : C.cyan, a: rr });
    });
    qcRich([['mean E = ', C.white], [`${SC_MEAN_E[0]}/${SC_MEAN_E[1]}`, C.now], ['  ⇒  2(1 − 2·3/8) = 1/2', C.white]], 1035, 726, { size: 24, a: a * Q(S, 2, 'first four', 0.6, 1.2) });
  }
  /* line 3: the honest boundary */
  const va = a * at(S, 3, 0.6);
  panel(120, 768, 1680, 68, va, C.argued);
  txt('zeros give a sampler, not the dynamics · couplings, string tension and lattice action are inputs (MODEL)', W / 2, 811, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.argued, a: va });
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
  const sc = TL.scenes[1], t = sc.start + 6;
  background(t, sc, 1, 6);
  qcBody(1340, 520, 260, -0.5, 0.38, 0.95, { point: true });
  txt(DATA.film.title_zh, 600, 430, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TWO QUATERNION', 600, 540, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('CLOCKS', 600, 610, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  qcRich([['E = 1 + 2xyz − x² − y² − z²', C.white]], 600, 700, { size: 32, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 600, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
