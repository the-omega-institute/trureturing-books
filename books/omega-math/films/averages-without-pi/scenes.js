/* Film · Averages Without Pi · 不用 π 的平均 (book omega-math, chapter 11).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     sphere  the textbook Haar average divides by σ(S³) = 2π² (classical, ARGUED); the first exact averages
             E[w²] = 1/4, E[w⁴] = 1/8, E[w²x²] = 1/24, E[w⁶] = 5/64 (computed from the factorial ratio below).
     routes  §11.1: one Gaussian moment integral in ℝ⁴, Cartesian (four Γ(½) = √π, product π²) and polar
             (radial (m + 1)!/2 times σ(S³) = 2π²); striking π² leaves the factorial ratio (classical shadow,
             Folland 2001, literature result: ARGUED; the 1D and radial integrals are re-checked numerically on load).
     dims    §11.1 comparison with S¹ and S² (ARGUED, as in the chapter). The sphere pictures are schematic.
     rule    def-ch11-pi-free-haar: H(a, b, c, d) = (2a)!(2b)!(2c)!(2d)!/(4ᵐ a!b!c!d!(m + 1)!), odd exponents 0;
             the step ratio (2a + 1)/(2(m + 2)) and the four steps summing to 1 (homogeneity), shown at (1, 0, 0, 0):
             1/2 + 1/6 + 1/6 + 1/6; the 4×4 tiles of (w² + x² + y² + z²)²: 4 × 1/8 + 12 × 1/24 = 1 (computed).
     ladder  E[κᵏ] = H(k, 0, 0, 0) = Cₖ/4ᵏ: 1, 1/4, 1/8, 5/64, 7/128, 21/512 and the steps 1/4, 1/2, 5/8, 7/10, 3/4
             (computed; the chapter's table) ..... OmegaBargmannHaarHecke.haarKappaMoment_succ (LEAN: the step
             recurrence for every k in Omega.IntRatio.Equivalent).
     gram    χ₀ = 1, χ₁ = 4κ − 1, χ₂ = 16κ² − 12κ + 1; ⟨χ₁, χ₂⟩ = 5 − 8 + 4 − 1 = 0, ⟨χ₂, χ₂⟩ = 14 − 30 + 22 − 6 + 1 = 1
             (computed, ex-ch11-orthonormality-hand-ledger) ..... OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal
             (LEAN: the six entries of the 3×3 Gram table).
     every   OmegaSphericalHaarMidpoint.haar_evenChar_expectation (LEAN: the average of E_r is zeroDelta r);
             OmegaSphericalHaarMidpoint.evenChar_product_sum (LEAN, chapter 10: E_m E_n = Σ_{r=|m−n|}^{m+n} E_r);
             OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal (LEAN: haarInner(E_m, E_n) ≡ δ_mn).
             The worked runs (2, 3) and (3, 3) are computed.
     edge    §11.4: √2 for (1, 1, 0, 0), the CHSH ceiling 2√2, φ = (1 + √5)/2; chapter 12's pairs of fractions
             (ARGUED, a pointer to the next chapter).
   The recorded axiom lists of the four chapter-11 declarations are [] on the strict backend and [propext] on the
   official backend (chapter 11 introduction; the lock file's official field).

   On load, FILM.init checks DATA.lean against the five theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const AP_LEAN = {
  haarKappaMoment_succ: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.haarKappaMoment_succ',
  peter_weyl_chi012_orthonormal: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal',
  haar_evenChar_expectation: 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.haar_evenChar_expectation',
  evenChar_product_sum: 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.evenChar_product_sum',
  all_degree_peter_weyl_orthonormal: 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal'
};
/* exact fractions as BigInt pairs [n, d], d > 0, reduced */
const bg = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
const Fr = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d < 0n) { n = -n; d = -d; } const g = bg(n, d) || 1n; return [n / g, d / g]; };
const fAdd = (a, b) => Fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => Fr(a[0] * b[0], a[1] * b[1]);
const fEq = (a, b) => a[0] * b[1] === b[0] * a[1];
const fStr = a => (a[1] === 1n ? `${a[0]}` : `${a[0]}/${a[1]}`);
const fNum = a => Number(a[0]) / Number(a[1]);
const fact = n => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };
/* def-ch11-pi-free-haar: the factorial average of w^{2a} x^{2b} y^{2c} z^{2d} / |q|^{2m} */
const Hf = (a, b, c, d) => {
  const m = a + b + c + d;
  return Fr(fact(2 * a) * fact(2 * b) * fact(2 * c) * fact(2 * d), 4n ** BigInt(m) * fact(a) * fact(b) * fact(c) * fact(d) * fact(m + 1));
};
const MOM = k => Hf(k, 0, 0, 0);
/* E_0 = 1, E_1 = 4κ − 1, E_{n+1} = (4κ − 2) E_n − E_{n−1} (def-ch10-even-chebyshev): integer coefficients, ascending */
const EP = [[1n], [-1n, 4n]];
for (let n = 1; n < 16; n++) {
  const a = EP[n], b = EP[n - 1], c = new Array(n + 2).fill(0n);
  a.forEach((x, i) => { c[i + 1] += 4n * x; c[i] -= 2n * x; });
  b.forEach((x, i) => { c[i] -= x; });
  EP.push(c);
}
const pMul = (p, q) => { const r = new Array(p.length + q.length - 1).fill(0n); p.forEach((x, i) => q.forEach((y, j) => { r[i + j] += x * y; })); return r; };
const pAdd = (p, q) => { const r = new Array(Math.max(p.length, q.length)).fill(0n); p.forEach((x, i) => { r[i] += x; }); q.forEach((x, i) => { r[i] += x; }); return r; };
/* haarKappaPoly: weight the degree-k coefficient by E[κᵏ]; the terms one by one, and their sum */
const avgTerms = p => p.map((c, k) => fMul(Fr(c), MOM(k)));
const avg = p => avgTerms(p).reduce(fAdd, Fr(0));
const inner = (m, n) => avg(pMul(EP[m], EP[n]));
const LADDER = [0, 1, 2, 3, 4, 5].map(MOM);
const STEPS = [1, 2, 3, 4, 5].map(k => Fr(2 * k - 1, 2 * (k + 1)));
const CATALAN = [1, 1, 2, 5, 14, 42];
const T12 = avgTerms(pMul(EP[1], EP[2])).reverse();   // 64·5/64, −64·1/8, 16·1/4, −1
const T22 = avgTerms(pMul(EP[2], EP[2])).reverse();   // 256·7/128, −384·5/64, 176·1/8, −24·1/4, 1
const GRAM = [0, 1, 2].map(i => [0, 1, 2].map(j => inner(i, j)));

