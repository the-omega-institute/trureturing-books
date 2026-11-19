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
const ID = 'ternion-least-action-geodesic-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY =
  'ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.html#sec-ch39-least-action-geodesics-and-cosmos-ai-isomorphism';
const OPEN_PROBLEM = 'ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.html#prob-ch39-tft-scale-and-seams';
const SECTION = '37.2';
const CARDS = {
  'sagitta-mrp-surprisal-lock': { scene: 'step', stepDeg: 120 },
  'heap-autoparallel-point-reflection': { scene: 'heap', stepDeg: 30 },
  'uniform-cadence-vs-jump-hallucination': { scene: 'cadence', spanDeg: 120, beats: 4 },
  'lateral-detour-vs-chord-collapse': { scene: 'detour' },
  'jacobi-focusing-conformal-gradient': { scene: 'focus', sigmaW: 0.8 }
};
const DEFAULT = 'uniform-cadence-vs-jump-hallucination';
const SCENES = ['step', 'heap', 'cadence', 'detour', 'focus'];
const CURSOR = /cursor|handle/i;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4).replace('-', '−');

/* ---------- independent mathematics, written here and never calling the page ---------- */
const DEG = Math.PI / 180;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const scale = (a, k) => a.map((x) => x * k);
const unit = (a) => scale(a, 1 / norm(a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const mat = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (M) => M[0][0] + M[1][1] + M[2][2];
const T3 = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const apply = (M, v) => M.map((row) => dot(row, v));
/** The rotation of a modified Rodrigues vector σ: angle 4 arctan‖σ‖ about σ/‖σ‖ (Rodrigues' formula with matrices). */
function rotation(s) {
  const n = norm(s);
  if (n < 1e-15) return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const th = 4 * Math.atan(n),
    [x, y, z] = scale(s, 1 / n);
  const K = [[0, -z, y], [z, 0, -x], [-y, x, 0]],
    K2 = mat(K, K);
  return [0, 1, 2].map((i) => [0, 1, 2].map((j) => (i === j ? 1 : 0) + Math.sin(th) * K[i][j] + (1 - Math.cos(th)) * K2[i][j]));
}
/** Chapter coordinates (c₁, c₂, c₃) → world (c₂, c₃, c₁); the probe n̂₀ = e₃. */
const world = (c) => [c[1], c[2], c[0]];
const probeOf = (s) => world(apply(rotation(s), [0, 0, 1]));
/** The beats of a path of rotors: cos Δθ from the trace of the relative rotation. */
function beats(path) {
  const out = [];
  for (let t = 1; t < path.length; t++) {
    const rel = mat(T3(rotation(path[t - 1])), rotation(path[t]));
    const c = Math.max(-1, Math.min(1, (tr(rel) - 1) / 2));
    out.push({ c, v: 1 - c, stay: (1 + c) / 2, dTheta: Math.acos(c) });
  }
  return out;
}
function audit(path) {
  const b = beats(path);
  const stay = b.reduce((p, x) => p * x.stay, 1);
  return { S: b.reduce((s, x) => s + x.v, 0), stay, I: stay < 1e-12 ? Infinity : -Math.log(stay), beats: b };
}
/** The page reports a divergent surprisal as null (JSON has no ∞). */
const sameI = (got, want) => (Number.isFinite(want) ? near(got, want, 1e-9) : got == null);
const e1 = (angle) => [Math.tan(angle / 4), 0, 0];
const EVEN = [0, 1, 2, 3, 4].map((k) => e1(k * 30 * DEG));
const JUMP = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], e1(120 * DEG)];
const DETOUR = (sg) => [[0, 0, 0], [1 / 6, sg / 6, 0], [1 / 3, sg / 4, 0], [1 / 2, sg / 6, 0], [1 / Math.sqrt(3), 0, 0]];
/** Signed area of a spherical polygon from the turning angles of its great-circle sides (Gauss–Bonnet). */
function polygonArea(vs) {
  let turn = 0;
  const n = vs.length;
  for (let i = 0; i < n; i++) {
    const u = vs[(i + n - 1) % n],
      v = vs[i],
      w = vs[(i + 1) % n];
    const tin = scale(unit(sub(u, scale(v, dot(u, v)))), -1),
      tout = unit(sub(w, scale(v, dot(w, v))));
    turn += Math.atan2(dot(cross(tin, tout), v), dot(tin, tout));
  }
  const A = 2 * Math.PI - turn;
  return A > 2 * Math.PI ? A - 4 * Math.PI : A;
}
// The chapter's audit in the §37.2 example (Θ = 120°, N = 4), to the printed eight decimals.
const EXAMPLE = {
  geo: { S: 0.53589838, stay: 0.75779236, I: 0.27734586 },
  jump: { S: 1.5, stay: 0.25, I: 1.38629436 },
  detour: { S: 0.953168, stay: 0.59837452, I: 0.51353844 },
  ratios: [2.79903811, 4.99843184],
  chord: 0.75,
  factor: 0.6724,
  metric: 1.48720999
};
// The page's model of the focusing scene: two neighbours with initial deviation J₀ and rate J̇₀ (MODEL constants).
const J0 = 0.16,
  JD = 0.16;

