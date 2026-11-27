/* Film · A Symbol Whose Cube Vanishes · 立方为零的符号 (book omega-math, chapter 7). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 7 of the book):
     ghosts   the jet ring J2(Q) = Q[η]/(η³) of def-ch07-jet2-ring: a quantity is three rational slots and the product
              is the truncated Cauchy product; η, η·η, η²·η are recomputed here with that product (computed). The
              Berkeley quotation is the chapter's historical opening (argued).
     divide   the two-term inverse (a0 + a1 η + a2 η²)⁻¹ = (1/a0, −a1/a0², (a1² − a0 a2)/a0³) of 7.1.1 and its check
              grade by grade: LEAN mul_inv (thm-ch07-jet2-algebra-and-chain, part 2). The worked jet a = (2, 2, 1) and
              its inverse (1/2, −1/2, 1/4) are computed here. The chain rule (g∘f)' = g'f', (g∘f)'' = g''f'² + g'f''
              at zero inner shift: LEAN chain_rule (part 3); the example g = (1, 2, 3), f = (0, 1/2, 1/4) is computed.
     shell    the arc microstep x(η) = x0(1 + ηv − ½η²‖v‖²) of def-ch07-arc-microstep and its unit norm mod η³ (the
              chapter's hand derivation, argued); the real step t = 1/2 with ‖v‖ = 1 (flat 1 + t² = 5/4, arc
              1 + t⁴/4 = 65/64) is computed here; the past/present/future reading of the three grades is the
              chapter's MODEL reading (argued).
     kappa    the fidelity kernel κ(x) = 1/(1 + x²): its jet from the closed-form inverse (hand derivation, argued);
              the triple (1/2, −1/2, 1/4) at x = 1: LEAN kappa_jet_one (thm-ch07-fidelity-jet-and-secant, part 2);
              the four anchors of ex-ch07-fidelity-jet-table are computed here and compared with the table.
     secant   the exact secant discrepancy E(x, h) = h(3x² + 2xh − 1)/((1 + x²)²(1 + (x + h)²)): LEAN
              kappa_secant_discrepancy (part 3); −18/41, +5/82 at (1, 1/4) and E = 0 at (1/2, 1/4) with the curvature
              term −16/125 are computed here (also by direct differences).
     drift    the α-sampling drift ‖x‖² − 1 ≡ (1 − 2α)‖x − x0‖²: LEAN alpha_sampling_norm_drift; the unit norm of the
              midpoint step: LEAN midpoint_unit_norm; the five weights of ex-ch07-midpoint-drift-audit (23/9, 135/79,
              1, 79/135, 9/23) are recomputed here by exact quaternion algebra. The circle is the plane of x0 and a,
              drawn to scale.
     halves   the midpoint (11, 18, 12, 6)/25, the heap step (−383, 396, 264, 132)/625 and the equal half-step
              fidelities 121/625 (computed); the equality itself: LEAN midpoint_half_step_fidelity. Itô and
              Stratonovich are the chapter's literature remark (argued).
   On load, FILM.init re-derives every number on screen by a second route and compares the copied table values with
   the chapter; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const JT_P = 'D5/S3/Quantum/AURICOmega/';
const JT_LEAN = {
  inv: JT_P + 'OmegaJetCalculus.mul_inv',
  chain: JT_P + 'OmegaJetCalculus.chain_rule',
  one: JT_P + 'OmegaJetCalculus.kappa_jet_one',
  secant: JT_P + 'OmegaJetCalculus.kappa_secant_discrepancy',
  drift: JT_P + 'OmegaSphericalHaarMidpoint.alpha_sampling_norm_drift',
  unit: JT_P + 'OmegaSphericalHaarMidpoint.midpoint_unit_norm',
  half: JT_P + 'OmegaSphericalHaarMidpoint.midpoint_half_step_fidelity'
};

/* ---------------- exact rationals ---------------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const fr = (n, d = 1) => { if (d === 0) throw new Error('zero denominator'); const g = gcd(n, d) * (d < 0 ? -1 : 1); return [n / g, d / g]; };
const fAdd = (x, y) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const fSub = (x, y) => fr(x[0] * y[1] - y[0] * x[1], x[1] * y[1]);
const fMul = (x, y) => fr(x[0] * y[0], x[1] * y[1]);
const fDiv = (x, y) => fr(x[0] * y[1], x[1] * y[0]);
const fNeg = x => [-x[0], x[1]];
const fEq = (x, y) => x[0] * y[1] === y[0] * x[1];
const fNum = x => x[0] / x[1];
const fStr = x => { const s = x[1] === 1 ? String(Math.abs(x[0])) : `${Math.abs(x[0])}/${x[1]}`; return x[0] < 0 ? '−' + s : s; };
const fSgn = x => (x[0] > 0 ? '+' + fStr(x) : fStr(x));
const F0 = fr(0), F1 = fr(1), F2 = fr(2);

/* ---------------- the jet ring J2(Q): a = (a0, a1, a2), truncated Cauchy product ---------------- */
const jMul = (a, b) => [fMul(a[0], b[0]), fAdd(fMul(a[0], b[1]), fMul(a[1], b[0])),
  fAdd(fAdd(fMul(a[0], b[2]), fMul(a[1], b[1])), fMul(a[2], b[0]))];
const jAdd = (a, b) => a.map((v, i) => fAdd(v, b[i]));
const jScale = (k, a) => a.map(v => fMul(k, v));
/* the closed form of 7.1.1: r = 1/a0, u = a1 r, v = a2 r, inv = (r, −r u, r (u² − v)) */
const jInv = a => { const r = fDiv(F1, a[0]), u = fMul(a[1], r), v = fMul(a[2], r); return [r, fNeg(fMul(r, u)), fMul(r, fSub(fMul(u, u), v))]; };
const jStr = a => `(${a.map(fStr).join(', ')})`;
const jEq = (a, b) => a.every((v, i) => fEq(v, b[i]));
const ETA = [F0, F1, F0], ONE = [F1, F0, F0];
const ETA2 = jMul(ETA, ETA), ETA3 = jMul(ETA2, ETA);
/* the worked inverse: a = (2, 2, 1) is the denominator jet of κ at x = 1 */
const JA = [F2, F2, F1], JAI = jInv(JA), JAA = jMul(JA, JAI);
/* the chain-rule example: g = (1, 2, 3), f = (0, 1/2, 1/4); g∘f = g0 + g1 f + g2 f² */
const JG = [F1, F2, fr(3)], JF = [F0, fr(1, 2), fr(1, 4)];
const JGF = jAdd(jAdd([JG[0], F0, F0], jScale(JG[1], JF)), jScale(JG[2], jMul(JF, JF)));
const first = a => a[1], second = a => fMul(F2, a[2]);

