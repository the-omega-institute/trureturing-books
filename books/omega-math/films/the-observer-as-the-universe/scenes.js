/* Film · The Observer as the Universe · 观察者即宇宙 (book omega-math, chapter 17).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     ports    an open-loop agent f : I_ext × S → S × O_ext with ports, then the port-free observer pentad
              (S, [-,-,-], κ, K₀, Φ_ε) and the latent horizon H_{1/2} = S \ V(K₀) (definition
              def-om-ch17-observer-pentad, MODEL: ARGUED). The core and horizon dots are schematic.
     clock    rational structural time τ = Σ (ΔI_Schur + Δb₁) with b₁ = |E| − |V| + c (same definition); the three
              beats of ex-om-ch17-quantitative-audit: seed e₀ = (1,0,0,0) repeated, h₁ = (1,1,0,0) with residual
              (0,1,0,0) and innovation 1/2, h₂ = (1,0,1,0) with residual (0,0,1,0), innovation 1/2 and a triangle,
              τ = 0, 1/2, 2. Every number is recomputed here from the definition (Gram–Schmidt in exact rationals,
              cycle rank by union–find): NUM; the reading as "time" is MODEL.
     krylov   the observable Krylov tower K_m = span{(T*)ᵏ C* y : k ≤ m}; worked example on Q⁴ with T the cyclic
              shift and C the first coordinate, dims 1, 2, 3, 4, 4, 4 (computed here by exact rank) .....
              ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound and
              ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently (LEAN; thm-om-ch17-
              krylov-growth-and-stability). "Only new cycles still move the clock" is the chapter's remark after the
              theorem, about its model (ARGUED).
     canvas   the static holographic canvas and the legless ternion sphere with rational yaw u (§17.2, MODEL;
              the contour picture is schematic) ..... ReversibleQram.correctness (LEAN; thm-om-ch17-reversible-qram),
              clean case query n D (a, clean n true, r) = (a, clean n true, r + D a) and the one-hot leaf routing;
              the depth-2 table D = (3, 1, 4, 1), address a = 10₂ and register r = 0 are a sample instance, its
              readout 4 computed here.
     split    the memory split κ_time + κ_space = 1 and the rational Lorentz parametrisation v = 2u/(1+u²),
              Δτ/Δt = (1−u²)/(1+u²), γ = (1+u²)/(1−u²), γv = 2u/(1−u²) (hand derivation in §17.2, ARGUED; the
              time/space reading is MODEL); at u = 1/3: 3/5, 4/5, 16/25, 9/25, 5/4, 3/4 (computed here, ex. 2).
     gradient S_Ω = 2 Σ (1 − κ_t) (§17.3); the five-domain synthesis (MODEL); ΔE(N) = C(N,2) − (3N − 6) =
              (N−3)(N−4)/2, values 0, 0, 1, 3, 6, 10 for N = 3…8 (computed here; hand derivation in the chapter);
              Tr(T₃²) = 2, Tr(Q²) = 16/3, ratio 3/8 for one Weyl generation under the equal-weight postulate
              (traces recomputed here by summing the generation's states; the postulate is MODEL).
     tiers    the chapter's epistemic remark rem-om-ch17-epistemic-and-open-boundaries: two LEAN theorems,
              MODEL readings, and the OPEN derivation of the Einstein equations and horizon unitarity.

   On load, FILM.init checks DATA.lean against the three theorems and re-derives every number on screen by a
   second route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const OU_LEAN = {
  growth: ['D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound', 'observable_krylov_strict_growth_bound'],
  stable: ['D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently', 'observable_krylov_once_stable_permanently'],
  qram: ['D5/S3/Quantum/Routing/ReversibleQram.correctness', 'correctness']
};
/* rationals as [n, d], d > 0, reduced */
const ouG = (a, b) => (b ? ouG(b, a % b) : Math.abs(a));
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = ouG(n, d) || 1; return [n / g, d / g]; };
const fAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fSub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fDiv = (a, b) => fr(a[0] * b[1], a[1] * b[0]);
const fEq = (a, n, d = 1) => a[0] * d === n * a[1];
const fs = a => (a[1] === 1 ? `${a[0]}` : `${a[0]}/${a[1]}`);
const vDot = (x, y) => x.reduce((s, xi, i) => fAdd(s, fMul(xi, y[i])), fr(0));
const vR = x => x.map(c => fr(c));

/* structural time: orthogonal basis of the core, residual, Schur innovation, cycle rank */
function ouResidual(basis, x) {
  let r = x;
  for (const u of basis) { const c = fDiv(vDot(x, u), vDot(u, u)); r = r.map((ri, i) => fSub(ri, fMul(c, u[i]))); }
  return r;
}
function ouBetti(nv, edges) {
  const p = [...Array(nv).keys()], f = i => (p[i] === i ? i : (p[i] = f(p[i])));
  edges.forEach(([a, b]) => { p[f(a)] = f(b); });
  const c = new Set([...Array(nv).keys()].map(f)).size;
  return edges.length - nv + c;
}
/* the three beats of the chapter's audit: state added (or null), comparisons added */
const OU_E0 = [1, 0, 0, 0], OU_H1 = [1, 1, 0, 0], OU_H2 = [1, 0, 1, 0];
const OU_BEATS = (() => {
  const steps = [{ x: OU_E0, add: false, edges: [] }, { x: OU_H1, add: true, edges: [[0, 1]] }, { x: OU_H2, add: true, edges: [[0, 2], [1, 2]] }];
  const basis = [vR(OU_E0)];
  let nv = 1, E = [], b1 = 0, tau = fr(0);
  return steps.map(s => {
    const x = vR(s.x), r = ouResidual(basis, x), dI = fDiv(vDot(r, r), vDot(x, x));
    if (s.add) { basis.push(r); nv++; }
    E = E.concat(s.edges);
    const nb = ouBetti(nv, E), db = nb - b1; b1 = nb;
    tau = fAdd(tau, fAdd(dI, fr(db)));
    return { x: s.x, r: r.map(c => c[0] / c[1]), dI, db, tau, nv, ne: E.length };
  });
})();

