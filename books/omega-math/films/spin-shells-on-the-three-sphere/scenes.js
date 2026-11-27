/* Film · Spin Shells on the Three-Sphere · 三维球面上的自旋壳 (book omega-math, chapter 10).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     sphere     the flat Fourier kernel on the open line (continuous ξ, π and e: the chapter's diagnosis 10.1, argued);
                a wave closing on a loop of S³ ≅ SU(2) (schematic, argued); the ladder of spin shells j = 0, ½, 1, 3/2, 2
                with dim 2j + 1 and (2j + 1)² functions per shell (Peter–Weyl, literature result rem-ch10-peter-weyl-
                su2-literature, argued; the squares 1, 4, 9, 16, 25 computed) ..... MatrixCoefficientDensity.
                dense_span_unitary_coefficients (LEAN: on a compact group the span of finite unitary matrix entries is
                dense in C(G, ℂ)).
     triad      κ = w² / |p|² (definition, 10.2); χ₀ = 1, χ½² = 4κ, χ₁ = 4κ − 1 (def-ch10-causal-spin-shells); the
                past / present / future labels are the book's model reading (argued); 4κ = 1 + (4κ − 1) and
                2 × 2 = 1 + 3 (computed); p = (1, 1, 1, 1): |p|² = 4, κ = 1/4, χ₁(1/4) = 0 (computed).
     roots      χ_j(q) = U_{2j}(c), c = Re q (Weyl character formula, quoted in 10.2, argued); the recursion of
                def-ch10-even-chebyshev (computed: E₀ … E₃ drawn over κ ∈ [0, 1]) ..... OmegaChebyshevHecke.
                even_chebyshev (LEAN: E(x², n) = U(x, 2n) over Omega.Int) ..... OmegaChebyshevHecke.spin_two_character
                (LEAN: E₂(k) ≡ 16k² − 12k + 1 over Omega.FiniteRatio).
     landmarks  the exact table of ex-ch10-spin-character-table at κ = 1, 3/4, 1/2, 1/3, 1/4, 0 (computed here, and
                compared on load with the chapter's table) ..... OmegaChebyshevHecke.odd_chebyshev (LEAN:
                x · oddFactor(x², n) = U(x, 2n + 1) over Omega.Int); p = (1, 1, 0, 0): κ = 1/2, |χ½| = 2|c| = √2,
                χ½² = 2 (computed).
     fusion     E_m E_n = Σ_{r = |m − n|}^{m + n} E_r; the example E₁E₂ = E₁ + E₂ + E₃ = 64κ³ − 64κ² + 16κ − 1 and
                3 × 5 = 3 + 5 + 7 (computed) ..... OmegaSphericalHaarMidpoint.evenChar_product_sum (LEAN: for all m, n,
                evenCharPoly m · evenCharPoly n is RatioSame to evenCharProductSum m n).
     heap       the origin-free bracket [y, x, w] = y x̄ w and the convolution E_{x,y}[f(x) ḡ(y) h([y, x, w])], whose
                shell-j Fourier block is f̂_j ĝ_j† ĥ_j (written derivation of 10.4.1, argued); the loop is schematic.
     quad       the five real d orbitals as the five-dimensional j = 2 shell (10.4.2; the gold oxidation states are
                the chapter's crystal-field background, argued); the angular quadrupole diagonals in sevenths
                (computed here from exact sphere moments, compared with ex-ch10-d10-d8-quadrupole-ledger) .....
                OmegaChebyshevHecke.orbital_quadrupole (LEAN: closedShell a ≡ 0 for every axis; deletedShell =
                (−4/7, −4/7, +8/7) with zero trace).

   On load, FILM.init checks DATA.lean against the six theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const SS_LEAN = {
  dense_span_unitary_coefficients: ['D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients', 'dense_span_unitary_coefficients'],
  even_chebyshev: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.even_chebyshev', 'even_chebyshev'],
  spin_two_character: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.spin_two_character', 'spin_two_character'],
  odd_chebyshev: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.odd_chebyshev', 'odd_chebyshev'],
  evenChar_product_sum: ['D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.evenChar_product_sum', 'evenChar_product_sum'],
  orbital_quadrupole: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.orbital_quadrupole', 'orbital_quadrupole']
};

/* exact fractions [n, d], d > 0, reduced */
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
const fAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fEq = (a, b) => a[0] * b[1] === b[0] * a[1];
const fStr = (a, plus = false) => {
  const s = a[0] < 0 ? '−' : plus && a[0] > 0 ? '+' : '';
  const n = Math.abs(a[0]);
  return a[1] === 1 ? s + n : `${s}${n}/${a[1]}`;
};
/* integer polynomials, ascending coefficients */
const pTrim = p => { const q = p.slice(); while (q.length > 1 && q[q.length - 1] === 0) q.pop(); return q; };
const pAdd = (p, q) => pTrim(Array.from({ length: Math.max(p.length, q.length) }, (_, i) => (p[i] || 0) + (q[i] || 0)));
const pScale = (p, k) => p.map(c => c * k);
const pMul = (p, q) => { const r = new Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { r[i + j] += a * b; })); return pTrim(r); };
const pEq = (p, q) => { const a = pTrim(p), b = pTrim(q); return a.length === b.length && a.every((c, i) => c === b[i]); };
const pEvalF = (p, x) => p.reduce((s, c, i) => fAdd(s, fMul(fr(c), fr(Math.pow(x[0], i), Math.pow(x[1], i)))), fr(0));
const pEvalN = (p, x) => p.reduce((s, c, i) => s + c * Math.pow(x, i), 0);
/* the even family of def-ch10-even-chebyshev: E₀ = 1, E₁ = 4κ − 1, E_{n+1} = (4κ − 2) E_n − E_{n−1} */
const EV = [[1], [-1, 4]];
for (let n = 1; n < 12; n++) EV.push(pAdd(pMul([-2, 4], EV[n]), pScale(EV[n - 1], -1)));
/* Chebyshev of the second kind in c: U₀ = 1, U₁ = 2c, U_{m+1} = 2c U_m − U_{m−1} */
const UC = [[1], [0, 2]];
for (let m = 1; m < 25; m++) UC.push(pAdd(pMul([0, 2], UC[m]), pScale(UC[m - 1], -1)));
/* the odd factor: U_{2n+1}(c) / c, written in κ = c² */
const ODD = n => UC[2 * n + 1].filter((_, i) => i % 2 === 1);
/* the squared half-spin characters: κ · oddFactor_n(κ)² */
const HALF2 = n => pMul([0, 1], pMul(ODD(n), ODD(n)));
/* the run Σ_{r=|m−n|}^{m+n} E_r */
const RUN = (m, n) => { let s = [0]; for (let r = Math.abs(m - n); r <= m + n; r++) s = pAdd(s, EV[r]); return s; };

