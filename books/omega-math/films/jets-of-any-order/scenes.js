/* Film · Jets of Any Order · 任意阶射流与马青括号 (book omega-math, chapter 8). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 8 of the book):
     ring     definition def-ch08-dfinite-jets: a jet of order N is a row of N + 1 rational coefficients, η^(N+1) ≡ 0,
              and (Df)_k = (k + 1) f_(k+1). The shift is shown on the row Exp(1); D Exp(1) = Exp(1) through degree 7 is
              computed here (computed). The opening line reports the textbook view the chapter overturns (argued).
     four     the four generators Exp(1), Cos, Sin, Atan (def-ch08-dfinite-jets), k = 0 … 8; D Sin = Cos and
              D Cos = −Sin are recomputed on those rows, Cos·Cos + Sin·Sin is recomputed through degree 12 (computed);
              LEAN: OmegaJetCalculus.cos_sq_add_sin_sq (thm-ch08-dfinite-calculus-laws, item 4: every degree).
     cayley   the Cayley map at t = 1/2 (p = 1, q = 2) giving (3/5, 4/5), recomputed (computed); the drawing of the
              map as the chord from (−1, 0) through (0, t) is exact geometry drawn here; LEAN:
              OmegaCircleClosure.cayley_circle_unit (thm-ch08-cayley-circle-unit).
     unify    compose Cos (2 Atan) and compose Sin (2 Atan), recomputed through degree 8 with exact fractions, equal
              CayleyCos = 1 − 2η² + 2η⁴ − … and CayleySin = 2η − 2η³ + … (computed); LEAN:
              OmegaComposeAndWitnesses.cos_two_atan_eq_cayley and .sin_two_atan_eq_cayley (every order N,
              thm-ch08-cayley-composition-unification); "the series re-expands the fraction" is the chapter's reading
              of that identity (argued).
     audit    example ex-ch08-cayley-half-truncation: U_N(1/2), V_N(1/2) for N = 2, 4, 6, 8, 12 and their errors,
              the factor −1/4 (manual derivation in the book; recomputed here: computed).
     machin   the tangent rule of def-ch08-rational-tangent-law and the chain 1/5 → 5/12 → 120/119 → 28561/28561 = 1,
              28561 = 13⁴ (recomputed: computed); LEAN: OmegaArithmeticHorizon.machin_rational_chain
              (thm-ch08-machin-rational-chain). The rays on the circle are drawn from the integer pairs (q, p).
     bracket  def-ch08-rational-tangent-law brackets [L_M, U_M], exact [L_1, U_1], widths W_M and the table of
              ex-ch08-machin-width-table (manual derivation in the book; recomputed with BigInt fractions: computed);
              identification of the nested intersection with π only through the classical shadow (argued).
     close    section sec-ch08-bridge-to-ch09 (argued) and the closing card.
   On load, FILM.init recomputes every number on screen by a second route and compares it with the chapter's verbatim
   values; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const JA_LEAN = {
  pyth: 'D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq',
  circle: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit',
  cos: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.cos_two_atan_eq_cayley',
  sin: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.sin_two_atan_eq_cayley',
  machin: 'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.machin_rational_chain'
};

/* ---------------- exact rationals over BigInt ---------------- */
const B = BigInt;
const bAbs = x => (x < 0n ? -x : x);
const bGcd = (a, b) => { a = bAbs(a); b = bAbs(b); while (b) [a, b] = [b, a % b]; return a || 1n; };
const fr = (n, d = 1n) => { n = B(n); d = B(d); if (d < 0n) { n = -n; d = -d; } const g = bGcd(n, d); return [n / g, d / g]; };
const fAdd = (x, y) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const fSub = (x, y) => fr(x[0] * y[1] - y[0] * x[1], x[1] * y[1]);
const fMul = (x, y) => fr(x[0] * y[0], x[1] * y[1]);
const fDiv = (x, y) => fr(x[0] * y[1], x[1] * y[0]);
const fNeg = x => [-x[0], x[1]];
const fEq = (x, y) => x[0] * y[1] === y[0] * x[1];
const fLt = (x, y) => x[0] * y[1] < y[0] * x[1];
const fMin = (x, y) => (fLt(x, y) ? x : y), fMax = (x, y) => (fLt(x, y) ? y : x);
const F0 = fr(0), F1 = fr(1);
const MINUS = '−';
const fStr = x => { const s = x[1] === 1n ? String(bAbs(x[0])) : `${bAbs(x[0])}/${x[1]}`; return (x[0] < 0n ? MINUS : '') + s; };
const fSigned = x => (x[0] > 0n ? '+' : '') + fStr(x);
const fNum = x => Number(x[0]) / Number(x[1]);
const pow10 = k => 10n ** B(k);
/* round half up to `places` decimals, positive x */
function fDec(x, places) {
  const m = (2n * x[0] * pow10(places) + x[1]) / (2n * x[1]), s = m.toString().padStart(places + 1, '0');
  return `${s.slice(0, s.length - places)}.${s.slice(s.length - places)}`;
}
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const sup = s => String(s).split('').map(c => SUP[c] || c).join('');
/* x > 0 in scientific notation with `sig` significant figures: [mantissa string, exponent] */
function fSci(x, sig = 7) {
  let e = x[0].toString().length - x[1].toString().length;
  const scaledLt1 = e >= 0 ? x[0] < x[1] * pow10(e) : x[0] * pow10(-e) < x[1];
  if (scaledLt1) e -= 1;
  const k = sig - 1 - e;
  let num = x[0], den = x[1];
  if (k >= 0) num *= pow10(k); else den *= pow10(-k);
  let m = (2n * num + den) / (2n * den);
  if (m.toString().length > sig) { m /= 10n; e += 1; }
  const s = m.toString();
  return [`${s[0]}.${s.slice(1)}`, e];
}
const sciStr = x => { const [m, e] = fSci(x); return `${m} × 10${sup(e)}`; };

