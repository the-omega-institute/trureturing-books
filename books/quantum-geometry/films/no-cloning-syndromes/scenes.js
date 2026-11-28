/* Film · Can't copy it? Hide it in a room · 复印不了，就藏进房间
   (book quantum-geometry, chapter 14). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     copy     a photocopier (analogy, argued); a unitary as a turntable for arrows: the overlap z of two arrows
              is unchanged while the disc turns (argued picture, the invariance computed); the two overlaps
              ⟨φ⊗b, ψ⊗b⟩ = z·1 and ⟨φ⊗φ, ψ⊗ψ⟩ = z·z (computed, the inner product of pure tensors).
     numbers  z = 0.6: 0.6 in, 0.36 out; the angle arccos 0.6 = 53.13° would have to open to arccos 0.36 = 68.90°;
              the gap z − z² on [0, 1] vanishes only at 0 and 1, largest 1/4 at z = 1/2 (computed).
     theorem  NoCloningInnerProductCriterion.no_cloning_inner_product_criterion (LEAN): one unitary (linear isometric equivalence) U of
              H ⊗ H, unit ψ, φ, blank, exact cloning of both ⟹ z = z² ∧ (φ = ψ ∨ z = 0); CNOT copies |0⟩, |1⟩ and not
              |+⟩ (computed); the closing maxim is a reading of the theorem (argued).
     rooms    the three-bit repetition code: α|0⟩ + β|1⟩ ↦ α|000⟩ + β|111⟩; S_j = E_j V for E ∈ {I, X1, X2, X3} split
              C⁸ into four 2-dimensional rooms with S_i* S_j = δ_ij I (computed; rooms drawn as a sketch);
              X2 carries the code state whole into room (−,−); the keys are an analogy for S_i* (argued).
     nudge    the unitary R = cos θ I − i sin θ X2 with cos²θ = 0.7 gives σ = [[0.7, 0.458 i], [−0.458 i, 0.3]]
              (computed); decoding kills the cross terms and returns (0.7 + 0.3) ρ = ρ (computed)
              ..... OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery (LEAN): for any σ, ρ and orthogonal
              syndromes, decode(encode(σ, ρ)) = Tr(σ) • ρ.
     edge     the criterion is necessary only; near copies (Bužek–Hillery, 5/6) are a literature result (argued);
              Z1 commutes with both checks and flips |+_L⟩ to |−_L⟩ (computed); here the four rooms fill ℂ⁸ (Σ S_i S_i* = I₈, computed), so the keys already form a channel;
              a channel on the whole space needs the complement piece (chapter 14.3).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number shown on screen by an
   independent route: tensor overlaps of random complex unit vectors, the angles, the gap curve, the eight-dimensional
   code matrices, the recovery identity for random complex σ and ρ, the nudge, the phase flip and CNOT. Any
   disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const NC_DEG = Math.PI / 180;
const NC_LEAN = {
  no_cloning_inner_product_criterion: 'D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion',
  orthogonal_syndrome_recovery: 'D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery'
};
const NC_Z = 0.6;
const NC_TH0 = Math.acos(NC_Z), NC_TH1 = Math.acos(NC_Z * NC_Z);          // 53.13°, 68.90°
const NC_PHI = mix(C.white, C.dim, 0.45);                                 // φ: the second state, not the current one
const NC_P0 = 0.7, NC_P1 = 0.3, NC_X = Math.sqrt(NC_P0 * NC_P1);           // σ weights and |σ01| = √0.21
/* complex numbers [re, im] and complex matrices as arrays of rows */
const cz = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  conj: a => [a[0], -a[1]],
  abs: a => Math.hypot(a[0], a[1])
};
const cm = {
  zero: (r, c) => Array.from({ length: r }, () => Array.from({ length: c }, () => [0, 0])),
  mul: (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => cz.add(s, cz.mul(x, B[k][j])), [0, 0]))),
  adj: A => A[0].map((_, j) => A.map(row => cz.conj(row[j]))),
  add: (A, B) => A.map((row, i) => row.map((x, j) => cz.add(x, B[i][j]))),
  scale: (s, A) => A.map(row => row.map(x => cz.mul(s, x))),
  dist: (A, B) => Math.max(...A.map((row, i) => Math.max(...row.map((x, j) => cz.abs(cz.add(x, cz.mul([-1, 0], B[i][j]))))))),
  eye: n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [i === j ? 1 : 0, 0]))
};
/* the three-bit code: basis index b1 b2 b3 (b1 most significant); X_k flips bit k */
const ncFlip = (k, idx) => idx ^ (1 << (3 - k));
const ncV = () => { const V = cm.zero(8, 2); V[0][0] = [1, 0]; V[7][1] = [1, 0]; return V; };
const ncE = k => { const E = cm.zero(8, 8); for (let i = 0; i < 8; i++) E[k ? ncFlip(k, i) : i][i] = [1, 0]; return E; };
const NC_ROOMS = [0, 1, 2, 3].map(k => cm.mul(ncE(k), ncV()));             // S_0 = V, S_k = X_k V
const ncEncode = (S, sig, rho) => { let M = cm.zero(8, 8); for (let j = 0; j < S.length; j++) for (let k = 0; k < S.length; k++) M = cm.add(M, cm.scale(sig[j][k], cm.mul(cm.mul(S[j], rho), cm.adj(S[k])))); return M; };
const ncDecode = (S, M) => S.reduce((acc, Si) => cm.add(acc, cm.mul(cm.mul(cm.adj(Si), M), Si)), cm.zero(2, 2));
/* the syndrome (g1 = Z1Z2, g2 = Z2Z3) of a basis index */
const ncBit = (idx, k) => (idx >> (3 - k)) & 1;
const ncSyn = idx => [ncBit(idx, 1) ^ ncBit(idx, 2), ncBit(idx, 2) ^ ncBit(idx, 3)];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('no-cloning-syndromes film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(NC_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(NC_LEAN).length}`);
  for (const [short, gid] of Object.entries(NC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. COPY: overlaps of pure tensors, ⟨a⊗b, c⊗d⟩ = ⟨a, c⟩⟨b, d⟩, on random complex unit vectors */
  const ip = (a, b) => a.reduce((s, x, i) => cz.add(s, cz.mul(cz.conj(x), b[i])), [0, 0]);
  const unit = a => { const n = Math.sqrt(a.reduce((s, x) => s + x[0] * x[0] + x[1] * x[1], 0)); return a.map(x => [x[0] / n, x[1] / n]); };
  const tens = (a, b) => a.flatMap(x => b.map(y => cz.mul(x, y)));
  for (let k = 0; k < 40; k++) {
    const n = 2 + (k % 3), rv = s => unit(Array.from({ length: n }, (_, i) => [2 * rnd(k, s + i) - 1, 2 * rnd(k, s + 10 + i) - 1]));
    const psi = rv(0), phi = rv(30), bl = rv(60), z = ip(phi, psi);
    check(cz.abs(cz.add(ip(tens(phi, bl), tens(psi, bl)), cz.mul([-1, 0], z))) < 1e-12, `z · 1 = z ${k}`);
    check(cz.abs(cz.add(ip(tens(phi, phi), tens(psi, psi)), cz.mul([-1, 0], cz.mul(z, z)))) < 1e-12, `z · z ${k}`);
    /* a rigid turn (a unitary) keeps the overlap: a random 2×2 unitary on the first two coordinates */
    const t = TAU * rnd(k, 90), c = Math.cos(t), s = Math.sin(t);
    const turn = a => a.map((x, i) => (i === 0 ? cz.add(cz.mul([c, 0], x), cz.mul([-s, 0], a[1])) : i === 1 ? cz.add(cz.mul([s, 0], a[0]), cz.mul([c, 0], x)) : x));
    check(cz.abs(cz.add(ip(turn(phi), turn(psi)), cz.mul([-1, 0], z))) < 1e-12, `turn keeps overlap ${k}`);
  }
  /* 2. NUMBERS */
  check(near(NC_Z * NC_Z, 0.36), '0.6² = 0.36');
  check(Math.abs(NC_TH0 / NC_DEG - 53.13) < 0.005 && Math.abs(NC_TH1 / NC_DEG - 68.90) < 0.005, 'angles 53.13°, 68.90°');
  let gmax = -1, garg = 0;
  for (let i = 0; i <= 1000; i++) { const z = i / 1000, g = z - z * z; check(g >= 0 && (g > 0 || i === 0 || i === 1000), `gap at ${z}`); if (g > gmax) { gmax = g; garg = z; } }
  check(near(gmax, 0.25) && near(garg, 0.5), 'largest gap 1/4 at 1/2');
  /* z = z² over C: the roots of z(z − 1) are 0 and 1 */
  for (let k = 0; k < 200; k++) { const z = [4 * rnd(k, 200) - 2, 4 * rnd(k, 201) - 2], d = cz.add(z, cz.mul([-1, 0], cz.mul(z, z))); check(cz.abs(d) > 1e-6, `z = z² only at 0, 1 (${k})`); }
  /* CNOT copies |0⟩, |1⟩ onto a blank |0⟩ and not |+⟩ */
  const cnot = v => [v[0], v[1], v[3], v[2]];                          // basis |00⟩, |01⟩, |10⟩, |11⟩
  const r2 = Math.SQRT1_2;
  check(cnot([1, 0, 0, 0]).join() === '1,0,0,0' && cnot([0, 0, 1, 0]).join() === '0,0,0,1', 'CNOT copies |0⟩, |1⟩');
  const plus = cnot([r2, 0, r2, 0]), pp = [0.5, 0.5, 0.5, 0.5];
  check(Math.abs(plus.reduce((s, x, i) => s + x * pp[i], 0) - r2) < 1e-12, 'CNOT does not copy |+⟩ (overlap with |++⟩ is 1/√2)');

  /* 3. ROOMS: S_i* S_j = δ_ij I, the eight basis states split into four rooms, the syndromes */
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) check(cm.dist(cm.mul(cm.adj(NC_ROOMS[i]), NC_ROOMS[j]), i === j ? cm.eye(2) : cm.zero(2, 2)) < 1e-12, `S${i}* S${j}`);
  const owner = new Set();
  NC_ROOM_INFO.forEach((r, j) => r.idx.forEach(idx => { owner.add(idx); check(NC_ROOMS[j][idx].some(x => cz.abs(x) > 0.5), `room ${j} holds ${idx}`); check(ncSyn(idx).join() === r.syn.join(), `syndrome of ${idx}`); }));
  check(owner.size === 8, 'the four rooms cover the eight basis states');
  check(cm.dist(NC_ROOMS.reduce((M, Si) => cm.add(M, cm.mul(Si, cm.adj(Si))), cm.zero(8, 8)), cm.eye(8)) < 1e-12, 'Σ S_i S_i* = I₈: the keys form a channel');
  /* 4. NUDGE and the recovery identity */
  for (let k = 0; k < 30; k++) {
    const sig = Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => [2 * rnd(k, 300 + 4 * i + j) - 1, 2 * rnd(k, 330 + 4 * i + j) - 1]));
    const rho = Array.from({ length: 2 }, (_, i) => Array.from({ length: 2 }, (_, j) => [2 * rnd(k, 360 + 2 * i + j) - 1, 2 * rnd(k, 370 + 2 * i + j) - 1]));
    const tr = sig.reduce((s, row, i) => cz.add(s, row[i]), [0, 0]);
    check(cm.dist(ncDecode(NC_ROOMS, ncEncode(NC_ROOMS, sig, rho)), cm.scale(tr, rho)) < 1e-12, `decode(encode) = Tr σ ρ ${k}`);
  }
  const th = Math.acos(Math.sqrt(NC_P0)), a = [[Math.cos(th), 0], [0, 0], [0, -Math.sin(th)], [0, 0]];   // R = cos θ I − i sin θ X2
  const sig = a.map(x => a.map(y => cz.mul(x, cz.conj(y))));
  check(near(sig[0][0][0], 0.7) && near(sig[2][2][0], 0.3) && near(sig[0][2][1], NC_X) && near(sig[2][0][1], -NC_X), 'nudge σ');
  check(Math.abs(NC_X - 0.4583) < 5e-5, '√0.21 ≈ 0.458');
  /* the nudged state R V ψ equals the encoding with this σ, for a pure logical ψ */
  const lpsi = [[0.8, 0], [0, 0.6]], R = cm.add(cm.scale([Math.cos(th), 0], cm.eye(8)), cm.scale([0, -Math.sin(th)], ncE(2)));
  const vpsi = cm.mul(R, cm.mul(ncV(), lpsi.map(x => [x])));
  const rho0 = lpsi.map(x => lpsi.map(y => cz.mul(x, cz.conj(y))));
  check(cm.dist(cm.mul(vpsi, cm.adj(vpsi)), ncEncode(NC_ROOMS, sig, rho0)) < 1e-12, 'R V ψ is the encoding with σ');
  check(cm.dist(ncDecode(NC_ROOMS, cm.mul(vpsi, cm.adj(vpsi))), rho0) < 1e-12, 'the nudge is recovered');
  /* 5. EDGE: Z1 commutes with Z1Z2 and Z2Z3 (diagonal) and maps |+_L⟩ to |−_L⟩ */
  const zsign = (idx, ks) => ks.reduce((s, kk) => s * (ncBit(idx, kk) ? -1 : 1), 1);
  const plusL = Array.from({ length: 8 }, (_, i) => (i === 0 || i === 7 ? r2 : 0)), z1 = plusL.map((x, i) => x * zsign(i, [1]));
  check(z1[0] === r2 && z1[7] === -r2, 'Z1 |+_L⟩ = |−_L⟩');
  check(ncSyn(0).join() === '0,0' && ncSyn(7).join() === '0,0', 'Z1 leaves the syndrome (+,+)');
});
Object.assign(FILM.speed, { copy: 0.02, numbers: 0.014, theorem: 0.016, rooms: 0.018, nudge: 0.014, edge: 0.016, close: 0.025 });

