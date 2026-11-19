/* HALT//SORT · tests: the stage-first gate, then every claim of the page checked by an algorithm written here (never
   the page's own functions): bisection for θ*, a fresh cosine iteration, a secant solve for the residual cap, Born
   weights from σ, a 2 × 2 Hilbert–Schmidt computation, dense matrices and deflated power iteration for Eckart–Young,
   Gram–Schmidt in a rotated frame for the Krylov tower, quaternion slerp and the DCT-II cosine formula for the basis,
   and a step-by-step projective simulation for the strobe checks. */
import { session, stageFirstChecks, settle, until, openStill } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'self-halting-spectral-time-river-sandbox';
const T = await session();
const { check } = T;

await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- independent mathematics ---------- */
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const matmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const frob2 = (A) => A.reduce((s, r) => s + r.reduce((t, x) => t + x * x, 0), 0);

// θ* by bisection on cos x − x (the page uses Newton)
const THETA = (() => { let a = 0, b = 1; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; })();
const xs = [0]; for (let k = 1; k <= 80; k++) xs.push(Math.cos(xs[k - 1]));
const haltK = (eps) => { let k = 1; while (Math.abs(xs[k] - xs[k - 1]) > eps) k++; return k; };
// the cap {x : |cos x − x| ≤ ε} by the secant method on each side
const secant = (target, x0, x1) => { let a = x0, b = x1; for (let i = 0; i < 100; i++) { const fa = Math.cos(a) - a - target, fb = Math.cos(b) - b - target; if (Math.abs(fb - fa) < 1e-300) break; const c = b - fb * (b - a) / (fb - fa); a = b; b = c; if (Math.abs(b - a) < 1e-15) break; } return b; };

const SIGMA = [1.00, 0.76, 0.54, 0.35, 0.20, 0.10];
const S2 = SIGMA.reduce((s, x) => s + x * x, 0);
const BORN = SIGMA.map((s) => s * s / S2);

/** An orthogonal 6 × 6 matrix from three fixed Householder reflections. */
const ORTHO = (() => {
  let Q = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? 1 : 0)));
  for (const v0 of [[1, 2, -1, 0.5, 3, -2], [0.3, -1, 2, 1, -0.5, 1.5], [2, 0.1, 0.4, -1.2, 0.7, 1]]) {
    const n = Math.sqrt(dot(v0, v0)), v = v0.map((x) => x / n);
    const H = v.map((vi, i) => v.map((vj, j) => (i === j ? 1 : 0) - 2 * vi * vj));
    Q = matmul(Q, H);
  }
  return Q;
})();
const G = matmul(matmul(ORTHO, SIGMA.map((s, i) => SIGMA.map((_, j) => (i === j ? s : 0)))), transpose(ORTHO));
const matpow = (A, n) => { let R = A.map((r, i) => r.map((_, j) => (i === j ? 1 : 0))); for (let k = 0; k < n; k++) R = matmul(R, A); return R; };
/** The top r eigenvectors of a symmetric positive matrix by power iteration with deflation. */
function topVectors(A, r) {
  const out = []; let B = A.map((row) => row.slice());
  for (let k = 0; k < r; k++) {
    let v = [1, 0.7, -0.4, 0.2, 0.9, -0.3];
    for (let it = 0; it < 3000; it++) { const w = B.map((row) => dot(row, v)), n = Math.sqrt(dot(w, w)); v = w.map((x) => x / n); }
    const lam = dot(v, B.map((row) => dot(row, v)));
    out.push(v); B = B.map((row, i) => row.map((x, j) => x - lam * v[i] * v[j]));
  }
  return out;
}

