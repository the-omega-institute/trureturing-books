/* Film · One Shared Arithmetic Clock · 一只共同的算术钟
   (book omega-unification, chapter 12). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (every number is the chapter's, or computed here):
     hook       the four sectors of Volumes II–IV each calibrate their own clock and give a model-internal witness;
                the chapter's test forces one shared clock and one common weight measure p (argued; the weight bars
                under the shared dial are schematic).
     clock      def-ou-ch12-shared-clock: F(j) = ⟨s, (I + j²K)⁻¹ s⟩ = ∫ k_j(y) dp(y), k_j(y) = (1 − y)/(1 + (j² − 1)y),
                x = (A/γ)², y = x/(1 + x). The seven kernel curves are computed exactly here. Zero #8359 is the first
                zero through windows [1]+[2]+[4] (chapter 12.1, replay ledger).
     rupture    chapter 12.1, interval certificates (NUM): with a shared p the first four times close, and F(5) is
                trapped in [0.963278306636895970, 0.963278478925447241], whose 22-bit code ⌊2²² F(5)⌋ = 4040282 is
                computed here exactly from both ends (reference code 4040283, quoted); the needed efficiency ratio
                18.49684338… against the neutral-shell trace range (1, 19) = (1, 1 + 18); the sixth-time floor
                F(6) − T6 ≥ 1.33015563912 × 10⁻⁸.
     seventh    chapter 12.2 Gauss–Radau endpoints (certificate tables of the chapter); the window width, the 35-bit
                codes of both ends, the 36-bit split and the reference code (T7 recovered from both quoted shift bounds)
                are all recomputed here with exact BigInt arithmetic; 4130 = 32071996606 − 32071992476.
     bits       chapter 12.2 item 2: 44-bit inputs force the code by a rational certificate, 43 bits admit a
                counterexample on seven real zeros (NUM, quoted; the two counterexample codes are not drawn).
     bands      chapter 12.3: B = [3.8, 4.5]·10¹⁰ ∪ [7, 10]·10¹⁰ ∪ [10¹², ∞), p(B) > 99.93115 %, peaks ≈ 23.44 %,
                37.4 %, 39.1 % (bar heights drawn to these values on a computed log axis); rem-ou-ch12-stiffness-
                sensitivity: S ∈ (0.00208104145403, 0.00208104148066), drop > 1.82 × 10⁻¹⁰ at ε = 10⁻⁷; held-out J
                6.0833 % low on the eight-zero witness at A = 2,903,600,000 (all NUM certificates, quoted).
     selectors  chapter 12.4 table: five naive selector families and their quoted exclusion numbers (NUM).
     lean       thm-ou-ch12-cyclic-fejer-band (CyclicFejerBand.band_le_positive_fourier, LEAN) and
                thm-ou-ch12-collision-variance (FiniteCollisionVariance.tailCollisionMass_lower_variance, LEAN), stated
                as in the chapter; the two-weight example (w = (1, 1), g = (0, 1), p = 2, η = 1/2) is computed here by
                brute force over the multi-indices (NUM); the bridge to chapter 13 is argued.

   On load, FILM.init checks DATA.lean against the two theorems, recomputes every code and width with BigInt,
   checks the kernel ordering, checks both Lean inequalities on explicit small examples by brute force, and pushes
   any disagreement to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                          numbers and exact checks                         */
