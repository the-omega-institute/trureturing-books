#!/usr/bin/env node
// Browser regression suite for omega-math/viz/adelic-arithmetic-observer-lab (Playwright + Chromium):
//   node books/omega-math/viz/tests/adelic-arithmetic-observer-lab.test.mjs        (or node tools/node/viz-test.mjs omega-math)
// stageFirstChecks is the battery every stage-first page must pass, here with the lit-solid checks. After it come the
// checks of this page: one for every control, and one for each property the page claims, against independent
// mathematics written below in big integers (never by calling the page's own functions): a sieve of Eratosthenes
// instead of trial division, continued fractions by rational reciprocals and 2 × 2 matrix products instead of the
// continuant recurrence, an exponent-vector register machine instead of fraction steps, word enumeration instead of
// 6·5^{L−1}, the split matrix from the images of 1, i, j, k. The page is read through its read-only probe
// window.ARCLAB_DEBUG, whose integers are decimal strings and whose fractions are [numerator, denominator] pairs.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../../../tools/node/viz-common.mjs';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, labelOverlaps, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'omega-math';
const ID = 'adelic-arithmetic-observer-lab';
const CARDS = {
  'euclid-cf-quarter-depth': { scene: 'horizon', mode: 'escape', still: 6 },
  'adelic-balance-and-f3-tree': { scene: 'adelic', mode: 'tree', still: 5 },
  'scalar-fractran-and-mat2': { scene: 'machine', mode: 'fractran', still: 15 },
  'static-canvas-memory-split': { scene: 'canvas', mode: 'canvas', still: 3 }
};
const [HORIZON, ADELIC, MACHINE, CANVAS] = Object.keys(CARDS);
const GIDS = [
  'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape',
  'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant',
  'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.quarterDepth_integer_sound',
  'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_rank_one',
  'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic',
  'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.cayley_hamilton'
];
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const absN = (a) => (a < 0n ? -a : a);
/** The gcd by the binary (Stein) method, unlike the page's Euclid. */
function steinN(a, b) {
  a = absN(a);
  b = absN(b);
  if (!a) return b;
  if (!b) return a;
  let s = 0n;
  while (!((a | b) & 1n)) {
    a >>= 1n;
    b >>= 1n;
    s++;
  }
  while (!(a & 1n)) a >>= 1n;
  while (b) {
    while (!(b & 1n)) b >>= 1n;
    if (a > b) [a, b] = [b, a];
    b -= a;
  }
  return a << s;
}
const Q = (p, q = 1n) => {
  p = BigInt(p);
  q = BigInt(q);
  if (q === 0n) throw new Error('zero denominator');
  const g = steinN(p, q) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const addQ = ([a, b], [c, d]) => Q(a * d + c * b, b * d),
  subQ = ([a, b], [c, d]) => Q(a * d - c * b, b * d),
  mulQ = ([a, b], [c, d]) => Q(a * c, b * d),
  divQ = ([a, b], [c, d]) => Q(a * d, b * c);
const ZERO = Q(0),
  ONE = Q(1);
/** Equal as rationals, by cross multiplication (the probe's pairs are reduced, but the test does not rely on it). */
const eqQ = (x, y) => BigInt(x[0]) * BigInt(y[1]) === BigInt(y[0]) * BigInt(x[1]);
const reducedQ = (x) => {
  const [p, q] = x.map(BigInt);
  return q > 0n && steinN(p, q) === 1n;
};
const strQ = ([p, q]) => `${p}${BigInt(q) === 1n ? '' : '/' + q}`;
const B = (x) => BigInt(x);

/* primes: a sieve of Eratosthenes with smallest prime factors */
const SIEVE = 600000;
const SPF = (() => {
  const spf = new Int32Array(SIEVE + 1);
  for (let i = 2; i <= SIEVE; i++) if (!spf[i]) for (let j = i; j <= SIEVE; j += i) if (!spf[j]) spf[j] = i;
  return spf;
})();
const isPrimeN = (n) => n >= 2 && n <= SIEVE && SPF[n] === n;
const FIRST_PRIMES = range(20).filter(isPrimeN).slice(0, 7);
/** Prime factorization through the sieve: Map p → e. */
function factorN(n) {
  const out = new Map();
  n = Math.abs(n);
  while (n > 1) {
    const p = SPF[n];
    out.set(p, (out.get(p) || 0) + 1);
    n /= p;
  }
  return out;
}

/** The continued fraction of P/Q by taking floors and reciprocals of rationals. */
function cfN(P, Qd) {
  const a = [];
  let x = Q(P, Qd);
  for (;;) {
    const fl = x[0] >= 0n ? x[0] / x[1] : -((-x[0] + x[1] - 1n) / x[1]);
    a.push(fl);
    const r = subQ(x, [fl, 1n]);
    if (r[0] === 0n) break;
    x = divQ(ONE, r);
  }
  return a;
}
/** The product M₀M₁⋯Mₙ of the matrices [[aₖ, 1], [1, 0]]: [[pₙ, pₙ₋₁], [qₙ, qₙ₋₁]]. */
const m2 = (A, C) => [A[0] * C[0] + A[1] * C[2], A[0] * C[1] + A[1] * C[3], A[2] * C[0] + A[3] * C[2], A[2] * C[1] + A[3] * C[3]];
const continuant = (a, n) => a.slice(0, n + 1).reduce((M, ak) => m2(M, [ak, 1n, 1n, 0n]), [1n, 0n, 0n, 1n]);

/** The least N ≥ 0 with cq < dp·4^{N+1}, by counting up. */
function leastDepth(c, d, p, q) {
  const cq = B(c * q),
    dp = B(d * p);
  let N = 0;
  while (!(cq < dp * 4n ** B(N + 1))) N++;
  return N;
}

/** The images of 1, i, j, k in Mat₂: i ↦ diag(2, −2), j ↦ [[0, 1], [−1, 0]], k = ij. */
const BASIS = (() => {
  const I = [1n, 0n, 0n, 1n],
    Ei = [2n, 0n, 0n, -2n],
    Ej = [0n, 1n, -1n, 0n];
  return [I, Ei, Ej, m2(Ei, Ej)];
})();
const splitN = (q) => BASIS.reduce((S, E, i) => S.map((x, k) => x + B(q[i]) * E[k]), [0n, 0n, 0n, 0n]);
const mod5N = (x) => ((x % 5n) + 5n) % 5n;
const GEN_Q = [
  [1, 2, 0, 0],
  [1, -2, 0, 0],
  [1, 0, 2, 0],
  [1, 0, -2, 0],
  [1, 0, 0, 2],
  [1, 0, 0, -2]
];
/** The residue factors (u, v, s, t) of the six generators, as listed in the Lean source (Generator.factors). */
const LEAN_FACTORS = [
  [0, 1, 0, 2],
  [1, 0, 2, 0],
  [1, 3, 1, 2],
  [1, 2, 1, 3],
  [1, 4, 1, 4],
  [1, 1, 1, 1]
];
const OPPOSITE = [1, 0, 3, 2, 5, 4];
/** Reduced words of length L over six letters with inverses paired as OPPOSITE, by enumerating all strings. */
function countWords(L) {
  let n = 0;
  const total = 6 ** L;
  for (let code = 0; code < total; code++) {
    const w = [];
    let c = code;
    for (let i = 0; i < L; i++) {
      w.push(c % 6);
      c = Math.floor(c / 6);
    }
    if (w.every((g, i) => i === 0 || OPPOSITE[w[i - 1]] !== g)) n++;
  }
  return n;
}

/** FRACTRAN P_Ω as a register machine on exponent vectors (v₂, v₃, v₅, v₇, v₁₁): rule 11/49 needs v₇ ≥ 2, and so on. */
const REG_P = [2n, 3n, 5n, 7n, 11n];
const MACHINE_RULES = [
  { need: 3, from: 3, to: 4 },
  { need: 2, from: 2, to: 3 },
  { need: 1, from: 1, to: 2 },
  { need: 0, from: 0, to: 1 }
];
function runMachine() {
  const states = [[17, 0, 0, 0, 0]],
    fired = [];
  for (;;) {
    const v = states[states.length - 1],
      r = MACHINE_RULES.findIndex((x) => v[x.need] >= 2);
    if (r < 0) break;
    const w = v.slice();
    w[MACHINE_RULES[r].from] -= 2;
    w[MACHINE_RULES[r].to] += 1;
    fired.push(r);
    states.push(w);
  }
  return { states, fired, values: states.map((v) => v.reduce((N, e, i) => N * REG_P[i] ** B(e), 1n)) };
}

/** ‖x⊥‖² against the span of `basis` as a ratio of Gram determinants det G(basis ∪ x)/det G(basis) (Bareiss
    elimination), not by Gram–Schmidt as the page does. */
function gramDetN(vs) {
  const n = vs.length;
  if (!n) return 1n;
  const G = vs.map((u) => vs.map((v) => u.reduce((acc, x, i) => acc + x * v[i], 0n)));
  let prev = 1n;
  for (let k = 0; k < n - 1; k++) {
    if (G[k][k] === 0n) {
      const r = G.findIndex((row, i) => i > k && row[k] !== 0n);
      if (r < 0) return 0n;
      [G[k], G[r]] = [G[r], G[k]];
      prev = -prev;
    }
    for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) G[i][j] = (G[i][j] * G[k][k] - G[i][k] * G[k][j]) / (k ? prev : 1n);
    prev = G[k][k];
  }
  return G[n - 1][n - 1];
}
// Reconstruct the comparison graph and count connected components by traversal.
function canvasBeatsN(idle) {
  const seed = [1n, 0n, 0n, 0n],
    states = [seed, [1n, 1n, 0n, 0n], [1n, 0n, 1n, 0n], [1n, 1n, 1n, 1n], [2n, 1n, 1n, 0n], [1n, -1n, 0n, 1n]],
    links = [[], [[0, 2]], [[0, 3], [2, 3]], [[0, 4]], [[0, 5], [2, 5]], [[0, 6], [3, 6]]],
    adjacency = new Map([[0, []]]);
  let span = [seed], tau = ZERO, edges = 0, previousBetti = 0;
  const out = [{ tau, schur: ZERO, graph: { vertices: 1, edges: 0, components: 1, betti: 0, deltaBetti: 0 } }];
  for (const [i, state] of states.entries()) {
    const x = idle ? seed : state,
      d0 = gramDetN(span),
      d1 = gramDetN([...span, x]),
      schur = Q(d1, d0 * x.reduce((acc, v) => acc + v * v, 0n));
    if (d1 !== 0n) span = [...span, x];
    for (const [a, b] of idle ? [] : links[i]) {
      if (!adjacency.has(b)) adjacency.set(b, []);
      adjacency.get(a).push(b);
      adjacency.get(b).push(a);
      edges++;
    }
    const seen = new Set();
    let components = 0;
    for (const vertex of adjacency.keys()) {
      if (seen.has(vertex)) continue;
      components++;
      const stack = [vertex];
      while (stack.length) {
        const u = stack.pop();
        if (seen.has(u)) continue;
        seen.add(u);
        stack.push(...adjacency.get(u));
      }
    }
    const vertices = adjacency.size, betti = edges - vertices + components,
      deltaBetti = betti - previousBetti;
    previousBetti = betti;
    tau = addQ(tau, addQ(schur, Q(deltaBetti)));
    out.push({ tau, schur, graph: { vertices, edges, components, betti, deltaBetti } });
  }
  return out;
}
const beatsN = (idle) => canvasBeatsN(idle).map(({ tau }) => tau);