/* ---------- the page, opened on its cards ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await page.evaluate(() => document.fonts && document.fonts.ready); await settle(page, 400);
const state = () => page.evaluate(() => window.HALT_SORT_DEBUG.state);
const at = (o) => page.evaluate((x) => window.HALT_SORT_DEBUG.at(x), o);
const pick = async (card) => { await page.click(`[data-preset="${card}"]`); await settle(page, 150); return state(); };

check('opening: the page opens on the time-river card (scene fold, t = 2, ε = 0.100)', await page.evaluate(() => {
  const s = window.HALT_SORT_DEBUG.state; return s.preset === 'time-river-orthogonal-fold' && s.scene === 'fold' && s.foldT === 2 && s.eps === 0.1;
}));
check('cards: five experiment cards, each with a data-still', await page.$$eval('#rail .preset', (b) => b.length === 5 && b.every((x) => x.dataset.still != null && x.dataset.still !== '')));

// Keep the deck identity, theory entry point and numerical colours aligned with the shared shell.
{
  const shell = await page.evaluate(() => {
    const deck = document.querySelector('aside.col.deck#rail');
    const evidence = document.querySelector('#evidence');
    const info = document.querySelector('#infoBtn');
    const footer = document.querySelector('footer.rail');
    const probe = document.createElement('span');
    probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
    const amber = getComputedStyle(probe).color; probe.remove();
    const readouts = [...document.querySelectorAll('output, dl.ro dd, dl.ro dd *')];
    return {
      rail: !!deck && document.querySelectorAll('#rail').length === 1 && !!footer && footer.id !== 'rail',
      info: !!info && document.querySelectorAll('#infoBtn').length === 1 && evidence?.firstElementChild === info,
      neutral: readouts.length > 0 && readouts.every((el) => getComputedStyle(el).color !== amber)
    };
  });
  check('shell: the only #rail identifies the left deck; the transport uses footer.rail', shell.rail);
  check('shell: the only #infoBtn is the first child of #evidence', shell.info);
  check('tokens: ordinary numerical outputs and readouts never use amber', shell.neutral);
}

/* precision-agency-window */
{
  const s = await pick('precision-agency-window');
  check('halt: the page θ* agrees with bisection to 1e−12', near(s.dottie, THETA, 1e-12), `${s.dottie} vs ${THETA}`);
  check('halt: λ = −sin θ* = −0.6736', near(s.lambda, -Math.sin(THETA), 1e-12) && near(s.lambda, -0.6736, 5e-5));
  check('halt: the iterates agree with a fresh cosine iteration from x₀ = 0', s.iterates.every((x, k) => near(x, xs[k], 1e-15)));
  const h = s.halt;
  check('halt: at ε = 0.150 the observer stops at step k = 5', h.k === 5 && haltK(0.15) === 5, `page ${h.k}, here ${haltK(0.15)}`);
  check('halt: |x₅ − x₄| = 0.1392 ≤ 0.150 and |x₄ − x₃| = 0.2033 > 0.150', near(h.step, Math.abs(xs[5] - xs[4]), 1e-15) && near(h.step, 0.1392, 5e-5) && Math.abs(xs[4] - xs[3]) > 0.15);
  check('halt: the locked value x₅ = 0.7935 and the folded residual |x₅ − θ*| = 0.0544', near(h.xk, 0.7935, 5e-5) && near(h.residual, Math.abs(xs[5] - THETA), 1e-12) && near(h.residual, 0.0544, 5e-5));
  const lo = secant(0.15, 0.5, 0.7), hi = secant(-0.15, 0.8, 0.9);
  check('halt: the residual cap |cos x − x| ≤ 0.150 is [0.6476, 0.8270] (secant method)', near(h.lo, lo, 1e-9) && near(h.hi, hi, 1e-9) && near(lo, 0.6476, 1e-4) && near(hi, 0.8270, 1e-4), `${h.lo}, ${h.hi} vs ${lo}, ${hi}`);
  check('halt: x₄ is the first iterate inside the cap, so the Cauchy test passes at step 5', h.firstIn === 4 && xs.slice(0, 4).every((x) => Math.abs(Math.cos(x) - x) > 0.15) && Math.abs(Math.cos(xs[4]) - xs[4]) <= 0.15);
  const grid = Array.from({ length: 61 }, (_, i) => 10 ** (-3 + 3 * i / 60));
  const ks = [];
  for (const e of grid) ks.push((await at({ eps: e })).halt.k);
  check('halt: the halting step agrees with this suite on a grid of ε from 0.001 to 1', ks.every((k, i) => k === haltK(grid[i])), JSON.stringify(ks));
  check('halt: the halting step never decreases as ε gets finer (monotone; the grid runs from fine to coarse)', ks.every((k, i) => i === 0 || k <= ks[i - 1]) && ks[0] > ks[ks.length - 1]);
  check('halt: ε → 1 halts at the first check with x₀ already inside the cap; ε → 0 grows (k(0.001) = 18 > k(0.01) = 12)',
    (await at({ eps: 1 })).halt.k === 1 && Math.abs(Math.cos(0) - 0) <= 1 && haltK(0.001) === 18 && haltK(0.01) === 12 && (await at({ eps: 0.001 })).halt.k === 18);
  check('halt: the rail runs over log₁₀(1/ε) ∈ [0, 3] and sits at log₁₀(1/0.15)', near(s.max, 3, 0) && near(s.t, -Math.log10(0.15), 1e-12));
}