/* numeric integrals for the classical shadow (independent of the factorial formula) */
function simpson(f, a, b, n = 4000) {
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return s * h / 3;
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('averages-without-pi film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(AP_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(AP_LEAN).length}`);
  for (const [short, gid] of Object.entries(AP_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. ROUTES: the 1D Gaussian moments, the radial integral, Γ(½)⁴ = π², σ(S³) = 2π² (numerically) */
  for (let k = 0; k <= 4; k++) {
    const I = simpson(t => Math.pow(t, 2 * k) * Math.exp(-t * t), -12, 12);
    const ex = Number(fact(2 * k)) / (Math.pow(4, k) * Number(fact(k))) * Math.sqrt(Math.PI);
    check(Math.abs(I - ex) < 1e-9 * Math.max(1, ex), `∫ t^${2 * k} e^(−t²) = (2k)!/(4^k k!) √π`);
  }
  for (let m = 0; m <= 4; m++) {
    const I = simpson(r => Math.pow(r, 2 * m + 3) * Math.exp(-r * r), 0, 14);
    check(Math.abs(I - Number(fact(m + 1)) / 2) < 1e-8 * Number(fact(m + 1)), `radial integral (m + 1)!/2 at m = ${m}`);
  }
  /* the full identity: Cartesian product / (polar radial × 2π²) equals H, for a few exponent tuples */
  for (const [a, b, c, d] of [[0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0], [2, 1, 0, 1], [3, 0, 2, 0]]) {
    const m = a + b + c + d;
    const g1 = k => simpson(t => Math.pow(t, 2 * k) * Math.exp(-t * t), -12, 12);
    const cart = g1(a) * g1(b) * g1(c) * g1(d);
    const polar = simpson(r => Math.pow(r, 2 * m + 3) * Math.exp(-r * r), 0, 14) * 2 * Math.PI * Math.PI;
    check(Math.abs(cart / polar - fNum(Hf(a, b, c, d))) < 1e-9, `Gaussian ratio = H(${a}, ${b}, ${c}, ${d})`);
  }

  /* 2. RULE: the step ratio, homogeneity, the worked tiles */
  for (let a = 0; a <= 4; a++) for (let b = 0; b <= 3; b++) for (let c = 0; c <= 3; c++) for (let d = 0; d <= 2; d++) {
    const m = a + b + c + d, h = Hf(a, b, c, d);
    check(fEq(Hf(a + 1, b, c, d), fMul(h, Fr(2 * a + 1, 2 * (m + 2)))), `step ratio at (${a}, ${b}, ${c}, ${d})`);
    const s = [Hf(a + 1, b, c, d), Hf(a, b + 1, c, d), Hf(a, b, c + 1, d), Hf(a, b, c, d + 1)].reduce(fAdd, Fr(0));
    check(fEq(s, h), `homogeneity at (${a}, ${b}, ${c}, ${d})`);
  }
  check(fEq(Hf(0, 0, 0, 0), Fr(1)), 'H(0, 0, 0, 0) = 1');
  check(fEq(Hf(2, 0, 0, 0), Fr(1, 8)) && fEq(Hf(1, 1, 0, 0), Fr(1, 24)), 'H(2,0,0,0) = 1/8, H(1,1,0,0) = 1/24');
  check(fEq(fAdd(fMul(Fr(4), Hf(2, 0, 0, 0)), fMul(Fr(12), Hf(1, 1, 0, 0))), Fr(1)), '4 × 1/8 + 12 × 1/24 = 1');
  {
    const st = [[2, 1, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 2]].map(([a, b, c, d]) => Hf(a - 1, b - 1, c - 1, d - 1));
    const r = [Hf(2, 0, 0, 0), Hf(1, 1, 0, 0), Hf(1, 0, 1, 0), Hf(1, 0, 0, 1)].map(x => fMul(x, Fr(st[0][1], st[0][0])));
    check(fStr(r[0]) === '1/2' && fStr(r[1]) === '1/6' && fStr(r[2]) === '1/6' && fStr(r[3]) === '1/6', 'steps at (1, 0, 0, 0): 1/2, 1/6, 1/6, 1/6');
    check(fStr(Hf(1, 0, 0, 0)) === '1/4' && fStr(Hf(3, 0, 0, 0)) === '5/64', 'E[w²] = 1/4, E[w⁶] = 5/64');
  }

  /* 3. LADDER: the chapter's table, the steps, Catalan by its own recurrence, the semicircle moments */
  check(LADDER.map(fStr).join() === '1,1/4,1/8,5/64,7/128,21/512', `moments ${LADDER.map(fStr).join()}`);
  check(STEPS.map(fStr).join() === '1/4,1/2,5/8,7/10,3/4', `steps ${STEPS.map(fStr).join()}`);
  for (let k = 0; k < 5; k++) check(fEq(LADDER[k + 1], fMul(LADDER[k], STEPS[k])), `ladder step ${k}`);
  for (let k = 0; k < 20; k++) check(fEq(MOM(k + 1), fMul(MOM(k), Fr(2 * k + 1, 2 * (k + 2)))), `haarKappaStep at ${k}`);
  {
    const Cr = [1n];
    for (let n = 0; n < 12; n++) { let s = 0n; for (let i = 0; i <= n; i++) s += Cr[i] * Cr[n - i]; Cr.push(s); }
    for (let k = 0; k <= 12; k++) check(fEq(fMul(MOM(k), Fr(4n ** BigInt(k))), Fr(Cr[k])), `4^k E[κ^k] = C_${k}`);
    check(Cr.slice(0, 6).map(Number).join() === CATALAN.join(), 'Catalan 1, 1, 2, 5, 14, 42');
    /* semicircle (2/π)√(1 − c²) on [−1, 1]: the classical shadow of E[κᵏ] with κ = c² */
    for (let k = 0; k <= 5; k++) {
      const th = simpson(t => (2 / Math.PI) * Math.pow(Math.cos(t), 2 * k) * Math.sin(t) * Math.sin(t), 0, Math.PI);
      check(Math.abs(th - fNum(MOM(k))) < 1e-10, `semicircle moment ${k}`);
    }
  }

  /* 4. GRAM: the characters, the two worked pairings, the 3×3 table, the half-spin norm */
  check(EP[1].join() === '-1,4' && EP[2].join() === '1,-12,16', 'χ₁ = 4κ − 1, χ₂ = 16κ² − 12κ + 1');
  check(pMul(EP[1], EP[2]).join() === '-1,16,-64,64', 'χ₁χ₂ = 64κ³ − 64κ² + 16κ − 1');
  check(pMul(EP[2], EP[2]).join() === '1,-24,176,-384,256', 'χ₂² = 256κ⁴ − 384κ³ + 176κ² − 24κ + 1');
  check(T12.map(fStr).join() === '5,-8,4,-1', `⟨χ₁, χ₂⟩ terms ${T12.map(fStr).join()}`);
  check(T22.map(fStr).join() === '14,-30,22,-6,1', `⟨χ₂, χ₂⟩ terms ${T22.map(fStr).join()}`);
  GRAM.forEach((row, i) => row.forEach((v, j) => check(fEq(v, Fr(i === j ? 1 : 0)), `Gram (${i}, ${j}) = ${fStr(v)}`)));
  check(fEq(avg([0n, 16n, -64n, 64n]), Fr(1)), 'E[χ_{3/2}²] = 1');
  /* E_r(c²) = U_{2r}(c) = sin((2r + 1)θ)/sin θ at c = cos θ: an independent look at the polynomials */
  for (let r = 0; r < 10; r++) for (const th of [0.3, 0.9, 1.7, 2.6]) {
    const kap = Math.cos(th) ** 2, v = EP[r].reduce((s, c, i) => s + Number(c) * Math.pow(kap, i), 0);
    check(Math.abs(v - Math.sin((2 * r + 1) * th) / Math.sin(th)) < 1e-7, `E_${r}(cos²θ) = U_${2 * r}(cos θ)`);
  }

  /* 5. EVERY: averages of E_r, the product rule, all-degree orthonormality */
  for (let r = 0; r < 16; r++) check(fEq(avg(EP[r]), Fr(r === 0 ? 1 : 0)), `average of E_${r}`);
  for (let m = 0; m <= 7; m++) for (let n = 0; n <= 7; n++) {
    let s = [0n];
    for (let r = Math.abs(m - n); r <= m + n; r++) s = pAdd(s, EP[r]);
    const p = pMul(EP[m], EP[n]);
    check(p.length === s.length && p.every((x, i) => x === s[i]), `E_${m} E_${n} = Σ E_r`);
    check(fEq(inner(m, n), Fr(m === n ? 1 : 0)), `⟨E_${m}, E_${n}⟩`);
  }
});
Object.assign(FILM.speed, { sphere: 0.02, routes: 0.014, dims: 0.016, rule: 0.014, ladder: 0.016, gram: 0.014, every: 0.016, edge: 0.018, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const apFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function apRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  const xs = [];
  for (const [s, col] of parts) { xs.push([cx, cx + tw(s, size, fam, w)]); txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return xs;
}
const AP_MISSING = new Set();
function apLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const gid = AP_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!AP_MISSING.has(gid)) { AP_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(key, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a strike-through bar over a measured span */
function apStrike(x0, x1, y, p, col = C.now) {
  if (p <= 0.003) return;
  line(x0 - 6, y + 8, lerp(x0 - 6, x1 + 6, ease(p)), y - 18, col, 1, 4);
}
/* a schematic sphere: latitude and longitude ellipses */
function apSphere(cx, cy, R, yaw, col, a, o = {}) {
  if (a <= 0.003) return;
  ring(cx, cy, R, col, a * 0.9, 2);
  const tilt = o.tilt == null ? 0.32 : o.tilt;
  ctx.save(); ctx.globalAlpha = a * 0.55; ctx.strokeStyle = col; ctx.lineWidth = 1.3;
  for (let i = 1; i < 6; i++) {
    const la = -Math.PI / 2 + Math.PI * i / 6, r = R * Math.cos(la), y = cy - R * Math.sin(la) * Math.cos(tilt);
    ctx.beginPath(); ctx.ellipse(cx, y, r, Math.abs(r * Math.sin(tilt)) + 0.1, 0, 0, TAU); ctx.stroke();
  }
  for (let i = 0; i < 6; i++) {
    const lo = yaw + Math.PI * i / 6, rx = Math.abs(R * Math.sin(lo));
    ctx.beginPath(); ctx.ellipse(cx, cy, rx + 0.1, R, 0, 0, TAU); ctx.stroke();
  }
  ctx.restore();
  if (o.extra) {
    /* a second family of tilted great circles: a reminder that S³ lives one dimension up (schematic) */
    ctx.save(); ctx.globalAlpha = a * 0.5; ctx.strokeStyle = o.extra; ctx.lineWidth = 1.4;
    for (let i = 0; i < 4; i++) {
      const ph = yaw * 1.6 + Math.PI * i / 4;
      ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.98, R * Math.abs(Math.cos(ph)) * 0.98 + 0.1, 0.6 + i * 0.42, 0, TAU); ctx.stroke();
    }
    ctx.restore();
  }
}
function apTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('AVERAGES WITHOUT PI', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('TWO ROUTES · FACTORIAL RULE · CATALAN LADDER · ORTHONORMAL SHELLS', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 4 });
}

/* ======================================================================= */
/*                       scene 1 · AN AREA FULL OF PI                        */
/* ======================================================================= */
SCENES.sphere = S => {
  const u = S.u;
  apTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'plain fraction', 'computed']]);
  apSphere(520, 500, 260, 0.2 + 0.25 * u, C.vio, a, { extra: C.cyan });
  txt('S³ ⊂ ℝ⁴', 520, 820, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('drawn one dimension down · 示意图', 520, 205, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* the textbook average */
  panel(1000, 200, 800, 250, a, C.argued, 'TEXTBOOK · 教科书的平均');
  apRich([['E[f] = ', C.white], ['1', C.white], [' / σ(S³)', C.white], ['  ·  ∫ f dσ', C.white]], 1400, 300, { size: 40, align: 'center', a });
  const pa = a * Q(S, 0, 'two pi squared', 0.6);
  apRich([['σ(S³) = ', C.white], ['2π²', C.mag]], 1400, 385, { size: 52, align: 'center', a: pa });
  /* the exact answers */
  const fa = a * Q(S, 1, 'plain fraction', 0.6);
  panel(1000, 475, 800, 355, fa, C.cyan, 'EXACT AVERAGES · 精确平均');
  const rows = [['E[w²]', Hf(1, 0, 0, 0)], ['E[w⁴]', Hf(2, 0, 0, 0)], ['E[w²x²]', Hf(1, 1, 0, 0)], ['E[w⁶]', Hf(3, 0, 0, 0)]];
  rows.forEach(([l, v], i) => {
    const ra = a * Q(S, 1, 'plain fraction', 0.4, 0.25 * i);
    const x = 1040 + (i % 2) * 380, y = 560 + Math.floor(i / 2) * 85;
    apRich([[l + ' = ', C.white], [fStr(v), C.cyan]], x, y, { size: 40, a: ra });
  });
  const qa = a * Q(S, 1, 'Where did the pi go', 0.6);
  txt('π  ?', 1400, 790, { size: 64, fam: F.math, w: 900, align: 'center', c: C.now, a: qa, ab: 2 });
};

/* ======================================================================= */
/*                            scene 2 · TWO ROUTES                           */
/* ======================================================================= */
SCENES.routes = S => {
  const a = apFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const ia = a * at(S, 0, 0.6);
  txt('I = ∫ w²ᵃ x²ᵇ y²ᶜ z²ᵈ · exp(−w² − x² − y² − z²)  over ℝ⁴', W / 2, 205, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: ia });
  txt('classical shadow · Folland 2001 · literature result · 经典推导（文献结果）', W / 2, 243, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ia });
  /* route 1 */
  const r1 = a * at(S, 1, 0.6);
  panel(120, 270, 820, 300, r1, C.cyan, 'ROUTE 1 · CARTESIAN · 逐轴分离');
  apRich([['∫ t²ᵏ exp(−t²) dt = ', C.white], ['(2k)!/(4ᵏ k!)', C.white], [' · √π', C.mag]], 150, 350, { size: 32, a: r1 });
  ['w', 'x', 'y', 'z'].forEach((n, i) => {
    const ca = r1 * Q(S, 1, 'each coordinate', 0.4, 0.3 * i);
    chip(240 + i * 160, 430, 130, 56, `${n} · √π`, C.mag, ca, 26, F.math);
  });
  const p2a = r1 * Q(S, 1, 'Four of them', 0.6);
  apRich([['I = ', C.white], ['π²', C.mag], [' · (2a)!(2b)!(2c)!(2d)! / (4ᵐ a!b!c!d!)', C.white]], 150, 525, { size: 28, a: p2a });
  /* route 2 */
  const r2 = a * at(S, 2, 0.6);
  panel(980, 270, 820, 300, r2, C.cyan, 'ROUTE 2 · POLAR · 极坐标');
  apRich([['radius: ∫ r²ᵐ⁺³ exp(−r²) dr = ', C.white], ['(m + 1)!/2', C.cyan]], 1010, 350, { size: 30, a: r2 });
  apRich([['area: σ(S³) = ', C.white], ['2π²', C.mag]], 1010, 420, { size: 30, a: r2 * Q(S, 2, 'the area, two', 0.5) });
  apRich([['I = ', C.white], ['π²', C.mag], [' · (m + 1)! · E[w²ᵃx²ᵇy²ᶜz²ᵈ]', C.white]], 1010, 525, { size: 28, a: r2 * Q(S, 2, 'the area, two', 0.5, 0.8) });
  /* equate and strike */
  const r3 = a * at(S, 3, 0.6);
  panel(120, 595, 1680, 240, r3, C.now, 'EQUATE · 两边相等');
  const xs = apRich([['π²', C.mag], [' · (2a)!(2b)!(2c)!(2d)! / (4ᵐ a!b!c!d!)   =   ', C.white], ['π²', C.mag], [' · (m + 1)! · E', C.white]], W / 2, 680, { size: 34, align: 'center', a: r3 });
  const sp = Q(S, 3, 'Strike it', 0.5);
  if (r3 > 0.003) { apStrike(xs[0][0], xs[0][1], 680, sp * r3); apStrike(xs[2][0], xs[2][1], 680, sp * r3); }
  const ea = r3 * Q(S, 3, 'a ratio of factorials', 0.6);
  apRich([['E[w²ᵃx²ᵇy²ᶜz²ᵈ] = ', C.white], ['(2a)!(2b)!(2c)!(2d)! / (4ᵐ a!b!c!d! (m + 1)!)', C.cyan]], W / 2, 775, { size: 38, align: 'center', a: ea });
};