/* ======================================================================= */
const SC_LEAN = {
  fejer: 'D5/S3/Fourier/Concentration/CyclicFejerBand.band_le_positive_fourier',
  vari: 'D5/S3/Fourier/Concentration/FiniteCollisionVariance.tailCollisionMass_lower_variance'
};
/* the chapter's certified enclosures, as decimal strings (exact rationals) */
const SC_NUM = {
  f5lo: '0.963278306636895970', f5hi: '0.963278478925447241',
  f7loL: '0.93341795164287258400188', f7loU: '0.93341795164287258400189',
  f7hiL: '0.93341795164501234976009', f7hiU: '0.93341795164501234976010',
  d7lo: '0.000000120207618035599', d7hi: '0.000000120209757801358',
  code5: 4040282, ref5: 4040283, code35: 32071996606, ref35: 32071992476, c36lo: 64143993212, c36hi: 64143993213,
  ratio: 18.49684338, shift6: '1.33015563912 × 10⁻⁸'
};
/* a decimal string "0.ddd" as a BigInt numerator over 10^k */
function scDec(s) { const f = s.split('.')[1]; return { n: BigInt(s.replace('.', '')), k: f.length }; }
/* ⌊2^b · x⌋ for a decimal string x, exactly */
function scFloorBits(s, b) { const { n, k } = scDec(s); return (n << BigInt(b)) / (10n ** BigInt(k)); }
/* x − y for decimal strings, as a Number (only for small differences) */
function scSub(x, y) {
  const a = scDec(x), b = scDec(y), k = Math.max(a.k, b.k);
  const d = a.n * 10n ** BigInt(k - a.k) - b.n * 10n ** BigInt(k - b.k);
  return Number(d) / Math.pow(10, k);
}
const scKer = (j, y) => (1 - y) / (1 + (j * j - 1) * y);
/* the three height bands of chapter 12.3 (log10 of γ) and their approximate arithmetic weights */
const SC_BANDS = [
  { lo: Math.log10(3.8e10), hi: Math.log10(4.5e10), w: 23.44, en: '[3.8, 4.5]·10¹⁰', pct: '≈ 23.44 %' },
  { lo: Math.log10(7e10), hi: Math.log10(1e11), w: 37.4, en: '[7, 10]·10¹⁰', pct: '≈ 37.4 %' },
  { lo: 12, hi: 14, w: 39.1, en: '[10¹², ∞)', pct: '≈ 39.1 %', ray: true }
];
/* the near-collision example: weights w, frequencies g, power p, band η (thm-ou-ch12-collision-variance) */
function scCollision(w, g, p, eta) {
  const n = w.length, ms = [];
  const rec = (i, left, acc) => {
    if (i === n - 1) { ms.push(acc.concat([left])); return; }
    for (let m = 0; m <= left; m++) rec(i + 1, left - m, acc.concat([m]));
  };
  rec(0, p, []);
  const fact = k => (k <= 1 ? 1 : k * fact(k - 1));
  const terms = ms.map(m => ({
    G: m.reduce((s, mj, j) => s + mj * g[j], 0),
    c: fact(p) / m.reduce((s, mj) => s * fact(mj), 1) * m.reduce((s, mj, j) => s * Math.pow(w[j], mj), 1)
  }));
  let E = 0;
  for (const a of terms) for (const b of terms) if (Math.abs(a.G - b.G) <= eta + 1e-12) E += a.c * b.c;
  const W = w.reduce((s, x) => s + x, 0), mu = w.reduce((s, x, j) => s + x * g[j], 0) / W;
  const V = w.reduce((s, x, j) => s + x * (g[j] - mu) ** 2, 0) / W;
  const lhs = 9 / 16 * Math.pow(W, 2 * p), rhs = (1 + 4 * Math.sqrt(p * V) / eta) * E;
  return { terms, E, W, mu, V, lhs, rhs };
}
/* the cyclic Fejér band inequality of thm-ou-ch12-cyclic-fejer-band, both sides */
function scFejer(q, H, N, M) {
  const R = new Set(); for (let h = -H; h <= H; h++) R.add(((h % q) + q) % q);
  let L = H * M[0]; R.forEach(r => { L += (N - H) * M[r]; });
  let Rt = 0;
  for (let k = 0; k < q; k++) {
    let br = 0, bi = 0, mr = 0;
    for (let j = 0; j < N; j++) { br += Math.cos(TAU * k * j / q); bi += Math.sin(TAU * k * j / q); }
    for (let r = 0; r < q; r++) mr += M[r] * Math.cos(-TAU * k * r / q);
    Rt += (br * br + bi * bi) * mr;
  }
  return { L, R: Rt / q };
}
const SC_EX = scCollision([1, 1], [0, 1], 2, 0.5);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('one-shared-clock film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const gid of Object.values(SC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. the fifth time: both ends of the certified window give the same 22-bit code */
  check(Number(scFloorBits(SC_NUM.f5lo, 22)) === SC_NUM.code5 && Number(scFloorBits(SC_NUM.f5hi, 22)) === SC_NUM.code5, '22-bit code 4040282');
  check(SC_NUM.ref5 === SC_NUM.code5 + 1, 'reference one code above');
  /* 2. the seventh time: 35-bit codes, 36-bit split, width, reference code from the two quoted shift bounds */
  for (const s of [SC_NUM.f7loL, SC_NUM.f7loU, SC_NUM.f7hiL, SC_NUM.f7hiU]) check(Number(scFloorBits(s, 35)) === SC_NUM.code35, `35-bit code of ${s}`);
  check(Number(scFloorBits(SC_NUM.f7loU, 36)) === SC_NUM.c36lo && Number(scFloorBits(SC_NUM.f7hiL, 36)) === SC_NUM.c36hi, '36-bit split');
  check(SC_NUM.c36lo === 2 * SC_NUM.code35 && SC_NUM.c36hi === SC_NUM.c36lo + 1, '36-bit codes refine the 35-bit code');
  const width = scSub(SC_NUM.f7hiU, SC_NUM.f7loL);
  check(Math.abs(width - 2.140e-12) < 0.0005e-12, `window width ${width}`);
  const t7a = scDec(SC_NUM.f7loU), t7b = scDec(SC_NUM.f7hiL), dlo = scDec(SC_NUM.d7lo), dhi = scDec(SC_NUM.d7hi);
  const K = 24n, sc = (v) => v.n * 10n ** (K - BigInt(v.k));
  const T7a = sc(t7a) - sc(dlo), T7b = sc(t7b) - sc(dhi);
  const code = v => (v << 35n) / 10n ** K;
  check(Number(code(T7a)) === SC_NUM.ref35 && Number(code(T7b)) === SC_NUM.ref35, 'reference 35-bit code from T7');
  check(SC_NUM.code35 - SC_NUM.ref35 === 4130, '4130 codes apart');
  /* 3. the kernels: k_j(0) = 1, k_j(1) = 0, strictly smaller for larger j on (0, 1) */
  for (let j = 1; j <= 7; j++) check(scKer(j, 0) === 1 && scKer(j, 1) === 0, `k_${j} ends`);
  for (let j = 1; j < 7; j++) for (let i = 1; i < 20; i++) check(scKer(j + 1, i / 20) < scKer(j, i / 20), `k ordering ${j}`);
  check(7 * 7 - 1 === 48, 'j = 7 pole at 1 + 48y');
  /* 4. the neutral shell: one zero mode and eighteen positive modes give η from 1 to 1 + 18 = 19 > 18.4968… */
  check(1 + 18 === 19 && SC_NUM.ratio < 19 && SC_NUM.ratio > 18.49, 'shell range clears the needed ratio');
  /* 5. bands: weights add to about the certified total; gaps hold less than 100 − 99.931 % */
  const tot = SC_BANDS.reduce((s, b) => s + b.w, 0);
  check(Math.abs(tot - 99.94) < 0.01, `band weights ${tot}`);
  check(Math.abs((100 - 99.931) - 0.069) < 1e-9, 'gap mass');
  /* 6. the two Lean inequalities on explicit examples, by brute force */
  check(SC_EX.E === 6 && SC_EX.W === 2 && SC_EX.mu === 0.5 && SC_EX.V === 0.25 && SC_EX.lhs === 9, 'collision example values');
  check(SC_EX.lhs <= SC_EX.rhs && Math.abs(SC_EX.rhs - 6 * (1 + 8 / Math.SQRT2)) < 1e-9, 'collision example inequality');
  check(JSON.stringify(SC_EX.terms.map(t => [t.G, t.c]).sort((a, b) => a[0] - b[0])) === '[[0,1],[1,2],[2,1]]', 'collision terms');
  for (const [w, g, p, eta] of [[[1, 2, 0.5], [0, 0.3, 1.1], 3, 0.2], [[0.2, 1, 1, 3], [-1, 0, 2, 2.5], 2, 0.7]]) {
    const r = scCollision(w, g, p, eta);
    check(r.lhs <= r.rhs + 1e-9, `collision bound ${w}`);
  }
  for (const [q, Hh, N, M] of [[7, 1, 3, [1, 2, 0, 3, 1, 0.5, 2]], [5, 2, 4, [0.3, 1, 1, 0, 2]], [11, 3, 6, [2, 0, 1, 1, 0, 0, 4, 0, 1, 0.2, 3]]]) {
    const r = scFejer(q, Hh, N, M);
    check(r.L <= r.R + 1e-9, `Fejér bound q = ${q}`);
  }
});
Object.assign(FILM.speed, { hook: 0.02, clock: 0.014, rupture: 0.016, seventh: 0.012, bits: 0.014, bands: 0.014, selectors: 0.016, lean: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const scFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
/* a clock dial: ring, twelve ticks and one hand at angle th */
function scDial(x, y, r, th, col, a, o = {}) {
  if (a <= 0.003) return;
  ring(x, y, r, col, a, o.lw || 3);
  for (let i = 0; i < (o.n || 12); i++) {
    const an = -Math.PI / 2 + TAU * i / (o.n || 12), r0 = r * 0.82;
    line(x + r0 * Math.cos(an), y + r0 * Math.sin(an), x + r * 0.95 * Math.cos(an), y + r * 0.95 * Math.sin(an), col, a * 0.8, 2);
  }
  const an = -Math.PI / 2 + th;
  line(x, y, x + r * 0.72 * Math.cos(an), y + r * 0.72 * Math.sin(an), o.hand || C.white, a, o.hw || 4);
  dot(x, y, 7, 'w', a);
}

/* ======================================================================= */
/*                              scene 1 · ONE CLOCK                          */
/* ======================================================================= */
const SC_SECT = [
  { en: 'GAUGE', zh: '规范耦合', sub: 'αs(MZ) ≈ 0.1184', rate: 0.9 },
  { en: 'THREE GENERATIONS', zh: '三代轻模', sub: '3 light modes', rate: 1.6 },
  { en: 'QUARK FLAVOUR', zh: '夸克味混合', sub: 'CKM mixing', rate: 0.55 },
  { en: 'CURVATURE', zh: '真空曲率', sub: 'within 0.2 %', rate: 1.25 }
];
SCENES.hook = S => {
  badgeQ(S, [[0, null, 'argued']]);
  const a = scFade(S);
  const merge = ease(Q(S, 2, 'one shared clock', 1.6));
  const cx = W / 2, cy = 430;
  const home = [[330, 330], [330, 640], [1590, 330], [1590, 640]];
  SC_SECT.forEach((s, i) => {
    const sa = a * at(S, 0, 0.6, 0.5 + 0.45 * i);
    if (sa <= 0.003) return;
    const [hx, hy] = home[i];
    const x = lerp(hx, cx, merge), y = lerp(hy, cy, merge);
    const hl = i === 0 || i === 2 ? at(S, 1, 0.5) * (1 - merge) : 0;
    const col = hl > 0.5 ? C.now : C.cyan;
    const r = lerp(78, 40, merge);
    scDial(x, y, r, S.u * s.rate * (1 - merge) + 0.6 * i * (1 - merge), col, sa * (1 - merge));
    const la = sa * (1 - merge);
    const tx = hx < W / 2 ? hx + 110 : hx - 110, al = hx < W / 2 ? 'left' : 'right';
    txt(s.en, tx, hy - 22, { size: 26, fam: F.disp, w: 700, c: col, a: la, align: al, ls: 2 });
    txt(s.zh, tx, hy + 16, { size: 26, fam: F.zh, w: 700, c: C.white, a: la, align: al });
    txt(s.sub, tx, hy + 52, { size: 22, fam: F.math, w: 700, c: C.dim, a: la, align: al });
  });
  /* the two clocks nature does not keep separately */
  const na = a * at(S, 1, 0.5) * (1 - merge);
  txt('≠', W / 2, 500, { size: 120, fam: F.math, w: 700, align: 'center', c: C.mag, a: na, ab: 2 });
  txt('gauge clock ≠ flavour clock?', W / 2, 590, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: na });
  /* the shared dial and the one common weight measure p (schematic bars) */
  const ma = a * merge;
  if (ma > 0.003) {
    scDial(cx, cy, 150, S.u * 0.7, C.now, ma, { n: 7, lw: 4, hand: C.now });
    for (let j = 1; j <= 7; j++) {
      const an = -Math.PI / 2 + TAU * (j - 1) / 7;
      txt(String(j), cx + 192 * Math.cos(an), cy + 192 * Math.sin(an) + 10, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: ma });
    }
    txt('ONE SHARED CLOCK · 同一只钟', cx, 205, { size: 28, fam: F.disp, w: 700, align: 'center', c: C.now, a: ma, ls: 3 });
    const wa = a * Q(S, 2, 'one common set of zero weights', 0.8);
    const x0 = 560, bw = 800;
    for (let i = 0; i < 40; i++) {
      const h = 18 + 70 * rnd(i, 5) * rnd(i, 9);
      fillBox(x0 + i * bw / 40 + 3, 760 - h * wa, bw / 40 - 6, h * wa, C.cyan, 0.75 * wa);
    }
    line(x0, 762, x0 + bw, 762, C.cyan, wa, 2);
    txt('p : one weight per zero · 共用一组零点权重 (schematic)', W / 2, 800, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: wa });
  }
};

