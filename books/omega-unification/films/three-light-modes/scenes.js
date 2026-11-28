/* Film · Three Light Modes · 每种荷三个轻模 (book omega-unification, Chapter 7). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook    the 19 positive integer points of x² + y² + z² = 867, seen down the pole (17, 17, 17): the pole and six
             orbits of the cyclic shift; the 135 pairs with squared chord d² ≤ 804 are the edges; clock edges
             d² = 724 (cyan) and 804 (magenta); five charges q ∈ {1, 2, −3, −4, 6} give five 19 × 19 spectra
             (computed here, δ = 0, as in the chapter's lab card three-gen-gap).
     gap     the 19 eigenvalues of H_q(φ₁, φ₂) for the five charges while (φ₁, φ₂) runs along a winding path of the
             torus (the path is an illustration of the sweep; the spectra on it are computed); λ₃ < 8.685 < 9.6 < λ₄
             on every sample (computed); on the whole torus and for every positive zero, δ ∈ [0, 10⁻⁸], it is the
             replay certificate ch39-all-zero-three-mode-gap.py of §7.1.1 (certificate, NUM).
     turn    (x, y, z) ↦ (y, z, x) is the rotation by 120° about the pole axis; it maps the shell, the weights and
             the phases to themselves, so H_q splits into the character blocks 1, ω, ω² of sizes 7, 6, 6, and each
             block holds exactly one mode below 9 (computed); theorem thm-ou-ch07-peter-weyl-orthonormal (LEAN):
             haarInner (evenCharPoly m) (evenCharPoly n) ≈ degreeDelta m n for all m, n.
     cut     the admissible shared ranks {1, 3, 7, 15}, widest gap → 1, equal characters → {3, 15} (certificate
             ch39-all-common-shell-ranks.py, NUM); the site-variance cut T = min_v Σ w² = 9 + (1 − δ)² from the
             (degree, softened spokes) census (10,0):3 (10,1):3 (14,0):3 (16,0):6 (18,0):3 (18,3):1, computed here
             from the edge list with three softened spokes from the pole to one degree-10 orbit (which orbit does
             not change the census).
     zeros   the two-step readouts of §7.1.2, Example ex-ou-ch07-cutoff-comparison, copied verbatim (certificates):
             #8236 max h₃ ≈ 9.2061, min h₄ ≈ 10.5855; #148341 9.4749, 10.5917; #8359 shared gap ⊇ [9, 10.19]; that T
             is the physical cut is a model assumption, and the dual-state projection drops #8359 to two charge-2
             modes (argued, MODEL).
     lattice the five-step simplex overlap kernel: three species of one chirality for (25 − 5√5)/4 < m < 7/2, smooth
             index −3 Pf(C), the shell lifted as 4D Wilson mass with index 3 × single and 16 heavy layers at index 0
             (replay certificates of §7.2.2, NUM); the tesseract is a schematic of the 4D lattice.
     rough   (I₅̄, I₁₀) = (2, 7), −I₅̄ + 2 I₁₀ = 12 ≡ 2 (mod 5) (certificate ch39-rough-overlap-index.py, the
             arithmetic computed here); frames 1–3 leave SU(4), SU(3), SU(2), four frames hold the gap (Remark
             rem-ou-ch07-three-vs-four-frames, argued); Problem prob-ou-ch07-chiral-selection (OPEN).

   On load, FILM.init rebuilds the shell, re-derives each count and checks the character-block spectra against the
   full 38 × 38 real embedding, the commutation with the shift, and the gap on a 16 × 16 grid of phases for all
   five charges; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const TL_R = 867, TL_SQR = Math.sqrt(867);
const tlSame = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const tlLex = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
const tlDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const tlDet = (a, b, c) => a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
const TL_FOUND = [];
for (let x = 0; x * x <= TL_R; x++) for (let y = 0; x * x + y * y <= TL_R; y++) {
  const r = TL_R - x * x - y * y, z = Math.round(Math.sqrt(r));
  if (z * z === r) TL_FOUND.push([x, y, z]);
}
function tlPerms(t) {
  const out = new Map();
  for (const [i, j, k] of [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]) out.set([t[i], t[j], t[k]].join(), [t[i], t[j], t[k]]);
  return [...out.values()].sort(tlLex);
}
const TL_OUTER = tlPerms([1, 5, 29]), TL_INNER = tlPerms([13, 13, 23]);
const tlIn = (L, p) => L.some(q => tlSame(q, p));
const TL_SITES = [...TL_OUTER, ...TL_INNER, ...TL_FOUND.filter(p => !tlIn(TL_OUTER, p) && !tlIn(TL_INNER, p)).sort(tlLex)];
const TL_N = TL_SITES.length;
const TL_POLE = TL_SITES.findIndex(p => tlSame(p, [17, 17, 17]));
const tlIdx = p => TL_SITES.findIndex(q => tlSame(q, p));
const TL_SHIFT = TL_SITES.map(p => tlIdx([p[1], p[2], p[0]]));
const tlSum = p => p[0] + p[1] + p[2];
const TL_ORBITS = [];
{
  const seen = new Set([TL_POLE]);
  const order = [...Array(TL_N).keys()].sort((a, b) => tlSum(TL_SITES[b]) - tlSum(TL_SITES[a]) || tlLex(TL_SITES[a], TL_SITES[b]));
  for (const i of order) { if (seen.has(i)) continue; const o = [i, TL_SHIFT[i], TL_SHIFT[TL_SHIFT[i]]]; o.forEach(k => seen.add(k)); TL_ORBITS.push(o); }
}
const tlChord = (i, j) => 2 * (TL_R - tlDot(TL_SITES[i], TL_SITES[j]));
const tlTheta = d => Math.acos(1 - d / (2 * TL_R));
function tlArg(i, j, d) {
  const p = TL_SITES[TL_POLE], x = TL_SITES[i], y = TL_SITES[j];
  return Math.atan2(-TL_SQR * tlDet(p, x, y), TL_R * (TL_R + tlDot(p, x) + tlDot(x, y) + tlDot(y, p))) + (d === 200 ? Math.PI : 0);
}
const TL_EDGES = [];
for (let i = 0; i < TL_N; i++) for (let j = i + 1; j < TL_N; j++) {
  const d = tlChord(i, j);
  if (d <= 804) TL_EDGES.push({ i, j, d, arg: tlArg(i, j, d), spoke: i === TL_POLE || j === TL_POLE, clock: d === 724 ? 1 : d === 804 ? 2 : 0 });
}
/* H_q(φ1, φ2) with spoke weight w (1 − δ): diag = Σ weights, off-diagonal −w·e^{i q (arg + φ)} */
function tlLap(q, f1, f2, w = 1) {
  const re = new Float64Array(TL_N * TL_N), im = new Float64Array(TL_N * TL_N);
  for (const e of TL_EDGES) {
    const ww = e.spoke ? w : 1, ang = e.spoke ? 0 : q * (e.arg + (e.clock === 1 ? f1 : e.clock === 2 ? f2 : 0));
    re[e.i * TL_N + e.i] += ww; re[e.j * TL_N + e.j] += ww;
    re[e.i * TL_N + e.j] = -ww * Math.cos(ang); im[e.i * TL_N + e.j] = -ww * Math.sin(ang);
    re[e.j * TL_N + e.i] = -ww * Math.cos(ang); im[e.j * TL_N + e.i] = ww * Math.sin(ang);
  }
  return { re, im };
}
function tlJacobi(a, n) {
  const A = Float64Array.from(a);
  for (let sw = 0; sw < 80; sw++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p * n + q] * A[p * n + q];
    if (off < 1e-26) break;
    for (let p = 0; p < n - 1; p++) for (let q = p + 1; q < n; q++) {
      const apq = A[p * n + q]; if (Math.abs(apq) < 1e-300) continue;
      const th = (A[q * n + q] - A[p * n + p]) / (2 * apq), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const x = A[k * n + p], y = A[k * n + q]; A[k * n + p] = c * x - s * y; A[k * n + q] = s * x + c * y; }
      for (let k = 0; k < n; k++) { const x = A[p * n + k], y = A[q * n + k]; A[p * n + k] = c * x - s * y; A[q * n + k] = s * x + c * y; }
    }
  }
  return [...Array(n).keys()].map(k => A[k * n + k]).sort((x, y) => x - y);
}
/* character bases of the cyclic shift: ω^j, j = 0, 1, 2 */
const TL_BASES = [0, 1, 2].map(j => {
  const out = j === 0 ? [[[TL_POLE, 1, 0]]] : [];
  for (const o of TL_ORBITS) out.push(o.map((s, r) => [s, Math.cos(-2 * Math.PI * j * r / 3) / Math.sqrt(3), Math.sin(-2 * Math.PI * j * r / 3) / Math.sqrt(3)]));
  return out;
});
/* the spectrum block by block: modes [{v, j}] ascending */
function tlSpectrum(q, f1, f2, w = 1) {
  const H = tlLap(q, f1, f2, w);
  const blocks = TL_BASES.map(basis => {
    const n = basis.length, m = 2 * n, M = new Float64Array(m * m);
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
      let sr = 0, si = 0;
      for (const [s, ar, ai] of basis[a]) for (const [t, br, bi] of basis[b]) {
        const hr = H.re[s * TL_N + t], hi = H.im[s * TL_N + t], xr = hr * br - hi * bi, xi = hr * bi + hi * br;
        sr += ar * xr + ai * xi; si += ar * xi - ai * xr;
      }
      M[a * m + b] = sr; M[(a + n) * m + b + n] = sr; M[(a + n) * m + b] = si; M[a * m + b + n] = -si;
    }
    return tlJacobi(M, m).filter((_, k) => k % 2 === 0);
  });
  const modes = blocks.flatMap((vals, j) => vals.map(v => ({ v, j }))).sort((x, y) => x.v - y.v);
  modes.blocks = blocks;
  return modes;
}
/* the full 19 × 19 Hermitian matrix on its 38 × 38 real embedding (independent of the character split) */
function tlSpectrumFull(q, f1, f2, w = 1) {
  const H = tlLap(q, f1, f2, w), n = TL_N, m = 2 * n, M = new Float64Array(m * m);
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
    const r = H.re[a * n + b], i = H.im[a * n + b];
    M[a * m + b] = r; M[(a + n) * m + b + n] = r; M[(a + n) * m + b] = i; M[a * m + b + n] = -i;
  }
  return tlJacobi(M, m).filter((_, k) => k % 2 === 0);
}
const TL_CHARGES = [1, 2, -3, -4, 6];

