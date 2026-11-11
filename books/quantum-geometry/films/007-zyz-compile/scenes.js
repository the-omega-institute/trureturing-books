/* Film 007 · Compiling a rotation into three turns: ZYZ and the sandwich action · 把一个旋转编译成三段：ZYZ 与夹心作用
   (book quantum-geometry, chapter 26). Scenes for the shared engine theme/film/engine.js.

   What is on screen, and where it comes from:
     HALF ANGLE   the elementary rotor R_z(θ) = cos(θ/2) − sin(θ/2) e₁e₂ and the sandwich v ↦ R v R̃ on
                  v = (√3/2, 0, 1/2): the shadow ½e₃ commutes with e₁e₂ and stays, the in-plane part anticommutes
                  and turns by θ = θ/2 + θ/2 (chapter 26, section "even rotor sandwich action"). Computed here.
     THREE TURNS  R(α, β, γ) = R_z(α) R_y(β) R_z(γ) at (0.37, −0.81, 0.52), applied to the tripod e₁, e₂, e₃: about
                  the fixed z axis by γ, then y by β, then z by α. Computed here.
     ONE ROTOR    the product 0.829592 − 0.395635 e₁e₂ − 0.392911 e₁e₃ + 0.029524 e₂e₃ (example ex-zyz-compilation-trace),
                  its unit norm, and R e_k R̃ = the k-th column of zyz_matrix(0.37, −0.81, 0.52). Computed here.
     ONE AXIS     "a unit rotor is one turn about one axis" (Spin(3) → SO(3)) is a literature result, not formalized
                  in the book (remark rem-zyz-euler-compilation-literature): ARGUED. The axis n and the angle
                  φ = 2 arccos s of this rotor are computed here, and the single turn is checked against the three.
     T AND H      R_T = cos(π/8) − sin(π/8) e₁e₂ for (π/4, 0, 0) and R_H = −(e₁e₂ + e₂e₃)/√2 for (0, π/2, π), with
                  R_H e₁ R̃_H = e₃, R_H e₂ R̃_H = −e₂, R_H e₃ R̃_H = e₁. Computed here.
     ON THE SPHERE  the four frozen theorems of chapter 26 (film.json "lean"), applied to ρ = blochMatrix(1, v):
                  blochMatrix_trace (Tr = a), bloch_blochMatrix (bloch ∘ blochMatrix = id),
                  bloch_geometry_of_isHermitian (Hermitian ⇒ reconstruction; Tr M = 1 → M·M = M → ‖bloch M‖ = 1),
                  norm_bloch_le_trace_of_posSemidef (PSD ⇒ ‖bloch M‖ ≤ Re Tr M). That ρ is idempotent along the
                  path (det ρ = (1 − |v|²)/4 = 0) is computed here.

   The rotors are built in a small Cl(3,0) algebra (blade masks and XOR, as RotorCompiler in the chapter). On load,
   FILM.init recomputes every number the film prints, compares the six-decimal values with those printed in the
   chapter, checks the sandwich against the ZYZ matrix and against Rodrigues' formula for the single axis, and
   pushes any disagreement to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*               Cl(3,0): multivectors as 8 coefficients by mask              */
/* ======================================================================= */
const CL = (() => {
  const sign = (l, r) => {   // sign of e_l e_r, e_i² = 1 (the chapter's _blade_sign)
    let inv = 0;
    for (let i = 0; i < 3; i++) if ((l >> i) & 1) for (let j = 0; j < i; j++) if ((r >> j) & 1) inv++;
    return inv % 2 ? -1 : 1;
  };
  const zero = () => [0, 0, 0, 0, 0, 0, 0, 0];
  const mul = (A, B) => {
    const out = zero();
    for (let l = 0; l < 8; l++) if (A[l]) for (let r = 0; r < 8; r++) if (B[r]) out[l ^ r] += A[l] * B[r] * sign(l, r);
    return out;
  };
  const grade = m => ((m & 1) + ((m >> 1) & 1) + ((m >> 2) & 1));
  const rev = A => A.map((x, m) => { const g = grade(m); return (g * (g - 1) / 2) % 2 ? -x : x; });
  const vec = v => { const o = zero(); o[1] = v[0]; o[2] = v[1]; o[4] = v[2]; return o; };
  /* right-handed rotation planes: z → e₁e₂ (mask 3), y → e₃e₁ = −e₁e₃ (mask 5, sign −1), x → e₂e₃ (mask 6) */
  const PLANE = { z: [3, 1], y: [5, -1], x: [6, 1] };
  const rotor = (axis, th) => { const o = zero(), [m, s] = PLANE[axis]; o[0] = Math.cos(th / 2); o[m] = -Math.sin(th / 2) * s; return o; };
  const compile = (al, be, ga) => mul(mul(rotor('z', al), rotor('y', be)), rotor('z', ga));
  const apply = (R, v) => { const m = mul(mul(R, vec(v)), rev(R)); return [m[1], m[2], m[4]]; };
  const norm2 = R => mul(R, rev(R))[0];
  const zyz = (al, be, ga) => {   // RotorCompiler.zyz_matrix, rows
    const ca = Math.cos(al), sa = Math.sin(al), cb = Math.cos(be), sb = Math.sin(be), cg = Math.cos(ga), sg = Math.sin(ga);
    return [[ca * cb * cg - sa * sg, -ca * cb * sg - sa * cg, ca * sb],
      [sa * cb * cg + ca * sg, -sa * cb * sg + ca * cg, sa * sb],
      [-sb * cg, sb * sg, cb]];
  };
  /* the even rotor s + b₁₂e₁e₂ + b₁₃e₁e₃ + b₂₃e₂e₃ = cos(φ/2) − sin(φ/2) B_n, B_n = n_x e₂e₃ + n_y e₃e₁ + n_z e₁e₂ */
  const axisAngle = R => {
    const s = Math.min(1, Math.max(-1, R[0])), h = Math.sqrt(Math.max(0, 1 - s * s));
    return { phi: 2 * Math.acos(s), n: h > 1e-12 ? [-R[6] / h, R[5] / h, -R[3] / h] : [0, 0, 1] };
  };
  return { sign, mul, rev, vec, rotor, compile, apply, norm2, zyz, axisAngle };
})();

const V3 = {
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  sc: (s, a) => [s * a[0], s * a[1], s * a[2]],
  norm: a => Math.hypot(a[0], a[1], a[2]),
  /* Rodrigues: turn v about the unit axis n by φ, right-handed */
  rot: (n, phi, v) => { const c = Math.cos(phi), s = Math.sin(phi); return V3.add(V3.add(V3.sc(c, v), V3.sc(s, V3.cross(n, v))), V3.sc(V3.dot(n, v) * (1 - c), n)); }
};
const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];
const BASIS = [E1, E2, E3];

