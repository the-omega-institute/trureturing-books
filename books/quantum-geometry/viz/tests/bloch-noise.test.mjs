// Browser regression suite for BLOCH//NOISE (books/quantum-geometry/viz/bloch-noise/).
//   node books/quantum-geometry/viz/tests/bloch-noise.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page moves Bloch vectors with affine maps. The suite recomputes everything with 2 × 2 complex density matrices:
// Kraus operators applied step by step, the trace distance from the eigenvalues of ρ − σ, the coherence mass from the
// off-diagonal entries, and the north-pole criterion by sampling the closed ball. It reads the page through
// window.NOISE_DEBUG and never calls the page's own model.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'bloch-noise';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));
const DEG = Math.PI / 180;
const sph = (th, ph) => [Math.sin(th * DEG) * Math.cos(ph * DEG), Math.sin(th * DEG) * Math.sin(ph * DEG), Math.cos(th * DEG)];

/* ---------- independent model: density matrices and Kraus operators ---------- */
const c = (re, im = 0) => [re, im];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], conj = (a) => [a[0], -a[1]];
const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
const dag = (A) => [0, 1].map((i) => [0, 1].map((j) => conj(A[j][i])));
const madd = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(A[i][j], B[i][j])));
const mscale = (A, k) => A.map((r) => r.map((z) => [z[0] * k, z[1] * k]));
/** ρ = ½(I + xX + yY + zZ). */
const density = (r) => [[c((1 + r[2]) / 2), c(r[0] / 2, -r[1] / 2)], [c(r[0] / 2, r[1] / 2), c((1 - r[2]) / 2)]];
const blochOf = (R) => [2 * R[0][1][0], -2 * R[0][1][1], R[0][0][0] - R[1][1][0]];
const channel = (Ks) => (R) => Ks.reduce((acc, K) => madd(acc, mmul(mmul(K, R), dag(K))), [[c(0), c(0)], [c(0), c(0)]]);
const I2 = [[c(1), c(0)], [c(0), c(1)]], X = [[c(0), c(1)], [c(1), c(0)]], Y = [[c(0), c(0, -1)], [c(0, 1), c(0)]], Z = [[c(1), c(0)], [c(0), c(-1)]];
/** One step of each noise, as Kraus operators, at strength p. */
const STEP = {
  dephase: (p) => { const cc = 1 - p; return channel([mscale(I2, Math.sqrt((1 + cc) / 2)), mscale(Z, Math.sqrt((1 - cc) / 2))]); },
  amp: (p) => channel([[[c(1), c(0)], [c(0), c(Math.sqrt(1 - p))]], [[c(0), c(Math.sqrt(p))], [c(0), c(0)]]]),
  depol: (p) => channel([mscale(I2, Math.sqrt(1 - 3 * p / 4)), mscale(X, Math.sqrt(p / 4)), mscale(Y, Math.sqrt(p / 4)), mscale(Z, Math.sqrt(p / 4))])
};
/** The state after rail position N: n whole Kraus steps, and between steps the convex mixture of steps k and k + 1. */
function evolve(ch, p, r0, N) {
  const step = STEP[ch](p), k = Math.floor(N + 1e-12), u = N - k;
  let R = density(r0);
  for (let i = 0; i < k; i++) R = step(R);
  return u < 1e-12 ? R : madd(mscale(R, 1 - u), mscale(step(R), u));
}
/** Trace distance ½‖ρ − σ‖₁ from the eigenvalues of the Hermitian 2 × 2 difference. */
function traceDistance(A, B) {
  const D = madd(A, mscale(B, -1)), a = D[0][0][0], d = D[1][1][0], b = D[0][1];
  const m = (a + d) / 2, r = Math.sqrt(((a - d) / 2) ** 2 + b[0] ** 2 + b[1] ** 2);
  return (Math.abs(m + r) + Math.abs(m - r)) / 2;
}
const coherenceMass = (R) => R[0][1][0] ** 2 + R[0][1][1] ** 2 + R[1][0][0] ** 2 + R[1][0][1] ** 2;
/** The amplitude-family map written with lifetimes: a = e^(−N/T1), λ = e^(−N/T2), T2 = ratio · T1 (whole steps only). */
function lifetimeMap(p, ratio, N) { const T1 = -1 / Math.log(1 - p), T2 = ratio * T1; return { lam: Math.exp(-N / T2), a: Math.exp(-N / T1) }; }
/** The largest |F(r)| over a sampled closed unit ball, F = (λx, λy, az + 1 − a); refined around the best sample. */
function bruteFarthest(lam, a) {
  const F = (x, y, z) => Math.hypot(lam * x, lam * y, a * z + 1 - a);
  let best = 0, bz = 0;
  for (let i = 0; i <= 400; i++) for (const rho of [1, 0.999, 0.9, 0.5, 0]) { const z = -1 + 2 * i / 400, w = Math.sqrt(Math.max(0, 1 - z * z)) * rho; const v = F(w, 0, z * (rho === 0 ? 1 : 1)); if (v > best) { best = v; bz = z; } }
  for (let it = 0, h = 0.005; it < 40; it++, h /= 2) for (const z of [bz - h, bz + h]) { if (z < -1 || z > 1) continue; const v = F(Math.sqrt(1 - z * z), 0, z); if (v > best) { best = v; bz = z; } }
  return best;
}
/* Channel or not, from the Choi matrix. A Bloch action r ↦ (λx, λy, az + h) is extended linearly to every 2 × 2 matrix
   through the Paulis (I ↦ I + hZ, X ↦ λX, Y ↦ λY, Z ↦ aZ); a map is a channel exactly when its Choi matrix
   J[2i + k][2j + l] = Φ(|i⟩⟨j|)[k][l] has no negative eigenvalue and its partial trace over the output is I. */