/* ---------------- the fidelity kernel κ(x) = 1/(1 + x²) and its jet ---------------- */
const kap = x => fDiv(F1, fAdd(F1, fMul(x, x)));
const kJet = x => jInv([fAdd(F1, fMul(x, x)), fMul(F2, x), F1]);
const kJetDirect = x => { const D = fAdd(F1, fMul(x, x)); return [fDiv(F1, D), fDiv(fMul(fr(-2), x), fMul(D, D)), fDiv(fSub(fMul(fr(3), fMul(x, x)), F1), fMul(D, fMul(D, D)))]; };
const secSlope = (x, h) => fDiv(fSub(kap(fAdd(x, h)), kap(x)), h);
const secErr = (x, h) => fSub(secSlope(x, h), kJet(x)[1]);
const secErrClosed = (x, h) => { const D0 = fAdd(F1, fMul(x, x)), xh = fAdd(x, h), D1 = fAdd(F1, fMul(xh, xh));
  return fDiv(fMul(h, fSub(fAdd(fMul(fr(3), fMul(x, x)), fMul(F2, fMul(x, h))), F1)), fMul(fMul(D0, D0), D1)); };
const KT = [[fr(0), '1', '0', '−1'], [fr(1, 2), '4/5', '−16/25', '−16/125'], [fr(1), '1/2', '−1/2', '1/4'], [fr(2), '1/5', '−4/25', '11/125']];

/* ---------------- rational quaternions and the α-sampled step ---------------- */
const qMul = (p, q) => [
  fSub(fSub(fSub(fMul(p[0], q[0]), fMul(p[1], q[1])), fMul(p[2], q[2])), fMul(p[3], q[3])),
  fSub(fAdd(fAdd(fMul(p[0], q[1]), fMul(p[1], q[0])), fMul(p[2], q[3])), fMul(p[3], q[2])),
  fAdd(fAdd(fSub(fMul(p[0], q[2]), fMul(p[1], q[3])), fMul(p[2], q[0])), fMul(p[3], q[1])),
  fAdd(fSub(fAdd(fMul(p[0], q[3]), fMul(p[1], q[2])), fMul(p[2], q[1])), fMul(p[3], q[0]))
];
const qConj = p => [p[0], fNeg(p[1]), fNeg(p[2]), fNeg(p[3])];
const qN2 = p => p.reduce((s, v) => fAdd(s, fMul(v, v)), F0);
const qDot = (p, q) => p.reduce((s, v, i) => fAdd(s, fMul(v, q[i])), F0);
const qInv = p => { const n = qN2(p); return qConj(p).map(v => fDiv(v, n)); };
const qSub = (p, q) => p.map((v, i) => fSub(v, q[i]));
const qLin = (s, k, a) => [fAdd(s, fMul(k, a[0])), fMul(k, a[1]), fMul(k, a[2]), fMul(k, a[3])];  // s + k a
const SIG = [fr(1, 2), fr(1, 3), fr(1, 6)];
const QA = [F0, ...SIG.map(v => fMul(fr(-2), v))];     // a = −2σ, so A = −a = (0, 1, 2/3, 1/3)
const QX0 = [F1, F0, F0, F0];
/* x = (1 + α a)⁻¹ (1 − (1 − α) a) x0 */
const alphaSample = al => qMul(qMul(qInv(qLin(F1, al, QA)), qLin(F1, fNeg(fSub(F1, al)), QA)), QX0);
const ALPHAS = [fr(0), fr(1, 4), fr(1, 2), fr(3, 4), fr(1)];
const DRIFT = ALPHAS.map(al => { const x = alphaSample(al); return { al, x, n2: qN2(x), dx2: qN2(qSub(x, QX0)) }; });
const DRIFT_BOOK = [['23/9', '+14/9'], ['135/79', '+56/79'], ['1', '0'], ['79/135', '−56/135'], ['9/23', '−14/23']];
const XH = DRIFT[2].x;                                   // the midpoint
const X1 = qMul(qMul(XH, qConj(QX0)), XH);               // heap step [x½, x0, x½] = x½ x̄0 x½
const kapQ = (p, q) => fDiv(fMul(qDot(p, q), qDot(p, q)), fMul(qN2(p), qN2(q)));
const FID1 = kapQ(QX0, XH), FID2 = kapQ(XH, X1);
const qNumStr = (p, den) => `(${p.map(v => fStr(fMul(v, fr(den)))).join(', ')}) / ${den}`;

