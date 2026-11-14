// Browser regression suite for ORTHO//PYTHAGORAS (books/quantum-geometry/viz/pythagoras-number-escape/).
//   node books/quantum-geometry/viz/tests/pythagoras-number-escape.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.PYTHAGORAS_DEBUG and checks it against independent brute-force computations:
// best rational approximations, exhaustive searches for the Pell equations, two-square decompositions and point
// counts over F_p.
import { session, stageFirstChecks, settle, until as untilPage } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pythagoras-number-escape';
const T = await session();
const { check } = T;
const DS = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30, 31, 33, 34, 35, 37];
const ODD = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a < 0n ? -a : a; };
const abs = (x) => (x < 0n ? -x : x);

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.PYTHAGORAS_DEBUG.state); };
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const until = (fn) => untilPage(page, fn);
const seek = async (t) => { await page.evaluate((v) => window.PYTHAGORAS_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

/* ---------- Pell seam ---------- */
let s = await state();
check('starts on HIPPASUS: √2 at the convergent 17/12 with gap +1', s.scene === 'pell' && s.d === 2 && s.m === '17' && s.n === '12' && s.delta === '1');
check('the key readout shows the gap and that it is not 0', (await page.textContent('#roKey')).includes('+1'));
let convOk = true, seamOk = true, bestOk = true, negOk = true, minusSeen = 0;
for (let i = 0; i < DS.length; i++) {
  const d = DS[i], D = BigInt(d), root = Math.sqrt(d);
  await setRange('dsel', i);
  const list = [];
  for (let k = 0; k <= 14; k++) { s = await seek(k); list.push({ m: BigInt(s.m), n: BigInt(s.n), delta: BigInt(s.delta) }); }
  convOk = convOk && s.d === d && list[0].m === BigInt(Math.floor(root)) && list[0].n === 1n
    && list.every((q, k) => q.m * q.m - D * q.n * q.n === q.delta && gcd(q.m, q.n) === 1n && (k === 0 || abs(q.m * list[k - 1].n - list[k - 1].m * q.n) === 1n) && (k === 0 || q.n >= list[k - 1].n));
  // the gap is a nonzero integer below 2√d + 1, alternates in sign, and reaches +1
  seamOk = seamOk && list.every((q, k) => q.delta !== 0n && Number(abs(q.delta)) < 2 * root + 1 && (k === 0 || (q.delta > 0n) !== (list[k - 1].delta > 0n))) && list.some((q) => q.delta === 1n);
  // best approximation: every fraction with a smaller denominator is farther from √d (brute force for small denominators)
  for (const q of list) { const n = Number(q.n); if (n > 250) break; const err = Math.abs(Number(q.m) / n - root); for (let b = 1; b < n; b++) { const a = Math.round(root * b); if (Math.abs(a / b - root) <= err) bestOk = false; } }
  // m² − d·n² = −1: exhaustive search against the page's verdict (period parity)
  let found = null; for (let n = 1n; n <= 2000n && !found; n++) { const v = D * n * n - 1n; const r = BigInt(Math.round(Math.sqrt(Number(v)))); if (r * r === v) found = [r, n]; }
  negOk = negOk && (found ? s.negPell && BigInt(s.negPell[0]) === found[0] && BigInt(s.negPell[1]) === found[1] && s.period % 2 === 1 : s.negPell === null && s.period % 2 === 0);
  if (found) minusSeen++;
}
check('for all 23 values of d: 15 consecutive convergents (exact, coprime, unimodular steps)', convOk);
check('the gap m² − d·n² is never 0, stays below 2√d + 1, alternates in sign and reaches +1', seamOk);
check('each convergent is closer to √d than every fraction with a smaller denominator (brute force)', bestOk);
check('m² − d·n² = −1: the page agrees with an exhaustive search for every d, and with the parity of the period', negOk, `${minusSeen} of 23 solvable`);
await pick('locked'); s = await state();
check('LOCKED: d = 7 has an even period, gaps −3, +2, −3, +1, and no solution of −1', s.d === 7 && s.period === 4 && s.deltas.slice(0, 4).join() === '-3,2,-3,1' && s.negPell === null && !s.deltas.includes('-1'));
// an even period restricts the gap only among ±1: of the two values ±1 only +1 occurs, while the gap itself also takes −3 and +2
const lockedNote = await page.textContent('#roNote'), pellDrawer = await page.evaluate(() => ['zh', 'en'].map((l) => document.querySelector(`#drawer .sheet > div.${l}`).textContent));
check('LOCKED: the readout and both drawers state the even-period case as “of ±1 only +1”, not as an unrestricted “only +1”', s.deltas.slice(0, 4).some((v) => v !== '1' && v !== '-1')
  && /±1 两个值里只出现 \+1/.test(lockedNote) && /±1 两个值里只出现 \+1/.test(pellDrawer[0]) && /of the two values ±1 only \+1 occurs/.test(pellDrawer[1]) && !/只能取到 \+1/.test(pellDrawer[0]) && !/only \+1 does/.test(pellDrawer[1]) && !/只在 \+1 这一支上/.test(lockedNote), lockedNote);
await setRange('dsel', DS.indexOf(5)); s = await state();
check('d = 5: the legend names the grey rings on m² − 5n² = ±4', s.d === 5 && (await page.textContent('#legend')).includes('±4'));
{
  // the grey rings at d = 5: every (F_k, L_k) satisfies L_k² − 5F_k² = ±4 (independent recurrence)
  const fib = [0n, 1n], luc = [2n, 1n]; for (let i = 2; i < 24; i++) { fib.push(fib[i - 1] + fib[i - 2]); luc.push(luc[i - 1] + luc[i - 2]); }
  check('the (F_k, L_k) pairs drawn at d = 5 all lie on m² − 5n² = ±4', fib.every((f, i) => { const d = luc[i] * luc[i] - 5n * f * f; return d === 4n || d === -4n; }));
  check('no green Lean box for the ±4 classification: the pell scene shows a plain note instead', await page.evaluate(() => !document.querySelector('.lean a[data-lean-gid*="pell_pm_four"]') && !!document.querySelector('p.note[data-scenes="pell"]')));
}
await setRange('dsel', 0); check('other values of d do not show the ±4 legend entry', !(await page.textContent('#legend')).includes('±4'));
check('changing d leaves the experiment card', (await state()).preset === null);

/* ---------- the error along the line, for every d and every convergent (23 × 15 = 345 states) ----------
   Independent of the page twice over: the continued fraction comes from Euclid's algorithm on the rational bounds
   S/B < √d < (S + 1)/B, S = ⌊√d·B⌋, B = 10¹²⁰ (not the page's surd recurrence), and the distance |m/n − √d| from the
   fixed-point integer |m·10¹⁰⁰ − n·⌊√d·10¹⁰⁰⌋| / (n·10¹⁰⁰), exact to 10⁻¹⁰⁰ (not the page's quotient through m² − d·n²).
   Plain floating-point subtraction m/n − √d rounds 35 of these 345 nonzero errors to exactly 0; every reader-facing
   consumer (stage caption, readout, the log plot with its axis) must show the true positive value instead. */
{
  const isqrtN = (N) => { if (N < 2n) return N; let x = 1n << BigInt((N.toString(2).length >> 1) + 1); for (;;) { const y = (x + N / x) >> 1n; if (y >= x) return x; x = y; } };
  const euclid = (num, den) => { const out = []; while (den) { out.push(num / den); [num, den] = [den, num % den]; } return out; };
  const B = 10n ** 120n, FP = 10n ** 100n, DIG = 60n;
  const oracle = {};   // d → [{ m, n, delta, dist, naive }] for k = 0 … 14
  let cfDepth = Infinity, naiveZero = [];
  for (const d of DS) {
    const S = isqrtN(BigInt(d) * B * B), lo = euclid(S, B), hi = euclid(S + 1n, B);
    let j = 0; while (j < lo.length - 1 && j < hi.length - 1 && lo[j] === hi[j]) j++;
    cfDepth = Math.min(cfDepth, j);
    const Sp = isqrtN(BigInt(d) * FP * FP), rows = [];
    let h1 = 1n, h0 = lo[0], k1 = 0n, k0 = 1n;
    for (let k = 0; k <= 14; k++) {
      if (k) { [h1, h0] = [h0, lo[k] * h0 + h1]; [k1, k0] = [k0, lo[k] * k0 + k1]; }
      const num = h0 * FP - k0 * Sp, q = (num < 0n ? -num : num) * 10n ** DIG / (k0 * FP);
      const dist = parseFloat(`${q}e-${DIG}`), naive = Math.abs(Number(h0) / Number(k0) - Math.sqrt(d));
      rows.push({ m: h0, n: k0, delta: h0 * h0 - BigInt(d) * k0 * k0, dist, naive });
      if (naive === 0) naiveZero.push(`${d}:${k}`);
    }
    oracle[d] = rows;
  }
  check('independent continued fractions: the two rational bounds of √d share at least 15 partial quotients for every d', cfDepth >= 15, `shared depth ${cfDepth}`);
  const all = DS.flatMap((d) => oracle[d].map((r, k) => ({ d, k, ...r })));
  check('the oracle: 345 states, every distance |m/n − √d| finite and positive, smallest ≈ 4.17×10⁻³² (d = 37, k = 14)',
    all.length === 345 && all.every((r) => Number.isFinite(r.dist) && r.dist > 0) && Math.abs(Math.min(...all.map((r) => r.dist)) / 4.1700729653528424e-32 - 1) < 1e-12);
  const a514 = oracle[5][14];
  check('the oracle at d = 5, k = 14: 1268860318/567451585, gap −1, distance 6.9442824247610065×10⁻¹⁹',
    a514.m === 1268860318n && a514.n === 567451585n && a514.delta === -1n && Math.abs(a514.dist / 6.9442824247610065e-19 - 1) < 1e-15, String(a514.dist));
  check('the hazard is real: plain subtraction m/n − √d gives exactly 0 for 35 of the 345 nonzero errors', naiveZero.length === 35, naiveZero.join(' '));

  const SUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  const readSci = (t) => { const r = /^([0-9.]+)(?:×10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/.exec(String(t).trim()); return r ? parseFloat(r[2] ? `${r[1]}e${[...r[2]].map((c) => SUP[c]).join('')}` : r[1]) : NaN; };
  const readPow = (t) => { if (t === '1') return 0; const r = /^10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/.exec(t); return r ? Number([...r[1]].map((c) => SUP[c]).join('')) : NaN; };
  const shown = (t, v) => { const x = readSci(t); return x > 0 && Math.abs(x / v - 1) <= 0.0051; };   // three significant digits
  // record what is actually drawn on the first strip plot: paths, dots and tick labels, frame by frame
  const instrument = (pg) => pg.evaluate(() => {
    const proto = CanvasRenderingContext2D.prototype, log = (window.__plotA = { ops: [] }), on = (c) => c.canvas && c.canvas.id === 'plotA';
    const last = () => log.ops[log.ops.length - 1];
    const wrap = (name, rec) => { const f = proto[name]; proto[name] = function (...a) { if (on(this)) rec(this, a); return f.apply(this, a); }; };
    wrap('clearRect', () => { log.ops = []; });
    wrap('beginPath', (c) => log.ops.push({ kind: 'path', pts: [], arcs: [], stroke: c.strokeStyle, fill: c.fillStyle }));
    wrap('moveTo', (c, a) => { const p = last(); if (p && p.kind === 'path') p.pts.push([a[0], a[1]]); });
    wrap('lineTo', (c, a) => { const p = last(); if (p && p.kind === 'path') p.pts.push([a[0], a[1]]); });
    wrap('arc', (c, a) => { const p = last(); if (p && p.kind === 'path') { p.arcs.push([a[0], a[1], a[2]]); p.fill = c.fillStyle; } });
    wrap('fillText', (c, a) => log.ops.push({ kind: 'text', text: String(a[0]), x: a[1], y: a[2], align: c.textAlign }));
    const n = document.createElement('canvas').getContext('2d'), norm = (v) => { n.fillStyle = '#000000'; n.fillStyle = v; return n.fillStyle; };
    log.colors = { cyan: norm(TRV.palette.cyan), magenta: norm(TRV.palette.magenta) };
  });
  /** Check one drawn frame of the plot against the oracle of d at step k; returns a list of failures. */
  const plotFails = (log, d, k) => {
    const rows = oracle[d], bad = [], texts = log.ops.filter((o) => o.kind === 'text'), paths = log.ops.filter((o) => o.kind === 'path');
    const yt = texts.filter((t) => t.align === 'right').map((t) => ({ e: readPow(t.text), y: t.y })), xt = texts.filter((t) => t.align === 'center' && /^\d+$/.test(t.text)).map((t) => ({ k: Number(t.text), x: t.x }));
    const frame = paths.find((p) => p.pts.length === 3 && p.pts[0][0] === p.pts[1][0] && p.pts[1][1] === p.pts[2][1]);
    if (yt.length < 2 || yt.some((t) => !Number.isFinite(t.e)) || xt.length < 2 || !frame) return [`axes unreadable (${yt.length} y ticks, ${xt.length} x ticks)`];
    const top = frame.pts[0][1], bottom = frame.pts[1][1] - 0.5, [ya, yb] = [yt[0], yt[yt.length - 1]], [xa, xb] = [xt[0], xt[xt.length - 1]];
    const yOf = (v) => ya.y + (Math.log10(v) - ya.e) * (yb.y - ya.y) / (yb.e - ya.e), xOf = (j) => xa.x + (j - xa.k) * (xb.x - xa.x) / (xb.k - xa.k);
    const eAt = (y) => ya.e + (y - ya.y) * (yb.e - ya.e) / (yb.y - ya.y), inside = (y) => y >= top - 0.5 && y <= bottom + 0.5;
    if (!yt.some((t) => t.e === 0) || yt.some((t) => !inside(t.y)) || yt.some((t, i) => i && t.e >= yt[i - 1].e)) bad.push(`ticks ${yt.map((t) => t.e).join(',')}`);
    const line = paths.find((p) => p.stroke === log.colors.cyan && p.pts.length === 15 && !p.arcs.length);
    if (!line) bad.push('no 15-point cyan error line');
    else rows.forEach((r, j) => { const [x, y] = line.pts[j]; if (Math.abs(x - xOf(j)) > 1 || Math.abs(y - yOf(r.dist)) > 2 || !inside(y)) bad.push(`line k=${j} at y=${y.toFixed(1)}, want ${yOf(r.dist).toFixed(1)} in [${top}, ${bottom}]`); });
    const now = paths.filter((p) => p.arcs.length === 1 && p.fill === log.colors.cyan);
    if (now.length !== 1 || Math.abs(now[0].arcs[0][0] - xOf(k)) > 1 || Math.abs(now[0].arcs[0][1] - yOf(rows[k].dist)) > 2 || !inside(now[0].arcs[0][1])) bad.push(`current cyan dot ${JSON.stringify(now.map((p) => p.arcs[0]))}`);
    const gaps = paths.filter((p) => p.arcs.length === 1 && p.fill === log.colors.magenta);
    if (gaps.length !== 16 || gaps.some((p) => { const j = Math.round((p.arcs[0][0] - xa.x) / (xb.x - xa.x) * (xb.k - xa.k) + xa.k); return !(j >= 0 && j <= 14) || Math.abs(p.arcs[0][1] - yOf(Math.abs(Number(rows[j].delta)))) > 2 || !inside(p.arcs[0][1]); })) bad.push(`gap dots (${gaps.length})`);
    // the axis follows the data: the smallest error sits in the lowest fifth, not squeezed above a fixed floor or cut off below it
    const minE = Math.log10(Math.min(...rows.map((r) => r.dist))), eBottom = eAt(bottom), eTop = eAt(top);
    if (!(eBottom <= minE && (minE - eBottom) / (eTop - eBottom) <= 0.2 && eTop >= Math.log10(Math.max(...rows.map((r) => Math.abs(Number(r.delta))))))) bad.push(`range 10^${eBottom.toFixed(2)} … 10^${eTop.toFixed(2)} for smallest error 10^${minE.toFixed(2)}`);
    return bad;
  };
  for (const lang of ['zh', 'en']) {
    const pg = await T.newPage(); await T.goto(BOOK, ID, `?lang=${lang}`, pg); await settle(pg); await instrument(pg);
    const st = async () => { await settle(pg); return pg.evaluate(() => window.PYTHAGORAS_DEBUG.state); };
    let cfSame = true, exactGap = true, probeOk = true, hudOk = true, roOk = true, plotOk = true, zeroShown = true; const fails = [], probeWorst = { rel: 0, at: '' };
    for (let i = 0; i < DS.length; i++) {
      const d = DS[i];
      await pg.evaluate((v) => { const el = document.getElementById('dsel'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, i); await settle(pg);
      for (let k = 0; k <= 14; k++) {
        await pg.evaluate((v) => window.PYTHAGORAS_DEBUG.seek(v), k); const s = await st(), r = oracle[d][k];
        cfSame = cfSame && s.d === d && s.step === k && BigInt(s.m) === r.m && BigInt(s.n) === r.n;
        exactGap = exactGap && s.delta === String(r.delta) && s.delta !== '0';
        const rel = Math.abs(s.err / r.dist - 1);
        if (rel > probeWorst.rel || !Number.isFinite(rel)) Object.assign(probeWorst, { rel, at: `${d}:${k}` });
        probeOk = probeOk && Number.isFinite(s.err) && s.err > 0 && rel <= 1e-15 && s.errs.length === 15 && s.errs[k] === s.err && s.errs.every((e, j) => e > 0 && Math.abs(e / oracle[d][j].dist - 1) <= 1e-15);
        const hud = await pg.textContent('#hudSub'), hv = (lang === 'zh' ? /沿线量差 (\S+?)，/ : /^Convergent \d+: (\S+) off along the line/).exec(hud), ro = await pg.textContent('#ro2');
        if (!hv || !shown(hv[1], r.dist)) { hudOk = false; fails.push(`HUD ${d}:${k} “${hud}” vs ${r.dist}`); }
        if (!shown(ro, r.dist)) { roOk = false; fails.push(`readout ${d}:${k} “${ro}” vs ${r.dist}`); }
        if (r.naive === 0) zeroShown = zeroShown && !!hv && readSci(hv[1]) > 0 && readSci(ro) > 0;
        const pf = plotFails(await pg.evaluate(() => window.__plotA), d, k);
        if (pf.length) { plotOk = false; fails.push(`plot ${d}:${k}: ${pf.slice(0, 2).join('; ')}`); }
      }
    }
    if (lang === 'zh') {
      check('all 345 states: the page\'s convergents m/n equal the independent continued fraction', cfSame);
      check('all 345 states: the exact gap m² − d·n² is kept as an integer record, never 0', exactGap);
      check('all 345 states: the page\'s error |m/n − √d| is finite, positive and within 10⁻¹⁵ (relative) of the high-precision distance', probeOk, `worst ${probeWorst.rel.toExponential(2)} at ${probeWorst.at}`);
    }
    check(`${lang}: the stage caption shows the true nonzero error along the line in all 345 states (three digits)`, hudOk, fails.filter((f) => f.startsWith('HUD')).slice(0, 3).join(' | '));
    check(`${lang}: the readout “error on the line” shows the true nonzero error in all 345 states`, roOk, fails.filter((f) => f.startsWith('readout')).slice(0, 3).join(' | '));
    check(`${lang}: the 35 states that plain subtraction rounds to 0 read a positive error on the stage and in the readout`, zeroShown);
    check(`${lang}: the log plot draws every error and gap of the current d at its true height, inside an axis read off the data, in all 345 states`, plotOk, fails.filter((f) => f.startsWith('plot')).slice(0, 3).join(' | '));
    if (lang === 'zh') {
      await pg.evaluate((v) => { const el = document.getElementById('dsel'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, DS.indexOf(5)); await settle(pg);
      await pg.evaluate(() => window.PYTHAGORAS_DEBUG.seek(14)); await settle(pg);
      check('d = 5, k = 14: the stage caption and the readout read 6.94×10⁻¹⁹, not 0', (await pg.textContent('#hudSub')).includes('沿线量差 6.94×10⁻¹⁹') && (await pg.textContent('#ro2')).trim() === '6.94×10⁻¹⁹');
    }
    await pg.close();
  }
}

/* ---------- line primes and plane primes ---------- */
await pick('five'); s = await state();
check('PLANE-5: 5 = 1² + 2², x² ≡ −1 has the roots 2 and 3', s.scene === 'split' && s.p === 5 && s.two.join() === '1,2' && s.roots.join() === '2,3');
check('the readout gives the triangle (3, 4, 5)', (await page.textContent('#ro3')).replace(/\s/g, '') === '(3,4,5)');
let splitOk = true, tripleOk = true, pellOk = true;
for (let i = 0; i < ODD.length; i++) {
  s = await seek(i); const p = ODD[i], plane = p % 4 === 1;
  let two = null; for (let a = 1; a * a < p && !two; a += 2) { const b = Math.round(Math.sqrt(p - a * a)); if (b > 0 && a * a + b * b === p) two = [a, b]; }
  const roots = []; for (let x = 1; x < p; x++) if ((x * x + 1) % p === 0) roots.push(x);
  splitOk = splitOk && s.p === p && !!two === plane && (plane ? s.two && s.two.join() === two.join() && s.two[0] % 2 === 1 : s.two === null) && s.roots.join() === roots.join() && (roots.length > 0) === plane;
  if (plane) { const [a, b] = two, u = Math.abs(a * a - b * b), v = 2 * a * b; tripleOk = tripleOk && u * u + v * v === p * p && (await page.textContent('#ro3')).replace(/\s/g, '') === `(${u},${v},${p})`; }
  pellOk = pellOk && (plane ? s.negPell && BigInt(s.negPell[0]) ** 2n - BigInt(p) * BigInt(s.negPell[1]) ** 2n === -1n : s.negPell === null);
}
check('for the 24 odd primes up to 97: a² + b² = p and a root of −1 exist exactly when p ≡ 1 (mod 4)', splitOk);
check('each plane prime gives the integer right triangle (|a² − b²|, 2ab, p)', tripleOk);
check('m² − p·n² = −1 has a solution exactly for the plane primes', pellOk);
// the Hilbert angle θ of the lattice point (A, B) and the Bloch polar angle 2θ of the squared triangle
let angOk = true, angText = true;
for (let i = 0; i < ODD.length; i++) {
  const p = ODD[i]; if (p % 4 !== 1) continue;
  s = await seek(i);
  let A = 0, B = 0; for (let x = 1; x * x < p; x++) for (let y = 1; y <= x; y++) if (x * x + y * y === p) { A = x; B = y; }
  const cosT = A / Math.sqrt(p), sinT = B / Math.sqrt(p), bloch = 2 * Math.acos(cosT);
  angOk = angOk && s.angles && s.angles.A === A && s.angles.B === B && Math.abs(cosT ** 2 + sinT ** 2 - 1) < 1e-12
    && Math.abs(s.angles.theta - Math.acos(cosT) * 180 / Math.PI) < 1e-9 && Math.abs(s.angles.bloch - bloch * 180 / Math.PI) < 1e-9
    && Math.abs(Math.cos(bloch) - (A * A - B * B) / p) < 1e-12 && Math.abs(Math.sin(bloch) - 2 * A * B / p) < 1e-12;
  const t = await page.textContent('#ro5');
  angText = angText && t.includes((Math.acos(cosT) * 180 / Math.PI).toFixed(2)) && t.includes((bloch * 180 / Math.PI).toFixed(2));
}
check('plane primes: θ of (A, B) obeys cos²θ + sin²θ = 1, and the squared triangle over p is the Bloch vector (sin 2θ, 0, cos 2θ)', angOk);
check('the readout names both the Hilbert angle θ and the Bloch polar angle 2θ', angText);
check('the readout note keeps the two angles apart', /θ_Bloch = 2θ/.test(await page.textContent('#roNote')) || (await state()).angles === null);
const drawerAngles = await page.evaluate(() => ['zh', 'en'].map((l) => document.querySelector(`#drawer .sheet > div.${l}`).textContent));
check('the theory drawer separates the Hilbert angle θ from the Bloch angle 2θ in both languages', drawerAngles.every((t) => t.includes('Bloch') && t.includes('2θ') && t.includes('cos²θ + sin²θ')));
await pick('seven'); s = await state();
check('LINE-7: no two squares, no root of −1', s.p === 7 && s.two === null && s.roots.length === 0 && (await page.textContent('#roKey')).includes('≠'));

/* ---------- points mod p ---------- */
await pick('count'); s = await state();
check('COUNT-13: 8 points over F₁₃ (7 on the grid and the point at infinity), a = +6 = 2·3', s.scene === 'curve' && s.curve === 'cm' && s.p === 13 && s.count === 8 && s.npoints === 7 && s.a === 6);
check('COUNT-13: the readout names the gap aₚ, not a (the chapter\'s a is a leg of the Gaussian triangle)', (await page.textContent('#pillKey')).includes('aₚ = +6') && !/(^|[^ₚ])a = /.test(await page.textContent('#pillKey')));
const brute = (f, p) => { let n = 1; for (let x = 0; x < p; x++) for (let y = 0; y < p; y++) if ((y * y - f(x)) % p === 0) n++; return n; };
const fcm = (x) => x * x * x - x, fgen = (x) => x * x * x - x + 1;
let cmOk = true, gaussOk = true;
for (let i = 0; i < ODD.length; i++) {
  s = await seek(i); const p = ODD[i], n = brute(fcm, p), a = p + 1 - n;
  cmOk = cmOk && s.count === n && s.a === a && s.npoints === n - 1 && Math.abs(a) <= 2 * Math.sqrt(p) && Math.abs(s.cos - a / (2 * Math.sqrt(p))) < 1e-12;
  gaussOk = gaussOk && (p % 4 === 3 ? a === 0 : Math.abs(a) === 2 * s.two[0]);
}
check('y² = x³ − x: the point counts match a brute-force count for 24 primes, within Hasse\'s bound', cmOk);
check('line primes have a = 0 and plane primes |a| = 2|a₀| with a₀ the odd square', gaussOk);
await page.click('#curveChips [data-curve="gen"]'); await settle(page, 40);
let genOk = true, nonzeroOnLine = 0;
for (let i = 0; i < ODD.length; i++) { s = await seek(i); const p = ODD[i], n = brute(fgen, p), a = p + 1 - n; genOk = genOk && s.curve === 'gen' && s.count === n && s.a === a && Math.abs(a) <= 2 * Math.sqrt(p); if (p % 4 === 3 && a !== 0) nonzeroOnLine++; }
check('y² = x³ − x + 1: the point counts match a brute-force count, within Hasse\'s bound', genOk);
check('on that curve line primes are no longer pinned at 0', nonzeroOnLine > 5, `${nonzeroOnLine} line primes with a ≠ 0`);
// the ring of spins: Legendre symbols by Euler's criterion, checked against a direct count of the pairs (x, y)
const powmod = (b, e, m) => { let r = 1n, x = BigInt(b) % BigInt(m), E = BigInt(e); const M = BigInt(m); while (E > 0n) { if (E & 1n) r = r * x % M; x = x * x % M; E >>= 1n; } return r; };
const euler = (v, p) => { v = ((v % p) + p) % p; if (v === 0) return 0; return powmod(v, (p - 1) / 2, p) === 1n ? 1 : -1; };
let spinOk = true, mirrorOk = true, badOk = true, toastOk = false;
for (const [curve, f] of [['cm', fcm], ['gen', fgen]]) {
  await page.click(`#curveChips [data-curve="${curve}"]`); await settle(page);
  for (let i = 0; i < ODD.length; i++) {
    s = await seek(i); const p = ODD[i], chi = [];
    for (let x = 0; x < p; x++) chi.push(euler(f(x), p));
    const sum = chi.reduce((a, b) => a + b, 0);
    spinOk = spinOk && s.chi.join() === chi.join() && brute(f, p) === p + 1 + sum && s.count === p + 1 + sum;
    if (curve === 'cm') for (let x = 1; x < p; x++) mirrorOk = mirrorOk && chi[p - x] === (p % 4 === 3 ? -chi[x] : chi[x]);
    // bad reduction exactly where p divides the discriminant −16(4a³ + 27b²): 64 for y² = x³ − x, −368 = −2⁴·23 for y² = x³ − x + 1
    const disc = curve === 'cm' ? -16 * (4 * -1 + 0) : -16 * (4 * -1 + 27);
    const bad = disc % p === 0;
    badOk = badOk && s.bad === bad;
    if (bad) {
      const [x0] = s.singular;
      badOk = badOk && curve === 'gen' && p === 23 && disc === -368 && ((f(x0) % p) + p) % p === 0 && ((3 * x0 * x0 - 1) % p + p) % p === 0 && s.singular[1] === 0
        && (await page.textContent('#roKey')).includes('坏约化') && (await page.textContent('#roKey')).includes('−368') && (await page.textContent('#ro2')).trim() === '—';
      toastOk = (await page.textContent('#toast')).includes('−368 = −2⁴·23');
    }
  }
}
check('the ring of spins is χₚ(f(x)) by Euler\'s criterion, and #E = p + 1 + Σχ matches a direct count of (x, y), for both curves and 24 primes', spinOk);
check('on y² = x³ − x, x and −x carry opposite spins on line primes and equal spins on plane primes', mirrorOk);
check('bad reduction is flagged exactly at p = 23 for y² = x³ − x + 1 (Δ = −368), with the singular point and no cosine', badOk);
check('reaching p = 23 on that curve raises a bad-reduction notice', toastOk);
check('the stage legend colours the spins cyan, magenta and neutral, never green', await page.evaluate(() => { const l = document.getElementById('legend'); return !!l.querySelector('.sw.cy') && !!l.querySelector('.sw.mg') && !!l.querySelector('.sw.sg') && !l.querySelector('.sw.ok'); }));
// Gauss on y² = x³ − x with a odd and b even, found independently: |aₚ| = 2|a|
await page.click('#curveChips [data-curve="cm"]'); await settle(page);
let gaussOdd = true; const gaussSeen = [];
for (const p of [5, 13, 17, 29, 37, 41, 53, 61, 73, 89, 97]) {
  let a = 0; for (let x = 1; x * x < p; x += 2) { const y2 = p - x * x, y = Math.round(Math.sqrt(y2)); if (y * y === y2 && y % 2 === 0) a = x; }
  const ap = p + 1 - brute(fcm, p); s = await seek(ODD.indexOf(p));
  gaussOdd = gaussOdd && a > 0 && Math.abs(ap) === 2 * a && s.a === ap; gaussSeen.push(`${p}:${ap}`);
}
check('y² = x³ − x: |aₚ| = 2|a| with p = a² + b², a odd and b even (p = 5, 13, 17, 29, 37, 41, 53, 61, 73, 89, 97)', gaussOdd, gaussSeen.join(' '));
await page.click('#curveChips [data-curve="gen"]'); await settle(page);
let h = await page.evaluate(() => window.PYTHAGORAS_DEBUG.hist());
check('the histogram covers the 428 good primes below 3000', h && h.n === 428 && h.bins.reduce((a, b) => a + b, 0) === 428, h && String(h.n));
// second moment of the semicircle law is 1/4: bin centres give a rough check that the histogram has that shape
const second = h.bins.reduce((acc, b, i) => acc + b * (-1 + (i + 0.5) / 12) ** 2, 0) / h.n;
check('its second moment is near the semicircle value 1/4', Math.abs(second - 0.25) < 0.05, second.toFixed(3));
await pick('count'); h = await page.evaluate(() => window.PYTHAGORAS_DEBUG.hist());
check('for y² = x³ − x about half of the primes sit in the bin at 0', h.n === 429 && h.bins[12] / h.n > 0.45, `${h.bins[12]} of ${h.n}`);
await pick('sato'); s = await state();
check('SATO–TATE card switches to the curve without complex multiplication', s.curve === 'gen' && s.scene === 'curve');
{
  // the still of the SATO card: the histogram and the semicircle take the stage, as the caption describes
  const n53 = brute(fgen, 53), cos53 = (54 - n53) / (2 * Math.sqrt(53));
  check('SATO still: the histogram with the semicircle law is on the stage at p = 53 (cos θₚ = 0.137 from a brute-force count)',
    s.satoStage === true && s.p === 53 && Math.abs(s.cos - cos53) < 1e-12 && cos53.toFixed(3) === '0.137'
      && (await page.textContent('#hudBig')).includes('半圆') && (await page.textContent('#legend')).includes('半圆律') && (await page.textContent('#legend')).includes('直方图'));
  await page.click('#curveChips [data-curve="cm"]'); await settle(page); s = await state();
  check('switching the curve leaves the SATO stage', s.satoStage === false && !(await page.textContent('#legend')).includes('直方图'));
}

/* ---------- scenes, rail, keyboard ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'pell'], ['2', 'split'], ['3', 'curve']]) { await page.keyboard.press(key); check(`key ${key} opens the ${sc} scene`, (await state()).scene === sc); }
const vis = await page.evaluate(() => [...document.querySelectorAll('[data-scenes]')].map((el) => [el.dataset.scenes, !el.hidden]));
check('only the controls and evidence of the current scene are shown', vis.every(([sc, shown]) => shown === sc.split(' ').includes('curve')));
s = await seek(2); await page.keyboard.press('ArrowRight'); s = await state();
check('→ moves to the next prime', s.step === 3 && s.p === 11);
await page.keyboard.press('End'); check('End reaches p = 97', (await state()).p === 97);
await page.keyboard.press('Home'); await page.keyboard.press('Space');
check('Space plays through the primes', await until(() => { const d = window.PYTHAGORAS_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
check('the rail label names the prime', /^p \d+/.test((await page.textContent('#tau')).trim()));
await page.click('#sceneChips [data-scene="pell"]'); await settle(page, 40);
check('the scene chips switch back to the Pell seam and its 14 steps', (await state()).scene === 'pell' && (await state()).max === 14);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