/** One generation of Weyl fermions as (multiplicity, 2T₃, 3Q): u_L, d_L, ν_L, e_L, u_R, d_R, e_R. */
const FERMIONS = [
  [3, 1, 2],
  [3, -1, -1],
  [1, 1, 0],
  [1, -1, -3],
  [3, 0, 2],
  [3, 0, -1],
  [1, 0, -3]
];

/* ---------- the quality gate ---------- */
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const state = async () => {
  await settle(page);
  return page.evaluate(() => window.ARCLAB_DEBUG.state);
};
/** Move the rail to v without leaving the card (the input event of the range, as a reader's drag does). */
const rail = async (v) => {
  await page.evaluate((x) => {
    const el = document.getElementById('now');
    el.value = String(x);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    TRV.kit.flush();
  }, v);
  return state();
};
/** Click a card, stop its playback and put the rail on its declared still (the card stays marked). */
const pick = async (card) => {
  await page.click(`[data-preset="${card}"]`);
  await settle(page);
  await page.evaluate(() => TRV.kit.pause());
  return rail(CARDS[card].still);
};
/** Set a range dial and fire its input event, as the reader's drag does. */
const dial = async (id, v) => {
  await page.evaluate(
    ([el, x]) => {
      const input = document.getElementById(el);
      input.value = String(x);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    [id, v]
  );
  return state();
};
const press = async (sel) => {
  await page.locator(sel).evaluate((b) => b.click());
  return state();
};

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the horizon card, parked at its still k = 6', s.preset === HORIZON && s.mode === 'escape' && s.t === 6 && !s.playing, JSON.stringify([s.preset, s.mode, s.t, s.playing]));
const declared = await page.evaluate(() => [...document.querySelectorAll('[data-preset]')].map((b) => [b.dataset.preset, b.dataset.still]));
check('four cards, each declares its still', JSON.stringify(declared) === JSON.stringify(Object.entries(CARDS).map(([id, c]) => [id, String(c.still)])), JSON.stringify(declared));
const green = await page.$$eval('#basis .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen) a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid));
check('six green boxes, one for each frozen theorem of the registry', JSON.stringify(green) === JSON.stringify(GIDS), green.join(' | '));
{
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')),
    entry = registry.visualizations.find((v) => v.id === ID);
  check('registry: the entry lists the six GIDs and the four chapters 13, 14, 16, 17', !!entry && JSON.stringify(entry.lean.map((x) => x.gid)) === JSON.stringify(GIDS) && JSON.stringify(entry.theory.map((t) => t.href.slice(6, 10))) === JSON.stringify(['ch13', 'ch14', 'ch16', 'ch17']));
}

/* ---------- 1. prime escape (Chapter 13) ---------- */
{
  let worst = '';
  for (let k = 0; k <= 7; k++) {
    s = await rail(k);
    const L = s.ledger,
      S = FIRST_PRIMES.slice(0, k),
      N = S.reduce((a, p) => a * p, 1) + 1,
      q = SPF[N];
    const ok = L.N === String(N) && L.q === String(q) && isPrimeN(q) && !S.includes(q) && N % q === 0 && L.fresh && L.rems.every((r) => r === '1') && L.rems.length === k && JSON.stringify(L.S) === JSON.stringify(S.map(String)) && L.cof === String(N / q);
    if (!ok && !worst) worst = `k = ${k}: page N = ${L.N}, q = ${L.q}; sieve N = ${N}, q = ${q}`;
  }
  check('escape: for k = 0 … 7, N = 1 + ∏S, its least prime factor (sieve) is not in S and N ≡ 1 mod every p ∈ S', !worst, worst);
  check('k = 7: 510511 = 19 × 26869 with 19 ∉ [2, …, 17]', s.ledger.N === '510511' && s.ledger.q === '19' && SPF[510511] === 19);
  s = await rail(6);
  check('escape still: 30031 = 59 × 509, 59 ∉ [2, 3, 5, 7, 11, 13]', s.ledger.N === '30031' && s.ledger.q === '59' && s.ledger.cof === '509' && s.key === '30031');
  check('the Bézout certificates 1·N − (∏S/p)·p = 1 for every p ∈ S', s.ledger.bezout.length === 6 && s.ledger.bezout.every((b) => BigInt(b.value) === 1n && 30031n - BigInt(b.m) * BigInt(b.p) === 1n));
  s = await rail(4);
  check('k = 4: N = 211 is itself prime (q = N)', s.ledger.N === '211' && s.ledger.q === '211' && isPrimeN(211));
  s = await press('[data-k="2"]');
  check('the k chips set the prefix: k = 2 gives N = 7', s.at.escape === 2 && s.ledger.N === '7' && s.preset === null);
  s = await press('[data-k="6"]');
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('the page benchmark: the empty list and 1110 lists from 1 … 10, no failure', bench.lists === 1111 && bench.escBad === 0, JSON.stringify([bench.lists, bench.escBad]));
  // the amber handle moves k along the rows
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate(() => window.ARCLAB_DEBUG.dragTarget(3));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 6 });
  await page.mouse.up();
  s = await state();
  check('dragging the amber handle to row 3 sets k = 3 (N = 31)', s.at.escape === 3 && s.ledger.N === '31', `k = ${s.at.escape}`);
  await page.locator('#stageHandle').focus();
  await page.keyboard.press('ArrowRight');
  s = await state();
  check('→ on the handle moves one step (k = 4)', s.at.escape === 4);
  await page.keyboard.press('End');
  s = await state();
  check('End on the handle goes to the end of the rail, k = 7', s.at.escape === 7 && s.ledger.N === '510511');
  await page.evaluate(() => document.activeElement.blur());
}

