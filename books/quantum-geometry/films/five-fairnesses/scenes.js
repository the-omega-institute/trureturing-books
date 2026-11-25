/* Film · Five ledgers that never cheat · 五本从不作弊的账
   (book quantum-geometry, part VII: chapter 27). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     seat    the five fairness readings as five ledger books (argued); ψ = (0.6, 0.8), φ = (0.8, 0.6i):
             ⟨φ, ψ⟩ = φ̄·ψ = 0.48 − 0.48i, |⟨φ, ψ⟩|² = 0.4608 (computed) ..... RankOneBornPairingWeight.
             rank_one_born_pairing_weight (LEAN): for P_k = φφ*, ρ = ψψ*, recordWeight = ‖φ* ⬝ᵥ ψ‖² = Tr(ρ P_k);
             the swapped overlap ⟨ψ, φ⟩ = 0.48 + 0.48i is the mirror image, same modulus (|z| = |z̄|, computed).
     budget  a pure qubit with Bloch vector r = (0.6, 0, 0.8): purity budget Re Tr ρ² − ½ = ½; the up/down question
             gives 0.9 and 0.1, Σ(p − ½)² = 0.32, the hidden rest 0.18 = r_x²/2 (computed; state = r/√2, visible =
             the z line) ..... ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras
             (LEAN, with its two hypotheses shown); the tilt to 75° redistributes, total ½ (computed).
     copy    φ = (1, 0), ψ = (0.8, 0.6): overlap 0.8 × ⟨blank, blank⟩ = 0.8 before, 0.8² = 0.64 after (computed);
             ..... NoCloningInnerProductCriterion.no_cloning_inner_product_criterion (LEAN): one isometric copier for
             both forces ⟨φ, ψ⟩ = ⟨φ, ψ⟩², so φ = ψ or ⟨φ, ψ⟩ = 0.
     steps   p = 1/100, θ = arcsin √p ≈ 5.74° ..... CoherentUniformAmplification.uniform_operator_rotation (LEAN):
             iterateⁿ U = sin((2n+1)θ) W + cos((2n+1)θ) B; the chance sin²((2n+1)θ) per round, 0.9953 at n = 7
             (computed); the turnstile is a picture (argued).
     stars   α = √2 − 1, starts 0 and 0.3, sky brightness f(x) = (1 + cos 2πx)/2 (a picture, argued); running
             averages of f over N ≤ 240 steps (computed) ..... TorusOrbitEquidistribution.result (LEAN): time average
             → integral over the closed orbit group G; G is the whole circle because α is irrational (Kronecker, the
             chapter's remark), so the limit is ∫ f = ½ for either start (computed).
     edge    the fairness reading (argued), no gate-count lower bound and P vs NP (open), three-qubit monogamy and
             the physical heat of erasure (literature).

   On load, FILM.init checks DATA.lean against the five theorems and re-derives every number shown on screen by an
   independent route. Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const FF_DEG = Math.PI / 180;
const FF_LEAN = {
  rank_one_born_pairing_weight: ['D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight', 'rank_one_born_pairing_weight'],
  complementary_context_probability_pythagoras: ['D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras', 'complementary_context_probability_pythagoras'],
  no_cloning_inner_product_criterion: ['D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion', 'no_cloning_inner_product_criterion'],
  uniform_operator_rotation: ['D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation', 'uniform_operator_rotation'],
  result: ['D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result', 'TorusOrbitEquidistribution.result']
};
/* complex numbers as [re, im]; ⟨a, b⟩ is conjugate-linear in a (Lean's `star a ⬝ᵥ b`) */
const ffC = {
  ip: (a, b) => a.reduce((s, z, k) => [s[0] + z[0] * b[k][0] + z[1] * b[k][1], s[1] + z[0] * b[k][1] - z[1] * b[k][0]], [0, 0]),
  abs2: z => z[0] * z[0] + z[1] * z[1]
};
/* LEDGER ONE */
const SE_PSI = [[0.6, 0], [0.8, 0]], SE_PHI = [[0.8, 0], [0, 0.6]];
/* LEDGER TWO: r = (sin t, 0, cos t) */
const BU_T0 = Math.atan2(0.6, 0.8), BU_T1 = 75 * FF_DEG;
const buShares = t => { const rz = Math.cos(t), rx = Math.sin(t), pu = (1 + rz) / 2, pd = 1 - pu; return { rz, rx, pu, pd, shown: (pu - 0.5) ** 2 + (pd - 0.5) ** 2, hidden: rx * rx / 2 }; };
/* LEDGER THREE */
const CO_X = 0.8, CO_A0 = Math.acos(CO_X), CO_A1 = Math.acos(CO_X * CO_X);
/* LEDGER FOUR */
const ST_P = 0.01, ST_TH = Math.asin(Math.sqrt(ST_P)), ST_N = 8;
const stChance = n => Math.pow(Math.sin((2 * n + 1) * ST_TH), 2);
/* LEDGER FIVE */
const SR_ALPHA = Math.SQRT2 - 1, SR_STARTS = [0, 0.3], SR_NMAX = 240;
const srF = x => (1 + Math.cos(TAU * x)) / 2;
const srFrac = x => x - Math.floor(x);
const SR_AVG = SR_STARTS.map(s => { const out = [0]; let acc = 0; for (let n = 1; n <= SR_NMAX; n++) { acc += srF(s + n * SR_ALPHA); out.push(acc / n); } return out; });

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('five-fairnesses film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(FF_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(FF_LEAN).length}`);
  for (const [short, [gid]] of Object.entries(FF_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. SEAT: unit vectors, the overlap, its modulus square, the trace Tr(ρ P) with ρ = ψψ*, P = φφ*, the mirror */
  check(near(ffC.ip(SE_PSI, SE_PSI)[0], 1) && near(ffC.ip(SE_PHI, SE_PHI)[0], 1), 'ψ and φ are unit vectors');
  const z = ffC.ip(SE_PHI, SE_PSI), zb = ffC.ip(SE_PSI, SE_PHI);
  check(near(z[0], 0.48) && near(z[1], -0.48), '⟨φ, ψ⟩ = 0.48 − 0.48i');
  check(near(zb[0], 0.48) && near(zb[1], 0.48), '⟨ψ, φ⟩ = 0.48 + 0.48i');
  check(near(ffC.abs2(z), 0.4608) && near(ffC.abs2(zb), 0.4608) && near(0.2304 + 0.2304, 0.4608), '|z|² = 0.4608 both ways');
  { /* Tr(ρ P) = Σ_ij ρ_ij P_ji, ρ_ij = ψ_i ψ̄_j, P_ji = φ_j φ̄_i */
    let tr = [0, 0];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const m = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cj = a => [a[0], -a[1]];
      const t = m(m(SE_PSI[i], cj(SE_PSI[j])), m(SE_PHI[j], cj(SE_PHI[i])));
      tr = [tr[0] + t[0], tr[1] + t[1]];
    }
    check(near(tr[0], 0.4608) && near(tr[1], 0), 'Tr(ρ P) = 0.4608');
  }

  /* 2. BUDGET: density matrix purity, probabilities, the shares, the tilt */
  {
    const b = buShares(BU_T0);
    check(near(b.rz, 0.8) && near(b.rx, 0.6) && near(b.pu, 0.9) && near(b.pd, 0.1), 'r = (0.6, 0, 0.8), p = 0.9 / 0.1');
    check(near(b.shown, 0.32) && near(b.hidden, 0.18) && near(b.shown + b.hidden, 0.5), '0.32 + 0.18 = 0.5');
    /* ρ = ½(I + r·σ), Tr ρ² = Σ |ρ_ij|² for Hermitian ρ */
    const rho = [[(1 + b.rz) / 2, b.rx / 2], [b.rx / 2, (1 - b.rz) / 2]];
    const tr2 = rho.flat().reduce((s, x) => s + x * x, 0);
    check(near(tr2 - 0.5, 0.5), 'Re Tr ρ² − ½ = ½ for the pure state');
    /* the Lean hypotheses with state = r/√2 and visible = the z line */
    const st = [b.rx / Math.SQRT2, 0, b.rz / Math.SQRT2];
    check(near(st[0] ** 2 + st[1] ** 2 + st[2] ** 2, tr2 - 0.5) && near(st[2] ** 2, b.shown) && near(st[0] ** 2 + st[1] ** 2, b.hidden), 'state = r/√2 meets both hypotheses');
    for (let k = 0; k <= 40; k++) { const s = buShares(lerp(BU_T0, BU_T1, k / 40)); check(near(s.shown + s.hidden, 0.5), `tilt ${k}`); }
    const e = buShares(BU_T1);
    check(Math.abs(e.shown - 0.0335) < 5e-5 && Math.abs(e.hidden - 0.4665) < 5e-5, 'at 75°: 0.03 + 0.47');
  }

  /* 3. COPY: the overlap before and after, and the two solutions of x = x² */
  {
    const phi = [1, 0], psi = [0.8, 0.6], d = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
    const kron = (a, b) => a.flatMap(x => b.map(y => x * y)), blank = [1, 0];
    check(near(d(phi, psi), 0.8) && near(d(phi, phi), 1) && near(d(psi, psi), 1), 'overlap 0.8');
    check(near(d(kron(phi, blank), kron(psi, blank)), 0.8), 'before: 0.8 × 1');
    check(near(d(kron(phi, phi), kron(psi, psi)), 0.64), 'after: 0.64');
    check(Math.abs(CO_A0 / FF_DEG - 36.87) < 0.005 && Math.abs(CO_A1 / FF_DEG - 50.21) < 0.005, 'angles 36.87° and 50.21°');
    for (let k = 0; k <= 100; k++) { const x = k / 100; check((Math.abs(x - x * x) < 1e-12) === (k === 0 || k === 100), `x = x² only at 0, 1 (${x})`); }
  }

  /* 4. STEPS: the rotation in the W–B plane by an independent route (2×2 Grover iterate), the chances */
  {
    check(Math.abs(ST_TH / FF_DEG - 5.739) < 0.0005, 'θ ≈ 5.74°');
    /* reflections: about B (failure line), then about the start U; start at angle θ from B */
    let v = [Math.cos(ST_TH), Math.sin(ST_TH)];            // components along (B, W)
    const u0 = [Math.cos(ST_TH), Math.sin(ST_TH)];
    for (let n = 0; n < ST_N; n++) {
      check(near(v[1], Math.sin((2 * n + 1) * ST_TH), 1e-12) && near(v[0], Math.cos((2 * n + 1) * ST_TH), 1e-12), `round ${n}`);
      const w = [v[0], -v[1]], dd = 2 * (w[0] * u0[0] + w[1] * u0[1]);
      v = [dd * u0[0] - w[0], dd * u0[1] - w[1]];
    }
    check(near(stChance(0), 0.01), 'chance 0.01 at round 0');
    let best = 0; for (let n = 0; n < ST_N; n++) if (stChance(n) > stChance(best)) best = n;
    check(best === 7 && Math.abs(stChance(7) - 0.9953) < 5e-5, 'peak 99.5% at round 7');
  }

  /* 5. STARS: the space average of f, the running averages, their spread at the end */
  {
    let s = 0; const M = 100000; for (let k = 0; k < M; k++) s += srF((k + 0.5) / M);
    check(near(s / M, 0.5, 1e-9), '∫ f = ½');
    check(SR_ALPHA > 0.41421 && SR_ALPHA < 0.41422, 'α = √2 − 1');
    SR_AVG.forEach((avg, i) => check(Math.abs(avg[SR_NMAX] - 0.5) < 0.01, `start ${SR_STARTS[i]}: average ${avg[SR_NMAX].toFixed(4)} near ½`));
    check(Math.abs(SR_AVG[0][1] - SR_AVG[1][1]) > 0.3, 'the early averages disagree');
  }
});
Object.assign(FILM.speed, { seat: 0.02, budget: 0.014, copy: 0.016, steps: 0.018, stars: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ffFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const ffNum = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function ffRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const FF_MISSING = new Set();
function ffLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = FF_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!FF_MISSING.has(gid)) { FF_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function ffPoly(pts, col, a, fill = 0.25, lw = 2.5, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { if (dash) ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
function ffArc(cx, cy, r, a0, a1, col, a, lw = 2, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1); ctx.stroke(); ctx.restore();
}
/* a horizontal bar of total width w split into coloured parts [[value, colour, label]] */
function ffBar(x, y, w, h, total, parts, a, o = {}) {
  if (a <= 0.003) return;
  let cx = x;
  for (const [v, col, lab] of parts) {
    const pw = w * v / total;
    if (pw > 0.5) {
      fillBox(cx, y, pw, h, col, a * 0.55);
      box(cx, y, pw, h, col, a, 1.5);
      if (lab && pw > 160) txt(lab, cx + pw / 2, y + h / 2 + (o.size || 22) * 0.36, { size: o.size || 22, fam: F.mono, w: 700, align: 'center', c: C.white, a });
    }
    cx += pw;
  }
}
/* the ledger tab in the top-left corner of every ledger scene: number, English and Chinese name */
function ffTab(S, k, en, zh, a) {
  if (a <= 0.003) return;
  fillBox(120, 176, 66, 66, C.argued, a * 0.25); box(120, 176, 66, 66, C.argued, a, 2);
  txt(String(k), 153, 225, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a });
  txt(en, 204, 205, { size: 24, fam: F.orb, w: 900, c: C.white, a, ls: 2 });
  txt(zh, 204, 237, { size: 22, fam: F.zh, w: 700, c: C.argued, a });
}
/* opening title */
function ffTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('FIVE LEDGERS THAT NEVER CHEAT', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('SEAT · BUDGET · COPIES · STEPS · STARLIGHT', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
/* the five books of the reading (scene seat, line 0) */
const FF_BOOKS = [['SEAT', '席位'], ['GAIN–LOSS', '得失'], ['RELATION', '关系'], ['HORIZON', '博弈'], ['ERGODIC', '遍历']];
function ffBooks(a, hi = -1) {
  if (a <= 0.003) return;
  const bw = 250, gap = 44, x0 = W / 2 - (5 * bw + 4 * gap) / 2, y = 330, h = 330;
  FF_BOOKS.forEach(([en, zh], i) => {
    const x = x0 + i * (bw + gap), ia = a * clamp((a - 0.12 * i) / 0.4) * (hi < 0 || hi === i ? 1 : 0.35);
    if (ia <= 0.003) return;
    fillBox(x, y, bw, h, C.argued, ia * 0.12); box(x, y, bw, h, C.argued, ia, 2.5);
    line(x + 22, y + 10, x + 22, y + h - 10, C.argued, ia * 0.6, 2);
    txt(String(i + 1), x + bw / 2 + 10, y + 120, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.white, a: ia });
    txt(en, x + bw / 2 + 10, y + 200, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.white, a: ia, ls: 2 });
    txt(zh + '公平', x + bw / 2 + 10, y + 250, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ia });
  });
  txt('a reading, not a theorem · 读法是诠释，不是定理', W / 2, y + h + 66, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a });
}

