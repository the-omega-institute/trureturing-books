// MONAD//TILING: shared stage gates, then independent geometry, real matrices and oriented cell chains.
// Run directly, with VIZ_PHASE1=1 for the cards:false gate, and with VIZ_SLOW_FRAMES=1000 for slow frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, cjkLeftovers, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'clifford-monad-tiling-sandbox';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const NS = [1, 4, 9, 16, 27], LENSES = ['all', 'hodge12', 'hodge03'];
const SPEC = {
  'monad-four-in-one': { n: 1, epsilon: 60, cancel: 0, lens: 'all', mode: 'grades' },
  'gradient-path-phase-lock': { n: 1, epsilon: 54, cancel: 0, lens: 'hodge12', mode: 'phase' },
  'hodge-stokes-duality': { n: 1, epsilon: 64, cancel: 0, lens: 'hodge03', mode: 'stokes' },
  'multicell-boundary-cancellation': { n: 16, epsilon: 68, cancel: 0.85, lens: 'all', mode: 'bars' },
  'macroscopic-grade-sieve': { n: 27, epsilon: 65, cancel: 1, lens: 'all', mode: 'sieve' }
};
const CARDS = Object.keys(SPEC);
const source = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'theme/tokens.json'), 'utf8')).screen;
const GIDS = [
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair',
  'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
  'D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness'
];
const T = await session();
const { check, page } = T;
const state = (p = page) => p.evaluate(() => window.MONAD_DEBUG.state);
const input = async (selector, value, p = page) => {
  await p.$eval(selector, (el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
};

// The shared gate traverses all cards in both languages in full mode. The fast gate keeps its other checks.
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1 });