/* ======================================================================= */
/*                     precomputed sweeps and the census                     */
/* ======================================================================= */
const TL_LEAN = 'D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal';
const TL_LIGHT = 8.685, TL_HEAVY = 9.6;
/* world frame: the pole axis (1, 1, 1)/√3 points at the viewer */
const TL_E1 = [1 / Math.SQRT2, -1 / Math.SQRT2, 0], TL_E2 = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
const TL_XY = TL_SITES.map(p => [tlDot(p, TL_E1) / TL_SQR, tlDot(p, TL_E2) / TL_SQR]);
/* the illustrative sweep of the torus: a winding line (φ₁, φ₂) = 2π(5s, 8.09s) mod 2π, s ∈ [0, 1] */
const TL_NP = 240;
const tlPhase = s => [(2 * Math.PI * 5 * s) % (2 * Math.PI), (2 * Math.PI * 8.09 * s) % (2 * Math.PI)];
const TL_PATH = [];
{
  let m3 = -1, m4 = 99;
  for (let k = 0; k <= TL_NP; k++) {
    const [f1, f2] = tlPhase(k / TL_NP), specs = TL_CHARGES.map(q => tlSpectrum(q, f1, f2));
    for (const s of specs) { m3 = Math.max(m3, s[2].v); m4 = Math.min(m4, s[3].v); }
    TL_PATH.push({ f1, f2, specs, m3, m4 });
  }
}
const tlPathAt = s => TL_PATH[Math.round(clamp(s) * TL_NP)];
const TL_P0 = TL_PATH[0];
const TL_TURN = tlSpectrum(1, 0.7, 2.1);          /* the block spectra shown in scene turn: q = 1, (φ₁, φ₂) = (0.7, 2.1) */
/* degree census with three softened spokes from the pole to the orbit of (1, 5, 29) */
const TL_SOFT_ORBIT = TL_ORBITS.find(o => o.some(i => tlSame(TL_SITES[i], [1, 5, 29])));
const TL_SOFT = TL_EDGES.filter(e => e.spoke && (TL_SOFT_ORBIT.includes(e.i) || TL_SOFT_ORBIT.includes(e.j)));
const TL_DEG = [...Array(TL_N).keys()].map(i => TL_EDGES.filter(e => e.i === i || e.j === i).length);
const TL_K = [...Array(TL_N).keys()].map(i => TL_SOFT.filter(e => e.i === i || e.j === i).length);
const TL_CENSUS = (() => {
  const m = new Map();
  TL_DEG.forEach((d, i) => { const k = `${d},${TL_K[i]}`; m.set(k, (m.get(k) || 0) + 1); });
  return [...m.entries()].map(([k, n]) => { const [d, s] = k.split(',').map(Number); return { d, k: s, n }; })
    .sort((a, b) => a.d - b.d || a.k - b.k);
})();
/* Σ_u w_uv² at a site, as a function of δ */
const tlVar = (d, k, delta) => d - k + k * (1 - delta) ** 2;
const TL_MASS = [(25 - 5 * Math.sqrt(5)) / 4, 7 / 2];
const TL_ZEROS = [
  { id: '#8236', h3: 9.2061, h4: 10.5855 },
  { id: '#148341', h3: 9.4749, h4: 10.5917 },
  { id: '#8359', lo: 9, hi: 10.19 }
];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('three-light-modes film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  /* 0. the cited theorem at the pinned commit */
  const r = leanCite(TL_LEAN);
  check(r && r.kind === 'theorem', `${TL_LEAN} must be a cited theorem`);
  check((DATA.lean || []).length === 1, 'film.json cites one declaration');
  /* 1. the shell: 19 positive points, pole + 6 orbits, 135 edges, two clock families of 6 */
  check(TL_FOUND.length === 19 && TL_SITES.every(p => p.every(v => v > 0) && tlDot(p, p) === 867), '19 positive points');
  check(TL_POLE >= 0 && TL_ORBITS.length === 6 && TL_ORBITS.every(o => new Set(o).size === 3), 'pole and six orbits');
  check(TL_EDGES.length === 135, `135 edges, got ${TL_EDGES.length}`);
  check(TL_EDGES.filter(e => e.clock === 1).length === 6 && TL_EDGES.filter(e => e.clock === 2).length === 6, 'six 724 and six 804 edges');
  /* 2. the shift is a rotation by ±120° in the picture, and it fixes the matrix entry by entry */
  for (let i = 0; i < TL_N; i++) if (i !== TL_POLE) {
    const a = TL_XY[i], b = TL_XY[TL_SHIFT[i]];
    const ang = Math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
    check(Math.abs(Math.abs(ang) - 2 * Math.PI / 3) < 1e-9 && Math.abs(Math.hypot(...a) - Math.hypot(...b)) < 1e-12, `shift rotates site ${i} by 120°`);
  }
  for (const q of TL_CHARGES) {
    const H = tlLap(q, 0.7, 2.1);
    let dev = 0;
    for (let a = 0; a < TL_N; a++) for (let b = 0; b < TL_N; b++) {
      const x = TL_SHIFT[a] * TL_N + TL_SHIFT[b], y = a * TL_N + b;
      dev = Math.max(dev, Math.abs(H.re[x] - H.re[y]), Math.abs(H.im[x] - H.im[y]));
    }
    check(dev < 1e-9, `H_${q} commutes with the shift (${dev})`);
  }
  check(TL_BASES.map(b => b.length).join() === '7,6,6', 'blocks of 7, 6, 6');
  /* 3. block spectra = full spectrum; gap and one light mode per character on a grid of phases */
  const G = 16;
  let m3 = -1, m4 = 99, dmax = 0;
  for (const q of TL_CHARGES) for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
    const f1 = 2 * Math.PI * a / G, f2 = 2 * Math.PI * b / G, s = tlSpectrum(q, f1, f2);
    m3 = Math.max(m3, s[2].v); m4 = Math.min(m4, s[3].v);
    check([0, 1, 2].map(k => s[k].j).sort().join() === '0,1,2', `characters of the light modes, q = ${q}`);
    if ((a + b) % 5 === 0) { const f = tlSpectrumFull(q, f1, f2); f.forEach((v, k) => { dmax = Math.max(dmax, Math.abs(v - s[k].v)); }); }
  }
  check(dmax < 1e-9, `block spectra equal the full spectrum (${dmax})`);
  check(m3 < TL_LIGHT && m4 > TL_HEAVY, `grid gap ${m3} ${m4}`);
  for (const P of TL_PATH) check(P.m3 < TL_LIGHT && P.m4 > TL_HEAVY, 'path gap');
  check(TL_TURN.blocks.every(b => b.filter(v => v < 9).length === 1), 'one light mode per block');
  /* 4. the census, T and the mean c = tr L₀/18 */
  const want = '10,0,3|10,1,3|14,0,3|16,0,6|18,0,3|18,3,1';
  check(TL_CENSUS.map(z => `${z.d},${z.k},${z.n}`).join('|') === want, `census ${TL_CENSUS.map(z => `${z.d},${z.k},${z.n}`).join('|')}`);
  for (const delta of [0, 1e-9, 1e-8]) {
    const T = Math.min(...TL_CENSUS.map(z => tlVar(z.d, z.k, delta)));
    check(Math.abs(T - (9 + (1 - delta) ** 2)) < 1e-12, `T(${delta})`);
    const H = tlLap(1, 0, 0, 1);
    const sv = Math.min(...[...Array(TL_N).keys()].map(i => { let s = 0; for (let j = 0; j < TL_N; j++) if (j !== i) s += H.re[i * TL_N + j] ** 2 + H.im[i * TL_N + j] ** 2; return s; }));
    check(Math.abs(sv - 10) < 1e-12, 'site variance 10 at δ = 0');
  }
  const deltaMax = (23 / 25) * 2 ** -20 / 14 ** 2;
  check(9 + (1 - deltaMax) ** 2 > 9.99999999 && deltaMax < 1e-8, '9.99999999 < T < 10');
  check(TL_DEG.reduce((s, d) => s + d, 0) === 270 && 270 / 18 === 15, 'c = 15 at δ = 0');
  /* 5. the witnesses against both cuts, and the arithmetic of the rough background */
  const [z1, z2] = TL_ZEROS;
  check(z1.h3 > 9 && z1.h3 < 9.99999999 && z1.h4 > 10, '#8236 between 9 and T');
  check(z2.h3 > 9 && z2.h3 < 9.99999999 && z2.h4 > 10, '#148341 between 9 and T');
  check(Math.abs(TL_MASS[0] - 3.454915) < 1e-6 && TL_MASS[0] < 139 / 40 && 139 / 40 < TL_MASS[1], 'mass window');
  check(-2 + 2 * 7 === 12 && ((12 % 5) + 5) % 5 === 2, 'centre charge 12 ≡ 2 mod 5');
});
Object.assign(FILM.speed, { hook: 0.02, gap: 0.016, turn: 0.016, cut: 0.014, zeros: 0.016, lattice: 0.02, rough: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const tlFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const tlF = (x, d) => x.toFixed(d);
const tlMinus = s => String(s).replace(/-/g, '−');
function tlRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
/* the green chip of the cited theorem, looked up by its whole GID */
function tlLeanChip(x, y, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(TL_LEAN);
  if (!r || r.kind !== 'theorem') return;
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-1)[0], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* the shell seen down the pole: o = { cx, cy, R, a, rot (radians), edges (alpha), hi (orbit index, amber), soft } */
function tlShell(o) {
  const a = o.a; if (a <= 0.003) return;
  const rot = o.rot || 0, c = Math.cos(rot), s = Math.sin(rot);
  const P = TL_XY.map(([x, y]) => [o.cx + o.R * (x * c - y * s), o.cy + o.R * (x * s + y * c)]);
  const ea = a * (o.edges == null ? 1 : o.edges);
  if (ea > 0.003) {
    for (const e of TL_EDGES) if (!e.clock) line(P[e.i][0], P[e.i][1], P[e.j][0], P[e.j][1], C.dim, ea * (e.spoke ? 0.16 : 0.32), 1.2);
    for (const e of TL_EDGES) if (e.clock) line(P[e.i][0], P[e.i][1], P[e.j][0], P[e.j][1], e.clock === 1 ? C.cyan : C.mag, ea * 0.95, 3);
  }
  ring(o.cx, o.cy, o.R, C.dim, a * 0.25, 1.2);
  for (let i = 0; i < TL_N; i++) {
    const hi = o.hi != null && TL_ORBITS[o.hi].includes(i);
    dot(P[i][0], P[i][1], i === TL_POLE ? 15 : hi ? 15 : 11, i === TL_POLE ? 'w' : hi ? 'g' : 'c', a);
  }
  return P;
}
/* five spectra in columns: specs[c] = modes; rect (x, y, w, h); value range [lo, hi] */
function tlCols(specs, x, y, w, h, lo, hi, a, o = {}) {
  if (a <= 0.003) return;
  const Y = v => y + h - (v - lo) / (hi - lo) * h, cw = w / specs.length;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y - 4, w + 20, h + 8); ctx.clip();
  /* the shared gap band */
  const ga = a * (o.band == null ? 1 : o.band);
  if (ga > 0.003) {
    fillBox(x, Y(TL_HEAVY), w, Y(TL_LIGHT) - Y(TL_HEAVY), C.white, ga * 0.07);
    line(x, Y(TL_LIGHT), x + w, Y(TL_LIGHT), C.cyan, ga * 0.5, 1.2);
    line(x, Y(TL_HEAVY), x + w, Y(TL_HEAVY), C.white, ga * 0.4, 1.2);
  }
  if ((o.cut9 || 0) > 0.003) dashed(x, Y(9), x + w, Y(9), C.now, a * o.cut9, 2.5);
  specs.forEach((sp, ci) => {
    const cx = x + (ci + 0.5) * cw, tw2 = Math.min(84, cw * 0.62);
    sp.forEach((m, k) => {
      const yy = Y(m.v), light = k < 3;
      if (light && yy > y + h + 6) {          /* a light mode below the zoomed range: an arrow and its value */
        arrow(cx - tw2 / 2 + 8, y + h - 34, cx - tw2 / 2 + 8, y + h - 8, C.cyan, a, 2.5);
        txt(m.v.toFixed(2), cx - tw2 / 2 + 22, y + h - 12, { size: 18, fam: F.mono, w: 700, c: C.cyan, a });
        return;
      }
      if (yy < y - 6 || yy > y + h + 6) return;
      fillBox(cx - tw2 / 2, yy - 2.5, tw2, 5, light ? C.cyan : C.white, a * (light ? 1 : 0.5));
    });
  });
  ctx.restore();
  specs.forEach((_, ci) => {
    const cx = x + (ci + 0.5) * cw;
    txt(`q = ${tlMinus(TL_CHARGES[ci])}`, cx, y + h + 38, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  });
  if (o.ticks) for (const t of o.ticks) {
    const yy = Y(t); if (yy < y - 2 || yy > y + h + 2) continue;
    txt(String(t), x - 16, yy + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: t === 9 ? C.now : C.dim, a });
    line(x - 10, yy, x - 2, yy, C.dim, a, 1.5);
  }
}
function tlTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.5));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THREE LIGHT MODES', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('SHELL · SPECTRA · CHARACTERS · CUTS · LATTICE · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · NINETEEN POINTS                      */
/* ======================================================================= */
SCENES.hook = S => {
  tlTitle(S);
  const a = tlFade(S) * at(S, 0, 0.6);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'computed']]);
  const qa = at(S, 3, 0.6);
  const sa = a * (1 - 0.88 * qa);
  tlShell({ cx: 560, cy: 500, R: 300, a: sa, rot: 0.04 * S.u, edges: Q(S, 1, 'Join them', 1.2) });
  txt('view down the pole (17, 17, 17) · 沿极点俯视', 560, 832, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: sa });
  const pa = a * (1 - qa);
  panel(1000, 200, 800, 170, pa, C.cyan, 'THE SHELL · 球壳');
  txt('x² + y² + z² = 867', 1030, 285, { size: 46, fam: F.math, w: 700, c: C.white, a: pa });
  txt('19 points = 1 pole + 6 orbits × 3 · 19 个整点', 1030, 340, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: pa });
  const ea = pa * Q(S, 1, 'Join them', 0.6);
  panel(1000, 395, 800, 120, ea, C.cyan, 'EDGES · 边');
  tlRich([['135', C.white], [' edges · d² ≤ 804 · clocks ', C.dim], ['724', C.cyan], [' · ', C.dim], ['804', C.mag]], 1030, 470, { size: 28, fam: F.mono, a: ea });
  const fa = pa * Q(S, 2, 'Five hypercharges', 0.6);
  if (fa > 0.003) {
    panel(1000, 540, 800, 290, fa, C.cyan, 'FIVE SPECTRA · 五套谱 (δ = 0)');
    tlCols(TL_P0.specs, 1050, 590, 720, 170, 0, 24, fa, { band: Q(S, 2, 'three modes sit low', 0.6) });
  }
  if (qa > 0.003) {
    txt('3 low modes', W / 2, 420, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: qa, ab: 2 });
    txt('=  3 generations ?', W / 2, 530, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.white, a: qa * Q(S, 3, 'three generations', 0.5) });
    txt('三声低音 = 三代物质？', W / 2, 620, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.dim, a: qa * Q(S, 3, 'three generations', 0.5) });
  }
};

