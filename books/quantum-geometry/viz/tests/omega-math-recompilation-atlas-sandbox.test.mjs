import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../../../../tools/node/viz-common.mjs';
import {
  session,
  stageFirstChecks,
  solidPixels,
  settle,
  openStill,
  playsAfter,
  stageView,
  labelOverlaps,
  capitalGreek,
  cjkLeftovers,
  overflowX
} from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'omega-math-recompilation-atlas-sandbox';
const CARDS = {
  'six-pillar-deapproximation-compiler': { scene: 'pillars', still: 20 },
  'au3-d8-quadrupole-anisotropy-slice': { scene: 'quad', still: 8 },
  'hecke-ramanujan-rational-psd-shell': { scene: 'hecke', still: 4 },
  'twelve-node-atlas-dag-crystallization': { scene: 'atlas', still: 15 },
  'five-prime-omega-fractran-fixed-point': { scene: 'fractran', still: 16 }
};
const IDS = Object.keys(CARDS);
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff',
  'D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound',
  'D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize',
  'D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals',
  'D5/S0/Computability/CodeFixedPoint.code_fixed_point',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor',
  'D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction'
];

const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = (p = page) => p.evaluate(() => window.RECOMPILE_DEBUG.state);

/* ---------- publication language ---------- */
const identifiers = /\b(claude|opus|gemini|codex|gpt|llm|agent|agents)\b/giu;
const dialogue = /\b(?:chat|dialogue|conversation|transcript)s?\b|\bturn\s*#?\d+\b|对话|会话|聊天|问答|提示词/giu;
const dir = join(ROOT, 'books', BOOK, 'viz', ID);
function checkHygiene(label, text) {
  const modelWords = text.match(identifiers) ?? [];
  const dialogueWords = text.match(dialogue) ?? [];
  check(label + ' contains zero model or tool identifiers', modelWords.length === 0, JSON.stringify(modelWords));
  check(label + ' contains zero dialogue words', dialogueWords.length === 0, JSON.stringify(dialogueWords));
}
for (const file of ['index.html', 'style.css', 'main.js']) {
  checkHygiene(file, readFileSync(join(dir, file), 'utf8'));
}

/* ---------- visibility and synchronization of the lens controls ---------- */
for (const lang of ['zh', 'en']) {
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  for (const [mode, viewport, embed, visible] of [
    ['desktop', { width: 1440, height: 900 }, '', false],
    ['phone', { width: 390, height: 844 }, '', true],
    ['full laboratory embed', { width: 1440, height: 620 }, '&embed=1', true],
    ['cited figure', { width: 334, height: 540 }, '&embed=1&preset=' + IDS[0], false]
  ]) {
    const p = await T.open(BOOK, ID, '?lang=' + lang + embed, { viewport, locale, reducedMotion: 'reduce' });
    await settle(p);
    const label = lang + ' ' + mode;
    const mirror = p.locator('#lensMirror');
    const rail = p.locator('#lensToggleBtn');
    check(label + ': mirror visibility matches the layout', (await mirror.count()) === 1 && (await mirror.isVisible()) === visible);
    if (mode === 'desktop') checkHygiene(lang + ' rendered page', await p.locator('body').innerText());
    if (visible) {
      const before = await state(p);
      const pressed = () => Promise.all([mirror.getAttribute('aria-pressed'), rail.getAttribute('aria-pressed')]);
      const initial = await pressed();
      const experiment = ({ scene, preset, clock, at }) => JSON.stringify({ scene, preset, clock, at });
      await mirror.click();
      await settle(p);
      const on = await state(p);
      check(label + ': clicking the mirror activates both switches and preserves the experiment',
        initial.every((value) => value === 'false') && on.lens === 1 && (await pressed()).every((value) => value === 'true') && experiment(on) === experiment(before));
      await rail.click();
      await settle(p);
      const off = await state(p);
      check(label + ': clicking the rail resets both switches and preserves the experiment',
        off.lens === 0 && (await pressed()).every((value) => value === 'false') && experiment(off) === experiment(before));
    }
    await p.context().close();
  }
}

