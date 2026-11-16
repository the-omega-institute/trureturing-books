#!/usr/bin/env node
// ZETA//SPECTRUM browser regression: the shared stage-first gate first, then every control and every property the page
// claims, against independent mathematics written here: partial sums from a complex exponential of −s log n, the Euler
// product over a sieve of Eratosthenes inverted once at the end, μ(n) by factorisation (not by the page's convolution),
// the quartet by expanding four linear factors and Horner evaluation, ψ₀ by trial-division prime powers with explicit
// left and right limits, and the zero harmonics as exp(ρ log x)/ρ. The stair's visible label is parsed and evaluated at
// prime powers and elsewhere on its stated domain. The stair handle is dragged across many prime-power jumps, along the
// visible stair and after orbiting the camera; the zero ordinates are compared with the published table as numbers;
// the evidence and the drawer must give each source its actual role.
//   node books/quantum-geometry/viz/tests/zeta-spectrum-lab.test.mjs   (VIZ_SLOW_FRAMES=1000 for slow frames)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'zeta-spectrum-lab';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
// The first ten positive ordinates of the nontrivial zeros as published (Odlyzko's tables; DLMF §25.10 lists the same
// values), written with more digits than a double holds. The page's own zero array is compared with them as numbers.
const GAMMA_TABLE = ['14.134725141734693790457', '21.022039638771554992628', '25.010857580145688763213', '30.424876125859513210311',
  '32.935061587739189690662', '37.586178158825671257217', '40.918719012147495187398', '43.327073280914999519496',
  '48.005150881167159727942', '49.773832477672302181916'].map(Number);
const GAMMAS = GAMMA_TABLE;

/* ---------- own complex arithmetic ---------- */
const c = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  inv: (a) => { const d = a[0] * a[0] + a[1] * a[1]; return [a[0] / d, -a[1] / d]; },
  exp: (a) => { const r = Math.exp(a[0]); return [r * Math.cos(a[1]), r * Math.sin(a[1])]; },
  abs: (a) => Math.hypot(a[0], a[1])
};
const pw = (n, s) => c.exp([-s[0] * Math.log(n), -s[1] * Math.log(n)]);      // n^{−s} = exp(−s log n)
const close = (a, b, tol) => c.abs(c.sub(a, b)) <= tol * Math.max(1, c.abs(b));
const near = (a, b, tol) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;

/* ---------- own arithmetic ---------- */
function sieve(n) { const comp = new Uint8Array(n + 1), out = []; for (let i = 2; i <= n; i++) { if (comp[i]) continue; out.push(i); for (let j = i * i; j <= n; j += i) comp[j] = 1; } return out; }
const PR = sieve(200);
function factor(n) { const f = []; for (const p of PR) { if (p * p > n) break; let e = 0; while (n % p === 0) { n /= p; e++; } if (e) f.push([p, e]); } if (n > 1) f.push([n, 1]); return f; }
const mobius = (n) => { const f = factor(n); return f.some(([, e]) => e > 1) ? 0 : (f.length % 2 ? -1 : 1); };
const lambda = (n) => { if (n < 2) return 0; const f = factor(n); return f.length === 1 ? Math.log(f[0][0]) : 0; };
const psiLeft = (n) => { let s = 0; for (let m = 2; m < n; m++) s += lambda(m); return s; };      // ψ(n⁻) for an integer n
function psi0(x) {
  if (Math.abs(x - Math.round(x)) < 1e-9) { const n = Math.round(x); return (psiLeft(n) + psiLeft(n) + lambda(n)) / 2; }
  let s = 0; for (let m = 2; m <= Math.floor(x); m++) s += lambda(m); return s;
}
/** −2 Re(x^ρ/ρ), ρ = ½ + iγ. */
const harmonic = (g, x) => -2 * c.mul(c.exp([0.5 * Math.log(x), g * Math.log(x)]), c.inv([0.5, g]))[0];
const explicit = (x, K) => { let s = x - Math.log(2 * Math.PI) - 0.5 * Math.log(1 - x ** -2); for (let k = 0; k < K; k++) s += harmonic(GAMMAS[k], x); return s; };
/** Coefficients (highest first) of ∏ (s − r) over complex roots r, by repeated multiplication. */
function expand(roots) { let p = [[1, 0]]; for (const r of roots) { const q = p.map((a) => a.slice()).concat([[0, 0]]); for (let i = 0; i < p.length; i++) q[i + 1] = c.sub(q[i + 1], c.mul(p[i], r)); p = q; } return p; }
const horner = (co, s) => co.reduce((acc, a) => c.add(c.mul(acc, s), a), [0, 0]);

const T = await session();
const { page, check } = T;
await stageFirstChecks(T, BOOK, ID);

