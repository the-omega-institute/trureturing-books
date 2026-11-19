// CHORD//TUNNEL browser regression: the shared stage-first gate, every reader control, and every number the page
// claims, checked against algorithms written here (not the page's own functions).
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, while VIZ_SLOW_FRAMES=1000
// exercises every transition and playback assertion with deliberately sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps, capitalGreek } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'trihedron-chord-pivot-tunneling-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'walls-dijkstra-tax': { scene: 'walls', eps: 60, k: 1, logN: 5, zeno: 1, still: 0.5 },
  'cap-wavefront-relax': { scene: 'cap', eps: 60, k: 3, logN: 5, zeno: 0, still: 0.7 },
  'flat-chord-tunnel': { scene: 'chord', eps: 60, k: 3, logN: 5, zeno: 0, still: 0.5 },
  'holographic-pivot-cone': { scene: 'cone', eps: 90, k: 3, logN: 6, zeno: 0, still: 1 },
  'resonant-pivot-relay': { scene: 'relay', eps: 75, k: 3, logN: 5, zeno: 0, still: 0.5 }
};
const GIDS = [
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion',
  'D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition'
];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s26-chord-tunneling-and-pivot-renormalization.html#sec-ch34-chord-tunneling-and-pivot-renormalization`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const T = await session();
const { page, check } = T;

// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watchedPages = new WeakSet();
function watchPage(p) {
  if (watchedPages.has(p)) return;
  watchedPages.add(p);
  p.on('console', (m) => {
    if ((m.type() === 'info' || m.type() === 'warning') && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
// The shared night console: no page may write data-tr-palette, not even for a moment.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__chordPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__chordPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__chordPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => { const context = await browserNewContext(options); await watchPalette(context); return context; };
watchPage(page);

// The shared gate covers the canonical desktop, short-screen, rail, embed, figure, phone and cover paths and the solid.
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

/* ---------- independent geometry (written here, not taken from the page) ---------- */
const D2R = Math.PI / 180;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.hypot(a[0], a[1], a[2]);
const unit = (a) => mul(a, 1 / norm(a));
/** Great-circle angle by atan2(|u × v|, u·v): another formula than the page's arccos. */
const gc = (u, v) => Math.atan2(norm(cross(u, v)), dot(u, v));
function corners(epsDeg) {
  const e = epsDeg * D2R;
  return { e, A: [Math.sin(e), Math.cos(e), 0], B: [0, 1, 0], C: [0, Math.cos(e), Math.sin(e)] };
}
/** Spherical excess from the three vertex angles (tangent vectors), not from Girard's half-angle formula. */
function excess(P, Q, R) {
  const angle = (V, X, Y) => { const tx = unit(sub(X, mul(V, dot(X, V)))), ty = unit(sub(Y, mul(V, dot(Y, V)))); return Math.acos(Math.max(-1, Math.min(1, dot(tx, ty)))); };
  return angle(P, Q, R) + angle(Q, R, P) + angle(R, P, Q) - Math.PI;
}
/** Cholesky: true when every pivot is positive (the matrix is positive definite). */
function cholesky(M) {
  const n = M.length, Lm = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let s = M[i][j]; for (let k = 0; k < j; k++) s -= Lm[i][k] * Lm[j][k];
    if (i === j) { if (!(s > 0)) return null; Lm[i][i] = Math.sqrt(s); } else Lm[i][j] = s / Lm[j][j];
  }
  return Lm;
}
function invert(M) {
  const n = M.length, A = M.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    const d = A[c][c]; for (let j = 0; j < 2 * n; j++) A[c][j] /= d;
    for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c]; for (let j = 0; j < 2 * n; j++) A[r][j] -= f * A[c][j]; }
  }
  return A.map((r) => r.slice(n));
}
/** Transmission through constant layers with real (ψ, ψ′) propagation matrices: T = 4 / ((m11 + m22)² + (k m12 − m21/k)²). */
function transmissionABCD(E, layers) {
  let m = [[1, 0], [0, 1]];
  for (const { V, w } of layers) {
    let P;
    if (E > V) { const q = Math.sqrt(E - V); P = [[Math.cos(q * w), Math.sin(q * w) / q], [-q * Math.sin(q * w), Math.cos(q * w)]]; }
    else { const q = Math.sqrt(V - E); P = [[Math.cosh(q * w), Math.sinh(q * w) / q], [q * Math.sinh(q * w), Math.cosh(q * w)]]; }
    m = [[P[0][0] * m[0][0] + P[0][1] * m[1][0], P[0][0] * m[0][1] + P[0][1] * m[1][1]], [P[1][0] * m[0][0] + P[1][1] * m[1][0], P[1][0] * m[0][1] + P[1][1] * m[1][1]]];
  }
  const k = Math.sqrt(E);
  return 4 / ((m[0][0] + m[1][1]) ** 2 + (k * m[0][1] - m[1][0] / k) ** 2);
}
/** Every simple path from A (0) to C (1) through the allowed interior vertices: the minimum of their weights. */
function bruteMinPath(W, allowed) {
  let best = Infinity;
  const walk = (u, seen, w) => {
    if (u === 1) { best = Math.min(best, w); return; }
    for (let v = 0; v < 6; v++) {
      if (seen.has(v) || !Number.isFinite(W[u][v]) || u === v) continue;
      if (v > 1 && !allowed.includes(v)) continue;
      seen.add(v); walk(v, seen, w + W[u][v]); seen.delete(v);
    }
  };
  walk(0, new Set([0]), 0);
  return best;
}