/* the landmark table of ex-ch10-spin-character-table (copied verbatim, then recomputed on load) */
const LM_K = [fr(1), fr(3, 4), fr(1, 2), fr(1, 3), fr(1, 4), fr(0)];
const LM_ROWS = [
  { name: 'χ₀ = 1', poly: EV[0], book: ['1', '1', '1', '1', '1', '1'], col: () => C.white },
  { name: 'χ₁ = 4κ − 1', poly: EV[1], book: ['3', '2', '1', '1/3', '0', '−1'], col: () => C.cyan },
  { name: 'χ₂ = 16κ² − 12κ + 1', poly: EV[2], book: ['5', '1', '−1', '−11/9', '−1', '1'], col: () => C.mag },
  { name: 'χ₃ = 64κ³ − 80κ² + 24κ − 1', poly: EV[3], book: ['7', '−1', '−1', '13/27', '1', '−1'], col: () => C.vio },
  { name: 'χ½² = 4κ', poly: HALF2(0), book: ['4', '3', '2', '4/3', '1', '0'], col: () => C.dim },
  { name: 'χ₃/₂² = 16κ(2κ − 1)²', poly: HALF2(1), book: ['16', '3', '0', '16/27', '1', '0'], col: () => C.dim }
];
const LM_VAL = LM_ROWS.map(r => LM_K.map(k => fStr(pEvalF(r.poly, k))));

