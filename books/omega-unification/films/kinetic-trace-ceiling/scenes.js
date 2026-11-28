/* Film · Kinetic Traces and the UV Ceiling · 动能谱迹与紫外封顶
   (book omega-unification, chapter 5). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook     the strong hypothesis of chapter 5 (gauge kinetic terms arising from one positive heat-kernel trace over
              matter; a model assumption, argued) and the trace-index triples of def-ou-ch05-kinetic-trace:
              L = (2/5, 2, 1), R = (8/5, 0, 1), H = (3/10, 1/2, 0), C = (1/5, 0, 1/2); L + R = (2, 2, 2) and
              H + C = (1/2, 1/2, 1/2) (computed here in exact fractions); the balance law W_L = W_R (definition).
     laplace  S_X(u) = Σ e^{−u y_i}; Laplace uniqueness on an interval forces equal spectra and zero one-loop
              difference running (5.1 item 1, argued; the stick spectra are schematic); the three-copy shift
              y ↦ y + log 3 with multiplicity 3 gives S_R(u) = 3^{1−u} S_L(u): ratios 1, 1/3, 1/2187 at u = 1, 2, 8
              (ex-ou-ch05-three-copy-and-stieltjes item 1, computed here).
     schur    thm-ou-ch05-rational-schur (LEAN): rational_schur_complete (c.num ≠ 0: the form equals the Schur value
              plus the Schur square under FiniteRatio.Equivalent) and rational_schur_min (0 < c: the Schur value is a
              lower bound for every y, attained at schurMinPoint = −(b/c)x); the parabola is the worked instance
              a = 7, b = 3, c = 2, x = 1 (computed in exact fractions); the Stieltjes third-moment floor
              C ≥ B + (B − M)²/(M − W) is the chapter's hand derivation from the same completion (argued); its
              overshoot > 4.89948 in the rank-20 window is the chapter's certificate (NUM).
     scales   r ≤ 189 excluded and the r = 400 two-loop crossing (Q ≈ 5 × 10^14 GeV, α_G^{-1} ≈ 33.2), 5.1 item 3;
              the two-scale gap table of 5.2 item 3 (u = 8, 16, 20, 24, 36, a² ≈ 72.85): certificates (NUM).
     spin     the spin-balanced layer L_scalar + L_Dirac + 3 R_scalar of 5.3 (a model construction, argued):
              trace weights 1, 2, 3 give 3(L + R) = (6, 6, 6); one-loop weights 1/3, 4/3, 1/3 give
              (5/3)L + R = (2, 2, 2) + (2/3)L (computed here in exact fractions); the certified crossing window and the
              arc-ratio exposure gap W > 25.05236 vs W < 25.04818 (certificates, NUM).
     ceiling  the perturbative UV ceilings of 5.4: 3.9Q, 14Q, 20Q (index-one SU(5)), 30Q (Spin(10)) with their
              certified criteria (NUM); "an expiry date, not a pole" is rem-ou-ch05-uv-verdict (argued).

   On load, FILM.init checks DATA.lean against the two cited theorems and re-derives every computed number on screen
   by a second route (rational arithmetic against floating point, direct mode sums for the three-copy ratio, a grid
   search for the Schur minimum). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                         exact rational arithmetic                         */
