import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps, solidPixels } from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'observer-is-universe-crystallization-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const CHAPTER = 'ch38-s13-self-contained-observer-definition-and-observer-is-universe';
const ANCHOR = 'sec-ch38-self-contained-observer-definition-and-observer-is-universe';
// scene, view, the declared still (a value of the rail), the end of the rail and the regime of the still of every card
const CARDS = {
  'port-free-pentad-crystallization': { scene: 'pentad', cam: 'panorama', still: 9, max: 9, regime: 'chord' },
  'rational-schur-betti-time-arrow': { scene: 'ledger', cam: 'face', still: 5, max: 9, regime: 'chord' },
  'core-inside-out-starry-sky-flip': { scene: 'flip', cam: 'panorama', still: 3, max: 3, regime: 'gaze' },
  'trureturing-monad-resonant-span': { scene: 'monad', cam: 'zenith', still: 7, max: 7, regime: 'trunk' },
  'lean4-observer-universe-decide-trace': { scene: 'lean', cam: 'face', still: 3, max: 3, regime: 'u3' }
};
const IDS = Object.keys(CARDS);
const [PENTAD, LEDGER, FLIP, MONAD, LEAN] = IDS;
const DEFAULT = PENTAD;
const CODES = ['𝔒 = (𝒮, [-,-,-], κ, K₀, Φε) · 1 ↦ 0′', 'ΔISchur + Δb₁ ∈ ℚ≥0', '𝒰 \\ 𝔒 = ∅ · K₀ ↦ ℋ1/2', '𝔒A ← 𝒞AB → 𝔒B', 'ObserverUniverse · τ: 0→0→3/4→3/2'];
const TITLES = [
  ['无外部端口五元组与内禀结晶', 'Port-free pentad & 1 ↦ 0′ crystal'],
  ['有理舒尔创新度与贝蒂环秩时间箭', 'Rational Schur + Betti time arrow'],
  ['核内第一人称视角翻转：内盲区显影星空', 'Inside-core flip: horizon as starry sky'],
  ['trureturing 多观察者单子共振网', 'Multi-observer monad resonant span'],
  ['Lean 4 零公理 ObserverUniverse 归约', 'Lean 4 zero-axiom ObserverUniverse']
];
// the frozen theorems of the theorem box of §38.13, in its order
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor'
];
// what Lean v4.35.0 printed once for the listing of §38.13.4 and for the same statement on Init Rat with ==
const LEAN_RUN = { version: 'v4.35.0', qrat: [], rat: ['propext', 'sorryAx', 'Classical.choice', 'Quot.sound'] };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const F = (p, q = 1n) => {
  p = BigInt(p);
  q = BigInt(q);
  const g = gcdN(p, q) * (q < 0n ? -1n : 1n) || 1n;
  return [p / g, q / g];
};
const add = ([a, b], [c, d]) => F(a * d + c * b, b * d),
  subF = ([a, b], [c, d]) => F(a * d - c * b, b * d),
  mul = ([a, b], [c, d]) => F(a * c, b * d),
  div = ([a, b], [c, d]) => F(a * d, b * c);
const cmpF = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const eqF = (a, b) => cmpF(a, b) === 0;
const ZERO = F(0),
  ONE = F(1);
const strF = ([p, q]) => `${p}`.replace('-', '−') + (q === 1n ? '' : `/${q}`);
const readF = (x) => (Array.isArray(x) ? [BigInt(x[0]), BigInt(x[1])] : x);
const numF = ([p, q]) => Number((p * 10n ** 30n) / q) / 1e30;
/** A Hamilton product through the 4 × 4 matrix of left multiplication. */
const leftN = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const dotI = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const qmN = (a, b) => leftN(a).map((row) => dotI(row, b) + 0);
const conjN = ([w, x, y, z]) => [w, -x + 0, -y + 0, -z + 0];
/** The canonical tuple of a nonzero one: divide by primes while all entries allow it, then fix the sign. */
function canonN(t) {
  let v = [...t];
  if (v.every((x) => x === 0)) return [1, 0, 0, 0];
  for (let p = 2; p <= Math.max(...v.map(Math.abs)); ) {
    if (v.every((x) => x % p === 0)) v = v.map((x) => x / p);
    else p++;
  }
  const lead = v.find((x) => x !== 0);
  return v.map((x) => (lead < 0 ? -x : x) + 0);
}
const triadN = (a, b, c) => canonN(qmN(qmN(a, conjN(b)), c));
/** κ of two integer vectors of any length. */
const kappaN = (a, b) => {
  const n = BigInt(dotI(a, a) * dotI(b, b));
  return n === 0n ? ZERO : F(BigInt(dotI(a, b)) ** 2n, n);
};
/** The determinant of a rational matrix by elimination. */
function det(M) {
  const A = M.map((r) => r.map(readF));
  const n = A.length;
  let d = ONE;
  for (let i = 0; i < n; i++) {
    let p = i;
    while (p < n && A[p][i][0] === 0n) p++;
    if (p === n) return ZERO;
    if (p !== i) {
      [A[p], A[i]] = [A[i], A[p]];
      d = mul(d, F(-1));
    }
    d = mul(d, A[i][i]);
    for (let r = i + 1; r < n; r++) {
      const k = div(A[r][i], A[i][i]);
      A[r] = A[r].map((x, c) => subF(x, mul(k, A[i][c])));
    }
  }
  return d;
}
/** The Gram determinant of integer vectors. */
const gram = (vs) => (vs.length ? det(vs.map((u) => vs.map((v) => F(dotI(u, v))))) : ONE);
/** ‖x⊥‖²/‖x‖² over the span of a list of vectors, as a ratio of Gram determinants (the Schur complement of the Gram matrix). */
function innovation(x, vs) {
  const free = [];
  for (const v of vs) if (gram([...free, v])[0] !== 0n) free.push(v);
  return div(div(gram([...free, x]), gram(free)), F(dotI(x, x)));
}
/** The chords of a graph: edges that close a cycle in a spanning forest grown edge by edge (depth-first reachability). */
function chordsOf(V, E) {
  const adj = new Map(V.map((v) => [v, []]));
  let chords = 0;
  const reach = (a, b) => {
    const seen = new Set([a]),
      stack = [a];
    while (stack.length) {
      const x = stack.pop();
      if (x === b) return true;
      for (const y of adj.get(x)) if (!seen.has(y)) seen.add(y), stack.push(y);
    }
    return false;
  };
  for (const [u, v] of E) {
    if (reach(u, v)) chords++;
    adj.get(u).push(v);
    adj.get(v).push(u);
  }
  return chords;
}
/** The receivable carrier: entries −1, 0, 1, first nonzero entry 1, no two nonzero among x, y, z when w = 1. */
const CARRIER = [];
for (let i = 0; i < 81; i++) {
  const t = [Math.floor(i / 27) % 3, Math.floor(i / 9) % 3, Math.floor(i / 3) % 3, i % 3].map((d) => d - 1);
  const lead = t.find((x) => x !== 0);
  if (lead === 1 && !(t[0] === 1 && t.slice(1).filter((x) => x !== 0).length === 2)) CARRIER.push(t);
}
const NAMES = { o: [1, 0, 0, 0], a: [1, 1, 0, 0], b: [1, 0, 1, 0], g: [1, 1, 1, 1], d: [0, 1, 0, 1], e: [0, 1, 1, 0], p: [1, 0, 0, 0, 1] };
const pad = (t, n) => [...t, ...range(n - t.length).map(() => 0)];
/** A ledger as this suite reads it: each reading [kind, …names]. */
function ledgerN(readings, dims = 4) {
  let V = ['o'],
    E = [],
    tau = ZERO;
  const sprouted = [pad(NAMES.o, dims)];
  const out = [{ V: [...V], E: [], tau, dI: ZERO, dB: 0, b1: 0, comps: 1 }];
  for (const [kind, x, y] of readings) {
    const b0 = chordsOf(V, E);
    let dI = ZERO,
      closure = null;
    if (kind === 'sprout') {
      const v = pad(NAMES[x], dims);
      dI = innovation(v, sprouted);
      sprouted.push(v);
      V = [...V, x];
      E = [...E, ['o', x]];
      if (dims === 4) closure = triadN(NAMES.o, NAMES.o, NAMES[x]);
    } else if (kind === 'chord') {
      E = [...E, [x, y]];
      closure = triadN(NAMES[x], NAMES.o, NAMES[y]);
    } else if (kind === 'taut') closure = triadN(NAMES[x], NAMES[x], NAMES[x]);
    else closure = triadN(NAMES[x], NAMES[x], NAMES[y]);
    const b1 = chordsOf(V, E),
      dB = b1 - b0;
    tau = add(tau, add(dI, F(dB)));
    // components by reachability from each vertex
    const comps = V.length - (E.length - b1);
    out.push({ V: [...V], E: E.map((e) => [...e]), tau, dI, dB, b1, comps, closure });
  }
  return out;
}
const MAIN_READ = [['taut', 'o'], ['sprout', 'a'], ['sprout', 'b'], ['reread', 'o', 'a'], ['chord', 'a', 'b'], ['sprout', 'g'], ['chord', 'a', 'g'], ['taut', 'g'], ['chord', 'b', 'g']];
const MAIN = ledgerN(MAIN_READ);
const OBS_READ = {
  A: [['sprout', 'a'], ['sprout', 'b'], ['chord', 'a', 'b'], ['sprout', 'g'], ['chord', 'a', 'g'], ['chord', 'b', 'g'], ['taut', 'g']],
  B: [['sprout', 'g'], ['sprout', 'a'], ['chord', 'a', 'g'], ['sprout', 'b'], ['chord', 'b', 'g'], ['chord', 'a', 'b'], ['taut', 'a']],
  C: [['sprout', 'p'], ['sprout', 'a'], ['sprout', 'b'], ['chord', 'a', 'b'], ['sprout', 'g'], ['chord', 'a', 'g'], ['chord', 'b', 'g']]
};
const OBSL = Object.fromEntries(Object.entries(OBS_READ).map(([o, r]) => [o, ledgerN(r, o === 'C' ? 5 : 4)]));
const key = ([u, v]) => [u, v].sort().join('|');
const TRUNK = range(8).map((k) => {
  const at = ['A', 'B', 'C'].map((o) => OBSL[o][k]);
  const nodes = ['o', 'a', 'b', 'g'].filter((n) => at.every((s) => s.V.includes(n)));
  const all = ['o', 'a', 'b', 'g'].flatMap((u, i, xs) => xs.slice(i + 1).map((v) => key([u, v])));
  const edges = all.filter((k2) => at.every((s) => s.E.some((e) => key(e) === k2)));
  return [nodes.length, edges.length];
});
/** ObserverUniverse, written again: the candidate at cursor mod length, the edge ⟨last, anchor, cand, triad⟩, Δ_geom as a
    ratio of Gram determinants over the candidates already read, Δ_topo = 1/4 for a new edge with cand ≠ anchor. */
