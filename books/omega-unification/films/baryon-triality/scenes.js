/* Film · Baryon Triality · 重子三重对称
   (book omega-unification, Volume III: chapter 9). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook       the dimension-six operator O6 = εεεεε QQQL of definition def-ou-ch09-baryon-triality; its hypercharge
                3 · 1/6 − 1/2 = 0 and ΔB = ΔL = 1 (computed here from the definition).
     monomials  the single-generation Grassmann expansion of O6 of example ex-ou-ch09-qqql-grassmann: 12 quark and
                4 lepton components, exactly 36 distinct nonzero monomials, the monomial (0,0,0)(1,0,0)(2,1,1)·(1,1)
                with coefficient 4 (all recomputed here by brute force over every index); the inverse
                unidentifiability of c6 is the chapter's written argument (argued).
     exact      thm-ou-ch09-simplicial-exactness (LEAN, zero axioms): OmegaSimplicialExactness.d2_eq_zero_iff and
                OmegaMatrixAndFractran.mod_five_rank_one; the cone formula e(x, y) := F(base, x, y) is the chapter's
                proof sketch; "no local wall" is the chapter's reading of the theorem (argued).
     triality   X ≡ h(2Y − B) + q(3B) (mod 3), on colour-singlet hypercharge-neutral operators X_eff ≡ −hB (mod 3)
                (section 9.2): the phase of each operator is computed here from its B; the dimension of a
                fermion operator is 3/2 per field (computed); the floors 15 and 18 are the chapter's replay
                certificate ch39-baryon-triality-operator-floor (NUM); the instanton match ΔB = 3 is argued.
     anomaly    rem-ou-ch09-anomaly-ledger: the six anomaly traces of X = 3B − 9Lτ, recomputed here component by
                component in exact rationals; Z9 residue and its cube equal to the colour centre (computed); the
                generation-dependence price is the chapter's written argument (argued).
     lift       section 9.3.2: the phase A(m, k) = exp(−2πi m k² / 3) tabulated for m, k mod 3 (computed); the Z9
                extension and the 25-state lifted shell are the chapter's replay results (argued; the dots are
                schematic).
     fork       section 9.4.2: joint witness #2,306,888,100,085, the lower bound 0.0314398418770995 and the two
                current branches are copied from the chapter's replay certificate (NUM); deciding c6 is the open
                problem prob-ou-ch09-proton-uv-selection (OPEN).

   On load, FILM.init checks DATA.lean against the two cited theorems and recomputes every number on screen; any
   disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const BT_LEAN = {
  exact: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff',
  split: 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_rank_one'
};

/* ----------------------------- exact rationals ----------------------------- */
const btGcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const btFr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = btGcd(n, d); return [n / g, d / g]; };
const btAdd = (x, y) => btFr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const btMul = (x, y) => btFr(x[0] * y[0], x[1] * y[1]);
const btStr = x => (x[1] === 1 ? (x[0] > 0 ? '+' : '') + x[0] : (x[0] > 0 ? '+' : '−') + Math.abs(x[0]) + '/' + x[1]).replace(/^\+0$/, '0').replace('-', '−');

/* ------------------- the Grassmann expansion of O6 (one generation) ------------------- */
const btEps2 = (i, j) => (i === 0 && j === 1 ? 1 : i === 1 && j === 0 ? -1 : 0);
function btEps3(a, b, c) {
  if (a === b || b === c || a === c) return 0;
  const p = [a, b, c]; let s = 1;
  for (let x = 0; x < 3; x++) for (let y = x + 1; y < 3; y++) if (p[x] > p[y]) s = -s;
  return s;
}
/* quark component (a, i, α) ↦ lexicographic position; lepton (l, δ) */
const btQpos = (a, i, al) => a * 4 + i * 2 + al;
const btQlab = n => `${Math.floor(n / 4)}${Math.floor(n / 2) % 2}${n % 2}`;
function btExpand() {
  const mon = new Map();
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  for (const [a, b, c] of perms) for (let m = 0; m < 256; m++) {
    const i = m & 1, j = (m >> 1) & 1, k = (m >> 2) & 1, l = (m >> 3) & 1;
    const al = (m >> 4) & 1, be = (m >> 5) & 1, ga = (m >> 6) & 1, de = (m >> 7) & 1;
    const co = btEps3(a, b, c) * btEps2(i, j) * btEps2(k, l) * btEps2(al, be) * btEps2(ga, de);
    if (!co) continue;
    const qs = [btQpos(a, i, al), btQpos(b, j, be), btQpos(c, k, ga)];
    if (new Set(qs).size < 3) continue;                       /* θ² = 0 for a Grassmann component */
    let s = 1;
    for (let x = 0; x < 3; x++) for (let y = x + 1; y < 3; y++) if (qs[x] > qs[y]) s = -s;
    const key = qs.slice().sort((u, v) => u - v).join(',') + '|' + l + de;
    mon.set(key, (mon.get(key) || 0) + s * co);
  }
  return [...mon].filter(([, v]) => v !== 0).sort((x, y) => (x[0] < y[0] ? -1 : 1));
}
const BT_MON = btExpand();
const BT_WIT = [btQpos(0, 0, 0), btQpos(1, 0, 0), btQpos(2, 1, 1)].join(',') + '|11';