/* ---------- evidence: sixteen green boxes in the order of the brief, and the other layers ---------- */
const ev = await page.evaluate(() => ({
  green: [...document.querySelectorAll('#basis > .lean')].filter((b) => b.classList.length === 1).map((b) => b.querySelector('a[data-lean-gid]')?.dataset.leanGid),
  kinds: [...document.querySelectorAll('#basis > .lean')].map((b) => [...b.classList].filter((c) => c !== 'lean').join('') || 'lean'),
  openLinks: [...document.querySelectorAll('#basis .lean.open a')].map((a) => a.getAttribute('href')),
  drawer: document.querySelectorAll('#drawerEvidence .lean').length
}));
check('sixteen LEAN ✓ boxes in the order of the brief', JSON.stringify(ev.green) === JSON.stringify(GIDS), JSON.stringify(ev.green));
check('then ARGUED, MODEL, OPEN and NUM', JSON.stringify(ev.kinds.slice(16)) === JSON.stringify(['argued', 'model', 'open', 'num']), JSON.stringify(ev.kinds));
check('OPEN links are relative', ev.openLinks.length > 0 && ev.openLinks.every((h) => h.startsWith('../')), JSON.stringify(ev.openLinks));
check('the drawer repeats all twenty boxes', ev.drawer === 20, String(ev.drawer));