/* the five real d orbitals: homogeneous quadratics in (x, y, z), on the unit sphere */
const DORB = [
  { name: 'd_z²', form: '3z² − 1', mono: { '0,0,2': 2, '2,0,0': -1, '0,2,0': -1 }, book: [-2, -2, 4] },
  { name: 'd_xz', form: 'xz', mono: { '1,0,1': 1 }, book: [2, -4, 2] },
  { name: 'd_yz', form: 'yz', mono: { '0,1,1': 1 }, book: [-4, 2, 2] },
  { name: 'd_xy', form: 'xy', mono: { '1,1,0': 1 }, book: [2, 2, -4] },
  { name: 'd_x²−y²', form: 'x² − y²', mono: { '2,0,0': 1, '0,2,0': -1 }, book: [2, 2, -4] }
];
/* sphere moments ⟨xᵃ yᵇ zᶜ⟩ = (a−1)!!(b−1)!!(c−1)!! / (a+b+c+1)!!, zero unless all even */
const dfact = n => (n <= 0 ? 1 : n * dfact(n - 2));
const mMoment = (a, b, c) => (a % 2 || b % 2 || c % 2 ? fr(0) : fr(dfact(a - 1) * dfact(b - 1) * dfact(c - 1), dfact(a + b + c + 1)));
const mMul = (p, q) => { const r = {}; for (const [ka, va] of Object.entries(p)) for (const [kb, vb] of Object.entries(q)) { const e = ka.split(',').map((v, i) => +v + +kb.split(',')[i]).join(','); r[e] = (r[e] || 0) + va * vb; } return r; };
const mAvg = p => Object.entries(p).reduce((s, [k, v]) => { const [a, b, c] = k.split(',').map(Number); return fAdd(s, fMul(fr(v), mMoment(a, b, c))); }, fr(0));
/* ⟨3 n_a² − 1⟩ in the orbital f: ⟨f² (3n_a² − |n|²)⟩ / ⟨f²⟩ */
const QAX = ['2,0,0', '0,2,0', '0,0,2'];
function quadDiag(o) {
  const f2 = mMul(o.mono, o.mono), nrm = mAvg(f2);
  return QAX.map(ax => { const q = { '2,0,0': -1, '0,2,0': -1, '0,0,2': -1 }; q[ax] += 3; const v = mAvg(mMul(f2, q)); return fr(v[0] * nrm[1], v[1] * nrm[0]); });
}
const DQ = DORB.map(quadDiag);
/* the d⁸ slice: closed shell (every orbital doubly occupied) minus the pair in d_x²−y² */
const D10 = [0, 1, 2].map(a => DQ.reduce((s, q) => fAdd(s, fMul(fr(2), q[a])), fr(0)));
const D8 = [0, 1, 2].map(a => fAdd(D10[a], fMul(fr(-2), DQ[4][a])));

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('spin-shells-on-the-three-sphere film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(SS_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(SS_LEAN).length}`);
  for (const [short, [gid]] of Object.entries(SS_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. SPHERE: shell dimensions and squared counts */
  [0, 1, 2, 3, 4].forEach(tj => check((tj + 1) ** 2 === [1, 4, 9, 16, 25][tj], `(2j + 1)² at 2j = ${tj}`));

  /* 2. TRIAD: κ of (1, 1, 1, 1), the fusion identity, the zero of χ₁; the squared spinor 4κ = (2c)² */
  {
    const p = [1, 1, 1, 1], n2 = p.reduce((s, v) => s + v * v, 0), k = fr(p[0] * p[0], n2);
    check(n2 === 4 && fEq(k, fr(1, 4)), 'p = (1,1,1,1): |p|² = 4, κ = 1/4');
    check(fEq(pEvalF(EV[1], k), fr(0)), 'χ₁(1/4) = 0');
    check(near(pEvalN(UC[2], Math.sqrt(1 / 4)), 0), 'U₂(1/2) = 0 by the c-route');
    check(pEq(pAdd(EV[0], EV[1]), [0, 4]), '1 + (4κ − 1) = 4κ');
    check(pEq(HALF2(0), [0, 4]), 'χ½² = κ · 2² = 4κ');
    check(2 * 2 === 1 + 3, '2 × 2 = 1 + 3');
  }

  /* 3. ROOTS: E_n(c²) = U_{2n}(c) coefficientwise, odd powers vanish; E₂; the dimension ladder */
  for (let n = 0; n < 12; n++) {
    const u = UC[2 * n];
    check(u.every((c, i) => i % 2 === 0 || c === 0), `U_${2 * n} has only even powers`);
    check(pEq(u.filter((_, i) => i % 2 === 0), EV[n]), `E_${n}(c²) = U_${2 * n}(c)`);
    check(pEvalN(EV[n], 1) === 2 * n + 1, `E_${n}(1) = ${2 * n + 1}`);
    /* an independent numeric route: U_m(cos t) = sin((m + 1)t) / sin t */
    for (const t of [0.3, 0.9, 1.7]) check(near(pEvalN(EV[n], Math.cos(t) ** 2), Math.sin((2 * n + 1) * t) / Math.sin(t), 1e-7), `E_${n}(cos² t) = sin((2n + 1)t)/sin t at t = ${t}`);
  }
  check(pEq(EV[2], [1, -12, 16]) && pEq(EV[3], [-1, 24, -80, 64]), 'E₂ = 16κ² − 12κ + 1, E₃ = 64κ³ − 80κ² + 24κ − 1');
  check(pEq(UC[4], [1, 0, -12, 0, 16]), 'U₄(c) = 16c⁴ − 12c² + 1');

  /* 4. LANDMARKS: recomputed values equal the chapter's table; odd factor; the root-two example */
  LM_ROWS.forEach((r, i) => r.book.forEach((b, j) => check(LM_VAL[i][j] === b, `table row ${i} column ${j}: ${LM_VAL[i][j]} vs ${b}`)));
  for (let n = 0; n < 10; n++) {
    const u = UC[2 * n + 1];
    check(u.every((c, i) => i % 2 === 1 || c === 0), `U_${2 * n + 1} has only odd powers`);
    for (const t of [0.4, 1.1]) check(near(Math.cos(t) * pEvalN(ODD(n), Math.cos(t) ** 2), Math.sin((2 * n + 2) * t) / Math.sin(t), 1e-7), `c · oddFactor_${n}(c²) = U_${2 * n + 1}(c)`);
  }
  check(pEq(ODD(1), [-4, 8]) && pEq(HALF2(1), [0, 16, -64, 64]), 'oddFactor₁ = 8κ − 4; χ₃/₂² = 64κ³ − 64κ² + 16κ');
  {
    const p = [1, 1, 0, 0], n2 = 2, k = fr(1, n2), c = p[0] / Math.sqrt(n2);
    check(fEq(k, fr(1, 2)) && near(Math.abs(2 * c), Math.SQRT2) && near((2 * c) ** 2, 2), 'p = (1,1,0,0): κ = 1/2, |χ½| = √2, χ½² = 2');
    check(near(-2 * c, -Math.SQRT2), 'q → −q flips χ½');
  }

  /* 5. FUSION: all pairs up to 5, the worked example, dimensions */
  for (let m = 0; m <= 5; m++) for (let n = 0; n <= 5; n++) {
    check(pEq(pMul(EV[m], EV[n]), RUN(m, n)), `E_${m} E_${n} = Σ E_r`);
    let d = 0; for (let r = Math.abs(m - n); r <= m + n; r++) d += 2 * r + 1;
    check(d === (2 * m + 1) * (2 * n + 1), `dimensions (2m+1)(2n+1) for ${m}, ${n}`);
  }
  check(pEq(pMul(EV[1], EV[2]), [-1, 16, -64, 64]) && pEq(RUN(1, 2), [-1, 16, -64, 64]), 'E₁E₂ = 64κ³ − 64κ² + 16κ − 1');
  check(3 * 5 === 3 + 5 + 7, '3 × 5 = 3 + 5 + 7');

  /* 6. QUAD: recomputed diagonals equal the chapter's ledger (sevenths); zero traces and sums; d¹⁰ and d⁸ */
  DORB.forEach((o, i) => {
    DQ[i].forEach((v, a) => check(fEq(v, fr(o.book[a], 7)), `${o.name} axis ${a}: ${fStr(v)} vs ${o.book[a]}/7`));
    check(fEq(DQ[i].reduce(fAdd, fr(0)), fr(0)), `${o.name} is trace-free`);
  });
  [0, 1, 2].forEach(a => check(fEq(DQ.reduce((s, q) => fAdd(s, q[a]), fr(0)), fr(0)), `five orbitals sum to zero on axis ${a}`));
  check(D10.every(v => fEq(v, fr(0))), 'd¹⁰ closed shell vanishes');
  check(fEq(D8[0], fr(-4, 7)) && fEq(D8[1], fr(-4, 7)) && fEq(D8[2], fr(8, 7)) && fEq(D8.reduce(fAdd, fr(0)), fr(0)), 'd⁸ = (−4/7, −4/7, +8/7), trace 0');
  /* an independent route: Monte Carlo-free quadrature of ⟨f² (3z² − 1)⟩ / ⟨f²⟩ for d_x²−y² on a latitude grid */
  {
    const M = 400; let num = 0, den = 0;
    for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) {
      const th = (i + 0.5) / M * Math.PI, ph = (j + 0.5) / M * TAU, w = Math.sin(th);
      const x = Math.sin(th) * Math.cos(ph), y = Math.sin(th) * Math.sin(ph), z = Math.cos(th), f = x * x - y * y;
      num += w * f * f * (3 * z * z - 1); den += w * f * f;
    }
    check(Math.abs(num / den + 4 / 7) < 1e-3, `quadrature ⟨Q_zz⟩(d_x²−y²) = ${num / den}`);
  }
});
Object.assign(FILM.speed, { sphere: 0.02, triad: 0.014, roots: 0.014, landmarks: 0.012, fusion: 0.014, heap: 0.016, quad: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ssFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function ssRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  if (a > 0.003) for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return tot;
}
const SS_MISSING = new Set();
function ssLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = SS_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!SS_MISSING.has(gid)) { SS_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function ssTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('SPIN SHELLS ON THE THREE-SPHERE', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('CLOSED SPECTRUM · INTEGER CHARACTERS · FUSION · SPIN TWO', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}
/* a row of 2j + 1 dots */
function ssDots(x, y, n, col, a, gap = 30, r = 11) { for (let i = 0; i < n; i++) dot(x + i * gap, y, r, col, a); }

/* ======================================================================= */
/*                         scene 1 · A CLOSED SPECTRUM                       */
/* ======================================================================= */
SCENES.sphere = S => {
  const u = S.u;
  ssTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'Lean checks', 'lean']]);
  /* line 0: the open line and its continuous spectrum; fades as the loop closes */
  const la = a * (1 - at(S, 1, 0.9));
  const X0 = 170, X1 = 930, Y = 440;
  if (la > 0.003) {
    panel(130, 200, 840, 620, la, C.dim, 'FLAT LINE · 平直实轴');
    arrow(X0 + 380, Y, X0 - 10, Y, C.dim, la, 2); arrow(X0 + 380, Y, X1 - 10, Y, C.dim, la, 2);
    const sw = Q(S, 0, 'open line', 1.6);
    curve(t => [X0 + t * (X1 - X0 - 30), Y - 80 * Math.sin(t * 22 + S.t * 1.4) * Math.exp(-Math.pow((t - 0.5) * 2.2, 2))], 260, C.cyan, la * sw, 3);
    const ka = la * Q(S, 0, 'needs pi', 0.6);
    const kw = ssRich([['kernel  e', C.white]], X0 + 300, 300, { size: 40, align: 'center', a: ka });
    txt('−2πiξx', X0 + 300 + kw / 2 + 4, 278, { size: 28, fam: F.math, w: 700, c: C.mag, a: ka });
    txt('ℝ  open at both ends · 两端敞开', X0 + 380, Y + 140, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la });
  }
  /* lines 0–1, right: what the open line costs (gives way to the ladder) */
  const oa = a * (1 - at(S, 2, 0.6));
  if (oa > 0.003) {
    panel(1030, 200, 760, 620, oa, C.mag, 'OPEN LINE · 平直实轴的代价');
    const r1 = oa * Q(S, 0, 'needs pi', 0.6), r2 = oa * Q(S, 0, 'continuum of frequencies', 0.6), r3 = oa * at(S, 1, 0.6);
    txt('π and e in the kernel', 1070, 300, { size: 32, fam: F.math, w: 700, c: C.white, a: r1 });
    txt('核里有 π 与 e', 1070, 342, { size: 24, fam: F.zh, w: 700, c: C.dim, a: r1 });
    txt('every frequency ξ ∈ ℝ', 1070, 430, { size: 32, fam: F.math, w: 700, c: C.white, a: r2 });
    txt('频率连续不断', 1070, 472, { size: 24, fam: F.zh, w: 700, c: C.dim, a: r2 });
    for (let i = 0; i < 110; i++) line(1070 + i * 6, 590, 1070 + i * 6, 590 - 30 - 40 * Math.abs(Math.sin(i * 0.37 + 0.3 * Math.sin(i * 0.11))), C.mag, r2 * 0.6, 3);
    txt('closed space: phases must match · 闭合空间：相位必须咬合', 1070, 700, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: r3 });
    txt('diagnosis of 10.1 · 第 10.1 节的诊断', 1070, 780, { size: 20, fam: F.zh, w: 700, c: C.argued, a: oa });
  }
  /* line 1: the wave on a closed loop (schematic of one great circle of S³) */
  const ca = a * at(S, 1, 0.9);
  const CX = 540, CY = 520, R = 220;
  if (ca > 0.003) {
    panel(130, 200, 840, 620, ca, C.cyan, 'S³ ≅ SU(2) · 单位四元数');
    ring(CX, CY, R, C.dim, ca * 0.6, 1.5);
    const k = 3, amp = 38, ph = S.t * 0.9;
    const pr = clamp((S.u - lineAt(S, 1).s - 0.4) / 3.2);
    curve(t => { const th = t * TAU * Math.max(0.02, pr); const r = R + amp * Math.cos(k * th + ph) * (0.6 + 0.4 * Math.cos(ph * 0.7)); return [CX + r * Math.cos(th), CY - r * Math.sin(th)]; }, 360, C.cyan, ca, 3.5);
    if (pr >= 1) dot(CX + (R + amp * Math.cos(ph) * (0.6 + 0.4 * Math.cos(ph * 0.7))), CY, 13, 'g', ca * Q(S, 1, 'meet themselves', 0.5));
    txt('a loop closes: the phase must match · 绕一圈相位咬合', CX, 790, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca });
    txt('schematic · 示意', CX, 250, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ca });
  }
  /* line 2: the ladder of spin shells */
  const ra = a * at(S, 2, 0.6);
  panel(1030, 200, 760, 620, ra, C.cyan, 'PETER–WEYL LADDER · 自旋壳阶梯');
  if (ra > 0.003) {
    const js = ['0', '½', '1', '3/2', '2'];
    txt('j', 1080, 262, { size: 24, fam: F.math, w: 700, c: C.dim, a: ra });
    txt('2j + 1', 1210, 262, { size: 22, fam: F.math, w: 700, c: C.dim, a: ra });
    txt('(2j + 1)²', 1630, 262, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: ra });
    js.forEach((j, i) => {
      const y = 610 - i * 75, ia = ra * clamp((S.u - lineAt(S, 2).s - 0.4 - i * 0.9) / 0.5);
      if (ia <= 0.003) return;
      line(1060, y + 30, 1760, y + 30, C.dim, ia * 0.3, 1);
      txt(j, 1080, y + 12, { size: 36, fam: F.math, w: 700, c: i % 2 ? C.mag : C.cyan, a: ia });
      ssDots(1220, y - 2, i + 1, i % 2 ? 'm' : 'c', ia, 46, 12);
      txt(String((i + 1) ** 2), 1630, y + 13, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: ia });
    });
    txt('literature result · 文献结果（未在本书形式化）', 1410, 668, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ra });
  }
  /* line 3: the Lean backbone */
  const lea = a * Q(S, 3, 'Lean checks', 0.6);
  if (lea > 0.003) {
    panel(1030, 690, 760, 130, lea, C.lean, null, { fill: 'rgba(4,14,12,0.94)' });
    ssLean(1060, 730, 'dense_span_unitary_coefficients', lea);
    txt('G compact ⇒ span of ρ(g)ᵢⱼ dense in C(G, ℂ)', 1060, 772, { size: 24, fam: F.math, w: 700, c: C.white, a: lea });
    txt('有限维幺正矩阵元一致稠密', 1060, 806, { size: 22, fam: F.zh, w: 700, c: C.lean, a: lea });
  }
};