/* ---------- 1b. continued fractions ---------- */
s = await press('[data-hz="ladder"]');
check('the reading chips switch to the ladder of 34/21 = [1; 1, 1, 1, 1, 1, 2]', s.mode === 'ladder' && s.ledger.cf.a.join() === cfN(34, 21).join() && s.ledger.cf.a.join() === '1,1,1,1,1,1,2');
{
  let worst = '';
  const a = cfN(34, 21);
  for (let n = 0; n <= 6; n++) {
    s = await rail(n);
    const M = continuant(a, n),
      L = s.ledger,
      det = M[0] * M[3] - M[1] * M[2];
    const ok = L.conv.join() === [M[0], M[2]].join() && L.prev.join() === [M[1], M[3]].join() && BigInt(L.det) === det && det === (n % 2 ? 1n : -1n) && L.gcd === '1' && eqQ(L.err, subQ(Q(M[0], M[2]), Q(34, 21)));
    if (!ok && !worst) worst = `n = ${n}: page ${L.conv} det ${L.det}, matrices ${M[0]}/${M[2]} det ${det}`;
  }
  check('34/21: every convergent equals the matrix product M₀⋯Mₙ, determinant (−1)ⁿ⁺¹, gcd 1, exact error', !worst, worst);
}
s = await rail(5);
check('ladder at n = 5: 13/8 after 8/5, six coefficients, determinant p₅q₄ − p₄q₅ = 13·5 − 8·8 = +1', s.ledger.conv.join() === '13,8' && s.ledger.prev.join() === '8,5' && s.ledger.det === '1' && s.ledger.count === 6);
for (const [P, Qd] of [
  [7, 2],
  [99, 70],
  [43, 19]
]) {
  s = await press(`[data-cf="${P}/${Qd}"]`);
  const a = cfN(P, Qd);
  check(`the chip ${P}/${Qd}: coefficients [${a.join(', ')}], the last convergent is P/Q`, s.cfP === P && s.cfQ === Qd && s.ledger.cf.a.join() === a.join() && eqQ(s.ledger.conv, Q(P, Qd)) && s.at.ladder === a.length - 1);
}
s = await dial('cfP', 89);
s = await dial('cfQ', 55);
{
  const a = cfN(89, 55);
  let worst = '';
  for (let n = 0; n < a.length; n++) {
    s = await rail(n);
    const M = continuant(a, n);
    if (BigInt(s.ledger.det) !== M[0] * M[3] - M[1] * M[2] || s.ledger.conv.join() !== [M[0], M[2]].join()) worst ||= `n = ${n}`;
  }
  check('the P and Q dials: 89/55 = [1; 1, …, 2], every determinant as the matrix product', s.preset === null && s.ledger.cf.a.join() === a.join() && !worst, worst);
}
{
  // all fractions P ≤ 60, Q ≤ 40: every prefix determinant (−1)^count by matrices
  let bad = 0,
    prefixes = 0;
  for (let P = 1; P <= 60; P++)
    for (let Qd = 1; Qd <= 40; Qd++) {
      const a = cfN(P, Qd);
      for (let n = 0; n < a.length; n++) {
        prefixes++;
        const M = continuant(a, n);
        if (M[0] * M[3] - M[1] * M[2] !== (n % 2 ? 1n : -1n)) bad++;
      }
    }
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check(`the page benchmark covers the same ${prefixes} prefixes of 2400 fractions, with no failure`, bad === 0 && bench.prefixes === prefixes && bench.fracs === 2400 && bench.cfBad === 0, JSON.stringify([prefixes, bench.prefixes]));
}