/* ======================================================================= */
const KT_LEAN = {
  complete: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete',
  min: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min'
};
const ktGcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
function fr(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = ktGcd(n, d); return [n / g, d / g]; }
const fAdd = (p, q) => fr(p[0] * q[1] + q[0] * p[1], p[1] * q[1]);
const fMul = (p, q) => fr(p[0] * q[0], p[1] * q[1]);
const fEq = (p, q) => p[0] * q[1] === q[0] * p[1];
const fStr = p => (p[1] === 1 ? String(p[0]) : `${p[0]}/${p[1]}`);
const fNum = p => p[0] / p[1];
const vAdd = (u, v) => u.map((x, i) => fAdd(x, v[i]));
const vScale = (k, v) => v.map(x => fMul(k, x));
const vStr = v => `(${v.map(fStr).join(', ')})`;
/* trace-index triples (√(3/5) Y, SU(2)_L, SU(3)_C) of def-ou-ch05-kinetic-trace */
const KT = {
  L: [fr(2, 5), fr(2), fr(1)],
  R: [fr(8, 5), fr(0), fr(1)],
  H: [fr(3, 10), fr(1, 2), fr(0)],
  C: [fr(1, 5), fr(0), fr(1, 2)]
};
KT.LR = vAdd(KT.L, KT.R);
KT.HC = vAdd(KT.H, KT.C);
KT.trace = vAdd(vScale(fr(1 + 2), KT.L), vScale(fr(3), KT.R));                              /* (1 + 2)L + 3R */
KT.run = vAdd(vScale(fAdd(fr(1, 3), fr(4, 3)), KT.L), vScale(fMul(fr(3), fr(1, 3)), KT.R)); /* (1/3 + 4/3)L + 3·(1/3)R */
KT.runSplit = vAdd([fr(2), fr(2), fr(2)], vScale(fr(2, 3), KT.L));                           /* (2, 2, 2) + (2/3)L */
/* the Schur instance on screen: a = 7, b = 3, c = 2, x = 1 */
const SCH = { a: fr(7), b: fr(3), c: fr(2), x: fr(1) };
SCH.form = y => fAdd(fAdd(fMul(SCH.a, fMul(SCH.x, SCH.x)), fMul(fr(2), fMul(SCH.b, fMul(SCH.x, y)))), fMul(SCH.c, fMul(y, y)));
SCH.value = fMul(fAdd(SCH.a, fMul(fr(-1), fMul(SCH.b, fMul(SCH.b, fr(SCH.c[1], SCH.c[0]))))), fMul(SCH.x, SCH.x));
SCH.ystar = fMul(fr(-1), fMul(fMul(SCH.b, fr(SCH.c[1], SCH.c[0])), SCH.x));
SCH.square = y => { const t = fAdd(y, fMul(fMul(SCH.b, fr(SCH.c[1], SCH.c[0])), SCH.x)); return fMul(SCH.c, fMul(t, t)); };
/* chapter certificates copied verbatim (5.2 item 3 table; 5.3; 5.4) */
const GAPS = [
  { u: '8', v: 1.06192, s: '> 1.06192' }, { u: '16', v: 0.07451, s: '> 0.07451' }, { u: '20', v: 0.17988, s: '> 0.17988' },
  { u: '24', v: 0.24341, s: '> 0.24341' }, { u: '36', v: 1.16146, s: '> 1.16146' }, { u: 'a² ≈ 72.85', v: 4.00510, s: '> 4.005' }
];
const ARC_A = 8.535113359;
const CEIL = [
  { k: 3.9, big: '3.9Q', en: 'pure scalar · 纯标量', l1: [['α', 0], ['2', 0, 'sub'], ['⁻¹(3.9Q) < 0.20441 < 1', 0]], l2: [['W', 0], ['L', 0, 'sub'], ['(Q, 3.9Q) > 319.7356', 0]] },
  { k: 14, big: '14Q', en: 'spin balanced · 自旋配平', l1: [['bound on α', 0], ['2', 0, 'sub'], ['⁻¹(14Q)', 0]], l2: [['< −0.17152', 0]] },
  { k: 20, big: '20Q', en: 'SU(5) · index one · 指标一', l1: [['needs  I·C', 0], ['A', 0, 'sub'], [' > 5.49734', 0]], l2: [['but  C', 0], ['A', 0, 'sub'], [' = 5', 0]] },
  { k: 30, big: '30Q', en: 'Spin(10) · index one · 指标一', l1: [['needs  I·C', 0], ['A', 0, 'sub'], [' > 8.69866', 0]], l2: [['but  C', 0], ['A', 0, 'sub'], [' = 8', 0]] }
];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('kinetic-trace-ceiling film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (x, y, tol = 1e-12) => Math.abs(x - y) <= tol * Math.max(1, Math.abs(y));
  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const gid of Object.values(KT_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. the trace triples, by floating point against the exact fractions */
  const fl = { L: [0.4, 2, 1], R: [1.6, 0, 1], H: [0.3, 0.5, 0], C: [0.2, 0, 0.5] };
  for (const k of ['L', 'R', 'H', 'C']) check(KT[k].every((x, i) => near(fNum(x), fl[k][i])), `triple ${k}`);
  check(vStr(KT.LR) === '(2, 2, 2)', 'L + R = (2, 2, 2)');
  check(vStr(KT.HC) === '(1/2, 1/2, 1/2)', 'H + C = (1/2, 1/2, 1/2)');
  check(fl.L.every((x, i) => near(x + fl.R[i], 2)), 'L + R by floats');
  /* 2. spin balance: 3(L + R) = (6, 6, 6); (5/3)L + R = (2, 2, 2) + (2/3)L = (34/15, 10/3, 8/3) */
  check(vStr(KT.trace) === '(6, 6, 6)' && vStr(vScale(fr(3), KT.LR)) === '(6, 6, 6)', 'trace (6, 6, 6)');
  check(KT.run.every((x, i) => fEq(x, KT.runSplit[i])), 'running split');
  check(vStr(KT.run) === '(34/15, 10/3, 8/3)', 'running (34/15, 10/3, 8/3)');
  check(fl.L.every((x, i) => near(5 / 3 * x + fl.R[i], 2 + 2 / 3 * x)), 'running by floats');
  /* 3. the three-copy shift: for a sample left spectrum, a direct mode sum gives S_R / S_L = 3^{1−u} */
  const ys = [0.2, 0.31, 0.9, 1.7, 2.4];
  for (const u of [0.5, 1, 2, 3.7, 8]) {
    const SL = ys.reduce((s, y) => s + Math.exp(-u * y), 0);
    const SR = ys.reduce((s, y) => s + 3 * Math.exp(-u * (y + Math.log(3))), 0);
    check(near(SR / SL, Math.pow(3, 1 - u), 1e-9), `three-copy ratio at u = ${u}`);
  }
  let p7 = 1; for (let i = 0; i < 7; i++) p7 *= 3;
  check(p7 === 2187 && near(Math.pow(3, 1 - 8), 1 / 2187) && (1 / 2187).toExponential(2) === '4.57e-4', '3^-7 = 1/2187');
  /* 4. the Schur instance: completion identity at many rational y, minimum by grid search */
  check(fStr(SCH.value) === '5/2' && fStr(SCH.ystar) === '-3/2', 'Schur value 5/2 at y* = −3/2');
  for (let n = -40; n <= 40; n++) { const y = fr(n, 7); check(fEq(SCH.form(y), fAdd(SCH.value, SCH.square(y))), `completion at ${n}/7`); }
  let best = Infinity, by = 0;
  for (let i = 0; i <= 50000; i++) { const y = -4 + 5 * i / 50000, f = 7 + 6 * y + 2 * y * y; if (f < best) { best = f; by = y; } }
  check(Math.abs(best - 2.5) < 1e-6 && Math.abs(by + 1.5) < 1e-3, 'grid minimum');
  check(fStr(SCH.form(fr(-4))) === '15' && fStr(SCH.form(fr(1))) === '15', 'plot ends at 15');
  check(fStr(SCH.square(fr(1))) === '25/2' && fEq(fAdd(SCH.value, fr(25, 2)), fr(15)), 'Schur square at y = 1 is 25/2');
  /* 5. copied certificates: internal consistency of what is said aloud */
  check(GAPS.every(g => g.v > 0) && GAPS[0].v > 1 && GAPS[5].v > 4, 'gaps above one and four');
  check(Math.abs(ARC_A * ARC_A - 72.85) < 0.005, 'a² ≈ 72.85');
  check(Math.abs((25.05236 - 25.04818) - 0.00418) < 1e-9, 'exposure gap 0.00418');
  check(0.20441 < 1 && 5.49734 > 5 && 8.69866 > 8 && -0.17152 < 0, 'ceiling criteria');
});
Object.assign(FILM.speed, { hook: 0.02, laplace: 0.016, schur: 0.014, scales: 0.016, spin: 0.016, ceiling: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ktFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function ktRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  /* a part is [text, colour] or [text, colour, 'sup' | 'sub'] */
  const sz = p => (p[2] ? Math.round(size * 0.62) : size);
  const dy = p => (p[2] === 'sup' ? -size * 0.42 : p[2] === 'sub' ? size * 0.2 : 0);
  const total = parts.reduce((s, p) => s + tw(p[0], sz(p), fam, w), 0);
  if (o.align === 'center') cx = x - total / 2;
  if (o.align === 'right') cx = x - total;
  for (const p of parts) { txt(p[0], cx, y + dy(p), { size: sz(p), fam, w, c: p[1], a, ab: p[2] ? 0 : o.ab }); cx += tw(p[0], sz(p), fam, w); }
  return cx;
}
const KT_MISSING = new Set();
function ktLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!KT_MISSING.has(gid)) { KT_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-1)[0], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small tier tag written next to a claim */
function ktTag(x, y, s, col, a, size = 18) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.mono, 700, 1) + 18;
  box(x, y - size - 4, w, size + 14, col, a, 1.5, 'rgba(0,0,0,0.45)');
  txt(s, x + 9, y + 2, { size, fam: F.mono, w: 700, c: col, a, ls: 1 });
  return w;
}
function ktTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('KINETIC TRACES AND THE UV CEILING', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('HEAT TRACE · LAPLACE · SCHUR · SPIN BALANCE · CEILING', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* three trace bars (Y, W, C) of one block; stacked: [lower triple, upper triple] */
const KT_AX = ['Y', 'W', 'C'];
function ktBars(cx, y0, parts, a, o = {}) {
  if (a <= 0.003) return;
  const sc = o.sc || 115, bw = o.bw || 54, gap = o.gap || 22, grow = o.grow == null ? 1 : o.grow;
  const x0 = cx - (3 * bw + 2 * gap) / 2;
  for (let i = 0; i < 3; i++) {
    const x = x0 + i * (bw + gap);
    let yb = y0;
    for (const [v, col] of parts) {
      const h = fNum(v[i]) * sc * grow;
      if (h > 0.5) { fillBox(x, yb - h, bw, h, col, a * 0.5); box(x, yb - h, bw, h, col, a, 2); }
      yb -= h;
    }
    const tot = parts.reduce((s, [v]) => fAdd(s, v[i]), fr(0));
    txt(fStr(tot), x + bw / 2, yb - 12, { size: o.fs || 26, fam: F.mono, w: 700, align: 'center', c: o.topc || C.white, a: a * clamp(grow * 2 - 1) });
    txt(KT_AX[i], x + bw / 2, y0 + 32, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  line(x0 - 14, y0, x0 + 3 * bw + 2 * gap + 14, y0, C.dim, a * 0.8, 2);
}

/* ======================================================================= */
/*                             scene 1 · KINETIC LEDGER                      */
/* ======================================================================= */
SCENES.hook = S => {
  ktTitle(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  /* line 0: the hypothesis */
  panel(120, 180, 1600, 150, a, C.argued, 'HYPOTHESIS · 强假设 (MODEL)');
  ktRich([['gauge kinetic term  ∝  ', C.white], ['Σ', C.cyan], ['  e', C.cyan], ['−u y', C.cyan, 'sup'], ['  ·  Tr t²', C.white]], 200, 272, { size: 36, a });
  txt('positive heat trace over matter · 物质上的正热核迹', 1690, 272, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.argued, a });
  txt('y = m² / Q²', 200, 312, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
  /* line 1–2: the blocks */
  const y0 = 720;
  const la = a * at(S, 1, 0.6);
  if (la > 0.003) {
    txt('Y · 超荷   W · 弱   C · 色', 160, 380, { size: 24, fam: F.zh, w: 700, c: C.dim, a: la });
  }
  const gL = ease(Q(S, 2, 'A left doublet', 1.0)), gR = ease(Q(S, 2, 'Its right partner', 1.0));
  const aL = a * at(S, 1, 0.6), aR = a * at(S, 1, 0.6, 0.4);
  ktBars(360, y0, [[KT.L, C.cyan]], aL, { grow: gL, topc: C.cyan });
  txt('L  left doublets · 左双重态', 360, 810, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: aL });
  ktBars(780, y0, [[KT.R, C.mag]], aR, { grow: gR, topc: C.mag });
  txt('R  right partner · 互补右部门', 780, 810, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: aR });
  /* line 3: L + R */
  const sa = a * at(S, 3, 0.6);
  if (sa > 0.003) {
    txt('+', 570, 560, { size: 60, fam: F.math, w: 700, align: 'center', c: C.dim, a: sa });
    txt('=', 990, 560, { size: 60, fam: F.math, w: 700, align: 'center', c: C.dim, a: sa });
    ktBars(1210, y0, [[KT.L, C.cyan], [KT.R, C.mag]], sa, { grow: ease(at(S, 3, 1.2)), topc: C.now, fs: 30 });
    txt('L + R = (2, 2, 2) · 完整等迹家族', 1210, 810, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: sa });
    txt('H + C = (1/2, 1/2, 1/2)', 1210, 420, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sa });
  }
  const ba = a * Q(S, 3, 'So equal traces', 0.6);
  if (ba > 0.003) {
    panel(1420, 470, 300, 170, ba, C.white, 'BALANCE · 配平');
    ktRich([['W', C.cyan], ['L', C.cyan, 'sub'], [' = ', C.white], ['W', C.mag], ['R', C.mag, 'sub']], 1570, 550, { size: 44, align: 'center', a: ba });
    ktRich([['W', C.white], ['H', C.white, 'sub'], [' = ', C.white], ['W', C.white], ['C', C.white, 'sub']], 1570, 610, { size: 34, align: 'center', a: ba * 0.85 });
  }
};

/* ======================================================================= */
/*                               scene 2 · LAPLACE LOCK                      */
/* ======================================================================= */
const RP = { x0: 1080, y0: 760, w: 660, h: 380, uMax: 8, rMax: 3 };
const rpX = u => RP.x0 + u / RP.uMax * RP.w;
const rpY = r => RP.y0 - r / RP.rMax * RP.h;
SCENES.laplace = S => {
  const a = ktFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Laplace uniqueness', 'argued'], [3, null, 'computed']]);
  /* left: the heat trace and two stick spectra */
  panel(120, 180, 820, 620, a, C.cyan, 'HEAT TRACE · 热迹');
  ktRich([['S', C.white], ['X', C.white, 'sub'], ['(u) = Σ', C.white], ['i', C.dim, 'sub'], ['  e', C.cyan], ['−u yᵢ', C.cyan, 'sup']], 160, 270, { size: 40, a });
  txt('u > 0 : inverse cutoff squared  ·  逆截止平方', 160, 316, { size: 22, fam: F.zh, w: 700, c: C.dim, a });
  const YS = [0.35, 0.62, 1.05, 1.5, 2.2, 2.9], YR = [0.5, 0.9, 1.25, 2.0, 2.6, 3.3];
  const slide = ease(Q(S, 1, 'forces identical spectra', 1.2));
  const sx = y => 200 + y / 3.6 * 680;
  const sa = a * at(S, 0, 0.6, 0.8);
  for (let row = 0; row < 2; row++) {
    const yb = row ? 600 : 470, col = row ? C.mag : C.cyan;
    if (sa <= 0.003) break;
    line(180, yb, 900, yb, C.dim, sa * 0.7, 2);
    txt(row ? 'R' : 'L', 150, yb + 8, { size: 28, fam: F.mono, w: 700, c: col, a: sa });
    YS.forEach((y, i) => {
      const yy = row ? lerp(YR[i], y, slide) : y, h = 90 * Math.exp(-yy * 0.7);
      line(sx(yy), yb, sx(yy), yb - h, col, sa, 4);
      dot(sx(yy), yb - h, 7, row ? 'm' : 'c', sa);
    });
  }
  if (sa > 0.003) {
    txt('mass ratio y  →', 900, 640, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: sa });
    txt('schematic · 示意', 900, 420, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.argued, a: sa });
  }
  const ia = a * Q(S, 1, 'forces identical spectra', 0.6);
  if (ia > 0.003) ktRich([['S', C.now], ['L', C.now, 'sub'], [' = S', C.now], ['R', C.now, 'sub'], [' on an interval ⟹ same spectrum · 同谱', C.now]], 160, 380, { size: 26, fam: F.zh, a: ia });
  const za = a * at(S, 2, 0.6);
  if (za > 0.003) {
    txt('each threshold: L + R = (2, 2, 2)', 160, 700, { size: 26, fam: F.mono, w: 700, c: C.white, a: za });
    ktRich([['⟹  Δ(α', C.white], ['i', C.white, 'sub'], ['⁻¹ − α', C.white], ['j', C.white, 'sub'], ['⁻¹) runs by 0', C.now]], 160, 752, { size: 30, a: za * Q(S, 2, 'never run', 0.5) });
  }
  /* right: the three-copy shift and the ratio curve */
  const ra = a * at(S, 3, 0.6);
  if (ra <= 0.003) return;
  panel(1000, 180, 800, 620, ra, C.mag, 'ONE SCALE ONLY · 只配一个尺度');
  ktRich([['y', C.white], ['  ↦  ', C.dim], ['y + log 3', C.mag], ['   ×3 copies · 三份', C.white]], 1040, 260, { size: 30, a: ra, fam: F.zh });
  ktRich([['S', C.mag], ['R', C.mag, 'sub'], ['(u) = ', C.white], ['3', C.now], ['1−u', C.now, 'sup'], ['  S', C.cyan], ['L', C.cyan, 'sub'], ['(u)', C.white]], 1040, 312, { size: 34, a: ra * at(S, 3, 0.6, 1.0) });
  const pa = ra * at(S, 4, 0.5);
  if (pa <= 0.003) return;
  arrow(RP.x0, RP.y0, RP.x0 + RP.w + 30, RP.y0, C.dim, pa, 2);
  arrow(RP.x0, RP.y0, RP.x0, RP.y0 - RP.h - 20, C.dim, pa, 2);
  for (let u = 0; u <= 8; u++) txt(String(u), rpX(u), RP.y0 + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
  for (let r = 1; r <= 3; r++) txt(String(r), RP.x0 - 14, rpY(r) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: pa });
  txt('u', RP.x0 + RP.w + 40, RP.y0 + 8, { size: 24, fam: F.math, w: 700, c: C.white, a: pa });
  ktRich([['S', C.mag], ['R', C.mag, 'sub'], [' / ', C.white], ['S', C.cyan], ['L', C.cyan, 'sub']], RP.x0 + 14, rpY(3) - 4, { size: 26, a: pa });
  dashed(RP.x0, rpY(1), RP.x0 + RP.w, rpY(1), C.cyan, pa * 0.5, 1.5);
  const tEnd = 8 * ease(at(S, 4, 4.5));
  curve(t => { const u = tEnd * t; return [rpX(u), rpY(Math.pow(3, 1 - u))]; }, 120, C.mag, pa, 3);
  const marks = [[1, 'u = 1:  1', 'u equals one'], [2, 'u = 2:  1/3', 'At u equals two'], [8, 'u = 8:  1/2187 ≈ 4.57×10⁻⁴', 'At u equals eight']];
  marks.forEach(([u, s, ph], i) => {
    const ma = pa * Q(S, 4, ph, 0.5);
    if (ma <= 0.003) return;
    const now = i === 2 ? true : Q(S, 4, marks[i + 1][2], 0.01) < 1;
    dot(rpX(u), rpY(Math.pow(3, 1 - u)), now ? 13 : 10, now ? 'g' : 'm', ma);
    if (i < 2) { txt(s, rpX(u) + 22, rpY(Math.pow(3, 1 - u)) - 16, { size: 24, fam: F.mono, w: 700, c: now ? C.now : C.white, a: ma }); return; }
    line(rpX(8), rpY(0) - 14, rpX(8), rpY(1.22), C.now, ma * 0.6, 1.5);
    txt('u = 8:', rpX(8), rpY(1.78), { size: 26, fam: F.mono, w: 700, align: 'right', c: C.now, a: ma });
    txt('1/2187 ≈ 4.57×10⁻⁴', rpX(8), rpY(1.36), { size: 30, fam: F.mono, w: 700, align: 'right', c: C.now, a: ma });
  });
};