const state = async (p = page) => { await settle(p); return p.evaluate(() => window.ZETA_SPECTRUM_DEBUG.state); };
const setParams = async (o, p = page) => { await p.evaluate((x) => window.ZETA_SPECTRUM_DEBUG.setParams(x), o); return state(p); };
async function input(sel, v, p = page) { await p.locator(sel).evaluate((el, x) => { el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); return state(p); }
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); }); return state(p); }
/** A viewport point over the bare canvas of the stage (not a button, chip or label host), at least 60 px from the handle. */
async function emptyPoint(p = page) {
  return p.evaluate(() => {
    const st = document.getElementById('stage'), r = st.getBoundingClientRect(), h = document.getElementById('handle');
    const hb = h && !h.hidden ? h.getBoundingClientRect() : null;
    for (const [fx, fy] of [[0.5, 0.55], [0.3, 0.55], [0.7, 0.55], [0.5, 0.42], [0.25, 0.4], [0.75, 0.4], [0.3, 0.7], [0.7, 0.7], [0.15, 0.55], [0.85, 0.55]]) {
      const x = r.left + fx * r.width, y = r.top + fy * r.height;
      if (hb && Math.hypot(x - hb.left - hb.width / 2, y - hb.top - hb.height / 2) < 60) continue;
      const el = document.elementFromPoint(x, y);
      if (el && el.id === 'cv') return { x, y };
    }
    return null;
  });
}
/** Orbit the camera as a reader does: press on empty canvas, drag right and down, release. */
async function orbit(p = page) {
  const e = await emptyPoint(p);
  if (!e) return null;
  const before = await state(p);
  await p.mouse.move(e.x, e.y); await p.mouse.down(); await p.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await p.mouse.up();
  return { before, after: await state(p) };
}
const turned = (o) => !!o && o.after.camera.yaw < o.before.camera.yaw - 0.2 && o.after.camera.pitch > o.before.camera.pitch + 0.05;
const sameParams = (o) => !!o && JSON.stringify(o.after.params) === JSON.stringify(o.before.params) && o.after.preset === o.before.preset;
/** Distance in px between the handle and where the page says the handle of these parameters projects now. */
async function handleOff(target, p = page) {
  const [h, t] = await p.evaluate((o) => [window.ZETA_SPECTRUM_DEBUG.handleBox(), window.ZETA_SPECTRUM_DEBUG.dragTarget(o)], target);
  return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity;
}
/** Prime powers (by our own Λ) strictly between a and b: the jumps of the stair a drag from a to b passes. */
const jumpsBetween = (a, b) => { let k = 0; for (let n = 2; n <= 20; n++) if (lambda(n) > 0 && n > Math.min(a, b) && n < Math.max(a, b)) k++; return k; };
/** Press the handle, move through viewport targets one by one (reading x after each), release. */
async function dragThrough(targets, p = page) {
  const h = await p.evaluate(() => window.ZETA_SPECTRUM_DEBUG.handleBox());
  const read = [];
  await p.mouse.move(h.x, h.y); await p.mouse.down();
  for (const t of targets) {
    const to = await p.evaluate((o) => window.ZETA_SPECTRUM_DEBUG.dragTarget(o), t);
    await p.mouse.move(to.x, to.y, { steps: 4 });
    read.push(await p.evaluate(() => window.ZETA_SPECTRUM_DEBUG.state.powers.x));
  }
  await p.mouse.up();
  return read;
}