/* ---------------- jets: rows of rational coefficients, k = 0 … NJ ---------------- */
const NJ = 12;
const fact = k => { let r = 1n; for (let i = 2; i <= k; i++) r *= B(i); return r; };
const row = fn => Array.from({ length: NJ + 1 }, (_, k) => fn(k));
const sgn = j => (j % 2 ? -1n : 1n);
const EXP1 = row(k => fr(1n, fact(k)));
const COS = row(k => (k % 2 ? F0 : fr(sgn(k / 2), fact(k))));
const SIN = row(k => (k % 2 ? fr(sgn((k - 1) / 2), fact(k)) : F0));
const ATAN = row(k => (k % 2 ? fr(sgn((k - 1) / 2), B(k)) : F0));
const TWO_ATAN = ATAN.map(c => fMul(fr(2), c));
const CAYC = row(k => (k === 0 ? F1 : k % 2 ? F0 : fr(2n * sgn(k / 2))));
const CAYS = row(k => (k % 2 ? fr(2n * sgn((k - 1) / 2)) : F0));
const jMul = (a, b) => row(k => { let s = F0; for (let i = 0; i <= k; i++) s = fAdd(s, fMul(a[i], b[k - i])); return s; });
const jAdd = (a, b) => row(k => fAdd(a[k], b[k]));
const jDeriv = a => a.slice(1).map((c, k) => fMul(fr(k + 1), c));
/* formal composition through degree NJ: Σ_k f_k g^k (g_0 = 0) */
function jCompose(f, g) {
  let out = row(() => F0), p = row(k => (k === 0 ? F1 : F0));
  for (let k = 0; k <= NJ; k++) { out = out.map((c, i) => fAdd(c, fMul(f[k], p[i]))); p = jMul(p, g); }
  return out;
}
const PYTH = jAdd(jMul(COS, COS), jMul(SIN, SIN));
const COMP_C = jCompose(COS, TWO_ATAN), COMP_S = jCompose(SIN, TWO_ATAN);
const HALF = fr(1, 2);
const evalAt = (a, N, x) => { let s = F0, p = F1; for (let k = 0; k <= N; k++) { s = fAdd(s, fMul(a[k], p)); p = fMul(p, x); } return s; };
const AUDIT_N = [2, 4, 6, 8, 12];
const P35 = fr(3, 5), P45 = fr(4, 5);
const AUDIT = AUDIT_N.map(N => { const U = evalAt(COMP_C, N, HALF), V = evalAt(COMP_S, N, HALF); return { N, U, V, eU: fSub(U, P35), eV: fSub(V, P45) }; });

/* ---------------- Cayley map, tangent rule, Machin chain and brackets ---------------- */
const cayley = t => { const t2 = fMul(t, t), den = fAdd(F1, t2); return [fDiv(fSub(F1, t2), den), fDiv(fMul(fr(2), t), den)]; };
const CAY_HALF = cayley(HALF);
const tAdd = (u, v) => fDiv(fAdd(u, v), fSub(F1, fMul(u, v)));
const tSub = (u, v) => fDiv(fSub(u, v), fAdd(F1, fMul(u, v)));
const T1 = fr(1, 5), T2 = tAdd(T1, T1), T4 = tAdd(T2, T2), T239 = fr(1, 239), CHAIN = tSub(T4, T239);
/* the unreduced last step: (120·239 − 119) / (119·239 + 120) */
const CH_NUM = 120n * 239n - 119n, CH_DEN = 119n * 239n + 120n;
const altSum = (x, M) => { let s = F0; for (let k = 0; k < M; k++) { const t = fDiv(fr(sgn(k)), fr(2 * k + 1)); let p = F1; for (let i = 0; i < 2 * k + 1; i++) p = fMul(p, x); s = fAdd(s, fMul(t, p)); } return s; };
const X5 = fr(1, 5), X239 = fr(1, 239);
function bracket(M) {
  const a5 = altSum(X5, M), b5 = altSum(X5, M + 1), a2 = altSum(X239, M), b2 = altSum(X239, M + 1);
  const L = fSub(fMul(fr(16), fMin(a5, b5)), fMul(fr(4), fMax(a2, b2)));
  const U = fSub(fMul(fr(16), fMax(a5, b5)), fMul(fr(4), fMin(a2, b2)));
  return { M, L, U, W: fSub(U, L) };
}
const MMAX = 17;
const BR = Array.from({ length: MMAX + 1 }, (_, M) => (M ? bracket(M) : null));
const digits = x => -(Math.log10(Number(x[0])) - Math.log10(Number(x[1])));