/* the Krylov example: T = cyclic shift on Q⁴ (e_i ↦ e_{i+1}), C = first coordinate, C* y = y e₁ */
const OU_T = [[0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]];
const ouTr = M => M[0].map((_, j) => M.map(r => r[j]));
const ouMV = (M, v) => M.map(r => r.reduce((s, x, j) => s + x * v[j], 0));
function ouRank(rows) {
  const A = rows.map(r => vR(r)); let rank = 0;
  const n = A.length ? A[0].length : 0;
  for (let c = 0; c < n && rank < A.length; c++) {
    let p = A.findIndex((r, i) => i >= rank && r[c][0] !== 0);
    if (p < 0) continue;
    [A[rank], A[p]] = [A[p], A[rank]];
    for (let i = 0; i < A.length; i++) if (i !== rank && A[i][c][0] !== 0) {
      const k = fDiv(A[i][c], A[rank][c]); A[i] = A[i].map((x, j) => fSub(x, fMul(k, A[rank][j])));
    }
    rank++;
  }
  return rank;
}
const OU_KRY = (() => {
  const Ts = ouTr(OU_T), gens = [[1, 0, 0, 0]], dims = [];
  for (let m = 0; m <= 5; m++) { if (m) gens.push(ouMV(Ts, gens[m - 1])); dims.push(ouRank(gens.slice())); }
  return { dims, gens };
})();

/* the sample QRAM instance: depth 2, table D, address a, register r (integers as the additive group) */
const OU_D = [3, 1, 4, 1], OU_A = 2, OU_R = 0;
/* one-hot routing of an enable bit e down the address bits (most significant first) */
function ouRoute(n, a, e) {
  let layer = [e];
  for (let k = n - 1; k >= 0; k--) {
    const bit = (a >> k) & 1;
    layer = layer.flatMap(w => (bit ? [false, w] : [w, false]));
  }
  return layer;
}
const OU_LEAF = ouRoute(2, OU_A, true);
const OU_READ = OU_LEAF.reduce((s, on, i) => s + (on ? OU_D[i] : 0), 0);

/* the memory split at u = 1/3 */
const OU_U = fr(1, 3);
const OU_U2 = fMul(OU_U, OU_U);
const OU_V = fDiv(fMul(fr(2), OU_U), fAdd(fr(1), OU_U2));
const OU_TL = fDiv(fSub(fr(1), OU_U2), fAdd(fr(1), OU_U2));
const OU_KT = fMul(OU_TL, OU_TL), OU_KS = fMul(OU_V, OU_V);
const OU_GAM = fDiv(fAdd(fr(1), OU_U2), fSub(fr(1), OU_U2));
const OU_GV = fDiv(fMul(fr(2), OU_U), fSub(fr(1), OU_U2));