/* ---------------- the shell step: x0 up, v to the right, ‖v‖ = 1, real step t ---------------- */
const TSTEP = fr(1, 2);
const FLAT2 = fAdd(F1, fMul(TSTEP, TSTEP));                                   // ‖(t, 1)‖²
const ARCQ = fSub(F1, fMul(fr(1, 2), fMul(TSTEP, TSTEP)));                    // 1 − t²/2
const ARC2 = fAdd(fMul(TSTEP, TSTEP), fMul(ARCQ, ARCQ));                      // ‖(t, 1 − t²/2)‖²

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a-symbol-whose-square-vanishes film: ' + m); };
  /* 0. the cited theorems */
  check((DATA.lean || []).length === 7, `film.json cites ${(DATA.lean || []).length} declarations, expected 7`);
  for (const gid of Object.values(JT_LEAN)) { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); }
  /* 1. η, η², η³ */
  check(jStr(ETA2) === '(0, 0, 1)' && jStr(ETA3) === '(0, 0, 0)', `eta powers ${jStr(ETA2)} ${jStr(ETA3)}`);
  /* 2. the inverse: closed form, multiply back, and by the series 1 − u + u² with u = (a1 η + a2 η²)/a0 */
  check(jStr(JAI) === '(1/2, −1/2, 1/4)' && jEq(JAA, ONE), `inverse ${jStr(JAI)} · ${jStr(JAA)}`);
  const u = [F0, fDiv(JA[1], JA[0]), fDiv(JA[2], JA[0])];
  const ser = jScale(fDiv(F1, JA[0]), jAdd(jAdd(ONE, jScale(fr(-1), u)), jMul(u, u)));
  check(jEq(ser, JAI), 'series route to the inverse');
  for (let i = 1; i <= 6; i++) {                       // the closed form on more jets with a0 ≠ 0
    const a = [fr(i * 3 - 10 || 1, i), fr(7 - 2 * i, 3), fr(i * i - 5, 4)], p = jMul(a, jInv(a));
    check(jEq(p, ONE), `closed-form inverse fails on ${jStr(a)}`);
  }
  /* 3. the chain rule example */
  check(jStr(JGF) === '(1, 1, 5/4)', `g∘f = ${jStr(JGF)}`);
  check(fEq(first(JGF), fMul(first(JG), first(JF))) && fStr(first(JGF)) === '1', 'first-order chain rule');
  check(fEq(second(JGF), fAdd(fMul(second(JG), fMul(first(JF), first(JF))), fMul(first(JG), second(JF)))) && fStr(second(JGF)) === '5/2', 'second-order chain rule');
  check(fStr(second(JG)) === '6' && fStr(second(JF)) === '1/2', 'g″ = 6, f″ = 1/2');
  /* 4. the shell step */
  check(fStr(FLAT2) === '5/4' && fStr(ARC2) === '65/64', `flat ${fStr(FLAT2)} arc ${fStr(ARC2)}`);
  check(fEq(ARC2, fAdd(F1, fDiv(fMul(fMul(TSTEP, TSTEP), fMul(TSTEP, TSTEP)), fr(4)))), 'arc = 1 + t⁴/4');
  /* 5. the fidelity jets: inverse route against the direct formula and the chapter's table */
  for (const [x, k0, k1, k2] of KT) {
    const a = kJet(x), b = kJetDirect(x);
    check(jEq(a, b), `kappa jet routes differ at ${fStr(x)}`);
    check(fStr(a[0]) === k0 && fStr(a[1]) === k1 && fStr(a[2]) === k2, `kappa jet at ${fStr(x)}: ${jStr(a)}`);
    check(fEq(a[0], kap(x)), `kappa(${fStr(x)})`);
  }
  /* 6. the secant discrepancy: direct difference against the closed form, and the chapter's numbers */
  const cases = [[fr(1), fr(1, 4), '5/82'], [fr(1, 2), fr(1, 4), '0'], [fr(1, 3), fr(1), '0'], [fr(-1), fr(2), '−1/2']];
  for (const [x, h, e] of cases) {
    check(fEq(secErr(x, h), secErrClosed(x, h)), `secant routes differ at (${fStr(x)}, ${fStr(h)})`);
    check(fStr(secErr(x, h)) === e, `E(${fStr(x)}, ${fStr(h)}) = ${fStr(secErr(x, h))}`);
  }
  check(fStr(secSlope(fr(1), fr(1, 4))) === '−18/41', 'secant slope −18/41');
  check(fStr(secSlope(fr(1, 2), fr(1, 4))) === '−16/25' && fStr(kJet(fr(1, 2))[1]) === '−16/25', 'zero-bias secant slope −16/25');
  check(fEq(fSub(kap(fr(5, 4)), fAdd(kap(fr(1)), fMul(fr(1, 4), fr(-1, 2)))), fMul(fr(1, 4), fr(5, 82))), 'gap at x + h is h·E');
  /* 7. the drift audit: quaternion algebra, the chapter's closed form, the drift law, and the table */
  check(fStr(qN2(QA)) === '14/9', `‖a‖² = ${fStr(qN2(QA))}`);
  DRIFT.forEach((r, i) => {
    const al = r.al, k = qN2(QA), om = fSub(F1, al);
    const closed = fDiv(fAdd(F1, fMul(fMul(om, om), k)), fAdd(F1, fMul(fMul(al, al), k)));
    check(fEq(r.n2, closed), `closed form at α = ${fStr(al)}`);
    const drift = fSub(r.n2, F1);
    check(fEq(drift, fMul(fSub(F1, fMul(F2, al)), r.dx2)), `drift law at α = ${fStr(al)}`);
    check(fStr(r.n2) === DRIFT_BOOK[i][0] && fSgn(drift).replace('+0', '0') === DRIFT_BOOK[i][1], `row α = ${fStr(al)}: ${fStr(r.n2)} ${fSgn(drift)}`);
    /* the step equation (1 + α a) x = (1 − (1 − α) a) x0 */
    const lhs = qMul(qLin(F1, al, QA), r.x), rhs = qMul(qLin(F1, fNeg(om), QA), QX0);
    check(lhs.every((v, j) => fEq(v, rhs[j])), `step equation at α = ${fStr(al)}`);
  });
  /* 8. the midpoint, the heap step and the half-step fidelities */
  check(qNumStr(XH, 25) === '(11, 18, 12, 6) / 25', `midpoint ${qNumStr(XH, 25)}`);
  check(qNumStr(X1, 625) === '(−383, 396, 264, 132) / 625' && fStr(qN2(X1)) === '1', `heap step ${qNumStr(X1, 625)}`);
  check(fStr(FID1) === '121/625' && fStr(FID2) === '121/625', `fidelities ${fStr(FID1)} ${fStr(FID2)}`);
  const cayley = qMul(qMul(qInv(qLin(F1, F1, [F0, ...SIG.map(fNeg)])), qLin(F1, F1, [F0, ...SIG])), QX0);  // (1 − σ)⁻¹(1 + σ)
  check(cayley.every((v, j) => fEq(v, XH[j])), 'midpoint = Cayley rotor (1 − σ)⁻¹(1 + σ) x0');
  check(fEq(qN2([F0, ...SIG]), fr(7, 18)), '‖σ‖² = 7/18');
});
Object.assign(FILM.speed, { ghosts: 0.02, divide: 0.014, shell: 0.014, kappa: 0.016, secant: 0.016, drift: 0.016, halves: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const JT_MISSING = new Set();
function leanChip(x, y, gid, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!JT_MISSING.has(gid)) { JT_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-1)[0], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function tag(x, y, s, col, a, size = 16) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.mono, 700, 1) + 20;
  box(x, y - size - 4, w, size + 12, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 10, y, { size, fam: F.mono, w: 700, c: col, a, ls: 1 });
}
const M = (s, x, y, size, c, a, o = {}) => txt(s, x, y, Object.assign({ size, fam: F.math, w: 600, c, a }, o));
const fadeScene = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
/* a one-off fade window: in at k0 (ramp 0.6 s), out at k1 (ramp 0.5 s) */
const win = (S, k0, off0, k1, off1) => at(S, k0, 0.6, off0) * (k1 == null ? 1 : 1 - at(S, k1, 0.5, off1));
const nowDot = (x, y, r, a) => { if (a <= 0.003) return; dotC(x, y, r * 0.55, C.now, a); ring(x, y, r * 0.9, C.now, a * 0.7, 2.5); };
const dotC = (x, y, r, col, a) => { if (a <= 0.003) return; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; };
function arcStroke(cx, cy, r, a0, a1, col, a, lw = 3) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
}

