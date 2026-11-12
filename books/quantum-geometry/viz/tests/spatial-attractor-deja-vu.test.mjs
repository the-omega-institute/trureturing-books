// Browser regression suite for ORTHO//ATTRACTOR (books/quantum-geometry/viz/spatial-attractor-deja-vu/).
//   node books/quantum-geometry/viz/tests/spatial-attractor-deja-vu.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.ATTRACTOR_DEBUG and checks it against independent computations written here: the
// Lorenz system integrated with its own Runge–Kutta code, the divergence by finite differences, the contraction of a
// tiny tetrahedron carried by four orbits, the largest Lyapunov exponent by the two-orbit method of Benettin, the
// characteristic polynomial of the Jacobian at C₊ and C₋ by Faddeev–LeVerrier with its roots by Durand–Kerner, and the
// unit tangents at each return recomputed by integrating both rounds on their own over the last 5 time units.
import { session, stageFirstChecks, settle, until, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'spatial-attractor-deja-vu';
const T = await session();
const { check } = T;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;
const SIG = 10, BETA = 8 / 3;
const f = ([x, y, z], rho) => [SIG * (y - x), x * (rho - z) - y, x * y - BETA * z];
const add = (p, k, s) => p.map((v, i) => v + s * k[i]);
const step = (p, h, rho) => { const a = f(p, rho), b = f(add(p, a, h / 2), rho), c = f(add(p, b, h / 2), rho), d = f(add(p, c, h), rho); return p.map((v, i) => v + (h / 6) * (a[i] + 2 * b[i] + 2 * c[i] + d[i])); };
const run = (p, n, rho, h = 0.01) => { for (let i = 0; i < n; i++) p = step(p, h, rho); return p; };
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.ATTRACTOR_DEBUG.state); };
const seek = async (t) => { await D((v) => window.ATTRACTOR_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };

/* ---------- two rounds ---------- */
let s = await state();
check('opens on BUTTERFLY: ρ = 28, both rounds drawn to t = 40', s.preset === 'butterfly' && s.scene === 'rounds' && s.rho === 28 && s.seed === 0 && s.t === 40 && !s.playing);
check('the two starts are far apart', dist(s.starts[0], s.starts[1]) > 40, String(dist(s.starts[0], s.starts[1])));
let orbitOK = true, orbitBad = '';
for (const k of [0, 1]) { let p = s.starts[k]; for (const i of [100, 400, 900, 1500]) { p = run(s.starts[k], i, 28); const q = await D(([a, b]) => window.ATTRACTOR_DEBUG.point(a, b), [k, i]); if (dist(p, q) > 1e-5) { orbitOK = false; orbitBad = JSON.stringify([k, i, p, q]); } } }
check('the page’s orbits agree with an independent Runge–Kutta integration (up to t = 15)', orbitOK, orbitBad);
let long = run([3, -4, 20], 3000, 28), nearest = 1e9; for (let i = 0; i < 40000; i++) { long = step(long, 0.01, 28); nearest = Math.min(nearest, dist(long, s.ruin)); }
check('the ruin lies on the attractor: an unrelated long orbit comes within 0.3 of it', nearest < 0.3, String(nearest));
let visitsOK = true, visitBad = '';
for (const k of [0, 1]) for (const v of s.visits[k]) {
  const i = Math.round(v.t / 0.01), [a, b, c] = await D(([kk, ii]) => [ii - 1, ii, ii + 1].map((j) => window.ATTRACTOR_DEBUG.point(kk, j)), [k, i]);
  const g = f(b, 28), n = Math.hypot(...g), dir = g.map((x) => x / n);
  if (!(dist(b, s.ruin) < s.eps && near(dist(b, s.ruin), v.d, 1e-9) && dist(b, s.ruin) <= dist(a, s.ruin) && dist(b, s.ruin) < dist(c, s.ruin) && dist(dir, v.dir) < 1e-9)) { visitsOK = false; visitBad = JSON.stringify([k, v.t]); }
}
check(`every recorded passage (${s.visits[0].length} and ${s.visits[1].length}) is a closest approach within ε of the ruin, with the direction of the flow there`, visitsOK && s.visits[0].length >= 3 && s.visits[1].length >= 3, visitBad);
check('both rounds have passed by the ruin several times and the counts on the page say so', s.counts[0] === s.visits[0].length && s.counts[1] === s.visits[1].length && (await page.textContent('#ro1')).trim() === String(s.counts[0]));
// the latest return, chosen here on its own: over all pairs of passages (one per round) whose points are < ε apart,
// the one whose later time is greatest, then whose earlier time is greatest
const unitF = (x) => { const g = f(x, 28), n = Math.hypot(...g); return g.map((v) => v / n); };
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
async function expectedReturn(st, rho = 28) {
  // a chaotic orbit amplifies rounding (λ₁ ≈ 0.9), so each passage point is re-integrated here over the last 5 time
  // units from the page’s point at that earlier time (from the start itself when the passage is earlier than that)
  const P = [[], []]; for (const k of [0, 1]) for (const v of st.visits[k]) if (v.t <= st.t + 1e-9) { const i = Math.round(v.t / 0.01), j = Math.max(0, i - 500), x0 = j ? await D(([kk, jj]) => window.ATTRACTOR_DEBUG.point(kk, jj), [k, j]) : st.starts[k]; P[k].push({ t: v.t, x: run(x0, i - j, rho) }); }
  let best = null; for (const a of P[0]) for (const b of P[1]) { const sep = dist(a.x, b.x), hi = Math.max(a.t, b.t), lo = Math.min(a.t, b.t); if (sep < st.eps && (!best || hi > best.hi + 1e-9 || (Math.abs(hi - best.hi) < 1e-9 && lo > best.lo + 1e-9))) best = { a, b, sep, hi, lo }; }
  return best;
}
const want = await expectedReturn(s);
check('the return is the latest pair of passages, one per round, whose points are less than ε apart (found here on its own)', want && s.ret && near(s.ret.ta, want.a.t) && near(s.ret.tb, want.b.t) && near(s.ret.sep, want.sep, 1e-5) && s.ret.sep < s.eps, JSON.stringify([s.ret, want && [want.a.t, want.b.t, want.sep]]));
const cosInd = want && dot3(unitF(want.a.x), unitF(want.b.x));
check('cos δθ = v̂₁·v̂₂ of the unit tangents at the return, with both orbits re-integrated here by RK4, is close to 1', want && near(s.cos, cosInd, 1e-6) && s.cos > 0.97 && near(s.angle, Math.acos(s.cos) * 180 / Math.PI, 1e-6), JSON.stringify([s.cos, cosInd]));
check('the readouts show cos δθ and the distance of the two points of the return, below ε', (await page.textContent('#roKey')).trim() === s.cos.toFixed(4) && (await page.textContent('#ro5')).includes(s.ret.sep.toFixed(3)) && (await page.textContent('#ro5')).includes('< ε = 2') && /重返/.test(await page.textContent('#roL5')));
check('the evidence beside the rounds marks cos δθ as NUM and its déjà-vu reading as MODEL', await D(() => { const v = (sel) => [...document.querySelectorAll(sel)].some((e) => !e.hidden && e.dataset.scenes === 'rounds'); return v('#readouts .lean.num') && v('#readouts .lean.model'); }));

/* ---------- the two non-zero equilibria ---------- */
// Faddeev–LeVerrier: det(λI − J) = λ³ + c₁λ² + c₂λ + c₃; roots by Durand–Kerner in complex arithmetic
const mm = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((t, _, k) => t + A[i][k] * B[k][j], 0)));
const charPoly = (J) => { const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; let M = I, c = [1]; for (let k = 1; k <= 3; k++) { const JM = mm(J, M), ck = -(JM[0][0] + JM[1][1] + JM[2][2]) / k; c.push(ck); M = JM.map((r, i) => r.map((v, j) => v + (i === j ? ck : 0))); } return c; };
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const roots = (c) => { let z = [[0.4, 0.9], [-0.65, 0.72], [0.3, -1.1]].map(([x, y]) => [x * 20, y * 20]); const ev = (x) => c.reduce((acc, ci) => [cmul(acc, x)[0] + ci, cmul(acc, x)[1]], [0, 0]); for (let it = 0; it < 500; it++) z = z.map((zi, i) => { let den = [1, 0]; z.forEach((zj, j) => { if (j !== i) den = cmul(den, [zi[0] - zj[0], zi[1] - zj[1]]); }); const d = cdiv(ev(zi), den); return [zi[0] - d[0], zi[1] - d[1]]; }); return z; };
const jacobian = ([x, y, z], rho) => [[-SIG, SIG, 0], [rho - z, -1, -x], [y, x, -BETA]];
for (const rho of [28, 14]) {
  if (rho === 14) { await page.click('#rhoChips [data-rho="14"]'); }
  const q = await state(), r = Math.sqrt(BETA * (rho - 1)), byName = Object.fromEntries(q.equilibria.map((e) => [e.name, e.p]));
  check(`ρ = ${rho}: C₊ = (+√(β(ρ−1)), +√(β(ρ−1)), ρ−1) and C₋ = (−√(β(ρ−1)), −√(β(ρ−1)), ρ−1), signs paired, both labelled on the stage`,
    q.rho === rho && byName['C₊'] && byName['C₋'] && dist(byName['C₊'], [r, r, rho - 1]) < 1e-12 && dist(byName['C₋'], [-r, -r, rho - 1]) < 1e-12 && byName['C₊'][0] > 0 && byName['C₊'][1] > 0 && byName['C₋'][0] < 0 && byName['C₋'][1] < 0 && q.labels.includes('C₊') && q.labels.includes('C₋'), JSON.stringify([q.equilibria, q.labels]));
  check(`ρ = ${rho}: the vector field vanishes at C₊ and C₋`, [byName['C₊'], byName['C₋']].every((p) => f(p, rho).every((v) => Math.abs(v) < 1e-11)));
  let ok = true, bad = ''; const pageEig = q.eig.map((e) => [e.re, e.im]);
  for (const p of [byName['C₊'], byName['C₋']]) {
    const c = charPoly(jacobian(p, rho)), z = roots(c), real = z.filter((v) => Math.abs(v[1]) < 1e-7), cplx = z.filter((v) => Math.abs(v[1]) >= 1e-7);
    // the page’s roots (Cardano) match these (Durand–Kerner), as a multiset
    const matched = z.every((v) => pageEig.some((w) => Math.hypot(v[0] - w[0], v[1] - w[1]) < 1e-6));
    const shape = rho === 28 ? real.length === 1 && real[0][0] < 0 && cplx.length === 2 && cplx.every((v) => v[0] > 0) && Math.abs(cplx[0][1] + cplx[1][1]) < 1e-7 : z.every((v) => v[0] < 0);
    if (!matched || !shape) { ok = false; bad = JSON.stringify([c, z, pageEig]); }
  }
  check(rho === 28 ? 'ρ = 28: the Jacobian at C₊ and C₋ has one negative real eigenvalue and a complex pair with positive real part (unstable saddle-foci)' : 'ρ = 14: all three eigenvalues at C₊ and C₋ have negative real part (stable)', ok && (rho === 28 ? q.unstable && q.focus : !q.unstable), bad);
}
await page.click('#rhoChips [data-rho="28"]'); await settle(page);
let allCos = 1; for (const a of s.visits[0]) for (const b of s.visits[1]) allCos = Math.min(allCos, a.dir[0] * b.dir[0] + a.dir[1] * b.dir[1] + a.dir[2] * b.dir[2]);
check('every pair of passages, one from each round, is nearly parallel (cos > 0.9)', allCos > 0.9, String(allCos));
let distinct = true; for (const a of s.visits[0]) for (const b of s.visits[1]) { const pa = await D(([k, i]) => window.ATTRACTOR_DEBUG.point(k, i), [0, Math.round(a.t / 0.01)]), pb = await D(([k, i]) => window.ATTRACTOR_DEBUG.point(k, i), [1, Math.round(b.t / 0.01)]); if (dist(pa, pb) < 1e-6) distinct = false; }
check('the arcs do not coincide: no passage of one round goes through the same point as a passage of the other', distinct);
check('the two rounds are out of step at the end', s.gap > 1, String(s.gap));
await pick('return'); s = await state();
check('RETURN: stopped at t = 22 with both rounds past the ruin', near(s.t, 22) && s.counts[0] >= 1 && s.counts[1] >= 1 && s.cos > 0.97 && /方向夹角/.test(await page.textContent('#hudSub')));
s = await seek(0.5); check('before either round has passed, no inner product is shown', s.cos === null && (await page.textContent('#roKey')).trim() === '—');
await pick('forget'); const sf = await seek(40);
check('FORGET: other starts (seed 3), the same parameters, and again both rounds pass by the ruin', sf.seed === 3 && sf.rho === 28 && dist(sf.starts[0], s.starts[0]) > 1 && sf.counts[0] >= 1 && sf.counts[1] >= 1 && sf.cos > 0.9, JSON.stringify([sf.counts, sf.cos]));
const wf = await expectedReturn(sf);
check('FORGET: the return and its cos δθ agree with the independent recomputation for these starts too', wf && sf.ret && near(sf.ret.ta, wf.a.t) && near(sf.ret.tb, wf.b.t) && near(sf.cos, dot3(unitF(wf.a.x), unitF(wf.b.x)), 1e-6), JSON.stringify([sf.ret, wf && [wf.a.t, wf.b.t]]));
check('after forgetting, both rounds are back inside the box of the attractor', sf.now.every((p) => Math.abs(p[0]) < sf.half && Math.abs(p[1]) < sf.half));
await page.click('#forgetBtn'); await settle(page); s = await state();
check('the forget button draws new starts and plays the round from the beginning', s.seed === 4 && s.preset === null && await until(page, () => { const d = window.ATTRACTOR_DEBUG.state; return d.playing || d.t > 0; }));

