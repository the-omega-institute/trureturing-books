#!/usr/bin/env node
// Browser regression suite for ORTHO//FAIRNESS (books/quantum-geometry/viz/quantum-fairness-ledger/):
//   node books/quantum-geometry/viz/tests/quantum-fairness-ledger.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first gates, every claim of the page is checked against an independent computation written here:
//   seat     Born weights from 2 × 2 density matrices Tr(ρ_ψ P_φ) and from the Bloch formula; cap shares counted from the
//            page's own sample points against (1 − cos α)/2 with a binomial tolerance
//   gain     the 2 × 2 density matrix rebuilt from the arrow: purity, probabilities and coherence read off directly
//   bonds    the 8-amplitude state vector: ρ_AB and ρ_AC by partial trace, Wootters concurrence through a Jacobi
//            eigen-solver (√ρ ρ̃ √ρ), the three-tangle through Cayley's hyperdeterminant, τ_A(BC) = 4 det ρ_A
//   copies   the symmetric cloner P_sym (|ψ⟩⟨ψ| ⊗ I) P_sym in the Dicke basis, its single-copy fidelity summed exactly
//   ergodic  the orbit recounted through h(x) = cos 2π(x − c) > cos π(2 − φ), and the closed form of the discrepancy
//            {(T + 1)α + u'} − {α + u'} (Hecke–Kesten for an interval of length 1 − α), run to T = 10⁵
// It reads the page through window.FAIRNESS_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'quantum-fairness-ledger';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

await stageFirstChecks(T, BOOK, ID);

/* ---------- independent linear algebra ---------- */
/** Eigenvalues of a real symmetric matrix by cyclic Jacobi rotations. */
function jacobi(A0) {
  const n = A0.length, A = A0.map((r) => r.slice()), V = A.map((_, i) => A.map((__, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
      for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
    }
  }
  return { vals: A.map((r, i) => r[i]), vecs: V };
}
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
function sqrtm(A) { const { vals, vecs } = jacobi(A), n = A.length; return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => vals.reduce((s, v, k) => s + Math.sqrt(Math.max(0, v)) * vecs[i][k] * vecs[j][k], 0))); }
/** Wootters concurrence of a real two-qubit density matrix. */
function concurrence(rho) {
  const YY = [[0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 0], [-1, 0, 0, 0]], tilde = mul(mul(YY, rho), YY), sr = sqrtm(rho);
  const lam = jacobi(mul(mul(sr, tilde), sr)).vals.map((v) => Math.sqrt(Math.max(0, v))).sort((a, b) => b - a);
  return Math.max(0, lam[0] - lam[1] - lam[2] - lam[3]);
}
/** All tangles of a real three-qubit vector psi[a*4 + b*2 + c]. */
function tangles(psi) {
  const amp = (a, b, c) => psi[a * 4 + b * 2 + c];
  const rAB = [], rAC = [];
  for (let i = 0; i < 4; i++) { rAB.push([]); rAC.push([]); for (let j = 0; j < 4; j++) { let s1 = 0, s2 = 0; for (let k = 0; k < 2; k++) { s1 += amp(i >> 1, i & 1, k) * amp(j >> 1, j & 1, k); s2 += amp(i >> 1, k, i & 1) * amp(j >> 1, k, j & 1); } rAB[i].push(s1); rAC[i].push(s2); } }
  const rA = [[0, 0], [0, 0]]; for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let x = 0; x < 4; x++) rA[a][b] += psi[a * 4 + x] * psi[b * 4 + x];
  const A = (i) => psi[i];
  const d1 = A(0) ** 2 * A(7) ** 2 + A(1) ** 2 * A(6) ** 2 + A(2) ** 2 * A(5) ** 2 + A(4) ** 2 * A(3) ** 2;
  const d2 = A(0) * A(7) * A(3) * A(4) + A(0) * A(7) * A(5) * A(2) + A(0) * A(7) * A(6) * A(1) + A(3) * A(4) * A(5) * A(2) + A(3) * A(4) * A(6) * A(1) + A(5) * A(2) * A(6) * A(1);
  const d3 = A(0) * A(6) * A(5) * A(3) + A(7) * A(1) * A(2) * A(4);
  return { tAB: concurrence(rAB) ** 2, tAC: concurrence(rAC) ** 2, t3: 4 * Math.abs(d1 - 2 * d2 + 4 * d3), tABC: 4 * (rA[0][0] * rA[1][1] - rA[0][1] * rA[1][0]), rz: rA[0][0] - rA[1][1] };
}
const vecOf = ({ a, b, c, g }) => { const v = Array(8).fill(0); v[0] = a; v[6] = b; v[5] = c; v[7] = g; return v; };   // |000⟩ |110⟩ |101⟩ |111⟩

