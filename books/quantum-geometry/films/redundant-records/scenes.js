/* Film · One surviving copy blocks the way back · 留下一份副本，就回不去
   (book quantum-geometry, chapter 34, §34.5.3–34.5.4). Scenes for theme/film/engine.js.

   A record of a qubit's branch multiplies the coherence entry ρ_ij by the record's overlap
   c = recordOverlap record i j = Σ_a record i a · (record j a)*; reversing a record conjugates its amplitudes,
   which conjugates its overlap. K(n, c) = c I + (1 − c) n nᵀ is the unread Bloch contraction along the axis n.

   What each scene shows, and where it rests:
     sign      ten readers write down a sign; one rubs their note back out (picture of the question; argued).
     write     equalSuperpositionDensity has ρ₀₁ = 1/2; a phase record with amplitudes 1 (i = 0) and i (i = 1) has
               overlap 1 · (i)* = −i; two copies give (−i)² · 1/2 = −1/2 (computed).
     undo      reversing copy zero alone: i · (−1/2) = −i/2 ≠ 1/2; reversing both: i² · (−1/2) = 1/2
               ..... JointCoherentReversal.two_copy_joint_reversal_certificate (LEAN, all four numbers).
     survivor  eight copies, seven with unit overlaps i, −i, −1, i, −i, −1, i and the survivor with overlap 3/10:
               ρ₀₁ = 1/2 → (3/20) i → 3/20 after undoing all but the survivor (computed); unit overlaps for every
               l ≠ k, c_k ≠ 1 and ρ_ij ≠ 0 give an entry that is not restored
               ..... JointCoherentReversal.surviving_copy_blocks_reversal (LEAN); the photo and the aphorism are
               a picture and the book's reading (argued).
     axes      n = (1, 0, 0), c = 1/2; m = (3/5, 4/5, 0), d = 1/3; v = (0, 1, 0):
               K_m K_e v = (4/25, 19/50, 0), K_e K_m v = (8/25, 19/50, 0), the gap 4/25 (computed);
               [K(n,c), K(m,d)] = (1 − c)(1 − d)(n·m)(n mᵀ − m nᵀ) ..... axisContraction_commutator (LEAN),
               nonzero for nonzero n, m not a multiple of n, n·m ≠ 0, c, d ≠ 1
               ..... axisContraction_commutator_ne_zero_of_nonparallel_nonorthogonal (LEAN);
               the sweep of the tilted rail draws the gap (1/3) cos θ sin θ (computed).
     edge      conjugating a record of real overlap 3/10 multiplies again by 3/10: 1/2 → 3/20 → 9/200 (computed);
               the joint inverse gate of the controlled model is the chapter's hand derivation (argued);
               facts as redundant records is the book's reading (argued); single-outcome selection is the book's
               open problem prob-ch34-single-outcome-realization (open).

   On load, FILM.init checks DATA.lean against the four theorems and recomputes every number on screen by an
   independent route (complex products of the record amplitudes, 3×3 matrix products against the closed form,
   random axes and factors). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const RR_DEG = Math.PI / 180;
const cAdd = (p, q) => [p[0] + q[0], p[1] + q[1]];
const cMul = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
const cConj = p => [p[0], -p[1]];
const cAbs = p => Math.hypot(p[0], p[1]);
const cNear = (p, q, e = 1e-12) => Math.abs(p[0] - q[0]) < e && Math.abs(p[1] - q[1]) < e;
/* recordOverlap record i j = Σ_a record i a · (record j a)* for a record Fin 2 → Fin 2 → ℂ */
const rrOverlap = (rec, i, j) => [0, 1].reduce((s, a) => cAdd(s, cMul(rec[i][a], cConj(rec[j][a]))), [0, 0]);
const rrReverse = rec => rec.map(row => row.map(cConj));
/* the phase record of the certificate: amplitude 1 on branch 0 and i on branch 1, both at address 0 */
const RR_PHASE = [[[1, 0], [0, 0]], [[0, 1], [0, 0]]];
const RR_RHO01 = [0.5, 0];
/* the survivor scene: seven unit overlaps and the survivor's overlap 3/10 at index 5 */
const RR_ROW = [[0, 1], [0, -1], [-1, 0], [0, 1], [0, -1], [0.3, 0], [-1, 0], [0, 1]];
const RR_ROW_LABEL = ['i', '−i', '−1', 'i', '−i', '3/10', '−1', 'i'];
const RR_K = 5;
const rrProd = zs => zs.reduce(cMul, [1, 0]);
/* 3×3 real matrices */
const mI = () => [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const mMul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, _x, k) => s + A[i][k] * B[k][j], 0)));
const mSub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const mVec = (A, v) => A.map(r => r.reduce((s, x, k) => s + x * v[k], 0));
const rrK = (n, c) => mI().map((r, i) => r.map((x, j) => c * x + (1 - c) * n[i] * n[j]));
const dot3 = (n, m) => n[0] * m[0] + n[1] * m[1] + n[2] * m[2];
const outer3 = (n, m) => n.map(a => m.map(b => a * b));
const RR_N = [1, 0, 0], RR_C = 1 / 2, RR_D = 1 / 3, RR_V = [0, 1, 0];
const rrM = th => [Math.cos(th), Math.sin(th), 0];
const RR_TH0 = Math.atan2(4, 3);
/* the two orders: flat rail first, then tilted (K_m K_e v); tilted first, then flat (K_e K_m v) */
function rrPaths(th) {
  const m = rrM(th), Ke = rrK(RR_N, RR_C), Km = rrK(m, RR_D);
  const a1 = mVec(Ke, RR_V), a2 = mVec(Km, a1), b1 = mVec(Km, RR_V), b2 = mVec(Ke, b1);
  return { m, a1, a2, b1, b2 };
}

