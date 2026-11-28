/* Film · Every prime is its own axis · 每个素数都是一根轴
   (book quantum-geometry, chapter 22, §22.2 with §22.3). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     axes    12 = 2·2·3 has exponent address (2, 1, 0) on the axes 2, 3, 5; every whole number n ≥ 1 has exactly
             one address (unique factorisation, chapter 22; argued). The lattice drawn is the 5-smooth numbers
             2^a 3^b 5^c with a ≤ 3, b ≤ 2, c ≤ 1 (computed). "One direction for every prime" is a picture (argued).
     sum     the geometric series of one axis, 1 + p^-s + p^-2s + … = 1/(1 − p^-s); at s = 2 the axes 2 and 3 give
             4/3 · 9/8 = 3/2, drawn as a rectangle of tiles of width 4^-a and height 9^-b, the tile (a, b) of area
             1/n² with n = 2^a 3^b (computed: the sum of 1/n² over 3-smooth n is 3/2)
             ..... ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product and ZetaIdentities.riemann_zeta_euler_product
             (LEAN, for Re s > 1).
     apart   3^12 = 531441 (odd) and 2^19 = 524288 (even), ratio 1.01364, difference 7153; 12 ln 3 − 19 ln 2 =
             0.013551 (computed) ..... PrimeLogIndependence.prime_log_indep (LEAN: an integer combination of prime
             logarithms over a finite set of primes vanishes only when every coefficient is 0).
     clocks  the clock p reads p^-it, angle t ln p clockwise from twelve; two clocks read the point
             (t ln 2, t ln 3) of the torus, drawn for 0 ≤ t ≤ 185.827 (computed). The line never closes and comes
             arbitrarily close to every point: hand derivation of the chapter from prime_log_indep and Kronecker
             (argued) ..... BiquadraticKroneckerTimes.dense_circle_sequence (LEAN, as stated: sampled readings
             e^{2πi a_j m} under the integer-independence hypothesis). The near misses of "both at six": at the
             times t = (2a + 1)π / ln 2 when clock 2 points exactly at six, the record misses of clock 3 (computed).
             Both exactly at six never: (2b + 1) ln 2 = (2a + 1) ln 3 is impossible (hand derivation; argued).
     edge    "orthogonal" is a picture (argued); density gives no waiting time (the chapter; argued; the table is
             computed); the product formula needs Re s > 1, Σ 1/n diverges (classical); the Riemann hypothesis is
             proved by an external Lean 4 project and is not frozen in the pinned repository (PROJECT.md §14):
             neither green nor red; number-field ERH and Grand RH stay open (red).

   On load, FILM.init checks DATA.lean against the four theorems and re-derives every number on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const PA_LEAN = {
  riemann_zeta_dirichlet_sum_eq_euler_product: 'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  riemann_zeta_euler_product: 'D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product',
  prime_log_indep: 'D5/S3/Factorization/PrimeLogIndependence.prime_log_indep',
  dense_circle_sequence: 'D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence'
};
const L2 = Math.log(2), L3 = Math.log(3);
/* torus of readings: φ = angle of clock 2 (around the hole), ψ = angle of clock 3 (around the tube) */
const TR = { R: 1, r: 0.42 };
const torusPt = (ph, ps, lift = 0) => { const q = TR.R + (TR.r + lift) * Math.cos(ps); return [q * Math.cos(ph), q * Math.sin(ph), (TR.r + lift) * Math.sin(ps)]; };
const T_END = Math.PI * 41 / L2;     /* the 21st time clock 2 points at six (a = 20): t ≈ 185.827 */
/* exponent address on (2, 3, 5) */
function paAddress(n) { const e = [0, 0, 0]; [2, 3, 5].forEach((p, i) => { while (n % p === 0) { n /= p; e[i]++; } }); return n === 1 ? e : null; }
/* the wrapped distance (radians) of an angle from six o'clock (π) */
const fromSix = x => { const y = ((x - Math.PI) % TAU + TAU) % TAU; return Math.min(y, TAU - y); };
/* record near misses: times when clock 2 points exactly at six, and clock 3's distance from six (degrees) */
const PA_MISS = [];
FILM.init.push(() => {
  let best = Infinity;
  for (let a = 0; a <= 200; a++) {
    const t = Math.PI * (2 * a + 1) / L2, m = fromSix(t * L3) * 180 / Math.PI;
    if (m < best) { best = m; PA_MISS.push({ a, t, m }); }
  }
});

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('primes film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(PA_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(PA_LEAN).length}`);
  for (const [short, gid] of Object.entries(PA_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. AXES: addresses, by trial division against the drawn lattice */
  check(JSON.stringify(paAddress(12)) === '[2,1,0]' && JSON.stringify(paAddress(90)) === '[1,2,1]', 'addresses of 12 and 90');
  check(paAddress(7) === null && paAddress(14) === null, '7 needs another axis');
  for (let n = 1; n <= 200; n++) {
    const e = paAddress(n);
    if (e) check(Math.pow(2, e[0]) * Math.pow(3, e[1]) * Math.pow(5, e[2]) === n, `address of ${n}`);
  }
  /* uniqueness on the drawn box: distinct exponent triples give distinct numbers */
  const seen = new Set();
  for (let a = 0; a <= 3; a++) for (let b = 0; b <= 2; b++) for (let c = 0; c <= 1; c++) {
    const n = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c);
    check(!seen.has(n), `the number ${n} has two addresses`); seen.add(n);
  }

  /* 2. SUM: the two series at s = 2 and the tiles */
  let s2 = 0, s3 = 0, tiles = 0;
  for (let k = 0; k <= 60; k++) { s2 += Math.pow(4, -k); s3 += Math.pow(9, -k); }
  check(near(s2, 4 / 3, 1e-14) && near(s3, 9 / 8, 1e-14) && near(4 / 3 * 9 / 8, 1.5), '4/3, 9/8, 3/2');
  for (let n = 1; n <= 2e6; n++) { let m = n; while (m % 2 === 0) m /= 2; while (m % 3 === 0) m /= 3; if (m === 1) tiles += 1 / (n * n); }
  check(near(tiles, 1.5, 1e-11), `Σ 1/n² over 3-smooth n ≤ 2·10^6 is ${tiles}, expected 3/2`);

  /* 3. APART: the comma */
  check(Math.pow(3, 12) === 531441 && Math.pow(2, 19) === 524288 && 531441 - 524288 === 7153, '3^12, 2^19');
  check((531441 / 524288).toFixed(5) === '1.01364', 'the ratio 1.01364');
  check((12 * L3 - 19 * L2).toFixed(6) === '0.013551', '12 ln 3 − 19 ln 2 = 0.013551');
  check(L2.toFixed(4) === '0.6931' && L3.toFixed(4) === '1.0986', 'ln 2, ln 3');

  /* 4. CLOCKS: the record near misses, by an independent scan of all times with clock 2 at six */
  const want = [[0, '4.53', '105.3'], [1, '13.60', '44.1'], [3, '31.73', '17.1'], [8, '77.05', '10.0'], [20, '185.83', '2.98'],
    [73, '666.26', '1.89'], [126, '1146.69', '0.81'], [179, '1627.12', '0.28']];
  check(PA_MISS.length === want.length, `${PA_MISS.length} record misses, expected ${want.length}`);
  want.forEach(([a, t, m], i) => {
    const r = PA_MISS[i] || {};
    check(r.a === a && r.t.toFixed(2) === t && fmtDeg(r.m) === m, `record miss ${i}: ${JSON.stringify(r)}`);
  });
  for (let a = 0; a <= 200; a++) {
    const t = (2 * a + 1) * Math.PI / L2;
    check(near(fromSix(t * L2), 0, 1e-9), `clock 2 at six at a = ${a}`);
    check(fromSix(t * L3) > 1e-3, `clock 3 not exactly at six at a = ${a}`);
  }
  check(near(T_END, PA_MISS[4].t, 1e-12), 'the drawn line ends at the fifth record');
  /* the torus point of (π, π) is the inner equator */
  const tp = torusPt(Math.PI, Math.PI);
  check(near(tp[0], -(TR.R - TR.r), 1e-12) && near(tp[2], 0, 1e-12), 'six–six on the inner equator');
});
Object.assign(FILM.speed, { axes: 0.02, sum: 0.014, apart: 0.016, clocks: 0.012, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
function fmtDeg(m) { return m >= 10 ? m.toFixed(1) : m.toFixed(2); }
const paFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function paRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const PA_MISSING = new Set();
function paLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!PA_MISSING.has(gid)) { PA_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* opening title */
function paTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('EVERY PRIME IS ITS OWN AXIS', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('ADDRESS · SUM = PRODUCT · NO EXCHANGE RATE · TORUS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
/* a clock dial: reading angle th (radians, clockwise from twelve) */
function paDial(x, y, R, th, a, o = {}) {
  if (a <= 0.003) return;
  ring(x, y, R, C.white, a * 0.6, 2);
  for (let k = 0; k < 12; k++) {
    const g = TAU * k / 12, r0 = k % 3 ? R * 0.9 : R * 0.8;
    line(x + r0 * Math.sin(g), y - r0 * Math.cos(g), x + R * Math.sin(g), y - R * Math.cos(g), C.white, a * 0.6, k % 3 ? 1.2 : 2.5);
  }
  const hx = x + R * 0.86 * Math.sin(th), hy = y - R * 0.86 * Math.cos(th);
  line(x, y, hx, hy, o.col || C.now, a, 5);
  dot(hx, hy, 9, o.pearl || 'g', a);
  dot(x, y, 6, 'w', a);
  if (o.label) txt(o.label, x, y + R + 40, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a });
  if (o.sub) txt(o.sub, x, y + R + 74, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
}

/* ======================================================================= */
/*                               scene 1 · ADDRESSES                         */
/* ======================================================================= */
const AX = { O: [930, 700], e2: [128, 0], e3: [0, -118], e5: [-92, 64] };
const axP = (a, b, c) => [AX.O[0] + a * AX.e2[0] + b * AX.e3[0] + c * AX.e5[0], AX.O[1] + a * AX.e2[1] + b * AX.e3[1] + c * AX.e5[1]];
SCENES.axes = S => {
  const u = S.u;
  paTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Every positive', 'argued'], [2, null, 'argued']]);
  /* left: the factorisation and the counts */
  panel(120, 190, 620, 345, a, C.cyan, 'COUNT THE PRIMES · 数素数');
  paRich([['12 = 2 × 2 × 3', C.white]], 150, 278, { size: 44, a });
  const ca = a * Q(S, 0, 'Count its', 0.6);
  [['2', '× 2', 2], ['3', '× 1', 1], ['5', '× 0', 0]].forEach(([p, s, k], i) => {
    const y = 350 + i * 52;
    txt(`twos · threes · fives`.split(' · ')[i], 150, y, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ca });
    txt(`${p}  ${s}`, 330, y, { size: 30, fam: F.math, w: 700, c: k ? C.cyan : C.dim, a: ca });
  });
  const ad = a * Q(S, 1, 'an address', 0.6);
  paRich([['address · 地址  ', C.white], ['(2, 1, 0)', C.now]], 150, 512, { size: 30, a: ad, fam: F.zh });

  /* the lattice of 5-smooth numbers 2^a 3^b 5^c, a ≤ 3, b ≤ 2, c ≤ 1 */
  const la = a * clamp((u - lineAt(S, 0).s - 0.6) / 0.8);
  const axes = [['2', AX.e2, 4.3, C.cyan], ['3', AX.e3, 3.0, C.cyan], ['5', AX.e5, 2.0, C.cyan]];
  for (const [nm, e, L, col] of axes) {
    const x1 = AX.O[0] + e[0] * L, y1 = AX.O[1] + e[1] * L;
    arrow(AX.O[0], AX.O[1], x1, y1, col, la * 0.85, 3);
    txt(`axis ${nm}`, x1 + (e[0] >= 0 ? 14 : -14), y1 + (e[1] > 0 ? 34 : -12), { size: 24, fam: F.mono, w: 700, align: e[0] >= 0 ? 'left' : 'right', c: col, a: la });
  }
  /* more axes (line 2): 7, 11, … */
  const ma = a * Q(S, 2, 'one direction for every prime', 0.8);
  if (ma > 0.003) {
    for (const [nm, e, L] of [['7', [96, 70], 1.3], ['11', [-120, -20], 1.0], ['13', [60, -140], 0.9]]) {
      ctx.save(); ctx.setLineDash([9, 8]);
      line(AX.O[0], AX.O[1], AX.O[0] + e[0] * L, AX.O[1] + e[1] * L, C.argued, ma * 0.85, 2.5);
      ctx.restore();
      txt(nm, AX.O[0] + e[0] * (L + 0.2), AX.O[1] + e[1] * (L + 0.2) + 8, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.argued, a: ma });
    }
    txt('7, 11, 13, … one direction per prime', 1710, 250, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.argued, a: ma });
    txt('每个素数一个方向（图像）', 1710, 284, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.argued, a: ma });
  }
  /* lattice points */
  for (let c = 0; c <= 1; c++) for (let b = 0; b <= 2; b++) for (let k = 0; k <= 3; k++) {
    const n = Math.pow(2, k) * Math.pow(3, b) * Math.pow(5, c), p = axP(k, b, c);
    const is12 = n === 12, pa = la * clamp((u - lineAt(S, 0).s - 0.6 - 0.04 * (k + 3 * b + 9 * c)) / 0.5);
    if (pa <= 0.003) continue;
    dot(p[0], p[1], is12 ? 0 : 7, 'c', pa * 0.8);
    if (!is12) txt(String(n), p[0] + 10, p[1] - 10, { size: 20, fam: F.mono, w: 700, c: C.dim, a: pa });
  }
  /* the walk to 12: two steps along 2, one along 3 */
  const w1 = Q(S, 1, 'two, one, zero', 1.4);
  if (w1 > 0.003) {
    const p0 = axP(0, 0, 0), p1 = axP(2, 0, 0), p2 = axP(2, 1, 0);
    const k1 = clamp(w1 * 2), k2 = clamp(w1 * 2 - 1);
    line(p0[0], p0[1], lerp(p0[0], p1[0], k1), p1[1], C.now, a, 6);
    if (k2 > 0) line(p1[0], p1[1], p1[0], lerp(p1[1], p2[1], k2), C.now, a, 6);
  }
  const t12 = a * Q(S, 0, 'Twelve', 0.6), p12 = axP(2, 1, 0);
  dot(p12[0], p12[1], 15, 'g', t12);
  txt('12', p12[0] + 18, p12[1] - 18, { size: 34, fam: F.mono, w: 700, c: C.now, a: t12 });
  /* line 2: one ruler, below the left panel */
  const ra = a * at(S, 2, 0.6);
  if (ra > 0.003) {
    panel(120, 565, 620, 225, ra, C.white, 'ONE RULER · 一把尺子');
    line(160, 680, 700, 680, C.white, ra * 0.7, 2);
    for (let n = 1; n <= 12; n++) {
      const x = 160 + (n - 1) * 49;
      line(x, 670, x, 690, C.white, ra * 0.7, 2);
      txt(String(n), x, 724, { size: 20, fam: F.mono, w: 700, align: 'center', c: n === 12 ? C.now : C.dim, a: ra });
    }
    txt('addition lines them up · 加法排成一列', 160, 770, { size: 20, fam: F.zh, w: 700, c: C.white, a: ra * 0.9 });
  }
};