/* the chapter's example and gates */
const ZY = { al: 0.37, be: -0.81, ga: 0.52 };
const ZY_R = CL.compile(ZY.al, ZY.be, ZY.ga);
const ZY_M = CL.zyz(ZY.al, ZY.be, ZY.ga);
const ZY_FOLD = CL.axisAngle(ZY_R);
const ZY_T = CL.compile(Math.PI / 4, 0, 0);
const ZY_H = CL.compile(0, Math.PI / 2, Math.PI);
const ZY_HAX = CL.axisAngle(ZY_H);
const ZY_HALF_V = [Math.sqrt(3) / 2, 0, 0.5];      // the sandwich example of the chapter
const ZY_MIX = 0.6;                                // the mixed state blochMatrix(1, 0.6 v) of the last scene
const ZY_STAGES = [CL.rotor('z', ZY.ga), CL.mul(CL.rotor('y', ZY.be), CL.rotor('z', ZY.ga)), ZY_R];
const ZY_COLS = BASIS.map(e => CL.apply(ZY_R, e));
const ZY_COLERR = Math.max(...ZY_COLS.map((c, k) => Math.max(...c.map((x, i) => Math.abs(x - ZY_M[i][k])))));
const ZY_FOLDERR = Math.max(...BASIS.map((e, k) => V3.norm(V3.sub(V3.rot(ZY_FOLD.n, ZY_FOLD.phi, e), ZY_COLS[k]))));
const ZY_LEAN = {
  blochMatrix_trace: 'D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace',
  bloch_blochMatrix: 'D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix',
  bloch_geometry_of_isHermitian: 'D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian',
  norm_bloch_le_trace_of_posSemidef: 'D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const fail = m => E.push('zyz film: ' + m);
  const r6 = x => Math.round(x * 1e6) / 1e6;
  /* the Lean citations: present, theorems, matching GIDs */
  for (const [short, gid] of Object.entries(ZY_LEAN)) {
    const r = (DATA.lean || []).find(z => z.short === short);
    if (!r || r.kind !== 'theorem' || r.gid !== gid) fail(`film.json must cite the theorem ${gid}`);
  }
  /* algebra sanity: e₁e₂ = −e₂e₁, (e₁e₂e₃)² = −1, plane squares −1 */
  const b = m => { const o = [0, 0, 0, 0, 0, 0, 0, 0]; o[m] = 1; return o; };
  if (CL.mul(b(1), b(2))[3] !== 1 || CL.mul(b(2), b(1))[3] !== -1) fail('e1 e2 sign');
  if (CL.mul(b(7), b(7))[0] !== -1) fail('pseudoscalar square');
  for (const m of [3, 5, 6]) if (CL.mul(b(m), b(m))[0] !== -1) fail('bivector square ' + m);
  /* the chapter's six-decimal rotor and matrix */
  const want = [0.829592, -0.395635, -0.392911, 0.029524];
  [0, 3, 5, 6].forEach((m, i) => { if (r6(ZY_R[m]) !== want[i]) fail(`rotor coefficient ${m}: ${ZY_R[m]}`); });
  [1, 2, 4, 7].forEach(m => { if (Math.abs(ZY_R[m]) > 1e-15) fail('odd part of the rotor'); });
  ZY_STAGES.forEach((R, k) => { if (Math.abs(CL.norm2(R) - 1) > 1e-14) fail('stage norm ' + k); });
  const wantM = [[0.378188, -0.633230, -0.675273], [0.679631, 0.685203, -0.261913], [0.628550, -0.359884, 0.689498]];
  wantM.forEach((row, i) => row.forEach((x, j) => { if (r6(ZY_M[i][j]) !== x) fail(`matrix entry ${i}${j}`); }));
  if (!(ZY_COLERR < 1e-14)) fail('sandwich columns differ from zyz_matrix: ' + ZY_COLERR);
  /* the single axis */
  if (Math.abs(V3.norm(ZY_FOLD.n) - 1) > 1e-12 || !(ZY_FOLDERR < 1e-12)) fail('single-axis turn: ' + ZY_FOLDERR);
  if ((ZY_FOLD.phi * 180 / Math.PI).toFixed(1) !== '67.9') fail('fold angle ' + ZY_FOLD.phi);
  /* the gates */
  if (r6(ZY_T[0]) !== 0.92388 || r6(ZY_T[3]) !== -0.382683 || Math.abs(ZY_T[5]) + Math.abs(ZY_T[6]) > 1e-15) fail('T rotor');
  if (Math.abs(ZY_H[0]) > 1e-15 || r6(ZY_H[3]) !== -0.707107 || r6(ZY_H[6]) !== -0.707107 || Math.abs(ZY_H[5]) > 1e-15) fail('H rotor');
  const hImg = [E3, [0, -1, 0], E1];
  BASIS.forEach((e, k) => { if (V3.norm(V3.sub(CL.apply(ZY_H, e), hImg[k])) > 1e-14) fail('H image ' + k); });
  if (Math.abs(ZY_HAX.phi - Math.PI) > 1e-12 || V3.norm(V3.sub(ZY_HAX.n, [Math.SQRT1_2, 0, Math.SQRT1_2])) > 1e-12) fail('H axis');
  /* the half-angle example: shadow ½e₃ fixed, in-plane part turned by θ, R² v⊥ = R v⊥ R̃ */
  for (const th of [0.3, Math.PI / 2, 2.1]) {
    const R = CL.rotor('z', th), w = CL.apply(R, ZY_HALF_V), vp = [ZY_HALF_V[0], ZY_HALF_V[1], 0];
    if (Math.abs(w[2] - 0.5) > 1e-14) fail('shadow moved');
    const R2 = CL.mul(R, R), m = CL.mul(R2, CL.vec(vp));
    if (Math.abs(m[1] - w[0]) + Math.abs(m[2] - w[1]) > 1e-14) fail('R² v⊥');
    if (V3.norm(V3.sub(w, V3.rot(E3, th, ZY_HALF_V))) > 1e-14) fail('half-angle turn');
  }
  /* the Bloch matrix along the path: trace one, idempotent, det = (1 − |v|²)/4 */
  for (let k = 0; k <= 60; k++) {
    const v = zyChainVec(E1, k / 60), rho = zyBloch(1, v), sq = zyMul2(rho, rho);
    if (Math.abs(rho[0][0] + rho[3][0] - 1) > 1e-14) fail('trace');
    if (Math.max(...sq.map((z, i) => Math.hypot(z[0] - rho[i][0], z[1] - rho[i][1]))) > 1e-14) fail('idempotent');
    const mix = zyBloch(1, V3.sc(ZY_MIX, v)), d = zyDet(mix);
    if (Math.abs(d[0] - (1 - ZY_MIX * ZY_MIX) / 4) > 1e-14 || Math.abs(d[1]) > 1e-14) fail('mixed determinant');
  }
});
Object.assign(FILM.speed, { half: 0.02, chain: 0.016, product: 0.014, fold: 0.016, gates: 0.02, sphere: 0.012, close: 0.025 });

/* 2×2 complex matrices [m00, m01, m10, m11], entries [re, im] */
function zyBloch(a, r) { return [[(a + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2], [r[0] / 2, r[1] / 2], [(a - r[2]) / 2, 0]]; }
function zyCm(a, b) { return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]; }
function zyCa(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
function zyMul2(A, B) {
  return [zyCa(zyCm(A[0], B[0]), zyCm(A[1], B[2])), zyCa(zyCm(A[0], B[1]), zyCm(A[1], B[3])),
    zyCa(zyCm(A[2], B[0]), zyCm(A[3], B[2])), zyCa(zyCm(A[2], B[1]), zyCm(A[3], B[3]))];
}
function zyDet(A) { const p = zyCm(A[0], A[3]), q = zyCm(A[1], A[2]); return [p[0] - q[0], p[1] - q[1]]; }

/* the three-turn path at progress p ∈ [0, 1]: γ about z on [0, ⅓], β about y on [⅓, ⅔], α about z on [⅔, 1] */
function zyChainParts(p) { return [clamp(p * 3), clamp(p * 3 - 1), clamp(p * 3 - 2)]; }
function zyChainRotor(p) {
  const [pg, pb, pa] = zyChainParts(p);
  return CL.compile(ZY.al * pa, ZY.be * pb, ZY.ga * pg);
}
function zyChainVec(v0, p) { return CL.apply(zyChainRotor(p), v0); }

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
const ZY_DEG = Math.PI / 180;
const zyNum = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '') + Math.abs(v).toFixed(d); };
const zyDeg = (r, d = 1) => (r / ZY_DEG).toFixed(d) + '°';
const zyVecS = (v, d = 3) => `(${v.map(x => zyNum(x, d)).join(', ')})`;
/* the rotor s + b₁₂e₁e₂ + b₁₃e₁e₃ + b₂₃e₂e₃ as text, zero terms dropped */
function zyRotorS(R, d = 3) {
  const terms = [[0, ''], [3, ' e₁e₂'], [5, ' e₁e₃'], [6, ' e₂e₃']].filter(([m]) => Math.abs(R[m]) >= 0.5 * Math.pow(10, -d));
  if (!terms.length) return '0';
  return terms.map(([m, s], i) => {
    const x = R[m], mag = Math.abs(x).toFixed(d) + s;
    return i === 0 ? (x < 0 ? '−' : '') + mag : (x < 0 ? ' − ' : ' + ') + mag;
  }).join('');
}

