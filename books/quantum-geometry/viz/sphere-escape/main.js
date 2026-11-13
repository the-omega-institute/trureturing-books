/* ORTHO//ESCAPE: six scenes of one fact — after finitely many steps something is still outside.
   diag   flip the diagonal of an N × N list: the string d differs from row k in place k
   fiber  four addresses, a surjective catalog of the four decoders {0,1} → {0,1}: whatever the latent coordinates,
          the diagonal g splits one of the fibres, and adjoining g as a second axis gives more blocks
   poly   the regular n-gon inscribed in the unit circle, n = 6 · 2^k: the gap 1 − cos(π/n) under the arc
   ptr    a pointer on N + 1 cells shifted by ℓ: its overlap |γ(ℓ)| stays below the apothem cos(π/(⌊N/ℓ⌋ + 2))
   cos    x_{k+1} = cos x_k: the residual |cos x_k − x_k| shrinks geometrically and stays positive
   prime  Q = p_1 ⋯ p_k + 1 leaves remainder 1 on every listed prime: its prime factors are off the list
   One rail (the step k) drives every scene; the two plots under the stage show what is left outside.
   Read-only probe for the browser suite: window.ESCAPE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const S = { scene: 'diag', N: 6, seed: 11, rows: [], x0: 0, zoom: 'follow', tpoint: 1, lat: [0, 0, 0, 1], pN: 8, shape: 'sine' };
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
  /** The cosine series cut after m terms → { actual: its remainder |cos θ − Σ_{j<m} (−1)^j θ^{2j}/(2j)!|, lagrange: the
      first omitted term θ^{2m}/(2m)!, bound: the verified bound θ^{2m}/(2m)!·e^θ }. The remainder is the omitted tail
      Σ_{j≥m} (−1)^j θ^{2j}/(2j)!, summed term by term in double precision: cos θ minus the rounded partial sum would only
      measure rounding error (about 10⁻¹⁶) once the remainder is smaller than that. For 0 < θ ≤ 3 and m ≥ 1 the tail
      alternates and its terms shrink (ratio θ²/((2j + 1)(2j + 2)) ≤ 3/4), so stopping once the next term is below 10⁻²⁰
      of the sum leaves a truncation error smaller than that term. */
  function taylor(theta, m) {
    let b = 1; for (let i = 1; i <= 2 * m; i++) b *= theta / i;
    let tail = 0, term = b;
    for (let j = m; j < m + 200 && Math.abs(term) > 1e-20 * Math.abs(tail); j++) { tail += term; term *= -theta * theta / ((2 * j + 1) * (2 * j + 2)); }
    return { actual: Math.abs(tail), lagrange: b, bound: b * Math.exp(theta) };
  }

  /* ---------- fiber: the four-address catalog of the chapter's hand calculation ---------- */
  const DEC = [[0, 0], [0, 1], [1, 0], [1, 1]];   // D_a(0), D_a(1): constant 0, identity, negation, constant 1 — every map {0,1} → {0,1} once
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const gOf = (lat) => DEC.map((D, a) => 1 - D[lat[a]]);
  function fiberFacts(lat) {
    const g = gOf(lat), pairs = [];
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) if (lat[a] === lat[b] && g[a] !== g[b]) pairs.push([a, b]);
    return { g, pairs, before: new Set(lat).size, after: new Set(lat.map((l, a) => `${l}${g[a]}`)).size };
  }
  const latOf = (code) => [3, 2, 1, 0].map((i) => (code >> i) & 1);   // the 16 latent maps, a₀ first
  const ALLLAT = Array.from({ length: 16 }, (_, code) => fiberFacts(latOf(code)));
  let fiberHit = [];   // node positions on the stage, for clicks

  /* ---------- ptr: a finite record pointer and its shifted copy ---------- */
  function pointer(N, shape) {
    const c = Array.from({ length: N + 1 }, (_, k) => (shape === 'flat' ? 1 : shape === 'tri' ? Math.min(k + 1, N + 1 - k) : Math.sin(Math.PI * (k + 1) / (N + 2))));
    const n = Math.sqrt(c.reduce((s, x) => s + x * x, 0));
    return c.map((x) => x / n);
  }
  const gamma = (c, l) => { let s = 0; for (let k = 0; k + l < c.length; k++) s += c[k + l] * c[k]; return s; };
  const apothem = (N, l) => Math.cos(Math.PI / (Math.floor(N / l) + 2));
  const ell = () => Math.min(S.pN, step() + 1);

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
    fiber: { max: () => 6, rate: 1.1, start: () => 6, name: ['纤维', 'FIBRES'] },
    poly: { max: () => 12, rate: 1.1, start: () => 4, name: ['割圆', 'POLYGON'] },
    ptr: { max: () => S.pN - 1, rate: 0.9, start: () => 0, name: ['指针', 'POINTER'] },
    cos: { max: () => KCOS, rate: 3, start: () => 12, name: ['余弦', 'COSINE'] },
    prime: { max: () => PRIMES.length, rate: 0.9, start: () => 4, name: ['素数', 'PRIMES'] }
  };
  const step = () => Math.floor(clock.t + 1e-9), frac = () => clock.t - step();
  let hit = null;   // layout of the matrix on the stage, for clicks
  let taylorLast = null;   // the last Taylor plot: θ, its y range and the plotted remainders and bounds for m = 1 … 10

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

  function drawFiber(g) {
    const c = g.ctx, W = g.W, H = g.H, t = clock.t, k = step(), f = Math.max(0, Math.min(1, t - 5)), F = fiberFacts(S.lat);
    const rise = f * f * (3 - 2 * f), small = W < 520;
    const top = 92, bot = H - 64, mid = (top + bot) / 2, colW = Math.min(W * 0.36, 300), gapX = Math.min(W * 0.06, 50);
    const x0 = Math.max(small ? 40 : 70, (W - 2 * colW - gapX) / 2 + (small ? 12 : 24)), colX = [x0, x0 + colW + gapX];
    const r = Math.max(11, Math.min(17, (bot - top) / 22)), rowH = Math.min(r * 3.2, (bot - top) / 5.2);
    const bandY = [mid + (bot - top) * 0.24, mid - (bot - top) * 0.24];   // g = 0 below, g = 1 above
    const members = [0, 1].map((l) => [0, 1, 2, 3].filter((a) => S.lat[a] === l));
    const pos = [];
    for (const l of [0, 1]) members[l].forEach((a, i) => {
      const yFlat = mid + (i - (members[l].length - 1) / 2) * rowH;
      const same = members[l].filter((b) => F.g[b] === F.g[a]), j = same.indexOf(a);
      const yRise = bandY[F.g[a]] + (j - (same.length - 1) / 2) * rowH * 0.9;
      pos[a] = [colX[l] + r + 10, yFlat + (yRise - yFlat) * rise];
    });
    fiberHit = pos.map((p, a) => ({ a, x: p[0], y: p[1], r: r + 6 }));
    // the new axis: g, rising out of the old readout
    if (rise > 0) {
      c.globalAlpha = rise; const ax = colX[0] - (small ? 22 : 34);
      c.strokeStyle = P.violet; c.lineWidth = 1.4; c.beginPath(); c.moveTo(ax, bot); c.lineTo(ax, top - 4); c.stroke();
      c.beginPath(); c.moveTo(ax - 4, top + 4); c.lineTo(ax, top - 4); c.lineTo(ax + 4, top + 4); c.stroke();
      c.fillStyle = P.violet; c.font = `600 12px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillText('g', ax, top - 8);
      c.font = `11px ${TRV.fonts.data}`; c.textBaseline = 'middle'; c.textAlign = 'right'; c.fillText('1', ax - 6, bandY[1]); c.fillText('0', ax - 6, bandY[0]);
      c.globalAlpha = 1;
    }
    // fibres: one box per latent value; after the join each splits into the blocks of (latent, g)
    const box = (x, y0, y1, col, a, label) => {
      c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = 1.4; c.fillStyle = TRV.alpha(col, 0.07);
      c.beginPath(); c.roundRect ? c.roundRect(x, y0, colW, y1 - y0, 8) : c.rect(x, y0, colW, y1 - y0); c.fill(); c.stroke();
      if (label) { c.fillStyle = col; c.font = `600 ${small ? 11 : 12}px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillText(label, x + 4, y0 - 5); }
      c.globalAlpha = 1;
    };
    for (const l of [0, 1]) {
      const n = members[l].length;
      if (!n) { box(colX[l], mid - rowH * 0.6, mid + rowH * 0.6, P.faint, 1, `latent = ${l}`); c.fillStyle = P.dim; c.font = `11px ${TRV.fonts.body}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(L('空纤维', 'empty fibre'), colX[l] + colW / 2, mid); continue; }
      box(colX[l], mid - (n / 2) * rowH - 4, mid + (n / 2) * rowH + 4, P.cyan, 1 - rise, `latent = ${l}`);
      for (const gv of [0, 1]) {
        const m = members[l].filter((a) => F.g[a] === gv).length; if (!m || rise === 0) continue;
        box(colX[l], bandY[gv] - (m / 2) * rowH * 0.9 - 4, bandY[gv] + (m / 2) * rowH * 0.9 + 4, P.cyan, rise, gv === 1 ? `(${l}, 1)` : `(${l}, 0)`);
      }
    }
    // separation deficit: a pair in one fibre on which g disagrees
    if (t >= 4.02) {
      c.globalAlpha = Math.min(1, (t - 4) * 1.6); c.strokeStyle = P.magenta; c.lineWidth = 2;
      F.pairs.forEach(([a, b], i) => {
        const p = pos[a], q = pos[b], bx = p[0] - r - 12 - i * 9;
        c.beginPath(); c.moveTo(p[0] - r, p[1]); c.bezierCurveTo(bx - 14, p[1], bx - 14, q[1], q[0] - r, q[1]); c.stroke();
      });
      c.globalAlpha = 1;
    }
    // the four addresses with their decoders: the cell at latent(a) is read, then flipped to g(a)
    const cs = Math.max(15, Math.min(22, r * 1.25));
    for (let a = 0; a < 4; a++) {
      const [x, y] = pos[a], done = a < Math.min(k, 4), now = a === k - 1 && t < 4.02 && k >= 1;
      c.fillStyle = P.void; c.strokeStyle = now ? P.amber : P.cyan; c.lineWidth = now ? 2.2 : 1.6;
      c.beginPath(); c.arc(x, y, r, 0, kit.TAU); c.fill(); c.stroke();
      c.fillStyle = P.ink; c.font = `600 ${Math.round(r * 0.8)}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(`a${SUB[a]}`, x, y + 1);
      const tx = x + r + 10;
      if (!small) { c.fillStyle = P.dim; c.font = `10px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillText(`D${SUB[a]}(0) D${SUB[a]}(1)`, tx, y - cs / 2 - 2); }
      for (const v of [0, 1]) {
        const cx = tx + v * (cs + 4), read = S.lat[a] === v;
        c.strokeStyle = read ? (now ? P.amber : P.cyan) : TRV.alpha(P.sigma, 0.6); c.lineWidth = read ? 1.8 : 1;
        c.strokeRect(cx + 0.5, y - cs / 2 + 0.5, cs - 1, cs - 1);
        c.fillStyle = read ? P.ink : P.dim; c.font = `${Math.round(cs * 0.55)}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(DEC[a][v]), cx + cs / 2, y + 1);
      }
      if (done || t >= 4) { c.fillStyle = P.magenta; c.font = `600 ${Math.round(cs * 0.62)}px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(`g = ${F.g[a]}`, tx + 2 * cs + 14, y + 1); }
    }
    $('hudBig').textContent = t < 4 ? L(`第 ${Math.min(k + 1, 4)} 个地址：读自己的坐标，喂自己的解码器，再翻转`, `ADDRESS ${Math.min(k + 1, 4)}: READ ITS COORDINATE, FEED ITS DECODER, FLIP`)
      : rise < 1 ? L(`同一根纤维里 g 不同的地址：${F.pairs.length} 对`, `${F.pairs.length} PAIR${F.pairs.length === 1 ? '' : 'S'} IN ONE FIBRE WITH DIFFERENT g`)
      : L(`并入 g 之后：${F.before} 块 → ${F.after} 块`, `AFTER ADJOINING g: ${F.before} → ${F.after} BLOCKS`);
    $('hudSub').textContent = L(`latent = (${S.lat.join(', ')})，g = (${F.g.join(', ')})；点一个地址换它的潜坐标`, `latent = (${S.lat.join(', ')}), g = (${F.g.join(', ')}); click an address to change its latent coordinate`);
  }

  function drawPtr(g) {
    const c = g.ctx, W = g.W, H = g.H, N = S.pN, l = ell(), cc = pointer(N, S.shape), gm = Math.abs(gamma(cc, l)), ap = apothem(N, l), m = Math.floor(N / l), n = m + 2;
    const shift = Math.min(N, Math.max(1, clock.t + 1));   // the copy slides continuously; the readings use whole shifts
    const small = W < 560, top = 96, bot = H - 70;
    // left: the pointer amplitudes and the copy shifted by ℓ
    const bw = small ? W - 40 : W * 0.5, bx0 = 30, bh = small ? (bot - top) * 0.46 : bot - top;
    const X = (k) => bx0 + ((k + 0.7) / (2 * N + 0.4)) * bw, Y = (v) => top + bh - v * bh * 0.8, w = Math.max(3, bw / (2 * N + 0.4) * 0.62);
    c.strokeStyle = P.faint; c.lineWidth = 1; c.beginPath(); c.moveTo(bx0, Y(0)); c.lineTo(bx0 + bw, Y(0)); c.stroke();
    cc.forEach((v, k) => { c.fillStyle = TRV.alpha(P.cyan, 0.75); c.fillRect(X(k) - w / 2, Y(v), w, Y(0) - Y(v)); });
    cc.forEach((v, k) => { c.strokeStyle = P.magenta; c.lineWidth = 1.6; c.strokeRect(X(k + shift) - w / 2 + 1, Y(v), w - 2, Y(0) - Y(v)); });
    c.fillStyle = P.dim; c.font = `11px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'top';
    c.fillText('0', X(0), Y(0) + 5); c.fillText(String(N), X(N), Y(0) + 5);
    c.fillStyle = P.magenta; c.fillText(`+${l}`, X(shift), Y(0) + 5);
    // right: the unit circle, the inscribed (m + 2)-gon, its apothem and the overlap on the same radius
    const R = small ? Math.min((bot - top) * 0.22, W * 0.3) : Math.min(W * 0.2, (bot - top) * 0.42), cx = small ? W / 2 : W * 0.78, cy = small ? bot - R - 6 : (top + bot) / 2 + 10;
    c.strokeStyle = P.sigma; c.lineWidth = 1.4; c.beginPath(); c.arc(cx, cy, R, 0, kit.TAU); c.stroke();
    c.beginPath(); for (let j = 0; j <= n; j++) { const a = -Math.PI / 2 - Math.PI / n + kit.TAU * j / n, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); if (j) c.lineTo(x, y); else c.moveTo(x, y); }
    c.fillStyle = TRV.alpha(P.cyan, 0.08); c.fill(); c.strokeStyle = P.cyan; c.lineWidth = 1.6; c.stroke();
    c.strokeStyle = P.magenta; c.lineWidth = 3; c.beginPath(); c.moveTo(cx, cy - R * ap); c.lineTo(cx, cy - R); c.stroke();
    c.strokeStyle = TRV.alpha(P.cyan, 0.8); c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx, cy - R * ap); c.stroke(); c.setLineDash([]);
    c.fillStyle = P.cyan; c.beginPath(); c.arc(cx, cy, 2.5, 0, kit.TAU); c.fill();
    c.save(); c.shadowColor = P.amber; c.shadowBlur = 10; c.fillStyle = P.amber; c.beginPath(); c.arc(cx, cy - R * gm, 5, 0, kit.TAU); c.fill(); c.restore();
    c.font = `${small ? 11 : 12}px ${TRV.fonts.data}`; c.textBaseline = 'middle';
    c.textAlign = 'left'; c.fillStyle = P.cyan; c.fillText(`cos(π/${n}) = ${ap.toFixed(4)}`, cx + 10, cy - R * ap + 26);
    c.textAlign = 'right'; c.fillStyle = P.amber; c.fillText(`|γ(${l})| = ${gm.toFixed(4)}`, cx - 10, cy - R * gm + (gm > ap - 0.08 ? 26 : 0));
    c.textAlign = 'left'; c.fillStyle = P.magenta; c.fillText(L(`弓高 ${sci(1 - ap)}`, `sagitta ${sci(1 - ap)}`), cx + 10, cy - R - 10);
    $('hudBig').textContent = `|γ(${l})| = ${gm.toFixed(4)} ≤ cos(π/${n}) = ${ap.toFixed(4)} < 1`;
    $('hudSub').textContent = L(`${N + 1} 格的指针平移 ℓ = ${l} 格：m = ⌊${N}/${l}⌋ = ${m}，正 ${n} 边形的边心距；不可恢复的误差至少 ${sci((1 - ap) / 2)}`,
      `A pointer on ${N + 1} cells shifted by ℓ = ${l}: m = ⌊${N}/${l}⌋ = ${m}, the apothem of the regular ${n}-gon; the unrecoverable error is at least ${sci((1 - ap) / 2)}`);
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

  /* ---------- prime: the layout of the stage ----------
     Four bands, each set from measured ink and no two touching, for every reachable step k = 0 … PRIMES.length at the
     current canvas size W × H:
       1. the k listed dials (number inside, remainder under each), or at k = 0 the sentence about the empty list;
       2. the equation Q = p₁⋯pₖ + 1 = …;
       3. its factorization (or “… is itself prime”);
       4. the dial of the least prime factor of Q, hand on 0 (its number moves into the caption when it does not fit).
     The free part of the canvas runs from under the shown HUD title and scene chips to above the shown legend and any
     later block of the page laid over the canvas (hudFree). The bands are stacked top to bottom, each separated from the
     next by z.bandGap ('stack'). Only if no stacked arrangement fits under the minimums z do the dials take a left column
     with bands 2–4 stacked in a right column beside them, z.colGap apart ('split'). Every string is measured with
     measureText and set at the largest size, up to its scale, that fits the width; nothing is clipped, hidden or
     abbreviated beyond eqLine. Of all scales the layout takes the one whose weaker part (dial radius against PR.rRef,
     text and least-prime dial against full size) is largest, then the caption under that dial, then larger dials. If
     nothing fits at the PR minimums, all minimums shrink together by the largest t ≥ PR.tMin that fits (text never
     below PR.textFloor px); if even that fails, the stack at t = PR.tMin is pinned under the HUD (fallback).
     ESCAPE_DEBUG.prime reports the box of every band and the separation of every pair of bands (canvas CSS px). */
  const PR = { rMin: 14, rMax: 74, rRef: 40, numMin: 9, cap: 11, capGap: 7, tick: 3, eq: 18, fac: 16, eqMin: 11, facMin: 10, lpf: 36, lpfMin: 14,
    margin: 10, hudGap: 8, bandGap: 10, colGap: 18, gx: 8, gy: 6, emptyFont: 13, emptyMin: 10, textFloor: 7, tMin: 0.3, t: 1 };
  const PR_SCALES = [1, 0.92, 0.84, 0.76, 0.68, 0.6, 0.52, 0.45, 0.4];
  /** The minimums shrunk together by t; no text below PR.textFloor px, no band gap below 4 px. */
  const shrunk = (t) => Object.assign({}, PR, { t, rMin: PR.rMin * t, lpfMin: PR.lpfMin * t, numMin: Math.max(PR.textFloor - 1, PR.numMin * t),
    cap: Math.max(PR.textFloor, PR.cap * t), capGap: PR.capGap * t, eqMin: Math.max(PR.textFloor, PR.eqMin * t), facMin: Math.max(PR.textFloor, PR.facMin * t),
    emptyMin: Math.max(PR.textFloor, PR.emptyMin * t), bandGap: Math.max(4, PR.bandGap * t), colGap: Math.max(8, PR.colGap * t), gx: PR.gx * t, gy: PR.gy * t });
  let primeLast = null;
  const fontOf = (px, w, fam) => `${w || 400} ${px}px ${fam || TRV.fonts.data}`;
  const dataFont = (px, w) => fontOf(px, w);
  const inkCache = new Map();
  /** The measured ink of one string set left-aligned on an alphabetic baseline: advance w, ink from x0 to x1 (ew wide)
      relative to the start, asc above and desc below the baseline. Cached for one layout. */
  function ink(c, s, px, w, fam) {
    const key = `${w || 400}|${px}|${fam || ''}|${s}`;
    if (inkCache.has(key)) return inkCache.get(key);
    c.font = fontOf(px, w, fam); c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    const m = c.measureText(s), fin = (v) => Number.isFinite(v);
    const x0 = Math.min(0, fin(m.actualBoundingBoxLeft) ? -m.actualBoundingBoxLeft : 0), x1 = Math.max(m.width, fin(m.actualBoundingBoxRight) ? m.actualBoundingBoxRight : m.width);
    const v = { w: m.width, x0, x1, ew: x1 - x0, asc: fin(m.actualBoundingBoxAscent) && m.actualBoundingBoxAscent > 0 ? m.actualBoundingBoxAscent : px * 0.8,
      desc: fin(m.actualBoundingBoxDescent) ? Math.max(0, m.actualBoundingBoxDescent) : px * 0.25 };
    inkCache.set(key, v);
    return v;
  }
  /** The largest size from px down to min (1 px steps) at which s is at most maxW wide; null if not even min fits,
      unless `force`, which returns min anyway (the pinned fallback). */
  function fitText(c, s, px, min, maxW, w, fam, force) {
    px = Math.max(min, px);
    let m = ink(c, s, px, w, fam);
    while (m.ew > maxW && px > min) { px = Math.max(min, px - 1); m = ink(c, s, px, w, fam); }
    return m.ew <= maxW || force ? { px, m, fits: m.ew <= maxW } : null;
  }
  /** One dial of radius r for the prime p under the minimums z: its number inside when it fits at ≥ z.numMin px, else in
      the caption; the caption (remainder) under the dial, or on its right with `beside`. Extents run from the centre. */
  function dialSpec(c, z, r, p, rem, beside) {
    const label = String(p), inner = (w) => Math.max(r * 0.36, Math.min(r * 0.55, w / 2 + 3));
    let f = Math.max(z.numMin, Math.round(r * 0.36)), t = ink(c, label, f, 600);
    while (t.ew + 4 > 2 * inner(t.ew) && f > z.numMin) { f = Math.max(z.numMin, f - 1); t = ink(c, label, f, 600); }
    const inside = t.ew + 4 <= 2 * inner(t.ew), cap = `${inside ? '' : `${label} · `}${L('余', 'rem')} ${rem}`, m = ink(c, cap, z.cap), capH = m.asc + m.desc;
    const d = { r, p, rem, f: inside ? f : 0, inner: inside ? inner(t.ew) : r * 0.36, cap, capFont: z.cap, capGap: z.capGap, capAsc: m.asc, capDesc: m.desc, capW: m.ew, capX0: m.x0, capX1: m.x1, beside: !!beside };
    if (beside) return Object.assign(d, { up: Math.max(r + PR.tick, capH / 2), down: Math.max(r + PR.tick, capH / 2), left: r + PR.tick, right: r + PR.tick + z.capGap + m.ew });
    const half = Math.max(r + PR.tick, m.ew / 2);
    return Object.assign(d, { up: r + PR.tick, down: r + z.capGap + capH, left: half, right: half });
  }
  /** The free part of the canvas (CSS px): below the shown HUD title and chips, above the shown legend and above any
      later block of the page (plots, tour, rail) that is laid over the canvas, as hit-testing at its top edge shows. */
  function hudFree(H) {
    const stage = $('stage'), cv = $('cv').getBoundingClientRect(), shown = (el) => {
      if (!el || !el.textContent.trim()) return null;
      const r = el.getBoundingClientRect(), st = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && st.opacity !== '0' && st.visibility !== 'hidden' ? r : null;
    };
    let top = PR.margin, bottom = H - PR.margin;
    for (const el of [document.querySelector('#stage .hud-tl'), $('sceneChips')]) { const r = shown(el); if (r) top = Math.max(top, r.bottom - cv.top + PR.hudGap); }
    const lg = shown($('legend')); if (lg) bottom = Math.min(bottom, lg.top - cv.top - PR.hudGap);
    for (const el of [...stage.parentElement.children, $('rail')]) {
      if (!el || el === stage) continue;
      const r = el.getBoundingClientRect();
      if (!(r.width > 0 && r.height > 0) || r.top <= cv.top || r.top >= cv.bottom || r.right <= cv.left || r.left >= cv.right) continue;
      const hit = document.elementFromPoint((Math.max(r.left, cv.left) + Math.min(r.right, cv.right)) / 2, Math.min(r.top + 2, cv.bottom - 1));
      if (hit && stage.contains(hit)) continue;   // the stage is on top there (a still or a cover is fixed over the page)
      bottom = Math.min(bottom, r.top - cv.top - PR.hudGap);
    }
    return { top, bottom };
  }
  /** Q = p₁⋯pₖ + 1 and its factorization, as drawn. */
  const eqLine = (k) => `Q = ${k > 7 ? `p₁⋯p${k < 10 ? '₀₁₂₃₄₅₆₇₈₉'[k] : '₁' + '₀₁₂₃₄₅₆₇₈₉'[k - 10]}` : (k ? PRIMES.slice(0, k).join('·') : '1')} + 1 = ${EUCLID[k].Q}`;
  const facLine = (k) => { const E = EUCLID[k]; return E.factors.length === 1 ? L(`${E.Q} 本身是素数`, `${E.Q} is itself prime`) : `= ${E.factors.join(' × ')}`; };
  const emptyLine = () => L('清单是空的：空乘积是 1', 'The list is empty: the empty product is 1');
  /** Bands 2–4 at scale s under the minimums z, each at most maxW wide: Q, its factorization, the least-prime dial.
      h is their stacked height with z.bandGap between neighbours. */
  function primeText(c, z, k, s, maxW, beside, force) {
    const E = EUCLID[k], eqS = eqLine(k), facS = facLine(k);
    const lpf = dialSpec(c, z, Math.max(z.lpfMin, PR.lpf * s * z.t), E.factors[0], 0, beside);
    if (lpf.left + lpf.right > maxW && !force) return null;
    const e = fitText(c, eqS, Math.round(PR.eq * s * z.t), z.eqMin, maxW, 600, null, force), f = fitText(c, facS, Math.round(PR.fac * s * z.t), z.facMin, maxW, 600, null, force);
    if (!e || !f) return null;
    const hE = e.m.asc + e.m.desc, hF = f.m.asc + f.m.desc, hL = lpf.up + lpf.down;
    return { s, beside: !!beside, eqS, facS, e, f, lpf, hE, hF, hL, w: Math.max(e.m.ew, f.m.ew, lpf.left + lpf.right), h: hE + z.bandGap + hF + z.bandGap + hL,
      score: Math.min(e.px / PR.eq, f.px / PR.fac, lpf.r / PR.lpf) };
  }
  /** The largest dial radius (and its columns) at which the k listed dials with their captions fit in gw × gh. */
  function primeGrid(c, z, k, gw, gh) {
    const E = EUCLID[k], ps = PRIMES.slice(0, k);
    let rLo = z.rMin;
    while (rLo < PR.rMax && ps.some((p) => !dialSpec(c, z, rLo, p, E.Q % p).f)) rLo = Math.min(PR.rMax, rLo + 0.5);
    const cap = ps.reduce((a, p) => { const m = ink(c, `${L('余', 'rem')} ${E.Q % p}`, z.cap); return { w: Math.max(a.w, m.ew), h: Math.max(a.h, m.asc + m.desc) }; }, { w: 0, h: 0 });
    const geo = (r) => ({ half: Math.max(r + PR.tick, cap.w / 2), up: r + PR.tick, down: r + z.capGap + cap.h, gx: Math.max(z.gx, r * 0.5 - 6), gy: Math.max(z.gy, r * 0.3) });
    const size = (cols, rows, r) => { const d = geo(r); return { w: cols * 2 * d.half + (cols - 1) * d.gx, h: rows * (d.up + d.down) + (rows - 1) * d.gy }; };
    let best = null;
    for (let cols = 1; cols <= k; cols++) {
      const rows = Math.ceil(k / cols), fits = (r) => { const sz = size(cols, rows, r); return sz.w <= gw && sz.h <= gh; };
      if (!fits(rLo)) continue;
      let lo = rLo, hi = PR.rMax;
      if (fits(hi)) lo = hi; else for (let i = 0; i < 20; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
      if (!best || lo > best.r + 0.5 || (Math.abs(lo - best.r) <= 0.5 && rows < best.rows)) best = { cols, rows, r: lo };
    }
    return { best, rLo, geo, size };
  }
  /** Band 1 in gw × gh under the minimums z: the dial grid with the largest radius, or the empty-list sentence. With
      `force`, the smallest grid that is no wider than gw (or the sentence at its minimum size), whatever its height. */
  function primeDials(c, z, k, gw, gh, force) {
    if (!k) {
      const t = fitText(c, emptyLine(), Math.round(PR.emptyFont * z.t), z.emptyMin, gw, 400, TRV.fonts.body, force);
      if (!t || (t.m.asc + t.m.desc > gh && !force)) return null;
      return { t, r: null, cols: 0, rows: 0, w: t.m.ew, h: t.m.asc + t.m.desc, score: t.px / PR.emptyFont };
    }
    const G = primeGrid(c, z, k, gw, gh);
    let r, cols;
    if (G.best) ({ r, cols } = G.best);
    else if (force) { r = G.rLo; cols = k; while (cols > 1 && G.size(cols, Math.ceil(k / cols), r).w > gw) cols--; }
    else return null;
    const rows = Math.ceil(k / cols), sz = G.size(cols, rows, r);
    return { G, r, cols, rows, w: sz.w, h: sz.h, score: r / PR.rRef };
  }
  /** The best arrangement under the minimums z, or ok: false when none fits. */
  function primePlan(c, z, k, W, free) {
    const aw = W - 2 * PR.margin, ah = free.bottom - free.top, stack = [], split = [];
    const narrowest = k ? 2 * Math.max(z.rMin + PR.tick, ink(c, `${L('余', 'rem')} 1`, z.cap).ew / 2) : ink(c, emptyLine(), z.emptyMin, 400, TRV.fonts.body).ew;
    for (const s of PR_SCALES) for (const beside of [false, true]) {
      const T = primeText(c, z, k, s, aw, beside);
      if (T) { const D = primeDials(c, z, k, aw, ah - T.h - z.bandGap); if (D) stack.push({ mode: 'stack', T, D, score: Math.min(T.score, D.score) }); }
      if (stack.length) continue;
      const T2 = primeText(c, z, k, s, aw - z.colGap - narrowest, beside);
      if (T2 && T2.h <= ah) { const D = primeDials(c, z, k, aw - z.colGap - T2.w, ah); if (D) split.push({ mode: 'split', T: T2, D, score: Math.min(T2.score, D.score) }); }
    }
    // better: a larger weaker part; then the caption under the least-prime dial; then larger dials
    const better = (x, a) => { const d = x.score - a.score; if (Math.abs(d) > 1e-9) return d > 0; if (x.T.beside !== a.T.beside) return !x.T.beside; return (x.D.r || 0) > (a.D.r || 0) + 1e-9; };
    const pool = stack.length ? stack : split;
    return pool.length ? { ok: true, z, pick: pool.reduce((a, x) => (better(x, a) ? x : a)) } : { ok: false, z };
  }
  function primeLayout(c, W, H, k) {
    inkCache.clear();
    const free = hudFree(H), aw = W - 2 * PR.margin, ah = free.bottom - free.top;
    let plan = primePlan(c, PR, k, W, free), fallback = false;
    if (!plan.ok) {
      let lo = PR.tMin, hi = 1;
      const low = primePlan(c, shrunk(lo), k, W, free);
      if (low.ok) { plan = low; for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2, p = primePlan(c, shrunk(mid), k, W, free); if (p.ok) { lo = mid; plan = p; } else hi = mid; } }
    }
    if (!plan.ok) {   // nothing fits even shrunk: the most compact stack, pinned under the HUD
      const z = shrunk(PR.tMin), sMin = PR_SCALES[PR_SCALES.length - 1];
      const T = primeText(c, z, k, sMin, aw, true, true), D = primeDials(c, z, k, aw, ah - T.h - z.bandGap, true);
      plan = { ok: false, z, pick: { mode: 'stack', T, D, score: Math.min(T.score, D.score) } };
      fallback = true;
    }
    const z = plan.z, { mode, T, D } = plan.pick, gap = z.bandGap;
    // where the bands go: one centred column ('stack'), or the dials beside a column of bands 2–4 ('split')
    let dc, dTop, tc, tTop;
    if (mode === 'stack') {
      const total = D.h + gap + T.h, top = free.top + Math.max(0, (ah - total) / 2);
      dc = W / 2; dTop = top; tc = W / 2; tTop = top + D.h + gap;
    } else {
      const left = (W - (D.w + z.colGap + T.w)) / 2;
      dc = left + D.w / 2; dTop = free.top + Math.max(0, (ah - D.h) / 2);
      tc = left + D.w + z.colGap + T.w / 2; tTop = free.top + Math.max(0, (ah - T.h) / 2);
    }
    // band 1: the listed dials, or the sentence about the empty list
    const dials = [];
    let empty = null;
    if (k) {
      const d = D.G.geo(D.r);
      for (let i = 0; i < k; i++) {
        const row = Math.floor(i / D.cols), col = i % D.cols, n = Math.min(D.cols, k - row * D.cols), p = PRIMES[i];
        const x = dc + (col - (n - 1) / 2) * (2 * d.half + d.gx), y = dTop + d.up + row * (d.up + d.down + d.gy), spec = dialSpec(c, z, D.r, p, EUCLID[k].Q % p);
        dials.push({ x, y, spec, box: [x - spec.left, y - spec.up, x + spec.right, y + spec.down] });
      }
    } else {
      const m = D.t.m, start = dc - (m.x0 + m.x1) / 2, base = dTop + m.asc;
      empty = { text: emptyLine(), font: fontOf(D.t.px, 400, TRV.fonts.body), px: D.t.px, x: dc, start, base, box: [start + m.x0, base - m.asc, start + m.x1, base + m.desc] };
    }
    const union = (bs) => bs.reduce((a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])]);
    const gridBox = k ? union(dials.map((d) => d.box)) : empty.box;
    // bands 2–4: Q, its factorization, the least-prime dial, top to bottom
    const line = (str, fit, top) => { const m = fit.m, start = tc - (m.x0 + m.x1) / 2, base = top + m.asc; return { text: str, x: tc, start, base, font: fit.px, box: [start + m.x0, base - m.asc, start + m.x1, base + m.desc] }; };
    const eq = line(T.eqS, T.e, tTop), fac = line(T.facS, T.f, tTop + T.hE + gap);
    const lTop = tTop + T.hE + gap + T.hF + gap, lx = tc - (T.lpf.left + T.lpf.right) / 2 + T.lpf.left, ly = lTop + T.lpf.up;
    const lpf = { x: lx, y: ly, spec: T.lpf, box: [lx - T.lpf.left, ly - T.lpf.up, lx + T.lpf.right, ly + T.lpf.down] };
    // separation of two boxes: positive iff they are disjoint (the larger of the horizontal and the vertical clearance)
    const sep = (a, b) => Math.max(b[0] - a[2], a[0] - b[2], b[1] - a[3], a[1] - b[3]);
    const bands = { dials: gridBox, eq: eq.box, fac: fac.box, lpf: lpf.box }, names = Object.keys(bands), pairs = {};
    for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) pairs[`${names[i]}|${names[j]}`] = sep(bands[names[i]], bands[names[j]]);
    return { W, H, k, primes: PRIMES.length, free, fallback, shrink: z.t, mode, scale: T.s, eqFont: T.e.px, facFont: T.f.px, r: k ? D.r : null, lpfR: T.lpf.r,
      cols: D.cols, rows: D.rows, dials, empty, gridBox, eq, fac, lpf, bands, pairs, bandGap: gap,
      gaps: { gridToBand: sep(gridBox, union([eq.box, fac.box, lpf.box])), eqToFac: sep(eq.box, fac.box), textToLpf: sep(union([eq.box, fac.box]), lpf.box), min: Math.min(...Object.values(pairs)) } };
  }

  function drawPrime(g) {
    const c = g.ctx, W = g.W, H = g.H, k = step(), E = EUCLID[k], q = E.factors[0];
    // the HUD text first: its measured box is part of the layout
    $('hudBig').textContent = L(`清单里有 ${k} 个素数`, `${k} PRIME${k === 1 ? '' : 'S'} ON THE LIST`);
    $('hudSub').textContent = L(`每只钟的指针都指着 1，没有一只指着红色的 0；Q 的最小素因子 ${q} 不在清单里`, `Every hand points at 1 and none at the red 0; the least prime factor ${q} of Q is not on the list`);
    const Lay = primeLayout(c, W, H, k);
    primeLast = Lay;
    const dial = (x, y, d, col) => {
      const rad = d.r, p = d.p, rem = d.rem;
      c.strokeStyle = TRV.alpha(col, 0.55); c.lineWidth = 1.2; c.beginPath(); c.arc(x, y, rad, 0, kit.TAU); c.stroke();
      if (p <= 64) for (let t = 0; t < p; t++) { const a = -Math.PI / 2 + kit.TAU * t / p; c.fillStyle = t === 0 ? P.warn : TRV.alpha(col, 0.7); c.beginPath(); c.arc(x + rad * Math.cos(a), y + rad * Math.sin(a), t === 0 ? 3 : 1.8, 0, kit.TAU); c.fill(); }
      else { c.fillStyle = P.warn; c.beginPath(); c.arc(x, y - rad, 3, 0, kit.TAU); c.fill(); }
      const a = -Math.PI / 2 + kit.TAU * rem / p; c.save(); c.shadowColor = col; c.shadowBlur = 8; c.strokeStyle = col; c.lineWidth = 2.2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + rad * 0.86 * Math.cos(a), y + rad * 0.86 * Math.sin(a)); c.stroke(); c.restore();
      c.fillStyle = P.void; c.beginPath(); c.arc(x, y, d.inner, 0, kit.TAU); c.fill();
      c.textAlign = 'center';
      if (d.f) { c.fillStyle = col; c.font = dataFont(d.f, 600); c.textBaseline = 'middle'; c.fillText(String(p), x, y + 1); }
      c.fillStyle = rem === 0 ? P.magenta : P.dim; c.font = dataFont(d.capFont); c.textBaseline = 'alphabetic';
      if (d.beside) { c.textAlign = 'left'; c.fillText(d.cap, x + rad + PR.tick + d.capGap - d.capX0, y + (d.capAsc - d.capDesc) / 2); } else { c.textAlign = 'left'; c.fillText(d.cap, x - (d.capX0 + d.capX1) / 2, y + rad + d.capGap + d.capAsc); }
    };
    for (const d of Lay.dials) dial(d.x, d.y, d.spec, P.cyan);
    c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    if (Lay.empty) { c.fillStyle = P.dim; c.font = Lay.empty.font; c.fillText(Lay.empty.text, Lay.empty.start, Lay.empty.base); }
    // Q, then its factorization, then the least prime factor on its own dial, hand on 0
    c.fillStyle = P.ink; c.font = dataFont(Lay.eq.font, 600); c.fillText(Lay.eq.text, Lay.eq.start, Lay.eq.base);
    c.fillStyle = P.magenta; c.font = dataFont(Lay.fac.font, 600); c.fillText(Lay.fac.text, Lay.fac.start, Lay.fac.base);
    dial(Lay.lpf.x, Lay.lpf.y, Lay.lpf.spec, P.magenta);
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
    } else if (S.scene === 'fiber') {
      const code = S.lat.reduce((v, b) => v * 2 + b, 0), maxP = Math.max(...ALLLAT.map((x) => x.pairs.length));
      const g = kit.plot(A, { x: [-0.6, 15.6], y: [0, maxP + 0.6], pad: [30, 10, 10, 22] });
      g.axes({ yTicks: [0, 1, maxP], xTicks: [[0, '0000'], [5, '0101'], [10, '1010'], [15, '1111']] });
      ALLLAT.forEach((x, i) => g.rect(i - 0.32, 0, i + 0.32, x.pairs.length, P.magenta, { alpha: i === code ? 0.95 : 0.45 }));
      g.hline(1, P.dim, { dash: [4, 3] }); g.vline(code, P.amber, { alpha: 0.7 });
      $('pATitle').textContent = L('16 种潜坐标，亏损点对', 'Deficit pairs, all 16 latents'); $('pAMeta').textContent = `min ${Math.min(...ALLLAT.map((x) => x.pairs.length))} ≥ 1`;
      const g2 = kit.plot(B, { x: [-0.6, 15.6], y: [0, 4.6], pad: [30, 10, 10, 22] });
      g2.axes({ yTicks: [1, 2, 3, 4], xTicks: [[0, '0000'], [5, '0101'], [10, '1010'], [15, '1111']] });
      ALLLAT.forEach((x, i) => { g2.rect(i - 0.34, 0, i - 0.02, x.before, P.cyan, { alpha: i === code ? 0.95 : 0.5 }); g2.rect(i + 0.02, 0, i + 0.34, x.after, P.violet, { alpha: i === code ? 0.95 : 0.5 }); });
      g2.vline(code, P.amber, { alpha: 0.7 });
      g2.legend([[P.cyan, L('只看 latent', 'latent alone')], [P.violet, L('并入 g 之后', 'with g adjoined')]], { right: false });
      $('pBTitle').textContent = L('块数：并入前后', 'Blocks before and after'); $('pBMeta').textContent = `${ALLLAT[code].before} → ${ALLLAT[code].after}`;
    } else if (S.scene === 'ptr') {
      const N = S.pN, cc = pointer(N, S.shape), l = ell(), ys = [], bs = [];
      for (let j = 1; j <= N; j++) { ys.push([j, Math.abs(gamma(cc, j))]); bs.push([j - 0.5, apothem(N, j)], [j + 0.5, apothem(N, j)]); }
      const g = kit.plot(A, { x: [0.4, N + 0.6], y: [0, 1.05], pad: [34, 10, 10, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [1, Math.ceil(N / 2), N] });
      g.hline(1, P.sigma, { dash: [2, 3] }); g.line(bs, P.cyan, { dash: [5, 3] }); ys.forEach((p) => g.dot(p[0], p[1], p[0] === l ? P.amber : P.magenta, p[0] === l ? 4.5 : 3));
      g.legend([[P.magenta, '|γ(ℓ)|'], [P.cyan, 'cos(π/(⌊N/ℓ⌋ + 2))', 'dash']], { right: false });
      $('pATitle').textContent = L('每个平移的重叠与它的界', 'Overlap at every shift, and its bound'); $('pAMeta').textContent = `ℓ = ${l}`;
      const g2 = kit.plot(B, { x: [1, 40], y: [1e-4, 1], logY: true, pad: [42, 10, 10, 22] });
      g2.axes({ yTicks: [[1, '1'], [0.1, '0.1'], [0.01, '0.01'], [1e-3, '10⁻³']], xTicks: [1, 10, 20, 30, 40] });
      const eb = []; for (let M = 1; M <= 40; M++) eb.push([M, (1 - Math.cos(Math.PI / (M + 2))) / 2]);
      g2.line(eb, P.magenta); g2.dot(N, (1 - Math.cos(Math.PI / (N + 2))) / 2, P.amber, 4.5);
      $('pBTitle').textContent = L('指针越长，误差下界越小', 'Longer pointer, smaller error floor'); $('pBMeta').textContent = `ℓ = 1, N = ${N}`;
    } else if (S.scene === 'poly') {
      const g = kit.plot(A, { x: [0, 12], y: [1e-10, 1], logY: true, pad: [42, 24, 10, 22] });
      g.axes({ yTicks: [[1, '1'], [1e-3, '10⁻³'], [1e-6, '10⁻⁶'], [1e-9, '10⁻⁹']], xTicks: [[0, '6'], [2, '24'], [4, '96'], [6, '384'], [8, '1536'], [10, '6144'], [12, '24576']] });
      const a = [], b = []; for (let j = 0; j <= 12; j++) { a.push([j, gap(sides(j))]); b.push([j, piDeficit(sides(j))]); }
      g.line(a, P.magenta); g.line(b, P.cyan, { dash: [5, 3] }); a.forEach((p) => g.dot(p[0], p[1], P.magenta, 2.5)); g.vline(k, P.amber); g.dot(k, gap(sides(k)), P.magenta, 4.5);
      g.legend([[P.magenta, L('缝 1 − cos(π/n)', 'gap 1 − cos(π/n)')], [P.cyan, L('π − 半周长', 'π − half-perimeter'), 'dash']]);
      $('pATitle').textContent = L('边数翻倍，缝还剩多少', 'The gap as the sides double'); $('pAMeta').textContent = `n = ${sides(k)}`;
      // the y range holds remainder and bound for every supported θ and m: down to ≈ 4×10⁻³³ at θ = 0.2, m = 10
      const g2 = kit.plot(B, { x: [1, 10], y: [1e-34, 100], logY: true, pad: [42, 10, 10, 22] });
      g2.axes({ yTicks: [[1, '1'], [1e-10, '10⁻¹⁰'], [1e-20, '10⁻²⁰'], [1e-30, '10⁻³⁰']], xTicks: [1, 2, 4, 6, 8, 10] });
      const act = [], bnd = []; for (let m = 1; m <= 10; m++) { const t = taylor(S.tpoint, m); act.push(t.actual > 0 ? [m, t.actual] : null); bnd.push([m, t.bound]); }
      taylorLast = { theta: S.tpoint, y: [g2.y0, g2.y1], actual: act.map((p) => p && p[1]), bound: bnd.map((p) => p[1]) };
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
      $('roKey').innerHTML = L(`差 ${Math.min(...hd)} 位`, `${Math.min(...hd)} bit${Math.min(...hd) === 1 ? '' : 's'} apart`) + ' <span class="chk">≥ 1 ✓</span>';
      $('roKeySub').textContent = L('第 k 行至少在第 k 位与 d 不同', 'row k differs from d at least in place k');
      set(1, L('清单', 'the list'), L(`${N} 行`, `${N} rows`)); set(2, L('逃出的串 d', 'the escaped string d'), k >= N ? d.join('') : d.slice(0, k).join('') + '·'.repeat(N - k));
      set(3, L('全部串', 'all strings'), `2^${N} = ${1 << N}`); set(4, L('清单之外', 'off the list'), `${(1 << N) - distinct}`);
      $('roNote').textContent = N < 10 ? L('“把 d 收进清单”会多出一行和一列，新的对角线又翻出一个清单外的串。', '“Put d on the list” adds a row and a column, and the new diagonal again produces a string that is off the list.') : L('N = 10 是本页的上限；道理对任何 N 都一样。', 'N = 10 is the limit of this page; the argument is the same for every N.');
      pill = `${(1 << N) - distinct}`;
    } else if (S.scene === 'fiber') {
      const F = fiberFacts(S.lat);
      $('roKeyL').textContent = L('同一纤维里 g 不同的点对', 'pairs in one fibre that g separates');
      $('roKey').innerHTML = `${F.pairs.length} <span class="chk">≥ 1 ✓</span>`;
      $('roKeySub').textContent = F.pairs.map(([a, b]) => `(a${SUB[a]}, a${SUB[b]})`).join(' ');
      set(1, 'latent(a₀ … a₃)', S.lat.join('')); set(2, L('对角线 g', 'diagonal g'), F.g.join(''));
      set(3, L('块数：并入 g 前 → 后', 'blocks: before → after g'), `${F.before} → ${F.after}`); set(4, L('16 种 latent 中被劈开的', 'latents split, of 16'), `${ALLLAT.filter((x) => x.pairs.length > 0).length} / 16`);
      $('roNote').textContent = L('四个解码器恰好是 {0, 1} 到 {0, 1} 的全部四个映射，目录是满射；所以无论怎么排潜坐标，对角线都劈开某根纤维。', 'The four decoders are exactly the four maps {0, 1} → {0, 1}, so the catalog is surjective; however the latent coordinates are arranged, the diagonal splits some fibre.');
      pill = String(F.pairs.length);
    } else if (S.scene === 'ptr') {
      const N = S.pN, l = ell(), gm = Math.abs(gamma(pointer(N, S.shape), l)), ap = apothem(N, l);
      $('roKeyL').textContent = L('平移 ℓ 格后与自己的重叠', 'overlap with itself after a shift of ℓ');
      $('roKey').innerHTML = `${gm.toFixed(4)} <span class="chk">≤ ${ap.toFixed(4)} &lt; 1 ✓</span>`; $('roKeySub').textContent = `|γ(ℓ)| ≤ cos(π/(⌊N/ℓ⌋ + 2))`;
      set(1, L('指针格数 N + 1', 'pointer cells N + 1'), String(N + 1)); set(2, L('平移 ℓ', 'shift ℓ'), String(l));
      set(3, L('多边形边数 ⌊N/ℓ⌋ + 2', 'polygon sides ⌊N/ℓ⌋ + 2'), String(Math.floor(N / l) + 2)); set(4, L('不可恢复误差至少', 'unrecoverable error at least'), sci((1 - ap) / 2));
      $('roNote').textContent = S.shape === 'sine' && l === 1 ? L('正弦形的指针在 ℓ = 1 恰好贴到边心距：界取得到，却仍小于 1。', 'The sine-shaped pointer meets the apothem exactly at ℓ = 1: the bound is attained, and it is still below 1.')
        : L('换形状、换长度都推不过多边形那条边；有限格的指针一平移就留下痕迹。', 'No shape and no length pushes past the side of the polygon; a finite pointer always leaves a trace when it is shifted.');
      pill = sci((1 - ap) / 2);
    } else if (S.scene === 'poly') {
      const n = sides(k);
      $('roKeyL').textContent = L('边的中点到圆弧的缝', 'gap between a side and the arc');
      $('roKey').innerHTML = `${sci(gap(n))} <span class="chk">&gt; 0 ✓</span>`; $('roKeySub').textContent = '1 − cos(π/n) = 2 sin²(π/2n)';
      set(1, L('边数 n', 'sides n'), String(n)); set(2, L('半周长 n sin(π/n)', 'half-perimeter n sin(π/n)'), halfPerimeter(n).toFixed(10));
      set(3, L('π − 半周长', 'π − half-perimeter'), sci(piDeficit(n))); set(4, L('每翻一倍，缝缩到', 'each doubling shrinks the gap to'), k < 12 ? `${fix(gap(sides(k + 1)) / gap(n), 4)}` : '—');
      $('roNote').textContent = L('刘徽由 192 边形的面积（等于 96 边形的半周长）得 3.1410，祖冲之算到 24576 边得 3.1415926。每翻一倍，缝大约缩到四分之一，却从不为零。', 'Liu Hui got 3.1410 from the area of the 192-gon (which equals the half-perimeter of the 96-gon), and Zu Chongzhi 3.1415926 with 24576 sides. Each doubling shrinks the gap to about a quarter, and it is never zero.');
      pill = sci(gap(n));
    } else if (S.scene === 'cos') {
      const xs = orbit(S.x0), res = Math.abs(Math.cos(xs[k]) - xs[k]);
      $('roKeyL').textContent = L('这一步离不动点还差', 'still to go at this step');
      $('roKey').innerHTML = `${sci(res)} <span class="chk">${res > 0 ? '&gt; 0 ✓' : ''}</span>`; $('roKeySub').textContent = '|cos xₖ − xₖ|';
      set(1, `x${k < 10 ? '₀₁₂₃₄₅₆₇₈₉'[k] : 'ₖ'}`, xs[k].toFixed(12)); set(2, L('不动点 x*', 'fixed point x*'), XSTAR.toFixed(12));
      set(3, L('每步误差约乘以', 'error factor per step'), k > 0 && Math.abs(xs[k - 1] - XSTAR) > 1e-13 ? fix(Math.abs(xs[k] - XSTAR) / Math.abs(xs[k - 1] - XSTAR), 4) : '—'); set(4, 'sin x*', Math.sin(XSTAR).toFixed(4));
      $('roNote').textContent = L('误差按等比缩小：再走多少步都只是乘上一个小于 1 的数，不会变成零。', 'The error shrinks geometrically: however many more steps, it is only multiplied by a number below 1 and never becomes zero.');
      pill = sci(res);
    } else {
      const E = EUCLID[k];
      $('roKeyL').textContent = L('Q 的最小素因子', 'least prime factor of Q');
      $('roKey').innerHTML = `${E.factors[0]} <span class="chk">${L('不在清单里', 'not on the list')} ✓</span>`; $('roKeySub').textContent = E.factors.length === 1 ? L('Q 本身是素数', 'Q is itself prime') : `Q = ${E.factors.join(' × ')}`;
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
      fiber: [['box cy', '纤维：latent 相同', 'fibre: same latent'], ['mg', 'g 不同的一对', 'a pair g separates'], ['vi', '新轴 g', 'the new axis g'], ['am', '正在读的地址', 'address being read']],
      ptr: [['box cy', '指针的振幅', 'pointer amplitudes'], ['box mg', '平移 ℓ 格的副本', 'the copy shifted by ℓ'], ['am', '重叠 |γ(ℓ)|', 'overlap |γ(ℓ)|'], ['mg', '弓高', 'sagitta']],
      poly: [['dm', '圆', 'the circle'], ['cy', '内接多边形', 'the inscribed polygon'], ['box mg', '缝', 'the gap']],
      cos: [['cy', 'y = cos x', 'y = cos x'], ['am', '迭代走过的路', 'the path of the iteration'], ['mg', '不动点 x*', 'the fixed point x*']],
      prime: [['cy', '清单里的素数：余 1', 'listed primes: remainder 1'], ['mg', '新素数：余 0', 'the new prime: remainder 0'], ['wn', '刻度 0 = 整除', 'tick 0 = divides']]
    };
    const html = LEG[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  // readouts and legend first: the prime stage measures the legend it has to keep clear of
  const paint = kit.painter(() => {
    drawText();
    if (S.scene === 'cos') drawCos(); else { const g = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }); ({ diag: drawDiag, fiber: drawFiber, poly: drawPoly, ptr: drawPtr, prime: drawPrime })[S.scene](g); }
    drawPlots();
  }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 6, rate: 1.5, step: 1,
    format: (t, max) => (S.scene === 'ptr' ? `ℓ = ${Math.floor(t + 1e-9) + 1} <small>/ ${(max + 1).toFixed(0)}</small>` : `${L('步', 'step')} ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)}</small>`),
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
  function setLat(lat) { S.lat = lat.slice(); document.querySelectorAll('#latChips [data-a]').forEach((b) => { const a = +b.dataset.a; b.querySelector('b').textContent = String(S.lat[a]); }); paint(); }
  document.querySelectorAll('#latChips [data-a]').forEach((b) => b.addEventListener('click', () => { const lat = S.lat.slice(), a = +b.dataset.a; lat[a] = 1 - lat[a]; leave(); setLat(lat); }));
  $('nextLat').addEventListener('click', () => { const code = (S.lat.reduce((v, x) => v * 2 + x, 0) + 1) % 16; leave(); setLat(latOf(code)); });
  const fPN = kit.field($('plen'), { onInput: (v) => { S.pN = v; leave(); clock.setMax(S.pN - 1, true); clock.set(Math.min(clock.t, S.pN - 1)); paint(); } });
  const shapeChips = kit.chips($('shapeChips'), 'shape', (v) => { S.shape = v; leave(); paint(); });
  $('cv').addEventListener('click', (ev) => {
    if (S.scene === 'fiber') {
      const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, h = fiberHit.find((p) => Math.hypot(p.x - x, p.y - y) <= p.r);
      if (h) { const lat = S.lat.slice(); lat[h.a] = 1 - lat[h.a]; leave(); setLat(lat); }
      return;
    }
    if (S.scene !== 'diag' || !hit) return;
    const b = $('cv').getBoundingClientRect(), j = Math.floor((ev.clientX - b.left - hit.gx) / hit.s), i = Math.floor((ev.clientY - b.top - hit.gy) / hit.s);
    if (i >= 0 && i < hit.N && j >= 0 && j < hit.N) { S.rows[i][j] = 1 - S.rows[i][j]; leave(); paint(); }
  });
  kit.keys({ 1: () => { leave(); setScene('diag'); }, 2: () => { leave(); setScene('fiber'); }, 3: () => { leave(); setScene('poly'); }, 4: () => { leave(); setScene('ptr'); }, 5: () => { leave(); setScene('cos'); }, 6: () => { leave(); setScene('prime'); } });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    diagonal: ['清单有 6 行。逐行读对角线上的那一位并翻转，拼出 d。d 与第 k 行在第 k 位不同，所以它不是任何一行；右边的点阵里，与 d 相容的候选每步减半，最后剩下的那个不在清单上。', 'The list has 6 rows. Read the diagonal bit of each row and flip it to build d. d differs from row k in place k, so it is none of the rows; in the dot grid the candidates compatible with d halve at each step, and the one that remains is not on the list.'],
    split: ['四个地址，解码器是常零、恒等、取反、常一。潜坐标取 (0, 0, 0, 1)：每个地址读自己的坐标、喂自己的解码器、再翻转，得 g = (1, 1, 0, 0)。左边那根纤维里 a₀、a₁ 的 g 是 1，a₂ 的是 0，品红线连起 g 不同的两对；把 g 立成第二根轴，两块变成三块。点任一地址换它的潜坐标：16 种排法里品红线总在。', 'Four addresses whose decoders are constant 0, identity, negation and constant 1. With latent (0, 0, 0, 1) each address reads its own coordinate, feeds its own decoder and flips the result: g = (1, 1, 0, 0). In the left fibre a₀ and a₁ get g = 1 and a₂ gets 0, and magenta lines join the two pairs that g separates; raise g as a second axis and two blocks become three. Click any address to change its latent coordinate: in all 16 arrangements a magenta line remains.'],
    absorb: ['把逃走的 d 收进清单当第 7 行，再补一列让表保持方形。新的对角线立刻翻出另一个不在清单里的串。收编多少次都一样。', 'Take the escaped d onto the list as row 7 and add a column to keep the table square. The new diagonal at once flips out another string that is off the list. It is the same however often you absorb.'],
    pointer: ['一台 9 格的记录指针，振幅是正弦形（青色），品红的轮廓是它平移 ℓ = 1 格的副本。两者的重叠 |γ(1)| = 0.9511（琥珀色的点）恰好等于正 10 边形的边心距 cos(π/10)，却到不了圆上的 1；那段品红的弓高就是记不下又补不回的部分。拖时间轴加大 ℓ，多边形边数变少，界也随之降低。', 'A record pointer on 9 cells with sine-shaped amplitudes (cyan); the magenta outline is its copy shifted by ℓ = 1. Their overlap |γ(1)| = 0.9511 (the amber dot) equals the apothem cos(π/10) of the regular 10-gon exactly, and still falls short of the 1 on the circle; the magenta sagitta is what is neither recorded nor recoverable. Drag the rail to increase ℓ: the polygon loses sides and the bound drops.'],
    liuhui: ['刘徽从正 6 边形出发，每次把边数翻倍：6、12、24、48、96、192。多边形越来越像圆，放大镜里的缝却一直在。', 'Liu Hui started from the hexagon and doubled the sides each time: 6, 12, 24, 48, 96, 192. The polygon looks more and more like the circle, yet the gap in the magnifier is always there.'],
    zu: ['祖冲之算到 24576 边。肉眼早已分不出多边形和圆，缝只有 8×10⁻⁹，但把它放大十亿倍，它和第一步时一模一样。', 'Zu Chongzhi went to 24576 sides. The eye cannot tell polygon from circle any more and the gap is only 8×10⁻⁹, but magnified a billion times it looks exactly as it did at the first step.'],
    thirteen: ['2·3·5·7·11·13 + 1 = 30031 不是素数，它等于 59 × 509。欧几里得的论证没有说 Q 是素数，只说它的素因子都是新的。', '2·3·5·7·11·13 + 1 = 30031 is not prime: it is 59 × 509. Euclid\'s argument does not say that Q is prime, only that its prime factors are all new.']
  };
  // the cards that play by themselves, and the frame their still shows ('end': the last step of the rail)
  const PRESETS = { diagonal: { still: 'end' }, split: { still: 'end' }, absorb: { still: 'end' }, liuhui: { still: 5 } };
  const stillOf = (id) => (PRESETS[id].still === 'end' ? clock.max : PRESETS[id].still);
  let booting = true, stopAt = null;
  /** Start card `id`: `to` = where its story ends on the rail (null: the last step); a still shows the declared frame. */
  function run(sc, id, to) {
    setScene(sc, 0); if (to != null) clock.setMax(SC[sc].max(), true);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(stillOf(id)); return; }
    stopAt = to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  function applyPreset(id) {
    stopAt = null;
    if (id === 'diagonal' || id === 'absorb') { S.N = 6; S.seed = 11; fSize.set(6); fSeed.set(11); S.rows = makeList(6, 11); }
    if (id === 'diagonal') run('diag', id);
    else if (id === 'split') { setLat([0, 0, 0, 1]); run('fiber', id); }
    else if (id === 'pointer') { S.pN = 8; fPN.set(8); S.shape = 'sine'; shapeChips.set('sine', true); setScene('ptr', 0); }
    else if (id === 'absorb') { setScene('diag', 6); doAbsorb(true); if (TRV.still || (booting && !TRV.embed)) clock.set(stillOf(id)); else if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    else if (id === 'liuhui') run('poly', id, 5);
    else if (id === 'zu') setScene('poly', 12);
    else if (id === 'thirteen') setScene('prime', 6);
  }
  // Cited figures use a single sentence; the full laboratory keeps the detailed card notes.
  const FIGURE_NOTES = {
    "diagonal": ["翻转六行清单的对角位：所得 d 与第 k 行在第 k 位不同，因此不在清单中。", "Flip the six diagonal bits: d differs from row k at bit k, so d is absent from the list."],
    "split": ["四个地址各自解码再翻转，g = (1, 1, 0, 0) 将原来同纤维的地址分开。", "Decode and flip at each of four addresses: g = (1, 1, 0, 0) separates addresses in one old fibre."],
    "absorb": ["把 d 收作第七行并补一列：新对角线又产生一个清单外的串。", "Add d as row seven and a new column: the new diagonal produces another off-list string."],
    "pointer": ["九格正弦指针移一格：重叠 |γ(1)| = cos(π/10) ≈ 0.9511，严格小于 1。", "Shift the nine-cell sine pointer by one: overlap |γ(1)| = cos(π/10) ≈ 0.9511, strictly below 1."],
    "liuhui": ["从正六边形逐次倍边至 192 边：越来越像圆，放大后的弓高仍非零。", "Double the hexagon’s sides up to 192: it approaches the circle, but the magnified sagitta stays nonzero."],
    "zu": ["24576 边时弓高约 8×10⁻⁹；放大十亿倍，缝仍清晰可见。", "At 24576 sides the sagitta is about 8×10⁻⁹; magnified a billion times, the gap remains visible."],
    "thirteen": ["30031 = 59 × 509：欧几里得只保证出现新的素因子，不保证所得数为素数。", "30031 = 59 × 509: Euclid guarantees new prime factors, not that the constructed number is prime."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、改清单、拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, edit the list, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.ESCAPE_DEBUG = {
    get state() {
      const k = step(), d = dOf(S.rows), xs = orbit(S.x0);
      return { scene: S.scene, step: k, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, N: S.N, seed: S.seed, rows: S.rows.map((r) => r.join('')), d: d.join(''),
        hamming: S.rows.map((r) => hamming(r, d)), n: sides(Math.min(k, 12)), gap: gap(sides(Math.min(k, 12))), x0: S.x0, xk: xs[Math.min(k, KCOS)], xstar: XSTAR, zoom: S.zoom, euclid: EUCLID[Math.min(k, PRIMES.length)], tpoint: S.tpoint,
        lat: S.lat.join(''), fiber: fiberFacts(S.lat), pN: S.pN, shape: S.shape, ell: ell(), c: pointer(S.pN, S.shape), gammaAbs: Math.abs(gamma(pointer(S.pN, S.shape), ell())), bound: apothem(S.pN, ell()) };
    },
    /** The last prime-stage layout: free band, sizes, the box of every dial, of Q, its factorization and the least-prime-factor dial, and the gaps between the bands (canvas CSS px). */
    get prime() { return S.scene === 'prime' && primeLast ? JSON.parse(JSON.stringify(primeLast)) : null; },
    /** The last Taylor plot (polygon scene): θ, the y range, and the plotted remainder and bound for m = 1 … 10. */
    get taylorPlot() { return S.scene === 'poly' && taylorLast ? JSON.parse(JSON.stringify(taylorLast)) : null; },
    seek: (t) => { clock.pause(); clock.set(t); }, taylor, node: (a) => { const b = $('cv').getBoundingClientRect(), h = fiberHit[a]; return [b.left + h.x, b.top + h.y]; }, cell: (i, j) => { const b = $('cv').getBoundingClientRect(); return [b.left + hit.gx + (j + 0.5) * hit.s, b.top + hit.gy + (i + 0.5) * hit.s]; }
  };
  window.TRV_THUMB = () => { S.N = 8; S.seed = 5; S.rows = makeList(8, 5); setScene('diag', 8); paint.now(); };
  S.rows = makeList(S.N, S.seed); cards.pick(cards.initial('diagonal'));
  booting = false;
  paint();
})();
