/* Film 006 · Spheres beyond spheres: the diagonal escape and the cosine fixed point
   球外之球：对角线逃逸与余弦不动点 (book quantum-geometry, part VI: chapters 21 and 24).
   Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     diag    A 6 × 6 list of bit strings; reading the diagonal and flipping each bit builds d, which differs from row k at
             place k (ch. 21 §21.2, the sphere-escape "diagonal" card; computed here). A twist with no fixed point
             escapes every list ..... QualitativeEscape.self_application_fragment_package, item 3 (ch. 24, LEAN).
     split   The four-address catalog of ch. 21 example ex-cantor-godel-diagonal-table: decoders const 0, id, not,
             const 1; latent = (0, 0, 0, 1); g(a) = 1 − D_a(latent a) = (1, 1, 0, 0) is computed here from the table.
             The fiber {a0, a1, a2} splits into {a0, a1} and {a2}; joined pieces 2 → 3 (counted here). The four
             conclusions ..... DiagonalTopologicalEscape.complete_diagonal_topological_settlement (ch. 21, LEAN).
     helix   The shadow circle (cos t, sin t) and the open helix (cos t, sin t, c t) of ch. 21 §21.3 item 3 (an image,
             not a theorem); after one turn the height is 2πc. The joined coordinate Coordinate × Output has
             2 · 2 = 4 values, so 2⁴ = 16 bit functions > 4 addresses (ch. 21, after the example; counted here).
     land    The 3 × 3 list of ch. 24 example ex-three-by-three-capture-escape: rows (0,1,2), (1,2,2), (2,2,2).
             f1 = (0→1, 1→2, 2→2) twists the diagonal (0,2,2) into (1,2,2) = row 1; g 1 1 = 2 = f1(2)
             ..... EscapeCount.diagonal_landing_fixed (ch. 24, LEAN). The cycle f2 = (0→1, 1→2, 2→0) gives (1,0,0),
             on no row (item 3 of the fragment package again). Matches and mismatches are computed here.
     cosine  θ_{k+1} = cos θ_k from θ₀ = 1 (ch. 24 example ex-dottie-and-golden-iterations); θ* by Newton's method
             here. Existence, uniqueness among positive reals and 0 < θ* < 1
             ..... DottieInverseSeries.rational_inverse_endpoint (ch. 24, LEAN). The asymptotic rate −sin θ* ≈ −0.674
             and "no step lands exactly" are literature results (remarks rem-banach-dottie-hairy-ball-literature and
             rem-dottie-convergent-residual-literature; ARGUED); (θ*)² + sin²θ* = 1 is cos² + sin² = 1 at θ*.

   On load, FILM.init checks DATA.lean against the four theorems and re-derives every number shown on screen by an
   independent route. Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const SB = (() => {
  /* scene diag: a 6 × 6 list of bits, fixed by a hash, and its flipped diagonal */
  const N = 6;
  const rows = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => (rnd(i + 3, j + 11) < 0.5 ? 0 : 1)));
  const d = rows.map((r, k) => 1 - r[k]);

  /* scene split: the four decoders Coordinate {0,1} → Output {0,1}, as [D(0), D(1)] */
  const dec = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const decName = ['const 0', 'id', 'not', 'const 1'];
  const latent = [0, 0, 0, 1];
  const twist = o => 1 - o;
  const listed = dec.map((D, a) => D[latent[a]]);
  const g = listed.map(twist);
  const pieces = keyOf => new Set([0, 1, 2, 3].map(keyOf)).size;
  const before = pieces(a => String(latent[a]));
  const after = pieces(a => latent[a] + ',' + g[a]);
  /* the next stage: the joined coordinate and the functions on it */
  const joined = 2 * 2, funcs = Math.pow(2, joined);

  /* scene land: the 3 × 3 list and two twists */
  const L3 = [[0, 1, 2], [1, 2, 2], [2, 2, 2]];
  const f1 = [1, 2, 2], f2 = [1, 2, 0];
  const diag3 = L3.map((r, a) => r[a]);
  const tw1 = diag3.map(y => f1[y]), tw2 = diag3.map(y => f2[y]);
  const same = (u, v) => u.every((x, i) => x === v[i]);
  const caught1 = L3.findIndex(r => same(r, tw1));
  const caught2 = L3.findIndex(r => same(r, tw2));

  /* scene cosine: θ* by Newton's method, the Picard iterates from 1 */
  let th = 1;
  for (let k = 0; k < 60; k++) th = th - (th - Math.cos(th)) / (1 + Math.sin(th));
  const star = th, lam = Math.sin(star);
  const it = [1];
  for (let k = 0; k < 40; k++) it.push(Math.cos(it[it.length - 1]));
  return { N, rows, d, dec, decName, latent, listed, g, before, after, joined, funcs, L3, f1, f2, diag3, tw1, tw2, caught1, caught2, star, lam, it };
})();

