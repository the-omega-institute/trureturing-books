import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
  settle,
  openStill,
  playsAfter,
  until,
  stageView,
  cjkLeftovers,
  capitalGreek,
  overflowX,
  labelOverlaps,
  solidPixels
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'ternion-nonlinear-synthesis-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY =
  'ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.html#sec-ch39-nonlinear-ternion-representations-and-torsor-synthesis';
const SECTION = '32.4';
const DEG = Math.PI / 180;
const MRP_HALF = (4 * Math.atan(0.5)) / DEG;
const CARDS = {
  'bch-curved-ball-synthesis': { scene: 'bch', a: 90, b: 90, chi: 90, cam: 'ball', still: 1 },
  'dual-chart-rational-mrp': { scene: 'mrp', a: MRP_HALF, b: MRP_HALF, chi: 90, cam: 'panorama', still: 0.75 },
  'hopf-fiber-berry-twist': { scene: 'hopf', a: 180, b: 180, chi: 90, cam: 'sphere', still: 1 },
  'hamilton-spherical-turns': { scene: 'turns', a: 180, b: 180, chi: 90, cam: 'sphere', still: 1 },
  'prufer-baer-heap-torsor': { scene: 'heap', a: 180, b: 180, chi: 90, cam: 'panorama', still: 0.5 }
};
const IDS = Object.keys(CARDS);
const DEFAULT = IDS[0];
const CAM_NAMES = ['panorama', 'ball', 'sphere'];
const CURSOR = /cursor|handle/i;
const GIDS = [
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy',
  'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
  'D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const nearV = (a, b, tol = 1e-9) => !!a && !!b && a.length === b.length && a.every((x, i) => near(x, b[i], tol));
// an arc cosine near ±1 loses half the digits: distances on S³ are compared to 3e-7
const ACOS = 3e-7;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4).replace('-', '−');

/* ---------- independent mathematics, written here and never calling the page ----------
   SU(2) as 2 × 2 complex matrices [re, im]: the quaternion w + x i + y j + z k is w I − i(x σx + y σy + z σz), so that
   i j = k becomes (−iσx)(−iσy) = −iσz. Rotations, products, logarithms, MRP charts, shortest gates and heap brackets
   are recomputed in this representation; the Hopf phase is integrated from the connection −½(1 − cos ϑ) dφ. */
