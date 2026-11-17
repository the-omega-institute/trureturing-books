// FORCE//UNIFY 浏览器回归：共享质量门、三栏契约、依据分层、独立数学、真实交互与双语视口。
// 单独用 node 运行；VIZ_SLOW_FRAMES=1000 检验慢帧。页面的每条声称都用这里另写的算法核对，不调用页面函数。
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { session, stageFirstChecks, settle, openStill, playsAfter, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'unified-arc-forces-planck-sandbox';
const DIR = new URL(`../${ID}/`, import.meta.url);
const SRC = { html: readFileSync(new URL('index.html', DIR), 'utf8'), css: readFileSync(new URL('style.css', DIR), 'utf8'), js: readFileSync(new URL('main.js', DIR), 'utf8') };
const REGISTRY = JSON.parse(readFileSync(new URL('../visualizations.json', import.meta.url), 'utf8')).visualizations.find((v) => v.id === ID);
const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
const LOG_EP = Math.log10(1.220890e19);
const CARDS = {
  'u1-blind-phase-fiber': { scene: 'u1', logE: -3, t: 0.125, still: '0.125' },
  'su2-chiral-double-cover': { scene: 'su2', logE: 2, t: 1, still: 'end' },
  'su3-color-flux-confinement': { scene: 'su3', logE: 0, t: 0.125, still: '0.125' },
  'regge-gravity-clock-refraction': { scene: 'regge', logE: -3, t: 0.75, still: '0.75' },
  'planck-scale-convergence': { scene: 'planck', logE: LOG_EP, t: 1, still: 'end' }
};
const IDS = Object.keys(CARDS);
const GIDS = [
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight'
];
const OPEN = [
  ['ch34-s23-cosmological-arrow-and-horizon-floor', 'prob-ch34-past-hypothesis-and-cosmological-constant'],
  ['ch34-s24-interaction-sign-and-sagitta-composition', 'prob-ch34-gravity-dynamics-and-coupling'],
  ['ch34-s25-generations-and-quantitative-boundary', 'prob-ch34-sm-generations-and-couplings']
];
const THEORY = 'ch39-s09-unified-arc-forces-and-planck-convergence.html#sec-ch39-unified-arc-forces-and-planck-convergence';
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const maxDiff = (a, b) => { const x = a.flat(3), y = b.flat(3); return x.length === y.length ? Math.max(0, ...x.map((v, i) => Math.abs(v - y[i]))) : Infinity; };

const T = await session(), { page, check } = T;
const browserWarnings = [];
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const watched = new WeakSet();
const watchPage = (p) => { if (watched.has(p)) return; watched.add(p); p.on('console', (m) => { if (m.type() === 'warning' && !driverInfo.test(m.text())) browserWarnings.push(`${p.url()}: ${m.text()}`); }); };
T.context.on('page', watchPage); watchPage(page);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (o) => { const c = await newContext(o); c.on('page', watchPage); return c; };

/* ---------- the shared quality gate (desktop, English, short screens, embed, rail, frames, cited figures, phone, cover, reduced motion) ---------- */
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- static contract: files, layout, colours, hygiene ---------- */
check('source: only the shared runtime is loaded (theme.css, style.css, shell.js, kit.js, main.js)',
  same([...SRC.html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same([...SRC.html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('https:')), ['../assets/theme.css', 'style.css']));
check('source: no grid-template-columns override and no palette switch', !/grid-template-columns\s*:/.test(SRC.css.replace(/\.lens-toggle\s*\{[^}]*\}/, ''))
  && !/\.app\.lab[^{]*\{[^}]*grid-template-columns/.test(SRC.css) && !/data-tr-palette|trPalette|prefers-color-scheme/.test(SRC.html + SRC.css + SRC.js));
check('source: no raw colour literals outside the tokens', !/#[0-9a-fA-F]{3,8}\b/.test(SRC.css.replace(/\/\*[\s\S]*?\*\//g, '')) && !/#[0-9a-fA-F]{6}\b|rgba?\(|hsla?\(/.test(SRC.js));
check('source: red (warn) is never painted on the stage', !/\bwarn\b|\bsw wn\b|['"]wn['"]/.test(SRC.js));
// Rule 9: no names of model vendors or of automated writing tools anywhere in the page or this suite (assembled so that
// a plain grep of the repository finds none of them)
const BANNED = [['Cla', 'ude'], ['Op', 'us'], ['G', 'PT'], ['Co', 'dex'], ['Gem', 'ini'], ['Deep', 'Mind'], ['Anth', 'ropic'], ['Ope', 'nA', 'I'], ['L', 'LM'], ['人工', '智能'], ['大', '模型'], ['智能', '体']].map((p) => p.join(''));
const SELF = readFileSync(new URL(import.meta.url), 'utf8');
const ruleNine = [SRC.html, SRC.css, SRC.js, SELF, JSON.stringify(REGISTRY)].flatMap((txt, i) => [...BANNED.filter((w) => txt.includes(w)),
  ...(new RegExp(`\\b${['A', 'I'].join('')}\\b`).test(txt) ? ['A-I'] : []), ...(new RegExp(`\\b${['ag', 'ent'].join('')}s?\\b`, 'i').test(txt) ? [`a-word in file ${i}`] : [])]);
check('source: zero vendor, model-tool or automated-writer identifiers', ruleNine.length === 0, ruleNine.join(', '));
const zhSpans = (SRC.html.match(/class="(?:[^"]* )?zh(?: [^"]*)?"/g) || []).length, enSpans = (SRC.html.match(/class="(?:[^"]* )?en(?: [^"]*)?"/g) || []).length;
check('bilingual: every zh text block has its en twin in the page source', zhSpans === enSpans && zhSpans >= 30, `${zhSpans} zh / ${enSpans} en`);
{
  const notes = [...SRC.js.matchAll(/'([^']+)': \['([^']+)', '([^']+)'\]/g)].filter((m) => IDS.includes(m[1]));
  check('bilingual: every card has a note and a figure note in both languages, the English ones without Chinese', notes.length === 10
    && notes.every((m) => m[2].length > 20 && m[3].length > 20 && /[一-鿿]/.test(m[2]) && !/[一-鿿]/.test(m[3])), `${notes.length}`);
}
check('registry: live entry with chapter 39 §39.9, five presets in order and the six GIDs', REGISTRY && REGISTRY.status === 'live' && REGISTRY.chapter === 39 && REGISTRY.section === '39.9'
  && same(REGISTRY.presets, IDS) && same(REGISTRY.lean.map((l) => l.gid), GIDS) && REGISTRY.code === 'FORCE//UNIFY');
check('registry: theory link to §39.9 in both languages', REGISTRY.theory[0].href === `../zh/${THEORY}` && REGISTRY.theory[0].href_en === `../en/${THEORY}`);

/* ---------- independent mathematics ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.hypot(...a);
const matVec = (M, v) => M.map((r) => dot(r, v));
const matMul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const RyM = (a) => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]];
const RxM = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
const RzM = (a) => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
/** Determinant by Gaussian elimination with partial pivoting. */
function det(M) {
  const a = M.map((r) => [...r]); let d = 1;
  for (let j = 0; j < a.length; j++) {
    let k = j; for (let i = j + 1; i < a.length; i++) if (Math.abs(a[i][j]) > Math.abs(a[k][j])) k = i;
    if (Math.abs(a[k][j]) < 1e-300) return 0;
    if (k !== j) { [a[k], a[j]] = [a[j], a[k]]; d = -d; }
    d *= a[j][j];
    for (let i = j + 1; i < a.length; i++) { const f = a[i][j] / a[j][j]; for (let c = j; c < a.length; c++) a[i][c] -= f * a[j][c]; }
  }
  return d;
}
/** Spherical excess of the triangle with sides a, b, c by L'Huilier's theorem. */
const lhuilier = (a, b, c) => { const s = (a + b + c) / 2; return 4 * Math.atan(Math.sqrt(Math.max(0, Math.tan(s / 2) * Math.tan((s - a) / 2) * Math.tan((s - b) / 2) * Math.tan((s - c) / 2)))); };
const excessOf = (e) => { const N = [0, 0, 1], A = matVec(RyM(e), N), B = matVec(RxM(-e), N), ang = (u, v) => Math.acos(Math.max(-1, Math.min(1, dot(u, v)))); return { N, A, B, excess: lhuilier(ang(N, A), ang(N, B), ang(A, B)) }; };
// complex numbers and 2 × 2 matrices for SU(2) via quaternions
const qmul = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
/** The SU(2) matrix of the unit quaternion q = w + xi + yj + zk in the convention U = w − i(x σx + y σy + z σz). */
const su2OfQuat = (q) => [[[q[0], -q[3]], [-q[2], -q[1]]], [[q[2], -q[1]], [q[0], q[3]]]];
// the one-loop Standard Model running, written again from its definition
const MZ = 91.1876, INV = [59.01, 29.59, 8.46], BC = [4.1, -19 / 6, -7];
const inv1 = (i, logE) => INV[i] - BC[i] / (2 * PI) * (logE * Math.LN10 - Math.log(MZ));
/** Crossing of lines i and j in L = ln(E/M_Z): solved by Cramer's rule on the 2 × 2 system. */
const crossing = (i, j) => { const si = -BC[i] / TAU, sj = -BC[j] / TAU, L = (INV[j] - INV[i]) / (si - sj); return { logE: (L + Math.log(MZ)) / Math.LN10, inv: INV[i] + si * L }; };

function checkCell(s, tag) {
  const e = 45 * DEG, { N, A, B, excess } = excessOf(e);
  check(`${tag}: cell corners N, A = R_y(ε)N, B = R_x(−ε)N, Girard excess by L'Huilier and Ω(ε) = 2 arctan(tan²(ε/2))`, maxDiff(s.cell.raw, [N, A, B]) < 1e-12
    && near(s.cell.omega, excess, 1e-10) && near(s.cell.omegaAngles, excess, 1e-10) && near(s.cell.omega / DEG, 19.4712, 5e-5), JSON.stringify(s.cell.omega));
  const G = [N, A, B].map((u) => [N, A, B].map((w) => dot(u, w)));
  check(`${tag}: Gram determinant of the cell by elimination is sin⁴ε = 0.2500 > 0`, near(s.cell.detG, det(G), 1e-12) && near(s.cell.detG, 0.25, 1e-12) && s.cell.detG > 0);
  // one closed cell: V − E + F = 2, boundary zero exactly on the 2 constant labellings, face boundaries of rank 3
  const faces = [[1, 2, 3], [0, 1, 2], [0, 1, 3], [0, 2, 3]], edges = [];
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) edges.push([i, j]);
  let zero = 0;
  for (let x = 0; x < 16; x++) { const lab = faces.map((_, k) => (x >> k) & 1); if (edges.every(([i, j]) => faces.reduce((acc, f, k) => acc ^ (f.includes(i) && f.includes(j) ? lab[k] : 0), 0) === 0)) zero++; }
  check(`${tag}: face–cycle exactness on one closed cell (4 − 6 + 4 = 2, 2 zero-boundary labellings, rank 3)`, s.faceCycle.euler === 2 && s.faceCycle.V === 4 && s.faceCycle.E === 6 && s.faceCycle.F === 4
    && s.faceCycle.zeroLabels === zero && zero === 2 && s.faceCycle.zeroIffConstant && s.faceCycle.rank === 3 && s.faceCycle.cycleDim === 3 && s.faceCycle.everyEdgeTwoFaces);
}
function checkU1(u, t, tag) {
  const phi = TAU * t, p = [Math.cos(phi), Math.sin(phi)], m = [Math.cos(phi), -Math.sin(phi)];
  check(`${tag}: U(1) phases of ±q and their product 1`, near(u.phi, phi) && maxDiff(u.plus, p) < 1e-12 && maxDiff(u.minus, m) < 1e-12
    && near(p[0] * m[0] - p[1] * m[1], 1, 1e-12) && near(u.product[0], 1, 1e-12) && near(u.product[1], 0, 1e-12) && u.productResidual < 1e-12);
  check(`${tag}: two U(1) turns commute ([U₁, U₂] = 0)`, u.commutator < 1e-15);
  // Gauss flux by a Fibonacci-lattice quadrature on a sphere of radius 2 (different from the page's midpoint grid)
  const n = 40000, R = 2, flux = { plus: 0, minus: 0 };
  for (let i = 0; i < n; i++) {
    const z = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - z * z), a = i * PI * (3 - Math.sqrt(5)), nn = [r * Math.cos(a), r * Math.sin(a), z], x = nn.map((v) => v * R);
    for (const [k, q, c] of [['plus', 1, [0.6, 0, 0]], ['minus', -1, [-0.6, 0, 0]]]) { const d = x.map((v, j) => v - c[j]); flux[k] += q * dot(d, nn) / norm(d) ** 3 * (4 * PI * R * R / n) / (4 * PI); }
  }
  check(`${tag}: Gauss flux of +q, −q and the neutral pair`, near(u.flux.plus, 1, 2e-3) && near(u.flux.minus, -1, 2e-3) && near(u.flux.total, 0, 1e-9)
    && near(flux.plus, u.flux.plus, 2e-3) && near(flux.minus, u.flux.minus, 2e-3), JSON.stringify(u.flux));
  check(`${tag}: low-energy α(0) = 1/137.036`, near(1 / u.alpha0, 137.035999084, 1e-9));
}
function checkSU2(s2, t, logE, tag) {
  const th = 2 * TAU * t, n = s2.axis, q = [Math.cos(th / 2), ...n.map((v) => v * Math.sin(th / 2))];
  check(`${tag}: SU(2) U(θ) agrees with the unit quaternion of the turn, Re U = cos(θ/2)`, near(s2.theta, th, 1e-12) && maxDiff(s2.U, su2OfQuat(q)) < 1e-12 && near(s2.reU, Math.cos(th / 2), 1e-12) && near(norm(n), 1, 1e-12));
  const q2 = qmul([Math.cos(PI), ...n.map((v) => v * Math.sin(PI))], [1, 0, 0, 0]), q4 = qmul(q2, q2);
  check(`${tag}: 360° gives −I and 720° gives +I; the lift from 1 stands at −1 after one turn`, near(q2[0], -1, 1e-12) && near(q4[0], 1, 1e-12)
    && s2.U2piResidual < 1e-15 && s2.U4piResidual < 1e-15 && near(s2.liftAt2pi[0], -1, 1e-15) && s2.liftSquaredResidual < 1e-12);
  const E = 10 ** logE, hbarc = 0.1973269804, mW = 80.377;
  check(`${tag}: Yukawa factor e^(−m_W r) at r = ħc/E and λ_W = ħc/m_W`, near(s2.rE, hbarc / E, 1e-15) && near(s2.lamW, hbarc / mW, 1e-15) && near(s2.yukawa, Math.exp(-mW / E), 1e-12));
  const a2 = logE >= Math.log10(MZ) ? 1 / inv1(1, logE) : null;
  check(`${tag}: one-loop α₂(E) (none below M_Z) and 2 + 1 = 3 polarizations`, (a2 === null ? s2.alpha2 === null : near(s2.alpha2, a2, 1e-12)) && s2.polarizations === 3 && s2.bosons === 3 && s2.eaten === 3);
}
function checkSU3(s3, t, logE, r, tag) {
  // the turn about (1, 1, 1)/√3 by θ from the quaternion (cos θ/2, sin θ/2 k̂), then its matrix
  const th = TAU * t, k = [1, 1, 1].map((v) => v / Math.sqrt(3)), w = Math.cos(th / 2), [x, y, z] = k.map((v) => v * Math.sin(th / 2));
  const U = [[1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)], [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)], [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]];
  check(`${tag}: colour turn U ∈ SO(3) ⊂ SU(3), det U = 1, volume 1`, maxDiff(s3.U, U) < 1e-12 && near(det(U), 1, 1e-12) && near(s3.detU, 1, 1e-12) && s3.orthResidual < 1e-12 && near(s3.volume, 1, 1e-12));
  check(`${tag}: an element with phases diag(e^{iα}, e^{iβ}, e^{−i(α+β)})·U still has det 1`, near(s3.detV[0], 1, 1e-12) && near(s3.detV[1], 0, 1e-12));
  const W = matMul(matMul(RzM(s3.word.alpha), RxM(s3.word.beta)), RzM(s3.word.gamma));
  check(`${tag}: two-axis word R_B(α) R_R(β) R_B(γ) multiplies back to U`, maxDiff(W, U) < 1e-12 && s3.word.residual < 1e-12);
  const sig = 0.18 / 0.1973269804;
  check(`${tag}: linear string V = σr and the cell count of the chain`, near(s3.r, r, 1e-12) && near(s3.sigmaGeVfm, sig, 1e-12) && near(s3.V, sig * r, 1e-12) && s3.cells === Math.max(1, Math.round(r / 0.2)));
  // the model aperture: Ω(ε(E)) = Ω(45°)·ln(1/Λ)/ln(E/Λ) above 1 GeV; ε recovered from Ω by L'Huilier bisection
  const om45 = excessOf(45 * DEG).excess, E = 10 ** logE, om = E <= 1 ? om45 : om45 * Math.log(1 / 0.2) / Math.log(E / 0.2);
  let lo = 0, hi = PI / 2; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (excessOf(m).excess < om) lo = m; else hi = m; }
  check(`${tag}: aperture ε(E) and Ω(ε) of the model`, near(s3.omega, om, 1e-10) && near(s3.eps, (lo + hi) / 2, 1e-9));
}
function checkRegge(g, tag) {
  // a regular tetrahedron with unit edges: the angle between the outward normals of two faces gives the dihedral angle
  const P = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], nrm = (a, b, c, o) => { const v = cross(b.map((x, i) => x - a[i]), c.map((x, i) => x - a[i])); const s = dot(v, a.map((x, i) => x - o[i])) > 0 ? 1 : -1; return v.map((x) => x * s / norm(v)); };
  const dih = PI - Math.acos(dot(nrm(P[0], P[1], P[2], P[3]), nrm(P[0], P[1], P[3], P[2])));
  check(`${tag}: dihedral angle of the regular tetrahedron and δ_h = 2π − 4θ = 77.88°`, near(g.dihedral, dih, 1e-12) && near(g.angleSum, 4 * dih, 1e-12) && near(g.deltaH, TAU - 4 * dih, 1e-12) && near(g.deltaH / DEG, 77.88, 5e-3));
  const binom = (n) => n * (n - 1) / 2, ok = g.dE.every((d) => d.bars === binom(d.N) && d.need === 3 * d.N - 6 && d.dE === (d.N - 3) * (d.N - 4) / 2);
  const zeros = Array.from({ length: 20 }, (_, i) => i + 3).filter((n) => binom(n) - (3 * n - 6) === 0);
  check(`${tag}: Maxwell count ΔE(N) = C(N, 2) − (3N − 6) = (N − 3)(N − 4)/2, zero only at N = 3, 4, ΔE(6) = 3`, ok && same(zeros, [3, 4]) && g.dE.find((d) => d.N === 6).dE === 3);
  const c2 = Math.cos(45 * DEG) ** 2;
  check(`${tag}: Born loads |φ*ψ±|² = Tr(ρP) = cos²θ ≥ 0 for both charges; they add while the phases cancel`, near(g.born.plus.weight, c2, 1e-12) && near(g.born.minus.weight, c2, 1e-12)
    && near(g.born.plus.trace, c2, 1e-12) && near(g.born.minus.trace, c2, 1e-12) && near(g.born.sum, 2 * c2, 1e-12) && near(g.born.phaseSum, 0, 1e-15) && g.born.plus.weight > 0);
  // the packet: velocity Verlet with a smaller step on a = −∇ln√(1 − η), η = η₀r₀/max(r, r₀)
  const L = g.load, eta = (r) => L.eta0 * L.r0 / Math.max(r, L.r0);
  const lnClock = (x, y) => 0.5 * Math.log(1 - eta(Math.hypot(x, y)));
  const acc = (x, y) => { const h = 1e-6; return [-(lnClock(x + h, y) - lnClock(x - h, y)) / (2 * h), -(lnClock(x, y + h) - lnClock(x, y - h)) / (2 * h)]; };
  let px = L.x0, py = L.b, vx = L.v, vy = 0, a = acc(px, py), rMin = Infinity; const dt = 0.002;
  for (let k = 0; k < 200000 && px < -L.x0 && Math.hypot(px, py) < 9; k++) {
    px += vx * dt + 0.5 * a[0] * dt * dt; py += vy * dt + 0.5 * a[1] * dt * dt;
    const b = acc(px, py); vx += 0.5 * (a[0] + b[0]) * dt; vy += 0.5 * (a[1] + b[1]) * dt; a = b; rMin = Math.min(rMin, Math.hypot(px, py));
  }
  const bend = -Math.atan2(vy, vx);
  check(`${tag}: clock-load refraction bends the packet inwards (independent Verlet run)`, near(g.deflection, bend, 2e-3) && g.deflection > 0 && near(g.rMin, rMin, 3e-3)
    && near(g.dtdtMin, Math.sqrt(1 - eta(g.rMin)), 1e-12) && g.rMin > L.r0, JSON.stringify({ page: g.deflection, verlet: bend, rMin: g.rMin, r: rMin }));
}
function checkPlanck(pl, logE, tag) {
  const aG = 10 ** (2 * (logE - LOG_EP));
  check(`${tag}: α_G(E) = (E/E_P)² and the hinge wedge δ_h(6)·α_G`, near(pl.alphaG / aG, 1, 1e-9) && near(pl.deltaH, (TAU - 4 * Math.acos(1 / 3)) * aG, 1e-12));
  const inv = logE >= Math.log10(MZ) ? [0, 1, 2].map((i) => inv1(i, logE)) : null;
  check(`${tag}: one-loop α_i⁻¹(E) from M_Z (none below M_Z)`, inv === null ? pl.gaugeInv === null : maxDiff(pl.gaugeInv, inv) < 1e-9);
  const cr = [[0, 1], [1, 2], [0, 2]].map(([i, j]) => crossing(i, j));
  check(`${tag}: pairwise crossings at 10^13.01, 10^17.00, 10^14.39 GeV`, pl.crossings.every((c, k) => near(c.logE, cr[k].logE, 1e-9) && near(c.ainv, cr[k].inv, 1e-9))
    && same(cr.map((c) => c.logE.toFixed(2)), ['13.01', '17.00', '14.39']));
  // max − min of three lines is piecewise linear in ln E: its minimum sits on a crossing
  const spread = (x) => { const v = [0, 1, 2].map((i) => inv1(i, x)); return Math.max(...v) - Math.min(...v); };
  const best = cr.map((c) => ({ x: c.logE, s: spread(c.logE) })).sort((a, b) => a.s - b.s)[0];
  check(`${tag}: the three lines never meet at one point: closest Δα⁻¹ = 3.67 near 10^14.39 GeV`, near(pl.spread.dInv, best.s, 1e-6) && near(pl.spread.logE, best.x, 1e-4) && best.s > 3.6 && pl.spread.dInv.toFixed(2) === '3.67');
  check(`${tag}: α_G crosses each gauge line between 10^18.2 and 10^18.4 GeV`, pl.gravityCrossings.every((x, i) => near(10 ** (2 * (x - LOG_EP)), 1 / inv1(i, x), 1e-9) && x > 18.2 && x < 18.4));
  const aGme = (0.51099895e-3 / 1.220890e19) ** 2;
  check(`${tag}: α_G(m_e) = 1.75 × 10⁻⁴⁵ and α(0)/α_G(m_e) = 4.17 × 10⁴²`, near(pl.alphaGme / aGme, 1, 1e-9) && aGme.toExponential(2) === '1.75e-45'
    && near(pl.ratioMe / (1 / 137.035999084 / aGme), 1, 1e-9) && pl.ratioMe.toExponential(2) === '4.17e+42');
  check(`${tag}: the model's screening cloud is gone at E_P`, pl.cloud === Math.round(18 * Math.min(1, Math.max(0, (LOG_EP - logE) / (LOG_EP + 3)))) && (logE < LOG_EP - 1e-9 || pl.cloud === 0));
}
function checkAll(s, tag) {
  checkCell(s, tag); checkU1(s.u1, s.t, tag); checkSU2(s.su2, s.t, s.logE, tag); checkSU3(s.su3, s.t, s.logE, s.quarkSeparation, tag); checkRegge(s.regge, tag); checkPlanck(s.planck, s.logE, tag);
}
function checkPreset(s, card, tag) {
  const c = CARDS[card];
  check(`${tag}: exact preset state`, s.preset === card && s.scene === c.scene && near(s.logE, c.logE, 1e-12) && near(s.t, c.t, 1e-12) && near(s.quarkSeparation, 1.2, 1e-12)
    && s.lens === false && s.lensMix === 0 && !s.playing, JSON.stringify({ preset: s.preset, scene: s.scene, logE: s.logE, t: s.t, r: s.quarkSeparation }));
  checkAll(s, tag);
}