/* ---------- contraction ---------- */
let divOK = true; for (const p of [[1, 2, 3], [-8, 7, 30], [12, -3, 41]]) { const h = 1e-5, d = [0, 1, 2].reduce((t, i) => { const a = p.slice(), b = p.slice(); a[i] += h; b[i] -= h; return t + (f(a, 28)[i] - f(b, 28)[i]) / (2 * h); }, 0); if (!near(d, -41 / 3, 1e-6)) divOK = false; }
check('the divergence of the Lorenz field is −41/3 everywhere (finite differences)', divOK && near(s.div, -41 / 3, 1e-12));
await pick('shrink'); s = await seek(0.6);
check('SHRINK: at t = 0.6 the volume factor is e^(−41·0.6/3)', s.scene === 'shrink' && near(s.exact, Math.exp(-41 * 0.6 / 3), 1e-12));
let detOK = true; for (const t of [0.1, 0.5, 1, 1.5, 2]) { const q = await seek(t); if (Math.abs(q.det / Math.exp(-41 * t / 3) - 1) > 2e-3) detOK = false; }
check('the determinant of the tangent map follows e^(−41t/3) to within two parts in a thousand, up to t = 2', detOK);
const vol = (a, b, c, d) => { const u = b.map((v, i) => v - a[i]), v = c.map((x, i) => x - a[i]), w = d.map((x, i) => x - a[i]); return Math.abs(u[0] * (v[1] * w[2] - v[2] * w[1]) - u[1] * (v[0] * w[2] - v[2] * w[0]) + u[2] * (v[0] * w[1] - v[1] * w[0])) / 6; };
const base = [2, 3, 20], e = 1e-5, tet = [base, [base[0] + e, base[1], base[2]], [base[0], base[1] + e, base[2]], [base[0], base[1], base[2] + e]], after = tet.map((p) => run(p, 20, 28, 0.005));
check('a tiny tetrahedron carried by four independent orbits shrinks by e^(−41·0.1/3) in t = 0.1', Math.abs(vol(...after) / vol(...tet) / Math.exp(-41 * 0.1 / 3) - 1) < 1e-3, String(vol(...after) / vol(...tet)));
const c0 = await D(() => window.ATTRACTOR_DEBUG.cloudPoint(7, 0)), c1 = await D(() => window.ATTRACTOR_DEBUG.cloudPoint(7, 25));
check('the points of the cloud follow the same system (one of them, to t = 0.5)', dist(run(c0, 50, 28), c1) < 1e-6);
s = await seek(2);
check('at t = 2 about 10⁻¹² of the volume is left and the cloud has lost nearly all its thickness', near(s.t, 2) && s.exact < 2e-12 && s.exact > 1e-12 && s.thickness < 0.12, JSON.stringify([s.exact, s.thickness]));
check('the card SHEET is gone (it was cited nowhere)', (await D(() => document.querySelectorAll('[data-preset="sheet"]').length)) === 0 && (await D(() => document.querySelectorAll('#presets [data-preset]').length)) === 7);

