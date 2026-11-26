/* Film · Windows on the Zeros · 零点窗口 (book omega-unification, Volume I: chapter 3).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (chapter 3 of the book):
     ground   RH and Dirichlet GRH as an external formalized fact (Alpöge, Lean v4.33.1, 175,187 modules, kernel
              replays), chapter 3.1: not frozen in trureturing@dev, so never green (argued, EXT-LEAN); scope ends at
              ζ and Dirichlet L over ℚ; ERH, Grand RH, simplicity, GUE and every physics claim stay open (open).
     circle   CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion (LEAN): |cayleyCoefficient s| = 1
              ⟺ Re s = 1/2, and RH ⟺ every nontrivial zero has logarithmicRadialDefect 0. The moving points and
              their images under the chapter's Möbius map (s − 1)/s are computed here (computed).
              MangoldtFejerGap.rh_iff_eventually_fejer_gap (LEAN): RH ⟺ ∀ c < 1/48, eventually
              U(x) ≤ M√x − c (log x)²; M = 2 + γ − ln 4π and the Fejér kernel |Σ_{j<6} e^{ijθ}|² are computed here.
     phases   harmonic weights a_γ = γ/(1/4 + γ²) and Z_T(t) (chapter 3.2); the phasor chain is drawn with
              schematic ordinates, labelled as such; the three deficit windows and bounds are
              RHHarmonicPairMoment.harmonic_pair_ratio / harmonic_reciprocal_time_deficit,
              RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit and
              RHLandauWindowTransfer.harmonic_landau_window_deficit (LEAN, all under RH; the last assumes the
              uniform Landau envelope). Window positions on the log |t| axis are schematic.
     collide  LandauLeftVertical.norm_left_vertical_integral and LandauRightVertical.norm_right_vertical_integral
              (LEAN, unconditional); joining them with the top edge into the envelope is reported in prose by the
              chapter (argued); RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit (LEAN, under RH and the
              envelope): s_n E_n / (η_n W^{2n}) → 1/√π; 1/√π and the Gaussian shape are computed (shape schematic).
     window   zero #11431 in its 19-zero window, chapter 3.4.1: Δ ∈ (1.6812114283, 1.6812114285)·10⁻⁶, rank 1 of
              3,000 centres, runner-up #11628 35.60× worse, diagonal share 94.62 %, extra-pair cap 23.657017 % and
              4/(12 + 2√6), radii 111521 / 111532 (160-bit Arb certificates, copied; closed forms recomputed here).
     filter   the three-window filter of chapter 3.4.2: first triple hits #8359 (cut 9) and #8236 (site-variance cut)
              with their certified readings (certificate) on chosen inputs (model, argued).
     gap      the open comparison gap of chapter 3.5 (open); local sharpness of #11431 has density-1 beaters higher up
              (argued).

   On load, FILM.init checks DATA.lean against the nine theorems and re-derives every closed form on screen by a
   second route; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const ZW_LEAN = {
  fejer: 'D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap',
  cayley: 'D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion',
  ratio: 'D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio',
  recip: 'D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit',
  left: 'D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral',
  right: 'D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral',
  periodic: 'D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit',
  landau: 'D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit',
  collide: 'D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit'
};

/* ----------------------------- exact helpers ----------------------------- */
const EULER_GAMMA = 0.5772156649015329;
/* the chapter's Möbius form of the Cayley map, w = (s − 1)/s, in complex division */
function zwCayley(re, im) {
  const nr = re - 1, d = re * re + im * im;
  return [(nr * re + im * im) / d, (im * re - nr * im) / d];
}
const zwAbs = ([x, y]) => Math.hypot(x, y);
/* first Li mass M = 2 + γ − ln(4π) */
const ZW_M = 2 + EULER_GAMMA - Math.log(4 * Math.PI);
/* the discrete Fejér kernel |Σ_{j<N} e^{ijθ}|² and its double-sum form Σ_{j,k} cos((j − k)θ) */
function zwFejer(N, th) { let x = 0, y = 0; for (let j = 0; j < N; j++) { x += Math.cos(j * th); y += Math.sin(j * th); } return x * x + y * y; }
function zwFejer2(N, th) { let s = 0; for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) s += Math.cos((j - k) * th); return s; }
const ZW_FN = 6;
/* the closed-band ceiling 4/(12 + 2√6) of example ex-ou-ch03-fejer-11431 and its optimiser */
const ZW_CAP = 4 / (12 + 2 * Math.sqrt(6));
const ZW_X = 1 / (2 + Math.pow(6, 0.25)), ZW_Z = Math.pow(6, 0.25) * ZW_X;
/* schematic ordinates for the phasor picture (not zeta zeros: labelled schematic on screen) */
const ZW_G = Array.from({ length: 14 }, (_, k) => 14 + 6.4 * k + 3 * rnd(k, 3));
const ZW_A = ZW_G.map(g => g / (0.25 + g * g));
const ZW_WSUM = ZW_A.reduce((s, a) => s + a, 0);
const ZW_W = ZW_A.map(a => a / ZW_WSUM);
function zwZ(t) { let x = 0, y = 0; ZW_G.forEach((g, k) => { x += ZW_W[k] * Math.cos(g * t); y += ZW_W[k] * Math.sin(g * t); }); return [x, y]; }

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 14) E.push('zero-windows film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  /* 0. the nine cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(ZW_LEAN).length, `film.json cites ${lean.length} declarations, expected 9`);
  for (const gid of Object.values(ZW_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. Cayley: |w| = 1 on Re s = 1/2, by division and by |s − 1|² − |s|² = 1 − 2 Re s */
  for (let k = -20; k <= 20; k++) {
    const y = k * 0.137;
    if (k !== 0) check(Math.abs(zwAbs(zwCayley(0.5, y)) - 1) < 1e-12, `|w| = 1 at 1/2 + ${y}i`);
    for (const re of [0.2, 0.85, 1.3]) {
      const m = zwAbs(zwCayley(re, y)), m2 = Math.sqrt(((re - 1) ** 2 + y * y) / (re * re + y * y));
      check(Math.abs(m - m2) < 1e-12, 'two routes to |w|');
      check((m < 1) === (re > 0.5), `|w| < 1 iff Re s > 1/2 at ${re}`);
    }
  }
  /* 2. M = 2 + γ − ln 4π by two routes, and the Fejér kernel is the double cosine sum, ≥ 0, peak N² */
  check(Math.abs(ZW_M - (2 + EULER_GAMMA - Math.log(4) - Math.log(Math.PI))) < 1e-14, 'M two routes');
  check(Math.abs(ZW_M - 0.0461914) < 5e-8, 'M ≈ 0.0461914');
  for (let i = 0; i <= 200; i++) {
    const th = -Math.PI + i * TAU / 200, f = zwFejer(ZW_FN, th);
    check(Math.abs(f - zwFejer2(ZW_FN, th)) < 1e-9 && f >= -1e-12, `Fejér kernel at ${th}`);
  }
  check(Math.abs(zwFejer(ZW_FN, 0) - ZW_FN * ZW_FN) < 1e-12, 'Fejér peak N²');
  /* 3. phasor picture: weights sum to 1, |Z(0)| = 1, |Z| ≤ 1 */
  check(Math.abs(ZW_W.reduce((s, w) => s + w, 0) - 1) < 1e-12, 'weights sum to 1');
  check(Math.abs(zwAbs(zwZ(0)) - 1) < 1e-12, '|Z(0)| = 1');
  for (let i = 1; i < 100; i++) check(zwAbs(zwZ(i * 0.01)) <= 1 + 1e-12, '|Z| ≤ 1');
  /* 4. 1/√π against Simpson's rule for ∫ e^{−x²} = √π */
  let sim = 0; const n = 2000, h = 16 / n;
  for (let i = 0; i <= n; i++) { const x = -8 + i * h; sim += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * Math.exp(-x * x); }
  sim *= h / 3;
  check(Math.abs(1 / sim - 1 / Math.sqrt(Math.PI)) < 1e-12, '1/√π');
  check((1 / Math.sqrt(Math.PI)).toFixed(10) === '0.5641895835', '1/√π digits');
  /* 5. the 19-zero window and its certified numbers */
  check(11431 - 9 === 11422 && 11431 + 9 === 11440 && 11427 >= 11422 && 11436 <= 11440, 'window #11422–#11440');
  check(3000 * 81 === 243000 && 12999 - 10000 + 1 === 3000, '3,000 centres, 243,000 triples');
  check(1.6812114285e-6 < 2e-6, 'within two millionths');
  check(19 + 4 * (19 * 18 / 2) === 703 && 19 ** 4 === 130321, 'B = 703/130321');
  for (const tot of [0.00570094240512, 0.00570094240513]) check(Math.abs(703 / 130321 / tot - 0.946224672) < 2e-9, 'diagonal share 94.6224672 %');
  /* the ceiling: at x = y, z = 6^{1/4} x, extra / (D + extra) = 4/(12 + 2√6), and 4q/(8 + 2√6 + 4q) at q = 1 */
  const x = ZW_X, z = ZW_Z, D = 6 * x ** 4 + z ** 4 + 8 * x * x * z * z, ex = 4 * x * x * z * z;
  check(Math.abs(2 * x + z - 1) < 1e-14, 'weights 2x + z = 1');
  check(Math.abs(ex / (D + ex) - ZW_CAP) < 1e-14 && Math.abs(4 / (8 + 2 * Math.sqrt(6) + 4) - ZW_CAP) < 1e-15, 'cap 4/(12 + 2√6)');
  check((100 * ZW_CAP).toFixed(6) === '23.670068', 'cap 23.670068 %');
  check(x.toFixed(6) === '0.280498' && z.toFixed(6) === '0.439003', 'optimiser 0.280498, 0.439003');
  check(23.657017 < 100 * ZW_CAP && 100 * ZW_CAP < 25, 'under a quarter');
  /* 6. the three-window readings lie in their windows */
  for (const [lo, hi, r] of [[0.1184112, 0.1184213, 0.99935102], [0.1183058, 0.1183120, 1.00093826]]) {
    check(0.117 < lo && hi < 0.119, `α_s in window: ${lo}`);
    check(Math.abs(r - 1) < 0.002, `curvature within 0.2 %: ${r}`);
  }
  check(8236 < 8359 && 9 < 9.2061, 'order of the hits');
});
Object.assign(FILM.speed, { ground: 0.018, circle: 0.014, phases: 0.014, collide: 0.016, window: 0.014, filter: 0.014, gap: 0.012, close: 0.025 });

/* ------------------------------- drawing --------------------------------- */
const zwFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function zwRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  if (o.align === 'right') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID; o.last shows only the declaration name */
const ZW_MISSING = new Set();
function zwLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!ZW_MISSING.has(gid)) { ZW_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  const full = r.name || r.label || gid;
  const name = o.last ? full.split('.').slice(-1)[0] : full.split('.').slice(-2).join('.');
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function zwTag(s, x, y, col, a, o = {}) {
  if (a <= 0.003) return;
  txt(s, x, y, { size: o.size || 18, fam: o.fam || F.zh, w: 700, c: col, a, align: o.align || 'left' });
}

/* ======================================================================= */
/*                              scene 1 · THE GROUND                         */
/* ======================================================================= */
SCENES.ground = S => {
  const u = S.u, L1 = lineAt(S, 1);
  /* the title, with the opening question under it */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L1.s + 0.4) / 0.6));
  if (ta > 0.003) {
    const p = clamp(u / 1.3);
    txt(`${DATA.book.code} · FILM`, W / 2, 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 440, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble('WINDOWS ON THE ZEROS', p, 5), W / 2, 540, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
    txt('CRITICAL LINE · FEJÉR · LANDAU · 1/√π · FINITE WINDOWS', W / 2, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
    const qa = ta * at(S, 0, 0.6, 1.2);
    zwRich([['∞ zeros', C.cyan], ['   →   ', C.dim], ['finite height T', C.white], ['   →   ', C.dim], ['one zero', C.now], [' ?', C.now]], W / 2, 720, { size: 36, align: 'center', a: qa, fam: F.disp });
    txt('无穷多零点 → 有限高度 T → 单枚零点？', W / 2, 772, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
  }
  const a = clamp((u - L1.s + 0.2) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0.003) return;
  badgeQ(S, [[1, 'First, the ground', 'argued'], [3, 'Grand RH stays open', 'open']]);
  /* line 1: the external dossier */
  panel(140, 200, 820, 430, a, C.argued, 'EXT-LEAN · 外部形式化事实');
  txt('RiemannHypothesis', 180, 285, { size: 38, fam: F.mono, w: 700, c: C.white, a });
  txt('Dirichlet GRH over ℚ · 狄利克雷广义黎曼猜想', 180, 335, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * Q(S, 1, 'Dirichlet GRH', 0.5) });
  const da = a * Q(S, 1, 'external Lean proof', 0.6);
  txt('Levent Alpöge · 2026-11-20', 180, 400, { size: 26, fam: F.mono, w: 700, c: C.argued, a: da });
  txt('Lean v4.33.1 · 175,187 modules', 180, 445, { size: 24, fam: F.mono, w: 700, c: C.white, a: da });
  txt('kernel replays: leanchecker · lean4lean', 180, 495, { size: 22, fam: F.mono, w: 700, c: C.dim, a: da });
  txt('                nanoda · con-leche', 180, 528, { size: 22, fam: F.mono, w: 700, c: C.dim, a: da });
  txt('axioms: propext · Classical.choice · Quot.sound', 180, 585, { size: 20, fam: F.mono, w: 700, c: C.dim, a: da });
  /* line 2: not frozen, so no green badge */
  const na = a * at(S, 2, 0.6);
  if (na > 0.003) {
    panel(1020, 200, 760, 250, na, C.dim, 'IN THIS BOOK · 本书');
    ctx.save(); ctx.setLineDash([6, 6]); box(1060, 258, 190, 56, C.dim, na, 2); ctx.restore();
    txt('LEAN ✓', 1155, 297, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: na * 0.8 });
    line(1052, 322, 1258, 250, C.white, na * Q(S, 2, 'never wears', 0.4), 3);
    txt('not frozen in trureturing@dev', 1280, 285, { size: 22, fam: F.mono, w: 700, c: C.white, a: na });
    txt('尚未冻结 → 不佩戴绿色徽章', 1280, 322, { size: 22, fam: F.zh, w: 700, c: C.dim, a: na });
    txt('labelled  ARGUED · EXT-LEAN', 1060, 395, { size: 24, fam: F.mono, w: 700, c: C.argued, a: na * Q(S, 2, 'wears green', 0.5) });
  }
  /* line 3: scope */
  const sa = a * at(S, 3, 0.6);
  if (sa > 0.003) {
    panel(1020, 480, 760, 340, sa, C.open, 'SCOPE · 范围');
    txt('covers · 覆盖', 1060, 540, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: sa });
    txt('ζ(s) and Dirichlet L(s, χ) over ℚ', 1060, 580, { size: 26, fam: F.math, w: 700, c: C.white, a: sa });
    const pa = a * Q(S, 3, 'nothing in physics', 0.5);
    txt('physics: says nothing · 物理：不置一词', 1060, 630, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
    const oa = a * Q(S, 3, 'Grand RH stays open', 0.5);
    txt('still OPEN · 仍开放', 1060, 685, { size: 20, fam: F.zh, w: 700, c: C.open, a: oa });
    txt('ERH (Dedekind ζ_K) · Grand RH', 1060, 725, { size: 24, fam: F.math, w: 700, c: C.open, a: oa });
    txt('simple zeros · GUE pairs · Hilbert–Pólya', 1060, 765, { size: 22, fam: F.math, w: 700, c: C.open, a: oa * 0.9 });
  }
};