/** Every claim of the state s, recomputed here. */
function checkMath(s, tag) {
  const { e, A, B, C } = corners(s.epsDeg);
  const N = 2 ** s.logN;
  check(`${tag}: corners A, B, C on the unit sphere at ε`, near(s.epsRad, e, 1e-14) && [[s.A, A], [s.B, B], [s.C, C]].every(([p, q]) => p.every((x, i) => near(x, q[i], 1e-14))) && s.N === N);
  const Lw = 2 * e, Lc = gc(A, C), Lt = norm(sub(A, C));
  check(`${tag}: three route lengths (2ε, great-circle arc, chord)`, near(s.L_walls, Lw, 1e-12) && near(s.L_cap, Lc, 1e-12) && near(s.L_tunnel, Lt, 1e-12)
    && near(Lt, Math.SQRT2 * Math.sin(e), 1e-12) && near(Lt, 2 * Math.sin(Lc / 2), 1e-12) && near(Math.cos(Lc), Math.cos(e) ** 2, 1e-12));
  check(`${tag}: strict order L_tunnel < L_cap < L_walls`, s.orderHolds === true && Lt < Lc && Lc < Lw);
  const rm = norm(mul(add(A, C), 0.5));
  check(`${tag}: chord midpoint radius and bulge depth`, near(s.rMid, rm, 1e-12) && near(s.dr, 1 - Math.sqrt(1 - Math.sin(e) ** 2 / 2), 1e-12) && s.dr > 0
    && s.M.every((x, i) => near(x, (A[i] + C[i]) / 2, 1e-14)) && near(norm(s.Q), 1, 1e-12) && near(dot(unit(s.M), s.Q), 1, 1e-12));
  check(`${tag}: cap excess from the vertex angles`, near(s.omega, excess(A, B, C), 1e-9) && s.omega > 0);
  // FS angle triangle inequality on (A, B, C) and Lagrange's identity on (A, C)
  const fs = (u, v) => Math.acos(Math.min(1, Math.abs(dot(u, v))));
  check(`${tag}: FS angles fsAngle(A,B) = fsAngle(B,C) = ε and fsAngle(A,C) = arc AC ≤ 2ε`, near(s.fsAngle.AB, e, 1e-7) && near(s.fsAngle.BC, e, 1e-7)
    && near(s.fsAngle.AC, fs(A, C), 1e-12) && s.fsAngle.AC <= s.fsAngle.AB + s.fsAngle.BC);
  let wedge = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge += (A[i] * C[j] - A[j] * C[i]) ** 2;
  check(`${tag}: Lagrange identity both sides = 1 − cos⁴ε = chord² · r_mid²`, near(s.lagrange.lhs, 1 - Math.cos(e) ** 4, 1e-12) && near(s.lagrange.rhs, wedge / 2, 1e-12)
    && near(s.lagrange.lhs, s.lagrange.rhs, 1e-12) && near(s.lagrange.lhs, Lt * Lt * rm * rm, 1e-12));
  // the six-vertex min-plus graph [A, C, B, Q, M, O]
  const Q = unit(add(A, C)), M = mul(add(A, C), 0.5), O = [0, 0, 0];
  const W = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? 0 : Infinity)));
  const put = (i, j, w) => { W[i][j] = W[j][i] = w; };
  put(0, 2, gc(A, B)); put(2, 1, gc(B, C)); put(0, 3, gc(A, Q)); put(3, 1, gc(Q, C)); put(0, 4, norm(sub(A, M))); put(4, 1, norm(sub(M, C)));
  put(0, 5, norm(A)); put(5, 1, norm(C)); put(4, 5, norm(M));
  const allowed = s.zenoProbe ? [2] : [2, 3, 4, 5], best = bruteMinPath(W, allowed);
  check(`${tag}: tropical Schur W_eff(A, C) equals the brute-force best path`, near(s.schur.effective, best, 1e-12) && near(s.schur.eliminated, best, 1e-12)
    && s.schur.residual < 1e-12 && s.schur.route === (s.zenoProbe ? 'walls' : 'chord') && near(best, s.zenoProbe ? Lw : Lt, 1e-12)
    && same(s.schur.fill, [['A', 'C']]));
  // the PSD completion on the chordal graph with cliques {A,B,C}, {A,Q,C}, {A,C,M,O}
  const pts = [A, C, B, Q, M, O], sig = 0.6, ker = (i, j) => Math.exp(-(norm(sub(pts[i], pts[j])) ** 2) / (2 * sig * sig));
  const edges = [[0, 1], [0, 2], [2, 1], [0, 3], [3, 1], [0, 4], [4, 1], [0, 5], [5, 1], [4, 5]], spec = (i, j) => i === j || edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i));
  const X = s.completion.completed;
  let match = 0, sym = 0; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { sym = Math.max(sym, Math.abs(X[i][j] - X[j][i])); if (spec(i, j)) match = Math.max(match, Math.abs(X[i][j] - ker(i, j))); }
  const Xi = invert(X); let zeros = 0; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) if (!spec(i, j)) zeros = Math.max(zeros, Math.abs(Xi[i][j]));
  const cliquesPD = [[0, 1, 2], [0, 1, 3], [0, 1, 4, 5]].every((c) => !!cholesky(c.map((i) => c.map((j) => ker(i, j)))));
  check(`${tag}: chordal completion keeps the given entries, is PSD, and is the max-det one`, sym < 1e-12 && match < 1e-9 && !!cholesky(X) && s.completion.lambdaMin > 0
    && zeros < 1e-8 && cliquesPD && s.completion.filled.length === 5, `match ${match} zeros ${zeros}`);
  // the pivot cone: Sierpiński leaves, levels, fibres, partition, Dijkstra
  const H = s.hierarchy, k = s.k;
  check(`${tag}: N = 2^D leaves tile the cap`, H.N === N && H.D === s.logN && H.leaves.length === N
    && near(H.leaves.reduce((a, lf) => a + excess(...lf.ids.map((x) => H.verts[x])), 0), excess(A, B, C), 1e-9)
    && H.verts.every((v) => near(norm(v), 1, 1e-12)));
  const counts = [N]; if (k >= 2) while (counts[counts.length - 1] > 1) counts.push(Math.ceil(counts[counts.length - 1] / k));
  check(`${tag}: level counts ⌈n/k⌉ down to one pivot`, same(H.counts, counts) && H.depth === counts.length - 1);
  let fibresOk = true, radiiOk = true;
  for (let l = 1; l < H.levels.length; l++) {
    const prev = H.levels[l - 1].length, seen = [];
    H.levels[l].forEach((nd, j) => {
      nd.children.forEach((c) => seen.push(c));
      if (!same(nd.children, Array.from({ length: Math.min(prev, j * k + k) - j * k }, (_, t) => j * k + t))) fibresOk = false;
      const vs = new Set(); for (let i = nd.lo; i < nd.hi; i++) H.leaves[i].ids.forEach((x) => vs.add(x));
      const list = [...vs]; let th = 0; for (let a = 0; a < list.length; a++) for (let b = a + 1; b < list.length; b++) th = Math.max(th, gc(H.verts[list[a]], H.verts[list[b]]));
      if (!near(nd.r, Math.cos(th / 2), 1e-9) || !near(norm(nd.pos), nd.r, 1e-12) || !(nd.r < 1)) radiiOk = false;
    });
    if (!same(seen, Array.from({ length: prev }, (_, i) => i))) fibresOk = false;
  }
  check(`${tag}: fibre decomposition: every point in exactly one pivot's fibre, Σ|fibre| = |X| at every level`, fibresOk && H.partition.roundTrip && H.partition.levelSums);
  check(`${tag}: each pivot sits at r = cos(θ/2) of the region it gathers`, radiiOk);
  if (H.depth) check(`${tag}: the deepest pivot sits as deep as the chord midpoint`, near(H.apex.r, rm, 1e-9) && near(H.apex.theta, Lc, 1e-9));
  const classes = k >= 2 ? Math.ceil(N / k) : N, sizes = Array.from({ length: classes }, (_, b) => Array.from({ length: N }, (_, i) => i).filter((i) => (k >= 2 ? Math.floor(i / k) : i) === b).length);
  check(`${tag}: partition kernel: ${classes} inseparable classes, Σ|fibre|² inseparable pairs`, H.partition.classes === classes && H.partition.agree === N * N
    && H.partition.inseparable === sizes.reduce((a, x) => a + x * x, 0) && same(H.partition.fiberSizes, sizes));
  // Dijkstra on the leaf graph rebuilt here (leaves sharing two vertices)
  const adj = Array.from({ length: N }, () => []); let m = 0;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (H.leaves[i].ids.filter((x) => H.leaves[j].ids.includes(x)).length === 2) {
    const w = gc(H.leaves[i].pos, H.leaves[j].pos); adj[i].push([j, w]); adj[j].push([i, w]); m++;
  }
  const dist = new Array(N).fill(Infinity), done = new Array(N).fill(false); dist[0] = 0;
  for (let it = 0; it < N; it++) { let u = -1; for (let x = 0; x < N; x++) if (!done[x] && (u < 0 || dist[x] < dist[u])) u = x; done[u] = true; for (const [v, w] of adj[u]) dist[v] = Math.min(dist[v], dist[u] + w); }
  check(`${tag}: Dijkstra settle order on the leaf graph`, H.m === m && H.order.length === N && new Set(H.order).size === N
    && H.order.every((x, i) => i === 0 || dist[x] >= dist[H.order[i - 1]] - 1e-12) && H.dist.every((d, i) => near(d, dist[i], 1e-9)));
  check(`${tag}: comparison indices n log₂ n and m log^{2/3} n`, H.sortTax === N * s.logN && near(H.dmmsy, m * s.logN ** (2 / 3), 1e-9) && H.fredmanTarjan === m + N * s.logN);
  // the relay: closed-form thick barrier, a real-matrix resonance check, and the Zeno transfer
  const R = s.relay, Eb = 16, V0 = 32, kap = 4, sh = Math.sinh(kap * Lt);
  check(`${tag}: thick barrier transmission equals the closed form`, near(R.L, Lt, 1e-12) && Math.abs(R.Tthick / (1 / (1 + V0 * V0 * sh * sh / (4 * Eb * (V0 - Eb)))) - 1) < 1e-8
    && near(R.action, kap * Lt, 1e-12));
  const Td = (d) => transmissionABCD(Eb, [{ V: V0, w: Lt / 2 }, { V: 0, w: d }, { V: V0, w: Lt / 2 }]);
  check(`${tag}: the relay sits on a resonance (T ≈ 1, a local maximum in the well width)`, R.d > 0 && R.d <= Math.PI / 4 + 1e-12 && Math.abs(Td(R.d) - R.T) < 1e-7
    && R.T > 0.9999 && Td(R.d + 2e-4) <= R.T + 1e-9 && Td(Math.max(1e-9, R.d - 2e-4)) <= R.T + 1e-9 && R.T >= R.Tthick, `T ${R.T} d ${R.d} thick ${R.Tthick}`);
  check(`${tag}: Zeno transfer 1 − cos²ⁿ(π/2n) with n = N`, near(R.zeno, 1 - Math.cos(Math.PI / (2 * N)) ** (2 * N), 1e-14) && R.zeno < 0.5);
}