/* ---------- 1c. quarter depth ---------- */
s = await press('[data-hz="depth"]');
{
  const L = s.ledger;
  check('depth: c/d = 7/2, p/q = 1/10 gives quarterDepth 2 (least N with 70 < 2·4ᴺ⁺¹)', s.mode === 'depth' && L.N0 === 2 && leastDepth(7, 2, 1, 10) === 2 && L.cq === '70' && L.dp === '2');
  let worst = '';
  for (let N = 0; N <= 5; N++) {
    s = await rail(N);
    const r = s.ledger.row,
      ok = 70n < 2n * 4n ** B(N + 1);
    if (r.ok !== ok || r.rhs !== String(2n * 4n ** B(N + 1)) || !eqQ(r.share, Q(7, 2n * 4n ** B(N + 1))) || (cmpLess(r.share, Q(1, 10)) !== ok)) worst ||= `N = ${N}`;
  }
  check('the rail N = 0 … 5: cq < dp·4ᴺ⁺¹ exactly when (c/d)/4ᴺ⁺¹ < p/q; it fails at 0, 1 and holds from 2 (70 < 128)', !worst, worst);
}
function cmpLess(x, y) {
  return BigInt(x[0]) * BigInt(y[1]) < BigInt(y[0]) * BigInt(x[1]);
}
s = await dial('qc', 13);
s = await dial('qd', 3);
s = await dial('qp', 2);
s = await dial('qq', 17);
check('the c, d, p, q dials: 13/3 against 2/17 gives the least depth found by counting up', s.preset === null && JSON.stringify(s.dq) === '[13,3,2,17]' && s.ledger.N0 === leastDepth(13, 3, 2, 17) && s.at.depth === leastDepth(13, 3, 2, 17), JSON.stringify([s.ledger.N0, leastDepth(13, 3, 2, 17)]));
{
  let bad = 0;
  for (let c = 1; c <= 8; c++) for (let d = 1; d <= 8; d++) for (let p = 1; p <= 8; p++) for (let q = 1; q <= 8; q++) {
    const N0 = leastDepth(c, d, p, q);
    for (let N = N0; N <= N0 + 2; N++) if (!(B(c * q) < B(d * p) * 4n ** B(N + 1))) bad++;
  }
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('quarter depth on all 4096 choices in 1 … 8: sound from the least depth on; the page benchmark agrees', bad === 0 && bench.depths === 4096 && bench.depthBad === 0);
}
s = await press('#stageAct');
check('the stage button cycles the readings: depth → escape', s.mode === 'escape' && s.scene === 'horizon');

