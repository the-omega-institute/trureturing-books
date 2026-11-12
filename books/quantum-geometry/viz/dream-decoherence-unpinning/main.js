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
   Read-only probe for the browser suite: window.DREAM_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, TAU = Math.PI * 2;
  const S = { scene: 'anchor', fam: 'fine', w: 0.4, path: [0, 1], lamDream: 0.1, r: 1, phi: 90 };
  const SC = {
    anchor: { max: 1, rate: 0.4, step: 0.1 },
    record: { max: 4, rate: 1.1, step: 1 },
    wake: { max: 1, rate: 0.5, step: 0.25 }
  };

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
  let grid = null;
  const roleColor = (role) => (role === 'keep' ? P.cyan : role === 'read' ? P.cyan : P.magenta);

  function drawMatrix(ctx, R, m) {
    const n = m.n, words = !TRV.thumbMode, head = words ? 30 : 6, tk = thick();
    const size = Math.max(40, Math.min(R.w - head, R.h - head - (S.scene === 'record' && words ? 52 : 0)));
    const x0 = R.x + head + Math.max(0, (R.w - head - size) / 2), y0 = R.y + head, cs = size / n;
    grid = { x0, y0, cs, n, size };
    let gmax = 0; m.ghost.forEach((row) => row.forEach((v) => { gmax = Math.max(gmax, v); }));
    const side = (v) => cs * 0.88 * Math.sqrt(Math.max(0, v) / gmax);
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
        text(ctx, str, cx, y0 + (i + 1) * cs - 9, P.ink, { align: 'center', size: cs >= 110 ? 12.5 : 10.5 });
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
    if (S.scene === 'record' && words) drawRecords(ctx, { x: x0, y: y0 + size + 10, w: size });
  }

  function drawRecords(ctx, R) {
    const t = clock.t, c = overlap(), gap = 8, bw = (R.w - gap) / 2, bh = 40;
    const active = clock.t > 0 && clock.t < 4 ? STEPS[Math.min(3, Math.floor(clock.t - 1e-9))].copy : null;
    for (let k = 0; k < 2; k++) {
      const x = R.x + k * (bw + gap), done = (step) => t >= step - 1e-9;
      const wrote = done(k + 1), rev = done(k + 3);
      const state = rev ? L(`已逆转 ×c̄ = ${fmtC([c[0], -c[1]], 2)}`, `reversed ×c̄ = ${fmtC([c[0], -c[1]], 2)}`)
        : wrote ? L(`已写入 ×c = ${fmtC(c, 2)}`, `written ×c = ${fmtC(c, 2)}`) : L('尚未写入', 'not written yet');
      const hot = active === k;
      ctx.strokeStyle = hot ? P.amber : P.lineHot; ctx.lineWidth = hot ? 2 : 1; if (hot) { ctx.shadowColor = P.amber; ctx.shadowBlur = 8; }
      ctx.strokeRect(x + 0.5, R.y + 0.5, bw - 1, bh - 1); ctx.shadowBlur = 0;
      text(ctx, L(`副本 ${k}`, `copy ${k}`), x + 8, R.y + 12, hot ? P.amber : P.ink, { size: 11.5, face: 'body' });
      text(ctx, state, x + 8, R.y + 28, rev ? P.cyan : wrote ? P.magenta : P.dim, { size: 10.5 });
    }
  }

  function drawScreen(ctx, R, m) {
    const sc = SCREEN[m.n], words = !TRV.thumbMode, tk = thick();
    const g = kit.plot($('cv'), { x: [-1, 1], y: [0, sc.ymax], pad: [R.x, R.W - R.x - R.w, R.y, R.H - R.y - R.h], clear: false });
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
    if (words) {
      text(ctx, L('屏', 'screen'), R.x + 6, R.y + 10, P.dim, { size: 11, face: 'body' });
      g.text(1, sc.ymax, L('虚线灰：出发时', 'dashed grey: at the start'), P.dim, { align: 'right', base: 'top', size: 10.5, face: 'body', dy: 2 });
    }
  }

  function drawStage() {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    const top = TRV.thumbMode ? 24 : Math.max(46, below($('hudSub')), below($('sceneChips'))) + 10;
    const bottom = TRV.thumbMode ? 24 : Math.max(18, $('legend').offsetHeight + 20);
    const g0 = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, Wd = g0.W, Ht = g0.H;
    const x0 = 16, w = Wd - 32, h = Math.max(80, Ht - top - bottom), wide = w >= 560, m = current();
    const mat = wide ? { x: x0, y: top, w: Math.min(w * 0.46, h + 30), h } : { x: x0, y: top, w, h: h * 0.58 };
    const scr = wide ? { x: mat.x + mat.w + 24, y: top + 18, w: w - mat.w - 24, h: h - 18 } : { x: x0, y: top + h * 0.58 + 12, w, h: h * 0.42 - 12 };
    drawMatrix(ctx, mat, m);
    drawScreen(ctx, { x: scr.x, y: scr.y, w: scr.w, h: scr.h, W: Wd, H: Ht }, m);
  }

  /* ---------- the strip: what changes and what does not along the rail ---------- */
  function drawPlot() {
    if (TRV.still || TRV.figure) return;
    if (S.scene === 'record') {
      const g = kit.plot($('plotA'), { x: [-0.62, 0.62], y: [-0.62, 0.62], pad: [30, 12, 8, 18], equal: true });
      const circ = []; for (let k = 0; k <= 120; k++) circ.push([0.5 * Math.cos(k * TAU / 120), 0.5 * Math.sin(k * TAU / 120)]);
      g.line([[g.x0, 0], [g.x1, 0]], P.faint, { width: 1 }); g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1 });
      g.line(circ, P.dim, { width: 1, dash: [3, 3] });
      const path = []; for (let k = 0; k <= 200; k++) { const z = z01(4 * k / 200); path.push([z[0], z[1]]); }
      g.line(path, P.magenta, { width: 1.6, alpha: 0.55 });
      const marks = [];   // steps that land on the same point share one label (0 and 4, 1 and 3 for c = −i)
      for (let k = 0; k <= 4; k++) { const z = z01(k), hit = marks.find((mk) => Math.hypot(mk.z[0] - z[0], mk.z[1] - z[1]) < 0.02); if (hit) hit.ks.push(k); else marks.push({ z, ks: [k] }); }
      for (const mk of marks) { g.dot(mk.z[0], mk.z[1], P.magenta, 3.2); g.text(mk.z[0], mk.z[1], mk.ks.join(' · '), P.ink, { dx: 6, dy: -8, size: 10 }); }
      const z = z01(clock.t); g.dot(z[0], z[1], P.amber, 5, { glow: 10 });
      g.text(0.5, 0, '1/2', P.dim, { dx: 4, dy: 9, size: 10 }); g.text(0, -0.5, '−i/2', P.dim, { dx: 5, dy: 8, size: 10 });
      $('pATitle').innerHTML = L('非对角元在复平面上的路', 'The off-diagonal entry in the complex plane');
      $('pAMeta').textContent = L(`第 ${fix(clock.t, 2)} 步：${fmtC(z, 3)}`, `step ${fix(clock.t, 2)}: ${fmtC(z, 3)}`);
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
    anchor: [['cy box', '对角、块里的格与它们的条纹：留下的', 'diagonal and in-block cells and their fringes: what stays'], ['mg box', '跨块的格与它添的条纹：被剪的', 'cross-block cells and their fringes: what is cut'], ['dm', '灰框：锚点的块', 'grey frames: the anchor blocks']],
    record: [['cy box', '对角', 'diagonal'], ['mg box', '相干 ρ₀₁ 与它添的条纹', 'the coherence ρ₀₁ and its fringes'], ['am', '这一步作用的那份记录', 'the record acting at this step']],
    wake: [['am', '读出 P₀：躯体那一格', 'readout P₀: the body cell'], ['cy box', '留下的权重', 'weight kept'], ['mg box', '淡出的部分', 'what fades out']]
  };
  const setRo = (k, zh, en, val) => { $(`roL${k}`).textContent = L(zh, en); $(`ro${k}`).textContent = val; };
  function drawText() {
    const m = current(), eig = eigen(m), tr = m.rho.reduce((s, row, i) => s + row[i][0], 0);
    $('pillScene').querySelector('strong').textContent = L(...SCENE_NAME[S.scene]);
    $('roAside').textContent = S.scene === 'record' ? 'ρ₀₁' : S.scene === 'wake' ? 'P₀' : 'λ';
    if (S.scene === 'anchor') {
      const lam = lamNow(), c0 = crossNorm(anchored(0, S.fam), S.fam), c = crossNorm(m.rho, S.fam), ent = H(eig);
      $('hudBig').textContent = L(`锚点 · λ = ${fix(lam, 2)}`, `Anchors · λ = ${fix(lam, 2)}`);
      $('hudSub').textContent = L(`${S.fam === 'fine' ? '锚点：逐个位置' : '锚点：躯体 | 其余三处'} · 跨块相干剩 ${fix(100 * (1 - lam), 0)}% · 对角不动`, `${S.fam === 'fine' ? 'anchors: every place' : 'anchors: body | the other three'} · ${fix(100 * (1 - lam), 0)}% of the cross-block coherence left · diagonal fixed`);
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
      $('hudBig').textContent = L(`记录 · ρ₀₁ = ${fmtC(z, 2)}`, `Records · ρ₀₁ = ${fmtC(z, 2)}`);
      const stepNow = clock.t <= 1e-9 ? 0 : Math.min(4, Math.ceil(clock.t - 1e-9));
      $('hudSub').textContent = `${L(...STEP_TEXT[stepNow])} · ${L(`每份记录的重叠 c = ${fmtC(c, 2)}`, `overlap of each record c = ${fmtC(c, 2)}`)}`;
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
      $('hudBig').textContent = L(`醒来 · 遗忘 ${fix(pf, 2)}`, `Waking · forgotten ${fix(pf, 2)}`);
      $('hudSub').textContent = L(`读出 P₀ = |x₀⟩⟨x₀| · 进度 ${fix(100 * s, 0)}% · 梦中 λ = ${fix(S.lamDream, 2)}`, `readout P₀ = |x₀⟩⟨x₀| · ${fix(100 * s, 0)}% done · dream λ = ${fix(S.lamDream, 2)}`);
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

  // drag sideways on the matrix: the same as scrubbing the rail
  let dragging = false;
  const onGrid = (ev) => { if (!grid) return false; const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top; return x >= grid.x0 - 6 && x <= grid.x0 + grid.size + 6 && y >= grid.y0 - 6 && y <= grid.y0 + grid.size + 6; };
  const toT = (ev) => { const b = $('cv').getBoundingClientRect(); return clamp((ev.clientX - b.left - grid.x0) / grid.size, 0, 1) * clock.max; };
  $('cv').addEventListener('pointerdown', (ev) => { if (!onGrid(ev)) return; dragging = true; try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ } leave(); clock.pause(); clock.set(toT(ev)); });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) clock.set(toT(ev)); else $('cv').style.cursor = onGrid(ev) ? 'ew-resize' : 'default'; });
  for (const type of ['pointerup', 'pointercancel']) $('cv').addEventListener(type, () => { dragging = false; });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    waking: { scene: 'anchor', fam: 'fine', w: 0.4, path: [0, 1], still: 1 },
    blocks: { scene: 'anchor', fam: 'body', w: 0.4, path: [0, 1], still: 1 },
    half_erase: { scene: 'record', r: 1, phi: 90, to: 3, still: 3 },
    zero_overlap_fail: { scene: 'record', r: 0, phi: 90, still: 4 },
    quantum_eraser: { scene: 'record', r: 1, phi: 90, still: 4 },
    unpin_body: { scene: 'anchor', fam: 'fine', w: 0.4, path: [1, 0.1], still: 1 },
    wake_snap: { scene: 'wake', w: 0.4, lamDream: 0.1, still: 1 }
  };
  const NOTES = {
    waking: ['清醒：已知数据把四个位置逐个钉住。λ 从 0 推到 1，品红的跨块方块缩到一点不剩，青色的对角一格不动；屏上的条纹淡成青色虚线的平滑包络，熵从 0 涨到 1.33。', 'Awake: the known data pin each of the four places. As λ goes from 0 to 1 the magenta cross-block squares shrink to nothing while the cyan diagonal does not move; on the screen the fringes fade into the smooth envelope of the dashed cyan curve, and the entropy rises from 0 to 1.33.'],
    blocks: ['锚点只分两块：躯体 x₀ 与其余三处。λ = 1 时只剪掉躯体与其余之间的相干（品红），其余三处之间的相干留在块里（青色），屏上还剩它们的青色条纹。', 'The anchors make two blocks only: the body x₀ and the other three places. At λ = 1 only the coherence between the body and the rest is cut (magenta); the coherence among the other three stays inside its block (cyan), and the screen keeps their cyan fringes.'],
    half_erase: ['两份相位记录（c = −i）先后写入，ρ₀₁ 从 1/2 转到 −1/2；再只逆转副本 0：ρ₀₁ 停在 −i/2，指针朝下，条纹错开四分之一格，没有回到灰色虚线。', 'Two phase records (c = −i) are written one after the other and ρ₀₁ turns from 1/2 to −1/2; then copy 0 alone is reversed: ρ₀₁ stops at −i/2, the needle points down, and the fringes are shifted by a quarter period, not back on the dashed grey curve.'],
    zero_overlap_fail: ['记录把两条路完全分开（c = 0）：写入第一份，品红的 ρ₀₁ 就缩没了，屏上只剩青色虚线的包络；两份都逆转，ρ₀₁ 仍是 0，条纹没有回来。', 'Records that tell the two paths apart completely (c = 0): once the first copy is written the magenta ρ₀₁ is gone and only the envelope of the dashed cyan curve is left on the screen; reverse both copies and ρ₀₁ is still 0, the fringes do not return.'],
    quantum_eraser: ['两份相位记录都写入，再把两份都逆转：ρ₀₁ 沿半径 1/2 的圆转出半圈、再原路转回 1/2，条纹回到灰色虚线上。', 'Both phase records are written, then both are reversed: ρ₀₁ turns half way round the circle of radius 1/2 and back to 1/2, and the fringes land on the dashed grey curve again.'],
    unpin_body: ['卸下锚点：λ 从 1 降到 0.1。品红的跨块方块重新长出来，|ρᵢⱼ| 回到原来的 0.9 倍，条纹回来；青色的对角——每个位置的权重——始终没动。', 'Unpinning: λ drops from 1 to 0.1. The magenta cross-block squares grow back to 0.9 times their original |ρᵢⱼ| and the fringes return; the cyan diagonal, the weight of each place, never moved.'],
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
    if (TRV.still || (booting && !TRV.embed)) { clock.set(c.still); return; }
    stopAt = c.to == null ? null : c.to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，拖锚点强度、躯体的权重或记录的重叠，在方格上左右拖，或拖动时间轴。随时可以再选一张卡。', 'Free play: switch scenes, move the anchor strength, the body weight or the record overlap, drag sideways on the grid, or scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.DREAM_DEBUG = {
    get state() {
      const m = current(), eig = eigen(m);
      const base = { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, n: m.n,
        rho: m.rho.map((row) => row.map((v) => v.slice())), eig, trace: m.rho.reduce((s, row, i) => s + row[i][0], 0) };
      if (S.scene === 'anchor') return Object.assign(base, { fam: S.fam, w: S.w, lam: lamNow(), path: S.path.slice(), cross: crossNorm(m.rho, S.fam), cross0: crossNorm(anchored(0, S.fam), S.fam), entropy: H(eig), relEntropy: relEntropy(S.fam) });
      if (S.scene === 'record') return Object.assign(base, { r: S.r, phi: S.phi, z: m.rho[0][1].slice(), c: overlap(), mass: 2 * cabs(m.rho[0][1]) ** 2 });
      return Object.assign(base, { w: S.w, lamDream: S.lamDream, s: clock.t, kept: m.rho[0][0][0], forget: 1 - m.rho[0][0][0] });
    },
    /** The screen the stage draws, sampled at us: the total and the diagonal part. */
    screen(us) { const m = current(); return us.map((u) => screen(m.rho, u, m.role)); },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    /** Move the clock while it plays, keeping a card's stop (to test that the card stops itself). */
    jump: (t) => { if (clock.playing) clock.set(t); },
    /** Viewport point at fraction fx across the grid, mid height. */
    gridAt: (fx) => { const b = $('cv').getBoundingClientRect(); return [b.left + grid.x0 + fx * grid.size, b.top + grid.y0 + grid.size / 2]; }
  };
  window.TRV_THUMB = () => { clock.pause(); S.fam = 'body'; S.w = 0.4; S.path = [0, 1]; setScene('anchor', 0.55); paint.now(); };
  setScene('anchor', 0);
  cards.pick(cards.initial('waking'));
  booting = false;
  paint();
})();