function leanN() {
  const horizon = [[1, 0, 0, 0], canonN([1, 1, 0, 0]), canonN([1, 0, 1, 0])];
  let u = { core: [horizon[0]], span: [horizon[0]], dag: [], tau: ZERO, cursor: 0, basis: 1 };
  const out = [{ ...u, dGeom: null, dTopo: null }];
  for (let i = 0; i < 3; i++) {
    const cand = horizon[u.cursor % horizon.length],
      anchor = u.core[0],
      last = u.core[u.core.length - 1],
      edge = [last, anchor, cand, triadN(last, anchor, cand)];
    const known = u.dag.some((e) => same(e, edge));
    const dGeom = innovation(cand, u.span),
      dTopo = !known && !same(cand, anchor) ? F(1, 4) : ZERO,
      dTau = add(dGeom, dTopo);
    u = {
      core: u.core.some((v) => same(v, cand)) ? u.core : [...u.core, cand],
      span: cmpF(dGeom, ZERO) > 0 ? [...u.span, cand] : u.span,
      dag: !known && cmpF(dTau, ZERO) > 0 ? [...u.dag, edge] : u.dag,
      tau: add(u.tau, dTau),
      cursor: u.cursor + 1,
      basis: u.basis + (cmpF(dGeom, ZERO) > 0 ? 1 : 0)
    };
    out.push({ ...u, dGeom, dTopo, cand, edge });
  }
  return out;
}
const LEANN = leanN();
const COUPLED = [[2, 2, 0, 0], [-3, 0, -3, 0], [0, 2, 0, 2], [3, 3, 3, 3], [0, 0, -2, 0]];
const GHOSTS = [[0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, -1], [0, 0, 0, 0, 2, 1]];
const readoutN = (v) => CARRIER.map((s) => strF(kappaN(v, pad(s, v.length)))).join(' ');
/** The mean latent share of the horizon seen from the core {o, a, b} of the fifth reading. */
const SHARE = (() => {
  const core = [NAMES.o, NAMES.a, NAMES.b],
    horizon = CARRIER.filter((t) => !core.some((c) => same(c, t)));
  const latent = horizon.reduce((s, t) => add(s, innovation(t, core)), ZERO);
  return { n: horizon.length, latent: div(latent, F(horizon.length)), visible: subF(ONE, div(latent, F(horizon.length))) };
})();

/* ---------- what a printed decimal says ---------- */
/** The digits of p/q rounded to d decimals, and whether they are exact. */
function decimalOf([p, q], d) {
  const a = (p < 0n ? -p : p) * 10n ** BigInt(d),
    k = (2n * a + q) / (2n * q),
    s = String(k).padStart(d + 1, '0');
  return { text: (p < 0n && k > 0n ? '−' : '') + s.slice(0, s.length - d) + '.' + s.slice(s.length - d), exact: a === k * q };
}
/** Every “p/q = x.xxxx” and “p/q ≈ x.xxxx” in a text that does not tell the truth about the fraction. */
function wrongDecimals(text) {
  const bad = [];
  for (const m of text.matchAll(/(−?\d+)\/(\d+) ([=≈]) (−?\d+\.\d+)/g)) {
    const q = F(BigInt(m[1].replace('−', '-')), BigInt(m[2])),
      d = m[4].split('.')[1].length,
      { text: digits, exact } = decimalOf(q, d);
    if (digits !== m[4] || (m[3] === '=') !== exact) bad.push(m[0]);
  }
  return bad;
}
/* a rounded value never stands beside an inequality sign */
const SIGN = '[<>≤≥]';
const clauses = (text) => text.replace(/\s+/g, ' ').split(/[，；。,;]|(?<=\d)\. |: |：/);
const mixed = (text) => clauses(text).filter((x) => new RegExp(`≈.*${SIGN}|${SIGN}.*≈`).test(x));

