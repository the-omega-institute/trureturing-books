#!/usr/bin/env node
// Browser regression suite for omega-unification/viz/behrend-unification-lab (Playwright + Chromium):
//   node books/omega-unification/viz/tests/behrend-unification-lab.test.mjs   (or node tools/node/viz-test.mjs omega-unification)
// stageFirstChecks is the battery every stage-first page must pass, here with the lit-solid checks on the shell card.
// After it come the checks of this page: one for every control, and one for each property the page claims, against
// independent mathematics written below (never by calling the page's own functions): its own enumeration of the shell,
// a full 38 × 38 Jacobi diagonalisation and inverse iteration for the spectra and their characters, L'Huilier's
// formula for solid angles, a linear solve for the multipliers of the seventh-time certificate, and its own chord graph.
// The page is read through its read-only probe window.BUL_DEBUG (fractions are [numerator, denominator] strings).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readLock } from '../../../../tools/node/viz-common.mjs';
import { session, stageFirstChecks, stageView, settle, openStill, playsAfter, until, labelOverlaps, overflowX, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'omega-unification';
const ID = 'behrend-unification-lab';
const G1 = 14.134725141734694,
  G3 = 25.010857580145689;
const CARDS = {
  'shell-clocks': { scene: 'shell', still: G1 },
  'three-gen-gap': { scene: 'gap', still: G3 },
  'clock-bands': { scene: 'bands', still: 8 },
  'winding-ladder': { scene: 'ladder', still: 91 },
  'memory-rank': { scene: 'memory', still: 1600 }
};
const [SHELL, GAP, BANDS, LADDER, MEMORY] = Object.keys(CARDS);
const GIDS = ['D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg', 'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula'];
/** The Chinese chapters this suite reads: the six that cite the page (@citations) and ch02, ch11 that cite the GIDs. */
const ZH_READS = [
  'ch01-behrend-shell-and-frequencies.md',
  'ch02-quaternion-clocks-and-haar-zeros.md',
  'ch07-chiral-three-generations.md',
  'ch11-induced-gravity-and-dark-energy.md',
  'ch12-shared-arithmetic-clock.md',
  'ch13-winding-ladder-and-joint-vacuum.md',
  'ch14-624-channels-and-memory-rank.md',
  'ch15-unified-verdict-and-open-roadmap.md'
];
const range = (n) => Array.from({ length: n }, (_, i) => i);
const CJK = /[　-〿㐀-鿿＀-￯]/;

/* ---------- independent mathematics, written here and never calling the page ---------- */
const R = 867;
/** The positive integer points of x² + y² + z² = 867, by a plain triple loop. */
const PTS = [];
for (let x = 1; x < 30; x++) for (let y = 1; y < 30; y++) for (let z = 1; z < 30; z++) if (x * x + y * y + z * z === R) PTS.push([x, y, z]);
const key = (p) => p.join(',');
const at = new Map(PTS.map((p, i) => [key(p), i]));
const dotI = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/** det by the rule of Sarrus. */
const sarrus = (a, b, c) => a[0] * b[1] * c[2] + a[1] * b[2] * c[0] + a[2] * b[0] * c[1] - a[2] * b[1] * c[0] - a[0] * b[2] * c[1] - a[1] * b[0] * c[2];
/** θ of a chord d² on the shell of radius √867, by the half-chord sine (the page uses an arccosine). */
const arcOf = (d) => 2 * Math.asin(Math.sqrt(d / R) / 2);
const A1 = arcOf(724) - arcOf(244),
  A2 = arcOf(804) - arcOf(244);
/** |Ω| of a spherical triangle from its three sides (L'Huilier); the sign from the orientation. */
function solidAngle(a, b, c) {
  const s1 = arcOf(2 * (R - dotI(b, c))),
    s2 = arcOf(2 * (R - dotI(c, a))),
    s3 = arcOf(2 * (R - dotI(a, b))),
    s = (s1 + s2 + s3) / 2,
    t = Math.tan(s / 2) * Math.tan((s - s1) / 2) * Math.tan((s - s2) / 2) * Math.tan((s - s3) / 2);
  return Math.sign(sarrus(a, b, c)) * 4 * Math.atan(Math.sqrt(Math.max(0, t)));
}
/** Reduced fractions of big integers, for comparing exact readings. */
const gcdB = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
};
const eqF = (x, p, q) => BigInt(x[0]) * BigInt(q) === BigInt(p) * BigInt(x[1]);
const reduced = (x) => BigInt(x[1]) > 0n && gcdB(BigInt(x[0]), BigInt(x[1])) === 1n;

/** The model of the book, built here: the order of the replay repository, the edges d² ≤ 804, their link phases. */
const permsOf = (t) => [...new Map([[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(([i, j, k]) => [key([t[i], t[j], t[k]]), [t[i], t[j], t[k]]])).values()].sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
const ORDER = [...permsOf([1, 5, 29]), ...permsOf([13, 13, 23])];
const SITES = [...ORDER, ...PTS.filter((p) => !ORDER.some((q) => key(q) === key(p))).sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2])];
const N = SITES.length,
  POLE = SITES.findIndex((p) => key(p) === '17,17,17');
const EDGES = [];
for (let i = 0; i < N; i++)
  for (let j = i + 1; j < N; j++) {
    const d = 2 * (R - dotI(SITES[i], SITES[j]));
    if (d > 804) continue;
    const p = SITES[POLE],
      x = SITES[i],
      y = SITES[j],
      re = R * (R + dotI(p, x) + dotI(x, y) + dotI(y, p)),
      im = -Math.sqrt(R) * sarrus(p, x, y);
    EDGES.push({ i, j, d, arg: Math.atan2(im, re) + (d === 200 ? Math.PI : 0), spoke: i === POLE || j === POLE });
  }