/* ======================================================================= */
/*                          scene 2 · SUM EQUALS PRODUCT                     */
/* ======================================================================= */
const TL_K = 470, TL_X = 1110, TL_Y = 255;          /* pixels per unit; top-left of the tiled rectangle */
SCENES.sum = S => {
  const u = S.u, a = paFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean']]);
  /* left: one axis, its steps and its series */
  const L4 = at(S, 4, 0.5);
  const ea = a * (1 - L4);
  if (ea > 0.003) {
    panel(120, 190, 880, 300, ea, C.cyan, 'ONE AXIS · 一根轴');
    for (let k = 0; k <= 4; k++) {
      const x = 170 + k * 150, sa = ea * clamp((u - lineAt(S, 0).s - 0.25 * k) / 0.5);
      dot(x, 290, 11, k === 0 ? 'w' : 'c', sa);
      if (k > 0) arrow(x - 140, 290, x - 16, 290, C.cyan, sa * 0.8, 2.5);
      txt(k === 0 ? '1' : k === 1 ? 'p⁻ˢ' : `p⁻${['', '', '²', '³', '⁴'][k]}ˢ`, x, 345, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: sa });
    }
    txt('one more step: × p⁻ˢ · 每多一步 × p⁻ˢ', 150, 400, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ea * at(S, 0, 0.6, 1.2) });
    paRich([['1 + p⁻ˢ + p⁻²ˢ + ⋯ = ', C.white], ['1 / (1 − p⁻ˢ)', C.cyan]], 150, 462, { size: 32, a: ea * Q(S, 1, 'geometric series', 0.6) });
  }
  /* s = 2: the two axes as the sides of a rectangle */
  const ra = a * at(S, 2, 0.6);
  if (ra > 0.003 && L4 < 1) {
    const qa = ra * (1 - L4);
    panel(120, 520, 880, 290, qa, C.cyan, 's = 2 · AXES 2 AND 3 · 两根轴');
    paRich([['axis 2:  1 + ¼ + ¹⁄₁₆ + ⋯ = ', C.white], ['4/3', C.cyan]], 150, 600, { size: 30, a: qa });
    paRich([['axis 3:  1 + ⅑ + ¹⁄₈₁ + ⋯ = ', C.white], ['9/8', C.cyan]], 150, 652, { size: 30, a: qa * Q(S, 2, 'nine eighths', 0.5) });
    paRich([['4/3 × 9/8 = ', C.white], ['3/2', C.now]], 150, 722, { size: 40, a: qa * Q(S, 2, 'exactly three halves', 0.5) });
    txt('= Σ 1/n²,  n = 2ᵃ3ᵇ', 150, 780, { size: 28, fam: F.math, w: 700, c: C.white, a: qa * at(S, 3, 0.6) });
  }
  /* the tiled rectangle: column a has width 4^-a, row b has height 9^-b; tile (a, b) has area 1/n², n = 2^a 3^b */
  const grow = ease(Q(S, 2, 'Take s equal to two', 2.4));
  if (grow > 0.003) {
    const tA = a * clamp(grow * 1.4);
    let x = TL_X;
    for (let i = 0; i <= 6; i++) {
      const w = TL_K * Math.pow(4, -i);
      let y = TL_Y;
      for (let j = 0; j <= 5; j++) {
        const h = TL_K * Math.pow(9, -j), n = Math.pow(2, i) * Math.pow(3, j);
        const ta = tA * clamp(grow * 7 - (i + j) * 0.7);
        if (ta > 0.003) {
          const hot = n === 12 && at(S, 3, 0.6) > 0;
          ctx.save(); ctx.globalAlpha = ta;
          ctx.fillStyle = rgba(hot ? C.now : C.cyan, hot ? 0.45 : (i + j) % 2 ? 0.1 : 0.2); ctx.fillRect(x, y, w, h);
          ctx.strokeStyle = rgba(hot ? C.now : C.cyan, 0.85); ctx.lineWidth = Math.min(2, Math.max(0.6, w / 12)); ctx.strokeRect(x, y, w, h);
          ctx.restore();
          if (w >= 30 && h >= 30) txt(String(n), x + w / 2, y + h / 2 + Math.min(w, h) * 0.14, { size: Math.min(34, Math.min(w, h) * 0.42), fam: F.mono, w: 700, align: 'center', c: hot ? C.now : C.white, a: ta });
        }
        y += h;
      }
      x += w;
    }
    /* side lengths */
    const wTot = TL_K * 4 / 3, hTot = TL_K * 9 / 8;
    line(TL_X, TL_Y - 22, TL_X + wTot, TL_Y - 22, C.cyan, tA, 2);
    txt('4/3', TL_X + wTot / 2, TL_Y - 32, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: tA });
    line(TL_X - 22, TL_Y, TL_X - 22, TL_Y + hTot, C.cyan, tA, 2);
    txt('9/8', TL_X - 32, TL_Y + hTot / 2, { size: 26, fam: F.math, w: 700, align: 'right', c: C.cyan, a: tA });
    const la3 = a * at(S, 3, 0.6) * (1 - L4);
    if (la3 > 0.003) {
      const x12 = TL_X + TL_K * (1 + 1 / 4), y12 = TL_Y + TL_K;
      const xm = x12 + TL_K / 32, yb = TL_Y + TL_K * 9 / 8;
      line(xm, y12 + TL_K / 9, xm, yb + 12, C.now, la3 * 0.9, 2);
      txt('tile 12 = ¼² × ⅓² = 1/144 · 一个 n 一块', xm + 40, yb + 44, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a: la3 });
    }
  }
  /* line 4: Lean, for every n and every prime */
  if (L4 > 0.003) {
    const la = a * L4;
    panel(120, 520, 900, 290, la, C.lean, 'Re s > 1 · ALL n, ALL PRIMES · 全体 n，全体素数');
    paRich([['Σ', C.white], ['ₙ', C.white], [' n⁻ˢ  =  ', C.white], ['∏', C.white], ['ₚ', C.white], [' (1 − p⁻ˢ)⁻¹  =  ζ(s)', C.white]], 150, 610, { size: 38, a: la });
    txt('for complex s with Re s > 1 · 复数 s，Re s > 1', 150, 660, { size: 22, fam: F.zh, w: 700, c: C.lean, a: la });
    paLean(150, 722, PA_LEAN.riemann_zeta_dirichlet_sum_eq_euler_product, la * Q(S, 4, 'the sum over all n', 0.5), { size: 20 });
    paLean(150, 772, PA_LEAN.riemann_zeta_euler_product, la * Q(S, 4, 'product over all primes', 0.5), { size: 20 });
    /* the rectangle holds only the axes 2 and 3: say so next to ζ(s) */
    txt(`only 2 and 3: 3/2 < ζ(2) = π²/6 ≈ ${(Math.PI * Math.PI / 6).toFixed(3)} · 只用 2、3 两根轴`, TL_X + TL_K * 2 / 3, TL_Y + TL_K * 9 / 8 + 44, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: la });
    stamp('SUM = PRODUCT', 570, 300, Q(S, 4, 'equals the product', 0.5), C.lean, 40, -0.06);
  }
};

