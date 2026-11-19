#!/usr/bin/env node
// ARITH//SCHUR browser regression: the shared stage-first gate first, then every control and every property the page
// claims, against independent mathematics written here: the divisor graph rebuilt from divisibility, the terminal
// Schur complement from the block formula G_TT − G_TE G_EE⁻¹ G_ET (Gauss–Jordan inverse), the direct solution of the
// original system, the fill, order and operation counts from a symbolic elimination of our own, the dropped system
// solved by block back-substitution, and powers of P by sequential multiplication (never by squaring). The DROP card
// must remove a real coupling (visible discarded mass and residual), the resource readouts must state what they count,
// and orbiting the camera must change no number.
// The BUDGET card (the necessary budget of one signed orbit, a written derivation) is checked against mathematics of
// its own as well: complex arithmetic written here, the Fourier transforms of explicit even test functions by Simpson
// quadrature in both the exponential and the cosine form, the kernel difference sampled over the support, the error
// disks of the two targets sampled on a grid of angles (the triangle step), F of g″ against −z²F, and a bisection for
// where the boundary enters the window; every vertex of the drawn boundary, the signed η, both collisions, the
// normalization by a, every control, the handle against the orbit camera and the stills in both languages. The shared
// gate checks the lit solid of the BUDGET card (opaque share, light and shade, turning, hidden marks, resting); here
// every vertex of the drawn body (the excluded region cut open at the plane of the current |η|) is checked against our
// own B_min, the solid part must lie on the far side of that plane from the camera and the amber point must stay in view
// and pickable from either side.
//   node books/quantum-geometry/viz/tests/arithmetic-schur-lab.test.mjs   (VIZ_SLOW_FRAMES=1000 for slow frames)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'arithmetic-schur-lab';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const ALPHA = 0.25;

/* ---------- own linear algebra ---------- */
const sub = (A, rows, cols) => rows.map((i) => cols.map((j) => A[i][j]));
const matmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
const matvec = (A, x) => A.map((r) => r.reduce((s, a, k) => s + a * x[k], 0));
function inverse(A) {
  const n = A.length, M = A.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c]; for (let j = 0; j < 2 * n; j++) M[c][j] /= d;
    for (let i = 0; i < n; i++) if (i !== c) { const f = M[i][c]; if (f) for (let j = 0; j < 2 * n; j++) M[i][j] -= f * M[c][j]; }
  }
  return M.map((r) => r.slice(n));
}
const solve = (A, b) => matvec(inverse(A), b);
const norm = (v) => Math.hypot(...v);
const maxDiff = (A, B) => Math.max(...A.flatMap((r, i) => r.map((v, j) => Math.abs(v - B[i][j]))));

/* ---------- own graph, Schur complement and symbolic elimination ---------- */
function graph(N) {
  const labels = []; for (let n = 2; n <= N; n++) labels.push(n);
  const m = labels.length, W = labels.map((a) => labels.map((b) => (a !== b && (b % a === 0 || a % b === 0) ? 1 : 0)));
  const deg = W.map((r) => r.reduce((s, x) => s + x, 0)), G = W.map((r, i) => r.map((w, j) => (i === j ? deg[i] + ALPHA : -w)));
  const T = labels.map((n, i) => i).filter((i) => 4 * labels[i] > 3 * N), E = labels.map((n, i) => i).filter((i) => 4 * labels[i] <= 3 * N);
  return { N, labels, m, W, deg, G, T, E };
}
function schurRef(g) {
  const { G, T, E } = g, Ei = inverse(sub(G, E, E));
  return { S: sub(G, T, T).map((r, a) => r.map((v, c) => v - matmul(matmul(sub(G, [T[a]], E), Ei), sub(G, E, [T[c]]))[0][0])), Ei };
}
/** Symbolic elimination on the pattern of G: the order, the fill pairs and the counts of a dense-on-pattern update. */
function symbolic(g, rule) {
  const m = g.m, adj = g.W.map((r) => r.map((w) => w === 1)), alive = new Array(m).fill(true), order = [], fill = [];
  let mul = 0, add = 0, div = 0;
  const left = g.E.slice();
  while (left.length) {
    let p;
    if (rule === 'natural') p = left[0];
    else {
      const degOf = (i) => adj[i].filter((x, j) => x && alive[j] && j !== i).length;
      p = left.slice().sort((a, b) => degOf(a) - degOf(b) || g.labels[b] - g.labels[a])[0];
    }
    left.splice(left.indexOf(p), 1);
    const nb = adj[p].map((x, j) => (x && alive[j] && j !== p ? j : -1)).filter((j) => j >= 0);
    mul += nb.length ** 2; add += nb.length ** 2; div += nb.length;
    for (let a = 0; a < nb.length; a++) for (let b = a + 1; b < nb.length; b++) if (!adj[nb[a]][nb[b]]) { adj[nb[a]][nb[b]] = adj[nb[b]][nb[a]] = true; fill.push([g.labels[nb[a]], g.labels[nb[b]]].sort((x, y) => x - y)); }
    alive[p] = false; order.push(g.labels[p]);
  }
  return { order, fill, mul, add, div };
}

/* ---------- own complex arithmetic, quadrature and the budget of one signed orbit ---------- */
const cx = (re, im = 0) => ({ re, im });
const cadd = (a, b) => cx(a.re + b.re, a.im + b.im), csub = (a, b) => cx(a.re - b.re, a.im - b.im);
const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re), cscale = (a, k) => cx(a.re * k, a.im * k);
const cabs = (a) => Math.hypot(a.re, a.im);
const cexp = (a) => { const r = Math.exp(a.re); return cx(r * Math.cos(a.im), r * Math.sin(a.im)); };
const ccos = (a) => cscale(cadd(cexp(cx(-a.im, a.re)), cexp(cx(a.im, -a.re))), 0.5);          // (e^{iz} + e^{−iz})/2
const csin = (a) => { const d = csub(cexp(cx(-a.im, a.re)), cexp(cx(a.im, -a.re))); return cx(d.im / 2, -d.re / 2); };   // (e^{iz} − e^{−iz})/(2i)
const sinhE = (u) => (Math.exp(u) - Math.exp(-u)) / 2;
/** Composite Simpson on [a, b] with n (even) panels; f returns a complex number. */
function simpson(f, a, b, n) {
  const h = (b - a) / n;
  let acc = cadd(f(a), f(b));
  for (let k = 1; k < n; k++) acc = cadd(acc, cscale(f(a + k * h), k % 2 ? 4 : 2));
  return cscale(acc, h / 3);
}
/** Even test functions supported in [−R, R] (complex values), and g″ of the smooth bump in closed form. */
const bumpU = (u) => (Math.abs(u) < 1 ? Math.exp(-1 / (1 - u * u)) : 0);
const TESTS = {
  bump: (R) => (x) => cscale(cx(1, 0.5), bumpU(x / R)),
  poly: (R) => (x) => cscale(cx(2, -1), Math.abs(x) < R ? (1 - (x / R) ** 2) ** 3 : 0),
  pair: (R) => (x) => cscale(cx(0.7, 0.2), bumpU((Math.abs(x) - 0.8 * R) / (0.2 * R)))
};
const bumpD2 = (R) => (x) => {
  const u = x / R; if (Math.abs(u) >= 1) return cx(0);
  const q = 1 - u * u, ph1 = -2 * u / (q * q), ph2 = -2 / (q * q) - 8 * u * u / (q * q * q);
  return cscale(cx(1, 0.5), (ph2 + ph1 * ph1) * Math.exp(-1 / q) / (R * R));
};
/** F(z) = ∫ e^{−izx} g(x) dx and the cosine form ∫ cos(zx) g(x) dx, both by quadrature. */
const Fexp = (g, R, z) => simpson((x) => cmul(cexp(cmul(cx(0, -1), cscale(z, x))), g(x)), -R, R, 4000);
const Fcos = (g, R, z) => simpson((x) => cmul(ccos(cscale(z, x)), g(x)), -R, R, 4000);
const L1 = (g, R) => simpson((x) => cx(cabs(g(x))), -R, R, 4000).re;
/** The budget of the page's parameters, from the definitions: η = 1/2 − β (signed), the factor min(1, R|t|) that the
    written derivation uses for |sin(tx)|, sinh from exponentials, the minimum of |F(z₊) − F(z₋)| over the two error
    disks sampled on a grid of angles, and the second-order floor from complex squares sampled the same way. */