/* ======================================================================= */
/*                           scene 2 · LINE INTO CIRCLE                      */
/* ======================================================================= */
const ZP = { cx: 480, cy: 520, k: 250 };           /* s-plane: Re 1/2 at cx */
const zpX = re => ZP.cx + (re - 0.5) * ZP.k, zpY = im => ZP.cy - im * ZP.k;
const ZC = { cx: 1440, cy: 470, r: 200 };          /* w-plane: unit circle */
const zcX = x => ZC.cx + x * ZC.r, zcY = y => ZC.cy - y * ZC.r;
SCENES.circle = S => {
  const a0 = zwFade(S);
  if (a0 <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [1, 'the Cayley map', 'computed'], [2, null, 'lean'], [3, null, 'lean']]);
  const g3 = at(S, 3, 0.7), a = a0 * (1 - g3);
  txt('Lean restates RH twice · 两次改写', W / 2, 205, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5)) });
  if (a > 0.003) {
    /* s-plane */
    line(zpX(-0.6), ZP.cy, zpX(1.6), ZP.cy, C.dim, a * 0.7, 1.5);
    line(zpX(0), zpY(1.1), zpX(0), zpY(-1.1), C.dim, a * 0.5, 1.5);
    txt('0', zpX(0) - 12, ZP.cy + 28, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
    txt('1', zpX(1), ZP.cy + 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
    txt('s', zpX(1.6) - 6, ZP.cy - 14, { size: 26, fam: F.math, w: 700, c: C.white, a });
    line(zpX(0.5), zpY(1.1), zpX(0.5), zpY(-1.1), C.cyan, a, 3);
    txt('Re s = 1/2', zpX(0.5), zpY(1.1) - 14, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    /* arrow and map name */
    arrow(800, 520, 1000, 520, C.white, a * at(S, 1, 0.6), 2.5);
    txt('w = (s − 1)/s', 900, 500, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a: a * at(S, 1, 0.6) });
    txt('Cayley · 凯莱', 900, 556, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 1, 0.6) });
    /* w-plane */
    const ca = a * at(S, 0, 0.6, 0.6);
    line(zcX(-1.25), ZC.cy, zcX(1.25), ZC.cy, C.dim, ca * 0.6, 1.5);
    line(ZC.cx, zcY(1.2), ZC.cx, zcY(-1.2), C.dim, ca * 0.5, 1.5);
    ring(ZC.cx, ZC.cy, ZC.r, C.dim, ca * 0.8, 1.5);
    txt('|w| = 1', zcX(0.72) + 20, zcY(0.72) - 10, { size: 20, fam: F.math, w: 700, c: C.dim, a: ca });
    /* the image of the critical line segment, traced as it is swept */
    const sweep = Q(S, 1, 'unit circle', 2.0);
    if (sweep > 0) curve(i => { const y = -1.1 + 2.2 * i * sweep; const w = zwCayley(0.5, y); return [zcX(w[0]), zcY(w[1])]; }, 90, C.cyan, a, 3);
    ring(zcX(1), ZC.cy, 7, C.white, ca, 2);
    txt('1 not hit', zcX(1) + 14, ZC.cy + 28, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ca });
    /* the moving points */
    const Y = 0.95 * Math.sin(0.55 * S.u + 0.4);
    const pa = a * at(S, 0, 0.6, 0.3);
    dot(zpX(0.5), zpY(Y), 12, 'g', pa); ring(zpX(0.5), zpY(Y), 18, C.now, pa, 2);
    const w = zwCayley(0.5, Y);
    dot(zcX(w[0]), zcY(w[1]), 12, 'g', pa * at(S, 1, 0.6)); ring(zcX(w[0]), zcY(w[1]), 18, C.now, pa * at(S, 1, 0.6), 2);
    const ma = a * Q(S, 1, 'exactly when', 0.6);
    const w2 = zwCayley(0.85, Y);
    dot(zpX(0.85), zpY(Y), 10, 'm', ma);
    txt('Re s = 0.85', zpX(0.85) + 18, zpY(Y) + 34, { size: 18, fam: F.math, w: 700, c: C.mag, a: ma });
    dot(zcX(w2[0]), zcY(w2[1]), 10, 'm', ma);
    /* readouts */
    const ra = a * at(S, 1, 0.6);
    txt(`|w| = ${zwAbs(w).toFixed(6)}`, 1000, 300, { size: 24, fam: F.mono, w: 700, c: C.now, a: ra });
    txt(`|w′| = ${zwAbs(w2).toFixed(6)}`, 1000, 340, { size: 24, fam: F.mono, w: 700, c: C.mag, a: ma });
    txt('NUM · computed here', 1000, 376, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: ra * 0.9 });
    /* the statements */
    const f1 = a * Q(S, 1, 'exactly when', 0.6) * (1 - at(S, 2, 0.5));
    zwRich([['|cayleyCoefficient(s)| = 1', C.white], ['  ⟺  ', C.dim], ['Re s = 1/2', C.cyan]], 1000, 735, { size: 28, fam: F.math, a: f1 });
    const f2 = a * at(S, 2, 0.6);
    zwRich([['RH', C.white], ['  ⟺  ', C.dim], ['∀ nontrivial ρ :  logarithmicRadialDefect(ρ) = 0', C.white]], 1000, 735, { size: 24, fam: F.math, a: f2 });
    zwLean(1000, 790, ZW_LEAN.cayley, a * Q(S, 1, 'exactly when', 0.6), { size: 20, last: true });
  }
  /* line 3: the Fejér gap */
  const b = a0 * g3;
  if (b <= 0.003) return;
  panel(160, 195, 1600, 255, b, C.lean, 'FEJÉR CRITICAL GAP · 费耶尔临界差额');
  zwRich([['RH', C.white], ['  ⟺  ', C.dim], ['∀ c < 1/48 :  eventually  ', C.white], ['U(x) ≤ M√x − c (log x)²', C.lean]], 200, 285, { size: 36, fam: F.math, a: b });
  zwRich([['M = firstLiMass = 2 + γ − ln 4π ≈ ', C.white], [ZW_M.toFixed(7), C.cyan], ['   NUM · computed here', C.cyan]], 200, 345, { size: 24, fam: F.math, a: b * at(S, 3, 0.6, 1.5) });
  txt('U(x) = integrated Mangoldt remainder · 积分曼戈尔特余项', 1720, 345, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.dim, a: b * at(S, 3, 0.6, 2.0) });
  zwLean(200, 415, ZW_LEAN.fejer, b, { size: 20, last: true });
  /* the proof idea: the Fejér kernel is a square, so it is never negative */
  const ka = b * at(S, 3, 0.6, 1.2);
  if (ka > 0.003) {
    const x0 = 300, x1 = 1620, y0 = 800, hh = 250, X = th => x0 + (th + Math.PI) / TAU * (x1 - x0), Yk = f => y0 - f / (ZW_FN * ZW_FN) * hh;
    line(x0, y0, x1, y0, C.dim, ka, 1.5);
    curve(i => { const th = -Math.PI + i * TAU; return [X(th), Yk(zwFejer(ZW_FN, th))]; }, 300, C.cyan, ka, 3);
    txt('−π', x0, y0 + 30, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a: ka });
    txt('0', X(0), y0 + 30, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a: ka });
    txt('π', x1, y0 + 30, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a: ka });
    txt('36', X(0) + 18, Yk(36) + 8, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: ka });
    txt('proof idea: Fejér kernel |Σ_(j<6) e^(ijθ)|² ≥ 0', x0, 500, { size: 22, fam: F.math, w: 700, c: C.white, a: ka });
    txt('证明骨架：费耶尔核是平方，从不为负 · NUM computed', x0, 534, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ka });
  }
};