const SB_LEAN = {
  self_application_fragment_package: 'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package',
  complete_diagonal_topological_settlement: 'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement',
  diagonal_landing_fixed: 'D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed',
  rational_inverse_endpoint: 'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 12) E.push('film 006: ' + m); };

  /* the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(SB_LEAN).length, `film.json cites ${lean.length} declarations`);
  for (const [short, gid] of Object.entries(SB_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { check(false, `film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem`);
    check(r.short === short, `${gid} resolves to ${r.name}`);
  }

  /* diag: d is on no row, and differs from row k exactly where the diagonal says */
  for (let k = 0; k < SB.N; k++) {
    check(SB.d[k] !== SB.rows[k][k], `d agrees with row ${k} at place ${k}`);
    check(SB.rows[k].some((v, j) => v !== SB.d[j]), `d equals row ${k}`);
  }
  /* split: the table of the chapter, recomputed by brute force over all addresses */
  check(JSON.stringify(SB.g) === '[1,1,0,0]', `g = ${SB.g}`);
  check(new Set(SB.dec.map(String)).size === 4, 'the catalog is not onto the four bit functions');
  check(SB.g[1] !== SB.g[2] && SB.latent[1] === SB.latent[2], 'a1, a2 are not a deficit pair');
  check(SB.before === 2 && SB.after === 3, `pieces ${SB.before} → ${SB.after}`);
  /* no function of the latent coordinate gives g (all four candidates fail) */
  check(SB.dec.every(h => [0, 1, 2, 3].some(a => h[SB.latent[a]] !== SB.g[a])), 'g factors through latent');
  check(SB.funcs === 16 && SB.funcs > SB.dec.length, 'next-stage count');
  /* land */
  check(JSON.stringify(SB.diag3) === '[0,2,2]', `diagonal ${SB.diag3}`);
  check(SB.caught1 === 1 && JSON.stringify(SB.tw1) === '[1,2,2]', 'f1 does not land on row 1');
  check(SB.f1[SB.L3[1][1]] === SB.L3[1][1], 'landing value is not fixed by f1');
  check(SB.caught2 === -1 && JSON.stringify(SB.tw2) === '[1,0,0]', 'f2 diagonal is caught');
  check([0, 1, 2].every(y => SB.f2[y] !== y), 'f2 has a fixed point');
  /* cosine: θ* against bisection, the iterates of the chapter's table, the rate */
  let lo = 0, hi = 1;
  for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (Math.cos(m) - m > 0) lo = m; else hi = m; }
  check(Math.abs(lo - SB.star) < 1e-15 && SB.star > 0 && SB.star < 1, `θ* = ${SB.star}`);
  check(SB.star.toFixed(10) === '0.7390851332', `θ* digits ${SB.star.toFixed(10)}`);
  check(SB.it[1].toFixed(8) === '0.54030231' && SB.it[2].toFixed(8) === '0.85755322' && SB.it[3].toFixed(8) === '0.65428979', 'iterates');
  check(SB.lam.toFixed(4) === '0.6736', `λ = ${SB.lam}`);
  const r20 = (SB.it[21] - SB.star) / (SB.it[20] - SB.star);
  check(Math.abs(r20 + 0.673649) < 2e-6, `δ21/δ20 = ${r20}`);
  check(SB.it.every(x => x !== SB.star), 'an iterate hits θ* exactly');
});
Object.assign(FILM.speed, { diag: 0.02, split: 0.014, helix: 0.03, land: 0.016, cosine: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  helpers                                 */
/* ======================================================================= */
const SUBD = '₀₁₂₃₄₅₆₇₈₉';
const sb = n => String(n).split('').map(c => SUBD[+c]).join('');
const fx = (x, n) => x.toFixed(n);
/* one Lean citation by short name: LEAN ✓ chip + the declaration's short name */
function leanRef(x, y, short, a, size = 24) {
  if (a <= 0) return;
  const r = DATA.lean.find(z => z.short === short && z.kind === 'theorem');
  if (!r) { window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); return; }
  const head = STR.en.lean || 'LEAN ✓', wh = tw(head, 17, F.mono, 700, 1) + 20;
  fillBox(x, y - 24, wh, 32, C.lean, a);
  txt(head, x + 10, y - 2, { size: 17, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 14, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a bit/value cell */
function cell(x, y, s, sz, a, o = {}) {
  if (a <= 0.003) return;
  if (o.fill) fillBox(x, y, sz, sz, o.fill, a);
  if (o.frame) box(x, y, sz, sz, o.frame, a, o.lw || 1.5);
  else { ctx.globalAlpha = a * 0.35; ctx.strokeStyle = C.dim; ctx.lineWidth = 1; ctx.strokeRect(x, y, sz, sz); ctx.globalAlpha = 1; }
  txt(s, x + sz / 2, y + sz * 0.68, { size: o.size || sz * 0.55, fam: F.mono, w: 700, align: 'center', c: o.c || C.white, a });
}
function cross(x, y, r, col, a, w = 3) { line(x - r, y - r, x + r, y + r, col, a, w); line(x - r, y + r, x + r, y - r, col, a, w); }
/* a mismatch on a cell: magenta frame, small ✕ in the top-right corner, the digit stays legible */
function mismatch(x, y, sz, a) {
  if (a <= 0) return;
  box(x + 3, y + 3, sz - 6, sz - 6, C.mag, a, 3);
  cross(x + sz - 13, y + 13, 6, C.mag, a, 2.5);
}

/* ======================================================================= */
/*                    1 · DIAGONAL: the flipped diagonal escapes             */
/* ======================================================================= */
SCENES.diag = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* opening title during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 470, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble('SPHERES BEYOND SPHERES', p, 3), W / 2, 570, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 8, ab: 2 });
    txt(scramble('THE DIAGONAL ESCAPE AND THE COSINE FIXED POINT', p, 5), W / 2, 630, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: ta, ls: 4 });
  }
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const out = clamp((S.d - u) / 0.6);
  const N = SB.N, sz = 76, x0 = 300, y0 = 200;
  /* the list, row by row */
  for (let i = 0; i < N; i++) {
    const a = clamp((u - L0.s - 0.15 * i) / 0.5) * out;
    if (a <= 0) continue;
    txt(`row ${i}`, x0 - 24, y0 + i * sz + sz * 0.64, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: a * 0.9 });
    for (let j = 0; j < N; j++) cell(x0 + j * sz, y0 + i * sz, String(SB.rows[i][j]), sz, a, { c: C.cyan });
  }
  txt('…', x0 + N * sz / 2, y0 + N * sz + 30, { size: 30, fam: F.mono, align: 'center', c: C.dim, a: at(S, 0, 0.5, 1.4) * out });
  /* read head down the diagonal during line 1 */
  const L1 = lineAt(S, 1), rd = clamp((u - L1.s - 0.3) / Math.max(1, L1.e - L1.s - 0.2)) * N;
  const dy = y0 + N * sz + 64;
  txt('d', x0 - 24, dy + sz * 0.64, { size: 30, fam: F.math, w: 700, align: 'right', c: C.mag, a: at(S, 1, 0.4) * out });
  for (let k = 0; k < N; k++) {
    const p = clamp(rd - k);
    if (p <= 0) continue;
    const cur = rd < N && Math.floor(rd) === k;
    cell(x0 + k * sz, y0 + k * sz, String(SB.rows[k][k]), sz, out, { frame: cur ? C.now : C.white, lw: cur ? 3 : 1.5, c: cur ? C.now : C.cyan, fill: cur ? rgba(C.now, 0.15) : null });
    /* the flipped bit drops into d */
    const yy = lerp(y0 + k * sz, dy, eo(p));
    cell(x0 + k * sz, yy, String(SB.d[k]), sz, out * clamp(p * 2), { frame: C.mag, c: C.mag, fill: rgba(C.mag, 0.12) });
  }
  /* line 2: compare d with each row; the mismatch sits on the diagonal */
  const L2 = lineAt(S, 2), cmp = clamp((u - L2.s - 0.2) / Math.max(1, L2.e - L2.s)) * N;
  for (let k = 0; k < N; k++) {
    const p = clamp(cmp - k);
    if (p <= 0) continue;
    const cur = cmp < N && Math.floor(cmp) === k;
    if (cur) box(x0 - 6, y0 + k * sz - 4, N * sz + 12, sz + 8, C.now, out, 2.5);
    mismatch(x0 + k * sz, y0 + k * sz, sz, out * p);
    txt(`≠ at ${k}`, x0 + N * sz + 30, y0 + k * sz + sz * 0.64, { size: 24, fam: F.mono, w: 700, c: C.mag, a: out * p });
  }
  /* right: the rule */
  const rx = 1080, ra = Q(S, 1, 'flip every bit', 0.6) * out;
  panel(rx, 200, 700, 300, ra, C.cyan, 'FLIP THE DIAGONAL · 翻转对角线');
  txt('d(k) = 1 − row k (k)', rx + 40, 290, { size: 40, fam: F.math, w: 700, c: C.white, a: ra });
  txt('twist: 0 ↦ 1, 1 ↦ 0  ·  no fixed point', rx + 40, 345, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: ra });
  const q2 = Q(S, 2, 'so it sits on no row', 0.6) * out;
  txt('d ≠ row k  for every k', rx + 40, 425, { size: 40, fam: F.math, w: 700, c: C.mag, a: q2, ab: 2 });
  txt('d ∉ list', rx + 40, 470, { size: 26, fam: F.mono, w: 700, c: C.mag, a: q2 });
  const q3 = at(S, 3, 0.6) * out;
  panel(rx, 540, 700, 230, q3, C.lean, 'FIXED-POINT-FREE TWIST · 无不动点扭转');
  txt('(∀ y, f y ≠ y)  →  ∀ h, IsEscaped f h', rx + 40, 630, { size: 30, fam: F.math, w: 700, c: C.white, a: q3 });
  leanRef(rx + 40, 700, 'self_application_fragment_package', Q(S, 3, 'a twist with no fixed point', 0.6) * out, 22);
  txt('item 3', rx + 40, 744, { size: 18, fam: F.mono, c: C.dim, a: Q(S, 3, 'a twist with no fixed point', 0.6) * out });
  stamp('ESCAPES EVERY LIST', 1430, 815, Q(S, 3, 'escapes every list', 0.4, 0.2) * out, C.lean, 28, -0.04);
};