/* ======================================================================= */
/*                              scene 3 · WHY FOUR                           */
/* ======================================================================= */
SCENES.dims = S => {
  const a = apFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const cols = [
    { x: 120, t: 'S¹ · circle · 圆周', rows: [['Γ(½)² = π', C.white], ['σ(S¹) = 2π', C.white], ['π cancels', C.cyan], ['abelian · 交换群', C.mag]], r: at(S, 0, 0.5) },
    { x: 690, t: 'S² · two-sphere · 二维球面', rows: [['Γ(½)³ = π√π', C.white], ['σ(S²) = 4π', C.white], ['√π left over', C.mag], ['not a group · 不是群', C.mag]], r: Q(S, 0, 'the two-sphere', 0.5) },
    { x: 1260, t: 'S³ · three-sphere · 三维球面', rows: [['Γ(½)⁴ = π²', C.white], ['σ(S³) = 2π²', C.white], ['(m + 1)! · whole', C.cyan], ['SU(2) · non-abelian', C.now]], r: at(S, 1, 0.5) }
  ];
  cols.forEach((c, i) => {
    const ca = a * c.r, focus = i === 2 && at(S, 1, 0.5) > 0;
    panel(c.x, 190, 540, 640, ca, focus ? C.now : C.cyan, c.t);
    const cx = c.x + 270, cy = 360;
    if (i === 0) ring(cx, cy, 110, C.cyan, ca, 3);
    if (i === 1) apSphere(cx, cy, 110, 0.3 + 0.3 * u, C.cyan, ca);
    if (i === 2) { apSphere(cx, cy, 110, 0.3 + 0.3 * u, C.vio, ca, { extra: C.cyan }); txt('schematic · 示意', cx, 498, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ca }); }
    c.rows.forEach(([s, col], k) => txt(s, cx, 560 + k * 70, { size: k < 3 ? 36 : 32, fam: k < 3 ? F.math : F.zh, w: 700, align: 'center', c: col, a: ca }));
  });
};