/* ======================================================================= */
/*                          scene 2 · ONE GAP, WHOLE TORUS                   */
/* ======================================================================= */
SCENES.gap = S => {
  const a = tlFade(S);
  badgeQ(S, [[0, null, 'computed']]);
  const sw = ease(clamp((S.u - phraseAt(S, 0, 'Now turn the two clocks')) / (lineAt(S, 1).e - phraseAt(S, 0, 'Now turn the two clocks'))));
  const P = tlPathAt(sw);
  const z = ease(Q(S, 1, 'Three cyan modes', 1.4));
  const lo = lerp(0, 6.6, z), hi = lerp(24, 11.6, z);
  panel(120, 190, 1120, 640, a, C.cyan, 'H_q(φ₁, φ₂) · 19 EIGENVALUES · 全部本征值 (δ = 0)');
  const ticks = z > 0.5 ? [7, TL_LIGHT, 9, TL_HEAVY, 10, 11] : [0, 5, 10, 15, 20];
  tlCols(P.specs, 230, 250, 980, 500, lo, hi, a * at(S, 0, 0.6), { band: Q(S, 1, 'Three cyan modes', 0.8), cut9: Q(S, 1, 'Three cyan modes', 0.8, 0.8), ticks });
  /* the torus of clock phases */
  const ta = a * Q(S, 0, 'Now turn the two clocks', 0.6);
  if (ta > 0.003) {
    panel(1300, 190, 500, 400, ta, C.now, 'CLOCK TORUS · 双钟环面');
    const x0 = 1380, y0 = 240, s = 300, k = Math.round(sw * TL_NP);
    box(x0, y0, s, s, C.dim, ta * 0.8, 1.2);
    for (let i = 0; i <= k; i++) { const Pi = TL_PATH[i]; dot(x0 + s * Pi.f1 / (2 * Math.PI), y0 + s - s * Pi.f2 / (2 * Math.PI), 3.2, 'c', ta * 0.55); }
    dot(x0 + s * P.f1 / (2 * Math.PI), y0 + s - s * P.f2 / (2 * Math.PI), 13, 'g', ta);
    txt('φ₁', x0 + s / 2, y0 + s + 34, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ta });
    txt('φ₂', x0 - 26, y0 + s / 2 + 8, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: ta });
    txt('2π', x0 + s, y0 + s + 34, { size: 18, fam: F.math, align: 'center', c: C.dim, a: ta });
  }
  const ra = a * Q(S, 1, 'Three cyan modes', 0.6);
  if (ra > 0.003) {
    panel(1300, 615, 500, 215, ra, C.cyan, 'COMPUTED ON THE PATH · 路径上现算');
    tlRich([['max λ₃ = ', C.white], [tlF(P.m3, 4), C.cyan], ['  < 8.685', C.dim]], 1325, 700, { size: 30, fam: F.mono, a: ra });
    tlRich([['min λ₄ = ', C.white], [tlF(P.m4, 4), C.white], ['  > 9.6', C.dim]], 1325, 760, { size: 30, fam: F.mono, a: ra });
    txt(`${TL_CHARGES.length} charges × ${Math.round(sw * TL_NP) + 1} phases`, 1325, 808, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ra });
  }
  const ca = a * Q(S, 2, 'An interval certificate', 0.6);
  if (ca > 0.003) {
    ctx.save(); ctx.globalAlpha = ca; ctx.fillStyle = 'rgba(4,10,24,0.9)'; ctx.fillRect(250, 300, 940, 250); ctx.restore();
    panel(250, 300, 940, 250, ca, C.cyan, 'REPLAY CERTIFICATE · 复算证书 · NUM');
    txt('λ₃ < 8.685 < 9 < 9.6 < λ₄', 720, 410, { size: 46, fam: F.math, w: 700, align: 'center', c: C.white, a: ca });
    txt('whole torus · every positive zero · 0 ≤ δ ≤ 10⁻⁸', 720, 465, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ca });
    txt('整张环面 · 全部正黎曼零点 · ch39-all-zero-three-mode-gap', 720, 512, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ca });
  }
};

