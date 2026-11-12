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
// Accuracy regressions: the finite seeded cap count is not axis-invariant and the centroid is not monotone in N (the
// exact invariant is the Haar measure, said apart from the sample); the gain note at r = 0 has no direction and uses
// exact words only at 0°, 90° and 180°, shares of r² elsewhere, in both languages; the random comparison is drawn point
// for point, untruncated (read by wrapping kit.plot for plotB); every green box carries only its frozen statement and the
// hand applications sit next to it in NUM boxes, side panel and drawer alike.
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
/** Mulberry32 written out again here: the fixed-seed generator behind the page's random comparison walk. */
function mulberry32(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* ---------- the hand application of the general Pythagoras, by independent complex 2 × 2 algebra ---------- */
{
  let worst = 0;
  for (let i = 0; i < 64; i++) {
    const r = (i % 8) / 7, th = Math.acos(1 - 2 * ((i * 0.618034) % 1)), ph = i * 2.399963;
    const x = r * Math.sin(th) * Math.cos(ph), y = r * Math.sin(th) * Math.sin(ph), z = r * Math.cos(th);
    const rho = [[[(1 + z) / 2, 0], [x / 2, -y / 2]], [[x / 2, y / 2], [(1 - z) / 2, 0]]];   // [re, im]
    let tr = 0; for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) tr += rho[a][b][0] * rho[b][a][0] - rho[a][b][1] * rho[b][a][1];
    const cert = (rho[0][0][0] - 0.5) ** 2 + (rho[1][1][0] - 0.5) ** 2, resid = 2 * (rho[0][1][0] ** 2 + rho[0][1][1] ** 2);
    const st = [x, y, z].map((c) => c / Math.SQRT2), nState = st[0] ** 2 + st[1] ** 2 + st[2] ** 2, onZ = st[2] ** 2, perp = st[0] ** 2 + st[1] ** 2;
    const D2 = (rho[0][0][0] - rho[1][1][0]) ** 2, V2 = 4 * (rho[0][1][0] ** 2 + rho[0][1][1] ** 2);
    worst = Math.max(worst, Math.abs(tr - 0.5 - nState), Math.abs(cert - onZ), Math.abs(tr - 0.5 - (cert + perp)), Math.abs(resid - perp),
      Math.abs(tr - 0.5 - r * r / 2), Math.abs(cert - z * z / 2), Math.abs(resid - (x * x + y * y) / 2), Math.abs(D2 + V2 - r * r), Math.abs(2 * (cert + resid) - (D2 + V2)));
  }
  check('qubit application (hand algebra, outside the green box): with state = r/√2 and visible = z both hypotheses of the general theorem hold, the terms are r²/2, z²/2, (x² + y²)/2, and doubled D² + V² = r²', worst < 1e-12, `${worst}`);
}