/* ---------- the page on the desktop ---------- */
const state = (p = page) => p.evaluate(() => window.FORCE_UNIFY_DEBUG.state);
async function input(sel, value, p = page) { await p.locator(sel).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value); await settle(p); }
async function pick(card, p = page) { await p.click(`#presets [data-preset="${card}"]`); await settle(p); }
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');

await T.goto(BOOK, ID, '?lang=zh'); await settle(page, 300);
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

const dom = await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), center = app.querySelector(':scope > main.center'), side = app.querySelector(':scope > .col.side'), deck = app.querySelector(':scope > .col.deck');
  const r = (el) => el.getBoundingClientRect();
  return { skeleton: [...app.children].map((e) => e.tagName + '.' + [...e.classList].sort().join('.')), center: [...center.children].map((e) => (e.id === 'stage' ? '#stage' : '.' + e.className)),
    side: [...side.children].map((e) => e.id), columns: getComputedStyle(app).gridTemplateColumns.split(/\s+/).length, ordered: r(deck).right <= r(center).left && r(center).right <= r(side).left,
    lens: !!deck.querySelector('.lens-toggle[aria-pressed]') && document.querySelectorAll('.lens-toggle').length === 1,
    plot: !!center.querySelector(':scope > .strip #plot') && !document.querySelector('#stage #plot'), stripBelow: r(center.querySelector('.strip')).top >= r(document.getElementById('stage')).bottom,
    info: document.querySelectorAll('#infoBtn').length === 1 && side.querySelector('#evidence').firstElementChild === document.querySelector('#infoBtn') && !document.querySelector('header #infoBtn'),
    drawer: !!document.querySelector('body > #drawer[hidden] .sheet[role="dialog"]'), rail: !!document.querySelector('footer.rail .clock input#now[type=range]') && !!document.querySelector('footer.rail #play'),
    stageKids: [...document.getElementById('stage').children].map((e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '')),
    presets: [...document.querySelectorAll('#presets .preset[data-preset]')].map((b) => [b.dataset.preset, b.dataset.still]) };
});
check('layout: header | deck | center(stage, tour, strip) | side(readouts, evidence) | rail', same(dom.skeleton, ['HEADER.top', 'ASIDE.col.deck', 'MAIN.center', 'ASIDE.col.side', 'FOOTER.rail'])
  && same(dom.center, ['#stage', '.tour', '.strip']) && same(dom.side, ['readouts', 'evidence']), JSON.stringify(dom));