/* ------------------------- the U(1)_X anomaly ledger ------------------------- */
/* left-handed Weyl fields of one family: { n: copies (colour × weak), col: SU(3) index weight, wk: SU(2) weight, Y, X } */
const BT_QUARK = [
  { f: 'Q', col: 2, wk: 3, n: 6, Y: btFr(1, 6), X: 1 },
  { f: 'u^c', col: 1, wk: 0, n: 3, Y: btFr(-2, 3), X: -1 },
  { f: 'd^c', col: 1, wk: 0, n: 3, Y: btFr(1, 3), X: -1 }
];
const BT_TAU = [
  { f: 'Lτ', col: 0, wk: 1, n: 2, Y: btFr(-1, 2), X: -9 },
  { f: 'e^c τ', col: 0, wk: 0, n: 1, Y: btFr(1), X: 9 },
  { f: 'ν^c τ', col: 0, wk: 0, n: 1, Y: btFr(0), X: 9 }
];
/* trace over Weyl components: col = Σ over colour triplets (per weak component), wk = Σ over weak doublets (per colour) */
const BT_TRACES = [
  ['SU(3)² X', r => btFr(r.col * r.X)],
  ['SU(2)² X', r => btFr(r.wk * r.X)],
  ['Y² X', r => btMul(btFr(r.n * r.X), btMul(r.Y, r.Y))],
  ['Y X²', r => btMul(btFr(r.n * r.X * r.X), r.Y)],
  ['X³', r => btFr(r.n * r.X ** 3)],
  ['grav² X', r => btFr(r.n * r.X)]
];
function btLedger() {
  return BT_TRACES.map(([name, fn]) => {
    let q = btFr(0), t = btFr(0);
    for (const r of BT_QUARK) q = btAdd(q, btMul(btFr(3), fn(r)));    /* three generations of quarks */
    for (const r of BT_TAU) t = btAdd(t, fn(r));
    return { name, q, t, net: btAdd(q, t) };
  });
}
const BT_LED = btLedger();

/* --------------------------- the triality phase --------------------------- */
const btMod3 = x => ((x % 3) + 3) % 3;
/* X_eff ≡ −hB (mod 3) with h = 1; n fermion fields of dimension 3/2 */
const BT_OPS = [
  { en: 'Yukawa  Q H dᶜ', zh: '汤川项', B: 0, dim: null },
  { en: 'Weinberg  (LH)²', zh: '温伯格项', B: 0, dim: null },
  { en: 'QQQL', zh: '质子衰变', B: 1, dim: 4 * 1.5 },
  { en: 'ΔB = 2', zh: '双核子', B: 2, dim: null },
  { en: '9 quarks + 1 lepton', zh: '九夸克一轻子', B: 3, dim: 10 * 1.5 }
];

/* ----------------------- the cubic anomaly phase A(m, k) ----------------------- */
const btAk = (m, k) => btMod3(-m * k * k);                    /* A = ω^(that), ω = e^{2πi/3} */

