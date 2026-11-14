#!/usr/bin/env node
// Browser suite: quality gate + independent checks of the page's claims.
import { session, stageFirstChecks, stageView, settle, until, playsAfter, openStill, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'comparison-oisc-engine';
const T = await session(), { check, page } = T;
await stageFirstChecks(T, BOOK, ID);

const near = (a, b, e = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < e;
const M = () => page.evaluate(() => window.COMPARISON_OISC_DEBUG.metrics);
const St = () => page.evaluate(() => window.COMPARISON_OISC_DEBUG.state);
const opt = async (o) => { await page.evaluate((x) => window.COMPARISON_OISC_DEBUG.setOptions(x), o); await settle(page); };

await T.goto(BOOK, ID, '?lang=zh'); await settle(page);

// primitive: s, a, parallelogram, two-way product
let m = await M();
{
  const wA = m.wA, wB = m.wB; let dot = 0, eq = 0, plus = 0, minus = 0;
  for (let k = 0; k < 8; k++) { dot += wA[k] * wB[k] / 8; eq += wA[k] === wB[k] ? 1 : 0; plus += ((wA[k] + wB[k]) ** 2) / 8; minus += ((wA[k] - wB[k]) ** 2) / 8; }
  check('primitive: s = ⟨w_A, w_B⟩ = 0.5 by a separate sum', near(m.s, dot) && near(dot, 0.5), `${m.s}`);
  check('primitive: a = sin θ = √3/2', near(m.a, Math.sqrt(3) / 2), `${m.a}`);
  check('primitive: XNOR/XOR counts 6 / 2', m.matches === eq && eq === 6 && m.mismatches === 2);
  check('primitive: ‖A+B‖² + ‖A−B‖² = 4 (parallelogram)', near(m.sumSq, plus) && near(m.diffSq, minus) && near(plus + minus, 4));
  check('primitive: κ = −1 product = 1, Î(−Î) = 1', near(m.twoWayProduct, 1) && near(m.pureDiffFairProd, 1));
}
await opt({ kappa: 0.5, keepCard: true }); m = await M();
check('primitive: κ = 0.5 product = s² − 0.5 a² ≠ 1', near(m.twoWayProduct, 0.25 - 0.5 * 0.75) && near(m.pureDiffFairProd, -0.5));

// QUAL-R25-001: collinear words stay at (1, 0) for every tested square law.
for (const [word, s] of [['w0', 1], ['w180', -1]]) for (const kappa of [0, 1]) {
  await opt({ word, kappa }); m = await M();
  const key = await page.locator('#roKey').textContent(), sub = await page.locator('#roKeySub').textContent();
  check(`primitive: ${word}, κ = ${kappa}: a² = 0 and s = ${s}`, near(m.a * m.a, 0) && near(m.s, s) && m.wB.every((x, i) => x === s * m.wA[i]));
  check(`primitive: ${word}, κ = ${kappa}: two-way product stays at (1, 0)`, near(m.twoWayProduct, 1) && key === '(1.0000, 0)', `${m.twoWayProduct} ${key}`);
  check(`primitive: ${word}, κ = ${kappa}: readout explains the collinear exception`, sub.includes('a = 0') && !sub.includes('离开 (1, 0)') && !sub.includes('off (1, 0)'), sub);
}
await opt({ word: 'w60' });

await opt({ kappa: -1, rail: 3 }); m = await M();
{ const c = (1 + 1 - 1) / 3; check('primitive: first 3 slots give cos θ₃ = 1/3', near(m.sSoFar, c, 1e-9), `${m.sSoFar}`); }
// slot click on the stage flips w_B
await opt({ rail: 8 });
const pt = await page.evaluate(() => window.COMPARISON_OISC_DEBUG.slotPoint(0));
await page.mouse.click(pt[0], pt[1]); await settle(page);
m = await M(); check('primitive: tapping slot 1 of w_B on the stage flips it', m.wB[0] === -1, JSON.stringify(m.wB));
await opt({ word: 'w60' });

// lattice: Gram, rank, embedding distances
await opt({ scene: 'lattice', set: 'box8', rail: 28 }); m = await M();
{
  const W = m.words.map((w) => w.map((x) => x / Math.sqrt(8))), n = W.length;
  let worst = 0, worstD = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const g = W[i].reduce((s, x, k) => s + x * W[j][k], 0); worst = Math.max(worst, Math.abs(g - m.gramMatrix[i][j]));
    const X = m.embeddedCoords, d2 = (X[i][0] - X[j][0]) ** 2 + (X[i][1] - X[j][1]) ** 2 + (X[i][2] - X[j][2]) ** 2;
    worstD = Math.max(worstD, Math.abs(d2 - 2 * (1 - g)));
  }
  check('lattice: Gram entries match a separate product', worst < 1e-14, `${worst}`);
  check('lattice: d² = 2(1 − G) = ‖Xᵢ − Xⱼ‖² for all 28 pairs', worstD < 1e-9, `${worstD}`);
  // rank by Gaussian elimination on the word matrix
  const A = m.words.map((r) => r.slice()); let rank = 0;
  for (let c = 0; c < 8 && rank < A.length; c++) { let p = rank; while (p < A.length && Math.abs(A[p][c]) < 1e-9) p++; if (p === A.length) continue; [A[rank], A[p]] = [A[p], A[rank]]; for (let r = 0; r < A.length; r++) if (r !== rank) { const f = A[r][c] / A[rank][c]; for (let k = c; k < 8; k++) A[r][k] -= f * A[rank][k]; } rank++; }
  check('lattice: box of eight has rank 3 (elimination)', rank === 3 && m.latticeRank === 3, `${rank} ${m.latticeRank}`);
  const half = m.embeddedCoords.map((x) => x.map(Math.abs));
  check('lattice: box half-sides √(3/8), √(3/8), √(2/8)', half.every((h) => near(h[0], Math.sqrt(3 / 8), 1e-9) && near(h[1], Math.sqrt(3 / 8), 1e-9) && near(h[2], Math.sqrt(2 / 8), 1e-9)), JSON.stringify(half[0]));
}
await opt({ set: 'perturbed' }); m = await M();
check('lattice: one bit flipped → rank 4 and a distance error in 3D', m.latticeRank === 4 && m.distanceErrorFull > 1e-3, `${m.latticeRank} ${m.distanceErrorFull}`);
await opt({ set: 'box8' });

// folding
await opt({ scene: 'folding', fold: 'lagrange', rail: 75, vLen: 1 }); m = await M();
check('lagrange: |u|²|v|² = sameness² + wedge²', near(m.lagrangeLHS, m.lagrangeRHS) && near(m.wedgeSq, Math.sin(55 * Math.PI / 180) ** 2, 1e-12));
await opt({ rail: 20 }); m = await M();
check('lagrange: v = u gives wedge 0', near(m.wedge, 0, 1e-12));
await opt({ fold: 'minkowski', rail: 60 }); m = await M();
check('minkowski: θ = 60° → dτ/dt = 0.5, dx/(c dt) = √3/2, interval matches', near(m.dtauRatio, 0.5) && near(m.dxRatio, Math.sqrt(3) / 2) && near(m.minkowskiLHS, m.minkowskiRHS));

// expansion
await opt({ scene: 'expansion', exp: 'residual', rail: 52 }); m = await M();
const b = 52 * Math.PI / 180;
check('residual: ‖r‖² = sin²β, ‖Pw‖² = cos²β, S(r, eᵢ) = 0, rank 3', near(m.residualNormSq, Math.sin(b) ** 2) && near(m.inPlaneNormSq, Math.cos(b) ** 2) && m.residualSameness.every((x) => near(x, 0)) && m.gramRank === 3);
await opt({ rail: 0 }); m = await M();
check('residual: β = 0 → rank 2', m.gramRank === 2);
await opt({ exp: 'memo', bits: 2, rail: 14 }); m = await M();
{
  let e = 0; for (let x = 0; x < 16; x++) for (let y = 0; y < 16; y++) if (x !== y && (x >> 2) === (y >> 2)) e++;
  let x = 0; for (let i = 0; i < 14; i++) x = Math.cos(x);
  check('memo: ordered escape pairs at b = 2 is 48 (separate count)', m.escapePairCount === e && e === 48);
  check('memo: escape(b−1) = escape(b) + unique(b)', m.escapePairsWithoutLastBit === m.escapePairCount + m.uniqueCapturePairs && m.escapePairsWithoutLastBit === 112);
  check('memo: cobweb x₁₄ matches a separate iteration', near(m.cobwebX, x, 1e-15));
  check('memo: Dottie fixed point', near(Math.cos(m.dottieFixedPoint), m.dottieFixedPoint, 1e-15) && near(m.dottieNewton, m.dottieFixedPoint, 1e-15));
}

// cards: each lands on its still on a full page (no play) and the stop of time-axis
for (const [card, key, still] of [['oisc', 'primitive', 8], ['emergence', 'lattice', 28], ['uncertainty', 'lagrange', 75], ['time-axis', 'residual', 52], ['lookup', 'memo', 14], ['budget-cone', 'minkowski', 60]]) {
  const p = await T.open(BOOK, ID, `?lang=en&preset=${card}`);
  await settle(p);
  const s = await p.evaluate(() => window.COMPARISON_OISC_DEBUG.state);
  check(`card ${card}: full page opens on its still`, s.preset === card && s.railKey === key && near(s.t, still), JSON.stringify([s.preset, s.railKey, s.t]));
  await p.context().close();
  for (const lang of ['zh', 'en']) {
    const shot = await openStill(T, BOOK, ID, card, lang);
    const frame = await shot.evaluate(() => window.COMPARISON_OISC_DEBUG.state);
    check(`still ${card} (${lang}): the labelled figure shows its declared rail value`, frame.preset === card && frame.railKey === key && near(frame.t, still) && !frame.playing, JSON.stringify([frame.preset, frame.railKey, frame.t, frame.playing]));
    await shot.context().close();
  }
}
check('card time-axis starts playing after selection', await playsAfter(page, () => page.click('[data-preset="time-axis"]'), () => window.COMPARISON_OISC_DEBUG.state));
// A throttled frame advances the shared clock by at most 0.1 seconds. At one frame
// per second, playing the entire card needs more than the default 30-second deadline.
const stopped = await until(page, () => { const s = window.COMPARISON_OISC_DEBUG.state; return !s.playing && Math.abs(s.t - 58) < 1e-9; }, undefined, 60_000);
check('card time-axis plays and stops at 58°', stopped, JSON.stringify(await St()));

// phone at 390 × 844, both languages: hud vs scene chips, no overflow
for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { viewport: { width: 390, height: 844 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  for (const c of ['oisc', 'emergence', 'uncertainty', 'time-axis', 'lookup', 'budget-cone']) {
    await p.click(`[data-preset="${c}"]`); await settle(p);
    // Compare visible text with individual buttons: their enclosing boxes also contain empty space.
    const view = await stageView(p, '#stage');
    check(`phone ${lang} ${c}: title clear of the scene chips`, view.hud.length === 0, view.hud.join(' | '));
    check(`phone ${lang} ${c}: no sideways scrolling`, (await overflowX(p)) <= 0);
  }
  await p.context().close();
}
check('no page error, console error or failed request (own checks)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