function checkPhasor(s, tag) {
  const { sigma, tIm, N } = s.params, z = [sigma, tIm], ph = s.phasor;
  let S = [0, 0], worst = 0;
  for (let n = 1; n <= N; n++) { S = c.add(S, pw(n, z)); worst = Math.max(worst, c.abs(c.sub([ph.partial[n - 1][1], ph.partial[n - 1][2]], S)) / Math.max(1, c.abs(S))); }
  check(`${tag}: all ${N} partial sums S_n(s) from exp(−s log n)`, worst < 1e-12 && ph.partial.length === N && ph.partial.every((p, i) => p[0] === i + 1), `${worst}`);
  // the finite Euler product: D = ∏ (1 − p^{−s}) over a sieve, inverted once
  const primes = PR.filter((p) => p <= N);
  check(`${tag}: the primes p ≤ N`, JSON.stringify(ph.primes) === JSON.stringify(primes));
  let D = [1, 0], wE = 0;
  for (let i = 0; i < primes.length; i++) { D = c.mul(D, c.sub([1, 0], pw(primes[i], z))); const E = c.inv(D), e = ph.euler[i + 1]; wE = Math.max(wE, c.abs(c.sub([e[1], e[2]], E)) / Math.max(1, c.abs(E))); }
  check(`${tag}: the finite Euler products over p ≤ N`, wE < 1e-11 && ph.euler.length === primes.length + 1, `${wE}`);
  check(`${tag}: the Euler product is drawn only for σ > 1`, ph.eulerDrawn === (sigma > 1));
  check(`${tag}: |S_N − E_N|`, near(ph.gap, c.abs(c.sub(S, c.inv(D))), 1e-10 * Math.max(1, c.abs(S))));
  // μ by factorisation; the page's μ (from the inverse convolution) satisfies Σ_{d|n} μ(d) = [n = 1]
  const mus = Array.from({ length: N }, (_, i) => mobius(i + 1));
  check(`${tag}: μ(1…N) equals μ by factorisation`, JSON.stringify(ph.mobius) === JSON.stringify(mus));
  let conv = true;
  for (let n = 1; n <= N; n++) { let t = 0; for (let d = 1; d <= n; d++) if (n % d === 0) t += ph.mobius[d - 1]; if (t !== (n === 1 ? 1 : 0)) conv = false; }
  check(`${tag}: Σ_{d|n} μ(d) = [n = 1] for n ≤ N`, conv);
  let M = [0, 0], A = 0;
  for (let n = 1; n <= N; n++) if (mus[n - 1]) { M = c.add(M, c.mul([mus[n - 1], 0], pw(n, z))); A += n ** -sigma; }
  check(`${tag}: M_N(s) = Σ μ(n) n^{−s} and |S_N M_N − 1|`, close(ph.MN, M, 1e-11) && near(ph.reciprocalGap, c.abs(c.sub(c.mul(S, M), [1, 0])), 1e-9 * Math.max(1, c.abs(c.mul(S, M)))) && near(ph.absMu, A, 1e-11 * A));
}
function checkQuartet(s, tag) {
  const q = s.quartet, b = q.beta, g = 0.7, roots = [[b, g], [b, -g], [1 - b, g], [1 - b, -g]];
  const co = expand(roots);
  check(`${tag}: the roots β ± iγ and 1 − β ± iγ`, JSON.stringify(q.roots) === JSON.stringify(roots) && q.gamma === 0.7);
  check(`${tag}: real coefficients of ∏ (s − ρ)`, co.every((a, i) => near(a[0], q.coeffs[i], 1e-12) && Math.abs(a[1]) < 1e-12) && near(q.coeffs[1], -2, 1e-14));
  let worst = 0, refl = 0, conj = 0;
  for (const t of q.tests) {
    const h = horner(co, t.s); worst = Math.max(worst, c.abs(c.sub(h, t.Q)));
    refl = Math.max(refl, c.abs(c.sub(horner(co, [1 - t.s[0], -t.s[1]]), h)));
    conj = Math.max(conj, c.abs(c.sub(horner(co, [t.s[0], -t.s[1]]), [h[0], -h[1]])));
  }
  check(`${tag}: Q at the test points by Horner`, worst < 1e-12, `${worst}`);
  check(`${tag}: Q(1 − s) = Q(s) and Q(s̄) = Q(s)* hold`, refl < 1e-12 && conj < 1e-12 && q.reflection < 1e-12 && q.conjugation < 1e-12);
  check(`${tag}: the roots are roots, at distance |β − ½| from the line`, q.rootValues.every((v) => v < 1e-14) && roots.every((r) => c.abs(horner(co, r)) < 1e-12) && near(q.distance, Math.abs(b - 0.5), 1e-15));
}
function checkPowers(s, tag) {
  const P = s.powers, x = P.x, K = P.K;
  check(`${tag}: ψ₀(x) from trial-division prime powers (endpoint mean at prime powers)`, near(P.psi0, psi0(x), 1e-12), `${P.psi0} vs ${psi0(x)}`);
  check(`${tag}: the ${K}-zero truncation x − Σ 2Re(x^ρ/ρ) − log 2π − ½ log(1 − x^{−2})`, near(P.psiK, explicit(x, K), 1e-10) && near(P.main, explicit(x, 0), 1e-12));
  check(`${tag}: each harmonic −2Re(x^ρ/ρ)`, P.harmonics.every((h, k) => near(h, harmonic(GAMMAS[k], x), 1e-11)));
  check(`${tag}: the zeros used are the first K tabulated ordinates`, P.used.length === K && P.used.every((g, k) => near(g, GAMMA_TABLE[k], 1e-12)));
  const pp = []; for (let n = 2; n <= 20; n++) if (lambda(n) > 0 && (n < x || Math.abs(n - x) < 1e-9)) pp.push(n);
  check(`${tag}: the prime powers up to x, with Λ`, JSON.stringify(P.primePowers.map((p) => p[0])) === JSON.stringify(pp) && P.primePowers.every(([n, l]) => near(l, lambda(n), 1e-15)));
  check(`${tag}: curve samples`, P.curve.every((p) => near(p.psi0, psi0(p.x), 1e-12) && near(p.psiK, explicit(p.x, K), 1e-10)));
}

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [f, src] of Object.entries(sources)) check(`source ${f}: no literal colour, no palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src.replace(/href="[^"]*"/g, '')) && !/data-tr-palette|trPalette/.test(src));
check('source: no override of the lab grid', !/grid-template-columns/.test(sources['style.css']));
check('source: the four cards in order', JSON.stringify([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1])) === '["domain","partial","quartet","powers"]');
check('source: only the shared runtime and the page script', JSON.stringify([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1])) === '["../assets/shell.js","../assets/kit.js","main.js"]');
check('source: no green Lean box', !/class="lean"|class="lean frozen"|data-lean-gid/.test(sources['index.html']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live entry, no Lean list, theory link to §22.4', entry.status === 'live' && Array.isArray(entry.lean) && entry.lean.length === 0 && entry.code === 'ZETA//SPECTRUM'
  && (entry.theory || []).some((t) => /ch22-s04-critical-line-and-rh\.html#sec-ch22-4-1$/.test(t.href)));

/* ---------- opening and the cards ---------- */
await T.goto(BOOK, ID, '?lang=zh');
let s = await state();
check('opens on DOMAIN at its still frame (all N terms) without playing', s.preset === 'domain' && s.scene === 'phasor' && !s.playing && s.params.n === 48 && s.params.sigma === 1.6 && s.params.tIm === 6);
checkPhasor(s, 'DOMAIN');
check('the zero ordinates the page computes with are the ten tabulated values (|Δγ| < 1e-12)', Array.isArray(s.powers.gammas) && s.powers.gammas.length === 10
  && s.powers.gammas.every((g, k) => Math.abs(g - GAMMA_TABLE[k]) < 1e-12), JSON.stringify(s.powers.gammas));
check('DOMAIN: σ > 1, the two approximants differ at this finite N', s.phasor.eulerDrawn && s.phasor.gap > 1e-6 && s.phasor.gap < 0.5);
{
  // each source in its role: §25.2 representations, 27.4.E5 the Möbius series, §27.5 convolution, §25.16 only ψ's
  // definition and asymptotics, the full explicit formula in Davenport ch. 17 or §22.4.1; the series and product
  // identities are not called unformalized (the book cites them frozen in §22.2); no green box; RH is not "unevidenced"
  const ev = await page.evaluate(() => {
    const box = (sel) => { const el = document.querySelector(sel); return el ? { zh: el.querySelector('.zh').textContent, en: el.querySelector('.en').textContent, hrefs: [...el.querySelectorAll('a')].map((a) => a.getAttribute('href')) } : null; };
    return { argued: box('#leanPanel .lean.argued'), open: box('#leanPanel .lean.open'), green: document.querySelectorAll('#leanPanel .lean:not(.argued):not(.num):not(.model):not(.open)').length };
  });
  const a = ev.argued, litEn = a.en.split('Literature results, not formalized in this book')[1] || '', litZh = a.zh.split('以下是文献结果，未在本书形式化')[1] || '';
  check('ARGUED: DLMF §25.2, 27.4.E5, §27.5, §25.16, §25.10 linked, §22.2 and §22.4.1 linked in the book', ['https://dlmf.nist.gov/25.2', 'https://dlmf.nist.gov/27.4.E5', 'https://dlmf.nist.gov/27.5',
    'https://dlmf.nist.gov/25.16', 'https://dlmf.nist.gov/25.10', '../../en/ch22-s02-dirichlet-euler-identity.html#sec-ch22-2', '../../en/ch22-s04-critical-line-and-rh.html#sec-ch22-4-1'].every((h) => a.hrefs.includes(h)), JSON.stringify(a.hrefs));
  check('ARGUED: the series and product identities are cited frozen in §22.2, not listed among the unformalized results', /frozen Lean declarations in §22\.2/.test(a.en) && /§22\.2/.test(a.zh) && /冻结/.test(a.zh)
    && litEn.length > 0 && !/Euler product|Dirichlet series and/.test(litEn) && litZh.length > 0 && !/欧拉积/.test(litZh));
  check('ARGUED: §25.16 is credited with ψ only; the full explicit formula goes to Davenport ch. 17 or §22.4.1', /25\.16 gives only the definition and the asymptotics of ψ/.test(a.en)
    && /Davenport/.test(a.en) && /3rd ed\., Ch\. 17/.test(a.en) && /§22\.4\.1/.test(a.en) && /只给出 ψ\(x\) 的定义与渐近式/.test(a.zh) && /Davenport/.test(a.zh));
  check('OPEN: a finite zero sample cannot prove RH, without calling numerical checks "no evidence"', /cannot prove it/.test(ev.open.en) && !/no evidence/.test(ev.open.en)
    && /不能证明它/.test(ev.open.zh) && !/不是它的证据/.test(ev.open.zh));
  check('no green Lean box on the page', ev.green === 0);
}
check('DOMAIN: no readout calls a finite sum ζ(s)', !/ζ\(s\)\s*=/.test(await page.textContent('#readouts')) && !/ζ\(s\)\s*=/.test(await page.textContent('#hudSub')));
check('DOMAIN: clicking the card plays the terms', await playsAfter(page, () => page.click('[data-preset="domain"]')));
s = await pick('partial');
await input('#now', s.max); s = await state();
checkPhasor(s, 'PARTIAL');
check('PARTIAL: σ = ½ at t = γ₁; no Euler product; the finite sum is not near 0', s.params.sigma === 0.5 && near(s.params.tIm, GAMMA_TABLE[0], 1e-12) && !s.phasor.eulerDrawn && c.abs(s.phasor.SN) > 0.1);
check('PARTIAL: the HUD says finite sum, not ζ(s)', /not ζ\(s\)|不是 ζ\(s\)/.test(await page.textContent('#hudSub')));
s = await pick('quartet');
check('QUARTET: quartet scene, the rail is β', s.scene === 'quartet' && near(s.max, 0.6, 1e-12));
await input('#now', 0.1); s = await state();
checkQuartet(s, 'QUARTET β = 0.3');
check('QUARTET: |β − ½| = 0.2 at β = 0.3 and the card stays', near(s.quartet.distance, 0.2, 1e-12) && s.preset === 'quartet');
s = await pick('powers');
await input('#now', 10); s = await state();
checkPowers(s, 'POWERS x = 9, K = 10');
check('POWERS: x = 9 is a prime power, ψ₀ takes half the jump ½ log 3', s.powers.endpoint && near(s.powers.psi0, psiLeft(9) + Math.log(3) / 2, 1e-12));

/* ---------- sweeps (programmatic, checked independently) ---------- */
for (const [sigma, tIm, N] of [[1.6, 6, 48], [2.5, 0, 8], [1.05, 30, 96], [0.5, 14.134725141734693, 64], [0.2, 3, 33], [1.2, 21.022, 17]]) {
  s = await setParams({ scene: 'phasor', sigma, tIm, N });
  checkPhasor(s, `σ = ${sigma}, t = ${tIm}, N = ${N}`);
}
for (const beta of [0.2, 0.37, 0.5, 0.64, 0.8]) { s = await setParams({ scene: 'quartet', beta }); checkQuartet(s, `β = ${beta}`); }
s = await setParams({ scene: 'quartet', beta: 0.5 });
check('β = ½: the pairs merge into double roots on the line', near(s.quartet.distance, 0, 1e-15) && s.quartet.roots[0][0] === s.quartet.roots[2][0]);
for (const x of [1.2, 2, 3.5, 4, 8, 9, 11.3, 16, 19.99, 20]) for (const K of [0, 3, 10]) {
  s = await setParams({ scene: 'powers', x, t: K });
  checkPowers(s, `x = ${x}, K = ${K}`);
}
for (const n of [4, 8, 9, 16]) {
  s = await setParams({ scene: 'powers', x: n, t: 0 });
  check(`ψ₀ at the prime power ${n} is the mean of its left and right limits`, near(s.powers.psi0, (psiLeft(n) + psiLeft(n + 1)) / 2, 1e-12) && s.powers.endpoint);
}

/* ---------- the visible definition of ψ₀ on the stage ---------- */
// The stair's label is read off the stage as a reader sees it (the shown cyan tag, subscripts kept apart), its right-hand
// side parsed term by term (a coefficient, Σ over n with the relation written in its subscript, Λ(n)) and evaluated with
// our own Λ. At every sampled x on the domain the label states, prime powers where the stair jumps and other integers
// and non-integers where it does not, the label must give the mean of our own left and right limits, and so must the ψ₀
// the HUD prints. A left-limit label Σ_{n<x} Λ(n) fails at every prime power.
const leftLimit = (x) => psiLeft(Math.ceil(x - 1e-9));             // ψ(x⁻) = Σ_{m<x} Λ(m)
const rightLimit = (x) => psiLeft(Math.floor(x + 1e-9) + 1);       // ψ(x⁺) = Σ_{m≤x} Λ(m)
const midLimit = (x) => (leftLimit(x) + rightLimit(x)) / 2;
/** A ψ₀ label's first line as terms [coefficient, relation], each c·Σ_{n<x} Λ(n) or c·Σ_{n≤x} Λ(n) with c ∈ {1, ½};
    null when the line is anything else. */
function readDefinition(text) {
  const m = /^ψ₀\(x\) = (.+)$/.exec(text.split('\n')[0].replace(/\s+/g, ' ').trim());
  if (!m) return null;
  const terms = m[1].split(' + ').map((t) => /^(½ ?)?Σ_\{n ?(<|≤) ?x\} ?Λ\(n\)$/.exec(t.trim()));
  return terms.every(Boolean) ? terms.map((t) => [t[1] ? 0.5 : 1, t[2]]) : null;
}
const evalDefinition = (terms, x) => terms.reduce((sum, [k, rel]) => {
  let a = 0; for (let n = 2; n <= Math.ceil(x); n++) if (rel === '<' ? n < x : n <= x) a += lambda(n);
  return sum + k * a;
}, 0);
/** The shown stage tags that define ψ₀, flattened (`_{…}` around a subscript, a newline per <br>), each with its box in
    the label layer, plus the box the page reports for the label 'stair' and the HUD's printed ψ₀(x). */
async function stairLabel(p = page) {
  await settle(p);
  return p.evaluate(() => {
    const layer = document.querySelector('#stage .tags'), lr = layer.getBoundingClientRect();
    const flat = (el) => [...el.childNodes].map((c) => (c.nodeType === 3 ? c.textContent : c.nodeName === 'BR' ? '\n'
      : c.nodeName === 'SUB' ? `_{${c.textContent}}` : c.nodeName === 'SUP' ? `^{${c.textContent}}` : c.nodeType === 1 ? flat(c) : '')).join('');
    const shown = [...layer.querySelectorAll('.tag')].filter((t) => {
      if (t.hidden || !t.getClientRects().length) return false;
      const cs = getComputedStyle(t);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.5 && /ψ₀\s*\(x\)\s*=/.test(t.textContent);
    }).map((t) => {
      const r = t.getBoundingClientRect();
      return { text: flat(t), cyan: t.classList.contains('c-cy'), box: { x: r.left - lr.left, y: r.top - lr.top, w: r.width, h: r.height },
        inside: r.width > 1 && r.height > 1 && r.left >= lr.left - 0.5 && r.top >= lr.top - 0.5 && r.right <= lr.right + 0.5 && r.bottom <= lr.bottom + 0.5 };
    });
    const hud = /ψ₀\(x\) = ([\d.]+)/.exec(document.getElementById('hudSub').textContent);
    return { shown, placed: window.ZETA_SPECTRUM_DEBUG.state.labels.find((l) => l.key === 'stair') || null, hud: hud ? Number(hud[1]) : NaN };
  });
}
/** The one shown ψ₀ label, if it is the placed 'stair' label, cyan and wholly inside the stage. */
function theLabel(r) {
  const [t] = r.shown, P = r.placed;
  const at = !!t && !!P && Math.abs(t.box.x + t.box.w / 2 - (P.x + P.w / 2)) < 2 && Math.abs(t.box.y + t.box.h / 2 - (P.y + P.h / 2)) < 2;
  return r.shown.length === 1 && at && t.cyan && t.inside ? t : null;
}
{
  const OLD = readDefinition('ψ₀(x) = Σ_{n<x} Λ(n)');
  const PP = []; for (let n = 2; n <= 20; n++) if (lambda(n) > 0) PP.push(n);
  check(`label oracle: the left-limit form Σ_{n<x} Λ(n) misses the mean at all ${PP.length} prime powers ≤ 20 and nowhere else`,
    !!OLD && PP.every((n) => Math.abs(evalDefinition(OLD, n) - midLimit(n)) > 0.3) && [6, 10, 12, 3.5, 11.3, 19.99].every((x) => near(evalDefinition(OLD, x), midLimit(x), 1e-12)));
  const OTHER = [1.2, 1.5, 3.5, 6, 8.99, 9.01, 10, 11.3, 12, 15, 16.5, 18, 19.99, 20];
  const bad = [];
  let domain = null, firstText = null;
  for (const x of [...PP, ...OTHER]) {
    await setParams({ scene: 'powers', x, t: 3 });
    const r = await stairLabel(), t = theLabel(r), def = t && readDefinition(t.text);
    if (!t || !def) { bad.push(`x = ${x}: ${t ? `unread label ${JSON.stringify(t.text)}` : `no single placed cyan label ${JSON.stringify(r)}`}`); continue; }
    if (firstText == null) {
      firstText = t.text;
      const d = /实数\s*x\s*>\s*(\d+(?:\.\d+)?)/.exec(t.text);
      domain = d ? Number(d[1]) : null;
    }
    const want = midLimit(x), got = evalDefinition(def, x);
    if (t.text !== firstText || !near(got, want, 1e-12) || !near(r.hud, want, 5.1e-5) || !(domain != null && x > domain)) bad.push(`x = ${x}: label ${got}, HUD ${r.hud}, mean ${want}`);
  }
  check(`stair label (zh): one visible cyan formula, read and evaluated at ${PP.length} prime powers and ${OTHER.length} other x, equals the mean of the left and right limits and the HUD's ψ₀`,
    bad.length === 0, bad.slice(0, 3).join(' | '));
  check('stair label (zh): states the real domain x > 1 and the jump rule; the x slider stays inside that domain', domain === 1 && /跳点取左右极限的平均/.test(firstText || '')
    && Number(await page.getAttribute('#xval', 'min')) > domain, JSON.stringify(firstText));
  await page.click('[data-lang-set="en"]');
  const bad2 = [];
  let enText = null;
  for (const x of [2, 9, 13, 16, 6, 11.3, 20]) {
    await setParams({ scene: 'powers', x, t: 3 });
    const r = await stairLabel(), t = theLabel(r), def = t && readDefinition(t.text);
    if (!t || !def) { bad2.push(`x = ${x}: ${JSON.stringify(r)}`); continue; }
    enText = t.text;
    if (!near(evalDefinition(def, x), midLimit(x), 1e-12) || !near(r.hud, midLimit(x), 5.1e-5)) bad2.push(`x = ${x}: label ${evalDefinition(def, x)}, mean ${midLimit(x)}`);
  }
  check('stair label (en): the same formula equals the mean of the left and right limits at prime powers and elsewhere', bad2.length === 0 && enText != null
    && enText.split('\n')[0] === (firstText || '').split('\n')[0], bad2.slice(0, 3).join(' | '));
  check('stair label (en): states the real domain x > 1 and the jump rule, with no Chinese left', /real x > 1\b/.test(enText || '') && /at a jump, mean of left and right limits/.test(enText || '')
    && !/\p{Script=Han}/u.test(enText || ''), JSON.stringify(enText));
  await page.click('[data-lang-set="zh"]'); await settle(page);
}