/* the rooms: error, syndrome (1 = the light is on, reading −1), basis states, place in the 2 × 2 grid */
const NC_ROOM_INFO = [
  { err: 'I', syn: [0, 0], idx: [0, 7], lab: '|000⟩ |111⟩', g: [0, 0] },
  { err: 'X₁', syn: [1, 0], idx: [4, 3], lab: '|100⟩ |011⟩', g: [1, 0] },
  { err: 'X₂', syn: [1, 1], idx: [2, 5], lab: '|010⟩ |101⟩', g: [1, 1] },
  { err: 'X₃', syn: [0, 1], idx: [1, 6], lab: '|001⟩ |110⟩', g: [0, 1] }
];

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ncFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const ncNum = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function ncRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
const NC_MISSING = new Set();
function ncLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!NC_MISSING.has(gid)) { NC_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function ncArc(cx, cy, r, a0, a1, col, a, lw = 3) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(cx, cy, r, -a1, -a0); ctx.stroke(); ctx.restore();
}
function ncWedge(cx, cy, r, a0, a1, col, a, fill = 0.3) {
  if (a <= 0.003 || a1 - a0 < 1e-4) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(col, fill);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -a1, -a0); ctx.closePath(); ctx.fill(); ctx.restore();
}
/* a page of paper: a white sheet with grey lines */
function ncPage(x, y, a, s = 1) {
  if (a <= 0.003) return;
  const w = 90 * s, h = 120 * s;
  fillBox(x, y, w, h, C.white, a * 0.9);
  for (let k = 0; k < 6; k++) fillBox(x + 12 * s, y + (18 + 16 * k) * s, (k === 5 ? 40 : 64) * s, 4 * s, C.bg, a * 0.55);
}
/* a key: bow, shaft and two teeth */
function ncKey(x, y, col, a, s = 1) {
  if (a <= 0.003) return;
  ring(x, y, 13 * s, col, a, 3.5);
  line(x + 13 * s, y, x + 52 * s, y, col, a, 4);
  line(x + 40 * s, y, x + 40 * s, y + 11 * s, col, a, 4);
  line(x + 50 * s, y, x + 50 * s, y + 14 * s, col, a, 4);
}
/* opening title */
function ncTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble("CAN'T COPY IT? HIDE IT IN A ROOM", p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('COPIER · OVERLAP · SQUARE · ZERO OR ONE · ROOMS · KEYS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · THE COPIER                        */
/* ======================================================================= */
const TT = { cx: 1380, cy: 520, R: 240 };
/* the turntable: a disc with two unit arrows psi (white) and phi (amber) at overlap z, turned by rot */
function ncTurntable(rot, z, a, o = {}) {
  if (a <= 0.003) return;
  const { cx, cy, R } = TT, th = Math.acos(z);
  ctx.save(); ctx.globalAlpha = a * 0.55; ctx.fillStyle = rgba(C.vio, 0.12); ctx.beginPath(); ctx.arc(cx, cy, R + 30, 0, TAU); ctx.fill(); ctx.restore();
  ring(cx, cy, R + 30, C.argued, a * 0.7, 2);
  for (let k = 0; k < 24; k++) { const t = rot + k * TAU / 24; line(cx + (R + 18) * Math.cos(t), cy - (R + 18) * Math.sin(t), cx + (R + 30) * Math.cos(t), cy - (R + 30) * Math.sin(t), C.argued, a * 0.6, 2); }
  ncArc(cx, cy, 80, rot, rot + th, C.cyan, a, 4);
  const pa = [cx + R * Math.cos(rot), cy - R * Math.sin(rot)], pb = [cx + R * Math.cos(rot + th), cy - R * Math.sin(rot + th)];
  arrow(cx, cy, pa[0], pa[1], C.white, a, 5);
  arrow(cx, cy, pb[0], pb[1], NC_PHI, a, 5);
  txt('ψ', pa[0] + 14 * Math.cos(rot) + 6, pa[1] - 14 * Math.sin(rot) + 10, { size: 36, fam: F.math, w: 700, c: C.white, a });
  txt('φ', pb[0] + 14 * Math.cos(rot + th) + 6, pb[1] - 14 * Math.sin(rot + th) + 10, { size: 36, fam: F.math, w: 700, c: NC_PHI, a });
  const mid = rot + th / 2;
  txt(`z = ${z.toFixed(2)}`, cx + 175 * Math.cos(mid), cy - 175 * Math.sin(mid) + 10, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
}
SCENES.copy = S => {
  const u = S.u;
  ncTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [4, null, 'computed']]);
  /* lines 0–1: the photocopier, then a quantum arrow that it cannot take */
  const ca = a * (1 - at(S, 4, 0.5));
  if (ca > 0.003) {
    panel(110, 190, 800, 560, ca, C.argued, 'ANALOGY · 比方：COPIER · 复印机');
    const pa = Q(S, 0, 'copies any page', 0.8), qa = Q(S, 0, 'unknown quantum state', 0.8);
    /* the machine */
    box(390, 300, 240, 170, C.white, ca * 0.8, 2.5);
    txt('COPY', 510, 395, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: ca * 0.8, ls: 4 });
    const slide = clamp((u - lineAt(S, 0).s) / 2.2);
    ncPage(170 + 70 * slide, 320, ca * pa * (1 - qa));
    ncPage(680, 300, ca * pa * clamp(slide * 2 - 1) * (1 - qa), 0.85);
    ncPage(740, 340, ca * pa * clamp(slide * 2 - 1) * (1 - qa), 0.85);
    if (qa > 0.003) {
      arrow(200, 470, 330, 340, C.now, ca * qa, 5);
      txt('ψ ?', 250, 520, { size: 34, fam: F.math, w: 700, c: C.now, a: ca * qa });
      txt('ψ ⊗ ψ ?', 760, 400, { size: 32, fam: F.math, w: 700, align: 'center', c: C.dim, a: ca * qa });
    }
    const ga = ca * Q(S, 1, 'about angles', 0.6);
    txt('not measurement — angles', 510, 620, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.white, a: ga });
    txt('不在测量，而在角度', 510, 670, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ga });
  }
  /* lines 2–3: the turntable */
  const ta = a * Q(S, 2, 'rigid turn', 0.8);
  if (ta > 0.003) {
    const spin = 0.35 * Math.max(0, u - phraseAt(S, 3, 'A turn moves'));
    ncTurntable(0.25 + spin, NC_Z, ta);
    txt('U: a rigid turn of the whole space · 整个空间的刚性转动', TT.cx, TT.cy + TT.R + 90, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ta });
    txt('turntable = analogy · 转盘是比方', TT.cx, TT.cy + TT.R + 124, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ta * 0.85 });
    const ka = ta * Q(S, 3, 'stays exactly', 0.6);
    chip(TT.cx, TT.cy - TT.R - 62, 440, 54, 'overlap kept · 重叠不变', C.cyan, ka, 24, F.zh);
  }
  /* lines 4–5: the two overlaps */
  const la = a * at(S, 4, 0.6, 0.6);
  if (la > 0.003) {
    panel(110, 190, 800, 560, la, C.cyan, 'TWO OVERLAPS · 两个重叠');
    txt('going in · 进去', 140, 270, { size: 24, fam: F.zh, w: 700, c: C.dim, a: la });
    ncRich([['⟨φ⊗blank, ψ⊗blank⟩', C.white]], 140, 326, { size: 30, a: la });
    ncRich([['= z · 1 = ', C.white], ['z', C.cyan]], 140, 380, { size: 34, a: la * Q(S, 4, 'z times one', 0.5) });
    const oa = la * at(S, 5, 0.6);
    txt('coming out · 出来', 140, 470, { size: 24, fam: F.zh, w: 700, c: C.dim, a: oa });
    ncRich([['⟨φ⊗φ, ψ⊗ψ⟩', C.white]], 140, 526, { size: 30, a: oa });
    ncRich([['= z · z = ', C.white], ['z²', C.mag]], 140, 580, { size: 34, a: la * Q(S, 5, 'z times z', 0.5) });
    ncRich([['U keeps overlaps ⟹ ', C.white], ['z', C.cyan], [' = ', C.white], ['z²', C.mag]], 140, 690, { size: 34, a: la * Q(S, 5, 'z times z', 0.5, 0.3) });
  }
};