const cs = (z, k) => [z[0] * k, z[1] * k], cmat = (A, z) => A.map((r) => r.map((w) => cmul(w, z))), tr = (A) => cadd(A[0][0], A[1][1]);
const affineMap = (lam, a, h) => (M) => { const t0 = tr(M); return mscale([cmat(I2, t0), cmat(Z, cs(t0, h)), cmat(X, cs(tr(mmul(M, X)), lam)), cmat(Y, cs(tr(mmul(M, Y)), lam)), cmat(Z, cs(tr(mmul(M, Z)), a))].reduce(madd), 0.5); };
const matUnit = (i, j) => [0, 1].map((r) => [0, 1].map((q) => c(r === i && q === j ? 1 : 0)));
function choi(Phi) {
  const J = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => c(0)));
  for (const i of [0, 1]) for (const j of [0, 1]) { const O = Phi(matUnit(i, j)); for (const k of [0, 1]) for (const l of [0, 1]) J[2 * i + k][2 * j + l] = O[k][l]; }
  return J;
}
/** The smallest eigenvalue of a Hermitian matrix A + iB: cyclic Jacobi rotations on the real symmetric [[A, −B], [B, A]]. */
function minEig(H) {
  const n = H.length, N = 2 * n, S = Array.from({ length: N }, () => new Array(N).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const [re, im] = H[i][j]; S[i][j] = re; S[i + n][j + n] = re; S[i][j + n] = -im; S[i + n][j] = im; }
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) off += S[i][j] ** 2;
    if (off < 1e-30) break;
    for (let p = 0; p < N; p++) for (let q = p + 1; q < N; q++) {
      if (S[p][q] === 0) continue;
      const th = (S[q][q] - S[p][p]) / (2 * S[p][q]), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), co = 1 / Math.sqrt(t * t + 1), si = t * co;
      for (let k = 0; k < N; k++) { const x = S[k][p], y = S[k][q]; S[k][p] = co * x - si * y; S[k][q] = si * x + co * y; }
      for (let k = 0; k < N; k++) { const x = S[p][k], y = S[q][k]; S[p][k] = co * x - si * y; S[q][k] = si * x + co * y; }
    }
  }
  return Math.min(...S.map((r, i) => r[i]));
}
const isChannel = (Phi) => { const J = choi(Phi), ptr = (i, j) => cadd(J[2 * i][2 * j], J[2 * i + 1][2 * j + 1]); return minEig(J) >= -1e-12 && [0, 1].every((i) => [0, 1].every((j) => Math.hypot(...cadd(ptr(i, j), c(i === j ? -1 : 0))) < 1e-12)); };
const choiGap = (F, G) => { const A = choi(F), B = choi(G); return Math.max(...A.flatMap((r, i) => r.map((z, j) => Math.hypot(z[0] - B[i][j][0], z[1] - B[i][j][1])))); };
/** The two ends of the strength slider, as Kraus operators: no decay {I}, and the reset to |0⟩ {|0⟩⟨0|, |0⟩⟨1|}. */
const IDENTITY = channel([I2]), RESET = channel([[[c(1), c(0)], [c(0), c(0)]], [[c(0), c(1)], [c(0), c(0)]]]);
/** One step of the amplitude family at strength p with T2 = ratio · T1: Kraus operators at the ends, lifetime envelopes inside. */
const ampStep = (p, ratio) => { if (p === 0) return IDENTITY; if (p === 1) return RESET; const m = lifetimeMap(p, ratio, 1); return affineMap(m.lam, m.a, 1 - m.a); };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.NOISE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.NOISE_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const chip = async (ch) => { await page.click(`#chChips [data-ch="${ch}"]`); await settle(page); };
/** Compare the page's state with the density-matrix computation. */
function agrees(s) {
  const R = evolve(s.ch, s.p, s.rho0, s.t), Sg = evolve(s.ch, s.p, s.sig0, s.t);
  const err = Math.max(...blochOf(R).map((x, i) => Math.abs(x - s.rho[i])), ...blochOf(Sg).map((x, i) => Math.abs(x - s.sig[i])),
    Math.abs(traceDistance(R, Sg) - s.T), Math.abs(traceDistance(density(s.rho0), density(s.sig0)) - s.T0), Math.abs(coherenceMass(R) - s.mass));
  return err;
}