/* ---------- page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.FAIRNESS_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.FAIRNESS_DEBUG.seek(x), t); return state(); };
const scene = async (k) => { await page.locator('body').click({ position: { x: 3, y: 3 } }); await page.keyboard.press(String(k)); return state(); };

const lang = async (l) => { await page.click(`[data-lang-set="${l}"]`); await settle(page); };
const texts = (ids) => page.evaluate((list) => Object.fromEntries(list.map((i) => [i, document.getElementById(i).textContent])), ids);

let s = await state();
check('opens on HAAR in the seat scene with all 600 points', s.preset === 'haar' && s.scene === 'seat' && s.n === 600 && !s.playing);

// The green boxes, side panel and drawer alike: each carries only its frozen statement; the hand application of it
// sits in the NUM box right after it, cites the declaration by name only, and never links it as verified.
{
  const boxes = await page.$$eval('.lean', (els) => els.map((b) => {
    const txt = (el, l) => [...el.querySelectorAll('.' + l)].map((e) => e.textContent).join(' ');
    const nx = b.nextElementSibling && b.nextElementSibling.classList.contains('lean') ? b.nextElementSibling : null;
    return {
      green: !/(^|\s)(num|model|argued|open)(\s|$)/.test(b.className), drawer: !!b.closest('#drawer'), scenes: b.dataset.scenes || '',
      gids: [...b.querySelectorAll('a[data-lean-gid]')].map((a) => a.dataset.leanGid), zh: txt(b, 'zh'), en: txt(b, 'en'),
      next: nx && { num: nx.classList.contains('num') && !/(^|\s)(model|argued|open)(\s|$)/.test(nx.className), scenes: nx.dataset.scenes || '', links: nx.querySelectorAll('a[data-lean-gid]').length, zh: txt(nx, 'zh'), en: txt(nx, 'en') }
    };
  }));
  const greens = boxes.filter((b) => b.green);
  check('evidence: ten green boxes, five beside the stage and five in the drawer', greens.length === 10 && greens.filter((b) => b.drawer).length === 5, `${greens.length}`);
  const MANUAL = [['共轭对称', 'conjugate-symmetric'], ['两根柱子', 'two bars'], ['球心', 'centre of the ball'], ['s 与 s²', 'curves s and s²'], ['舞台的窗口', 'window on the stage'], ['青色窗口', 'cyan window'],
    ['r²/2', 'r²/2'], ['z²/2', 'z²/2'], ['(x² + y²)/2', '(x² + y²)/2'], ['线² + 面积²', 'line² + area²'], ['D² + V²', 'D² + V²'], ['单比特', 'a qubit']];
  const leaked = greens.flatMap((b) => MANUAL.filter(([zh, en]) => b.zh.includes(zh) || b.en.includes(en)).map(([zh]) => `${b.gids[0].split('.').pop()}: ${zh}`));
  check('evidence: no green box carries a hand application (reciprocity, the arrow at the centre, s = s², the stage window, the qubit terms)', leaked.length === 0, leaked.slice(0, 4).join(' | '));
  const split = greens.filter((b) => !(b.next && b.next.num && b.next.links === 0 && b.next.scenes === b.scenes && b.next.zh.includes('既有结果') && b.next.en.includes('existing results')
    && (b.gids.some((g) => b.next.zh.includes(g.split('.').pop()) && b.next.en.includes(g.split('.').pop())) || (b.next.zh.includes('环面定理') && b.next.en.includes('torus theorems')))));
  check('evidence: every green box is followed by a NUM box (same scene, no Lean link) that attributes the hand step to existing results in both languages', split.length === 0, split.map((b) => b.gids[0]).join(' | '));
  const PY = 'D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras';
  const py = greens.filter((b) => b.gids.includes(PY));
  check('C05: both green Pythagoras boxes state the general theorem with its hypotheses (complete real inner-product space, finite nonempty d, closed visible subspace, ‖state‖², the projection on visible, residual mass)',
    py.length === 2 && py.every((b) => ['完备的实内积空间', '有限且非空', 'd × d 复矩阵', '闭子空间', '‖state‖²', '正交投影', '坐标确定度', '残余质量', '正交补'].every((w) => b.zh.includes(w))
      && ['complete real inner-product space', 'finite and nonempty', 'd × d complex matrix', 'closed subspace', '‖state‖²', 'orthogonal projection', 'coordinate certainty', 'residual mass', 'orthogonal complement'].every((w) => b.en.includes(w))));
  check('C05: both copies of the qubit application sit outside green, attributed as an algebraic application of existing results, with r²/2, z²/2, (x² + y²)/2 and D² + V² = r², and say Lean does not check the qubit instance',
    py.length === 2 && py.every((b) => b.next && b.next.num && b.next.links === 0 && b.next.zh.includes('既有结果的代数应用') && b.next.en.includes('Algebraic application of existing results')
      && ['r²/2', 'z²/2', '(x² + y²)/2', 'D² + V² = r²', 'complementary_context_probability_pythagoras'].every((w) => b.next.zh.includes(w) && b.next.en.includes(w))
      && b.next.zh.includes('没有检查这个单比特实例') && b.next.en.includes('not this qubit instance')));
  const erg = greens.filter((b) => b.gids.some((g) => g.includes('TorusObservationWindowReturns')));
  check('ergodic: the window note outside green states the half-open counting convention modulo 1 ({y} = y − ⌊y⌋, {x − (c − (2 − φ)/2)} < 2 − φ) and claims no general equivalence with the open arc',
    erg.length === 2 && erg.every((b) => b.next && b.next.zh.includes('半开区间') && b.next.zh.includes('左端点') && b.next.zh.includes('不声称') && b.next.en.includes('half-open') && b.next.en.includes('left end') && b.next.en.includes('does not claim')
      && ['{y} = y − ⌊y⌋', '{x − (c − (2 − φ)/2)} < 2 − φ'].every((w) => b.next.zh.includes(w) && b.next.en.includes(w)) && b.next.zh.includes('模 1') && b.next.en.includes('modulo 1')
      && !b.next.zh.includes('c − (2 − φ)/2 ≤ x < c + (2 − φ)/2') && !b.next.en.includes('c − (2 − φ)/2 ≤ x < c + (2 − φ)/2')));
  // Independent witness that the default window (c = 0.18) wraps around 0: at t = 55 with u = 0, x = {55(φ − 1)} ≈ 0.99187
  // is a hit by fractional-part membership and by the open cosine arc (well away from its endpoints), yet fails the
  // ordinary linear inequality c − (2 − φ)/2 ≤ x < c + (2 − φ)/2. (t = 21 gives x ≈ 0.97871, a miss under every convention.)
  {
    const ph = (1 + Math.sqrt(5)) / 2, a = ph - 1, wd = 2 - ph, c0 = 0.18, fr = (y) => y - Math.floor(y), x = fr(55 * a), s0 = c0 - wd / 2;
    const circ = fr(x - s0) < wd, arc = Math.cos(2 * Math.PI * (x - c0)) - Math.cos(Math.PI * wd), linear = s0 <= x && x < c0 + wd / 2;
    check('ergodic: the default window wraps around 0: x = {55(φ − 1)} is a hit by {x − (c − (2 − φ)/2)} < 2 − φ and by the open arc, but not by the linear inequality',
      circ && arc > 1e-3 && !linear && fr(x - s0) > 1e-3 && wd - fr(x - s0) > 1e-3 && !(fr(fr(21 * a) - s0) < wd), `${x} ${fr(x - s0)} ${arc}`);
  }
  check('evidence: in the seat scene the Born application box is shown and the gain one is hidden',
    await page.evaluate(() => !document.querySelector('#readouts .lean.num[data-scenes="seat"]').hidden && document.querySelector('#readouts .lean.num[data-scenes="gain"]').hidden));
}

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

  // C01: the Haar measure is exact and axis-free; the finite seeded count is not, and the centroid is not monotone
  s = await seek(600);
  const all = s.points, inCap = (axis, a) => all.filter((p) => p[0] * axis[0] + p[1] * axis[1] + p[2] * axis[2] >= Math.cos(a * Math.PI / 180)).length;
  const north = inCap([0, 0, 1], 60), south = inCap([0, 0, -1], 60), haar = 600 * (2 * Math.PI * (1 - Math.cos(Math.PI / 3))) / (4 * Math.PI);   // cap area / sphere area
  check('seat: the 600 fixed-seed points are not axis-invariant: the 60° caps about +z and −z hold 145 and 147, the Haar measure 150',
    north === 145 && south === 147 && close(haar, 150, 1e-9) && s.axis[2] === 1 && s.share === 145 / 600 && close(s.theory, 0.25, 1e-15), `${north} ${south} ${s.share * 600}`);
  const cenOf = (n) => Math.hypot(...[0, 1, 2].map((k) => all.slice(0, n).reduce((a, p) => a + p[k], 0) / n));
  const c10 = cenOf(10), c15 = cenOf(15);
  check('seat: the centroid is not monotone in N: 0.214461686 at N = 10 rises to 0.308779358 at N = 15', close(c10, 0.214461686, 1e-8) && close(c15, 0.308779358, 1e-8) && c15 > c10, `${c10} ${c15}`);
  const p10 = (await seek(10)).cen, p15 = (await seek(15)).cen;
  check('seat: the page reads the same two centroids', close(p10, c10, 1e-12) && close(p15, c15, 1e-12), `${p10} ${p15}`);
  s = await seek(600);
  const seatBad = [];
  for (const lg of ['zh', 'en']) {
    await lang(lg);
    const t = await texts(['hudSub', 'pATitle', 'pBTitle', 'roNote', 'presetNote']), zh = lg === 'zh';
    const want = zh
      ? { hudSub: ['哈尔测度', '恰占 25.0%', '起伏'], pATitle: ['起伏'], pBTitle: ['不是每步'], roNote: ['哈尔测度', '起伏', '恒等式', '600 个固定种子点'], presetNote: ['哈尔测度', '恰占四分之一', '接近四分之一'] }
      : { hudSub: ['Haar measure', 'exactly 25.0%', 'scatters'], pATitle: ['scatters'], pBTitle: ['not at every step'], roNote: ['Haar measure', 'scatters', 'identity', '600 fixed-seed points'], presetNote: ['Haar measure', 'exactly a quarter', 'close to a quarter'] };
    const old = zh
      ? { hudSub: ['应占', '轴朝哪里都一样'], pATitle: ['一样多'], pBTitle: ['点越多，质心越靠近'], roNote: ['永远分到同样的份额'], presetNote: ['总是约四分之一'] }
      : { hudSub: ['should hold'], pATitle: ['gets the same'], pBTitle: ['More points, the centroid closer'], roNote: ['always gets the same share'], presetNote: ['always holds about a quarter'] };
    for (const k of Object.keys(want)) {
      const miss = want[k].filter((w) => !t[k].includes(w)), stale = old[k].filter((w) => t[k].includes(w));
      if (miss.length || stale.length) seatBad.push(`${lg} ${k}: missing ${miss.join('/')} stale ${stale.join('/')}`);
    }
  }
  await lang('zh');
  check('seat: HUD, plot titles, the note and the HAAR card say the Haar measure is exact and the finite count scatters, in both languages', seatBad.length === 0, seatBad.slice(0, 3).join(' | '));
  const dr = await page.evaluate(() => ({ zh: document.querySelector('#drawer .zh ol li').textContent, en: document.querySelector('#drawer .en ol li').textContent,
    cardZh: document.querySelector('[data-preset="haar"] .cn.zh').textContent, cardEn: document.querySelector('[data-preset="haar"] .cn.en').textContent }));
  check('seat: the drawer separates the exact Haar measure from the sample (145, 147 against 150) and the long-run centroid from its steps (0.214, then 0.309)',
    ['哈尔测度', '145', '147', '150', '0.214', '0.309', '不是每添一个点都更近', '恒等'].every((w) => dr.zh.includes(w)) && ['Haar measure', '145', '147', '150', '0.214', '0.309', 'not at every step', 'identically'].every((w) => dr.en.includes(w))
      && !dr.zh.includes('里面的点占') && !dr.en.includes('of the points wherever'));
  check('seat: the HAAR card label speaks of the Haar measure', dr.cardZh.includes('哈尔测度') && dr.cardEn.includes('Haar measure'));
  // Born reciprocity is exact for any pair: drag ψ elsewhere and rebuild both weights from 2 × 2 matrices
  const psi0 = s.psi, grabAt = await page.evaluate(() => window.FAIRNESS_DEBUG.at(window.FAIRNESS_DEBUG.state.psi)), dropAt = await page.evaluate(() => window.FAIRNESS_DEBUG.at([0.35, -0.8, 0.48]));
  await page.mouse.move(grabAt[0], grabAt[1]); await page.mouse.down(); await page.mouse.move(dropAt[0], dropAt[1], { steps: 6 }); await page.mouse.up();
  s = await state();
  check('seat: after dragging ψ the Born weights still agree exactly: |⟨φ|ψ⟩|² = |⟨ψ|φ⟩|² = Tr(ρ_ψ P_φ) = Tr(ρ_φ P_ψ)',
    Math.hypot(s.psi[0] - psi0[0], s.psi[1] - psi0[1], s.psi[2] - psi0[2]) > 0.05 && close(s.wPsiPhi, s.wPhiPsi, 1e-12) && close(s.wPsiPhi, bornTrace(s.psi, s.phi), 1e-12) && close(bornTrace(s.phi, s.psi), s.wPhiPsi, 1e-12) && close(s.wBloch, s.wPsiPhi, 1e-12),
    JSON.stringify(s.psi));
}

// GAIN
{
  s = await scene(2);
  check('key 2 opens the gain scene at 60°', s.scene === 'gain' && close(s.th, 60, 1e-9));
  let worst = 0, half = 0;
  for (const r of [1, 0.6]) {
    await page.evaluate((v) => { const el = document.getElementById('pur'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, r);
    for (const deg of [0, 30, 60, 90, 133, 180]) {
      s = await seek(deg);
      const [x, y, z] = s.v, r00 = (1 + z) / 2, r11 = (1 - z) / 2, c2 = (x * x + y * y) / 4, tr2 = r00 ** 2 + r11 ** 2 + 2 * c2;
      const D = Math.abs(r00 - r11), V = 2 * Math.sqrt(c2);
      worst = Math.max(worst, Math.abs(Math.hypot(x, y, z) - r), Math.abs(D - s.D), Math.abs(V - s.V), Math.abs(D * D + V * V - r * r), Math.abs(tr2 - 0.5 - s.budget),
        Math.abs((tr2 - 0.5) - ((r00 - 0.5) ** 2 + (r11 - 0.5) ** 2) - 2 * c2), Math.abs(s.visible + s.residual - s.budget), Math.abs(Math.acos(z / r) * 180 / Math.PI - deg));
      half = Math.max(half, Math.abs(s.budget - r * r / 2), Math.abs(s.visible - z * z / 2), Math.abs(s.residual - (x * x + y * y) / 2));
    }
  }
  check('gain: D² + V² = r² and centred purity = certainty + residual, rebuilt from ρ, for 12 states', worst < 1e-12, `${worst}`);
  check('gain: the page\'s three terms are the hand-applied r²/2, z²/2 and (x² + y²)/2 (the NUM application, not the green box)', half < 1e-12, `${half}`);
  check('evidence: in the gain scene the qubit application box is shown and the Born one is hidden',
    await page.evaluate(() => !document.querySelector('#readouts .lean.num[data-scenes="gain"]').hidden && document.querySelector('#readouts .lean.num[data-scenes="seat"]').hidden));
  await pick('tradeoff');
  check('TRADE-OFF resets r = 1 and plays', (await state()).r === 1 && await until(page, () => window.FAIRNESS_DEBUG.state.playing));
  s = await seek(90);
  check('TRADE-OFF at 90°: all area, no line', close(s.D, 0, 1e-12) && close(s.V, 1, 1e-12) && (await page.textContent('#roNote')).includes('面积'));
  const tip = await page.evaluate(() => window.FAIRNESS_DEBUG.at(window.FAIRNESS_DEBUG.arrow())), aim = await page.evaluate(() => window.FAIRNESS_DEBUG.at([0, 0, 1]));
  await page.mouse.move(tip[0], tip[1]); await page.mouse.down(); await page.mouse.move(aim[0] + 3, aim[1] + 8, { steps: 6 }); await page.mouse.up();
  s = await state();
  check('gain: dragging the amber arrow towards |0⟩ turns the rail back', s.th < 40 && s.preset === null, `${s.th}`);

  // C02: the note follows r and the tilt over the whole supported domain (r 0 … 1 by 0.01, θ continuous), in both
  // languages, after a card has set r = 1 and the slider has overridden it. Expected words come from an independent ρ.
  await pick('tradeoff');
  const setPur = async (v) => { await page.evaluate((x) => { const el = document.getElementById('pur'); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await settle(page); };
  const share = (q) => (q < 0.01 ? '< 1' : q > 0.99 ? '> 99' : String(Math.round(100 * q)));
  const expectGain = (r, deg) => {
    if (r === 0) return { kind: 'zero' };
    if (deg === 0 || deg === 180) return { kind: 'line', pole: deg === 0 ? '|0⟩' : '|1⟩' };
    if (deg === 90) return { kind: 'area' };
    const th = deg * Math.PI / 180, x = r * Math.sin(th), z = r * Math.cos(th);   // ρ = (I + x σx + z σz)/2
    const p0 = (1 + z) / 2, p1 = (1 - z) / 2, coh = Math.abs(x) / 2;              // diagonal and |ρ01|
    return { kind: 'pct', line: share((p0 - p1) ** 2 / (r * r)), area: share((2 * coh) ** 2 / (r * r)) };
  };
  const DEGS = [0, 0.5, 30, 84, 89.5, 90, 90.5, 120, 179.5, 180], gainBad = [];
  for (const lg of ['zh', 'en']) {
    await lang(lg);
    const zh = lg === 'zh';
    for (const r of [0, 0.01, 0.02, 0.6, 1]) {
      await setPur(r);
      for (const deg of DEGS) {
        s = await seek(deg);
        const { roNote: note, hudSub: sub } = await texts(['roNote', 'hudSub']), e = expectGain(r, deg);
        let ok = s.r === r && s.preset === null && close(s.th, deg, 1e-12);
        if (e.kind === 'zero') ok = ok && note.includes(zh ? '没有方向' : 'no direction') && !note.includes(zh ? '全是' : 'all ') && !note.includes('%') && sub.includes(zh ? '没有方向' : 'no direction') && !sub.includes(zh ? '偏离' : 'off the measurement axis');
        else {
          ok = ok && sub.includes(zh ? '偏离测量轴' : 'off the measurement axis') && !note.includes(zh ? '没有方向' : 'no direction');
          if (e.kind === 'line') ok = ok && note.includes(zh ? '全是线' : 'all line') && note.includes(e.pole) && !note.includes('%');
          else if (e.kind === 'area') ok = ok && note.includes(zh ? '全是面积' : 'all area') && !note.includes('%');
          else ok = ok && note.startsWith(zh ? `线占 ${e.line}%，面积占 ${e.area}%` : `${e.line}% line and ${e.area}% area`) && !note.includes(zh ? '全是' : 'all ');
        }
        if (!ok) gainBad.push(`${lg} r=${r} θ=${deg}: ${note}`);
      }
    }
  }
  await lang('zh');
  check('gain: the note says r = 0 has no direction, uses exact words only at 0°, 90° and 180°, and shares of r² elsewhere (r = 0, 0.01, 0.02, 0.6, 1 × 10 tilts, both languages)', gainBad.length === 0, gainBad.slice(0, 3).join(' | '));
  await setPur(0.01); s = await seek(90);
  check('gain: r = 0.01 at 90° is all area (V = r, D = 0), not all line', close(s.V, 0.01, 1e-15) && close(s.D, 0, 1e-15) && (await page.textContent('#roNote')).includes('全是面积'));
  s = await scene(1); s = await scene(2);
  check('gain: r survives a scene round trip; at the scene\'s 60° the note gives 25% line and 75% area of r² = 0.0001',
    s.r === 0.01 && close(s.th, 60, 1e-12) && (await page.textContent('#roNote')).startsWith('线占 25%，面积占 75%'));
  await setPur(1);
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

  // C03: what plotB actually draws. Wrap kit.plot for the plotB canvas only, record its domain, ticks, lines and legend,
  // let settle() repaint through the wrapper, then put the shared runtime back.
  await page.evaluate(() => {
    const kit = window.TRV.kit, orig = kit.plot, rec = { y: null, pad: null, ticks: [], lines: [], legend: [], legendSt: null };
    kit.plot = function (canvas, opts) {
      const g = orig.apply(this, arguments);
      if (canvas && canvas.id === 'plotB') {
        rec.y = opts.y.slice(); rec.pad = (opts.pad || []).slice(); rec.lines = []; rec.legend = []; rec.legendSt = null;
        const line = g.line, axes = g.axes, legend = g.legend, mg = window.TRV.palette.magenta;
        g.axes = (a) => { rec.ticks = (a.yTicks || []).map((t) => (Array.isArray(t) ? t[0] : t)); return axes(a); };
        g.line = (pts, color, st) => { rec.lines.push({ magenta: color === mg, pts: pts.map((p) => [p[0], p[1]]) }); return line(pts, color, st); };
        g.legend = (items, st) => { rec.legend = items.map((it) => [it[0] === mg, it[1]]); rec.legendSt = Object.assign({}, st || {}); return legend(items, st); };
      }
      return g;
    };
    window.__FAIRNESS_PLOTB = rec; window.__FAIRNESS_UNWRAP = () => { kit.plot = orig; };
  });
  const drawnB = async () => { await settle(page); return page.evaluate(() => ({ rec: JSON.parse(JSON.stringify(window.__FAIRNESS_PLOTB)), meta: document.getElementById('pBMeta').textContent })); };
  const zhB = await drawnB(); await lang('en'); const enB = await drawnB(); await lang('zh');
  await page.evaluate(() => window.__FAIRNESS_UNWRAP());
  const walk = []; { const rnd = mulberry32(7); let k = 0; for (let t = 1; t <= 377; t++) { if (rnd() < w) k++; walk.push(k - t * w); } }
  const lo = Math.min(...walk), hi = Math.max(...walk), clipped = walk.filter((d) => Math.abs(d) > 6).length;
  check('ergodic: the seeded random walk spans −17.709390174 … 6.082039325, so a ±6 clamp would hide 223 of its 377 points', close(lo, -17.709390174, 1e-8) && close(hi, 6.082039325, 1e-8) && clipped === 223, `${lo} ${hi} ${clipped}`);
  const mag = zhB.rec.lines.filter((l) => l.magenta), rw = mag[0];
  check('ergodic: plotB draws the random walk point for point, untruncated (literal data, same as the probe)',
    mag.length === 1 && rw.pts.length === 377 && rw.pts.every((p, i) => p[0] === i + 1 && close(p[1], walk[i], 1e-12) && close(p[1], s.random[i], 0)) && Math.min(...rw.pts.map((p) => p[1])) === lo && Math.max(...rw.pts.map((p) => p[1])) === hi);
  const gold = zhB.rec.lines.filter((l) => !l.magenta && l.pts.length === 377);
  check('ergodic: plotB\'s domain contains the literal random min and max, with spaced tick anchors at −15 and 0, and both golden traces stay inside the band (−1, 1)',
    zhB.rec.y[0] <= lo && zhB.rec.y[1] >= hi && zhB.rec.ticks.includes(0) && zhB.rec.ticks.includes(-15)
      && gold.length === 2 && gold.every((l) => l.pts.every((p) => Math.abs(p[1]) < 1)), JSON.stringify([zhB.rec.y, zhB.rec.ticks]));
  // kit.plot's legend: first row centred at pt + 9 + dy, rows 14 px apart, ~6 px half text height. All rows must lie in
  // the reserved top margin (0 … pt), never over the data area where the golden traces run near 0.
  const legendClear = (r) => {
    const pt = r.pad[2], st = r.legendSt || {}, n = r.legend.length, first = pt + 9 + (st.dy || 0), last = first + 14 * (n - 1);
    return n === 3 && !st.bottom && first - 6 >= 0 && last + 6 <= pt;
  };
  check('ergodic: plotB\'s three-row legend sits in the reserved top margin, above the data area, in both languages',
    legendClear(zhB.rec) && legendClear(enB.rec), JSON.stringify([zhB.rec.pad, zhB.rec.legendSt]));
  const legendOf = (r) => (r.legend.find(([m]) => m) || [false, ''])[1];
  check('ergodic: the legend names the fixed-seed random trace and the meta gives its literal range, in both languages',
    legendOf(zhB.rec).includes('固定种子') && legendOf(enB.rec).includes('fixed seed') && zhB.meta.includes('随机 −17.7') && zhB.meta.includes('+6.1') && enB.meta.includes('random −17.7') && enB.meta.includes('+6.1'),
    `${legendOf(zhB.rec)} | ${legendOf(enB.rec)} | ${zhB.meta} | ${enB.meta}`);
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