/* ======================================================================= */
/*                           scene 3 · PHASES FALL SHORT                     */
/* ======================================================================= */
const ZWX = p => 950 + p * 820;                    /* schematic log |t| axis */
SCENES.phases = S => {
  const a = zwFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean bounds', 'lean']]);
  /* left: the phasor chain, with t pulled to 0 while line 1 says "lines up again" */
  const pull = at(S, 1, 2.0) * (1 - Q(S, 1, 'lines up', 1.8, 1.0));
  const t = (0.85 + 0.02 * S.u) * (1 - ease(pull));
  const O = [470, 510], R = 270;
  const pa = a * at(S, 0, 0.6);
  if (pa > 0.003) {
    ctx.save(); ctx.setLineDash([8, 8]); ring(O[0], O[1], R, C.dim, pa * 0.7, 1.5); ctx.restore();
    txt('|Z| = 1', O[0] + R * 0.72 + 12, O[1] - R * 0.72 - 8, { size: 20, fam: F.math, w: 700, c: C.dim, a: pa });
    line(O[0] - R - 20, O[1], O[0] + R + 20, O[1], C.dim, pa * 0.3, 1);
    line(O[0], O[1] - R - 20, O[0], O[1] + R + 20, C.dim, pa * 0.3, 1);
    let px = O[0], py = O[1];
    ZW_G.forEach((g, k) => {
      const len = ZW_W[k] * R, nx = px + len * Math.cos(g * t), ny = py - len * Math.sin(g * t);
      arrow(px, py, nx, ny, k % 2 ? C.cyan : mix(C.cyan, C.white, 0.4), pa * 0.9, 2);
      px = nx; py = ny;
    });
    const Z = zwZ(t);
    arrow(O[0], O[1], O[0] + Z[0] * R, O[1] - Z[1] * R, C.now, pa * at(S, 1, 0.5), 4);
    txt(`|Z| = ${zwAbs(Z).toFixed(3)}`, 160, 820, { size: 30, fam: F.mono, w: 700, c: C.now, a: pa * at(S, 1, 0.5) });
    txt(`t = ${t.toFixed(3)}`, 420, 820, { size: 24, fam: F.mono, w: 700, c: C.dim, a: pa * at(S, 1, 0.5) });
    txt('schematic ordinates, exact sum · 示意零点，和精确计算', 160, 205, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pa });
  }
  /* right top: the weights */
  panel(900, 190, 900, 190, pa, C.cyan, 'HARMONIC WEIGHT · 调和权');
  zwRich([['a_γ = γ / (1/4 + γ²)', C.white], ['      w_γ = a_γ / W(T)', C.cyan]], 935, 255, { size: 28, fam: F.math, a: pa });
  zwRich([['Z_T(t) = Σ_(0<γ≤T) w_γ e^(iγt)', C.white]], 935, 302, { size: 26, fam: F.math, a: pa * Q(S, 0, 'add the phases', 0.6) });
  const ra = a * Q(S, 2, 'Lean bounds', 0.6);
  zwRich([['P₄(T)/P₂(T)² ≤ 4096 log T', C.lean]], 935, 352, { size: 24, fam: F.math, a: ra });
  zwLean(1340, 352, ZW_LEAN.ratio, ra, { size: 18, last: true });
  /* right: the three windows on a schematic log |t| axis */
  const wa = a * at(S, 2, 0.6);
  if (wa > 0.003) {
    line(ZWX(0), 418, ZWX(1), 418, C.dim, wa, 2);
    [[0, '1/T'], [0.13, '16π/T'], [0.45, 'b/log T'], [0.6, '1/L'], [1, 'log T']].forEach(([p, s]) => {
      line(ZWX(p), 410, ZWX(p), 426, C.white, wa, 2);
      txt(s, ZWX(p), 402, { size: 20, fam: F.math, w: 700, align: 'center', c: C.white, a: wa });
    });
    txt('|t| on a log scale, positions schematic · 示意', ZWX(1), 448, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: wa });
  }
  const rows = [
    { p: [0, 0.6], col: C.cyan, gid: ZW_LEAN.recip, s: '1 − |Z| ≥ log(1/|t|) / (524288 (log T)²)', on: a * Q(S, 2, 'near one over T', 0.6) },
    { p: [0.13, 0.45], col: C.mag, gid: ZW_LEAN.periodic, s: '1 − |Z| ≥ 1 / (4096 log T)', on: a * Q(S, 2, 'a power of log T', 0.6) },
    { p: [0.45, 1], col: C.cyan, gid: ZW_LEAN.landau, s: '1 − |Z| ≥ 1 / (32 log T)   if Landau envelope', on: a * Q(S, 3, 'Out to log T', 0.6) }
  ];
  rows.forEach((r, i) => {
    if (r.on <= 0.003) return;
    const y = 488 + i * 118;
    fillBox(ZWX(r.p[0]), y - 10, ZWX(r.p[1]) - ZWX(r.p[0]), 16, r.col, r.on * 0.75);
    txt(r.s, 935, y + 36, { size: 24, fam: F.math, w: 700, c: C.white, a: r.on });
    zwLean(935, y + 74, r.gid, r.on, { size: 18, last: true });
  });
  txt('all three under RH · 三窗均以 RH 为前提', 1770, 830, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: wa });
};