const ANG = Array.from({ length: 24 }, (_, k) => (2 * Math.PI * k) / 24);
function ownBudget(p) {
  const eta = Math.round((0.5 - p.beta) * 1e4) / 1e4, h = Math.abs(eta), m = Math.min(1, p.R * Math.abs(p.t)), S = m * sinhE(p.R * h);
  let gap = Infinity, gap2 = Infinity;
  const zp2 = cmul(cx(p.t, eta), cx(p.t, eta)), zm2 = cmul(cx(p.t, -eta), cx(p.t, -eta)), a = p.a;
  for (const th of ANG) for (const ph of ANG) {
    const Fp = cx(a + p.eps * a * Math.cos(th), p.eps * a * Math.sin(th)), Fm = cx(-a + p.eps * a * Math.cos(ph), p.eps * a * Math.sin(ph));
    gap = Math.min(gap, cabs(csub(Fp, Fm)));
    gap2 = Math.min(gap2, cabs(csub(cmul(zm2, Fm), cmul(zp2, Fp))));     // F_g″(z₊) − F_g″(z₋) = −z₊²F(z₊) + z₋²F(z₋)
  }
  const jet = Math.max(0, cabs(cadd(zp2, zm2)) / 2 - cabs(zp2) * p.eps);
  const Bmin = S > 0 ? gap / (2 * a * S) : null;
  return { eta, h, m, S, gap, gap2, jet, Bmin, verdict: S > 0 ? (p.B * S >= 1 - p.eps ? 'not-excluded' : 'excluded') : 'incompatible',
    collision: p.t === 0 ? 'even' : h === 0 ? 'coincident' : null };
}
const ownBmin = (R, t, h, eps) => { const S = Math.min(1, R * Math.abs(t)) * sinhE(R * h); return S > 0 ? (1 - eps) / S : Infinity; };
const close = (x, y, rel = 1e-9) => Math.abs(x - y) <= rel * Math.max(1, Math.abs(x), Math.abs(y));
const BLOB = 'https://github.com/the-omega-institute/trureturing/blob/202e1ea140f1fc76698854e3f6e16b2a3167cc8c/Blueprint/D5/S3/Weil/BurnolGram/UnitSupportBurnolPacket.scribe.cs';
const PR = 'https://github.com/the-omega-institute/trureturing/pull/31043';
const BOAS = 'https://doi.org/10.7146/math.scand.a-10453';

const T = await session();
const { page, check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: { preset: 'budget' } });

const state = async (p = page) => { await settle(p); return p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state); };
const setParams = async (o, p = page) => { await p.evaluate((x) => window.ARITHMETIC_SCHUR_DEBUG.setParams(x), o); return state(p); };
async function input(sel, v, p = page) { await p.locator(sel).evaluate((el, x) => { el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); return state(p); }
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); }); return state(p); }