/* ======================================================================= */
/*                     scene 1 · LEDGER ONE · NO JUDGE'S CHAIR               */
/* ======================================================================= */
const SE_O = [480, 560], SE_R = 330;
SCENES.seat = S => {
  const u = S.u;
  ffTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'The overlap here', 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* line 0: the five books */
  const ba = a * (1 - at(S, 1, 0.6));
  ffBooks(ba);
  const la = a * at(S, 1, 0.6);
  if (la <= 0.003) return;
  ffTab(S, 1, 'NO JUDGE’S CHAIR', '席位公平：没有裁判席', la);
  /* the complex plane: the unit circle, the real axis as a mirror, the overlap z and its mirror z̄ */
  const P = (re, im) => [SE_O[0] + SE_R * re, SE_O[1] - SE_R * im];
  ring(SE_O[0], SE_O[1], SE_R, C.dim, la * 0.35, 1.2);
  arrow(SE_O[0] - SE_R - 30, SE_O[1], SE_O[0] + SE_R + 40, SE_O[1], C.dim, la * 0.8, 2);
  arrow(SE_O[0], SE_O[1] + SE_R * 0.7, SE_O[0], SE_O[1] - SE_R * 0.75, C.dim, la * 0.8, 2);
  txt('Re', SE_O[0] + SE_R + 50, SE_O[1] + 8, { size: 22, fam: F.mono, w: 700, c: C.dim, a: la });
  txt('Im', SE_O[0] + 12, SE_O[1] - SE_R * 0.75 - 6, { size: 22, fam: F.mono, w: 700, c: C.dim, a: la });
  const za = a * Q(S, 2, 'The overlap here', 0.8);
  const zp = P(0.48, -0.48), r = Math.hypot(0.48, 0.48) * SE_R;
  if (za > 0.003) {
    arrow(SE_O[0], SE_O[1], zp[0], zp[1], C.cyan, za, 5);
    txt('⟨φ, ψ⟩', zp[0] + 16, zp[1] + 30, { size: 30, fam: F.math, w: 700, c: C.cyan, a: za });
    txt('φ measures ψ · φ 量 ψ', zp[0] + 16, zp[1] + 66, { size: 22, fam: F.zh, w: 700, c: C.white, a: za * 0.9 });
  }
  /* the size: a dashed circle of radius |z| (line 2, after "size squared") */
  const ra = a * Q(S, 2, 'size squared', 0.8);
  ffArc(SE_O[0], SE_O[1], r, 0, TAU, C.cyan, ra * 0.7, 2, [7, 7]);
  if (ra > 0.003) txt('|z| = 0.68', SE_O[0] - r - 12, SE_O[1] - 16, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ra });
  /* line 3: the mirror */
  const ma = a * Q(S, 3, 'mirror image', 0.9);
  if (ma > 0.003) {
    const mp = P(0.48, 0.48);
    ctx.save(); ctx.setLineDash([5, 7]); line(zp[0], zp[1], mp[0], mp[1], C.white, ma * 0.5, 1.5); ctx.restore();
    arrow(SE_O[0], SE_O[1], mp[0], mp[1], C.cyan, ma, 5);
    txt('⟨ψ, φ⟩', mp[0] + 16, mp[1] - 12, { size: 30, fam: F.math, w: 700, c: C.cyan, a: ma });
    txt('ψ measures φ · ψ 量 φ', mp[0] + 16, mp[1] - 50, { size: 22, fam: F.zh, w: 700, c: C.white, a: ma * 0.9 });
    txt('mirror · 镜面', SE_O[0] - SE_R + 10, SE_O[1] + 36, { size: 22, fam: F.zh, w: 700, c: C.white, a: ma * 0.8 });
  }
  /* the ledger page */
  panel(1020, 280, 780, 540, la, C.cyan, 'LEDGER ONE · 第一本账');
  ffRich([['ψ = (0.6, 0.8)    ', C.now], ['φ = (0.8, 0.6i)', C.white]], 1048, 350, { size: 30, a: la * at(S, 2, 0.6) });
  ffRich([['⟨φ, ψ⟩ = φ̄·ψ = ', C.white], ['0.48 − 0.48i', C.cyan]], 1048, 410, { size: 30, a: za });
  ffRich([['weight = |⟨φ, ψ⟩|² = ', C.white], ['0.4608', C.cyan]], 1048, 470, { size: 30, a: ra });
  const lea = a * Q(S, 2, 'Lean checks', 0.6);
  if (lea > 0.003) {
    box(1040, 496, 740, 120, C.lean, lea, 1.5);
    txt('P_k = φφ*,  ρ = ψψ*  ⇒  recordWeight = ‖φ* ⬝ ψ‖² = Tr(ρ P_k)', 1056, 540, { size: 20, fam: F.math, w: 700, c: C.white, a: lea });
    ffLean(1056, 592, 'rank_one_born_pairing_weight', lea, { size: 18 });
  }
  ffRich([['⟨ψ, φ⟩ = ', C.white], ['0.48 + 0.48i', C.cyan], ['   = conj ⟨φ, ψ⟩', C.dim]], 1048, 676, { size: 28, a: ma });
  ffRich([['|z| = |z̄|  ⇒  ', C.white], ['0.4608 = 0.4608', C.cyan]], 1048, 734, { size: 30, a: a * Q(S, 3, 'Same size', 0.6) });
  if (ma > 0.003) txt('the mirror step is computed here · 镜像一步是屏幕上的计算', 1048, 786, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ma });
  stamp('0.4608', 800, 250, Q(S, 2, 'Lean checks', 0.5, 0.8) * (1 - at(S, 3, 0.5)), C.cyan, 34, -0.06);
};