/* ======================================================================= */
/*                          scene 4 · A FACTORIAL RULE                       */
/* ======================================================================= */
const RU_V = ['w²', 'x²', 'y²', 'z²'];
SCENES.rule = S => {
  const a = apFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const d0 = a * at(S, 0, 0.6);
  panel(120, 185, 1680, 165, d0, C.cyan, 'DEFINITION · 定义');
  apRich([['H(a, b, c, d) = ', C.white], ['(2a)! (2b)! (2c)! (2d)!  /  (4ᵐ · a! b! c! d! · (m + 1)!)', C.cyan]], W / 2, 280, { size: 38, align: 'center', a: d0 });
  txt('the average of w²ᵃ x²ᵇ y²ᶜ z²ᵈ / ‖q‖²ᵐ,  m = a + b + c + d', W / 2, 330, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: d0 });
  /* odd powers */
  const o1 = a * at(S, 1, 0.6);
  panel(120, 375, 760, 130, o1, C.cyan, 'ODD POWERS · 奇次幂');
  apRich([['E[w x²] = ', C.white], ['0', C.cyan], ['     w ↦ −w', C.dim]], 150, 460, { size: 36, a: o1 });
  /* the step test at (1, 0, 0, 0) */
  const s2 = a * at(S, 2, 0.6);
  panel(120, 525, 760, 310, s2, C.cyan, 'STEP TEST · 齐次检验  (a, b, c, d) = (1, 0, 0, 0)');
  apRich([['H(a + 1, …) / H = (2a + 1) / (2(m + 2))', C.white]], 150, 600, { size: 28, a: s2 });
  const steps = [Fr(1, 2), Fr(1, 6), Fr(1, 6), Fr(1, 6)], cols = [C.cyan, C.mag, C.vio, C.blue];
  let bx = 150; const BW = 700;
  steps.forEach((v, i) => {
    const pa = s2 * Q(S, 2, 'The four steps', 0.4, 0.25 * i), w = BW * fNum(v);
    if (pa > 0.003) {
      fillBox(bx + 2, 640, (w - 4) * ease(pa), 64, cols[i], 0.35 * pa);
      box(bx + 2, 640, w - 4, 64, cols[i], pa, 2);
      txt(fStr(v), bx + w / 2, 682, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: pa });
      txt(RU_V[i], bx + w / 2, 732, { size: 22, fam: F.math, w: 700, align: 'center', c: cols[i], a: pa });
    }
    bx += w;
  });
  const sa = s2 * Q(S, 2, 'add to one', 0.5);
  apRich([['1/2 + 1/6 + 1/6 + 1/6 = ', C.white], ['1', C.now]], 150, 780, { size: 30, a: sa });
  txt('always: (2a+1) + (2b+1) + (2c+1) + (2d+1) = 2(m + 2)', 150, 818, { size: 20, fam: F.math, w: 700, c: C.dim, a: sa });
  /* the 4×4 tiles of (w² + x² + y² + z²)² */
  const g3 = a * at(S, 3, 0.6);
  panel(920, 375, 880, 460, g3, C.cyan, '(w² + x² + y² + z²)² · 16 TILES · 十六块');
  if (g3 > 0.003) {
    const gx = 1060, gy = 435, cw = 175, ch = 66;
    RU_V.forEach((n, i) => {
      txt(n, gx + i * cw + cw / 2, gy - 8 + 22, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: g3 });
      txt(n, gx - 50, gy + 40 + (i + 0.5) * ch + 8, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: g3 });
    });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const diag = i === j, ta = g3 * Q(S, 3, diag ? 'four times' : 'plus twelve', 0.3, 0.06 * (i * 4 + j) * (diag ? 0 : 1) + (diag ? 0.15 * i : 0));
      const x = gx + j * cw, y = gy + 40 + i * ch, col = diag ? C.cyan : C.mag;
      if (ta <= 0.003) continue;
      box(x + 4, y + 4, cw - 8, ch - 8, col, ta, 1.6, rgba(col, 0.12));
      txt(diag ? fStr(Hf(2, 0, 0, 0)) : fStr(Hf(1, 1, 0, 0)), x + cw / 2, y + ch / 2 + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: ta });
    }
    apRich([['4 × 1/8', C.cyan], [' + ', C.white], ['12 × 1/24', C.mag], [' = 1/2 + 1/2 = ', C.white], ['1', C.now]], 1360, 800, { size: 32, align: 'center', a: g3 * Q(S, 3, 'plus twelve', 0.5) });
  }
};