/* ======================================================================= */
/*                        scene 2 · THREE FIRST SHELLS                       */
/* ======================================================================= */
SCENES.triad = S => {
  const a = ssFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'past, present', 'argued'], [3, 'One identity', 'computed']]);
  /* left: the fidelity */
  panel(120, 190, 760, 640, a, C.cyan, 'FIDELITY · 保真度');
  ssRich([['p = (', C.white], ['w', C.now], [', x, y, z)', C.white]], 150, 270, { size: 36, a });
  ssRich([['κ = ', C.cyan], ['w', C.now], ['² / (w² + x² + y² + z²)', C.white]], 150, 340, { size: 36, a: a * Q(S, 0, 'kappa is', 0.6) });
  txt('a plain fraction for integer p · 整数 p 给出普通分数', 150, 392, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 0, 0.6, 2.5) });
  const ea = a * at(S, 4, 0.6);
  if (ea > 0.003) {
    line(150, 440, 850, 440, C.dim, ea * 0.5, 1);
    txt('INTEGER ROTOR · 整数旋子', 150, 490, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ea, ls: 2 });
    ssRich([['p = (1, 1, 1, 1)     |p|² = 4', C.white]], 150, 555, { size: 34, a: ea });
    ssRich([['κ = 1/4', C.now]], 150, 625, { size: 44, a: a * Q(S, 4, 'a quarter', 0.5) });
    const za = a * Q(S, 4, 'reads zero', 0.5);
    ssRich([['χ₁(1/4) = 4 · 1/4 − 1 = ', C.white], ['0', C.now]], 150, 705, { size: 40, a: za });
    txt('no decimal, no trigonometry · 无小数、无三角函数', 150, 770, { size: 22, fam: F.zh, w: 700, c: C.dim, a: za });
  }
  /* right: three shell cards */
  const cards = [
    { j: '0', n: 1, chi: 'χ₀ = 1', tag: 'PAST · 过去', col: C.white, dc: 'w' },
    { j: '½', n: 2, chi: 'χ½² = 4κ', tag: 'PRESENT · 现在', col: C.mag, dc: 'm' },
    { j: '1', n: 3, chi: 'χ₁ = 4κ − 1', tag: 'FUTURE · 未来', col: C.cyan, dc: 'c' }
  ];
  const ma = a * Q(S, 2, 'past, present', 0.6);
  cards.forEach((c, i) => {
    const y = 190 + i * 140, ca = a * clamp((S.u - phraseAt(S, 1, 'first three shells') - i * 0.9) / 0.5);
    if (ca <= 0.003) return;
    panel(930, y, 870, 120, ca, c.col);
    txt('j = ' + c.j, 960, y + 72, { size: 34, fam: F.math, w: 700, c: c.col, a: ca });
    ssDots(1110, y + 60, c.n, c.dc, ca, 32, 11);
    txt(c.chi, 1240, y + 74, { size: 38, fam: F.math, w: 700, c: C.white, a: ca });
    if (ma > 0.003) chip(1680, y + 60, 200, 46, c.tag, C.argued, ma * ca, 20, F.zh);
  });
  if (ma > 0.003) txt('model reading, not a theorem · 模型诠释，不是定理', 1365, 625, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ma * (1 - at(S, 3, 0.5)) });
  /* the fusion identity */
  const fa = a * at(S, 3, 0.6);
  if (fa > 0.003) {
    panel(930, 620, 870, 210, fa, C.cyan, 'DOUBLING FUSION · 倍频融合');
    ssRich([['4κ', C.mag], [' = ', C.white], ['1', C.white], [' + ', C.white], ['(4κ − 1)', C.cyan]], 960, 712, { size: 42, a: fa });
    const ta = a * Q(S, 3, 'two times two', 0.6);
    ssRich([['2 × 2 = 1 + 3', C.now]], 960, 790, { size: 38, a: ta });
    /* a 2×2 grid of dots splitting into 1 + 3 */
    const sp = ease(clamp((S.u - phraseAt(S, 3, 'two times two') - 0.4) / 1.0));
    const g = [[0, 0], [1, 0], [0, 1], [1, 1]];
    const to = [[0, 0], [2, 0.5], [3, 0.5], [4, 0.5]];
    g.forEach((p, i) => {
      const x = 1480 + 46 * lerp(p[0], to[i][0], sp), y = 700 + 46 * lerp(p[1], to[i][1], sp);
      dot(x, y, 14, i === 0 ? 'w' : 'c', ta);
    });
  }
};