/* the chapter's verbatim values */
const CH = {
  audit: [['1/2', '−1/10', '1', '+1/5'], ['5/8', '+1/40', '3/4', '−1/20'], ['19/32', '−1/160', '13/16', '+1/80'],
    ['77/128', '+1/640', '51/64', '−1/320'], ['1229/2048', '+1/10240', '819/1024', '−1/5120']],
  L1: '281476/89625', U1: '651864872/204778785', L1d: '3.140597', U1d: '3.183264', W1: '218431204/5119469625',
  widths: { 1: '4.266676 × 10⁻²', 2: '1.024000 × 10⁻³', 4: '9.102222 × 10⁻⁷', 6: '1.008246 × 10⁻⁹', 8: '1.233619 × 10⁻¹²',
    12: '2.147484 × 10⁻¹⁸', 17: '1.570731 × 10⁻²⁵' }
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('jets-of-any-order film: ' + m); };
  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(JA_LEAN).length, `film.json cites ${lean.length} declarations`);
  for (const gid of Object.values(JA_LEAN)) { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); }
  /* 1. derivative rules on the rows, and the Pythagorean row */
  const dE = jDeriv(EXP1), dS = jDeriv(SIN), dC = jDeriv(COS);
  dE.forEach((c, k) => check(fEq(c, EXP1[k]), `D Exp(1) at ${k}`));
  dS.forEach((c, k) => check(fEq(c, COS[k]), `D Sin at ${k}`));
  dC.forEach((c, k) => check(fEq(c, fNeg(SIN[k])), `D Cos at ${k}`));
  PYTH.forEach((c, k) => check(fEq(c, k ? F0 : F1), `Cos² + Sin² at ${k}`));
  /* atan ODE (1 + η²) D Atan = 1, as a second route to the arctangent row */
  const dA = jDeriv(ATAN);
  for (let k = 0; k < NJ - 1; k++) check(fEq(fAdd(dA[k], k >= 2 ? dA[k - 2] : F0), k ? F0 : F1), `atan ODE at ${k}`);
  /* 2. composition equals the Cayley streams; second route: Cayley ODE recurrences (k+1)f_(k+1) + (k−1)f_(k−1) = −2 g_k */
  COMP_C.forEach((c, k) => check(fEq(c, CAYC[k]), `Cos∘(2Atan) at ${k}`));
  COMP_S.forEach((c, k) => check(fEq(c, CAYS[k]), `Sin∘(2Atan) at ${k}`));
  for (let k = 0; k < NJ; k++) {
    const lc = fAdd(fMul(fr(k + 1), CAYC[k + 1]), k ? fMul(fr(k - 1), CAYC[k - 1]) : F0);
    const ls = fAdd(fMul(fr(k + 1), CAYS[k + 1]), k ? fMul(fr(k - 1), CAYS[k - 1]) : F0);
    check(fEq(lc, fMul(fr(-2), CAYS[k])) && fEq(ls, fMul(fr(2), CAYC[k])), `Cayley ODE at ${k}`);
  }
  /* 3. Cayley point at 1/2, also from integers p = 1, q = 2 */
  check(fEq(CAY_HALF[0], P35) && fEq(CAY_HALF[1], P45), 'cayley(1/2)');
  check((2 * 2 - 1) ** 2 + (2 * 1 * 2) ** 2 === (1 + 4) ** 2, 'integer Cayley identity');
  check(fEq(fAdd(fMul(P35, P35), fMul(P45, P45)), F1), '(3/5)² + (4/5)²');
  /* 4. the η = 1/2 audit against the chapter, and the factor −1/4; second route: geometric closed form */
  AUDIT.forEach((r, i) => {
    const c = CH.audit[i];
    check(fStr(r.U) === c[0] && fSigned(r.eU) === c[1] && fStr(r.V) === c[2] && fSigned(r.eV) === c[3], `audit row N = ${r.N}`);
    let g = F1; for (let j = 1; j <= r.N / 2; j++) { let q = F1; for (let i2 = 0; i2 < j; i2++) q = fMul(q, fr(-1, 4)); g = fAdd(g, fMul(fr(2), q)); }
    check(fEq(g, r.U), `closed form U at N = ${r.N}`);
  });
  for (let i = 0; i < 3; i++) check(fEq(AUDIT[i + 1].eU, fMul(AUDIT[i].eU, fr(-1, 4))) && fEq(AUDIT[i + 1].eV, fMul(AUDIT[i].eV, fr(-1, 4))), `ratio −1/4 at ${i}`);
  /* 5. Machin chain; second route: Gaussian integers (5 + i)^4 (239 − i) has equal real and imaginary parts */
  check(fStr(T2) === '5/12' && fStr(T4) === '120/119' && fEq(CHAIN, F1), 'Machin chain');
  check(CH_NUM === 28561n && CH_DEN === 28561n && 13n ** 4n === 28561n, '28561 = 13⁴');
  const gm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  let z = [1n, 0n]; for (let i = 0; i < 4; i++) z = gm(z, [5n, 1n]); z = gm(z, [239n, -1n]);
  check(z[0] === z[1] && z[0] > 0n, `(5 + i)⁴(239 − i) = ${z}`);
  check(fStr(fDiv(fr(2, 5), fr(24, 25))) === '5/12' && fStr(fDiv(fr(5, 6), fr(119, 144))) === '120/119', 'chain intermediate fractions');
  /* 6. brackets against the chapter, closed-form widths, nesting */
  check(fStr(BR[1].L) === CH.L1 && fStr(BR[1].U) === CH.U1 && fStr(BR[1].W) === CH.W1, 'L1, U1, W1');
  check(fDec(BR[1].L, 6) === CH.L1d && fDec(BR[1].U, 6) === CH.U1d, 'L1, U1 decimals');
  for (let M = 1; M <= MMAX; M++) {
    const n = B(2 * M + 1), cf = fAdd(fr(16n, 5n ** n * n), fr(4n, 239n ** n * n));
    check(fEq(cf, BR[M].W), `closed-form width at M = ${M}`);
    if (M < MMAX) check(fLt(BR[M].L, BR[M + 1].L) && fLt(BR[M + 1].L, BR[M + 1].U) && fLt(BR[M + 1].U, BR[M].U), `nesting at M = ${M}`);
  }
  for (const [M, s] of Object.entries(CH.widths)) check(sciStr(BR[+M].W) === s, `W_${M} = ${sciStr(BR[+M].W)} vs ${s}`);
  /* spoken roundings: 3.1406, 3.1833, about 25 times, about 1.57e-25 */
  check(fDec(BR[1].L, 3) === '3.141' && fDec(BR[1].U, 3) === '3.183', 'spoken endpoints');
  for (let M = 2; M <= MMAX; M++) { const r = fNum(BR[M - 1].W) / fNum(BR[M].W); check(r > 20 && r < 42, `shrink ratio ${r} at ${M}`); }
  check(fSci(BR[17].W, 3)[0] === '1.57' && fSci(BR[17].W, 3)[1] === -25 && fLt(BR[17].W, fr(2n, pow10(25))), 'spoken W_17 below 2e-25');
});
Object.assign(FILM.speed, { ring: 0.02, four: 0.016, cayley: 0.016, unify: 0.014, audit: 0.014, machin: 0.016, bracket: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const JA_MISSING = new Set();
function leanChip(x, y, gid, a, size = 20) {
  if (a <= 0.003) return 0;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!JA_MISSING.has(gid)) { JA_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return 0;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  const name = (r.name || r.label).split('.').slice(-1)[0];
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  return wh + 12 + tw(name, size, F.mono, 700);
}
function tag(x, y, s, col, a, size = 18) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.zh, 700, 1) + 22;
  box(x, y - size - 4, w, size + 14, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 11, y, { size, fam: F.zh, w: 700, c: col, a, ls: 1 });
}
/* one coefficient cell */
function cell(x, y, w, h, s, col, a, o = {}) {
  if (a <= 0.003) return;
  const fill = o.fill ? rgba(o.fill, 0.18) : 'rgba(0,0,0,0.45)';
  box(x, y, w - 8, h, o.frame || rgba(col, 0.9), a, o.lw || 1.5, fill);
  const size = o.size || (s.length > 7 ? 21 : s.length > 5 ? 24 : 28);
  txt(s, x + (w - 8) / 2, y + h / 2 + size * 0.36, { size, fam: F.math, w: 700, align: 'center', c: col, a });
}
const cellCol = c => (c[0] === 0n ? C.dim : C.cyan);
/* a labelled row of coefficient cells: o = { x0, w, h, label, n, a, rev (0→1 left to right), col(k), hl(k) } */
function jetRow(vals, y, o) {
  const a = o.a; if (a <= 0.003) return;
  const x0 = o.x0, w = o.w, h = o.h || 72, n = o.n == null ? vals.length : o.n;
  if (o.label) txt(o.label, x0 - 20, y + h / 2 + 10, { size: o.lsize || 26, fam: F.math, w: 700, align: 'right', c: o.lcol || C.white, a });
  for (let k = 0; k < n; k++) {
    const ra = a * (o.rev == null ? 1 : clamp(o.rev * (n + 2) - k));
    if (ra <= 0.003) continue;
    const v = vals[k], s = typeof v === 'string' ? v : fStr(v);
    const hl = o.hl ? o.hl(k) : 0;
    const col = hl ? C.now : (o.col ? o.col(k) : (typeof v === 'string' ? C.cyan : cellCol(v)));
    cell(x0 + k * w, y, w, h, s, col, ra, { fill: hl ? C.now : null, frame: hl ? C.now : null, lw: hl ? 2.5 : 1.5, size: o.size });
  }
}
function powers(x0, w, y, n, a, from = 0) {
  for (let k = 0; k < n; k++) txt(k + from === 0 ? '1' : `η${sup(k + from)}`, x0 + k * w + (w - 8) / 2, y, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a });
}