/* ---------- the browser ---------- */
const T = await session();
const { page, check } = T;
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
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
// the lab is a permanent night console: record every write of data-tr-palette; record every colour the 2D canvases use
const paletteMutations = [];
async function watchContext(context) {
  await context.exposeBinding('__universeAudit', (_, record) => paletteMutations.push(record));
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__universeAudit({ old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-tr-palette'] });
    const seen = (window.__canvasColours = new Set());
    const proto = CanvasRenderingContext2D.prototype;
    for (const prop of ['fillStyle', 'strokeStyle']) {
      const d = Object.getOwnPropertyDescriptor(proto, prop);
      Object.defineProperty(proto, prop, {
        get: d.get,
        set(v) {
          if (typeof v === 'string') seen.add(v.toLowerCase());
          d.set.call(this, v);
        }
      });
    }
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
await watchContext(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await browserNewContext(options);
  await watchContext(context);
  return context;
};
watchPage(page);

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid (opaque share, shading, turning, resting)
const gate = [];
T.check = (name, ok, detail) => {
  gate.push([name, !!ok]);
  return check(name, ok, detail);
};
await stageFirstChecks(T, BOOK, ID, { solid: true });
T.check = check;
{
  const ran = (re) => gate.some(([name]) => re.test(name));
  const esc = (s) => s.replace(/[-/]/g, '\\$&');
  for (const id of IDS) {
    const c = esc(id);
    check(
      `the shared gate went through ${id}: desktop in Chinese and English, the phone, the frame of a phone and the cited figures of both languages`,
      ran(new RegExp(`^desktop: card ${c} applies`)) &&
        ran(new RegExp(`^English: no Chinese left with card ${c}`)) &&
        ran(new RegExp(`^phone: card ${c} applies`)) &&
        ['zh', 'en'].every((lang) => ran(new RegExp(`^frame \\(${lang}, 334 × 620\\), ▶ card ${c}`)) && [334, 740].every((w) => ran(new RegExp(`^cited figure \\(${lang}, ${c}, ${w} × 540\\)`))))
    );
  }
  check('the shared gate ran whole and passed: solid, cards, evidence, rails, keys, short screens, cover and motion', gate.length > 150 && gate.every(([, ok]) => ok) && [/^evidence: green boxes/, /^short screen/, /^cover:/, /^rail/, /^solid:/].every(ran), `${gate.length} checks, failed: ${gate.filter(([, ok]) => !ok).map(([n]) => n).slice(0, 3).join(' | ')}`);
}

/* ---------- sources, registry and citations ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
// identifiers of language models, vendors and tools, kept as code points so that this suite carries none of them
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
  [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100],
  [97, 110, 116, 105, 103, 114, 97, 118, 105, 116, 121]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const cjkTerms = new RegExp([[22823, 27169, 22411], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
const redToken = /--warn|--tr-warn|\bP\.warn\b|palette\.warn|c-wn|\bsw wn\b|class="lean open"|lean\.open|<span class="ok">OPEN</;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src), (literalColour.exec(src) || [''])[0]);
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !cjkTerms.test(src), (identifiers.exec(src) || cjkTerms.exec(src) || [''])[0]);
  check(`source ${file}: red is never used (no warn token, no OPEN box)`, !redToken.test(src), (redToken.exec(src) || [''])[0]);
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[A-Za-z][’']s\b/.test(src), (/.{12}[A-Za-z][’']s\b/.exec(src) || [''])[0]);
}
check('reserved identifiers are absent from the suite', !identifiers.test(suite) && !cjkTerms.test(suite));
check(
  'the page loads exactly the shared theme, its own style sheet, the shell, the kit and main.js',
  same([...sources['index.html'].matchAll(/<(?:script src|link rel="stylesheet" href)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://fonts.')), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js'])
);
check('suite: no fixed waits', !/waitForTimeout\s*\(/.test(suite.replace(/^\s*\/\/.*$/gm, '')));
check(
  'registration: §38.13, live, the five cards and the sixteen GIDs in order',
  !!entry && entry.chapter === 38 && entry.section === '38.13' && entry.status === 'live' && entry.code === 'OMEGA//UNIVERSE' && same(entry.presets, IDS) && same((entry.lean || []).map((x) => x.gid), GIDS) && (entry.theory || []).some((t) => t.href === `../zh/${CHAPTER}.html#${ANCHOR}` && t.href_en === `../en/${CHAPTER}.html#${ANCHOR}`),
  entry ? JSON.stringify({ chapter: entry.chapter, section: entry.section, lean: (entry.lean || []).length }) : 'visualizations.json has no entry for this page'
);
{
  const cited = vizCitations(resolveBook(BOOK), ID);
  for (const lang of ['zh', 'en']) {
    const edition = path.join(ROOT, 'books', BOOK, lang);
    const summary = fs.readFileSync(path.join(edition, 'SUMMARY.md'), 'utf8');
    const tocLinks = summary.split('\n').filter((line) => line.endsWith(`](${CHAPTER}.md)`));
    check(`${lang} SUMMARY.md: §38.13 links once to the chapter`,
      tocLinks.length === 1 && tocLinks[0].trimStart().startsWith('- [38.13 '));

    const ledger = fs.readFileSync(path.join(edition, 'appendix-a-s03-verbatim-ledger.md'), 'utf8');
    const a131 = ledger.split('\n').find((line) => line.startsWith('| **A131** '));
    check(`${lang} Appendix A: A131 cites §38.13, its theorem box, and its lab`,
      !!a131 && a131.includes(`](${CHAPTER}.md#${ANCHOR})`) &&
      a131.includes('[@thm-ch38-observer-is-universe-anchors]') && a131.includes(`\`${ID}\``));

    const rows = cited.filter((c) => c.lang === lang);
    check(`${lang} chapter: the five cards are cited in order, and the full lab once without a preset`, same(rows.filter((c) => c.preset).map((c) => c.preset), IDS) && rows.filter((c) => !c.preset).length === 1, JSON.stringify(rows.map((c) => c.preset || null)));
  }
}

/* ---------- static text: the shell of the lab, the cards, the lenses, the drawer ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&').replace(/\s+/g, ' ').trim();
const html = sources['index.html'];
check('body names the page; the lab is div.app.lab#app', html.includes(`<body data-viz-id="${ID}">`) && html.includes('<div class="app lab" id="app">'));
check('crumb: ◂ 第 38 章 · §38.13 / ◂ Ch. 38 · §38.13', html.includes('<span class="zh">◂ 第 38 章 · §38.13</span><span class="en">◂ Ch. 38 · §38.13</span>'));
check('logo: OMEGA//UNIVERSE', /<h1 class="logo" data-text="OMEGA\/\/UNIVERSE">OMEGA<span>\/\/<\/span>UNIVERSE<\/h1>/.test(html));
{
  const lens = /<button class="lens-toggle" id="lensToggleBtn" type="button" aria-pressed="false"><span class="seg off"><span class="zh">(.*?)<\/span><span class="en">(.*?)<\/span><\/span><span class="seg on"><span class="zh">(.*?)<\/span><span class="en">(.*?)<\/span><\/span><\/button>/.exec(html);
  check(
    'the two lenses carry the names of §38.13, off by default',
    !!lens &&
      plain(lens[1]) === '自包含观察者即宇宙（𝔒 ≡ 𝒰Ω）· 内禀结晶生时 τ = Istruct(K₀)' &&
      plain(lens[2]) === 'Self-Contained Observer ≡ Universe · Intrinsic Crystallization Time τ = Istruct(K₀)' &&
      plain(lens[3]) === '传统开环主体+外部环境对照（MODEL）· 外源输入与排废热时间箭' &&
      plain(lens[4]) === 'Classical Open-Loop Actor + Environment Contrast (MODEL) · Extrinsic Input & Heat-Bath Arrow' &&
      /<h2><span class="zh">双透镜<\/span><span class="en">Two lenses<\/span><span class="aside">§38\.13<\/span><\/h2>/.test(html),
    lens ? lens.slice(1).map(plain).join(' | ') : 'no lens toggle'
  );
}
{
  const buttons = [...html.matchAll(/<button class="preset" data-preset="([^"]+)" aria-pressed="false"><span class="code">(.*?)<\/span><span class="cn zh">(.*?)<\/span><span class="cn en">(.*?)<\/span><\/button>/g)];
  check('five cards in order, with their codes and names in both languages', same(buttons.map((b) => b[1]), IDS) && same(buttons.map((b) => plain(b[2])), CODES) && same(buttons.map((b) => [plain(b[3]), plain(b[4])]), TITLES), JSON.stringify(buttons.map((b) => [b[1], plain(b[2])])));
}
check(
  'drawer: the chapter links of both languages, with their anchors and titles',
  html.includes(`<a href="../../zh/${CHAPTER}.html#${ANCHOR}" target="_top">第 38 章 §38.13 观察者的完整自包含公理化定义、结构信息时间与观察者即宇宙</a>`) &&
    html.includes(`<a href="../../en/${CHAPTER}.html#${ANCHOR}" target="_top">Chapter 38 §38.13 Complete Self-Contained Definition of the Observer, Structural-Information Time, and Observer Is Universe</a>`)
);
check(
  'the three-column lab: deck with lens and cards, stage with its HUD, handle and legend, the strip outside the stage, evidence with the info button first',
  /<aside class="col deck" id="rail"/.test(html) &&
    /<aside class="col side" id="evidence"[^>]*>\s*<button class="chip" id="infoBtn"/.test(html) &&
    /<div class="stage" id="stage" data-thumb/.test(html) &&
    html.indexOf('id="stageHandle"') > html.indexOf('id="stage"') &&
    html.indexOf('<div class="strip">') > html.indexOf('id="legend"') &&
    ['plot', 'plotB', 'tourBody', 'presetNote', 'readouts', 'basis', 'drawerEvidence', 'lensMirror', 'idleBtn', 'stepRange', 'proofChips', 'obsChips', 'uChips', 'camChips'].every((id) => html.includes(`id="${id}"`)) &&
    !/<canvas id="plot/.test(html.slice(html.indexOf('id="stage"'), html.indexOf('<div class="tour"')))
);
const BOXES = [...html.matchAll(/<div class="lean( [a-z]+)?">(.*?)<\/div>/g)].map((m) => ({
  kind: (m[1] || '').trim(),
  gid: (/data-lean-gid="([^"]+)"/.exec(m[2]) || [])[1] || null,
  zh: plain((/<span class="zh">(.*?)<\/span>(?=<span class="en">)/.exec(m[2]) || ['', ''])[1]),
  en: plain((/<span class="en">(.*?)<\/span>(?=<a data-lean-gid|<\/span>$)/.exec(m[2]) || ['', ''])[1])
}));
const GREEN = BOXES.filter((b) => !b.kind);
check('the panel holds sixteen green boxes in the order of the theorem box, then ARGUED, MODEL and NUM', same(GREEN.map((b) => b.gid), GIDS) && same(BOXES.slice(16).map((b) => b.kind), ['argued', 'model', 'num']) && BOXES.length === 19, JSON.stringify(BOXES.map((b) => b.kind || b.gid.split('.').pop())));
// a green box says what the frozen theorem says: no instance of the page, no computed number, no rounding
const INSTANCE = /页面|本页|舞台|探针|滑块|数值|演示|实例|手工推导|this page|the page|on the page|stage|probe|slider|instance|numerical|derived by hand|≈|\d\.\d|τ|ObserverUniverse|观察者|observer/i;
// the evidence labels themselves, case-sensitive (“the model”, “natural numbers” are words of the theorems)
const LABELS = /\b(?:MODEL|NUM|ARGUED)\b/;
const instance = (t) => INSTANCE.exec(t) || LABELS.exec(t);
check('green boxes: only the hypotheses and conclusions of each theorem, no instance, number or reading of the page', GREEN.every((b) => b.zh.length > 30 && b.en.length > 40 && !instance(b.zh) && !instance(b.en)), GREEN.filter((b) => instance(b.zh) || instance(b.en)).map((b) => b.gid.split('.').pop() + ': ' + (instance(b.zh) || instance(b.en))[0]).join(' | '));
check('green boxes: each names its theorem, and none holds a span the script fills', GREEN.every((b, i) => new RegExp(`<code>${GIDS[i].split('.').pop()}</code>`).test(html)) && ![...html.matchAll(/<div class="lean">(.*?)<\/div>/g)].some((m) => /data-bench|\sid=/.test(m[1])));
check('index.html: the NUM box is empty until the script fills it', /<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/.test(html));
{
  const spans = [...html.matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  const NAMES_B = ['tauEnd', 'b1End', 'visible', 'tauA', 'tauB', 'tauC', 'leanTau', 'axQ', 'axR'];
  check('index.html: the numbers of the drawer are empty spans, each name once per language', same(spans.map((x) => x[0]), [...NAMES_B, ...NAMES_B]) && spans.every((x) => x[1] === '—'), JSON.stringify(spans));
  check('index.html: the outputs are empty until the script writes them', ['stepOut', 'roKey', 'roStep', 'roGraph', 'roHorizon', 'roOutside', 'roMonad', 'roLean'].every((id) => html.includes(`<output id="${id}">—</output>`)));
}
{
  const js = sources['main.js'];
  check('main.js: the probe is read-only and named UNIVERSE_DEBUG', js.includes('window.UNIVERSE_DEBUG = Object.freeze({'));
  check('main.js: the solid stage keeps the wheel for the page, and one formatter writes every relation', js.includes('wheel: false') && js.includes('function rel(q, x, d = 4)') && !/\.toFixed\(/.test(js));
  check('main.js: the Lean measurement is written once, in one constant', (js.match(/'propext', 'sorryAx', 'Classical\.choice', 'Quot\.sound'/g) || []).length === 1 && js.includes('const LEAN_RUN = {'));
  check('style.css: no grid override of the shared lab and no strip inside the stage', !/\.app\.lab\s*\{[^}]*grid-template-columns/.test(sources['style.css']));
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.UNIVERSE_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
const seek = (v, p = page) => input('#now', v, p);
const press = async (selector, p = page) => {
  await p.locator(selector).evaluate((b) => b.click());
  await settle(p);
};
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
/** Click a card and wait until it has played up to its still and parked there. */
async function pick(card, p = page) {
  await p.locator(`[data-preset="${card}"]`).evaluate((b) => b.click());
  await settle(p);
  const parked = await until(
    p,
    ([id, still]) => {
      const s = window.UNIVERSE_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.clock - still) < 1e-12;
    },
    [card, CARDS[card].still],
    150000
  );
  if (!parked) await pause(p);
  await settle(p);
  return parked;
}
async function setLang(lang, p = page) {
  await p.locator(`[data-lang-set="${lang}"]`).evaluate((b) => b.click());
  await settle(p);
}
async function setLens(v, p = page) {
  if ((await state(p)).lens !== v) await press('#lensToggleBtn', p);
}
/** Record every primitive of the next frame of the solid stage with its colours and key. */
const primitives = (p = page) =>
  p.evaluate(() => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'bead' || n === 'ring' || n === 'fan' ? a[1] : a[2];
        const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key).replace('~', ''), alpha: typeof s.alpha === 'number' ? s.alpha : 1, colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter((c) => typeof c === 'string') });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, palette: { amber: P.amber, warn: P.warn, ok: P.ok, cyan: P.cyan, magenta: P.magenta, violet: P.violet } };
  });