function checkElim(s, tag) {
  const g = graph(s.params.N), ref = schurRef(g), b = new Array(g.m).fill(0); b[g.m - 1] = 1;
  check(`${tag}: G = L + αI of the divisor graph on 2…N`, maxDiff(s.graph.G, g.G) === 0 && JSON.stringify(s.graph.terminals) === JSON.stringify(g.T.map((i) => g.labels[i])));
  for (const rule of ['natural', 'leaf']) {
    const X = s.elim[rule], sym = symbolic(g, rule);
    check(`${tag} (${rule}): the terminal Schur complement equals G_TT − G_TE G_EE⁻¹ G_ET`, maxDiff(X.S, ref.S) < 1e-12, `${maxDiff(X.S, ref.S)}`);
    check(`${tag} (${rule}): the order, the fill and the counted operations`, JSON.stringify(X.order) === JSON.stringify(sym.order) && X.fill === sym.fill.length
      && X.mul === sym.mul && X.add === sym.add && X.div === sym.div, JSON.stringify({ page: [X.order, X.fill, X.mul, X.div], own: [sym.order, sym.fill.length, sym.mul, sym.div] }));
    check(`${tag} (${rule}): the fill edges`, JSON.stringify(X.fillEdges.map(([a, c]) => [a, c].sort((x, y) => x - y)).sort()) === JSON.stringify(sym.fill.slice().sort()));
    const xd = solve(g.G, b);
    check(`${tag} (${rule}): x agrees with the direct solution; ‖Gx − b‖ at rounding level`, Math.max(...X.x.map((v, i) => Math.abs(v - xd[i]))) < 1e-12 && X.residual < 1e-12
      && norm(matvec(g.G, X.x).map((v, i) => v - b[i])) < 1e-12);
    check(`${tag} (${rule}): every pivot is positive`, X.minPivot === null || X.minPivot >= ALPHA - 1e-12);
  }
  check(`${tag}: natural and leaf give the same S`, maxDiff(s.elim.natural.S, s.elim.leaf.S) < 1e-12);
}
function checkDrop(s, tag) {
  const g = graph(s.params.N), ref = schurRef(g), eps = s.params.eps, b = new Array(g.m).fill(0); b[g.m - 1] = 1;
  const Se = ref.S.map((r) => r.slice()), dropped = [];
  let fro = 0;
  for (let a = 0; a < g.T.length; a++) for (let c = a + 1; c < g.T.length; c++) if (ref.S[a][c] !== 0 && Math.abs(ref.S[a][c]) < eps) { fro += 2 * ref.S[a][c] ** 2; Se[a][c] = Se[c][a] = 0; dropped.push([g.labels[g.T[a]], g.labels[g.T[c]]]); }
  // block solve: x_T from the reduced right-hand side, then x_E from the eliminated block
  const bE = g.E.map((i) => b[i]), bT = g.T.map((i) => b[i]), GTE = sub(g.G, g.T, g.E), GET = sub(g.G, g.E, g.T);
  const rhs = bT.map((v, a) => v - matvec(GTE, matvec(ref.Ei, bE))[a]);
  const xT = solve(Se, rhs), xE = matvec(ref.Ei, bE.map((v, a) => v - matvec(GET, xT)[a])), x = new Array(g.m).fill(0);
  g.T.forEach((i, a) => { x[i] = xT[a]; }); g.E.forEach((i, a) => { x[i] = xE[a]; });
  const res = norm(matvec(g.G, x).map((v, i) => v - b[i]));
  const D = s.elim.drop;
  check(`${tag}: the dropped pairs, the discarded Frobenius norm`, JSON.stringify(D.dropped) === JSON.stringify(dropped) && Math.abs(D.discarded - Math.sqrt(fro)) < 1e-12, JSON.stringify({ page: D.dropped, own: dropped }));
  check(`${tag}: the residual of the dropped solve on the original system`, Math.abs(D.residual - res) < 1e-10 && maxDiff([D.x], [x]) < 1e-10, `${D.residual} vs ${res}`);
  return { dropped, res };
}
function checkSquare(s, tag) {
  const g = graph(s.params.N), n = g.m, tau = 1 / (1 + Math.max(...g.deg)), Q = s.square;
  const P0 = g.W.map((r, i) => r.map((w, j) => (i === j ? 1 - tau * g.deg[i] : tau * w)));
  check(`${tag}: P = I − τL with τ = 1/(1 + max deg)`, maxDiff(Q.P, P0) < 1e-15 && Math.abs(Q.tau - tau) < 1e-15);
  const d = Q.d;
  if (d <= 3) {
    let M = P0; for (let k = 1; k < 2 ** d; k++) M = matmul(M, P0);       // sequential products, 2^d − 1 of them
    check(`${tag}: P^${2 ** d} equals ${2 ** d - 1} sequential multiplications`, maxDiff(Q.M, M) < 1e-12, `${maxDiff(Q.M, M)}`);
  }
  let nnz = 0, rowErr = 0, minE = Infinity;
  for (const r of Q.M) { let sum = 0; for (const v of r) { if (v > 0) nnz++; sum += v; minE = Math.min(minE, v); } rowErr = Math.max(rowErr, Math.abs(sum - 1)); }
  check(`${tag}: nnz, row sums 1, nonnegative`, Q.nnz === nnz && rowErr < 1e-12 && Q.rowErr < 1e-12 && minE >= -1e-15 && Math.abs(Q.infNorm - 1) < 1e-12);
  check(`${tag}: the d dense products of the displayed algorithm take d·n³ and d·n²(n − 1); one output matrix has n² entries`, Q.mul === d * n ** 3 && Q.add === d * n * n * (n - 1)
    && Q.outputEntries === n * n && Q.exponent === 2 ** d && Q.cachedLevels === 7);
}
/** The nonzero off-diagonal couplings of the terminal Schur complement, from our own block formula: [a, b, S_ab]. */
function couplings(N) {
  const g = graph(N), S = schurRef(g).S, out = [];
  for (let a = 0; a < g.T.length; a++) for (let c = a + 1; c < g.T.length; c++) if (Math.abs(S[a][c]) > 1e-12) out.push([g.labels[g.T[a]], g.labels[g.T[c]], S[a][c]]);
  return out;
}
/** A viewport point over the bare canvas of the stage (not a button, chip or label host), at least 60 px from the handle. */
async function emptyPoint(p) {
  return p.evaluate(() => {
    const st = document.getElementById('stage'), r = st.getBoundingClientRect(), h = document.getElementById('handle');
    const hb = h && !h.hidden ? h.getBoundingClientRect() : null;
    for (const [fx, fy] of [[0.5, 0.55], [0.3, 0.55], [0.7, 0.55], [0.5, 0.42], [0.25, 0.4], [0.75, 0.4], [0.3, 0.7], [0.7, 0.7], [0.15, 0.55], [0.85, 0.55]]) {
      const x = r.left + fx * r.width, y = r.top + fy * r.height;
      if (hb && Math.hypot(x - hb.left - hb.width / 2, y - hb.top - hb.height / 2) < 60) continue;
      const el = document.elementFromPoint(x, y);
      if (el && el.id === 'cv') return { x, y };
    }
    return null;
  });
}

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [f, src] of Object.entries(sources)) check(`source ${f}: no literal colour, no palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src.replace(/href="[^"]*"/g, '')) && !/data-tr-palette|trPalette/.test(src));
check('source: no override of the lab grid', !/grid-template-columns/.test(sources['style.css']));
check('source: the five cards in order', JSON.stringify([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1])) === '["natural","leaf","drop","square","budget"]');
check('source: the 3D stages are the shared kit.stage3 and kit.solid, nothing loaded by the page itself', /kit\.stage3\(/.test(sources['main.js']) && /kit\.solid\(/.test(sources['main.js'])
  && !/import\s*\(|THREE\b|three\.module|WebGLRenderer|getContext\(\s*['"]webgl/.test(sources['main.js']));
check('source: the budget evidence links the exact source blob, the unmerged PR and Boas', sources['index.html'].includes(`href="${BLOB}"`) && sources['index.html'].includes(`href="${PR}"`)
  && sources['index.html'].includes(`href="${BOAS}"`) && /PR 31043 尚未合入/.test(sources['index.html']) && /PR 31043, not merged/.test(sources['index.html']));
check('source: only the shared runtime and the page script', JSON.stringify([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1])) === '["../assets/shell.js","../assets/kit.js","main.js"]');
check('source: no green Lean box', !/class="lean"|class="lean frozen"|data-lean-gid/.test(sources['index.html']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live entry, no Lean list, theory link to §34.7', entry.status === 'live' && Array.isArray(entry.lean) && entry.lean.length === 0 && entry.code === 'ARITH//SCHUR'
  && (entry.theory || []).some((t) => /ch34-s18-gram-window-and-consensus\.html#sec-ch34-18-5$/.test(t.href)));
check('registry: the budget card is listed and its source is linked at the exact blob', (entry.presets || []).includes('budget') && (entry.theory || []).some((t) => t.href === BLOB));

/* ---------- opening and the cards ---------- */
await T.goto(BOOK, ID, '?lang=zh');
let s = await state();
check('opens on NATURAL at its still frame k = 1 without playing', s.preset === 'natural' && s.scene === 'elim' && !s.playing && s.params.k === 1 && s.params.N === 6 && s.params.order === 'natural');
checkElim(s, 'NATURAL');
check('NATURAL: terminals {5, 6}; 2 goes first and joins 4 and 6 by the only fill edge', JSON.stringify(s.graph.terminals) === '[5,6]' && s.elim.pivot === 2
  && JSON.stringify(s.elim.natural.fillEdges) === '[[4,6,1]]' && s.elim.fill === 1 && s.elim.natural.fill === 1);
check('NATURAL: positions (v₂, v₃, log cofactor) are distinct', new Set(s.graph.raw.map((r) => r.join(','))).size === s.graph.labels.length
  && s.graph.labels.every((n, i) => Math.abs(2 ** s.graph.raw[i][0] * 3 ** s.graph.raw[i][1] * Math.exp(s.graph.raw[i][2]) - n) < 1e-9));
check('NATURAL: clicking the card plays the elimination', await playsAfter(page, () => page.click('[data-preset="natural"]')));
s = await pick('leaf');
await input('#now', s.max); s = await state();
checkElim(s, 'LEAF');
check('LEAF: order 4, 3, 2 and no fill at all', JSON.stringify(s.elim.leaf.order) === '[4,3,2]' && s.elim.leaf.fill === 0 && s.elim.fill === 0 && s.params.k === 3);
check('LEAF: the same S on {5, 6} as NATURAL', s.elim.S.length === 2 && maxDiff(s.elim.leaf.S, s.elim.natural.S) < 1e-12);
s = await pick('drop');
await input('#now', s.max); s = await state();
checkElim(s, 'DROP');
{
  const { dropped, res } = checkDrop(s, 'DROP');
  check('DROP: N = 16, ε = 0.2 drops exactly the entry between 14 and 15; the residual leaves rounding level', s.params.N === 16 && s.params.eps === 0.2
    && JSON.stringify(dropped) === '[[14,15]]' && res > 1e-6 && s.elim.residual < 1e-12);
  // the couplings behind it, from our own block formula: N = 16 (terminals 13…16) has three, and only the one between
  // 14 and 15 is below 0.2; N = 12 (terminals 10, 11, 12) has one of size ≈ 0.541877, beyond every ε ≤ 0.5
  const c16 = couplings(16), c12 = couplings(12), mags = c16.map((x) => -x[2]).sort((a, b) => a - b), want = [0.1250135, 0.2849153, 0.4169889];
  check('N = 16: the final S has three couplings ≈ −0.1250135, −0.2849153, −0.4169889, the smallest between 14 and 15', c16.length === 3 && c16.every((x) => x[2] < 0)
    && mags.every((m, i) => Math.abs(m - want[i]) < 1e-6) && c16.some((x) => x[0] === 14 && x[1] === 15 && Math.abs(-x[2] - want[0]) < 1e-6), JSON.stringify(c16));
  check('N = 12: the only coupling is ≈ −0.541877 between 10 and 12, so no ε ≤ 0.5 drops anything', c12.length === 1 && c12[0][0] === 10 && c12[0][1] === 12
    && Math.abs(c12[0][2] + 0.541877) < 1e-6 && -c12[0][2] > 0.5, JSON.stringify(c12));
  const D = s.elim.drop;
  check('DROP: the discarded Frobenius mass √2·|S₁₄,₁₅| ≈ 0.177 and the residual of the original system are visibly nonzero', Math.abs(D.discarded - Math.SQRT2 * want[0]) < 2e-6
    && D.discarded > 0.1 && D.residual > 1e-3, `${D.discarded} · ${D.residual}`);
  check('DROP: the readout names the dropped pair 14–15 and the residual of the original system', /14–15/.test(await page.textContent('#roList')) && /‖Gx̃ − b‖/.test(await page.textContent('#roList')));
  const ro = await page.textContent('#roList'), note = await page.textContent('#roNote');
  check('DROP: the operation counts are labelled as the Schur updates only, with what they leave out', /舒尔更新的标量运算/.test(ro) && /只计舒尔更新本身/.test(note)
    && /不含建 G、约化 b、终端求解、回代、残差、缓存与绘制/.test(note) && /丢掉的质量与原方程残差都离开零/.test(note));
}
s = await pick('square');
await input('#now', 3); s = await state();
checkSquare(s, 'SQUARE d = 3');
check('SQUARE: P⁸ is denser than P and its row sums stay 1', s.square.nnz > s.square.nnzP && s.square.rowErr < 1e-12);
{
  // the resource readouts say what they count: the d dense products of the displayed algorithm, one output matrix of
  // n² entries, all levels cached at once; no "storage n²" and no total-work claim
  const zh = { ro: await page.textContent('#roList'), note: await page.textContent('#roNote') };
  check('SQUARE (zh): counts of the displayed algorithm, entries of one output matrix, the cache named', /所示算法 d 次稠密乘积/.test(zh.ro) && /一个输出矩阵的元数 n²/.test(zh.ro) && !/存储 n²/.test(zh.ro)
    && /缓存了 d = 0…6 的全部层/.test(zh.note) && /不是页面的总工作量/.test(zh.note));
  await page.click('[data-lang-set="en"]'); await settle(page);
  const en = { ro: await page.textContent('#roList'), note: await page.textContent('#roNote') };
  check('SQUARE (en): the same scope in English', /d dense products of the displayed algorithm/.test(en.ro) && /Entries of one output matrix, n²/.test(en.ro) && !/Storage n²/.test(en.ro)
    && /caches all levels d = 0…6/.test(en.note) && /not the total work or storage of the page/.test(en.note) && !/[Dd]ense scalar work performed/.test(en.ro));
  await page.click('[data-lang-set="zh"]'); await settle(page);
}

/* ---------- sweeps (programmatic, checked independently) ---------- */
for (const N of [6, 7, 9, 12, 16, 20, 24]) { s = await setParams({ scene: 'elim', N, eps: 0, k: 0 }); checkElim(s, `N = ${N}`); }
for (const [N, eps] of [[12, 0.1], [16, 0.3], [20, 0.15], [24, 0.5]]) { s = await setParams({ scene: 'elim', N, order: 'leaf', eps }); checkDrop(s, `N = ${N}, ε = ${eps}`); }
s = await setParams({ scene: 'elim', N: 12, order: 'leaf', eps: 0.5 });
check('N = 12, ε = 0.5: nothing is dropped, the discarded mass is 0 and the residual stays at rounding level', s.elim.drop.dropped.length === 0 && s.elim.drop.discarded === 0
  && s.elim.drop.residual < 1e-12);
s = await setParams({ scene: 'elim', N: 16, order: 'leaf', eps: 0.3 });
check('N = 16, ε = 0.3: the two couplings below 0.3 (≈ 0.125 and ≈ 0.285) are dropped; the residual is visibly nonzero', s.elim.drop.dropped.length === 2
  && JSON.stringify(s.elim.drop.dropped.map((p) => p.join('–')).sort()).includes('14–15') && s.elim.drop.residual > 1e-3);
for (const N of [6, 12, 17]) for (const d of [0, 1, 2, 3, 6]) { s = await setParams({ scene: 'square', N, d }); checkSquare(s, `N = ${N}, d = ${d}`); }
{
  // the current Schur block after k steps equals the Schur complement of G onto the vertices still alive
  s = await setParams({ scene: 'elim', N: 12, order: 'leaf', k: 4 });
  const g = graph(12), gone = s.elim.eliminated.map((n) => g.labels.indexOf(n)), keep = s.elim.remaining.map((n) => g.labels.indexOf(n));
  const Ci = inverse(sub(g.G, gone, gone)), Sk = sub(g.G, keep, keep).map((r, a) => r.map((v, c) => v - matmul(matmul(sub(g.G, [keep[a]], gone), Ci), sub(g.G, gone, [keep[c]]))[0][0]));
  check('k = 4: the current block is the Schur complement onto the remaining vertices', maxDiff(s.elim.current, Sk) < 1e-12 && s.elim.eliminated.length === 4);
}

/* ---------- controls ---------- */
await pick('natural');
s = await input('#size', 10); check('N slider rebuilds the graph and the rail', s.params.N === 10 && s.graph.labels.length === 9 && s.preset === null && s.max === s.graph.free.length);
await page.click('#orderChips [data-order="leaf"]'); s = await state(); check('order chips switch to leaf first', s.params.order === 'leaf');
s = await input('#now', s.max); s = await input('#eps', 0.12); check('ε slider', Math.abs(s.params.eps - 0.12) < 1e-12);
checkDrop(s, 'after the ε slider');
await page.click('#sceneChips [data-scene="square"]'); s = await state();
check('scene chip: square, rail 0…6', s.scene === 'square' && s.max === 6);
s = await input('#depth', 5); check('depth slider moves the rail', s.params.d === 5 && Math.floor(s.t) === 5);
checkSquare(s, 'after the depth slider');

/* ---------- the handles ---------- */
await page.click('#sceneChips [data-scene="elim"]'); await setParams({ N: 12, order: 'natural', k: 1 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ k: 4 }));
  const cam0 = (await state()).camera;
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 6 }); await page.mouse.up();
  s = await state();
  check('handle k: dropping the ring on the pivot of step 4 sets k = 4, camera unchanged', s.params.k === 4 && s.elim.pivot === s.elim.order[3] && JSON.stringify(s.camera) === JSON.stringify(cam0), `k = ${s.params.k}`);
  await page.focus('#handle'); await page.keyboard.press('ArrowRight'); s = await state();
  check('handle keys: → one step', s.params.k === 5 && !s.playing);
}
await page.click('#sceneChips [data-scene="square"]'); await setParams({ N: 12, d: 1 });
{
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ d: 4 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 6 }); await page.mouse.up();
  s = await state();
  check('handle d: dragging along the gauge sets d = 4, slider follows', s.params.d === 4 && Number(await page.inputValue('#depth')) === 4);
  await page.focus('#handle'); await page.keyboard.press('ArrowLeft'); s = await state();
  check('handle keys: ← one squaring less', s.params.d === 3);
  checkSquare(s, 'after the gauge');
}

/* ---------- orbiting the camera: drag empty canvas; no number moves, the handle re-projects, a drag still lands ---------- */
await page.click('#sceneChips [data-scene="elim"]'); await setParams({ N: 12, order: 'leaf', eps: 0, k: 4 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const e = await emptyPoint(page), before = await state();
  if (e) { await page.mouse.move(e.x, e.y); await page.mouse.down(); await page.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await page.mouse.up(); }
  const after = await state();
  check('orbit (elimination): dragging empty canvas turns the camera', !!e && after.camera.yaw < before.camera.yaw - 0.2 && after.camera.pitch > before.camera.pitch + 0.05,
    JSON.stringify([before.camera, after.camera]));
  check('orbit (elimination): no parameter, step or card changes', JSON.stringify(after.params) === JSON.stringify(before.params) && after.preset === before.preset && after.elim.pivot === before.elim.pivot);
  checkElim(after, 'after the orbit');
  const off = await page.evaluate(() => { const h = window.ARITHMETIC_SCHUR_DEBUG.handleBox(), t = window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ k: 4 }); return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity; });
  check('orbit (elimination): the handle is re-projected onto the pivot of step 4', off < 1.5, `${off}`);
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ k: 7 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 6 }); await page.mouse.up();
  const s2 = await state();
  check('orbit then drag: dropping the ring on the pivot of step 7 sets k = 7 under the turned camera, which the drag leaves alone', s2.params.k === 7 && s2.elim.pivot === s2.elim.order[6]
    && JSON.stringify(s2.camera) === JSON.stringify(after.camera), `k = ${s2.params.k}`);
  checkElim(s2, 'after the orbit and the drag');
}
await page.click('#sceneChips [data-scene="square"]'); await setParams({ N: 12, d: 2 });
{
  const e = await emptyPoint(page), before = await state();
  if (e) { await page.mouse.move(e.x, e.y); await page.mouse.down(); await page.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await page.mouse.up(); }
  const after = await state();
  check('orbit (squaring): dragging empty canvas turns the camera and changes no number', !!e && after.camera.yaw < before.camera.yaw - 0.2 && after.params.d === 2
    && JSON.stringify(after.square.M) === JSON.stringify(before.square.M));
  checkSquare(after, 'after the orbit (squaring)');
  const off = await page.evaluate(() => { const h = window.ARITHMETIC_SCHUR_DEBUG.handleBox(), t = window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ d: 2 }); return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity; });
  check('orbit (squaring): the handle is re-projected onto the gauge tick d = 2', off < 1.5, `${off}`);
}

/* ---------- playback and drawer ---------- */
await page.locator('body').click({ position: { x: 4, y: 4 } });
await setParams({ d: 0 });
await page.keyboard.press('Space');
check('Space plays the rail', await until(page, () => { const d = window.ARITHMETIC_SCHUR_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#infoBtn');
check('drawer: not a proof in both languages; Burnol and arXiv:1207.6583v3 linked; §34.7', await page.evaluate(() => {
  const d = document.getElementById('drawer'), hrefs = [...d.querySelectorAll('a')].map((a) => a.getAttribute('href'));
  return !d.hidden && /不是证明/.test(d.textContent) && /not a proof/.test(d.textContent) && hrefs.includes('https://arxiv.org/abs/math/0103058v2') && hrefs.includes('https://arxiv.org/abs/1207.6583v3')
    && hrefs.includes('../../zh/ch34-s18-gram-window-and-consensus.html#sec-ch34-18-5') && /liminf/.test(d.textContent);
}));
await page.keyboard.press('Escape');

/* ---------- BUDGET: the necessary budget of one signed orbit, against our own mathematics ---------- */
/** The window map of the page's box, from the documented window R ∈ [0, 8], |η| ∈ [0, 1/2], B ∈ [0, 32]. */
const mapOf = (box) => (R, h, B) => [box.x[0] + (box.x[1] - box.x[0]) * R / 8, box.y[0] + (box.y[1] - box.y[0]) * h / 0.5, box.z[0] + (box.z[1] - box.z[0]) * B / 32];
const far = (u, v) => Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]);
function checkBudget(b, tag) {
  const p = b.params, own = ownBudget(p), W = mapOf(b.window.box);
  check(`${tag}: the window is R ∈ [0, 8], |η| ∈ [0, 0.5], B ∈ [0, 32] (linear), the domains are explicit and finite`, JSON.stringify([b.window.R, b.window.absEta, b.window.B]) === '[[0,8],[0,0.5],[0,32]]'
    && JSON.stringify(b.domains) === JSON.stringify({ R: [0.25, 8], t: [0, 4], beta: [0, 1], B: [0.25, 32], eps: [0, 0.95], a: [0.1, 10] }));
  check(`${tag}: η = 1/2 − β is signed, the boundary uses |η|`, p.eta === own.eta && p.absEta === own.h, JSON.stringify([p.beta, p.eta, own.eta]));
  check(`${tag}: S = min(1, R|t|)·sinh(R|η|)`, close(b.S, own.S, 1e-12) && close(b.m, own.m, 0), `${b.S} vs ${own.S}`);
  check(`${tag}: B_min = min over the two error disks of |F(z₊) − F(z₋)| / (2aS)`, own.Bmin == null ? b.Bmin === null : close(b.Bmin, own.Bmin, 1e-9), `${b.Bmin} vs ${own.Bmin}`);
  check(`${tag}: the verdict (${own.verdict}) and the collision`, b.verdict === own.verdict && b.collision === own.collision && close(b.product, p.B * own.S, 1e-12) && close(b.need, 1 - p.eps, 0));
  check(`${tag}: the second-order floor a·max(0, |t² − η²| − (t² + η²)ε)/S, below the sampled disk minimum of F_g″`, close(b.jet, own.jet, 1e-12) && own.gap2 >= 2 * p.a * own.jet - 1e-9
    && (own.S > 0 ? close(b.abs.L2min, p.a * own.jet / own.S, 1e-9) : b.abs.L2min === null));
  check(`${tag}: the absolute values L = aB, e = εa, targets ±a, aB_min`, close(b.abs.L, p.a * p.B, 1e-12) && close(b.abs.e, p.eps * p.a, 1e-12) && b.abs.targets[0] === p.a && b.abs.targets[1] === -p.a
    && (own.Bmin == null ? b.abs.Lmin === null : close(b.abs.Lmin, p.a * own.Bmin, 1e-9)));
  check(`${tag}: the amber point and the boundary above or below it are (R, |η|, B) and (R, |η|, min(B_min, 32)) in the window map`, far(b.point, W(p.R, own.h, p.B)) < 1e-12
    && (own.Bmin == null ? b.boundary === null : far(b.boundary, W(p.R, own.h, Math.min(own.Bmin, 32))) < 1e-9));
  return own;
}
function checkMesh(b, tag) {
  const p = b.params, M = b.mesh, W = mapOf(b.window.box), want = (R, h) => Math.min(ownBmin(R, p.t, h, p.eps), 32);
  let worst = 0, edge = 0, cap = 0, wbad = 0;
  if (M.sheet) {
    for (const row of M.sheet) for (const [R, h, B] of row) worst = Math.max(worst, Math.abs(B - want(R, h)) / Math.max(1, want(R, h)));
    edge = M.sheet[0].filter((q) => q[2] < 32 - 1e-6).length + M.sheet[M.sheet.length - 1].filter((q) => q[1] !== 0.5).length;
    M.sheet.forEach((row, j) => row.forEach((q, i) => { if (far(b.world.sheet[j][i], W(...q)) > 1e-12) wbad++; }));
  }
  for (const row of M.cap) for (const [R, h, B] of row) if (B !== 32 || ownBmin(R, p.t, h, p.eps) < 32 * (1 - 1e-9)) cap++;
  M.cap.forEach((row, j) => row.forEach((q, i) => { if (far(b.world.cap[j][i], W(...q)) > 1e-12) wbad++; }));
  check(`${tag}: every vertex of the violet sheet sits at B = (1 − ε)/S of its own (R, |η|), in the window`, worst < 1e-9, `${worst}`);
  check(`${tag}: each column of the sheet runs from the top of the window down to |η| = 1/2`, edge === 0, `${edge}`);
  check(`${tag}: the magenta top lies only where the boundary is at or above B = 32`, cap === 0, `${cap}`);
  let Rin = null;
  if (ownBmin(8, p.t, 0.5, p.eps) <= 32) { let lo = 0, hi = 8; for (let i = 0; i < 90; i++) { const mid = (lo + hi) / 2; if (ownBmin(mid, p.t, 0.5, p.eps) <= 32) hi = mid; else lo = mid; } Rin = hi; }
  check(`${tag}: the sheet starts where the boundary enters the window (own bisection R_in = ${Rin == null ? 'none' : Rin.toFixed(4)})`,
    Rin == null ? M.sheet === null : M.Rin != null && Math.abs(M.Rin - Rin) < 1e-9 && Math.abs(M.sheet[0][0][0] - Rin) < 1e-9);
  const wall = (rows, at) => rows[0].every((q) => q[2] === 0 && at(q)) && rows[1].every((q) => at(q) && Math.abs(q[2] - want(q[0], q[1])) <= 1e-9 * Math.max(1, q[2]));
  check(`${tag}: the front (|η| = 1/2) and right (R = 8) walls rise from B = 0 to the boundary`, wall(M.front, (q) => q[1] === 0.5) && wall(M.right, (q) => q[0] === 8));
  check(`${tag}: the drawn world points are the window map of these values`, wbad === 0, `${wbad}`);
}
/** What the last frame drew of the excluded region: the solid part on the far side, from the camera, of the plane of
    the current |η|, and the veil on the reader's side; every vertex against our own B_min. */
function checkBody(x, tag) {
  const b = x.budget, p = b.params, d = b.drawn, h0 = p.absEta, top = 32;
  if (!check(`${tag}: the page reports what it drew of the excluded region`, !!d && !!d.body && !!d.veil)) return;
  // the camera basis of kit.stage3 points towards the reader along D = (−sin yaw cos pitch, −cos yaw cos pitch, sin pitch);
  // y falls as |η| grows, so the reader is on the side of |η| = 1/2 exactly when cos yaw > 0
  const near = Math.cos(x.camera.yaw) >= 0;
  check(`${tag}: the solid part lies on the far side of the plane |η| = ${h0} from the camera, the veil on the reader's side, and they meet there`,
    d.near === near && JSON.stringify(d.solidPart) === JSON.stringify(near ? [0, h0] : [h0, 0.5]) && JSON.stringify(d.veilPart) === JSON.stringify(near ? [h0, 0.5] : [0, h0])
    && d.body.a === d.solidPart[0] && d.body.b === d.solidPart[1] && d.veil.a === d.veilPart[0] && d.veil.b === d.veilPart[1] && d.body.t === p.t && d.body.eps === p.eps,
    JSON.stringify({ near: d.near, camera: x.camera, solid: d.solidPart, veil: d.veilPart }));
  const want = (R, h) => Math.min(ownBmin(R, p.t, h, p.eps), top), rel = (u, v) => Math.abs(u - v) / Math.max(1, Math.abs(v));
  const bad = [];
  for (const [name, Y] of [['solid', d.body], ['veil', d.veil]]) {
    const a = Y.a, z = Y.b, inSlab = (h) => h >= a - 1e-12 && h <= z + 1e-12;
    const note = (what, q) => { if (bad.length < 4) bad.push(`${name} ${what} ${JSON.stringify(q)}`); };
    if (Y.sheet) {
      Y.sheet.forEach((row) => row.forEach((q) => { if (!inSlab(q[1]) || rel(q[2], want(q[0], q[1])) > 1e-9) note('sheet', q); }));
      Y.sheet[Y.sheet.length - 1].forEach((q) => { if (q[1] !== z) note('sheet edge', q); });
      Y.sheet[0].forEach((q) => { if (!(q[1] === a || Math.abs(q[2] - top) <= 1e-6 * top)) note('sheet start', q); });
    }
    if (Y.cap) Y.cap.forEach((row) => row.forEach((q) => { if (q[2] !== top || !inSlab(q[1]) || ownBmin(q[0], p.t, q[1], p.eps) < top * (1 - 1e-6)) note('top', q); }));
    const face = (F, h) => !!F && F[0].every((q) => q[1] === h && q[2] === 0) && F[1].every((q, i) => q[1] === h && q[0] === F[0][i][0] && rel(q[2], want(q[0], h)) <= 1e-9)
      && F[0][0][0] === 0 && F[0][F[0].length - 1][0] === 8;
    if (!face(Y.faceA, a)) note('face', a);
    if (a < z) {
      if (!face(Y.faceB, z)) note('face', z);
      if (!(Y.r8[0].every((q) => q[0] === 8 && q[2] === 0 && inSlab(q[1])) && Y.r8[1].every((q) => q[0] === 8 && inSlab(q[1]) && rel(q[2], want(8, q[1])) <= 1e-9))) note('wall R = 8', '');
      if (JSON.stringify(Y.r0) !== JSON.stringify([[[0, a, 0], [0, z, 0]], [[0, a, top], [0, z, top]]]) || want(0, (a + z) / 2) !== top) note('wall R = 0', '');
      if (JSON.stringify(Y.floor) !== JSON.stringify([[[0, a, 0], [8, a, 0]], [[0, z, 0], [8, z, 0]]])) note('floor', '');
    } else if (Y.sheet || Y.cap || Y.faceB) note('an empty slab draws more than its face', a);
  }
  check(`${tag}: every vertex drawn of the excluded region is ours: the sheet at B = (1 − ε)/S inside its slab, the top B = 32 only where B_min ≥ 32, the faces and the wall R = 8 from B = 0 to min(B_min, 32), the wall R = 0 and the floor closing the body`,
    bad.length === 0, bad.join(' | '));
}
/** The kernel and the Fourier side of the derivation for (R, t, η), by quadrature of explicit even test functions. */
function checkKernel(R, t, eta, tag) {
  const h = Math.abs(eta), S = Math.min(1, R * Math.abs(t)) * sinhE(R * h), zp = cx(t, eta), zm = cx(t, -eta);
  let idBad = 0, over = 0;
  for (let k = 0; k <= 400; k++) {
    const x = -R + (2 * R * k) / 400, d = csub(ccos(cscale(zp, x)), ccos(cscale(zm, x))), rhs = cscale(cmul(cx(0, -2), csin(cx(t * x))), sinhE(eta * x));
    if (cabs(csub(d, rhs)) > 1e-12 * (1 + cabs(d))) idBad++;
    if (cabs(d) / 2 > S * (1 + 1e-12) + 1e-15) over++;
    if (Math.abs(Math.sin(t * x)) > Math.min(1, R * Math.abs(t)) + 1e-15) over++;
  }
  check(`${tag}: cos(z₊x) − cos(z₋x) = −2i·sin(tx)·sinh(ηx) on [−R, R], and |…|/2 ≤ S there`, idBad === 0 && over === 0, `${idBad} · ${over}`);
  for (const [name, mk] of Object.entries(TESTS)) {
    const g = mk(R), Fp = Fcos(g, R, zp), Fm = Fcos(g, R, zm), Ep = Fexp(g, R, zp), L0 = L1(g, R);
    check(`${tag}, ${name}: evenness turns ∫e^{−izx}g into ∫cos(zx)g, and |F(z₊) − F(z₋)| ≤ 2S‖g‖₁`, cabs(csub(Ep, Fp)) <= 1e-9 * (1 + cabs(Fp))
      && cabs(csub(Fp, Fm)) <= 2 * S * L0 * (1 + 1e-9) + 1e-12, `${cabs(csub(Fp, Fm))} ≤ ${2 * S * L0}`);
  }
  const g = TESTS.bump(R), g2 = bumpD2(R), d2p = Fcos(g2, R, zp), d2m = Fcos(g2, R, zm), Fp = Fcos(g, R, zp), Fm = Fcos(g, R, zm);
  const zp2 = cmul(zp, zp), zm2 = cmul(zm, zm), L2 = L1(g2, R);
  check(`${tag}: F of g″ is −z²F (integration by parts), and |F_g″(z₊) − F_g″(z₋)| ≤ 2S‖g″‖₁`, cabs(cadd(d2p, cmul(zp2, Fp))) <= 1e-6 * (1 + cabs(d2p)) && cabs(cadd(d2m, cmul(zm2, Fm))) <= 1e-6 * (1 + cabs(d2m))
    && cabs(csub(d2p, d2m)) <= 2 * S * L2 * (1 + 1e-6) + 1e-12);
}
const bstate = async (p = page) => (await state(p)).budget;
const shownText = (p = page) => p.evaluate(() => ['hudTl', 'legend', 'roList', 'pillParam', 'pillKey', 'tau'].map((id) => document.getElementById(id).textContent).join(' | ')
  + ' | ' + [...document.querySelectorAll('#stage .tags > div')].filter((t) => !t.hidden).map((t) => t.textContent).join(' | '));