/* ======================================================================= */
/*                          scene 3 · TURN THE COORDINATES                   */
/* ======================================================================= */
SCENES.turn = S => {
  const a = tlFade(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const g = ease(Q(S, 0, 'Cycle the coordinates', 2.6));
  const v0 = TL_XY[TL_ORBITS[0][0]], v1 = TL_XY[TL_SHIFT[TL_ORBITS[0][0]]];
  const turnAng = Math.atan2(v0[0] * v1[1] - v0[1] * v1[0], v0[0] * v1[0] + v0[1] * v1[1]);
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  tlShell({ cx: 500, cy: 480, R: 290, a, rot: g * turnAng, hi: 4 });
  txt('(x, y, z) ↦ (y, z, x)', 500, 830, { size: 30, fam: F.math, w: 700, align: 'center', c: C.now, a: a * Q(S, 0, 'Cycle the coordinates', 0.6) });
  txt(`${Math.round(g * 120)}°`, 500, 205, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * Q(S, 0, 'Cycle the coordinates', 0.6) * (1 - la) });
  /* the three character blocks */
  const ba = a * Q(S, 1, 'splits into blocks', 0.6);
  const names = ['χ = 1', 'χ = ω', 'χ = ω²'];
  const bw = 250, by = 200, bh = 380, lo = 0, hi = 24;
  TL_TURN.blocks.forEach((vals, j) => {
    const x = 1000 + j * (bw + 25), ax = a * Q(S, 1, ['seven', 'six and', 'and six'][j], 0.5);
    if (ax <= 0.003) return;
    panel(x, by, bw, bh, ax, C.cyan, `${names[j]} · ${vals.length}`);
    const Y = v => by + bh - 30 - (v - lo) / (hi - lo) * (bh - 80);
    dashed(x + 20, Y(9), x + bw - 20, Y(9), C.now, ax * 0.8, 2);
    vals.forEach(v => {
      const light = v < 9, ka = light ? ax * Math.max(0.35, Q(S, 2, 'exactly one light mode', 0.6)) : ax;
      fillBox(x + 50, Y(v) - 2.5, bw - 100, 5, light ? C.cyan : C.white, light ? ka : ka * 0.5);
    });
    const lv = vals.filter(v => v < 9);
    txt(`light ${lv.length}: ${lv.map(v => tlF(v, 3)).join(' ')}`, x + bw / 2, by + bh + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ax * Q(S, 2, 'exactly one light mode', 0.6) });
  });
  txt('q = 1 · (φ₁, φ₂) = (0.7, 2.1) · 7 + 6 + 6 = 19', 1375, 175 + 0, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ba * (1 - la) });
  if (la > 0.003) {
    ctx.save(); ctx.globalAlpha = la; ctx.fillStyle = 'rgba(4,10,24,0.92)'; ctx.fillRect(960, 630, 840, 200); ctx.restore();
    panel(960, 630, 840, 200, la, C.lean, 'ANY DEGREES m, n · 任意阶 m, n');
    txt('haarInner(E_m, E_n) ≈ δ_mn', 990, 712, { size: 40, fam: F.math, w: 700, c: C.white, a: la });
    txt('π-free rational Haar inner product · 无 π 有理哈尔内积', 990, 752, { size: 20, fam: F.zh, w: 700, c: C.dim, a: la });
    tlLeanChip(990, 800, la * Q(S, 3, 'orthonormal', 0.5), 20);
  }
};