/* ======================================================================= */
/*                          scene 5 · CATALAN LADDER                         */
/* ======================================================================= */
function apLadder(x0, base, H0, a, rev, cur, o = {}) {
  const sp = o.sp || 160, bw = o.bw || 110;
  LADDER.forEach((v, k) => {
    const ra = a * rev(k);
    if (ra <= 0.003) return;
    const x = x0 + k * sp, h = H0 * fNum(v) * ease(ra), col = k === cur ? C.now : C.cyan;
    fillBox(x - bw / 2, base - h, bw, h, col, 0.28 * ra);
    box(x - bw / 2, base - h, bw, h, col, ra, 2);
    txt(fStr(v), x, base - h - 18, { size: k > 2 ? 34 : k ? 40 : 44, fam: F.mono, w: 700, align: 'center', c: col, a: ra });
    if (!o.noAxis) txt(`k = ${k}`, x, base + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
  });
}
SCENES.ladder = S => {
  const a = apFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const x0 = 210, base = 640, sp = 160;
  /* which rung is being spoken */
  const said = ['One,', 'a quarter', 'an eighth', 'five sixty-fourths', 'seven over'];
  const rev = k => (k < 5 ? Q(S, 1, said[k], 0.5) : Q(S, 2, 'fourteen', 0.5));
  let cur = -1;
  said.forEach((p, k) => { if (S.u >= phraseAt(S, 1, p)) cur = k; });
  if (S.u >= lineAt(S, 2).s) cur = -1;
  const r0 = a * at(S, 0, 0.6);
  /* the first rung appears with line 0 already */
  apLadder(x0, base, 340, a, k => (k === 0 ? Math.max(at(S, 0, 0.6), rev(0)) : rev(k)), cur, { sp });
  line(x0 - 90, base, x0 + 5 * sp + 90, base, C.dim, r0, 1.5);
  /* the step multipliers between rungs */
  STEPS.forEach((v, k) => {
    const sa = a * rev(k + 1);
    if (sa <= 0.003) return;
    const xa = x0 + k * sp + 30, xb = x0 + (k + 1) * sp - 30, y = 230;
    arrow(xa, y, xb, y, C.mag, sa, 2);
    txt(`× ${fStr(v)}`, (xa + xb) / 2, y - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: sa });
  });
  /* the Catalan row */
  const ca = a * at(S, 2, 0.6);
  CATALAN.forEach((c, k) => {
    const ka = a * Q(S, 2, 'Catalan numbers', 0.4, 0.25 * k);
    txt(String(c), x0 + k * sp, 740, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.white, a: ka });
  });
  txt('Cₖ = 4ᵏ · E[κᵏ]   Catalan · 卡塔兰数', x0 - 60, 800, { size: 24, fam: F.zh, w: 700, c: C.dim, a: ca });
  /* the rule and the Lean step */
  panel(1150, 200, 650, 630, r0, C.cyan, 'MOMENTS OF κ · κ 的矩');
  apRich([['κ = w² / ‖q‖²', C.white]], 1180, 285, { size: 32, a: r0 });
  apRich([['E[κᵏ] = H(k, 0, 0, 0)', C.white]], 1180, 345, { size: 30, a: r0 });
  apRich([['= (2k)! / (4ᵏ k! (k + 1)!)', C.white]], 1180, 395, { size: 30, a: r0 });
  const st = a * Q(S, 0, 'Each moment', 0.6);
  apRich([['E[κᵏ⁺¹] = E[κᵏ] · ', C.white], ['(2k + 1) / (2(k + 2))', C.mag]], 1180, 475, { size: 27, a: st });
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    fillBox(1170, 530, 610, 1.5, C.lean, la * 0.6);
    txt('haarKappaMoment (k + 1)', 1180, 590, { size: 24, fam: F.mono, w: 700, c: C.white, a: la });
    txt('  ≡ haarKappaMoment k · haarKappaStep k', 1180, 630, { size: 24, fam: F.mono, w: 700, c: C.white, a: la });
    txt('for every k : Nat · Omega.IntRatio.Equivalent', 1180, 670, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la });
    apLean(1180, 730, 'haarKappaMoment_succ', la, { size: 22 });
    txt('recorded axioms: strict [] · official [propext]', 1180, 790, { size: 19, fam: F.mono, w: 700, c: C.dim, a: la });
  }
};