for (const [file, text] of Object.entries(source)) {
  const literals = [...text.matchAll(/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/gi)].map((m) => m[0]);
  check(`source ${file}: zero hex/rgb/hsl colour literals`, literals.length === 0, literals.join(', '));
}
const cited = [...source['index.html'].matchAll(/data-lean-gid="([^"]+)"/g)].map((m) => m[1]);
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
check('source: exactly the six expected frozen theorem citations', GIDS.every((g) => cited.includes(g)) && cited.every((g) => GIDS.includes(g)));
check('source: all six citations are locked theorems', GIDS.every((g) => lock.declarations[g]?.kind === 'theorem'));
check('source: exactly the five experiment cards in order', JSON.stringify([...source['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1])) === JSON.stringify(CARDS));

// Independent oracle: spherical angles use atan2 of tangent vectors, not a Bargmann solid-angle formula.
const D = Math.PI / 180, TOL = 1e-12;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sub = (a, b) => a.map((x, i) => x - b[i]);
const unit = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
const close = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < TOL;
const same = (a, b) => Array.isArray(a) && a.length === b.length && a.every((x, i) => close(x, b[i]));
const tangent = (p, q) => sub(q, p.map((x) => x * dot(p, q)));
const angle = (p, q, r) => { const u = tangent(p, q), v = tangent(p, r); return Math.atan2(Math.hypot(...cross(u, v)), dot(u, v)); };
const area = (a, b, c) => angle(a, b, c) + angle(b, c, a) + angle(c, a, b) - Math.PI;
const polygonArea = (vertices, face) => {
  let sum = 0;
  for (let i = 1; i + 1 < face.length; i++) sum += area(vertices[face[0]], vertices[face[i]], vertices[face[i + 1]]);
  return sum;
};

// Exact geodesic parallel transport by an endpoint formula, using a different nonsingular tangent gauge.
function circulation(points) {
  const frame = (p) => unit(tangent(p, [1, -2, 3]));
  return points.reduce((sum, p, i) => {
    const q = points[(i + 1) % points.length], v = frame(p), f = frame(q);
    const carried = sub(v, p.map((x, j) => (x + q[j]) * dot(v, q) / (1 + dot(p, q))));
    return sum + Math.atan2(dot(q, cross(carried, f)), dot(carried, f));
  }, 0);
}

// Complex 2x2 projectors represented as real 4x4 linear maps; no page matrix helpers are used.
const projector = ([x, y, z]) => [
  [(1 + z) / 2, 0, x / 2, y / 2], [0, (1 + z) / 2, -y / 2, x / 2],
  [x / 2, -y / 2, (1 - z) / 2, 0], [y / 2, x / 2, 0, (1 - z) / 2]
];
const product = (a, b) => a.map((row) => row.map((_, j) => row.reduce((s, x, k) => s + x * b[k][j], 0)));
function tripleTrace(a, b, c) {
  const m = product(product(projector(a), projector(b)), projector(c));
  return [m.reduce((s, row, i) => s + row[i], 0) / 2, m[1][0] + m[3][2]];
}

// A second indexing of the triangular mesh: coordinates measured from A along AB and AC.
function mesh(n, A, B, C) {
  const vertices = [], faces = [], ids = new Map();
  if (n === 27) {
    const M = unit(B.map((x, i) => x + C[i]));
    for (let i = 0; i <= 3; i++) for (let j = 0; j <= 3; j++) {
      const u = i / 3, v = j / 3;
      vertices.push(unit(A.map((x, t) => (1 - u) * (1 - v) * x + u * (1 - v) * B[t] + u * v * M[t] + (1 - u) * v * C[t])));
    }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) faces.push([4 * i + j, 4 * (i + 1) + j, 4 * (i + 1) + j + 1, 4 * i + j + 1]);
  } else {
    const k = Math.sqrt(n);
    for (let i = 0; i <= k; i++) for (let j = 0; j <= k - i; j++) {
      ids.set(`${i},${j}`, vertices.length);
      vertices.push(unit(A.map((x, t) => x + (B[t] - x) * i / k + (C[t] - x) * j / k)));
    }
    const at = (i, j) => ids.get(`${i},${j}`);
    for (let i = 0; i < k; i++) for (let j = 0; j < k - i; j++) {
      faces.push([at(i, j), at(i + 1, j), at(i, j + 1)]);
      if (i + j < k - 1) faces.push([at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)]);
    }
  }
  return { vertices, faces };
}

function incidence(faces) {
  const edges = new Map();
  for (const f of faces) for (let i = 0; i < f.length; i++) {
    const a = f[i], b = f[(i + 1) % f.length], key = [a, b].sort((x, y) => x - y).join(':');
    const e = edges.get(key) || { count: 0, sign: 0 };
    e.count++; e.sign += a < b ? 1 : -1; edges.set(key, e);
  }
  const es = [...edges.values()];
  return { edges: edges.size, directed: es.reduce((s, e) => s + e.count, 0), cancelled: es.filter((e) => e.count === 2 && e.sign === 0).length * 2, boundary: es.filter((e) => e.count === 1).length };
}

// Enumerate outward face cycles of all cubes; canonical cycles retain orientation, unlike sorted vertex sets.
function cubes() {
  const verts = new Set(), edges = new Set(), faces = new Map();
  const corners = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
  const cycles = [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [3, 7, 6, 2], [0, 4, 7, 3], [1, 2, 6, 5]];
  const canonical = (f) => { const m = f.indexOf(Math.min(...f)); return f.slice(m).concat(f.slice(0, m)).join(':'); };
  for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) {
    const ids = corners.map(([a, b, c]) => (x + a) * 16 + (y + b) * 4 + z + c);
    ids.forEach((v) => verts.add(v));
    for (const cycle of cycles) {
      const f = cycle.map((i) => ids[i]), key = f.toSorted((a, b) => a - b).join(':');
      const sign = canonical(f) < canonical(f.toReversed()) ? 1 : -1;
      const entry = faces.get(key) || { count: 0, sum: 0, f };
      entry.count++; entry.sum += sign; faces.set(key, entry);
      f.forEach((a, i) => edges.add([a, f[(i + 1) % 4]].sort((p, q) => p - q).join(':')));
    }
  }
  const fs = [...faces.values()], boundary = fs.filter((f) => f.count === 1), rim = new Map();
  for (const { f } of boundary) f.forEach((a, i) => {
    const b = f[(i + 1) % 4], key = [a, b].sort((p, q) => p - q).join(':');
    rim.set(key, (rim.get(key) || 0) + (a < b ? 1 : -1));
  });
  return {
    directed: fs.reduce((s, f) => s + f.count, 0), cancelled: fs.filter((f) => f.count === 2 && f.sum === 0).length * 2,
    boundary: boundary.length, boundaryOfBoundary: [...rim.values()].filter((x) => x !== 0).length,
    counts: { vertices: verts.size, edges: edges.size, faces: faces.size, cells: 27 }
  };
}
const cube = cubes();
check('oracle: oriented 3x3x3 cube enumeration gives 162 = 108 + 54 and boundary-of-boundary zero', cube.directed === 162 && cube.cancelled === 108 && cube.boundary === 54 && cube.boundaryOfBoundary === 0);

// Spinors from the north-pole algebraic chart; form every tetrahedral coboundary, including repeated vertices.
function cochain(vertices) {
  const spin = vertices.map(([x, y, z]) => [Math.sqrt((1 + z) / 2), x / Math.sqrt(2 * (1 + z)), y / Math.sqrt(2 * (1 + z))]);
  const edge = spin.map(([a, b, c]) => spin.map(([d, e, f]) => Math.atan2(b * f - c * e, a * d + b * e + c * f)));
  const size = vertices.length, face = new Float64Array(size ** 3), at = (a, b, c) => (a * size + b) * size + c;
  for (let a = 0; a < size; a++) for (let b = 0; b < size; b++) for (let c = 0; c < size; c++) face[at(a, b, c)] = edge[b][c] - edge[a][c] + edge[a][b];
  let defects = 0, max = 0;
  for (let a = 0; a < size; a++) for (let b = 0; b < size; b++) for (let c = 0; c < size; c++) for (let d = 0; d < size; d++) {
    const gap = Math.abs(face[at(b, c, d)] - face[at(a, c, d)] + face[at(a, b, d)] - face[at(a, b, c)]);
    max = Math.max(max, gap); if (gap >= TOL) defects++;
  }
  return { size, defects, max };
}

const memo = new Map();
function expected(n, epsilon) {
  const key = `${n}:${epsilon}`;
  if (memo.has(key)) return memo.get(key);
  const e = epsilon * D, c = Math.cos(e), s = Math.sin(e), A = [1, 0, 0], B = [c, s, 0], C = [c, 0, s];
  const m = mesh(n, A, B, C), areas = m.faces.map((f) => polygonArea(m.vertices, f));
  const out = { e, c, s, A, B, C, omega: area(A, B, C), circulation: circulation([A, B, C]), trace: tripleTrace(A, C, B), areas, inc: incidence(m.faces), vertices: m.vertices.length, cc: cochain(m.vertices) };
  memo.set(key, out); return out;
}

// All comparisons use absolute tolerance < 1e-12; integers and incidence defects must agree exactly.
function properties(s) {
  const x = expected(s.n, s.epsilon), inc = x.inc, k = Math.sqrt(s.n);
  const scale = [1, Math.exp(Math.log(s.n) / 3), Math.exp(2 * Math.log(s.n) / 3), s.n];
  const sortedAreas = s.subOmega.toSorted((a, b) => a - b), wantAreas = x.areas.toSorted((a, b) => a - b);
  return {
    'vertices and four grades': same(s.A, x.A) && same(s.B, x.B) && same(s.C, x.C) && close(s.grade0Scalar, x.c) && close(s.grade1Step, x.s) && close(s.arcStep, x.e),
    'lagrange_gram_identity: cos²ε + sin²ε = 1': close(s.cos2, x.c ** 2) && close(s.sin2, x.s ** 2) && close(s.cos2 + s.sin2, 1) && close(s.pythagoreanSum, 1) && close(s.lagrangeLeft, x.s ** 2) && close(s.lagrangeRight, x.s ** 2),
    'solid angle and the two volumes': close(s.omega, 2 * Math.atan(Math.tan(x.e / 2) ** 2)) && close(s.omega, x.omega) && close(s.omegaGirard, x.omega) && close(s.vSector, x.omega / 3) && close(s.vTetra, x.s ** 2 / 6) && close(s.tripleProduct, x.s ** 2),
    'triple_bargmann_bloch: Tr(P_A P_C P_B), Im = -sin²ε/4 = -1.5 Vtetra': close(s.reBargmann, x.trace[0]) && close(s.imBargmann, x.trace[1]) && close(s.imBargmann, -0.25 * x.s ** 2) && close(s.imBargmann, -1.5 * s.vTetra) && close(s.imBargmannMatrix, x.trace[1]) && close(s.bargmannFormulaGap, 0) && close(s.argBargmann, -x.omega / 2) && close(s.gammaSpinor, -x.omega / 2) && close(s.gammaVector, -x.omega),
    'Stokes: boundary circulation = surface flux = -Ω': close(s.boundaryCirculation, -x.omega) && close(s.boundaryCirculation, x.circulation) && close(s.surfaceCurvatureFlux, -x.omega) && close(s.boundaryCirculation, s.surfaceCurvatureFlux) && close(s.cellCirculationSum, -x.omega) && Math.abs(s.cellCirculationGap) < TOL && close(s.interiorNetCirculation, 0),
    'unit_perpendicular_pair: Hodge unit normal and equal wedge length': same(s.hodgeNormal, unit(cross(x.A, x.B))) && close(Math.hypot(...s.hodgeNormal), 1) && Math.abs(dot(s.hodgeNormal, x.A)) < TOL && Math.abs(dot(s.hodgeNormal, x.B)) < TOL && Math.abs(s.hodgeOrthogonality) < TOL && close(s.hodgeLength, x.s),
    'face_cycle_exact: independently enumerated edge incidences and all sub-cell excesses': s.totalDirectedEdges === inc.directed && s.cancelledInteriorEdges === inc.cancelled && s.survivingBoundaryEdges === inc.boundary && (s.n === 27 || (inc.directed === 3 * k * k && inc.cancelled === 3 * k * (k - 1) && inc.boundary === 3 * k)) && s.interiorIncidenceSum === 0 && s.f2SurvivingEdges === inc.boundary && s.eulerCharacteristic === 2 && s.surfaceCounts.vertices === x.vertices && s.surfaceCounts.edges === inc.edges && s.surfaceCounts.faces === x.areas.length && same(sortedAreas, wantAreas) && x.areas.every((a) => a > 0) && close(s.subOmega.reduce((a, b) => a + b, 0), x.omega) && close(s.sumSubOmega, x.omega),
    'tetra_defects_incidence_repair_and_exactness: all tetrahedral coboundaries zero': s.tetraCoboundaryDefect === 0 && x.cc.defects === 0 && s.tetraCoboundaryMax < TOL && x.cc.max < TOL && s.tetraVertices === x.cc.size && s.tetraQuadruples === x.cc.size ** 4 && s.cochainNonzero > 0 && s.cochainBargmannGap < TOL,
    '27-cell oriented face counts and boundary-of-boundary': s.n === 27 ? s.solid && s.totalDirectedFaces === cube.directed && s.cancelledInteriorFaces === cube.cancelled && s.survivingBoundaryFaces === cube.boundary && s.interiorFacePairSum === 0 && s.boundaryOfBoundary === cube.boundaryOfBoundary && s.eulerVolume === 1 && Object.entries(cube.counts).every(([key, value]) => s.latticeCounts[key] === value) : !s.solid && s.totalDirectedFaces === null && s.cancelledInteriorFaces === null && s.survivingBoundaryFaces === null,
    'scaling powers: 1, N^(1/3), N^(2/3), N; endpoints 1:1:1:1 and 1:3:9:27': same(s.scalePowers, scale) && (s.n !== 1 || same(s.scalePowers, [1, 1, 1, 1]) && same(s.sieveCounts, [1, 1, 1, 1])) && (s.n !== 27 || same(s.scalePowers, [1, 3, 9, 27]) && same(s.sieveCounts, [1, 3, 9, 27])),
    'projection_probability_flow: Born weight and its commutator derivative': close(s.bornWeight, Math.cos(x.e / 2) ** 2) && close(s.bornFlowCommutator, -x.s / 2) && close(s.bornFlowGeometric, -x.s / 2) && close(s.bornFlowImag, 0)
  };
}
function verify(s, tag) {
  for (const [name, ok] of Object.entries(properties(s))) check(`${tag}: ${name}`, ok, JSON.stringify({ n: s.n, epsilon: s.epsilon, lens: s.lens, cancel: s.cancel }));
}

// Both modes inspect every preset in both languages, even when the shared gate skips its card traversal.
for (const lang of ['zh', 'en']) for (const card of CARDS) {
  await T.goto(BOOK, ID, `?lang=${lang}&preset=${card}`);
  await page.evaluate(() => document.fonts.ready); await settle(page);
  const s = await state(), spec = SPEC[card], tag = `preset ${card} (${lang})`;
  check(`${tag}: exact initial state and paused rail`, s.preset === card && Object.entries(spec).every(([key, value]) => typeof value === 'number' ? close(s[key], value) : s[key] === value) && !s.playing && close(s.t, spec.cancel) && s.max === 1, JSON.stringify(s));
  verify(s, tag);
  const overlaps = await labelOverlaps(page, '.stage .tag', 0.0001);
  check(`${tag}: stage labels do not overlap`, overlaps.length === 0, JSON.stringify(overlaps));
  if (lang === 'en') { const left = await cjkLeftovers(page); check(`${tag}: no visible Chinese`, left.length === 0, left.join(' | ')); }
  for (const scheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme: scheme }); await settle(page);
    const palette = await page.evaluate(() => ({ unset: document.documentElement.dataset.trPalette === undefined, colors: Object.fromEntries(['void', 'stage', 'ink', 'cyan', 'amber', 'magenta', 'violet', 'ok', 'warn'].map((key) => [key, TRV.palette[key]])) }));
    check(`${tag}, OS ${scheme}: single night-console palette, dataset.trPalette undefined`, palette.unset && Object.entries(palette.colors).every(([key, value]) => value.toLowerCase() === tokens[key].toLowerCase()), JSON.stringify(palette));
  }
  const wheel = await page.evaluate(() => {
    const before = window.MONAD_DEBUG.state.cam.zoom;
    let prevented = 0;
    const ev = new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true });
    ev.preventDefault = function () { prevented++; Event.prototype.preventDefault.call(this); };
    const accepted = document.querySelector('#cv').dispatchEvent(ev);
    return { prevented, accepted, defaultPrevented: ev.defaultPrevented, before, after: window.MONAD_DEBUG.state.cam.zoom };
  });
  check(`${tag}: #cv wheel never calls preventDefault or zooms`, wheel.prevented === 0 && wheel.accepted && !wheel.defaultPrevented && wheel.before === wheel.after, JSON.stringify(wheel));
}