/* opening title */
function title(S) {
  const u = S.u, L1 = lineAt(S, 1);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L1.s + 0.6) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 440, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('JETS OF ANY ORDER', p, 5), W / 2, 540, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('ℚ[η]/(ηᴺ⁺¹) · CAYLEY · MACHIN · NO π', W / 2, 615, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 4 });
  /* line 0: the three things textbooks say trigonometry needs */
  const items = [['ℝ', 'the real line'], ['∑ … ∞', 'endless series'], ['π', 'and pi']];
  items.forEach(([s, ph], i) => {
    const q = Q(S, 0, ph, 0.5) * ta;
    if (q <= 0.003) return;
    const x = W / 2 + (i - 1) * 300, y = 740;
    chip(x, y, 220, 70, s, C.mag, q, 36, F.math);
    const k = Q(S, 0, 'and pi', 0.6, 0.9) * ta;
    line(x - 100, y + 26, x + 100, y - 26, C.white, k * 0.8, 3);
  });
}

/* ======================================================================= */
/*                              scene 1 · THE JET RING                       */
/* ======================================================================= */
const RG = { x0: 285, w: 150, n: 9, y: 380, h: 80, y2: 610 };
SCENES.ring = S => {
  title(S);
  const a = at(S, 1, 0.7, -0.2) * clamp((S.d - S.u) / 0.5);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  if (a <= 0.003) return;
  txt('jets of order N:  ℚ[η] / (ηᴺ⁺¹)', W / 2, 235, { size: 46, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('N + 1 rational coefficients, ηᴺ⁺¹ ≡ 0 · shown: N = 8', W / 2, 285, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  /* top row: generic c_k, then (line 2) the row Exp(1) */
  const sw = at(S, 2, 0.6);
  const gen = Array.from({ length: RG.n }, (_, k) => `c${'₀₁₂₃₄₅₆₇₈'[k]}`);
  jetRow(gen, RG.y, { x0: RG.x0, w: RG.w, h: RG.h, a: a * (1 - sw), rev: at(S, 1, 1.4), label: 'f', col: () => C.cyan, size: 30 });
  jetRow(EXP1.slice(0, RG.n), RG.y, { x0: RG.x0, w: RG.w, h: RG.h, a: a * sw, label: 'Exp(1)', lsize: 24 });
  powers(RG.x0, RG.w, RG.y - 18, RG.n, a);
  /* the cell past η^N falls away */
  const fall = Q(S, 1, 'eta to the N plus one is zero', 1.2);
  const fx = RG.x0 + RG.n * RG.w, fy = RG.y + 170 * ei(fall);
  const fa = a * (fall > 0 ? 1 - 0.55 * fall : at(S, 1, 0.6, 1.0) * 0.8) * (1 - 0.7 * at(S, 2, 0.8));
  if (fa > 0.003) {
    ctx.save(); ctx.setLineDash([8, 7]); box(fx, fy, RG.w - 30, RG.h, C.dim, fa, 1.5); ctx.restore();
    txt('η⁹', fx + (RG.w - 30) / 2, fy + RG.h / 2 + 10, { size: 28, fam: F.math, w: 700, align: 'center', c: C.dim, a: fa });
    txt('≡ 0', fx + (RG.w - 30) / 2, fy + RG.h + 34, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a: fa * clamp(fall * 3) });
  }
  /* line 2: the shift D: (Df)_k = (k + 1) f_(k+1) */
  const mv = Q(S, 2, 'slide each coefficient', 1.6), mul = Q(S, 2, 'multiply by its old index', 0.8);
  if (mv > 0.003) {
    const dE = jDeriv(EXP1);
    txt('(Df)ₖ = (k + 1) · fₖ₊₁', W / 2, 545, { size: 34, fam: F.math, w: 700, align: 'center', c: C.now, a: a * clamp(mv * 2) });
    for (let k = 1; k < RG.n; k++) {
      const xa = RG.x0 + k * RG.w + (RG.w - 8) / 2, xb = RG.x0 + (k - 1) * RG.w + (RG.w - 8) / 2;
      const e = ease(clamp(mv * 1.6 - (k - 1) * 0.07));
      const x = lerp(xa, xb, e), y = lerp(RG.y + RG.h + 8, RG.y2 - 8, e);
      if (e < 0.999) arrow(xa, RG.y + RG.h + 6, x, y, C.now, a * 0.55 * (1 - e * 0.5), 2);
      txt(`×${k}`, xb, RG.y2 + RG.h + 34, { size: 24, fam: F.math, w: 700, align: 'center', c: C.now, a: a * mul });
    }
    const res = dE.slice(0, RG.n - 1);
    jetRow(res, RG.y2, { x0: RG.x0, w: RG.w, h: RG.h, a: a * clamp((mv - 0.5) * 2), label: 'D Exp(1)', lsize: 22, n: RG.n - 1 });
    tag(RG.x0 + 8 * RG.w + 6, RG.y2 + 52, '= Exp(1)', C.cyan, a * mul, 22);
    txt('computed here through degree 7', RG.x0, RG.y2 + RG.h + 80, { size: 22, fam: F.mono, w: 700, c: C.dim, a: a * mul });
  }
};

/* ======================================================================= */
/*                            scene 2 · FOUR GENERATORS                      */
/* ======================================================================= */
const FG = { x0: 300, w: 148, n: 9, h: 70, ys: [215, 305, 395, 485] };
SCENES.four = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'lean']]);
  powers(FG.x0, FG.w, FG.ys[0] - 14, FG.n, a * at(S, 0, 0.6));
  const rows = [['Exp(1)', EXP1, 'exponential'], ['Cos', COS, 'cosine'], ['Sin', SIN, 'sine'], ['Atan', ATAN, 'arctangent']];
  const slide = Q(S, 1, 'slides into cosine', 0.6), minus = Q(S, 1, 'Differentiate cosine', 0.6);
  const focus = at(S, 2, 0.6);
  rows.forEach(([lab, vals, ph], i) => {
    const ra = a * Q(S, 0, ph, 0.6) * (1 - 0.45 * focus);
    const hl = (i === 1 && slide > 0 && minus < 0.5) || (i === 2 && minus >= 0.5);
    jetRow(vals.slice(0, FG.n), FG.ys[i], { x0: FG.x0, w: FG.w, h: FG.h, a: ra, rev: Q(S, 0, ph, 1.2), label: lab, hl: hl && focus < 0.5 ? (k => vals[k][0] !== 0n) : null });
  });
  /* line 1: D arrows between the Sin and Cos rows, on the right */
  const xr = FG.x0 + FG.n * FG.w + 20, yc = FG.ys[1] + FG.h / 2, ys = FG.ys[2] + FG.h / 2;
  const da = a * Q(S, 1, 'Differentiate sine', 0.6) * (1 - focus);
  if (da > 0.003) {
    arrow(xr + 20, ys, xr + 20, yc + 6, C.now, da, 3);
    txt('D', xr + 34, (yc + ys) / 2 + 9, { size: 28, fam: F.math, w: 700, c: C.now, a: da });
    const db = a * minus * (1 - focus);
    arrow(xr + 88, yc, xr + 88, ys - 6, C.mag, db, 3);
    txt('D', xr + 102, (yc + ys) / 2 - 6, { size: 28, fam: F.math, w: 700, c: C.mag, a: db });
    txt('−', xr + 104, (yc + ys) / 2 + 26, { size: 28, fam: F.math, w: 700, c: C.mag, a: db });
  }
  /* line 2: Cos·Cos + Sin·Sin through degree 12 */
  if (focus > 0.003) {
    const py = 610, pw = 100;
    txt('Cos·Cos + Sin·Sin', W / 2, 588, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: a * focus });
    powers(FG.x0, pw, py + 100, NJ + 1, a * focus);
    jetRow(PYTH, py, { x0: FG.x0, w: pw, h: 64, a: a * focus, rev: Q(S, 2, 'a one', 2.6), col: k => (k ? C.dim : C.now), size: 30 });
    txt('computed here, k = 0 … 12', FG.x0 + 13 * pw - 8, py + 140, { align: 'right', size: 20, fam: F.mono, w: 700, c: C.dim, a: a * Q(S, 2, 'degree twelve', 0.6) });
  }
  const la = a * at(S, 3, 0.6);
  const lw = leanChip(FG.x0, 808, JA_LEAN.pyth, la, 22);
  txt('≡ 1 at every degree', FG.x0 + lw + 30, 808, { size: 26, fam: F.math, w: 700, c: C.lean, a: la });
};

