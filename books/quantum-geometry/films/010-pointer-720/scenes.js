/* Film 010 · p = *p: pointers, page tables and 720° · p = *p：指针、页表与 720°
   (book quantum-geometry, part X, chapters 37–39). Scenes for theme/film/engine.js.

   What the film shows, and on what footing:
     REGRESS  a page table that is itself in memory needs another table to be read ........ model (chapter 38, MODEL)
     WALK     the chapter's N = 4 recursive page directory (ex-ch38-recursive-page-table-dereference): P at 0x1000,
              P[0] = 0x1000 (its own address), P[i] = addr T_i, T_1[j] = 0x7000 + 0x1000 j. The walk
              Walk(b, [i₁, …, i_L]) = Walk(Mem[b][i₁], [i₂, …]) is computed here; the paging scheme itself is a
              literature result (rem-ch38-x86-recursive-page-table-literature), so the scene is badged NUM.
     DIAG     (read beside the self-address loop, which meets the first theorem only when a whole row captures the
              diagonal, as chapter 38 says) the diagonal d(f, g)(a) = f(g(a, a)) on a 4 × 4 table of values in Z/4 (computed here), and the two
              Lean theorems of chapter 38 (thm-ch38-self-mapped-diagonal-fixed-point, also cited in chapter 39):
                EscapeCount.diagonal_landing_fixed:          g a₀ = diagonal f g  →  f (g a₀ a₀) = g a₀ a₀
                QualitativeEscape.self_application_fragment_package: if f has no fixed point, diagonal f h ∉ range h
                  for every table h (no finiteness assumed).
     TURN     the rotor R(ϑ) = cos(ϑ/2) − sin(ϑ/2) e₂e₃ and the Euclidean vector J = R e₃ R̃ = cos ϑ e₃ − sin ϑ e₂
              (ex-ch39-even-clifford-spinor-bilinear-fierz: literature, badged ARGUED), recomputed here with a small
              Clifford algebra Cl(3, 0); then the squaring double cover of the circle and its lift w = e^{iϑ/2}
              (CircleDoubleCoverHistoryLift.circle_double_cover_history_lift: the lift of the full turn from 1 is
              unique and ends at −1, thm-ch39-double-cover-no-section-and-720-lift). The second turn back to +1 is
              computed here. The cover is drawn as a solid: the one-sided band of the lab page
              self-sustaining-spinor-flow, from the same model (viz/self-sustaining-spinor-flow/model.js), its centre
              line the circle of z and the flag of ψ the lift w; labels fade where the band hides their point.
     SEAM     square roots chosen continuously every 30° (each the root nearest the last) come back reversed:
              CircleDoubleCoverNoSection.no_continuous_global_section (same theorem box of chapter 39).
   On load, FILM.init recomputes every number printed on screen and checks the citations; any disagreement is pushed
   to window.FILM_ERRORS, which stops the render. */
'use strict';

const PT_DEG = Math.PI / 180;
const PT_LEAN = {
  diagonal_landing_fixed: 'D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed',
  self_application_fragment_package: 'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package',
  no_continuous_global_section: 'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section',
  circle_double_cover_history_lift: 'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift'
};

/* ======================================================================= */
/*                    the page directory of chapter 38 (N = 4)               */
/* ======================================================================= */
const PT = (() => {
  const N = 4, P = 0x1000;
  const T = i => 0x1000 * (i + 1);                         // addr T_i = 0x2000, 0x3000, 0x4000
  const D = (i, j) => 0x7000 + 0x4000 * (i - 1) + 0x1000 * j; // T_i[j] = addr D_{i,j}; T_1 = 0x7000 … 0xA000
  const mem = new Map();                                     // address → slots (absent for data frames)
  mem.set(P, Array.from({ length: N }, (_, i) => (i === 0 ? P : T(i))));
  for (let i = 1; i < N; i++) mem.set(T(i), Array.from({ length: N }, (_, j) => D(i, j)));
  /* Walk_L(b, [i₁, …, i_L]): one dereference per index; hops[k] = { from, slot, to } */
  function walk(idx, b = P) {
    const hops = [];
    for (const i of idx) {
      const slots = mem.get(b);
      if (!slots) throw new Error(`0x${b.toString(16)} is a data frame, not a table`);
      hops.push({ from: b, slot: i, to: slots[i] });
      b = slots[i];
    }
    return { end: b, hops };
  }
  const hex = n => '0x' + n.toString(16).toUpperCase();
  return { N, P, T, D, mem, walk, hex };
})();
const PT_WALKS = [[1, 2], [0, 1], [0, 0], [0, 0, 0, 0]].map(idx => Object.assign({ idx }, PT.walk(idx)));

/* ======================================================================= */
/*                     the diagonal on a 4 × 4 table over Z/4                */
/* ======================================================================= */
const DG = (() => {
  const n = 4;
  const f1 = y => (y + 1) % 4;               // moves every value: no fixed point
  const f2 = y => (3 * y + 2) % 4;           // fixed points 1 and 3
  const g1 = [[2, 0, 3, 1], [1, 3, 0, 2], [0, 2, 1, 3], [3, 1, 2, 0]];
  const diag = (f, g) => g.map((_, a) => f(g[a][a]));
  const a0 = 2;
  /* g2: g1 with row a₀ replaced by the diagonal of f2; its own cell must be a fixed point of f2 */
  const g2 = g1.map(r => r.slice());
  for (let a = 0; a < n; a++) if (a !== a0) g2[a0][a] = f2(g1[a][a]);
  g2[a0][a0] = 1;
  return { n, f1, f2, g1, g2, a0, diag, d1: diag(f1, g1), d2: diag(f2, g2) };
})();