/* ======================================================================= */
/*                            scene 4 · ONE OVER ROOT PI                     */
/* ======================================================================= */
const ZL = { x: re => 250 + (re + 0.25) * 280, y1: 770, yV: 260 };
SCENES.collide = S => {
  const a = zwFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [2, null, 'argued'], [3, 'Lean checks', 'lean']]);
  const g3 = at(S, 3, 0.7);
  /* left: the Landau rectangle */
  const ra = a * at(S, 0, 0.6) * (1 - 0.55 * g3);
  if (ra > 0.003) {
    const xl = ZL.x(-0.25), xc = ZL.x(0.5), xr = ZL.x(1.15);
    line(ZL.x(-0.5), 810, ZL.x(1.5), 810, C.dim, ra * 0.6, 1.5);
    txt('Re s', ZL.x(1.5), 800, { size: 18, fam: F.math, w: 700, align: 'right', c: C.dim, a: ra });
    ctx.save(); ctx.setLineDash([6, 8]); line(xc, 240, xc, 805, C.dim, ra * 0.8, 1.5); ctx.restore();
    /* schematic zeros on the critical line */
    for (let k = 0; k < 9; k++) dot(xc, ZL.y1 - 30 - k * 56 - 14 * rnd(k, 7), 5, 'w', ra * 0.8);
    const le = Q(S, 1, 'two vertical edges', 0.6), lw = 2 + 3 * le;
    line(xl, ZL.y1, xl, ZL.yV, le > 0 ? C.cyan : C.dim, ra, lw);
    line(xr, ZL.y1, xr, ZL.yV, le > 0 ? C.cyan : C.dim, ra, lw);
    line(xl, ZL.y1, xr, ZL.y1, C.dim, ra, 2);
    const te = at(S, 2, 0.6);
    if (te > 0) { ctx.save(); ctx.setLineDash([10, 8]); line(xl, ZL.yV, xr, ZL.yV, C.argued, ra * te, 4); ctx.restore(); }
    else line(xl, ZL.yV, xr, ZL.yV, C.dim, ra, 2);
    txt('−1/4', xl, 232, { size: 20, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ra });
    txt('1/2', xc, 232, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a: ra });
    txt('1 + 1/log 3x', xr + 10, 232, { size: 20, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ra });
    txt('u = V', xl - 12, ZL.yV + 6, { size: 18, fam: F.math, w: 700, align: 'right', c: C.dim, a: ra });
    txt('u = 1', xl - 12, ZL.y1 + 6, { size: 18, fam: F.math, w: 700, align: 'right', c: C.dim, a: ra });
    txt('zeros: schematic · 示意', xc + 14, 300, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
  /* right: the two edge bounds */
  const ea = a * Q(S, 1, 'two vertical edges', 0.6) * (1 - g3);
  if (ea > 0.003) {
    panel(820, 195, 980, 330, ea, C.lean, 'LANDAU EDGES · 兰道竖边 · NO RH · 无需 RH');
    txt('left  Re s = −1/4,   x > 1,  V ≥ 1', 850, 262, { size: 22, fam: F.math, w: 700, c: C.dim, a: ea });
    txt('‖∫₁^V x^s (−ζ′/ζ)(s) du‖ ≤ x^(−1/4) (80(V − 1) + 20(1 + log V)/log x)', 850, 302, { size: 22, fam: F.math, w: 700, c: C.white, a: ea });
    zwLean(850, 342, ZW_LEAN.left, ea, { size: 18, last: true });
    const rb = a * Q(S, 1, 'explicit constants', 0.6) * (1 - g3);
    txt('right  Re s = 1 + 1/log(3x),   x > 1,  V > 1', 850, 402, { size: 22, fam: F.math, w: 700, c: C.dim, a: rb });
    txt('‖∫₁^V x^s (−ζ′/ζ)(s) du‖ ≤ 400 (V log 2x + x (log 2x)²)', 850, 442, { size: 22, fam: F.math, w: 700, c: C.white, a: rb });
    zwLean(850, 482, ZW_LEAN.right, rb, { size: 18, last: true });
  }
  const ga = a * at(S, 2, 0.6) * (1 - g3);
  if (ga > 0.003) {
    panel(820, 560, 980, 170, ga, C.argued, 'ARGUED · 论证');
    txt('left + right + top edge  ⟹  uniform Landau envelope', 850, 630, { size: 24, fam: F.math, w: 700, c: C.white, a: ga });
    txt('顶边接上左右竖边 → 包络（本片不作引用）', 850, 680, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ga });
  }
  /* line 3: the collision limit */
  const ca = a * g3;
  if (ca <= 0.003) return;
  zwRich([['s_n E_n(η_n) / (η_n W(T_n)²ⁿ)', C.white], ['  →  ', C.dim], ['1/√π', C.lean]], 860, 260, { size: 34, fam: F.math, a: ca });
  zwRich([['1/√π = ', C.white], [(1 / Math.sqrt(Math.PI)).toFixed(10) + '…', C.cyan], ['   NUM', C.cyan]], 860, 312, { size: 26, fam: F.math, a: ca * at(S, 3, 0.6, 2.5) });
  zwLean(860, 360, ZW_LEAN.collide, ca * Q(S, 3, 'Lean checks', 0.6), { size: 18, last: true });
  txt('given RH and the Landau envelope · 以 RH 与兰道包络为前提', 860, 398, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ca * Q(S, 3, 'Lean checks', 0.6) });
  /* the Gaussian shape e^{−x²}/√π, peak 1/√π, with a narrow hard band */
  const gx0 = 880, gx1 = 1760, gy0 = 790, gh = 300, GX = x => (gx0 + gx1) / 2 + x / 3 * (gx1 - gx0) / 2, GY = v => gy0 - v / (1 / Math.sqrt(Math.PI)) * gh;
  const sa = ca * Q(S, 3, 'near-collision', 1.0);
  line(gx0, gy0, gx1, gy0, C.dim, sa, 1.5);
  fillBox(GX(-0.12), GY(1 / Math.sqrt(Math.PI)), GX(0.12) - GX(-0.12), gh, C.now, sa * 0.35);
  curve(i => { const x = -3 + 6 * i; return [GX(x), GY(Math.exp(-x * x) / Math.sqrt(Math.PI))]; }, 200, C.cyan, sa, 3);
  txt('1/√π', GX(0) + 50, GY(1 / Math.sqrt(Math.PI)) + 4, { size: 24, fam: F.math, w: 700, c: C.lean, a: sa });
  txt('|difference| ≤ η', GX(0) - 22, gy0 - 20, { size: 18, fam: F.math, w: 700, align: 'right', c: C.now, a: sa });
  txt('shape schematic · 形状示意', gx1, gy0 + 30, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: sa });
};