/* ======================================================================= */
/*                              scene 4 · WHERE TO CUT                       */
/* ======================================================================= */
SCENES.cut = S => {
  const a = tlFade(S);
  badgeQ(S, [[0, null, 'computed']]);
  panel(120, 190, 780, 400, a, C.cyan, 'SHARED RANKS · 共同低模数 · CERTIFICATE');
  const ranks = [1, 3, 7, 15];
  const w1 = Q(S, 1, 'The widest gap picks one', 0.5), w2 = Q(S, 1, 'equal characters', 0.5), w3 = Q(S, 1, 'leave three and fifteen', 0.5);
  ranks.forEach((r, i) => {
    const x = 230 + i * 180, y = 330, ra = a * Q(S, 0, ['allow one', 'three,', 'seven', 'fifteen'][i], 0.4);
    const out = (r === 1 || r === 7) ? w2 : 0, keep = (r === 3 || r === 15) ? w3 : 0;
    const col = keep > 0.5 ? C.now : C.cyan;
    chip(x, y, 130, 100, String(r), col, ra * (1 - 0.6 * out), 56, F.orb);
    if (out > 0.003) line(x - 60, y + 46, x + 60, y - 46, C.dim, ra * out, 4);
    if (r === 1) txt('widest gap · 最宽谱隙', x - 62, y + 92, { size: 20, fam: F.zh, w: 700, c: C.white, a: ra * w1 });
  });
  txt('equal characters 1, ω, ω² keep 3 and 15 · 特征标等重：3 与 15 并存', 510, 500, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * w3 });
  txt('34 zeros + full-torus interval certificate', 510, 550, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * w3 });
  /* the census of the site variance */
  const ca = a * Q(S, 2, 'One cut reads only', 0.6);
  if (ca > 0.003) {
    panel(960, 190, 840, 470, ca, C.cyan, 'SITE VARIANCE · 站点方差 Σ w² (computed)');
    txt('(degree, softened)', 990, 262, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ca });
    txt('sites', 1330, 262, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ca });
    txt('Σ_u w_uv²', 1480, 262, { size: 20, fam: F.math, w: 700, c: C.dim, a: ca });
    const hiA = Q(S, 3, 'Three outer sites', 0.6);
    TL_CENSUS.forEach((z, i) => {
      const y = 312 + i * 54, ra = ca * clamp(Q(S, 2, 'One cut reads only', 0.4, i * 0.18));
      const isMin = z.d === 10 && z.k === 1, col = isMin && hiA > 0.3 ? C.now : C.white;
      if (isMin && hiA > 0.003) box(980, y - 36, 800, 50, C.now, ra * hiA, 2);
      const expr = z.k === 0 ? String(z.d) : `${z.d - z.k} + ${z.k === 1 ? '' : z.k}(1 − δ)²`;
      txt(`(${z.d}, ${z.k})`, 990, y, { size: 28, fam: F.mono, w: 700, c: col, a: ra });
      txt(`${z.n}`, 1350, y, { size: 28, fam: F.mono, w: 700, c: col, a: ra });
      txt(expr, 1480, y, { size: 28, fam: F.math, w: 700, c: isMin ? (hiA > 0.3 ? C.now : C.cyan) : C.white, a: ra });
    });
  }
  const ta = a * Q(S, 2, 'T equals nine', 0.6);
  if (ta > 0.003) {
    panel(120, 620, 780, 210, ta, C.now, 'THE CUT · 分界');
    txt('T = min_v Σ w² = 9 + (1 − δ)²', 150, 705, { size: 40, fam: F.math, w: 700, c: C.white, a: ta });
    txt('9.99999999 < T < 10 for every positive zero', 150, 760, { size: 24, fam: F.mono, w: 700, c: C.now, a: ta * Q(S, 3, 'just below ten', 0.5) });
    txt('全部正零点上 T 略小于 10', 150, 802, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ta * Q(S, 3, 'just below ten', 0.5) });
  }
  const sa = a * Q(S, 3, 'Three outer sites', 0.6);
  if (sa > 0.003) {
    panel(960, 690, 840, 140, sa, C.now, 'ATTAINED · 取到最小值');
    txt('3 outer sites of degree 10, one softened spoke each', 990, 765, { size: 24, fam: F.mono, w: 700, c: C.white, a: sa });
    txt('三个度为 10 的外点，各连一条权为 1 − δ 的辐边', 990, 805, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
  }
};

