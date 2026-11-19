// SELFREF//PENTAD browser regression: the shared stage-first gate with the lit solid, then every claim of the page checked
// by an algorithm written here (union–find with path compression, bisection and an exact rational series, the Bloch map
// of the channel, all 2¹⁵ Z-error patterns of the [[15, 1, 3]] checks, all 2¹⁶ listings of a 4 × 4 table), the handle,
// the lens, both languages and the stills the chapter will cite. Run directly with node; VIZ_SLOW_FRAMES=1000 spaces
// animation frames a second apart, so every transition and playback assertion waits on state, never on time.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, labelOverlaps, overflowX, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'self-reference-pentad-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const CARDS = {
  'pointer-path-compression': { scene: 0, still: 6, max: 6 },
  'dottie-real-imag-spiral': { scene: 1, still: 30, max: 30 },
  'eigenstate-channel-anchor': { scene: 2, still: 12, max: 12 },
  'fifteen-to-one-gate-distill': { scene: 3, still: 1, max: 3 },
  'lawvere-diagonal-escape': { scene: 4, still: 4, max: 4 }
};
const GIDS = [
  'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package',
  'D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word'
];
const THEORY = ['zh', 'en'].map((l) => `../../${l}/ch39-s06-fivefold-self-reference-spectrum.html#sec-ch39-fivefold-self-reference-spectrum`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (x) => x.toFixed(4).replace('-', '−');

const T = await session();
const { page, check } = T;

// 1. the shared quality gate, with the lit-solid checks on the opening card
await stageFirstChecks(T, BOOK, ID, { solid: true, settle: 0 });

/* ---------- independent algorithms ---------- */
// union–find: the root by walking, then compression of every slot in order
const rootOf = (par, x) => { let r = x; while (par[r] !== r) r = par[r]; return r; };
const hops = (par, x) => { let k = 0, y = x; while (par[y] !== y) { y = par[y]; k++; } return k; };
function compress(par0) {
  const par = par0.slice();
  for (let x = 0; x < par.length; x++) { const r = rootOf(par, x); let y = x; while (par[y] !== r) { const nx = par[y]; par[y] = r; y = nx; } }
  return par;
}
// the cosine fixed point by bisection on cos x − x (strictly decreasing)
const DOTTIE = (() => { let lo = 0, hi = 1; for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (Math.cos(m) - m > 0) lo = m; else hi = m; } return (lo + hi) / 2; })();
// exact rationals (BigInt) for the inverse of forward(X) = 2X + 2 arcsin X: c₁ … c_N by the fixed point
// g = (w − Σ_{k≥3} f_k gᵏ) / 4 on truncated series, a different route from the page's Lagrange inversion
const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
const Q = (n, d = 1n) => { if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d) || 1n; return [n / g, d / g]; };
const qadd = (a, b) => Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const qmul = (a, b) => Q(a[0] * b[0], a[1] * b[1]);
const qf = (a) => Number(a[0] * 10n ** 30n / a[1]) / 1e30;
function inverseSeriesExact(N) {
  const f = Array.from({ length: N + 1 }, () => Q(0n));
  let c = Q(1n);   // C(2k, k) / 4ᵏ
  for (let k = 0; 2 * k + 1 <= N; k++) { if (k > 0) c = qmul(c, Q(BigInt(2 * k - 1), BigInt(2 * k))); f[2 * k + 1] = qmul(Q(2n), qmul(c, Q(1n, BigInt(2 * k + 1)))); }
  f[1] = qadd(f[1], Q(2n));
  const mul = (a, b) => { const r = Array.from({ length: N + 1 }, () => Q(0n)); for (let i = 0; i <= N; i++) if (a[i][0]) for (let j = 0; i + j <= N; j++) if (b[j][0]) r[i + j] = qadd(r[i + j], qmul(a[i], b[j])); return r; };
  let g = Array.from({ length: N + 1 }, () => Q(0n)); g[1] = Q(1n, 4n);
  for (let it = 0; it < N; it++) {
    const next = Array.from({ length: N + 1 }, () => Q(0n)); next[1] = Q(1n);
    let pw = g;
    for (let k = 2; k <= N; k++) { pw = mul(pw, g); if (f[k][0]) for (let d = 0; d <= N; d++) next[d] = qadd(next[d], qmul(Q(-1n), qmul(f[k], pw[d]))); }
    g = next.map((x) => qmul(x, Q(1n, 4n)));
  }
  return g;
}
// the channel as its Bloch map r ↦ |λ| R_z(ω) r + (1 − |λ|) r*
const OMEGA = Math.PI / 4, ZSTAR = 0.5;
function channelSteps(r0, p, n) {
  let r = r0.slice();
  for (let k = 0; k < n; k++) { const c = Math.cos(OMEGA), s = Math.sin(OMEGA); r = [p * (c * r[0] - s * r[1]), p * (s * r[0] + c * r[1]), p * r[2] + (1 - p) * ZSTAR]; }
  return r;
}
// all 2¹⁵ Z-error patterns against the four checks of the tetrahedron: check i holds the qubits (non-empty corner sets
// m ⊆ {0, 1, 2, 3}) that contain corner i; accepted = every check even; a logical error = odd weight
function distillBrute(e) {
  const cells = [0, 1, 2, 3].map((i) => Array.from({ length: 15 }, (_, k) => (((k + 1) >> i) & 1) === 1));
  let acc = 0, bad = 0;
  for (let m = 0; m < 1 << 15; m++) {
    let w = 0; for (let k = 0; k < 15; k++) if ((m >> k) & 1) w++;
    if (!cells.every((cell) => { let par = 0; for (let k = 0; k < 15; k++) if (cell[k] && (m >> k) & 1) par ^= 1; return par === 0; })) continue;
    const p = e ** w * (1 - e) ** (15 - w); acc += p; if (w & 1) bad += p;
  }
  return { ps: acc, out: bad / acc };
}
const closedForm = (e) => { const x = 1 - 2 * e; return (1 + 15 * x ** 8 - 15 * x ** 7 - x ** 15) / (2 * (1 + 15 * x ** 8)); };
const THRESHOLD = (() => { let lo = 0.05, hi = 0.3; for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (closedForm(m) < m) lo = m; else hi = m; } return (lo + hi) / 2; })();
// every listing g : 4 → 4 → Bool, does the twisted diagonal land in it?
function listingsEscaped(twist) {
  let n = 0;
  for (let m = 0; m < 1 << 16; m++) {
    const g = (a, b) => (m >> (4 * a + b)) & 1, d = [0, 1, 2, 3].map((a) => twist(g(a, a)));
    if (![0, 1, 2, 3].some((a) => [0, 1, 2, 3].every((b) => g(a, b) === d[b]))) n++;
  }
  return n;
}