/* ======================================================================= */
/*                                scene 3 · SCHUR LOCK                       */
/* ======================================================================= */
const PB = { x0: 170, y0: 790, w: 720, h: 330, yMin: -4, yMax: 1, fMax: 16 };
const pbX = y => PB.x0 + (y - PB.yMin) / (PB.yMax - PB.yMin) * PB.w;
const pbY = f => PB.y0 - f / PB.fMax * PB.h;
SCENES.schur = S => {
  const a = ktFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [3, null, 'argued'], [4, null, 'computed']]);
  /* top: the two Lean statements */
  const la = a * at(S, 0, 0.6);
  panel(120, 180, 1680, 230, la, C.lean, 'RATIONAL SCHUR COMPLETION · 有理舒尔配方  (FiniteRatio)');
  const c1 = la * at(S, 1, 0.6), c2 = la * at(S, 2, 0.6);
  ktRich([['c ≠ 0:   ', C.dim], ['a x² + 2b x y + c y²', C.white], ['  ≡  ', C.dim], ['(a − b²/c) x²', C.cyan], ['  +  ', C.white], ['c (y + (b/c) x)²', C.mag]], 160, 262, { size: 32, a: c1 });
  ktRich([['0 < c:   ', C.dim], ['(a − b²/c) x²', C.cyan], ['  ≤  form  for every y,   = at  ', C.white], ['y* = −(b/c) x', C.now]], 160, 316, { size: 32, a: c2 });
  ktLean(160, 378, KT_LEAN.complete, la * Q(S, 0, 'Lean checks', 0.5));
  ktLean(860, 378, KT_LEAN.min, la * Q(S, 0, 'Lean checks', 0.5));
  stamp('SCHUR', 1640, 290, Q(S, 0, 'Lean checks', 0.5, 0.6) * (1 - at(S, 1, 0.5, 2)), C.lean, 34, -0.06);
  /* bottom left: the worked instance a = 7, b = 3, c = 2, x = 1 */
  const pa = a * at(S, 0, 0.6, 1.6) * (1 - at(S, 3, 0.6, 2.0) * 0.6);
  if (pa > 0.003) {
    txt('a = 7, b = 3, c = 2, x = 1 :   7 + 6y + 2y²', 160, 460, { size: 26, fam: F.mono, w: 700, c: C.white, a: pa });
    arrow(PB.x0, PB.y0, PB.x0 + PB.w + 20, PB.y0, C.dim, pa, 2);
    arrow(pbX(0), PB.y0, pbX(0), PB.y0 - PB.h + 20, C.dim, pa, 2);
    for (let y = -4; y <= 1; y++) txt(String(y), pbX(y), PB.y0 + 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
    txt('y', PB.x0 + PB.w + 28, PB.y0 + 8, { size: 24, fam: F.math, w: 700, c: C.white, a: pa });
    const gr = ease(at(S, 0, 2.2, 1.6));
    curve(t => { const y = PB.yMin + (PB.yMax - PB.yMin) * gr * t; return [pbX(y), pbY(7 + 6 * y + 2 * y * y)]; }, 100, C.white, pa, 3);
    const fa = pa * at(S, 1, 0.6);
    if (fa > 0.003) {
      dashed(PB.x0, pbY(2.5), PB.x0 + PB.w, pbY(2.5), C.cyan, fa, 2.5);
      txt('Schur value 5/2 · 舒尔值', pbX(-4) + 6, pbY(2.5) + 32, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: fa });
      /* the Schur square at the sample y = 1: the gap above the floor is c (y + 3/2)² = 2 · (5/2)² = 25/2 */
      const ys = 1, fy = 7 + 6 * ys + 2 * ys * ys;
      line(pbX(ys), pbY(2.5), pbX(ys), pbY(fy), C.mag, fa, 4);
      txt('2 (y + 3/2)²', pbX(ys) + 14, (pbY(2.5) + pbY(fy)) / 2 - 6, { size: 22, fam: F.mono, w: 700, c: C.mag, a: fa });
      txt('= 25/2', pbX(ys) + 14, (pbY(2.5) + pbY(fy)) / 2 + 26, { size: 22, fam: F.mono, w: 700, c: C.mag, a: fa });
    }
    const ma = pa * Q(S, 2, 'reached at', 0.5);
    if (ma > 0.003) {
      dot(pbX(-1.5), pbY(2.5), 14, 'g', ma);
      txt('y* = −3/2', pbX(-1.5), pbY(2.5) + 44, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: ma });
    }
    txt('NUM · exact fractions on screen · 屏幕上的精确分数', 160, 856, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: pa * at(S, 1, 0.6) });
  }
  /* bottom right: the Stieltjes floor and the overshoot */
  const sa = a * at(S, 3, 0.6);
  if (sa <= 0.003) return;
  panel(1060, 440, 740, 380, sa, C.argued, 'THIRD MOMENT · 三阶热矩 (hand derivation · 手工推导)');
  ktRich([['0 ≤ ∫', C.white], ['y≥1', C.dim, 'sub'], [' (y − 1)(y − t)² e', C.white], ['−y', C.white, 'sup'], [' dn', C.white]], 1090, 520, { size: 30, a: sa });
  txt('a = C − B,  b = −(B − M),  c = M − W > 0', 1090, 566, { size: 22, fam: F.mono, w: 700, c: C.dim, a: sa });
  ktRich([['⟹  ', C.white], ['C  ≥  B + (B − M)² / (M − W)', C.argued]], 1090, 622, { size: 32, a: sa * at(S, 3, 0.6, 1.2) });
  const ga = a * at(S, 4, 0.6);
  if (ga > 0.003) {
    /* two levels: the target and the floor above it */
    const bx = 1100, by = 770, sc = 18;
    line(bx - 10, by, bx + 660, by, C.dim, ga, 1.5);
    fillBox(bx, by - 40, 180, 40, C.white, ga * 0.25); box(bx, by - 40, 180, 40, C.white, ga, 2);
    txt('target C · 目标', bx + 90, by - 12, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: ga });
    const hh = 40 + 4.89948 * sc * ease(at(S, 4, 1.4));
    fillBox(bx + 230, by - hh, 180, hh, C.mag, ga * 0.35); box(bx + 230, by - hh, 180, hh, C.mag, ga, 2);
    txt('floor · 下界', bx + 320, by - 12, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ga });
    dashed(bx + 180, by - 40, bx + 470, by - 40, C.white, ga * 0.6, 1.5);
    arrow(bx + 450, by - 40, bx + 450, by - 40 - 4.89948 * sc + 4, C.now, ga * Q(S, 4, 'overshoots', 0.5), 3);
    txt('> 4.89948', bx + 468, by - 70, { size: 36, fam: F.orb, w: 900, c: C.now, a: ga * Q(S, 4, 'overshoots', 0.5) });
    txt('rank 20 window · 秩 20 窗口  (certificate · 证书)', bx, by + 32, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ga });
  }
};