/* ======================================================================= */
/*                      scene 2 · LEDGER TWO · GAIN AND LOSS                 */
/* ======================================================================= */
const BU_O = [380, 570], BU_R = 230;
SCENES.budget = S => {
  const a = ffFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed']]);
  ffTab(S, 2, 'GAIN AND LOSS', '得失公平：一笔预算', a);
  const t = lerp(BU_T0, BU_T1, ease(Q(S, 4, 'Tilt the state', 3.0)));
  const b = buShares(t);
  /* the x–z cut of the Bloch ball: the state arrow, its z shadow (shown) and x shadow (hidden) */
  ring(BU_O[0], BU_O[1], BU_R, C.dim, a * 0.45, 1.5);
  arrow(BU_O[0] - BU_R - 20, BU_O[1], BU_O[0] + BU_R + 30, BU_O[1], C.dim, a * 0.7, 1.8);
  arrow(BU_O[0], BU_O[1] + BU_R + 20, BU_O[0], BU_O[1] - BU_R - 30, C.dim, a * 0.7, 1.8);
  txt('up · 上', BU_O[0] + 14, BU_O[1] - BU_R - 30, { size: 22, fam: F.zh, w: 700, c: C.white, a });
  txt('down · 下', BU_O[0] + 14, BU_O[1] + BU_R + 40, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * 0.8 });
  const tip = [BU_O[0] + BU_R * b.rx, BU_O[1] - BU_R * b.rz];
  const qa = a * at(S, 1, 0.6), ha = a * Q(S, 2, 'The other', 0.6);
  if (qa > 0.003) line(BU_O[0], BU_O[1], BU_O[0], tip[1], C.cyan, qa, 9);
  if (ha > 0.003) line(BU_O[0], BU_O[1], tip[0], BU_O[1], C.mag, ha, 9);
  ctx.save(); ctx.setLineDash([5, 7]);
  if (qa > 0.003) line(tip[0], tip[1], BU_O[0], tip[1], C.cyan, qa * 0.5, 1.5);
  if (ha > 0.003) line(tip[0], tip[1], tip[0], BU_O[1], C.mag, ha * 0.5, 1.5);
  ctx.restore();
  arrow(BU_O[0], BU_O[1], tip[0], tip[1], C.now, a, 5);
  dot(tip[0], tip[1], 12, 'g', a);
  txt(`r = (${ffNum(b.rx)}, 0, ${ffNum(b.rz)})`, BU_O[0] - BU_R - 10, BU_O[1] - BU_R + 20, { size: 22, fam: F.mono, w: 700, c: C.now, a });
  if (qa > 0.003) txt('shown · 看得见', BU_O[0] - 16, BU_O[1] - BU_R * b.rz / 2, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: qa });
  if (ha > 0.003) txt('hidden · 看不见', BU_O[0] + BU_R * b.rx / 2, BU_O[1] + 40, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ha });
  /* the two answers as bars against fifty-fifty */
  if (qa > 0.003) {
    const bx = 760, by = 760, bh = 420, bw = 70;
    [[b.pu, 'up', '上'], [b.pd, 'down', '下']].forEach(([p, en, zh], i) => {
      const x = bx + i * 120;
      fillBox(x, by - bh * p, bw, bh * p, C.cyan, qa * 0.4); box(x, by - bh * p, bw, bh * p, C.cyan, qa, 1.5);
      txt(`${Math.round(p * 100)}%`, x + bw / 2, by - bh * p - 14, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: qa });
      txt(`${en} · ${zh}`, x + bw / 2, by + 34, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa * 0.85 });
    });
    ctx.save(); ctx.setLineDash([6, 6]); line(bx - 20, by - bh / 2, bx + 230, by - bh / 2, C.white, qa * 0.6, 1.5); ctx.restore();
    txt('50%', bx - 28, by - bh / 2 + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: qa * 0.7 });
  }
  /* the ledger page */
  panel(1060, 280, 740, 540, a, C.cyan, 'LEDGER TWO · 第二本账');
  ffRich([['budget  Re Tr ρ² − ½ = ', C.white], ['0.50', C.now]], 1088, 350, { size: 28, a: a * at(S, 0, 0.6) });
  ffRich([['shown  (', C.white], [ffNum(b.pu), C.cyan], [' − ½)² + (', C.white], [ffNum(b.pd), C.cyan], [' − ½)² = ', C.white], [ffNum(b.shown), C.cyan]], 1088, 410, { size: 26, a: a * Q(S, 2, 'squared distances', 0.6) });
  ffRich([['hidden  residual = ', C.white], [ffNum(b.hidden), C.mag]], 1088, 466, { size: 28, a: ha });
  ffBar(1088, 492, 680, 50, 0.5, [[b.shown, C.cyan, `shown ${ffNum(b.shown)}`], [b.hidden, C.mag, `hidden ${ffNum(b.hidden)}`]], ha, { size: 20 });
  txt('total 0.50 · 总数', 1088 + 680, 570, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.white, a: ha });
  const lea = a * Q(S, 3, 'Lean checks', 0.6);
  if (lea > 0.003) {
    box(1080, 594, 700, 200, C.lean, lea, 1.5);
    txt('if  budget = ‖state‖²  and  shown = ‖shadow‖²', 1096, 634, { size: 20, fam: F.math, w: 700, c: C.dim, a: lea });
    txt('Re Tr ρ² − 1/d = Σ (p − 1/d)² + residualMass', 1096, 684, { size: 24, fam: F.math, w: 700, c: C.white, a: lea });
    ffLean(1096, 736, 'complementary_context_probability_pythagoras', lea, { size: 18 });
    txt('here: state = r/√2, shadow on the up–down line (computed)', 1096, 778, { size: 20, fam: F.zh, w: 700, c: C.dim, a: lea });
  }
  stamp('0.50 = 0.32 + 0.18', 820, 250, Q(S, 3, 'Lean checks', 0.5, 0.8) * (1 - at(S, 4, 0.5)), C.cyan, 30, -0.05);
};