/* ---------- 2. the free group F₃ (Chapter 14) ---------- */
s = await pick(ADELIC);
{
  let worst = '';
  for (let L = 0; L <= 5; L++) {
    s = await rail(L);
    const n = countWords(L);
    if (s.ledger.now !== String(n) || s.ledger.L !== L) worst ||= `L = ${L}: page ${s.ledger.now}, enumerated ${n}`;
  }
  check('tree: reduced words of length L = 0 … 5 are 1, 6, 30, 150, 750, 3750 (all strings enumerated)', !worst && s.ledger.words.join() === '1,6,30,150,750,3750' && s.ledger.total === '4687', worst);
}
{
  let worst = '';
  for (let g = 0; g < 6; g++) {
    s = await press(`[data-gen="${g}"]`);
    const S = splitN(GEN_Q[g]),
      S5 = S.map(mod5N),
      [u, v, x, y] = LEAN_FACTORS[g].map(BigInt),
      O = [u * x, u * y, v * x, v * y].map(mod5N),
      zeros = range(6).filter((h) => {
        const H = splitN(GEN_Q[h]).map(mod5N);
        return m2(S5, H).map(mod5N).every((z) => z === 0n);
      });
    const sp = s.ledger.split,
      ok = sp.S.join() === S.join() && sp.S5.join() === S5.join() && S5.join() === O.join() && S5.some((z) => z !== 0n) && sp.F.join() === LEAN_FACTORS[g].join() && sp.rankOne && sp.nonzero && zeros.length === 1 && zeros[0] === OPPOSITE[g] && sp.zeroWith.map((z, h) => z === (h === OPPOSITE[g])).every(Boolean);
    if (!ok) worst ||= `g = ${g}: ${sp.S5} vs ${S5}, outer ${O}`;
  }
  check('mod_five_rank_one: each split w·1 + x·i + y·j + z·k (i ↦ diag(2, −2), j ↦ [[0, 1], [−1, 0]]) is the Lean outer product mod 5, nonzero; only the inverse multiplies it to 0', !worst, worst);
}
{
  // compose words with the generator chips: a letter next to its inverse cancels, and every reduced word keeps the
  // denominator 5^L (its integer matrix 5^L R(w), from the quaternion action computed here, is not ≡ 0 mod 5)
  const rot5 = (g) => {
    const [w, x, y, z] = GEN_Q[g].map(BigInt),
      qm = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
    // column e of 5R(g) is the vector part of g·e·ḡ
    const cols = [1, 2, 3].map((e) => qm(qm([w, x, y, z], range(4).map((i) => (i === e ? 1n : 0n))), [w, -x, -y, -z]).slice(1));
    return range(9).map((i) => cols[i % 3][Math.floor(i / 3)]);
  };
  const m3 = (A, C) => range(9).map((i) => range(3).reduce((acc, k) => acc + A[3 * Math.floor(i / 3) + k] * C[3 * k + (i % 3)], 0n));
  s = await press('#wordClear');
  check('clear empties the word: L = 0', s.word.length === 0 && s.at.tree === 0 && s.ledger.w.L === 0);
  let worst = '';
  for (const g of [0, 2, 4, 1, 3]) {
    s = await press(`[data-gen="${g}"]`);
    const M = s.word.reduce((acc, h) => m3(acc, rot5(h)), [1n, 0n, 0n, 0n, 1n, 0n, 0n, 0n, 1n]);
    if (!s.ledger.w.exact || s.ledger.w.M.join() !== M.join() || M.every((v) => v % 5n === 0n) || s.at.tree !== s.word.length) worst ||= `after ${g}: ${s.word}`;
  }
  check('composing 1+2i, 1+2j, 1+2k, 1−2i, 1−2j: 5ᴸR(w) (from g·v·ḡ) is never ≡ 0 mod 5, so the denominator is exactly 5ᴸ', !worst && s.word.join() === '0,2,4,1,3', worst || s.word.join());
  s = await press('[data-gen="2"]');
  check('pressing the inverse of the last letter cancels it: 1−2j then 1+2j gives back the word of length 4', s.word.join() === '0,2,4,1' && s.at.tree === 4);
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('the page benchmark: brute-force counts 1, 6, 30, 150, 750, no adjoint word ≡ 0 mod 5, no two words of a level equal', bench.counts.join() === '1,6,30,150,750' && bench.mod5Bad === 0 && bench.collisions === 0 && bench.splitBad === 0);
}