/* ======================================================================= */
/*                             scene 3 · CAYLEY CIRCLE                       */
/* ======================================================================= */
const CC = { cx: 500, cy: 520, r: 280 };
const ccP = (x, y) => [CC.cx + x * CC.r, CC.cy - y * CC.r];
SCENES.cayley = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean']]);
  /* the unit circle and axes */
  dashed(CC.cx - CC.r - 40, CC.cy, CC.cx + CC.r + 40, CC.cy, C.dim, a * 0.6, 1.5);
  dashed(CC.cx, CC.cy - CC.r - 40, CC.cx, CC.cy + CC.r + 40, C.dim, a * 0.6, 1.5);
  ring(CC.cx, CC.cy, CC.r, C.cyan, a, 3);
  /* the chord from (−1, 0) through (0, t) */
  const t = fNum(HALF), go = Q(S, 1, 'Feed it one half', 1.4);
  const P = ccP(-1, 0), T = ccP(0, t), X = ccP(fNum(CAY_HALF[0]), fNum(CAY_HALF[1]));
  dot(P[0], P[1], 12, 'w', a);
  txt('(−1, 0)', P[0] - 18, P[1] - 18, { size: 24, fam: F.math, w: 700, c: C.white, a, align: 'right' });
  if (go > 0.003) {
    const e = ease(go), Xe = [lerp(P[0], X[0], e), lerp(P[1], X[1], e)];
    line(P[0], P[1], Xe[0], Xe[1], C.mag, a, 3);
    dot(T[0], T[1], 10, 'm', a * clamp(go * 3));
    txt('t = 1/2', T[0] + 16, T[1] + 34, { size: 26, fam: F.math, w: 700, c: C.mag, a: a * clamp(go * 3) });
    const la = a * Q(S, 1, 'we land on', 0.6);
    dot(X[0], X[1], 16, 'g', la);
    txt('(3/5, 4/5)', X[0] + 22, X[1] - 18, { size: 34, fam: F.math, w: 700, c: C.now, a: la });
  }
  /* right: the formula and the hand computation */
  const px = 930;
  panel(px - 30, 190, 880, 450, a * at(S, 0, 0.6), C.cyan, 'CAYLEY MAP · EXACT');
  txt('t  ↦  ( (1 − t²) / (1 + t²) ,  2t / (1 + t²) )', px, 280, { size: 34, fam: F.math, w: 700, c: C.white, a: a * at(S, 0, 0.8, 0.4) });
  const t2 = fMul(HALF, HALF), om = fSub(F1, t2), op = fAdd(F1, t2), tt = fMul(fr(2), HALF);
  const steps = [
    [`t = 1/2,   t² = ${fStr(t2)}`, 'one half'],
    [`1 − t² = ${fStr(om)},   1 + t² = ${fStr(op)},   2t = ${fStr(tt)}`, 'a few multiplications'],
    [`( ${fStr(om)} ÷ ${fStr(op)} ,  ${fStr(tt)} ÷ ${fStr(op)} )  =  ( ${fStr(CAY_HALF[0])} , ${fStr(CAY_HALF[1])} )`, 'we land on'],
    [`(3/5)² + (4/5)² = 9/25 + 16/25 = 1`, 'exactly']
  ];
  steps.forEach(([s, ph], i) => txt(s, px, 360 + i * 70, { size: 30, fam: F.math, w: 700, c: i === 2 ? C.now : i === 3 ? C.cyan : C.white, a: a * Q(S, 1, ph, 0.6) }));
  /* line 2: the integer form and Lean */
  const la = a * at(S, 2, 0.6);
  txt('p, q ∈ ℤ, not both 0:', px, 700, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
  txt('(q² − p²)² + (2pq)² = (p² + q²)²', px, 745, { size: 30, fam: F.math, w: 700, c: C.white, a: la });
  txt('p = 1, q = 2:  3² + 4² = 5²', 1780, 812, { align: 'right', size: 26, fam: F.math, w: 700, c: C.dim, a: la });
  leanChip(px, 812, JA_LEAN.circle, a * Q(S, 2, 'lies on the unit circle', 0.6), 22);
};

