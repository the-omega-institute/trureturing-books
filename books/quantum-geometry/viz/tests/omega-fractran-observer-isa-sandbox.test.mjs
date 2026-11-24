import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, overflowX, cjkLeftovers, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'omega-fractran-observer-isa-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const CHAPTER = 'ch38-s14-omega-fractran-observer-rational-isa.html';
const CHAPTER_MD = 'ch38-s14-omega-fractran-observer-rational-isa.md';
const ANCHOR = 'sec-ch38-omega-fractran-observer-rational-isa';
// scene, view, the declared still (a value of the rail) and the regime of the still of every card
const CARDS = {
  'prime-orthogonal-register-adder': { scene: 'adder', cam: 'panorama', still: 3, regime: 'halt' },
  'conway-multiplier-18-beat-closure': { scene: 'mult', cam: 'panorama', still: 18, regime: 'halt' },
  'primegame-self-crystallization-and-lemma-shortcut': { scene: 'prime', cam: 'panorama', still: 710, regime: 'hit' },
  'nonabelian-p5-lps-word-order-stack': { scene: 'rotor', cam: 'face', still: 2, regime: 'halt' },
  'three-paradigm-isa-and-zero-tear-audit': { scene: 'audit', cam: 'face', still: 710, regime: 'done' }
};
const IDS = Object.keys(CARDS);
const [ADDER, MULT, PRIME, ROTOR, AUDIT] = IDS;
const DEFAULT = ADDER;
// the sixteen frozen theorems of thm-ch38-omega-fractran-anchors, in the order of the theorem box
const GIDS = [
  'D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals',
  'D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification',
  'D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes',
  'D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations',
  'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  'D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence',
  'D5/S3/Axis/PrimeAxisEscape.prime_axis_escape',
  'D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division',
  'D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct',
  'D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion',
  'D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction',
  'D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative',
  'D5/S0/Computability/CodeFixedPoint.code_fixed_point',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- independent mathematics, written here and never calling the page ----------
   The scalar machine runs on exponent ledgers: a rule is the signed vector e(a) − e(b), and it fires when the ledger
   plus that vector stays ≥ 0 everywhere (the page divides big integers instead). Quaternions multiply through the
   4 × 4 matrix of the left factor (the page writes the Hamilton product out). */
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
function vec(n) {
  let m = BigInt(n);
  const e = PRIMES.map((p) => {
    let k = 0;
    while (m % BigInt(p) === 0n) {
      m /= BigInt(p);
      k++;
    }
    return k;
  });
  if (m !== 1n) throw new Error(`${n} has a prime outside the crystal`);
  return e;
}
const delta = (s) => {
  const [a, b = '1'] = s.split('/');
  const ea = vec(a),
    eb = vec(b);
  return ea.map((x, i) => x - eb[i]);
};
const valueOf = (e) => e.reduce((acc, x, i) => acc * BigInt(PRIMES[i]) ** BigInt(x), 1n);
function fractran(rules, N0, cap) {
  const D = rules.map(delta),
    states = [vec(N0)],
    fired = [];
  let e = states[0];
  while (fired.length < cap) {
    const i = D.findIndex((d) => d.every((x, k) => e[k] + x >= 0));
    if (i < 0) return { states, fired, halted: true, D };
    e = e.map((x, k) => x + D[i][k]);
    fired.push(i);
    states.push(e);
  }
  return { states, fired, halted: D.findIndex((d) => d.every((x, k) => e[k] + x >= 0)) < 0, D };
}
const ADDER_RULES = ['3/2'];
const MULT_RULES = ['455/33', '11/13', '1/11', '3/7', '11/2', '1/3'];
const PG_RULES = ['17/91', '78/85', '19/51', '23/38', '29/33', '77/29', '95/23', '77/19', '1/17', '11/13', '13/11', '15/2', '1/7', '55/1'];
const FLAGS = [11, 13, 17, 19, 23, 29];
const flagIdx = (flags) => flags.map((f) => PRIMES.indexOf(f));
const flagged = (e, flags) => flagIdx(flags).some((i) => e[i] > 0);
const adder = fractran(ADDER_RULES, 72n, 100);
const mult = fractran(MULT_RULES, 36n, 1000);
const pgLong = fractran(PG_RULES, 2n, 2375);
const pg = { states: pgLong.states.slice(0, 711), fired: pgLong.fired.slice(0, 710), D: pgLong.D };
const HITS = pgLong.states.map((e, beat) => ({ e, beat })).filter(({ e }) => e[0] >= 2 && e.slice(1).every((x) => x === 0)).map(({ e, beat }) => ({ beat, p: e[0] }));
const PG_FLAGS = pg.states.slice(1).filter((e) => flagged(e, FLAGS)).length;
const MULT_FLAGS = mult.states.slice(1).filter((e) => flagged(e, [11, 13])).length;
/** The lemmas, on ledgers: A merges a beat whose rule touches a flag with the next when their sum has no flag; B merges
    equal neighbours. */
function foldCounts(run, flags) {
  const F = flagIdx(flags),
    touches = (d) => F.some((i) => d[i] !== 0);
  const A = [];
  for (let i = 0; i < run.fired.length; ) {
    const d = run.D[run.fired[i]];
    if (i + 1 < run.fired.length) {
      const sum = d.map((x, k) => x + run.D[run.fired[i + 1]][k]);
      if (touches(d) && !touches(sum)) {
        A.push(sum);
        i += 2;
        continue;
      }
    }
    A.push(d);
    i++;
  }
  const B = A.filter((d, k) => k === 0 || !same(d, A[k - 1]));
  return { A: A.length, B: B.length };
}
const FOLDS = foldCounts(pg, FLAGS);
const leftM = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const qm = (a, b) => leftM(a).map((row) => row.reduce((s, v, i) => s + v * b[i], 0) + 0);
const conjQ = ([w, x, y, z]) => [w, -x + 0, -y + 0, -z + 0];
const GEN = { '+x': [1, 2, 0, 0], '-x': [1, -2, 0, 0], '+y': [1, 0, 2, 0], '-y': [1, 0, -2, 0], '+z': [1, 0, 0, 2], '-z': [1, 0, 0, -2] };
const INV = { '+x': '-x', '-x': '+x', '+y': '-y', '-y': '+y', '+z': '-z', '-z': '+z' };
const PSI_XY = qm(GEN['+x'], GEN['+y']),
  PSI_YX = qm(GEN['+y'], GEN['+x']);
/** Pop a word with the gates Q₁ = π̄_y/5, Q₂ = π̄_x/5 in an attention order: [fired, torn five-fold candidates]. */
function pops(psi, attn) {
  const list = attn === 'Q2' ? [['Q2', '+x'], ['Q1', '+y']] : [['Q1', '+y'], ['Q2', '+x']],
    out = [];
  for (let k = 0; k < 6; k++) {
    const torn = [];
    let next = null;
    for (const [q, g] of list) {
      const c5 = qm(psi, conjQ(GEN[g]));
      if (c5.every((v) => v % 5 === 0)) {
        next = c5.map((v) => v / 5 + 0);
        out.push({ fired: q, torn, to: next });
        break;
      }
      torn.push({ q, c5 });
    }
    if (!next) return out;
    psi = next;
  }
  return out;
}
function reducedWords(n) {
  let layer = [[]];
  const out = [];
  for (let k = 1; k <= n; k++) {
    layer = layer.flatMap((w) => Object.keys(GEN).filter((g) => !w.length || INV[w[w.length - 1]] !== g).map((g) => [...w, g]));
    out.push(...layer);
  }
  return out;
}
const WORDS4 = reducedWords(4);
const stereo = (q) => {
  const n = Math.hypot(...q),
    k = 1 / (n + q[0]);
  return [q[1] * k, q[2] * k, q[3] * k];
};
const gcdB = (a, b) => (b ? gcdB(b, a % b) : a < 0n ? -a : a);
const fracStr = (p, q) => {
  const g = gcdB(BigInt(p), BigInt(q)),
    [a, b] = [BigInt(p) / g, BigInt(q) / g];
  return `${a}`.replace('-', '−') + (b === 1n ? '' : `/${b}`);
};
const tupleN = (t) => `(${t.map((x) => `${x}`.replace('-', '−')).join(', ')})`;
const fifths = (c5) => `(${c5.map((v) => fracStr(v, 5)).join(', ')})`;
// the exact divider at the word width of the first 710 states, and the guard tests of those beats
const WIDTH = Math.max(...pg.states.map((e) => valueOf(e).toString(2).length));
const PER_TEST = 6 * WIDTH * WIDTH + 18 * WIDTH + 6;
const TESTS = pg.fired.reduce((s, r) => s + r + 1, 0);
// ∏ of the ten primes + 1 and its least prime factor
const ESCAPE = PRIMES.reduce((a, p) => a * BigInt(p), 1n) + 1n;
let LEAST = 2n;
while (ESCAPE % LEAST !== 0n) LEAST++;

const T = await session();
const { page, check } = T;

/* ---------- the independent mathematics on its own ---------- */
check('math: 3/2 carries 72 → 108 → 162 → 243 = 3⁵ in three beats and halts', same(adder.states.map((e) => String(valueOf(e))), ['72', '108', '162', '243']) && adder.halted);
check('math: the multiplier takes 36 = 2²·3² to 625 = 5⁴ in 18 beats and halts', mult.fired.length === 18 && valueOf(mult.states[18]) === 625n && mult.halted);
check('math: PRIMEGAME from 2 meets pure powers of 2 at beats 19, 69, 281, 710, 2375 with exponents 2, 3, 5, 7, 11', same(HITS, [{ beat: 19, p: 2 }, { beat: 69, p: 3 }, { beat: 281, p: 5 }, { beat: 710, p: 7 }, { beat: 2375, p: 11 }]));
check('math: the lemmas fold 710 beats into 440 and 262 steps', FOLDS.A === 440 && FOLDS.B === 262, JSON.stringify(FOLDS));
check('math: Ψ_XY = (1, 2, 2, 4), Ψ_YX = (1, 2, 2, −4), both of squared norm 25', same(PSI_XY, [1, 2, 2, 4]) && same(PSI_YX, [1, 2, 2, -4]) && PSI_XY.reduce((s, x) => s + x * x, 0) === 25 && PSI_YX.reduce((s, x) => s + x * x, 0) === 25);
check('math: Ψ_YX · Q₁ = (1, −6/5, 0, −8/5) ∉ ℤ⁴ and Ψ_XY · Q₁ = (1, 2, 0, 0)', same(qm(PSI_YX, conjQ(GEN['+y'])), [5, -6, 0, -8]) && same(qm(PSI_XY, conjQ(GEN['+y'])).map((v) => v / 5), [1, 2, 0, 0]));

/* ---------- the shared gate ---------- */
// stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion, lit solid
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources: contract, colour, words ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
// forbidden words are kept as code points so this suite itself carries no such identifier
const forbidden = [
  [99, 108, 97, 117, 100, 101],
  [111, 112, 117, 115],
  [103, 101, 109, 105, 110, 105],
  [99, 111, 100, 101, 120],
  [103, 112, 116],
  [108, 108, 109],
  [97, 103, 101, 110, 116],
  [97, 103, 101, 110, 116, 115],
  [97, 110, 116, 104, 114, 111, 112, 105, 99],
  [111, 112, 101, 110, 97, 105]
].map((c) => String.fromCharCode(...c));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')})\\b`, 'i');
for (const [name, text] of [...Object.entries(sources), ['the test suite', suite]]) {
  const hit = text.match(identifiers);
  check(`words: ${name} names no model, tool or automation identifier`, !hit, hit ? hit[0] : '');
}
const html = sources['index.html'];
check('contract: only theme.css, style.css, shell.js, kit.js and main.js are loaded, main.js at the bottom', same([...html.matchAll(/<(?:link rel="stylesheet"|script) (?:href|src)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !/^https:/.test(u)), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js']) && /<script src="main\.js"><\/script>\s*<\/body>/.test(html));
const literal = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
check('colour: no literal colour in the page, its script or its style', !Object.values(sources).some((t) => literal.test(t.replace(/&#\d+;/g, ''))));
const red = /--red|--warn|--tr-warn|\.lean\.open|lean open|sw wn|P\.warn|P\.red|palette\.warn|\bOPEN\b/;
check('colour: no red anywhere: no --warn token, no .lean.open box, no OPEN badge, no wn swatch', !Object.values(sources).some((t) => red.test(t)), Object.entries(sources).filter(([, t]) => red.test(t)).map(([n, t]) => `${n}: ${t.match(red)[0]}`).join(' | '));
check('contract: the page never writes data-tr-palette', !/trPalette|data-tr-palette/.test(sources['main.js'] + sources['style.css']));
check('contract: the style does not override the grid of .app.lab', !/\.app\.lab\s*\{[^}]*grid-template-columns/.test(sources['style.css']));
check('contract: the crumb keeps href="../" in the source and names Chapter 38, §38.14', /<a class="crumb" href="\.\.\/" id="crumb" data-chapter-zh="\.\.\/\.\.\/zh\/ch38-s14-omega-fractran-observer-rational-isa\.html" data-chapter-en="\.\.\/\.\.\/en\/ch38-s14-omega-fractran-observer-rational-isa\.html"><span class="zh">◂ 第 38 章 · §38\.14<\/span><span class="en">◂ Ch\. 38 · §38\.14<\/span><\/a>/.test(html));
/* ---------- the table of contents and Appendix A of both editions ---------- */
for (const lang of ['zh', 'en']) {
  const edition = path.join(ROOT, 'books', BOOK, lang);
  const summary = fs.readFileSync(path.join(edition, 'SUMMARY.md'), 'utf8');
  const links = summary.split('\n').filter((line) => line.includes(`](${CHAPTER_MD}`));
  check(`${lang} SUMMARY.md: §38.14 links exactly once to the chapter`,
    links.length === 1 && links[0].endsWith(`](${CHAPTER_MD})`) && links[0].trimStart().startsWith('- [38.14 '),
    JSON.stringify(links));

  const ledger = fs.readFileSync(path.join(edition, 'appendix-a-s03-verbatim-ledger.md'), 'utf8');
  const rows = ledger.split('\n').filter((line) => line.startsWith('| **A132** '));
  const a132 = rows[0];
  check(`${lang} Appendix A: A132 cites §38.14, its theorem box, and its lab`,
    rows.length === 1 && a132.includes(`](${CHAPTER_MD}#${ANCHOR})`) &&
    a132.includes('[@thm-ch38-omega-fractran-anchors]') && a132.includes(`\`${ID}\``),
    `${rows.length} A132 row(s)`);
}
check('words: the NUM, ARGUED and MODEL boxes stand once each, next to sixteen green boxes', (html.match(/class="lean num"/g) || []).length === 1 && (html.match(/class="lean argued"/g) || []).length === 1 && (html.match(/class="lean model"/g) || []).length === 1 && (html.match(/<div class="lean"><span class="ok">LEAN ✓<\/span>/g) || []).length === 16);

/* ---------- the page as it opens ---------- */
const state = (p = page) => p.evaluate(() => window.OFISA_DEBUG.state);
await page.goto(T.url(BOOK, ID, '?lang=zh'), { waitUntil: 'load' });
await page.evaluate(() => document.fonts && document.fonts.ready);
await settle(page, 300);
{
  const s = await state();
  check('open: the default card is the adder, parked on its still: 243 = 3⁵ after 3 beats, halted', s.preset === DEFAULT && s.scene === 'adder' && s.clock === 3 && s.adder.N === '243' && s.regime === 'halt', JSON.stringify({ preset: s.preset, clock: s.clock, N: s.adder.N, regime: s.regime }));
  const layout = await page.evaluate(() => {
    const stage = document.getElementById('stage'),
      strips = [...document.querySelectorAll('.strip canvas')];
    return {
      lab: !!document.querySelector('.app.lab > #rail') && !!document.querySelector('.app.lab main.center > #stage') && !!document.querySelector('.app.lab > #evidence') && !!document.querySelector('.app.lab > footer.rail'),
      strips: strips.length,
      outside: strips.every((c) => !stage.contains(c)),
      info: document.querySelectorAll('#infoBtn').length === 1 && !!document.querySelector('#evidence > #infoBtn'),
      aside: document.querySelector('#lensPanel h2 .aside').textContent.trim(),
      crumb: document.getElementById('crumb').getAttribute('href'),
      crumbText: document.querySelector('.crumb .zh').textContent.trim(),
      refs: document.querySelector('#drawer .zh .lede.refs').textContent,
      refsEn: document.querySelector('#drawer .en .lede.refs').textContent,
      refHref: [...document.querySelectorAll('#drawer .lede.refs a')].map((a) => a.getAttribute('href'))
    };
  });
  check('layout: the three-column lab: rail, stage, evidence and the footer rail', layout.lab);
  check('layout: two strip plots, both outside the stage', layout.strips === 2 && layout.outside);
  check('layout: one theory button, at the top of the evidence column', layout.info);
  check('layout: the lens panel names §38.14', layout.aside === '§38.14', layout.aside);
  check('layout: the crumb reads ◂ 第 38 章 · §38.14 and leads to the Chinese §38.14', layout.crumbText === '◂ 第 38 章 · §38.14' && layout.crumb === `../../zh/${CHAPTER}`, layout.crumb);
  check('layout: the drawer cites 第 38 章 §38.14 and Chapter 38, §38.14 with links to both pages', /第 38 章 §38\.14/.test(layout.refs) && /Chapter 38, §38\.14/.test(layout.refsEn) && same(layout.refHref, [`../../zh/${CHAPTER}`, `../../en/${CHAPTER}`]), JSON.stringify(layout.refHref));
  const lens = await page.evaluate(() => [...document.querySelectorAll('#lensToggleBtn .seg')].map((s) => [s.querySelector('.zh').textContent, s.querySelector('.en').textContent]));
  check('lenses: Observer Native Ω-FRACTRAN Rotor Lens against Classical Scalar FRACTRAN & Register Machine Contrast (MODEL)', same(lens, [['观察者原生 Ω-FRACTRAN 旋子透镜', 'Observer Native Ω-FRACTRAN Rotor Lens'], ['经典标量 FRACTRAN 与寄存器机对照（MODEL）', 'Classical Scalar FRACTRAN & Register Machine Contrast (MODEL)']]), JSON.stringify(lens));
  const cards = await page.$$eval('#presets [data-preset]', (els) => els.map((e) => [e.dataset.preset, e.dataset.still]));
  check('cards: exactly the five cards, in order, each declaring its still', same(cards, IDS.map((id) => [id, String(CARDS[id].still)])), JSON.stringify(cards));
}

/* ---------- the evidence: sixteen green boxes in the order of the theorem box, and the other boxes ---------- */
{
  const ev = await page.evaluate(() => ({
    green: [...document.querySelectorAll('#basis .lean')].filter((b) => !/(^|\s)(num|model|argued|open|frozen)(\s|$)/.test(b.className)).map((b) => b.querySelector('a[data-lean-gid]')?.dataset.leanGid || null),
    argued: document.querySelector('#basis .lean.argued').textContent,
    model: document.querySelector('#basis .lean.model').textContent,
    num: document.querySelector('#basis .lean.num').textContent,
    modelInk: getComputedStyle(document.querySelector('#basis .lean.model .ok')).color === getComputedStyle(document.documentElement).color || getComputedStyle(document.querySelector('#basis .lean.model .ok')).color !== getComputedStyle(document.querySelector('.handle')).borderTopColor,
    drawer: document.querySelectorAll('#drawerEvidence .lean').length,
    basis: document.querySelectorAll('#basis .lean').length
  }));
  check('evidence: the green boxes are exactly the sixteen frozen theorems, in order', same(ev.green, GIDS), JSON.stringify(ev.green.filter((g, i) => g !== GIDS[i])));
  for (const name of ['Conway (1987)', 'Minsky (1961)', 'Hurwitz (1896)', 'Jacobi', 'Lubotzky, Phillips and Sarnak (1988)', 'Deligne (1974)']) check(`evidence: the ARGUED box cites ${name}`, ev.argued.includes(name));
  check('evidence: the MODEL box holds the observer ISA, the 0 · 1/2 · 1 gate and the comparison of three instruction sets', /observer rational ISA/.test(ev.model) && /0 · 1\/2 · 1/.test(ev.model) && /three instruction sets/.test(ev.model) && /观察者有理指令集/.test(ev.model));
  check('evidence: the MODEL badge is not amber', ev.modelInk);
  check('evidence: the drawer repeats every evidence box', ev.drawer === ev.basis && ev.basis === 19, `${ev.drawer} of ${ev.basis}`);
  check('evidence: the NUM box is filled by the script', ev.num.length > 400 && !/—\s*—/.test(ev.num));
}

/* ---------- the numbers of the page against the ones computed here ---------- */
{
  const B = await page.evaluate(() => window.OFISA_DEBUG.bench());
  check('NUM: the adder grid and the multiplier grid agree with their closed forms', B.adder.bad === 0 && B.adder.tried === 25 && B.mult.bad === 0 && B.mult.tried === 25);
  check('NUM: the multiplier takes 18 beats, 10 of them with a flag in N', B.mult.beats22 === 18 && B.mult.flags22 === MULT_FLAGS && MULT_FLAGS === 10, `${B.mult.flags22} vs ${MULT_FLAGS}`);
  check('NUM: the hits of PRIMEGAME, their exponents prime', same(B.hits, HITS) && B.hitsPrime, JSON.stringify(B.hits));
  check('NUM: 680 of the first 710 beats carry a flag prime', B.flagTotal === PG_FLAGS && PG_FLAGS === 680, `${B.flagTotal} vs ${PG_FLAGS}`);
  check('NUM: the lemmas fold into 440 and 262 steps, every step a single fraction from its start to its end', B.folds.A === FOLDS.A && B.folds.B === FOLDS.B && B.foldBad === 0 && same(B.lemmas.slice().sort(), ['5/2', '6/35', '7/3']), JSON.stringify({ folds: B.folds, lemmas: B.lemmas }));
  check('NUM: ledgers recover the states, the product formula holds, closure ⇔ ledger ≥ 0', B.ledger.recBad === 0 && B.ledger.prodBad === 0 && B.ledger.closeBad === 0 && B.ledger.states === 711 + 4 + 19 && B.ledger.closeTried === 711 * 14 + 4 * 1 + 19 * 6, JSON.stringify(B.ledger));
  check('NUM: ∏ of the ten primes + 1 is ≡ 1 mod each, its least factor outside the list', B.escape.value === String(ESCAPE) && B.escape.residues && B.escape.q === String(LEAST) && B.escape.outside, `${B.escape.value} · ${B.escape.q}`);
  const lpsBad = WORDS4.reduce((bad, w) => {
    const psi = w.reduce((p, g) => qm(p, GEN[g]), [1, 0, 0, 0]);
    return bad + Object.keys(GEN).filter((g) => qm(psi, conjQ(GEN[g])).every((v) => v % 5 === 0) !== (g === w[w.length - 1])).length;
  }, 0);
  const distinct = new Set(WORDS4.map((w) => w.reduce((p, g) => qm(p, GEN[g]), [1, 0, 0, 0]).join(','))).size;
  check('NUM: 936 reduced words of length ≤ 4, distinct products, and Ψ·π̄/5 integral exactly for the last letter', B.lps.words === WORDS4.length && WORDS4.length === 936 && B.lps.distinct === distinct && distinct === 936 && B.lps.bad === 0 && lpsBad === 0 && B.lps.tears === 936 * 5, JSON.stringify(B.lps));
  check('NUM: κ(1, π) = 1/5 for the six generators', same(B.kappa, ['1', '5']) && B.kappaOk);
  check('NUM: the two-word code: x, y never collide; x, xx do', B.code.free === 0 && B.code.stuck > 0 && B.code.strings === 511);
  check('NUM: scalar products of different letters commute, rotor products never do', B.descent.pairs === 6 && B.descent.scalarSplit === 0 && B.descent.rotorSame === 0);
  // the spinor states: ψ(a + bi + cj + dk) = (a + bI, −c + dI); their z record and their coherence
  const spin = (q) => {
    const n = q.reduce((s, x) => s + x * x, 0),
      [a, b, c, d] = q;
    return { diag: [fracStr(a * a + b * b, n), fracStr(c * c + d * d, n)], re: fracStr(a * -c + b * d, n), im: fracStr(b * -c - a * d, n) };
  };
  const sx = spin(PSI_XY),
    sy = spin(PSI_YX);
  const pinOf = (o) => ({ diag: o.diag.map(([p, q]) => fracStr(p, q)), re: fracStr(...o.off[0]), im: fracStr(...o.off[1]) });
  check('NUM: the z record reads 1/5 and 4/5 for both words; the coherences (6 − 8i)/25 and −2/5 differ', same(pinOf(B.pin.XY), sx) && same(pinOf(B.pin.YX), sy) && same(sx.diag, ['1/5', '4/5']) && same(sy.diag, sx.diag) && sx.re === '6/25' && sx.im === '−8/25' && sy.re === '−2/5' && sy.im === '0', JSON.stringify([pinOf(B.pin.XY), pinOf(B.pin.YX)]));
  check('NUM: the exact divider: guard tests, word width, 6w² + 18w + 6 steps each', B.divider.tests === TESTS && B.divider.width === WIDTH && B.divider.perTest === PER_TEST && B.divider.total === TESTS * PER_TEST, JSON.stringify(B.divider));
  check('NUM: the overwrite changes two bits; no torn state is written', B.flips === 2 && B.torn === 0);
  check('NUM: the tear is (1, −6/5, 0, −8/5)', same(B.tear, [5, -6, 0, -8]) && same(B.xy, PSI_XY) && same(B.yx, PSI_YX));
  const numZh = await page.evaluate(() => document.querySelector('#basis .lean.num .zh').textContent);
  const numEn = await page.evaluate(() => document.querySelector('#basis .lean.num .en').textContent);
  for (const [lang, text] of [['zh', numZh], ['en', numEn]]) {
    const need = ['680', String(FOLDS.A), String(FOLDS.B), '936', String(ESCAPE), String(LEAST), String(TESTS), String(PER_TEST), String(TESTS * PER_TEST), ...HITS.map((h) => String(h.beat))];
    const missing = need.filter((x) => !text.includes(x));
    check(`NUM: the ${lang} text carries the numbers computed here`, missing.length === 0, missing.join(', '));
  }
  const bench = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll('#drawer .en [data-bench]')].map((el) => [el.dataset.bench, el.textContent])));
  check('drawer: the numbers of the drawer', bench.adder === '72 → 108 → 162 → 243' && bench.multBeats === '18' && bench.multEnd === '625 = 5⁴' && bench.multFlags === '10' && bench.pgFlags === '680' && bench.folds === `${FOLDS.A} · ${FOLDS.B}` && bench.xy === tupleN(PSI_XY) && bench.yx === tupleN(PSI_YX) && bench.tear === '(1, −6/5, 0, −8/5)' && bench.flips === '2' && bench.torn === '0' && bench.hits === '19 (2²), 69 (2³), 281 (2⁵), 710 (2⁷)', JSON.stringify(bench));
}

/* ---------- the runs of the page against the ones computed here ---------- */
{
  const run = (scene, over) => page.evaluate(([s, o]) => window.OFISA_DEBUG.trace(s, o), [scene, over]);
  const a = await run('adder', {});
  check('runs: the adder of the page is 72 → 108 → 162 → 243', same(a.states, adder.states.map((e) => String(valueOf(e)))) && a.halted);
  const m = await run('mult', {});
  check('runs: the multiplier of the page fires the same rules', same(m.fired, mult.fired) && same(m.states, mult.states.map((e) => String(valueOf(e)))));
  const p = await run('prime', {});
  check('runs: PRIMEGAME of the page fires the same 710 rules', same(p.fired, pg.fired) && p.states[710] === '128');
  for (const [ma, mb] of [[1, 1], [1, 3], [3, 2], [3, 3]]) {
    const ours = fractran(MULT_RULES, 2n ** BigInt(ma) * 3n ** BigInt(mb), 1000),
      theirs = await run('mult', { ma, mb });
    check(`runs: the multiplier on 2^${ma}·3^${mb} ends at 5^${ma * mb} in ${ours.fired.length} beats`, theirs.fired.length === ours.fired.length && theirs.states[theirs.states.length - 1] === String(5n ** BigInt(ma * mb)));
  }
  for (const order of ['XY', 'YX'])
    for (const attn of ['Q1', 'Q2']) {
      const ours = pops(order === 'XY' ? PSI_XY : PSI_YX, attn),
        theirs = await page.evaluate(([o, q]) => window.OFISA_DEBUG.rotor(o, q), [order, attn]);
      const same2 = theirs.beats.length === ours.length && ours.every((b, k) => b.fired === theirs.beats[k].fired && same(b.torn.map((t) => t.c5), theirs.beats[k].torn.map((t) => t.c5)) && same(b.to, theirs.states[k + 1]));
      check(`runs: the rotor stack Ψ_${order} under ${attn === 'Q1' ? 'Q₁ ≻ Q₂' : 'Q₂ ≻ Q₁'} pops ${ours.map((b) => b.fired).join(' → ')} back to 1`, same2 && same(ours[ours.length - 1].to, [1, 0, 0, 0]), JSON.stringify(theirs.beats.map((b) => b.fired)));
    }
  check('runs: Ψ_XY unlocks by Q₁ → Q₂, Ψ_YX by Q₂ → Q₁ after the tear of Q₁', same(pops(PSI_XY, 'Q1').map((b) => b.fired), ['Q1', 'Q2']) && same(pops(PSI_YX, 'Q1').map((b) => b.fired), ['Q2', 'Q1']) && same(pops(PSI_YX, 'Q1')[0].torn[0].c5, [5, -6, 0, -8]));
  const st = await page.evaluate(() => [window.OFISA_DEBUG.stereo([1, 2, 2, 4]), window.OFISA_DEBUG.stereo([1, 2, 0, 0]), window.OFISA_DEBUG.stereo([5, -6, 0, -8])]);
  const near = (u, v) => u.every((x, i) => Math.abs(x - v[i]) < 1e-12);
  check('drawing: the rotor stage is the stereographic projection from −1 (π_{5,+x} at 1/φ on the x axis)', near(st[0], stereo(PSI_XY)) && near(st[1], stereo(GEN['+x'])) && Math.abs(st[1][0] - (Math.sqrt(5) - 1) / 2) < 1e-12 && near(st[2], stereo([5, -6, 0, -8])));
}

/* ---------- the five cards at their stills, in both languages: what the captions say ---------- */
for (const lang of ['zh', 'en'])
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const s = await state(p),
      c = CARDS[id];
    const hud = await p.evaluate(() => document.getElementById('hudSub').textContent + ' ' + document.getElementById('hudBig').textContent);
    let ok = s.scene === c.scene && s.clock === c.still && s.regime === c.regime && s.preset === id;
    if (c.scene === 'adder') ok = ok && s.adder.N === '243' && /729\/2 ∉ ℤ/.test(hud);
    if (c.scene === 'mult') ok = ok && s.mult.N === '625' && s.mult.at === 18 && s.mult.halted;
    if (c.scene === 'prime') ok = ok && s.prime.N === '128' && s.prime.hit && s.prime.flagsSoFar === 680;
    if (c.scene === 'rotor') ok = ok && same(s.rotor.psi, [1, 0, 0, 0]) && s.rotor.halted && s.inputs.order === 'XY';
    if (c.scene === 'audit') ok = ok && s.audit.pg.flagsSoFar === 680 && s.audit.om.halted && s.audit.vn === 2;
    check(`still (${lang}, ${id}): the frame the caption describes`, ok, JSON.stringify({ scene: s.scene, clock: s.clock, regime: s.regime, hud: hud.slice(0, 80) }));
    // openStill opens the canonical still with ?shot=1, which the shared runtime recognizes
    check(`still (${lang}, ${id}): the canonical still (?shot=1) hides the mirror of the lens`, new URL(p.url()).searchParams.get('shot') === '1' && (await p.locator('#lensMirror').isHidden()), p.url());
    if (lang === 'en') check(`still (en, ${id}): no Chinese left`, (await cjkLeftovers(p)).length === 0);
    await p.context().close();
  }

/* ---------- every control ---------- */
const click = async (sel) => {
  await page.locator(sel).first().evaluate((b) => b.click());
  await settle(page);
};
const pauseClock = () => page.evaluate(() => window.OFISA_DEBUG.state.playing && document.getElementById('play').click());
await page.goto(T.url(BOOK, ID, '?lang=zh'), { waitUntil: 'load' });
await settle(page, 300);
{
  // the multiplier from its start: one beat is 36 · 11/2 = 198
  await click(`[data-preset="${MULT}"]`);
  await pauseClock();
  await page.evaluate(() => document.getElementById('rew').click());
  await settle(page);
  await click('#beatBtn');
  check('controls: one beat moves the multiplier from 36 to 36 · 11/2 = 198', await until(page, () => window.OFISA_DEBUG.state.clock === 1 && !window.OFISA_DEBUG.state.playing && window.OFISA_DEBUG.state.mult.N === '198'));
  check('controls: the stage button of the multiplier is one beat too', (await page.textContent('#stageAct')).includes('单拍'));
  await click('#stageAct');
  check('controls: the stage button moves one more beat: 198 · 455/33 = 2730', await until(page, () => window.OFISA_DEBUG.state.clock === 2 && window.OFISA_DEBUG.state.mult.N === '2730'));
  await click('#runBtn');
  check('controls: auto-run plays the clock and presses its button', await until(page, () => window.OFISA_DEBUG.state.playing && document.getElementById('runBtn').getAttribute('aria-pressed') === 'true'));
  await click('#runBtn');
  check('controls: auto-run pressed again pauses', await until(page, () => !window.OFISA_DEBUG.state.playing));
  // the inputs of the multiplier
  await click('[data-ma="3"]');
  await click('[data-mb="3"]');
  const s = await state();
  check('controls: a = b = 3 runs 2³·3³ = 216 to 5⁹ in 36 beats', s.inputs.ma === 3 && s.inputs.mb === 3 && s.max === 36 && s.mult.end === String(5n ** 9n) && s.preset === null, JSON.stringify({ max: s.max, end: s.mult.end }));
  // the adder sliders
  await page.evaluate(() => {
    const r = document.getElementById('aRange');
    r.value = '5';
    r.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await settle(page);
  await page.evaluate(() => {
    const r = document.getElementById('bRange');
    r.value = '4';
    r.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await settle(page);
  const s2 = await state();
  check('controls: the adder sliders: 2⁵·3⁴ goes to 3⁹ = 19683 in 5 beats', s2.scene === 'adder' && s2.max === 5 && s2.adder.N === '19683' && s2.adder.halted, JSON.stringify({ max: s2.max, N: s2.adder.N }));
  // the lemma levels keep the beat
  await click(`[data-preset="${PRIME}"]`);
  await pauseClock();
  await page.evaluate(() => {
    const r = document.getElementById('now');
    r.value = '69';
    r.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await settle(page);
  await click('[data-level="A"]');
  const sa = await state();
  await click('[data-level="B"]');
  const sb = await state();
  await click('[data-level="raw"]');
  const sr = await state();
  check('controls: lemma A gives a rail of 440 steps, A + B one of 262, raw beats 710', sa.max === FOLDS.A && sb.max === FOLDS.B && sr.max === 710, `${sa.max} · ${sb.max} · ${sr.max}`);
  check('controls: a new lemma level keeps the beat 69 = 2³', sa.prime.at === 69 && sb.prime.at === 69 && sr.prime.at === 69 && sa.prime.N === '8', JSON.stringify([sa.prime.at, sb.prime.at, sr.prime.at]));
  await click('#stageAct');
  check('controls: the stage button of PRIMEGAME takes the next lemma level', (await state()).inputs.level === 'A');
  // the rotor: order and attention
  await click(`[data-preset="${ROTOR}"]`);
  await pauseClock();
  await click('#swapBtn');
  const sy = await state();
  check('controls: XY ↔ YX flips the word to Ψ_YX = (1, 2, 2, −4)', sy.inputs.order === 'YX' && same(sy.rotor.start, [1, 2, 2, -4]));
  await page.evaluate(() => document.getElementById('rew').click());
  await settle(page);
  const s0 = await state();
  check('controls: at the start of Ψ_YX, Q₁ tears with (1, −6/5, 0, −8/5) and Q₂ is selected', s0.rotor.next === 'Q2' && same(s0.rotor.torn.map((t) => t.c5), [[5, -6, 0, -8]]), JSON.stringify(s0.rotor));
  const hud = await page.textContent('#hudSub');
  check('controls: the HUD names the tear', hud.includes('(1, −6/5, 0, −8/5) ∉ ℤ⁴'), hud);
  await click('#stageAct');
  check('controls: the stage button of the rotor is XY ↔ YX too', (await state()).inputs.order === 'XY');
  await click('[data-attn="Q2"]');
  const sq = await state();
  const ours = pops(PSI_XY, 'Q2');
  check('controls: attention Q₂ ≻ Q₁ on Ψ_XY: Q₂ tears first, the unlock is still Q₁ → Q₂', sq.inputs.attn === 'Q2' && same(ours.map((b) => b.fired), ['Q1', 'Q2']) && same(ours[0].torn.map((t) => t.q), ['Q2']));
  await click('[data-order="YX"]');
  check('controls: the order chips choose the word', (await state()).inputs.order === 'YX');
  // the views and the lens
  for (const cam of ['top', 'face', 'panorama']) {
    await click(`[data-cam="${cam}"]`);
    check(`controls: the view ${cam}`, (await state()).cam === cam);
  }
  const before = await state();
  await click('#lensToggleBtn');
  const after = await state();
  check('lenses: the lens changes names and weights and keeps the state', after.lens === 1 && after.clock === before.clock && same(after.inputs, before.inputs) && (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true' && (await page.getAttribute('#lensMirror', 'aria-pressed')) === 'true');
  check('lenses: the contrast speaks of the scalar shadow 25', (await page.textContent('#hudSub')).includes('25'));
  await click('#lensToggleBtn');
  check('lenses: back to the observer lens', (await state()).lens === 0);
  check('lenses: the mirror is hidden on the desktop page of the session default viewport', !(await page.isVisible('#lensMirror')));
}

/* ---------- playback and the handle ---------- */
for (const id of IDS) {
  const at = await playsAfter(page, () => page.locator(`[data-preset="${id}"]`).evaluate((b) => b.click()), () => ({ playing: window.OFISA_DEBUG.state.playing, t: window.OFISA_DEBUG.state.clock }));
  check(`playback: card ${id} plays from its start`, at);
}
{
  await click(`[data-preset="${ADDER}"]`);
  await pauseClock();
  await page.evaluate(() => {
    const r = document.getElementById('now');
    r.value = '3';
    r.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await settle(page);
  const from = await page.evaluate(() => window.OFISA_DEBUG.dragTarget(3)),
    to = await page.evaluate(() => window.OFISA_DEBUG.dragTarget(1));
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move((from.x + to.x) / 2, (from.y + to.y) / 2, { steps: 4 });
  await page.mouse.move(to.x, to.y, { steps: 4 });
  await page.mouse.up();
  await settle(page);
  const s = await state();
  check('handle: dragging the amber handle along the rim moves the beat', Math.abs(s.clock - 1) < 0.2 && s.adder.N === '108', `${s.clock} · ${s.adder.N}`);
  await page.focus('#stageHandle');
  await page.keyboard.press('End');
  await settle(page);
  check('handle: End on the handle goes to the last beat', (await state()).clock === 3);
  const rot = await page.evaluate(() => {
    document.querySelector('[data-preset="nonabelian-p5-lps-word-order-stack"]').click();
    return true;
  });
  await settle(page);
  await pauseClock();
  await page.evaluate(() => document.getElementById('rew').click());
  await settle(page);
  const h = await page.evaluate(() => [window.OFISA_DEBUG.dragTarget(0), window.OFISA_DEBUG.pointTarget(window.OFISA_DEBUG.stereo([1, 2, 2, 4]))]);
  check('handle: on the rotor card the handle starts on Ψ_XY', rot && Math.hypot(h[0].x - h[1].x, h[0].y - h[1].y) < 1, JSON.stringify(h));
}

/* ---------- colours on the page as rendered ---------- */
{
  const colours = await page.evaluate(() => {
    const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const probe = (v) => {
      const d = document.createElement('i');
      d.style.color = v;
      document.body.append(d);
      const c = getComputedStyle(d).color;
      d.remove();
      return c;
    };
    const warn = probe(css('--tr-warn')),
      amber = probe(css('--tr-amber')),
      ok = probe(css('--tr-ok'));
    const all = [...document.querySelectorAll('body *')];
    const redOnes = all.filter((el) => {
      const s = getComputedStyle(el);
      return [s.color, s.backgroundColor, s.borderTopColor].includes(warn) && el.getClientRects().length;
    });
    const greenText = all.filter((el) => getComputedStyle(el).color === ok && el.getClientRects().length && !el.closest('.lean'));
    const amberTags = [...document.querySelectorAll('.stage .tag.c-am')].filter((t) => !t.hidden && t.getClientRects().length && getComputedStyle(t).visibility !== 'hidden' && Number(getComputedStyle(t).opacity) > 0).map((t) => t.textContent);
    return { red: redOnes.map((e) => e.className || e.tagName).slice(0, 4), green: greenText.map((e) => e.className || e.tagName).slice(0, 4), amberTags };
  });
  check('colour: nothing on the page is red', colours.red.length === 0, colours.red.join(' | '));
  check('colour: green appears only inside the evidence boxes', colours.green.length === 0, colours.green.join(' | '));
  check('colour: amber stage labels name only the present word, the selected gate or the write head', colours.amberTags.length > 0 && colours.amberTags.every((t) => /^(Ψ|Q|q|ACC ←)/.test(t)), colours.amberTags.join(' | '));
  const labels = await labelOverlaps(page, '.stage .tag');
  check('labels: no two stage labels sit on top of each other on the rotor card', labels.length === 0, JSON.stringify(labels.slice(0, 2)));
}

/* ---------- strips ---------- */
{
  for (const id of [ADDER, PRIME, ROTOR]) {
    await click(`[data-preset="${id}"]`);
    await pauseClock();
    const strip = await page.evaluate(() =>
      ['plot', 'plotB'].map((k) => {
        const cv = document.getElementById(k),
          d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++;
        return { inked: n / (d.length / 4), title: document.getElementById(k === 'plot' ? 'plotTitle' : 'plotTitleB').textContent };
      })
    );
    check(`strips (${id}): both strips are drawn and titled`, strip.every((x) => x.inked > 0.01 && x.title.length > 8), JSON.stringify(strip));
  }
}

/* ---------- narrow pages, embeds and the mirror of the lens ---------- */
{
  const desk = await T.open(BOOK, ID, '?lang=zh', { viewport: { width: 1440, height: 900 } });
  await settle(desk, 300);
  check('desktop 1440 × 900: the mirror of the lens is hidden', await desk.locator('#lensMirror').isHidden());
  await desk.context().close();
}
/** Click a card and wait until it has played up to its still and parked there. */
async function park(p, id) {
  await p.locator(`[data-preset="${id}"]`).evaluate((b) => b.click());
  await settle(p);
  const parked = await until(p, ([card, still]) => {
    const s = window.OFISA_DEBUG.state;
    return s.preset === card && !s.playing && s.clock === still;
  }, [id, CARDS[id].still], 150000);
  await settle(p);
  return parked;
}
/** The mirror on the first screen: inside the viewport, unscrolled, its own hit target, off the stage. */
async function mirrorFirstScreen(p, label) {
  const geo = await p.evaluate(() => {
    const mirror = document.getElementById('lensMirror'),
      r = mirror.getBoundingClientRect().toJSON(),
      stage = document.getElementById('stage').getBoundingClientRect();
    const xs = [r.left + 2, (r.left + r.right) / 2, r.right - 2],
      ys = [r.top + 2, (r.top + r.bottom) / 2, r.bottom - 2];
    return {
      rect: r,
      scrollY,
      inside: r.width > 0 && r.height > 0 && r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight,
      hit: xs.every((x) => ys.every((y) => mirror.contains(document.elementFromPoint(x, y)))),
      onStage: r.left < stage.right && stage.left < r.right && r.top < stage.bottom && stage.top < r.bottom
    };
  });
  return check(`${label}: the mirror of the lens is clickable on the first screen, off the stage`, geo.scrollY === 0 && geo.inside && geo.hit && !geo.onStage, JSON.stringify(geo));
}
for (const lang of ['zh', 'en']) {
  for (const [label, query, viewport, phoneLike] of [
    [`phone ${lang} 390 × 844`, `?lang=${lang}`, { width: 390, height: 844 }, true],
    [`full lab embed ${lang} 740 × 620`, `?embed=1&lang=${lang}`, { width: 740, height: 620 }, false]
  ]) {
    const p = await T.open(BOOK, ID, query, { viewport, ...(lang === 'en' ? { locale: 'en-US' } : {}) });
    await settle(p, 300);
    check(`${label}: the mirror of the lens stands in the tour bar`, await p.isVisible('#lensMirror'));
    // park a card other than the default, so that a reset of the experiment would fail the comparison
    const parked = await park(p, ROTOR);
    const before = await state(p);
    const pressed = () => Promise.all(['#lensMirror', '#lensToggleBtn'].map((sel) => p.getAttribute(sel, 'aria-pressed')));
    check(`${label}: the rotor card is parked and both lens switches start released`, parked && before.preset === ROTOR && before.clock === CARDS[ROTOR].still && !before.playing && before.lens === 0 && same(await pressed(), ['false', 'false']), JSON.stringify({ preset: before.preset, clock: before.clock, lens: before.lens }));
    for (const lens of [1, 0]) {
      // measure before the click, which may scroll the control into view
      if (!(await mirrorFirstScreen(p, `${label} lens ${1 - lens}`))) break;
      await p.click('#lensMirror');
      await settle(p);
      const after = await state(p),
        aria = await pressed(),
        want = String(lens === 1);
      check(`${label}: a pointer click on the mirror sets lens ${lens} and both switches read aria-pressed="${want}"`, after.lens === lens && same(aria, [want, want]), JSON.stringify({ lens: after.lens, aria }));
      check(`${label} lens ${lens}: the click keeps the card, the clock and the inputs`, after.preset === before.preset && after.scene === before.scene && after.clock === before.clock && same(after.inputs, before.inputs), JSON.stringify({ preset: after.preset, clock: after.clock, inputs: after.inputs }));
    }
    if (phoneLike) {
      check(`${label}: no sideways scrolling`, (await overflowX(p)) <= 0);
      check(`${label}: the crumb leads to the ${lang === 'en' ? 'English' : 'Chinese'} §38.14`, (await p.getAttribute('#crumb', 'href')) === `../../${lang}/${CHAPTER}`);
    }
    await p.context().close();
  }
}
{
  const lab = await T.open(BOOK, ID, '?embed=1&lang=zh', { viewport: { width: 1200, height: 900 } });
  await settle(lab, 300);
  check('embed: the whole lab inside a chapter shows the mirror of the lens', await lab.isVisible('#lensMirror'));
  await lab.context().close();
  for (const id of [ROTOR, AUDIT]) {
    const fig = await T.open(BOOK, ID, `?embed=1&lang=zh&preset=${id}`, { viewport: { width: 740, height: 500 } });
    await settle(fig, 300);
    const g = await fig.evaluate(() => ({ strip: !!document.querySelector('.strip') && document.querySelector('.strip').getClientRects().length > 0, mirror: !!document.getElementById('lensMirror').getClientRects().length }));
    check(`figure (${id}): a cited figure shows neither the strips nor the mirror of the lens`, !g.strip && !g.mirror, JSON.stringify(g));
    check(`figure (${id}) 740 × 500: the mirror of the lens is hidden`, await fig.locator('#lensMirror').isHidden());
    await fig.context().close();
  }
}

check('no page error or failed request', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