/* ======================================================================= */
/*                    scene 3 · LEDGER THREE · NO PHOTOCOPIES                */
/* ======================================================================= */
const CO = { before: [180, 600], after: [1000, 600], R: 300, box: [620, 430, 240, 150] };
function coPair(O, ang, a, labA, labB) {
  const pa = [O[0] + CO.R, O[1]], pb = [O[0] + CO.R * Math.cos(ang), O[1] - CO.R * Math.sin(ang)];
  arrow(O[0], O[1], pa[0], pa[1], C.white, a, 5);
  arrow(O[0], O[1], pb[0], pb[1], C.now, a, 5);
  ffArc(O[0], O[1], 80, -ang, 0, C.cyan, a, 3);
  txt(labA, pa[0] - 10, pa[1] + 40, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a });
  txt(labB, pb[0] + 12, pb[1] - 12, { size: 26, fam: F.math, w: 700, c: C.now, a });
  txt(`${ffNum(ang / FF_DEG, 1)}°`, O[0] + 96, O[1] - 18, { size: 22, fam: F.mono, w: 700, c: C.cyan, a });
}
SCENES.copy = S => {
  const a = ffFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  ffTab(S, 3, 'NO PHOTOCOPIES', '关系公平：不可复印', a);
  /* before */
  const b0 = a * Q(S, 0, 'Try two with', 0.8);
  if (b0 > 0.003) {
    coPair(CO.before, CO_A0, b0, 'φ ⊗ blank', 'ψ ⊗ blank');
    txt('BEFORE · 复印前', CO.before[0] + CO.R / 2, 310, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: b0 });
  }
  /* the copier */
  const ca = a * at(S, 0, 0.6);
  if (ca > 0.003) {
    const [x, y, w, h] = CO.box;
    box(x, y, w, h, C.white, ca, 2.5, 'rgba(0,0,0,0.5)');
    txt('COPIER U', x + w / 2, y + 62, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.white, a: ca, ls: 2 });
    txt('复印机', x + w / 2, y + 108, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca * 0.85 });
    arrow(x - 70, y + h / 2, x - 10, y + h / 2, C.white, ca * 0.8, 3);
    arrow(x + w + 10, y + h / 2, x + w + 70, y + h / 2, C.white, ca * 0.8, 3);
  }
  /* after */
  const b1 = a * Q(S, 2, 'After copying', 0.8);
  if (b1 > 0.003) {
    coPair(CO.after, CO_A1, b1, 'φ ⊗ φ', 'ψ ⊗ ψ');
    txt('AFTER · 复印后', CO.after[0] + CO.R / 2, 310, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: b1 });
  }
  /* the ledger page */
  panel(1420, 260, 380, 410, a, C.cyan, 'LEDGER THREE');
  txt('第三本账 · overlap', 1444, 340, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  ffRich([['before  ', C.white], ['0.80 × 1', C.cyan]], 1444, 410, { size: 28, a: a * Q(S, 1, 'Before copying', 0.6) });
  ffRich([['after  ', C.white], ['0.80² = 0.64', C.cyan]], 1444, 470, { size: 28, a: b1 });
  const na = a * Q(S, 2, 'do not balance', 0.6);
  if (na > 0.003) {
    ffRich([['0.80 ≠ 0.64', C.white]], 1444, 550, { size: 40, a: na });
    txt("the books don't balance · 账对不上", 1444, 596, { size: 20, fam: F.zh, w: 700, c: C.white, a: na * 0.85 });
  }
  const ka = a * Q(S, 1, 'keeps overlaps', 0.6);
  txt('reversible (isometric) copiers', 1444, 626, { size: 20, fam: F.zh, w: 700, c: C.white, a: ka * 0.8 });
  txt('keep overlaps · 可逆复印机保重叠', 1444, 654, { size: 20, fam: F.zh, w: 700, c: C.white, a: ka * 0.8 });
  /* line 3: the lock */
  const lea = a * Q(S, 3, 'Lean checks', 0.6);
  if (lea > 0.003) {
    box(140, 690, 1660, 130, C.lean, lea, 1.5, 'rgba(0,0,0,0.6)');
    txt('U copies ψ and φ  ⇒  ⟨φ, ψ⟩ = ⟨φ, ψ⟩²  ∧  (φ = ψ  ∨  ⟨φ, ψ⟩ = 0)', 166, 742, { size: 28, fam: F.math, w: 700, c: C.white, a: lea });
    ffLean(166, 794, 'no_cloning_inner_product_criterion', lea, { size: 18 });
    const ea = a * Q(S, 3, 'Equal, or perpendicular', 0.6);
    chip(1450, 780, 220, 44, 'equal · φ = ψ', C.lean, ea, 18, F.mono);
    chip(1680, 780, 220, 44, 'perpendicular · 0', C.lean, ea, 18, F.mono);
  }
  stamp('0.80 ≠ 0.64', 760, 320, Q(S, 2, 'do not balance', 0.4) * (1 - at(S, 3, 0.5)), C.white, 34, -0.06);
};