/* ======================================================================= */
/*                          scene 3 · NO SQUARE ROOTS                        */
/* ======================================================================= */
const PL = { x0: 200, x1: 860, y0: 790, y1: 230, lo: -2, hi: 7.5 };
const plX = k => PL.x0 + k * (PL.x1 - PL.x0);
const plY = v => PL.y0 - (v - PL.lo) / (PL.hi - PL.lo) * (PL.y0 - PL.y1);
const PL_COL = () => [C.white, C.cyan, C.mag, C.vio];
const PL_DOT = ['w', 'c', 'm', 'v'];
function ssPlot(a, prog, o = {}) {
  if (a <= 0.003) return;
  panel(130, 190, 790, 640, a, C.cyan, 'Eₙ(κ) · κ ∈ [0, 1]');
  line(PL.x0, plY(0), PL.x1 + 20, plY(0), C.dim, a * 0.7, 1.5);
  line(PL.x0, PL.y0 + 10, PL.x0, PL.y1 - 10, C.dim, a * 0.7, 1.5);
  [0, 0.25, 0.5, 0.75, 1].forEach(k => txt(['0', '¼', '½', '¾', '1'][k * 4], plX(k), PL.y0 + 32, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a }));
  [-1, 1, 3, 5, 7].forEach(v => { txt(String(v).replace('-', '−'), PL.x0 - 14, plY(v) + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); line(PL.x0, plY(v), PL.x1, plY(v), C.dim, a * 0.15, 1); });
  txt('κ', PL.x1 + 30, plY(0) + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  const cols = PL_COL();
  for (let n = 0; n < 4; n++) {
    const pn = clamp(prog * 4 - n);
    if (pn <= 0) continue;
    curve(t => { const k = t * pn; return [plX(k), plY(pEvalN(EV[n], k))]; }, 200, cols[n], a, 3.5);
    if (pn >= 1) {
      dot(plX(1), plY(2 * n + 1), 11, PL_DOT[n], a);
      txt(`E${'₀₁₂₃'[n]}`, plX(1) + 18, plY(2 * n + 1) + 8, { size: 24, fam: F.math, w: 700, c: cols[n], a });
    }
  }
  if (o.dims) txt('E(1) = 1, 3, 5, 7', plX(0.62), plY(7) + 8, { size: 24, fam: F.math, w: 700, align: 'center', c: C.now, a: a * o.dims });
}
SCENES.roots = S => {
  const a = ssFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean']]);
  ssPlot(a, clamp((S.u - lineAt(S, 1).s) / 6));
  panel(980, 190, 820, 640, a, C.cyan, 'ROOT ELIMINATION · 消根号');
  /* line 0: the character in c, and c = ±√κ */
  ssRich([['χⱼ(q) = U₂ⱼ(c)', C.white], ['     c = Re q', C.dim]], 1010, 270, { size: 34, a });
  ssRich([['c = ±√κ', C.mag], ['   often irrational · 常为无理数', C.dim]], 1010, 330, { size: 28, a: a * Q(S, 0, 'square root of kappa', 0.6) });
  /* line 1: the recursion */
  const ra = a * at(S, 1, 0.6);
  ssRich([['E₀ = 1      E₁ = 4κ − 1', C.white]], 1010, 420, { size: 34, a: ra });
  ssRich([['Eₙ₊₁ = ', C.white], ['(4κ − 2)', C.now], [' Eₙ − Eₙ₋₁', C.white]], 1010, 480, { size: 34, a: a * Q(S, 1, 'multiply by four kappa minus two', 0.6) });
  /* line 2: U₄ has only even powers; Lean */
  const ua = a * at(S, 2, 0.6);
  ssRich([['U₄(c) = 16', C.white], ['c⁴', C.now], [' − 12', C.white], ['c²', C.now], [' + 1', C.white], ['   even powers only', C.dim]], 1010, 565, { size: 32, a: ua });
  ssLean(1010, 635, 'even_chebyshev', a * Q(S, 2, 'Lean checks', 0.5));
  ssRich([['Eₙ(x²) = U₂ₙ(x)', C.lean], ['   x ∈ ℤ, every n', C.dim]], 1010, 682, { size: 28, a: a * Q(S, 2, 'Lean checks', 0.5) });
  /* line 3: spin two */
  const sa = a * at(S, 3, 0.5);
  ssLean(1010, 752, 'spin_two_character', sa);
  ssRich([['E₂(κ) = 16κ² − 12κ + 1', C.lean], ['   κ ∈ ℚ', C.dim]], 1010, 800, { size: 30, a: sa });
};