/* ---------- 2b. the adelic product ---------- */
s = await press('[data-ad="balance"]');
function adelicN(P, Qd) {
  const fP = factorN(P),
    fQ = factorN(Qd),
    primes = [...new Set([...fP.keys(), ...fQ.keys()])].sort((a, b) => a - b),
    g = steinN(B(P), B(Qd)),
    inf = Q(absN(B(P)) / g, B(Qd) / g),
    norms = primes.map((p) => {
      const v = (fP.get(p) || 0) - (fQ.get(p) || 0);
      return [p, v === 0 ? null : v >= 0 ? Q(1, B(p) ** B(v)) : Q(B(p) ** B(-v), 1)];
    }).filter(([, x]) => x);
  return { inf, norms, product: norms.reduce((acc, [, x]) => mulQ(acc, x), inf) };
}
{
  const want = adelicN(-18, 35),
    L = s.ledger;
  check('balance: r = −18/35, |r|∞ = 18/35, |r|₂ = 1/2, |r|₃ = 1/9, |r|₅ = 5, |r|₇ = 7, product 1', s.mode === 'balance' && strQ(L.r) === '-18/35' && eqQ(L.places[0].f, want.inf) && L.places.slice(1).map((p) => `${p.v}:${strQ(p.f)}`).join() === want.norms.map(([p, x]) => `${p}:${strQ(x)}`).join() && eqQ(L.product, ONE) && eqQ(want.product, ONE));
  let worst = '';
  let run = ONE;
  for (let j = 0; j <= L.J; j++) {
    s = await rail(j);
    if (j > 0) run = mulQ(run, j === 1 ? want.inf : want.norms[j - 2][1]);
    if (!eqQ(s.ledger.now, run) || !reducedQ(s.ledger.now)) worst ||= `j = ${j}`;
  }
  check('the rail multiplies the places in turn: 1 → 18/35 → 9/35 → 1/35 → 1/7 → 1', !worst && eqQ(run, ONE), worst);
}
for (const [P, Qd] of [
  [31, 1],
  [6, 1],
  [12, 49]
]) {
  s = await press(`[data-r="${P}/${Qd}"]`);
  const want = adelicN(P, Qd);
  check(`the chip r = ${P}/${Qd}: the places and their product 1`, s.rP === P && s.rQ === Qd && eqQ(s.ledger.product, ONE) && s.ledger.places.length === 1 + want.norms.length && eqQ(s.ledger.places[0].f, want.inf));
}
s = await dial('rP', -45);
s = await dial('rQ', 28);
{
  const want = adelicN(-45, 28);
  check('the P and Q dials: r = −45/28 and |r|∞ ∏ |r|ₚ = 1', s.preset === null && strQ(s.ledger.r) === '-45/28' && eqQ(s.ledger.product, ONE) && eqQ(want.product, ONE) && s.ledger.places.length === 1 + want.norms.length);
}
s = await dial('rP', 0);
check('the zero numerator is refused: r stays nonzero', s.rP !== 0, String(s.rP));
{
  let bad = 0;
  for (let P = -30; P <= 30; P++) for (let Qd = 1; Qd <= 30; Qd++) if (P && !eqQ(adelicN(P, Qd).product, ONE)) bad++;
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('the product formula on all 1800 rationals |P| ≤ 30, Q ≤ 30 (sieve factorization); the page benchmark agrees', bad === 0 && bench.rats === 1800 && bench.adelicBad === 0);
}

/* ---------- 3. scalar FRACTRAN (Chapter 16) ---------- */
s = await pick(MACHINE);
const MACH = runMachine();
check('the register machine on exponents halts after 15 steps at (1, 0, 0, 0, 1) = 22', MACH.states.length === 16 && MACH.values[15] === 22n && MACH.states[15].join() === '1,0,0,0,1');
{
  const trace = await page.evaluate(() => window.ARCLAB_DEBUG.trace());
  check('the page trace M₁ … M₁₆ equals the register machine, rule by rule, and halts', JSON.stringify(trace.states) === JSON.stringify(MACH.values.map(String)) && trace.steps.slice(0, 15).every((st, i) => st.i === MACH.fired[i]) && trace.steps[15].i === -1 && trace.steps.length === 16);
  let worst = '';
  for (let t = 0; t <= 15; t++) {
    s = await rail(t);
    const L = s.ledger;
    if (L.N !== String(MACH.values[t]) || L.regs.join() !== MACH.states[t].join() || L.halted !== (t === 15)) worst ||= `t = ${t}`;
    // determinism: from this state exactly one rule is first enabled, and it gives the next state
    const enabled = [49n, 25n, 9n, 4n].map((b) => MACH.values[t] % b === 0n),
      first = enabled.indexOf(true);
    if (L.step.enabled.join() !== enabled.join() || L.step.i !== first || (first >= 0 && L.step.m !== String(MACH.values[t + 1]))) worst ||= `t = ${t} step`;
  }
  check('the rail t = 0 … 15: N, the exponents, the enabled gates and the one successor of the first enabled gate', !worst, worst);
}
check('FRACTRAN still: M₁₆ = 22 = 2·11, no gate enabled (49, 25, 9, 4 ∤ 22)', s.key === '22' && s.ledger.halted && s.ledger.step.enabled.every((x) => !x));
{
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('the page benchmark: the first enabled gate gives one successor for n = 1 … 3000', bench.fracBad === 0);
}