/* ---------- source and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((file) => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: no literal colour or palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source) && !/\btrPalette\b|data-tr-palette/.test(source));
}
check('source: shared three-column grid, wheel:false, a looping clock', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five public presets stay in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((x) => x[1]), Object.keys(CARDS)));
check('source: no green tick outside the evidence boxes in the script', !/okmark/.test(sources['main.js']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §30.1 entry with five bilingual cards and the five theorems', !!entry && entry.status === 'live' && entry.chapter === 30 && entry.section === '30.1'
  && entry.code === 'CHORD//TUNNEL' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.theory.some((t) => t.href === THEORY[0].replace('../../', '../') && t.href_en === THEORY[1].replace('../../', '../')));

/* ---------- runtime: contract, links, cards ---------- */
const state = (p = page) => p.evaluate(() => window.CHORD_TUNNEL_DEBUG.state);
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => { const s = window.CHORD_TUNNEL_DEBUG.state; return s.scene === q.scene && Math.abs(s.epsDeg - q.eps) < 1e-9 && s.k === q.k && s.logN === q.logN && s.zenoProbe === q.zeno; }, CARDS[card]);
  await pause(p);
}
async function checkLinks(p, tag) {
  check(`${tag}: exact Lean evidence links in green boxes`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, one MODEL and one NUM box`, same(await p.$$eval('#evidence .lean:not([class="lean"])', (els) => els.map((e) => e.className).sort()), ['lean argued', 'lean model', 'lean num']));
  check(`${tag}: exact bilingual theory link`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('runtime: shared scripts and styles only', same(await page.$$eval('script', (els) => els.map((e) => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', (els) => els.map((e) => e.getAttribute('href')).filter((h) => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
await checkLinks(page, 'runtime');
check('layout: three-column lab, stage with the strip below it, readouts and evidence on the right', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip')
    && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot') && !!document.querySelector('#stage > button.handle#epsHandle')
    && document.querySelectorAll('#stage > .hud-tr#sceneChips [data-scene]').length === 5;
}));
check('layout: #rail is the left deck; #infoBtn opens #evidence, above every evidence box', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck'), ev = document.querySelector('.app.lab > .side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#rail').length === 1 && document.querySelector('#rail') === deck && document.querySelectorAll('#infoBtn').length === 1
    && ev.firstElementChild === btn && btn.matches('button.chip') && boxes.length > 0
    && boxes.every((b) => (btn.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) && top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('debug probe: window.CHORD_TUNNEL_DEBUG is frozen and read-only', await page.evaluate(() => Object.isFrozen(window.CHORD_TUNNEL_DEBUG) && typeof window.CHORD_TUNNEL_DEBUG.setState === 'function'));

for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), q = CARDS[card];
    check(`${lang}/${card}: the card sets scene, ε, k, N, the probe and its still`, s.preset === card && s.scene === q.scene && s.epsDeg === q.eps && s.k === q.k && s.logN === q.logN
      && s.zenoProbe === q.zeno && !s.playing && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')) === q.still
      && await page.locator(`#sceneChips [data-scene="${q.scene}"]`).getAttribute('aria-pressed') === 'true');
    checkMath(s, `${lang}/${card}`);
  }
}

