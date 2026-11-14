// Independent regression checks for the sealed lab, its six cards and five interpretation lenses.
import { readFileSync } from 'node:fs';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'quantum-interpretations-duel';
const LENSES = ['copenhagen', 'many-worlds', 'pilot-wave', 'grw-collapse', 'ortho-open-dim'];
const CARDS = [
  { id: 'wigner-cut', focus: 'cut', lens: 'copenhagen', u: 0, beta: 0 },
  { id: 'and-to-or', focus: 'andor', lens: 'copenhagen', u: 6, beta: 0, stop: 6 },
  { id: 'born-unequal', focus: 'born', lens: 'many-worlds', u: 0, beta: 0, stop: 30 },
  { id: 'bell-epr', focus: 'bell', lens: 'pilot-wave', u: 0, beta: 0.6, stop: 1.4 },
  { id: 'time-horizon', focus: 'horizon', lens: 'ortho-open-dim', u: 4, beta: 0, stop: 4 },
  { id: 'five-way-duel', focus: 'duel', lens: 'copenhagen', u: 4, beta: 0 }
];
const near = (a, b, tolerance = 2e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tolerance;
const same = (a, b, tolerance = 2e-12) => Array.isArray(b)
  ? Array.isArray(a) && a.length === b.length && b.every((v, i) => same(a[i], v, tolerance))
  : near(a, b, tolerance);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const mv = (A, v) => A.map((r) => dot(r, v));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const kron = (A, B) => Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => A[Math.floor(i / 2)][Math.floor(j / 2)] * B[i % 2][j % 2]));
const Z = [[1, 0], [0, -1]], X = [[0, 1], [1, 0]], I = [[1, 0], [0, 1]];
const axis = (a) => Z.map((r, i) => r.map((z, j) => Math.cos(a) * z + Math.sin(a) * X[i][j]));
const projector = (A, sign) => A.map((r, i) => r.map((x, j) => (I[i][j] + sign * x) / 2));
const bell = [Math.SQRT1_2, 0, 0, Math.SQRT1_2];
const expect = (A) => dot(bell, mv(A, bell));
const CHSH_TERMS = [[0, Math.PI / 4], [0, -Math.PI / 4], [Math.PI / 2, Math.PI / 4], [Math.PI / 2, -Math.PI / 4]]
  .map(([a, b], i) => (i === 3 ? -1 : 1) * expect(kron(axis(a), axis(b))));
const CHSH = CHSH_TERMS.reduce((a, b) => a + b, 0);
const entropy = (values) => values.reduce((sum, x) => sum - (x > 0 ? x * Math.log2(x) : 0), 0);

// Construct the conditional L⊗E vector, trace E, and diagonalize the resulting 2×2 matrix.
// Also construct the full S⊗F⊗B⊗E vector to obtain the unheralded marginals by summing probabilities.
function lab(thetaDeg, u) {
  const theta = thetaDeg * Math.PI / 180, c = Math.cos(theta), s = Math.sin(theta);
  const N = Math.round(10 ** u), gamma = Math.exp(-N / 10000);
  const env = [[1, 0], [gamma, Math.sqrt(-Math.expm1(-2 * N / 10000))]];
  const psi = [env[0].map((x) => c * x), env[1].map((x) => -s * x)];
  const rho = psi.map((a) => psi.map((b) => dot(a, b)));
  const square = mul(rho, rho), purity = square[0][0] + square[1][1];
  const determinant = rho[0][0] * rho[1][1] - rho[0][1] * rho[1][0];
  const radius = Math.hypot(rho[0][0] - rho[1][1], 2 * rho[0][1]);
  const eigenvalues = [(1 + Math.min(1, radius)) / 2, (1 - Math.min(1, radius)) / 2];
  const S = entropy(eigenvalues), Hp = entropy([c * c, s * s]);
  const basis = [[c, s], [-s, c]], friend = [0, 0], bob = [0, 0];
  let herald = 0;
  for (let a = 0; a < 2; a++) for (let f = 0; f < 2; f++) for (let b = 0; b < 2; b++) for (let e = 0; e < 2; e++) {
    const amplitude = basis[f][a] * basis[f][b] * env[f][e] / Math.sqrt(2), weight = amplitude ** 2;
    friend[f] += weight; bob[b] += weight;
    if (b === 0) herald += weight;
  }
  const joint = (x, y) => expect(kron(projector(axis(2 * theta), x), projector(Z, y)));
  const margA = joint(1, 1) + joint(1, -1), margB = joint(1, 1) + joint(-1, 1);
  const v = [c, s], zv = mv(Z, v), xv = mv(X, v), ez = dot(v, zv), ex = dot(v, xv);
  const centeredZ = zv.map((x, i) => x - ez * v[i]), centeredX = xv.map((x, i) => x - ex * v[i]);
  const varZ = dot(centeredZ, centeredZ), varX = dot(centeredX, centeredX), covariance = dot(centeredZ, centeredX);
  return {
    N, gamma, rho, p: c * c, q: s * s, purity, deleted: rho[0][1] ** 2 + rho[1][0] ** 2,
    visibility: 2 * Math.abs(rho[0][1]), fullVisibility: 2 * Math.abs(c * s), r2: radius ** 2,
    tangle: 4 * determinant, S, Hp, dS: Hp - S, friend, bob, herald, margA, margB,
    conditional: joint(1, 1) / margB, grw: -Math.expm1(-N * 1e-16),
    varZ, varX, covariance, varianceProduct: varZ * varX
  };
}

function boost(beta) {
  const G = 1 / Math.sqrt(1 - beta ** 2), matrix = [[G, -G * beta], [-G * beta, G]];
  const A = mv(matrix, [0, -1]), B = mv(matrix, [0, 1]);
  return { G, dt: B[0] - A[0], dx: B[1] - A[1] };
}

// Test every ordered pair of distinct bit strings; unique captures must have matched before the added readout.
function escapes(mode) {
  const states = Array.from({ length: 16 }, (_, k) => Array.from({ length: 4 }, (_, j) => Math.floor(k / 2 ** j) % 2));
  const base = (b) => b.slice(0, 3).join('');
  const extra = (b) => mode === 'parity' ? b.reduce((a, x) => a ^ x, 0) : mode === 'redundant' ? b[0] ^ b[1] : 0;
  const read = (b) => `${base(b)}:${extra(b)}`;
  let pairs = 0, capture = 0;
  const sizes = new Map();
  for (const x of states) {
    sizes.set(read(x), (sizes.get(read(x)) || 0) + 1);
    for (const y of states) if (x !== y) {
      if (read(x) === read(y)) pairs++;
      if (base(x) === base(y) && extra(x) !== extra(y)) capture++;
    }
  }
  return { pairs, capture, rate: pairs / (states.length * (states.length - 1)), H2: Math.log2([...sizes.values()].reduce((sum, n) => sum + n ** 2, 0) / states.length) };
}