const RR_LEAN = {
  two_copy_joint_reversal_certificate: 'D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate',
  surviving_copy_blocks_reversal: 'D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal',
  axisContraction_commutator: 'D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisContraction_commutator',
  axisContraction_commutator_ne_zero_of_nonparallel_nonorthogonal: 'D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisContraction_commutator_ne_zero_of_nonparallel_nonorthogonal'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('redundant-records film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, e = 1e-12) => Math.abs(a - b) < e;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(RR_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(RR_LEAN).length}`);
  for (const [short, gid] of Object.entries(RR_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  /* 1. WRITE and UNDO: the four numbers of the two-copy certificate */
  const c = rrOverlap(RR_PHASE, 0, 1), cr = rrOverlap(rrReverse(RR_PHASE), 0, 1);
  check(cNear(c, [0, -1]), `phase record overlap ${c}`);
  check(cNear(cr, [0, 1]) && cNear(cr, cConj(c)), `reversed overlap ${cr}`);
  const w = cMul(cMul(c, c), RR_RHO01);
  check(cNear(w, [-0.5, 0]), 'two copies give −1/2');
  check(cNear(cMul(cr, w), [0, -0.5]), 'undoing copy zero gives −i/2');
  check(cNear(cMul(cr, cMul(cr, w)), RR_RHO01), 'undoing both gives 1/2');
  /* 2. SURVIVOR: unit overlaps except the survivor; 1/2 → 3i/20 → 3/20 */
  RR_ROW.forEach((z, l) => check(l === RR_K ? !cNear(z, [1, 0]) && near(cAbs(z), 0.3) : near(cAbs(z), 1), `overlap of copy ${l}`));
  const written = cMul(rrProd(RR_ROW), RR_RHO01);
  check(cNear(written, [0, 0.15]), `written entry ${written}`);
  const undone = cMul(rrProd(RR_ROW.filter((_, l) => l !== RR_K).map(cConj)), written);
  check(cNear(undone, [0.15, 0]) && cNear(undone, cMul(RR_ROW[RR_K], RR_RHO01)), `survivor entry ${undone}`);
  /* random families: undoing all but k leaves c_k ρ_ij */
  for (let t = 0; t < 40; t++) {
    const n = 2 + (t % 7), k = t % n, rho = [2 * rnd(t, 1) - 1, 2 * rnd(t, 2) - 1];
    const fam = Array.from({ length: n }, (_, l) => l === k ? [2 * rnd(t, l + 9) - 1, 2 * rnd(t, l + 19) - 1] : [Math.cos(7 * rnd(t, l + 3)), Math.sin(7 * rnd(t, l + 3))]);
    const out = cMul(rrProd(fam.filter((_, l) => l !== k).map(cConj)), cMul(rrProd(fam), rho));
    check(cNear(out, cMul(fam[k], rho), 1e-11), `random family ${t}`);
  }
  /* 3. AXES: the two orders, the gap 4/25, the commutator formula */
  const P = rrPaths(RR_TH0);
  check(near(P.m[0], 0.6) && near(P.m[1], 0.8), 'tilted rail (3/5, 4/5)');
  check(near(P.a1[0], 0) && near(P.a1[1], 0.5) && near(P.a2[0], 4 / 25) && near(P.a2[1], 19 / 50), `flat rail first ${P.a2}`);
  check(near(P.b1[0], 8 / 25) && near(P.b1[1], 19 / 25) && near(P.b2[0], 8 / 25) && near(P.b2[1], 19 / 50), `tilted rail first ${P.b2}`);
  const Ke = rrK(RR_N, RR_C), Km = rrK(P.m, RR_D);
  check(near(mMul(Ke, Km)[0][1], 8 / 25) && near(mMul(Km, Ke)[0][1], 4 / 25), 'the (0, 1) entries 8/25 and 4/25');
  check(near((1 - RR_C) * (1 - RR_D) * dot3(RR_N, P.m) * (4 / 5), 4 / 25), 'the factor (1/2)(2/3)(3/5)(4/5)');
  for (let t = 0; t < 60; t++) {
    const n = [0, 1, 2].map(j => 2 * rnd(t, j + 30) - 1), m = [0, 1, 2].map(j => 2 * rnd(t, j + 40) - 1);
    const cc = 2 * rnd(t, 50) - 1, dd = 2 * rnd(t, 51) - 1;
    const L = mSub(mMul(rrK(n, cc), rrK(m, dd)), mMul(rrK(m, dd), rrK(n, cc)));
    const s = (1 - cc) * (1 - dd) * dot3(n, m), O = mSub(outer3(n, m), outer3(m, n));
    check(L.every((r, i) => r.every((x, j) => near(x, s * O[i][j], 1e-11))), `commutator formula ${t}`);
  }
  for (let deg = 0; deg <= 180; deg += 0.5) {
    const Q2 = rrPaths(deg * RR_DEG), g = Q2.b2[0] - Q2.a2[0];
    check(near(g, Math.cos(deg * RR_DEG) * Math.sin(deg * RR_DEG) / 3, 1e-12) && near(Q2.a2[1], Q2.b2[1], 1e-12), `gap at ${deg}°`);
  }
  check(near(rrPaths(Math.PI / 2).b2[0] - rrPaths(Math.PI / 2).a2[0], 0, 1e-12), 'perpendicular rails commute');
  /* 4. EDGE: a real overlap 3/10 conjugated is 3/10 again */
  check(near(0.5 * 0.3, 0.15) && near(0.5 * 0.3 * 0.3, 0.045), 'noisy copy 1/2 → 3/20 → 9/200');
});
Object.assign(FILM.speed, { sign: 0.02, write: 0.014, undo: 0.014, survivor: 0.016, axes: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const rrFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rrRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const RR_MISSING = new Set();
function rrLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!RR_MISSING.has(gid)) { RR_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small dial: the overlap z as an arrow of length |z| inside a unit ring */
function rrDial(cx, cy, R, z, col, a, o = {}) {
  if (a <= 0.003) return;
  ring(cx, cy, R, C.dim, a * 0.6, 1.4);
  line(cx - R - 6, cy, cx + R + 6, cy, C.dim, a * 0.3, 1);
  line(cx, cy - R - 6, cx, cy + R + 6, C.dim, a * 0.3, 1);
  const x2 = cx + R * z[0], y2 = cy - R * z[1];
  if (Math.hypot(x2 - cx, y2 - cy) > 3) arrow(cx, cy, x2, y2, col, a, o.w || 4);
  if (o.turn) {
    /* the quarter turn from 1 to z */
    const t0 = 0, t1 = Math.atan2(z[1], z[0]);
    curve(s => { const t = lerp(t0, t1, s); return [cx + 0.55 * R * Math.cos(t), cy - 0.55 * R * Math.sin(t)]; }, 24, C.now, a * o.turn, 2.5);
  }
}
/* a record card: title, dial, overlap label; state 0 written, 1 undone */
function rrCard(x, y, w, h, title, z, label, a, o = {}) {
  if (a <= 0.003) return;
  const undone = o.undone || 0, focus = o.focus || 0;
  const col = focus > 0.5 ? C.now : C.white;
  box(x, y, w, h, col, a * (0.75 - 0.35 * undone), focus > 0.5 ? 2.4 : 1.4, 'rgba(4,10,24,0.65)');
  txt(title, x + w / 2, y + 34, { size: o.ts || 22, fam: F.zh, w: 700, align: 'center', c: col, a: a * (1 - 0.5 * undone) });
  const R = o.R || Math.min(w, h) * 0.26;
  const zz = undone > 0 ? [lerp(z[0], 1, ease(undone)), lerp(z[1], 0, ease(undone))] : z;
  rrDial(x + w / 2, y + h * 0.52, R, zz, focus > 0.5 ? C.now : C.white, a * (1 - 0.55 * undone), { turn: o.turn && !undone ? o.turn : 0 });
  txt(label, x + w / 2, y + h - 22, { size: o.ls || 24, fam: F.math, w: 700, align: 'center', c: col, a: a * (1 - 0.55 * undone) });
  if (undone > 0.02) txt('undone · 已撤销', x + w / 2, y + h + 30, { size: o.us || 19, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * undone });
}
/* the system's density matrix with the coherence entry in amber */
function rrSystem(x, y, val, a, o = {}) {
  if (a <= 0.003) return;
  panel(x, y, 520, 340, a, C.cyan, 'QUBIT · 系统');
  const cx = x + 260, cy = y + 180;
  /* brackets */
  line(cx - 170, cy - 90, cx - 170, cy + 90, C.white, a, 3); line(cx - 170, cy - 90, cx - 150, cy - 90, C.white, a, 3); line(cx - 170, cy + 90, cx - 150, cy + 90, C.white, a, 3);
  line(cx + 170, cy - 90, cx + 170, cy + 90, C.white, a, 3); line(cx + 170, cy - 90, cx + 150, cy - 90, C.white, a, 3); line(cx + 170, cy + 90, cx + 150, cy + 90, C.white, a, 3);
  txt('1/2', cx - 90, cy - 30, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: a * 0.8 });
  txt('1/2', cx + 90, cy + 62, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: a * 0.8 });
  txt(val, cx + 90, cy - 30, { size: 34, fam: F.math, w: 700, align: 'center', c: C.now, a });
  txt({ '1/2': '1/2', '−i/2': 'i/2', '−1/2': '−1/2' }[val] || '', cx - 90, cy + 62, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: a * 0.55 });
  txt('coherence ρ₀₁ · 相干', x + 260, y + 320, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * (o.lab == null ? 1 : o.lab) });
}
/* opening title */
function rrTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('ONE SURVIVING COPY BLOCKS THE UNDO', p, 5), W / 2, 580, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('READERS · RECORDS · UNDO · SURVIVOR · RAILS · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                          scene 1 · ONE SIGN, MANY READERS                 */
/* ======================================================================= */
const SG = { x: 960, y: 330, n: 10, cx: 960, cy: 360, rx: 700, ry: 330 };
const sgReader = j => {
  const t = lerp(200, 340, j / (SG.n - 1)) * RR_DEG;
  return [SG.cx + SG.rx * Math.cos(t), SG.cy - SG.ry * Math.sin(t)];
};
SCENES.sign = S => {
  const u = S.u;
  rrTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the sign */
  line(SG.x, SG.y + 70, SG.x, 700, C.white, a * 0.8, 8);
  box(SG.x - 200, SG.y - 70, 400, 140, C.white, a, 2.4, 'rgba(4,10,24,0.85)');
  txt('(|0⟩ + |1⟩)/√2', SG.x, SG.y + 18, { size: 44, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('the sign · 路标', SG.x, SG.y - 88, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* line 0: ten readers, each writes a copy */
  const tear = Q(S, 1, 'rubs their note back out', 0.9);
  for (let j = 0; j < SG.n; j++) {
    const [rx, ry] = sgReader(j);
    const ja = a * clamp((u - lineAt(S, 0).s - 0.25 * j) / 0.4);
    if (ja <= 0) continue;
    const torn = j === 6;
    dashed(SG.x + (rx - SG.x) * 0.25, SG.y + 70 + (ry - SG.y - 70) * 0.25, rx, ry - 44, C.cyan, ja * 0.45 * (torn ? 1 - tear : 1), 1.5);
    dot(rx, ry, 14, 'w', ja);
    /* the notebook page */
    const px = rx - 24, py = ry + 22;
    if (!torn) fillBox(px, py, 48, 36, C.cyan, ja * 0.55);
    else {
      fillBox(px, py, 48, 36, C.cyan, ja * 0.55 * (1 - tear));
      if (tear > 0) {
        box(px, py, 48, 36, C.cyan, ja * 0.8 * tear, 1.4);
        txt('undone · 抹回', rx, ry + 92, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ja * tear });
      }
    }
  }
  txt('10 readers · 10 copies · 十份记录', SG.x, 840, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * at(S, 0, 0.6, 2.4) * (1 - at(S, 2, 0.5)) });
  /* line 1: the question */
  const qa = a * Q(S, 1, 'Can the sign go back', 0.6);
  chip(SG.x, 520, 520, 64, 'back to before?  回到从前？', C.now, qa * (1 - at(S, 2, 0.4, 1.0)), 28, F.zh);
  /* line 2: the idol and the count */
  const ia = a * Q(S, 2, 'a fact just sits', 0.6);
  if (ia > 0) {
    const st = Q(S, 2, 'Let us count', 0.6);
    txt('a fact, on its own?  事实，独自成立？', SG.x, 840, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ia });
    if (st > 0) line(SG.x - 290, 830, SG.x - 290 + 580 * st, 830, C.white, ia, 3);
    chip(SG.x, 520, 360, 64, 'count · 算一算', C.cyan, a * st, 28, F.zh);
  }
};

/* ======================================================================= */
/*                            scene 2 · WRITING TWO COPIES                   */
/* ======================================================================= */
const WR = { sx: 120, sy: 210, cx: [860, 1200], cy: 230, cw: 280, ch: 330, tx: 140, ty: 790 };
/* the ledger tape: steps [[op, value, colour]] appearing at times */
function rrTape(x, y, steps, a, size = 34) {
  let cx = x;
  for (const [op, val, col, al] of steps) {
    if (al <= 0.003) continue;
    if (op) { txt(op, cx, y, { size: size * 0.7, fam: F.math, w: 700, c: C.dim, a: a * al }); cx += tw(op, size * 0.7, F.math, 700) + 14; }
    txt(val, cx, y, { size, fam: F.math, w: 700, c: col, a: a * al }); cx += tw(val, size, F.math, 700) + 22;
  }
  return cx;
}
SCENES.write = S => {
  const u = S.u, a = rrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const w1 = Q(S, 2, 'Two copies', 0.6), w2 = Q(S, 2, 'minus one half', 0.6);
  const val = w2 > 0.5 ? '−1/2' : w1 > 0.5 ? '−i/2' : '1/2';
  rrSystem(WR.sx, WR.sy, val, a * at(S, 0, 0.6));
  /* line 0: the two branches linked by one number */
  const la = a * Q(S, 0, 'The number linking', 0.6);
  txt('branch 0  ↔  branch 1', WR.sx + 260, WR.sy + 400, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: la * 0.85 });
  /* line 1: the rule */
  const ra = a * at(S, 1, 0.6);
  rrRich([['ρ₀₁  ↦  ', C.white], ['c', C.cyan], [' · ρ₀₁', C.white]], 860, 680, { size: 34, a: ra });
  txt('c = overlap of the record\'s two branches · 记录两分支的重叠', 860, 722, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ra * 0.85 });
  /* line 2: two phase records */
  const ca = [0, 1].map(j => a * Q(S, 2, 'A phase record', 0.5, 0.5 * j));
  ca.forEach((cA, j) => rrCard(WR.cx[j], WR.cy, WR.cw, WR.ch, `copy ${j} · 副本 ${j}`, [0, -1], 'c = −i', cA, { turn: Q(S, 2, 'a quarter turn', 0.6), focus: (j === 0 ? w1 : w2) > 0 && (j === 0 ? w2 : 1) < 1 ? 1 : 0 }));
  txt('quarter turn · 四分之一圈', 1340, 600, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * Q(S, 2, 'a quarter turn', 0.6) });
  rrTape(WR.tx, WR.ty, [
    ['', '1/2', C.white, at(S, 0, 0.6)],
    ['× (−i) →', '−i/2', C.white, w1],
    ['× (−i) →', '−1/2', C.now, w2]
  ], a);
};