/* overconstraint surplus and the one-generation traces */
const ouBin2 = N => N * (N - 1) / 2;
const OU_DE = [3, 4, 5, 6, 7, 8].map(N => ({ N, v: ouBin2(N) - (3 * N - 6) }));
/* one Weyl generation, both chiralities, colour multiplicity: [multiplicity, T₃, Q] */
const OU_WEYL = [
  [1, fr(1, 2), fr(0)], [1, fr(-1, 2), fr(-1)], [1, fr(0), fr(-1)], [1, fr(0), fr(0)],                    /* ν_L, e_L, e_R, ν_R */
  [3, fr(1, 2), fr(2, 3)], [3, fr(-1, 2), fr(-1, 3)], [3, fr(0), fr(2, 3)], [3, fr(0), fr(-1, 3)]       /* u_L, d_L, u_R, d_R */
];
const ouTrace = k => OU_WEYL.reduce((s, st) => fAdd(s, fMul(fr(st[0]), fMul(st[k], st[k]))), fr(0));
const OU_T3 = ouTrace(1), OU_Q2 = ouTrace(2), OU_SW = fDiv(OU_T3, OU_Q2);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('the-observer-as-the-universe film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(OU_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(OU_LEAN).length}`);
  for (const [, [gid, short]] of Object.entries(OU_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. CLOCK: the chapter's values, and a second route (direct integer residuals, b₁ by edges − vertices + 1) */
  {
    const b = OU_BEATS;
    check(fEq(b[0].dI, 0) && b[0].db === 0 && fEq(b[0].tau, 0), 'beat 1: Δτ = 0');
    check(fEq(b[1].dI, 1, 2) && b[1].db === 0 && fEq(b[1].tau, 1, 2), 'beat 2: τ = 1/2');
    check(fEq(b[2].dI, 1, 2) && b[2].db === 1 && fEq(b[2].tau, 2), 'beat 3: τ = 2');
    check(b[1].r.join() === '0,1,0,0' && b[2].r.join() === '0,0,1,0', 'residuals (0,1,0,0), (0,0,1,0)');
    /* second route: the core spans coordinates, so the residual is x with those coordinates zeroed */
    const span = [[0], [0, 1], [0, 1, 2]];
    [OU_E0, OU_H1, OU_H2].forEach((x, i) => {
      const before = i === 0 ? [0] : span[i - 1];
      const r = x.map((c, j) => (before.includes(j) ? 0 : c));
      const n = r.reduce((s, c) => s + c * c, 0), d = x.reduce((s, c) => s + c * c, 0);
      check(fEq(b[i].dI, n, d), `beat ${i + 1}: innovation ${n}/${d}`);
    });
    check(3 - 3 + 1 === 1 && b[2].ne === 3 && b[2].nv === 3, 'b₁ = 3 − 3 + 1 = 1');
  }

  /* 2. KRYLOV: dims by rank, and a second route (the generators are the standard basis vectors in turn) */
  {
    const d = OU_KRY.dims;
    check(d.join() === '1,2,3,4,4,4', `Krylov dims ${d.join()}`);
    const strict = d.slice(0, -1).filter((x, m) => d[m + 1] > x).length;
    check(strict === 3 && strict <= 4 - 1, 'strict steps 3 ≤ dim V − rank C = 3');
    const e = OU_KRY.gens.map(g => g.indexOf(1));
    check(e.slice(0, 4).join() === '0,3,2,1' && e[4] === 0 && OU_KRY.gens.every(g => g.filter(x => x).length === 1), '(T*)ᵏ e₁ runs e₁, e₄, e₃, e₂ and cycles back to e₁');
    check(ouRank([[1, 0, 0, 0]]) === 1, 'rank C = 1');
  }

  /* 3. QRAM: one-hot leaves, readout, nothing else changes; second route by direct indexing */
  {
    check(OU_LEAF.join() === 'false,false,true,false', `one-hot leaves ${OU_LEAF.join()}`);
    for (let a = 0; a < 4; a++) { const L = ouRoute(2, a, true); check(L.filter(Boolean).length === 1 && L[a], `route to ${a}`); check(ouRoute(2, a, false).every(x => !x), `disabled route ${a}`); }
    check(OU_READ === OU_D[OU_A] && OU_READ === 4 && OU_R + OU_READ === 4, 'r + D a = 0 + 4 = 4');
  }

  /* 4. SPLIT: the chapter's values at u = 1/3 and the identities; a second route through (q² − p², 2pq) at p = 1, q = 3 */
  {
    check(fEq(OU_V, 3, 5) && fEq(OU_TL, 4, 5), 'v = 3/5, Δτ/Δt = 4/5');
    check(fEq(OU_KT, 16, 25) && fEq(OU_KS, 9, 25) && fEq(fAdd(OU_KT, OU_KS), 1), '16/25 + 9/25 = 1');
    check(fEq(OU_GAM, 5, 4) && fEq(OU_GV, 3, 4), 'γ = 5/4, γv = 3/4');
    check(fEq(fSub(fMul(OU_GAM, OU_GAM), fMul(OU_GV, OU_GV)), 1), 'γ² − (γv)² = 1');
    check(fEq(fMul(OU_GAM, OU_TL), 1) && fEq(fDiv(OU_GV, OU_GAM), 3, 5), 'γ = Δt/Δτ and (γv)/γ = v');
    const p = 1, q = 3;
    check(fEq(OU_TL, q * q - p * p, q * q + p * p) && fEq(OU_V, 2 * p * q, q * q + p * p), 'the (8, 6, 10) triangle');
    for (let k = 1; k < 30; k++) { const u = fr(k, 31), u2 = fMul(u, u), g = fDiv(fAdd(fr(1), u2), fSub(fr(1), u2)), gv = fDiv(fMul(fr(2), u), fSub(fr(1), u2)); check(fEq(fSub(fMul(g, g), fMul(gv, gv)), 1), `hyperbolic identity at u = ${k}/31`); }
  }

  /* 5. GRADIENT: ΔE(N) two ways; the traces and 3/8 two ways */
  {
    OU_DE.forEach(({ N, v }) => check(v === (N - 3) * (N - 4) / 2, `ΔE(${N}) = ${v}`));
    check(OU_DE.map(z => z.v).join() === '0,0,1,3,6,10', 'ΔE(3…8) = 0, 0, 1, 3, 6, 10');
    check(fEq(OU_T3, 2) && fEq(OU_Q2, 16, 3) && fEq(OU_SW, 3, 8), 'Tr T₃² = 2, Tr Q² = 16/3, ratio 3/8');
    const q2 = fMul(fr(2), fAdd(fr(1), fMul(fr(3), fAdd(fr(4, 9), fr(1, 9)))));
    check(fEq(q2, 16, 3), '2(1 + 3(4/9 + 1/9)) = 16/3');
    check(fEq(fDiv(fr(2), fr(16, 3)), 6, 16), '2/(16/3) = 6/16');
  }
});
Object.assign(FILM.speed, { ports: 0.02, clock: 0.014, krylov: 0.016, canvas: 0.006, split: 0.016, gradient: 0.018, tiers: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ouFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function ouRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const sz = p => (p[2] === 'sub' ? size * 0.62 : size);
  const tot = parts.reduce((s, p) => s + tw(p[0], sz(p), fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const p of parts) {
    txt(p[0], cx, y + (p[2] === 'sub' ? size * 0.22 : 0), { size: sz(p), fam, w, c: p[1], a });
    cx += tw(p[0], sz(p), fam, w);
  }
  return cx;
}
const OU_MISSING = new Set();
function ouLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = OU_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!OU_MISSING.has(gid)) { OU_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(o.text || label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function ouTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE OBSERVER AS THE UNIVERSE', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('NO PORTS · STRUCTURAL TIME · STILL CANVAS · MEMORY SPLIT', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}
/* the closed observer: a dashed violet boundary with a small core graph and horizon dots inside */
const OU_CORE = [[0, 0], [-70, -50], [80, -40], [20, 70]];
function ouObserver(cx, cy, R, a, o = {}) {
  if (a <= 0.003) return;
  ctx.save(); ctx.setLineDash([12, 10]); ring(cx, cy, R, C.argued, a * 0.9, 3); ctx.restore();
  ring(cx, cy, R + 14, C.argued, a * 0.25, 1);
  /* horizon: uncrystallized states near the rim */
  for (let i = 0; i < 26; i++) {
    const th = i / 26 * TAU + 0.2 * rnd(i, 3), rr = R * (0.62 + 0.3 * rnd(i, 4));
    dot(cx + rr * Math.cos(th), cy + rr * Math.sin(th), 6 + 3 * rnd(i, 5), 'm', a * (o.horizon == null ? 0.7 : o.horizon));
  }
  /* the crystallized core K₀: a small DAG */
  const k = o.core == null ? 1 : o.core;
  const P = OU_CORE.map(([x, y]) => [cx + x, cy + y]);
  [[0, 1], [0, 2], [1, 2], [2, 3], [0, 3]].forEach(([i, j]) => line(...P[i], ...P[j], C.cyan, a * k * 0.8, 2.5));
  P.forEach(([x, y]) => dot(x, y, 12, 'c', a * k));
}

/* ======================================================================= */
/*                          scene 1 · NO OUTSIDE                             */
/* ======================================================================= */
SCENES.ports = S => {
  const u = S.u;
  ouTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const cx = 560, cy = 500;
  /* line 0: the open-loop box with ports; it fades as line 1 closes the boundary */
  const close = Q(S, 1, 'puts everything', 1.2);
  const bx = a * (1 - close);
  if (bx > 0.003) {
    box(cx - 170, cy - 120, 340, 240, C.white, bx, 2, 'rgba(0,0,0,0.4)');
    txt('S', cx, cy + 18, { size: 60, fam: F.math, w: 700, align: 'center', c: C.white, a: bx });
    const flow = (u * 0.8) % 1;
    arrow(160, cy, cx - 180, cy, C.mag, bx, 4);
    arrow(cx + 180, cy, 960, cy, C.mag, bx, 4);
    dot(lerp(160, cx - 190, flow), cy, 10, 'm', bx);
    dot(lerp(cx + 190, 950, flow), cy, 10, 'm', bx);
    txt('Iₑₓₜ · input', 170, cy - 30, { size: 26, fam: F.math, w: 700, c: C.mag, a: bx });
    txt('Oₑₓₜ · output', 950, cy - 30, { size: 26, fam: F.math, w: 700, align: 'right', c: C.mag, a: bx });
    txt('f : Iₑₓₜ × S → S × Oₑₓₜ', cx, cy + 210, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: bx });
  }
  /* lines 1–3: the closed observer */
  const ob = a * close;
  ouObserver(cx, cy, 280, ob, { core: Q(S, 2, 'a crystallized core', 0.6), horizon: 0.25 + 0.6 * Q(S, 3, 'not yet crystallized', 0.8) });
  if (ob > 0.003) {
    txt('∂S = ∅ · no ports · 没有端口', cx, cy + 340, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ob });
    const hz = Q(S, 3, 'not yet crystallized', 0.8) * ob;
    txt('K₀', cx - 120, cy + 56, { size: 30, fam: F.math, w: 700, c: C.cyan, a: Q(S, 2, 'a crystallized core', 0.6) * ob });
    txt('H₁/₂ = S ∖ V(K₀)', cx, cy - 300, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a: hz });
    const inc = Q(S, 3, 'incoming world', 0.8) * ob;
    for (let i = 0; i < 5; i++) {
      const th = -0.6 + i * 0.3, r0 = 250, r1 = 150;
      arrow(cx + r0 * Math.cos(th), cy + r0 * Math.sin(th), cx + r1 * Math.cos(th), cy + r1 * Math.sin(th), C.mag, inc * 0.8, 2.5);
    }
  }
  /* the pentad */
  const pa = a * Q(S, 2, 'Five parts', 0.6);
  panel(1040, 200, 760, 560, pa, C.argued, 'OBSERVER PENTAD · 观察者五元组 · MODEL');
  if (pa > 0.003) {
    ouRich([['𝔒 = (S, [−,−,−], κ, K₀, Φ', C.white], ['ε', C.white, 'sub'], [')', C.white]], 1070, 290, { size: 34, a: pa });
    const rows = [
      ['S', 'the totality · 可接收全集', 'the totality', C.argued],
      ['[−,−,−]', 'ternary comparison · 三元比较', 'a ternary comparison', C.argued],
      ['κ ∈ ℚ ∩ [0,1]', 'rational fidelity · 有理保真度', 'a fidelity', C.argued],
      ['K₀', 'crystallized core · 结构核', 'a crystallized core', C.cyan],
      ['Φε', 'crystallizing step · 结晶算子', 'a crystallizing step', C.argued]
    ];
    rows.forEach(([sym, name, ph, col], i) => {
      const r = pa * Q(S, 2, ph, 0.5), y = 370 + i * 66;
      const now = r > 0 && (i === 4 || Q(S, 2, rows[i + 1][2], 0.01) <= 0);
      txt(sym, 1070, y, { size: 30, fam: F.math, w: 700, c: now ? C.now : col, a: r });
      txt(name, 1330, y, { size: 22, fam: F.zh, w: 700, c: C.white, a: r });
    });
    txt('no input channel · no background clock · 无外部信道，无背景时钟', 1070, 725, { size: 19, fam: F.zh, w: 700, c: C.dim, a: pa });
  }
};

/* ======================================================================= */
/*                         scene 2 · STRUCTURAL TIME                         */
/* ======================================================================= */
SCENES.clock = S => {
  const a = ouFade(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* left: the comparison graph grows beat by beat */
  const t1 = Q(S, 1, 'Beat one', 0.5), t2 = Q(S, 2, 'Beat two', 0.5), t3 = Q(S, 3, 'Beat three', 0.5);
  const cur = t3 > 0 ? 2 : t2 > 0 ? 1 : t1 > 0 ? 0 : -1;
  const cx = 450, cy = 500;
  const N = [[cx - 180, cy + 130], [cx + 180, cy + 130], [cx, cy - 110]];
  panel(140, 200, 640, 560, a, C.cyan, 'COMPARISON GRAPH · 比较图');
  const tri = Q(S, 3, 'a triangle closes', 0.8);
  if (tri > 0) {
    ctx.save(); ctx.globalAlpha = a * tri * 0.18; ctx.fillStyle = C.now; ctx.beginPath();
    N.forEach((p, i) => (i ? ctx.lineTo(...p) : ctx.moveTo(...p))); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  arrow(N[0][0] + 20, N[0][1], N[1][0] - 22, N[1][1], C.cyan, a * t2, 3);
  arrow(N[0][0] + 10, N[0][1] - 18, N[2][0] - 12, N[2][1] + 20, C.cyan, a * t3, 3);
  arrow(N[1][0] - 10, N[1][1] - 18, N[2][0] + 12, N[2][1] + 20, C.cyan, a * t3, 3);
  /* beat one: the seed re-scanned, a loop on itself that adds nothing */
  if (t1 > 0 && cur === 0) { ctx.save(); ctx.setLineDash([6, 8]); ring(N[0][0], N[0][1] + 38, 30, C.dim, a * t1, 2); ctx.restore(); }
  const lab = [['e₀ = (1,0,0,0)', 0], ['h₁ = (1,1,0,0)', 1], ['h₂ = (1,0,1,0)', 2]];
  dot(N[0][0], N[0][1], 16, cur === 0 ? 'g' : 'c', a);
  dot(N[1][0], N[1][1], 16, cur === 1 ? 'g' : 'c', a * t2);
  dot(N[2][0], N[2][1], 16, cur === 2 ? 'g' : 'c', a * t3);
  txt(lab[0][0], N[0][0], N[0][1] + 100, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  txt(lab[1][0], N[1][0], N[1][1] + 100, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * t2 });
  txt(lab[2][0], N[2][0] + 34, N[2][1] + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * t3 });
  txt('b₁ = |E| − |V| + c', 170, 270, { size: 26, fam: F.math, w: 700, c: C.white, a: a * Q(S, 0, 'plus new cycles', 0.6) });
  if (tri > 0) txt('b₁ = 3 − 3 + 1 = 1', 170, 312, { size: 26, fam: F.math, w: 700, c: C.now, a: a * tri });
  /* right: the formula and the ledger */
  panel(840, 200, 960, 560, a, C.argued, 'STRUCTURAL TIME · 结构时间 τ · MODEL');
  txt('a wall clock ticks anyway · τ moves only with new structure', 870, 268, { size: 20, fam: F.mono, w: 700, c: C.dim, a });
  const fa = a * Q(S, 0, 'Schur innovation', 0.6);
  ouRich([['Δτ = ', C.white], ['|x⊥|² / |x|²', C.cyan], ['  +  ', C.white], ['Δb₁', C.now]], 870, 330, { size: 34, a: fa });
  txt('x⊥ = x minus its projection on the core · 扣去结构核的投影', 870, 372, { size: 19, fam: F.zh, w: 700, c: C.dim, a: fa });
  const head = ['beat', 'residual x⊥', 'ΔI', 'Δb₁', 'τ'], xs = [870, 990, 1370, 1490, 1640];
  head.forEach((h, i) => txt(h, xs[i], 440, { size: 18, fam: F.mono, w: 700, c: C.dim, a: a * t1 }));
  line(870, 455, 1770, 455, C.dim, a * t1 * 0.5, 1);
  const shown = [t1, t2, t3];
  OU_BEATS.forEach((b, i) => {
    const al = a * shown[i], y = 510 + i * 80, now = i === cur;
    if (al <= 0.003) return;
    txt(`${i + 1}`, xs[0] + 10, y, { size: 30, fam: F.math, w: 700, c: now ? C.now : C.white, a: al });
    txt(`(${b.r.join(',')})`, xs[1], y, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: al });
    txt(fs(b.dI), xs[2], y, { size: 30, fam: F.math, w: 700, c: C.cyan, a: al });
    txt(`${b.db}`, xs[3], y, { size: 30, fam: F.math, w: 700, c: b.db ? C.now : C.white, a: al });
    txt(fs(b.tau), xs[4], y, { size: 40, fam: F.math, w: 700, c: now ? C.now : C.white, a: al });
  });
  const zt = a * Q(S, 1, 'no time', 0.5) * (1 - t2);
  txt('idle replay: Δτ = 0 · 空转不生时间', 1320, 730, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: zt });
  const rd = a * Q(S, 3, 'Tau reaches two', 0.5);
  txt('τ : 0 → 1/2 → 2 · computed here from the definition · 按定义屏幕计算', 1320, 730, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: rd });
};