// What each card's caption says, read off the page.
{
  await pick('walls-dijkstra-tax'); let s = await state();
  check('walls card: route 2ε = 2.094 and the sort n log₂ n = 160 at B', s.route === 'walls' && s.L_walls.toFixed(3) === '2.094' && s.hierarchy.sortTax === 160);
  await pick('cap-wavefront-relax'); s = await state();
  check('cap card: arc 1.318 < 2.094, Ω = 36.87°', s.route === 'cap' && s.L_cap.toFixed(3) === '1.318' && (s.omega / D2R).toFixed(2) === '36.87');
  await pick('flat-chord-tunnel'); s = await state();
  check('chord card: chord 1.225, r = 0.791, Δr = 0.209, W_eff via M', s.route === 'chord' && s.L_tunnel.toFixed(3) === '1.225' && s.rMid.toFixed(3) === '0.791' && s.dr.toFixed(3) === '0.209' && s.schur.route === 'chord');
  await pick('holographic-pivot-cone'); s = await state();
  check('cone card: 64 → 22 → 8 → 3 → 1, apex r = 0.707', same(s.hierarchy.counts, [64, 22, 8, 3, 1]) && s.hierarchy.apex.r.toFixed(3) === '0.707' && s.route === 'pivots');
  await pick('resonant-pivot-relay'); s = await state();
  check('relay card: thick barrier 7.18×10⁻⁵, relay T = 1.0000', s.relay.Tthick.toExponential(2) === '7.18e-5' && s.relay.T.toFixed(4) === '1.0000' && s.route === 'chord');
}