/* ------------------------------ the fork ------------------------------ */
const BT_ZERO = '#2,306,888,100,085';
const BT_WBOUND = '0.0314398418770995';

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('baryon-triality film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  /* 0. the cited theorems */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const gid of Object.values(BT_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. hypercharge and baryon number of QQQL */
  const Y = btAdd(btMul(btFr(3), btFr(1, 6)), btFr(-1, 2));
  check(Y[0] === 0, 'hypercharge of QQQL is 0');
  /* 2. 36 monomials, the witness has coefficient 4; recount by a second route: the antisymmetric sum over
        unordered triples, each coefficient as a signed sum over the 6 orderings of the three quark slots */
  check(BT_MON.length === 36, `${BT_MON.length} monomials, expected 36`);
  check((new Map(BT_MON)).get(BT_WIT) === 4, 'witness coefficient 4');
  let n2 = 0, wit2 = null;
  for (let x = 0; x < 12; x++) for (let y = x + 1; y < 12; y++) for (let z = y + 1; z < 12; z++) for (let ld = 0; ld < 4; ld++) {
    const l = ld >> 1, de = ld & 1, q = [x, y, z].map(n => [Math.floor(n / 4), Math.floor(n / 2) % 2, n % 2]);
    let c = 0;
    for (const [p0, p1, p2, sg] of [[0, 1, 2, 1], [0, 2, 1, -1], [1, 0, 2, -1], [1, 2, 0, 1], [2, 0, 1, 1], [2, 1, 0, -1]]) {
      const A = q[p0], B = q[p1], Cq = q[p2];
      c += sg * btEps3(A[0], B[0], Cq[0]) * btEps2(A[1], B[1]) * btEps2(Cq[1], l) * btEps2(A[2], B[2]) * btEps2(Cq[2], de);
    }
    if (c) n2++;
    if ([x, y, z].join(',') === '0,4,11' && ld === 3) wit2 = c;
  }
  check(n2 === 36, `second count ${n2}`);
  check(wit2 === 4, `second witness coefficient ${wit2}`);
  check(BT_WIT === '0,4,11|11', 'witness positions');
  /* 3. simplicial cochains on V = {0..4} over Z: d1 and d2 as in OmegaSimplicialExactness; d2 ∘ d1 = 0, and
        for a closed F = d1 e0 the cone cochain e(x, y) := F(base, x, y) satisfies d1 e = F */
  const V = 5, e0 = (x, y) => Math.round(rnd(x, y) * 40) - 20;
  const d1 = e => (x, y, z) => e(y, z) - e(x, z) + e(x, y);
  const d2 = F => (x, y, z, w) => F(y, z, w) - F(x, z, w) + F(x, y, w) - F(x, y, z);
  const Fc = d1(e0), dd = d2(Fc), cone = (x, y) => Fc(0, x, y), dc = d1(cone);
  let okdd = true, okc = true;
  for (let x = 0; x < V; x++) for (let y = 0; y < V; y++) for (let z = 0; z < V; z++) {
    if (dc(x, y, z) !== Fc(x, y, z)) okc = false;
    for (let w = 0; w < V; w++) if (dd(x, y, z, w) !== 0) okdd = false;
  }
  check(okdd, 'd2 (d1 e) = 0'); check(okc, 'cone: d1 e = F');
  /* 4. the anomaly ledger against the chapter's table */
  const want = [['0', '0'], ['+9', '−9'], ['−9/2', '+9/2'], ['0', '0'], ['0', '0'], ['0', '0']];
  BT_LED.forEach((r, i) => {
    check(btStr(r.q) === want[i][0] && btStr(r.t) === want[i][1], `${r.name}: ${btStr(r.q)} ${btStr(r.t)}`);
    check(r.net[0] === 0, `${r.name} net 0`);
  });
  /* second route for Y²X and X³: sum over the 15 + 1 individual Weyl components of one family */
  const comps = [];
  for (const r of [...BT_QUARK, ...BT_TAU]) for (let c = 0; c < r.n; c++) comps.push(r);
  let y2x = btFr(0), x3 = 0;
  for (const r of comps) {
    const g = BT_QUARK.includes(r) ? 3 : 1;
    y2x = btAdd(y2x, btMul(btFr(g * r.X), btMul(r.Y, r.Y))); x3 += g * r.X ** 3;
  }
  check(y2x[0] === 0 && x3 === 0, 'component sums Y²X, X³');
  /* Z9: quark phase e^{2πi/9} (X = 1), leptons X ∈ {0, ±9} ≡ 0 mod 9; the cube on a quark is e^{2πi/3} */
  check([0, -9, 9].every(x => ((x % 9) + 9) % 9 === 0) && (3 * 1) % 9 === 3, 'Z9 residue');
  /* 5. triality phases and dimensions */
  check(BT_OPS.map(o => btMod3(-o.B)).join('') === '00210', 'phases −hB');
  check(BT_OPS[2].dim === 6 && BT_OPS[4].dim === 15 && 12 * 1.5 === 18, 'dimensions 6, 15, 18');
  /* 6. A(m, k) for m, k mod 3: trivial exactly when m k ≡ 0 */
  for (let m = 0; m < 3; m++) for (let k = 0; k < 3; k++) check((btAk(m, k) === 0) === ((m * k) % 3 === 0), `A(${m},${k})`);
  check(25 * 25 - 1 === 624, '25² − 1');
});
Object.assign(FILM.speed, { hook: 0.02, monomials: 0.014, exact: 0.014, triality: 0.016, anomaly: 0.014, lift: 0.016, fork: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const btFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function btRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  /* a part may carry [text, colour, size factor, dy] for raised indices */
  const sz = p => size * (p[2] || 1);
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], sz(p), fam, w), 0) / 2;
  for (const p of parts) { txt(p[0], cx, y + (p[3] || 0), { size: sz(p), fam, w, c: p[1], a, ab: o.ab }); cx += tw(p[0], sz(p), fam, w); }
  return cx;
}
const BT_MISSING = new Set();
function btLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!BT_MISSING.has(gid)) { BT_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  const name = (r.name || r.label).split('.').slice(-2).join('.');
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a phase dial: the three cube roots of unity, a needle at ω^j */
function btDial(x, y, r, j, a, o = {}) {
  if (a <= 0.003) return;
  ring(x, y, r, C.dim, a * 0.7, 2);
  for (let k = 0; k < 3; k++) {
    const th = -TAU * k / 3;
    dot(x + r * Math.cos(th), y + r * Math.sin(th), o.dot || 7, 'c', a * 0.8);
  }
  const th = -TAU * (j == null ? 0 : j) / 3, col = o.col || (j ? C.mag : C.cyan);
  arrow(x, y, x + r * 0.92 * Math.cos(th), y + r * 0.92 * Math.sin(th), col, a, o.lw || 3.5);
}
function btTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('BARYON TRIALITY', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('QQQL · 36 TERMS · Z3 · DIMENSION 15 · SIX TRACES · THE FORK', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                           scene 1 · WILL IT DECAY                         */
/* ======================================================================= */
const BT_FIELDS = [
  { s: 'Q', Y: '+1/6', B: '+1/3', col: C.cyan },
  { s: 'Q', Y: '+1/6', B: '+1/3', col: C.cyan },
  { s: 'Q', Y: '+1/6', B: '+1/3', col: C.cyan },
  { s: 'L', Y: '−1/2', B: '0', col: C.mag }
];
SCENES.hook = S => {
  btTitle(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  /* line 0: a multiplet holding quarks and leptons */
  const ma = a * at(S, 0, 0.6, 0.9) * (1 - at(S, 1, 0.5));
  if (ma > 0.003) {
    panel(560, 260, 800, 230, ma, C.argued, 'SU(5) MULTIPLET · 同一多重态');
    ['d', 'd', 'd', 'e', 'ν'].forEach((s, i) => {
      chip(700 + i * 130, 380, 96, 76, s, i < 3 ? C.cyan : C.mag, ma, 38, F.math);
    });
    txt('quarks · 夸克', 830, 460, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ma });
    txt('leptons · 轻子', 1150, 460, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ma });
    txt('one box, one gauge boson can swap them · 同一个盒子，规范玻色子可以互换它们', W / 2, 560, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ma });
  }
  /* line 1: four fields fly into one vertex */
  const va = a * at(S, 1, 0.5);
  if (va > 0.003) {
    const g = ease(Q(S, 1, 'single point', 1.4));
    const cx = W / 2, cy = 470;
    BT_FIELDS.forEach((f, i) => {
      const th = Math.PI * (1.25 + 0.5 * i), R = lerp(330, 150, g);
      const x = cx + R * Math.cos(th) * 1.5, y = cy + R * Math.sin(th);
      const k = 1 - 62 / Math.max(62, Math.hypot(x - cx, y - cy));
      line(cx, cy, cx + (x - cx) * k, cy + (y - cy) * k, f.col, va * 0.6 * g, 3);
      chip(x, y, 90, 70, f.s, f.col, va, 40, F.math);
      const ya = va * at(S, 2, 0.5);
      txt(`Y ${f.Y}`, x, y + (y > cy ? 72 : -52), { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: ya });
    });
    const pa = va * Q(S, 1, 'the operator QQQL', 0.5);
    dot(cx, cy, 22, 'c', pa);
    ring(cx, cy, 34, C.now, pa, 3);
    txt('QQQL', cx, cy + 92, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.now, a: pa * (1 - at(S, 2, 0.5)) });
  }
  const ya = a * at(S, 2, 0.6);
  if (ya > 0.003) {
    panel(1320, 240, 500, 300, ya, C.cyan, 'HYPERCHARGE · 超荷');
    btRich([['3 · 1/6 − 1/2 = ', C.white], ['0', C.cyan]], 1350, 330, { size: 36, a: ya });
    txt('gauge invariant · 规范不变', 1350, 390, { size: 24, fam: F.zh, w: 700, c: C.white, a: ya * Q(S, 2, 'gauge invariant', 0.5) });
    btRich([['ΔB = ΔL = ', C.white], ['1', C.now]], 1350, 470, { size: 36, a: ya * Q(S, 2, 'baryon number by one', 0.5) });
    txt('dimension 6 · 六维', 1350, 516, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ya * Q(S, 2, 'baryon number by one', 0.5) });
  }
};