/* ======================================================================= */
/*                        scene 4 · RATIONAL LANDMARKS                       */
/* ======================================================================= */
SCENES.landmarks = S => {
  const a = ssFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  const TX = 140, TY = 200, CW = 200, NW = 420, RH = 52;
  panel(120, 185, 1680, 430, a, C.cyan, 'EXACT CHARACTER TABLE · 精确特征标表');
  const ha = a * clamp((S.u - lineAt(S, 0).s) / 0.6);
  const colX = j => TX + NW + j * CW + CW / 2;
  txt('κ =', TX + 20, TY + 62, { size: 26, fam: F.math, w: 700, c: C.dim, a: ha });
  LM_K.forEach((k, j) => txt(fStr(k), colX(j), TY + 62, { size: 30, fam: F.math, w: 700, align: 'center', c: C.dim, a: ha }));
  const dimA = a * Q(S, 1, 'one, three, five, seven', 0.5) * (1 - Q(S, 1, 'at one third', 0.5));
  const cellA = a * Q(S, 1, 'at one third', 0.5);
  if (dimA > 0.003) box(colX(0) - CW / 2 + 12, TY + 80, CW - 24, RH * 4 - 4, C.now, dimA, 2.5);
  if (cellA > 0.003) box(colX(3) - CW / 2 + 12, TY + 80 + RH * 2, CW - 24, RH - 4, C.now, cellA, 2.5);
  LM_ROWS.forEach((r, i) => {
    const y = TY + 118 + i * RH, ra = a * clamp((S.u - lineAt(S, 0).s - 0.4 - i * 0.35) / 0.4);
    if (ra <= 0.003) return;
    txt(r.name, TX + 20, y, { size: 25, fam: F.math, w: 700, c: r.col(), a: ra });
    LM_VAL[i].forEach((v, j) => {
      const hot = (j === 0 && i < 4 && dimA > 0.3) || (j === 3 && i === 2 && cellA > 0.3);
      txt(v, colX(j), y, { size: 30, fam: F.math, w: 700, align: 'center', c: hot ? C.now : C.white, a: ra });
    });
  });
  /* line 2: half spins, Lean */
  const la = a * at(S, 2, 0.6);
  panel(120, 635, 820, 195, la, C.lean, 'HALF SPINS · 半整数自旋');
  ssLean(150, 700, 'odd_chebyshev', a * Q(S, 2, 'Lean checks', 0.5));
  ssRich([['x · oddFactorₙ(x²) = U₂ₙ₊₁(x)', C.lean]], 150, 752, { size: 30, a: a * Q(S, 2, 'Lean checks', 0.5) });
  txt('one factor of c survives · 恰留一个因子 c', 150, 802, { size: 22, fam: F.zh, w: 700, c: C.white, a: la });
  /* line 3: the root-two example */
  const ea = a * at(S, 3, 0.6);
  panel(980, 635, 820, 195, ea, C.cyan, 'p = (1, 1, 0, 0)');
  ssRich([['κ = 1/2     c = ±1/√2', C.white]], 1010, 700, { size: 30, a: ea });
  ssRich([['χ½ = 2c = ', C.white], ['±√2', C.mag], ['   q → −q flips it', C.dim]], 1010, 752, { size: 30, a: a * Q(S, 3, 'flips with q', 0.5) });
  ssRich([['χ½² = 2', C.now], ['   rational again · 平方回到有理数', C.dim]], 1010, 804, { size: 28, a: a * Q(S, 3, 'size root two', 0.5) });
};