/* ======================================================================= */
/*                           scene 3 · THE CEILING                           */
/* ======================================================================= */
SCENES.krylov = S => {
  const a = ouFade(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  /* left: the tower of dims, m = 0…5 */
  panel(140, 200, 820, 560, a, C.cyan, 'OBSERVABLE KRYLOV TOWER · 可观测克雷洛夫塔');
  ouRich([['Kₘ = span{ (T*)ᵏ C*y : k ≤ m }', C.white]], 170, 272, { size: 28, a: a * at(S, 0, 0.6) });
  txt('T = cyclic shift on ℚ⁴ · C = first coordinate · 循环移位，观测第一个坐标', 170, 312, { size: 19, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'cyclic shift', 0.6) });
  const bx = 220, by = 700, bw = 90, step = 120, unit = 80;
  const dims = OU_KRY.dims, grow = Q(S, 1, 'their sizes run', 3.2);
  line(bx - 30, by, bx + 6 * step - 10, by, C.dim, a * 0.6, 1.5);
  for (let m = 0; m < 6; m++) {
    const show = clamp(grow * 6 - m), x = bx + m * step;
    txt(`m=${m}`, x + bw / 2, by + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * show });
    if (show <= 0) continue;
    const strict = m > 0 && dims[m] > dims[m - 1], stall = m > 0 && !strict;
    for (let k = 0; k < dims[m]; k++) {
      const top = k === dims[m] - 1 && strict;
      const col = top ? C.now : stall ? C.dim : C.cyan;
      box(x, by - (k + 1) * unit + 6, bw, unit - 10, col, a * show, 2, rgba(col, 0.16));
      txt(`e${'₁₂₃₄'[OU_KRY.gens[k].indexOf(1)]}`, x + bw / 2, by - k * unit - 30, { size: 22, fam: F.math, w: 700, align: 'center', c: col, a: a * show });
    }
    txt(`${dims[m]}`, x + bw / 2, by - dims[m] * unit - 14, { size: 32, fam: F.math, w: 700, align: 'center', c: strict ? C.now : C.white, a: a * show });
  }
  /* right: the theorem */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  panel(1010, 200, 790, 560, la, C.lean, 'FROZEN · 冻结定理');
  if (la > 0.003) {
    txt('#{ m : Kₘ < Kₘ₊₁ } ≤ dim V − rank C', 1040, 300, { size: 30, fam: F.math, w: 700, c: C.white, a: la });
    txt('here: 3 ≤ 4 − 1 = 3 · strict steps at m = 0, 1, 2', 1040, 348, { size: 21, fam: F.mono, w: 700, c: C.now, a: la });
    ouLean(1040, 404, 'growth', la, { size: 18 });
    const sa = a * Q(S, 2, 'one stall', 0.6);
    txt('Kₘ = Kₘ₊₁  ⇒  Kₘ₊ᵣ = Kₘ  for all r', 1040, 490, { size: 30, fam: F.math, w: 700, c: C.white, a: sa });
    txt('stall once, stall forever · 停一步，永远停', 1040, 536, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
    ouLean(1040, 590, 'stable', sa, { size: 18 });
  }
  const ma = a * at(S, 3, 0.6);
  if (ma > 0.003) {
    panel(1040, 640, 730, 96, ma, C.argued);
    txt('MODEL · span full ⇒ only new cycles Δb₁ move τ', 1065, 680, { size: 21, fam: F.mono, w: 700, c: C.argued, a: ma });
    txt('张满载体之后，只有新环路推动 τ', 1065, 716, { size: 21, fam: F.zh, w: 700, c: C.argued, a: ma });
  }
};