/* time-river-orthogonal-fold */
{
  const s = await pick('time-river-orthogonal-fold');
  check('fold: the Born weights are σ²/Σσ² = (0.4898, 0.2829, 0.1428, 0.0600, 0.0196, 0.0049)', s.weights.every((w, i) => near(w, BORN[i], 1e-15)) && [0.4898, 0.2829, 0.1428, 0.06, 0.0196, 0.0049].every((w, i) => near(BORN[i], w, 5e-5)));
  check('fold: at ε = 0.100 three modes stand and three fold, heaviest first to surface', JSON.stringify(s.fold.station) === JSON.stringify([0, 0, 0, 1, 2, 3]) && s.fold.standing0 === 3 && s.fold.folded0 === 3);
  let pyth = true, vals = [];
  for (let t = 0; t <= 4; t++) {
    const f = (await at({ eps: 0.1, t })).fold, standing = BORN.filter((_, m) => [0, 0, 0, 1, 2, 3][m] <= t);
    const k = standing.reduce((a, b) => a + b, 0);
    vals.push([f.keptW, f.foldW]);
    if (!(near(f.keptW, k, 1e-12) && near(f.keptW + f.foldW, 1, 1e-12) && f.cross === 0 && standing.length === Math.min(6, 3 + t))) pyth = false;
  }
  check('fold: ‖Π≥‖² + ‖Π<‖² = 1.0000 at every downstream step, the two projections orthogonal, one mode surfacing per step', pyth, JSON.stringify(vals));
  check('fold: at t = 2 the page shows 0.9951 + 0.0049 = 1.0000', near(s.fold.keptW, 0.9951, 5e-5) && near(s.fold.foldW, 0.0049, 5e-5) && near(s.fold.total, 1, 1e-12));
  // the digits of θ*: head on I, tail in the river, one digit surfacing per step
  const digits = THETA.toFixed(13);
  const heads = [], tails = [];
  for (let t = 0; t <= 4; t++) { const f = (await at({ eps: 0.1, t })).fold; heads.push(f.headStr); tails.push(f.tail); }
  check('fold: the head on I is 0.739 at t = 0 and gains one digit per step (0.7390, 0.73908, 0.739085, 0.7390851)',
    JSON.stringify(heads) === JSON.stringify(['0.739', '0.7390', '0.73908', '0.739085', '0.7390851']) && heads.every((h, t) => h === digits.slice(0, 5 + t)), JSON.stringify(heads));
  check('fold: the folded tail at t = 0 is θ* − 0.739 = 0.0000851332…', near(tails[0], THETA - 0.739, 1e-15) && (await at({ eps: 0.1, t: 0 })).fold.tailStr.startsWith('0.0000851332'));
  // 2 × 2 Hilbert–Schmidt pinching of ρ = |u*⟩⟨u*|, u* = (cos θ*, sin θ*)
  const u = [Math.cos(THETA), Math.sin(THETA)], rho = [[u[0] * u[0], u[0] * u[1]], [u[1] * u[0], u[1] * u[1]]];
  const hs = (A, B) => A[0][0] * B[0][0] + A[0][1] * B[0][1] + A[1][0] * B[1][0] + A[1][1] * B[1][1];
  const pin = [[rho[0][0], 0], [0, rho[1][1]]], rest = [[0, rho[0][1]], [rho[1][0], 0]];
  check('fold: the θ* qubit splits 1 = ⟨𝒫ρ, 𝒫ρ⟩ + ⟨ρ − 𝒫ρ, ρ − 𝒫ρ⟩ = 0.5043 + 0.4957, the second = |ρ₀₁|² + |ρ₁₀|²',
    near(hs(rho, rho), 1, 1e-15) && near(s.qubit.diag, hs(pin, pin), 1e-15) && near(s.qubit.coherence, hs(rest, rest), 1e-15) && near(hs(rest, rest), rho[0][1] ** 2 + rho[1][0] ** 2, 1e-15)
    && near(s.qubit.diag, 0.5043, 5e-5) && near(s.qubit.coherence, 0.4957, 5e-5));
  const J = s.hinge.J, JJ = [[J[0][0] * J[0][0] + J[0][1] * J[1][0], J[0][0] * J[0][1] + J[0][1] * J[1][1]], [J[1][0] * J[0][0] + J[1][1] * J[1][0], J[1][0] * J[0][1] + J[1][1] * J[1][1]]];
  check('fold: the hinge î is skew-adjoint and unitary, and î² = −1', J[0][1] === -J[1][0] && J[0][0] === 0 && J[1][1] === 0 && Math.abs(J[1][0]) === 1
    && JSON.stringify(JJ) === JSON.stringify([[-1, 0], [0, -1]]) && JSON.stringify(s.hinge.JJ) === JSON.stringify(JJ) && JSON.stringify(s.hinge.JJT) === JSON.stringify([[1, 0], [0, 1]]));
  const e5 = (await at({ eps: 0.05, t: 0 })).fold, e5k = BORN.filter((w) => w >= 0.05).length;
  check('fold: ε decides the split at t = 0 (ε = 0.05: four stand, sum still 1)', e5.standing0 === e5k && e5k === 4 && near(e5.total, 1, 1e-12));
  check('fold: the rail runs over t ∈ [0, 4]', s.max === 4 && s.t === 2);
}