/* ---------- page helpers ---------- */
const state = (p = page) => p.evaluate(() => window.SELFREF_PENTAD_DEBUG.state);
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await pause(p);
}
/** put the clock where the card's still is, through the rail (keeps the card) */
async function toStill(card, p = page) {
  await p.evaluate((t) => { const r = document.getElementById('now'); r.value = String(t); r.dispatchEvent(new Event('input')); }, CARDS[card].still);
  await settle(p);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function drag(target, p = page) {
  const h = await p.evaluate(() => window.SELFREF_PENTAD_DEBUG.handleBox());
  if (!h) return false;
  await p.mouse.move(h.x, h.y); await p.mouse.down();
  const t = await p.evaluate((v) => window.SELFREF_PENTAD_DEBUG.target(v), target);
  await p.mouse.move((h.x + t.x) / 2, (h.y + t.y) / 2); await p.mouse.move(t.x, t.y); await p.mouse.up();
  await settle(p);
  return true;
}

/* ---------- 2. sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const testSource = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
// identifiers of tools that must not appear in the book (assembled from pieces so this file does not carry them either)
const BANNED = [['Cl', 'aude'], ['Op', 'us'], ['G', 'PT'], ['Co', 'dex'], ['Gem', 'ini'], ['Deep', 'Mind'], ['Anth', 'ropic'], ['Ope', 'nAI'], ['L', 'LM'], ['ag', 'ent'], ['人工', '智能'], ['大', '模型'], ['智能', '体']].map((x) => x.join(''));
const bannedRe = new RegExp(`(?<![A-Za-z])(?:${BANNED.join('|')}|A${'I'})(?![A-Za-z])`, 'i');
for (const [file, src] of [...Object.entries(sources), ['test', testSource]]) {
  check(`source ${file}: no tool identifiers`, !bannedRe.test(src), (src.match(bannedRe) || [''])[0]);
}
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour, no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
}
check('source: no grid-template-columns anywhere in the page style; kit.solid without wheel zoom', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js']));
check('source: the five cards in order, each with data-still', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS))
  && [...sources['index.html'].matchAll(/<button class="preset"[^>]*>/g)].every((m) => /data-still="[^"]+"/.test(m[0])));
check('source: the three columns — #rail deck with the lens, center stage + strip, #evidence with one #infoBtn', /<aside class="col deck" id="rail"/.test(sources['index.html'])
  && /class="lens-toggle"/.test(sources['index.html']) && /<aside class="col side" id="evidence"/.test(sources['index.html']) && (sources['index.html'].match(/id="infoBtn"/g) || []).length === 1);
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: a live §36.9 entry with the five cards, bilingual titles and the six GIDs', entry.status === 'live' && entry.chapter === 36 && entry.section === '36.9' && entry.code === 'SELFREF//PENTAD'
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c] && entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same((entry.lean || []).map((x) => x.gid).sort(), [...GIDS].sort()));
check('registry: the theory link names the §36.9 chapter and anchor', entry.theory && entry.theory[0].href === '../zh/ch39-s06-fivefold-self-reference-spectrum.html#sec-ch39-fivefold-self-reference-spectrum'
  && entry.theory[0].href_en === '../en/ch39-s06-fivefold-self-reference-spectrum.html#sec-ch39-fivefold-self-reference-spectrum');

/* ---------- 3. the page as served ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
check('runtime: only the shared scripts and styles', same(await page.$$eval('script[src]', (els) => els.map((e) => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', (els) => els.map((e) => e.getAttribute('href')).filter((h) => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
check('evidence: exactly the six GIDs, each in a LEAN ✓ box of #evidence', same(await page.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
  && await page.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('#evidence .lean') && !e.closest('.lean').className.match(/num|model|argued|open|frozen/) && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
check('drawer: the bilingual §36.9 links', same(await page.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
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

check('layout: three columns, the strip below the stage and not inside it, the evidence column on the right', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), q = (s) => app.querySelector(s).getBoundingClientRect();
  const d = q(':scope > #rail.deck'), c = q(':scope > .center'), s = q(':scope > #evidence.side');
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot') && !document.querySelector('#stage .strip')
    && document.querySelector('#evidence > #infoBtn') === document.querySelector('#evidence').firstElementChild && !!document.querySelector('#rail .lens-toggle');
}));
check('palette: the page writes no data-tr-palette', await page.evaluate(() => document.documentElement.dataset.trPalette === undefined));
check('opening card: the default is dottie-real-imag-spiral, at its still', await until(page, () => { const s = window.SELFREF_PENTAD_DEBUG.state; return s.preset === 'dottie-real-imag-spiral' && s.t === 30 && !s.playing; }));

/* ---------- 4. F₁ · the pointer table ---------- */
await pick('pointer-path-compression');
{
  const s = await state(), par0 = s.pointer.parentBefore, par1 = compress(par0);
  const pathFrom = (x) => { const p = [x]; while (par0[p[p.length - 1]] !== p[p.length - 1]) p.push(par0[p[p.length - 1]]); return p; };
  check('F₁: twelve slots, slot 0 points at itself (Lookup(0) = 0, p ≡ *p)', par0.length === 12 && par0[0] === 0 && par0.every((p, x) => rootOf(par0, x) === 0));
  check('F₁: 9 → 6 → 3 → 1 → 0 is the 4-hop chain and the deepest lookup', same(pathFrom(9), [9, 6, 3, 1, 0]) && hops(par0, 9) === 4 && Math.max(...par0.map((_, x) => hops(par0, x))) === 4
    && s.pointer.hopsBefore === 4 && same(s.pointer.path, [9, 6, 3, 1, 0]));
  check('F₁: compression of every slot points every slot at the root; one hop after (independent union–find)', same(s.pointer.parentAfter, par1) && par1.every((p) => p === 0)
    && par1.every((_, x) => hops(par1, x) <= 1) && s.pointer.hopsAfter === 1);
  const idem = (par) => par.every((p) => par[p] === p);
  const M = (par) => par.map((_, i) => par.map((p) => (p === i ? 1 : 0))), mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((t, a, k) => t + a * B[k][j], 0)));
  check('F₁: P² = P after compression (as maps and as 0/1 matrices), not before', idem(par1) && same(mul(M(par1), M(par1)), M(par1)) && !idem(par0) && !same(mul(M(par0), M(par0)), M(par0)));
  check('F₁: the card opens playing from the first hop', await playsAfter(page, () => page.click('[data-preset="pointer-path-compression"]'), () => window.SELFREF_PENTAD_DEBUG.state));
  await pause();
  await toStill('pointer-path-compression');
  const e = await state();
  check('F₁ still (t = 6): compressed table, idempotent, Lookup(9) in one hop', e.t === 6 && e.pointer.compressed && e.pointer.idempotentResidual === 0 && same(e.pointer.table, par1));
  const pt = e.leanInstances.pageTable, walk = (lk, root, list) => list.reduce((a, i) => lk(a, i), root), lk = (a, i) => (a === 0 ? i : e.pointer.table[a]);
  check('F₁ page table: walk(0, [9, j]) = p(9), walk(0, [0, 9]) = 9, walk(0, [0]ᵈ) = 0 for d ≤ 64', pt.hypothesis && pt.walkData && pt.walkLeaf && pt.selfClosure
    && walk(lk, 0, [9, 3]) === pt.data && pt.data === e.pointer.table[9] && walk(lk, 0, [0, 9]) === 9 && [...Array(65).keys()].every((d) => walk(lk, 0, Array(d).fill(0)) === 0));
  const before = e.camera;
  check('F₁ handle: a pointer drag moves the read head to slot 4', await drag({ slot: 4 }));
  const a = await state();
  check('F₁ handle: start slot 4, its lookup 3 hops before compression, camera unchanged', a.params.slot === 4 && a.pointer.hopsBefore === hops(par0, 4) && a.pointer.hopsBefore === 3 && same(a.camera, before) && a.preset === null);
  await input('#slotIn', 0);
  check('F₁ slider: x = 0 looks up the root itself in 0 hops', (await state()).pointer.hopsBefore === 0 && (await state()).params.slot === 0);
}