/* ---------- 3b. Mat₂ ---------- */
s = await press('#stageAct');
const matN = (A, Bm) => {
  const [a, b, c, d] = A,
    tr = a + d,
    det = a * d - b * c,
    A2 = [a * a + b * c, a * b + b * d, c * a + d * c, c * b + d * d],
    AB = m2(A.map(B), Bm.map(B)).map(Number),
    BA = m2(Bm.map(B), A.map(B)).map(Number);
  return { tr, det, A2, CH: [A2[0] - tr * a + det, A2[1] - tr * b, A2[2] - tr * c, A2[3] - tr * d + det], adj: [d, -b, -c, a], trAB: AB[0] + AB[3], trBA: BA[0] + BA[3], detAB: AB[0] * AB[3] - AB[1] * AB[2], detB: Bm[0] * Bm[3] - Bm[1] * Bm[2] };
};
{
  const want = matN([2, 3, 1, 4], [1, -2, 5, 3]),
    L = s.ledger;
  check('the stage button switches to Mat₂: A = [[2, 3], [1, 4]], tr 6, det 5, A² = [[7, 18], [6, 19]], A² − 6A + 5I = 0', s.mode === 'mat2' && L.tr === '6' && L.det === '5' && L.A2.join() === want.A2.join() && L.CH.every((x) => x === '0') && want.CH.every((x) => x === 0));
  check('tr(AB) = tr(BA) = 27, det(AB) = 65 = 5·13, A·adj(A) = adj(A)·A = 5I', L.trAB === '27' && L.trBA === '27' && want.trAB === 27 && L.detAB === '65' && want.detAB === 65 && L.adjL.join() === '5,0,0,5' && L.adjR.join() === '5,0,0,5');
  let worst = '';
  const parts = [[0, 0, 0, 0], want.A2, want.A2.map((x, i) => x - 6 * [2, 3, 1, 4][i]), want.CH];
  for (let k = 0; k <= 3; k++) {
    s = await rail(k);
    if (s.ledger.partial[k].join() !== parts[k].join()) worst ||= `k = ${k}`;
  }
  check('the rail adds A², −tr(A)·A, det(A)·I in turn; the running sum ends at the zero matrix', !worst, worst);
}
{
  const A = [-5, 4, 6, -2],
    Bm = [3, -6, 2, 5];
  for (const [i, id] of ['ma', 'mb', 'mc', 'md'].entries()) s = await dial(id, A[i]);
  for (const [i, id] of ['me', 'mf', 'mg', 'mh'].entries()) s = await dial(id, Bm[i]);
  const want = matN(A, Bm),
    L = s.ledger;
  check('the eight dials set A and B; Cayley–Hamilton, the adjugate, trace cyclicity and det(AB) = det(A)det(B) hold', s.preset === null && JSON.stringify(s.A) === JSON.stringify(A) && JSON.stringify(s.B) === JSON.stringify(Bm) && L.tr === String(want.tr) && L.det === String(want.det) && L.CH.every((x) => x === '0') && L.trAB === String(want.trAB) && L.trBA === String(want.trBA) && L.detAB === String(want.detAB) && L.detAB === String(want.det * want.detB) && L.adjL.join() === [want.det, 0, 0, want.det].join());
  let bad = 0;
  const span = range(7).map((k) => k - 3);
  for (const a of span) for (const b of span) for (const c of span) for (const d of span) if (matN([a, b, c, d], [1, 0, 0, 1]).CH.some((x) => x !== 0)) bad++;
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('Cayley–Hamilton on all 2401 matrices in [−3, 3]⁴; the page benchmark agrees (and 50625 pairs for tr, det)', bad === 0 && bench.chTried === 2401 && bench.chBad === 0 && bench.pairsAB === 50625 && bench.matBad === 0);
}
s = await press('[data-mc="fractran"]');
check('the reading chips go back to FRACTRAN', s.mode === 'fractran' && s.max === 15);

/* ---------- 4. the static canvas (Chapter 17) ---------- */
s = await pick(CANVAS);
{
  const L = s.ledger;
  check('canvas still: κ_time = 16/25, κ_space = 9/25, sum 1; Δτ² = Δt² − Δx² as 16 = 25 − 9', strQ(L.kt) === '16/25' && strQ(L.ks) === '9/25' && eqQ(L.sum, ONE) && L.dtau2 === '16' && L.dt2 === '25' && L.dx2 === '9');
  check('u = 1/3: Δτ/Δt = 4/5, v = 3/5, γ² − (γv)² = 25/16 − 9/16 = 1', strQ(L.root) === '4/5' && strQ(L.vel) === '3/5' && strQ(L.u) === '1/3' && strQ(L.gamma2) === '25/16' && strQ(L.gv2) === '9/16' && eqQ(subQ(L.gamma2.map(BigInt), L.gv2.map(BigInt)), ONE));
  const expectedBeats = canvasBeatsN(false);
  const want = expectedBeats.map(({ tau }) => tau);
  check('canvas still at beat 3: structural time τ = 0 → 0 → 1/2 → 2 (Gram-determinant innovation + integer cycle rank)', L.t === 3 && want.slice(0, 4).map(strQ).join() === '0,0,1/2,2' && L.taus.slice(0, 4).map(strQ).join() === '0,0,1/2,2' && strQ(L.tau) === '2', L.taus.map(strQ).join());
  const tr3 = FERMIONS.reduce((acc, [m, t]) => addQ(acc, Q(m * t * t, 4)), ZERO),
    trq = FERMIONS.reduce((acc, [m, , q]) => addQ(acc, Q(m * q * q, 9)), ZERO);
  check('sin²θ_W = Tr(T₃²)/Tr(Q²) = 2/(16/3) = 3/8 from the charges of one generation', strQ(L.trT3) === strQ(tr3) && strQ(L.trQ) === strQ(trq) && strQ(L.weinberg) === strQ(divQ(tr3, trq)) && strQ(divQ(tr3, trq)) === '3/8');
  let worst = '';
  for (let t = 0; t <= 6; t++) {
    s = await rail(t);
    const { graph, schur } = expectedBeats[t];
    if (!eqQ(s.ledger.tau, want[t]) || !eqQ(s.ledger.beat.schur, schur)
        || Object.keys(graph).some((key) => s.ledger.beat.graph[key] !== graph[key])) worst ||= `t = ${t}: ${strQ(s.ledger.tau)} vs ${strQ(want[t])}`;
  }
  check('the rail over beats 0 … 6: τ = 0, 0, 1/2, 2, 9/4, 13/4, 17/4 with integer Betti steps and no Schur innovation after full span', !worst && want.map(strQ).join() === '0,0,1/2,2,9/4,13/4,17/4', worst || want.map(strQ).join());
}
for (const [u, want] of [
  ['0', Q(1)],
  ['1/5', Q(144, 169)],
  ['1/2', Q(9, 25)],
  ['2/3', Q(25, 169)],
  ['1/3', Q(16, 25)]
]) {
  s = await press(`[data-u="${u}"]`);
  const [p, q = '1'] = u.split('/'),
    uu = Q(p, q),
    ratio = divQ(subQ(ONE, mulQ(uu, uu)), addQ(ONE, mulQ(uu, uu)));
  check(`the chip u = ${u}: κ_time = ((1 − u²)/(1 + u²))² = ${strQ(want)}, and the page recovers u`, eqQ(s.ledger.kt, mulQ(ratio, ratio)) && eqQ(s.ledger.kt, want) && eqQ(addQ(s.ledger.kt.map(BigInt), s.ledger.ks.map(BigInt)), ONE) && eqQ(s.ledger.u, uu));
}
s = await dial('kP', 7);
s = await dial('kQ', 12);
check('the P and Q dials: κ_time = 7/12 (not a rational square): κ_space = 5/12, γ² = 12/7, (γv)² = 5/7', s.preset === null && strQ(s.ledger.kt) === '7/12' && strQ(s.ledger.ks) === '5/12' && s.ledger.root === null && strQ(s.ledger.gamma2) === '12/7' && strQ(s.ledger.gv2) === '5/7');
s = await press('[data-idle="1"]');
{
  const idle = beatsN(true);
  let worst = '';
  for (let t = 0; t <= 6; t++) {
    s = await rail(t);
    if (!eqQ(s.ledger.tau, idle[t]) || s.ledger.beat.graph.betti !== 0 || s.ledger.beat.graph.vertices !== 1 || s.ledger.moved !== 0) worst ||= `t = ${t}`;
  }
  check('the idle loop [x, x, x] = x re-scans the seed: Δτ = 0 every beat, τ = 0 and the focus stays', s.idle === 1 && s.ledger.idle && !worst && idle.every((x) => eqQ(x, ZERO)), worst);
}
s = await press('#stageAct');
check('the stage button toggles the idle loop back off', s.idle === 0 && eqQ(s.ledger.tau, beatsN(false)[s.t]) && s.ledger.moved === Math.max(0, s.t - 1));
{
  let worst = '';
  for (const n of [3, 4, 5, 6, 7, 8]) {
    s = await press(`[data-nb="${n}"]`);
    let pairs = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pairs++;
    const dE = pairs - (3 * n - 6);
    if (s.ledger.dE[0] !== String(dE) || dE * 2 !== (n - 3) * (n - 4) || s.ledger.pairs !== String(pairs)) worst ||= `N = ${n}`;
  }
  check('ΔE(N) = (pairs counted) − (3N − 6) = (N − 3)(N − 4)/2: 0, 0, 1, 3, 6, 10 for N = 3 … 8', !worst, worst);
}
{
  const bench = await page.evaluate(() => window.ARCLAB_DEBUG.bench());
  check('the page benchmark: 1890 splits P/Q with 0 ≤ P ≤ Q ≤ 60, sums 1 and γ² − (γv)² = 1', bench.splits === 1890 && bench.splitSumBad === 0 && bench.dEBad === 0);
}

