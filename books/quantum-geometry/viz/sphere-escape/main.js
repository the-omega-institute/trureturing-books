/* ORTHO//ESCAPE: four scenes of one fact — after finitely many steps something is still outside.
   diag   flip the diagonal of an N × N list: the string d differs from row k in place k
   poly   the regular n-gon inscribed in the unit circle, n = 6 · 2^k: the gap 1 − cos(π/n) under the arc
   cos    x_{k+1} = cos x_k: the residual |cos x_k − x_k| shrinks geometrically and stays positive
   prime  Q = p_1 ⋯ p_k + 1 leaves remainder 1 on every listed prime: its prime factors are off the list
   One rail (the step k) drives every scene; the two plots under the stage show what is left outside.
   Read-only probe for the browser suite: window.ESCAPE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const S = { scene: 'diag', N: 6, seed: 11, rows: [], x0: 0, zoom: 'follow', tpoint: 1 };
  const sci = (x) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); return Math.abs(e) < 3 ? x.toPrecision(3) : `${m.toFixed(2)}×10${String(e).replace('-', '−').split('').map((c) => ({ '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }[c])).join('')}`; };

  /* ---------- diag: the list and its flipped diagonal ---------- */
  function makeList(N, seed) { const rng = TRV.mulberry32(seed * 7919 + N * 104729); return Array.from({ length: N }, () => Array.from({ length: N }, () => (rng() < 0.5 ? 1 : 0))); }
  const dOf = (rows) => rows.map((r, i) => 1 - r[i]);
  const hamming = (a, b) => a.reduce((s, x, i) => s + (x !== b[i] ? 1 : 0), 0);
  const toInt = (bits) => bits.reduce((v, b) => v * 2 + b, 0);
  /** Put d on the list: one more row, and one more column of fresh bits so that the table stays square. */
  function absorbD() {
    if (S.N >= 10) return false;
    const rng = TRV.mulberry32(S.seed * 31 + S.N * 977), d = dOf(S.rows);
    S.rows.forEach((r) => r.push(rng() < 0.5 ? 1 : 0)); S.rows.push(d.concat([rng() < 0.5 ? 1 : 0])); S.N++;
    return true;
  }

  /* ---------- poly: inscribed n-gons; Taylor partial sums of the cosine ---------- */
  const sides = (k) => 6 * Math.pow(2, k);
  const gap = (n) => 2 * Math.sin(Math.PI / (2 * n)) ** 2;                 // 1 − cos(π/n), without cancellation
  const halfPerimeter = (n) => n * Math.sin(Math.PI / n);
  const piDeficit = (n) => { const x = Math.PI / n; return n * (x ** 3 / 6 - x ** 5 / 120 + x ** 7 / 5040 - x ** 9 / 362880); };  // π − n sin(π/n) as a series (no cancellation)
  function taylor(theta, m) {   // m terms of the cosine series → { actual remainder, the verified bound θ^{2m}/(2m)!·e^θ }
    let sum = 0, term = 1;
    for (let j = 0; j < m; j++) { sum += term; term *= -theta * theta / ((2 * j + 1) * (2 * j + 2)); }
    let b = 1; for (let i = 1; i <= 2 * m; i++) b *= theta / i;
    return { actual: Math.abs(Math.cos(theta) - sum), lagrange: b, bound: b * Math.exp(theta) };
  }

  /* ---------- cos: the orbit of x ↦ cos x ---------- */
  const KCOS = 40;
  let XSTAR = 0.7; for (let i = 0; i < 300; i++) XSTAR = Math.cos(XSTAR);
  const orbit = (x0) => { const xs = [x0]; for (let k = 0; k < KCOS; k++) xs.push(Math.cos(xs[k])); return xs; };

  /* ---------- prime: Euclid's Q for the first k primes ---------- */
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  function factor(q) { const f = []; for (let p = 2; p * p <= q; p += p === 2 ? 1 : 2) while (q % p === 0) { f.push(p); q /= p; } if (q > 1) f.push(q); return f; }
  const EUCLID = PRIMES.map((_, k) => k).concat([PRIMES.length]).map((k) => { const prod = PRIMES.slice(0, k).reduce((a, p) => a * p, 1), Q = prod + 1; return { k, prod, Q, factors: factor(Q), euler: PRIMES.slice(0, k).reduce((a, p) => a / (1 - 1 / (p * p)), 1) }; });
  const ZETA2 = Math.PI * Math.PI / 6;

  /* ---------- scenes ---------- */
  const SC = {
    diag: { max: () => S.N, rate: 1.5, start: () => S.N, name: ['对角线', 'DIAGONAL'] },
    poly: { max: () => 12, rate: 1.1, start: () => 4, name: ['割圆', 'POLYGON'] },
    cos: { max: () => KCOS, rate: 3, start: () => 12, name: ['余弦', 'COSINE'] },
    prime: { max: () => PRIMES.length, rate: 0.9, start: () => 4, name: ['素数', 'PRIMES'] }
  };
  const step = () => Math.floor(clock.t + 1e-9), frac = () => clock.t - step();
  let hit = null;   // layout of the matrix on the stage, for clicks

  function drawDiag(g) {
    const c = g.ctx, N = S.N, k = step(), f = frac(), d = dOf(S.rows), W = g.W, H = g.H;
    const s = Math.min(54, (W * 0.56) / (N + 2.4), (H - 130) / (N + 2.1)), gw = N * s, gh = (N + 1.5) * s;
    const gx = Math.max(54, W * 0.37 - gw / 2), gy = Math.max(66, (H - gh) / 2 + 14);
    hit = { gx, gy, s, N };
    const cell = (x, y, v, o) => {
      const px = gx + x * s, py = gy + y * s, col = o.color;
      c.globalAlpha = o.alpha == null ? 1 : o.alpha;
      if (v === 1) { c.fillStyle = TRV.alpha(col, o.fill == null ? 0.78 : o.fill); c.fillRect(px + 2, py + 2, s - 4, s - 4); }
      c.strokeStyle = TRV.alpha(col, v === 1 ? 0.9 : 0.35); c.lineWidth = 1; c.strokeRect(px + 2.5, py + 2.5, s - 5, s - 5);
      if (v != null && s >= 15) { c.fillStyle = v === 1 ? P.void : TRV.alpha(col, 0.75); c.font = `600 ${Math.round(s * 0.42)}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(v), px + s / 2, py + s / 2 + 1); }
      c.globalAlpha = 1;
    };
    const ring = (x, y, col, w, glow) => { c.save(); if (glow) { c.shadowColor = col; c.shadowBlur = glow; } c.strokeStyle = col; c.lineWidth = w; c.strokeRect(gx + x * s + 1, gy + y * s + 1, s - 2, s - 2); c.restore(); };
    for (let i = 0; i < N; i++) {
      c.font = `${Math.max(10, Math.round(s * 0.32))}px ${TRV.fonts.data}`; c.textBaseline = 'middle';
      c.fillStyle = i < k ? P.ink : P.dim; c.textAlign = 'right'; c.fillText(`f${i + 1}`, gx - 8, gy + i * s + s / 2);
      c.textAlign = 'center'; c.fillStyle = P.dim; c.fillText(String(i + 1), gx + i * s + s / 2, gy - 10);
      for (let j = 0; j < N; j++) cell(j, i, S.rows[i][j], { color: P.cyan, alpha: i < k || i === j ? 1 : 0.62 });
    }
    for (let i = 0; i < N; i++) ring(i, i, i < k ? P.amber : TRV.alpha(P.sigma, 0.5), i < k ? 2 : 1, i === k - 1 ? 12 : 0);
    // the flip in progress: from the diagonal cell down to its place in d
    const dy = N + 0.5;
    if (k < N && f > 0.02) {
      const x = gx + k * s + s / 2, y0 = gy + k * s + s, y1 = gy + dy * s;
      c.strokeStyle = P.amber; c.lineWidth = 1.5; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y0 + (y1 - y0) * f); c.stroke(); c.setLineDash([]);
      ring(k, k, P.amber, 2, 12);
    }
    c.fillStyle = P.magenta; c.textAlign = 'right'; c.font = `600 ${Math.max(10, Math.round(s * 0.34))}px ${TRV.fonts.data}`; c.fillText('d', gx - 8, gy + dy * s + s / 2);
    for (let j = 0; j < N; j++) { cell(j, dy, j < k ? d[j] : null, { color: P.magenta, fill: 0.85 }); if (j === k - 1) ring(j, dy, P.amber, 2, 10); }
    // witnesses: row i differs from d in place i
    c.font = `${Math.max(10, Math.round(s * 0.34))}px ${TRV.fonts.data}`; c.textAlign = 'left'; c.fillStyle = P.magenta;
    for (let i = 0; i < Math.min(k, N); i++) c.fillText('≠ d', gx + gw + 8, gy + i * s + s / 2);
    // the universe of all 2^N strings: the list, the candidates still compatible with what is known of d, and d
    const cb = Math.ceil(N / 2), rb = N - cb, cols = 1 << cb, rws = 1 << rb, ux0 = gx + gw + 70, uw = W - ux0 - 26, uh = H - 150;
    if (uw > 60) {
      const sp = Math.min(uw / cols, uh / rws, 30), ox = ux0 + (uw - sp * cols) / 2, oy = 84 + (uh - sp * rws) / 2, r = Math.max(1, Math.min(5, sp * 0.2));
      const pos = (v) => [ox + ((v >> rb) + 0.5) * sp, oy + ((v & (rws - 1)) + 0.5) * sp];
      const known = toInt(d.slice(0, k)), shift = N - k;
      for (let v = 0; v < (1 << N); v++) { const q = pos(v), cand = (v >> shift) === known; c.fillStyle = cand ? TRV.alpha(P.magenta, 0.55) : TRV.alpha(P.faint, 0.9); c.beginPath(); c.arc(q[0], q[1], cand ? r : r * 0.7, 0, kit.TAU); c.fill(); }
      S.rows.forEach((row, i) => { const q = pos(toInt(row)); c.beginPath(); c.arc(q[0], q[1], r + 2.2, 0, kit.TAU); if (i < k) { c.strokeStyle = P.cyan; c.lineWidth = 1.4; c.stroke(); } else { c.fillStyle = P.cyan; c.fill(); } });
      if (k >= N) { const q = pos(toInt(d)); c.save(); c.shadowColor = P.magenta; c.shadowBlur = 14; c.fillStyle = P.magenta; c.beginPath(); c.arc(q[0], q[1], r + 3, 0, kit.TAU); c.fill(); c.restore(); c.strokeStyle = P.amber; c.lineWidth = 1.5; c.beginPath(); c.arc(q[0], q[1], r + 7, 0, kit.TAU); c.stroke(); }
      c.fillStyle = P.dim; c.font = `11px ${TRV.fonts.body}`; c.textAlign = 'center'; c.textBaseline = 'bottom';
      if (!TRV.thumbMode) c.fillText(L(`全部 2^${N} = ${1 << N} 个串`, `all 2^${N} = ${1 << N} strings`), ox + sp * cols / 2, oy - 8);
    }
    $('hudBig').textContent = k >= N ? L(`d 与全部 ${N} 行都不同`, `D DIFFERS FROM ALL ${N} ROWS`) : L(`已读对角线 ${k} / ${N} 位`, `DIAGONAL READ: ${k} OF ${N} BITS`);
    $('hudSub').textContent = k >= N ? L(`d = ${d.join('')}：它是 ${1 << N} 个串之一，却不在清单的 ${N} 行里`, `d = ${d.join('')}: one of the ${1 << N} strings, yet not among the ${N} rows of the list`)
      : L(`下一步：读第 ${k + 1} 行第 ${k + 1} 位（${S.rows[k][k]}），翻成 ${d[k]}；与 d 的前 ${k} 位相容的串还剩 ${1 << (N - k)} 个`, `Next: read bit ${k + 1} of row ${k + 1} (${S.rows[k][k]}) and flip it to ${d[k]}; ${1 << (N - k)} strings still agree with the first ${k} bits of d`);
  }

  function drawPoly(g) {
    const c = g.ctx, W = g.W, H = g.H, k = step(), n = sides(k), R = Math.min(W * 0.26, (H - 130) / 2), cx = Math.max(R + 40, W * 0.34), cy = H / 2 + 14;
    c.strokeStyle = P.sigma; c.lineWidth = 1.4; c.beginPath(); c.arc(cx, cy, R, 0, kit.TAU); c.stroke();
    c.beginPath();
    if (n <= 768) for (let j = 0; j < n; j++) { const a = -Math.PI / 2 - Math.PI / n + kit.TAU * j / n, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); if (j) c.lineTo(x, y); else c.moveTo(x, y); } else c.arc(cx, cy, R * Math.cos(Math.PI / n), 0, kit.TAU);
    c.closePath(); c.fillStyle = TRV.alpha(P.cyan, 0.1); c.fill(); c.strokeStyle = P.cyan; c.lineWidth = 1.6; c.stroke();
    if (n <= 96) for (let j = 0; j < n; j++) { const a = -Math.PI / 2 - Math.PI / n + kit.TAU * j / n; c.fillStyle = P.cyan; c.beginPath(); c.arc(cx + R * Math.cos(a), cy + R * Math.sin(a), 2.2, 0, kit.TAU); c.fill(); }
    // magnifier over the top side: horizontal and vertical scales differ, so the gap always fills the lens
    const hw = Math.sin(Math.PI / n), sag = gap(n), lx = Math.min(W - 250, cx + R + 60), lw = Math.min(230, W - lx - 24), lh = Math.min(170, H - 190), ly = cy - lh / 2;
    if (lw > 90) {
      const X = (x) => lx + lw / 2 + (x / hw) * (lw * 0.42), Y = (y) => ly + lh * 0.82 - ((y - (1 - sag)) / sag) * (lh * 0.58);
      c.fillStyle = TRV.alpha(P.void, 0.6); c.fillRect(lx, ly, lw, lh); c.strokeStyle = P.amber; c.lineWidth = 1.2; c.strokeRect(lx + 0.5, ly + 0.5, lw - 1, lh - 1);
      const tx = cx, ty = cy - R; c.strokeStyle = TRV.alpha(P.amber, 0.6); c.setLineDash([3, 4]); c.beginPath(); c.moveTo(tx + 6, ty); c.lineTo(lx, ly); c.moveTo(tx + 6, ty + 3); c.lineTo(lx, ly + lh); c.stroke(); c.setLineDash([]);
      c.strokeStyle = P.amber; c.strokeRect(tx - 7, ty - 5, 14, 10);
      c.save(); c.beginPath(); c.rect(lx, ly, lw, lh); c.clip();
      c.beginPath(); c.moveTo(X(-hw), Y(1 - sag)); for (let i = 0; i <= 60; i++) { const x = -hw + 2 * hw * i / 60; c.lineTo(X(x), Y(1 - 2 * Math.sin(Math.asin(x) / 2) ** 2)); } c.closePath();
      c.fillStyle = TRV.alpha(P.magenta, 0.35); c.fill();
      c.strokeStyle = P.sigma; c.lineWidth = 1.6; c.beginPath(); for (let i = -10; i <= 70; i++) { const x = -hw + 2 * hw * i / 60, y = 1 - 2 * Math.sin(Math.asin(Math.max(-1, Math.min(1, x))) / 2) ** 2; if (i === -10) c.moveTo(X(x), Y(y)); else c.lineTo(X(x), Y(y)); } c.stroke();
      c.strokeStyle = P.cyan; c.lineWidth = 2; c.beginPath(); c.moveTo(X(-hw * 1.3), Y(1 - sag)); c.lineTo(X(hw * 1.3), Y(1 - sag)); c.stroke();
      c.restore();
      c.strokeStyle = P.magenta; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(0), Y(1) + 3); c.lineTo(X(0), Y(1 - sag) - 3); c.stroke();
      c.font = `11px ${TRV.fonts.data}`; c.textAlign = 'left'; c.fillStyle = P.amber; c.textBaseline = 'top'; c.fillText(`${L('纵向放大', 'vertical zoom')} ×${sci((lh * 0.58 / sag) / R)}`, lx + 8, ly + 7);
      c.fillStyle = P.magenta; c.fillText(`${L('缝', 'gap')} ${sci(sag)}`, lx + 8, ly + 22);
      c.fillStyle = P.dim; c.textBaseline = 'bottom'; c.textAlign = 'center'; c.fillText(L('一条边与它上方的圆弧', 'one side and the arc above it'), lx + lw / 2, ly + lh - 6);
    }
    c.fillStyle = P.ink; c.font = `600 ${Math.round(R * 0.2)}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(n), cx, cy - R * 0.06);
    c.fillStyle = P.dim; c.font = `12px ${TRV.fonts.body}`; c.fillText(L('条边', 'sides'), cx, cy + R * 0.14);
    $('hudBig').textContent = L(`内接正 ${n} 边形`, `INSCRIBED REGULAR ${n}-GON`);
    $('hudSub').textContent = L(`半周长 ${halfPerimeter(n).toFixed(10)} < π；每条边的中点离圆弧还有 ${sci(gap(n))}`, `Half-perimeter ${halfPerimeter(n).toFixed(10)} < π; the midpoint of each side is still ${sci(gap(n))} short of the arc`);
  }

  function cosView() {
    const xs = orbit(S.x0);
    if (S.zoom === 'whole') { const lo = Math.min(...xs, 0) - 0.25, hi = Math.max(...xs, 1) + 0.25; return { c: (lo + hi) / 2, h: (hi - lo) / 2, xs }; }
    const hAt = (k) => { let m = 0; for (let j = Math.max(0, k - 2); j <= Math.min(KCOS, k + 2); j++) m = Math.max(m, Math.abs(xs[j] - XSTAR)); return Math.max(m * 1.5, 1e-13); };
    const k = step(), f = frac(), h = Math.exp(Math.log(hAt(k)) * (1 - f) + Math.log(hAt(Math.min(KCOS, k + 1))) * f);
    return { c: XSTAR, h, xs };
  }
  function drawCos(g0) {
    const { c: mid, h, xs } = cosView(), k = step(), f = frac();
    const g = kit.plot($('cv'), { x: [mid - h, mid + h], y: [mid - h, mid + h], pad: [30, 30, 74, 60], equal: true });
    const c = g.ctx, lo = g.x0, hi = g.x1, pts = [];
    c.save(); c.beginPath(); c.rect(g.pl, g.pt, g.iw, g.ih); c.clip();
    g.line([[lo, lo], [hi, hi]], P.dim, { width: 1.2 });
    for (let i = 0; i <= 240; i++) { const x = lo + (hi - lo) * i / 240; pts.push([x, Math.cos(x)]); }
    g.line(pts, P.cyan, { width: 2 });
    const web = [[xs[0], xs[0]]];
    for (let j = 0; j < k; j++) { web.push([xs[j], xs[j + 1]]); web.push([xs[j + 1], xs[j + 1]]); }
    if (k < KCOS && f > 0) { const a = Math.min(1, f * 2), b = Math.max(0, f * 2 - 1); web.push([xs[k], xs[k] + (xs[k + 1] - xs[k]) * a]); if (b > 0) web.push([xs[k] + (xs[k + 1] - xs[k]) * b, xs[k + 1]]); }
    g.line(web, P.amber, { width: 1.6, alpha: 0.9 });
    g.dot(XSTAR, XSTAR, P.magenta, 7, { ring: true, width: 2 });
    const last = web[web.length - 1]; g.dot(last[0], last[1], P.amber, 5, { glow: 12 });
    c.restore();
    g.text(lo, lo, 'y = x', P.dim, { align: 'left', base: 'bottom', dx: 26, dy: -6, size: 11.5 });
    g.text(hi, Math.cos(hi), 'y = cos x', P.cyan, { align: 'right', base: 'bottom', dx: -22, dy: -10, size: 11.5 });
    g.text(XSTAR, XSTAR, 'x*', P.magenta, { align: 'left', base: 'middle', dx: 14, dy: 0, size: 12.5 });
    const base = Math.max(Math.abs(S.x0 - XSTAR), 0.74) * 1.5;
    $('hudBig').textContent = L(`第 ${k} 步 · x = ${xs[k].toFixed(10)}`, `STEP ${k} · x = ${xs[k].toFixed(10)}`);
    $('hudSub').textContent = (S.zoom === 'follow' ? L(`画面放大 ×${sci(base / h)} · `, `View zoomed ×${sci(base / h)} · `) : '') + L(`离不动点还差 ${sci(Math.abs(xs[k] - XSTAR))}`, `still ${sci(Math.abs(xs[k] - XSTAR))} from the fixed point`);
  }

  function drawPrime(g) {
    const c = g.ctx, W = g.W, H = g.H, k = step(), E = EUCLID[k], q = E.factors[0];
    const cols = Math.max(1, Math.min(k, 6)), rowsN = Math.max(1, Math.ceil(k / 6)), areaW = W - 60, areaH = H - 78 - 150;
    const r = Math.min(areaW / (cols * 2.5), areaH / (rowsN * 2.55), 74), top = 78 + Math.max(0, (areaH - rowsN * r * 2.55) / 2);
    const dial = (x, y, rad, p, rem, col, big) => {
      c.strokeStyle = TRV.alpha(col, 0.55); c.lineWidth = 1.2; c.beginPath(); c.arc(x, y, rad, 0, kit.TAU); c.stroke();
      if (p <= 64) for (let t = 0; t < p; t++) { const a = -Math.PI / 2 + kit.TAU * t / p; c.fillStyle = t === 0 ? P.warn : TRV.alpha(col, 0.7); c.beginPath(); c.arc(x + rad * Math.cos(a), y + rad * Math.sin(a), t === 0 ? 3 : 1.8, 0, kit.TAU); c.fill(); }
      else { c.fillStyle = P.warn; c.beginPath(); c.arc(x, y - rad, 3, 0, kit.TAU); c.fill(); }
      const a = -Math.PI / 2 + kit.TAU * rem / p; c.save(); c.shadowColor = col; c.shadowBlur = 8; c.strokeStyle = col; c.lineWidth = 2.2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + rad * 0.86 * Math.cos(a), y + rad * 0.86 * Math.sin(a)); c.stroke(); c.restore();
      c.fillStyle = P.void; c.beginPath(); c.arc(x, y, rad * 0.36, 0, kit.TAU); c.fill();
      c.fillStyle = col; c.font = `600 ${Math.round(rad * (big ? 0.3 : 0.36))}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(p), x, y + 1);
      c.fillStyle = rem === 0 ? P.magenta : P.dim; c.font = `11px ${TRV.fonts.data}`; c.textBaseline = 'top'; c.fillText(`${L('余', 'rem')} ${rem}`, x, y + rad + 7);
    };
    for (let i = 0; i < k; i++) { const col = i % 6, row = Math.floor(i / 6), n = Math.min(6, k - row * 6); dial(W / 2 + (col - (n - 1) / 2) * r * 2.5, top + r + 6 + row * r * 2.55, r, PRIMES[i], E.Q % PRIMES[i], P.cyan); }
    if (!k) { c.fillStyle = P.dim; c.font = `13px ${TRV.fonts.body}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(L('清单是空的：空乘积是 1', 'The list is empty: the empty product is 1'), W / 2, top + areaH / 2); }
    // Q and its factorization; the least prime factor gets its own dial, hand on 0
    const by = H - 96, rr = Math.min(36, r);
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = P.ink; c.font = `600 ${W < 520 ? 14 : 18}px ${TRV.fonts.data}`;
    const prodText = k ? PRIMES.slice(0, k).join('·') : '1', line = `Q = ${k > 7 ? `p₁⋯p${k < 10 ? '₀₁₂₃₄₅₆₇₈₉'[k] : '₁' + '₀₁₂₃₄₅₆₇₈₉'[k - 10]}` : prodText} + 1 = ${E.Q}`;
    c.fillText(line, W / 2 - rr - 20, by - 14);
    c.fillStyle = P.magenta; c.font = `600 ${W < 520 ? 13 : 16}px ${TRV.fonts.data}`;
    c.fillText(E.factors.length === 1 ? L(`${E.Q} 本身是素数`, `${E.Q} is itself prime`) : `= ${E.factors.join(' × ')}`, W / 2 - rr - 20, by + 14);
    dial(Math.min(W - rr - 30, W / 2 + c.measureText(line).width / 2 + rr + 40), by - 8, rr, q, 0, P.magenta, q > 999);
    $('hudBig').textContent = L(`清单里有 ${k} 个素数`, `${k} PRIME${k === 1 ? '' : 'S'} ON THE LIST`);
    $('hudSub').textContent = L(`每只钟的指针都指着 1，没有一只指着红色的 0；Q 的最小素因子 ${q} 不在清单里`, `Every hand points at 1 and none at the red 0; the least prime factor ${q} of Q is not on the list`);
  }

  /* ---------- the two plots under the stage ---------- */
  function drawPlots() {
    const k = step(), A = $('plotA'), B = $('plotB');
    if (S.scene === 'diag') {
      const N = S.N, d = dOf(S.rows), hd = S.rows.map((r) => hamming(r, d));
      const g = kit.plot(A, { x: [0.4, N + 0.6], y: [0, Math.max(...hd, 2) + 0.6], pad: [30, 10, 10, 22] });
      g.axes({ yTicks: [0, 1, Math.max(...hd, 2)], xTicks: S.rows.map((_, i) => [i + 1, `f${i + 1}`]) });
      hd.forEach((h, i) => g.rect(i + 0.68, 0, i + 1.32, h, i < k ? P.cyan : P.dim, { alpha: i < k ? 0.8 : 0.4 }));
      g.hline(1, P.amber, { dash: [4, 3] });
      $('pATitle').textContent = L('d 与每一行差几位', 'Bits by which d differs'); $('pAMeta').textContent = `min ${Math.min(...hd)} ≥ 1`;
      const g2 = kit.plot(B, { x: [1, 12], y: [1, 5000], logY: true, pad: [38, 10, 10, 22] });
      g2.axes({ yTicks: [[1, '1'], [10, '10'], [100, '100'], [1000, '1000']], xTicks: [2, 4, 6, 8, 10, 12] });
      const all = [], list = []; for (let n = 1; n <= 12; n++) { all.push([n, Math.pow(2, n)]); list.push([n, n]); }
      g2.line(all, P.magenta); g2.line(list, P.cyan); g2.vline(N, P.amber); g2.dot(N, 1 << N, P.magenta, 4); g2.dot(N, N, P.cyan, 4);
      g2.legend([[P.magenta, L('全部串 2ᴺ', 'all strings 2ᴺ')], [P.cyan, L('清单 N 行', 'N listed rows')]], { right: false });
      $('pBTitle').textContent = L('清单装不下多少', 'How much the list cannot hold'); $('pBMeta').textContent = `${(1 << N) - new Set(S.rows.map(toInt)).size} ${L('个在外', 'outside')}`;
    } else if (S.scene === 'poly') {
      const g = kit.plot(A, { x: [0, 12], y: [1e-10, 1], logY: true, pad: [42, 24, 10, 22] });
      g.axes({ yTicks: [[1, '1'], [1e-3, '10⁻³'], [1e-6, '10⁻⁶'], [1e-9, '10⁻⁹']], xTicks: [[0, '6'], [2, '24'], [4, '96'], [6, '384'], [8, '1536'], [10, '6144'], [12, '24576']] });
      const a = [], b = []; for (let j = 0; j <= 12; j++) { a.push([j, gap(sides(j))]); b.push([j, piDeficit(sides(j))]); }
      g.line(a, P.magenta); g.line(b, P.cyan, { dash: [5, 3] }); a.forEach((p) => g.dot(p[0], p[1], P.magenta, 2.5)); g.vline(k, P.amber); g.dot(k, gap(sides(k)), P.magenta, 4.5);
      g.legend([[P.magenta, L('缝 1 − cos(π/n)', 'gap 1 − cos(π/n)')], [P.cyan, L('π − 半周长', 'π − half-perimeter'), 'dash']]);
      $('pATitle').textContent = L('边数翻倍，缝还剩多少', 'The gap as the sides double'); $('pAMeta').textContent = `n = ${sides(k)}`;
      const g2 = kit.plot(B, { x: [1, 10], y: [1e-17, 100], logY: true, pad: [42, 10, 10, 22] });
      g2.axes({ yTicks: [[1, '1'], [1e-5, '10⁻⁵'], [1e-10, '10⁻¹⁰'], [1e-15, '10⁻¹⁵']], xTicks: [1, 2, 4, 6, 8, 10] });
      const act = [], bnd = []; for (let m = 1; m <= 10; m++) { const t = taylor(S.tpoint, m); act.push(t.actual > 2e-17 ? [m, t.actual] : null); bnd.push([m, t.bound]); }
      g2.line(bnd, P.ok, { dash: [5, 3] }); g2.line(act, P.cyan); act.forEach((p) => p && g2.dot(p[0], p[1], P.cyan, 2.5));
      g2.legend([[P.cyan, L('实际余项', 'actual remainder')], [P.ok, L('已验证的界', 'verified bound'), 'dash']]);
      $('pBTitle').textContent = L('余弦的泰勒部分和', 'Taylor sums of the cosine'); $('pBMeta').textContent = `θ = ${S.tpoint.toFixed(2)}`;
    } else if (S.scene === 'cos') {
      const xs = orbit(S.x0), res = xs.map((x, j) => [j, Math.max(Math.abs(Math.cos(x) - x), 1e-17)]);
      const g = kit.plot(A, { x: [0, KCOS], y: [1e-9, 10], logY: true, pad: [42, 10, 10, 22] });
      g.axes({ yTicks: [[1, '1'], [1e-3, '10⁻³'], [1e-6, '10⁻⁶'], [1e-9, '10⁻⁹']], xTicks: [0, 10, 20, 30, 40] });
      g.line(res, P.magenta); g.vline(k, P.amber); g.dot(k, res[k][1], P.magenta, 4.5);
      $('pATitle').textContent = L('离不动点还差多少', 'How far from the fixed point'); $('pAMeta').textContent = `|cos xₖ − xₖ| = ${sci(Math.abs(Math.cos(xs[k]) - xs[k]))}`;
      const lo = Math.min(...xs.slice(1, 17), XSTAR) - 0.08, hi = Math.max(...xs.slice(1, 17), XSTAR) + 0.08;
      const g2 = kit.plot(B, { x: [0, 16], y: [lo, hi], pad: [38, 10, 10, 22] });
      g2.axes({ yTicks: [[XSTAR, 'x*']], xTicks: [0, 4, 8, 12, 16] });
      g2.hline(XSTAR, P.magenta, { dash: [4, 3] }); g2.line(xs.slice(0, 17).map((x, j) => (x >= lo && x <= hi ? [j, x] : null)), P.cyan);
      xs.slice(0, 17).forEach((x, j) => { if (x >= lo && x <= hi) g2.dot(j, x, j === k ? P.amber : P.cyan, j === k ? 4.5 : 2.5); });
      $('pBTitle').textContent = L('一左一右地靠近', 'Closing in from alternating sides'); $('pBMeta').textContent = `x* = ${XSTAR.toFixed(6)}`;
    } else {
      const g = kit.plot(A, { x: [0, 12], y: [1e-3, 1], logY: true, pad: [42, 10, 10, 22] });
      g.axes({ yTicks: [[1, '1'], [0.1, '0.1'], [0.01, '0.01']], xTicks: [0, 2, 4, 6, 8, 10, 12] });
      const pts = EUCLID.map((e) => [e.k, ZETA2 - e.euler]); g.line(pts, P.magenta); pts.forEach((p) => g.dot(p[0], p[1], P.magenta, 2.5)); g.vline(k, P.amber); g.dot(k, pts[k][1], P.magenta, 4.5);
      $('pATitle').textContent = L('欧拉乘积离 π²/6 还差多少', 'Euler product: distance to π²/6'); $('pAMeta').textContent = sci(ZETA2 - EUCLID[k].euler);
      const g2 = kit.plot(B, { x: [-0.6, 12.6], y: [1, 1e12], logY: true, pad: [42, 10, 10, 22] });
      g2.axes({ yTicks: [[1, '1'], [1e3, '10³'], [1e6, '10⁶'], [1e9, '10⁹']], xTicks: [0, 2, 4, 6, 8, 10, 12] });
      EUCLID.forEach((e) => g2.rect(e.k - 0.3, 1, e.k + 0.3, e.factors[0], P.magenta, { alpha: e.k === k ? 0.95 : 0.5 }));
      g2.line(EUCLID.filter((e) => e.k > 0).map((e) => [e.k, PRIMES[e.k - 1]]), P.cyan); g2.vline(k, P.amber, { alpha: 0.6 });
      g2.legend([[P.magenta, L('Q 的最小素因子', 'least prime factor of Q')], [P.cyan, L('清单里最大的素数', 'largest prime on the list')]], { right: false });
      $('pBTitle').textContent = L('逃出清单的素数', 'The prime that escapes'); $('pBMeta').textContent = `q = ${EUCLID[k].factors[0]}`;
    }
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const k = step(), set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    let pill = '';
    if (S.scene === 'diag') {
      const N = S.N, d = dOf(S.rows), hd = S.rows.map((r) => hamming(r, d)), distinct = new Set(S.rows.map(toInt)).size;
      $('roKeyL').textContent = L('d 与清单最近的一行', 'd and the nearest row of the list');
      $('roKey').innerHTML = L(`差 ${Math.min(...hd)} 位`, `${Math.min(...hd)} bit${Math.min(...hd) === 1 ? '' : 's'} apart`) + ' <span class="okmark">≥ 1 ✓</span>';
      $('roKeySub').textContent = L('第 k 行至少在第 k 位与 d 不同', 'row k differs from d at least in place k');
      set(1, L('清单', 'the list'), L(`${N} 行`, `${N} rows`)); set(2, L('逃出的串 d', 'the escaped string d'), k >= N ? d.join('') : d.slice(0, k).join('') + '·'.repeat(N - k));
      set(3, L('全部串', 'all strings'), `2^${N} = ${1 << N}`); set(4, L('清单之外', 'off the list'), `${(1 << N) - distinct}`);
      $('roNote').textContent = N < 10 ? L('“把 d 收进清单”会多出一行和一列，新的对角线又翻出一个清单外的串。', '“Put d on the list” adds a row and a column, and the new diagonal again produces a string that is off the list.') : L('N = 10 是本页的上限；道理对任何 N 都一样。', 'N = 10 is the limit of this page; the argument is the same for every N.');
      pill = `${(1 << N) - distinct}`;
    } else if (S.scene === 'poly') {
      const n = sides(k);
      $('roKeyL').textContent = L('边的中点到圆弧的缝', 'gap between a side and the arc');
      $('roKey').innerHTML = `${sci(gap(n))} <span class="okmark">&gt; 0 ✓</span>`; $('roKeySub').textContent = '1 − cos(π/n) = 2 sin²(π/2n)';
      set(1, L('边数 n', 'sides n'), String(n)); set(2, L('半周长 n sin(π/n)', 'half-perimeter n sin(π/n)'), halfPerimeter(n).toFixed(10));
      set(3, L('π − 半周长', 'π − half-perimeter'), sci(piDeficit(n))); set(4, L('每翻一倍，缝缩到', 'each doubling shrinks the gap to'), k < 12 ? `${fix(gap(sides(k + 1)) / gap(n), 4)}` : '—');
      $('roNote').textContent = L('刘徽由 192 边形的面积（等于 96 边形的半周长）得 3.1410，祖冲之算到 24576 边得 3.1415926。每翻一倍，缝大约缩到四分之一，却从不为零。', 'Liu Hui got 3.1410 from the area of the 192-gon (which equals the half-perimeter of the 96-gon), and Zu Chongzhi 3.1415926 with 24576 sides. Each doubling shrinks the gap to about a quarter, and it is never zero.');
      pill = sci(gap(n));
    } else if (S.scene === 'cos') {
      const xs = orbit(S.x0), res = Math.abs(Math.cos(xs[k]) - xs[k]);
      $('roKeyL').textContent = L('这一步离不动点还差', 'still to go at this step');
      $('roKey').innerHTML = `${sci(res)} <span class="okmark">${res > 0 ? '&gt; 0 ✓' : ''}</span>`; $('roKeySub').textContent = '|cos xₖ − xₖ|';
      set(1, `x${k < 10 ? '₀₁₂₃₄₅₆₇₈₉'[k] : 'ₖ'}`, xs[k].toFixed(12)); set(2, L('不动点 x*', 'fixed point x*'), XSTAR.toFixed(12));
      set(3, L('每步误差约乘以', 'error factor per step'), k > 0 && Math.abs(xs[k - 1] - XSTAR) > 1e-13 ? fix(Math.abs(xs[k] - XSTAR) / Math.abs(xs[k - 1] - XSTAR), 4) : '—'); set(4, 'sin x*', Math.sin(XSTAR).toFixed(4));
      $('roNote').textContent = L('误差按等比缩小：再走多少步都只是乘上一个小于 1 的数，不会变成零。', 'The error shrinks geometrically: however many more steps, it is only multiplied by a number below 1 and never becomes zero.');
      pill = sci(res);
    } else {
      const E = EUCLID[k];
      $('roKeyL').textContent = L('Q 的最小素因子', 'least prime factor of Q');
      $('roKey').innerHTML = `${E.factors[0]} <span class="okmark">${L('不在清单里', 'not on the list')} ✓</span>`; $('roKeySub').textContent = E.factors.length === 1 ? L('Q 本身是素数', 'Q is itself prime') : `Q = ${E.factors.join(' × ')}`;
      set(1, L('清单', 'the list'), k ? PRIMES.slice(0, k).join(', ') : L('空', 'empty')); set(2, 'Q = p₁⋯pₖ + 1', String(E.Q));
      set(3, L('欧拉乘积 ∏(1 − p⁻²)⁻¹', 'Euler product ∏(1 − p⁻²)⁻¹'), E.euler.toFixed(6)); set(4, L('π²/6 − 乘积', 'π²/6 − product'), sci(ZETA2 - E.euler));
      $('roNote').textContent = L('Q 除以清单里每个素数都余 1，所以整除 Q 的素数一定是新的。', 'Q leaves remainder 1 on every listed prime, so any prime that divides Q is new.');
      pill = String(E.factors[0]);
    }
    $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1];
    $('pillStep').querySelector('strong').textContent = String(k);
    $('pillGap').querySelector('strong').textContent = pill;
    const LEG = {
      diag: [['box cy', '清单里的 1', 'a 1 on the list'], ['am', '已读的对角元', 'diagonal bits read'], ['box mg', '翻转得到的 d', 'the flipped string d']],
      poly: [['dm', '圆', 'the circle'], ['cy', '内接多边形', 'the inscribed polygon'], ['box mg', '缝', 'the gap']],
      cos: [['cy', 'y = cos x', 'y = cos x'], ['am', '迭代走过的路', 'the path of the iteration'], ['mg', '不动点 x*', 'the fixed point x*']],
      prime: [['cy', '清单里的素数：余 1', 'listed primes: remainder 1'], ['mg', '新素数：余 0', 'the new prime: remainder 0'], ['wn', '刻度 0 = 整除', 'tick 0 = divides']]
    };
    const html = LEG[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  const paint = kit.painter(() => {
    if (S.scene === 'cos') drawCos(); else { const g = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }); ({ diag: drawDiag, poly: drawPoly, prime: drawPrime })[S.scene](g); }
    drawPlots(); drawText();
  }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 6, rate: 1.5, step: 1,
    format: (t, max) => `${L('步', 'step')} ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)}</small>`,
    onChange: (t, c) => { if (stopAt != null && c.playing && t >= stopAt) { const at = stopAt; stopAt = null; c.pause(); c.set(at); return; } paint(); }
  });
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); clock.rate = SC[sc].rate; clock.setMax(SC[sc].max(), true); clock.set(t == null ? SC[sc].start() : t);
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  function newList(keepStep) { S.rows = makeList(S.N, S.seed); clock.setMax(S.N, true); clock.set(keepStep ? Math.min(clock.t, S.N) : S.N); }
  const fSize = kit.field($('size'), { onInput: (v) => { S.N = v; leave(); newList(); } });
  const fSeed = kit.field($('seed'), { onInput: (v) => { S.seed = v; leave(); newList(); } });
  kit.field($('tpoint'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.tpoint = v; leave(); paint(); } });
  const fX0 = kit.field($('x0'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.x0 = v; leave(); paint(); } });
  const zoomChips = kit.chips($('zoomChips'), 'zoom', (v) => { S.zoom = v; paint(); });
  function doAbsorb(quiet) {
    if (!absorbD()) { TRV.toast($('toast'), L('本页的清单最多 10 行', 'The list on this page holds at most 10 rows')); return false; }
    fSize.set(S.N); clock.setMax(S.N, true); clock.set(S.N - 1, true);
    if (!quiet) { TRV.toast($('toast'), L(`d 成了第 ${S.N} 行；新的对角线又翻出一个清单外的串`, `d is now row ${S.N}; the new diagonal flips out another string that is off the list`)); clock.play(); }
    return true;
  }
  $('absorb').addEventListener('click', () => { leave(); doAbsorb(); paint(); });
  $('identity').addEventListener('click', () => { leave(); S.rows = Array.from({ length: S.N }, (_, i) => Array.from({ length: S.N }, (_, j) => (i === j ? 1 : 0))); clock.set(S.N); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  $('cv').addEventListener('click', (ev) => {
    if (S.scene !== 'diag' || !hit) return;
    const b = $('cv').getBoundingClientRect(), j = Math.floor((ev.clientX - b.left - hit.gx) / hit.s), i = Math.floor((ev.clientY - b.top - hit.gy) / hit.s);
    if (i >= 0 && i < hit.N && j >= 0 && j < hit.N) { S.rows[i][j] = 1 - S.rows[i][j]; leave(); paint(); }
  });
  kit.keys({ 1: () => { leave(); setScene('diag'); }, 2: () => { leave(); setScene('poly'); }, 3: () => { leave(); setScene('cos'); }, 4: () => { leave(); setScene('prime'); } });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    diagonal: ['清单有 6 行。逐行读对角线上的那一位并翻转，拼出 d。d 与第 k 行在第 k 位不同，所以它不是任何一行；右边的点阵里，与 d 相容的候选每步减半，最后剩下的那个不在清单上。', 'The list has 6 rows. Read the diagonal bit of each row and flip it to build d. d differs from row k in place k, so it is none of the rows; in the dot grid the candidates compatible with d halve at each step, and the one that remains is not on the list.'],
    absorb: ['把逃走的 d 收进清单当第 7 行，再补一列让表保持方形。新的对角线立刻翻出另一个不在清单里的串。收编多少次都一样。', 'Take the escaped d onto the list as row 7 and add a column to keep the table square. The new diagonal at once flips out another string that is off the list. It is the same however often you absorb.'],
    liuhui: ['刘徽从正 6 边形出发，每次把边数翻倍：6、12、24、48、96、192。多边形越来越像圆，放大镜里的缝却一直在。', 'Liu Hui started from the hexagon and doubled the sides each time: 6, 12, 24, 48, 96, 192. The polygon looks more and more like the circle, yet the gap in the magnifier is always there.'],
    zu: ['祖冲之算到 24576 边。肉眼早已分不出多边形和圆，缝只有 8×10⁻⁹，但把它放大十亿倍，它和第一步时一模一样。', 'Zu Chongzhi went to 24576 sides. The eye cannot tell polygon from circle any more and the gap is only 8×10⁻⁹, but magnified a billion times it looks exactly as it did at the first step.'],
    dottie: ['从 0 出发反复取余弦。蛛网一圈圈绕向 x* ≈ 0.739，画面跟着放大。每一步都更近，误差乘以大约 0.67，却没有哪一步恰好到达。', 'Start at 0 and take the cosine again and again. The cobweb winds in on x* ≈ 0.739 while the view zooms along. Each step is closer, the error multiplied by about 0.67, yet no step lands exactly.'],
    far: ['换一个很远的起点 x₀ = 3：第一步就被拉进 [−1, 1]，之后走向同一个 x*。终点与起点无关，到不了这件事也与起点无关。', 'Take a far start, x₀ = 3: the first step pulls it into [−1, 1] and from there it heads for the same x*. The end does not depend on the start, and neither does the fact that it is never reached.'],
    euclid: ['清单每多一个素数，就把它们全部乘起来再加一。新数 Q 在每只钟上都指着 1，从不指着 0，所以整除 Q 的素数一定不在清单里。', 'Each time the list gains a prime, multiply them all and add one. The new number Q points at 1 on every dial, never at 0, so any prime dividing Q is not on the list.'],
    thirteen: ['2·3·5·7·11·13 + 1 = 30031 不是素数，它等于 59 × 509。欧几里得的论证没有说 Q 是素数，只说它的素因子都是新的。', '2·3·5·7·11·13 + 1 = 30031 is not prime: it is 59 × 509. Euclid\'s argument does not say that Q is prime, only that its prime factors are all new.']
  };
  let booting = true, stopAt = null;
  /** Start a card: `to` = where its story ends on the rail (null: the last step), `still` = the frame a still shows. */
  function run(sc, to, still) {
    setScene(sc, 0); if (to != null) clock.setMax(SC[sc].max(), true);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(still == null ? (to == null ? clock.max : to) : still); return; }
    stopAt = to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  function applyPreset(id) {
    stopAt = null;
    if (id === 'diagonal' || id === 'absorb') { S.N = 6; S.seed = 11; fSize.set(6); fSeed.set(11); S.rows = makeList(6, 11); }
    if (id === 'diagonal') run('diag');
    else if (id === 'absorb') { setScene('diag', 6); doAbsorb(true); if (TRV.still || (booting && !TRV.embed)) clock.set(S.N); else if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    else if (id === 'liuhui') run('poly', 5);
    else if (id === 'zu') setScene('poly', 12);
    else if (id === 'dottie') { S.x0 = 0; fX0.set(0); S.zoom = 'follow'; zoomChips.set('follow', true); run('cos', null, 9); }
    else if (id === 'far') { S.x0 = 3; fX0.set(3); S.zoom = 'whole'; zoomChips.set('whole', true); run('cos', 12); }
    else if (id === 'euclid') run('prime', null, 4);
    else if (id === 'thirteen') setScene('prime', 6);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、改清单、拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, edit the list, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.ESCAPE_DEBUG = {
    get state() {
      const k = step(), d = dOf(S.rows), xs = orbit(S.x0);
      return { scene: S.scene, step: k, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, N: S.N, seed: S.seed, rows: S.rows.map((r) => r.join('')), d: d.join(''),
        hamming: S.rows.map((r) => hamming(r, d)), n: sides(Math.min(k, 12)), gap: gap(sides(Math.min(k, 12))), x0: S.x0, xk: xs[Math.min(k, KCOS)], xstar: XSTAR, zoom: S.zoom, euclid: EUCLID[Math.min(k, PRIMES.length)], tpoint: S.tpoint };
    },
    seek: (t) => { clock.pause(); clock.set(t); }, taylor, cell: (i, j) => { const b = $('cv').getBoundingClientRect(); return [b.left + hit.gx + (j + 0.5) * hit.s, b.top + hit.gy + (i + 0.5) * hit.s]; }
  };
  window.TRV_THUMB = () => { S.N = 8; S.seed = 5; S.rows = makeList(8, 5); setScene('diag', 8); paint.now(); };
  S.rows = makeList(S.N, S.seed); cards.pick(cards.initial('diagonal'));
  booting = false;
  paint();
})();