/* ======================================================================= */
/*                            scene 5 · SHELL FUSION                         */
/* ======================================================================= */
SCENES.fusion = S => {
  const a = ssFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* left: 3 × 5 dots regrouped into 3 + 5 + 7 */
  panel(120, 190, 760, 640, a, C.cyan, 'DIMENSIONS · 维数');
  const ga = a * at(S, 1, 0.6);
  const sp = ease(clamp((S.u - phraseAt(S, 1, 'three times five') - 0.3) / 1.4));
  const rows = [3, 5, 7], cols = ['c', 'm', 'v'];
  let idx = 0;
  for (let r = 0; r < 3; r++) for (let k = 0; k < rows[r]; k++) {
    const gx = idx % 5, gy = Math.floor(idx / 5);
    const x = lerp(330 + gx * 70, 200 + k * 70, sp), y = lerp(340 + gy * 80, 330 + r * 110, sp);
    dot(x, y, 18, sp > 0.5 ? cols[r] : 'w', ga);
    idx++;
  }
  ssRich([['3 × 5 = 15', C.white]], 500, 650, { size: 44, align: 'center', a: ga * (1 - sp) });
  ssRich([['3', C.cyan], [' + ', C.white], ['5', C.mag], [' + ', C.white], ['7', C.vio], [' = 15', C.white]], 500, 650, { size: 44, align: 'center', a: ga * sp });
  txt('spin 1 ⊗ spin 2 = spin 1 ⊕ 2 ⊕ 3', 500, 730, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a: ga });
  /* right: the rule and the worked polynomial */
  panel(940, 190, 860, 640, a, C.cyan, 'FUSION RULE · 融合律');
  ssRich([['Eₘ · Eₙ = Σ Eᵣ', C.white]], 970, 280, { size: 40, a });
  ssRich([['r = |m − n|, …, m + n', C.dim]], 970, 335, { size: 28, a: a * Q(S, 0, 'from their gap', 0.6) });
  ssRich([['E₁ · E₂ = ', C.white], ['E₁', C.cyan], [' + ', C.white], ['E₂', C.mag], [' + ', C.white], ['E₃', C.vio]], 970, 425, { size: 38, a: ga });
  const pa = a * at(S, 2, 0.6);
  ssRich([['(4κ − 1)(16κ² − 12κ + 1)', C.white]], 970, 505, { size: 30, a: pa });
  ssRich([['= 64κ³ − 64κ² + 16κ − 1', C.now]], 1000, 555, { size: 32, a: a * Q(S, 2, 'sixty-four kappa cubed', 0.5) });
  ssRich([['(4κ − 1) + (16κ² − 12κ + 1) + (64κ³ − 80κ² + 24κ − 1)', C.white]], 970, 620, { size: 22, a: pa });
  ssRich([['= 64κ³ − 64κ² + 16κ − 1', C.now]], 1000, 665, { size: 32, a: a * Q(S, 2, 'minus one', 0.5) });
  const la = a * Q(S, 3, 'Lean checks', 0.5);
  ssLean(970, 745, 'evenChar_product_sum', la);
  txt('every m, n · coefficient by coefficient · 逐项系数', 970, 795, { size: 22, fam: F.zh, w: 700, c: C.lean, a: la });
};

/* ======================================================================= */
/*                              scene 6 · NO ORIGIN                          */
/* ======================================================================= */
SCENES.heap = S => {
  const a = ssFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  panel(120, 190, 760, 640, a, C.cyan, 'HEAP BRACKET · 流群括号');
  const CX = 500, CY = 500, R = 230;
  ring(CX, CY, R, C.dim, a * 0.6, 1.5);
  txt('schematic · 示意', 850, 262, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.argued, a });
  const P = th => [CX + R * Math.cos(th), CY - R * Math.sin(th)];
  const tx = 2.5, ty = 1.6, tw0 = 4.3, tb = tw0 + (ty - tx);   /* y x̄ w: carry w by the step from x to y */
  const ma = a * Q(S, 0, 'heap bracket', 0.6);
  [[tx, 'x', 'c'], [ty, 'y', 'm'], [tw0, 'w', 'w']].forEach(([th, n, d]) => {
    const [x, y] = P(th); dot(x, y, 14, d, a);
    txt(n, x + 30 * Math.cos(th), y - 30 * Math.sin(th) + 10, { size: 30, fam: F.math, w: 700, align: 'center', c: d === 'c' ? C.cyan : d === 'm' ? C.mag : C.white, a });
  });
  if (ma > 0.003) {
    const [x0, y0] = P(tx), [x1, y1] = P(ty), [w0, w1] = P(tw0), [b0, b1] = P(tb);
    arrow(x0, y0, x1, y1, C.dim, ma, 2.5);
    arrow(w0, w1, b0 + (w0 - b0) * 0.06, b1 + (w1 - b1) * 0.06, C.now, ma, 3);
    dot(b0, b1, 15, 'g', ma);
    txt('y x̄ w', b0 + 34, b1 + 10, { size: 30, fam: F.math, w: 700, c: C.now, a: ma });
  }
  const no = a * Q(S, 0, 'needs an origin', 0.6);
  txt('x⁻¹ needs a chosen 1 · 需要钦定原点', CX, 790, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: no * (1 - ma) });
  txt('no identity needed · 无需单位元', CX, 790, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: ma });
  /* right: the convolution and its shell blocks */
  panel(940, 190, 860, 640, a, C.argued, 'ORIGIN-FREE CONVOLUTION · 无原点卷积');
  const oa = a * (1 - at(S, 1, 0.6));
  ssRich([['(f * g)(w) = avg over x of  f(x) · g(', C.dim], ['x⁻¹', C.white], ['w)', C.dim]], 970, 300, { size: 28, a: oa * Q(S, 0, 'needs an origin', 0.5) });
  txt('x⁻¹ is measured from a chosen 1 · 逆元依赖钦定的 1', 970, 350, { size: 22, fam: F.zh, w: 700, c: C.dim, a: oa * Q(S, 0, 'needs an origin', 0.5) });
  const ca = a * at(S, 1, 0.6);
  ssRich([['(f ⊛ g ⊛ h)(w)', C.white]], 970, 280, { size: 34, a: ca });
  ssRich([['= avg over x, y of  f(x) · ḡ(y) · h(y x̄ w)', C.white]], 970, 335, { size: 28, a: ca });
  const ba = a * Q(S, 1, 'three matrices multiplied', 0.6);
  /* block-diagonal picture: shells j = 0, ½, 1 as 1×1, 2×2, 3×3 blocks */
  const BX = 990, BY = 400, cell = 46;
  let off = 0;
  [[1, '0', C.white], [2, '½', C.mag], [3, '1', C.cyan]].forEach(([n, j, col]) => {
    box(BX + off * cell, BY + off * cell, n * cell, n * cell, col, ba, 2.5, rgba(col, 0.12));
    txt('j = ' + j, BX + (off + n) * cell + 14, BY + off * cell + n * cell / 2 + 9, { size: 22, fam: F.math, w: 700, c: col, a: ba });
    off += n;
  });
  ssRich([['block j:  ', C.dim], ['f̂ⱼ ĝⱼ† ĥⱼ', C.now]], 1360, 520, { size: 34, a: ba });
  txt('bracket → matrix triple product', 1360, 570, { size: 20, fam: F.mono, w: 700, c: C.white, a: ba });
  txt('三元括号化为每壳的矩阵三连乘', 1360, 604, { size: 20, fam: F.zh, w: 700, c: C.white, a: ba });
  txt('written derivation (10.4.1) · 书面推导', 970, 790, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ba });
};