/* ======================================================================= */
/*                  2 · FIBER SPLIT: a new axis at right angles              */
/* ======================================================================= */
SCENES.split = S => {
  const u = S.u, out = clamp((S.d - u) / 0.6);
  badgeQ(S, [[0, null, 'computed'], [5, 'Lean checks', 'lean']]);
  /* the catalog table */
  const tx = 150, ty = 220, cw = [120, 150, 110, 110, 150, 110], rh = 64;
  const heads = ['a', 'D_a', 'D_a(0)', 'D_a(1)', 'latent(a)', 'g(a)'];
  const colA = [0, 0, 0, Q(S, 1, 'The old coordinate', 0.6), 1, 1];
  let hx = tx;
  const L2 = lineAt(S, 2), feed = clamp((u - L2.s - 0.3) / Math.max(1, L2.e - L2.s - 0.3)) * 4;
  const ta = at(S, 0, 0.6, -0.3) * out;
  heads.forEach((h, c) => {
    const a = ta * (c < 4 ? 1 : c === 4 ? Q(S, 1, 'The old coordinate', 0.6) : clamp(feed));
    txt(h, hx + cw[c] / 2, ty, { size: 22, fam: F.mono, w: 700, align: 'center', c: c === 5 ? C.mag : C.cyan, a });
    hx += cw[c];
  });
  line(tx, ty + 14, tx + cw.reduce((s, v) => s + v, 0), ty + 14, C.dim, ta, 1.2);
  for (let a = 0; a < 4; a++) {
    const y = ty + 60 + a * rh, ra = clamp((u - lineAt(S, 0).s - 0.25 * a) / 0.5) * out;
    const cur = feed < 4 && Math.floor(feed) === a;
    if (cur && feed > 0) fillBox(tx - 6, y - 40, cw.reduce((s, v) => s + v, 0) + 12, rh - 6, rgba(C.now, 0.12), out);
    let cx = tx;
    const vals = [`a${sb(a)}`, SB.decName[a], String(SB.dec[a][0]), String(SB.dec[a][1]), String(SB.latent[a]), String(SB.g[a])];
    vals.forEach((v, c) => {
      let al = ra;
      if (c === 4) al *= Q(S, 1, 'The old coordinate', 0.6);
      if (c === 5) al *= clamp(feed - a);
      /* the decoder entry read at the address's own coordinate lights up */
      const hot = (c === 2 || c === 3) && SB.latent[a] === c - 2 && feed > a;
      const col = c === 5 ? C.mag : hot ? C.now : c === 4 ? C.cyan : C.white;
      txt(v, cx + cw[c] / 2, y, { size: c === 1 ? 22 : 28, fam: F.mono, w: 700, align: 'center', c: col, a: al });
      if (hot) box(cx + cw[c] / 2 - 26, y - 34, 52, 46, C.now, al, 2);
      cx += cw[c];
    });
  }
  txt('g(a) = 1 − D_a(latent(a))', tx, ty + 60 + 4 * rh + 20, { size: 30, fam: F.math, w: 700, c: C.white, a: Q(S, 2, 'then flips', 0.6) * out });
  txt('four addresses · four functions {0,1} → {0,1} · onto', tx, ty + 60 + 4 * rh + 66, { size: 20, fam: F.mono, c: C.dim, a: Q(S, 0, 'each naming', 0.6) * out });

  /* the stage: old axis (latent), new axis (g) */
  const ox = 1080, oy = 680, X0 = 1240, X1 = 1600, Yup = 400;
  const sa = Q(S, 1, 'The old coordinate', 0.6) * out;
  arrow(ox, oy, 1760, oy, C.cyan, sa, 2.5);
  txt('latent (old coordinate)', 1760, oy + 140, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: sa });
  [[X0, '0'], [X1, '1']].forEach(([x, s]) => { line(x, oy - 8, x, oy + 8, C.cyan, sa, 2); txt(s, x, oy + 104, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: sa }); });
  const lift = ease(Q(S, 4, 'Raise them', 1.6));
  const axa = Q(S, 4, 'Raise them', 0.6) * out;
  arrow(ox, oy, ox, Yup - 90, C.mag, axa, 2.5);
  txt('g (new axis)', ox + 14, Yup - 100, { size: 20, fam: F.mono, w: 700, c: C.mag, a: axa });
  [[oy, '0'], [Yup, '1']].forEach(([y, s]) => { line(ox - 8, y, ox + 8, y, C.mag, axa, 2); txt(s, ox - 20, y + 9, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.mag, a: axa }); });
  /* address dots */
  const pos = a => {
    const fib = [0, 1, 2].filter(b => SB.latent[b] === SB.latent[a]);
    const sameG = [0, 1, 2, 3].filter(b => SB.latent[b] === SB.latent[a] && SB.g[b] === SB.g[a]);
    const k0 = SB.latent[a] === 0 ? fib.indexOf(a) - 1 : 0;
    const k1 = sameG.length > 1 ? sameG.indexOf(a) - (sameG.length - 1) / 2 : 0;
    const bx = (SB.latent[a] ? X1 : X0);
    return [bx + lerp(k0, k1, lift) * 78, lerp(oy, SB.g[a] ? Yup : oy, lift)];
  };
  const gShow = Q(S, 3, 'The flipped values', 0.6);
  for (let a = 0; a < 4; a++) {
    const [x, y] = pos(a);
    dot(x, y, 15, 'w', sa);
    txt(`a${sb(a)}`, x, y - 26, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
    txt(`g=${SB.g[a]}`, x, y + 54, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: sa * gShow * (1 - lift) });
  }
  /* fibers (old pieces) and joined pieces */
  const ell = (x, y, rx, ry, col, a, dash) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; if (dash) ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.stroke(); ctx.restore();
  };
  const fa = sa * (1 - lift);
  ell(X0, oy, 140, 46, C.cyan, fa);
  ell(X1, oy, 50, 46, C.cyan, fa);
  /* the split: a magenta dashed cut between {a0, a1} and {a2} */
  const cut = gShow * (1 - lift) * sa;
  if (cut > 0) { const xc = (pos(1)[0] + pos(2)[0]) / 2; dashed(xc, oy - 60, xc, oy + 60, C.mag, cut, 3); }
  const ja = sa * lift;
  ell(X0 - 0, Yup, 100, 46, C.cyan, ja);
  ell(X0 + 0, oy, 50, 46, C.cyan, ja);
  ell(X1, oy, 50, 46, C.cyan, ja);
  const n = lift < 0.5 ? SB.before : SB.after;
  txt(`pieces: ${SB.before}${lift > 0.5 ? ' → ' + SB.after : ''}`, 1760, 330, { size: 34, fam: F.mono, w: 700, align: 'right', c: lift > 0.5 ? C.now : C.white, a: sa * (n ? 1 : 0) });
  /* Lean: the four conclusions */
  const q5 = at(S, 5, 0.6) * out;
  const items = ['¬ Refines g latent', '¬ Continuous g', 'separationDeficit ≠ ∅', 'StrictObservationRefinement'];
  items.forEach((s, i) => {
    const a = q5 * clamp((u - lineAt(S, 5).s - 0.6 - 0.45 * i) / 0.4);
    chip(tx + 170 + (i % 2) * 360, 730 + Math.floor(i / 2) * 54, 340, 44, s, C.lean, a, 18);
  });
  leanRef(tx, 676, 'complete_diagonal_topological_settlement', Q(S, 5, 'all four conclusions', 0.6) * out, 20);
};