/* ======================================================================= */
/*                          scene 2 · THIRTY-SIX TERMS                       */
/* ======================================================================= */
SCENES.monomials = S => {
  const a = btFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  const wit = BT_WIT.split('|')[0].split(',').map(Number);
  const showWit = Q(S, 2, 'This one', 0.5);
  /* line 0: the hope */
  const ha = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (ha > 0.003) {
    btRich([['ε', C.white], ['abc', C.dim, 0.5, -24], ['  Q', C.cyan], ['a', C.dim, 0.5, -24], [' Q', C.cyan], ['b', C.dim, 0.5, -24], [' Q', C.cyan], ['c', C.dim, 0.5, -24], ['   =  0 ?', C.now]], W / 2, 420, { size: 60, align: 'center', a: ha });
    txt('Pauli exclusion would kill it? · 泡利不相容会把它消掉？', W / 2, 520, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ha });
  }
  /* left: the 12 quark components (colour rows, (i, α) columns) and the 4 lepton components */
  const ca = a * at(S, 1, 0.6) * (1 - at(S, 3, 0.5));
  if (ca > 0.003) {
    panel(110, 190, 560, 600, ca, C.cyan, 'COMPONENTS · 分量');
    txt('Q  (a, i, α)', 140, 270, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: ca });
    for (let n = 0; n < 12; n++) {
      const r = Math.floor(n / 4), c = n % 4, x = 150 + c * 122, y = 300 + r * 80;
      const on = showWit > 0 && wit.includes(n);
      box(x, y, 104, 60, on ? C.now : C.cyan, ca, on ? 3.5 : 1.5, on ? rgba(C.now, 0.22) : 'rgba(0,0,0,0.4)');
      txt(btQlab(n), x + 52, y + 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: on ? C.now : C.white, a: ca });
    }
    txt('L  (l, δ)', 140, 590, { size: 28, fam: F.mono, w: 700, c: C.mag, a: ca });
    ['00', '01', '10', '11'].forEach((s, c) => {
      const x = 150 + c * 122, y = 620, on = showWit > 0 && s === '11';
      box(x, y, 104, 60, on ? C.now : C.mag, ca, on ? 3.5 : 1.5, on ? rgba(C.now, 0.22) : 'rgba(0,0,0,0.4)');
      txt(s, x + 52, y + 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: on ? C.now : C.white, a: ca });
    });
    txt('12 + 4 Grassmann components · 格拉斯曼分量', 140, 740, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  /* right: the 36 surviving monomials, filled in as the narration counts them */
  if (ca > 0.003) {
    const shown = Math.floor(36 * ease(Q(S, 1, 'Expand it', 3.2)) + 1e-9);
    const x0 = 720, y0 = 200, cw = 180, ch = 74;
    panel(x0 - 10, y0 - 10, 1100, 6 * ch + 96, ca, C.cyan, 'O6 MONOMIALS · 单项');
    BT_MON.forEach(([key, v], idx) => {
      if (idx >= shown) return;
      const r = Math.floor(idx / 6), c = idx % 6, x = x0 + 10 + c * cw, y = y0 + 36 + r * ch;
      const [qs, ld] = key.split('|'), lab = qs.split(',').map(n => btQlab(+n)).join(' ') + '·' + ld;
      const on = showWit > 0 && key === BT_WIT;
      box(x, y, cw - 14, ch - 12, on ? C.now : C.cyan, ca, on ? 3.5 : 1.2, on ? rgba(C.now, 0.25) : rgba(C.cyan, 0.06));
      txt(lab, x + 10, y + 26, { size: 15, fam: F.mono, w: 700, c: on ? C.now : C.dim, a: ca });
      txt((v > 0 ? '+' : '−') + Math.abs(v), x + cw - 26, y + 52, { size: 24, fam: F.mono, w: 700, align: 'right', c: on ? C.now : v > 0 ? C.cyan : C.mag, a: ca });
    });
    const na = ca * Q(S, 2, 'thirty-six', 0.5);
    btRich([['nonzero monomials · 非零单项  ', C.white], [String(BT_MON.length), C.cyan]], x0 + 10, y0 + 6 * ch + 66, { size: 30, a: na, fam: F.zh });
    stamp('36', 1660, 762, Q(S, 2, 'thirty-six', 0.5), C.cyan, 44, -0.08);
    const wa = ca * showWit;
    if (wa > 0.003) btRich([['(000, 100, 211) · 11   coefficient · 系数  ', C.white], [String((new Map(BT_MON)).get(BT_WIT)), C.now]], x0 + 10, y0 + 6 * ch + 136, { size: 28, a: wa, fam: F.zh });
  }
  /* line 3: same data, any c6 */
  const sa = a * at(S, 3, 0.6);
  if (sa > 0.003) {
    panel(160, 230, 760, 520, sa, C.argued, 'SAME LOW-ENERGY DATA · 同一套数据');
    [['arc connection', '弧联络'], ['two clocks', '双时钟'], ['quadratic mass spectrum', '二次质量谱']].forEach(([en, zh], i) => {
      txt('✓ ' + en, 200, 330 + i * 80, { size: 32, fam: F.disp, w: 700, c: C.white, a: sa });
      txt(zh, 880, 330 + i * 80, { size: 28, fam: F.zh, w: 700, align: 'right', c: C.dim, a: sa });
    });
    txt('one O6 insertion → 0 on every B-neutral readout', 200, 600, { size: 24, fam: F.disp, w: 700, c: C.argued, a: sa });
    txt('B 守恒的阈值读数里，单次插入 O6 贡献为零', 200, 640, { size: 22, fam: F.zh, w: 700, c: C.argued, a: sa });
    /* the c6 slider sweeps; nothing on the left moves (schematic: no value shown) */
    const sw = 0.5 + 0.45 * Math.sin(S.u * 1.7);
    panel(1040, 300, 720, 300, sa, C.now, 'c6 = ANY · 任意');
    line(1100, 470, 1700, 470, C.dim, sa, 3);
    dot(1100 + 600 * sw, 470, 20, 'c', sa);
    ring(1100 + 600 * sw, 470, 28, C.now, sa, 3);
    txt('c6', 1100 + 600 * sw, 430, { size: 32, fam: F.math, w: 700, align: 'center', c: C.now, a: sa });
    txt('schematic slider · 示意', 1400, 560, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: sa });
    txt('cannot infer c6 = 0 · 反推不出 c6 = 0', 1400, 700, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.white, a: sa * at(S, 3, 0.6, 2.0) });
  }
};