/* ======================================================================= */
/*                           scene 4 · ONE AND THE SAME                      */
/* ======================================================================= */
const UN = { x0: 330, w: 145, n: 9, h: 66 };
SCENES.unify = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  powers(UN.x0, UN.w, 200, UN.n, a);
  const a0 = a * at(S, 0, 0.6);
  jetRow(COS.slice(0, UN.n), 215, { x0: UN.x0, w: UN.w, h: UN.h, a: a0, label: 'Cos' });
  jetRow(TWO_ATAN.slice(0, UN.n), 300, { x0: UN.x0, w: UN.w, h: UN.h, a: a * Q(S, 0, 'twice the arctangent', 0.6), label: '2·Atan' });
  /* the composed row, settling from noise into integers */
  const cp = Q(S, 0, 'Compose', 0.6), settle = Q(S, 1, 'cancel', 2.4);
  if (cp > 0.003) {
    txt('Cos ∘ (2·Atan)  =  Σ Cosₖ · (2·Atan)ᵏ', W / 2, 425, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: a * cp });
    const vals = COMP_C.slice(0, UN.n).map(fStr);
    jetRow(vals.map(() => '?'), 445, { x0: UN.x0, w: UN.w, h: UN.h, a: a * cp * (1 - clamp(settle * 4)), label: settle < 0.5 ? 'Cos∘(2Atan)' : '', lsize: 22, col: () => C.mag });
    jetRow(vals, 445, { x0: UN.x0, w: UN.w, h: UN.h, a: a * cp, rev: settle, label: settle >= 0.5 ? 'Cos∘(2Atan)' : '', lsize: 22, col: k => (COMP_C[k][0] === 0n ? C.dim : C.now) });
  }
  /* line 2: the Cayley row, matched column by column */
  const ca = a * at(S, 2, 0.6);
  if (ca > 0.003) {
    jetRow(CAYC.slice(0, UN.n), 545, { x0: UN.x0, w: UN.w, h: UN.h, a: ca, label: 'CayleyCos', lsize: 22, col: k => (CAYC[k][0] === 0n ? C.dim : C.cyan) });
    for (let k = 0; k < UN.n; k++) txt('=', UN.x0 + k * UN.w + (UN.w - 8) / 2, 533, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ca * clamp(at(S, 2, 1.5) * (UN.n + 1) - k) });
    txt('= (1 − η²)/(1 + η²)', UN.x0 + UN.n * UN.w - 8, 650, { size: 28, fam: F.math, w: 700, align: 'right', c: C.cyan, a: ca });
    const ss = COMP_S.slice(0, UN.n).map(fStr).join(', ');
    txt(`Sin∘(2Atan) = ${ss} = CayleySin = 2η/(1 + η²)`, UN.x0 - 180, 705, { size: 24, fam: F.math, w: 700, c: C.white, a: ca * at(S, 2, 0.6, 1.2) });
    const la = a * Q(S, 2, 'Lean checks', 0.6);
    const w1 = leanChip(UN.x0 - 180, 775, JA_LEAN.cos, la, 20);
    const w2 = leanChip(UN.x0 - 180 + w1 + 40, 775, JA_LEAN.sin, la, 20);
    txt('through every order N', UN.x0 - 180 + w1 + w2 + 80, 775, { size: 24, fam: F.mono, w: 700, c: C.lean, a: la * Q(S, 2, 'at every order N', 0.6) });
  }
  tag(UN.x0 - 180, 830, 'reading, not a theorem: the series re-expands the fraction', C.argued, a * at(S, 3, 0.6), 18);
};