const cx = (re, im = 0) => [re, im];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const conj = (a) => [a[0], -a[1]];
const mmul = (A, B) => A.map((row) => [0, 1].map((j) => cadd(cmul(row[0], B[0][j]), cmul(row[1], B[1][j]))));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => cadd(x, B[i][j])));
const mscale = (A, z) => A.map((row) => row.map((x) => cmul(x, z)));
const dagger = (A) => [0, 1].map((i) => [0, 1].map((j) => conj(A[j][i])));
const tr = (A) => cadd(A[0][0], A[1][1]);
const mgap = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const ID2 = [[cx(1), cx(0)], [cx(0), cx(1)]];
const SIG = [
  [[cx(0), cx(1)], [cx(1), cx(0)]],
  [[cx(0), cx(0, -1)], [cx(0, 1), cx(0)]],
  [[cx(1), cx(0)], [cx(0), cx(-1)]]
];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const addv = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, k) => a.map((x) => x * k);
const unit = (a) => scale(a, 1 / norm(a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sigmaOf = (r) => SIG.reduce((M, S, k) => madd(M, mscale(S, cx(r[k]))), [[cx(0), cx(0)], [cx(0), cx(0)]]);
/** cos(θ/2) I − i sin(θ/2) û·σ. */
const su2 = (theta, u) => madd(mscale(ID2, cx(Math.cos(theta / 2))), mscale(sigmaOf(u), cx(0, -Math.sin(theta / 2))));
const toQ = (U) => [tr(U)[0] / 2, ...SIG.map((S) => -tr(mmul(U, S))[1] / 2)];
const fromQ = (q) => madd(mscale(ID2, cx(q[0])), mscale(sigmaOf(q.slice(1)), cx(0, -1)));
const qDistance = (A, B) => Math.acos(Math.max(-1, Math.min(1, tr(mmul(dagger(A), B))[0] / 2)));
/** The arc vector of an SU(2) element: 2 atan2(‖v‖, w) v/‖v‖. */
function arcVector(U) {
  const q = toQ(U),
    v = q.slice(1),
    s = norm(v);
  return s < 1e-12 ? null : scale(v, (2 * Math.atan2(s, q[0])) / s);
}
/** The shadow MRP chart of an SU(2) element: σ in the closed unit ball and ε = sign(w). */
function chart(U) {
  const q = toQ(U),
    eps = q[0] >= 0 ? 1 : -1;
  return { s: scale(q.slice(1), eps / (1 + eps * q[0])), eps };
}
const Qof = (s) => {
  const n = dot(s, s);
  return [(1 - n) / (1 + n), ...s.map((x) => (2 * x) / (1 + n))];
};
/** The rotation matrix of U: R_ij = ½ Re Tr(σ_i U σ_j U†). */
const rotationOf = (U) => [0, 1, 2].map((i) => [0, 1, 2].map((j) => tr(mmul(mmul(SIG[i], U), mmul(SIG[j], dagger(U))))[0] / 2));
const arcLen = (a, b) => Math.atan2(norm(cross(a, b)), dot(a, b));
function slerp(a, b, f) {
  const w = arcLen(a, b);
  if (w < 1e-12) return a.slice();
  return addv(scale(a, Math.sin((1 - f) * w) / Math.sin(w)), scale(b, Math.sin(f * w) / Math.sin(w)));
}
/** Girard: the area of a spherical triangle is the sum of its angles minus π. */
function girard(A, B, C) {
  const angle = (P, Q, R) => {
    const t1 = unit(sub(Q, scale(P, dot(P, Q)))),
      t2 = unit(sub(R, scale(P, dot(P, R))));
    return Math.acos(Math.max(-1, Math.min(1, dot(t1, t2))));
  };
  return angle(A, B, C) + angle(B, C, A) + angle(C, A, B) - Math.PI;
}
/** The point at τ of the loop P₁ → P₂ → P₃ → P₁ by arc length, and the edge it is on. */
function loopPoint(V, tau) {
  const lens = [0, 1, 2].map((k) => arcLen(V[k], V[(k + 1) % 3]));
  let s = tau * (lens[0] + lens[1] + lens[2]),
    k = 0;
  while (k < 2 && s > lens[k] + 1e-15) s -= lens[k++];
  return { b: slerp(V[k], V[(k + 1) % 3], lens[k] > 1e-12 ? Math.min(1, s / lens[k]) : 1), k, f: lens[k] > 1e-12 ? s / lens[k] : 1 };
}
/** ψ₊ carried horizontally along the loop to τ: ∫ −½(1 − cos ϑ) dφ over finely sampled geodesic edges. */
function hopfPhase(V, tau, steps = 2400) {
  let total = 0;
  const at = loopPoint(V, tau);
  for (let k = 0; k <= at.k; k++) {
    const a = V[k],
      b = V[(k + 1) % 3],
      end = k < at.k ? 1 : at.f;
    let prev = a;
    const n = Math.max(2, Math.ceil(steps * end));
    for (let i = 1; i <= n; i++) {
      const p = slerp(a, b, (end * i) / n);
      const mid = unit(addv(prev, p));
      const r0 = Math.hypot(prev[0], prev[1]),
        r1 = Math.hypot(p[0], p[1]);
      if (r0 > 1e-9 && r1 > 1e-9) {
        let dphi = Math.atan2(p[1], p[0]) - Math.atan2(prev[1], prev[0]);
        while (dphi > Math.PI) dphi -= 2 * Math.PI;
        while (dphi < -Math.PI) dphi += 2 * Math.PI;
        total += -0.5 * (1 - mid[2]) * dphi;
      }
      prev = p;
    }
  }
  return total;
}
/** The Lean rotor (1 + (b·σ)(a·σ))/√(2(1 + a·b)). */
const leanRotor = (a, b) => mscale(madd(ID2, mmul(sigmaOf(b), sigmaOf(a))), cx(1 / Math.sqrt(2 * (1 + dot(a, b)))));
const northSpinor = (a) => {
  const th = Math.acos(Math.max(-1, Math.min(1, a[2]))),
    ph = Math.atan2(a[1], a[0]);
  return [cx(Math.cos(th / 2)), cx(Math.cos(ph) * Math.sin(th / 2), Math.sin(ph) * Math.sin(th / 2))];
};
const inner = (u, v) => cadd(cmul(conj(u[0]), v[0]), cmul(conj(u[1]), v[1]));

/** The pair of the state, in SU(2). */
function pairOf(m) {
  const uB = [Math.cos(m.chiDeg * DEG), Math.sin(m.chiDeg * DEG), 0];
  return { UA: su2(m.thetaADeg * DEG, [1, 0, 0]), UB: su2(m.thetaBDeg * DEG, uB), uA: [1, 0, 0], uB };
}
/** The cursor of the card's path at τ, recomputed here. */
function cursorOf(m) {
  const { UA, uB } = pairOf(m),
    a = m.thetaADeg * DEG,
    b = m.thetaBDeg * DEG,
    t = m.tau;
  if (m.scene === 'bch') {
    const s = t * (a + b);
    return s <= a ? su2(s, [1, 0, 0]) : mmul(UA, su2(s - a, uB));
  }
  if (m.scene === 'mrp') return su2(2 * Math.PI * t, [1, 0, 0]);
  if (m.scene === 'heap') return t <= 0.5 ? su2((1 - 2 * t) * a, [1, 0, 0]) : su2((2 * t - 1) * b, uB);
  const P1 = m.triangle[0],
    pb = loopPoint(m.triangle, t).b;
  return fromQ([dot(P1, pb), ...cross(P1, pb)]);
}

/* ---------- the browser session ---------- */
const T = await session();
const { page, check } = T;
const driverInfo =
  /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watched = new WeakSet();
function watchPage(p) {
  if (watched.has(p)) return;
  watched.add(p);
  p.on('console', (msg) => {
    if ((msg.type() === 'info' || msg.type() === 'warning') && driverInfo.test(msg.text())) return;
    if (msg.type() === 'warning') browserWarnings.push(`${p.url()}: ${msg.text()}`);
  });
}
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__ternionNonlinearPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records)
        window
          .__ternionNonlinearPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') })
          .catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__ternionNonlinearPaletteAudit({
            kind: 'document',
            absent: document.documentElement.dataset.trPalette === undefined,
            dark: matchMedia('(prefers-color-scheme: dark)').matches
          })
          .catch(() => {}),
      { once: true }
    );
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let colorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await browserNewContext({ ...options, colorScheme });
  await watchPalette(context);
  return context;
};
watchPage(page);

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark behind the shell, resting)
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources, registry and lock ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
const entryText = JSON.stringify(entry || {});
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116],
  [99, 108, 97, 117, 100, 101],
  [97, 110, 116, 104, 114, 111, 112, 105, 99],
  [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105],
  [99, 111, 100, 101, 120],
  [99, 111, 112, 105, 108, 111, 116],
  [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116],
  [104, 97, 105, 107, 117],
  [108, 108, 109],
  [97, 103, 101, 110, 116],
  [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = new RegExp(
  [
    [22823, 27169, 22411],
    [26234, 33021, 20307],
    [20154, 24037, 26234, 33021]
  ]
    .map((c) => String.fromCharCode(...c))
    .join('|')
);
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src));
}
check('source style.css: the lab grid is the shared one', !/grid-template-columns/.test(sources['style.css']));
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src)));
check(
  'registration matches the section, all five cards and all eight GIDs',
  !!entry &&
    entry.status === 'live' &&
    entry.chapter === 32 &&
    entry.section === SECTION &&
    entry.added === '2026-11-19' &&
    entry.code === 'TERNION//NONLINEAR' &&
    same(entry.presets, IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
check('all eight GIDs are frozen theorems of the pinned commit', GIDS.every((g) => lock.declarations[g] && lock.declarations[g].kind === 'theorem'));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.TERNION_NONLINEAR_DEBUG.state);
const calc = (p = page) => p.evaluate(() => window.TERNION_NONLINEAR_DEBUG.calc);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await until(p, (id) => {
    const s = window.TERNION_NONLINEAR_DEBUG.state;
    return s.preset === id && !s.blending;
  }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, t);
  await settle(p);
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/* ---------- the page's claims, checked against the mathematics above ---------- */
function verifyMath(m, label) {
  const { UA, UB, uA, uB } = pairOf(m),
    UC = mmul(UA, UB),
    qC = toQ(UC);
  const a = m.thetaADeg * DEG,
    b = m.thetaBDeg * DEG;
  // 1. the curved product and the flat sum
  check(label + ' BCH: W, V and W² + ‖V‖² = 1 from the SU(2) product', near(m.W, qC[0]) && nearV(m.V, qC.slice(1)) && near(m.unitNorm, 1, 1e-12));
  const thetaC = arcVector(UC);
  const lin = addv(scale(uA, a), scale(uB, b));
  check(
    label + ' BCH: θ_C = log(q_A q_B), the flat gap, the S³ error and the chord sum',
    (!thetaC || nearV(m.thetaC, thetaC, 1e-9)) &&
      near(m.gap, norm(sub(lin, m.thetaC)), 1e-9) &&
      near(m.geodesic, qDistance(su2(norm(lin), norm(lin) > 0 ? unit(lin) : [1, 0, 0]), UC), ACOS) &&
      near(m.chord, 2 + tr(mmul(dagger(UA), UB))[0], 1e-12)
  );
  // 2. the rational charts
  const cA = chart(UA),
    cB = chart(UB),
    cC = chart(UC);
  const product = m.mrp.sAB ? scale(Qof(m.mrp.sAB), m.mrp.epsAB) : null;
  check(
    label + ' MRP: bounded charts of A and B and of the product, with ε Q(σ) = q',
    nearV(m.mrp.A.s, cA.s) && m.mrp.A.eps === cA.eps && nearV(m.mrp.B.s, cB.s) && m.mrp.B.eps === cB.eps &&
      (product === null ? Math.abs(Math.abs(qC[0]) - 1) < 1e-9 : nearV(product, qC, 1e-9) && dot(m.mrp.sAB, m.mrp.sAB) <= 1 + 1e-12)
  );
  if (m.mrp.sAB && m.mrp.epsAB === cC.eps) check(label + ' MRP: σ_A ★ σ_B is the chart of q_A q_B', nearV(m.mrp.sAB, cC.s, 1e-9));
  if (m.mrp.R) check(label + ' MRP: R(σ_AB) is the rotation of q_A q_B', m.mrp.R.every((row, i) => nearV(row, rotationOf(UC)[i], 1e-9)));
  check(
    label + ' MRP: the denominator is (1 − σ_A·σ_B)² + ‖σ_A × σ_B‖²',
    near(m.mrp.den, (1 - dot(cA.s, cB.s)) ** 2 + dot(cross(cA.s, cB.s), cross(cA.s, cB.s)), 1e-12)
  );
  // 3. the cursor of the card's path and its chart
  const cur = cursorOf(m),
    cc = chart(cur);
  check(label + ' the cursor of the path and its (σ, ε)', nearV(m.cursor.q, toQ(cur), 1e-9) && nearV(m.cursor.s, cc.s, 1e-9) && m.cursor.eps === cc.eps);
  // 4. the triangle: intrinsic shape, S, D, the excess and the return phase
  const V = m.triangle,
    [P1, P2, P3] = V;
  const tangent = (P, Q) => unit(sub(Q, scale(P, dot(P, Q))));
  const proper = (p, q) => arcLen(p, q) > 1e-6 && arcLen(p, q) < Math.PI - 1e-6;
  const vertexAngle = proper(P1, P2) && proper(P2, P3) ? Math.acos(Math.max(-1, Math.min(1, dot(tangent(P2, P1), tangent(P2, P3))))) : null;
  check(
    label + ' triangle: P₁ = +z, arcs θ_B/2 and θ_A/2, angle π − χ at P₂',
    nearV(P1, [0, 0, 1]) && V.every((p) => near(norm(p), 1)) && near(arcLen(P1, P2), Math.min(b / 2, Math.PI), 1e-9) &&
      near(arcLen(P2, P3), Math.min(a / 2, Math.PI), 1e-9) && (vertexAngle === null || near(vertexAngle, Math.PI - m.chiDeg * DEG, 1e-7))
  );
  const S = 1 + dot(P1, P2) + dot(P2, P3) + dot(P3, P1),
    D = dot(P1, cross(P2, P3)),
    SD = S * S + D * D;
  check(label + ' triangle: S and D', near(m.S, S, 1e-12) && near(m.D, D, 1e-12));
  if (SD > 1e-9) {
    if (proper(P1, P2) && proper(P2, P3) && proper(P3, P1))
      check(label + ' triangle: the excess Ω is the Girard area', near(Math.abs(m.omega), girard(P1, P2, P3), 1e-7) || girard(P1, P2, P3) < 1e-7);
    check(label + ' triangle: the return phase (S − iD)/√(S² + D²)', near(m.holonomy.re, S / Math.sqrt(SD), 1e-12) && near(m.holonomy.im, -D / Math.sqrt(SD), 1e-12));
  }
  // Hamilton turns: T₂₃T₁₂ = T₁₃ and the closed loop is +1; T₁₂ turns by θ_B and T₂₃ by θ_A
  const turnU = (p, q) => fromQ([dot(p, q), ...cross(p, q)]);
  check(
    label + ' turns: shared vertices cancel and the loop closes at +1',
    nearV(m.turns.T23T12, toQ(mmul(turnU(P2, P3), turnU(P1, P2))), 1e-12) && nearV(m.turns.T23T12, toQ(turnU(P1, P3)), 1e-9) &&
      nearV(m.turns.loop, [1, 0, 0, 0], 1e-9) && near(m.turns.T12[0], Math.cos(b / 2), 1e-9) && near(m.turns.T23[0], Math.cos(a / 2), 1e-9)
  );
  // 5. the fibre phase of the spinor carried by shortest gates, against the connection integral
  if ((m.scene === 'hopf' || m.scene === 'turns') && m.fibre && m.fibre.plus != null && V.every((p) => p[2] > -0.999)) {
    const phase = hopfPhase(V, m.tau),
      diff = Math.atan2(Math.sin(m.fibre.plus - phase), Math.cos(m.fibre.plus - phase));
    check(label + ' fibre: ψ₊ is the integral of −½(1 − cos ϑ) dφ along the path', Math.abs(diff) < 2e-4, `${m.fibre.plus} vs ${phase}`);
    if (m.fibre.minus != null) {
      const pb = loopPoint(V, m.tau).b,
        phi = Math.atan2(pb[1], pb[0]),
        gauge = Math.atan2(Math.sin(m.fibre.minus - m.fibre.plus - phi), Math.cos(m.fibre.minus - m.fibre.plus - phi));
      if (Math.hypot(pb[0], pb[1]) > 1e-6) check(label + ' fibre: ψ₋ − ψ₊ = φ', Math.abs(gauge) < 1e-9);
    }
  }
  // 6. the heap and the Lie triple bracket
  const x = UA,
    z = UB,
    y = m.scene === 'heap' ? cursorOf(m) : fromQ(m.heap.y);
  const xyz = mmul(mmul(x, dagger(y)), z),
    zyx = mmul(mmul(z, dagger(y)), x);
  check(
    label + ' heap: [x, y, z] = x y⁻¹ z and [z, y, x] = z y⁻¹ x',
    nearV(m.heap.xyz, toQ(xyz), 1e-9) && nearV(m.heap.zyx, toQ(zyx), 1e-9) && near(m.heap.gap, qDistance(xyz, zyx), ACOS) &&
      near(m.heap.carried, qDistance(z, xyz), ACOS) && near(m.heap.original, qDistance(y, x), ACOS) && near(m.heap.carried, m.heap.original, ACOS)
  );
  const bracket = sub(uB, scale(uA, dot(uA, uB)));
  check(
    label + ' Lie triple: {a, b, a} = (a·a) b − (b·a) a and K = +1',
    nearV(m.lie.bracket, bracket, 1e-12) && (Math.sin(m.chiDeg * DEG) ** 2 < 1e-12 ? m.lie.curvature === null : near(m.lie.curvature, 1, 1e-12))
  );
}
/** The instances the evidence panel names, checked against algebra written here. */
function verifyInstances(m, label) {
  const I = m.leanInstances,
    [a, b, c] = m.triangle;
  check(label + ' Lean 1: the cross product of the product is the one with ε = + (i j = +k)', I.cross.epsilon === 1 && nearV(I.cross.ij, [0, 0, 0, 1]) && I.cross.closed < 1e-12);
  let half = 0;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) half += (m.uA[i] * m.uB[j] - m.uA[j] * m.uB[i]) ** 2;
  check(
    label + ' Lean 2: Lagrange–Gram on û_A, û_B',
    near(I.lagrange.lhs, 1 - dot(m.uA, m.uB) ** 2, 1e-12) && near(I.lagrange.rhs, half / 2, 1e-12) && near(I.lagrange.lhs, I.lagrange.rhs, 1e-12) && near(I.lagrange.unit, 1, 1e-12)
  );
  const pairs = [[a, b], [b, c], [c, a]];
  check(
    label + ' Lean 3: each edge rotor is unitary, carries a·σ to b·σ and equals the normalized projection',
    I.rotor.every((e, k) => {
      const [p, q] = pairs[k];
      if (1 + dot(p, q) < 1e-9) return e === null;
      const R = leanRotor(p, q);
      return !!e && e.unitary < 1e-12 && e.conj < 1e-12 && e.projection < 1e-12 && mgap(mmul(R, dagger(R)), ID2) < 1e-12 && mgap(mmul(mmul(R, sigmaOf(p)), dagger(R)), sigmaOf(q)) < 1e-12;
    })
  );
  const S = 1 + dot(a, b) + dot(b, c) + dot(c, a),
    D = dot(a, cross(b, c));
  if ([[a, b], [b, c], [c, a]].every(([p, q]) => 1 + dot(p, q) > 1e-9)) {
    const loop = mmul(leanRotor(c, a), mmul(leanRotor(b, c), leanRotor(a, b))),
      want = mscale(madd(mscale(ID2, cx(S)), mscale(sigmaOf(a), cx(0, -D))), cx(1 / Math.sqrt(S * S + D * D)));
    check(
      label + ' Lean 4: three rotors give (S I − iD a·σ)/√(S² + D²); the projections return the phase',
      mgap(loop, want) < 1e-12 && I.holonomy && I.holonomy.product < 1e-12 && I.holonomy.gram < 1e-12 && I.holonomy.returned < 1e-12 &&
        near(I.holonomy.phase[0], S / Math.sqrt(S * S + D * D), 1e-12) && near(I.holonomy.phase[1], -D / Math.sqrt(S * S + D * D), 1e-12) &&
        near(S * S + D * D, 2 * (1 + dot(a, b)) * (1 + dot(b, c)) * (1 + dot(c, a)), 1e-12)
    );
  }
  const P = (r) => mscale(madd(ID2, sigmaOf(r)), cx(0.5)),
    trace3 = tr(mmul(P(a), mmul(P(b), P(c))));
  check(label + ' Lean 5: Tr(P₁P₂P₃) = (S + iD)/4', near(I.bargmann3.trace[0], trace3[0], 1e-12) && near(I.bargmann3.trace[1], trace3[1], 1e-12) && near(trace3[0], S / 4, 1e-12) && near(trace3[1], D / 4, 1e-12));
  const sa = northSpinor(a),
    sb = northSpinor(b),
    sc = northSpinor(c),
    cyc = cmul(cmul(inner(sa, sb), inner(sb, sc)), inner(sc, sa));
  check(label + ' Lean 6: the Bargmann chain of the vertex spinors is the cyclic product of overlaps', I.bargmannPath.gap < 1e-12 && near(I.bargmannPath.product[0], cyc[0], 1e-12) && near(I.bargmannPath.product[1], cyc[1], 1e-12));
  check(label + ' Lean 7: the two-axis hypothesis cos²χ < 1', I.twoAxis.hypothesis === Math.cos(m.chiDeg * DEG) ** 2 < 1 - 1e-12);
  if (m.scene === 'mrp') {
    const h = Math.PI * m.tau;
    check(label + ' Lean 8: the lift e^{iϑ/2} squares to the base point; its sign is the sheet', near(I.lift.z[0], Math.cos(h), 1e-12) && near(I.lift.z[1], Math.sin(h), 1e-12) && near(I.lift.base[0], Math.cos(2 * h), 1e-12) && I.lift.sheet === (Math.cos(h) >= 0 ? 1 : -1));
  }
}
/** The strip: each row recomputed here (every eighth row). */
function verifyStrip(m, label) {
  const rows = m.strip.rows,
    bad = [];
  for (let i = 0; i < rows.length; i += 8) {
    const [t, c1, c2, c3] = rows[i],
      mm = { ...m, tau: t };
    if (m.scene === 'bch') {
      const U = cursorOf(mm),
        a = m.thetaADeg * DEG,
        s = t * (a + m.thetaBDeg * DEG),
        flat = s <= a ? [s, 0, 0] : addv([a, 0, 0], scale(pairOf(m).uB, s - a)),
        log = arcVector(U) || [0, 0, 0];
      if (!near(c1, 1, 1e-12) || !near(c2, norm(sub(flat, log)), 1e-9)) bad.push(t);
    } else if (m.scene === 'mrp') {
      if (!near(c1, norm(chart(su2(2 * Math.PI * t, [1, 0, 0])).s), 1e-9) || !near(c2, Math.min(4, Math.abs(Math.tan(Math.PI * t))), 1e-9)) bad.push(t);
    } else if (m.scene === 'heap') {
      const { UA, UB } = pairOf(m),
        y = cursorOf(mm),
        xyz = mmul(mmul(UA, dagger(y)), UB),
        zyx = mmul(mmul(UB, dagger(y)), UA);
      if (!near(c1, qDistance(y, UA), ACOS) || !near(c2, qDistance(xyz, zyx), ACOS) || !near(c3, qDistance(UB, xyz), ACOS) || !near(c1, c3, ACOS)) bad.push(t);
    } else {
      const V = m.triangle,
        pb = loopPoint(V, t).b;
      if (m.scene === 'turns' && !near(c1, dot(V[0], pb), 1e-9)) bad.push(t);
      if (m.scene === 'hopf' && !near(c1, 1, 1e-12)) bad.push(t);
      if (c2 != null && V.every((p) => p[2] > -0.999)) {
        const phase = -hopfPhase(V, t, 1200);
        if (Math.abs(Math.atan2(Math.sin(c2 - phase), Math.cos(c2 - phase))) > 4e-4) bad.push(t);
      }
    }
  }
  check(label + ' strip rows recomputed', !bad.length && rows.length === 161 && rows[0][0] === 0 && rows.at(-1)[0] === 1, bad.slice(0, 4).join(', '));
}
async function verifyCard(p, id) {
  const s = await state(p),
    m = await calc(p),
    c = CARDS[id];
  check(
    id + ' scene, angles, view and card',
    s.preset === id && s.scene === c.scene && near(s.thetaADeg, c.a, 1e-9) && near(s.thetaBDeg, c.b, 1e-9) && s.chiDeg === c.chi && s.cam === c.cam
  );
  verifyMath(m, id);
  verifyInstances(m, id);
  return m;
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('the BCH card opens by default', (await state()).preset === DEFAULT);
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #camChips') &&
      ['thetaADeg', 'thetaBDeg', 'axisAngleDeg'].every((id) => q('#ctlPanel input#' + id + '[type=range]')) &&
      !!q('main.center > #stage > canvas.fill#cv') && !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') &&
      !!q('#stage > #hudTl #hudBig') && !!q('#stage > button.handle#ternionHandle') && !!q('#stage > .hud-bl#legend') &&
      !!q('main.center > .tour') && !!q('main.center > .strip #plot') && !q('#stage .strip') && !!q('.app.lab > footer.rail') &&
      !!q('aside.col.side > #readouts') && q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' &&
      ['§32.4', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      document.querySelectorAll('#evidence .lean.argued').length >= 1 && document.querySelectorAll('#evidence .lean.model').length === 1 &&
      document.querySelectorAll('#evidence .lean.num').length === 1 &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelector('ol li b') && el.querySelector('p.lede.refs a')) &&
      /不是证明/.test(q('#drawer .sheet > div.zh').textContent) && /not a proof/.test(q('#drawer .sheet > div.en').textContent)
    );
  })
);
check(
  'the probe exposes state, calc and the card table',
  await page.evaluate(() => {
    const d = window.TERNION_NONLINEAR_DEBUG;
    return Object.isFrozen(d) && typeof d.state === 'object' && typeof d.calc === 'object' && Object.keys(d.presets).length === 5 &&
      Object.values(d.presets).every((p) => p.play === true && p.still != null);
  })
);
check(
  'a card click starts a blend of the angles instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="hopf-fiber-berry-twist"]').click();
    const s = window.TERNION_NONLINEAR_DEBUG.state;
    return s.blending && s.thetaADeg < 180;
  })
);
await settle(page);
await until(page, () => !window.TERNION_NONLINEAR_DEBUG.state.blending);
check('the blend ends on the card', near((await state()).thetaADeg, 180) && !(await state()).blending);

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page
    .locator('#drawer .refs a')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory link', links.includes('../../' + lang + '/' + THEORY));
  check(lang + ' cited declarations, in order', same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const boxText = async (selector) => (await page.locator('#evidence ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const holonomyText = await boxText('[class="lean"]:has([data-lean-gid$=".shortest_gate_triangle_holonomy"])');
  check(lang + ' the holonomy box states S² + D² and the return phase as in Lean', holonomyText.includes('S²+D²=2(1+a·b)(1+b·c)(1+c·a)') && holonomyText.includes('(S−iD)/√(S²+D²)'));
  const numText = await boxText('.lean.num');
  check(lang + ' the NUM box carries the audit numbers of the chapter', ['1.3129', '0.5441', '31.18°', '(6/17,6/17,8/17)', '(−0.4142,0,0)'].every((x) => numText.includes(x)));
  const argued = await boxText('.lean.argued');
  check(lang + ' literature and paper derivations are ARGUED', /Prüfer|普吕弗/.test(argued) && /Baer|贝尔/.test(argued) && argued.includes('{a,b,c}=(a·c)b−(b·c)a'));
  for (const id of IDS) {
    await pick(id);
    await page.evaluate(() => TRV.kit.pause());
    const m = await verifyCard(page, id);
    verifyStrip(m, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(
      lang + '/' + id + ' one key and six readouts, all populated',
      readings.length === 7 && (await page.locator('#readouts dl.ro > div').count()) === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 &&
        readings.every((t) => t && !/NaN|undefined|^—$/.test(t))
    );
    check(
      lang + '/' + id + ' the key readout and the pill show W',
      (await textOf('roKey')).includes(f4(m.W).replace('−', '-')) && (await textOf('keyPill')).includes(f4(Math.abs(m.W))) && (await textOf('hudSub')).trim().length > 0
    );
  }
}

/* ---------- the audit numbers of the §32.4 example, at the cards ---------- */
await pick('bch-curved-ball-synthesis');
let m = await calc();
check(
  'Part I: W = 1/2, V = ½(1, 1, 1), θ_C = (2π/(3√3))(1, 1, 1), 120°',
  near(m.W, 0.5, 1e-12) && nearV(m.V, [0.5, 0.5, 0.5], 1e-12) && nearV(m.thetaC, Array(3).fill((2 * Math.PI) / (3 * Math.sqrt(3))), 1e-12) && near(m.thetaCDeg, 120, 1e-9)
);
check(
  'Part I: the flat sum misses by 1.31288539 rad, 0.54410876 rad = 31.17513557° on S³, and ‖q_A + q_B‖² = 3',
  near(m.gap, 1.31288539, 5e-9) && near(m.geodesic, 0.54410876, 5e-9) && near(m.geodesic / DEG, 31.17513557, 5e-8) && near(m.chord, 3, 1e-12)
);
check('Part I: the readouts print them', (await textOf('roBch')).includes('1.3129') && (await textOf('roChord')).includes('3.0000') && (await textOf('roChord')).includes('31.18°'));
await pick('dual-chart-rational-mrp');
await seek(0.75);
m = await calc();
check(
  'Part II: σ_A = (1/2, 0, 0), σ_B = (0, 1/2, 0), σ_AB = (6/17, 6/17, 8/17), Q = (9/25, 12/25, 12/25, 16/25)',
  nearV(m.mrp.A.s, [0.5, 0, 0], 1e-12) && nearV(m.mrp.B.s, [0, 0.5, 0], 1e-12) && nearV(m.mrp.sAB, [6 / 17, 6 / 17, 8 / 17], 1e-12) &&
    near(m.mrp.den, 17 / 16, 1e-12) && nearV(m.mrp.num, [3 / 8, 3 / 8, 1 / 2], 1e-12) && nearV(Qof(m.mrp.sAB), [9 / 25, 12 / 25, 12 / 25, 16 / 25], 1e-12)
);
const R625 = [[-175, 0, 600], [576, -175, 168], [168, 600, 49]];
check('Part II: 625 R(σ_AB) is the integer matrix of the chapter', m.mrp.R.every((row, i) => row.every((x, j) => near(625 * x, R625[i][j], 1e-9))));
check('Part II: at 270° the shadow is (−0.41421356, 0, 0) with ε = −1', near(m.tau, 0.75, 1e-12) && nearV(m.cursor.s, [1 - Math.SQRT2, 0, 0], 1e-9) && m.cursor.eps === -1);
check('Part II: the readouts print (6/17, 6/17, 8/17) and ε = −1', (await textOf('roMrp')).includes('(6/17, 6/17, 8/17)') && (await textOf('roSheet')).includes('ε = -1') && (await textOf('roNote')).includes('-175'));
await seek(1);
m = await calc();
check('Part II: at 360° the probe is (0, −1) = −1', nearV(m.cursor.s, [0, 0, 0], 1e-9) && m.cursor.eps === -1 && near(m.leanInstances.lift.z[0], -1, 1e-12));
await seek(0.49);
check('Part II: before 180° the probe is on the primary sheet', (await calc()).cursor.eps === 1);
await pick('hopf-fiber-berry-twist');
await seek(1);
m = await calc();
check(
  'Part III: the first octant +z → +x → +y, Ω = π/2, S = 1, D = 1',
  nearV(m.triangle[0], [0, 0, 1]) && nearV(m.triangle[1], [1, 0, 0], 1e-12) && nearV(m.triangle[2], [0, 1, 0], 1e-12) && near(m.omega, Math.PI / 2, 1e-12) && near(m.S, 1, 1e-12) && near(m.D, 1, 1e-12)
);
check('Part III: the fibre phase ends at −Ω/2 = −π/4', near(m.fibre.plus, -Math.PI / 4, 1e-9) && near(hopfPhase(m.triangle, 1), -Math.PI / 4, 1e-6));
await pick('hamilton-spherical-turns');
await seek(1);
m = await calc();
check(
  'Part III: T₁₂ = +j, T₂₃ = +k, T₂₃T₁₂ = −i = T₁₃, T₃₁T₂₃T₁₂ = +1, phase (1 − i)/√2',
  nearV(m.turns.T12, [0, 0, 1, 0], 1e-12) && nearV(m.turns.T23, [0, 0, 0, 1], 1e-12) && nearV(m.turns.T23T12, [0, -1, 0, 0], 1e-12) &&
    nearV(m.turns.T13, [0, -1, 0, 0], 1e-12) && nearV(m.turns.loop, [1, 0, 0, 0], 1e-12) && near(m.holonomy.re, Math.SQRT1_2, 1e-12) && near(m.holonomy.im, -Math.SQRT1_2, 1e-12)
);
check('Part III: Tr(P₁P₂P₃) = (1 + i)/4', near(m.leanInstances.bargmann3.trace[0], 0.25, 1e-12) && near(m.leanInstances.bargmann3.trace[1], 0.25, 1e-12));
await pick('prufer-baer-heap-torsor');
await seek(0.5);
m = await calc();
check(
  'Part IV: [i, 1, j] = +k, [j, 1, i] = −k, {e₁, e₂, e₁} = e₂, K = +1',
  nearV(m.heap.y, [1, 0, 0, 0], 1e-12) && nearV(m.heap.x, [0, 1, 0, 0], 1e-12) && nearV(m.heap.z, [0, 0, 1, 0], 1e-12) &&
    nearV(m.heap.xyz, [0, 0, 0, 1], 1e-12) && nearV(m.heap.zyx, [0, 0, 0, -1], 1e-12) && nearV(m.lie.bracket, [0, 1, 0], 1e-12) && near(m.lie.curvature, 1, 1e-12)
);
check('Part IV: the readout prints +k and −k', (await textOf('roHeap')).includes('+k') && (await textOf('roHeap')).includes('-k'));
// left equivariance and the Mal'cev laws, with the bridge at both ends of the path
for (const t of [0, 1]) {
  await seek(t);
  const h = (await calc()).heap;
  check(`Part IV: Mal'cev at τ = ${t}`, nearV(h.xyz, t === 0 ? h.z : h.x, 1e-9));
}
{
  const h = (await calc()).heap,
    g = su2(1.234, unit([0.3, -0.5, 0.8])),
    [x, y, z] = [h.x, h.y, h.z].map(fromQ);
  const left = mmul(mmul(mmul(g, x), dagger(mmul(g, y))), mmul(g, z));
  check('Part IV: [gx, gy, gz] = g[x, y, z] for the page bracket', mgap(left, mmul(g, fromQ(h.xyz))) < 1e-12);
}

/* ---------- controls ---------- */
await pick(DEFAULT);
for (const v of [0, 30, 90, 106.26, 180, 270, 359.99, 360]) {
  await input('#thetaBDeg', v);
  const s = await state();
  check('θ_B slider ' + v, near(s.thetaBDeg, v === 106.26 ? MRP_HALF : v, 1e-10) && !s.playing && s.preset === null);
  verifyMath(await calc(), 'θ_B=' + v);
}
for (const v of [0, 45, 135, 300]) {
  await input('#thetaADeg', v);
  check('θ_A slider ' + v, near((await state()).thetaADeg, v, 1e-10));
  verifyMath(await calc(), 'θ_A=' + v);
}
for (const v of [0, 1, 60, 120, 180]) {
  await input('#axisAngleDeg', v);
  const mm = await calc();
  check('χ slider ' + v, (await state()).chiDeg === v);
  verifyMath(mm, 'χ=' + v);
  verifyInstances(mm, 'χ=' + v);
}
await input('#axisAngleDeg', 90);
await input('#thetaADeg', 90);
await input('#thetaBDeg', 90);
check('collinear axes make the flat sum exact', await (async () => {
  await input('#axisAngleDeg', 0);
  const mm = await calc();
  await input('#axisAngleDeg', 90);
  return near(mm.gap, 0, 1e-9) && near(mm.thetaC[2], 0, 1e-12) && mm.leanInstances.twoAxis.hypothesis === false;
})());
// antipodal edges reachable by the sliders: (180°, 360°, 90°) puts P₂ at −P₁, (180°, 180°, 0°) puts P₃ at −P₁
await pick('hamilton-spherical-turns');
for (const [a, b, chi] of [[180, 360, 90], [180, 180, 0]]) {
  await input('#thetaADeg', a);
  await input('#thetaBDeg', b);
  await input('#axisAngleDeg', chi);
  const bad = [];
  for (const t of [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]) {
    await seek(t);
    const mm = await calc(),
      qn = Math.hypot(...mm.cursor.q),
      rowsOk = mm.strip.rows.every(([, stay, phase]) => Number.isFinite(stay) && Math.abs(stay) <= 1 + 1e-12 && (phase === null || Number.isFinite(phase)));
    if (!near(qn, 1, 1e-12) || !rowsOk) bad.push(`τ = ${t}: ‖q‖ = ${qn}`);
  }
  check(`antipodal edge (θ_A, θ_B, χ) = (${a}, ${b}, ${chi}): the cursor quaternion stays unit and the strip stays in [−1, 1]`, !bad.length, bad.slice(0, 3).join('; '));
  const mm = await calc();
  check(`antipodal edge (${a}, ${b}, ${chi}): S + iD vanishes and the return phase is undefined`, Math.hypot(mm.S, mm.D) < 1e-15 && mm.holonomy === null && mm.omega === null);
}
// a near-antipodal loop that is not antipodal: P₃ sits π − 6.09e-6 from P₁, so the shortest arc P₃ → P₁ is unique and
// |S + iD| ≈ 2.13e-9 is small but nonzero; the page walks that arc and reports the return phase (S − iD)/|S + iD|
{
  await input('#thetaADeg', 0.04);
  await input('#thetaBDeg', 359.96);
  await input('#axisAngleDeg', 1);
  const s = await state();
  const bad = [];
  let mm;
  for (const t of [0.55, 0.6, 0.75, 0.9, 0.99]) {
    await seek(t);
    mm = await calc();
    const want = loopPoint(mm.triangle, mm.tau);
    // sin(arc) ≈ 6.09e-6 amplifies rounding to ~4e-11 off the unit sphere: well inside 1e-9, and nowhere near the fallback
    if (mm.cursor.edge !== 2 || want.k !== 2 || !nearV(mm.cursor.base, want.b, 1e-9) || !near(norm(mm.cursor.base), 1, 1e-9)) bad.push(`τ = ${t}: ${JSON.stringify(mm.cursor.base)} vs ${JSON.stringify(want.b)}`);
    verifyMath(mm, `near-antipodal τ=${t}`);
  }
  const [P1, P2, P3] = mm.triangle,
    S = 1 + dot(P1, P2) + dot(P2, P3) + dot(P3, P1),
    D = dot(P1, cross(P2, P3)),
    h = Math.hypot(S, D);
  check('near-antipodal (0.04°, 359.96°, 1°): the sliders hold the pair', near(s.thetaADeg, 0.04, 1e-12) && near(s.thetaBDeg, 359.96, 1e-12) && s.chiDeg === 1);
  check('near-antipodal (0.04°, 359.96°, 1°): P₃ is 6.09e-6 short of −P₁, the cursor walks the unique shortest arc P₃ → P₁',
    near(Math.PI - arcLen(P3, P1), 6.092e-6, 2e-9) && !bad.length, bad.slice(0, 3).join('; '));
  check('near-antipodal (0.04°, 359.96°, 1°): |S + iD| ≈ 2.13e-9 and the return phase (S − iD)/|S + iD| is defined',
    near(h, 2.1266e-9, 1e-12) && !!mm.holonomy && near(mm.holonomy.re, S / h, 1e-6) && near(mm.holonomy.im, -D / h, 1e-6) &&
      near(Math.hypot(mm.holonomy.re, mm.holonomy.im), 1, 1e-12) && mm.omega !== null && near(mm.omega, 2 * Math.atan2(D, S), 1e-6) &&
      !/undefined/.test(await textOf('roTri')),
    JSON.stringify([S, D, mm.holonomy, mm.omega]));
}
await pick(DEFAULT);
await seek(0.25);
const early = await state();
await seek(0.8);
const late = await state();
check('the rail walks the path and leaves the sliders alone', near(early.t, 0.25) && near(late.t, 0.8) && early.thetaBDeg === late.thetaBDeg && early.preset === late.preset);
verifyMath(await calc(), 'τ=0.8');
const beforeLens = await state(),
  title = await textOf('hudBig');
await page.click('#lensToggleBtn');
await settle(page);
const lensed = await state();
check(
  'changing the lens keeps the experiment and draws the coordinate axes',
  lensed.lens === 1 && (await textOf('hudBig')) !== title && ['thetaADeg', 'thetaBDeg', 'chiDeg', 'preset', 't', 'scene'].every((k) => lensed[k] === beforeLens[k]) &&
    (await page.locator('.stage .tags .tag:not([hidden])').allTextContents()).some((t) => t.trim() === 'k')
);
await layout(page, 'geometric lens');
await page.click('#lensToggleBtn');
await settle(page);
check('the origin-free lens draws no coordinate axes', (await state()).lens === 0 && !(await page.locator('.stage .tags .tag:not([hidden])').allTextContents()).some((t) => t.trim() === 'k'));
const views = [];
for (const name of CAM_NAMES) {
  await page.click('[data-cam="' + name + '"]');
  await settle(page);
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, 'view ' + name);
}
check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch, c.zoom].join('/'))).size === 3);