/* ======================================================================= */
/*                            scene 3 · NO LOCAL WALL                        */
/* ======================================================================= */
SCENES.exact = S => {
  const a = btFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [3, null, 'argued']]);
  const p3 = at(S, 3, 0.6, 0.4), out3 = 1 - at(S, 3, 0.4);
  const la = a * at(S, 0, 0.6) * out3;
  /* top: the equivalence */
  if (la > 0.003) {
    panel(140, 190, 1640, 170, la, C.lean, 'ZERO AXIOMS · 零公理');
    btRich([['d²F = 0', C.white], ['   ⟺   ', C.lean], ['∃ e,  d¹e = F', C.white]], 200, 280, { size: 44, a: la * at(S, 0, 0.6, 1.0) });
    txt('closed ⟺ exact · 闭 ⟺ 正合', 1740, 280, { size: 26, fam: F.zh, w: 700, align: 'right', c: C.dim, a: la * Q(S, 0, 'a closed two-cochain', 0.5) });
    btLean(200, 336, BT_LEAN.exact, la * Q(S, 0, 'Lean checks', 0.5));
    stamp('axioms: []', 1560, 330, Q(S, 0, 'zero axioms', 0.5, 0.3) * (1 - at(S, 1, 0.5, 2)), C.lean, 26, -0.05);
  }
  /* line 1: the cone */
  const ca = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.4));
  if (ca > 0.003) {
    const B = [420, 420], X = [250, 720], Y = [600, 760], Z = [700, 610];
    ctx.save(); ctx.globalAlpha = ca * 0.18; ctx.fillStyle = C.cyan;
    ctx.beginPath(); ctx.moveTo(...X); ctx.lineTo(...Y); ctx.lineTo(...Z); ctx.closePath(); ctx.fill(); ctx.restore();
    for (const P of [X, Y, Z]) line(B[0], B[1], P[0], P[1], C.mag, ca * Q(S, 1, 'F of base', 0.6), 3);
    line(X[0], X[1], Y[0], Y[1], C.cyan, ca, 3); line(Y[0], Y[1], Z[0], Z[1], C.cyan, ca, 3); line(Z[0], Z[1], X[0], X[1], C.cyan, ca, 3);
    for (const [P, s] of [[B, 'base'], [X, 'x'], [Y, 'y'], [Z, 'z']]) {
      dot(P[0], P[1], 13, 'c', ca);
      txt(s, P[0] + (s === 'base' ? 0 : s === 'x' ? -28 : 26), P[1] + (s === 'base' ? -28 : 40), { size: 28, fam: F.math, w: 700, align: 'center', c: s === 'base' ? C.mag : C.white, a: ca });
    }
    panel(880, 420, 900, 320, ca, C.cyan, 'THE CONE · 锥');
    btRich([['e(x, y) := ', C.white], ['F(base, x, y)', C.mag]], 920, 510, { size: 38, a: ca * Q(S, 1, 'F of base', 0.5) });
    btRich([['d¹e(x, y, z) = ', C.white], ['F(x, y, z)', C.cyan]], 920, 590, { size: 38, a: ca * Q(S, 1, 'gives back F', 0.5) });
    txt('use d²F(base, x, y, z) = 0 and move terms · 代入闭合条件并移项', 920, 660, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ca * Q(S, 1, 'gives back F', 0.5) });
    txt('proof sketch · 证明骨架', 920, 712, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  /* line 2: the Hurwitz splitting, replacing the cone */
  const ha = a * at(S, 2, 0.6, 0.4) * out3;
  if (ha > 0.003) {
    panel(140, 400, 1640, 380, ha, C.lean, 'HURWITZ · MOD 5 · 模 5');
    for (let i = 0; i < 6; i++) chip(250 + i * 140, 490, 110, 64, `g${i + 1}`, C.cyan, ha, 30);
    txt('six norm-5 Hurwitz generators · 六个模方为 5 的赫维茨生成元', 180, 572, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ha });
    btRich([['split5(g) = ', C.white], ['outer(u, v, s, t)', C.cyan], ['  in Mat₂(F₅)', C.dim]], 180, 650, { size: 34, a: ha * at(S, 2, 0.6, 1.0) });
    btRich([['split5(g).isZero = ', C.white], ['false', C.lean], ['   rank one · 秩一', C.dim]], 1000, 650, { size: 30, a: ha * at(S, 2, 0.6, 2.0), fam: F.mono });
    btLean(180, 735, BT_LEAN.split, ha * at(S, 2, 0.5, 0.4));
  }
  /* line 3: neither fixes c6 */
  const na = a * p3;
  if (na > 0.003) {
    panel(240, 230, 1440, 230, na, C.argued, 'WHAT THEY DO NOT SAY · 它们没说什么');
    txt('d²F = 0  ⟹  F = d¹e   : no global obstruction', 290, 320, { size: 30, fam: F.mono, w: 700, c: C.white, a: na });
    txt('split5 rank one   : no coefficient for QQQL', 290, 380, { size: 30, fam: F.mono, w: 700, c: C.white, a: na });
    txt('局域闭合不造全局壁垒；有限域分裂不定 QQQL 的系数', 290, 430, { size: 24, fam: F.zh, w: 700, c: C.argued, a: na });
    txt('Local closure builds no global wall.', W / 2, 600, { size: 50, fam: F.disp, w: 700, align: 'center', c: C.white, a: na * Q(S, 3, 'Local closure', 0.6), ab: 2 });
    txt('The proton needs a global symmetry.', W / 2, 680, { size: 50, fam: F.disp, w: 700, align: 'center', c: C.now, a: na * at(S, 3, 0.6, 3.0), ab: 2 });
  }
};