/* ======================================================================= */
/*                          scene 7 · SPIN-TWO TESTBED                       */
/* ======================================================================= */
SCENES.quad = S => {
  const a = ssFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean']]);
  const TX = 140, TY = 190;
  panel(120, TY, 940, 640, a, C.cyan, 'j = 2 · FIVE d ORBITALS · 五条 d 轨道');
  txt('angular quadrupole ⟨3n² − 1⟩ per axis, in sevenths', TX + 20, TY + 72, { size: 24, fam: F.math, w: 700, c: C.dim, a });
  const hx = [560, 720, 880];
  ['xx', 'yy', 'zz'].forEach((h, i) => txt('Q ' + h, hx[i], TY + 130, { size: 28, fam: F.math, w: 700, align: 'center', c: C.dim, a }));
  const va = a * at(S, 1, 0.6);
  const dropA = a * Q(S, 3, 'Empty the', 0.5);
  DORB.forEach((o, i) => {
    const y = TY + 190 + i * 62, ra = a * clamp((S.u - lineAt(S, 0).s - 0.6 - i * 0.4) / 0.4);
    if (ra <= 0.003) return;
    const hot = i === 4 && dropA > 0.003;
    if (hot) box(TX + 10, y - 40, 910, 56, C.now, dropA, 2.5);
    txt(o.name.replace('_', ' '), TX + 20, y, { size: 28, fam: F.math, w: 700, c: hot ? C.now : C.white, a: ra });
    txt(o.form, TX + 210, y, { size: 22, fam: F.math, w: 700, c: C.dim, a: ra });
    DQ[i].forEach((v, k) => txt(fStr([v[0] * 7 / v[1], 1], true), hx[k], y, { size: 30, fam: F.math, w: 700, align: 'center', c: v[0] > 0 ? C.cyan : C.mag, a: va * ra }));
  });
  const sa = a * Q(S, 1, 'every column sums to zero', 0.5);
  line(TX + 20, TY + 540, TX + 900, TY + 540, C.dim, sa, 1.5);
  txt('Σ five', TX + 20, TY + 590, { size: 28, fam: F.math, w: 700, c: C.white, a: sa });
  hx.forEach(x => txt('0', x, TY + 590, { size: 34, fam: F.math, w: 700, align: 'center', c: C.now, a: sa }));
  /* right: d¹⁰ and d⁸ bars */
  panel(1100, TY, 700, 640, a, C.lean, 'd¹⁰ → d⁸');
  const BY = 560, BS = 150, bx = [1270, 1450, 1630];
  const la = a * at(S, 2, 0.5);
  line(1180, BY, 1760, BY, C.dim, a, 1.5);
  ['x', 'y', 'z'].forEach((n, i) => txt(n, bx[i], BY + 230, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a }));
  ssLean(1130, 260, 'orbital_quadrupole', la);
  txt('d¹⁰ closed shell: 0 on every axis', 1130, 310, { size: 22, fam: F.mono, w: 700, c: C.lean, a: la * (1 - dropA) });
  const grow = ease(clamp((S.u - phraseAt(S, 3, 'Empty the') - 0.6) / 1.4));
  D8.forEach((v, i) => {
    const h = BS * (v[0] / v[1]) * grow, col = v[0] > 0 ? C.cyan : C.mag;
    if (dropA > 0.003 && Math.abs(h) > 0.5) {
      fillBox(bx[i] - 45, h > 0 ? BY - h : BY, 90, Math.abs(h), col, dropA * 0.75);
      txt(fStr(v, true), bx[i], h > 0 ? BY - h - 18 : BY - h + 42, { size: 34, fam: F.math, w: 700, align: 'center', c: col, a: dropA * grow });
    }
    if (la > 0.003) dot(bx[i], BY, 10, 'n', la * (1 - grow));
  });
  txt('d⁸: trace −4 − 4 + 8 = 0  (× 1/7)', 1130, 310, { size: 22, fam: F.mono, w: 700, c: C.lean, a: dropA * grow });
  txt('gold oxidation states: crystal-field background', 1130, 812, { size: 17, fam: F.mono, w: 700, c: C.argued, a: a * at(S, 0, 0.6) });
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 250 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.start + 10;
  background(t, sc, 2, 10);
  ssPlot(1, 1, { dims: 1 });
  txt(DATA.film.title_zh, 1390, 400, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt(DATA.film.title.toUpperCase(), 1390, 490, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 3 });
  txt('Eₙ(c²) = U₂ₙ(c)', 1390, 610, { size: 60, fam: F.math, w: 700, align: 'center', c: C.cyan, ab: 2 });
  txt('E₁E₂ = E₁ + E₂ + E₃', 1390, 690, { size: 40, fam: F.math, w: 700, align: 'center', c: C.mag });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1390, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, 1390, 850, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(2);
};