/* ---------- 5. F₂ · the cosine ---------- */
await pick('dottie-real-imag-spiral');
await toStill('dottie-real-imag-spiral');
{
  const s = await state(), d = s.dottie;
  let th = 0.1; const it = [th]; for (let k = 0; k < 30; k++) { th = Math.cos(th); it.push(th); }
  check('F₂: θ* (bisection) = 0.7390851332, cos θ* = θ*', near(d.thetaStar, DOTTIE, 1e-13) && Math.abs(Math.cos(d.thetaStar) - d.thetaStar) < 1e-15 && f4(d.thetaStar) === '0.7391');
  check('F₂: 42.35°, λ = −sin θ* = −0.6736, cos²θ* = 54.62%, sin²θ* = 45.38%', (d.thetaStarDeg).toFixed(2) === '42.35' && near(d.lambda, -Math.sin(DOTTIE), 1e-13) && f4(d.lambda) === '−0.6736'
    && (100 * Math.cos(DOTTIE) ** 2).toFixed(2) === '54.62' && (100 * Math.sin(DOTTIE) ** 2).toFixed(2) === '45.38' && near(d.cos2Star + d.sin2Star, 1, 1e-15));
  check('F₂: 30 cobweb steps from θ₀ = 0.10, alternating sides, |θ₃₀ − θ*| < 10⁻⁵', d.theta0 === 0.1 && d.iterates.length === 31 && d.iterates.every((v, k) => near(v, it[k], 1e-15))
    && it.slice(1, 12).every((v, k) => Math.sign(v - DOTTIE) !== Math.sign(it[k] - DOTTIE)) && Math.abs(d.theta - DOTTIE) < 1e-5 && f4(d.theta) === '0.7391');
  // e_{n+1}/e_n = λ − (cos θ*/2) e_n + O(e_n²): from n = 15 on, |e_n| < 2·10⁻³ and the ratio is λ to 10⁻³
  const ratios = it.slice(15, 25).map((v, k) => (it[k + 16] - DOTTIE) / (v - DOTTIE));
  check('F₂: the error ratio tends to λ = −0.6736 (negative: the sides alternate)', ratios.every((r) => Math.abs(r - (-Math.sin(DOTTIE))) < 1e-3), ratios.map((r) => r.toFixed(5)).join(' '));
  check('F₂ still: the cyan shadow cos θ and the magenta arc θ agree to 10⁻⁵', Math.abs(d.cos - d.theta) < 1e-5 && Math.abs(d.gap) < 1e-5);
  const exact = inverseSeriesExact(21), pis = (n) => Math.PI ** n;
  check('F₂ series: the page coefficients equal the exact rationals (c₁ = 1/4, c₃ = −1/768, …)', d.seriesCoef.slice(1, 12).every((c, k) => near(c, qf(exact[k + 1]), 1e-17 + 1e-12 * Math.abs(c)))
    && exact[1][0] === 1n && exact[1][1] === 4n && exact[3][0] === -1n && exact[3][1] === 768n);
  const exactSum = exact.reduce((t, c, n) => t + qf(c) * pis(n), 0);
  check('F₂ series: Σ_{n≤21} cₙπⁿ (exact) matches the page partial sum; the 48-term sum is θ* to 10⁻¹⁴', near(d.seriesPartial[21], exactSum, 1e-13) && Math.abs(d.seriesSum - DOTTIE) < 1e-14
    && Math.abs(exactSum - DOTTIE) < 1e-8);
  // the handle sets θ₀ on the circle and the cobweb restarts there
  const cam = s.camera;
  check('F₂ handle: a drag along the circle', await drag({ theta0: 1.2 }));
  const a = await state();
  check('F₂ handle: θ₀ = 1.20, the rail back at n = 0, camera unchanged, card left', Math.abs(a.params.theta0 - 1.2) < 0.006 && a.t === 0 && same(a.camera, cam) && a.preset === null
    && near(a.dottie.theta, a.params.theta0, 1e-12));
  await input('#theta0In', 0.4);
  check('F₂ slider: θ₀ = 0.40 restarts the cobweb from 0.40', near((await state()).dottie.iterates[0], 0.4, 1e-12));
}

