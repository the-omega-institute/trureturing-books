// Independent regression checks for the sealed lab, its six cards and five interpretation lenses.
import { readFileSync } from 'node:fs';
import { session, stageFirstChecks, settle, until, routeLocalFonts } from '../../../../tools/node/viz-testkit.mjs';

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
  // The five-way card cited in a narrow column (334 × 520, its chapter's frame): five lens rows, each tall enough to read,
  // inside the band between the title block with the lens chips and the legend (they once shared about 50 px).
  for (const lang of ['zh', 'en']) {
    const fig = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=five-way-duel`, { viewport: { width: 334, height: 520 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(fig, 200);
    const r = await fig.evaluate(() => {
      const cv = document.getElementById('cv').getBoundingClientRect(), box = (id) => document.getElementById(id).getBoundingClientRect();
      return { top: Math.max(box('hudTl').bottom, box('lensBar').bottom) - cv.top, bottom: box('legend').top - cv.top,
        rows: window.INTERPRETATIONS_DUEL_DEBUG.handles().filter((h) => h.kind === 'lens').map((h) => [Math.round(h.y0), Math.round(h.y1)]) };
    });
    check(`five-way-duel cited at 334 × 520 (${lang}): five lens rows of at least 20 px inside the band between the title block and the legend`,
      r.rows.length === 5 && r.rows.every(([a, b]) => b - a >= 20 && a >= r.top - 0.5 && b <= r.bottom + 0.5), JSON.stringify(r));
    await fig.context().close();
  }
  // The same figure when animation frames come late (every 400 ms, as on a loaded machine): the lens chips sit just under
  // the title block as it reads, not where a stack of an earlier frame put the title (they once stayed 32 px low and
  // the five rows ran into the legend), and the rows keep their band.
  for (const lang of ['zh', 'en']) {
    const ctx = await T.browser.newContext({ viewport: { width: 334, height: 520 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', deviceScaleFactor: 1 });
    await routeLocalFonts(ctx, T.origin);
    await ctx.addInitScript(() => {
      const raf = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = (cb) => setTimeout(() => raf(cb), 400);
      window.cancelAnimationFrame = (id) => clearTimeout(id);
    });
    const fig = await ctx.newPage();
    fig.on('pageerror', (e) => T.errors.push(`pageerror: ${e.message}`));
    await fig.goto(T.url(BOOK, ID, `?embed=1&lang=${lang}&preset=five-way-duel`), { waitUntil: 'load' });
    await fig.evaluate(() => document.fonts && document.fonts.ready);
    await settle(fig, 200);
    const r = await fig.evaluate(() => {
      const cv = document.getElementById('cv').getBoundingClientRect(), box = (id) => document.getElementById(id).getBoundingClientRect();
      return { title: box('hudTl').bottom - cv.top, chips: [box('lensBar').top - cv.top, box('lensBar').bottom - cv.top], below: document.getElementById('lensBar').classList.contains('below'),
        top: Math.max(box('hudTl').bottom, box('lensBar').bottom) - cv.top, bottom: box('legend').top - cv.top,
        rows: window.INTERPRETATIONS_DUEL_DEBUG.handles().filter((h) => h.kind === 'lens').map((h) => [Math.round(h.y0), Math.round(h.y1)]) };
    });
    check(`five-way-duel cited at 334 × 520 (${lang}), frames every 400 ms: the lens chips sit just under the title block (0 … 8 px) and the five rows of at least 20 px keep the band`,
      r.below && r.chips[0] - r.title >= 0 && r.chips[0] - r.title <= 8 && r.rows.length === 5 && r.rows.every(([a, b]) => b - a >= 20 && a >= r.top - 0.5 && b <= r.bottom + 0.5), JSON.stringify(r));
    await ctx.close();
  }
  check('zero console errors, page errors, failed requests or HTTP failures throughout', T.errors.length === 0, T.errors.join(' | '));
} catch (error) {
  check('suite completes without an unexpected exception', false, error.stack || String(error));
}
await T.finish();