/* ---------- the amber handle ---------- */
async function drag(target, label) {
  await page.locator('#stage').scrollIntoViewIfNeeded();
  await settle(page);
  const here = await state(),
    box = await page.locator('#ternionHandle').boundingBox(),
    start = await page.evaluate(() => TERNION_NONLINEAR_DEBUG.dragTarget({}));
  const end = await page.evaluate((t) => TERNION_NONLINEAR_DEBUG.dragTarget(t), target);
  check(label + ': the handle sits on its anchor', !!box && Math.hypot(box.x + box.width / 2 - start.x, box.y + box.height / 2 - start.y) < 1.5);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 12 });
  await page.mouse.up();
  await settle(page);
  const after = await state();
  check(
    label + ': dragging sets the pair and leaves the camera fixed',
    Object.entries(target).every(([k, v]) => Math.abs(after[k] - v) < 1.2) && same(after.camera, here.camera) && !after.playing && after.preset === null,
    JSON.stringify([after.thetaADeg, after.thetaBDeg, after.chiDeg])
  );
  return after;
}
await pick(DEFAULT);
let dragged = await drag({ thetaBDeg: 120, chiDeg: 60 }, 'ball card');
verifyMath(await calc(), 'after the ball drag');
await page.locator('#ternionHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check('arrow keys on the handle change θ_B without moving the rail', (await state()).thetaBDeg > dragged.thetaBDeg && (await state()).t === dragged.t);
await page.keyboard.press('ArrowUp');
await settle(page);
check('up and down on the handle change χ', (await state()).chiDeg > dragged.chiDeg);
await pick('hamilton-spherical-turns');
dragged = await drag({ thetaADeg: 140, chiDeg: 70 }, 'sphere card');
verifyMath(await calc(), 'after the sphere drag');
await page.locator('#ternionHandle').focus();
await page.keyboard.press('ArrowLeft');
await settle(page);
check('arrow keys on the sphere handle change θ_A', (await state()).thetaADeg < dragged.thetaADeg);

/* ---------- playing, colours, marks and the lit shell ---------- */
for (const id of IDS)
  check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.TERNION_NONLINEAR_DEBUG.state));