/* orthographic view of the unit sphere: world (x, y, z), z up → [screen x, screen y, depth] (depth > 0 behind) */
function zyView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  V.cx = cx; V.cy = cy; V.R = R;
  return V;
}
/* a parametric 3-D curve: front runs bright, back runs faint */
function zyPath(V, fn, n, col, aF, aB, lw = 2, dash = false) {
  if (aF <= 0.003 && aB <= 0.003) return;
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(V(fn(i / n)));
  let run = [pts[0]], back = pts[0][2] > 0;
  const flush = () => {
    if (run.length < 2) return;
    const r = run;
    if (dash) { ctx.save(); ctx.setLineDash([10, 9]); }
    curve(k => r[Math.round(k * (r.length - 1))], r.length - 1, col, back ? aB : aF, back ? lw * 0.7 : lw);
    if (dash) ctx.restore();
  };
  for (let i = 1; i < pts.length; i++) {
    const b = pts[i][2] > 0;
    run.push(pts[i]);
    if (b !== back) { flush(); run = [pts[i]]; back = b; }
  }
  flush();
}
function zySphere(V, a, o = {}) {
  if (a <= 0.003) return;
  dot(V.cx - V.R * 0.18, V.cy - V.R * 0.22, V.R * 1.25, 'b', 0.08 * a);
  ring(V.cx, V.cy, V.R, C.cyan, 0.8 * a, 2.4);
  ring(V.cx, V.cy, V.R + 8, C.cyan, 0.16 * a, 1);
  for (const lat of [-60, -30, 0, 30, 60]) {
    const r = Math.cos(lat * ZY_DEG), z = Math.sin(lat * ZY_DEG), eq = lat === 0;
    zyPath(V, s => [r * Math.cos(TAU * s), r * Math.sin(TAU * s), z], 72, eq ? C.cyan : C.blue, a * (eq ? 0.6 : 0.34), a * (eq ? 0.2 : 0.09), eq ? 2 : 1.2);
  }
  for (let k = 0; k < 6; k++) {
    const ph = k * Math.PI / 6;
    zyPath(V, s => [Math.sin(TAU * s) * Math.cos(ph), Math.sin(TAU * s) * Math.sin(ph), Math.cos(TAU * s)], 72, C.blue, a * 0.28, a * 0.08, 1.1);
  }
  /* coordinate axes; o.hi = { z: k, y: k } highlights a rotation axis in violet */
  const c0 = V([0, 0, 0]), hi = o.hi || {};
  for (const [e, l] of [[E1, 'x'], [E2, 'y'], [E3, 'z']]) {
    const h = clamp(hi[l] || 0), col = h > 0 ? mix(C.dim, C.vio, h) : C.dim;
    const pn = V(V3.sc(-1.25, e)), pp = V(V3.sc(1.3, e)), pl = V(V3.sc(1.45, e));
    dashed(pn[0], pn[1], c0[0], c0[1], col, (0.45 + 0.4 * h) * a, 1.4 + 1.6 * h);
    arrow(c0[0], c0[1], pp[0], pp[1], col, (0.7 + 0.3 * h) * a, 1.6 + 2.4 * h);
    txt(l, pl[0], pl[1] + 9, { size: 26 + 6 * h, fam: F.math, w: 700, align: 'center', c: col, a: 0.95 * a });
  }
}
/* an arrow from the centre to v with a glowing tip and an optional label beside the tip */
function zyVec(V, v, col, a, o = {}) {
  if (a <= 0.003) return;
  const c0 = o.from ? V(o.from) : V([0, 0, 0]), p = V(v);
  arrow(c0[0], c0[1], p[0], p[1], col, a, o.lw || 4);
  if (o.tip !== false) dot(p[0], p[1], o.r || 14, o.pearl || 'g', a);
  if (!o.label) return;
  const dx = p[0] - c0[0], dy = p[1] - c0[1], L = Math.hypot(dx, dy) || 1, off = o.off || 34;
  txt(o.label, p[0] + dx / L * off, p[1] + dy / L * off + 9, { size: o.size || 28, fam: F.math, w: 700, align: 'center', c: col, a });
}
/* coloured runs on one baseline: parts = [[text, colour, 'sub'?], …]; 'sub' draws a small lowered run */
function zyRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  const wid = p => tw(p[0], p[2] ? size * 0.64 : size, fam, w);
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + wid(p), 0) / 2;
  if (o.align === 'right') cx = x - parts.reduce((s, p) => s + wid(p), 0);
  for (const p of parts) {
    const small = !!p[2], dy = p[2] === 'sub' ? size * 0.22 : p[2] === 'sup' ? -size * 0.42 : 0;
    txt(p[0], cx, y + dy, { size: small ? size * 0.64 : size, fam, w, c: p[1], a, ab: o.ab });
    cx += wid(p);
  }
  return cx;
}
/* R_u(text) as rich parts */
const zyR = (u, arg, col) => [['R', col], [u, col, 'sub'], [`(${arg})`, col]];
/* a filled sector in the plane z = h of radius r, from angle t0 to t1 */
function zyWedge(V, h, r, t0, t1, col, a) {
  if (a <= 0.003 || Math.abs(t1 - t0) < 1e-3) return;
  const c = V([0, 0, h]), n = Math.max(4, Math.ceil(Math.abs(t1 - t0) * 30));
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(col, 0.22);
  ctx.beginPath(); ctx.moveTo(c[0], c[1]);
  for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n, p = V([r * Math.cos(t), r * Math.sin(t), h]); ctx.lineTo(p[0], p[1]); }
  ctx.closePath(); ctx.fill(); ctx.restore();
  zyPath(V, s => [r * Math.cos(t0 + (t1 - t0) * s), r * Math.sin(t0 + (t1 - t0) * s), h], n, col, a, a * 0.6, 3);
}
/* a 2×2 or 3×3 bracketed matrix; y is the baseline of the first row */
function zyMat(x, y, cells, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 24, cw = o.cw || 200, rh = o.rh || 46, col = o.c || C.white, fam = o.fam || F.mono, nc = cells[0].length;
  const top = y - size * 1.1, bot = y + rh * (cells.length - 1) + size * 0.5, xr = x + 20 + cw * nc;
  for (const [x0, d] of [[x, 1], [xr, -1]]) {
    line(x0, top, x0, bot, col, a * 0.85, 2);
    line(x0, top, x0 + 12 * d, top, col, a * 0.85, 2);
    line(x0, bot, x0 + 12 * d, bot, col, a * 0.85, 2);
  }
  cells.forEach((row, i) => row.forEach((s, j) => {
    const ca = o.colA ? o.colA[j] : 1;
    txt(s, x + 10 + cw * j + cw / 2, y + rh * i, { size, fam, w: 700, align: 'center', c: (o.cols && o.cols[i][j]) || col, a: a * ca });
  }));
  return xr;
}
/* LEAN ✓ chip for one cited theorem, by short name */
const ZY_MISSING = new Set();
function zyLean(x, y, short, a, o = {}) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) {
    if (!ZY_MISSING.has(short)) { ZY_MISSING.add(short); window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* NUM tag: computed on screen, not a proof */
function zyNumTag(x, y, a) { chip(x + 32, y - 9, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }
/* the tripod R e₁ R̃ (amber, the arrow), R e₂ R̃, R e₃ R̃ (white) */
function zyTripod(V, R, a, o = {}) {
  const names = o.names || ['Re₁R̃', 'Re₂R̃', 'Re₃R̃'];
  BASIS.forEach((e, k) => {
    const v = CL.apply(R, e);
    if (k === 0) zyVec(V, v, C.now, a, { label: o.labels === false ? null : names[0], off: 44, size: 26 });
    else zyVec(V, v, C.white, a * 0.8, { lw: 2.5, r: 9, pearl: 'w', label: o.labels === false ? null : names[k], off: 40, size: 24 });
  });
}
/* the trail of the three turns from v0 up to progress p: done segments white, the current one amber */
function zyTrail(V, v0, p, a, o = {}) {
  const [pg, pb, pa] = zyChainParts(p);
  const seg = [[pg, s => zyChainVec(v0, s / 3)], [pb, s => zyChainVec(v0, (1 + s) / 3)], [pa, s => zyChainVec(v0, (2 + s) / 3)]];
  seg.forEach(([q, fn], k) => {
    if (q <= 0.002) return;
    const cur = q < 1 || (k === 2 && o.endAmber);
    zyPath(V, s => fn(q * s), Math.max(6, Math.ceil(q * 40)), cur ? C.now : C.white, a * (cur ? 1 : 0.85), a * 0.4, cur ? 4 : 3);
  });
}

/* ======================================================================= */
/*                          scene 1 · HALF ANGLE                             */
/* ======================================================================= */
function zyHalfTheta(S) {
  const L0 = lineAt(S, 0), L2 = lineAt(S, 2), s0 = L0.s + 1.6;
  return (Math.PI / 2) * ease(clamp((S.u - s0) / Math.max(1, L2.e - s0)));
}
SCENES.half = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* opening title during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble('COMPILING A ROTATION INTO THREE TURNS', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
    txt(scramble('ZYZ AND THE SANDWICH ACTION', p, 7), W / 2, 640, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta * 0.9, ls: 4 });
    txt('HALF ANGLE · THREE TURNS · ONE AXIS · ON THE SPHERE', W / 2, 712, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
  }
  const ma = at(S, 0, 0.9, -0.1) * clamp((S.d - u) / 0.5);
  if (ma <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const th = zyHalfTheta(S), v0 = ZY_HALF_V, R = CL.rotor('z', th), v = CL.apply(R, v0);
  const V = zyView(520, 520, 280, -2.2 + 0.03 * u, 0.32);
  zySphere(V, ma, { hi: { z: 1 } });
  const r = Math.sqrt(3) / 2;
  /* the plane z = ½ in which the in-plane part turns, and the swept sector */
  zyPath(V, s => [r * Math.cos(TAU * s), r * Math.sin(TAU * s), 0.5], 72, C.mag, 0.35 * ma, 0.12 * ma, 1.4);
  const halves = Q(S, 3, 'two half angles', 0.6) * ma;
  if (halves > 0) {
    zyWedge(V, 0.5, r, 0, th / 2, C.mag, ma);
    zyWedge(V, 0.5, r * 0.94, th / 2, th, mix(C.mag, C.white, 0.25), ma);
    const pb = V([r * 1.04 * Math.cos(th / 2), r * 1.04 * Math.sin(th / 2), 0.5]), c = V([0, 0, 0.5]);
    dashed(c[0], c[1], pb[0], pb[1], C.white, halves, 2);
    const l1 = V([r * 0.62 * Math.cos(th / 4), r * 0.62 * Math.sin(th / 4), 0.5]);
    const l2 = V([r * 0.62 * Math.cos(3 * th / 4), r * 0.62 * Math.sin(3 * th / 4), 0.5]);
    txt('θ/2', l1[0], l1[1] + 9, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: halves });
    txt('θ/2', l2[0], l2[1] + 9, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: halves });
  } else zyWedge(V, 0.5, r, 0, th, C.mag, ma);
  /* the start arrow, the shadow on the axis (cyan) and the turning in-plane part (magenta) */
  const p0 = V(v0), c0 = V([0, 0, 0]);
  dashed(c0[0], c0[1], p0[0], p0[1], C.white, 0.4 * ma, 1.6);
  const sh = Q(S, 2, 'The shadow', 0.6) * ma, pl = Q(S, 3, 'The part in the plane', 0.6) * ma;
  const ps = V([0, 0, 0.5]);
  arrow(c0[0], c0[1], ps[0], ps[1], C.cyan, ma, 5 + 3 * sh);
  if (sh > 0) dot(ps[0], ps[1], 16 + 10 * sh, 'c', sh * (1 - 0.6 * pl));
  arrow(ps[0], ps[1], V(v)[0], V(v)[1], C.mag, ma, 3 + 2 * pl);
  txt('½e₃', ps[0] - 28, ps[1] + 2, { size: 26, fam: F.math, w: 700, align: 'right', c: C.cyan, a: ma });
  zyVec(V, v, C.now, ma, { label: 'v', off: 30 });
  /* the angle readout under the sphere */
  zyRich([['θ = ', C.white], [zyDeg(th), C.now], ['    θ/2 = ', C.white], [zyDeg(th / 2), C.vio]], 130, 214, { size: 26, fam: F.mono, a: ma * at(S, 0, 0.6, 1.4) });

  /* panel A: the rotor and the sandwich */
  const x = 1010, w = 790, y = 170;
  panel(x, y, w, 300, ma, C.cyan, 'ELEMENTARY ROTOR · 基本旋转器');
  zyRich([...zyR('z', 'θ', C.white), [' = ', C.white], ['cos(θ/2)', C.cyan], [' − ', C.white], ['sin(θ/2) e₁e₂', C.mag]], x + 28, y + 86, { size: 32, a: ma });
  txt(`= ${zyRotorS(R)}`, x + 28, y + 136, { size: 26, fam: F.mono, w: 700, c: C.vio, a: ma });
  txt('R̃ = cos(θ/2) + sin(θ/2) e₁e₂', x + 420, y + 136, { size: 22, fam: F.math, w: 700, c: C.dim, a: Q(S, 1, 'its reverse', 0.6) * ma });
  const sw = Q(S, 1, 'Sandwich', 0.6) * ma;
  const cy = y + 230;
  chip(x + 140, cy, 150, 60, '', C.vio, sw);
  zyRich(zyR('z', 'θ', C.vio), x + 140, cy + 11, { size: 30, align: 'center', a: sw });
  chip(x + 300, cy, 90, 60, 'v', C.now, sw, 30, F.math);
  chip(x + 460, cy, 150, 60, '', C.vio, sw);
  zyRich([['R̃', C.vio], ['z', C.vio, 'sub'], ['(θ)', C.vio]], x + 460, cy + 11, { size: 30, align: 'center', a: sw });
  zyNumTag(x + w - 110, y + 25, ma);

  /* panel B: the rotor dial (left) and the commutation rules (right) */
  const y2 = 500, h2 = 336;
  panel(x, y2, w, h2, ma, C.cyan, 'SANDWICH · 夹心作用');
  const dx = x + 150, dy = y2 + 190, dr = 105;
  line(dx - dr - 20, dy, dx + dr + 20, dy, C.dim, 0.6 * ma, 1.2);
  line(dx, dy + dr + 16, dx, dy - dr - 20, C.dim, 0.6 * ma, 1.2);
  ring(dx, dy, dr, C.vio, 0.55 * ma, 1.6);
  txt('1', dx + dr + 26, dy + 8, { size: 20, fam: F.math, w: 700, c: C.dim, a: ma });
  txt('−e₁e₂', dx + 8, dy - dr - 24, { size: 20, fam: F.math, w: 700, c: C.dim, a: ma });
  curve(s => [dx + 44 * Math.cos(th / 2 * s), dy - 44 * Math.sin(th / 2 * s)], 20, C.vio, ma, 2.5);
  const rp = [dx + dr * Math.cos(th / 2), dy - dr * Math.sin(th / 2)];
  line(dx, dy, rp[0], rp[1], C.vio, ma, 2.5);
  dot(rp[0], rp[1], 14, 'v', ma);
  txt('R lives at θ/2', dx, dy + dr + 46, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.vio, a: ma });
  const ax = x + 330;
  const c1 = Q(S, 2, 'commutes', 0.6) * ma;
  zyRich([['e₃ e₁e₂ = e₁e₂ e₃', C.cyan]], ax, y2 + 92, { size: 25, a: c1 });
  zyRich([['⇒ R v', C.white], ['∥', C.cyan], [' R̃ = v', C.white], ['∥', C.cyan]], ax, y2 + 132, { size: 25, a: c1 });
  const c2 = Q(S, 3, 'anticommutes', 0.6) * ma;
  zyRich([['e₁ e₁e₂ = −e₁e₂ e₁', C.mag]], ax, y2 + 192, { size: 25, a: c2 });
  zyRich([['⇒ R v', C.white], ['⊥', C.mag], [' R̃ = R² v', C.white], ['⊥', C.mag]], ax, y2 + 232, { size: 25, a: c2 });
  const c3 = Q(S, 3, 'close into', 0.6) * ma;
  zyRich([['R² = cos θ − sin θ e₁e₂', C.now]], ax, y2 + 290, { size: 25, a: c3 });
};