/* power-iteration-spectral-sort */
{
  const s = await pick('power-iteration-spectral-sort'), W = s.power;
  const r4 = SIGMA.map((x) => (x / SIGMA[0]) ** 4);
  check('power: (σₘ/σ₁)⁴ = (1, 0.3336, 0.0850, 0.0150, 0.0016, 0.0001) and only the top two clear ε = 0.120',
    W.r.every((x, i) => near(x, r4[i], 1e-15)) && W.R === 2 && JSON.stringify(W.above) === JSON.stringify(r4.map((x) => x >= 0.12)) && near(r4[1], 0.3336, 5e-5));
  const G4 = matpow(G, 4), top = topVectors(G, 2);
  const proj = (A, V) => { const P = A.map((_, i) => A.map((_, j) => V.reduce((s2, v) => s2 + v[i] * v[j], 0))); return matmul(P, A); };
  const share4 = frob2(proj(G4, top)) / frob2(G4), shareRaw = frob2(proj(G, top)) / frob2(G);
  const errEY = frob2(G4.map((row, i) => row.map((x, j) => x - proj(G4, top)[i][j]))) / frob2(G4);
  check('power: dense G⁴ and its rank-2 projection give the share 99.33% (page agrees to 1e−9)', near(W.share, share4, 1e-9) && near(share4, 0.9933, 5e-5), `${W.share} vs ${share4}`);
  check('power: the raw rank-2 energy of G is 77.27%', near(W.raw, shareRaw, 1e-9) && near(shareRaw, 0.7727, 5e-5));
  check('power: Eckart–Young: the squared truncation error of G⁴ equals Σ_{m>2} σₘ⁸ / Σ σₘ⁸ = 0.67%', near(W.errIter, errEY, 1e-9)
    && near(errEY, SIGMA.slice(2).reduce((a, x) => a + x ** 8, 0) / SIGMA.reduce((a, x) => a + x ** 8, 0), 1e-9) && near(errEY, 0.0067, 5e-5));
  // the observable Krylov tower in the rotated frame: span{b, Gb, …, Gᵐb}, b = Q(1, …, 1)/√6
  const b = matmul(ORTHO, SIGMA.map(() => [1 / Math.sqrt(6)])).map((r) => r[0]);
  const dims = []; const basis = []; let v = b.slice();
  for (let m = 0; m <= 8; m++) {
    if (m) v = G.map((row) => dot(row, v));
    let w = v.slice(); for (let pass = 0; pass < 3; pass++) for (const q of basis) { const d = dot(w, q); w = w.map((x, i) => x - d * q[i]); }
    const n = Math.sqrt(dot(w, w)); if (n > 1e-9 * Math.sqrt(dot(v, v))) basis.push(w.map((x) => x / n));
    dims.push(basis.length);
  }
  const strict = dims.filter((d, i) => i && d > dims[i - 1]).length;
  check('power: the Krylov dimensions are 1, 2, 3, 4, 5, 6, 6, 6, 6, as on the page', JSON.stringify(dims) === JSON.stringify(s.krylov.dims) && JSON.stringify(dims) === JSON.stringify([1, 2, 3, 4, 5, 6, 6, 6, 6]));
  check('power: strict growth happens 5 = 6 − 1 times and, once stable at m = 5, never again', strict === 5 && s.krylov.strict === 5 && s.krylov.stableFrom === 5 && dims.slice(5).every((d) => d === 6));
  let sorted = true, prevR = 7;
  for (let n = 0; n <= 8; n++) { const p = (await at({ n, eps: 0.12 })).power, here = SIGMA.filter((x) => (x / SIGMA[0]) ** n >= 0.12).length; if (p.R !== here || p.R > prevR) sorted = false; prevR = p.R; }
  check('power: the number of modes above ε = 0.120 never grows with n (6 at n = 0 … 2 at n = 4)', sorted && (await at({ n: 0, eps: 0.12 })).power.R === 6);
  check('power: the rail runs over n ∈ [0, 8]', s.max === 8 && s.t === 4);
}