/* ======================================================================= */
/*                           scene 3 · UNDO ONE, UNDO BOTH                   */
/* ======================================================================= */
SCENES.undo = S => {
  const u = S.u, a = rrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* line 0: conjugation turns the quarter turn back */
  const c0 = Q(S, 0, 'conjugate it', 0.8);
  /* line 1: copy zero only; line 2: both */
  const u0 = Q(S, 1, 'Undo copy zero', 0.8), back0 = Q(S, 2, 'Undo both', 0.6);
  const u1 = Q(S, 2, 'Undo both', 0.8);
  const val = u1 > 0.5 ? '1/2' : u0 > 0.5 ? '−i/2' : '−1/2';
  rrSystem(WR.sx, WR.sy, val, a);
  rrCard(WR.cx[0], WR.cy, WR.cw, WR.ch, 'copy 0 · 副本 0', [0, -1], u0 > 0.5 ? 'net (−i)·i = 1' : 'c = −i', a, { undone: u0, focus: u0 < 0.02 && c0 > 0 ? 1 : 0 });
  rrCard(WR.cx[1], WR.cy, WR.cw, WR.ch, 'copy 1 · 副本 1', [0, -1], u1 > 0.5 ? 'net (−i)·i = 1' : 'c = −i', a, { undone: u1, focus: u0 > 0.5 && u1 < 0.5 ? 1 : 0 });
  rrRich([['reverse = conjugate:  ', C.white], ['−i  →  i', C.cyan]], 860, 650, { size: 30, a: a * c0 * (1 - 0.6 * u0) * (1 - Q(S, 2, 'Undo both', 0.4)) });
  /* the two tapes */
  const ta = a * u0;
  rrTape(WR.tx, 740, [
    ['', '−1/2', C.white, 1],
    ['× i →', '−i/2', C.white, u0],
    ['', '≠ 1/2', C.white, Q(S, 1, 'Not one half', 0.5)]
  ], ta, 32);
  txt('copy 0 only · 只撤销第 0 份', 620, 740, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ta });
  const tb = a * back0;
  rrTape(WR.tx, 806, [
    ['', '−1/2', C.white, 1],
    ['× i →', '−i/2', C.white, 1],
    ['× i →', '1/2', C.cyan, u1]
  ], tb, 32);
  txt('both · 两份都撤销', 660, 806, { size: 20, fam: F.zh, w: 700, c: C.dim, a: tb });
  /* line 2: the Lean certificate, four numbers */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0) {
    panel(1180, 650, 640, 190, la, C.lean, 'FOUR NUMBERS · 四个数');
    rrLean(1200, 718, RR_LEAN.two_copy_joint_reversal_certificate, la, { size: 18 });
    rrRich([['1/2', C.white], ['  →  ', C.dim], ['−1/2', C.white], ['  →  ', C.dim], ['−i/2', C.white], ['  →  ', C.dim], ['1/2', C.lean]], 1200, 790, { size: 32, a: la });
    txt('start · write two · undo 0 · undo both', 1200, 826, { size: 18, fam: F.mono, w: 700, c: C.dim, a: la });
  }
};