/* ======================================================================= */
/*                          scene 2 · THREE TURNS                            */
/* ======================================================================= */
function zyChainP(S) {
  const L1 = lineAt(S, 1), s0 = L1.s + 1.0, s1 = S.d - 0.4;
  const k = clamp((S.u - s0) / (s1 - s0)) * 3, seg = Math.min(2, Math.floor(k));
  return (seg + ease(k - seg)) / 3;
}
SCENES.chain = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.4);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const p = zyChainP(S), parts = zyChainParts(p);
  const cur = p <= 0 ? -1 : parts[0] < 1 ? 0 : parts[1] < 1 ? 1 : parts[2] < 1 ? 2 : 3;
  const hiZ = cur === 0 || cur === 2 ? 1 : 0, hiY = cur === 1 ? 1 : 0;
  const pre = Q(S, 0, 'about z', 0.4) * (1 - Q(S, 0, 'then y', 0.3)) + Q(S, 0, 'z again', 0.4) * (1 - at(S, 1, 0.4));
  const preY = Q(S, 0, 'then y', 0.4) * (1 - Q(S, 0, 'z again', 0.3));
  const V = zyView(520, 520, 280, -2.2 + 0.03 * u, 0.32);
  zySphere(V, a, { hi: { z: Math.max(hiZ, pre), y: Math.max(hiY, preY) } });
  zyTrail(V, E1, p, a);
  const R = zyChainRotor(p);
  const p0 = V(E1);
  ring(p0[0], p0[1], 16, C.white, 0.8 * a, 2);
  zyTripod(V, R, a);

  /* panel: the three factors, acting right to left */
  const x = 1010, w = 790, y = 170;
  panel(x, y, w, 330, a, C.cyan, 'ZYZ · 三段');
  const xs = [x + 150, x + 395, x + 640], names = [['z', 'α'], ['y', 'β'], ['z', 'γ']], vals = [ZY.al, ZY.be, ZY.ga];
  const segOf = [2, 1, 0];   // chip k (left to right) is turned in segment segOf[k]
  const va = Q(S, 1, 'Take alpha', 0.6) * a;
  names.forEach(([ax, an], k) => {
    const on = cur === segOf[k], col = on ? C.now : C.vio;
    chip(xs[k], y + 110, 190, 66, '', col, a);
    zyRich(zyR(ax, an, col), xs[k], y + 122, { size: 34, align: 'center', a });
    txt(`${an} = ${zyNum(vals[k], 2)}`, xs[k], y + 190, { size: 26, fam: F.mono, w: 700, align: 'center', c: on ? C.now : C.white, a: va });
    const done = parts[segOf[k]];
    if (done > 0) txt(`${zyNum(vals[k] * done, 2)} rad`, xs[k], y + 226, { size: 20, fam: F.mono, w: 700, align: 'center', c: on ? C.now : C.dim, a });
  });
  const oa = Q(S, 2, 'the rightmost', 0.6) * a;
  curve(s => [lerp(xs[2], xs[0], s), y + 262 + 22 * Math.sin(Math.PI * s)], 40, C.now, oa, 2.5);
  arrow(xs[0] + 30, y + 268, xs[0], y + 262, C.now, oa, 2.5);
  txt('acts last', xs[0], y + 316, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: oa });
  txt('acts first', xs[2], y + 316, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: oa });
  zyNumTag(x + w - 110, y + 25, a);

  /* panel: the live arrow */
  const y2 = 530;
  panel(x, y2, w, 306, a, C.cyan, 'THE ARROW · 箭头');
  const v = CL.apply(R, E1);
  zyRich([['v = ', C.white], ['R e₁ R̃', C.now], [' = ', C.white], [zyVecS(v), C.now]], x + 28, y2 + 90, { size: 28, a });
  const lab = ['turning about z by γ', 'turning about y by β', 'turning about z by α', 'three turns done'];
  txt(cur < 0 ? 'start at e₁' : lab[cur], x + 28, y2 + 146, { size: 24, fam: F.mono, w: 700, c: cur >= 0 && cur < 3 ? C.now : C.white, a });
  txt(`|v| = ${V3.norm(v).toFixed(6)}`, x + 28, y2 + 200, { size: 24, fam: F.mono, w: 700, c: C.cyan, a });
  txt('the white trail: finished turns · amber: the turn in progress', x + 28, y2 + 256, { size: 18, fam: F.mono, c: C.dim, a });
};