await pick(DEFAULT);
/** Record the colour of every primitive of the next frame (the page calls sc.<primitive> by name at draw time). */
const colours = await page.evaluate(async () => {
  const sc = window.TRV.solids[0],
    seen = [],
    names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
    saved = {};
  for (const n of names) {
    saved[n] = sc[n];
    sc[n] = (...a) => {
      const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'bead' || n === 'ring' || n === 'fan' ? a[1] : n === 'arrow' ? a[2] : a[2];
      const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
      const s = style || {};
      seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
      return saved[n](...a);
    };
  }
  window.TRV.kit.flush();
  for (const n of names) sc[n] = saved[n];
  const P = window.TRV.palette;
  return { seen, amber: P.amber, ok: P.ok, warn: P.warn, violet: P.violet };
});
check(
  'semantic stage colours: amber only on the cursor, never green or red; the shell is violet',
  colours.seen.filter((x) => x.colors.includes(colours.amber)).every((x) => CURSOR.test(x.key)) &&
    colours.seen.some((x) => x.colors.includes(colours.amber)) &&
    colours.seen.every((x) => !x.colors.includes(colours.ok) && !x.colors.includes(colours.warn)) &&
    colours.seen.some((x) => x.key === 'shell' && x.colors.includes(colours.violet))
);
const marks = await page.evaluate(() => TRV.solids[0].marks().map((x) => [x.key, x.hidden]));
const markOf = (k) => (marks.find((x) => x[0] === k) || [k, null])[1];
check('the shell hides the rear seam bead and leaves the front one visible', markOf('seamBack') === true && markOf('seamFront') === false, JSON.stringify(marks));
const lit = await solidPixels(page);
check('the opaque shell covers ≥ 14% of the stage with σ ≥ 0.055', lit.share >= 0.14 && lit.spread >= 0.055, `${(lit.share * 100).toFixed(1)}% σ ${lit.spread.toFixed(3)}`);
{
  const initial = await page.evaluate(() => ({ ...TRV.solids[0].cam }));
  const b = await page.evaluate(() => { const r = TRV.solids[0].el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
  const x0 = b[0] + b[2] * 0.08,
    y0 = b[1] + b[3] * 0.65;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  for (let k = 1; k <= 6; k++) await page.mouse.move(x0, y0 - b[3] * 0.05 * k);
  await page.mouse.up();
  await settle(page);
  const turned = await solidPixels(page);
  const dist = turned.hist.reduce((s, h, k) => s + Math.abs(h - lit.hist[k]), 0) / 2;
  check('orbiting across 8%–65% of the stage moves the light and shade (distance ≥ 0.08)', dist >= 0.08, dist.toFixed(3));
  await page.evaluate((cam) => { Object.assign(TRV.solids[0].cam, cam); TRV.kit.flush(); }, initial);
}
const prism = await page.evaluate(() => {
  const plot = TRV.kit.plot,
    traces = [];
  TRV.kit.plot = (...args) => {
    const graph = plot(...args);
    for (const method of ['line', 'vline', 'hline']) {
      const original = graph[method];
      graph[method] = (...params) => {
        traces.push([method, ...params]);
        return original(...params);
      };
    }
    return graph;
  };
  try {
    TRV.kit.flush();
  } finally {
    TRV.kit.plot = plot;
  }
  const { cyan, magenta, amber } = TRV.palette;
  return { traces, cyan, magenta, amber, tau: window.TERNION_NONLINEAR_DEBUG.state.t };
});
const cyanLine = prism.traces.find(([k, , c]) => k === 'line' && c === prism.cyan),
  magentaLine = prism.traces.find(([k, , c]) => k === 'line' && c === prism.magenta),
  cursors = prism.traces.filter(([k, , c]) => k === 'vline' && c === prism.amber);
check(
  'the strip draws the conserved quantity in cyan, the drifting one in magenta and an amber cursor at τ',
  !!cyanLine && !!magentaLine && cyanLine[1].length === 161 && cursors.length === 1 && near(cursors[0][1], prism.tau, 1e-12) &&
    cyanLine[1].every(([, y]) => near(y, 1, 1e-12))
);
const domBad = await page.evaluate(() => {
  const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
  const banned = [col('--amber'), col('--ok'), col('--warn')],
    bad = [];
  for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
    // the handle is the current choice, and the legend's amber key names the amber cursor
    if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue;
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
  }
  const amber = col('--amber');
  for (const el of [document.querySelector('#evidence'), ...document.querySelectorAll('#evidence *')]) {
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (cs[prop] === amber) bad.push(`#evidence ${el.className || el.tagName} ${prop}`);
  }
  return bad;
});
check('no amber, green or red text or fill on the stage, strip, readouts and evidence', !domBad.length, domBad.slice(0, 3).join(' | '));

/* ---------- phone, cited frames and stills ---------- */
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    for (let j = 0; j < IDS.length; j++) {
      const id = (await state(p)).preset;
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (figure) check('cited frame hides the strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
      await p.locator(figure ? '[data-tour="next"]' : '[data-preset="' + IDS[(j + 1) % IDS.length] + '"]').click();
      await settle(p);
    }
    await p.context().close();
  }
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const s = await state(p);
    await verifyCard(p, id);
    check('still ' + lang + '/' + id, !s.playing && near(s.t, CARDS[id].still, 1e-12) && (await p.locator('#ternionHandle').isHidden()));
    await p.context().close();
  }
}
check(
  'permanent dark console in both system schemes',
  !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark)
);
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