/* ---------- page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.FAIRNESS_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.FAIRNESS_DEBUG.seek(x), t); return state(); };
const scene = async (k) => { await page.locator('body').click({ position: { x: 3, y: 3 } }); await page.keyboard.press(String(k)); return state(); };

let s = await state();
check('opens on HAAR in the seat scene with all 600 points', s.preset === 'haar' && s.scene === 'seat' && s.n === 600 && !s.playing);
{ const hn = await page.textContent('#presetNote'); check('HAAR note marks the uniform measure as a literature result', /哈尔测度）?，?文献结果/.test(hn), hn); }

// SEAT
{
  const bornTrace = (u, w) => {   // Tr(ρ_u P_w) with ρ = (I + u·σ)/2, P = (I + w·σ)/2 — complex 2 × 2 matrices
    const M = (v) => [[[(1 + v[2]) / 2, 0], [v[0] / 2, -v[1] / 2]], [[v[0] / 2, v[1] / 2], [(1 - v[2]) / 2, 0]]];
    const A = M(u), B = M(w); let re = 0;
    for (let i = 0; i < 2; i++) for (let k = 0; k < 2; k++) re += A[i][k][0] * B[k][i][0] - A[i][k][1] * B[k][i][1];
    return re;
  };
  check('seat: |⟨φ|ψ⟩|² = |⟨ψ|φ⟩|² = Tr(ρ_ψ P_φ) = Tr(ρ_φ P_ψ), from 2 × 2 matrices', close(s.wPsiPhi, s.wPhiPsi, 1e-12) && close(s.wPsiPhi, bornTrace(s.psi, s.phi), 1e-12) && close(bornTrace(s.phi, s.psi), s.wPhiPsi, 1e-12) && close(s.wBloch, s.wPsiPhi, 1e-12));
  const pts = s.points, z = (p) => p[2];
  const mean = pts.reduce((a, p) => a + z(p), 0) / pts.length, m2 = pts.reduce((a, p) => a + z(p) ** 2, 0) / pts.length;
  check('seat: 600 points on the unit sphere with z uniform (mean ≈ 0, mean z² ≈ 1/3)', pts.every((p) => close(Math.hypot(...p), 1, 1e-12)) && Math.abs(mean) < 0.08 && Math.abs(m2 - 1 / 3) < 0.04, `${mean} ${m2}`);
  const count = (axis, a) => pts.filter((p) => p[0] * axis[0] + p[1] * axis[1] + p[2] * axis[2] >= Math.cos(a * Math.PI / 180)).length / pts.length;
  check('seat: the page counts the cap share exactly', close(s.share, count(s.axis, s.cap), 1e-12) && close(s.theory, 0.25, 1e-12));
  const sd = Math.sqrt(0.25 * 0.75 / 600); let worst = 0;
  for (let i = 0; i < 40; i++) { const th = Math.acos(1 - 2 * ((i * 0.618) % 1)), ph = i * 2.4; worst = Math.max(worst, Math.abs(count([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)], 60) - 0.25)); }
  check('seat: for 40 different axes the 60° cap holds 25% within 4 binomial sigmas', worst < 4 * sd, `${worst} vs ${4 * sd}`);
  check('seat: the centroid is close to the centre (|r̄| < 3/√N)', s.cen < 3 / Math.sqrt(600) && close(s.cen, Math.hypot(...[0, 1, 2].map((k) => pts.reduce((a, p) => a + p[k], 0) / 600)), 1e-12));
  await page.evaluate(() => { const el = document.getElementById('capA'); el.value = '90'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  s = await state();
  check('seat: the cap slider sets α = 90°, half the sphere, and leaves the card', s.cap === 90 && close(s.theory, 0.5, 1e-12) && s.preset === null && Math.abs(s.share - 0.5) < 4 * Math.sqrt(0.25 / 600));
  // drag the amber axis to a new place: the share follows its own count
  const from = await page.evaluate(() => window.FAIRNESS_DEBUG.at(window.FAIRNESS_DEBUG.state.axis)), to = await page.evaluate(() => window.FAIRNESS_DEBUG.at([0.6, -0.5, 0.62]));
  await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 6 }); await page.mouse.up();
  s = await state();
  check('seat: dragging the amber axis moves it, and the share is recounted', Math.abs(s.axis[2] - 1) > 0.05 && close(s.share, count(s.axis, s.cap), 1e-12), JSON.stringify(s.axis));
  await pick('haar');
  check('HAAR plays by itself when clicked', await until(page, () => { const d = window.FAIRNESS_DEBUG.state; return d.playing && d.t > 0; }));
  s = await seek(120); check('seat: the rail is the number of points', s.n === 120 && s.points.length === 120);
}

// GAIN
{
  s = await scene(2);
  check('key 2 opens the gain scene at 60°', s.scene === 'gain' && close(s.th, 60, 1e-9));
  let worst = 0;
  for (const r of [1, 0.6]) {
    await page.evaluate((v) => { const el = document.getElementById('pur'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, r);
    for (const deg of [0, 30, 60, 90, 133, 180]) {
      s = await seek(deg);
      const [x, y, z] = s.v, r00 = (1 + z) / 2, r11 = (1 - z) / 2, c2 = (x * x + y * y) / 4, tr2 = r00 ** 2 + r11 ** 2 + 2 * c2;
      const D = Math.abs(r00 - r11), V = 2 * Math.sqrt(c2);
      worst = Math.max(worst, Math.abs(Math.hypot(x, y, z) - r), Math.abs(D - s.D), Math.abs(V - s.V), Math.abs(D * D + V * V - r * r), Math.abs(tr2 - 0.5 - s.budget),
        Math.abs((tr2 - 0.5) - ((r00 - 0.5) ** 2 + (r11 - 0.5) ** 2) - 2 * c2), Math.abs(s.visible + s.residual - s.budget), Math.abs(Math.acos(z / r) * 180 / Math.PI - deg));
    }
  }
  check('gain: D² + V² = r² and centred purity = certainty + residual, rebuilt from ρ, for 12 states', worst < 1e-12, `${worst}`);
  await pick('tradeoff');
  check('TRADE-OFF resets r = 1 and plays', (await state()).r === 1 && await until(page, () => window.FAIRNESS_DEBUG.state.playing));
  s = await seek(90);
  check('TRADE-OFF at 90°: all area, no line', close(s.D, 0, 1e-12) && close(s.V, 1, 1e-12) && (await page.textContent('#roNote')).includes('面积'));
  const tip = await page.evaluate(() => window.FAIRNESS_DEBUG.at(window.FAIRNESS_DEBUG.arrow())), aim = await page.evaluate(() => window.FAIRNESS_DEBUG.at([0, 0, 1]));
  await page.mouse.move(tip[0], tip[1]); await page.mouse.down(); await page.mouse.move(aim[0] + 3, aim[1] + 8, { steps: 6 }); await page.mouse.up();
  s = await state();
  check('gain: dragging the amber arrow towards |0⟩ turns the rail back', s.th < 40 && s.preset === null, `${s.th}`);
}

// BONDS
{
  s = await scene(3);
  check('key 3 opens the bonds scene', s.scene === 'bonds');
  let worst = 0, wid = 0, norm = 0;
  for (let i = 0; i <= 60; i++) {
    const r = await page.evaluate((t) => window.FAIRNESS_DEBUG.bonds(t), 3 * i / 60), v = vecOf(r), tg = tangles(v);
    norm = Math.max(norm, Math.abs(v.reduce((a, x) => a + x * x, 0) - 1));
    worst = Math.max(worst, Math.abs(tg.tAB - r.tAB), Math.abs(tg.tAC - r.tAC), Math.abs(tg.t3 - r.t3), Math.abs(tg.tABC - r.tABC), Math.abs(tg.rz - r.rA[2]));
    // the four closed forms and the CKW identity, from the state vector alone
    const a2 = r.a ** 2;
    wid = Math.max(wid, Math.abs(tg.tAB - 4 * a2 * r.b ** 2), Math.abs(tg.tAC - 4 * a2 * r.c ** 2), Math.abs(tg.t3 - 4 * a2 * r.g ** 2), Math.abs(tg.tABC - (tg.tAB + tg.tAC + tg.t3)), Math.abs(tg.rz ** 2 + tg.tABC - 1));
  }
  check('bonds: every state on the path is normalized', norm < 1e-12, `${norm}`);
  check('bonds: τ_AB, τ_AC (Wootters), τ₃ (hyperdeterminant), τ_A(BC) = 4 det ρ_A and r_A match the page at 61 points', worst < 1e-6, `${worst}`);   // √ of near-zero eigenvalues of √ρ ρ̃ √ρ: roundoff ~1e-16 becomes ~1e-8
  check('bonds: τ_AB = 4a²b², τ_AC = 4a²c², τ₃ = 4a²g², τ_A(BC) = τ_AB + τ_AC + τ₃ = 1 − ‖r_A‖², from the state vector', wid < 1e-6, `${wid}`);
  await pick('bell'); s = await state(); let tg = tangles(vecOf(s));
  check('BELL: τ_AB = 1, τ_AC = τ₃ = 0 and ρ_A = ½I (A\'s arrow at the centre)', s.t === 1 && close(tg.tAB, 1, 1e-9) && close(tg.tAC, 0, 1e-9) && close(tg.t3, 0, 1e-12) && close(tg.rz, 0, 1e-12) && close(s.rA[2], 0, 1e-12) && close(tg.tABC, 1, 1e-12));
  await pick('wstate'); s = await state(); tg = tangles(vecOf(s));
  check('W-STATE: τ_AB = τ_AC = 4/9, τ₃ = 0, ‖r_A‖ = 1/3', s.t === 2 && close(tg.tAB, 4 / 9, 1e-9) && close(tg.tAC, 4 / 9, 1e-9) && close(tg.t3, 0, 1e-12) && close(Math.abs(tg.rz), 1 / 3, 1e-12) && close(s.total, 1, 1e-12));
  await pick('ghz');
  check('GHZ plays from the W state', await until(page, () => { const d = window.FAIRNESS_DEBUG.state; return d.playing && d.t > 2; }));
  s = await seek(3); tg = tangles(vecOf(s));
  check('GHZ: τ₃ = 1, no pairwise tangle, ρ_A = ½I', close(tg.t3, 1, 1e-12) && close(tg.tAB, 0, 1e-9) && close(tg.tAC, 0, 1e-9) && close(tg.rz, 0, 1e-12) && close(s.t3, 1, 1e-12));
}

// COPIES
{
  s = await scene(4);
  check('key 4 opens the copies scene', s.scene === 'copies');
  const dicke = (M) => {   // ρ ∝ P_sym(|0⟩⟨0| ⊗ I)P_sym is diagonal in the Dicke basis with weights (M − k)/M
    let tot = 0, f = 0; for (let k = 0; k <= M; k++) { const w = (M - k) / M; tot += w; f += w * (M - k) / M; } return f / tot;
  };
  let worst = 0;
  for (let M = 1; M <= 12; M++) { s = await seek(M - 1); const F = dicke(M); worst = Math.max(worst, Math.abs(s.M - M), Math.abs(s.F - F), Math.abs(s.eta - (2 * F - 1)), Math.abs(s.F - (2 * M + 1) / (3 * M))); }
  check('copies: F = (2M + 1)/(3M) and η = 2F − 1 for M = 1 … 12, from the symmetric cloner in the Dicke basis', worst < 1e-12, `${worst}`);
  check('copies: F decreases towards 2/3 and stays above it', s.F > 2 / 3 && s.F < (await seek(0)).F);
  await pick('cloning');
  check('CLONING plays by itself', await until(page, () => { const d = window.FAIRNESS_DEBUG.state; return d.playing && d.t > 0; }));
  s = await seek(4);
  check('CLONING at M = 5: η = 7/15 and F = 11/15', s.M === 5 && close(s.eta, 7 / 15, 1e-12) && close(s.F, 11 / 15, 1e-12) && (await page.textContent('#roKey')).includes('0.7333'));
  const cn = await page.textContent('#presetNote');
  check('CLONING note: the universal cloner is a literature result, and the exactly copied pair needs another machine', cn.includes('文献结果') && cn.includes('另一台') && !cn.includes('同一台'), cn);
}

// no ASCII underscore subscripts in what the reader sees (τ_AB, r_A, ρ_A are written with real subscripts)
{
  await pick('wstate'); await settle(page);
  const seen = await page.evaluate(() => document.body.innerText);
  check('the bonds scene shows no raw underscore subscripts', !/[τrρ]_[A-Za-zψφ(]/.test(seen), (seen.match(/.{0,12}[τrρ]_.{0,12}/) || [''])[0]);
}

// ERGODIC
{
  s = await scene(5);
  check('key 5 opens the ergodic scene', s.scene === 'ergodic');
  const phi = (1 + Math.sqrt(5)) / 2, alpha = phi - 1, w = 2 - phi;
  check('ergodic: the window 2 − φ equals 1 − α, a member of ℤα + ℤ', close(s.win, w, 1e-15) && close(w, 1 - alpha, 1e-15) && close(s.alpha, alpha, 1e-15));
  s = await seek(377);
  const thr = Math.cos(Math.PI * w), recount = (u, T) => { let k = 0; for (let t = 1; t <= T; t++) if (Math.cos(2 * Math.PI * (t * alpha + u - s.c)) > thr) k++; return k; };
  check('ergodic: hits recounted through h(x) = cos 2π(x − c) > cos π(2 − φ) for both observers', s.hits1 === recount(s.u1, 377) && s.hits2 === recount(s.u2, 377), `${s.hits1}/${recount(s.u1, 377)} ${s.hits2}/${recount(s.u2, 377)}`);
  const frac = (x) => x - Math.floor(x);
  const closed = (u, T) => { const v = u - (s.c - w / 2) + alpha; return frac((T + 1) * alpha + u - (s.c - w / 2)) - frac(v); };   // window [s0, s0 + 1 − α) shifted to [0, 1 − α)
  let wclosed = 0, bound = 0;
  s.disc1.forEach((d, i) => { wclosed = Math.max(wclosed, Math.abs(d - closed(s.u1, i + 1))); bound = Math.max(bound, Math.abs(d)); });
  s.disc2.forEach((d, i) => { wclosed = Math.max(wclosed, Math.abs(d - closed(s.u2, i + 1))); bound = Math.max(bound, Math.abs(d)); });
  check('ergodic: the discrepancy equals the closed form {(T + 1)α + u\'} − {α + u\'} at every step', wclosed < 1e-9, `${wclosed}`);
  check('ergodic: |T·R(T) − T(2 − φ)| < 1 along the whole rail for both observers', bound < 1, `${bound}`);
  // Hecke–Kesten far beyond the rail, for several starts: bounded remainder, so |R(T) − (2 − φ)| ≤ 1/T
  let far = 0, slow = 0;
  for (const u of [0, 0.41, 0.1234, 0.77]) { let k = 0; for (let t = 1; t <= 100000; t++) { if (frac(t * alpha + u) < w) k++; const d = Math.abs(k - t * w); far = Math.max(far, d); slow = Math.max(slow, t * Math.abs(k / t - w)); } }
  check('ergodic: up to T = 10⁵ and four starts, |T·R(T) − T(2 − φ)| < 1, so |R(T) − (2 − φ)| < 1/T', far < 1 && slow < 1, `${far}`);
  check('ergodic: the longest gap between hits is 3 (M = 2), so the share stays above 1/(M + 1) = 1/3 once T is large', s.gapMax === 3 && s.M === 2 && s.hits1 / 377 > 1 / 3);
  const rmax = Math.max(...s.random.map(Math.abs));
  check('ergodic: the independent random comparison drifts beyond the golden band (|D| > 3)', rmax > 3, `${rmax}`);
  await page.evaluate(() => { const el = document.getElementById('u2'); el.value = '0.9'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  s = await state();
  check('ergodic: the phase slider moves observer ② and leaves the card; the share is still 2 − φ within 1/T', s.u2 === 0.9 && s.preset === null && Math.abs(s.hits2 / 377 - w) < 1 / 377);
  await pick('ergodic');
  check('ERGODIC plays by itself', await until(page, () => { const d = window.FAIRNESS_DEBUG.state; return d.playing && d.t > 0; }));
}

// controls of the rail and the scene chips
await page.locator('body').click({ position: { x: 3, y: 3 } });
await page.keyboard.press('Space'); check('Space pauses', await until(page, () => !window.FAIRNESS_DEBUG.state.playing));
await seek(100); await page.keyboard.press('ArrowRight'); check('→ steps one T', close((await state()).t, 101, 1e-9));
await page.click('#rew'); check('⏮ goes back to T = 0', (await state()).t === 0);
await page.click('[data-scene="gain"]'); check('the scene chips switch scenes', (await state()).scene === 'gain');
await page.click('[data-lang-set="en"]'); await settle(page);
check('the English HUD names the scene quantity', (await page.textContent('#hudBig')).includes('D² + V²'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