/* ======================================================================= */
/*                          scene 3 · ONE ROTOR                              */
/* ======================================================================= */
const ZY_MASKS = [[0, '1'], [3, 'e₁e₂'], [5, 'e₁e₃'], [6, 'e₂e₃']];
function zyStage(S) {
  const t1 = phraseAt(S, 0, 'the three rotors'), t2 = phraseAt(S, 0, 'and one even');
  const k1 = ease(clamp((S.u - t1 + 0.3) / 0.9)), k2 = ease(clamp((S.u - t2 + 0.2) / 0.9));
  const R = [0, 3, 5, 6].map(m => lerp(lerp(ZY_STAGES[0][m], ZY_STAGES[1][m], k1), ZY_STAGES[2][m], k2));
  return { R, k1, k2 };
}
SCENES.product = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.4);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const { R, k1, k2 } = zyStage(S);
  /* bars */
  const x = 120, w = 820, y = 170, h = 470;
  panel(x, y, w, h, a, C.vio, 'ROTOR COEFFICIENTS · 旋转器系数');
  const st = k2 > 0.5 ? 2 : k1 > 0.5 ? 1 : 0;
  const fac = [zyR('z', 'α', st === 2 ? C.now : C.dim), zyR('y', 'β', st >= 1 ? (st === 1 ? C.now : C.white) : C.dim), zyR('z', 'γ', st === 0 ? C.now : C.white)];
  zyRich([...fac[0], [' ', C.white], ...fac[1], [' ', C.white], ...fac[2]], x + w / 2, y + 84, { size: 34, align: 'center', a });
  const base = y + 290, sc = 190;
  line(x + 60, base, x + w - 40, base, C.dim, 0.7 * a, 1.4);
  ZY_MASKS.forEach(([m, l], k) => {
    const bx = x + 130 + k * 180, val = R[k], hgt = val * sc;
    fillBox(bx - 45, Math.min(base, base - hgt), 90, Math.abs(hgt), k === 0 ? C.cyan : C.mag, 0.7 * a);
    box(bx - 45, Math.min(base, base - hgt), 90, Math.max(1, Math.abs(hgt)), k === 0 ? C.cyan : C.mag, a * 0.9, 1.2);
    txt(zyNum(val, 3), bx, val >= 0 ? base - hgt - 14 : base - hgt + 32, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * (Math.abs(val) > 5e-4 ? 1 : 0.4) });
    txt(l, bx, y + h - 26, { size: 26, fam: F.math, w: 700, align: 'center', c: k === 0 ? C.cyan : C.mag, a });
  });
  /* the squares */
  const q = Q(S, 1, 'their squares', 0.6) * a, y2 = 670;
  panel(x, y2, w, 166, q, C.cyan, 'SQUARES · 平方和');
  if (q > 0) {
    const s2 = ZY_R[0] ** 2, b2 = ZY_R[3] ** 2 + ZY_R[5] ** 2 + ZY_R[6] ** 2, bw = 760, bx = x + 30, by = y2 + 56;
    fillBox(bx, by, bw * s2, 40, C.cyan, 0.8 * q);
    fillBox(bx + bw * s2, by, bw * b2, 40, C.mag, 0.6 * q);
    box(bx - 3, by - 3, bw + 6, 46, C.dim, 0.7 * q, 1.2);
    txt(`s² ${s2.toFixed(6)}`, bx + 12, by + 29, { size: 20, fam: F.mono, w: 700, c: C.bg, a: q });
    txt(`b² ${b2.toFixed(6)}`, bx + bw - 12, by + 29, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: q });
    txt(`R R̃ = s² + b₁₂² + b₁₃² + b₂₃² = ${CL.norm2(ZY_R).toFixed(12)}`, bx, by + 90, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: q });
  }
  /* the rotor */
  const rx = 1010, rw = 790;
  const ra = clamp(k2 * 1.5) * a;
  panel(rx, y, rw, 200, a, C.cyan, 'R = Rz(α) Ry(β) Rz(γ)');
  zyRich([['R(0.37, −0.81, 0.52)', C.white]], rx + 28, y + 80, { size: 30, a });
  txt(`= ${zyRotorS(ZY_R)}`, rx + 28, y + 136, { size: 25, fam: F.mono, w: 700, c: C.vio, a: ra });
  txt('even grades only: masks 0, 3, 5, 6', rx + 28, y + 178, { size: 18, fam: F.mono, c: C.dim, a: ra });
  zyNumTag(rx + rw - 110, y + 25, a);
  /* the ZYZ matrix, column by column */
  const ma = Q(S, 2, 'Sandwich', 0.6) * a, y3 = 400;
  panel(rx, y3, rw, 436, ma, C.cyan, 'ZYZ MATRIX · 矩阵');
  if (ma > 0) {
    const t0 = phraseAt(S, 2, 'basis vectors');
    const colA = [0, 1, 2].map(k => clamp((u - t0 - 0.2 - 0.55 * k) / 0.5));
    const heads = ['Re₁R̃', 'Re₂R̃', 'Re₃R̃'];
    heads.forEach((s, k) => txt(s, rx + 110 + 210 * k + 105, y3 + 86, { size: 24, fam: F.math, w: 700, align: 'center', c: k === 0 ? C.now : C.white, a: ma * colA[k] }));
    const cells = [0, 1, 2].map(i => [0, 1, 2].map(j => zyNum(ZY_COLS[j][i], 6)));
    zyMat(rx + 100, y3 + 156, cells, ma, { size: 25, cw: 210, rh: 54, colA, cols: cells.map(r => r.map((_, j) => (j === 0 ? C.now : C.white))) });
    const ca = clamp((u - t0 - 1.9) / 0.6) * ma;
    txt('= zyz_matrix(0.37, −0.81, 0.52)', rx + 28, y3 + 340, { size: 24, fam: F.mono, w: 700, c: C.white, a: ca });
    txt(`max |R e_k R̃ − column k| = ${ZY_COLERR.toExponential(1)}`, rx + 28, y3 + 390, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: ca });
  }
};

