/* Long film · Four Questions, Zero Shortcuts · 四问，零圆满 (book omega-unification).
   Seven acts, one per part of the book: the prelude (a0), Volumes I–V (a1–a5) and the coda (a6), spliced in order.
   Each act keeps its own namespace (A0 … A6) and scene prefix (a0_ … a6_); the shared SPINE draws the act title
   cards, the position rail and the hand-over questions. Every act's header comment lists its scenes and what each
   one rests on; green LEAN ✓ goes only to what the frozen declarations of film.json "lean" state. */

/* ==== SPINE:BEGIN — shared by every act of this film. Copy verbatim; never edit inside an act. ==== */
const SPINE = (() => {
  /* the seven parts of the book: index 0 = prelude, 1..5 = Volumes I–V, 6 = coda */
  const PARTS = [
    { tag: 'PRELUDE', zh: '前言', key_en: 'four questions, zero shortcuts', key_zh: '四问，零圆满' },
    { tag: 'VOLUME I', zh: '第一卷', key_en: 'a shell, two clocks, the zeros', key_zh: '球壳、双钟与零点' },
    { tag: 'VOLUME II', zh: '第二卷', key_en: 'Q1 · couplings and the Higgs', key_zh: '第一问 · 耦合与希格斯' },
    { tag: 'VOLUME III', zh: '第三卷', key_en: 'Q2 & Q3 · generations, flavour, proton', key_zh: '第二、三问 · 三代、味与质子' },
    { tag: 'VOLUME IV', zh: '第四卷', key_en: 'Q4 · gravity and dark energy', key_zh: '第四问 · 引力与暗能量' },
    { tag: 'VOLUME V', zh: '第五卷', key_en: 'one clock for four questions', key_zh: '四问共用一只钟' },
    { tag: 'CODA', zh: '终章', key_en: 'why a sharp no matters', key_zh: '清晰的否定为何有力量' }
  ];
  const X0 = 60, Y = 128, STEP = 26;
  /* the position rail, top left under the SEQ line: passed parts cyan, the current one amber, later ones dim */
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
    txt(title_zh, W / 2, 500, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, a: a * clamp(k * 1.6), ab: 3 });
    txt(scramble(title_en.toUpperCase(), k, idx + 7), W / 2, 590, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, a, ls: 5, ab: 1.5 });
    txt(`${p.key_en} · ${p.key_zh}`, W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * 0.9, ls: 3 });
  }
  /* the question an act hands to the next one, from the start of line k to the end of the scene */
  function ask(S, k, en, zh, o = {}) {
    const a = at(S, k, 0.6) * (o.a == null ? 1 : o.a);
    if (a <= 0.003) return;
    const y = o.y || 668, w = 1340, x = W / 2 - w / 2;
    panel(x, y, w, 132, a, C.cyan, 'NEXT QUESTION · 下一问');
    txt(en, W / 2, y + 72, { size: 31, fam: F.disp, w: 700, align: 'center', c: C.white, a });
    txt(zh, W / 2, y + 114, { size: 27, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * 0.9 });
  }
  return { PARTS, rail, title, ask };
})();
/* ==== SPINE:END ==== */

'use strict';

/* ==== ACT:a0:BEGIN ==== */
/* ---- a0 · Prelude · Four questions, zero shortcuts · 前言 · 四问，零圆满 ---- */
/* Summary (en): The prelude sets the exam: four questions of grand unification (gauge crossing and the Higgs,
   three chiral generations, flavour and the proton, spin-two gravity and the cosmological constant), all to be
   answered from one master connection with no after-the-fact fitting. The ledger is shown at once: every question
   has a recomputable model-internal witness (4/4), none is derived outright under that rule (0/4). The six-tier
   honesty contract (LEAN, EXT-LEAN, ARGUED, NUM, MODEL, OPEN) is introduced as the colours the whole film uses, and
   two exact obstructions show why a sharp no is worth more than a blurry close enough.
   Summary (zh)：前言立下考卷：大统一的四道问题（规范交汇与希格斯、三代手征费米子、味谱与质子、自旋二引力与宇宙学常数），
   都须从同一条主联络、不做事后拟合地回答。总账当场亮出：每一问都有可复算的模型内见证（4/4），按此铁律完整推出的为 0/4。
   六层认识论诚实契约（LEAN、EXT-LEAN、ARGUED、NUM、MODEL、OPEN）作为全片的颜色登场，两条精确障碍说明为什么清晰的
   “不行”比含混的“差不多”更有分量。
   Scenes and what each rests on (source: books/omega-unification/zh/README.md, authoritative, and en/README.md):
     a0_title   SPINE title card; the prelude's two ways of writing unification, the victor's myth and the
                cartographer's map (argued; drawn as a schematic, labelled so).
     a0_exam    §0.1: the rule (one master connection, zero post-hoc fits) and the four questions with the targets the
                prelude names: Δα⁻¹ > 3.66 (≈ 3.664), m_H ≈ 125.2 GeV, v/M_P ~ 10⁻¹⁷; N_gen = 3 past Nielsen–Ninomiya;
                five orders of masses, CKM, J, the proton; helicity ±2, G_N, Λ_cos ℓ_P² ~ 10⁻¹²² (OPEN as
                first-principles problems, §0.2 tier 6).
     a0_score   §0.1 table: one representative model-internal witness per question, quoted verbatim (MODEL / NUM),
                and the 0/4 zero-fit column (OPEN); the two totals are counted from the rows on screen (computed).
     a0_tiers   §0.2 remark rem-ou-epistemic-contract: the six tiers and their boundaries, each in the film colour it
                uses (green LEAN, violet EXT-LEAN / ARGUED / MODEL, cyan NUM, red OPEN); a colour key, not a claim.
     a0_no      §0.1: under every non-increasing winding weight a native rival lies more than 1/4 below any
                reference-flavour phase (ch13 rem-ou-ch13-monotone-cone-geometry, interval certificate: NUM);
                the 19-point unit-edge Laplacian has real rank 18 but minimal rational Gram dimension exactly 21
                (ch01 §1.4, CERT / ARGUED); the maxim, quoted from the prelude (argued).
     a0_ask     the seven parts of SPINE.PARTS as one road (argued: a way to read the book); the 19 non-negative
                integer points of x² + y² + z² = 867 as an unlabelled silhouette, computed here; the next question.
   No Lean theorem is cited in this act (the prelude states none). FILM.init recounts the 19 shell points, the
   135 edges with squared chord ≤ 804, the 529 triangles, the ledger totals and the tier table. */
const A0 = (() => {
  const fadeS = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  /* a small violet note: a schematic, a reading, or a quoted fact */
  function note(s, x, y, a, o = {}) {
    if (a <= 0.003) return;
    txt(s, x, y, { size: o.size || 20, fam: o.fam || F.mono, w: 700, c: C.argued, a, align: o.align || 'left', ls: 1 });
  }
  /* a solid tag in a tier colour, the way the film's evidence badges look */
  function tag(s, x, y, col, a, o = {}) {
    if (a <= 0.003) return 0;
    const size = o.size || 22, w = tw(s, size, F.mono, 700, 2) + 28, h = size + 18;
    ctx.save(); ctx.globalAlpha = a; cutPath(x, y - h / 2, w, h, 8); ctx.fillStyle = col; ctx.fill(); ctx.restore();
    txt(s, x + 14, y + size * 0.36, { size, fam: F.mono, w: 700, c: C.bg, a, ls: 2 });
    return w;
  }

  /* the four questions of §0.1, with the targets the prelude names */
  const QUESTIONS = [
    { k: 'Q1', en: 'GAUGE & HIGGS', zh: '规范交汇与希格斯', t1: 'close the gap  Δα⁻¹ > 3.66  (≈ 3.664)', t2: 'Higgs mass ≈ 125.2 GeV  ·  v / Mₚ ~ 10⁻¹⁷', tz: '三力交汇 · 希格斯质量 · 电弱尺度' },
    { k: 'Q2', en: 'THREE GENERATIONS', zh: '四维格点手征三代', t1: 'exactly 3 generations of chiral Weyl fermions', t2: 'on a 4D lattice, past Nielsen–Ninomiya', tz: '不违背费米子倍增定理的恰好三代' },
    { k: 'Q3', en: 'FLAVOUR & PROTON', zh: '味谱层级与质子', t1: 'masses over five orders · CKM angles · J', t2: 'and a proton that does not decay', tz: '汤川层级 · 夸克混合 · 质子稳定' },
    { k: 'Q4', en: 'GRAVITY & DARK ENERGY', zh: '引力与暗能量', t1: 'massless helicity ±2 graviton · Newton’s G', t2: 'cosmological constant  Λ ℓₚ² ~ 10⁻¹²²', tz: '自旋二传播子 · 牛顿常数 · 宇宙学常数' }
  ];
  /* the prelude's table (§0.1): one representative model-internal witness per question, verbatim */
  const LEDGER = [
    { q: 'Q1', w1: 'two-loop crossing at zeros #11431, #8359, #8236', w2: 'chosen heavy-field table · αₛ ≈ 0.1184', witness: true, derived: false },
    { q: 'Q2', w1: 'five charges × three light modes', w2: 'common gap (8.685, 9.6) on the clock torus', witness: true, derived: false },
    { q: 'Q3', w1: 'joint zero #2,306,888,100,085', w2: '105 windings · |Vub|² off by +1.33 ppm', witness: true, derived: false },
    { q: 'Q4', w1: 'Regge action on  g = I − J/5', w2: 'Fierz–Pauli kinetic term at long wavelength', witness: true, derived: false }
  ];
  const WITNESSED = LEDGER.filter(r => r.witness).length, DERIVED = LEDGER.filter(r => r.derived).length;

  /* the six tiers of rem-ou-epistemic-contract and the film colour each one wears */
  const TIERS = [
    { tag: 'LEAN ✓', col: 'lean', en: 'a frozen theorem, checked by the Lean kernel', zh: 'Lean 4 内核冻结定理', never: 'never more than its signature says' },
    { tag: 'EXT-LEAN', col: 'argued', en: 'RH and Dirichlet GRH, a Lean proof outside trureturing', zh: '外部已核验形式化事实', never: 'never green · says nothing about physics' },
    { tag: 'ARGUED', col: 'argued', en: 'written proofs, literature results, no-go arguments', zh: '文献结果与手工推导', never: 'never counted as kernel-checked' },
    { tag: 'NUM', col: 'cyan', en: 'exact certificates, interval enclosures, computations', zh: '计算证书与数值诊断', never: 'only over its stated window and inputs' },
    { tag: 'MODEL', col: 'argued', en: 'the chosen shell, clock maps and physical readings', zh: '模型内构造与诠释', never: 'nearby Lean algebra never makes it a law' },
    { tag: 'OPEN', col: 'open', en: 'not yet derived from first principles', zh: '第一性原理开放前沿', never: 'no fit or window hit may hide it' }
  ];

  /* the 19-point Behrend shell: all non-negative integer solutions of x² + y² + z² = 867 */
  const R2 = 867;
  const SHELL = [];
  for (let x = 0; x * x <= R2; x++) for (let y = 0; x * x + y * y <= R2; y++) {
    const z2 = R2 - x * x - y * y, z = Math.round(Math.sqrt(z2));
    if (z * z === z2) SHELL.push([x, y, z]);
  }
  const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;
  const EDGES = [];
  for (let i = 0; i < SHELL.length; i++) for (let j = i + 1; j < SHELL.length; j++) if (d2(SHELL[i], SHELL[j]) <= 804) EDGES.push([i, j]);
  const UNIT = SHELL.map(p => p.map(c => c / Math.sqrt(R2)));
  return { fadeS, note, tag, QUESTIONS, LEDGER, WITNESSED, DERIVED, TIERS, SHELL, EDGES, UNIT, d2 };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 12) E.push('four-questions-zero-shortcuts a0: ' + m); };
  /* the shell, by a second route: count ordered triples from the sorted orbit types */
  const types = new Map();
  for (let a = 0; a * a <= 867; a++) for (let b = a; a * a + b * b <= 867; b++) {
    const c2 = 867 - a * a - b * b, c = Math.floor(Math.sqrt(c2) + 0.5);
    if (c >= b && c * c === c2) types.set(`${a},${b},${c}`, a === b && b === c ? 1 : a === b || b === c ? 3 : 6);
  }
  const total = [...types.values()].reduce((s, v) => s + v, 0);
  check(total === 19 && A0.SHELL.length === 19, `shell points ${A0.SHELL.length} / ${total}`);
  check(A0.SHELL.every(p => p[0] * p[0] + p[1] * p[1] + p[2] * p[2] === 867 && p.every(c => c >= 0)), 'shell equation');
  check(A0.SHELL.some(p => p.join() === '17,17,17'), 'the pole (17, 17, 17)');
  /* edges and triangles of G19 (chapter 1: 135 edges, 529 triangles) */
  check(A0.EDGES.length === 135, `edges ${A0.EDGES.length}`);
  const adj = A0.SHELL.map(() => new Set());
  A0.EDGES.forEach(([i, j]) => { adj[i].add(j); adj[j].add(i); });
  let tri = 0;
  for (let i = 0; i < 19; i++) for (let j = i + 1; j < 19; j++) for (let k = j + 1; k < 19; k++) if (adj[i].has(j) && adj[j].has(k) && adj[i].has(k)) tri++;
  check(tri === 529, `triangles ${tri}`);
  /* the ledger totals and the tier table */
  check(A0.LEDGER.length === 4 && A0.WITNESSED === 4 && A0.DERIVED === 0, 'ledger 4/4 and 0/4');
  check(A0.QUESTIONS.map(q => q.k).join() === 'Q1,Q2,Q3,Q4', 'four questions');
  check(A0.TIERS.map(t => t.tag).join() === 'LEAN ✓,EXT-LEAN,ARGUED,NUM,MODEL,OPEN', 'six tiers');
  check(A0.TIERS.filter(t => t.col === 'lean').length === 1 && A0.TIERS[1].col !== 'lean', 'only LEAN is green');
  check(SPINE.PARTS.length === 7, 'seven parts');
  /* the 21 cells of the rational Gram picture: 18 real-rank cells plus 3 */
  check(18 + 3 === 21, 'rank 18 plus 3');
});

/* ------------------------------------------------------------ myth or map ------------------------------------------------------------ */
SCENES.a0_title = S => {
  SPINE.title(S, 0, '四问，零圆满', 'Four questions, zero shortcuts');
  const u = S.u, a = at(S, 0, 0.5, -0.3) * clamp((S.d - u) / 0.5);
  SPINE.rail(S, 0, a);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* left: the victor's myth, one page that claims to close everything; the misfits go under the rug */
  const pa = at(S, 0, 0.7) * a, lx = 140, ly = 220, lw = 780, lh = 560;
  panel(lx, ly, lw, lh, pa, C.mag, "THE VICTOR'S MYTH · 胜利者的神话");
  if (pa > 0.003) {
    ctx.save(); ctx.filter = `blur(${(2.4 * Q(S, 0, 'one page', 1.2)).toFixed(2)}px)`;
    txt('ONE PAGE OF EQUATIONS', lx + lw / 2, ly + 130, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: pa, ls: 3 });
    txt('一页方程，宇宙闭合', lx + lw / 2, ly + 182, { size: 32, fam: F.zh, w: 900, align: 'center', c: C.white, a: pa * 0.9 });
    ctx.restore();
    const rugY = ly + 420;
    line(lx + 60, rugY, lx + lw - 60, rugY, C.mag, pa * 0.9, 4);
    const items = [['mass thresholds', '→ “higher-order corrections”'], ['hand-tuned couplings', '→ “a natural scale”']];
    items.forEach(([s, t], i) => {
      const p = ease(clamp((Q(S, 0, i ? 'the universe' : 'equations', 1.4) - 0.4) / 0.6));
      const y = lerp(ly + 270 + i * 70, rugY + 38 + i * 54, p);
      const al = pa * (1 - 0.7 * p);
      chip(lx + 220, y, 300, 40, s, C.mag, al, 20);
      txt(t, lx + 390, y + 7, { size: 20, fam: F.mono, w: 700, c: C.dim, a: al });
    });
    txt('swept under the rug · 扫到地毯下', lx + lw - 60, rugY - 16, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.mag, a: pa * Q(S, 0, 'the universe', 0.8) });
    stamp('CLOSED?', lx + lw / 2, ly + 316, Q(S, 0, 'closed', 0.5), C.mag, 40, -0.05);
  }
  /* right: the cartographer's map: a path walked step by step that stops at an exact edge */
  const pb = at(S, 1, 0.7) * a, rx = 1000, ry = 220, rw = 780, rh = 560;
  panel(rx, ry, rw, rh, pb, C.cyan, "THE CARTOGRAPHER'S MAP · 制图者的解剖");
  if (pb > 0.003) {
    const gx0 = rx + 60, gx1 = rx + 560, gy = ry + 380, edge = gx1;
    const ground = x => gy - 70 * Math.sin((x - gx0) / 110) * 0.5 - (x - gx0) * 0.12;
    curve(t => [lerp(gx0, edge, t), ground(lerp(gx0, edge, t))], 60, C.cyan, pb, 3);
    /* the cliff: a vertical drop at the edge */
    const ey = ground(edge);
    line(edge, ey, edge, ry + rh - 60, C.open, pb, 3);
    for (let i = 0; i < 6; i++) line(edge, ey + 20 + i * 24, edge + 16, ey + 8 + i * 24, C.open, pb * 0.7, 1.5);
    /* survey ticks along the path */
    for (let i = 0; i <= 10; i++) { const x = lerp(gx0, edge, i / 10), y = ground(x); line(x, y + 6, x, y + 18, C.cyan, pb * 0.6, 1.5); }
    /* the walker: the current position, amber */
    const w = ease(clamp((u - phraseAt(S, 1, 'how far')) / Math.max(0.5, phraseAt(S, 1, 'where it stops') - phraseAt(S, 1, 'how far'))));
    const wx = lerp(gx0, edge - 6, w);
    ring(wx, ground(wx) - 16, 13, C.now, pb, 2); dot(wx, ground(wx) - 16, 9, 'g', pb);
    const st = Q(S, 1, 'where it stops', 0.6) * pb;
    txt('the exact edge', edge + 30, ey - 46, { size: 24, fam: F.disp, w: 700, c: C.open, a: st });
    txt('精确的悬崖', edge + 30, ey - 14, { size: 24, fam: F.zh, w: 700, c: C.open, a: st });
    txt('how far it walks on its own · 凭自己走多远', rx + 60, ry + 100, { size: 22, fam: F.mono, w: 700, c: C.white, a: pb * Q(S, 1, 'how far', 0.6) });
    A0.note('schematic · 示意', rx + rw - 40, ry + rh - 26, pb, { align: 'right', size: 18 });
  }
};

/* ------------------------------------------------------------ the four questions ------------------------------------------------------------ */
SCENES.a0_exam = S => {
  const A = A0.fadeS(S);
  SPINE.rail(S, 0, A);
  badgeQ(S, [[0, null, 'open']]);
  /* the rule */
  const r = at(S, 0, 0.6) * A;
  panel(260, 196, 1400, 92, r, C.cyan, 'THE RULE · 规则');
  txt('one master connection  ·  zero post-hoc fits', 300, 262, { size: 28, fam: F.disp, w: 700, c: C.white, a: r });
  txt('同一主联络 · 零事后拟合', 1620, 262, { size: 26, fam: F.zh, w: 700, align: 'right', c: C.white, a: r * 0.9 });
  /* the four cards; the one being read now carries the amber marker */
  const cur = [1, 2, 3, 4].reduce((b, k) => (S.u >= lineAt(S, k).s ? k - 1 : b), -1);
  A0.QUESTIONS.forEach((q, i) => {
    const a = at(S, i + 1, 0.6) * A;
    if (a <= 0.003) return;
    const x = i % 2 ? 980 : 140, y = i < 2 ? 320 : 580, w = 800, h = 236;
    const focus = i === cur ? 1 : 0.72;
    panel(x, y, w, h, a * focus, C.open, `${q.k} · ${q.en} · ${q.zh}`);
    txt(q.t1, x + 32, y + 92, { size: 27, fam: F.math, w: 700, c: C.white, a: a * focus });
    txt(q.t2, x + 32, y + 140, { size: 27, fam: F.math, w: 700, c: C.white, a: a * focus });
    txt(q.tz, x + 32, y + 192, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * focus * 0.8 });
    if (i === cur) { ring(x + w - 36, y + 16, 9, C.now, a, 2); dot(x + w - 36, y + 16, 6, 'g', a); }
  });
};

/* ------------------------------------------------------------ the score ------------------------------------------------------------ */
SCENES.a0_score = S => {
  const A = A0.fadeS(S);
  SPINE.rail(S, 0, A);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'open'], [2, null, 'argued']]);
  const x0 = 140, x1 = 1780, y0 = 196, a0 = at(S, 0, 0.6) * A;
  panel(x0, y0, x1 - x0, 640, a0, C.cyan, 'THE LEDGER · 四问总账');
  const cQ = 176, cW = 330, cD = 1340, hy = y0 + 76;
  txt('Q · 问', cQ, hy, { size: 18, fam: F.mono, w: 700, c: C.dim, a: a0, ls: 1 });
  txt('MODEL-INTERNAL WITNESS · 模型内见证', cW, hy, { size: 18, fam: F.mono, w: 700, c: C.argued, a: a0, ls: 1 });
  txt('ZERO-FIT DERIVATION · 零拟合推导', cD, hy, { size: 18, fam: F.mono, w: 700, c: C.open, a: at(S, 1, 0.6) * A, ls: 1 });
  line(x0 + 30, hy + 18, x1 - 30, hy + 18, C.dim, a0 * 0.6, 1);
  const rowH = 92, ry0 = hy + 70;
  A0.LEDGER.forEach((r, i) => {
    const y = ry0 + i * rowH, a = clamp((S.u - lineAt(S, 0).s - 0.4 - i * 0.9) / 0.5) * A;
    if (a <= 0.003) return;
    txt(r.q, cQ, y + 10, { size: 34, fam: F.orb, w: 900, c: C.white, a });
    txt(r.w1, cW, y, { size: 24, fam: F.math, w: 700, c: C.white, a });
    txt(r.w2, cW, y + 32, { size: 20, fam: F.math, w: 700, c: C.dim, a });
    A0.tag('MODEL', 1200, y + 8, C.argued, a, { size: 18 });
    const b = clamp((S.u - lineAt(S, 1).s - 0.3 - i * 0.35) / 0.4) * A;
    if (b > 0.003) {
      txt('✗', cD, y + 14, { size: 40, fam: F.math, w: 700, c: C.open, a: b });
      A0.tag('OPEN', cD + 56, y + 6, C.open, b, { size: 18 });
      txt('not derived · 未导出', cD + 180, y + 12, { size: 22, fam: F.zh, w: 700, c: C.open, a: b });
    }
  });
  /* the totals, counted from the rows above */
  const ty = ry0 + 4 * rowH + 30;
  line(x0 + 30, ty - 44, x1 - 30, ty - 44, C.dim, a0 * 0.6, 1);
  const p4 = Q(S, 0, 'four out of four', 0.6) * A, p0 = Q(S, 1, 'Zero out of four', 0.6) * A;
  txt(`${A0.WITNESSED} / ${A0.LEDGER.length}`, cW, ty + 16, { size: 64, fam: F.orb, w: 900, c: C.argued, a: p4, ab: 2 });
  txt('have a witness · 有模型内结果', cW + 230, ty + 4, { size: 22, fam: F.zh, w: 700, c: C.argued, a: p4 });
  txt(`${A0.DERIVED} / ${A0.LEDGER.length}`, cD, ty + 16, { size: 64, fam: F.orb, w: 900, c: C.open, a: p0, ab: 2 });
  txt('derived · 完整推出', cD + 200, ty + 4, { size: 20, fam: F.zh, w: 700, c: C.open, a: p0 });
  const sb = Q(S, 2, 'side by side', 0.6) * A;
  if (sb > 0.003) { box(cW - 24, ty - 40, 640, 76, C.now, sb, 2); box(cD - 24, ty - 40, 444, 76, C.now, sb, 2); }
};

/* ------------------------------------------------------------ the six tiers ------------------------------------------------------------ */
SCENES.a0_tiers = S => {
  const A = A0.fadeS(S);
  SPINE.rail(S, 0, A);
  badgeQ(S, [[0, null, 'argued']]);
  const head = at(S, 0, 0.6) * A;
  txt('SIX TIERS · 六层认识论诚实契约', W / 2, 214, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: head, ls: 4 });
  A0.note('the colours this film uses · 本片使用的颜色', W / 2, 248, head, { align: 'center', size: 18 });
  /* when each tier is named */
  const on = [Q(S, 1, 'Green LEAN', 0.5), Q(S, 2, 'EXT-LEAN', 0.5), Q(S, 3, 'ARGUED', 0.5), Q(S, 3, 'NUM', 0.5), Q(S, 3, 'MODEL', 0.5), Q(S, 4, 'Red OPEN', 0.5)];
  const cur = on.reduce((b, v, i) => (v > 0 ? i : b), -1);
  const y0 = 296, step = 80;
  A0.TIERS.forEach((t, i) => {
    const a = Math.max(on[i], 0.22 * at(S, 0, 0.8, 0.6)) * A;
    if (a <= 0.003) return;
    const y = y0 + i * step, col = C[t.col];
    if (i === cur) { ring(150, y, 9, C.now, a, 2); dot(150, y, 6, 'g', a); }
    A0.tag(t.tag, 180, y, col, a, { size: 22 });
    txt(t.en, 390, y - 2, { size: 25, fam: F.disp, w: 700, c: C.white, a });
    txt(t.zh, 390, y + 28, { size: 20, fam: F.zh, w: 700, c: col, a: a * 0.95 });
    txt(t.never, 1780, y + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: a * 0.62 });
  });
  const nb = Q(S, 4, 'No claim may borrow', 0.6) * A;
  if (nb > 0.003) {
    panel(460, 770, 1000, 62, nb, C.mag);
    txt('NO BORROWED BADGES · 不借邻居的徽章', W / 2, 811, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: nb, ls: 3 });
  }
};

/* ------------------------------------------------------------ a sharp no ------------------------------------------------------------ */
SCENES.a0_no = S => {
  const A = A0.fadeS(S);
  SPINE.rail(S, 0, A);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'A sharp no', 'argued']]);
  const hq = at(S, 0, 0.6) * A;
  txt('WHY A BOOK ABOUT A ZERO?', W / 2, 226, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: hq, ls: 3 });
  txt('为什么为一个零写一整本书？', W / 2, 270, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: hq * 0.9 });
  const dimK = 1 - 0.45 * Q(S, 3, 'A sharp no', 0.8);
  /* left: the winding-weight obstruction (chapter 13, interval certificate) */
  const pa = at(S, 1, 0.6) * A * dimK, lx = 140, ly = 300, lw = 800, lh = 380;
  panel(lx, ly, lw, lh, pa, C.cyan, 'EVERY DECREASING WINDING WEIGHT · 任意单调递减绕数权');
  if (pa > 0.003) {
    const yRef = ly + 130, yRiv = ly + 300, xa = lx + 60, xb = lx + 420;
    line(xa, yRef, xb, yRef, C.cyan, pa, 5);
    txt('reference flavour vacuum', xb + 24, yRef - 4, { size: 22, fam: F.disp, w: 700, c: C.cyan, a: pa });
    txt('参考味真空', xb + 24, yRef + 26, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: pa });
    const dn = Q(S, 1, 'rival vacuum', 0.8);
    const yr = lerp(yRef, yRiv, ease(dn));
    line(xa, yr, xb, yr, C.mag, pa * dn, 5);
    txt('rival vacuum', xb + 24, yRiv - 4, { size: 22, fam: F.disp, w: 700, c: C.mag, a: pa * dn });
    txt('原生竞争点', xb + 24, yRiv + 26, { size: 20, fam: F.zh, w: 700, c: C.mag, a: pa * dn });
    const g = Q(S, 1, 'one quarter', 0.6) * pa;
    arrow(xa + 180, yRef + 10, xa + 180, yRiv - 10, C.white, g, 3);
    arrow(xa + 180, yRiv - 10, xa + 180, yRef + 10, C.white, g, 3);
    txt('> 1/4', xa + 205, (yRef + yRiv) / 2 + 16, { size: 46, fam: F.orb, w: 900, c: C.white, a: g });
    txt('lower in action · interval certificate', lx + lw - 30, ly + lh - 22, { size: 17, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: g });
  }
  /* right: the rational Gram dimension of the 19-point Laplacian (chapter 1, certificate and argument) */
  const pb = at(S, 2, 0.6) * A * dimK, rx = 980, ry = 300, rw = 800, rh = 380;
  panel(rx, ry, rw, rh, pb, C.cyan, "THE SHELL'S LAPLACIAN · 十九点拉普拉斯");
  if (pb > 0.003) {
    const cw = 28, gap = 3, cx0 = rx + 40;
    txt('real rank · 实秩', cx0, ry + 88, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pb });
    for (let i = 0; i < 18; i++) fillBox(cx0 + i * (cw + gap), ry + 104, cw, 50, C.cyan, pb * 0.8);
    txt('18', cx0 + 18 * (cw + gap) + 12, ry + 142, { size: 40, fam: F.orb, w: 900, c: C.cyan, a: pb });
    txt('rational coordinates · 有理坐标', cx0, ry + 214, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pb });
    const ex = Q(S, 2, 'twenty-one', 0.9);
    for (let i = 0; i < 21; i++) {
      const extra = i >= 18, al = extra ? ex : 1;
      fillBox(cx0 + i * (cw + gap), ry + 230, cw, 50, extra ? C.mag : C.cyan, pb * 0.8 * al);
    }
    txt('21', cx0 + 21 * (cw + gap) + 12, ry + 268, { size: 40, fam: F.orb, w: 900, c: C.mag, a: pb * ex });
    txt('exactly · 恰好  ·  three hidden dimensions', cx0, ry + 334, { size: 20, fam: F.mono, w: 700, c: C.mag, a: pb * Q(S, 2, 'not eighteen', 0.6) });
  }
  /* the maxim, quoted from the prelude */
  const m = Q(S, 3, 'A sharp no', 0.8) * A;
  txt('A sharp “no” is closer to a law of nature than a blurry “close enough.”', W / 2, 752, { size: 36, fam: F.disp, w: 700, align: 'center', c: C.white, a: m, ab: 1.5 });
  txt('清晰的“不行”比含混的“差不多”更接近自然律。', W / 2, 806, { size: 32, fam: F.zh, w: 900, align: 'center', c: C.white, a: m * 0.92 });
};

/* ------------------------------------------------------------ the next question ------------------------------------------------------------ */
SCENES.a0_ask = S => {
  const u = S.u, A = A0.fadeS(S);
  SPINE.rail(S, 0, A);
  badgeQ(S, [[0, null, 'argued']]);
  /* the seven parts as one road; Volume I is next */
  const P = SPINE.PARTS, n = P.length, x0 = 220, x1 = 1700, y = 230, base = at(S, 0, 0.6) * A;
  const out = 1 - 0.45 * at(S, 1, 0.6);
  P.forEach((p, i) => {
    const x = x0 + (x1 - x0) * i / (n - 1), lit = clamp((u - lineAt(S, 0).s - 0.3 - i * 0.35) / 0.4) * base * out;
    if (i + 1 < n) line(x + 14, y, x + (x1 - x0) / (n - 1) - 14, y, i === 0 ? C.cyan : C.dim, lit * 0.6, 2);
    if (i === 0) { ring(x, y, 13, C.now, lit, 2); dot(x, y, 9, 'g', lit); }
    else if (i === 1) { ring(x, y, 12 + 3 * Math.sin(u * 3), C.cyan, lit, 2); dot(x, y, 7, 'c', lit); }
    else ring(x, y, 7, C.cyan, lit * 0.8, 1.6);
    txt(p.tag, x, y + 44, { size: 17, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.now : C.cyan, a: lit, ls: 1 });
    txt(p.key_zh, x, y + 72, { size: 16, fam: F.zh, w: 700, align: 'center', c: C.white, a: lit * 0.85 });
  });
  A0.note('one road through the book · 一条读书的路', W / 2, 344, base * out, { align: 'center', size: 18 });
  /* an unlabelled silhouette: the 19 integer points of the next act's object, turning slowly */
  const s = Math.max(0.35 * at(S, 0, 1.2, 1.2), at(S, 1, 1.0)) * A;
  if (s > 0.003) {
    /* a frame with the pole (17, 17, 17) towards the viewer: the 19 points form a cap around it */
    const cx = W / 2, cy = 505, sc = 165, n3 = 1 / Math.sqrt(3), e1 = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0], e2 = [n3 / Math.sqrt(2), n3 / Math.sqrt(2), -2 * n3 / Math.sqrt(2)];
    const dotv = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
    const pr = A0.UNIT.map(v => {
      const p = rotX(rotZ([dotv(v, e1), dotv(v, e2), dotv(v, [n3, n3, n3]) - 0.84], u * 0.22), 0.18);
      return proj([p[0], p[1], p[2]], cx, cy, sc * 4.2, 4.2);
    });
    A0.EDGES.forEach(([i, j]) => line(pr[i][0], pr[i][1], pr[j][0], pr[j][1], C.cyan, s * 0.12, 1));
    pr.forEach(q => dot(q[0], q[1], 6, 'c', s * 0.85));
    txt('?', cx + 230, cy + 24, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 1, 0.8) * A * 0.8 });
  }
  SPINE.ask(S, 1, 'What is the one small object every question will be put to?', '四个问题要交给的那个小对象是什么？');
};

Object.assign(FILM.speed, { a0_title: 0.6, a0_exam: 0.8, a0_score: 0.7, a0_tiers: 0.7, a0_no: 1.0, a0_ask: 0.5 });
/* ==== ACT:a0:END ==== */

/* ==== ACT:a1:BEGIN ==== */
/* Act a1 · Volume I · The shell, two clocks and the zeros · 第一卷 · 贝伦德球壳、双时钟与零点 (chapters 1–3).
   Summary (en): Volume I builds the one small laboratory every later question is put to: the nineteen integer points of
   x² + y² + z² = 867, joined by 135 edges that close 529 triangles, whose 23 arc angles keep exactly 22 rationally
   independent frequencies (one relation, θ136 = θ12 + θ68), and whose Laplacian has real rank 18 but needs 21 rational
   coordinates. Two quaternion clocks on the 724 and 804 edges fail to commute by one number, the defect E, a Gram
   determinant Lean checks is never negative; fed the Riemann zeros, a parameter-free rule keeps zeros 8, 15, 28, 31,
   38, 50, … with density 1/(2π) and, given RH (an external Lean proof, violet, not frozen here), their averages give
   Haar integrals, with Lean's Schur orthogonality and Cayley criterion as kernel-checked anchors. Finite windows
   (#11431, #8236, #8359) are interval certificates conditional on chosen inputs, and the bridge from global zero
   averages to a single zero's clock reading stays open.
   Summary (zh): 第一卷搭起全书每个问题都要交付的小实验台：x² + y² + z² = 867 的十九个整点，135 条边围出 529 个三角面，
   23 个弧角恰留 22 个有理独立频率（唯一关系 θ136 = θ12 + θ68），拉普拉斯实秩 18 却要 21 个有理坐标。724 与 804 两类边上的
   四元数双时钟以一个亏量 E 不交换，E 是 Lean 检验永不为负的格拉姆行列式；喂入黎曼零点，无参数挑选规则留下第 8、15、28、
   31、38、50 个……零点，密度 1/(2π)，在 RH（外部 Lean 证明，紫色，未在本库冻结）之下平均出哈尔积分，舒尔正交与凯莱判据
   是 Lean 内核检验的锚点。有限零点窗（#11431、#8236、#8359）是依赖选定输入的区间证书，从全局零点平均到单个零点时钟读数的
   桥梁仍是开放问题。
   What each scene shows, and where it rests:
     a1_title    the 19 non-negative integer solutions of x² + y² + z² = 867 = 3·17², seen along (1, 1, 1) so the
                 coordinate cycle σ is a 120° turn: the pole (17, 17, 17) and six orbits of three (computed here; the
                 choice of shell is a MODEL choice: argued; chapter 1 opening and def-ou-ch01-behrend-shell).
     a1_edges    pairs with squared chord ≤ 804: 135 of 171 kept, 529 triangles, 23 squared lengths (computed; 1.1).
     a1_freq     θj = arccos(1 − j/1734); P = (11, 11, 25), Q = (13, 13, 23), O = (17, 17, 17) lie in order on the great
                 circle x1 = x2, and α12·α68 = α136 exactly (computed); no other relation, so 22 independent frequencies
                 (Galois characters: argued, 1.2).
     a1_gram     the 19 × 19 Laplacian L = D − A, real rank 18 (computed); spanning trees τ and −τ ≡ 1 (mod 8)
                 (computed); the 2-adic Hasse veto of 18, 19, 20 and Meyer's 21 (certificate and argument: argued, 1.4).
     a1_clocks   e^{ip}, e^{iq} commute; U = cos p + i sin p, V = cos q + (i cos v + j sin v) sin q driven by γ, the
                 defect E = 1 + 2xyz − x² − y² − z² = |u × v|², |UV − VU|² = 4E (computed, def-ou-ch02-dual-clocks);
                 E as the three-anchor Gram determinant ..... OmegaBargmannHaarHecke.detGram3_nonneg (LEAN).
     a1_haar     the parameter-free selection u < sin²p sin²q |sin v| on the first 50 zeros: hits 8, 15, 28, 31, 38, 50
                 (computed from the published ordinates); density 1/(2π), maximal, Haar averages given RH (argued:
                 Weyl + external RH, 2.3); the compact-group tool ..... SchurOrthogonality.integral_dual_mul_dual_inv_self
                 (LEAN); the 1 TeV ratios 4.1259 and 0.1610 against 1.5 and 0.3 (quoted from 2.5, argued, MODEL).
     a1_zeros    RH and Dirichlet GRH as an external formalized fact (Alpöge; violet, never green; 3.1); the Cayley
                 criterion ..... CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion (LEAN); the
                 images (s − 1)/s of the first ten zeros on the circle (computed).
     a1_windows  #11431 midway between #11427 and #11436, Δ ∈ (1.6812114283, 1.6812114285)·10⁻⁶, runner-up #11628
                 35.60× (CERT, quoted from 3.4.1); density-one many beat it higher up (argued); #8236 and #8359 pass the
                 three windows given a chosen field table and cut (CERT / MODEL, quoted from 3.4.2); the bridge from
                 global averages to one zero's reading (OPEN, 3.5).
     a1_ask      the instrument of Volume I, and the next question.
   On load, FILM.init re-derives every computed number by an independent route and checks the cited theorems;
   any disagreement is pushed to window.FILM_ERRORS. */
const A1 = (() => {
  const GID = {
    gram: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg',
    schur: 'D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self',
    cayley: 'D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion'
  };
  /* ---------- the shell (definition def-ou-ch01-behrend-shell) ---------- */
  const R2 = 867;
  const PTS = [];
  for (let a = 0; a * a <= R2; a++) for (let b = 0; a * a + b * b <= R2; b++) {
    const c2 = R2 - a * a - b * b, c = Math.round(Math.sqrt(c2));
    if (c * c === c2) PTS.push([a, b, c]);
  }
  const key = p => p.join(',');
  const idx = new Map(PTS.map((p, i) => [key(p), i]));
  const sig = p => [p[1], p[2], p[0]];
  const POLE = idx.get('17,17,17');
  /* orbits of the coordinate cycle σ */
  const ORB = [], seen = new Set();
  PTS.forEach((p, i) => {
    if (seen.has(i)) return;
    const o = [i]; seen.add(i);
    for (let q = sig(p); !seen.has(idx.get(key(q))); q = sig(q)) { o.push(idx.get(key(q))); seen.add(idx.get(key(q))); }
    ORB.push(o);
  });
  const d2 = (i, j) => PTS[i].reduce((s, v, k) => s + (v - PTS[j][k]) ** 2, 0);
  const PAIRS = [];
  for (let i = 0; i < 19; i++) for (let j = i + 1; j < 19; j++) PAIRS.push([i, j, d2(i, j)]);
  PAIRS.sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);
  const EDGES = PAIRS.filter(e => e[2] <= 804), DROP = PAIRS.filter(e => e[2] > 804);
  const ADJ = Array.from({ length: 19 }, () => new Array(19).fill(0));
  EDGES.forEach(([i, j]) => { ADJ[i][j] = ADJ[j][i] = 1; });
  let TRI = 0;
  for (let i = 0; i < 19; i++) for (let j = i + 1; j < 19; j++) if (ADJ[i][j]) for (let k = j + 1; k < 19; k++) if (ADJ[i][k] && ADJ[j][k]) TRI++;
  const J23 = [...new Set(EDGES.map(e => e[2]))].sort((a, b) => a - b);
  const DEG = ADJ.map(r => r.reduce((s, v) => s + v, 0));
  const theta = j => Math.acos(1 - j / 1734);
  /* ---------- the 19 × 19 Laplacian, exact (BigInt, fraction-free Bareiss) ---------- */
  const LAP = ADJ.map((r, i) => r.map((v, j) => (i === j ? DEG[i] : -v)));
  function bareiss(M0) {
    const M = M0.map(r => r.map(v => BigInt(v))), n = M.length;
    let prev = 1n, sign = 1n;
    for (let k = 0; k < n - 1; k++) {
      if (M[k][k] === 0n) {
        const r = M.findIndex((row, i) => i > k && row[k] !== 0n);
        if (r < 0) return 0n;
        [M[k], M[r]] = [M[r], M[k]]; sign = -sign;
      }
      for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) M[i][j] = (M[i][j] * M[k][k] - M[i][k] * M[k][j]) / prev;
      prev = M[k][k];
    }
    return sign * M[n - 1][n - 1];
  }
  const TAU = bareiss(LAP.slice(0, 18).map(r => r.slice(0, 18)));   // matrix-tree theorem: the spanning trees
  /* ---------- quaternions (w, x, y, z) and the two clocks (definition def-ou-ch02-dual-clocks) ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const qinv = a => [a[0], -a[1], -a[2], -a[3]];   // unit quaternions
  const T244 = theta(244), T724 = theta(724), T804 = theta(804), T12 = theta(12), T200 = theta(200);
  function angles(g) {
    const p = (T724 - T244) * g, q = (T804 - T244) * g, v = T12 * g;
    const u = ((T200 * g / (2 * Math.PI)) % 1 + 1) % 1;
    return { p, q, v, u, thr: Math.sin(p) ** 2 * Math.sin(q) ** 2 * Math.abs(Math.sin(v)) };
  }
  function clocks(g) {
    const { p, q, v } = angles(g);
    const U = [Math.cos(p), Math.sin(p), 0, 0];
    const V = [Math.cos(q), Math.cos(v) * Math.sin(q), Math.sin(v) * Math.sin(q), 0];
    const x = U[0], y = V[0], z = qmul(U, qinv(V))[0];
    const E = 1 + 2 * x * y * z - x * x - y * y - z * z;
    return { p, q, v, U, V, x, y, z, E };
  }
  /* the first fifty positive ordinates of ζ zeros (standard published values, 18 significant digits) */
  const GAM = [14.1347251417346938, 21.022039638771555, 25.0108575801456888, 30.4248761258595132, 32.9350615877391897,
    37.5861781588256713, 40.9187190121474952, 43.3270732809149995, 48.0051508811671597, 49.7738324776723022,
    52.9703214777144606, 56.4462476970633948, 59.3470440026023531, 60.8317785246098098, 65.1125440480816067,
    67.0798105294941737, 69.5464017111739793, 72.0671576744819075, 75.7046906990839331, 77.1448400688748054,
    79.3373750202493680, 82.9103808540860302, 84.7354929805170501, 87.4252746131252294, 88.8091112076344654,
    92.4918992705584842, 94.6513440405198869, 95.8706342282453097, 98.8311942181936922, 101.317851005731391,
    103.725538040478339, 105.446623052326094, 107.168611184276408, 111.029535543169674, 111.874659176992637,
    114.320220915452712, 116.226680320857554, 118.790782865976217, 121.370125002420646, 122.946829293552588,
    124.256818554345767, 127.516683879596495, 129.578704199956051, 131.087688530932656, 133.497737202997586,
    134.756509753373871, 138.116042054533443, 139.736208952121388, 141.123707404021123, 143.111845807620632];
  const SEL = GAM.map((g, i) => Object.assign({ n: i + 1, g }, angles(g)));
  const HITS = SEL.filter(z => z.u < z.thr).map(z => z.n);
  const G8 = GAM[7];
  /* ---------- drawing ---------- */
  function rail(S, a = 1) { SPINE.rail(S, 1, a * clamp(S.u / 0.4) * clamp((S.d - S.u) / 0.4)); }
  /* the shell seen along (1, 1, 1): σ becomes a 120° turn about the centre; math y points up */
  function proj(p, o) {
    const n = Math.hypot(p[0], p[1], p[2]);
    const X = (p[0] - p[1]) / Math.SQRT2 / n, Y = (2 * p[2] - p[0] - p[1]) / Math.sqrt(6) / n;
    const c = Math.cos(o.phi || 0), s = Math.sin(o.phi || 0);
    return [o.cx + o.s * (X * c - Y * s), o.cy - o.s * (X * s + Y * c)];
  }
  /* the octant's spherical triangle, as the frame of the stage */
  function octant(o, a) {
    if (a <= 0.003) return;
    const ax = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    for (let k = 0; k < 3; k++) {
      const A = ax[k], B = ax[(k + 1) % 3];
      curve(t => proj([A[0] * Math.cos(t * Math.PI / 2) + B[0] * Math.sin(t * Math.PI / 2),
        A[1] * Math.cos(t * Math.PI / 2) + B[1] * Math.sin(t * Math.PI / 2),
        A[2] * Math.cos(t * Math.PI / 2) + B[2] * Math.sin(t * Math.PI / 2)], o), 40, C.vio, a * 0.45, 1.6);
    }
    [['x₁', [1, 0, 0]], ['x₂', [0, 1, 0]], ['x₃', [0, 0, 1]]].forEach(([n, v]) => {
      const [x, y] = proj(v, o), [cx, cy] = [o.cx, o.cy], d = Math.hypot(x - cx, y - cy) || 1;
      txt(n, x + (x - cx) / d * 26, y + (y - cy) / d * 26 + 8, { size: 22, fam: F.math, w: 700, align: 'center', c: C.vio, a: a * 0.8 });
    });
  }
  /* the 19 points, drawn in ORDER (pole first, then the orbits); f.count may be fractional (fade-in) */
  function points(o, a, f = {}) {
    if (a <= 0.003) return;
    const n = f.count == null ? 19 : f.count;
    ORDER.forEach((i, k) => {
      const ak = a * clamp(n - k);
      if (ak <= 0.003) return;
      const [x, y] = proj(PTS[i], o);
      const hl = f.hl && f.hl.includes(i), dim = f.dim && !hl ? f.dim : 1;
      if (i === POLE && f.pole) { ring(x, y, 16, C.now, ak * f.pole, 2.2); dot(x, y, 11, 'g', ak); }
      else if (hl) dot(x, y, 11, f.hlc || 'w', ak);
      else dot(x, y, 9, 'w', ak * dim);
    });
  }
  const ORDER = (() => { const o = [POLE]; ORB.filter(r => r.length === 3).forEach(r => o.push(...r)); return o; })();
  function leanChip(x, y, gid, a, size = 20) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`a1: film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short || r.name.split('.').pop(), x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  function strike(x, y, w, a, col = C.mag) { line(x - 6, y + 4, x + w + 6, y - 14, col, a, 4); }
  const tup = p => `(${p.join(', ')})`;
  const fmt = (v, k) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(k);
  const big = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return { GID, PTS, POLE, ORB, ORDER, EDGES, DROP, PAIRS, ADJ, TRI, J23, DEG, LAP, TAU, bareiss, theta, qmul, qinv,
    angles, clocks, GAM, SEL, HITS, G8, idx, rail, proj, octant, points, leanChip, strike, tup, fmt, big };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a1: ' + m); };
  Object.values(A1.GID).forEach(g => { const r = leanCite(g); check(r && r.kind === 'theorem', `${g} is not a cited theorem`); });
  /* the shell, by a second brute-force search with a different loop order */
  let n = 0; for (let c = 0; c <= 29; c++) for (let b = 0; b <= 29; b++) for (let a = 0; a <= 29; a++) if (a * a + b * b + c * c === 867) n++;
  check(n === 19 && A1.PTS.length === 19, '19 points');
  check(A1.ORB.length === 7 && A1.ORB.filter(o => o.length === 3).length === 6 && A1.ORB.filter(o => o.length === 1).length === 1, '1 + 6 × 3 orbits');
  check(A1.PTS[A1.POLE].join() === '17,17,17', 'the pole');
  check(867 === 3 * 17 * 17, '867 = 3 · 17²');
  check(A1.PAIRS.length === 171 && A1.EDGES.length === 135 && A1.DROP.length === 36, '135 of 171 pairs, 36 dropped');
  /* triangles counted again as trace(A³)/6 */
  const A = A1.ADJ, A2 = A.map(r => A.map((_, j) => r.reduce((s, v, k) => s + v * A[k][j], 0)));
  let tr = 0; for (let i = 0; i < 19; i++) for (let k = 0; k < 19; k++) tr += A2[i][k] * A[k][i];
  check(tr / 6 === 529 && A1.TRI === 529, '529 triangles');
  const BOOK = [12, 32, 52, 56, 68, 72, 136, 152, 172, 200, 216, 224, 244, 292, 296, 372, 392, 504, 512, 544, 632, 724, 804];
  check(JSON.stringify(A1.J23) === JSON.stringify(BOOK), 'the 23 squared lengths');
  check(A1.DEG.reduce((s, v) => s + v, 0) === 270, 'handshake 270');
  check(A1.DEG.slice().sort((a, b) => a - b).join() === '10,10,10,10,10,10,14,14,14,16,16,16,16,16,16,18,18,18,18', 'degrees');
  check(A1.EDGES.filter(e => e[2] === 724).length === 6 && A1.EDGES.filter(e => e[2] === 804).length === 6, 'six 724 and six 804 edges');
  /* the one relation, in integers: (287 + 24√−2)(49 + 10√−2) = 289 (47 + 14√−2), and cos θ12 = 287/289 etc. */
  check(287 * 49 - 2 * 24 * 10 === 289 * 47 && 287 * 10 + 24 * 49 === 289 * 14, 'α12 α68 = α136');
  check(1722 * 289 === 287 * 1734 && 1666 * 51 === 49 * 1734 && 1598 * 51 === 47 * 1734, 'the real parts');
  check(Math.abs(A1.theta(136) - A1.theta(12) - A1.theta(68)) < 1e-13, 'θ136 = θ12 + θ68');
  const P = A1.PTS[A1.idx.get('11,11,25')], Qp = A1.PTS[A1.idx.get('13,13,23')];
  check(P[0] === P[1] && Qp[0] === Qp[1], 'P, Q on the plane x1 = x2');
  check(A1.EDGES.some(e => e[2] === 12 && [e[0], e[1]].sort().join() === [A1.idx.get('11,11,25'), A1.idx.get('13,13,23')].sort().join()), 'PQ is a 12 edge');
  /* the Laplacian: rank 18 (an 18 × 18 minor is nonzero, every row sums to 0) */
  check(A1.LAP.every(r => r.reduce((s, v) => s + v, 0) === 0), 'Laplacian rows sum to 0');
  check(A1.TAU > 0n && A1.TAU === A1.bareiss(A1.LAP.slice(1).map(r => r.slice(1))), 'τ is the same for any deleted vertex');
  check(A1.TAU === 41501049051635045807n && ((-A1.TAU) % 8n + 8n) % 8n === 1n, 'τ and −τ ≡ 1 (mod 8)');
  /* the clocks: E three ways, and the group commutator */
  [3.1, 14.1347, 25.5, A1.G8, 77.7].forEach(g => {
    const c = A1.clocks(g);
    const u = c.U.slice(1), v = c.V.slice(1);
    const cr = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const crs = cr.reduce((s, x) => s + x * x, 0);
    const comm = A1.qmul(A1.qmul(c.U, c.V), A1.qmul(A1.qinv(c.U), A1.qinv(c.V)));
    const uv = A1.qmul(c.U, c.V), vu = A1.qmul(c.V, c.U), dd = uv.reduce((s, x, i) => s + (x - vu[i]) ** 2, 0);
    check(Math.abs(c.E - crs) < 1e-12, `E = |u × v|² at γ = ${g}`);
    check(Math.abs(c.E - Math.sin(c.p) ** 2 * Math.sin(c.q) ** 2 * Math.sin(c.v) ** 2) < 1e-12, `E = sin²p sin²q sin²v at ${g}`);
    check(Math.abs(comm[0] - (1 - 2 * c.E)) < 1e-12 && Math.abs(dd - 4 * c.E) < 1e-12, `commutator at ${g}`);
  });
  /* the zero sieve: the chapter's first six hits; and the count of the table against Riemann–von Mangoldt */
  check(A1.HITS.join() === '8,15,28,31,38,50', 'first fifty: hits 8, 15, 28, 31, 38, 50');
  check(A1.SEL.every(z => Math.abs(z.u - z.thr) > 1e-3), 'no ordinate near the selection boundary');
  { const T = 144, N = T / (2 * Math.PI) * Math.log(T / (2 * Math.PI * Math.E)) + 7 / 8; check(Math.abs(N - 50) < 1.5, 'N(144) ≈ 50'); }
  check(A1.GAM.every((g, i) => i === 0 || g > A1.GAM[i - 1]), 'ordinates increase');
  check(Math.abs(1 / (2 * Math.PI) - 0.159154943091895) < 1e-15, '1/(2π)');
  /* Cayley: |(s − 1)/s| = 1 on Re s = 1/2, and the first zero's image angle is 4.05° */
  A1.GAM.slice(0, 10).forEach(t => check(Math.abs(Math.hypot(-0.5, t) / Math.hypot(0.5, t) - 1) < 1e-15, 'critical line onto the circle'));
  { const t = A1.GAM[0], ang = Math.atan2(t, -0.5) - Math.atan2(t, 0.5);
    check(Math.abs(ang * 180 / Math.PI - 4.05) < 0.005, 'first zero at 4.05°'); }
  check(Math.abs(Math.hypot(-0.1, 1.2) / Math.hypot(0.9, 1.2) - 0.80277) < 1e-4, 'the off-line sample');
  /* quoted window numbers, internal consistency: the 23.670% closed-band bound and the occupied diagonal */
  check(Math.abs(4 / (12 + 2 * Math.sqrt(6)) - 0.23670068) < 1e-8, '4/(12 + 2√6)');
});

/* ================================ scenes ================================ */

SCENES.a1_title = S => {
  const u = S.u, a0 = at(S, 0, 0.6);
  SPINE.title(S, 1, '贝伦德球壳、双时钟与零点', 'The shell, two clocks and the zeros');
  A1.rail(S, a0);
  badgeQ(S, [[0, 'The answer', 'computed'], [3, null, 'argued']]);
  /* the stage turns slowly into the orientation the next scenes use */
  const o = { cx: 600, cy: 515, s: 360, phi: 0.5 * (1 - ease(u / S.d)) };
  A1.octant(o, a0);
  const grow = 19 * Q(S, 0, 'nineteen whole-number points', 2.6);
  const a2 = Q(S, 2, 'six orbits of three', 0.8);
  A1.ORB.filter(r => r.length === 3).forEach(r => {
    for (let k = 0; k < 3; k++) {
      const [x1, y1] = A1.proj(A1.PTS[r[k]], o), [x2, y2] = A1.proj(A1.PTS[r[(k + 1) % 3]], o);
      dashed(x1, y1, x2, y2, C.cyan, a2 * 0.55, 1.6);
    }
  });
  A1.points(o, a0, { count: grow, pole: Q(S, 2, 'one pole', 0.5) });
  txt(`${Math.min(19, Math.floor(grow + 0.001))} points`, 160, 800, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a0 });
  txt('view along (1, 1, 1) · σ = a 120° turn', 160, 830, { size: 18, fam: F.mono, c: C.dim, a: a2 });
  /* the equation and the orbit table */
  const a1 = at(S, 1, 0.6);
  panel(1040, 205, 740, 590, a1, C.cyan, 'THE SHELL · 十九点贝伦德球壳 · V₁₉');
  txt('x² + y² + z² = 867', 1075, 292, { size: 50, fam: F.math, w: 700, c: C.white, a: a1 });
  txt('= 3 · 17²', 1075, 350, { size: 40, fam: F.math, w: 700, c: C.cyan, a: a1 * Q(S, 1, 'three times seventeen squared', 0.5) });
  txt('x, y, z non-negative integers', 1300, 345, { size: 20, fam: F.mono, c: C.dim, a: a1 });
  const b2 = at(S, 2, 0.6);
  txt('σ(x₁, x₂, x₃) = (x₂, x₃, x₁)', 1075, 410, { size: 28, fam: F.math, w: 700, c: C.white, a: b2 });
  const rows = [
    ['(17, 17, 17)', '1', 'pole', C.now],
    ['(13, 13, 23)', '3', 'inner', C.white],
    ['(11, 11, 25)', '3', '', C.white],
    ['(7, 17, 23) · (7, 23, 17)', '3 + 3', 'middle', C.white],
    ['(1, 5, 29) · (1, 29, 5)', '3 + 3', 'outer', C.white]
  ];
  rows.forEach(([p, n, role, col], i) => {
    const y = 462 + i * 44, aa = b2 * clamp((u - lineAt(S, 2).s - 0.25 * i) / 0.4);
    txt(p, 1075, y, { size: 24, fam: F.mono, w: 700, c: col, a: aa });
    txt(n, 1530, y, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: aa });
    txt(role, 1560, y, { size: 20, fam: F.mono, c: C.dim, a: aa });
  });
  txt('1 + 6 × 3 = 19', 1075, 690, { size: 26, fam: F.math, w: 700, c: C.cyan, a: Q(S, 2, 'six orbits of three', 0.6) });
  const a3 = at(S, 3, 0.6);
  txt('MODEL · choosing this shell', 1075, 745, { size: 22, fam: F.mono, w: 700, c: C.argued, a: a3 });
  txt('then: exact arithmetic · 之后皆硬算术', 1075, 778, { size: 22, fam: F.mono, w: 700, c: C.white, a: Q(S, 3, 'everything is hard arithmetic', 0.5) });
};

SCENES.a1_edges = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  const o = { cx: 600, cy: 515, s: 360, phi: 0 };
  A1.octant(o, clamp(u / 0.4) * 0.8);
  /* edges in order of squared length, swept during line 0 */
  const s0 = lineAt(S, 0).s, e0 = lineAt(S, 0).e;
  const cnt = A1.EDGES.length * clamp((u - s0 - 0.6) / Math.max(1, e0 - s0));
  const a2 = at(S, 2, 0.5);
  const kJ = a2 > 0 ? Math.min(22, Math.floor((u - lineAt(S, 2).s) / Math.max(0.2, (lineAt(S, 2).e - lineAt(S, 2).s + 0.4) / 23))) : -1;
  const curJ = kJ >= 0 ? A1.J23[kJ] : null;
  /* the 529 triangles as faint magenta areas */
  const aT = Q(S, 1, 'five hundred twenty-nine triangles', 0.8);
  if (aT > 0.003) {
    const A = A1.ADJ;
    ctx.save(); ctx.globalAlpha = aT * 0.006; ctx.fillStyle = C.mag;
    for (let i = 0; i < 19; i++) for (let j = i + 1; j < 19; j++) if (A[i][j]) for (let k = j + 1; k < 19; k++) if (A[i][k] && A[j][k]) {
      const p = [i, j, k].map(t => A1.proj(A1.PTS[t], o));
      ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); ctx.lineTo(p[1][0], p[1][1]); ctx.lineTo(p[2][0], p[2][1]); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
  A1.EDGES.forEach(([i, j, d], k) => {
    if (k >= cnt) return;
    const [x1, y1] = A1.proj(A1.PTS[i], o), [x2, y2] = A1.proj(A1.PTS[j], o);
    const newest = cnt < A1.EDGES.length && k > cnt - 4;
    const cur = curJ != null && d === curJ;
    line(x1, y1, x2, y2, newest || cur ? C.now : C.cyan, newest || cur ? 0.95 : 0.32, newest || cur ? 2.6 : 1.3);
  });
  /* the 36 dropped chords, flashed during line 1 */
  const aD = Q(S, 1, 'one hundred seventy-one pairs', 0.5) * (1 - Q(S, 1, 'five hundred twenty-nine', 0.6));
  A1.DROP.forEach(([i, j]) => { const [x1, y1] = A1.proj(A1.PTS[i], o), [x2, y2] = A1.proj(A1.PTS[j], o); dashed(x1, y1, x2, y2, C.dim, aD * 0.7, 1.2); });
  A1.points(o, clamp(u / 0.4), { pole: 0 });
  /* the counts */
  const a0 = at(S, 0, 0.6);
  panel(1040, 205, 740, 590, a0, C.cyan, 'EDGES · 原边 · E₁₃₅');
  txt('|A − B|² ≤ 804', 1075, 290, { size: 46, fam: F.math, w: 700, c: C.white, a: a0 });
  const shown = Math.floor(cnt + 1e-9);
  const dNow = shown > 0 ? A1.EDGES[Math.min(shown, 135) - 1][2] : 0;
  txt(`kept ${shown} / 171 pairs`, 1075, 340, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a0 });
  txt(`d² = ${dNow}`, 1500, 340, { size: 26, fam: F.mono, w: 700, c: C.now, a: a0 * (cnt < 135 ? 1 : 0.0) });
  const a1 = Q(S, 1, 'one hundred thirty-five survive', 0.5);
  txt('135 edges', 1075, 412, { size: 44, fam: F.disp, w: 700, c: C.cyan, a: a1 });
  txt('36 longest chords dropped', 1330, 410, { size: 21, fam: F.mono, c: C.dim, a: a1 });
  txt('529 triangles · 三角面', 1075, 472, { size: 40, fam: F.disp, w: 700, c: C.mag, a: aT });
  /* the 23 squared lengths */
  txt('23 squared lengths · 23 种平方弦长', 1075, 530, { size: 22, fam: F.mono, w: 700, c: C.white, a: a2 });
  A1.J23.forEach((j, k) => {
    const r = Math.floor(k / 6), c = k % 6, x = 1112 + c * 116, y = 580 + r * 52;
    const aa = a2 * clamp((u - lineAt(S, 2).s) / 0.3 - k * 0.08 + 0.3);
    chip(x, y, 100, 40, String(j), k === kJ ? C.now : C.cyan, aa, 22);
  });
};

SCENES.a1_freq = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  const o = { cx: 560, cy: 515, s: 360, phi: 0 };
  const iP = A1.idx.get('11,11,25'), iQ = A1.idx.get('13,13,23'), iO = A1.POLE;
  const a2 = at(S, 2, 0.6);
  A1.octant(o, clamp(u / 0.4) * 0.8);
  /* the great circle x1 = x2: seen edge-on, a straight line through the centre */
  const [tx, ty] = A1.proj([0, 0, 1], o), [bx, by] = A1.proj([1, 1, 0], o);
  dashed(tx, ty, bx, by, C.cyan, a2 * 0.7, 1.6);
  txt('great circle x₁ = x₂', tx + 16, ty + 40, { size: 20, fam: F.mono, c: C.cyan, a: a2 });
  A1.points(o, clamp(u / 0.4), { dim: 0.25 + 0.75 * (1 - a2), hl: a2 > 0.01 ? [iP, iQ, iO] : [], hlc: 'w' });
  const [Px, Py] = A1.proj(A1.PTS[iP], o), [Qx, Qy] = A1.proj(A1.PTS[iQ], o), [Ox, Oy] = A1.proj(A1.PTS[iO], o);
  if (a2 > 0.003) {
    const b1 = Q(S, 2, 'theta twelve', 0.5), b2 = Q(S, 2, 'theta sixty-eight', 0.5), b3 = Q(S, 2, 'theta one thirty-six', 0.5);
    const lb = Px - 34;
    line(lb, Py, lb, Qy - 3, C.cyan, a2 * b1, 3); line(lb - 8, Py, lb + 8, Py, C.cyan, a2 * b1, 2); line(lb - 8, Qy - 3, lb + 8, Qy - 3, C.cyan, a2 * b1, 2);
    txt('θ₁₂', lb - 16, (Py + Qy) / 2 + 9, { size: 26, fam: F.math, w: 700, align: 'right', c: C.cyan, a: a2 * b1 });
    line(lb, Qy + 3, lb, Oy, C.cyan, a2 * b2, 3); line(lb - 8, Qy + 3, lb + 8, Qy + 3, C.cyan, a2 * b2, 2); line(lb - 8, Oy, lb + 8, Oy, C.cyan, a2 * b2, 2);
    txt('θ₆₈', lb - 16, (Qy + Oy) / 2 + 9, { size: 26, fam: F.math, w: 700, align: 'right', c: C.cyan, a: a2 * b2 });
    const rb = Px + 34;
    line(rb, Py, rb, Oy, C.now, a2 * b3, 3); line(rb - 8, Py, rb + 8, Py, C.now, a2 * b3, 2); line(rb - 8, Oy, rb + 8, Oy, C.now, a2 * b3, 2);
    txt('θ₁₃₆', rb + 14, (Py + Oy) / 2 + 9, { size: 26, fam: F.math, w: 700, c: C.now, a: a2 * b3 });
    [['P (11, 11, 25)', Py], ['Q (13, 13, 23)', Qy], ['O (17, 17, 17)', Oy]].forEach(([s, y], i) =>
      txt(s, Px + 140, y + 7 + (i === 0 ? -6 : i === 1 ? 6 : 0), { size: 20, fam: F.mono, w: 700, c: C.white, a: a2 }));
  }
  /* the arc angles */
  const a0 = at(S, 0, 0.6);
  panel(1000, 205, 780, 610, a0, C.cyan, 'ARC FREQUENCIES · 原弧频率');
  txt('θⱼ = arccos(1 − j / 1734)', 1035, 285, { size: 38, fam: F.math, w: 700, c: C.white, a: a0 });
  txt('1734 = 2 · 867 · j ∈ the 23 squared lengths', 1035, 322, { size: 19, fam: F.mono, c: C.dim, a: a0 });
  txt('cos θ₁₂ = 1 − 12/1734 = 287/289', 1035, 362, { size: 24, fam: F.math, w: 700, c: C.cyan, a: Q(S, 0, 'seventeen thirty-four', 0.5) });
  const a1 = at(S, 1, 0.6), a3 = at(S, 3, 0.6);
  A1.J23.forEach((j, k) => {
    const r = Math.floor(k / 6), c = k % 6, x = 1085 + c * 112, y = 415 + r * 46;
    const drop = j === 136;
    chip(x, y, 98, 36, `θ${j}`, drop && a2 > 0.5 ? C.now : C.cyan, a1 * (drop ? 1 : 1 - 0.5 * a3), 20, F.math);
    if (drop) A1.strike(x - 46, y + 6, 92, Q(S, 3, 'every other relation', 0.4) * a1, C.mag);
  });
  txt('independent over ℚ ?', 1035, 610, { size: 24, fam: F.mono, w: 700, c: C.white, a: a1 * (1 - a3) });
  txt('θ₁₃₆ = θ₁₂ + θ₆₈', 1035, 662, { size: 38, fam: F.math, w: 700, c: C.now, a: a2 });
  txt('(287 + 24√−2)/289 · (49 + 10√−2)/51', 1035, 702, { size: 21, fam: F.math, c: C.white, a: a2 * Q(S, 2, 'one great circle', 0.5) });
  txt('= (47 + 14√−2)/51 · α₁₂ α₆₈ = α₁₃₆ exactly', 1035, 732, { size: 21, fam: F.math, c: C.white, a: a2 * Q(S, 2, 'one great circle', 0.5) });
  txt('23 − 1 = 22', 1035, 790, { size: 34, fam: F.disp, w: 700, c: C.cyan, a: a3 });
  txt('ℚ-independent frequencies', 1290, 788, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: Q(S, 3, 'twenty-two independent', 0.5) });
};

SCENES.a1_gram = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  const a0 = at(S, 0, 0.6), a1 = at(S, 1, 0.6);
  /* the Laplacian, vertices in orbit order */
  const ord = A1.ORDER, cs = 23, mx = 200, my = 262;
  txt('L = D − A · 19 × 19', mx, my - 26, { size: 26, fam: F.math, w: 700, c: C.white, a: a0 });
  for (let r = 0; r < 19; r++) for (let c = 0; c < 19; c++) {
    const v = A1.LAP[ord[r]][ord[c]], ak = a0 * clamp((u - lineAt(S, 0).s) * 2.2 - (r + c) * 0.06);
    if (ak <= 0.003) continue;
    if (r === c) fillBox(mx + c * cs + 1, my + r * cs + 1, cs - 2, cs - 2, C.white, ak * (0.25 + 0.6 * v / 18));
    else if (v !== 0) fillBox(mx + c * cs + 1, my + r * cs + 1, cs - 2, cs - 2, C.cyan, ak * 0.55);
    else box(mx + c * cs + 1, my + r * cs + 1, cs - 2, cs - 2, C.dim, ak * 0.25, 0.6);
  }
  txt('diagonal: degree · cyan: −1 · rows sum to 0', mx, my + 19 * cs + 32, { size: 18, fam: F.mono, c: C.dim, a: a0 });
  txt('real rank 18 · kernel = constants', mx, my + 19 * cs + 72, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: Q(S, 0, 'real rank eighteen', 0.5) });
  /* the dimension ladder */
  const lx = 820;
  txt('ℝ: Cholesky with square roots', lx, 270, { size: 22, fam: F.mono, w: 700, c: C.white, a: Q(S, 0, 'real square roots', 0.5) });
  chip(lx + 80, 322, 150, 58, 'ℝ¹⁸', C.cyan, Q(S, 0, 'eighteen dimensions', 0.5), 36, F.math);
  txt('ℚ: rational coordinates only', lx, 415, { size: 22, fam: F.mono, w: 700, c: C.white, a: a1 });
  ['ℚ¹⁸', 'ℚ¹⁹', 'ℚ²⁰'].forEach((s, i) => {
    const x = lx + 80 + i * 190, ph = ['vetoes eighteen', 'nineteen', 'and twenty'][i];
    chip(x, 467, 150, 58, s, C.white, a1 * (1 - 0.4 * Q(S, 1, ph, 0.4)), 36, F.math);
    A1.strike(x - 70, 475, 140, Q(S, 1, ph, 0.4), C.mag);
  });
  chip(lx + 80 + 3 * 190, 467, 150, 58, 'ℚ²¹', C.now, Q(S, 1, 'The minimum is twenty-one', 0.5), 36, F.math);
  txt('+3 hidden dimensions', lx + 3 * 190 + 6, 528, { size: 20, fam: F.mono, w: 700, c: C.mag, a: Q(S, 1, 'The minimum is twenty-one', 0.5) });
  /* why */
  const a2 = Q(S, 1, 'a two-adic Hasse symbol', 0.6);
  panel(lx, 560, 960, 250, a2, C.argued, 'THE 2-ADIC VETO · 2-进哈塞障碍 · CERT / ARGUED');
  txt(`τ = det(L minus a vertex) = ${A1.big(A1.TAU.toString())}`, lx + 28, 628, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a2 });
  txt('spanning trees, computed here · −τ ≡ 1 (mod 8): −τ is a 2-adic square', lx + 28, 662, { size: 19, fam: F.mono, c: C.cyan, a: a2 });
  txt('so every binary form of that determinant has (x, −τ)₂ = +1,', lx + 28, 708, { size: 19, fam: F.mono, c: C.white, a: a2 });
  txt('but the embedding needs the Hasse symbol −1 at p = 2 (also 11, 17, 71)', lx + 28, 738, { size: 19, fam: F.mono, c: C.white, a: a2 });
  txt('18, 19, 20 refused · Meyer: 18 + 3 = 21 always suffices', lx + 28, 780, { size: 19, fam: F.mono, w: 700, c: C.argued, a: a2 * Q(S, 1, 'The minimum', 0.5) });
};

SCENES.a1_clocks = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'lean']]);
  /* line 0: two complex phases commute */
  const a0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.45));
  [[340, 'e^(ip)', 0.9], [700, 'e^(iq)', 1.37]].forEach(([x, s, w], i) => {
    if (a0 <= 0.003) return;
    const y = 450, r = 120, ang = w * u + i;
    ring(x, y, r, C.cyan, a0, 2.5);
    line(x, y, x + r * Math.cos(ang), y - r * Math.sin(ang), C.now, a0, 4);
    dot(x + r * Math.cos(ang), y - r * Math.sin(ang), 9, 'g', a0);
    txt(s, x, y + r + 50, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: a0 });
  });
  txt('e^(ip) · e^(iq) = e^(iq) · e^(ip)', 520, 720, { size: 34, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a0 * Q(S, 0, 'always commute', 0.5) });
  /* lines 1+: the i–j plane of the two imaginary parts, driven by γ */
  const a1 = at(S, 1, 0.7, 0.5);
  const t0 = lineAt(S, 1).s, t1 = lineAt(S, 3).s;
  const g = lerp(A1.GAM[0], A1.G8, ease((u - t0) / Math.max(1, t1 - t0)));
  const c = A1.clocks(g);
  const ox = 540, oy = 515, sc = 270;
  if (a1 > 0.003) {
    dashed(ox - 300, oy, ox + 300, oy, C.vio, a1 * 0.6, 1.4);
    dashed(ox, oy + 300, ox, oy - 300, C.vio, a1 * 0.6, 1.4);
    txt('i', ox + 312, oy + 8, { size: 26, fam: F.math, w: 700, c: C.vio, a: a1 });
    txt('j', ox - 8, oy - 312, { size: 26, fam: F.math, w: 700, c: C.vio, a: a1 });
    const U = [c.U[1], c.U[2]], V = [c.V[1], c.V[2]];
    const pt = v => [ox + sc * v[0], oy - sc * v[1]];
    const aE = Q(S, 2, 'the defect E', 0.6);
    const p1 = pt(U), p2 = pt(V), p3 = pt([U[0] + V[0], U[1] + V[1]]);
    ctx.save(); ctx.globalAlpha = a1 * aE * 0.32; ctx.fillStyle = C.mag; ctx.beginPath();
    ctx.moveTo(ox, oy); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(p3[0], p3[1]); ctx.lineTo(p2[0], p2[1]); ctx.closePath(); ctx.fill(); ctx.restore();
    dashed(p1[0], p1[1], p3[0], p3[1], C.mag, a1 * aE * 0.8, 1.4); dashed(p2[0], p2[1], p3[0], p3[1], C.mag, a1 * aE * 0.8, 1.4);
    arrow(ox, oy, p1[0], p1[1], C.cyan, a1, 3.5);
    arrow(ox, oy, p2[0], p2[1], C.cyan, a1, 3.5);
    txt('u = Im U', p1[0] + (U[0] >= 0 ? 14 : -14), p1[1] + 34, { size: 22, fam: F.mono, w: 700, align: U[0] >= 0 ? 'left' : 'right', c: C.cyan, a: a1 });
    txt('v = Im V', p2[0] + (V[0] >= 0 ? 14 : -14), p2[1] + (V[1] >= 0 ? -14 : 34), { size: 22, fam: F.mono, w: 700, align: V[0] >= 0 ? 'left' : 'right', c: C.cyan, a: a1 });
    txt('area² = E', ox - 290, oy + 290, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a1 * aE });
  }
  /* the readouts */
  const b1 = at(S, 1, 0.6, 0.5);
  panel(1000, 205, 780, 610, b1, C.cyan, 'TWO QUATERNION CLOCKS · 四元数双时钟');
  txt('U = cos p + i sin p', 1035, 278, { size: 26, fam: F.math, w: 700, c: C.white, a: b1 });
  txt('V = cos q + (i cos v + j sin v) sin q', 1035, 316, { size: 26, fam: F.math, w: 700, c: C.white, a: b1 });
  txt('p = (θ₇₂₄ − θ₂₄₄)γ   q = (θ₈₀₄ − θ₂₄₄)γ   v = θ₁₂γ', 1035, 352, { size: 19, fam: F.math, c: C.dim, a: b1 });
  const frozen = u >= t1;
  txt(`γ = ${A1.fmt(g, 5)}`, 1035, 404, { size: 30, fam: F.mono, w: 700, c: C.now, a: b1 });
  txt(frozen ? 'zero #8 · 第 8 个零点' : 'driven by the height γ', 1320, 402, { size: 20, fam: F.mono, c: C.dim, a: b1 });
  txt(`x = ${A1.fmt(c.x, 4)}   y = ${A1.fmt(c.y, 4)}   z = ${A1.fmt(c.z, 4)}`, 1035, 446, { size: 22, fam: F.mono, w: 700, c: C.white, a: b1 });
  const b2 = at(S, 2, 0.6);
  txt('E = 1 + 2xyz − x² − y² − z²', 1035, 500, { size: 28, fam: F.math, w: 700, c: C.white, a: b2 });
  txt(`= |u × v|² = ${A1.fmt(c.E, 5)}`, 1035, 542, { size: 28, fam: F.math, w: 700, c: C.mag, a: b2 });
  txt(`|UV − VU|² = 4E = ${A1.fmt(4 * c.E, 5)}`, 1035, 584, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: b2 * Q(S, 2, 'the squared area', 0.5) });
  const b3 = at(S, 3, 0.6);
  txt('E = det G₃(1, U, V): the Gram determinant of 1, U, V', 1035, 636, { size: 19, fam: F.mono, c: C.white, a: b3 });
  A1.leanChip(1035, 690, A1.GID.gram, Q(S, 3, 'Lean checks', 0.5), 20);
  txt('0 ≤ det G₃(a, b, c) = 1 + 2B − (κ(a,b) + κ(b,c) + κ(c,a))', 1035, 735, { size: 19, fam: F.math, c: C.lean, a: Q(S, 3, 'Lean checks', 0.5) });
  txt('for all nonzero integer quaternions a, b, c', 1035, 768, { size: 19, fam: F.mono, c: C.lean, a: Q(S, 3, 'Lean checks', 0.5) });
};

SCENES.a1_haar = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued'], [4, null, 'lean'], [5, null, 'argued']]);
  const a0 = at(S, 0, 0.6);
  txt('p = (θ₇₂₄ − θ₂₄₄)γ    q = (θ₈₀₄ − θ₂₄₄)γ    v = θ₁₂γ    u = {θ₂₀₀γ / 2π}', W / 2, 215, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: a0 });
  txt('keep the zero  ⇔  u < sin²p · sin²q · |sin v|', W / 2, 256, { size: 28, fam: F.math, w: 700, align: 'center', c: C.now, a: at(S, 1, 0.6) });
  /* the sieve on the first fifty zeros */
  const X0 = 175, DX = 32, BASE = 545, HT = 230;
  const sw = 50 * clamp((u - lineAt(S, 1).s - 0.3) / Math.max(1, lineAt(S, 1).e - lineAt(S, 1).s + 0.8));
  line(X0 - 20, BASE, X0 + 49 * DX + 20, BASE, C.cyan, a0 * 0.8, 1.6);
  line(X0 - 20, BASE - HT, X0 - 20, BASE, C.dim, a0 * 0.6, 1);
  txt('1', X0 - 30, BASE - HT + 7, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: a0 });
  txt('0', X0 - 30, BASE + 6, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: a0 });
  A1.SEL.forEach((z, k) => {
    const x = X0 + k * DX, ak = a0 * clamp((u - lineAt(S, 0).s) * 3 - k * 0.06);
    if (ak <= 0.003) return;
    line(x, BASE, x, BASE + 9, C.white, ak * 0.8, 1.6);
    if ((k + 1) % 10 === 0 || k === 0) txt(`#${k + 1}`, x, BASE + 32, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: ak });
    const shown = clamp(sw - k);
    if (shown <= 0.003) return;
    const hit = z.u < z.thr, cur = sw < 50 && k === Math.floor(sw);
    const h = HT * z.thr;
    if (hit) fillBox(x - 10, BASE - h, 20, h, C.cyan, shown * 0.55);
    box(x - 10, BASE - h, 20, h, cur ? C.now : C.cyan, shown * (hit ? 1 : 0.5), cur ? 2.4 : 1.2);
    dot(x, BASE - HT * z.u, 6, hit ? 'w' : 'c', shown * (hit ? 1 : 0.55));
    if (hit) txt(`#${z.n}`, x, BASE - Math.max(h, HT * z.u) - 16, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: shown * Q(S, 2, 'six pass', 0.5) });
  });
  txt('bar: sin²p sin²q |sin v| · dot: u · first 50 zeros, published ordinates', X0 - 20, BASE + 62, { size: 18, fam: F.mono, c: C.dim, a: at(S, 1, 0.6) });
  const nHit = A1.SEL.filter((z, k) => k < Math.floor(sw + 1e-9) && z.u < z.thr).length;
  txt(`kept ${nHit} / ${Math.min(50, Math.floor(sw + 1e-9))}`, X0 + 49 * DX + 20, BASE + 62, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: at(S, 1, 0.6) });
  /* three panels: density, Schur, the 1 TeV check */
  const a3 = at(S, 3, 0.6);
  panel(140, 628, 540, 200, a3, C.argued, 'GIVEN RH · DENSITY · 密度');
  txt('ρ = 1/(2π) ≈ 0.159154943…', 165, 696, { size: 28, fam: F.math, w: 700, c: C.white, a: a3 });
  txt('the largest possible (ess sup w = 2π)', 165, 732, { size: 18, fam: F.mono, c: C.white, a: a3 * Q(S, 3, 'the largest possible', 0.4) });
  txt('averages → Haar integrals, U(1)×SU(2)×SU(3)', 165, 764, { size: 18, fam: F.mono, c: C.white, a: a3 * Q(S, 3, 'Haar integrals', 0.4) });
  txt('22 = 4 + 2 + 16 shell frequencies · 16/128 kept', 165, 796, { size: 18, fam: F.mono, c: C.argued, a: a3 * Q(S, 3, 'Haar integrals', 0.4) });
  const a4 = at(S, 4, 0.6);
  panel(700, 628, 540, 200, a4, C.lean, 'SCHUR ORTHOGONALITY · 舒尔正交');
  A1.leanChip(725, 694, A1.GID.schur, a4, 17);
  txt('∫ φ(ρ(g)v) ψ(ρ(g⁻¹)w) dμ = μ(G) φ(w) ψ(v) / dim V', 725, 744, { size: 18, fam: F.math, c: C.lean, a: a4 });
  txt('ρ a continuous irreducible complex representation', 725, 776, { size: 17, fam: F.mono, c: C.white, a: a4 });
  txt('of a compact group G with Haar measure μ', 725, 802, { size: 17, fam: F.mono, c: C.white, a: a4 });
  const a5 = at(S, 5, 0.6);
  panel(1260, 628, 520, 200, a5, C.argued, 'MODEL · 2D DIFFUSION, D = 0 · 1 TeV');
  txt('ratio', 1285, 694, { size: 18, fam: F.mono, c: C.dim, a: a5 });
  txt('unified', 1440, 694, { size: 18, fam: F.mono, c: C.dim, a: a5 });
  txt('1 TeV', 1620, 694, { size: 18, fam: F.mono, c: C.dim, a: a5 });
  [['λC / λW', '1.5', '4.1259'], ['λe / λW', '0.3', '0.1610']].forEach(([r, uq, tv], i) => {
    const y = 736 + i * 38;
    txt(r, 1285, y, { size: 24, fam: F.math, w: 700, c: C.white, a: a5 });
    txt(uq, 1440, y, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a5 });
    txt(tv, 1620, y, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a5 * Q(S, 5, 'miss the unified ratios', 0.5) });
  });
  txt('a sampler, not a dynamics', 1285, 812, { size: 17, fam: F.mono, c: C.dim, a: a5 });
};

SCENES.a1_zeros = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'lean']]);
  const a0 = at(S, 0, 0.6), a1 = at(S, 1, 0.6), dimL = 1 - 0.55 * at(S, 2, 0.8);
  panel(140, 205, 780, 610, a0 * dimL, C.argued, 'EXTERNAL FORMALIZED FACT · 外部形式化事实');
  const L = [
    ['RH and Dirichlet GRH', 36, C.white, 700, F.disp, 290],
    ['Lean 4 proof by Levent Alpöge · 20 Nov 2026', 21, C.white, 700, F.mono, 345],
    ['175,187 modules · axioms: propext, Classical.choice,', 19, C.white, 400, F.mono, 385],
    ['Quot.sound · replayed by independent kernels', 19, C.white, 400, F.mono, 413],
    ['certified 21 Nov 2026 by Lean FRO and Mathlib Initiative', 19, C.white, 400, F.mono, 447]
  ];
  L.forEach(([s, size, c, w, fam, y], i) => txt(s, 170, y, { size, fam, w, c, a: a0 * dimL * (i === 0 ? 1 : Q(S, 0, 'Lean proof of RH', 0.5, 0.1 * i)) }));
  txt('not frozen in trureturing@dev', 170, 530, { size: 24, fam: F.mono, w: 700, c: C.argued, a: a1 * dimL });
  txt('→ violet, never green · 紫色，不是绿色', 170, 568, { size: 22, fam: F.mono, w: 700, c: C.argued, a: a1 * dimL * Q(S, 1, 'never green', 0.5) });
  txt('scope: ζ and Dirichlet L-functions over ℚ', 170, 632, { size: 20, fam: F.mono, c: C.white, a: a1 * dimL * Q(S, 1, 'says nothing about physics', 0.5) });
  txt('physics: untouched · 物理：不受其约束', 170, 668, { size: 20, fam: F.mono, w: 700, c: C.white, a: a1 * dimL * Q(S, 1, 'says nothing about physics', 0.5) });
  /* the Cayley picture */
  const a2 = at(S, 2, 0.7);
  if (a2 <= 0.003) return;
  A1.leanChip(980, 240, A1.GID.cayley, a2, 18);
  txt('|cayleyCoefficient(s)| = 1  ⇔  Re s = ½', 980, 284, { size: 22, fam: F.math, w: 700, c: C.lean, a: a2 });
  const a3 = at(S, 3, 0.6);
  txt('RH  ⇔  logarithmicRadialDefect(ρ) = 0 for every nontrivial zero ρ', 980, 318, { size: 18, fam: F.math, w: 700, c: C.lean, a: a3 });
  /* s-plane: 0 ≤ Re s ≤ 1, 0 ≤ t ≤ 50 */
  const sx = re => 1000 + 240 * re, sy = t => 800 - 8.6 * t;
  box(sx(0), sy(50), 240, sy(0) - sy(50), C.dim, a2 * 0.5, 1);
  line(sx(0.5), sy(0), sx(0.5), sy(50), C.cyan, a2, 2.5);
  txt('Re s = ½', sx(0.5), sy(0) + 28, { size: 18, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a2 });
  txt('s', sx(0) - 14, sy(50) + 18, { size: 22, fam: F.math, w: 700, align: 'right', c: C.white, a: a2 });
  const Z10 = A1.GAM.slice(0, 10);
  Z10.forEach(t => dot(sx(0.5), sy(t), 6, 'w', a2));
  /* the moving point s = ½ + it and its image w = (s − 1)/s */
  const tt = 50 * Math.pow(clamp((u - lineAt(S, 2).s) / Math.max(1, lineAt(S, 2).e - lineAt(S, 2).s)), 1.6);
  const w = t => [(t * t - 0.25) / (t * t + 0.25), t / (t * t + 0.25)];
  const cx = 1575, cy = 575, R = 175;
  arrow(1262, cy, 1370, cy, C.white, a2 * 0.8, 2.2);
  txt('w = (s − 1)/s', 1316, cy - 18, { size: 20, fam: F.math, w: 700, align: 'center', c: C.white, a: a2 });
  ring(cx, cy, R, C.cyan, a2, 2.5);
  line(cx - R - 14, cy, cx + R + 14, cy, C.dim, a2 * 0.4, 1);
  txt('−1', cx - R + 10, cy + 26, { size: 18, fam: F.math, c: C.dim, a: a2 });
  txt('1', cx + R + 22, cy + 24, { size: 18, fam: F.math, c: C.dim, a: a2 });
  { const f0 = Math.PI, f1 = Math.PI - 2 * Math.atan(2 * tt);
    curve(k => { const f = lerp(f0, f1, k); return [cx + R * Math.cos(f), cy - R * Math.sin(f)]; }, 160, C.now, a2 * 0.8, 3); }
  Z10.forEach(t => { if (t <= tt) { const q = w(t); dot(cx + R * q[0], cy - R * q[1], 6, 'w', a2); } });
  dot(sx(0.5), sy(tt), 10, 'g', a2 * (tt < 49.9 ? 1 : 0.5));
  { const q = w(tt); dot(cx + R * q[0], cy - R * q[1], 10, 'g', a2 * (tt < 49.9 ? 1 : 0.5)); }
  txt('first ten zeros, all near 1 (#1 at 4.05°)', 1300, 832, { size: 18, fam: F.mono, c: C.white, a: a2 * clamp((tt - 14) / 3) });
  /* any off-line s lands off the circle */
  const so = [0.9, 1.2], wo = (() => { const [a, b] = so, d = a * a + b * b; return [((a - 1) * a + b * b) / d, (b * a - (a - 1) * b) / d]; })();
  const a3b = Q(S, 3, 'leaves the circle', 0.5);
  dot(sx(so[0]), sy(so[1]) - 22, 8, 'm', a3b);
  txt('Re s ≠ ½', sx(so[0]) - 12, sy(so[1]) - 44, { size: 17, fam: F.math, w: 700, c: C.mag, a: a3b });
  dot(cx + R * wo[0], cy - R * wo[1], 8, 'm', a3b);
  txt(`|w| = ${Math.hypot(wo[0], wo[1]).toFixed(3)} < 1`, cx, cy + 70, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a3b });
  dashed(cx, cy, cx + R * wo[0], cy - R * wo[1], C.mag, a3b * 0.6, 1.4);
};

SCENES.a1_windows = S => {
  const u = S.u;
  A1.rail(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'yet far higher', 'argued'], [2, null, 'computed'], [3, null, 'open']]);
  /* #11431 between #11427 and #11436 */
  const a0 = at(S, 0, 0.6);
  panel(140, 200, 800, 400, a0, C.cyan, 'ZERO #11431 · MIDPOINT · 中点隔离 · CERT');
  txt('schematic spacing', 900, 352, { size: 16, fam: F.mono, align: 'right', c: C.dim, a: a0 });
  const y0 = 290, xa = 220, xm = 540, xb = 860;
  line(190, y0, 890, y0, C.cyan, a0 * 0.7, 1.6);
  [[xa, '#11427'], [xm, '#11431'], [xb, '#11436']].forEach(([x, s], i) => {
    line(x, y0 - 12, x, y0 + 12, i === 1 ? C.now : C.white, a0, 3);
    txt(s, x, y0 + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: i === 1 ? C.now : C.white, a: a0 });
  });
  const am = Q(S, 0, 'almost exactly midway', 0.6);
  arrow(xa, y0 - 26, xm - 4, y0 - 26, C.cyan, am, 2); arrow(xb, y0 - 26, xm + 4, y0 - 26, C.cyan, am, 2);
  txt('Δ = |γ₁₁₄₂₇ + γ₁₁₄₃₆ − 2γ₁₁₄₃₁|', 170, 385, { size: 24, fam: F.math, w: 700, c: C.white, a: am });
  txt('∈ (1.6812114283, 1.6812114285) × 10⁻⁶', 170, 420, { size: 24, fam: F.math, w: 700, c: C.cyan, a: am });
  const a1 = at(S, 1, 0.6), bw = 13.4;
  txt('#11431', 170, 470, { size: 19, fam: F.mono, w: 700, c: C.now, a: a1 });
  fillBox(300, 457, bw, 16, C.now, a1);
  txt('1×', 300 + bw + 12, 471, { size: 19, fam: F.mono, w: 700, c: C.now, a: a1 });
  const grow = Q(S, 1, 'wins by thirty-five times', 0.9);
  txt('#11628', 170, 504, { size: 19, fam: F.mono, w: 700, c: C.cyan, a: a1 });
  fillBox(300, 491, bw * 35.6 * grow, 16, C.cyan, a1 * 0.8);
  txt('35.60×', 300 + bw * 35.6 * grow + 12, 505, { size: 19, fam: F.mono, w: 700, c: C.cyan, a: a1 * grow });
  txt('3,000 centres #10000–#12999 · 243,000 triples', 170, 545, { size: 17, fam: F.mono, c: C.dim, a: a1 });
  txt('higher up, centres that beat it have density 1', 170, 578, { size: 18, fam: F.mono, w: 700, c: C.argued, a: Q(S, 1, 'yet far higher', 0.5) });
  /* the three physics windows */
  const a2 = at(S, 2, 0.6);
  panel(980, 200, 800, 400, a2, C.cyan, 'THREE PHYSICS WINDOWS · 三窗筛选 · CERT / MODEL');
  ['(i) three light modes for each of five charges', '(ii) 0.117 < αs(M_Z) < 0.119', '(iii) curvature ratio within 0.2%'].forEach((s, i) =>
    txt(s, 1010, 262 + i * 30, { size: 18, fam: F.mono, c: C.white, a: a2 }));
  txt('#8236 · γ ≈ 8354.92 · site-variance cut', 1010, 378, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: a2 * Q(S, 2, '8236', 0.5) });
  txt('αs ∈ (0.1183058, 0.1183120) · curvature 1.00093826', 1010, 410, { size: 17, fam: F.mono, c: C.white, a: a2 * Q(S, 2, '8236', 0.5) });
  txt('#8359 · γ ≈ 8462.07 · constant cut 9', 1010, 462, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: a2 * Q(S, 2, '8359', 0.5) });
  txt('αs ∈ (0.1184112, 0.1184213) · curvature 0.99935102', 1010, 494, { size: 17, fam: F.mono, c: C.white, a: a2 * Q(S, 2, '8359', 0.5) });
  txt('given a chosen field table, mass scale and cut', 1010, 548, { size: 18, fam: F.mono, w: 700, c: C.argued, a: a2 * Q(S, 2, 'given a chosen field table', 0.5) });
  txt('a window hit, not a prediction', 1010, 578, { size: 18, fam: F.mono, c: C.dim, a: a2 * Q(S, 2, 'given a chosen field table', 0.5) });
  /* the open bridge */
  const a3 = at(S, 3, 0.6);
  panel(200, 650, 560, 150, a3, C.cyan, 'GLOBAL · 全局');
  txt('averages over all zeros γ ≤ T', 230, 730, { size: 22, fam: F.mono, w: 700, c: C.white, a: a3 });
  txt('phase deficits, collision limit', 230, 765, { size: 18, fam: F.mono, c: C.dim, a: a3 });
  panel(1160, 650, 560, 150, a3, C.cyan, 'LOCAL · 单零点');
  txt('the clock reading of one zero', 1190, 730, { size: 22, fam: F.mono, w: 700, c: C.white, a: a3 });
  txt('light modes, thresholds, flavour', 1190, 765, { size: 18, fam: F.mono, c: C.dim, a: a3 });
  line(760, 725, 870, 725, C.open, a3, 4); line(1050, 725, 1160, 725, C.open, a3, 4);
  dashed(870, 725, 1050, 725, C.open, a3 * 0.5, 2);
  stamp('OPEN', 960, 735, Q(S, 3, 'That gap is open', 0.5), C.open, 40);
};

SCENES.a1_ask = S => {
  const u = S.u;
  A1.rail(S, clamp((S.d - u) / 0.6));
  const a0 = at(S, 0, 0.6), fade = 1 - 0.35 * at(S, 1, 0.6);
  /* the shell */
  const o = { cx: 520, cy: 430, s: 190, phi: 0.05 * u };
  const aS = a0 * fade;
  A1.EDGES.forEach(([i, j]) => { const [x1, y1] = A1.proj(A1.PTS[i], o), [x2, y2] = A1.proj(A1.PTS[j], o); line(x1, y1, x2, y2, C.cyan, aS * 0.22, 1); });
  A1.points(o, aS, {});
  txt('one shell · 一个球壳', 520, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: aS });
  /* two clocks */
  const aC = fade * at(S, 0, 0.6, 0.8);
  [[895, 0.8], [1025, 1.3]].forEach(([x, w], i) => {
    ring(x, 430, 58, C.cyan, aC, 2.4);
    const an = w * u + i * 2;
    line(x, 430, x + 54 * Math.cos(an), 430 - 54 * Math.sin(an), C.now, aC, 3.5);
  });
  txt('U · V ≠ V · U', 960, 530, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a: aC });
  txt('two clocks · 两只时钟', 960, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: aC });
  /* the zeros */
  const aZ = fade * at(S, 0, 0.6, 1.6);
  line(1400, 540, 1400, 300, C.cyan, aZ, 2.4);
  A1.GAM.slice(0, 10).forEach(t => dot(1400, 540 - 4.6 * t, 7, 'w', aZ));
  txt('½ + iγ', 1430, 312, { size: 22, fam: F.math, w: 700, c: C.cyan, a: aZ });
  txt('the zeros · 零点', 1400, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: aZ });
  SPINE.ask(S, 1, 'Can this one shell make the three forces meet?', '这一个球壳，能让三种力交汇吗？');
};

Object.assign(FILM.speed, { a1_title: 0.02, a1_edges: 0.014, a1_freq: 0.014, a1_gram: 0.014, a1_clocks: 0.016, a1_haar: 0.018, a1_zeros: 0.014, a1_windows: 0.016, a1_ask: 0.022 });
/* ==== ACT:a1:END ==== */

/* ==== ACT:a2:BEGIN ==== */
/* Act a2 · Volume II (chapters 4–6) · Question 1: couplings, traces and the Higgs portal
   第二卷 · 第一问：耦合交汇、动能谱迹与希格斯门户

   Summary (en): Run from the Z mass with Standard Model slopes, the three inverse couplings miss; the invariant
   α₁⁻¹ − 3α₂⁻¹ + 2α₃⁻¹, blind to complete families and heavy gauge vectors, measures a gap of 3.664 units, and interval
   certificates show that no shared monotone mass rule on the 19-point shell closes it. Two conditional keys (weak-centre
   splitting, a positive binary contraction) retrodict αs(M_Z) ≈ 0.1184 and 0.1189 at two loops, but only with inputs
   chosen after the fit, and a change of matching scheme moves the answer to 0.153; a spin-balanced kinetic trace closes
   the gap near 5 × 10¹⁴ GeV yet meets perturbative ceilings at 14Q–30Q. The Higgs needs a neutral portal of exact
   minimal rank 5 (Schur minimum, Lean), the low-energy partners collide with gluon fusion, the Z width and CLEO, and
   Question 1's first-principles core stays open.
   Summary (zh): 从 Z 质量按标准模型斜率往上跑，三条逆耦合线错身而过；对完整家族与重规范矢量盲视的不变量
   α₁⁻¹ − 3α₂⁻¹ + 2α₃⁻¹ 量出 3.664 个单位的缺口，区间证书表明十九点球壳上任何共用单调质量规则都填不平它。
   两把条件钥匙（弱中心分档、正二进收缩）在两圈下反推 α_s(M_Z) ≈ 0.1184 与 0.1189，但依赖看过拟合后才选的输入，
   换一种匹配处方答案就跳到 0.153；自旋配平的动能谱迹在约 5×10¹⁴ GeV 填平缺口，却在 14Q–30Q 撞上微扰封顶。
   希格斯需要精确最小秩为 5 的中性门户（舒尔极小值，Lean），低能伙伴与胶子融合、Z 宽度和 CLEO 正面冲突，
   第一问的第一性原理内核仍然开放。

   What each scene shows, and where it rests:
     a2_title   title card; the three one-loop lines α_i⁻¹(μ) = α_i⁻¹(M_Z) − b_i log(μ/M_Z)/2π from the chapter-4 inputs
                α̂⁻¹ = 127.930, sin²θ̂_W = 0.23129, αs = 0.1180, b = (41/10, −19/6, −7) (computed here).
     a2_gap     C = α₁⁻¹ − 3α₂⁻¹ + 2α₃⁻¹; c·(1,1,1) = c·(0,2,3) = c·(5,3,2) = 0, c·b = −2/5, dC/dlog μ = 1/(5π),
                C(M_Z) and C over 10¹³–10¹⁷ GeV, the α₂⁻¹ miss 3.664 at the α₁–α₃ crossing and the thresholdless
                sin²θ_W = 0.2076 (all computed here; chapter 4.1, example ex-ou-ch04-gap-invariant).
     a2_walls   h(λ) = λ|λ − c|, c = tr L₀/18 = 270/18 = 15 (computed); the walls of chapter 4.2 (2.936, 0.076,
                0.7048, 106.75467, 2.037) are the book's interval certificates (NUM, quoted);
                lagrange_gram_identity (LEAN).
     a2_keys    κ = M̄_P/724² (computed); minimal integer denominators 31 and 23 (certificates, quoted) and the power of
                two above both, 32 (computed); αs readouts (0.1183797, 0.1183860), (0.1188844, 0.1189006), 0.1532183
                (certificates, quoted); d = 724, ×32, 16 scalars are model inputs chosen after the fit (argued, 4.3).
     a2_trace   L = (2/5, 2, 1), R = (8/5, 0, 1): trace ledger L + 2L + 3R = (6, 6, 6) and running ledger
                ⅓L + (4/3)L + R = (2, 2, 2) + ⅔L (computed exactly); crossing Q ∈ (5.268, 5.390) × 10¹⁴ GeV,
                α_G⁻¹ ∈ (29.99894, 30.07107) and ceilings 3.9Q, 14Q, 20Q, 30Q (certificates, quoted; chapter 5.3–5.4).
     a2_portal  Δm² ≈ 1.05 × 10²⁶ GeV² (certificate, quoted) against m_H²/2 (ratio computed); 8π (computed); rank ≤ 4
                bound > 31.97519 and rank-5 diagonal (24.27098, 24.93094), margin > 3.11842 (certificates, quoted);
                spectrum of P = p(5vv* − I)/4: +p once, −p/4 four times, trace 0 (computed);
                schur_quadratic_is_least (LEAN; chapter 6.2).
     a2_pinch   gg → H 5.60–5.68 × SM, Z width +17.59–17.75 MeV, CLEO χ² 6.05 vs ≥ 13.54, OPAL 98.0 GeV vs 80.38 GeV
                (model readouts against data, quoted from chapter 6.4: argued); U₀(v + h) Taylor coefficients 1/2, 3/2,
                13/8 against the SM 1/2, 1/2, 1/8 (computed exactly).
     a2_ask     problem prob-ou-ch06-question1-open: the four open items (OPEN); scheme spread 0.1532 − 0.1189 (computed);
                the next question.
   On load, FILM.init re-derives every number on screen a second way and checks the cited theorems; any disagreement
   goes to window.FILM_ERRORS. */
const A2 = (() => {
  const GID = {
    gram: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
    schur: 'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least'
  };
  /* ---------- exact fractions [n, d] ---------- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const red = ([n, d]) => { const g = gcd(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
  const fadd = (p, q) => red([p[0] * q[1] + q[0] * p[1], p[1] * q[1]]);
  const fmul = (p, q) => red([p[0] * q[0], p[1] * q[1]]);
  const fr = ([n, d]) => (d === 1 ? String(n) : `${n}/${d}`).replace('-', '−');
  const vsc = (k, v) => v.map(x => fmul(k, x));
  const vadd = (...vs) => vs[0].map((_, i) => vs.reduce((s, v) => fadd(s, v[i]), [0, 1]));
  const vstr = v => `(${v.map(fr).join(', ')})`;
  const num = (x, d) => x.toFixed(d).replace('-', '−');
  /* ---------- chapter 4.1: one-loop running from the Z pole ---------- */
  const MZ = 91.1876, AINV = 127.930, S2W = 0.23129, AS = 0.1180;
  const A0 = [0.6 * AINV * (1 - S2W), AINV * S2W, 1 / AS];          // α₁⁻¹ (GUT normalised), α₂⁻¹, α₃⁻¹ at M_Z
  const BV = [[41, 10], [-19, 6], [-7, 1]];
  const b = BV.map(([n, d]) => n / d);
  const ainv = (i, t) => A0[i] - b[i] * t / (2 * Math.PI);          // t = log(μ / M_Z)
  const tOf = l10 => Math.log(Math.pow(10, l10) / MZ);
  const l10Of = t => Math.log10(MZ * Math.exp(t));
  const CP = [[1, 1], [-3, 1], [2, 1]];                              // c_proj = (1, −3, 2)
  const dotF = (c, v) => c.reduce((s, x, i) => fadd(s, fmul(x, v[i])), [0, 1]);
  const DIRS = [
    { v: [[1, 1], [1, 1], [1, 1]], en: 'common coupling, complete families', zh: '共同耦合、完整家族' },
    { v: [[0, 1], [2, 1], [3, 1]], en: 'neutral heavy vectors', zh: '中性重矢量' },
    { v: [[5, 1], [3, 1], [2, 1]], en: 'charged X, Y vectors', zh: '带荷 X、Y 矢量' }
  ];
  const CB = dotF(CP, BV);                                            // −2/5
  const CSLOPE = -(CB[0] / CB[1]) / (2 * Math.PI);                   // 1/(5π)
  const Cof = t => ainv(0, t) - 3 * ainv(1, t) + 2 * ainv(2, t);
  /* crossings of the lines, solved directly */
  const cross = (i, j) => (A0[i] - A0[j]) / ((b[i] - b[j]) / (2 * Math.PI));
  const T13 = cross(0, 2), T12 = cross(0, 1), T23 = cross(1, 2);
  const GAP = ainv(1, T13) - ainv(0, T13);                            // α₂⁻¹ below the α₁ = α₃ point: negative of the miss
  const MISS = Math.abs(GAP);
  /* the thresholdless weak angle: all three meet when sin²θ = s solves the two crossing equations */
  const k = 1 / (2 * Math.PI);
  const S2PRED = (() => {
    const A = AINV, a3 = A0[2];
    /* α₂ = α₃: A s + k(19/6) t = a3 + 7k t  →  t = (A s − a3)/(k(7 − 19/6));
       α₁ = α₃: 0.6A(1 − s) − k(41/10) t = a3 + 7k t  →  0.6A(1 − s) − a3 = k(111/10) t */
    const r = (111 / 10) / (7 - 19 / 6);
    return (0.6 * A - a3 + r * a3) / (A * (0.6 + r));
  })();
  /* ---------- chapter 4.2 / 4.3 ---------- */
  const TRL0 = 2 * 135, CMEAN = [TRL0, 18];                           // unit weights: tr L₀ = 2 · (edges) = 270
  const C15 = CMEAN[0] / CMEAN[1];
  const hfold = l => l * Math.abs(l - C15);
  const MPBAR = 2.435e18;
  const KAPPA724 = MPBAR / (724 * 724);
  const pow2Above = n => { let p = 1; while (p < n) p *= 2; return p; };
  const NBIN = Math.max(pow2Above(31), pow2Above(23));
  /* ---------- chapter 5.3 ledgers ---------- */
  const LV = [[2, 5], [2, 1], [1, 1]], RV = [[8, 5], [0, 1], [1, 1]];
  const TRACE = vadd(LV, vsc([2, 1], LV), vsc([3, 1], RV));                  // L_scalar + L_Dirac (two L) + 3 R_scalar
  const RUN = vadd(vsc([1, 3], LV), vsc([4, 3], LV), vsc([3, 1], vsc([1, 3], RV)));
  const RUN2 = vadd([[2, 1], [2, 1], [2, 1]], vsc([2, 3], LV));
  /* ---------- chapter 6 ---------- */
  const EIGHTPI = 8 * Math.PI;
  const MH = 125.25, VEV = 246.22;
  const TREE = MH * MH / 2;
  const DM2 = 1.05e26, RATIO = DM2 / TREE;
  const PSPEC = [1, -0.25, -0.25, -0.25, -0.25];                      // eigenvalues of (5vv* − I)/4, in units of p
  /* equal-depth vacuum: (1/8)(1 + h)²(2h + h²)² in units m_H = v = 1, coefficients by polynomial products */
  const pmul = (p, q) => { const r = new Array(p.length + q.length - 1).fill(0);
    p.forEach((x, i) => q.forEach((y, j) => { r[i + j] += x * y; })); return r; };
  const U0 = (() => { const s = pmul(pmul([1, 1], [1, 1]), pmul([0, 2, 1], [0, 2, 1])); return s.map(x => x / 8); })();
  const SM = [0, 0, 1 / 2, 1 / 2, 1 / 8];
  /* ---------- drawing helpers ---------- */
  const COL = [C.cyan, C.mag, C.white];
  const NAMES = ['α₁⁻¹', 'α₂⁻¹', 'α₃⁻¹'];
  function rail(S, a = 1) { SPINE.rail(S, 2, a * clamp(S.u / 0.4) * clamp((S.d - S.u) / 0.4)); }
  function leanChip(x, y, gid, a, size = 20) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.label || r.name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* the running plot: rect g = {x0, x1, y0, y1}, log10 μ in [1.8, 17.5], α⁻¹ in [0, 64]; grow ∈ [0, 1] along μ */
  const LMIN = 1.8, LMAX = 17.5, AMAX = 64;
  function gx(g, l) { return g.x0 + (g.x1 - g.x0) * (l - LMIN) / (LMAX - LMIN); }
  function gy(g, v) { return g.y1 - (g.y1 - g.y0) * v / AMAX; }
  function plot(g, a, grow = 1, o = {}) {
    if (a <= 0.003) return;
    const sz = o.small ? 18 : 22;
    /* the unification window 10¹³–10¹⁷ GeV */
    const wa = a * (o.window == null ? 1 : o.window);
    if (wa > 0.003) {
      ctx.save(); ctx.globalAlpha = wa * 0.1; ctx.fillStyle = C.cyan;
      ctx.fillRect(gx(g, 13), g.y0, gx(g, 17) - gx(g, 13), g.y1 - g.y0); ctx.restore();
      txt('10¹³–10¹⁷ GeV', (gx(g, 13) + gx(g, 17)) / 2, g.y0 + 26, { size: sz - 2, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: wa * 0.8 });
    }
    line(g.x0, g.y1, g.x1, g.y1, C.dim, a, 1.6);
    line(g.x0, g.y0, g.x0, g.y1, C.dim, a, 1.6);
    (o.small ? [2, 8, 14] : [2, 5, 8, 11, 14, 17]).forEach(l => {
      line(gx(g, l), g.y1, gx(g, l), g.y1 + 8, C.dim, a, 1.4);
      txt(`10${String(l).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('')}`, gx(g, l), g.y1 + 34, { size: sz, fam: F.mono, align: 'center', c: C.dim, a });
    });
    [0, 20, 40, 60].forEach(v => {
      line(g.x0 - 8, gy(g, v), g.x0, gy(g, v), C.dim, a, 1.4);
      txt(String(v), g.x0 - 14, gy(g, v) + 7, { size: sz, fam: F.mono, align: 'right', c: C.dim, a });
    });
    txt('μ / GeV', g.x1 + 16, g.y1 + 8, { size: sz, fam: F.mono, c: C.dim, a: a * (o.small ? 0 : 1) });
    txt('α⁻¹', g.x0 + 12, g.y0 + 4, { size: sz + 4, fam: F.math, w: 700, c: C.dim, a });
    const lEnd = LMIN + (Math.log10(MZ) - LMIN) + (LMAX - Math.log10(MZ)) * clamp(grow);
    for (let i = 0; i < 3; i++) {
      const l0 = Math.log10(MZ);
      curve(s => { const l = l0 + (lEnd - l0) * s; return [gx(g, l), gy(g, ainv(i, tOf(l)))]; }, 40, COL[i], a, o.small ? 3 : 4);
      dot(gx(g, l0), gy(g, A0[i]), 7, i === 0 ? 'c' : i === 1 ? 'm' : 'w', a);
      if (grow > 0.02) {
        const l = lEnd, yv = gy(g, ainv(i, tOf(l)));
        txt(NAMES[i], gx(g, l) + 12, yv + (i === 1 ? -10 : i === 2 ? 24 : 8), { size: sz + 4, fam: F.math, w: 700, c: COL[i], a });
      }
    }
  }
  /* the three pairwise crossings: the triangle of the miss */
  function tri(g, a) {
    if (a <= 0.003) return;
    [[T12, 0, 'α₁ = α₂'], [T13, 0, 'α₁ = α₃'], [T23, 1, 'α₂ = α₃']].forEach(([t, i]) => {
      const x = gx(g, l10Of(t)), y = gy(g, ainv(i, t));
      ring(x, y, 11, C.now, a, 2.5);
    });
  }
  return { GID, fr, vstr, num, MZ, AINV, S2W, AS, A0, BV, b, ainv, tOf, l10Of, CP, DIRS, dotF, CB, CSLOPE, Cof,
    T12, T13, T23, GAP, MISS, S2PRED, TRL0, CMEAN, C15, hfold, MPBAR, KAPPA724, pow2Above, NBIN, LV, RV, TRACE, RUN, RUN2,
    EIGHTPI, MH, VEV, TREE, DM2, RATIO, PSPEC, U0, SM, COL, NAMES, rail, leanChip, gx, gy, plot, tri, cross };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a2: ' + m); };
  const near = (x, y, e) => Math.abs(x - y) <= e;
  const eq = (p, q) => JSON.stringify(p) === JSON.stringify(q);
  Object.values(A2.GID).forEach(g => { const r = leanCite(g); check(r && r.kind === 'theorem', `${g} is not a cited theorem`); });
  /* the invariant blind spots and the light-field slope, by plain floating arithmetic */
  const c = [1, -3, 2];
  [[1, 1, 1], [0, 2, 3], [5, 3, 2]].forEach(v => check(c[0] * v[0] + c[1] * v[1] + c[2] * v[2] === 0, `c · ${v} ≠ 0`));
  check(eq(A2.CB, [-2, 5]), 'c · b = −2/5');
  check(near(41 / 10 + 95 / 10 - 140 / 10, -0.4, 1e-12), 'c · b by the hand sum');
  check(near(A2.CSLOPE, 1 / (5 * Math.PI), 1e-15) && near(A2.CSLOPE, 0.06366, 5e-6), 'dC/dlog μ = 1/(5π) ≈ 0.06366');
  /* C at M_Z and across the window, against the chapter's quoted bounds; C drifts linearly, so the ends bound it */
  const C0 = A2.A0[0] - 3 * A2.A0[1] + 2 * A2.A0[2];
  check(near(C0, -12.81, 0.006) && near(A2.Cof(0), C0, 1e-12), `C(M_Z) = ${C0}`);
  const c13 = A2.Cof(A2.tOf(13)), c17 = A2.Cof(A2.tOf(17));
  check(c13 > -11.196 && c13 < -11.194 && c17 > -10.6084 && c17 < -10.6082, `C over the window ${c13} … ${c17}`);
  check(near(A2.tOf(17), 34.63, 0.005) && near(c17 - C0, 2.20, 0.005), 'climb to 10¹⁷ GeV ≈ 2.20');
  /* the miss: directly at the α₁ = α₃ crossing, and as −C/3 there */
  const m2 = -A2.Cof(A2.T13) / 3;
  check(near(A2.MISS, m2, 1e-9) && near(A2.MISS, 3.664, 0.0006), `miss ${A2.MISS} vs −C/3 = ${m2}`);
  check(near(A2.ainv(0, A2.T13), A2.ainv(2, A2.T13), 1e-9), 'T13 is a crossing');
  /* the thresholdless angle: bisect on s for a common meeting point and compare */
  { const f = s => { const a1 = 0.6 * A2.AINV * (1 - s), a2 = A2.AINV * s, a3 = A2.A0[2];
      const t = (a2 - a3) / ((A2.b[1] - A2.b[2]) / (2 * Math.PI)); return (a1 - A2.b[0] * t / (2 * Math.PI)) - (a3 - A2.b[2] * t / (2 * Math.PI)); };
    let lo = 0.15, hi = 0.3; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; }
    check(near(lo, A2.S2PRED, 1e-9) && near(lo, 0.2076, 0.00005), `sin²θ_W thresholdless ${lo}`); }
  /* shell numbers */
  check(A2.C15 === 15 && 270 / 18 === 15 && A2.hfold(15) === 0 && A2.hfold(30) === 450, 'c = 270/18 = 15, h(30) = 450');
  check(near(A2.KAPPA724, 4.645e12, 0.001e12), `κ = M̄_P/724² = ${A2.KAPPA724}`);
  check(A2.NBIN === 32 && A2.pow2Above(31) === 32 && A2.pow2Above(23) === 32 && 16 < 23, 'binary denominator 32');
  /* ledgers, against component-wise decimal sums */
  const L = [0.4, 2, 1], R = [1.6, 0, 1];
  check(eq(A2.TRACE, [[6, 1], [6, 1], [6, 1]]) && L.every((x, i) => near(3 * x + 3 * R[i], 6, 1e-12)), 'trace ledger (6, 6, 6)');
  check(eq(A2.RUN, A2.RUN2) && eq(A2.RUN, [[34, 15], [10, 3], [8, 3]]), 'running ledger (2,2,2) + 2/3 L');
  check(L.every((x, i) => near(5 / 3 * x + R[i], 2 + 2 / 3 * x, 1e-12)), 'running ledger by decimals');
  check(eq(A2.TRACE, [[6, 1], [6, 1], [6, 1]]) && near(57.08588 / 2, 28.543, 0.0005), 'half exposure 28.543');
  /* portal */
  check(near(A2.EIGHTPI, 25.13274, 5e-6) && 31.97519 > A2.EIGHTPI && 24.93094 < A2.EIGHTPI, '8π and the two bounds');
  check(near(A2.TREE, 7843.78, 0.01) && near(A2.RATIO, 1.34e22, 0.005e22), `m_H²/2 and ratio ${A2.RATIO}`);
  { /* P = (5vv* − I)/4 with v = (1, …, 1)/√5: check P v = v and P w = −w/4 for w ⊥ v, trace 0 */
    const n = 5, v = new Array(n).fill(1 / Math.sqrt(5)), P = [];
    for (let i = 0; i < n; i++) { P.push([]); for (let j = 0; j < n; j++) P[i].push((5 * v[i] * v[j] - (i === j ? 1 : 0)) / 4); }
    const mv = x => P.map(r => r.reduce((s, y, j) => s + y * x[j], 0));
    const pv = mv(v), w = [1, -1, 0, 0, 0], pw = mv(w);
    check(pv.every((x, i) => near(x, v[i], 1e-12)) && pw.every((x, i) => near(x, -w[i] / 4, 1e-12)), 'spectrum of P');
    check(near(P.reduce((s, r, i) => s + r[i], 0), 0, 1e-12) && near(A2.PSPEC.reduce((s, x) => s + x, 0), 0, 1e-15), 'P traceless'); }
  /* the equal-depth vacuum, by finite differences of U(r) = r²(r² − 1)²/8 at r = 1 */
  { const U = r => r * r * (r * r - 1) ** 2 / 8, h = 1e-3;
    const d3 = (U(1 + 2 * h) - 2 * U(1 + h) + 2 * U(1 - h) - U(1 - 2 * h)) / (2 * h ** 3);
    check(near(d3, 9, 1e-4) && near(A2.U0[3] * 6, 9, 1e-12), `U''' = 9 m_H²/v (${d3})`);
    check(A2.U0[2] === 0.5 && A2.U0[3] === 1.5 && A2.U0[4] === 13 / 8, `U₀ coefficients ${A2.U0}`);
    check(A2.U0[3] / A2.SM[3] === 3 && A2.U0[4] / A2.SM[4] === 13, 'ratios 3 and 13'); }
  check(near(0.1532183 - 0.1189006, 0.034, 0.0005), 'scheme spread ~ 0.034');
});

FILM.init.push(() => {
  Object.assign(FILM.speed, { a2_title: 0.02, a2_gap: 0.014, a2_walls: 0.014, a2_keys: 0.016, a2_trace: 0.016, a2_portal: 0.016, a2_pinch: 0.016, a2_ask: 0.02 });
});

/* ================================ scenes ================================ */
SCENES.a2_title = S => {
  SPINE.title(S, 2, '第一问：耦合交汇、谱迹与希格斯门户', 'Question 1: couplings, traces and the Higgs portal');
  const a0 = at(S, 0, 0.7);
  A2.rail(S, a0);
  badge(a0 * clamp((S.d - S.u) / 0.5), 'computed');
  const g = { x0: 260, x1: 1620, y0: 210, y1: 760 };
  const grow = ease(Q(S, 1, 'Run the measured couplings', 3.6));
  A2.plot(g, a0, grow, { window: Q(S, 1, 'Standard Model slopes', 0.6) });
  /* the inputs at M_Z */
  const ai = a0 * (1 - 0.6 * grow);
  txt(`at M_Z = ${A2.MZ} GeV`, A2.gx(g, Math.log10(A2.MZ)) + 22, A2.gy(g, A2.A0[0]) + 56, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ai });
  [0, 1, 2].forEach(i => txt(`${A2.NAMES[i]} = ${A2.num(A2.A0[i], 2)}`, A2.gx(g, Math.log10(A2.MZ)) + 22, A2.gy(g, A2.A0[i]) + 8,
    { size: 22, fam: F.mono, w: 700, c: A2.COL[i], a: a0 * (1 - grow) }));
  /* panel: the slopes */
  const ap = Q(S, 1, 'Standard Model slopes', 0.6);
  panel(1250, 600, 520, 130, ap, C.cyan, 'ONE LOOP · 一圈');
  txt('dα_i⁻¹/d log μ = −b_i / 2π', 1272, 662, { size: 24, fam: F.math, w: 700, c: C.white, a: ap });
  txt('b = (41/10, −19/6, −7)', 1272, 706, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ap });
  A2.tri(g, Q(S, 1, 'the three lines miss', 0.5));
  txt('MISS · 错身', A2.gx(g, A2.l10Of(A2.T13)), A2.gy(g, A2.ainv(0, A2.T13)) - 60, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.now, a: Q(S, 1, 'the three lines miss', 0.5), ls: 3 });
};

SCENES.a2_gap = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  const a = clamp(S.u / 0.6);
  const g = { x0: 230, x1: 930, y0: 230, y1: 740 };
  A2.plot(g, a, 1, { small: true, window: 1 });
  /* the invariant */
  const x = 1010, w = 770;
  panel(x, 195, w, 640, a, C.cyan, 'GAP INVARIANT · 缺口不变量');
  txt('C = α₁⁻¹ − 3α₂⁻¹ + 2α₃⁻¹', x + 30, 270, { size: 38, fam: F.math, w: 700, c: C.white, a });
  txt('c = (1, −3, 2)', x + 30, 312, { size: 24, fam: F.math, w: 700, c: C.dim, a: Q(S, 0, 'alpha one inverse', 0.5) });
  const q1 = at(S, 1, 0.5);
  A2.DIRS.forEach((d, i) => {
    const y = 372 + i * 56, aa = q1 * clamp((S.u - lineAt(S, 1).s - 0.6 * i) / 0.5);
    txt(`c · ${A2.vstr(d.v)} = ${A2.fr(A2.dotF(A2.CP, d.v))}`, x + 30, y, { size: 26, fam: F.math, w: 700, c: C.cyan, a: aa });
    txt(d.en, x + 330, y - 8, { size: 18, fam: F.mono, w: 700, c: C.dim, a: aa });
    txt(d.zh, x + 330, y + 16, { size: 17, fam: F.zh, w: 700, c: C.dim, a: aa });
  });
  const q2 = at(S, 2, 0.5);
  txt(`c · b = 41/10 + 95/10 − 140/10 = ${A2.fr(A2.CB)}`, x + 30, 560, { size: 26, fam: F.math, w: 700, c: C.white, a: q2 });
  txt(`dC / d log μ = 1/(5π) ≈ ${A2.num(A2.CSLOPE, 5)}`, x + 30, 606, { size: 26, fam: F.math, w: 700, c: C.now, a: Q(S, 2, 'one over five pi', 0.5) });
  txt(`C(M_Z) = ${A2.num(A2.Cof(0), 2)}  ·  10¹³–10¹⁷ GeV: C ∈ (${A2.num(A2.Cof(A2.tOf(13)), 3)}, ${A2.num(A2.Cof(A2.tOf(17)), 3)})`,
    x + 30, 650, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: Q(S, 2, 'per e-fold', 0.5) });
  /* the miss at the α₁ = α₃ crossing */
  const q3 = Q(S, 3, 'alpha two misses', 0.6);
  const tx = A2.gx(g, A2.l10Of(A2.T13)), y13 = A2.gy(g, A2.ainv(0, A2.T13)), y2 = A2.gy(g, A2.ainv(1, A2.T13));
  if (q3 > 0.003) {
    ring(tx, y13, 10, C.now, q3, 2.5);
    line(tx, y13, tx, lerp(y13, y2, ease(q3)), C.now, q3, 5);
    txt('Δα₂⁻¹', tx + 18, y13 + 52, { size: 24, fam: F.math, w: 700, c: C.now, a: q3 });
  }
  const q4 = Q(S, 3, 'three point six six four', 0.5);
  txt(`Δα₂⁻¹ = ${A2.num(A2.MISS, 3)}`, x + 30, 730, { size: 52, fam: F.orb, w: 900, c: C.now, a: q4, ab: 1.5 });
  txt(`meeting would need sin²θ_W(M_Z) = ${A2.num(A2.S2PRED, 4)}, measured ${A2.S2W}`, x + 30, 790, { size: 20, fam: F.mono, w: 700, c: C.dim, a: q4 });
};

SCENES.a2_walls = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'Interval certificates', 'computed'], [3, null, 'lean']]);
  const a = clamp(S.u / 0.6);
  /* the two-step readout h(λ) = λ|λ − c| on the shell */
  const P = { x0: 210, x1: 760, y0: 250, y1: 650 };
  const px = l => P.x0 + (P.x1 - P.x0) * l / 30, py = h => P.y1 - (P.y1 - P.y0) * h / 450;
  panel(150, 195, 670, 560, a, C.cyan, 'TWO-STEP MASS READOUT · 两步质量读数');
  line(P.x0, P.y1, P.x1, P.y1, C.dim, a, 1.6); line(P.x0, P.y0, P.x0, P.y1, C.dim, a, 1.6);
  [0, 15, 30].forEach(l => txt(String(l), px(l), P.y1 + 30, { size: 20, fam: F.mono, align: 'center', c: C.dim, a }));
  txt('λ', P.x1 + 14, P.y1 + 6, { size: 24, fam: F.math, w: 700, c: C.dim, a });
  txt('h', P.x0 - 26, P.y0 + 10, { size: 24, fam: F.math, w: 700, c: C.dim, a });
  curve(s => [px(30 * s), py(A2.hfold(30 * s))], 120, C.cyan, a, 3.5);
  dashed(px(15), P.y0, px(15), P.y1, C.dim, a * 0.7, 1.4);
  txt('h(λ) = λ |λ − c|', 250, 300, { size: 28, fam: F.math, w: 700, c: C.white, a });
  txt(`c = tr L₀ / 18 = ${A2.TRL0}/18 = ${A2.C15}`, 250, 340, { size: 22, fam: F.math, w: 700, c: C.cyan, a });
  const q0 = Q(S, 0, 'one shared, nondecreasing mass rule', 0.6);
  txt('m = f(h) · f nondecreasing', 185, 712, { size: 24, fam: F.math, w: 700, c: C.now, a: q0 });
  txt('shared by every heavy field · 所有重场共用', 185, 742 - 2, { size: 18, fam: F.zh, w: 700, c: C.dim, a: q0 });
  /* the wall: the book's certified no-go bounds (chapter 4.2), one brick each */
  const bricks = [
    ['one shared monotone mass, all phases', '共用单调质量 · 全双时钟环面', 'spread > 0.7048', 1],
    ['native 12 generators + 18 high modes', '原生十二生成元 + 十八高模', 'spread > 2.936', 2],
    ['0/1/2-step positive face weights', '零一二步正面权', 'αs(M_Z) < 0.076', 2],
    ['18 layers, one monotone m(λ)', '十八重层共用单调 m(λ)', 'log-slope ≥ 106.75467', 2],
    ['unit pinned to the (reduced) Planck mass', '单位钉在（约化）普朗克质量', 'spread > 2.037', 2]
  ];
  bricks.forEach(([en, zh, v, k], i) => {
    const y = 205 + i * 100, x = 880, bw = 900;
    const aa = k === 1 ? Q(S, 1, 'Interval certificates', 0.5) : Q(S, 2, 'Keep only the native generators', 0.5, 0.35 * (i - 1));
    if (aa <= 0.003) return;
    const cur = k === 1 && S.u < lineAt(S, 2).s;
    const col = cur ? C.now : C.cyan;
    box(x, y, bw, 84, col, aa, 2, rgba(col, 0.08));
    txt(en, x + 22, y + 36, { size: 22, fam: F.mono, w: 700, c: C.white, a: aa });
    txt(zh, x + 22, y + 66, { size: 18, fam: F.zh, w: 700, c: C.dim, a: aa });
    txt(v, x + bw - 22, y + 54, { size: 30, fam: F.math, w: 700, align: 'right', c: col, a: aa });
  });
  const tg = at(S, 0, 0.6) * (1 - Q(S, 1, 'Interval certificates', 0.4));
  txt(`close Δα₂⁻¹ = ${A2.num(A2.MISS, 3)} ?`, 1330, 450, { size: 44, fam: F.math, w: 700, align: 'center', c: C.white, a: tg * 0.85 });
  txt('with one shared monotone rule · 用一条共用的单调规则', 1330, 500, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: tg });
  txt('interval certificates · 区间证书 · NUM', 880 + 900, 728, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: Q(S, 1, 'Interval certificates', 0.5) * 0.8 });
  /* the kernel-checked identity underneath */
  const q3 = at(S, 3, 0.6);
  txt('(Σu²)(Σv²) − (Σuv)² = ½ ΣΣ (u_i v_j − u_j v_i)²', 880, 778, { size: 26, fam: F.math, w: 700, c: C.lean, a: q3 });
  A2.leanChip(880, 822, A2.GID.gram, q3, 18);
};

SCENES.a2_keys = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  const a = clamp(S.u / 0.6);
  /* the two keys */
  const k1 = at(S, 0, 0.6), k2 = Q(S, 0, 'positive contraction', 0.5);
  panel(150, 195, 790, 215, k1, C.cyan, 'KEY 1 · WEAK-CENTRE SPLITTING · 弱中心分档');
  txt('center-odd heavy masses  m = κh', 175, 262, { size: 24, fam: F.math, w: 700, c: C.white, a: k1 });
  txt('center-even heavy masses  × 32', 175, 302, { size: 24, fam: F.math, w: 700, c: C.white, a: k1 });
  txt(`κ = M̄_P / 724² ≈ ${(A2.KAPPA724 / 1e12).toFixed(3)} × 10¹² GeV`, 175, 346, { size: 24, fam: F.math, w: 700, c: C.cyan, a: k1 });
  txt('zero #11661 · 16 heavy scalars', 175, 386, { size: 20, fam: F.mono, w: 700, c: C.dim, a: k1 });
  panel(980, 195, 790, 215, k2, C.cyan, 'KEY 2 · POSITIVE ONE-STEP CONTRACTION · 正一步收缩');
  txt('T = I − L/N ⪰ 0,   κ = M̄_P / N²', 1005, 262, { size: 24, fam: F.math, w: 700, c: C.white, a: k2 });
  txt('least integer N: 31 (any phases), 23 (native clocks)', 1005, 302, { size: 21, fam: F.mono, w: 700, c: C.white, a: k2 });
  txt(`least power of two above both: N = ${A2.NBIN}`, 1005, 346, { size: 24, fam: F.math, w: 700, c: C.cyan, a: k2 });
  txt('zero #11431 · six heavy thresholds', 1005, 386, { size: 20, fam: F.mono, w: 700, c: C.dim, a: k2 });
  /* the αs line */
  const X0 = 230, X1 = 1690, Y = 560, lo = 0.06, hi = 0.16, ax = v => X0 + (X1 - X0) * (v - lo) / (hi - lo);
  line(X0, Y, X1, Y, C.dim, a, 2);
  [0.06, 0.08, 0.10, 0.12, 0.14, 0.16].forEach(v => {
    line(ax(v), Y - 8, ax(v), Y + 8, C.dim, a, 1.5);
    txt(v.toFixed(2), ax(v), Y + 40, { size: 20, fam: F.mono, align: 'center', c: C.dim, a });
  });
  txt('αs(M_Z)', X0 - 10, Y + 96, { size: 26, fam: F.math, w: 700, c: C.white, a });
  /* the face-weight cap of the previous wall, and the measured window */
  ctx.save(); ctx.globalAlpha = a * 0.16; ctx.fillStyle = C.mag; ctx.fillRect(ax(lo), Y - 40, ax(0.076) - ax(lo), 80); ctx.restore();
  txt('wall: < 0.076', ax(0.068), Y - 52, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
  ctx.save(); ctx.globalAlpha = a * 0.22; ctx.fillStyle = C.white; ctx.fillRect(ax(0.117), Y - 40, ax(0.119) - ax(0.117), 80); ctx.restore();
  txt('measured 0.1180', ax(0.118), Y + 76, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  const r1 = Q(S, 1, 'zero point one one eight four', 0.5), r2 = Q(S, 1, 'zero point one one eight nine', 0.5);
  const sw = Q(S, 2, 'switch the matching scheme', 1.2);
  const s1 = [0.1183797, 0.1183860], s2 = [0.1188844, 0.1189006], s3 = 0.1532183;
  if (r1 > 0.003) { dot(ax(s1[0]), Y, 11, 'c', r1); txt('(0.1183797, 0.1183860)', ax(s1[0]) - 14, Y - 76, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: r1 }); txt('KEY 1', ax(s1[0]) - 14, Y - 50, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: r1 }); }
  if (r2 > 0.003) {
    const v = lerp(s2[0], s3, ease(sw)), col = sw > 0.01 ? C.now : C.cyan;
    dot(ax(v), Y, 11, sw > 0.01 ? 'g' : 'c', r2);
    const lx = sw > 0.5 ? ax(v) + 30 : ax(v) + 14, al = sw > 0.5 ? 'right' : 'left';
    txt(sw > 0.5 ? String(s3) : '(0.1188844, 0.1189006)', lx, Y - 76, { size: 20, fam: F.mono, w: 700, align: al, c: col, a: r2 });
    txt(sw > 0.5 ? 'KEY 2 · other matching scheme' : 'KEY 2', lx, Y - 50, { size: 18, fam: F.mono, w: 700, align: al, c: col, a: r2 });
    if (sw > 0.01) { ring(ax(s2[0]), Y, 11, C.cyan, r2 * 0.6, 2); arrow(ax(s2[0]) + 16, Y - 22, ax(v) - 16, Y - 22, C.now, sw, 2.5); }
  }
  txt('two-loop retrodictions · certificates · NUM', X1, Y + 76, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: r1 * 0.85 });
  /* what was chosen */
  const q3 = at(S, 3, 0.6);
  panel(150, 690, 1620, 128, q3, C.argued, 'MODEL INPUTS · 模型输入 · ARGUED');
  txt('d = 724  ·  multiplier 32  ·  16 heavy scalars', 180, 752, { size: 28, fam: F.math, w: 700, c: C.white, a: q3 });
  txt('chosen after seeing the fitted unit · 看过拟合单位之后才选定：条件构造，不是推导', 180, 796, { size: 21, fam: F.zh, w: 700, c: C.argued, a: Q(S, 3, 'chosen after seeing the fit', 0.5) });
};

SCENES.a2_trace = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'close the gap', 'computed'], [3, null, 'computed']]);
  const a = clamp(S.u / 0.6);
  txt('kinetic terms = one positive heat-kernel trace over the matter tower · 规范动能 = 物质塔上同一条正热核迹', W / 2, 205,
    { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6) });
  txt('L = (2/5, 2, 1)   ·   R = (8/5, 0, 1)', W / 2, 246, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: at(S, 0, 0.6) });
  /* ledger 1: the internal trace */
  const q1 = at(S, 1, 0.5);
  panel(150, 275, 790, 215, q1, C.cyan, 'TRACE LEDGER · 谱迹账本');
  txt('scalar L + Dirac L + 3 scalar R', 175, 340, { size: 24, fam: F.math, w: 700, c: C.white, a: q1 });
  txt('1·L + 2·L + 3·R', 175, 384, { size: 26, fam: F.math, w: 700, c: C.white, a: Q(S, 1, 'three right partners', 0.5) });
  txt(`= ${A2.vstr(A2.TRACE)}`, 175, 446, { size: 44, fam: F.orb, w: 900, c: C.cyan, a: Q(S, 1, 'six, six, six', 0.5) });
  txt('equal at every scale', 600, 444, { size: 20, fam: F.mono, w: 700, c: C.dim, a: Q(S, 1, 'six, six, six', 0.5) });
  /* ledger 2: one-loop running weights scalar 1/3, Dirac 4/3 */
  const q2 = at(S, 2, 0.5);
  panel(980, 275, 790, 215, q2, C.mag, 'RUNNING LEDGER · 跑动账本');
  txt('weights: scalar 1/3, Dirac 4/3', 1005, 340, { size: 22, fam: F.mono, w: 700, c: C.white, a: q2 });
  txt(`⅓L + (4/3)L + R = ${A2.vstr(A2.RUN)}`, 1005, 384, { size: 26, fam: F.math, w: 700, c: C.white, a: q2 });
  txt('= (2, 2, 2) + ⅔L', 1005, 446, { size: 44, fam: F.orb, w: 900, c: C.mag, a: Q(S, 2, 'two thirds of a left doublet', 0.5) });
  /* the energy axis above the crossing */
  const X0 = 300, X1 = 1680, Y = 650, rl = -0.30103, rh = Math.log10(40), ex = r => X0 + (X1 - X0) * (Math.log10(r) - rl) / (rh - rl);
  const q2b = Q(S, 2, 'near five times ten', 0.6);
  line(X0, Y, X1, Y, C.dim, q2b, 2);
  txt('μ / Q (log scale)', X0, Y - 22, { size: 18, fam: F.mono, c: C.dim, a: q2b });
  ring(ex(1), Y, 13, C.now, q2b, 3); dot(ex(1), Y, 8, 'g', q2b);
  txt('Q ∈ (5.268, 5.390) × 10¹⁴ GeV', ex(1), Y + 58, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: q2b });
  txt('α_G⁻¹ ∈ (29.99894, 30.07107)', ex(1), Y + 90, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q2b });
  const q3 = at(S, 3, 0.5);
  const ceil = [[3.9, 'pure scalar', '纯标量', -1, 'perturbation'], [14, 'spin-balanced', '自旋配平', 1, 'fourteen Q'], [20, 'SU(5), index one', '', -1, 'thirty Q'], [30, 'Spin(10)', '', 1, 'Spin ten']];
  ceil.forEach(([r, en, zh, side, ph]) => {
    const aa = q3 * Q(S, 3, ph, 0.5), x = ex(r);
    if (aa <= 0.003) return;
    line(x, Y - 26, x, Y + 26, C.mag, aa, 4);
    const yt = side < 0 ? Y - 70 : Y + 52;
    txt(`${r}Q`, x, yt, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: aa });
    txt(zh ? `${en} · ${zh}` : en, x, yt + (side < 0 ? 28 : 28), { size: 17, fam: F.zh, w: 700, align: 'center', c: C.dim, a: aa });
  });
  const shade = q3 * Q(S, 3, 'Spin ten', 0.6);
  if (shade > 0.003) { ctx.save(); ctx.globalAlpha = shade * 0.14; ctx.fillStyle = C.mag; ctx.fillRect(ex(30), Y - 40, X1 - ex(30), 80); ctx.restore(); }
  txt('perturbative ceilings · certificates · 微扰封顶 · 区间证书', X1, 800, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: q3 * 0.85 });
};

SCENES.a2_portal = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'kernel-checked Schur minimum', 'lean']]);
  const a = clamp(S.u / 0.6);
  /* the two-loop Higgs mass wall */
  const q0 = at(S, 0, 0.6);
  panel(150, 195, 560, 420, q0, C.cyan, 'HIGGS MASS WALL · 希格斯质量墙');
  txt('pure electroweak two-loop', 175, 262, { size: 22, fam: F.mono, w: 700, c: C.white, a: q0 });
  txt('thresholds, zeros #11661, #11934', 175, 292, { size: 22, fam: F.mono, w: 700, c: C.white, a: q0 });
  txt('every term > 0', 175, 344, { size: 30, fam: F.math, w: 700, c: C.cyan, a: Q(S, 0, 'every two-loop threshold is positive', 0.5) });
  txt('Δm² ≈ +1.05 × 10²⁶ GeV²', 175, 418, { size: 34, fam: F.orb, w: 900, c: C.now, a: Q(S, 0, 'twenty-six', 0.5) });
  txt(`m_H²/2 = ${A2.num(A2.TREE, 1)} GeV²`, 175, 478, { size: 24, fam: F.math, w: 700, c: C.white, a: Q(S, 0, 'twenty-six', 0.5, 0.4) });
  txt(`ratio ≈ ${(A2.RATIO / 1e22).toFixed(2)} × 10²²`, 175, 520, { size: 24, fam: F.math, w: 700, c: C.mag, a: Q(S, 0, 'twenty-six', 0.5, 0.8) });
  txt('certificate, quoted · 证书', 175, 590, { size: 18, fam: F.zh, w: 700, c: C.dim, a: q0 });
  /* the portal spectrum, P = p(5vv* − I)/4 */
  const q3 = at(S, 3, 0.6), qp = at(S, 1, 0.6);
  panel(750, 195, 470, 420, qp, C.cyan, 'TRACELESS NEUTRAL PORTAL · 无迹中性门户');
  txt('P = p (5vv* − I) / 4', 775, 262, { size: 26, fam: F.math, w: 700, c: C.white, a: q3 });
  txt('rank d, tr P = 0', 775, 262, { size: 26, fam: F.math, w: 700, c: C.white, a: qp * (1 - q3) });
  const BY = 440, BS = 120;
  line(785, BY, 1190, BY, C.dim, qp, 1.6);
  A2.PSPEC.forEach((e, i) => {
    const x = 820 + i * 76, h = e * BS, aa = q3 * Q(S, 3, i === 0 ? 'one positive' : 'four equal negative', 0.5, i ? 0.15 * i : 0);
    if (aa <= 0.003) return;
    const col = e > 0 ? C.cyan : C.mag;
    box(x, Math.min(BY, BY - h), 44, Math.abs(h), col, aa, 2, rgba(col, 0.25));
    txt(e > 0 ? '+p' : '−p/4', x + 22, e > 0 ? BY - h - 14 : BY - h + 30, { size: 20, fam: F.math, w: 700, align: 'center', c: col, a: aa });
  });
  txt(`trace = p (1 − 4 · ¼) = 0`, 775, 590, { size: 22, fam: F.math, w: 700, c: C.cyan, a: Q(S, 3, 'four equal negative', 0.5, 0.8) });
  /* the unitarity thermometer: normalised contact amplitude */
  const TX = 1300, T0 = 250, T1 = 600, vmax = 36, ty = v => T1 - (T1 - T0) * v / vmax;
  const q1 = at(S, 1, 0.6);
  panel(1260, 195, 510, 420, q1, C.cyan, 'CONTACT BOUND · 接触界');
  line(TX + 40, T0, TX + 40, T1, C.dim, q1, 1.6);
  [0, 10, 20, 30].forEach(v => txt(String(v), TX + 28, ty(v) + 7, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: q1 }));
  dashed(TX + 40, ty(A2.EIGHTPI), TX + 450, ty(A2.EIGHTPI), C.white, q1, 2);
  txt(`8π = ${A2.num(A2.EIGHTPI, 5)}`, TX + 450, ty(A2.EIGHTPI) - 12, { size: 22, fam: F.math, w: 700, align: 'right', c: C.white, a: q1 });
  const q2 = Q(S, 2, 'rank four or less', 0.5);
  if (q2 > 0.003) {
    box(TX + 80, ty(31.97519), 130, T1 - ty(31.97519), C.mag, q2, 2, rgba(C.mag, 0.2));
    arrow(TX + 145, ty(31.97519), TX + 145, ty(35.5), C.mag, q2, 3);
    txt('d ≤ 4', TX + 145, T1 + 4 - 20, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q2 });
    txt('> 31.97519', TX + 222, ty(31.97519) + 8, { size: 20, fam: F.mono, w: 700, c: C.mag, a: Q(S, 2, 'thirty-one point nine', 0.5) });
  }
  const q4 = Q(S, 3, 'Rank five fits', 0.5);
  if (q4 > 0.003) {
    box(TX + 300, ty(24.93094), 130, T1 - ty(24.93094), C.cyan, q4, 2, rgba(C.cyan, 0.2));
    txt('d = 5', TX + 365, T1 - 16, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q4 });
    txt('(24.27098,', TX + 365, ty(14), { size: 17, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q4 });
    txt('24.93094)', TX + 365, ty(14) + 24, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q4 });
  }
  /* the Schur certificate */
  const q5 = Q(S, 3, 'kernel-checked Schur minimum', 0.6);
  txt('min_y [x; y]* [[A, B], [B*, C]] [x; y] = x* (A − B C⁻¹ B*) x ,  C ≻ 0', 150, 690, { size: 26, fam: F.math, w: 700, c: C.lean, a: q5 });
  txt('Schur margin of 8π I ± 𝒜 > 3.11842 · rank 5 is exact · 精确最小秩为 5', 150, 734, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: q5 });
  A2.leanChip(150, 800, A2.GID.schur, q5, 20);
};

SCENES.a2_pinch = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  const a = clamp(S.u / 0.6);
  txt('light partners of the balanced broken vacuum, against collider data · 配平破缺真空的轻伙伴，对照对撞机数据', W / 2, 205,
    { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6) });
  const card = (x, y, w, h, t, aa, rows) => {
    panel(x, y, w, h, aa, C.argued, t);
    rows.forEach(([s, sz, col, ph], i) => txt(s, x + 24, y + 78 + i * 46, { size: sz, fam: sz > 26 ? F.orb : F.zh, w: sz > 26 ? 900 : 700, c: col, a: aa * (ph == null ? 1 : ph) }));
  };
  const q1 = Q(S, 1, 'Gluon fusion', 0.5), q1b = Q(S, 1, 'charged partners', 0.5);
  card(150, 240, 790, 270, 'GLUON FUSION · 胶子融合 · gg → H', q1, [
    ['5.60–5.68 × SM', 34, C.now],
    ['top-layer colour sextet locks its Higgs vertex · 顶层色六维', 20, C.white],
    ['pulling back to 1.10 × costs Γ > 38.25 MeV (SM total 4.1 MeV)', 20, C.dim],
    ['clashes with ATLAS Run 2 · 与 ATLAS 冲突', 20, C.mag]]);
  card(980, 240, 790, 270, 'Z WIDTH · CLEO R · Z 宽度与 CLEO', q1b, [
    ['+17.59–17.75 MeV', 34, C.now],
    ['all 20 charged colour assignments · 全部 20 种带电分配', 20, C.white],
    ['CLEO χ²: neutral ≈ 6.05, charged ≥ 13.54', 20, C.dim],
    ['6 neutral assignments survive · 6 种电中性方案存活', 20, C.cyan]]);
  const q0 = Q(S, 0, 'where colliders already look', 0.5);
  card(150, 540, 790, 270, 'OPAL · LONG-LIVED SINGLET · 长寿命单态', q0, [
    ['80.38 GeV  vs  bound 98.0 GeV', 30, C.now],
    ['the charged singlet shared by the 6 neutral schemes', 20, C.white],
    ['must decay fast: B_e + B_μ ≥ 50 %', 20, C.dim]]);
  /* the equal-depth vacuum: U₀(v + h) expanded exactly */
  const q2 = at(S, 2, 0.6);
  panel(980, 540, 790, 270, q2, C.cyan, 'EQUAL-DEPTH VACUUM · 等深真空 · NUM');
  txt('U₀ = (m_H²/8v⁴) r²(r² − v²)²,  r = v + h', 1004, 610, { size: 24, fam: F.math, w: 700, c: C.white, a: q2 });
  const cols = [['h²', 2], ['h³', 3], ['h⁴', 4]];
  cols.forEach(([n, i], j) => {
    const x = 1110 + j * 200;
    txt(n, x, 660, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: q2 });
    txt(A2.fr(frac(A2.U0[i])), x, 702, { size: 28, fam: F.math, w: 700, align: 'center', c: i === 3 ? C.now : C.white, a: q2 });
    txt(A2.fr(frac(A2.SM[i])), x, 744, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: q2 });
    const k = A2.U0[i] / A2.SM[i];
    txt(`× ${k}`, x, 788, { size: 26, fam: F.orb, w: 900, align: 'center', c: i === 3 ? C.now : C.cyan, a: q2 * Q(S, 2, 'exactly three times', 0.5) });
  });
  txt('U₀', 1004, 702, { size: 22, fam: F.math, w: 700, c: C.white, a: q2 });
  txt('SM', 1004, 744, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q2 });
  function frac(x) { for (let d = 1; d <= 16; d++) if (Math.abs(x * d - Math.round(x * d)) < 1e-12) return [Math.round(x * d), d]; return [x, 1]; }
};

SCENES.a2_ask = S => {
  A2.rail(S);
  badgeQ(S, [[0, null, 'open']]);
  const a = clamp(S.u / 0.6), fade = 1 - 0.35 * at(S, 2, 0.6);
  panel(150, 190, 1620, 450, a * fade, C.open, 'OPEN · prob-ou-ch06-question1-open · 第一问收官界碑');
  txt('Question 1 is not yet solved from first principles · 第一问尚未从第一性原理解出', 180, 258, { size: 28, fam: F.zh, w: 700, c: C.white, a: a * fade });
  const items = [
    ['thresholds and matching from the partition function', '从配分函数导出阈值与匹配处方', `scheme spread Δαs ≈ ${(0.1532183 - 0.1189006).toFixed(3)}`, 'matching from the partition function'],
    ['a microscopic take-over above the ceilings', '封顶之上的微观紫外接管', '3.9Q · 14Q–30Q · eight on-shell cascades', 'physics above the ceiling'],
    ['a weak scale and Higgs self-coupling without fine-tuning', '无精细调节的电弱标度与希格斯自耦合', 'tunings of 10²¹–10²³ today', 'without fine-tuning'],
    ['a broken vacuum that survives collider data', '经得起对撞机数据的破缺真空', 'gg → H · Γ_H · Z width · OPAL', 'without fine-tuning']
  ];
  items.forEach(([en, zh, note, ph], i) => {
    const y = 320 + i * 76, aa = a * fade * Q(S, 1, ph, 0.5, i === 3 ? 0.6 : 0);
    if (aa <= 0.003) return;
    ring(196, y - 8, 10, C.open, aa, 2.5);
    txt(en, 226, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: aa });
    txt(zh, 226, y + 30, { size: 18, fam: F.zh, w: 700, c: C.dim, a: aa });
    txt(note, 1740, y, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.open, a: aa });
  });
  SPINE.ask(S, 2, 'Can the same shell make three generations of matter, and keep the proton alive?', '同一个球壳，能造出三代物质并让质子活下来吗？');
};
/* ==== ACT:a2:END ==== */

/* ==== ACT:a3:BEGIN ==== */
/* Act a3 · Volume III · Questions 2 and 3: generations, flavour and the proton (chapters 7, 8, 9).

   SUMMARY (en). Volume III puts two questions to the nineteen-point shell: why three light generations, and why the
   proton lives. Interval certificates give every hypercharge three light modes under one common gap, one per cyclic
   character, with the site-variance cut T = 9 + (1 − δ)² read off the shell; but the common gaps also allow 1, 7 and 15
   modes, a four-dimensional simplex lattice gives three chiral species only on smooth flux, and a rough SU(5) background
   leaves a centre charge of 2 mod 5. Exact cyclic symmetry forbids mixing, the natural Yukawa mechanisms hit sharp
   walls, and Lean-checked Cayley rotations and the Gram unitary extension underpin a rational folding whose mixing is
   calibrated, not derived; baryon triality forbids QQQL and has an anomaly-free gauge origin, yet the same joint-witness
   vacuum allows a stable and a decaying proton, so the choice stays open.
   SUMMARY (zh). 第三卷把两个问题交给十九点球壳：为什么轻费米子恰有三代，质子为什么不衰变。区间证书给出五种超荷共用谱隙下各三个
   轻模、三个循环特征标各占一模，站点方差分界 T = 9 + (1 − δ)² 由球壳边权读出；但共同谱隙同样容许 1、7、15 模，四维单纯形格点只在
   光滑磁通上给出三个手征物种，粗糙 SU(5) 背景留下模 5 余 2 的中心荷。精确轮换禁止混合，朴素汤川机制逐一撞墙；Lean 验证的有理凯莱
   旋转与格拉姆幺正扩张支撑有理折叠，但混合系数仍靠校准而非推导；重子三重对称禁绝 QQQL 并有无反常规范来源，可同一联合见证真空
   同时容许质子稳定与衰变两支，这一选择仍是开放问题。

   Scenes and what each rests on (chapter sections of books/omega-unification/zh/ch07–ch09):
     a3_title    answer to a2's question; the nineteen integer points of x² + y² + z² = 867 with x, y, z ≥ 0 (computed),
                 drawn on the plane normal to (1, 1, 1), where the cycle P : (x, y, z) ↦ (y, z, x) is a 120° turn
                 fixing (17, 17, 17) with six 3-point orbits (computed; ch08 def-ou-ch08-cyclic-rotation); the five
                 charges q = 6Y = 1, 2, −3, −4, 6 of Q, d^c, L, u^c, e^c (computed) and their magnetic Laplacians L_q
                 (the book's model definition, def-ou-ch07-site-variance-cut: argued).
     a3_gap      λ₃(L_q) < 8.685 < 9.6 < λ₄(L_q) for all five charges, all clock phases and all positive zeros, one light
                 mode per character 1, ω, ω² (interval certificate quoted from ch07 §7.1.1: NUM; dot heights schematic);
                 site-variance classes (deg, soft) = (10,0):3, (10,1):3, (14,0):3, (16,0):6, (18,0):3, (18,3):1, cut weight
                 d − k + k(1 − δ)², minimum T = 9 + (1 − δ)², 9.99999999 < T < 10 for 0 < δ < (23/25)2⁻²⁰/14² (computed;
                 ch07 §7.1.2); reading T as the cut is a model assumption (argued).
     a3_count    admissible common low-mode counts {1, 3, 7, 15}; equal character shares need 3 | n → {3, 15} (certificate
                 quoted + computed); widest gap picks 1 (quoted); the selection of three is prob-ou-ch07-chiral-selection (OPEN).
     a3_lattice  three-species window (25 − 5√5)/4 < m < 7/2 and m = 139/40 inside it (computed); index I = −3·Pf(C) on
                 smooth flux, I(5̄) = −6, I(10) = −18 for two unit faces (certificates quoted from ch07 §7.2.2: NUM);
                 cones and lattice drawn schematically.
     a3_rough    P(2⁻²⁶ ball) < 2⁻⁵⁶⁰ (certificate quoted, §7.3); (I₅̄, I₁₀) = (2, 7), −2 + 2·7 = 12 ≡ 2 mod 5
                 (computed from the quoted indices); unbroken groups SU(4), SU(3), SU(2), {1} for 1–4 orthonormal frames
                 and the 3-versus-4 frame gap statement (rem-ou-ch07-three-vs-four-frames: argued); link phases schematic.
     a3_cycle    exact cycle ⇒ CKM is a permutation times phases (ch08 §8.1, written derivation: argued); the floor:
                 0.035·0.98 = 0.0343, ‖[A, B]‖ > 0.0479 (quoted), 0.0479·√3/2 = 0.04148… > 0.0414 (computed).
     a3_walls    m_c/m_t > 0.0272 vs 0.00361; m_t/m_b < 30 on all 1238 zeros of [10855, 12092] vs > 40 (and < 2.690 at
                 #11431); m_u/m_ℓ < 3.34 vs 84.98 (interval certificates quoted from ch08 §8.2: NUM).
     a3_fold     Cayley rotation of s = (1/2, 1/2, 0): R = ⅓[[2, 1, 2], [1, 2, −2], [−2, 2, 1]], RᵀR = I (computed) .....
                 OmegaCayleyRotation.cayley_orthogonal (LEAN); B*B = A*A ⇒ B = UA ..... GramUnitaryExtension.
                 exists_unitary_mul_eq_of_conjTranspose_mul_eq (LEAN); (I + T¹⁶)⁻¹ matches the ideal mixing light block to
                 10⁻¹¹ on seven zeros, leakage < 1.70 × 10⁻³⁰ (certificate quoted, ch08 §8.4.1: NUM); strengths calibrated
                 on #28325 (argued; prob-ou-ch08-common-flavor-law).
     a3_qqql     one-generation QQQL has 36 nonzero Grassmann monomials, coefficient 4 on the chapter's example (computed
                 here by brute force, ch09 ex-ou-ch09-qqql-grassmann); X_eff ≡ −hB mod 3 (def-ou-ch09-baryon-triality and
                 §9.2: argued); B and X_eff of QQQL, Yukawa, Weinberg (computed, h = 1); dimension 6 → 15 (→ 18 with B − L)
                 (certificate quoted: NUM).
     a3_anomaly  X = 3B − 9L_τ: the six anomaly traces SU(3)²X, SU(2)²X, Y²X, YX², X³, grav²X, quark and τ parts and sums
                 (computed here in exact rationals; rem-ou-ch09-anomaly-ledger).
     a3_fork     joint witness zero #2,306,888,100,085, same 105-loop vacuum; orthogonal currents keep ΔB ≡ 0 mod 3, parallel
                 currents give |W| ≥ 0.0314398418770995 (certificate quoted, ch09 §9.4.2: NUM); c₆ and the selection of
                 three generations are prob-ou-ch09-proton-uv-selection and prob-ou-ch07-chiral-selection (OPEN).
     a3_ask      the volume's tiers (argued) and the question handed to act a4.
   On load, FILM.init re-derives every computed number by a second route and checks both citations; any disagreement
   goes to window.FILM_ERRORS. */
const A3 = (() => {
  const GID = {
    cayley: 'D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal',
    gram: 'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq'
  };
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const neg = s => String(s).replace(/-/g, '−');
  /* exact rationals [n, d] */
  const R = (n, d = 1) => { const g = gcd(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
  const radd = (a, b) => R(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
  const rmul = (a, b) => R(a[0] * b[0], a[1] * b[1]);
  const rstr = a => neg(a[1] === 1 ? String(a[0]) : `${a[0]}/${a[1]}`);

  /* ---------- the shell: integer points of x² + y² + z² = 867, x, y, z ≥ 0 ---------- */
  const PTS = [];
  for (let x = 0; x <= 29; x++) for (let y = 0; y <= 29; y++) for (let z = 0; z <= 29; z++)
    if (x * x + y * y + z * z === 867) PTS.push([x, y, z]);
  const Pmap = p => [p[1], p[2], p[0]];
  const key = p => p.join(',');
  /* orbits of the cycle P */
  const ORB = [], seen = new Set();
  PTS.forEach(p => { if (seen.has(key(p))) return; const o = [p]; seen.add(key(p));
    let q = Pmap(p); while (key(q) !== key(p)) { o.push(q); seen.add(key(q)); q = Pmap(q); } ORB.push(o); });
  /* projection to the plane normal to (1, 1, 1) */
  const s2 = Math.SQRT2, s6 = Math.sqrt(6);
  const plane = p => [(p[0] - p[1]) / s2, (p[0] + p[1] - 2 * p[2]) / s6];
  /* draw the shell at (cx, cy) with scale sc; turn = fraction of one application of P (0 → 1) */
  function shell(cx, cy, sc, a, o = {}) {
    if (a <= 0.003) return;
    const turn = o.turn || 0, rot = o.rot || 0;
    ring(cx, cy, 21.5 * sc, C.cyan, a * 0.22, 1.2);
    PTS.forEach(p => {
      const [u, v] = plane(p), r = Math.hypot(u, v);
      if (r < 1e-9) return;
      const th = Math.atan2(v, u) - turn * TAU / 3 + rot;  // P is a turn by −120° in these coordinates (checked in init)
      const oi = ORB.findIndex(ob => ob.some(q => key(q) === key(p)));
      dot(cx + sc * r * Math.cos(th), cy - sc * r * Math.sin(th), o.hot === oi ? 13 : 10, o.hot === oi ? 'g' : 'c', a);
    });
    dot(cx, cy, 12, 'w', a);
    if (o.label) txt('(17, 17, 17)', cx, cy + 40, { size: 18, fam: F.mono, align: 'center', c: C.white, a: a * 0.85 });
  }
  /* the five hypercharges of one generation: integer 6Y */
  const CHG = [['Q', [1, 6]], ['dᶜ', [1, 3]], ['L', [-1, 2]], ['uᶜ', [-2, 3]], ['eᶜ', [1, 1]]]
    .map(([n, y]) => ({ n, y, q: 6 * y[0] / y[1] }));

  /* ---------- site variance (ch07 §7.1.2): classes (degree, soft spokes): count ---------- */
  const SITES = [[10, 0, 3], [10, 1, 3], [14, 0, 3], [16, 0, 6], [18, 0, 3], [18, 3, 1]];
  const DMAX = 0.92 / (2 ** 20) / 196;  // the bound on δ over all positive zeros, (23/25)·2⁻²⁰/14²
  const cutW = (d, k, del) => d - k + k * (1 - del) ** 2;

  /* ---------- four-dimensional window (ch07 §7.2.2) ---------- */
  const MLO = (25 - 5 * Math.sqrt(5)) / 4, MHI = 7 / 2, M0 = 139 / 40;

  /* ---------- Cayley rotation of a rational vector (num/den), the convention of the omega-math film ---------- */
  function cayley(s) {   // s = [[n,d], …]; returns 3×3 of rationals
    const ss = s.reduce((t, x) => radd(t, rmul(x, x)), R(0)), den = radd(R(1), ss);
    const one_m = radd(R(1), [-ss[0], ss[1]]);
    const X = [[R(0), [-s[2][0], s[2][1]], s[1]], [s[2], R(0), [-s[0][0], s[0][1]]], [[-s[1][0], s[1][1]], s[0], R(0)]];
    const M = [0, 1, 2].map(i => [0, 1, 2].map(j => {
      let v = rmul(R(2), rmul(s[i], s[j]));
      if (i === j) v = radd(v, one_m);
      v = radd(v, rmul(R(2), X[i][j]));
      return R(v[0] * den[1], v[1] * den[0]);
    }));
    return M;
  }
  const SV = [R(1, 2), R(1, 2), R(0)];
  const CR = cayley(SV);

  /* ---------- QQQL for one generation: ε_abc ε_ij ε_kl ε_αβ ε_γδ Q^{aiα} Q^{bjβ} Q^{ckγ} L^{lδ} ---------- */
  const e2 = (i, j) => (i === j ? 0 : i < j ? 1 : -1);
  const e3 = (a, b, c) => (a === b || b === c || a === c) ? 0 : ((b - a) * (c - a) * (c - b) > 0 ? 1 : -1);
  const qi = (a, i, al) => a * 4 + i * 2 + al, li = (l, d) => 12 + l * 2 + d;
  function sortSign(g) {
    const h = g.slice(); let s = 1;
    for (let x = 0; x < h.length; x++) for (let y = 0; y + 1 < h.length - x; y++) if (h[y] > h[y + 1]) { [h[y], h[y + 1]] = [h[y + 1], h[y]]; s = -s; }
    return [h, s];
  }
  function qqql() {
    const M = new Map();
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
      const w3 = e3(a, b, c); if (!w3) continue;
      for (let m = 0; m < 256; m++) {
        const bit = k => (m >> k) & 1;
        const [i, j, k, l, al, be, ga, de] = [0, 1, 2, 3, 4, 5, 6, 7].map(bit);
        const w = w3 * e2(i, j) * e2(k, l) * e2(al, be) * e2(ga, de); if (!w) continue;
        const g = [qi(a, i, al), qi(b, j, be), qi(c, k, ga), li(l, de)];
        if (new Set(g).size < 4) continue;
        const [h, s] = sortSign(g), kk = h.join(',');
        M.set(kk, (M.get(kk) || 0) + s * w);
      }
    }
    return [...M.entries()].filter(([, v]) => v !== 0);
  }
  const MONO = qqql();

  /* ---------- U(1)_X = 3B − 9L_τ anomaly ledger (ch09 rem-ou-ch09-anomaly-ledger) ---------- */
  /* left-handed Weyl fields of one family: [name, colour dim, SU(2) dim, Y, X] */
  const QF = [['Q', 3, 2, R(1, 6), 1], ['uᶜ', 3, 1, R(-2, 3), -1], ['dᶜ', 3, 1, R(1, 3), -1]];
  const TF = [['L_τ', 1, 2, R(-1, 2), -9], ['eᶜ_τ', 1, 1, R(1), 9], ['νᶜ_τ', 1, 1, R(0), 9]];
  /* each trace, as a function of a field list and a generation multiplicity */
  const TRACES = [
    ['SU(3)²X', (f, g) => f.reduce((t, x) => radd(t, R(g * (x[1] === 3 ? x[2] : 0) * x[4])), R(0))],
    ['SU(2)²X', (f, g) => f.reduce((t, x) => radd(t, R(g * (x[2] === 2 ? x[1] : 0) * x[4])), R(0))],
    ['Y²X', (f, g) => f.reduce((t, x) => radd(t, rmul(R(g * x[1] * x[2] * x[4]), rmul(x[3], x[3]))), R(0))],
    ['YX²', (f, g) => f.reduce((t, x) => radd(t, rmul(R(g * x[1] * x[2] * x[4] * x[4]), x[3])), R(0))],
    ['X³', (f, g) => f.reduce((t, x) => radd(t, R(g * x[1] * x[2] * x[4] ** 3)), R(0))],
    ['grav²X', (f, g) => f.reduce((t, x) => radd(t, R(g * x[1] * x[2] * x[4])), R(0))]
  ];
  const LEDGER = TRACES.map(([n, fn]) => { const q = fn(QF, 3), t = fn(TF, 1); return { n, q, t, s: radd(q, t) }; });

  /* ---------- drawing helpers ---------- */
  function rail(S, a = 1) { SPINE.rail(S, 3, a * clamp((S.d - S.u) / 0.4)); }
  function leanChip(x, y, gid, a, size = 20, short = null) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(short || r.label || r.name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  function strike(x, y, w, a, col = C.mag) { line(x - 6, y + 10, x + w + 6, y - 10, col, a, 4); }
  /* fade a whole scene out in its last 0.5 s */
  const out = S => clamp((S.d - S.u) / 0.5);
  return { GID, gcd, neg, R, radd, rmul, rstr, PTS, ORB, Pmap, plane, shell, CHG, SITES, DMAX, cutW, MLO, MHI, M0,
    cayley, SV, CR, MONO, qi, li, e2, e3, sortSign, QF, TF, TRACES, LEDGER, rail, leanChip, strike, out };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a3: ' + m); };
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  Object.values(A3.GID).forEach(g => { const r = leanCite(g); check(r && r.kind === 'theorem', `${g} is not a cited theorem`); });
  /* the shell: 19 points, the fixed pole and six 3-orbits; projection turns P into a −120° rotation */
  check(A3.PTS.length === 19, `shell has ${A3.PTS.length} points`);
  check(A3.ORB.length === 7 && A3.ORB.filter(o => o.length === 3).length === 6 && A3.ORB.some(o => o.length === 1 && eq(o[0], [17, 17, 17])), 'orbits of P');
  A3.PTS.forEach(p => {
    const [u, v] = A3.plane(p), [u2, v2] = A3.plane(A3.Pmap(p)), c = Math.cos(-TAU / 3), s = Math.sin(-TAU / 3);
    check(Math.abs(u * c - v * s - u2) < 1e-9 && Math.abs(u * s + v * c - v2) < 1e-9, `P is not a −120° turn at ${p}`);
  });
  /* charges 6Y, and the conjugate-pair spectrum depends on |q| only */
  check(eq(A3.CHG.map(c => c.q), [1, 2, -3, -4, 6]), 'charges 6Y');
  check(eq(A3.CHG.map(c => Math.abs(c.q)).sort((a, b) => a - b), [1, 2, 3, 4, 6]), '|q|');
  /* site classes: 19 sites, Σ degree = 2·135, six soft endpoints = 2·3 spokes, the minimum class and T's bounds */
  const S0 = A3.SITES;
  check(S0.reduce((t, s) => t + s[2], 0) === 19, 'site count');
  check(S0.reduce((t, s) => t + s[0] * s[2], 0) === 270, 'degree sum 270');
  check(S0.reduce((t, s) => t + s[1] * s[2], 0) === 6, 'soft endpoints 6');
  [1e-9, A3.DMAX, 1e-12].forEach(d => {
    const w = S0.map(s => A3.cutW(s[0], s[1], d)), mn = Math.min(...w);
    check(w.indexOf(mn) === 1 && Math.abs(mn - (9 + (1 - d) ** 2)) < 1e-12, 'minimum at (10, 1)');
  });
  { const lo = 9 + (1 - A3.DMAX) ** 2; check(lo > 9.99999999 && lo < 10, 'T bounds'); }
  /* equal shares of three characters: n ≡ 0 mod 3 */
  check(eq([1, 3, 7, 15].filter(n => n % 3 === 0), [3, 15]), 'equal shares');
  /* the window and m = 139/40; decimal 3.455 */
  check(A3.MLO < A3.M0 && A3.M0 < A3.MHI && Math.abs(A3.MLO - 3.4549) < 1e-4, 'mass window');
  check(((25 - 3.455 * 4) / 5) ** 2 < 5.001 && ((25 - 3.455 * 4) / 5) ** 2 > 4.999, '√5 route for 3.455');
  /* centre charge */
  check(((-2 + 2 * 7) % 5 + 5) % 5 === 2 && -2 + 14 === 12, 'centre charge 2 mod 5');
  /* cycle floor */
  check(Math.abs(0.035 * 0.98 - 0.0343) < 1e-12, '0.035 · 0.98');
  check(0.0479 * Math.sqrt(3) / 2 > 0.0414 && Math.abs(0.0479 * Math.sqrt(3) / 2 - 0.041483) < 1e-5, '√3/2 · 0.0479');
  /* Cayley: R = ⅓ M with the integer matrix M, MᵀM = 9I and det M = 27, by integers */
  const M = [[2, 1, 2], [1, 2, -2], [-2, 2, 1]];
  check(eq(A3.CR, M.map(r => r.map(v => A3.R(v, 3)))), 'Cayley(1/2, 1/2, 0)');
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const v = M[0][i] * M[0][j] + M[1][i] * M[1][j] + M[2][i] * M[2][j];
    check(v === (i === j ? 9 : 0), `MᵀM[${i}][${j}]`);
  }
  const det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  check(det === 27, 'det = 1');
  /* Cayley orthogonality for many rational vectors, in exact rationals */
  for (let t = 0; t < 40; t++) {
    const s = [0, 1, 2].map(k => A3.R(Math.floor(rnd(t, k) * 11) - 5, 1 + Math.floor(rnd(t, k + 7) * 6)));
    const C3 = A3.cayley(s);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      let v = A3.R(0); for (let k = 0; k < 3; k++) v = A3.radd(v, A3.rmul(C3[k][i], C3[k][j]));
      check(eq(v, A3.R(i === j ? 1 : 0)), `Cayley orthogonality at sample ${t}`);
    }
  }
  /* QQQL: 36 monomials; second route: for each choice of 3 distinct Q generators and 1 L generator, sum the signed
     weights of all orderings directly from the definition */
  check(A3.MONO.length === 36, `QQQL has ${A3.MONO.length} monomials`);
  const dec = g => (g < 12 ? [Math.floor(g / 4), Math.floor(g / 2) % 2, g % 2] : [Math.floor((g - 12) / 2), (g - 12) % 2]);
  let cnt = 0, ex = null;
  for (let x = 0; x < 12; x++) for (let y = x + 1; y < 12; y++) for (let z = y + 1; z < 12; z++) for (let l = 12; l < 16; l++) {
    let coef = 0; const tri = [x, y, z];
    [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].forEach(pm => {
      const [A, B, Cc] = pm.map(k => dec(tri[k])), Lq = dec(l);
      const sgn = A3.sortSign([tri[pm[0]], tri[pm[1]], tri[pm[2]], l])[1];
      coef += sgn * A3.e3(A[0], B[0], Cc[0]) * A3.e2(A[1], B[1]) * A3.e2(Cc[1], Lq[0]) * A3.e2(A[2], B[2]) * A3.e2(Cc[2], Lq[1]);
    });
    if (coef) cnt++;
    if (x === A3.qi(0, 0, 0) && y === A3.qi(1, 0, 0) && z === A3.qi(2, 1, 1) && l === A3.li(1, 1)) ex = coef;
  }
  check(cnt === 36, `second route counts ${cnt}`);
  check(Math.abs(ex) === 4, `example coefficient ${ex}`);
  check(eq([...new Set(A3.MONO.map(([, v]) => Math.abs(v)))].sort(), [2, 4]), 'coefficients ±2, ±4');
  /* anomaly ledger: the chapter's per-sector values, and an independent float route */
  const want = [[0, 0], [9, -9], [-4.5, 4.5], [0, 0], [0, 0], [0, 0]];
  A3.LEDGER.forEach((r, i) => {
    check(Math.abs(r.q[0] / r.q[1] - want[i][0]) < 1e-12 && Math.abs(r.t[0] / r.t[1] - want[i][1]) < 1e-12, `${r.n} parts`);
    check(r.s[0] === 0, `${r.n} does not cancel`);
  });
  { const y2x = 3 * 3 * (2 * (1 / 6) ** 2 * 1 + (2 / 3) ** 2 * -1 + (1 / 3) ** 2 * -1) + 2 * 0.25 * -9 + 9;
    const x3 = 9 * (2 - 1 - 1) + 2 * (-729) + 729 + 729;
    check(Math.abs(y2x) < 1e-12 && x3 === 0, 'float route Y²X, X³'); }
  /* triality on operators, X_eff = −hB mod 3 with h = 1 */
  const xe = B => (((-B) % 3) + 3) % 3;
  check(xe(1) === 2 && xe(0) === 0 && xe(3) === 0, 'X_eff');
});
Object.assign(FILM.speed, { a3_title: 0.02, a3_gap: 0.014, a3_count: 0.014, a3_lattice: 0.016, a3_rough: 0.02,
  a3_cycle: 0.014, a3_walls: 0.016, a3_fold: 0.014, a3_qqql: 0.014, a3_anomaly: 0.014, a3_fork: 0.018, a3_ask: 0.02 });

/* ================================ scenes ================================ */
SCENES.a3_title = S => {
  const u = S.u, a0 = at(S, 0, 0.8);
  SPINE.title(S, 3, '第二与第三问：三代、味与质子', 'Questions 2 and 3: generations, flavour and the proton');
  A3.rail(S, a0);
  badgeQ(S, [[0, null, 'argued']]);
  const aa = a0 * A3.out(S);
  A3.shell(620, 520, 13, aa, { rot: 0.06 * u, label: true });
  txt('x² + y² + z² = 867 · 19 points', 620, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: aa });
  txt('三代？质子？', 620, 215, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: aa * Q(S, 0, 'Volume three', 0.6) });
  /* the five hypercharges */
  const a1 = at(S, 1, 0.6) * A3.out(S);
  panel(1120, 220, 640, 590, a1, C.cyan, 'FIVE HYPERCHARGES · 五种超荷 · q = 6Y');
  A3.CHG.forEach((c, i) => {
    const y = 300 + i * 100, ai = a1 * Q(S, 1, 'Five hypercharges', 0.5, i * 0.18);
    txt(c.n, 1170, y + 14, { size: 38, fam: F.math, w: 700, c: C.white, a: ai });
    txt(`q = ${A3.neg(c.q)}`, 1330, y + 14, { size: 34, fam: F.mono, w: 700, c: C.cyan, a: ai });
    txt('L_q : 19 × 19', 1520, y + 12, { size: 24, fam: F.mono, c: C.white, a: ai * Q(S, 1, 'magnetic Laplacian', 0.5) });
  });
};

SCENES.a3_gap = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  /* the ladder: λ from 6.5 to 12.5, the three lines 8.685, 9 and 9.6 */
  const a0 = at(S, 0, 0.6) * A, X0 = 170, X1 = 960, Y0 = 790, Y1 = 230;
  const ly = l => Y0 - (l - 6.5) / 6 * (Y0 - Y1);
  panel(X0 - 40, Y1 - 50, X1 - X0 + 80, Y0 - Y1 + 110, a0, C.cyan, 'LOW END OF L_q · 五荷谱底端');
  [[8.685, C.cyan, '8.685'], [9.6, C.vio, '9.6']].forEach(([l, col, s]) => {
    dashed(X0 + 70, ly(l), X1 - 20, ly(l), col, a0 * 0.8, 2);
    txt(s, X0 + 60, ly(l) + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: a0 });
  });
  A3.CHG.forEach((c, i) => {
    const x = X0 + 150 + i * 150, ai = a0 * Q(S, 0, 'three light modes', 0.5, i * 0.1);
    txt(`q=${A3.neg(c.q)}`, x, Y0 + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a0 });
    /* schematic heights: three light dots under 8.685, heavy dots above 9.6 (sixteen in all, most off the top) */
    const lights = [7.0 + 0.12 * i, 7.65 + 0.08 * ((i * 3) % 5), 8.25 + 0.06 * ((i * 2) % 5)];
    lights.forEach((l, k) => {
      dot(x, ly(l), 12, 'c', ai);
      txt(['1', 'ω', 'ω²'][k], x + 22, ly(l) + 8, { size: 20, fam: F.math, w: 700, c: C.cyan, a: ai * Q(S, 1, 'cyclic character', 0.5) });
    });
    [10.0 + 0.1 * i, 10.9 + 0.12 * ((i * 2) % 3), 11.8 + 0.1 * i].forEach(l => dot(x, ly(l), 10, 'v', a0 * Q(S, 0, 'sixteen heavy', 0.5, i * 0.1)));
    txt('↑ 16', x, Y1 + 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.vio, a: a0 * Q(S, 0, 'sixteen heavy', 0.5) });
  });
  txt('dot heights schematic · bounds: interval certificate', X0 + 70, Y0 + 80, { size: 18, fam: F.mono, c: C.dim, a: a0 });
  const a1 = Q(S, 1, 'every clock phase', 0.6) * A;
  txt('∀ clock phases · ∀ positive zeros', (X0 + X1) / 2 + 30, ly(9.6) + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a1 });
  /* the site-variance table */
  const a2 = at(S, 2, 0.6) * A, PX = 1040, PW = 740;
  panel(PX, Y1 - 50, PW, Y0 - Y1 + 110, a2, C.argued, 'SITE VARIANCE · 站点方差 · Σ w²');
  txt('site class (degree, soft)', PX + 30, Y1 + 20, { size: 18, fam: F.mono, c: C.dim, a: a2 });
  txt('sites', PX + 330, Y1 + 20, { size: 18, fam: F.mono, c: C.dim, a: a2 });
  txt('d − k + k(1 − δ)²', PX + 450, Y1 + 20, { size: 18, fam: F.mono, c: C.dim, a: a2 });
  const hot = Q(S, 2, 'three outer sites', 0.6);
  A3.SITES.forEach((s, i) => {
    const y = Y1 + 70 + i * 62, ai = a2 * clamp((u - lineAt(S, 2).s - 0.3 - i * 0.2) / 0.4);
    const isMin = i === 1, col = isMin && hot > 0 ? C.now : C.white;
    txt(`(${s[0]}, ${s[1]})`, PX + 30, y, { size: 26, fam: F.mono, w: 700, c: col, a: ai });
    txt(`× ${s[2]}`, PX + 330, y, { size: 26, fam: F.mono, w: 700, c: col, a: ai });
    const v = s[1] ? (s[1] === 1 ? '9 + (1 − δ)²' : '15 + 3(1 − δ)²') : String(s[0]);
    const bw = (A3.cutW(s[0], s[1], 0) - 8) * 26;
    fillBox(PX + 450, y - 20, bw, 24, isMin && hot > 0 ? C.now : C.cyan, ai * 0.35);
    txt(v, PX + 460, y, { size: 22, fam: F.mono, w: 700, c: col, a: ai });
  });
  const a3 = Q(S, 2, 'three outer sites', 0.6) * A, yb = Y1 + 70 + 6 * 62 + 10;
  txt('T = min = 9 + (1 − δ)²', PX + 30, yb, { size: 34, fam: F.math, w: 700, c: C.now, a: a3 });
  txt('9.99999999 < T < 10', PX + 30, yb + 46, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: Q(S, 2, 'just under ten', 0.5) * A });
  txt('the model reads T as the cut · 模型假设', PX + 30, yb + 92, { size: 22, fam: F.mono, c: C.argued, a: a3 });
};

SCENES.a3_count = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'Nothing yet pins three', 'open']]);
  const a0 = at(S, 0, 0.6) * A;
  txt('admissible common low-mode counts · 全零点共同低模数', W / 2, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: a0 });
  const ns = [1, 3, 7, 15], eqs = Q(S, 1, 'Equal character shares', 0.6);
  ns.forEach((n, i) => {
    const x = 450 + i * 340, y = 440, ai = a0 * Q(S, 0, ['one', 'three', 'seven', 'fifteen'][i], 0.4);
    const keep = n % 3 === 0, col = eqs > 0 && keep ? C.now : C.cyan;
    chip(x, y, 220, 160, String(n), col, ai * (eqs > 0 && !keep ? 0.45 : 1), 96, F.orb);
    if (!keep) A3.strike(x - 110, y, 220, eqs * ai);
    txt(keep ? `${n} = 3 × ${n / 3}` : `${n} ≢ 0 mod 3`, x, y + 130, { size: 24, fam: F.mono, w: 700, align: 'center', c: keep ? C.now : C.mag, a: eqs * ai });
  });
  txt('widest common gap: 1 mode', 450, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: Q(S, 0, 'the gaps allow', 0.6) * A });
  txt('equal shares of 1, ω, ω²  ⇒  3 | n', W / 2, 720, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: eqs * A });
  const a2 = Q(S, 1, 'Nothing yet pins three', 0.5) * A;
  panel(W / 2 - 430, 755, 860, 72, a2, C.open, 'OPEN · 开放');
  txt('3 or 15? the selection of three is not derived', W / 2, 808, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.open, a: a2 });
};

SCENES.a3_lattice = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* a schematic 4D lattice: a 3⁴ grid projected to the plane */
  const a0 = at(S, 0, 0.7) * A, cx = 470, cy = 470;
  const pr = (v, t) => { const ang = 0.15 * t;
    const x = v[0] * 1.0 + v[1] * 0.35 + v[2] * 0.62 * Math.cos(ang) + v[3] * -0.3;
    const y = v[0] * 0.18 + v[1] * -0.9 + v[2] * 0.42 * Math.sin(ang + 1) + v[3] * 0.55;
    return [cx + 115 * x, cy + 115 * y]; };
  const G = [];
  for (let i = 0; i < 81; i++) G.push([i % 3 - 1, Math.floor(i / 3) % 3 - 1, Math.floor(i / 9) % 3 - 1, Math.floor(i / 27) - 1]);
  if (a0 > 0.003) {
    G.forEach(v => { for (let d = 0; d < 4; d++) if (v[d] < 1) { const w = v.slice(); w[d]++; const p = pr(v, u), q = pr(w, u); line(p[0], p[1], q[0], q[1], C.cyan, a0 * 0.18, 1); } });
    G.forEach(v => { const p = pr(v, u); dot(p[0], p[1], 5, 'c', a0 * 0.8); });
  }
  txt('4D lattice · 四维格点 (schematic)', cx, 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0 });
  /* the mass window */
  const a1 = at(S, 1, 0.6) * A, X0 = 960, X1 = 1760, Y = 340, lo = 3.40, hi = 3.55;
  const mx = m => X0 + (m - lo) / (hi - lo) * (X1 - X0);
  panel(X0 - 40, 200, X1 - X0 + 80, 250, a1, C.cyan, 'WILSON MASS m · 三物种质量窗');
  line(X0, Y, X1, Y, C.white, a1 * 0.6, 2);
  fillBox(mx(A3.MLO), Y - 26, mx(A3.MHI) - mx(A3.MLO), 52, C.cyan, a1 * 0.25);
  [[A3.MLO, '(25 − 5√5)/4'], [A3.MHI, '7/2']].forEach(([m, s], k) => {
    line(mx(m), Y - 34, mx(m), Y + 34, C.cyan, a1, 3);
    txt(s, mx(m) + (k ? 10 : -10), Y + 70, { size: 24, fam: F.math, w: 700, align: k ? 'left' : 'right', c: C.cyan, a: a1 });
    txt(k ? '3.5' : '≈ 3.455', mx(m) + (k ? 10 : -10), Y + 102, { size: 20, fam: F.mono, align: k ? 'left' : 'right', c: C.white, a: a1 });
  });
  const am = Q(S, 1, 'exactly three species', 0.5) * A;
  dot(mx(A3.M0), Y, 13, 'g', am);
  txt('m = 139/40', mx(A3.M0), Y - 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: am });
  /* three cones of one handedness */
  for (let k = 0; k < 3; k++) {
    const x = 1060 + k * 180, y = 600, ak = am * clamp((u - phraseAt(S, 1, 'exactly three species') - 0.2 * k) / 0.4);
    line(x - 55, y - 70, x, y, C.cyan, ak, 3); line(x + 55, y - 70, x, y, C.cyan, ak, 3);
    line(x - 55, y + 70, x, y, C.cyan, ak * 0.5, 2); line(x + 55, y + 70, x, y, C.cyan, ak * 0.5, 2);
    dot(x, y, 8, 'c', ak); txt('L', x, y + 105, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ak });
  }
  txt('3 Weyl species', 1640, 590, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: am });
  txt('one handedness', 1640, 622, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: am });
  const a2 = at(S, 2, 0.6) * A;
  panel(X0 - 40, 720, X1 - X0 + 80, 110, a2, C.cyan, 'SMOOTH FLUX · 光滑磁通');
  txt('I = −3 · Pf(C)', X0, 800, { size: 36, fam: F.math, w: 700, c: C.white, a: a2 });
  txt('two unit faces:  I(5̄) = −6 ,  I(10) = −18', X0 + 290, 798, { size: 22, fam: F.math, w: 700, c: C.cyan, a: a2 * Q(S, 2, 'three copies', 0.5) });
};

SCENES.a3_rough = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  /* plaquettes: link phase arrows, smooth then rough */
  const a0 = at(S, 0, 0.6) * A, rough = Q(S, 0, 'is rough', 1.2), N = 7, x0 = 170, y0 = 240, st = 72;
  panel(x0 - 30, y0 - 60, N * st + 40, N * st + 120, a0, C.mag, 'LINK PHASES · 规范链 (schematic)');
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const x = x0 + i * st + 20, y = y0 + j * st + 20, th = rough * (rnd(i, j) - 0.5) * 5.5 + 0.12 * Math.sin(0.6 * u + i);
    const col = rough > 0.5 ? C.mag : C.cyan;
    arrow(x - 22 * Math.cos(th), y - 22 * Math.sin(th), x + 22 * Math.cos(th), y + 22 * Math.sin(th), col, a0 * 0.85, 2.2);
  }
  txt('P(smooth enough) < 2⁻⁵⁶⁰', x0 + N * st / 2 - 15, y0 + N * st + 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: Q(S, 0, 'two to the minus 560', 0.5) * A });
  /* centre charge */
  const a1 = at(S, 1, 0.6) * A, PX = 800, PW = 980;
  panel(PX, 180, PW, 300, a1, C.cyan, 'ROUGH SU(5) · 5⁴ BOX · 粗糙背景');
  txt('( I(5̄) , I(10) ) = (2, 7)', PX + 40, 260, { size: 40, fam: F.math, w: 700, c: C.white, a: a1 });
  txt('−I(5̄) + 2·I(10) = −2 + 14 = 12 ≡ 2 (mod 5)', PX + 40, 340, { size: 32, fam: F.math, w: 700, c: C.now, a: a1 * Q(S, 1, 'centre charge', 0.5) });
  stamp('NO CANCEL', PX + 760, 420, Q(S, 1, 'does not cancel', 0.4), C.mag, 34, -0.06);
  txt('centre charge on the determinant line', PX + 40, 420, { size: 22, fam: F.mono, c: C.dim, a: a1 });
  /* Higgs frames */
  const a2 = at(S, 2, 0.6) * A;
  panel(PX, 510, PW, 320, a2, C.argued, 'ORTHONORMAL HIGGS FRAMES · 正交希格斯标架');
  [['1', 'SU(4)'], ['2', 'SU(3)'], ['3', 'SU(2)'], ['4', '{1}']].forEach(([n, g], i) => {
    const y = 580 + i * 62, ai = a2 * clamp((u - lineAt(S, 2).s - 0.2 * i) / 0.4), four = i === 3;
    const hl = four ? Q(S, 2, 'four frames', 0.5) : i === 2 ? Q(S, 2, 'Three Higgs frames', 0.5) : 0;
    txt(`${n} frame${n === '1' ? ' ' : 's'}`, PX + 40, y, { size: 26, fam: F.mono, w: 700, c: hl > 0 ? C.now : C.white, a: ai });
    txt(`→ ${g}`, PX + 260, y, { size: 26, fam: F.math, w: 700, c: C.white, a: ai });
    txt(four ? 'gap ≥ 1/100, stiffness ~ log L' : 'near-zero modes in large boxes', PX + 450, y, { size: 22, fam: F.mono, w: 700, c: four ? C.cyan : C.mag, a: ai });
  });
};

SCENES.a3_cycle = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* the shell turning by one application of P */
  const a0 = at(S, 0, 0.6) * A, t0 = phraseAt(S, 0, 'exact cycle');
  const turn = ease(clamp((u - t0) / 1.6)) + ease(clamp((u - t0 - 2.4) / 1.6));
  A3.shell(430, 470, 12, a0, { turn, hot: 0 });
  txt('P : (x, y, z) ↦ (y, z, x)', 430, 780, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: a0 });
  txt('1 fixed point · 6 orbits of 3', 430, 818, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: a0 });
  /* the mixing matrix under the exact cycle */
  const a1 = Q(S, 0, 'only a permutation', 0.6) * A, MX = 870, MY = 220, c = 92;
  txt('V_CKM', MX, MY - 10, { size: 26, fam: F.mono, w: 700, c: C.white, a: a0 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const on = (j === (i + 1) % 3);
    box(MX + j * c, MY + 10 + i * c, c - 10, c - 10, on ? C.cyan : C.dim, a0 * (on ? 1 : 0.5), 1.5, on ? rgba(C.cyan, 0.18 * a1) : null);
    txt(on ? 'e^(iφ)' : '0', MX + j * c + (c - 10) / 2, MY + 10 + i * c + 50, { size: on ? 20 : 26, fam: F.mono, w: 700, align: 'center', c: on ? C.cyan : C.dim, a: a1 });
  }
  txt('exact cycle ⇒', MX, MY + 330, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a1 });
  txt('permutation × phases', MX, MY + 362, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a1 });
  txt('non-degenerate masses,', MX, MY + 398, { size: 18, fam: F.mono, c: C.dim, a: a1 });
  txt('one Higgs phase', MX, MY + 424, { size: 18, fam: F.mono, c: C.dim, a: a1 });
  /* the floor */
  const a2 = at(S, 1, 0.6) * A, FX = 1230;
  panel(FX, 200, 560, 400, a2, C.cyan, 'HAND ALGEBRA · 手算');
  txt('|V_cb| > 0.035', FX + 30, 270, { size: 28, fam: F.mono, w: 700, c: C.white, a: a2 });
  txt('|V_tb| > 0.98', FX + 30, 312, { size: 28, fam: F.mono, w: 700, c: C.white, a: a2 });
  txt('0.035 × 0.98 = 0.0343', FX + 30, 372, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a2 * Q(S, 1, 'a few lines of algebra', 0.5) });
  txt('|B_ct| ≥ |V_cb V_tb| − b_s', FX + 30, 414, { size: 24, fam: F.mono, c: C.white, a: a2 * Q(S, 1, 'a few lines of algebra', 0.5, 0.4) });
  txt('‖[A, B]‖ > 0.0479', FX + 30, 470, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a2 * Q(S, 1, 'give a floor', 0.5) });
  txt('× √3/2  =  0.04148…', FX + 30, 512, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a2 * Q(S, 1, 'give a floor', 0.5, 0.5) });
  const a3 = at(S, 2, 0.6) * A;
  panel(870, 660, 920, 150, a3, C.now, 'FLOOR · 轮换破缺下界');
  txt('max over X ∈ {A, B} of ‖[T, X]‖_HS  >  0.0414', 900, 745, { size: 30, fam: F.math, w: 700, c: C.now, a: a3 });
  txt('T: the cycle on the three left-handed generations', 900, 790, { size: 18, fam: F.mono, c: C.dim, a: a3 });
};

SCENES.a3_walls = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  const a0 = at(S, 0, 0.6) * A;
  txt('reachable (cyan) · certified wall (magenta) · nature (white)', W / 2, 225, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0 });
  /* each row on its own log axis: [label, zh, lo, hi, wall, reachable side, nature, note, line, phrase] */
  const rows = [
    ['m_c / m_t', '粲顶比', 1e-3, 1, 0.0272, +1, 0.00361, 'one light Higgs · #22027, #28325', 1, 'One light Higgs'],
    ['m_t / m_b', '顶底比', 1, 100, 30, -1, 40, 'density potentials · all 1238 zeros of [10855, 12092]', 2, 'Site-density potentials'],
    ['m_u / m_ℓ', '上型/轻子', 1, 100, 3.34, -1, 84.98, 'non-negative weights on seven orbits', 3, 'Seven orbit weights']
  ];
  const X0 = 520, X1 = 1700;
  rows.forEach((r, i) => {
    const [lab, zh, lo, hi, wall, side, nat, note, k, ph] = r;
    const y = 330 + i * 175, ai = Q(S, k, ph, 0.6) * A;
    if (ai <= 0.003) return;
    const lx = v => X0 + (Math.log10(v) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo)) * (X1 - X0);
    txt(lab, 150, y + 10, { size: 34, fam: F.math, w: 700, c: C.white, a: ai });
    txt(zh, 150, y + 48, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ai });
    line(X0, y, X1, y, C.dim, ai * 0.7, 2);
    for (let e = Math.log10(lo); e <= Math.log10(hi) + 1e-9; e++) {
      line(lx(10 ** e), y - 8, lx(10 ** e), y + 8, C.dim, ai, 2);
      txt(neg10(e), lx(10 ** e), y + 34, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: ai });
    }
    const g = clamp((u - phraseAt(S, k, ph) - 0.3) / 1.0);
    const xa = lx(wall), xb = side > 0 ? X1 : X0;
    fillBox(Math.min(xa, xb), y - 16, Math.abs(xb - xa) * g, 32, C.cyan, ai * 0.35);
    line(xa, y - 44, xa, y + 44, C.mag, ai, 5);
    txt(`${side > 0 ? '>' : '<'} ${wall}`, xa + (side > 0 ? -12 : 12), y - 54, { size: 26, fam: F.mono, w: 700, align: side > 0 ? 'right' : 'left', c: C.mag, a: ai });
    const an = clamp((u - phraseAt(S, k, ph) - 1.0) / 0.5) * ai;
    ring(lx(nat), y, 13, C.white, an, 3);
    txt(`${i === 1 ? '> ' : ''}${nat}`, lx(nat), y + 66, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: an });
    txt(note, 150, y + 96, { size: 18, fam: F.mono, c: C.dim, a: ai });
  });
  function neg10(e) { return e === 0 ? '1' : '10' + (e < 0 ? '⁻' : '') + '¹²³⁴'[Math.abs(e) - 1]; }
  stamp('SHARP NO', W / 2 + 160, 800, Q(S, 3, 'Sharp walls', 0.4), C.mag, 40, -0.05);
};

SCENES.a3_fold = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed'], [1, null, 'lean'], [2, null, 'computed'], [3, null, 'argued']]);
  /* the frame e₁, e₂, e₃ and its image under R, by interpolating the rotation's axis-angle (animation only) */
  const a0 = at(S, 0, 0.6) * A, cx = 420, cy = 470, sc = 190;
  const Rm = A3.CR.map(r => r.map(v => v[0] / v[1]));
  const tr = Rm[0][0] + Rm[1][1] + Rm[2][2], ang = Math.acos((tr - 1) / 2);
  const ax = [Rm[2][1] - Rm[1][2], Rm[0][2] - Rm[2][0], Rm[1][0] - Rm[0][1]], an = Math.hypot(...ax), k = ax.map(v => v / an);
  const g = ease(Q(S, 0, 'Cayley rotation', 2.0));
  const rod = (v, t) => { const c = Math.cos(t), s = Math.sin(t), d = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
    const cr = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
    return [0, 1, 2].map(i => v[i] * c + cr[i] * s + k[i] * d * (1 - c)); };
  const P2 = v => { const yaw = -0.6, pitch = 0.35;
    const x1 = v[0] * Math.cos(yaw) + v[1] * Math.sin(yaw), y1 = -v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw);
    return [cx + sc * x1, cy - sc * (v[2] * Math.cos(pitch) - y1 * Math.sin(pitch))]; };
  if (a0 > 0.003) {
    const o = P2([0, 0, 0]), ka = P2(k.map(v => 1.25 * v)), kb = P2(k.map(v => -1.25 * v));
    dashed(kb[0], kb[1], ka[0], ka[1], C.vio, a0 * 0.8, 2);
    txt('axis', ka[0] + 10, ka[1] - 8, { size: 20, fam: F.mono, c: C.vio, a: a0 });
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach((e, i) => {
      const p = P2(e); dashed(o[0], o[1], p[0], p[1], C.dim, a0 * 0.6, 1.5);
      const q = P2(rod(e, g * ang)); arrow(o[0], o[1], q[0], q[1], [C.cyan, C.mag, C.white][i], a0, 3.5);
      txt(`e${'₁₂₃'[i]}`, q[0] + 10, q[1] - 10, { size: 24, fam: F.math, w: 700, c: [C.cyan, C.mag, C.white][i], a: a0 });
    });
  }
  txt('s = (1/2, 1/2, 0)', cx, 790, { size: 28, fam: F.math, w: 700, align: 'center', c: C.now, a: a0 });
  /* the matrix of fractions */
  const a1 = Q(S, 0, 'made of fractions', 0.6) * A, MX = 860, MY = 260;
  panel(MX - 30, MY - 70, 470, 300, a1, C.cyan, 'R = Cayley(s)');
  A3.CR.forEach((r, i) => r.forEach((v, j) => txt(A3.rstr(v), MX + 60 + j * 130, MY + 20 + i * 70, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: a1 })));
  txt('RᵀR = I  ·  det R = 1', MX + 200, MY + 210, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a1 });
  /* Lean */
  const a2 = at(S, 1, 0.6) * A, LX = 1380;
  panel(LX - 20, 190, 440, 300, a2, C.lean, 'KERNEL-CHECKED · 内核检验');
  txt('∀ s ∈ ℚ³ :', LX + 10, 260, { size: 28, fam: F.math, w: 700, c: C.white, a: a2 });
  txt('Cayley(s)ᵀ Cayley(s) ≡ I', LX + 10, 304, { size: 25, fam: F.math, w: 700, c: C.lean, a: a2 * Q(S, 1, 'R transpose R', 0.5) });
  txt('B*B = A*A  ⇒  B = U A', LX + 10, 384, { size: 28, fam: F.math, w: 700, c: C.lean, a: a2 * Q(S, 1, 'equal Gram matrices', 0.5) });
  txt('U unitary', LX + 10, 424, { size: 22, fam: F.mono, c: C.white, a: a2 * Q(S, 1, 'differ by a unitary', 0.5) });
  const ac = a2 * Q(S, 1, 'R transpose R', 0.5), ag = a2 * Q(S, 1, 'equal Gram matrices', 0.5);
  A3.leanChip(830, 560, A3.GID.cayley, ac * (1 - at(S, 2, 0.5)), 19, 'OmegaCayleyRotation.cayley_orthogonal');
  A3.leanChip(830, 600, A3.GID.gram, ag * (1 - at(S, 2, 0.5)), 19, 'GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq');
  /* the response */
  const a3 = at(S, 2, 0.6) * A;
  panel(830, 530, 960, 170, a3, C.cyan, 'FIXED RATIONAL RESPONSE · 有限有理响应');
  txt('(I + T¹⁶)⁻¹ ,  T = ¾ L_n (L_n − cI)', 860, 600, { size: 32, fam: F.math, w: 700, c: C.white, a: a3 });
  txt('light block within 10⁻¹¹ on 7 zeros · leak < 1.70 × 10⁻³⁰', 860, 660, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a3 * Q(S, 2, 'ten to the minus eleven', 0.5) });
  const a4 = at(S, 3, 0.6) * A;
  panel(830, 720, 960, 100, a4, C.argued, 'CALIBRATED · 校准');
  txt('strengths fixed on zero #28325 against measured mixing', 860, 785, { size: 24, fam: F.mono, w: 700, c: C.argued, a: a4 });
};

SCENES.a3_qqql = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, null, 'argued'], [3, 'first allowed violation', 'computed']]);
  const a0 = at(S, 0, 0.6) * A;
  txt('O₆ = ε(colour) · ε(weak)² · ε(spinor)² · Q Q Q L', 150, 225, { size: 28, fam: F.math, w: 700, c: C.white, a: a0 });
  txt('ΔB = ΔL = 1  ·  lets the proton decay', 150, 268, { size: 22, fam: F.mono, w: 700, c: C.mag, a: a0 * Q(S, 0, 'lets it decay', 0.5) });
  /* the 36 monomials */
  const a1 = at(S, 1, 0.6) * A, GX = 170, GY = 330, cs = 70;
  const n = Math.floor(36 * clamp((u - phraseAt(S, 1, 'thirty-six') + 0.4) / 1.6));
  panel(GX - 30, GY - 50, 6 * cs + 60, 6 * cs + 120, a1, C.cyan, 'ONE GENERATION · 单代');
  A3.MONO.forEach(([, v], i) => {
    if (i >= n) return;
    const x = GX + (i % 6) * cs, y = GY + Math.floor(i / 6) * cs;
    box(x, y, cs - 10, cs - 10, Math.abs(v) === 4 ? C.now : C.cyan, a1, 1.5, rgba(Math.abs(v) === 4 ? C.now : C.cyan, 0.15));
    txt(A3.neg(v > 0 ? '+' + v : v), x + (cs - 10) / 2, y + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: a1 });
  });
  txt(`${n} nonzero monomials`, GX - 10, GY + 6 * cs + 46, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a1 });
  /* triality */
  const a2 = at(S, 2, 0.6) * A, TX = 820;
  panel(TX, 300, 960, 120, a2, C.argued, 'BARYON TRIALITY · 重子三重对称');
  txt('X_eff ≡ −h · B  (mod 3) ,  h ≢ 0', TX + 30, 380, { size: 34, fam: F.math, w: 700, c: C.white, a: a2 });
  const a3 = at(S, 3, 0.6) * A;
  const ops = [['QQQL', 1, 'forbidden', 'QQQL is forbidden'], ['Yukawas', 0, 'allowed', 'the Yukawas stay'], ['(LH)² Weinberg', 0, 'allowed', 'the Yukawas stay']];
  txt('operator', TX + 30, 470, { size: 20, fam: F.mono, c: C.dim, a: a3 });
  txt('B', TX + 420, 470, { size: 20, fam: F.mono, c: C.dim, a: a3 });
  txt('X_eff (h = 1)', TX + 520, 470, { size: 20, fam: F.mono, c: C.dim, a: a3 });
  ops.forEach(([o, B, res, ph], i) => {
    const y = 520 + i * 52, ai = a3 * Q(S, 3, ph, 0.5), xe = ((-B % 3) + 3) % 3, col = B ? C.mag : C.cyan;
    txt(o, TX + 30, y, { size: 26, fam: F.mono, w: 700, c: C.white, a: ai });
    txt(String(B), TX + 420, y, { size: 26, fam: F.mono, w: 700, c: C.white, a: ai });
    txt(String(xe), TX + 520, y, { size: 26, fam: F.mono, w: 700, c: col, a: ai });
    txt(res, TX + 700, y, { size: 26, fam: F.mono, w: 700, c: col, a: ai });
  });
  const a4 = Q(S, 3, 'first allowed violation', 0.6) * A;
  panel(TX, 690, 960, 130, a4, C.cyan, 'LOWEST ΔB ≠ 0 OPERATOR · 最低重子破坏算符');
  txt('dimension 6  →  15', TX + 30, 770, { size: 40, fam: F.orb, w: 700, c: C.now, a: a4 });
  txt('(18 if B − L is kept)', TX + 520, 768, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a4 });
};

SCENES.a3_anomaly = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  const a0 = at(S, 0, 0.6) * A;
  txt('U(1)_X ,  X = 3B − 9L_τ', W / 2, 230, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: a0 });
  const ch = [...A3.QF.map(f => [f[0], f[4], C.cyan]), ...A3.TF.map(f => [f[0], f[4], C.mag])];
  ch.forEach(([nm, x, col], i) => {
    const cx = 330 + i * 252;
    chip(cx, 300, 210, 56, `${nm}: ${x > 0 ? '+' : ''}${A3.neg(x)}`, col, a0 * clamp((u - lineAt(S, 0).s - 0.6 - 0.15 * i) / 0.4), 24);
  });
  txt('quarks, all three generations', 580, 360, { size: 18, fam: F.mono, align: 'center', c: C.cyan, a: a0 });
  txt('τ generation (+ νᶜ_τ)', 1340, 360, { size: 18, fam: F.mono, align: 'center', c: C.mag, a: a0 });
  /* the ledger */
  const a1 = at(S, 1, 0.5) * A, X = [260, 820, 1200, 1560], Y0 = 430;
  ['anomaly', 'quarks', 'τ leptons', 'sum'].forEach((h, j) => txt(h, X[j], Y0, { size: 22, fam: F.mono, w: 700, align: j ? 'center' : 'left', c: C.dim, a: a1 }));
  A3.LEDGER.forEach((r, i) => {
    const y = Y0 + 58 + i * 58, ai = a1 * clamp((u - lineAt(S, 1).s - 0.2 - 0.35 * i) / 0.4);
    line(X[0], y + 16, 1680, y + 16, C.dim, ai * 0.3, 1);
    txt(r.n, X[0], y, { size: 28, fam: F.math, w: 700, c: C.white, a: ai });
    txt(A3.rstr(r.q), X[1], y, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ai });
    txt(A3.rstr(r.t), X[2], y, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ai });
    txt(A3.rstr(r.s), X[3], y, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.now, a: ai * clamp((u - lineAt(S, 1).s - 0.5 - 0.35 * i) / 0.3) });
  });
};

SCENES.a3_fork = S => {
  const u = S.u, A = A3.out(S);
  A3.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'open']]);
  const a0 = at(S, 0, 0.6) * A, cx = W / 2, cy = 300;
  txt('joint witness zero · 联合见证零点', cx, 215, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0 });
  chip(cx, cy - 20, 640, 76, '#2,306,888,100,085', C.now, a0, 40, F.mono);
  txt('same 105-loop vacuum · same tree-level spectrum', cx, cy + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a0 * Q(S, 0, 'the same vacuum', 0.5) });
  const sp = Q(S, 0, 'two completions', 0.8);
  [[-1, C.cyan], [1, C.mag]].forEach(([s, col]) => {
    const x2 = cx + s * 460;
    if (sp > 0.003) line(cx, cy + 70, lerp(cx, x2, sp), lerp(cy + 70, cy + 190, sp), col, a0, 3);
  });
  /* the two branches */
  const a1 = at(S, 1, 0.6) * A;
  const L1 = a1 * Q(S, 1, 'Orthogonal currents', 0.5), R1 = a1 * Q(S, 1, 'parallel currents', 0.5);
  panel(cx - 460 - 340, 500, 680, 230, L1, C.cyan, 'ORTHOGONAL CURRENTS · 正交电流');
  arrow(cx - 640, 640, cx - 640, 560, C.cyan, L1, 4); arrow(cx - 640, 640, cx - 560, 640, C.cyan, L1, 4);
  txt('ΔB ≡ 0 (mod 3)', cx - 520, 600, { size: 30, fam: F.math, w: 700, c: C.cyan, a: L1 });
  txt('proton stable', cx - 520, 650, { size: 30, fam: F.mono, w: 700, c: C.white, a: L1 });
  panel(cx + 460 - 340, 500, 680, 230, R1, C.mag, 'PARALLEL CURRENTS · 平行电流');
  arrow(cx + 160, 580, cx + 260, 580, C.mag, R1, 4); arrow(cx + 160, 630, cx + 260, 630, C.mag, R1, 4);
  txt('QQQL switched on', cx + 290, 595, { size: 30, fam: F.mono, w: 700, c: C.white, a: R1 });
  txt('|W| ≥ 0.0314398…', cx + 290, 645, { size: 30, fam: F.mono, w: 700, c: C.mag, a: R1 * Q(S, 1, 'at least 0.03144', 0.5) });
  txt('proton decays', cx + 290, 695, { size: 24, fam: F.mono, w: 700, c: C.mag, a: R1 * Q(S, 1, 'at least 0.03144', 0.5, 0.4) });
  const a2 = at(S, 2, 0.6) * A;
  panel(cx - 560, 755, 1120, 78, a2, C.open, 'OPEN · 开放');
  txt('which current? c₆ at the Planck scale? why exactly three?', cx, 810, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.open, a: a2 });
};

SCENES.a3_ask = S => {
  const u = S.u, A = clamp((S.d - S.u) / 0.6);
  A3.rail(S);
  badgeQ(S, [[0, null, 'argued']]);
  const items = [['SHARP WALLS', '清晰的墙', 'interval certificates', C.cyan, 'sharp walls'],
    ['RECONSTRUCTIONS', '能用的重构', 'calibrated, not derived', C.argued, 'working reconstructions'],
    ['HONEST GAPS', '诚实的缺口', 'three? the proton?', C.open, 'honest gaps']];
  items.forEach(([en, zh, sub, col, ph], i) => {
    const x = 380 + i * 580, ai = Q(S, 0, ph, 0.5) * A * (1 - 0.45 * at(S, 1, 0.6));
    panel(x - 250, 260, 500, 220, ai, col, en);
    txt(zh, x, 370, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.white, a: ai });
    txt(sub, x, 430, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: ai });
  });
  txt('witnesses inside a model · not derivations · 模型内的见证，不是推导', W / 2, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: Q(S, 0, 'honest gaps', 0.5, 0.6) * A });
  SPINE.ask(S, 1, 'And gravity: can deficit angles give a graviton and a tiny cosmological constant?',
    '引力呢：单纯形上的角亏能给出引力子与极小的宇宙学常数吗？', { a: A });
};
/* ==== ACT:a3:END ==== */

/* ==== ACT:a4:BEGIN ==== */
/* Act a4 · Volume IV (chapters 10–11) · Question 4: Regge gravity and dark energy · 第四问：雷吉引力与暗能量

   Summary (en). Volume IV puts the fourth question to geometry itself: rigid four-simplices whose curvature sits in
   deficit angles around triangle hinges (θ = arccos 1/4), a Regge action from which two Pachner moves read Newton's
   constant back out, and on the flat lattice g = I − J/5 a long-wave propagator 20/k² with two helicities ±2. Finite
   hinge counts meet an arithmetic wall (the flat balance needs √3, Born amplitudes need degree 4, the best integer
   state lies on a Pell curve and curves negatively), and induced gravity from the visible spectrum misses ΛG ~ 10⁻¹²²
   by at least 119 orders; the four-layer (−1, 3, −3, 1) vacuum cancels every divergence and, in a chosen model, a real
   zero reaches 0.9994 of the target, until the broken Higgs vacuum adds −1.345 × 10⁻⁶⁷. Lean checks the algebra
   (coboundary nilpotency, the √2 spinor, the three-anchor Gram formula); everything else is a certificate or a model
   choice, and the non-circular derivation of gravity, G_N and dark energy stays open.
   摘要（中）。第四卷把第四问交给几何本身：刚性四维单纯形的曲率集中在三角铰链周围的角亏中（θ = arccos 1/4），由雷吉作用经
   两次帕赫纳移动可反演牛顿常数；在平直格 g = I − J/5 上，长波传播子为 20/k²，带两个螺旋度 ±2。有限铰链计数撞上算术墙：
   平直平衡需要 √3，玻恩振幅需要四次数域，最佳整数态落在佩尔曲线上且曲率为负；可见重谱的诱导引力与 ΛG ~ 10⁻¹²² 至少相差
   119 个数量级。四层 (−1, 3, −3, 1) 真空消去一切发散，在选定模型中一枚真实零点达到目标的 0.9994 倍，直到电弱破缺的希格斯
   树势带来 −1.345 × 10⁻⁶⁷。Lean 检验的是代数（上边缘幂零、√2 旋量、三锚格拉姆公式），其余为证书或模型选择；从第一性原理
   无循环地导出引力、牛顿常数与暗能量仍是开放问题。

   What each scene shows, and where it rests (chapters 10 and 11 of 《OMEGA 统一》, zh authoritative):
     a4_title    the three targets of question 4 (graviton, G_N, ΛG ~ 10⁻¹²², ch10 intro); a 2D sketch of rigid flat pieces
                 meeting along shared edges (schematic, argued).
     a4_hinge    θ = arccos(1/4) and the deficit 2π − qθ for q = 3 … 6 (computed here); the Regge weight
                 W = w·exp(−sV − bK), b = −1/(8πG) (def-ou-ch10-regge-action: a model, argued); the Pachner matrix
                 det Δ = −8πvA ≠ 0 and G = A / 2(d₁ − 2d₂) (computed here from the example ex-ou-ch10-pachner-and-dual-walks);
                 d¹d⁰ = 0, d²d¹ = 0 ..... OmegaSimplicialExactness.d1_d0, .d2_d1 (LEAN, axioms: none).
     a4_spin2    g = I − J/5: g(vᵢ, vᵢ) = 4/5, g(vᵢ, vⱼ) = −1/5, v₅ = −Σvᵢ (computed); the cell counts 15 / 50 / 24 and the
                 long-wave kernel 20/k²(T:S − ½ trT trS), static 10/|p|² (chapter 10.2 certificates, NUM); the residue pair
                 (T¹¹ − T²², 2T¹²) turns by 2θ when the frame turns by θ (computed here); Hessian inertia (+1, −10, 0⁴) at
                 each of the 255 nonzero momenta of the 4⁴ box (certificate, NUM).
     a4_loads    dS/dη ∝ 3(Σ₄N − √3 Σ₆N) on 30 four-valent and 20 six-valent faces (chapter 10.3.1); convergents of √3
                 never balance (computed); QSqrt2: normSq u90 = 1, u90⁸ = 1 ..... OmegaQuadraticAndSchur.sqrt_two_spinor
                 (LEAN, propext); 4β⁴ = 3, p₄ = 4 − 2√3, p₆ = 2√3 − 3, minimal degree 4 and four copies (certificates, NUM,
                 values checked here); the Pell ladder 3x² − 4y² = −1 up to (2911, 2521), N = x + y = 5432 (computed), picked
                 by zero #11366 with mean curvature ≈ −5.8108 × 10⁻¹⁴ (chapter 10.3.2 certificate, quoted).
     a4_induced  the one-loop proper-time definitions K, C (def-ou-ch11-four-layer-vacuum, a model prescription, argued);
                 ΛG > 0.01180 and G⁻¹/M_P² < 6.688 × 10⁻⁶ for the visible spectrum; 311 singlets, Δu ∈ (1.2030, 1.2031) ×
                 10⁻¹²², sign flip at a relative cutoff shift (4.217575, 4.217579) × 10⁻¹²⁰ (#12207) (chapter 11.1–11.2
                 certificates, quoted); the log ladder is exact in log₁₀ (computed); the near-zero line is a sketch.
     a4_layers   weights (−1, 3, −3, 1) on 0, μ², 2μ², 3μ²: moments 0, 0, 0, 6 and Σw e^{−kx} = −(1 − e^{−x})³ (computed);
                 I(0) = (9 ln 3 − 12 ln 2)/2 ≈ 0.78487, re-checked by quadrature (computed); best C/c 0.979478, 0.991359,
                 0.967553 and #28325 0.99941058 for D = 4, μ = v²/M (chapter 11.3.1 certificates inside a chosen model);
                 Higgs tree shift −π m_h² v² / M_P⁴ ≈ −1.3448 × 10⁻⁶⁷ (computed here from the chapter's inputs; the chapter
                 quotes −1.34476 × 10⁻⁶⁷), 55 orders above 10⁻¹²².
     a4_ledger   the score for question 4: four Lean declarations (green), certificates (cyan), model choices (violet),
                 and prob-ou-ch11-noncircular-gravity (OPEN).
     a4_ask      the zeros the questions picked so far (#11661, #11934, #12207, #11366, #11431, #28325; chapter 11 close);
                 the next question.
   On load, FILM.init re-derives every computed number by a second route and checks the four citations; any disagreement
   is pushed to window.FILM_ERRORS. */
const A4 = (() => {
  const GID = {
    d1d0: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_d0',
    d2d1: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_d1',
    sqrt2: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_spinor',
    gram: 'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula'
  };
  /* ---------- chapter 10.1: the equilateral four-simplex ---------- */
  const TH = Math.acos(1 / 4), DEG = 180 / Math.PI;
  const deficit = q => 2 * Math.PI - q * TH;                    // radians
  const fmtDeg = x => `${x >= 0 ? '+' : '−'}${Math.abs(x * DEG).toFixed(2)}°`;
  /* volume and area of the equilateral simplex with a = 1 and the Pachner increment matrix of the worked example */
  const vol4 = Math.sqrt(5) / 96, area = Math.sqrt(3) / 4;
  const DELTA = [[4 * vol4, area * (20 * Math.PI - 40 * TH)], [2 * vol4, area * (8 * Math.PI - 20 * TH)]];
  const detDelta = DELTA[0][0] * DELTA[1][1] - DELTA[0][1] * DELTA[1][0];
  /* ---------- chapter 10.2: the flat background g = I − J/5 on the coordinate basis v₁ … v₄, v₅ = −Σ vᵢ ---------- */
  const g = [0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => (i === j ? 1 : 0) - 1 / 5));
  const V5 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [-1, -1, -1, -1]];
  const gip = (a, b) => { let s = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += a[i] * g[i][j] * b[j]; return s; };
  /* a transverse symmetric tensor T turned by the frame angle φ: T' = R T Rᵀ; the residue pair (T¹¹ − T²², 2T¹²) */
  function turnT(T, phi) {
    const c = Math.cos(phi), s = Math.sin(phi);
    const R = [[c, -s], [s, c]];
    const RT = [[0, 0], [0, 0]];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { let x = 0; for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) x += R[i][k] * T[k][l] * R[j][l]; RT[i][j] = x; }
    return RT;
  }
  const pair = T => [T[0][0] - T[1][1], 2 * T[0][1]];
  const residue = T => 0.5 * Math.pow(T[0][0] - T[1][1], 2) + 2 * T[0][1] * T[0][1];
  const T0 = [[1, 0], [0, -1]];                                  // a plus-polarised source in the transverse plane
  /* ---------- chapter 10.3: √3, convergents, the Pell ladder ---------- */
  const R3 = Math.sqrt(3);
  const CONV = (() => {                                          // √3 = [1; 1, 2, 1, 2, …]
    const cf = [1, 1, 2, 1, 2, 1, 2, 1], out = [];
    let h1 = 1, h0 = 0, k1 = 0, k0 = 1;
    for (const a of cf) { const h = a * h1 + h0, k = a * k1 + k0; out.push([h, k]); h0 = h1; h1 = h; k0 = k1; k1 = k; }
    return out;
  })();
  const PELL = (() => {                                          // 3x² − 4y² = −1 from (1, 1) by the unit 7 + 4√3
    const out = [[1, 1]];
    while (out.length < 4) { const [x, y] = out[out.length - 1]; out.push([7 * x + 8 * y, 6 * x + 7 * y]); }
    return out;
  })();
  const pellD = ([x, y]) => 3 * x * x - 4 * y * y;
  /* ---------- chapter 11: the four-layer stencil, I(0), the Higgs tree shift ---------- */
  const WTS = [-1, 3, -3, 1];
  const moment = n => WTS.reduce((s, w, k) => s + w * Math.pow(k, n), 0);
  const I0 = (9 * Math.log(3) - 12 * Math.log(2)) / 2;
  const integrand = t => (t < 1e-6 ? 1 - 1.5 * t : Math.pow(1 - Math.exp(-t), 3) / (t * t * t));
  const MP = 1.22089e19, VEV = 246.22, MH = 125.25;              // GeV, as in definition def-ou-ch11-four-layer-vacuum and 11.3.2
  const HIGGS = -Math.PI * MH * MH * VEV * VEV / Math.pow(MP, 4); // 8π(−m_h² v²/8)/M_P⁴ with K = 1
  const TARGET = 1e-122;
  const ordersHiggs = Math.log10(-HIGGS / TARGET);
  const ordersVisible = Math.log10(0.01180 / TARGET);
  /* ---------- drawing helpers ---------- */
  function rail(S, a = 1) { SPINE.rail(S, 4, a * clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.4)); }
  function leanChip(x, y, gid, a, size = 20) {
    if (a <= 0.003) return 0;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`a4: film.json does not cite the theorem ${gid}`); return 0; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    const name = r.label || r.name;
    txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    return wh + 12 + tw(name, size, F.mono, 700);
  }
  /* a filled angular wedge around (cx, cy) from angle a0 to a1 (math orientation, y up) */
  function wedge(cx, cy, r, a0, a1, col, a, fillA = 0.22, lw = 2.5) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -a0, -a1, true); ctx.closePath();
    ctx.fillStyle = rgba(col, fillA); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); ctx.restore();
  }
  function arcStroke(cx, cy, r, a0, a1, col, a, lw = 5) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
  }
  const sci = (m, e) => `${m} × 10${String(e).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`;
  return { GID, TH, DEG, deficit, fmtDeg, vol4, area, DELTA, detDelta, g, V5, gip, turnT, pair, residue, T0, R3, CONV,
    PELL, pellD, WTS, moment, I0, integrand, MP, VEV, MH, HIGGS, TARGET, ordersHiggs, ordersVisible,
    rail, leanChip, wedge, arcStroke, sci };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a4: ' + m); };
  const near = (a, b, e = 1e-9) => Math.abs(a - b) <= e * Math.max(1, Math.abs(b));
  Object.values(A4.GID).forEach(gid => { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); });
  /* θ: cos θ = 1/4 independently from the Gram matrix of an equilateral simplex (unit normals meet at −1/4) */
  check(near(Math.cos(A4.TH), 0.25), 'θ = arccos 1/4');
  check(near(A4.deficit(4) * A4.DEG, 57.9100487437, 1e-10) && near(A4.deficit(5) * A4.DEG, -17.6124390704, 1e-10), 'deficits');
  check(Math.round(A4.deficit(4) * A4.DEG) === 58 && Math.round(-A4.deficit(5) * A4.DEG) === 18, 'narrated 58° and 18°');
  /* det Δ = −8π v A, by the closed form */
  check(near(A4.detDelta, -8 * Math.PI * A4.vol4 * A4.area, 1e-12), 'det Δ = −8πvA');
  /* the Pachner inversion: random (s, b) → (d₁, d₂) = −Δ(s, b) → d₁ − 2d₂ = −4πAb and G = A / 2(d₁ − 2d₂) */
  for (let i = 0; i < 20; i++) {
    const s = rnd(i, 1) * 3 - 1, G = 0.1 + rnd(i, 2) * 5, b = -1 / (8 * Math.PI * G);
    const d1 = -(A4.DELTA[0][0] * s + A4.DELTA[0][1] * b), d2 = -(A4.DELTA[1][0] * s + A4.DELTA[1][1] * b);
    check(near(d1 - 2 * d2, -4 * Math.PI * A4.area * b, 1e-10) && near(A4.area / (2 * (d1 - 2 * d2)), G, 1e-10), 'Pachner inversion');
  }
  /* g = I − J/5: five directions of equal length, pairwise equal products, summing to zero */
  A4.V5.forEach((a, i) => A4.V5.forEach((b, j) => check(near(A4.gip(a, b), i === j ? 4 / 5 : -1 / 5, 1e-12), `g(v${i + 1}, v${j + 1})`)));
  check([0, 1, 2, 3].every(k => A4.V5.reduce((s, v) => s + v[k], 0) === 0), 'Σ vᵢ = 0');
  check(10 === (5 * 4) / 2, 'ten time slices = C(5, 2)');
  check(Math.pow(4, 4) - 1 === 255, '255 nonzero momenta');
  /* helicity: the pair turns by 2φ (compare with the rotation of the pair itself); the residue is invariant */
  for (let i = 0; i < 24; i++) {
    const phi = rnd(i, 7) * 6.3, T = [[rnd(i, 8) - 0.5, rnd(i, 9) - 0.5], [0, 0]]; T[1][0] = T[0][1]; T[1][1] = rnd(i, 10) - 0.5;
    const p = A4.pair(T), q = A4.pair(A4.turnT(T, phi)), c = Math.cos(2 * phi), s = Math.sin(2 * phi);
    check(near(q[0], c * p[0] - s * p[1], 1e-12) && near(q[1], s * p[0] + c * p[1], 1e-12), 'pair turns by 2φ');
    check(near(A4.residue(A4.turnT(T, phi)), A4.residue(T), 1e-12) && A4.residue(T) >= 0, 'residue invariant and ≥ 0');
  }
  /* √3: convergents never equal √3 (h² − 3k² ∈ {−2, 1} ≠ 0), and the per-face balance 30k₄ = 20√3 k₆ ⇔ 3k₄² = 4k₆² */
  A4.CONV.forEach(([h, k]) => check([1, -2].includes(h * h - 3 * k * k), `convergent ${h}/${k}`));
  check(near(20 * A4.R3 / 30, 2 / A4.R3, 1e-15), 'k₄/k₆ = 2/√3 at flatness');
  /* the Pell ladder: brute force against the recurrence; (2911, 2521) with N = 5432 */
  const brute = [];
  for (let x = 1; x < 3000; x++) { const y = Math.round(Math.sqrt((3 * x * x + 1) / 4)); if (3 * x * x - 4 * y * y === -1) brute.push([x, y]); }
  check(JSON.stringify(brute) === JSON.stringify(A4.PELL), 'Pell ladder');
  check(A4.PELL[3][0] === 2911 && A4.PELL[3][1] === 2521 && A4.PELL[3][0] + A4.PELL[3][1] === 5432, '(2911, 2521), N = 5432');
  check(3 * 2911 * 2911 - 4 * 2521 * 2521 === -1, '3·2911² − 4·2521² = −1');
  /* Born weights: β with 4β⁴ = 3: p₄ = 1/(1 + β²)·… as the chapter's p₄ = 4 − 2√3, p₆ = 2√3 − 3, ratio 2/√3 */
  const p4 = 4 - 2 * A4.R3, p6 = 2 * A4.R3 - 3;
  check(near(p4 + p6, 1, 1e-15) && near(p4 / p6, 2 / A4.R3, 1e-12), 'p₄ + p₆ = 1, p₄/p₆ = 2/√3');
  const beta = Math.pow(3 / 4, 0.25), x2 = 2 * beta;
  check(near(Math.pow(x2, 4), 12, 1e-12) && near(beta * beta, A4.R3 / 2, 1e-12), '2β is a root of x⁴ − 12');
  /* the stencil: moments and the heat trace */
  check(A4.moment(0) === 0 && A4.moment(1) === 0 && A4.moment(2) === 0 && A4.moment(3) === 6, 'moments 0, 0, 0, 6');
  [0.1, 0.7, 2.3].forEach(x => check(near(A4.WTS.reduce((s, w, k) => s + w * Math.exp(-k * x), 0), -Math.pow(1 - Math.exp(-x), 3), 1e-12), 'heat trace'));
  /* I(0) by Simpson's rule on t = e^s (0 < t < ∞) against the closed form */
  { let s = 0; const a = -24, b = 9, n = 6000, h = (b - a) / n;
    for (let i = 0; i <= n; i++) { const u = a + i * h, t = Math.exp(u), f = A4.integrand(t) * t; s += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
    check(near(s * h / 3, A4.I0, 1e-6) && near(A4.I0, 0.78487221565, 1e-10), `I(0) quadrature ${s * h / 3}`); }
  /* the Higgs tree shift: the chapter quotes −1.34476 × 10⁻⁶⁷; 55 orders above the target; ≥ 119 orders for 0.0118 */
  check(Math.abs(A4.HIGGS / -1.34476e-67 - 1) < 5e-5, `Higgs shift ${A4.HIGGS}`);
  check(Math.floor(A4.ordersHiggs) === 55 && A4.ordersVisible > 119, 'orders of magnitude');
});
Object.assign(FILM.speed, { a4_title: 0.02, a4_hinge: 0.014, a4_spin2: 0.014, a4_loads: 0.014, a4_induced: 0.016, a4_layers: 0.016, a4_ledger: 0.014, a4_ask: 0.022 });

/* ================================ scenes ================================ */
SCENES.a4_title = S => {
  const u = S.u;
  SPINE.title(S, 4, '第四问：雷吉引力与暗能量', 'Question 4: Regge gravity and dark energy');
  A4.rail(S, at(S, 0, 0.6));
  badgeQ(S, [[0, 'Question four', 'argued']]);
  const out = clamp((S.d - u) / 0.4);
  /* the three targets */
  const T = [["spin-2 graviton", '无质量引力子', 'a graviton'], ["Newton's G", '牛顿常数', "Newton's constant"], ['ΛG ~ 10⁻¹²²', '暗能量', 'a tiny dark energy']];
  T.forEach(([en, zh, ph], i) => {
    const x = 520 + i * 440, a = Q(S, 0, ph, 0.6) * out;
    chip(x, 300, 380, 84, en, C.cyan, a, 32, F.disp);
    txt(zh, x, 380, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * 0.9 });
  });
  /* a strip of rigid flat pieces: curvature only where they meet (2D sketch) */
  const a1 = at(S, 1, 0.7) * out, hot = Q(S, 1, 'the triangles they share', 0.6);
  if (a1 > 0.003) {
    const n = 13, s = 120, y0 = 720, x0 = W / 2 - (n + 1) * s / 4;
    const hgt = s * Math.sqrt(3) / 2;
    for (let i = 0; i < n; i++) {
      const up = i % 2 === 0, xl = x0 + i * s / 2;
      const P = up ? [[xl, y0], [xl + s, y0], [xl + s / 2, y0 - hgt]] : [[xl, y0 - hgt], [xl + s, y0 - hgt], [xl + s / 2, y0]];
      const pa = a1 * clamp((u - lineAt(S, 1).s) * 4 - i * 0.25);
      ctx.save(); ctx.globalAlpha = pa * 0.16; ctx.fillStyle = C.cyan; ctx.beginPath();
      P.forEach((p, k) => (k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
      for (let k = 0; k < 3; k++) line(P[k][0], P[k][1], P[(k + 1) % 3][0], P[(k + 1) % 3][1], C.white, pa * 0.55, 1.6);
      /* the shared slanted edge to the next piece */
      if (i < n - 1) {
        const e = up ? [[xl + s, y0], [xl + s / 2, y0 - hgt]] : [[xl + s, y0 - hgt], [xl + s / 2, y0]];
        line(e[0][0], e[0][1], e[1][0], e[1][1], C.now, pa * hot * (0.6 + 0.4 * Math.sin(u * 4 + i)), 4);
      }
    }
    txt('flat inside · 内部平直', W / 2, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: Q(S, 1, 'flat inside', 0.6) * out });
    txt('curvature only where pieces meet · 曲率只在接缝处', W / 2, 562, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: hot * out });
    txt('2D sketch of 4D simplices (schematic) · 示意', W / 2, 780, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: a1 });
  }
};

SCENES.a4_hinge = S => {
  const u = S.u, cx = 540, cy = 520, R = 250;
  A4.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued'], [3, null, 'lean']]);
  /* q wedges of the dihedral angle θ around the hinge (seen edge-on: the hinge is the point) */
  const a0 = clamp(u / 0.5);
  const grow = at(S, 0, 2.2, 0.4), five = Q(S, 1, 'five overlap', 0.8);
  const q = Math.min(4, Math.floor(grow * 4.999)) + (five > 0 ? 1 : 0);
  for (let k = 0; k < Math.min(q, 4); k++) A4.wedge(cx, cy, R, k * A4.TH, (k + 1) * A4.TH, C.cyan, a0 * clamp(grow * 4 - k), 0.18);
  if (five > 0) {
    A4.wedge(cx, cy, R * 0.94, 4 * A4.TH, 4 * A4.TH + A4.TH * ease(five), C.white, a0 * five, 0.1, 2);
    if (five >= 1) A4.wedge(cx, cy, R * 0.94, 2 * Math.PI, 5 * A4.TH, C.mag, a0, 0.45, 2.5);
  }
  dot(cx, cy, 12, 'w', a0);
  txt('hinge', cx + 18, cy + 34, { size: 22, fam: F.mono, w: 700, c: C.white, a: a0 });
  A4.arcStroke(cx, cy, 70, 0, A4.TH, C.white, a0 * clamp(grow * 4), 3);
  txt('θ', cx + 92 * Math.cos(A4.TH / 2), cy - 92 * Math.sin(A4.TH / 2) + 10, { size: 30, fam: F.math, w: 700, c: C.white, a: a0 * clamp(grow * 4) });
  /* the gap of four wedges, amber while it is the focus */
  const gapA = Q(S, 1, 'a gap', 0.5) * (1 - five);
  A4.arcStroke(cx, cy, R + 16, 4 * A4.TH, 2 * Math.PI, C.now, a0 * gapA, 7);
  const gm = 4 * A4.TH + A4.deficit(4) / 2;
  txt('δ ≈ +57.91°', cx + (R + 40) * Math.cos(gm), cy - (R + 40) * Math.sin(gm) + 30, { size: 30, fam: F.math, w: 700, c: C.now, a: a0 * gapA });
  txt('overlap δ ≈ −17.61°', cx, cy + R + 56, { size: 28, fam: F.math, w: 700, align: 'center', c: C.mag, a: a0 * clamp(five * 2 - 1) * (1 - at(S, 2, 0.5) * 0.4) });
  /* the deficit table */
  const tA = at(S, 0, 0.6) * (1 - at(S, 3, 0.6));
  const px = 960, py = 200;
  panel(px, py, 820, 330, tA, C.cyan, 'DEFICIT · 角亏 δ = 2π − qθ');
  txt('θ = arccos(1/4) ≈ 75.52°', px + 30, py + 82, { size: 32, fam: F.math, w: 700, c: C.white, a: tA });
  [3, 4, 5, 6].forEach((qq, i) => {
    const y = py + 140 + i * 46, cur = (qq === 4 && five < 0.5 && grow > 0.7) || (qq === 5 && five >= 0.5);
    const col = cur ? (qq === 4 ? C.now : C.mag) : C.white;
    txt(`q = ${qq}`, px + 40, y, { size: 28, fam: F.mono, w: 700, c: col, a: tA });
    txt(A4.fmtDeg(A4.deficit(qq)), px + 260, y, { size: 28, fam: F.mono, w: 700, c: col, a: tA });
    txt(qq === 4 ? 'gap' : qq === 5 ? 'overlap' : '', px + 470, y, { size: 22, fam: F.mono, c: C.dim, a: tA });
  });
  /* the Regge weight and the Pachner inversion */
  const a2 = at(S, 2, 0.6);
  panel(px, 570, 820, 250, a2, C.argued, 'MODEL · REGGE WEIGHT · 雷吉权重');
  txt('K = A Σₕ (2π − qₕθ)     W = w · exp(−sV − bK)', px + 30, 640, { size: 28, fam: F.math, w: 700, c: C.white, a: a2 });
  txt('b = −1/(8πG)   s = Λ/(8πG)', px + 30, 688, { size: 26, fam: F.math, w: 700, c: C.argued, a: a2 });
  const pa = Q(S, 2, 'two Pachner moves', 0.6);
  txt('1→5, 2→4:  det Δ = −8πvA ≠ 0', px + 30, 744, { size: 26, fam: F.math, w: 700, c: C.cyan, a: pa });
  txt('d₁ − 2d₂ = −4πAb   ⇒   G = A / 2(d₁ − 2d₂)', px + 30, 790, { size: 26, fam: F.math, w: 700, c: C.cyan, a: Q(S, 2, "Newton's constant", 0.6) });
  /* the coboundary, checked by Lean */
  const a3 = at(S, 3, 0.6);
  panel(px, py, 820, 330, a3, C.lean, 'COBOUNDARY · 上边缘 · AXIOMS: NONE');
  txt('(d¹d⁰f)(x,y,z) = (f(z)−f(y)) + (f(y)−f(x)) − (f(z)−f(x))', px + 26, py + 80, { size: 22, fam: F.math, w: 700, c: C.white, a: a3 });
  txt('= 0', px + 26, py + 122, { size: 30, fam: F.math, w: 700, c: C.lean, a: a3 });
  txt('d²(d¹e)(x,y,z,w) = 0   for any abelian group A', px + 26, py + 176, { size: 24, fam: F.math, w: 700, c: C.white, a: Q(S, 3, 'applied twice', 0.5) });
  const lq = Q(S, 3, 'Lean checks', 0.5);
  A4.leanChip(px + 26, py + 248, A4.GID.d1d0, lq, 19);
  A4.leanChip(px + 26, py + 296, A4.GID.d2d1, lq, 19);
};

SCENES.a4_spin2 = S => {
  const u = S.u;
  A4.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  /* the five directions of the flat cell (a 2D projection of a 4D star; schematic) */
  const a0 = clamp(u / 0.5) * (1 - at(S, 3, 0.6)), cx = 470, cy = 470, r = 210;
  for (let i = 0; i < 5; i++) {
    const an = Math.PI / 2 + i * 2 * Math.PI / 5, ex = cx + r * Math.cos(an), ey = cy - r * Math.sin(an);
    arrow(cx, cy, ex, ey, i === 4 ? C.mag : C.cyan, a0, 3);
    txt(`v${'₁₂₃₄₅'[i]}`, cx + (r + 34) * Math.cos(an) - 14, cy - (r + 34) * Math.sin(an) + 10, { size: 28, fam: F.math, w: 700, c: i === 4 ? C.mag : C.cyan, a: a0 });
  }
  dot(cx, cy, 9, 'w', a0);
  txt('g = I − J/5', 150, 230, { size: 38, fam: F.math, w: 700, c: C.white, a: a0 });
  txt('v₅ = −(v₁ + v₂ + v₃ + v₄)', 150, 740, { size: 26, fam: F.math, w: 700, c: C.mag, a: a0 });
  txt('g(vᵢ, vᵢ) = 4/5    g(vᵢ, vⱼ) = −1/5', 150, 784, { size: 26, fam: F.math, w: 700, c: C.cyan, a: a0 * Q(S, 0, 'I minus J over five', 0.6) });
  txt('per cell: 15 edges · 50 triangles · 24 simplices · all δ = 0', 150, 826, { size: 20, fam: F.mono, c: C.dim, a: a0 * Q(S, 0, 'every deficit is zero', 0.6) });
  txt('schematic projection of a 4D star', 150, 272, { size: 18, fam: F.mono, c: C.dim, a: a0 });
  /* the long-wave kernel */
  const px = 960;
  const a1 = at(S, 1, 0.6);
  panel(px, 200, 830, 220, a1, C.cyan, 'LONG-WAVE PROPAGATOR · CERTIFICATE · 证书');
  txt('20/k² · (T:S − ½ tr T · tr S) + O(1)', px + 30, 290, { size: 34, fam: F.math, w: 700, c: C.white, a: a1 });
  txt('k² = kᵀg⁻¹k   ·   Fierz–Pauli form   ·   static: 10/|p|²', px + 30, 348, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: a1 });
  txt('five non-metric edge modes gapped at k = 0', px + 30, 390, { size: 20, fam: F.mono, c: C.dim, a: a1 });
  /* helicity two: the frame turns by φ, the residue pair by 2φ (computed on screen from T' = R T Rᵀ) */
  const a2 = at(S, 2, 0.6);
  if (a2 > 0.003) {
    const phi = 0.5 * Math.PI * ease(clamp((u - phraseAt(S, 2, 'Turn the frame')) / 3.6)) + 0.12 * Math.max(0, u - lineAt(S, 2).e);
    const Tp = A4.turnT(A4.T0, phi), pr = A4.pair(Tp), ang = Math.atan2(pr[1], pr[0]);
    txt('residue on the light cone:  ½|T¹¹ − T²²|² + 2|T¹²|² ≥ 0 · rank 2', px, 470, { size: 22, fam: F.mono, w: 700, c: C.white, a: a2 });
    const d1 = [px + 190, 660], d2 = [px + 620, 660], rr = 120;
    ring(d1[0], d1[1], rr, C.dim, a2, 1.5); ring(d2[0], d2[1], rr, C.dim, a2, 1.5);
    /* frame axes */
    [[0, C.white], [Math.PI / 2, C.white]].forEach(([o]) => {
      const e = [Math.cos(phi + o), Math.sin(phi + o)];
      arrow(d1[0], d1[1], d1[0] + rr * e[0], d1[1] - rr * e[1], C.white, a2, 2.5);
    });
    A4.arcStroke(d1[0], d1[1], 40, 0, phi, C.now, a2, 4);
    arrow(d2[0], d2[1], d2[0] + rr * Math.cos(ang), d2[1] - rr * Math.sin(ang), C.now, a2, 4);
    A4.arcStroke(d2[0], d2[1], 40, 0, ((ang % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), C.now, a2, 4);
    const pd = Math.round(phi * A4.DEG), ad = Math.round((((ang * A4.DEG) % 360) + 360) % 360);
    txt(`frame φ = ${pd}°`, d1[0], d1[1] + rr + 44, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: a2 });
    txt(`(T¹¹ − T²², 2T¹²) at ${ad}°`, d2[0], d2[1] + rr + 44, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: a2 });
    txt('helicity ±2', (d1[0] + d2[0]) / 2, d1[1] + 10, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.cyan, a: Q(S, 2, 'helicity plus and minus two', 0.6) });
  }
  /* the Euclidean price: one opposite-sign direction at every nonzero momentum of the 4⁴ box */
  const a3 = at(S, 3, 0.6);
  if (a3 > 0.003) {
    txt('4⁴ box · 255 nonzero momenta', 150, 240, { size: 30, fam: F.mono, w: 700, c: C.white, a: a3 });
    const cols = 17, sz = 26, gx = 150, gy = 290;
    const fill = clamp((u - lineAt(S, 3).s) / 2.8);
    for (let i = 0; i < 255; i++) {
      const xx = gx + (i % cols) * (sz + 12), yy = gy + Math.floor(i / cols) * (sz + 4);
      const on = fill * 255 > i;
      fillBox(xx, yy, sz, sz - 6, on ? C.mag : C.dim, a3 * (on ? 0.5 : 0.2));
    }
    txt('Hessian inertia at each:  +1 · −10 · 0×4', 150, 790, { size: 26, fam: F.mono, w: 700, c: C.mag, a: a3 * Q(S, 3, 'one conformal direction', 0.5) });
    txt('the +1 is the conformal mode (k = 0: −5, 0×10) · certificate', 150, 828, { size: 20, fam: F.mono, c: C.dim, a: a3 * Q(S, 3, 'opposite sign', 0.5) });
  }
};

SCENES.a4_loads = S => {
  const u = S.u;
  A4.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'a right-angle spinor', 'lean'], [3, null, 'computed']]);
  const left = 1 - at(S, 3, 0.6);
  /* the balance of the flat cell */
  const a0 = clamp(u / 0.5) * left;
  txt('hinge loads Nₕ ∈ ℕ instead of areas Aₕ', 150, 225, { size: 28, fam: F.mono, w: 700, c: C.white, a: a0 });
  const bx = 560, by = 380, tilt = 0.06 * Math.sin(u * 1.3);
  const L = [bx - 260 * Math.cos(tilt), by + 260 * Math.sin(tilt)], Rr = [bx + 260 * Math.cos(tilt), by - 260 * Math.sin(tilt)];
  const ab = at(S, 1, 0.6) * left;
  line(L[0], L[1], Rr[0], Rr[1], C.white, ab, 4);
  line(bx, by, bx - 30, by + 60, C.white, ab, 3); line(bx, by, bx + 30, by + 60, C.white, ab, 3);
  chip(L[0], L[1] + 60, 280, 76, '30 × 4-valent', C.cyan, ab, 24);
  chip(Rr[0], Rr[1] + 60, 280, 76, '20 × 6-valent', C.cyan, ab, 24);
  txt('dδ/dη = +3', L[0], L[1] + 130, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ab });
  txt('dδ/dη = −3√3', Rr[0], Rr[1] + 130, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ab });
  txt('flat:  Σ₄ N = √3 · Σ₆ N', bx, 600, { size: 36, fam: F.math, w: 700, align: 'center', c: C.now, a: Q(S, 1, 'root three times another', 0.6) * left });
  /* convergents of √3: never equal */
  const ac = Q(S, 1, 'no rational loads', 0.6) * left;
  A4.CONV.slice(1, 7).forEach(([h, k], i) => {
    const x = 180 + i * 125, y = 690;
    txt(`${h}/${k}`, x, y, { size: 26, fam: F.math, w: 700, c: C.white, a: ac * clamp((u - phraseAt(S, 1, 'no rational loads')) * 3 - i * 0.4) });
  });
  txt('h² − 3k² = 1 or −2, never 0: no rational ratio equals √3', 180, 740, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ac });
  stamp('NO RATIONAL BALANCE', 520, 805, Q(S, 1, 'can do that', 0.5) * left, C.mag, 34, -0.04);
  /* degree two versus degree four */
  const a2 = at(S, 2, 0.6), px = 1000;
  panel(px, 200, 790, 290, a2, C.lean, 'QSqrt2 · δ² = 2 · DEGREE 2');
  txt('u₉₀ = (δ/2) + (δ/2) i', px + 30, 280, { size: 30, fam: F.math, w: 700, c: C.white, a: a2 });
  txt('normSq u₉₀ ≡ 1      u₉₀⁸ ≡ 1', px + 30, 334, { size: 30, fam: F.math, w: 700, c: C.white, a: a2 });
  A4.leanChip(px + 30, 400, A4.GID.sqrt2, Q(S, 2, 'a right-angle spinor', 0.5), 16);
  txt('axioms: propext', px + 30, 450, { size: 20, fam: F.mono, c: C.lean, a: Q(S, 2, 'a right-angle spinor', 0.5) });
  const a2b = Q(S, 2, 'degree four', 0.6);
  panel(px, 520, 790, 300, a2b, C.cyan, 'FLAT HINGE · CERTIFICATE · DEGREE 4');
  txt('amplitudes (1, β),  4β⁴ = 3,  2β root of x⁴ − 12', px + 30, 594, { size: 26, fam: F.math, w: 700, c: C.white, a: a2b });
  txt('p₄ = 4 − 2√3     p₆ = 2√3 − 3', px + 30, 648, { size: 30, fam: F.math, w: 700, c: C.now, a: a2b });
  txt('totally real fields fail · least degree exactly 4', px + 30, 704, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: a2b });
  txt('rational projections: least number of copies 4', px + 30, 744, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: a2b });
  /* the Pell ladder */
  const a3 = at(S, 3, 0.6);
  if (a3 > 0.003) {
    txt('integer loads (k₄, k₆):  3k₄² − 4k₆² = −1', 150, 240, { size: 28, fam: F.math, w: 700, c: C.white, a: a3 });
    A4.PELL.forEach((p, i) => {
      const y = 320 + i * 72, last = i === 3, aa = a3 * clamp((u - lineAt(S, 3).s) * 2 - i * 0.5);
      txt(`(${p[0]}, ${p[1]})`, 170, y, { size: 32, fam: F.math, w: 700, c: last ? C.now : C.cyan, a: aa });
      txt(`D = ${String(A4.pellD(p)).replace('-', '−')}`, 480, y, { size: 26, fam: F.mono, w: 700, c: last ? C.now : C.white, a: aa });
      txt(`N = ${p[0] + p[1]}`, 680, y, { size: 26, fam: F.mono, w: 700, c: last ? C.now : C.white, a: aa });
    });
    txt('flat would need D = 0', 170, 630, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a3 * Q(S, 3, 'misses flatness by exactly one', 0.5) });
    txt('N = 5432 slots: picked by zero #11366 (certificate)', 170, 690, { size: 24, fam: F.mono, w: 700, c: C.now, a: a3 * Q(S, 3, 'misses flatness', 0.5) });
    txt('mean scalar curvature ≈ −5.8108 × 10⁻¹⁴ < 0', 170, 750, { size: 28, fam: F.math, w: 700, c: C.mag, a: a3 * Q(S, 3, 'so the geometry curves', 0.5) });
    txt('a negative curvature cannot be a positive dark energy', 170, 795, { size: 20, fam: F.mono, c: C.dim, a: a3 * Q(S, 3, 'negatively', 0.5) });
  }
};

SCENES.a4_induced = S => {
  const u = S.u;
  A4.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* the log ladder: y linear in log₁₀ from 10⁰ (top) to 10⁻¹²² (bottom) */
  const lx = 470, y0 = 230, y1 = 790, Y = v => y0 + (-Math.log10(v)) / 122 * (y1 - y0);
  const a0 = clamp(u / 0.6);
  line(lx, y0, lx, y1, C.white, a0 * 0.7, 3);
  for (let e = 0; e <= 120; e += 20) { const y = Y(Math.pow(10, -e)); line(lx - 8, y, lx + 8, y, C.dim, a0, 2); }
  txt('log₁₀ ΛG', lx, 205, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0 });
  txt('1 · Planck', lx - 24, Y(1) + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: a0 });
  const tg = Y(A4.TARGET);
  dot(lx, tg, 12, 'g', a0); txt('10⁻¹²² · observed', lx - 24, tg + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.now, a: a0 });
  const a1 = Q(S, 1, 'Visible matter alone', 0.6), yv = Y(0.0118);
  dot(lx, yv, 11, 'm', a1);
  txt('> 0.01180 · visible spectrum', lx + 26, yv + 30, { size: 22, fam: F.mono, w: 700, c: C.mag, a: a1 });
  const a1b = Q(S, 1, 'a hundred nineteen orders', 0.6);
  arrow(lx + 70, yv + 60, lx + 70, tg - 14, C.mag, a1b, 3);
  txt('≥ 119 orders', lx + 92, (yv + tg) / 2, { size: 30, fam: F.disp, w: 700, c: C.mag, a: a1b });
  /* the prescription and the readings */
  const px = 960;
  const a0p = at(S, 0, 0.6);
  panel(px, 200, 830, 230, a0p, C.argued, 'MODEL · ONE-LOOP INDUCED GRAVITY · 诱导引力');
  txt('K = G⁻¹/M_P² = (x/2π) Σₖ αₖ E₂(zₖ/x)', px + 30, 280, { size: 28, fam: F.math, w: 700, c: C.white, a: a0p });
  txt('C = ΛG = (8πρ/M_P⁴) / K²', px + 30, 330, { size: 28, fam: F.math, w: 700, c: C.white, a: a0p });
  txt('no bare G, no bare Λ · cutoff x = Q²/M_P²', px + 30, 390, { size: 21, fam: F.mono, c: C.argued, a: a0p });
  const low = 1 - at(S, 3, 0.5);
  panel(px, 460, 830, 150, a1 * low, C.mag, 'VISIBLE SPECTRUM · CERTIFICATE');
  txt('ΛG > 0.01180    G⁻¹/M_P² < 6.688 × 10⁻⁶', px + 30, 540, { size: 28, fam: F.math, w: 700, c: C.white, a: a1 * low });
  txt('for every cutoff with G > 0 (R = 32, d = 724)', px + 30, 584, { size: 20, fam: F.mono, c: C.dim, a: a1 * low });
  const a2 = at(S, 2, 0.6) * low;
  panel(px, 640, 830, 190, a2, C.cyan, '311 REAL SINGLETS · CERTIFICATE');
  txt('K = 1 and ΛG = 10⁻¹²² at once', px + 30, 712, { size: 28, fam: F.math, w: 700, c: C.white, a: a2 });
  txt('Δu ∈ (1.2030, 1.2031) × 10⁻¹²²', px + 30, 760, { size: 28, fam: F.math, w: 700, c: C.now, a: Q(S, 2, 'tuning', 0.6) * low });
  /* the cutoff cliff: ΛG/c falls through zero (a sketch; crossing from the certificate) */
  const a3 = at(S, 3, 0.6);
  if (a3 > 0.003) {
    panel(px, 460, 830, 370, a3, C.mag, 'CUTOFF CLIFF · 311-SINGLET EXAMPLE (#12207)');
    const gx0 = px + 80, gx1 = px + 780, gy = 650, hh = 100;
    line(gx0, gy, gx1, gy, C.white, a3 * 0.6, 2);
    line(gx0, gy - hh - 20, gx0, gy + hh + 20, C.white, a3 * 0.6, 2);
    txt('ΛG/c', gx0 - 12, gy - hh - 30, { size: 20, fam: F.mono, w: 700, c: C.white, a: a3 });
    txt('1', gx0 - 22, gy - hh + 8, { size: 20, fam: F.mono, c: C.white, a: a3 });
    txt('0', gx0 - 22, gy + 8, { size: 20, fam: F.mono, c: C.white, a: a3 });
    const xc = gx0 + 420, k = clamp((u - phraseAt(S, 3, 'a cutoff shift')) / 2.6);
    const xe = lerp(gx0, gx1, k);
    const yAt = x => gy - hh + hh * (x - gx0) / (xc - gx0);
    line(gx0, yAt(gx0), xe, yAt(xe), xe > xc ? C.mag : C.now, a3, 4);
    if (k > 0.6) { dot(xc, gy, 10, 'm', a3); txt('ΛG < 0', gx1 - 90, yAt(gx1) + 34, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a3 }); }
    txt('(Q − Q₀)/Q₀ ∈ (4.217575, 4.217579) × 10⁻¹²⁰', xc - 300, gy + 150, { size: 24, fam: F.math, w: 700, c: C.mag, a: a3 * Q(S, 3, 'flips its sign', 0.5) });
    txt('straight-line sketch near the crossing', gx0 + 90, gy - hh - 30, { size: 18, fam: F.mono, c: C.dim, a: a3 });
  }
};

SCENES.a4_layers = S => {
  const u = S.u;
  A4.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued'], [3, null, 'computed']]);
  const left = 1 - at(S, 3, 0.6);
  /* the stencil on 0, μ², 2μ², 3μ² */
  const a0 = clamp(u / 0.5) * left, base = 430, unit = 62;
  line(170, base, 880, base, C.white, a0 * 0.7, 2);
  txt('m²', 890, base + 8, { size: 24, fam: F.math, w: 700, c: C.white, a: a0 });
  A4.WTS.forEach((w, k) => {
    const x = 230 + k * 190, aa = a0 * Q(S, 0, ['minus one', 'three', 'minus three', 'one, on four'][k], 0.5);
    const h = w * unit, col = w > 0 ? C.cyan : C.mag;
    fillBox(x - 34, w > 0 ? base - h : base, 68, Math.abs(h), col, aa * 0.55);
    box(x - 34, w > 0 ? base - h : base, 68, Math.abs(h), col, aa, 2);
    txt((w > 0 ? '+' : '−') + Math.abs(w), x, w > 0 ? base - h - 16 : base - h + 36, { size: 32, fam: F.math, w: 700, align: 'center', c: col, a: aa });
    txt(['0', 'μ²', '2μ²', '3μ²'][k], x, base + (w > 0 ? 40 : -12) + (w > 0 ? 0 : 0), { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: aa * (w > 0 ? 1 : 0) });
    if (w < 0) txt(['0', 'μ²', '2μ²', '3μ²'][k], x, base - 14, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: aa });
  });
  /* the moments */
  const a1 = at(S, 1, 0.6) * left;
  [0, 1, 2, 3].forEach(n => {
    const x = 200 + n * 175, m = A4.moment(n), aa = a1 * clamp((u - lineAt(S, 1).s) * 2 - n * 0.4);
    txt(`Σ w k${['⁰', '¹', '²', '³'][n]}`, x, 690, { size: 26, fam: F.math, w: 700, c: C.white, a: aa });
    txt(`= ${m}`, x + 20, 740, { size: 34, fam: F.math, w: 700, c: m ? C.now : C.cyan, a: aa });
  });
  txt('Σₖ wₖ e^(−k a t) = −(1 − e^(−a t))³', 200, 800, { size: 26, fam: F.math, w: 700, c: C.cyan, a: a1 * Q(S, 1, 'every divergence cancels', 0.5) });
  /* the finite positive integral */
  const px = 980, a1p = Q(S, 1, 'a finite positive term', 0.6);
  panel(px, 200, 810, 330, a1p, C.cyan, 'I(0) = ∫₀^∞ (1 − e^(−t))³ / t³ dt');
  const gx0 = px + 60, gx1 = px + 760, gb = 470, gh = 190, tmax = 10;
  ctx.save(); ctx.globalAlpha = a1p * 0.35; ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.moveTo(gx0, gb);
  for (let i = 0; i <= 200; i++) { const t = i / 200 * tmax; ctx.lineTo(gx0 + (gx1 - gx0) * i / 200, gb - gh * A4.integrand(t)); }
  ctx.lineTo(gx1, gb); ctx.closePath(); ctx.fill(); ctx.restore();
  curve(p => [gx0 + (gx1 - gx0) * p, gb - gh * A4.integrand(p * tmax)], 200, C.cyan, a1p, 3);
  line(gx0, gb, gx1, gb, C.white, a1p * 0.6, 2);
  txt('t', gx1 + 10, gb + 6, { size: 22, fam: F.math, c: C.white, a: a1p });
  txt('1', gx0 - 22, gb - gh + 8, { size: 20, fam: F.mono, c: C.white, a: a1p });
  txt(`= (9 ln 3 − 12 ln 2)/2 ≈ ${A4.I0.toFixed(5)} > 0`, gx0 + 150, gb - gh + 50, { size: 28, fam: F.math, w: 700, c: C.now, a: a1p });
  /* the model readings */
  const a2 = at(S, 2, 0.6);
  panel(px, 560, 810, 270, a2, C.argued, 'MODEL · D = 4, μ = v²/M · BEST C/c');
  [['#11661', 0.979478], ['#11934', 0.991359], ['#12207', 0.967553], ['#28325', 0.99941058]].forEach(([z, v], i) => {
    const y = 620 + i * 50, last = i === 3, aa = a2 * (last ? Q(S, 2, 'one real zero', 0.5) : 1);
    txt(z, px + 30, y + 8, { size: 24, fam: F.mono, w: 700, c: last ? C.now : C.white, a: aa });
    const bw = 440 * v; fillBox(px + 170, y - 12, bw, 22, last ? C.now : C.cyan, aa * 0.6);
    line(px + 610, y - 18, px + 610, y + 16, C.white, aa, 2);
    txt(String(v), px + 630, y + 8, { size: 24, fam: F.mono, w: 700, c: last ? C.now : C.white, a: aa });
  });
  /* the broken Higgs vacuum */
  const a3 = at(S, 3, 0.6);
  if (a3 > 0.003) {
    panel(140, 200, 780, 630, a3, C.mag, 'BROKEN HIGGS VACUUM · 电弱破缺');
    txt('ρ_H(v) − ρ_H(0) = −m_h² v² / 8', 170, 290, { size: 30, fam: F.math, w: 700, c: C.white, a: a3 });
    txt('ΔΛG = −π m_h² v² / M_P⁴', 170, 350, { size: 30, fam: F.math, w: 700, c: C.white, a: a3 });
    txt('m_h = 125.25, v = 246.22, M_P = 1.22089 × 10¹⁹ GeV', 170, 396, { size: 20, fam: F.mono, c: C.dim, a: a3 });
    txt(`≈ −${(-A4.HIGGS * 1e67).toFixed(4)} × 10⁻⁶⁷`, 170, 470, { size: 44, fam: F.math, w: 700, c: C.mag, a: Q(S, 3, 'a tree term', 0.5), ab: 1.5 });
    /* two magnitudes on one log scale */
    const ly = 600, lx0 = 190, lx1 = 870, X = e => lx0 + (lx1 - lx0) * (e - 0) / 130;
    const aq = Q(S, 3, 'fifty-five orders larger', 0.6);
    line(lx0, ly, lx1, ly, C.white, a3 * 0.6, 2);
    [0, 40, 80, 120].forEach(e => { line(X(e), ly - 8, X(e), ly + 8, C.dim, a3, 2); txt(e ? `10⁻${String(e).replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}` : '1', X(e), ly + 36, { size: 20, fam: F.math, align: 'center', c: C.dim, a: a3 }); });
    dot(X(67), ly, 12, 'm', aq); dot(X(122), ly, 12, 'g', aq);
    txt('Higgs tree', X(67), ly - 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: aq });
    txt('four-layer ~ 10⁻¹²²', X(122) - 40, ly - 26, { size: 20, fam: F.math, w: 700, align: 'center', c: C.now, a: aq });
    txt(`${Math.floor(A4.ordersHiggs)} orders larger · opposite sign`, 170, 720, { size: 32, fam: F.disp, w: 700, c: C.mag, a: aq });
    txt('nothing in the model cancels it for free', 170, 774, { size: 22, fam: F.mono, c: C.dim, a: aq });
  }
};

SCENES.a4_ledger = S => {
  const u = S.u;
  A4.rail(S);
  badgeQ(S, [[0, null, 'lean'], [0, 'sharp certificates', 'computed'], [1, null, 'open']]);
  const a0 = at(S, 0, 0.6);
  panel(130, 195, 900, 330, a0, C.lean, 'LEAN ✓ · KERNEL-CHECKED ALGEBRA · 内核检验');
  const rows = [[A4.GID.d1d0, 'd¹(d⁰f) = 0 · axioms: none'], [A4.GID.d2d1, 'd²(d¹e) = 0 · axioms: none'],
    [A4.GID.sqrt2, 'normSq u₉₀ = 1, u₉₀⁸ = 1 · propext'], [A4.GID.gram, 'three-anchor Gram determinant formula']];
  rows.forEach(([gid, d], i) => {
    const y = 262 + i * 66, aa = a0 * clamp((u - lineAt(S, 0).s) * 2 - i * 0.3);
    A4.leanChip(155, y, gid, aa, 17);
    txt(d, 155, y + 26, { size: 18, fam: F.mono, c: C.white, a: aa * 0.85 });
  });
  const a1 = Q(S, 0, 'sharp certificates', 0.6);
  panel(1060, 195, 730, 330, a1, C.cyan, 'CERTIFICATES · 证书 (NUM)');
  ['20/k², helicities ±2', '√3 wall · degree 4 · four copies', 'Pell state (2911, 2521): curvature < 0', 'ΛG > 0.0118 · 311 singlets · cliff 4.22 × 10⁻¹²⁰',
    '(−1, 3, −3, 1): finite, positive', 'Higgs tree −1.345 × 10⁻⁶⁷'].forEach((s, i) =>
    txt(s, 1085, 268 + i * 42, { size: 22, fam: F.math, w: 700, c: C.white, a: a1 * clamp((u - phraseAt(S, 0, 'sharp certificates')) * 2 - i * 0.25) }));
  const a1m = Q(S, 0, 'inside chosen models', 0.6);
  panel(130, 555, 900, 270, a1m, C.argued, 'MODEL CHOICES · 模型选择');
  ['Regge action and source normalization put in', 'proper-time cutoff Q, hand-graded singlets', 'mass rule μ = v²/M, D = 4 polarizations', 'equal-depth Higgs potential would be extra'].forEach((s, i) =>
    txt(s, 155, 620 + i * 50, { size: 22, fam: F.mono, w: 700, c: C.white, a: a1m }));
  const a2 = at(S, 1, 0.6);
  panel(1060, 555, 730, 270, a2, C.open, 'OPEN · 开放问题');
  txt('from one master connection, with no', 1085, 625, { size: 22, fam: F.mono, w: 700, c: C.white, a: a2 });
  txt('hand-put inputs, derive:', 1085, 657, { size: 22, fam: F.mono, w: 700, c: C.white, a: a2 });
  txt('· covariant Lorentzian spin 2', 1085, 700, { size: 22, fam: F.mono, w: 700, c: C.open, a: a2 });
  txt('· Newton constant G_N', 1085, 740, { size: 22, fam: F.mono, w: 700, c: C.open, a: a2 });
  txt('· sign and size of ΛG ~ 10⁻¹²²', 1085, 780, { size: 22, fam: F.math, w: 700, c: C.open, a: a2 });
};

SCENES.a4_ask = S => {
  const u = S.u;
  A4.rail(S);
  const a0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6) * 0.5);
  txt('zeros favoured so far · 各问偏爱的零点', W / 2, 260, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a0 });
  ['#11661', '#11934', '#12207', '#11366', '#11431', '#28325'].forEach((z, i) => {
    const x = 410 + i * 220, aa = a0 * clamp((u - lineAt(S, 0).s) * 2.5 - i * 0.3);
    chip(x, 380, 190, 76, z, i === 3 || i === 4 ? C.cyan : C.white, aa, 30);
  });
  txt('one clock? · 同一只钟？', W / 2, 530, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.now, a: at(S, 1, 0.6) });
  SPINE.ask(S, 1, 'Can all four questions be answered by one clock at once?', '四个问题能被同一只钟同时回答吗？');
};
/* ==== ACT:a4:END ==== */

/* ==== ACT:a5:BEGIN ==== */
/* Act a5 · Volume V (chapters 12–15) · One clock for four questions · 四问共用一只钟
   Summary (en): Volume V forces the four sectors onto one shared arithmetic clock. Six readings close only after a
   neutral-shell reweighting, and then the unseen seventh reading is forced into a 35-bit code 4130 codes from the
   reference, with over 99.93 percent of the weight squeezed into three height bands and a 6.08 percent held-out CP
   deficit. An action on the shell's 529 triangles needs 105 windings for one vacuum that keeps all windows and the
   reference flavour, monotone weights fail by more than a quarter, and the joint witness zero #2,306,888,100,085 opens
   four cracks; inside the shell 624 channels meet a memory-rank ladder, and the balance sheet reads 4/4 model-internal
   witnesses, 0/4 zero-fit derivations.
   Summary (zh): 第五卷把四个部门强行压到同一只共同算术钟上：经中性球壳重加权后前六项读数才闭合，而从未看过的第七项
   被强迫锁定在与参考相差 4130 格的 35 位码上，超过 99.93% 的权重挤进三条高度带，留出的 CP 不变量亏损 6.08%。
   球壳 529 个三角面上的作用量要到 105 圈才有同时守住三窗与参考味的统一真空，单调权重一律落败四分之一以上，旗舰联合
   零点 #2,306,888,100,085 又被四重压力测试撬开裂隙；壳内 624 条通道撞上局部记忆秩阶梯，总账读作 4/4 模型内见证、
   0/4 无拟合推导。

   Scenes for theme/film/engine.js. Everything this act defines lives in the namespace A5; scenes are SCENES.a5_*.
   What each scene shows, and where it rests (chapter numbers of books/omega-unification):
     a5_title    four sector dials ([1] α_s ≈ 0.1184, [2] three light modes, [3] CKM, [4] 2‰ curvature window: the
                 model-internal witnesses of Volumes II–IV, ch12 opening, argued) collapse into one clock
                 F(j) = ⟨s, (I + j²K)⁻¹ s⟩ (definition def-ou-ch12-shared-clock); zero #8359 is the first to pass
                 [1]+[2]+[4] and none of the first 8,192 does (ch12.1, certificate: computed).
     a5_fifth    the kernels k_j(y) = (1 − y)/(1 + (j² − 1)y), j = 1…6, plotted exactly (computed); with one shared
                 probability F(1…4) close, F(5) ∈ [0.963278306636895970, 0.963278478925447241] whose 22-bit codes are both
                 4040282 (computed here from the quoted bounds) against the reference code 4040283 (ch12.1, quoted);
                 minimal efficiency ratio 18.49684…, neutral shell trace from 1 to 19, charged three-zero-mode sector
                 below 19/3; F(6) − T₆ ≥ 1.33015563912 × 10⁻⁸ (ch12.1, interval certificates: computed).
     a5_seventh  the Gauss–Radau window for F(7): bounds quoted from the ch12.2 table; its 35-bit code 32071996606, the
                 36-bit split 64143993212 | 64143993213 and the width 2.140 × 10⁻¹² recomputed here exactly; reference code
                 32071992476 (quoted), gap 4130 (computed); 44 input bits suffice, 43 do not (ch12.2, certificate).
     a5_bands    three height bands [3.8, 4.5]·10¹⁰ ∪ [7, 10]·10¹⁰ ∪ [10¹², ∞) with ≈ 23.44 %, 37.4 %, 39.1 % and
                 total > 99.931 % (ch12.3, certificate); held-out J deficit 6.0833 % (8 zeros), [5.5700, 9.3435] %
                 (23 zeros), sup ≈ 16.568 % (ch12.3, certificate); CyclicFejerBand.band_le_positive_fourier and
                 FiniteCollisionVariance.tailCollisionMass_lower_variance (LEAN: the two inequalities as stated).
     a5_ladder   S_w = Σ_k w_k Σ_△ s_△ (1 − cos kφ_△) on 529 triangles (def-ou-ch13-wilson-winding-action);
                 triad(p_Half, p₀, q_Half) = (1, 1, 1, 1), triad(q_Half, p₀, p_Half) = (1, 1, 1, −1) computed here and
                 OmegaComposeAndWitnesses.phalf_qhalf_noncommutative (LEAN: not ray-equivalent); the winding ladder
                 ≤ 18 → 19 → 21 → 27 → 31 → 36 → 105, the monotone-cone gap > 1/4, TV distance > 13/19200 and the 100 free
                 coefficients (ch13.2–13.3, certificates: computed).
     a5_witness  zero #2,306,888,100,085: three windows, 105-winding energy gap 4.857224 × 10⁻⁸, |V_ub|² +1.328335 ppm,
                 J +0.811085 ppm (ex-ou-ch13-flagship-zero, certificate); four stress tests: < 1.690 × 10⁻⁷⁵, > 31 %
                 leakage, orthogonal vs parallel current, only k/d² with (k, d) = (32, 724) → 2/32761 reduced here
                 (ch13.4, certificate: computed; the proton reading is the chapter's argued conclusion).
     a5_channels 12·4² + 12·6² = 192 + 432 = 624 (def-ou-ch14-memory-rank, computed); gain in (623.91, 624.09)
                 (ch14.1, certificate); local memory rank r(D): 38 fixed, [29, 31] at 56, 26–27 on [216, 224), 25–26 on
                 [224, 296), 24 on [392, 544), 23 on [544, 1152), 21, 20, 19 at 1152, 1376, 1568 (ch14.3 table,
                 certificates); TwoHiddenScalarResponse.response_iff (LEAN, as stated); five selection rules, five zeros
                 #10875, #11737, #11488, #11431, #11618 (ch14.4 table, certificates).
     a5_ledger   the ch15.1 balance sheet: four model-internal witnesses (4/4, argued tier: they depend on chosen tables,
                 thresholds or calibrations) and zero zero-fit derivations (0/4: problems prob-ou-q1 … q4, OPEN).
     a5_ask      the question handed to the coda.
   On load, FILM.init checks the four citations with leanCite and re-derives every number computed on screen by a second
   route; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
const A5 = (() => {
  const GID = {
    fejer: 'D5/S3/Fourier/Concentration/CyclicFejerBand.band_le_positive_fourier',
    coll: 'D5/S3/Fourier/Concentration/FiniteCollisionVariance.tailCollisionMass_lower_variance',
    noncomm: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative',
    schur: 'D5/S3/Quantum/Matrix/Schur/TwoHiddenScalarResponse.response_iff'
  };
  /* ---------- exact decimal arithmetic (BigInt) ---------- */
  function dec(s) { const [i, f = ''] = s.split('.'); return { n: BigInt(i + f), k: f.length }; }
  const P10 = k => 10n ** BigInt(k);
  /* floor(2^b x) for a decimal string x ≥ 0 */
  function code(s, b) { const d = dec(s); return (d.n << BigInt(b)) / P10(d.k); }
  /* the fractional part of 2^b x, as a Number */
  function frac(s, b) { const d = dec(s), m = d.n << BigInt(b), q = m / P10(d.k); return Number((m - q * P10(d.k)) * 1000000n / P10(d.k)) / 1e6; }
  /* hi − lo of two decimal strings, as a Number */
  function diff(hi, lo) { const a = dec(hi), b = dec(lo), k = Math.max(a.k, b.k); const x = a.n * P10(k - a.k) - b.n * P10(k - b.k); return Number(x) / Math.pow(10, k); }
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  /* ---------- chapter 12: the clock ---------- */
  const kern = (j, y) => (1 - y) / (1 + (j * j - 1) * y);
  const F5 = { lo: '0.963278306636895970', hi: '0.963278478925447241', ref: 4040283n };
  const F7 = { lo: '0.93341795164287258400188', hi: '0.93341795164501234976010', ref: 32071992476n };
  const C5 = code(F5.lo, 22), C7 = code(F7.lo, 35);
  const GAP7 = Number(C7 - F7.ref);
  const W7 = diff(F7.hi, F7.lo);
  const BANDS = [
    { a: 3.8e10, b: 4.5e10, w: 23.44, s: '[3.8, 4.5] × 10¹⁰', z: '≈ 23.44 %' },
    { a: 7e10, b: 1e11, w: 37.4, s: '[7, 10] × 10¹⁰', z: '≈ 37.4 %' },
    { a: 1e12, b: Infinity, w: 39.1, s: '[10¹², ∞)', z: '≈ 39.1 %' }
  ];
  /* ---------- chapter 13: the ladder and the witness ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const conj = a => [a[0], -a[1], -a[2], -a[3]];
  const triad = (a, b, c) => qmul(qmul(a, conj(b)), c);
  const P0 = [1, 0, 0, 0], PH = [1, 1, 0, 0], QH = [1, 0, 1, 0];
  const PQ = triad(PH, P0, QH), QP = triad(QH, P0, PH);
  const RUNGS = [
    { k: 18, s: '≤ 18 · no stationary point', side: 'up', y: 500, right: true },
    { k: 19, s: '19 · first saddle', side: 'dn', y: 640, right: true },
    { k: 21, s: '21 · first local minimum', side: 'up', y: 440, right: true },
    { k: 27, s: '27 · global min in windows, flavour collapses', side: 'dn', y: 700, right: true },
    { k: 31, s: '31 · flavour local minimum', side: 'up', y: 390 },
    { k: 36, s: '36 · flavour vacuum, height-tuned', side: 'dn', y: 760 },
    { k: 105, s: '105 · one vacuum, all heights', side: 'up', y: 440, right: true }
  ];
  const KD = { k: 32, d: 724 };
  const KDr = (() => { const n = KD.k, m = KD.d * KD.d, g = gcd(n, m); return [n / g, m / g]; })();
  /* ---------- chapter 14: channels and memory rank ---------- */
  const CH = { a: 12, ra: 4, b: 12, rb: 6 };
  const NCH = CH.a * CH.ra * CH.ra + CH.b * CH.rb * CH.rb;
  /* r(D) as the chapter's table gives it: exact values on ranges or points, certified brackets [lo, hi] */
  const RANK = [
    { d0: 56, d1: 56, lo: 29, hi: 31 },
    { d0: 216, d1: 224, lo: 26, hi: 27 },
    { d0: 224, d1: 296, lo: 25, hi: 26 },
    { d0: 392, d1: 544, lo: 24, hi: 24 },
    { d0: 544, d1: 1152, lo: 23, hi: 23 },
    { d0: 1152, d1: 1152, lo: 21, hi: 21 },
    { d0: 1376, d1: 1376, lo: 20, hi: 20 },
    { d0: 1568, d1: 1600, lo: 19, hi: 19 }
  ];
  const ZEROS = [
    ['#10875', 'bare spectral weight'], ['#11737', 'input-box volume'], ['#11488', 'six mass candidates'],
    ['#11431', 'port gain · parity'], ['#11618', 'many-body vacuum']
  ];
  /* ---------- drawing helpers ---------- */
  function rail(S, a = 1) { SPINE.rail(S, 5, a * clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.4)); }
  function leanChip(x, y, gid, a, size = 20) {
    if (a <= 0.003) return 0;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') { window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); return 0; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18, name = gid.split('/').pop();
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    return wh + 12 + tw(name, size, F.mono, 700);
  }
  const big = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  /* a dial with a hand at angle th */
  function dial(x, y, r, th, col, a, ticks = 12) {
    if (a <= 0.003) return;
    ring(x, y, r, col, a * 0.8, 2.5);
    for (let i = 0; i < ticks; i++) { const t = i / ticks * TAU; line(x + Math.cos(t) * r * 0.86, y + Math.sin(t) * r * 0.86, x + Math.cos(t) * r, y + Math.sin(t) * r, col, a * 0.6, 2); }
    line(x, y, x + Math.cos(th) * r * 0.8, y + Math.sin(th) * r * 0.8, col, a, 4);
    dot(x, y, 8, 'w', a);
  }
  return { GID, code, frac, diff, gcd, kern, F5, F7, C5, C7, GAP7, W7, BANDS, qmul, conj, triad, P0, PH, QH, PQ, QP,
    RUNGS, KD, KDr, CH, NCH, RANK, ZEROS, rail, leanChip, big, dial };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a5: ' + m); };
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  Object.values(A5.GID).forEach(g => { const r = leanCite(g); check(r && r.kind === 'theorem', `${g} is not a cited theorem`); });
  /* the fifth time: both quoted bounds fall in the 22-bit cell 4040282, one below the reference code; second route:
     floating point with the cell boundaries */
  check(A5.code(A5.F5.lo, 22) === 4040282n && A5.code(A5.F5.hi, 22) === 4040282n, 'F(5) 22-bit codes');
  check(A5.F5.ref - A5.C5 === 1n, 'F(5) one code below the reference');
  check(Math.floor(0.963278306636895970 * 4194304) === 4040282 && Math.floor(0.963278478925447241 * 4194304) === 4040282, 'F(5) codes (float)');
  /* the seventh time: 35-bit codes agree, the 36-bit codes split, gap 4130, width 2.140e-12 */
  check(A5.code(A5.F7.lo, 35) === 32071996606n && A5.code(A5.F7.hi, 35) === 32071996606n, 'F(7) 35-bit codes');
  check(A5.code(A5.F7.lo, 36) === 64143993212n && A5.code(A5.F7.hi, 36) === 64143993213n, 'F(7) 36-bit split');
  check(A5.GAP7 === 4130 && 32071996606 - 32071992476 === 4130, 'gap of 4130 codes');
  check(A5.W7.toFixed(15) === '0.000000000002140' && Math.abs(A5.W7 - 2.13976575822e-12) < 1e-21, 'window width 2.140e-12');
  { const lo = A5.frac(A5.F7.lo, 35), hi = A5.frac(A5.F7.hi, 35);
    check(lo < 0.5 && hi > 0.5 && Math.abs((hi - lo) - A5.W7 * Math.pow(2, 35)) < 1e-5, 'window inside the cell, across its midpoint'); }
  /* the offset F(7) − T7 of ch12.2 is consistent with 4130 codes of width 2^-35 */
  check(4130 / Math.pow(2, 35) < 1.20209757801358e-7 && 4131 / Math.pow(2, 35) > 1.20207618035599e-7, 'offset vs codes');
  /* the kernels: k_j(0) = 1, k_j(1) = 0, decreasing in j; second route k_j(y) = 1/(1 + j² x) with x = y/(1 − y) times… */
  for (let j = 1; j <= 7; j++) {
    check(A5.kern(j, 0) === 1 && A5.kern(j, 1) === 0, `k_${j} endpoints`);
    for (let i = 1; i < 10; i++) { const y = i / 10, x = y / (1 - y);
      check(Math.abs(A5.kern(j, y) - (1 - y) / (1 + (j * j - 1) * y)) < 1e-15, 'kernel');
      check(Math.abs(A5.kern(j, y) * (1 + j * j * x) - 1) < 1e-12, `k_${j} = 1/(1 + j²x)·(1 − y)/(1 − y)`);
      if (j > 1) check(A5.kern(j, y) < A5.kern(j - 1, y), 'kernels decrease in j'); }
  }
  check(18.49684338 < 19 && 19 / 3 < 18.49684338, 'efficiency threshold between 19/3 and 19');
  /* the bands: about 99.94 % in the quoted shares, consistent with > 99.931 %; ordered and disjoint */
  const tot = A5.BANDS.reduce((s, b) => s + b.w, 0);
  check(Math.abs(tot - 99.94) < 1e-9 && tot > 99.931, 'band shares');
  A5.BANDS.forEach((b, i) => { check(b.a < b.b, 'band'); if (i) check(A5.BANDS[i - 1].b < b.a, 'bands disjoint'); });
  check(5.57 <= 6.0833 && 6.0833 <= 9.3435 && 9.3435 < 16.568, 'J deficit ordering');
  /* the triads: by multiplication, and as rays (k(1,1,1,1) = l(1,1,1,−1) forces k = l = 0) */
  check(eq(A5.PQ, [1, 1, 1, 1]) && eq(A5.QP, [1, 1, 1, -1]), 'triads');
  check(eq(A5.qmul(A5.PH, A5.QH), A5.PQ) && eq(A5.qmul(A5.QH, A5.PH), A5.QP), 'triad with p0 = plain product');
  check(A5.PQ[0] === A5.QP[0] && A5.PQ[3] === -A5.QP[3], 'no common ray');
  /* the ladder increases; 13/19200 */
  A5.RUNGS.forEach((r, i) => { if (i) check(A5.RUNGS[i - 1].k < r.k, 'ladder order'); });
  check(A5.gcd(13, 19200) === 1, '13/19200 reduced');
  /* k/d² with (k, d) = (32, 724) */
  check(eq(A5.KDr, [2, 32761]) && 2 * 724 * 724 === 32 * 32761 && 32761 === 181 * 181, 'k/d² = 2/32761');
  /* 624 channels, and the gain bracket */
  check(A5.NCH === 624 && 12 * 16 === 192 && 12 * 36 === 432 && 192 + 432 === 624, '624 channels');
  check(623.91 < 624 && 624 < 624.09 && 625 > 624.09, 'gain bracket picks 624');
  /* memory rank: non-increasing in D, brackets ordered, 38 fixed, 19 at the end */
  let prev = 38;
  A5.RANK.forEach(r => { check(r.lo <= r.hi && r.d0 <= r.d1 && r.hi <= prev, `r(${r.d0})`); prev = r.lo; });
  check(A5.RANK[A5.RANK.length - 1].lo === 19, 'floor 19');
  check(A5.ZEROS.length === 5 && new Set(A5.ZEROS.map(z => z[0])).size === 5, 'five different zeros');
  check(A5.big(2306888100085) === '2,306,888,100,085', 'witness zero');
});

Object.assign(FILM.speed, { a5_title: 0.02, a5_fifth: 0.014, a5_seventh: 0.012, a5_bands: 0.014, a5_ladder: 0.016,
  a5_witness: 0.014, a5_channels: 0.014, a5_ledger: 0.018, a5_ask: 0.022 });

/* ================================ scenes ================================ */
SCENES.a5_title = S => {
  const u = S.u;
  SPINE.title(S, 5, '四问共用一只钟', 'One clock for four questions');
  A5.rail(S, at(S, 0, 0.6));
  badgeQ(S, [[0, 'To find out', 'argued'], [2, 'the first is', 'computed']]);
  const a0 = at(S, 0, 0.7);
  if (a0 <= 0.003) return;
  /* four sector dials, each with its own hand; then they hand over to one clock */
  const merge = ease(Q(S, 0, 'onto one', 1.6));
  const D4 = [
    { x: 400, y: 330, s: '[1] couplings · α_s ≈ 0.1184', z: '规范耦合', w: 0.9 },
    { x: 400, y: 600, s: '[2] three light modes', z: '手征三代', w: -0.6 },
    { x: 1520, y: 330, s: '[3] flavour · CKM', z: '夸克味混合', w: 1.4 },
    { x: 1520, y: 600, s: '[4] curvature · 2‰ window', z: '四层曲率', w: -1.1 }
  ];
  const cx = W / 2, cy = 440, R = 135;
  D4.forEach((d, i) => {
    const th = -Math.PI / 2 + d.w * u + i * 1.3;
    const thM = -Math.PI / 2 + 0.55 * u;
    A5.dial(d.x, d.y, 70, lerp(th, thM, merge), mix(C.cyan, C.dim, merge * 0.6), a0);
    txt(d.s, d.x, d.y + 104, { size: 21, fam: F.math, w: 700, align: 'center', c: C.white, a: a0 * (1 - 0.4 * merge) });
    txt(d.z, d.x, d.y + 132, { size: 19, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a0 * (1 - 0.4 * merge) });
    const ex = d.x < cx ? d.x + 95 : d.x - 95;
    arrow(ex, d.y + (cy - d.y) * 0.12, lerp(ex, cx + (d.x < cx ? -R - 20 : R + 20), 0.92), cy + (d.y - cy) * 0.3, C.cyan, a0 * merge * 0.8, 2.5);
  });
  /* the one clock: ticks j = 1, 2, 3 … light up as they are named */
  const am = merge;
  if (am > 0.003) {
    ring(cx, cy, R, C.now, am, 3.5);
    const lit = clamp((u - lineAt(S, 1).s - 1.2) / 2.6) * 7;
    for (let j = 1; j <= 7; j++) {
      const t = -Math.PI / 2 + (j - 1) / 7 * TAU, on = clamp(lit - (j - 1));
      const x = cx + Math.cos(t) * (R + 30), y = cy + Math.sin(t) * (R + 30) + 9;
      txt(String(j), x, y, { size: 26, fam: F.orb, w: 700, align: 'center', c: on > 0.5 ? C.now : C.dim, a: am * (0.5 + 0.5 * on) });
      dot(cx + Math.cos(t) * R, cy + Math.sin(t) * R, 6, on > 0.5 ? 'g' : 'c', am);
    }
    const th = -Math.PI / 2 + Math.min(lit, 7) / 7 * TAU;
    line(cx, cy, cx + Math.cos(th) * R * 0.82, cy + Math.sin(th) * R * 0.82, C.now, am, 5);
    dot(cx, cy, 10, 'w', am);
    txt('one clock · 同一只钟', cx, cy - R - 58, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: am });
  }
  const a1 = Q(S, 1, 'one filter', 0.6);
  txt('F(j) = ⟨ s , (I + j²K)⁻¹ s ⟩', cx, 668, { size: 44, fam: F.math, w: 700, align: 'center', c: C.white, a: a1 });
  txt('same operator K · same source s · same zero weights p', cx, 712, { size: 21, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a1 });
  const a2 = Q(S, 2, 'the first is', 0.6);
  chip(cx, 790, 820, 60, 'first zero through [1]+[2]+[4]:  #8359', C.now, a2, 27);
  txt('none of the first 8,192 zeros passes all three', cx, 842, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a2 });
};

SCENES.a5_fifth = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  /* left: the kernels k_j(y), drawn exactly */
  const a0 = clamp(u / 0.6);
  const X0 = 210, X1 = 830, Y0 = 520, Y1 = 230;
  panel(140, 185, 760, 400, a0, C.cyan, 'KERNELS · 核函数 k_j(y)');
  line(X0, Y0, X1, Y0, C.dim, a0, 1.5); line(X0, Y0, X0, Y1, C.dim, a0, 1.5);
  txt('0', X0, Y0 + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: a0 });
  txt('1', X1, Y0 + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: a0 });
  txt('y', (X0 + X1) / 2, Y0 + 30, { size: 20, fam: F.math, align: 'center', c: C.dim, a: a0 });
  txt('1', X0 - 14, Y1 + 6, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: a0 });
  const shown = clamp(u / 2.4) * 6;
  for (let j = 1; j <= 6; j++) {
    const aj = a0 * clamp(shown - (j - 1));
    const col = j === 5 ? C.now : j === 6 ? C.mag : C.cyan;
    const emph = (j === 5 && at(S, 1, 0.4) > 0) || (j === 6 && at(S, 4, 0.4) > 0);
    curve(t => [X0 + (X1 - X0) * t, Y0 - (Y0 - Y1) * A5.kern(j, t)], 80, col, aj * (emph ? 1 : 0.55), emph ? 4 : 2.5);
  }
  txt('j = 1 … 4', X1 - 300, Y1 + 70, { size: 19, fam: F.mono, w: 700, c: C.cyan, a: a0 });
  txt('j = 5', X1 - 300, Y1 + 100, { size: 19, fam: F.mono, w: 700, c: C.now, a: a0 * clamp(shown - 4) });
  txt('j = 6', X1 - 300, Y1 + 130, { size: 19, fam: F.mono, w: 700, c: C.mag, a: a0 * clamp(shown - 5) });
  txt('k_j(y) = (1 − y) / (1 + (j² − 1) y)', X1, Y1 + 4, { size: 20, fam: F.math, w: 700, align: 'right', c: C.white, a: a0 });
  /* right: the readings */
  const a1 = at(S, 0, 0.6);
  panel(960, 185, 820, 400, a1, C.cyan, 'READINGS · 算术时间读数');
  txt('F(1) … F(4) = T₁ … T₄   exact', 990, 262, { size: 28, fam: F.math, w: 700, c: C.cyan, a: a1 });
  const a2 = at(S, 1, 0.6);
  txt('F(5) ∈ [0.963278306636895970, 0.963278478925447241]', 990, 312, { size: 21, fam: F.mono, w: 700, c: C.now, a: a2 });
  /* the 22-bit cells 4040282 | 4040283 */
  const cX0 = 1000, cX1 = 1740, cy = 410, mid = (cX0 + cX1) / 2, half = (cX1 - cX0) / 2;
  if (a2 > 0.003) {
    box(cX0, cy - 34, half, 68, C.now, a2, 1.5, rgba(C.now, 0.06));
    box(mid, cy - 34, half, 68, C.cyan, a2, 1.5, rgba(C.cyan, 0.08));
    const lo = cX0 + half * 0.054640359, hi = cX0 + half * 0.777270919;
    const g = Q(S, 1, 'every allowed setting', 1.2);
    fillBox(lo, cy - 14, (hi - lo) * g, 28, C.now, a2 * 0.75);
    txt('code 4040282', cX0 + half / 2, cy + 64, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: a2 });
    txt('reference 4040283', mid + half / 2, cy + 64, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: Q(S, 1, 'the reference', 0.5) });
    txt('T₅', mid + half / 2, cy + 10, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: Q(S, 1, 'the reference', 0.5) });
    txt('22-bit cells', cX0, cy - 46, { size: 16, fam: F.mono, c: C.dim, a: a2 });
  }
  const a4 = at(S, 4, 0.6);
  txt('F(6) − T₆ ≥ 1.33015563912 × 10⁻⁸', 990, 560, { size: 28, fam: F.math, w: 700, c: C.mag, a: a4 });
  /* bottom: the efficiency ratio needed, and the neutral shell's trace from 1 to 19 */
  const a3 = at(S, 2, 0.6);
  if (a3 > 0.003) {
    const bX0 = 260, bX1 = 1660, by = 720, xv = v => bX0 + (bX1 - bX0) * (v - 1) / 18;
    panel(140, 615, 1640, 215, a3, C.cyan, 'EFFICIENCY RATIO · 效率倍率  max η / min η');
    line(bX0, by, bX1, by, C.dim, a3, 2);
    [1, 5, 10, 15, 19].forEach(v => { line(xv(v), by - 8, xv(v), by + 8, C.dim, a3, 2); txt(String(v), xv(v), by + 36, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: a3 }); });
    dashed(xv(18.49684338), by - 60, xv(18.49684338), by + 14, C.mag, a3, 2.5);
    txt('needed > 18.49684…', xv(18.49684338) - 12, by - 66, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: a3 });
    const sh = Q(S, 3, 'climbs from one to nineteen', 2.0);
    fillBox(xv(1), by - 12, (xv(19) - xv(1)) * ease(sh), 24, C.cyan, a3 * 0.7 * clamp(sh * 4));
    txt('neutral shell: x·tr(xI + L)⁻¹ runs 1 → 19', xv(1), by + 78, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: at(S, 3, 0.6) });
    dashed(xv(19 / 3), by - 30, xv(19 / 3), by + 14, C.dim, a3 * at(S, 3, 0.6), 2);
    txt('charged sector < 19/3', xv(19 / 3) + 10, by - 34, { size: 18, fam: F.mono, c: C.dim, a: a3 * at(S, 3, 0.6) });
  }
};

SCENES.a5_seventh = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  /* six locked readings */
  const a0 = clamp(u / 0.6);
  for (let j = 1; j <= 7; j++) {
    const x = 330 + (j - 1) * 210, y = 230, last = j === 7;
    const a = a0 * (last ? 0.5 + 0.5 * Q(S, 0, 'unseen seventh', 0.6) : 1);
    chip(x, y, 170, 58, `F(${j})`, last ? C.now : C.cyan, a, 28, F.math);
    txt(last ? '?' : 'locked', x, y + 58, { size: 18, fam: F.mono, w: 700, align: 'center', c: last ? C.now : C.dim, a });
  }
  /* one 35-bit cell, drawn wide, with the Gauss–Radau window at its exact place */
  const a1 = at(S, 1, 0.7);
  const X0 = 300, X1 = 1620, Y = 450;
  if (a1 > 0.003) {
    box(X0, Y - 50, X1 - X0, 100, C.cyan, a1, 1.5, rgba(C.cyan, 0.05));
    dashed((X0 + X1) / 2, Y - 66, (X0 + X1) / 2, Y + 66, C.dim, a1, 1.6);
    const lo = X0 + (X1 - X0) * A5.frac(A5.F7.lo, 35), hi = X0 + (X1 - X0) * A5.frac(A5.F7.hi, 35);
    const g = Q(S, 1, 'pin it', 1.0);
    const wl = lerp(X0, lo, ease(g)), wr = lerp(X1, hi, ease(g));
    fillBox(wl, Y - 30, wr - wl, 60, C.now, a1 * 0.8);
    txt('one 35-bit cell, width 2⁻³⁵', X0, Y - 64, { size: 19, fam: F.math, w: 700, c: C.dim, a: a1 });
    txt(`window ${A5.W7.toExponential(3).replace('e-', ' × 10⁻').replace('12', '¹²')}`, (lo + hi) / 2, Y + 88, { size: 26, fam: F.math, w: 700, align: 'center', c: C.now, a: a1 * g });
    txt('36-bit halves:  …212 | …213', X1, Y - 64, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: a1 });
  }
  /* the codes: forced against reference, 4130 cells apart */
  const a2 = at(S, 2, 0.6);
  if (a2 > 0.003) {
    const cX0 = 300, cX1 = 1620, cy = 640, ref = 32071992476, frc = 32071996606;
    const xv = c => cX0 + (cX1 - cX0) * (c - 32071992200) / 4700;
    line(cX0, cy, cX1, cy, C.dim, a2, 2);
    for (let c = 32071992500; c <= 32071996500; c += 500) line(xv(c), cy - 6, xv(c), cy + 6, C.dim, a2 * 0.7, 1.5);
    const g = Q(S, 2, 'lands', 1.0);
    dot(xv(ref), cy, 12, 'c', a2); dot(xv(frc), cy, 13, 'g', a2 * g);
    txt('reference T₇  32071992476', xv(ref), cy + 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a2 });
    txt('forced  32071996606', xv(frc), cy + 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: a2 * g });
    line(xv(ref), cy - 30, xv(frc), cy - 30, C.mag, a2 * g, 2.5);
    line(xv(ref), cy - 40, xv(ref), cy - 20, C.mag, a2 * g, 2.5); line(xv(frc), cy - 40, xv(frc), cy - 20, C.mag, a2 * g, 2.5);
    txt(`${A5.GAP7} codes`, (xv(ref) + xv(frc)) / 2, cy - 44, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a2 * g });
    txt('35-bit codes ⌊2³⁵ F(7)⌋', cX0, cy - 78, { size: 19, fam: F.math, w: 700, c: C.dim, a: a2 });
  }
  /* the input precision */
  const a3 = at(S, 3, 0.6);
  chip(640, 790, 520, 60, '44 input bits → one code', C.now, a3, 26);
  chip(1280, 790, 520, 60, '43 bits → two codes possible', C.mag, Q(S, 3, 'with forty-three', 0.5), 26);
};

SCENES.a5_bands = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean-checked', 'lean']]);
  /* the zero-height axis, log scale 10⁸ … 10¹⁴ */
  const a0 = clamp(u / 0.6);
  const X0 = 220, X1 = 1700, Y = 500, lg = h => X0 + (X1 - X0) * (Math.log10(h) - 8) / 6;
  line(X0, Y, X1 + 30, Y, C.dim, a0, 2);
  for (let e = 8; e <= 14; e++) { line(lg(Math.pow(10, e)), Y - 8, lg(Math.pow(10, e)), Y + 8, C.dim, a0, 2);
    txt('10' + ['⁸', '⁹', '¹⁰', '¹¹', '¹²', '¹³', '¹⁴'][e - 8], lg(Math.pow(10, e)), Y + 38, { size: 22, fam: F.math, align: 'center', c: C.dim, a: a0 }); }
  txt('zero height γ (log) · 零点高度', X0, 210, { size: 20, fam: F.math, w: 700, c: C.dim, a: a0 });
  const g = Q(S, 0, 'squeeze', 1.6);
  A5.BANDS.forEach((b, i) => {
    const x0 = lg(b.a), x1 = b.b === Infinity ? X1 : lg(b.b), h = 230 * b.w / 39.1 * ease(clamp(g * 1.6 - i * 0.3));
    fillBox(x0, Y - h, x1 - x0, h, C.cyan, a0 * 0.55);
    box(x0, Y - h, x1 - x0, Math.max(h, 1), C.cyan, a0 * clamp(h / 20), 1.5);
    if (b.b === Infinity) arrow(x1 - 10, Y - h / 2, X1 + 30, Y - h / 2, C.cyan, a0 * clamp(h / 20), 3);
    const left = i === 0, lx = left ? x0 - 14 : (x0 + x1) / 2, ly = left ? Y - h + 30 : Y - h - 36, al = left ? 'right' : 'center';
    txt(b.z, lx, ly, { size: 24, fam: F.mono, w: 700, align: al, c: C.white, a: a0 * clamp(h / 60) });
    txt(b.s, lx, ly + 26, { size: 19, fam: F.math, align: al, c: C.cyan, a: a0 * clamp(h / 60) });
  });
  txt('> 99.931 % of the weight', 470, 300, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.now, a: Q(S, 0, '99.93 percent', 0.6) });
  txt('in three bands · 三条高度带', 470, 340, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: Q(S, 0, '99.93 percent', 0.6) });
  /* the held-out J deficit */
  const a1 = at(S, 1, 0.6);
  if (a1 > 0.003) {
    const jX0 = 520, jX1 = 1700, jy = 620, xv = p => jX0 + (jX1 - jX0) * p / 17;
    txt('held-out J deficit', 140, jy + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a1 });
    line(jX0, jy, jX1, jy, C.dim, a1, 2);
    [0, 5, 10, 15].forEach(p => { line(xv(p), jy - 6, xv(p), jy + 6, C.dim, a1, 1.5); txt(`${p} %`, xv(p), jy + 32, { size: 17, fam: F.mono, align: 'center', c: C.dim, a: a1 }); });
    fillBox(xv(5.57), jy - 10, xv(9.3435) - xv(5.57), 20, C.cyan, a1 * 0.45);
    txt('23 zeros: 5.57–9.34 %', xv(9.3435) + 10, jy - 18, { size: 18, fam: F.mono, c: C.cyan, a: a1 });
    dot(xv(6.0833), jy, 13, 'g', a1);
    txt('8 zeros: 6.0833 %', xv(6.0833) + 10, jy - 22, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.now, a: a1 });
    line(xv(16.568), jy - 14, xv(16.568), jy + 14, C.dim, a1, 2);
    txt('sup ≈ 16.568 %', xv(16.568), jy - 22, { size: 17, fam: F.mono, align: 'center', c: C.dim, a: a1 });
  }
  /* the two Lean inequalities */
  const a2 = Q(S, 2, 'Lean-checked', 0.6);
  A5.leanChip(140, 720, A5.GID.fejer, a2, 19);
  txt('(N − H)·Σ M(r) [r ∈ R_H] + H·M(0)  ≤  (1/q)·Σₖ |B_N(k)|²·Re M̂(k)', 1000, 720, { size: 21, fam: F.math, w: 700, c: C.lean, a: Q(S, 2, 'caps band weight', 0.6) });
  A5.leanChip(140, 790, A5.GID.coll, Q(S, 2, 'variance', 0.6), 19);
  txt('(9/16)·W²ᵖ  ≤  (1 + 4√(pV)/η)·E_p(η)', 1000, 790, { size: 21, fam: F.math, w: 700, c: C.lean, a: Q(S, 2, 'floors collisions', 0.6) });
};

SCENES.a5_ladder = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean'], [2, null, 'computed']]);
  /* the action on 529 triangles */
  const a0 = clamp(u / 0.6) * (1 - 0.6 * at(S, 2, 0.6));
  const tx = 230, ty = 255;
  if (a0 > 0.003) {
    const tri = [[tx, ty - 50], [tx - 56, ty + 44], [tx + 56, ty + 44]];
    for (let i = 0; i < 3; i++) arrow(tri[i][0], tri[i][1], lerp(tri[i][0], tri[(i + 1) % 3][0], 0.92), lerp(tri[i][1], tri[(i + 1) % 3][1], 0.92), C.cyan, a0, 3);
    txt('φ△', tx, ty + 18, { size: 26, fam: F.math, w: 700, align: 'center', c: C.now, a: a0 });
    txt('× 529', tx, ty + 92, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: a0 });
    txt('S_w = Σₖ wₖ Σ△ s△ (1 − cos kφ△)', 360, ty - 10, { size: 30, fam: F.math, w: 700, c: C.white, a: a0 });
    txt('wₖ ≥ 0, Σ wₖ = 1 · k = winding number · 绕数', 360, ty + 30, { size: 20, fam: F.mono, w: 700, c: C.dim, a: a0 });
  }
  /* the twist: two orders of the same quaternion turns */
  const a1 = Q(S, 1, 'do not commute', 0.6) * (1 - 0.6 * at(S, 2, 0.6));
  const pq = `(${A5.PQ.join(', ')})`, qp = `(${A5.QP.join(', ').replace('-', '−')})`;
  txt(`triad(p_Half, p₀, q_Half) = ${pq}`, 1110, 225, { size: 21, fam: F.math, w: 700, c: C.white, a: a1 });
  txt(`triad(q_Half, p₀, p_Half) = ${qp}`, 1110, 258, { size: 21, fam: F.math, w: 700, c: C.white, a: a1 });
  A5.leanChip(1110, 302, A5.GID.noncomm, Q(S, 1, 'Lean checks', 0.6) * (1 - 0.6 * at(S, 2, 0.6)), 17);
  txt('not on one projective ray', 1110, 334, { size: 17, fam: F.mono, c: C.lean, a: Q(S, 1, 'Lean checks', 0.6) * (1 - 0.6 * at(S, 2, 0.6)) });
  /* the ladder, log axis K = 10 … 120 */
  const a2 = at(S, 2, 0.6);
  if (a2 > 0.003) {
    const X0 = 200, X1 = 1720, Y = 570, lg = k => X0 + (X1 - X0) * Math.log10(k / 10) / Math.log10(12);
    line(X0, Y, X1, Y, C.dim, a2, 2);
    [10, 20, 50, 100].forEach(k => { line(lg(k), Y - 6, lg(k), Y + 6, C.dim, a2 * 0.6, 1.5); });
    txt('max winding K (log)', X0, Y + 34, { size: 17, fam: F.mono, c: C.dim, a: a2 });
    const tStart = [
      phraseAt(S, 2, 'no stationary point'), phraseAt(S, 2, 'a saddle'), phraseAt(S, 2, 'a valley'),
      phraseAt(S, 3, 'At 27'), phraseAt(S, 3, 'flavour collapses') + 0.6, phraseAt(S, 3, 'flavour collapses') + 1.4,
      phraseAt(S, 3, 'only at 105')];
    A5.RUNGS.forEach((r, i) => {
      const ar = a2 * clamp((u - tStart[i]) / 0.5);
      if (ar <= 0.003) return;
      const x = lg(r.k), last = i === A5.RUNGS.length - 1, cur = last || (i === 3 && u < tStart[6]);
      const col = last ? C.now : i === 0 ? C.dim : C.cyan;
      line(x, Y - 16, x, Y + 16, col, ar, 4);
      dot(x, Y, last ? 12 : 8, last ? 'g' : i === 0 ? 'w' : 'c', ar);
      line(x, r.side === 'up' ? Y - 18 : Y + 18, x, r.y + (r.side === 'up' ? 8 : -26), col, ar * 0.5, 1.2);
      txt(r.s, r.right ? x - 8 : x + 8, r.y, { size: 22, fam: F.mono, w: 700, align: r.right ? 'right' : 'left', c: cur ? C.now : col === C.dim ? C.white : C.cyan, a: ar });
    });
  }
  /* the obstruction and what is left */
  const a4 = at(S, 4, 0.6);
  chip(560, 812, 760, 52, 'non-increasing weights: always > 1/4 above a rival', C.mag, a4, 22);
  chip(1370, 812, 620, 52, 'at 105: still 100 free coefficients', C.mag, Q(S, 4, '100 free', 0.5), 22);
};

SCENES.a5_witness = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'computed']]);
  const a0 = clamp(u / 0.6);
  txt('ZERO  #2,306,888,100,085', W / 2, 262, { size: 68, fam: F.orb, w: 900, align: 'center', c: C.now, a: a0 * Q(S, 0, 'one real zero', 0.8), ab: 2, ls: 2 });
  txt('one background · both clocks from its own height · 单一零点背景', W / 2, 306, { size: 21, fam: F.mono, w: 700, align: 'center', c: C.dim, a: Q(S, 0, 'all happens', 0.6) });
  /* windows and readouts */
  const a1 = at(S, 1, 0.6);
  [['[1] α_s window ✓', 'Three windows'], ['[2] three light modes ✓', 'Three windows'], ['[4] curvature 2‰ ✓', 'Three windows']].forEach(([s, ph], i) => {
    chip(500 + i * 460, 375, 400, 54, s, C.cyan, a1 * clamp((u - phraseAt(S, 1, ph) - i * 0.25) / 0.4), 23, F.math);
  });
  const rd = [['105-winding energy gap', '4.857224 × 10⁻⁸', 'the energy'], ['|V_ub|² deviation', '+1.328335 ppm', 'both flavour'], ['J deviation', '+0.811085 ppm', 'both flavour']];
  rd.forEach(([k, v, ph], i) => {
    const a = clamp((u - phraseAt(S, 1, ph) - i * 0.3) / 0.5);
    txt(k, 500 + i * 460, 452, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
    txt(v, 500 + i * 460, 494, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a });
  });
  /* four cracks */
  const cracks = [
    ['NEAR-VACUUM BLINDNESS', 'weights 2·10⁻⁹ apart', 'differ by < 1.690 × 10⁻⁷⁵', 2, 'distinct weights'],
    ['LIGHT-SPACE LEAKAGE', 'charge 1 → charges 2 and −4', '> 31 % into the heavy part', 2, 'light spaces leak'],
    ['PROTON UNDECIDED', 'orthogonal: ΔB ≡ 0 (mod 3)', 'parallel: QQQL decay term', 3, 'proton-safe'],
    ['ONE RATIO ONLY', '(k, d) = (32, 724)', `windows fix k/d² = ${A5.KDr[0]}/${A5.KDr[1]}`, 3, 'k over d squared']
  ];
  cracks.forEach(([h, l1, l2, k, ph], i) => {
    const x = 140 + i * 418, a = clamp((u - phraseAt(S, k, ph)) / 0.5);
    panel(x, 560, 396, 220, a, C.mag, h);
    txt(l1, x + 198, 650, { size: 21, fam: F.math, w: 700, align: 'center', c: C.white, a });
    txt(l2, x + 198, 700, { size: 21, fam: F.math, w: 700, align: 'center', c: C.mag, a });
  });
  txt('stress tests · 压力测试', 140, 545, { size: 18, fam: F.mono, w: 700, c: C.mag, a: at(S, 2, 0.5) });
};

SCENES.a5_channels = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean-checked', 'lean'], [4, null, 'computed']]);
  /* phase A: 624 = 12·4² + 12·6² as dots */
  const aA = clamp(u / 0.6) * (1 - at(S, 2, 0.6));
  if (aA > 0.003) {
    const r = 5.2, sp = 14.5, x0 = 190, y0 = 250;
    const fillA = clamp((u - 0.5) / 2.2), fillB = clamp((u - phraseAt(S, 0, 'twelve with six')) / 2.2);
    for (let row = 0; row < 12; row++) {
      for (let c = 0; c < 16; c++) if ((row * 16 + c) / 192 < fillA) dot(x0 + c * sp, y0 + row * sp * 1.4, r, 'c', aA);
      for (let c = 0; c < 36; c++) if ((row * 36 + c) / 432 < fillB) dot(x0 + 290 + c * sp, y0 + row * sp * 1.4, r, 'w', aA);
    }
    txt('12 × 4² = 192', x0 + 16 * sp / 2, y0 - 28, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: aA * clamp(fillA * 3) });
    txt('12 × 6² = 432', x0 + 290 + 36 * sp / 2, y0 - 28, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: aA * clamp(fillB * 3) });
    txt(`= ${A5.NCH} channels`, 1110, y0 + 90, { size: 52, fam: F.orb, w: 900, c: C.now, a: aA * Q(S, 0, 'give 624 channels', 0.6) });
    txt('nearest-chord comparisons, two in order', 1110, y0 + 130, { size: 19, fam: F.mono, w: 700, c: C.dim, a: aA * Q(S, 0, 'compared twice', 0.6) });
    /* the gain bracket */
    const a1 = at(S, 1, 0.6) * aA;
    const gX0 = 1110, gX1 = 1690, gy = 470, xv = g => gX0 + (gX1 - gX0) * (g - 622.8) / 2.4;
    line(gX0, gy, gX1, gy, C.dim, a1, 2);
    [623, 624, 625].forEach(g => { line(xv(g), gy - 7, xv(g), gy + 7, C.dim, a1, 2); txt(String(g), xv(g), gy + 34, { size: 20, fam: F.mono, align: 'center', c: g === 624 ? C.now : C.dim, a: a1 }); });
    fillBox(xv(623.91), gy - 12, xv(624.09) - xv(623.91), 24, C.cyan, a1 * 0.8);
    txt('inverted gain ∈ (623.91, 624.09)', gX0, gy - 30, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a1 });
  }
  /* phase B: the memory-rank ladder r(D) */
  const aB = at(S, 2, 0.6);
  if (aB > 0.003) {
    const X0 = 330, X1 = 1700, Y0 = 560, Y1 = 220, xv = d => X0 + (X1 - X0) * d / 1600, yv = r => Y0 - (Y0 - Y1) * (r - 18) / 21;
    line(X0, Y0, X1, Y0, C.dim, aB, 2); line(X0, Y0, X0, Y1, C.dim, aB, 2);
    [0, 400, 800, 1200, 1600].forEach(d => txt(String(d), xv(d), Y0 + 30, { size: 17, fam: F.mono, align: 'center', c: C.dim, a: aB }));
    [19, 24, 29, 34, 38].forEach(r => { txt(String(r), X0 - 14, yv(r) + 6, { size: 17, fam: F.mono, align: 'right', c: C.dim, a: aB }); line(X0 - 6, yv(r), X0, yv(r), C.dim, aB, 1.5); });
    txt('hidden states r(D) · 局部记忆秩', X0 + 300, Y1 + 6, { size: 19, fam: F.mono, w: 700, c: C.dim, a: aB });
    txt('cutoff D · 平方弦距截止', X1, Y0 + 58, { size: 17, fam: F.mono, w: 700, align: 'right', c: C.dim, a: aB });
    const g = Q(S, 2, 'nineteen at best', 0.6);
    chip(xv(0) + 115, yv(38), 200, 44, 'fixed: 38', C.now, Q(S, 2, 'thirty-eight states', 0.5), 22);
    A5.RANK.forEach((r, i) => {
      const a = aB * clamp((u - phraseAt(S, 2, 'old block fixed') - i * 0.3) / 0.4);
      if (a <= 0.003) return;
      const xa = xv(r.d0), xb = Math.max(xv(r.d1), xa + 8);
      if (r.lo === r.hi) { fillBox(xa, yv(r.lo) - 3, xb - xa, 6, C.cyan, a); dot(xa, yv(r.lo), 7, 'c', a); }
      else box(xa - 4, yv(r.hi) - 4, xb - xa + 8, yv(r.lo) - yv(r.hi) + 8, C.cyan, a, 1.5, rgba(C.cyan, 0.15));
    });
    txt('[29, 31]', xv(56) + 14, yv(30) + 6, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: aB * clamp((u - phraseAt(S, 2, 'old block fixed')) / 0.4) });
    txt('19', xv(1568), yv(19) - 14, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: g });
  }
  /* phase C: the Schur theorem */
  const aC = Q(S, 3, 'Lean-checked', 0.6);
  const lw = A5.leanChip(140, 650, A5.GID.schur, aC, 18);
  txt('β = −bdt, γ = −d(e + tf), ε = −a(e + tf), ζ = −b(te + f) reachable ⇔ (0 ∈ T ∧ β = 0) ∨', 140, 690, { size: 19, fam: F.math, w: 700, c: C.lean, a: Q(S, 3, 'shows the reason', 0.6) });
  txt('(∃ t ∈ T, t ≠ 0) ∧ (β ≠ 0 ∨ γ = 0 ∨ ζ = 0) ∧ (γ ≠ 0 ∨ β = 0 ∨ ε = 0)', 140, 720, { size: 19, fam: F.math, w: 700, c: C.lean, a: Q(S, 3, 'shows the reason', 0.6) });
  txt('two hidden modes, t² ≠ 1 · 双耦合隐藏标量模', 140 + lw + 30, 650, { size: 17, fam: F.zh, w: 700, c: C.dim, a: aC });
  /* the five crowned zeros */
  const a4 = at(S, 4, 0.5);
  A5.ZEROS.forEach(([z, why], i) => {
    const x = 300 + i * 330, a = a4 * clamp((u - lineAt(S, 4).s - 0.6 - i * 0.3) / 0.4);
    chip(x, 795, 230, 46, z, C.now, a, 24);
    txt(why, x, 760, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  });
};

SCENES.a5_ledger = S => {
  const u = S.u;
  A5.rail(S);
  badgeQ(S, [[0, null, 'argued'], [1, 'zero of four', 'open']]);
  const a0 = clamp(u / 0.6);
  const X = [200, 860, 1400], top = 205;
  panel(170, top, 1580, 560, a0, C.cyan, 'THE BALANCE SHEET · 四问总账');
  txt('question · 问题', X[0], top + 78, { size: 21, fam: F.mono, w: 700, c: C.dim, a: a0 });
  txt('model-internal witness', X[1], top + 78, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: a0 });
  txt('zero-fit derivation', X[2], top + 78, { size: 21, fam: F.mono, w: 700, c: C.open, a: Q(S, 1, 'Derived', 0.5) });
  const rows = [
    ['[1] couplings & electroweak', '规范交汇与电弱尺度'], ['[2] chiral three generations', '手征三代'],
    ['[3] flavour, mixing & proton', '味谱、混合与质子'], ['[4] gravity & dark energy', '引力与暗能量']];
  rows.forEach(([en, zh], i) => {
    const y = top + 140 + i * 88, a = a0 * clamp((u - 0.3 - i * 0.35) / 0.4);
    line(X[0], y - 44, 1720, y - 44, C.dim, a * 0.4, 1);
    txt(en, X[0], y, { size: 25, fam: F.mono, w: 700, c: C.white, a });
    txt(zh, X[0], y + 28, { size: 18, fam: F.zh, w: 700, c: C.dim, a });
    const aw = clamp((u - phraseAt(S, 0, 'four model-internal') - i * 0.3) / 0.4);
    txt('✓ witness, reproducible', X[1], y + 8, { size: 25, fam: F.mono, w: 700, c: C.cyan, a: aw });
    const ao = clamp((u - phraseAt(S, 1, 'with nothing fitted') - i * 0.25) / 0.4);
    txt('OPEN', X[2], y + 8, { size: 26, fam: F.orb, w: 900, c: C.open, a: ao, ls: 3 });
  });
  const yT = top + 500;
  txt('4/4', X[1], yT, { size: 54, fam: F.orb, w: 900, c: C.cyan, a: Q(S, 0, 'every one reproducible', 0.6) });
  stamp('0/4', X[2] + 90, yT - 16, Q(S, 1, 'zero of four', 0.6), C.open, 52, -0.06);
  txt('5 tensions · 4 open problems · 五重张力 · 四个开放问题', W / 2, 820, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: at(S, 2, 0.6) });
};

SCENES.a5_ask = S => {
  const u = S.u;
  A5.rail(S);
  const a0 = clamp(u / 0.6);
  txt('4/4', W / 2 - 220, 430, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: a0, ab: 2 });
  txt('witnesses · 见证', W / 2 - 220, 490, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a0 });
  txt('0/4', W / 2 + 220, 430, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.open, a: Q(S, 0, 'zero derivations', 0.6), ab: 2 });
  txt('derivations · 推导', W / 2 + 220, 490, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.open, a: Q(S, 0, 'zero derivations', 0.6) });
  SPINE.ask(S, 1, 'Four witnesses, zero derivations: why is that worth a book?', '四个见证、零个推导：这为什么值得一本书？');
};
/* ==== ACT:a5:END ==== */

/* ==== ACT:a6:BEGIN ==== */
/* ---- a6 · Coda · Why a sharp no matters · 终章 · 为什么清晰的否定有力量 ----
   Summary (en): The coda answers the question handed over by Volume V: four model witnesses and zero zero-fit
   derivations are worth a book because a sharp no draws a map. Six walls proved in Volumes II–V stand on that map
   (r ≤ 189, rank five, the monotone quarter, 105 windings, memory rank 38 → 19, the forced seventh code), and four
   gates, all still red OPEN, are what any future master connection must pass with zero fitting. The trilogy map
   places the book after ORTHO//QUANTUM and OMEGA//MATH, and a receipt lists the seven parts with their honest
   tiers before the book's maxim and the closing card.
   Summary (zh): 终章回答第五卷交来的问题：四个模型内见证、零个零拟合推导之所以值得一本书，是因为清晰的否定能画出
   地图。第二至五卷证明的六道墙立在这张地图上（r ≤ 189、秩五门户、单调权四分之一、105 圈、记忆秩 38 → 19、第七项
   强迫码），未来任何主联络都必须零拟合地通过四道门禁，它们至今全是红色开放问题。三部曲导图把本书放在
   《量子计算的几何直觉》与《OMEGA 数学》之后；收据逐部列出七个部分的诚实证据层级，随后是全书格言与片尾卡。

   Scenes and what each one rests on (source: coda.md, zh authoritative; ch15 §15.1 for the verdict):
   a6_title   · the score board: 4 questions × (model witness, zero-fit derivation). The 4/4 model-internal witnesses
                are MODEL (violet, argued: they use chosen field tables, thresholds or calibrations, ch15 §15.1); the
                0/4 zero-fit derivations are the open problems prob-ou-q1 … q4 (red, open). Counts are computed from
                A6.QS and re-checked in FILM.init.
   a6_walls   · the six sharp obstructions of coda §sharp-boundaries, numbers quoted verbatim from coda.md (which cites
                the chapters' replay certificates and written arguments): ARGUED / NUM, never green. The gap
                32071996606 − 32071992476 = 4130 and the 35-bit range of both codes are computed here and re-checked.
   a6_gates   · the four zero-fit acceptance gates of coda §four-gates; every gate is an open problem (red OPEN,
                ch15 prob-ou-q1 … q4). The numbers on each gate are quoted from coda.md.
   a6_trilogy · the trilogy map of coda §trilogy-map (course, hull, chart): the book's own metaphor, ARGUED.
   a6_receipt · seven parts, their evidence tiers (prelude: the contract, ARGUED; Volumes I–V: LEAN ✓ anchors,
                certificates, models, open cores, per the coda's five-volume table; coda: 4/4 MODEL, 0/4 OPEN). Each
                green chip names one frozen declaration of film.json "lean" cited by that volume (triad_assoc ch01,
                rational_schur_min ch05, all_degree_peter_weyl_orthonormal ch07, d1_d0 ch10,
                band_le_positive_fourier ch12); the chip says only that this volume has that kernel-checked anchor.
                The maxim is quoted from the prelude (README.md), ARGUED.
   a6_close   · closingCard: book, film title, the Lean list and the pinned commit. */
const A6 = (() => {
  /* the four questions (ch15 §15.1 rows [1]–[4]) */
  const QS = [
    { tag: 'Q1', en: 'gauge crossing & EW scale', zh: '规范交汇与电弱尺度' },
    { tag: 'Q2', en: 'three chiral generations', zh: '手征三代与四维格点' },
    { tag: 'Q3', en: 'flavour, mixing & proton', zh: '味谱、混合与质子' },
    { tag: 'Q4', en: 'gravity & dark energy', zh: '四维引力与暗能量' }
  ];
  /* per question: model witness present (true), zero-fit derivation done (false) — ch15 verdict */
  const WIT = [true, true, true, true], DER = [false, false, false, false];
  const CODE7 = 32071996606, CODE_T7 = 32071992476;
  /* coda §sharp-boundaries item 5: the staircase of minimal auxiliary ranks as D opens (29–31 at D = 56 drawn as 31) */
  const STAIR = [38, 31, 26, 25, 24, 23, 21, 20, 19];
  /* the six walls, in the order narrated; key = the phrase of the line that raises it */
  const WALLS = [
    { ch: 'CH05', big: 'r ≤ 189', en: 'one positive trace: no crossing', zh: '单正谱迹：交汇严格无解', det: 'needs 57.08588109… · ceiling 57.034704', line: 1, key: '189' },
    { ch: 'CH06', big: 'd ≤ 4', en: 'neutral portal fails · d ≥ 5', zh: '中性门户至少要秩五', det: 'pole-mass sensitivity > 1.9396 × 10²¹', line: 1, key: 'rank five' },
    { ch: 'CH13', big: '> 1/4', en: 'monotone weights undercut', zh: '单调绕数权全阶被排斥', det: '≥ 13/19200 off the monotone cone', line: 2, key: 'a quarter' },
    { ch: 'CH13', big: '105', en: 'windings for one fixed vacuum', zh: '同一组固定权重的全局真空', det: 'four branches excluded through 104', line: 2, key: 'a hundred and five' },
    { ch: 'CH14', big: '38 → 19', en: 'auxiliary memory rank', zh: '三时钟辅助记忆秩阶梯', det: '', line: 3, key: 'nineteen' },
    { ch: 'CH12', big: String(CODE7), en: 'the forced seventh code', zh: '第七项 35 位强迫码', det: '', line: 3, key: 'seventh code' }
  ];
  /* the four gates of coda §four-gates; the line of a6_gates that names each */
  const GATES = [
    { en: ['GATE 1', 'GAUGE & HIGGS'], zh: '门禁一 · 规范与希格斯', nums: ['r ≤ 189 · past 3.9Q', 'spread > 2.936 · 10²¹ tuning'] },
    { en: ['GATE 2', 'CHIRAL · FLAVOUR · PROTON'], zh: '门禁二 · 手征、味谱与质子', nums: ['‖[T,X]‖ > 0.0414 · 42 loops', 'ΔB ∈ 3ℤ'] },
    { en: ['GATE 3', 'GRAVITY & VACUUM'], zh: '门禁三 · 引力与真空能', nums: ['low curvature < 2⁻⁴¹⁰⁰⁰⁰ⁿ', 'Newton’s G · dark energy'] },
    { en: ['GATE 4', 'SELECTION'], zh: '门禁四 · 选权与辨识', nums: ['> 1/4 · 105 · 100-dim', '35-bit · 38 → 19'] }
  ];
  const BOOKS = [
    { code: 'ORTHO//QUANTUM', zh: '量子计算的几何直觉', en: 'Geometric Intuition of Quantum Computing', role: 'charted the course · posed the four questions', rzh: '定下航向，提出四问', icon: 'course' },
    { code: 'OMEGA//MATH', zh: 'OMEGA 数学', en: 'Omega Math', role: 'forged the hull · zero-axiom rational maths', rzh: '铸成船身：零公理有理数学', icon: 'hull' },
    { code: 'OMEGA//UNIFY', zh: 'OMEGA 统一', en: 'Omega Unification', role: 'into deep water · chart and interval compass', rzh: '驶入深水：海图与区间罗盘', icon: 'chart' }
  ];
  /* the receipt rows: SPINE part index → tiers present and the volume's cited frozen anchor (film.json "lean") */
  const G = 'D5/S3/Quantum/AURICOmega/';
  const ROWS = [
    { tiers: ['argued'], note: 'six-tier evidence contract', nzh: '六层证据契约' },
    { tiers: ['lean', 'num', 'model', 'open'], gid: G + 'OmegaTernionHeap.triad_assoc' },
    { tiers: ['lean', 'num', 'model', 'open'], gid: G + 'OmegaQuadraticAndSchur.rational_schur_min' },
    { tiers: ['lean', 'num', 'model', 'open'], gid: G + 'OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal' },
    { tiers: ['lean', 'num', 'model', 'open'], gid: G + 'OmegaSimplicialExactness.d1_d0' },
    { tiers: ['lean', 'num', 'model', 'open'], gid: 'D5/S3/Fourier/Concentration/CyclicFejerBand.band_le_positive_fourier' },
    { tiers: ['model', 'open'], note: '4/4 witnessed · 0/4 derived', nzh: '四见证 · 零推导' }
  ];
  const TIER = { lean: ['LEAN ✓', 'lean'], num: ['NUM', 'cyan'], model: ['MODEL', 'argued'], argued: ['ARGUED', 'argued'], open: ['OPEN', 'open'] };
  const short = gid => gid.slice(gid.lastIndexOf('.') + 1);
  const count = a => a.filter(Boolean).length;
  /* a faint schematic contour map behind the walls (decoration, not data) */
  function contours(a, t) {
    for (let k = 0; k < 7; k++) {
      const y0 = 230 + k * 85, ph = 0.7 * k + t * 0.05;
      curve(s => [120 + s * 1680, y0 + 26 * Math.sin(s * 6.3 + ph) + 14 * Math.sin(s * 17 + 2 * ph)], 90, C.dim, a * 0.16, 1.2);
    }
  }
  /* a gate: two pillars, a lintel; barred by a red bar while open */
  function gate(cx, y, w, h, a, col, bar) {
    fillBox(cx - w / 2, y, 26, h, col, a * 0.55); fillBox(cx + w / 2 - 26, y, 26, h, col, a * 0.55);
    fillBox(cx - w / 2 - 14, y - 26, w + 28, 26, col, a * 0.75);
    box(cx - w / 2 + 26, y, w - 52, h, col, a * 0.5, 1.2);
    if (bar > 0) {
      fillBox(cx - w / 2 + 26, y + h * 0.5 - 7, (w - 52) * bar, 14, C.open, a * 0.85);
    }
  }
  function tierChip(x, y, kind, a, w = 104) {
    const [s, c] = TIER[kind];
    chip(x + w / 2, y, w, 34, s, C[c], a, 17);
  }
  return { QS, WIT, DER, CODE7, CODE_T7, STAIR, WALLS, GATES, BOOKS, ROWS, TIER, short, count, contours, gate, tierChip };
})();

/* independent re-checks: counts, the seventh-code gap, the staircase, the receipt's citations */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  if (A6.count(A6.WIT) !== 4 || A6.count(A6.DER) !== 0 || A6.QS.length !== 4 || A6.GATES.length !== 4) E.push('a6: score 4/4 · 0/4');
  if (A6.WALLS.length !== 6) E.push('a6: six walls');
  /* the seventh code: both 35-bit (2^34 ≤ code < 2^35), the gap 4130 */
  const lo = Math.pow(2, 34), hi = Math.pow(2, 35);
  [A6.CODE7, A6.CODE_T7].forEach(c => { if (!(c >= lo && c < hi)) E.push('a6: not a 35-bit code ' + c); });
  if (A6.CODE7 - A6.CODE_T7 !== 4130 || String(A6.CODE7) !== '32071996606' || String(A6.CODE_T7) !== '32071992476') E.push('a6: seventh-code gap');
  /* the staircase only steps down, from 38 to 19 */
  const st = A6.STAIR;
  if (st[0] !== 38 || st[st.length - 1] !== 19 || st.some((v, i) => i && v >= st[i - 1])) E.push('a6: memory staircase');
  /* 13/19200 quoted on screen: reduced fraction */
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  if (gcd(13, 19200) !== 1) E.push('a6: 13/19200 not reduced');
  /* every green chip in the receipt is a theorem of film.json "lean"; one per volume I–V */
  const gids = A6.ROWS.filter(r => r.gid).map(r => r.gid);
  if (gids.length !== 5) E.push('a6: five volume anchors');
  gids.forEach(g => { const c = leanCite(g); if (!c || c.kind !== 'theorem') E.push('a6: not a cited theorem: ' + g); });
  if (A6.ROWS.length !== SPINE.PARTS.length) E.push('a6: receipt rows ≠ parts');
});
Object.assign(FILM.speed, { a6_title: 0.02, a6_walls: 0.012, a6_gates: 0.012, a6_trilogy: 0.012, a6_receipt: 0.008, a6_close: 0.008 });

SCENES.a6_title = S => {
  SPINE.title(S, 6, '为什么清晰的否定有力量', 'Why a sharp no matters');
  SPINE.rail(S, 6, at(S, 0, 0.6));
  const a = at(S, 0, 0.8, 0.1) * clamp((S.d - S.u) / 0.5);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'argued'], [2, null, 'open']]);
  const x0 = 150, cw = 390, gap = 23, y0 = 210, ch = 420;
  const w1 = at(S, 1, 0.5), d1 = at(S, 2, 0.5);
  A6.QS.forEach((q, i) => {
    const x = x0 + i * (cw + gap), ai = a * clamp((S.u - lineAt(S, 0).s - 0.3 - i * 0.18) / 0.4);
    panel(x, y0, cw, ch, ai, C.cyan, `${q.tag} · QUESTION ${i + 1}`);
    txt(q.en, x + cw / 2, y0 + 82, { size: 22, fam: F.disp, w: 700, align: 'center', c: C.white, a: ai });
    txt(q.zh, x + cw / 2, y0 + 118, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ai * 0.85 });
    line(x + 24, y0 + 145, x + cw - 24, y0 + 145, C.dim, ai * 0.5, 1);
    /* model witness: violet tick */
    const wa = ai * clamp((S.u - lineAt(S, 1).s - 0.2 - i * 0.2) / 0.4);
    txt('model witness', x + 30, y0 + 200, { size: 20, fam: F.mono, w: 700, c: C.argued, a: ai * (0.35 + 0.65 * w1) });
    txt('模型内见证', x + 30, y0 + 232, { size: 20, fam: F.zh, w: 700, c: C.white, a: ai * (0.35 + 0.65 * w1) * 0.85 });
    chip(x + cw - 70, y0 + 210, 70, 56, '✓', C.argued, wa, 36);
    /* zero-fit derivation: red cross */
    const da = ai * clamp((S.u - lineAt(S, 2).s - 0.2 - i * 0.2) / 0.4);
    txt('zero-fit derivation', x + 30, y0 + 320, { size: 20, fam: F.mono, w: 700, c: C.open, a: ai * (0.35 + 0.65 * d1) });
    txt('零拟合推导', x + 30, y0 + 352, { size: 20, fam: F.zh, w: 700, c: C.white, a: ai * (0.35 + 0.65 * d1) * 0.85 });
    chip(x + cw - 70, y0 + 330, 70, 56, '✗', C.open, da, 36);
  });
  /* the tally */
  const t1 = a * clamp((S.u - lineAt(S, 1).s - 1.2) / 0.5), t2 = a * clamp((S.u - lineAt(S, 2).s - 1.2) / 0.5);
  txt(`${A6.count(A6.WIT)}/4`, 560, 735, { size: 72, fam: F.orb, w: 900, align: 'right', c: C.argued, a: t1, ab: 1.5 });
  txt('model-internal · 模型内见证', 590, 722, { size: 22, fam: F.zh, w: 700, c: C.argued, a: t1 });
  txt(`${A6.count(A6.DER)}/4`, 1250, 735, { size: 72, fam: F.orb, w: 900, align: 'right', c: C.open, a: t2, ab: 1.5 });
  txt('zero-fit · 零拟合推导', 1280, 722, { size: 22, fam: F.zh, w: 700, c: C.open, a: t2 });
};

SCENES.a6_walls = S => {
  SPINE.rail(S, 6, 1);
  badgeQ(S, [[0, null, 'argued'], [3, 'seventh code', 'computed']]);
  const a = clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  A6.contours(a, S.t);
  txt('MAP OF SHARP WALLS · 锐界地图', 140, 192, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: a * at(S, 0, 0.5), ls: 3 });
  txt('ARGUED / NUM · written arguments and replay certificates · 书面论证与复算证书', 1740, 192,
    { size: 18, fam: F.zh, w: 700, align: 'right', c: C.argued, a: a * Q(S, 0, 'Six walls', 0.5) });
  const tw0 = 520, th = 285, gx = 20, gy = 22, x0 = 140, y0 = 212;
  let cur = -1;
  A6.WALLS.forEach((w, i) => { if (S.u >= phraseAt(S, w.line, w.key)) cur = i; });
  A6.WALLS.forEach((w, i) => {
    const p = Q(S, w.line, w.key, 0.5), x = x0 + (i % 3) * (tw0 + gx), y = y0 + Math.floor(i / 3) * (th + gy);
    const slot = a * Q(S, 0, 'Six walls', 0.6) * 0.35;
    if (p <= 0) { box(x, y, tw0, th, C.dim, slot, 1); txt(String(i + 1), x + tw0 / 2, y + th / 2 + 14, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.dim, a: slot }); return; }
    const ai = a * p, col = i === cur ? C.now : C.cyan;
    panel(x, y, tw0, th, ai, col, `WALL ${i + 1} · ${w.ch}`);
    /* the wall itself: a thick bar at the left edge */
    fillBox(x + 22, y + 52, 14, th - 76, col, ai * 0.8);
    const tx = x + 60;
    txt(w.big, tx, y + 108, { size: w.big.length > 8 ? 44 : 56, fam: F.math, w: 900, c: C.white, a: ai, ab: i === cur ? 1.2 : 0 });
    txt(w.en, tx, y + 152, { size: 21, fam: F.disp, w: 700, c: col, a: ai });
    txt(w.zh, tx, y + 186, { size: 21, fam: F.zh, w: 700, c: C.white, a: ai * 0.85 });
    if (w.det) txt(w.det, tx, y + 238, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ai });
    if (i === 4) {
      /* the staircase of minimal auxiliary ranks, 38 down to 19 (29–31 at D = 56 drawn at its upper end) */
      const bx = tx, by = y + 262, bw = 46;
      A6.STAIR.forEach((v, k) => {
        const h = (v - 15) * 1.5;
        fillBox(bx + k * bw, by - h, bw - 6, h, col, ai * 0.55);
        txt(k === 1 ? '29–31' : String(v), bx + k * bw + (bw - 6) / 2, by - h - 6, { size: 14, fam: F.mono, w: 700, align: 'center', c: C.white, a: ai * 0.85 });
      });
    }
    if (i === 5) {
      txt(`≠ T₇ code ${A6.CODE_T7}`, tx, y + 230, { size: 20, fam: F.mono, w: 700, c: C.white, a: ai * 0.85 });
      txt(`gap ${A6.CODE7 - A6.CODE_T7} · 35-bit dyadic codes`, tx, y + 262, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ai });
    }
  });
};

SCENES.a6_gates = S => {
  SPINE.rail(S, 6, 1);
  badgeQ(S, [[0, null, 'open']]);
  const a = clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  txt('FOUR ZERO-FIT GATES · 零拟合四重门禁', W / 2, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * at(S, 0, 0.5), ls: 4 });
  let cur = -1;
  for (let k = 1; k <= 4; k++) if (S.u >= lineAt(S, k).s - 0.1) cur = k - 1;
  A6.GATES.forEach((g, i) => {
    const cx = 360 + i * 400, gy = 290, gw = 330, gh = 250;
    const ai = a * clamp((S.u - lineAt(S, 0).s - 0.2 - i * 0.2) / 0.5);
    const on = i === cur, col = on ? C.now : C.cyan;
    A6.gate(cx, gy, gw, gh, ai, col, clamp((S.u - lineAt(S, 0).s - 1.0 - i * 0.2) / 0.5));
    chip(cx, gy + gh * 0.5 - 50, 120, 38, 'OPEN', C.open, ai * clamp((S.u - lineAt(S, 0).s - 1.2 - i * 0.2) / 0.5), 20);
    txt(g.en[0], cx, gy + gh + 50, { size: 24, fam: F.orb, w: 900, align: 'center', c: col, a: ai, ls: 3 });
    txt(g.en[1], cx, gy + gh + 84, { size: 19, fam: F.mono, w: 700, align: 'center', c: col, a: ai });
    txt(g.zh, cx, gy + gh + 118, { size: 21, fam: F.zh, w: 700, align: 'center', c: C.white, a: ai * 0.85 });
    const na = ai * (cur >= i ? 1 : 0.3);
    g.nums.forEach((n, k) => txt(n, cx, gy + gh + 168 + k * 32, { size: 19, fam: F.math, w: 700, align: 'center', c: C.white, a: na }));
  });
  txt('all four: refined open problems of chapter 15 · 四道门禁均为第十五章的开放问题', W / 2, 822,
    { size: 18, fam: F.zh, w: 700, align: 'center', c: C.open, a: a * at(S, 4, 0.6, 1.0) });
};

SCENES.a6_trilogy = S => {
  SPINE.rail(S, 6, 1);
  badgeQ(S, [[0, null, 'argued']]);
  const a = clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const keys = [[0, 'Ortho Quantum'], [1, 'Omega Math'], [2, 'Omega Unify']];
  A6.BOOKS.forEach((b, i) => {
    const x = 140 + i * 560, y = 210, w = 520, h = 600;
    const p = Q(S, keys[i][0], keys[i][1], 0.6), ai = a * (0.25 + 0.75 * p), col = i === 2 ? C.now : C.cyan;
    panel(x, y, w, h, ai, col, `BOOK ${i + 1} OF 3 · 三部曲之${'一二三'[i]}`);
    txt(b.code, x + w / 2, y + 82, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: ai, ls: 3 });
    txt(`《${b.zh}》`, x + w / 2, y + 128, { size: 28, fam: F.zh, w: 900, align: 'center', c: C.white, a: ai });
    txt(b.en, x + w / 2, y + 164, { size: 19, fam: F.disp, w: 700, align: 'center', c: C.white, a: ai * 0.8 });
    /* the icon */
    const cx = x + w / 2, cy = y + 330, ia = ai * p;
    if (b.icon === 'course') {
      ring(cx, cy, 95, C.cyan, ia * 0.8, 2);
      for (let k = 0; k < 8; k++) { const t = k * TAU / 8; line(cx + 80 * Math.cos(t), cy + 80 * Math.sin(t), cx + 95 * Math.cos(t), cy + 95 * Math.sin(t), C.cyan, ia, 2); }
      arrow(cx - 60, cy + 60, cx + 70, cy - 70, C.now, ia, 3.5);
      dashed(cx + 70, cy - 70, cx + 200, cy - 150, C.cyan, ia * 0.7, 2);
    } else if (b.icon === 'hull') {
      curve(s => [cx - 170 + 340 * s, cy - 20 + 90 * Math.sin(Math.PI * s)], 60, C.cyan, ia, 3.5);
      line(cx - 170, cy - 20, cx + 170, cy - 20, C.cyan, ia, 3.5);
      for (let k = 1; k < 6; k++) { const s = k / 6; line(cx - 170 + 340 * s, cy - 20, cx - 170 + 340 * s, cy - 20 + 90 * Math.sin(Math.PI * s), C.cyan, ia * 0.6, 1.5); }
      line(cx, cy - 20, cx, cy - 130, C.vio || C.argued, ia, 3);
    } else {
      for (let k = 0; k <= 6; k++) { line(cx - 180 + k * 60, cy - 110, cx - 180 + k * 60, cy + 110, C.dim, ia * 0.4, 1); }
      for (let k = 0; k <= 4; k++) { line(cx - 180, cy - 110 + k * 55, cx + 180, cy - 110 + k * 55, C.dim, ia * 0.4, 1); }
      for (let k = 0; k < 6; k++) {
        const rx = cx - 150 + 300 * rnd(k, 31), ry = cy - 90 + 180 * rnd(k, 37);
        line(rx - 9, ry - 9, rx + 9, ry + 9, C.mag, ia, 3); line(rx + 9, ry - 9, rx - 9, ry + 9, C.mag, ia, 3);
      }
      curve(s => [cx - 180 + 360 * s, cy + 70 * Math.sin(s * 5.2) * (1 - s * 0.3)], 60, C.now, ia, 3);
    }
    txt(b.role, x + w / 2, y + 520, { size: 20, fam: F.disp, w: 700, align: 'center', c: col, a: ai * p });
    txt(b.rzh, x + w / 2, y + 556, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ai * p * 0.9 });
    if (i < 2) arrow(x + w + 6, y + 330, x + w + 36, y + 330, C.cyan, a * Q(S, keys[i + 1][0], keys[i + 1][1], 0.5), 3);
  });
};

SCENES.a6_receipt = S => {
  SPINE.rail(S, 6, 1);
  badgeQ(S, [[0, null, 'lean'], [1, 'Cyan', 'computed'], [1, 'violet', 'argued'], [1, 'red', 'open'], [3, null, 'argued']]);
  const a = clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.6);
  txt('RECEIPT · 收据', 150, 196, { size: 20, fam: F.mono, w: 700, c: C.cyan, a, ls: 6 });
  const show = {
    lean: Q(S, 0, 'green only', 0.5), num: Q(S, 1, 'Cyan', 0.5), model: Q(S, 1, 'violet', 0.5),
    argued: Q(S, 1, 'violet', 0.5), open: Q(S, 1, 'red', 0.5)
  };
  const hl = at(S, 2, 0.5);
  A6.ROWS.forEach((r, i) => {
    const y = 238 + i * 56, p = SPINE.PARTS[i], ra = a * clamp((S.u - 0.2 - i * 0.12) / 0.4);
    const coda = i === 6, col = coda && hl > 0 ? C.now : C.cyan;
    if (coda) box(136, y - 30, 1648, 50, C.now, ra * hl, 2);
    dot(160, y - 6, 7, coda ? 'g' : 'c', ra);
    txt(p.tag, 182, y, { size: 19, fam: F.mono, w: 700, c: col, a: ra, ls: 1 });
    txt(p.zh, 334, y, { size: 20, fam: F.zh, w: 700, c: C.white, a: ra * 0.85 });
    txt(p.key_en, 424, y, { size: 19, fam: F.disp, w: 700, c: C.white, a: ra * 0.8 });
    r.tiers.forEach((k, j) => A6.tierChip(840 + j * 112, y - 6, k, ra * show[k]));
    const nx = 1300;
    if (r.gid) txt(A6.short(r.gid), nx, y, { size: 18, fam: F.mono, w: 700, c: C.lean, a: ra * show.lean });
    else txt(`${r.note} · ${r.nzh}`, nx, y, { size: 18, fam: F.zh, w: 700, c: coda ? C.white : C.argued, a: ra * (coda ? hl : show.argued) });
  });
  /* the maxim, quoted from the prelude */
  const m = Q(S, 3, 'A sharp no', 0.8), m2 = Q(S, 3, 'blurry close enough', 0.8);
  txt('A sharp “no” is closer to a law of nature', W / 2, 680, { size: 46, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * m });
  txt('than a blurry “close enough.”', W / 2, 738, { size: 46, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * m2, ab: 1.5 });
  txt('清晰的“不行”比含混的“差不多”更接近自然律。', W / 2, 792, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * m2 * 0.85 });
  txt('ARGUED · the book’s maxim · 全书格言', W / 2, 830, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.argued, a: a * m2 * 0.9, ls: 3 });
};

SCENES.a6_close = S => {
  SPINE.rail(S, 6, 1);
  if (DATA.lean.length) badgeQ(S, [[0, null, 'lean']]);
  /* the end card of the long film: the book, the film, then every cited theorem in two columns (the engine's
     closingCard stacks one per row, which does not fit a long film's list), sized to fit, and the pinned commit */
  const a = clamp((S.u - 0.2) / 1.0) * clamp((S.d - S.u) / 1.2);
  if (a <= 0) return;
  const b = DATA.book, f = DATA.film, cx = W / 2, cy = 250;
  drawHyper(CUBE4, [[0, 3, S.t * 0.21], [1, 2, S.t * 0.13], [2, 3, S.t * 0.17]], { scale: 1.0, a: 0.3 * a, cx, cy: cy - 30, camZ: 7, lw: 1.4, dots: false });
  txt(b.code, cx, cy - 60, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
  txt(b.title.zh, cx, cy + 20, { size: 66, fam: F.zh, w: 900, align: 'center', c: C.white, a, ab: 3 });
  txt(b.title.en, cx, cy + 80, { size: 34, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * 0.92, ls: 2 });
  const p2 = clamp((S.u - 1.0) / 0.8) * a;
  txt(`LONG FILM · ${f.title.toUpperCase()}`, cx, cy + 135, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p2, ls: 3 });
  txt(f.title_zh, cx, cy + 172, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: p2 * 0.85 });
  const p3 = clamp((S.u - 1.8) / 0.8) * a;
  const rows = DATA.lean.filter(z => z.kind === 'theorem'), half = Math.ceil(rows.length / 2);
  const head = STR.en.lean || 'LEAN ✓', colX = [SAFE.x0 + 10, W / 2 + 20], colW = W / 2 - SAFE.x0 - 40;
  let size = 15;
  const widest = Math.max(1, ...rows.map(r => tw(r.label || r.name, size, F.mono, 700)));
  const wh0 = tw(head, size * 0.72, F.mono, 700, 1) + 14;
  if (wh0 + 10 + widest > colW) size *= (colW - wh0 - 10) / widest;
  const gap = Math.max(22, size * 1.8), y0 = cy + 240;
  rows.forEach((r, i) => {
    const x = colX[i < half ? 0 : 1], y = y0 + (i % half) * gap, wh = tw(head, size * 0.72, F.mono, 700, 1) + 14;
    fillBox(x, y - size * 0.95, wh, size * 1.25, C.lean, p3 * 0.95);
    txt(head, x + 7, y - size * 0.12, { size: size * 0.72, fam: F.mono, w: 700, c: C.bg, a: p3, ls: 1 });
    txt(r.label || r.name, x + wh + 10, y, { size, fam: F.mono, w: 700, c: C.lean, a: p3 });
  });
  const pin = DATA.pin || {};
  if (pin.commit) txt(`github.com/${pin.repo} @ ${pin.commit.slice(0, 12)}`, cx, y0 + half * gap + 18, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p3, ls: 1 });
};
/* ==== ACT:a6:END ==== */

const LONG_POSTER = { en: 'FIVE VOLUMES, A PRELUDE AND A CODA', zh: '前言、五卷与终章' };

/* ---- poster: the seven parts of the long film as one road, one bead per act ---- */
FILM.poster = () => {
  const sc = TL.scenes[0], t = 23.7, P = SPINE.PARTS, n = P.length;
  background(t, sc, 0, 6);
  drawHyper(CUBE5, [[0, 4, t * 0.21], [1, 3, t * 0.17], [2, 4, t * 0.13]], { scale: 1.6, a: 0.16, cx: W / 2, cy: 470, camZ: 7, lw: 1.2, dots: false });
  grid(t, 0.45);
  txt(DATA.film.title_zh, W / 2, 270, { size: 112, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt(DATA.film.title.toUpperCase(), W / 2, 380, { size: 58, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 5, ls: 6 });
  bloom(0.6);
  txt(`${LONG_POSTER.en} · ${LONG_POSTER.zh}`, W / 2, 462, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 5 });
  /* the road: every act a bead on one line, its tag above, its key below (two staggered rows) */
  const x0 = 290, x1 = W - 290, y = 640, step = (x1 - x0) / (n - 1);
  line(x0, y, x1, y, C.cyan, 0.55, 2);
  for (let i = 0; i < n; i++) {
    const x = x0 + i * step;
    ring(x, y, 15, C.cyan, 0.9, 2); dot(x, y, 9, 'c', 1);
    txt(P[i].tag, x, y - 34, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: 0.85, ls: 1.5 });
    const ky = y + (i % 2 ? 92 : 52);
    if (i % 2) line(x, y + 18, x, ky - 22, C.cyan, 0.3, 1);
    txt(P[i].key_zh, x, ky, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.92 });
  }
  txt('4/4 MODEL WITNESSES · 0/4 ZERO-FIT DERIVATIONS', W / 2, 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.argued, ls: 4 });
  txt(`${DATA.book.code} · LONG FILM`, W / 2, 870, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, 711, 0, sc);
  post(0);
};