/* ======================================================================= */
/*                            scene 2 · RESOLVENT CLOCK                      */
/* ======================================================================= */
SCENES.clock = S => {
  badgeQ(S, [[0, null, 'computed']]);
  const a = scFade(S);
  const px = 170, py = 230, pw = 860, ph = 520;
  panel(px - 40, py - 50, pw + 80, ph + 130, a, C.cyan, 'KERNELS  k_j(y) = (1 − y) / (1 + (j² − 1) y)');
  const X = y => px + y * pw, Y = k => py + ph - k * (ph - 30);
  line(px, Y(0), px + pw, Y(0), C.dim, a, 2); line(px, Y(0), px, Y(1) - 10, C.dim, a, 2);
  txt('y', px + pw + 14, Y(0) + 8, { size: 26, fam: F.math, c: C.dim, a });
  txt('0', px, Y(0) + 34, { size: 20, fam: F.mono, c: C.dim, a, align: 'center' });
  txt('1', px + pw, Y(0) + 34, { size: 20, fam: F.mono, c: C.dim, a, align: 'center' });
  txt('1', px - 16, Y(1) + 7, { size: 20, fam: F.mono, c: C.dim, a, align: 'right' });
  /* curves appear tick by tick; the newest tick is the current one */
  const nShow = 1 + 6 * clamp((S.u - lineAt(S, 0).s - 1.5) / Math.max(1, lineAt(S, 2).e - lineAt(S, 0).s - 1.5));
  const cur = Math.min(7, Math.floor(nShow));
  for (let j = 1; j <= cur; j++) {
    const ca = a * clamp(nShow - j + 1);
    const col = j === cur ? C.now : C.cyan;
    curve(t => [X(t), Y(scKer(j, t))], 160, col, ca * (j === cur ? 1 : 0.55), j === cur ? 4 : 2.5);
    if (j <= 2 || j === cur) {
      const yl = j === 1 ? 0.3 : j === 2 ? 0.22 : 0.1;
      txt(`j = ${j}`, X(yl) + 14, Y(scKer(j, yl)) - 6, { size: 22, fam: F.mono, w: 700, c: col, a: ca });
    }
  }
  /* schematic zero points on the y axis carrying weight */
  const za = a * at(S, 1, 0.6, 2.2);
  for (let i = 0; i < 9; i++) {
    const y = 0.04 + 0.92 * rnd(i, 3), h = 20 + 50 * rnd(i, 4);
    line(X(y), Y(0), X(y), Y(0) - h * za, C.mag, za, 4);
    dot(X(y), Y(0) - h * za, 7, 'm', za);
  }
  txt('zero heights γ → points y, weights p (schematic)', px + pw / 2, Y(0) + 66, { size: 22, fam: F.math, w: 700, c: C.mag, a: za, align: 'center' });
  /* the definition */
  const fa = a * at(S, 0, 0.6, 0.4);
  const rx = 1150;
  panel(rx - 30, 180, 700, 380, fa, C.cyan, 'THE SHARED CLOCK · 共同算术钟');
  txt('F(j) = ⟨ s, (I + j² K)⁻¹ s ⟩', rx, 270, { size: 36, fam: F.math, w: 700, c: C.white, a: fa });
  const fb = a * at(S, 1, 0.6);
  txt('     = ∫₀¹ k_j(y) dp(y)', rx, 330, { size: 36, fam: F.math, w: 700, c: C.white, a: fb });
  txt('x = (A / γ)²,   y = x / (1 + x)', rx, 400, { size: 30, fam: F.math, w: 700, c: C.cyan, a: fb });
  txt('one operator K · one source s · 同一算子', rx, 460, { size: 22, fam: F.zh, w: 700, c: C.dim, a: fa });
  const ga = a * Q(S, 2, 'Higher ticks bend', 0.6);
  txt('higher j → sharper low-pass · 刻度越高，滤得越陡', rx, 520, { size: 22, fam: F.zh, w: 700, c: C.now, a: ga });
  /* the first three-window zero */
  const wa = a * at(S, 3, 0.6, 0.3);
  panel(rx - 30, 600, 700, 200, wa, C.now, 'THREE WINDOWS [1]+[2]+[4] · 三窗');
  txt('#8359', rx, 712, { size: 56, fam: F.orb, w: 900, c: C.now, a: wa, ab: 2 });
  txt('first zero through all three', rx + 300, 690, { size: 20, fam: F.mono, w: 700, c: C.white, a: wa });
  txt('首枚三窗齐过的零点', rx + 300, 730, { size: 24, fam: F.zh, w: 700, c: C.white, a: wa });
  txt('none of the first 8,192 passes', rx + 300, 770, { size: 20, fam: F.mono, c: C.dim, a: wa });
};

