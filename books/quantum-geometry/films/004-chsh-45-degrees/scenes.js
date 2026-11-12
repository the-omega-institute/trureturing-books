/* Film 004 · 45°: the cosine arc above the toy classical line · 45°：余弦弧高出玩具经典折线
   (book quantum-geometry, part IV: chapter 13). Scenes for theme/film/engine.js.

   Directions live in the (Z, X) plane, measured from Z towards X: n(t) = cos t · Z + sin t · X. Alice is drawn
   solid, Bob dashed, as in the chapter's chsh-dial page.

   What each scene shows, and where it rests:
     arc      On |Φ⁺⟩ the correlation of n(s) ⊗ n(t) is cos(s − t); the uniform hidden-direction toy model gives
              1 − 2θ/π. They agree at 0°, 90°, 180°; at 45° the gap is √2/2 − 1/2 (ch. 13 example
              ex-bell-chsh-45deg, step 3; computed; the toy line belongs to that toy model only).
     four     A₀ = Z, A₁ = X, B₀ = n(45°), B₁ = n(−45°): pair angles 45°, 45°, 45°, 135°; the four signed
              cosines stack to 2√2, the toy line to 2 (step 2 of the same example; computed from 4 × 4 matrices).
     sweep    Bob's pair B₀ = n(φ), B₁ = n(φ − 90°): ⟨S⟩ = 2 cos φ + 2 sin φ = 2√2 cos(φ − 45°); the toy model stays at
              2 for 0° ≤ φ ≤ 90° (chsh-dial preset sweep / hidden; computed).
     tables   The 16 deterministic answer tables give exactly ±2, eight each (example ex-sixteen-deterministic-chsh-
              tables; enumerated here); any finite weighted mixture stays in [−2, 2]
              ..... ClassicalFiberBound.classical_chsh_bound_is_exact (LEAN).
     ceiling  S² = 4 · 1 − [A₀, A₁] ⊗ [B₀, B₁] ..... LandauIdentity.landau_identity (LEAN); for in-plane qubit
              directions [A₀, A₁] = 2 sin α · J with J = [[0, 1], [−1, 0]] (= iY), so the largest eigenvalue of S² is
              4 + 4 sin α sin β (hand derivation in ch. 13; computed); the fixed 45° operator reaches 2√2 on |Φ⁺⟩ and
              no state exceeds it ..... TsirelsonTightness.bell_chsh_state_expectation_is_greatest (LEAN).

   On load, FILM.init checks DATA.lean against the three theorems and re-derives every number shown on screen by an
   independent route (4 × 4 matrices against the cosine formulas, the toy model by summing over 7200 hidden
   directions, the Landau identity on a grid of angles, the eigenvectors of S² for the fixed operator, the sixteen
   tables by enumeration). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const CD_DEG = Math.PI / 180;
const CD_R2 = Math.SQRT2;
const cdCos = th => Math.cos(th);                     // Bell-state correlation of two in-plane directions at angle θ
const cdToy = th => 1 - 2 * Math.abs(th) / Math.PI;    // uniform hidden-direction toy model, 0 ≤ |θ| ≤ π
/* the configuration of scene four: Alice Z, X; Bob at ±45° */
const CD_A = [0, 90 * CD_DEG];
const cdBob = phi => [phi, phi - 90 * CD_DEG];
/* pairs in CHSH order with their signs */
const CD_PAIRS = [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, -1]];
const cdPairAngle = (phi, i, j) => Math.abs(CD_A[i] - cdBob(phi)[j]);
const cdQuantumS = phi => CD_PAIRS.reduce((s, [i, j, g]) => s + g * cdCos(cdPairAngle(phi, i, j)), 0);
const cdToyS = phi => CD_PAIRS.reduce((s, [i, j, g]) => s + g * cdToy(cdPairAngle(phi, i, j)), 0);
/* the sixteen deterministic answer tables: k = (a₀ a₁ b₀ b₁) in binary, bit 1 ↦ +1 */
const CD_TABLES = Array.from({ length: 16 }, (_, k) => {
  const a0 = k & 8 ? 1 : -1, a1 = k & 4 ? 1 : -1, b0 = k & 2 ? 1 : -1, b1 = k & 1 ? 1 : -1;
  return { a0, a1, b0, b1, s: a0 * b0 + a0 * b1 + a1 * b0 - a1 * b1 };
});
/* weights of a finite hidden variable (one table per address), changing slowly with time; normalized */
function cdWeights(t) {
  const w = CD_TABLES.map((_, k) => Math.pow(1 + 0.95 * Math.sin(0.9 * t + 2.39 * k), 2) + 0.02);
  const z = w.reduce((s, v) => s + v, 0);
  return w.map(v => v / z);
}
const cdMix = t => cdWeights(t).reduce((s, m, k) => s + m * CD_TABLES[k].s, 0);
/* largest eigenvalue of S² for openings α (Alice) and β (Bob), from the hand derivation */
const cdTop = (al, be) => 4 + 4 * Math.sin(al) * Math.sin(be);

/* ---------- 4 × 4 real matrices (all operators here are real: Z and X are real) ---------- */
const MX = {
  n: t => [[Math.cos(t), Math.sin(t)], [Math.sin(t), -Math.cos(t)]],
  kron: (A, B) => {
    const n = A.length, m = B.length, K = Array.from({ length: n * m }, () => new Array(n * m).fill(0));
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < m; k++) for (let l = 0; l < m; l++) K[i * m + k][j * m + l] = A[i][j] * B[k][l];
    return K;
  },
  add: (A, B, s = 1) => A.map((r, i) => r.map((v, j) => v + s * B[i][j])),
  mul: (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0))),
  vec: (A, v) => A.map(r => r.reduce((s, x, k) => s + x * v[k], 0)),
  dot: (u, v) => u.reduce((s, x, k) => s + x * v[k], 0),
  id: n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))),
  maxAbs: A => A.reduce((m, r) => Math.max(m, ...r.map(Math.abs)), 0),
  chsh: (a0, a1, b0, b1) => {
    const K = (s, t) => MX.kron(MX.n(s), MX.n(t));
    return MX.add(MX.add(MX.add(K(a0, b0), K(a0, b1)), K(a1, b0)), K(a1, b1), -1);
  },
  comm: (P, R) => MX.add(MX.mul(P, R), MX.mul(R, P), -1)
};
const BELL = { phiP: [1, 0, 0, 1].map(v => v / CD_R2), psiM: [0, 1, -1, 0].map(v => v / CD_R2), phiM: [1, 0, 0, -1].map(v => v / CD_R2), psiP: [0, 1, 1, 0].map(v => v / CD_R2) };
const cdExpect = (M, v) => MX.dot(v, MX.vec(M, v));