/* ---------- every control, with the identities after each ---------- */
await pick('flat-chord-tunnel');
for (const eps of [10, 25.5, 45, 60, 89.75, 90]) {
  await input('#epsDeg', eps); const s = await state();
  check(`ε slider ${eps}: state, output and the leave-the-card rule`, s.epsDeg === eps && s.preset === null && !s.playing && (await page.textContent('output[for="epsDeg"]')).startsWith(eps.toFixed(1)));
  checkMath(s, `ε=${eps}`);
}
for (const k of [1, 2, 3, 4]) {
  await input('#kWindow', k); const s = await state();
  check(`k slider ${k}: state and output`, s.k === k && (await page.textContent('output[for="kWindow"]')).trim() === `k = ${k}`);
  checkMath(s, `k=${k}`);
}
for (const logN of [3, 4, 5, 6, 7]) {
  await input('#graphScale', logN); const s = await state();
  check(`N slider ${2 ** logN}: state and output`, s.logN === logN && s.N === 2 ** logN && (await page.textContent('output[for="graphScale"]')).trim() === `N = ${2 ** logN}`);
  checkMath(s, `N=${2 ** logN}`);
}
for (const z of [1, 0]) {
  await page.click(`#zenoProbe [data-zeno="${z}"]`); await settle(page); const s = await state();
  check(`Zeno probe ${z}: chip pressed, route ${z ? 'back on the walls' : 'through the chord'}`, s.zenoProbe === z && s.route === (z ? 'walls' : 'chord')
    && await page.locator(`#zenoProbe [data-zeno="${z}"]`).getAttribute('aria-pressed') === 'true' && near(s.schur.effective, z ? s.L_walls : s.L_tunnel, 1e-12));
  checkMath(s, `zeno=${z}`);
}
for (const scene of ['walls', 'cap', 'chord', 'cone', 'relay']) {
  await page.click(`#sceneChips [data-scene="${scene}"]`); await settle(page); const s = await state();
  check(`scene chip ${scene}: scene, route and pressed chip`, s.scene === scene && s.preset === null
    && s.route === ({ walls: 'walls', cap: 'cap', chord: 'chord', cone: s.k >= 2 ? 'pivots' : 'crawl', relay: 'chord' })[scene]
    && await page.locator(`#sceneChips [data-scene="${scene}"]`).getAttribute('aria-pressed') === 'true');
}
// the rail: the progress τ of the read head moves the head along the chord, from A through M to C
await page.click('#sceneChips [data-scene="chord"]'); await settle(page);
for (const tau of [0, 0.25, 0.5, 1]) {
  await input('#now', tau);
  const r = await page.evaluate(() => { const st = window.CHORD_TUNNEL_DEBUG.state, b = document.getElementById('stage').getBoundingClientRect(), el = document.getElementById('stage');
    return { st, head: st.stageFrame.head && { x: b.left + el.clientLeft + st.stageFrame.head[0], y: b.top + el.clientTop + st.stageFrame.head[1] } }; });
  const want = await page.evaluate((p) => window.CHORD_TUNNEL_DEBUG.project(p), r.st.A.map((x, i) => x + (r.st.C[i] - x) * tau));
  check(`rail τ = ${tau}: the amber head sits at A + τ(C − A) on the chord`, near(r.st.tau, tau, 1e-12) && r.st.route === 'chord' && !!r.head && Math.hypot(r.head.x - want.x, r.head.y - want.y) < 0.5);
}