let s = await state();
check('opens on the DRIFT-NORTH card at its still frame N = 3.5', s.preset === 'amp' && s.ch === 'amp' && close(s.t, 3.5) && !s.playing);
check('the opening state agrees with Kraus operators on density matrices', agrees(s) < 1e-12, `error ${agrees(s)}`);

// every channel, several strengths, whole and fractional steps, against the Kraus computation
let worst = 0, monotone = true;
for (const ch of ['dephase', 'amp', 'depol']) {
  await chip(ch);
  for (const p of [0.1, 0.37, 0.8, 1]) {
    await setRange('strength', p);
    for (const N of [0, 0.5, 1, 1.25, 2, 3]) { s = await seek(N); if (N <= s.max) worst = Math.max(worst, agrees(s)); }
    const Ts = await page.evaluate((mx) => Array.from({ length: 41 }, (_, i) => window.NOISE_DEBUG.at(mx * i / 40).T), s.max);
    for (let i = 1; i < Ts.length; i++) if (Ts[i] > Ts[i - 1] + 1e-12) monotone = false;
  }
}
check('three noises × four strengths × whole and in-between steps: ρ, σ, T and coherence mass match the density matrices', worst < 1e-12, `max error ${worst}`);
check('along the whole rail the distance never grows (sampled at 41 points for each case)', monotone);
check('the strength slider sets p and the rail length (p = 1 runs one step)', s.p === 1 && s.max === 1);
await setRange('strength', 0.3); s = await state();
check('a weaker strength lengthens the rail (p = 0.3 → 8 steps)', s.p === 0.3 && s.max === 8 && s.preset === null);