/* basis-rayleigh-attention */
{
  const s = await pick('basis-rayleigh-attention');
  // the DCT-II basis from the cosine formula, and the geodesic from I to it by quaternion slerp
  const dct = [0, 1, 2].map((k) => { const c = [0, 1, 2].map((n) => Math.cos(Math.PI * k * (2 * n + 1) / 6)), nn = Math.sqrt(dot(c, c)); return c.map((x) => x / nn); });
  const Fm = [[dct[0][0], dct[1][0], -dct[2][0]], [dct[0][1], dct[1][1], -dct[2][1]], [dct[0][2], dct[1][2], -dct[2][2]]];
  const quat = (M) => { const w = Math.sqrt(Math.max(0, 1 + M[0][0] + M[1][1] + M[2][2])) / 2; return [w, (M[2][1] - M[1][2]) / (4 * w), (M[0][2] - M[2][0]) / (4 * w), (M[1][0] - M[0][1]) / (4 * w)]; };
  const qF = quat(Fm), om = Math.acos(qF[0]);
  const slerp = (f) => { const a = Math.sin((1 - f) * om) / Math.sin(om), c = Math.sin(f * om) / Math.sin(om); return [a + c * qF[0], c * qF[1], c * qF[2], c * qF[3]]; };
  const qmat = ([w, x, y, z]) => [[1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)], [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)], [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]];
  const psi = [1, 2, 5].map((x) => x / Math.sqrt(30)), rho = psi.map((a) => psi.map((c) => a * c));
  const weights = (M) => [0, 1, 2].map((k) => { const bk = [M[0][k], M[1][k], M[2][k]]; return dot(bk, rho.map((row) => dot(row, bk))); });
  let same = true, trace = true, maxd = 0;
  for (const a of [0, 15, 30, 45, 60, 65, 75, 90]) {
    const pg = await at({ alpha: a, eps: 0.15 }), Q = qmat(slerp(a / 90));
    pg.basisMatrix.forEach((row, i) => row.forEach((x, j) => { maxd = Math.max(maxd, Math.abs(x - Q[i][j])); }));
    const w = weights(Q);
    if (!w.every((x, i) => near(x, pg.basis.w[i], 1e-12))) same = false;
    if (!near(w[0] + w[1] + w[2], 1, 1e-12) || !near(pg.basis.total, 1, 1e-12)) trace = false;
  }
  check('basis: B(α) is the shortest turn from the position basis to the DCT-II basis (quaternion slerp agrees to 1e−12)', maxd < 1e-12, `max |Δ| = ${maxd}`);
  check('basis: the Rayleigh weights w(k) = ⟨bₖ|ρ|bₖ⟩ agree with this suite at every angle', same);
  check('basis: Σ w(k) = Σ cos²θₖ = 1 at every angle (trace conservation)', trace);
  const w0 = (await at({ alpha: 0, eps: 0.15 })).basis, w90 = (await at({ alpha: 90, eps: 0.15 })).basis;
  check('basis: the order is reversed between 0° (b₂ > b₁ > b₀) and 90° (b₀ > b₁ > b₂)', JSON.stringify(w0.order) === '[2,1,0]' && JSON.stringify(w90.order) === '[0,1,2]'
    && near(w0.w[2], 5 / 6, 1e-12) && near(w90.w[0], 32 / 45, 1e-12) && near(w90.w[2], 1 / 45, 1e-12));
  const B = s.basis;
  check('basis: at α = 65° the weights are 0.6273, 0.2525, 0.1202; the two above ε = 0.150 lead, the third is demoted',
    B.w.every((x, i) => near(x, [0.6273, 0.2525, 0.1202][i], 5e-5)) && JSON.stringify(B.above) === '[true,true,false]' && JSON.stringify(B.order) === '[0,1,2]');
  check('basis: the rail runs over α ∈ [0°, 90°]', s.max === 90 && s.t === 65);
}