const textOf = async (id, p = page) => (await p.locator('#' + id).textContent()).replace(/\s+/g, ' ').trim();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ': framing and legible labels', !issues.length && (await overflowX(p)) <= 0, JSON.stringify(issues.slice(0, 3)));
}
const regimeTexts = (p = page) =>
  p.evaluate(() => {
    const t = (s) => (document.querySelector(s) ? document.querySelector(s).textContent : '').replace(/\s+/g, ' ').trim();
    return { big: t('#hudBig'), sub: t('#hudSub'), note: t('#presetNote'), tour: t('#tour .tour-note'), legend: t('#legend'), readouts: t('#readouts'), pills: t('.status') };
  });
const nF = (x) => readF(x);

/* ---------- the core of the page, against the one written here ---------- */
{
  const core = await page.evaluate(() => {
    const D = window.UNIVERSE_DEBUG,
      some = [];
    for (let w = -2; w <= 2; w++) for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++) some.push([w, x, y, z]);
    const out = { normal: some.map((t) => [t, D.core.normalize(t)]), triad: [], kappa: [], schur: [] };
    for (let i = 0; i < some.length; i += 37) for (let j = 5; j < some.length; j += 41) for (let k = 9; k < some.length; k += 113) out.triad.push([some[i], some[j], some[k], D.core.triad(some[i], some[j], some[k])]);
    for (let i = 0; i < some.length; i += 11) for (let j = 0; j < some.length; j += 17) out.kappa.push([some[i], some[j], D.core.kappa(some[i], some[j])]);
    const basis = [[1, 0, 0, 0], [0, 1, 1, 0], [0, 1, -1, 2]];
    for (let i = 0; i < some.length; i += 7) if (some[i].some((v) => v)) out.schur.push([some[i], D.core.schur(some[i], basis)]);
    return { ...out, carrier: D.carrier, named: D.named };
  });
  check('normalize: all 625 tuples with entries up to 2 give the canonical tuple computed here', core.normal.length === 625 && core.normal.every(([t, n]) => same(n, canonN(t))));
  check('triad: a · b̄ · c through 4 × 4 matrices, normalized, on sampled triples', core.triad.length > 500 && core.triad.every(([a, b, c, t]) => same(t, triadN(a, b, c))));
  check('κ: the squared inner product over both squared norms, in lowest terms', core.kappa.length > 500 && core.kappa.every(([a, b, k]) => eqF(kappaN(a, b), nF(k)) && gcdN(...nF(k)) === 1n));
  check('ΔI_Schur over an orthogonal basis equals the ratio of Gram determinants on 89 vectors', core.schur.length > 80 && core.schur.every(([t, q]) => eqF(nF(q), innovation(t, [[1, 0, 0, 0], [0, 1, 1, 0], [0, 1, -1, 2]]))));
  check('the carrier 𝒮: the 28 canonical tuples written here, in the same set', core.carrier.length === 28 && same([...core.carrier].map(String).sort(), CARRIER.map(String).sort()) && CARRIER.every((t) => same(canonN(t), t)));
  check('the named nodes are nodes of 𝒮: o, a, b, g, d, e', ['o', 'a', 'b', 'g', 'd', 'e'].every((n) => same(core.named[n], NAMES[n]) && CARRIER.some((t) => same(t, NAMES[n]))));
}
{
  const [main, monad, trunk, lean, ext, run] = await page.evaluate(() => {
    const D = window.UNIVERSE_DEBUG;
    return [D.main(), D.monad(), D.trunk(), D.lean(), D.exterior(), D.leanRun()];
  });
  const T0 = MAIN.map((s) => strF(s.tau));
  check('main ledger: τ = 0, 0, 1/2, 1, 1, 2, 9/4, 13/4, 13/4, 17/4 as computed here', same(main.map((s) => strF(nF(s.tau))), T0) && same(T0, ['0', '0', '1/2', '1', '1', '2', '9/4', '13/4', '13/4', '17/4']), JSON.stringify(main.map((s) => strF(nF(s.tau)))));
  check('main ledger: every ΔI_Schur is the Gram-determinant innovation of the node it adds, in [0, 1]', main.every((s, k) => eqF(nF(s.dI), MAIN[k].dI) && cmpF(nF(s.dI), ZERO) >= 0 && cmpF(nF(s.dI), ONE) <= 0));
  check('main ledger: every Δb₁ is the change of the chords outside a spanning forest, and b₁ = |E| − |V| + c', main.every((s, k) => s.dB === MAIN[k].dB && s.b1 === MAIN[k].b1 && s.b1 === s.E.length - s.V.length + s.c && s.c === 1));
  check('main ledger: τ is non-decreasing and Δτ = ΔI + Δb₁ at every reading', main.every((s, k) => !k || (eqF(nF(s.dTau), add(nF(s.dI), F(s.dB))) && cmpF(nF(s.tau), nF(main[k - 1].tau)) >= 0)));
  check('main ledger: the three tautologies are plateaus (Δτ = 0) and leave K₀ unchanged', [1, 4, 8].every((k) => main[k].kind === 'taut' && eqF(nF(main[k].dTau), ZERO) && same(main[k].V, main[k - 1].V) && same(main[k].E, main[k - 1].E)));
  check('main ledger: a sprout adds one node and one edge, Δb₁ = 0, ΔI > 0', [2, 3, 6].every((k) => main[k].kind === 'sprout' && main[k].V.length === main[k - 1].V.length + 1 && main[k].E.length === main[k - 1].E.length + 1 && main[k].dB === 0 && cmpF(nF(main[k].dI), ZERO) > 0));
  check('main ledger: a chord adds one edge between nodes of K₀, Δ|V| = 0, Δb₁ = +1, ΔI = 0', [5, 7, 9].every((k) => main[k].kind === 'chord' && main[k].V.length === main[k - 1].V.length && main[k].E.length === main[k - 1].E.length + 1 && main[k].dB === 1 && eqF(nF(main[k].dI), ZERO)));
  check('main ledger: the second-order pairs C(|V|, 2) and the latent nodes |𝒮| − |V|', main.every((s) => s.pairs === (s.V.length * (s.V.length - 1)) / 2 && s.open === s.pairs - s.E.length && s.latent === 28 - s.V.length));
  const closureNames = main.filter((s) => s.closure).map((s) => s.closure);
  check('main ledger: the closures [o, o, a] = a, [a, o, b] = g, [a, o, g] = d, [b, o, g] = e, [x, x, x] = x, as triads computed here', closureNames.every((c, i) => same(NAMES[c[3]] || null, MAIN[i + 1].closure)) && same(closureNames.map((c) => c[3]), ['o', 'a', 'b', 'a', 'g', 'g', 'd', 'g', 'e']), JSON.stringify(closureNames));
  check('main ledger: the orthogonal basis stays pairwise orthogonal, four vectors at the end', main[9].basis.length === 4 && main[9].basis.every((u, i) => main[9].basis.every((v, j) => i === j || u.reduce((s, x, c) => add(s, mul(nF(x), nF(v[c]))), ZERO)[0] === 0n)));
  for (const o of ['A', 'B', 'C'])
    check(`observer ${o}: τ and b₁ at every step as computed here`, same(monad[o].map((s) => strF(nF(s.tau))), OBSL[o].map((s) => strF(s.tau))) && monad[o].every((s, k) => s.b1 === OBSL[o][k].b1), JSON.stringify(monad[o].map((s) => strF(nF(s.tau)))));
  const finals = ['A', 'B', 'C'].map((o) => strF(OBSL[o][7].tau));
  check('three proper times differ: τ_A = 17/4, τ_B = 13/3, τ_C = 19/4, each with b₁ = 3', same(finals, ['17/4', '13/3', '19/4']) && new Set(finals).size === 3 && ['A', 'B', 'C'].every((o) => OBSL[o][7].b1 === 3));
  check('the common trunk grows to the same 4 nodes and 6 edges, step by step as computed here', same(trunk.map((t) => [t.nodes.length, t.edges.length]), TRUNK) && same(TRUNK[7], [4, 6]) && !trunk[7].nodes.includes('p'), JSON.stringify(trunk.map((t) => [t.nodes.length, t.edges.length])));
  check('ObserverUniverse: τ = 0, 0, 3/4, 3/2, |DAG| = 0, 0, 1, 2, |orthoBasis| = 1, 1, 2, 3', same(lean.map((u) => strF(nF(u.tau))), LEANN.map((u) => strF(u.tau))) && same(LEANN.map((u) => strF(u.tau)), ['0', '0', '3/4', '3/2']) && same(lean.map((u) => u.dag.length), [0, 0, 1, 2]) && same(lean.map((u) => u.basis.length), LEANN.map((u) => u.basis)) && same(LEANN.map((u) => u.basis), [1, 1, 2, 3]));
  check('ObserverUniverse: u1 reads the seed with Δ_geom = Δ_topo = 0; u2 and u3 have Δ_geom = 1/2 and Δ_topo = 1/4', lean.slice(1).every((u, k) => eqF(nF(u.last.dGeom), LEANN[k + 1].dGeom) && eqF(nF(u.last.dTopo), LEANN[k + 1].dTopo)) && same(LEANN.slice(1).map((u) => [strF(u.dGeom), strF(u.dTopo)]), [['0', '0'], ['1/2', '1/4'], ['1/2', '1/4']]));
  check('ObserverUniverse: the non-abelian triad [(1, 1, 0, 0), (1, 0, 0, 0), (1, 0, 1, 0)] = (1, 1, 1, 1) is the d of the second DAG edge', same(lean[3].dag[1][3], [1, 1, 1, 1]) && same(LEANN[3].edge[3], [1, 1, 1, 1]) && same(triadN([1, 0, 1, 0], [1, 0, 0, 0], [1, 1, 0, 0]), [1, 1, 1, -1]));
  check('the Lean measurement of the page is the one recorded: no axiom for QRat, four entries for Init Rat with ==', same(run.qrat.axioms, LEAN_RUN.qrat) && same(run.rat.axioms, LEAN_RUN.rat) && run.version === LEAN_RUN.version && run.qrat.decide === true && run.rat.decide === false);
  check('the coupled modes: each lies in the fibre of its canonical node, whose readout it shares', ext.coupled.length === 5 && ext.coupled.every((c, i) => same(c.node, canonN(COUPLED[i])) && c.fibre >= 0 && readoutN(COUPLED[i]) === readoutN(CARRIER[CARRIER.findIndex((t) => same(t, canonN(COUPLED[i])))])));
  check('the ghosts: readout 0 on all of 𝒮, in no fibre of a node, and still distinct among themselves', ext.ghosts.length === 5 && ext.ghosts.every((g, i) => g.zero && g.fibre === -1 && /^(0 )*0$/.test(readoutN(GHOSTS[i]))) && GHOSTS.every((u, i) => GHOSTS.every((v, j) => i === j || !eqF(kappaN(u, v), ONE))));
  check('the shares of ℋ½ seen from the core of the fifth reading, by Gram determinants', ext.flipAt === 5 && ext.shares.n === SHARE.n && eqF(nF(ext.shares.visible), SHARE.visible) && eqF(nF(ext.shares.latent), SHARE.latent), `${strF(SHARE.visible)} over ${SHARE.n}`);
}