/* ======================================================================= */
/*                          scene 4 · STATIC CANVAS                          */
/* ======================================================================= */
/* a fixed height field on the canvas: its level curves never move */
const OU_CV = { cx: 470, cy: 486, s: 1 };
const ouLevel = (k, th) => (34 + 40 * k) * (1 + 0.10 * Math.sin(3 * th + 0.7 * k) + 0.05 * Math.cos(5 * th - k));
/* the focus path: from the rim down to the basin, a pure function of the path parameter p */
function ouPath(p, yaw = 0) {
  const k = 6 * (1 - p), th = -2.3 + 2.6 * p + yaw * Math.max(0, p - 0.45);
  const r = ouLevel(k, th);
  return [OU_CV.cx + r * Math.cos(th), OU_CV.cy + 0.78 * r * Math.sin(th)];
}
SCENES.canvas = S => {
  const a = ouFade(S);
  badgeQ(S, [[0, null, 'argued'], [4, 'Lean checks', 'lean']]);
  /* left: the still canvas */
  panel(140, 200, 700, 560, a, C.argued, 'STATIC CANVAS · 静止画布 · MODEL');
  for (let k = 0; k <= 6; k++) {
    ctx.save(); ctx.globalAlpha = a * (0.25 + 0.08 * k); ctx.strokeStyle = C.argued; ctx.lineWidth = 1.6; ctx.beginPath();
    for (let i = 0; i <= 120; i++) { const th = i / 120 * TAU, r = ouLevel(k, th); const x = OU_CV.cx + r * Math.cos(th), y = OU_CV.cy + 0.78 * r * Math.sin(th); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.closePath(); ctx.stroke(); ctx.restore();
  }
  txt('nothing here moves · schematic · 画布纹丝不动，示意', 170, 740, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 0, 0.6) });
  /* the legless sphere rolling down; the yaw opens two side branches */
  const roll = 0.85 * clamp((S.u - lineAt(S, 1).s) / Math.max(1, lineAt(S, 3).s - lineAt(S, 1).s)) + 0.15 * clamp((S.u - lineAt(S, 3).s) / Math.max(1, S.d - lineAt(S, 3).s));
  const yawA = Q(S, 2, 'steer sideways', 0.8);
  if (yawA > 0) [-2.2, 2.2].forEach(y => {
    ctx.save(); ctx.setLineDash([8, 9]); ctx.globalAlpha = a * yawA * 0.8; ctx.strokeStyle = C.mag; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const [x, yy] = ouPath(0.45 + 0.55 * i / 40, y); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
    ctx.stroke(); ctx.restore();
  });
  const ra = a * Q(S, 1, 'focus rolls', 0.6);
  if (ra > 0.003) {
    ctx.save(); ctx.globalAlpha = ra * 0.9; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 60; i++) { const [x, y] = ouPath(roll * i / 60); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
    const [x, y] = ouPath(roll);
    ring(x, y, 24, C.now, ra, 3);
    dot(x, y, 16, 'g', ra);
    /* rolling marker inside the sphere */
    const sp = roll * 18;
    line(x, y, x + 20 * Math.cos(sp), y + 20 * Math.sin(sp), C.now, ra, 2);
    txt('focus · 焦点', x + 34, y - 26, { size: 22, fam: F.zh, w: 700, c: C.now, a: ra });
    txt('no legs · no floor · ∂S = ∅', 170, 270, { size: 22, fam: F.mono, w: 700, c: C.argued, a: ra });
  }
  if (yawA > 0) txt('yaw u ∈ ℚ · 有理偏航', 170, 308, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * yawA });
  /* right: the reversible QRAM, depth 2 */
  const qa = a * Q(S, 3, 'a query', 0.6);
  panel(890, 200, 910, 560, qa, Q(S, 4, 'Lean checks', 0.3) > 0 ? C.lean : C.cyan, 'REVERSIBLE QRAM · 可逆路由查询 · depth n = 2');
  if (qa <= 0.003) return;
  const root = [1345, 290], mid = [[1145, 400], [1545, 400]], leaves = [1045, 1245, 1445, 1645];
  const route = Q(S, 3, 'reads a static table', 1.6);
  const bit1 = (OU_A >> 1) & 1, bit0 = OU_A & 1;
  mid.forEach((m, j) => line(root[0], root[1] + 18, m[0], m[1] - 18, j === bit1 ? C.now : C.dim, qa * (j === bit1 ? clamp(route * 3) : 0.5), j === bit1 ? 4 : 2));
  mid.forEach((m, j) => [0, 1].forEach(b => {
    const li = 2 * j + b, on = j === bit1 && b === bit0;
    line(m[0], m[1] + 18, leaves[li], 500, on ? C.now : C.dim, qa * (on ? clamp(route * 3 - 1) : 0.5), on ? 4 : 2);
  }));
  chip(root[0], root[1], 120, 40, 'a = 10₂', C.now, qa, 20);
  mid.forEach(m => dot(m[0], m[1], 10, 'c', qa));
  const tab = Q(S, 3, 'static table', 0.6) * qa;
  leaves.forEach((x, i) => {
    const on = OU_LEAF[i] && route >= 0.67;
    box(x - 70, 512, 140, 70, on ? C.now : C.cyan, tab, 2, 'rgba(0,0,0,0.5)');
    txt(`D[${i}] = ${OU_D[i]}`, x, 556, { size: 24, fam: F.mono, w: 700, align: 'center', c: on ? C.now : C.white, a: tab });
    txt(`${i.toString(2).padStart(2, '0')}₂`, x, 610, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: tab });
  });
  const la = Q(S, 4, 'Lean checks', 0.6) * qa;
  ouRich([['query(a, clean, r = ', C.white], [`${OU_R}`, C.white], [')  =  (a, clean, ', C.white], [`${OU_R} + D a = ${OU_R + OU_READ}`, C.now], [')', C.white]], 920, 668, { size: 25, a: Q(S, 4, 'adds D of a', 0.6) * qa });
  txt('table D, address a, workspace: unchanged · 表、地址、工作区不变', 920, 704, { size: 19, fam: F.zh, w: 700, c: C.white, a: Q(S, 4, 'changes nothing else', 0.6) * qa });
  txt('sample table · computed here · 样例表，屏幕计算', 1770, 238 + 0, { size: 15, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: tab });
  ouLean(920, 742, 'qram', la, { size: 18, text: 'ReversibleQram.correctness' });
};