/* ======================================================================= */
/*                              scene 4 · ONE SURVIVOR                       */
/* ======================================================================= */
const SV = { x0: 120, y: 200, w: 180, h: 210, gap: 20 };
const svX = l => SV.x0 + l * (SV.w + SV.gap);
SCENES.survivor = S => {
  const u = S.u, a = rrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  /* line 0: eight copies, undo all but k */
  const t0 = phraseAt(S, 0, 'undo every one');
  RR_ROW.forEach((z, l) => {
    const ca = a * clamp((u - lineAt(S, 0).s - 0.12 * l) / 0.4);
    const isK = l === RR_K;
    const ud = isK ? 0 : clamp((u - t0 - 0.18 * l) / 0.5);
    rrCard(svX(l), SV.y, SV.w, SV.h, isK ? 'copy k = 5' : `copy ${l}`, z, RR_ROW_LABEL[l], ca, { undone: ud, focus: isK && u > t0 ? 1 : 0, R: 48, ts: 20, ls: 22, us: 16 });
  });
  const ka = a * Q(S, 0, 'except copy k', 0.6);
  txt('survivor · 幸存', svX(RR_K) + SV.w / 2, SV.y + SV.h + 64, { size: 22, fam: F.zh, w: 900, align: 'center', c: C.now, a: ka });
  /* line 1: what is left */
  const fa = a * at(S, 1, 0.6);
  rrRich([['these seven: |c| = 1   ⟹   left = ', C.white], ['c(k)', C.now], [' · ρ₀₁', C.white]], 120, 560, { size: 30, a: fa });
  const tx = rrTape(120, 622, [
    ['ρ₀₁:', '1/2', C.white, at(S, 1, 0.5, 0.8)],
    ['write →', '3i/20', C.white, at(S, 1, 0.5, 1.6)],
    ['undo all but k →', '3/20', C.now, Q(S, 1, "survivor's overlap", 0.5)]
  ], fa, 30);
  txt('= (3/10) · (1/2)', tx, 622, { size: 24, fam: F.math, w: 700, c: C.now, a: fa * Q(S, 1, 'times the old number', 0.5) });
  /* line 2: the theorem */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0) {
    rrLean(120, 700, RR_LEAN.surviving_copy_blocks_reversal, la, { size: 18 });
    rrRich([['l ≠ k: |c(l)| = 1,   ', C.white], ['c(k)', C.now], [' ≠ 1,   ρ(i, j) ≠ 0   ⟹   after ≠ ρ(i, j)', C.white]], 120, 756, { size: 26, a: la });
    stamp('NOT RESTORED', 1500, 560, Q(S, 2, 'never brings it back', 0.6), C.white, 40);
    txt('回不到原值', 1500, 628, { size: 26, fam: F.zh, w: 900, align: 'center', c: C.white, a: la * Q(S, 2, 'never brings it back', 0.6, 0.3) });
  }
  /* line 3: the photo picture */
  const pa = a * at(S, 3, 0.6);
  if (pa > 0) {
    panel(1180, 650, 640, 200, pa, C.argued, 'PICTURE, NOT A PROOF · 比方，不是证明');
    for (let p = 0; p < 6; p++) {
      const px = 1210 + p * 46, py = 696, del = p !== 3 || Q(S, 3, 'every phone', 0.6) > 0.5;
      box(px, py, 32, 54, C.argued, pa, 1.6, 'rgba(4,10,24,0.6)');
      if (!del || clamp((u - phraseAt(S, 3, 'deleted it') - 0.1 * p) / 0.3) < 0.5) fillBox(px + 6, py + 8, 20, 26, C.argued, pa * 0.7);
    }
    txt('photo ↔ branch record · phone ↔ copy', 1200, 784, { size: 17, fam: F.mono, w: 700, c: C.argued, a: pa });
    txt('all deleted ↔ coherence back', 1200, 810, { size: 17, fam: F.mono, w: 700, c: C.argued, a: pa });
    txt('照片 ↔ 分支记录 · 手机 ↔ 副本 · 全删 ↔ 相干复原', 1200, 840, { size: 20, fam: F.zh, w: 700, c: C.argued, a: pa });
  }
  /* line 4: the aphorism */
  const ap = a * at(S, 4, 0.6);
  if (ap > 0) {
    txt('“Too many hands hold it.” · 握着它的手太多', 120, 850, { size: 30, fam: F.zh, w: 900, c: C.argued, a: ap });
    txt('a reading · 诠释', 120, 884, { size: 18, fam: F.zh, w: 700, c: C.argued, a: ap * 0.85 });
  }
};