/* ======================================================================= */
/*                              scene 2 · ONE NUMBER                         */
/* ======================================================================= */
const DL = { cx: 200, cy: 720, R: 520 };
/* z on screen: 0.6, then on line 3 it slides 0.6 → 0 → 1 */
function nmZ(S) {
  const p = clamp((S.u - phraseAt(S, 3, 'Slide z') - 0.3) / 3.0);
  if (p <= 0) return NC_Z;
  return p < 0.4 ? lerp(NC_Z, 0, ease(p / 0.4)) : lerp(0, 1, ease((p - 0.4) / 0.6));
}
SCENES.numbers = S => {
  const a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const z = nmZ(S), t0 = Math.acos(z), t1 = Math.acos(z * z);
  const { cx, cy, R } = DL;
  /* the dial: psi along the floor, phi at arccos z, the angle the copy would need at arccos z² */
  const wa = a * Q(S, 2, 'would have to open', 0.8);
  ncWedge(cx, cy, R * 0.9, t0, t1, C.mag, wa, 0.32);
  ncArc(cx, cy, 120, 0, t0, C.cyan, a, 4);
  arrow(cx, cy, cx + R, cy, C.white, a, 5);
  arrow(cx, cy, cx + R * Math.cos(t0), cy - R * Math.sin(t0), NC_PHI, a, 5);
  txt('ψ', cx + R + 14, cy + 12, { size: 36, fam: F.math, w: 700, c: C.white, a });
  txt('φ', cx + R * Math.cos(t0) + 14, cy - R * Math.sin(t0) - 4 - 40 * clamp(1 - t0 / 0.3), { size: 36, fam: F.math, w: 700, c: NC_PHI, a });
  txt(`${(t0 / NC_DEG).toFixed(2)}°`, cx + 150 * Math.cos(t0 / 2) + 6, cy - 150 * Math.sin(t0 / 2) + 10, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a * clamp(t0 / 0.2) });
  if (wa > 0.003) {
    ctx.save(); ctx.setLineDash([10, 8]); line(cx, cy, cx + R * 0.9 * Math.cos(t1), cy - R * 0.9 * Math.sin(t1), C.mag, wa, 3); ctx.restore();
    txt(`${(t1 / NC_DEG).toFixed(2)}° needed · 需要`, cx + R * 0.92 * Math.cos(t1) + 10, cy - R * 0.92 * Math.sin(t1) - 14, { size: 24, fam: F.zh, w: 700, c: C.mag, a: wa * (1 - at(S, 3, 0.5)) });
  }
  /* the ledger */
  panel(1000, 180, 820, 300, a, C.cyan, 'z = 0.6 · ONE NUMBER · 一个数');
  ncRich([['in · 进   z = ', C.white], ['0.60', C.cyan]], 1028, 260, { size: 32, a: a * at(S, 1, 0.5), fam: F.zh });
  ncRich([['out · 出   z² = ', C.white], ['0.36', C.mag]], 1028, 318, { size: 32, a: a * Q(S, 1, 'Coming out', 0.5), fam: F.zh });
  ncRich([['angle · 夹角   ', C.white], ['53.13°', C.cyan], [' → ', C.white], ['68.90°', C.mag]], 1028, 376, { size: 30, a: a * at(S, 2, 0.5), fam: F.zh });
  txt('a rigid turn opens no angle · 刚性转动张不开角', 1028, 440, { size: 22, fam: F.zh, w: 700, c: C.argued, a: a * Q(S, 2, 'cannot open', 0.5) });
  /* line 3: the slider and the gap z − z² */
  const sa = a * at(S, 3, 0.6);
  if (sa > 0.003) {
    panel(1000, 500, 820, 330, sa, C.mag, 'THE GAP · 缺口  z − z²');
    const x0 = 1060, x1 = 1760, yb = 770, hk = 480;              // gap 0.25 ↦ 120 px
    line(x0, yb, x1, yb, C.white, sa * 0.7, 2);
    const done = Math.max(0, clamp((S.u - phraseAt(S, 3, 'Slide z') - 0.3) / 3.0));
    curve(s => [lerp(x0, x1, s), yb - hk * (s - s * s)], 200, C.mag, sa * 0.85, 3);
    const gx = lerp(x0, x1, z), g = z - z * z;
    line(gx, yb, gx, yb - hk * g, C.mag, sa, 7);
    dot(gx, yb, 11, 'g', sa);
    txt(`z = ${z.toFixed(2)}   gap = ${g.toFixed(3)}`, x0, 570, { size: 24, fam: F.mono, w: 700, c: C.white, a: sa });
    txt('0', x0, yb + 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
    txt('1', x1, yb + 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
    txt('max 1/4 at z = 1/2', lerp(x0, x1, 0.5), yb - hk * 0.25 - 16, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: sa * 0.85 });
    const ea = sa * clamp((done - 0.9) / 0.1);
    txt('closes only at 0 and 1 · 只在两端合上', 1790, 570, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.white, a: ea });
  }
};