/* ======================================================================= */
/*                           scene 5 · MEMORY SPLIT                          */
/* ======================================================================= */
SCENES.split = S => {
  const a = ouFade(S);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  const fv = x => x[0] / x[1];
  /* left: the unit step split along the window and its complement */
  panel(140, 200, 780, 560, a, C.cyan, 'MEMORY WINDOW · 记忆窗口');
  const ox = 330, oy = 690, R = 400;
  const sp = at(S, 1, 0.8);
  line(ox - 20, oy, ox + R + 70, oy, C.cyan, a * 0.6, 1.5);
  line(ox, oy + 20, ox, oy - R - 40, C.mag, a * 0.6, 1.5);
  ouRich([['inside W', C.cyan], ['M', C.cyan, 'sub'], [' : time · 窗内 = 时间', C.cyan]], 890, 272, { size: 21, fam: F.zh, align: 'right', a: a * sp });
  ouRich([['outside W', C.mag], ['M', C.mag, 'sub'], [' : space · 窗外 = 空间', C.mag]], 890, 310, { size: 21, fam: F.zh, align: 'right', a: a * sp });
  ctx.save(); ctx.globalAlpha = a * 0.4; ctx.strokeStyle = C.dim; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ox, oy, R, -Math.PI / 2, 0); ctx.stroke(); ctx.restore();
  const val = Q(S, 2, 'Take u equal', 1.0);
  /* before line 2 the step sweeps the quarter arc; then it settles on (4/5, 3/5) */
  const th0 = Math.atan2(fv(OU_V), fv(OU_TL)), th = lerp(0.25 + 0.5 * (0.5 + 0.5 * Math.sin(S.u * 1.3)), th0, val);
  const px = ox + R * Math.cos(th), py = oy - R * Math.sin(th);
  arrow(ox, oy, px, py, C.now, a * at(S, 1, 0.6), 4);
  dashed(px, py, px, oy, C.mag, a * sp, 2);
  dashed(px, py, ox, py, C.cyan, a * sp * 0.6, 1.5);
  line(ox, oy, px, oy, C.cyan, a * sp, 6);
  line(ox, oy, ox, py, C.mag, a * sp, 6);
  const nv = a * Q(S, 2, 'the time leg', 0.6);
  txt(`Δτ/Δt = ${fs(OU_TL)}`, (ox + px) / 2, oy + 44, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: nv });
  txt(`v = ${fs(OU_V)}`, ox - 18, (oy + py) / 2, { size: 28, fam: F.math, w: 700, align: 'right', c: C.mag, a: a * Q(S, 2, 'v is three fifths', 0.6) });
  txt('unit step · 单位步', px + 18, py - 14, { size: 20, fam: F.zh, w: 700, c: C.now, a: a * at(S, 1, 0.6) });
  /* right: the rational ledger */
  panel(970, 200, 830, 560, a, C.argued, 'RATIONAL SPLIT · 有理切分 · u = 1/3');
  const l2 = a * Q(S, 2, 'Take u equal', 0.6);
  ouRich([['u = 1/3   ', C.now], ['v = 2u/(1+u²) = ', C.white], [fs(OU_V), C.mag]], 1000, 280, { size: 30, a: l2 });
  ouRich([['Δτ/Δt = (1−u²)/(1+u²) = ', C.white], [fs(OU_TL), C.cyan]], 1000, 330, { size: 30, a: a * Q(S, 2, 'the time leg', 0.6) });
  const l3 = a * Q(S, 3, 'The shares', 0.6);
  ouRich([['κ', C.white], ['time', C.white, 'sub'], [' + κ', C.white], ['space', C.white, 'sub'], [' = ', C.white], [fs(OU_KT), C.cyan], [' + ', C.white], [fs(OU_KS), C.mag], [' = 1', C.now]], 1000, 405, { size: 32, a: l3 });
  const l4 = a * Q(S, 4, 'Move space', 0.6);
  ouRich([['Δτ² + Δx² = Δt²  ⇒  Δτ² = Δt² ', C.white], ['−', C.now], [' Δx²', C.white]], 1000, 480, { size: 30, a: l4 });
  ouRich([['γ = ', C.white], [fs(OU_GAM), C.now], ['    γv = ', C.white], [fs(OU_GV), C.now]], 1000, 545, { size: 32, a: a * Q(S, 4, 'gamma squared', 0.6) });
  const l5 = a * Q(S, 4, 'gamma squared', 0.6, 0.8);
  ouRich([['(5/4)² − (3/4)² = (25 − 9)/16 = ', C.white], ['1', C.now]], 1000, 610, { size: 30, a: l5 });
  txt('no √ · no cosh · 不开方，无双曲超越函数', 1000, 655, { size: 21, fam: F.zh, w: 700, c: C.dim, a: l5 });
  txt('numbers computed here · time/space reading is MODEL', 1000, 712, { size: 18, fam: F.mono, w: 700, c: C.argued, a: l3 });
  txt('数值屏幕计算 · 时间/空间的读法是模型', 1000, 740, { size: 18, fam: F.zh, w: 700, c: C.argued, a: l3 });
};