/** Our own reading of the WebGL canvas: the drawn share (alpha ≥ 16), the opaque share (alpha ≥ 250) and the luminance
    histogram of the drawn pixels. */
const glPixels = (p = page) => p.evaluate(async () => {
  const sc = window.TRV.solids && window.TRV.solids[0]; if (!sc) return null;
  await sc.ready; window.TRV.kit.flush();
  const cv = sc.el.querySelector('canvas.solid-gl'); if (!cv) return { share: 0, opaque: 0, hist: [] };
  const cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height;
  const c = cp.getContext('2d'); c.drawImage(cv, 0, 0);
  const d = c.getImageData(0, 0, cp.width, cp.height).data, hist = new Array(16).fill(0);
  let n = 0, all = 0, solid = 0;
  for (let i = 0; i < d.length; i += 4 * 7) {
    all++; if (d[i + 3] < 16) continue; n++; if (d[i + 3] >= 250) solid++;
    hist[Math.min(15, Math.floor(((0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255) * 16))]++;
  }
  return { share: all ? n / all : 0, opaque: all ? solid / all : 0, hist: hist.map((x) => (n ? x / n : 0)) };
});
/** The amber bead of the current point in the solid's last frame: hidden by a solid or not, and pickable at its pixel. */
const curMark = (p = page) => p.evaluate(() => {
  const sc = window.TRV.solids && window.TRV.solids[0]; if (!sc) return null;
  const m = sc.marks().find((k) => k.key === 'cur'); if (!m) return null;
  return { hidden: m.hidden, pick: sc.nearest({ clientX: m.x, clientY: m.y }, [m.p], 6) };
});

for (const [R, t, eta] of [[1, 1, 0.05], [1, 1, -0.3], [3, 0.2, 0.15], [0.5, 2.5, 0.45], [6, 0.05, -0.02]]) checkKernel(R, t, eta, `kernel R = ${R}, t = ${t}, η = ${eta}`);
{
  // the triangle step: the two error disks keep F(z₊) and F(z₋) at least 2a(1 − ε) apart, which the sampled grid attains
  const o = ownBudget({ R: 1, t: 1, beta: 0.45, B: 8, eps: 0.3, a: 2 });
  check('error disks: min |F(z₊) − F(z₋)| over the sampled disks is 2a(1 − ε)', close(o.gap, 2 * 2 * 0.7, 1e-12), `${o.gap}`);
}

/* the card: it plays β from 0.05 and stops at its still frame 0.45 by itself */
// Waiting for that stop: the budget rail runs at rate 0.1 per second and the shared kit.clock clamps each frame's
// delta to 0.1 s, so frames ≥ 100 ms apart advance β by at most 0.01 and the stop needs
// (0.45 − 0.05) / (0.1 · 0.1) = 40 frames, plus one for rounding. With VIZ_SLOW_FRAMES = g (a frame every ≥ g ms)
// that is ≥ 41·g ms, about 41 s at g = 1000, beyond until()'s default 30 s; allow twice that (20 ms per frame for
// the browser's own frame), and never less than the default.
const BUDGET_FRAMES = Math.ceil((0.45 - 0.05) / (0.1 * 0.1)) + 1;
const BUDGET_WAIT = Math.max(30000, 2 * BUDGET_FRAMES * ((Number(process.env.VIZ_SLOW_FRAMES) || 0) + 20));
check('BUDGET: clicking the card plays the rail', await playsAfter(page, () => page.click('[data-preset="budget"]')));
{
  const stopped = await until(page, () => { const d = window.ARITHMETIC_SCHUR_DEBUG.state; return d.preset === 'budget' && !d.playing && d.t >= 0.45 - 1e-9; }, undefined, BUDGET_WAIT);
  s = await state();
  check('BUDGET: the playback stops by itself at β = 0.45 (η = +0.05), the still frame', stopped && s.scene === 'budget' && s.budget.params.beta === 0.45 && Math.abs(s.t - 0.45) < 1e-12 && s.max === 1, `t = ${s.t}`);
  const own = checkBudget(s.budget, 'BUDGET');
  checkMesh(s.budget, 'BUDGET');
  const P = s.budget.params;
  check('BUDGET: R = 1, t = 1, ε = 0, a = 1, B = 8; B_min = 1/sinh(0.05) ≈ 19.9917 lies above B, so B·S ≈ 0.4002 < 1: excluded by this bound', P.R === 1 && P.t === 1 && P.eps === 0 && P.a === 1 && P.B === 8
    && Math.abs(own.Bmin - 19.99167) < 1e-4 && s.budget.verdict === 'excluded' && Math.abs(s.budget.product - 0.40017) < 1e-4);
  // where the amber point crosses the boundary along the rail: our own bisection of B·S = 1 − ε in β
  let lo = 0.05, hi = 0.45;
  for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (ownBudget({ ...P, beta: mid }).verdict === 'excluded') hi = mid; else lo = mid; }
  const note = await page.textContent('#presetNote'), start = ownBudget({ ...P, beta: 0.05 });
  check(`BUDGET: the note's numbers are those of the card: B_min ${start.Bmin.toFixed(3)} → ${own.Bmin.toFixed(2)}, B·S ${(8 * own.S).toFixed(4)}, crossing near β ≈ ${hi.toFixed(3)}`,
    note.includes(start.Bmin.toFixed(3)) && note.includes(own.Bmin.toFixed(2)) && note.includes((8 * own.S).toFixed(4)) && note.includes(`β ≈ ${hi.toFixed(3)}`), note);
  const gl = await glPixels();
  const order = await page.evaluate(() => { const kids = [...document.getElementById('stage').children]; const g = kids.findIndex((k) => k.matches && k.matches('canvas.solid-gl')); return { gl: g, cv: kids.indexOf(document.getElementById('cv')), z: getComputedStyle(document.getElementById('sv')).zIndex }; });
  check('BUDGET: the sheet is a lit kit.solid drawing on WebGL behind the 2D canvas of the point and labels', s.budget.solid && s.budget.solid.active && s.budget.solid.mode === 'webgl' && !!gl && gl.share > 0.08
    && order.gl >= 0 && order.gl < order.cv && order.z === '-1', JSON.stringify({ gl: gl && gl.share, order }));
  check('BUDGET: at the still frame β = 0.45 an opaque body still covers ≥ 12% of the stage (our own pixel count)', !!gl && gl.opaque >= 0.12, JSON.stringify({ opaque: gl && gl.opaque }));
  checkBody(s, 'BUDGET');
  const cm = await curMark();
  check('BUDGET: the amber point lies on the cut face: no solid hides it and it can be picked', !!cm && cm.hidden === false && cm.pick === 0, JSON.stringify(cm));
  const txt = await shownText();
  check('BUDGET (zh): the verdict says only “此界排除”, and the screen shows actual values', /此界排除/.test(txt) && !/可行|证书|feasib|certif/.test(txt) && txt.includes(own.Bmin.toFixed(2)) && /B = 8\.00/.test(txt), txt.slice(0, 300));
  const ev = await page.evaluate(() => [...document.querySelectorAll('#leanPanel .evset')].map((e) => [e.dataset.scene, e.hidden]));
  check('BUDGET: the evidence of the budget scene is shown, that of the Schur scenes steps aside', JSON.stringify(ev) === '[["elim square",true],["budget",false]]', JSON.stringify(ev));
  // just before and after the crossing, the page agrees with our own verdict
  for (const beta of [0.375, 0.3754, 0.2, 0.49]) { const x = await setParams({ scene: 'budget', bud: { beta } }); checkBudget(x.budget, `β = ${beta}`); }
}