/* ======================================================================= */
/*                            scene 3 · NO EXCHANGE RATE                     */
/* ======================================================================= */
SCENES.apart = S => {
  const u = S.u, a = paFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* line 0: two axes and the question */
  const qa = a * (1 - at(S, 1, 0.5));
  if (qa > 0.003) {
    arrow(560, 600, 1060, 600, C.cyan, qa, 4);
    arrow(560, 600, 560, 260, C.cyan, qa, 4);
    txt('axis 2', 1080, 610, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: qa });
    txt('axis 3', 560, 236, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: qa });
    const wq = Q(S, 0, 'walking along another', 1.0);
    ctx.save(); ctx.setLineDash([10, 9]);
    line(560, 600, lerp(560, 1000, wq), 600, C.now, qa * wq, 5);
    if (wq >= 1) line(1000, 600, 640, 300, C.mag, qa * Q(S, 0, 'Could a power', 0.6), 3);
    ctx.restore();
    txt('3ᵇ = 2ᵃ ?', 1300, 430, { size: 64, fam: F.math, w: 700, align: 'center', c: C.now, a: qa * Q(S, 0, 'Could a power', 0.6) });
  }
  /* line 1: the near miss, as two bars */
  const ba = a * at(S, 1, 0.6);
  if (ba > 0.003) {
    const X0 = 220, KX = 1300 / 531441, y1 = 260, y2 = 380;
    const g = ease(at(S, 1, 1.6));
    ctx.save(); ctx.globalAlpha = ba;
    ctx.fillStyle = rgba(C.cyan, 0.35); ctx.fillRect(X0, y1, KX * 531441 * g, 56);
    ctx.fillStyle = rgba(C.cyan, 0.35); ctx.fillRect(X0, y2, KX * 524288 * g, 56);
    ctx.fillStyle = rgba(C.mag, 0.85); if (g >= 1) ctx.fillRect(X0 + KX * 524288, y1, KX * 7153, 56);
    ctx.restore();
    paRich([['3¹² = 531441', C.white]], X0, y1 - 14, { size: 30, a: ba });
    paRich([['2¹⁹ = 524288', C.white]], X0, y2 - 14, { size: 30, a: ba });
    const oa = ba * Q(S, 1, 'One is odd', 0.6);
    txt('odd · 奇数', X0 + 1320, y1 + 40, { size: 26, fam: F.zh, w: 700, c: C.mag, a: oa });
    txt('even · 偶数', X0 + 1320, y2 + 40, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: oa });
    paRich([['ratio 1.01364 · gap 7153', C.mag]], X0, 492, { size: 26, a: ba * Q(S, 1, 'one and a half percent', 0.6) });
  }
  /* line 2: Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(220, 540, 1480, 270, la, C.lean, 'ANY FINITE SET S OF PRIMES, ANY k : S → ℤ · 任意有限个素数，任意整数系数');
    paRich([['Σ', C.white], ['ₚ∈S', C.white], [' k(p) ln p = 0  ', C.white], ['⟹', C.lean], ['  k(p) = 0 for every p ∈ S', C.white]], 250, 630, { size: 38, a: la });
    paRich([['12 ln 3 − 19 ln 2 = 0.013551 ≠ 0', C.cyan]], 250, 690, { size: 28, a: la * Q(S, 2, 'only when every', 0.6) });
    txt('computed · 屏幕上的计算', 800, 690, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la * Q(S, 2, 'only when every', 0.6) });
    paLean(250, 760, PA_LEAN.prime_log_indep, la, { size: 20 });
  }
  /* line 3: the aphorism */
  const sa = at(S, 3, 0.5, 0.2);
  stamp('NO EXCHANGE RATE', 1100, 485, sa, C.white, 34, -0.04);
  txt('素数之间，没有汇率', 1460, 500, { size: 30, fam: F.zh, w: 900, c: C.white, a: a * sa });
};