/* ======================================================================= */
/*                           scene 6 · ONE GRADIENT                          */
/* ======================================================================= */
SCENES.gradient = S => {
  const a = ouFade(S);
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued'], [2, null, 'computed'], [4, 'under an equal-weight postulate', 'argued']]);
  /* top band: the action and the five-domain reading */
  ouRich([['S', C.white], ['Ω', C.white, 'sub'], [' = 2 Σ (1 − κₜ) ∈ ℚ', C.white]], 140, 230, { size: 38, a: a * at(S, 0, 0.6) });
  txt('the step action with fidelity alone · 只用保真度的作用量', 140, 272, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 0, 0.6) });
  const ma = a * Q(S, 1, 'reads gravity', 0.6);
  const doms = ['gravity · 引力', 'particles · 粒子', 'learning · 学习'];
  doms.forEach((d, i) => chip(1110 + i * 220, 236, 186, 50, d.split(' · ')[0], C.argued, ma * Q(S, 1, d.split(' · ')[0], 0.4), 20));
  txt('one gradient ∇κ · MODEL · 同一条梯度，模型', 1330, 296, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * Q(S, 1, 'That is a model', 0.5) });
  /* left: ΔE(N) */
  const ea = a * Q(S, 2, 'Some counts are exact', 0.6);
  panel(140, 330, 900, 450, ea, C.cyan, 'OVERCONSTRAINT · 过约束盈余 ΔE(N)');
  if (ea > 0.003) {
    ouRich([['ΔE(N) = C(N,2) − (3N − 6) = (N−3)(N−4)/2', C.white]], 170, 400, { size: 28, a: ea });
    const bars = Q(S, 3, 'The surplus', 2.4), bx = 220, by = 720, step = 130, unit = 24;
    line(bx - 30, by, bx + 6 * step - 20, by, C.dim, ea * 0.6, 1.5);
    OU_DE.forEach(({ N, v }, i) => {
      const s = clamp(bars * 6 - i), x = bx + i * step, first = v > 0 && OU_DE[i - 1].v === 0;
      const col = first ? C.now : v > 0 ? C.mag : C.cyan;
      txt(`N=${N}`, x + 40, by + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ea });
      if (s <= 0) return;
      const h = Math.max(4, v * unit * s);
      box(x, by - h, 80, h, col, ea * s, 2, rgba(col, 0.2));
      txt(`${v}`, x + 40, by - h - 12, { size: 34, fam: F.math, w: 700, align: 'center', c: col, a: ea * s });
    });
    txt('0 up to a tetrahedron · first surplus at N = 5', 170, 446, { size: 20, fam: F.mono, w: 700, c: C.now, a: ea * Q(S, 3, 'then one at five', 0.5) });
  }
  /* right: the trace ratio */
  const ta = a * at(S, 4, 0.6);
  panel(1080, 330, 720, 450, ta, C.argued, 'ONE GENERATION · 一代费米子');
  if (ta > 0.003) {
    ouRich([['Tr T₃² = ', C.white], [fs(OU_T3), C.cyan]], 1110, 410, { size: 32, a: ta });
    ouRich([['Tr Q² = 2(1 + 3(4/9 + 1/9)) = ', C.white], [fs(OU_Q2), C.cyan]], 1110, 470, { size: 28, a: ta });
    ouRich([['sin²θ', C.white], ['W', C.white, 'sub'], [' = 2 ÷ 16/3 = ', C.white], [fs(OU_SW), C.now]], 1110, 560, { size: 38, a: a * Q(S, 4, 'three eighths', 0.6) });
    const pa = a * Q(S, 4, 'under an equal-weight postulate', 0.6);
    txt('traces computed here; equal weights are a', 1110, 640, { size: 20, fam: F.mono, w: 700, c: C.argued, a: pa });
    txt('MODEL postulate · 等权迹刚度是模型公设', 1110, 674, { size: 20, fam: F.zh, w: 700, c: C.argued, a: pa });
  }
};