/* ======================================================================= */
/*                     scene 6 · SHELLS AT RIGHT ANGLES                      */
/* ======================================================================= */
const GR = { x0: 230, x1: 900, y0: 770, y1: 330, lo: -1.5, hi: 5 };
const grX = k => lerp(GR.x0, GR.x1, k), grY = v => lerp(GR.y0, GR.y1, (v - GR.lo) / (GR.hi - GR.lo));
SCENES.gram = S => {
  const a = apFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* the character curves */
  panel(120, 190, 840, 640, a, C.cyan, 'CHARACTERS IN κ · κ 的特征标');
  txt('E[κᵏ] = 1 · 1/4 · 1/8 · 5/64 · 7/128', 150, 262, { size: 24, fam: F.mono, w: 700, c: C.cyan, a });
  line(GR.x0, grY(0), GR.x1, grY(0), C.dim, a * 0.7, 1.2);
  line(GR.x0, GR.y0, GR.x0, GR.y1, C.dim, a * 0.7, 1.2);
  txt('0', GR.x0 - 14, grY(0) + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  txt('κ = 1', GR.x1, grY(0) + 34, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a });
  const chis = [
    { p: EP[0], c: C.white, l: 'χ₀ = 1', r: at(S, 0, 0.5) },
    { p: EP[1], c: C.cyan, l: 'χ₁ = 4κ − 1', r: Q(S, 0, 'four kappa', 0.6) },
    { p: EP[2], c: C.mag, l: 'χ₂ = 16κ² − 12κ + 1', r: Q(S, 0, 'a quadratic', 0.6) }
  ];
  chis.forEach((ch, i) => {
    const ca = a * ch.r;
    if (ca <= 0.003) return;
    curve(t => { const k = t * ease(ch.r); return [grX(k), grY(ch.p.reduce((s, c, j) => s + Number(c) * Math.pow(k, j), 0))]; }, 120, ch.c, ca, 3.5);
    txt(ch.l, [150, 290, 500][i], 305, { size: 26, fam: F.math, w: 700, c: ch.c, a: ca });
  });
  /* the Gram table */
  panel(1000, 190, 800, 335, a, C.cyan, '⟨χᵢ, χⱼ⟩ · GRAM TABLE · 格拉姆表');
  const gx = 1170, gy = 245, cw = 170, chh = 72;
  [0, 1, 2].forEach(i => {
    txt(`χ${'₀₁₂'[i]}`, gx + i * cw + cw / 2, gy + 20, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a });
    txt(`χ${'₀₁₂'[i]}`, gx - 50, gy + 40 + i * chh + chh / 2 + 9, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a });
  });
  const tFull = Q(S, 3, 'six entries', 0.5);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const is12 = (i === 1 && j === 2) || (i === 2 && j === 1), is22 = i === 2 && j === 2;
    const r = is12 ? Q(S, 1, 'Exactly zero', 0.4) : is22 ? Q(S, 2, 'Exactly one', 0.4) : clamp(tFull * 3 - 0.3 * (i + j) / 2);
    const ca = a * r, v = GRAM[i][j], one = fEq(v, Fr(1));
    const curFocus = (is12 && at(S, 2, 0.1) <= 0) || (is22 && at(S, 3, 0.1) <= 0);
    const col = curFocus ? C.now : one ? C.cyan : C.white;
    const x = gx + j * cw, y = gy + 40 + i * chh;
    box(x + 5, y + 5, cw - 10, chh - 10, C.dim, a * 0.5, 1.2);
    if (ca > 0.003) txt(fStr(v), x + cw / 2, y + chh / 2 + 15, { size: 42, fam: F.mono, w: 700, align: 'center', c: col, a: ca });
  }
  /* the ledger */
  panel(1000, 545, 800, 285, a * at(S, 1, 0.5), C.cyan, 'LEDGER · 手算对账');
  const l1 = a * at(S, 1, 0.5);
  apRich([['χ₁χ₂ = 64κ³ − 64κ² + 16κ − 1', C.white]], 1025, 605, { size: 26, a: l1 });
  const t12 = T12.map(fStr);
  apRich([['→ ', C.dim], [`${t12[0]} − ${t12[1].slice(1)} + ${t12[2]} − ${t12[3].slice(1)} = `, C.white], ['0', C.now]], 1025, 648, { size: 30, a: a * Q(S, 1, 'five, minus eight', 0.6) });
  const l2 = a * at(S, 2, 0.5);
  apRich([['χ₂² = 256κ⁴ − 384κ³ + 176κ² − 24κ + 1', C.white]], 1025, 708, { size: 26, a: l2 });
  const t22 = T22.map(fStr);
  apRich([['→ ', C.dim], [`${t22[0]} − ${t22[1].slice(1)} + ${t22[2]} − ${t22[3].slice(1)} + ${t22[4]} = `, C.white], ['1', C.now]], 1025, 751, { size: 30, a: a * Q(S, 2, 'fourteen, minus thirty', 0.6) });
  apLean(1025, 808, 'peter_weyl_chi012_orthonormal', a * Q(S, 3, 'Lean checks', 0.6), { size: 21 });
};