/* ======================================================================= */
/*                            scene 3 · ONLY ZERO OR ONE                     */
/* ======================================================================= */
function ncDial(cx, cy, R, th, a, lab, labCol) {
  if (a <= 0.003) return;
  ncArc(cx, cy, 44, 0, th, C.cyan, a, 3);
  arrow(cx, cy, cx + R, cy, C.white, a, 4);
  arrow(cx, cy, cx + R * Math.cos(th), cy - R * Math.sin(th), NC_PHI, a, 4);
  txt(lab, cx + R / 2, cy + 50, { size: 26, fam: F.math, w: 700, align: 'center', c: labCol, a });
}
SCENES.theorem = S => {
  const a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [3, null, 'argued']]);
  const la = a * Q(S, 0, 'Lean checks', 0.6);
  panel(160, 180, 1600, 330, la, C.lean, 'NO-CLONING · 不可克隆 · ANY COMPLEX INNER PRODUCT SPACE H · 任意复内积空间');
  ncRich([['U : H⊗H ≃ H⊗H  unitary (linear isometric equivalence)', C.white], ['   ‖ψ‖ = ‖φ‖ = ‖blank‖ = 1', C.white]], 196, 262, { size: 26, a: la * Q(S, 0, 'one machine', 0.6) });
  ncRich([['U(ψ⊗blank) = ψ⊗ψ,   U(φ⊗blank) = φ⊗φ', C.white]], 196, 316, { size: 28, a: la * Q(S, 1, 'copies two unit states', 0.6) });
  ncRich([['⟹  ', C.white], ['⟨φ,ψ⟩', C.cyan], [' = ', C.white], ['⟨φ,ψ⟩²', C.mag]], 196, 376, { size: 32, a: la * Q(S, 1, 'its own square', 0.6) });
  ncRich([['     and   φ = ψ   or   ⟨φ,ψ⟩ = 0', C.white]], 196, 430, { size: 32, a: la * at(S, 2, 0.6) });
  ncLean(196, 486, NC_LEAN.no_cloning_inner_product_criterion, la * Q(S, 0, 'one machine', 0.6), { size: 20 });
  /* line 2: the two survivors */
  const da = a * at(S, 2, 0.6);
  ncDial(300, 740, 200, 0.0, da, 'z = 1 ⟹ φ = ψ', C.white);
  ncDial(760, 740, 200, Math.PI / 2, da, 'z = 0 ⟹ φ ⊥ ψ', C.white);
  if (da > 0.003) {
    txt('e.g. CNOT copies |0⟩ and |1⟩, not |+⟩ (computed)', 1000, 640, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: da });
    txt('例：CNOT 能复制 |0⟩、|1⟩，复制不了 |+⟩（屏幕计算）', 1000, 680, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: da });
  }
  /* line 3: the maxim (a reading of the theorem) */
  const ma = a * Q(S, 3, 'A copier', 0.6);
  if (ma > 0.003) {
    panel(980, 710, 800, 110, ma, C.argued);
    txt('only what is already told apart can be copied', 1380, 756, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.argued, a: ma });
    txt('能复制的，只有早已分得清的东西', 1380, 798, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: ma });
  }
};