/* ======================================================================= */
/*                              scene 1 · NO GHOSTS                          */
/* ======================================================================= */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('A SYMBOL WHOSE CUBE VANISHES', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('η³ = 0 · TWO-TERM INVERSE · EXACT SLOPE · THE MIDPOINT', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}
const GRID = { x: 330, w: 112, gap: 14, y0: 470, dy: 92 };
const slotX = j => GRID.x + j * (GRID.w + GRID.gap);
function slotRow(label, jet, y, a, o = {}) {
  M(label, GRID.x - 40, y + 14, 40, C.white, a, { align: 'right' });
  for (let j = 0; j < 3; j++) {
    const x = slotX(j), v = jet[j], nz = v[0] !== 0;
    const hide = o.hide === j ? o.hideA : 1;
    box(x, y - 32, GRID.w, 64, nz ? C.cyan : C.dim, a, nz ? 2.4 : 1.4, 'rgba(0,0,0,0.45)');
    M(fStr(v), x + GRID.w / 2, y + 14, 38, nz ? C.cyan : C.dim, a * hide, { align: 'center', w: 700 });
  }
}
SCENES.ghosts = S => {
  title(S);
  const A = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (A <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* line 0: the old recipe and Berkeley's ghosts */
  const oa = A * win(S, 0, 0, 1, 0);
  if (oa > 0.003) {
    panel(330, 250, 1260, 430, oa, C.argued, 'THE OLD RECIPE · 旧配方');
    const fl = 0.45 + 0.55 * Math.abs(Math.sin(S.u * 3.1));
    M('slope ≈ (f(x + h) − f(x)) / h', 960, 380, 54, C.white, oa, { align: 'center' });
    M('divide by  h ≠ 0 , then set  h = 0', 960, 470, 36, C.mag, oa * fl, { align: 'center' });
    txt('“the ghosts of departed quantities”', 960, 570, { size: 36, fam: F.disp, w: 600, align: 'center', c: C.argued, a: oa * at(S, 0, 0.6, 2.2) });
    txt('— G. BERKELEY, 1734', 960, 625, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: oa * at(S, 0, 0.6, 2.6), ls: 3 });
  }
  /* line 1: η³ = 0, and the powers of η shift right until the 1 falls off */
  const ea = A * at(S, 1, 0.7, 0.2);
  if (ea > 0.003) {
    M('η³ = 0', 960, 300, 104, C.cyan, ea, { align: 'center', w: 700, ab: 2 });
    txt('one formal symbol · no limit · no real continuum', 960, 352, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ea, ls: 2 });
    ['η⁰', 'η¹', 'η²'].forEach((s, j) => M(s, slotX(j) + GRID.w / 2, GRID.y0 - 50, 26, C.dim, ea, { align: 'center' }));
    const r0 = ea * at(S, 1, 0.5, 0.9), r1 = ea * at(S, 1, 0.5, 1.6), r2 = ea * at(S, 1, 0.5, 2.3);
    slotRow('η', ETA, GRID.y0, r0);
    slotRow('η·η', ETA2, GRID.y0 + GRID.dy, r1);
    /* the third row: the 1 of η² slides right out of the last slot and falls */
    const fall = at(S, 1, 1.2, 2.8);
    slotRow('η²·η', ETA3, GRID.y0 + 2 * GRID.dy, r2, { hide: 2, hideA: clamp(fall * 2.2 - 0.3) });
    if (r2 > 0.003) {
      const y0 = GRID.y0 + 2 * GRID.dy + 14, f = fall;
      const x = slotX(2) + GRID.w / 2 + ease(clamp(f * 2)) * (GRID.w + 24), y = y0 + Math.pow(clamp(f * 2 - 1), 2) * 110;
      M('1', x, y, 38, C.mag, r2 * clamp(f * 8) * (1 - clamp((f - 0.6) / 0.4)), { align: 'center', w: 700 });
      txt('falls off', slotX(2) + GRID.w + 112, y0 - 4, { size: 22, fam: F.mono, w: 700, c: C.mag, a: r2 * clamp(f * 3 - 0.6) });
    }
  }
  /* line 2: one quantity = three slots, and the truncated product */
  const sa = A * at(S, 2, 0.7, 0.1);
  if (sa > 0.003) {
    panel(960, 400, 840, 420, sa, C.cyan, 'ONE QUANTITY = THREE SLOTS · 三格');
    const lab = [['a₀', 'value', '值'], ['a₁', 'slope', '斜率'], ['a₂', 'half bend', '弯曲的一半']];
    lab.forEach(([s, en, zh], j) => {
      const x = 1000 + j * 262, q = sa * at(S, 2, 0.5, 0.5 + 0.55 * j);
      box(x, 450, 238, 86, C.cyan, q, 2.2, 'rgba(0,0,0,0.45)');
      M(s, x + 119, 508, 44, C.cyan, q, { align: 'center', w: 700 });
      txt(en, x + 119, 572, { size: 24, fam: F.disp, w: 700, align: 'center', c: C.white, a: q });
      txt(zh, x + 119, 604, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: q });
    });
    const pa = sa * at(S, 2, 0.6, 2.6);
    M('f(x₀ + η) = f₀ + f′₀ η + ½ f″₀ η²', 1380, 676, 32, C.white, pa, { align: 'center' });
    M('a·b = (a₀b₀,  a₀b₁ + a₁b₀,  a₀b₂ + a₁b₁ + a₂b₀)', 1380, 744, 27, C.cyan, pa, { align: 'center' });
    txt('truncated product: every η³ term is dropped', 1380, 790, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
  }
};