/* ---------- 6. F₃ · eigenstate and channel ---------- */
await pick('eigenstate-channel-anchor');
await toStill('eigenstate-channel-anchor');
{
  const s = await state(), c = s.channel;
  const r12 = channelSteps(c.r0, 0.65, 12), dist0 = Math.hypot(c.r0[0], c.r0[1], c.r0[2] - ZSTAR), dist = Math.hypot(r12[0], r12[1], r12[2] - ZSTAR);
  check('F₃: |λ| = 0.65, ω = 45°, ρ* on the axis at z = 0.5, the start a pure state', c.lambda === 0.65 && near(c.omega, OMEGA) && c.zStar === 0.5 && near(Math.hypot(...c.r0), 1, 1e-12));
  check('F₃ still: after 12 steps the page state is the Bloch map of the channel, at distance 0.65¹² d₀', c.step === 12 && c.r.every((v, k) => near(v, r12[k], 1e-12)) && near(c.distance, dist, 1e-12) && near(dist, 0.65 ** 12 * dist0, 1e-12));
  check('F₃: coherence |ρ₀₁| = |r⊥|/2 decays as 0.65ⁿ', near(c.coherence, Math.hypot(r12[0], r12[1]) / 2, 1e-12) && near(c.coherence / (Math.hypot(c.r0[0], c.r0[1]) / 2), 0.65 ** 12, 1e-10));
  const fixed = channelSteps([0, 0, ZSTAR], 0.65, 1);
  check('F₃: ℰ(ρ*) = ρ* (Bloch map here, matrices on the page)', near(fixed[0], 0) && near(fixed[1], 0) && near(fixed[2], ZSTAR) && s.leanInstances.channel.fixedResidual < 1e-14 && s.leanInstances.channel.stepResidual < 1e-12);
  const st = s.leanInstances.stationary;
  check('F₃: the eigenstate stays put — U unitary and UρU† = ρ at the current time; the phase turns as −E₀t', st.unitaryResidual < 1e-13 && st.stationaryResidual < 1e-13 && near(c.phase, -c.energies[0] * 12, 1e-12)
    && near(c.energies[0] - c.energies[1], OMEGA, 1e-15));
  check('F₃: pinching twice equals pinching once, and deletes the coherence', s.leanInstances.pinching.residual === 0 && s.leanInstances.pinching.coherenceAfter === 0);
  await input('#lambdaIn', 1);
  const u = await state();
  check('F₃ slider |λ| = 1: the distance to ρ* never shrinks', near(u.channel.distance, u.channel.distance0, 1e-12));
  await input('#lambdaIn', 0);
  check('F₃ slider |λ| = 0: one step lands on ρ*', near((await state()).channel.distance, 0, 1e-12));
  const cam = (await state()).camera;
  check('F₃ handle: a drag on the sphere', await drag({ r0: [0.8, -0.5, 0.33] }));
  const a = await state();
  check('F₃ handle: a new pure start state, camera unchanged', near(Math.hypot(...a.params.r0), 1, 1e-9) && Math.hypot(a.params.r0[0] - c.r0[0], a.params.r0[1] - c.r0[1], a.params.r0[2] - c.r0[2]) > 0.2 && same(a.camera, cam));
}