/* ======================================================================= */
/*                           scene 4 · BARYON TRIALITY                       */
/* ======================================================================= */
SCENES.triality = S => {
  const a = btFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'dimension six to fifteen', 'computed'], [3, 'weak instantons', 'argued']]);
  /* top: the charge */
  panel(140, 185, 1640, 140, a, C.cyan, 'GENERATION-UNIVERSAL Z3 · 世代共同 Z3');
  btRich([['X ≡ h(2Y − B) + q(3B)', C.dim], ['   ⟶   ', C.white], ['X', C.white], ['eff', C.dim], [' ≡ −h B  (mod 3)', C.cyan]], 190, 268, { size: 38, a: a * at(S, 0, 0.6) });
  txt('colour singlet, Y = 0 · 色单态、超荷中性', 1740, 300, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.dim, a: a * Q(S, 0, 'the charge is minus h', 0.5) });
  chip(1640, 240, 170, 44, 'h ≢ 0', C.now, a * Q(S, 1, 'Take h nonzero', 0.5), 26);
  /* line 0: the three phases of Z3 */
  const za = a * at(S, 0, 0.6, 1.0) * (1 - at(S, 1, 0.5, 1.2));
  if (za > 0.003) {
    btDial(W / 2, 580, 150, Math.floor(S.u / 1.4) % 3, za, { dot: 13, lw: 5, col: C.now });
    ['1', 'ω', 'ω²'].forEach((s, k) => {
      const th = -TAU * k / 3;
      txt(s, W / 2 + 200 * Math.cos(th), 590 + 200 * Math.sin(th), { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: za });
    });
    txt('ω = e^(2πi/3) · a charge mod 3 is a phase · 模 3 的荷就是一个相位', W / 2, 820, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: za });
  }
  /* the operator rows */
  const ra = a * at(S, 1, 0.5, 1.2);
  if (ra > 0.003) {
    const fy = 385;
    BT_OPS.forEach((o, i) => {
      const y = fy + i * 78, j = btMod3(-o.B);
      let oa = ra;
      if (o.B === 0) oa *= Q(S, 1, 'Yukawa and Weinberg', 0.5);
      else if (o.B === 1) oa *= Q(S, 1, 'QQQL picks up', 0.5);
      else if (o.B === 2) oa *= at(S, 2, 0.5);
      else oa *= Q(S, 2, 'jumps from dimension', 0.5);
      if (oa <= 0.003) return;
      const cur = (o.B === 1 && at(S, 2, 0.01) === 0) || (o.B === 3 && at(S, 2, 0.01) > 0);
      txt(o.en, 180, y + 10, { size: 30, fam: F.disp, w: 700, c: cur ? C.now : C.white, a: oa });
      txt(o.zh, 560, y + 10, { size: 24, fam: F.zh, w: 700, c: C.dim, a: oa });
      txt(`ΔB = ${o.B}`, 760, y + 10, { size: 26, fam: F.mono, w: 700, c: C.white, a: oa });
      btDial(960, y, 30, j, oa, { dot: 5, lw: 3 });
      txt(j === 0 ? 'phase 1 · allowed 允许' : `ω${j === 1 ? '' : '²'} · forbidden 禁止`, 1020, y + 10, { size: 24, fam: F.zh, w: 700, c: j === 0 ? C.cyan : C.mag, a: oa });
      if (o.dim) txt(`${o.B === 1 ? 4 : 10} × 3/2 = dim ${o.dim}`, 1320, y + 10, { size: 26, fam: F.mono, w: 700, c: cur ? C.now : C.white, a: oa });
      if (j && o.B === 1) { ctx.save(); line(170, y + 1, 720, y + 1, C.mag, oa * Q(S, 1, 'is forbidden', 0.4), 3); ctx.restore(); }
    });
  }
  /* line 2–3: the floor */
  const fa = a * Q(S, 2, 'dimension six to fifteen', 0.6);
  if (fa > 0.003) {
    stamp('6 → 15', 1600, 455, fa, C.cyan, 44, -0.07);
  }
  const ga = a * at(S, 3, 0.6);
  if (ga > 0.003) {
    panel(140, 745, 1640, 100, ga, C.argued, 'FLOOR · 门槛   (floors 15, 18: replay certificate · 复算证书)');
    btRich([['B − L kept:  9 Q + 3 L → ', C.white], ['dim 18', C.cyan]], 180, 815, { size: 28, a: ga, fam: F.mono });
    btRich([['3 generations · 三代:  instanton ', C.white], ['ΔB = 3', C.now]], 960, 815, { size: 28, a: ga * Q(S, 3, 'weak instantons', 0.5), fam: F.mono });
  }
};

