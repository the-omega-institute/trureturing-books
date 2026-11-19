// ZETA//SPIRAL browser regression: the shared stage-first gate, then every control, card, pill, vantage, still and frame,
// and every number the page claims, checked against algorithms written here (ζ by Euler–Maclaurin summation, Γ by the
// Lanczos series, factorizations by trial division, the explicit formulas summed directly), plus a pixel scan of the
// strip labels (at least five blank pixel rows between every curve label and its curve).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'riemann-prime-arc-path-integral-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const G1 = 14.134725141734695;
const CARDS = {
  'euler-dirichlet-phasor-spiral': { scene: 'spiral', sigma: 1.5, t: G1, paths: 160, zerosK: 50, mobius: true, vantage: 'oblique', still: G1 },
  'critical-zero-cancellation': { scene: 'spiral', sigma: 0.5, t: G1, paths: 160, zerosK: 50, mobius: false, vantage: 'oblique', still: G1 },
  'off-line-shell-imbalance': { scene: 'spiral', sigma: 0.62, t: G1, paths: 160, zerosK: 50, mobius: false, vantage: 'oblique', still: G1 },
  'weil-explicit-prime-staircase': { scene: 'staircase', sigma: 0.5, t: 145, paths: 160, zerosK: 50, mobius: false, vantage: 'oblique', still: 'end' }
};
const GIDS = [
  'D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence',
  'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  'D5/S3/Zeros/CompletedZeta.xi_reading_reflection',
  'D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj',
  'D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization',
  'D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula',
  'D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.tendsto_alternating_partialSums_eta_of_ne_one'
];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s28-riemann-path-integral-and-prime-arcs.html#sec-ch34-riemann-path-integral-and-prime-arcs`);
const RH = ['zh', 'en'].map((lang) => `../../${lang}/ch22-s04-critical-line-and-rh.html#conj-riemann-hypothesis`);
const VIEWS = { spiral: { oblique: [0.6, 0.46], top: [0, Math.PI / 2 - 0.001], side: [0, 0.03] }, staircase: { oblique: [-0.38, 0.56], top: [0, Math.PI / 2 - 0.001], side: [0, 0.03] } };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const rel = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/* ---------- independent mathematics (written here, never calling the page) ---------- */
const C = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
  exp: (z) => [Math.exp(z[0]) * Math.cos(z[1]), Math.exp(z[0]) * Math.sin(z[1])],
  abs: (z) => Math.hypot(z[0], z[1]), sc: (a, k) => [a[0] * k, a[1] * k]
};
/** x^{−s} for real x > 0 written as exp(−s ln x). */
const powNeg = (x, s) => C.exp(C.sc(s, -Math.log(x)));
/** ζ(s) by Euler–Maclaurin: Σ_{n<N} n^{−s} + N^{1−s}/(s − 1) + N^{−s}/2 + Σ_k B_{2k}/(2k)! (s)_{2k−1} N^{−s−2k+1}. */
const B2K = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510, 43867 / 798, -174611 / 330, 854513 / 138, -236364091 / 2730];
function zetaEM(s) {
  const N = 30 + Math.ceil(Math.abs(s[1]) / 2);
  let z = [0, 0];
  for (let n = 1; n < N; n++) z = C.add(z, powNeg(n, s));
  const sm1 = [s[0] - 1, s[1]];
  z = C.add(z, C.div(powNeg(N, sm1), sm1));
  z = C.add(z, C.sc(powNeg(N, s), 0.5));
  let poch = s.slice(), fact = 2, term = powNeg(N, [s[0] + 1, s[1]]);    // (s)_1 N^{−s−1} / 2!
  for (let k = 1; k <= B2K.length; k++) {
    z = C.add(z, C.sc(C.mul(poch, term), B2K[k - 1] / fact));
    poch = C.mul(C.mul(poch, [s[0] + 2 * k - 1, s[1]]), [s[0] + 2 * k, s[1]]);
    fact *= (2 * k + 1) * (2 * k + 2);
    term = C.sc(term, 1 / (N * N));
  }
  return z;
}
/** Γ(z) by the Lanczos series (g = 7, nine coefficients), with the reflection formula below Re z = ½. */
const LZ = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
function gammaL(z) {
  if (z[0] < 0.5) { const s = [Math.sin(Math.PI * z[0]) * Math.cosh(Math.PI * z[1]), Math.cos(Math.PI * z[0]) * Math.sinh(Math.PI * z[1])]; return C.div([Math.PI, 0], C.mul(s, gammaL([1 - z[0], -z[1]]))); }
  const w = [z[0] - 1, z[1]];
  let x = [LZ[0], 0];
  for (let i = 1; i < 9; i++) x = C.add(x, C.div([LZ[i], 0], [w[0] + i, w[1]]));
  const t = [w[0] + 7.5, w[1]], lt = [Math.log(C.abs(t)), Math.atan2(t[1], t[0])];
  return C.mul(C.sc(C.exp(C.sub(C.mul([w[0] + 0.5, w[1]], lt), t)), Math.sqrt(2 * Math.PI)), x);
}
const gfac = (s) => C.mul(C.sc(C.mul(s, [s[0] - 1, s[1]]), 0.5), C.mul(C.exp(C.sc(s, -Math.log(Math.PI) / 2)), gammaL(C.sc(s, 0.5))));
/** Trial division: μ(n), Λ(n), and Σ m_p ln p. */
function factor(n) { const f = []; let m = n; for (let p = 2; p * p <= m; p++) { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) f.push([p, e]); } if (m > 1) f.push([m, 1]); return f; }
const mobius = (n) => { const f = factor(n); return f.some(([, e]) => e > 1) ? 0 : (f.length % 2 ? -1 : 1); };
const vonMangoldt = (n) => { const f = factor(n); return f.length === 1 ? Math.log(f[0][0]) : 0; };
const isPrime = (n) => n >= 2 && factor(n).length === 1 && factor(n)[0][1] === 1;
const psiExact = (x) => { let s = 0; for (let n = 2; n <= x + 1e-12; n++) s += vonMangoldt(n); return s; };
const psi0Exact = (x) => { const n = Math.round(x); return Math.abs(x - n) < 1e-12 ? psiExact(x) - vonMangoldt(n) / 2 : psiExact(x); };
/** ψ₀ truncated to the first K pairs of zeros: x − 2 Re Σ x^ρ/ρ − ln 2π − ½ ln(1 − x^{−2}). */
function explicit(x, gammas, K) {
  let s = 0;
  for (let k = 0; k < K; k++) { const rho = [0.5, gammas[k]]; s += 2 * C.div(C.exp(C.sc(rho, Math.log(x))), rho)[0]; }
  return x - s - Math.log(2 * Math.PI) - 0.5 * Math.log(1 - x ** -2);
}
const EULER_GAMMA = 0.57721566490153286;
/** The integrated explicit formula at y = ln x: zero side truncated to K pairs, and the arithmetic side. */
function integratedRef(x, gammas, K) {
  const y = Math.log(x);
  let lhs = 0; for (let k = 0; k < K; k++) { const rho = [0.5, gammas[k]]; lhs += 2 * C.div(C.exp(C.sc(rho, y)), C.mul(rho, [1 - rho[0], -rho[1]]))[0]; }
  let a = 0, b = 0; for (let n = 1; n <= x + 1e-12; n++) { a += vonMangoldt(n) / n; b += vonMangoldt(n); }
  let tr = 0; for (let n = 1; n <= 200; n++) tr += Math.exp(-2 * n * y) / (2 * n * (2 * n + 1));
  return { lhs, rhs: x * a - b - x * Math.log(x) + (1 + EULER_GAMMA) * x - Math.log(2 * Math.PI) + tr };
}
// high-precision reference values (100-digit arithmetic, rounded) for the page's printed numbers
const REF = {
  gamma: [14.1347251417, 21.0220396388, 25.0108575801, 30.4248761259, 32.9350615877],
  abs062: 0.0906995919176, abs038: 0.0999650025731,
  psi0K: { 2: [0.370086517566, 0.331858170887, 0.359332120840], 10: [7.571750653563, 7.904978954383, 7.880801642248] }
};