// The epsilon handle owns one pointer. Cancellation must release its drag, class and frozen framing.
await T.goto(BOOK, ID, '?lang=en'); await settle(page);
await input('#epsilon', 40);
const drag = await page.evaluate(() => {
  const h = document.querySelector('#epsHandle'), point = (deg) => window.MONAD_DEBUG.screen([Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180), 0]);
  const send = (type, id, p) => h.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'mouse', button: 0, buttons: type === 'pointerdown' || type === 'pointermove' ? 1 : 0, clientX: p[0], clientY: p[1], bubbles: true, cancelable: true }));
  const start = window.MONAD_DEBUG.state.handle;
  send('pointerdown', 41, [start.x, start.y]);
  const active = window.MONAD_DEBUG.state.dragging && h.classList.contains('dragging');
  send('pointermove', 41, point(73));
  const moved = window.MONAD_DEBUG.state.epsilon;
  send('pointercancel', 42, point(73));
  const wrongPointerIgnored = window.MONAD_DEBUG.state.dragging;
  send('pointercancel', 41, point(73));
  const released = !window.MONAD_DEBUG.state.dragging && !h.classList.contains('dragging');
  send('pointermove', 41, point(18));
  return { active, moved, wrongPointerIgnored, released, after: window.MONAD_DEBUG.state.epsilon };
});
await settle(page);
check('handle: dragging B changes ε', drag.active && drag.moved === 73, JSON.stringify(drag));
check('handle: pointercancel ignores a different pointer and cleanly releases the owner', drag.wrongPointerIgnored && drag.released && drag.after === drag.moved && !(await state()).dragging, JSON.stringify(drag));
await page.focus('#epsHandle'); await page.keyboard.press('ArrowLeft'); await settle(page);
check('handle: keyboard remains usable after pointercancel', (await state()).epsilon === 72);