/* ======================================================================= */
/*                               scene 5 · THREE ZEROS                       */
/* ======================================================================= */
SCENES.zeros = S => {
  const a = tlFade(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'Still, T is a model choice', 'argued']]);
  const x0 = 420, x1 = 1760, lo = 8.8, hi = 10.8, X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
  panel(120, 190, 1680, 520, a, C.cyan, 'TWO-STEP MASSES h = |λ(λ − c)| · 两步质量读数 · CERTIFICATES');
  const ya = 640;
  line(x0, ya, x1, ya, C.dim, a, 2);
  for (const t of [9, 9.5, 10, 10.5]) { line(X(t), ya - 6, X(t), ya + 6, C.dim, a, 2); txt(String(t), X(t), ya + 36, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  const c9 = a * Q(S, 0, 'the cut nine', 0.5), cT = a * Q(S, 0, 'the cut T', 0.5);
  dashed(X(9), 266, X(9), ya, C.now, c9, 3);
  txt('cut 9', X(9), 256, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: c9 });
  dashed(X(10), 266, X(10), ya, C.mag, cT, 3);
  txt('T ≈ 10', X(10), 256, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: cT });
  const rows = [
    { z: TL_ZEROS[0], y: 335, on: Q(S, 1, 'At zero 8236', 0.6), v9: '✗', vT: '✓ first hit' },
    { z: TL_ZEROS[1], y: 445, on: Q(S, 2, 'T also rescues', 0.6), v9: '✗', vT: '✓ rescued' },
    { z: TL_ZEROS[2], y: 555, on: Q(S, 3, 'zero 8359', 0.6), v9: '✓', vT: '✓' }
  ];
  for (const r of rows) {
    const ra = a * r.on; if (ra <= 0.003) continue;
    txt(r.z.id, 150, r.y + 10, { size: 34, fam: F.orb, w: 900, c: C.white, a: ra });
    if (r.z.h3) {
      line(X(r.z.h3), r.y, X(r.z.h4), r.y, C.white, ra * 0.35, 6);
      dot(X(r.z.h3), r.y, 13, 'c', ra);
      dot(X(r.z.h4), r.y, 11, 'w', ra * 0.8);
      txt(`max h₃ ≈ ${r.z.h3}`, X(r.z.h3), r.y - 22, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ra });
      txt(`min h₄ ≈ ${r.z.h4}`, X(r.z.h4) - 10, r.y - 22, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ra });
    } else {
      ctx.save(); ctx.setLineDash([8, 6]); line(X(r.z.lo), r.y, X(r.z.hi), r.y, C.cyan, ra, 4); ctx.restore();
      txt('shared gap ⊇ [9, 10.19]', (X(r.z.lo) + X(r.z.hi)) / 2, r.y - 20, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ra });
    }
    txt(`9: ${r.v9}`, 150, r.y + 46, { size: 20, fam: F.mono, w: 700, c: r.v9 === '✓' ? C.cyan : C.dim, a: ra });
    txt(`T: ${r.vT}`, 225, r.y + 46, { size: 20, fam: F.mono, w: 700, c: C.mag, a: ra * (r.z.h3 ? Q(S, 2, 'Under T it is', 0.5) : 1) });
  }
  const ma = a * Q(S, 3, 'Still, T is a model choice', 0.6);
  if (ma > 0.003) {
    panel(120, 730, 1680, 100, ma, C.argued, 'MODEL · 模型假设');
    txt('reading T as the physical cut is a choice · charge-conjugate pairs per site: #8359 keeps only 2 charge-2 modes', 150, 790, { size: 21, fam: F.mono, w: 700, c: C.white, a: ma });
  }
};