/* zeno-basis-sculpting */
{
  const s = await pick('zeno-basis-sculpting'), Z = s.zeno;
  /** Strobe checks simulated step by step: rotate by π/(4N), project onto |0⟩, keep the norm². */
  const strobe = (N) => { let a0 = 1, a1 = 0, stay = 1; const d = Math.PI / (4 * N), leaks = []; for (let j = 0; j < N; j++) { const b0 = Math.cos(d) * a0 - Math.sin(d) * a1, b1 = Math.sin(d) * a0 + Math.cos(d) * a1; leaks.push(stay * b1 * b1 / (b0 * b0 + b1 * b1)); stay *= b0 * b0 / (b0 * b0 + b1 * b1); a0 = 1; a1 = 0; } return { stay, leaks }; };
  const r16 = strobe(16);
  check('zeno: N = 16 checks keep [cos²(π/64)]¹⁶ = 0.96217 (simulated; not 0.96204)', near(Z.final, r16.stay, 1e-12) && near(r16.stay, 0.962166, 1e-6) && Math.abs(r16.stay - 0.96204) > 1e-4, `${Z.final}`);
  const free = Math.cos(Math.PI / 4) ** 2;
  check('zeno: unwatched across ΩT = π/2 the state stays with probability 0.5000', near(Z.finalFree, free, 1e-15) && near(free, 0.5, 1e-12));
  check('zeno: leaked + surviving = 1 (the ledger telescopes), with per-check leak sin²(π/64) = 0.0024',
    near(r16.leaks.reduce((a, b) => a + b, 0) + r16.stay, 1, 1e-12) && near(Z.ledger, 1, 1e-12) && near(Z.sin2, Math.sin(Math.PI / 64) ** 2, 1e-15) && near(Z.sin2, 0.0024, 5e-5));
  const stays = [1, 2, 4, 8, 16, 32, 64].map((N) => strobe(N).stay);
  check('zeno: watching more often keeps more (survival grows with N)', stays.every((x, i) => i === 0 || x > stays[i - 1]));
  const loss = (N) => 1 - strobe(N).stay;
  check('zeno: the total leak is quadratically suppressed: doubling N halves it, N·leak → π²/16', near(loss(32) / loss(64), 2, 0.02) && near(64 * loss(64), Math.PI ** 2 / 16, 0.01));
  let mid = true;
  for (const u of [0, 3.5, 8, 15.25]) { const z = (await at({ N: 16, u })).zeno, j = Math.floor(u), c = Math.cos(Math.PI / 64) ** 2; if (!near(z.surv, c ** j, 1e-12) || !near(z.leaked + z.surv, 1, 1e-12)) mid = false; }
  check('zeno: after j checks the survival is c^j and leaked + surviving stays 1 along the rail', mid);
  check('zeno: the rail runs over j ∈ [0, N] and the card sits at the end', s.max === 16 && s.t === 16);
}