/* ======================================================================= */
/*                 3 · SPHERE BEYOND: shadow circle, open helix              */
/* ======================================================================= */
const HX = { c: 0.11, R: 230 };
function hxView(cx, cy, yaw, pitch) {
  return p => {
    const x = p[0] * Math.cos(yaw) - p[1] * Math.sin(yaw), d = p[0] * Math.sin(yaw) + p[1] * Math.cos(yaw);
    return [cx + HX.R * x, cy + HX.R * (d * Math.sin(pitch) - p[2] * Math.cos(pitch))];
  };
}
function hxPath(V, f, t0, t1, col, a, lw) {
  if (a <= 0 || t1 <= t0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  const n = Math.max(2, Math.ceil((t1 - t0) / 0.03));
  for (let i = 0; i <= n; i++) { const [x, y] = V(f(lerp(t0, t1, i / n))); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
  ctx.stroke(); ctx.restore();
}
function helixFigure(V, tEnd, a, o = {}) {
  const shadow = t => [Math.cos(t), Math.sin(t), 0], hel = t => [Math.cos(t), Math.sin(t), HX.c * t];
  /* floor circle (the old space) */
  hxPath(V, shadow, 0, TAU, C.cyan, a * 0.25, 1.5);
  /* the normal axis */
  const p0 = V([0, 0, -0.1]), p1 = V([0, 0, HX.c * 2.3 * TAU + 0.25]);
  arrow(p0[0], p0[1], p1[0], p1[1], C.white, a * (o.axis == null ? 1 : o.axis) * 0.8, 2);
  if (o.axis > 0) txt('eₙ₊₁ = ⋆Iₙ', p1[0] + 16, p1[1] + 8, { size: 24, fam: F.math, w: 700, c: C.white, a: a * (o.axis == null ? 1 : o.axis) });
  hxPath(V, shadow, 0, Math.min(tEnd, TAU), C.cyan, a, 4);
  if (o.helix > 0) {
    hxPath(V, hel, 0, tEnd, C.mag, a * o.helix, 4);
    /* drop lines every quarter turn */
    for (let t = 0; t <= tEnd + 1e-9; t += TAU / 4) { const q = V(hel(t)), s = V(shadow(t)); dashed(s[0], s[1], q[0], q[1], C.dim, a * o.helix * 0.5, 1.2); }
  }
  const s = V(shadow(tEnd)), h = V(hel(tEnd));
  dot(s[0], s[1], 12, 'g', a * (o.helix > 0 ? 0.5 : 1));
  if (o.helix > 0) dot(h[0], h[1], 14, 'g', a * o.helix);
  return { s, h };
}
SCENES.helix = S => {
  const u = S.u, out = clamp((S.d - u) / 0.6);
  badgeQ(S, [[0, null, 'computed']]);
  /* camera: from straight above (pitch 90°) to the side (pitch 22°) during line 2 */
  const tilt = ease(Q(S, 2, 'From outside', 2.0));
  const pitch = lerp(Math.PI / 2, 0.38, tilt), yaw = 0.5 + 0.12 * Math.sin(u * 0.2);
  const V = hxView(820, lerp(500, 680, tilt), yaw, pitch);
  const L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  /* the point runs one turn during line 1, a second turn during line 3 */
  const turn1 = TAU * ease(clamp((u - L1.s - 0.2) / Math.max(1, L1.e - L1.s - 0.2)));
  const turn2 = TAU * ease(at(S, 3, Math.max(1, lineAt(S, 3).e - lineAt(S, 3).s - 1.5), 0.6));
  const tEnd = turn1 + turn2;
  const fa = at(S, 0, 0.8, -0.3) * out;
  const r = helixFigure(V, tEnd, fa, { helix: Q(S, 2, 'From outside', 0.8), axis: Q(S, 2, 'From outside', 1.2, 0.6) });
  txt('inside: the shadow (cos t, sin t)', 120, 220, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: Q(S, 1, 'From inside', 0.6) * out });
  txt('outside: the helix (cos t, sin t, c t)', 120, 258, { size: 24, fam: F.mono, w: 700, c: C.mag, a: Q(S, 2, 'open helix', 0.6) * out });
  txt('an image, not a theorem · 意象，不是定理', 120, 296, { size: 18, fam: F.mono, c: C.dim, a: Q(S, 1, 'From inside', 0.6) * out });
  /* readouts at the end of the first turn */
  const back = Q(S, 1, 'back where it began', 0.6) * out;
  txt('t = 2π:  (1, 0)  closed', 120, 790, { size: 30, fam: F.math, w: 700, c: C.cyan, a: back * (1 - 0.6 * Q(S, 2, 'After one turn', 0.6)) });
  txt('(1, 0, 2πc)', 120, 836, { size: 34, fam: F.math, w: 700, c: C.mag, a: Q(S, 2, 'risen by', 0.6) * out, ab: 2 });
  if (Q(S, 2, 'risen by', 0.6) > 0 && tEnd >= TAU - 1e-6) {
    const b = V([1, 0, 0]), t = V([1, 0, HX.c * TAU]);
    line(b[0] + 30, b[1], b[0] + 30, t[1], C.now, Q(S, 2, 'risen by', 0.6) * out * (1 - at(S, 3, 0.6)), 3);
    txt('2πc', b[0] + 44, (b[1] + t[1]) / 2 + 10, { size: 30, fam: F.math, w: 700, c: C.now, a: Q(S, 2, 'risen by', 0.6) * out * (1 - at(S, 3, 0.6)) });
  }
  /* the next stage needs a bigger catalog */
  const px = 1180, q3 = at(S, 3, 0.6) * out;
  panel(px, 360, 620, 400, q3, C.cyan, 'THE NEXT ROUND · 下一轮');
  txt('Coordinate × Output', px + 36, 440, { size: 28, fam: F.math, w: 700, c: C.white, a: q3 });
  txt(`= {0,1} × {0,1}:  ${SB.joined} values`, px + 36, 486, { size: 28, fam: F.math, w: 700, c: C.white, a: Q(S, 3, 'sixteen', 0.6) * out });
  txt(`functions to {0,1}:  2${'⁴'} = ${SB.funcs}`, px + 36, 560, { size: 30, fam: F.math, w: 700, c: C.mag, a: Q(S, 3, 'joined coordinate', 0.6) * out });
  txt(`addresses:  ${SB.dec.length}  <  ${SB.funcs}`, px + 36, 620, { size: 30, fam: F.math, w: 700, c: C.now, a: Q(S, 3, 'only four', 0.6) * out });
  txt('to escape again, enlarge the catalog', px + 36, 700, { size: 20, fam: F.mono, c: C.dim, a: Q(S, 3, 'only four', 0.6, 0.8) * out });
  void r;
};

/* ======================================================================= */
/*              4 · LANDING: caught by a twist with a fixed point            */
/* ======================================================================= */
function grid3(x0, y0, sz, a, o = {}) {
  for (let i = 0; i < 3; i++) {
    txt(`g ${i}`, x0 - 18, y0 + i * sz + sz * 0.64, { size: 22, fam: F.mono, w: 700, align: 'right', c: o.rowCol && o.rowCol[i] || C.dim, a });
    for (let j = 0; j < 3; j++) {
      const dg = i === j;
      cell(x0 + j * sz, y0 + i * sz, String(SB.L3[i][j]), sz, a, { frame: dg ? C.white : null, lw: dg ? 3 : 1, c: o.rowCol && o.rowCol[i] || C.white });
    }
  }
}
/* hot: highlight the fixed points of f (amber, the current focus) */
function mapChips(x, y, f, name, a, col, hot = 0) {
  txt(name, x, y, { size: 26, fam: F.math, w: 700, c: col, a });
  [0, 1, 2].forEach(k => txt(`${k} ↦ ${f[k]}`, x + 60 + k * 112, y, { size: 24, fam: F.mono, w: 700, c: f[k] === k && hot > 0.5 ? C.now : C.white, a }));
}
SCENES.land = S => {
  const u = S.u, out = clamp((S.d - u) / 0.6);
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const sz = 84;
  /* left: f1 */
  const x0 = 300, y0 = 250, a0 = at(S, 0, 0.6, -0.3) * out;
  const caught = Q(S, 1, 'exactly row one', 0.6);
  grid3(x0, y0, sz, a0, { rowCol: [null, caught > 0.5 ? C.cyan : null, null] });
  mapChips(x0 - 120, 210, SB.f1, 'f₁', Q(S, 0, 'twist its diagonal', 0.6) * out, C.white, Q(S, 2, 'leaves two', 0.3) * (1 - at(S, 4, 0.3)));
  /* the diagonal copied below, then twisted, then lifted onto row 1 */
  const dY = y0 + 3 * sz + 56;
  const cp = Q(S, 0, 'twist its diagonal', 0.6, 0.3), twp = Q(S, 0, 'twist its diagonal', 0.6, 1.0);
  const rise = ease(Q(S, 1, 'exactly row one', 0.9));
  txt(twp > 0.5 ? 'f₁ ∘ diag' : 'diag', x0 - 18, dY + sz * 0.64, { size: 22, fam: F.mono, w: 700, align: 'right', c: twp > 0.5 ? C.cyan : C.white, a: cp * out * (1 - rise) });
  for (let k = 0; k < 3; k++) {
    const v = twp > 0.5 ? SB.tw1[k] : SB.diag3[k];
    const y = lerp(dY, y0 + SB.caught1 * sz, rise);
    cell(x0 + k * sz, y, String(v), sz, cp * out * (1 - 0.6 * clamp(Q(S, 2, 'At the landing', 0.6))), { frame: C.cyan, c: C.cyan, fill: rgba(C.cyan, 0.14), lw: 2.5 });
  }
  txt(`= g ${SB.caught1}`, x0 + 3 * sz + 24, y0 + SB.caught1 * sz + sz * 0.64, { size: 30, fam: F.math, w: 700, c: C.cyan, a: caught * out });
  txt('caught · 捕获', x0 + 3 * sz + 24, y0 + SB.caught1 * sz + sz * 0.64 + 40, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: caught * out });
  /* landing value */
  const lv = Q(S, 2, 'the value is two', 0.6) * out * (1 - 0.7 * at(S, 4, 0.6));
  const lx = x0 + SB.caught1 * sz + sz / 2, ly = y0 + SB.caught1 * sz + sz / 2;
  ring(lx, ly, sz * 0.62, C.now, lv, 4);
  txt(`g 1 1 = ${SB.L3[1][1]}`, x0 - 120, dY + 70, { size: 30, fam: F.math, w: 700, c: C.now, a: lv });
  txt(`f₁(${SB.L3[1][1]}) = ${SB.f1[SB.L3[1][1]]}   fixed`, x0 - 120, dY + 116, { size: 30, fam: F.math, w: 700, c: C.now, a: Q(S, 2, 'leaves two', 0.6) * out });
  /* Lean */
  const q3 = at(S, 3, 0.6) * out;
  txt('g a₀ = diagonal f g  →  f (g a₀ a₀) = g a₀ a₀', x0 - 120, 800, { size: 28, fam: F.math, w: 700, c: C.white, a: q3 });
  leanRef(x0 - 120, 750, 'diagonal_landing_fixed', Q(S, 3, 'whenever a list', 0.6) * out, 22);
  /* right: f2, no fixed point */
  const rx = 1180, r4 = at(S, 4, 0.6) * out;
  grid3(rx, y0, sz, r4);
  mapChips(rx - 120, 210, SB.f2, 'f₂', r4, C.white);
  const t2 = Q(S, 4, 'the diagonal escapes', 0.6) * out;
  txt('f₂ ∘ diag', rx - 18, dY + sz * 0.64, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: r4 });
  for (let k = 0; k < 3; k++) {
    cell(rx + k * sz, dY, String(SB.tw2[k]), sz, r4, { frame: C.mag, c: C.mag, fill: rgba(C.mag, 0.14), lw: 2.5 });
    if (SB.tw2[k] !== SB.L3[k][k]) mismatch(rx + k * sz, y0 + k * sz, sz, t2 * clamp((u - phraseAt(S, 4, 'the diagonal escapes') - 0.3 * k) / 0.3));
  }
  txt('on no row · 逃逸', rx + 3 * sz + 24, dY + sz * 0.64, { size: 24, fam: F.mono, w: 700, c: C.mag, a: t2 });
  stamp('LANDING = FIXED POINT', 900, 690, Q(S, 3, 'is a fixed point', 0.4, 0.2) * out * (1 - r4), C.lean, 26, -0.04);
};