/* ---------- 7. F₄ · fifteen-to-one ---------- */
await pick('fifteen-to-one-gate-distill');
{
  const s = await state(), d = s.distill, brute = distillBrute(0.05);
  check('F₄: the card is static at round 1 (its still)', s.t === 1 && !s.playing && d.round === 1 && d.progress === 1);
  check('F₄: ε_out(0.0500) = 0.00514 by all 2¹⁵ patterns, by the closed form, and on the page', near(brute.out, closedForm(0.05), 1e-14) && near(d.epsOut, brute.out, 1e-13)
    && near(d.epsOutClosed, closedForm(0.05), 1e-15) && d.epsOut.toFixed(5) === '0.00514');
  check('F₄: leading term 35ε³ = 0.00438, acceptance 46.61%, suppression 9.73×', d.cubic.toFixed(5) === '0.00438' && near(d.acceptance, brute.ps, 1e-13) && (100 * d.acceptance).toFixed(2) === '46.61'
    && d.suppression.toFixed(2) === '9.73');
  check('F₄: the accepted weights are those of the [15, 11] Hamming code', same(d.acceptedWeights, [1, 0, 0, 35, 105, 168, 280, 435, 435, 280, 168, 105, 35, 0, 0, 1]));
  const cols = new Set(Array.from({ length: 15 }, (_, k) => d.checks.map((row) => row[k]).join('')));
  check('F₄: the four check cells hold 8 qubits each and their columns are the 15 non-zero 4-bit words', d.checks.length === 4 && d.checks.every((row) => row.reduce((a, b) => a + b, 0) === 8) && cols.size === 15 && !cols.has('0000'));
  check('F₄: threshold ε_th = 0.1415 (bisection here: 0.141480)', near(d.threshold, THRESHOLD, 1e-9) && d.threshold.toFixed(4) === '0.1415' && closedForm(d.threshold - 1e-3) < d.threshold - 1e-3 && closedForm(d.threshold + 1e-3) > d.threshold + 1e-3);
  const h = 1e-4;
  check('F₄: slope 0 at ε = 0 and ε_out/ε³ → 35', distillBrute(h).out / h < 1e-6 && Math.abs(distillBrute(h).out / h ** 3 - 35) < 0.05 && Math.abs(d.cubicLimit - 35) < 0.05);
  check('F₄: the rounds shrink cubically: 0.05 → 5.14×10⁻³ → 4.83×10⁻⁶', near(d.rounds[1], brute.out, 1e-13) && Math.abs(d.rounds[2] - distillBrute(brute.out).out) <= 1e-9 * d.rounds[2] && d.rounds[2].toExponential(2) === '4.83e-6');
  check('F₄ text: the readout and the HUD show 0.00514 and 0.00438', await page.evaluate(() => document.getElementById('roKey').textContent.includes('0.00514') && document.getElementById('roKey').textContent.includes('0.00438')
    && document.getElementById('hudBig').textContent.includes('0.00514') && document.getElementById('hudSub').textContent.includes('0.00438')));
  const cam = s.camera;
  check('F₄ handle: a drag along the ε ruler', await drag({ eps: 0.2 }));
  const a = await state();
  check('F₄ handle: ε ≈ 0.2 lies above the threshold, the output error grows', Math.abs(a.params.eps - 0.2) < 0.003 && !a.distill.basin && a.distill.epsOut > a.params.eps && near(a.distill.epsOut, closedForm(a.params.eps), 1e-12) && same(a.camera, cam));
  await input('#epsIn', 0.1);
  check('F₄ slider: ε = 0.1 is in the basin, ε_out < ε', (await state()).distill.basin && (await state()).distill.epsOut < 0.1);
}