/** H_q(φ₁, φ₂) as a complex 19 × 19 matrix [re, im]. */
function hamiltonian(q, f1, f2) {
  const re = range(N).map(() => new Float64Array(N)),
    im = range(N).map(() => new Float64Array(N));
  for (const e of EDGES) {
    const a = e.spoke ? 0 : q * (e.arg + (e.d === 724 ? f1 : e.d === 804 ? f2 : 0));
    re[e.i][e.i] += 1;
    re[e.j][e.j] += 1;
    re[e.i][e.j] = -Math.cos(a);
    im[e.i][e.j] = -Math.sin(a);
    re[e.j][e.i] = -Math.cos(a);
    im[e.j][e.i] = Math.sin(a);
  }
  return { re, im };
}
/** All eigenvalues of a Hermitian matrix: classical Jacobi (largest pivot first) on the 2n × 2n real embedding. */
function eigenvalues(H) {
  const n = 2 * N,
    A = range(n).map((r) => new Float64Array(n));
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      A[i][j] = A[i + N][j + N] = H.re[i][j];
      A[i + N][j] = H.im[i][j];
      A[i][j + N] = -H.im[i][j];
    }
  for (let it = 0; it < 20000; it++) {
    let p = 0,
      q = 1,
      big = 0;
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        if (Math.abs(A[i][j]) > big) {
          big = Math.abs(A[i][j]);
          p = i;
          q = j;
        }
    if (big < 1e-13) break;
    const phi = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]),
      c = Math.cos(phi),
      s = Math.sin(phi);
    for (let k = 0; k < n; k++) {
      const akp = A[k][p],
        akq = A[k][q];
      A[k][p] = c * akp - s * akq;
      A[k][q] = s * akp + c * akq;
    }
    for (let k = 0; k < n; k++) {
      const apk = A[p][k],
        aqk = A[q][k];
      A[p][k] = c * apk - s * aqk;
      A[q][k] = s * apk + c * aqk;
    }
  }
  return range(n)
    .map((k) => A[k][k])
    .sort((x, y) => x - y)
    .filter((_, k) => k % 2 === 0);
}
/** An eigenvector of H near μ, by inverse iteration with complex Gaussian elimination. */
function eigvec(H, mu) {
  let v = range(N).map((k) => [1 + k / 7, 0.3 * Math.sin(k)]);
  for (let it = 0; it < 6; it++) {
    const M = range(N).map((i) => range(N).map((j) => [H.re[i][j] - (i === j ? mu : 0), H.im[i][j]]));
    const b = v.map((x) => x.slice());
    for (let c = 0; c < N; c++) {
      let piv = c;
      for (let r = c + 1; r < N; r++) if (Math.hypot(...M[r][c]) > Math.hypot(...M[piv][c])) piv = r;
      [M[c], M[piv]] = [M[piv], M[c]];
      [b[c], b[piv]] = [b[piv], b[c]];
      const [pr, pi] = M[c][c],
        pn = pr * pr + pi * pi;
      for (let r = c + 1; r < N; r++) {
        const [ar, ai] = M[r][c],
          fr = (ar * pr + ai * pi) / pn,
          fi = (ai * pr - ar * pi) / pn;
        for (let k = c; k < N; k++) {
          const [xr, xi] = M[c][k];
          M[r][k] = [M[r][k][0] - (fr * xr - fi * xi), M[r][k][1] - (fr * xi + fi * xr)];
        }
        b[r] = [b[r][0] - (fr * b[c][0] - fi * b[c][1]), b[r][1] - (fr * b[c][1] + fi * b[c][0])];
      }
    }
    const x = range(N).map(() => [0, 0]);
    for (let r = N - 1; r >= 0; r--) {
      let [sr, si] = b[r];
      for (let k = r + 1; k < N; k++) {
        const [mr, mi] = M[r][k];
        sr -= mr * x[k][0] - mi * x[k][1];
        si -= mr * x[k][1] + mi * x[k][0];
      }
      const [pr, pi] = M[r][r],
        pn = pr * pr + pi * pi;
      x[r] = [(sr * pr + si * pi) / pn, (si * pr - sr * pi) / pn];
    }
    const nrm = Math.sqrt(x.reduce((s, [a, b2]) => s + a * a + b2 * b2, 0));
    v = x.map(([a, b2]) => [a / nrm, b2 / nrm]);
  }
  return v;
}
/** The character of an eigenvector under the cyclic shift (x, y, z) ↦ (y, z, x): ⟨v, Cv⟩, as 0, 1, 2 for 1, ω, ω². */
const SHIFT = SITES.map((p) => SITES.findIndex((q) => key(q) === key([p[1], p[2], p[0]])));
function characterOf(v) {
  let re = 0,
    im = 0;
  // (Cv)[SHIFT[k]] = v[k]: ⟨v, Cv⟩ = Σ_k conj(v[SHIFT[k]]) v[k]
  for (let k = 0; k < N; k++) {
    const [ar, ai] = v[SHIFT[k]],
      [br, bi] = v[k];
    re += ar * br + ai * bi;
    im += ar * bi - ai * br;
  }
  const ang = Math.atan2(im, re);
  return { mod: Math.hypot(re, im), j: ((Math.round((3 * ang) / (2 * Math.PI)) % 3) + 3) % 3 };
}

/* the seventh time: the certificate's multipliers by an exact linear solve (the page uses residues) */
const fr = (p, q = 1n) => {
  p = BigInt(p);
  q = BigInt(q);
  if (q < 0n) [p, q] = [-p, -q];
  const g = gcdB(p, q) || 1n;
  return [p / g, q / g];
};
const fa = (x, y) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]),
  fs_ = (x, y) => fr(x[0] * y[1] - y[0] * x[1], x[1] * y[1]),
  fm = (x, y) => fr(x[0] * y[0], x[1] * y[1]),
  fd = (x, y) => fr(x[0] * y[1], x[1] * y[0]);
const fneg0 = (x) => x[0] < 0n;
const ONE = fr(1),
  ZERO = fr(0);
const SL = [3, 8, 15, 24, 35].map((s) => fr(s));
const Dy = (y) => SL.reduce((a, s) => fm(a, fa(ONE, fm(s, y))), ONE);
const Ny = (y) => fm(fs_(ONE, y), Dy(y));
function multipliersBySolve(e, nums) {
  const nodes = nums.map((v) => fr(v, 10n ** 9n)),
    Py = (y) => nodes.reduce((a, r) => fm(a, fm(fs_(y, r), fs_(y, r))), fs_(y, e)),
    a = fr(-1, 48),
    Q = fd(Ny(a), Py(a)),
    Hy = (y) => fd(fs_(Ny(y), fm(Q, Py(y))), fa(ONE, fm(fr(48), y)));
  // H/D = c₀ + c₁(1 − y) + Σ_{j=2..6} c_j (1 − y)/(1 + (j² − 1)y) at seven points y = 1/(k + 2), solved exactly
  const ys = range(7).map((k) => fr(1, k + 2)),
    rows = ys.map((y) => [ONE, fs_(ONE, y), ...SL.map((s) => fd(fs_(ONE, y), fa(ONE, fm(s, y)))), fd(Hy(y), Dy(y))]);
  for (let c = 0; c < 7; c++) {
    const p = rows.findIndex((r, k) => k >= c && r[c][0] !== 0n);
    [rows[c], rows[p]] = [rows[p], rows[c]];
    for (let r = 0; r < 7; r++)
      if (r !== c && rows[r][c][0] !== 0n) {
        const f = fd(rows[r][c], rows[c][c]);
        rows[r] = rows[r].map((x, k) => fs_(x, fm(f, rows[c][k])));
      }
  }
  return { Q, c: rows.map((r, k) => fd(r[7], r[k])) };
}
const LOW = multipliersBySolve(ONE, [15, 1212594, 4902081]),
  UP = multipliersBySolve(ZERO, [1212564, 4902077, 997741029]);