/* ======================================================================= */
/*                            scene 2 · DIVISION STOPS                       */
/* ======================================================================= */
SCENES.divide = S => {
  const A = fadeScene(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const focusR = at(S, 3, 0.6);
  const la = A * (1 - 0.45 * focusR);
  panel(130, 190, 820, 640, la, C.cyan, 'TWO-TERM INVERSE · 两项求逆');
  /* line 0: the geometric series stops because u³ = 0 */
  const a0 = la * at(S, 0, 0.6, 0.2);
  M('1/(1 + u) = 1 − u + u²', 170, 285, 42, C.white, a0);
  const tx = 170 + tw('1/(1 + u) = 1 − u + u²', 42, F.math, 600) + 14;
  const st = at(S, 0, 0.6, 2.2);
  M('− u³ + …', tx, 285, 42, C.dim, a0 * (1 - 0.55 * st));
  line(tx - 6, 272, tx + tw('− u³ + …', 42, F.math, 600) + 6, 272, C.mag, a0 * st, 3.5);
  txt('u³ = 0', tx + 40, 330, { size: 22, fam: F.mono, w: 700, c: C.mag, a: a0 * st });
  /* line 1: the closed form and the worked jet a = (2, 2, 1) */
  const a1 = la * at(S, 1, 0.6, 0.1);
  const COL = [165, 255, 580, 712], ROWS = [470, 545, 620];
  txt('GRADE', COL[0], 400, { size: 16, fam: F.mono, w: 700, c: C.dim, a: a1, ls: 2 });
  txt('CLOSED FORM', COL[1], 400, { size: 16, fam: F.mono, w: 700, c: C.dim, a: a1, ls: 2 });
  txt('a = (2, 2, 1)', COL[2], 400, { size: 18, fam: F.math, w: 700, c: C.white, a: a1 });
  const forms = ['1/a₀', '−a₁/a₀²', '(a₁² − a₀a₂)/a₀³'];
  ['η⁰', 'η¹', 'η²'].forEach((g, i) => {
    const q = a1 * at(S, 1, 0.5, 0.6 + 0.5 * i);
    M(g, COL[0], ROWS[i], 30, C.dim, q);
    M(forms[i], COL[1], ROWS[i], 30, C.white, q);
    M(fStr(JAI[i]), COL[2], ROWS[i], 34, C.cyan, q, { w: 700 });
  });
  /* line 2: multiply back, grade by grade */
  const a2 = la * at(S, 2, 0.6, 0.1);
  txt('a · a⁻¹', COL[3], 400, { size: 18, fam: F.math, w: 700, c: C.white, a: a2 });
  const sums = ['2·½ = 1', '−1 + 1 = 0', '½ − 1 + ½ = 0'];
  sums.forEach((s, i) => M(s, COL[3], ROWS[i], 24, i === 0 ? C.cyan : C.white, a2 * at(S, 2, 0.4, 0.3 + 0.45 * i)));
  const ok = a2 * at(S, 2, 0.5, 1.6);
  M(`= ${jStr(JAA)} = 1`, COL[2], 690, 32, C.cyan, ok, { w: 700 });
  leanChip(COL[0], 760, JT_LEAN.inv, la * Q(S, 2, 'Lean checks'), 22);
  txt('a₀ = 0: no inverse', COL[2] + 30, 760, { size: 20, fam: F.math, w: 600, c: C.dim, a: la * Q(S, 2, 'finite, nonzero') });
  /* line 3: the chain rule at zero inner shift */
  const ra = A * focusR;
  if (ra > 0.003) {
    panel(1000, 190, 800, 640, ra, C.cyan, 'CHAIN RULE · f₀ = 0 · 链式法则');
    M('g = (1, 2, 3)     f = (0, 1/2, 1/4)', 1040, 280, 32, C.white, ra);
    M('g∘f = g₀ + g₁ f + g₂ f²', 1040, 350, 28, C.dim, ra * at(S, 3, 0.5, 0.4));
    M(`= ${jStr(JGF)}`, 1040, 412, 40, C.cyan, ra * at(S, 3, 0.5, 0.9), { w: 700 });
    const s1 = ra * Q(S, 3, 'slopes multiply'), s2 = ra * Q(S, 3, 'the bend collects');
    M(`(g∘f)′ = ${fStr(first(JGF))} = 2 · ½`, 1040, 500, 32, C.white, s1);
    M('= g′ f′', 1500, 500, 30, C.cyan, s1);
    M(`(g∘f)″ = ${fStr(second(JGF))} = 6 · ¼ + 2 · ½`, 1040, 580, 32, C.white, s2);
    M('= g″ f′² + g′ f″', 1500, 632, 30, C.cyan, s2);
    leanChip(1040, 730, JT_LEAN.chain, ra * Q(S, 3, 'Lean checks'), 22);
  }
};

/* ======================================================================= */
/*                           scene 3 · STAY ON THE SHELL                     */
/* ======================================================================= */
const SH = { cx: 510, cy: 560, R: 250 };
const shP = (p, q) => [SH.cx + p * SH.R, SH.cy - q * SH.R];
SCENES.shell = S => {
  const A = fadeScene(S);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, null, 'argued']]);
  /* the circle through x0 in the plane of x0 and v (‖v‖ = 1), drawn to scale */
  ring(SH.cx, SH.cy, SH.R, C.cyan, A * 0.55, 2);
  dotC(SH.cx, SH.cy, 4, C.dim, A);
  const X0 = shP(0, 1);
  dashed(X0[0] - 200, X0[1], X0[0] + 300, X0[1], C.dim, A * 0.5, 1.5);
  dot(X0[0], X0[1], 14, 'w', A);
  M('x₀', X0[0] - 52, X0[1] - 14, 32, C.white, A);
  txt('plane of x₀ and v · ‖v‖ = 1 · to scale', SH.cx, 840, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: A, ls: 1 });
  const t = fNum(TSTEP);
  const tf = ease(at(S, 0, 1.6, 0.8)) * t, ta = ease(at(S, 1, 1.6, 0.6)) * t;
  /* flat tangent step (magenta): (t, 1) */
  const fa = A * at(S, 0, 0.5, 0.6);
  if (fa > 0.003 && tf > 0.003) {
    const P = shP(tf, 1);
    arrow(X0[0], X0[1], P[0], P[1], C.mag, fa, 4);
    dashed(SH.cx, SH.cy, P[0], P[1], C.mag, fa * 0.6, 1.5);
    dotC(P[0], P[1], 8, C.mag, fa);
    txt('flat', P[0] + 16, P[1] - 18, { size: 22, fam: F.mono, w: 700, c: C.mag, a: fa });
  }
  /* arc step (cyan): (t, 1 − t²/2) */
  const aa = A * at(S, 1, 0.5, 0.4);
  if (aa > 0.003 && ta > 0.003) {
    ctx.save(); ctx.globalAlpha = aa; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const s = ta * i / 40, P = shP(s, 1 - s * s / 2); if (i) ctx.lineTo(P[0], P[1]); else ctx.moveTo(P[0], P[1]); }
    ctx.stroke(); ctx.restore();
    const P = shP(ta, 1 - ta * ta / 2);
    dot(P[0], P[1], 16, 'c', aa);
    txt('arc', P[0] + 20, P[1] + 34, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: aa });
  }
  /* right panel */
  panel(900, 190, 900, 640, A, C.cyan, 'ARC MICROSTEP · 圆弧微步');
  const r0 = A * at(S, 0, 0.6, 0.3);
  M('x₀(1 + ηv)', 940, 270, 34, C.mag, r0);
  M('‖·‖² = 1 + η²‖v‖²', 1240, 270, 34, C.mag, r0 * Q(S, 0, 'pokes out'));
  const r1 = A * at(S, 1, 0.6, 0.2);
  M('x(η) = x₀(1 + ηv − ½η²‖v‖²)', 940, 350, 34, C.cyan, r1, { w: 700 });
  M('‖x(η)‖² ≡ 1   (mod η³)', 940, 410, 34, C.cyan, r1 * Q(S, 1, 'exactly one'));
  txt('= the Cayley rotor of ½ηv (chapter 5) · hand derivation', 940, 452, { size: 18, fam: F.mono, w: 700, c: C.dim, a: r1 * Q(S, 1, 'modulo') });
  /* line 2: the real step t = 1/2; replaced by the causal table on line 3 */
  const r2 = A * win(S, 2, 0, 3, 0);
  if (r2 > 0.003) {
    M(`real step t = ${fStr(TSTEP)}`, 940, 530, 30, C.white, r2);
    M('flat   1 + t² =', 940, 600, 32, C.mag, r2 * Q(S, 2, 'flat'));
    M(fStr(FLAT2), 1250, 600, 40, C.mag, r2 * Q(S, 2, 'flat'), { w: 700 });
    M('arc    1 + t⁴/4 =', 940, 670, 32, C.cyan, r2 * Q(S, 2, 'arc'));
    M(fStr(ARC2), 1250, 670, 40, C.cyan, r2 * Q(S, 2, 'arc'), { w: 700 });
    txt('the t² terms cancel; only fourth order is left', 940, 730, { size: 20, fam: F.mono, w: 700, c: C.dim, a: r2 * Q(S, 2, 'arc', 0.5, 0.8) });
  }
  const r3 = A * at(S, 3, 0.6, 0.2);
  if (r3 > 0.003) {
    tag(940, 528, 'MODEL · 模型诠释', C.argued, r3);
    const T = [['0', 'past · 过去', 'η⁰', 'F₀'], ['1/2', 'present · 现在', 'η¹', 'Dᵥ F'], ['1', 'future · 未来', 'η²', '½ Dᵥ² F']];
    T.forEach((r, i) => {
      const y = 600 + i * 66, q = r3 * at(S, 3, 0.5, 0.5 + 0.5 * i);
      M(r[0], 950, y, 32, C.argued, q, { w: 700 });
      txt(r[1], 1040, y, { size: 26, fam: F.zh, w: 700, c: C.white, a: q });
      M(r[2], 1320, y, 30, C.dim, q);
      M(r[3], 1440, y, 32, C.cyan, q);
    });
  }
};

