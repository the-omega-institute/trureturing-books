/* Long film · One Axiom, No Infinity · 一条公理，没有无穷 (book omega-math).
   One act per part of the book, spliced in order; each act keeps its own namespace and scene prefix,
   and the shared SPINE draws the act title cards, the position rail and the hand-over questions. */
/* ==== SPINE:BEGIN — shared by every act of this film. Copy verbatim; never edit inside an act. ==== */
const SPINE = (() => {
  /* the rungs of the ladder: index 0 = prelude, 1..6 = Volumes I–VI, 7 = coda */
  const PARTS = [
    { tag: 'PRELUDE', zh: '前言', key_en: 'one axiom, no infinity', key_zh: '一条公理，没有无穷' },
    { tag: 'VOLUME I', zh: '第一卷', key_en: 'numbers without an origin', key_zh: '没有原点的数' },
    { tag: 'VOLUME II', zh: '第二卷', key_en: 'rotation without π', key_zh: '不用 π 的旋转' },
    { tag: 'VOLUME III', zh: '第三卷', key_en: 'calculus without limits', key_zh: '不取极限的微积分' },
    { tag: 'VOLUME IV', zh: '第四卷', key_en: 'harmonics on the three-sphere', key_zh: '三维球面上的谐波' },
    { tag: 'VOLUME V', zh: '第五卷', key_en: 'primes without the complex plane', key_zh: '不借复平面的素数' },
    { tag: 'VOLUME VI', zh: '第六卷', key_en: 'a machine and its observer', key_zh: '机器与观察者' },
    { tag: 'CODA', zh: '终章', key_en: 'what the kernel checked', key_zh: '内核查过的账' }
  ];
  const X0 = 60, Y = 128, STEP = 24;
  /* the position rail, top left under the SEQ line (dots on y = 128, the label on a second line just above the safe area,
     clear of the centred evidence badge): passed rungs cyan, the current one amber, later ones dim */
  function rail(S, idx, a = 1) {
    if (a <= 0.003) return;
    for (let i = 0; i < PARTS.length; i++) {
      const x = X0 + i * STEP;
      if (i === idx) { ring(x, Y, 9, C.now, a, 2); dot(x, Y, 7, 'g', a); }
      else if (i < idx) dot(x, Y, 5, 'c', a * 0.7);
      else ring(x, Y, 4, C.dim, a * 0.5, 1.2);
      if (i + 1 < PARTS.length) line(x + 8, Y, x + STEP - 8, Y, i < idx ? C.cyan : C.dim, a * (i < idx ? 0.5 : 0.25), 1);
    }
    const p = PARTS[idx];
    txt(`${p.tag} · ${p.zh} · ${p.key_en} · ${p.key_zh}`, X0 - 6, Y + 28,
      { size: 13, fam: F.mono, w: 700, c: C.now, a: a * 0.9, ls: 1.5 });
  }
  /* the act's title card, shown during the lead of the act's first scene (before its first line) */
  function title(S, idx, title_zh, title_en, o = {}) {
    const u = S.u, end = o.until != null ? o.until : Math.max(1.6, lineAt(S, 0).s - 0.05);
    const a = clamp(u / 0.45) * (1 - clamp((u - (end - 0.55)) / 0.55));
    if (a <= 0.003) return;
    const p = PARTS[idx], k = clamp(u / 1.2);
    fillBox(0, 0, W, H, C.bg, a * 0.55);
    txt(`${p.tag} · ${p.zh}`, W / 2, 380, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
    txt(title_zh, W / 2, 500, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: a * clamp(k * 1.6), ab: 3 });
    txt(scramble(title_en.toUpperCase(), k, idx + 7), W / 2, 590, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a, ls: 6, ab: 1.5 });
    txt(`${p.key_en} · ${p.key_zh}`, W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * 0.9, ls: 3 });
  }
  /* the question an act hands to the next one, from the start of line k to the end of the scene */
  function ask(S, k, en, zh, o = {}) {
    const a = at(S, k, 0.6) * (o.a == null ? 1 : o.a);
    if (a <= 0.003) return;
    const y = o.y || 668, w = 1280, x = W / 2 - w / 2;
    panel(x, y, w, 132, a, C.cyan, 'NEXT QUESTION · 下一问');
    txt(en, W / 2, y + 72, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a });
    txt(zh, W / 2, y + 114, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * 0.9 });
  }
  return { PARTS, rail, title, ask };
})();
/* ==== SPINE:END ==== */
'use strict';

/* ---- b00 · One axiom, no infinity · 一条公理，没有无穷 ---- */
/* Act b00 of the film One axiom, no infinity (book omega-math): the prelude.
     b00_title   a ruler tilted through slopes 0, 1, 4 to upright: 1 / 0 has no value (computed); the name ∞ (argued)
     b00_bills   the prelude's three hidden fees: completed infinity, the uncomputable continuum, π and e by endless
                 steps (argued; Turing 1936, Hermite 1873, Lindemann 1882 as the prelude cites); half-perimeters
                 N sin(π/N) of inscribed N-gons, N = 6 … 96 (computed)
     b00_ring    [p : q] ↦ ((q² − p²)/(p² + q²), 2pq/(p² + q²)); [0 : 1] → (1, 0), [1 : 1] → (0, 1),
                 [1 : 0] → (−1, 0) with denominator 1 (computed)
                   ..... OmegaCircleClosure.cayley_circle_unit, OmegaCircleClosure.cayley_antipodal_closure (LEAN)
     b00_ledger  the zero-axiom ledger: libraries {OmegaInit, OmegaMath}, axioms [] for the circle theorem, from the
                 pinned frozen state Golden/Frozen/state/D5/S3/Quantum/AURICOmega/OmegaCircleClosure.lean.json;
                 the real shadow imports Mathlib (same state record for OmegaShadowBridge); chapter 18 reports its
                 axioms lie within the classical closure {propext, Classical.choice, Quot.sound} (argued, not in the state)
                   ..... OmegaShadowBridge.cayley_circle_unit (LEAN, its statement only)
                 a schematic typeclass for selected AXIOM-Ω equations (argued, chapter 1)
     b00_road    the eight rungs of SPINE.PARTS as one road (argued: a way to read the book)
     b00_ask     the next question.
   FILM.init re-derives every number on screen by a second route and checks the three citations. */
const B00 = (() => {
  const LEAN = {
    unit: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit',
    pole: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure',
    shadow: 'D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit'
  };
  /* from the pinned frozen state records */
  const LIB_CORE = 'OmegaInit · OmegaMath';
  const LIB_SHADOW = 'Batteries · Init · Mathlib · OmegaInit · OmegaMath';

  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const neg = n => (n < 0 ? '−' + Math.abs(n) : String(n));
  /* the rational Cayley image of [p : q], as integer numerators over d = p² + q² */
  const cay = (p, q) => ({ xn: q * q - p * p, yn: 2 * p * q, d: p * p + q * q });
  const red = (n, d) => { if (n === 0) return '0'; const g = gcd(n, d); return d / g === 1 ? neg(n / g) : `${neg(n / g)}/${d / g}`; };
  const rowOf = (p, q) => {
    const c = cay(p, q);
    return { lhs: `[${neg(p)} : ${neg(q)}]`, raw: `(${neg(c.xn)}/${c.d}, ${neg(c.yn)}/${c.d})`, val: `(${red(c.xn, c.d)}, ${red(c.yn, c.d)})`, c };
  };
  const ROWS = { a: rowOf(0, 1), b: rowOf(1, 1), pole: rowOf(1, 0) };

  /* the ruler: slopes p/q at the stops, the last one upright */
  const STOPS = [[0, 1], [1, 1], [4, 1], [1, 0]];
  const slopeText = ([p, q]) => (q === 0 ? `${p} / 0 = ` : `${p} / ${q} = ${String(p / q)}`);
  const angleOf = ([p, q]) => Math.atan2(p, q);

  /* the dots of the ruler: every reduced p/q with 1 ≤ q ≤ 6, |p/q| ≤ 3.5 */
  const SLOPES = (() => {
    const s = new Map();
    for (let q = 1; q <= 6; q++) for (let p = -21; p <= 21; p++) if (gcd(p, q) === 1 && Math.abs(p / q) <= 3.5) s.set(p / q, [p, q]);
    return [...s.values()].sort((u, v) => u[0] / u[1] - v[0] / v[1]);
  })();

  /* inscribed regular N-gons: half the perimeter, N sin(π/N) */
  const POLY = [6, 12, 24, 48, 96].map(N => ({ N, h: N * Math.sin(Math.PI / N) }));

  /* the ring geometry */
  const CX = 1200, CY = 510, R = 240, RULER_X = CX + R, PX = 86;
  /* where slope s (or the pole) sits on the straight ruler and on the ring, for the bend m in [0, 1] */
  function bentPoint(phi, m) {
    const s = Math.tan(phi / 2), sc = Math.max(-3.5, Math.min(3.5, s));
    const lx = RULER_X, ly = CY - sc * PX;
    const rx = CX + R * Math.cos(phi), ry = CY - R * Math.sin(phi);
    return [lerp(lx, rx, m), lerp(ly, ry, m)];
  }

  /* the evidence badge: the engine's shared, centred badge (as in every act) */
  const tagQ = (S, seq) => badgeQ(S, seq);
  /* a LEAN ✓ chip for one cited theorem, looked up by its whole GID; it shows Module.name (the full GID is listed
     on the film page), large enough to read at 720p */
  function leanChip(x, y, gid, a, size = 20) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 16;
    fillBox(x, y - size * 1.05, wh, size * 1.4, C.lean, a);
    txt(head, x + 8, y - size * 0.08, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(gid.split('/').pop(), x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  const fadeS = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  /* a small purple note: this is a reading, a picture, or a reported fact, not a kernel result */
  function note(s, x, y, a, o = {}) {
    if (a <= 0.003) return;
    txt(s, x, y, { size: o.size || 20, fam: o.fam || F.mono, w: 700, c: C.argued, a, align: o.align || 'left', ls: 1 });
  }
  return { LEAN, LIB_CORE, LIB_SHADOW, gcd, neg, cay, red, ROWS, STOPS, slopeText, angleOf, SLOPES, POLY,
    CX, CY, R, RULER_X, PX, bentPoint, tagQ, leanChip, fadeS, note };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 12) E.push('one-axiom-no-infinity b00: ' + m); };
  const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;
  /* this act's three citations at the pinned commit, each looked up by its whole GID */
  const sig = k => { const r = leanCite(B00.LEAN[k]); check(r && r.kind === 'theorem', `${B00.LEAN[k]} is not a cited theorem`); return (r && r.signature) || ''; };
  const s1 = sig('unit'), s2 = sig('pole'), s3 = sig('shadow');
  check(s1.includes('Nonzero p q') && s1.includes('(IntRatio.ofInt Int.one)'), 'cayley_circle_unit signature');
  check(s2.includes('(cayleyX p Int.zero) (IntRatio.ofInt Int.one.neg)') && s2.includes('(cayleyY p Int.zero) (IntRatio.ofInt Int.zero)') && s2.includes('Not (Eq p Int.zero)'), 'cayley_antipodal_closure signature');
  check(s3.includes('toReal (cayleyX p q) ^ 2 + toReal (cayleyY p q) ^ 2 = 1'), 'shadow cayley_circle_unit signature');
  /* the three anchors, by a second route: the double angle of the ruler's direction */
  const want = { a: ['(1/1, 0/1)', '(1, 0)'], b: ['(0/2, 2/2)', '(0, 1)'], pole: ['(−1/1, 0/1)', '(−1, 0)'] };
  for (const k of Object.keys(want)) {
    const r = B00.ROWS[k];
    check(r.raw === want[k][0] && r.val === want[k][1], `anchor ${k}: ${r.raw} = ${r.val}`);
  }
  check(B00.ROWS.pole.c.d === 1, 'the pole has denominator 1');
  for (const [p, q] of [[0, 1], [1, 1], [1, 0], [-1, 1], [3, 4], [-2, 5]]) {
    const c = B00.cay(p, q), th = Math.atan2(p, q);
    check(near(c.xn / c.d, Math.cos(2 * th)) && near(c.yn / c.d, Math.sin(2 * th)), `double angle at [${p} : ${q}]`);
  }
  /* the circle identity on a box of integer pairs */
  for (let p = -30; p <= 30; p++) for (let q = -30; q <= 30; q++) {
    if (!p && !q) continue;
    const c = B00.cay(p, q);
    check(c.xn * c.xn + c.yn * c.yn === c.d * c.d && c.d > 0, `circle identity at [${p} : ${q}]`);
  }
  /* the ruler readouts */
  check(B00.STOPS.slice(0, 3).map(B00.slopeText).join('|') === '0 / 1 = 0|1 / 1 = 1|4 / 1 = 4', 'ruler readouts');
  /* half-perimeters by side doubling: s(2N) = sqrt(2 − sqrt(4 − s(N)²)), s(6) = 1 */
  let s = 1;
  B00.POLY.forEach((r, i) => {
    if (i) s = Math.sqrt(2 - Math.sqrt(4 - s * s));
    check(near(r.h, r.N * s / 2, 1e-9), `half-perimeter at N = ${r.N}`);
  });
  check(B00.POLY.map(r => r.h.toFixed(4)).join() === '3.0000,3.1058,3.1326,3.1394,3.1410', 'half-perimeters');
  check(B00.SLOPES.length > 40 && B00.SLOPES.every(([p, q]) => B00.gcd(p, q) === 1), 'ruler dots');
  check(SPINE.PARTS.length === 8, 'eight rungs');
});

/* ---------------------------------------------------------------- the ruler ---------------------------------------------------------------- */
SCENES.b00_title = S => {
  SPINE.title(S, 0, '一条公理，没有无穷', 'One axiom, no infinity');
  SPINE.rail(S, 0, at(S, 0, 0.6));
  const u = S.u, L0 = lineAt(S, 0), a = at(S, 0, 0.5, -0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0.003) return;
  B00.tagQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  /* stops from the fading title card to "The calculator": the first held 0.6 beat, then one beat each (a quick
     0.2-beat turn, then a hold), the last one upright */
  const t0 = L0.s - 0.3, t1 = phraseAt(S, 0, 'The calculator'), n = B00.STOPS.length - 1, beat = (t1 - t0) / (n + 0.6);
  const kf = clamp((u - t0) / beat - 0.6, 0, n), k = Math.floor(kf), fr = ease(clamp((kf - k) / 0.2));
  const cur = B00.STOPS[Math.min(k, n)], nxt = B00.STOPS[Math.min(k + 1, n)];
  const ang = lerp(B00.angleOf(cur), B00.angleOf(nxt), k >= n ? 0 : fr);
  const stop = fr > 0.98 || k >= n ? (k >= n ? n : k + 1) : k;
  const sp = B00.STOPS[stop];
  /* the ground, the ruler, its rise-over-run triangle */
  const px = 360, py = 780, Lr = 470;
  line(px - 60, py, px + 640, py, C.dim, a * 0.8, 2);
  const ex = px + Lr * Math.cos(ang), ey = py - Lr * Math.sin(ang);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.cyan; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore();
  for (let i = 1; i < 14; i++) {
    const d = i * 40, tx = px + d * Math.cos(ang), ty = py - d * Math.sin(ang), nx = -Math.sin(ang), ny = -Math.cos(ang);
    line(tx + nx * 4, ty + ny * 4, tx + nx * (i % 5 ? 14 : 24), ty + ny * (i % 5 ? 14 : 24), C.bg, a, 2.5);
  }
  dot(px, py, 12, 'w', a);
  const settled = fr > 0.98 || k >= n;
  if (settled) {
    const [p, q] = sp, m = Math.max(p, q), unit = 240 / m, rx = px + q * unit, ry = py - p * unit;
    if (q > 0) {
      dashed(px, py, rx, py, C.now, a, 3); dashed(rx, py, rx, ry, C.now, a, 3);
      txt(`run ${q}`, (px + rx) / 2, py + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a });
      txt(`rise ${p}`, rx + 16, (py + ry) / 2 + 8, { size: 24, fam: F.mono, w: 700, c: C.now, a });
    } else {
      txt('run 0', px, py + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
      txt('rise 1', px + 26, py - 140, { size: 24, fam: F.mono, w: 700, c: C.now, a });
    }
  }
  /* the readout */
  const bx = 1000, by = 330, bw = 700, bh = 300;
  panel(bx, by, bw, bh, a, C.cyan, 'SLOPE = RISE / RUN · 斜率 = 升 / 进');
  const err = Q(S, 0, 'error', 0.4), inf = Q(S, 1, 'infinity', 0.6);
  const upright = k >= n;
  if (!upright) txt(B00.slopeText(sp), bx + 60, by + 170, { size: 72, fam: F.orb, w: 900, c: C.white, a: a * (settled ? 1 : 0.55) });
  else {
    txt(B00.slopeText(sp), bx + 60, by + 170, { size: 72, fam: F.orb, w: 900, c: C.white, a });
    const w0 = tw(B00.slopeText(sp), 72, F.orb, 900);
    txt(scramble('ERROR', err, 4), bx + 60 + w0, by + 170, { size: 72, fam: F.orb, w: 900, c: C.mag, a: a * err * (1 - inf), ab: 4 });
    txt('∞', bx + 60 + w0 + 20, by + 180, { size: 110, fam: F.math, w: 700, c: C.mag, a: a * inf, ab: 3 });
    txt('no number answers 1 / 0', bx + 60, by + 250, { size: 24, fam: F.mono, w: 700, c: C.dim, a: a * err });
  }
  /* the name glued onto the crash */
  if (inf > 0) {
    chip(ex, ey - 64, 90, 76, '∞', C.mag, a * inf, 52, F.math);
    txt('a name, not a number · 一个名字，不是一个数', ex + 70, ey - 52, { size: 22, fam: F.mono, w: 700, c: C.mag, a: a * Q(S, 1, 'moves on', 0.6) });
  }
};

/* ---------------------------------------------------------------- three fees ---------------------------------------------------------------- */
SCENES.b00_bills = S => {
  const u = S.u, A = B00.fadeS(S);
  SPINE.rail(S, 0, A);
  B00.tagQ(S, [[0, null, 'argued']]);
  const who = Q(S, 3, 'who sent the bill', 0.6), dimK = 1 - 0.97 * who;
  const P = [[140, 0, 'FEE I · 实无穷', 'a finished infinity'], [680, 1, 'FEE II · 不可计算的连续统', 'a line of uncomputable points'], [1220, 2, 'FEE III · 超越常数', 'π and e by endless steps']];
  const y0 = 220, ph = 470, pw = 500;
  for (const [x, k, title, sub] of P) {
    const a = at(S, k, 0.6) * A * dimK;
    if (a <= 0.003) continue;
    panel(x, y0, pw, ph, a, C.mag, title);
    txt(sub, x + pw / 2, y0 + 84, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a });
    const cx = x + pw / 2, cy = y0 + 270;
    if (k === 0) {
      /* a box that is supposed to hold every natural number at once */
      box(cx - 190, cy - 90, 380, 180, C.mag, a, 2);
      const p = at(S, 0, 3.5, 0.3);
      for (let i = 0; i < 110; i++) {
        const r = rnd(i, 2), tx = cx - 172 + rnd(i, 7) * 344, ty = cy - 74 + rnd(i, 5) * 148;
        dot(tx, ty, 2.5 + 3 * r, 'm', a * clamp(p * 110 - i) * 0.9);
      }
      txt('{ 0, 1, 2, 3, … }  all at once', cx, cy + 140, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a });
      txt('ℵ₀ · a completed set', cx, cy + 176, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
    } else if (k === 1) {
      /* the line: a few points have recipes, almost all do not */
      line(cx - 220, cy, cx + 220, cy, C.white, a, 2);
      for (let i = 0; i < 260; i++) {
        const tx = cx - 220 + rnd(i, 9) * 440, ty = cy + (rnd(i, 11) - 0.5) * 28;
        fillBox(tx, ty, 2, 2, C.mag, a * 0.55);
      }
      for (const fx of [-180, -95, -20, 60, 130, 200]) dot(cx + fx, cy, 7, 'c', a);
      txt('cyan: points a finite program can write', cx, cy + 82, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
      txt('magenta haze: the rest, almost all of ℝ', cx, cy + 112, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
      txt('computable reals: countable, measure 0', cx, cy + 160, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
      txt('Turing 1936', cx, cy + 186, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
    } else {
      /* inscribed polygons creeping towards π, one doubling per beat */
      const p = at(S, 2, 0.6), i = Math.min(B00.POLY.length - 1, Math.floor(Math.max(0, u - lineAt(S, 2).s) / 0.75));
      const { N, h } = B00.POLY[i], r = 120, oy = cy - 30;
      ring(cx, oy, r, C.dim, a * 0.8, 1.5);
      ctx.save(); ctx.globalAlpha = a * p; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.beginPath();
      for (let j = 0; j <= N; j++) { const t = TAU * j / N; const X = cx + r * Math.cos(t), Y = oy - r * Math.sin(t); j ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
      ctx.stroke(); ctx.restore();
      txt(`N = ${N}:  N · sin(π/N) = ${h.toFixed(4)}…`, cx, cy + 140, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a });
      txt('π only when N → ∞', cx, cy + 176, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
    }
  }
  if (who > 0) {
    txt('WHO SENT THE BILL?', W / 2, 470, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.white, a: A * who, ab: 3, ls: 4 });
    txt('账单是谁寄来的？', W / 2, 550, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.white, a: A * who * 0.9 });
    B00.note('maybe only a habit of straight rulers · 也许只是直尺的习惯', W / 2, 700, A * Q(S, 3, 'the habit', 0.6), { align: 'center', size: 24 });
  }
};

/* ---------------------------------------------------------------- bend the ruler ---------------------------------------------------------------- */
SCENES.b00_ring = S => {
  const u = S.u, A = B00.fadeS(S);
  SPINE.rail(S, 0, A);
  B00.tagQ(S, [[0, null, 'computed'], [3, null, 'lean'], [4, null, 'argued']]);
  const { CX, CY, R } = B00;
  const m = ease(Q(S, 0, 'bend the ruler', 1.8));
  const ar = at(S, 0, 0.6, -0.4) * A;
  /* the ruler as a curve, parametrised by the ring angle φ (slope tan(φ/2)), bent by m */
  ctx.save(); ctx.globalAlpha = ar; ctx.strokeStyle = C.cyan; ctx.lineWidth = 5; ctx.beginPath();
  const NS = 240;
  for (let i = 0; i <= NS; i++) {
    const phi = -Math.PI + 0.02 + (TAU - 0.04) * i / NS, [x, y] = B00.bentPoint(phi, m);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.stroke(); ctx.restore();
  for (const [p, q] of B00.SLOPES) {
    const [x, y] = B00.bentPoint(2 * Math.atan2(p, q), m);
    dot(x, y, 6, 'w', ar * 0.85);
  }
  /* the two loose ends, labelled ∞, close into one point */
  const ends = 1 - clamp(m * 1.6);
  if (ends > 0) {
    const [tx, ty] = B00.bentPoint(Math.PI - 0.02, m), [bx2, by2] = B00.bentPoint(-Math.PI + 0.02, m);
    txt('∞ ?', tx + 22, ty + 4, { size: 34, fam: F.math, w: 700, c: C.mag, a: ar * ends });
    txt('∞ ?', bx2 + 22, by2 + 14, { size: 34, fam: F.math, w: 700, c: C.mag, a: ar * ends });
    txt('directions [p : q] on a straight ruler', B00.RULER_X - 30, CY + 6, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ar * ends });
  }
  if (m > 0.9) {
    line(CX - R - 40, CY, CX + R + 40, CY, C.dim, A * 0.4, 1);
    line(CX, CY - R - 40, CX, CY + R + 40, C.dim, A * 0.4, 1);
  }
  /* the formula and the worked anchors */
  const lx = 140, ly = 210, lw = 680;
  const fa = Q(S, 0, 'bend the ruler', 0.6, 1.2) * A, out4 = 1 - at(S, 4, 0.6);
  panel(lx, ly, lw, 640, fa, C.cyan, 'BEND · 只用整数乘、加、减');
  txt('[p : q]  ↦  ( x , y )', lx + 40, ly + 90, { size: 34, fam: F.math, w: 700, c: C.white, a: fa * out4 });
  txt('x = (q² − p²) / (p² + q²)', lx + 40, ly + 146, { size: 30, fam: F.math, w: 700, c: C.cyan, a: fa * out4 });
  txt('y = 2pq / (p² + q²)', lx + 40, ly + 192, { size: 30, fam: F.math, w: 700, c: C.cyan, a: fa * out4 });
  txt('a fraction is a pair of integers, never divided · 分数记成一对整数', lx + 40, ly + 228, { size: 16, fam: F.mono, w: 700, c: C.dim, a: fa * out4 });
  const rows = [[B00.ROWS.a, Q(S, 1, 'Zero, one', 0.5), 0, 'right'], [B00.ROWS.b, Q(S, 1, 'one, one', 0.5), 1, 'top'], [B00.ROWS.pole, Q(S, 2, 'lands at minus', 0.5), 2, 'left']];
  const curIdx = u >= phraseAt(S, 2, 'lands at minus') ? 2 : u >= phraseAt(S, 1, 'one, one') ? 1 : 0;
  rows.forEach(([r, p, i]) => {
    if (p <= 0) return;
    const y = ly + 270 + i * 62, now = i === curIdx && u < lineAt(S, 3).s;
    const col = now ? C.now : C.white;
    txt(`${r.lhs} → ${r.raw} = ${r.val}`, lx + 40, y, { size: 26, fam: F.math, w: 700, c: col, a: fa * p * out4 });
    const px = CX + R * r.c.xn / r.c.d, py = CY - R * r.c.yn / r.c.d;
    dot(px, py, now ? 13 : 9, now ? 'g' : 'c', A * p);
    if (now) ring(px, py, 22, C.now, A * p, 2);
    const off = { 0: [26, 8, 'left'], 1: [28, -16, 'left'], 2: [-26, 8, 'right'] }[i];
    txt(r.lhs, px + off[0], py + off[1], { size: 26, fam: F.mono, w: 700, c: now ? C.now : C.white, a: A * p, align: off[2] });
  });
  /* the upright ruler: the denominator is one */
  const dn = Q(S, 2, 'denominator one', 0.5);
  if (dn > 0) {
    txt('p² + q² = 1² + 0² = 1  ≠ 0', lx + 40, ly + 470, { size: 28, fam: F.math, w: 700, c: C.now, a: fa * dn * out4 });
    txt('no division by zero, no ∞', lx + 40, ly + 508, { size: 20, fam: F.mono, w: 700, c: C.dim, a: fa * dn * out4 });
  }
  /* the two theorems */
  const l3 = at(S, 3, 0.6) * A * out4;
  if (l3 > 0) {
    B00.leanChip(lx + 30, ly + 568, B00.LEAN.unit, l3 * Q(S, 3, 'exactly on the circle', 0.5), 18);
    B00.leanChip(lx + 30, ly + 614, B00.LEAN.pole, l3 * Q(S, 3, 'every upright pair', 0.5), 18);
    const ql = Q(S, 3, 'Lean confirms', 0.6);
    ring(CX, CY, R, C.lean, A * ql * 0.9 * (1 - 0.5 * at(S, 4, 0.6)), 3);
    txt('x² + y² ≡ 1 · every nonzero [p : q]', CX, CY + R + 52, { size: 24, fam: F.math, w: 700, align: 'center', c: C.lean, a: A * ql * out4 });
    txt('[p : 0] ↦ (−1, 0) · every p ≠ 0', CX, CY + R + 90, { size: 24, fam: F.math, w: 700, align: 'center', c: C.lean, a: A * Q(S, 3, 'every upright pair', 0.5) * out4 });
  }
  /* the aphorism */
  const ap = at(S, 4, 0.8) * A;
  if (ap > 0) {
    txt('Infinity was never a place.', lx + 40, ly + 330, { size: 40, fam: F.disp, w: 700, c: C.white, a: ap });
    txt('无穷大从来不是一个地方。', lx + 40, ly + 390, { size: 34, fam: F.zh, w: 900, c: C.white, a: ap * 0.9 });
    B00.note('a reading, not a theorem · 一种读法，不是定理', lx + 40, ly + 450, ap * Q(S, 4, 'loose end', 0.6));
    dot(CX - R, CY, 13, 'g', ap * (0.6 + 0.4 * Math.sin(u * 4)));
  }
};

/* ---------------------------------------------------------------- the ledger ---------------------------------------------------------------- */
SCENES.b00_ledger = S => {
  const u = S.u, A = B00.fadeS(S);
  SPINE.rail(S, 0, A);
  /* green only while a line states what a cited theorem states: the empty axiom list of the circle theorem, and
     "the same circle checks too" for its real shadow; the construction, the kitchen, the classical axioms and the
     contract are argued */
  B00.tagQ(S, [[0, null, 'lean'], [1, null, 'argued'], [2, null, 'lean'], [2, 'but its proof', 'argued'], [3, null, 'argued']]);
  /* left: the zero-axiom kernel ledger */
  const la = at(S, 0, 0.6, -0.3) * A, out4 = 1 - at(S, 3, 0.4);
  const x1 = 140, y1 = 200, w1 = 800, h1 = 400;
  panel(x1, y1, w1, h1, la * out4, C.cyan, 'STRICT D5 RECORD · 严格端记录');
  B00.leanChip(x1 + 30, y1 + 84, B00.LEAN.unit, la * out4, 20);
  txt('cayleyX² + cayleyY² ≡ 1   (fractions of integers)', x1 + 30, y1 + 136, { size: 22, fam: F.math, w: 700, c: C.white, a: la * out4 });
  txt(`libraries   ${B00.LIB_CORE}`, x1 + 30, y1 + 196, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: la * out4 });
  txt('strict_omega.axioms', x1 + 30, y1 + 266, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: la * out4 });
  const em = Q(S, 0, 'The list is empty', 0.6) * out4;
  txt('[ ]', x1 + 300, y1 + 284, { size: 66, fam: F.mono, w: 700, c: C.lean, a: la * em, ab: 2 });
  txt('separate official record · 官方端另记', x1 + 30, y1 + 320, { size: 17, fam: F.zh, w: 700, c: C.dim, a: la * em });
  txt('from the pinned frozen record · 取自所钉冻结记录', x1 + 30, y1 + 360, { size: 17, fam: F.mono, w: 700, c: C.dim, a: la * em });
  /* below: built from zero and successor */
  const ba = at(S, 1, 0.6) * A * out4;
  if (ba > 0) {
    const steps = ['zero', 'succ zero', 'succ (succ zero)', '…'], vals = ['0', '1', '2', ''];
    const sx = x1 + 20, sy = 700;
    steps.forEach((s, i) => {
      const p = clamp((u - lineAt(S, 1).s - 0.2 - i * 0.3) / 0.3);
      const x = sx + [0, 160, 380, 680][i];
      txt(s, x, sy, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: ba * p });
      if (vals[i]) txt(vals[i], x + tw(s, 26, F.mono, 700) / 2, sy + 44, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: ba * p * 0.8 });
      if (i < 3) arrow(x + tw(s, 26, F.mono, 700) + 10, sy - 9, x + [160, 220, 300][i] - 14, sy - 9, C.dim, ba * p, 2);
    });
    txt('integers and fractions are built on top · every step computes', sx, sy + 104, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ba * Q(S, 1, 'successor', 0.6) });
  }
  /* right: the classical shadow */
  const ra = at(S, 2, 0.6) * A * out4;
  const x2 = 980, w2 = 750;
  if (ra > 0) {
    panel(x2, y1, w2, h1, ra, C.dim, 'CLASSICAL SHADOW · 经典实数一侧');
    B00.leanChip(x2 + 30, y1 + 84, B00.LEAN.shadow, ra, 20);
    txt('toReal(x)² + toReal(y)² = 1   in ℝ', x2 + 30, y1 + 136, { size: 22, fam: F.math, w: 700, c: C.white, a: ra });
    txt('libraries', x2 + 30, y1 + 196, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt(B00.LIB_SHADOW, x2 + 30, y1 + 230, { size: 20, fam: F.mono, w: 700, c: C.white, a: ra });
    const ax = Q(S, 2, 'classical axioms', 0.6) * ra;
    txt('axioms', x2 + 30, y1 + 284, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt('⊆ { propext · Classical.choice · Quot.sound }', x2 + 30, y1 + 320, { size: 22, fam: F.mono, w: 700, c: C.argued, a: ax });
    B00.note('within the classical closure, as chapter 18 reports · 见第十八章', x2 + 30, y1 + 360, ax, { size: 17 });
  }
  /* the kitchen, beside the zero/succ chain */
  const ka = Q(S, 1, 'like a kitchen', 0.6) * A * out4;
  if (ka > 0) {
    const kx = 980, ky = 640;
    panel(kx, ky, 750, 200, ka, C.argued, 'A PICTURE, NOT A THEOREM · 比方');
    txt('a kitchen with no pantry', kx + 30, ky + 80, { size: 32, fam: F.disp, w: 700, c: C.white, a: ka });
    txt('pantry = axioms taken ready-made', kx + 30, ky + 118, { size: 20, fam: F.mono, w: 700, c: C.argued, a: ka });
    txt('garden = building by induction', kx + 30, ky + 148, { size: 20, fam: F.mono, w: 700, c: C.argued, a: ka });
    txt('没有储藏室的厨房：储藏室 = 现成的公理，菜园 = 归纳构造', kx + 30, ky + 182, { size: 20, fam: F.zh, w: 700, c: C.white, a: ka * 0.9 });
  }
  /* AXIOM-Ω: a contract, once the ledgers have faded */
  const ca = at(S, 3, 0.6, 0.4) * A;
  if (ca > 0) {
    panel(x1, 300, 1590, 400, ca, C.argued, 'AXIOM-Ω · 标题里的那一条公理');
    const cx = x1 + 60;
    txt('axiom kappa_refl : ∀ x, κ x x = 1', cx, 420, { size: 30, fam: F.mono, w: 700, c: C.mag, a: ca * 0.8 });
    const st = Q(S, 3, 'not a decree', 0.4);
    line(cx - 10, 410, cx - 10 + 640 * st, 410, C.mag, ca, 4);
    txt('a decree: assumed, never built · 敕令：只假定，不建造', cx + 700, 420, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ca * 0.8 });
    const cc = Q(S, 3, 'is a contract', 0.5);
    txt('class OmegaSpace (M : Type) where …', cx, 520, { size: 30, fam: F.mono, w: 700, c: C.cyan, a: ca * cc });
    txt('a contract: a model must be built · 契约：得造出一个模型', cx + 700, 520, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ca * cc });
    B00.note('Chapter 3 derives the laws on canonical representatives · 第三章在规范代表元上推导定律', cx, 620, ca * Q(S, 3, 'must build', 0.6), { size: 22 });
  }
};

/* ---------------------------------------------------------------- the road ---------------------------------------------------------------- */
SCENES.b00_road = S => {
  const u = S.u, A = B00.fadeS(S);
  SPINE.rail(S, 0, A);
  B00.tagQ(S, [[0, null, 'argued']]);
  const P = SPINE.PARTS, n = P.length, x0 = 190, x1 = 1640, y = 470;
  const xs = P.map((_, i) => x0 + (x1 - x0) * i / (n - 1));
  /* when each rung is named */
  const named = [0, Q(S, 0, 'numbers', 0.5), Q(S, 0, 'rotation', 0.5), Q(S, 0, 'change', 0.5), Q(S, 0, 'waves', 0.5), Q(S, 0, 'primes', 0.5), Q(S, 0, 'a machine', 0.5), Q(S, 2, 'The coda', 0.5)];
  named[0] = A;
  const curNamed = named.reduce((b, v, i) => (i && v > 0 ? i : b), 0);
  const base = at(S, 0, 0.6, -0.4) * A;
  for (let i = 0; i + 1 < n; i++) {
    const lit = named[i + 1];
    line(xs[i] + 16, y, xs[i + 1] - 16, y, C.dim, base * 0.4, 2);
    line(xs[i] + 16, y, lerp(xs[i] + 16, xs[i + 1] - 16, lit), y, C.cyan, base * 0.9, 3);
  }
  P.forEach((p, i) => {
    const x = xs[i], lit = i === 0 ? 1 : named[i], cur = i === curNamed && i > 0;
    if (i === 0) { ring(x, y, 20, C.now, base, 3); dot(x, y, 14, 'g', base); }
    else if (lit > 0) { dot(x, y, cur ? 14 : 11, 'c', base * lit); if (cur) ring(x, y, 22, C.cyan, base * lit, 2); }
    else ring(x, y, 9, C.dim, base * 0.6, 1.5);
    const up = i % 2 === 0, la = base * (0.35 + 0.65 * lit);
    const ty = up ? y - 120 : y + 70;
    txt(p.tag, x, ty, { size: 18, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.now : C.cyan, a: la, ls: 2 });
    txt(p.key_en, x, ty + 32, { size: 20, fam: F.disp, w: 700, align: 'center', c: C.white, a: la });
    txt(p.key_zh, x, ty + 62, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: la * 0.85 });
  });
  /* the crutches thrown away */
  /* the crutch each volume drops, as the prelude's §0.3 describes them: Volume I tames ∞ with integer pairs */
  const CR = [[1, 'infinity', '− ∞'], [2, ', pi,', '− π'], [3, 'limits', '− lim'], [5, 'the complex plane', '− ℂ']];
  for (const [i, ph, s] of CR) {
    const p = Q(S, 1, ph, 0.5) * A;
    if (p <= 0) continue;
    chip(xs[i], y + 186, tw(s, 24, F.math, 700) + 40, 44, s, C.mag, p, 24, F.math);
  }
  B00.note('one way to read the book · 本书的一种读法', W / 2, 800, base, { align: 'center', size: 22 });
};

/* ---------------------------------------------------------------- the next question ---------------------------------------------------------------- */
SCENES.b00_ask = S => {
  const u = S.u, A = B00.fadeS(S);
  SPINE.rail(S, 0, A);
  /* the road, small, with Volume I next */
  const P = SPINE.PARTS, n = P.length, x0 = 560, x1 = 1360, y = 260;
  const out = 1 - 0.5 * at(S, 1, 0.6);
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * i / (n - 1);
    if (i + 1 < n) line(x + 10, y, x + (x1 - x0) / (n - 1) - 10, y, C.dim, A * 0.4 * out, 1.5);
    if (i === 0) { ring(x, y, 13, C.now, A * out, 2); dot(x, y, 9, 'g', A * out); }
    else if (i === 1) { ring(x, y, 12 + 4 * Math.sin(u * 3), C.cyan, A * out, 2); dot(x, y, 7, 'c', A * out); }
    else ring(x, y, 6, C.dim, A * 0.6 * out, 1.2);
  }
  txt('next · VOLUME I · numbers without an origin', x0 + (x1 - x0) / (n - 1), y + 50, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: A * out });
  /* the bottom floor: nothing but zero and the next one */
  const b = at(S, 0, 0.8) * A;
  txt('0', W / 2 - 170, 520, { size: 120, fam: F.disp, w: 900, align: 'center', c: C.white, a: b, ab: 2 });
  arrow(W / 2 - 100, 486, W / 2 + 90, 486, C.cyan, b * Q(S, 0, 'the very bottom', 0.6), 3);
  txt('succ', W / 2, 462, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: b * Q(S, 0, 'the very bottom', 0.6) });
  txt('1', W / 2 + 170, 520, { size: 120, fam: F.disp, w: 900, align: 'center', c: C.white, a: b * Q(S, 0, 'borrowing nothing', 0.6), ab: 2 });
  txt('nothing borrowed · 什么都不借', W / 2, 600, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: b * Q(S, 0, 'borrowing nothing', 0.6) });
  SPINE.ask(S, 1, 'With only finite rational steps, what is a number?', '只许有限步、只用有理数，数是什么？');
};

/* ---- b01 · Foundations and homogeneous rational numbers · 公理地基与齐次有理数 ---- */
/* Film act b01 · One Axiom, No Infinity · Volume I (chapters 1–3): Foundations and homogeneous rational numbers.
   What each scene shows, and where it rests:
     b01_title    the kernel's natural numbers as finite stacks of "one more" on a zero; no ℝ, ∞, π built in (chapter 1.1).
     b01_floor    the three axioms Omega Math avoids; equality of fractions decided by cross multiplication; the precision
                  contract ε = 1/M and the fractions of [0, 1] with denominator ≤ M, their count and smallest gap
                  (computed here, exactly; chapter 1.2).
     b01_axiom    AXIOM-Ω: the triad [x, y, z], the reading κ and the three laws; a stand-in origin; class, not axiom
                  (the book's definition, a model: argued; chapter 1.3–1.4).
     b01_circle   [P : Q] → cayleyX = (Q² − P²)/(P² + Q²), cayleyY = 2PQ/(P² + Q²) as the string from the pin (−1, 0)
                  through the mark t = P/Q; [1 : 2] → (3/5, 4/5) (computed) ..... OmegaCircleClosure.cayley_circle_unit
                  (LEAN); [p : 0] → κ = 0, s = 1, (−1, 0) ..... OmegaCircleClosure.cayley_antipodal_closure (LEAN).
     b01_flat     projectiveMul(1, 2, 1, 3) = (5, 5) ~ [1 : 1], symmetric in its factors (computed); law III fails for
                  this projective circle (chapter 2.3).
     b01_ternion  canonical names of rays of integer quaternions (computed); p_Half = (1, 1, 0, 0), q_Half = (1, 0, 1, 0)
                  act as quarter turns about x and y; triad(p_Half, p0, q_Half) = (1, 1, 1, 1),
                  triad(q_Half, p0, p_Half) = (1, 1, 1, −1) ..... OmegaComposeAndWitnesses.phalf_qhalf_noncommutative (LEAN).
     b01_ask      the composition used p0 = (1, 0, 0, 0) as its bridge; the next question.
   On load, FILM.init re-derives every number on screen by an independent route and checks the cited theorems;
   any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
const B01 = (() => {
  const GID = {
    unit: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit',
    anti: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure',
    noncomm: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative'
  };
  /* ---------- exact arithmetic ---------- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const red = (n, d) => { const g = gcd(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
  const fr = ([n, d]) => (d === 1 ? String(n) : `${n}/${d}`).replace('-', '−');
  /* readings of the homogeneous pair [P : Q] (chapter 2): κ = Q²/(P²+Q²), s = P²/(P²+Q²), the Cayley point */
  function reading(P, Q) {
    const d = P * P + Q * Q;
    return { d, kappa: red(Q * Q, d), spread: red(P * P, d), X: red(Q * Q - P * P, d), Y: red(2 * P * Q, d) };
  }
  const pmul = (p1, q1, p2, q2) => [p1 * q2 + q1 * p2, q1 * q2 - p1 * p2];
  /* integer quaternions (w, x, y, z) */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const conj = a => [a[0], -a[1], -a[2], -a[3]];
  const triad = (a, b, c) => qmul(qmul(a, conj(b)), c);
  function canon(a) {
    const g = a.reduce((s, v) => gcd(s, v), 0);
    const b = a.map(v => v / g), f = b.find(v => v !== 0);
    return b.map(v => (f < 0 ? -v : v) + 0);
  }
  const P0 = [1, 0, 0, 0], PH = [1, 1, 0, 0], QH = [1, 0, 1, 0];
  const PQ = triad(PH, P0, QH), QP = triad(QH, P0, PH);
  const RAW = [-2, 2, 2, 2];
  /* fractions of [0, 1] with denominator ≤ M */
  function grid(M) {
    const out = [];
    for (let d = 1; d <= M; d++) for (let n = 0; n <= d; n++) if (gcd(n, d) === 1) out.push([n, d]);
    out.sort((a, b) => a[0] * b[1] - b[0] * a[1]);
    let gap = null;
    for (let i = 1; i < out.length; i++) {
      const g = red(out[i][0] * out[i - 1][1] - out[i - 1][0] * out[i][1], out[i][1] * out[i - 1][1]);
      if (!gap || g[0] * gap[1] < gap[0] * g[1]) gap = g;
    }
    return { pts: out, gap };
  }
  const MS = [3, 5, 8, 12];
  const GRIDS = MS.map(grid);
  /* rational points on the circle: every coprime [P : Q] with |P|, |Q| ≤ 7 */
  const RAT = [];
  for (let P = -7; P <= 7; P++) for (let Q = 0; Q <= 7; Q++) {
    if (gcd(P, Q) !== 1 || (Q === 0 && P !== 1)) continue;
    const r = reading(P, Q); RAT.push({ P, Q, x: r.X[0] / r.X[1], y: r.Y[0] / r.Y[1], h: Math.max(Math.abs(P), Q) });
  }
  /* ---------- drawing helpers ---------- */
  function rail(S, a = 1) { SPINE.rail(S, 1, a * clamp((S.d - S.u) / 0.4)); }
  function leanChip(x, y, gid, a, size = 20) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.label || r.name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* the engine's status banner, at its default place */
  function status(S, seq) { badgeQ(S, seq); }
  function strike(x, y, w, a, col = C.mag) { line(x - 6, y + 4, x + w + 6, y - 14, col, a, 4); }
  /* a brick of the "one more" stack */
  function brick(x, y, w, h, label, col, a) {
    if (a <= 0.003) return;
    box(x, y, w, h, col, a, 1.6, rgba(col, 0.12));
    for (let k = 0; k < 2; k++) fillBox(x + w * (0.22 + 0.4 * k), y - 7, w * 0.16, 7, col, a * 0.8);
    txt(label, x + w / 2, y + h / 2 + 7, { size: 18, fam: F.mono, w: 700, align: 'center', c: col, a });
  }
  /* the circle stage of chapter 2: centre (cx, cy), radius R; math y points up */
  const CIRC = { cx: 690, cy: 505, R: 255 };
  const cpt = (x, y, o = CIRC) => [o.cx + o.R * x, o.cy - o.R * y];
  function circleRing(a, o = CIRC, col = C.cyan) { ring(o.cx, o.cy, o.R, col, a, 2.5); }
  /* the wireframe cube of the quarter turns: rotate its corners by m, project with a fixed camera */
  const CORN = []; for (let i = 0; i < 8; i++) CORN.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1]);
  const EDGES = []; for (let i = 0; i < 8; i++) for (let b = 1; b < 8; b <<= 1) if (!(i & b)) EDGES.push([i, i | b]);
  const FACES = { z: [4, 5, 7, 6], y: [2, 3, 7, 6] };  // the +z face (amber) and the +y face (cyan)
  const mat = (axis, t) => { const c = Math.cos(t), s = Math.sin(t);
    return axis === 'x' ? [[1, 0, 0], [0, c, -s], [0, s, c]] : [[c, 0, s], [0, 1, 0], [-s, 0, c]]; };
  const mm = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const mv = (A, v) => A.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  function camera(v, cx, cy, s) {
    /* world x right, y into the screen, z up; view from the front-right, slightly above */
    const yaw = -0.62, pitch = 0.42;
    const x1 = v[0] * Math.cos(yaw) + v[1] * Math.sin(yaw), y1 = -v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw);
    const z2 = v[2] * Math.cos(pitch) - y1 * Math.sin(pitch), d = y1 * Math.cos(pitch) + v[2] * Math.sin(pitch);
    return [cx + s * x1, cy - s * z2, d];
  }
  function cube(cx, cy, s, M, a) {
    if (a <= 0.003) return;
    const P = CORN.map(v => camera(mv(M, v), cx, cy, s));
    /* axes behind the cube */
    [['x', [1.9, 0, 0]], ['y', [0, 1.9, 0]], ['z', [0, 0, 1.9]]].forEach(([n, v]) => {
      const o = camera([0, 0, 0], cx, cy, s), e = camera(v, cx, cy, s);
      dashed(o[0], o[1], e[0], e[1], C.vio, a * 0.55, 1.4);
      txt(n, e[0] + 6, e[1] - 6, { size: 20, fam: F.math, w: 700, c: C.vio, a: a * 0.8 });
    });
    [['y', C.cyan], ['z', C.now]].forEach(([f, col]) => {
      const q = FACES[f].map(i => P[i]);
      ctx.save(); ctx.globalAlpha = a * 0.32; ctx.fillStyle = col; ctx.beginPath();
      q.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    });
    EDGES.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.white, a * 0.75, 1.6));
  }
  const tupleStr = q => `(${q.map(v => String(v).replace('-', '−')).join(', ')})`;
  return { GID, gcd, red, fr, reading, pmul, qmul, conj, triad, canon, P0, PH, QH, PQ, QP, RAW, grid, MS, GRIDS, RAT,
    rail, status, leanChip, strike, brick, CIRC, cpt, circleRing, mat, mm, mv, cube, tupleStr, CORN, FACES };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('b01: ' + m); };
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  /* the cited theorems at the pinned commit */
  Object.values(B01.GID).forEach(g => {
    const r = leanCite(g);
    check(r && r.kind === 'theorem', `${g} is not a cited theorem`);
  });
  /* the worked point [1 : 2]: by the definitions, and independently as the second hit of the string y = t(x + 1) */
  const r = B01.reading(1, 2);
  check(eq(r.X, [3, 5]) && eq(r.Y, [4, 5]) && eq(r.kappa, [4, 5]) && eq(r.spread, [1, 5]), '[1 : 2] readings');
  check(3 * 3 + 4 * 4 === 5 * 5, '9/25 + 16/25 = 1');
  { const t = 0.5, x = (1 - t * t) / (1 + t * t), y = t * (x + 1);
    check(Math.abs(x - 0.6) < 1e-12 && Math.abs(y - 0.8) < 1e-12 && Math.abs(x * x + y * y - 1) < 1e-12, 'string through t = 1/2'); }
  /* every pair used for the sprinkled points lands on the circle, exactly */
  B01.RAT.forEach(p => { const q = B01.reading(p.P, p.Q);
    check(q.X[0] * q.X[0] * q.Y[1] * q.Y[1] + q.Y[0] * q.Y[0] * q.X[1] * q.X[1] === q.X[1] * q.X[1] * q.Y[1] * q.Y[1], `[${p.P} : ${p.Q}] off the circle`); });
  /* the antipode [p : 0], p ≠ 0, and the anchors */
  [1, -1, 2, -3, 7].forEach(p => { const q = B01.reading(p, 0);
    check(eq(q.kappa, [0, 1]) && eq(q.spread, [1, 1]) && eq(q.X, [-1, 1]) && eq(q.Y, [0, 1]), `antipode [${p} : 0]`); });
  check(eq(B01.reading(0, 1).X, [1, 1]) && eq(B01.reading(1, 1).X, [0, 1]) && eq(B01.reading(1, 1).Y, [1, 1]), 'anchors');
  /* circle multiplication */
  check(eq(B01.pmul(1, 2, 1, 3), [5, 5]) && eq(B01.pmul(1, 3, 1, 2), [5, 5]), '[1:2] ⊙ [1:3] = (5, 5)');
  check(5 * 10 === 5 * 5 + 5 * 5, '5 · 10 = 5² + 5²');
  for (let i = 0; i < 200; i++) { const v = [0, 1, 2, 3].map(k => Math.floor(rnd(i, k) * 19) - 9);
    check(eq(B01.pmul(v[0], v[1], v[2], v[3]), B01.pmul(v[2], v[3], v[0], v[1])), 'circle product commutes'); }
  /* angles on the circle: atan(1/2) + atan(1/3) = 45°, so the doubled angles add to 90° */
  check(Math.abs(Math.atan2(4, 3) + Math.atan2(3, 4) - Math.PI / 2) < 1e-12, 'arcs add to a quarter');
  /* the precision grids: brute-force counts against Euler's totient, smallest gap 1/(M(M − 1)) */
  const phi = n => { let c = 0; for (let k = 1; k <= n; k++) if (B01.gcd(k, n) === 1) c++; return c; };
  B01.MS.forEach((M, i) => { const g = B01.GRIDS[i];
    let tot = 1; for (let k = 1; k <= M; k++) tot += phi(k);
    check(g.pts.length === tot, `grid ${M} has ${g.pts.length} points, expected ${tot}`);
    check(eq(g.gap, [1, M * (M - 1)]), `grid ${M} smallest gap`); });
  check(B01.GRIDS[3].pts.length === 47 && eq(B01.GRIDS[3].gap, [1, 132]), 'M = 12: 47 points, gap 1/132');
  /* quaternions: canonical names, the two orders, and their rays */
  check(eq(B01.canon(B01.RAW), [1, -1, -1, -1]), 'canon(−2, 2, 2, 2)');
  check(eq(B01.PQ, [1, 1, 1, 1]) && eq(B01.QP, [1, 1, 1, -1]), 'the two orders');
  check(B01.PQ[0] === B01.QP[0] && B01.PQ[3] === -B01.QP[3], 'k = l and k = −l forces l = 0');
  /* the quarter turns: Ad(p)v = p v p̄ / |p|² matches the rotation matrices the cubes use */
  const ad = (p, v) => { const w = B01.qmul(B01.qmul(p, [0, ...v]), B01.conj(p)), n = p.reduce((s, x) => s + x * x, 0); return w.slice(1).map(x => x / n); };
  const near = (u, v) => u.every((x, i) => Math.abs(x - v[i]) < 1e-12);
  [[1, 0, 0], [0, 1, 0], [0, 0, 1], [2, -1, 3]].forEach(v => {
    check(near(ad(B01.PH, v), B01.mv(B01.mat('x', Math.PI / 2), v)), 'Ad(p_Half) is a quarter turn about x');
    check(near(ad(B01.QH, v), B01.mv(B01.mat('y', Math.PI / 2), v)), 'Ad(q_Half) is a quarter turn about y');
    /* triad(p, p0, q) = p q acts as Ad(p) after Ad(q) */
    check(near(ad(B01.PQ, v), ad(B01.PH, ad(B01.QH, v))) && near(ad(B01.QP, v), ad(B01.QH, ad(B01.PH, v))), 'composition order');
  });
  check(!near(ad(B01.PQ, [0, 0, 1]), ad(B01.QP, [0, 0, 1])), 'the two orders move the top face differently');
});

/* ================================ scenes ================================ */
SCENES.b01_title = S => {
  const u = S.u, a0 = at(S, 0, 0.6);
  SPINE.title(S, 1, '公理地基与齐次有理数', 'Foundations and homogeneous rational numbers');
  SPINE.rail(S, 1, a0 * clamp((S.d - u) / 0.4));
  /* the stacks: zero, then one more, one more … */
  const grow = Q(S, 1, 'Every natural number', 3.2);
  const N = 7, bw = 120, bh = 46, gap = 34, x0 = 430, base = 760;
  for (let n = 0; n < N; n++) {
    const x = x0 + n * (bw + gap);
    const show = n === 0 ? a0 : n === 1 ? Q(S, 0, 'one move', 0.6) : clamp(grow * (N - 1) - (n - 1));
    if (show <= 0.003) continue;
    B01.brick(x, base - bh, bw, bh, 'zero', C.white, show);
    for (let k = 1; k <= n; k++) B01.brick(x, base - bh - k * (bh + 6), bw, bh, 'succ', C.cyan, show * clamp(show * n - (k - 1)));
    txt(String(n), x + bw / 2, base + 46, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.white, a: show });
  }
  txt('Nat := zero | succ n', x0, 230, { size: 34, fam: F.mono, w: 700, c: C.cyan, a: a0 });
  txt('every term is a finite tree · every recursion halts', x0, 270, { size: 22, fam: F.mono, c: C.dim, a: Q(S, 1, 'No stack', 0.6) });
  txt('… and no stack called ∞', x0 + N * (bw + gap) - 40, base + 46, { size: 22, fam: F.mono, c: C.dim, a: Q(S, 1, 'infinitely tall', 0.6) });
  /* what the kernel does not have */
  const q2 = Q(S, 2, 'Not the kernel', 0.5);
  const items = [['ℝ', 'real line'], ['∞', 'infinity'], ['π', 'pi']];
  items.forEach(([s, n], i) => {
    const y = 330 + i * 120, x = 1610, aa = q2 * clamp((u - phraseAt(S, 2, 'no real line') - i * 0.5) / 0.4 + 1);
    chip(x, y, 120, 84, s, C.white, aa, 52, F.math);
    txt(n, x, y + 64, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: aa });
    B01.strike(x - 60, y + 10, 120, Q(S, 2, i === 0 ? 'no real line' : i === 1 ? 'no infinity sign' : 'no pi', 0.4) * aa);
  });
  txt('not built in', 1610, 690, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: Q(S, 2, 'no pi', 0.5) });
};

SCENES.b01_floor = S => {
  const u = S.u;
  B01.rail(S);
  B01.status(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  /* the three conveniences, struck out */
  const top = 1 - at(S, 2, 0.6);
  const ax = [['Classical.choice', 'choice'], ['Quot.sound', 'quotients'], ['propext', 'propositional extensionality']];
  ax.forEach(([s, ph], i) => {
    const y = 300, x = 340 + i * 440, a = at(S, 0, 0.5) * (0.55 + 0.45 * Q(S, 0, ph, 0.5)) * top;
    chip(x + 170, y, 340, 64, s, C.white, a, 26);
    B01.strike(x, y + 4, 340, Q(S, 1, 'none of them', 0.4, i * 0.15) * a);
  });
  const a1 = at(S, 1, 0.6) * top;
  panel(340, 410, 1220, 300, a1, C.cyan, 'OMEGAINIT · OMEGAMATH · AXIOMS = ∅');
  txt('3/6  ≟  1/2', 420, 520, { size: 46, fam: F.math, w: 700, c: C.white, a: a1 });
  txt('decide:  3 · 2 = 6 · 1', 420, 600, { size: 38, fam: F.math, w: 700, c: C.cyan, a: a1 * Q(S, 1, 'integer by integer', 0.5) });
  txt('→ yes, in finitely many steps', 420, 660, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a1 * Q(S, 1, 'a program that halts', 0.5) });
  txt('equivalent ⇔ cross products agree', 1040, 520, { size: 26, fam: F.mono, w: 700, c: C.white, a: a1 * Q(S, 1, 'Equality is checked', 0.5) });
  txt('no quotient, no choice', 1040, 560, { size: 22, fam: F.mono, c: C.dim, a: a1 * Q(S, 1, 'Equality is checked', 0.5) });
  /* the precision contract: fractions of [0, 1] with denominator ≤ M */
  const a2 = at(S, 2, 0.7);
  if (a2 > 0.003) {
    const t0 = phraseAt(S, 2, 'Raise M'), t1 = lineAt(S, 3).e;
    const k = Math.max(0, Math.min(3, Math.floor(1 + 3 * (u - t0) / Math.max(0.5, t1 - t0))));
    const g = B01.GRIDS[u < t0 ? 0 : k], M = B01.MS[u < t0 ? 0 : k];
    const X0 = 300, X1 = 1620, Y = 560;
    line(X0, Y, X1, Y, C.cyan, a2 * 0.8, 2);
    g.pts.forEach(([n, d]) => {
      const x = X0 + (X1 - X0) * n / d, hh = 14 + 70 / d;
      line(x, Y - hh, x, Y + hh, d <= 2 ? C.white : C.cyan, a2 * (0.45 + 0.55 / Math.sqrt(d)), 2);
    });
    [[0, '0'], [1, '1'], [0.5, '1/2']].forEach(([v, s]) => txt(s, X0 + (X1 - X0) * v, Y + 112, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: a2 }));
    txt(`ε = 1/M  ·  M = ${M}`, X0, 330, { size: 46, fam: F.math, w: 700, c: C.now, a: a2 });
    txt(`${g.pts.length} fractions in [0, 1] with denominator ≤ ${M}`, X0, 390, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a2 });
    txt(`smallest gap  ${B01.fr(g.gap)}  > 0`, X0, 432, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a2 });
    const a3 = at(S, 3, 0.6);
    panel(1150, 300, 470, 140, a3, C.argued, 'ANALOGY · 比方');
    txt('pixels: always more,', 1175, 372, { size: 26, fam: F.mono, w: 700, c: C.white, a: a3 });
    txt('never infinitely many', 1175, 410, { size: 26, fam: F.mono, w: 700, c: C.white, a: a3 });
  }
};

SCENES.b01_axiom = S => {
  const u = S.u;
  B01.rail(S);
  B01.status(S, [[0, null, 'argued']]);
  /* two props removed */
  const q0 = at(S, 0, 0.5), out0 = 1 - at(S, 1, 0.5);
  chip(560, 330, 170, 90, '1', C.white, q0 * out0, 60, F.math);
  chip(860, 330, 170, 90, '+', C.white, q0 * out0, 60, F.math);
  B01.strike(475, 340, 170, Q(S, 0, 'privileged origin', 0.4) * out0);
  B01.strike(775, 340, 170, Q(S, 0, 'plus sign', 0.4) * out0);
  txt('origin', 560, 410, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q0 * out0 });
  txt('addition', 860, 410, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q0 * out0 });
  txt('?', 1160, 350, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.now, a: Q(S, 0, 'What is left', 0.5) * out0 });
  /* the triad: the step y → x carried over onto z; no axes, no origin */
  const a1 = at(S, 1, 0.6);
  const pt = { y: [270, 690], x: [500, 560], z: [300, 430] };
  const w = [pt.z[0] + pt.x[0] - pt.y[0], pt.z[1] + pt.x[1] - pt.y[1]];
  const stand = Q(S, 4, 'any point', 0.5);
  if (a1 > 0.003) {
    arrow(pt.y[0], pt.y[1], pt.x[0], pt.x[1], C.cyan, a1 * Q(S, 1, 'the step from y to x', 0.5), 3);
    const c = Q(S, 1, 'over onto z', 0.8);
    arrow(pt.z[0], pt.z[1], lerp(pt.z[0], w[0], c), lerp(pt.z[1], w[1], c), C.cyan, a1 * c, 3);
    [['x', pt.x], ['y', pt.y], ['z', pt.z]].forEach(([n, p]) => {
      dot(p[0], p[1], 11, 'w', a1); txt(n, p[0] + (n === 'x' ? 20 : n === 'y' ? -44 : -30), p[1] + (n === 'y' ? -18 : 8), { size: 32, fam: F.math, w: 700, c: C.white, a: a1 });
    });
    dot(w[0], w[1], 13, 'g', a1 * c);
    txt('[x, y, z]', w[0] + 22, w[1] + 8, { size: 32, fam: F.math, w: 700, c: C.now, a: a1 * c });
    const an = Q(S, 1, 'like directions', 0.5) * (1 - at(S, 2, 0.4));
    txt('analogy: “the bank is this far from the bakery;', 160, 790, { size: 21, fam: F.mono, c: C.argued, a: an });
    txt('go the same way from your door”', 160, 818, { size: 21, fam: F.mono, c: C.argued, a: an });
    /* the reading κ between two states */
    const a2 = at(S, 2, 0.6);
    const bx = 160, by = 790, bw = 560;
    box(bx, by - 22, bw, 26, C.cyan, a2, 1.2);
    const k = 0.25 + 0.75 * Math.pow(Math.sin(clamp((u - lineAt(S, 2).s) / 4) * Math.PI), 2);
    fillBox(bx + 3, by - 19, (bw - 6) * k, 20, C.cyan, a2 * 0.6);
    txt('κ(x, z)', bx, by - 36, { size: 26, fam: F.math, w: 700, c: C.cyan, a: a2 });
    txt('0', bx - 26, by, { size: 22, fam: F.math, c: C.white, a: a2 });
    txt('1', bx + bw + 12, by, { size: 22, fam: F.math, c: C.white, a: a2 });
    dashed(pt.x[0], pt.x[1], pt.z[0], pt.z[1], C.cyan, a2 * 0.6, 1.5);
    /* a stand-in zero */
    ring(pt.y[0], pt.y[1], 24 + 4 * Math.sin(u * 4), C.now, stand, 2.5);
    txt('o', pt.y[0] + 30, pt.y[1] + 44, { size: 28, fam: F.math, w: 700, c: C.now, a: stand });
  }
  /* the three laws */
  const a3 = at(S, 3, 0.6), out = 1 - at(S, 5, 0.6);
  panel(900, 240, 860, 560, a3 * out, C.argued, 'AXIOM-Ω · 母公理 · MODEL');
  const laws = [
    ['I', '[x, x, z] = z      [x, z, z] = x', 'a step to yourself'],
    ['', '[[x, y, z], u, v] = [x, y, [z, u, v]]', 'steps regroup freely'],
    ['II', 'κ([x, u, v], [y, u, v]) = κ(x, y)', 'carrying keeps every reading'],
    ['III', '[x, y, z] ≠ [z, y, x]  for some x, y, z', 'outer-slot order matters for some triple']
  ];
  laws.forEach(([n, f, ph], i) => {
    const y = 330 + i * 78, aa = a3 * out * Q(S, 3, ph, 0.5);
    txt(n, 935, y, { size: 26, fam: F.orb, w: 900, c: C.argued, a: aa });
    txt(f, 1010, y, { size: 31, fam: F.math, w: 700, c: C.white, a: aa });
  });
  const a4 = stand * out;
  txt('x ⋆ z := [x, o, z]     x⁻¹ := [o, x, o]', 1010, 670, { size: 31, fam: F.math, w: 700, c: C.now, a: a4 });
  txt('a group around any chosen o', 1010, 716, { size: 22, fam: F.mono, c: C.dim, a: a4 });
  txt('no point is royalty', 1010, 760, { size: 26, fam: F.mono, w: 700, c: C.white, a: Q(S, 4, 'No point is royalty', 0.5) * out });
  /* class, not axiom */
  const a5 = at(S, 5, 0.6);
  panel(900, 240, 860, 250, a5, C.dim, 'AXIOM · 硬塞的公理');
  txt('axiom kappa_refl : ∀ x, kappa x x = 1', 930, 330, { size: 24, fam: F.mono, w: 700, c: C.white, a: a5 });
  txt('trusted, never built: one bad edge case gives False', 930, 380, { size: 21, fam: F.mono, c: C.dim, a: a5 });
  B01.strike(925, 336, 560, Q(S, 5, 'sample class', 0.4) * a5);
  txt('an assumed equation', 930, 440, { size: 22, fam: F.mono, c: C.argued, a: Q(S, 5, 'six equations', 0.5) * a5 });
  const a6 = Q(S, 5, 'six equations', 0.5);
  panel(900, 520, 860, 280, a6, C.cyan, 'SCHEMATIC CLASS · 类型类示意');
  ['class OmegaSpace (M : Type) where', '  triad : M → M → M → M', '  kappa : M → M → QRat', '  idemp_left : ∀ x z, triad x x z = z  …'].forEach((s, i) =>
    txt(s, 930, 600 + i * 40, { size: 24, fam: F.mono, w: 700, c: i ? C.white : C.cyan, a: a6 }));
  txt('the prototype checks examples · 原型核验算例', 930, 780, { size: 21, fam: F.mono, c: C.argued, a: Q(S, 5, 'checks examples', 0.5) });
};

SCENES.b01_circle = S => {
  const u = S.u, o = B01.CIRC;
  B01.rail(S);
  B01.status(S, [[0, null, 'argued'], [2, null, 'computed'], [4, null, 'lean'], [6, null, 'argued']]);
  /* the open ruler: the vertical axis through the centre, marks t = P/Q */
  const a0 = at(S, 0, 0.6);
  line(o.cx, 185, o.cx, 830, C.white, a0 * 0.7, 2);
  [[-1, ''], [-0.5, '−1/2'], [0, '0'], [0.5, '1/2'], [1, '']].forEach(([t, s]) => {
    const y = o.cy - o.R * t;
    line(o.cx - 10, y, o.cx + 10, y, C.white, a0, 2);
    txt(s, o.cx + 18, y + 8, { size: 22, fam: F.math, w: 700, c: t === 0.5 ? C.white : C.dim, a: a0 });
  });
  txt('t = rise / run = P / Q', 160, 240, { size: 32, fam: F.math, w: 700, c: C.white, a: a0 });
  txt('run = 0  →  P / 0 ?', 160, 290, { size: 32, fam: F.math, w: 700, c: C.mag, a: Q(S, 0, 'divides by zero', 0.5) * (1 - at(S, 2, 0.6)) });
  /* infinity bolted on, later moved to the pin */
  const bolt = Q(S, 1, 'bolts infinity', 0.5), move = Q(S, 6, 'opposite home', 1.4);
  const pin = B01.cpt(-1, 0);
  [[180 - 8, -1], [830 + 34, 1]].forEach(([y, sgn]) => {
    const x = lerp(o.cx, pin[0] - 40, ease(move)), yy = lerp(y, pin[1] + 10 * sgn, ease(move));
    txt(sgn < 0 ? '+∞' : '−∞', x - 30, yy, { size: 30, fam: F.math, w: 700, c: move > 0.5 ? C.white : C.mag, a: bolt * (sgn > 0 ? 1 - move : 1) });
  });
  /* keep the pair */
  const pa = Q(S, 1, 'keep the pair', 0.5);
  /* the circle and the pin */
  const a2 = at(S, 2, 0.7);
  B01.circleRing(a2);
  dot(pin[0], pin[1], 13, 'w', a2);
  txt('pin', pin[0] - 70, pin[1] + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a2 * (1 - move) });
  /* the string from the pin through the mark t: the angle 2·atan t on the circle */
  const slide = Q(S, 5, 'rise one, run zero', 2.6);
  const th = lerp(2 * Math.atan(0.5), Math.PI, ease(slide));
  const hit = B01.cpt(Math.cos(th), Math.sin(th)), t = Math.tan(th / 2);
  const s2 = Q(S, 2, 'pull it through', 0.9);
  if (s2 > 0) {
    const mk = [o.cx, o.cy - o.R * t];
    const ex = lerp(pin[0], hit[0], s2), ey = lerp(pin[1], hit[1], s2);
    line(pin[0], pin[1], ex, ey, C.now, a2, 3);
    if (t < 1.28) dot(mk[0], mk[1], 8, 'g', a2 * (1 - slide));
    dot(hit[0], hit[1], 14, 'g', a2 * clamp(s2 * 3 - 2));
  }
  /* the anchors */
  const an = at(S, 3, 0.5) * (1 - slide);
  [[0, 1, '[0 : 1]'], [1, 1, '[1 : 1]']].forEach(([P, Q2, s]) => {
    const r = B01.reading(P, Q2), p = B01.cpt(r.X[0] / r.X[1], r.Y[0] / r.Y[1]);
    dot(p[0], p[1], 8, 'c', an);
    txt(s, p[0] + (P ? 16 : 18), p[1] + (P ? -16 : 8), { size: 22, fam: F.math, w: 700, c: C.cyan, a: an });
  });
  /* rational points of height ≤ 7, sprinkled */
  const sp = Q(S, 4, 'every integer pair', 1.6);
  B01.RAT.forEach((p, i) => { const q = B01.cpt(p.x, p.y); dot(q[0], q[1], 5, 'c', clamp(sp * B01.RAT.length / 8 - i / 8) * 0.85); });
  /* readout */
  const rx = 1110, ry = 230, ra = Math.max(pa, a2);
  panel(rx, ry, 680, 410, ra, C.cyan, 'READOUT · 读数');
  const r = B01.reading(1, 2), land = Q(S, 5, 'Every reading', 0.5);
  const A = 1 - land;
  txt('[P : Q] = [1 : 2]', rx + 30, ry + 86, { size: 40, fam: F.math, w: 700, c: C.now, a: pa * A });
  txt('X = (Q² − P²)/(P² + Q²) =', rx + 30, ry + 156, { size: 28, fam: F.math, w: 700, c: C.white, a: Q(S, 3, 'It meets the circle', 0.5) * A });
  txt(B01.fr(r.X), rx + 470, ry + 158, { size: 40, fam: F.math, w: 700, c: C.cyan, a: Q(S, 3, 'three fifths', 0.5) * A });
  txt('Y = 2PQ/(P² + Q²) =', rx + 30, ry + 216, { size: 28, fam: F.math, w: 700, c: C.white, a: Q(S, 3, 'It meets the circle', 0.5) * A });
  txt(B01.fr(r.Y), rx + 470, ry + 218, { size: 40, fam: F.math, w: 700, c: C.cyan, a: Q(S, 3, 'four fifths', 0.5) * A });
  txt('X² + Y² = 9/25 + 16/25 = 1', rx + 30, ry + 300, { size: 34, fam: F.math, w: 700, c: C.white, a: Q(S, 3, 'nine twenty-fifths', 0.6) * A });
  txt(`κ = ${B01.fr(r.kappa)}   s = ${B01.fr(r.spread)}   κ + s = 1`, rx + 30, ry + 360, { size: 24, fam: F.mono, w: 700, c: C.dim, a: Q(S, 3, 'exactly one', 0.6) * A });
  const z = B01.reading(1, 0);
  txt('[P : Q] = [1 : 0]', rx + 30, ry + 86, { size: 40, fam: F.math, w: 700, c: C.now, a: land });
  txt(`κ = ${B01.fr(z.kappa)}    s = ${B01.fr(z.spread)}`, rx + 30, ry + 170, { size: 34, fam: F.math, w: 700, c: C.white, a: land });
  txt(`(X, Y) = (${B01.fr(z.X)}, ${B01.fr(z.Y)})`, rx + 30, ry + 240, { size: 34, fam: F.math, w: 700, c: C.white, a: Q(S, 5, 'minus one, zero', 0.5) });
  txt('denominator P² + 0² = 1 > 0', rx + 30, ry + 300, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: land });
  /* the Lean citations */
  B01.leanChip(rx - 110, 700, B01.GID.unit, Q(S, 4, 'Lean checks', 0.5) * (1 - land), 18);
  txt('X² + Y² ≡ 1 for every integer pair with P ≠ 0 or Q ≠ 0', rx - 110, 742, { size: 20, fam: F.mono, c: C.lean, a: Q(S, 4, 'Lean checks', 0.5) * (1 - land) });
  B01.leanChip(rx - 110, 700, B01.GID.anti, land, 18);
  txt('for every p ≠ 0:  κ ≡ 0,  s ≡ 1,  (X, Y) ≡ (−1, 0)', rx - 110, 742, { size: 20, fam: F.mono, c: C.lean, a: land });
  /* infinity, relocated */
  txt('∞ was [1 : 0]: the point opposite home', rx + 30, ry + 376, { size: 26, fam: F.mono, w: 700, c: C.white, a: Q(S, 6, 'the point opposite home', 0.6) });
  const home = B01.cpt(1, 0);
  txt('home', home[0] + 18, home[1] + 8, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: Q(S, 6, 'opposite home', 0.5) });
  dot(home[0], home[1], 9, 'c', Q(S, 6, 'opposite home', 0.5));
};

SCENES.b01_flat = S => {
  const u = S.u, o = { cx: 520, cy: 500, R: 230 };
  B01.rail(S);
  B01.status(S, [[0, null, 'computed'], [2, null, 'argued']]);
  const a0 = clamp(u / 0.5);
  B01.circleRing(a0, o);
  const pts = [[1, 2, '[1 : 2]', C.cyan], [1, 3, '[1 : 3]', C.white], [1, 1, '[1 : 1]', C.now]];
  const home = B01.cpt(1, 0, o);
  dot(home[0], home[1], 8, 'c', a0);
  txt('[0 : 1]', home[0] + 34, home[1] + 30, { size: 22, fam: F.math, w: 700, c: C.dim, a: a0 });
  /* arcs from home: the angle of [1:2] plus the angle of [1:3] is the angle of [1:1] */
  const angA = Math.atan2(4, 3), angB = Math.atan2(3, 4);
  const qa = Q(S, 0, 'one-two', 0.6), qb = Q(S, 0, 'times one-three', 0.6), qc = Q(S, 0, 'five-five', 0.8);
  const arc = (from, to, r, col, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(o.cx, o.cy, r, -from, -to, true); ctx.stroke(); ctx.restore(); };
  arc(0, angA * qa, o.R + 18, C.cyan, qa);
  arc(angA, angA + angB * qb, o.R + 18, C.white, qb);
  pts.forEach(([P, Q2, s, col], i) => {
    const r = B01.reading(P, Q2), p = B01.cpt(r.X[0] / r.X[1], r.Y[0] / r.Y[1], o), a = [qa, qb, qc][i];
    dot(p[0], p[1], i === 2 ? 13 : 9, i === 2 ? 'g' : i ? 'w' : 'c', a);
    const top = i === 2;
    txt(`${s} → (${B01.fr(r.X)}, ${B01.fr(r.Y)})`, p[0] + (top ? -30 : 22), p[1] + (top ? -34 : -10), { size: 22, fam: F.math, w: 700, align: top ? 'right' : 'left', c: col, a });
  });
  /* the product formula and the swap */
  const fx = 990;
  panel(fx, 230, 820, 420, a0, C.cyan, 'CIRCLE PRODUCT · 圆群乘法');
  txt('(p₁, q₁) ⊙ (p₂, q₂) = (p₁q₂ + q₁p₂,  q₁q₂ − p₁p₂)', fx + 30, 300, { size: 27, fam: F.math, w: 700, c: C.white, a: a0 });
  const m = B01.pmul(1, 2, 1, 3), m2 = B01.pmul(1, 3, 1, 2);
  txt(`(1, 2) ⊙ (1, 3) = (${m[0]}, ${m[1]}) ~ [1 : 1]`, fx + 30, 380, { size: 34, fam: F.math, w: 700, c: C.now, a: qc });
  txt('norms: 5 × 10 = 50 = 5² + 5²', fx + 30, 430, { size: 24, fam: F.mono, w: 700, c: C.dim, a: qc });
  const sw = Q(S, 1, 'Swap the factors', 0.6);
  txt(`(1, 3) ⊙ (1, 2) = (${m2[0]}, ${m2[1]})`, fx + 30, 510, { size: 34, fam: F.math, w: 700, c: C.white, a: sw });
  txt('same', fx + 560, 510, { size: 30, fam: F.mono, w: 700, c: C.mag, a: Q(S, 1, 'nothing changes', 0.5) });
  txt('the formula is symmetric in its two factors', fx + 30, 600, { size: 22, fam: F.mono, c: C.dim, a: Q(S, 1, 'symmetric in the two inputs', 0.5) });
  /* law III fails */
  const a2 = at(S, 2, 0.6);
  txt('[a, b, c] = [c, b, a]  for all a, b, c', fx + 30, 720, { size: 34, fam: F.math, w: 700, c: C.white, a: a2 });
  txt('Law III fails on this circle · 圆周模型不满足第三条法则', fx + 30, 805,
      { size: 24, fam: F.zh, w: 700, c: C.argued, a: a2 });
};

SCENES.b01_ternion = S => {
  const u = S.u;
  B01.rail(S);
  B01.status(S, [[0, null, 'argued'], [1, null, 'computed'], [4, null, 'lean']]);
  /* four integers up to scale */
  const a0 = at(S, 0, 0.6), out0 = 1 - at(S, 2, 0.6);
  txt('[ w : x : y : z ]', W / 2, 330, { size: 76, fam: F.math, w: 700, align: 'center', c: C.white, a: Q(S, 0, 'four integers', 0.6) * out0, ab: 2 });
  txt('4 integers − 1 common scale = 3 degrees of freedom', W / 2, 400, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: Q(S, 0, 'up to scale', 0.6) * out0 });
  txt('PROJECTIVE QUATERNION ROTATIONS · 四元数射影旋转', W / 2, 250, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a0 * out0 });
  /* the canonical name */
  const a1 = at(S, 1, 0.6) * out0;
  const steps = [[B01.RAW, 'raw', C.white], [B01.RAW.map(v => v / 2), '÷ gcd 2', C.white], [B01.canon(B01.RAW), 'first nonzero > 0', C.now]];
  steps.forEach(([q, lab, col], i) => {
    const x = 330 + i * 560, aa = a1 * Q(S, 1, i === 0 ? 'Divide out' : i === 1 ? 'common factors' : 'first nonzero entry positive', 0.5);
    chip(x + 140, 560, 380, 80, B01.tupleStr(q), col, aa, 34, F.math);
    txt(lab, x + 140, 640, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: aa });
    if (i) arrow(x - 120, 560, x - 60, 560, C.cyan, aa, 2.5);
  });
  txt('one name per ray · compared entry by entry · no quotient type', W / 2, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a1 * Q(S, 1, 'one name per ray', 0.5) });
  /* two quarter turns, both orders */
  const a2 = at(S, 2, 0.7);
  if (a2 > 0.003) {
    const c0 = phraseAt(S, 2, 'compose them'), span = Math.max(2.4, lineAt(S, 3).s + 0.6 - c0);
    const p1 = ease(clamp((u - c0) / (span / 2))), p2 = ease(clamp((u - c0 - span / 2) / (span / 2)));
    const H2 = Math.PI / 2;
    /* order A: p_Half · q_Half acts as Ad(p) after Ad(q): first about y, then about x */
    const MA = B01.mm(B01.mat('x', H2 * p2), B01.mat('y', H2 * p1));
    /* order B: q_Half · p_Half: first about x, then about y */
    const MB = B01.mm(B01.mat('y', H2 * p2), B01.mat('x', H2 * p1));
    const cy = 470;
    B01.cube(560, cy, 92, MA, a2);
    B01.cube(1360, cy, 92, MB, a2);
    txt('first y, then x', 560, 252, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.argued, a: a2 });
    txt('first x, then y', 1360, 252, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.argued, a: a2 });
    txt('p_Half = (1, 1, 0, 0): quarter turn about x     q_Half = (1, 0, 1, 0): quarter turn about y', W / 2, 205, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a2 * Q(S, 2, 'quarter turns', 0.5) });
    /* the integer results */
    const r1 = Q(S, 3, 'One order gives', 0.5), r2 = Q(S, 3, 'The other gives', 0.5);
    txt('[p_Half, p₀, q_Half] =', 560, 668, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: r1 });
    txt('[q_Half, p₀, p_Half] =', 1360, 668, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: r2 });
    const show = (q, x, a) => q.forEach((v, i) => {
      const hot = i === 3;
      txt(String(v).replace('-', '−'), x - 165 + i * 110, 732, { size: 48, fam: F.math, w: 700, align: 'center', c: hot ? (v < 0 ? C.mag : C.cyan) : C.white, a });
    });
    show(B01.PQ, 560, r1); show(B01.QP, 1360, r2);
    txt('≠', W / 2, 734, { size: 64, fam: F.math, w: 700, align: 'center', c: C.mag, a: r2 });
    const lq = Q(S, 4, 'Lean checks', 0.5);
    B01.leanChip(520, 802, B01.GID.noncomm, lq, 18);
    txt('no nonzero k, l with k·(1, 1, 1, 1) = l·(1, 1, 1, −1)  ·  strict axioms: none', 520, 838, { size: 19, fam: F.mono, c: C.lean, a: Q(S, 4, 'never share a ray', 0.5) });
  }
};

SCENES.b01_ask = S => {
  const u = S.u;
  B01.rail(S);
  /* the ladder of the volume, passed rungs cyan */
  const a0 = clamp(u / 0.6);
  const rungs = [['ℕ', 'zero · one more'], ['ℚP¹', 'the closed circle'], ['T₃', 'four integers']];
  rungs.forEach(([s, n], i) => {
    const x = 520 + i * 440;
    chip(x, 270, 230, 80, s, C.cyan, a0, 44, F.math);
    txt(n, x, 345, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0 });
    if (i) arrow(x - 300, 270, x - 140, 270, C.cyan, a0 * 0.8, 2.5);
  });
  /* the bridge that was used */
  const q0 = Q(S, 0, 'a built-in one', 0.6), fade = 1 - at(S, 1, 0.6) * 0.6;
  txt('[p_Half, p₀, q_Half] = p_Half · p̄₀ · q_Half', W / 2, 470, { size: 38, fam: F.math, w: 700, align: 'center', c: C.white, a: q0 * fade });
  txt('p₀ = (1, 0, 0, 0)', W / 2, 550, { size: 44, fam: F.math, w: 700, align: 'center', c: C.now, a: Q(S, 0, 'one, zero, zero, zero', 0.6) * fade, ab: 2 });
  txt('a built-in “1” of the quaternion product  ·  the axiom never asked for it', W / 2, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.argued, a: Q(S, 0, 'never asked for it', 0.6) * fade });
  SPINE.ask(S, 1, 'Without an origin, how do we still multiply and turn?', '没有原点，还怎么相乘、怎么转动？');
};

/* ---- b02 · Origin-free algebra and rational spherical geometry · 无原点代数与球面有理几何 ---- */
/* Act b02 · Volume II (chapters 4–6) · Origin-free algebra and rational spherical geometry · 无原点代数与球面有理几何
   Scenes for theme/film/engine.js. Everything this act defines lives in the namespace B02; scenes are SCENES.b02_*.

   What each scene shows, and where it rests:
     b02_title     two unit arrows whose sum leaves the unit sphere (computed); the city-trip picture of a − b + c (argued).
     b02_heap      flat heap a − b + c with a sliding origin (computed); [a, b, c] = a·b̄·c on integer quaternions;
                   triad_left_absorption / triad_right_absorption (LEAN, as rays); [i, 1, j] = k, [j, 1, i] = −k
                   (computed); based group [x, y, z] = x ⋆ y⁻¹ ⋆ z ..... TernaryComparison.tri_eq_mul_inv_mul (LEAN).
     b02_curve     u = (1, 1, 0), v = (1, 0, 2): {u, v, u} = (1, −1, 4), pairing 9, Gram area² 9 (computed);
                   lieTriple_unit_sectional_curvature, lieTriple_sectional_ratio (LEAN); compass loop picture (argued).
     b02_spin      g = (1, 1, 1, 1; 2): six beats, κ_spin = 3/4, 1/4, 0, 1/4, 3/4, 1 and κ_proj = (2κ_spin − 1)²
                   (computed) ..... g120_spin_six_beat_orbit (LEAN); the cube turns 120° per beat (computed); tray (argued).
     b02_cayley    σ = (½, ½, 0): R = ⅓[[2, 1, 2], [1, 2, −2], [−2, 2, 1]] (computed) ..... cayley_orthogonal, cayley_det,
                   cayley_iterate_norm (LEAN); R¹²(0, 0, 1) has denominator 3¹² and squared length 1 (computed); the
                   second-order Taylor step T₂ = I + X + X²/2 multiplies the squared length by 17/16 (computed);
                   "π enters with the angle" (argued, chapter 5 remark).
     b02_triangle  a = (1, 0, 0, 0), b = (1, 1, 0, 0), c = (1, 0, 1, 0): κ = ½, ¼, ½, B = ¼, det G₃ = ¼ (computed)
                   ..... detGram3_nonneg, geodesic_doubling_detGram3_zero, orthogonal_triad_excess_quarter (LEAN);
                   bāb = (0, 2, 0, 0) lies on the great circle of a and b (computed); the hand-holding ring (argued).
     b02_next      summary and the next question.

   On load, FILM.init looks up each of this act's cited theorems with leanCite and recomputes every number on screen by an
   independent route (exact integer and BigInt arithmetic); any disagreement goes to window.FILM_ERRORS. */
const B02 = (() => {
  const P = 'D5/S3/Quantum/AURICOmega/';
  const G = {
    left: P + 'OmegaTernionHeap.triad_left_absorption',
    right: P + 'OmegaTernionHeap.triad_right_absorption',
    based: P + 'TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
    curv: P + 'OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature',
    ratio: P + 'OmegaLieTripleAndFreeGroup.lieTriple_sectional_ratio',
    orbit: P + 'OmegaComposeAndWitnesses.g120_spin_six_beat_orbit',
    orth: P + 'OmegaCayleyRotation.cayley_orthogonal',
    det: P + 'OmegaCayleyRotation.cayley_det',
    iter: P + 'OmegaCayleyRotation.cayley_iterate_norm',
    nonneg: P + 'OmegaBargmannHaarHecke.detGram3_nonneg',
    dbl: P + 'OmegaBargmannHaarHecke.geodesic_doubling_detGram3_zero',
    quarter: P + 'OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter'
  };
  const DEG = Math.PI / 180;

  /* ---------------- exact arithmetic ---------------- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
  const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const add = (u, v) => u.map((x, i) => x + v[i]);
  const scl = (k, u) => u.map(x => k * x);
  /* quaternions as [w, x, y, z] */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = a => [a[0], -a[1], -a[2], -a[3]];
  const triad = (a, b, c) => qmul(qmul(a, qconj(b)), c);
  /* the Lie triple bracket {u, v, w} = ⟨u, w⟩ v − ⟨v, w⟩ u */
  const lie = (u, v, w) => add(scl(dot(u, w), v), scl(-dot(v, w), u));
  const gramArea = (u, v) => dot(u, u) * dot(v, v) - dot(u, v) * dot(u, v);

  /* heap: the flat picture (grid units) */
  const HEAP = { a: [5, 1], b: [2, 3], c: [6, 6] };
  HEAP.d = [HEAP.a[0] - HEAP.b[0] + HEAP.c[0], HEAP.a[1] - HEAP.b[1] + HEAP.c[1]];

  /* curvature example */
  const CU = { u: [1, 1, 0], v: [1, 0, 2] };
  CU.uxv = cross(CU.u, CU.v);
  CU.luvu = lie(CU.u, CU.v, CU.u);
  CU.pair = dot(CU.luvu, CU.v);
  CU.area = gramArea(CU.u, CU.v);

  /* the six-beat orbit of g = (1, 1, 1, 1; 2): unreduced numerators and radii, then reduced */
  const SPIN = (() => {
    const g = [1, 1, 1, 1], rg = 2, out = [];
    let p = [1, 0, 0, 0], r = 1;
    for (let n = 1; n <= 6; n++) {
      p = qmul(p, g); r *= rg;
      const k = p.reduce((s, x) => gcd(s, x), r);
      const red = p.map(x => x / k), rr = r / k;
      /* κ_spin(e, gⁿ) = (r + w) / (2r), κ_proj = (2κ_spin − 1)² = (w / r)² as reduced fractions */
      const sn = rr + red[0], sd = 2 * rr, s1 = gcd(sn, sd);
      const pn = red[0] * red[0], pd = rr * rr, p1 = gcd(pn, pd) || 1;
      out.push({ n, num: p.slice(), r, red, rr, ks: [sn / s1, sd / s1], kp: [pn / p1, pd / p1] });
    }
    return out;
  })();

  /* Cayley: σ = (1/2, 1/2, 0) as numerator (1, 1, 0) over d = 2, integer numerator matrix over N = d² + |s|² = 6 */
  const CAY = (() => {
    const d = 2, s = [1, 1, 0], N = d * d + dot(s, s);
    const b = d * d - dot(s, s), [x, y, z] = s, tw = t => 2 * t;
    const num = [
      [b + tw(x * x), tw(x * y - d * z), tw(x * z + d * y)],
      [tw(y * x + d * z), b + tw(y * y), tw(y * z - d * x)],
      [tw(z * x - d * y), tw(z * y + d * x), b + tw(z * z)]
    ];
    /* reduce by the common factor of numerator and N */
    const k = num.flat().reduce((g0, t) => gcd(g0, t), N);
    const M = num.map(row => row.map(t => t / k)), den = N / k;
    /* twelve iterates of (0, 0, 1): integer numerators over den^n */
    const it = [{ v: [0, 0, 1], den: 1 }];
    for (let n = 1; n <= 12; n++) {
      const w = it[n - 1].v;
      it.push({ v: M.map(row => dot(row, w)), den: it[n - 1].den * den });
    }
    return { d, s, N, num, M, den, it };
  })();
  /* the second-order Taylor step T₂ = I + X + X²/2 for the same σ, scaled by 8 to integers: 8T₂ = 8I + 8X + 4X² */
  const TAY = (() => {
    const X2 = [[0, 0, 1], [0, 0, -1], [-1, 1, 0]];  // 2X for σ = (1/2, 1/2, 0): X = [σ]×
    const sq = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((t, _x, k) => t + A[i][k] * B[k][j], 0)));
    const X2sq = sq(X2, X2);                            // 4X²
    const T8 = [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? 8 : 0) + 4 * X2[i][j] + X2sq[i][j]));
    const pts = [[0n, 0n, 1n]], scale = [1n];
    for (let n = 1; n <= 12; n++) {
      const w = pts[n - 1];
      pts.push(T8.map(row => row.reduce((t, m, k) => t + BigInt(m) * w[k], 0n)));
      scale.push(scale[n - 1] * 8n);
    }
    return { T8, pts, scale };
  })();
  const tayFloat = n => TAY.pts[n].map(x => Number(x) / Number(TAY.scale[n]));
  const tayNorm = n => Number(TAY.pts[n].reduce((t, x) => t + x * x, 0n)) / Number(TAY.scale[n] * TAY.scale[n]);

  /* the triangle: a, b, c and the doubled step b ā b */
  const TRI = (() => {
    const a = [1, 0, 0, 0], b = [1, 1, 0, 0], c = [1, 0, 1, 0];
    const n2 = v => dot(v, v);
    const det3 = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    const gram = (x, y, z) => [[dot(x, x), dot(x, y), dot(x, z)], [dot(y, x), dot(y, y), dot(y, z)], [dot(z, x), dot(z, y), dot(z, z)]];
    const red = (p, q) => { const k = gcd(p, q) || 1; return [p / k, q / k]; };
    const detG = (x, y, z) => red(det3(gram(x, y, z)), n2(x) * n2(y) * n2(z));
    const kap = (x, y) => red(dot(x, y) * dot(x, y), n2(x) * n2(y));
    const B = (x, y, z) => red(dot(x, y) * dot(y, z) * dot(z, x), n2(x) * n2(y) * n2(z));
    const dd = triad(b, a, b);
    return { a, b, c, dd, n2, detG, kap, B, gram, det3, red };
  })();

  /* ---------------- drawing ---------------- */
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const frac = (p, q) => (q === 1 ? String(p) : `${p < 0 ? '−' : ''}${Math.abs(p)}/${q}`);
  const sgn = x => (x < 0 ? '−' + Math.abs(x) : String(x));
  const vec = v => '(' + v.map(sgn).join(', ') + ')';
  function rich(parts, x, y, o = {}) {
    const size = o.size || 28, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
    for (const [s, col, f2] of parts) { txt(s, cx, y, { size, fam: f2 || fam, w, c: col, a }); cx += tw(s, size, f2 || fam, w); }
    return cx;
  }
  const MISSING = new Set();
  /* LEAN ✓ chip for one cited theorem, looked up by its whole GID; returns the x after it */
  function lean(x, y, gid, a, o = {}) {
    if (a <= 0.003) return x;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!MISSING.has(gid)) { MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
      return x;
    }
    const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 16;
    fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x + 8, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + wh + 10, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    return x + wh + 10 + tw(r.short, size, F.mono, 700);
  }
  function poly(pts, col, a, fill = 0.22, lw = 2.2, dash = null) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
    if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
    if (lw) { if (dash) ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
    ctx.restore();
  }
  function path(pts, col, a, lw = 2.5, dash = null) {
    if (a <= 0.003 || pts.length < 2) return;
    ctx.save(); ctx.globalAlpha = a; if (dash) ctx.setLineDash(dash);
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  }
  /* orthographic view of 3D: world (x, y, z) → screen, z up */
  function view(cx, cy, k, yaw, pitch) {
    const cw = Math.cos(yaw), sw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const f = p => { const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw; return [cx + X * k, cy - (p[2] * cp - Y * sp) * k, Y * cp + p[2] * sp]; };
    return f;
  }
  /* a wire sphere of radius k around (cx, cy) under view V: outline, equator and one meridian */
  function sphere(V, cx, cy, k, a, col = C.cyan) {
    ring(cx, cy, k, col, a * 0.75, 2);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, k, 0, TAU); ctx.fillStyle = rgba(col, 0.05 * a); ctx.fill(); ctx.restore();
    for (const [plane, al] of [[t => [Math.cos(t), Math.sin(t), 0], 0.28], [t => [Math.cos(t), 0, Math.sin(t)], 0.18], [t => [0, Math.cos(t), Math.sin(t)], 0.18]]) {
      const pts = []; for (let i = 0; i <= 96; i++) pts.push(V(plane(i * TAU / 96)));
      path(pts, col, a * al, 1.2);
    }
  }
  /* great-circle arc between unit vectors p and q (3D), through the view */
  function arc(V, p, q, col, a, lw = 3.5, dash = null) {
    const om = Math.acos(clamp(dot(p, q), -1, 1)), so = Math.sin(om), pts = [];
    for (let i = 0; i <= 48; i++) {
      const t = i / 48, s0 = so < 1e-9 ? 1 - t : Math.sin((1 - t) * om) / so, s1 = so < 1e-9 ? t : Math.sin(t * om) / so;
      pts.push(V(add(scl(s0, p), scl(s1, q))));
    }
    path(pts, col, a, lw, dash);
    return pts;
  }
  const unit = v => { const n = Math.hypot(...v); return v.map(x => x / n); };
  /* rotate a 3D point about the unit axis n by angle th (Rodrigues; drawing only) */
  function rot(p, n, th) {
    const c = Math.cos(th), s = Math.sin(th), k = dot(n, p), cr = cross(n, p);
    return [0, 1, 2].map(i => p[i] * c + cr[i] * s + n[i] * k * (1 - c));
  }
  const CUBE_V = [];
  for (let i = 0; i < 8; i++) CUBE_V.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1]);
  const CUBE_E = [];
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const x = i ^ j; if (x === 1 || x === 2 || x === 4) CUBE_E.push([i, j]); }
  /* a 3×3 matrix with brackets, rows of integer strings, prefix label */
  function matrix(x, y, rows, a, o = {}) {
    if (a <= 0.003) return;
    const size = o.size || 32, cw = o.cw || 74, rh = o.rh || 46, h = rows.length * rh;
    const w = rows[0].length * cw;
    line(x, y - size, x, y - size + h, C.white, a, 2.5); line(x, y - size, x + 12, y - size, C.white, a, 2.5); line(x, y - size + h, x + 12, y - size + h, C.white, a, 2.5);
    const xr = x + w + 16;
    line(xr, y - size, xr, y - size + h, C.white, a, 2.5); line(xr, y - size, xr - 12, y - size, C.white, a, 2.5); line(xr, y - size + h, xr - 12, y - size + h, C.white, a, 2.5);
    rows.forEach((r, i) => r.forEach((s, j) => txt(s, x + 8 + cw * (j + 0.5), y + i * rh, { size, fam: F.math, w: 700, align: 'center', c: o.c || C.white, a })));
  }
  return { G, DEG, gcd, dot, cross, add, scl, qmul, qconj, triad, lie, gramArea, HEAP, CU, SPIN, CAY, TAY, tayFloat, tayNorm, TRI,
    fade, frac, sgn, vec, rich, lean, poly, path, view, sphere, arc, unit, rot, CUBE_V, CUBE_E, matrix };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 20) E.push('b02: ' + m); };
  const eq = (u, v) => u.length === v.length && u.every((x, i) => x === v[i]);

  /* 0. the cited theorems at the pinned commit */
  for (const gid of Object.values(B02.G)) {
    const r = leanCite(gid);
    check(r && r.kind === 'theorem', `film.json must cite the theorem ${gid}`);
  }

  /* 1. title: two unit arrows at 60° sum to length √3, off the unit sphere */
  { const A = [1, 0], Bv = [0.5, Math.sqrt(3) / 2], s = [A[0] + Bv[0], A[1] + Bv[1]]; check(Math.abs(Math.hypot(...s) - Math.sqrt(3)) < 1e-12, 'sum of unit arrows at 60°'); }

  /* 2. heap: flat a − b + c is unchanged by every shift of the origin; quaternion order example */
  const { a, b, c, d } = B02.HEAP;
  for (let k = 0; k < 40; k++) {
    const o = [Math.round(9 * rnd(k, 1)) - 4, Math.round(9 * rnd(k, 2)) - 4];
    const rel = p => [p[0] - o[0], p[1] - o[1]];
    const r = [rel(a)[0] - rel(b)[0] + rel(c)[0] + o[0], rel(a)[1] - rel(b)[1] + rel(c)[1] + o[1]];
    check(eq(r, d), 'a − b + c moves with the origin');
  }
  const one = [1, 0, 0, 0], qi = [0, 1, 0, 0], qj = [0, 0, 1, 0], qk = [0, 0, 0, 1];
  check(eq(B02.triad(qi, one, qj), qk) && eq(B02.triad(qj, one, qi), [0, 0, 0, -1]), '[i, 1, j] = k and [j, 1, i] = −k');
  /* the two cancel laws on random nonzero integer quaternions, exactly (not only up to scale) */
  for (let k = 0; k < 40; k++) {
    const x = [0, 1, 2, 3].map(i => Math.round(7 * rnd(k, 10 + i)) - 3), z = [0, 1, 2, 3].map(i => Math.round(7 * rnd(k, 20 + i)) - 3);
    const nx = B02.dot(x, x);
    if (!nx || !B02.dot(z, z)) continue;
    check(eq(B02.triad(x, x, z), z.map(t => nx * t)), '[x, x, z] = |x|² z');
    check(eq(B02.triad(x, z, z), x.map(t => B02.dot(z, z) * t)), '[x, z, z] = |z|² x');
  }

  /* 3. curvature: the hand example and the identity on random integer vectors */
  const CU = B02.CU;
  check(eq(CU.uxv, [2, -2, -1]) && eq(CU.luvu, [1, -1, 4]) && CU.pair === 9 && CU.area === 9, 'u = (1, 1, 0), v = (1, 0, 2): 9 = 9');
  check(eq(B02.cross(B02.cross(CU.u, CU.v), CU.u), CU.luvu), '{u, v, u} = (u × v) × u');
  check(B02.dot(CU.u, CU.u) === 2 && B02.dot(CU.v, CU.v) === 5 && B02.dot(CU.u, CU.v) === 1, '|u|² = 2, |v|² = 5, ⟨u, v⟩ = 1');
  for (let k = 0; k < 60; k++) {
    const u = [0, 1, 2].map(i => Math.round(9 * rnd(k, 30 + i)) - 4), v = [0, 1, 2].map(i => Math.round(9 * rnd(k, 40 + i)) - 4);
    check(B02.dot(B02.lie(u, v, u), v) === B02.gramArea(u, v), `⟨{u, v, u}, v⟩ = area² ${k}`);
    const cr = B02.cross(u, v);
    check(B02.gramArea(u, v) === B02.dot(cr, cr), `area² is |u × v|² ${k}`);
  }

  /* 4. the six-beat orbit, against the Lean statement's representatives */
  const want = [[1, 1, 1, 1, 2], [-1, 1, 1, 1, 2], [-1, 0, 0, 0, 1], [-1, -1, -1, -1, 2], [1, -1, -1, -1, 2], [1, 0, 0, 0, 1]];
  const ks = [[3, 4], [1, 4], [0, 1], [1, 4], [3, 4], [1, 1]], kp = [[1, 4], [1, 4], [1, 1], [1, 4], [1, 4], [1, 1]];
  B02.SPIN.forEach((s, i) => {
    check(eq(s.red.concat([s.rr]), want[i]), `g^${s.n} = ${want[i]}`);
    check(B02.dot(s.num, s.num) === s.r * s.r, `|g^${s.n}|² = r²`);
    check(eq(s.ks, ks[i]) && eq(s.kp, kp[i]), `κ at beat ${s.n}`);
    /* the quadratic bridge κ_proj = (2κ_spin − 1)² */
    const t = 2 * s.ks[0] - s.ks[1];
    check(t * t * s.kp[1] === s.kp[0] * s.ks[1] * s.ks[1], `quadratic bridge at beat ${s.n}`);
  });
  check(B02.SPIN[2].num[0] === -8 && B02.SPIN[5].num[0] === 64 && B02.SPIN[5].r === 64, 'unreduced beats 3 and 6');
  /* the cube: q = (1,1,1,1)/2 rotates by 120° about (1,1,1), mapping the cube's vertices to vertices */
  { const n = B02.unit([1, 1, 1]); B02.CUBE_V.forEach(p => { const r = B02.rot(p, n, 120 * B02.DEG); check(B02.CUBE_V.some(q => q.every((x, i) => Math.abs(x - r[i]) < 1e-9)), 'cube is mapped to itself'); }); }
  check(Math.abs(2 * Math.acos(0.5) / B02.DEG - 120) < 1e-9, 'cos(θ/2) = 1/2 gives 120°');

  /* 5. Cayley: the matrix of thirds, orthogonality, determinant, the twelve iterates */
  const { M, den, it, num, N } = B02.CAY;
  check(N === 6 && den === 3 && eq(M.flat(), [2, 1, 2, 1, 2, -2, -2, 2, 1]), 'R = ⅓[[2, 1, 2], [1, 2, −2], [−2, 2, 1]]');
  /* independently from the closed form ((1 − |σ|²) I + 2X + 2σσᵀ) / (1 + |σ|²) with σ = (1/2, 1/2, 0), times 3 */
  { const s = [0.5, 0.5, 0], u2 = B02.dot(s, s), X = [[0, -s[2], s[1]], [s[2], 0, -s[0]], [-s[1], s[0], 0]];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const r = ((i === j ? 1 - u2 : 0) + 2 * X[i][j] + 2 * s[i] * s[j]) / (1 + u2); check(Math.abs(3 * r - M[i][j]) < 1e-12, `closed form entry ${i}${j}`); } }
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) check(M.reduce((t, row) => t + row[i] * row[j], 0) === (i === j ? 9 : 0), `RᵀR = I at ${i}${j}`);
  const det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  check(det === 27, 'det R = 27 / 27 = 1');
  check(num.flat().every((t, i) => t === 2 * M.flat()[i]), 'integer numerator over N = 6');
  it.forEach((s, n) => {
    check(s.den === Math.pow(3, n) && B02.dot(s.v, s.v) === s.den * s.den, `|R^${n} v|² = 1`);
    if (n > 0) check(s.v.reduce((g0, t) => B02.gcd(g0, t), 3) === 1, `R^${n} v has exact denominator 3^${n}`);
  });
  check(eq(it[12].v, [302680, -302680, -314959]) && it[12].den === 531441, 'R¹² v = (302680, −302680, −314959) / 531441');
  /* Taylor: each step multiplies the squared length of the orbit plane by 17/16 */
  for (let n = 0; n <= 12; n++) {
    const s2 = B02.TAY.scale[n] * B02.TAY.scale[n], nn = B02.TAY.pts[n].reduce((t, x) => t + x * x, 0n);
    check(nn * (16n ** BigInt(n)) === s2 * (17n ** BigInt(n)), `|T₂^${n} v|² = (17/16)^${n}`);
  }
  check(B02.tayNorm(11) < 2 && B02.tayNorm(12) > 2.069 && B02.tayNorm(12) < 2.07, '(17/16)¹¹ < 2 < (17/16)¹² ≈ 2.0699');

  /* 6. the triangle */
  const T = B02.TRI, fr = (x, p, q) => x[0] === p && x[1] === q;
  check(T.n2(T.a) === 1 && T.n2(T.b) === 2 && T.n2(T.c) === 2 && B02.dot(T.a, T.b) === 1 && B02.dot(T.b, T.c) === 1 && B02.dot(T.c, T.a) === 1, 'norms 1, 2, 2 and products 1, 1, 1');
  check(fr(T.kap(T.a, T.b), 1, 2) && fr(T.kap(T.b, T.c), 1, 4) && fr(T.kap(T.c, T.a), 1, 2), 'κ = ½, ¼, ½');
  check(fr(T.B(T.a, T.b, T.c), 1, 4) && fr(T.detG(T.a, T.b, T.c), 1, 4), 'B = ¼, det G₃ = ¼');
  check(1 * 4 + 2 * 1 - (2 + 1 + 2) === 1, '1 + 2B − Σκ = ¼ (times 4)');
  check(eq(T.dd, [0, 2, 0, 0]) && fr(T.detG(T.a, T.b, T.dd), 0, 1), 'b ā b = (0, 2, 0, 0) and det G₃ = 0');
  check(fr(T.kap(T.a, T.dd), 0, 1), 'κ(a, bāb) = (2·½ − 1)² = 0');
  /* the closing law on random nonzero integer quaternions: det G₃ ≥ 0 and = 1 + 2B − Σκ */
  for (let k = 0; k < 60; k++) {
    const r4 = s => [0, 1, 2, 3].map(i => Math.round(7 * rnd(k, s + i)) - 3);
    const x = r4(50), y = r4(60), z = r4(70);
    if (!T.n2(x) || !T.n2(y) || !T.n2(z)) continue;
    const D = T.det3(T.gram(x, y, z)), P = T.n2(x) * T.n2(y) * T.n2(z);
    check(D >= 0, `det G₃ ≥ 0 at ${k}`);
    const lhs = D * P, rhs = P * P + 2 * B02.dot(x, y) * B02.dot(y, z) * B02.dot(z, x) * P
      - P * (B02.dot(x, y) ** 2 * T.n2(z) + B02.dot(y, z) ** 2 * T.n2(x) + B02.dot(z, x) ** 2 * T.n2(y));
    check(lhs === rhs, `closing law at ${k}`);
    const w = B02.triad(y, x, y), Dw = T.det3(T.gram(x, y, w));
    check(Dw === 0, `doubled step is on one great circle at ${k}`);
  }
  /* the side cosines: 1/√2, 1/2, 1/√2, whose product is ¼ */
  check(Math.abs(1 / Math.sqrt(2) * 0.5 * (1 / Math.sqrt(2)) - 0.25) < 1e-15, 'cosines multiply to ¼');
});
FILM.init.push(() => {
  Object.assign(FILM.speed, { b02_title: 0.02, b02_heap: 0.014, b02_curve: 0.014, b02_spin: 0.018, b02_cayley: 0.014, b02_triangle: 0.014, b02_next: 0.02 });
});

/* ======================================================================= */
/*                        b02_title · A TRIP, NOT A SUM                     */
/* ======================================================================= */
SCENES.b02_title = S => {
  const u = S.u, a0 = at(S, 0, 0.7);
  if (a0 > 0.003) {
    badgeQ(S, [[0, null, 'computed'], [1, 'But a trip', 'argued']]);
    /* the sphere and two unit arrows, their sum leaving it */
    const cx = 450, cy = 520, R = 240, a = a0 * clamp((S.d - u) / 0.5);
    ring(cx, cy, R, C.cyan, a * 0.8, 2);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = rgba(C.cyan, 0.05 * a); ctx.fill(); ctx.restore();
    ctx.save(); ctx.setLineDash([4, 6]); ctx.globalAlpha = a * 0.35; ctx.strokeStyle = C.cyan; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.3, 0, 0, TAU); ctx.stroke(); ctx.restore();
    const A = [cx + R * Math.cos(-20 * B02.DEG), cy + R * Math.sin(-20 * B02.DEG)], Bp = [cx + R * Math.cos(-80 * B02.DEG), cy + R * Math.sin(-80 * B02.DEG)];
    const s0 = Q(S, 0, 'cannot be added', 0.8);
    ring(cx, cy, 12, C.dim, a * 0.8, 1.5);
    txt('0 ?', cx - 18, cy + 40, { size: 26, fam: F.math, w: 700, c: C.dim, a });
    arrow(cx, cy, A[0], A[1], C.white, a * 0.7 * s0, 3);
    arrow(cx, cy, Bp[0], Bp[1], C.white, a * 0.7 * s0, 3);
    dot(A[0], A[1], 11, 'w', a); dot(Bp[0], Bp[1], 11, 'w', a);
    txt('A', A[0] + 18, A[1] + 8, { size: 32, fam: F.math, w: 700, c: C.white, a });
    txt('B', Bp[0] + 16, Bp[1] - 8, { size: 32, fam: F.math, w: 700, c: C.white, a });
    const sp = Q(S, 0, 'pokes out of it', 1.0), Sx = A[0] + Bp[0] - cx, Sy = A[1] + Bp[1] - cy;
    if (sp > 0.003) {
      ctx.save(); ctx.setLineDash([10, 8]); line(A[0], A[1], Sx, Sy, C.mag, a * sp * 0.6, 2); line(Bp[0], Bp[1], Sx, Sy, C.mag, a * sp * 0.6, 2); ctx.restore();
      arrow(cx, cy, lerp(cx, Sx, sp), lerp(cy, Sy, sp), C.mag, a * sp, 4);
      txt('A + B', Sx + 18, Sy, { size: 32, fam: F.math, w: 700, c: C.mag, a: a * sp });
      txt('off the sphere · 出界', Sx + 18, Sy + 34, { size: 20, fam: F.zh, w: 700, c: C.mag, a: a * sp * 0.9 });
    }
    /* the trip, as an analogy: Paris → Rome, replayed from Berlin */
    const ta = at(S, 1, 0.7) * clamp((S.d - u) / 0.5);
    if (ta > 0.003) {
      panel(960, 200, 780, 580, ta, C.argued, 'ANALOGY · 比方 · A TRIP · 一段行程');
      const city = (p, nm, zh, col, left) => { const al = left ? 'right' : 'left', dx = left ? -18 : 18; dot(p[0], p[1], 12, 'w', ta); txt(nm, p[0] + dx, p[1] - 10, { size: 26, fam: F.disp, w: 700, align: al, c: col, a: ta }); txt(zh, p[0] + dx, p[1] + 20, { size: 20, fam: F.zh, w: 700, align: al, c: C.dim, a: ta }); };
      const Pa = [1110, 460], Ro = [1330, 680], Be = [1380, 320], Ne = [Ro[0] - Pa[0] + Be[0], Ro[1] - Pa[1] + Be[1]];
      for (let i = 0; i < 8; i++) line(1000 + i * 92, 240, 990 + i * 94, 760, C.dim, ta * 0.12, 1);
      const s1 = Q(S, 1, 'from Paris to Rome', 0.9), s2 = Q(S, 1, 'do again from Berlin', 1.0);
      city(Pa, 'Paris', '巴黎 · b', C.white, true); city(Ro, 'Rome', '罗马 · a', C.white); city(Be, 'Berlin', '柏林 · c', C.white, true);
      arrow(Pa[0], Pa[1], lerp(Pa[0], Ro[0], s1), lerp(Pa[1], Ro[1], s1), C.now, ta * s1, 4);
      if (s2 > 0.003) {
        ctx.save(); ctx.setLineDash([12, 8]); arrow(Be[0], Be[1], lerp(Be[0], Ne[0], s2), lerp(Be[1], Ne[1], s2), C.now, ta * s2, 4); ctx.restore();
        dot(Ne[0], Ne[1], 13, 'c', ta * clamp(s2 * 2 - 1));
        txt('[a, b, c]', Ne[0] - 30, Ne[1] + 44, { size: 30, fam: F.math, w: 700, c: C.cyan, a: ta * clamp(s2 * 2 - 1) });
      }
      txt('no origin needed · 不需要原点', 1350, 750, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ta * Q(S, 1, 'do again from Berlin', 0.6, 0.8) });
    }
  }
  SPINE.rail(S, 2, at(S, 0, 0.6) * clamp((S.d - u) / 0.4 + 0.5));
  SPINE.title(S, 2, '无原点代数与球面有理几何', 'Origin-free algebra and rational spherical geometry');
};

/* ======================================================================= */
/*                               b02_heap · THE HEAP                         */
/* ======================================================================= */
SCENES.b02_heap = S => {
  const u = S.u, a = B02.fade(S);
  SPINE.rail(S, 2, a);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed'], [4, 'multiply, invert', 'lean'], [4, 'Home is a choice', 'argued']]);
  /* left: flat paper with a moving origin */
  panel(130, 190, 760, 600, a, C.cyan, 'FLAT PAPER · 平面 · a − b + c');
  const gx = 190, gy = 740, k = 62;
  const P = p => [gx + p[0] * k, gy - p[1] * k * 0.95];
  for (let i = 0; i <= 10; i++) line(gx + i * k - k, 240, gx + i * k - k, 770, C.dim, a * 0.15, 1);
  for (let j = 0; j <= 8; j++) line(150, gy - j * k * 0.95 + 20, 870, gy - j * k * 0.95 + 20, C.dim, a * 0.15, 1);
  const H = B02.HEAP, home = at(S, 4, 0.6);
  /* the origin wanders on a loop while line 0 is spoken, then settles as "home" on line 4 */
  const wt = clamp((u - lineAt(S, 0).s) / 7);
  const ang = wt * TAU * 1.25;
  const O = [lerp(1.6 + 1.0 * Math.cos(ang), H.b[0], home), lerp(6.4 + 0.9 * Math.sin(ang), H.b[1], home)];
  const Op = P(O), pa = P(H.a), pb = P(H.b), pc = P(H.c), pd = P(H.d);
  const la = Q(S, 0, 'wherever the origin', 0.6);
  for (const q of [pa, pb, pc]) arrow(Op[0], Op[1], q[0], q[1], C.dim, a * 0.55 * la, 1.6);
  arrow(Op[0], Op[1], pd[0], pd[1], C.cyan, a * 0.5 * la, 1.6);
  ring(Op[0], Op[1], 13, home > 0.5 ? C.now : C.white, a, 2.5);
  txt(home > 0.5 ? 'home · 家' : 'origin · 原点', Op[0] - 16, Op[1] + 40, { size: 22, fam: F.zh, w: 700, align: 'center', c: home > 0.5 ? C.now : C.white, a: a * 0.9 });
  arrow(pb[0], pb[1], pa[0], pa[1], C.now, a, 3.5);
  ctx.save(); ctx.setLineDash([10, 7]); arrow(pc[0], pc[1], pd[0], pd[1], C.now, a * Q(S, 0, 'a minus b plus c', 0.8), 3.5); ctx.restore();
  for (const [q, nm] of [[pa, 'a'], [pb, 'b'], [pc, 'c']]) { dot(q[0], q[1], 11, 'w', a); txt(nm, q[0] + 16, q[1] - 12, { size: 30, fam: F.math, w: 700, c: C.white, a }); }
  dot(pd[0], pd[1], 13, 'c', a * Q(S, 0, 'a minus b plus c', 0.8));
  txt('a − b + c', pd[0] - 40, pd[1] + 46, { size: 28, fam: F.math, w: 700, c: C.cyan, a: a * Q(S, 0, 'a minus b plus c', 0.8) });
  txt('the origin moves; the answer stays · 原点在动，答案不动', 510, 225 + 50, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * la });

  /* right column */
  const X0 = 960;
  const r1 = at(S, 1, 0.6);
  txt('[a, b, c] = a · b̄ · c', X0, 255, { size: 46, fam: F.math, w: 700, c: C.white, a: a * r1 });
  txt('unit quaternions · whole-number arithmetic · 单位四元数 · 整数运算', X0, 295, { size: 19, fam: F.zh, w: 700, c: C.dim, a: a * r1 });
  const r2 = at(S, 2, 0.6);
  if (r2 > 0.003) {
    let x = B02.lean(X0, 365, B02.G.left, a * r2);
    txt('[x, x, z] ∼ z', x + 26, 367, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 2, 'x, x, z gives z', 0.5) });
    x = B02.lean(X0, 420, B02.G.right, a * r2);
    txt('[x, z, z] ∼ x', x + 26, 422, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 2, 'x, z, z gives x', 0.5) });
    txt('∼ : the same ray, up to scale · 差一个缩放，指向同一条射线', X0, 458, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 2, 'up to scale', 0.5) });
  }
  const r3 = at(S, 3, 0.6);
  B02.rich([['[i, 1, j] = i · j = ', C.white], ['k', C.cyan]], X0, 530, { size: 32, a: a * r3 });
  B02.rich([['[j, 1, i] = j · i = ', C.white], ['−k', C.mag]], X0 + 420, 530, { size: 32, a: a * Q(S, 3, 'j, one, i gives minus', 0.5) });
  txt('order matters · 次序要紧', X0, 566, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 3, 'j, one, i gives minus', 0.5, 0.4) });
  const r4 = at(S, 4, 0.6);
  if (r4 > 0.003) {
    const x = B02.lean(X0, 632, B02.G.based, a * r4, { size: 17 });
    txt('home o · 基点', x + 22, 632, { size: 20, fam: F.zh, w: 700, c: C.now, a: a * r4 });
    txt('any heap, exact axioms · 任意流群（精确公理）', X0, 722, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * r4 });
    txt('[x, y, z] = x ⋆ₒ y⁻¹ ⋆ₒ z', X0, 690, { size: 36, fam: F.math, w: 700, c: C.white, a: a * Q(S, 4, 'multiply, invert, multiply', 0.6) });
    const q = Q(S, 4, 'Home is a choice', 0.7);
    txt('Home is a choice, not a fact.', X0, 780, { size: 38, fam: F.disp, w: 700, c: C.white, a: a * q, ab: 1 });
    txt('家是选出来的，不是天生的。', X0, 818, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * q * 0.85 });
  }
};

/* ======================================================================= */
/*                       b02_curve · RELATION OF RELATIONS                   */
/* ======================================================================= */
SCENES.b02_curve = S => {
  const u = S.u, a = B02.fade(S);
  SPINE.rail(S, 2, a);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const CU = B02.CU, V = B02.view(470, 650, 112, -0.55 + 0.03 * u, 0.35);
  /* axes */
  const O = V([0, 0, 0]);
  for (const [e, l] of [[[2.6, 0, 0], 'x'], [[0, 2.6, 0], 'y'], [[0, 0, 3.0], 'z']]) { const p = V(e); arrow(O[0], O[1], p[0], p[1], C.dim, a * 0.7, 1.6); txt(l, p[0] + 8, p[1] + 6, { size: 22, fam: F.math, w: 700, c: C.dim, a }); }
  const pu = V(CU.u), pv = V(CU.v), puv = V(B02.add(CU.u, CU.v));
  const sa = at(S, 0, 0.7);
  /* the parallelogram (area, magenta) and the twist u × v (violet axis) */
  B02.poly([O, pu, puv, pv], C.mag, a * Q(S, 0, 'you get a twist', 0.8), 0.22, 2);
  const tw = Q(S, 0, 'you get a twist', 0.8), tx = V(B02.scl(0.6, CU.uxv));
  arrow(O[0], O[1], tx[0], tx[1], C.vio, a * tw, 4);
  txt('u × v = (2, −2, −1)', O[0] - 70, O[1] + 58, { size: 22, fam: F.math, w: 700, align: 'right', c: C.vio, a: a * tw });
  arrow(O[0], O[1], pu[0], pu[1], C.white, a * sa, 4.5);
  arrow(O[0], O[1], pv[0], pv[1], C.white, a * sa, 4.5);
  txt('u', pu[0] + 10, pu[1] + 40, { size: 32, fam: F.math, w: 700, c: C.white, a: a * sa });
  txt('v', pv[0] + 14, pv[1] - 6, { size: 32, fam: F.math, w: 700, c: C.white, a: a * sa });
  /* the bracket {u, v, u} = (1, −1, 4): cyan, on line 2 */
  const lb = Q(S, 2, 'the bracket gives nine', 0.8), pl = V(B02.scl(0.62, CU.luvu));
  arrow(O[0], O[1], pl[0], pl[1], C.cyan, a * lb, 4);
  txt('{u, v, u}', pl[0] + 14, pl[1] + 4, { size: 26, fam: F.math, w: 700, c: C.cyan, a: a * lb });
  txt('{u, v, w} = ⟨u, w⟩ v − ⟨v, w⟩ u', 470, 236, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: a * Q(S, 0, 'Lie triple bracket', 0.7) });
  txt('Lie triple bracket · 利雅三元括号 · a relation of relations · 关系的关系', 470, 272, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * Q(S, 0, 'Lie triple bracket', 0.7) });

  /* right top: the compass loop on a ball (analogy) */
  const ca = at(S, 1, 0.7);
  if (ca > 0.003) {
    panel(940, 190, 800, 250, ca * a, C.argued, 'ANALOGY · 比方 · A COMPASS ON A BALL · 球面上的指南针');
    const bx = 1070, by = 320, br = 92;
    ring(bx, by, br, C.cyan, ca * a * 0.7, 2);
    ctx.save(); ctx.globalAlpha = ca * a * 0.35; ctx.strokeStyle = C.cyan; ctx.beginPath(); ctx.ellipse(bx, by, br, br * 0.32, 0, 0, TAU); ctx.stroke(); ctx.restore();
    /* a small loop (lune-like triangle) with the needle carried round */
    const loop = [[bx - 40, by - 48], [bx + 42, by - 26], [bx - 10, by + 40]];
    B02.poly(loop, C.argued, ca * a, 0.12, 2);
    const lp = Q(S, 1, 'comes back turned', 1.0);
    arrow(loop[0][0], loop[0][1], loop[0][0] + 44, loop[0][1] - 18, C.white, ca * a * (1 - lp * 0.6), 3);
    const th = -0.38 + 1.1 * lp;
    arrow(loop[0][0], loop[0][1], loop[0][0] + 48 * Math.cos(th), loop[0][1] + 48 * Math.sin(th), C.now, ca * a * lp, 3.5);
    txt('round a loop, the needle comes back turned', 1196, 290, { size: 22, fam: F.disp, w: 700, c: C.white, a: ca * a });
    txt('绕一圈回来，指针转了一个角', 1196, 324, { size: 22, fam: F.zh, w: 700, c: C.white, a: ca * a * 0.85 });
    txt('the bracket records the turn · 括号记下这一转', 1196, 372, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ca * a * Q(S, 1, 'The bracket records', 0.6) });
  }
  /* right: the ledger */
  const la = at(S, 2, 0.6);
  if (la > 0.003) {
    panel(940, 460, 800, 380, la * a, C.cyan, 'BY HAND · 手算');
    const X0 = 966, rows = [
      [[['u = (1, 1, 0)    v = (1, 0, 2)', C.white]], Q(S, 2, 'Take u as', 0.5)],
      [[['{u, v, u} = 2·(1, 0, 2) − 1·(1, 1, 0) = (1, −1, 4)', C.white]], Q(S, 2, 'the bracket gives nine', 0.5)],
      [[['⟨{u, v, u}, v⟩ = 1 + 0 + 8 = ', C.cyan], ['9', C.cyan]], Q(S, 2, 'the bracket gives nine', 0.5, 0.6)],
      [[['area² = |u|²|v|² − ⟨u, v⟩² = 2·5 − 1 = ', C.mag], ['9', C.mag]], Q(S, 2, 'so does their squared area', 0.5)]
    ];
    rows.forEach(([parts, al], i) => B02.rich(parts, X0, 515 + i * 44, { size: 26, a: a * al }));
    const l3 = at(S, 3, 0.6);
    if (l3 > 0.003) {
      let x = B02.lean(X0, 718, B02.G.curv, a * l3, { size: 17 });
      txt('⟨{u, v, u}, v⟩ = area²', x + 20, 719, { size: 24, fam: F.math, w: 700, c: C.white, a: a * l3 });
      x = B02.lean(X0, 768, B02.G.ratio, a * Q(S, 3, 'wherever the area is nonzero', 0.6), { size: 17 });
      B02.rich([['K = 9 / 9 = ', C.white], ['1', C.white]], x + 20, 770, { size: 26, a: a * Q(S, 3, 'curvature is exactly one', 0.6) });
      txt('every pair of integer vectors · 任意两支整向量 · area ≠ 0 · 面积非零', X0, 816, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * l3 });
    }
  }
};

/* ======================================================================= */
/*                      b02_spin · SEVEN HUNDRED TWENTY                      */
/* ======================================================================= */
SCENES.b02_spin = S => {
  const u = S.u, a = B02.fade(S);
  SPINE.rail(S, 2, a);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  /* beats: 0 → 1 on line 0, 1 → 3 on line 1, 3 → 6 on line 2 */
  const b1 = ease(Q(S, 0, 'a third of a turn', 1.4)), b3 = ease(Q(S, 1, 'After three beats', 2.4)), b6 = ease(Q(S, 2, 'Only at six beats', 3.4));
  const beat = b1 + 2 * b3 + 3 * b6, cur = Math.round(beat);
  /* the cube, turned 120° per beat about its diagonal */
  const n = B02.unit([1, 1, 1]), th = beat * 120 * B02.DEG;
  const V = B02.view(470, 520, 118, -0.62, 0.42);
  const pts = B02.CUBE_V.map(p => V(B02.rot(p, n, th)));
  const dA = V(B02.scl(1.9, n)), dB = V(B02.scl(-1.9, n));
  line(dB[0], dB[1], dA[0], dA[1], C.vio, a * 0.9, 3);
  txt('diagonal axis · 对角轴', dA[0] + 14, dA[1] - 6, { size: 20, fam: F.zh, w: 700, c: C.vio, a });
  /* one face filled so the turn is visible */
  const face = [0, 1, 3, 2].map(i => pts[i]);
  B02.poly(face, C.cyan, a, 0.18, 0);
  for (const [i, j] of B02.CUBE_E) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.white, a * 0.85, 2.5);
  dot(pts[1][0], pts[1][1], 10, 'g', a);
  txt(`${Math.round(beat * 120)}°`, 470, 790, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.now, a });
  txt('the cube · 立方体', 470, 230, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });

  /* the ring of beats */
  const cx = 1050, cy = 460, R = 175;
  ring(cx, cy, R, C.dim, a * 0.5, 1.5);
  for (let k = 0; k < 6; k++) {
    const an = -Math.PI / 2 + (k + 1) * TAU / 6, x = cx + R * Math.cos(an), y = cy + R * Math.sin(an);
    const s = B02.SPIN[k], done = beat >= k + 1 - 0.02, now = cur === k + 1 && beat > 0.5;
    const anti = s.rr === 1 && s.red[0] < 0;
    ring(x, y, now ? 26 : 20, now ? C.now : anti ? C.mag : C.cyan, a * (done ? 1 : 0.35), now ? 3 : 2);
    txt(String(k + 1), x, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: now ? C.now : C.white, a: a * (done ? 1 : 0.4) });
  }
  /* the start e at the top (also beat 6) */
  txt('e', cx, cy - R - 36, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a });
  const sp = B02.SPIN[Math.max(0, cur - 1)];
  if (cur >= 1) {
    txt(`g${['¹', '²', '³', '⁴', '⁵', '⁶'][cur - 1]} = (${sp.red.map(B02.sgn).join(', ')}; ${sp.rr})`, cx, cy - 6, { size: 26, fam: F.math, w: 700, align: 'center', c: C.now, a });
    txt('g = (1, 1, 1, 1; 2)', cx, cy + 30, { size: 20, fam: F.math, w: 700, align: 'center', c: C.vio, a: a * 0.9 });
  }
  /* minus one at beat three */
  const m1 = Q(S, 1, 'reads minus one', 0.6) * (1 - Q(S, 2, 'Only at six beats', 0.6, 0.6));
  stamp('−1', cx, cy + 100, m1, C.now, 54, -0.08);

  /* the table: κ_spin and κ_proj per beat */
  const TX = 1300, TY = 268;
  panel(TX - 20, TY - 58, 450, 450, a, C.cyan, 'SIX BEATS · 六拍');
  const hd = [['beat', 0], ['κ_spin', 150], ['κ_proj', 280]];
  hd.forEach(([s, dx]) => txt(s, TX + dx, TY, { size: 20, fam: F.mono, w: 700, c: C.dim, a }));
  for (let k = 0; k < 6; k++) {
    const s = B02.SPIN[k], y = TY + 50 + k * 50, al = beat >= k + 1 - 0.02 ? 1 : 0.18, now = cur === k + 1 && beat > 0.5;
    const col = now ? C.now : C.white;
    txt(`${k + 1} · ${(k + 1) * 120}°`, TX, y, { size: 22, fam: F.mono, w: 700, c: col, a: a * al });
    txt(B02.frac(s.ks[0], s.ks[1]), TX + 150, y, { size: 26, fam: F.math, w: 700, c: now ? C.now : C.cyan, a: a * al });
    txt(B02.frac(s.kp[0], s.kp[1]), TX + 280, y, { size: 26, fam: F.math, w: 700, c: C.dim, a: a * al });
  }
  txt('κ_proj = (2κ_spin − 1)²', TX, TY + 360, { size: 20, fam: F.math, w: 700, c: C.dim, a });
  /* Lean */
  const l2 = Q(S, 2, 'Lean checks', 0.6);
  if (l2 > 0.003) {
    const x = B02.lean(780, 712, B02.G.orbit, a * l2);
    txt('all six beats · κ_spin(e, g³) = 0 · κ_spin(e, g⁶) = 1', 780, 752, { size: 22, fam: F.math, w: 700, c: C.white, a: a * l2 });
    void x;
  }
  /* the tray (analogy) */
  const tr = at(S, 3, 0.6);
  if (tr > 0.003) chip(470, 840 - 6, 620, 46, 'analogy · 比方: a tray under the arm · 臂下托盘', C.argued, a * tr, 20, F.zh);
};

/* ======================================================================= */
/*                         b02_cayley · THE CAYLEY BRIDGE                    */
/* ======================================================================= */
SCENES.b02_cayley = S => {
  const u = S.u, a = B02.fade(S);
  SPINE.rail(S, 2, a);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed'], [5, null, 'argued']]);
  const cx = 500, cy = 510, R = 205, V = B02.view(cx, cy, R, Math.PI / 4, 0.1);
  B02.sphere(V, cx, cy, R, a * 0.9);
  txt('unit sphere · 单位球面', cx, cy + R + 44, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * (1 - at(S, 5, 0.4)) });
  /* Taylor: twelve steps spiralling out (magenta), on lines 0–1 */
  const tn = 12 * clamp((u - lineAt(S, 1).s) / Math.max(1, phraseAt(S, 1, 'the squared length passes two') + 0.8 - lineAt(S, 1).s));
  const tfade = 1 - 0.75 * at(S, 2, 0.8);
  if (tn > 0) {
    const pts = [];
    for (let k = 0; k <= Math.floor(tn); k++) pts.push(V(B02.tayFloat(k)));
    B02.path(pts, C.mag, a * tfade, 3);
    pts.forEach((p, k) => dot(p[0], p[1], k === Math.floor(tn) ? 10 : 6, 'm', a * tfade));
    const k = Math.floor(tn), nrm = B02.tayNorm(k);
    txt(`Taylor T₂ = I + X + X²/2 · step ${k}`, 140, 806, { size: 22, fam: F.math, w: 700, c: C.mag, a: a * tfade * (1 - at(S, 5, 0.4)) });
    txt(`|v|² = (17/16)${['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰', '¹¹', '¹²'][k]} ≈ ${nrm.toFixed(4)}`, 140, 842, { size: 26, fam: F.math, w: 700, c: C.mag, a: a * tfade * (1 - at(S, 5, 0.4)) });
  }
  /* Cayley orbit: twelve exact steps (cyan), on line 4 */
  const cn = 12 * clamp((u - phraseAt(S, 4, 'Twelve turns')) / Math.max(1, lineAt(S, 4).e - phraseAt(S, 4, 'Twelve turns') - 0.6));
  const it = B02.CAY.it;
  const pv = s => V(s.v.map(x => x / s.den));
  const v0 = V([0, 0, 1]);
  dot(v0[0], v0[1], 10, 'w', a);
  txt('v = (0, 0, 1)', v0[0], v0[1] + 40, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a });
  if (cn > 0) {
    const k = Math.floor(cn), pts = [];
    for (let j = 0; j <= k; j++) pts.push(pv(it[j]));
    for (let j = 1; j < pts.length; j++) B02.arc(V, B02.unit(it[j - 1].v), B02.unit(it[j].v), C.cyan, a * 0.75, 2.5);
    pts.forEach((p, j) => dot(p[0], p[1], j === k ? 12 : 7, j === k ? 'g' : 'c', a));
  }

  /* right column */
  const X0 = 980;
  const l2 = at(S, 2, 0.6);
  txt('R = (I − X)⁻¹ (I + X)', X0, 250, { size: 44, fam: F.math, w: 700, c: C.white, a: a * l2 });
  txt('X = [σ]×  ·  one fraction, no series · 一个分式，没有级数', X0, 290, { size: 19, fam: F.zh, w: 700, c: C.dim, a: a * l2 });
  const l3 = Q(S, 2, 'Feed it', 0.6);
  if (l3 > 0.003) {
    txt('σ = (½, ½, 0)', X0, 360, { size: 30, fam: F.math, w: 700, c: C.now, a: a * l3 });
    txt('R =  ⅓', X0, 470, { size: 36, fam: F.math, w: 700, c: C.white, a: a * Q(S, 2, 'a matrix of thirds', 0.6) });
    B02.matrix(X0 + 150, 432, B02.CAY.M.map(r => r.map(B02.sgn)), a * Q(S, 2, 'a matrix of thirds', 0.6), { size: 32, cw: 70, rh: 44 });
  }
  const l4 = at(S, 3, 0.6);
  if (l4 > 0.003) {
    const X1 = X0 + 400;
    B02.lean(X1, 400, B02.G.orth, a * l4, { size: 16 });
    txt('RᵀR = I', X1, 436, { size: 26, fam: F.math, w: 700, c: C.white, a: a * Q(S, 3, 'orthogonal', 0.5) });
    B02.lean(X1, 486, B02.G.det, a * Q(S, 3, 'determinant one', 0.5), { size: 16 });
    txt('det R = 1', X1, 522, { size: 26, fam: F.math, w: 700, c: C.white, a: a * Q(S, 3, 'determinant one', 0.5) });
    B02.lean(X1, 572, B02.G.iter, a * Q(S, 3, 'lengths kept', 0.5), { size: 16 });
    txt('|Rⁿv|² = |v|²', X1, 608, { size: 26, fam: F.math, w: 700, c: C.white, a: a * Q(S, 3, 'lengths kept', 0.5) });
    txt('every rational σ · 任意有理 σ', X1, 642, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * l4 });
  }
  const l5 = at(S, 4, 0.6);
  if (l5 > 0.003) {
    const k = Math.max(1, Math.floor(cn)), s = it[k];
    panel(X0 - 20, 670, 780, 130, a * l5, C.cyan, 'EXACT ORBIT · 精确轨道');
    B02.rich([[`R${['', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰', '¹¹', '¹²'][k]}v = (${s.v.map(B02.sgn).join(', ')}) / ${s.den}`, C.now]], X0, 728, { size: 24, a: a * l5 });
    B02.rich([[`denominator 3${['', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰', '¹¹', '¹²'][k]} · |Rⁿv|² = `, C.white], ['1', C.cyan], ['  exactly · 恰好', C.dim, F.zh]], X0, 772, { size: 24, a: a * l5 });
  }
  /* the aphorism */
  const l6 = at(S, 5, 0.8);
  if (l6 > 0.003) {
    fillBox(110, 760, 780, 70, C.bg, a * l6 * 0.7);
    txt('π is not in the turn; it walks in with the angle.', 500, 790, { size: 28, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * l6 });
    txt('π 不在旋转里；量角度时它才走进来。', 500, 824, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * l6 });
  }
};

/* ======================================================================= */
/*                       b02_triangle · CLOSING THE TRIANGLE                 */
/* ======================================================================= */
SCENES.b02_triangle = S => {
  const u = S.u, a = B02.fade(S);
  SPINE.rail(S, 2, a);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'like hands joined', 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean'], [4, 'Spherical trigonometry', 'argued']]);
  /* the triangle lives in the (w, x, y) coordinates (z = 0): draw it on an ordinary sphere */
  const T = B02.TRI, cx = 500, cy = 520, R = 230, V = B02.view(cx, cy, R, 0.85, 0.42);
  B02.sphere(V, cx, cy, R, a * 0.85);
  const A = [1, 0, 0], Bv = B02.unit([1, 1, 0]), Cv = B02.unit([1, 0, 1]), Dv = [0, 1, 0];
  /* line 3: the corner c slides onto the great circle of a and b, to the doubled step bāb ∝ (0, 1, 0); line 4 lifts it back */
  const down = ease(Q(S, 3, 'zero when a step is doubled', 1.4)), up = ease(Q(S, 4, 'Lift the corner', 1.2));
  const m = down * (1 - up);
  const Cm = B02.unit(B02.add(B02.scl(1 - m, Cv), B02.scl(m, Dv)));
  const show = at(S, 0, 0.7);
  /* the great circle through a and b, dashed, while the step is doubled */
  if (m > 0.01) B02.arc(V, A, Dv, C.now, a * m * 0.9, 2, [8, 7]);
  const pa = V(A), pb = V(Bv), pc = V(Cm);
  const tri = [...B02.arc(V, A, Bv, C.cyan, a * show, 4), ...B02.arc(V, Bv, Cm, C.cyan, a * show, 4), ...B02.arc(V, Cm, A, C.cyan, a * show, 4)];
  B02.poly(tri, C.mag, a * Q(S, 2, 'The loop number B', 0.8) * (1 - m), 0.25, 0);
  /* the hand-holding ring: each corner lights twice, once per neighbouring side (line 1) */
  const hh = clamp((u - phraseAt(S, 1, 'every corner is met twice')) / 3.4);
  const corners = [[pa, 'a', [-40, 40]], [pb, 'b', [18, -14]], [pc, m > 0.5 ? 'bāb' : 'c', m > 0.5 ? [-30, -24] : [18, 30]]];
  corners.forEach(([p, nm, off], i) => {
    const pulse = hh > 0 && hh < 1 ? Math.max(0, Math.sin((hh * 6 - i * 2) * Math.PI / 2)) : 0;
    dot(p[0], p[1], 12 + 8 * pulse, pulse > 0.3 ? 'g' : 'w', a * show);
    txt(nm, p[0] + off[0], p[1] + off[1], { size: 30, fam: F.math, w: 700, c: m > 0.5 && i === 2 ? C.now : C.white, a: a * show });
  });
  const ha = Q(S, 1, 'like hands joined', 0.5) * (1 - at(S, 2, 0.5));
  if (ha > 0.003) chip(cx, 820, 560, 44, 'analogy · 比方: hands in a ring · 手拉手一圈', C.argued, a * ha, 20, F.zh);

  /* right: the ledger */
  const X0 = 960;
  panel(X0 - 20, 190, 800, 650, a * show, C.cyan, 'THE CLOSING LAW · 闭合律');
  const r0 = at(S, 0, 0.6);
  B02.rich([['a = (1, 0, 0, 0)   b = (1, 1, 0, 0)   c = (1, 0, 1, 0)', C.white]], X0, 250, { size: 25, a: a * r0 });
  B02.rich([['|a|² = 1   |b|² = 2   |c|² = 2   ⟨a,b⟩ = ⟨b,c⟩ = ⟨c,a⟩ = 1', C.dim]], X0, 288, { size: 21, a: a * r0 });
  const r1 = Q(S, 0, 'One side alone', 0.6);
  B02.rich([['cos(a, b) = ', C.white], ['1/√2', C.mag], ['   cos(b, c) = 1/2   cos(c, a) = ', C.white], ['1/√2', C.mag]], X0, 340, { size: 24, a: a * r1 });
  B02.rich([['around the loop: (1/√2)(1/2)(1/√2) = ', C.white], ['¼', C.cyan], ['   根号全消', C.dim, F.zh]], X0, 384, { size: 24, a: a * Q(S, 1, 'the roots square away', 0.6) });
  const r3 = at(S, 2, 0.6);
  if (r3 > 0.003) {
    B02.rich([['B = ⟨a,b⟩⟨b,c⟩⟨c,a⟩ / |a|²|b|²|c|² = 1/4', C.cyan]], X0, 446, { size: 26, a: a * r3 });
    B02.rich([['κ = ⟨·,·⟩² / |·|²|·|² :  κ_ab = ½   κ_bc = ¼   κ_ca = ½', C.white]], X0, 488, { size: 22, a: a * r3 });
    B02.rich([['det G₃ = 1 + 2B − (κ_ab + κ_bc + κ_ca) = 1 + ½ − 5/4 = ', C.white], ['¼', C.mag]], X0, 532, { size: 22, a: a * Q(S, 2, 'one plus two B', 0.6) });
  }
  const r4 = at(S, 3, 0.6);
  if (r4 > 0.003) {
    let x = B02.lean(X0, 600, B02.G.nonneg, a * r4, { size: 16 });
    txt('det G₃ ≥ 0', x + 18, 601, { size: 24, fam: F.math, w: 700, c: C.white, a: a * r4 });
    x = B02.lean(X0, 646, B02.G.dbl, a * Q(S, 3, 'zero when a step is doubled', 0.5), { size: 16 });
    txt('det G₃(a, b, bāb) = 0', x + 18, 647, { size: 24, fam: F.math, w: 700, c: C.now, a: a * Q(S, 3, 'zero when a step is doubled', 0.5) });
  }
  const r5 = at(S, 4, 0.6);
  if (r5 > 0.003) {
    const x = B02.lean(X0, 692, B02.G.quarter, a * Q(S, 4, 'exactly one quarter', 0.5), { size: 16 });
    txt('det G₃(a, b, c) = ¼', x + 18, 693, { size: 24, fam: F.math, w: 700, c: C.mag, a: a * Q(S, 4, 'exactly one quarter', 0.5) });
    const q = Q(S, 4, 'Spherical trigonometry closes', 0.7);
    txt('sin, cos, arccos, π  →  fractions · 分数', X0, 760, { size: 28, fam: F.disp, w: 700, c: C.white, a: a * q, ab: 1 });
    txt('one polynomial, no roots · 一条多项式，没有根号', X0, 798, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * q });
  }
  /* the closing number by the sphere: ¼ → 0 → ¼ */
  const dv = r3 > 0 ? (m > 0.98 ? '0' : m < 0.02 ? '¼' : up > 0 ? '0 → ¼' : '¼ → 0') : '';
  if (dv) txt(`det G₃ = ${dv}`, cx, 260, { size: 34, fam: F.math, w: 700, align: 'center', c: m > 0.5 ? C.now : C.mag, a: a * r3 });
};

/* ======================================================================= */
/*                            b02_next · NEXT QUESTION                       */
/* ======================================================================= */
SCENES.b02_next = S => {
  const u = S.u, a = clamp(u / 0.5);
  SPINE.rail(S, 2, a * clamp((S.d - u) / 0.6));
  const out = clamp((S.d - u) / 0.8);
  const items = [
    ['HEAP · 流群', '[a, b, c] = a · b̄ · c', C.cyan, 'A heap that multiplies'],
    ['ROTOR · 旋转', 'R = (I − X)⁻¹ (I + X)', C.vio, 'a fraction that turns'],
    ['TRIANGLE · 三角形', 'det G₃ = 1 + 2B − Σκ', C.mag, 'a triangle that closes']
  ];
  items.forEach(([hd, f, col, ph], i) => {
    const x = 380 + i * 570, al = a * out * Q(S, 0, ph, 0.6);
    if (al <= 0.003) return;
    panel(x - 240, 300, 480, 220, al, col, hd);
    txt(f, x, 430, { size: 31, fam: F.math, w: 700, align: 'center', c: C.white, a: al });
    txt('exact · rational · 精确 · 有理', x, 480, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: al });
  });
  SPINE.ask(S, 1, 'We can turn without π. Can we change without limits?', '不用 π 也能转动。不取极限，也能变化吗？');
};

/* ---- b03 · Calculus without limits · 不取极限的微积分 ---- */
/* Act b03 · Volume III (chapters 7–9) · Calculus without limits · 不取极限的微积分.
   Everything on screen is computed exactly in B03 (BigInt fractions and exact quaternions) and re-checked by
   FILM.init against independent formulas; any disagreement stops the render.
     title    secant slopes of x^3 at 2: h = 1, 1/2, 1/4 give 19, 61/4, 217/16 (computed); Berkeley, The Analyst (1734).
     dual     dual numbers (eps^2 = 0, literature: Wengert 1964): (2 + eps)^3 = 8 + 12 eps (computed).
     jet2     J2 = Q[eta]/(eta^3): (2 + eta)^3 = 8 + 12 eta + 6 eta^2 (computed); eta^3 = 0 ..... var_cube (LEAN).
     divide   1 + (1 + eta)^2 = <2, 2, 1>, inverse <1/2, -1/2, 1/4> ..... kappa_jet_one (LEAN); secant at h = 1/4:
              -18/41, off by 5/82 (computed, the closed form of ch. 7).
     series   Cos, Sin coefficient streams; c_{k+2} = -c_k / ((k+1)(k+2)) (computed); Cos^2 + Sin^2 = 1 ..... cos_sq_add_sin_sq (LEAN).
     step     x0 = 1, a = (0, -1, -2/3, -1/3), |a|^2 = 14/9 (ch. 7 example): |x(alpha)|^2 = 23/9, 1, 9/23 at alpha = 0, 1/2, 1
              (computed); drift = (1 - 2 alpha)|x - x0|^2 ..... alpha_sampling_norm_drift; midpoint unit ..... midpoint_unit_norm (LEAN).
              The step stays in the plane of 1 and a, so the drawing in that plane is exact.
     stokes   heights 0, 3, 1, 4, 2: climbs +3, -2, +3, -2 sum to 2 - 0; the loop closes to 0 ..... sum_d0, sum_d0_loop (LEAN);
              two triangles share an inner edge (hand derivation, ch. 9).
     ask      the osculating ternion-sphere manifold is the book's MODEL (argued). */
const B03 = (() => {
  const G = {
    var_cube: 'D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube',
    kappa_jet_one: 'D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one',
    cos_sq_add_sin_sq: 'D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq',
    alpha_sampling_norm_drift: 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.alpha_sampling_norm_drift',
    midpoint_unit_norm: 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.midpoint_unit_norm',
    sum_d0: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0',
    sum_d0_loop: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0_loop'
  };

  /* ---------- exact fractions (BigInt) ---------- */
  const ab = x => (x < 0n ? -x : x);
  const gcd = (a, b) => { a = ab(a); b = ab(b); while (b) [a, b] = [b, a % b]; return a; };
  function fr(n, d = 1) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('b03: zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d) || 1n;
    return { n: n / g, d: d / g };
  }
  const add = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
  const neg = a => fr(-a.n, a.d);
  const sub = (a, b) => add(a, neg(b));
  const mul = (a, b) => fr(a.n * b.n, a.d * b.d);
  const div = (a, b) => fr(a.n * b.d, a.d * b.n);
  const eq = (a, b) => a.n === b.n && a.d === b.d;
  const num = a => Number(a.n) / Number(a.d);
  const MINUS = '−';
  const str = a => (a.n < 0n ? MINUS : '') + ab(a.n).toString() + (a.d === 1n ? '' : '/' + a.d.toString());
  const Z = fr(0), ONE = fr(1);

  /* truncated power-series products: coefficient arrays of length L */
  function pmul(p, q, L) {
    const r = Array.from({ length: L }, () => Z);
    for (let i = 0; i < L; i++) for (let j = 0; i + j < L; j++) if (i < p.length && j < q.length) r[i + j] = add(r[i + j], mul(p[i], q[j]));
    return r;
  }
  const cube = (p, L) => pmul(pmul(p, p, L), p, L);

  /* title: secant slopes of x^3 at 2 */
  const f3 = x => mul(mul(x, x), x);
  const SECANT_H = [fr(1), fr(1, 2), fr(1, 4)];
  const secant = h => div(sub(f3(add(fr(2), h)), fr(8)), h);
  const SECANTS = SECANT_H.map(secant);

  /* dual and second-order jets of x^3 at 2 */
  const DUAL = cube([fr(2), ONE], 2);          // eps^2 = 0
  const JET2 = cube([fr(2), ONE], 3);          // eta^3 = 0
  const FULL = cube([fr(2), ONE], 4);          // untruncated: 8, 12, 6, 1

  /* divide: the inverse of a Jet2 with unit constant term, ch. 7 formula */
  function jinv([a0, a1, a2]) {
    const r = div(ONE, a0), u = mul(a1, r), v = mul(a2, r);
    return [r, neg(mul(r, u)), mul(r, sub(mul(u, u), v))];
  }
  const DEN = [fr(2), fr(2), fr(1)];           // 1 + (1 + eta)^2
  const KJ = jinv(DEN);
  const kap = x => div(ONE, add(ONE, mul(x, x)));
  const KS_H = fr(1, 4);
  const KSEC = div(sub(kap(add(ONE, KS_H)), kap(ONE)), KS_H);
  const KERR = sub(KSEC, KJ[1]);

  /* series: cosine and sine coefficient streams up to eta^8 */
  const NS = 9;
  const fact = n => { let f = 1n; for (let i = 2n; i <= BigInt(n); i++) f *= i; return f; };
  const COS = Array.from({ length: NS }, (_, k) => (k % 2 ? Z : fr((k / 2) % 2 ? -1 : 1, fact(k))));
  const SIN = Array.from({ length: NS }, (_, k) => (k % 2 ? fr(((k - 1) / 2) % 2 ? -1 : 1, fact(k)) : Z));
  const PYTH = pmul(COS, COS, NS).map((c, i) => add(c, pmul(SIN, SIN, NS)[i]));

  /* step: exact quaternion arithmetic, x0 = 1, a = (0, -1, -2/3, -1/3) */
  const qmul = (p, q) => [
    sub(sub(sub(mul(p[0], q[0]), mul(p[1], q[1])), mul(p[2], q[2])), mul(p[3], q[3])),
    sub(add(add(mul(p[0], q[1]), mul(p[1], q[0])), mul(p[2], q[3])), mul(p[3], q[2])),
    add(sub(add(mul(p[0], q[2]), mul(p[2], q[0])), mul(p[1], q[3])), mul(p[3], q[1])),
    sub(add(add(mul(p[0], q[3]), mul(p[3], q[0])), mul(p[1], q[2])), mul(p[2], q[1]))
  ];
  const qn2 = p => p.reduce((s, c) => add(s, mul(c, c)), Z);
  const qconj = p => [p[0], neg(p[1]), neg(p[2]), neg(p[3])];
  const qinv = p => qconj(p).map(c => div(c, qn2(p)));
  const qadd = (p, q) => p.map((c, i) => add(c, q[i]));
  const qsc = (s, p) => p.map(c => mul(s, c));
  const QONE = [ONE, Z, Z, Z];
  const QA = [Z, fr(-1), fr(-2, 3), fr(-1, 3)];
  const QK = qn2(QA);                          // 14/9
  /* (1 + alpha a) x = (1 - (1 - alpha) a) x0, x0 = 1 */
  const sample = al => qmul(qinv(qadd(QONE, qsc(al, QA))), qadd(QONE, qsc(neg(sub(ONE, al)), QA)));
  const ALPHAS = [fr(0), fr(1, 4), fr(1, 2), fr(3, 4), fr(1)];
  const STEPS = ALPHAS.map(al => { const x = sample(al); return { al, x, n2: qn2(x), d2: qn2(qadd(x, qsc(fr(-1), QONE))) }; });
  /* plane coordinates in span{1, -a}: u = real part, v = |imaginary part| (all imaginary parts are positive multiples of -a) */
  const SK = Math.sqrt(num(QK));
  const plane = al => { const a = num(al), k = num(QK); return [(1 - a * (1 - a) * k) / (1 + a * a * k), SK / (1 + a * a * k)]; };

  /* stokes: heights along a chain */
  const HEIGHTS = [0, 3, 1, 4, 2];
  const CLIMBS = HEIGHTS.slice(1).map((h, i) => h - HEIGHTS[i]);

  /* ---------- drawing helpers ---------- */
  const fade = S => clamp(S.u / 0.45) * clamp((S.d - S.u) / 0.45);
  function rich(parts, x, y, o = {}) {
    const size = o.size || 40, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    const total = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
    if (o.align === 'center') cx = x - total / 2;
    const xs = [];
    for (const [s, col, al] of parts) { xs.push([cx, cx + tw(s, size, fam, w)]); txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
    return xs;
  }
  const MISSING = new Set();
  function lean(x, y, gid, a, o = {}) {
    if (a <= 0.003) return 0;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!MISSING.has(gid)) { MISSING.add(gid); window.FILM_ERRORS.push(`b03: film.json does not cite the theorem ${gid}`); }
      return 0;
    }
    const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    const wn = tw(r.short, size, F.mono, 700), x0 = o.align === 'center' ? x - (wh + 12 + wn) / 2 : x;
    fillBox(x0, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x0 + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x0 + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    return wh + 12 + wn;
  }
  /* small evidence tag: computed (cyan), argued / model / analogy (violet), by hand (white) */
  function tag(x, y, kind, label, a, o = {}) {
    if (a <= 0.003) return;
    const col = kind === 'computed' ? C.cyan : kind === 'argued' ? C.argued : C.white;
    const size = o.size || 15, w = tw(label, size, F.zh, 700, 1) + 20;
    const x0 = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
    box(x0, y - size - 6, w, size + 14, col, a * 0.9, 1.5, rgba(mix(col, C.bg, 0.85), 0.8));
    txt(label, x0 + 10, y + 1, { size, fam: F.zh, w: 700, c: col, a, ls: 1 });
  }
  function strike(x0, x1, y, col, a) { if (a > 0.003) line(x0 - 4, y + 4, x0 - 4 + (x1 - x0 + 8) * clamp(a * 1.4), y - 22, col, Math.min(1, a * 2), 4); }
  function plot(fn, t0, t1, map, col, a, lw = 3, dash = null) {
    if (a <= 0.003) return;
    ctx.save(); if (dash) ctx.setLineDash(dash);
    curve(s => map(t0 + (t1 - t0) * s, fn(t0 + (t1 - t0) * s)), 160, col, a, lw);
    ctx.restore();
  }
  function arcS(cx, cy, r, a0, a1, col, a, lw = 3, dash = null) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
  }

  /* the independent check, run once on load */
  function check() {
    const E = window.FILM_ERRORS;
    let bad = 0;
    const ok = (c, m) => { if (!c && bad++ < 12) E.push('b03 film: ' + m); };
    for (const gid of Object.values(G)) {
      const r = leanCite(gid);
      ok(r && r.kind === 'theorem', `${gid} is not a cited theorem at the pinned commit`);
    }
    /* secants: (2 + h)^3 - 8 = 12h + 6h^2 + h^3, so the slope is 12 + 6h + h^2 */
    SECANT_H.forEach((h, i) => ok(eq(SECANTS[i], add(add(fr(12), mul(fr(6), h)), mul(h, h))), `secant ${str(h)}`));
    ok(['19', '61/4', '217/16'].every((s, i) => str(SECANTS[i]) === s), 'secant strings');
    ok(DUAL.map(str).join() === '8,12' && JET2.map(str).join() === '8,12,6' && FULL.map(str).join() === '8,12,6,1', 'jets of x^3');
    /* derivative check: f'(2) = 3*4 = 12, f''(2)/2 = 6*2/2 = 6 */
    ok(eq(JET2[1], fr(3 * 4)) && eq(JET2[2], fr(6 * 2, 2)), 'x^3 derivatives');
    /* inverse: a * a^{-1} = 1 in J2, and the closed form of ch. 7 */
    ok(pmul(DEN, KJ, 3).map(str).join() === '1,0,0', 'jet inverse');
    ok(KJ.map(str).join() === '1/2,−1/2,1/4', 'kappa jet at 1');
    const x = ONE, D = add(ONE, mul(x, x));
    ok(eq(KJ[1], div(mul(fr(-2), x), mul(D, D))) && eq(KJ[2], div(sub(mul(fr(3), mul(x, x)), ONE), mul(mul(D, D), D))), 'kappa jet formula');
    ok(str(KSEC) === '−18/41' && str(KERR) === '5/82', 'kappa secant');
    const h = KS_H, D1 = add(ONE, mul(add(x, h), add(x, h)));
    ok(eq(KERR, div(mul(h, sub(add(mul(fr(3), mul(x, x)), mul(mul(fr(2), x), h)), ONE)), mul(mul(D, D), D1))), 'secant discrepancy formula');
    /* series */
    ok(str(COS[2]) === '−1/2' && str(COS[4]) === '1/24' && str(COS[6]) === '−1/720' && str(SIN[3]) === '−1/6', 'cos / sin coefficients');
    for (let k = 0; k + 2 < NS; k++) {
      ok(eq(COS[k + 2], div(neg(COS[k]), fr((k + 1) * (k + 2)))), `cos recurrence ${k}`);
      ok(eq(SIN[k + 2], div(neg(SIN[k]), fr((k + 1) * (k + 2)))), `sin recurrence ${k}`);
    }
    ok(PYTH.map(str).join() === '1,0,0,0,0,0,0,0,0', 'cos^2 + sin^2 = 1');
    for (let k = 0; k + 1 < NS; k++) ok(eq(mul(fr(k + 1), COS[k + 1]), neg(SIN[k])), `D cos = -sin at ${k}`);
    /* step */
    ok(str(QK) === '14/9', '|a|^2');
    ok(STEPS.map(s => str(s.n2)).join() === '23/9,135/79,1,79/135,9/23', 'sampled norms');
    STEPS.forEach(s => ok(eq(sub(s.n2, ONE), mul(sub(ONE, mul(fr(2), s.al)), s.d2)), `drift identity at ${str(s.al)}`));
    STEPS.forEach(s => ok(eq(s.n2, div(add(ONE, mul(mul(sub(ONE, s.al), sub(ONE, s.al)), QK)), add(ONE, mul(mul(s.al, s.al), QK)))), `norm formula at ${str(s.al)}`));
    ok(STEPS[2].x.map(str).join() === '11/25,18/25,12/25,6/25', 'midpoint quaternion');
    STEPS.forEach(s => {
      const [u, v] = plane(s.al);
      ok(Math.abs(u - num(s.x[0])) < 1e-12 && Math.abs(u * u + v * v - num(s.n2)) < 1e-12, `plane coordinates at ${str(s.al)}`);
      const im = s.x.slice(1).map(num), dir = [1, 2 / 3, 1 / 3].map(c => c / SK);
      ok(Math.abs(im[0] - v * dir[0]) < 1e-12 && Math.abs(im[1] - v * dir[1]) < 1e-12 && Math.abs(im[2] - v * dir[2]) < 1e-12, `step in plane at ${str(s.al)}`);
    });
    /* stokes */
    ok(CLIMBS.join() === '3,-2,3,-2' && CLIMBS.reduce((s, c) => s + c, 0) === HEIGHTS[4] - HEIGHTS[0], 'telescoping chain');
    ok(CLIMBS.reduce((s, c) => s + c, 0) + (HEIGHTS[0] - HEIGHTS[4]) === 0, 'closed loop');
  }

  return { G, fr, str, num, SECANT_H, SECANTS, DUAL, JET2, FULL, KJ, KSEC, KERR, COS, SIN, PYTH, NS, QK, STEPS, plane, HEIGHTS, CLIMBS,
    fade, rich, lean, tag, strike, plot, arcS, check };
})();

FILM.init.push(() => {
  B03.check();
  Object.assign(FILM.speed, { b03_title: 0.02, b03_dual: 0.014, b03_jet2: 0.014, b03_divide: 0.016, b03_series: 0.016, b03_step: 0.016, b03_stokes: 0.018, b03_ask: 0.022 });
});

/* ======================================================================= */
/*  1 · SECANTS: the classical recipe, and Berkeley's objection             */
/* ======================================================================= */
SCENES.b03_title = S => {
  SPINE.title(S, 3, '不取极限的微积分', 'Calculus without limits');
  const a = at(S, 0, 0.6) * clamp((S.d - S.u) / 0.45);
  SPINE.rail(S, 3, a);
  if (a <= 0.003) return;
  /* graph of x^3 on [1, 3.2] */
  const X0 = 170, X1 = 1010, Y0 = 820, Y1 = 210;
  const mx = t => X0 + (X1 - X0) * (t - 1) / 2.2, my = y => Y0 - (Y0 - Y1) * y / 34;
  const map = (t, y) => [mx(t), my(y)];
  line(X0, Y0, X1 + 20, Y0, C.dim, a * 0.6, 1.5);
  line(X0, Y0, X0, Y1 - 10, C.dim, a * 0.6, 1.5);
  [1, 2, 3].forEach(t => txt(String(t), mx(t), Y0 + 30, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: a * 0.8 }));
  B03.plot(t => t * t * t, 1, 3.2, map, C.white, a * 0.9, 3);
  txt('y = x³', mx(3.05) - 120, my(31), { size: 34, fam: F.math, w: 700, c: C.white, a });
  /* secants, one per value of h */
  const cols = [C.mag, C.mag, C.mag];
  const ks = [Q(S, 1, 'Divide the rise', 0.6), Q(S, 1, 'then let h shrink', 0.6), Q(S, 1, 'then let h shrink', 0.6, 0.9)];
  B03.SECANT_H.forEach((h, i) => {
    const hv = B03.num(h), k = ks[i] * a, fade = i < 2 ? 1 - 0.65 * ks[i + 1] : 1;
    if (k <= 0.003) return;
    const sl = B03.num(B03.SECANTS[i]), tA = 1.45, tB = 3.15;
    ctx.save(); ctx.beginPath(); ctx.rect(X0, Y1 - 10, X1 - X0 + 30, Y0 - Y1 + 10); ctx.clip();
    line(mx(tA), my(8 + sl * (tA - 2)), mx(tB), my(8 + sl * (tB - 2)), cols[i], k * fade * 0.85, 2.5);
    ctx.restore();
    dot(mx(2 + hv), my(Math.pow(2 + hv, 3)), 9, 'm', k * fade);
  });
  dot(mx(2), my(8), 12, 'g', a);
  txt('(2, 8)', mx(2) + 18, my(8) + 34, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  /* the readout */
  const pa = a * Q(S, 1, 'Divide the rise', 0.6);
  if (pa > 0.003) {
    panel(1160, 240, 640, 400, pa, C.mag, 'SECANT SLOPE · 割线斜率');
    txt('((2 + h)³ − 8) / h', 1190, 312, { size: 32, fam: F.math, w: 700, c: C.white, a: pa });
    B03.SECANT_H.forEach((h, i) => {
      const k = pa * ks[i];
      txt(`h = ${B03.str(h)}`, 1190, 380 + 58 * i, { size: 30, fam: F.mono, w: 700, c: C.mag, a: k });
      txt(`→  ${B03.str(B03.SECANTS[i])}`, 1400, 380 + 58 * i, { size: 30, fam: F.mono, w: 700, c: C.white, a: k });
      if (i > 0) txt(`= ${B03.num(B03.SECANTS[i])}`, 1600, 380 + 58 * i, { size: 24, fam: F.mono, c: C.dim, a: k });
    });
    const la = pa * Q(S, 1, 'then let h shrink', 0.6, 1.6);
    txt('h → 0 ?', 1190, 580, { size: 34, fam: F.math, w: 700, c: C.mag, a: la });
    B03.tag(1780, 624, 'computed', 'NUM · 屏幕计算', pa, { align: 'right' });
  }
  /* Berkeley */
  const ba = a * at(S, 2, 0.6);
  if (ba > 0.003) {
    panel(1160, 670, 640, 150, ba, C.argued, 'THE ANALYST · 1734');
    txt('“ghosts of departed quantities”', 1190, 738, { size: 30, fam: F.disp, w: 700, c: C.white, a: ba });
    txt('÷ h  …  then  h = 0', 1190, 792, { size: 28, fam: F.math, w: 700, c: C.mag, a: ba * Q(S, 2, 'divide by h', 0.5) });
    txt('— George Berkeley', 1780, 792, { size: 20, fam: F.disp, align: 'right', c: C.dim, a: ba });
  }
};

/* ======================================================================= */
/*  2 · ONE NEW RULE: dual numbers, eps^2 = 0                              */
/* ======================================================================= */
SCENES.b03_dual = S => {
  const a = B03.fade(S);
  SPINE.rail(S, 3, a);
  /* the rule */
  const ra = a * at(S, 0, 0.6, 0.4);
  if (ra > 0.003) {
    txt('ε · ε = 0', W / 2, 300, { size: 96, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ra, ab: 2 * Q(S, 0, 'whose square', 0.6) });
    txt('one new symbol, one rule · 一个新符号，一条规矩', W / 2, 360, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra });
  }
  /* the nudge analogy */
  const na = a * at(S, 1, 0.6) * (1 - 0.6 * at(S, 2, 0.6));
  if (na > 0.003) {
    panel(330, 410, 1260, 130, na, C.argued, 'ANALOGY · 比方');
    txt('ε', 370, 472, { size: 34, fam: F.math, w: 700, c: C.white, a: na });
    txt('=  a nudge you record once · 只记一次的推动', 470, 470, { size: 30, fam: F.zh, w: 700, c: C.white, a: na });
    txt('ε · ε', 370, 518, { size: 30, fam: F.math, w: 700, c: C.argued, a: na });
    txt('=  a nudge of a nudge: never on the books · 推动的推动：不入账', 470, 516, { size: 26, fam: F.zh, w: 700, c: C.argued, a: na });
  }
  /* the cube */
  const ca = a * at(S, 2, 0.6);
  if (ca > 0.003) {
    const y = 660, wipe = Q(S, 3, 'Those vanish', 0.8);
    const xs = B03.rich([['(2 + ε)³  =  ', C.white], ['8', C.now], ['  +  ', C.white], ['12ε', C.cyan], ['  +  6ε² + ε³', C.mag, 1 - 0.6 * wipe]], W / 2, y, { size: 64, align: 'center', a: ca });
    B03.strike(xs[4][0] + 40, xs[4][1], y - 18, C.mag, a * wipe);
    if (wipe > 0.01) txt('ε² = 0  →  0', (xs[4][0] + xs[4][1]) / 2 + 20, y + 58, { size: 28, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * wipe });
    const la = a * Q(S, 3, 'Eight is the value', 0.6);
    if (la > 0.003) {
      txt('= 8 + 12ε', W / 2, 790, { size: 60, fam: F.math, w: 900, align: 'center', c: C.white, a: la, ab: 1.5 });
      const x8 = (xs[1][0] + xs[1][1]) / 2, x12 = (xs[3][0] + xs[3][1]) / 2;
      txt('value · 函数值', x8, y - 78, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: la });
      txt('slope · 斜率', x12, y - 78, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * Q(S, 3, 'twelve the slope', 0.6) });
    }
    B03.tag(1800, 820, 'computed', 'NUM · 手算', ca, { align: 'right' });
    B03.tag(120, 820, 'hand', 'dual numbers · 二元数 · literature 文献', ca);
  }
};

/* ======================================================================= */
/*  3 · KEEP THE BEND: three slots, eta^3 = 0                               */
/* ======================================================================= */
SCENES.b03_jet2 = S => {
  const a = B03.fade(S);
  SPINE.rail(S, 3, a);
  if (a <= 0.003) return;
  /* line 0: tangent loses the bend */
  const X0 = 150, X1 = 760, Y0 = 800, Y1 = 220;
  const mx = t => X0 + (X1 - X0) * (t - 1) / 2, my = y => Y0 - (Y0 - Y1) * y / 28;
  const map = (t, y) => [mx(t), my(y)];
  const ga = a * at(S, 0, 0.6, 0.2);
  if (ga > 0.003) {
    ctx.save(); ctx.beginPath(); ctx.rect(X0 - 10, Y1 - 20, X1 - X0 + 40, Y0 - Y1 + 30); ctx.clip();
    line(X0, Y0, X1, Y0, C.dim, ga * 0.5, 1.5);
    B03.plot(t => t * t * t, 1, 3, map, C.white, ga * 0.9, 3);
    B03.plot(t => 8 + 12 * (t - 2), 1, 3, map, C.dim, ga, 2.5, [10, 8]);
    const pa = a * Q(S, 2, 'six eta squared', 0.8);
    B03.plot(t => 8 + 12 * (t - 2) + 6 * (t - 2) * (t - 2), 1, 3, map, C.cyan, pa, 3.5);
    ctx.restore();
    dot(mx(2), my(8), 11, 'g', ga);
    txt('x³', mx(2.55), my(20), { size: 30, fam: F.math, w: 700, c: C.white, a: ga });
    txt('8 + 12t · tangent, no bend · 切线，没有弯曲', X0 + 10, Y1 - 4, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ga });
    txt('8 + 12t + 6t² · hugs the bend · 贴住弯曲', X0 + 10, Y1 + 30, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: pa });
    txt('t = x − 2', X1 - 10, Y0 + 34, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: ga });
  }
  /* line 1: the odometer */
  const oa = a * at(S, 1, 0.6);
  if (oa > 0.003) {
    const bx = 900, by = 300, bw = 190, gap = 24;
    txt('ODOMETER · 里程表', bx, by - 22, { size: 18, fam: F.mono, w: 700, c: C.argued, a: oa, ls: 2 });
    const roll = Q(S, 1, 'rolls off', 0.9);
    txt('analogy: no carrying, the fourth wheel just falls off · 比方：不进位，第四轮直接脱落', bx, by + 236, { size: 20, fam: F.zh, w: 700, c: C.argued, a: oa * roll });
    const labels = ['η⁰', 'η¹', 'η²'];
    const vals = [['8', C.now, Q(S, 2, 'is eight', 0.5)], ['12', C.cyan, Q(S, 2, 'twelve eta', 0.5)], ['6', C.cyan, Q(S, 2, 'six eta squared', 0.5)]];
    for (let i = 0; i < 3; i++) {
      const x = bx + i * (bw + gap);
      box(x, by, bw, 150, i === 0 ? C.now : C.cyan, oa * 0.9, 2, 'rgba(4,10,24,0.7)');
      txt(labels[i], x + bw / 2, by + 186, { size: 30, fam: F.math, w: 700, align: 'center', c: C.dim, a: oa });
      txt(vals[i][0], x + bw / 2, by + 102, { size: 70, fam: F.orb, w: 900, align: 'center', c: vals[i][1], a: oa * vals[i][2] });
    }
    /* the fourth slot rolls off to the right and empties */
    const x3 = bx + 3 * (bw + gap) + 40 * ease(roll);
    box(x3, by + 20, 110, 110, C.mag, oa * (1 - roll * 0.6), 1.5, 'rgba(4,10,24,0.5)');
    txt('η³', x3 + 55, by + 186, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag, a: oa });
    txt('0', x3 + 55, by + 98, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.mag, a: oa * roll });
    if (roll > 0.01) txt('η³ = 0', x3 + 55, by - 22, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a: oa * roll });
  }
  /* line 2: the product */
  const pa = a * at(S, 2, 0.6);
  if (pa > 0.003) {
    B03.rich([['(2 + η)³ = ', C.white], ['8', C.now], [' + ', C.white], ['12η', C.cyan], [' + ', C.white], ['6η²', C.cyan]], 1300, 600, { size: 48, align: 'center', a: pa });
    const la = a * Q(S, 2, 'Six is half', 0.6);
    txt('f(2) = 8 · f′(2) = 12 · f″(2)/2 = 6', 1300, 660, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
    B03.tag(1300, 712, 'computed', 'NUM · 手算 (2 + η)³', pa, { align: 'center' });
  }
  /* line 3: Lean */
  const lz = a * Q(S, 3, 'Lean checks', 0.6);
  if (lz > 0.003) {
    txt('(η · η) · η ≡ 0', 1040, 790, { size: 38, fam: F.math, w: 700, c: C.white, a: lz });
    B03.lean(1390, 790, B03.G.var_cube, lz, { size: 22 });
    txt('strict axioms: [] · 严格端', 1390, 824, { size: 18, fam: F.zh, w: 700, c: C.lean, a: lz * 0.85 });
  }
};

/* ======================================================================= */
/*  4 · DIVISION ENDS: the fidelity kernel at 1                             */
/* ======================================================================= */
SCENES.b03_divide = S => {
  const a = B03.fade(S);
  SPINE.rail(S, 3, a);
  if (a <= 0.003) return;
  /* graph of 1/(1 + x^2) */
  const X0 = 140, X1 = 900, Y0 = 760, Y1 = 230;
  const mx = t => X0 + (X1 - X0) * (t + 1) / 3.6, my = y => Y0 - (Y0 - Y1) * y / 1.1;
  const map = (t, y) => [mx(t), my(y)];
  const ga = a * at(S, 0, 0.6, 0.3);
  if (ga > 0.003) {
    line(X0, Y0, X1, Y0, C.dim, ga * 0.6, 1.5);
    line(mx(0), Y0, mx(0), Y1 - 20, C.dim, ga * 0.4, 1.2);
    B03.plot(t => 1 / (1 + t * t), -1, 2.6, map, C.white, ga * 0.9, 3);
    [0, 1, 2].forEach(t => txt(String(t), mx(t), Y0 + 30, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: ga * 0.8 }));
    txt('κ(x) = 1 / (1 + x²)', mx(1.15), Y1 + 30, { size: 36, fam: F.math, w: 700, c: C.white, a: ga });
    /* jet parabola at 1 */
    const ja = a * Q(S, 1, 'one half', 0.8);
    ctx.save(); ctx.beginPath(); ctx.rect(X0, Y1 - 20, X1 - X0, Y0 - Y1 + 20); ctx.clip();
    B03.plot(t => 0.5 - 0.5 * (t - 1) + 0.25 * (t - 1) * (t - 1), 0.35, 2.1, map, C.cyan, ja, 3.5);
    /* secant to 1 + 1/4 */
    const sa = a * Q(S, 2, 'A secant with step', 0.6);
    const sl = B03.num(B03.KSEC);
    line(mx(0.2), my(0.5 + sl * -0.8), mx(2.2), my(0.5 + sl * 1.2), C.mag, sa, 2.5);
    ctx.restore();
    dot(mx(1.25), my(16 / 41), 9, 'm', sa);
    dot(mx(1), my(0.5), 12, 'g', ga);
    txt('x = 1', mx(1) + 16, my(0.5) - 20, { size: 24, fam: F.mono, w: 700, c: C.now, a: ga });
  }
  /* the inverse readout */
  const pa = a * at(S, 1, 0.6);
  if (pa > 0.003) {
    panel(1000, 220, 800, 300, pa, C.cyan, 'JET INVERSE · 射流求逆');
    txt('1 + (1 + η)² = 2 + 2η + η²', 1030, 296, { size: 32, fam: F.math, w: 700, c: C.white, a: pa });
    const ia = a * Q(S, 1, 'one half', 0.6);
    B03.rich([['⟨2, 2, 1⟩⁻¹ = ⟨', C.white], ['1/2', C.now], [', ', C.white], ['−1/2', C.cyan], [', ', C.white], ['1/4', C.cyan], ['⟩', C.white]], 1030, 370, { size: 40, a: ia });
    txt('value · slope · half the bend · 值 · 斜率 · 半曲率', 1030, 412, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ia });
    const lz = a * Q(S, 1, 'one half', 0.6, 0.8);
    B03.lean(1030, 480, B03.G.kappa_jet_one, lz, { size: 22 });
  }
  /* the secant readout */
  const sa = a * at(S, 2, 0.6);
  if (sa > 0.003) {
    panel(1000, 550, 800, 170, sa, C.mag, 'SECANT · 割线 · h = 1/4');
    B03.rich([['slope ', C.white], [B03.str(B03.KSEC), C.mag], ['   true ', C.white], [B03.str(B03.KJ[1]), C.cyan]], 1030, 624, { size: 34, fam: F.mono, a: sa });
    const ea = a * Q(S, 2, 'misses the slope', 0.6);
    B03.rich([['off by exactly ', C.white], ['+' + B03.str(B03.KERR), C.mag]], 1030, 676, { size: 34, fam: F.mono, a: ea });
    B03.tag(1780, 700, 'computed', 'NUM', sa, { align: 'right' });
  }
  /* the analogy */
  const na = a * at(S, 3, 0.6);
  if (na > 0.003) {
    B03.tag(1000, 782, 'argued', 'ANALOGY · 比方', na);
    txt('secant = two snapshots + a guess · 两张快照加一个猜测', 1000, 816, { size: 24, fam: F.zh, w: 700, c: C.mag, a: na });
    txt('jet = the speedometer · 速度表', 1180, 782, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: na });
  }
};

/* ======================================================================= */
/*  5 · ANY ORDER: cosine and sine as streams of fractions                  */
/* ======================================================================= */
SCENES.b03_series = S => {
  const a = B03.fade(S);
  SPINE.rail(S, 3, a);
  if (a <= 0.003) return;
  /* line 0: the old alibi */
  const ia = a * at(S, 0, 0.6, 0.2) * (1 - at(S, 1, 0.6));
  if (ia > 0.003) {
    txt('sin · cos · exp', W / 2, 400, { size: 80, fam: F.math, w: 700, align: 'center', c: C.white, a: ia });
    txt('→  ∞ series  ·  π', W / 2, 500, { size: 56, fam: F.math, w: 700, align: 'center', c: C.mag, a: ia * Q(S, 0, 'the alibi', 0.6) });
    txt('the old alibi · 老托辞', W / 2, 560, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ia * Q(S, 0, 'the alibi', 0.6) });
  }
  /* the coefficient strip */
  const ta = a * at(S, 1, 0.6);
  if (ta > 0.003) {
    const x0 = 340, cw = 156, y0 = 300, rh = 110;
    for (let k = 0; k < B03.NS; k++) txt(k === 0 ? '1' : k === 1 ? 'η' : 'η' + '⁰¹²³⁴⁵⁶⁷⁸'[k], x0 + k * cw + cw / 2, y0 - 26, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a: ta });
    const rows = [['Cos', B03.COS, C.cyan, 0], ['Sin', B03.SIN, C.cyan, 1]];
    /* the cut: amber marker at the current truncation order */
    const pick = Q(S, 2, 'Stop at any order', 0.8);
    const N = 2 + Math.round(6 * clamp(Q(S, 1, 'one twenty-fourth', 3.0))), NC = 4, dimOn = pick * (1 - at(S, 3, 0.6, 1.4));
    rows.forEach(([nm, cs, col, r]) => {
      const y = y0 + r * rh;
      txt(nm, x0 - 30, y + 48, { size: 34, fam: F.math, w: 700, align: 'right', c: col, a: ta * (r === 0 ? 1 : at(S, 2, 0.6)) });
      for (let k = 0; k < B03.NS; k++) {
        const ra = ta * (r === 0 ? clamp((N - k + 1)) : at(S, 2, 0.6)) * (k <= NC ? 1 : 1 - 0.75 * dimOn);
        box(x0 + k * cw + 6, y + 4, cw - 12, rh - 22, col, ra * 0.55, 1.2, 'rgba(4,10,24,0.6)');
        const s = B03.str(cs[k]);
        txt(s, x0 + k * cw + cw / 2, y + 60, { size: s.length > 6 ? 22 : 30, fam: F.mono, w: 700, align: 'center', c: s === '0' ? C.dim : C.white, a: ra });
      }
    });
    /* knitting arrows on the cosine row */
    const ka = a * Q(S, 2, 'knitting pattern', 0.6);
    for (let k = 0; k + 2 < B03.NS; k += 2) {
      const xa = x0 + k * cw + cw / 2, xb = x0 + (k + 2) * cw + cw / 2;
      ctx.save(); ctx.globalAlpha = ka * 0.85; ctx.strokeStyle = C.argued; ctx.lineWidth = 2.5; ctx.beginPath();
      ctx.moveTo(xa + 14, y0 - 52); ctx.quadraticCurveTo((xa + xb) / 2, y0 - 118, xb - 14, y0 - 52); ctx.stroke(); ctx.restore();
    }
    if (ka > 0.003) {
      txt('c(k + 2)  =  − c(k) / ((k + 1)(k + 2))', 1500, 548, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: ka });
      B03.tag(1500, 590, 'argued', 'knitting = analogy · 编织是比方', ka, { align: 'center' });
    }
    if (dimOn > 0.003) {
      const xc = x0 + (NC + 1) * cw;
      line(xc, y0 - 20, xc, y0 + 2 * rh + 10, C.now, a * dimOn, 3);
      txt(`stop at order ${NC} · 停在第 ${NC} 阶`, xc - 14, y0 + 2 * rh + 40, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a: a * dimOn });
    }
    /* Pythagoras */
    const pa = a * at(S, 3, 0.6);
    if (pa > 0.003) {
      const y = y0 + 2 * rh + 120;
      txt('Cos² + Sin²', x0 - 30, y + 48, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white, a: pa });
      for (let k = 0; k < B03.NS; k++) {
        const kk = clamp((S.u - lineAt(S, 3).s - 0.4 - 0.12 * k) / 0.3);
        box(x0 + k * cw + 6, y + 4, cw - 12, rh - 22, C.white, pa * kk * 0.5, 1.2, 'rgba(4,10,24,0.6)');
        txt(B03.str(B03.PYTH[k]), x0 + k * cw + cw / 2, y + 60, { size: 32, fam: F.mono, w: 700, align: 'center', c: k === 0 ? C.white : C.dim, a: pa * kk });
      }
      B03.tag(x0, y + 128, 'computed', 'NUM · 前 9 个系数', pa);
      const lz = a * Q(S, 3, 'Cosine squared plus sine squared', 0.6, 1.2);
      txt('Cos·Cos + Sin·Sin ≡ 1, every coefficient · 每个系数', 820, y + 128, { size: 24, fam: F.zh, w: 700, c: C.white, a: lz });
      B03.lean(820, y + 166, B03.G.cos_sq_add_sin_sq, lz, { size: 22 });
      txt('strict axioms: [] · no π · 严格端', 1300, y + 166, { size: 20, fam: F.zh, w: 700, c: C.lean, a: lz * 0.85 });
    }
  }
};

/* ======================================================================= */
/*  6 · STAY ON THE SPHERE: the alpha-sampled step                          */
/* ======================================================================= */
SCENES.b03_step = S => {
  const a = B03.fade(S);
  SPINE.rail(S, 3, a);
  if (a <= 0.003) return;
  const cx = 470, cy = 560, R = 215;
  const P = ([u, v]) => [cx + R * v, cy - R * u];       /* x0 = 1 at the top, the step goes right */
  const ga = a * at(S, 0, 0.6, 0.2);
  /* the unit circle in the plane of 1 and the step (the whole step lies in that plane) */
  B03.arcS(cx, cy, R, 0, TAU, C.white, ga * 0.7, 2.5);
  txt('unit sphere, cut through x₀ and the step, to scale · 过 x₀ 与步向的截面，按比例', cx - R - 40, cy + R + 52, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ga });
  const X0p = P([1, 0]);
  dot(X0p[0], X0p[1], 12, 'w', ga);
  txt('x₀', X0p[0] - 44, X0p[1] - 12, { size: 30, fam: F.math, w: 700, c: C.white, a: ga });
  /* samples: alpha = 0 (flies off), 1 (sinks), 1/2 (stays) */
  const marks = [
    [0, 'α = 0', C.mag, 'm', Q(S, 0, 'Aim along the tangent', 0.8)],
    [4, 'α = 1', C.cyan, 'c', Q(S, 1, 'Aim at the end', 0.8)],
    [2, 'α = 1/2', C.now, 'g', Q(S, 2, 'At the midpoint', 0.8)]
  ];
  for (const [i, lab, col, pn, k0] of marks) {
    const k = a * k0;
    if (k <= 0.003) continue;
    const st = B03.STEPS[i], pt = P(B03.plane(st.al));
    line(X0p[0], X0p[1], lerp(X0p[0], pt[0], ease(k0)), lerp(X0p[1], pt[1], ease(k0)), col, k, 3.5);
    dot(pt[0], pt[1], 13, pn, k * ease(k0));
    const s1 = lab, s2 = `|x|² = ${B03.str(st.n2)}`;
    if (i === 0) { txt(s1, pt[0], pt[1] - 58, { size: 28, fam: F.math, w: 700, align: 'center', c: col, a: k }); txt(s2, pt[0], pt[1] - 26, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: k }); }
    else if (i === 4) { txt(s1, pt[0] - 22, pt[1] + 36, { size: 28, fam: F.math, w: 700, align: 'right', c: col, a: k }); txt(s2, pt[0] - 22, pt[1] + 68, { size: 26, fam: F.mono, w: 700, align: 'right', c: col, a: k }); }
    else { txt(s1, pt[0] + 26, pt[1] + 2, { size: 28, fam: F.math, w: 700, c: col, a: k }); txt(s2, pt[0] + 26, pt[1] + 34, { size: 26, fam: F.mono, w: 700, c: col, a: k }); }
  }
  /* the table */
  const ta = a * at(S, 1, 0.6);
  if (ta > 0.003) {
    panel(1080, 210, 720, 330, ta, C.cyan, 'SQUARED LENGTH · 模方 · |a|² = 14/9');
    B03.STEPS.forEach((st, i) => {
      const col = i < 2 ? C.mag : i === 2 ? C.now : C.cyan;
      const k = i === 2 ? Q(S, 2, 'At the midpoint', 0.6) : 1;
      const y = 278 + 50 * i;
      txt(`α = ${B03.str(st.al)}`, 1110, y, { size: 30, fam: F.math, w: 700, c: col, a: ta * (i === 2 ? Math.max(0.35, k) : 1) });
      txt(`${B03.str(st.n2)}`, 1330, y, { size: 28, fam: F.mono, w: 700, c: C.white, a: ta * (i === 2 ? Math.max(0.35, k) : 1) });
      const dr = i < 2 ? 'flies off · 外漂' : i === 2 ? 'stays · 驻球' : 'sinks · 内缩';
      txt(dr, 1500, y, { size: 22, fam: F.zh, w: 700, c: col, a: ta * (i === 2 ? k : 0.85) });
    });
    B03.tag(1780, 528, 'computed', 'NUM · 书中例子 x₀ = 1', ta, { align: 'right' });
  }
  /* the drift law */
  const da = a * at(S, 2, 0.6);
  if (da > 0.003) {
    panel(1080, 570, 720, 170, da, C.lean, null);
    B03.rich([['|x|² − 1 = (', C.white], ['1 − 2α', C.now], [') · |x − x₀|²', C.white]], 1110, 630, { size: 34, a: da });
    B03.lean(1110, 680, B03.G.alpha_sampling_norm_drift, da, { size: 20 });
    B03.lean(1110, 722, B03.G.midpoint_unit_norm, a * Q(S, 2, 'that is zero', 0.6), { size: 20 });
  }
  /* the seesaw */
  const sa = a * at(S, 3, 0.6);
  if (sa > 0.003) {
    const bx = 1600, by = 800, tilt = 0.12 * (1 - ease(Q(S, 3, 'balances only in the middle', 1.0)));
    B03.tag(1080, 800, 'argued', 'ANALOGY · 比方 · seesaw 跷跷板', sa);
    ctx.save(); ctx.translate(bx, by); ctx.rotate(tilt);
    line(-170, 0, 170, 0, C.argued, sa, 5);
    ctx.restore();
    ctx.save(); ctx.globalAlpha = sa; ctx.fillStyle = C.now; ctx.beginPath(); ctx.moveTo(bx, by + 4); ctx.lineTo(bx - 18, by + 34); ctx.lineTo(bx + 18, by + 34); ctx.closePath(); ctx.fill(); ctx.restore();
  }
};

/* ======================================================================= */
/*  7 · EXACT ON A COARSE GRID: telescoping chains and Stokes               */
/* ======================================================================= */
SCENES.b03_stokes = S => {
  const a = B03.fade(S);
  SPINE.rail(S, 3, a);
  if (a <= 0.003) return;
  /* line 0: fine slicing vs a coarse path */
  const fa = a * at(S, 0, 0.6, 0.2) * (1 - at(S, 1, 0.6, 2.4));
  if (fa > 0.003) {
    for (let i = 0; i < 40; i++) {
      const x = 260 + i * 17, h = 60 + 140 * Math.sin(i / 40 * Math.PI);
      box(x, 640 - h, 15, h, C.dim, fa * 0.6, 1, rgba(C.dim, 0.15));
    }
    txt('h → 0 · slice finer · 越切越细', 600, 410, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.mag, a: fa });
    txt('summing differences: four steps, exact · 差分求和：四步即精确', 1400, 410, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * at(S, 0, 0.6, 0.2) * (1 - at(S, 1, 0.5)) * Q(S, 0, 'a coarse path', 0.6) });
  }
  /* the chain of heights */
  const ca = a * at(S, 0, 0.6, 1.2);
  const H = B03.HEIGHTS, xs = H.map((_, i) => 1020 + i * 175), yh = h => 600 - 55 * h, BASE = 620;
  if (ca > 0.003) {
    const ha = a * Q(S, 1, 'Give each point a height', 0.6);
    for (let i = 0; i < H.length; i++) {
      line(xs[i], BASE, xs[i], yh(H[i]), C.dim, ca * 0.3, 1);
      dot(xs[i], yh(H[i]), 11, i === 0 || i === H.length - 1 ? 'g' : 'w', ca);
      txt(String(H[i]), xs[i], yh(H[i]) - 22, { size: 26, fam: F.mono, w: 700, align: 'center', c: i === 0 || i === H.length - 1 ? C.now : C.white, a: ha });
    }
    line(xs[0] - 30, BASE, xs[H.length - 1] + 30, BASE, C.dim, ca * 0.5, 1.5);
    const ea = a * Q(S, 1, 'records its climb', 0.6);
    B03.CLIMBS.forEach((c, i) => {
      const k = clamp(ea * 4 - i);
      arrow(xs[i] + 12, yh(H[i]), lerp(xs[i] + 12, xs[i + 1] - 12, k), lerp(yh(H[i]), yh(H[i + 1]), k), C.cyan, a * k, 3);
      txt((c > 0 ? '+' : '−') + Math.abs(c), (xs[i] + xs[i + 1]) / 2 + (c > 0 ? 16 : 22), (yh(H[i]) + yh(H[i + 1])) / 2 + (c > 0 ? 10 : -18), { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a * k });
    });
    const sa = a * Q(S, 1, 'Add the climbs', 0.6);
    if (sa > 0.003) {
      txt('3 − 2 + 3 − 2  =  2  =  2 − 0', 1410, 760, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
      txt('last minus first · 终点减起点', 1410, 798, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: sa });
    }
    /* round trip */
    const la = a * Q(S, 2, 'round trip', 0.6);
    if (la > 0.003) {
      ctx.save(); ctx.globalAlpha = la; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath();
      ctx.moveTo(xs[4], yh(H[4]) + 14); ctx.quadraticCurveTo((xs[0] + xs[4]) / 2, 730, xs[0] + 4, yh(H[0]) + 14); ctx.stroke(); ctx.restore();
      txt('−2 back · 回程', (xs[0] + xs[4]) / 2 + 180, 700, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
      txt('round trip: 3 − 2 + 3 − 2 − 2 = 0 · 一圈 = 0', 1410, 840, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
    }
  }
  /* the bank statement analogy */
  const ba = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.6));
  if (ba > 0.003) {
    panel(150, 260, 760, 230, ba, C.argued, 'ANALOGY · 比方 · BANK STATEMENT');
    txt('point = a day · 点 = 一天', 180, 330, { size: 26, fam: F.zh, w: 700, c: C.white, a: ba });
    txt('height = the balance · 高度 = 余额', 180, 374, { size: 26, fam: F.zh, w: 700, c: C.white, a: ba });
    txt('climb = that day\'s change · 爬升 = 当天变动', 180, 418, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: ba });
    txt('sum = closing − opening · 总和 = 期末 − 期初', 180, 462, { size: 26, fam: F.zh, w: 700, c: C.now, a: ba });
  }
  /* Lean and the two triangles */
  const lz = a * at(S, 3, 0.6);
  if (lz > 0.003) {
    B03.lean(150, 270, B03.G.sum_d0, lz, { size: 22 });
    txt('chain sum = last − first · 链和 = 终 − 始', 150, 306, { size: 22, fam: F.zh, w: 700, c: C.white, a: lz });
    B03.lean(150, 360, B03.G.sum_d0_loop, lz, { size: 22 });
    txt('closed chain sums to 0 · 闭链为零', 150, 396, { size: 22, fam: F.zh, w: 700, c: C.white, a: lz });
    txt('any vertex type · any commutative group · 任意顶点 · 任意交换群', 150, 436, { size: 20, fam: F.zh, w: 700, c: C.lean, a: lz * 0.85 });
    const ta = a * Q(S, 4, 'Glue triangles', 0.8);
    if (ta > 0.003) {
      const A = [240, 720], B = [520, 520], Cc = [800, 720], D = [520, 830];
      const tri = (p, q, r, col) => { ctx.save(); ctx.globalAlpha = ta * 0.18; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.lineTo(...r); ctx.closePath(); ctx.fill(); ctx.restore(); };
      tri(A, B, D, C.cyan); tri(B, Cc, D, C.cyan);
      const rim = Q(S, 4, 'only the rim survives', 0.8);
      [[A, B], [B, Cc], [Cc, D], [D, A]].forEach(([p, q]) => line(p[0], p[1], q[0], q[1], C.now, ta * (0.5 + 0.5 * rim), 3.5));
      /* the inner edge, walked once each way */
      const off = 7, inner = 1 - 0.85 * rim;
      arrow(B[0] - off, B[1] + 20, D[0] - off, D[1] - 20, C.mag, ta * inner, 2.5);
      arrow(D[0] + off, D[1] - 20, B[0] + off, B[1] + 20, C.mag, ta * inner, 2.5);
      txt('+e  −e = 0', B[0] + 26, (B[1] + D[1]) / 2 + 8, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ta * inner });
      txt('rim · 外缘', Cc[0] + 16, Cc[1] - 30, { size: 22, fam: F.zh, w: 700, c: C.now, a: ta * rim });
      B03.tag(A[0] - 90, 860, 'hand', 'BY HAND · 手工推导 (ch. 9)', ta);
    }
  }
};

/* ======================================================================= */
/*  8 · CURVED CAPS, and the next question                                  */
/* ======================================================================= */
SCENES.b03_ask = S => {
  const a = clamp(S.u / 0.45);
  SPINE.rail(S, 3, a);
  const qa = at(S, 3, 0.6), ma = a * (1 - 0.75 * qa), la = a * (1 - qa);
  if (ma > 0.003) {
    /* the same curved shape twice (an ellipse, a schematic): flat plates on the left, osculating circles on the right */
    const cx = [560, 1360], cy = 450, EA = 230, EB = 150;
    const ept = (c, t) => [c + EA * Math.cos(t), cy + EB * Math.sin(t)];
    const ell = (c, col, al) => { if (al <= 0.003) return; ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(c, cy, EA, EB, 0, 0, TAU); ctx.stroke(); ctx.restore(); };
    const pa0 = ma * at(S, 0, 0.6, 0.3);
    ell(cx[0], C.white, pa0 * 0.6);
    const n = 8;
    for (let i = 0; i < n; i++) {
      const t = TAU * i / n, p = ept(cx[0], t), d = [-EA * Math.sin(t), EB * Math.cos(t)], L = Math.hypot(d[0], d[1]), hw = 62;
      line(p[0] - hw * d[0] / L, p[1] - hw * d[1] / L, p[0] + hw * d[0] / L, p[1] + hw * d[1] / L, C.mag, pa0, 4);
      dot(p[0], p[1], 6, 'm', pa0);
    }
    txt('flat plates + bump glue · 平直切板 + 隆起胶水', cx[0], cy + EB + 70, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: la * at(S, 0, 0.6, 0.3) });
    txt('disco ball of flat mirrors · 平面镜迪斯科球', cx[0], cy + EB + 104, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la * at(S, 1, 0.6) });
    const ca = ma * at(S, 1, 0.6);
    if (ca > 0.003) {
      ell(cx[1], C.white, ca * 0.6);
      for (let i = 0; i < n; i++) {
        const t = TAU * i / n, p = ept(cx[1], t);
        const sp = EA * EA * Math.sin(t) * Math.sin(t) + EB * EB * Math.cos(t) * Math.cos(t), Rc = Math.pow(sp, 1.5) / (EA * EB);
        const nx = -EB * Math.cos(t) / Math.sqrt(sp), ny = -EA * Math.sin(t) / Math.sqrt(sp);   /* inward unit normal */
        const ox = p[0] + Rc * nx, oy = p[1] + Rc * ny, th = Math.atan2(p[1] - oy, p[0] - ox), span = 80 / Rc;
        if (Rc < 160) B03.arcS(ox, oy, Rc, 0, TAU, C.argued, ca * 0.3, 1.5);
        B03.arcS(ox, oy, Rc, th - span, th + span, C.argued, ca, 5);
        dot(p[0], p[1], 6, 'v', ca);
      }
      txt('curved caps, fit to second order · 二阶吻合的球冠', cx[1], cy + EB + 70, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: la * at(S, 1, 0.6) });
      B03.tag(cx[1], cy + EB + 110, 'argued', 'MODEL · 本书的模型 · schematic 示意', la * at(S, 1, 0.6), { align: 'center' });
    }
    /* line 2: paths measured, the sphere not yet */
    const pa = la * at(S, 2, 0.6);
    if (pa > 0.003) {
      txt('paths: exact · 路径：精确', W / 2, 220, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: pa });
      txt('the whole sphere: 4πr² · 整只球面：4πr²', W / 2, 256, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.mag, a: pa * Q(S, 2, 'Measuring a whole sphere', 0.6) });
    }
  }
  SPINE.ask(S, 3, 'If we can differentiate without limits, can we integrate without π?', '不取极限能求导，不用 π 能积分吗？');
};

/* ---- b04 · Rational harmonics on the three-sphere · 三维球面上的有理谐波 ---- */
/* Act b04 · Volume IV (chapters 10–12) · Rational harmonics on the three-sphere · 三维球面上的有理谐波.
   Everything on screen is computed exactly inside B04 from the book's definitions:
     even characters E_0 = 1, E_1 = 4κ − 1, E_{n+1} = (4κ − 2)E_n − E_{n−1} (ch. 10);
     pi-free Haar moments E[κ^k] = (2k)! / (4^k k! (k+1)!), step (2k+1) / (2(k+2)), ⟨f, g⟩ = E[f g] (ch. 11);
     QSqrt2 pairs (p, q)(r, s) = (pr + 2qs, ps + qr) and the Schur floor of 2x² + 2xy + (3/2)y² (ch. 12).
   FILM.init re-derives every printed number a second way and stops the render on any mismatch. */
const B04 = (() => {
  /* ---------- exact rationals [num, den] as BigInt pairs ---------- */
  const big = x => (typeof x === 'bigint' ? x : BigInt(x));
  const babs = x => (x < 0n ? -x : x);
  const gcd = (a, b) => { a = babs(a); b = babs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1n; };
  const fr = (n, d = 1) => { n = big(n); d = big(d); if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d); return [n / g, d / g]; };
  const fadd = (p, q) => fr(p[0] * q[1] + q[0] * p[1], p[1] * q[1]);
  const fmul = (p, q) => fr(p[0] * q[0], p[1] * q[1]);
  const feq = (p, q) => big(p[0]) * big(q[1]) === big(q[0]) * big(p[1]);
  const fneg = p => p[0] < 0n;
  const fabs = p => [babs(p[0]), p[1]];
  const fstr = p => (p[0] < 0n ? '−' : '') + (p[1] === 1n ? String(babs(p[0])) : `${babs(p[0])}/${p[1]}`);
  const fact = n => (n <= 1 ? 1n : BigInt(n) * fact(n - 1));

  /* ---------- polynomials in κ, ascending integer coefficients ---------- */
  const pmul = (p, q) => { const r = new Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { r[i + j] += a * b; })); return r; };
  const psub = (p, q) => { const n = Math.max(p.length, q.length), r = []; for (let i = 0; i < n; i++) r.push((p[i] || 0) - (q[i] || 0)); return r; };
  const peval = (p, x) => p.reduceRight((s, c) => s * x + c, 0);
  const E = [[1], [-1, 4]];
  while (E.length < 8) E.push(psub(pmul([-2, 4], E[E.length - 1]), E[E.length - 2]));

  /* ---------- the pi-free Haar moments ---------- */
  const moment = k => fr(fact(2 * k), 4n ** BigInt(k) * fact(k) * fact(k + 1));
  const step = k => fr(2 * k + 1, 2 * (k + 2));
  const H4 = (a, b, c, d) => { const m = a + b + c + d; return fr(fact(2 * a) * fact(2 * b) * fact(2 * c) * fact(2 * d), 4n ** BigInt(m) * fact(a) * fact(b) * fact(c) * fact(d) * fact(m + 1)); };
  const haar = p => p.reduce((s, c, k) => fadd(s, fmul(fr(c), moment(k))), fr(0));
  const inner = (p, q) => haar(pmul(p, q));
  /* term-by-term ledger of an inner product: [coefficient, moment, product], highest power first */
  const ledger = (p, q) => pmul(p, q).map((c, k) => [c, moment(k), fmul(fr(c), moment(k))]).reverse();

  /* ---------- Chebyshev U over the integers, for the cross-check of E_n(x²) = U_{2n}(x) ---------- */
  const U = (x, n) => { let a = 1, b = 2 * x; if (n === 0) return 1; for (let i = 1; i < n; i++) { const c = 2 * x * b - a; a = b; b = c; } return b; };

  /* ---------- QSqrt2: pairs (p, q) = p + qδ with δ² = 2 ---------- */
  const qmul = (z, w) => [z[0] * w[0] + 2 * z[1] * w[1], z[0] * w[1] + z[1] * w[0]];

  /* ---------- the Schur example a = 2, b = 1, c = 3/2 ---------- */
  const SA = fr(2), SB = fr(1), SC = fr(3, 2);
  const schurVal = fadd(SA, fmul(fr(-1), fmul(fmul(SB, SB), fr(SC[1], SC[0]))));   // a − b²/c
  const ystar = fmul(fr(-1), fmul(SB, fr(SC[1], SC[0])));                          // −(b/c)·x at x = 1
  const form = (x, y) => 2 * x * x + 2 * x * y + 1.5 * y * y;

  /* ---------- drawing helpers ---------- */
  const KIND = { lean: ['LEAN ✓', 'lean'], computed: ['NUM', 'cyan'], argued: ['ARGUED', 'argued'], lit: ['LITERATURE', 'argued'], open: ['OPEN', 'open'] };
  /* a free-standing grounds tag (the engine's badge sits under the position rail, so the act places its own) */
  function tag(x, y, kind, text, a, o = {}) {
    if (a <= 0.003) return;
    const [head, ck] = KIND[kind], col = C[ck];
    const hw = tw(head, 15, F.mono, 700, 2) + 20, bw = tw(text, 15, F.mono, 700, 1) + 24, w = hw + bw;
    const x0 = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
    fillBox(x0 + hw, y - 22, bw, 30, mix(col, C.bg, 0.84), a * 0.9);
    box(x0, y - 22, w, 30, col, a * 0.8, 1);
    fillBox(x0, y - 22, hw, 30, col, a);
    txt(head, x0 + 10, y - 1, { size: 15, fam: F.mono, w: 700, c: C.bg, a, ls: 2 });
    txt(text, x0 + hw + 12, y - 1, { size: 15, fam: F.mono, w: 700, c: col, a, ls: 1 });
  }
  /* one Lean citation, looked up by its whole GID: green head + short name, the full label small underneath */
  function leanChip(x, y, gid, a, o = {}) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', size = o.size || 22, hw = tw(head, 17, F.mono, 700, 1) + 26;
    fillBox(x, y - 23, hw, 31, C.lean, a);
    txt(head, x + 10, y - 2, { size: 17, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + hw + 16, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    if (o.full !== false) txt(r.label, x, y + 26, { size: 13, fam: F.mono, c: C.lean, a: a * 0.65 });
  }
  /* a struck-through formula: the line sweeps across as k goes 0 → 1 */
  function strike(x, y, w, k, a, col = C.open) {
    if (k <= 0 || a <= 0.003) return;
    line(x, y, x + w * clamp(k), y, col, a, 4);
  }
  const GID = {
    even: 'D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.even_chebyshev',
    step: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.haarKappaMoment_succ',
    gram3: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal',
    gramAll: 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal',
    bell: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_bell',
    schur: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min'
  };
  const POLY = ['E₀ = 1', 'E₁ = 4κ − 1', 'E₂ = 16κ² − 12κ + 1', 'E₃ = 64κ³ − 80κ² + 24κ − 1'];
  /* a closed loop carrying a wave of n wavelengths: integer n closes, a fractional n leaves a seam */
  function waveLoop(cx, cy, R, n, col, a, turn = 1) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath();
    const N = 240;
    for (let i = 0; i <= N * turn; i++) {
      const th = (i / N) * TAU, r = R + 0.16 * R * Math.sin(n * th);
      const x = cx + r * Math.cos(th - TAU / 4), y = cy + r * Math.sin(th - TAU / 4);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.restore();
    ring(cx, cy, R, C.dim, a * 0.35, 1);
  }
  const PLOT = { x: 1010, y: 230, w: 760, h: 420, y0: -1.6, y1: 7.6 };
  return { PLOT, fr, fneg, fabs, fadd, fmul, feq, fstr, fact, pmul, peval, E, moment, step, H4, haar, inner, ledger, U, qmul,
    schurVal, ystar, form, tag, leanChip, strike, GID, POLY, waveLoop };
})();

FILM.init.push(() => {
  const B = B04, bad = m => window.FILM_ERRORS.push('b04: ' + m);
  /* the characters printed on screen */
  const want = [[1], [-1, 4], [1, -12, 16], [-1, 24, -80, 64]];
  want.forEach((w, n) => { if (B.E[n].join() !== w.join()) bad(`E_${n} is ${B.E[n]}`); });
  /* E_n(1) = 2n + 1 */
  for (let n = 0; n < 8; n++) if (B.peval(B.E[n], 1) !== 2 * n + 1) bad(`E_${n}(1) ≠ ${2 * n + 1}`);
  /* E_n(x²) = U_{2n}(x) on small integers (the identity Lean states for all) */
  for (let n = 0; n < 7; n++) for (let x = -3; x <= 3; x++) if (B.peval(B.E[n], x * x) !== B.U(x, 2 * n)) bad(`E_${n}(${x}²) ≠ U_${2 * n}(${x})`);
  /* the moment ladder, its steps, and the Catalan form C_k / 4^k */
  const ladder = [[1, 1], [1, 4], [1, 8], [5, 64], [7, 128], [21, 512]];
  ladder.forEach((m, k) => { if (!B.feq(B.moment(k), m)) bad(`E[κ^${k}] = ${B.moment(k)}`); });
  const cat = k => B.fact(2 * k) / (B.fact(k) * B.fact(k + 1));
  for (let k = 0; k < 9; k++) {
    if (!B.feq(B.moment(k + 1), B.fmul(B.moment(k), B.step(k)))) bad(`step fails at k = ${k}`);
    if (!B.feq(B.moment(k), B.fr(cat(k), Math.pow(4, k)))) bad(`Catalan form fails at k = ${k}`);
    if (!B.feq(B.moment(k), B.H4(k, 0, 0, 0))) bad(`H(k,0,0,0) ≠ moment at k = ${k}`);
  }
  [[1, 4], [1, 2], [5, 8], [7, 10]].forEach((s, k) => { if (!B.feq(B.step(k), s)) bad(`step ${k}`); });
  /* normalisation check printed on screen: 4·H(2,0,0,0) + 12·H(1,1,0,0) = 1 */
  if (!B.feq(B.fadd(B.fmul(B.fr(4), B.H4(2, 0, 0, 0)), B.fmul(B.fr(12), B.H4(1, 1, 0, 0))), B.fr(1))) bad('normalisation');
  if (!B.feq(B.H4(2, 0, 0, 0), [1, 8]) || !B.feq(B.H4(1, 1, 0, 0), [1, 24])) bad('H values');
  /* orthonormality of all pairs up to degree 7 */
  for (let m = 0; m < 8; m++) for (let n = 0; n < 8; n++) if (!B.feq(B.inner(B.E[m], B.E[n]), B.fr(m === n ? 1 : 0))) bad(`⟨E${m},E${n}⟩`);
  /* the two ledgers spoken aloud */
  const l12 = B.ledger(B.E[1], B.E[2]).map(t => B.fstr(t[2])).join(','), l22 = B.ledger(B.E[2], B.E[2]).map(t => B.fstr(t[2])).join(',');
  if (l12 !== '5,−8,4,−1') bad(`ledger 12 ${l12}`);
  if (l22 !== '14,−30,22,−6,1') bad(`ledger 22 ${l22}`);
  if (B.pmul(B.E[1], B.E[2]).join() !== '-1,16,-64,64') bad('product 12');
  if (B.pmul(B.E[2], B.E[2]).join() !== '1,-24,176,-384,256') bad('product 22');
  /* QSqrt2: the point (1,1,0,0), the pair (0,2) */
  if (B.qmul([0, 2], [0, 2]).join() !== '8,0') bad('(0,2)² ≠ 8');
  if (B.qmul([0, 1], [0, 1]).join() !== '2,0') bad('δ² ≠ 2');
  /* Schur example: floor 4/3 at y* = −2/3, eigenvalues (7 ± √17)/4 */
  if (!B.feq(B.schurVal, [4, 3]) || !B.feq(B.ystar, [-2, 3])) bad('Schur values');
  if (Math.abs(B.form(1, -2 / 3) - 4 / 3) > 1e-12) bad('Schur floor');
  for (let y = -3; y <= 3; y += 0.01) if (B.form(1, y) < 4 / 3 - 1e-12) bad('Schur floor undercut');
  const tr = 3.5, det = 2 * 1.5 - 1;
  if (tr * tr - 4 * det !== 17 / 4) bad('eigenvalue discriminant');
});

/* ---------- 1 · the act's opening: averages need pi? ---------- */
SCENES.b04_title = S => {
  SPINE.title(S, 4, '三维球面上的有理谐波', 'Rational harmonics on the three-sphere');
  const a = at(S, 0, 0.6), out = clamp((S.d - S.u) / 0.5);
  SPINE.rail(S, 4, a);
  const A = a * out;
  /* where the last act left us, and where this one starts */
  chip(620, 300, 560, 74, 'd/dx  without limits', C.cyan, A * 0.8, 28, F.math);
  txt('VOLUME III · 第三卷 · done', 620, 236, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: A * 0.7, ls: 2 });
  const q = Q(S, 0, 'Now the other half', 0.6);
  chip(1300, 300, 560, 74, '∫  without π  ?', C.now, A * q, 30, F.math);
  txt('VOLUME IV · 第四卷', 1300, 236, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.now, a: A * q * 0.8, ls: 2 });
  arrow(910, 300, 1010, 300, C.dim, A * q, 2.5);
  /* the textbook average over the three-sphere */
  const b = at(S, 1, 0.7) * out;
  panel(360, 420, 1200, 300, b, C.mag, 'THE TEXTBOOK AVERAGE · 教科书的球面平均');
  txt('⟨f⟩  =', 560, 570, { size: 56, fam: F.math, w: 700, align: 'right', c: C.white, a: b });
  txt('1', 680, 535, { size: 46, fam: F.math, w: 700, align: 'center', c: C.white, a: b });
  line(610, 552, 750, 552, C.white, b, 2.5);
  txt('2π²', 680, 605, { size: 46, fam: F.math, w: 700, align: 'center', c: C.mag, a: b, ab: 1.5 });
  txt('∫  f  dσ', 800, 572, { size: 56, fam: F.math, w: 700, c: C.white, a: b });
  txt('S³', 820, 612, { size: 24, fam: F.math, w: 700, c: C.white, a: b * 0.8 });
  txt('area(S³) = 2π²', 1440, 520, { size: 30, fam: F.math, w: 700, align: 'right', c: C.mag, a: b * Q(S, 1, 'an area full of pi', 0.6) });
  const qq = Q(S, 1, 'Why are we so sure', 0.5);
  txt('?', 1380, 650, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.now, a: b * qq, ab: 3 * qq });
};

/* ---------- 2 · ch. 10: whole notes, integer characters ---------- */
SCENES.b04_shells = S => {
  const B = B04, u = S.u, P = B.PLOT;
  SPINE.rail(S, 4, clamp(u / 0.5));
  /* line 0: the bell picture — a closed loop accepts only whole numbers of wavelengths */
  const pa = clamp(u / 0.5) * (1 - at(S, 1, 0.6, -0.2));
  if (pa > 0) {
    const grow = eo(clamp((u - 0.3) / 2.4));
    B.waveLoop(700, 470, 190, 3, C.cyan, pa, grow);
    B.waveLoop(1220, 470, 190, 2.5, C.mag, pa * 0.85, grow);
    txt('3 waves: it closes', 700, 735, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: pa });
    txt('2½ waves: a seam', 1220, 735, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: pa * 0.85 });
    txt('✗', 1220, 278 - 4, { size: 40, fam: F.math, w: 700, align: 'center', c: C.mag, a: pa * clamp((u - 2.4) / 0.4) });
    B.tag(960, 210, 'argued', 'a picture of closing, not a proof · 示意', pa, { align: 'center' });
  }
  /* lines 1–3: the shells and their characters */
  const la = at(S, 1, 0.7, 0.3);
  if (la > 0) {
    panel(130, 190, 800, 600, la, C.cyan, 'WHOLE-SPIN SHELLS · 整数自旋壳');
    const show = [Q(S, 1, 'polynomial with integer', 0.5), Q(S, 3, 'One.', 0.5), Q(S, 3, 'Four kappa', 0.5), Q(S, 3, 'Each next', 0.6, 0.6)];
    const cur = u < phraseAt(S, 3, 'Four kappa') ? 0 : u < phraseAt(S, 3, 'Each next') ? 1 : u < lineAt(S, 4).s ? 2 : -1;
    B.POLY.forEach((s, j) => {
      const y = 270 + j * 68, aa = la * (j === 0 ? Math.max(show[0], show[1]) : show[Math.min(j + 1, 3)]);
      txt(`j = ${j}`, 160, y, { size: 22, fam: F.mono, w: 700, c: C.dim, a: aa });
      txt(s, 260, y, { size: 34, fam: F.math, w: 700, c: j === cur ? C.now : C.white, a: aa });
    });
    const ra = Q(S, 3, 'one fixed rule', 0.6);
    txt('Eₙ₊₁ = (4κ − 2) · Eₙ − Eₙ₋₁', 160, 560, { size: 32, fam: F.math, w: 700, c: C.cyan, a: la * ra });
    txt('rule · 递推', 830, 560, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: la * ra });
    /* line 5: the Lean statement behind "no square root survives" */
    const lq = at(S, 5, 0.6);
    txt('Eₙ(x²) = U₂ₙ(x)', 160, 660, { size: 40, fam: F.math, w: 700, c: C.lean, a: la * lq, ab: lq > 0.9 ? 1.5 : 0 });
    txt('∀ n ∈ ℕ, ∀ x ∈ ℤ', 520, 660, { size: 24, fam: F.mono, w: 700, c: C.lean, a: la * Q(S, 5, 'integer x', 0.5) });
    B.leanChip(160, 726, B.GID.even, la * Q(S, 5, 'only x squared', 0.5), { size: 22 });
  }
  /* line 2: κ, a fraction; the plot of the characters over κ ∈ [0, 1] */
  const ka = at(S, 2, 0.6);
  if (ka > 0) {
    const X = k => P.x + 60 + k * (P.w - 90), Y = v => P.y + P.h - 30 - (v - P.y0) / (P.y1 - P.y0) * (P.h - 60);
    panel(P.x, P.y - 40, P.w, P.h + 40, ka, C.cyan, 'CHARACTERS OVER κ · 特征标随 κ');
    line(X(0), Y(0), X(1), Y(0), C.dim, ka * 0.7, 1.2);
    line(X(0), Y(P.y0), X(0), Y(P.y1), C.dim, ka * 0.7, 1.2);
    [[0, '0'], [0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4'], [1, '1']].forEach(([k, s]) => {
      line(X(k), Y(0) - 5, X(k), Y(0) + 5, C.dim, ka, 1.2);
      txt(s, X(k), Y(P.y0) + 22, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: ka });
    });
    txt('κ', X(1) + 12, Y(0) + 24, { size: 22, fam: F.math, w: 700, c: C.dim, a: ka });
    const shown = [Math.max(Q(S, 3, 'One.', 0.5), 0), Q(S, 3, 'Four kappa', 0.5), Q(S, 3, 'Each next', 0.8, 0.6), Q(S, 3, 'Each next', 0.8, 1.2)];
    const cur = u < phraseAt(S, 3, 'Four kappa') ? 0 : u < phraseAt(S, 3, 'Each next') ? 1 : u < lineAt(S, 4).s ? 2 : -1;
    for (let n = 0; n < 4; n++) {
      const s = shown[n] * ka; if (s <= 0) continue;
      ctx.save(); ctx.globalAlpha = s; ctx.strokeStyle = n === cur ? C.now : C.cyan; ctx.lineWidth = n === cur ? 3.5 : 2.5; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const k = i / 200, x = X(k), y = Y(B.peval(B.E[n], k)); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke(); ctx.restore();
    }
    /* line 4: the dimensions at κ = 1 */
    const da = at(S, 4, 0.6, 0.4);
    for (let n = 0; n < 4; n++) {
      const d = 2 * n + 1, aa = da * clamp((u - lineAt(S, 4).s - 1.0 - 0.35 * n) / 0.4);
      if (aa <= 0) continue;
      dot(X(1), Y(d), 9, 'g', aa);
      txt(String(d), X(1) + 14, Y(d) + 9, { size: 24, fam: F.mono, w: 700, c: C.now, a: aa });
    }
    B.tag(P.x + P.w, P.y + P.h + 40, 'computed', 'Eₙ(1) = 2n + 1 = dim of spin n · 屏幕计算', da * Q(S, 4, 'the dimension of each spin', 0.5), { align: 'right' });
    txt('κ = w² / (w² + x² + y² + z²)', P.x + 20, P.y + P.h + 100, { size: 26, fam: F.math, w: 700, c: C.white, a: ka * (1 - da) });
    txt('(1, 1, 0, 0)  →  κ = 1/2', P.x + 20, P.y + P.h + 140, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ka * Q(S, 2, 'an ordinary fraction', 0.5) * (1 - da) });
  }
};

/* ---------- 3 · ch. 11: averages without pi ---------- */
SCENES.b04_moments = S => {
  const B = B04, u = S.u;
  SPINE.rail(S, 4, clamp(u / 0.5));
  /* line 0: the classical round trip — four root-pis in, two-pi-squared out */
  const ca = clamp(u / 0.5) * (1 - at(S, 1, 0.6));
  if (ca > 0) {
    const merge = ease(Q(S, 0, 'on each of four axes', 1.2, 0.4));
    for (let i = 0; i < 4; i++) {
      const x0 = 380 + i * 170, x = lerp(x0, 760, merge), aa = ca * Q(S, 0, 'root pi', 0.4, 0.15 * i) * (1 - merge * 0.9);
      chip(x, 330, 120, 64, '√π', C.mag, aa, 32, F.math);
      txt(['w', 'x', 'y', 'z'][i] + '-axis', x0, 400, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: aa * (1 - merge) });
    }
    txt('π²', 760, 345, { size: 64, fam: F.math, w: 700, align: 'center', c: C.mag, a: ca * merge, ab: 2 });
    const back = Q(S, 0, 'the area', 0.6);
    txt('÷', 900, 345, { size: 56, fam: F.math, w: 700, align: 'center', c: C.white, a: ca * back });
    txt('2π²', 1040, 345, { size: 64, fam: F.math, w: 700, align: 'center', c: C.mag, a: ca * back, ab: 2 });
    txt('=  no π left', 1340, 345, { size: 44, fam: F.math, w: 700, align: 'center', c: C.white, a: ca * Q(S, 0, 'two pi squared', 0.6, 0.4) });
    B.strike(710, 330, 100, Q(S, 0, 'two pi squared', 0.5, 0.3), ca, C.white);
    B.strike(990, 330, 100, Q(S, 0, 'two pi squared', 0.5, 0.3), ca, C.white);
    txt('∫ t²ᵏ e^(−t²) dt  =  (2k)! / (4ᵏ k!) · √π   on each axis', 960, 520, { size: 28, fam: F.math, w: 700, align: 'center', c: C.dim, a: ca });
    B.tag(960, 220, 'lit', 'classical calculus · 经典微积分 (Folland 2001)', ca, { align: 'center' });
  }
  /* line 1: the definition, directly */
  const da = at(S, 1, 0.7, 0.3) * (1 - at(S, 5, 0.6));
  txt('E[κᵏ]  :=', 640, 290, { size: 54, fam: F.math, w: 700, align: 'right', c: C.white, a: da });
  txt('(2k)!', 860, 255, { size: 46, fam: F.math, w: 700, align: 'center', c: C.white, a: da });
  line(680, 272, 1040, 272, C.white, da, 2.5);
  txt('4ᵏ · k! · (k + 1)!', 860, 322, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: da });
  txt('definition · 定义 — no area, no limit, no π', 1090, 300, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: da * Q(S, 1, 'ratio of factorials', 0.5) });
  /* line 5: the aphorism takes the definition's place */
  const fa = at(S, 5, 0.7, 0.2);
  txt('π was never inside the sphere.', 960, 270, { size: 52, fam: F.disp, w: 700, align: 'center', c: C.white, a: fa, ab: 1.5 });
  txt('It was inside our ruler.', 960, 330, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.argued, a: fa * Q(S, 5, 'It was inside', 0.5) });
  B.tag(1560, 214, 'argued', 'aphorism · 格言', fa, { align: 'center' });
  /* lines 2–3: the ladder of moments */
  const la = at(S, 2, 0.6);
  if (la > 0) {
    const xs = [300, 620, 940, 1260, 1580], yb = 470;
    const t0 = lineAt(S, 3).s, t1 = lineAt(S, 3).e;
    for (let k = 0; k < 5; k++) {
      const appear = k === 0 ? la : la * clamp((u - (t0 + (t1 - t0) * k / 5)) / 0.4);
      const curK = u >= t0 && u < t1 && k === Math.min(4, Math.floor((u - t0) / ((t1 - t0) / 5)));
      box(xs[k] - 100, yb - 50, 200, 100, curK ? C.now : C.cyan, appear, curK ? 2.5 : 1.5, 'rgba(4,10,24,0.7)');
      txt(B.fstr(B.moment(k)), xs[k], yb + 16, { size: 46, fam: F.math, w: 700, align: 'center', c: curK ? C.now : C.white, a: appear });
      txt(`E[κ${'⁰¹²³⁴'[k]}]`, xs[k], yb + 86, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: appear });
      if (k < 4) {
        const sa = la * clamp((u - (t0 + (t1 - t0) * (k + 1) / 5) + 0.3) / 0.4);
        arrow(xs[k] + 106, yb, xs[k + 1] - 106, yb, C.cyan, sa, 2);
        txt('× ' + B.fstr(B.step(k)), (xs[k] + xs[k + 1]) / 2, yb - 22, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a: Math.max(sa, la * Q(S, 2, 'small fraction', 0.5) * (k === 0 ? 1 : 0)) });
      }
    }
    const step = Q(S, 2, 'small fraction', 0.5, 0.6);
    txt('E[κᵏ⁺¹]  =  E[κᵏ] · (2k + 1) / (2(k + 2))', 960, 650, { size: 36, fam: F.math, w: 700, align: 'center', c: at(S, 4, 0.5) > 0.5 ? C.lean : C.white, a: la * step });
    B.tag(130, 805, 'computed', 'E[κᵏ] = Cₖ/4ᵏ, Catalan 1, 1, 2, 5, 14 · check E[(w²+x²+y²+z²)²] = 4·(1/8) + 12·(1/24) = 1 · 屏幕计算', la * Q(S, 3, 'seven over', 0.6, 0.4));
    B.leanChip(560, 726, B.GID.step, la * at(S, 4, 0.6), { size: 22 });
    txt('∀ k ∈ ℕ · whole-number arithmetic · 只用整数运算', 1360, 728, { size: 20, fam: F.mono, w: 700, c: C.lean, a: la * Q(S, 4, 'for every k', 0.5) });
  }
};

/* ---------- 4 · ch. 11: shells at right angles ---------- */
SCENES.b04_ortho = S => {
  const B = B04, u = S.u;
  SPINE.rail(S, 4, clamp(u / 0.5));
  const a0 = clamp(u / 0.5);
  txt('⟨f, g⟩  :=  E[ f(κ) · g(κ) ]', 640, 215, { size: 38, fam: F.math, w: 700, align: 'center', c: C.white, a: a0 * at(S, 0, 0.6, 0.4) });
  txt('χⱼ = Eⱼ', 1000, 212, { size: 24, fam: F.math, w: 700, c: C.dim, a: a0 * at(S, 0, 0.6, 0.8) });
  /* the two ledgers */
  const block = (y, title, prod, poly, k, p0, p1) => {
    const a = at(S, k, 0.6);
    if (a <= 0) return;
    const led = B.ledger(B.E[p0], B.E[p1]);
    panel(130, y, 1040, 220, a, C.cyan, title);
    txt(prod, 160, y + 80, { size: 30, fam: F.math, w: 700, c: C.white, a });
    txt('= E[ ' + poly + ' ]', 330, y + 80, { size: 28, fam: F.math, w: 700, c: C.dim, a: a * Q(S, k, k === 1 ? 'Shell one' : 'Shell two', 0.5, 0.3) });
    const t0 = phraseAt(S, k, k === 1 ? 'five' : 'fourteen'), t1 = phraseAt(S, k, 'Exactly');
    let x = 160;
    led.forEach((t, i) => {
      const ap = a * clamp((u - (t0 + (t1 - t0) * i / led.length)) / 0.35);
      const s = (i === 0 ? '' : (t[2][0] < 0 ? '− ' : '+ ')) + B.fstr(B.fabs(t[2]));
      txt(s, x, y + 140, { size: 34, fam: F.math, w: 700, c: C.white, a: ap });
      const small = `${t[0]}·${B.fstr(t[1])}`.replace('-', '−');
      txt(small, x, y + 176, { size: 16, fam: F.mono, c: C.dim, a: ap * 0.9 });
      x += Math.max(tw(s, 34, F.math, 700), tw(small, 16, F.mono)) + 30;
    });
    const res = B.fstr(B.inner(B.E[p0], B.E[p1]));
    const ra = a * Q(S, k, 'Exactly', 0.4);
    txt('=  ' + res, x + 10, y + 142, { size: 46, fam: F.math, w: 900, c: C.now, a: ra * (1 - at(S, 4, 0.5)), ab: 2 * ra });
    txt('=  ' + res, x + 10, y + 142, { size: 46, fam: F.math, w: 900, c: C.lean, a: ra * at(S, 4, 0.5) });
  };
  block(270, 'SHELL 1 × SHELL 2 · 第一层 × 第二层', '⟨χ₁, χ₂⟩', '64κ³ − 64κ² + 16κ − 1', 1, 1, 2);
  block(530, 'SHELL 2 × SHELL 2 · 第二层 × 自己', '⟨χ₂, χ₂⟩', '256κ⁴ − 384κ³ + 176κ² − 24κ + 1', 2, 2, 2);
  B.tag(130, 800, 'computed', 'E[κᵏ] = 1, 1/4, 1/8, 5/64, 7/128 · 屏幕计算', at(S, 1, 0.6) * (1 - at(S, 4, 0.5)));
  /* the Gram table */
  const ga = at(S, 1, 0.6, 1.0);
  if (ga > 0) {
    const gx = 1330, gy = 280, cw = 130;
    panel(gx - 60, gy - 60, cw * 3 + 120, cw * 3 + 90, ga, C.cyan, 'GRAM TABLE · 格拉姆表');
    const lean = at(S, 4, 0.6);
    for (let i = 0; i < 3; i++) {
      txt(`χ${'₀₁₂'[i]}`, gx + cw * i + cw / 2, gy - 4, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: ga });
      txt(`χ${'₀₁₂'[i]}`, gx - 30, gy + 40 + cw * i + 36, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: ga });
      for (let j = 0; j < 3; j++) {
        const key = i === 1 && j === 2 || i === 2 && j === 1 ? Q(S, 1, 'Exactly', 0.4) : i === 2 && j === 2 ? Q(S, 2, 'Exactly', 0.4) : Q(S, 2, 'Exactly', 0.4, 0.8);
        const v = B.fstr(B.inner(B.E[i], B.E[j])), aa = ga * key;
        const hot = (i === 1 && j === 2 || i === 2 && j === 1) && u < lineAt(S, 2).s || i === 2 && j === 2 && u >= lineAt(S, 2).s && u < lineAt(S, 3).s;
        box(gx + cw * j + 8, gy + 20 + cw * i, cw - 16, cw - 16, lean > 0 ? C.lean : hot ? C.now : C.cyan, aa * 0.8, hot ? 2.5 : 1.2);
        txt(v, gx + cw * j + cw / 2, gy + 20 + cw * i + cw / 2 + 16, { size: 46, fam: F.math, w: 700, align: 'center', c: lean > 0 ? C.lean : i === j ? C.white : C.dim, a: aa });
      }
    }
  }
  /* line 3: north and east */
  const na = at(S, 3, 0.6) * (1 - at(S, 4, 0.5));
  if (na > 0) {
    const cx = 1340, cy = 840;
    arrow(cx, cy, cx, cy - 80, C.cyan, na, 3); txt('N', cx - 22, cy - 66, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: na });
    arrow(cx, cy, cx + 100, cy, C.cyan, na, 3); txt('E', cx + 114, cy + 8, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: na });
    box(cx, cy - 18, 18, 18, C.dim, na, 1.2);
    B.tag(cx + 160, cy - 40, 'argued', 'analogy · 比方', na);
  }
  /* line 4: Lean — the 3×3 table, then every pair */
  const la = at(S, 4, 0.6);
  B.leanChip(1270, 738, B.GID.gram3, la, { size: 20, full: false });
  txt('∀ m, n ∈ ℕ :  ⟨Eₘ, Eₙ⟩ = δₘₙ', 1270, 806, { size: 32, fam: F.math, w: 700, c: C.lean, a: Q(S, 4, 'every pair', 0.5) });
  B.leanChip(1270, 850, B.GID.gramAll, Q(S, 4, 'every pair', 0.5, 0.3), { size: 20, full: false });
};

/* ---------- 5 · ch. 12: a square root as a pair ---------- */
SCENES.b04_sqrt = S => {
  const B = B04, u = S.u;
  SPINE.rail(S, 4, clamp(u / 0.5));
  /* line 0: the point (1,1,0,0) and the unit it wants */
  const pa = clamp(u / 0.5) * (1 - at(S, 3, 0.6));
  txt('p = (1, 1, 0, 0)', 160, 260, { size: 40, fam: F.math, w: 700, c: C.white, a: pa });
  txt('‖p‖² = 1 + 1 = 2', 160, 330, { size: 34, fam: F.math, w: 700, c: C.cyan, a: pa * Q(S, 0, 'to make one', 0.5, 0.8) });
  txt('κ = 1/2   still a fraction', 160, 390, { size: 30, fam: F.math, w: 700, c: C.cyan, a: pa * Q(S, 0, 'to make one', 0.5, 1.4) });
  txt('unit:  p / ‖p‖ = (1/√2, 1/√2, 0, 0)', 160, 460, { size: 34, fam: F.math, w: 700, c: C.mag, a: pa * Q(S, 0, 'a unit', 0.5), ab: 1 });
  /* the picture on the w–x plane: the point outside the unit circle, pulled onto it */
  const ga = clamp(u / 0.5) * (1 - at(S, 1, 0.6, 0.4));
  if (ga > 0) {
    const cx = 1300, cy = 520, R = 200;
    line(cx - 300, cy, cx + 340, cy, C.dim, ga * 0.6, 1.2); line(cx, cy + 280, cx, cy - 330, C.dim, ga * 0.6, 1.2);
    txt('w', cx + 350, cy + 8, { size: 22, fam: F.math, c: C.dim, a: ga }); txt('x', cx - 6, cy - 340, { size: 22, fam: F.math, c: C.dim, a: ga });
    ring(cx, cy, R, C.cyan, ga, 2);
    const s = ease(Q(S, 0, 'a unit', 1.0, 0.3)), d = R * lerp(1, 1 / Math.SQRT2, s);
    dashed(cx, cy, cx + R, cy - R, C.dim, ga * 0.6, 1.5);
    dot(cx + d, cy - d, 10, s > 0.5 ? 'm' : 'w', ga);
    txt(s > 0.5 ? '(1/√2, 1/√2)' : '(1, 1)', cx + d + 18, cy - d - 14, { size: 24, fam: F.math, w: 700, c: s > 0.5 ? C.mag : C.white, a: ga });
  }
  /* line 1: not the real line — a pair and a rule */
  const ra = at(S, 1, 0.6);
  if (ra > 0) {
    const ny = 230;
    line(1000, ny, 1790, ny, C.dim, ra * 0.8, 2);
    for (let i = 0; i <= 16; i++) line(1000 + i * 49.4, ny - 8, 1000 + i * 49.4, ny + 8, C.dim, ra * 0.6, 1);
    txt('ℝ · the whole real line · 整条实数轴', 1395, ny - 24, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    B.strike(990, ny, 810, Q(S, 1, 'No.', 0.5), ra, C.mag);
    txt('✗ not needed · 不必', 1790, ny + 40, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: ra * Q(S, 1, 'No.', 0.4, 0.3) });
    const pa2 = Q(S, 1, 'Keep a pair', 0.6);
    panel(1000, 300, 790, 330, ra * pa2, C.cyan, 'QSqrt2 · 有理数对');
    txt('p + q·δ   ⟷   (p, q) ∈ ℚ × ℚ', 1030, 380, { size: 32, fam: F.math, w: 700, c: C.white, a: ra * pa2 });
    txt('rule:  δ² = 2', 1030, 450, { size: 40, fam: F.math, w: 700, c: C.now, a: ra * Q(S, 1, 'delta squared is two', 0.5), ab: 1.5 });
    txt('(p, q)·(r, s) = (pr + 2qs, ps + qr)', 1030, 520, { size: 30, fam: F.math, w: 700, c: C.cyan, a: ra * Q(S, 1, 'delta squared is two', 0.5, 0.6) });
    txt('every step: fractions · 每一步都是分数', 1030, 590, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ra * Q(S, 1, 'delta squared is two', 0.5, 1.0) });
  }
  /* line 2: the IOU */
  const ia = at(S, 2, 0.6) * (1 - at(S, 3, 0.5));
  txt('√2  =  an IOU + one rule for cashing it', 160, 620, { size: 34, fam: F.disp, w: 700, c: C.white, a: ia });
  B.tag(160, 680, 'argued', 'aphorism · 格言', ia);
  /* line 3: two root two as the pair (0, 2) */
  const ba = at(S, 3, 0.6);
  if (ba > 0) {
    txt('2√2  =  δ + δ  =  (0, 2)', 160, 300, { size: 44, fam: F.math, w: 700, c: C.white, a: ba, ab: 1 });
    txt('(0, 2)·(0, 2) = (0·0 + 2·2·2,  0·2 + 2·0)', 160, 390, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ba * Q(S, 3, 'is the pair', 0.5, 0.8) });
    txt('= (8, 0) = 8', 160, 460, { size: 52, fam: F.math, w: 900, c: C.lean, a: ba * Q(S, 3, 'is the pair', 0.5, 1.4), ab: 1.5 });
    B.leanChip(160, 560, B.GID.bell, ba * Q(S, 3, 'Lean checks', 0.5));
    B.tag(160, 650, 'lit', 'CHSH ceiling 2√2 (Tsirelson) · 文献结果', ba * Q(S, 3, 'quantum ceiling', 0.5));
  }
};

/* ---------- 6 · ch. 12: a floor you can check by hand ---------- */
SCENES.b04_schur = S => {
  const B = B04, u = S.u;
  SPINE.rail(S, 4, clamp(u / 0.5));
  const a0 = clamp(u / 0.5);
  txt('Q(x, y)  =  2x² + 2xy + (3/2)y²', 150, 250, { size: 40, fam: F.math, w: 700, c: C.white, a: a0 });
  txt('K = [[2, 1], [1, 3/2]]', 150, 310, { size: 28, fam: F.math, w: 700, c: C.dim, a: a0 });
  const ea = Q(S, 0, 'hunt eigenvalues', 0.5);
  txt('λ = (7 ± √17) / 4', 150, 390, { size: 36, fam: F.math, w: 700, c: C.mag, a: ea * (1 - 0.6 * at(S, 1, 0.5)) });
  B.strike(140, 378, 340, at(S, 1, 0.5), ea, C.mag);
  txt('textbook · 教科书路线', 520, 390, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ea * 0.8 });
  /* line 2: the completed square */
  const sa = at(S, 2, 0.6);
  txt('= (4/3)x² + (3/2)(y + (2/3)x)²', 150, 490, { size: 36, fam: F.math, w: 700, c: C.white, a: sa });
  txt('floor:  y* = −(2/3)x,   Q = (4/3)x²', 150, 560, { size: 34, fam: F.math, w: 700, c: C.now, a: sa * Q(S, 2, 'four thirds', 0.5) });
  txt('⇒  Q > 0  whenever (x, y) ≠ (0, 0)', 150, 615, { size: 30, fam: F.math, w: 700, c: C.white, a: sa * Q(S, 2, 'So Q is positive', 0.5) });
  B.tag(150, 660, 'computed', 'a = 2, b = 1, c = 3/2 · hand derivation · 手工推导', sa * Q(S, 2, 'So Q is positive', 0.5, 0.4));
  /* line 3: the Lean statement */
  const la = at(S, 3, 0.6);
  txt('0 < c  ⇒  ∀ y :  (a − b²/c)x²  ≤  ax² + 2bxy + cy²', 150, 722, { size: 28, fam: F.math, w: 700, c: C.lean, a: la });
  txt('and equality at  y = −(b/c)x', 150, 762, { size: 28, fam: F.math, w: 700, c: C.lean, a: la * Q(S, 3, 'and the floor', 0.5) });
  B.leanChip(150, 820, B.GID.schur, la * Q(S, 3, 'every positive pivot', 0.5), { size: 20, full: false });
  /* the valley at x = 1 */
  const va = at(S, 1, 0.6);
  if (va > 0) {
    const px = 1080, py = 220, pw = 700, ph = 520, y0 = -2.2, y1 = 1.2, v1 = 7;
    const X = y => px + 40 + (y - y0) / (y1 - y0) * (pw - 80), Y = v => py + ph - 40 - v / v1 * (ph - 80);
    panel(px, py - 40, pw, ph + 40, va, C.cyan, 'THE VALLEY AT x = 1 · 山谷 (x = 1)');
    line(X(y0), Y(0), X(y1), Y(0), C.dim, va * 0.7, 1.2);
    [-2, -1, 0, 1].forEach(t => { line(X(t), Y(0) - 5, X(t), Y(0) + 5, C.dim, va, 1); txt(String(t).replace('-', '−'), X(t), Y(0) + 26, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: va }); });
    txt('y', X(y1) + 10, Y(0) + 26, { size: 22, fam: F.math, c: C.dim, a: va });
    ctx.save(); ctx.globalAlpha = va; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const y = lerp(y0, y1, i / 200), x = X(y), v = Y(B.form(1, y)); if (i) ctx.lineTo(x, v); else ctx.moveTo(x, v); }
    ctx.stroke(); ctx.restore();
    /* the walker: starts at y = 0.9, wanders, settles at the floor while line 2 is spoken */
    const s0 = lineAt(S, 1).s, s1 = phraseAt(S, 2, 'Its floor') + 0.8;
    const k = clamp((u - s0) / Math.max(0.5, s1 - s0));
    const yw = lerp(0.9, -2 / 3, ease(k)) + 0.9 * Math.sin(k * 7.5) * (1 - k) * 0.5;
    dot(X(yw), Y(B.form(1, yw)), 12, 'g', va);
    const fl = Q(S, 2, 'Its floor', 0.5);
    dashed(X(y0), Y(4 / 3), X(y1), Y(4 / 3), C.now, va * fl, 1.5);
    txt('4/3', X(y0) + 6, Y(4 / 3) - 10, { size: 24, fam: F.math, w: 700, c: C.now, a: va * fl });
    dashed(X(-2 / 3), Y(4 / 3), X(-2 / 3), Y(0), C.now, va * fl * 0.8, 1.2);
    txt('−2/3', X(-2 / 3), Y(0) - 14, { size: 22, fam: F.math, w: 700, align: 'center', c: C.now, a: va * fl });
  }
};

/* ---------- 7 · hand-off: the next question ---------- */
SCENES.b04_next = S => {
  const B = B04, u = S.u;
  SPINE.rail(S, 4, clamp(u / 0.5));
  const a = clamp(u / 0.6) * (1 - 0.55 * at(S, 1, 0.8));
  const cols = [[480, 'whole notes', '整数音阶', Q(S, 0, 'Whole notes', 0.5)], [960, 'averages are fractions', '分数平均', Q(S, 0, 'fractional averages', 0.5)], [1440, 'a floor by hand', '手算谷底', Q(S, 0, 'a floor', 0.5)]];
  cols.forEach(([x, en, zh, q], i) => {
    const aa = a * q; if (aa <= 0) return;
    box(x - 200, 220, 400, 360, C.cyan, aa, 1.4, 'rgba(4,10,24,0.6)');
    if (i === 0) for (let j = 0; j < 4; j++) B.waveLoop(x, 380, 40 + 28 * j, j + 1, j === 3 ? C.now : C.cyan, aa * (0.5 + 0.15 * j));
    if (i === 1) ['1', '1/4', '1/8', '5/64', '7/128'].forEach((s, j) => txt(s, x, 290 + j * 44, { size: 30, fam: F.math, w: 700, align: 'center', c: j === 4 ? C.now : C.white, a: aa }));
    if (i === 2) {
      ctx.save(); ctx.globalAlpha = aa; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
      for (let s = 0; s <= 60; s++) { const y = lerp(-2.2, 1.2, s / 60), px = x - 160 + (s / 60) * 320, py = 500 - B.form(1, y) * 38; if (s) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
      ctx.stroke(); ctx.restore();
      dot(x - 160 + ((-2 / 3 + 2.2) / 3.4) * 320, 500 - (4 / 3) * 38, 10, 'g', aa);
    }
    txt(en, x, 625, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a: aa * (1 - at(S, 1, 0.6)) });
    txt(zh, x, 660, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: aa * 0.8 * (1 - at(S, 1, 0.6)) });
  });
  txt('no π · no limits · 无 π · 无极限', 960, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * Q(S, 0, 'no pi and no limits', 0.5) * (1 - at(S, 1, 0.6)), ls: 2 });
  SPINE.ask(S, 1, 'The sphere has its harmonics. Do the primes have theirs?', '球面有它的谐波。素数也有吗？');
};

/* ---- b05 · Primes without the complex plane · 不借复平面的素数 ---- */
/* Act b05 of the long film "One Axiom, No Infinity" · 不借复平面的素数 · Primes without the complex plane
   (book omega-math, Volume V, chapters 13–15). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     b05_title     the act card (SPINE.title); a number line with the primes up to 37 lit; "all primes, already
                   queued" is the idol the act takes apart (argued).
     b05_escape    Euclid's recipe on the prefixes of [2, 3, 5, 7, 11, 13]: N = 1 + product, its least prime
                   factor; 30031 = 59 · 509, every listed prime leaves remainder 1 (computed)
                   ..... OmegaArithmeticHorizon.euclid_prime_escape (LEAN, zero axioms: for a list s of naturals with
                   0 < s.prod, some prime p divides s.prod + 1 and p ∉ s).
     b05_fraction  43/30 = [1; 2, 3, 4] by Euclid's division; convergents 1/1, 3/2, 10/7, 43/30; neighbouring cross
                   products +1, −1, +1 (computed) ..... OmegaArithmeticHorizon.cf_convergent_determinant (LEAN, zero
                   axioms: det(convergentPair coeffs) = (−1)^count). "So none needs reducing": a common factor divides
                   the determinant ±1 ..... OmegaArithmeticHorizon.cf_convergent_coprime (LEAN, zero axioms:
                   d dividing the current numerator and denominator is 1).
     b05_adele     |r|_p = p^(−v_p(r)); r = −35/18 reads 35/18, 2, 9, 1/5, 1/7 and 1 for every other prime; the prime
                   rulers together read 18/35 = 1/|r|; running product 35/18 → 35/9 → 35 → 7 → 1 (computed) ..... RationalPadicProductFormula.
                   rational_padic_product_formula (LEAN, classical library: |x| · ∏ᶠ p, padicNorm p x = 1 for x ≠ 0).
                   "The prime rulers take back what the usual ruler stretches" together is the book's reading (argued, MODEL).
     b05_spinor    (1 + 2i)(1 − 2i) = 5 (computed); the six generators (1, ±2, 0, 0), (1, 0, ±2, 0), (1, 0, 0, ±2)
                   ..... OmegaChebyshevHecke.lps_norm_five (LEAN, zero axioms: normSq = 5 and κ = 1/5 for each);
                   5·R(1 + 2i) = [[5,0,0],[0,−3,−4],[0,4,−3]] from q v q̄, cos = −3/5 (computed).
     b05_free      the reduced words: 1, 6, 30, 150 by length (computed); the highlighted word A B C has quaternion (−7, 6, −2, 6), norm
                   5^3 and is not divisible by 5 (computed); all 937 reduced words of length ≤ 4 give distinct
                   rotations (checked on load) ..... OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective (LEAN,
                   zero axioms: reduced u, v whose adjoint actions agree on axisX and axisY are equal). The free group
                   F₃ follows (the chapter's corollary, v = nil); the tree branches are a picture (argued).
     b05_mix       Q_p(f) = 4p⟨f, f⟩ − ⟨T̂f, T̂f⟩ ≥ 0 ⇔ λ̂² ≤ 20 at p = 5 (the chapter's definition); the check at
                   q = (3, 1, −2, 4): w-parts 1, 5, 7, −1, −5, 11, Σ = 222, T̂χ₁ = −2/25 = −2/5 · 1/5 (computed)
                   ..... OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue (LEAN, zero axioms: for q ≠ 0, T̂₅χ₁(q) ≡
                   −2/5 · χ₁(q)) and heckeT5_ramanujan_margin (LEAN, zero axioms: 20 − (−2/5)² ≡ 496/25 > 0).
                   The constant: T̂₅1 = 6, 20 − 36 = −16 (computed). The bound on nonconstant SO(3) shells is a literature
                   result (Eichler, Deligne, Lubotzky–Phillips–Sarnak; argued). The coffee spoon is a picture.
     b05_ask       the Riemann hypothesis, as PROJECT.md §14: proved by an external Lean project, not frozen in the
                   pinned library (neither green nor red); the four steps of the act; SPINE.ask.

   On load, FILM.init looks up each of this act's eight theorems with leanCite and re-derives every number on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */

const B05 = (() => {
  const G = {
    escape: 'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape',
    det: 'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant',
    coprime: 'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime',
    adele: 'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
    norm5: 'D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_norm_five',
    free: 'D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective',
    eig: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue',
    margin: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_ramanujan_margin'
  };
  /* empty strict_omega.axioms at the pin; the product formula uses the classical library */
  const ZERO = new Set(['escape', 'det', 'coprime', 'norm5', 'free', 'eig', 'margin']);

  /* ---------- exact fractions [n, d], d > 0, in lowest terms ---------- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
  const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
  const fmul = (x, y) => fr(x[0] * y[0], x[1] * y[1]);
  const fadd = (x, y) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
  const feq = (x, y) => x[0] * y[1] === y[0] * x[1];
  const neg = s => String(s).replace(/^-/, '−');
  const fs = x => (x[1] === 1 ? neg(x[0]) : `${x[0] < 0 ? '−' : ''}${Math.abs(x[0])}/${x[1]}`);

  /* ---------- Euclid's escape ---------- */
  const PR = [2, 3, 5, 7, 11, 13];
  const minDiv = n => { for (let d = 2; d <= n; d++) if (n % d === 0) return d; return n; };
  const ESC = [];
  for (let k = 0; k <= PR.length; k++) {
    const s = PR.slice(0, k), prod = s.reduce((a, b) => a * b, 1), N = prod + 1, q = minDiv(N);
    ESC.push({ s, prod, N, q, prime: q === N, rems: s.map(p => N % p) });
  }

  /* ---------- the finite continued fraction of 43/30 ---------- */
  function cfSteps(p, q) { const st = []; while (q) { st.push([p, q, Math.floor(p / q), p % q]); const r = p % q; p = q; q = r; } return st; }
  const CF = cfSteps(43, 30), COEF = CF.map(s => s[2]);
  const CONV = [];
  { let p2 = 0, p1 = 1, q2 = 1, q1 = 0; for (const a of COEF) { const p = a * p1 + p2, q = a * q1 + q2; CONV.push([p, q]); p2 = p1; p1 = p; q2 = q1; q1 = q; } }
  /* determinant of the convergent pair after n coefficients: p_n q_{n-1} − p_{n-1} q_n, with (p_{-1}, q_{-1}) = (1, 0) */
  const DETS = CONV.map((c, i) => { const prev = i ? CONV[i - 1] : [1, 0]; return c[0] * prev[1] - prev[0] * c[1]; });

  /* ---------- one ruler per prime ---------- */
  const val = (n, p) => { n = Math.abs(n); let v = 0; while (n % p === 0) { n /= p; v++; } return v; };
  const R = fr(-35, 18);
  const RPR = [2, 3, 5, 7];
  const pnorm = (r, p) => { const v = val(r[0], p) - val(r[1], p); return v >= 0 ? fr(1, Math.pow(p, v)) : fr(Math.pow(p, -v), 1); };
  const READ = [{ name: '|r|', zh: '普通尺', v: fr(Math.abs(R[0]), R[1]) }].concat(RPR.map(p => ({ name: `|r|${'₂₃₅₇'[RPR.indexOf(p)]}`, zh: `${p} 号尺`, p, v: pnorm(R, p) })));
  const RUN = []; { let x = fr(1); for (const r of READ) { x = fmul(x, r.v); RUN.push(x); } }

  /* ---------- Hurwitz prime spinors of norm 5 ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const qconj = a => [a[0], -a[1], -a[2], -a[3]];
  const qn = a => a.reduce((s, x) => s + x * x, 0);
  const GEN = [[1, 2, 0, 0], [1, -2, 0, 0], [1, 0, 2, 0], [1, 0, -2, 0], [1, 0, 0, 2], [1, 0, 0, -2]];
  const GNAME = ['A', 'A⁻¹', 'B', 'B⁻¹', 'C', 'C⁻¹'];
  const inv = g => g ^ 1;
  /* |q|² · R(q) as an integer 3×3 matrix (rows), from v ↦ q v q̄ on i, j, k */
  function adj(q) {
    const cols = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]].map(e => qmul(qmul(q, e), qconj(q)));
    return [0, 1, 2].map(r => cols.map(c => c[r + 1]));
  }
  const ADJ_A = adj(GEN[0]);

  /* ---------- the reduced words: a 6-regular tree ---------- */
  const WORDS = [[]];
  for (let L = 1; L <= 4; L++) for (const w of WORDS.filter(x => x.length === L - 1)) for (let g = 0; g < 6; g++) {
    if (w.length && inv(w[w.length - 1]) === g) continue;
    WORDS.push(w.concat([g]));
  }
  const evalQ = w => w.reduce((q, g) => qmul(q, GEN[g]), [1, 0, 0, 0]);
  const COUNT = [0, 1, 2, 3, 4].map(L => WORDS.filter(w => w.length === L).length);
  const PATH = [0, 2, 4];  // the highlighted word A B C (reduced)
  const PATHQ = evalQ(PATH);

  /* ---------- the spherical Hecke operator at p = 5 ---------- */
  const chi1 = q => fr(3 * q[0] * q[0] - q[1] * q[1] - q[2] * q[2] - q[3] * q[3], qn(q));
  const hecke = q => GEN.reduce((s, r) => { const m = qmul(q, r); return fadd(s, fadd(fr(4 * m[0] * m[0], qn(m)), fr(-1))); }, fr(0));
  const QX = [3, 1, -2, 4];
  const QW = GEN.map(r => qmul(QX, r)[0]);
  const MARGIN = fadd(fr(20), fmul(fr(-1), fmul(fr(-2, 5), fr(-2, 5))));

  /* ---------- drawing helpers ---------- */
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  /* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
  const missing = new Set();
  function lean(x, y, key, a, o = {}) {
    if (a <= 0.003) return;
    const gid = G[key], r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!missing.has(gid)) { missing.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
      return;
    }
    const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    const wn = tw(r.short, size, F.mono, 700);
    txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    if (ZERO.has(key)) txt('· strict axioms: [] · 严格端', x + wh + 24 + wn, y, { size: size * 0.8, fam: F.zh, w: 700, c: C.cyan, a: a * 0.85 });
  }
  /* a small evidence tag: NUM (cyan, computed here) or a violet picture / model / literature tag */
  function tag(x, y, s, col, a, o = {}) {
    if (a <= 0.003) return;
    const size = o.size || 17, w = tw(s, size, F.zh, 700, 1) + 24, x0 = o.align === 'right' ? x - w : x;
    ctx.save(); ctx.globalAlpha = a;
    cutPath(x0, y - size - 6, w, size + 16, 8); ctx.fillStyle = rgba(mix(col, C.bg, 0.85), 0.85); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.stroke(); ctx.restore();
    txt(s, x0 + 12, y + 1, { size, fam: F.zh, w: 700, c: col, a, ls: 1 });
  }
  const num = (x, y, a, o) => tag(x, y, 'NUM · computed here · 屏幕上的计算', C.cyan, a, o);
  /* text with coloured runs: parts = [[string, colour], …] */
  function rich(parts, x, y, o = {}) {
    const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
    for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
    return cx;
  }

  return { G, ZERO, gcd, fr, fmul, fadd, feq, fs, neg, PR, minDiv, ESC, CF, COEF, CONV, DETS, val, R, READ, RUN, pnorm,
    qmul, qconj, qn, GEN, GNAME, inv, adj, ADJ_A, WORDS, evalQ, COUNT, PATH, PATHQ, chi1, hecke, QX, QW, MARGIN,
    fade, lean, tag, num, rich };
})();

/* ======================================================================= */
/*                     independent checks of every number                   */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 12) E.push('b05: ' + m); };
  const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);

  /* 0. this act's cited theorems at the pinned commit, looked up one GID at a time */
  for (const [k, gid] of Object.entries(B05.G)) {
    const r = leanCite(gid);
    check(!!r && r.kind === 'theorem', `${gid} is not a cited theorem`);
    check(!!r && gid.endsWith('.' + r.short), `${gid}: short name ${r && r.short}`);
  }

  /* 1. Euclid: primes by trial division, product, remainders, the first composite witness */
  const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  check(B05.PR.every(isPrime) && same(B05.PR, [2, 3, 5, 7, 11, 13]), 'the list of primes');
  check(same(B05.ESC.map(r => r.N), [2, 3, 7, 31, 211, 2311, 30031]), 'the witnesses N_S');
  check(same(B05.ESC.map(r => r.q), [2, 3, 7, 31, 211, 2311, 59]), 'least prime factors');
  B05.ESC.forEach(r => { check(r.rems.every(x => x === 1), `remainders of ${r.N}`); check(isPrime(r.q) && !r.s.includes(r.q) && r.N % r.q === 0, `escape at ${r.N}`); });
  check(59 * 509 === 30031 && isPrime(59) && isPrime(509) && !isPrime(30031), '30031 = 59 · 509');
  check(30030 === 2 * 3 * 5 * 7 * 11 * 13, '30030');
  check(1 * 30031 - 2310 * 13 === 1, 'the Bezout certificate for 13');

  /* 2. 43/30 = [1; 2, 3, 4] and its convergents, by evaluating the fractions back */
  check(same(B05.COEF, [1, 2, 3, 4]), 'coefficients of 43/30');
  const back = c => { let x = B05.fr(c[c.length - 1]); for (let i = c.length - 2; i >= 0; i--) x = B05.fadd(B05.fr(c[i]), B05.fr(x[1], x[0])); return x; };
  check(same(back([1, 2, 3, 4]), [43, 30]), '[1; 2, 3, 4] = 43/30');
  check(same(B05.CONV, [[1, 1], [3, 2], [10, 7], [43, 30]]), 'convergents');
  B05.CONV.forEach((c, i) => check(same(back(B05.COEF.slice(0, i + 1)), c), `convergent ${i}`));
  check(same(B05.DETS, [-1, 1, -1, 1]), `determinants ${B05.DETS}`);
  B05.DETS.forEach((d, i) => check(d === ((i + 1) % 2 ? -1 : 1), `det = (−1)^${i + 1}`));
  B05.CONV.forEach(c => check(B05.gcd(c[0], c[1]) === 1, `${c} in lowest terms`));

  /* 3. the product formula for −35/18, and for every n/d with |n|, d ≤ 60 */
  check(same(B05.READ.map(r => r.v), [[35, 18], [2, 1], [9, 1], [1, 5], [1, 7]]), 'readings of −35/18');
  check(same(B05.RUN.map(B05.fs), ['35/18', '35/9', '35', '7', '1']), `running product ${B05.RUN.map(B05.fs)}`);
  check(same(B05.READ.slice(1).reduce((x, r) => B05.fmul(x, r.v), [1, 1]), [18, 35]), 'prime rulers together 18/35');
  const primes = []; for (let n = 2; n <= 61; n++) if (isPrime(n)) primes.push(n);
  for (let n = -60; n <= 60; n++) for (let d = 1; d <= 60; d++) {
    if (!n) continue;
    const r = B05.fr(n, d); let x = B05.fr(Math.abs(r[0]), r[1]);
    for (const p of primes) x = B05.fmul(x, B05.pnorm(r, p));
    check(same(x, [1, 1]), `product formula at ${n}/${d}`);
  }

  /* 4. the six spinors: norm 5, fidelity 1/5; (1 + 2i)(1 − 2i) = 5; the adjoint matrix of A */
  B05.GEN.forEach(g => { check(B05.qn(g) === 5, `norm of ${g}`); check(B05.feq(B05.fr(g[0] * g[0], B05.qn(g)), [1, 5]), `kappa of ${g}`); });
  check(same(B05.qmul([1, 2, 0, 0], [1, -2, 0, 0]), [5, 0, 0, 0]), '(1 + 2i)(1 − 2i) = 5');
  check(same(B05.ADJ_A, [[5, 0, 0], [0, -3, -4], [0, 4, -3]]), `5 R(A) = ${JSON.stringify(B05.ADJ_A)}`);
  check(2 * (1 / 5) - 1 === -3 / 5, 'cos = 2κ − 1 = −3/5');
  B05.GEN.forEach((g, i) => check(same(B05.qmul(g, B05.GEN[B05.inv(i)]), [5, 0, 0, 0]), `g · g⁻¹ = 5 at ${i}`));

  /* 5. the tree: counts 6·5^(L−1); norm 5^L; primitivity; distinct rotations for all words of length ≤ 4 */
  check(same(B05.COUNT, [1, 6, 30, 150, 750]), `word counts ${B05.COUNT}`);
  const W = B05.WORDS;
  W.forEach(w => {
    const q = B05.evalQ(w);
    check(B05.qn(q) === Math.pow(5, w.length), `norm 5^L at ${w}`);
    if (w.length) check(!q.every(x => x % 5 === 0), `primitive at ${w}`);
  });
  check(B05.qn(B05.PATHQ) === 125 && JSON.stringify(B05.PATHQ) === '[-7,6,-2,6]' && !B05.PATHQ.every(x => x % 5 === 0), 'the highlighted word');
  for (let i = 1; i < B05.PATH.length; i++) check(B05.inv(B05.PATH[i - 1]) !== B05.PATH[i], 'the highlighted word is reduced');
  const mats = W.map(w => ({ m: B05.adj(B05.evalQ(w)), s: Math.pow(5, w.length) }));
  let clash = 0;
  for (let i = 0; i < mats.length; i++) for (let j = i + 1; j < mats.length; j++) {
    const a = mats[i], b = mats[j];
    let eq = true;
    for (let r = 0; r < 3 && eq; r++) for (let c = 0; c < 3; c++) if (a.m[r][c] * b.s !== b.m[r][c] * a.s) { eq = false; break; }
    if (eq) clash++;
  }
  check(clash === 0, `${clash} pairs of reduced words share a rotation`);

  /* 6. Hecke at p = 5: the eigenvalue −2/5 on a grid of q ≠ 0; the worked point; the margin; the constant */
  for (let w = -3; w <= 3; w++) for (let x = -3; x <= 3; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++) {
    const q = [w, x, y, z]; if (!B05.qn(q)) continue;
    check(B05.feq(B05.hecke(q), B05.fmul([-2, 5], B05.chi1(q))), `eigenvalue at ${q}`);
  }
  check(same(B05.QW, [1, 5, 7, -1, -5, 11]), `w-parts ${B05.QW}`);
  check(B05.QW.reduce((s, v) => s + v * v, 0) === 222 && 8 * 30 - 2 * 9 === 222 && B05.qn(B05.QX) === 30, 'Σ = 222');
  check(same(B05.chi1(B05.QX), [1, 5]) && same(B05.hecke(B05.QX), [-2, 25]), 'χ₁ = 1/5, T̂χ₁ = −2/25');
  check(same(B05.fr(4 * 37 - 150, 25), [-2, 25]) && same(B05.fr(222, 150), [37, 25]), '4 · 37/25 − 6');
  check(same(B05.MARGIN, [496, 25]) && B05.MARGIN[0] > 0, 'margin 496/25');
  const one = B05.GEN.length;  /* T̂₅ 1 = 6 */
  check(one === 6 && 20 - one * one === -16, 'the constant: 20 − 36 = −16');
  check(4 * 5 === 20 && 20 < 36, '4p = 20');
});

/* ======================================================================= */
/*                     scene 1 · NO LAST PRIME (act card)                   */
/* ======================================================================= */
SCENES.b05_title = S => {
  SPINE.title(S, 5, '不借复平面的素数', 'Primes without the complex plane');
  SPINE.rail(S, 5, at(S, 0, 0.6));
  const a = at(S, 0, 0.8, 0.1) * clamp((S.d - S.u) / 0.5);
  if (a <= 0.003) return;
  /* line 0: the last act's harmonics, a faint wave */
  const wa = a * (1 - 0.6 * at(S, 1, 0.8));
  curve(k => [240 + 1440 * k, 300 + 46 * Math.sin(k * TAU * 3 + S.u * 1.4) * Math.sin(k * Math.PI)], 160, C.cyan, wa * 0.55, 2.5);
  txt('VOLUME IV · harmonics on the sphere · 球面谐波', 240, 230, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: wa * 0.8 });
  /* the number line 1 … 40 with the primes lit */
  const y = 560, x0 = 200, sp = 33;
  const isP = n => n > 1 && [2, 3, 5, 7].every(p => n === p || n % p);
  line(x0 - 20, y, x0 + 40 * sp + 40, y, C.white, a * 0.6, 2);
  for (let n = 1; n <= 40; n++) {
    const x = x0 + (n - 1) * sp, la = a * clamp((S.u - lineAt(S, 0).s - 0.6 - n * 0.05) / 0.4);
    line(x, y - 8, x, y + 8, C.white, la * 0.5, 1.5);
    if (isP(n)) { dot(x, y, 9, 'c', la); txt(String(n), x, y + 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: la }); }
    else if (n % 5 === 0 || n === 1) txt(String(n), x, y + 44, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: la * 0.8 });
  }
  txt('primes · 素数', x0 - 20, y - 40, { size: 22, fam: F.zh, w: 700, c: C.cyan, a });
  /* line 1: the idol — all primes already queued at the far end */
  const ia = a * Q(S, 1, 'already queued', 0.8);
  if (ia > 0.003) {
    const fx = x0 + 40 * sp + 40;
    for (let i = 0; i < 9; i++) dot(fx + 30 + i * 22, y, 6 - i * 0.5, 'v', ia * (1 - i / 10));
    txt('ℙ = {2, 3, 5, 7, 11, …}', 1080, 700, { size: 40, fam: F.math, w: 700, c: C.argued, a: ia });
    txt('“a finished infinite set” · “已经完成的无穷集合”', 1080, 748, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ia });
  }
  const qa = a * Q(S, 1, 'Who has ever seen', 0.6);
  if (qa > 0.003) {
    B05.tag(1080, 800, 'IDOL · 偶像 · nobody has seen the whole queue · 无人见过整支队伍', C.argued, qa);
    txt('?', 1700, 700, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.now, a: qa, ab: 3 });
  }
};

/* ======================================================================= */
/*                        scene 2 · EUCLID'S ESCAPE                         */
/* ======================================================================= */
SCENES.b05_escape = S => {
  SPINE.rail(S, 5, 1);
  const a = B05.fade(S);
  if (a <= 0) return;
  /* left: the recipe on the six primes */
  panel(120, 180, 820, 420, a, C.cyan, 'RECIPE · 菜谱 · multiply, add one · 乘起来，再加一');
  const ca = a * at(S, 0, 0.8, 0.6);
  B05.PR.forEach((p, i) => chip(200 + i * 110, 270, 86, 60, String(p), C.cyan, ca * clamp((S.u - lineAt(S, 0).s - 0.6 - i * 0.12) / 0.4), 30));
  const pa = a * Q(S, 1, 'Two through thirteen', 0.6);
  B05.rich([['× all  =  ', C.white], ['30030', C.white]], 180, 370, { size: 38, a: pa });
  const na = a * Q(S, 1, 'thirty thousand and thirty-one', 0.6);
  B05.rich([['+ 1  =  ', C.white], ['30031', C.now]], 180, 436, { size: 46, a: na });
  /* the remainders: every old key misses by one */
  const ra = a * Q(S, 1, 'remainder one', 0.6);
  txt('remainders · 余数', 180, 470, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ra });
  B05.PR.forEach((p, i) => txt(`÷${p} → 1`, 180 + i * 122, 508, { size: 24, fam: F.mono, w: 700, c: C.now, a: ra * clamp((S.u - lineAt(S, 1).s - 3 - i * 0.1) / 0.3) }));
  B05.tag(180, 568, 'picture · 比方: every old key misses the lock by one · 每把旧钥匙都差一格', C.argued, ra * 0.95);
  /* line 2: the twist */
  const ta = a * Q(S, 2, 'fifty-nine times', 0.6);
  B05.rich([['30031 = ', C.white], ['59', C.now], [' × 509', C.white]], 180, 680, { size: 52, a: ta });
  const nw = a * Q(S, 2, 'Fifty-nine was never', 0.6);
  chip(820, 664, 210, 54, 'NEW · 新素数', C.now, nw, 24);
  txt('30031 is not prime · 30031 不是素数', 180, 730, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ta });

  /* right: the ledger of the recipe on every prefix */
  const la = a * at(S, 1, 0.8);
  panel(990, 180, 810, 420, la, C.cyan, 'LEDGER · 账本 · least prime factor · 最小素因子');
  txt('list S', 1020, 248, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la });
  txt('1 + ∏S', 1390, 248, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: la });
  txt('new prime', 1700, 248, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: la });
  B05.ESC.forEach((r, i) => {
    const ya = la * clamp((S.u - lineAt(S, 1).s - 0.3 - i * 0.3) / 0.4), yy = 290 + i * 42, last = i === B05.ESC.length - 1;
    txt(`[${r.s.join(', ')}]`, 1020, yy, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ya });
    txt(String(r.N), 1390, yy, { size: 24, fam: F.mono, w: 700, align: 'right', c: last ? C.now : C.white, a: ya });
    txt(`${r.q}`, 1700, yy, { size: 24, fam: F.mono, w: 700, align: 'right', c: last ? C.now : C.white, a: ya * (last ? Q(S, 2, 'fifty-nine times', 0.6) : 1) });
  });
  B05.num(1020, 580, la * 0.9);

  /* line 3: the theorem */
  const lt = a * at(S, 3, 0.6);
  if (lt > 0.003) {
    panel(990, 625, 810, 175, lt, C.lean, 'EUCLID · 欧几里得素数逃逸');
    txt('0 < ∏s  ⟹  ∃ p prime,  p ∣ ∏s + 1  ∧  p ∉ s', 1020, 712, { size: 30, fam: F.math, w: 700, c: C.white, a: lt });
    B05.lean(1020, 770, 'escape', lt);
  }
  /* line 4: the aphorism */
  const fa = a * at(S, 4, 0.7);
  if (fa > 0.003) {
    txt('Infinity is a rule, not a warehouse.', 560, 790, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.white, a: fa });
    txt('无穷是规则，不是仓库。', 560, 830, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: fa * 0.9 });
  }
};

/* ======================================================================= */
/*                      scene 3 · FRACTIONS THAT STOP                       */
/* ======================================================================= */
SCENES.b05_fraction = S => {
  SPINE.rail(S, 5, 1);
  const a = B05.fade(S);
  if (a <= 0) return;
  panel(120, 180, 760, 470, a, C.cyan, 'DIVIDE AND KEEP THE QUOTIENT · 辗转相除');
  B05.CF.forEach(([p, q, k, r], i) => {
    const sa = a * clamp((S.u - lineAt(S, 0).s - 1.0 - i * 0.7) / 0.5), y = 262 + i * 66;
    B05.rich([[`${p} = `, C.white], [String(k), C.now], [` × ${q} + ${r}`, C.white]], 170, y, { size: 40, a: sa });
    if (!r) txt('remainder 0: stop · 余数 0，停', 520, y, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: sa });
  });
  const ka = a * Q(S, 0, 'one, two, three, four', 0.6);
  B05.rich([['43/30 = [', C.white], ['1; 2, 3, 4', C.now], [']', C.white]], 170, 560, { size: 42, a: ka });
  B05.tag(170, 625, 'picture · 比方: nesting dolls, the last one solid · 套娃，最后一个是实心的', C.argued, a * at(S, 0, 0.6, 2.4), { size: 16 });

  /* right: the convergents and their cross products */
  const ra = a * at(S, 1, 0.6);
  panel(940, 180, 840, 620, ra, C.cyan, 'CONVERGENTS · 渐近分数 · stop the unfolding early · 提前停下');
  const xs = [1030, 1250, 1470, 1690];
  B05.CONV.forEach((c, i) => {
    const ca = ra * clamp((S.u - lineAt(S, 1).s - i * 0.3) / 0.4);
    txt(`${c[0]}/${c[1]}`, xs[i] - 20, 290, { size: 46, fam: F.math, w: 700, align: 'center', c: i === 3 ? C.now : C.white, a: ca });
  });
  B05.DETS.slice(1).forEach((d, j) => {
    const i = j + 1, c = B05.CONV[i], pc = B05.CONV[i - 1], xa = ra * Q(S, 1, 'cross-multiply', 0.5, 0.5 + j * 0.5);
    const xm = (xs[i - 1] + xs[i]) / 2;
    line(xs[i - 1] + 40, 320, xs[i] - 40, 320, C.cyan, xa * 0.6, 2);
    txt(`${c[0]}·${pc[1]} − ${pc[0]}·${c[1]}`, xm, 380, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: xa });
    txt(d > 0 ? '+1' : '−1', xm, 430, { size: 38, fam: F.math, w: 700, align: 'center', c: C.mag, a: xa });
  });
  B05.num(970, 490, ra * Q(S, 1, 'cross-multiply', 0.5, 1.6));
  const la = a * Q(S, 1, 'Lean checks that', 0.6);
  txt('det (convergentPair coeffs) = (−1)^count', 970, 550, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
  txt('[1, 2, 3, 4]:  (−1)⁴ = +1 = 43·7 − 10·30', 970, 594, { size: 24, fam: F.math, w: 700, c: C.now, a: la });
  B05.lean(970, 645, 'det', la);
  const ga = a * Q(S, 1, 'none ever needs reducing', 0.6);
  txt('d | p,  d | q   ⟹   d = 1', 970, 712, { size: 28, fam: F.math, w: 700, c: C.white, a: ga });
  txt('no limit is taken · 不取任何极限', 1750, 712, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ga });
  B05.lean(970, 765, 'coprime', ga);
};

/* ======================================================================= */
/*                      scene 4 · ONE RULER PER PRIME                       */
/* ======================================================================= */
SCENES.b05_adele = S => {
  SPINE.rail(S, 5, 1);
  const a = B05.fade(S);
  if (a <= 0) return;
  /* left: what a p ruler reads */
  panel(120, 180, 700, 330, a, C.cyan, 'THE p RULER · p 号尺');
  B05.rich([['|r|', C.white], ['ₚ', C.now], ['  =  ', C.white], ['p', C.now], [' ^ (−v', C.white], ['ₚ', C.now], ['(r))', C.white]], 160, 270, { size: 40, a: a * at(S, 0, 0.6, 1.4) });
  const da = a * Q(S, 1, 'counts only factors', 0.6);
  txt('vₚ(r): how many factors p are in r · r 里有几个因子 p', 160, 320, { size: 22, fam: F.zh, w: 700, c: C.dim, a: da });
  txt('18 = 2 · 3²   →   |18|₂ = 1/2,   |18|₃ = 1/9', 160, 390, { size: 28, fam: F.math, w: 700, c: C.white, a: da });
  txt('each p shrinks the reading p-fold · 每个 p 让读数缩为 1/p', 160, 440, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 1, 'shrinks the reading', 0.6) });
  B05.tag(160, 490, 'picture · 比方: a ledger with one column per ruler · 每把尺一栏账', C.argued, a * at(S, 0, 0.6, 2.6), { size: 16 });

  /* right: the ledger of −35/18 */
  const la = a * at(S, 2, 0.6);
  panel(880, 180, 920, 490, la, C.cyan, 'r = −35/18 · ONE LEDGER · 一本账');
  txt('ruler · 尺', 920, 245, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la });
  txt('reading · 读数', 1230, 245, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la });
  txt('running product · 累乘', 1760, 245, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.dim, a: la });
  B05.READ.forEach((r, i) => {
    const ra = la * clamp((S.u - lineAt(S, 2).s - 0.3 - i * 0.9) / 0.4), y = 300 + i * 56, big = r.v[0] > r.v[1];
    txt(i ? `${r.zh} · |r|${'₂₃₅₇'[i - 1]}` : '普通尺 · |r|', 920, y, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(B05.fs(r.v), 1230, y, { size: 32, fam: F.math, w: 700, c: big ? C.mag : C.cyan, a: ra });
    txt(big ? 'stretch · 拉长' : 'shrink · 缩小', 1400, y, { size: 18, fam: F.zh, w: 700, c: big ? C.mag : C.cyan, a: ra * 0.8 });
    const pa = la * Q(S, 3, 'Multiply the readings', 0.4, i * 0.35);
    txt(B05.fs(B05.RUN[i]), 1760, y, { size: 32, fam: F.math, w: 700, align: 'right', c: i === 4 ? C.now : C.white, a: pa });
  });
  txt('prime rulers together · 素数尺合计:  2 · 9 · 1/5 · 1/7 = 18/35 = 1/|r|', 920, 300 + 5 * 56 - 6, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: la * Q(S, 4, 'together take back', 0.5) });
  txt('11, 13, 17, … read 1 · 其余素数尺都读 1', 920, 300 + 5 * 56 + 30, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la * at(S, 2, 0.5, 4.2) });
  B05.num(1770, 652, la * at(S, 2, 0.5, 4.2), { align: 'right', size: 15 });
  /* the theorem */
  const ta = a * Q(S, 3, 'Lean checks', 0.6);
  if (ta > 0.003) {
    panel(120, 560, 700, 200, ta, C.lean, 'PRODUCT FORMULA · 阿代尔乘积归一');
    txt('r ≠ 0   ⟹   |r| · ∏ₚ |r|ₚ  =  1', 160, 650, { size: 38, fam: F.math, w: 700, c: C.white, a: ta });
    B05.lean(160, 720, 'adele', ta, { size: 17 });
  }
  /* the aphorism, the book's reading */
  const fa = a * at(S, 4, 0.6);
  if (fa > 0.003) {
    txt('What the usual ruler stretches, the prime rulers together take back.', 1340, 718, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a: fa });
    txt('普通尺拉长的，素数尺合起来如数收回。', 1340, 758, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: fa * 0.9 });
    B05.tag(1340 - 250, 806, "MODEL · the book's reading · 本书的诠释", C.argued, fa, { size: 16 });
  }
};

/* ======================================================================= */
/*                     scene 5 · A PRIME BECOMES A TURN                     */
/* ======================================================================= */
SCENES.b05_spinor = S => {
  SPINE.rail(S, 5, 1);
  const a = B05.fade(S);
  if (a <= 0) return;
  /* line 0: numbers commute, turns do not */
  panel(120, 180, 620, 190, a, C.cyan, 'ORDER · 次序');
  B05.rich([['2 × 3 = 3 × 2', C.cyan]], 160, 260, { size: 40, a: a * Q(S, 0, 'Numbers commute', 0.5) });
  B05.rich([['turn X, then Y  ≠  Y, then X', C.argued]], 160, 330, { size: 30, a: a * Q(S, 0, 'do not', 0.5) });
  /* line 1: the hand computation */
  const ha = a * at(S, 1, 0.6);
  panel(120, 400, 620, 190, ha, C.now, 'BY HAND · 手算');
  txt('(1 + 2i)(1 − 2i)', 160, 470, { size: 38, fam: F.math, w: 700, c: C.white, a: ha });
  txt('= 1 − 4i² = 1 + 4 = 5', 160, 530, { size: 38, fam: F.math, w: 700, c: C.now, a: a * Q(S, 1, 'is exactly five', 0.5) });
  B05.num(160, 576, ha * 0.9, { size: 15 });
  B05.tag(140, 640, 'picture · 比方: a prism, 5 in, six turns out · 棱镜：一进六出', C.argued, a * at(S, 2, 0.6, 1.0), { size: 16 });

  /* line 2: the six generators */
  const ga = a * at(S, 2, 0.6);
  panel(800, 180, 1000, 300, ga, C.argued, 'S₅ · SIX PRIME SPINORS OF NORM 5 · 模方 5 的六个素旋子');
  B05.GEN.forEach((g, i) => {
    const x = 830 + (i % 3) * 320, y = 270 + Math.floor(i / 3) * 86, ca = ga * clamp((S.u - lineAt(S, 2).s - 0.5 - i * 0.18) / 0.4);
    txt(`${B05.GNAME[i]}`, x, y, { size: 22, fam: F.mono, w: 700, c: C.argued, a: ca });
    txt(`(${g.map(B05.neg).join(', ')})`, x + 62, y, { size: 28, fam: F.math, w: 700, c: C.white, a: ca });
    txt('1 + 4 = 5', x + 62, y + 34, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ca });
  });
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  txt('each g:  |g|² = 5,   κ = 1/5', 830, 448, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
  B05.lean(1250, 450, 'norm5', la, { size: 17 });

  /* line 3: one turn, exactly — the 3-4-5 triangle on the unit circle */
  const ta = a * at(S, 3, 0.6);
  if (ta > 0.003) {
    panel(800, 505, 1000, 300, ta, C.argued, 'A = (1, 2, 0, 0) TURNS ABOUT x · 绕 x 轴转');
    txt('5·R(A) =', 830, 640, { size: 28, fam: F.math, w: 700, c: C.white, a: ta });
    const M = B05.ADJ_A;
    M.forEach((row, r) => row.forEach((v, c) => txt(B05.neg(v), 1060 + c * 70, 590 + r * 46, { size: 28, fam: F.mono, w: 700, align: 'right', c: r && c ? C.now : C.white, a: ta })));
    line(1000, 560, 1000, 700, C.white, ta * 0.7, 2); line(1220, 560, 1220, 700, C.white, ta * 0.7, 2);
    txt('from  v ↦ q v q̄  ·  cos = −3/5, sin = 4/5', 830, 770, { size: 22, fam: F.math, w: 700, c: C.cyan, a: ta });
    /* the circle with the rational point (−3/5, 4/5) */
    const cx = 1560, cy = 650, Rr = 110, k = ease(Q(S, 3, 'cosine minus three fifths', 1.0));
    ring(cx, cy, Rr, C.white, ta * 0.5, 2);
    line(cx - Rr - 20, cy, cx + Rr + 20, cy, C.dim, ta * 0.6, 1.2);
    line(cx, cy - Rr - 20, cx, cy + Rr + 20, C.dim, ta * 0.6, 1.2);
    const px = cx - 0.6 * Rr * k, py = cy - 0.8 * Rr * k;
    line(cx, cy, px, py, C.argued, ta, 3);
    dashed(px, py, px, cy, C.now, ta * k);
    dashed(px, cy, cx, cy, C.now, ta * k);
    txt('3', cx - 0.3 * Rr, cy + 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: ta * k });
    txt('4', px - 18, cy - 0.4 * Rr, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: ta * k });
    txt('5', (cx + px) / 2 + 16, (cy + py) / 2 - 6, { size: 20, fam: F.mono, w: 700, c: C.argued, a: ta * k });
    dot(px, py, 9, 'g', ta * k);
    txt('no π · 不用 π', cx + 30, cy + Rr + 40, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ta * Q(S, 3, 'No pi needed', 0.5) });
  }
};

/* ======================================================================= */
/*                      scene 6 · A TREE WITH NO LOOPS                      */
/* ======================================================================= */
SCENES.b05_free = S => {
  SPINE.rail(S, 5, 1);
  const a = B05.fade(S);
  if (a <= 0) return;
  const cx = 1330, cy = 495, RAD = [0, 95, 200, 305];
  /* layout: each word of length ≤ 3 gets the mean angle of its leaves */
  const words = B05.WORDS.filter(w => w.length <= 3), leaves = words.filter(w => w.length === 3);
  const key = w => w.join(','), ang = new Map();
  leaves.forEach((w, i) => ang.set(key(w), TAU * (i + 0.5) / leaves.length - Math.PI / 2));
  for (let L = 2; L >= 0; L--) words.filter(w => w.length === L).forEach(w => {
    const ch = words.filter(c => c.length === L + 1 && key(c.slice(0, L)) === key(w)).map(c => ang.get(key(c)));
    ang.set(key(w), ch.reduce((s, v) => s + v, 0) / ch.length);
  });
  const pos = w => { const t = ang.get(key(w)), r = RAD[w.length]; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; };
  const grow = [a * at(S, 0, 0.8, 0.4), a * Q(S, 1, 'Six chains', 0.8), a * Q(S, 1, 'then thirty', 0.8), a * Q(S, 1, 'a hundred and fifty', 0.8)];
  words.forEach(w => {
    if (!w.length) return;
    const g = grow[w.length], p = pos(w), q = pos(w.slice(0, -1));
    line(q[0], q[1], p[0], p[1], C.argued, g * (0.85 - 0.18 * w.length), 1.6);
    dot(p[0], p[1], 5 - w.length, 'v', g * 0.9);
  });
  words.filter(w => w.length === 1).forEach(w => { const p = pos(w), t = ang.get(key(w)); txt(B05.GNAME[w[0]], cx + 70 * Math.cos(t) - 22 * Math.sin(t), cy + 70 * Math.sin(t) + 22 * Math.cos(t) + 7, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a: grow[1] }); });
  dot(cx, cy, 11, 'w', grow[0]);
  txt('centre = start · 圆心 = 原点', 1700, 230, { size: 17, fam: F.zh, w: 700, align: 'right', c: C.white, a: grow[0] * 0.85 });
  /* the highlighted chain A B C, step by step during line 0 */
  const pa = a * Q(S, 0, 'never undoing the last one', 1.0);
  for (let i = 1; i <= 3; i++) {
    const k = clamp(pa * 3 - (i - 1)), p = pos(B05.PATH.slice(0, i)), q = pos(B05.PATH.slice(0, i - 1));
    if (k > 0) line(q[0], q[1], lerp(q[0], p[0], k), lerp(q[1], p[1], k), C.now, a, 5);
    if (k >= 1) dot(p[0], p[1], 9, 'g', a);
  }
  /* readouts, left */
  panel(120, 180, 700, 250, a, C.cyan, 'COUNT THE CHAINS · 数一数');
  [[1, 'Six chains'], [2, 'then thirty'], [3, 'a hundred and fifty']].forEach(([L, ph], i) => {
    const ca = a * Q(S, 1, ph, 0.5);
    txt(`length ${L}:`, 160, 260 + i * 50, { size: 26, fam: F.mono, w: 700, c: C.dim, a: ca });
    txt(`${B05.COUNT[L]}`, 380, 260 + i * 50, { size: 34, fam: F.math, w: 700, c: C.white, a: ca });
    txt(L === 1 ? '= 6' : `= 6 · 5${'¹²'[L - 2]}`, 480, 260 + i * 50, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ca });
  });
  B05.num(160, 412, a * Q(S, 1, 'five fresh choices', 0.5));
  /* the chain's quaternion: norm 5^L, never divisible by 5 */
  const qa = a * at(S, 1, 0.6, 3.2);
  const pq = B05.PATHQ.map(B05.neg).join(', ');
  txt('A B C  →  q = (' + pq + ')', 160, 485, { size: 24, fam: F.math, w: 700, c: C.now, a: qa });
  txt('|q|² = 125 = 5³ · not all ÷ 5 · 不全被 5 整除', 160, 520, { size: 22, fam: F.zh, w: 700, c: C.white, a: qa });
  /* line 2: the theorem */
  const ta = a * at(S, 2, 0.6);
  if (ta > 0.003) {
    panel(120, 560, 700, 170, ta, C.lean, 'FREE · 自由');
    txt('u, v reduced,  Ad u = Ad v  on x, y  ⟹  u = v', 150, 635, { size: 24, fam: F.math, w: 700, c: C.white, a: ta });
    B05.lean(150, 698, 'free', ta, { size: 16 });
  }
  /* line 3: the tree branches, and the corollary */
  const fa = a * at(S, 3, 0.6);
  B05.tag(150, 780, 'picture · 比方: tree branches — twigs never grow back together · 树枝：细枝不会长回一起', C.argued, fa, { size: 16 });
  const ca = a * Q(S, 3, 'generate a free group', 0.6);
  B05.rich([['⟨A, B, C⟩ ≅ F₃ ↪ SO(3, ℚ)', C.white]], 1240, 845, { size: 32, a: ca, align: 'center' });
  B05.tag(1480, 842, 'corollary, v = nil · 推论', C.argued, ca, { size: 15 });
};

/* ======================================================================= */
/*                     scene 7 · A GAP WITHOUT ROOTS                        */
/* ======================================================================= */
SCENES.b05_mix = S => {
  SPINE.rail(S, 5, 1);
  const a = B05.fade(S);
  if (a <= 0) return;
  /* the coffee picture, top left */
  const pa = a * (1 - 0.7 * at(S, 2, 0.8));
  panel(120, 180, 420, 300, pa, C.argued, 'PICTURE · 比方');
  const cx = 330, cy = 330, decay = Math.exp(-0.14 * Math.max(0, S.u - 1));
  ring(cx, cy, 95, C.white, pa * 0.6, 2);
  curve(k => { const t = k * 3 * TAU - S.u * 1.6, r = 85 * k; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }, 200, C.argued, pa * (0.15 + 0.85 * decay), 2.6);
  txt('spoon = six turns, swirl = pattern · 勺 = 六个转动，漩涡 = 花纹', 140, 455, { size: 15, fam: F.zh, w: 700, c: C.argued, a: pa });
  /* the test: from 2√5 to a rational one */
  panel(580, 180, 1220, 300, a, C.cyan, 'THE RAMANUJAN TEST · 拉马努金判据 · p = 5');
  const ta = a * Q(S, 1, 'two root five', 0.6);
  txt('|λ̂| ≤ 2√5   (complex Satake parameters · 复数参数)', 620, 265, { size: 30, fam: F.math, w: 700, c: C.white, a: ta * (1 - 0.5 * Q(S, 1, 'Square it', 0.6)) });
  const sa = a * Q(S, 1, 'the roots vanish', 0.6);
  B05.rich([['λ̂² ≤ 20', C.now], ['   ⟺   Q(f) = 20⟨f, f⟩ − ⟨T̂f, T̂f⟩ ≥ 0', C.white], ['   (f ∈ L²₀(SO(3)))', C.dim]], 620, 335, { size: 30, a: sa });
  const ra = a * at(S, 2, 0.6);
  txt('only whole numbers and fractions · 只用整数和分数', 620, 390, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ra });
  B05.tag(620, 450, 'nonconstant SO(3) shells · 非常值 SO(3) 壳层 · Eichler–Deligne–LPS', C.argued, ra, { size: 15 });

  /* the spectrum line: the band λ̂² ≤ 20, χ₁ inside, the constant outside */
  const la = a * at(S, 2, 0.6, 0.6);
  const X = v => 960 + v * 100, y = 560;
  if (la > 0.003) {
    const b = Math.sqrt(20);
    fillBox(X(-b), y - 22, X(b) - X(-b), 44, C.cyan, la * 0.16);
    line(X(-7.4), y, X(7.4), y, C.white, la * 0.6, 2);
    for (let v = -7; v <= 7; v++) { line(X(v), y - 8, X(v), y + 8, C.white, la * 0.5, 1.5); if (!(v % 2)) txt(B05.neg(v), X(v), y + 38, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: la }); }
    txt('λ̂² ≤ 20', X(0), y - 34, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: la });
    const ea = a * Q(S, 3, 'minus two fifths', 0.5);
    dot(X(-0.4), y, 12, 'g', ea);
    txt('χ₁: −2/5', X(-0.4) - 14, y + 74, { size: 22, fam: F.math, w: 700, align: 'right', c: C.now, a: ea });
    const ka = a * Q(S, 5, 'The constant fails', 0.5);
    dot(X(6), y, 12, 'm', ka);
    txt('constant: 6,  20 − 36 = −16', X(6), y - 34, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: ka });
  }
  /* line 3: the eigenvalue theorem */
  const hide = 1 - at(S, 5, 0.5);
  const ea = a * at(S, 3, 0.6) * hide;
  if (ea > 0.003) {
    panel(120, 640, 820, 170, ea, C.lean, 'χ₁ = (3w² − x² − y² − z²) / |q|²');
    txt('q ≠ 0  ⟹  (T̂₅ χ₁)(q) ≡ −2/5 · χ₁(q)', 150, 712, { size: 32, fam: F.math, w: 700, c: C.white, a: ea });
    B05.lean(150, 772, 'eig', ea * Q(S, 3, 'Lean checks it', 0.5), { size: 16 });
  }
  /* line 4: the hand check at q = (3, 1, −2, 4) */
  const ha = a * at(S, 4, 0.6) * hide;
  if (ha > 0.003) {
    panel(980, 640, 820, 170, ha, C.now, 'BY HAND · 手算 · q = (3, 1, −2, 4)');
    txt('w-parts: ' + B05.QW.map(B05.neg).join(', ') + '   Σ² = 222', 1010, 702, { size: 24, fam: F.math, w: 700, c: C.white, a: ha });
    txt('χ₁ = 1/5     T̂₅χ₁ = 4 · 37/25 − 6 = −2/25', 1010, 744, { size: 24, fam: F.math, w: 700, c: C.now, a: ha * Q(S, 4, 'minus two twenty-fifths', 0.5) });
    B05.num(1010, 790, ha * 0.9, { size: 15 });
  }
  /* line 5: the margin */
  const ma = a * at(S, 5, 0.6);
  if (ma > 0.003) {
    panel(120, 640, 1680, 170, ma, C.lean, 'MARGIN · 正定裕度');
    txt('20 − (−2/5)²  ≡  496/25  >  0', 160, 718, { size: 40, fam: F.math, w: 700, c: C.white, a: ma });
    B05.lean(160, 782, 'margin', a * Q(S, 5, 'as Lean checks', 0.5), { size: 17 });
    txt('the constant: T̂₅1 = 6,  20 − 6² = −16 < 0', 1100, 718, { size: 28, fam: F.math, w: 700, c: C.mag, a: a * Q(S, 5, 'The constant fails', 0.5) });
    B05.num(1100, 782, a * Q(S, 5, 'The constant fails', 0.5), { size: 15 });
  }
};

/* ======================================================================= */
/*                          scene 8 · NEXT QUESTION                         */
/* ======================================================================= */
SCENES.b05_ask = S => {
  SPINE.rail(S, 5, 1);
  const a = clamp(S.u / 0.5);
  /* line 0: the Riemann hypothesis, as PROJECT.md §14 says it */
  const ra = a * at(S, 0, 0.6) * (1 - 0.6 * at(S, 2, 0.8));
  panel(240, 185, 1440, 175, ra, C.white, 'RIEMANN HYPOTHESIS · 黎曼猜想');
  txt('proved in an external Lean project (L. Alpöge, 2026) · 外部 Lean 项目已证明', 280, 262, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
  txt('not frozen in this book\'s pinned library · 本书所钉的库没有冻结它 · the test above does not imply it · 上面的判据推不出它', 280, 312, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  B05.tag(1640, 220, '“cousin” is an analogy · “表亲”是类比', C.argued, ra * Q(S, 0, 'a cousin of this bound', 0.5), { size: 15, align: 'right' });
  /* line 1: the four steps of the act */
  const items = [
    ['escape · 逃逸', '1 + ∏S', 'Primes escape'],
    ['balance · 配平', '|r| · ∏ₚ |r|ₚ = 1', 'rulers balance'],
    ['no loops · 无环', 'F₃ ↪ SO(3, ℚ)', 'turns never loop'],
    ['gap · 谱隙', '20 − λ̂² ≥ 0', 'the gap needs no square root']
  ];
  items.forEach(([lab, f, ph], i) => {
    const ia = a * Q(S, 1, ph, 0.5) * (1 - 0.4 * at(S, 2, 0.8));
    const x = 240 + i * 370;
    panel(x, 400, 330, 200, ia, C.cyan, lab);
    txt(f, x + 165, 520, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: ia });
  });
  /* line 2: the question handed to the next act */
  SPINE.ask(S, 2, 'Numbers, turns, calculus, spectra: can one machine run them all?', '数、转动、微积分、谱：一台机器能全跑起来吗？');
};

/* ---- b06 · Computation, observers and the zero-axiom kernel · 计算、观察者与零公理内核 ---- */
/* Act b06 of the long film "One Axiom, No Infinity" · Volume VI (chapters 16–18):
   computation, observers and the zero-axiom kernel.
   Everything on screen is computed here, exactly, from the definitions the book states:
     the four-rule FRACTRAN program P_Ω = [11/49, 7/25, 5/9, 3/4] run from 2^17 (ch. 16, theorem p_omega_halts_at_22);
     the integer quaternions X = 1 + 2i, Y = 1 + 2j, XY, YX and the unwind gate conj(Y) with divisor 5
     (ch. 16, quaternion_fractran_order_separation);
     the observer's structural time 0 → 1/2 → 2 (ch. 17, the book's worked example; an interpretation, MODEL);
     the Cayley point (q² − p², 2pq) / (p² + q²) at (p, q) = (1, 2) (ch. 18, cayley_circle_unit, core and shadow).
   FILM.init re-derives every number independently and reports any disagreement as a page error. */
const B06 = (() => {
  const PRIMES = [2, 3, 5, 7, 11];
  const PROG = [[11, 49], [7, 25], [5, 9], [3, 4]];
  const START = 131072;
  /* exponent vector of n over the five primes (n has no other prime factors here) */
  function exps(n) {
    return PRIMES.map(p => { let k = 0; while (n % p === 0) { n /= p; k++; } return k; });
  }
  /* one FRACTRAN step: the first rule whose denominator divides n, or null */
  function step(n) {
    for (let i = 0; i < PROG.length; i++) if (n % PROG[i][1] === 0) return { n: (n / PROG[i][1]) * PROG[i][0], rule: i };
    return null;
  }
  function runTrace(n0) {
    const tr = [{ n: n0, rule: -1 }];
    for (let s = step(n0); s; s = step(tr[tr.length - 1].n)) { tr.push(s); if (tr.length > 100) break; }
    return tr;
  }
  const TRACE = runTrace(START);
  /* integer quaternions (w, x, y, z) with i² = j² = k² = ijk = −1 */
  function qmul(a, b) {
    return [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
      a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
      a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
      a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  }
  const nsq = a => a.reduce((s, v) => s + v * v, 0);
  const mod = (v, p) => ((v % p) + p) % p;
  const X = [1, 2, 0, 0], Y = [1, 0, 2, 0], GATE = [1, 0, -2, 0], P = 5;
  const XY = qmul(X, Y), YX = qmul(Y, X);
  const XYG = qmul(XY, GATE), YXG = qmul(YX, GATE);
  const fmtQ = q => `(${q.map(v => (v < 0 ? '−' + -v : String(v))).join(', ')})`;
  /* the observer's three steps (ch. 17 worked example): Schur innovation |x⊥|²/|x|² plus the comparison-graph cycle increment */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }
  function frac(n, d) { const g = gcd(n, d) || 1; return [n / g, d / g]; }
  function fadd(a, b) { return frac(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  const fstr = f => (f[1] === 1 ? String(f[0]) : `${f[0]}/${f[1]}`);
  const dotv = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  function innovation(basis, x) {
    /* x⊥ with exact rational arithmetic over the orthogonal basis (all entries stay integers times 1/|u|²) */
    let num = x.map(v => frac(v, 1));
    for (const u of basis) {
      const c = frac(dotv(x, u), dotv(u, u));
      num = num.map((v, i) => fadd(v, [-c[0] * u[i], c[1]]));
    }
    const sq = num.reduce((s, v) => fadd(s, [v[0] * v[0], v[1] * v[1]]), [0, 1]);
    return { perp: num, ratio: frac(sq[0] * 1, sq[1] * dotv(x, x)) };
  }
  const E0 = [1, 0, 0, 0], H1 = [1, 1, 0, 0], H2 = [1, 0, 1, 0];
  function observerSteps() {
    const basis = [E0];
    const beats = [
      { x: E0, comparisons: [] },
      { x: H1, comparisons: [[0, 1]] },
      { x: H2, comparisons: [[0, 2], [1, 2]] }
    ];
    let tau = [0, 1], vertices = 1, edges = 0, previousBetti = 0;
    return beats.map(({ x, comparisons }) => {
      const { perp, ratio: di } = innovation(basis, x);
      if (di[0] > 0) basis.push(perp.map(([n, d]) => n / d));
      // Each new vertex attaches to the seed component. The third beat closes a triangle.
      if (comparisons.length) vertices++;
      edges += comparisons.length;
      const betti = edges - vertices + 1;
      const deltaBetti = betti - previousBetti;
      const d = fadd(di, [deltaBetti, 1]);
      previousBetti = betti;
      tau = fadd(tau, d);
      return { x, comparisons, di, deltaBetti, d, tau };
    });
  }
  const OBS = observerSteps();
  /* the Cayley point of (p, q) = (1, 2) */
  const CP = 1, CQ = 2, CN = CP * CP + CQ * CQ;
  const CAY = { x: frac(CQ * CQ - CP * CP, CN), y: frac(2 * CP * CQ, CN) };

  const GID = {
    halt: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.p_omega_halts_at_22',
    order: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_order_separation',
    circle: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit',
    shadow: 'D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit'
  };
  /* one LEAN ✓ chip: the declaration's last name segment large, its full label (Lean name or GID) on a second line */
  function leanRef(x, y, gid, a, o = {}) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', name = r.label || r.name, maxW = o.maxW || 760;
    const short = name.split(/[./]/).pop();
    const size = o.size || 24;
    const wh = tw(head, size * 0.78, F.mono, 700, 1) + 20;
    fillBox(x, y - size * 1.0, wh, size * 1.32, C.lean, a);
    txt(head, x + 10, y - size * 0.14, { size: size * 0.78, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(short, x + wh + 14, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    let s2 = 16;
    while (s2 > 11 && tw(name, s2, F.mono, 400) > maxW) s2 -= 1;
    txt(name, x, y + 30, { size: s2, fam: F.mono, c: C.lean, a: a * 0.8 });
  }
  /* five prime jars holding marbles; o.hot: indices drawn amber; o.ghost: extra marbles fading (index → alpha) */
  function jars(x0, yb, ex, a, o = {}) {
    if (a <= 0.003) return;
    const gap = o.gap || 130, jw = o.jw || 92, jh = o.jh || 380, r = o.r || 8, pitch = o.pitch || 20;
    PRIMES.forEach((p, i) => {
      const x = x0 + i * gap, hot = o.hot && o.hot.includes(i);
      const col = hot ? C.now : C.cyan;
      line(x, yb - jh, x, yb, col, a * (hot ? 1 : 0.7), 2.5);
      line(x + jw, yb - jh, x + jw, yb, col, a * (hot ? 1 : 0.7), 2.5);
      line(x, yb, x + jw, yb, col, a * (hot ? 1 : 0.7), 2.5);
      fillBox(x + 2, yb - jh, jw - 4, jh, hot ? rgba(C.now, 0.08) : 'rgba(4,10,24,0.5)', a);
      for (let j = 0; j < ex[i]; j++) dot(x + jw / 2, yb - r - 6 - j * pitch, r + 1.5, hot ? 'g' : 'c', a);
      txt(String(p), x + jw / 2, yb + 42, { size: 36, fam: F.disp, w: 700, align: 'center', c: hot ? C.now : C.white, a });
      txt(String(ex[i]), x + jw / 2, yb - jh - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: hot ? C.now : C.dim, a });
    });
  }
  return { PRIMES, PROG, START, TRACE, exps, step, qmul, nsq, mod, X, Y, GATE, P, XY, YX, XYG, YXG, fmtQ, OBS, fstr, frac, fadd, CP, CQ, CAY, GID, leanRef, jars };
})();

FILM.init.push(() => {
  const B = B06, err = m => window.FILM_ERRORS.push('b06: ' + m);
  /* FRACTRAN: the trace of the book's table and of the theorem's pOmegaTrace */
  const book = [131072, 98304, 73728, 40960, 30720, 23040, 12800, 3584, 2688, 2016, 1120, 840, 630, 350, 98, 22];
  if (B.START !== 2 ** 17) err('start is not 2^17');
  if (B.TRACE.length !== 16 || B.TRACE.some((s, i) => s.n !== book[i])) err('P_Ω trace differs from the book');
  if (B.step(22) !== null) err('22 does not halt');
  for (let i = 0; i < 15; i++) if (B.step(book[i]) === null) err('early halt at ' + i);
  /* independent check of each transition by the exponent vectors: Δ = r(a) − r(b) of the fired rule */
  for (let i = 1; i < 16; i++) {
    const [a, b] = B.PROG[B.TRACE[i].rule], e0 = B.exps(book[i - 1]), e1 = B.exps(book[i]), da = B.exps(a), db = B.exps(b);
    if (e1.some((v, k) => v !== e0[k] + da[k] - db[k])) err('exponent ledger breaks at step ' + i);
    const back = B.PRIMES.reduce((s, p, k) => s * p ** e1[k], 1);
    if (back !== book[i]) err('state ' + i + ' has other prime factors');
  }
  const fin = B.exps(22);
  if (fin.join() !== '1,0,0,0,1') err('22 is not 2 · 11');
  /* quaternions: compare the product against the matrix form of left multiplication */
  const L = a => [[a[0], -a[1], -a[2], -a[3]], [a[1], a[0], -a[3], a[2]], [a[2], a[3], a[0], -a[1]], [a[3], -a[2], a[1], a[0]]];
  const mm = (a, b) => L(a).map(row => row.reduce((s, v, k) => s + v * b[k], 0));
  if (mm(B.X, B.Y).join() !== B.XY.join() || mm(B.Y, B.X).join() !== B.YX.join()) err('quaternion product mismatch');
  if (B.XY.join() !== '1,2,2,4' || B.YX.join() !== '1,2,2,-4') err('XY or YX changed');
  if (B.nsq(B.XY) !== 25 || B.nsq(B.YX) !== 25) err('norms are not 25');
  if (mm(B.XY, B.GATE).join() !== '5,10,0,0' || B.XYG.some(v => B.mod(v, 5))) err('XY does not pass the gate');
  if (B.XYG.map(v => v / 5).join() !== B.X.join()) err('XY does not unwind to X');
  if (B.YXG.join() !== '5,-6,0,-8' || B.YXG.map(v => B.mod(v, 5)).join() !== '0,4,0,2') err('YX remainders changed');
  /* observer: 0, 1/2, 2 */
  if (B.OBS.map(s => B.fstr(s.tau)).join() !== '0,1/2,2') err('structural time is not 0, 1/2, 2');
  if (B.OBS.map(s => B.fstr(s.di)).join() !== '0,1/2,1/2') err('innovation ratios changed');
  if (B.OBS.map(s => s.deltaBetti).join() !== '0,0,1') err('comparison cycle increments changed');
  /* Cayley point (3/5, 4/5) and x² + y² = 1 */
  const cx = B.CAY.x, cy = B.CAY.y;
  if (B.fstr(cx) !== '3/5' || B.fstr(cy) !== '4/5') err('Cayley point is not (3/5, 4/5)');
  if (B.fstr(B.fadd([cx[0] ** 2, cx[1] ** 2], [cy[0] ** 2, cy[1] ** 2])) !== '1') err('Cayley point is off the circle');
  Object.values(B.GID).forEach(g => { const r = leanCite(g); if (!r || r.kind !== 'theorem') err('missing citation ' + g); });
});

SCENES.b06_title = S => {
  const B = B06, u = S.u, fade = clamp((S.d - u) / 0.5);
  SPINE.title(S, 6, '计算、观察者与零公理内核', 'Computation, observers and the zero-axiom kernel');
  SPINE.rail(S, 6, at(S, 0, 0.6));
  /* line 0: a drift of fractions */
  const a0 = at(S, 0, 0.8) * (1 - Q(S, 1, 'Who said', 0.6)) * fade;
  const FR = ['3/5', '4/5', '1/4', '5/64', '−1/5', '496/25', '1/2', '16/25', '9/25', '3/8', '2/3', '5/9', '7/25', '11/49', '3/4', '1/8'];
  FR.forEach((f, i) => {
    const x = 220 + (i % 8) * 210 + 40 * Math.sin(i * 1.7), y = 300 + Math.floor(i / 8) * 150 + 18 * Math.sin(u * 0.8 + i);
    txt(f, x, y, { size: 44, fam: F.math, w: 700, align: 'center', c: i % 3 ? C.cyan : C.white, a: a0 * (0.35 + 0.5 * rnd(i, 3)) });
  });
  txt('a world of fractions · 分数的世界', W / 2, 560, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0, ls: 3 });
  /* line 1: chips, memory, clock struck out; one number and four fractions remain */
  const q1 = Q(S, 1, 'Who said', 0.5) * fade;
  const items = [['CHIPS', '芯片'], ['MEMORY', '内存'], ['CLOCK', '时钟']];
  items.forEach(([en, zh], i) => {
    const x = 520 + i * 440, y = 330, s = Q(S, 1, 'clock', 0.4, 0.1 + 0.15 * i);
    chip(x, y, 300, 76, `${en} · ${zh}`, C.mag, q1 * (1 - 0.5 * s), 28, F.zh);
    line(x - 160, y + 34, x + 160, y - 34, C.mag, q1 * s, 5);
  });
  const q2 = Q(S, 1, 'One whole number', 0.5) * fade;
  chip(560, 560, 300, 96, 'N = 2¹⁷', C.now, q2, 40, F.math);
  txt('one whole number · 一个整数', 560, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: q2 });
  const q3 = Q(S, 1, 'a list of fractions', 0.5) * fade;
  B.PROG.forEach(([a, b], i) => chip(1060 + i * 170, 560, 140, 96, `${a}/${b}`, C.cyan, q3 * clamp((u - phraseAt(S, 1, 'a list of fractions') - 0.12 * i) / 0.4), 36, F.math));
  txt('a list of fractions · 一串分数', 1315, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q3 });
};

SCENES.b06_rule = S => {
  const B = B06, u = S.u, fade = clamp((S.d - u) / 0.5);
  SPINE.rail(S, 6, clamp(u / 0.5) * fade);
  /* the program and its one rule */
  const a = clamp(u / 0.6) * fade;
  panel(140, 190, 760, 560, a, C.cyan, 'FRACTRAN · ONE RULE · 一条规则');
  B.PROG.forEach(([n, d], i) => {
    const y = 290 + i * 82, scan = Q(S, 0, 'the first fraction', 0.4, 0.25 * i) * (1 - Q(S, 1, 'Then go back', 0.4));
    chip(300, y, 170, 66, `${n}/${d}`, C.cyan, a, 34, F.math);
    txt(`rule ${i + 1}`, 420, y + 10, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
    if (scan > 0 && i === 3) arrow(560, y, 420 + 130, y, C.now, a * scan);
    txt(i < 3 ? `${d} ∤ 12 → skip` : '4 | 12 → 12 · 3/4 = 9', 560, y + 10, { size: 24, fam: F.math, w: 700, c: i < 3 ? C.dim : C.now, a: a * Q(S, 0, 'the first fraction', 0.4, 0.25 * i) });
  });
  txt('N = 12  ·  scan top-down, fire the first that keeps N whole', 180, 640, { size: 20, fam: F.mono, w: 700, c: C.white, a: a * at(S, 0, 0.6) });
  txt('↺ back to the top   ·   none fits → HALT', 180, 690, { size: 24, fam: F.mono, w: 700, c: C.now, a: a * Q(S, 1, 'Then go back', 0.5) });
  /* the jar picture (an analogy) */
  const j = Q(S, 2, 'Picture', 0.6) * fade;
  badge(j, 'argued');
  if (j > 0) {
    panel(1000, 190, 780, 560, j, C.argued, 'ANALOGY · 比方 · PRIMES AS JARS');
    const take = Q(S, 3, 'take two marbles', 0.8), drop = Q(S, 3, 'drop one', 0.6);
    B.jars(1070, 650, [Math.max(0, 2 - (take >= 1 ? 2 : 0)), 1 + (drop >= 1 ? 1 : 0), 0, 0, 0], j, { gap: 138, jw: 86, jh: 230, hot: take > 0 ? [0, 1] : [] });
    /* the two leaving marbles and the arriving one, in motion */
    if (take > 0 && take < 1) for (let k = 0; k < 2; k++) dot(1070 + 43, 650 - 14 - k * 20 - 160 * take, 9.5, 'g', j * (1 - take));
    if (drop > 0 && drop < 1) dot(1070 + 138 + 43, 650 - 14 - 20 - 160 * (1 - drop), 9.5, 'g', j * drop);
    const shown = take >= 1 && drop >= 1 ? 9 : 12;
    txt(`N = ${shown} = ${shown === 12 ? '2² · 3' : '3²'}`, 1390, 245 + 40, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: j });
    txt('jar p holds one marble per factor p in N', 1390, 732, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.argued, a: j * 0.95 });
    txt('3/4 :  jar 2  −2  ·  jar 3  +1', 1390, 330 + 4, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: j * take });
  }
};

SCENES.b06_run = S => {
  const B = B06, u = S.u, fade = clamp((S.d - u) / 0.5);
  SPINE.rail(S, 6, clamp(u / 0.5) * fade);
  badgeQ(S, [[0, null, 'computed'], [4, 'checked every step', 'lean']]);
  const t0 = phraseAt(S, 1, 'Pairs of twos'), t1 = phraseAt(S, 2, 'nothing divides');
  const k = u < t0 ? 0 : Math.min(15, Math.floor(1 + 14.999 * (u - t0) / Math.max(0.5, t1 - t0)));
  const cur = B.TRACE[k], ex = B.exps(cur.n), prev = k ? B.exps(B.TRACE[k - 1].n) : ex;
  const hot = [];
  for (let i = 0; i < 5; i++) if (ex[i] !== prev[i]) hot.push(i);
  const a = clamp(u / 0.6) * fade;
  /* jars */
  B.jars(180, 690, ex, a, { gap: 140, jw: 96, jh: 362, r: 8, pitch: 20, hot: k ? hot : [0] });
  txt(`N = ${cur.n.toLocaleString('en-US')}`, 180, 236, { size: 46, fam: F.disp, w: 700, c: C.now, a, ab: 1.5 });
  txt(k ? `step ${k} · rule ${cur.rule + 1} · × ${B.PROG[cur.rule][0]}/${B.PROG[cur.rule][1]}` : 'start · 2¹⁷', 180, 280, { size: 22, fam: F.mono, w: 700, c: C.white, a });
  /* the ledger */
  panel(1000, 180, 780, 660, a, C.cyan, 'P_Ω = [11/49, 7/25, 5/9, 3/4] · LEDGER · 账本');
  B.TRACE.forEach((s, i) => {
    if (i > k) return;
    const y = 238 + i * 33, now = i === k, e = B.exps(s.n);
    const c = now ? C.now : C.white, al = a * (now ? 1 : 0.62);
    txt(String(i).padStart(2, '0'), 1030, y, { size: 21, fam: F.mono, w: 700, c: C.dim, a: al });
    txt(i ? `${B.PROG[s.rule][0]}/${B.PROG[s.rule][1]}` : '—', 1090, y, { size: 21, fam: F.mono, w: 700, c, a: al });
    txt(s.n.toLocaleString('en-US'), 1340, y, { size: 21, fam: F.mono, w: 700, align: 'right', c, a: al });
    txt(`(${e.join(', ')})`, 1390, y, { size: 21, fam: F.mono, w: 700, c: now ? C.now : C.cyan, a: al });
  });
  const h = Q(S, 2, 'The machine halts', 0.5) * fade;
  txt('49, 25, 9, 4 ∤ 22  →  HALT', 1030, 238 + 16 * 33 + 4, { size: 24, fam: F.math, w: 700, c: C.now, a: h });
  stamp('FIRST HALT · STEP 15', 1390, 806, Q(S, 4, 'step fifteen', 0.4) * fade, C.lean, 22, -0.03);
  /* 17 = 16 + 1 */
  const s17 = Q(S, 3, 'Seventeen is sixteen', 0.6) * (1 - Q(S, 4, 'Lean', 0.5)) * fade;
  if (s17 > 0) {
    panel(150, 760, 780, 80, s17, C.now);
    txt('17 = 16 + 1  ·  2¹⁶ → 11¹,  2¹ stays  ·  22 = 2 · 11', 540, 810, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: s17 });
  }
  /* Lean */
  const l = Q(S, 4, 'checked every step', 0.5) * fade;
  if (l > 0) {
    panel(150, 760, 780, 80, l, C.lean);
    B.leanRef(170, 796, B.GID.halt, l, { maxW: 740, size: 24 });
    txt('strict axioms: []', 910, 796, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.lean, a: l * Q(S, 4, 'Zero axioms', 0.4) });
  }
};

SCENES.b06_order = S => {
  const B = B06, u = S.u, fade = clamp((S.d - u) / 0.5);
  SPINE.rail(S, 6, clamp(u / 0.5) * fade);
  badgeQ(S, [[0, null, 'computed'], [5, 'Lean checks', 'lean'], [5, 'A number remembers', 'argued']]);
  /* part 1: the blind spot of one number */
  const p1 = clamp(u / 0.6) * (1 - at(S, 2, 0.6)) * fade;
  if (p1 > 0) {
    txt('3 × 5  =  5 × 3  =  15', W / 2, 360, { size: 86, fam: F.math, w: 700, align: 'center', c: C.white, a: p1, ab: 2 });
    txt('one number keeps the count, loses the order · 一个数只记数量，不记先后', W / 2, 430, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: p1 * at(S, 0, 0.6, 0.6) });
    const s = Q(S, 1, 'Socks then shoes', 0.5);
    chip(640, 600, 520, 90, 'SOCKS → SHOES  ✓', C.cyan, p1 * s, 32);
    chip(1280, 600, 520, 90, 'SHOES → SOCKS  ✗', C.mag, p1 * Q(S, 1, 'is not shoes', 0.5), 32);
    txt('ANALOGY · 比方', W / 2, 700, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.argued, a: p1 * s, ls: 3 });
  }
  /* part 2: quaternions */
  const p2 = at(S, 2, 0.6) * fade;
  if (p2 <= 0) return;
  txt('X = 1 + 2i = (1, 2, 0, 0)     Y = 1 + 2j = (1, 0, 2, 0)     i² = j² = k² = ijk = −1', W / 2, 220, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: p2 });
  txt('the turns of Volume II enter the machine · 第二卷的转动进入机器', W / 2, 246, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: p2 * Q(S, 2, 'turns of Volume Two', 0.5) });
  const q3 = Q(S, 3, 'X times Y', 0.5) * fade;
  const cols = [[520, 'X · Y', B.XY, B.XYG, true, C.cyan], [1400, 'Y · X', B.YX, B.YXG, false, C.mag]];
  const g = Q(S, 4, 'One gate', 0.5) * fade, r1 = Q(S, 4, 'passes cleanly', 0.5) * fade, r2 = Q(S, 4, 'leaves remainders', 0.5) * fade;
  cols.forEach(([x, name, v, prod, ok, col]) => {
    panel(x - 380, 260, 760, 410, q3, col, `${name} · ${ok ? 'FIRST' : 'SECOND'}`);
    txt(`${name} = ${B.fmtQ(v)}`, x, 360, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: q3 });
    txt(`|${name}|² = ${v.map(t => t * t).join(' + ')} = ${B.nsq(v)}`, x, 412, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q3 * Q(S, 3, 'twenty-five', 0.5) });
    txt(`· (1, 0, −2, 0) = ${B.fmtQ(prod)}`, x, 500, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: g });
    txt(`mod 5 → ${B.fmtQ(prod.map(t => B.mod(t, 5)))}`, x, 556, { size: 28, fam: F.mono, w: 700, align: 'center', c: ok ? C.cyan : C.mag, a: ok ? r1 : r2 });
    if (ok) txt(`÷ 5 → ${B.fmtQ(prod.map(t => t / 5))} = X   PASS`, x, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: r1 });
    else txt('remainder ≠ 0 → BLOCKED', x, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: r2 });
  });
  chip(W / 2, 740, 640, 64, 'GATE · 闸门 · × (1, 0, −2, 0), then ÷ 5', C.now, g * (1 - Q(S, 5, 'Lean checks', 0.3)), 24, F.zh);
  /* Lean and the aphorism */
  const l = Q(S, 5, 'Lean checks', 0.5) * fade;
  if (l > 0) {
    fillBox(140, 690, 1640, 150, C.bg, l * 0.9);
    B.leanRef(170, 735, B.GID.order, l, { maxW: 1000, size: 22 });
    const m = Q(S, 5, 'A number remembers', 0.5) * fade;
    txt('a number remembers how much · a turn remembers when', W / 2, 800, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.argued, a: m });
    txt('数记得多少，转动记得先后', W / 2, 836, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: m * 0.9 });
  }
};

SCENES.b06_observer = S => {
  const B = B06, u = S.u, fade = clamp((S.d - u) / 0.5);
  SPINE.rail(S, 6, clamp(u / 0.5) * fade);
  badgeQ(S, [[0, null, 'argued']]);
  const a = clamp(u / 0.6) * fade;
  /* the observer: a closed boundary with no outside; its atlas grows inside */
  const cx = 560, cy = 500, R = 270, spin = S.u * 0.15;
  ctx.save(); ctx.setLineDash([12, 10]); ring(cx, cy, R, C.argued, a * 0.9, 3); ctx.restore();
  ring(cx, cy, R + 14, C.argued, a * 0.25, 1);
  txt('MODEL · 诠释', cx, cy - R - 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a, ls: 3 });
  const inside = at(S, 1, 0.8);
  txt('∂S = ∅ · no outside · 没有外部', cx, cy + R + 52, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * inside });
  /* The ledger and the comparison graph use the same beat data. */
  const shownAt = [Q(S, 3, 'Like a diary', 0.5), Q(S, 3, 'A first comparison', 0.5), Q(S, 3, 'closes a triangle', 0.5)];
  const cur = shownAt.reduce((k, v, i) => (v > 0 ? i : k), -1);
  const nodes = [[0, 0], [-120, -80], [110, -60]].map(([dx, dy]) =>
    [cx + dx * Math.cos(spin) - dy * Math.sin(spin) * 0.2, cy + dy]);
  let count = 1;
  B.OBS.forEach(({ comparisons }, i) => {
    if (!comparisons.length || shownAt[i] <= 0) return;
    count++;
    comparisons.forEach(([from, to]) => line(...nodes[from], ...nodes[to], C.argued, a * shownAt[i] * 0.65, 2));
  });
  nodes.slice(0, count).forEach(([x, y], i) => dot(x, y, 12, i === count - 1 && i > 0 ? 'g' : 'v', a));
  /* the eye turned around */
  const eye = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  txt('?', cx, cy + 30, { size: 140, fam: F.orb, w: 900, align: 'center', c: C.argued, a: eye * fade });
  /* the diary ledger */
  const d = Q(S, 2, 'Its time', 0.6) * fade;
  panel(1000, 210, 780, 560, d, C.argued, 'STRUCTURAL TIME · 结构时间 · τ');
  txt('Δτ = |x⊥|²/|x|² + Δb₁ · cycle rank / 环路秩', 1030, 290, { size: 18, fam: F.mono, w: 700, c: C.white, a: d });
  txt('a wall clock ticks anyway; τ does not · 钟总在走，τ 不', 1030, 326, { size: 20, fam: F.zh, w: 700, c: C.dim, a: d });
  const rows = ['repeat e₀ = (1,0,0,0)', 'add h₁ = (1,1,0,0) · tree edge', 'add h₂ = (1,0,1,0) · triangle'];
  B.OBS.forEach((s, i) => {
    const y = 410 + i * 110, now = i === cur;
    const al = d * shownAt[i];
    txt(`day ${i + 1} · ${rows[i]}`, 1030, y, { size: 22, fam: F.mono, w: 700, c: C.white, a: al });
    txt(s.d[0] > 0 ? '+ page' : 'no new page', 1750, y, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.argued, a: al });
    txt(`Δτ = ${B.fstr(s.di)} + ${s.deltaBetti} = ${B.fstr(s.d)}`, 1030, y + 40, { size: 26, fam: F.math, w: 700, c: C.argued, a: al });
    txt(`τ = ${B.fstr(s.tau)}`, 1750, y + 40, { size: 34, fam: F.orb, w: 900, align: 'right', c: now ? C.now : C.white, a: al });
  });
  const w = Q(S, 4, 'interpretation', 0.5) * fade;
  txt('interpretation · numbers hand-computed in the model · 诠释，数为模型内手算', 1390, 740, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: w });
};

SCENES.b06_kernel = S => {
  const B = B06, u = S.u, fade = clamp((S.d - u) / 0.5);
  SPINE.rail(S, 6, clamp(u / 0.5) * fade);
  /* lines 0–1 state source facts: no badge; LEAN from 'Axiom list', ARGUED for the closing aphorism */
  const bl = Q(S, 2, 'Axiom list', 0.5), ba = Q(S, 4, 'Proof inside', 0.5), bf = clamp((S.d - S.u) / 0.5);
  badge(bl * (1 - ba) * bf, 'lean');
  badge(ba * bf, 'argued');
  const a = clamp(u / 0.6) * fade;
  /* the core */
  panel(140, 190, 820, 630, a, C.cyan, 'CORE · OmegaInit + OmegaMath · 核心');
  txt('LEAN KERNEL · checks every step · 逐步检查', 170, 262, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6) });
  const imp = Q(S, 1, 'skips official Init', 0.5);
  txt('module  ·  prelude', 170, 312, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a * Q(S, 1, 'The strict library', 0.5) });
  txt('import Init', 470, 312, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a * imp });
  line(462, 304, 640, 304, C.mag, a * imp, 3);
  txt('selected closures replay · 重放选定闭包', 170, 350, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'The strict library', 0.5) });
  /* the circle */
  const c = at(S, 2, 0.6) * fade, ox = 360, oy = 560, R = 150;
  if (c > 0) {
    ring(ox, oy, R, C.cyan, c, 2.5);
    line(ox - R - 20, oy, ox + R + 20, oy, C.dim, c * 0.6, 1);
    line(ox, oy - R - 20, ox, oy + R + 20, C.dim, c * 0.6, 1);
    const px = ox + R * 3 / 5, py = oy - R * 4 / 5;
    line(ox, oy, px, py, C.cyan, c, 2);
    dot(px, py, 11, 'g', c);
    txt('(3/5, 4/5)', px + 8, py - 40, { size: 24, fam: F.math, w: 700, c: C.now, a: c });
    txt('x = (q² − p²) / (p² + q²)', 560, 430, { size: 22, fam: F.math, w: 700, c: C.white, a: c });
    txt('y = 2pq / (p² + q²)', 560, 466, { size: 22, fam: F.math, w: 700, c: C.white, a: c });
    txt('p = 1, q = 2', 560, 508, { size: 22, fam: F.mono, w: 700, c: C.now, a: c });
    txt('9/25 + 16/25 = 1', 560, 554, { size: 26, fam: F.math, w: 700, c: C.cyan, a: c * Q(S, 2, 'lands exactly', 0.5) });
    txt('every (p, q) ≠ (0, 0)', 560, 596, { size: 20, fam: F.mono, w: 700, c: C.white, a: c * Q(S, 2, 'lands exactly', 0.5) });
    const l = Q(S, 2, 'Axiom list', 0.5) * fade;
    txt('strict axioms: [] · 严格端', 560, 660, { size: 34, fam: F.orb, w: 900, c: C.lean, a: l, ab: 1 });
    B.leanRef(170, 778, B.GID.circle, l, { maxW: 770, size: 20 });
  }
  /* the bridge and the shadow */
  const b = Q(S, 3, 'one-way bridge', 0.6) * fade;
  if (b > 0) {
    arrow(975, 500, 1085, 500, C.now, b, 4);
    txt('Π', 1024, 480, { size: 28, fam: F.math, w: 700, align: 'center', c: C.now, a: b });
    txt('ℝ', 1044, 488, { size: 17, fam: F.math, w: 700, align: 'center', c: C.now, a: b });
    const back = Q(S, 4, 'nothing ever flows back', 0.5);
    dashed(1085, 560, 985, 560, C.mag, b * back, 2.5);
    txt('✗', 1035, 572, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.mag, a: b * back });
    panel(1100, 190, 680, 630, b, C.dim, 'SHADOW · Mathlib ℝ · 影子');
    const sx = 1300, sy = 560, sr = 150, sc = Q(S, 3, 'same circle reappears', 0.6);
    ring(sx, sy, sr, mix(C.white, C.bg, 0.45), b * sc, 2.5);
    dot(sx + sr * 3 / 5, sy - sr * 4 / 5, 10, 'w', b * sc * 0.8);
    txt('x² + y² = 1 in ℝ', 1480, 470, { size: 24, fam: F.math, w: 700, c: C.white, a: b * sc });
    const pr = Q(S, 4, 'classical axioms', 0.5) * fade;
    txt('classical axioms', 1480, 530, { size: 24, fam: F.mono, w: 700, c: C.white, a: pr });
    txt('(Mathlib)', 1480, 566, { size: 20, fam: F.mono, w: 700, c: C.dim, a: pr });
    B.leanRef(1120, 778, B.GID.shadow, pr, { maxW: 640, size: 20 });
  }
  /* aphorism */
  const m = Q(S, 4, 'Proof inside', 0.5) * fade;
  if (m > 0) {
    box(1466, 608, 290, 128, C.argued, m, 1.5, 'rgba(0,0,0,0.4)');
    txt('proof inside,', 1486, 646, { size: 26, fam: F.disp, w: 700, c: C.argued, a: m });
    txt('shadow outside', 1486, 680, { size: 26, fam: F.disp, w: 700, c: C.argued, a: m });
    txt('证明在里，影子在外', 1486, 718, { size: 22, fam: F.zh, w: 700, c: C.argued, a: m * 0.9 });
  }
};

SCENES.b06_ask = S => {
  const u = S.u;
  SPINE.rail(S, 6, clamp(u / 0.5));
  const a = clamp(u / 0.6);
  const cards = [
    [480, 'MACHINE · 机器', '[11/49, 7/25, 5/9, 3/4]', C.lean, 'LEAN ✓ halts at 22'],
    [960, 'OBSERVER · 观察者', 'τ : 0 → 1/2 → 2', C.argued, 'MODEL · interpretation'],
    [1440, 'JUDGE · 裁判', 'strict axioms: []', C.lean, 'LEAN ✓ core circle']
  ];
  cards.forEach(([x, t, body, col, foot], i) => {
    const p = a * clamp((u - 0.25 * i) / 0.6);
    panel(x - 210, 230, 420, 340, p, col, t);
    txt(body, x, 420, { size: i === 0 ? 26 : 32, fam: F.math, w: 700, align: 'center', c: C.white, a: p });
    txt(foot, x, 520, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: p });
  });
  txt('one-way bridge → ℝ · 单向桥', 1440, 610, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 0, 0.6, 1.4) });
  SPINE.ask(S, 1, 'So what, in the end, did the kernel check?', '说到底，内核查过了什么？');
};

/* ---- b07 · What the kernel checked · 内核查过的账 ---- */
/* Act b07 · Coda · What the kernel checked · 内核查过的账 (film one-axiom-no-infinity, book omega-math).
   The act walks the position rail once more as an audit ledger: one line per rung, each landing on a zero-axiom
   theorem frozen at the pinned trureturing commit with empty strict_omega.axioms, then adds up the
   D5 registry shown in Appendix A and keeps purple and red apart from green.
   Every number on screen is computed below in B07 and re-checked independently in FILM.init:
     κ(p, q) = q² / (p² + q²) (OmegaMath.Projective), Cayley point ((q² − p²), 2pq) / (p² + q²),
     the 3D Cayley matrix of s = (1, 0, 0) / 2 (cayleyNum, OmegaMath.Geometry.Cayley3D.Matrix),
     second-order jets mod η³, Haar κ-moments C_k / 4^k with χ₁ = 4κ − 1,
     Euclid's escape for the primes 2 … 13, and the FRACTRAN program P_Ω = (11/49, 7/25, 5/9, 3/4) from 2¹⁷. */
const B07 = (() => {
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const red = (n, d) => { const g = gcd(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
  const fr = (n, d) => { const r = red(n, d); return r[1] === 1 ? `${r[0]}`.replace('-', '−') : `${r[0]}/${r[1]}`.replace('-', '−'); };
  /* projective line: κ(p, q) = q²/(p²+q²), spread = p²/(p²+q²), Cayley point */
  const kappa = (p, q) => [q * q, p * p + q * q];
  const spread = (p, q) => [p * p, p * p + q * q];
  const cayley = (p, q) => [[q * q - p * p, p * p + q * q], [2 * p * q, p * p + q * q]];
  /* 3D Cayley matrix numerator for s = (x, y, z) / d, over d² + x² + y² + z² */
  function cayleyNum(d, x, y, z) {
    const b = d * d - (x * x + y * y + z * z);
    return { m: [[b + 2 * x * x, 2 * (x * y - d * z), 2 * (x * z + d * y)],
      [2 * (y * x + d * z), b + 2 * y * y, 2 * (y * z - d * x)],
      [2 * (z * x - d * y), 2 * (z * y + d * x), b + 2 * z * z]], den: d * d + x * x + y * y + z * z };
  }
  const CAY = cayleyNum(2, 1, 0, 0);
  /* second-order jets a0 + a1 η + a2 η² with η³ = 0 (integers suffice for the checks) */
  const jmul = (f, g) => [f[0] * g[0], f[0] * g[1] + f[1] * g[0], f[0] * g[2] + f[1] * g[1] + f[2] * g[0]];
  const jcompose = (g, f) => { const f2 = jmul(f, f); return [g[0] + g[1] * f[0] + g[2] * f2[0], g[1] * f[1] + g[2] * f2[1], g[1] * f[2] + g[2] * f2[2]]; };
  /* Haar κ-moments on the three-sphere: E[κ^k] = (2k)! / (4^k k! (k+1)!) = C_k / 4^k, no π */
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const moment = k => [fact(2 * k), Math.pow(4, k) * fact(k) * fact(k + 1)];
  function haar(poly) {  // poly = integer coefficients in κ, ascending; returns an exact fraction [n, d]
    let n = 0, d = 1;
    poly.forEach((c, k) => { const m = moment(k); n = n * m[1] + c * m[0] * d; d = d * m[1]; const r = red(n, d); n = r[0]; d = r[1]; });
    return [n, d];
  }
  const pmul = (a, b) => { const r = new Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
  const CHI0 = [1], CHI1 = [-1, 4];
  /* Euclid's escape for the first six primes */
  const PR = [2, 3, 5, 7, 11, 13];
  const PROD = PR.reduce((x, y) => x * y, 1), EUC = PROD + 1;
  function factor(n) { const f = []; for (let p = 2; p * p <= n; p++) while (n % p === 0) { f.push(p); n /= p; } if (n > 1) f.push(n); return f; }
  const isPrime = n => n > 1 && factor(n).length === 1;
  const EUCF = factor(EUC);
  /* P_Ω: FRACTRAN with the reduced rules in priority order, from 2^17 */
  const RULES = [[11, 49], [7, 25], [5, 9], [3, 4]];
  function step(n) { for (const [a, b] of RULES) if (n % b === 0) return n / b * a; return null; }
  function runP(n0) { const tr = [n0]; let n = n0; for (let s = step(n); s !== null; s = step(n)) { n = s; tr.push(n); if (tr.length > 100) break; } return tr; }
  const TRACE = runP(131072);
  /* the zero-axiom D5 modules at the pinned commit (D5/S3/Quantum/AURICOmega/…), theorem counts from the lock */
  const MODS = [['ProjectiveOverlapScaling', 1], ['OmegaCircleClosure', 5], ['OmegaTernionHeap', 9], ['OmegaCayleyRotation', 8],
    ['OmegaJetCalculus', 17], ['OmegaSimplicialExactness', 8], ['OmegaQuadraticAndSchur', 10], ['OmegaChebyshevHecke', 13],
    ['OmegaArithmeticHorizon', 6], ['OmegaBargmannHaarHecke', 9], ['OmegaMatrixAndFractran', 10], ['OmegaComposeAndWitnesses', 8],
    ['OmegaSphericalHaarMidpoint', 8], ['OmegaLieTripleAndFreeGroup', 15]];
  const BRIDGE = 11;
  const G = 'D5/S3/Quantum/AURICOmega/';
  /* the ledger: one row per rung of the rail; cites = film.json GIDs; cell = [module index, slot] in the wall */
  const ROWS = [
    { f: 'no infinity, no extra axioms', cites: [], cells: [], kind: 'argued' },
    { f: 'κ(kp, kq) = κ(p, q) · [p : 0] ↦ (−1, 0)', sz: 22, cites: [G + 'ProjectiveOverlapScaling.kappa_scale', G + 'OmegaCircleClosure.cayley_antipodal_closure'], cells: [[0, 0], [1, 3]] },
    { f: 'C(s)ᵀ C(s) = I,  s ∈ ℚ³', cites: [G + 'OmegaCayleyRotation.cayley_orthogonal'], cells: [[3, 1]] },
    { f: 'η³ = 0  ·  (g∘f)₁ = g₁ f₁', cites: [G + 'OmegaJetCalculus.var_cube', G + 'OmegaJetCalculus.chain_rule'], cells: [[4, 0], [4, 2]] },
    { f: '⟨χₘ, χₙ⟩ = δₘₙ, even χ, all m, n', cites: [G + 'OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal'], cells: [[12, 2]] },
    { f: '∏s > 0 ⇒ ∃ prime p ∣ ∏s + 1, p ∉ s', sz: 23, cites: [G + 'OmegaArithmeticHorizon.euclid_prime_escape'], cells: [[8, 1]] },
    { f: 'P_Ω: 2¹⁷ → 22, halts at step 15', cites: [G + 'OmegaComposeAndWitnesses.p_omega_halts_at_22'], cells: [[11, 7]] },
    { f: 'D5 · strict axiom records', cites: [], cells: [], kind: 'num' }
  ];
  const short = g => g.slice(g.lastIndexOf('.') + 1);
  const LX = 130, LW = 900, LY = 212, LH = 68, LG = 8, RX = 1070, RW = 730;
  const rowY = i => LY + i * (LH + LG);
  /* one ledger row: a alpha, st stamp progress (null = no stamp column), cur amber focus, o.kind 'lean' | 'num' */
  function row(i, a, st, cur, o = {}) {
    if (a <= 0.003) return;
    const y = rowY(i), p = SPINE.PARTS[i];
    box(LX, y, LW, LH, cur > 0.01 ? mix(C.cyan, C.now, cur) : C.cyan, a * (0.35 + 0.6 * cur), 1.2 + 1.3 * cur, cur > 0.01 ? rgba(C.now, 0.08 * cur) : 'rgba(4,10,24,0.55)');
    txt(p.tag, LX + 18, y + 30, { size: 17, fam: F.mono, w: 700, c: cur > 0.5 ? C.now : C.cyan, a, ls: 2 });
    txt(p.key_en, LX + 18, y + 54, { size: 14, fam: F.mono, c: C.dim, a: a * 0.95 });
    if (o.formula !== false) {
      txt(ROWS[i].f, LX + 270, y + 34, { size: ROWS[i].sz || 25, fam: F.math, w: 700, c: cur > 0.5 ? C.now : C.white, a: a * (o.fa == null ? 1 : o.fa) });
      const names = ROWS[i].cites.map(short).join(' · ');
      if (names) txt(names, LX + LW - 160, y + 58, { size: 13, fam: F.mono, align: 'right', c: C.lean, a: a * 0.8 * (o.fa == null ? 1 : o.fa) * clamp(st || 0) });
    }
    const sx = LX + LW - 78, sy = y + LH / 2;
    if (st == null) return;
    if (st <= 0) { ctx.save(); ctx.setLineDash([6, 6]); box(sx - 58, sy - 18, 116, 36, C.dim, a * 0.5, 1); ctx.restore(); return; }
    const kind = ROWS[i].kind || 'lean', K = { lean: ['LEAN ✓', C.lean], num: ['NUM', C.cyan], argued: ['ARGUED', C.argued] }[kind];
    seal(K[0], sx, sy, st * a, K[1], 19, 116);
  }
  /* a rubber seal in the data font (the check mark stays a check mark): slams in as p goes 0 → 1 */
  function seal(s, x, y, p, col, size = 20, w = null) {
    if (p <= 0.003) return;
    const k = 1 + 1.2 * (1 - eo(p)), a = clamp(p * 3), bw = w || tw(s, size, F.mono, 700, 2) + 40, bh = size * 1.9;
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.04); ctx.scale(k, k);
    box(-bw / 2, -bh / 2, bw, bh, col, a, 2.2, rgba(col, 0.12));
    txt(s, 0, size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a, ls: 2 });
    ctx.restore();
  }
  function numFoot(X, Y, Wd, a, s = 'NUM · computed on screen · 屏幕计算') {
    txt(s, X + Wd / 2, Y + 572, { size: 15, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * 0.8, ls: 1 });
  }
  function ledgerHead(a, title) {
    if (a <= 0.003) return;
    txt(title, LX, LY - 16, { size: 16, fam: F.mono, w: 700, c: C.cyan, a, ls: 3 });
  }
  return { fr, red, kappa, spread, cayley, cayleyNum, CAY, jmul, jcompose, moment, haar, pmul, CHI0, CHI1, PR, PROD, EUC, EUCF, factor, isPrime,
    RULES, step, TRACE, MODS, BRIDGE, ROWS, short, LX, LW, LY, LH, RX, RW, rowY, row, seal, numFoot, ledgerHead };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS, eq = (a, b) => a[0] * b[1] === a[1] * b[0];
  /* projective line */
  if (!eq(B07.kappa(2, 3), [9, 13]) || !eq(B07.kappa(4, 6), [9, 13]) || B07.fr(...B07.kappa(4, 6)) !== '9/13') E.push('b07: kappa example');
  for (let p = 1; p < 9; p++) for (let q = 0; q < 9; q++) for (let k = 1; k < 5; k++) if (!eq(B07.kappa(k * p, k * q), B07.kappa(p, q))) E.push('b07: kappa scaling');
  for (let p = 1; p < 6; p++) {
    const c = B07.cayley(p, 0);
    if (!eq(c[0], [-1, 1]) || !eq(c[1], [0, 1]) || !eq(B07.kappa(p, 0), [0, 1]) || !eq(B07.spread(p, 0), [1, 1])) E.push('b07: antipodal closure');
  }
  const c12 = B07.cayley(1, 2);
  if (B07.fr(...c12[0]) !== '3/5' || B07.fr(...c12[1]) !== '4/5') E.push('b07: cayley point [1:2]');
  /* 3D Cayley matrix: transpose times itself is den² · I, and the shown entries */
  const M = B07.CAY.m, D = B07.CAY.den;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    let s = 0; for (let k = 0; k < 3; k++) s += M[k][i] * M[k][j];
    if (s !== (i === j ? D * D : 0)) E.push('b07: cayley orthogonal');
  }
  if (D !== 5 || M.map(r => r.join(',')).join(';') !== '5,0,0;0,3,-4;0,4,3') E.push('b07: cayley matrix entries');
  /* jets: η³ = 0, and the chain rule against direct substitution, independently: compose via polynomial truncation */
  const eta = [0, 1, 0];
  if (B07.jmul(B07.jmul(eta, eta), eta).some(v => v !== 0)) E.push('b07: eta cubed');
  for (let g0 = -2; g0 <= 2; g0++) for (let g1 = -2; g1 <= 2; g1++) for (let g2 = -2; g2 <= 2; g2++) for (let f1 = -2; f1 <= 2; f1++) for (let f2 = -2; f2 <= 2; f2++) {
    const h = B07.jcompose([g0, g1, g2], [0, f1, f2]);
    let full = [g0, 0, 0, 0, 0]; const f = [0, f1, f2];   // g(f) as a full polynomial, truncated after
    const ff = [0, 0, f1 * f1, 2 * f1 * f2, f2 * f2];
    for (let i = 0; i < 3; i++) full[i] += g1 * f[i];
    for (let i = 0; i < 5; i++) full[i] += g2 * ff[i];
    if (h[0] !== full[0] || h[1] !== full[1] || h[2] !== full[2] || h[1] !== g1 * f1 || h[2] !== g2 * f1 * f1 + g1 * f2) E.push('b07: chain rule');
  }
  /* Haar: moments 1/4, 1/8, 5/64 (Catalan / 4^k), and ⟨χ0,χ0⟩ = 1, ⟨χ0,χ1⟩ = 0, ⟨χ1,χ1⟩ = 1 */
  const cat = k => { let c = 1; for (let i = 0; i < k; i++) c = c * 2 * (2 * i + 1) / (i + 2); return c; };
  for (let k = 0; k < 6; k++) if (!eq(B07.moment(k), [cat(k), Math.pow(4, k)])) E.push('b07: haar moment ' + k);
  const h00 = B07.haar(B07.pmul(B07.CHI0, B07.CHI0)), h01 = B07.haar(B07.pmul(B07.CHI0, B07.CHI1)), h11 = B07.haar(B07.pmul(B07.CHI1, B07.CHI1));
  if (!eq(h00, [1, 1]) || !eq(h01, [0, 1]) || !eq(h11, [1, 1])) E.push('b07: haar orthonormal');
  /* Euclid */
  if (B07.PROD !== 30030 || B07.EUC !== 30031 || B07.EUCF.join('×') !== '59×509' || !B07.isPrime(59) || !B07.isPrime(509) || B07.PR.includes(59)) E.push('b07: euclid escape');
  /* P_Ω: the trace stated in OmegaMath.Witnesses.FlagshipWitnesses */
  const T = [131072, 98304, 73728, 40960, 30720, 23040, 12800, 3584, 2688, 2016, 1120, 840, 630, 350, 98, 22];
  if (B07.TRACE.join(',') !== T.join(',') || B07.step(22) !== null || B07.TRACE.length - 1 !== 15 || 131072 !== Math.pow(2, 17)) E.push('b07: P_Omega trace');
  /* the tally: 14 modules, 127 theorems; every cited GID is in film.json and inside the wall */
  const tot = B07.MODS.reduce((s, m) => s + m[1], 0);
  if (B07.MODS.length !== 14 || tot !== 127) E.push('b07: module tally');
  const cited = B07.ROWS.flatMap(r => r.cites);
  if (cited.length !== 8) E.push('b07: eight cited lines');
  cited.forEach(g => { if (!leanCite(g)) E.push('b07: not in film.json lean: ' + g); });
  B07.ROWS.forEach(r => r.cells.forEach(([m, k], j) => { if (k >= B07.MODS[m][1] || !r.cites[j].includes(B07.MODS[m][0] + '.')) E.push('b07: wall cell ' + r.cites[j]); }));
});
FILM.init.push(() => { Object.assign(FILM.speed, { b07_title: 0.02, b07_rows_a: 0.014, b07_rows_b: 0.014, b07_tally: 0.02, b07_honest: 0.01, b07_close: 0.008 }); });

SCENES.b07_title = S => {
  SPINE.title(S, 7, '内核查过的账', 'What the kernel checked');
  SPINE.rail(S, 7, at(S, 0, 0.6));
  const a = at(S, 0, 0.8, 0.2);
  if (a <= 0.003) return;
  if (S.u > lineAt(S, 1).s) badgeQ(S, [[1, null, 'argued']]);
  /* the audit ledger, empty: one row per rung of the rail */
  B07.ledgerHead(a, 'AUDIT LEDGER · 审计账本');
  chip(B07.LX + B07.LW - 120, B07.LY - 22, 220, 30, 'ANALOGY · 比方', C.argued, at(S, 1, 0.6) * a, 15);
  for (let i = 0; i < 8; i++) B07.row(i, a * clamp((S.u - lineAt(S, 0).s - 0.2 - i * 0.12) / 0.4), 0, 0, { formula: false });
  /* the three stamps: who vouches */
  const ra = at(S, 1, 0.8, 0.6);
  panel(B07.RX, 220, B07.RW, 560, ra, C.cyan, 'WHO VOUCHES · 由谁担保');
  const L = [['Green', C.lean, 'LEAN ✓', 'the Lean kernel checked it', 'Lean 内核查过'],
    ['Purple', C.argued, 'ARGUED', 'our reading, a model', '我们的解读与模型'],
    ['Red', C.open, 'OPEN', 'nobody knows yet', '至今没人知道']];
  L.forEach(([ph, col, s, en, zh], j) => {
    const p = Q(S, 2, ph, 0.5), y = 340 + j * 150;
    B07.seal(s, B07.RX + 170, y, p * ra, col, 26, 200);
    txt(en, B07.RX + 330, y - 4, { size: 26, fam: F.disp, w: 700, c: col, a: ra * clamp(p * 2) });
    txt(zh, B07.RX + 330, y + 34, { size: 24, fam: F.zh, w: 700, c: C.white, a: ra * clamp(p * 2) * 0.9 });
  });
};

SCENES.b07_rows_a = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [1, 'lands at minus one', 'lean'], [2, null, 'computed'], [2, 'exactly its inverse', 'lean'], [3, null, 'lean']]);
  const fin = clamp((S.d - S.u) / 0.5);
  B07.ledgerHead(1, 'AUDIT LEDGER · 审计账本');
  const stampAt = ['Only a promise', 'lands at minus one', 'exactly its inverse', 'two lines of fractions'];
  let cur = -1;
  for (let k = 0; k < 4; k++) if (S.u >= lineAt(S, k).s - 0.2) cur = k;
  for (let i = 0; i < 8; i++) {
    const on = i < 4, st = on ? Q(S, i, stampAt[i], 0.5) : 0;
    const c = i === cur ? clamp((S.u - lineAt(S, i).s + 0.2) / 0.4) * (i === 3 ? fin : 1) * (i < 3 ? 1 - at(S, i + 1, 0.4, -0.2) : 1) : 0;
    B07.row(i, on ? 1 : 0.5, st, c, { fa: on ? at(S, i, 0.5) : 0 });
  }
  /* the worked example for the row being read */
  const X = B07.RX, Y = 212, Wd = B07.RW, Hh = 590;
  const ea = k => at(S, k, 0.5) * (k < 3 ? 1 - at(S, k + 1, 0.3, -0.25) : fin);
  /* prelude: only a promise, audited at the coda line */
  let a = ea(0);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.argued, 'PRELUDE · A PROMISE · 一句承诺');
    const k1 = Q(S, 0, 'no infinity', 0.5), k2 = Q(S, 0, 'no extra axioms', 0.5), k3 = Q(S, 0, 'No green stamp yet', 0.5);
    txt('no infinity', X + Wd / 2, Y + 150, { size: 44, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * k1 });
    txt('没有无穷', X + Wd / 2, Y + 200, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * k1 * 0.85 });
    txt('no extra axioms', X + Wd / 2, Y + 290, { size: 44, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * k2 });
    txt('不加公理', X + Wd / 2, Y + 340, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * k2 * 0.85 });
    txt('no green stamp yet: audited at the CODA line', X + Wd / 2, Y + 450, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a: a * k3 });
    txt('先不盖绿章：到终章那一行对账', X + Wd / 2, Y + 488, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * k3 * 0.85 });
    B07.numFoot(X, Y, Wd, a * k3, 'ARGUED · a stance, not a theorem · 立场，不是定理');
  }
  /* volume one: a ratio is a pair, and [1:0] lands at −1 */
  a = ea(1);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.cyan, 'VOLUME I · NUMBERS WITHOUT AN ORIGIN · 没有原点的数');
    const k1 = Q(S, 1, 'Two to three', 0.5), k2 = Q(S, 1, 'four to six', 0.5);
    txt('κ(p, q) = q² / (p² + q²)', X + 40, Y + 85, { size: 24, fam: F.math, w: 700, c: C.cyan, a });
    txt('κ(2, 3) = 9/13', X + 40, Y + 130, { size: 26, fam: F.math, w: 700, c: C.white, a: a * k1 });
    txt('κ(4, 6) = 36/52 = 9/13', X + 330, Y + 130, { size: 26, fam: F.math, w: 700, c: C.white, a: a * k2 });
    const cx = X + 200, cy = Y + 340, R = 140;
    ring(cx, cy, R, C.cyan, a * 0.85, 2.5);
    line(cx - R - 24, cy, cx + R + 24, cy, C.dim, a * 0.5, 1); line(cx, cy - R - 24, cx, cy + R + 24, C.dim, a * 0.5, 1);
    const pa = Q(S, 1, 'lands at minus one', 0.5);
    dot(cx - R, cy, 13, 'g', a * pa); ring(cx - R, cy, 22, C.now, a * pa, 2);
    txt('[1 : 0] → (−1, 0)', cx, cy + R + 48, { size: 22, fam: F.math, w: 700, align: 'center', c: C.now, a: a * pa });
    const tx = X + 400;
    txt('x = (q² − p²) / (p² + q²)', tx, Y + 250, { size: 20, fam: F.math, w: 700, c: C.white, a });
    txt('y = 2pq / (p² + q²)', tx, Y + 285, { size: 20, fam: F.math, w: 700, c: C.white, a });
    txt('p = 1, q = 0:', tx, Y + 350, { size: 20, fam: F.math, w: 700, c: C.now, a: a * pa });
    txt('x = −1, y = 0', tx, Y + 385, { size: 20, fam: F.math, w: 700, c: C.now, a: a * pa });
    txt('κ = 0, spread = 1', tx, Y + 420, { size: 20, fam: F.math, w: 700, c: C.now, a: a * pa });
    txt('no ∞ symbol needed · 不必另贴 ∞', tx, Y + 480, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: a * pa });
    B07.numFoot(X, Y, Wd, a);
  }
  /* volume two: the Cayley matrix of s = (1/2, 0, 0) */
  a = ea(2);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.cyan, 'VOLUME II · A RATIONAL ROTATION · 有理旋转');
    txt('s = (1/2, 0, 0)', X + Wd / 2, Y + 100, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    const M = B07.CAY.m, D = B07.CAY.den, x0 = X + 200, y0 = Y + 170, cw = 120, rh = 70;
    txt('C(s) =', x0 - 30, y0 + 115, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white, a });
    line(x0, y0, x0, y0 + 3 * rh + 10, C.white, a, 2); line(x0 + 3 * cw + 10, y0, x0 + 3 * cw + 10, y0 + 3 * rh + 10, C.white, a, 2);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const v = B07.fr(M[i][j], D), hot = i > 0 && j > 0;
      txt(v, x0 + cw * j + cw / 2 + 5, y0 + rh * i + 52, { size: 32, fam: F.math, w: 700, align: 'center', c: hot ? C.now : C.white, a });
    }
    const pa = Q(S, 2, 'exactly its inverse', 0.5);
    txt('(3/5)² + (4/5)² = 9/25 + 16/25 = 1', X + Wd / 2, Y + 460, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: a * pa });
    txt('C(s)ᵀ C(s) = I   · no π, no sin', X + Wd / 2, Y + 520, { size: 28, fam: F.math, w: 700, align: 'center', c: C.now, a: a * pa });
    B07.numFoot(X, Y, Wd, a);
  }
  /* volume three: jets */
  a = ea(3);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.cyan, 'VOLUME III · CALCULUS ON A JET · 射流上的微积分');
    txt('f = f₀ + f₁ η + f₂ η²,   η³ = 0', X + Wd / 2, Y + 110, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    const pa = Q(S, 3, 'two lines of fractions', 0.5);
    txt('if f₀ = 0:', X + 80, Y + 220, { size: 26, fam: F.math, w: 700, c: C.dim, a: a * pa });
    txt('(g∘f)₁ = g₁ · f₁', X + 80, Y + 290, { size: 36, fam: F.math, w: 700, c: C.now, a: a * pa });
    txt('(g∘f)₂ = g₂ · f₁² + g₁ · f₂', X + 80, Y + 360, { size: 36, fam: F.math, w: 700, c: C.now, a: a * pa });
    const la = Q(S, 3, 'No limit', 0.5);
    txt('lim h→0', X + Wd / 2, Y + 480, { size: 36, fam: F.math, w: 700, align: 'center', c: C.dim, a: a * la });
    line(X + Wd / 2 - 90, Y + 468, X + Wd / 2 + 90, Y + 468, C.dim, a * la, 3);
    txt('never taken · 从未取过', X + Wd / 2, Y + 535, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * la });
  }
};

SCENES.b07_rows_b = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'computed'], [0, 'orthonormal in every degree', 'lean'], [1, null, 'computed'], [1, 'not on the list', 'lean'], [2, null, 'computed'], [2, 'never sooner', 'lean']]);
  const fin = clamp((S.d - S.u) / 0.5);
  B07.ledgerHead(1, 'AUDIT LEDGER · 审计账本');
  const stampAt = ['orthonormal in every degree', 'not on the list', 'never sooner'];
  let cur = -1;
  for (let k = 0; k < 3; k++) if (S.u >= lineAt(S, k).s - 0.2) cur = k + 4;
  for (let i = 0; i < 8; i++) {
    const k = i - 4, live = k >= 0 && k < 3;
    const st = i < 4 ? 1 : live ? Q(S, k, stampAt[k], 0.5) : 0;
    const c = i === cur ? clamp((S.u - lineAt(S, k).s + 0.2) / 0.4) * (k === 2 ? fin : 1) * (k < 2 ? 1 - at(S, k + 1, 0.4, -0.2) : 1) : 0;
    B07.row(i, i < 7 ? 1 : 0.5, st, c, { fa: i < 4 ? 1 : live ? at(S, k, 0.5) : 0 });
  }
  const X = B07.RX, Y = 212, Wd = B07.RW, Hh = 590;
  const ea = k => at(S, k, 0.5) * (k < 2 ? 1 - at(S, k + 1, 0.3, -0.25) : fin);
  /* volume four: π-free Haar on the three-sphere */
  let a = ea(0);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.cyan, 'VOLUME IV · AN AVERAGE WITHOUT π · 不用 π 的平均');
    txt('E[κᵏ] = Cₖ / 4ᵏ :   1,  1/4,  1/8,  5/64, …', X + Wd / 2, Y + 110, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    txt('even characters:  χ₀ = 1,   χ₁ = 4κ − 1', X + Wd / 2, Y + 200, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a });
    const pa = Q(S, 0, 'with no pi', 0.5), pb = Q(S, 0, 'orthonormal in every degree', 0.5);
    txt('⟨χ₀, χ₁⟩ = 4 · 1/4 − 1 = 0', X + Wd / 2, Y + 300, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: a * pa });
    txt('⟨χ₁, χ₁⟩ = 16 · 1/8 − 8 · 1/4 + 1 = 1', X + Wd / 2, Y + 370, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: a * pa });
    txt('⟨χₘ, χₙ⟩ = δₘₙ  (even χ)', X + Wd / 2, Y + 470, { size: 46, fam: F.math, w: 900, align: 'center', c: C.now, a: a * pb, ab: 1.5 });
    B07.numFoot(X, Y, Wd, a, 'NUM · two cases computed on screen · 屏幕上只算两例');
  }
  /* volume five: Euclid's escape */
  a = ea(1);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.cyan, 'VOLUME V · A PRIME ESCAPES · 素数逃逸');
    const P = B07.PR, pa = Q(S, 1, 'add one', 0.5), pb = Q(S, 1, 'fifty-nine', 0.5);
    P.forEach((p, j) => chip(X + 115 + j * 100, Y + 110, 76, 50, String(p), C.cyan, a, 26));
    txt(`${P.join(' · ')} = ${B07.PROD}`, X + Wd / 2, Y + 220, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a });
    txt(`${B07.PROD} + 1 = ${B07.EUC}`, X + Wd / 2, Y + 300, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: a * pa });
    txt(`= ${B07.EUCF[0]} × ${B07.EUCF[1]}`, X + Wd / 2, Y + 380, { size: 40, fam: F.math, w: 900, align: 'center', c: C.white, a: a * pb });
    chip(X + Wd / 2 - 82, Y + 470, 110, 60, String(B07.EUCF[0]), C.now, a * pb, 34);
    txt('not on the list · 不在名单上', X + Wd / 2 + 10, Y + 482, { size: 22, fam: F.zh, w: 700, c: C.now, a: a * pb });
    B07.numFoot(X, Y, Wd, a);
    txt('every finite list of primes misses one; no infinite set needed', X + Wd / 2, Y + 535, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * pb * 0.8 });
  }
  /* volume six: the P_Ω machine */
  a = ea(2);
  if (a > 0.003) {
    panel(X, Y, Wd, Hh, a, C.cyan, 'VOLUME VI · A MACHINE THAT STOPS · 会停的机器');
    txt('P_Ω = ( 11/49,  7/25,  5/9,  3/4 )', X + Wd / 2, Y + 100, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    txt('multiply by the first fraction that keeps an integer', X + Wd / 2, Y + 140, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
    const T = B07.TRACE, L = lineAt(S, 2), n = Math.floor(clamp((S.u - L.s - 0.3) / Math.max(1, (L.e - L.s) * 0.8)) * (T.length - 1));
    for (let j = 0; j < T.length; j++) {
      const r = Math.floor(j / 4), c = j % 4, x = X + 110 + c * 172, y = Y + 225 + r * 72;
      const on = j <= n, last = j === T.length - 1;
      txt(j === 0 ? 'start · 2¹⁷' : '#' + j, x + 40, y - 30, { size: 13, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * (on ? 0.9 : 0.25) });
      txt(String(T[j]), x + 40, y, { size: 27, fam: F.math, w: 700, align: 'center', c: last && on ? C.now : C.white, a: a * (on ? 1 : 0.18) });
    }
    const pb = Q(S, 2, 'never sooner', 0.5);
    B07.numFoot(X, Y, Wd, a);
    txt('15 steps → 22, no rule applies: halt.  Earlier stops: none.', X + Wd / 2, Y + 535, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * pb });
  }
};

SCENES.b07_tally = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'computed']]);
  const a = clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.6);
  const X = 140, Y = 200, Wd = 1040, Hh = 610;
  panel(X, Y, Wd, Hh, a, C.cyan, 'D5 · PAIRED BACKEND RECORDS · 双后端记录');
  const M = B07.MODS, cs = 21, gx = 70, x0 = X + 70, yb = Y + 570;
  const L0 = lineAt(S, 0), fill = clamp((S.u - L0.s - 0.2) / Math.max(1, (L0.e - L0.s) * 0.7));
  let idx = 0;
  const total = M.reduce((s, m) => s + m[1], 0), shown = Math.floor(fill * total);
  const citedCells = new Set(B07.ROWS.flatMap(r => r.cells.map(([m, k]) => m + ':' + k)));
  const g = Q(S, 0, 'strict axiom list is empty', 0.6, 1.4);  /* the eight cited theorems light up inside the wall */
  M.forEach(([name, n], m) => {
    for (let k = 0; k < n; k++) {
      const on = idx++ < shown, x = x0 + m * gx, y = yb - (k + 1) * (cs + 3);
      if (!on) continue;
      const hit = citedCells.has(m + ':' + k);
      fillBox(x, y, cs, cs, hit ? mix(C.cyan, C.lean, g) : C.cyan, a * (hit ? 0.45 + 0.5 * g : 0.45));
      if (hit && g > 0) box(x - 3, y - 3, cs + 6, cs + 6, C.lean, a * g, 1.5);
    }
    txt(String(n), x0 + m * gx + cs / 2, yb + 26, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * fill });
  });
  txt(`${Math.min(shown, total)}`, X + 50, Y + 120, { size: 72, fam: F.orb, w: 900, c: C.white, a, ab: 2 });
  txt('theorems · 定理', X + 250, Y + 92, { size: 20, fam: F.zh, w: 700, c: C.cyan, a });
  const ax = Q(S, 0, 'strict axiom list is empty', 0.5);
  txt(`${M.length} modules · ${M.length} 个模块`, X + 250, Y + 122, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: a * fill });
  txt('strict axioms: [] · 严格端', X + Wd - 50, Y + 112, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: a * ax });
  txt(`${B07.ROWS.flatMap(r => r.cites).length} read aloud · 刚才念过 ${B07.ROWS.flatMap(r => r.cites).length} 条`, X + Wd - 50, Y + 150, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.lean, a: a * g });
  /* outside the wall: the one-way bridge to the classical numbers */
  const b = at(S, 1, 0.6), bx = 1250, by = 300;
  panel(bx, by - 100, 560, 520, a * b, C.mag, 'OUTSIDE THE WALL · 墙外');
  line(X + Wd + 30, Y + 20, X + Wd + 30, Y + Hh - 20, C.cyan, a * b, 4);
  for (let k = 0; k < B07.BRIDGE; k++) fillBox(bx + 40 + (k % 6) * 36, by + Math.floor(k / 6) * 36, 28, 28, C.mag, a * b * 0.7);
  txt('11 bridge theorems', bx + 40, by + 110, { size: 22, fam: F.mono, w: 700, c: C.mag, a: a * b });
  txt('OmegaShadowBridge · 桥接定理', bx + 40, by + 140, { size: 18, fam: F.zh, w: 700, c: C.mag, a: a * b * 0.85 });
  const d = Q(S, 1, 'One way only', 0.5);
  arrow(bx + 40, by + 230, bx + 330, by + 230, C.mag, a * b, 3);
  chip(bx + 430, by + 230, 150, 64, 'Mathlib', C.mag, a * b, 26, F.mono);
  txt('Omega.Nat, Int, IntRatio → ℕ, ℤ, ℚ, ℝ', bx + 40, by + 300, { size: 18, fam: F.math, w: 700, c: C.white, a: a * b * 0.8 });
  dashed(bx + 330, by + 360, bx + 60, by + 360, C.dim, a * d, 2);
  line(bx + 170, by + 340, bx + 220, by + 380, C.dim, a * d, 3); line(bx + 220, by + 340, bx + 170, by + 380, C.dim, a * d, 3);
  txt('nothing flows back · 不回流', bx + 40, by + 410, { size: 20, fam: F.zh, w: 700, c: C.white, a: a * d });
};

SCENES.b07_honest = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'open'], [2, null, 'argued']]);
  const fin = clamp((S.d - S.u) / 0.5), k2 = at(S, 2, 0.6);
  /* purple: a model we chose */
  const pa = at(S, 0, 0.6) * (1 - 0.8 * k2) * fin;
  panel(140, 210, 780, 360, pa, C.argued, 'ARGUED · MODEL · 诠释模型');
  txt('the observer is the universe', 180, 320, { size: 32, fam: F.disp, w: 700, c: C.argued, a: pa });
  txt('观察者即宇宙', 180, 372, { size: 34, fam: F.zh, w: 900, c: C.white, a: pa });
  const pq = Q(S, 0, 'not a theorem', 0.5);
  txt('a model we chose · not a theorem', 180, 460, { size: 22, fam: F.mono, w: 700, c: C.argued, a: pa * pq });
  txt('我们选定的模型，不是定理', 180, 500, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa * pq * 0.9 });
  /* red: still open */
  const ra = at(S, 1, 0.6) * (1 - 0.8 * k2) * fin;
  panel(1000, 210, 780, 360, ra, C.open, 'OPEN · 开放问题');
  const r1 = Q(S, 1, 'finite comparisons', 0.5), r2 = Q(S, 1, 'higher rank', 0.5);
  txt("Einstein's equations from finite comparisons", 1040, 310, { size: 24, fam: F.disp, w: 700, c: C.open, a: ra * r1 });
  txt('由有限比较推出爱因斯坦方程', 1040, 350, { size: 24, fam: F.zh, w: 700, c: C.white, a: ra * r1 * 0.9 });
  txt('Ramanujan–Petersson for GLₙ, n ≥ 3', 1040, 450, { size: 24, fam: F.math, w: 700, c: C.open, a: ra * r2 });
  txt('高秩群 GLₙ（n ≥ 3）上的拉马努金—彼得松猜想', 1040, 490, { size: 24, fam: F.zh, w: 700, c: C.white, a: ra * r2 * 0.9 });
  /* the habit: curves on flat paper, paid for with polygons that keep doubling */
  const h = k2 * fin;
  if (h <= 0.003) return;
  const gy = 620, gx0 = 170, gw = 640, gh = 200;
  for (let i = 0; i <= 16; i++) line(gx0 + i * 40, gy, gx0 + i * 40, gy + gh, C.dim, h * 0.35, 1);
  for (let j = 0; j <= 5; j++) line(gx0, gy + j * 40, gx0 + gw, gy + j * 40, C.dim, h * 0.35, 1);
  const pc = Q(S, 2, 'flat paper', 0.6), cx = gx0 + 320, cy = gy + 100, R = 90;
  ctx.save(); ctx.globalAlpha = h * pc; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath();
  const dbl = Math.max(0, S.u - phraseAt(S, 2, 'never stop doubling')), sides = 8 * Math.pow(2, Math.min(4, Math.floor(dbl / 0.55)));
  for (let k = 0; k <= sides; k++) { const t = k / sides * TAU, x = cx + R * Math.cos(t), y = cy + R * Math.sin(t); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke(); ctx.restore();
  ring(cx, cy, R, C.mag, h * pc * 0.8, 1.5);
  txt(`${sides} sides`, cx + R + 30, cy + 8, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: h * pc });
  const pp = Q(S, 2, 'never stop doubling', 0.5), digits = '3.14159265358979323846264338327950288419716939937510';
  const n = Math.floor(8 + pp * 34 + dbl * 6);
  txt('π =', 900, 760, { size: 30, fam: F.math, w: 700, c: C.mag, a: h * pp });
  txt(digits.slice(0, Math.min(n, 44)) + '…', 965, 760, { size: 30, fam: F.mono, w: 700, c: C.mag, a: h * pp });
  txt('an IOU that never closes · 永远还不完的欠条', 965, 810, { size: 20, fam: F.zh, w: 700, c: C.argued, a: h * pp });
  const hb = Q(S, 2, 'Habit', 0.5);
  txt('habit · 习惯', 1450, 680, { size: 44, fam: F.disp, w: 900, align: 'center', c: C.argued, a: h * hb, ab: 1.5 });
};

SCENES.b07_close = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'lean'], [1, null, 'argued']]);
  const a = clamp(S.u / 0.6);
  /* the receipt: all eight rungs, stamped */
  const x0 = 300, step = 188, y = 300;
  txt('RECEIPT · 收据', W / 2, 220, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 6 });
  line(x0 - 40, y, x0 + 7 * step + 40, y, C.cyan, a * 0.4, 2);
  for (let i = 0; i < 8; i++) {
    const x = x0 + i * step, p = SPINE.PARTS[i], g = clamp((S.u - lineAt(S, 0).s - 0.3 - i * 0.25) / 0.5);
    dot(x, y, i === 7 ? 10 : 8, 'c', a);
    if (i === 7) ring(x, y, 15, C.now, a, 2);
    txt(p.tag, x, y - 34, { size: 15, fam: F.mono, w: 700, align: 'center', c: i === 7 ? C.now : C.cyan, a, ls: 1 });
    txt(p.zh, x, y + 46, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * 0.8 });
    const K = i === 0 ? ['ARGUED', C.argued] : i < 7 ? ['LEAN ✓', C.lean] : ['NUM', C.cyan];
    chip(x, y + 100, 120, 34, K[0], K[1], a * g, 17);
  }
  /* the maxim */
  const m1 = Q(S, 1, 'We did not tame infinity', 0.8), m2 = Q(S, 1, 'stopped borrowing it', 0.8);
  txt('We did not tame infinity.', W / 2, 590, { size: 60, fam: F.disp, w: 700, align: 'center', c: C.white, a: m1 });
  txt('We simply stopped borrowing it.', W / 2, 670, { size: 60, fam: F.disp, w: 700, align: 'center', c: C.white, a: m2, ab: 2 });
  txt('ARGUED · 格言', W / 2, 800, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.argued, a: m2 * 0.9, ls: 3 });
  txt('我们没有驯服无穷。我们只是不再向它借债。', W / 2, 740, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.white, a: m2 * 0.85 });
};

const LONG_POSTER = { en: 'SIX VOLUMES AND A CODA', zh: '六卷与终章' };

/* ---- poster: the whole ladder of the long film, one bead per act ---- */
FILM.poster = () => {
  const sc = TL.scenes[0], t = 23.7, P = SPINE.PARTS, n = P.length;
  background(t, sc, 0, 6);
  drawHyper(CUBE5, [[0, 4, t * 0.21], [1, 3, t * 0.17], [2, 4, t * 0.13]], { scale: 1.6, a: 0.16, cx: W / 2, cy: 470, camZ: 7, lw: 1.2, dots: false });
  grid(t, 0.45);
  txt(DATA.film.title_zh, W / 2, 270, { size: 112, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt(DATA.film.title.toUpperCase(), W / 2, 380, { size: 62, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 5, ls: 8 });
  bloom(0.6);
  txt(`${LONG_POSTER.en} · ${LONG_POSTER.zh}`, W / 2, 462, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 6 });
  /* the ladder: every act a bead on one line, its tag above, its key below (two staggered rows) */
  const x0 = 250, x1 = W - 250, y = 640, step = (x1 - x0) / (n - 1);
  line(x0, y, x1, y, C.cyan, 0.55, 2);
  for (let i = 0; i < n; i++) {
    const x = x0 + i * step;
    ring(x, y, 15, C.cyan, 0.9, 2); dot(x, y, 9, 'c', 1);
    txt(P[i].tag, x, y - 34, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: 0.85, ls: 1.5 });
    const ky = y + (i % 2 ? 92 : 52);
    if (i % 2) line(x, y + 18, x, ky - 22, C.cyan, 0.3, 1);
    txt(P[i].key_zh, x, ky, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.92 });
  }
  txt(`${DATA.book.code} · LONG FILM`, W / 2, 850, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, 711, 0, sc);
  post(0);
};