// cards: end states
// SHORTER: the rail is the angle θ_env of the two environment records. Independent check: build the joint pure state
// a|0⟩|e₀⟩ + b|1⟩|e₁⟩ as a 4-vector, form the 4 × 4 density matrix and trace the environment out by summing blocks.
function partialTrace(r, thDeg) {
  const t = Math.acos(Math.max(-1, Math.min(1, r[2]))) / 2, ph = Math.atan2(r[1], r[0]), th = thDeg * DEG;
  const a = [Math.cos(t), 0], b = [Math.sin(t) * Math.cos(ph), Math.sin(t) * Math.sin(ph)];
  const e0 = [1, 0], e1 = [Math.cos(th), Math.sin(th)];
  const psi = [[a[0] * e0[0], a[1] * e0[0]], [a[0] * e0[1], a[1] * e0[1]], [b[0] * e1[0], b[1] * e1[0]], [b[0] * e1[1], b[1] * e1[1]]];   // |s e⟩, index 2s + e
  const J = (i, j) => [psi[i][0] * psi[j][0] + psi[i][1] * psi[j][1], psi[i][1] * psi[j][0] - psi[i][0] * psi[j][1]];   // ψ_i ψ̄_j
  const red = [0, 1].map((i) => [0, 1].map((j) => [0, 1].reduce((acc, e) => { const z = J(2 * i + e, 2 * j + e); return [acc[0] + z[0], acc[1] + z[1]]; }, [0, 0])));
  return blochOf(red);
}
await pick('shorten'); s = await seek(50);
check('SHORTER: the rail is the record angle, the page is in the environment scene', s.scene === 'env' && s.max === 90);
check('SHORTER at θ_env = 50°: |+⟩ and |−⟩ shrink along x to ±cos 50°, by the 4 × 4 partial trace', vclose(s.rho, partialTrace(s.rho0, 50), 1e-12) && vclose(s.sig, partialTrace(s.sig0, 50), 1e-12) && vclose(s.rho, [Math.cos(50 * DEG), 0, 0], 1e-12) && close(s.len, Math.cos(50 * DEG), 1e-12));
check('SHORTER: the stage reads the arrow length cos θ_env', (await page.textContent('#hudSub')).includes(Math.cos(50 * DEG).toFixed(3)) && (await page.textContent('#hudBig')).includes('50.0°'));
let ptErr = 0;
for (const th of [0, 15, 33, 61, 89]) { s = await seek(th); ptErr = Math.max(ptErr, ...s.rho.map((x, i) => Math.abs(x - partialTrace(s.rho0, th)[i])), Math.abs(s.T - Math.cos(th * DEG))); }
check('SHORTER: at five angles ρ is the partial trace and the distance of the |±⟩ pair is cos θ_env', ptErr < 1e-12, `max error ${ptErr}`);
s = await seek(90);
check('SHORTER at 90°: orthogonal records, the arrow is at the centre (the unread pinching of the text)', vclose(s.rho, [0, 0, 0], 1e-12) && vclose(s.sig, [0, 0, 0], 1e-12));
await setRange('strength', 0.3); s = await state();
check('the strength slider takes the page back to the step-by-step noises', s.scene === 'noise' && s.max === 8);
await pick('pinch'); s = await seek(1);
let R = evolve('dephase', 1, s.rho0, 1);
check('ONTO-AXIS: one step of pinching leaves ρ with zero off-diagonal entries and the same diagonal', coherenceMass(R) < 1e-24 && close(R[0][0][0], density(s.rho0)[0][0][0], 1e-12) && close(s.mass, 0, 1e-12));
check('ONTO-AXIS: ρ and σ (same height) land on the same point of the axis, T = 0', vclose(s.rho, s.sig, 1e-12) && vclose(s.rho, [0, 0, Math.cos(60 * DEG)], 1e-12) && close(s.T, 0, 1e-12));
check('ONTO-AXIS: the discarded coherence mass before pinching is |ρ₀₁|² + |ρ₁₀|² = 0.375', close(s.mass0, coherenceMass(density(s.rho0)), 1e-12) && close(s.mass0, 0.375, 1e-12));
const diag = density([0, 0, 0.3]);
check('ONTO-AXIS: a state on the axis is a fixed point of pinching (independent check)', vclose(blochOf(STEP.dephase(1)(diag)), [0, 0, 0.3], 1e-12));
await pick('dephase'); s = await seek(2.5);
check('CIGAR: heights are kept, the sideways part is scaled', close(s.rho[2], s.rho0[2], 1e-12) && close(s.sig[2], s.sig0[2], 1e-12) && close(s.lam, 0.7 ** 2 * (1 - 0.5 * 0.3), 1e-12) && close(s.a, 1));
await pick('amp'); s = await seek(8);
check('DRIFT-NORTH: ρ from the south pole climbs towards the north pole', s.rho0[2] < -0.999 && close(s.rho[2], 1 - 2 * 0.7 ** 8, 1e-12) && s.rho[2] > 0.88 && agrees(s) < 1e-12);
await pick('wide'); s = await seek(1.7);
check('T2 > 2T1: the page reports that the image pierces the skin', s.escapes && s.lam ** 2 > s.a);
// the page's farthest point against a sampled ball, at whole steps, and the criterion λ² ≤ a ⇔ the ball is kept
let critOK = true, farErr = 0;
for (const ratio of [0.5, 1, 1.9, 2, 2.1, 3, 6, 8]) {
  await setRange('ratio', ratio);
  for (const N of [1, 2, 3]) {
    s = await seek(N);
    const m = lifetimeMap(s.p, ratio, N), far = bruteFarthest(m.lam, m.a), kept = far <= 1 + 1e-9;
    farErr = Math.max(farErr, Math.abs(far - s.farthest), Math.abs(m.lam - s.lam), Math.abs(m.a - s.a));
    if (kept !== (m.lam ** 2 <= m.a + 1e-12) || kept === s.escapes) critOK = false;
  }
}
check('lifetime slider: λ = e^(−N/T2), a = e^(−N/T1), and the farthest image point matches a sampled ball', farErr < 1e-6, `max error ${farErr}`);
check('north-pole criterion: the sampled ball is kept exactly when λ² ≤ a (T2 ≤ 2T1), and the page says so', critOK);
s = await state();
check('the magenta legend entry appears only when the image pierces the skin', (await page.evaluate(() => document.getElementById('legEsc').hidden)) === !s.escapes);
await setRange('ratio', 2); s = await seek(2);
check('T2 = 2T1 is pure amplitude damping: Kraus operators agree and the ball is kept', !s.escapes && agrees(s) < 1e-12);
await chip('depol');
check('the lifetime slider is disabled away from amplitude damping', await page.evaluate(() => document.getElementById('ratio').disabled));
await setRange('strength', 0.3); s = await seek(2);
check('depolarizing at p = 0.3 scales every state by 0.7² = 0.49 towards the centre after two steps', vclose(s.rho, s.rho0.map((x) => 0.49 * x), 1e-12) && vclose(s.sig, s.sig0.map((x) => 0.49 * x), 1e-12));
await pick('distance'); s = await seek(1);
check('NEVER-FARTHER: north pole and +x, amplitude damping γ = ½: T 0.7071 → 0.4330', close(s.T0, Math.SQRT1_2, 1e-12) && close(s.T, 0.4330127, 1e-6) && agrees(s) < 1e-12);
const table = {};
for (const ch of ['dephase', 'depol']) { await chip(ch); table[ch] = (await state()).T; }
check('NEVER-FARTHER: the chapter table for this pair (dephasing 0.5590, depolarizing 0.3536)', close(table.dephase, 0.5590170, 1e-6) && close(table.depol, 0.3535534, 1e-6));
await pick('shorten'); await setRange('strength', 0.5);
const pm = {};
for (const ch of ['dephase', 'amp', 'depol']) { await chip(ch); pm[ch] = (await seek(1)).T; }
check('the second column of the table, +x and −x (0.5000, 0.7071, 0.5000)', close(pm.dephase, 0.5, 1e-12) && close(pm.amp, Math.SQRT1_2, 1e-12) && close(pm.depol, 0.5, 1e-12));
await pick('centre'); s = await seek(1);
R = evolve('depol', 1, s.rho0, 1);
check('DEAD-CENTRE: both states land on r = 0, ρ = I/2, distance 0', vclose(s.rho, [0, 0, 0], 1e-12) && vclose(s.sig, [0, 0, 0], 1e-12) && close(R[0][0][0], 0.5, 1e-12) && close(s.T, 0, 1e-12));
check('DEAD-CENTRE: the readout note says the origin can no longer be told', (await page.textContent('#roNote')).includes('分不出'));