// Drag the amber ring on A along the wall z = 0: ε follows, the camera does not turn.
await input('#epsDeg', 60); await settle(page);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), hb = await page.evaluate(() => window.CHORD_TUNNEL_DEBUG.handleBox()), target = await page.evaluate(() => window.CHORD_TUNNEL_DEBUG.epsPoint(30));
  const onA = await page.evaluate((p) => window.CHORD_TUNNEL_DEBUG.project(p), before.A);
  check('ε handle: the projected button sits on A and is visible', !!hb && await page.locator('#epsHandle').isVisible() && Math.hypot(hb.x - onA.x, hb.y - onA.y) < 1.5);
  if (hb && target) {
    await page.mouse.move(hb.x, hb.y); await page.mouse.down();
    check('ε handle: pointerdown enters the dragging state', await page.locator('#epsHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('ε handle: dragging A to the 30° point sets ε ≈ 30° without turning the camera', Math.abs(after.epsDeg - 30) <= 0.5 && same(after.camera, before.camera)
      && !(await page.locator('#epsHandle').evaluate((el) => el.classList.contains('dragging'))), `ε ${after.epsDeg}`);
    checkMath(after, 'after drag');
  }
  await page.focus('#epsHandle'); const e0 = (await state()).epsDeg;
  await page.keyboard.press('ArrowRight'); await settle(page);
  check('ε handle: → on the focused ring adds 1°', near((await state()).epsDeg, Math.min(90, e0 + 1), 1e-12));
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
}