/* ---------- the page as it opens, and the cards ---------- */
{
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await settle(p);
  const s = await state(p);
  check('the pentad card opens by default, parked on its ninth reading: τ = 17/4, b₁ = 3', s.preset === DEFAULT && s.scene === 'pentad' && s.main.k === 9 && strF(nF(s.main.tau)) === '17/4' && s.main.b1 === 3 && !s.playing && s.lens === 0);
  check('the probe is frozen', await p.evaluate(() => Object.isFrozen(window.UNIVERSE_DEBUG)));
  await p.context().close();
}
check('the registered stills are written on the cards', same(await page.$$eval('#presets [data-preset]', (els) => els.map((e) => Number(e.dataset.still))), IDS.map((id) => CARDS[id].still)));
await setLang('zh');
for (const id of IDS) {
  const plays = await playsAfter(page, () => page.locator(`[data-preset="${id}"]`).evaluate((b) => b.click()), () => ({ playing: window.UNIVERSE_DEBUG.state.playing, t: window.UNIVERSE_DEBUG.state.clock }));
  check(`card ${id}: plays from the start`, plays);
  const parked = await pick(id);
  const s = await state();
  check(`card ${id}: parks on its still with its scene, view and regime`, parked && s.scene === CARDS[id].scene && s.cam === CARDS[id].cam && s.clock === CARDS[id].still && s.max === CARDS[id].max && s.regime === CARDS[id].regime, JSON.stringify({ scene: s.scene, cam: s.cam, clock: s.clock, max: s.max, regime: s.regime }));
}
{
  const s = await state();
  check('lean card at u3: τ = 3/2, |DAG| = 2, |orthoBasis| = 3, the core holds the three nodes', s.scene === 'lean' && strF(nF(s.lean.tau)) === '3/2' && s.lean.dag === 2 && s.lean.basis === 3 && s.lean.core.length === 3);
}