const T = await session();
const { page, check } = T;

// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
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
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__zetaPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__zetaPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__zetaPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let colorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => { const context = await browserNewContext({ ...options, colorScheme }); await watchPalette(context); return context; };
watchPage(page);

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116], [99, 108, 97, 117, 100, 101], [97, 110, 116, 104, 114, 111, 112, 105, 99], [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120], [99, 111, 112, 105, 108, 111, 116], [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
for (const [file, src] of Object.entries({ ...sources, 'the suite': suite })) {
  if (file !== 'the suite') check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src));
}
check('source: no grid-template-columns in the page stylesheet (the lab keeps its shared three columns)', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: the stage is a size container', /#stage\s*\{\s*container-type:\s*size;/.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the four cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: .okmark only inside .lean boxes (none on this page)', !/okmark/.test(sources['index.html'] + sources['main.js']));
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §31.1 entry with four bilingual cards and the seven theorems', !!entry && entry.status === 'live' && entry.chapter === 31 && entry.section === '31.1'
  && entry.code === 'ZETA//SPIRAL' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length
  && entry.theory.length === 1 && entry.theory[0].href === THEORY[0].slice(3) && entry.theory[0].href_en === THEORY[1].slice(3));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.ZETA_SPIRAL_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => { const s = window.ZETA_SPIRAL_DEBUG.state; return s.preset === q.id && s.scene === q.scene && Math.abs(s.sigma - q.sigma) < 1e-12 && s.paths === q.paths && s.zerosK === q.zerosK; }, { id: card, ...CARDS[card] });
  await pause(p);
}
/** Two animation frames in the page: long enough for an observer or a clock that would start by itself to have started. */
const twoFrames = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
/** Pixels of the magenta residual or of the amber guide under the integer labels on the staircase floor: the labels and the
    handle are hidden, the page is captured, and each shown label's box is scanned in the capture for the two stroke colours
    (mg, am). The control is the stage above the legend, where the same scan must find the WebGL strokes of both colours. */