/* ======================================================================= */
/*                              scene 5 · ZERO 11431                         */
/* ======================================================================= */
const ZS = i => 200 + i * 85;                     /* slot of zero #11422 + i, by index */
SCENES.window = S => {
  const a = zwFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const sa = a * at(S, 0, 0.6);
  txt('19-zero window #11422 – #11440 · 十九零点窗', W / 2, 205, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: sa });
  const hi = { 5: C.cyan, 9: C.now, 14: C.cyan };
  if (sa > 0.003) {
    line(ZS(0) - 30, 310, ZS(18) + 30, 310, C.dim, sa * 0.6, 1.5);
    for (let i = 0; i < 19; i++) {
      const on = clamp((S.u - lineAt(S, 0).s - 0.04 * i) / 0.3);
      if (hi[i]) dot(ZS(i), 310, 13, i === 9 ? 'g' : 'c', sa * on);
      else dot(ZS(i), 310, 7, 'w', sa * on * 0.7);
    }
    [[0, '11422'], [5, '11427'], [9, '11431'], [14, '11436'], [18, '11440']].forEach(([i, s]) =>
      txt('#' + s, ZS(i), 352, { size: 20, fam: F.mono, w: 700, align: 'center', c: hi[i] || C.dim, a: sa }));
    txt('slots by index, not by height · 按编号排列', ZS(18) + 30, 262, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: sa * (1 - at(S, 1, 0.4)) });
  }
  /* line 1: the midpoint */
  const ma = a * at(S, 1, 0.6);
  if (ma > 0.003) {
    const p = Q(S, 1, 'nearest a midpoint', 1.2);
    curve(i => { const s = i * clamp(p * 1.4), x = lerp(ZS(5), ZS(14), s), y = 295 - Math.sin(Math.PI * s) * 60; return [x, y]; }, 60, C.cyan, ma, 2.5);
    arrow(ZS(9), 240, ZS(9), 292, C.now, ma * clamp(p * 2 - 1), 2.5);
    txt('½(γ₁₁₄₂₇ + γ₁₁₄₃₆) ≈ γ₁₁₄₃₁', ZS(9) + 18, 282, { size: 18, fam: F.math, w: 700, c: C.now, a: ma * clamp(p * 2 - 1) });
    zwRich([['Δ = |γ₁₁₄₂₇ + γ₁₁₄₃₆ − 2γ₁₁₄₃₁| ∈ ', C.white], ['(1.6812114283, 1.6812114285) × 10⁻⁶', C.cyan]], W / 2, 410, { size: 28, fam: F.math, align: 'center', a: ma * Q(S, 1, 'within two millionths', 0.6) });
    txt('rank 1 of 3,000 centres #10000–#12999 · 243,000 triples · 三千个中心中唯一第一', W / 2, 452, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ma * Q(S, 1, 'three thousand', 0.6) });
  }
  /* line 2: the runner-up, and the shares of the fourth moment */
  const ba = a * at(S, 2, 0.6);
  if (ba > 0.003) {
    txt('midpoint error · 中点偏差', 160, 515, { size: 22, fam: F.zh, w: 700, c: C.white, a: ba });
    const u0 = 18, gro = Q(S, 2, 'times worse', 1.0);
    fillBox(300, 535, u0, 26, C.now, ba);
    txt('#11431', 160, 556, { size: 22, fam: F.mono, w: 700, c: C.now, a: ba });
    txt('1×', 300 + u0 + 12, 556, { size: 22, fam: F.mono, w: 700, c: C.now, a: ba });
    fillBox(300, 575, u0 * 35.6 * ease(gro), 26, C.cyan, ba * 0.75);
    txt('#11628', 160, 596, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ba });
    txt('35.60×', 300 + u0 * 35.6 + 12, 596, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ba * gro });
    const fa = a * Q(S, 2, 'the extra pair', 0.6);
    txt('fourth Fejér moment · 四阶费耶尔矩', 160, 660, { size: 22, fam: F.zh, w: 700, c: C.white, a: fa });
    box(300, 678, 640, 26, C.dim, fa, 1.5); fillBox(300, 678, 640 * 0.9462, 26, C.cyan, fa * 0.6);
    txt('diagonal', 160, 699, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: fa });
    txt('94.62%', 952, 699, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: fa });
    const xa = a * Q(S, 2, 'under a quarter', 0.6);
    box(300, 722, 640, 26, C.dim, xa, 1.5); fillBox(300, 722, 640 * 0.23657017, 26, C.mag, xa * 0.75);
    line(300 + 640 * 0.25, 714, 300 + 640 * 0.25, 756, C.white, xa, 2);
    txt('¼', 300 + 640 * 0.25 + 8, 772, { size: 20, fam: F.math, w: 700, c: C.white, a: xa });
    txt('extra ≤', 160, 743, { size: 22, fam: F.mono, w: 700, c: C.mag, a: xa });
    txt('23.657017%', 952, 743, { size: 22, fam: F.mono, w: 700, c: C.mag, a: xa });
    txt(`free weights, η = Δ₂ · closed band 4/(12 + 2√6) = ${(100 * ZW_CAP).toFixed(6)}%`, 160, 806, { size: 20, fam: F.math, w: 700, c: C.dim, a: xa });
  }
  /* line 3: the finite observation radius */
  const oa = a * at(S, 3, 0.6);
  if (oa > 0.003) {
    panel(1120, 490, 680, 340, oa, C.cyan, 'OBSERVATION RADIUS · 观察半径');
    txt('η = 1/1000 · first integer T with I_η(T) > B', 1150, 550, { size: 20, fam: F.math, w: 700, c: C.dim, a: oa });
    const cnt = Q(S, 3, 'first shows up', 1.6), n = Math.round(lerp(100000, 111521, ease(cnt)));
    txt(String(n), 1460, 640, { size: 66, fam: F.orb, w: 900, align: 'center', c: cnt >= 1 ? C.cyan : C.now, a: oa });
    txt('equal weights · 等权     (111520: not yet)', 1460, 682, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: oa });
    const ha = a * Q(S, 3, 'radius 111521', 0.6, 0.8);
    txt('111532   local harmonic weights · 局部调和权', 1150, 740, { size: 22, fam: F.zh, w: 700, c: C.white, a: ha });
    txt('generic sufficient bound: 11,330,943 · 通用充分半径', 1150, 790, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ha });
  }
  const ca = a * Q(S, 3, 'Certificates, not', 0.6);
  stamp('CERTIFICATE', 1600, 462, ca * (1 - Q(S, 3, 'not theorems', 0.6, 1.6)), C.cyan, 26, -0.06);
};