/* ---------- independent mathematics ---------- */
const gcd = (a, b) => (b ? gcd(b, a % b) : a < 0n ? -a : a);
const run = await page.evaluate(() => window.RECOMPILE_DEBUG.run());
// FRACTRAN by trial division on numbers
let N = 131072;
const trace = [N];
for (;;) {
  const g = [[11, 49], [7, 25], [5, 9], [3, 4]].find(([, d]) => N % d === 0);
  if (!g) break;
  N = (N * g[0]) / g[1];
  trace.push(N);
}
check('FRACTRAN: the page register equals trial division, sixteen milestones, halting at 22', JSON.stringify(run.rows.map((r) => Number(r.N))) === JSON.stringify(trace) && trace.length === 16 && trace[15] === 22);
// the atlas ledger from the edge list alone: V, E, b₁ by a spanning forest, ΔI by floating Gram–Schmidt
const NODES = [[1, 0, 0, 0], [1, 1, 1, 1], [1, -1, 1, 1], [1, 1, -1, 1], [1, 1, 1, -1], [1, -1, -1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, -1], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const basis = [];
let tau = 0,
  b1 = 0,
  V = 0,
  E = 0,
  ledgerBad = 0;
for (const r of run.rows) {
  let dI = 0;
  if (r.node) {
    V++;
    let v = NODES[r.node - 1].slice();
    const n2 = v.reduce((s, x) => s + x * x, 0);
    for (const b of basis) {
      const c = v.reduce((s, x, i) => s + x * b[i], 0) / b.reduce((s, x) => s + x * x, 0);
      v = v.map((x, i) => x - c * b[i]);
    }
    const p2 = v.reduce((s, x) => s + x * x, 0);
    if (p2 > 1e-12) {
      basis.push(v);
      if (r.M > 1) dI = p2 / n2;
    }
  }
  E += r.added.length;
  const nb1 = E - V + 1,
    d = nb1 - b1;
  b1 = nb1;
  tau += dI + d;
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  if (r.V !== V || r.E !== E || r.b1 !== b1 || !near(Number(r.tau[0]) / Number(r.tau[1]), tau) || !near(Number(r.dI[0]) / Number(r.dI[1]), dI)) ledgerBad++;
}
check('atlas: V, E, b₁, ΔI and τ from the edge list agree at all sixteen milestones; τ = 155/12', ledgerBad === 0 && Math.abs(tau - 155 / 12) < 1e-9 && b1 === 11 && E === 22, `${ledgerBad} ${tau}`);
// the transport witness of every edge, by a separate quaternion product
const qm = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const can = (t) => {
  const g = t.reduce((a, x) => Number(gcd(BigInt(Math.abs(a)), BigInt(Math.abs(x)))), 0);
  const r = t.map((x) => x / g);
  const s = r.find((x) => x) > 0 ? 1 : -1;
  return JSON.stringify(r.map((x) => s * x + 0));
};
const witnessOk = run.edges.every((e) => {
  const a = NODES[e.a - 1],
    g = qm([a[0], -a[1], -a[2], -a[3]], NODES[e.b - 1]);
  return can(g) === JSON.stringify(NODES[e.gNode - 1]) && can(qm(a, g)) === JSON.stringify(NODES[e.b - 1]);
});
check('atlas: every transport witness g = canon(a* b) is a node and [a, o, g] = b', witnessOk);
// the five d orbitals by Monte Carlo free quadrature (Lebedev-free): a fine latitude–longitude grid
const orb = await page.evaluate(() => window.RECOMPILE_DEBUG.orbitals());
const fns = { z2: ([x, y, z]) => 2 * z * z - x * x - y * y, xz: ([x, , z]) => x * z, yz: ([, y, z]) => y * z, xy: ([x, y]) => x * y, x2y2: ([x, y]) => x * x - y * y };
let qBad = 0;
for (const [k, f] of Object.entries(fns)) {
  const acc = [0, 0, 0],
    nn = [0];
  const NT = 400,
    NP = 800;
  for (let i = 0; i < NT; i++) {
    const th = (Math.PI * (i + 0.5)) / NT,
      w = Math.sin(th);
    for (let j = 0; j < NP; j++) {
      const ph = (2 * Math.PI * j) / NP,
        n = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)],
        p2 = f(n) ** 2 * w;
      nn[0] += p2;
      for (let a = 0; a < 3; a++) acc[a] += p2 * (3 * n[a] * n[a] - 1);
    }
  }
  const Q = acc.map((x) => x / nn[0]),
    page_ = orb[k].Q.map((row, i) => Number(row[i][0]) / Number(row[i][1]));
  if (Q.some((x, i) => Math.abs(x - page_[i]) > 2e-4)) qBad++;
}
check('5d: the diagonal of every orbital Q agrees with a quadrature of ⟨p²(3n² − 1)⟩/⟨p²⟩', qBad === 0);
await page.click('[data-preset="au3-d8-quadrupole-anisotropy-slice"]');
const quadEnd = await page.waitForFunction(() => { const st = window.RECOMPILE_DEBUG.state; return !st.playing && st.clock === 8 && st.scene === 'quad'; }, null, { timeout: 60000 }).then(() => state(), () => null);
// the Hecke spectrum by floating-point power iteration on the SU(2) representation (an independent construction)
const shells = await page.evaluate(() => window.RECOMPILE_DEBUG.shells());
const margins = shells.map((sh) => sh.levels.map((l) => Number(l.margin[0]) / Number(l.margin[1])).sort((a, b) => a - b));
const want = [[-16], [64 / 5], [496 / 25], [2176 / 125], [7024 / 625, 9584 / 625]];
check('Hecke: margins 20 − λ² are −16, 64/5, 496/25, 2176/125, 7024/625 and 9584/625', margins.every((m, i) => m.length === want[i].length && m.every((x, k) => Math.abs(x - want[i][k]) < 1e-12)), JSON.stringify(margins));
// the trace of each shell matrix against the sum of characters χ_j(π/√5)·5^j: χ of a unit quaternion with real part c is U_{2j}(c)
const U = (n, c) => (n === 0 ? 1 : n === 1 ? 2 * c : 2 * c * U(n - 1, c) - U(n - 2, c));
const traceOk = shells.every((sh, d) => {
  const tr = sh.A.reduce((s2, row, i) => s2 + Number(row[i][0]) / Number(row[i][1]), 0),
    chi = 6 * U(d, 1 / Math.sqrt(5)) * Math.sqrt(5) ** d;
  return Math.abs(tr - chi) < 1e-6;
});
check('Hecke: trace of A_d = 6·U_d(1/√5)·5^(d/2) for d = 0 … 4', traceOk);
const minorsOk = shells.slice(1).every((sh) => sh.minors.every((m) => BigInt(m[0]) > 0n));
check('Hecke: all leading principal minors positive on j ≥ 1/2, negative on j = 0', minorsOk && BigInt(shells[0].minors[0][0]) < 0n);
check('5d: Au³⁺ 5d⁸ gives diag(−4/7, −4/7, 8/7) and its twelve-node average is zero', !!quadEnd && quadEnd.scene === 'quad' && JSON.stringify(quadEnd.Q.map((r, i) => r[i])) === JSON.stringify([['-4', '7'], ['-4', '7'], ['8', '7']]) && quadEnd.avg.flat().every((x) => x[0] === '0'), JSON.stringify(quadEnd && [quadEnd.Q, quadEnd.avg]));