/* ======================================================================= */
/*                          scene 6 · INTO FOUR DIMENSIONS                   */
/* ======================================================================= */
SCENES.lattice = S => {
  const a = tlFade(S);
  badgeQ(S, [[0, null, 'argued'], [1, 'A five-step overlap kernel', 'computed']]);
  const la = a * at(S, 0, 0.6);
  panel(120, 190, 560, 640, la, C.argued, 'SCHEMATIC 4D LATTICE · 示意');
  drawHyper(CUBE4, [[0, 3, S.t * 0.21], [1, 2, S.t * 0.13], [2, 3, S.t * 0.17]], { scale: 1.05, a: la * 0.9, cx: 400, cy: 480, camZ: 7, lw: 1.6 });
  txt('internal 3 modes ≠ 4D Weyl fermions', 400, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: la });
  txt('内部三模 ≠ 四维外尔费米子', 400, 800, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la });
  /* the mass window */
  const ma = a * Q(S, 1, 'A five-step overlap kernel', 0.6);
  if (ma > 0.003) {
    panel(730, 190, 1070, 300, ma, C.cyan, 'FIVE-STEP OVERLAP KERNEL · 五步单纯形重叠核 · g = I − J/5');
    const x0 = 790, x1 = 1740, lo = 3.40, hi = 3.55, X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0), y = 380;
    line(x0, y, x1, y, C.dim, ma, 2);
    for (const t of [3.40, 3.45, 3.50, 3.55]) { line(X(t), y - 6, X(t), y + 6, C.dim, ma, 2); txt(tlF(t, 2), X(t), y + 54, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ma }); }
    const wa = ma * Q(S, 1, 'narrow window', 0.6);
    fillBox(X(TL_MASS[0]), y - 22, X(TL_MASS[1]) - X(TL_MASS[0]), 44, C.cyan, wa * 0.3);
    box(X(TL_MASS[0]), y - 22, X(TL_MASS[1]) - X(TL_MASS[0]), 44, C.cyan, wa, 2);
    txt(`(25 − 5√5)/4 ≈ ${tlF(TL_MASS[0], 5)}`, X(TL_MASS[0]) - 6, y - 40, { size: 22, fam: F.math, w: 700, align: 'right', c: C.cyan, a: wa });
    txt('7/2', X(TL_MASS[1]) + 6, y - 40, { size: 22, fam: F.math, w: 700, c: C.cyan, a: wa });
    txt('Wilson mass m', 790, 265, { size: 22, fam: F.mono, w: 700, c: C.white, a: ma });
    tlRich([['3', C.cyan], [' species of one chirality · 三个同手征物种', C.white]], 790, 472, { size: 26, fam: F.zh, a: ma * Q(S, 1, 'three species', 0.6) });
  }
  const ia = a * Q(S, 2, 'With the shell as mass', 0.6);
  if (ia > 0.003) {
    panel(730, 520, 1070, 310, ia, C.cyan, 'INDEX · 手征指数 · REPLAY CERTIFICATES');
    tlRich([['smooth flux:  I = ', C.white], ['−3 Pf(C)', C.cyan]], 770, 600, { size: 34, fam: F.math, a: ia });
    tlRich([['shell as mass:  I = ', C.white], ['3 × single', C.cyan]], 770, 670, { size: 34, fam: F.math, a: ia * Q(S, 2, 'three times a single one', 0.5) });
    tlRich([['16 heavy layers:  I = ', C.white], ['0', C.cyan]], 770, 740, { size: 34, fam: F.math, a: ia * Q(S, 2, 'sixteen heavy layers', 0.5) });
    txt('gently curved (small-curvature) gauge fields · 小曲率规范场', 770, 800, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ia });
  }
};