async function strokesUnderIntegers(p) {
  const boxes = await p.evaluate(() => {
    const rect = (r, text) => ({ text, x: r.left, y: r.top, w: r.width, h: r.height });
    const shown = [...document.querySelectorAll('#stage .tag')].filter((t) => !t.hidden && t.getClientRects().length && getComputedStyle(t).display !== 'none'
      && /^\d+$/.test(t.textContent.trim()));
    const st = document.getElementById('stage').getBoundingClientRect(), lg = document.getElementById('legend').getBoundingClientRect();
    return [...shown.map((t) => rect(t.getBoundingClientRect(), t.textContent.trim())), { text: 'control', x: st.left, y: st.top, w: st.width, h: lg.top - st.top - 2 }];
  });
  const hide = (v) => p.evaluate((vis) => { for (const el of [document.querySelector('#stage .tags'), document.getElementById('stageHandle')]) el.style.visibility = vis; }, v);
  await hide('hidden');
  const png = (await p.screenshot()).toString('base64');
  await hide('');
  return p.evaluate(async ({ png, boxes }) => {
    const img = new Image(); img.src = `data:image/png;base64,${png}`; await img.decode();
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
    const cc = cv.getContext('2d', { willReadFrequently: true }); cc.drawImage(img, 0, 0);
    const k = img.width / innerWidth, d = cc.getImageData(0, 0, cv.width, cv.height).data;
    const swatch = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgb = (h) => { swatch.clearRect(0, 0, 1, 1); swatch.fillStyle = h; swatch.fillRect(0, 0, 1, 1); return [...swatch.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const mg = rgb(TRV.palette.magenta), am = rgb(TRV.palette.amber);
    const like = (i, c) => Math.abs(d[i] - c[0]) + Math.abs(d[i + 1] - c[1]) + Math.abs(d[i + 2] - c[2]) < 70;
    return boxes.map((b) => {
      const n = { text: b.text, mg: 0, am: 0 };
      for (let y = Math.max(0, Math.ceil(b.y * k)); y < Math.min(cv.height, Math.floor((b.y + b.h) * k)); y++) {
        for (let x = Math.max(0, Math.ceil(b.x * k)); x < Math.min(cv.width, Math.floor((b.x + b.w) * k)); x++) {
          const i = (y * cv.width + x) * 4;
          if (like(i, mg)) n.mg++; else if (like(i, am)) n.am++;
        }
      }
      return n;
    });
  }, { png, boxes });
}

/** Every number of a spiral state against the algorithms of this file. */
function checkSpiral(s, tag) {
  const sv = [s.sigma, s.t], zr = zetaEM(sv);
  check(`${tag}: ζ(s) from the alternating η continuation equals Euler–Maclaurin`, s.zeta && C.abs(C.sub(s.zeta, zr)) < 1e-11 * Math.max(1, C.abs(zr)), `${s.zeta} vs ${zr}`);
  check(`${tag}: |ζ(s)| readout`, rel(s.absZeta, C.abs(zr), 1e-9) || C.abs(zr) < 1e-12);
  // the chain: S_n = Σ_{k≤n} k^{−s}, lifted to the height ln n computed from the factorization
  let S = [0, 0], okChain = true, okHeight = true;
  for (const v of s.chain) {
    if (v.n > 0) S = C.add(S, powNeg(v.n, sv));
    if (C.abs(C.sub(S, v.S)) > 1e-11) okChain = false;
    const h = v.n ? factor(v.n).reduce((a, [p, e]) => a + e * Math.log(p), 0) : 0;
    if (!near(v.z, s.heightScale * h, 1e-12) || !near(v.z, s.heightScale * (v.n ? Math.log(v.n) : 0), 1e-12)) okHeight = false;
  }
  check(`${tag}: chain vertices are the partial sums Σ_{k≤n} k^{−s}`, okChain && s.chain.length === s.top + 1);
  check(`${tag}: vertex heights are Σ m_p ln p = ln n`, okHeight);
  const I = s.leanInstances;
  check(`${tag}: rungs m ln p of distinct prime powers never coincide`, I.heights.maxError < 1e-12 && I.heights.minRungGap > 1e-3);
  check(`${tag}: remainder at the top is ζ(s) − S_N`, C.abs(C.sub(s.remainder, C.sub(zr, s.chain[s.top].S))) < 1e-10);
  if (s.top === s.paths) {
    const N = s.paths, est = C.sub(C.div(powNeg(N, [s.sigma - 1, s.t]), [s.sigma - 1, s.t]), C.sc(powNeg(N, sv), 0.5));
    check(`${tag}: the Euler–Maclaurin estimate N^{1−s}/(s − 1) − N^{−s}/2 of the remainder`, C.abs(C.sub(s.emEstimate, est)) < 1e-12 && C.abs(C.sub(est, s.remainder)) < 0.02);
  }
  // the shells
  check(`${tag}: shell radii p^{−σ} and p^{−(1−σ)}`, s.halos.every((h) => near(h.fwd, h.p ** -s.sigma, 1e-14) && near(h.dual, h.p ** -(1 - s.sigma), 1e-14)) && s.dualShown === (s.sigma < 1));
  // the Möbius chain
  let Mb = [0, 0], okMob = true;
  for (const v of s.mobiusChain) { if (v.n > 0 && mobius(v.n)) Mb = C.add(Mb, C.sc(powNeg(v.n, sv), mobius(v.n))); if (C.abs(C.sub(Mb, v.M)) > 1e-11) okMob = false; }
  check(`${tag}: the Möbius chain Σ μ(n) n^{−s} (rungs with μ(n) = 0 do not move)`, okMob && (s.mobiusChain.length <= 4 || C.abs(C.sub(s.mobiusChain[4].M, s.mobiusChain[3].M)) === 0));
  // Euler product = Dirichlet sum for σ > 1
  let E = [1, 0]; for (let p = 2; p <= s.paths; p++) if (isPrime(p)) E = C.div(E, C.sub([1, 0], powNeg(p, sv)));
  check(`${tag}: Euler partial product over p ≤ N`, C.abs(C.sub(E, s.euler)) < 1e-11);
  if (s.sigma > 1) {
    check(`${tag}: σ > 1: Euler product and Dirichlet sum both approach ζ(s)`, I.euler.applies && C.abs(C.sub(s.euler, zr)) < 0.01 && C.abs(C.sub(s.partialSum, zr)) < 0.01
      && near(I.euler.productGap, C.abs(C.sub(s.euler, zr)), 1e-10) && C.abs(C.sub(s.inverse, C.div([1, 0], zr))) < 1e-10);
  } else check(`${tag}: σ ≤ 1: no Euler comparison`, !I.euler.applies);
  // η: the alternating partial sums approach (1 − 2^{1−s}) ζ(s)
  const lim = C.mul(C.sub([1, 0], powNeg(2, [s.sigma - 1, s.t])), zr);
  let A = [0, 0]; for (let n = 0; n < 4000; n++) A = C.add(A, C.sc(powNeg(n + 1, sv), n % 2 ? -1 : 1));
  check(`${tag}: alternating partial sum (4000 terms) and its gap to (1 − 2^{1−s}) ζ(s)`, C.abs(C.sub(I.eta.partial, A)) < 1e-10 && near(I.eta.partialGap, C.abs(C.sub(A, lim)), 1e-9)
    && I.eta.midGap < 1e-3 * Math.max(1, s.t));
  // ξ, its reflection and conjugation, normalized by |G(s)|
  const G = gfac(sv), xi = C.mul(G, zr);
  check(`${tag}: ξ = G ζ with G = ½ s(s − 1) π^{−s/2} Γ(s/2) (Lanczos)`, rel(I.xi.G, C.abs(G), 1e-9) && C.abs(C.sub(I.xi.normalized, C.sc(xi, 1 / C.abs(G)))) < 1e-9);
  if (s.sigma < 1) {
    const x1 = C.mul(gfac([1 - s.sigma, -s.t]), zetaEM([1 - s.sigma, -s.t])), x3 = C.mul(gfac([1 - s.sigma, s.t]), zetaEM([1 - s.sigma, s.t]));
    check(`${tag}: ξ(1 − s) = ξ(s) and ξ(1 − s̄) = conj ξ(s), recomputed`, C.abs(C.sub(x1, xi)) / C.abs(G) < 1e-8 && C.abs(C.sub(x3, [xi[0], -xi[1]])) / C.abs(G) < 1e-8
      && I.xi.reflection < 1e-9 && I.xi.conjugation < 1e-9);
  }
  if (Math.abs(s.sigma - 0.5) < 1e-12) check(`${tag}: on the critical line ξ/|G| is real`, Math.abs(I.xi.normalized[1]) < 1e-9);
  // the quartic F with full symmetry and four off-line zeros
  const d = s.sigma - 0.5, g = s.t;
  if (Math.abs(d) > 1e-12) {
    const F = (w) => { const z = [w[0] - 0.5, w[1]], a = C.sub(z, [d, 0]), b = C.add(z, [d, 0]); return C.mul(C.add(C.mul(a, a), [g * g, 0]), C.add(C.mul(b, b), [g * g, 0])); };
    const roots = [[0.5 + d, g], [0.5 + d, -g], [0.5 - d, g], [0.5 - d, -g]];
    check(`${tag}: the quartic vanishes at ½ ± δ ± iγ, is symmetric, and is positive at ½ + iγ`, I.quartic && roots.every((r) => C.abs(F(r)) < 1e-6 * g ** 4) && I.quartic.atRoots < 1e-6 * g ** 4
      && C.abs(C.sub(F([1 - sv[0], -sv[1]]), F(sv))) < 1e-9 * g ** 4 && rel(I.quartic.onLine[0], d ** 4 + 4 * g * g * d * d, 1e-9) && I.quartic.onLine[0] > 0);
  }
}
/** Every number of a staircase state against the algorithms of this file. */
function checkStair(s, tag) {
  const k = s.k, gam = s.gammas;
  check(`${tag}: K(t) counts the zeros with γ ≤ t, at most K`, k === gam.slice(0, s.zerosK).filter((g) => g <= s.t + 1e-12).length);
  check(`${tag}: ψ₀(x*) exact and rebuilt from K(t) zeros`, near(s.exact, psi0Exact(s.xs), 1e-12) && near(s.rec, explicit(s.xs, gam, k), 1e-9));
  check(`${tag}: the profile is the truncated explicit formula`, s.profile.every((q) => near(q.v, explicit(q.x, gam, k), 1e-9)));
  check(`${tag}: the rises: exact Λ(n), rebuilt across [n − ½, n + ½]`, s.rises.every((r) => near(r.exact, vonMangoldt(r.n), 1e-14) && r.pp === (vonMangoldt(r.n) > 0)
    && near(r.rec, explicit(r.n + 0.5, gam, k) - explicit(r.n - 0.5, gam, k), 1e-9)));
  const ir = integratedRef(s.xs, gam, k);
  check(`${tag}: integrated explicit formula: zero side, arithmetic side and gap`, near(s.integrated.lhs, ir.lhs, 1e-11) && near(s.integrated.rhs, ir.rhs, 1e-10) && near(s.integrated.gap, ir.lhs - ir.rhs, 1e-10));
}
function checkMath(s, tag) { if (s.scene === 'spiral') checkSpiral(s, tag); else checkStair(s, tag); }

/** The strip labels in pixels: in every column a label covers, the rows between its lowest glyph pixel and the first pixel
    of a curve colour below it (antialiased edges included) are counted; at least five must be blank. Rows of the
    background grid (a horizontal line across the whole plot) count as blank. */
async function stripClearance(p) {
  return p.evaluate(() => {
    const st = window.ZETA_SPIRAL_DEBUG.state, cv = document.getElementById('plot');
    if (!st.plot || !cv.clientWidth || getComputedStyle(cv).display === 'none') return null;
    const copy = document.createElement('canvas'); copy.width = cv.width; copy.height = cv.height;
    const cc = copy.getContext('2d', { willReadFrequently: true }); cc.drawImage(cv, 0, 0);
    const dpr = cv.width / cv.clientWidth, d = cc.getImageData(0, 0, cv.width, cv.height).data, W = cv.width;
    const swatch = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgb = (h) => { swatch.clearRect(0, 0, 1, 1); swatch.fillStyle = h; swatch.fillRect(0, 0, 1, 1); return [...swatch.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const curveCols = [TRV.palette.violet, TRV.palette.dim, TRV.palette.cyan].map(rgb);
    const like = (i, cols) => d[i + 3] >= 24 && cols.some((c) => Math.abs(d[i] - c[0]) + Math.abs(d[i + 1] - c[1]) + Math.abs(d[i + 2] - c[2]) < 70);
    const grid = new Set(), xa = Math.ceil(44 * dpr), xb = W - Math.ceil(16 * dpr);
    for (let y = 0; y < cv.height; y++) { let n = 0; for (let x = xa; x < xb; x++) if (d[(y * W + x) * 4 + 3] >= 24) n++; if (n > 0.7 * (xb - xa)) grid.add(y); }
    const out = [];
    for (const lb of st.plot.labels) {
      const own = [rgb(lb.color)], x0 = Math.ceil(lb.x0 * dpr) + 1, x1 = Math.floor(lb.x1 * dpr) - 1;
      let min = Infinity, cols = 0;
      for (let x = x0; x <= x1; x++) {
        let gb = -1;
        for (let y = Math.max(0, Math.floor((lb.top - 3) * dpr)); y <= Math.ceil((lb.bottom + 3) * dpr); y++) if (like((y * W + x) * 4, own)) gb = y;
        if (gb < 0) continue;
        let y = gb + 1; while (y < cv.height && (grid.has(y) || !like((y * W + x) * 4, curveCols))) y++;
        if (y >= cv.height) continue;
        cols++; min = Math.min(min, y - gb - 1);
      }
      out.push({ text: lb.text, blank: min, cols, top: lb.top });
    }
    return out;
  });
}
async function checkStrip(p, tag) {
  const r = await stripClearance(p);
  if (!r) return;
  check(`${tag}: every strip label keeps ≥ 5 blank pixel rows above its curve and sits inside the plot`, r.length > 0 && r.every((x) => x.cols > 3 && x.blank >= 5 && x.top >= 0), JSON.stringify(r));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the seven green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one red OPEN box for the Riemann Hypothesis in #evidence, linked to the conjecture`, await p.evaluate((rh) => {
    const o = [...document.querySelectorAll('#evidence .lean.open')];
    return o.length === 1 && o[0].querySelector('.ok').textContent.trim() === 'OPEN' && !o[0].querySelector('[data-lean-gid]')
      && JSON.stringify([...o[0].querySelectorAll('a')].map((a) => a.getAttribute('href')).sort()) === JSON.stringify([...rh].sort());
  }, RH));
  check(`${tag}: one ARGUED, one MODEL and one NUM box`, await p.evaluate(() => ['argued', 'model', 'num'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)));
  check(`${tag}: bilingual theory link to §31.1`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
}

/* ---------- runtime contract ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
await checkLinks(page, 'runtime');
check('layout: the shared three-column lab, the stage and the strip in the middle', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip #plot')
    && !document.querySelector('#stage #plot') && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence')
    && document.querySelector('#evidence > #infoBtn') === document.querySelector('#evidence').firstElementChild
    && !!document.querySelector('#stage > canvas#cv') && document.querySelector('#stage > button.handle[type="button"]') !== null
    && getComputedStyle(document.getElementById('stage')).containerType === 'size';
}));
check('shell: the card deck is #rail, footer.rail is not, #infoBtn opens #evidence above its title', await page.evaluate(() => {
  const rail = document.querySelectorAll('#rail'), info = document.getElementById('infoBtn');
  return rail.length === 1 && rail[0].matches('.app.lab > aside.col.deck') && document.querySelector('.app.lab > footer.rail')?.id !== 'rail'
    && document.getElementById('evidence').firstElementChild === info && info.nextElementSibling?.tagName === 'H2';
}));
check('colours (Rule 2): readouts are never amber, the key readout is neutral sigma; red only in OPEN boxes, green only in LEAN boxes', await page.evaluate(() => {
  const probe = (v) => { const e = document.createElement('i'); e.style.color = `var(${v})`; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; };
  const amber = probe('--amber'), sigma = probe('--sigma'), warn = probe('--warn'), ok = probe('--ok');
  const paints = (el, c) => { const st = getComputedStyle(el); return [st.color, st.backgroundColor, st.borderTopColor, st.borderBottomColor, st.borderLeftColor, st.borderRightColor].includes(c); };
  const all = [...document.querySelectorAll('body *')], keys = [...document.querySelectorAll('dl.ro .key dd output')];
  return new Set([amber, sigma, warn, ok]).size === 4 && keys.length === 1 && keys.every((o) => getComputedStyle(o).color === sigma)
    && [...document.querySelectorAll('dl.ro output, dl.ro dd')].every((o) => getComputedStyle(o).color !== amber)
    && all.filter((el) => paints(el, warn)).every((el) => el.closest('#evidence .lean.open'))
    && all.filter((el) => paints(el, ok)).every((el) => el.closest('#evidence .lean:not(.open):not(.num):not(.model):not(.argued):not(.frozen)'));
}));
check('source (Rule 2): no amber readout rule, no red or green token, class or palette key in the page style and script', !/dl\.ro[^{}]*\{[^}]*--amber/.test(sources['style.css'])
  && !/--(?:warn|ok)\b|\bc-(?:wn|ok)\b|\.sw\.(?:wn|ok)\b/.test(sources['style.css'] + sources['main.js']) && !/\b(?:c-wn|c-ok)\b|class="sw (?:wn|ok)"/.test(sources['index.html'])
  && !/\b(?:P|palette)\.(?:warn|ok|red|green)\b|\[['"](?:wn|ok)['"]/.test(sources['main.js']));
{
  const s = await state();
  check('layout: opens on the default card at γ₁, paused', s.preset === 'critical-zero-cancellation' && s.t === G1 && !s.playing && s.sigma === 0.5);
  check('the zero table: the first five ordinates agree with the reference to 10 places', REF.gamma.every((g, k) => near(s.gammas[k], g, 6e-11)));
  check('the zero table: |ζ(½ + iγₖ)| < 1e-9 for all fifty ordinates (Euler–Maclaurin)', s.gammas.length === 50 && s.gammas.every((g) => C.abs(zetaEM([0.5, g])) < 1e-9)
    && s.gammas.every((g, k) => k === 0 || g > s.gammas[k - 1]));
  check('the default amber pill is γ₁', await page.getAttribute('[data-zero="1"]', 'aria-pressed') === 'true' && (await page.$$eval('#zeroPills [aria-pressed="true"]', (b) => b.length)) === 1);
}

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets scene, σ, t, N, K, Möbius and vantage`, s.preset === card && s.scene === c.scene && !s.playing && near(s.sigma, c.sigma, 1e-12)
      && near(s.t, c.t, 1e-12) && s.paths === c.paths && s.zerosK === c.zerosK && s.mobius === c.mobius && s.vantage === c.vantage
      && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still)
      && near(s.camera.yaw, VIEWS[c.scene][c.vantage][0], 1e-9) && near(s.camera.pitch, VIEWS[c.scene][c.vantage][1], 1e-9));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
    await checkStrip(page, `${lang}/${card} 1440`);
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('euler-dirichlet-phasor-spiral');
{ const s = await state(); check('card 1 note: ζ(s) = 0.5421 + 0.0499i, 1/ζ(s) = 1.8291 − 0.1683i, μ(4) = 0 rung', s.zeta[0].toFixed(4) === '0.5421' && s.zeta[1].toFixed(4) === '0.0499'
  && s.inverse[0].toFixed(4) === '1.8291' && s.inverse[1].toFixed(4) === '-0.1683' && s.mobiusTop >= 12); }
await pick('critical-zero-cancellation');
{ const s = await state(); check('card 2 note: |ζ| = 0.0000, shells 2^{−½} = 0.7071 coincide', s.absZeta < 5e-5 && s.halos.every((h) => near(h.fwd, h.dual, 1e-15)) && s.halos[0].fwd.toFixed(4) === '0.7071'
  && (await page.textContent('#roKey')).trim() === '0.0000'); }
await pick('off-line-shell-imbalance');
{ const s = await state(); check('card 3 note: 2^{−0.62} = 0.6507, 2^{−0.38} = 0.7684, |ζ(0.62 + iγ₁)| = 0.0907 (reference 0.0906995919)', s.halos[0].fwd.toFixed(4) === '0.6507'
  && s.halos[0].dual.toFixed(4) === '0.7684' && s.absZeta.toFixed(4) === '0.0907' && near(s.absZeta, REF.abs062, 1e-12) && (await page.textContent('#roKey')).trim() === '0.0907'); }
await pick('weil-explicit-prime-staircase');
{
  const s = await state();
  check('card 4 note: 50 zeros, steep rises at prime powers, nearly flat at 6, 10, 12', s.k === 50 && s.rises.filter((r) => [6, 10, 12].includes(r.n)).every((r) => Math.abs(r.rec) < 0.2)
    && s.rises.filter((r) => r.pp).every((r) => r.rec > 0.6));
  for (const [K, i] of [[5, 0], [20, 1], [50, 2]]) for (const x of [2, 10]) check(`reference: ψ₀ with ${K} zeros at x = ${x} matches the 100-digit table`, near(explicit(x, s.gammas, K), REF.psi0K[x][i], 1e-9));
  check('reference: |ζ(0.38 + iγ₁)| matches the 100-digit table', near(C.abs(zetaEM([0.38, s.gammas[0]])), REF.abs038, 1e-11));
}

/* ---------- every control ---------- */
await pick('critical-zero-cancellation');
for (const k of [1, 2, 3, 4, 5]) {
  await page.click(`[data-zero="${k}"]`); await settle(page);
  const s = await state();
  check(`zero pill γ${k}: t = γ${k}, the pill alone is amber, |ζ(½ + iγ${k})| = 0.0000`, near(s.t, s.gammas[k - 1], 1e-12) && s.preset === null && s.absZeta < 1e-9
    && await page.getAttribute(`[data-zero="${k}"]`, 'aria-pressed') === 'true' && (await page.$$eval('#zeroPills [aria-pressed="true"]', (b) => b.length)) === 1);
  checkMath(s, `pill γ${k}`);
}
await page.click('[data-zero="1"]'); await settle(page);
for (const sg of [0.2, 0.38, 0.62, 0.85, 1, 1.5, 2]) {
  await input('#sigma', sg); const s = await state();
  check(`σ slider ${sg}: state and output`, near(s.sigma, sg) && s.preset === null && (await page.textContent('output[for="sigma"]')).trim() === sg.toFixed(2));
  checkMath(s, `σ=${sg}`);
  if (sg === 0.38) check('σ = 0.38: |ζ(0.38 + iγ₁)| = 0.0999650 (reference)', near(s.absZeta, REF.abs038, 1e-11));
}
await input('#sigma', 0.5);
for (const N of [20, 80, 400]) {
  await input('#paths', N); const s = await state();
  check(`N slider ${N}: state and output`, s.paths === N && (await page.textContent('output[for="paths"]')).trim() === String(N));
  checkMath(s, `N=${N}`);
}
await input('#paths', 160);
await page.click('#mobiusToggle'); await settle(page);
{ const s = await state(); check('Möbius toggle: on', s.mobius && await page.getAttribute('#mobiusToggle', 'aria-pressed') === 'true' && s.preset === null); checkMath(s, 'Möbius'); }
await page.click('#mobiusToggle'); await settle(page);
check('Möbius toggle: off', !(await state()).mobius);
// the clock sweeps t through the trace; Home and the rail
await input('#now', 21.0220396387715);
{ const s = await state(); check('rail: t follows the slider in the spiral scene (max 36)', near(s.t, 21.0220396387715, 1e-9) && s.clockMax === 36); checkMath(s, 'rail t'); }
for (const sc of ['staircase', 'spiral']) {
  await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page);
  const s = await state();
  check(`scene chip ${sc}: scene, clock range and camera`, s.scene === sc && s.clockMax === (sc === 'spiral' ? 36 : 145) && await page.getAttribute(`#sceneChips [data-scene="${sc}"]`, 'aria-pressed') === 'true'
    && near(s.camera.yaw, VIEWS[sc].oblique[0], 1e-9));
  checkMath(s, `scene ${sc}`);
}
await page.click('#sceneChips [data-scene="staircase"]'); await settle(page);
for (const K of [5, 20, 50]) {
  await input('#zeros', K); await input('#now', 145); const s = await state();
  check(`K slider ${K}: state, output and K(t) = K at t = 145`, s.zerosK === K && s.k === K && (await page.textContent('output[for="zeros"]')).trim() === String(K));
  checkMath(s, `K=${K}`);
}
for (const k of [2, 4]) {
  await page.click(`[data-zero="${k}"]`); await settle(page);
  const s = await state(); check(`staircase pill γ${k}: the cut-off keeps exactly the first ${k} zeros`, s.k === k && near(s.t, s.gammas[k - 1], 1e-12)); checkMath(s, `cut-off γ${k}`);
}
await page.click('#sceneChips [data-scene="spiral"]'); await settle(page);
for (const sc of ['spiral', 'staircase']) {
  await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page);
  for (const v of ['top', 'side', 'oblique']) {
    await page.click(`#vantageChips [data-vantage="${v}"]`); await settle(page);
    const s = await state();
    check(`${sc} vantage ${v}: camera yaw/pitch`, s.vantage === v && near(s.camera.yaw, VIEWS[sc][v][0], 1e-9) && near(s.camera.pitch, VIEWS[sc][v][1], 1e-9));
    const lo = await labelOverlaps(page, '.stage .tag', 0), sv = await stageView(page, '#stage', false);
    check(`${sc} vantage ${v}: stage clear`, lo.length === 0 && sv.layout.length === 0 && sv.hud.length === 0, [...sv.layout, ...sv.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}

/* ---------- the handle: drag in 3D without turning the camera ---------- */
await pick('critical-zero-cancellation');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.ZETA_SPIRAL_DEBUG.handleBox()), target = await page.evaluate(() => window.ZETA_SPIRAL_DEBUG.dragTarget(0.8));
  check('σ handle: a visible amber button on the cyan 2^{−σ} ring', !!h && await page.locator('#stageHandle').isVisible());
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('σ handle: pointerdown starts a drag', await page.locator('#stageHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('σ handle: drag sets σ = 0.80 and leaves the camera alone', near(after.sigma, 0.8, 0.011) && same(after.camera, before.camera) && after.preset === null, `${after.sigma}`);
    checkMath(after, 'after σ drag');
  }
  const s0 = (await state()).sigma, t0 = (await state()).t;
  await page.locator('#stageHandle').focus(); await page.keyboard.press('ArrowRight'); await settle(page);
  const k = await state();
  check('σ handle: → raises σ by 0.01 and leaves the clock alone', near(k.sigma, s0 + 0.01, 1e-9) && k.t === t0, `${s0} → ${k.sigma}`);
}
await pick('weil-explicit-prime-staircase');
{
  const before = await state(), h = await page.evaluate(() => window.ZETA_SPIRAL_DEBUG.handleBox()), target = await page.evaluate(() => window.ZETA_SPIRAL_DEBUG.dragTarget(6));
  check('x* handle: shown on the floor of the staircase', !!h);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('x* handle: drag moves x* to about 6, camera unchanged', Math.abs(after.xs - 6) < 0.03 && same(after.camera, before.camera), `${after.xs}`);
    checkMath(after, 'after x* drag');
  }
  await page.click('#vantageChips [data-vantage="side"]'); await settle(page);
  check('x* handle: still shown in the side view, where x runs across the screen', !!(await page.evaluate(() => window.ZETA_SPIRAL_DEBUG.handleBox())));
  await page.click('#vantageChips [data-vantage="oblique"]'); await settle(page);
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the time rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.ZETA_SPIRAL_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
// the staircase card parks paused at the end of the rail with all fifty rows; ▶ there replays the sweep from t = 0
await page.click('[data-preset="weil-explicit-prime-staircase"]'); await settle(page); await twoFrames(page);
{ const s = await state(); check('the staircase card parks paused at t = 145 with K(t) = 50', s.preset === 'weil-explicit-prime-staircase' && !s.playing && s.t === 145 && s.k === 50 && s.clockMax === 145); }
for (const [button, name] of [['#play', 'rail ▶'], ['#playBtn', 'tour ▷']]) {
  const s = await page.evaluate((b) => { document.querySelector(b).click(); return window.ZETA_SPIRAL_DEBUG.state; }, button);
  check(`${name} at t = 145 restarts the sweep from t = 0, the card kept`, s.playing && s.t === 0 && s.k === 0 && s.preset === 'weil-explicit-prime-staircase');
  check(`${name}: the sweep runs on from t = 0`, await until(page, () => { const q = window.ZETA_SPIRAL_DEBUG.state; return q.playing && q.t > 0 && q.t < 145; }));
  await pause();
  await page.click('[data-preset="weil-explicit-prime-staircase"]'); await settle(page);
  { const q = await state(); check(`${name}: the card parks at t = 145 again`, !q.playing && q.t === 145 && q.k === 50); }
}
// ▶ while the card tweens t back to 145 on its own scene: the clock takes over where t is, the tween does not land it on 145
await input('#now', 30);
{
  const s = await page.evaluate(() => { document.querySelector('[data-preset="weil-explicit-prime-staircase"]').click(); document.getElementById('play').click(); TRV.kit.flush(); return window.ZETA_SPIRAL_DEBUG.state; });
  check('▶ during the card tween: playback takes over at t = 30, the tween does not pull t to 145', s.playing && near(s.t, 30, 1e-9) && s.preset === 'weil-explicit-prime-staircase' && s.sigma === 0.5);
}
await pause();
await page.click('[data-preset="critical-zero-cancellation"]'); await settle(page);
{ const s = await state(); check('a static card tweens to its own t and stays paused', s.preset === 'critical-zero-cancellation' && near(s.t, G1, 1e-12) && !s.playing); }

/* ---------- desktop, embed lab and phone, both languages: layout and strip labels ---------- */
for (const lang of ['zh', 'en']) for (const [width, height, query, scheme] of [[1440, 900, '', 'dark'], [740, 620, '&embed=1', 'dark'], [390, 844, '', 'light']]) {
  colorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${query}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
  await settle(p);
  const tag = `${lang}/${width}x${height}${query}/${scheme}`;
  check(`${tag}: no palette attribute under a ${scheme} system scheme`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await checkLinks(p, tag);
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: card applies`, s.preset === card && !s.playing);
    const v = await stageView(p, '#stage', false), lo = await labelOverlaps(p, '.stage .tag', 0), cg = await capitalGreek(p), ox = await overflowX(p);
    check(`${tag}/${card}: layout, HUD, labels, capitals and overflow`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0 && cg.length === 0 && ox <= 0,
      [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / ')), ...cg, `overflow ${ox}`].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no Chinese on screen`, (await cjkLeftovers(p)).length === 0);
    await p.locator('.strip').scrollIntoViewIfNeeded(); await settle(p);
    await checkStrip(p, `${tag}/${card}`);
  }
  await p.context().close();
}
colorScheme = 'dark';
for (const lang of ['zh', 'en']) for (const [w, h] of [[334, 500], [740, 500]]) for (const card of Object.keys(CARDS)) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: { width: w, height: h }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  const tag = `cited ${w}x${h} ${lang}/${card}`;
  if (card === 'weil-explicit-prime-staircase') {
    await twoFrames(p); const s0 = await state(p);
    check(`${tag}: opens paused at t = 145 with K(t) = 50, not playing from the start of the rail`, !s0.playing && s0.t === 145 && s0.k === 50);
  }
  await p.evaluate(() => { TRV.kit.pause(); TRV.kit.flush(); });
  const s = await state(p), v = await stageView(p, '#stage', true), lo = await labelOverlaps(p, '.stage .tag', 0), cg = await capitalGreek(p), ox = await overflowX(p);
  check(`${tag}: opens on the card`, s.preset === card && await p.evaluate(() => document.documentElement.dataset.figure === '1'));
  check(`${tag}: stageView layout and HUD empty`, v.layout.length === 0 && v.hud.length === 0, [...v.layout, ...v.hud].join(' | '));
  check(`${tag}: labels apart, capitals kept, no sideways scroll`, lo.length === 0 && cg.length === 0 && ox === 0, JSON.stringify({ lo, cg, ox }));
  if (lang === 'en') check(`${tag}: no Chinese on screen`, (await cjkLeftovers(p)).length === 0);
  check(`${tag}: the strip is not in the frame and the stage holds no plot`, await p.evaluate(() => { const st = document.querySelector('.strip'); return (!st || getComputedStyle(st).display === 'none') && !document.querySelector('#stage #plot'); }));
  await p.context().close();
}