check('layout: three visible ordered columns, strip below the stage, plot outside it', dom.columns === 3 && dom.ordered && dom.plot && dom.stripBelow);
check('layout: one lens toggle in the deck, one #infoBtn inside #evidence, a drawer, a rail with #play and a slider', dom.lens && dom.info && dom.drawer && dom.rail);
check('layout: the stage holds only canvas, overlays, HUD, scene chips, handle, legend (and the label layer)', dom.stageKids.every((k) => /^(canvas#cv|div\.scan|div\.vig|span\.bracket|div#hudTl|div#sceneChips|button#arcHandle|div#legend|div\.tags|canvas\.solid|div\.solid|canvas)/.test(k)), dom.stageKids.join(' '));
check('cards: exactly five presets in order, each with its declared still', same(dom.presets, IDS.map((id) => [id, CARDS[id].still])));
const ev = await page.evaluate(() => {
  const E = document.getElementById('evidence'), boxes = [...E.querySelectorAll('.lean')];
  return { green: boxes.filter((b) => b.className === 'lean').map((b) => b.querySelector('a[data-lean-gid]')?.dataset.leanGid), argued: E.querySelectorAll('.lean.argued').length, model: E.querySelectorAll('.lean.model').length,
    num: E.querySelectorAll('.lean.num').length, open: [...E.querySelectorAll('.lean.open')].map((b) => [...b.querySelectorAll('a')].map((a) => a.getAttribute('href'))), openElsewhere: document.querySelectorAll('.lean.open').length - E.querySelectorAll('.lean.open').length,
    okmarks: document.querySelectorAll('.okmark').length, drawerRefs: [...document.querySelectorAll('#drawer .refs a')].map((a) => a.getAttribute('href')).sort(),
    notProof: /不是证明/.test(document.getElementById('drawer').textContent) && /not a proof/.test(document.getElementById('drawer').textContent) };
});
check('evidence: LEAN ✓ exactly on the six cited GIDs, in order', same(ev.green, GIDS), JSON.stringify(ev.green));
check('evidence: one ARGUED, one MODEL, one NUM box', ev.argued === 1 && ev.model === 1 && ev.num === 1);
check('evidence: three OPEN boxes, in #evidence only, linking the three open problems in both languages', ev.openElsewhere === 0 && same(ev.open, OPEN.map(([f, a]) => [`../../zh/${f}.html#${a}`, `../../en/${f}.html#${a}`])), JSON.stringify(ev.open));
check('evidence: drawer links §39.9 in both languages and says it is not a proof', same(ev.drawerRefs, ['en', 'zh'].map((l) => `../../${l}/${THEORY}`)) && ev.notProof && ev.okmarks === 0);

for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of IDS) {
    await pick(card);
    const s = await state(); checkPreset(s, card, `${lang}/${card}`);
    check(`${lang}/${card}: sole selected card and a note`, await page.$$eval('#presets [aria-pressed="true"]', (els, id) => els.length === 1 && els[0].dataset.preset === id, card)
      && (await page.locator('#presetNote').innerText()).trim().length > 40);
    if (lang === 'en') { const left = await cjkLeftovers(page); check(`en/${card}: no Chinese left on screen`, left.length === 0, left.slice(0, 3).join(' | ')); }
  }
  await page.click('#infoBtn'); await settle(page);
  if (lang === 'en') { const left = await cjkLeftovers(page); check('en: no Chinese left in the drawer', left.length === 0, left.slice(0, 3).join(' | ')); }
  await page.keyboard.press('Escape'); await settle(page);
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// readouts that the captions quote, from the visible text
const text = async (sel) => (await page.locator(sel).innerText()).replace(/\s+/g, ' ');
await pick('u1-blind-phase-fiber');
check('u1 readouts: φ = 45°, product 1.0000, flux 0.0000, α(0) = 1/137.036', (await text('#hudSub')).includes('φ = 45°') && (await text('#ro2')).startsWith('1.0000') && (await text('#ro4')).endsWith('0.0000') && (await text('#ro5')) === '1/137.036');
await pick('su2-chiral-double-cover');
check('su2 readouts: θ = 720°, Re U = 1.0000, lift −1 at 360°, e^(−m_W r) = 0.4476, α₂ = 0.03374', (await text('#ro1')) === '720.0° · 1.0000' && (await text('#ro2')).startsWith('−1') && (await text('#ro5')) === '0.4476' && (await text('#ro6')).startsWith('0.03374'));
await pick('su3-color-flux-confinement');
check('su3 readouts: det U = 1.000000, V = 1.095 GeV at 1.20 fm, 6 cells, ε = 45°', (await text('#ro1')).endsWith('1.000000') && (await text('#ro2')).startsWith('1.095 GeV') && (await text('#ro5')) === '6' && (await text('#ro4')).startsWith('45.00°'));
await pick('regge-gravity-clock-refraction');
check('regge readouts: 282.12° · 77.88°, ΔE = 0 · 0 · 1 · 3 · 6, loads 0.5 + 0.5 = 1', (await text('#ro1')) === '282.12° · 77.88°' && (await text('#ro2')) === '0 · 0 · 1 · 3 · 6' && (await text('#ro4')).endsWith('= 1.0000'));
await pick('planck-scale-convergence');
check('planck readouts: α_G = 1.0000, 1 + 0 cells, crossings 13.01 · 17.00 · 14.39, Δα⁻¹ 3.67, 4.17 × 10⁴²', (await text('#ro1')) === '1.0000' && (await text('#ro3')) === '1 + 0'
  && (await text('#ro4')) === '13.01 · 17.00 · 14.39' && (await text('#ro5')).startsWith('3.67') && (await text('#ro6')).startsWith('4.17 × 10⁴²') && (await text('#hudSub')).includes('log₁₀(E/GeV) = 19.09'));

/* ---------- controls ---------- */
for (const logE of [-3, -1, 0, 1.96, 2, 5, 13, 14.39, 17, 18.3, LOG_EP]) {
  await input('#logE', logE); const s = await state(), tag = `energy ${logE.toFixed(2)}`;
  check(`${tag}: slider sets the energy, leaves the card and keeps the rail on it in the Planck scene`, near(s.logE, logE >= LOG_EP - 1e-12 ? LOG_EP : logE, 1e-9) && s.preset === null && s.scene === 'planck' && near(s.t, (s.logE + 3) / (LOG_EP + 3), 1e-9));
  checkPlanck(s.planck, s.logE, tag);
}
for (const scene of ['u1', 'su2', 'su3', 'regge', 'planck']) {
  await page.click(`#sceneChips [data-scene="${scene}"]`); await settle(page);
  const s = await state();
  check(`scene chip ${scene}: scene, sole pressed chip, HUD title`, s.scene === scene && await page.$$eval('#sceneChips [aria-pressed="true"]', (els, sc) => els.length === 1 && els[0].dataset.scene === sc, scene) && (await text('#hudBig')).length > 4);
  for (const t of [0, 0.25, 0.5, 0.75, 1]) { await input('#now', t); checkAll(await state(), `scene ${scene}/rail ${t}`); }
}
// the lens: same state, other labels
await pick('su2-chiral-double-cover'); const before = await state(), legend0 = await text('#legend');
await page.click('#lensToggleBtn'); await settle(page);
let s = await state();
check('lens: one click switches to the unified arc reading with the same state', s.lens === true && s.lensMix === 1 && s.preset === null && near(s.t, before.t) && near(s.logE, before.logE) && s.scene === before.scene
  && await page.locator('#lensToggleBtn').getAttribute('aria-pressed') === 'true' && (await text('#legend')) !== legend0 && (await text('#hudBig')).includes('2'));
await page.focus('#stage'); await page.keyboard.press('l'); await settle(page);
s = await state();
check('lens: the L key switches back', s.lens === false && s.lensMix === 0 && (await text('#legend')) === legend0);

/* ---------- the amber handle: a real pointer per scene, the camera stays ---------- */
const handleCases = {
  'u1-blind-phase-fiber': (a, b) => !near(a.t, b.t, 1e-9) && near(a.logE, b.logE),
  'su2-chiral-double-cover': (a, b) => !near(a.logE, b.logE, 1e-9) && near(a.t, b.t),
  'su3-color-flux-confinement': (a, b) => !near(a.quarkSeparation, b.quarkSeparation, 1e-9) && near(a.t, b.t),
  'regge-gravity-clock-refraction': (a, b) => !near(a.t, b.t, 1e-9),
  'planck-scale-convergence': (a, b) => !near(a.logE, b.logE, 1e-9) && near(a.t, (a.logE + 3) / (LOG_EP + 3), 1e-9)
};
for (const [card, moved] of Object.entries(handleCases)) {
  await pick(card); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
  const b0 = await state(), img = await picture(), hb = await page.evaluate(() => window.FORCE_UNIFY_DEBUG.handleBox());
  check(`handle ${card}: visible and on top where it is drawn`, !!hb && await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.id === 'arcHandle', hb));
  if (!hb) continue;
  await page.mouse.move(hb.x, hb.y); await page.mouse.down();
  check(`handle ${card}: pointer captured`, await page.locator('#arcHandle').evaluate((el) => el.classList.contains('dragging')));
  const dx = card.startsWith('planck') ? 0 : -60, dy = card.startsWith('planck') ? 70 : 40;
  await page.mouse.move(hb.x + dx, hb.y + dy, { steps: 8 }); await page.mouse.up(); await settle(page);
  const b1 = await state();
  check(`handle ${card}: changes this scene's quantity, leaves the card, keeps the camera`, moved(b1, b0) && b1.preset === null && same(b1.camera, b0.camera) && await picture() !== img,
    JSON.stringify({ t: [b0.t, b1.t], logE: [b0.logE, b1.logE], r: [b0.quarkSeparation, b1.quarkSeparation] }));
  checkAll(b1, `dragged ${card}`);
  await page.mouse.move(hb.x + 30, hb.y - 30); await settle(page);
  check(`handle ${card}: release ends the drag`, same(await state().then((x) => [x.t, x.logE, x.quarkSeparation]), [b1.t, b1.logE, b1.quarkSeparation]) && await page.locator('#arcHandle').evaluate((el) => !el.classList.contains('dragging')));
}
for (const end of ['pointercancel', 'lostpointercapture']) {
  await pick('su3-color-flux-confinement');
  const hb = await page.evaluate(() => window.FORCE_UNIFY_DEBUG.handleBox());
  const fire = (type, id, dx) => page.locator('#arcHandle').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, { bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true, button: 0, buttons: /down|move/.test(a.type) ? 1 : 0, clientX: a.x + a.dx, clientY: a.y + a.dx / 3 })), { type, id, dx, x: hb.x, y: hb.y });
  await fire('pointerdown', 7, 0); await fire('pointermove', 7, -80); await settle(page);
  const moved = (await state()).quarkSeparation;
  await fire(end, 7, 0); await fire('pointermove', 7, 80); await settle(page);
  check(`${end}: ends the drag; later moves are ignored`, moved !== 1.2 && (await state()).quarkSeparation === moved && await page.locator('#arcHandle').evaluate((el) => !el.classList.contains('dragging')));
}
await pick('u1-blind-phase-fiber'); await page.focus('#arcHandle');
const k0 = (await state()).t; await page.keyboard.press('ArrowRight'); await settle(page);
check('handle keyboard: → turns the phase by 1°', near((await state()).t - k0, 1 / 360, 1e-9) && (await state()).preset === null);
// the camera belongs to the canvas
await pick('regge-gravity-clock-refraction'); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
const c0 = await state(), i0 = await picture(), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + box.width * 0.12, box.y + box.height * 0.7); await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.12 + 80, box.y + box.height * 0.7 - 25, { steps: 8 }); await page.mouse.up(); await settle(page);
check('orbit: dragging empty canvas turns the camera, not the quantities', !same((await state()).camera, c0.camera) && near((await state()).t, c0.t) && near((await state()).logE, c0.logE) && await picture() !== i0);
// the rail
await pick('planck-scale-convergence'); await page.click('#rew'); await settle(page);
s = await state();
check('rewind: the Planck rail goes back to log₁₀E = −3 and paused', s.t === 0 && near(s.logE, -3) && !s.playing && s.planck.cloud === 18);
check('play: the rail plays (Planck energy sweep)', await playsAfter(page, async () => { await page.click('#play'); }, () => window.FORCE_UNIFY_DEBUG.state));
await page.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); }); await settle(page);
s = await state();
check('pause: the sweep keeps energy and rail in step', !s.playing && near(s.logE, -3 + s.t * (LOG_EP + 3), 1e-9));
checkPlanck(s.planck, s.logE, 'paused sweep');
for (const sp of [0.5, 2, 1]) { await page.click(`#speedChips [data-speed="${sp}"]`); await settle(page); check(`speed ${sp}: sole pressed`, await page.$$eval('#speedChips [aria-pressed="true"]', (els, v) => els.length === 1 && Number(els[0].dataset.speed) === v, sp)); }
// a card animates: the Planck card sweeps the energy up to E_P from the previous card
await pick('su2-chiral-double-cover');
const trace = await page.evaluate(() => new Promise((resolve) => {
  const seen = []; document.querySelector('[data-preset="planck-scale-convergence"]').click();
  const tick = () => { seen.push(window.FORCE_UNIFY_DEBUG.state.logE); if (seen.length < 4) requestAnimationFrame(tick); else resolve(seen); };
  requestAnimationFrame(tick);
}));
await settle(page);
check('card transition: the Planck card raises the energy from 2.00 to 19.09 through intermediate values', (await state()).logE === LOG_EP && (trace.some((v) => v > 2 && v < LOG_EP) || trace.every((v) => v === LOG_EP)), JSON.stringify(trace));