/* ---------- lens, views, keyboard ---------- */
s = await pick(HORIZON);
const before = JSON.stringify(s.ledger),
  bigBefore = await page.textContent('#hudBig');
s = await press('#lensToggleBtn');
check('the lens changes names, not the state', s.lens === 1 && JSON.stringify(s.ledger) === before && (await page.textContent('#hudBig')) !== bigBefore && (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true');
s = await press('#lensToggleBtn');
check('… and back', s.lens === 0);
const pitch0 = s.camera.pitch;
s = await press('[data-cam="top"]');
check('the view chips turn the camera (top)', s.cam === 'top' && (await until(page, (p) => Math.abs(window.ARCLAB_DEBUG.state.camera.pitch - p) > 0.3, pitch0)));
s = await press('[data-cam="card"]');
await until(page, (p) => Math.abs(window.ARCLAB_DEBUG.state.camera.pitch - p) < 1e-6, pitch0);
await pick(HORIZON);
check('Space plays', await playsAfter(page, () => page.keyboard.press(' '), () => window.ARCLAB_DEBUG.state));
await page.keyboard.press(' ');
check('Space pauses', !(await state()).playing);
await page.locator('[data-speed="2"]').evaluate((b) => b.click());
check('a card plays from its start', await playsAfter(page, () => page.click(`[data-preset="${MACHINE}"]`), () => window.ARCLAB_DEBUG.state));
check('… and parks on its still', await until(page, () => { const d = window.ARCLAB_DEBUG.state; return !d.playing && d.t === 15 && d.preset === 'scalar-fractran-and-mat2'; }));
await page.locator('[data-speed="1"]').evaluate((b) => b.click());
check('no stage labels on top of each other after all this', (await labelOverlaps(page, '.stage .tag')).length === 0);
check('no sideways scrolling', (await overflowX(page)) <= 0);

/* ---------- the stills a chapter would print ---------- */
const CAPTIONS = {
  [HORIZON]: (d) => d.mode === 'escape' && d.ledger.N === '30031' && d.ledger.q === '59' && d.at.escape === 6,
  [ADELIC]: (d) => d.mode === 'tree' && d.ledger.now === '3750' && d.at.tree === 5,
  [MACHINE]: (d) => d.mode === 'fractran' && d.ledger.N === '22' && d.ledger.halted && d.at.fractran === 15,
  [CANVAS]: (d) => d.mode === 'canvas' && strQ(d.ledger.kt) === '16/25' && strQ(d.ledger.tau) === '2' && d.at.canvas === 3
};
for (const [card, ok] of Object.entries(CAPTIONS))
  for (const lang of ['zh', 'en']) {
    const p = await openStill(T, BOOK, ID, card, lang),
      d = await p.evaluate(() => window.ARCLAB_DEBUG.state);
    check(`still ${card} (${lang}): the frame carries the numbers of its note`, d.preset === card && !d.playing && ok(d), JSON.stringify([d.preset, d.t]));
    await p.context().close();
  }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
