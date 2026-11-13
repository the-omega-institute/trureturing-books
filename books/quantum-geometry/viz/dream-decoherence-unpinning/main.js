/* ORTHO//DREAM · 梦境擦除 (chapter 37).
   One object on every scene: a density matrix drawn as a grid (the area of the square in cell (i, j) is |ρᵢⱼ|, the
   needle inside points to its phase, the dashed frame is its size at the start of the scene) and, beside it, the
   brightness it leaves on a far screen, env(u)·Σᵢⱼ Re(ρᵢⱼ e^{iK(dᵢ − dⱼ)u}): the dashed cyan curve is the diagonal
   alone, the magenta fill is what the coherence adds.
     anchor  a real global pure state Ψ on four places x₀…x₃ (x₀ is the body) and a family of anchor projections
             (every place, or body | the rest); ρ(λ) = (1 − λ)|Ψ⟩⟨Ψ| + λ Σₖ PₖΨΨ*Pₖ, i.e. cross-block entries times
             1 − λ. The rail moves λ along the current card's path [λ_a, λ_b].
     record  the equal superposition of two paths; two environment records, each with overlap c = |c|e^{−iφ} at
             (0, 1); the rail is four steps: write copy 0, write copy 1 (ρ₀₁ ×c each), reverse copy 0, reverse
             copy 1 (×c̄ each). Between steps the factor is interpolated as ((1 − f) + f|c|)·e^{∓iφf}.
     wake    the dream state ρ(λ) anchored at every place, read by P₀ = |x₀⟩⟨x₀|: everything but cell (0, 0) is
             multiplied by 1 − s, s the rail. The forgotten weight is 1 − Tr(P₀ρ).
   Above the flat panels (or beside them on a short, wide stage) the same matrix is drawn as a lit solid with
   kit.solid: a schematic apparatus (MODEL, not an optical simulation) — a plate with one slit per place, a column of
   height ∝ ρᵢᵢ on each slit, an arch of thickness ∝ |ρᵢⱼ| between two slits, and a curved screen whose relief and
   shade follow the brightness of the flat screen plot. The flat panels are drawn on #flat, laid over the WebGL canvas;
   #cv only keeps the last solid frame as a picture when the context rests (inside a book).
   Read-only probe for the browser suite: window.DREAM_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { const el = $(id); if (el.textContent !== value) el.textContent = value; };
  const DEG = Math.PI / 180, TAU = Math.PI * 2;
  const S = { scene: 'anchor', fam: 'fine', w: 0.4, path: [0, 1], lamDream: 0.1, r: 1, phi: 90 };
  const SC = {
    anchor: { max: 1, rate: 0.4, step: 0.1 },
    record: { max: 4, rate: 1.1, step: 1 },
    wake: { max: 1, rate: 0.5, step: 0.25 }
  };
  /* a phone's cited figure: the share of the height (between the title and the legend) that the apparatus band takes
     at most; on a phone the flat panels under the band first keep the room for a grid of GRID_MIN px */
  const CB = { anchor: 0.42, rec: 0.42 }, GRID_MIN = 82;

  /* ---------- the mathematics ---------- */
  const amps = () => { const o = Math.sqrt((1 - S.w) / 3); return [Math.sqrt(S.w), o, o, o]; };
  const sameBlock = (fam, i, j) => (fam === 'fine' ? i === j : (i === 0) === (j === 0));
  const lamNow = () => (S.scene === 'wake' ? S.lamDream : S.path[0] + (S.path[1] - S.path[0]) * clock.t);
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cabs = (a) => Math.hypot(a[0], a[1]);
  /** ρ(λ) for the anchor family fam (real entries): returns rows of [re, im]. */
  function anchored(lam, fam) {
    const a = amps();
    return a.map((ai, i) => a.map((aj, j) => [ai * aj * (sameBlock(fam, i, j) ? 1 : 1 - lam), 0]));
  }
  const STEPS = [{ copy: 0, rev: false }, { copy: 1, rev: false }, { copy: 0, rev: true }, { copy: 1, rev: true }];
  /** ρ₀₁ after the record steps up to t (4 steps), from 1/2. */
  function z01(t) {
    let z = [0.5, 0];
    STEPS.forEach((st, k) => {
      const f = clamp(t - k, 0, 1); if (f <= 0) return;
      const mod = (1 - f) + f * S.r, ang = (st.rev ? 1 : -1) * S.phi * DEG * f;
      z = cmul(z, [mod * Math.cos(ang), mod * Math.sin(ang)]);
    });
    return z;
  }
  const overlap = () => [S.r * Math.cos(S.phi * DEG), -S.r * Math.sin(S.phi * DEG)];   // c = |c|e^{−iφ}
  /** The matrix on the stage now, its starting magnitudes, and the role of each cell. */
  function current() {
    if (S.scene === 'record') {
      const z = z01(clock.t);
      return { n: 2, rho: [[[0.5, 0], z], [[z[0], -z[1]], [0.5, 0]]], ghost: [[0.5, 0.5], [0.5, 0.5]], role: (i, j) => (i === j ? 'keep' : 'coh') };
    }
    if (S.scene === 'wake') {
      const d = anchored(S.lamDream, 'fine'), s = clock.t;
      return { n: 4, rho: d.map((row, i) => row.map((v, j) => (i === 0 && j === 0 ? v : [v[0] * (1 - s), v[1] * (1 - s)]))), ghost: d.map((row) => row.map(cabs)), role: (i, j) => (i === 0 && j === 0 ? 'read' : 'fade') };
    }
    const a = amps();
    return { n: 4, rho: anchored(lamNow(), S.fam), ghost: a.map((ai) => a.map((aj) => ai * aj)), role: (i, j) => (sameBlock(S.fam, i, j) ? 'keep' : 'cut') };
  }
  /** Eigenvalues of a real symmetric matrix by cyclic Jacobi rotations; also the eigenvectors (columns of V). */
  function jacobi(M) {
    const n = M.length, A = M.map((r) => r.slice()), V = A.map((r, i) => r.map((_, j) => (i === j ? 1 : 0)));
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
        for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
      }
    }
    return { vals: A.map((r, i) => r[i]), V };
  }
  const H = (vals) => vals.reduce((s, x) => (x > 1e-15 ? s - x * Math.log(x) : s), 0);
  function eigen(m) {
    if (m.n === 2 && S.scene === 'record') { const a = cabs(m.rho[0][1]); return [0.5 + a, 0.5 - a]; }
    return jacobi(m.rho.map((row) => row.map((v) => v[0]))).vals;
  }
  /** D(Ψ ‖ 𝒫Ψ) = −⟨Ψ| log 𝒫(Ψ) |Ψ⟩ (Ψ is pure), through the eigenvectors of 𝒫(Ψ). */
  function relEntropy(fam) {
    const a = amps(), { vals, V } = jacobi(anchored(1, fam).map((row) => row.map((v) => v[0])));
    let s = 0;
    vals.forEach((mu, m) => { const ov = a.reduce((acc, ai, i) => acc + ai * V[i][m], 0) ** 2; if (mu > 1e-14) s -= ov * Math.log(mu); });
    return s;
  }
  /** Norm of the coherence the anchor family can cut: √Σ over cross-block entries of |ρᵢⱼ|². */
  const crossNorm = (rho, fam) => { let s = 0; rho.forEach((row, i) => row.forEach((v, j) => { if (!sameBlock(fam, i, j)) s += v[0] * v[0] + v[1] * v[1]; })); return Math.sqrt(s); };

  /* ---------- the screen ---------- */
  const SCREEN = { 4: { d: [-1.5, -0.5, 0.5, 1.5], K: TAU / 0.8, sig: 0.5, ymax: 4.3 }, 2: { d: [-0.5, 0.5], K: TAU / 0.5, sig: 0.55, ymax: 2.15 } };
  /** Brightness at u: all of it, the diagonal alone, and the diagonal plus the off-diagonal entries whose role is
      'keep' (coherence inside an anchor block, drawn cyan; the rest of the coherence is drawn magenta). */
  function screen(rho, u, role) {
    const n = rho.length, sc = SCREEN[n], env = Math.exp(-u * u / (2 * sc.sig * sc.sig));
    let diag = 0, all = 0, kept = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const th = sc.K * (sc.d[i] - sc.d[j]) * u, v = rho[i][j][0] * Math.cos(th) - rho[i][j][1] * Math.sin(th);
      all += v; if (i === j) diag += v; else if (role && role(i, j) === 'keep') kept += v;
    }
    return { all: env * all, diag: env * diag, kept: env * (diag + kept) };
  }

  /* ---------- the solid stage: a schematic apparatus drawn from the same matrix (kit.solid) ----------
     x along the plate, y from the plate towards the screen, z up (as kit.stage3); everything is lowered by Z0 so that
     the camera turns about the middle of the apparatus. A thick plate with one slit per place (four, or two in the
     record scene; the slit of xᵢ at SLIT[n][i]); on top of each slit a cyan column of height COL·ρᵢᵢ (the weight, in
     every scene); from the top of the plate behind slit i to the one behind slit j an arch whose tube
     radius is ARCH·|ρᵢⱼ|, coloured as cell (i, j) of the grid (cyan: kept inside an anchor block; magenta: cut, or
     fading on waking), over a dashed grey line along the same arch that marks where it started (as the dashed frames
     of the grid); behind the plate a curved, back-leaning screen pushed towards the plate by SCR.rel·all(u)/ymax and
     shaded from faint to ink by all(u)/ymax, all(u) the brightness the flat screen plot draws at the same u. Beads mark
     each place on both faces of the plate (one face always hides the other's) and on top of its column. */
  const CAM = { yaw: -0.28, pitch: 0.38 };
  const SLIT = { 4: [-1.05, -0.35, 0.35, 1.05], 2: [-0.5, 0.5] };
  const PL = { x: 1.75, y0: -0.6, y1: -0.44, h: 0.56, s0: 0.16, s1: 0.46 };   // half width, front and back face, height, slit bottom and top
  const COL = 0.8, COLW = 0.05, ARCH = 0.12, Z0 = 0.45;
  const SCR = { x: 1.75, y: 0.4, bow: 0.25, lean: 0.25, h: 0.85, rel: 0.2 };
  const COLY = [PL.y0 + 0.02, PL.y0 + 0.02 + 2 * COLW];
  const wpt = (x, y, z) => [x, y, z - Z0];
  /* the stage: kit.solid on #cv (the picture it keeps when the context rests); onPick, onDrag and onDrop are set with
     the controls below (the matrix grid scrubs the rail; everywhere else turns the apparatus); centre and scale are
     set by fitSolid and applyFit each frame */
  const SO = { canvas: $('cv'), yaw: CAM.yaw, pitch: CAM.pitch, zoom: 1, radius: 0.36, cx: 0.5, cy: 0.3, wheel: false, onChange: () => paint() };
  const st = kit.solid($('stage'), SO);
  const slitHalf = (n) => (n === 4 ? 0.06 : 0.08);
  const cyanRole = (role) => role === 'keep' || role === 'read';
  /** An axis-aligned box from corner a to corner b, appended to a vertex and face list. */
  function boxInto(V, F, a, b) {
    const k = V.length;
    for (const z of [a[2], b[2]]) for (const y of [a[1], b[1]]) for (const x of [a[0], b[0]]) V.push(wpt(x, y, z));
    F.push([k, k + 1, k + 3, k + 2], [k + 4, k + 6, k + 7, k + 5], [k, k + 4, k + 5, k + 1], [k + 2, k + 3, k + 7, k + 6], [k, k + 2, k + 6, k + 4], [k + 1, k + 5, k + 7, k + 3]);
  }
  /** The arch from the top of the plate behind slit i to the one behind slit j: half an ellipse leaning back towards
      the screen, the wider the pair the higher and the further back. */
  function archPts(n, i, j) {
    const a = SLIT[n][i], b = SLIT[n][j], half = (b - a) / 2, mid = (a + b) / 2, H = 0.16 + 0.42 * half, al = 0.25 + 0.55 * half + 0.07 * i;
    const yb = PL.y1 - 0.035, pts = [];
    for (let k = 0; k <= 40; k++) { const t = Math.PI * k / 40, e = H * Math.sin(t); pts.push(wpt(mid - half * Math.cos(t), yb + e * Math.sin(al), PL.h + e * Math.cos(al))); }
    return pts;
  }
  /** The screen at (u, v), u the abscissa of the flat screen plot, v from its foot (0) to its top (1); I = all(u)/ymax. */
  const screenPt = (u, v, I) => wpt(SCR.x * u, SCR.y - SCR.bow * u * u + SCR.lean * v - SCR.rel * I, SCR.h * v);
  /** Points that bound the apparatus whatever the state (the tallest column the weight slider allows, the screen at
      full relief): every view is fitted to them, never larger than the default one, so the apparatus does not breathe
      as the state moves. */
  const FIT_PTS = (() => {
    const pts = [];
    for (const x of [-PL.x, PL.x]) for (const y of [PL.y0, PL.y1]) for (const z of [0, PL.h]) pts.push(wpt(x, y, z));
    pts.push(wpt(SLIT[4][0], COLY[0], PL.h + COL * 0.85));
    for (const u of [-1, -0.5, 0, 0.5, 1]) for (const v of [0, 1]) for (const I of [0, 1]) pts.push(screenPt(u, v, I));
    for (const n of [4, 2]) for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) archPts(n, i, j).forEach((q, k) => { if (k % 4 === 0) pts.push(q); });
    return pts;
  })();
  /** Fit the apparatus, seen from (yaw, pitch), into the box r (stage pixels), at a scale of at most cap pixels per
      unit: returns its centre and scale and the box it covers in that view (apply sets the stage to them). */
  function fitSolid(r, yaw = CAM.yaw, pitch = CAM.pitch, cap = Infinity) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of FIT_PTS) {
      const a = cy * p[0] - sy * p[1], b = -(sy * sp * p[0] + cy * sp * p[1] + cp * p[2]);
      x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b);
    }
    const unit = Math.max(8, Math.min(cap, r.w / (x1 - x0), r.h / (y1 - y0)));
    const cx = r.x + r.w / 2 - unit * (x0 + x1) / 2, cyy = r.y + r.h / 2 - unit * (y0 + y1) / 2;
    return { l: cx + unit * x0, r: cx + unit * x1, t: cyy + unit * y0, b: cyy + unit * y1, unit, cx, cy: cyy };
  }
  /** Set the stage to a fit (kit.solid multiplies the scale by the camera's zoom, so it is divided out here). */
  function applyFit(f, Wd, Ht) { SO.radius = f.unit / (Math.max(1, Math.min(Wd, Ht)) * (st.cam.zoom || 1)); SO.cx = f.cx / Math.max(1, Wd); SO.cy = f.cy / Math.max(1, Ht); }
  let solidInfo = null, screenF = null, nameAt = { dx: 0, dy: 15 };
  function drawSolid(m, words) {
    const n = m.n, xs = SLIT[n], sh = slitHalf(n), V = [], F = [];
    // the plate: a bar under the slits, a bar over them, and the posts between them
    boxInto(V, F, [-PL.x, PL.y0, 0], [PL.x, PL.y1, PL.s0]);
    boxInto(V, F, [-PL.x, PL.y0, PL.s1], [PL.x, PL.y1, PL.h]);
    const ends = [-PL.x].concat(...xs.map((x) => [x - sh, x + sh]), [PL.x]);
    for (let k = 0; k < ends.length; k += 2) boxInto(V, F, [ends[k], PL.y0, PL.s0], [ends[k + 1], PL.y1, PL.s1]);
    st.poly('plate', { vertices: V, faces: F }, { color: P.dim, edges: false });
    // the columns: the diagonal
    const columns = [], cyc = (COLY[0] + COLY[1]) / 2;
    for (let i = 0; i < n; i++) {
      const role = m.role(i, i), hgt = COL * m.rho[i][i][0];
      columns.push({ i, x: xs[i], h: hgt, color: 'cyan' });
      if (hgt > 1e-4) { const CV = [], CF = []; boxInto(CV, CF, [xs[i] - COLW, COLY[0], PL.h], [xs[i] + COLW, COLY[1], PL.h + hgt]); st.poly(`col${i}`, { vertices: CV, faces: CF }, { color: P.cyan, edges: false }); }
    }
    // the arches: the coherence
    const arches = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const pts = archPts(n, i, j), role = m.role(i, j), r = ARCH * cabs(m.rho[i][j]), shown = r * st.unit >= 0.4;
      st.line(pts, { color: P.dim, width: 1.2, dash: [4, 4] });
      if (shown) st.tube(`arch${i}${j}`, pts, { r, color: roleColor(role), sides: 12 });
      arches.push({ i, j, r, shown, color: cyanRole(role) ? 'cyan' : 'magenta' });
    }
    // the screen: the brightness of the flat plot, as relief and shade
    const ymax = SCREEN[n].ymax, seen = new Map();
    const I = (u) => { let v = seen.get(u); if (v == null) { v = screen(m.rho, u, m.role).all / ymax; seen.set(u, v); } return v; };
    screenF = (u, v) => screenPt(u, v, I(u));
    st.surface('screen', screenF, { u: [-1, 1], v: [0, 1], nu: 200, nv: 6, value: (u) => I(u), colors: [P.faint, P.ink], range: [0, 1], alpha: 1 });
    // the places on both faces of the plate, and on top of their columns
    const rb = 4.5 * st.lw / st.unit, rt = 3.6 * st.lw / st.unit, zb = PL.s0 / 2, nm = NAMES();
    for (let i = 0; i < n; i++) {
      const front = wpt(xs[i], PL.y0 - rb, zb);
      st.bead(front, { r: 4.5, color: P.ink, key: `front${i}` });
      st.bead(wpt(xs[i], PL.y1 + rb, zb), { r: 4.5, color: P.ink, key: `back${i}` });
      st.bead(wpt(xs[i], cyc, PL.h + columns[i].h + rt), { r: 3.6, color: P.cyan, key: `top${i}` });
      if (words) st.tag(`x${i}`, front, nm[i], 'num', nameAt);
    }
    if (S.scene === 'wake') st.ring(wpt(xs[0], cyc, PL.h + columns[0].h + rt), { r: 10, color: P.amber, normal: [0, 0, 1], key: 'read' });
    solidInfo = { n, slits: xs.slice(), unit: st.unit, columns, arches, ymax, consts: { COL, ARCH, Z0, PL: Object.assign({}, PL), SCR: Object.assign({}, SCR), slitHalf: sh } };
  }
  /** What the apparatus stands for: lines for its left and its right side. */
  const captionLines = () => ({
    left: [[L('缝：位置 xᵢ', 'slits: places xᵢ'), P.dim], [L('柱高 ∝ 权重 ρᵢᵢ', 'column height ∝ ρᵢᵢ'), P.ink], [L('拱粗 ∝ 相干 |ρᵢⱼ|', 'arch thickness ∝ |ρᵢⱼ|'), P.ink]],
    right: [[L('屏的起伏 ∝ 亮度', 'screen relief ∝ brightness'), P.ink], [L('示意模型，不是光学模拟', 'a schematic, not optics'), P.dim]]
  });
  /** The room [left, right] in pixels those lines need beside the apparatus. */
  function captionRoom(ctx) {
    const c = captionLines(); ctx.font = `11px ${face('body')}`;
    const wid = (ls) => Math.max(...ls.map(([s]) => ctx.measureText(s).width)) + 14;
    return [wid(c.left), wid(c.right)];
  }
  /** The caption: beside the apparatus, or (strip) in one line above it, where the fit has left a strip for it. */
  function solidCaption(ctx, r3, fit, strip) {
    const { left, right } = captionLines();
    if (!strip) {
      const mid = (fit.t + fit.b) / 2;
      left.forEach(([s, c], k) => text(ctx, s, fit.l - 8, mid + (k - 1) * 17, c, { align: 'right', size: 11, face: 'body' }));
      right.forEach(([s, c], k) => text(ctx, s, fit.r + 8, mid + (k - 0.5) * 17, c, { align: 'left', size: 11, face: 'body' }));
      return;
    }
    const one = L('示意装置：柱高 ∝ ρᵢᵢ · 拱粗 ∝ |ρᵢⱼ| · 屏的起伏 ∝ 亮度', 'schematic: columns ∝ ρᵢᵢ · arches ∝ |ρᵢⱼ| · screen ∝ brightness');
    ctx.font = `10.5px ${face('body')}`;
    text(ctx, ctx.measureText(one).width <= r3.w ? one : L('示意装置（模型）', 'schematic apparatus (model)'), r3.x, r3.y + 6, P.dim, { size: 10.5, face: 'body' });
  }

  /* ---------- drawing ---------- */
  const thick = () => (TRV.thumbMode ? 2 : 1);
  const face = (f) => (f === 'body' ? TRV.fonts.body : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11.5}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y);
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }
  const fmtC = (z, d) => {
    const re = Math.abs(z[0]) < 0.5 * 10 ** -d ? 0 : z[0], im = Math.abs(z[1]) < 0.5 * 10 ** -d ? 0 : z[1];
    if (!im) return sgn(re, d).replace(/^\+/, '');
    if (!re) return `${sgn(im, d).replace(/^\+/, '')}i`;
    return `${sgn(re, d).replace(/^\+/, '')} ${im < 0 ? '−' : '+'} ${fix(Math.abs(im), d)}i`;
  };
  const NAMES = () => (S.scene === 'record' ? ['x₀', 'x₁'] : ['x₀', 'x₁', 'x₂', 'x₃']);
  let grid = null, disc = null;
  const roleColor = (role) => (role === 'keep' ? P.cyan : role === 'read' ? P.cyan : P.magenta);

  /** The room for the names of the places above and left of the grid (the record scene of a phone's figure has no
      word over its two names, so it keeps less), and the side of the grid a matrix box R holds, the two record boxes
      under it in the record scene (lower in a phone's figure). layout() asks the same function. */
  const matHead = (R) => (TRV.thumbMode ? 6 : R.cmp && S.scene === 'record' ? 22 : 30);
  const gridSide = (R) => { const head = matHead(R); return Math.min(R.w - head, R.h - head - (S.scene === 'record' && !TRV.thumbMode ? (R.cmp ? 36 : 52) : 0)); };
  function drawMatrix(ctx, R, m) {
    const n = m.n, words = !TRV.thumbMode, head = matHead(R), tk = thick();
    const size = Math.max(40, gridSide(R));
    const x0 = R.x + head + Math.max(0, (R.w - head - size) / 2), y0 = R.y + head, cs = size / n;
    grid = { x0, y0, cs, n, size };
    let gmax = 0; m.ghost.forEach((row) => row.forEach((v) => { gmax = Math.max(gmax, v); }));
    const side = (v) => cs * (words ? 0.72 : 0.88) * Math.sqrt(Math.max(0, v) / gmax);
    // blocks of the anchor family
    if (S.scene === 'anchor') {
      const blocks = S.fam === 'fine' ? [[0, 0], [1, 1], [2, 2], [3, 3]] : [[0, 0], [1, 3]];
      ctx.strokeStyle = P.dim; ctx.lineWidth = 1.6 * tk; ctx.globalAlpha = 0.95;
      for (const [a, b] of blocks) ctx.strokeRect(x0 + a * cs + 1.5, y0 + a * cs + 1.5, (b - a + 1) * cs - 3, (b - a + 1) * cs - 3);
      ctx.globalAlpha = 1;
    }
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const cx = x0 + (j + 0.5) * cs, cy = y0 + (i + 0.5) * cs, v = cabs(m.rho[i][j]), g = m.ghost[i][j], role = m.role(i, j), col = roleColor(role);
      ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(x0 + j * cs + 0.5, y0 + i * cs + 0.5, cs - 1, cs - 1);
      const sg = side(g), sv = side(v);
      if (sg > 1) { ctx.setLineDash([4, 3]); ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.5; ctx.lineWidth = 1 * tk; ctx.strokeRect(cx - sg / 2, cy - sg / 2, sg, sg); ctx.setLineDash([]); ctx.globalAlpha = 1; }
      if (sv > 0.5) {
        ctx.fillStyle = TRV.alpha(col, role === 'keep' || role === 'read' ? 0.78 : 0.7); ctx.shadowColor = col; ctx.shadowBlur = TRV.thumbMode ? 14 : 8;
        ctx.fillRect(cx - sv / 2, cy - sv / 2, sv, sv); ctx.shadowBlur = 0;
      }
      if (i !== j && v > 1e-3) {   // the phase needle
        const ang = Math.atan2(m.rho[i][j][1], m.rho[i][j][0]), len = Math.max(sv / 2 - 2, cs * 0.12);
        ctx.strokeStyle = P.ink; ctx.lineWidth = 2 * tk; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + len * Math.cos(ang), cy - len * Math.sin(ang)); ctx.stroke();
        ctx.fillStyle = P.ink; ctx.beginPath(); ctx.arc(cx, cy, 2 * tk, 0, TAU); ctx.fill();
      }
      if (role === 'read') { ctx.strokeStyle = P.amber; ctx.lineWidth = 2.5 * tk; ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.strokeRect(x0 + j * cs + 2, y0 + i * cs + 2, cs - 4, cs - 4); ctx.shadowBlur = 0; }
      if (words && cs >= 64) {
        const str = S.scene === 'record' ? fmtC(m.rho[i][j], 2) : fix(v, 2);
        text(ctx, str, cx, y0 + (i + 1) * cs - cs * 0.06, P.ink, { align: 'center', size: cs >= 110 ? 12.5 : 10.5 });
      }
    }
    if (words) {
      const nm = NAMES();
      for (let k = 0; k < n; k++) {
        text(ctx, nm[k], x0 + (k + 0.5) * cs, y0 - 12, k === 0 && S.scene !== 'record' ? P.ink : P.dim, { align: 'center', size: 12 });
        text(ctx, nm[k], x0 - 8, y0 + (k + 0.5) * cs, k === 0 && S.scene !== 'record' ? P.ink : P.dim, { align: 'right', size: 12 });
      }
      if (S.scene !== 'record' && cs >= 46) text(ctx, L('躯体', 'body'), x0 + 0.5 * cs, y0 - 25, P.dim, { align: 'center', size: 10, face: 'body' });
    }
    if (S.scene === 'record' && words) drawRecords(ctx, { x: R.recX != null ? R.recX : x0, y: y0 + size + (R.cmp ? 6 : 10), w: R.recW || size, cmp: R.cmp });
  }

  /** The path the phase of ρ₀₁ has taken so far, from 0 to clock.t, unwrapped (for the trail on the phase disc). */
  const trailNow = () => {
    const pts = [], n = Math.max(2, Math.ceil(clock.t * 60));
    let prev = 0, unwrapped = 0, sweep = 0;
    if (clock.t <= 1e-6 || S.r < 1e-9) return { pts, sweep, end: 0 };   // c = 0 has no phase to follow
    for (let q = 0; q <= n; q++) {
      const t = clock.t * q / n, z = z01(t);
      if (Math.hypot(z[0], z[1]) < 1e-9) break;          // nothing left to point with (c = 0)
      let a = Math.atan2(z[1], z[0]); while (a - prev > Math.PI) a -= TAU; while (a - prev < -Math.PI) a += TAU;
      if (q) { sweep += Math.abs(a - prev); } unwrapped = a; prev = a; pts.push([t, a]);
    }
    return { pts, sweep, end: unwrapped };
  };
  /** The phase disc of ρ₀₁: the complex plane with the dashed grey circle of radius 1/2 (where ρ₀₁ starts), the three
      landing points of the Lean certificate 1/2, −1/2, −i/2, a magenta arrow from the centre to ρ₀₁ now, and the path it
      has taken (dashed ink). The arrow and the dots where each whole step landed are exact; the trail is drawn a little
      inside |ρ₀₁| and steps inward with every step taken, so a turn out and back along the same arc reads as two strands.
      With c = 0 the arrow shrinks to the centre. */
  function drawDisc(ctx, R) {
    const words = !TRV.thumbMode, tk = thick(), head = words ? 22 : 4;
    // a phone's figure: the labels need about 28 px beside the circle and 20 px under it, so the circle takes the rest
    const rad0 = R.cmp && words ? Math.max(16, Math.min(R.w / 2 - 28, (R.h - head - 22) / 2)) : Math.max(24, Math.min(R.w, R.h - head) / 2 - (words ? 26 : 6));
    const cx = R.x + R.w / 2, cy = R.cmp && words ? R.y + head + 2 + rad0 : R.y + head + (R.h - head) / 2;
    const sc = rad0 / 0.5, X = (z) => cx + sc * z[0], Y = (z) => cy - sc * z[1];
    disc = { cx, cy, rad: rad0 };
    ctx.save();
    ctx.strokeStyle = P.faint; ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(cx - rad0 - 12, cy); ctx.lineTo(cx + rad0 + 12, cy); ctx.moveTo(cx, cy - rad0 - 12); ctx.lineTo(cx, cy + rad0 + 12); ctx.stroke();
    ctx.strokeStyle = P.dim; ctx.lineWidth = 1.2 * tk; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(cx, cy, rad0, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
    if (words) {
      text(ctx, L('ρ₀₁ 的相位盘', 'phase disc of ρ₀₁'), cx, R.y + 8, P.dim, { align: 'center', size: 11, face: 'body' });
      for (const [z, s, dx, dy, al] of [[[0.5, 0], '1/2', 6, -10, 'left'], [[-0.5, 0], '−1/2', -6, -10, 'right'], [[0, -0.5], '−i/2', 8, 12, 'left']]) {
        ctx.fillStyle = P.dim; ctx.beginPath(); ctx.arc(X(z), Y(z), 2.2, 0, TAU); ctx.fill();
        text(ctx, s, X(z) + dx, Y(z) + dy, P.dim, { align: al, size: 11 });
      }
    }
    const tr = trailNow();
    if (tr.pts.length > 1) {
      const dr = rad0 * 0.07, rr = (t) => Math.max(2, sc * cabs(z01(t)) - dr * (t + 0.6));
      ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.8; ctx.lineWidth = 1.4 * tk; ctx.setLineDash([5, 4]); ctx.lineCap = 'round';
      ctx.beginPath(); tr.pts.forEach(([t, a], q) => { const x = cx + rr(t) * Math.cos(a), y = cy - rr(t) * Math.sin(a); if (q) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      const [tl, al] = tr.pts[tr.pts.length - 1], hx = cx + rr(tl) * Math.cos(al), hy = cy - rr(tl) * Math.sin(al), back = tr.pts[Math.max(0, tr.pts.length - 4)];
      const bx = cx + rr(back[0]) * Math.cos(back[1]), by = cy - rr(back[0]) * Math.sin(back[1]), ang = Math.atan2(hy - by, hx - bx);
      if (Math.hypot(hx - bx, hy - by) > 0.5) { ctx.fillStyle = P.ink; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - 7 * Math.cos(ang - 0.45), hy - 7 * Math.sin(ang - 0.45)); ctx.lineTo(hx - 7 * Math.cos(ang + 0.45), hy - 7 * Math.sin(ang + 0.45)); ctx.closePath(); ctx.fill(); }
    }
    ctx.fillStyle = P.magenta;
    for (let k = 0; k <= 4 && k <= clock.t + 1e-9; k++) { const z = z01(k); ctx.beginPath(); ctx.arc(X(z), Y(z), 3.4 * tk, 0, TAU); ctx.fill(); }
    const z = z01(clock.t), len = sc * cabs(z);
    ctx.strokeStyle = P.magenta; ctx.lineWidth = 2.6 * tk; ctx.lineCap = 'round'; ctx.shadowColor = P.magenta; ctx.shadowBlur = 8;
    if (len > 3) {
      const a = Math.atan2(z[1], z[0]), ex = cx + len * Math.cos(a), ey = cy - len * Math.sin(a);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.fillStyle = P.magenta; ctx.beginPath(); ctx.moveTo(ex + 3 * Math.cos(a), ey - 3 * Math.sin(a)); ctx.lineTo(ex - 9 * Math.cos(a - 0.42), ey + 9 * Math.sin(a - 0.42)); ctx.lineTo(ex - 9 * Math.cos(a + 0.42), ey + 9 * Math.sin(a + 0.42)); ctx.closePath(); ctx.fill();
    } else { ctx.fillStyle = P.magenta; ctx.beginPath(); ctx.arc(cx, cy, 4.5 * tk, 0, TAU); ctx.fill(); }
    ctx.shadowBlur = 0; ctx.restore();
  }

  function drawRecords(ctx, R) {
    const t = clock.t, c = overlap(), gap = 8, bw = (R.w - gap) / 2, bh = R.cmp ? 30 : 40, y1 = R.cmp ? 9 : 12, y2 = R.cmp ? 21 : 28;
    const active = clock.t > 0 && clock.t < 4 ? STEPS[Math.min(3, Math.floor(clock.t - 1e-9))].copy : null;
    for (let k = 0; k < 2; k++) {
      const x = R.x + k * (bw + gap), done = (step) => t >= step - 1e-9;
      const wrote = done(k + 1), rev = done(k + 3);
      const narrow = bw < 150;   // on a phone the factor does not fit in the box: name the step only
      const state = rev ? (narrow ? L('已逆转', 'reversed') : L(`已逆转 ×c̄ = ${fmtC([c[0], -c[1]], 2)}`, `reversed ×c̄ = ${fmtC([c[0], -c[1]], 2)}`))
        : wrote ? (narrow ? L('已写入', 'written') : L(`已写入 ×c = ${fmtC(c, 2)}`, `written ×c = ${fmtC(c, 2)}`)) : narrow ? L('未写入', 'not yet') : L('尚未写入', 'not written yet');
      const hot = active === k;
      ctx.strokeStyle = hot ? P.amber : P.lineHot; ctx.lineWidth = hot ? 2 : 1; if (hot) { ctx.shadowColor = P.amber; ctx.shadowBlur = 8; }
      ctx.strokeRect(x + 0.5, R.y + 0.5, bw - 1, bh - 1); ctx.shadowBlur = 0;
      text(ctx, L(`副本 ${k}`, `copy ${k}`), x + 8, R.y + y1, hot ? P.amber : P.ink, { size: R.cmp ? 11 : 11.5, face: 'body' });
      text(ctx, state, x + 8, R.y + y2, rev ? P.cyan : wrote ? P.magenta : P.dim, { size: R.cmp ? 10 : 10.5 });
    }
  }

  function drawScreen(ctx, R, m) {
    const sc = SCREEN[m.n], words = !TRV.thumbMode, tk = thick(), stack = words && R.cmp;   // a phone's figure: the two words over the plot
    const g = kit.plot($('flat'), { x: [-1, 1], y: [0, sc.ymax], pad: [R.x, R.W - R.x - R.w, R.y + (stack ? 27 : 0), R.H - R.y - R.h], clear: false });
    g.hline(0, P.lineHot, { width: 1 });
    const N = 360, us = Array.from({ length: N + 1 }, (_, k) => -1 + 2 * k / N), ys = us.map((u) => screen(m.rho, u, m.role));
    const ghostRho = m.ghost.map((row, i) => row.map((v, j) => (S.scene === 'record' ? [i === j ? 0.5 : 0.5, 0] : (S.scene === 'wake' ? anchored(S.lamDream, 'fine')[i][j] : [v, 0]))));
    const gy = us.map((u) => screen(ghostRho, u).all);
    // coherence fills: cyan between the diagonal and the in-block coherence (kept), magenta from there to the total
    const band = (a, b, col, al) => {
      ctx.beginPath(); us.forEach((u, k) => (k ? ctx.lineTo(g.X(u), g.Y(ys[k][a])) : ctx.moveTo(g.X(u), g.Y(ys[k][a]))));
      for (let k = N; k >= 0; k--) ctx.lineTo(g.X(us[k]), g.Y(ys[k][b]));
      ctx.closePath(); ctx.fillStyle = TRV.alpha(col, al); ctx.fill();
    };
    band('kept', 'diag', P.cyan, TRV.thumbMode ? 0.3 : 0.2);
    band('all', 'kept', P.magenta, TRV.thumbMode ? 0.4 : 0.28);
    g.line(us.map((u, k) => [u, gy[k]]), P.dim, { width: 1.2 * tk, dash: [3, 4], alpha: 0.8 });
    g.line(us.map((u, k) => [u, ys[k].diag]), P.cyan, { width: 2 * tk, dash: [6, 4], glow: 6 });
    g.line(us.map((u, k) => [u, ys[k].all]), P.ink, { width: 2.2 * tk, glow: 8 });
    if (stack) {
      const s = L('虚线灰：出发时', 'dashed grey: at the start');
      ctx.font = `10px ${face('body')}`; const fs = Math.max(8, Math.min(10, 10 * R.w / Math.max(1, ctx.measureText(s).width)));
      text(ctx, L('屏', 'screen'), R.x + 2, R.y + 6, P.dim, { size: 10.5, face: 'body' });
      text(ctx, s, R.x + 2, R.y + 19, P.dim, { size: fs, face: 'body' });
    } else if (words) {
      text(ctx, L('屏', 'screen'), R.x + 6, R.y + 10, P.dim, { size: 11, face: 'body' });
      g.text(1, sc.ymax, L('虚线灰：出发时', 'dashed grey: at the start'), P.dim, { align: 'right', base: 'top', size: 10.5, face: 'body', dy: 2 });
    }
  }

  /** Where everything goes, in stage pixels: the apparatus (r3) and the flat panels (the matrix, the phase disc in the
      record scene, the screen plot) in the rest. A wide stage puts the apparatus in a band across the top; a wide but
      short one (a cited figure) on the left; a narrow one (a phone) in a lower band across the top, lower still in the
      record scene, whose matrix needs room for the two record boxes (as does the band of a wide stage of middling
      height, which leaves the panels at least 150 px, 172 px in the record scene, so the grid stays ≥ 80 px). On a
      phone the panels first keep the height that holds a grid of GRID_MIN px (gridSide, the formula drawMatrix uses)
      and the band takes its share of the rest; a phone's laboratory too short for that and the least band asks for
      a taller stage (kit.plot's minHeight: the page scrolls), a cited figure keeps its frame. The panels keep their own
      arrangement inside what is left: side by side where that region is wide, stacked where it is not. */
  let panelInfo = null;
  /** A cited figure in a phone's frame (about 334 × 500): style.css tightens the same frames with the same query. */
  const compact = () => TRV.figure && !TRV.still && window.matchMedia('(max-width: 480px)').matches;
  function layout(Wd, Ht) {
    const sr = $('stage').getBoundingClientRect(), below = (el) => (el.getClientRects().length ? el.getBoundingClientRect().bottom - sr.top : 0);
    const rec = S.scene === 'record';
    /** The height a matrix box of the given kind spends on more than its grid (names, the record boxes under it). */
    const overGrid = (cmp) => 1000 - gridSide({ w: Infinity, h: 1000, cmp });
    if (compact()) {
      // a phone's cited figure: the apparatus in a band across the top, under it the grid beside the screen; in the
      // record scene the grid over its two record boxes, beside the phase disc (a box as tall as the grid at least)
      // over the screen. The panels keep the room for a grid of GRID_MIN px; the band takes its share of the rest
      const top = below($('hudSub')) + 6, bottom = $('legend').offsetHeight + 24, x0 = 10, w = Wd - 20, h = Math.max(120, Ht - top - bottom);
      const least = GRID_MIN + overGrid(rec), bh = Math.max(40, Math.round(Math.min(h * (rec ? CB.rec : CB.anchor), h - 8 - least)));
      const r3 = { x: x0, y: top, w, h: bh }, pr = { x: x0, y: top + bh + 8, w, h: h - bh - 8 };
      if (!rec) {
        const ms = Math.round(Math.min(pr.h + 26, pr.w * 0.47)), sx = pr.x + ms + 12;
        return { cmp: true, r3, pr, mat: { x: pr.x, y: pr.y, w: ms, h: pr.h }, dsc: null, scr: { x: sx, y: pr.y, w: pr.x + pr.w - sx, h: pr.h } };
      }
      const half = Math.round((pr.w - 10) / 2), rx = pr.x + half + 10, rw = pr.w - half - 10, dh = Math.min(pr.h - 50, Math.max(GRID_MIN, Math.round(pr.h * 0.56)));
      return { cmp: true, r3, pr, mat: { x: pr.x, y: pr.y, w: half, h: pr.h, recX: pr.x, recW: half, cmp: true }, dsc: { x: rx, y: pr.y, w: rw, h: dh }, scr: { x: rx, y: pr.y + dh + 4, w: rw, h: pr.h - dh - 4 } };
    }
    const top = TRV.thumbMode ? 24 : Math.max(46, below($('hudSub')), below($('sceneChips'))) + 10;
    const bottom = TRV.thumbMode ? 24 : Math.max(18, $('legend').offsetHeight + 20);
    const x0 = 16, w = Wd - 32, h = Math.max(80, Ht - top - bottom), fr = rec ? 0.64 : 0.58;   // stacked: the matrix row's share
    let r3, pr, need = null;
    if (w >= 560 && h < 300) {
      // short and wide (a cited figure in a page): the apparatus on the left takes nearly half the width; the grid beside
      // the screen on the right, in the record scene the grid over its record boxes beside the phase disc over the screen
      const lw = Math.round(w * 0.48); r3 = { x: x0, y: top, w: lw, h }; pr = { x: x0 + lw + 14, y: top, w: w - lw - 14, h };
      if (!rec) {
        const mat = { x: pr.x, y: pr.y, w: Math.min(pr.w * 0.46, pr.h + 30), h: pr.h }, sx = mat.x + mat.w + 18;
        return { r3, pr, mat, dsc: null, scr: { x: sx, y: pr.y + 18, w: pr.x + pr.w - sx, h: pr.h - 18 } };
      }
      const mw = Math.round(pr.w * 0.44), rx = pr.x + mw + 14, rw = pr.x + pr.w - rx, dh = Math.round(pr.h * 0.52);
      return { r3, pr, mat: { x: pr.x, y: pr.y, w: mw, h: pr.h, recX: pr.x + 14, recW: mw - 14 }, dsc: { x: rx, y: pr.y, w: rw, h: dh }, scr: { x: rx, y: pr.y + dh + 18, w: rw, h: pr.h - dh - 18 } };
    }
    else {
      let bh;
      if (w >= 560) bh = Math.max(110, Math.min(h * 0.55, h - (rec ? 172 : 150)));
      else {   // a phone: the stacked panels keep the room for a grid of GRID_MIN px (the matrix row is fr of them)
        const least = Math.ceil((GRID_MIN + overGrid(false)) / fr), band = 70;
        bh = Math.max(band, Math.min(h * (rec ? 0.24 : 0.32), h - 8 - least));
        need = { top, bottom, h: band + 8 + least };
      }
      bh = Math.round(bh); r3 = { x: x0, y: top, w, h: bh }; pr = { x: x0, y: top + bh + 8, w, h: h - bh - 8 };
    }
    const wide = pr.w >= 560 || (pr.w >= 400 && pr.w >= 1.45 * pr.h);
    let mat = wide ? { x: pr.x, y: pr.y, w: Math.min(pr.w * (rec ? 0.36 : 0.46), pr.h + 30), h: pr.h } : { x: pr.x, y: pr.y, w: pr.w, h: pr.h * fr };
    let dsc = null;
    if (rec && wide) {
      dsc = { x: mat.x + mat.w + 12, y: pr.y, w: Math.min(pr.w * 0.3, pr.h), h: pr.h * 0.85 };
      if (Math.min(mat.w, mat.h - 52) - 30 < 150) Object.assign(mat, { recX: mat.x + 14, recW: mat.w - 14 });   // a short grid: the record boxes take the matrix's whole width
    }
    else if (rec) { const half = (pr.w - 10) / 2; dsc = { x: pr.x + half + 10, y: pr.y, w: half, h: mat.h }; mat = { x: pr.x, y: pr.y, w: half, h: mat.h, recX: pr.x, recW: half }; }   // the record boxes under the matrix, the disc beside both
    const sx = dsc && wide ? dsc.x + dsc.w + 18 : mat.x + mat.w + 24;
    const scr = wide ? { x: sx, y: pr.y + 18, w: pr.x + pr.w - sx, h: pr.h - 18 } : { x: pr.x, y: pr.y + pr.h * fr + 12, w: pr.w, h: pr.h * (1 - fr) - 12 };
    return { r3, pr, mat, dsc, scr, need };
  }
  function drawStage() {
    const g0 = kit.plot($('flat'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, Wd = g0.W, Ht = g0.H, m = current(), words = !TRV.thumbMode;
    const lay = layout(Wd, Ht), { r3, pr } = lay, cmp = !!lay.cmp;
    // a phone's laboratory asks for the stage height its panels need (kit.plot publishes it; ignored in figures and stills)
    if (lay.need) kit.plot($('flat'), { x: [0, 1], y: [0, 1], pad: [0, 0, lay.need.top, lay.need.bottom], minHeight: lay.need.h, clear: false });
    // the apparatus, fitted to its box in the default view, with room under it for the names of the places and, where
    // its sides leave no room for the words saying what it stands for, a line above it; on a phone (a low band) the
    // names sit beside the beads and the words stay in the drawer and the MODEL box
    // (the names of two slits at ±0.5 sit above the plate's lowest corner, so they need a narrower strip than four)
    const low = r3.h < 110 || cmp, names = words && !low ? (m.n === 2 ? 10 : 22) : 0;
    const room = words && !low ? captionRoom(ctx) : [0, 0];
    let box3 = { x: r3.x, y: r3.y, w: r3.w, h: r3.h - names }, fit = fitSolid(box3), strip = false;
    if (words && !low && (fit.l - r3.x < room[0] || r3.x + r3.w - fit.r < room[1])) { strip = true; box3 = { x: r3.x, y: r3.y + 16, w: r3.w, h: r3.h - 16 - names }; fit = fitSolid(box3); }
    // the view the camera is turned to: no larger than the default, kept inside the apparatus's own box (between the
    // words beside it, where they are there), so a turned apparatus never runs under the title, the legend or a panel
    st.cam.pitch = clamp(st.cam.pitch, -0.2, 1.25); st.cam.zoom = clamp(st.cam.zoom, 0.8, 1.3);
    const side = words && !low && !strip, keep = { x: side ? fit.l : box3.x, y: box3.y, w: side ? fit.r - fit.l : box3.w, h: box3.h };
    applyFit(fitSolid(keep, st.cam.yaw, st.cam.pitch, fit.unit * st.cam.zoom), Wd, Ht);
    nameAt = low ? { dx: -12, dy: 0 } : { dx: 0, dy: 15 };
    st.begin(); drawSolid(m, words); st.end();
    // the flat panels, on a ground of the stage's own colour, so that a turned apparatus never runs under them
    ctx.fillStyle = P.stage; ctx.fillRect(pr.x - 8, pr.y - 4, pr.w + 16, pr.h + 8);
    if (words && !low) solidCaption(ctx, r3, fit, strip);
    disc = null;
    drawMatrix(ctx, lay.mat, m);
    if (lay.dsc) drawDisc(ctx, Object.assign({ cmp }, lay.dsc));
    drawScreen(ctx, { x: lay.scr.x, y: lay.scr.y, w: lay.scr.w, h: lay.scr.h, W: Wd, H: Ht, cmp }, m);
    panelInfo = { r3, fit: { l: fit.l, r: fit.r, t: fit.t, b: fit.b }, region: pr, mat: lay.mat, disc: lay.dsc, screen: lay.scr, grid: grid && { x0: grid.x0, y0: grid.y0, size: grid.size } };
  }

  /* ---------- the strip: what changes and what does not along the rail ---------- */
  function drawPlot() {
    if (TRV.still || TRV.figure) return;
    if (S.scene === 'record') {   // the phase disc on the stage shows where ρ₀₁ points; the strip shows its size
      const g = kit.plot($('plotA'), { x: [0, 4], y: [0, 0.56], pad: [30, 12, 10, 20] });
      g.axes({ yTicks: [[0, '0'], [0.25, '1/4'], [0.5, '1/2']], xTicks: [0, 1, 2, 3, 4].map((k) => [k, String(k)]) });
      const mod = []; for (let k = 0; k <= 200; k++) { const z = z01(4 * k / 200); mod.push([4 * k / 200, cabs(z)]); }
      g.line(mod, P.magenta, { width: 2.2 });
      const z = z01(clock.t); g.vline(clock.t, P.amber, { alpha: 0.8 }); g.dot(clock.t, cabs(z), P.amber, 4.5);
      $('pATitle').innerHTML = L('沿记录的步数：非对角元的模长', 'Along the record steps: the size of the off-diagonal entry');
      $('pAMeta').innerHTML = `<span style="color: var(--magenta)">|ρ₀₁|</span> · ${L(`第 ${fix(clock.t, 2)} 步`, `step ${fix(clock.t, 2)}`)} · |ρ₀₁| = ${fix(cabs(z), 3)}`;
      return;
    }
    const g = kit.plot($('plotA'), { x: [0, 1], y: [0, 1.08], pad: [30, 12, 10, 20] });
    g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0'], [0.5, '0.5'], [1, L('λ = 1', 'λ = 1')]] });
    const lamCur = lamNow();
    if (S.scene === 'anchor') {
      const c0 = crossNorm(anchored(0, S.fam), S.fam), sMax = H(jacobi(anchored(1, S.fam).map((r) => r.map((v) => v[0]))).vals);
      const cs = [], es = [];
      for (let k = 0; k <= 50; k++) { const l = k / 50; cs.push([l, crossNorm(anchored(l, S.fam), S.fam) / c0]); es.push([l, H(jacobi(anchored(l, S.fam).map((r) => r.map((v) => v[0]))).vals) / sMax]); }
      g.line(cs, P.magenta, { width: 2 }); g.line(es, P.ink, { width: 2, dash: [5, 3] });
      g.vline(lamCur, P.amber, { alpha: 0.8 }); g.dot(lamCur, 1 - lamCur, P.amber, 4.5);
      $('pATitle').innerHTML = L('沿锚点强度：相干直线减少', 'Along the anchor strength: the coherence falls in a straight line');
      $('pAMeta').innerHTML = `<span style="color: var(--magenta)">${L('跨块相干（相对出发时）', 'cross-block coherence (vs the start)')}</span> · ${L('虚线：熵（相对 λ = 1）', 'dashed: entropy (vs λ = 1)')} · λ = ${fix(lamCur, 2)}`;
    } else {
      const keep = [], forget = [], coh = [], a = amps(), c0 = crossNorm(anchored(0, 'fine'), 'fine');
      for (let k = 0; k <= 50; k++) { const l = k / 50, d = anchored(l, 'fine'); keep.push([l, d[0][0][0]]); forget.push([l, 1 - d[0][0][0]]); coh.push([l, crossNorm(d, 'fine') / c0]); }
      g.line(coh, P.dim, { width: 1.4, dash: [4, 3] }); g.line(forget, P.magenta, { width: 2.2 }); g.line(keep, P.cyan, { width: 2.2 });
      g.vline(S.lamDream, P.amber, { alpha: 0.8 }); g.dot(S.lamDream, 1 - a[0] * a[0], P.amber, 4.5);
      $('pATitle').innerHTML = L('换一个梦中的锚点强度：遗忘的权重不动', 'Another anchor strength in the dream: the forgotten weight stays');
      $('pAMeta').innerHTML = `<span style="color: var(--magenta)">${L('遗忘的权重', 'forgotten weight')}</span> · <span style="color: var(--cyan)">${L('留下的权重', 'weight kept')}</span> · ${L('虚线：梦里的相干', 'dashed: coherence in the dream')} · λ = ${fix(S.lamDream, 2)}`;
    }
  }

  /* ---------- readouts ---------- */
  const SCENE_NAME = { anchor: ['锚点', 'Anchors'], record: ['记录', 'Records'], wake: ['醒来', 'Waking'] };
  const STEP_TEXT = [['出发：等幅叠加，ρ₀₁ = 1/2', 'Start: the equal superposition, ρ₀₁ = 1/2'], ['写入副本 0', 'Writing copy 0'], ['写入副本 1', 'Writing copy 1'], ['逆转副本 0', 'Reversing copy 0'], ['逆转副本 1', 'Reversing copy 1']];
  const LEG = {
    anchor: [['cy box', '对角、块里的格与它们的条纹：留下的', 'kept: diagonal, in-block cells, their fringes'], ['mg box', '跨块的格与它添的条纹：被剪的', 'cut: cross-block cells, their fringes'], ['dm', '灰框：锚点的块', 'grey frames: anchor blocks']],
    record: [['cy box', '对角', 'diagonal'], ['mg box', '相干 ρ₀₁ 与条纹', 'ρ₀₁ coherence and fringes'], ['am', '此步作用的记录', 'record at this step']],
    wake: [['am', '读出 P₀：躯体那一格', 'readout P₀: the body cell'], ['cy box', '留下的权重', 'weight kept'], ['mg box', '淡出的部分', 'what fades out']]
  };
  /** The stage title shares its row with the scene buttons: on a narrow stage, where the full title would run under
      them, drop the scene name and keep the key quantity; if even that does not fit, move the title block below the
      buttons. In a still the buttons are hidden and the full title stays where it is. */
  const overlaps = (a, b) => a.right > b.left - 6 && a.left < b.right && a.top < b.bottom && b.top < a.bottom;
  function setHud(full, short) {
    const big = $('hudBig'), chips = $('sceneChips'), tl = big.parentElement;
    big.textContent = full; tl.style.marginTop = '';
    if (TRV.thumbMode || TRV.shot || chips.offsetParent === null) return;
    const b = chips.getBoundingClientRect(), ink = () => { const r = document.createRange(); r.selectNodeContents(big); return r.getBoundingClientRect(); };
    if (!overlaps(ink(), b)) return;
    big.textContent = short;
    const a = ink();
    if (overlaps(a, b)) tl.style.marginTop = `${Math.ceil(b.bottom - a.top + 4)}px`;
  }
  const setRo = (k, zh, en, val) => { $(`roL${k}`).textContent = L(zh, en); $(`ro${k}`).textContent = val; };
  function drawText() {
    const m = current(), eig = eigen(m), tr = m.rho.reduce((s, row, i) => s + row[i][0], 0);
    $('pillScene').querySelector('strong').textContent = L(...SCENE_NAME[S.scene]);
    $('roAside').textContent = S.scene === 'record' ? 'ρ₀₁' : S.scene === 'wake' ? 'P₀' : 'λ';
    if (S.scene === 'anchor') {
      const lam = lamNow(), c0 = crossNorm(anchored(0, S.fam), S.fam), c = crossNorm(m.rho, S.fam), ent = H(eig);
      setHud(L(`锚点 · λ = ${fix(lam, 2)}`, `Anchors · λ = ${fix(lam, 2)}`), `λ = ${fix(lam, 2)}`);
      setText('hudSub', L(`${S.fam === 'fine' ? '锚点：逐个位置' : '锚点：躯体 | 其余三处'} · 跨块相干剩 ${fix(100 * (1 - lam), 0)}% · 对角不动 · 熵 S = ${fix(ent, 2)}`, `${S.fam === 'fine' ? 'anchors: every place' : 'anchors: body | the other three'} · ${fix(100 * (1 - lam), 0)}% of the cross-block coherence left · diagonal fixed · entropy S = ${fix(ent, 2)}`));
      $('roKeyL').textContent = L('跨块相干的模长', 'modulus of the cross-block coherence');
      $('roKey').textContent = fix(c, 3); $('roKeySub').textContent = L(` = (1 − λ) × 出发时的 ${fix(c0, 3)}`, ` = (1 − λ) × ${fix(c0, 3)} at the start`);
      setRo(1, '锚点强度 λ', 'anchor strength λ', fix(lam, 3));
      setRo(2, '熵 S(ρ)（自然对数）', 'entropy S(ρ) (nats)', fix(ent, 3));
      setRo(3, '对角：每个位置的权重', 'diagonal: the weight of each place', m.rho.map((row, i) => fix(row[i][0], 3)).join(' · '));
      setRo(4, '迹 · 最小本征值', 'trace · least eigenvalue', `${fix(tr, 3)} · ${fix(Math.min(...eig), 3)}`);
      setRo(5, 'λ = 1 时的熵 D(Ψ‖𝒫Ψ)', 'entropy at λ = 1: D(Ψ‖𝒫Ψ)', fix(relEntropy(S.fam), 3));
      $('roNote').textContent = lam > 0.999 ? L('跨块的格全空：这是捏合的不动点，再捏一次什么也不变。', 'Every cross-block cell is empty: a fixed point of the pinching; pinching again changes nothing.')
        : lam < 0.001 ? L('还是全局纯态：熵为 0，每一格都满到虚线框。', 'Still the global pure state: entropy 0, every cell fills its dashed frame.')
          : L(`跨块的格按 1 − λ = ${fix(1 - lam, 2)} 缩小，对角与块里的格不动。`, `Cross-block cells shrink by 1 − λ = ${fix(1 - lam, 2)}; the diagonal and in-block cells stay.`);
      $('pillNow').querySelector('strong').textContent = `λ ${fix(lam, 2)}`;
      $('pillKey').querySelector('strong').textContent = `S ${fix(ent, 3)}`;
    } else if (S.scene === 'record') {
      const z = m.rho[0][1], k = Math.min(4, Math.floor(clock.t + 1e-9)), c = overlap(), prod = cmul(z, [2, 0]);
      setHud(L(`记录 · ρ₀₁ = ${fmtC(z, 2)}`, `Records · ρ₀₁ = ${fmtC(z, 2)}`), `ρ₀₁ = ${fmtC(z, 2)}`);
      const stepNow = clock.t <= 1e-9 ? 0 : Math.min(4, Math.ceil(clock.t - 1e-9));
      setText('hudSub', `${L(...STEP_TEXT[stepNow])} · ${L(`每份记录的重叠 c = ${fmtC(c, 2)}`, `overlap of each record c = ${fmtC(c, 2)}`)}`);
      $('roKeyL').textContent = L('非对角元 ρ₀₁', 'off-diagonal entry ρ₀₁');
      $('roKey').textContent = fmtC(z, 3); $('roKeySub').textContent = L(' 出发时 1/2', ' 1/2 at the start');
      setRo(1, '已完成的步数', 'steps done', `${k} / 4`);
      setRo(2, '|ρ₀₁|', '|ρ₀₁|', fix(cabs(z), 3));
      setRo(3, '相干质量 |ρ₀₁|² + |ρ₁₀|²', 'coherence mass |ρ₀₁|² + |ρ₁₀|²', `${fix(2 * cabs(z) ** 2, 4)}`);
      setRo(4, '每份重叠 c · |c|²', 'overlap c · |c|²', `${fmtC(c, 2)} · ${fix(S.r * S.r, 2)}`);
      setRo(5, '已乘上的因子之积', 'product of the factors so far', fmtC(prod, 3));
      $('roNote').textContent = S.r < 0.999 && clock.t >= 4 - 1e-9 ? L(`|c| = ${fix(S.r, 2)}：两份都逆转后只剩 |c|⁴ = ${fix(S.r ** 4, 3)} 倍，没有复原。`, `|c| = ${fix(S.r, 2)}: with both reversed only |c|⁴ = ${fix(S.r ** 4, 3)} of it is left; not restored.`)
        : clock.t >= 4 - 1e-9 ? L('两份都逆转：ρ₀₁ 回到 1/2，条纹回到原处。', 'Both reversed: ρ₀₁ is back at 1/2 and the fringes are where they were.')
          : k === 3 ? L('只逆转了副本 0：副本 1 还在，ρ₀₁ 停在 c 的相位上。', 'Only copy 0 is reversed: copy 1 is still there, and ρ₀₁ keeps its phase.')
            : L('写入乘 c，逆转乘 c̄；c̄·c = |c|²。', 'Writing multiplies by c, reversing by c̄; c̄·c = |c|².');
      $('pillNow').querySelector('strong').textContent = L(`第 ${fix(clock.t, 1)} 步`, `step ${fix(clock.t, 1)}`);
      $('pillKey').querySelector('strong').textContent = fmtC(z, 2);
    } else {
      const s = clock.t, keep = m.rho[0][0][0], pf = 1 - keep, pAt = (l) => 1 - anchored(l, 'fine')[0][0][0];
      setHud(L(`醒来 · 遗忘 ${fix(pf, 2)}`, `Waking · forgotten ${fix(pf, 2)}`), L(`遗忘 ${fix(pf, 2)}`, `forgotten ${fix(pf, 2)}`));
      setText('hudSub', L(`读出 P₀ = |x₀⟩⟨x₀| · 进度 ${fix(100 * s, 0)}% · 梦中 λ = ${fix(S.lamDream, 2)}`, `readout P₀ = |x₀⟩⟨x₀| · ${fix(100 * s, 0)}% done · dream λ = ${fix(S.lamDream, 2)}`));
      $('roKeyL').textContent = L('遗忘的权重 1 − Tr(P₀ρ)', 'forgotten weight 1 − Tr(P₀ρ)');
      $('roKey').textContent = fix(pf, 3); $('roKeySub').textContent = L(' = 1 − |⟨x₀|Ψ⟩|²', ' = 1 − |⟨x₀|Ψ⟩|²');
      setRo(1, '读出进度', 'readout progress', `${fix(100 * s, 0)}%`);
      setRo(2, '留下的权重 Tr(P₀ρ)', 'weight kept Tr(P₀ρ)', fix(keep, 3));
      setRo(3, 'λ = 0 · 0.5 · 1 时的遗忘权重', 'forgotten weight at λ = 0 · 0.5 · 1', [0, 0.5, 1].map((l) => fix(pAt(l), 3)).join(' · '));
      setRo(4, '梦中的锚点强度 λ', 'anchor strength in the dream λ', fix(S.lamDream, 2));
      setRo(5, '矩阵里还剩的迹', 'trace left in the matrix', fix(tr, 3));
      $('roNote').textContent = s >= 1 - 1e-9 ? L('读完：只剩躯体那一格，其余的权重与全部相干都已淡出。', 'Read: only the body cell is left; the weight elsewhere and all the coherence have faded out.')
        : L('琥珀框是读出的那一格；其余的格按 1 − 进度 淡出。', 'The amber frame is the cell being read; the other cells fade by 1 − progress.');
      $('pillNow').querySelector('strong').textContent = `${fix(100 * s, 0)}%`;
      $('pillKey').querySelector('strong').textContent = fix(pf, 3);
    }
    const leg = LEG[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plotA')]);

  /* ---------- controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.4, step: 0.1,
    format: (t) => (S.scene === 'record' ? `${L('第 ', 'STEP ')}${fix(t, 2)}${L(' 步', '')} <small>/ 4</small>`
      : S.scene === 'wake' ? `${L('读出 ', 'READOUT ')}${fix(100 * t, 0)}%`
        : `λ ${fix(S.path[0] + (S.path[1] - S.path[0]) * t, 2)} <small>${S.path[1] < S.path[0] ? L('卸锚', 'unpinning') : L('加锚', 'anchoring')}</small>`),
    onChange: (t) => {
      if (stopAt != null && t >= stopAt - 1e-9 && clock.playing) { const at = stopAt; stopAt = null; clock.pause(); clock.set(at); return; }
      if (S.scene === 'anchor') fLam.set(+lamNow().toFixed(2));
      paint();
    }
  });
  const leave = () => { stopAt = null; cards.mark(null); };
  const fLam = kit.field($('lam'), { fmt: (v) => fix(v, 2), onInput: (v) => {
    leave();
    if (S.scene === 'wake') { S.lamDream = v; paint(); return; }
    clock.pause(); S.path = [0, 1]; clock.set(v);
  } });
  const fW = kit.field($('w'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.w = v; leave(); paint(); } });
  const fR = kit.field($('r'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.r = v; leave(); paint(); } });
  const fPhi = kit.field($('phi'), { fmt: (v) => `${v}°`, onInput: (v) => { S.phi = v; leave(); paint(); } });
  const famChips = kit.chips($('famChips'), 'fam', (v) => { S.fam = v; leave(); paint(); });
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); stopAt = null; clock.rate = SC[sc].rate; clock.step = SC[sc].step; clock.setMax(SC[sc].max, true); clock.set(t == null ? 0 : t);
    fLam.set(+(sc === 'wake' ? S.lamDream : lamNow()).toFixed(2));
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); if (v !== 'anchor') S.path = [0, 1]; setScene(v); });
  kit.keys({ 1: () => { leave(); setScene('anchor'); }, 2: () => { leave(); setScene('record'); }, 3: () => { leave(); setScene('wake'); } });
  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });

  // drag sideways on the matrix: the same as scrubbing the rail; anywhere else on the stage turns the apparatus
  let dragging = false;
  const onGrid = (ev) => { if (!grid) return false; const b = $('flat').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top; return x >= grid.x0 - 6 && x <= grid.x0 + grid.size + 6 && y >= grid.y0 - 6 && y <= grid.y0 + grid.size + 6; };
  const toT = (ev) => { const b = $('flat').getBoundingClientRect(); return clamp((ev.clientX - b.left - grid.x0) / grid.size, 0, 1) * clock.max; };
  SO.onPick = (ev) => { if (!onGrid(ev)) return false; dragging = true; leave(); clock.pause(); return true; };
  SO.onDrag = (ev) => { if (dragging) clock.set(toT(ev)); };
  SO.onDrop = () => { dragging = false; };
  $('stage').addEventListener('pointermove', (ev) => { if (!dragging) $('stage').style.cursor = onGrid(ev) ? 'ew-resize' : 'grab'; });
  /** Back to the default view (a card is seen as it is described). */
  const camHome = (ms) => { const c = st.cam; if (Math.abs(c.yaw - CAM.yaw) + Math.abs(c.pitch - CAM.pitch) + Math.abs(c.zoom - 1) > 1e-6) st.view([CAM.yaw, CAM.pitch, 1], ms); };

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    waking: { scene: 'anchor', fam: 'fine', w: 0.4, path: [0, 1], still: 1 },
    blocks: { scene: 'anchor', fam: 'body', w: 0.4, path: [0, 1], still: 1 },
    half_erase: { scene: 'record', r: 1, phi: 90, to: 3, still: 3 },
    zero_overlap_fail: { scene: 'record', r: 0, phi: 90, still: 4 },
    quantum_eraser: { scene: 'record', r: 1, phi: 90, still: 4 },
    unpin_body: { scene: 'anchor', fam: 'body', w: 0.4, path: [1, 0.1], still: 1 },
    wake_snap: { scene: 'wake', w: 0.4, lamDream: 0.1, still: 1 }
  };
  const NOTES = {
    waking: ['清醒：已知数据把四个位置逐个钉住。λ 从 0 推到 1，品红的跨块方块缩到一点不剩，青色的对角一格不动；屏上的条纹淡成青色虚线的平滑包络，熵从 0 涨到 1.33（读数行的 S）。', 'Awake: the known data pin each of the four places. As λ goes from 0 to 1 the magenta cross-block squares shrink to nothing while the cyan diagonal does not move; on the screen the fringes fade into the smooth envelope of the dashed cyan curve, and the entropy rises from 0 to 1.33 (S in the readout line).'],
    blocks: ['锚点只分两块：躯体 x₀ 与其余三处。λ = 1 时只剪掉躯体与其余之间的相干（品红），其余三处之间的相干留在块里（青色），屏上还剩它们的青色条纹。', 'The anchors make two blocks only: the body x₀ and the other three places. At λ = 1 only the coherence between the body and the rest is cut (magenta); the coherence among the other three stays inside its block (cyan), and the screen keeps their cyan fringes.'],
    half_erase: ['两份相位记录（c = −i）先后写入，ρ₀₁ 从 1/2 转到 −1/2；再只逆转副本 0：相位盘上品红的箭头停在 −i/2，条纹错开四分之一格，没有回到灰色虚线。盘上的白色虚线记下箭头走过的路：转出半圈，再转回四分之一圈。', 'Two phase records (c = −i) are written one after the other and ρ₀₁ turns from 1/2 to −1/2; then copy 0 alone is reversed: the magenta arrow on the phase disc stops at −i/2, and the fringes are shifted by a quarter period, not back on the dashed grey curve. The dashed white line on the disc records the arrow’s path: out half a turn, then a quarter of the way back.'],
    zero_overlap_fail: ['记录把两条路完全分开（c = 0）：写入第一份，品红的 ρ₀₁ 就缩没了，相位盘上的箭头缩成圆心的一点，屏上只剩青色虚线的包络；两份都逆转，ρ₀₁ 仍是 0，条纹没有回来。', 'Records that tell the two paths apart completely (c = 0): once the first copy is written the magenta ρ₀₁ is gone, the arrow on the phase disc shrinks to a dot at the centre, and only the envelope of the dashed cyan curve is left on the screen; reverse both copies and ρ₀₁ is still 0, the fringes do not return.'],
    quantum_eraser: ['两份相位记录都写入，再把两份都逆转：相位盘上品红的箭头沿半径 1/2 的灰色虚线圆转出半圈、再原路转回 1/2，条纹回到灰色虚线上。盘上的白色虚线是箭头走过的路：外圈转出半圈，内圈原路转回；品红圆点是每一步的落点 1/2、−i/2、−1/2。', 'Both phase records are written, then both are reversed: the magenta arrow on the phase disc turns half way round the dashed grey circle of radius 1/2 and back to 1/2, and the fringes land on the dashed grey curve again. The dashed white line on the disc is the arrow’s path: out half a turn on the outer strand, back on the inner one; the magenta dots are where the steps landed, 1/2, −i/2, −1/2.'],
    unpin_body: ['卸下躯体这一枚锚点：锚点分成躯体 x₀ 与其余三处两块，λ 从 1 降到 0.1。只有躯体连向其余三处的品红方块重新长出来，回到原来 |ρᵢⱼ| 的 0.9 倍，屏上品红的条纹回来；其余三处之间的青色方块始终在；青色的对角——每个位置的权重——始终没动。', 'Unloading the body’s anchor: the anchors make two blocks, the body x₀ and the other three places, and λ drops from 1 to 0.1. Only the magenta squares linking the body to the other three grow back, to 0.9 times their original |ρᵢⱼ|, and the magenta fringes return on the screen; the cyan squares among the other three were there all along; the cyan diagonal, the weight of each place, never moved.'],
    wake_snap: ['醒来：读出投影 P₀ 只留躯体 x₀ 那一格（琥珀框）。其余三处的权重与全部相干一起淡出，屏上只剩 x₀ 的一份包络；遗忘的权重 1 − Tr(P₀ρ) = 0.60。', 'Waking: the readout projection P₀ keeps only the body cell x₀ (amber frame). The weight of the other three places fades out with all the coherence and the screen keeps a single envelope for x₀; the forgotten weight is 1 − Tr(P₀ρ) = 0.60.']
  };
  let booting = true;
  function applyPreset(id) {
    const c = PRESETS[id];
    if (c.w != null) { S.w = c.w; fW.set(c.w); }
    if (c.fam) { S.fam = c.fam; famChips.set(c.fam, true); }
    if (c.path) S.path = c.path.slice();
    if (c.lamDream != null) S.lamDream = c.lamDream;
    if (c.r != null) { S.r = c.r; fR.set(c.r); }
    if (c.phi != null) { S.phi = c.phi; fPhi.set(c.phi); }
    setScene(c.scene, 0);
    camHome(TRV.still || booting ? 0 : 500);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(c.still); return; }
    stopAt = c.to == null ? null : c.to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  // A cited figure keeps its short note whole; detailed explanations remain in the full laboratory.
  const FIGURE_NOTES = {
    "waking": ["λ 从 0 到 1：跨块相干消失，对角权重不变，条纹淡出。", "As λ grows to 1, cross-block coherence and fringes vanish; diagonal weights stay."],
    "blocks": ["锚点只分躯体与其余两块：块内相干保留，跨块相干消失。", "Two anchor blocks keep coherence within each block and cut it between them."],
    "half_erase": ["两份相位记录只逆转一份：ρ₀₁ 停在 −i/2，条纹仍错开。", "Reverse just one of two phase records: ρ₀₁ stops at −i/2; fringes stay shifted."],
    "zero_overlap_fail": ["c = 0 的记录使 ρ₀₁ 归零，逆转两份也不能恢复条纹。", "For c = 0, ρ₀₁ vanishes; reversing both records does not restore fringes."],
    "quantum_eraser": ["两份相位记录全部逆转，ρ₀₁ 返回 1/2，条纹恢复。", "Reverse both phase records: ρ₀₁ returns to 1/2 and the fringes return."],
    "unpin_body": ["λ 降至 0.1：躯体连向其余的相干恢复至原来的九成。", "Lower λ to 0.1: body-to-rest coherence returns to 90% of its original size."],
    "wake_snap": ["投影 P₀ 只留躯体一格，遗忘权重为 0.60，其余相干消失。", "Projection P₀ keeps the body cell; forgotten weight is 0.60."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? FIGURE_NOTES : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，拖锚点强度、躯体的权重或记录的重叠，在方格上左右拖，或拖动时间轴。随时可以再选一张卡。', 'Free play: switch scenes, move the anchor strength, the body weight or the record overlap, drag sideways on the grid, or scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.DREAM_DEBUG = {
    get state() {
      const m = current(), eig = eigen(m);
      const base = { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, n: m.n,
        rho: m.rho.map((row) => row.map((v) => v.slice())), eig, trace: m.rho.reduce((s, row, i) => s + row[i][0], 0) };
      if (S.scene === 'anchor') return Object.assign(base, { fam: S.fam, w: S.w, lam: lamNow(), path: S.path.slice(), cross: crossNorm(m.rho, S.fam), cross0: crossNorm(anchored(0, S.fam), S.fam), entropy: H(eig), relEntropy: relEntropy(S.fam) });
      if (S.scene === 'record') { const tr = trailNow(); return Object.assign(base, { r: S.r, phi: S.phi, z: m.rho[0][1].slice(), c: overlap(), mass: 2 * cabs(m.rho[0][1]) ** 2, trail: { sweep: tr.sweep, end: tr.end, points: tr.pts.length }, grid: grid && { x0: grid.x0, size: grid.size }, disc: disc && { cx: disc.cx, cy: disc.cy, rad: disc.rad }, arrow: disc ? [m.rho[0][1][0] * disc.rad / 0.5, m.rho[0][1][1] * disc.rad / 0.5] : null }); }
      return Object.assign(base, { w: S.w, lamDream: S.lamDream, s: clock.t, kept: m.rho[0][0][0], forget: 1 - m.rho[0][0][0] });
    },
    /** The screen the stage draws, sampled at us: the total and the diagonal part. */
    screen(us) { const m = current(); return us.map((u) => screen(m.rho, u, m.role)); },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    /** Move the clock while it plays, keeping a card's stop (to test that the card stops itself). */
    jump: (t) => { if (clock.playing) clock.set(t); },
    /** Viewport point at fraction fx across the grid, mid height. */
    gridAt: (fx) => { const b = $('cv').getBoundingClientRect(); return [b.left + grid.x0 + fx * grid.size, b.top + grid.y0 + grid.size / 2]; },
    /** The apparatus of the last frame: slits, columns { i, x, h, color }, arches { i, j, r, shown, color }, constants. */
    get solid() { return solidInfo && JSON.parse(JSON.stringify(solidInfo)); },
    /** The screen of the apparatus at (u, v), in world coordinates, from the very function the last frame was built with. */
    solidScreenAt: (u, v) => (screenF ? screenF(u, v) : null),
    /** The boxes of the last frame in stage pixels: the apparatus (r3, and the part fit it covers in the default view),
        the region of the flat panels, the matrix, the phase disc, the screen plot and the grid itself. */
    get panels() { return panelInfo && JSON.parse(JSON.stringify(panelInfo)); },
    /** The default view of the apparatus [yaw, pitch]. */
    home: [CAM.yaw, CAM.pitch]
  };
  window.TRV_THUMB = () => { clock.pause(); S.fam = 'body'; S.w = 0.4; S.path = [0, 1]; setScene('anchor', 0.55); paint.now(); };
  setScene('anchor', 0);
  cards.pick(cards.initial('waking'));
  booting = false;
  paint();
})();