// playback, rail and keyboard
await page.click('[data-preset="amp"]');
check('clicking a card plays it', await until(page, () => { const d = window.NOISE_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.NOISE_DEBUG.seek(7.9)); await page.click('#play');   // from just before the end, so that slow frames reach it too
check('playback stops at the end of the rail', await until(page, () => { const d = window.NOISE_DEBUG.state; return !d.playing && d.t >= d.max - 1e-9; }));
await page.click('#rew'); check('⏮ returns to step 0', close((await state()).t, 0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); check('→ steps one whole step', close((await state()).t, 2));
await page.keyboard.press('ArrowLeft'); check('← steps back', close((await state()).t, 1));
await page.keyboard.press('End'); check('End goes to the last step', close((await state()).t, 8));
await page.keyboard.press('Home'); check('Home returns to step 0', close((await state()).t, 0));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.NOISE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); await settle(page);
check('Space pauses', !paused.playing && close((await state()).t, paused.t));
await page.click('#play'); check('▶ plays', await until(page, () => window.NOISE_DEBUG.state.playing));
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await setRange('now', 2.25); s = await state();
check('scrubbing the rail sets N between steps', close(s.t, 2.25) && agrees(s) < 1e-12);
await page.click('#chChips [data-ch="dephase"]'); s = await state();
check('the noise chips switch the channel and leave the card', s.ch === 'dephase' && s.preset === null);

// dragging ρ on the skin, and orbiting the camera
await pick('amp');
const from = await page.evaluate(() => window.NOISE_DEBUG.screen(window.NOISE_DEBUG.state.rho0));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] + 70, from[1] - 120, { steps: 5 }); await page.mouse.up();
s = await state();
const to = await page.evaluate(() => window.NOISE_DEBUG.screen(window.NOISE_DEBUG.state.rho0));
check('dragging ρ puts its starting point under the pointer, on the skin', Math.hypot(to[0] - from[0] - 70, to[1] - from[1] + 120) < 1.5 && close(Math.hypot(...s.rho0), 1, 1e-12), JSON.stringify(to));
check('after the drag the page still agrees with the density matrices and leaves the card', agrees(s) < 1e-12 && s.preset === null);
const sigFrom = await page.evaluate(() => window.NOISE_DEBUG.screen(window.NOISE_DEBUG.state.sig0));
await page.mouse.move(sigFrom[0], sigFrom[1]); await page.mouse.down(); await page.mouse.move(sigFrom[0] - 40, sigFrom[1] - 40, { steps: 4 }); await page.mouse.up();
s = await state();
check('dragging σ moves σ and not ρ', !vclose(s.sig0, sph(90, 0), 1e-3) && close(Math.hypot(...s.sig0), 1, 1e-12));
const cam0 = await page.evaluate(() => window.NOISE_DEBUG.camera()), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 50, box.y + box.height - 80); await page.mouse.down(); await page.mouse.move(box.x + 150, box.y + box.height - 120, { steps: 4 }); await page.mouse.up();
const cam1 = await page.evaluate(() => window.NOISE_DEBUG.camera());
check('dragging empty space orbits the camera and leaves the states alone', cam1.yaw !== cam0.yaw && vclose((await state()).rho0, s.rho0));