/* ======================================================================= */
/*                          scene 4 · ONE AXIS                               */
/* ======================================================================= */
SCENES.fold = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.4);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'Here the axis', 'computed']]);
  const V = zyView(520, 520, 280, -1.1 + 0.01 * u, 0.4);
  zySphere(V, a);
  /* the three turns, finished, in white */
  zyTrail(V, E1, 1, a * 0.9);
  const p0 = V(E1), end = ZY_COLS[0], pe = V(end), c0 = V([0, 0, 0]);
  ring(p0[0], p0[1], 16, C.white, 0.9 * a, 2);
  txt('e₁', p0[0] - 30, p0[1] + 34, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a });
  /* the single axis n and the single turn by φ */
  const n = ZY_FOLD.n, na = Q(S, 1, 'the axis comes', 0.6) * a;
  if (na > 0) {
    const nB = V(V3.sc(-1.3, n)), nA = V(V3.sc(1.35, n)), nl = V(V3.sc(1.5, n));
    dashed(nB[0], nB[1], nA[0], nA[1], C.vio, na, 3);
    dot(nA[0], nA[1], 12, 'v', na);
    txt('n', nl[0] + 6, nl[1] + 8, { size: 32, fam: F.math, w: 700, align: 'center', c: C.vio, a: na });
    /* the circle e₁ rides about n */
    const par = V3.sc(V3.dot(n, E1), n), perp = V3.sub(E1, par), w2 = V3.cross(n, perp);
    zyPath(V, s => V3.add(par, V3.add(V3.sc(Math.cos(TAU * s), perp), V3.sc(Math.sin(TAU * s), w2))), 96, C.vio, 0.3 * na, 0.12 * na, 1.4);
  }
  const t0 = phraseAt(S, 1, 'sixty-seven'), t1 = phraseAt(S, 2, 'lands exactly') + 0.6;
  const fp = ease(clamp((u - t0 + 0.4) / Math.max(0.8, t1 - t0 + 0.4)));
  if (fp > 0) {
    zyPath(V, s => V3.rot(n, ZY_FOLD.phi * fp * s, E1), 60, C.vio, a, a * 0.5, 4, true);
    const q = V(V3.rot(n, ZY_FOLD.phi * fp, E1));
    dot(q[0], q[1], 13, 'v', a);
  }
  const land = Q(S, 2, 'lands exactly', 0.5, 0.6) * a;
  dot(pe[0], pe[1], 15 + 14 * land, 'g', a);
  if (land > 0) ring(pe[0], pe[1], 26 + 30 * (1 - land), C.now, land, 2.5);
  arrow(c0[0], c0[1], pe[0], pe[1], C.now, a * 0.9, 3);

  /* the literature result */
  const x = 1010, w = 790, y = 170;
  panel(x, y, w, 250, a, C.argued, 'LITERATURE · 文献结果，未在本书形式化');
  zyRich([['Spin(3) → SO(3),  R ↦ (v ↦ R v R̃)', C.white]], x + 28, y + 84, { size: 26, a });
  zyRich([['R = cos(φ/2) − sin(φ/2) B', C.white], ['n', C.vio, 'sub'], ['   ·   ±R: one turn', C.white]], x + 28, y + 140, { size: 26, a: at(S, 0, 0.6, 1.0) * a });
  txt('Nielsen & Chuang Thm 4.1 · Barenco et al. 1995', x + 28, y + 206, { size: 18, fam: F.mono, w: 700, c: C.argued, a });
  /* computed: the axis, the angle, the check */
  const ca = at(S, 1, 0.6, -0.1) * a, y2 = 450;
  panel(x, y2, w, 386, ca, C.cyan, 'THIS ROTOR · 这一枚旋转器');
  zyRich([['φ = 2 arccos ', C.white], [ZY_R[0].toFixed(6), C.cyan], [' = ', C.white], [zyDeg(ZY_FOLD.phi), C.vio]], x + 28, y2 + 84, { size: 28, a: Q(S, 1, 'twice the arc', 0.6) * a });
  txt('n = (−b₂₃, b₁₃, −b₁₂) / sin(φ/2)', x + 28, y2 + 140, { size: 26, fam: F.math, w: 700, c: C.white, a: ca });
  txt(`  = ${zyVecS(n)}`, x + 28, y2 + 186, { size: 26, fam: F.mono, w: 700, c: C.vio, a: ca });
  const la = Q(S, 2, 'One turn', 0.6) * a;
  txt(`three turns  ${zyVecS(end)}`, x + 28, y2 + 248, { size: 22, fam: F.mono, w: 700, c: C.now, a: la });
  txt(`one turn     ${zyVecS(V3.rot(n, ZY_FOLD.phi * fp, E1))}`, x + 28, y2 + 288, { size: 22, fam: F.mono, w: 700, c: C.vio, a: la });
  txt(`max |Δ| over e₁, e₂, e₃ = ${ZY_FOLDERR.toExponential(1)}`, x + 28, y2 + 342, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: land });
  zyNumTag(x + w - 110, y2 + 25, ca);
};