/* ======================================================================= */
/*                            scene 3 · FIFTH TICK BREAKS                    */
/* ======================================================================= */
function scTickRow(S, a, o) {
  const x0 = 200, dx = 260, y = 225;
  for (let j = 1; j <= 6; j++) {
    const st = o.state(j);
    if (!st) continue;
    const x = x0 + (j - 1) * dx;
    const col = st.col;
    box(x, y - 40 + (st.lift || 0), 200, 84, col, a * st.a, 2, 'rgba(0,0,0,0.5)');
    txt(`F(${j})`, x + 24, y + 14 + (st.lift || 0), { size: 32, fam: F.math, w: 700, c: C.white, a: a * st.a });
    txt(st.mark, x + 176, y + 14 + (st.lift || 0), { size: 30, fam: F.mono, w: 700, c: col, a: a * st.a, align: 'right' });
  }
}
SCENES.rupture = S => {
  badgeQ(S, [[0, null, 'computed']]);
  const a = scFade(S);
  const brk = Q(S, 0, 'the fifth breaks', 0.4);
  const resc = Q(S, 2, 'rescues tick five', 0.6);
  const six = Q(S, 3, 'the sixth tick is forced up', 0.8);
  scTickRow(S, a, {
    state: j => {
      if (j <= 4) return { a: at(S, 0, 0.4, 0.3 * j), col: C.cyan, mark: '= T' + j };
      if (j === 5) return { a: brk, col: resc > 0.5 ? C.cyan : C.mag, mark: resc > 0.5 ? '= T5' : '≠ T5' };
      return { a: six, col: C.mag, mark: '> T6', lift: -14 * six };
    }
  });
  /* glitch shake of the fifth cell at the break */
  const sh = brk * (1 - resc) * Math.sin(S.u * 40) * clamp(1 - (S.u - phraseAt(S, 0, 'the fifth breaks')) / 0.8);
  if (Math.abs(sh) > 0.01) line(1240 + 6 * sh, 190, 1300 - 6 * sh, 265, C.mag, a, 3);
  /* the 22-bit ruler: two adjacent codes, the certified F(5) window drawn to scale */
  const ra = a * at(S, 1, 0.6) * (1 - 0.6 * resc);
  if (ra > 0.003) {
    const rx = 160, rw = 860, ry = 440, bh = 90;
    panel(rx - 30, 340, rw + 60, 270, ra, C.cyan, '22 BINARY DIGITS · ⌊2²² F(5)⌋');
    const half = rw / 2;
    box(rx, ry, half, bh, C.now, ra, 2, rgba(C.now, 0.08));
    box(rx + half, ry, half, bh, C.cyan, ra, 2, null);
    const pos = s => (Number(scDec(s).n) / Math.pow(10, scDec(s).k) * 4194304 - SC_NUM.code5);
    const u0 = pos(SC_NUM.f5lo), u1 = pos(SC_NUM.f5hi);
    fillBox(rx + u0 * half, ry + 10, Math.max(3, (u1 - u0) * half), bh - 20, C.now, ra * 0.85);
    txt('4040282', rx + half / 2, ry + bh + 40, { size: 32, fam: F.mono, w: 700, c: C.now, a: ra, align: 'center' });
    txt('every allowed clock · 所有合法的钟', rx + half / 2, ry - 14, { size: 20, fam: F.zh, w: 700, c: C.now, a: ra, align: 'center' });
    txt('4040283', rx + 1.5 * half, ry + bh + 40, { size: 32, fam: F.mono, w: 700, c: C.cyan, a: ra, align: 'center' });
    txt('reference T5 · 参考值', rx + 1.5 * half, ry - 14, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ra, align: 'center' });
  }
  /* the efficiency ratio: needed ≥ 18.4968…, the neutral shell spans 1 → 19 */
  const ea = a * resc;
  if (ea > 0.003) {
    const ex = 1120, ew = 600, ey = 470;
    panel(ex - 30, 340, ew + 60, 270, ea, C.cyan, 'NEUTRAL SHELL · 中性壳 η = x tr(xI + L)⁻¹');
    const X = v => ex + (v - 1) / 19 * ew;
    line(X(1), ey, X(19.6), ey, C.dim, ea, 2);
    for (const v of [1, 5, 10, 15, 19]) { line(X(v), ey - 8, X(v), ey + 8, C.dim, ea, 2); txt(String(v), X(v), ey + 38, { size: 20, fam: F.mono, c: C.dim, a: ea, align: 'center' }); }
    const g = ease(clamp((S.u - phraseAt(S, 2, 'just enough efficiency range')) / 1.0));
    fillBox(X(1), ey - 30, (X(19) - X(1)) * g, 18, C.cyan, ea * 0.85);
    txt('shell: 1 → 19 (1 zero mode + 18)', X(1), ey - 44, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: ea * g });
    line(X(SC_NUM.ratio), ey - 60, X(SC_NUM.ratio), ey + 14, C.now, ea, 3);
    txt('needed ≥ 18.49684…', X(SC_NUM.ratio) - 10, ey + 90, { size: 22, fam: F.mono, w: 700, c: C.now, a: ea, align: 'right' });
  }
  /* the forced sixth-time shift */
  const sa = a * six;
  if (sa > 0.003) {
    panel(360, 650, 1200, 160, sa, C.mag, 'THE PRICE · 代价');
    txt('F(6) − T6  ≥  1.33015563912 × 10⁻⁸', W / 2, 745, { size: 46, fam: F.math, w: 700, c: C.mag, a: sa, align: 'center', ab: 1 });
  }
};