/* ======================================================================= */
/*                              scene 6 · THREE WINDOWS                      */
/* ======================================================================= */
SCENES.filter = S => {
  const a = zwFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'inputs are chosen', 'argued']]);
  const g3 = at(S, 3, 0.6);
  const gates = [
    ['LIGHT MODES · 轻模', '3 per charge × 5 charges', '五荷各三轻模', 'light modes'],
    ['STRONG COUPLING · 强耦合', '0.117 < α_s(M_Z) < 0.119', '两圈尖阈值', 'strong coupling'],
    ['CURVATURE · 曲率', '|ratio − 1| < 0.2%', '四层一圈曲率比', 'curvature']
  ];
  gates.forEach(([h, s, z, ph], i) => {
    const ga = a * at(S, 0, 0.5, 0.9 * i) * (1 - g3);
    const x = 160 + i * 560;
    panel(x, 190, 520, 170, ga, C.cyan, h);
    txt(s, x + 30, 270, { size: 28, fam: F.math, w: 700, c: C.white, a: ga });
    txt(z, x + 30, 316, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ga });
  });
  if (g3 > 0.003) {
    panel(160, 190, 1600, 170, a * g3, C.argued, 'MODEL · 选定的输入');
    txt('chosen inputs: field table · mass unit · light-heavy cut', 200, 262, { size: 30, fam: F.math, w: 700, c: C.white, a: a * g3 });
    txt('window hit ≠ prediction · 命中窗口 ≠ 预言', 200, 320, { size: 30, fam: F.zh, w: 700, c: C.argued, a: a * at(S, 3, 0.6, 2.2) });
  }
  /* line 1: cut 9 */
  const la = a * at(S, 1, 0.6), cur2 = at(S, 2, 0.5);
  if (la > 0.003) {
    const col = cur2 > 0.5 ? C.white : C.now;
    panel(160, 400, 780, 430, la, C.cyan, 'CUT = 9 · 分界 9');
    const cnt = Q(S, 1, 'zero 8359', 1.6), n = Math.round(lerp(1, 8359, ease(cnt)));
    txt('#' + n, 200, 485, { size: 54, fam: F.orb, w: 900, c: cnt >= 1 ? col : C.dim, a: la });
    txt('scan · 逐枚穷举', 500, 480, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la });
    txt('modes · α_s · curvature hits', 200, 535, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la });
    txt('#1–#8192:  67 · 22 · 2   →  0 triple hits', 200, 572, { size: 22, fam: F.mono, w: 700, c: C.white, a: la });
    txt('#1–#8359:  69 · 23 · 3   →  first hit', 200, 608, { size: 22, fam: F.mono, w: 700, c: C.white, a: la * cnt });
    const ha = la * Q(S, 1, 'passes all three', 0.6);
    txt('#8359   γ ≈ 8462.07', 200, 668, { size: 34, fam: F.mono, w: 700, c: col, a: ha });
    txt('α_s ∈ (0.1184112, 0.1184213)', 200, 712, { size: 22, fam: F.math, w: 700, c: C.white, a: ha });
    txt('curvature ratio 0.99935102', 200, 748, { size: 22, fam: F.math, w: 700, c: C.white, a: ha });
    txt('held-out |V_ub| 23.026% low · 留出检验偏低', 200, 795, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ha });
  }
  /* line 2: the site-variance cut */
  const sa = a * at(S, 2, 0.6);
  if (sa > 0.003) {
    panel(980, 400, 820, 430, sa, C.cyan, 'SITE-VARIANCE CUT · 站点方差分界');
    txt('T = 9 + (1 − δ)²', 1020, 470, { size: 30, fam: F.math, w: 700, c: C.white, a: sa });
    const ax0 = 1040, ax1 = 1740, y = 555;
    line(ax0, y, ax1, y, C.dim, sa, 2);
    line(1160, y - 12, 1160, y + 12, C.white, sa, 2.5); txt('9', 1160, y + 38, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a: sa });
    line(1620, y - 12, 1620, y + 12, C.white, sa, 2.5); txt('T', 1620, y + 38, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a: sa });
    const ea = sa * Q(S, 2, 'site-variance cut', 0.6);
    dot(1330, y, 11, 'g', ea);
    txt('charge-6 third eigenvalue ≈ 9.2061', 1330, y - 22, { size: 18, fam: F.math, w: 700, align: 'center', c: C.now, a: ea });
    txt('positions schematic · 示意', ax1, y - 22, { size: 16, fam: F.zh, w: 700, align: 'right', c: C.dim, a: ea });
    const ha = sa * Q(S, 2, 'gets in first', 0.6);
    txt('#8236   γ ≈ 8354.92', 1020, 668, { size: 34, fam: F.mono, w: 700, c: C.now, a: ha });
    txt('α_s ∈ (0.1183058, 0.1183120)', 1020, 712, { size: 22, fam: F.math, w: 700, c: C.white, a: ha });
    txt('curvature ratio 1.00093826', 1020, 748, { size: 22, fam: F.math, w: 700, c: C.white, a: ha });
    txt('#8236 and #8359: the only two hits up to #8359', 1020, 795, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ha });
  }
};

