#!/usr/bin/env node
// Browser regression suite for omega-math/viz/dfinite-algebraic-schur-lab (Playwright + Chromium):
//   node books/omega-math/viz/tests/dfinite-algebraic-schur-lab.test.mjs        (or node tools/node/viz-test.mjs omega-math)
// stageFirstChecks is the battery every stage-first page must pass, here with the lit-solid checks. After it come the
// checks of this page: one for every control, and one for each property the page claims, against independent
// mathematics written below in big integers (never by calling the page's own functions): power series by repeated
// products of truncated arrays, tangent addition and Gaussian-integer products, cochains tabulated over all ordered
// tuples by inversion counts, explicit Chebyshev sums, quaternions as 4 × 4 matrices, ℚ(√2) and ℚ(φ) as rational
// matrices, and the sphere moments of the d orbitals by Gauss–Legendre quadrature. The page is read through its
// read-only probe window.JETLAB_DEBUG, whose fractions are [numerator, denominator] pairs of decimal strings.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../../../tools/node/viz-common.mjs';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, labelOverlaps, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'omega-math';
const ID = 'dfinite-algebraic-schur-lab';
const CARDS = {
  'dfinite-cayley-machin': { key: 'jet:cayley', still: 10 },
  'simplicial-stokes-cone': { key: 'cone:cone', still: 8 },
  'peter-weyl-even-chebyshev': { key: 'shell:shell', still: 8 },
  'quadratic-ext-and-schur': { key: 'quad:schur', still: 16 }
};
const [JET, CONE, SHELL, QUAD] = Object.keys(CARDS);
const GIDS = [
  'D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq',
  'D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_unique_at',
  'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.machin_rational_chain',
  'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff',
  'D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.even_chebyshev',
  'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min'
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
const ltQ = (x, y) => BigInt(x[0]) * BigInt(y[1]) < BigInt(y[0]) * BigInt(x[1]);
const strQ = ([p, q]) => `${p}${BigInt(q) === 1n ? '' : '/' + q}`;
const fl = (x) => Number(BigInt(x[0])) / Number(BigInt(x[1]));
/** A probe fraction (decimal strings) as a pair of big integers. */
const B = (x) => [BigInt(x[0]), BigInt(x[1])];
/** A probe spinor [[p, q], [r, s]] (p + qδ) + (r + sδ)i with big-integer fractions. */
const spinB = (w) => w.map((z) => z.map(B));
let FACT = [1n];
for (let i = 1; i <= 40; i++) FACT.push(FACT[i - 1] * BigInt(i));
const binom = (n, k) => (k < 0 || k > n ? 0n : FACT[n] / (FACT[k] * FACT[n - k]));

/* jets: truncated series as arrays of rationals, products by a degree-major double loop */
const serMul = (a, b, N) => range(N + 1).map((d) => range(d + 1).reduce((s, i) => addQ(s, mulQ(a[i] || ZERO, b[d - i] || ZERO)), ZERO));
/** cos(2 Atan_N η) and sin(2 Atan_N η) mod η^{N+1} through the powers of A = 2 Atan_N η. */
function composite(N) {
  const A = range(N + 1).map((k) => (k % 2 ? Q((((k - 1) / 2) % 2 ? -2n : 2n), BigInt(k)) : ZERO));
  const pw = [range(N + 1).map((k) => (k ? ZERO : ONE))];
  for (let k = 1; k <= N; k++) pw.push(serMul(pw[k - 1], A, N));
  let c = range(N + 1).map(() => ZERO),
    s = range(N + 1).map(() => ZERO);
  for (let j = 0; j <= N; j++) {
    const coef = Q(j % 4 < 2 ? 1n : -1n, FACT[j]); // cos: +, sin: +, cos: −, sin: − for j ≡ 0, 1, 2, 3 (mod 4)
    if (j % 2 === 0) c = c.map((x, i) => addQ(x, mulQ(coef, pw[j][i])));
    else s = s.map((x, i) => addQ(x, mulQ(coef, pw[j][i])));
  }
  return { c, s };
}
/** (1 − η²)/(1 + η²) and 2η/(1 + η²) mod η^{N+1} by the geometric series of 1/(1 + η²). */
function cayleySeries(N) {
  const g = range(N + 1).map((k) => (k % 2 ? ZERO : Q((k / 2) % 2 ? -1n : 1n)));
  const num = range(N + 1).map((k) => (k === 0 ? ONE : k === 2 ? Q(-1) : ZERO)),
    two = range(N + 1).map((k) => (k === 1 ? Q(2) : ZERO));
  return { c: serMul(num, g, N), s: serMul(two, g, N) };
}
const evalSer = (p, x) => p.reduce((acc, c, k) => addQ(acc, mulQ(c, range(k).reduce((t) => mulQ(t, x), ONE))), ZERO);
const HALF = Q(1, 2);

/* Machin: tangent addition (u + v)/(1 − uv) and Gaussian-integer products z = q + pi */
const tadd = (u, v) => divQ(addQ(u, v), subQ(ONE, mulQ(u, v)));
const tsub = (u, v) => divQ(subQ(u, v), addQ(ONE, mulQ(u, v)));
const gmul = ([p1, q1], [p2, q2]) => {
  // (q1 + p1 i)(q2 + p2 i) = (q1q2 − p1p2) + (q1p2 + p1q2) i
  const re = q1 * q2 - p1 * p2,
    im = q1 * p2 + p1 * q2;
  return [im, re];
};
/** A_M(x) = x Σ_{k<M} (−x²)^k/(2k + 1), by Horner in −x². */
const AM = (M, x) => {
  const y = mulQ(Q(-1), mulQ(x, x));
  let s = ZERO;
  for (let k = M - 1; k >= 0; k--) s = addQ(Q(1, 2 * k + 1), mulQ(y, s));
  return mulQ(x, s);
};
function bracketN(M) {
  const a = [AM(M, Q(1, 5)), AM(M + 1, Q(1, 5))],
    b = [AM(M, Q(1, 239)), AM(M + 1, Q(1, 239))],
    lo = (u, v) => (ltQ(u, v) ? u : v),
    hi = (u, v) => (ltQ(u, v) ? v : u);
  const L = subQ(mulQ(Q(16), lo(...a)), mulQ(Q(4), hi(...b))),
    U = subQ(mulQ(Q(16), hi(...a)), mulQ(Q(4), lo(...b)));
  return { L, U, W: subQ(U, L) };
}

/* cochains on V = {0, 1, 2, 3}: alternating values through the parity of the inversion count */
const V4 = [0, 1, 2, 3];
const parity = (t) => {
  if (new Set(t).size < t.length) return 0n;
  let inv = 0;
  for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) if (t[i] > t[j]) inv++;
  return inv % 2 ? -1n : 1n;
};
const sortedKey = (t) => [...t].sort((a, b) => a - b).join('');
const EDGE_KEYS = ['01', '02', '03', '12', '13', '23'],
  FACE_KEYS = ['012', '013', '023', '123'];