/* ======================================================================= */
/*                                scene 4 · TWO SCALES                       */
/* ======================================================================= */
const LX = { x0: 220, w: 1480 };
const lxR = r => LX.x0 + Math.log10(r) / 3 * LX.w;
SCENES.scales = S => {
  const a = ktFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* top: the scale-ratio axis */
  const ya = 360;
  arrow(LX.x0 - 20, ya, LX.x0 + LX.w + 40, ya, C.dim, a, 2);
  for (const [r, s] of [[1, '1'], [10, '10'], [100, '100'], [1000, '1000']]) {
    line(lxR(r), ya - 8, lxR(r), ya + 8, C.dim, a, 2);
    txt(s, lxR(r), ya + 36, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  txt('r = Q / M', LX.x0 + LX.w + 60, ya - 30, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a });
  txt('pure scalar towers · 纯标量塔', LX.x0, 210, { size: 24, fam: F.zh, w: 700, c: C.white, a });
  const ea = a * at(S, 0, 0.6), eg = ease(at(S, 0, 1.6));
  if (ea > 0.003) {
    const xb = lerp(lxR(1), lxR(189), eg);
    fillBox(lxR(1), ya - 50, xb - lxR(1), 50, C.mag, ea * 0.3);
    line(xb, ya - 60, xb, ya + 10, C.mag, ea, 3);
    txt('r ≤ 189  excluded · 严格排除', (lxR(1) + lxR(189)) / 2, ya - 70, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ea * clamp(eg * 2 - 1) });
  }
  const ca = a * Q(S, 1, 'a two loop crossing exists', 0.5);
  if (ca > 0.003) {
    dot(lxR(400), ya, 16, 'c', ca);
    txt('r = 400', lxR(400), ya - 34, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ca });
    txt('two-loop crossing · 两圈交点', lxR(400) - 30, ya + 76, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ca });
    ktRich([['Q ≈ 5×10¹⁴ GeV,   α', C.white], ['G', C.white, 'sub'], ['⁻¹ ≈ 33.2', C.white]], lxR(400) - 30, ya + 110, { size: 26, align: 'right', a: ca * Q(S, 1, 'near five', 0.5) });
  }
  /* bottom: the two-scale gaps */
  const ga = a * at(S, 2, 0.6);
  if (ga <= 0.003) return;
  panel(120, 500, 1680, 340, ga, C.cyan, 'MATCH THE TRACE AT THE CROSSING ONLY · ANY RIGHT SPECTRUM · 只配交点热迹，右谱任取');
  ktRich([['certified gap at a second cutoff · 第二截止处的严格热迹差   S', C.white], ['L', C.cyan, 'sub'], ['(u) − S', C.white], ['R', C.mag, 'sub'], ['(u)', C.white]], 160, 572, { size: 24, fam: F.zh, a: ga });
  const by = 800, sc = 42, bw = 150, gap = 110, bx0 = 270;
  line(bx0 - 40, by, bx0 + 6 * bw + 5 * gap + 40, by, C.dim, ga, 2);
  GAPS.forEach((g, i) => {
    const ph = i === 0 ? 'above one' : i === 5 ? 'above four' : 'at each second cutoff';
    const ba = ga * Q(S, 3, ph, 0.5, i > 0 && i < 5 ? 0.25 * i : 0);
    if (ba <= 0.003) return;
    const x = bx0 + i * (bw + gap), h = g.v * sc * ease(clamp(ba * 1.2));
    const now = (i === 0 && Q(S, 3, 'above four', 0.01) < 1) || (i === 5);
    const col = now && Q(S, 3, ph, 0.01) > 0 ? C.now : C.cyan;
    fillBox(x, by - h, bw, h, col, ba * 0.45); box(x, by - h, bw, h, col, ba, 2);
    txt(g.s, x + bw / 2, by - h - 12, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: ba });
    txt(`u = ${g.u}`, x + bw / 2, by + 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ba });
  });
};