const T = await session();
const { page, check } = T;
// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo =
  /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watched = new WeakSet();
function watchPage(p) {
  if (watched.has(p)) return;
  watched.add(p);
  p.on('console', (m) => {
    if ((m.type() === 'info' || m.type() === 'warning') && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__geodesicPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records)
        window
          .__geodesicPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') })
          .catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__geodesicPaletteAudit({
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

// the shared gate, with the stricter lit-solid thresholds of this page (opaque share ≥ 14 %, spread ≥ 0.055)
await stageFirstChecks(T, BOOK, ID, { solid: { minShare: 0.14, minSpread: 0.055 } });

/* ---------- sources, registry and lock ---------- */
const sources = Object.fromEntries(
  ['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')])
);
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || {};
const entryText = JSON.stringify(entry);
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8'));
const GIDS = [
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently'
];
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
  check(
    `source ${file}: no literal colour and no palette switch`,
    !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src)
  );
  check(
    `source ${file}: no model, vendor or tool identifiers`,
    !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src)
  );
}
check(
  'source main.js: the read-only probe exposes state, calc and presets',
  /window\.TERNION_GEODESIC_DEBUG\s*=/.test(sources['main.js']) && /get state\(\)/.test(sources['main.js']) && /calc\(/.test(sources['main.js']) && /presets:/.test(sources['main.js'])
);
check(
  'reserved identifiers are absent from the suite and registry entry',
  [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src))
);
check(
  'registration matches the section, all five cards and all ten GIDs',
  entry.chapter === 37 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-19' &&
    entry.code === 'TERNION//GEODESIC' &&
    same(entry.presets, Object.keys(CARDS)) &&
    same(Object.keys(entry.preset_titles || {}), Object.keys(CARDS)) &&
    same((entry.lean || []).map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'the suite declares its dependencies, including the chapters it links to',
  Array.isArray(deps.suites[ID + '.test.mjs']) &&
    ['@citations', '@registry-entry', '@lean-links'].every((d) => deps.suites[ID + '.test.mjs'].includes(d)) &&
    ['zh', 'en'].every((l) =>
      ['ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md', 'ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md'].every((f) =>
        deps.suites[ID + '.test.mjs'].includes(`books/${BOOK}/${l}/${f}`)
      )
    )
);

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.TERNION_GEODESIC_DEBUG.state);
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
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, t);
  await settle(p);
}
/** Pick a card, wait for its blend, pause, and put the rail at its end (every card's still is the end). */
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await until(p, (id) => { const s = window.TERNION_GEODESIC_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
  await p.locator('#now').evaluate((el) => { el.value = '1'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await settle(p);
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues.slice(0, 4)));
}

/* ---------- the independent check of everything a state claims ---------- */
function verifyLedger(m, label) {
  // the probes of the drawn path
  check(label + ' probes R(σₜ)n̂₀ of the path', m.path.every((s, k) => norm(sub(probeOf(s), m.probes[k])) < 1e-12));
  const all = audit(m.path),
    partial = audit(m.path.slice(0, m.count + 1));
  check(
    label + ' total sagitta, stay and surprisal of the whole path from traces of relative rotations',
    near(m.total.S, all.S, 1e-12) && near(m.total.stay, all.stay, 1e-12) && sameI(m.total.I, all.I)
  );
  check(
    label + ' the ledger up to the rail counts the beats taken',
    near(m.ledger.S, partial.S, 1e-12) && near(m.ledger.stay, partial.stay, 1e-12) && sameI(m.ledger.I, partial.I) && m.ledger.beats.length === m.count
  );
  // one beat: 1 − cos Δθ = 2q_MRP(δ) = 2P_leak and ‖δ‖ = tan(Δθ/4); I = −ln(1 − v/2)
  for (const [k, b] of m.ledger.beats.entries()) {
    const want = partial.beats[k];
    check(
      `${label} beat ${k + 1}: 1 − cos Δθ = 2q_MRP = 2P_leak, ‖δ‖ = tan(Δθ/4), I = −ln(1 − v/2)`,
      near(b.v, want.v, 1e-12) && near(b.q2, want.v, 1e-12) && near(b.leak2, want.v, 1e-12) &&
        near(b.nd, Math.tan(want.dTheta / 4), 1e-9) && near(b.dTheta, want.dTheta, 1e-7) &&
        (want.stay >= 1e-12 ? near(b.I, -Math.log(1 - want.v / 2), 1e-9) : b.I == null)
    );
  }
  // the flat chord of the two ends: |m|² = (1 + cos(Θ/2))/2 with Θ the angle of the end rotation
  const end = rotation(m.path[m.path.length - 1]),
    cEnd = Math.max(-1, Math.min(1, (tr(end) - 1) / 2));
  check(label + ' flat chord midpoint |m|² = (1 + cos(Θ/2))/2', near(m.chord.norm2, (1 + Math.cos(Math.acos(cEnd) / 2)) / 2, 1e-12));
  // the conformal gradient factor and metric
  const s2 = m.sigmaW ** 2;
  check(label + ' conformal factor ¼(1 + ‖σ‖²)² and metric 4/(1 + ‖σ‖²)²', near(m.grad.factor, (1 + s2) ** 2 / 4, 1e-12) && near(m.grad.metric, 4 / (1 + s2) ** 2, 1e-12));
}
function verifyTriangle(m, label) {
  if (!m.triangle) return check(label + ' a one-beat path has no probe triangle', m.path.length === 2);
  const k = m.triangle.at,
    [a, b, c] = [m.probes[k - 1], m.probes[k], m.probes[k + 1]];
  const S = 1 + dot(a, b) + dot(b, c) + dot(c, a),
    D = dot(a, cross(b, c));
  const rhs = 2 * (1 + dot(a, b)) * (1 + dot(b, c)) * (1 + dot(c, a));
  check(label + ' probe triangle S, D and S² + D² = 2(1 + a·b)(1 + b·c)(1 + c·a)', near(m.triangle.S, S, 1e-12) && near(m.triangle.D, D, 1e-11) && near(S * S + D * D, rhs, 1e-11));
  if (m.triangle.anti) return;
  // coaxial even beats: D = 0, S = 2c(1 + c); below 90° per beat Ω = 0, above it Ω = 2π (the third side wraps)
  const area = polygonArea([a, b, c]);
  const coaxial = Math.abs(D) < 1e-9;
  if (coaxial)
    check(
      label + ' coaxial triangle: Ω = 0 with phase +1 below 90° per beat, Ω = 2π with phase −1 above',
      S > 0 ? near(m.triangle.omega, 0, 1e-12) : near(Math.abs(m.triangle.omega), 2 * Math.PI, 1e-9)
    );
  else check(label + ' probe triangle excess agrees with the turning angles', near(m.triangle.omega, area, 1e-9));
}
function verifyInstances(m, label) {
  const I = m.leanInstances;
  const all = audit(m.path);
  // Fubini–Study: neighbouring Choi states have fsAngle Δθ/2; the sum bounds the angle of the ends
  const ends = Math.acos(Math.max(-1, Math.min(1, (tr(rotation(m.path[m.path.length - 1])) - 1) / 2))) / 2;
  check(
    label + ' Fubini–Study triangle along the beats (fsAngle = Δθ/2)',
    I.fs.beats.every((x, k) => near(x, all.beats[k].dTheta / 2, 1e-7)) && near(I.fs.ends, ends, 1e-7) && I.fs.sum >= I.fs.ends - 1e-12
  );
  check(
    label + ' orthogonal records at 180° and the half-way state at fsAngle π/4 from both',
    I.recordTime.orth < 1e-12 && near(I.recordTime.fs0, Math.PI / 4, 1e-12) && near(I.recordTime.fs1, Math.PI / 4, 1e-12)
  );
  // Born weight and Schur minimum of the latest beat
  const latest = all.beats[Math.max(1, m.count) - 1];
  check(label + ' rank-one Born weight Tr(ρP) = |⟨Ψₜ₋₁|Ψₜ⟩|² = cos²(Δθ/2)', near(I.born.weight, latest.stay, 1e-9) && near(I.born.trace, latest.stay, 1e-9) && near(I.born.leak, 1 - latest.stay, 1e-9));
  check(
    label + ' Schur: the scanned least value of ‖Ψₜ + yΨₜ₋₁‖² is 1 − b² = P_leak at y = −b',
    near(I.schur.b ** 2, latest.stay, 1e-9) && near(I.schur.complement, 1 - latest.stay, 1e-9) && I.schur.least >= I.schur.complement - 1e-12 &&
      I.schur.least - I.schur.complement < 3e-7 && Math.abs(I.schur.arg + I.schur.b) <= 0.00026
  );
  check(label + ' shortest rotors are unitary and carry a·σ to b·σ', I.rotors.unitary < 1e-12 && I.rotors.carry < 1e-12);
  if (I.holonomy) check(label + ' three shortest rotors compose to (SI − iD a·σ)/√(S² + D²)', I.holonomy.gap < 1e-12 && I.holonomy.identity < 1e-9);
  if (I.lagrange) {
    const { u, v } = I.lagrange,
      gram = dot(u, u) * dot(v, v) - dot(u, v) ** 2;
    check(label + ' Lagrange–Gram: both sides equal |ωₜ × ωₜ₊₁|²', near(I.lagrange.lhs, gram, 1e-12) && near(I.lagrange.rhs, norm(cross(u, v)) ** 2, 1e-12) && near(I.lagrange.lhs, I.lagrange.rhs, 1e-12));
  }
  check(label + ' the eigenstate of û·σ is stationary under exp(−itH)', I.stationary.unitary < 1e-12 && I.stationary.drift < 1e-12);
  const flatBeat = Math.abs(Math.sin(m.perBeat)) < 1e-12;
  check(label + ' observable Krylov dimensions 1, 2, 2, … (1, 1, … at 0° or 180°)', same(I.krylov, flatBeat ? [1, 1, 1, 1, 1, 1] : [1, 2, 2, 2, 2, 2]));
  const s2 = m.sigmaW ** 2;
  check(
    label + ' Choi Fisher metric 16/(1 + ‖σ‖²)² = 4g and ¼‖J_Rᵀ∇L‖² = ¼(1 + ‖σ‖²)²‖∇L‖²',
    I.conformal.fisherGap < 1e-5 && near(I.conformal.pullback, (1 + s2) ** 2 / 4, 1e-6) && near(I.conformal.riemann, (1 + s2) ** 2 / 4, 1e-12)
  );
}
function verifyCard(m, id, label = id) {
  const c = CARDS[id];
  check(label + ' scene and parameters of the card', m.preset === id && m.scene === c.scene && ['stepDeg', 'spanDeg', 'beats', 'sigmaW'].every((k) => c[k] == null || near(m[k], c[k], 1e-12)));
  verifyLedger(m, label);
  verifyTriangle(m, label);
  verifyInstances(m, label);
  const E = EXAMPLE;
  const at8 = (x, y) => near(x, y, 5e-9);
  if (id === 'sagitta-mrp-surprisal-lock')
    check(label + ' one beat of 120°: v = 2q = 2P_leak = 1.5, ‖δ‖ = 1/√3, I = ln 4', near(m.latest.v, 1.5, 1e-12) && near(m.latest.nd, 1 / Math.sqrt(3), 1e-12) && near(m.latest.I, Math.log(4), 1e-12));
  if (id === 'heap-autoparallel-point-reflection') {
    const relay = [[0, 0, 0], e1(30 * DEG)];
    for (let t = 1; t < 4; t++) {
      const R = mat(mat(rotation(relay[t]), T3(rotation(relay[t - 1]))), rotation(relay[t]));
      const ang = Math.acos(Math.max(-1, Math.min(1, (tr(R) - 1) / 2)));
      relay.push(e1(ang)); // R lies on the e₁ axis: point reflection in SO(3)
    }
    check(label + ' the relay σₜ₊₁ = [σₜ, σₜ₋₁, σₜ] is the even geodesic of 30° beats', m.path.every((s, k) => norm(sub(s, EVEN[k])) < 1e-12 && norm(sub(s, relay[k])) < 1e-12));
    check(label + ' the even relay pays the audit of trajectory A', at8(m.total.S, E.geo.S) && at8(m.total.stay, E.geo.stay) && at8(m.total.I, E.geo.I));
  }
  if (id === 'uniform-cadence-vs-jump-hallucination') {
    check(
      label + ' §37.2 example: trajectories A and B to eight decimals',
      at8(m.total.S, E.geo.S) && at8(m.total.stay, E.geo.stay) && at8(m.total.I, E.geo.I) &&
        at8(m.otherTotal.S, E.jump.S) && at8(m.otherTotal.stay, E.jump.stay) && at8(m.otherTotal.I, E.jump.I) &&
        at8(m.otherTotal.S / m.total.S, E.ratios[0]) && at8(m.otherTotal.I / m.total.I, E.ratios[1])
    );
    check(label + ' the jump path idles three beats and crosses 120° in the last', same(m.other.map((s) => s.map((x) => +x.toFixed(12))), JUMP.map((s) => s.map((x) => +x.toFixed(12)))));
  }
  if (id === 'lateral-detour-vs-chord-collapse') {
    check(label + ' §37.2 example: trajectory C to eight decimals, chord 0.75', at8(m.total.S, E.detour.S) && at8(m.total.stay, E.detour.stay) && at8(m.total.I, E.detour.I) && near(m.chord.norm2, E.chord, 1e-12));
    check(label + ' the detour nodes are the text’s σ₁⁺, σ₂⁺, σ₃⁺ and their mirror images', m.path.every((s, k) => norm(sub(s, DETOUR(1)[k])) < 1e-12) && m.mirror.every((s, k) => norm(sub(s, DETOUR(-1)[k])) < 1e-12));
    const A = EVEN.map(probeOf);
    const loop = (sg) => { const C = DETOUR(sg).map(probeOf); return polygonArea([...C, ...A.slice(1, -1).reverse()]); };
    const plus = loop(1),
      minus = loop(-1);
    check(
      label + ' mirror loops enclose opposite excess ±Ω (turning angles) and the mean phase is real, cos(Ω/2)',
      near(m.loop.plus.omega, plus, 1e-9) && near(m.loop.minus.omega, minus, 1e-9) && near(plus, -minus, 1e-12) && Math.abs(plus) > 0.5 &&
        near(m.loop.average[1], 0, 1e-12) && near(m.loop.average[0], Math.cos(plus / 2), 1e-12)
    );
    const t = m.leanInstances.lagrange;
    check(label + ' the detour beats carry a sideways torque ωₜ × ωₜ₊₁ ≠ 0', t.lhs > 1e-4);
  }
  if (id === 'jacobi-focusing-conformal-gradient') {
    const s = m.jacobi.s;
    check(label + ' factor 0.6724 and metric 1.48720999 at ‖σ_W‖ = 0.8', near(m.grad.factor, E.factor, 1e-12) && near(m.grad.metric, E.metric, 5e-9));
    check(
      label + ' Jacobi: J = J₀ cos s + J̇₀ sin s on the sphere (and the exact great-circle latitude), J₀ + J̇₀s in flat space',
      near(m.jacobi.sphere, J0 * Math.cos(s) + JD * Math.sin(s), 1e-12) &&
        near(m.jacobi.exact, Math.asin(Math.sin(J0) * Math.cos(s) + JD * Math.cos(J0) * Math.sin(s)), 1e-12) && near(m.jacobi.flat, J0 + JD * s, 1e-12) &&
        Math.abs(m.jacobi.exact - m.jacobi.sphere) < 0.02
    );
  }
}

/* ---------- the page as it opens ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('the cadence card opens by default', (await state()).preset === DEFAULT);
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #sceneChips') &&
      !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig') &&
      !!q('#stage > button.handle#geoHandle') && !!q('main.center > .strip #plot') && !q('#stage .strip') &&
      !!q('aside.col.side > #readouts') && q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' &&
      ['§37.2', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      ['.lean.argued', '.lean.model', '.lean.num', '.lean.open'].every((s) => !!q('#evidence ' + s)) &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelector('ol li b') && el.querySelector('p.lede.refs a'))
    );
  })
);
check(
  'the probe offers presets and pure calculations',
  await page.evaluate(() => {
    const d = window.TERNION_GEODESIC_DEBUG;
    const c = d.calc({ scene: 'cadence', spanDeg: 120, beats: 4, tau: 1 });
    return Object.keys(d.presets).length === 5 && Math.abs(c.total.S - 4 * (1 - Math.sqrt(3) / 2)) < 1e-12 && d.state.scene === 'cadence';
  })
);
check(
  'a card click starts a blend instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="heap-autoparallel-point-reflection"]').click();
    const s = window.TERNION_GEODESIC_DEBUG.state;
    return s.blending && s.stepDeg > 30;
  })
);
await settle(page);
await until(page, () => !window.TERNION_GEODESIC_DEBUG.state.blending);
check('the blend ends on the card', near((await state()).stepDeg, 30) && !(await state()).blending);

/* ---------- every card, in both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page
    .locator('#drawer .refs a, #evidence .lean.open a')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory and open-problem links', [THEORY, OPEN_PROBLEM].every((x) => links.includes('../../' + lang + '/' + x)));
  check(lang + ' cited declarations, one green box each', same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const badge = async (selector) => (await page.locator('#evidence ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const numeric = await badge('.lean.num'),
    model = await badge('.lean.model'),
    argued = await badge('.lean.argued');
  check(
    lang + ' the NUM box prints the eight-decimal audit of the §37.2 example',
    ['0.53589838', '1.50000000', '0.95316800', '0.75779236', '0.25000000', '0.59837452', '0.27734586', '1.38629436', '0.51353844', '2.79903811', '4.99843184', '0.6724', '1.48720999'].every((x) => numeric.includes(x))
  );
  check(lang + ' the MODEL box names the lens, the bar scale and the plate', model.includes('0.5×(1−cosΔθ)') && /const BAR = 0\.5;/.test(sources['main.js']) && (lang === 'zh' ? /透镜/.test(model) : /lens/.test(model)));
  check(lang + ' hand derivations are ARGUED, not green', argued.includes('q') && (lang === 'zh' ? /手工推导/.test(argued) : /Handderivations/.test(argued)));
  for (const id of Object.keys(CARDS)) {
    await pick(id);
    const m = await state();
    verifyCard(m, id, `${lang}/${id}`);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(
      `${lang}/${id} one key and six readouts, all populated`,
      readings.length === 7 && (await page.locator('#readouts dl.ro > div').count()) === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 &&
        readings.every((t) => t && !/NaN|undefined|^—$/.test(t))
    );
    check(
      `${lang}/${id} HUD title, key pill and key readout show the sagitta`,
      (await textOf('roKey')).includes(f4(m.ledger.S).replace('−', '-')) && (await textOf('keyPill')).includes(f4(m.ledger.S)) && (await textOf('hudSub')).trim().length > 0
    );
    check(`${lang}/${id} the lock readout prints three equal rulers`, (await textOf('roLock')).split(' · ')[0].split(' = ').every((x) => x.trim() === f4(m.latest.v).replace('−', '-')));
    check(`${lang}/${id} only the fields of the scene are shown`, await page.evaluate((scene) => [...document.querySelectorAll('#ctlPanel .field[data-for]')].every((el) => el.hidden === !el.dataset.for.split(' ').includes(scene)), m.scene));
  }
}

/* ---------- controls ---------- */
await pick('sagitta-mrp-surprisal-lock');
for (const d of [0, 1, 30, 60, 90, 120, 150, 179, 180]) {
  await input('#stepDeg', d);
  const m = await state();
  check('beat slider ' + d, near(m.stepDeg, d) && !m.playing && m.preset === null && m.scene === 'step');
  verifyLedger(m, 'Δθ=' + d);
  verifyInstances(m, 'Δθ=' + d);
  if (d === 180) check('at 180° the rational coordinate reaches ‖δ‖ = 1 and the surprisal diverges', near(m.latest.nd, 1, 1e-12) && m.latest.I == null && (await textOf('roSurprisal')).includes('∞'));
}
await page.click('[data-scene="heap"]');
await settle(page);
for (const d of [10, 30, 60, 89, 91, 120, 150]) {
  await input('#stepDeg', d);
  const m = await state();
  check('relay slider ' + d, m.scene === 'heap' && near(m.stepDeg, d) && m.path.length === 5);
  verifyLedger(m, 'relay ' + d);
  verifyTriangle(m, 'relay ' + d);
  check('relay ' + d + ': the sign of S decides the phase', d < 90 ? m.triangle.S > 0 : m.triangle.S < 0);
  // the relay is the point reflection in SO(3): R(σₜ₊₁) = R(σₜ)R(σₜ₋₁)ᵀR(σₜ)
  check(
    'relay ' + d + ': R(σₜ₊₁) = R(σₜ) R(σₜ₋₁)ᵀ R(σₜ)',
    [1, 2, 3].every((t) => {
      const want = mat(mat(rotation(m.path[t]), T3(rotation(m.path[t - 1]))), rotation(m.path[t])),
        got = rotation(m.path[t + 1]);
      return want.every((row, i) => row.every((x, j) => Math.abs(x - got[i][j]) < 1e-9));
    })
  );
}
await input('#stepDeg', 90);
check('at 90° per beat the third probe is antipodal to the first and no shortest gate is claimed', (await state()).triangle.anti && /antipodal|对径/.test(await textOf('roOmega')));
await page.click('[data-scene="cadence"]');
await settle(page);
for (const [span, n] of [[120, 1], [120, 2], [120, 4], [120, 8], [60, 4], [170, 4], [1, 3]]) {
  await input('#spanDeg', span);
  await input('#beats', n);
  const m = await state();
  verifyLedger(m, `cadence ${span}/${n}`);
  const even = n * (1 - Math.cos((span * DEG) / n)),
    jump = 1 - Math.cos(span * DEG);
  check(
    `cadence ${span}° in ${n} beats: S = N(1 − cos(Θ/N)) ≤ 1 − cos Θ, with equality only for N = 1`,
    near(m.total.S, even, 1e-12) && near(m.otherTotal.S, jump, 1e-12) && (n === 1 ? near(even, jump, 1e-12) : m.total.S < m.otherTotal.S)
  );
}
await page.click('[data-scene="focus"]');
await settle(page);
for (const s of [0, 0.3, 0.5, 0.8, 0.95]) {
  await input('#sigmaW', s);
  const m = await state();
  check('σ_W slider ' + s, near(m.sigmaW, s) && near(m.grad.factor, (1 + s * s) ** 2 / 4, 1e-12) && (await textOf('roGrad')).includes(f4((1 + s * s) ** 2 / 4)));
  verifyInstances(m, 'σ_W ' + s);
}
for (const scene of SCENES) {
  await page.click(`[data-scene="${scene}"]`);
  await settle(page);
  const m = await state();
  check('scene chip ' + scene, m.scene === scene && (await page.getAttribute(`[data-scene="${scene}"]`, 'aria-pressed')) === 'true' && near(m.t, 1));
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  await layout(page, 'scene ' + scene);
}
await pick(DEFAULT);
await seek(0.3);
const early = await state();
await seek(0.8);
const late = await state();
check(
  'scrubbing the rail takes beats without changing the parameters',
  near(early.t, 0.3) && near(late.t, 0.8) && early.count === 1 && late.count === 3 && early.spanDeg === late.spanDeg && early.preset === late.preset
);
const beforeLens = await state(),
  titleBefore = await textOf('legend');
await page.click('#lensToggleBtn');
await settle(page);
const lens = await state();
check(
  'changing the lens relabels the same experiment',
  lens.lens !== beforeLens.lens && (await textOf('legend')) !== titleBefore && ['scene', 'stepDeg', 'spanDeg', 'beats', 'sigmaW', 'preset', 't'].every((k) => lens[k] === beforeLens[k]) &&
    (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true'
);
await page.click('#lensToggleBtn');
await settle(page);

/* ---------- the handle ---------- */
await pick('sagitta-mrp-surprisal-lock');
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const here = await state(),
  hbox = await page.locator('#geoHandle').boundingBox();
const start = await page.evaluate(() => TERNION_GEODESIC_DEBUG.dragTarget(TERNION_GEODESIC_DEBUG.state.stepDeg));
const goal = await page.evaluate(() => TERNION_GEODESIC_DEBUG.dragTarget(70));
check('the handle sits on the end of the beat', !!hbox && Math.hypot(hbox.x + hbox.width / 2 - start.x, hbox.y + hbox.height / 2 - start.y) < 1.5);
await page.mouse.move(start.x, start.y);
await page.mouse.down();
await page.mouse.move(goal.x, goal.y, { steps: 10 });
await page.mouse.up();
await settle(page);
const pulled = await state();
check('dragging the handle sets Δθ and leaves the camera fixed', Math.abs(pulled.stepDeg - 70) <= 1 && same(pulled.camera, here.camera) && !pulled.playing && !pulled.preset, String(pulled.stepDeg));
await page.locator('#geoHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check('the arrow key moves Δθ by one degree without moving the rail', near((await state()).stepDeg, pulled.stepDeg + 1) && (await state()).t === pulled.t);
await pick('jacobi-focusing-conformal-gradient');
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const fa = await page.evaluate(() => TERNION_GEODESIC_DEBUG.dragTarget(0.8)),
  fb = await page.evaluate(() => TERNION_GEODESIC_DEBUG.dragTarget(0.4));
await page.mouse.move(fa.x, fa.y);
await page.mouse.down();
await page.mouse.move(fb.x, fb.y, { steps: 8 });
await page.mouse.up();
await settle(page);
check('dragging the handle along the rational axis sets ‖σ_W‖', Math.abs((await state()).sigmaW - 0.4) <= 0.02, String((await state()).sigmaW));
await pick('lateral-detour-vs-chord-collapse');
check('the detour scene has no handle', (await state()).handleHidden && (await page.locator('#geoHandle').isHidden()));

/* ---------- playback ---------- */
for (const id of Object.keys(CARDS))
  check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.TERNION_GEODESIC_DEBUG.state));
check('every card declares its still at the end of the rail', (await page.$$eval('[data-preset]', (els) => els.map((e) => e.dataset.still))).every((v) => v === 'end'));

/* ---------- colours, marks and the strip ---------- */
await pick(DEFAULT);
async function primitiveColours(p = page) {
  return p.evaluate(() => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = n === 'circle' || n === 'glass' ? a[3] : ['line', 'arrow', 'bead', 'ring', 'fan'].includes(n) ? a[n === 'arrow' ? 2 : 1] : a[2];
        const key = ['surface', 'tube', 'poly', 'glass'].includes(n) ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn };
  });
}
for (const id of Object.keys(CARDS)) {
  await pick(id);
  const colors = await primitiveColours();
  check(
    id + ': amber only marks the current point, green and red never appear on the stage',
    colors.seen.filter((x) => x.colors.includes(colors.amber)).every((x) => CURSOR.test(x.key)) &&
      colors.seen.some((x) => x.colors.includes(colors.amber)) &&
      colors.seen.every((x) => !x.colors.includes(colors.ok) && !x.colors.includes(colors.warn))
  );
}
await pick(DEFAULT);
const marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => [m.key, m.hidden]));
check(
  'the sphere hides the bead at the lower end of the axis and leaves the upper one visible',
  marks.some(([k, h]) => k === 'axisSouth' && h) && marks.some(([k, h]) => k === 'axisNorth' && !h)
);
// the turning check of the brief: the light-and-shade histogram moves by ≥ 0.08 when the camera turns
const before = await solidPixels(page);
const initialCam = await page.evaluate(() => ({ ...TRV.solids[0].cam }));
let turned = 0;
for (const axis of ['yaw', 'pitch']) {
  await page.evaluate((cam) => { Object.assign(TRV.solids[0].cam, cam); TRV.kit.flush(); }, initialCam);
  const b = await page.evaluate(() => { const r = TRV.solids[0].el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
  const x = b[0] + b[2] * 0.08,
    y = b[1] + b[3] * 0.65;
  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let k = 1; k <= 6; k++) await page.mouse.move(x + (axis === 'yaw' ? b[2] * 0.05 * k : 0), y - (axis === 'pitch' ? b[3] * 0.05 * k : 0));
  await page.mouse.up();
  await settle(page);
  const after = await solidPixels(page);
  turned = Math.max(turned, after.hist.reduce((s, h, k) => s + Math.abs(h - before.hist[k]), 0) / 2);
}
await page.evaluate((cam) => { Object.assign(TRV.solids[0].cam, cam); TRV.kit.flush(); }, initialCam);
check('solid: opaque share ≥ 0.14, spread ≥ 0.055 and turning distance ≥ 0.08', before.share >= 0.14 && before.spread >= 0.055 && turned >= 0.08, JSON.stringify({ share: before.share, spread: before.spread, turned }));

async function plotTraces(p = page) {
  return p.evaluate(() => {
    const plot = TRV.kit.plot,
      traces = [];
    TRV.kit.plot = (...args) => {
      const graph = plot(...args);
      for (const method of ['line', 'vline']) {
        const original = graph[method];
        graph[method] = (...params) => { traces.push([method, ...params]); return original(...params); };
      }
      return graph;
    };
    try { TRV.kit.flush(); } finally { TRV.kit.plot = plot; }
    const { cyan, violet, magenta, amber, sigma } = TRV.palette;
    return { traces, cyan, violet, magenta, amber, sigma };
  });
}
{
  const pr = await plotTraces();
  const lineOf = (color) => pr.traces.find(([mth, , c]) => mth === 'line' && c === color);
  const cum = (path) => audit(path).beats.reduce((acc, b) => { acc.push(acc[acc.length - 1] + b.v); return acc; }, [0]);
  const evenSum = cum(EVEN),
    jumpSum = cum(JUMP);
  const stairsOk = (trace, sums) => !!trace && trace[1].every(([x, y]) => Number.isInteger(x) && (near(y, sums[x], 1e-12) || (x > 0 && near(y, sums[x - 1], 1e-12))));
  check('cadence strip: staircases of the even path and of the jump', stairsOk(lineOf(pr.cyan), evenSum) && stairsOk(lineOf(pr.magenta), jumpSum));
  const cursors = pr.traces.filter(([mth, , c]) => mth === 'vline' && c === pr.amber);
  check('cadence strip: one amber cursor at the rail', cursors.length === 1 && near(cursors[0][1], 4 * (await state()).t, 1e-12));
}
await pick('sagitta-mrp-surprisal-lock');
{
  const pr = await plotTraces();
  const lineOf = (color) => pr.traces.find(([mth, , c]) => mth === 'line' && c === color);
  const curve = (trace, fn) => !!trace && trace[1].length > 100 && trace[1].every(([x, y]) => near(y, fn(x * DEG), 1e-9));
  check(
    'step strip: 1 − cos Δθ, 2q_MRP and 2 sin²(Δθ/2) lie on one curve; I = −ln cos²(Δθ/2)',
    curve(lineOf(pr.cyan), (a) => 1 - Math.cos(a)) && curve(lineOf(pr.violet), (a) => 1 - Math.cos(a)) && curve(lineOf(pr.sigma), (a) => 1 - Math.cos(a)) &&
      curve(lineOf(pr.magenta), (a) => Math.min(2.4, -Math.log(Math.cos(a / 2) ** 2)))
  );
}
await pick('jacobi-focusing-conformal-gradient');
{
  const pr = await plotTraces();
  const lineOf = (color) => pr.traces.find(([mth, , c]) => mth === 'line' && c === color);
  check(
    'focus strip: J₀ cos s + J̇₀ sin s against J₀ + J̇₀s',
    lineOf(pr.cyan)[1].every(([x, y]) => near(y, J0 * Math.cos(x * DEG) + JD * Math.sin(x * DEG), 1e-12)) && lineOf(pr.magenta)[1].every(([x, y]) => near(y, J0 + JD * x * DEG, 1e-12))
  );
}
const domColours = (p) =>
  p.evaluate(() => {
    const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
    const banned = [col('--amber'), col('--ok'), col('--warn')],
      bad = [];
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
      if (el.closest('.handle')) continue;
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
    }
    const amber = col('--amber');
    for (const el of [document.querySelector('#evidence'), ...document.querySelectorAll('#evidence *')]) {
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor']) if (cs[prop] === amber) bad.push(`#evidence ${el.className || el.tagName} ${prop}`);
    }
    return bad;
  });
const badColors = await domColours(page);
check('semantic badge and readout colours (no amber, green or red outside their roles)', !badColors.length, badColors.slice(0, 3).join(' | '));

/* ---------- narrow frames, cited figures and the stills of every card ---------- */
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    for (let j = 0; j < Object.keys(CARDS).length; j++) {
      const id = (await state(p)).preset;
      await layout(p, `${lang}/${width}/${id}`, figure);
      if (lang === 'en') check(`English ${width}/${id}`, !(await cjkLeftovers(p)).length);
      if (figure) check('cited frame hides the strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
      await p.locator(figure ? '[data-tour="next"]' : '[data-preset="' + Object.keys(CARDS)[(j + 2) % 5] + '"]').click();
      await settle(p);
    }
    await p.context().close();
  }
  for (const id of Object.keys(CARDS)) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    verifyCard(m, id, `still ${lang}/${id}`);
    check(`still ${lang}/${id} rests at the end of the rail without a handle`, !m.playing && near(m.t, 1) && (await p.locator('#geoHandle').isHidden()));
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