/* ---------- controls ---------- */
{
  // the amber handle: drag it and the card's parameter follows the pointer
  const drag = async (target) => {
    const b = await page.evaluate(() => window.HALT_SORT_DEBUG.handleBox());
    if (!b) return false;
    await page.mouse.move(b.x, b.y); await page.mouse.down();
    const tgt = await page.evaluate((v) => window.HALT_SORT_DEBUG.handleAt(v), target);
    await page.mouse.move((b.x + tgt.x) / 2, (b.y + tgt.y) / 2, { steps: 3 });
    const tgt2 = await page.evaluate((v) => window.HALT_SORT_DEBUG.handleAt(v), target);
    await page.mouse.move(tgt2.x, tgt2.y, { steps: 4 }); await page.mouse.up(); await settle(page, 120);
    return true;
  };
  await pick('time-river-orthogonal-fold');
  const ok1 = await drag(3.5), s1 = await state();
  check('handle: dragging the amber cursor downstream moves the time step t to 3.5', ok1 && near(s1.foldT, 3.5, 0.06) && s1.preset == null, `t = ${s1.foldT}`);
  await pick('basis-rayleigh-attention');
  const ok2 = await drag(30), s2 = await state();
  check('handle: dragging the amber ring at the tip of b₀ turns the basis to α = 30°', ok2 && near(s2.alpha, 30, 1.2) && near(s2.basis.total, 1, 1e-12), `α = ${s2.alpha}`);
  await pick('precision-agency-window');
  const ok3 = await drag(0.4), s3 = await state();
  check('handle: dragging the amber ring on the cap lever sets ε (0.4 → k = 2)', ok3 && near(s3.eps, 0.4, 0.03) && s3.halt.k === haltK(s3.eps), `ε = ${s3.eps}, k = ${s3.halt.k}`);

  // the lens toggle: the same state, the other reading
  await pick('time-river-orthogonal-fold');
  const before = await state();
  await page.click('#lensBtn'); await settle(page, 120);
  const lensOn = await page.evaluate(() => ({ pressed: document.getElementById('lensBtn').getAttribute('aria-pressed'), tags: [...document.querySelectorAll('.stage .tags > div:not([hidden])')].map((t) => t.textContent), s: window.HALT_SORT_DEBUG.state }));
  check('lens: the toggle switches to the operator reading without touching the state', lensOn.pressed === 'true' && lensOn.s.lens === true && lensOn.s.foldT === before.foldT && lensOn.s.eps === before.eps && near(lensOn.s.fold.total, 1, 1e-12));
  check('lens: the operator reading labels the hinge î² = −1 and the wall Π≥ψ', lensOn.tags.some((x) => x.includes('î² = −1')) && lensOn.tags.some((x) => x.includes('Π')), JSON.stringify(lensOn.tags));
  await page.keyboard.press('l'); await settle(page, 120);
  check('lens: L switches back to the observer reading', await page.evaluate(() => window.HALT_SORT_DEBUG.state.lens === false && document.getElementById('lensBtn').getAttribute('aria-pressed') === 'false'));

  // view chips, ε slider, N slider
  await page.click('#viewChips [data-view="top"]'); await settle(page, 150);
  check('view: the top view looks down on the river (camera pitch 1.42)', await page.evaluate(() => { const s = window.HALT_SORT_DEBUG.state; return Math.abs(s.camFit[1] - 1.42) < 1e-9 && Math.abs(s.camera.pitch - 1.42) < 1e-6; }));
  await page.click('#viewChips [data-view="card"]'); await settle(page, 150);
  await page.locator('#eps').fill('0.05'); await settle(page, 120);
  const se = await state();
  check('slider: ε = 0.05 makes four modes stand on I and keeps the sum at 1', se.eps === 0.05 && se.fold.standing0 === 4 && near(se.fold.total, 1, 1e-12));
  await pick('zeno-basis-sculpting');
  await page.locator('#checks').fill('64'); await settle(page, 120);
  const sz = await state();
  check('slider: N = 64 checks keep [cos²(π/256)]⁶⁴ = 0.9904 and the rail grows to 64', sz.N === 64 && sz.max === 64 && near(sz.zeno.final, strobe64(), 1e-12) && near(sz.zeno.final, 0.9904, 5e-5), `${sz.zeno.final}`);
}
function strobe64() { return Math.cos(Math.PI / 256) ** 128; }

/* ---------- stills: each card at the frame its figure prints ---------- */
for (const [card, test] of [
  ['precision-agency-window', (s) => s.halt.k === 5 && near(s.halt.xk, 0.7935, 5e-5) && near(s.eps, 0.15, 1e-12)],
  ['time-river-orthogonal-fold', (s) => s.foldT === 2 && near(s.fold.keptW, 0.9951, 5e-5) && near(s.fold.total, 1, 1e-12)],
  ['power-iteration-spectral-sort', (s) => s.n === 4 && s.power.R === 2 && near(s.power.share, 0.9933, 5e-5) && near(s.power.raw, 0.7727, 5e-5)],
  ['basis-rayleigh-attention', (s) => s.alpha === 65 && near(s.basis.w[0], 0.6273, 5e-5) && near(s.basis.w[2], 0.1202, 5e-5)],
  ['zeno-basis-sculpting', (s) => s.N === 16 && s.u === 16 && near(s.zeno.final, 0.9622, 5e-5)]
]) {
  for (const lang of ['zh', 'en']) {
    const p = await openStill(T, BOOK, ID, card, lang);
    const s = await p.evaluate(() => window.HALT_SORT_DEBUG.state);
    check(`still (${lang}): ${card} prints the frame its caption describes`, s.preset === card && test(s), JSON.stringify({ t: s.t, eps: s.eps }));
    await p.context().close();
  }
}