/* ======================================================================= */
/*                               scene 5 · SPIN BALANCE                      */
/* ======================================================================= */
SCENES.spin = S => {
  const a = ktFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* line 0–1: the layer */
  const la = a * at(S, 0, 0.6);
  panel(120, 180, 1680, 110, la, C.argued, 'ONE ARC LAYER · 每个质量层 (model construction · 模型构造)');
  const l1 = la * Q(S, 0, 'each layer holds', 0.6);
  ktRich([['L', C.cyan], ['scalar', C.cyan, 'sub'], ['   +   ', C.white], ['L', C.cyan], ['Dirac', C.cyan, 'sub'], ['   +   ', C.white], ['3 R', C.mag], ['scalar', C.mag, 'sub']], W / 2, 262, { size: 38, align: 'center', a: l1 });
  /* line 1: the trace ledger */
  const ta = a * at(S, 1, 0.6);
  const top = 320, h = 250;
  if (ta > 0.003) {
    panel(120, top, 820, h, ta, C.cyan, 'TRACE LEDGER · 动能迹账本   weights 1 · 2 · 3');
    ktRich([['(1 + 2) L + 3 R  =  3 (L + R)', C.white]], 160, top + 92, { size: 32, a: ta });
    ktRich([['=  ', C.white], [vStr(KT.trace), C.now]], 160, top + 160, { size: 46, a: ta * Q(S, 1, 'six, six, six', 0.5) });
    txt('equal at every u, every derivative · 任意尺度、任意阶都相等', 160, top + 214, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ta * Q(S, 1, 'at every scale', 0.5) });
  }
  /* line 2: the running ledger */
  const ra = a * at(S, 2, 0.6);
  if (ra > 0.003) {
    panel(980, top, 820, h, ra, C.mag, 'ONE-LOOP LEDGER · 一圈跑动账本   weights 1/3 · 4/3 · 1/3');
    ktRich([['(1/3 + 4/3) L + R  =  ', C.white], [vStr(KT.run), C.white]], 1020, top + 92, { size: 30, a: ra });
    ktRich([['=  (2, 2, 2)  +  ', C.white], ['(2/3) L', C.now]], 1020, top + 160, { size: 44, a: ra * Q(S, 2, 'two thirds of L survive', 0.5) });
    txt('a difference survives · 差分项复活', 1020, top + 214, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ra * Q(S, 2, 'two thirds of L survive', 0.5) });
  }
  /* line 3: the certified crossing */
  const ca = a * at(S, 3, 0.6);
  if (ca > 0.003) {
    panel(120, 600, 820, 230, ca, C.cyan, 'CERTIFIED TWO-LOOP CROSSING · 两圈交点证书');
    txt('Q ∈ (5.268, 5.390) × 10¹⁴ GeV', 160, 676, { size: 30, fam: F.mono, w: 700, c: C.white, a: ca });
    ktRich([['α', C.white], ['G', C.white, 'sub'], ['⁻¹ ∈ (29.99894, 30.07107)', C.white]], 160, 728, { size: 30, a: ca });
    txt('r ∈ (8.37369, 8.53494)', 160, 780, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: ca });
  }
  /* line 3: the arc ratio and the exposure gap */
  const ga = a * Q(S, 3, 'just apart', 0.6);
  if (ga > 0.003) {
    panel(980, 600, 820, 230, ga, C.now, 'ARC RATIO a = θ₈₀₄ / θ₁₂ = 8.535113359…');
    txt('band 0.999a ≤ r ≤ 1.001a · 千分之一带', 1020, 668, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ga });
    /* exposure axis from 25.040 to 25.060 */
    const wx = v => 1040 + (v - 25.040) / 0.020 * 700, wy = 750;
    line(wx(25.040), wy, wx(25.060), wy, C.dim, ga, 2);
    const g2 = ga * Q(S, 3, 'Behrend arc ratio', 0.5);
    fillBox(wx(25.040), wy - 26, wx(25.04818) - wx(25.040), 26, C.cyan, ga * 0.4);
    fillBox(wx(25.05236), wy - 26, wx(25.060) - wx(25.05236), 26, C.mag, ga * 0.4);
    txt('crossings: W < 25.04818', wx(25.040), wy + 34, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: ga });
    txt('geometry: W > 25.05236', wx(25.060), wy + 34, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.mag, a: ga });
    if (g2 > 0.003) {
      box(wx(25.04818), wy - 34, wx(25.05236) - wx(25.04818), 42, C.now, g2, 2.5);
      txt('gap ≥ 0.00418', (wx(25.04818) + wx(25.05236)) / 2, wy - 46, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.now, a: g2 });
    }
  }
};