/* ======================================================================= */
/*                           scene 7 · EVERY DEGREE                          */
/* ======================================================================= */
const EV_X = r => 212 + r * 185;
SCENES.every = S => {
  const a = apFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [2, null, 'computed'], [3, null, 'lean']]);
  /* which pair: (2, 3) first, then (3, 3) */
  const second = S.u >= phraseAt(S, 2, 'only when m equals n');
  const [m, n] = second ? [3, 3] : [2, 3];
  const runA = a * Q(S, 1, 'a run of shells', 0.6);
  const lo = Math.abs(m - n), hi = m + n;
  for (let r = 0; r <= 8; r++) {
    const ta = a * Q(S, 0, 'every even character', 0.35, 0.12 * r);
    if (ta <= 0.003) continue;
    const inRun = r >= lo && r <= hi && runA > 0.003, x = EV_X(r);
    const col = inRun ? (r === 0 ? C.now : C.cyan) : C.dim;
    box(x - 80, 225, 160, 130, col, ta, inRun ? 2.4 : 1.4, inRun ? rgba(col, 0.12) : 'rgba(0,0,0,0.4)');
    txt(`E${'₀₁₂₃₄₅₆₇₈'[r]}`, x, 275, { size: 34, fam: F.math, w: 700, align: 'center', c: inRun ? col : C.white, a: ta });
    txt(r === 0 ? '1' : '0', x, 335, { size: 42, fam: F.mono, w: 700, align: 'center', c: r === 0 ? C.cyan : C.white, a: ta * Q(S, 0, 'averages to zero', 0.5) });
  }
  const t0 = a * Q(S, 0, 'averages to zero', 0.6);
  txt('average · 平均', 120, 205, { size: 20, fam: F.zh, w: 700, c: C.dim, a: t0 });
  txt('haarKappaPoly (evenCharPoly r) ≡ zeroDelta r', 150, 410, { size: 24, fam: F.mono, w: 700, c: C.white, a: t0 });
  apLean(1000, 410, 'haar_evenChar_expectation', t0, { size: 21 });
  /* the product rule */
  panel(120, 440, 1680, 190, runA, C.cyan, `PRODUCT RULE · 乘积律  (m, n) = (${m}, ${n})`);
  const sub = r => `E${'₀₁₂₃₄₅₆₇₈'[r]}`;
  const run = []; for (let r = lo; r <= hi; r++) run.push(sub(r));
  apRich([[`${sub(m)} · ${sub(n)} = `, C.white], [run.join(' + '), C.cyan]], 150, 530, { size: 40, a: runA });
  txt('from |m − n| up to m + n · 从 |m − n| 到 m + n', 150, 585, { size: 22, fam: F.zh, w: 700, c: C.dim, a: runA });
  apLean(1170, 585, 'evenChar_product_sum', runA, { size: 21 });
  /* average of the run */
  const av = a * at(S, 2, 0.6);
  panel(120, 650, 1680, 185, av, second ? C.now : C.cyan, 'AVERAGE THE RUN · 对这一串求平均');
  if (av > 0.003) {
    const terms = []; for (let r = lo; r <= hi; r++) terms.push(r === 0 ? '1' : '0');
    const v = inner(m, n);
    apRich([[`⟨${sub(m)}, ${sub(n)}⟩ = ${terms.join(' + ')} = `, C.white], [fStr(v), C.now]], 150, 725, { size: 38, a: av });
    const fa = a * Q(S, 3, 'every degree', 0.6);
    apRich([['haarInner (Eₘ, Eₙ) ≡ δₘₙ   for all m, n', C.white]], 150, 795, { size: 28, a: fa });
    apLean(1000, 795, 'all_degree_peter_weyl_orthonormal', fa, { size: 21 });
  }
};