/* ======================================================================= */
/*                    scene 4 · LEDGER FOUR · NO SKIPPING AHEAD              */
/* ======================================================================= */
const ST_O = [230, 760], ST_R = 430;
SCENES.steps = S => {
  const a = ffFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  ffTab(S, 4, 'NO SKIPPING AHEAD', '博弈公平：不能跳步', a);
  /* the round counter: rounds 0..7 from "Lean checks" to "round seven", then on to 9 */
  const t2 = phraseAt(S, 2, 'Lean checks'), t7 = phraseAt(S, 3, 'round seven');
  const nf = S.u < t2 ? -1 : Math.min(7.999, 8 * (S.u - t2) / Math.max(0.1, t7 + 0.6 - t2));
  const n = Math.floor(nf);
  /* the turnstile: the failure line B, the success line W, the state at angle (2n+1)θ */
  const P = ang => [ST_O[0] + ST_R * Math.cos(ang), ST_O[1] - ST_R * Math.sin(ang)];
  ffArc(ST_O[0], ST_O[1], ST_R, -Math.PI / 2 - 0.25, 0.05, C.dim, a * 0.45, 1.5);
  arrow(ST_O[0], ST_O[1], ST_O[0] + ST_R + 50, ST_O[1], C.dim, a * 0.8, 2);
  arrow(ST_O[0], ST_O[1], ST_O[0], ST_O[1] - ST_R - 50, C.dim, a * 0.8, 2);
  txt('B  fail · 失败', ST_O[0] + ST_R + 64, ST_O[1] + 8, { size: 22, fam: F.zh, w: 700, c: C.white, a });
  txt('W  success · 成功', ST_O[0] + 16, ST_O[1] - ST_R - 56, { size: 22, fam: F.zh, w: 700, c: C.white, a });
  /* the clicks: one tick per round */
  const ka = a * at(S, 0, 0.6);
  for (let k = 0; k < ST_N; k++) {
    const ang = (2 * k + 1) * ST_TH;
    if (ang > Math.PI / 2 + 0.25) break;
    const p0 = [ST_O[0] + (ST_R - 16) * Math.cos(ang), ST_O[1] - (ST_R - 16) * Math.sin(ang)], p1 = [ST_O[0] + (ST_R + 16) * Math.cos(ang), ST_O[1] - (ST_R + 16) * Math.sin(ang)];
    line(p0[0], p0[1], p1[0], p1[1], k === n ? C.now : C.white, ka * (k <= n ? 0.9 : 0.3), 2.5);
  }
  const th0 = a * Q(S, 1, 'an angle', 0.6);
  const ang = n < 0 ? ST_TH : (2 * n + 1) * ST_TH;
  const tip = P(ang);
  arrow(ST_O[0], ST_O[1], tip[0], tip[1], C.now, a * Math.max(th0, n >= 0 ? 1 : 0), 5);
  if (th0 > 0.003 && n < 0) { ffArc(ST_O[0], ST_O[1], 140, -ST_TH, 0, C.cyan, th0, 3); txt('θ ≈ 5.74°', ST_O[0] + 160, ST_O[1] - 20, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: th0 }); }
  if (n >= 0) {
    line(tip[0], tip[1], ST_O[0], tip[1], C.cyan, a * 0.7, 2);
    txt(`n = ${n}`, 560, 330, { size: 30, fam: F.mono, w: 700, c: C.now, a });
    txt(`(2n+1)θ = ${ffNum(ang / FF_DEG, 1)}°`, 560, 368, { size: 20, fam: F.mono, w: 700, c: C.white, a: a * 0.85 });
  }
  if (ka > 0.003) txt('turnstile: a picture · 闸机只是比方', ST_O[0] + 40, ST_O[1] + 46, { size: 18, fam: F.zh, w: 700, c: C.argued, a: ka });
  /* the bars: the chance sin²((2n+1)θ) per round */
  const bx = 900, by = 640, bh = 300, bw = 70, gap = 18;
  const ga = a * th0;
  if (ga > 0.003) {
    line(bx - 10, by, bx + ST_N * (bw + gap), by, C.dim, ga, 1.5);
    ctx.save(); ctx.setLineDash([5, 7]); line(bx - 10, by - bh, bx + ST_N * (bw + gap), by - bh, C.white, ga * 0.35, 1.2); ctx.restore();
    txt('100%', bx - 18, by - bh + 8, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.white, a: ga * 0.7 });
    txt('chance of success · 成功机会 sin²((2n+1)θ)', bx, by - bh - 30, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ga });
    for (let k = 0; k < ST_N; k++) {
      const x = bx + k * (bw + gap), p = stChance(k), show = k === 0 ? 1 : (k <= n ? clamp((nf - k) * 4 + 0.25) : 0);
      txt(String(k), x + bw / 2, by + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga });
      if (show <= 0.003) continue;
      const hh = bh * p * ease(show), col = k === n ? C.now : C.cyan;
      fillBox(x, by - hh, bw, hh, col, ga * 0.45); box(x, by - hh, bw, hh, col, ga, 1.5);
      txt(p < 0.995 ? `${(p * 100).toFixed(1)}` : `${(p * 100).toFixed(1)}`, x + bw / 2, by - hh - 10, { size: 18, fam: F.mono, w: 700, align: 'center', c: k === n ? C.now : C.white, a: ga * show });
    }
    txt('round n · 轮', bx + ST_N * (bw + gap) - 10, by + 60, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: ga });
  }
  /* the rule */
  const lea = a * Q(S, 2, 'Lean checks', 0.6);
  if (lea > 0.003) {
    box(880, 716, 920, 116, C.lean, lea, 1.5, 'rgba(0,0,0,0.6)');
    txt('iterateⁿ · U = sin((2n+1)θ) W + cos((2n+1)θ) B,   θ = arcsin √p', 900, 760, { size: 24, fam: F.math, w: 700, c: C.white, a: lea });
    ffLean(900, 810, 'uniform_operator_rotation', lea, { size: 18 });
    txt('p = 1/100 (computed)', 1780, 810, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: lea });
  }
  txt('for this method · 仅就这一种方法', 900, 700, { size: 20, fam: F.zh, w: 700, align: 'left', c: C.argued, a: a * at(S, 0, 0.6) });
  stamp('99.5% · n = 7', 1400, 250, Q(S, 3, 'round seven', 0.5, 0.6), C.now, 30, -0.05);
};