// A drag on the empty stage turns the camera and leaves ε alone.
{
  const before = await state(), box = await page.evaluate(() => { const r = document.getElementById('stage').getBoundingClientRect(); return [r.left + r.width * 0.92, r.top + r.height * 0.55]; });
  await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] - 60, box[1] - 20, { steps: 6 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check('orbit: a drag on empty stage turns the camera, ε unchanged', after.epsDeg === before.epsDeg && (after.camera.yaw !== before.camera.yaw || after.camera.pitch !== before.camera.pitch));
}

await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play: ▶ advances the progress τ', await playsAfter(page, () => page.click('#play'), () => window.CHORD_TUNNEL_DEBUG.state));
await pause();
{ const paused = await state(); await settle(page, 50); check('pause holds τ', !paused.playing && same((await state()).tau, paused.tau)); }

// The order of the three routes, degree by degree, by the page's probe and recomputed here.
{
  const sweep = await page.evaluate(() => Array.from({ length: 81 }, (_, i) => window.CHORD_TUNNEL_DEBUG.sweep(10 + i)));
  let ok = true;
  sweep.forEach((r, i) => { const { e, A, C } = corners(10 + i), Lc = gc(A, C), Lt = norm(sub(A, C)); if (!(near(r.L_cap, Lc, 1e-12) && near(r.L_tunnel, Lt, 1e-12) && near(r.L_walls, 2 * e, 1e-12) && Lt < Lc && Lc < 2 * e)) ok = false; });
  check('NUM: L_tunnel < L_cap < L_walls at every whole degree of [10°, 90°]', ok && sweep.length === 81);
}