/* ======================================================================= */
/*                    the κ plot, shared by scenes 4 and 5                   */
/* ======================================================================= */
const kf = x => 1 / (1 + x * x);
const kd1 = x => -2 * x / Math.pow(1 + x * x, 2);
const kd2h = x => (3 * x * x - 1) / Math.pow(1 + x * x, 3);    // the η² coefficient
function kplot(V, a) {
  if (a <= 0.003) return;
  const X = x => V.px0 + (x - V.x0) / (V.x1 - V.x0) * (V.px1 - V.px0);
  const Y = k => V.py0 - (k - V.k0) / (V.k1 - V.k0) * (V.py0 - V.py1);
  line(V.px0, Y(V.kAxis), V.px1, Y(V.kAxis), C.dim, a * 0.7, 1.5);
  if (V.x0 <= 0 && V.x1 >= 0) line(X(0), V.py0, X(0), V.py1, C.dim, a * 0.5, 1.2);
  V.ticks.forEach(([x, s]) => { line(X(x), Y(V.kAxis) - 6, X(x), Y(V.kAxis) + 6, C.dim, a, 1.5); M(s, X(x), Y(V.kAxis) + 36, 22, C.dim, a, { align: 'center' }); });
  ctx.save(); ctx.beginPath(); ctx.rect(V.px0, V.py1 - 10, V.px1 - V.px0, V.py0 - V.py1 + 20); ctx.clip();
  curve(s => { const x = lerp(V.x0, V.x1, s); return [X(x), Y(kf(x))]; }, 160, C.white, a * 0.85, 3);
  ctx.restore();
  txt('κ(x) = 1/(1 + x²)', V.px1 - 10, V.py1 + 16, { size: 22, fam: F.math, w: 600, align: 'right', c: C.white, a: a * 0.85 });
  return { X, Y };
}

/* ======================================================================= */
/*                           scene 4 · THE FIDELITY JET                      */
/* ======================================================================= */
const KV = { x0: -0.75, x1: 2.5, px0: 150, px1: 960, k0: -0.1, k1: 1.15, py0: 790, py1: 200, kAxis: 0, ticks: [[0, '0'], [0.5, '1/2'], [1, '1'], [2, '2']] };
SCENES.kappa = S => {
  const A = fadeScene(S);
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  const pa = A * at(S, 0, 0.6, 0.1);
  const T = kplot(KV, pa);
  /* the anchor: 1 until line 3, then to 0 and to 2 */
  const m1 = ease(Q(S, 3, 'At zero', 0.9)), m2 = ease(Q(S, 3, 'at two', 1.0));
  const ax = m2 > 0 ? lerp(0, 2, m2) : lerp(1, 0, m1);
  const ja = A * at(S, 1, 0.6, 0.8);
  if (T && ja > 0.003) {
    ctx.save(); ctx.beginPath(); ctx.rect(KV.px0, KV.py1 - 10, KV.px1 - KV.px0, KV.py0 - KV.py1 + 20); ctx.clip();
    curve(s => { const d = lerp(-0.7, 0.7, s), x = ax + d; return [T.X(x), T.Y(kf(ax) + kd1(ax) * d + kd2h(ax) * d * d)]; }, 80, C.cyan, ja, 4);
    ctx.restore();
    txt('jet: value + slope + bend', KV.px0 + 20, KV.py1 + 16, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: ja });
  }
  if (T) {
    nowDot(T.X(ax), T.Y(kf(ax)), 18, pa);
    dashed(T.X(ax), T.Y(kf(ax)), T.X(ax), T.Y(0), C.now, pa * 0.6, 1.5);
  }
  /* right panel */
  panel(1010, 190, 790, 640, A, C.cyan, 'κ ON THREE SLOTS · 保真度射流');
  M('κ(x) = 1/(1 + x²)', 1050, 275, 44, C.white, pa, { w: 700 });
  const fa = A * win(S, 1, 0, 3, 0);
  if (fa > 0.003) {
    M('1 + (x₀ + η)² = (1 + x₀², 2x₀, 1)', 1050, 345, 28, C.white, fa);
    const rows = [['η⁰', '1/(1 + x₀²)'], ['η¹', '−2x₀/(1 + x₀²)²'], ['η²', '(3x₀² − 1)/(1 + x₀²)³']];
    rows.forEach(([g, s], i) => { const q = fa * at(S, 1, 0.5, 1.2 + 0.5 * i); M(g, 1050, 410 + i * 56, 26, C.dim, q); M(s, 1130, 410 + i * 56, 30, C.cyan, q); });
    txt('a₁² − a₀a₂ = 3x₀² − 1 · hand derivation', 1050, 560, { size: 18, fam: F.mono, w: 700, c: C.dim, a: fa * at(S, 1, 0.5, 2.6) });
  }
  /* line 3: the chapter's four anchors */
  const ta = A * at(S, 3, 0.6, 0);
  if (ta > 0.003) {
    const CX = [1060, 1200, 1350, 1530];
    ['x₀', 'κ', 'κ′', '½κ″'].forEach((h, j) => M(h, CX[j], 330, 24, C.dim, ta));
    const cur = m2 > 0.5 ? 3 : m1 > 0.5 ? 0 : 2;
    KT.forEach((r, i) => {
      const y = 385 + i * 52, c = i === cur ? C.now : C.white;
      M(fStr(r[0]), CX[0], y, 28, c, ta, { w: 700 });
      M(r[1], CX[1], y, 28, c, ta); M(r[2], CX[2], y, 28, c, ta); M(r[3], CX[3], y, 28, i === cur ? C.now : C.cyan, ta, { w: 700 });
    });
  }
  /* line 2: the triple at x = 1 */
  const oa = A * at(S, 2, 0.6, 0.1);
  if (oa > 0.003) {
    M('x₀ = 1', 1050, 640, 30, at(S, 3, 0.4) > 0.5 ? C.white : C.now, oa);
    M(jStr(kJet(F1)), 1200, 645, 56, C.cyan, oa, { w: 700, ab: 1 });
    leanChip(1050, 730, JT_LEAN.one, oa * Q(S, 2, 'Lean checks'), 22);
  }
};