/* ======================================================================= */
/*                    scene 5 · LEDGER FIVE · THE SAME STARLIGHT             */
/* ======================================================================= */
const SR_O = [400, 540], SR_R = 240;
const SR_PLOT = { x: 880, y: 300, w: 880, h: 300 };
SCENES.stars = S => {
  const a = ffFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  ffTab(S, 5, 'THE SAME STARLIGHT', '遍历公平：同样的星光', a);
  /* how many steps have been taken: up to SR_NMAX by the end of line 2 */
  const t1 = lineAt(S, 1).s, t3 = lineAt(S, 3).s + 1.0;
  const N = Math.max(0, Math.min(SR_NMAX, Math.floor(SR_NMAX * Math.pow(clamp((S.u - t1) / (t3 - t1)), 1.6))));
  /* the circle, its rim shaded by the sky brightness f */
  const ra = a * at(S, 0, 0.6);
  for (let k = 0; k < 180; k++) {
    const x0 = k / 180, x1 = (k + 1) / 180;
    ffArc(SR_O[0], SR_O[1], SR_R, -TAU * x1, -TAU * x0, C.white, ra * (0.1 + 0.85 * srF((x0 + x1) / 2)), 10);
  }
  if (ra > 0.003) {
    txt('bright · 亮', SR_O[0] + SR_R + 22, SR_O[1] + 8, { size: 22, fam: F.zh, w: 700, c: C.white, a: ra });
    txt('dark · 暗', SR_O[0] - SR_R - 22, SR_O[1] + 8, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.dim, a: ra });
    txt('sky brightness f = (1 + cos 2πx)/2 : a picture', SR_O[0], SR_O[1] + SR_R + 64, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.argued, a: ra });
    txt('天空亮度只是比方 · step α = √2 − 1', SR_O[0], SR_O[1] + SR_R + 94, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ra });
  }
  /* the two travellers: past footprints and the current step */
  const cols = [C.white, C.cyan], names = ['A', 'B'];
  SR_STARTS.forEach((s, i) => {
    const rr = SR_R - 34 - i * 30, pos = x => [SR_O[0] + rr * Math.cos(TAU * x), SR_O[1] - rr * Math.sin(TAU * x)];
    const p0 = pos(s);
    ring(p0[0], p0[1], 10, cols[i], ra, 2);
    for (let n = 1; n <= Math.min(N, 60); n++) { const p = pos(srFrac(s + n * SR_ALPHA)); dot(p[0], p[1], 4, i ? 'c' : 'w', ra * 0.55); }
    const pc = pos(srFrac(s + Math.max(N, 0) * SR_ALPHA));
    dot(pc[0], pc[1], 12, 'g', ra);
    txt(names[i], p0[0] + (i ? -30 : -40), p0[1] + (i ? -12 : 10), { size: 26, fam: F.math, w: 700, c: cols[i], a: ra });
  });
  /* the plot of the running averages */
  const pa = a * at(S, 1, 0.6);
  if (pa > 0.003) {
    const { x, y, w, h } = SR_PLOT, X = n => x + w * Math.log(n) / Math.log(SR_NMAX), Y = v => y + h * (1 - v);
    panel(x - 50, y - 70, w + 80, h + 145, pa, C.cyan, 'AVERAGE BRIGHTNESS · 平均亮度');
    [1, 10, 100].forEach(n => txt(String(n), X(n), y + h + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa }));
    line(x, y + h, x + w, y + h, C.dim, pa, 1.5); line(x, y, x, y + h, C.dim, pa, 1.5);
    ctx.save(); ctx.setLineDash([7, 7]); line(x, Y(0.5), x + w, Y(0.5), C.white, pa * 0.6, 1.5); ctx.restore();
    txt('½', x - 12, Y(0.5) + 9, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: pa });
    txt('1', x - 12, Y(1) + 9, { size: 22, fam: F.math, w: 700, align: 'right', c: C.dim, a: pa });
    txt('0', x - 12, Y(0) + 9, { size: 22, fam: F.math, w: 700, align: 'right', c: C.dim, a: pa });
    txt(`steps N = ${N} (log scale)`, x + w, y + h + 60, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: pa });
    SR_AVG.forEach((avg, i) => {
      if (N < 1) return;
      curve(s => { const n = 1 + s * (N - 1); const k = Math.floor(n), f = n - k; const v = k >= N ? avg[N] : lerp(avg[k], avg[k + 1], f); return [X(n), Y(v)]; }, Math.max(2, N * 2), cols[i], pa, 3);
      txt(`${names[i]} ${avg[N].toFixed(3)}`, x + 20 + i * 200, y + h + 60, { size: 22, fam: F.mono, w: 700, c: cols[i], a: pa });
    });
  }
  /* the theorem */
  const lea = a * Q(S, 2, 'Lean checks', 0.6);
  if (lea > 0.003) {
    box(830, 698, 960, 136, C.lean, lea, 1.5, 'rgba(0,0,0,0.6)');
    txt('(1/N) Σₙ f(gⁿ⁺¹)  →  ∫_G f dμ,   G = closure of the orbit', 850, 740, { size: 24, fam: F.math, w: 700, c: C.white, a: lea });
    ffLean(850, 786, 'result', lea, { size: 18 });
    const ga = a * Q(S, 3, 'the whole circle', 0.6);
    txt('α irrational ⇒ G = whole circle, ∫ f = ½ (see the chapter remark)', 850, 822, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ga });
  }
};