/* ======================================================================= */
/*                          scene 4 · CLOCKS ON A DOUGHNUT                   */
/* ======================================================================= */
const CK_SHOT = [110, 175, 1000, 680];
function ckTime(S) {
  const s1 = lineAt(S, 1).s, e2 = lineAt(S, 2).e;
  if (S.u < s1) return 6 * clamp(S.u / Math.max(s1, 0.1));
  return 6 + (T_END - 6) * ease(clamp((S.u - s1) / (e2 - s1)));
}
function ckTrail(T) {
  const pts = [], n = Math.max(2, Math.ceil(T / 0.045));
  for (let i = 0; i <= n; i++) { const t = T * i / n; pts.push(torusPt(t * L2, t * L3, 0.012)); }
  return pts;
}
function ckTorus(sh, T, o = {}) {
  sh.surface('torus', (uu, vv) => torusPt(TAU * uu, TAU * vv), { u: [0, 1], v: [0, 1], nu: 96, nv: 40, color: C.blue, grid: { every: [8, 5], color: C.cyan, alpha: 0.22 }, pick: false });
  if (T > 0.05) sh.tube('trail', ckTrail(T), { color: C.cyan, width: o.width || 2.6, glow: 0.6, sides: 6 });
  sh.bead(torusPt(0, 0, 0.02), { color: C.white, r: 7, alpha: 0.8 });
  sh.bead(torusPt(T * L2, T * L3, 0.02), { color: C.now, r: 11 });
  /* the target (π, π): a magenta ring lifted off the surface, drawn after the amber bead so it stays on top */
  if (o.target) {
    const tq = torusPt(Math.PI, Math.PI, 0.06), n = [1, 0, 0];
    sh.ring(tq, { color: C.mag, r: 20, normal: n, alpha: o.target });
    sh.bead(tq, { color: C.mag, r: 5, alpha: o.target });
  }
}
const ckShot = (key, yaw) => solid(key, { x: CK_SHOT[0], y: CK_SHOT[1], w: CK_SHOT[2], h: CK_SHOT[3], yaw, pitch: 0.82, zoom: 1.22, radius: 0.3 });
SCENES.clocks = S => {
  const u = S.u, a = paFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'never closes', 'argued'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  const T = ckTime(S), tgt = Q(S, 4, 'six o', 0.6);
  const sa = a * clamp((u - lineAt(S, 1).s + 0.6) / 0.9);
  const sh = ckShot('torus', -2.1 + 0.035 * u);
  sh.begin();
  ckTorus(sh, T, { target: tgt });
  sh.end(sa);
  if (sa > 0.01) {
    const st = sh.anchor(torusPt(0, 0, 0.02)), cur = sh.anchor(torusPt(T * L2, T * L3, 0.02));
    txt('t = 0', st.x + 16, st.y + 30, { size: 22, fam: F.mono, w: 700, c: C.white, a: sa * (st.hidden ? 0.35 : 0.9) });
    /* "now" fades out during line 3; at line 4 it comes back below the bead with the miss */
    const nowA = sa * (cur.hidden ? 0.35 : 1) * (1 - at(S, 3, 0.5)), missA = sa * at(S, 4, 0.5);
    txt('now · 此刻', cur.x + 16, cur.y - 16, { size: 22, fam: F.zh, w: 700, c: C.now, a: nowA });
    if (missA > 0.01) txt(`now · miss ${fmtDeg(PA_MISS[4].m)}° · 差 ${fmtDeg(PA_MISS[4].m)}°`, cur.x + 30, cur.y + 46, { size: 24, fam: F.zh, w: 700, c: C.now, a: missA, ab: 1 });
    if (tgt > 0.01) {
      const tp = sh.anchor(torusPt(Math.PI, Math.PI, 0.06)), lx = 150, ly = 222;
      txt('target: both at six · 目标：都指六点', lx, ly, { size: 26, fam: F.zh, w: 700, c: C.mag, a: sa * tgt, ab: 1 });
      ctx.save(); ctx.setLineDash([7, 6]);
      line(lx + 120, ly + 14, tp.x - 16, tp.y - 16, C.mag, sa * tgt * 0.9, 2);
      ctx.restore();
    }
    txt('torus of readings · 读数环面', 160, 222, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa * (1 - tgt) });
  }
  /* the two dials */
  const da = a;
  paDial(1290, 320, 100, T * L2, da, { label: 'clock 2 · 时钟 2', sub: 'speed ln 2 = 0.6931' });
  paDial(1610, 320, 100, T * L3, da, { label: 'clock 3 · 时钟 3', sub: 'speed ln 3 = 1.0986' });
  txt(`t = ${T.toFixed(2)}`, 1450, 196, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: da });
  txt('reading p⁻ⁱᵗ', 1450, 226, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a: da * (1 - at(S, 1, 0.5)) });
  /* line 2: never closes (hand derivation from the independence of ln 2 and ln 3) */
  const na = a * Q(S, 2, 'never closes', 0.6) * (1 - at(S, 3, 0.5));
  if (na > 0.003) {
    panel(1160, 560, 640, 170, na, C.argued, 'NO COMMON BEAT · 没有公共节拍');
    txt('ln 3 / ln 2 = 1.58496… is irrational', 1184, 630, { size: 24, fam: F.mono, w: 700, c: C.white, a: na });
    txt('the line never closes · 永不闭合（手工推导）', 1184, 680, { size: 22, fam: F.zh, w: 700, c: C.argued, a: na });
  }
  /* line 3: Kronecker, as Lean states it */
  const ka = a * Q(S, 3, 'Lean checks', 0.6) * (1 - at(S, 4, 0.5));
  if (ka > 0.003) {
    panel(1140, 530, 680, 300, ka, C.lean, 'KRONECKER · 克罗内克');
    paRich([['if  Σ kⱼaⱼ ∈ ℤ  ⟹  all kⱼ = 0', C.white]], 1164, 600, { size: 28, a: ka });
    paRich([['then every target z on the torus is a limit', C.white]], 1164, 646, { size: 26, a: ka });
    paRich([['of  (exp(2πi aⱼ mₙ))ⱼ ,  mₙ ∈ ℕ', C.white]], 1164, 690, { size: 26, a: ka });
    txt('任意目标都是按步取样读数的极限', 1164, 730, { size: 22, fam: F.zh, w: 700, c: C.white, a: ka });
    txt('prime clocks, one flash every τ:  aⱼ = −τ ln pⱼ / 2π', 1164, 766, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ka });
    paLean(1164, 808, PA_LEAN.dense_circle_sequence, ka, { size: 20 });
  }
  /* line 4: both at six — the record near misses (computed) */
  if (tgt > 0.003) {
    const ta = a * tgt;
    panel(1140, 530, 680, 300, ta, C.cyan, 'CLOCK 2 AT SIX · CLOCK 3 MISSES BY');
    PA_MISS.forEach((r, i) => {
      const y = 590 + i * 29, ra = ta * clamp((u - lineAt(S, 4).s - 0.25 * i) / 0.4), hot = Math.abs(r.t - T_END) < 1e-9;
      txt(`t ≈ ${r.t.toFixed(2)}`, 1166, y, { size: 22, fam: F.mono, w: 700, c: hot ? C.now : C.white, a: ra });
      txt(`${fmtDeg(r.m)}°`, 1470, y, { size: 22, fam: F.mono, w: 700, align: 'right', c: hot ? C.now : C.cyan, a: ra });
    });
    const nv = ta * Q(S, 4, 'Never', 0.5), nc = ta * Q(S, 4, 'As close', 0.5);
    txt('exactly both:', 1510, 590, { size: 20, fam: F.mono, w: 700, c: C.argued, a: nv });
    txt('never · 永不', 1510, 620, { size: 20, fam: F.zh, w: 700, c: C.argued, a: nv });
    txt('as close as', 1510, 664, { size: 20, fam: F.mono, w: 700, c: C.argued, a: nc });
    txt('you like · 任意近', 1510, 694, { size: 20, fam: F.zh, w: 700, c: C.argued, a: nc });
    txt('hand derivation', 1510, 738, { size: 20, fam: F.mono, w: 700, c: C.argued, a: nc });
    txt('手工推导', 1510, 766, { size: 20, fam: F.zh, w: 700, c: C.argued, a: nc });
    txt('table: computed', 1510, 806, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ta });
  }
};