const bound = (m, cells, upper) => m.c.slice(1).reduce((t, c, k) => fa(t, fm(c, !fneg0(c) && c[0] !== 0n ? (upper ? cells[k][1] : cells[k][0]) : upper ? cells[k][0] : cells[k][1])), m.c[0]);
const LEVELS = [
  '496526204166806104809146132915362806115122482516082300210006834237629213805746677697001',
  '494171507489744981785351311956014103521800517946248284662406570684193699469657759672828',
  '490363540191561505304286528547580650130232508108412817068335362165688288136181926052571',
  '485261478348426035025710356147107376941747088629703660696398841275842415959560345150890',
  '479060809233957382407700584728896225226649623008097105483710682086089494741280524277747',
  '471973518785576699632971905817097725166221865858123666694233207794827643188964080668909',
  '464210376851985475367065625841913378623082606729478038833802607555794041585955213462114'
].map(BigInt);
const CODES44 = [17563992027978n, 17480697584871n, 17345995515359n, 17165516473595n, 16946175576819n, 16695471801235n];
const T288 = 1n << 288n;
const XS = range(6).map((k) => fa(fr(LEVELS[k], T288), k === 5 ? fr(136090001n, 10n ** 16n) : ZERO));
const floorQ = (x) => (x[0] >= 0n ? x[0] / x[1] : -((-x[0] + x[1] - 1n) / x[1]));
function bracketAt(bits) {
  const den = 1n << BigInt(bits),
    codes = XS.map((x) => floorQ(fm(x, fr(den)))),
    cells = codes.map((n) => [fr(n, den), fr(n + 1n, den)]),
    lo = bound(LOW, cells, false),
    hi = bound(UP, cells, true),
    t35 = fr(1n << 35n);
  return { codes, lo, hi, cLo: floorQ(fm(lo, t35)), cHi: floorQ(fm(hi, t35)), rLo: Number(fs_(fm(lo, t35), fr(32071996606n))[0]) / Number(fs_(fm(lo, t35), fr(32071996606n))[1]), rHi: Number(fs_(fm(hi, t35), fr(32071996606n))[0]) / Number(fs_(fm(hi, t35), fr(32071996606n))[1]) };
}

/* the 529 triangles and their clock windings, from an adjacency matrix */
const ADJ = range(N).map(() => new Array(N).fill(null));
for (const e of EDGES) ADJ[e.i][e.j] = ADJ[e.j][e.i] = e;
const linkAngle = (i, j) => {
  // the unit-charge link from i to j: e^{i(arg + φ)} on the oriented edge i < j, the conjugate backwards
  const e = ADJ[i][j],
    s = i < j ? 1 : -1;
  return { c: e.spoke ? 0 : s * e.arg, n1: e.spoke || e.d !== 724 ? 0 : s, n2: e.spoke || e.d !== 804 ? 0 : s };
};
const TRI = [];
for (let i = 0; i < N; i++)
  for (let j = i + 1; j < N; j++)
    for (let k = j + 1; k < N; k++)
      if (ADJ[i][j] && ADJ[j][k] && ADJ[k][i]) {
        const L = [linkAngle(i, j), linkAngle(j, k), linkAngle(k, i)];
        TRI.push({ c: L[0].c + L[1].c + L[2].c, n1: L[0].n1 + L[1].n1 + L[2].n1, n2: L[0].n2 + L[1].n2 + L[2].n2 });
      }
let trace3 = 0;
for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) if (ADJ[i][j] && ADJ[j][k] && ADJ[k][i]) trace3++;
const wAtTest = (K, f1, f2) => TRI.reduce((s, T) => s + Math.cos(K * (T.c + T.n1 * f1 + T.n2 * f2)), 0) / TRI.length;

/* the chord graph */
function chordsUpTo(D) {
  const live = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (2 * (R - dotI(SITES[i], SITES[j])) <= D) live.push([i, j]);
  const seen = new Set([0]),
    stack = [0];
  while (stack.length) {
    const u = stack.pop();
    for (const [a, b] of live)
      for (const [x, y] of [
        [a, b],
        [b, a]
      ])
        if (x === u && !seen.has(y)) {
          seen.add(y);
          stack.push(y);
        }
  }
  // components by repeated search
  const left = new Set(range(N));
  let comps = 0;
  while (left.size) {
    const s0 = left.values().next().value,
      st = [s0];
    left.delete(s0);
    comps++;
    while (st.length) {
      const u = st.pop();
      for (const [a, b] of live) {
        const w = a === u ? b : b === u ? a : -1;
        if (w >= 0 && left.has(w)) {
          left.delete(w);
          st.push(w);
        }
      }
    }
  }
  return { count: live.length, comps, connected: seen.size === N };
}
/** The certified ranks transcribed from the replay README (with the monotone bounds between them). */
const RANK_TABLE = [
  [0, 38, 38],
  [12, 29, 38],
  [56, 29, 31],
  [100, 26, 31],
  [216, 26, 27],
  [224, 25, 26],
  [244, 25, 26],
  [300, 24, 26],
  [392, 24, 24],
  [512, 24, 24],
  [544, 23, 23],
  [1000, 23, 23],
  [1152, 21, 21],
  [1376, 20, 20],
  [1568, 19, 19],
  [1600, 19, 19]
];