// Sweep every slider step. For each N and lens, all 76 integer ε and all 101 hundredth λ occur.
// This is a parameter coverage sweep, not an exhaustive Cartesian product of ε and λ.
// Each batch settles before reading each snapshot; it uses only DOM controls and the read-only state getter.
for (const n of NS) for (const lens of LENSES) {
  await page.click(`#cellCount [data-n="${n}"]`); await settle(page);
  await page.click(`#lens [data-lens="${lens}"]`); await settle(page);
  const samples = [];
  for (let start = 0; start <= 100; start += 20) {
    const chunk = await page.evaluate(async ({ start }) => {
      const out = [], kit = window.TRV.kit;
      for (let i = start; i <= Math.min(100, start + 19); i++) {
        for (const [id, value] of [['epsilon', 15 + i % 76], ['cancel', i / 100]]) {
          const el = document.getElementById(id); el.value = String(value); el.dispatchEvent(new Event('input', { bubbles: true }));
          await kit.ready(); kit.flush(); await kit.ready(); kit.flush();
        }
        out.push(window.MONAD_DEBUG.state);
      }
      return out;
    }, { start });
    samples.push(...chunk);
  }
  const tag = `sweep N=${n}, lens=${lens}`;
  check(`${tag}: all ε=15..90 and λ=0..1 slider steps reach state and pause/free the card`, samples.length === 101 && new Set(samples.map((s) => s.epsilon)).size === 76 && samples.every((s, i) => s.n === n && s.lens === lens && s.epsilon === 15 + i % 76 && close(s.cancel, i / 100) && close(s.t, i / 100) && s.preset === null && !s.playing));
  const failures = new Map();
  for (const s of samples) for (const [name, ok] of Object.entries(properties(s))) {
    if (!failures.has(name)) failures.set(name, []);
    if (!ok) failures.get(name).push(`ε=${s.epsilon}, λ=${s.cancel}`);
  }
  for (const [name, bad] of failures) check(`${tag}: ${name} (101 states)`, bad.length === 0, bad.slice(0, 4).join('; '));
}