/* ======================================================================= */
/*                            scene 4 · THE SEVENTH TICK                     */
/* ======================================================================= */
SCENES.seventh = S => {
  badgeQ(S, [[0, null, 'computed']]);
  const a = scFade(S);
  /* the six inputs */
  const ia = a * at(S, 0, 0.6);
  const lab = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6 + 1.360900010·10⁻⁸'];
  lab.forEach((s, i) => {
    const ca = ia * clamp(at(S, 0, 0.4, 0.25 * i) * 1.0);
    const w = i < 5 ? 150 : 400, x = 140 + i * 170;
    const col = i < 5 ? C.cyan : C.mag;
    box(x, 190, w, 64, col, ca, 2, 'rgba(0,0,0,0.5)');
    txt(`F(${i + 1}) = ${s}`, x + w / 2, 233, { size: i < 5 ? 22 : 22, fam: F.math, w: 700, c: col, a: ca, align: 'center' });
  });
  const qa = a * Q(S, 0, 'ask about the seventh', 0.6);
  chip(1680, 222, 190, 64, 'F(7) = ?', C.now, qa, 30, F.math);
  /* the Gauss–Radau window */
  const sa = Q(S, 3, 'falsifies the clock', 0.5);
  const wa = a * Q(S, 1, 'a window two point one', 0.7) * (1 - clamp(sa * 2));
  if (wa > 0.003) {
    panel(130, 300, 1660, 220, wa, C.now, 'GAUSS–RADAU · 高斯–拉道锐端点');
    const x0 = 400, x1 = 1520;
    fillBox(x0, 372, x1 - x0, 40, C.now, wa * 0.3);
    box(x0, 372, x1 - x0, 40, C.now, wa, 2);
    txt('0.93341795164287258400188', x0, 460, { size: 26, fam: F.mono, w: 700, c: C.white, a: wa, align: 'center' });
    txt('0.93341795164501234976010', x1, 460, { size: 26, fam: F.mono, w: 700, c: C.white, a: wa, align: 'center' });
    txt('lower · e = 1', x0, 495, { size: 18, fam: F.mono, c: C.dim, a: wa, align: 'center' });
    txt('upper · e = 0', x1, 495, { size: 18, fam: F.mono, c: C.dim, a: wa, align: 'center' });
    txt('width 2.140 × 10⁻¹²', (x0 + x1) / 2, 400, { size: 30, fam: F.math, w: 700, c: C.now, a: wa, align: 'center' });
  }
  /* the 35-bit codes */
  const ca = a * at(S, 2, 0.7);
  if (ca > 0.003) {
    panel(130, 560, 1660, 250, ca, C.cyan, '35 BINARY DIGITS · ⌊2³⁵ F(7)⌋');
    const yb = 650;
    box(220, yb, 360, 70, C.cyan, ca, 2, null);
    txt('32071992476', 400, yb + 48, { size: 34, fam: F.mono, w: 700, c: C.cyan, a: ca, align: 'center' });
    txt('reference T7 · 参考码', 400, yb + 105, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ca, align: 'center' });
    const fa = Q(S, 2, 'that window is one code', 0.6) * ca;
    box(1340, yb, 360, 70, C.now, fa, 2, rgba(C.now, 0.1));
    txt('32071996606', 1520, yb + 48, { size: 34, fam: F.mono, w: 700, c: C.now, a: fa, align: 'center' });
    txt('forced · 被迫的码', 1520, yb + 105, { size: 22, fam: F.zh, w: 700, c: C.now, a: fa, align: 'center' });
    const ga = Q(S, 2, '4130 above', 0.8) * ca;
    arrow(600, yb + 35, 600 + 720 * ease(ga), yb + 35, C.white, ga, 3);
    txt('+ 4130 codes · 高出 4130 格', 960, yb + 18, { size: 26, fam: F.mono, w: 700, c: C.white, a: ga, align: 'center' });
    txt('(not to scale)', 960, yb + 82, { size: 18, fam: F.mono, c: C.dim, a: ga, align: 'center' });
  }
  stamp('FALSIFIABLE · 可证伪', W / 2, 425, sa * a, C.mag, 54, -0.05);
};