const CD_LEAN = {
  classical_chsh_bound_is_exact: 'D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact',
  landau_identity: 'D5/S3/QuantumBounds/LandauIdentity.landau_identity',
  bell_chsh_state_expectation_is_greatest: 'D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('chsh film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(CD_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(CD_LEAN).length}`);
  for (const [short, gid] of Object.entries(CD_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. ARC: the Bell-state correlation of two in-plane directions is the cosine of their angle (4 × 4 matrices) */
  for (let i = 0; i <= 36; i++) for (let j = 0; j <= 36; j++) {
    const s = i * 10 * CD_DEG, t = j * 10 * CD_DEG;
    check(near(cdExpect(MX.kron(MX.n(s), MX.n(t)), BELL.phiP), Math.cos(s - t)), `⟨n(s) ⊗ n(t)⟩ at ${i}, ${j}`);
  }
  /* the toy model, summed over 7200 equally spaced hidden directions, against the straight line */
  const toySum = th => {
    const N = 7200; let s = 0;
    for (let k = 0; k < N; k++) {
      const l = (k + 0.5) * 2 * Math.PI / N;
      s += Math.sign(Math.cos(l)) * Math.sign(Math.cos(l - th));
    }
    return s / N;
  };
  for (let d = 0; d <= 180; d += 15) check(Math.abs(toySum(d * CD_DEG) - cdToy(d * CD_DEG)) < 1e-3, `toy model at ${d}°`);
  check(near(cdCos(45 * CD_DEG) - cdToy(45 * CD_DEG), (CD_R2 - 1) / 2), 'gap at 45°');
  for (const d of [0, 90, 180]) check(near(cdCos(d * CD_DEG), cdToy(d * CD_DEG)), `arc and line meet at ${d}°`);

  /* 2. FOUR: the fixed 45° operator on |Φ⁺⟩ */
  const b45 = cdBob(45 * CD_DEG);
  const S45 = MX.chsh(CD_A[0], CD_A[1], b45[0], b45[1]);
  check(near(cdExpect(S45, BELL.phiP), 2 * CD_R2), '⟨S⟩ at 45° is not 2√2');
  check(near(cdQuantumS(45 * CD_DEG), 2 * CD_R2), 'four signed cosines at 45°');
  check(near(cdToyS(45 * CD_DEG), 2), 'four toy values at 45°');
  const ang = [0, 1, 2, 3].map(k => cdPairAngle(45 * CD_DEG, CD_PAIRS[k][0], CD_PAIRS[k][1]) / CD_DEG);
  check(ang.every((v, k) => near(v, k < 3 ? 45 : 135, 1e-9)), `pair angles ${ang}`);
  /* the same operator equals √2 (Z⊗Z + X⊗X) */
  const ZZ = MX.kron(MX.n(0), MX.n(0)), XX = MX.kron(MX.n(Math.PI / 2), MX.n(Math.PI / 2));
  check(MX.maxAbs(MX.add(S45, MX.add(ZZ, XX).map(r => r.map(v => v * CD_R2)), -1)) < 1e-12, 'S ≠ √2 (ZZ + XX)');

  /* 3. SWEEP: ⟨S⟩(φ) from matrices, the closed form, and the flat toy model */
  for (let d = 0; d <= 90; d += 1) {
    const phi = d * CD_DEG, b = cdBob(phi);
    const v = cdExpect(MX.chsh(CD_A[0], CD_A[1], b[0], b[1]), BELL.phiP);
    check(near(v, 2 * CD_R2 * Math.cos(phi - Math.PI / 4)), `sweep closed form at ${d}°`);
    check(near(v, cdQuantumS(phi)), `sweep cosines at ${d}°`);
    check(near(cdToyS(phi), 2), `toy model not flat at ${d}°`);
    check(v <= 2 * CD_R2 + 1e-12, `sweep exceeds 2√2 at ${d}°`);
  }

  /* 4. TABLES: every deterministic table gives ±2, eight of each; mixtures stay inside [−2, 2] */
  check(CD_TABLES.every(T => Math.abs(T.s) === 2), 'a table outside ±2');
  check(CD_TABLES.filter(T => T.s === 2).length === 8 && CD_TABLES.filter(T => T.s === -2).length === 8, 'not eight of each');
  check(CD_TABLES.every(T => T.s === T.a0 * (T.b0 + T.b1) + T.a1 * (T.b0 - T.b1)), 'factorisation');
  check(CD_TABLES.every(T => (T.b0 + T.b1) * (T.b0 - T.b1) === 0), 'a bracket that is not zero');
  for (let k = 0; k < 400; k++) { const m = cdMix(k * 0.1); check(m >= -2 && m <= 2, `mixture ${m}`); }
  for (let k = 0; k < 40; k++) { const w = cdWeights(k * 0.37); check(w.every(v => v > 0) && near(w.reduce((s, v) => s + v, 0), 1), 'weights'); }

  /* 5. CEILING: Landau identity S² = 4·1 − [A₀, A₁] ⊗ [B₀, B₁] on a grid of directions, and its spectrum */
  const I4 = MX.id(4), J = [[0, 1], [-1, 0]];
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    const a0 = 0.31 * i, a1 = 0.31 * i + 0.27 * j - 1, b0 = 0.19 * j + 0.4, b1 = -0.23 * i + 0.5 * j;
    const S = MX.chsh(a0, a1, b0, b1);
    const CA = MX.comm(MX.n(a0), MX.n(a1)), CB = MX.comm(MX.n(b0), MX.n(b1));
    const rhs = MX.add(I4.map(r => r.map(v => 4 * v)), MX.kron(CA, CB), -1);
    check(MX.maxAbs(MX.add(MX.mul(S, S), rhs, -1)) < 1e-12, `Landau identity at ${i}, ${j}`);
    /* in-plane commutator = 2 sin(a₁ − a₀) J */
    check(MX.maxAbs(MX.add(CA, J.map(r => r.map(v => 2 * Math.sin(a1 - a0) * v)), -1)) < 1e-12, `commutator at ${i}, ${j}`);
    /* C = −[A₀, A₁] ⊗ [B₀, B₁] is symmetric, traceless, squares to N²·1, so its eigenvalues are ±N and S²'s top is 4 + |N| */
    const Cm = MX.kron(CA, CB).map(r => r.map(v => -v)), N = 4 * Math.sin(a1 - a0) * Math.sin(b1 - b0);
    check(MX.maxAbs(MX.add(MX.mul(Cm, Cm), I4.map(r => r.map(v => N * N * v)), -1)) < 1e-11, `C² ≠ N² at ${i}, ${j}`);
    check(near(Cm[0][0] + Cm[1][1] + Cm[2][2] + Cm[3][3], 0), `tr C at ${i}, ${j}`);
  }
  check(near(cdTop(Math.PI / 2, Math.PI / 2), 8), 'top eigenvalue at right angles');
  /* the fixed operator: S² = 8 on |Φ⁺⟩, |Ψ⁻⟩ and 0 on |Φ⁻⟩, |Ψ⁺⟩ */
  const S2 = MX.mul(S45, S45);
  for (const [k, lam] of [['phiP', 8], ['psiM', 8], ['phiM', 0], ['psiP', 0]]) {
    const w = MX.vec(S2, BELL[k]);
    check(w.every((x, i) => near(x, lam * BELL[k][i])), `S² on ${k} is not ${lam}`);
  }
  check(near(Math.sqrt(8), 2 * CD_R2) && near(2 * CD_R2 / 2, CD_R2), 'root eight');
});
Object.assign(FILM.speed, { arc: 0.02, four: 0.016, sweep: 0.016, tables: 0.02, ceiling: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const cdFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const cdNum = (v, n = 3, plus = false) => (v < -0.5 * Math.pow(10, -n) ? '−' : plus ? '+' : '') + Math.abs(v).toFixed(n);
const cdDir = t => [Math.sin(t), -Math.cos(t)];   // screen direction of n(t): Z up, X right
function cdRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* the (Z, X) dial */
function cdDial(cx, cy, R, a) {
  if (a <= 0.003) return;
  ring(cx, cy, R, C.dim, 0.55 * a, 1.4);
  line(cx - R - 16, cy, cx + R + 16, cy, C.dim, 0.35 * a, 1);
  line(cx, cy - R - 16, cx, cy + R + 16, C.dim, 0.35 * a, 1);
}
/* Bob's label sits further out when his arrow lies on one of Alice's */
const cdOnAlice = t => CD_A.some(s => Math.abs(Math.atan2(Math.sin(t - s), Math.cos(t - s))) < 25 * CD_DEG);
const cdBobR = t => (cdOnAlice(t) ? -1 : 34);
/* an arrow on the dial: solid (Alice) or dashed (Bob) */
function cdArrow(cx, cy, R, t, col, a, o = {}) {
  if (a <= 0.003) return;
  const [dx, dy] = cdDir(t), x2 = cx + R * dx, y2 = cy + R * dy, w = o.w || 4;
  if (o.dash) { dashed(cx, cy, x2 - 12 * dx, y2 - 12 * dy, col, a, w); arrow(x2 - 18 * dx, y2 - 18 * dy, x2, y2, col, a, w); }
  else arrow(cx, cy, x2, y2, col, a, w);
  if (o.label && o.lr === -1) {
    /* the arrow lies on another one: put the label inside the dial, beside the shaft */
    const px = dy, py = -dx;
    txt(o.label, cx + 0.72 * R * dx + 30 * px, cy + 0.72 * R * dy + 30 * py + 10, { size: o.ls || 28, fam: F.math, w: 700, align: 'center', c: col, a });
  } else if (o.label) {
    const r = R + (o.lr || 34), align = dx > 0.5 ? 'left' : dx < -0.5 ? 'right' : 'center', sh = align === 'left' ? -18 : align === 'right' ? 18 : 0;
    txt(o.label, cx + r * dx + sh, cy + r * dy + 10, { size: o.ls || 28, fam: F.math, w: 700, align, c: col, a });
  }
}
/* an angle mark between directions t1 and t2 at radius r */
function cdAngle(cx, cy, r, t1, t2, col, a, label, lw = 2.5) {
  if (a <= 0.003) return;
  curve(s => { const [dx, dy] = cdDir(lerp(t1, t2, s)); return [cx + r * dx, cy + r * dy]; }, 48, col, a, lw);
  if (label) { const [dx, dy] = cdDir((t1 + t2) / 2); txt(label, cx + (r + 34) * dx, cy + (r + 34) * dy + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a }); }
}
/* LEAN ✓ chip for one cited theorem, by short name */
const CD_MISSING = new Set();
function cdLean(x, y, short, a, o = {}) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) {
    if (!CD_MISSING.has(short)) { CD_MISSING.add(short); window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* opening title */
function cdTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('45°: THE COSINE ARC ABOVE THE TOY CLASSICAL LINE', p, 5), W / 2, 580, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('ARC · FOUR PAIRS · TURN · TABLES · CEILING', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 8 });
}

/* ---------- the correlation plot θ ∈ [0, π] (scene arc, poster) ---------- */
const AP = { x0: 860, x1: 1740, yc: 520, k: 230 };
const apX = th => AP.x0 + (AP.x1 - AP.x0) * th / Math.PI;
const apY = v => AP.yc - AP.k * v;
function apAxes(a) {
  if (a <= 0.003) return;
  line(AP.x0, AP.yc, AP.x1 + 20, AP.yc, C.dim, 0.6 * a, 1.4);
  line(AP.x0, apY(1.12), AP.x0, apY(-1.12), C.dim, 0.6 * a, 1.4);
  for (const d of [0, 45, 90, 135, 180]) {
    const x = apX(d * CD_DEG);
    if (d) line(x, apY(1.05), x, apY(-1.05), C.dim, 0.18 * a, 1);
    txt(`${d}°`, x, apY(-1) + 52, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  for (const [v, s] of [[1, '+1'], [0, '0'], [-1, '−1']]) {
    line(AP.x0 - 8, apY(v), AP.x0, apY(v), C.dim, 0.6 * a, 1.4);
    txt(s, AP.x0 - 16, apY(v) + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  }
  txt('θ', AP.x1 + 30, AP.yc + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
}
function apArc(th0, th1, a, lw = 4) { if (th1 > th0) curve(s => { const t = lerp(th0, th1, s); return [apX(t), apY(cdCos(t))]; }, 90, C.cyan, a, lw); }
function apLine(th0, th1, a, lw = 3) { if (th1 > th0) curve(s => { const t = lerp(th0, th1, s); return [apX(t), apY(cdToy(t))]; }, 2, C.white, a * 0.55, lw); }
/* the magenta gap between arc and line at θ */
function apGap(th, a, label) {
  if (a <= 0.003) return;
  const x = apX(th), y1 = apY(cdToy(th)), y2 = apY(cdCos(th));
  line(x, y1, x, y1 + (y2 - y1) * eo(a), C.mag, a, 7);
  if (label) txt(label, x - 18, (y1 + y2) / 2 + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.mag, a });
}

/* ======================================================================= */
/*                            scene 1 · ARC AND LINE                         */
/* ======================================================================= */
const D1 = { cx: 400, cy: 470, R: 200 };
SCENES.arc = S => {
  const u = S.u;
  cdTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1), L2 = lineAt(S, 2), L3 = lineAt(S, 3);
  /* θ: sweep out along the arc (line 0), back along the line (line 1), out again past the meeting points (line 2),
     then settle at 45° (line 3) */
  const p0 = ease(clamp((u - L0.s - 0.5) / (L0.e - L0.s - 0.3)));
  const p1 = ease(clamp((u - L1.s - 0.6) / (L1.e - L1.s - 0.4)));
  const p2 = clamp((u - L2.s - 0.1) / (L2.e - L2.s + 0.2));
  const p3 = ease(clamp((u - L3.s) / 1.6));
  let th;
  if (u < L1.s) th = Math.PI * p0;
  else if (u < L2.s) th = Math.PI * (1 - p1);
  else if (u < L3.s) th = Math.PI * p2;
  else th = lerp(Math.PI, Math.PI / 4, p3);
  const arcEnd = u < L1.s ? Math.PI * p0 : Math.PI;
  const lineStart = u < L1.s ? Math.PI : u < L2.s ? Math.PI * (1 - p1) : 0;
  /* the dial */
  cdDial(D1.cx, D1.cy, D1.R, a);
  cdArrow(D1.cx, D1.cy, D1.R, 0, C.white, a, { label: 'a' });
  cdArrow(D1.cx, D1.cy, D1.R, th, C.now, a, { dash: true, label: 'b' });
  cdAngle(D1.cx, D1.cy, 70, 0, th, C.now, a * clamp(th / 0.15), 'θ');
  txt(`θ = ${(th / CD_DEG).toFixed(1)}°`, D1.cx - 170, 740, { size: 30, fam: F.mono, w: 700, c: C.now, a });
  txt(`cos θ = ${cdNum(cdCos(th), 3, true)}`, D1.cx - 170, 784, { size: 26, fam: F.mono, w: 700, c: C.cyan, a });
  txt(`1 − 2θ/π = ${cdNum(cdToy(th), 3, true)}`, D1.cx - 170, 824, { size: 26, fam: F.math, w: 700, c: C.white, a: a * 0.6 * at(S, 1, 0.6) });
  /* the plot */
  apAxes(a);
  apArc(0, arcEnd, a);
  txt('cos θ · Bell state |Φ⁺⟩ · ZX plane', AP.x0 + 20, 214, { size: 24, fam: F.math, w: 700, c: C.cyan, a });
  const la = at(S, 1, 0.6, 0.2);
  apLine(lineStart, Math.PI, a * la);
  txt('1 − 2θ/π · toy hidden-direction model', AP.x0 + 20, 250, { size: 24, fam: F.math, w: 700, c: C.white, a: a * la * 0.6 });
  /* the current point(s) */
  const thx = apX(th);
  dashed(thx, apY(1.08), thx, apY(-1.08), C.now, a * 0.6, 1.5);
  if (th <= arcEnd + 1e-9) dot(thx, apY(cdCos(th)), 13, 'c', a);
  if (th >= lineStart - 1e-9 && la > 0) dot(thx, apY(cdToy(th)), 11, 'w', a * la);
  /* meeting points (line 2): light as θ passes them */
  if (u >= L2.s) [0, 90, 180].forEach(d => {
    const t = d * CD_DEG, on = u >= L3.s || th >= t - 1e-6 ? 1 : 0;
    ring(apX(t), apY(cdCos(t)), 18, C.white, a * on * (u >= L3.s ? 1 - p3 * 0.5 : 1), 2.5);
  });
  /* the gap at 45° (line 3) */
  const g = Q(S, 3, 'the arc stands higher', 0.8);
  apGap(Math.PI / 4, a * g, `+${((CD_R2 - 1) / 2).toFixed(3)}`);
  txt(`√2/2 − 1/2 = ${((CD_R2 - 1) / 2).toFixed(4)}`, apX(Math.PI / 4) + 70, apY(1) - 4, { size: 24, fam: F.math, w: 700, c: C.mag, a: a * g });
};

/* ======================================================================= */
/*                            scene 2 · FOUR PAIRS                           */
/* ======================================================================= */
const D2 = { cx: 380, cy: 480, R: 190 };
const GA = { base: 800, k: 190 };   // gauges: px per unit
function gaugeAxis(x, a) {
  line(x, GA.base, x, GA.base - 3.05 * GA.k, C.dim, 0.6 * a, 1.4);
  for (const v of [0, 1, 2]) {
    line(x - 8, GA.base - v * GA.k, x, GA.base - v * GA.k, C.dim, 0.6 * a, 1.4);
    txt(String(v), x - 16, GA.base - v * GA.k + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  }
}
SCENES.four = S => {
  const u = S.u, a = cdFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const L2 = lineAt(S, 2);
  /* Bob's pair turns from aligned (B₀ on Z, B₁ on −X) to 45° */
  const turn = ease(Q(S, 0, 'Bob turns', 2.0, 0.2));
  const phi = 45 * CD_DEG * turn, B = cdBob(phi), moving = turn > 0 && turn < 1;
  /* the current pair while stacking (line 2) */
  const t0 = L2.s + 0.4, step = (L2.e - L2.s - 0.2) / 4;
  const cur = u >= t0 && u < t0 + 4 * step ? Math.floor((u - t0) / step) : -1;
  cdDial(D2.cx, D2.cy, D2.R, a);
  const hl = (who, k) => cur >= 0 && CD_PAIRS[cur][who] === k;
  cdArrow(D2.cx, D2.cy, D2.R, CD_A[0], hl(0, 0) ? C.now : C.white, a, { label: 'A₀ = Z' });
  cdArrow(D2.cx, D2.cy, D2.R, CD_A[1], hl(0, 1) ? C.now : C.white, a, { label: 'A₁ = X' });
  cdArrow(D2.cx, D2.cy, D2.R, B[0], moving || hl(1, 0) ? C.now : C.white, a, { dash: true, label: 'B₀', lr: cdBobR(B[0]) });
  cdArrow(D2.cx, D2.cy, D2.R, B[1], moving || hl(1, 1) ? C.now : C.white, a, { dash: true, label: 'B₁', lr: cdBobR(B[1]) });
  if (turn > 0) cdAngle(D2.cx, D2.cy, 120, 0, phi, moving ? C.now : C.dim, a, moving || turn >= 1 ? `${(phi / CD_DEG).toFixed(0)}°` : null, 2);
  txt('solid · Alice    dashed · Bob', D2.cx - 190, 790, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
  if (cur >= 0) {
    const [i, j] = CD_PAIRS[cur], s = CD_A[i], t = B[j];
    cdAngle(D2.cx, D2.cy, 64, Math.min(s, t), Math.max(s, t), C.now, a, null, 3);
  }
  /* the four pairs */
  const x = 700, y = 200, w = 600, pa = a * at(S, 1, 0.6, -0.3);
  panel(x, y, w, 470, pa, C.cyan, 'FOUR PAIRS · 四对方向');
  txt('pair', x + 70, y + 76, { size: 20, fam: F.mono, w: 700, c: C.dim, a: pa });
  txt('angle', x + 200, y + 76, { size: 20, fam: F.mono, w: 700, c: C.dim, a: pa });
  txt('cos', x + 420, y + 76, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: pa });
  txt('toy', x + 560, y + 76, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: pa * 0.6 });
  const names = ['A₀ B₀', 'A₀ B₁', 'A₁ B₀', 'A₁ B₁'];
  CD_PAIRS.forEach(([i, j, g], k) => {
    const ry = y + 140 + k * 66, ra = pa * Q(S, 1, k < 3 ? 'Three pairs' : 'the last', 0.5, k < 3 ? 0.35 * k : 0.2);
    const th = cdPairAngle(phi, i, j), now = k === cur;
    if (now) fillBox(x + 14, ry - 40, w - 28, 56, rgba(C.now, 0.14), ra);
    txt(g > 0 ? '+' : '−', x + 34, ry, { size: 30, fam: F.math, w: 700, align: 'center', c: g > 0 ? C.white : C.mag, a: ra });
    txt(names[k], x + 70, ry, { size: 28, fam: F.math, w: 700, c: now ? C.now : C.white, a: ra });
    txt(`${(th / CD_DEG).toFixed(0)}°`, x + 200, ry, { size: 28, fam: F.mono, w: 700, c: now ? C.now : C.white, a: ra });
    txt(cdNum(cdCos(th), 3, true), x + 420, ry, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ra });
    txt(cdNum(cdToy(th), 3, true), x + 560, ry, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: ra * 0.6 });
  });
  const sa = pa * clamp((u - t0 - 4 * step) / 0.5);
  line(x + 24, y + 392, x + w - 24, y + 392, C.dim, sa, 1.4);
  txt('Σ', x + 34, y + 436, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: sa });
  txt(cdNum(cdQuantumS(phi), 3), x + 420, y + 436, { size: 30, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: sa });
  txt(cdNum(cdToyS(phi), 3), x + 560, y + 436, { size: 30, fam: F.mono, w: 700, align: 'right', c: C.white, a: sa * 0.6 });
  /* the two gauges: signed terms stacked one per beat */
  const ga = a * at(S, 2, 0.6, -0.4);
  if (ga > 0) {
    const gx = [1460, 1660];
    gaugeAxis(1400, ga);
    txt('arc · 弧', gx[0], 196, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ga });
    txt('line · 折线', gx[1], 196, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ga * 0.6 });
    let hq = 0, hc = 0;
    CD_PAIRS.forEach(([i, j, g], k) => {
      const pk = eo(clamp((u - t0 - k * step) / 0.5));
      if (pk <= 0) return;
      const th = cdPairAngle(phi, i, j), q = g * cdCos(th) * pk, c = g * cdToy(th) * pk;
      const now = k === cur;
      fillBox(gx[0] - 44, GA.base - (hq + q) * GA.k + 2, 88, q * GA.k - 4, now ? C.now : C.cyan, ga * (now ? 0.75 : 0.5));
      fillBox(gx[1] - 44, GA.base - (hc + c) * GA.k + 2, 88, c * GA.k - 4, now ? C.now : C.white, ga * (now ? 0.55 : 0.22));
      hq += q; hc += c;
    });
    const fa = ga * at(S, 3, 0.6);
    dashed(1400, GA.base - 2 * GA.k, 1720, GA.base - 2 * GA.k, C.white, fa * 0.7, 1.5);
    line(gx[0] + 58, GA.base - 2 * GA.k, gx[0] + 58, GA.base - hq * GA.k, C.mag, fa, 6);
    txt(`+${(2 * CD_R2 - 2).toFixed(3)}`, gx[0] + 68, GA.base - (1 + hq / 2) * GA.k + 8, { size: 20, fam: F.mono, w: 700, c: C.mag, a: fa });
    txt(`2√2 ≈ ${(2 * CD_R2).toFixed(3)}`, gx[0], GA.base - hq * GA.k - 18, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: fa });
    txt('2', gx[1], GA.base - hc * GA.k - 18, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa });
  }
};

/* ======================================================================= */
/*                             scene 3 · TURN BOB                            */
/* ======================================================================= */
const SP = { x0: 880, x1: 1700, base: 800, k: 170 };
const spX = phi => SP.x0 + (SP.x1 - SP.x0) * phi / (Math.PI / 2);
const spY = v => SP.base - SP.k * v;
SCENES.sweep = S => {
  const u = S.u, a = cdFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const L0 = lineAt(S, 0), L2 = lineAt(S, 2);
  const s0 = phraseAt(S, 0, 'from zero'), s1 = L2.e - 0.2;
  const pf = clamp((u - s0) / (s1 - s0)), phi = Math.PI / 2 * pf, B = cdBob(phi), moving = pf > 0 && pf < 1;
  void L0;
  cdDial(D2.cx, D2.cy, D2.R, a);
  cdArrow(D2.cx, D2.cy, D2.R, CD_A[0], C.white, a, { label: 'A₀ = Z' });
  cdArrow(D2.cx, D2.cy, D2.R, CD_A[1], C.white, a, { label: 'A₁ = X' });
  cdArrow(D2.cx, D2.cy, D2.R, B[0], C.now, a, { dash: true, label: 'B₀', lr: cdBobR(B[0]) });
  cdArrow(D2.cx, D2.cy, D2.R, B[1], C.now, a, { dash: true, label: 'B₁', lr: cdBobR(B[1]) });
  if (phi > 0.01) cdAngle(D2.cx, D2.cy, 110, 0, phi, C.now, a, 'φ', 2);
  const v = cdQuantumS(phi);
  txt(`φ = ${(phi / CD_DEG).toFixed(1)}°`, D2.cx - 190, 760, { size: 30, fam: F.mono, w: 700, c: C.now, a });
  txt(`⟨S⟩ = ${v.toFixed(3)}`, D2.cx - 190, 806, { size: 30, fam: F.mono, w: 700, c: C.now, a });
  /* plot */
  line(SP.x0, SP.base, SP.x1 + 20, SP.base, C.dim, 0.6 * a, 1.4);
  line(SP.x0, SP.base, SP.x0, spY(3.1), C.dim, 0.6 * a, 1.4);
  for (const vv of [0, 1, 2, 3]) { line(SP.x0 - 8, spY(vv), SP.x0, spY(vv), C.dim, 0.6 * a, 1.4); txt(String(vv), SP.x0 - 16, spY(vv) + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); }
  for (const d of [0, 45, 90]) { const x = spX(d * CD_DEG); if (d) line(x, spY(0), x, spY(3.05), C.dim, 0.18 * a, 1); txt(`${d}°`, x, SP.base + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  txt('φ', SP.x1 + 30, SP.base + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  /* reference levels */
  dashed(SP.x0, spY(2 * CD_R2), SP.x1, spY(2 * CD_R2), C.mag, a * 0.8, 2);
  txt('2√2', SP.x1 + 14, spY(2 * CD_R2) + 8, { size: 24, fam: F.mono, w: 700, c: C.mag, a });
  dashed(SP.x0, spY(2), SP.x1, spY(2), C.white, a * 0.35, 1.5);
  txt('2', SP.x1 + 14, spY(2) + 8, { size: 24, fam: F.mono, w: 700, c: C.white, a: a * 0.6 });
  /* the formula (line 1) */
  const fa = a * Q(S, 1, 'the CHSH value is', 0.6);
  txt('⟨S⟩ = 2√2 · cos(φ − 45°)', SP.x0 + 30, 214, { size: 34, fam: F.math, w: 700, c: C.cyan, a: fa });
  txt('= cos φ + sin φ + sin φ + cos φ', SP.x0 + 30, 256, { size: 22, fam: F.math, w: 700, c: C.cyan, a: fa * 0.75 });
  /* the curve, traced to φ */
  if (phi > 0) curve(s => { const p = s * phi; return [spX(p), spY(cdQuantumS(p))]; }, 90, C.cyan, a, 4);
  dashed(spX(phi), spY(0), spX(phi), spY(3.05), C.now, a * 0.5 * (pf > 0 ? 1 : 0), 1.5);
  dot(spX(phi), spY(v), 14, 'g', a);
  /* the top at 45° (line 2) */
  const ta = a * (pf >= 0.5 ? 1 : 0) * Q(S, 2, 'touches', 0.6);
  if (ta > 0) { ring(spX(Math.PI / 4), spY(2 * CD_R2), 20, C.mag, ta, 2.5); txt(`${(2 * CD_R2).toFixed(3)} at 45°`, spX(Math.PI / 4) + 28, spY(2 * CD_R2) - 22, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ta }); }
  /* the toy model (line 3): flat at 2 */
  const ya = a * at(S, 3, 0.8);
  if (ya > 0) {
    curve(s => [spX(s * Math.PI / 2 * ya), spY(cdToyS(s * Math.PI / 2 * ya))], 30, C.white, ya * 0.85, 4);
    txt('toy model · 玩具模型', spX(Math.PI / 4), spY(2) + 46, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ya * 0.7 });
  }
  void moving;
};

/* ======================================================================= */
/*                          scene 4 · SIXTEEN TABLES                         */
/* ======================================================================= */
const TG = { x0: 150, y0: 380, w: 196, h: 98, gap: 14 };
const pm = v => (v > 0 ? '+' : '−');
SCENES.tables = S => {
  const u = S.u, a = cdFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const L2 = lineAt(S, 2);
  /* the sum and its factorisation */
  const f0 = a * at(S, 0, 0.6, 0.4);
  cdRich([['S = a₀b₀ + a₀b₁ + a₁b₀ − a₁b₁', C.white]], 150, 240, { size: 40, a: f0 });
  txt('a, b ∈ {+1, −1} · one table per hidden address λ', 150, 286, { size: 22, fam: F.mono, w: 700, c: C.dim, a: f0 });
  const f1 = a * at(S, 1, 0.6, 0.2);
  cdRich([['= a₀', C.white], ['(b₀ + b₁)', C.cyan], [' + a₁', C.white], ['(b₀ − b₁)', C.mag]], 870, 240, { size: 40, a: f1 });
  /* the sixteen tables: signs appear with line 0, values one by one through line 2 */
  const vs = L2.s + 0.3, vstep = (L2.e - L2.s - 0.4) / 16;
  CD_TABLES.forEach((T, k) => {
    const col = k % 4, row = Math.floor(k / 4);
    const x = TG.x0 + col * (TG.w + TG.gap), y = TG.y0 + row * (TG.h + TG.gap);
    const ta = a * clamp((u - lineAt(S, 0).s - 0.8 - 0.08 * k) / 0.4);
    if (ta <= 0) return;
    const pv = clamp((u - vs - k * vstep) / 0.3), col2 = T.s > 0 ? C.cyan : C.mag;
    box(x, y, TG.w, TG.h, pv > 0 ? col2 : C.dim, ta * (pv > 0 ? 0.9 : 0.5), 1.4, pv > 0 ? rgba(col2, 0.08) : 'rgba(4,10,24,0.55)');
    txt(`${pm(T.a0)}${pm(T.a1)} · ${pm(T.b0)}${pm(T.b1)}`, x + 16, y + 38, { size: 24, fam: F.mono, w: 700, c: C.white, a: ta * 0.85 });
    txt('a₀a₁ · b₀b₁', x + 16, y + 74, { size: 15, fam: F.math, w: 700, c: C.dim, a: ta * 0.8 });
    txt(T.s > 0 ? '+2' : '−2', x + TG.w - 16, y + 76, { size: 34, fam: F.mono, w: 700, align: 'right', c: col2, a: ta * pv });
  });
  /* right panel: why only ±2, and the mixture */
  const x = 1010, y = 360, w = 780, pa = a * Q(S, 2, 'One bracket', 0.6);
  panel(x, y, w, 470, pa, C.cyan, 'ONE BRACKET IS ZERO · 总有一个括号为 0');
  cdRich([['b₀ = b₁ :   ', C.white], ['b₀ + b₁ = ±2', C.cyan], ['   b₀ − b₁ = 0', C.dim]], x + 28, y + 86, { size: 28, a: pa });
  cdRich([['b₀ = −b₁ :  ', C.white], ['b₀ + b₁ = 0', C.dim], ['   b₀ − b₁ = ±2', C.mag]], x + 28, y + 136, { size: 28, a: pa });
  const shown = CD_TABLES.filter((_, k) => u >= vs + k * vstep);
  const np = shown.filter(T => T.s > 0).length, nm = shown.length - np;
  cdRich([['+2 × ', C.white], [String(np), C.cyan], ['     −2 × ', C.white], [String(nm), C.mag], ['     other values × 0', C.dim]], x + 28, y + 192, { size: 26, fam: F.mono, a: pa });
  /* the mixture on a number line (line 3) */
  const ma = a * at(S, 3, 0.6, 0.2);
  if (ma > 0) {
    const nx0 = x + 70, nx1 = x + w - 70, nyy = y + 330, X = v => lerp(nx0, nx1, (v + 2.5) / 5);
    line(nx0, nyy, nx1, nyy, C.dim, ma * 0.6, 1.4);
    const la = a * Q(S, 3, 'Lean checks', 0.6);
    line(X(-2), nyy, X(2), nyy, C.lean, Math.max(ma * 0.5, la), 6);
    for (const v of [-2, 0, 2]) { line(X(v), nyy - 12, X(v), nyy + 12, C.white, ma * 0.8, 2); txt(v < 0 ? '−2' : String(v), X(v), nyy + 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ma }); }
    const tm = u - lineAt(S, 3).s, m = cdMix(tm);
    dot(X(m), nyy, 15, 'g', ma);
    txt(`Σ μ(λ) · S(λ) = ${cdNum(m, 3)}`, x + 28, y + 266, { size: 26, fam: F.math, w: 700, c: C.now, a: ma });
    cdLean(x + 28, y + 438, 'classical_chsh_bound_is_exact', la, { size: 20 });
    chip(x + w - 130, y + 428, 170, 56, '|S| ≤ 2', C.lean, a * Q(S, 3, 'this bound', 0.4, 0.2), 32, F.math);
  }
};

/* ======================================================================= */
/*                              scene 5 · CEILING                            */
/* ======================================================================= */
/* a dial with two arrows and the magenta parallelogram they span */
function cdArea(cx, cy, R, t0, t1, a, dash, labels) {
  cdDial(cx, cy, R, a);
  const u0 = cdDir(t0), u1 = cdDir(t1);
  ctx.save(); ctx.globalAlpha = a * 0.3; ctx.fillStyle = C.mag; ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx + R * u0[0], cy + R * u0[1]); ctx.lineTo(cx + R * (u0[0] + u1[0]), cy + R * (u0[1] + u1[1])); ctx.lineTo(cx + R * u1[0], cy + R * u1[1]);
  ctx.closePath(); ctx.fill(); ctx.globalAlpha = a * 0.9; ctx.strokeStyle = C.mag; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
  cdArrow(cx, cy, R, t0, C.white, a, { dash, label: labels[0], ls: 24, lr: 26 });
  cdArrow(cx, cy, R, t1, C.white, a, { dash, label: Math.abs(t1 - t0) > 12 * CD_DEG ? labels[1] : null, ls: 24, lr: 26 });
}
SCENES.ceiling = S => {
  const u = S.u, a = cdFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, 'For qubits', 'computed'], [3, 'Lean checks', 'lean']]);
  /* the operator and its square */
  const f0 = a * at(S, 0, 0.6, 0.2);
  txt('S = A₀⊗B₀ + A₀⊗B₁ + A₁⊗B₀ − A₁⊗B₁', 130, 236, { size: 38, fam: F.math, w: 700, c: C.white, a: f0 });
  const f1 = a * Q(S, 1, 'the square is four', 0.6);
  cdRich([['S² = 4 · 1 ', C.white], ['− [A₀, A₁] ⊗ [B₀, B₁]', C.mag]], 130, 316, { size: 42, a: f1, ab: 1 });
  cdLean(130, 368, 'landau_identity', a * Q(S, 1, 'cross term', 0.6, 0.2), { size: 20 });
  /* the areas open (line 2) */
  const oa = a * at(S, 2, 0.6, -0.2), op = ease(clamp((u - phraseAt(S, 2, 'Open both') - 0.1) / 2.4));
  const al = Math.PI / 2 * op, be = Math.PI / 2 * op;
  if (oa > 0) {
    txt('[A₀, A₁] = 2i (a₀ × a₁)·σ ,  |a₀ × a₁| = sin α', 130, 436, { size: 26, fam: F.math, w: 700, c: C.mag, a: oa });
    cdArea(330, 660, 104, 0, al, oa, false, ['A₀', 'A₁']);
    cdArea(760, 660, 104, Math.PI / 4, Math.PI / 4 - be, oa, true, ['B₀', 'B₁']);
    txt(`Alice · α = ${(al / CD_DEG).toFixed(0)}°`, 330, 812, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: oa });
    txt(`Bob · β = ${(be / CD_DEG).toFixed(0)}°`, 760, 812, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: oa });
    cdRich([['top of S²: 4 + 4 sin α sin β = ', C.white], [cdTop(al, be).toFixed(3), C.now]], 130, 488, { size: 24, fam: F.mono, a: oa });
  }
  /* the gauge (lines 3 and 4) */
  const gx = 1380, ga = a * at(S, 3, 0.6, -0.3);
  if (ga > 0) {
    gaugeAxis(gx - 80, ga);
    const top = Math.sqrt(cdTop(al, be));
    dashed(gx - 80, GA.base - top * GA.k, gx + 300, GA.base - top * GA.k, C.mag, ga, 2.5);
    txt(`√8 = 2√2 ≈ ${top.toFixed(3)}`, gx + 110, GA.base - top * GA.k - 16, { size: 24, fam: F.mono, w: 700, c: C.mag, a: ga });
    /* the Bell state on the 45° operator rises to the ceiling */
    const rb = a * Q(S, 3, 'reaches two root two', 0.6), rv = 2 * CD_R2 * eo(clamp((u - phraseAt(S, 3, 'reaches two root two')) / 1.4));
    fillBox(gx - 40, GA.base - rv * GA.k, 90, rv * GA.k, C.cyan, rb * 0.55);
    txt('⟨S⟩ on |Φ⁺⟩', gx + 5, GA.base + 40, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: rb });
    cdLean(1150, 196, 'bell_chsh_state_expectation_is_greatest', rb, { size: 20 });
    /* the classical bound and the ratio (line 4) */
    const ca = a * at(S, 4, 0.6);
    dashed(gx - 80, GA.base - 2 * GA.k, gx + 300, GA.base - 2 * GA.k, C.lean, ca, 2.5);
    txt('2 · classical bound', gx + 110, GA.base - 2 * GA.k + 34, { size: 22, fam: F.mono, w: 700, c: C.lean, a: ca });
    const ra = a * Q(S, 4, 'a factor of root two', 0.6);
    txt(`2√2 / 2 = √2 ≈ ${CD_R2.toFixed(3)}`, gx + 110, GA.base - 0.9 * GA.k, { size: 26, fam: F.math, w: 700, c: C.white, a: ra, ab: 1 });
  }
};

/* ======================================================================= */
/*                               scene 6 · LEDGER                            */
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
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.18, cx: 520, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the arc against the line, with the four bumps at 45° and 135° */
  apAxes(1);
  apLine(0, Math.PI, 1);
  apArc(0, Math.PI, 1, 5);
  apGap(Math.PI / 4, 1, `+${((CD_R2 - 1) / 2).toFixed(3)}`);
  const x = apX(3 * Math.PI / 4), y1 = apY(cdToy(3 * Math.PI / 4)), y2 = apY(cdCos(3 * Math.PI / 4));
  line(x, y1, x, y2, C.mag, 1, 7);
  dot(apX(Math.PI / 4), apY(cdCos(Math.PI / 4)), 14, 'c', 1);
  txt('cos θ', apX(0.25) + 10, apY(1) - 12, { size: 26, fam: F.math, w: 700, c: C.cyan });
  txt('1 − 2θ/π', apX(2.45), apY(cdToy(2.45)) - 26, { size: 24, fam: F.math, w: 700, c: C.white, a: 0.6 });
  txt(DATA.film.title_zh, 450, 360, { size: 56, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('45°: THE COSINE ARC', 450, 452, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 4 });
  txt('ABOVE THE TOY CLASSICAL LINE', 450, 504, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  cdRich([['CHSH:  ', C.white], ['2', C.lean], ['  →  ', C.white], ['2√2', C.cyan]], 450, 600, { size: 50, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 450, 680, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