/* ---------- 8. F₅ · the diagonal ---------- */
await pick('lawvere-diagonal-escape');
await toStill('lawvere-diagonal-escape');
{
  const s = await state(), L = s.lawvere, g = L.table;
  const diag = [0, 1, 2, 3].map((a) => 1 - g[a][a]);
  check('F₅: diagonal(¬, g) = 0011 differs from row a in place a, for every a', same(L.diag, diag) && diag.join('') === '0011' && g.every((row, a) => row[a] !== diag[a]) && L.escaped && L.capturedRow === -1);
  check('F₅: the scan is complete at its still', s.t === 4 && L.lifted.every((f) => f === 1) && L.head === 3);
  check('F₅: ¬ escapes all 2¹⁶ listings, id does not', s.leanInstances.diagonal.escapedNot === 65536 && listingsEscaped((b) => 1 - b) === 65536
    && s.leanInstances.diagonal.escapedId === listingsEscaped((b) => b) && s.leanInstances.diagonal.escapedId < 65536);
  await page.click('[data-twist="id"]'); await settle(page);
  const i = (await state()).lawvere;
  check('F₅ twist id: the diagonal 1100 is row 2 — caught', i.diag.join('') === '1100' && same(g[2], i.diag) && i.capturedRow === 2 && !i.escaped && !i.fixedPointFree);
  await page.click('[data-twist="not"]'); await settle(page);
  check('F₅ handle: a drag to (1, 1) moves the scan there', await drag({ head: 1 }));
  const a = await state();
  check('F₅ handle: the head on (1, 1), cells 0 and 1 lifted, 2 and 3 not yet', a.lawvere.head === 1 && a.t === 2 && a.lawvere.lifted[0] === 1 && a.lawvere.lifted[1] === 1 && a.lawvere.lifted[2] === 0);
}