/* ======================================================================= */
/*                            scene 5 · FORTY-FOUR BITS                      */
/* ======================================================================= */
SCENES.bits = S => {
  badgeQ(S, [[0, null, 'computed']]);
  const a = scFade(S);
  const drop = Q(S, 1, 'Drop to forty-three', 0.6);
  const back = Q(S, 2, 'exact threshold', 0.6);
  const nb = 44 - drop * (1 - back);
  const x0 = 190, cw = 34, y = 260;
  panel(x0 - 30, 190, 44 * cw + 60, 170, a, C.cyan, 'INPUT PRECISION PER TIME · 每项输入保留的二进制位');
  const fill = ease(at(S, 0, 2.2, 0.4));
  for (let i = 0; i < 44; i++) {
    const on = i < Math.round(44 * fill) && (i < 43 || nb > 43.5);
    const col = i === 43 ? (nb > 43.5 ? C.now : C.mag) : C.cyan;
    box(x0 + i * cw + 3, y, cw - 6, 50, col, a * (on ? 1 : 0.35), 1.5, on ? rgba(col, 0.35) : null);
  }
  txt(nb > 43.5 ? '44 bits' : '43 bits', x0, y + 86, { size: 30, fam: F.mono, w: 700, c: nb > 43.5 ? C.now : C.mag, a: a * fill });
  /* output: one forced code (44) or two codes (43) */
  const oa = a * Q(S, 0, 'a rational certificate', 0.6);
  const cx = W / 2, cy = 560;
  panel(360, 430, 1200, 330, oa, nb > 43.5 ? C.now : C.mag, 'SEVENTH-TIME 35-BIT CODE · 第七拍 35 位码');
  const out = clamp(back * 2), inn = clamp(back * 2 - 1);
  const one = oa * (1 - drop * (1 - inn));
  if (one > 0.003) {
    arrow(cx, 470, cx, 520, C.now, one, 3);
    chip(cx, 580, 420, 84, '32071996606', C.now, one, 44);
    txt('forced by an integer rational certificate · 有理数证书锁死', cx, 690, { size: 24, fam: F.zh, w: 700, c: C.white, a: one, align: 'center' });
  }
  const two = oa * drop * (1 - out);
  if (two > 0.003) {
    arrow(cx, 470, cx - 260, 530, C.mag, two, 3); arrow(cx, 470, cx + 260, 530, C.mag, two, 3);
    chip(cx - 300, 590, 360, 76, 'code A', C.mag, two, 36);
    chip(cx + 300, 590, 360, 76, 'code B ≠ A', C.mag, two, 36);
    txt('counterexample on the same seven real zeros · 同样七枚零点上的反例', cx, 700, { size: 24, fam: F.zh, w: 700, c: C.white, a: two, align: 'center' });
  }
  const ta = a * back;
  txt('44 = exact minimal input precision · 精确最小输入精度', cx, 820, { size: 28, fam: F.zh, w: 700, c: C.now, a: ta, align: 'center' });
};