/* ======================================================================= */
/*                          scene 5 · T AND H                                */
/* ======================================================================= */
function zyGateRotor(S) {
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  const tT = ease(clamp((S.u - L0.s - 0.6) / Math.max(1, L0.e - L0.s - 1.2)));
  if (S.u < L1.s - 0.25) return { R: CL.compile(Math.PI / 4 * tT, 0, 0), gate: 'T', g: 0, b: 0 };
  const g = ease(clamp((S.u - L1.s - 0.4) / Math.max(1, L1.e - L1.s - 0.6)));
  const b = ease(clamp((S.u - L2.s) / Math.max(1, L2.e - L2.s - 0.2)));
  return { R: CL.compile(0, Math.PI / 2 * b, Math.PI * g), gate: 'H', g, b };
}
SCENES.gates = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.4);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const L1 = lineAt(S, 1), st = zyGateRotor(S);
  /* a short blink when the tripod resets for H */
  const blink = 1 - 0.85 * clamp(1 - Math.abs(u - (L1.s - 0.25)) / 0.25);
  const V = zyView(520, 520, 280, -2.2 + 0.03 * u, 0.32);
  const hiZ = st.gate === 'T' ? at(S, 0, 0.6, 0.4) : (st.g > 0 && st.g < 0.995 ? 1 : 0), hiY = st.gate === 'H' && st.b > 0 && st.b < 0.995 ? 1 : 0;
  zySphere(V, a, { hi: { z: hiZ, y: hiY } });
  if (st.gate === 'T') {
    const tT = Math.acos(Math.min(1, st.R[0])) * 2;
    zyPath(V, s => [Math.cos(tT * s), Math.sin(tT * s), 0], 30, C.now, a, a * 0.5, 4);
  } else {
    if (st.g > 0) zyPath(V, s => CL.apply(CL.rotor('z', Math.PI * st.g * s), E1), 40, st.g < 1 ? C.now : C.white, a, a * 0.5, st.g < 1 ? 4 : 3);
    if (st.b > 0) zyPath(V, s => CL.apply(CL.mul(CL.rotor('y', Math.PI / 2 * st.b * s), CL.rotor('z', Math.PI)), E1), 40, st.b < 1 ? C.now : C.white, a, a * 0.5, st.b < 1 ? 4 : 3);
    const ax = Q(S, 2, 'It swaps', 0.6, 0.8) * a;
    if (ax > 0) {
      const nB = V(V3.sc(-1.3, ZY_HAX.n)), nA = V(V3.sc(1.35, ZY_HAX.n));
      dashed(nB[0], nB[1], nA[0], nA[1], C.vio, ax, 3);
      txt('(e₁ + e₃)/√2', nB[0] + 16, nB[1] + 20, { size: 22, fam: F.math, w: 700, c: C.vio, a: ax });
    }
  }
  const p0 = V(E1);
  ring(p0[0], p0[1], 16, C.white, 0.7 * a, 2);
  zyTripod(V, st.R, a * blink);

  const x = 1010, w = 790, y = 170;
  const ta = a * (st.gate === 'T' ? 1 : 0.45);
  panel(x, y, w, 270, a, st.gate === 'T' ? C.now : C.cyan, 'T GATE · T 门');
  zyRich([['T = diag(1, e', C.white], ['iπ/4', C.white, 'sup'], [') = e', C.white], ['iπ/8', C.white, 'sup'], [' ', C.white], ...zyR('z', 'π/4', C.white)], x + 28, y + 84, { size: 28, a: ta });
  txt('(α, β, γ) = (π/4, 0, 0)', x + 28, y + 136, { size: 26, fam: F.mono, w: 700, c: C.white, a: ta });
  zyRich([['R', C.vio], ['T', C.vio, 'sub'], [` = cos(π/8) − sin(π/8) e₁e₂ = ${zyRotorS(ZY_T)}`, C.vio]], x + 28, y + 196, { size: 24, a: ta * Q(S, 0, 'forty-five', 0.6) });
  txt('global phase e^(iπ/8) does not move the arrow', x + 28, y + 244, { size: 18, fam: F.mono, c: C.dim, a: ta });
  const ha = at(S, 1, 0.6, -0.2) * a, y2 = 470;
  panel(x, y2, w, 366, ha, C.now, 'HADAMARD · 阿达玛门');
  txt('(α, β, γ) = (0, π/2, π)', x + 28, y2 + 84, { size: 26, fam: F.mono, w: 700, c: C.white, a: ha });
  zyRich([['R', C.vio], ['H', C.vio, 'sub'], [` = ${zyRotorS(ZY_H)}`, C.vio]], x + 28, y2 + 140, { size: 28, a: ha * Q(S, 1, 'a pure bivector', 0.6) });
  txt('= −(e₁e₂ + e₂e₃)/√2   scalar part 0 → φ = 180°', x + 28, y2 + 184, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ha * Q(S, 1, 'a pure bivector', 0.6) });
  const sa = Q(S, 2, 'It swaps', 0.6) * a;
  const img = BASIS.map(e => CL.apply(ZY_H, e));
  const fmt = v => { const k = v.findIndex(x => Math.abs(x) > 0.5); return (v[k] < 0 ? '−' : '') + 'e' + '₁₂₃'[k]; };
  [0, 1, 2].forEach(k => zyRich([[`R e${'₁₂₃'[k]} R̃ = `, C.white], [fmt(img[k]), k === 0 ? C.now : C.white]], x + 28 + 250 * k, y2 + 254, { size: 26, a: sa }));
  txt('a turn by 180° about (e₁ + e₃)/√2', x + 28, y2 + 320, { size: 22, fam: F.mono, w: 700, c: C.vio, a: Q(S, 2, 'flips', 0.6, 0.4) * a });
  zyNumTag(x + w - 110, y + 25, a);
};