/* ======================================================================= */
/*                         scene 5 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = paFade(S);
  if (a <= 0) return;
  /* violet only over lines 0–1 (picture, no timetable); lines 2–3 (a classical divergence, an external proof) carry no badge */
  badge(clamp(S.u / 0.8) * (1 - at(S, 2, 0.4)), 'argued');
  const rows = [
    { col: C.argued, en: '"orthogonal" is a picture', zh: '“正交”是一幅图像', note: 'the theorem: linear independence, no angles · 定理是线性无关，不量角度', nc: C.argued },
    { col: C.cyan, en: 'as close as you like ≠ soon', zh: '要多近有多近，不等于很快', note: `with clock 2 at six, clock 3's miss first drops to ${fmtDeg(PA_MISS[7] ? PA_MISS[7].m : 0)}° at t ≈ ${PA_MISS[7] ? PA_MISS[7].t.toFixed(0) : ''} · 证明不给等待时间`, nc: C.dim },
    { col: C.white, en: 'the product needs Re s > 1', zh: '乘积公式要求 Re s > 1', note: 'at s = 1:  1 + ½ + ⅓ + ¼ + ⋯ diverges · 调和级数发散', nc: C.dim },
    { col: C.white, en: 'zeros further left: the Riemann hypothesis', zh: '更左边的零点：黎曼猜想', note: 'proved by an external Lean 4 project · not frozen in this book\'s pinned repository · 外部已验证，本书所钉仓库未冻结', nc: C.white }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, i, 0.6);
    if (ra <= 0.003) return;
    const y = 180 + i * 162;
    panel(220, y, 1480, 146, ra, rw.col);
    txt(rw.en, 250, y + 48, { size: 30, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 1670, y + 48, { size: 28, fam: F.zh, w: 700, align: 'right', c: C.white, a: ra });
    txt(rw.note, 250, y + (i === 3 ? 90 : 98), { size: 22, fam: F.zh, w: 700, c: rw.nc, a: ra * 0.95 });
    if (i === 3) txt('number-field ERH, Grand RH: still open · 一般数域 ERH、大黎曼猜想：仍开放', 250, y + 128, { size: 22, fam: F.zh, w: 700, c: C.open, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 250 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[3], t = sc.end - 1.0;
  background(t, sc, 3, 6);
  const sh = solid('poster', { x: 60, y: 140, w: 1000, h: 800, yaw: -2.0, pitch: 0.82, zoom: 1.3, radius: 0.3 });
  sh.begin();
  ckTorus(sh, T_END, { width: 2.8 });
  sh.end(1);
  txt(DATA.film.title_zh, 1440, 430, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('EVERY PRIME', 1440, 528, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('IS ITS OWN AXIS', 1440, 592, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  paRich([['Σ n⁻ˢ = ∏ (1 − p⁻ˢ)⁻¹', C.white]], 1440, 690, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1440, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 3, sc);
  post(0);
};