/* ======================================================================= */
/*                            scene 4 · HIDE IT IN A ROOM                    */
/* ======================================================================= */
const RG = { x: 110, y: 200, w: 380, h: 250, gap: 30 };
const ncRoomRect = j => { const g = NC_ROOM_INFO[j].g; return [RG.x + g[0] * (RG.w + RG.gap), RG.y + g[1] * (RG.h + RG.gap), RG.w, RG.h]; };
const ncRoomCentre = j => { const r = ncRoomRect(j); return [r[0] + r[2] / 2 - 30, r[1] + r[3] / 2 + 20]; };
const NC_LOG = 32 * NC_DEG;                       // the logical arrow, drawn at a fixed angle in its room
function ncRoom(j, a, o = {}) {
  if (a <= 0.003) return;
  const [x, y, w, h] = ncRoomRect(j), info = NC_ROOM_INFO[j];
  panel(x, y, w, h, a * (o.dim ? 0.45 : 1), o.col || C.cyan, null, { cut: 12 });
  /* the two lights g1 = Z1Z2, g2 = Z2Z3: magenta when they read −1 */
  info.syn.forEach((s, k) => { const lx = x + w - 70 + 34 * k, ly = y + 30; ring(lx, ly, 11, s ? C.mag : C.dim, a, 2.5); if (s) dot(lx, ly, 13, 'm', a); });
  txt(`(${info.syn.map(s => (s ? '−' : '+')).join(',')})`, x + w - 96, y + 36, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: a * 0.8 });
  txt(info.err, x + 18, y + 38, { size: 26, fam: F.math, w: 700, c: C.mag, a: a * (j ? 1 : 0) });
  txt(info.lab, x + 18, y + h - 18, { size: 18, fam: F.mono, w: 700, c: C.dim, a });
  const [cx, cy] = ncRoomCentre(j);
  line(cx - 80, cy, cx + 110, cy, C.dim, a * 0.5, 1.2);
  line(cx, cy + 60, cx, cy - 90, C.dim, a * 0.5, 1.2);
}
/* the logical arrow at centre c, opacity a, length L */
function ncLogical(c, a, L = 120, col = C.now) {
  if (a <= 0.003) return;
  arrow(c[0], c[1], c[0] + L * Math.cos(NC_LOG), c[1] - L * Math.sin(NC_LOG), col, a, 5);
}
SCENES.rooms = S => {
  const u = S.u, a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  /* line 0: the habit of paper */
  const pa = a * (1 - at(S, 1, 0.6));
  if (pa > 0.003) {
    for (let k = 0; k < 3; k++) ncPage(300 + 60 * k, 330 + 30 * k, pa * clamp((u - 0.4 * k - 0.3) / 0.5), 1.3);
    txt('safety = copies ?', 360, 640, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.white, a: pa });
    txt('安全 = 备份？这是纸张的习惯', 360, 700, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.argued, a: pa });
  }
  /* line 1: the code and the four rooms */
  const ra = a * at(S, 1, 0.8);
  [0, 1, 3, 2].forEach((j, k) => ncRoom(j, ra * clamp((u - lineAt(S, 1).s - 1.2 - 0.3 * k) / 0.5)));
  if (ra > 0.003) {
    panel(1000, 180, 820, 220, ra, C.cyan, 'THE THREE-BIT CODE · 三比特码');
    ncRich([['α|0⟩ + β|1⟩  ↦  α|000⟩ + β|111⟩', C.white]], 1028, 256, { size: 30, a: ra });
    txt('not three copies · 不是三份拷贝', 1028, 304, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: ra });
    txt('ℂ⁸ = four 2-D rooms · 四间二维房 (sketch · 示意)', 1028, 356, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
  /* line 2: X2 carries the state whole into room (−,−) */
  const home = ncRoomCentre(0), there = ncRoomCentre(2);
  const mv = ease(Q(S, 2, 'carries it', 1.6));
  const pos = [lerp(home[0], there[0], mv), lerp(home[1], there[1], mv)];
  ncLogical(pos, ra * clamp((u - lineAt(S, 1).s - 2.6) / 0.5));
  if (mv > 0.01 && mv < 0.999) { ctx.save(); ctx.setLineDash([8, 8]); line(home[0], home[1], pos[0], pos[1], C.mag, a * 0.8, 3); ctx.restore(); }
  const ea = a * Q(S, 2, 'carries it', 0.5);
  if (ea > 0.003) {
    chip(1410, 470, 680, 56, 'error X₂ · 错误：翻中间一位', C.mag, ea * (1 - at(S, 3, 0.5)), 24, F.zh);
    txt('same arrow, other room · 同一支箭头，换了房', 1410, 540, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ea * (1 - at(S, 3, 0.5)) });
  }
  /* line 3: the keys */
  const ka = a * at(S, 3, 0.6);
  if (ka > 0.003) {
    panel(1000, 440, 820, 370, ka, C.cyan, 'KEYS · 钥匙  (analogy · 比方)');
    ncKey(1040, 520, C.now, ka); txt('S₂* in room (−,−)', 1120, 528, { size: 26, fam: F.math, w: 700, c: C.white, a: ka });
    txt('→  back · 箭头回来', 1430, 528, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ka });
    const wa = ka * Q(S, 3, 'wrong room', 0.5);
    ncKey(1040, 590, C.dim, wa); txt('S₀* in room (−,−)', 1120, 598, { size: 26, fam: F.math, w: 700, c: C.white, a: wa });
    txt('→  0', 1430, 598, { size: 26, fam: F.mono, w: 700, c: C.mag, a: wa });
    ncRich([['Sᵢ* Sⱼ = ', C.white], ['I', C.cyan], ['  if i = j,   ', C.white], ['0', C.mag], ['  if i ≠ j', C.white]], 1040, 690, { size: 30, a: wa });
    txt('perpendicular rooms · 房间两两垂直', 1040, 750, { size: 22, fam: F.zh, w: 700, c: C.dim, a: wa });
  }
};