const T = await session();
const { page, check } = T;
try {
  await stageFirstChecks(T, 'quantum-geometry', 'quantum-interpretations-duel');
  const html = readFileSync(new URL('../quantum-interpretations-duel/index.html', import.meta.url), 'utf8');
  const gids = [...html.matchAll(/data-lean-gid="([^"]+)"/g)].map((m) => m[1]);
  const lock = JSON.parse(readFileSync(new URL('../../../../trureturing.lock.json', import.meta.url), 'utf8'));
  check('all 20 distinct cited declarations are locked as theorems', new Set(gids).size === 20 && gids.every((gid) => lock.declarations[gid]?.kind === 'theorem'));
  check('independent 4×4 CHSH expectation is 2√2', near(CHSH, 2 * Math.SQRT2));
  let classicalMax = 0;
  for (let k = 0; k < 16; k++) {
    const [a0, a1, b0, b1] = [0, 1, 2, 3].map((i) => k & (1 << i) ? 1 : -1);
    classicalMax = Math.max(classicalMax, Math.abs(a0 * b0 + a0 * b1 + a1 * b0 - a1 * b1));
  }
  check('all 16 deterministic local CHSH assignments stay within 2', classicalMax === 2 && CHSH > classicalMax);
  for (const mode of ['none', 'parity', 'redundant']) {
    const e = escapes(mode), resolved = mode === 'parity';
    check(`independent EscapePairs ${mode}: exact count, rate, entropy and unique capture`, e.pairs === (resolved ? 0 : 16) && e.capture === (resolved ? 16 : 0) && near(e.rate, resolved ? 0 : 1 / 15) && e.H2 === (resolved ? 0 : 1));
  }

  const state = async () => { await settle(page); return page.evaluate(() => window.INTERPRETATIONS_DUEL_DEBUG.state); };
  const openCard = async (card, lang = 'zh') => {
    // A full-page card opens at its stated frame. Pointer selection and autoplay are tested separately below.
    await T.goto(BOOK, ID, `?lang=${lang}&preset=${card.id}`);
    return state();
  };
  const input = async (id, value) => {
    await page.locator(`#${id}`).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
    return state();
  };
  const dials = async (theta, u, beta) => { await input('theta', theta); await input('uScale', u); return input('beta', beta); };
  const numbers = (s) => [s.thetaDeg, s.uScale, s.N, s.beta, s.condWeights, s.uncondMarginals, s.condPlusGivenPlus, s.rho,
    s.gamma, s.purity, s.deletedHsMass, s.visibility, s.visibilityFull, s.blochR2, s.tangleLE, s.entropyBits,
    s.pinchEntropyBits, s.pinchDeltaBits, s.chshS, s.chshTerms, s.lorentzGamma, s.deltaTPrime, s.deltaXPrime, s.interval, s.grwProb];
  const fixed = (x, digits) => (Math.abs(x) < 0.5 * 10 ** -digits ? 0 : x).toFixed(digits).replace('-', '−');
  const signed = (x, digits) => `${x >= 0.5 * 10 ** -digits ? '+' : ''}${fixed(x, digits)}`;
  async function visibleReadouts(card, lang) {
    const r = lab(30, card.u), b = boost(card.beta);
    const ro = await page.locator('#readouts').evaluate((el) => Object.fromEntries([...el.querySelectorAll('[id]')].map((x) => [x.id, x.textContent])));
    const expected = {
      'wigner-cut': { roKey: `${fixed(r.visibility, 3)} · ${fixed(r.fullVisibility, 3)}`, ro1: fixed(r.gamma, 4), ro2: fixed(r.purity, 4), ro3: fixed(r.deleted, 4), ro4: '0', ro5: '0.7500', ro6: '50% / 50%' },
      'and-to-or': { roKey: '0.250 + 0.750 = 1.000', ro1: '0.6250', ro2: '0.0000', ro3: '0.0000', ro4: '0.0000', ro6: '1.0 × 10⁻¹⁰' },
      'born-unequal': { roKey: '75.0% / 25.0% · 50% / 50%', ro1: '1.0000', ro2: '1.0000 + 0.0000i', ro3: '0.50 · 0.50', ro4: '+1 · −1', ro5: '0.1875 = 0.1875 + 0 + 0.0000', ro6: '[[-1, 0], [0, -1]] = −I'.replaceAll('-1', '−1') },
      'bell-epr': { roKey: `${fixed(CHSH, 4)} > 2`, ro1: '50% · 50%', ro2: fixed(b.G, 4), ro3: signed(b.dt, 4), ro4: fixed(b.dx, 4), ro5: '−4.0000', ro6: lang === 'zh' ? 'B 先于 A' : 'B before A' },
      'time-horizon': { roKey: `${fixed(r.S, 3)} · ${fixed(r.Hp, 3)}`, ro1: '0', ro2: '16', ro3: '16/240 = 0.0667', ro4: `1.000 ${lang === 'zh' ? '比特' : 'bit'}`, ro5: '—', ro6: '1' },
      'five-way-duel': { roKey: '75%/25% · 50/50 · 2.83', ro1: fixed(r.gamma, 4), ro2: fixed(r.visibility, 4), ro3: fixed(r.purity, 4), ro4: '1.0 × 10⁻¹²' }
    }[card.id];
    const wrong = Object.entries(expected).filter(([key, value]) => ro[key] !== value);
    check(`${card.id} (${lang}): visible numerical readouts match independent expectations`, wrong.length === 0, JSON.stringify(wrong.map(([key, value]) => ({ key, expected: value, actual: ro[key] }))));
  }

  // Every card × lens × angle × environment × boost combination in this grid is checked.
  // Inputs are DOM events; only the read-only snapshot crosses back to the independent arithmetic above.
  const grid = [];
  for (const theta of [0, 15, 30, 45, 90]) for (const u of [0, 2.37, 3.7, 4, 6]) for (const beta of [-0.8, 0, 0.8]) grid.push({ theta, u, beta });
  const refs = grid.map(({ theta, u, beta }) => ({ r: lab(theta, u), b: boost(beta) }));
  for (const card of CARDS) {
    let s = await openCard(card);
    check(`${card.id}: query opens at the declared frame and lens`, s.preset === card.id && s.focus === card.focus && s.lens === card.lens && s.thetaDeg === 30 && s.uScale === card.u && s.N === Math.round(10 ** card.u) && near(s.beta, card.beta) && !s.playing);
    await visibleReadouts(card, 'zh');
    for (const lens of LENSES) {
      const before = await state();
      await page.click(`#lensBar [data-lens="${lens}"]`);
      s = await state();
      check(`${card.id} / ${lens}: switching preserves θ, u, N, β and common predictions`, s.lens === lens && same(numbers(s), numbers(before)) && await page.locator(`#lensBar [data-lens="${lens}"]`).getAttribute('aria-pressed') === 'true');
      const samples = await page.evaluate((settings) => settings.map(({ theta, u, beta }) => {
        for (const [id, value] of [['theta', theta], ['uScale', u], ['beta', beta]]) {
          const el = document.getElementById(id); el.value = String(value); el.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return window.INTERPRETATIONS_DUEL_DEBUG.state;
      }), grid);
      const testGrid = (name, predicate) => {
        const failed = samples.findIndex((v, i) => !predicate(v, refs[i].r, refs[i].b, grid[i]));
        check(`${card.id} / ${lens} / ${grid.length} dial settings: ${name}`, failed === -1, failed < 0 ? '' : JSON.stringify({ input: grid[failed], actual: samples[failed] }));
      };
      testGrid('all three inputs apply and leave the preset', (v, r, b, d) => v.thetaDeg === d.theta && v.uScale === d.u && v.N === r.N && v.beta === d.beta && v.lens === lens && v.preset === null && !v.playing);
      testGrid('heralded weights cos²θ : sin²θ', (v, r) => same(v.condWeights, [r.p, r.q]) && near(v.condPlusGivenPlus, r.conditional));
      testGrid('unconditional EPR marginals stay 50/50', (v, r) => same(r.friend, [0.5, 0.5]) && same(r.bob, [0.5, 0.5]) && near(r.herald, 0.5) && same(v.uncondMarginals, [r.margA, r.margB]) && same(v.uncondMarginals, [0.5, 0.5]));
      testGrid('γ = exp(−N/10⁴)', (v, r) => near(v.gamma, r.gamma));
      testGrid('every reduced density-matrix entry matches the partial trace', (v, r) => same(v.rho, r.rho));
      testGrid('purity from Tr(ρ²) and p² + (1−p)² + 2p(1−p)γ²', (v, r) => near(v.purity, r.purity) && near(v.purity, r.p ** 2 + r.q ** 2 + 2 * r.p * r.q * r.gamma ** 2));
      testGrid('deleted HS coherence C = 2p(1−p)γ²', (v, r) => near(v.deletedHsMass, r.deleted) && near(v.deletedHsMass, 2 * r.p * r.q * r.gamma ** 2));
      testGrid('visibility V = 2√(p(1−p))γ and full-access visibility', (v, r) => near(v.visibility, r.visibility) && near(v.visibility, 2 * Math.sqrt(r.p * r.q) * r.gamma) && near(v.visibilityFull, r.fullVisibility));
      testGrid('conditional Bloch radius and pure-bipartition tangle sum to 1', (v, r) => near(v.blochR2, r.r2) && near(v.tangleLE, r.tangle) && near(v.blochR2 + v.tangleLE, 1) && near(v.tangleLE, 2 * (1 - r.purity)));
      testGrid('reduced entropy from the spectrum, in bits', (v, r) => near(v.entropyBits, r.S));
      testGrid('pinching entropy and its nonnegative increment, in bits', (v, r) => near(v.pinchEntropyBits, r.Hp) && near(v.pinchDeltaBits, r.dS) && v.pinchDeltaBits >= -2e-12 && near(v.entropyBits + v.pinchDeltaBits, v.pinchEntropyBits));
      testGrid('GRW q = −expm1(−N·10⁻¹⁶), with relative precision', (v, r) => v.grwProb > 0 && Math.abs(v.grwProb / r.grw - 1) < 2e-14);
      testGrid('all four CHSH terms and their 4×4 operator expectation', (v) => same(v.chshTerms, CHSH_TERMS) && near(v.chshS, CHSH) && near(v.chshS, 2 * Math.SQRT2));
      testGrid('Lorentz-transformed event differences and spacelike interval −4', (v, r, b) => near(v.lorentzGamma, b.G) && near(v.deltaTPrime, b.dt) && near(v.deltaXPrime, b.dx) && near(v.interval, b.dt ** 2 - b.dx ** 2) && near(v.interval, -4));
      testGrid('seeded record uses the displayed ξ and conditional weight', (v, r) => v.xi >= 0 && v.xi < 1 && v.sampledRecord === (v.xi < r.p ? 0 : 1));
      testGrid('unit products, R² and Robertson–Schrödinger arithmetic', (v, r) => same(v.abba, [1, 0]) && same(v.rSquared, [[-1, 0], [0, -1]]) && near(v.robertson.varZ, r.varZ) && near(v.robertson.varX, r.varX) && near(v.robertson.prod, r.varianceProduct) && near(v.robertson.C2, r.covariance ** 2) && near(v.robertson.K2, 0) && near(v.robertson.G, 0));
      testGrid('Bell local sector vanishes and correlation sector is diag(1,−1,1)', (v) => same(v.sectors.local, Array(6).fill(0)) && same(v.sectors.correlation, [[1, 0, 0], [0, -1, 0], [0, 0, 1]]));
      for (const mode of ['none', 'parity', 'redundant']) {
        const previous = await state(), e = escapes(mode);
        await page.click(`[data-parity="${mode}"]`); s = await state();
        check(`${card.id} / ${lens}: ${mode} EscapePairs agrees with all 240 ordered comparisons`, s.parityMode === mode && s.escapePairs === e.pairs && near(s.escapeRate, e.rate) && near(s.escapeEntropyBits, e.H2) && s.uniqueCapture === e.capture && same(numbers(s), numbers(previous)));
      }
    }
  }

  let s = await openCard(CARDS[0]);
  check('θ = 30°, N = 1 approaches (r²,τ,C,V) = (1,0,3/8,√3/2)', near(s.blochR2, 1, 0.00015) && near(s.tangleLE, 0, 0.00015) && near(s.deletedHsMass, 3 / 8, 0.000075) && near(s.visibility, Math.sqrt(3) / 2, 0.000087));
  s = await input('uScale', 6);
  check('θ = 30°, N = 10⁶ gives (1/4,3/4,0,0), purity 5/8 and h₂(3/4)', same([s.blochR2, s.tangleLE, s.deletedHsMass, s.visibility], [0.25, 0.75, 0, 0]) && near(s.purity, 5 / 8) && near(s.entropyBits, 0.8112781244591328) && near(s.pinchEntropyBits, 0.8112781244591328) && near(s.pinchDeltaBits, 0) && near(s.grwProb, 1e-10, 1e-20));
  s = await input('uScale', 0);
  const limit = lab(30, 0);
  check('N = 1 retains its finite overlap and small nonzero tangle', s.N === 1 && near(s.gamma, limit.gamma) && near(s.blochR2, limit.r2) && s.blochR2 < 1 && near(s.tangleLE, limit.tangle) && s.tangleLE > 0);

  // Actual slider keyboard handling, including non-integer environment sizes and endpoints.
  for (const [id, low, high, step] of [['theta', 0, 90, 0.5], ['uScale', 0, 6, 0.01], ['beta', -0.8, 0.8, 0.01]]) {
    const field = id === 'theta' ? 'thetaDeg' : id;
    await page.locator(`#${id}`).focus(); await page.keyboard.press('Home'); s = await state();
    check(`${id}: Home reaches the lower endpoint`, near(s[field], low));
    await page.keyboard.press('ArrowRight'); s = await state();
    check(`${id}: ArrowRight follows the declared step`, near(s[field], low + step));
    await page.keyboard.press('End'); s = await state();
    check(`${id}: End reaches the upper endpoint`, near(s[field], high));
  }
  s = await dials(37.5, 3.7, -0.35);
  check('fractional environment dial rounds 10^3.7 to 5012', s.N === 5012 && near(s.gamma, Math.exp(-5012 / 10000)));
  for (const lens of LENSES) {
    const before = s; await page.click(`#lensBar [data-lens="${lens}"]`); s = await state();
    check(`nondefault dials survive ${lens}`, s.thetaDeg === 37.5 && s.uScale === 3.7 && s.N === 5012 && s.beta === -0.35 && same(numbers(s), numbers(before)));
  }
  for (let i = 0; i < 8; i++) {
    const before = s; await page.click('#xiBtn'); s = await state();
    check(`redraw ${i + 1}: ξ changes and selects a record without changing predictions`, s.xi >= 0 && s.xi < 1 && s.xi !== before.xi && s.sampledRecord === (s.xi < Math.cos(37.5 * Math.PI / 180) ** 2 ? 0 : 1) && same(numbers(s), numbers(before)));
  }

  await openCard(CARDS[3]);
  const boostInvariants = (v) => [...numbers(v).slice(4, 20), v.grwProb];
  const invariant = boostInvariants(await state());
  for (const beta of [-0.8, 0, 0.8]) {
    s = await input('beta', beta);
    const order = beta < 0 ? 'A 先于 B' : beta > 0 ? 'B 先于 A' : '同时';
    check(`β = ${beta}: spacelike event order and exact endpoint coordinates`, near(s.deltaTPrime, beta === 0 ? 0 : -Math.sign(beta) * 8 / 3) && near(s.deltaXPrime, beta === 0 ? 2 : 10 / 3) && near(s.interval, -4) && await page.textContent('#ro6') === order);
    check(`β = ${beta}: Born weights, γ, CHSH and marginals are unchanged`, same(boostInvariants(s), invariant));
  }

  // Direct manipulation of the amber angle, the spacetime diagram and a duel column.
  await openCard(CARDS[0]);
  let handle = await page.evaluate(() => window.INTERPRETATIONS_DUEL_DEBUG.handles().find((h) => h.kind === 'theta'));
  check('the stage exposes an angle drag region', !!handle);
  if (handle) {
    const x = handle.left + handle.x, y = handle.top + handle.y;
    await page.mouse.move(x + handle.r * 0.3, y); await page.mouse.down();
    await page.mouse.move(x + handle.r * 0.35, y - handle.r * 0.35 * Math.sqrt(3), { steps: 5 }); await page.mouse.up(); s = await state();
    check('dragging the amber angle sets θ near 60° and updates the conditional weights', near(s.thetaDeg, 60, 2) && near(s.condWeights[0], Math.cos(s.thetaDeg * Math.PI / 180) ** 2) && s.preset === null && same(s.uncondMarginals, [0.5, 0.5]));
  }
  await openCard(CARDS[3]);
  handle = await page.evaluate(() => window.INTERPRETATIONS_DUEL_DEBUG.handles().find((h) => h.kind === 'beta'));
  check('the stage exposes a spacetime drag region', !!handle);
  if (handle) {
    const y = handle.top + (handle.y0 + handle.y1) / 2;
    await page.mouse.move(handle.left + (handle.x0 + handle.x1) / 2, y); await page.mouse.down();
    await page.mouse.move(handle.left + handle.x0 + 0.75 * (handle.x1 - handle.x0), y, { steps: 5 }); await page.mouse.up(); s = await state();
    check('dragging spacetime sets β near +0.4 without moving marginals', near(s.beta, 0.4, 0.01) && near(s.deltaTPrime, boost(s.beta).dt) && same(s.uncondMarginals, [0.5, 0.5]) && s.preset === null);
  }
  await openCard(CARDS[5]);
  handle = await page.evaluate(() => window.INTERPRETATIONS_DUEL_DEBUG.handles().find((h) => h.kind === 'lens' && h.id === 'grw-collapse'));
  check('the duel exposes a selectable GRW column', !!handle);
  if (handle) {
    const before = await state();
    await page.mouse.click(handle.left + (handle.x0 + handle.x1) / 2, handle.top + (handle.y0 + handle.y1) / 2); s = await state();
    check('clicking a duel column selects its lens and keeps the dials', s.lens === 'grw-collapse' && same(numbers(s), numbers(before)));
  }

  // Both language routes render every card; switching languages must preserve the experiment.
  for (const card of CARDS) {
    s = await openCard(card, 'en');
    check(`${card.id}: ?lang=en sets English labels and accessibility names`, await page.locator('html').getAttribute('lang') === 'en' && await page.locator('#theta').evaluate((el) => el.labels[0].innerText.includes('Measurement angle')) && await page.locator('#play').getAttribute('aria-label') === 'Play / pause');
    await visibleReadouts(card, 'en');
    const before = numbers(s);
    await page.click('[data-lang-set="zh"]'); s = await state();
    check(`${card.id}: Chinese switch keeps all numerical predictions`, await page.locator('html').getAttribute('lang') === 'zh-CN' && same(numbers(s), before));
    await page.click('[data-lang-set="en"]'); s = await state();
    check(`${card.id}: English switch keeps all numerical predictions`, await page.locator('html').getAttribute('lang') === 'en' && same(numbers(s), before));
  }

  // Exercise each rail mapping through transport buttons, range events and keyboard shortcuts.
  for (const [card, maximum, step, field, offset] of [[CARDS[0], 6, 1, 'uScale', 0], [CARDS[2], 90, 15, 'thetaDeg', 0], [CARDS[3], 1.6, 0.2, 'beta', -0.8]]) {
    await openCard(card, 'en');
    s = await input('now', maximum / 2);
    check(`${card.id}: scrubber maps to its own physical dial`, near(s.max, maximum) && near(s.t, maximum / 2) && near(s[field], maximum / 2 + offset));
    await page.click('#rew'); s = await state();
    check(`${card.id}: rewind pauses at the rail origin`, !s.playing && s.t === 0 && near(s[field], offset));
    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press('ArrowRight'); s = await state();
    check(`${card.id}: keyboard advances one physical step`, near(s.t, step) && near(s[field], step + offset));
    await page.keyboard.press('Home');
    await page.click('[data-speed="2"]');
    check(`${card.id}: speed chips select 2× exclusively`, await page.locator('[data-speed="2"]').getAttribute('aria-pressed') === 'true' && await page.locator('[data-speed][aria-pressed="true"]').count() === 1);
    await page.click('#play');
    check(`${card.id}: Play advances on delivered frames`, await until(page, () => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return d.playing && d.t > 0; }));
    await page.click('#play'); s = await state();
    const paused = s.t;
    check(`${card.id}: Pause updates the clock and button`, !s.playing && await page.locator('#play').getAttribute('aria-pressed') === 'false');
    const frames = await page.evaluate(async () => {
      const values = [];
      for (let i = 0; i < 2; i++) { await new Promise(requestAnimationFrame); values.push(window.INTERPRETATIONS_DUEL_DEBUG.state.t); }
      return values;
    });
    check(`${card.id}: paused time stays fixed across subsequent frames`, frames.every((t) => t === paused));
    await page.evaluate(() => document.activeElement?.blur()); await page.keyboard.press(' ');
    check(`${card.id}: Space resumes playback`, await until(page, (t) => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return d.playing && d.t > t; }, paused));
    await page.keyboard.press(' '); s = await state();
    check(`${card.id}: Space pauses playback`, !s.playing);
    await input('now', maximum - step / 100); await page.click('#play');
    check(`${card.id}: playback stops exactly at the endpoint`, await until(page, (max) => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return !d.playing && Math.abs(d.t - max) < 1e-12; }, maximum));
    s = await state();
    check(`${card.id}: endpoint updates the physical dial`, near(s[field], maximum + offset));
  }
  for (const card of CARDS.filter((c) => c.stop != null)) {
    await openCard(CARDS[0], 'en'); await page.click(`[data-preset="${card.id}"]`);
    check(`${card.id}: pointer selection starts its automatic sweep`, await until(page, () => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return d.playing && d.t > 0; }));
    // Scrub close to the landmark and cross it on a real frame; no wall-clock delay assumes a frame rate.
    await input('now', card.stop - 0.001); await page.click('#play');
    check(`${card.id}: automatic sweep stops at its stated landmark`, await until(page, (stop) => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return !d.playing && Math.abs(d.t - stop) < 1e-12; }, card.stop));
    s = await state();
    check(`${card.id}: automatic endpoint restores the promised experiment`, s.thetaDeg === 30 && s.N === Math.round(10 ** card.u) && near(s.beta, card.beta));
  }

  // Probability against expectation (born-unequal), and the AND-to-OR limit note under ordinary overrides.
  // Expected values come from vectors and a partial trace written here; the page is read only through what a reader
  // sees: readout rows, notes, legend, and the strings the stage canvas actually paints (with their boxes).
  const KET = { '+': [Math.SQRT1_2, Math.SQRT1_2], '−': [Math.SQRT1_2, -Math.SQRT1_2] }, P0 = [[1, 0], [0, 0]];
  const probZ = (k) => dot(KET[k], mv(P0, KET[k])), expX = (k) => dot(KET[k], mv(X, KET[k]));
  const paintedText = (p) => p.evaluate(() => {
    const C = CanvasRenderingContext2D.prototype;
    if (!C.duelTextProbe) {
      const fill = C.fillText, clear = C.clearRect;
      C.clearRect = function (...a) { if (this.canvas.id === 'cv' && !a[0] && !a[1]) window.duelText = []; return clear.apply(this, a); };
      C.fillText = function (str, x, y, ...rest) {
        if (this.canvas.id === 'cv') {
          const m = this.measureText(String(str));
          (window.duelText = window.duelText || []).push({ s: String(str), l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: y - m.actualBoundingBoxAscent, b: y + m.actualBoundingBoxDescent,
            size: parseFloat(/([\d.]+)px/.exec(this.font)[1]), W: this.canvas.clientWidth, H: this.canvas.clientHeight });
        }
        return fill.call(this, str, x, y, ...rest);
      };
      C.duelTextProbe = true;
    }
    window.TRV.kit.flush();
    return (window.duelText || []).slice();
  });
  const overlaps = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
  const plain = (str) => str.replace(/\u00a0/g, ' ');   // no-break spaces keep P(Z = +1) on one line
  async function bornCanvas(p, where) {
    const texts = await paintedText(p), prob = texts.filter((t) => t.s === 'P(Z = +1)'), expn = texts.filter((t) => t.s === '⟨X⟩');
    const kets = texts.filter((t) => t.s === '|+⟩' || t.s === '|−⟩'), mid = (t) => (t.l + t.r) / 2;
    const between = (t, a, b) => !!t && !!a && !!b && mid(a) < mid(t) && mid(t) < mid(b);
    check(`${where}: the stage names the cyan bars the probability P(Z = +1) and the magenta bars the expectation ⟨X⟩`,
      prob.length === 1 && expn.length === 1 && kets.length === 4 && !texts.some((t) => t.s === 'Z' || t.s === 'X') && between(prob[0], kets[0], kets[1]) && between(expn[0], kets[2], kets[3]),
      JSON.stringify(texts.filter((t) => /Z|X|\|[+−]⟩/.test(t.s)).map((t) => t.s)));
    const bad = [...prob, ...expn].filter((t) => !(t.l >= 0 && t.r <= t.W && t.t >= 0 && t.b <= t.H && t.size >= 9 && texts.every((o) => o === t || !overlaps(t, o))));
    check(`${where}: both statistic labels are painted whole, at reading size and clear of every other label`, prob.length + expn.length === 2 && bad.length === 0, JSON.stringify(bad));
  }
  async function bornReadouts(lang) {
    const rows = (await page.evaluate(() => [1, 2, 3, 4, 5, 6].map((i) => [document.getElementById(`roL${i}`).textContent, document.getElementById(`ro${i}`).textContent]))).map((r) => r.map(plain));
    const word = lang === 'zh' ? { prob: '概率', exp: '期望' } : { prob: 'probability', exp: 'expectation' };
    const probRow = rows.find(([l]) => l.includes('P(Z = +1)')), expRow = rows.find(([l]) => l.includes('⟨X⟩'));
    const pv = `${fixed(probZ('+'), 2)} · ${fixed(probZ('−'), 2)}`, xv = `${signed(expX('+'), 0)} · ${signed(expX('−'), 0)}`;
    check(`born-unequal (${lang}): the readout row showing ${pv} is named the probability P(Z = +1) of |+⟩, |−⟩`, !!probRow && probRow[0].includes(word.prob) && probRow[1] === pv, JSON.stringify(rows));
    check(`born-unequal (${lang}): the readout row showing ${xv} is named the expectation ⟨X⟩ of |+⟩, |−⟩`, !!expRow && expRow[0].includes(word.exp) && expRow[1] === xv, JSON.stringify(rows));
    return [probRow, expRow];
  }
  for (const lang of ['zh', 'en']) {
    await openCard(CARDS[2], lang);
    const rows = await bornReadouts(lang);
    const note = plain(await page.textContent('#presetNote')), legend = plain(await page.textContent('#legend'));
    check(`born-unequal (${lang}): the card note gives ½ as the probability P(Z = +1) and +1, −1 as the expectation ⟨X⟩`, /P\(Z = \+1\)[^。;]*½/.test(note) && /⟨X⟩[^。;]*\+1[^。;]*−1/.test(note), note);
    check(`born-unequal (${lang}): the magenta legend names the expectation ⟨X⟩`, legend.includes('⟨X⟩') && legend.includes(lang === 'zh' ? '期望' : 'expectation'), legend);
    await bornCanvas(page, `born-unequal desktop 1440 (${lang})`);
    for (const theta of [0, 45, 90]) {
      await input('theta', theta);
      check(`born-unequal (${lang}) after θ = ${theta}°: the P(Z = +1) and ⟨X⟩ rows keep their values and names`, JSON.stringify(await bornReadouts(lang)) === JSON.stringify(rows));
    }
    for (const [view, query, viewport] of [['cited embed 740', `?embed=1&lang=${lang}&preset=born-unequal`, { width: 740, height: 500 }],
      ['phone 390', `?lang=${lang}&preset=born-unequal`, { width: 390, height: 844 }], ['still 800×450', `?shot=1&lang=${lang}&preset=born-unequal`, { width: 800, height: 450 }]]) {
      const p = await T.open(BOOK, ID, query, { viewport, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
      await settle(p); await bornCanvas(p, `born-unequal ${view} (${lang})`);
      await p.context().close();
    }
  }

  // The AND-to-OR readout note states limits as γ → 0. Whatever θ the reader sets, every limit it states without a
  // condition must equal the limit of the actual state, and the fixed 30° example must stay (qualified and correct).
  const close = (text, i) => { let depth = 0; for (let j = i; j < text.length; j++) { if (text[j] === '(') depth++; else if (text[j] === ')' && --depth === 0) return j + 1; } return -1; };
  const topSplit = (str) => { const out = ['']; let depth = 0; for (const ch of str) { if (ch === ',' && depth === 0) { out.push(''); continue; } if (ch === '(') depth++; if (ch === ')') depth--; out[out.length - 1] += ch; } return out.map((x) => x.trim()); };
  /** Value of a displayed expression in p: numbers, fractions, p, parentheses, + and −, implicit products, squares. */
  function evalIn(expr, p) {
    const src = expr.replace(/\s+/g, ''); let i = 0;
    const atom = () => {
      let v;
      if (src[i] === '(') { i++; v = sum(); if (src[i++] !== ')') throw new Error(`unbalanced ${expr}`); }
      else if (src[i] === 'p') { i++; v = p; }
      else { const m = /^\d+(\.\d+)?/.exec(src.slice(i)); if (!m) throw new Error(`cannot read ${expr}`); i += m[0].length; v = Number(m[0]); }
      while (src[i] === '²') { i++; v *= v; }
      return v;
    };
    const product = () => { let v = atom(); for (;;) { if (src[i] === '/') { i++; v /= atom(); } else if (/[(p\d]/.test(src[i] || '')) v *= atom(); else return v; } };
    function sum() { let v = product(); for (;;) { if (src[i] === '+') { i++; v += product(); } else if (src[i] === '−' || src[i] === '-') { i++; v -= product(); } else return v; } }
    const v = sum(); if (i !== src.length) throw new Error(`cannot read ${expr}`); return v;
  }
  const EXPR = /^[\dp²+−\-/().\s]+$/;
  function exprAfter(text, key) {
    const k = text.indexOf(key); if (k < 0) return null;
    let i = k + key.length, out = '';
    while (i < text.length) {
      if (text[i] === '(') { const j = close(text, i); if (j < 0 || !EXPR.test(text.slice(i, j))) break; out += text.slice(i, j); i = j; } else if (/[\dp²+−\-/.\s]/.test(text[i])) out += text[i++]; else break;
    }
    return out.trim() || null;
  }
  function tupleAfter(text, key) {
    const k = text.indexOf(key); if (k < 0) return null;
    const i = text.indexOf('(', k + key.length), j = i < 0 ? -1 : close(text, i);
    return j < 0 || text.slice(k + key.length, i).trim() ? null : topSplit(text.slice(i + 1, j - 1));
  }
  /** γ = 0: the two environment records are orthogonal, so tracing them out leaves diag(cos²θ, sin²θ). */
  function decohered(thetaDeg) {
    const c = Math.cos(thetaDeg * Math.PI / 180), s = Math.sin(thetaDeg * Math.PI / 180), rho = [[c * c, 0], [0, s * s]];
    const det = rho[0][0] * rho[1][1] - rho[0][1] * rho[1][0], tr2 = mul(rho, rho)[0][0] + mul(rho, rho)[1][1];
    return { p: c * c, tuple: [(rho[0][0] - rho[1][1]) ** 2 + 4 * rho[0][1] ** 2, 4 * det, 2 * rho[0][1] ** 2, 2 * Math.abs(rho[0][1])], purity: tr2 };
  }
  const purityKey = (lang) => (lang === 'zh' ? '纯度 →' : 'purity →');
  /** [] when the note is truthful at θ (and, at N = 10⁶, agrees with the visible readouts); otherwise the reasons. */
  function noteProblems(o, lang) {
    const why = [], d = decohered(o.theta), tuple = tupleAfter(o.note, '(r², τ, C, V) →'), purity = exprAfter(o.note, purityKey(lang));
    let tv = null, pv = null;
    try { tv = tuple && tuple.length === 4 ? tuple.map((x) => evalIn(x, d.p)) : null; pv = purity == null ? null : evalIn(purity, d.p); } catch (e) { why.push(e.message); }
    if (!tv || !tv.every((v, k) => near(v, d.tuple[k]))) why.push(`limit (r², τ, C, V) → ${tuple && tuple.join(', ')} is ${tv && tv.map((v) => fixed(v, 4)).join(', ')} at θ = ${o.theta}°, the state's limit is ${d.tuple.map((v) => fixed(v, 4)).join(', ')}`);
    if (pv == null || !near(pv, d.purity)) why.push(`purity limit ${purity} is ${pv} at θ = ${o.theta}°, the state's limit is ${d.purity}`);
    if (o.u === 6 && tv && pv != null) {
      // at N = 10⁶ (γ = e⁻¹⁰⁰) the shown r², τ, purity, C, V must be the independent partial trace and the note's limit, to display precision
      const r = lab(o.theta, 6), num = (x) => Number(String(x).replace(/−/g, '-')), key = o.key.split(/[+=]/).map(num);
      const shown = [key[0], key[1], num(o.ro1), num(o.ro2), num(o.ro3)], exact = [r.r2, r.tangle, r.purity, r.deleted, r.visibility], fromNote = [tv[0], tv[1], pv, tv[2], tv[3]], digits = [3, 3, 4, 4, 4];
      const off = shown.some((x, k) => !(Math.abs(x - exact[k]) <= 0.5 * 10 ** -digits[k] + 1e-12 && Math.abs(x - fromNote[k]) <= 0.5 * 10 ** -digits[k] + 1e-12));
      if (off || !(Math.abs(key[2] - 1) <= 5e-4 + 1e-12)) why.push(`N = 10⁶ readouts ${JSON.stringify([o.key, o.ro1, o.ro2, o.ro3])}, independent ${JSON.stringify(exact)}, note ${JSON.stringify(fromNote)}`);
    }
    return why;
  }
  /** The 30° example survives: a parenthesis that opens with θ = 30° holds a tuple and a purity equal to that limit. */
  function example30(note, lang) {
    const k = note.indexOf('θ = 30°'), d = decohered(30);
    if (k < 0) return false;
    const open = Math.max(note.lastIndexOf('(', k), note.lastIndexOf('（', k)), shut = open < 0 ? -1 : note[open] === '（' ? note.indexOf('）', k) : close(note, open) - 1;
    if (open < 0 || shut < 0) return false;
    const seg = note.slice(open + 1, shut), t = /\(([^()]*)\)/.exec(seg), frac = /(\d+)\/(\d+)/.exec(seg.replace(/\([^()]*\)/g, ''));
    return !!t && topSplit(t[1]).length === 4 && topSplit(t[1]).every((x, i) => near(evalIn(x, 0), d.tuple[i])) && !!frac && near(frac[1] / frac[2], d.purity);
  }
  const andOrView = (p) => p.evaluate(() => {
    const txt = (id) => document.getElementById(id).textContent;
    return { note: txt('roNote'), key: txt('roKey'), ro1: txt('ro1'), ro2: txt('ro2'), ro3: txt('ro3'), hud: txt('hudBig'), shownTheta: txt('oTheta'), pill: document.querySelector('#pillAngle strong').textContent, shownN: txt('oU'),
      card: document.querySelector('[data-preset="and-to-or"]').getAttribute('aria-pressed') === 'true' };
  });
  const andOrHud = (lang) => (lang === 'zh' ? '从“与”到“或”' : 'From AND to OR');
  const viewState = (v, theta, u) => Object.assign({}, v, { theta, u });
  for (const lang of ['zh', 'en']) {
    s = await openCard(CARDS[1], lang);
    let v = await andOrView(page);
    check(`and-to-or (${lang}): the preset opens on AND-to-OR at θ = 30°, N = 10⁶ with a truthful limit note and its 30° example`, v.card && v.hud.startsWith(andOrHud(lang)) && v.shownN === 'N = 10⁶' && noteProblems(viewState(v, 30, 6), lang).length === 0 && example30(v.note, lang), JSON.stringify([v, noteProblems(viewState(v, 30, 6), lang)]));
    // every slider position of θ, entered as the reader enters it (an input event on the range), N kept at 10⁶
    const sweep = await page.evaluate(() => {
      const el = document.getElementById('theta'), out = [];
      for (let k = 0; k <= 180; k++) {
        el.value = String(k / 2); el.dispatchEvent(new Event('input', { bubbles: true })); window.TRV.kit.flush();
        const txt = (id) => document.getElementById(id).textContent;
        out.push({ value: k / 2, note: txt('roNote'), key: txt('roKey'), ro1: txt('ro1'), ro2: txt('ro2'), ro3: txt('ro3'), hud: txt('hudBig'), shownTheta: txt('oTheta'), shownN: txt('oU'), card: document.querySelector('[data-preset="and-to-or"]').getAttribute('aria-pressed') === 'true' });
      }
      return out;
    });
    const sweepBad = sweep.map((o) => ({ o, why: o.shownTheta !== `${fixed(o.value, 1)}°` || !o.hud.startsWith(andOrHud(lang)) || o.card || o.shownN !== 'N = 10⁶' ? ['input not applied as shown'] : noteProblems(viewState(o, o.value, 6), lang) })).filter((x) => x.why.length);
    check(`and-to-or (${lang}): all ${sweep.length} θ slider positions 0°–90° (step 0.5°, N = 10⁶) keep a truthful limit note that matches the visible readouts`, sweep.length === 181 && sweepBad.length === 0,
      `${sweepBad.length} failing, e.g. ${JSON.stringify(sweepBad.slice(0, 2).map((x) => ({ theta: x.o.value, note: x.o.note, why: x.why })))}`);
    check(`and-to-or (${lang}): the 30° example is kept with its qualifier at every slider position`, sweep.every((o) => example30(o.note, lang)));
    // keyboard on the θ slider
    for (const [key, theta] of [['End', 90], ['Home', 0], ['ArrowRight', 0.5]]) {
      await page.locator('#theta').focus(); await page.keyboard.press(key); await settle(page); v = await andOrView(page);
      check(`and-to-or (${lang}): keyboard ${key} on θ (→ ${theta}°) keeps a truthful limit note`, v.shownTheta === `${fixed(theta, 1)}°` && noteProblems(viewState(v, theta, 6), lang).length === 0, JSON.stringify([v.shownTheta, noteProblems(viewState(v, theta, 6), lang)]));
    }
    // dragging the amber arrow on the stage: continuous θ between the slider steps
    for (const target of [44.3, 71.8]) {
      const h = await page.evaluate(() => window.INTERPRETATIONS_DUEL_DEBUG.handles().find((x) => x.kind === 'theta'));
      const x = h.left + h.x, y = h.top + h.y, a = target * Math.PI / 180;
      await page.mouse.move(x + h.r * 0.3, y); await page.mouse.down();
      await page.mouse.move(x + h.r * 0.7 * Math.cos(a), y - h.r * 0.7 * Math.sin(a), { steps: 6 }); await page.mouse.up();
      s = await state(); v = await andOrView(page);
      check(`and-to-or (${lang}): dragging the amber arrow to θ = ${fixed(s.thetaDeg, 2)}° keeps a truthful limit note`, near(s.thetaDeg, target, 1.5) && v.pill === `${fixed(s.thetaDeg, 1)}°` && v.hud.startsWith(andOrHud(lang)) && noteProblems(viewState(v, s.thetaDeg, 6), lang).length === 0,
        JSON.stringify([v.pill, noteProblems(viewState(v, s.thetaDeg, 6), lang)]));
    }
    // lens, parity and ξ controls at an overridden θ leave the note truthful (and unchanged)
    s = await input('theta', 45); const at45 = (await andOrView(page)).note;
    for (const lens of LENSES) {
      await page.click(`#lensBar [data-lens="${lens}"]`); await settle(page); v = await andOrView(page);
      check(`and-to-or (${lang}) θ = 45°, lens ${lens}: the limit note stays truthful`, v.note === at45 && noteProblems(viewState(v, 45, 6), lang).length === 0);
    }
    for (const mode of ['parity', 'redundant', 'none']) { await page.click(`[data-parity="${mode}"]`); await settle(page); }
    await page.click('#xiBtn'); await settle(page); v = await andOrView(page);
    check(`and-to-or (${lang}) θ = 45°: parity readouts and a ξ redraw leave the limit note truthful`, v.note === at45 && noteProblems(viewState(v, 45, 6), lang).length === 0);
    // the rail: rewind to N = 1, scrub, then play to the end at θ = 45°
    await page.click('#rew'); s = await state(); v = await andOrView(page);
    check(`and-to-or (${lang}) θ = 45°, rail rewound to N = 1: the note still states the true γ → 0 limit`, s.N === 1 && noteProblems(viewState(v, 45, 0), lang).length === 0);
    s = await input('now', 4.5); v = await andOrView(page);
    check(`and-to-or (${lang}) θ = 45°, rail scrubbed to lg N = 4.5: the note still states the true γ → 0 limit`, near(s.uScale, 4.5) && noteProblems(viewState(v, 45, 4.5), lang).length === 0);
    // play on delivered frames from N = 1, then scrub close to the end and cross it on a real frame (no frame-rate assumption)
    await page.click('#rew'); await page.click('#play');
    check(`and-to-or (${lang}) θ = 45°: the rail plays from N = 1`, await until(page, () => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return d.playing && d.t > 0 && d.thetaDeg === 45; }));
    await input('now', 6 - 0.001); await page.click('#play');
    check(`and-to-or (${lang}) θ = 45°: playing the rail reaches N = 10⁶`, await until(page, () => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return !d.playing && Math.abs(d.t - 6) < 1e-12 && d.N === 1e6; }));
    v = await andOrView(page);
    check(`and-to-or (${lang}) θ = 45°, after playback to N = 10⁶: note and visible readouts agree with the independent limit`, v.shownN === 'N = 10⁶' && noteProblems(viewState(v, 45, 6), lang).length === 0, JSON.stringify([v, noteProblems(viewState(v, 45, 6), lang)]));
    // picking the card again restores θ = 30° and its own sweep
    await page.click('[data-preset="and-to-or"]');
    check(`and-to-or (${lang}): picking the card again starts its sweep at θ = 30°`, await until(page, () => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return d.playing && d.t > 0 && d.thetaDeg === 30; }));
    await input('now', 6 - 0.001); await page.click('#play');
    check(`and-to-or (${lang}): the card's sweep stops at N = 10⁶`, await until(page, () => { const d = window.INTERPRETATIONS_DUEL_DEBUG.state; return !d.playing && Math.abs(d.t - 6) < 1e-12 && d.N === 1e6 && d.thetaDeg === 30; }));
    v = await andOrView(page);
    check(`and-to-or (${lang}): after the card's own sweep the note is truthful and keeps its 30° example`, v.card && noteProblems(viewState(v, 30, 6), lang).length === 0 && example30(v.note, lang));
  }
  // Cited figures on a phone (the six cards as Appendix D cites them, 334 and 358 px wide): the stage is short there, and
  // the caption of every card describes its readout picture. That picture must be on the stage in both languages: its
  // panels, named as below, painted whole between the stage title and the legend; the cut and AND-to-OR cards, whose
  // captions also point at the sealed lab, keep the lab above it. The Born card's two statistics keep their labels clear.
  const READOUT = {
    'wigner-cut': [['朋友在里面：捏合 P(ρ)', '维格纳在外面：ρ（只碰 SF）', '维格纳能看到的干涉可见度'], ['Friend inside: pinched P(ρ)', 'Wigner outside: ρ (SF only)', 'Interference Wigner can see']],
    'and-to-or': [['“与”：退相干后的混合 ρ', '纯度账：r² + τ = 1', '“或”：抽出一行（模型）'], ['AND: the decohered mixture ρ', 'Purity ledger: r² + τ = 1', 'OR: draw one row (model)']],
    'born-unequal': [['|u⟩ 与它的两段影子', '条件与无条件', '分支数与权重 · 对角读数的盲区'], ['|u⟩ and its two shadows', 'Conditional and unconditional', 'Branch count and weights · the diagonal blind spot']],
    'bell-epr': [['CHSH：四组设置', '换参考系：先后颠倒', '边缘只看见 6 维：局部 6 + 关联 9'], ['CHSH: four settings', 'Change frame: the order flips', 'Marginals see 6: local 6 + correlation 9']],
    'time-horizon': [['熵账（比特）', '16 个态的视界', '有限层：总留一条正交方向'], ['Entropy (bits)', 'A horizon of 16 states', 'A finite layer leaves an orthogonal direction']],
    'five-way-duel': [['哥本哈根', '多世界', '导航波', '客观坍缩', '正交开维'], ['Copenhagen', 'Many-worlds', 'Pilot wave', 'GRW collapse', 'Open dimension']]
  };
  const SEALED_LAB = { zh: '密封实验室 · SF + E', en: 'Sealed lab · SF + E' }, CAPTION_LAB = new Set(['wigner-cut', 'and-to-or']);
  for (const lang of ['zh', 'en']) for (const w of [334, 358]) for (const card of CARDS) {
    const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card.id}`, { viewport: { width: w, height: card.id === 'five-way-duel' ? 520 : 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    const where = `${card.id} cited on a phone ${w} px (${lang})`, texts = await paintedText(p);
    const geo = await p.evaluate(() => { const c = document.getElementById('cv').getBoundingClientRect(), h = document.getElementById('hudTl').getBoundingClientRect(), l = document.getElementById('legend').getBoundingClientRect(); return { hud: h.bottom - c.top, legend: l.top - c.top }; });
    const whole = (t) => !!t && t.l >= 0 && t.r <= t.W && t.t >= geo.hud && t.b <= geo.legend;
    const want = READOUT[card.id][lang === 'zh' ? 0 : 1], panels = want.map((x) => texts.find((t) => t.s === x));
    check(`${where}: the readout picture its caption describes is on the stage (${want.join(' · ')}), painted whole between the title and the legend`,
      panels.every(whole), JSON.stringify({ missing: want.filter((x, i) => !whole(panels[i])), geo, painted: texts.length }));
    if (CAPTION_LAB.has(card.id)) {
      const labT = texts.find((t) => t.s === SEALED_LAB[lang]);
      check(`${where}: the sealed lab its caption points at stays on the stage, above the readout picture`, whole(labT) && panels.every((t) => !t || labT.b <= t.t), JSON.stringify({ lab: labT, geo }));
    }
    if (card.id === 'born-unequal') {
      await bornCanvas(p, where);
      // the bar scale must not turn over in a short panel: the kets of P(Z = +1) = ½, ½ and of ⟨X⟩ = +1 sit above the
      // axis the statistic labels mark, the ket of ⟨X⟩ = −1 below it
      const kets = texts.filter((t) => t.s === '|+⟩' || t.s === '|−⟩'), prob = texts.find((t) => t.s === 'P(Z = +1)'), expn = texts.find((t) => t.s === '⟨X⟩');
      const values = [probZ('+'), probZ('−'), expX('+'), expX('−')], axis = prob && expn ? Math.min(prob.t, expn.t) : NaN;
      check(`${where}: the kets of the positive values (${values.slice(0, 3).map((v) => fixed(v, 2)).join(', ')}) stand above the axis and the ket of ${signed(values[3], 0)} below it`,
        kets.length === 4 && kets.every((k, i) => (values[i] >= 0 ? k.b <= axis : k.t >= axis)), JSON.stringify({ kets, axis }));
    }
    await p.context().close();
  }

  // ξ redraw on the AND-to-OR card. Its caption states the card's own draw (ξ and the record it selects); a new ξ must not
  // leave that sentence beside a different draw. Independent arithmetic: p = cos²30°, record 0 exactly when ξ < p.
  const P30 = Math.cos(Math.PI / 6) ** 2;
  const xiClaims = (note) => [...note.matchAll(/ξ = (\d\.\d+)\s*([<≥])\s*p[^。;]*?(?:记录|record)\s*(\d)/g)].map((m) => ({ xi: Number(m[1]), rel: m[2], rec: Number(m[3]) }));
  const truthful = (claims, st) => claims.every((c) => Math.abs(c.xi - st.xi) <= 5e-4 && c.rel === (st.xi < P30 ? '<' : '≥') && c.rec === (st.xi < P30 ? 0 : 1));
  const cardNote = async () => plain(await page.textContent('#presetNote'));
  const andOrPressed = () => page.locator('[data-preset="and-to-or"]').getAttribute('aria-pressed');
  for (const lang of ['zh', 'en']) {
    s = await openCard(CARDS[1], lang);
    let note = await cardNote(), claims = xiClaims(note);
    check(`and-to-or (${lang}): the card's caption states its own ξ and record, and they are the drawn ξ and the record ξ < cos²30° selects`,
      claims.length === 1 && truthful(claims, s) && s.sampledRecord === (s.xi < P30 ? 0 : 1) && await andOrPressed() === 'true', JSON.stringify({ note, xi: s.xi }));
    const ownDraw = s.xi, bad = [];
    for (let i = 0; i < 6; i++) {
      const before = s; await page.click('#xiBtn'); s = await state(); note = await cardNote(); claims = xiClaims(note);
      const pressedNow = await andOrPressed();
      if (!(s.xi !== before.xi && s.sampledRecord === (s.xi < P30 ? 0 : 1) && truthful(claims, s) && (claims.length === 0 || pressedNow === 'true') && same(numbers(s), numbers(before)))) bad.push({ i, xi: s.xi, note, pressedNow });
    }
    check(`and-to-or (${lang}): after each of 6 ξ redraws the caption beside the stage states no ξ or record other than the drawn one`, bad.length === 0, JSON.stringify(bad.slice(0, 2)));
    check(`and-to-or (${lang}): a ξ redraw leaves the card, which no longer marks the stage as its own`, await andOrPressed() === 'false' && s.preset === null);
    await page.click('[data-preset="and-to-or"]'); s = await state(); note = await cardNote(); claims = xiClaims(note);
    check(`and-to-or (${lang}): picking the card again restores its own draw, and its caption is true again`, s.xi === ownDraw && claims.length === 1 && truthful(claims, s) && await andOrPressed() === 'true', JSON.stringify({ note, xi: s.xi }));
  }
  check('zero console errors, page errors, failed requests or HTTP failures throughout', T.errors.length === 0, T.errors.join(' | '));
} catch (error) {
  check('suite completes without an unexpected exception', false, error.stack || String(error));
}
await T.finish();