/* ======================================================================= */
/*                              scene 6 · THREE BANDS                        */
/* ======================================================================= */
SCENES.bands = S => {
  badgeQ(S, [[0, null, 'computed']]);
  const a = scFade(S);
  const ax0 = 220, ax1 = 1680, ay = 545, L0 = 8, L1 = 14;
  const SUP = { 8: '⁸', 9: '⁹', 10: '¹⁰', 11: '¹¹', 12: '¹²', 13: '¹³', 14: '¹⁴' };
  const X = l => ax0 + (l - L0) / (L1 - L0) * (ax1 - ax0);
  const aa = a * at(S, 0, 0.6);
  line(ax0, ay, ax1, ay, C.dim, aa, 2);
  for (let l = L0; l <= L1; l++) { line(X(l), ay - 8, X(l), ay + 8, C.dim, aa, 2); txt(`10${SUP[l]}`, X(l), ay + 40, { size: 24, fam: F.math, w: 700, c: C.dim, a: aa, align: 'center' }); }
  txt('zero height γ (log scale) · 零点高度', ax1, ay + 78, { size: 20, fam: F.zh, w: 700, c: C.dim, a: aa, align: 'right' });
  const hmax = 230 / 40;
  SC_BANDS.forEach((b, i) => {
    const ba = a * Q(S, 0, 'three height bands', 0.6, 0.45 * i);
    if (ba <= 0.003) return;
    const cur = Math.min(2, Math.floor((S.u - phraseAt(S, 0, 'three height bands')) / 0.45));
    const col = i === cur && at(S, 1, 0.1) < 1 ? C.now : C.cyan;
    const h = b.w * hmax * ease(ba);
    const x = X(b.lo), w = Math.max(10, X(b.hi) - X(b.lo));
    fillBox(x, ay - h, w, h, col, ba * 0.8);
    if (b.ray) arrow(X(b.lo), ay - h - 12, ax1 + 30, ay - h - 12, col, ba, 3);
    /* labels: the first band to its left, the second above, the ray above its arrow */
    const lx = b.ray ? X(b.lo) + 230 : i === 0 ? x - 16 : x + w / 2, al = i === 0 ? 'right' : 'center';
    const ly = b.ray ? ay - h - 30 : i === 0 ? ay - h + 10 : ay - h - 46;
    txt(b.pct, lx, ly, { size: 30, fam: F.mono, w: 700, c: col, a: ba, align: al });
    txt(b.en, lx, ly + (b.ray ? -36 : 32), { size: 22, fam: F.math, w: 700, c: C.white, a: ba, align: al });
  });
  const ta = a * Q(S, 0, '99.931 percent', 0.6);
  chip(500, 250, 420, 66, 'p(B) > 99.931 %', C.now, ta, 34);
  const ga = a * Q(S, 1, 'almost nothing', 0.6);
  txt('gaps hold < 0.069 % · 带间几乎为空', X(9.0), ay - 40, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ga, align: 'center' });
  /* stiffness and held-out J */
  const sa = a * at(S, 2, 0.6);
  if (sa > 0.003) {
    panel(140, 650, 940, 185, sa, C.cyan, 'STIFFNESS · 刚度  w_e → w_e (1 + 10⁻⁷)');
    txt('sensitivity S ∈ (0.00208104145, 0.00208104148)', 170, 722, { size: 26, fam: F.mono, w: 700, c: C.white, a: sa });
    txt('response drop  > 1.82 × 10⁻¹⁰', 170, 772, { size: 30, fam: F.math, w: 700, c: C.mag, a: sa });
    txt('even after re-choosing p′ · 重选权重也掩盖不了', 170, 815, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
  }
  const ja = a * at(S, 3, 0.6);
  if (ja > 0.003) {
    panel(1120, 650, 660, 185, ja, C.mag, 'HELD-OUT CP · 留出的 J');
    txt('J : −6.0833 % vs ref', 1150, 730, { size: 44, fam: F.mono, w: 700, c: C.mag, a: ja, ab: 1 });
    txt('8 zeros · A = 2,903,600,000', 1150, 775, { size: 22, fam: F.mono, w: 700, c: C.white, a: ja });
    txt('八点见证，未参与标定', 1150, 815, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ja });
  }
};

/* ======================================================================= */
/*                          scene 7 · NO NAIVE SELECTOR                      */
/* ======================================================================= */
const SC_SEL = [
  ['power law γ⁻ˢ · 幂律', 'excluded for all s ≥ 1.00001485'],
  ['Gaussian determinants, heat traces · 高斯行列式', '≤ 24 heat-trace factors miss the 1.95557 × 10⁸ gain'],
  ['Gibbs triangle weights · 吉布斯三角权', 'all real β excluded on the 23-zero list'],
  ['short coherent walks · 短程相干游走', 'ratio < 3.705 × 10⁸, needed 2.28327 × 10¹⁴'],
  ['single-shot selector · 单次选择器', 'full-spectrum pass rate < 4.42870 × 10⁻⁵']
];
SCENES.selectors = S => {
  badgeQ(S, [[0, null, 'computed']]);
  const a = scFade(S);
  const qa = a * at(S, 0, 0.6);
  txt('a simple rule that grows the three bands?', W / 2, 210, { size: 34, fam: F.disp, w: 700, c: C.white, a: qa, align: 'center' });
  txt('能不靠拟合自动长出三条带的简单法则？', W / 2, 254, { size: 28, fam: F.zh, w: 700, c: C.dim, a: qa, align: 'center' });
  const t1 = lineAt(S, 1), span = Math.max(1, t1.e - t1.s);
  SC_SEL.forEach((r, i) => {
    const ra = a * at(S, 1, 0.4, span * i / 6);
    if (ra <= 0.003) return;
    const y = 295 + i * 82;
    box(150, y, 1620, 70, C.cyan, ra, 1.5, 'rgba(0,0,0,0.5)');
    txt(r[0], 175, y + 45, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(r[1], 1745, y + 45, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ra, align: 'right' });
    const st = a * at(S, 1, 0.35, span * i / 6 + 0.6);
    line(165, y + 36, 165 + (tw(r[0], 26, F.zh, 700) + 20) * st, y + 36, C.mag, st, 4);
  });
  const sa = Q(S, 1, 'certificates exclude them all', 0.5);
  stamp('EXCLUDED · 排除', 1440, 770, sa * a, C.mag, 44, -0.06);
  const fa = a * at(S, 2, 0.6);
  txt('external weights break at every turn', 160, 760, { size: 30, fam: F.disp, w: 700, c: C.mag, a: fa });
  txt('外加的权重处处触壁', 160, 806, { size: 28, fam: F.zh, w: 700, c: C.mag, a: fa });
};