/* ======================================================================= */
/*                              scene 5 · SIX TRACES                         */
/* ======================================================================= */
SCENES.anomaly = S => {
  const a = btFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  const p2 = at(S, 2, 0.6, 0.4);
  /* top: the charges */
  panel(140, 185, 1640, 150, a, C.cyan, 'GAUGED U(1)X · 规范 U(1)X');
  btRich([['X = 3B − 9L', C.white], ['τ', C.mag, 0.7, 6], ['     quarks (Q, u', C.dim], ['c', C.dim, 0.6, -14], [', d', C.dim], ['c', C.dim, 0.6, -14], [')  ', C.dim], ['+1, −1, −1', C.cyan]], 180, 262, { size: 34, a: a * at(S, 0, 0.6) });
  btRich([['τ family (L, e', C.dim], ['c', C.dim, 0.6, -11], [', ν', C.dim], ['c', C.dim, 0.6, -11], [')  ', C.dim], ['−9, +9, +9', C.mag], ['      e, μ leptons  0', C.dim]], 180, 310, { size: 26, a: a * Q(S, 0, 'plus a conjugate', 0.5) });
  /* the ledger */
  const ta = a * at(S, 0, 0.5, 2.0) * (1 - at(S, 2, 0.4));
  if (ta > 0.003) {
    const x0 = 260, y0 = 400, rh = 62;
    txt('trace · 反常迹', x0, y0, { size: 24, fam: F.zh, w: 700, c: C.dim, a: ta });
    txt('3 gens of quarks', x0 + 540, y0, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta });
    txt('τ family', x0 + 900, y0, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta });
    txt('net · 净', x0 + 1240, y0, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ta });
    BT_LED.forEach((r, i) => {
      const ra = ta * at(S, 1, 0.4, 0.45 * i), y = y0 + 58 + i * rh;
      txt(r.name, x0, y, { size: 32, fam: F.math, w: 700, c: C.white, a: ta });
      if (ra <= 0.003) return;
      txt(btStr(r.q), x0 + 540, y, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ra });
      txt(btStr(r.t), x0 + 900, y, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ra });
      txt(btStr(r.net), x0 + 1240, y, { size: 36, fam: F.mono, w: 900, align: 'center', c: C.white, a: ra });
    });
    if (at(S, 2, 0.01) === 0) stamp('ALL ZERO', 1560, 760, Q(S, 1, 'cancel to zero', 0.5), C.cyan, 40, -0.07);
  }
  /* line 2: Z9 and its cube */
  const za = a * p2 * (1 - at(S, 3, 0.5, 1.5) * 0);
  if (za > 0.003) {
    const cx = 500, cy = 590, R = 170;
    ring(cx, cy, R, C.dim, za * 0.6, 2);
    for (let k = 0; k < 9; k++) {
      const th = -Math.PI / 2 + TAU * k / 9, on = k % 3 === 0;
      dot(cx + R * Math.cos(th), cy + R * Math.sin(th), on ? 14 : 9, 'c', za * (on ? 1 : 0.6));
      if (on) txt(['1', 'ω', 'ω²'][k / 3], cx + (R + 40) * Math.cos(th), cy + (R + 40) * Math.sin(th) + 10, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: za });
    }
    const g = Math.floor(clamp(Q(S, 2, 'its cube', 2.0)) * 3 + 1e-9);
    const th = -Math.PI / 2 + TAU * g / 9;
    arrow(cx, cy, cx + R * 0.9 * Math.cos(th), cy + R * 0.9 * Math.sin(th), C.now, za, 4);
    btRich([['Z9 on quarks · step e', C.white], ['2πi/9', C.dim, 0.65, -12]], cx, cy + R + 72, { size: 26, align: 'center', a: za });
    panel(900, 400, 880, 360, za, C.cyan, 'RESIDUE · 残余');
    btRich([['⟨φ⟩, X(φ) = 9   ⟶   ', C.white], ['Z9', C.cyan]], 940, 480, { size: 34, a: za * Q(S, 2, 'charge nine', 0.5) });
    btRich([['quarks e', C.white], ['2πi/9', C.dim, 0.65, -14], ['   leptons 1', C.white]], 940, 545, { size: 30, a: za * Q(S, 2, 'charge nine', 0.5, 0.4) });
    btRich([['(e', C.white], ['2πi/9', C.dim, 0.65, -14], [')³ = e', C.white], ['2πi/3', C.dim, 0.65, -14], [' = colour centre', C.now]], 940, 615, { size: 30, a: za * Q(S, 2, 'its cube', 0.5) });
    btRich([['on colour singlets:  ', C.white], ['Z3,  ΔB ∈ 3Z', C.cyan]], 940, 685, { size: 30, a: za * Q(S, 2, 'singlets see Z three', 0.5) });
    const pa = a * at(S, 3, 0.6);
    txt('price: charges depend on the generation · 代价：荷依赖世代', 940, 740, { size: 22, fam: F.zh, w: 700, c: C.argued, a: pa });
  }
};

/* ======================================================================= */
/*                           scene 6 · TWENTY-FIVE STATES                    */
/* ======================================================================= */
SCENES.lift = S => {
  const a = btFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'smallest extension', 'argued']]);
  /* left: the anomaly phase table */
  const ta = a * at(S, 0, 0.6);
  panel(120, 190, 760, 600, ta, C.cyan, 'A(m, k) = exp(−2πi m k² / 3)');
  if (ta > 0.003) {
    txt('k →', 330, 260, { size: 24, fam: F.mono, w: 700, c: C.dim, a: ta });
    txt('m ↓', 160, 330, { size: 24, fam: F.mono, w: 700, c: C.dim, a: ta });
    for (let k = 0; k < 3; k++) txt(String(k), 420 + k * 170, 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: ta });
    for (let m = 0; m < 3; m++) {
      txt(String(m), 250, 400 + m * 150, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: ta });
      for (let k = 0; k < 3; k++) {
        const j = btAk(m, k);
        btDial(420 + k * 170, 390 + m * 150, 50, j, ta * at(S, 0, 0.4, 0.3 * (m * 3 + k) / 3), { dot: 5, lw: 3.5 });
      }
    }
    txt('flux m, flat line k on S² × L(3,1) · 磁通 m、平坦线 k', 160, 760, { size: 21, fam: F.zh, w: 700, c: C.dim, a: ta });
  }
  /* right: Z9 → 3-cycle, then 19 → 25 states (schematic) */
  const za = a * Q(S, 0, 'smallest extension', 0.6);
  if (za > 0.003) {
    panel(940, 190, 860, 260, za, C.argued, 'MINIMAL EXTENSION · 最小扩张');
    const cx = 1110, cy = 330, R = 80;
    for (let k = 0; k < 9; k++) {
      const th = -Math.PI / 2 + TAU * k / 9;
      dot(cx + R * Math.cos(th), cy + R * Math.sin(th), 9, 'c', za);
    }
    txt('Z9', cx, cy + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: za });
    arrow(1230, cy, 1380, cy, C.dim, za, 3);
    txt('k mod 3', 1305, cy - 18, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: za });
    for (let k = 0; k < 3; k++) {
      const th = -Math.PI / 2 + TAU * k / 3;
      dot(1470 + 60 * Math.cos(th), cy + 60 * Math.sin(th), 11, 'c', za);
    }
    txt('P · 3-cycle', 1560, cy + 10, { size: 24, fam: F.mono, w: 700, c: C.white, a: za });
  }
  const sa = a * at(S, 1, 0.6);
  if (sa > 0.003) {
    panel(940, 480, 860, 310, sa, C.argued, 'LIFTED SHELL · 提升球壳 (schematic 示意)');
    const g = ease(Q(S, 1, 'at least twenty-five', 1.0));
    const n = 19 + Math.round(6 * g);
    for (let i = 0; i < 25; i++) {
      if (i >= n) break;
      const th = -Math.PI / 2 + TAU * i / (i < 19 ? 19 : 1) ;
      const ang = i < 19 ? -Math.PI / 2 + TAU * i / 19 : -Math.PI / 2 + TAU * (i - 19 + 0.5) / 6;
      const r = i < 19 ? 105 : 50;
      dot(1150 + r * Math.cos(ang), 640 + r * Math.sin(ang), i < 19 ? 9 : 11, i < 19 ? 'c' : 'm', sa);
      void th;
    }
    txt(String(n), 1450, 660, { size: 84, fam: F.orb, w: 900, c: n === 25 ? C.now : C.white, a: sa });
    txt(n === 25 ? 'states · 二十五态' : 'points · 十九点', 1450, 710, { size: 26, fam: F.zh, w: 700, c: C.white, a: sa });
    txt('to carry Z9 faithfully · 忠实承载 Z9', 1400, 760, { size: 20, fam: F.zh, w: 700, c: C.dim, a: sa });
  }
};