/* ---------- controls ---------- */
await pick('domain');
s = await input('#sigma', 1.25); check('σ slider', near(s.params.sigma, 1.25, 1e-12) && s.preset === null);
s = await input('#tim', 9.5); check('t slider', near(s.params.tIm, 9.5, 1e-12));
s = await input('#terms', 30); check('N slider resizes the rail', s.params.N === 30 && near(s.max, 29, 1e-12));
checkPhasor(s, 'after the phasor sliders');
s = await input('#now', 6); check('the rail sets n = 7', s.params.n === 7);
await page.click('#sceneChips [data-scene="quartet"]'); s = await state();
check('scene chip: quartet', s.scene === 'quartet' && await page.locator('[data-scene="quartet"].grp').isVisible());
s = await input('#beta', 0.71); check('β slider moves the rail', near(s.quartet.beta, 0.71, 1e-12) && near(s.t, 0.51, 1e-12));
await page.click('#sceneChips [data-scene="powers"]'); s = await state();
s = await input('#xval', 16); check('x slider', near(s.powers.x, 16, 1e-12) && s.powers.endpoint);

/* ---------- the handles ---------- */
await page.click('#sceneChips [data-scene="phasor"]'); await setParams({ sigma: 1.6, tIm: 6, N: 48 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const h = await page.evaluate(() => window.ZETA_SPECTRUM_DEBUG.handleBox()), to = await page.evaluate(() => window.ZETA_SPECTRUM_DEBUG.dragTarget({ sigma: 1.2, tIm: 8 }));
  const cam0 = (await state()).camera;
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 10 }); await page.mouse.up();
  s = await state();
  check('handle 2^{−s}: the drag sets σ ≈ 1.2 and t ≈ 8 without turning the camera', Math.abs(s.params.sigma - 1.2) < 0.06 && Math.abs(s.params.tIm - 8) < 0.15 && JSON.stringify(s.camera) === JSON.stringify(cam0), JSON.stringify(s.params));
  check('handle → sliders follow', Math.abs(Number(await page.inputValue('#sigma')) - s.params.sigma) < 0.006 && Math.abs(Number(await page.inputValue('#tim')) - s.params.tIm) < 1e-9);
  checkPhasor(s, 'after the 2^{−s} drag');
  await page.focus('#handle'); const t0 = s.params.tIm; await page.keyboard.press('ArrowRight'); s = await state();
  check('handle keys: → raises t by 0.1', near(s.params.tIm, Math.round((t0 + 0.1) * 1000) / 1000, 1e-9));
}
await page.click('#sceneChips [data-scene="quartet"]'); await setParams({ beta: 0.3 });
{
  const h = await page.evaluate(() => window.ZETA_SPECTRUM_DEBUG.handleBox()), to = await page.evaluate(() => window.ZETA_SPECTRUM_DEBUG.dragTarget({ beta: 0.62 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  s = await state();
  check('handle β: the drag moves the root to β ≈ 0.62, rail and slider follow', Math.abs(s.quartet.beta - 0.62) < 0.02 && near(s.t, s.quartet.beta - 0.2, 1e-12) && Math.abs(Number(await page.inputValue('#beta')) - s.quartet.beta) < 0.0006);
  checkQuartet(s, 'after the β drag');
}
await page.click('#sceneChips [data-scene="powers"]'); await setParams({ x: 5, t: 10 });
{
  // x = 5 → 13.5 passes the prime powers 7, 8, 9, 11 and 13: the stair under the handle jumps five times on the way,
  // while the target stays at the stair height of x = 5
  const h = await page.evaluate(() => window.ZETA_SPECTRUM_DEBUG.handleBox()), to = await page.evaluate(() => window.ZETA_SPECTRUM_DEBUG.dragTarget({ x: 13.5 }));
  const cam0 = (await state()).camera;
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  s = await state();
  check(`handle x: the drag moves x to ≈ 13.5 across ${jumpsBetween(5, 13.5)} prime-power jumps`, Math.abs(s.powers.x - 13.5) < 0.2 && jumpsBetween(5, 13.5) === 5, `${s.powers.x}`);
  check('handle x: the drag leaves the camera alone', JSON.stringify(s.camera) === JSON.stringify(cam0));
  await page.focus('#handle'); await page.keyboard.press('ArrowUp'); const x1 = (await state()).powers.x;
  check('handle keys: ↑ moves x by 1', near(x1, Math.min(20, Math.round((s.powers.x + 1) * 100) / 100), 1e-9));
  checkPowers(await state(), 'after the x drag');
}
{
  // one press, then waypoints on the visible stair itself (each at its own height ψ₀(x)), up and back down across
  // twenty jumps: x must track every waypoint, with nothing carried over from the heights passed before
  await setParams({ x: 2.5 });
  const way = [3.6, 4.4, 6.3, 8.6, 9.7, 12.2, 13.8, 16.4, 17.6, 19.4, 11.1, 7.5, 4.2];
  const read = await dragThrough(way.map((x) => ({ x, stair: true })));
  let jumps = 0; [2.5, ...way].forEach((x, i, all) => { if (i) jumps += jumpsBetween(all[i - 1], x); });
  const worst = Math.max(...read.map((x, i) => Math.abs(x - way[i])));
  check(`handle x: dragged along the stair across ${jumps} prime-power jumps, x tracks every waypoint (worst |Δx| = ${worst.toFixed(3)})`, jumps === 20 && worst < 0.1, JSON.stringify(read));
  checkPowers(await state(), 'after the stair walk');
}
{
  // orbit the camera by dragging empty canvas, then drag the handle again under the turned camera
  const o = await orbit();
  check('orbit (stair): dragging empty canvas turns the camera', turned(o), o ? JSON.stringify([o.before.camera, o.after.camera]) : 'no empty canvas point');
  check('orbit (stair): no parameter and no card changes', sameParams(o));
  if (o) checkPowers(o.after, 'after the orbit');
  check('orbit (stair): the handle is re-projected onto the stair point', (await handleOff({ x: o ? o.after.params.x : 4.2, stair: true })) < 1.5);
  const cam = (await state()).camera;
  let read = await dragThrough([{ x: 14.6 }]);
  check(`orbit then drag: x ≈ 14.6 across ${jumpsBetween(4.2, 14.6)} jumps, target at the old stair height`, Math.abs(read[0] - 14.6) < 0.1 && jumpsBetween(4.2, 14.6) === 6, JSON.stringify(read));
  read = await dragThrough([{ x: 6.4, stair: true }, { x: 18.3, stair: true }]);
  check('orbit then drag: x tracks stair points 6.4 and 18.3 under the turned camera', Math.abs(read[0] - 6.4) < 0.1 && Math.abs(read[1] - 18.3) < 0.1, JSON.stringify(read));
  s = await state();
  check('orbit then drag: the handle drags leave the turned camera alone', JSON.stringify(s.camera) === JSON.stringify(cam));
  checkPowers(s, 'after the orbit and the drags');
}

/* ---------- playback and drawer ---------- */
await page.locator('body').click({ position: { x: 4, y: 4 } });
await setParams({ t: 0 });
await page.keyboard.press('Space');
check('Space plays the rail', await until(page, () => { const d = window.ZETA_SPECTRUM_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#infoBtn');
check('drawer: not a proof in both languages; DLMF 25.2/27.4.E5/27.5/25.10/25.16, Davenport ch. 17, §22.2 and §22.4 linked', await page.evaluate(() => {
  const d = document.getElementById('drawer'), hrefs = [...d.querySelectorAll('a')].map((a) => a.getAttribute('href'));
  return !d.hidden && /不是证明/.test(d.textContent) && /not a proof/.test(d.textContent)
    && ['https://dlmf.nist.gov/25.2', 'https://dlmf.nist.gov/27.4.E5', 'https://dlmf.nist.gov/27.5', 'https://dlmf.nist.gov/25.10', 'https://dlmf.nist.gov/25.16'].every((u) => hrefs.includes(u))
    && /Davenport/.test(d.textContent) && /Ch\. 17/.test(d.textContent) && /only the definition and the asymptotics of ψ/.test(d.textContent)
    && hrefs.includes('../../zh/ch22-s02-dirichlet-euler-identity.html#sec-ch22-2') && hrefs.includes('../../en/ch22-s02-dirichlet-euler-identity.html#sec-ch22-2')
    && hrefs.includes('../../zh/ch22-s04-critical-line-and-rh.html#sec-ch22-4-1') && hrefs.includes('../../en/ch22-s04-critical-line-and-rh.html#sec-ch22-4-1')
    && !/any finite N they are two different numbers/.test(d.textContent);
}));
await page.keyboard.press('Escape');

/* ---------- the stills the chapter prints ---------- */
for (const lang of ['zh', 'en']) {
  let p = await openStill(T, BOOK, ID, 'domain', lang); let x = await p.evaluate(() => window.ZETA_SPECTRUM_DEBUG.state);
  check(`still domain (${lang}): all 48 terms, σ = 1.6, Euler product drawn`, x.preset === 'domain' && x.params.n === 48 && x.phasor.eulerDrawn);
  checkPhasor(x, `still domain (${lang})`);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'partial', lang); x = await p.evaluate(() => window.ZETA_SPECTRUM_DEBUG.state);
  check(`still partial (${lang}): σ = ½, no Euler product`, x.preset === 'partial' && x.params.sigma === 0.5 && !x.phasor.eulerDrawn && x.params.n === 48);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'powers', lang); x = await p.evaluate(() => window.ZETA_SPECTRUM_DEBUG.state);
  check(`still powers (${lang}): x = 9, K = 10`, x.preset === 'powers' && x.powers.x === 9 && x.powers.K === 10);
  checkPowers(x, `still powers (${lang})`);
  await p.context().close();
}

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