/* ======================================================================= */
/*                           scene 7 · THREE COLOURS                         */
/* ======================================================================= */
SCENES.tiers = S => {
  const a = ouFade(S);
  badgeQ(S, [[0, null, 'lean'], [1, null, 'argued'], [2, null, 'open']]);
  const cols = [
    { x: 140, col: C.lean, head: 'LEAN ✓ · checked · 已检验', k: 0, rows: ['Krylov growth ≤ dim V − rank C', 'stall once ⇒ stall forever', 'zero-write QRAM query'] },
    { x: 700, col: C.argued, head: 'MODEL · reading · 诠释', k: 1, rows: ['observer ≡ universe', 'still holographic canvas', 'equal-weight trace postulate', 'ternion field transformer'] },
    { x: 1260, col: C.open, head: 'OPEN · 开放问题', k: 2, rows: ['Einstein field equations', 'from ternary comparisons', 'black-hole horizon unitarity'] }
  ];
  cols.forEach(c => {
    const al = a * at(S, c.k, 0.6);
    panel(c.x, 220, 520, 520, al, c.col, c.head);
    c.rows.forEach((r, i) => txt(r, c.x + 30, 320 + i * 64, { size: 24, fam: F.mono, w: 700, c: i === 0 || c.k !== 2 ? C.white : C.white, a: al * at(S, c.k, 0.5, 0.4 + i * 0.35) }));
  });
  const la = a * at(S, 0, 0.6);
  ouLean(170, 580, 'growth', la, { size: 15, text: 'observable_krylov_strict_growth_bound' });
  ouLean(170, 620, 'stable', la, { size: 15, text: 'observable_krylov_once_stable_permanently' });
  ouLean(170, 660, 'qram', la, { size: 15, text: 'ReversibleQram.correctness' });
  txt('every number in this film is computed here · 片中数值均为屏幕计算', W / 2, 800, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * at(S, 2, 0.6, 1.0) });
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.start + 6;
  background(t, sc, 0, 6);
  ouObserver(1360, 540, 300, 0.95, { core: 1, horizon: 0.8 });
  txt(DATA.film.title_zh, 620, 450, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE OBSERVER', 620, 560, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('AS THE UNIVERSE', 620, 630, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  txt(`${DATA.book.code} · FILM`, 620, 340, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 10 });
};