/* ======================================================================= */
/*                            scene 5 · TWO SLANTED RAILS                    */
/* ======================================================================= */
const AX = { ox: 230, oy: 830, U: 580 };
const axP = v => [AX.ox + AX.U * v[0], AX.oy - AX.U * v[1]];
/* draw one order: start → first stop → second stop, with dashed pulls toward the rails */
function axPath(pts, p, col, a, dash) {
  if (a <= 0.003) return;
  const seg = (q, r, s) => {
    if (s <= 0) return;
    const [x1, y1] = axP(q), [x2, y2] = axP([lerp(q[0], r[0], s), lerp(q[1], r[1], s)]);
    if (dash) { ctx.save(); ctx.setLineDash([12, 9]); }
    if (Math.hypot(x2 - x1, y2 - y1) > 3) arrow(x1, y1, x2, y2, col, a, 3.5);
    if (dash) ctx.restore();
  };
  seg(pts[0], pts[1], clamp(p * 2));
  seg(pts[1], pts[2], clamp(p * 2 - 1));
  if (p > 0.5) dot(...axP(pts[1]), 9, 'w', a * 0.8);
}
SCENES.axes = S => {
  const u = S.u, a = rrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* the tilted rail: fixed at atan(4/3), swept during line 3 through 90° and 0° and back */
  const L3 = lineAt(S, 3), sw = clamp((u - phraseAt(S, 3, 'It vanishes')) / Math.max(0.5, L3.e - phraseAt(S, 3, 'It vanishes') + 0.4));
  let th = RR_TH0;
  if (sw > 0) {
    const k = sw * 3;
    th = k < 1 ? lerp(RR_TH0, Math.PI / 2, ease(k)) : k < 2 ? lerp(Math.PI / 2, 0, ease(k - 1)) : lerp(0, RR_TH0, ease(k - 2));
  }
  const P = rrPaths(th);
  /* rails */
  const ra = a * at(S, 0, 0.6), swing = sw > 0 && sw < 1 ? 1 : 0, fixA = 1 - clamp(sw * 12) + clamp((sw - 0.92) * 12);
  line(AX.ox - 60, AX.oy, AX.ox + 1.3 * AX.U, AX.oy, C.cyan, ra, 4);
  const [mx, my] = axP([1.15 * P.m[0], 1.15 * P.m[1]]), [nx, ny] = axP([-0.1 * P.m[0], -0.1 * P.m[1]]);
  line(nx, ny, mx, my, C.cyan, a * at(S, 1, 0.6), 4);
  txt('flat rail n · c = 1/2', AX.ox + 1.3 * AX.U - 10, AX.oy - 16, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ra * (1 - swing) });
  txt('tilted rail m · d = 1/3', mx + 12, my + 4, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a * at(S, 1, 0.6) * (sw > 0 && sw < 1 ? 0 : 1) });
  dot(AX.ox, AX.oy, 7, 'w', ra);
  /* the start point */
  const [vx, vy] = axP([0, 1]);
  dot(vx, vy, 13, 'g', ra);
  txt('(0, 1)', vx + 18, vy + 8, { size: 24, fam: F.math, w: 700, c: C.now, a: ra });
  /* line 1: flat first; line 2: tilted first */
  const pA = clamp((u - phraseAt(S, 1, 'Pull halfway')) / 3.0), pB = clamp((u - lineAt(S, 2).s - 0.2) / 2.6);
  axPath([[0, 1], P.a1, P.a2], pA, C.white, a, false);
  axPath([[0, 1], P.b1, P.b2], pB, C.white, a * 0.9, true);
  if (pA >= 1) { dot(...axP(P.a2), 12, 'w', a); }
  if (pB >= 1) { dot(...axP(P.b2), 12, 'w', a); }
  /* the gap, magenta */
  const ga = a * Q(S, 2, 'instead of four', 0.5);
  if (ga > 0) {
    const [x1, y1] = axP(P.a2), [x2, y2] = axP(P.b2);
    line(x1, y1 + 26, x2, y2 + 26, C.mag, ga, 5);
    txt(`gap ${(P.b2[0] - P.a2[0]).toFixed(3)}`, Math.min(x1, x2) - 16, y1 + 34, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: ga });
  }
  /* right: the hand computation */
  const px = 1000, py = 200;
  panel(px, py, 820, 660, a * at(S, 0, 0.6), C.cyan, 'PULL TOWARD A RAIL · 往轨道上拉');
  rrRich([['K(n, c) v = c v + (1 − c)(n · v) n', C.white]], px + 24, py + 76, { size: 28, a: ra });
  txt('move the fraction 1 − c of the way to the rail · 朝轨道走 1 − c 的路', px + 24, py + 112, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ra });
  const r1 = a * at(S, 1, 0.6);
  rrRich([['n = (1, 0),  c = 1/2;   m = (3/5, 4/5),  d = 1/3', C.cyan]], px + 24, py + 170, { size: 24, a: r1 * fixA });
  txt('θ₀ = 53.1°', px + 24 + 680, py + 170, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: r1 * fixA });
  rrRich([['flat first:    (0, 1) → (0, 1/2) → ', C.white], ['(4/25, 19/50)', C.white]], px + 24, py + 226, { size: 24, a: r1 * clamp(pA * 1.3) * fixA });
  rrRich([['tilted first:  (0, 1) → (8/25, 19/25) → ', C.white, 0.85], ['(8/25, 19/50)', C.white]], px + 24, py + 270, { size: 24, a: a * clamp(pB * 1.3) * fixA });
  rrRich([['gap = (', C.white], ['4/25', C.mag], [', 0)', C.white]], px + 24, py + 316, { size: 26, a: ga * fixA });
  /* line 3: the Lean identity */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0) {
    rrLean(px + 24, py + 380, RR_LEAN.axisContraction_commutator, la, { size: 18 });
    rrRich([['[K(n,c), K(m,d)] = (1−c)(1−d)(n·m)(n mᵀ − m nᵀ)', C.white]], px + 24, py + 428, { size: 24, a: la });
    rrRich([['(1/2)(2/3)(3/5) · 4/5 = ', C.white, 0.85], ['4/25', C.mag], ['   computed here', C.dim]], px + 24, py + 470, { size: 22, a: la * Q(S, 3, 'the exact gap', 0.5) * fixA });
    const lb = a * Q(S, 3, 'It vanishes', 0.6);
    rrLean(px + 24, py + 530, RR_LEAN.axisContraction_commutator_ne_zero_of_nonparallel_nonorthogonal, lb, { size: 18 });
    txt('n ≠ 0, m not a multiple of n, n·m ≠ 0, c, d ≠ 1  ⟹  ≠ 0', px + 24, py + 572, { size: 19, fam: F.math, w: 700, c: C.white, a: lb });
    txt('n·m = 0 or m ∥ n  ⟹  0 · 平行或垂直时为零', px + 24, py + 606, { size: 19, fam: F.zh, w: 700, c: C.white, a: lb * 0.85 });
    txt('as unread blur: unit axes, c, d ∈ [0, 1] · 未读信道：单位轴', px + 24, py + 640, { size: 18, fam: F.zh, w: 700, c: C.dim, a: lb * 0.85 });
    /* the live sweep */
    if (sw > 0) {
      txt(`θ = ${(th / RR_DEG).toFixed(1)}°   gap = ${(P.b2[0] - P.a2[0]).toFixed(3)}`, AX.ox + 40, 210, { size: 24, fam: F.mono, w: 700, c: C.now, a: lb });
    }
  }
};