/* ======================================================================= */
/*                          scene 5 · THE SECANT'S DEBT                      */
/* ======================================================================= */
const SV = { x0: 0.3, x1: 1.5, px0: 150, px1: 990, k0: 0.3, k1: 0.95, py0: 780, py1: 215, kAxis: 0.3, ticks: [[0.5, '1/2'], [0.75, '3/4'], [1, '1'], [1.25, '5/4']] };
SCENES.secant = S => {
  const A = fadeScene(S);
  badgeQ(S, [[0, null, 'computed'], [0, 'Lean checks', 'lean'], [1, null, 'computed']]);
  const T = kplot(SV, A);
  const mv = ease(at(S, 2, 1.0, 0.1));
  const x0 = lerp(1, 0.5, mv), h = 0.25;
  if (T) {
    const ca = A * at(S, 0, 0.6, 0.6);
    /* tangent (cyan): the true slope from the jet */
    const tl = d => [T.X(x0 + d), T.Y(kf(x0) + kd1(x0) * d)];
    let p = tl(-0.25), q = tl(0.45);
    ctx.save(); ctx.beginPath(); ctx.rect(SV.px0, SV.py1 - 10, SV.px1 - SV.px0, SV.py0 - SV.py1 + 20); ctx.clip();
    line(p[0], p[1], q[0], q[1], C.cyan, ca, 3.5);
    ctx.restore();
    /* the inflection point 3x² = 1, marked on the curve */
    const xi = 1 / Math.sqrt(3);
    const ia = A * at(S, 2, 0.6, 1.2);
    dotC(T.X(xi), T.Y(kf(xi)), 7, C.white, ia);
    txt('inflection · 3x² = 1', T.X(xi) + 14, T.Y(kf(xi)) - 16, { size: 20, fam: F.mono, w: 700, c: C.white, a: ia });
    /* chord (magenta) from x0 to x0 + h */
    const sa = A * at(S, 0, 0.6, 1.4);
    p = [T.X(x0), T.Y(kf(x0))]; q = [T.X(x0 + h), T.Y(kf(x0 + h))];
    line(p[0], p[1], q[0], q[1], C.mag, sa, 4);
    dot(q[0], q[1], 13, 'm', sa);
    M('h', (p[0] + q[0]) / 2, T.Y(SV.kAxis) - 14, 26, C.mag, sa, { align: 'center' });
    dashed(q[0], q[1], q[0], T.Y(SV.kAxis), C.mag, sa * 0.5, 1.2);
    /* the gap at x0 + h between tangent and curve is h·E */
    const ga = A * Q(S, 1, 'too high') * (1 - mv);
    if (ga > 0.003) {
      const yt = T.Y(kf(x0) + kd1(x0) * h), yk = q[1];
      line(q[0] + 20, yt, q[0] + 20, yk, C.now, ga, 3);
      line(q[0] + 12, yt, q[0] + 28, yt, C.now, ga, 3); line(q[0] + 12, yk, q[0] + 28, yk, C.now, ga, 3);
      M('h·E = 5/328', q[0] + 40, (yt + yk) / 2 + 9, 24, C.now, ga, { w: 700 });
    }
    nowDot(p[0], p[1], 17, A);
  }
  /* right panel */
  panel(1040, 190, 760, 640, A, C.mag, 'SECANT AGAINST JET · 割线与射流');
  const r0 = A * at(S, 0, 0.6, 0.2);
  M('E = (κ(x+h) − κ(x))/h − κ′(x)', 1075, 270, 28, C.white, r0);
  M('= h(3x² + 2xh − 1)', 1075, 322, 28, C.white, r0 * Q(S, 0, 'exact error'));
  M('  / ((1 + x²)²(1 + (x + h)²))', 1075, 366, 28, C.white, r0 * Q(S, 0, 'exact error'));
  leanChip(1075, 425, JT_LEAN.secant, A * Q(S, 0, 'Lean checks'), 20);
  /* line 1: (1, 1/4) */
  const r1 = A * win(S, 1, 0, 2, 0);
  if (r1 > 0.003) {
    M('x = 1,  h = 1/4', 1075, 500, 30, C.now, r1);
    M('secant', 1075, 560, 28, C.mag, r1); M(fStr(secSlope(F1, fr(1, 4))), 1260, 560, 34, C.mag, r1, { w: 700 });
    M('tangent', 1075, 610, 28, C.cyan, r1); M(fStr(kJet(F1)[1]), 1260, 610, 34, C.cyan, r1, { w: 700 });
    M(`E = ${fSgn(secErr(F1, fr(1, 4)))}`, 1075, 690, 48, C.now, r1 * Q(S, 1, 'too high'), { w: 700 });
  }
  /* lines 2–3: (1/2, 1/4) */
  const r2 = A * at(S, 2, 0.6, 0.3);
  if (r2 > 0.003) {
    M('x = 1/2,  h = 1/4', 1075, 500, 30, C.now, r2);
    M('3x² + 2xh − 1 = 0', 1075, 556, 28, C.white, r2);
    M(`secant ${fStr(secSlope(fr(1, 2), fr(1, 4)))} = tangent ${fStr(kJet(fr(1, 2))[1])}`, 1075, 606, 28, C.white, r2);
    M(`E = ${fStr(secErr(fr(1, 2), fr(1, 4)))}`, 1075, 666, 40, C.now, r2 * Q(S, 2, 'by accident'), { w: 700 });
    const r3 = A * at(S, 3, 0.6, 0.3);
    M(`½κ″(1/2) = ${fStr(kJet(fr(1, 2))[2])}`, 1075, 740, 36, C.cyan, r3, { w: 700 });
    txt('in the jet; not in the chord', 1075, 790, { size: 20, fam: F.mono, w: 700, c: C.mag, a: r3 * at(S, 3, 0.5, 1.2) });
  }
};

/* ======================================================================= */
/*                        scene 6 · ONE MINUS TWO ALPHA                      */
/* ======================================================================= */
/* drawing coordinates in the plane of x0 = 1 and the unit direction of a: w along x0, y along A = −a */
const DK = fNum(qN2(QA)), DS = Math.sqrt(DK);
const dPt = al => [(1 - al * (1 - al) * DK) / (1 + al * al * DK), DS / (1 + al * al * DK)];
const DV = { cx: 470, cy: 560, R: 200 };
const dP = ([w, y]) => [DV.cx + w * DV.R, DV.cy - y * DV.R];
const alCol = i => (i < 2 ? C.mag : i > 2 ? C.blue : C.now);
SCENES.drift = S => {
  const A = fadeScene(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed'], [3, 'Lean checks', 'lean']]);
  ring(DV.cx, DV.cy, DV.R, C.cyan, A * 0.55, 2);
  dotC(DV.cx, DV.cy, 4, C.dim, A);
  const X0 = dP([1, 0]);
  dashed(X0[0], X0[1] + 60, X0[0], X0[1] - 330, C.dim, A * 0.45, 1.5);
  dot(X0[0], X0[1], 14, 'w', A);
  M('x₀', X0[0] + 18, X0[1] + 34, 30, C.white, A);
  txt('plane of x₀ and a · to scale', DV.cx, 840, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: A, ls: 1 });
  /* the five sampled steps */
  const reveal = [Q(S, 2, 'left endpoint', 0.6), at(S, 2, 0.6, 3.2), at(S, 3, 0.6, 0.6), at(S, 2, 0.6, 3.6), Q(S, 2, 'the right', 0.6)];
  ALPHAS.forEach((al, i) => {
    const q = A * reveal[i];
    if (q <= 0.003) return;
    const P = dP(dPt(fNum(al))), col = alCol(i);
    line(X0[0], X0[1], P[0], P[1], col, q * (i === 2 ? 1 : 0.7), i === 2 ? 4 : 2.5);
    if (i === 2) nowDot(P[0], P[1], 18, q); else dotC(P[0], P[1], 9, col, q);
    const lab = `α = ${fStr(al)}`, off = [[14, -14], [-70, -26], [-150, -20], [-128, 20], [-40, 36]][i];
    M(lab, P[0] + off[0], P[1] + off[1], 22, col, q, { w: 700 });
  });
  /* right panel */
  panel(900, 190, 900, 640, A, C.cyan, 'α-SAMPLED STEP · α 采样');
  const r0 = A * at(S, 0, 0.6, 0.3);
  M('(1 + αa) x = (1 − (1 − α)a) x₀', 940, 265, 30, C.white, r0);
  txt('x₀ = 1 ·  A = −a = (0, 1, 2/3, 1/3) ·  ‖a‖² = 14/9', 940, 305, { size: 19, fam: F.math, w: 600, c: C.dim, a: r0 });
  const r1 = A * Q(S, 1, 'Lean checks');
  M('‖x‖² − 1 = (1 − 2α) ‖x − x₀‖²', 940, 375, 38, C.cyan, r1, { w: 700 });
  leanChip(940, 430, JT_LEAN.drift, r1 * Q(S, 1, 'squared step'), 20);
  const r2 = A * at(S, 2, 0.6, 0);
  if (r2 > 0.003) {
    const CX = [950, 1120, 1320];
    txt('α', CX[0], 495, { size: 22, fam: F.math, w: 700, c: C.dim, a: r2 });
    txt('‖x‖²', CX[1], 495, { size: 22, fam: F.math, w: 700, c: C.dim, a: r2 });
    txt('‖x‖² − 1', CX[2], 495, { size: 22, fam: F.math, w: 700, c: C.dim, a: r2 });
    DRIFT.forEach((r, i) => {
      const q = r2 * clamp(reveal[i] * 1.2), y = 545 + i * 50, col = alCol(i);
      M(fStr(r.al), CX[0], y, 28, col, q, { w: 700 });
      M(fStr(r.n2), CX[1], y, 30, col, q, { w: 700 });
      M(fSgn(fSub(r.n2, F1)).replace('+0', '0'), CX[2], y, 28, col, q);
    });
  }
  leanChip(1460, 795, JT_LEAN.unit, A * Q(S, 3, 'Lean checks'), 18);
};