// The rest of the lab's controls, with playback observed before the triggering action.
await page.click('[data-preset="multicell-boundary-cancellation"]'); await settle(page);
await input('#now', 0.37);
check('rail: scrubbing sets cancellation and its paired slider', close((await state()).cancel, 0.37) && close(Number(await page.inputValue('#cancel')), 0.37));
await page.click('#rew'); await settle(page);
check('rail: rewind sets λ=0 and frees the preset', (await state()).cancel === 0 && (await state()).preset === null);
await page.focus('#stage'); await page.keyboard.press('l'); await settle(page);
check('lens: L cycles from all to hodge03', (await state()).lens === 'hodge03');
check('rail: play advances λ even with slow frames', await playsAfter(page, () => page.click('#play'), () => window.MONAD_DEBUG.state));
await page.click('#play'); await settle(page);
check('rail: pause stops the clock', !(await state()).playing);

if (!PHASE1) {
  for (const lang of ['zh', 'en']) for (const card of CARDS) {
    const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), spec = SPEC[card];
    check(`still ${card} (${lang}): declared caption values, frozen rail and independent invariants`, s.preset === card && s.n === spec.n && s.lens === spec.lens && close(s.epsilon, spec.epsilon) && close(s.cancel, spec.cancel) && close(s.t, spec.cancel) && !s.playing && Object.values(properties(s)).every(Boolean), JSON.stringify({ n: s.n, epsilon: s.epsilon, t: s.t }));
    await p.context().close();
  }
  // Keep reader-facing review artifacts for inspection; these are deliberately not deleted by the suite.
  const shots = path.join(ROOT, 'shots'); fs.mkdirSync(shots, { recursive: true });
  for (const [name, viewport, query] of [
    ['desk', { width: 1440, height: 900 }, '?lang=zh'],
    ['embed', { width: 740, height: 620 }, '?embed=1&lang=zh'],
    ['phone', { width: 390, height: 844 }, '?lang=zh']
  ]) {
    const p = await T.open(BOOK, ID, query, { viewport }); await settle(p);
    await p.screenshot({ path: path.join(shots, `review-${name}.jpg`), type: 'jpeg', quality: 90, fullPage: name === 'phone' });
    await p.context().close();
  }
}

for (const [file, text] of Object.entries(source)) check(`source ${file}: unchanged throughout the suite`, fs.readFileSync(path.join(DIR, file), 'utf8') === text);
check('no page error, console error or failed request anywhere in the suite', T.errors.length === 0, T.errors.slice(0, 6).join(' | '));
await T.finish();