/* ---------- the quality gate ---------- */
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: { preset: SHELL } });

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const state = async (p = page) => {
  await settle(p);
  return p.evaluate(() => window.BUL_DEBUG.state);
};
/** Move the rail to v without leaving the card (the input event of the range, as a reader's drag does). */
const rail = async (v, p = page) => {
  await p.evaluate((x) => {
    const el = document.getElementById('now');
    el.value = String(x);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    TRV.kit.flush();
  }, v);
  return state(p);
};
/** Click a card, stop its playback and put the rail on its declared still (the card stays marked). */
const pick = async (card, p = page) => {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await p.evaluate(() => TRV.kit.pause());
  return rail(CARDS[card].still, p);
};
const dial = async (id, v) => {
  await page.evaluate(
    ([el, x]) => {
      const input = document.getElementById(el);
      input.value = String(x);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    [id, v]
  );
  return state();
};
const press = async (sel) => {
  await page.locator(sel).evaluate((b) => b.click());
  return state();
};
const dragFromTo = async (from, to) => {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  return state();
};

/** The free-play note and its tour copy identify live readouts and bundled Tier-4 replay certificates. */
const idleNote = async (p, lang) => {
  const [note, tour] = await p.evaluate(() => [document.getElementById('presetNote').textContent, (document.querySelector('#tour .tour-note') || { textContent: '' }).textContent]);
  const ok =
    lang === 'zh'
      ? /^自由探索/.test(note) && !/都由脚本现算|页面上的数由脚本现算/.test(note) && /实时读数由脚本现算/.test(note) && /标注“证书”的数取自随页打包的第四层复算证书/.test(note)
      : /^Free play/.test(note) && !/every number of the page is computed|numbers of the page are computed by its script/.test(note) && /live readouts are computed by the script/.test(note) && /certified numbers come from bundled Tier-4 replay certificates/.test(note) && !CJK.test(note);
  return { ok: ok && tour === note, text: note };
};

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the shell card, parked at its still γ₁', s.preset === SHELL && s.scene === 'shell' && Math.abs(s.t - G1) < 1e-9 && !s.playing, JSON.stringify([s.preset, s.t, s.playing]));
const declared = await page.evaluate(() => [...document.querySelectorAll('[data-preset]')].map((b) => [b.dataset.preset, Number(b.dataset.still)]));
check('five cards, each declares its still', JSON.stringify(declared.map(([c]) => c)) === JSON.stringify(Object.keys(CARDS)) && declared.every(([c, v]) => Math.abs(v - CARDS[c].still) < 1e-9), JSON.stringify(declared));
const green = await page.$$eval('#basis .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen) a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid));
check('two green boxes, one for each frozen theorem of the registry', JSON.stringify(green) === JSON.stringify(GIDS), green.join(' | '));
{
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')),
    entry = registry.visualizations.find((v) => v.id === ID),
    lock = readLock().declarations,
    // only the chapters declared in dependencies.json (@citations for the card citations, ch02 and ch11 for the GIDs)
    zh = ZH_READS.map((f) => fs.readFileSync(path.join(ROOT, 'books', BOOK, 'zh', f), 'utf8')).join('\n');
  check('registry: live, the two GIDs, five chapters', !!entry && entry.status === 'live' && JSON.stringify(entry.lean.map((x) => x.gid)) === JSON.stringify(GIDS) && entry.theory.length === 5);
  check('each green GID is a theorem of the lock and is cited by a theorem environment of a Chinese chapter', GIDS.every((g) => lock[g] && lock[g].kind === 'theorem' && new RegExp(`\\{\\.(theorem|lemma|proposition|corollary)[^}]*lean="[^"]*${g.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}`).test(zh)));
  const cited = [...zh.matchAll(/\{\.viz src="behrend-unification-lab" preset="([^"]+)"/g)].map((m) => m[1]);
  check('every card a chapter cites exists on the page', cited.length >= 5 && cited.every((c) => c in CARDS), cited.join(' '));
  check('registry summaries separate the live numbers from the bundled replay certificates', !/页面上的数都由脚本现算/.test(entry.summary) && !/every number of the page is computed/.test(entry.summary_en) && /复算证书（NUM）/.test(entry.summary) && /replay certificates from trureturing-experiments \(NUM\)/.test(entry.summary_en) && !/证书[^。]*ARGUED/.test(entry.summary) && !/certificates[^.]*ARGUED/.test(entry.summary_en));
}
/* the six tiers: live script numbers and bundled replay certificates are both NUM, never ARGUED */
{
  const boxes = await page.$$eval('#basis .lean', (els) => els.map((b) => ({ id: b.id, kinds: [...b.classList].filter((c) => c !== 'lean').join(' '), label: b.querySelector('.ok').textContent, zh: b.querySelector('.zh').textContent, en: b.querySelector('.en').textContent })));
  check('evidence order: LEAN ✓, LEAN ✓, live NUM, certificate NUM, ARGUED, MODEL, OPEN', JSON.stringify(boxes.map((b) => [b.id, b.kinds, b.label])) === JSON.stringify([['', '', 'LEAN ✓'], ['', '', 'LEAN ✓'], ['basisLive', 'num', 'NUM'], ['basisCert', 'num', 'NUM'], ['', 'argued', 'ARGUED'], ['', 'model', 'MODEL'], ['', 'open', 'OPEN']]), JSON.stringify(boxes.map((b) => [b.id, b.kinds, b.label])));
  const live = boxes.find((b) => b.id === 'basisLive'), cert = boxes.find((b) => b.id === 'basisCert'), argued = boxes.find((b) => b.kinds === 'argued');
  check('the live NUM box is written by the script and points at the certificate box, not at ARGUED', /^打开页面时由脚本现算/.test(live.zh) && /^Computed by the script when the page opens/.test(live.en) && /复算证书 NUM 框/.test(live.zh) && /replay-certificate NUM box/.test(live.en) && !/ARGUED/.test(live.zh + live.en));
  check('the certificate NUM box says it is bundled from trureturing-experiments, not computed live, not frozen', /随页面打包的第四层复算证书/.test(cert.zh) && /不由本页脚本现算/.test(cert.zh) && /未在 trureturing 冻结/.test(cert.zh) && /^Bundled Tier-4 replay certificates from the trureturing-experiments/.test(cert.en) && /not computed live by the page script/.test(cert.en) && /not frozen in trureturing/.test(cert.en));
  // markers of the replay certificates: every one sits in the certificate box, in both languages, and none in ARGUED
  const MARKS = ['8.685', '23.4396%', '99.931%', '0.00208104', '32071996606', '295872666901', '226358', '4.857224', '1152', '6.0833%', '6.1691%', '9.3435%', '11431', 'ShellProjection.lean'];
  check('every replay certificate is in the NUM box (zh and en), none in ARGUED', MARKS.every((m) => cert.zh.includes(m) && cert.en.includes(m)) && MARKS.every((m) => !argued.zh.includes(m) && !argued.en.includes(m)), MARKS.filter((m) => !cert.zh.includes(m) || !cert.en.includes(m) || argued.zh.includes(m) || argued.en.includes(m)).join(' '));
  check('ARGUED keeps only literature results and hand derivations', /^文献结果/.test(argued.zh) && /Odlyzko/.test(argued.zh) && /高斯—拉道求积与矩问题的端点界/.test(argued.zh) && /手工推导/.test(argued.zh) && /^Literature results/.test(argued.en) && /Odlyzko/.test(argued.en) && /Gauss–Radau quadrature and the endpoint bounds of the moment problem/.test(argued.en) && /Derived by hand/.test(argued.en) && !/复算|证书/.test(argued.zh) && !/replay|certif/i.test(argued.en));
  const pct = (t) => (t.match(/\d+\.\d+%/g) || []).join(' ');
  check('held-out J (zh = en): actual three-window zero supports, 8, 11 and 23 zeros, the same percentages', /在实际三窗零点支撑上，留出的平均 J 亏额为 6\.0833%（八点），指定第六项时间与平均 \|Vcb\|² 后为 6\.1691%–6\.4132%（十一点）与 5\.5700%–9\.3435%（二十三点）/.test(cert.zh) && /On actual three-window zero supports the held-out deficit of the mean J is 6\.0833% \(eight zeros\), and with the sixth time and mean \|Vcb\|² fixed 6\.1691%–6\.4132% \(eleven zeros\) and 5\.5700%–9\.3435% \(twenty-three zeros\)/.test(cert.en) && pct(cert.zh) === pct(cert.en), `${pct(cert.zh)} | ${pct(cert.en)}`);
  check('ShellProjection.lean: the 9-point shell of squared radius 17', /平方半径 17（r² = 17）的九点壳/.test(cert.zh) && /9-point shell of squared radius 17 \(r² = 17\)/.test(cert.en) && !/R = 17/.test(cert.zh + cert.en));
  const lede = await page.$$eval('#drawer .lede:not(.refs)', (ps) => ps.map((p) => p.textContent).join('\n'));
  check('drawer ledes identify the live NUM box and the bundled Tier-4 certificate box', !/页面上的数由脚本现算|页面上的数都由脚本现算/.test(lede) && !/numbers of the page are computed by its script/.test(lede) && /由脚本在打开页面时现算（第一个 NUM 框）/.test(lede) && /第四层复算证书（第二个 NUM 框）/.test(lede) && /computed live by the script when the page opens \(the first NUM box\)/.test(lede) && /bundled Tier-4 replay certificates from trureturing-experiments \(the second NUM box\)/.test(lede));
  const ids = await page.evaluate(() => ['basisLive', 'basisCert'].map((id) => document.querySelectorAll(`[id="${id}"]`).length));
  check('the drawer copies of the evidence boxes drop their ids (no duplicate ids)', ids.join() === '1,1' && (await page.$$eval('#drawerEvidence .lean', (els) => els.length)) === boxes.length, ids.join());
}

/* ---------- 1. the shell ---------- */
{
  const sh = await page.evaluate(() => window.BUL_DEBUG.shell());
  const orbits = new Set(PTS.filter((p) => key(p) !== '17,17,17').map((p) => [key(p), key([p[1], p[2], p[0]]), key([p[2], p[0], p[1]])].sort().join('|')));
  check('19 positive integer points on x² + y² + z² = 867, the same as the page', PTS.length === 19 && sh.sites.length === 19 && sh.sites.every((p) => at.has(key(p))));
  check('the pole (17, 17, 17) and six cyclic orbits of three', at.has('17,17,17') && orbits.size === 6 && [...orbits].every((o) => new Set(o.split('|')).size === 3) && sh.orbits.length === 6 && key(sh.sites[sh.pole]) === '17,17,17');
  const classes = new Set();
  for (let i = 0; i < 19; i++) for (let j = i + 1; j < 19; j++) classes.add(2 * (R - dotI(PTS[i], PTS[j])));
  const short = [...classes].filter((d) => d <= 804).length;
  check('30 squared chord classes, 23 of them ≤ 804, 135 edges', classes.size === 30 && JSON.stringify([...classes].sort((a, b) => a - b)) === JSON.stringify(sh.classes) && short === 23 && sh.edges.length === 135 && EDGES.length === 135);
  check('529 triangles of the edge graph (trace A³/6)', trace3 / 6 === 529 && TRI.length === 529 && sh.triangles === 529);
  check('the clock frequencies θ₇₂₄ − θ₂₄₄ and θ₈₀₄ − θ₂₄₄ (half-chord sines)', Math.abs(sh.a1 - A1) < 1e-13 && Math.abs(sh.a2 - A2) < 1e-13, `${sh.a1} ${sh.a2}`);
  check('the link phases of the page are those of the model', sh.edges.every(([i, j, d, a]) => {
    const e = EDGES.find((x) => x.i === i && x.j === j);
    return e && e.d === d && Math.abs(Math.atan2(Math.sin(a - e.arg), Math.cos(a - e.arg))) < 1e-12;
  }));
}
s = await state();
{
  const t = s.ledger.tri,
    [a, b, c] = t.tr.map((i) => SITES[i]),
    det = sarrus(a, b, c);
  // the Gram determinant by cofactors of the integer Gram matrix, over 867³
  const G = [a, b, c].map((u) => [a, b, c].map((v) => BigInt(dotI(u, v)))),
    gram = G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
  check('shell still: the triad is the pole and the 724 clock arc (17,17,17)·(1,5,29)·(13,23,13)', JSON.stringify(t.tr.map((i) => SITES[i])) === JSON.stringify([[17, 17, 17], [1, 5, 29], [13, 23, 13]]));
  check('det G₃ = Gram determinant / 867³ = det(a, b, c)² / 867³ = 78400/2255067, reduced, ≥ 0', eqF(t.detG, gram, 867n ** 3n) && gram === BigInt(det) ** 2n && eqF(t.detG, 78400n, 2255067n) && reduced(t.detG) && BigInt(t.detG[0]) >= 0n, JSON.stringify(t.detG));
  check('1 + 2B − Σκ is the same number (detGram3 of the Lean definition)', eqF(t.gram, ...t.detG) && t.chords.join() === '544,724,68');
  check("the signed solid angle agrees with L'Huilier's formula", Math.abs(t.omega - solidAngle(a, b, c)) < 1e-9, `${t.omega} vs ${solidAngle(a, b, c)}`);
  const e = EDGES.find((x) => x.i === Math.min(t.tr[1], t.tr[2]) && x.j === Math.max(t.tr[1], t.tr[2]));
  check('the link phase of the clock edge is −Ω(pole, i, j)/2: the Bargmann phase', !!t.link && Math.abs(Math.atan2(Math.sin(e.arg + solidAngle(SITES[POLE], SITES[e.i], SITES[e.j]) / 2), Math.cos(e.arg + solidAngle(SITES[POLE], SITES[e.i], SITES[e.j]) / 2))) < 1e-9);
  check('shell still: the clocks at γ₁ are γ₁·(θ₇₂₄ − θ₂₄₄, θ₈₀₄ − θ₂₄₄) mod 2π', Math.abs(s.ledger.f1 - ((G1 * A1) % (2 * Math.PI))) < 1e-9 && Math.abs(s.ledger.f2 - ((G1 * A2) % (2 * Math.PI))) < 1e-9);
}
for (const [chip, tr] of [
  ['inner', [6, 7, 8]],
  ['mirror', [POLE, 6, 11]],
  ['clock', [POLE, 0, 7]]
]) {
  s = await press(`[data-triad="${chip}"]`);
  const t = s.ledger.tri,
    [a, b, c] = tr.map((i) => SITES[i]),
    det = sarrus(a, b, c);
  check(`triad chip ${chip}: det G₃ = det(a, b, c)²/867³ and Ω by L'Huilier`, s.preset === null && t.tr.join() === tr.join() && eqF(t.detG, BigInt(det) ** 2n, 867n ** 3n) && Math.abs(t.omega - solidAngle(a, b, c)) < 1e-9 && (chip !== 'mirror' || (det === 0 && t.detG[0] === '0')), JSON.stringify(t.detG));
}
{
  const n = await idleNote(page, 'zh');
  check('free play (zh): the note identifies live readouts and bundled Tier-4 certificates', s.preset === null && n.ok, n.text);
}
for (const hl of ['short', 'mid', 'orbits', 'clocks']) {
  s = await press(`[data-hl="${hl}"]`);
  check(`arc chip ${hl} switches the arcs`, s.hl === hl && s.scene === 'shell');
}
s = await dial('phi1', 1.5);
s = await dial('phi2', 4.25);
check('the phase dials set free clock phases', s.free && Math.abs(s.ledger.f1 - 1.5) < 1e-9 && Math.abs(s.ledger.f2 - 4.25) < 1e-9);
s = await rail(10);
check('the rail takes the clocks back to γ·(θ₇₂₄ − θ₂₄₄, θ₈₀₄ − θ₂₄₄)', !s.free && Math.abs(s.ledger.f1 - ((10 * A1) % (2 * Math.PI))) < 1e-9);
{
  // clicking an integer point puts it into the triad
  const facing = await page.evaluate(() => [...Array(19).keys()].map((i) => window.BUL_DEBUG.pointTarget(i)));
  const k = facing.findIndex((p, i) => p.depth > 0.3 && ![POLE, 0, 7].includes(i));
  await page.mouse.click(facing[k].x, facing[k].y);
  s = await state();
  check('clicking an integer point on the ball puts it into the triad', s.ledger.tri.tr.includes(k) && eqF(s.ledger.tri.detG, BigInt(sarrus(...s.ledger.tri.tr.map((i) => SITES[i]))) ** 2n, 867n ** 3n), `point ${k}: ${s.ledger.tri.tr}`);
}
s = await press('#stageAct');
check('the stage button steps the triad', s.scene === 'shell' && s.ledger.tri.tr.length === 3);

/* ---------- 2. the five-charge gap ---------- */
s = await pick(GAP);
{
  const L = s.ledger,
    f1 = (G3 * A1) % (2 * Math.PI),
    f2 = (G3 * A2) % (2 * Math.PI);
  let worst = 0,
    chars = true;
  const Q = [1, 2, -3, -4, 6];
  for (const [c, q] of Q.entries()) {
    const H = hamiltonian(q, f1, f2),
      ev = eigenvalues(H);
    worst = Math.max(worst, ...ev.map((v, k) => Math.abs(v - L.spec[c].values[k])));
    const js = [0, 1, 2].map((k) => characterOf(eigvec(H, ev[k] - 1e-7)));
    if (!(js.every((x) => Math.abs(x.mod - 1) < 1e-6) && new Set(js.map((x) => x.j)).size === 3 && js.every((x, k) => x.j === L.light[c][k].j))) chars = false;
  }
  check('γ₃ still: the 19 eigenvalues of each charge equal a full 38 × 38 Jacobi diagonalisation', worst < 1e-8, `max difference ${worst}`);
  check('the three light modes carry the characters 1, ω, ω² of the cyclic shift (inverse iteration)', chars);
  check('γ₃ still: three modes below Λ = 9 for every charge, and below T = 10 a fourth for q = −4 only', L.below.join() === '3,3,3,3,3' && L.belowT.join() === '3,3,3,4,3' && L.T === 10 && L.lambda === 9, `${L.below} · ${L.belowT}`);
}
{
  // λ₃ < 8.685 < 9.6 < λ₄ on a 12 × 12 grid of the torus, every charge, by the test's own solver
  let bad = 0,
    max3 = 0,
    min4 = 99;
  for (let a = 0; a < 12; a++)
    for (let b = 0; b < 12; b++)
      for (const q of [1, 2, -3, -4, 6]) {
        const ev = eigenvalues(hamiltonian(q, (2 * Math.PI * a) / 12 + 0.1, (2 * Math.PI * b) / 12 + 0.2));
        max3 = Math.max(max3, ev[2]);
        min4 = Math.min(min4, ev[3]);
        if (!(ev[2] < 8.685 && ev[3] > 9.6)) bad++;
      }
  const bench = await page.evaluate(() => window.BUL_DEBUG.bench());
  check('λ₃ < 8.685 < 9.6 < λ₄ on 720 phase–charge pairs; the page grid agrees', bad === 0 && bench.bad === 0 && bench.charBad === 0 && bench.max3 < 8.685 && bench.min4 > 9.6, `${max3} ${min4}`);
  check('the site-variance cut T = 10 admits a fourth mode somewhere (page grid)', bench.siteT === 10 && bench.intrude.some((n) => n > 0), JSON.stringify(bench.intrude));
}
s = await dial('lam', 8);
{
  const f1 = (G3 * A1) % (2 * Math.PI),
    f2 = (G3 * A2) % (2 * Math.PI),
    want = [1, 2, -3, -4, 6].map((q) => eigenvalues(hamiltonian(q, f1, f2)).filter((v) => v < 8).length);
  check('the Λ dial: Λ = 8 leaves the counts of the test (outside the gap)', s.preset === null && s.lambda === 8 && s.ledger.below.join() === want.join(), `${s.ledger.below} vs ${want}`);
}
{
  const from = await page.evaluate(() => window.BUL_DEBUG.handleTarget()),
    to = await page.evaluate(() => window.BUL_DEBUG.chartTarget(5.3, 9.3));
  s = await dragFromTo(from, to);
  check('dragging the amber handle moves Λ (to ≈ 9.3, inside the gap: three modes each)', Math.abs(s.lambda - 9.3) < 0.06 && s.ledger.below.join() === '3,3,3,3,3', `Λ = ${s.lambda}`);
}
s = await press('[data-charge="-4"]');
check('the charge chip q = −4 picks that column', s.charge === '-4');
s = await press('[data-cut="spectral"]');
check('the cut chip: spectral cut only', s.cut === 'spectral');
s = await press('[data-cut="compare"]');
s = await press('#stageAct');
check('the stage button steps the charge', s.charge === '6');
s = await rail(3.55);
{
  const ev = eigenvalues(hamiltonian(2, (3.55 * A1) % (2 * Math.PI), (3.55 * A2) % (2 * Math.PI)));
  check('the rail moves γ and the spectra follow (γ = 3.55, q = 2: λ₄ below 10)', Math.abs(s.ledger.spec[1].values[3] - ev[3]) < 1e-8 && ev[3] < 10 && s.ledger.belowT[1] === 4);
}

/* ---------- 3. the shared arithmetic clock ---------- */
s = await pick(BANDS);
{
  const b44 = bracketAt(44),
    b43 = bracketAt(43),
    L = s.ledger;
  check('the two certificate groups have Q < 0', fneg0(LOW.Q) && fneg0(UP.Q));
  check('44-bit codes of the 288-bit levels are the six input codes of the certificate', b44.codes.every((n, k) => n === CODES44[k]) && L.codes.every((n, k) => BigInt(n) === CODES44[k]));
  check('44 bits: both ends of the bracket fall in 32071996606 (multipliers by a linear solve)', b44.cLo === 32071996606n && b44.cHi === 32071996606n && L.cLo === '32071996606' && L.cHi === '32071996606' && Math.abs(L.rLo - b44.rLo) < 1e-9 && Math.abs(L.rHi - b44.rHi) < 1e-9, `${b44.rLo} ${b44.rHi} vs ${L.rLo} ${L.rHi}`);
  check('43 bits: the bracket crosses two integer cells', b43.cHi - b43.cLo === 1n && (await page.evaluate(() => window.BUL_DEBUG.bench())).codes43 === 2);
  const cells = XS.map((x) => [x, fa(x, fr(1n, T288))]),
    lo = bound(LOW, cells, false),
    hi = bound(UP, cells, true),
    w = Number(fs_(hi, lo)[0]) / Number(fs_(hi, lo)[1]);
  check('288-bit inputs: the bracket of F₇ is 2.140 × 10⁻¹² wide', Math.abs(w - 2.1398e-12) < 2e-16 && Math.abs(L.exact.width - w) < 1e-20, `${w} vs ${L.exact.width}`);
  check('the reference code ⌊2³⁵T₇⌋ = 32071992476, 4130 cells below', L.ref === String(LEVELS[6] >> 253n) && L.ref === '32071992476' && L.refGap === '4130');
}
{
  let worst = '';
  for (let k = 0; k <= 16; k++) {
    s = await rail(k);
    const b = bracketAt(36 + k);
    if (s.ledger.bits !== 36 + k || s.ledger.cLo !== String(b.cLo) || s.ledger.cHi !== String(b.cHi)) worst ||= `${36 + k} bits`;
  }
  check('the rail runs the input bits 36 … 52, the brackets agree', !worst, worst);
}
s = await dial('stiff', 0.05);
check('the stiffness dial: the first-order band R₀ ± S·s with S = 0.00208104', s.preset === null && Math.abs(s.ledger.band[0] - (1.0020816770805 - 0.00208104 * 0.05)) < 1e-12 && Math.abs(s.ledger.band[1] - (1.0020816771057 + 0.00208104 * 0.05)) < 1e-12);
s = await press('[data-exact="off"]');
check('the bracket chip hides the 288-bit bracket', s.exact === false);
s = await press('[data-exact="on"]');
s = await rail(8);
s = await press('#stageAct');
check('the stage button adds one bit', s.ledger.bits === 45);

/* ---------- 4. the winding ladder ---------- */
s = await pick(LADDER);
{
  const L = s.ledger,
    steps = await page.evaluate(() => window.BUL_DEBUG.steps()),
    cls = new Map();
  for (const t of TRI) cls.set(`${t.n1},${t.n2}`, (cls.get(`${t.n1},${t.n2}`) || 0) + 1);
  check('ladder still: K = 105, the top level, one vacuum for all heights', L.m === 105 && L.level === 6);
  check('the thresholds 18, 19, 21, 27, 31, 36, 105 (certificate)', steps.map((x) => x.m).join() === '18,19,21,27,31,36,105' && steps.every((x, k) => x.level === k));
  check('529 triangles by clock windings: 433 none, 39 + 39, 6 + 6, 3 + 3', L.classes.every((K) => cls.get(`${K.n1},${K.n2}`) === K.count) && cls.get('0,0') === 433 && [...cls.values()].reduce((a, b) => a + b, 0) === 529, JSON.stringify([...cls]));
  check('W₁₀₅(0, 0) = Σ_T cos(105 c_T)/529', Math.abs(L.origin - wAtTest(105, 0, 0)) < 1e-10, `${L.origin} vs ${wAtTest(105, 0, 0)}`);
  let worst = '';
  for (let k = 0; k <= 96; k += 3) {
    const t = await rail(k),
      m = 14 + k,
      want = [18, 19, 21, 27, 31, 36, 105].filter((x) => m >= x).length - 1;
    if (t.ledger.m !== m || t.ledger.level !== Math.max(0, want)) worst ||= `K = ${m}: ${t.ledger.level} vs ${want}`;
  }
  check('the rail runs K = 14 … 110, the level is the last threshold passed', !worst, worst);
}
s = await rail(10);
{
  const to = await page.evaluate(() => window.BUL_DEBUG.chartTarget(31, 4)),
    from = await page.evaluate(() => window.BUL_DEBUG.handleTarget());
  s = await dragFromTo(from, to);
  check('dragging the amber point along the ladder moves K (to 31: the reference-flavour local minimum)', s.ledger.m === 31 && s.ledger.level === 4, `K = ${s.ledger.m}`);
}
s = await press('[data-weights="monotone"]');
check('the weight chip: non-increasing weights raise the > 1/4 barrier', s.weights === 'monotone' && (await page.textContent('#roV4')).includes('1/4'));
s = await press('#stageAct');
check('the stage button jumps to the next threshold', s.ledger.m === 36);

/* ---------- 5. the memory rank ---------- */
s = await pick(MEMORY);
check('memory still: D = 1600, all 171 chords, one component, rank 19', s.ledger.D === 1600 && s.ledger.active === 171 && s.ledger.comps === 1 && s.ledger.rank.lo === 19 && s.ledger.rank.hi === 19);
{
  let worst = '';
  let prev = [99, 99];
  for (const [D, lo, hi] of RANK_TABLE) {
    const t = await rail(D),
      g = chordsUpTo(D);
    if (t.ledger.rank.lo !== lo || t.ledger.rank.hi !== hi || t.ledger.active !== g.count || t.ledger.comps !== g.comps) worst ||= `D = ${D}: [${t.ledger.rank.lo}, ${t.ledger.rank.hi}] vs [${lo}, ${hi}], ${t.ledger.active}/${g.count}, ${t.ledger.comps}/${g.comps}`;
    if (lo > prev[0] || hi > prev[1]) worst ||= `not monotone at ${D}`;
    prev = [lo, hi];
    if (t.ledger.clocks !== (D < 512 ? 9 : 10)) worst ||= `clocks at ${D}`;
  }
  check('the rank staircase: 38, [29, 31] at 56, 26–27 at 216, 25–26, 24 at 392, 23 at 544, 21, 20, 19; chords and components agree', !worst, worst);
  const first = [...new Set(range(19).flatMap((i) => range(19).map((j) => 2 * (R - dotI(SITES[i], SITES[j])))))].filter((d) => d > 0).sort((a, b) => a - b).find((d) => chordsUpTo(d).connected);
  check('the least cutoff that connects the chord graph', (await page.evaluate(() => window.BUL_DEBUG.bench())).connect === first && first === 152, String(first));
}
s = await press('[data-cutoff="544"]');
check('the cutoff chip 544: rank 23', s.ledger.D === 544 && s.ledger.rank.lo === 23 && s.preset === null);
s = await press('#stageAct');
check('the stage button jumps to the next certified cutoff', s.ledger.D === 1152 && s.ledger.rank.lo === 21);
{
  const from = await page.evaluate(() => window.BUL_DEBUG.handleTarget()),
    to = await page.evaluate(() => window.BUL_DEBUG.chartTarget(400, 25));
  s = await dragFromTo(from, to);
  check('dragging the amber cutoff moves D (to ≈ 400: rank 24)', Math.abs(s.ledger.D - 400) <= 16 && s.ledger.rank.lo === 24, `D = ${s.ledger.D}`);
}

/* ---------- keyboard, playback, labels ---------- */
s = await pick(SHELL);
await page.evaluate(() => document.activeElement && document.activeElement.blur());
check('Space plays', await playsAfter(page, () => page.keyboard.press(' '), () => window.BUL_DEBUG.state));
await page.keyboard.press(' ');
check('Space pauses', !(await state()).playing);
await page.locator('[data-speed="2"]').evaluate((b) => b.click());
check('a card plays from its start', await playsAfter(page, () => page.click(`[data-preset="${MEMORY}"]`), () => window.BUL_DEBUG.state));
check('… and parks on its still', await until(page, () => { const d = window.BUL_DEBUG.state; return !d.playing && d.t === 1600 && d.preset === 'memory-rank'; }));
await page.locator('[data-speed="1"]').evaluate((b) => b.click());
s = await pick(SHELL);
check('no stage labels on top of each other on the ball', (await labelOverlaps(page, '.stage .tag')).length === 0);
check('no sideways scrolling', (await overflowX(page)) <= 0);

/* ---------- the qualifications of the winding ladder ---------- */
const windingCopy = {
  zh: {
    certificate: [
      /18（三窗内梯度范数 > 3\.00565，无驻点）/,
      /19（三窗内首个驻点，第 295872666901 枚为鞍点）/,
      /21（三窗内首个严格局部极小，第 226358 枚）/,
      /31（三窗精确参考味局部极小）/,
      /36（权重随高度调整的三窗精确参考味全局真空）/,
      /105（固定权重跨所有高度的三窗精确参考味共同真空）/
    ],
    notes: [
      '三窗内 18 圈以内无驻点、19 圈首现鞍点、21 圈首现严格局部极小',
      '逐高度权重的 36 圈',
      '105 圈才以固定权重给出跨所有高度的三窗精确参考味共同真空'
    ],
    levels: {
      18: [0, '三窗内无驻点'],
      19: [1, '三窗内鞍点'],
      21: [2, '三窗内严格局部极小'],
      105: [6, '固定权重跨高度参考味真空']
    }
  },
  en: {
    certificate: [
      /18 \(gradient norm > 3\.00565, no critical point in the three-window domain\)/,
      /19 \(the first critical point in the three-window domain, a saddle at zero 295872666901\)/,
      /21 \(the first strict local minimum in the three-window domain, zero 226358\)/,
      /31 \(a three-window local minimum with the exact reference flavour\)/,
      /36 \(a global three-window, exact-reference-flavour vacuum with height-dependent weights\)/,
      /105 \(one global three-window, exact-reference-flavour vacuum for all heights with fixed weights\)/
    ],
    notes: [
      'inside the three-window domain, no critical point up to 18 windings, a saddle at 19 and a strict local minimum at 21',
      'height-dependent 36',
      'only at 105 do fixed weights give one global three-window, exact-reference-flavour vacuum for all heights'
    ],
    levels: {
      18: [0, 'no critical point in the three windows'],
      19: [1, 'a saddle in the three windows'],
      21: [2, 'a strict local minimum in the three windows'],
      105: [6, 'fixed-weight flavour vacuum for all heights']
    }
  }
};
const checkWindingCopy = async (p, lang) => {
  const { certificate, notes, levels } = windingCopy[lang];
  const localized = (text) => lang === 'zh' || !CJK.test(text);
  const titleSeparator = lang === 'zh' ? '：' : ': ';
  const checkCertificate = async (box, label) => {
    const text = await box.innerText();
    check(`winding ladder (${lang}): ${label} qualifies thresholds 18, 19, 21, 31, 36 and 105`,
      (await box.isVisible()) && certificate.every((pattern) => pattern.test(text)) && localized(text), text);
  };
  const checkModel = async (selector) => {
    const box = p.locator(`${selector} .lean.model .${lang}`);
    const text = await box.innerText();
    check(`winding ladder (${lang}): ${selector} states the normalized heat map`,
      (await box.isVisible()) && text.includes('W_K(φ₁, φ₂) = Σ_T cos K(c_T + n·φ) / 529') &&
      !/W_K\(φ₁,\s*φ₂\)\s*\/\s*529/.test(text) && localized(text), text);
  };
  await checkCertificate(p.locator(`#basisCert .${lang}`), 'evidence box');
  await checkModel('#basis');
  await p.locator('#infoBtn').evaluate((button) => button.click());
  await checkCertificate(p.locator('#drawer #drawerEvidence .lean.num').nth(1).locator(`.${lang}`), 'drawer certificate');
  await checkModel('#drawer #drawerEvidence');
  await p.keyboard.press('Escape');

  await pick(LADDER, p);
  for (const selector of ['#presetNote', '#tour .tour-note']) {
    const text = await p.locator(selector).textContent();
    check(`winding ladder (${lang}): ${selector} qualifies thresholds 18, 19, 21, 36 and 105`,
      notes.every((note) => text.includes(note)) && localized(text), text);
  }
  for (const k of [18, 19, 21, 105]) {
    const [level, wording] = levels[k];
    const current = await rail(k - 14, p);
    const title = await p.locator('#hudBig').innerText();
    const key = await p.locator('#roKey').innerText();
    check(`winding ladder (${lang}, K = ${k}): the stage title qualifies level ${level}`,
      current.preset === LADDER && current.ledger.m === k && current.ledger.level === level &&
      title.endsWith(`K = ${k}${titleSeparator}${wording}`) && localized(title), title);
    check(`winding ladder (${lang}, K = ${k}): the key readout qualifies level ${level}`,
      key === `${level} · ${wording}` && localized(key), key);
    const { layout, hud } = await stageView(p, '#stage');
    const overlaps = await labelOverlaps(p, '#hudBig, #hudSub, #roKey, #presetNote', 0);
    const overflow = await overflowX(p);
    check(`winding ladder (${lang}, K = ${k}): clean layout with no horizontal overflow`,
      !layout.length && !hud.length && !overlaps.length && overflow === 0, [...layout, ...hud, ...overlaps, `overflow ${overflow}px`].join(' | '));
  }
};
await checkWindingCopy(page, 'zh');

/* ---------- English: no Chinese on screen, in the drawer, in the probe-visible texts or on the canvases ---------- */
{
  const en = await T.open(BOOK, ID, '?lang=en', { viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await en.evaluate(() => {
    window.__canvasText = [];
    const orig = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function (t, ...rest) {
      window.__canvasText.push(String(t));
      return orig.call(this, t, ...rest);
    };
  });
  for (const card of Object.keys(CARDS)) {
    await en.click(`[data-preset="${card}"]`);
    await settle(en);
    await en.evaluate(() => { TRV.kit.pause(); window.__canvasText = []; TRV.kit.flush(); });
    const left = await cjkLeftovers(en),
      canvas = await en.evaluate(() => window.__canvasText.slice()),
      body = await en.evaluate(() => document.body.innerText.replace(/中/g, ''));
    check(`English (${card}): no Chinese or full-width punctuation on screen, in the readouts or on the canvases`, left.length === 0 && !canvas.some((x) => CJK.test(x)) && !CJK.test(body), [...left, ...canvas.filter((x) => CJK.test(x))].slice(0, 3).join(' | '));
  }
  {
    // leave the card through a control: the free-play note in English
    await en.locator('[data-triad="inner"]').evaluate((b) => b.click());
    await settle(en);
    const preset = await en.evaluate(() => window.BUL_DEBUG.state.preset),
      n = await idleNote(en, 'en'),
      left = await cjkLeftovers(en);
    check('free play (en): the note identifies live readouts and bundled Tier-4 certificates in English', preset === null && n.ok && left.length === 0, n.text);
  }
  await en.click('#infoBtn');
  const drawer = await en.evaluate(() => [...document.querySelectorAll('#drawer .en, #drawer .drawer-evidence .en')].map((e) => e.innerText).join('\n'));
  check('English: the drawer carries no Chinese', !CJK.test(drawer) && /not a proof/.test(drawer));
  await en.keyboard.press('Escape');
  await checkWindingCopy(en, 'en');
  await en.context().close();
}

/* ---------- the stills a chapter prints ---------- */
const CAPTIONS = {
  [SHELL]: (d) => d.scene === 'shell' && Math.abs(d.t - G1) < 1e-9 && d.ledger.tri.tr.includes(POLE) && d.hl === 'clocks',
  [GAP]: (d) => d.scene === 'gap' && Math.abs(d.t - G3) < 1e-9 && d.ledger.below.join() === '3,3,3,3,3' && d.ledger.belowT.join() === '3,3,3,4,3' && d.lambda === 9,
  [BANDS]: (d) => d.ledger.bits === 44 && d.ledger.cLo === '32071996606' && d.ledger.cHi === '32071996606' && d.ledger.ref === '32071992476',
  [LADDER]: (d) => d.ledger.m === 105 && d.ledger.level === 6,
  [MEMORY]: (d) => d.ledger.D === 1600 && d.ledger.active === 171 && d.ledger.rank.lo === 19
};
for (const [card, ok] of Object.entries(CAPTIONS))
  for (const lang of ['zh', 'en']) {
    const p = await openStill(T, BOOK, ID, card, lang),
      d = await p.evaluate(() => window.BUL_DEBUG.state);
    check(`still ${card} (${lang}): the frame carries the numbers of its note`, d.preset === card && !d.playing && ok(d), JSON.stringify([d.preset, d.t, d.scene]));
    await p.context().close();
  }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