/* ======================================================================= */
/*                          scene 5 · A NUDGE, NOT A FLIP                    */
/* ======================================================================= */
function ncMatrix(x, y, cell, entries, a, o = {}) {
  /* entries: [[text, colour, crossed 0..1]] row-major, 2 × 2 */
  if (a <= 0.003) return;
  const n = 2;
  line(x - 10, y, x - 10, y + n * cell, C.white, a, 2.5); line(x - 10, y, x + 4, y, C.white, a, 2.5); line(x - 10, y + n * cell, x + 4, y + n * cell, C.white, a, 2.5);
  const xr = x + n * cell * 1.6 + 10;
  line(xr, y, xr, y + n * cell, C.white, a, 2.5); line(xr, y, xr - 14, y, C.white, a, 2.5); line(xr, y + n * cell, xr - 14, y + n * cell, C.white, a, 2.5);
  entries.forEach((e, k) => {
    const i = Math.floor(k / n), j = k % n, cx = x + (j + 0.5) * cell * 1.6, cy = y + (i + 0.5) * cell;
    txt(e[0], cx, cy + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: e[1], a: a * (1 - 0.6 * (e[2] || 0)) });
    if (e[2] > 0.003) line(cx - 70 * e[2], cy + 22, cx + 70 * e[2], cy - 18, C.mag, a, 4);
  });
}
SCENES.nudge = S => {
  const u = S.u, a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  [0, 1, 3, 2].forEach(j => ncRoom(j, a, { dim: j === 1 || j === 3 }));
  /* the split: 0.7 at home, 0.3 next door, with the cross terms between them */
  const sp = Q(S, 0, 'nudge the middle bit', 1.0), dc = ease(Q(S, 1, 'Decode', 1.6)), cut = Q(S, 1, 'cross terms', 0.6);
  const home = ncRoomCentre(0), there = ncRoomCentre(2), back = [1080, 700];
  const ph = [lerp(home[0], back[0], dc), lerp(home[1], back[1], dc)], pt = [lerp(there[0], back[0], dc), lerp(there[1], back[1], dc)];
  if (sp > 0.003 && dc < 0.999) {
    ctx.save(); ctx.setLineDash([6, 8]); line(ph[0] + 60, ph[1] - 30, pt[0] + 60, pt[1] - 30, C.mag, a * sp * (1 - cut), 3); ctx.restore();
  }
  ncLogical(ph, a * lerp(1, 0.7, sp) * (dc > 0.98 ? 0 : 1), 120);
  ncLogical(pt, a * 0.3 * sp * (dc > 0.98 ? 0 : 1), 120);
  if (sp > 0.003 && dc < 0.5) {
    txt('0.70', home[0] + 180, home[1] - 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * sp * (1 - 2 * dc) });
    txt('0.30', there[0] + 180, there[1] - 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * sp * (1 - 2 * dc) });
  }
  /* σ */
  panel(1000, 180, 820, 300, a * sp, C.cyan, 'THE NOISE MATRIX σ · 噪声矩阵  (rooms I, X₂)');
  ncMatrix(1060, 230, 90, [['0.70', C.cyan], ['+0.46i', C.mag, cut], ['−0.46i', C.mag, cut], ['0.30', C.cyan]], a * sp);
  txt('nudge · 轻推', 1440, 260, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * sp });
  ncRich([['cos θ · I − i sin θ · X₂', C.white]], 1440, 300, { size: 22, a: a * sp });
  ncRich([['cos²θ = 0.7', C.white]], 1440, 340, { size: 22, a: a * sp });
  txt('magenta: cross terms · 交叉项', 1440, 384, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * sp });
  ncRich([['Tr σ = ', C.white], ['0.70 + 0.30', C.cyan], [' = 1', C.white]], 1440, 430, { size: 26, a: a * Q(S, 1, 'zero point seven plus', 0.5) });
  /* the recovered logical state */
  if (dc > 0.02) {
    panel(back[0] - 60, back[1] - 150, 300, 200, a * dc, C.cyan, 'LOGICAL · 逻辑', { cut: 12 });
    ncLogical(back, a * dc, 120, C.now);
    txt('ρ', back[0] + 150, back[1] - 30, { size: 34, fam: F.math, w: 700, c: C.now, a: a * dc });
    fillBox(back[0] - 40, back[1] + 18, 168 * 0.7, 18, C.cyan, a * dc * 0.7);
    fillBox(back[0] - 40 + 168 * 0.7, back[1] + 18, 168 * 0.3, 18, C.cyan, a * dc * 0.4);
    box(back[0] - 40, back[1] + 18, 168, 18, C.white, a * dc * 0.6, 1.2);
  }
  /* line 2: Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1360, 500, 460, 300, la, C.lean, 'ANY σ, ANY ρ · 任意矩阵');
    ncRich([['decode(encode(σ, ρ))', C.white]], 1384, 572, { size: 24, a: la });
    ncRich([['= Tr(σ) · ρ', C.white]], 1384, 616, { size: 28, a: la });
    txt('if Sᵢ* Sⱼ = δᵢⱼ I · 房间两两正交', 1384, 672, { size: 23, fam: F.zh, w: 700, c: C.lean, a: la * Q(S, 2, 'perpendicular', 0.5) });
    ncLean(1384, 744, NC_LEAN.orthogonal_syndrome_recovery, la, { size: 19 });
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  const rows = [
    { k: 0, col: C.argued, en: 'z ∈ {0, 1} is necessary — it builds no copier', zh: '只是必要条件：它不造复印机', note: 'near copies reach fidelity 5/6 (Bužek–Hillery): literature result, not formalized here · 文献结果，本书未形式化' },
    { k: 1, col: C.cyan, en: 'rooms for I, X₁, X₂, X₃ only', zh: '这套码只防由单个比特翻转拼成的错误', note: 'Z₁ rings no light and flips |+_L⟩ to |−_L⟩ (computed) · 相位翻转不亮灯，却把 |+_L⟩ 翻成 |−_L⟩' },
    { k: 2, col: C.cyan, en: 'here the rooms fill ℂ⁸: the keys are a full channel', zh: '这里四间房铺满八维：钥匙本身就是完整信道', note: 'Σ Sᵢ Sᵢ* = I₈ (computed); codes with spare room need a piece for the rest · 铺不满时才要补上其余空间' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 210;
    panel(160, y, 1600, 180, ra, rw.col);
    txt(rw.en, 196, y + 58, { size: 32, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 196, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 196, y + 148, { size: 21, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  [0, 1, 3, 2].forEach(j => ncRoom(j, 1, { dim: j === 1 || j === 3 }));
  const home = ncRoomCentre(0), there = ncRoomCentre(2);
  ctx.save(); ctx.setLineDash([8, 8]); line(home[0], home[1], there[0], there[1], C.mag, 0.8, 3); ctx.restore();
  ncLogical(home, 0.35); ncLogical(there, 1);
  txt(DATA.film.title_zh, 1420, 420, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt("CAN'T COPY IT?", 1420, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('HIDE IT IN A ROOM', 1420, 582, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  ncRich([['z', C.cyan], [' = ', C.white], ['z²', C.mag], ['  ⟹  z ∈ {0, 1}', C.white]], 1420, 680, { size: 44, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1420, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