/* ======================================================================= */
/*                          scene 7 · TWO EQUAL HALVES                       */
/* ======================================================================= */
const HV = { cx: 480, cy: 560, R: 240 };
const TH = Math.acos(fNum(XH[0]));                         // cos θ = 11/25; x1 sits at 2θ (cos 2θ = −383/625)
const hP = ang => [HV.cx + HV.R * Math.cos(ang), HV.cy - HV.R * Math.sin(ang)];
SCENES.halves = S => {
  const A = fadeScene(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'argued']]);
  ring(HV.cx, HV.cy, HV.R, C.cyan, A * 0.4, 2);
  dotC(HV.cx, HV.cy, 4, C.dim, A);
  txt('plane of x₀ and σ · to scale', HV.cx, 840, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: A, ls: 1 });
  const g0 = ease(at(S, 0, 1.4, 0.2)), g1 = ease(at(S, 1, 1.4, 0.6));
  const P0 = hP(0), PH = hP(TH), P1 = hP(2 * TH);
  arcStroke(HV.cx, HV.cy, HV.R, 0, -TH * g0, C.cyan, A, 5);
  if (g1 > 0) arcStroke(HV.cx, HV.cy, HV.R, -TH, -TH - TH * g1, C.cyan, A, 5);
  dot(P0[0], P0[1], 14, 'w', A); M('x₀', P0[0] + 18, P0[1] + 10, 30, C.white, A);
  const ha = A * at(S, 0, 0.5, 1.3);
  nowDot(PH[0], PH[1], 17, ha); M('x½', PH[0] + 14, PH[1] - 18, 30, C.now, ha);
  const oa = A * at(S, 1, 0.5, 1.8);
  dot(P1[0], P1[1], 14, 'c', oa); M('x₁', P1[0] - 56, P1[1] - 12, 30, C.cyan, oa);
  /* the equal fidelities on the two arcs */
  const fa = A * Q(S, 1, 'share fidelity');
  const m1 = hP(TH / 2), m2 = hP(1.5 * TH);
  M(fStr(FID1), m1[0] + 18, m1[1] - 6, 26, C.now, fa, { w: 700 });
  M(fStr(FID2), m2[0] - 20, m2[1] - 22, 26, C.now, fa, { w: 700, align: 'right' });
  /* right panel */
  panel(880, 190, 920, 640, A, C.cyan, 'MIDPOINT AND HEAP STEP · 中点与流群');
  M('σ = (1/2, 1/3, 1/6),  ‖σ‖² = 7/18', 920, 262, 24, C.dim, A);
  M('x₀ = (1, 0, 0, 0)', 920, 320, 30, C.white, A * at(S, 0, 0.5, 0.2));
  M(`x½ = ${qNumStr(XH, 25)}`, 920, 380, 34, C.now, ha, { w: 700 });
  txt(`‖x½‖² = ${fStr(qN2(XH))}`, 1560, 380, { size: 22, fam: F.math, w: 600, c: C.dim, a: ha });
  const r1 = A * at(S, 1, 0.6, 0.2);
  M('x₁ = [x½, x₀, x½] = x½ x̄₀ x½', 920, 445, 26, C.white, r1);
  M(`= ${qNumStr(X1, 625)}`, 920, 495, 30, C.cyan, r1 * at(S, 1, 0.5, 0.9));
  M(`κ(x₀, x½) = ${fStr(FID1)} = κ(x½, x₁)`, 920, 565, 34, C.now, fa, { w: 700 });
  leanChip(920, 620, JT_LEAN.half, A * Q(S, 1, 'Lean checks'), 20);
  const r2 = A * at(S, 2, 0.6, 0.1);
  if (r2 > 0.003) {
    box(910, 660, 860, 150, C.argued, r2, 1.5, 'rgba(0,0,0,0.45)');
    tag(930, 692, 'LITERATURE · 文献结果', C.argued, r2);
    M('α = 0   left sums  →  Itô (1944)', 930, 742, 26, C.mag, r2 * Q(S, 2, "Itô's"));
    M('α = ½   midpoint sums  →  Stratonovich (1966)', 930, 788, 26, C.cyan, r2 * Q(S, 2, 'midpoint sums'));
  }
};

/* ======================================================================= */
/*                                 scene 8 · close                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 255 });
};

/* ======================================================================= */
/*                                    poster                                 */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[3], t = sc.start + 6;
  background(t, sc, 3, 6);
  txt(DATA.film.title_zh, W / 2, 250, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('A SYMBOL WHOSE CUBE VANISHES', W / 2, 340, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  M('η³ = 0', W / 2, 470, 96, C.cyan, 1, { align: 'center', w: 700, ab: 2 });
  ['1/2', '−1/2', '1/4'].forEach((s, j) => {
    const x = W / 2 - 400 + j * 280;
    box(x, 560, 240, 120, C.cyan, 1, 2.5, 'rgba(0,0,0,0.5)');
    M(s, x + 120, 640, 64, C.cyan, 1, { align: 'center', w: 700 });
  });
  txt('κ(1 + η) = 1/2 − 1/2 η + 1/4 η²  ·  no limit taken', W / 2, 760, { size: 28, fam: F.math, w: 600, align: 'center', c: C.white });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
};