/* ---------- the tautology: the phase turns, τ stays ---------- */
await pick(PENTAD);
{
  const before = await state();
  await press('#idleBtn');
  await until(page, () => window.UNIVERSE_DEBUG.state.spin === 1);
  await settle(page);
  const after = await state();
  const t = await regimeTexts();
  check('idle on [x, x, x] = x: one more turn counted, the phase completes, τ, b₁ and K₀ stay', after.idle && after.replays === before.replays + 1 && after.spin === 1 && same(after.main, before.main) && strF(nF(after.main.tau)) === '17/4', JSON.stringify([before.main.tau, after.main.tau, after.replays]));
  check('idle: the HUD says Δτ = 0 and the legend shows the magenta tautology', /Δτ = 0/.test(t.sub) && /\[x, x, x\] = x/.test(t.legend));
  const prim = await primitives();
  check('idle: a magenta ring and bead go round the node, in magenta only', prim.seen.some((x) => x.key === 'idle' && x.colors.includes(prim.palette.magenta)));
  await press('#stageAct');
  const off = await state();
  check('the stage button switches idle off again, the card stays', !off.idle && off.scene === 'pentad');
  // a turn while a tautology is read on the rail: the plateau of the first reading
  await seek(0.5);
  const mid = await state();
  check('half way through the first reading (a tautology) τ is still 0', mid.main.k === 0 && mid.main.f > 0 && strF(nF(mid.main.tau)) === '0');
}

/* ---------- the rail and the dials ---------- */
await pick(LEDGER);
for (let k = 0; k <= 9; k++) {
  await input('#stepRange', k);
  const s = await state();
  if (!(s.main.k === k && strF(nF(s.main.tau)) === strF(MAIN[k].tau) && s.main.b1 === MAIN[k].b1 && s.scene === 'ledger')) {
    check(`step dial: reading ${k} shows its ledger`, false, JSON.stringify(s.main));
    break;
  }
  if (k === 9) check('step dial: readings 0 … 9 each show τ and b₁ of the ledger computed here', true);
}
{
  await input('#stepRange', 5);
  const ro = await textOf('roStep'),
    g = await textOf('roGraph');
  check('readouts at the chord a–b: ΔI = 0, Δb₁ = +1, Δτ = +1; |V| = 3, |E| = 3, c = 1, b₁ = 1', /0 · \+1 · \+1/.test(ro) && /^3 · 3 · 1 · 1$/.test(g), `${ro} | ${g}`);
  await input('#stepRange', 6);
  check('readouts at the sprout g: ΔI = 1/4, Δb₁ = 0', /1\/4 · 0 · \+1\/4/.test(await textOf('roStep')), await textOf('roStep'));
  await press('#stageAct');
  await until(page, () => !window.UNIVERSE_DEBUG.state.playing);
  await settle(page);
  check('next reading ▸ plays exactly one reading', (await state()).main.k === 7 && (await state()).clock === 7);
}
await pick(FLIP);
for (const v of [0, 1, 2, 3]) {
  await press(`#proofChips [data-proof="${v}"]`);
  const s = await state();
  const outside = v === 0 ? 10 : v === 1 ? 5 : 0;
  if (!(s.scene === 'flip' && s.flip.t === v && s.flip.outside === outside)) check(`proof chip ${v}`, false, JSON.stringify(s.flip));
}
{
  const s = await state();
  check('proof chips: 10 points outside at the audit, 5 after the absorption, none after the quotient, none inside', s.flip.t === 3 && s.flip.outside === 0);
  check('flip: |𝒰 \\ 𝔒| = 0 in the HUD and the readouts at the end', /\|𝒰 \\ 𝔒\| = 0/.test(await textOf('hudBig')) && /^0 · 0 · 0 · /.test(await textOf('roOutside')));
  await press('#stageAct');
  check('flip view ⇄ from inside goes back to the start of the third step', (await state()).flip.t === 2);
  await press('#stageAct');
  await until(page, () => !window.UNIVERSE_DEBUG.state.playing);
  await settle(page);
  check('flip view ⇄ from outside plays into the core', (await state()).flip.t === 3);
  const zoom = await page.evaluate(() => window.TRV.solids[0].unit);
  await press('#proofChips [data-proof="0"]');
  const out = await page.evaluate(() => window.TRV.solids[0].unit);
  check('the inside view magnifies: the scale inside the core is over twice the scale of the outside audit', zoom > 2 * out, `${zoom.toFixed(1)} vs ${out.toFixed(1)}`);
}
await pick(MONAD);
for (const o of ['B', 'C', 'A']) {
  await press(`#obsChips [data-obs="${o}"]`);
  const s = await state();
  const cur = await page.evaluate(() => window.UNIVERSE_DEBUG.state.cursor);
  check(`observer chip ${o}: the amber cursor and the staircase follow ${o}`, s.focus === o && same(s.plot.taus.map((x) => strF(nF(x))), OBSL[o].map((x) => strF(x.tau))) && Array.isArray(cur));
}
await pick(LEAN);
for (const u of [0, 1, 2, 3]) {
  await press(`#uChips [data-u="${u}"]`);
  const s = await state();
  if (!(s.lean.k === u && strF(nF(s.lean.tau)) === strF(LEANN[u].tau))) check(`state chip u${u}`, false, JSON.stringify(s.lean));
  if (u === 3) check('state chips u0 … u3 show τ = 0, 0, 3/4, 3/2', true);
}
{
  await press('#uChips [data-u="1"]');
  const t = await regimeTexts();
  check('u1: the HUD names Δ_geom = 0, Δ_topo = 0, τ = 0', /Δ_geom = 0/.test(t.sub) && /Δ_topo = 0/.test(t.sub) && /τ = 0/.test(t.sub), t.sub);
  await press('#uChips [data-u="2"]');
  check('u2: Δ_geom = 1/2, Δ_topo = 1/4, τ = 3/4, |DAG| = 1', /Δ_geom = 1\/2/.test((await regimeTexts()).sub) && /τ = 3\/4/.test((await regimeTexts()).sub) && /\|DAG\| = 1/.test((await regimeTexts()).sub));
}