// the stills printed in chapter 4: what the title and the labels say at the frame the reader sees
const stillOf = async (card) => {
  const pg = await T.goto(BOOK, ID, `?shot=1&lang=zh&preset=${card}`, await T.newPage());
  await settle(pg);
  const out = await pg.evaluate(() => {
    const vis = [...document.querySelectorAll('#stage .tag')].filter((t) => !t.hidden).map((t) => { const b = t.getBoundingClientRect(); return { text: t.textContent, l: b.left, r: b.right, t: b.top, b: b.bottom }; });
    return { s: window.NOISE_DEBUG.state, big: document.getElementById('hudBig').textContent, sub: document.getElementById('hudSub').textContent, dist: document.getElementById('roDistSub').textContent, vis };
  });
  await pg.close();
  return out;
};
const overlaps = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
let w = await stillOf('wide');
const wm = lifetimeMap(w.s.p, 6, w.s.t), wfar = bruteFarthest(wm.lam, wm.a);
check('T2 > 2T1 still: λ = a^(1/6) pierces the ball (λ² > a), so the title does not call the map amplitude damping and says it is not a channel', close(w.s.lam, Math.pow(w.s.a, 1 / 6), 1e-12) && wm.lam ** 2 > wm.a && !/振幅阻尼/.test(w.big) && /不是信道/.test(w.big) && w.sub.includes('T₂ = 6.0 T₁'), w.big);
check('T2 > 2T1 still: the escape label reads the farthest image point, found by an independent search', w.vis.some((t) => t.text.includes(`‖r‖ = ${wfar.toFixed(3)}`)) && close(w.s.farthest, wfar, 1e-6));
check('T2 > 2T1 still: no distance T is shown on the stage, and the readout says the theorem does not apply', !w.vis.some((t) => /^T /.test(t.text)) && /不是信道/.test(w.dist));
const tagOf = (o, re) => o.vis.find((t) => re.test(t.text));
check('T2 > 2T1 still: the labels “fixed point” and |0⟩ do not sit on each other or on the escape label', (() => { const a = tagOf(w, /不动点/), b = tagOf(w, /\|0⟩/), e = tagOf(w, /出界/); return a && b && e && !overlaps(a, b) && !overlaps(a, e) && !overlaps(b, e); })());
const dStill = await stillOf('distance');
check('NEVER-FARTHER still: the labels ρ and |0⟩ at the north pole do not sit on each other', (() => { const a = tagOf(dStill, /^ρ$/), b = tagOf(dStill, /\|0⟩/); return a && b && !overlaps(a, b); })());
const shStill = await stillOf('shorten');
check('SHORTER still: θ_env = 75°, the arrow keeps cos 75° = 0.259', close(shStill.s.t, 75) && close(shStill.s.len, Math.cos(75 * DEG), 1e-12) && shStill.sub.includes('0.259'), shStill.sub);
const pinchStill = await stillOf('pinch');
check('ONTO-AXIS still: the title says pinching, not phase damping, and the readout gives the coherence mass of ρ lost, 0.375 → 0', /捏合/.test(pinchStill.big) && !/相位阻尼/.test(pinchStill.big) && pinchStill.sub.includes(`${coherenceMass(density(pinchStill.s.rho0)).toFixed(3)} → 0.000`), pinchStill.sub);
check('ONTO-AXIS still: ρ and σ land on one point and their labels do not overlap', vclose(pinchStill.s.rho, pinchStill.s.sig, 1e-12) && !overlaps(tagOf(pinchStill, /^ρ$/), tagOf(pinchStill, /^σ$/)));

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Amplitude damping'));

