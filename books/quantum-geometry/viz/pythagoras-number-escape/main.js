/* ORTHO//PYTHAGORAS: the ±1 seam, in three scenes.
   pell   convergents m/n of √d on the lattice: |m/n − √d| → 0 while m² − d·n² is a nonzero integer
   split  the circle a² + b² = p among the Gaussian integers: plane primes (p ≡ 1 mod 4) and line primes (p ≡ 3 mod 4)
   curve  points of y² = x³ − x (or y² = x³ − x + 1) over F_p: the ring of Legendre symbols χ_p(f(x)), a_p, Hasse's bound and the Frobenius cosine
   The rail is the convergent index (pell) or walks through the odd primes 3 … 97 (split, curve).
   Read-only probe for the browser suite: window.PYTHAGORAS_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DS = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30, 31, 33, 34, 35, 37];
  const sieve = (N) => { const s = new Uint8Array(N + 1), out = []; for (let i = 2; i <= N; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return out; };
  const ODD = sieve(97).slice(1), ALL = sieve(3000).slice(1);
  const S = { scene: 'pell', d: 2, curve: 'cm', sato: false };
  const sci = (x) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); return Math.abs(e) < 3 ? x.toPrecision(3) : `${m.toFixed(2)}×10${String(e).replace('-', '−').split('').map((c) => ({ '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }[c])).join('')}`; };
  const signed = (v) => (v > 0 ? '+' : '−') + String(v < 0 ? -v : v);

  /* ---------- pell: continued fraction of √d, exact ---------- */
  const KP = 14;
  function isqrt(n) { let x = BigInt(Math.floor(Math.sqrt(Number(n)))); while (x * x > n) x--; while ((x + 1n) * (x + 1n) <= n) x++; return x; }
  const pellCache = {};
  function pell(d) {
    if (pellCache[d]) return pellCache[d];
    const D = BigInt(d), a0 = isqrt(D), quot = [a0], list = [];
    let mm = 0n, den = 1n, a = a0, p1 = 1n, p0 = a0, q1 = 0n, q0 = 1n, period = 0;
    list.push({ k: 0, m: p0, n: q0, delta: p0 * p0 - D * q0 * q0 });
    for (let k = 1; k <= KP + 12; k++) {
      mm = den * a - mm; den = (D - mm * mm) / den; a = (a0 + mm) / den; quot.push(a);
      if (!period && a === 2n * a0) period = k;
      [p1, p0] = [p0, a * p0 + p1]; [q1, q0] = [q0, a * q0 + q1];
      if (k <= KP) list.push({ k, m: p0, n: q0, delta: p0 * p0 - D * q0 * q0 });
    }
    return (pellCache[d] = { d, list, quot: quot.map(Number), period, root: Math.sqrt(d) });
  }
  /** Least solution of m² − d·n² = −1, or null when the period is even (then none exists). */
  function negativePell(d) { const c = pell(d); if (c.period % 2 === 0) return null; const s = c.list.find((x) => x.delta === -1n); return s ? [s.m, s.n] : null; }
  const LUCAS = [[2, 0], [1, 1]]; for (let i = 2; i < 24; i++) LUCAS.push([LUCAS[i - 1][0] + LUCAS[i - 2][0], LUCAS[i - 1][1] + LUCAS[i - 2][1]]);   // (L_n, F_n)

  /* ---------- split: two squares, squares mod p ---------- */
  function twoSquares(p) { for (let a = 1; a * a < p; a += 2) { const b = Math.round(Math.sqrt(p - a * a)); if (b > 0 && a * a + b * b === p) return [a, b]; } return null; }   // a odd, b even
  const squaresMod = (p) => { const t = new Uint8Array(p); for (let x = 1; x < p; x++) t[(x * x) % p] = 1; return t; };
  const rootsOfMinusOne = (p) => { const out = []; for (let x = 1; x < p; x++) if ((x * x + 1) % p === 0) out.push(x); return out; };

  /* ---------- curve: points over F_p ---------- */
  const F = { cm: (x, p) => (((x * x) % p) * x - x + p) % p, gen: (x, p) => (((x * x) % p) * x - x + 1 + p) % p };
  const countCache = {};
  /** Number of points of the curve over F_p including the point at infinity, and a_p = p + 1 − #E. */
  function count(curve, p) {
    const key = curve + p; if (countCache[key]) return countCache[key];
    const sq = squaresMod(p); let n = 1;
    for (let x = 0; x < p; x++) { const v = F[curve](x, p); n += v === 0 ? 1 : sq[v] ? 2 : 0; }
    return (countCache[key] = { n, a: p + 1 - n, cos: (p + 1 - n) / (2 * Math.sqrt(p)) });
  }
  function points(curve, p) { const pts = []; for (let x = 0; x < p; x++) { const v = F[curve](x, p); for (let y = 0; y < p; y++) if ((y * y) % p === v) pts.push([x, y]); } return pts; }
  const BAD = { cm: [2], gen: [2, 23] };   // primes of bad reduction: Δ = −16(4a³ + 27b²) is 64 = 2⁶ and −368 = −2⁴·23
  const DISC = { cm: '64 = 2⁶', gen: '−368 = −2⁴·23' };
  const isBad = (curve, p) => BAD[curve].includes(p);
  /** The ring of spins: χ_p(f(x)) for x = 0 … p − 1, with χ the Legendre symbol (0 at a root of f). */
  function spins(curve, p) { const sq = squaresMod(p), out = []; for (let x = 0; x < p; x++) { const v = F[curve](x, p); out.push(v === 0 ? 0 : sq[v] ? 1 : -1); } return out; }
  /** The singular point of a curve with bad reduction at p: the double root of f with y = 0. */
  function singular(curve, p) { for (let x = 0; x < p; x++) { const d = ((3 * x * x - 1) % p + p) % p; if (F[curve](x, p) === 0 && d === 0) return [x, 0]; } return null; }

  /* ---------- scenes ---------- */
  const SC = {
    pell: { max: () => KP, rate: 0.9, start: () => 3, name: ['佩尔接缝', 'PELL'] },
    split: { max: () => ODD.length - 1, rate: 1.1, start: () => 4, name: ['线与面素数', 'SPLIT'] },
    curve: { max: () => ODD.length - 1, rate: 1.3, start: () => 4, name: ['模 p 数点', 'CURVE'] }
  };
  const step = () => Math.floor(clock.t + 1e-9), frac = () => clock.t - step();
  const prime = () => ODD[Math.min(step(), ODD.length - 1)];

  /** The width of the Pell view in n (it widens from one convergent to the next as the rail moves). */
  function viewN() {
    const C = pell(S.d), k = step(), f = frac(), span = (j) => Math.max(2.6, 1.32 * Number(C.list[j].n) + 0.8);
    return Math.exp(Math.log(span(k)) * (1 - f) + Math.log(span(Math.min(KP, k + 1))) * f);
  }
  const sub = (k) => String(k).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);

  function drawPell() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight, C = pell(S.d), k = step(), f = frac(), cur = C.list[k], wide = W > 640;
    const nmax = viewN(), mmax = C.root * nmax;
    const right = wide ? Math.round(W * 0.44) : 24, g = kit.plot(cv, { x: [0, nmax], y: [0, mmax], pad: [44, right, 84, 54] }), c = g.ctx;
    // lattice (while it is coarse enough to see), the line m = √d·n and the two hyperbolas m² − d·n² = ±1
    if (g.iw / nmax >= 7 && g.ih / mmax >= 7) for (let i = 0; i <= nmax; i++) for (let j = 0; j <= mmax; j++) g.dot(i, j, P.faint, 1.3);
    const hyp = (s) => { const pts = []; for (let i = 0; i <= 160; i++) { const n = nmax * i / 160, v = S.d * n * n + s; pts.push(v >= 0 ? [n, Math.sqrt(v)] : null); } return pts; };
    c.save(); c.beginPath(); c.rect(g.pl, g.pt, g.iw, g.ih); c.clip();
    if (S.d === 5) { g.line(hyp(4), P.sigma, { width: 1, alpha: 0.6, dash: [4, 4] }); g.line(hyp(-4), P.sigma, { width: 1, alpha: 0.6, dash: [4, 4] }); }
    g.line(hyp(1), P.cyan, { width: 1.3, alpha: 0.8 }); g.line(hyp(-1), P.magenta, { width: 1.3, alpha: 0.8 });
    g.line([[0, 0], [nmax, mmax]], P.sigma, { width: 1.6 });
    if (S.d === 5) for (const [l, fb] of LUCAS) if (fb <= nmax && l <= mmax) g.dot(fb, l, P.sigma, 6, { ring: true, width: 1.6 });
    for (let j = 0; j <= k; j++) { const q = C.list[j]; g.dot(Number(q.n), Number(q.m), q.delta > 0n ? P.cyan : P.magenta, j === k ? 5.5 : 3.6); }
    g.dot(Number(cur.n), Number(cur.m), P.amber, 10, { ring: true, width: 2, glow: 10 });
    c.restore();
    g.axes({ xTicks: [[0, '0'], [Number(cur.n), String(cur.n)]], yTicks: [[0, '0'], [Number(cur.m), String(cur.m)]] });
    g.text(nmax, 0, 'n', P.dim, { align: 'right', base: 'bottom', dx: -4, dy: -4 }); g.text(0, mmax, 'm', P.dim, { align: 'left', base: 'top', dx: 6, dy: 2 });
    g.text(nmax, mmax, `m = √${S.d}·n`, P.sigma, { align: 'right', base: 'top', dx: -8, dy: 16, size: 11.5 });
    // the area ledger: m² cells against d·n² cells, with a magnifier on their ends
    const led = cur;
    if (wide) {
      const x0 = W - right + 34, bw = right - 64, m2 = led.m * led.m, dn2 = BigInt(S.d) * led.n * led.n, big = m2 > dn2 ? m2 : dn2, y1 = Math.max(96, H * 0.24), bh = 18;
      const len = (v) => bw * Number(v) / Number(big);
      c.font = `12px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'bottom';
      c.fillStyle = P.cyan; c.fillText(`m² = ${led.m}² = ${m2}`, x0, y1 - 5); c.fillRect(x0, y1, len(m2), bh);
      c.fillStyle = P.magenta; c.fillText(`${S.d}·n² = ${S.d}·${led.n}² = ${dn2}`, x0, y1 + bh + 34); c.fillRect(x0, y1 + bh + 39, len(dn2), bh);
      const cs = Math.min(26, bw / 8.5), my = y1 + 2 * bh + 84, n = 7, mx = x0 + (bw - cs * (n + 1)) / 2, diff = Number(led.delta);
      c.strokeStyle = TRV.alpha(P.amber, 0.6); c.setLineDash([3, 4]); c.lineWidth = 1; c.beginPath(); c.moveTo(x0 + bw, y1 + bh); c.lineTo(mx + cs * (n + 1), my - 8); c.moveTo(x0 + bw - 14, y1 + 2 * bh + 39); c.lineTo(mx, my - 8); c.stroke(); c.setLineDash([]);
      c.strokeStyle = P.amber; c.strokeRect(mx - 8.5, my - 8.5, cs * (n + 1) + 16, cs * 2 + 30);
      // the last cells of both rows; the cells one row has and the other lacks glow amber
      for (let row = 0; row < 2; row++) for (let i = 0; i <= n; i++) {
        const fromEnd = n - i, has = row === 0 ? (diff > 0 ? true : fromEnd >= -diff) : (diff < 0 ? true : fromEnd >= diff), other = row === 0 ? (diff < 0 ? true : fromEnd >= diff) : (diff > 0 ? true : fromEnd >= -diff);
        const x = mx + i * cs, y = my + row * (cs + 12);
        if (has && !other) { c.save(); c.shadowColor = P.amber; c.shadowBlur = 12; c.fillStyle = P.amber; c.fillRect(x + 1.5, y + 1.5, cs - 3, cs - 3); c.restore(); }
        else if (has) { c.fillStyle = TRV.alpha(row ? P.magenta : P.cyan, 0.75); c.fillRect(x + 1.5, y + 1.5, cs - 3, cs - 3); }
        else { c.strokeStyle = TRV.alpha(P.dim, 0.5); c.lineWidth = 1; c.strokeRect(x + 2, y + 2, cs - 4, cs - 4); }
      }
      c.fillStyle = led.delta > 0n ? P.cyan : P.magenta; c.font = `600 ${Math.min(22, bw / 11)}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'top';
      c.fillText(`${led.m}² − ${S.d}·${led.n}² = ${signed(led.delta)}`, x0 + bw / 2, my + 2 * cs + 40);
      if (!TRV.thumbMode) { c.fillStyle = P.dim; c.font = `11.5px ${TRV.fonts.body}`; c.fillText(L(`两条色带的末端，放大到一格一格：差 ${diff > 0 ? diff : -diff} 格`, `the ends of the two bands, cell by cell: ${diff > 0 ? diff : -diff} cell${Math.abs(diff) === 1 ? '' : 's'} apart`), x0 + bw / 2, my + 2 * cs + 72); }
    }
    $('hudBig').textContent = `√${S.d} ≈ ${cur.m}/${cur.n}`;
    $('hudSub').textContent = L(`第 ${k} 个渐近分数：沿线量差 ${sci(Math.abs(Number(cur.m) / Number(cur.n) - C.root))}，按面积量差 ${signed(cur.delta)} 格`, `Convergent ${k}: ${sci(Math.abs(Number(cur.m) / Number(cur.n) - C.root))} off along the line, ${signed(cur.delta)} cell${cur.delta === 1n || cur.delta === -1n ? '' : 's'} off in area`);
  }

  function drawSplit() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight, p = prime(), ab = twoSquares(p), R = Math.sqrt(p), wide = W > 640;
    const right = wide ? Math.round(W * 0.4) : 24, g = kit.plot(cv, { x: [-R - 1, R + 1], y: [-R - 1, R + 1], pad: [24, right, 80, 50], equal: true }), c = g.ctx, col = ab ? P.cyan : P.magenta;
    const lim = Math.ceil(R) + 1;
    if (g.scale >= 6) for (let i = -lim; i <= lim; i++) for (let j = -lim; j <= lim; j++) if (i >= g.x0 && i <= g.x1 && j >= g.y0 && j <= g.y1) g.dot(i, j, P.faint, g.scale > 14 ? 1.8 : 1.2);
    g.line([[g.x0, 0], [g.x1, 0]], P.faint, { width: 1 }); g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1 });
    const circ = []; for (let i = 0; i <= 120; i++) { const t = kit.TAU * i / 120; circ.push([R * Math.cos(t), R * Math.sin(t)]); }
    g.line(circ, col, { width: 1.8, glow: 8 });
    if (ab) {
      const [A, B] = ab[0] > ab[1] ? ab : [ab[1], ab[0]];
      g.poly([[0, 0], [A, 0], [A, B]], P.cyan, { alpha: 0.18, stroke: P.cyan });
      for (const [x, y] of [[A, B], [B, A]]) for (const sx of [1, -1]) for (const sy of [1, -1]) g.dot(sx * x, sy * y, P.cyan, 4.5);
      g.dot(A, B, P.amber, 9, { ring: true, width: 2, glow: 8 });
      g.text(A / 2, 0, String(A), P.cyan, { align: 'center', base: 'top', dy: 6, size: 12 }); g.text(A, B / 2, String(B), P.cyan, { align: 'left', dx: 7, size: 12 });
      g.text(A / 2, B / 2, `√${p}`, P.ink, { align: 'right', base: 'bottom', dx: -5, dy: -3, size: 12 });
      // the Hilbert angle θ of the lattice point; the triangle on the right has turned by 2θ
      const th = Math.atan2(B, A), rho = Math.max(14, Math.min(46, 0.42 * A * g.scale)), ox = g.X(0), oy = g.Y(0);
      c.strokeStyle = P.ink; c.lineWidth = 1.3; c.beginPath(); c.arc(ox, oy, rho, -th, 0); c.stroke();
      c.fillStyle = P.ink; c.font = `600 13px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('θ', ox + (rho + 6) * Math.cos(th / 2), oy - (rho + 6) * Math.sin(th / 2));
    }
    if (wide) {
      const x0 = W - right + 30, bw = right - 60, cyy = H / 2 + 6;
      c.textAlign = 'center';
      if (ab) {
        const [a, b] = ab[0] > ab[1] ? ab : [ab[1], ab[0]], u = a * a - b * b, v = 2 * a * b, sc = Math.min(bw / Math.max(u, 1), (H - 250) / v), tx = x0 + (bw - u * sc) / 2, ty = cyy + v * sc / 2;
        c.fillStyle = TRV.alpha(P.cyan, 0.14); c.strokeStyle = P.cyan; c.lineWidth = 1.6; c.beginPath(); c.moveTo(tx, ty); c.lineTo(tx + u * sc, ty); c.lineTo(tx + u * sc, ty - v * sc); c.closePath(); c.fill(); c.stroke();
        c.strokeRect(tx + u * sc - 9, ty - 9, 9, 9);
        const t2 = Math.atan2(v, u), r2 = Math.max(14, Math.min(40, 0.32 * u * sc));
        c.strokeStyle = P.ink; c.lineWidth = 1.3; c.beginPath(); c.arc(tx, ty, r2, -t2, 0); c.stroke();
        c.fillStyle = P.ink; c.font = `600 13px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('2θ', tx + (r2 + 6) * Math.cos(t2 / 2), ty - (r2 + 6) * Math.sin(t2 / 2));
        c.textAlign = 'center';
        c.font = `13px ${TRV.fonts.data}`; c.fillStyle = P.cyan; c.textBaseline = 'top'; c.fillText(String(u), tx + u * sc / 2, ty + 7);
        c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(String(v), tx + u * sc + 8, ty - v * sc / 2);
        c.textAlign = 'right'; c.fillStyle = P.amber; c.fillText(String(p), tx + u * sc / 2 - 8, ty - v * sc / 2 - 6);
        c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillStyle = P.ink; c.font = `600 15px ${TRV.fonts.data}`;
        c.fillText(`(${a} + ${b === 1 ? '' : b}i)² = ${u} + ${v}i`, x0 + bw / 2, cyy - v * sc / 2 - 34);
        c.fillStyle = P.dim; c.font = `11.5px ${TRV.fonts.data}`; c.fillText(`${u}² + ${v}² = ${p}²`, x0 + bw / 2, cyy - v * sc / 2 - 14);
      } else {
        c.fillStyle = P.magenta; c.font = `600 22px ${TRV.fonts.data}`; c.textBaseline = 'middle'; c.fillText(`${p} ≡ 3 (mod 4)`, x0 + bw / 2, cyy - 26);
        c.fillStyle = P.dim; c.font = `13px ${TRV.fonts.data}`; c.fillText(`x² ≡ −1 (mod ${p})`, x0 + bw / 2, cyy + 8);
        if (!TRV.thumbMode) { c.font = `12px ${TRV.fonts.body}`; c.fillText(L('无解：圆上没有格点', 'no solution: the circle misses the lattice'), x0 + bw / 2, cyy + 32); }
      }
    }
    $('hudBig').textContent = ab ? `${p} = ${Math.max(...ab)}² + ${Math.min(...ab)}²` : L(`${p} 不是两个平方之和`, `${p} IS NOT A SUM OF TWO SQUARES`);
    $('hudSub').textContent = ab ? L(`面素数：半径 √${p} 的圆穿过 8 个格点`, `A plane prime: the circle of radius √${p} passes through 8 lattice points`) : L(`线素数：半径 √${p} 的圆一个格点也碰不到`, `A line prime: the circle of radius √${p} touches no lattice point at all`);
  }

  /** The histogram of cos θₚ over the good primes below 3000, 24 bins on [−1, 1]. */
  function hist(key) {
    if (!histCache[key]) { const bins = new Array(24).fill(0); let n = 0; for (const q of ALL) { if (BAD[key].includes(q)) continue; const u = count(key, q).cos; bins[Math.min(23, Math.floor((u + 1) / 2 * 24))]++; n++; } histCache[key] = { bins, n }; }
    return histCache[key];
  }
  const satoMode = () => S.scene === 'curve' && S.curve === 'gen' && S.sato;
  /** SATO card: the histogram and the semicircle law take the stage; the current prime is the amber line. */
  function drawSatoStage(c, x0, y0, w, h, p, E) {
    const Hh = hist('gen'), X = (u) => x0 + (u + 1) / 2 * w, Y = (v) => y0 + h - v / 1.25 * h;
    c.strokeStyle = P.lineHot; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0 + h); c.lineTo(x0 + w, y0 + h); c.stroke();
    c.fillStyle = P.dim; c.font = `11px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'top';
    for (const u of [-1, -0.5, 0, 0.5, 1]) { c.fillRect(X(u) - 0.5, y0 + h, 1, 5); c.fillText(String(u).replace('-', '−'), X(u), y0 + h + 8); }
    c.fillText('cos θₚ', X(0), y0 + h + 24);
    Hh.bins.forEach((b, i) => { const v = Math.min(b / Hh.n * 12, 1.25), xa = X(-1 + i / 12) + 1.5, xb = X(-1 + (i + 1) / 12) - 1.5; c.fillStyle = TRV.alpha(P.violet, 0.6); c.fillRect(xa, Y(v), xb - xa, y0 + h - Y(v)); });
    c.strokeStyle = P.amber; c.lineWidth = 2; c.setLineDash([6, 4]); c.beginPath();
    for (let i = 0; i <= 120; i++) { const u = -1 + i / 60, v = (2 / Math.PI) * Math.sqrt(Math.max(0, 1 - u * u)); if (i) c.lineTo(X(u), Y(v)); else c.moveTo(X(u), Y(v)); }
    c.stroke(); c.setLineDash([]);
    c.fillStyle = P.amber; c.font = `12px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillText(L('半圆律 (2/π)√(1 − u²)', 'semicircle law (2/π)√(1 − u²)'), X(-1), Y(1.0));
    if (!isBad('gen', p)) {
      const xc = X(E.cos); c.strokeStyle = P.amber; c.lineWidth = 1.6; c.beginPath(); c.moveTo(xc, y0 + 4); c.lineTo(xc, y0 + h); c.stroke();
      c.fillStyle = P.ink; c.font = `600 13px ${TRV.fonts.data}`; c.textAlign = E.cos > 0.3 ? 'right' : 'left'; c.textBaseline = 'top';
      c.fillText(`p = ${p}: cos θₚ = ${fix(E.cos, 3)}`, xc + (E.cos > 0.3 ? -6 : 6), y0 + 4);
    }
    c.fillStyle = P.dim; c.font = `12px ${TRV.fonts.body}`; c.textAlign = 'left'; c.textBaseline = 'bottom';
    c.fillText(L(`${Hh.n} 个良约化素数，p < 3000`, `${Hh.n} good primes, p < 3000`), x0, y0 - 6);
  }

  function drawCurve() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight, p = prime(), E = count(S.curve, p), ab = twoSquares(p), wide = W > 640, sato = satoMode();
    const g = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), c = g.ctx;
    if (sato && !wide) {   // narrow: the histogram alone
      drawSatoStage(c, 30, 110, W - 60, H - 210, p, E);
      $('hudBig').textContent = L('佐藤—泰特：半圆', 'SATO–TATE: THE SEMICIRCLE');
      $('hudSub').textContent = L(`y² = x³ − x + 1：${hist('gen').n} 个素数的 cos θₚ 贴着半圆律`, `y² = x³ − x + 1: cos θₚ over ${hist('gen').n} primes follows the semicircle law`);
      return;
    }
    const side = Math.min(wide ? (sato ? W * 0.28 : W * 0.52) : W - 60, H - 150), cell = side / p, gx = wide ? (sato ? 44 : Math.max(44, W * 0.3 - side / 2)) : (W - side) / 2, gy = 80 + (H - 140 - side) / 2;
    c.strokeStyle = P.lineHot; c.lineWidth = 1; c.strokeRect(gx - 0.5, gy - 0.5, side + 1, side + 1);
    if (cell >= 5) { c.fillStyle = TRV.alpha(P.faint, 0.8); for (let x = 0; x < p; x++) for (let y = 0; y < p; y++) c.fillRect(gx + (x + 0.5) * cell - 0.6, gy + side - (y + 0.5) * cell - 0.6, 1.2, 1.2); }
    c.strokeStyle = TRV.alpha(P.dim, 0.6); c.setLineDash([4, 4]); c.beginPath(); c.moveTo(gx, gy + side - (p / 2) * cell); c.lineTo(gx + side, gy + side - (p / 2) * cell); c.stroke(); c.setLineDash([]);
    // a point (x, y ≠ 0) comes in a pair ±y and sits in a column with χ = +1 (cyan); y = 0 is a branch point with χ = 0 (neutral)
    const sz = Math.max(2.5, cell * 0.72), chi = spins(S.curve, p), bad = isBad(S.curve, p), sing = bad ? singular(S.curve, p) : null, sum = chi.reduce((a, b) => a + b, 0);
    for (const [x, y] of points(S.curve, p)) { c.fillStyle = y === 0 ? P.sigma : P.cyan; c.fillRect(gx + (x + 0.5) * cell - sz / 2, gy + side - (y + 0.5) * cell - sz / 2, sz, sz); }
    if (sing) { c.strokeStyle = P.sigma; c.lineWidth = 1.6; c.beginPath(); c.arc(gx + (sing[0] + 0.5) * cell, gy + side - 0.5 * cell, sz * 1.25 + 3, 0, kit.TAU); c.stroke(); }
    c.fillStyle = P.dim; c.font = `10.5px ${TRV.fonts.data}`; c.textBaseline = wide ? 'top' : 'middle'; c.textAlign = wide ? 'center' : 'left';
    if (wide) c.fillText('x', gx + side / 2, gy + side + 5); else c.fillText('x', gx + side + 6, gy + side + 10);
    c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('y', gx - 6, gy + side / 2);
    const spinCol = (v) => (v > 0 ? P.cyan : v < 0 ? P.magenta : P.sigma);
    if (!wide) {   // narrow: the spins as one dot under each column
      const rr = Math.max(1.6, Math.min(4, cell * 0.36));
      for (let x = 0; x < p; x++) { c.fillStyle = spinCol(chi[x]); c.beginPath(); c.arc(gx + (x + 0.5) * cell, gy + side + 10, rr, 0, kit.TAU); c.fill(); }
    }
    if (wide && sato) {
      drawSatoStage(c, gx + side + 70, 110, W - (gx + side + 70) - 50, H - 220, p, E);
      $('hudBig').textContent = L('佐藤—泰特：半圆', 'SATO–TATE: THE SEMICIRCLE');
      $('hudSub').textContent = L(`左：y² = x³ − x + 1 在 𝔽${p} 上的 ${E.n} 个点；右：${hist('gen').n} 个素数的 cos θₚ 贴着半圆律`, `Left: the ${E.n} points of y² = x³ − x + 1 over F_${p}; right: cos θₚ over ${hist('gen').n} primes follows the semicircle law`);
      return;
    }
    if (wide) {   // the ring of spins χ_p(f(x)), x = 0 at the top, x and −x mirror images
      const R1 = Math.min(W * 0.11, (H - 160) * 0.2), cx = W * 0.79, cy1 = (TRV.thumbMode ? 84 : 118) + R1, dr = Math.max(1.8, Math.min(5.5, Math.PI * R1 / p * 0.72)) * (TRV.thumbMode ? 1.5 : 1);
      c.strokeStyle = TRV.alpha(P.lineHot, 0.9); c.lineWidth = 1; c.beginPath(); c.arc(cx, cy1, R1, 0, kit.TAU); c.stroke();
      for (let x = 0; x < p; x++) { const a = -Math.PI / 2 + kit.TAU * x / p; c.fillStyle = spinCol(chi[x]); c.beginPath(); c.arc(cx + R1 * Math.cos(a), cy1 + R1 * Math.sin(a), dr, 0, kit.TAU); c.fill(); }
      c.fillStyle = sum > 0 ? P.cyan : sum < 0 ? P.magenta : P.ink; c.font = `600 ${Math.round(Math.min(17, R1 * 0.3))}px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(`Σχ = ${signed(sum).replace(/[+−]0$/, '0')}`, cx, cy1 - 8);
      c.fillStyle = P.dim; c.font = `${Math.round(Math.min(11.5, R1 * 0.2))}px ${TRV.fonts.data}`; c.fillText(`${p + 1} ${sum < 0 ? '−' : '+'} ${Math.abs(sum)} = ${E.n}`, cx, cy1 + 10);
      c.fillText('x = 0', cx, cy1 - R1 - dr - 9);
    }
    if (wide && bad) {   // bad reduction: no Frobenius cosine here
      const cx = W * 0.79, cy = H - 70 - Math.min(W * 0.15, (H - 160) * 0.28) / 2;
      c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = P.ink; c.font = `600 15px ${TRV.fonts.data}`; c.fillText(L('坏约化', 'BAD REDUCTION'), cx, cy - 22);
      c.fillStyle = P.dim; c.font = `12px ${TRV.fonts.data}`; c.fillText(`Δ = ${DISC[S.curve]}`, cx, cy + 2);
      if (!TRV.thumbMode) { c.font = `11.5px ${TRV.fonts.body}`; c.fillText(L(`${p} 整除判别式：没有哈塞界，也没有余弦`, `${p} divides the discriminant: no Hasse bound, no cosine`), cx, cy + 24); }
    } else if (wide) {   // the Frobenius cosine on a half-disc
      const r = Math.min(W * 0.15, (H - 160) * 0.28), cx = W * 0.79, cy = H - 70, th = Math.acos(kit.clamp(E.cos, -1, 1));
      c.strokeStyle = P.lineHot; c.lineWidth = 1.2; c.beginPath(); c.arc(cx, cy, r, Math.PI, 0); c.stroke(); c.beginPath(); c.moveTo(cx - r - 10, cy); c.lineTo(cx + r + 10, cy); c.stroke();
      c.fillStyle = P.dim; c.font = `10.5px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'top'; for (const v of [-1, 0, 1]) { c.fillText(String(v).replace('-', '−'), cx + v * r, cy + 6); c.fillRect(cx + v * r - 0.5, cy - 3, 1, 6); }
      if (S.curve === 'cm' && ab) for (const s of [1, -1]) { const u = s * ab[0] / Math.sqrt(p), v = ab[1] / Math.sqrt(p); c.strokeStyle = TRV.alpha(P.cyan, 0.75); c.setLineDash([4, 3]); c.lineWidth = 1.2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + u * r, cy - v * r); c.stroke(); c.setLineDash([]); }
      const px = cx + r * Math.cos(th), py = cy - r * Math.sin(th);
      c.strokeStyle = TRV.alpha(P.amber, 0.7); c.setLineDash([2, 3]); c.beginPath(); c.moveTo(px, py); c.lineTo(px, cy); c.stroke(); c.setLineDash([]);
      c.save(); c.shadowColor = P.amber; c.shadowBlur = 10; c.strokeStyle = P.amber; c.lineWidth = 2.2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(px, py); c.stroke(); c.fillStyle = P.amber; c.beginPath(); c.arc(px, py, 4.5, 0, kit.TAU); c.fill(); c.restore();
      c.strokeStyle = P.amber; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, cy); c.lineTo(px, cy); c.stroke();
      c.fillStyle = P.ink; c.font = `600 15px ${TRV.fonts.data}`; c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillText(`cos θₚ = ${fix(E.cos, 3)}`, cx, cy - r - 30);
      c.fillStyle = P.dim; c.font = `11.5px ${TRV.fonts.data}`; c.fillText(`aₚ / (2√p) = ${signed(E.a).replace('+0', '0').replace('−0', '0')} / ${fix(2 * Math.sqrt(p), 2)}`, cx, cy - r - 12);
    }
    $('hudBig').textContent = bad ? L(`p = ${p}：坏约化`, `p = ${p}: BAD REDUCTION`) : L(`在 𝔽${p} 上有 ${E.n} 个点`, `${E.n} POINTS OVER F_${p}`);
    $('hudSub').textContent = bad ? L(`判别式 ${DISC[S.curve]} 被 ${p} 整除：曲线在 (${sing[0]}, 0) 自交，这个素数不计入哈塞界与直方图`, `The discriminant ${DISC[S.curve]} is divisible by ${p}: the curve crosses itself at (${sing[0]}, 0), and this prime is left out of Hasse's bound and the histogram`)
      : L(`${E.n - 1} 个格点加上无穷远点；比 p + 1 = ${p + 1} ${E.a > 0 ? '少' : E.a < 0 ? '多' : '不多不少'}${E.a ? ' ' + Math.abs(E.a) : ''}`, `${E.n - 1} grid points and the point at infinity; ${E.a ? Math.abs(E.a) + (E.a > 0 ? ' fewer than' : ' more than') : 'exactly'} p + 1 = ${p + 1}`);
  }

  /* ---------- plots ---------- */
  let histCache = {};
  function drawPlots() {
    const k = step(), A = $('plotA'), B = $('plotB');
    if (S.scene === 'pell') {
      const C = pell(S.d), g = kit.plot(A, { x: [0, KP], y: [1e-13, 100], logY: true, pad: [44, 10, 10, 22] });
      g.axes({ yTicks: [[1, '1'], [1e-4, '10⁻⁴'], [1e-8, '10⁻⁸'], [1e-12, '10⁻¹²']], xTicks: [0, 2, 4, 6, 8, 10, 12, 14] });
      const err = C.list.map((q) => [q.k, Math.max(Math.abs(Number(q.m) / Number(q.n) - C.root), 1e-16)]), del = C.list.map((q) => [q.k, Math.abs(Number(q.delta))]);
      g.hline(1, P.amber, { dash: [4, 3], alpha: 0.7 }); g.line(err, P.cyan); g.line(del, P.magenta); del.forEach((q) => g.dot(q[0], q[1], P.magenta, 2.6)); g.vline(k, P.amber); g.dot(k, err[k][1], P.cyan, 4.5); g.dot(k, del[k][1], P.magenta, 4.5);
      g.legend([[P.magenta, L('面积缺口 |m² − d·n²|', 'area gap |m² − d·n²|')], [P.cyan, L('线上误差 |m/n − √d|', 'error on the line |m/n − √d|')]], { bottom: true, right: false });
      $('pATitle').textContent = L('线上趋于零，面积上不低于 1', 'To zero on the line, never below 1 in area'); $('pAMeta').textContent = '';
      const mx = Math.max(...C.list.map((q) => Math.abs(Number(q.delta)))), g2 = kit.plot(B, { x: [-0.6, KP + 0.6], y: [-mx - 0.6, mx + 0.6], pad: [30, 10, 10, 22] });
      g2.axes({ yTicks: mx > 1 ? [[-mx, signed(-mx)], [-1, '−1'], [1, '+1'], [mx, signed(mx)]] : [[-1, '−1'], [1, '+1']], xTicks: [0, 2, 4, 6, 8, 10, 12, 14] });
      g2.hline(0, P.lineHot); C.list.forEach((q) => g2.rect(q.k - 0.32, 0, q.k + 0.32, Number(q.delta), q.delta > 0n ? P.cyan : P.magenta, { alpha: q.k === k ? 1 : 0.55 }));
      $('pBTitle').textContent = L('差值的符号来回翻', 'The sign of the gap flips back and forth'); $('pBMeta').textContent = L(`周期 ${C.period}`, `period ${C.period}`);
    } else if (S.scene === 'split') {
      const p = prime(), xs = sieve(200).slice(1), g = kit.plot(A, { x: [0, 200], y: [0, 26], pad: [30, 10, 10, 22] });
      g.axes({ yTicks: [0, 10, 20], xTicks: [0, 50, 100, 150, 200] });
      let n1 = 0, n3 = 0; const l1 = [[0, 0]], l3 = [[0, 0]];
      for (const q of xs) { if (q % 4 === 1) { l1.push([q, n1]); n1++; l1.push([q, n1]); } else { l3.push([q, n3]); n3++; l3.push([q, n3]); } }
      l1.push([200, n1]); l3.push([200, n3]); g.line(l3, P.magenta); g.line(l1, P.cyan); g.vline(p, P.amber);
      g.legend([[P.cyan, L('面素数 p ≡ 1', 'plane primes p ≡ 1')], [P.magenta, L('线素数 p ≡ 3', 'line primes p ≡ 3')]], { right: false });
      $('pATitle').textContent = L('两族素数各有多少', 'How many primes of each kind'); $('pAMeta').textContent = `p ≤ 200: ${n1} / ${n3}`;
      const sq = squaresMod(p), g2 = kit.plot(B, { x: [0.5, p - 0.5], y: [0, 1], pad: [12, 12, 30, 24] });
      for (let v = 1; v < p; v++) g2.rect(v - 0.42, 0.1, v + 0.42, 0.9, sq[v] ? P.cyan : P.faint, { alpha: sq[v] ? 0.8 : 0.5 });
      g2.rect(p - 1.5, 0, p - 0.5, 1, P.amber, { fill: false, stroke: P.amber, width: 1.6 });
      g2.text(p - 1, 1, `−1 ≡ ${p - 1}`, P.amber, { align: 'right', base: 'bottom', dy: -4, dx: 6 }); g2.text(1, 0, '1', P.dim, { align: 'center', base: 'top', dy: 5 }); g2.text(p - 1, 0, String(p - 1), P.dim, { align: 'center', base: 'top', dy: 5 });
      $('pBTitle').textContent = L(`模 ${p} 的平方数`, `Squares mod ${p}`); $('pBMeta').textContent = sq[p - 1] ? L('−1 是平方', '−1 is a square') : L('−1 不是平方', '−1 is not a square');
    } else {
      const p = prime(), xs = sieve(199).slice(1).filter((q) => !BAD[S.curve].includes(q)), g = kit.plot(A, { x: [0, 200], y: [-30, 30], pad: [30, 10, 10, 22] });
      g.axes({ yTicks: [-20, 0, 20], xTicks: [0, 50, 100, 150, 200] });
      const up = [], dn = []; for (let x = 0; x <= 200; x += 2) { up.push([x, 2 * Math.sqrt(x)]); dn.push([x, -2 * Math.sqrt(x)]); }
      g.line(up, P.amber, { dash: [4, 3], width: 1.2 }); g.line(dn, P.amber, { dash: [4, 3], width: 1.2 });
      for (const q of xs) { const a = count(S.curve, q).a; g.rect(q - 0.7, 0, q + 0.7, a, a > 0 ? P.cyan : P.magenta, { alpha: q === p ? 1 : 0.6 }); if (!a) g.dot(q, 0, P.sigma, 1.8); }
      g.vline(p, P.amber, { alpha: 0.7 });
      $('pATitle').textContent = L('aₚ 被 ±2√p 关住', 'aₚ is held inside ±2√p'); $('pAMeta').textContent = isBad(S.curve, p) ? L('坏约化', 'bad reduction') : `aₚ = ${signed(count(S.curve, p).a).replace(/[+−]0/, '0')}`;
      const key = S.curve, Hh = hist(key), dens = Hh.bins.map((b) => b / Hh.n * 12), g2 = kit.plot(B, { x: [-1, 1], y: [0, 1.25], pad: [30, 10, 10, 22] });
      g2.axes({ yTicks: [0, 0.5, 1], xTicks: [[-1, '−1'], [0, '0'], [1, '1']] });
      dens.forEach((v, i) => g2.rect(-1 + i / 12 + 0.006, 0, -1 + (i + 1) / 12 - 0.006, Math.min(v, 1.25), key === 'gen' ? P.violet : P.cyan, { alpha: 0.6 }));
      if (key === 'gen') { const sc2 = []; for (let i = 0; i <= 80; i++) { const u = -1 + i / 40; sc2.push([u, (2 / Math.PI) * Math.sqrt(Math.max(0, 1 - u * u))]); } g2.line(sc2, P.amber, { dash: [5, 3] }); g2.legend([[P.amber, L('半圆律', 'semicircle law'), 'dash']], { right: false }); }
      else g2.text(0, 1.25, L('一半的素数恰在 0', 'half of the primes sit exactly at 0'), P.magenta, { align: 'center', base: 'top', dy: 3, face: 'body' });
      if (!isBad(key, p)) g2.vline(count(key, p).cos, P.amber);
      $('pBTitle').textContent = L('cos θₚ 的分布', 'Distribution of cos θₚ'); $('pBMeta').textContent = L(`${Hh.n} 个素数，p < 3000`, `${Hh.n} primes, p < 3000`);
    }
  }

  /* ---------- readouts ---------- */
  let lastBad = null;
  /** The lattice point (A, B), A ≥ B, of a plane prime: its direction θ (Hilbert angle) and the doubled Bloch polar angle 2θ, in degrees. */
  function angles(p) { const ab = twoSquares(p); if (!ab) return null; const A = Math.max(...ab), B = Math.min(...ab), t = Math.atan2(B, A) * 180 / Math.PI; return { A, B, theta: t, bloch: 2 * t }; }
  function drawText() {
    const k = step(), set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    $('roRow5').hidden = S.scene === 'pell';
    let what = '', key = '';
    if (S.scene === 'pell') {
      const C = pell(S.d), q = C.list[k], neg = negativePell(S.d);
      $('roKeyL').textContent = L('面积上的缺口 m² − d·n²', 'the gap in area, m² − d·n²');
      $('roKey').innerHTML = `<span class="${q.delta > 0n ? 'c-cy' : 'c-mg'}">${signed(q.delta)}</span> <span class="chk">${L('不是 0', 'not 0')} ✓</span>`; $('roKeySub').textContent = `${q.m}² − ${S.d}·${q.n}²`;
      set(1, L('渐近分数 m/n', 'convergent m/n'), `${q.m}/${q.n}`); set(2, L('线上误差 |m/n − √d|', 'error on the line |m/n − √d|'), sci(Math.abs(Number(q.m) / Number(q.n) - C.root)));
      set(3, L('连分数', 'continued fraction'), `[${C.quot[0]}; ${C.quot.slice(1, C.period + 1).join(', ')}, …] <small>${L('周期', 'period')} ${C.period}</small>`);
      set(4, 'm² − d·n² = −1', neg ? `${neg[0]}² − ${S.d}·${neg[1]}² <span class="chk">✓</span>` : L('无解', 'no solution'));
      $('roNote').textContent = neg ? L(`周期 ${C.period} 是奇数：差值能取到 −1，再走一个周期翻回 +1。`, `The period ${C.period} is odd: the gap reaches −1, and one more period flips it back to +1.`) : L(`周期 ${C.period} 是偶数：±1 两个值里只出现 +1，差值永远到不了 −1。`, `The period ${C.period} is even: of the two values ±1 only +1 occurs; the gap never reaches −1.`);
      what = `√${S.d} ≈ ${q.m}/${q.n}`; key = `Δ = ${signed(q.delta)}`;
    } else if (S.scene === 'split') {
      const p = prime(), ab = twoSquares(p), roots = rootsOfMinusOne(p), neg = negativePell(p);
      $('roKeyL').textContent = L('这个素数是', 'this prime is');
      $('roKey').innerHTML = ab ? `<span class="c-cy">${p} = ${Math.max(...ab)}² + ${Math.min(...ab)}²</span>` : `<span class="c-mg">${p} ≠ a² + b²</span>`; $('roKeySub').textContent = ab ? L('面素数：分裂成 (a + bi)(a − bi)', 'a plane prime: it splits as (a + bi)(a − bi)') : L('线素数：在高斯整数里仍是素数', 'a line prime: still prime among the Gaussian integers');
      set(1, 'p mod 4', String(p % 4)); set(2, 'x² ≡ −1 (mod p)', roots.length ? `x = ${roots.join(', ')}` : L('无解', 'no solution'));
      set(3, L('整数直角三角形', 'integer right triangle'), ab ? `(${Math.abs(ab[0] * ab[0] - ab[1] * ab[1])}, ${2 * ab[0] * ab[1]}, ${p})` : '—'); set(4, 'm² − p·n² = −1', neg ? `(${neg[0]}, ${neg[1]})` : L('无解', 'no solution'));
      const ang = angles(p);
      set(5, L('夹角 θ，布洛赫极角 2θ', 'angle θ, Bloch polar angle 2θ'), ang ? `θ = ${fix(ang.theta, 2)}° · 2θ = ${fix(ang.bloch, 2)}°` : '—');
      $('roNote').textContent = ab ? L(`三件事同时成立：圆上有格点、−1 是模 p 的平方、负佩尔方程有解。格点 (${ang.A}, ${ang.B}) 的方向角 θ 是希尔伯特空间里的夹角：cos²θ + sin²θ = ${ang.A}²/${p} + ${ang.B}²/${p} = 1。把 ${ang.A} + ${ang.B === 1 ? '' : ang.B}i 平方，角翻倍成 2θ：右边的三角形除以 ${p}，就是态 (${ang.A}|0⟩ + ${ang.B}|1⟩)/√${p} 的布洛赫矢量，极角 θ_Bloch = 2θ。两个角差一倍，不要混用。`,
        `Three things hold together: the circle meets the lattice, −1 is a square mod p, and the negative Pell equation has a solution. The direction θ of the lattice point (${ang.A}, ${ang.B}) is an angle in Hilbert space: cos²θ + sin²θ = ${ang.A}²/${p} + ${ang.B}²/${p} = 1. Squaring ${ang.A} + ${ang.B === 1 ? '' : ang.B}i doubles it to 2θ: the triangle on the right, divided by ${p}, is the Bloch vector of the state (${ang.A}|0⟩ + ${ang.B}|1⟩)/√${p}, whose polar angle is θ_Bloch = 2θ. The two angles differ by a factor of two; do not mix them up.`)
        : L('三件事同时落空：圆上没有格点、−1 不是模 p 的平方、负佩尔方程无解。', 'Three things fail together: the circle misses the lattice, −1 is not a square mod p, and the negative Pell equation has no solution.');
      what = `p = ${p}`; key = ab ? L('面素数', 'PLANE') : L('线素数', 'LINE');
    } else {
      const p = prime(), E = count(S.curve, p), ab = twoSquares(p), bound = 2 * Math.sqrt(p), bad = isBad(S.curve, p), chi = spins(S.curve, p);
      const cnt = (v) => chi.filter((c) => c === v).length, sum = chi.reduce((a, b) => a + b, 0);
      if (bad) {
        $('roKeyL').textContent = L('这个素数整除判别式', 'this prime divides the discriminant');
        $('roKey').innerHTML = `${L('坏约化', 'bad reduction')} <small>Δ = ${DISC[S.curve]}</small>`; $('roKeySub').textContent = L(`曲线在 (${singular(S.curve, p)[0]}, 0) 自交`, `the curve crosses itself at (${singular(S.curve, p)[0]}, 0)`);
      } else {
        $('roKeyL').textContent = L('点数与 p + 1 之差 aₚ', 'aₚ: how far the count is from p + 1');
        $('roKey').innerHTML = `${signed(E.a).replace(/[+−]0/, '0')} <span class="chk">|aₚ| ≤ ${fix(bound, 2)} ✓</span>`; $('roKeySub').textContent = `aₚ = p + 1 − #E = ${p + 1} − ${E.n}`;
      }
      set(1, L('点数 #E = p + 1 + Σχ', 'points #E = p + 1 + Σχ'), String(E.n)); set(2, 'cos θₚ = aₚ/(2√p)', bad ? '—' : fix(E.cos, 4));
      set(3, L('哈塞界 2√p', 'Hasse bound 2√p'), bad ? '—' : fix(bound, 3));
      set(5, L('自旋环 χₚ(f(x))', 'ring of spins χₚ(f(x))'), `<span class="c-cy">${cnt(1)}×(+1)</span> <span class="c-mg">${cnt(-1)}×(−1)</span> ${cnt(0)}×0 = ${signed(sum).replace(/[+−]0$/, '0')}`);
      set(4, S.curve === 'cm' ? (ab ? `2|a|, p = ${ab[0]}² + ${ab[1]}²` : L('线素数', 'line prime')) : L('曲线', 'curve'), S.curve === 'cm' ? (ab ? `${2 * ab[0]} <span class="chk">= |aₚ| ✓</span>` : `aₚ = 0 <span class="chk">✓</span>`) : 'y² = x³ − x + 1');
      $('roNote').textContent = bad ? L(`p = ${p} 是这条曲线的坏约化素数：判别式 ${DISC[S.curve]} 被 ${p} 整除，f 有二重根，曲线在 (${singular(S.curve, p)[0]}, 0) 自交（圆圈）。环上的自旋照样能数，但哈塞界、余弦与直方图只用良约化素数，这里跳过。`, `p = ${p} is a prime of bad reduction for this curve: the discriminant ${DISC[S.curve]} is divisible by ${p}, f has a double root and the curve crosses itself at (${singular(S.curve, p)[0]}, 0) (the circle). The spins on the ring can still be counted, but Hasse's bound, the cosine and the histogram use good primes only, so this prime is skipped.`)
        : S.curve === 'gen' ? L('这条曲线没有复乘：aₚ 不再有简单公式，余弦值散开，分布贴近半圆律。', 'This curve has no complex multiplication: aₚ has no simple formula any more, the cosines spread out and their distribution follows the semicircle law.')
        : ab ? L(`面素数：|aₚ| = 2·${ab[0]}，余弦的绝对值 ${fix(Math.abs(E.cos), 3)} 就是高斯三角形的 ${ab[0]}/√${p}（青色虚线）。`, `A plane prime: |aₚ| = 2·${ab[0]}, and the absolute cosine ${fix(Math.abs(E.cos), 3)} is ${ab[0]}/√${p} of the Gaussian triangle (the dashed cyan line).`)
          : L('线素数：x 与 −x 的贡献正好抵消，aₚ = 0，角度落在 90°。', 'A line prime: the contributions of x and −x cancel exactly, aₚ = 0 and the angle sits at 90°.');
      what = `p = ${p}`; key = bad ? L('坏约化', 'BAD') : `aₚ = ${signed(E.a).replace(/[+−]0/, '0')}`;
      const badKey = bad ? S.curve + p : null;
      if (badKey && badKey !== lastBad && !TRV.still) TRV.toast($('toast'), L(`p = ${p}：坏约化。Δ(E) = ${DISC[S.curve]}，曲线在 (${singular(S.curve, p)[0]}, 0) 自交，不计入哈塞界与佐藤—泰特直方图。`, `p = ${p}: bad reduction. Δ(E) = ${DISC[S.curve]}; the curve crosses itself at (${singular(S.curve, p)[0]}, 0) and is left out of Hasse's bound and the Sato–Tate histogram.`), 6000);
      lastBad = badKey;
    }
    if (S.scene !== 'curve') lastBad = null;
    $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const LEG = {
      pell: [['dm', '直线 m = √d·n', 'the line m = √d·n'], ['cy', '在线上方：差为正', 'above the line: positive gap'], ['mg', '在线下方：差为负', 'below the line: negative gap'], ['am', '当前的渐近分数', 'the current convergent']].concat(S.d === 5 ? [['dm', '(Fₙ, Lₙ)：落在 m² − 5n² = ±4 上', '(Fₙ, Lₙ): on m² − 5n² = ±4']] : []),
      split: [['cy', '面素数：圆上有格点', 'plane prime: lattice points on the circle'], ['mg', '线素数：圆上没有格点', 'line prime: none on the circle']],
      curve: [['cy', 'χ = +1：一对点 ±y', 'χ = +1: a pair of points ±y'], ['mg', 'χ = −1：这一列没有点', 'χ = −1: no point in the column'], ['sg', 'χ = 0：分支点 y = 0', 'χ = 0: a branch point y = 0'], ['am', '余弦 cos θₚ', 'the cosine cos θₚ']]
    };
    if (satoMode()) LEG.curve = [['cy', '曲线上的点', 'points on the curve'], ['vi', 'cos θₚ 的直方图', 'histogram of cos θₚ'], ['am', '半圆律；当前 p 的 cos θₚ', 'semicircle law; cos θₚ at the current p']];
    const html = LEG[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  const paint = kit.painter(() => { ({ pell: drawPell, split: drawSplit, curve: drawCurve })[S.scene](); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: KP, rate: 0.9, step: 1,
    format: (t, max) => (S.scene === 'pell' ? `k ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)}</small>` : `p ${ODD[Math.min(Math.floor(t + 1e-9), ODD.length - 1)]} <small>/ 97</small>`),
    onChange: () => paint()
  });
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); clock.rate = SC[sc].rate; clock.setMax(SC[sc].max(), true); clock.set(t == null ? SC[sc].start() : t);
  }
  const leave = () => { S.sato = false; cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const fD = kit.field($('dsel'), { fmt: (v) => String(DS[v]), onInput: (v) => { S.d = DS[v]; leave(); paint(); } });
  const curveChips = kit.chips($('curveChips'), 'curve', (v) => { S.curve = v; leave(); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('pell'); }, 2: () => { leave(); setScene('split'); }, 3: () => { leave(); setScene('curve'); } });

  /* ---------- experiment cards ---------- */
  // the card that plays, with the frame its still shows (kit.cards writes it onto the card as data-still)
  const PRESETS = { hippasus: { still: 3 } };
  const NOTES = {
    hippasus: ['1/1、3/2、7/5、17/12、41/29……这些分数一上一下地夹住 √2，沿线看很快就分不出差别。但 m² 与 2n² 是两个整数，从不相等：放大镜里永远差着一格。', '1/1, 3/2, 7/5, 17/12, 41/29, … squeeze √2 from above and below, and along the line they soon cannot be told apart. But m² and 2n² are two integers that are never equal: in the magnifier they are always one cell apart.'],
    locked: ['√7 的周期是 4（偶数）。差值在 −3、+2、−3、+1 之间循环，每次回到 +1，却永远碰不到 −1。7 是线素数。', 'The period of √7 is 4 (even). The gap cycles through −3, +2, −3, +1 and returns to +1 each time, but never touches −1. 7 is a line prime.'],
    five: ['半径 √5 的圆穿过格点 (2, 1)：5 = 2² + 1²。把 2 + i 平方得到 3 + 4i，于是长出最熟悉的直角三角形 (3, 4, 5)。', 'The circle of radius √5 passes through the lattice point (2, 1): 5 = 2² + 1². Squaring 2 + i gives 3 + 4i, and out comes the most familiar right triangle, (3, 4, 5).'],
    seven: ['半径 √7 的圆从格点之间穿过，一个也碰不到。7 写不成两个平方之和，−1 也不是模 7 的平方。', 'The circle of radius √7 threads between the lattice points and touches none. 7 is not a sum of two squares, and −1 is not a square mod 7.'],
    count: ['把 y² = x³ − x 放到只有 13 个数的世界里逐格检查：7 个格点加无穷远点共 8 个，比 p + 1 = 14 少 6。13 = 3² + 2²，而 6 = 2·3：这个差正是高斯三角形奇数边的两倍。右上环上的颜色是 χ₁₃(x³ − x)：2 个 +1、8 个 −1、3 个 0，和为 −6。', 'Put y² = x³ − x into a world of only 13 numbers and check every cell: 7 grid points and the point at infinity make 8, six fewer than p + 1 = 14. 13 = 3² + 2², and 6 = 2·3: the difference is twice the odd leg of the Gaussian triangle. The ring at the upper right is coloured by χ₁₃(x³ − x): two +1, eight −1 and three 0, summing to −6.'],
    sato: ['换成 y² = x³ − x + 1：线素数不再落在零上，余弦值散布在 −1 到 1 之间。对 3000 以内的素数作直方图，轮廓贴近半圆。', 'Switch to y² = x³ − x + 1: line primes no longer sit at zero and the cosines scatter between −1 and 1. A histogram over the primes below 3000 follows the semicircle.']
  };
  let booting = true;
  function applyPreset(id) {
    S.sato = false;
    const pellAt = (d, t, play) => {
      S.d = d; fD.set(DS.indexOf(d)); setScene('pell', t);
      if (!play) return;
      if (TRV.still || (booting && !TRV.embed)) clock.set(PRESETS[id].still);
      else { clock.set(0); if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    };
    const curve = (c) => { S.curve = c; curveChips.set(c, true); };
    if (id === 'hippasus') pellAt(2, 3, true);
    else if (id === 'locked') pellAt(7, 3, false);
    else if (id === 'five') setScene('split', ODD.indexOf(5));
    else if (id === 'seven') setScene('split', ODD.indexOf(7));
    else if (id === 'count') { curve('cm'); setScene('curve', ODD.indexOf(13)); }
    else if (id === 'sato') { curve('gen'); setScene('curve', ODD.indexOf(53)); S.sato = true; paint(); }
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、换 d、拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, change d, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.PYTHAGORAS_DEBUG = {
    get state() {
      const k = step(), C = pell(S.d), q = C.list[Math.min(k, KP)], p = prime(), E = count(S.curve, p), neg = negativePell(S.scene === 'pell' ? S.d : p);
      return { satoStage: satoMode(), hudBig: $('hudBig').textContent, scene: S.scene, step: k, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, d: S.d, m: String(q.m), n: String(q.n), delta: String(q.delta), period: C.period,
        deltas: C.list.map((x) => String(x.delta)), quot: C.quot.slice(0, 12), negPell: neg ? neg.map(String) : null, p, two: twoSquares(p), roots: rootsOfMinusOne(p), curve: S.curve, count: E.n, a: E.a, cos: E.cos, npoints: points(S.curve, p).length,
        chi: spins(S.curve, p), bad: isBad(S.curve, p), singular: isBad(S.curve, p) ? singular(S.curve, p) : null, angles: angles(p) };
    },
    seek: (t) => { clock.pause(); clock.set(t); }, hist: () => histCache[S.curve] || null
  };
  window.TRV_THUMB = () => { S.d = 2; setScene('pell', 3); paint.now(); };
  cards.pick(cards.initial('hippasus'));
  booting = false;
  paint();
})();