/* ======================================================================= */
/*                           scene 6 · WHAT IT DOES NOT SAY                  */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = rrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'joint inverse gate', 'argued'], [1, null, 'argued'], [2, null, 'open']]);
  const y = 210, h = 600, w = 520;
  /* panel 1: conjugation is an inverse only for unit overlaps */
  const a1 = a * at(S, 0, 0.6);
  panel(120, y, w, h, a1, C.cyan, 'NOISY COPY · 带噪副本');
  rrCard(250, y + 60, 280, 240, 'c = 3/10', [0.3, 0], '|c| < 1', a1, { R: 70 });
  rrTape(150, y + 380, [['', '1/2', C.white, 1], ['× 3/10 →', '3/20', C.white, 1], ['conj→', '9/200', C.white, Q(S, 0, 'Noisy copies', 0.5)]], a1, 28);
  txt('conjugating multiplies again · 共轭只会再乘一次', 150, y + 430, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a1 });
  const g = a * Q(S, 0, 'joint inverse gate', 0.6);
  txt('joint inverse gate U† · 联合逆门', 150, y + 500, { size: 22, fam: F.zh, w: 700, c: C.argued, a: g });
  txt('hand-derived model · 手工推导', 150, y + 534, { size: 18, fam: F.zh, w: 700, c: C.argued, a: g * 0.85 });
  /* panel 2: the reading */
  const a2 = a * at(S, 1, 0.6);
  panel(660, y, w, h, a2, C.argued, 'READING · 诠释');
  if (a2 > 0) {
    for (let j = 0; j < 7; j++) { const t = (200 + 140 * j / 6) * RR_DEG; const dx = 920 + 200 * Math.cos(t), dy = y + 170 - 130 * Math.sin(t); dashed(dx, dy, 920, y + 180, C.argued, a2 * 0.35, 1.2); dot(dx, dy, 11, 'v', a2); }
    box(860, y + 120, 120, 60, C.argued, a2, 1.8);
    txt('fact', 920, y + 160, { size: 26, fam: F.math, w: 700, align: 'center', c: C.argued, a: a2 });
    txt('fact = what many records agree on', 690, y + 420, { size: 20, fam: F.mono, w: 700, c: C.argued, a: a2 });
    txt('事实 = 许多记录一致之处', 690, y + 456, { size: 22, fam: F.zh, w: 700, c: C.argued, a: a2 });
    txt('MODEL · the book\'s reading, not a theorem', 690, y + 520, { size: 17, fam: F.mono, w: 700, c: C.argued, a: a2 * 0.9 });
    txt('本书的诠释，不是定理', 690, y + 552, { size: 20, fam: F.zh, w: 700, c: C.argued, a: a2 * 0.9 });
  }
  /* panel 3: the open problem */
  const a3 = a * at(S, 2, 0.6);
  panel(1200, y, w, h, a3, C.open, 'OPEN · 开放问题');
  if (a3 > 0) {
    const cx = 1460, cy = y + 230;
    dot(cx - 110, cy, 22, 'c', a3 * 0.8); dot(cx + 110, cy, 22, 'm', a3 * 0.8);
    txt('0', cx - 110, cy + 60, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: a3 });
    txt('1', cx + 110, cy + 60, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: a3 });
    txt('?', cx, cy + 14, { size: 60, fam: F.math, w: 900, align: 'center', c: C.open, a: a3 });
    txt('one outcome, not a blend', 1230, y + 420, { size: 20, fam: F.mono, w: 700, c: C.open, a: a3 });
    txt('单次选支：为何只看到一个结果', 1230, y + 456, { size: 22, fam: F.zh, w: 700, c: C.open, a: a3 });
    txt('records and blurring do not settle it', 1230, y + 520, { size: 17, fam: F.mono, w: 700, c: C.open, a: a3 * 0.9 });
    txt('记录与模糊化都不回答这一问', 1230, y + 552, { size: 20, fam: F.zh, w: 700, c: C.open, a: a3 * 0.9 });
  }
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 270 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 960, cy: 420, camZ: 7, lw: 1.3, dots: false });
  RR_ROW.forEach((z, l) => rrCard(svX(l), 600, SV.w, SV.h, l === RR_K ? 'copy k = 5' : `copy ${l}`, z, RR_ROW_LABEL[l], 1, { undone: l === RR_K ? 0 : 1, focus: l === RR_K ? 1 : 0, R: 48, ts: 20, ls: 22, us: 16 }));
  txt(DATA.film.title_zh, W / 2, 330, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ONE SURVIVING COPY', W / 2, 430, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('BLOCKS THE UNDO', W / 2, 494, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, W / 2, 210, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
