/* ERASURE//LEDGER · 擦除账本 · The erasure ledger
   The stage is one qubit and a two-column ledger. Left: the Bloch disc (the x–z cross-section) with the state's
   arrow, its shadow on the record line Z (the diagonal) and its sideways part (the coherence). Right: the system's
   von Neumann entropy S and the heat βQ paid to the environment so far, with the Landauer floor drawn in.
   The ledger is a list of operations (turn, pinch, ideal reset, reset with one bath qubit, copy, undo copy) applied
   to a real 4 × 4 density matrix of system ⊗ record bit; at every whole step each entropy, relative entropy, mutual
   information and heat is computed from matrices. The rail replays the operations one step at a time; between two
   steps the arrow and the two columns are each interpolated between the ends (an illustrative glide, not an entropy
   recomputed for the state in between), and the page says so wherever those in-between numbers show.
   βQ = Q/(k_B T) is dimensionless and is set beside S in nats.
   Read-only probe for the browser suite: window.ERASE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, LN2 = Math.log(2);
  const MAX_OPS = 10;

  /* ---------- real symmetric matrices ---------- */
  const zeros = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
  const mul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((a, x, k) => a + x * B[k][j], 0)));
  const tr = (A) => A.reduce((a, row, i) => a + row[i], 0);
  const T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
  const kron = (A, B) => { const n = A.length, m = B.length, C = zeros(n * m); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < m; k++) for (let l = 0; l < m; l++) C[i * m + k][j * m + l] = A[i][j] * B[k][l]; return C; };
  /** Eigenvalues and eigenvectors (columns of V) of a real symmetric matrix, by cyclic Jacobi rotations. */
  function eigh(A0) {
    const n = A0.length, A = A0.map((r) => r.slice()), V = zeros(n);
    for (let i = 0; i < n; i++) V[i][i] = 1;
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] * A[p][q];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const a = A[k][p], b = A[k][q]; A[k][p] = c * a - s * b; A[k][q] = s * a + c * b; }
        for (let k = 0; k < n; k++) { const a = A[p][k], b = A[q][k]; A[p][k] = c * a - s * b; A[q][k] = s * a + c * b; }
        for (let k = 0; k < n; k++) { const a = V[k][p], b = V[k][q]; V[k][p] = c * a - s * b; V[k][q] = s * a + c * b; }
      }
    }
    return { vals: A.map((r, i) => r[i]), V };
  }
  const xlogx = (x) => (x > 1e-15 ? x * Math.log(x) : 0);
  /** von Neumann entropy −Tr ρ ln ρ (nats). */
  const entropy = (R) => -eigh(R).vals.reduce((a, l) => a + xlogx(l), 0);
  /** Umegaki relative entropy D(ρ ‖ σ) = Tr ρ (ln ρ − ln σ), with 0 · ln 0 = 0. */
  function relEnt(R, Sg) {
    const e = eigh(Sg);
    let cross = 0;
    for (let i = 0; i < R.length; i++) {
      const v = e.V.map((row) => row[i]), w = v.reduce((a, vi, k) => a + vi * R[k].reduce((b, x, l) => b + x * v[l], 0), 0);
      if (w > 1e-14) cross += w * Math.log(Math.max(e.vals[i], 1e-300));
    }
    return -entropy(R) - cross;
  }
  /** The qubit with Bloch arrow (x, z): ½(I + xσx + zσz). */
  const qubit = (x, z) => [[(1 + z) / 2, x / 2], [x / 2, (1 - z) / 2]];
  const blochOf = (R) => [2 * R[0][1], R[0][0] - R[1][1]];
  /** Reduced states of a 4 × 4 state of system ⊗ record (index 2s + e). */
  const sysOf = (J) => [[J[0][0] + J[1][1], J[0][2] + J[1][3]], [J[2][0] + J[3][1], J[2][2] + J[3][3]]];
  const recOf = (J) => [[J[0][0] + J[2][2], J[0][1] + J[2][3]], [J[1][0] + J[3][2], J[1][1] + J[3][3]]];
  const I2 = [[1, 0], [0, 1]], BLANK = [[1, 0], [0, 0]];
  const CNOT = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]];
  const SWAP = [[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]];
  const conj = (U, J) => mul(mul(U, J), T(U));
  const ry = (a) => [[Math.cos(a / 2), -Math.sin(a / 2)], [Math.sin(a / 2), Math.cos(a / 2)]];
  const dist = (A, B) => Math.sqrt(A.flat().reduce((a, x, i) => a + (x - B.flat()[i]) ** 2, 0));
  /** Is the record bit blank and unlinked (J = ρS ⊗ |0⟩⟨0|)? */
  const blank = (J) => dist(J, kron(sysOf(J), BLANK)) < 1e-9;
  const gibbs = (p) => [[p, 0], [0, 1 - p]];

  /* ---------- the ledger: a list of operations and the states after each ---------- */
  const S = { alpha: 90 * DEG, p: 0.9, ops: [] };
  let hist = [];
  const start = () => ({ J: kron(qubit(0, 1), BLANK), heat: 0, floor: 0, extra: 0, step: null, seg: { base: 0, kind: 'start', blocks: [] } });
  /** Fill in what every entry shows, each number from its own route. */
  function describe(h) {
    const rs = sysOf(h.J), re = recOf(h.J);
    h.sys = rs; h.bloch = blochOf(rs); h.S = entropy(rs); h.Sglob = entropy(h.J); h.linked = !blank(h.J); h.rec = blochOf(re);
    return h;
  }
  /** One operation applied to the entry h; returns the next entry, or null when the operation is not available. */
  function apply(h, op) {
    const rs = h.sys, n = { J: h.J, heat: h.heat, floor: h.floor, extra: h.extra, seg: h.seg, step: { op } };
    if (op === 'rot') {
      n.J = conj(kron(ry(S.alpha), I2), h.J); n.step.alpha = S.alpha;
    } else if (op === 'pinch') {
      n.J = h.J.map((row, i) => row.map((x, j) => ((i >> 1) === (j >> 1) ? x : 0)));
    } else if (op === 'copy' || op === 'uncopy') {
      if (op === 'copy' ? h.linked : !h.linked) return null;
      n.J = conj(CNOT, h.J);
    } else if (op === 'reset') {
      if (h.linked) return null;
      n.J = kron(qubit(0, 1), BLANK);
      const removed = h.S;  // ideal limit: I = D = 0, the heat is the floor
      Object.assign(n.step, { dSsys: -removed, I: 0, D: 0, Q: removed, floor: removed });
    } else if (op === 'swap') {
      if (h.linked) return null;
      const g = gibbs(S.p), joint = conj(SWAP, kron(rs, g)), sysAfter = [[joint[0][0] + joint[1][1], joint[0][2] + joint[1][3]], [joint[2][0] + joint[3][1], joint[2][2] + joint[3][3]]];
      const bathAfter = recOf(joint), betaE = Math.log(S.p / (1 - S.p));
      const dSsys = entropy(sysAfter) - entropy(rs), dSres = entropy(bathAfter) - entropy(g);
      const I = entropy(sysAfter) + entropy(bathAfter) - entropy(joint), D = relEnt(bathAfter, g);
      const Q = betaE * (bathAfter[1][1] - g[1][1]);
      n.J = kron(sysAfter, BLANK);
      Object.assign(n.step, { p: S.p, betaE, dSsys, dSres, I, D, Q, floor: -dSsys, bathBefore: blochOf(g), bathAfter: blochOf(bathAfter),
        reservoirBalance: Q - (dSres + D), unitaryBalance: I - (dSsys + dSres) });
    }
    describe(n);
    n.step.dS = n.S - h.S;
    if (op === 'pinch') n.step.D = relEnt(rs, n.sys);
    if (op === 'reset' || op === 'swap') { n.heat = h.heat + n.step.Q; n.floor = h.floor + n.step.floor; n.extra = h.extra + n.step.I + n.step.D; }
    // the entropy column: a base since the last operation that is not a turn or a pinch, and one block per pinch
    if (op === 'pinch') n.seg = { base: h.seg.base, kind: h.seg.kind, blocks: h.seg.blocks.concat([n.step.D]) };
    else if (op !== 'rot') n.seg = { base: n.S, kind: op, blocks: [] };
    return n;
  }
  function rebuild() {
    hist = [describe(start())];
    const ok = [];
    for (const op of S.ops) { const n = apply(hist[hist.length - 1], op); if (!n) break; hist.push(n); ok.push(op); }
    S.ops = ok;
  }

  /* ---------- what the rail shows at time t (between two steps, a glide) ---------- */
  const lerp = (a, b, e) => a + (b - a) * e;
  function at(t) {
    const n = S.ops.length, k = Math.max(0, Math.min(n, Math.floor(t + 1e-9))), f = k >= n ? 0 : Math.min(1, Math.max(0, t - k));
    const a = hist[k];
    if (f < 1e-9) return { k, f: 0, h: a, next: null, bloch: a.bloch, rec: a.rec, S: a.S, heat: a.heat, floor: a.floor, extra: a.extra };
    const b = hist[k + 1], e = TRV.smooth(f);
    let bloch;
    if (b.step.op === 'rot') { const c = Math.cos(b.step.alpha * e), s = Math.sin(b.step.alpha * e), [x, z] = a.bloch; bloch = [x * c + z * s, -x * s + z * c]; }
    else bloch = [lerp(a.bloch[0], b.bloch[0], e), lerp(a.bloch[1], b.bloch[1], e)];
    return { k, f, h: a, next: b, bloch, rec: [lerp(a.rec[0], b.rec[0], e), lerp(a.rec[1], b.rec[1], e)],
      S: lerp(a.S, b.S, e), heat: lerp(a.heat, b.heat, e), floor: lerp(a.floor, b.floor, e), extra: lerp(a.extra, b.extra, e), e };
  }
  const OPNAME = {
    rot: () => L(`转 U（${Math.round(S.alpha / DEG)}°）`, `turn U (${Math.round(S.alpha / DEG)}°)`), pinch: () => L('捏合 Π', 'pinch Π'),
    reset: () => L('理想复位', 'ideal reset'), swap: () => L('热浴比特复位', 'reset with a bath qubit'),
    copy: () => L('拷贝', 'copy'), uncopy: () => L('撤回拷贝', 'undo copy')
  };
  const opName = (op) => (OPNAME[op] ? OPNAME[op]() : '');

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), { canvas: $('cv'), rotate: false, onChange: () => paint() });
  const thick = TRV.thumbMode ? 1.9 : 1;
  /** `hudBottom` is how far down the canvas the HUD reaches (see hud()); the drawing starts 18 px below it, which keeps
      the |0⟩ and Z labels at the top of the disc clear of a HUD that wraps to two lines on a narrow stage. */
  function layout(W, H, hudBottom) {
    const top = TRV.thumbMode ? 0.06 * H : Math.max(TRV.figure || TRV.shot ? 64 : 66, hudBottom + 18), bottom = TRV.thumbMode ? 0.06 * H : (W < 560 ? 64 : 44);
    const h = H - top - bottom;
    if (H > W * 1.1) {   // a tall stage (phone): the disc above, the ledger below
      const R = Math.min(W * 0.33, h * 0.25), cx = W * 0.36, cy = top + 12 + R;
      const env = { r: R * 0.4, cx: Math.min(W - R * 0.4 - 18, cx + R * 1.75), cy: cy + R * 0.5 };
      const yTop = cy + R + 34, cw = Math.min(62, W * 0.18);
      return { top, bottom, h, R, cx, cy, env, led: { x1: W * 0.33, x2: W * 0.7, cw, yTop, yBot: H - bottom - 30 } };
    }
    const R =Math.max(30, Math.min(W * 0.2, h * 0.44));
    const cx = Math.max(R + 18, W * 0.25), cy = top + h / 2;
    const env = { r: R * 0.36, cx: cx + R + R * 0.36 + Math.max(10, W * 0.02), cy: cy + R * 0.55 };
    const lx0 = env.cx + env.r + Math.max(18, W * 0.05), lx1 = W - Math.max(16, W * 0.04);
    const cw = Math.min(70, (lx1 - lx0) * 0.3);
    return { top, bottom, h, R, cx, cy, env, led: { x1: lx0 + (lx1 - lx0) * 0.27, x2: lx0 + (lx1 - lx0) * 0.75, cw, yTop: top + 22, yBot: H - bottom - 30 } };
  }
  function arrow(c, x0, y0, x1, y1, color, w, head) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    c.strokeStyle = c.fillStyle = color; c.lineWidth = w; c.lineCap = 'round';
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
    if (len > 8) {
      const hh = Math.min(head, len * 0.5), ux = dx / len, uy = dy / len;
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x1 - ux * hh - uy * hh * 0.45, y1 - uy * hh + ux * hh * 0.45); c.lineTo(x1 - ux * hh + uy * hh * 0.45, y1 - uy * hh - ux * hh * 0.45); c.closePath(); c.fill();
    }
  }
  function hatch(c, x, y, w, h, color) {
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    c.strokeStyle = color; c.lineWidth = 1.2 * thick; c.globalAlpha = 0.9;
    for (let s = -h; s < w + h; s += 6 * thick) { c.beginPath(); c.moveTo(x + s, y + h); c.lineTo(x + s + h, y); c.stroke(); }
    c.restore();
  }
  /** The ledger's vertical range: fixed for the whole ledger so that nothing jumps while it plays. */
  function range() {
    let hi = LN2 * 1.3, lo = 0;
    for (const h of hist) { hi = Math.max(hi, h.heat * 1.12, h.S * 1.12); lo = Math.min(lo, h.heat * 1.12); }
    return [lo, hi];
  }
  /** The second HUD line; between two steps it carries the interpolation caveat. */
  const hudSubHtml = (a, between) => (between
    ? `${L('熵', 'S')} ≈ ${fix(a.S, 3)} · ${L('热', 'heat')} ≈ ${fix(a.heat, 3)} · ${L('两步之间：插值示意，不是图中态的熵', 'between steps: interpolated, not the drawn state\'s S')}`
    : `${L('熵', 'S')} ${fix(a.S, 3)} · ${L('已付的热', 'heat paid')} ${fix(a.heat, 3)} · ${L('下界', 'floor')} ${fix(a.floor, 3)}`);
  /** Write the HUD before the frame is laid out and return how far down the canvas it reaches, measured in this frame:
      the taller of its two forms (at a whole step, between steps) at the current width and language, so the drawing
      sits below it and does not jump when a glide starts or ends. */
  function hud(a) {
    const cur = a.f > 0 ? a.k + 1 : a.k, op = cur ? hist[cur].step.op : null, sub = $('hudSub');
    $('hudBig').textContent = cur ? L(`第 ${cur} 步 · ${opName(op)}`, `Step ${cur} · ${opName(op)}`) : L('起点 · |0⟩', 'Start · |0⟩');
    if (TRV.thumbMode) { sub.innerHTML = hudSubHtml(a, a.f > 0); return 0; }
    const y0 = $('cv').getBoundingClientRect().top;
    sub.innerHTML = hudSubHtml(a, !(a.f > 0)); const other = sub.getBoundingClientRect().bottom - y0;
    sub.innerHTML = hudSubHtml(a, a.f > 0); return Math.max(other, sub.getBoundingClientRect().bottom - y0);
  }
  function drawStage() {
    const st = stage, c = st.begin(), W = st.W, H = st.H, a = at(clock.t), Lo = layout(W, H, hud(a)), { R, cx, cy } = Lo;
    const X = (x) => cx + R * x, Y = (z) => cy - R * z, labels = !TRV.thumbMode;
    // the Bloch disc
    c.fillStyle = TRV.alpha(P.cyan, 0.05); c.beginPath(); c.arc(cx, cy, R, 0, 2 * Math.PI); c.fill();
    c.strokeStyle = P.lineHot; c.lineWidth = 1.3 * thick; c.stroke();
    c.setLineDash([3, 5]); c.strokeStyle = P.faint; c.lineWidth = 1; c.beginPath(); c.moveTo(X(-1), cy); c.lineTo(X(1), cy); c.stroke(); c.setLineDash([]);
    // the record line Z
    c.strokeStyle = P.cyan; c.globalAlpha = 0.6; c.lineWidth = 1.3 * thick; c.beginPath(); c.moveTo(cx, Y(1.14)); c.lineTo(cx, Y(-1.14)); c.stroke(); c.globalAlpha = 1;
    // where the arrow has been
    c.setLineDash([2, 4]); c.strokeStyle = P.dim; c.lineWidth = 1 * thick; c.beginPath();
    for (let i = 0; i <= a.k; i++) { const b = hist[i].bloch; if (i) c.lineTo(X(b[0]), Y(b[1])); else c.moveTo(X(b[0]), Y(b[1])); }
    c.lineTo(X(a.bloch[0]), Y(a.bloch[1])); c.stroke(); c.setLineDash([]);
    for (let i = 0; i <= a.k; i++) { const b = hist[i].bloch; c.fillStyle = P.dim; c.beginPath(); c.arc(X(b[0]), Y(b[1]), 2.4 * thick, 0, 2 * Math.PI); c.fill(); }
    // the two parts and the current arrow
    const [x, z] = a.bloch;
    if (Math.abs(x) > 2e-3 && Math.abs(z) > 2e-3) {
      c.setLineDash([3, 4]); c.strokeStyle = P.faint; c.lineWidth = 1;
      c.beginPath(); c.moveTo(X(0), Y(z)); c.lineTo(X(x), Y(z)); c.moveTo(X(x), Y(0)); c.lineTo(X(x), Y(z)); c.stroke(); c.setLineDash([]);
    }
    if (Math.abs(x) > 2e-3) arrow(c, cx, cy, X(x), cy, P.magenta, 3 * thick, 9 * thick);
    // right after a pinch the sideways part is gone: a dashed magenta outline keeps what was wiped in view
    const wiped = a.f === 0 && a.k > 0 && a.h.step && a.h.step.op === 'pinch' ? hist[a.k - 1].bloch[0] - x : 0;
    if (Math.abs(wiped) > 2e-3) {
      c.save(); c.globalAlpha = 0.8; c.setLineDash([5 * thick, 4 * thick]); c.strokeStyle = P.magenta; c.lineWidth = 2 * thick;
      c.beginPath(); c.moveTo(X(x), cy); c.lineTo(X(x + wiped), cy); c.stroke(); c.setLineDash([]);
      c.beginPath(); c.arc(X(x + wiped), cy, 4 * thick, 0, 2 * Math.PI); c.stroke(); c.restore();
    }
    if (Math.abs(z) > 2e-3) { c.save(); c.shadowColor = P.cyan; c.shadowBlur = 10; arrow(c, cx, cy, cx, Y(z), P.cyan, 5 * thick, 11 * thick); c.restore(); }
    c.save(); c.shadowColor = P.amber; c.shadowBlur = 12;
    if (Math.hypot(x, z) > 2e-3) arrow(c, cx, cy, X(x), Y(z), P.amber, 2.4 * thick, 12 * thick);
    c.fillStyle = P.amber; c.beginPath(); c.arc(X(x), Y(z), (Math.hypot(x, z) > 2e-3 ? 4.5 : 6) * thick, 0, 2 * Math.PI); c.fill(); c.restore();
    if (labels) {
      st.tag('k0', [cx + 16, Y(1.08)], '|0⟩', 'num', { screen: true });
      st.tag('k1', [cx + 16, Y(-1.08)], '|1⟩', 'num', { screen: true });
      st.tag('z', [cx - 14, Y(1.1)], 'Z', 'cy', { screen: true });
      if (Math.abs(x) > 0.22) st.tag('xv', [X(x / 2), cy + 14], `${L('横', 'side')} ${fix(Math.abs(x), 2)}`, 'num c-mg', { screen: true });
      if (Math.abs(wiped) > 0.22) st.tag('xw', [X(x + wiped / 2), cy + 14], `${L('抹掉的横', 'wiped side')} ${fix(Math.abs(wiped), 2)}`, 'num c-mg', { screen: true });
    }
    // the second bit: the record E while it holds a copy, the bath qubit around a swap
    const showSwap = (a.next && a.next.step.op === 'swap') ? a.next.step : (a.f === 0 && a.h.step && a.h.step.op === 'swap' ? a.h.step : null);
    const recShown = a.h.linked || (a.next && (a.next.step.op === 'copy' || a.next.step.op === 'uncopy'));
    if (showSwap || recShown) {
      const E = Lo.env, ex = (u) => E.cx + E.r * u, ez = (u) => E.cy - E.r * u;
      c.fillStyle = TRV.alpha(P.sigma, 0.05); c.beginPath(); c.arc(E.cx, E.cy, E.r, 0, 2 * Math.PI); c.fill();
      c.strokeStyle = P.lineHot; c.lineWidth = 1.1 * thick; c.stroke();
      c.strokeStyle = P.faint; c.lineWidth = 1; c.beginPath(); c.moveTo(E.cx, ez(1.12)); c.lineTo(E.cx, ez(-1.12)); c.stroke();
      let v;
      if (showSwap) {
        const b0 = showSwap.bathBefore, b1 = showSwap.bathAfter, e = a.next ? TRV.smooth(a.f) : 1;
        v = [lerp(b0[0], b1[0], e), lerp(b0[1], b1[1], e)];
        // the bath's equilibrium, and how far the swap pushed it
        c.strokeStyle = P.ink; c.lineWidth = 1.4; c.beginPath(); c.arc(ex(b0[0]), ez(b0[1]), 4.5 * thick, 0, 2 * Math.PI); c.stroke();
        if (Math.hypot(v[0] - b0[0], v[1] - b0[1]) > 0.02) { c.setLineDash([2, 3]); c.strokeStyle = P.dim; c.beginPath(); c.moveTo(ex(b0[0]), ez(b0[1])); c.lineTo(ex(v[0]), ez(v[1])); c.stroke(); c.setLineDash([]); }
        if (labels) st.tag('env', [E.cx, E.cy - E.r - 12], L('热浴比特', 'bath qubit'), 'raw', { screen: true });
      } else {
        v = a.rec;
        if (labels) st.tag('env', [E.cx, E.cy - E.r - 12], L('记录比特 E', 'record bit E'), 'raw', { screen: true });
      }
      if (Math.hypot(v[0], v[1]) > 2e-3) arrow(c, E.cx, E.cy, ex(v[0]), ez(v[1]), P.ink, 2 * thick, 8 * thick);
      c.fillStyle = P.ink; c.beginPath(); c.arc(ex(v[0]), ez(v[1]), 3.2 * thick, 0, 2 * Math.PI); c.fill();
    }
    drawLedger(c, st, Lo, a, labels);
    st.end();
  }
  function drawLedger(c, st, Lo, a, labels) {
    const { x1, x2, cw, yTop, yBot } = Lo.led, [lo, hi] = range(), V = (v) => yBot - (v - lo) / (hi - lo) * (yBot - yTop), y0 = V(0);
    // the entropy of one bit cannot pass ln 2
    c.setLineDash([5, 4]); c.strokeStyle = P.faint; c.lineWidth = 1.1 * thick; c.beginPath(); c.moveTo(x1 - cw * 0.8, V(LN2)); c.lineTo(x1 + cw * 0.8, V(LN2)); c.stroke(); c.setLineDash([]);
    // the column of the system's entropy: a base, then one block per pinch
    const seg = (a.next ? a.next : a.h).seg, top = V(a.S);
    c.fillStyle = TRV.alpha(P.sigma, 0.22); c.fillRect(x1 - cw / 2, top, cw, y0 - top);
    if (seg.kind === 'copy' && a.S > 1e-3) hatch(c, x1 - cw / 2, top, cw, y0 - top, TRV.alpha(P.sigma, 0.55));
    let acc = seg.base;
    c.strokeStyle = P.sigma; c.lineWidth = 1 * thick;
    seg.blocks.forEach((d, i) => {
      const yA = V(acc), yB = V(Math.min(acc + d, a.S + 1e-12));
      if (acc > 1e-6 && a.S > acc + 1e-6) { c.beginPath(); c.moveTo(x1 - cw / 2, yA); c.lineTo(x1 + cw / 2, yA); c.stroke(); }
      if (labels && a.S >= acc + d - 1e-6 && d > 1e-6) {
        const name = `D${'₁₂₃₄₅₆₇₈₉'[i] || ''} ${fix(d, 2)}`, ym = (yA + yB) / 2;
        if (yA - yB > 17) st.tag(`d${i}`, [x1, ym], name, 'num', { screen: true });
        else {   // a block too thin to hold its name: the name goes outside, on the right, with a leader line
          c.save(); c.strokeStyle = P.sigma; c.lineWidth = 1 * thick; c.beginPath(); c.moveTo(x1 + cw / 2, ym); c.lineTo(x1 + cw / 2 + 16, ym); c.stroke(); c.restore();
          st.tag(`d${i}`, [x1 + cw / 2 + 50, ym], name, 'num', { screen: true });
        }
      }
      acc += d;
    });
    c.strokeStyle = P.sigma; c.lineWidth = 1.4 * thick; c.strokeRect(x1 - cw / 2, Math.min(top, y0), cw, Math.abs(y0 - top));
    // the column of heat paid: up to the Landauer floor plain, the extra I + D hatched
    const hq = V(a.heat), hf = V(Math.max(lo, Math.min(a.floor, a.heat)));
    c.fillStyle = TRV.alpha(P.dim, 0.35); c.fillRect(x2 - cw / 2, Math.min(hf, y0), cw, Math.abs(y0 - hf));
    if (a.heat - a.floor > 1e-6) hatch(c, x2 - cw / 2, hq, cw, hf - hq, P.dim);
    c.strokeStyle = P.dim; c.lineWidth = 1.4 * thick; c.strokeRect(x2 - cw / 2, Math.min(hq, y0), cw, Math.abs(y0 - hq));
    if (Math.abs(a.floor) > 1e-6 || a.heat > 1e-6) {
      const yf = V(a.floor);
      c.strokeStyle = P.ink; c.lineWidth = 2 * thick; c.beginPath(); c.moveTo(x2 - cw / 2 - 7, yf); c.lineTo(x2 + cw / 2 + 7, yf); c.stroke();
      if (labels) st.tag('fl', [x2, yf + 10], L('下界', 'floor'), 'num', { screen: true });
      if (labels && hf - hq > 34) st.tag('ex', [x2, (hq + hf) / 2 - 2], `${L('多付', 'extra')} ${fix(a.heat - a.floor, 3)}`, 'num', { screen: true });
    }
    // the baseline
    c.strokeStyle = P.lineHot; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x1 - cw * 0.9, y0); c.lineTo(x2 + cw * 0.9, y0); c.stroke();
    if (labels) {
      st.tag('ln2', [x1 - cw / 2 - 18, V(LN2)], 'ln 2', 'num', { screen: true, fade: false });
      const ys = Math.min(top, y0), yl = V(LN2);   // keep the value clear of the ln 2 line
      const ap = a.f > 0 ? '≈ ' : '';   // between two steps the columns are interpolated, not computed
      st.tag('vs', [x1, (ys - yl > -2 && ys - yl < 24 ? yl : ys) - 11], ap + fix(a.S, 3), 'num', { screen: true });
      st.tag('vq', [x2, Math.min(hq, y0) - 11], ap + fix(a.heat, 3), 'num', { screen: true });
      const narrow = x2 - x1 < 120;
      st.tag('ts', [x1, yBot + 16], narrow ? L('熵 S', 'S') : L('系统的熵', 'system S'), 'raw', { screen: true });
      st.tag('tq', [x2, yBot + 16], narrow ? L('热 βQ', 'βQ') : L('付给环境的热', 'heat paid βQ'), 'raw', { screen: true });
    }
  }

  /* ---------- strip: along the ledger ---------- */
  function drawPlot() {
    const n = S.ops.length, [lo, hi] = range(), g = kit.plot($('plot'), { x: [0, Math.max(1, n)], y: [lo, hi], pad: [34, 12, 8, 22] });
    const ticks = []; for (let k = 0; k <= Math.max(1, n); k++) ticks.push([k, String(k)]);
    g.axes({ yTicks: [[0, '0'], [LN2, 'ln 2']], xTicks: ticks });
    const pts = (f) => hist.map((h, k) => [k, f(h)]);
    g.area(pts((h) => h.heat), P.dim, { alpha: 0.25, base: 0 });
    g.line(pts((h) => h.heat), P.dim, { width: 1.6 });
    g.line(pts((h) => h.floor), P.ink, { width: 1.2, dash: [4, 3] });
    g.line(pts((h) => h.S), P.sigma, { width: 2 });
    g.vline(clock.t, P.amber, { alpha: 0.8 });
    g.legend([[P.sigma, L('系统的熵', 'system entropy')], [P.dim, L('已付的热', 'heat paid')], [P.ink, L('兰道尔下界', 'Landauer floor'), 'dash']], { right: false });
    const a = at(clock.t);
    $('plotMeta').textContent = a.f > 0 ? `S ≈ ${fix(a.S, 3)} · βQ ≈ ${fix(a.heat, 3)}` : `S ${fix(a.S, 3)} · βQ ${fix(a.heat, 3)}`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const a = at(clock.t), cur = a.f > 0 ? a.k + 1 : a.k, h = hist[cur], step = cur ? h.step : null;
    const ap = a.f > 0 ? '≈ ' : '';
    $('roKey').innerHTML = `${ap}${fix(a.heat, 3)} = ${fix(a.floor, 3)} + ${fix(a.extra, 3)}`;
    $('roKeySub').innerHTML = L('βQ = −ΔS + (I + D)，累计；βQ = Q/(k<sub>B</sub>T) 无量纲，与以奈特计的熵直接相比', 'βQ = −ΔS + (I + D), running totals; βQ = Q/(k<sub>B</sub>T) is dimensionless, set beside S in nats');
    $('roS').textContent = ap + fix(a.S, 3);
    $('roX').textContent = fix(Math.abs(a.bloch[0]), 3);
    $('roStep').innerHTML = !step ? '—'
      : step.op === 'pinch' ? `ΔS ${fix(step.dS, 3)} · D ${fix(step.D, 3)}`
        : step.op === 'swap' ? `−ΔS ${fix(step.floor, 3)} · I ${fix(step.I, 3)} · D ${fix(step.D, 3)}`
          : step.op === 'reset' ? `−ΔS ${fix(step.floor, 3)} · I 0 · D 0`
            : `ΔS ${fix(step.dS, 3)}`;
    $('roGlobal').textContent = fix(h.Sglob, 3);
    const notes = {
      start: ['起点是 |0⟩：箭头竖在青色的记录线上，没有横着的一份，熵为 0。', 'The start is |0⟩: the arrow stands on the cyan record line, has no sideways part, and its entropy is 0.'],
      rot: ['转动：箭头转了，长度没变，熵与热都不动。', 'A turn: the arrow turned, its length did not change, and neither entropy nor heat moved.'],
      pinch: ['捏合：横着的一份抹掉了，熵的增加恰好等于这一步的 D。', 'A pinch: the sideways part is wiped out, and the entropy rises by exactly this step\'s D.'],
      reset: ['理想复位：系统回到 |0⟩，熵减多少，热就付多少，一分不多。', 'Ideal reset: the system is back at |0⟩, and the heat paid equals the entropy removed, not a bit more.'],
      swap: ['热浴比特复位：系统与一个吉布斯态的热浴比特交换。', 'Reset with a bath qubit: the system is swapped with a bath qubit in its Gibbs state.'],
      copy: ['拷贝：系统这一侧只剩对角线。', 'Copy: only the diagonal is left on the system\'s side.'],
      uncopy: ['撤回拷贝：再作用一次受控非门。', 'Undo copy: one more controlled-NOT.']
    };
    const nt = notes[step ? step.op : 'start'];
    // what a step did depends on the ledger before it: say only what this ledger shows
    let more = ['', ''];
    if (step && step.op === 'copy') {
      const up = step.dS > 1e-9, pure = h.Sglob < 1e-6;
      more = [`局部的熵${up ? `涨了 ${fix(step.dS, 3)}` : '没变（拷贝前已经只有对角线）'}；整体（系统 + 记录）的熵与拷贝前相同，${pure ? '仍是纯态，熵为 0' : `仍是 ${fix(h.Sglob, 3)}，不是 0`}；没有付热。`,
        ` The local entropy ${up ? `rose by ${fix(step.dS, 3)}` : 'stayed the same (only the diagonal was there before the copy)'}; the entropy of the whole (system + record) is what it was before the copy, ${pure ? 'still pure, with entropy 0' : `still ${fix(h.Sglob, 3)}, not 0`}; no heat was paid.`];
    } else if (step && step.op === 'uncopy') {
      let c = cur - 1; while (c > 0 && hist[c].step.op !== 'copy') c--;
      const back = c > 0 && dist(h.J, hist[c - 1].J) < 1e-9;
      more = back ? ['联合态精确回到拷贝之前，记录比特回到空白。', ' The joint state is exactly what it was before the copy, and the record bit is blank again.']
        : !h.linked ? ['记录比特回到空白，但联合态不是拷贝之前的那个：拷贝之后系统又被改动过。', ' The record bit is blank again, but the joint state is not the one before the copy: the system was changed after the copy.']
          : ['记录比特没有回到空白：拷贝之后系统又被改动过，这一次受控非门没有抵消拷贝。紧接着拷贝作用它的伴随（再一次受控非门）一定能精确撤回；拷贝之后若有别的改动，要保证精确撤回，就得把那些改动也撤回。', ' The record bit is not blank: the system was changed after the copy, and this controlled-NOT did not cancel the copy. Applying the adjoint (one more controlled-NOT) right after the copy is guaranteed to undo it exactly; after other changes, a guaranteed exact reversal needs those changes undone as well.'];
    } else if (step && step.op === 'swap') {
      const dS = step.dSsys, extra = step.I + step.D;
      more = [`系统的熵${dS < -1e-9 ? `减了 ${fix(-dS, 3)}` : dS > 1e-9 ? `反而增了 ${fix(dS, 3)}` : '没变'}，下界 −ΔS = ${fix(-dS, 3)}；这一步 βQ = ${fix(step.Q, 3)}${step.Q < -1e-9 ? '，为负：热从热浴流进系统' : ''}，${extra > 1e-9 ? `比下界多出 I + D = ${fix(extra, 3)}，D 是热浴被推离平衡的相对熵` : '正好等于下界（I = D = 0）'}。`,
        ` The system's entropy ${dS < -1e-9 ? `fell by ${fix(-dS, 3)}` : dS > 1e-9 ? `rose by ${fix(dS, 3)}` : 'did not change'}, so the floor −ΔS is ${fix(-dS, 3)}; this step's βQ is ${fix(step.Q, 3)}${step.Q < -1e-9 ? ', negative: heat flowed from the bath into the system' : ''}, ${extra > 1e-9 ? `above the floor by I + D = ${fix(extra, 3)}, where D is the relative entropy by which the bath was pushed off equilibrium` : 'exactly at the floor (I = D = 0)'}.`];
    }
    const glide = a.f > 0 ? ['（两步之间：箭头与两栏的数各自在两端之间插值，只是示意，不是图中这个态的熵；整数步上的数才是实算的。）', ' (Between steps the arrow and both columns are each interpolated between the ends, an illustration only, not the entropy of the state drawn; the numbers at whole steps are the computed ones.)'] : ['', ''];
    $('roNote').textContent = L(nt[0] + more[0] + glide[0], nt[1] + more[1] + glide[1]);
    $('pillS').querySelector('strong').textContent = ap + fix(a.S, 3);
    $('pillQ').querySelector('strong').textContent = ap + fix(a.heat, 3);
    $('pillStep').querySelector('strong').textContent = String(cur);
    $('rew').disabled = $('play').disabled = $('now').disabled = S.ops.length === 0;
    // which operations the current entry allows
    const here = hist[Math.floor(clock.t + 1e-9)] || hist[hist.length - 1], full = Math.floor(clock.t + 1e-9) >= MAX_OPS;
    document.querySelectorAll('#ops [data-op]').forEach((b) => {
      const op = b.dataset.op;
      b.disabled = full || ((op === 'reset' || op === 'swap' || op === 'copy') && here.linked) || (op === 'uncopy' && !here.linked);
    });
    $('opNote').textContent = here.linked ? L('系统与记录比特还连着：记录比特回到空白之后才能复位（紧接着拷贝撤回一次即可）。', 'The system and the record bit are still linked: a reset needs the record bit blank again (undoing right after the copy does it).')
      : L('从时间轴当前的位置往后记一步；时间轴在中途时，后面的步会被替换。', 'Each press writes one step after the rail\'s current position; with the rail part-way, the later steps are replaced.');
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.9, step: 1,
    format: (t) => L(`第 ${t.toFixed(2)} 步 <small>/ 共 ${S.ops.length} 步</small>`, `step ${t.toFixed(2)} <small>/ ${S.ops.length} in all</small>`),
    onChange: (t, c) => { if (!S.ops.length && t) c.set(0, true); paint(); }
  });
  let stepping = null;
  function restart() { if (stepping) { stepping.cancel(); stepping = null; } S.ops = []; rebuild(); clock.pause(); clock.setMax(1, true); clock.set(0); }
  /** Write one more step after the rail's current position and glide to it. */
  function addOp(op) {
    if (stepping) { const s = stepping; stepping = null; s.finish(); }
    clock.pause();
    const k = Math.floor(clock.t + 1e-9);
    if (k >= MAX_OPS) return;
    const n = apply(hist[k], op);
    if (!n) return;
    S.ops = S.ops.slice(0, k).concat([op]); rebuild(); clock.setMax(S.ops.length, true); clock.set(k, true);
    const run = kit.tween(700, (e) => clock.set(k + e), () => { if (stepping === run) stepping = null; });
    stepping = run; stepping.finish = () => { run.cancel(); clock.set(k + 1); };
  }
  $('ops').addEventListener('click', (ev) => { const b = ev.target.closest('[data-op]'); if (b && !b.disabled) { cards.mark(null); addOp(b.dataset.op); } });
  $('restart').addEventListener('click', () => { cards.mark(null); restart(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  /** A slider changes every turn (or every bath reset) in the ledger; the rail stays where it is. */
  const retune = () => { const t = clock.t; rebuild(); clock.setMax(Math.max(1, S.ops.length), true); clock.set(Math.min(t, S.ops.length)); };
  const fAlpha = kit.field($('alpha'), { fmt: (v) => `${Math.round(v)}°`, onInput: (v) => { cards.mark(null); S.alpha = v * DEG; retune(); } });
  const fPop = kit.field($('pop'), { fmt: (v) => fix(v, 3), onInput: (v) => { cards.mark(null); S.p = v; retune(); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    pinch: { alpha: 90, p: 0.9, ops: ['rot', 'pinch'], still: 2 },
    steps: { alpha: 50, p: 0.9, ops: ['rot', 'pinch', 'rot', 'pinch', 'rot', 'pinch'], still: 6 },
    cycle: { alpha: 90, p: 0.9, ops: ['rot', 'pinch', 'reset'], still: 3 },
    bath: { alpha: 90, p: 0.9, ops: ['rot', 'pinch', 'swap'], still: 3 },
    copy: { alpha: 90, p: 0.9, ops: ['rot', 'copy', 'uncopy'], still: 2 }
  };
  const NOTES = {
    pinch: ['先转 90°：琥珀色的箭头从 |0⟩ 转到横躺，熵那一栏不动。再捏合：品红的横着的一份被抹掉，只剩一道虚线标出它原来的长度，箭头缩成圆心，熵那一栏升到 ln 2 的虚线，付给环境的热仍是 0。', 'Turn by 90° first: the amber arrow swings from |0⟩ to lying flat, and the entropy column does not move. Then pinch: the magenta sideways part is wiped out, leaving only a dashed outline of its old length, the arrow shrinks to the centre, the entropy column rises to the dashed ln 2 line, and the heat paid is still 0.'],
    steps: ['每步转 50°、再捏合，连做三步：箭头一级一级落到青色的线上、越来越短；熵那一栏一块一块叠起来，每一块标着这一步的 D，叠起来正好是总熵。', 'Turn by 50°, then pinch, three times over: the arrow drops step by step onto the cyan line and gets shorter; the entropy column stacks up block by block, each block marked with that step\'s D, and together they make the total.'],
    cycle: ['阶段 A：转 90° 再捏合，熵那一栏升到 ln 2，热为 0。阶段 B：理想复位把箭头拉回 |0⟩，熵那一栏回到 0，付给环境的热升到 ln 2，正好碰到下界的横线。', 'Stage A: turn by 90° and pinch; the entropy column rises to ln 2 and the heat is 0. Stage B: the ideal reset pulls the arrow back to |0⟩, the entropy column drops to 0, and the heat paid rises to ln 2, just touching the floor line.'],
    bath: ['同样先把箭头捏成圆心，再与一个 p = 0.9 的热浴比特交换：箭头只回到 0.8 高，熵减 0.368；热付了 0.879，比下界高出斜线的一截 0.511，那是右边小圆里热浴比特被推离平衡的 D。', 'The arrow is pinched to the centre as before, then swapped with a bath qubit at p = 0.9: it climbs back only to height 0.8, an entropy decrease of 0.368; the heat paid is 0.879, above the floor by the hatched piece of 0.511, the D by which the bath qubit in the small disc was pushed off equilibrium.'],
    copy: ['转 90° 后拷贝进记录比特 E：系统这一侧的箭头缩成圆心，熵那一栏升到 ln 2（斜线：只是局部的熵），付给环境的热是 0。下一步撤回拷贝，箭头回到横躺，熵回到 0。', 'Turn by 90°, then copy into the record bit E: the system\'s arrow shrinks to the centre, the entropy column rises to ln 2 (hatched: only the local entropy), and the heat paid is 0. The next step undoes the copy: the arrow lies flat again and the entropy is back to 0.']
  };
  let booting = true, moving = null;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (moving) { moving.cancel(); moving = null; }
    if (stepping) { stepping.cancel(); stepping = null; }
    const land = () => {
      moving = null;
      S.alpha = p.alpha * DEG; S.p = p.p; fAlpha.set(p.alpha); fPop.set(p.p);
      S.ops = p.ops.slice(); rebuild(); clock.pause(); clock.setMax(S.ops.length, true); clock.set(0);
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still); else if (booting) kit.autoplay(clock, $('stage')); else clock.play();
    };
    if (booting || TRV.still) { land(); return; }
    // rewind the ledger to its start first, so the eye sees the new card begin from |0⟩
    const t0 = clock.t;
    moving = kit.tween(380, (e) => clock.set(t0 * (1 - e)), land);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：按“操作”给账本记一步，拖动转角与布居数。随时可以再选一张卡。', 'Free play: press an operation to write a step, move the turn and the population. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const pub = (h) => ({ bloch: h.bloch.slice(), rec: h.rec.slice(), S: h.S, Sglob: h.Sglob, linked: h.linked, heat: h.heat, floor: h.floor, extra: h.extra,
    J: h.J.map((r) => r.slice()), step: h.step ? Object.assign({}, h.step) : null, seg: { base: h.seg.base, kind: h.seg.kind, blocks: h.seg.blocks.slice() } });
  window.ERASE_DEBUG = {
    get state() {
      const a = at(clock.t);
      return { preset: cards.current, t: clock.t, n: S.ops.length, playing: clock.playing, alpha: S.alpha, p: S.p, ops: S.ops.slice(),
        hist: hist.map(pub), now: { bloch: a.bloch.slice(), S: a.S, heat: a.heat, floor: a.floor, extra: a.extra } };
    },
    seek: (t) => { clock.pause(); clock.set(t); }
  };
  window.TRV_THUMB = () => { applyPreset('bath'); cards.mark('bath'); clock.set(3); paint.now(); };
  cards.pick(cards.initial('cycle'));
  booting = false;
  paint();
})();