/* ======================================================================= */
/*                    5 · COSINE: the fixed point θ* = cos θ*                */
/* ======================================================================= */
const CB = { x0: 170, y0: 190, s: 640, lo: 0.4, hi: 1.05 };
const cbX = v => CB.x0 + (v - CB.lo) / (CB.hi - CB.lo) * CB.s;
const cbY = v => CB.y0 + CB.s - (v - CB.lo) / (CB.hi - CB.lo) * CB.s;
function cobweb(steps, a, o = {}) {
  if (a <= 0) return;
  box(CB.x0, CB.y0, CB.s, CB.s, C.dim, a * 0.5, 1);
  /* y = x and y = cos x */
  dashed(cbX(CB.lo), cbY(CB.lo), cbX(CB.hi), cbY(CB.hi), C.dim, a * 0.8, 1.5);
  curve(t => { const x = lerp(CB.lo, CB.hi, t); return [cbX(x), cbY(Math.cos(x))]; }, 120, C.cyan, a, 3.5);
  txt('y = cos x', cbX(0.45), cbY(Math.cos(0.45)) + 72, { size: 22, fam: F.math, w: 700, c: C.cyan, a });
  txt('y = x', cbX(1.0) - 70, cbY(1.0) + 6, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  [0.5, 0.75, 1.0].forEach(v => {
    txt(v.toFixed(2), cbX(v), CB.y0 + CB.s + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a });
    txt(v.toFixed(2), CB.x0 - 12, cbY(v) + 6, { size: 18, fam: F.mono, align: 'right', c: C.dim, a });
  });
  /* the path: (θ_k, θ_k) → (θ_k, θ_{k+1}) → (θ_{k+1}, θ_{k+1}) */
  const n = Math.floor(steps), fr = steps - n, it = SB.it;
  ctx.save(); ctx.globalAlpha = a * 0.85; ctx.strokeStyle = C.white; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(cbX(it[0]), cbY(CB.lo));
  for (let k = 0; k < n; k++) { ctx.lineTo(cbX(it[k]), cbY(it[k + 1])); ctx.lineTo(cbX(it[k + 1]), cbY(it[k + 1])); }
  ctx.stroke(); ctx.restore();
  if (steps < 40) {
    const k = n, x = it[k], y = it[k + 1];
    const mid = fr < 0.5 ? [cbX(x), lerp(cbY(k ? x : CB.lo), cbY(y), fr * 2)] : [lerp(cbX(x), cbX(y), fr * 2 - 1), cbY(y)];
    line(cbX(x), cbY(k ? x : CB.lo), cbX(x), fr < 0.5 ? mid[1] : cbY(y), C.now, a, 3);
    if (fr >= 0.5) line(cbX(x), cbY(y), mid[0], cbY(y), C.now, a, 3);
    dot(mid[0], mid[1], 12, 'g', a);
  }
  if (o.star > 0) { dot(cbX(SB.star), cbY(SB.star), 13, 'w', a * o.star); txt('θ*', cbX(SB.star) + 18, cbY(SB.star) - 16, { size: 28, fam: F.math, w: 700, c: C.white, a: a * o.star }); }
}
SCENES.cosine = S => {
  const u = S.u, out = clamp((S.d - u) / 0.6);
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, 'once close', 'argued']]);
  const L1 = lineAt(S, 1);
  const steps = 0.02 + 11.98 * clamp((u - L1.s - 0.2) / Math.max(1, (L1.e - L1.s) * 1.1)) + 8 * at(S, 2, 6);
  const ca = at(S, 0, 0.8, -0.3) * out;
  cobweb(steps, ca, { star: Q(S, 1, 'closing in', 0.6) });
  txt('θₖ₊₁ = cos θₖ', CB.x0, 168, { size: 30, fam: F.math, w: 700, c: C.white, a: Q(S, 0, 'feed each reading', 0.6) * out });
  /* the readings */
  const rx = 900, ry = 230, rows = 6;
  const shown = Math.min(Math.floor(steps), 30);
  for (let i = 0; i < rows; i++) {
    const k = i < 4 ? i : shown >= 4 ? Math.max(4, shown - (rows - 1 - i)) : -1;
    if (k < 0 || k > shown || (i >= 4 && k <= 3)) continue;
    const cur = k === shown;
    txt(`θ${sb(k)}`, rx, ry + i * 46, { size: 26, fam: F.math, w: 700, c: cur ? C.now : C.white, a: ca });
    txt(fx(SB.it[k], 6), rx + 90, ry + i * 46, { size: 26, fam: F.mono, w: 700, c: cur ? C.now : C.white, a: ca });
  }
  txt(`θ* = ${fx(SB.star, 10)}…`, rx, ry + rows * 46 + 14, { size: 30, fam: F.mono, w: 700, c: C.white, a: Q(S, 1, 'closing in', 0.6) * out, ab: 1 });
  /* Lean: existence, uniqueness, 0 < θ* < 1 */
  const q2 = at(S, 2, 0.6) * out * (1 - 0.7 * at(S, 4, 0.6));
  txt('∃ θ*, 0 < θ* < 1 ∧ cos θ* = θ*', rx, 600, { size: 30, fam: F.math, w: 700, c: C.white, a: q2 });
  txt('∀ t > 0, cos t = t → t = θ*', rx, 644, { size: 30, fam: F.math, w: 700, c: C.white, a: Q(S, 2, 'exactly one positive', 0.6) * out * (1 - 0.7 * at(S, 4, 0.6)) });
  leanRef(rx, 700, 'rational_inverse_endpoint', Q(S, 2, 'exactly one positive', 0.6, 0.4) * out, 22);
  /* the rate: δ_{k+1}/δ_k → −sin θ* (literature) */
  const q3 = at(S, 3, 0.6) * out * (1 - at(S, 4, 0.6));
  const kk = Math.min(Math.floor(20 * at(S, 3, Math.max(1, lineAt(S, 3).e - lineAt(S, 3).s - 1))), Math.max(0, Math.floor(steps) - 1));
  const ratio = (SB.it[kk + 1] - SB.star) / (SB.it[kk] - SB.star);
  panel(1380, 200, 420, 240, q3, C.argued, 'RATE · 收敛率');
  txt(`δ${sb(kk + 1)}/δ${sb(kk)} = ${ratio.toFixed(4).replace('-', '−')}`, 1410, 290, { size: 28, fam: F.math, w: 700, c: C.white, a: q3 });
  txt(`→ −sin θ* = −${fx(SB.lam, 4)}`, 1410, 340, { size: 28, fam: F.math, w: 700, c: C.argued, a: q3 });
  txt('literature · 文献结果', 1410, 400, { size: 18, fam: F.mono, c: C.dim, a: q3 });
  /* the unit circle: θ* is the line, λ = sin θ* the height */
  const q4 = at(S, 4, 0.6) * out * (1 - at(S, 5, 0.6));
  if (q4 > 0) {
    const ux = 1400, uy = 520, R = 180, P = [ux + R * SB.star, uy - R * SB.lam];
    ctx.save(); ctx.globalAlpha = q4 * 0.6; ctx.strokeStyle = C.dim; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ux, uy, R, -Math.PI / 2 - 0.05, 0.05); ctx.stroke(); ctx.restore();
    line(ux, uy, ux + R + 30, uy, C.dim, q4, 1.2); line(ux, uy, ux, uy - R - 30, C.dim, q4, 1.2);
    line(ux, uy, P[0], P[1], C.white, q4, 2);
    line(ux, uy + 3, P[0], uy + 3, C.cyan, q4, 6);
    line(P[0], uy, P[0], P[1], C.mag, q4, 6);
    dot(P[0], P[1], 12, 'w', q4);
    txt(`θ* ≈ ${fx(SB.star, 4)}`, ux, uy + 40, { size: 24, fam: F.math, w: 700, c: C.cyan, a: q4 });
    txt(`λ = sin θ* ≈ ${fx(SB.lam, 4)}`, P[0] + 16, uy - R * SB.lam / 2, { size: 22, fam: F.math, w: 700, c: C.mag, a: q4 });
    txt('(θ*)² + λ² = 1', ux - 20, uy + 100, { size: 32, fam: F.math, w: 700, c: C.white, a: Q(S, 4, 'one unit vector', 0.6) * out * (1 - at(S, 5, 0.6)) });
  }
  /* ψ = ψ(ψ) */
  const q5 = at(S, 5, 0.8, 0.6) * out;
  if (q5 > 0) {
    panel(1380, 230, 420, 260, q5, C.now, 'SELF-REFERENCE · 自指');
    txt('cos θ* = θ*', 1590, 320, { size: 38, fam: F.math, w: 700, align: 'center', c: C.white, a: q5 });
    txt('ψ = ψ(ψ)', 1590, 430, { size: 76, fam: F.math, w: 700, align: 'center', c: C.now, a: q5, ab: 3 });
  }
};

SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                   poster                                 */
/* ======================================================================= */
FILM.poster = () => {
  const t = 60.0;
  background(t, TL.scenes[2], 2, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.22, cx: 1320, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const V = hxView(470, 700, 0.5, 0.38);
  helixFigure(V, 1.6 * TAU, 1, { helix: 1, axis: 1 });
  txt(DATA.film.title_zh, 1300, 300, { size: 66, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('SPHERES BEYOND SPHERES', 1270, 400, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 6 });
  txt('THE DIAGONAL ESCAPE · THE COSINE FIXED POINT', 1270, 456, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, ls: 3 });
  txt('d ≠ row k', 1050, 570, { size: 46, fam: F.math, w: 700, align: 'center', c: C.mag, ab: 1 });
  txt(`cos θ* = θ* ≈ ${fx(SB.star, 6)}`, 1500, 570, { size: 40, fam: F.math, w: 700, align: 'center', c: C.cyan });
  txt('ψ = ψ(ψ)', 1270, 680, { size: 72, fam: F.math, w: 700, align: 'center', c: C.white, ab: 3 });
  bloom(0.55);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 1270, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(1270, 850, 1, { align: 'center', size: 15, gap: 30 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, TL.scenes[2]);
  post(2);
};