/* ---------- viewports: both languages × desktop, phone, embed, cited frames (every card) ---------- */
for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [[1440, 900, false, false], [390, 844, false, false], [740, 620, true, false], [740, 500, true, true], [390, 500, true, true], [334, 500, true, true]]) {
  for (const card of figure ? IDS : [null]) {
    const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${card ? `&preset=${card}` : ''}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
    await settle(p, 200);
    const tag = `${lang}/${width}x${height}/${figure ? `figure ${card}` : embed ? 'embed' : 'lab'}`;
    const run = async (c) => {
      const st = await state(p);
      if (c) checkPreset(st, c, `${tag}/${c}`);
      const view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p);
      check(`${tag}${c && !figure ? '/' + c : ''}: no layout, HUD or label collisions, no sideways scroll`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && await overflowX(p) === 0,
        [...view.layout, ...view.hud, ...overlaps].join(' | '));
      if (lang === 'en') { const left = await cjkLeftovers(p); check(`${tag}${c && !figure ? '/' + c : ''}: no Chinese leftovers`, left.length === 0, left.slice(0, 3).join(' | ')); }
    };
    if (figure) await run(card);
    else for (const c of IDS) { await p.click(`#presets [data-preset="${c}"]`); await settle(p); await p.locator('#stage').scrollIntoViewIfNeeded(); await run(c); }
    await p.context().close();
  }
}