/* ======================================================================= */
/*                    scene 6 · WHAT THE LEDGERS DO NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = ffFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'P versus NP', 'open'], [2, null, 'argued']]);
  const rows = [
    { k: 0, col: C.argued, en: '“fairness” is a reading of five verified statements', zh: '“公平”是对五条已验证陈述的读法', note: "this book's interpretation (MODEL) · 本书的诠释" },
    { k: 1, col: C.open, en: "one method's rounds ≠ a bound on all methods", zh: '一种方法的轮数不是所有方法的下界', note: 'P ≠ NP stays an open conjecture · P 与 NP 之问仍然开放' },
    { k: 2, col: C.argued, en: 'three-qubit monogamy (CKW) · erasure heat k_B T ln 2', zh: '三方纠缠如何分配 · 擦除一比特的物理热量', note: 'literature results, not formalized here · 文献结果，本书未形式化' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 215;
    panel(260, y, 1400, 185, ra, rw.col);
    fillBox(260, y, 1400, 185, C.bg, ra * 0.6);
    txt(rw.en, 300, y + 62, { size: 34, fam: F.disp, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 300, y + 112, { size: 30, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 158, { size: 20, fam: F.zh, w: 700, c: rw.col, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 250 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const sums = [['0.4608 = 0.4608', C.cyan], ['0.50 = 0.32 + 0.18', C.cyan], ['0.80 ≠ 0.64', C.white], ['sin((2n+1)θ)', C.now], ['→ ½', C.cyan]];
  sums.forEach(([s, col], i) => {
    const y = 250 + i * 128;
    fillBox(150, y, 86, 86, C.argued, 0.25); box(150, y, 86, 86, C.argued, 1, 2);
    txt(String(i + 1), 193, y + 62, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white });
    txt(FF_BOOKS[i][1] + '公平', 262, y + 36, { size: 26, fam: F.zh, w: 700, c: C.argued });
    txt(s, 262, y + 78, { size: 32, fam: F.math, w: 700, c: col });
  });
  txt(DATA.film.title_zh, 1300, 440, { size: 90, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FIVE LEDGERS', 1300, 540, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('THAT NEVER CHEAT', 1300, 604, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1300, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