/* ======================================================================= */
/*                            scene 5 · THE HALF AUDIT                       */
/* ======================================================================= */
const AU = { x0: 150, y0: 205, s: 2200, xmin: 0.48, ymax: 1.02 };
const auP = (x, y) => [AU.x0 + (x - AU.xmin) * AU.s, AU.y0 + (AU.ymax - y) * AU.s];
SCENES.audit = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed']]);
  /* which rows are revealed and which is current */
  const rev = [Q(S, 0, 'order two', 0.5), Q(S, 0, 'order four', 0.5), Q(S, 1, 'Every two orders', 0.5), Q(S, 1, 'minus one quarter', 0.5), Q(S, 2, 'At order twelve', 0.5)];
  let cur = -1; rev.forEach((r, i) => { if (r > 0) cur = i; });
  /* left: a piece of the unit circle near (3/5, 4/5) */
  const pa = a * at(S, 0, 0.8);
  curve(u => { const x = 0.48 + u * 0.18; return auP(x, Math.sqrt(1 - x * x)); }, 80, C.cyan, pa * 0.9, 2.5);
  const T = auP(0.6, 0.8);
  ring(T[0], T[1], 14, C.white, pa, 2.5);
  txt('(3/5, 4/5)', T[0] - 20, T[1] + 44, { size: 26, fam: F.math, w: 700, c: C.white, a: pa, align: 'right' });
  txt('Cayley: one step, error 0', AU.x0, 838, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: pa });
  AUDIT.forEach((r, i) => {
    const ra = a * rev[i];
    if (ra <= 0.003) return;
    const P = auP(fNum(r.U), fNum(r.V)), now = i === cur;
    dashed(T[0], T[1], P[0], P[1], now ? C.now : C.dim, ra * (now ? 0.9 : 0.4), 2);
    dot(P[0], P[1], now ? 15 : 9, now ? 'g' : 'c', ra);
    txt(`N=${r.N}`, P[0] + (i === 1 ? -16 : 16), P[1] - 12, { align: i === 1 ? 'right' : 'left', size: 22, fam: F.math, w: 700, c: now ? C.now : C.dim, a: ra * (i < 2 || now ? 1 : 0) });
  });
  /* right: the exact table */
  const tx = 720, cols = [tx + 30, tx + 220, tx + 450, tx + 690, tx + 900];
  panel(tx - 20, 190, 1100, 520, pa, C.cyan, 'η = 1/2 · TRUNCATED ROWS · EXACT');
  ['N', 'U(1/2)', 'U − 3/5', 'V(1/2)', 'V − 4/5'].forEach((h, j) => txt(h, cols[j], 270, { size: 24, fam: F.mono, w: 700, c: C.dim, a: pa }));
  AUDIT.forEach((r, i) => {
    const ra = a * rev[i], y = 345 + i * 78, now = i === cur;
    const vals = [String(r.N), fStr(r.U), fSigned(r.eU), fStr(r.V), fSigned(r.eV)];
    vals.forEach((s, j) => txt(s, cols[j], y, { size: 32, fam: F.math, w: 700, c: now ? C.now : j === 0 ? C.white : j % 2 ? C.white : C.mag, a: ra }));
    if (i >= 1 && i <= 3 && rev[2] > 0) txt('× (−1/4)', cols[2] + 10, y - 38, { size: 20, fam: F.math, w: 700, c: C.now, a: a * rev[2] * ra * (i === 4 ? 0 : 1) });
  });
  txt('canonical polynomials of degree ≤ N, evaluated at 1/2', tx, 760, { size: 22, fam: F.mono, w: 700, c: C.dim, a: pa });
};

/* ======================================================================= */
/*                            scene 6 · MACHIN'S CHAIN                       */
/* ======================================================================= */
const MC = { cx: 420, cy: 560, r: 300 };
SCENES.machin = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* left: rays of the integer pairs (q, p) on a quarter circle */
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(MC.cx, MC.cy, MC.r, -Math.PI / 2 - 0.05, 0.05); ctx.stroke(); ctx.restore();
  line(MC.cx, MC.cy, MC.cx + MC.r + 30, MC.cy, C.dim, a * 0.7, 1.5);
  line(MC.cx, MC.cy, MC.cx, MC.cy - MC.r - 30, C.dim, a * 0.7, 1.5);
  const rays = [[5, 1, '1/5', Q(S, 1, 'Start at one fifth', 0.6)], [12, 5, '5/12', Q(S, 1, 'five twelfths', 0.6)],
    [119, 120, '120/119', Q(S, 1, 'one hundred twenty over', 0.6)], [1, 1, '1', Q(S, 2, 'top and bottom', 0.6)]];
  let cur = -1; rays.forEach((r, i) => { if (r[3] > 0) cur = i; });
  rays.forEach(([q, p, lab, r], i) => {
    if (r <= 0.003) return;
    const n = Math.hypot(q, p), x = MC.cx + MC.r * q / n, y = MC.cy - MC.r * p / n, now = i === cur;
    line(MC.cx, MC.cy, x, y, now ? C.now : i === 3 ? C.cyan : C.dim, a * r, now ? 3.5 : 2);
    dot(x, y, now ? 14 : 9, now ? 'g' : 'c', a * r);
    const off = i === 2 ? [-150, -18] : i === 3 ? [18, -14] : [16, 8];
    if (i === 3 || !(cur === 3 && i === 2)) txt(i === 3 ? '1  =  [1 : 1]' : lab, x + off[0], y + off[1], { size: 28, fam: F.math, w: 700, c: now ? C.now : C.white, a: a * r });
  });
  /* right: the rule and the chain */
  const px = 860, ra = a * at(S, 0, 0.6, 0.6);
  txt('u ⊕ v = (u + v) / (1 − uv)', px, 240, { size: 40, fam: F.math, w: 700, c: C.white, a: ra });
  txt('u ⊖ v = (u − v) / (1 + uv)', px, 295, { size: 28, fam: F.math, w: 700, c: C.dim, a: ra });
  const chain = [
    [`t₁ = ${fStr(T1)}`, 1, 'Start at one fifth', C.white],
    [`t₂ = t₁ ⊕ t₁ = (2/5) / (24/25) = ${fStr(T2)}`, 1, 'five twelfths', C.white],
    [`t₄ = t₂ ⊕ t₂ = (5/6) / (119/144) = ${fStr(T4)}`, 1, 'one hundred twenty over', C.white],
    ['t₄ ⊖ 1/239 = (120·239 − 119) / (119·239 + 120)', 2, 'Subtract one over', C.white],
    [`= ${CH_NUM} / ${CH_DEN} = ${fStr(CHAIN)}`, 2, 'top and bottom', C.now]
  ];
  chain.forEach(([s, k, ph, col], i) => txt(s, px, 385 + i * 72, { size: i === 4 ? 40 : 30, fam: F.math, w: 700, c: col, a: a * Q(S, k, ph, 0.6) }));
  txt('28561 = 13⁴', px + 640, 673, { size: 30, fam: F.math, w: 700, c: C.cyan, a: a * Q(S, 2, 'thirteen to the fourth', 0.6) });
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  const lw = leanChip(px, 780, JA_LEAN.machin, la, 22);
  txt('no π, no arctan', px + lw + 30, 780, { size: 26, fam: F.math, w: 700, c: C.lean, a: a * Q(S, 3, 'No pi', 0.6) });
};