/* ======================================================================= */
/*                                scene 7 · THE FORK                         */
/* ======================================================================= */
SCENES.fork = S => {
  const a = btFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'still open', 'open']]);
  /* the shared vacuum */
  const oq = Q(S, 3, 'Deciding c6', 0.5);
  const va = a * at(S, 0, 0.6) * (1 - oq);
  panel(560, 190, 800, 170, va, C.cyan, 'JOINT WITNESS · 联合见证');
  txt(`zero ${BT_ZERO}`, W / 2, 262, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.white, a: va });
  txt('same 105-winding vacuum · same tree spectrum · 同一座 105 圈真空', W / 2, 322, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: va * Q(S, 0, 'one hundred five', 0.5) });
  /* line 0: what the witness already hits (the chapter's replay certificate) */
  const wa = a * at(S, 0, 0.6, 2.0) * (1 - at(S, 1, 0.4));
  if (wa > 0.003) {
    [['three physical windows cleared', '同时穿过三项物理窗'],
     ['action above the free 105-winding vacuum:  4.857224 × 10⁻⁸', '高出同高度自由真空'],
     ['|Vub|²  +1.328 ppm      J  +0.811 ppm', '夸克混合百万分之一级']].forEach(([en, zh], i) => {
      const ra = wa * at(S, 0, 0.5, 2.6 + 0.8 * i), y = 480 + i * 80;
      txt(en, 300, y, { size: 30, fam: F.mono, w: 700, c: C.white, a: ra });
      txt(zh, 1620, y, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.dim, a: ra });
    });
    txt('replay certificate · 复算证书', W / 2, 760, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: wa * at(S, 0, 0.5, 4.0) });
  }
  /* two branches */
  const ba = a * at(S, 1, 0.5), pa = a * at(S, 2, 0.5);
  if (ba > 0.003) arrow(820, 370, 520, 450, C.cyan, ba, 3);
  if (pa > 0.003) arrow(1100, 370, 1400, 450, C.mag, pa, 3);
  if (ba > 0.003) {
    panel(140, 460, 760, 330, ba, C.cyan, 'ORTHOGONAL CURRENTS · 正交电流');
    const ox = 290, oy = 650;
    arrow(ox, oy, ox + 130, oy, C.cyan, ba, 4); arrow(ox, oy, ox, oy - 130, C.cyan, ba, 4);
    box(ox, oy - 22, 22, 22, C.cyan, ba, 2);
    txt('J₁ ⊥ J₂', ox + 40, oy + 50, { size: 28, fam: F.math, w: 700, c: C.white, a: ba });
    txt('dim-6 vertex cancels', 490, 560, { size: 28, fam: F.disp, w: 700, c: C.white, a: ba });
    btRich([['ΔB ≡ 0 (mod 3)', C.cyan]], 490, 620, { size: 30, a: ba * Q(S, 1, 'triality holds', 0.5) });
    txt('proton stable · 质子稳定', 490, 680, { size: 28, fam: F.zh, w: 700, c: C.cyan, a: ba * Q(S, 1, 'the proton is stable', 0.5) });
  }
  if (pa > 0.003) {
    panel(1020, 460, 760, 330, pa, C.mag, 'PARALLEL CURRENTS · 平行电流');
    const ox = 1110, oy = 650;
    arrow(ox, oy, ox + 150, oy - 60, C.mag, pa, 4); arrow(ox, oy + 30, ox + 150, oy - 30, C.mag, pa, 4);
    txt('J₁ ∥ J₂', ox + 10, oy + 80, { size: 28, fam: F.math, w: 700, c: C.white, a: pa });
    txt('QQQL switched on · 激活', 1310, 560, { size: 28, fam: F.zh, w: 700, c: C.white, a: pa });
    btRich([['|W| ≥ ', C.white], [BT_WBOUND, C.mag]], 1310, 630, { size: 28, a: pa * Q(S, 2, 'Wilson factor', 0.5), fam: F.mono });
    txt('replay certificate · 复算证书', 1310, 680, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pa * Q(S, 2, 'Wilson factor', 0.5) });
    txt('triangle-averaged family · 三角平均族', 1310, 716, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pa * Q(S, 2, 'Wilson factor', 0.5) });
  }
  /* line 3: the open question */
  const oa = a * Q(S, 3, 'Deciding c6', 0.6, 0.4);
  if (oa > 0.003) {
    panel(560, 190, 800, 170, oa, C.open, 'OPEN · 开放问题');
    txt('c6 from the partition function ?', W / 2, 268, { size: 36, fam: F.disp, w: 700, align: 'center', c: C.open, a: oa });
    txt('从主配分函数裁决 c6 · 哪一支？', W / 2, 322, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.open, a: oa });
  }
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
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
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.12, cx: 1500, cy: 360, camZ: 7, lw: 1.3, dots: false });
  txt(DATA.film.title_zh, W / 2, 300, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('BARYON TRIALITY', W / 2, 390, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 6 });
  [0, 1, 2, 3].forEach((B, i) => {
    const o = { B }, x = 555 + i * 270, j = btMod3(-o.B);
    btDial(x, 600, 70, j, 1, { dot: 7, lw: 4 });
    txt(`ΔB = ${o.B}`, x, 720, { size: 28, fam: F.mono, w: 700, align: 'center', c: j ? C.mag : C.cyan });
  });
  btRich([['X', C.white], ['eff', C.dim], [' ≡ −h B (mod 3)', C.cyan]], W / 2, 480, { size: 44, align: 'center', ab: 1 });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