/* ======================================================================= */
/*        Cl(3, 0) by basis-blade bitmasks, for the rotor and the current     */
/* ======================================================================= */
const CL = (() => {
  const bits = m => { let c = 0; while (m) { c += m & 1; m >>= 1; } return c; };
  /* sign of e_A e_B for blades A, B (bitmasks over e₁ = 1, e₂ = 2, e₃ = 4), all squares +1 */
  const sgn = (A, B) => { let s = 0; for (let a = A >> 1; a; a >>= 1) s += bits(a & B); return s & 1 ? -1 : 1; };
  const mul = (x, y) => { const z = new Array(8).fill(0); for (let A = 0; A < 8; A++) if (x[A]) for (let B = 0; B < 8; B++) if (y[B]) z[A ^ B] += sgn(A, B) * x[A] * y[B]; return z; };
  const rev = x => x.map((v, A) => { const k = bits(A); return (k * (k - 1) / 2) % 2 ? -v : v; });
  const blade = (A, v = 1) => { const z = new Array(8).fill(0); z[A] = v; return z; };
  const add = (x, y) => x.map((v, i) => v + y[i]);
  const sc = (s, x) => x.map(v => s * v);
  const E2 = blade(2), E3 = blade(4), E23 = blade(6);
  const rotor = th => add(blade(0, Math.cos(th / 2)), sc(-Math.sin(th / 2), E23));   // cos(ϑ/2) − sin(ϑ/2) e₂e₃
  const J = th => { const R = rotor(th); return mul(mul(R, E3), rev(R)); };
  return { mul, rev, blade, add, sc, E2, E3, E23, rotor, J };
})();

/* the lift of the full turn: w(ϑ) = e^{iϑ/2}; flags every 30°, each the square root nearest the last */
const PT_FLAGS = (() => {
  const out = [{ th: 0, w: [1, 0] }];
  for (let k = 1; k <= 12; k++) {
    const th = 30 * k * PT_DEG, r = [Math.cos(th / 2), Math.sin(th / 2)], prev = out[k - 1].w;
    const pick = r[0] * prev[0] + r[1] * prev[1] >= 0 ? r : [-r[0], -r[1]];   // the root nearest the previous flag
    out.push({ th, w: pick });
  }
  return out;
})();