/* ---------- the staircase card in a narrow chapter frame (390 × 500): all fifty zeros, every callout in view ---------- */
for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=weil-explicit-prime-staircase`, { viewport: { width: 390, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p); await twoFrames(p);
  const s = await state(p), F = s.stageFrame, tag = `narrow 390x500 ${lang}/weil-explicit-prime-staircase`;
  check(`${tag}: opens paused at t = 145 with K(t) = 50`, s.preset === 'weil-explicit-prime-staircase' && !s.playing && s.t === 145 && s.k === 50
    && (await p.textContent('#hudBig')).includes('K(t) = 50'));
  const texts = s.labels.map((b) => b.text.replace(/<[^>]+>/g, ''));
  const want = [lang === 'zh' ? '主项 x − ln 2π − …' : 'main term x − ln 2π − …', 'K(t) = 50', 'x* = 10.00', 'ψ₀(x)', 'Σ −2Re(xρ/ρ)', '2', '6', '10', '12', '13'];
  check(`${tag}: the five callouts and the integers 2, 6, 10, 12, 13 are all placed`, same([...texts].sort(), [...want].sort()), texts.join(' ; '));
  check(`${tag}: every label keeps 10 px from the stage edge`, s.labels.every((b) => b.x >= 9.5 && b.y >= 9.5 && b.x + b.w <= F.W - 9.5 && b.y + b.h <= F.H - 9.5),
    JSON.stringify(s.labels.map((b) => [b.text, Math.round(b.x), Math.round(b.y), Math.round(F.W - b.x - b.w), Math.round(F.H - b.y - b.h)])));
  const lo = await labelOverlaps(p, '.stage .tag', 0), v = await stageView(p, '#stage', true);
  check(`${tag}: labels apart, layout and HUD clear`, lo.length === 0 && v.layout.length === 0 && v.hud.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  const scan = await strokesUnderIntegers(p), under = scan.filter((b) => b.text !== 'control'), control = scan.find((b) => b.text === 'control');
  check(`${tag}: control: the stroke scan finds the magenta and amber strokes on the stage`, control.mg > 100 && control.am > 50, JSON.stringify(control));
  check(`${tag}: no magenta residual or amber guide stroke under an integer label`, under.length === 5 && under.every((b) => b.mg === 0 && b.am === 0), JSON.stringify(under));
  await p.context().close();
}

/* ---------- the stills a chapter prints ---------- */
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), c = CARDS[card];
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, c.t, 1e-12) && await p.locator('#stageHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'critical-zero-cancellation') check(`still ${lang}/${card}: |ζ| = 0.0000 and the shells coincide`, s.absZeta < 5e-5 && near(s.halos[0].fwd, s.halos[0].dual, 1e-15));
  if (card === 'off-line-shell-imbalance') check(`still ${lang}/${card}: |ζ| = 0.0907, shells 0.6507 and 0.7684`, s.absZeta.toFixed(4) === '0.0907' && s.halos[0].fwd.toFixed(4) === '0.6507' && s.halos[0].dual.toFixed(4) === '0.7684');
  if (card === 'weil-explicit-prime-staircase') check(`still ${lang}/${card}: all fifty zeros, composites nearly flat`, s.k === 50 && s.rises.filter((r) => [6, 10, 12].includes(r.n)).every((r) => Math.abs(r.rec) < 0.2));
  if (card === 'euler-dirichlet-phasor-spiral') check(`still ${lang}/${card}: σ = 1.5, the Möbius chain on`, s.sigma === 1.5 && s.mobius);
  checkMath(s, `still ${lang}/${card}`);
  await p.context().close();
}

check('palette: every observed document stayed without data-tr-palette', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: dark and light system schemes were both observed', paletteDocuments.some((r) => r.dark) && paletteDocuments.some((r) => !r.dark));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