/* ---------- 9. the lens: same parameters, other labels ---------- */
{
  await pick('dottie-real-imag-spiral');
  const before = await state(), hud = await page.locator('#hudBig').textContent();
  await page.click('[data-lens="fixed"]'); await settle(page);
  const after = await state(), hud2 = await page.locator('#hudBig').textContent();
  check('lens: the fixed-point reading is pressed (and only it)', after.lens === 'fixed' && await page.locator('[data-lens="fixed"]').getAttribute('aria-pressed') === 'true'
    && await page.locator('[data-lens="phys"]').getAttribute('aria-pressed') === 'false');
  check('lens: the parameters, the clock and the card stay; the title changes to x* = F(x*)', same(after.params, before.params) && after.t === before.t && after.preset === before.preset && hud !== hud2 && /F\(θ\*\)/.test(hud2));
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    const view = await stageView(page, '#stage'), ov = await labelOverlaps(page, '.stage .tag', 0);
    check(`lens fixed / ${card}: stage, HUD and labels clear`, view.layout.length === 0 && view.hud.length === 0 && ov.length === 0, [...view.layout, ...view.hud, ...ov.map((x) => x.join(' / '))].join(' | '));
  }
  await page.keyboard.press('l'); await settle(page);
  check('lens: the L key switches back', (await state()).lens === 'phys');
}