/* ======================================================================= */
/*                              scene 7 · ROUGH FIELDS                       */
/* ======================================================================= */
SCENES.rough = S => {
  const a = tlFade(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'Three Higgs frames', 'argued'], [3, 'Still open', 'open']]);
  const oa = a * Q(S, 3, 'Still open', 0.6);
  const top = 1 - 0.55 * oa;
  /* rough links: jittered plaquettes */
  const ra = a * at(S, 0, 0.6) * top;
  panel(120, 190, 820, 360, ra, C.cyan, 'SU(5) ROUGH BACKGROUND · 5⁴ BOX');
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
    const x = 170 + i * 52, y = 250 + j * 52, jit = 0.9 * (rnd(i, j + Math.floor(S.u * 2)) - 0.5);
    ctx.save(); ctx.translate(x + 20, y + 20); ctx.rotate(jit); box(-18, -18, 36, 36, C.mag, ra * 0.7, 1.4); ctx.restore();
  }
  const ca = ra * Q(S, 1, 'One SU five background', 0.6);
  txt('(I(5̄), I(10)) = (2, 7)', 690, 300, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: ca });
  txt('−2 + 2 × 7 = 12', 690, 370, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: ca * Q(S, 1, 'centre charge twelve', 0.5) });
  txt('12 ≡ 2 (mod 5) ≠ 0', 690, 440, { size: 36, fam: F.math, w: 700, align: 'center', c: C.now, a: ca * Q(S, 1, 'two mod five', 0.5) });
  txt('centre charge on the left-handed determinant line', 530, 520, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ca });
  /* Higgs frames */
  const ha = a * Q(S, 2, 'Three Higgs frames', 0.6) * top;
  if (ha > 0.003) {
    panel(980, 190, 820, 360, ha, C.argued, 'ORTHOGONAL HIGGS FRAMES · 正交希格斯标架 · ARGUED');
    const left = ['SU(4)', 'SU(3)', 'SU(2)', '{1}'];
    left.forEach((g, i) => {
      const x = 1080 + i * 190, y = 330, hold = i === 3, ka = ha * Q(S, 2, hold ? 'four frames hold it' : 'lose the gap', 0.5);
      txt(`${i + 1}`, x, y - 30, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ha });
      chip(x, y + 30, 150, 64, g, hold ? C.cyan : C.white, ha, 28, F.math);
      txt(hold ? 'gap held' : 'gap lost', x, y + 110, { size: 22, fam: F.mono, w: 700, align: 'center', c: hold ? C.cyan : C.dim, a: ka });
    });
    txt('frames → unbroken subgroup · 标架数 → 剩余子群', 1390, 510, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ha });
  }
  if (oa > 0.003) {
    panel(120, 580, 1680, 250, oa, C.open, 'QUESTION 2 · 第二问 · OPEN');
    const items = [
      ['why 3 and not 15 (or 1)', '三代唯一性：为何排除 1 与 15', 'why three'],
      ['why the cut T (or 9)', '分界的动力学起源', 'why this cut'],
      ['chiral measure, no frames put in', '无外置标架的非微扰手征测度', 'a chiral measure']
    ];
    items.forEach(([en, zh, ph], i) => {
      const x = 160 + i * 555, ia = oa * Q(S, 3, ph, 0.5);
      txt(en, x, 680, { size: 24, fam: F.mono, w: 700, c: C.white, a: ia });
      txt(zh, x, 730, { size: 24, fam: F.zh, w: 700, c: C.open, a: ia });
    });
    stamp('OPEN', 1640, 790, Q(S, 3, 'put in by hand', 0.5), C.open, 36, -0.06);
  }
};

/* ======================================================================= */
/*                                 scene 8 · LEDGER                          */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.start + 6;
  background(t, sc, 1, 6);
  tlShell({ cx: 470, cy: 560, R: 260, a: 0.9, rot: 0.3 });
  txt(DATA.film.title_zh, 1260, 330, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THREE LIGHT MODES', 1260, 420, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  tlCols(TL_PATH[60].specs, 860, 480, 800, 280, 6.6, 11.6, 1, { band: 1, cut9: 1 });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