/* ======================================================================= */
/*                                scene 6 · UV CEILING                       */
/* ======================================================================= */
const CX = { x0: 240, w: 1440 };
const cxP = k => CX.x0 + Math.log(k) / Math.log(40) * CX.w;
SCENES.ceiling = S => {
  const a = ktFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  const ya = 430;
  arrow(CX.x0 - 20, ya, CX.x0 + CX.w + 40, ya, C.dim, a, 2);
  for (const k of [1, 2, 5, 10, 20, 40]) {
    line(cxP(k), ya - 6, cxP(k), ya + 6, C.dim, a, 2);
    txt(k === 1 ? 'Q' : `${k}Q`, cxP(k), ya + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  txt('energy P · 能标', CX.x0 + CX.w + 20, ya - 22, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.white, a });
  /* the climb: a cursor sweeping upward */
  const sweep = 1 + 39 * ease(at(S, 0, 3.0));
  const sa = a * at(S, 0, 0.4) * (1 - at(S, 1, 0.5));
  if (sa > 0.003) {
    fillBox(cxP(1), ya - 14, cxP(sweep) - cxP(1), 14, C.cyan, sa * 0.35);
    txt('perturbative? · 微扰还成立？', cxP(sweep), ya - 34, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: sa });
  }
  txt('crossing Q · 交点', cxP(1), 220, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * 0.9 });
  line(cxP(1), 236, cxP(1), ya, C.cyan, a * 0.6, 2);
  /* four ceilings, each with its card */
  const ph = ['three point nine Q', 'by fourteen Q', 'fails by twenty Q', 'Spin ten by thirty Q'];
  const lines = [1, 1, 2, 2];
  const cw = 395, cg = 33, cy = 560, ch = 230;
  CEIL.forEach((c, i) => {
    const ca = a * Q(S, lines[i], ph[i], 0.5), ra = ca * (1 - 0.8 * at(S, 3, 0.5));
    if (ca <= 0.003) return;
    const later = i < 3 ? Q(S, lines[i + 1], ph[i + 1], 0.01) : (at(S, 3, 0.01));
    const col = later > 0 ? C.cyan : C.now;
    const x = cxP(c.k);
    line(x, 250 + (i % 2) * 50, x, ya + 4, col, ra, 3.5);
    txt(c.big, x, 240 + (i % 2) * 50, { size: 40, fam: F.orb, w: 900, align: 'center', c: col, a: ra });
    const px = 120 + i * (cw + cg);
    line(x, ya + 44, px + cw / 2, cy, col, ca * 0.5, 1.5);
    panel(px, cy, cw, ch, ca, col, c.en);
    txt(c.big, px + 22, cy + 94, { size: 48, fam: F.orb, w: 900, c: col, a: ca });
    ktRich(c.l1.map(p => [p[0], C.white, p[2]]), px + 22, cy + 150, { size: 24, a: ca });
    ktRich(c.l2.map(p => [p[0], C.white, p[2]]), px + 22, cy + 194, { size: 24, a: ca });
  });
  const va = a * at(S, 3, 0.6);
  if (va > 0.003) {
    panel(560, 196, 800, 140, va, C.argued, 'VERDICT · 结论', { fill: 'rgba(4,10,24,0.94)' });
    txt('an expiry date, not a physical pole', 960, 262, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a: va });
    txt('有效理论的保质期，而不是物理极点', 960, 310, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.argued, a: va });
  }
};

/* ======================================================================= */
/*                                 scene 7 · LEDGER                          */
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
  txt(DATA.film.title_zh, W / 2, 290, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('KINETIC TRACES AND THE UV CEILING', W / 2, 380, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 4 });
  ktBars(560, 760, [[KT.L, C.cyan], [KT.R, C.mag]], 1, { topc: C.now, fs: 30 });
  txt('L + R = (2, 2, 2)', 560, 840, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.now });
  ktRich([['3(L + R) = ', C.white], ['(6, 6, 6)', C.now]], 1320, 560, { size: 44, align: 'center' });
  txt('3.9Q · 14Q · 20Q · 30Q', 1320, 660, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.cyan });
  txt('perturbative UV ceilings · 微扰紫外封顶', 1320, 710, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 920, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