/* ---------- 10. playback ---------- */
await pick('lawvere-diagonal-escape');
check('playback: ▶ advances the clock', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.SELFREF_PENTAD_DEBUG.state));
await pause();
{ const p0 = await state(); await settle(page); check('playback: paused holds the clock', !p0.playing && (await state()).t === p0.t); }
check('drawer: opens with #infoBtn and closes with Escape', await (async () => { await page.click('#infoBtn'); const open = await page.locator('#drawer').isVisible(); await page.keyboard.press('Escape'); await settle(page); return open && await page.locator('#drawer').isHidden(); })());

/* ---------- 11. both languages, desktop and phone ---------- */
for (const lang of ['zh', 'en']) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { viewport: { width: w, height: h }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
  await settle(p);
  const tag = `${lang}/${w}`, texts = [];
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); await toStill(card, p);
    const t = await p.evaluate(() => ({ note: document.getElementById('presetNote').textContent.trim(), big: document.getElementById('hudBig').textContent.trim(), sub: document.getElementById('hudSub').textContent.trim(),
      ro: ['roKey', 'ro1', 'ro2', 'ro3', 'ro4', 'ro5'].map((id) => document.getElementById(id).textContent.trim()), legend: document.getElementById('legend').children.length }));
    texts.push(t);
    check(`${tag}/${card}: note, title, six readouts and a four-entry legend`, t.note.length > 40 && t.big && t.sub && t.ro.every((x) => x && x !== '—') && t.legend === 4, JSON.stringify(t).slice(0, 200));
    const view = await stageView(p, '#stage'), ov = await labelOverlaps(p, '.stage .tag', 0);
    check(`${tag}/${card}: stage, HUD and labels clear, no sideways scroll`, view.layout.length === 0 && view.hud.length === 0 && ov.length === 0 && (await overflowX(p)) <= 0, [...view.layout, ...view.hud].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no Chinese on screen`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: the numbers of the captions are on screen`, texts[1].big.includes('0.7391') && texts[1].sub.includes('−0.6736') && texts[1].sub.includes('54.62%') && texts[1].sub.includes('45.38%')
    && texts[3].big.includes('0.00514') && texts[3].sub.includes('0.00438') && texts[3].sub.includes('0.1415') && texts[4].big.includes('range g'));
  await p.context().close();
}

/* ---------- 12. the stills a chapter will cite ---------- */
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: paused on its declared frame`, s.preset === card && !s.playing && s.t === CARDS[card].still && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('handle').hidden));
  if (card === 'dottie-real-imag-spiral') check(`still ${lang}: θ = 0.7391, cos θ = 0.7391`, f4(s.dottie.theta) === '0.7391' && f4(s.dottie.cos) === '0.7391');
  if (card === 'fifteen-to-one-gate-distill') check(`still ${lang}: ε = 0.0500 → 0.00514`, s.params.eps === 0.05 && s.distill.epsOut.toFixed(5) === '0.00514');
  if (card === 'pointer-path-compression') check(`still ${lang}: compressed, P² = P`, s.pointer.compressed && s.pointer.idempotentResidual === 0);
  if (card === 'lawvere-diagonal-escape') check(`still ${lang}: 0011 lifted`, s.lawvere.diag.join('') === '0011' && s.lawvere.lifted.every((f) => f === 1));
  if (card === 'eigenstate-channel-anchor') check(`still ${lang}: 12 steps at |λ| = 0.65`, s.channel.step === 12 && s.channel.lambda === 0.65);
  await p.context().close();
}

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
check('no shared-gate warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