/* ---------- stills for PDF/EPUB: the numbers the captions quote ---------- */
for (const lang of ['zh', 'en']) for (const card of IDS) {
  const p = await openStill(T, BOOK, ID, card, lang), st = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(st, card, tag);
  check(`${tag}: a labelled paused frame without the handle`, !st.playing && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('arcHandle').hidden));
  if (card === IDS[0]) check(`${tag}: φ = 45°, ±q product 1, α(0) = 1/137.0`, near(st.u1.phi / DEG, 45) && near(st.u1.product[0], 1, 1e-12) && (1 / st.u1.alpha0).toFixed(1) === '137.0' && st.logE === -3);
  if (card === IDS[1]) check(`${tag}: 720°, Re U = +1, Yukawa 0.448, α₂ = 0.0337 at 100 GeV`, near(st.su2.theta, 4 * PI) && near(st.su2.reU, 1, 1e-12) && st.su2.yukawa.toFixed(3) === '0.448' && st.su2.alpha2.toFixed(4) === '0.0337');
  if (card === IDS[2]) check(`${tag}: det U = 1, r = 1.20 fm, σr = 1.09 GeV, 6 cells, ε = 45°`, near(st.su3.detU, 1, 1e-12) && st.su3.V.toFixed(2) === '1.09' && st.su3.cells === 6 && near(st.su3.eps / DEG, 45, 1e-9));
  if (card === IDS[3]) check(`${tag}: δ_h = 77.88°, ΔE(6) = 3`, (st.regge.deltaH / DEG).toFixed(2) === '77.88' && st.regge.dE.find((d) => d.N === 6).dE === 3);
  if (card === IDS[4]) check(`${tag}: log₁₀E = 19.09, α_G = 1.0000, one cell, δ_h = 77.88°`, st.logE.toFixed(2) === '19.09' && st.planck.alphaG.toFixed(4) === '1.0000' && st.planck.cloud === 0 && (st.planck.deltaH / DEG).toFixed(2) === '77.88');
  await p.context().close();
}

check('zero page, console or request errors', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
check('zero browser console warnings beyond the software GL driver', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