/* ---------- desktop, phone and the 334 × 520 cited figure, in both languages and on every card ---------- */
const VIEWS = [['desktop', 1440, 900, ''], ['phone', 390, 844, '']];
for (const lang of ['zh', 'en']) for (const [kind, width, height, q] of VIEWS) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${q}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  const tag = `${kind} ${width}×${height} ${lang}`;
  await checkLinks(p, tag);
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: the card applies`, s.preset === card && !s.playing);
    const view = await stageView(p, '#stage', false), overlaps = await labelOverlaps(p, '.stage .tag', 0), caps = await capitalGreek(p);
    check(`${tag}/${card}: stage layout, HUD, labels, capitals and overflow`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && caps.length === 0 && await overflowX(p) <= 0,
      [...view.layout, ...view.hud, ...overlaps.map((o) => o.join(' / ')), ...caps].slice(0, 4).join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no visible Chinese`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: palette still absent`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await T.open(BOOK, ID, `?embed=1&preset=${card}&lang=${lang}`, { viewport: { width: 334, height: 520 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
  const tag = `cited 334×520 ${lang}/${card}`, s = await state(p);
  check(`${tag}: opens on the card as a figure`, s.preset === card && await p.evaluate(() => TRV.figure && TRV.embed));
  const view = await stageView(p, '#stage', true), overlaps = await labelOverlaps(p), strict = await labelOverlaps(p, '.stage .tag', 0), caps = await capitalGreek(p);
  check(`${tag}: stageView layout [] and hud []`, view.layout.length === 0 && view.hud.length === 0, [...view.layout, ...view.hud].slice(0, 4).join(' | '));
  check(`${tag}: labels apart, no capital Greek, no sideways scroll`, overlaps.length === 0 && strict.length === 0 && caps.length === 0 && await overflowX(p) === 0);
  if (lang === 'en') check(`${tag}: no visible Chinese`, (await cjkLeftovers(p)).length === 0, (await cjkLeftovers(p)).slice(0, 3).join(' | '));
  check(`${tag}: the figure note is the short one, no sub- or superscripts`, await p.evaluate(() => { const n = document.querySelector('.tour .tour-note'); return !!n && n.textContent.trim().length > 8 && !n.querySelector('sub, sup'); }));
  checkMath(s, tag);
  await p.context().close();
}

/* ---------- stills: the frame PDF and EPUB print, with the numbers its caption gives ---------- */
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: declared frame, paused, handle hidden`, s.preset === card && !s.playing && near(s.tau, CARDS[card].still, 1e-12)
    && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('epsHandle').hidden && document.documentElement.dataset.trPalette === undefined));
  checkMath(s, `still ${lang}/${card}`);
  if (card === 'holographic-pivot-cone') check(`still ${lang}/${card}: every level of the cone is shown at τ = 1`, s.hierarchy.depth === 4 && s.route === 'pivots');
  await p.context().close();
}

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