/* ======================================================================= */
/*                            scene 8 · TWO LEAN FLOORS                      */
/* ======================================================================= */
SCENES.lean = S => {
  badgeQ(S, [[0, null, 'lean'], [2, null, 'computed'], [3, null, 'argued']]);
  const a = scFade(S);
  const la = a * at(S, 0, 0.6);
  const dim2 = 1 - 0.55 * at(S, 2, 0.6) * (1 - at(S, 3, 0.6));
  panel(130, 180, 1660, 180, la * dim2, C.lean, 'LEAN ✓ · CyclicFejerBand.band_le_positive_fourier');
  txt('(N − H) · Σ_(r ∈ R_H) M(r) + H · M(0)  ≤  (1/q) · Σ_k |B_N(k)|² · Re M̂(k)', W / 2, 270, { size: 34, fam: F.math, w: 700, c: C.white, a: la * dim2, align: 'center' });
  txt('M ≥ 0 on ℤ/qℤ,  H < N  ·  窄频带权重 ≤ 非负傅里叶和', W / 2, 325, { size: 22, fam: F.zh, w: 700, c: C.lean, a: la * dim2, align: 'center' });
  const vb = a * at(S, 1, 0.6);
  panel(130, 390, 1660, 180, vb * dim2, C.lean, 'LEAN ✓ · FiniteCollisionVariance.tailCollisionMass_lower_variance');
  txt('(9/16) · W²ᵖ  ≤  (1 + 4√(pV) / η) · Eₚ(η)', W / 2, 480, { size: 38, fam: F.math, w: 700, c: C.white, a: vb * dim2, align: 'center' });
  txt('w ≥ 0, W > 0, p > 0, η > 0  ·  方差越小，近碰撞质量越多', W / 2, 535, { size: 22, fam: F.zh, w: 700, c: C.lean, a: vb * dim2, align: 'center' });
  /* the worked example, brute force */
  const ea = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.6));
  if (ea > 0.003) {
    panel(130, 600, 1660, 220, ea, C.cyan, 'EXAMPLE · w = (1, 1), g = (0, 1), p = 2, η = 1/2');
    const bx = 220, by = 790;
    SC_EX.terms.slice().sort((p1, p2) => p1.G - p2.G).forEach((t, i) => {
      const x = bx + i * 120, h = t.c * 50;
      fillBox(x, by - h, 70, h, C.cyan, ea * 0.8);
      txt(`G=${t.G}`, x + 35, by - h - 34, { size: 18, fam: F.mono, w: 700, c: C.white, a: ea, align: 'center' });
      txt(`c=${t.c}`, x + 35, by - h - 10, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: ea, align: 'center' });
    });
    txt(`W = ${SC_EX.W},  V = ${SC_EX.V},  E₂(1/2) = ${SC_EX.E}`, 640, 690, { size: 30, fam: F.mono, w: 700, c: C.white, a: ea });
    txt(`${SC_EX.lhs}  ≤  ${SC_EX.rhs.toFixed(2)}`, 640, 760, { size: 44, fam: F.mono, w: 700, c: C.cyan, a: ea, ab: 1 });
    txt('computed on screen · 屏幕计算', 1190, 760, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ea });
  }
  const na = a * at(S, 3, 0.6);
  if (na > 0.003) {
    panel(360, 620, 1200, 170, na, C.argued, 'NEXT · 第十三章');
    txt('stop pasting weights on — look inside the shell', W / 2, 700, { size: 32, fam: F.disp, w: 700, c: C.white, a: na, align: 'center' });
    txt('不再从外面贴权重，转向壳体内部', W / 2, 752, { size: 28, fam: F.zh, w: 700, c: C.argued, a: na, align: 'center' });
  }
};

/* ======================================================================= */
/*                                scene 9 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  scDial(1650, 590, 130, 1.1, C.now, 0.9, { n: 7, lw: 4, hand: C.now });
  txt(DATA.film.title_zh, W / 2, 290, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ONE SHARED ARITHMETIC CLOCK', W / 2, 380, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  box(150, 540, 400, 90, C.cyan, 1, 2, null);
  txt('32071992476', 350, 600, { size: 42, fam: F.mono, w: 700, align: 'center', c: C.cyan });
  txt('reference · 参考码', 350, 680, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan });
  arrow(580, 585, 930, 585, C.white, 1, 3);
  txt('+4130 codes', 755, 565, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white });
  box(960, 540, 440, 90, C.now, 1, 2, rgba(C.now, 0.1));
  txt('32071996606', 1180, 600, { size: 46, fam: F.mono, w: 700, align: 'center', c: C.now, ab: 1 });
  txt('forced seventh tick · 第七拍被迫的码', 1180, 680, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.now });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