/* ======================================================================= */
/*                           scene 7 · PI-FREE BRACKETS                      */
/* ======================================================================= */
const NL = { x0: 230, x1: 1690, lo: 3.135, hi: 3.19, y: 270 };
const nlX = v => NL.x0 + (v - NL.lo) / (NL.hi - NL.lo) * (NL.x1 - NL.x0);
const BC = { x0: 300, step: 80, bw: 54, base: 790, k: 13 };
SCENES.bracket = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  /* top: the endpoint formula, then the number line */
  const fa = a * at(S, 0, 0.6);
  txt('L, U = 16 · A(1/5) − 4 · A(1/239),  A = alternating sum cut after M or M + 1 terms', W / 2, 200, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: fa });
  const na = a * Q(S, 1, 'At order one', 0.6);
  if (na > 0.003) {
    line(NL.x0, NL.y, NL.x1, NL.y, C.dim, na, 2);
    for (let i = 0; i <= 5; i++) { const v = 3.14 + i * 0.01, x = nlX(v); line(x, NL.y - 8, x, NL.y + 8, C.dim, na, 2); txt(v.toFixed(2), x, NL.y + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: na }); }
    const xl = nlX(fNum(BR[1].L)), xu = nlX(fNum(BR[1].U));
    fillBox(xl, NL.y - 16, xu - xl, 32, C.now, na * 0.25);
    box(xl, NL.y - 16, xu - xl, 32, C.now, na, 2.5);
    txt(`L₁ = ${CH.L1} ≈ ${fDec(BR[1].L, 6)}`, xl, NL.y - 30, { size: 24, fam: F.math, w: 700, c: C.now, a: na });
    txt(`U₁ = ${CH.U1} ≈ ${fDec(BR[1].U, 6)}`, xu, NL.y + 70, { size: 24, fam: F.math, w: 700, align: 'right', c: C.now, a: na * Q(S, 1, 'three point one eight', 0.6) });
    /* M = 2 inside it */
    const m2 = a * Q(S, 2, 'Each order shrinks', 0.6);
    const x2l = nlX(fNum(BR[2].L)), x2u = nlX(fNum(BR[2].U));
    fillBox(x2l, NL.y - 24, Math.max(3, x2u - x2l), 48, C.cyan, m2 * 0.7);
    txt('M = 2', (x2l + x2u) / 2, NL.y + 70, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: m2 * (1 - Q(S, 1, 'three point one eight', 0.1) * 0) });
  }
  /* bottom: digits locked, −log₁₀ W_M, for M = 1 … 17 */
  const ga = a * Q(S, 2, 'Each order shrinks', 0.6);
  if (ga > 0.003) {
    txt('decimal digits locked:  −log₁₀ W  ·  order M = 1 … 17', BC.x0 - 40, 387, { size: 24, fam: F.mono, w: 700, c: C.dim, a: ga });
    const grow = Q(S, 2, 'Each order shrinks', 3.5);
    for (let M = 1; M <= MMAX; M++) {
      const g = clamp(grow * MMAX - (M - 1)); if (g <= 0) continue;
      const hgt = digits(BR[M].W) * BC.k * eo(g), x = BC.x0 + (M - 1) * BC.step;
      const now = M === MMAX && Q(S, 2, 'by order seventeen', 0.4) > 0;
      fillBox(x, BC.base - hgt, BC.bw, hgt, now ? C.now : C.cyan, ga * (now ? 0.55 : 0.35));
      box(x, BC.base - hgt, BC.bw, hgt, now ? C.now : C.cyan, ga * g, 1.5);
      txt(String(M), x + BC.bw / 2, BC.base + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga * g });
    }
    dashed(BC.x0 + BC.bw / 2, 572, BC.x0 + BC.bw / 2, BC.base - digits(BR[1].W) * BC.k - 8, C.white, ga * 0.6, 1.5);
    txt(`W₁ = ${CH.widths[1]}`, BC.x0, 560, { size: 22, fam: F.math, w: 700, c: C.white, a: ga });
    const q17 = a * Q(S, 2, 'by order seventeen', 0.6);
    txt(`W₁₇ = ${sciStr(BR[17].W)}`, BC.x0 + 16 * BC.step + BC.bw, BC.base - digits(BR[17].W) * BC.k - 20, { size: 26, fam: F.math, w: 700, align: 'right', c: C.now, a: q17 });
    txt('≈ 25× narrower per order', BC.x0 + 760, 387, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: ga * at(S, 2, 0.6, 2.5) });
  }
  const sa = a * at(S, 3, 0.6);
  tag(BC.x0 - 40, 470, 'only in the classical shadow ℝ is the nested intersection called π', C.argued, sa, 20);
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  const L1 = lineAt(S, 1);
  const ba = clamp(S.u / 0.5) * (1 - clamp((S.u - L1.s + 0.6) / 0.5));
  if (ba > 0.003) {
    badge(ba, 'argued');
    chip(W / 2 - 360, 470, 520, 120, 'D · local jets', C.cyan, ba, 40, F.math);
    arrow(W / 2 - 80, 470, W / 2 + 80, 470, C.now, ba * Q(S, 0, 'next, integration', 0.6), 4);
    chip(W / 2 + 360, 470, 520, 120, '∫ · no subdivision', C.mag, ba * Q(S, 0, 'next, integration', 0.6), 40, F.math);
    txt('chapter 8  →  chapter 9', W / 2, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ba * Q(S, 0, 'without subdividing', 0.6) });
  }
  if (S.u > L1.s - 0.5) badge(clamp((S.u - L1.s + 0.5) / 0.5) * clamp((S.d - S.u) / 0.5), 'lean');
  closingCard(S, { from: L1.s - 0.3, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const si = 3, sc = TL.scenes[si], t = sc.start + 4;
  background(t, sc, si, 4);
  txt(DATA.film.title_zh, W / 2, 250, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('JETS OF ANY ORDER', W / 2, 345, { size: 56, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 6 });
  txt('Cos ∘ (2·Atan)  ≡  (1 − η²)/(1 + η²)', W / 2, 440, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white });
  jetRow(CAYC.slice(0, 9), 500, { x0: 330, w: 145, h: 70, a: 1, col: k => (CAYC[k][0] === 0n ? C.dim : C.now) });
  txt(`1/5  →  5/12  →  120/119  →  ${CH_NUM}/${CH_DEN} = 1`, W / 2, 680, { size: 40, fam: F.math, w: 700, align: 'center', c: C.mag });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, sc);
  post(0);
};