const altE = (vals) => (x, y) => parity([x, y]) * (vals[EDGE_KEYS.indexOf(sortedKey([x, y]))] ?? 0n);
const altF = (vals) => (x, y, z) => parity([x, y, z]) * (vals[FACE_KEYS.indexOf(sortedKey([x, y, z]))] ?? 0n);
const T3 = V4.flatMap((x) => V4.flatMap((y) => V4.map((z) => [x, y, z]))),
  T4 = V4.flatMap((x) => T3.map((t) => [x, ...t]));
/** The cochains of a page state, all in big integers. */
function cochainsN(s) {
  const f = (v) => BigInt(s.f[v]),
    phi = altE(s.phi.map(BigInt)),
    e1 = (x, y) => phi(x, y) + f(y) - f(x),
    omega = altF([0n, 0n, 0n, 1n]),
    F = (x, y, z) => e1(y, z) + e1(x, y) - e1(x, z) + BigInt(s.kdef) * omega(x, y, z),
    dF = (x, y, z, w) => F(y, z, w) + F(x, y, w) - F(x, z, w) - F(x, y, z),
    b = s.base,
    e = (x, y) => F(b, x, y),
    de = (x, y, z) => e(y, z) + e(x, y) - e(x, z),
    opp = V4.filter((v) => v !== b);
  return { e1, F, dF, e, de, opp, faces: FACE_KEYS.map((k) => F(+k[0], +k[1], +k[2])), circ: [F(0, 1, 3) - BigInt(s.kdef) * omega(0, 1, 3), e1(1, 2) + e1(2, 3) - e1(1, 3)], boundary: e1(0, 1) + e1(1, 2) + e1(2, 3) + e1(3, 0) };
}

/* quaternions as 4 × 4 rational matrices of left multiplication */
const leftM = ([w, x, y, z]) => [
  [w, mulQ(Q(-1), x), mulQ(Q(-1), y), mulQ(Q(-1), z)],
  [x, w, mulQ(Q(-1), z), y],
  [y, z, w, mulQ(Q(-1), x)],
  [z, mulQ(Q(-1), y), x, w]
];
const qmulM = (a, b) => leftM(a).map((row) => row.reduce((s, v, j) => addQ(s, mulQ(v, b[j])), ZERO));
const qinv = ([w, x, y, z]) => {
  const n = [w, x, y, z].reduce((s, v) => addQ(s, mulQ(v, v)), ZERO);
  return [divQ(w, n), divQ(mulQ(Q(-1), x), n), divQ(mulQ(Q(-1), y), n), divQ(mulQ(Q(-1), z), n)];
};

/* Chebyshev: U_m(x) = Σ_k (−1)^k C(m − k, k) (2x)^{m−2k}; E_n(κ) from the even coefficients of U_{2n} */
const Uexp = (m) => {
  const c = range(m + 1).map(() => 0n);
  for (let k = 0; 2 * k <= m; k++) c[m - 2 * k] += (k % 2 ? -1n : 1n) * binom(m - k, k) * 2n ** BigInt(m - 2 * k);
  return c;
};
const Eexp = (n) => Uexp(2 * n).filter((_, i) => i % 2 === 0);
const evalZ = (c, x) => c.reduce((s, a, i) => s + a * x ** BigInt(i), 0n);
const evalQc = (c, x) => c.reduce((s, a, i) => addQ(s, mulQ(Q(a), range(i).reduce((t) => mulQ(t, x), ONE))), ZERO);

/* sphere moments by quadrature: Gauss–Legendre in t = cos θ (exact to degree 2n − 1) × the trapezoid rule in φ */
function gaussLegendre(n) {
  const xs = [],
    ws = [];
  for (let i = 1; i <= n; i++) {
    let x = Math.cos((Math.PI * (i - 0.25)) / (n + 0.5));
    for (let it = 0; it < 100; it++) {
      let p0 = 1,
        p1 = x;
      for (let k = 2; k <= n; k++) [p0, p1] = [p1, ((2 * k - 1) * x * p1 - (k - 1) * p0) / k];
      const dp = (n * (x * p1 - p0)) / (x * x - 1),
        dx = p1 / dp;
      x -= dx;
      if (Math.abs(dx) < 1e-16) break;
    }
    let p0 = 1,
      p1 = x;
    for (let k = 2; k <= n; k++) [p0, p1] = [p1, ((2 * k - 1) * x * p1 - (k - 1) * p0) / k];
    const dp = (n * (x * p1 - p0)) / (x * x - 1);
    xs.push(x);
    ws.push(2 / ((1 - x * x) * dp * dp));
  }
  return { xs, ws };
}
const GL = gaussLegendre(10);
const sphereMean = (f) => {
  let s = 0;
  const M = 24;
  GL.xs.forEach((t, i) => {
    const r = Math.sqrt(1 - t * t);
    for (let j = 0; j < M; j++) {
      const ph = (2 * Math.PI * j) / M;
      s += GL.ws[i] * f([r * Math.cos(ph), r * Math.sin(ph), t]) * (2 * Math.PI) / M;
    }
  });
  return s / (4 * Math.PI);
};
const DORB = {
  z2: (n) => 2 * n[2] * n[2] - n[0] * n[0] - n[1] * n[1],
  xz: (n) => n[0] * n[2],
  yz: (n) => n[1] * n[2],
  xy: (n) => n[0] * n[1],
  x2y2: (n) => n[0] * n[0] - n[1] * n[1]
};

/* ℚ(√2) and its spinors as rational matrices: p + qδ ↦ [[p, 2q], [q, p]], A + Bi ↦ [[A, −B], [B, A]] */
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => addQ(s, mulQ(v, B[k][j])), ZERO)));
const s2M = ([p, q]) => [
  [p, mulQ(Q(2), q)],
  [q, p]
];
const block = (A, B) => {
  const nB = B.map((r) => r.map((v) => mulQ(Q(-1), v)));
  return [...A.map((r, i) => [...r, ...nB[i]]), ...B.map((r, i) => [...r, ...A[i]])];
};
const spinM = (w) => block(s2M(w[0]), s2M(w[1]));
const eye = (n, k = ONE) => range(n).map((i) => range(n).map((j) => (i === j ? k : ZERO)));
const matEq = (A, B) => A.every((r, i) => r.every((v, j) => eqQ(v, B[i][j])));