/* ======================================================================= */
/*                          scene 6 · ON THE SPHERE                          */
/* ======================================================================= */
SCENES.sphere = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean']]);
  const L0 = lineAt(S, 0), L2 = lineAt(S, 2);
  const p = ease(clamp((u - L0.s) / Math.max(1, L2.e - L0.s)));
  const v = zyChainVec(E1, p);
  const V = zyView(520, 520, 280, -2.2 + 0.03 * u, 0.32);
  zySphere(V, a);
  zyTrail(V, E1, p, a * 0.9);
  zyVec(V, v, C.now, a, { label: 'v', off: 30 });
  /* the mixed state blochMatrix(1, 0.6 v): inside the ball */
  const mi = Q(S, 3, 'positive semidefinite', 0.6) * a;
  if (mi > 0) {
    const m = V3.sc(ZY_MIX, v), pm = V(m);
    zyPath(V, s => [ZY_MIX * Math.cos(TAU * s), ZY_MIX * Math.sin(TAU * s), 0], 72, C.white, 0.35 * mi, 0.15 * mi, 1.4, true);
    dot(pm[0], pm[1], 16, 'w', mi);
    txt('0.6 v', pm[0] + 22, pm[1] + 40, { size: 24, fam: F.math, w: 700, c: C.white, a: mi });
  }
  const pure = Q(S, 2, 'Bloch vector of length', 0.5, 0.2);
  if (pure > 0) ring(V.cx, V.cy, V.R, C.lean, pure * a * 0.9, 4);

  const x = 1010, w = 790, y = 170;
  panel(x, y, w, 330, a, C.cyan, 'ρ = blochMatrix(1, v)');
  const rho = zyBloch(1, v);
  const cz = z => (Math.abs(z[1]) < 5e-4 ? zyNum(z[0]) : `${zyNum(z[0])} ${z[1] < 0 ? '−' : '+'} ${Math.abs(z[1]).toFixed(3)}i`);
  txt('½ [[1 + z, x − iy], [x + iy, 1 − z]] =', x + 28, y + 80, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  zyMat(x + 40, y + 140, [[cz(rho[0]), cz(rho[1])], [cz(rho[2]), cz(rho[3])]], a, { size: 24, cw: 250, rh: 50, c: C.now });
  const l1 = Q(S, 1, 'trace is one', 0.6) * a, l2 = Q(S, 1, 'gives v back', 0.6) * a;
  zyLean(x + 28, y + 254, 'blochMatrix_trace', l1, { size: 18 });
  txt(`Tr ρ = ${(rho[0][0] + rho[3][0]).toFixed(6)}`, x + 470, y + 254, { size: 22, fam: F.math, w: 700, c: C.lean, a: l1 });
  zyLean(x + 28, y + 300, 'bloch_blochMatrix', l2, { size: 18 });
  txt('bloch ρ = v', x + 470, y + 300, { size: 22, fam: F.math, w: 700, c: C.lean, a: l2 });

  const y2 = 520, a2 = at(S, 2, 0.6, -0.2) * a;
  panel(x, y2, w, 316, a2, C.cyan, 'PURE · MIXED · 纯态与混态');
  const sq = zyMul2(rho, rho), idem = Math.max(...sq.map((z, i) => Math.hypot(z[0] - rho[i][0], z[1] - rho[i][1])));
  txt(`ρ·ρ = ρ  (max |Δ| ${idem.toExponential(0)})   det ρ = (1 − |v|²)/4 = ${zyNum(zyDet(rho)[0])}`, x + 28, y2 + 76, { size: 20, fam: F.math, w: 700, c: C.cyan, a: a2 });
  zyLean(x + 28, y2 + 128, 'bloch_geometry_of_isHermitian', a2, { size: 18 });
  txt('Tr M = 1 → M·M = M → ‖bloch M‖ = 1', x + 28, y2 + 170, { size: 22, fam: F.math, w: 700, c: C.lean, a: Q(S, 2, 'squares to itself', 0.6) * a });
  const mm = zyBloch(1, V3.sc(ZY_MIX, v));
  zyLean(x + 28, y2 + 230, 'norm_bloch_le_trace_of_posSemidef', mi, { size: 18 });
  txt(`M = blochMatrix(1, 0.6 v):  ‖bloch M‖ = ${(ZY_MIX * V3.norm(v)).toFixed(3)} ≤ ${(mm[0][0] + mm[3][0]).toFixed(3)} = Re Tr M`, x + 28, y2 + 276, { size: 19, fam: F.mono, w: 700, c: C.lean, a: mi });
  stamp('‖v‖ = 1', 520, 205, Q(S, 2, 'Bloch vector of length', 0.4, 0.2) * clamp((lineAt(S, 3).s - u) / 1.0 + 1.5), C.lean, 40, -0.05);
};

/* ======================================================================= */
/*                                  close                                    */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                  poster                                   */
/* ======================================================================= */
FILM.poster = () => {
  const t = 70.0, si = 3;
  background(t, TL.scenes[si], si, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.2, cx: 1340, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const V = zyView(500, 520, 300, -1.0, 0.4);
  zySphere(V, 1, { hi: { z: 0.6, y: 0.6 } });
  zyTrail(V, E1, 1, 1);
  const n = ZY_FOLD.n, nB = V(V3.sc(-1.3, n)), nA = V(V3.sc(1.35, n));
  dashed(nB[0], nB[1], nA[0], nA[1], C.vio, 1, 3);
  zyPath(V, s => V3.rot(n, ZY_FOLD.phi * s, E1), 60, C.vio, 1, 0.5, 4, true);
  const p0 = V(E1); ring(p0[0], p0[1], 16, C.white, 0.9, 2);
  zyTripod(V, ZY_R, 1, { labels: false });
  const [tz1, tz2] = DATA.film.title_zh.split('：');
  txt(tz1, 1330, 250, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt(tz2, 1330, 336, { size: 62, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('COMPILING A ROTATION', 1330, 428, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('INTO THREE TURNS', 1330, 482, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  zyRich([...zyR('z', 'α', C.vio), [' ', C.white], ...zyR('y', 'β', C.vio), [' ', C.white], ...zyR('z', 'γ', C.vio), ['  ·  v ↦ R v R̃', C.now]], 1330, 560, { size: 40, align: 'center', ab: 1 });
  txt(zyRotorS(ZY_R), 1330, 624, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.vio });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 1330, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(1330, 770, 1, { align: 'center', size: 17, gap: 32 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, TL.scenes[si]);
  post(si);
};