/* ======================================================================= */
/*                          scene 8 · THE THRESHOLD                          */
/* ======================================================================= */
SCENES.edge = S => {
  const a = apFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the w–x plane: (1, 1) has length √2; the unit circle */
  const ox = 420, oy = 640, R = 250;
  line(ox - 60, oy, ox + R * 1.6, oy, C.dim, a * 0.7, 1.4);
  line(ox, oy + 60, ox, oy - R * 1.6, C.dim, a * 0.7, 1.4);
  txt('w', ox + R * 1.6 + 14, oy + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  txt('x', ox - 8, oy - R * 1.6 - 14, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a });
  ctx.save(); ctx.globalAlpha = a * 0.8; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ox, oy, R, -Math.PI / 2, 0); ctx.stroke(); ctx.restore();
  const v = a * at(S, 0, 0.6);
  arrow(ox, oy, ox + R, oy - R, C.white, v, 4);
  dot(ox + R, oy - R, 10, 'w', v);
  txt('(1, 1, 0, 0)', ox + R + 18, oy - R - 14, { size: 28, fam: F.math, w: 700, c: C.white, a: v });
  const ua = a * Q(S, 0, 'a unit', 0.6), k = 1 / Math.SQRT2;
  arrow(ox, oy, ox + R * k, oy - R * k, C.now, ua, 5);
  txt('length √2', ox + R + 20, oy - R * 0.5, { size: 28, fam: F.math, w: 700, c: C.mag, a: ua });
  txt('unit circle · 单位圆', ox + R * 0.3, oy + 44, { size: 22, fam: F.zh, w: 700, c: C.cyan, a });
  /* the roots */
  panel(1000, 200, 800, 380, a, C.mag, 'ROOTS THAT FORCE THEIR WAY IN · 挤进来的根号');
  apRich([['‖(1, 1, 0, 0)‖ = ', C.white], ['√2', C.mag]], 1030, 290, { size: 40, a: v });
  apRich([['CHSH ceiling = ', C.white], ['2√2', C.mag]], 1030, 380, { size: 40, a: a * Q(S, 1, 'two root two', 0.6) });
  apRich([['golden φ = (1 + ', C.white], ['√5', C.mag], [')/2', C.white]], 1030, 470, { size: 40, a: a * Q(S, 1, 'root five', 0.6) });
  txt('quadratic irrationals, not rationals · 二次无理数', 1030, 540, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'root five', 0.6) });
  const na = a * at(S, 2, 0.6);
  panel(1000, 605, 800, 225, na, C.cyan, 'NEXT · CHAPTER 12 · 下一章');
  apRich([['a + b√2  ↦  ', C.white], ['(a, b)', C.cyan], ['  a, b ∈ ℚ', C.white]], 1030, 700, { size: 40, a: na });
  txt('a root as a pair of fractions · 根号记成一对分数', 1030, 770, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: na });
};

/* ======================================================================= */
/*                                scene 9 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 270 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[4], t = sc.start + 6;
  background(t, sc, 4, 6);
  apLadder(1040, 700, 440, 0.95, () => 1, -1, { sp: 140, bw: 96 });
  line(950, 700, 1040 + 5 * 140 + 90, 700, C.dim, 0.7, 1.5);
  txt(DATA.film.title_zh, 470, 420, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AVERAGES', 470, 530, { size: 58, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('WITHOUT PI', 470, 605, { size: 58, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  apRich([['E[κᵏ] = Cₖ / 4ᵏ', C.white]], 470, 700, { size: 36, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 470, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 4, sc);
  post(0);
};