/* ---------- the quality gate ---------- */
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const state = async () => {
  await settle(page);
  return page.evaluate(() => window.JETLAB_DEBUG.state);
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
const exact = await page.evaluate(() => window.JETLAB_DEBUG.exact());
const bench = await page.evaluate(() => window.JETLAB_DEBUG.bench());

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the Cayley card, parked at its still N = 12', s.preset === JET && s.key === 'jet:cayley' && s.t === 10 && !s.playing && s.ledger.N === 12, JSON.stringify([s.preset, s.key, s.t, s.playing]));
const declared = await page.evaluate(() => [...document.querySelectorAll('[data-preset]')].map((b) => [b.dataset.preset, b.dataset.still]));
check('four cards with the brief’s ids, each declares its still', JSON.stringify(declared) === JSON.stringify(Object.entries(CARDS).map(([id, c]) => [id, String(c.still)])), JSON.stringify(declared));
const green = await page.$$eval('#basis .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen) a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid));
check('six green boxes, exactly the six theorems of the registry entry, in order', JSON.stringify(green) === JSON.stringify(GIDS), green.join(' | '));
{
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')),
    entry = registry.visualizations.find((v) => v.id === ID);
  check('registry: the entry lists the six GIDs and chapters 8, 9, 10, 12', !!entry && JSON.stringify(entry.lean.map((x) => x.gid)) === JSON.stringify(GIDS) && JSON.stringify(entry.theory.map((t) => t.href.match(/ch(\d+)/)[1])) === '["08","09","10","12"]', JSON.stringify(entry && entry.theory.map((t) => t.href)));
}
check('the theory drawer and the NUM box say: not a proof', (await page.textContent('#drawer .zh .lede')).includes('不是证明') && (await page.textContent('#drawer .en .lede')).includes('not a proof') && (await page.textContent('#basis .lean.num .en')).includes('not a proof'));

/* ---------- 1. Cayley–trig unification in J_N(ℚ) ---------- */
{
  let worst = '';
  for (let k = 0; k <= 10; k++) {
    s = await rail(k);
    const N = 2 + k,
      L = s.ledger,
      comp = composite(N),
      cay = cayleySeries(N),
      U = evalSer(cay.c, HALF),
      Vv = evalSer(cay.s, HALF),
      // the tails of geometric series: U_N − 3/5 = (−1)^m·2/(5·4^m) with m = ⌊N/2⌋ (an odd order adds no even
      // coefficient), V_N − 4/5 = −(−1)^{m'}·4/(5·4^{m'}) with m' = ⌊(N + 1)/2⌋
      m = Math.floor(N / 2),
      m2 = Math.floor((N + 1) / 2),
      eu = Q(m % 2 ? -2n : 2n, 5n * 4n ** BigInt(m)),
      ev = Q(m2 % 2 ? 4n : -4n, 5n * 4n ** BigInt(m2));
    const ok =
      L.N === N &&
      comp.c.every((x, i) => eqQ(x, cay.c[i]) && eqQ(x, s.coeffs.F[i])) &&
      comp.s.every((x, i) => eqQ(x, cay.s[i]) && eqQ(x, s.coeffs.G[i])) &&
      eqQ(L.U, U) &&
      eqQ(L.V, Vv) &&
      eqQ(L.eu, subQ(U, Q(3, 5))) &&
      eqQ(L.ev, subQ(Vv, Q(4, 5))) &&
      eqQ(L.eu, eu) &&
      eqQ(L.ev, ev) &&
      [L.U, L.V, L.eu, L.ev].every(reducedQ) &&
      L.unified &&
      L.pyth &&
      L.ode;
    if (!ok) worst ||= `N = ${N}: U = ${strQ(L.U)}, eu = ${strQ(L.eu)} vs ${strQ(eu)}`;
  }
  check('N = 2 … 12: Cos_N(2Atan_N η) ≡ (1 − η²)/(1 + η²), Sin_N(2Atan_N η) ≡ 2η/(1 + η²) mod η^{N+1} (series powers vs geometric series)', !worst, worst);
  s = await rail(10);
  const even = s.ledger.points.filter((p) => p.N % 2 === 0);
  check('… and at η = 1/2 the errors U_N − 3/5 of the even orders are −1/10, 1/40, −1/160, 1/640, −1/2560, 1/10240 (N = 2 … 12)', even.slice(0, 6).map((p) => strQ(p.eu)).join() === '-1/10,1/40,-1/160,1/640,-1/2560,1/10240');
  check('the Cayley point (3/5, 4/5) of t = 1/2 lies on the circle, and the truncated points of even order lie on one line through it (V − 4/5 = −2(U − 3/5))', eqQ(addQ(mulQ(Q(3, 5), Q(3, 5)), mulQ(Q(4, 5), Q(4, 5))), ONE) && even.every((p) => eqQ(p.ev, mulQ(Q(-2), B(p.eu)))) && !s.ledger.points.filter((p) => p.N % 2).every((p) => eqQ(p.ev, mulQ(Q(-2), B(p.eu)))));
  let ratios = true;
  for (let k = 2; k <= 10; k++) {
    const r = (await rail(k)).ledger;
    if (!eqQ(r.ratioU, Q(-1, 4)) || !eqQ(r.ratioV, Q(-1, 4))) ratios = false;
  }
  check('two orders up, the error is multiplied by −1/4 in both coordinates (N = 4 … 12)', ratios);
  s = await rail(10);
  // the nested evaluation without reducing: exact rationals here, compared to the page's exact value
  const at = range(13).map((k) => (k % 2 ? Q((((k - 1) / 2) % 2 ? -1n : 1n), BigInt(k)) : ZERO)),
    a2 = mulQ(Q(2), evalSer(at, HALF)),
    cosN = range(13).map((k) => (k % 2 ? ZERO : Q((k / 2) % 2 ? -1n : 1n, FACT[k]))),
    nested = subQ(evalSer(cosN, a2), Q(3, 5));
  check('the nested evaluation Cos_12(2 Atan_12(1/2)) − 3/5 is the exact rational of the page (≈ 1.235579·10⁻⁵, the chapter’s value)', eqQ(s.ledger.nu, nested) && Math.abs(fl(nested) - 1.235579e-5) < 5e-12, strQ(s.ledger.nu).slice(0, 40));
  check('the classical-lens row shows that value as a decimal', (await page.textContent('#roV6')).includes('1.2356e-5'));
}
for (const N of [2, 4, 6, 8, 10, 12]) {
  s = await press(`[data-nord="${N}"]`);
  if (s.ledger.N !== N || s.key !== 'jet:cayley' || s.preset !== null) {
    check(`the N chips: ${N}`, false, JSON.stringify([s.ledger.N, s.key, s.preset]));
    break;
  }
}
check('the N chips set the order N and leave the card', s.ledger.N === 12 && s.preset === null);
{
  // the Cos·Cos + Sin·Sin ≡ 1 of the frozen theorem, checked here on the truncations N ≤ 16
  let bad = 0;
  for (let N = 1; N <= 16; N++) {
    const c = range(N + 1).map((k) => (k % 2 ? ZERO : Q((k / 2) % 2 ? -1n : 1n, FACT[k]))),
      sn = range(N + 1).map((k) => (k % 2 ? Q((((k - 1) / 2) % 2 ? -1n : 1n), FACT[k]) : ZERO)),
      sum = serMul(c, c, N).map((x, i) => addQ(x, serMul(sn, sn, N)[i]));
    if (!sum.every((x, i) => eqQ(x, i ? ZERO : ONE))) bad++;
  }
  check('Cos·Cos + Sin·Sin ≡ 1 mod η^{N+1} for N ≤ 16 (independent), and the page benchmark agrees', bad === 0 && bench.pythBad === 0 && bench.jetBad === 0 && bench.odeBad === 0 && bench.ratioBad === 0 && bench.jets === 12, JSON.stringify([bad, bench.jets]));
}

/* ---------- 1b. Machin brackets ---------- */
s = await press('[data-jmode="machin"]');
check('the Machin reading: rail M = 1 … 8, parked at M = 8', s.key === 'jet:machin' && s.max === 7 && s.ledger.M === 8);
{
  const t2 = tadd(Q(1, 5), Q(1, 5)),
    t4 = tadd(t2, t2),
    last = tsub(t4, Q(1, 239)),
    z1 = gmul([1n, 5n], [1n, 5n]),
    z2 = gmul([5n, 12n], [5n, 12n]),
    z3 = gmul([120n, 119n], [-1n, 239n]);
  const C = exact.chain;
  check('tangent addition: 1/5 ⊕ 1/5 = 5/12, 5/12 ⊕ 5/12 = 120/119, 120/119 ⊖ 1/239 = 1 (machin_rational_chain)', strQ(t2) === '5/12' && strQ(t4) === '120/119' && strQ(last) === '1');
  check('Gaussian integers: (5 + i)² = 24 + 10i, (12 + 5i)² = 119 + 120i, (119 + 120i)(239 − i) = 28561(1 + i); the page’s pairs agree', z1.join() === '10,24' && z2.join() === '120,119' && z3.join() === '28561,28561' && C.d1.join() === '10,24' && C.d2.join() === '120,119' && C.last.join() === '28561,28561' && 28561n === 13n ** 4n);
  let worst = '';
  for (let k = 0; k <= 7; k++) {
    s = await rail(k);
    const M = k + 1,
      b = bracketN(M),
      closed = addQ(Q(16n, 5n ** BigInt(2 * M + 1) * BigInt(2 * M + 1)), Q(4n, 239n ** BigInt(2 * M + 1) * BigInt(2 * M + 1)));
    let below = 0;
    while (ltQ(b.W, Q(1n, 10n ** BigInt(below + 1)))) below++;
    const prev = M > 1 ? bracketN(M - 1) : null;
    const ok = s.ledger.M === M && eqQ(s.ledger.L, b.L) && eqQ(s.ledger.U, b.U) && eqQ(s.ledger.W, b.W) && eqQ(b.W, closed) && s.ledger.below === below && s.ledger.closedOk && (!prev || (ltQ(prev.L, b.L) && ltQ(b.L, b.U) && ltQ(b.U, prev.U))) && s.ledger.nested;
    if (!ok) worst ||= `M = ${M}`;
  }
  check('M = 1 … 8: [L_M, U_M] from the partial sums (Horner), W_M = 16/(5^{2M+1}(2M+1)) + 4/(239^{2M+1}(2M+1)), strictly nested, W_M < 10^{−d} decided in integers', !worst, worst);
  s = await rail(0);
  check('M = 1: [L₁, U₁] = [281476/89625, 651864872/204778785], W₁ = 218431204/5119469625', strQ(s.ledger.L) === '281476/89625' && strQ(s.ledger.U) === '651864872/204778785' && strQ(s.ledger.W) === '218431204/5119469625');
  check('π (a double) lies in every bracket (classical lens, as a decimal)', range(8).every((i) => fl(exact.brackets[i].L) <= Math.PI && Math.PI <= fl(exact.brackets[i].U)));
  check('the page benchmark: closed widths and nesting for M ≤ 12, no failure', bench.closedBad === 0 && bench.nestBad === 0);
}
for (let M = 1; M <= 8; M++) s = await press(`[data-mord="${M}"]`);
check('the M chips set the Machin order', s.ledger.M === 8 && s.key === 'jet:machin');
s = await press('#stageAct');
check('the stage button switches back to the Cayley truncation', s.key === 'jet:cayley');

/* ---------- 2. simplicial cochains and the vertex cone ---------- */
s = await pick(CONE);
{
  const C = cochainsN(s);
  check('cone card: F on 012, 013, 023, 123 = δ₁Φ (default Φ) = 6, −1, −1, 6', s.ledger.faces.join() === C.faces.map(String).join() && C.faces.join() === '6,-1,-1,6');
  const eOpp = [
    [1, 2],
    [1, 3],
    [2, 3]
  ].map(([x, y]) => C.e(x, y));
  check('apex 0: e = H₂F = F(0, x, y) on 12, 13, 23 = 6, −1, −1 and 0 on the spokes; δ₁e(1, 2, 3) = 6 = F(1, 2, 3)', eOpp.join() === '6,-1,-1' && [1, 2, 3].every((x) => C.e(0, x) === 0n) && s.ledger.coneFace === 6 && C.de(1, 2, 3) === 6n && s.ledger.oppF === 6 && s.ledger.defect === 0);
  const f = (v) => BigInt(s.f[v]);
  let cone = 0,
    d1d0 = 0,
    d2d1 = 0;
  for (const [x, y, z] of T3) {
    if (C.de(x, y, z) + C.dF(s.base, x, y, z) === C.F(x, y, z)) cone++;
    if (f(z) - f(y) + (f(y) - f(x)) - (f(z) - f(x)) === 0n) d1d0++;
  }
  for (const [x, y, z, w] of T4) {
    const de = (a, b, c) => C.e(b, c) + C.e(a, b) - C.e(a, c);
    if (de(y, z, w) + de(x, y, w) - de(x, z, w) - de(x, y, z) === 0n) d2d1++;
  }
  check('δ₁(H₂F) + H₃(δ₂F) = F on all 64 ordered triples, δ₂(δ₁e) = 0 on all 256 ordered quadruples, δ₁(δ₀f) = 0 on all 64 triples (here and on the page)', cone === 64 && d2d1 === 256 && d1d0 === 64 && s.ledger.coneOk === 64 && s.ledger.d2d1 === 256 && s.ledger.d1d0 === 64);
}
{
  // every apex: e = H₂F, the defect lands on the opposite face
  let worst = '';
  for (const b of [0, 1, 2, 3]) {
    s = await press(`[data-base="${b}"]`);
    const C = cochainsN(s),
      o = C.opp;
    const ok = s.base === b && s.ledger.opp.join() === o.join() && s.ledger.coneFace === Number(C.de(o[0], o[1], o[2])) && s.ledger.defect === Number(C.dF(b, o[0], o[1], o[2])) && s.ledger.cone.join() === EDGE_KEYS.map((k) => C.e(+k[0], +k[1])).map(String).join();
    if (!ok) worst ||= `b = ${b}`;
  }
  check('the apex chips: for b = 0 … 3, e = H₂F and δ₁e on the opposite face', !worst, worst);
}
s = await press('[data-base="0"]');
{
  // the defect k: F = δ₁Φ + k·[123] is closed iff k = 0; then no alternating e in [−3, 3]⁶ has δ₁e = F
  s = await dial('kdef', 2);
  const C = cochainsN(s);
  let found = 0;
  const span = [-3, -2, -1, 0, 1, 2, 3].map(BigInt);
  const target = C.faces;
  // δ₁e on the increasing triples of an alternating e, written out: 012, 013, 023, 123
  for (const e01 of span)
    for (const e02 of span)
      for (const e03 of span)
        for (const e12 of span)
          for (const e13 of span)
            for (const e23 of span)
              if (e12 + e01 - e02 === target[0] && e13 + e01 - e03 === target[1] && e23 + e02 - e03 === target[2] && e23 + e12 - e13 === target[3]) found++;
  check('defect k = 2: δ₂F(0, 1, 2, 3) = 2 ≠ 0, F is not closed, and no alternating e in [−3, 3]⁶ satisfies δ₁e = F (d2_eq_zero_iff, one direction)', s.ledger.defect === 2 && s.ledger.closed === false && found === 0 && s.ledger.coneOk === 64 && s.ledger.primitive < 64 && s.preset === null);
  check('… the cone identity still holds, with the defect H₃(δ₂F) only on the face opposite the apex', s.ledger.coneFace === 6 && s.ledger.oppF === 8 && Number(C.F(1, 2, 3)) === 8);
  s = await dial('kdef', 0);
  check('k = 0: closed again, and e = H₂F is a primitive on all 64 triples', s.ledger.closed === true && s.ledger.primitive === 64);
}
{
  // the edge dials and the vertex gauge f
  s = await dial('e01', -3);
  s = await dial('e23', 4);
  const C = cochainsN(s);
  check('the edge dials set Φ and the faces follow (F = δ₁Φ)', s.phi.join() === '-3,-1,1,3,-2,4' && s.ledger.faces.join() === C.faces.map(String).join());
  const before = s.ledger.faces.join(),
    circBefore = s.ledger.circ.join();
  for (const [i, v] of [
    [0, 2],
    [1, -3],
    [2, 1],
    [3, 3]
  ])
    s = await dial('f' + i, v);
  const C2 = cochainsN(s);
  check('the gauge f changes the edges by δ₀f but no face: δ₁(δ₀f) = 0 on all 64 triples', s.f.join() === '2,-3,1,3' && s.ledger.faces.join() === before && s.ledger.edges.join() === EDGE_KEYS.map((k) => C2.e1(+k[0], +k[1])).map(String).join() && s.ledger.edges.join() !== EDGE_KEYS.map((k) => C.e1(+k[0], +k[1])).map(String).join() && s.ledger.d1d0 === 64 && s.ledger.circ.join() === circBefore);
}
s = await press('[data-cmode="stokes"]');
{
  const C = cochainsN(s);
  check('two-plaquette Stokes: Δ₁ + Δ₂ = ∂Σ (0 → 1 → 2 → 3 → 0), the shared edge 13 cancelling', s.key === 'cone:stokes' && s.ledger.circ.join() === C.circ.map(String).join() && s.ledger.boundary === Number(C.boundary) && C.circ[0] + C.circ[1] === C.boundary);
  // the heap holonomy example of §9.1: quaternions by 4 × 4 matrices
  const q = (...v) => v.map((x) => (Array.isArray(x) ? Q(...x) : Q(x)));
  const U01 = q([3, 5], [4, 5], 0, 0),
    U12 = q([3, 5], 0, [4, 5], 0),
    U23 = q([3, 5], 0, 0, [4, 5]),
    U30 = q([1, 2], [1, 2], [1, 2], [1, 2]),
    U13 = q([4, 5], [3, 5], 0, 0);
  const W1 = qmulM(qmulM(U30, U13), U01),
    F2 = qmulM(qmulM(qinv(U13), U23), U12),
    W2 = qmulM(qmulM(qinv(U01), F2), U01),
    hol = qmulM(qmulM(qmulM(U30, U23), U12), U01),
    prod = qmulM(W1, W2),
    rev = qmulM(W2, W1);
  const H = exact.heap;
  check('heap holonomy: W₁·W̃₂ = Hol(∂Σ) = (31/250, −17/250, 7/10, 7/10), and W̃₂·W₁ = (31/250, 7/10, −7/10, 17/250) differs (matrices, inverses by conjugate over norm)', prod.map(strQ).join() === '31/250,-17/250,7/10,7/10' && hol.map(strQ).join() === prod.map(strQ).join() && rev.map(strQ).join() === '31/250,7/10,-7/10,17/250' && H.prod.every((x, i) => eqQ(x, prod[i])) && H.rev.every((x, i) => eqQ(x, rev[i])) && W1.map(strQ).join() === '-1/2,1/2,1/2,-1/2');
  const viaThree = qmulM(qinv(U13), qinv(U30));
  const alternate = qmulM(W1, qmulM(qmulM(qinv(viaThree), F2), viaThree));
  const alternateReadout = await page.locator('#roV7').textContent();
  check('changing the whisker to 0→3→1 at fixed order changes the product',
    alternate.map(strQ).join() === '31/250,-7/10,-17/250,-7/10' &&
    alternate.some((x, i) => !eqQ(x, hol[i])) &&
    H.alt.every((x, i) => eqQ(x, alternate[i])) &&
    alternateReadout.includes('(31/250, −7/10, −17/250, −7/10)') &&
    await page.locator('#roRow7').isVisible());
  check('[y, x, x] = y: U₁₃ times its inverse is 1', qmulM(U13, qinv(U13)).map(strQ).join() === '1,0,0,0');
  let worst = '';
  for (let k = 0; k <= 8; k++) {
    s = await rail(k);
    if (s.ledger.circ[0] + s.ledger.circ[1] !== s.ledger.boundary || !eqQ(s.ledger.lambda, Q(k, 8))) worst ||= `k = ${k}`;
  }
  check('erasing the shared edge along the rail (λ = 0 … 1) leaves Δ₁ + Δ₂ = ∂Σ', !worst, worst);
}
{
  // the page benchmark against the counts of this suite
  check('the page benchmark: 81 gauges, 729 edge cochains, 625 face cochains × 4 apexes, no failure', bench.fTried === 81 && bench.eTried === 729 && bench.FTried === 625 && bench.fBad === 0 && bench.eBad === 0 && bench.coneBad === 0 && bench.exactBad === 0 && bench.heapOk && !bench.heapRev);
  // closed faces among the 625: F(1,2,3) + F(0,1,3) = F(0,2,3) + F(0,1,2)
  let closed = 0;
  const span = [-2, -1, 0, 1, 2];
  for (const a of span) for (const b of span) for (const c of span) for (const d of span) if (d + b === c + a) closed++;
  check(`… and ${closed} of them are closed, as counted here`, bench.closedCount === closed);
}
s = await press('#stageAct');
check('the stage button switches to the vertex cone', s.key === 'cone:cone');

/* ---------- 3. even Chebyshev shells and the quadrupole ---------- */
s = await pick(SHELL);
check('shell card: E₂ at κ = 1/2 is −1; E₁·E₂ = E₁ + E₂ + E₃', s.key === 'shell:shell' && s.n === 2 && s.m === 1 && strQ(s.ledger.kappa) === '1/2' && strQ(s.ledger.En) === '-1' && s.ledger.fusionOk);
{
  let worst = '';
  for (let n = 0; n <= 6; n++) {
    const want = Eexp(n);
    if (exact.even[n].map(String).join() !== want.map(String).join()) worst ||= `E${n}: ${exact.even[n]} vs ${want}`;
  }
  check('E₀ … E₆ are the even coefficients of U₀, U₂, …, U₁₂ (explicit binomial sum): 1; 4κ − 1; 16κ² − 12κ + 1; 64κ³ − 80κ² + 24κ − 1; …', !worst && Eexp(3).map(String).join() === '-1,24,-80,64', worst);
  let bad = 0;
  for (let n = 0; n <= 6; n++) for (let x = -12; x <= 12; x++) if (evalZ(Eexp(n), BigInt(x * x)) !== evalZ(Uexp(2 * n), BigInt(x))) bad++;
  check('even_chebyshev: E_n(x²) = U_{2n}(x) on all integers |x| ≤ 12, n ≤ 6 (here), and the page benchmark (n ≤ 12) agrees', bad === 0 && bench.evenBad === 0 && bench.evenTried === 13 * 25);
}
{
  let worst = '';
  for (const n of [0, 1, 2, 3])
    for (const m of [0, 1, 2, 3]) {
      await press(`[data-shell="${n}"]`);
      s = await press(`[data-partner="${m}"]`);
      for (const kap of [Q(0), Q(1, 3), Q(5, 7), Q(1), Q(3, 16)]) {
        const lhs = mulQ(evalQc(Eexp(m), kap), evalQc(Eexp(n), kap));
        let rhs = ZERO;
        for (let r = Math.abs(m - n); r <= m + n; r++) rhs = addQ(rhs, evalQc(Eexp(r), kap));
        if (!eqQ(lhs, rhs)) worst ||= `(${m}, ${n}) at ${strQ(kap)}`;
      }
      if (s.n !== n || s.m !== m || !s.ledger.fusionOk || s.ledger.poly.join() !== Eexp(n).map(String).join()) worst ||= `chips (${m}, ${n})`;
    }
  check('fusion: E_m E_n = Σ_{r=|m−n|}^{m+n} E_r for m, n ≤ 3, at five rationals each; the chips set n and m', !worst && bench.fusionBad === 0, worst);
}
s = await press('[data-shell="2"]');
s = await press('[data-partner="1"]');
{
  let worst = '';
  for (let k = 0; k <= 16; k++) {
    s = await rail(k);
    const kap = Q(k, 16);
    if (!eqQ(s.ledger.kappa, kap) || !eqQ(s.ledger.En, evalQc(Eexp(2), kap)) || !eqQ(s.ledger.product, mulQ(evalQc(Eexp(1), kap), evalQc(Eexp(2), kap)))) worst ||= `k = ${k}`;
  }
  check('the rail raises κ = k/16 from 0 to 1; E₂(κ) and E₁E₂ exact at every step', !worst, worst);
  check('E₂(1) = 5 = 2·2 + 1, the dimension of the j = 2 shell', strQ(s.ledger.dim) === '5' && strQ(s.ledger.En) === '5');
}
s = await press('[data-smode="quad"]');
{
  const diag = (f) =>
    [0, 1, 2].map((a) => {
      const num = sphereMean((n) => f(n) ** 2 * (3 * n[a] * n[a] - 1)),
        den = sphereMean((n) => f(n) ** 2);
      return num / den;
    });
  const want = { z2: [-2, -2, 4], xz: [2, -4, 2], yz: [-4, 2, 2], xy: [2, 2, -4], x2y2: [2, 2, -4] };
  let worst = '';
  for (const o of exact.orbitals) {
    const q = diag(DORB[o.key]);
    if (!o.diag.every((x, i) => Math.abs(fl(x) - q[i]) < 1e-12 && eqQ(x, Q(want[o.key][i], 7)))) worst ||= `${o.key}: ${o.diag.map(strQ)} vs ${q}`;
    if (!o.off.every((x) => eqQ(x, ZERO))) worst ||= `${o.key} off-diagonal`;
  }
  check('the five real d orbitals: ⟨3n_a² − 1⟩ by Gauss–Legendre quadrature equals the page’s sevenths, off-diagonals 0', !worst, worst);
  check('d¹⁰ = 2·Σ = (0, 0, 0); d⁸ = (−4/7, −4/7, 8/7), trace 0', exact.d10.every((x) => eqQ(x, ZERO)) && s.key === 'shell:quad' && s.ledger.Q.map(strQ).join() === '-4/7,-4/7,8/7' && eqQ(s.ledger.trace, ZERO));
  let worst2 = '';
  for (let h = 0; h <= 2; h++) {
    s = await rail(h);
    const Qh = [Q(-2 * h, 7), Q(-2 * h, 7), Q(4 * h, 7)];
    if (!s.ledger.Q.every((x, i) => eqQ(x, Qh[i])) || s.ledger.holes !== h) worst2 ||= `h = ${h}`;
  }
  check('the rail empties d_{x²−y²}: d¹⁰ → d⁹ → d⁸ = (0, 0, 0) → (−2/7, −2/7, 4/7) → (−4/7, −4/7, 8/7)', !worst2, worst2);
}
s = await press('#stageAct');
check('the stage button switches back to the shells', s.key === 'shell:shell');

/* ---------- 4. quadratic fields and the Schur complement ---------- */
s = await pick(QUAD);
{
  const L = s.ledger,
    a = Q(2),
    b = Q(1),
    c = Q(3, 2),
    x = Q(1),
    // the vertex of the parabola cy² + 2bx·y + ax²: y* = −(2bx)/(2c), value ax² − (2bx)²/(4c)
    yv = divQ(mulQ(Q(-2), mulQ(b, x)), mulQ(Q(2), c)),
    val = subQ(mulQ(a, mulQ(x, x)), divQ(mulQ(mulQ(Q(2), mulQ(b, x)), mulQ(Q(2), mulQ(b, x))), mulQ(Q(4), c)));
  check('Schur still (a = 2, b = 1, c = 3/2, x = 1): y* = −2/3, minimum 4/3 attained, square term 0 (rational_schur_min)', eqQ(L.ystar, yv) && strQ(yv) === '-2/3' && eqQ(L.floor, val) && strQ(val) === '4/3' && eqQ(L.y, yv) && eqQ(L.q, val) && eqQ(L.sq, ZERO) && L.atMin && L.ok);
  let worst = '';
  for (let t = 0; t <= 24; t++) {
    s = await rail(t);
    const y = addQ(yv, Q(16 - t, 6)),
      q = addQ(addQ(mulQ(a, mulQ(x, x)), mulQ(mulQ(Q(2), b), mulQ(x, y))), mulQ(c, mulQ(y, y)));
    if (!eqQ(s.ledger.y, y) || !eqQ(s.ledger.q, q) || ltQ(q, val) || !eqQ(s.ledger.sq, subQ(q, val)) || (t !== 16) !== ltQ(val, q)) worst ||= `t = ${t}`;
  }
  check('along the rail y = y* + (16 − t)/6: q ≥ 4/3, equal only at t = 16, and q − 4/3 = c(y − y*)²', !worst, worst);
}
{
  s = await dial('qa', -2);
  s = await dial('qb', 3);
  s = await dial('qc', 2);
  s = await dial('qx', -3);
  const a = Q(-1),
    b = Q(3, 2),
    c = Q(1),
    x = Q(-3, 2),
    ys = divQ(mulQ(Q(-1), mulQ(b, x)), c),
    floor = mulQ(subQ(a, divQ(mulQ(b, b), c)), mulQ(x, x));
  check('the dials (halves) a = −1, b = 3/2, c = 1, x = −3/2: y* = 9/4 and the minimum (a − b²/c)x² = −117/16 (a saddle in x, still a minimum in y)', s.preset === null && eqQ(s.ledger.ystar, ys) && strQ(ys) === '9/4' && eqQ(s.ledger.floor, floor) && strQ(floor) === '-117/16');
  s = await dial('qc', 0);
  check('the pivot dial stays positive: c = 0 is refused (c = 1/2)', s.c === 1 && strQ(s.ledger.c) === '1/2');
  check(`the page benchmark: the completed square and the minimum on ${9 * 9 * 4 * 9 * 7} tuples of halves, no failure`, bench.schurBad === 0 && bench.schurTried === 9 * 9 * 4 * 9 * 7);
}
s = await press('[data-qmode="sqrt2"]');
{
  const u = exact.spin.map((w) => spinM(spinB(w))),
    U1 = u[1];
  let pw = eye(4),
    ok = true;
  for (let k = 0; k <= 8; k++) {
    if (!matEq(pw, u[k])) ok = false;
    pw = matMul(pw, U1);
  }
  const i4 = spinM([
    [ZERO, ZERO],
    [ONE, ZERO]
  ]);
  check('ℚ(√2) spinors as 4 × 4 rational matrices: u₉₀ᵏ equals the k-th power of u₉₀ (k ≤ 8); u₉₀² = i, u₉₀⁴ = −1, u₉₀⁸ = 1 (sqrt_two_spinor)', ok && matEq(u[2], i4) && matEq(u[4], eye(4, Q(-1))) && matEq(u[8], eye(4)));
  const bell = s2M([ZERO, Q(2)]);
  check('CHSH: (2δ)² = 8 as matrices, and the page’s S² = 8 (sqrt_two_bell)', matEq(matMul(bell, bell), eye(2, Q(8))) && strQ(exact.bell2[0]) === '8' && strQ(exact.bell2[1]) === '0');
  let worst = '';
  for (let k = 0; k <= 8; k++) {
    s = await rail(k);
    const w = spinB(s.ledger.power),
      n2 = [addQ(addQ(mulQ(w[0][0], w[0][0]), mulQ(Q(2), mulQ(w[0][1], w[0][1]))), addQ(mulQ(w[1][0], w[1][0]), mulQ(Q(2), mulQ(w[1][1], w[1][1])))), addQ(mulQ(Q(2), mulQ(w[0][0], w[0][1])), mulQ(Q(2), mulQ(w[1][0], w[1][1])))];
    if (!eqQ(n2[0], ONE) || !eqQ(n2[1], ZERO) || !matEq(spinM(w), u[k])) worst ||= `k = ${k}`;
  }
  check('the rail k = 0 … 8: ‖u₉₀ᵏ‖² = 1 in ℚ(√2)', !worst && bench.spinOk && bench.s2Bad === 0, worst);
  check('(1 + δ)⁻¹ = −1 + δ (norm −1)', strQ(s.ledger.inv.inv[0]) === '-1' && strQ(s.ledger.inv.inv[1]) === '1' && strQ(s.ledger.inv.check[0]) === '1' && strQ(s.ledger.inv.check[1]) === '0');
}
s = await press('[data-qmode="phi"]');
{
  // ℚ(φ) through the matrix of multiplication by φ on (1, φ): Φⁿ = [[F_{n−1}, F_n], [F_n, F_{n+1}]], det = (−1)ⁿ
  const F = [0n, 1n];
  for (let i = 2; i <= 14; i++) F.push(F[i - 1] + F[i - 2]);
  let worst = '';
  for (let n = 0; n <= 12; n++) {
    s = await rail(n);
    const Fm1 = n === 0 ? 1n : F[n - 1],
      p = s.ledger.power,
      norm = Fm1 * Fm1 + Fm1 * F[n] - F[n] * F[n],
      ang = (36 * n * Math.PI) / 180,
      tf = fl(s.ledger.T[0]) + (fl(s.ledger.T[1]) * (1 + Math.sqrt(5))) / 2;
    const ok = strQ(p[0]) === String(Fm1) && strQ(p[1]) === String(F[n]) && norm === (n % 2 ? -1n : 1n) && strQ(s.ledger.norm) === String(norm) && Math.abs(tf - Math.cos(ang)) < 1e-12 && Fm1 * F[n + 1] - F[n] * F[n] === (n % 2 ? -1n : 1n);
    if (!ok) worst ||= `n = ${n}`;
  }
  check('φⁿ = F_{n−1} + F_n φ and N(φⁿ) = (−1)ⁿ (Cassini) for n = 0 … 12; T_n(φ/2) is cos(36°·n) as a double', !worst && bench.phiBad === 0, worst);
  check('pentagonal closure: T₅(φ/2) = −1, T₁₀(φ/2) = 1, T₅((φ − 1)/2) = 1', strQ(s.ledger.T5[0]) === '-1' && strQ(s.ledger.T5[1]) === '0' && strQ(s.ledger.T10[0]) === '1' && strQ(s.ledger.T5b[0]) === '1' && strQ(s.ledger.T5b[1]) === '0');
  check('φ¹² = 89 + 144φ, N = 1', strQ(exact.phi[12][0]) === '89' && strQ(exact.phi[12][1]) === '144');
}
s = await press('#stageAct');
check('the stage button cycles back to the Schur complement', s.key === 'quad:schur');

/* ---------- lens, views, handle, keyboard ---------- */
s = await pick(JET);
const before = JSON.stringify(s.ledger),
  bigBefore = await page.textContent('#hudBig');
s = await press('#lensToggleBtn');
check('the lens changes names, not the state', s.lens === 1 && JSON.stringify(s.ledger) === before && (await page.textContent('#hudBig')) !== bigBefore && (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true');
s = await press('#lensToggleBtn');
check('… and back', s.lens === 0);
const pitch0 = s.camera.pitch;
s = await press('[data-cam="top"]');
check('the view chips turn the camera (from above)', s.cam === 'top' && (await until(page, (p) => Math.abs(window.JETLAB_DEBUG.state.camera.pitch - p) > 0.5, pitch0)));
s = await press('[data-cam="card"]');
await until(page, (p) => Math.abs(window.JETLAB_DEBUG.state.camera.pitch - p) < 1e-6, pitch0);
await pick(JET);
{
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate(() => window.JETLAB_DEBUG.dragTarget(0));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  s = await state();
  check('dragging the amber handle to the truncated point N = 2 sets N = 2 (error −1/10) and leaves the card', s.ledger.N === 2 && strQ(s.ledger.eu) === '-1/10' && s.preset === null, `N = ${s.ledger.N}`);
}
await page.locator('#stageHandle').focus();
await page.keyboard.press('ArrowRight');
s = await state();
check('→ on the handle moves one order up: N = 3', s.ledger.N === 3);
await page.keyboard.press('End');
s = await state();
check('End on the handle goes to N = 12', s.ledger.N === 12);
await page.evaluate(() => document.activeElement.blur());
await pick(CONE);
{
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate(() => window.JETLAB_DEBUG.vertexTarget(3));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  s = await state();
  const C = cochainsN(s);
  check('dragging the amber apex onto vertex 3 makes b = 3: e = F(3, x, y) and δ₁e on the face 012', s.base === 3 && s.ledger.opp.join() === '0,1,2' && s.ledger.coneFace === Number(C.de(0, 1, 2)) && s.ledger.cone.join() === EDGE_KEYS.map((k) => C.e(+k[0], +k[1])).map(String).join(), `b = ${s.base}`);
}
await page.locator('#stageHandle').focus();
await page.keyboard.press('Home');
s = await state();
check('Home on the apex handle returns to b = 0', s.base === 0);
await page.evaluate(() => document.activeElement.blur());
check('Space plays', await playsAfter(page, () => page.keyboard.press(' '), () => window.JETLAB_DEBUG.state));
await page.keyboard.press(' ');
check('Space pauses', !(await state()).playing);
await page.locator('[data-speed="2"]').evaluate((b) => b.click());
check('a card plays from its start', await playsAfter(page, () => page.click(`[data-preset="${SHELL}"]`), () => window.JETLAB_DEBUG.state));
check('… and parks on its still', await until(page, () => {
  const d = window.JETLAB_DEBUG.state;
  return !d.playing && d.t === 8 && d.preset === 'peter-weyl-even-chebyshev';
}));
await page.locator('[data-speed="1"]').evaluate((b) => b.click());
check('no stage labels on top of each other after all this', (await labelOverlaps(page, '.stage .tag')).length === 0);
check('no sideways scrolling', (await overflowX(page)) <= 0);

/* ---------- the stills a chapter would print ---------- */
const CAPTIONS = {
  [JET]: (d) => d.key === 'jet:cayley' && d.ledger.N === 12 && strQ(d.ledger.eu) === '1/10240' && strQ(d.ledger.ev) === '-1/5120',
  [CONE]: (d) => d.key === 'cone:cone' && d.base === 0 && d.ledger.coneFace === 6 && d.ledger.oppF === 6 && d.ledger.defect === 0 && strQ(d.ledger.lambda) === '1',
  [SHELL]: (d) => d.key === 'shell:shell' && strQ(d.ledger.kappa) === '1/2' && strQ(d.ledger.En) === '-1' && d.ledger.fusionOk,
  [QUAD]: (d) => d.key === 'quad:schur' && strQ(d.ledger.floor) === '4/3' && strQ(d.ledger.ystar) === '-2/3' && strQ(d.ledger.sq) === '0'
};
for (const [card, ok] of Object.entries(CAPTIONS))
  for (const lang of ['zh', 'en']) {
    const p = await openStill(T, BOOK, ID, card, lang),
      d = await p.evaluate(() => window.JETLAB_DEBUG.state);
    check(`still ${card} (${lang}): the frame carries the numbers of its note`, d.preset === card && !d.playing && ok(d), JSON.stringify([d.preset, d.key, d.t]));
    await p.context().close();
  }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