/* ---------- dimension ---------- */
await pick('dimension'); s = await state();
// Benettin with two orbits: follow a neighbour at distance d0, renormalize every 0.1, average the logs
let p = run([1, 1, 1], 3000, 28), qn = [p[0] + 1e-8, p[1], p[2]], acc = 0; const TT = 300;
for (let i = 0; i < TT * 10; i++) { p = run(p, 10, 28); qn = run(qn, 10, 28); const d = dist(p, qn); acc += Math.log(d / 1e-8); qn = p.map((v, k) => v + (qn[k] - v) * 1e-8 / d); }
const lam1 = acc / TT;
check('DIMENSION: the greatest exponent on the page agrees with a two-orbit estimate made here', s.scene === 'dimension' && Math.abs(s.lyap[0] - lam1) < 0.06 && lam1 > 0.85 && lam1 < 0.96, JSON.stringify([s.lyap[0], lam1]));
check('the three exponents add up to −41/3, the middle one is zero and the least is about −14.57', near(s.sum, -41 / 3, 0.01) && Math.abs(s.lyap[1]) < 0.03 && Math.abs(s.lyap[2] + 14.57) < 0.06, JSON.stringify(s.lyap));
check('the Kaplan–Yorke estimate is 2 + λ₁/|λ₃| ≈ 2.06, between a surface and a solid', near(s.dky, 2 + (s.lyap[0] + (Math.abs(s.lyap[1]) < 0.02 ? 0 : s.lyap[1])) / Math.abs(s.lyap[2]), 1e-9) && s.dky > 2.05 && s.dky < 2.075 && (await page.textContent('#roKey')).startsWith('2.06'), String(s.dky));
await page.click('#rhoChips [data-rho="14"]'); s = await state();
check('ρ = 14: all three exponents are negative and the estimate is 0, a point', s.rho === 14 && s.lyap.every((v) => v < -0.1) && s.dky === 0 && near(s.sum, -41 / 3, 0.01) && /不动点/.test(await page.textContent('#roKeySub')));
await page.click('#rhoChips [data-rho="160"]'); s = await state();
check('ρ = 160: the greatest exponent is zero and the estimate is 1, a closed loop', s.rho === 160 && Math.abs(s.lyap[0]) < 0.02 && s.lyap[1] < -0.5 && s.dky === 1 && /闭合的环/.test(await page.textContent('#roKeySub')), JSON.stringify(s.lyap));