/* ---------- the two lenses ---------- */
const experimentState = ({ lens, plot, cursor, camera, layers, ...experiment }) => experiment;
for (const id of IDS) {
  await pick(id);
  const a = await state();
  await setLens(1);
  const b = await state();
  const t = await regimeTexts();
  check(`lens on ${id}: only the lens changes, the state and the mathematics stay; the contrast says MODEL or Init Rat`, b.lens === 1 && same(experimentState(a), experimentState(b)) && (/MODEL/.test(t.sub + t.big + t.pills) || /Rat/.test(t.sub)), JSON.stringify([t.big, t.sub]).slice(0, 200));
  const prim = await primitives();
  check(`lens on ${id}: the open-loop contrast is drawn in magenta`, prim.seen.some((x) => x.colors.includes(prim.palette.magenta) && x.alpha > 0.4));
  await setLens(0);
  check(`lens off ${id}: the switch and its mirror are released`, (await page.$eval('#lensToggleBtn', (b) => b.getAttribute('aria-pressed'))) === 'false' && (await page.$eval('#lensMirror', (b) => b.getAttribute('aria-pressed'))) === 'false');
}

/* ---------- the amber handle ---------- */
await pick(PENTAD);
{
  const target = await page.evaluate(() => window.UNIVERSE_DEBUG.dragTarget(3));
  const from = await page.evaluate(() => window.UNIVERSE_DEBUG.dragTarget(window.UNIVERSE_DEBUG.state.clock));
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move((from.x + target.x) / 2, (from.y + target.y) / 2, { steps: 4 });
  await page.mouse.move(target.x, target.y, { steps: 6 });
  await page.mouse.up();
  await settle(page);
  const s = await state();
  check('dragging the amber handle onto the node of the third reading sets the rail there', Math.abs(s.clock - 3) < 0.05 && s.preset === null && !s.playing, `t = ${s.clock}`);
  await page.locator('#stageHandle').focus();
  await page.keyboard.press('ArrowRight');
  await settle(page);
  check('the arrow keys on the handle move it one reading', Math.abs((await state()).clock - 4) < 0.06);
}

/* ---------- colours: amber only for the cursor, never red ---------- */
{
  const bad = [];
  for (const id of IDS)
    for (const lens of [0, 1]) {
      await pick(id);
      await setLens(lens);
      if (id === PENTAD) {
        await press('#idleBtn');
        await until(page, () => window.UNIVERSE_DEBUG.state.spin === 1);
      }
      for (const v of id === LEAN ? [1.5, 3] : id === FLIP ? [0.5, 1.5, 2.5] : [1.5, 4.5, 5.5]) {
        await seek(v);
        const prim = await primitives();
        for (const x of prim.seen) {
          if (x.colors.includes(prim.palette.warn) || x.colors.includes(prim.palette.ok)) bad.push(`${id} ${x.n} ${x.key}: red or green`);
          if (x.colors.includes(prim.palette.amber) && !['current', 'halo'].includes(x.key)) bad.push(`${id} ${x.n} ${x.key}: amber`);
        }
      }
      await setLens(0);
    }
  check('the stage: amber only on the crystallization cursor, red and green nowhere, on every card, lens and moment', !bad.length, bad.slice(0, 4).join(' | '));
  const used = await page.evaluate(() => [...window.__canvasColours]);
  const warn = (await page.evaluate(() => window.TRV.palette.warn)).toLowerCase();
  check('the strips and the 2D canvases never paint in the red of the theme', !used.includes(warn), used.join(' '));
  const dom = await page.evaluate((w) => {
    const hex = w.replace('#', ''),
      rgb = `rgb(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)})`;
    return [...document.querySelectorAll('body *')].filter((el) => {
      const cs = getComputedStyle(el);
      return el.getClientRects().length && [cs.color, cs.backgroundColor, cs.borderTopColor, cs.borderLeftColor].includes(rgb);
    }).map((el) => el.id || el.className);
  }, warn);
  check('no element of the page is drawn in the red of the theme', !dom.length, dom.slice(0, 4).join(' | '));
  check('no OPEN box and no red swatch in the legend', !(await page.$('.lean.open')) && !(await page.$('#legend .sw.wn')));
}

/* ---------- the strips, against the ledgers written here ---------- */
for (const id of IDS) {
  await pick(id);
  const s = await state();
  const d = s.plot;
  if (d.kind === 'main') check(`${id}: the staircase is the main τ and the pairs strip holds |E|, C(|V|, 2) and the basis`, same(d.taus.map((x) => strF(nF(x))), MAIN.map((m) => strF(m.tau))) && same(d.edges, MAIN.map((m) => m.E.length)) && same(d.pairs, MAIN.map((m) => (m.V.length * (m.V.length - 1)) / 2)) && same(d.basis, [1, 1, 2, 3, 3, 3, 4, 4, 4, 4]) && same(d.kinds.filter((k) => k === 'taut').length, 3));
  if (d.kind === 'flip') check(`${id}: the staircase stops at the fifth reading; the quotient strip holds the shares computed here`, d.cursor === 5 && eqF(nF(d.visible), SHARE.visible) && eqF(nF(d.latent), SHARE.latent) && d.outside === 10);
  if (d.kind === 'monad') check(`${id}: three staircases and the trunk, as computed here`, ['A', 'B', 'C'].every((o) => same(d.all[o].map((x) => strF(nF(x))), OBSL[o].map((x) => strF(x.tau)))) && same(d.trunk, TRUNK));
  if (d.kind === 'lean') check(`${id}: Δ_geom, Δ_topo, τ and the axioms 0 against 4`, same(d.taus.map((x) => strF(nF(x))), ['0', '0', '3/4', '3/2']) && same(d.geom.map((x) => strF(nF(x))), ['0', '1/2', '1/2']) && same(d.topo.map((x) => strF(nF(x))), ['0', '1/4', '1/4']) && same(d.axioms, [0, 4]));
  const titles = await page.evaluate(() => [document.getElementById('plotTitle').textContent, document.getElementById('plotTitleB').textContent]);
  check(`${id}: both strips carry a title`, titles.every((x) => x.length > 8));
}

/* ---------- every printed relation tells the truth, in both languages ---------- */
{
  const bad = [];
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    for (const id of IDS)
      for (const lens of [0, 1]) {
        await pick(id);
        await setLens(lens);
        const t = await regimeTexts();
        const text = Object.values(t).join(' ¶ ');
        bad.push(...wrongDecimals(text).map((x) => `${lang} ${id}: ${x}`), ...mixed(text).map((x) => `${lang} ${id} mixed: ${x}`));
        await setLens(0);
      }
    const num = await textOf('basis');
    bad.push(...wrongDecimals(num).map((x) => `${lang} NUM: ${x}`), ...mixed(num).map((x) => `${lang} NUM mixed: ${x}`));
  }
  check('every “p/q = …” is exact and every “p/q ≈ …” rounds, and no rounded value stands beside an inequality, in both languages', !bad.length, bad.slice(0, 4).join(' | '));
}
{
  await setLang('en');
  const num = await page.evaluate(() => document.querySelector('#basis .lean.num .en').textContent);
  check('NUM box (en): the main τ list, the end values, the shares and the three proper times computed here', num.includes(MAIN.map((m) => strF(m.tau)).join(', ')) && num.includes(`τA = 17/4`) && num.includes('τB = 13/3') && num.includes('τC = 19/4') && num.includes(strF(SHARE.visible)) && num.includes('0 failures') && !/[1-9]\d* failures/.test(num), num.slice(0, 160));
  check('NUM box (en): the Lean measurement and “not a proof”', num.includes('does not depend on any axioms') && num.includes(LEAN_RUN.rat.join(', ')) && /not a proof/.test(num));
  await page.click('#infoBtn');
  const copies = await page.$$eval('#drawerEvidence .lean', (els) => els.length);
  const spans = await page.$$eval('#drawer .en [data-bench]', (els) => els.map((e) => e.textContent));
  check('the drawer repeats the nineteen evidence boxes and fills its numbers', copies === 19 && spans.every((x) => x && x !== '—') && spans[0] === '17/4 = 4.2500' && spans[1] === '= 3', JSON.stringify(spans));
  await page.keyboard.press('Escape');
  await setLang('zh');
}