const ptN = (x, d = 2) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '+') + Math.abs(v).toFixed(d); };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('pointer film: ' + m); };
  const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  if (lean.length !== Object.keys(PT_LEAN).length) fail(`film.json cites ${lean.length} declarations, expected ${Object.keys(PT_LEAN).length}`);
  for (const [short, gid] of Object.entries(PT_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    if (r.kind !== 'theorem') fail(`${gid} is not a theorem at the pinned commit`);
    if (r.short !== short) fail(`${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the walks against the chapter's table */
  const want = { '1,2': 0x9000, '0,1': 0x2000, '0,0': 0x1000, '0,0,0,0': 0x1000 };
  for (const w of PT_WALKS) if (w.end !== want[w.idx.join()]) fail(`Walk [${w.idx}] = ${PT.hex(w.end)}`);
  if (PT_WALKS[0].hops[0].to !== 0x2000 || PT_WALKS[1].hops[0].to !== 0x1000) fail('first hops');
  /* every walk of zeros stays at the directory, at any depth; [0, i] returns T_i and [i, j] returns D_{i,j} */
  for (let L = 1; L <= 8; L++) if (PT.walk(new Array(L).fill(0)).end !== PT.P) fail(`zeros of length ${L}`);
  for (let i = 1; i < PT.N; i++) {
    if (PT.walk([0, i]).end !== PT.T(i)) fail(`[0, ${i}]`);
    for (let j = 0; j < PT.N; j++) if (PT.walk([i, j]).end !== PT.D(i, j)) fail(`[${i}, ${j}]`);
  }
  if (PT.mem.get(PT.P)[0] !== PT.P) fail('P[0] is not addr P');
  if (PT.D(1, 2) !== 0x9000 || PT.T(1) !== 0x2000) fail('T₁ or D₁,₂ address');

  /* 2. the diagonal: escape for f1 (no fixed point), landing for f2 */
  const { n, f1, f2, g1, g2, a0, diag } = DG;
  for (let y = 0; y < 4; y++) if (f1(y) === y) fail('f1 has a fixed point');
  if ([0, 1, 2, 3].filter(y => f2(y) === y).join() !== '1,3') fail('fixed points of f2');
  const d1 = diag(f1, g1);
  for (let a = 0; a < n; a++) if (d1[a] === g1[a][a]) fail(`d1 agrees with row ${a} at entry ${a}`);
  if (g1.some(r => r.every((v, j) => v === d1[j]))) fail('d1 is a row of g1');
  const d2 = diag(f2, g2);
  if (!g2[a0].every((v, j) => v === d2[j])) fail('row a₀ of g2 is not the diagonal of f2');
  if (f2(g2[a0][a0]) !== g2[a0][a0]) fail('the landing cell is not a fixed point');
  for (let a = 0; a < n; a++) if (a !== a0 && g2[a].join() !== g1[a].join()) fail('g2 changed another row');
  /* the theorem's contrapositive on every 4 × 4 table whose row 0 is its own diagonal (sampled): cell (0,0) fixed */
  for (let s = 0; s < 64; s++) {
    const g = Array.from({ length: 4 }, (_, a) => Array.from({ length: 4 }, (_, b) => Math.floor(rnd(s, 4 * a + b) * 4)));
    for (let b = 1; b < 4; b++) g[0][b] = f2(g[b][b]);
    g[0][0] = f2(g[0][0]) === g[0][0] ? g[0][0] : 3;
    if (diag(f2, g).join() !== g[0].join() || f2(g[0][0]) !== g[0][0]) fail('landing check');
  }

  /* 3. the rotor and the current: J = R e₃ R̃ = cos ϑ e₃ − sin ϑ e₂, J² = 1, R(2π) = −1, R(4π) = +1 */
  for (let k = 0; k <= 144; k++) {
    const th = 4 * Math.PI * k / 144, J = CL.J(th), R = CL.rotor(th);
    const f = CL.add(CL.sc(Math.cos(th), CL.E3), CL.sc(-Math.sin(th), CL.E2));
    if (J.some((v, i) => !near(v, f[i], 1e-12))) fail(`J formula at ϑ = ${(th / PT_DEG).toFixed(1)}°`);
    const J2 = CL.mul(J, J);
    if (!near(J2[0], 1) || J2.slice(1).some(v => !near(v, 0))) fail('J² ≠ 1');
    const RR = CL.mul(R, CL.rev(R));
    if (!near(RR[0], 1) || RR.slice(1).some(v => !near(v, 0))) fail('R R̃ ≠ 1');
  }
  const R2 = CL.rotor(2 * Math.PI), R4 = CL.rotor(4 * Math.PI), J2 = CL.J(2 * Math.PI);
  if (!near(R2[0], -1) || !near(R2[6], 0) || !near(R4[0], 1) || !near(R4[6], 0)) fail('R(2π) or R(4π)');
  if (!near(J2[4], 1) || !near(J2[2], 0)) fail('J does not return at 360°');

  /* 4. the lift w = e^{iϑ/2} of z = e^{iϑ}: w² = z along the way, w(0) = 1, w(2π) = −1, w(4π) = 1 */
  for (let k = 0; k <= 144; k++) {
    const th = 4 * Math.PI * k / 144, w = [Math.cos(th / 2), Math.sin(th / 2)];
    if (!near(w[0] * w[0] - w[1] * w[1], Math.cos(th)) || !near(2 * w[0] * w[1], Math.sin(th))) fail('w² ≠ z');
  }
  /* the flags: continuous choice (each within 90° of the last), equal to e^{iϑ/2}, and the last one reversed */
  PT_FLAGS.forEach((F_, k) => {
    const w = F_.w;
    if (!near(w[0], Math.cos(F_.th / 2)) || !near(w[1], Math.sin(F_.th / 2))) fail(`flag ${k} is not e^{iϑ/2}`);
    if (!near(w[0] * w[0] - w[1] * w[1], Math.cos(F_.th)) || !near(2 * w[0] * w[1], Math.sin(F_.th))) fail(`flag ${k} is not a square root`);
    if (k && w[0] * PT_FLAGS[k - 1].w[0] + w[1] * PT_FLAGS[k - 1].w[1] <= 0) fail(`flag ${k} jumps`);
  });
  const last = PT_FLAGS[12].w;
  if (!near(last[0], -1) || !near(last[1], 0)) fail('the last flag is not −1');
  if (ptN(Math.cos(Math.PI)) !== '−1.00' || ptN(Math.cos(2 * Math.PI)) !== '+1.00') fail('printed signs');
});
Object.assign(FILM.speed, { regress: 0.02, walk: 0.014, diag: 0.016, turn: 0.02, seam: 0.016, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
/* coloured runs on one baseline: parts = [[text, colour], …] */
function ptRich(parts, x, y, o = {}) {
  const size = o.size || 28, fam = o.fam || F.mono, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
/* a small violet label naming the footing of what is drawn (MODEL / LITERATURE) */
function ptTag(x, y, s, a) {
  if (a <= 0.003) return;
  const w = tw(s, 15, F.mono, 700, 2) + 24;
  box(x, y - 22, w, 30, C.argued, a, 1.5, 'rgba(0,0,0,0.45)');
  txt(s, x + 12, y - 2, { size: 15, fam: F.mono, w: 700, c: C.argued, a, ls: 2 });
}
/* LEAN ✓ chip for a cited theorem, by short name */
function ptLean(x, y, short, a, size = 19) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) return;
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function ptHead(x, y, ang, col, a, L = 14, w = 2.5) {
  line(x, y, x - L * Math.cos(ang - 0.42), y - L * Math.sin(ang - 0.42), col, a, w);
  line(x, y, x - L * Math.cos(ang + 0.42), y - L * Math.sin(ang + 0.42), col, a, w);
}
/* quadratic Bézier from p to q through control c, drawn up to fraction k, with an arrow head at the end */
function ptBez(p, c, q, col, a, k = 1, lw = 3) {
  if (a <= 0.003 || k <= 0) return;
  const B = s => { const t = s * k, m = 1 - t; return [m * m * p[0] + 2 * m * t * c[0] + t * t * q[0], m * m * p[1] + 2 * m * t * c[1] + t * t * q[1]]; };
  curve(B, 40, col, a, lw);
  const e = B(1), e0 = B(0.95);
  ptHead(e[0], e[1], Math.atan2(e[1] - e0[1], e[0] - e0[0]), col, a, 14, lw);
}

/* page tables on screen: { x, y, w } per table address; slots of 54 px under a 56 px head */
const PT_HEAD = 56, PT_ROW = 54, PT_W = 300;
const PT_LAY = { [0x1000]: { x: 170, y: 250, name: 'P' }, [0x2000]: { x: 600, y: 250, name: 'T₁' },
  [0x3000]: { x: 170, y: 600, name: 'T₂', small: true }, [0x4000]: { x: 170, y: 680, name: 'T₃', small: true },
  [0x9000]: { x: 600, y: 600, name: 'D₁,₂', small: true } };
const ptRowY = (b, i) => PT_LAY[b].y + PT_HEAD + PT_ROW * i;
function ptTable(b, a, o = {}) {
  const L = PT_LAY[b], slots = L.small ? null : PT.mem.get(b);
  const h = PT_HEAD + (slots ? PT_ROW * slots.length : 0);
  box(L.x, L.y, PT_W, h, C.cyan, 0.85 * a, 1.5, 'rgba(4,14,28,0.78)');
  txt(`${L.name}  ·  ${PT.hex(b)}`, L.x + 18, L.y + 38, { size: L.small ? 26 : 28, fam: F.mono, w: 700, c: C.white, a });
  if (!slots) return;
  slots.forEach((v, i) => {
    const y = ptRowY(b, i);
    line(L.x, y, L.x + PT_W, y, C.cyan, 0.35 * a, 1);
    const self = v === b, typed0 = self && o.write != null ? o.write : 1;
    txt(String(i), L.x + 18, y + 37, { size: 26, fam: F.mono, w: 700, c: C.dim, a });
    txt(typed(PT.hex(v), typed0), L.x + PT_W - 20, y + 37, { size: 26, fam: F.mono, w: 700, align: 'right', c: self ? C.cyan : C.white, a: a * (self ? 1 : 0.8) });
  });
}
/* the static wiring: directory slots to their tables, T₁[2] to the data frame */
function ptWires(a) {
  const P = PT_LAY[0x1000], T1 = PT_LAY[0x2000];
  ptBez([P.x + PT_W, ptRowY(0x1000, 1) + 27], [P.x + PT_W + 60, ptRowY(0x1000, 1) - 20], [T1.x, T1.y + 28], C.dim, 0.5 * a, 1, 1.5);
  for (const [i, t] of [[2, 0x3000], [3, 0x4000]]) {
    const L = PT_LAY[t];
    ptBez([P.x + PT_W, ptRowY(0x1000, i) + 27], [P.x + PT_W + 70, L.y], [L.x + PT_W, L.y + 28], C.dim, 0.5 * a, 1, 1.5);
  }
  const D = PT_LAY[0x9000];
  ptBez([T1.x + PT_W, ptRowY(0x2000, 2) + 27], [T1.x + PT_W + 80, D.y - 60], [D.x + PT_W, D.y + 28], C.dim, 0.5 * a, 1, 1.5);
}
/* one walk: hop k runs over [t0 + k·hd, t0 + (k + 1)·hd]; the slot read glows amber, the hop is a cyan arrow */
function ptWalk(S, w, t0, hd, a) {
  if (a <= 0.003) return -1;
  const u = S.u;
  let cur = PT.P, done = -1;
  w.hops.forEach((h, k) => {
    const p = clamp((u - t0 - k * hd) / (hd * 0.8));
    if (p <= 0) return;
    const L = PT_LAY[h.from], y = ptRowY(h.from, h.slot);
    fillBox(L.x + 2, y + 2, PT_W - 4, PT_ROW - 4, C.now, 0.22 * a * (k === w.hops.length - 1 || p < 1 ? 1 : 0.5));
    const from = [L.x + PT_W, y + 27];
    if (h.to === h.from) {
      /* the self hop: loop round the left edge back to the head */
      const s = [L.x, y + 27], e = [L.x, L.y + 28];
      ptBez(s, [L.x - 110 - 8 * k, (s[1] + e[1]) / 2], e, C.cyan, a, ease(p), 3);
    } else {
      const T = PT_LAY[h.to];
      if (T.x > L.x) ptBez(from, [from[0] + 70, Math.min(from[1], T.y + 28) - 30], [T.x, T.y + 28], C.cyan, a, ease(p), 3);
      else ptBez(from, [from[0] + 90, (from[1] + T.y + 28) / 2], [T.x + PT_W, T.y + 28], C.cyan, a, ease(p), 3);
    }
    if (p >= 1) { cur = h.to; done = k; }
  });
  if (done === w.hops.length - 1) {
    const L = PT_LAY[cur], h = L.small ? PT_HEAD : PT_HEAD + PT_ROW * 4;
    box(L.x - 6, L.y - 6, PT_W + 12, (L.small ? h : PT_HEAD) + 12, C.now, a, 3);
  }
  return done;
}

/* ======================================================================= */
/*                        scene 1 · WHO READS THE TABLE                       */
/* ======================================================================= */
SCENES.regress = S => {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.3);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 340, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt('p = *p', W / 2, 480, { size: 120, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta * clamp(p * 1.6), ab: 4 });
    txt('指针、页表与 720°', W / 2, 580, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 3 });
    txt(scramble('POINTERS, PAGE TABLES AND 720°', p, 8), W / 2, 650, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  }
  const ma = at(S, 0, 0.8, 0.1) * clamp((S.d - u) / 0.5);
  if (ma <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);

  /* memory: a strip of 16 cells; the pointer reads cell 11 through the page table T₁, which lives in cell 3 */
  const x0 = 170, cw = 52, y0 = 700, ch = 64, ptr = 11, home = [3, 6, 9, 13];
  for (let i = 0; i < 16; i++) box(x0 + i * cw, y0, cw - 6, ch, C.cyan, 0.5 * ma, 1.2, 'rgba(4,14,28,0.6)');
  txt('memory · 内存', x0, y0 + ch + 40, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ma });
  const cx = i => x0 + i * cw + (cw - 6) / 2;
  /* the pointer and its read */
  const qr = Q(S, 0, 'reads memory', 0.6) * ma;
  ctx.globalAlpha = qr; ctx.fillStyle = C.now; ctx.beginPath();
  ctx.moveTo(cx(ptr), y0 - 18); ctx.lineTo(cx(ptr) - 14, y0 - 44); ctx.lineTo(cx(ptr) + 14, y0 - 44); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
  txt('*ptr', cx(ptr), y0 - 56, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.now, a: qr });
  fillBox(x0 + ptr * cw, y0, cw - 6, ch, C.now, 0.35 * qr);
  /* the tower of tables: T₁ (full), then T₂, T₃, T₄ … shrinking up and to the right */
  const tower = [[340, 500, 260, 72], [560, 380, 210, 60], [740, 280, 170, 50], [880, 200, 130, 42]];
  const names = ['T₁', 'T₂', 'T₃', 'T₄'];
  const qt = Q(S, 0, 'through a page table', 0.6) * ma;
  const qa = [qt, Q(S, 1, 'A bigger table', 0.6) * ma, Q(S, 1, 'needs another', 0.5) * ma, Q(S, 1, 'and another', 0.5) * ma];
  tower.forEach(([x, y, w, h], k) => {
    const a = qa[k];
    if (a <= 0) return;
    box(x, y, w, h, C.cyan, a, 1.5, 'rgba(4,14,28,0.8)');
    txt(names[k], x + w / 2, y + h * 0.66, { size: h * 0.5, fam: F.mono, w: 700, align: 'center', c: C.white, a });
    /* T_k is itself a cell of memory: a magenta tie down to its home cell */
    const qh = k === 0 ? Q(S, 0, 'lives in memory too', 0.6) * ma : a;
    dashed(x + w / 2, y + h, cx(home[k]), y0, C.mag, 0.7 * qh, 1.6);
    fillBox(x0 + home[k] * cw, y0, cw - 6, ch, C.mag, 0.3 * qh);
    if (k) arrow(x, y + h / 2, tower[k - 1][0] + tower[k - 1][2], tower[k - 1][1] + 10, C.cyan, 0.8 * a, 2);
  });
  /* T₁ translates the pointer: ptr → T₁ → cell */
  arrow(cx(ptr) - 50, y0 - 66, tower[0][0] + tower[0][2] - 30, tower[0][1] + tower[0][3] + 6, C.cyan, qt, 2.5);
  const qe = Q(S, 1, 'without end', 0.6) * ma;
  txt('⋯', 1035, 190, { size: 48, fam: F.math, w: 700, c: C.mag, a: qe });
  txt('?', 1090, 196, { size: 56, fam: F.orb, w: 900, c: C.mag, a: qe, ab: 2 });

  /* the ledger of the regress */
  const x = 1200, y = 230, w = 600, h = 520;
  panel(x, y, w, h, ma, C.cyan, 'WHO READS THE TABLE · 谁来查表');
  ptTag(x + w - 230, y + 72, 'MODEL · 模型诠释', ma);
  ptRich([['*ptr', C.now], [' = Mem[ T₁(ptr) ]', C.white]], x + 30, y + 150, { size: 28, a: qt });
  ptRich([['T₁', C.cyan], ['   = Mem[ T₂(addr T₁) ]', C.white]], x + 30, y + 210, { size: 28, a: qa[1] });
  ptRich([['T₂', C.cyan], ['   = Mem[ T₃(addr T₂) ]', C.white]], x + 30, y + 270, { size: 28, a: qa[2] });
  ptRich([['T₃', C.cyan], ['   = Mem[ T₄(addr T₃) ]', C.white]], x + 30, y + 330, { size: 28, a: qa[3] });
  txt('⋯ an outside reader, with no end', x + 30, y + 410, { size: 24, fam: F.mono, w: 700, c: C.mag, a: qe });
  txt('表外的读者，无穷倒退', x + 30, y + 462, { size: 28, fam: F.zh, w: 700, c: C.mag, a: qe });
};

/* ======================================================================= */
/*                              scene 2 · SLOT ZERO                          */
/* ======================================================================= */
SCENES.walk = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const write = Q(S, 0, 'own address', 0.9);
  ptWires(a);
  for (const b of [0x1000, 0x2000, 0x3000, 0x4000, 0x9000]) ptTable(b, a, { write });
  /* slot zero being written */
  if (write < 1) { const y = ptRowY(0x1000, 0); box(PT_LAY[0x1000].x - 4, y - 2, PT_W + 8, PT_ROW + 4, C.now, a * clamp(write * 4), 3); }

  /* which walk is on: [1, 2] in line 1, [0, 1] in line 2, [0, 0] then [0, 0, 0, 0] in line 3 */
  const L1 = lineAt(S, 1), L2 = lineAt(S, 2), L3 = lineAt(S, 3);
  const t1 = phraseAt(S, 1, 'takes two hops'), t2 = L2.s + 0.3, t3 = L3.s + 0.4, t4 = phraseAt(S, 3, 'The address') - 0.2;
  const on = (s, e) => clamp((u - s) / 0.3) * clamp((e - u) / 0.3);
  const dn = [
    ptWalk(S, PT_WALKS[0], t1, 1.1, a * on(t1, L2.s)),
    ptWalk(S, PT_WALKS[1], t2, 1.3, a * on(t2, L3.s)),
    ptWalk(S, PT_WALKS[2], t3, 0.9, a * on(t3, t4)),
    ptWalk(S, PT_WALKS[3], t4, 0.55, a * on(t4, S.d + 1))
  ];
  if (u > t4 && dn[3] >= 0) txt(`×${dn[3] + 1}`, PT_LAY[0x1000].x - 70, PT_LAY[0x1000].y - 14, { size: 30, fam: F.mono, w: 700, c: C.cyan, a });

  /* the ledger: one row per walk, as in the chapter's table */
  const x = 1060, y = 210, w = 760, h = 620;
  panel(x, y, w, h, a, C.cyan, 'Walk · 逐跳解引用  (N = 4)');
  ptTag(x + w - 300, y + 72, 'LITERATURE · 文献结果', a);
  ptRich([['P[0]', C.white], [' = ', C.white], ['0x1000', C.cyan], [' = addr P', C.white]], x + 30, y + 120, { size: 28, a: a * write });
  const rows = [[0, t1, 'D₁,₂'], [1, t2, 'T₁'], [2, t3, 'P'], [3, t4, 'P']];
  rows.forEach(([k, t0, what], r) => {
    const wk = PT_WALKS[k], ry = y + 200 + r * 92, qa = clamp((u - t0) / 0.4) * a;
    if (qa <= 0) return;
    const fin = clamp((u - t0 - wk.hops.length * [1.1, 1.3, 0.9, 0.55][k]) / 0.4);
    txt(`[${wk.idx.join(', ')}]`, x + 30, ry, { size: 26, fam: F.mono, w: 700, c: C.now, a: qa });
    const hops = wk.hops.length <= 2
      ? wk.hops.map(h => `${PT_LAY[h.from].name}[${h.slot}] = ${PT.hex(h.to)}`).join('  →  ')
      : `${PT_LAY[wk.hops[0].from].name}[0] = ${PT.hex(wk.hops[0].to)}  ×${wk.hops.length}`;
    txt(hops, x + 30, ry + 38, { size: 22, fam: F.mono, w: 700, c: C.white, a: qa * 0.9 });
    ptRich([['→ ', C.white], [`${PT.hex(wk.end)}  ${what}`, C.now]], x + w - 30 - tw(`→ ${PT.hex(wk.end)}  ${what}`, 26, F.mono, 700), ry, { size: 26, a: qa * fin });
  });
  const qp = Q(S, 3, 'p equals star p', 0.6) * a;
  ptRich([['p = ', C.cyan], ['*p', C.now], [' = 0x1000', C.cyan]], x + w / 2, y + h - 34, { size: 40, align: 'center', a: qp });
};

/* ======================================================================= */
/*                              scene 3 · DIAGONAL                           */
/* ======================================================================= */
SCENES.diag = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean has checked', 'lean']]);
  const L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  const sw = ease(clamp((u - L2.s + 0.2) / 0.8));          // 0: table g with f(y) = y + 1; 1: table g′ with f(y) = 3y + 2
  const gx = 250, gy = 270, c = 96, n = DG.n;
  const val = (a_, b) => (sw < 0.5 ? DG.g1 : DG.g2)[a_][b];
  const fnow = sw < 0.5 ? DG.f1 : DG.f2, dnow = sw < 0.5 ? DG.d1 : DG.d2;
  /* column and row labels */
  for (let b = 0; b < n; b++) txt(String(b), gx + b * c + c / 2, gy - 18, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt('g a b', gx - 20, gy - 18, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  for (let r = 0; r < n; r++) txt(`a=${r}`, gx - 20, gy + r * c + c / 2 + 9, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  /* the sweep of line 1: row a against the new row at entry a */
  const sweep = clamp((u - phraseAt(S, 1, 'the new row differs') + 0.2) / 3.2) * 4;
  const ka = Math.min(3, Math.floor(sweep)), sweeping = u > phraseAt(S, 1, 'the new row differs') - 0.2 && sw < 0.5;
  const rowA = sw > 0.5 ? DG.a0 : sweeping ? ka : -1;
  for (let r = 0; r < n; r++) for (let b = 0; b < n; b++) {
    const x = gx + b * c, y = gy + r * c;
    const morph = r === DG.a0 ? Math.abs(sw - 0.5) * 2 : 1;
    box(x + 3, y + 3, c - 6, c - 6, C.cyan, 0.45 * a, 1.2, 'rgba(4,14,28,0.7)');
    txt(String(val(r, b)), x + c / 2, y + c / 2 + 14, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * morph });
  }
  if (rowA >= 0) box(gx - 4, gy + rowA * c - 4, n * c + 8, c + 8, C.now, a * (sw > 0.5 ? Q(S, 2, 'some row', 0.5) : 1), 3);
  /* the diagonal, read in line 0 */
  const qd = Q(S, 0, 'read the diagonal', 1.2);
  for (let k = 0; k < n; k++) {
    const p = clamp(qd * 4 - k);
    if (p > 0) box(gx + k * c + 8, gy + k * c + 8, c - 16, c - 16, C.now, a * p, 2.5);
  }
  /* the new row d(a) = f(g(a, a)), magenta: the value that would escape */
  const ny = gy + n * c + 34, qn = Q(S, 0, 'apply f', 1.0);
  txt('f(g a a)', gx - 20, ny + c / 2 + 9, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: a * qn });
  for (let k = 0; k < n; k++) {
    const p = clamp(qn * 4 - k) * a;
    const x = gx + k * c;
    box(x + 3, ny + 3, c - 6, c - 6, C.mag, 0.8 * p, 2, 'rgba(30,4,28,0.6)');
    const morph = Math.abs(sw - 0.5) * 2;
    txt(String(dnow[k]), x + c / 2, ny + c / 2 + 14, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p * morph });
  }
  /* sweeping: the clash at entry a */
  if (sweeping) for (let k = 0; k <= ka; k++) {
    const x = gx + k * c + c / 2;
    txt('≠', x, gy + n * c + 26, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * clamp(sweep - k) * (1 - sw * 2) });
  }
  stamp('ESCAPES', 820, gy + 1.5 * c, Q(S, 1, 'It escapes', 0.5) * a * (1 - clamp(sw * 3)), C.mag, 24, -0.06);
  /* the landing cell in line 2 */
  const ql = Q(S, 2, 'is a fixed point', 0.5) * a * sw;
  if (ql > 0) {
    const x = gx + DG.a0 * c + c / 2, y = gy + DG.a0 * c + c / 2;
    ring(x, y, 40 + 20 * (1 - ql), C.now, ql, 3.5);
    const v = DG.g2[DG.a0][DG.a0];
    txt(`f(${v}) = ${DG.f2(v)}`, gx + n * c + 30, y + 10, { size: 30, fam: F.mono, w: 700, c: C.now, a: ql });
  }

  /* the panel: the two maps and the two theorems */
  const x = 1000, y = 200, w = 800, h = 630;
  panel(x, y, w, h, a, C.cyan, 'DIAGONAL · 对角线');
  ptRich([['d(a) = f( g a a )', C.white]], x + 30, y + 86, { size: 30, a: a * Q(S, 0, 'apply f', 0.6) });
  const a1 = a * (1 - sw), a2 = a * sw;
  ptRich([['f(y) = y + 1 mod 4', C.white]], x + 30, y + 150, { size: 26, a: a1 });
  txt('no fixed point · 没有不动点', x + 30, y + 190, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a1 });
  ptRich([['d(a) ≠ g a a', C.mag], ['  ⇒  d ∉ range g', C.white]], x + 30, y + 250, { size: 26, a: a1 * Q(S, 1, 'differs from row a', 0.6) });
  ptRich([['f(y) = 3y + 2 mod 4', C.white]], x + 30, y + 150, { size: 26, a: a2 });
  txt('fixed points 1 and 3 · 不动点 1 与 3', x + 30, y + 190, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a2 });
  ptRich([[`g ${DG.a0} = d`, C.now], ['  ⇒  ', C.white], [`f(g ${DG.a0} ${DG.a0}) = g ${DG.a0} ${DG.a0}`, C.now]], x + 30, y + 250, { size: 26, a: a2 * Q(S, 2, 'is the diagonal', 0.6) });
  /* the Lean box */
  const qL = Q(S, 3, 'Lean has checked', 0.6) * a;
  panel(x + 20, y + 320, w - 40, 290, qL, C.lean, 'FOR ANY TYPES A, Y · 任意类型');
  ptRich([['g a₀ = diagonal f g  →  f (g a₀ a₀) = g a₀ a₀', C.white]], x + 44, y + 390, { size: 22, a: qL });
  ptLean(x + 44, y + 434, 'diagonal_landing_fixed', qL);
  ptRich([['(∀ y, f y ≠ y)  →  ∀ h, diagonal f h ∉ range h', C.white]], x + 44, y + 510, { size: 22, a: qL });
  ptLean(x + 44, y + 554, 'self_application_fragment_package', qL);
};

/* ======================================================================= */
/*                              scene 4 · HALF TURN                          */
/* ======================================================================= */
/* ϑ in degrees: 0 through line 0, 0 → 360 in line 1, held in line 2, 360 → 720 in line 3 */
function ptTheta(S) {
  const L1 = lineAt(S, 1), L3 = lineAt(S, 3);
  const k1 = ease(clamp((S.u - L1.s - 0.2) / Math.max(1, L1.e - L1.s - 1.2)));
  const k3 = ease(clamp((S.u - L3.s - 0.1) / Math.max(1, L3.e - L3.s + 0.2)));
  return 360 * k1 + 360 * k3;
}
/* The double cover as a solid: the one-sided band of the lab page self-sustaining-spinor-flow, drawn by the same model
   (viz/self-sustaining-spinor-flow/model.js, QG_SPINOR_BAND). The band is laid level (the page's e₁e₂ plane, axis
   n = e₃) and starts at the front, so its centre line at bearing a₀ + ϑ is the circle of z = e^{iϑ} (cyan) and the flag
   of ψ planted there runs along w = cos(ϑ/2) n + sin(ϑ/2) r, the lift w = e^{iϑ/2}: up at the start (w = +1), down
   over the same point after 360° (w = −1), up again after 720°. */
const PT_PL = { a: [1, 0, 0], b: [0, 1, 0], n: [0, 0, 1] }, PT_A0 = -1.5;
const PT_BAND_VIEW = { yaw: -0.6, pitch: 0.42 };
/* the band shot in the rectangle r = { x, y, w, h, unit } at the lift angle th (degrees); returns the 2D anchors */
function ptBandShot(key, r, a, th) {
  const B = QG_SPINOR_BAND, t = Math.min(th * PT_DEG, 2 * TAU - 1e-9);
  const sh = solid(key, Object.assign({}, PT_BAND_VIEW, r));
  sh.begin();
  B.draw(sh, PT_PL, PT_A0, 0, { color: C.vio, grid: { every: [4, 2] } });
  /* the circle of z: the band's centre line, a cyan tube a little thicker than the slab, seen on either face */
  const base = [];
  for (let i = 0; i <= 120; i++) base.push(B.frame(PT_PL, TAU * i / 120, PT_A0).c);
  sh.tube('base', base, { color: C.cyan, r: B.TH * 1.3, glow: 0.45 });
  sh.line([[0, 0, -1.1], [0, 0, 1.1]], { color: C.dim, width: 1.4, alpha: 0.7, dash: [8, 6] });
  /* the edge the flag's tip has run along (solid) and still has to run along (dashed) */
  const edge = u => B.edgeAt(PT_PL, Math.min(u, 2 * TAU - 1e-9), PT_A0, 0, 0.012).p;
  if (t > 1e-3) { const tr = [], k = Math.max(2, Math.ceil(t / (2 * PT_DEG))); for (let j = 0; j <= k; j++) tr.push(edge(t * j / k)); sh.tube('trail', tr, { color: C.argued, width: 5, glow: 1.1 }); }
  if (t < 2 * TAU - 1e-3) { const rest = [], k = Math.max(2, Math.ceil((2 * TAU - t) / (2 * PT_DEG))); for (let j = 0; j <= k; j++) rest.push(edge(t + (2 * TAU - t) * j / k)); sh.line(rest, { color: C.argued, width: 1.6, alpha: 0.55, dash: [4, 6] }); }
  /* the flags of ψ: at the start (dashed) and now */
  const f0 = t > 0.05 ? B.flag(sh, PT_PL, 0, PT_A0, 0, { color: C.argued, width: 2.6, dash: [6, 5] }) : null;
  const f = B.flag(sh, PT_PL, t, PT_A0, 0, { color: C.argued, width: 4 });
  /* the two points over z = 1, the point z = w² now, and the tip of the lift now */
  const plus = B.edgeAt(PT_PL, 0, PT_A0, 0, 0.05).p, minus = B.edgeAt(PT_PL, TAU, PT_A0, 0, 0.05).p;
  sh.bead(plus, { color: C.white, r: 6 }); sh.bead(minus, { color: C.white, r: 6 });
  const z = B.frame(PT_PL, t, PT_A0).c, tip = B.edgeAt(PT_PL, t, PT_A0, 0, 0.03).p;
  sh.bead(z, { color: C.cyan, r: 8 });
  sh.bead(tip, { color: C.now, r: 9 });
  sh.end(a);
  /* z lies inside the slab, on the cyan tube: hidden only when another part of the band is in front of it */
  return { sh, f0, f, plus: sh.anchor(plus), minus: sh.anchor(minus), z: sh.anchor(z, 0.12), tip: sh.anchor(tip) };
}
/* the 2D labels of the band shot, faded where the band hides their point */
function ptBandLabels(B, a) {
  if (a <= 0) return;
  const vis = q => (q.hidden ? 0.35 : 1);
  txt('w = +1', B.plus.x - 22, B.plus.y - 6, { size: 24, fam: F.math, w: 700, align: 'right', c: C.white, a: a * vis(B.plus) });
  txt('w = −1', B.minus.x - 22, B.minus.y + 20, { size: 24, fam: F.math, w: 700, align: 'right', c: C.white, a: a * vis(B.minus) });
  txt('z = w²', B.z.x + 22, B.z.y + 34, { size: 24, fam: F.math, w: 700, c: C.cyan, a: a * vis(B.z) });
}
SCENES.turn = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'Lift one full turn', 'lean'], [3, null, 'computed']]);
  const th = ptTheta(S), t = th * PT_DEG;
  /* right, first (the 2D labels go on top): the band, the circle of z and the flag of ψ */
  const ab = a * Q(S, 0, 'turn a spinor', 0.8);
  const band = ab > 0.003 ? ptBandShot('band', { x: 960, y: 380, w: 860, h: 470, unit: 172 }, ab, th) : null;
  /* left: the e₂e₃ plane and the current J = cos ϑ e₃ − sin ϑ e₂ (Cl(3, 0), recomputed every frame) */
  const cx = 430, cy = 520, R = 220, J = CL.J(t);
  ring(cx, cy, R, C.cyan, 0.35 * a, 1.5);
  dashed(cx, cy + R + 20, cx, cy - R - 30, C.dim, 0.5 * a, 1.2);
  dashed(cx - R - 30, cy, cx + R + 30, cy, C.dim, 0.5 * a, 1.2);
  txt('e₃', cx - 50, cy - R - 34, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  txt('e₂', cx - R - 64, cy + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  /* screen: e₃ up, e₂ to the left, so J = (cos ϑ, sin ϑ) in (up, right) */
  const jx = cx - J[2] * R, jy = cy - J[4] * R;
  if (th > 0.5) curve(k => [cx - (-Math.sin(t * k)) * R * 0.32, cy - Math.cos(t * k) * R * 0.32], Math.max(8, Math.ceil(th / 6)), C.cyan, 0.7 * a, 2);
  arrow(cx, cy, jx, jy, C.cyan, a, 5);
  txt('J', jx + 16, jy - 10, { size: 34, fam: F.math, w: 700, c: C.cyan, a });
  txt('J = ψ e₃ ψ̃ = cos ϑ e₃ − sin ϑ e₂', cx, cy + R + 80, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  ptTag(120, 228, 'LITERATURE · 文献结果', a);
  ptTag(120, 278, 'MODEL · 模型诠释', a * (1 - Q(S, 1, 'The vector J', 0.5)));

  if (band) ptBandLabels(band, ab);
  /* readouts */
  const rx = 960, ry = 205;
  const c2 = Math.cos(t / 2), jUp = Math.cos(t);
  txt(`ϑ = ${th.toFixed(0)}°`, rx, ry, { size: 32, fam: F.mono, w: 700, c: C.now, a });
  ptRich([['J · e₃ = cos ϑ = ', C.white], [ptN(jUp), C.cyan]], rx, ry + 46, { size: 24, a });
  ptRich([['⟨ψ⟩₀ / √ρ = cos(ϑ/2) = ', C.white], [ptN(c2), C.argued]], rx, ry + 88, { size: 24, fam: F.math, a: a * Q(S, 1, 'Psi itself', 0.6) });
  const sign = Math.abs(th - 360) < 0.5 ? 'ψ = −ψ₀' : th > 719.5 ? 'ψ = +ψ₀' : '';
  txt(sign, rx + 260, ry + 2, { size: 38, fam: F.math, w: 700, c: C.argued, a, ab: 2 });
  const qL = Q(S, 2, 'Lift one full turn', 0.6) * a * (1 - Q(S, 3, 'A second turn', 0.6));
  ptRich([['lifted(0) = 1,  lifted(1) = −1', C.white]], rx, ry + 132, { size: 24, a: qL });
  ptLean(rx, ry + 170, 'circle_double_cover_history_lift', qL);
  const q3 = Q(S, 3, 'seven hundred', 0.6) * a;
  ptRich([['after 720°: w = e^{i·360°} = ', C.white], ['+1', C.now]], rx, ry + 132, { size: 24, a: q3 * clamp((th - 700) / 20) });
};

/* ======================================================================= */
/*                              scene 5 · NO SECTION                          */
/* ======================================================================= */
SCENES.seam = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean has checked', 'lean']]);
  const cx = 540, cy = 520, R = 250;
  ring(cx, cy, R, C.cyan, 0.75 * a, 2.5);
  txt('z = 1', cx + R + 16, cy + 46, { size: 24, fam: F.math, w: 700, c: C.cyan, a });
  txt('the circle of z · z 的圆周', cx, cy + R + 70, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* flags appear one by one during line 1; screen angle counter-clockwise */
  const t0 = phraseAt(S, 1, 'Plant a root'), dt = Math.max(0.25, (phraseAt(S, 1, 'Back at the start') - t0 + 0.6) / 12);
  const nf = Math.min(12, Math.floor((u - t0) / dt));
  const qf = Q(S, 0, 'choose one square root', 0.6);
  PT_FLAGS.forEach((fl, k) => {
    if (k > Math.max(0, nf) || (k > 0 && u < t0)) return;
    if (k === 0 && qf <= 0) return;
    const px = cx + R * Math.cos(fl.th), py = cy - R * Math.sin(fl.th);
    const ang = Math.atan2(fl.w[1], fl.w[0]), L = 74, ex = px + L * Math.cos(ang), ey = py - L * Math.sin(ang);
    const cur = k === nf && k > 0;
    const col = cur ? C.now : C.argued, aa = a * (k === 0 ? qf : 1);
    if (k === 0) { dashed(px, py, ex, ey, C.argued, aa, 3); ptHead(ex, ey, Math.atan2(ey - py, ex - px), C.argued, aa, 14, 3); }
    else arrow(px, py, ex, ey, col, aa, cur || k === 12 ? 4 : 3);
    dot(px, py, 8, cur ? 'g' : 'v', aa);
  });
  const qEnd = Q(S, 1, 'points the other way', 0.5) * a;
  if (qEnd > 0) { ring(cx + R, cy, 34, C.mag, qEnd, 3); }
  /* panel: the roots so far */
  const x = 1060, y = 200, w = 760, h = 630;
  panel(x, y, w, h, a, C.cyan, 'SQUARE ROOTS · 平方根');
  txt('each root is the one nearest the last', x + 30, y + 74, { size: 21, fam: F.mono, w: 700, c: C.dim, a: a * qf });
  txt('每一面都选离上一面最近的那个根', x + 30, y + 110, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * qf });
  const shown = Math.max(0, nf);
  const first = Math.max(0, shown - 5);
  for (let k = first; k <= shown; k++) {
    const fl = PT_FLAGS[k], ry = y + 170 + (k - first) * 44;
    if (k > 0 && u < t0) break;
    ptRich([[`ϑ = ${String(Math.round(fl.th / PT_DEG)).padStart(3, ' ')}°`, C.white], ['   w = ', C.white], [`${ptN(fl.w[0])} ${fl.w[1] < -0.005 ? '−' : '+'} ${Math.abs(fl.w[1]).toFixed(2)}i`, k === shown && k > 0 ? C.now : C.argued]], x + 30, ry, { size: 24, a: a * (k === 0 ? qf : 1) });
  }
  const qc = qEnd;
  ptRich([['w₁₂ = −1', C.argued], ['  ≠  ', C.mag], ['w₀ = +1', C.argued], ['   (both square to 1)', C.white]], x + 30, y + 470, { size: 24, a: qc });
  const qL = Q(S, 2, 'Lean has checked', 0.6) * a;
  ptRich([['¬ ∃ s : Circle → Circle, Continuous s ∧ ∀ z, s(z)² = z', C.white]], x + 30, y + 540, { size: 21, a: qL });
  ptLean(x + 30, y + 590, 'no_continuous_global_section', qL);
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                    poster                                 */
/* ======================================================================= */
FILM.poster = () => {
  const t = 60.0, si = 3;
  background(t, TL.scenes[si], si, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.16, cx: 1360, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the band with most of a first turn of the lift drawn, under the title */
  ptBandLabels(ptBandShot('poster', { x: 120, y: 520, w: 880, h: 440, unit: 168 }, 1, 300), 1);
  /* the self-mapped directory */
  const keepP = PT_LAY[0x1000];
  PT_LAY[0x1000] = { x: 1340, y: 560, name: 'P' };
  ptTable(0x1000, 1);
  const yr = ptRowY(0x1000, 0);
  ptBez([1340, yr + 27], [1230, (yr + 27 + 588) / 2], [1340, 588], C.cyan, 1, 1, 3);
  box(1334, 554, PT_W + 12, PT_HEAD + 12, C.now, 1, 3);
  PT_LAY[0x1000] = keepP;
  const cx = 960;
  txt('p = *p', cx, 230, { size: 110, fam: F.mono, w: 700, align: 'center', c: C.cyan, ab: 4 });
  txt('指针、页表与 720°', cx, 345, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 3 });
  txt('POINTERS, PAGE TABLES AND 720°', cx, 420, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, cx, 470, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 6 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, TL.scenes[si]);
  post(3);
};