/* signed η, both collisions, the normalization by a */
{
  const plus = (await setParams({ scene: 'budget', bud: { R: 2, t: 1.5, beta: 0.3, B: 4, eps: 0.1, a: 1 } })).budget, hp = plus.hud.sub;
  const minus = (await setParams({ bud: { beta: 0.7 } })).budget, hm = minus.hud.sub;
  check('signed η: β = 0.3 gives η = +0.2 and β = 0.7 gives η = −0.2; the boundary uses |η|: the same B_min and the same point', plus.params.eta === 0.2 && minus.params.eta === -0.2
    && plus.params.absEta === minus.params.absEta && plus.Bmin === minus.Bmin && far(plus.point, minus.point) === 0 && JSON.stringify(plus.mesh) === JSON.stringify(minus.mesh));
  check('signed η is shown with its sign', /η = \+0\.200/.test(hp) && /η = −0\.200/.test(hm), `${hp} | ${hm}`);
  checkBudget(plus, 'β = 0.3'); checkBudget(minus, 'β = 0.7');
  let b = (await setParams({ bud: { t: 0, beta: 0.3 } })).budget;
  checkBudget(b, 't = 0'); checkMesh(b, 't = 0');
  {
    // at t = 0, z₋ = −z₊ and every even g has F(z₊) = F(z₋): no g reaches +1 and −1 with ε < 1
    const g = TESTS.bump(2), F1 = Fcos(g, 2, cx(0, 0.2)), F2 = Fcos(g, 2, cx(0, -0.2));
    check('t = 0: evenness gives F(z₊) = F(z₋) (own quadrature), so the targets are incompatible; the page says so and gives no finite B_min', cabs(csub(F1, F2)) < 1e-12
      && b.verdict === 'incompatible' && b.collision === 'even' && b.Bmin === null && b.S === 0 && b.abs.Lmin === null && b.abs.L2min === null && b.mesh.sheet === null
      && b.mesh.cap[b.mesh.cap.length - 1].every((q) => q[1] === 0.5));
  }
  let txt = await shownText();
  check('t = 0: no Infinity, NaN or ∞ on screen; the collision is named', !/Infinity|NaN|∞/.test(txt) && /偶性/.test(txt) && /目标不相容/.test(txt), txt.slice(0, 300));
  b = (await setParams({ bud: { t: 1, beta: 0.5 } })).budget;
  checkBudget(b, 'β = 1/2');
  txt = await shownText();
  check('β = 1/2: η = 0 exactly, the two nodes coincide, incompatible, no finite B_min and no Infinity or NaN on screen', b.params.eta === 0 && b.collision === 'coincident' && b.verdict === 'incompatible'
    && b.Bmin === null && !/Infinity|NaN|∞/.test(txt) && /节点重合/.test(txt), txt.slice(0, 300));
  const b1 = (await setParams({ bud: { R: 1, t: 1, beta: 0.45, B: 8, eps: 0.2, a: 1 } })).budget;
  const b4 = (await input('#bA', 4)).budget;
  check('normalization: a = 4 rescales L, e, the targets, aB_min and the second-order floor by 4; the normalized boundary, B_min and the verdict stay', b4.params.a === 4
    && JSON.stringify(b4.mesh) === JSON.stringify(b1.mesh) && b4.Bmin === b1.Bmin && b4.verdict === b1.verdict && close(b4.abs.L, 4 * b1.abs.L) && close(b4.abs.e, 4 * b1.abs.e)
    && close(b4.abs.Lmin, 4 * b1.abs.Lmin) && close(b4.abs.L2min, 4 * b1.abs.L2min) && b4.abs.targets[0] === 4 && b4.abs.targets[1] === -4);
  checkBudget(b4, 'a = 4');
  check('normalization: the readout says L and e scale together and the Weil quadratic value by a²', /L 与 e 一起缩放/.test(await page.textContent('#roNote')) && /a² 缩放/.test(await page.textContent('#roNote')));
}