/* ---------- the note of the tour bar stays within two lines at 305 px, in both languages and both lenses ---------- */
{
  const narrow = await T.open(BOOK, ID, '?lang=zh', { viewport: { width: 305, height: 760 } });
  await settle(narrow, 300);
  const tall = [];
  for (const lang of ['zh', 'en']) {
    await setLang(lang, narrow);
    for (const id of IDS) {
      await pick(id, narrow);
      for (const lens of [0, 1]) {
        await setLens(lens, narrow);
        const h = await narrow.evaluate(() => {
          const n = document.querySelector('#tourBody .tour-note');
          return n ? n.getBoundingClientRect().height : -1;
        });
        if (!(h > 0 && h <= 34)) tall.push(`${lang} ${id} lens ${lens}: ${h.toFixed(1)}px`);
      }
      await setLens(0, narrow);
    }
  }
  check('305 px: the note of #tourBody takes at most two lines (≤ 34 px) on every card, both lenses and both languages', !tall.length, tall.slice(0, 4).join(' | '));
  check('305 px: nothing scrolls sideways and the mirror lens is in the tour bar', (await overflowX(narrow)) <= 0 && (await narrow.locator('#lensMirror').isVisible()));
  await narrow.context().close();
}

/* ---------- the lens switch on the first screen of the phone and full chapter embed ---------- */
async function checkMirrorLayout(p, label) {
  const geo = await p.evaluate(() => {
    const tour = document.querySelector('#tour');
    const mirror = document.querySelector('#lensMirror');
    const box = (el) => el.getBoundingClientRect().toJSON();
    const tourBox = box(tour);
    const mirrorBox = box(mirror);
    const viewport = { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
    const inside = (a, b) => a.width > 0 && a.height > 0 && a.left >= b.left && a.right <= b.right && a.top >= b.top && a.bottom <= b.bottom;
    const overlaps = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    const covered = (el, rect) => {
      const xs = [rect.left + 2, (rect.left + rect.right) / 2, rect.right - 2];
      const ys = [rect.top + 2, (rect.top + rect.bottom) / 2, rect.bottom - 2];
      return xs.some((x) => ys.some((y) => !el.contains(document.elementFromPoint(x, y))));
    };
    const neighbors = [...tour.querySelectorAll('button, #tourBody > *')].filter((el) => el !== mirror && el.getClientRects().length);
    return {
      tour: tourBox,
      mirror: mirrorBox,
      viewport,
      fits: scrollY === 0 && tour.contains(mirror) && inside(tourBox, viewport) && inside(mirrorBox, tourBox),
      clipped: [[tour, tourBox], [mirror, mirrorBox]].some(([el, rect]) => el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight || covered(el, rect)),
      tourOverlaps: ['#stage', '.strip'].filter((selector) => overlaps(tourBox, box(document.querySelector(selector)))),
      mirrorOverlaps: neighbors.filter((el) => overlaps(mirrorBox, box(el))).map((el) => el.id || el.className || el.tagName)
    };
  });
  return check(`${label}: the tour and mirror lens switch fit the first screen without clipping or overlap`, geo.fits && !geo.clipped && !geo.tourOverlaps.length && !geo.mirrorOverlaps.length, JSON.stringify(geo));
}
for (const lang of ['zh', 'en']) {
  for (const [label, query, viewport] of [
    [`phone ${lang} 390 × 844`, `?lang=${lang}`, { width: 390, height: 844 }],
    [`full lab embed ${lang} 740 × 620`, `?embed=1&lang=${lang}`, { width: 740, height: 620 }]
  ]) {
    const p = await T.open(BOOK, ID, query, { viewport, reducedMotion: 'reduce' });
    // Park a non-default card so resetting the experiment would fail the comparison.
    await pick(LEDGER, p);
    const before = await state(p);
    const pressed = () => Promise.all(['#lensMirror', '#lensToggleBtn'].map((selector) => p.getAttribute(selector, 'aria-pressed')));
    check(`${label}: the ledger is parked and both lens switches start released`, before.preset === LEDGER && before.clock === CARDS[LEDGER].still && !before.playing && before.lens === 0 && same(await pressed(), ['false', 'false']));
    for (const lens of [1, 0]) {
      // Measure before the click, which can scroll a control into view.
      if (!(await checkMirrorLayout(p, `${label} lens ${1 - lens}`))) break;
      await p.click('#lensMirror');
      await settle(p);
      const after = await state(p);
      const aria = await pressed();
      const expected = String(lens === 1);
      check(`${label}: clicking the mirror sets lens ${lens} and syncs both switches`, after.lens === lens && same(aria, [expected, expected]), JSON.stringify({ lens: after.lens, aria }));
      check(`${label} lens ${lens}: clicking the mirror preserves the experiment state`, same(experimentState(before), experimentState(after)));
    }
    await p.context().close();
  }
}

/* ---------- the stills of the cited cards: the frame the caption describes ---------- */
for (const lang of ['zh', 'en']) {
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const s = await state(p);
    const want = {
      [PENTAD]: () => s.main.k === 9 && strF(nF(s.main.tau)) === '17/4',
      [LEDGER]: () => s.main.k === 5 && s.main.kind === 'chord' && strF(nF(s.main.tau)) === '2' && s.main.b1 === 1,
      [FLIP]: () => s.flip.t === 3 && s.flip.outside === 0 && s.regime === 'gaze',
      [MONAD]: () => s.monad.k === 7 && same(['A', 'B', 'C'].map((o) => strF(nF(s.monad.taus[o]))), ['17/4', '13/3', '19/4']) && s.monad.trunk.nodes.length === 4 && s.monad.trunk.edges.length === 6,
      [LEAN]: () => s.lean.k === 3 && strF(nF(s.lean.tau)) === '3/2' && s.lean.dag === 2 && s.lean.basis === 3
    }[id];
    check(`still ${lang} ${id}: parked on the frame of the caption, handle hidden, amber ring kept`, s.preset === id && want() && !s.playing && (await p.locator('#stageHandle').isHidden()));
    check(`still ${lang} ${id}: the mirror lens switch is hidden`, await p.locator('#lensMirror').isHidden());
    if (lang === 'en') {
      const left = await cjkLeftovers(p);
      check(`still en ${id}: no Chinese`, !left.length, left.slice(0, 2).join(' | '));
    }
    await p.context().close();
  }
}

/* ---------- layouts: desktop through the cards, the cited figure of the chapter, the phone ---------- */
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    await pick(id);
    await layout(page, `desktop ${lang} ${id}`);
    check(`desktop ${lang} ${id}: the mirror lens switch is hidden`, await page.locator('#lensMirror').isHidden());
  }
}
for (const id of IDS) {
  for (const w of [334, 740]) {
    const p = await T.open(BOOK, ID, `?embed=1&lang=zh&preset=${id}`, { viewport: { width: w, height: 540 } });
    await settle(p, 300);
    await pause(p);
    await layout(p, `cited figure ${id} ${w} × 540`, true);
    check(`cited figure ${id} ${w} × 540: the mirror lens switch is hidden`, await p.locator('#lensMirror').isHidden());
    const share = await solidPixels(p);
    check(`cited figure ${id} ${w} × 540: a lit body is drawn`, share && share.share > 0.08, JSON.stringify(share && share.share));
    await p.context().close();
  }
}

check('permanent dark console: nothing writes data-tr-palette', !paletteMutations.length, JSON.stringify(paletteMutations.slice(0, 2)));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