/* ---------- the readings follow the rule: = only before exact values ---------- */
const decimalsNearRelations = async (p) =>
  p.evaluate(() => {
    const text = [...document.querySelectorAll('#hudTl, #readouts, .stage .tag, #basis .lean.num, .drawer li, #presetNote, .field output, .tau')].map((e) => e.textContent).join(' ');
    // a decimal with four or more digits after "=" must be the exact value of a fraction we printed: we only flag
    // relations that print rounded digits next to <, >, ≤, ≥
    return (text.match(/[<>≤≥]\s*−?\d+\.\d+/g) || []).slice(0, 5);
  });
const rounding = [];
for (const id of IDS) {
  await page.click(`[data-preset="${id}"]`);
  await settle(page);
  rounding.push(...(await decimalsNearRelations(page)));
}
check('no rounded digits next to <, >, ≤ or ≥', rounding.length === 0, JSON.stringify(rounding));

/* ---------- every card plays and parks on its still; the replay changes nothing ---------- */
for (const id of IDS) check(`${id} plays when clicked`, await playsAfter(page, () => page.click(`[data-preset="${id}"]`), () => ({ playing: window.RECOMPILE_DEBUG.state.playing, t: window.RECOMPILE_DEBUG.state.clock })));
await page.click('[data-preset="five-prime-omega-fractran-fixed-point"]');
await settle(page);
await page.evaluate(() => document.querySelector('#replayBtn').click());
await settle(page);
const replayState = await page.waitForFunction(() => !window.RECOMPILE_DEBUG.state.playing && window.RECOMPILE_DEBUG.state.fractran.replay, null, { timeout: 30000 }).then(() => state(), () => null);
check('fractran: the replay M16 → M16 has Δτ = 0, ΔI = 0, Δb₁ = 0 and N = 22', replayState && replayState.fractran.row.N === '22' && replayState.fractran.row.dTau[0] === '0' && replayState.fractran.row.db1 === 0, JSON.stringify(replayState && replayState.fractran));

/* ---------- labels and HUD clear of each other at several frames ---------- */
const FRAMES = [
  ['desk', { width: 1440, height: 900 }, ''],
  ['short', { width: 1440, height: 500 }, ''],
  ['narrow', { width: 1081, height: 500 }, ''],
  ['phone', { width: 390, height: 844 }, ''],
  ['embed', { width: 740, height: 500 }, '&embed=1'],
  ['cited334', { width: 334, height: 500 }, '&embed=1&preset=']
];
for (const lang of ['zh', 'en']) {
  for (const [name, viewport, q] of FRAMES) {
    for (const id of IDS) {
      const query = q.endsWith('preset=') ? `?lang=${lang}${q}${id}` : `?lang=${lang}${q}&preset=${id}`;
      const p = await T.open(BOOK, ID, query, { viewport, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
      await settle(p, 200);
      await p.evaluate(() => {
        const b = document.querySelector('#play');
        if (b && b.getAttribute('aria-pressed') === 'true') b.click();
      });
      await settle(p);
      const overlaps = await labelOverlaps(p, '.stage .tag', 0);
      const hud = (await stageView(p, '#stage', name === 'cited334')).hud || [];
      const caps = await capitalGreek(p);
      const cjk = lang === 'en' ? await cjkLeftovers(p) : [];
      const over = await overflowX(p);
      check(`${lang}/${name}/${id}: labels, HUD and legend clear; no CJK in English; no sideways scroll`, !overlaps.length && !hud.length && !caps.length && !cjk.length && over <= 0, JSON.stringify({ overlaps: overlaps.slice(0, 2), hud: hud.slice(0, 2), caps: caps.slice(0, 2), cjk: cjk.slice(0, 2), over }));
      await p.context().close();
    }
  }
}

/* ---------- stills ---------- */
for (const lang of ['zh', 'en']) {
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    const px = await solidPixels(p);
    check('still ' + lang + '/' + id + ': hides the mirror lens control', await p.locator('#lensMirror').isHidden());
    check(`still ${lang}/${id}: parks on the declared frame with an opaque solid ≥ 12%`, m.preset === id && !m.playing && Math.abs(m.clock - CARDS[id].still) < 1e-12 && px.share >= 0.12, JSON.stringify([m.preset, m.clock, px.share]));
    await p.context().close();
  }
}
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