/* every control of the budget scene; the rail is β */
await page.click('#sceneChips [data-scene="elim"]'); await settle(page);
await page.click('#sceneChips [data-scene="budget"]'); s = await state();
check('scene chip: budget, rail β ∈ [0, 1]; its controls shown, those of N hidden', s.scene === 'budget' && s.max === 1 && await page.locator('#bR').isVisible() && !(await page.locator('#size').isVisible()));
for (const [sel, key, v] of [['#bR', 'R', 2.4], ['#bT', 't', 0.75], ['#bB', 'B', 12.5], ['#bEps', 'eps', 0.35], ['#bA', 'a', 3.5]]) {
  s = await input(sel, v);
  check(`budget control ${sel}: ${key} = ${v}`, s.budget.params[key] === v && s.preset === null);
  checkBudget(s.budget, `after ${sel}`);
}
checkMesh(s.budget, 'after the controls');
s = await input('#bBeta', 0.62);
check('β slider: the rail follows; η = 1/2 − β = −0.12', s.budget.params.beta === 0.62 && Math.abs(s.t - 0.62) < 1e-12 && s.budget.params.eta === -0.12);
s = await input('#now', 0.3);
check('the rail moves β, the β slider follows; η = +0.2', s.budget.params.beta === 0.3 && Number(await page.inputValue('#bBeta')) === 0.3 && s.budget.params.eta === 0.2);
checkBudget(s.budget, 'after the rail');