/* ---------- other parameters ---------- */
await pick('fixed'); s = await seek(40);
const r14 = Math.sqrt(BETA * 13), fps = [[r14, r14, 13], [-r14, -r14, 13]];
check('FIXED: at ρ = 14 each round ends in one of the two fixed points (±√(β(ρ−1)), ±√(β(ρ−1)), ρ−1)', s.rho === 14 && s.now.every((q) => Math.min(dist(q, fps[0]), dist(q, fps[1])) < 1e-3) && f(fps[0], 14).every((v) => Math.abs(v) < 1e-12), JSON.stringify(s.now));
await pick('cycle'); s = await seek(40);
let loopGap = 1e9; for (let i = 3500; i <= 4000; i++) { const q = await D((ii) => window.ATTRACTOR_DEBUG.point(0, ii), i); loopGap = Math.min(loopGap, dist(q, s.now[1])); }
check('CYCLE: at ρ = 160 the second round ends on the loop the first one is tracing', s.rho === 160 && loopGap < 1.5, String(loopGap));

/* ---------- camera, keyboard, language ---------- */
await pick('butterfly'); await seek(40);
const box = await page.$eval('#stage', (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
const shot0 = await D(() => document.getElementById('cv').toDataURL().length);
await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] + 140, box[1] + 30, { steps: 5 }); await page.mouse.up(); await settle(page);
check('dragging the stage turns the attractor (the picture changes, the card stays)', (await D(() => document.getElementById('cv').toDataURL().length)) !== shot0 && (await state()).preset === 'butterfly');
await page.click('body', { position: { x: 5, y: 5 } });
for (const [key, sc] of [['2', 'shrink'], ['3', 'dimension'], ['1', 'rounds']]) { await page.keyboard.press(key); check(`key ${key} switches to the scene ${sc}`, (await state()).scene === sc); }
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); check('Home and → step the rail by one unit of time', near((await state()).t, 1));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => { const d = window.ATTRACTOR_DEBUG.state; return d.playing && d.t > 1; })); await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
check('the page cites no Lean theorem and says so', (await D(() => document.querySelectorAll('a[data-lean-gid]').length)) === 0 && /不引用任何 Lean 定理/.test(await page.textContent('#evidence')));
check('no green tick on the page: its own checks are numbers, not Lean', (await D(() => document.querySelectorAll('.okmark, .c-ok').length)) === 0);
check('Tucker’s theorem and the Kaplan–Yorke formula are marked ARGUED, literature not formalized here', await D(() => { const t = [...document.querySelectorAll('.lean.argued')].map((e) => e.textContent).join(' '); return /Tucker 1999/.test(t) && /Kaplan &? ?Yorke 1979|Kaplan & Yorke 1979/.test(t) && /文献结果，未在本书形式化/.test(t); }));
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const sc of ['rounds', 'shrink', 'dimension']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 60); const left = await cjkLeftovers(page); check(`English: no Chinese left in the scene ${sc} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
