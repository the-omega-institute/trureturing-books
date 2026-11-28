/* Film · The bill for erasure · 擦除的账单
   (book quantum-geometry, part II: chapter 8). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook   a qubit arrow turned forward and back: a unitary turn keeps the entropy at 0 (computed); the warm chip is a
            picture (argued).
     page   the 2 × 2 density matrix as a page: diagonal = record (cyan), off-diagonal = margin notes (magenta);
            pinching keeps the diagonal and removes the notes (the shredder is an analogy, argued).
     hand   |0⟩ → |+⟩: all four cells 1/2, S = 0; pinch → diag(1/2, 1/2), S = ln 2 = D(|+⟩⟨+| ‖ I/2) (computed).
     steps  turn by 60° about y and pinch, three times: the diagonal goes 3/4, 5/8, 9/16 and the entropy steps are
            D₁ = 0.5623, D₂ = 0.0992, D₃ = 0.0238, total 0.6853 (computed)
            ..... EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity (LEAN):
            for any finite index type and unitary U, ρ(k+1) = Π(Uρ(k)U*) gives S(ρ(k+1)) − S(ρ(k)) = D(ρ_U(k) ‖ Π ρ_U(k))
            ≥ 0 and the N-step total is the sum.
     bill   βQ = −ΔS + I + D; one bath qubit at p = 3/4 with a SWAP: −ΔS = 0.1308, I = 0, D = 0.1438, βQ = 0.2747
            (computed, the chapter's numerical example) ..... LandauerBound.landauer_bound_of_balance,
            LandauerSaturation.landauer_saturation_iff, LandauerSaturation.landauer_strict_iff (LEAN, on real numbers
            with the balance and I, D ≥ 0 as hypotheses).
     copy   ρ = |+⟩⟨+|, σ = |−⟩⟨−| (same diagonal, different notes) copied into a blank record: local tables both
            diag(1/2, 1/2), joint tables differ in the corner cells ±1/2 (computed)
            ..... CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect (LEAN):
            equal local marginals, distinct joint states, no local recovery map, the adjoint unitary restores both.
            The heat line of this step (no reset, no bill) and the maxim are argued.
     edge   k_B T ln 2 at 300 K = 2.871 × 10⁻²¹ J (computed from the literature formula; Landauer, argued);
            the bound does not construct a reset protocol.

   On load, FILM.init checks DATA.lean against the cited theorems and re-derives every number shown on screen by an
   independent route (eigenvalues of 2 × 2 matrices, the relative entropy from its definition, the 4 × 4 copy).
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const LL_LEAN = {
  entropy_production_coherence_deletion_identity: 'D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity',
  landauer_bound_of_balance: 'D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance',
  landauer_saturation_iff: 'D5/S3/DivergenceSupport/LandauerSaturation.landauer_saturation_iff',
  landauer_strict_iff: 'D5/S3/DivergenceSupport/LandauerSaturation.landauer_strict_iff',
  reduced_irreversibility_is_canonical_record_access_defect: 'D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect'
};
const LL_LN2 = Math.log(2);
const llH = p => (p <= 0 || p >= 1 ? 0 : -p * Math.log(p) - (1 - p) * Math.log(1 - p));
/* a real symmetric 2 × 2 density matrix [[a, b], [b, 1 − a]]: eigenvalues and von Neumann entropy */
const llEig = (a, b) => { const m = 0.5, r = Math.hypot(a - 0.5, b); return [m + r, m - r]; };
const llS = (a, b) => llEig(a, b).reduce((s, x) => s - (x > 1e-15 ? x * Math.log(x) : 0), 0);
/* the 60° steps: Bloch z after k steps is cos(60°)^k; the turned state before the k-th pinch */
const LL_TH = Math.PI / 3;
const LL_STEPS = (() => {
  const out = []; let z = 1;
  for (let k = 0; k < 3; k++) {
    const zu = z * Math.cos(LL_TH), xu = z * Math.sin(LL_TH);
    const a = (1 + zu) / 2, b = xu / 2;
    const D = llS(a, 0) - llS(a, b);           // D(ρ_U ‖ Π ρ_U) = S(Π ρ_U) − S(ρ_U) for a pinching
    out.push({ z0: z, a, b, D, S: llS(a, 0) });
    z = zu;
  }
  return out;
})();
const LL_FRAC = ['3/4', '5/8', '9/16'];
/* the bath qubit at p = 3/4 */
const LL_P = 0.75;
const LL_BILL = (() => {
  const dS = LL_LN2 - llH(LL_P), I = 0, D = -LL_LN2 - 0.5 * Math.log(LL_P * (1 - LL_P)), bQ = (LL_P - 0.5) * Math.log(LL_P / (1 - LL_P));
  return { dS, I, D, bQ };
})();
const LL_KT = 1.380649e-23 * 300 * LL_LN2;

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('landauer-ledger film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

  /* 0. the cited theorems */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(LL_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(LL_LEAN).length}`);
  for (const [short, gid] of Object.entries(LL_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  /* 1. HAND: |+⟩ → I/2. Relative entropy from its definition Tr ρ(ln ρ − ln σ) for commuting-free 2 × 2: ρ pure, so
     Tr ρ ln ρ = 0 and Tr ρ ln(I/2) = −ln 2 */
  check(near(llS(0.5, 0.5), 0, 1e-12) && near(llS(0.5, 0), LL_LN2, 1e-12), 'S(|+⟩) = 0 and S(I/2) = ln 2');
  /* 2. STEPS: diagonals, the D's (independently: D = −S(ρ_U) − Tr ρ_U ln Π ρ_U), the sum */
  LL_STEPS.forEach((s, k) => {
    check(near(s.a, [0.75, 0.625, 0.5625][k], 1e-12), `diagonal after step ${k + 1}`);
    const alt = -llS(s.a, s.b) - (s.a * Math.log(s.a) + (1 - s.a) * Math.log(1 - s.a));
    check(near(alt, s.D, 1e-12) && s.D >= 0, `D step ${k + 1}`);
    const prevS = k ? LL_STEPS[k - 1].S : 0;
    check(near(s.S - prevS, s.D, 1e-12), `entropy step ${k + 1} equals D`);
  });
  check(LL_STEPS.map(s => s.D.toFixed(4)).join() === '0.5623,0.0992,0.0238', 'D values shown');
  check(near(LL_STEPS.reduce((t, s) => t + s.D, 0), llH(0.5625), 1e-12) && llH(0.5625).toFixed(4) === '0.6853', 'the sum');
  /* 3. BILL: the balances of the SWAP example and the numbers on screen */
  const b = LL_BILL, dSres = LL_LN2 - llH(LL_P);
  check(near(b.bQ, dSres + b.D) && near(b.I, -b.dS + dSres), 'the two balances');
  check(near(b.bQ, b.dS + b.I + b.D), 'βQ = −ΔS + I + D');
  check([b.dS, b.D, b.bQ].map(x => x.toFixed(4)).join() === '0.1308,0.1438,0.2747', 'bill numbers');
  check(b.bQ > b.dS && b.I + b.D > 0, 'strict');
  /* 4. COPY: CNOT copy of |±⟩ into |0⟩; joint 4 × 4 and its partial trace over the record */
  const joint = s => { const v = [1 / Math.SQRT2, 0, 0, s / Math.SQRT2]; return v.map(x => v.map(y => x * y)); };
  const trE = M => [[M[0][0] + M[1][1], M[0][2] + M[1][3]], [M[2][0] + M[3][1], M[2][2] + M[3][3]]];
  const P = joint(1), Mn = joint(-1), lp = trE(P), lm = trE(Mn);
  check(near(lp[0][0], 0.5) && near(lp[0][1], 0) && near(lm[1][1], 0.5) && near(lm[1][0], 0), 'local tables are I/2');
  check(near(P[0][3], 0.5) && near(Mn[0][3], -0.5), 'joint corner cells ±1/2');
  /* the copy undone: CNOT is its own inverse, back to |±⟩|0⟩ */
  const cnot = v => [v[0], v[1], v[3], v[2]];
  const back = cnot([1 / Math.SQRT2, 0, 0, 1 / Math.SQRT2]);
  check(near(back[2], 1 / Math.SQRT2) && near(back[3], 0), 'the copy undone');
  check(near(LL_KT, 2.871e-21, 1e-24), 'k_B T ln 2 at 300 K');
});
Object.assign(FILM.speed, { hook: 0.02, page: 0.014, hand: 0.014, steps: 0.016, bill: 0.016, copy: 0.016, edge: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const llFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const llNum = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function llRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al) }); cx += tw(s, size, fam, w); }
  return cx;
}
const LL_MISSING = new Set();
function llLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!LL_MISSING.has(gid)) { LL_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a matrix as a page of cells. cells[i][j] = { s: text, col, a (cell alpha), fill }. n × n, cell size c */
function llMat(x, y, c, cells, a, o = {}) {
  if (a <= 0.003) return;
  const n = cells.length;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const e = cells[i][j]; if (!e) continue;
    const ea = a * (e.a == null ? 1 : e.a), cx = x + j * c, cy = y + i * c;
    box(cx + 3, cy + 3, c - 6, c - 6, e.col, a * (e.frame == null ? 0.5 : e.frame), 1.5);
    if (ea > 0.003) {
      fillBox(cx + 3, cy + 3, c - 6, c - 6, e.col, ea * (e.fill == null ? 0.18 : e.fill));
      if (e.s) txt(e.s, cx + c / 2, cy + c / 2 + (o.size || 34) * 0.36, { size: o.size || 34, fam: F.math, w: 700, align: 'center', c: e.col === C.dim ? C.dim : C.white, a: ea });
    }
  }
  /* brackets */
  const L = x - 8, R = x + n * c + 8, T = y - 6, B = y + n * c + 6;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(L + 16, T); ctx.lineTo(L, T); ctx.lineTo(L, B); ctx.lineTo(L + 16, B);
  ctx.moveTo(R - 16, T); ctx.lineTo(R, T); ctx.lineTo(R, B); ctx.lineTo(R - 16, B); ctx.stroke(); ctx.restore();
}
/* 2 × 2 cells: diagonal a, 1 − a (cyan), off-diagonal b (magenta) with alpha k */
function llCells2(a, b, k, o = {}) {
  const fmt = o.fmt || (v => llNum(v, 3));
  const d0 = o.d0 || fmt(a), d1 = o.d1 || fmt(1 - a), off = o.off || fmt(b);
  return [[{ s: d0, col: C.cyan }, { s: off, col: C.mag, a: k }], [{ s: off, col: C.mag, a: k }, { s: d1, col: C.cyan }]];
}
/* shreds: falling magenta strips from a cell as p goes 0 → 1 */
function llShred(x, y, c, p, a) {
  if (p <= 0 || p >= 1 || a <= 0.003) return;
  for (let s = 0; s < 6; s++) {
    const w = (c - 12) / 6, dx = x + 6 + s * w, fall = Math.pow(p, 1.6) * (140 + 50 * rnd(s, 3)), rot = (rnd(s, 7) - 0.5) * p * 0.8;
    ctx.save(); ctx.translate(dx + w / 2, y + c / 2 + fall); ctx.rotate(rot);
    ctx.globalAlpha = a * (1 - p); ctx.fillStyle = rgba(C.mag, 0.55); ctx.fillRect(-w / 2 + 1, -c / 2 + 6, w - 3, c - 12); ctx.restore();
  }
}
/* opening title */
function llTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE BILL FOR ERASURE', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('TURN · PINCH · STEPS · BILL · COPY · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
/* a qubit dial: circle of radius R, arrow at angle th from the top (Bloch x–z plane), length len */
function llDial(cx, cy, R, th, len, a, col = C.now) {
  if (a <= 0.003) return;
  ring(cx, cy, R, C.dim, a * 0.6, 2);
  ctx.save(); ctx.setLineDash([4, 8]); line(cx, cy - R - 10, cx, cy + R + 10, C.cyan, a * 0.5, 1.5); ctx.restore();
  txt('|0⟩', cx, cy - R - 20, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  txt('|1⟩', cx, cy + R + 42, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  if (len > 0.02) arrow(cx, cy, cx + R * len * Math.sin(th), cy - R * len * Math.cos(th), col, a, 5);
  else dot(cx, cy, 10, 'g', a);
}

/* ======================================================================= */
/*                               scene 1 · A TURN IS FREE                    */
/* ======================================================================= */
SCENES.hook = S => {
  const u = S.u;
  llTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'computers get warm', 'argued']]);
  /* forward and back: 0 → 120° → 0 during line 0 */
  const p = Q(S, 0, 'A quantum gate', 4.5), th = 2.1 * Math.sin(Math.PI * clamp(p));
  llDial(520, 470, 230, th, 1, a);
  txt(p < 0.5 ? 'turn · 转' : 'turn back · 转回', 520, 790, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * clamp(p * 6) });
  const ea = a * (1 - 0.6 * Q(S, 1, 'computers get warm', 0.6));   // the computed panel dims while the picture speaks
  panel(1060, 250, 700, 170, ea, C.cyan, 'ENTROPY · 熵');
  llRich([['S = ', C.white], ['0', C.cyan], ['   pure state, any angle', C.dim]], 1090, 340, { size: 32, a: ea });
  txt('纯态，转到哪里都一样', 1090, 390, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ea });
  /* line 1: the warm chip and the question */
  const qa = a * Q(S, 1, 'computers get warm', 0.6);
  if (qa > 0.003) {
    panel(1060, 470, 700, 300, qa, C.argued, 'A PICTURE · 示意');
    box(1180, 600, 200, 120, C.white, qa * 0.8, 2);
    for (let k = 0; k < 6; k++) { line(1190 + k * 36, 600, 1190 + k * 36, 584, C.white, qa * 0.6, 3); line(1190 + k * 36, 720, 1190 + k * 36, 736, C.white, qa * 0.6, 3); }
    for (let k = 0; k < 3; k++) curve(s => [1230 + k * 50 + 10 * Math.sin(s * 9 + S.t * 4), 570 - s * 60], 30, C.now, qa * 0.7 * (0.5 + 0.5 * Math.sin(S.t * 3 + k)), 2.5);
    const va = a * Q(S, 1, 'where would it go', 0.5);
    txt('?', 1570, 680, { size: 150, fam: F.orb, w: 900, align: 'center', c: C.mag, a: va, ab: 3 });
    txt('forgotten bit · 忘掉的比特', 1570, 740, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.mag, a: va });
  }
};

/* ======================================================================= */
/*                             scene 2 · A PAGE WITH NOTES                   */
/* ======================================================================= */
const PG = { x: 300, y: 250, c: 200 };
SCENES.page = S => {
  const a = llFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const ra = Q(S, 0, 'The diagonal', 0.6), na = Q(S, 1, 'margin notes', 0.6);
  const sp = Q(S, 2, 'shreds the notes', 1.6);
  const k = 1 - sp;
  const cells = [[{ s: 'ρ₀₀', col: C.cyan, a: ra }, { s: 'ρ₀₁', col: C.mag, a: na * k }], [{ s: 'ρ₁₀', col: C.mag, a: na * k }, { s: 'ρ₁₁', col: C.cyan, a: ra }]];
  llMat(PG.x, PG.y, PG.c, cells, a, { size: 44 });
  llShred(PG.x + PG.c, PG.y, PG.c, sp, a); llShred(PG.x, PG.y + PG.c, PG.c, sp, a);
  if (sp >= 1) { txt('0', PG.x + PG.c * 1.5, PG.y + PG.c * 0.5 + 16, { size: 44, fam: F.math, w: 700, align: 'center', c: C.dim, a }); txt('0', PG.x + PG.c * 0.5, PG.y + PG.c * 1.5 + 16, { size: 44, fam: F.math, w: 700, align: 'center', c: C.dim, a }); }
  /* labels */
  panel(1000, 220, 820, 160, a * ra, C.cyan, 'RECORD · 记录');
  txt('diagonal: the probability of each outcome', 1028, 300, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a * ra });
  txt('对角线：每个结果出现的概率', 1028, 345, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * ra });
  panel(1000, 400, 820, 160, a * na, C.mag, 'MARGIN NOTES · 批注');
  txt('off-diagonal: coherence, interference', 1028, 480, { size: 26, fam: F.mono, w: 700, c: C.mag, a: a * na });
  txt('对角线外：相干，让结果彼此干涉', 1028, 525, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * na });
  const pa = a * at(S, 2, 0.6);
  panel(1000, 580, 820, 200, pa, C.argued, 'PINCHING Π · 捏合');
  llRich([['Π(ρ) = diag(ρ₀₀, ρ₁₁)', C.white]], 1028, 662, { size: 32, a: pa });
  txt('unread measurement · 不看结果的测量', 1028, 708, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
  txt('shredder = analogy: the notes leave this page · 比方：批注离开这一页', 1028, 752, { size: 20, fam: F.zh, w: 700, c: C.argued, a: pa });
};

/* ======================================================================= */
/*                             scene 3 · ONE BIT BY HAND                     */
/* ======================================================================= */
function llEntropyBar(x, y, w, h, val, a, o = {}) {
  if (a <= 0.003) return;
  box(x, y, w, h, C.white, a * 0.5, 1.2);
  fillBox(x, y + h * (1 - val / LL_LN2), w, h * val / LL_LN2, o.col || C.now, a * 0.55);
  ctx.save(); ctx.setLineDash([8, 6]); line(x - 14, y, x + w + 14, y, C.white, a * 0.7, 1.5); ctx.restore();
  txt('ln 2', x + w + 22, y + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * 0.8 });
  txt('S', x + w / 2, y + h + 36, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a });
}
SCENES.hand = S => {
  const a = llFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const sp = Q(S, 1, 'Shred the notes', 1.4), k = 1 - sp;
  const cells = llCells2(0.5, 0.5, a * k > 0 ? k : 0, { d0: '1/2', d1: '1/2', off: '1/2' });
  if (sp >= 1) { cells[0][1] = { s: '0', col: C.dim }; cells[1][0] = { s: '0', col: C.dim }; }
  llMat(260, 260, 190, cells, a, { size: 44 });
  llShred(260 + 190, 260, 190, sp, a); llShred(260, 260 + 190, 190, sp, a);
  txt(sp < 0.5 ? '|+⟩⟨+|' : 'I/2', 450, 760, { size: 38, fam: F.math, w: 700, align: 'center', c: C.now, a });
  /* entropy bar */
  const S1 = LL_LN2 * ease(sp);
  llEntropyBar(870, 260, 90, 380, S1, a);
  txt(llNum(S1, 4), 915, 248 - 8, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a });
  /* readout */
  panel(1110, 230, 710, 420, a, C.cyan, 'THE LEDGER · 账本');
  llRich([['|0⟩ → |+⟩:   S = ', C.white], ['0', C.cyan]], 1138, 300, { size: 30, a: a * at(S, 0, 0.5) });
  llRich([['Π:  S = ', C.white], ['ln 2 ≈ 0.6931', C.now]], 1138, 370, { size: 30, a: a * Q(S, 1, 'jumps to log two', 0.5) });
  const da = a * at(S, 2, 0.6);
  llRich([['D(ρ ‖ Π ρ) = Tr ρ (ln ρ − ln Π ρ)', C.mag]], 1138, 450, { size: 26, a: da });
  llRich([['= 0 − (−ln 2) = ', C.white], ['ln 2', C.mag]], 1138, 505, { size: 30, a: da });
  txt('relative entropy: before vs after · 撕毁前后的相对熵', 1138, 560, { size: 20, fam: F.zh, w: 700, c: C.dim, a: da });
  txt('1 bit = ln 2 nats · 1 比特', 1138, 615, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: da });
};

/* ======================================================================= */
/*                              scene 4 · STEP BY STEP                       */
/* ======================================================================= */
/* the three steps spread over lines 1–2: step k turns then pinches */
function stPhase(S) {
  const t1 = lineAt(S, 1).s, t3 = lineAt(S, 3).s - 0.3, span = (t3 - t1) / 3;
  const x = (S.u - t1) / span;
  return x < 0 ? -1 : Math.min(x, 3);
}
SCENES.steps = S => {
  const a = llFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'lean']]);
  const ph = stPhase(S), k = ph < 0 ? -1 : Math.min(2, Math.floor(ph)), f = ph < 0 ? 0 : ph - k;
  /* matrix: at the turned state of step k with notes fading in the second half */
  let cells, lab;
  if (k < 0) { cells = llCells2(1, 0, 0, { fmt: v => llNum(v, 0) }); cells[0][1].s = cells[1][0].s = '0'; lab = 'ρ(0) = |0⟩⟨0|'; }
  else {
    const st = LL_STEPS[k], turn = ease(clamp(f / 0.45)), pin = ph >= 3 ? 1 : ease(clamp((f - 0.55) / 0.35));
    const ang = LL_TH * turn, aa = (1 + st.z0 * Math.cos(ang)) / 2, bb = st.z0 * Math.sin(ang) / 2;   // the state turned by ang
    cells = llCells2(aa, bb, 1 - pin, { fmt: v => llNum(v, 3) });
    if (pin >= 1) { cells[0][1] = { s: '0', col: C.dim }; cells[1][0] = { s: '0', col: C.dim }; cells[0][0].s = LL_FRAC[k]; cells[1][1].s = ['1/4', '3/8', '7/16'][k]; }
    llShred(230 + 170, 270, 170, pin, a); llShred(230, 270 + 170, 170, pin, a);
    lab = pin < 1 ? `turn 60° · step ${k + 1}` : `pinch · step ${k + 1}`;
  }
  llMat(230, 270, 170, cells, a, { size: 34 });
  txt(lab, 400, 680, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.now, a });
  /* the entropy stack: blocks D1..D3 */
  const X = 760, Y = 230, Hh = 460, Wd = 130, sc = Hh / LL_LN2;
  box(X, Y, Wd, Hh, C.white, a * 0.4, 1.2);
  ctx.save(); ctx.setLineDash([8, 6]); line(X - 14, Y, X + Wd + 14, Y, C.white, a * 0.7, 1.5); ctx.restore();
  txt('ln 2', X - 20, Y + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: a * 0.8 });
  txt('S', X + Wd / 2, Y + Hh + 40, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a });
  let base = Y + Hh, tot = 0;
  LL_STEPS.forEach((st, i) => {
    const g = i < k ? 1 : i === k ? (ph >= 3 ? 1 : ease(clamp((f - 0.55) / 0.35))) : 0;
    if (g <= 0) return;
    const h = st.D * sc * g, cur = i === k && ph < 3;
    fillBox(X, base - h, Wd, h, cur ? C.now : C.mag, a * (cur ? 0.55 : [0.5, 0.3, 0.5][i]));
    box(X, base - h, Wd, h, C.mag, a, 2);
    /* labels at fixed heights, with a leader to the block */
    const ly = [560, 400, 330][i], by = base - h / 2;
    line(X + Wd + 4, by, X + Wd + 30, ly - 8, cur ? C.now : C.mag, a * g * 0.7, 1.2);
    txt(`D${'₁₂₃'[i]} = ${st.D.toFixed(4)}`, X + Wd + 36, ly, { size: 24, fam: F.mono, w: 700, c: cur ? C.now : C.mag, a: a * g });
    base -= h; if (g >= 1) tot += st.D;   // totals only at whole steps: the growing block is an animation
  });
  if (k >= 0) txt(`S = ${tot.toFixed(4)}`, X + Wd + 36, Y + 40, { size: 24, fam: F.mono, w: 700, c: C.white, a: a * (ph >= 3 ? 1 : 0.85) });
  /* the theorem */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  panel(1150, 220, 680, 560, Math.max(la, a * at(S, 1, 0.5) * 0.999), la > 0.01 ? C.lean : C.cyan, la > 0.01 ? 'ANY FINITE SIZE, ANY FIXED UNITARY U · 任意有限维' : 'THE STEPS · 每一步');
  const ra = a * at(S, 1, 0.5) * (1 - la / Math.max(a, 1e-6));
  if (ra > 0.003) {
    llRich([['ρ(k+1) = Π(U ρ(k) U*)', C.white]], 1178, 300, { size: 28, a: ra });
    llRich([['diagonal  3/4 → 5/8 → 9/16', C.cyan]], 1178, 360, { size: 28, a: ra });
    llRich([['ΔS  0.5623 + 0.0992 + 0.0238', C.mag]], 1178, 420, { size: 26, a: ra * Q(S, 2, 'Each pinch', 0.5) });
    llRich([['= 0.6853', C.mag]], 1178, 470, { size: 26, a: ra * Q(S, 2, 'Each pinch', 0.5) });
    txt('computed here · 屏幕上的计算', 1178, 530, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
  if (la > 0.003) {
    llRich([['S(ρ(k+1)) − S(ρ(k))', C.white]], 1178, 310, { size: 28, a: la });
    llRich([['  = D(σₖ ‖ Π σₖ) ≥ 0', C.mag]], 1178, 360, { size: 28, a: la });
    const sa = a * at(S, 4, 0.6);
    llRich([['S(ρ(n)) − S(ρ(0))', C.white]], 1178, 450, { size: 28, a: sa });
    llRich([['  = D(σ₀ ‖ Π σ₀) + … + D(σₙ₋₁ ‖ Π σₙ₋₁)', C.mag]], 1178, 500, { size: 26, a: sa });
    txt('σₖ = U ρ(k) U*: the same U every step, then pinch', 1178, 560, { size: 20, fam: F.zh, w: 700, c: C.white, a: la });
    txt('每步用同一个 U 转动，再捏合', 1178, 592, { size: 20, fam: F.zh, w: 700, c: C.white, a: la });
    llLean(1178, 665, LL_LEAN.entropy_production_coherence_deletion_identity, la, { size: 18 });
  }
  stamp('ΔS = D', 400, 770, Q(S, 3, 'Lean checks', 0.5, 0.6) * (1 - at(S, 3, 0.5, 4.4)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                              scene 5 · THE HEAT BILL                      */
/* ======================================================================= */
SCENES.bill = S => {
  const a = llFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'From one half each', 'computed'], [3, 'Lean checks', 'lean']]);
  /* receipt on the left */
  const rx = 160, ry = 210, rw = 760, rh = 600;
  panel(rx, ry, rw, rh, a, C.cyan, 'RESET RECEIPT · 复位账单  (units of kT)');
  const b = LL_BILL, na = Q(S, 2, 'From one half each', 0.5);
  const rows = [
    [1, 'entropy removed', '拿走的熵', '−ΔS', b.dS, C.cyan, 'entropy removed from the bit'],
    [1, 'correlation left', '留下的关联', 'I', b.I, C.white, 'correlation between bit and bath'],
    [1, 'how far the bath', '热浴的相对熵', 'D', b.D, C.mag, 'relative entropy of the bath']
  ];
  rows.forEach(([ln, ph, zh, sym, v, col, en], i) => {
    const ra = a * Q(S, ln, ph, 0.5), y = ry + 90 + i * 90;
    llRich([[sym, col]], rx + 30, y, { size: 36, a: ra });
    txt(zh, rx + 140, y - 4, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(en, rx + 140, y + 28, { size: 21, fam: F.mono, w: 700, c: C.white, a: ra * 0.75 });
    txt(v.toFixed(4), rx + rw - 40, y, { size: 32, fam: F.mono, w: 700, align: 'right', c: col, a: ra * na });
  });
  const ta = a * Q(S, 1, 'The bill has three lines', 0.5);
  line(rx + 30, ry + 340, rx + rw - 30, ry + 340, C.white, ta * 0.7, 2);
  llRich([['βQ = −ΔS + I + D', C.now]], rx + 30, ry + 395, { size: 36, a: ta });
  txt(b.bQ.toFixed(4), rx + rw - 40, ry + 395, { size: 34, fam: F.mono, w: 700, align: 'right', c: C.now, a: ta * Q(S, 2, 'comes to point two seven', 0.5) });
  txt('bit: I/2 → diag(3/4, 1/4), not a full reset', rx + 30, ry + 450, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: a * na });
  txt('比特从 I/2 出发，只推到 3/4 · 一个热浴比特、SWAP（数值示例）', rx + 30, ry + 485, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: a * na });
  txt('heat = bath energy gained: a model premise · 热量的读法是模型前提', rx + 30, ry + 530, { size: 20, fam: F.zh, w: 700, c: C.argued, a: a * at(S, 0, 0.6) });
  txt('the heat bill is paid at reset · 热账单在复位时付', rx + 30, ry + 568, { size: 20, fam: F.zh, w: 700, c: C.argued, a: a * at(S, 0, 0.6) });
  /* the bar: floor and total */
  const bx = 1010, by = 250, bw = 120, bh = 330, sc = bh / 0.3;
  const ba = a * na;
  if (ba > 0.003) {
    fillBox(bx, by + bh - b.dS * sc, bw, b.dS * sc, C.cyan, ba * 0.5); box(bx, by + bh - b.dS * sc, bw, b.dS * sc, C.cyan, ba, 1.5);
    fillBox(bx, by + bh - b.bQ * sc, bw, b.D * sc, C.mag, ba * 0.35); box(bx, by + bh - b.bQ * sc, bw, b.D * sc, C.mag, ba, 1.5);
    ctx.save(); ctx.setLineDash([8, 6]); line(bx - 20, by + bh - b.dS * sc, bx + bw + 20, by + bh - b.dS * sc, C.white, ba, 2); ctx.restore();
    txt('floor', bx + bw + 26, by + bh - b.dS * sc + 8, { size: 20, fam: F.mono, w: 700, c: C.white, a: ba });
    txt('D', bx + bw / 2, by + bh - b.dS * sc - b.D * sc / 2 - 4, { size: 28, fam: F.math, w: 700, align: 'center', c: C.mag, a: ba });
    txt('(bath)', bx + bw / 2, by + bh - b.dS * sc - b.D * sc / 2 + 24, { size: 18, fam: F.math, w: 700, align: 'center', c: C.mag, a: ba });
    txt('βQ', bx + bw / 2, by + bh - b.bQ * sc - 14, { size: 26, fam: F.math, w: 700, align: 'center', c: C.now, a: ba });
    line(bx - 20, by + bh, bx + bw + 20, by + bh, C.white, ba * 0.6, 1.5);
  }
  /* the theorem */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1260, 210, 570, 600, la, C.lean, 'REAL NUMBERS · 实数');
    txt('if βQ = −ΔS + I + D,  I ≥ 0,  D ≥ 0', 1284, 280, { size: 22, fam: F.math, w: 700, c: C.white, a: la });
    llRich([['−ΔS ≤ βQ', C.lean]], 1284, 340, { size: 32, a: la });
    llLean(1284, 385, LL_LEAN.landauer_bound_of_balance, la, { size: 18 });
    const ea = a * at(S, 4, 0.6);
    llRich([['−ΔS = βQ  ⇔  I = 0 and D = 0', C.lean]], 1284, 470, { size: 26, a: ea });
    llLean(1284, 515, LL_LEAN.landauer_saturation_iff, ea, { size: 18 });
    const sa = a * Q(S, 4, 'Our bath was pushed', 0.6);
    llRich([['−ΔS < βQ  ⇔  0 < I + D', C.lean]], 1284, 600, { size: 26, a: sa });
    llLean(1284, 645, LL_LEAN.landauer_strict_iff, sa, { size: 18 });
    txt('here D = 0.1438 > 0 → strictly more · 严格更多', 1284, 720, { size: 21, fam: F.zh, w: 700, c: C.mag, a: sa });
    txt("Landauer's bound and when it is reached", 1284, 770, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ea });
  }
};

/* ======================================================================= */
/*                            scene 6 · A COPY YOU CAN UNDO               */
/* ======================================================================= */
/* the joint 4 × 4 table after copying |±⟩ into a blank record: cells (00,00), (00,11), (11,00), (11,11) */
function cpJoint(x, y, c, s, a, hi) {
  const cells = [];
  for (let i = 0; i < 4; i++) { cells.push([]); for (let j = 0; j < 4; j++) {
    const on = (i === 0 || i === 3) && (j === 0 || j === 3), diag = i === j;
    cells[i].push(on ? { s: diag ? '½' : (s > 0 ? '½' : '−½'), col: diag ? C.cyan : C.mag, a: 1, fill: diag ? 0.18 : 0.18 + 0.3 * hi } : { s: '', col: C.dim, a: 0, frame: 0.25 });
  } }
  llMat(x, y, c, cells, a, { size: 26 });
}
SCENES.copy = S => {
  const a = llFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  const ca = Q(S, 0, 'copy the bit', 1.2), ba = Q(S, 3, 'Running the copy backwards', 1.2);
  const cp = ca * (1 - ba);           // 1 while copied, back to 0 when undone
  /* two rows: ρ = |+⟩ (top), σ = |−⟩ (bottom) */
  const rows = [[+1, '|+⟩', 220], [-1, '|−⟩', 520]];
  const sa = Q(S, 1, 'Plus and minus', 0.6);
  rows.forEach(([s, nm, y], r) => {
    const ra = a * (r === 0 ? 1 : sa);
    if (ra <= 0.003) return;
    txt(nm, 120, y + 125, { size: 40, fam: F.math, w: 700, align: 'center', c: C.now, a: ra });
    /* local table: notes ±1/2 fade with the copy */
    const off = s > 0 ? '1/2' : '−1/2';
    const cells = llCells2(0.5, 0.5, 1 - cp, { d0: '1/2', d1: '1/2', off });
    if (cp > 0.98) { cells[0][1] = { s: '0', col: C.dim }; cells[1][0] = { s: '0', col: C.dim }; }
    llMat(200, y + 10, 115, cells, ra, { size: 30 });
    txt('local · 局部', 315, y + 280, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra });
    /* the copy arrow and the joint table */
    const ja = ra * cp;
    if (ba > 0.05) arrow(620, y + 125, 470, y + 125, C.now, ra, 3);
    else arrow(470, y + 125, 620, y + 125, C.now, ra * Math.max(ca, 0.3), 3);
    txt(ba > 0.05 ? 'copy⁻¹' : 'copy', 545, y + 108, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: ra * Math.max(ca, 0.3) });
    if (ja > 0.003) {
      cpJoint(672, y + 5, 60, s, ja, Q(S, 2, 'filed in the corners', 0.6));
      txt('joint · 联合（比特 + 记录）', 792, y + 278, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ja });
    }
    txt(ba > 0.5 ? `${nm} |0⟩ again · 回来了` : '', 792, y + 140, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: ra * at(S, 3, 0.6, 3.2) * (1 - cp) });
  });
  /* the local tables coincide */
  const ea = a * Q(S, 1, 'their local tables are identical', 0.6) * cp;
  if (ea > 0.003) { chip(120, 495, 70, 70, '=', C.cyan, ea, 44); }
  /* right column: theorem */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  panel(1040, 210, 790, 330, Math.max(la, a * Q(S, 2, 'filed in the corners', 0.6)), la > 0.01 ? C.lean : C.mag, la > 0.01 ? 'SAME DIAGONAL, DIFFERENT NOTES · 对角相同、批注不同' : 'FILED · 归档');
  const fa = a * Q(S, 2, 'filed in the corners', 0.6) * (1 - la / Math.max(a, 1e-6));
  if (fa > 0.003) {
    txt('the notes moved to the corners of the joint table', 1066, 290, { size: 22, fam: F.mono, w: 700, c: C.mag, a: fa });
    txt('批注挪到了联合表格的角上：只看比特的人看不到', 1066, 330, { size: 22, fam: F.zh, w: 700, c: C.white, a: fa });
    const pa = fa * Q(S, 2, 'Pinching is this same copy', 0.6);
    txt('pinching = this copy, record out of reach', 1066, 395, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: pa });
    txt('捏合就是这样一次拷贝，只是记录够不着', 1066, 432, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
    txt('a filing cabinet is an analogy · 档案柜只是比方', 1066, 490, { size: 20, fam: F.zh, w: 700, c: C.argued, a: fa });
  }
  if (la > 0.003) {
    llRich([['local(copy ρ) = local(copy σ),  copy ρ ≠ copy σ', C.white]], 1066, 290, { size: 24, a: la });
    txt('no map from the local table rebuilds both', 1066, 345, { size: 22, fam: F.mono, w: 700, c: C.lean, a: la });
    txt('没有只读局部表格的映射能同时还原两者', 1066, 380, { size: 21, fam: F.zh, w: 700, c: C.white, a: la });
    const ua = a * Q(S, 3, 'Running the copy backwards', 0.6);
    txt('the inverse copy restores both · 逆拷贝把两者都还原', 1066, 430, { size: 21, fam: F.zh, w: 700, c: C.lean, a: ua });
    llLean(1066, 500, LL_LEAN.reduced_irreversibility_is_canonical_record_access_defect, la, { size: 17 });
  }
  /* line 4: the maxim and the heat line (argued) */
  const ma = a * at(S, 4, 0.6);
  if (ma > 0.003) {
    panel(1040, 570, 790, 220, ma, C.argued, 'IN THIS LEDGER · 本章账本');
    txt('pinch or copy: entropy only; heat is paid at reset', 1066, 640, { size: 22, fam: F.mono, w: 700, c: C.argued, a: ma });
    txt('捏合或拷贝只记熵；热账单在复位时付', 1066, 680, { size: 22, fam: F.zh, w: 700, c: C.white, a: ma });
    txt('filed → fetched back · reset → paid for', 1066, 740, { size: 24, fam: F.mono, w: 700, c: C.now, a: ma });
  }
};

/* ======================================================================= */
/*                          scene 7 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = llFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const m = LL_KT / 1e-21;
  const rows = [
    { k: 0, title: 'ENTROPY, NOT JOULES · 算的是熵', en: `floor kT ln 2 at T = 300 K ≈ ${m.toFixed(2)} × 10⁻²¹ J`, zh: '室温下每比特的地板约 2.87 仄焦：兰道尔的物理，文献结果', note: 'real chips dissipate far more; this is only the floor · 真实芯片耗散远多于此，这只是地板' },
    { k: 1, title: 'A BOUND, NOT A MACHINE · 只是下界', en: 'the bound builds no reset that reaches −ΔS = βQ', zh: '下界本身不造出能取等的复位方案', note: 'SWAP from I/2 with one bath qubit: D > 0 for every p > 1/2 · 从 I/2 出发交换一个热浴比特：p > 1/2 时 D 恒为正' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 220 + i * 300;
    panel(260, y, 1400, 250, ra, C.argued, rw.title);
    txt(rw.en, 300, y + 100, { size: 34, fam: F.math, w: 700, c: C.argued, a: ra });
    txt(rw.zh, 300, y + 155, { size: 30, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 207, { size: 23, fam: F.zh, w: 700, c: C.white, a: ra * 0.8 });
  });
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const cells = llCells2(0.5, 0.5, 0.55, { d0: '1/2', d1: '1/2', off: '1/2' });
  llMat(220, 300, 210, cells, 1, { size: 52 });
  llShred(220 + 210, 300, 210, 0.45, 1); llShred(220, 300 + 210, 210, 0.45, 1);
  txt(DATA.film.title_zh, 1380, 420, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE BILL', 1380, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.now, ab: 3, ls: 5 });
  txt('FOR ERASURE', 1380, 582, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  llRich([['ΔS = D', C.mag], ['   ', C.white], ['βQ ≥ −ΔS', C.cyan]], 1380, 680, { size: 44, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