/* the handle moves (R, B) in the plane of fixed |η|; dragging empty space orbits both canvases and changes no number */
await setParams({ scene: 'budget', bud: { R: 2, t: 1, beta: 0.4, B: 6, eps: 0.1, a: 1 } });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ R: 5, B: 12 }));
  const before = await state();
  const at = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ R: 2, B: 6 }));
  check('handle (budget): the ring sits on the projected amber point', !!h && Math.hypot(h.x - at.x, h.y - at.y) < 1.5, JSON.stringify([h, at]));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  s = await state();
  check('handle (budget): dropping the ring on (R, B) = (5, 12) sets R and B; β, |η| and the camera stay', Math.abs(s.budget.params.R - 5) < 0.06 && Math.abs(s.budget.params.B - 12) < 0.3
    && s.budget.params.beta === 0.4 && JSON.stringify(s.camera) === JSON.stringify(before.camera), JSON.stringify(s.budget.params));
  checkBudget(s.budget, 'after the handle');
  const R0 = s.budget.params.R, B0 = s.budget.params.B;
  await page.focus('#handle'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowUp'); s = await state();
  check('handle keys (budget): → R + 0.05, ↑ B + 0.25', Math.abs(s.budget.params.R - (R0 + 0.05)) < 1e-9 && Math.abs(s.budget.params.B - (B0 + 0.25)) < 1e-9 && !s.playing);
}
{
  const e = await emptyPoint(page), before = await state(), px0 = await glPixels();
  if (e) { await page.mouse.move(e.x, e.y); await page.mouse.down(); await page.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await page.mouse.up(); }
  const after = await state(), px1 = await glPixels(), scam = await page.evaluate(() => ({ ...window.TRV.solids[0].cam }));
  check('orbit (budget): dragging empty canvas turns the camera of both canvases', !!e && after.camera.yaw < before.camera.yaw - 0.2 && after.camera.pitch > before.camera.pitch + 0.05
    && Math.abs(scam.yaw - after.camera.yaw) < 1e-12 && Math.abs(scam.pitch - after.camera.pitch) < 1e-12, JSON.stringify([before.camera, after.camera, scam]));
  check('orbit (budget): no parameter, value or vertex changes', JSON.stringify(after.budget.params) === JSON.stringify(before.budget.params) && after.budget.Bmin === before.budget.Bmin
    && JSON.stringify(after.budget.mesh) === JSON.stringify(before.budget.mesh) && after.preset === before.preset);
  const dist = px0 && px1 && px0.hist.length && px1.hist.length ? px1.hist.reduce((a, x, k) => a + Math.abs(x - px0.hist[k]), 0) / 2 : 0;
  check('orbit (budget): the lit sheet is drawn anew from the turned camera', !!px1 && (dist > 0.02 || Math.abs(px1.share - px0.share) > 0.005), JSON.stringify({ dist, a: px0 && px0.share, b: px1 && px1.share }));
  const P = after.budget.params, off = await page.evaluate((q) => { const h = window.ARITHMETIC_SCHUR_DEBUG.handleBox(), t = window.ARITHMETIC_SCHUR_DEBUG.dragTarget(q); return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity; }, { R: P.R, B: P.B });
  check('orbit (budget): the handle is re-projected onto the amber point', off < 1.5, `${off}`);
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ R: 3, B: 20 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  const s2 = await state();
  check('orbit then drag (budget): the ring lands on (R, B) = (3, 20) under the turned camera, which the drag leaves alone', Math.abs(s2.budget.params.R - 3) < 0.08 && Math.abs(s2.budget.params.B - 20) < 0.4
    && JSON.stringify(s2.camera) === JSON.stringify(after.camera), JSON.stringify(s2.budget.params));
  checkBudget(s2.budget, 'after the orbit and the drag');
  checkBody(s2, 'after the orbit and the drag');
}
{
  // turned round to the side of |η| = 0: the solid part and the veil change sides; the point stays in view on the cut
  const e = await emptyPoint(page), before = await state();
  if (e) { await page.mouse.move(e.x, e.y); await page.mouse.down(); await page.mouse.move(e.x + 220, e.y, { steps: 11 }); await page.mouse.up(); }
  const x = await state(), px = await glPixels(), cm = await curMark();
  check('orbit (budget): turned round, the reader looks from the side of |η| = 0 and no parameter changes', !!e && Math.cos(x.camera.yaw) < 0
    && JSON.stringify(x.budget.params) === JSON.stringify(before.budget.params), JSON.stringify([before.camera, x.camera]));
  checkBody(x, 'turned round');
  check('turned round: the amber point is still on the cut face, not hidden and pickable; the solid part is drawn opaquely', !!cm && cm.hidden === false && cm.pick === 0 && !!px && px.opaque > 0.02,
    JSON.stringify({ cm, opaque: px && px.opaque }));
  await setParams({ scene: 'budget' });
}
{
  // the theory drawer carries the source, the unmerged PR, Boas and what the application does not claim
  await page.click('#infoBtn');
  const d = await page.evaluate(() => { const el = document.getElementById('drawer'); return { text: el.textContent, hrefs: [...el.querySelectorAll('a')].map((a) => a.getAttribute('href')) }; });
  check('drawer (budget): exact source blob, PR 31043 (not merged), Boas eq. (1.3) p. 29; R_N = N + 2 is a cap; k is not d; a² scaling; necessary only', d.hrefs.includes(BLOB) && d.hrefs.includes(PR) && d.hrefs.includes(BOAS)
    && /未合入/.test(d.text) && /not merged/.test(d.text) && /式 \(1\.3\)，第 29 页/.test(d.text) && /eq\. \(1\.3\), p\. 29/.test(d.text) && /N \+ 2/.test(d.text) && /只是上界/.test(d.text) && /an upper bound, not the exact or the smallest support/.test(d.text)
    && /k 不是 SQUARE 卡的 d/.test(d.text) && /k is neither the d of the SQUARE card/.test(d.text) && /韦伊二次型乘以 a²/.test(d.text) && /Weil quadratic value by a²/.test(d.text)
    && /未被此界排除/.test(d.text) && /not excluded by this bound/.test(d.text) && /不是断言的 ζ 零点/.test(d.text) && /not asserted zeta zeros/.test(d.text));
  // in burnolBasis(P, N, i) the N is the common convolution/localization depth; the channel count is q = |ι|; neither is the graph's size N or the squaring depth d
  const obj = await page.evaluate(() => {
    const item = (lang) => [...document.querySelectorAll(`#drawer div.${lang} li`)].map((li) => li.textContent).find((t) => /burnolBasis/.test(t)) || '';
    const open = document.querySelector('.evset[data-scene="budget"] .lean.open');
    return { zh: item('zh'), en: item('en'), openZh: open ? open.querySelector('.zh').textContent : '', openEn: open ? open.querySelector('.en').textContent : '' };
  });
  const BASIS = 'burnolBasis(P, N, i) = convolve(convolutionSuccPower P.peak N)(P.killer i)';
  check('drawer (budget): N of burnolBasis is the common convolution/localization depth, the channel count is q = |ι|, neither is the graph size N or the squaring depth d; the OPEN box lists q and the depth',
    obj.zh.includes(BASIS) && obj.en.includes(BASIS)
    && /N 是所有通道 i 共用的卷积\/局部化深度/.test(obj.zh) && /N is the common convolution\/localization depth shared by every channel i/.test(obj.en)
    && /通道数是 q = \|ι\|，与深度 N 是两个不同的量/.test(obj.zh) && /channel count is q = \|ι\|, a different quantity from the depth N/.test(obj.en)
    && /不是整除图的大小 N，不是 SQUARE 卡的平方次数 d/.test(obj.zh) && /neither the size N of the divisor graph nor the squaring depth d of the SQUARE card/.test(obj.en)
    && !/共振/.test(obj.zh) && !/resonance/i.test(obj.en)
    && /通道数 q、共同的卷积\/局部化深度与容差/.test(obj.openZh) && /channel count q, common convolution\/localization depth and tolerance/.test(obj.openEn), JSON.stringify(obj).slice(0, 400));
  await page.keyboard.press('Escape');
}
for (const lang of ['zh', 'en']) {
  // the cited figure in a phone's frame: 334 × 500, after its own playback; actual values in legible labels
  const fr = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=budget`, { viewport: { width: 334, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(fr, 300);
  const stopped = await until(fr, () => { const d = window.ARITHMETIC_SCHUR_DEBUG.state; return !d.playing && d.t >= 0.45 - 1e-9; }, undefined, BUDGET_WAIT);
  await settle(fr, 200);
  const own = ownBudget({ R: 1, t: 1, beta: 0.45, B: 8, eps: 0, a: 1 });
  const v = await fr.evaluate(() => {
    const st = document.getElementById('stage').getBoundingClientRect(), box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left - st.left, y: r.top - st.top, w: r.width, h: r.height }; };
    const tags = [...document.querySelectorAll('#stage .tags > div')].filter((t) => !t.hidden && t.getClientRects().length).map((t) => ({ text: t.textContent, fs: parseFloat(getComputedStyle(t).fontSize), ...box(t) }));
    return { W: st.width, H: st.height, tags, hud: box(document.getElementById('hudTl')), legend: [...document.getElementById('legend').children].map(box) };
  });
  const meets = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
  const inside = (r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= v.W + 0.5 && r.y + r.h <= v.H + 0.5;
  const texts = v.tags.map((t) => t.text).join(' | ');
  check(`334 × 500 (${lang}): the budget figure stops at β = 0.45 and labels B = 8.00 and B_min = ${own.Bmin.toFixed(2)} at ≥ 10 px, inside the stage, apart from each other and from the title and legend`,
    stopped && /B = 8\.00/.test(texts) && texts.includes(`Bmin = ${own.Bmin.toFixed(2)}`) && v.tags.every((t) => t.fs >= 9.99 && inside(t) && !meets(t, v.hud) && v.legend.every((l) => !meets(t, l)))
    && v.tags.every((t, i) => v.tags.every((u, j) => i === j || !meets(t, u))) && inside(v.hud) && v.legend.every(inside), JSON.stringify(v).slice(0, 600));
  if (lang === 'en') check('334 × 500 (en): no Chinese on the stage', !/[㐀-鿿]/.test(texts + (await fr.textContent('#hudTl')) + (await fr.textContent('#legend'))));
  await fr.context().close();
}

/* ---------- the stills the chapter prints ---------- */
for (const lang of ['zh', 'en']) {
  let p = await openStill(T, BOOK, ID, 'natural', lang); let x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still natural (${lang}): k = 1, pivot 2, fill 4–6`, x.preset === 'natural' && x.params.k === 1 && x.elim.pivot === 2 && x.elim.fill === 1);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'leaf', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still leaf (${lang}): all three steps, no fill`, x.preset === 'leaf' && x.params.k === 3 && x.elim.fill === 0);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'drop', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still drop (${lang}): the end of the elimination, 14–15 dropped`, x.preset === 'drop' && x.params.k === x.graph.free.length && JSON.stringify(x.elim.drop.dropped) === '[[14,15]]');
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'square', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still square (${lang}): d = 3`, x.preset === 'square' && x.params.d === 3);
  checkSquare(x, `still square (${lang})`);
  {
    // the HTML handle is hidden in a still, so the caption's amber current-d marker must be the canvas dot: it sits on
    // the gauge point of d = 3 (where a drag would land) and no label box covers it
    const mk = await p.evaluate(() => {
      const el = document.getElementById('stage'), b = el.getBoundingClientRect(), D = window.ARITHMETIC_SCHUR_DEBUG, s = D.state, t = D.dragTarget({ d: s.params.d });
      return { m: s.frame && s.frame.marker, at: t ? [t.x - b.left - el.clientLeft, t.y - b.top - el.clientTop] : null, handle: s.handle, box: D.handleBox(), labels: s.labels || [] };
    });
    const gap = (r, q) => Math.hypot(Math.max(r.x - q[0], 0, q[0] - r.x - r.w), Math.max(r.y - q[1], 0, q[1] - r.y - r.h));
    check(`still square (${lang}): the HTML handle is hidden`, mk.handle === null && mk.box === null);
    check(`still square (${lang}): the amber current-d marker is drawn at the gauge point of d = 3, clear of every label (≥ 6 px)`, !!mk.m && !!mk.at
      && Math.hypot(mk.m.x - mk.at[0], mk.m.y - mk.at[1]) < 0.5 && mk.labels.every((r) => gap(r, [mk.m.x, mk.m.y]) >= 6), JSON.stringify(mk));
  }
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'budget', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  {
    const own = checkBudget(x.budget, `still budget (${lang})`), P = x.budget.params;
    check(`still budget (${lang}): R = 1, t = 1, β = 0.45 (η = +0.05), B = 8, ε = 0, a = 1: excluded by this bound`, x.preset === 'budget' && x.scene === 'budget' && P.R === 1 && P.t === 1
      && P.beta === 0.45 && P.eta === 0.05 && P.B === 8 && P.eps === 0 && P.a === 1 && x.budget.verdict === 'excluded' && !x.playing);
    const mk = await p.evaluate(() => {
      const el = document.getElementById('stage'), b = el.getBoundingClientRect(), D = window.ARITHMETIC_SCHUR_DEBUG, s = D.state, t = D.dragTarget({ R: s.budget.params.R, B: s.budget.params.B });
      return { m: s.frame && s.frame.marker, at: t ? [t.x - b.left - el.clientLeft, t.y - b.top - el.clientTop] : null, box: D.handleBox(), keys: (s.labels || []).map((l) => l.key),
        tags: [...document.querySelectorAll('#stage .tags > div')].filter((q) => !q.hidden).map((q) => q.textContent).join(' | '), hud: document.getElementById('hudTl').textContent };
    });
    check(`still budget (${lang}): the handle is hidden; the amber point is drawn at (R, |η|, B); its value and B_min = ${own.Bmin.toFixed(2)} are labelled`, mk.box === null && !!mk.m && !!mk.at
      && Math.hypot(mk.m.x - mk.at[0], mk.m.y - mk.at[1]) < 0.5 && mk.keys.includes('bP') && mk.keys.includes('bM') && /B = 8\.00/.test(mk.tags) && mk.tags.includes(`Bmin = ${own.Bmin.toFixed(2)}`)
      && (lang === 'zh' ? /此界排除/.test(mk.hud) : /excluded by this bound/.test(mk.hud) && !/[\u3400-\u9fff]/.test(mk.tags + mk.hud)), JSON.stringify(mk).slice(0, 500));
  }
  await p.context().close();
}

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