/* ---------- bilingual parity ---------- */
{
  const read = async (lang) => {
    const p = await T.open(BOOK, ID, `?lang=${lang}`, { locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p, 300);
    const out = {};
    for (const c of await p.$$eval('[data-preset]', (els) => els.map((e) => e.dataset.preset))) {
      await p.click(`[data-preset="${c}"]`); await settle(p, 120);
      out[c] = await p.evaluate(() => ({
        numbers: [...document.querySelectorAll('#roList dd')].flatMap((dd) => dd.textContent.match(/\d+\.\d+/g) || []),
        hud: (document.getElementById('hudBig').textContent.match(/\d+\.\d+/g) || []),
        legend: document.querySelectorAll('#legend > span').length,
        tags: [...document.querySelectorAll('.stage .tags > div:not([hidden])')].length
      }));
    }
    const ev = await p.evaluate(() => ({ boxes: [...document.querySelectorAll('#leanPanel .lean')].map((b) => [b.className, !!b.querySelector('.zh'), !!b.querySelector('.en')]),
      gids: [...document.querySelectorAll('a[data-lean-gid]')].map((a) => a.dataset.leanGid) }));
    await p.context().close();
    return { out, ev };
  };
  const zh = await read('zh'), en = await read('en');
  check('bilingual: every card shows the same readout numbers in Chinese and in English', Object.keys(zh.out).every((c) => JSON.stringify(zh.out[c].numbers) === JSON.stringify(en.out[c].numbers) && JSON.stringify(zh.out[c].hud) === JSON.stringify(en.out[c].hud)),
    JSON.stringify(Object.keys(zh.out).filter((c) => JSON.stringify(zh.out[c].numbers) !== JSON.stringify(en.out[c].numbers))));
  check('bilingual: the legend has the same entries in both languages', Object.keys(zh.out).every((c) => zh.out[c].legend === en.out[c].legend && zh.out[c].legend === 4));
  check('bilingual: every evidence box carries both languages, seven LEAN ✓ boxes with the seven theorems', zh.ev.boxes.every((b) => b[1] && b[2]) && zh.ev.gids.length === 7 && new Set(zh.ev.gids).size === 7
    && zh.ev.boxes.filter((b) => b[0] === 'lean').length === 7 && JSON.stringify(zh.ev) === JSON.stringify(en.ev));
}

/* ---------- honesty and hygiene ---------- */
{
  const text = await page.evaluate(() => document.documentElement.outerHTML);
  check('hygiene: no amber outside the current selection (no amber text in readouts, the tagline or the drawer)', await page.evaluate(() => {
    const probe = document.createElement('span'); probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
    const amber = getComputedStyle(probe).color; probe.remove();
    const els = [...document.querySelectorAll('#roList *, #drawer *, .tagline *, .hud-tl *')];
    return amber.startsWith('rgb') && els.length > 20 && els.every((el) => getComputedStyle(el).color !== amber);
  }));
  check('hygiene: the page writes no colour literal into its own markup', !/#[0-9a-fA-F]{6}\b/.test(await page.evaluate(() => document.body.innerHTML)));
  check('hygiene: the drawer names the attention analogy as the sequence query–key softmax attention operator', /序列查询—键值软最大注意力算子/.test(text) && /sequence query–key softmax attention operator/.test(text));
  check('hygiene: the theory links point at §36.10 in both languages', await page.evaluate(() => {
    const hs = [...document.querySelectorAll('#drawer a.refs, #drawer .refs a')].map((a) => a.getAttribute('href'));
    return hs.includes('../../zh/ch39-s07-self-halting-precision-and-spectral-sorting.html#sec-ch39-self-halting-and-spectral-sorting') && hs.includes('../../en/ch39-s07-self-halting-precision-and-spectral-sorting.html#sec-ch39-self-halting-and-spectral-sorting');
  }));
  check('playback: ▶ on the fold card advances the time step', await (async () => {
    await pick('time-river-orthogonal-fold');
    await page.evaluate(() => { window.HALT_SORT_DEBUG.setState({ rail: 0 }); document.getElementById('play').click(); });
    const moved = await until(page, () => window.HALT_SORT_DEBUG.state.foldT > 0.05);
    await page.evaluate(() => { const b = document.getElementById('play'); if (b.getAttribute('aria-pressed') === 'true') b.click(); });
    return moved;
  })());
}

await T.finish();