// the T2 > 2T1 card, then only the strength moved to an end of its slider: the ratio stays at 6, but p = 0 is the
// identity and p = 1 the reset to the north pole, both channels whatever the ratio; strictly inside, T2 > 2T1 is not
const ep = await T.goto(BOOK, ID, '?lang=zh', await T.newPage());
const WORDS = { zh: { not: /不是信道/, amp: /^振幅阻尼 · /, grows: /只减不增/, inside: /在球里/ }, en: { not: /not a channel/, amp: /^Amplitude damping · /, grows: /never grows/, inside: /inside/ } };
/** What the reader sees in the current language: stage title and line, readouts, the stage labels with their boxes. */
const shown = async () => { await settle(ep); return ep.evaluate(() => {
  const txt = (id) => document.getElementById(id).textContent;
  const tags = [...document.querySelectorAll('#stage .tag')].filter((t) => !t.hidden).map((t) => { const b = t.getBoundingClientRect(); return { text: t.textContent, l: b.left, r: b.right, t: b.top, b: b.bottom }; });
  return { lang: document.documentElement.dataset.lang, big: txt('hudBig'), sub: txt('hudSub'), dist: txt('roDistSub'), ball: txt('roBall'), tags, s: window.NOISE_DEBUG.state,
    ctrl: [txt('oStrength'), document.getElementById('ratio').value, txt('oRatio')] };
}); };
/** The page's verdict in one language: 'not' or 'channel' when title, line and distance readout agree, else 'mixed'. */
const verdict = (v) => {
  const w = WORDS[v.lang], cites = /> 2 T₁/.test(v.sub);
  if (w.not.test(v.big) && w.not.test(v.dist) && cites) return 'not';
  return w.amp.test(v.big) && !w.not.test(v.big) && w.grows.test(v.dist) && !w.not.test(v.dist) && !cites ? 'channel' : 'mixed';
};
const lang = async (l) => { await ep.click(`[data-lang-set="${l}"]`); await settle(ep); };
const both = async () => { await lang('zh'); const zh = await shown(); await lang('en'); const en = await shown(); await lang('zh'); return { zh, en }; };
/** A key on a slider's own keyboard (Home / End / arrows move a range input to its ends or by one step). */
const slider = async (id, k) => { await ep.focus(`#${id}`); await ep.keyboard.press(k); await settle(ep); };
/** Keys on the rail: leave the slider first, so that Home and → reach the clock. */
const rail = async (...ks) => { await ep.evaluate(() => document.activeElement && document.activeElement.blur()); for (const k of ks) { await ep.keyboard.press(k); await settle(ep); } };
const tagT = (v) => v.tags.find((t) => /^T \d/.test(t.text));
await lang('zh');
await ep.click('[data-preset="wide"]'); await settle(ep);
await rail('Home', 'ArrowRight');
let v = await both(), es = v.zh.s;
check('T2 > 2T1 card, rail at N = 1 by Home and →: p = ½, T2 / T1 = 6, paused', es.preset === 'wide' && es.p === 0.5 && es.ratio === 6 && close(es.t, 1) && !es.playing);
check('inside 0 < p < 1 (p = ½, T2 = 6 T1): the Choi matrix of one step has a negative eigenvalue, and in both languages the title, the line under it and the distance readout say it is not a channel, with no distance label on the stage', !isChannel(ampStep(0.5, 6)) && choiGap(affineMap(es.lam, es.a, es.h), ampStep(0.5, 6)) < 1e-12 && verdict(v.zh) === 'not' && verdict(v.en) === 'not' && !tagT(v.zh) && !tagT(v.en), JSON.stringify([v.zh.big, v.en.big, v.en.dist]));
for (const [k, r, ok] of [['Home', 0.5, true], ['End', 8, false]]) {
  await slider('ratio', k); v = await both(); es = v.zh.s;
  check(`p = ½ at the end T2 / T1 = ${r} of the lifetime slider: the Choi matrix of the page's step says ${ok ? 'channel' : 'not a channel'}, and so do both languages`, es.ratio === r && es.p === 0.5 && close(es.t, 1) && choiGap(affineMap(es.lam, es.a, es.h), ampStep(0.5, r)) < 1e-12 && isChannel(ampStep(0.5, r)) === ok && verdict(v.zh) === (ok ? 'channel' : 'not') && verdict(v.en) === (ok ? 'channel' : 'not'), JSON.stringify([v.zh.big, v.en.big]));
}
const T0of = (s) => traceDistance(density(s.rho0), density(s.sig0));
const overlapsAny = (v, a) => v.tags.some((b) => b !== a && a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b);
for (const [end, p, K, name] of [['Home', 0, IDENTITY, 'identity {I}'], ['End', 1, RESET, 'reset {|0⟩⟨0|, |0⟩⟨1|}']]) {
  await ep.click('[data-preset="wide"]'); await settle(ep);
  await slider('strength', end); await rail('Home', 'ArrowRight');
  v = await both(); es = v.zh.s;
  check(`p = ${p} by the strength slider's ${end} key after the card: T2 / T1 stays 6.0, the rail is at N = 1`, es.p === p && es.ratio === 6 && v.zh.ctrl[0] === p.toFixed(2) && v.zh.ctrl[1] === '6' && v.zh.ctrl[2] === '6.0' && es.preset === null && close(es.t, 1) && !es.playing, JSON.stringify(v.zh.ctrl));
  check(`p = ${p}, T2 = 6 T1: the page's step has the Choi matrix of the Kraus ${name}, a channel; ρ and σ are where the Kraus operators put them`, choiGap(affineMap(es.lam, es.a, es.h), K) < 1e-12 && isChannel(K) && isChannel(ampStep(p, 6)) && vclose(es.rho, blochOf(K(density(es.rho0))), 1e-12) && vclose(es.sig, blochOf(K(density(es.sig0))), 1e-12));
  check(`p = ${p}, T2 = 6 T1: in both languages the title says amplitude damping, the line under it does not cite T2 > 2T1, the distance readout says it never grows and the ball is kept`, verdict(v.zh) === 'channel' && verdict(v.en) === 'channel' && WORDS.zh.inside.test(v.zh.ball) && WORDS.en.inside.test(v.en.ball) && !es.escapes, JSON.stringify([v.zh.big, v.zh.sub, v.zh.dist, v.en.big, v.en.sub, v.en.dist]));
  const Tk = traceDistance(K(density(es.rho0)), K(density(es.sig0)));
  check(`p = ${p}, T2 = 6 T1: the distance after (${Tk.toFixed(4)}) is the Kraus value and not above the distance before (${T0of(es).toFixed(4)})`, close(es.T, Tk, 1e-12) && Tk <= T0of(es) + 1e-12);
  if (p === 0) check('p = 0, T2 = 6 T1: the stage labels the distance T with the Kraus value in both languages, clear of every other label', [v.zh, v.en].every((x) => { const a = tagT(x); return a && a.text === `T ${Tk.toFixed(3)}` && !overlapsAny(x, a); }), JSON.stringify(v.zh.tags.map((t) => t.text)));
  for (const [k, r] of [['Home', 0.5], ['End', 8]]) {
    await slider('ratio', k); v = await both(); es = v.zh.s;
    check(`p = ${p} at the end T2 / T1 = ${r} of the lifetime slider: still the Kraus ${name}, and both languages call it a channel`, es.ratio === r && es.p === p && choiGap(affineMap(es.lam, es.a, es.h), K) < 1e-12 && verdict(v.zh) === 'channel' && verdict(v.en) === 'channel', JSON.stringify([v.zh.big, v.en.big]));
  }
  // one notch inside the slider the ratio counts again: T2 = 8 T1 is not a channel at p = 0.01 or 0.99
  await slider('strength', p === 0 ? 'ArrowRight' : 'ArrowLeft'); v = await both(); es = v.zh.s;
  const q = p === 0 ? 0.01 : 0.99;
  check(`one notch inside, p = ${q} at T2 = 8 T1: the page's step has a Choi matrix with a negative eigenvalue and both languages say not a channel`, close(es.p, q, 1e-12) && es.ratio === 8 && close(es.t, 1) && choiGap(affineMap(es.lam, es.a, es.h), ampStep(es.p, 8)) < 1e-12 && !isChannel(ampStep(es.p, 8)) && verdict(v.zh) === 'not' && verdict(v.en) === 'not', JSON.stringify([es.p, v.zh.big, v.en.big]));
}
// p = 1 between the two whole steps of its rail: the convex mixture of the identity and the reset, still a channel
await ep.click('[data-preset="wide"]'); await settle(ep);
await slider('strength', 'End'); await rail('Home');
await ep.evaluate(() => { const el = document.getElementById('now'); el.value = '0.5'; el.dispatchEvent(new Event('input', { bubbles: true })); });
v = await both(); es = v.zh.s;
const halfway = (M) => madd(mscale(IDENTITY(M), 0.5), mscale(RESET(M), 0.5));
check('p = 1, T2 = 6 T1, the rail scrubbed to N = ½: the page shows the Choi matrix of ½ identity + ½ reset, a channel, and both languages say so', es.p === 1 && es.ratio === 6 && close(es.t, 0.5) && choiGap(affineMap(es.lam, es.a, es.h), halfway) < 1e-12 && isChannel(halfway) && verdict(v.zh) === 'channel' && verdict(v.en) === 'channel');
// the theory drawer, in each language: the rate equivalence is stated for 0 < p < 1 and the two ends are named
const endsAreChannels = [0.5, 2, 6, 8].every((r) => isChannel(ampStep(0, r)) && isChannel(ampStep(1, r))) && [2.1, 6, 8].every((r) => [0.01, 0.5, 0.99].every((p) => !isChannel(ampStep(p, r))));
const idFixesAll = [[0, 0, -1], [1, 0, 0], [0.3, -0.4, 0.5]].every((r) => vclose(blochOf(IDENTITY(density(r))), r, 1e-12)) && !vclose(blochOf(STEP.amp(0.01)(density([0, 0, -1]))), [0, 0, -1], 1e-6);
for (const l of ['zh', 'en']) {
  await lang(l); await ep.click('#infoBtn'); await settle(ep);
  const items = await ep.evaluate((x) => ({ open: !document.getElementById('drawer').hidden, li: [...document.querySelectorAll(`#drawer .sheet > .${x} li`)].map((li) => li.innerText) }), l);
  await ep.keyboard.press('Escape'); await settle(ep);
  const rate = items.li.find((t) => t.includes('T₂ ≤ 2T₁')) || '', shapes = items.li.find((t) => t.includes('(cx, cy, z)')) || '';
  check(`drawer (${l}): T2 ≤ 2T1 ⇔ λ² ≤ a is stated for 0 < p < 1 and p = 0, p = 1 are named as channels for every ratio, as the Choi matrices show`, items.open && endsAreChannels && rate.includes('0 < p < 1') && /p = 0\b/.test(rate) && /p = 1\b/.test(rate), rate);
  check(`drawer (${l}): the fixed sets of the three noises are given for p > 0, and p = 0 keeps every point (the identity Kraus map fixes them all)`, idFixesAll && shapes.includes('p > 0') && /p = 0\b/.test(shapes), shapes);
}
await lang('zh'); await ep.close();

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