/* ======================================================================= */
/*                              scene 7 · THE HONEST GAP                     */
/* ======================================================================= */
SCENES.gap = S => {
  const a = zwFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [1, null, 'open'], [2, 'Higher up', 'argued'], [2, 'selection is open', 'open']]);
  /* left: the global average */
  const la = a * at(S, 0, 0.6);
  panel(140, 200, 760, 320, la, C.lean, 'LEAN · GLOBAL AVERAGES · 全局平均');
  if (la > 0.003) {
    for (let k = 0; k < 48; k++) line(180 + k * 14.5, 400, 180 + k * 14.5, 400 - 22 - 18 * rnd(k, 11), C.cyan, la * 0.8, 2);
    line(180, 330, 862, 330, C.lean, la, 2); line(180, 330, 180, 345, C.lean, la, 2); line(862, 330, 862, 345, C.lean, la, 2);
    txt('Σ over all 0 < γ ≤ T', 521, 315, { size: 24, fam: F.math, w: 700, align: 'center', c: C.lean, a: la });
    txt('phase deficits · pair moments · 1/√π', 180, 455, { size: 24, fam: F.math, w: 700, c: C.white, a: la });
    txt('每条界都是截至 T 的整段平均', 180, 495, { size: 22, fam: F.zh, w: 700, c: C.dim, a: la });
  }
  /* right: the single zero */
  const ra = a * at(S, 1, 0.6);
  panel(1020, 200, 760, 320, ra, C.now, 'SHELL READS ONE ZERO · 球壳读单枚');
  if (ra > 0.003) {
    line(1060, 400, 1740, 400, C.dim, ra * 0.6, 1.5);
    line(1400, 400, 1400, 300, C.now, ra, 5); dot(1400, 300, 12, 'g', ra);
    txt('#8236 · #8359 · #11431', 1400, 455, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: ra });
    txt('一枚零点，或寥寥几枚', 1400, 495, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra });
  }
  /* the missing bridge */
  const oa = a * Q(S, 1, 'No comparison theorem', 0.6);
  if (oa > 0.003) {
    ctx.save(); ctx.setLineDash([10, 9]); line(905, 360, 1015, 360, C.open, oa, 3); ctx.restore();
    txt('?', 960, 340, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.open, a: oa });
    panel(460, 548, 1000, 92, oa, C.open, 'OPEN');
    txt('comparison theorem: global average → single zero · 比较定理缺位', 960, 608, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: oa });
  }
  /* line 2: locality, and the aphorism */
  const da = a * Q(S, 2, 'almost every centre', 0.6);
  txt('higher up, centres beating #11431 have natural density 1 · ARGUED', W / 2, 690, { size: 22, fam: F.math, w: 700, align: 'center', c: C.argued, a: da });
  const qa = a * Q(S, 2, 'Averages are welded', 0.6);
  zwRich([['Averages are welded. ', C.white], ['Selection is open.', C.open]], W / 2, 775, { size: 46, fam: F.disp, align: 'center', a: qa, ab: 2 });
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
/* the end card of closingCard, with the nine citations set smaller so that they stay above the subtitles */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  const from = 0.1, a = clamp((S.u - from) / 1.0) * clamp((S.d - S.u) / 1.2);
  if (a <= 0) return;
  const b = DATA.book, f = DATA.film, cx = W / 2;
  drawHyper(CUBE4, [[0, 3, S.t * 0.21], [1, 2, S.t * 0.13], [2, 3, S.t * 0.17]], { scale: 1.1, a: 0.3 * a, cx, cy: 300, camZ: 7, lw: 1.4, dots: false });
  txt(b.code, cx, 210, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
  txt(b.title.zh, cx, 290, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, a, ab: 3 });
  txt(b.title.en, cx, 350, { size: 36, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * 0.92, ls: 2 });
  const p2 = clamp((S.u - from - 0.8) / 0.8) * a;
  txt(`${(STR.en.film || 'FILM').toUpperCase()} · ${f.title.toUpperCase()}`, cx, 410, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p2, ls: 3 });
  txt(f.title_zh, cx, 446, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: p2 * 0.85 });
  const p3 = clamp((S.u - from - 1.6) / 0.8) * a;
  const y = leanList(cx, 510, p3, { align: 'center', size: 18, gap: 33 });
  const pin = DATA.pin || {};
  if (pin.commit) txt(`github.com/${pin.repo} @ ${pin.commit.slice(0, 12)}`, cx, y + 4, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p3, ls: 1 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  txt(DATA.film.title_zh, W / 2, 290, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WINDOWS ON THE ZEROS', W / 2, 380, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  /* the critical line folded onto the unit circle, and the 19-zero window */
  const cx = W / 2, cy = 610, r = 150;
  ring(cx, cy, r, C.dim, 0.8, 1.5);
  curve(i => { const y = -6 + 12 * i; const w = zwCayley(0.5, y); return [cx + w[0] * r, cy - w[1] * r]; }, 200, C.cyan, 1, 4);
  const w = zwCayley(0.5, 0.7);
  dot(cx + w[0] * r, cy - w[1] * r, 13, 'g', 1);
  line(cx - 700, cy, cx - 260, cy, C.dim, 0.6, 1.5);
  line(cx + 260, cy, cx + 700, cy, C.dim, 0.6, 1.5);
  for (let i = 0; i < 9; i++) { dot(cx - 680 + i * 50, cy, 7, i === 5 ? 'c' : 'w', 0.8); dot(cx + 280 + i * 50, cy, 7, i === 4 ? 'c' : 'w', 0.8); }
  zwRich([['Re s = 1/2', C.cyan], ['   ⟶   ', C.dim], ['|w| = 1', C.lean]], W / 2, 830, { size: 36, align: 'center', ab: 1 });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 920, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
