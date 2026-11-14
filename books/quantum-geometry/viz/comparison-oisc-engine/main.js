/* ORTHO//CMP · 宇宙单指令比较引擎 · the cosmic comparison engine (chapter 32, §32.5–§32.6).
   Four scenes share one rail; each scene (and sub-mode) says what the rail means and keeps its own position on it:
     · primitive (rail: slots compared, 0…8): two bipolar words w_A, w_B ∈ {±1}⁸/√8 are multiplied slot by slot. Equal
       slots (XNOR) and unequal slots (XOR) are counted: s = ⟨w_A, w_B⟩ = (m − d)/8 = cos θ, a = √(1 − s²) = sin θ,
       ‖w_A + w_B‖² = m/2 and ‖w_A − w_B‖² = d/2 add up to 4. The circle shows the comparison of the first k slots
       (both truncated words renormalised). CMP(A, B) = s + aÎ, CMP(B, A) = s − aÎ; with Î² = κ their product is
       s² − κa² (equal to 1 for a ≠ 0 exactly when κ = −1) and Î(−Î) = −κ.
     · lattice (rail: pairs revealed, 0…M(M − 1)/2): the Gram table G = WWᵀ of M unit words is revealed pair by pair.
       Its spectral factor X = V√Λ (Jacobi) gives G = XXᵀ and d²ᵢⱼ = 2(1 − Gᵢⱼ) = ‖Xᵢ − Xⱼ‖² when rank G ≤ 3. Node
       positions between the ring (k = 0) and the embedding are a display interpolation.
     · folding: lagrange (rail: direction of v, 0…180°) — ū v = (s₁s₂ + a₁a₂) + i(s₁a₂ − a₁s₂) and
       (s₁² + a₁²)(s₂² + a₂²) = (s₁s₂ + a₁a₂)² + (a₁s₂ − s₁a₂)²; minkowski (rail: allocation angle θ, 0…90°) —
       (dτ/dt)² + (dx/(c dt))² = 1 rewritten as (c dτ)² = (c dt)² − dx² with c dt = 1.
     · expansion: residual (rail: tilt β, 0…90°) — w = cos β (cos φ e₁ + sin φ e₂) + sin β e₃, P w, r = (I − P)w and the
       Gram rank of {e₁, e₂, w}; memo (rail: cobweb step n, 0…24) — the first b bits of sixteen four-bit states, ordered
       escape pairs counted by enumeration, and xₙ₊₁ = cos xₙ from x₀ = 0.
   Colours: amber = the current comparison, slot, pair, handle and lookup only; cyan = sameness, what stays in the
   table, resolved prefixes; magenta = difference, wedge, residual, unresolved pairs; violet = products and the new
   axis; neutral ink = the words and everything else. Green appears only on the source-linked LEAN ✓ boxes, never on
   the stage. window.COMPARISON_OISC_DEBUG is a read-only snapshot for the browser suite; pickPreset, setRail and
   setOptions act through the same paths as a reader. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const TH = TRV.thumbMode ? 1.9 : 1;
  const DEG = Math.PI / 180, TAU = 2 * Math.PI, EPS = 1e-9, NS = 8, R8 = 1 / Math.sqrt(8);
  const NBITS = 4, NSTATES = 16, NCOB = 24, DOTTIE = 0.7390851332151607;
  const SUBS = '₀₁₂₃₄₅₆₇₈₉', subs = (n) => String(n).replace(/\d/g, (c) => SUBS[+c]);
  const SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const dotN = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const fdeg = (x, d) => `${fix(x, d == null ? 1 : d)}°`;
  /** Small numbers as m × 10ᵉ (exact zero as 0). */
  function sci(x) {
    if (!Number.isFinite(x)) return '—';
    const ax = Math.abs(x);
    if (ax === 0) return '0';
    if (ax >= 1e-3) return fix(x, 4);
    const e = Math.floor(Math.log10(ax));
    return `${fix(x / 10 ** e, 2)} × 10${String(e).split('').map((c) => SUPS[c]).join('')}`;
  }
  const bin4 = (x) => x.toString(2).padStart(NBITS, '0');

  /* ---------- symmetric eigenproblem (cyclic Jacobi), eigenvalues in descending order ---------- */
  function jacobi(A0) {
    const n = A0.length, A = A0.map((r) => r.slice()), V = A0.map((_, i) => A0.map((__, j) => (i === j ? 1 : 0)));
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] * A[p][q];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const kp = A[k][p], kq = A[k][q]; A[k][p] = c * kp - s * kq; A[k][q] = s * kp + c * kq; }
        for (let k = 0; k < n; k++) { const pk = A[p][k], qk = A[q][k]; A[p][k] = c * pk - s * qk; A[q][k] = s * pk + c * qk; }
        for (let k = 0; k < n; k++) { const kp = V[k][p], kq = V[k][q]; V[k][p] = c * kp - s * kq; V[k][q] = s * kp + c * kq; }
      }
    }
    const order = [...Array(n).keys()].sort((i, j) => A[j][j] - A[i][i]);
    return { values: order.map((i) => A[i][i]), vectors: order.map((i) => V.map((r) => r[i])) };
  }

  /* ---------- words ---------- */
  const WA0 = [1, -1, 1, 1, -1, 1, -1, -1];
  const flipAt = (w, ks) => w.map((x, k) => (ks.includes(k) ? -x : x));
  const WORDS = { w60: flipAt(WA0, [2, 5]), w90: flipAt(WA0, [1, 2, 5, 6]), w0: WA0.slice(), w180: WA0.map((x) => -x) };
  /** Box of eight: slot k repeats the sign of direction BOX[k], so the three directions get 3, 3 and 2 slots. */
  const BOX = [0, 1, 2, 0, 1, 2, 0, 1];
  const boxWord = (i) => BOX.map((j) => ((i >> j) & 1 ? -1 : 1));
  const walsh = (r) => Array.from({ length: NS }, (_, k) => ((k >> r) & 1 ? -1 : 1));
  const SETS = {
    box8: { words: Array.from({ length: 8 }, (_, i) => boxWord(i)), orient: [[0, 1], [0, 2]] },
    octa6: { words: [walsh(0), walsh(1), walsh(2), walsh(0).map((x) => -x), walsh(1).map((x) => -x), walsh(2).map((x) => -x)], orient: [[0, 3], [1, 4]] },
    perturbed: { words: Array.from({ length: 8 }, (_, i) => (i === 5 ? flipAt(boxWord(i), [7]) : boxWord(i))), orient: [[0, 1], [0, 2]] }
  };

  /* ---------- state ---------- */
  const S = {
    scene: 'primitive', fold: 'lagrange', exp: 'residual', set: 'box8',
    wA: WA0.slice(), wB: WORDS.w60.slice(), kappa: -1,
    sel: -1, uDeg: 20, vLen: 1, phi: 35, bits: 2, key: 11,
    rail: { primitive: 8, lattice: 28, lagrange: 75, minkowski: 60, residual: 52, memo: 14 }
  };

  /* ---------- primitive: one pairwise comparison ---------- */
  function primitiveState(t) {
    const wA = S.wA, wB = S.wB, prod = wA.map((x, k) => x * wB[k]);
    const k = clamp(Math.floor(t + 1e-9), 0, NS), frac = k < NS ? clamp(t - k, 0, 1) : 0;
    const A = wA.map((x) => x * R8), B = wB.map((x) => x * R8);
    const plus = A.map((x, j) => x + B[j]), minus = A.map((x, j) => x - B[j]);
    let m = 0, d = 0, partSum = 0, partDiff = 0;
    for (let j = 0; j < k; j++) { if (prod[j] > 0) m++; else d++; partSum += plus[j] * plus[j]; partDiff += minus[j] * minus[j]; }
    const M = prod.filter((x) => x > 0).length, s = dotN(A, B), a = Math.sqrt(Math.max(0, 1 - s * s));
    const cosAt = (n) => (n <= 0 ? null : clamp(prod.slice(0, n).reduce((x, y) => x + y, 0) / n, -1, 1));
    let th = k > 0 ? Math.acos(cosAt(k)) : null;
    if (frac > 0) { const nx = Math.acos(cosAt(k + 1)); th = th == null ? nx : th + (nx - th) * TRV.smooth(frac); }
    const sNow = th == null ? null : Math.cos(th), aNow = th == null ? null : Math.sin(th), kap = S.kappa;
    return {
      wA: wA.slice(), wB: wB.slice(), prod, k, frac, m, d, matches: M, mismatches: NS - M, s, a, theta: Math.acos(clamp(s, -1, 1)),
      sumSq: dotN(plus, plus), diffSq: dotN(minus, minus), partSum, partDiff,
      thNow: th, sNow, aNow, kappa: kap, productNow: th == null ? null : sNow * sNow - kap * aNow * aNow,
      product: s * s - kap * a * a, pureDiff: -kap, born: s * s,
      ePerp: a > 1e-12 ? B.map((x, j) => (x - s * A[j]) / a) : null
    };
  }

  /* ---------- lattice: the Gram table develops into coordinates ---------- */
  const baseCache = {};
  function latticeBase(id) {
    if (baseCache[id]) return baseCache[id];
    const raw = SETS[id].words, M = raw.length, W = raw.map((w) => w.map((x) => x * R8));
    const G = W.map((a) => W.map((b) => dotN(a, b)));
    const eig = jacobi(G), lam = eig.values, rank = lam.filter((l) => l > EPS).length;
    const X = W.map((_, i) => [0, 1, 2].map((c) => Math.sqrt(Math.max(0, lam[c])) * eig.vectors[c][i]));
    // the embedding is fixed up to an orthogonal map: straighten it with the differences of two pairs of words
    const [[a1, b1], [a2, b2]] = SETS[id].orient;
    const f1 = v3.unit(v3.sub(X[a1], X[b1])), g2 = v3.sub(X[a2], X[b2]), f2 = v3.unit(v3.sub(g2, v3.scale(f1, v3.dot(g2, f1)))), f3 = v3.cross(f1, f2);
    const D = X.map((x) => [v3.dot(x, f1), v3.dot(x, f2), v3.dot(x, f3)]);
    const pairs = [];
    for (let i = 0; i < M; i++) for (let j = i + 1; j < M; j++) pairs.push([i, j]);
    const ring = raw.map((_, i) => [Math.cos(TAU * i / M + Math.PI / 2), Math.sin(TAU * i / M + Math.PI / 2), 0]);
    let fullErr = 0;
    for (const [i, j] of pairs) { const e = v3.sub(X[i], X[j]); fullErr = Math.max(fullErr, Math.abs(2 * (1 - G[i][j]) - v3.dot(e, e))); }
    return (baseCache[id] = { id, M, raw, W, G, lam, rank, X, D, pairs, P: pairs.length, ring, fullErr });
  }
  function latticeState(t) {
    const B = latticeBase(S.set), k = clamp(Math.floor(t + 1e-9), 0, B.P), frac = k < B.P ? clamp(t - k, 0, 1) : 0;
    const seen = B.pairs.slice(0, k), cur = frac > 0 ? B.pairs[k] : k > 0 ? B.pairs[k - 1] : null;
    const degree = Array(B.M).fill(0);
    seen.forEach(([i, j]) => { degree[i]++; degree[j]++; });
    if (frac > 0) { degree[cur[0]] += frac; degree[cur[1]] += frac; }
    const pos = B.D.map((d, i) => v3.lerp(B.ring[i], d, TRV.smooth(degree[i] / (B.M - 1))));
    const known = B.G.map((r, i) => r.map((g, j) => (i === j ? g : 0)));
    seen.forEach(([i, j]) => { known[i][j] = known[j][i] = B.G[i][j]; });
    const seenSet = new Set(seen.map(([i, j]) => i * 16 + j));
    let maxErr = 0;
    const scatter = seen.map(([i, j]) => { const e = v3.sub(B.X[i], B.X[j]), d2 = 2 * (1 - B.G[i][j]), x2 = v3.dot(e, e); maxErr = Math.max(maxErr, Math.abs(d2 - x2)); return [d2, x2, i, j]; });
    return { B, k, frac, seen, seenSet, cur, pos, known, partSpectrum: jacobi(known).values, maxErr, scatter, complete: k === B.P };
  }

  /* ---------- folding ---------- */
  function lagrangeState(t) {
    const pu = S.uDeg * DEG, pv = t * DEG, u = [Math.cos(pu), Math.sin(pu)], v = [S.vLen * Math.cos(pv), S.vLen * Math.sin(pv)];
    const same = u[0] * v[0] + u[1] * v[1], wedge = u[0] * v[1] - u[1] * v[0];
    const nu = u[0] * u[0] + u[1] * u[1], nv = v[0] * v[0] + v[1] * v[1];
    return {
      u, v, ubar: [u[0], -u[1]], phiV: t, delta: t - S.uDeg, same, wedge, samenessSq: same * same, wedgeSq: (u[1] * v[0] - u[0] * v[1]) ** 2,
      lhs: nu * nv, rhs: same * same + wedge * wedge, mirror: u[0] * u[0] + u[1] * u[1], normU: Math.sqrt(nu), normV: Math.sqrt(nv)
    };
  }
  function minkowskiState(t) {
    const th = t * DEG, dtau = Math.cos(th), dx = Math.sin(th);
    return { theta: th, thetaDeg: t, dtau, dx, budget: dtau * dtau + dx * dx, lhs: dtau * dtau, rhs: 1 - dx * dx, event: [dx, 1], onCone: t >= 90 - 1e-9 };
  }

  /* ---------- expansion ---------- */
  function residualState(t) {
    const b = t * DEG, ph = S.phi * DEG, w = [Math.cos(b) * Math.cos(ph), Math.cos(b) * Math.sin(ph), Math.sin(b)];
    const Pw = [w[0], w[1], 0], r = v3.sub(w, Pw);
    const gram = [[1, 0, w[0]], [0, 1, w[1]], [w[0], w[1], 1]], ev = jacobi(gram).values;
    return {
      beta: b, betaDeg: t, phiDeg: S.phi, w, Pw, r, inPlaneNormSq: v3.dot(Pw, Pw), residualNormSq: v3.dot(r, r), residualNorm: v3.len(r),
      sameWithE1: r[0], sameWithE2: r[1], gram, eigenvalues: ev, rank: ev.filter((l) => l > EPS).length, det: 1 - w[0] * w[0] - w[1] * w[1]
    };
  }
  const prefix = (x, b) => x >> (NBITS - b);
  /** Ordered distinct pairs of the 16 states that the first b bits cannot separate (by enumeration). */
  function escapeCount(b) {
    let n = 0;
    for (let x = 0; x < NSTATES; x++) for (let y = 0; y < NSTATES; y++) if (x !== y && prefix(x, b) === prefix(y, b)) n++;
    return n;
  }
  const COBWEB = (() => { const xs = [0]; for (let i = 0; i < NCOB; i++) xs.push(Math.cos(xs[i])); return xs; })();
  const DOTTIE_NEWTON = (() => { let x = 0.7; for (let i = 0; i < 40; i++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  function memoState(t) {
    const b = S.bits, n = clamp(Math.floor(t + 1e-9), 0, NCOB), frac = n < NCOB ? clamp(t - n, 0, 1) : 0;
    let uniq = 0;
    for (let x = 0; x < NSTATES; x++) for (let y = 0; y < NSTATES; y++) if (x !== y && prefix(x, b - 1) === prefix(y, b - 1) && prefix(x, b) !== prefix(y, b)) uniq++;
    const esc = escapeCount(b);
    return {
      b, n, frac, xs: COBWEB, x: COBWEB[n], err: Math.abs(COBWEB[n] - DOTTIE), esc, escUnordered: esc / 2, escPrev: escapeCount(b - 1), uniq,
      buckets: 1 << b, size: 1 << (NBITS - b), key: S.key, keyPrefix: prefix(S.key, b)
    };
  }

  /* ---------- the stage: one canvas, one stage3 (2D scenes draw through kit.plot and plain canvas calls) ---------- */
  let grab = null, last = null, plotL = null, plotR = null, primLayout = null, memoLayout = null;
  const sopts = {
    canvas: $('cv'), radius: 0.36, cx: 0.5, cy: 0.52,
    onChange: () => paint(),
    onPick: (ev, st) => pick(ev, st),
    onDrag: (ev, st) => drag(ev, st),
    onDrop: () => { grab = null; }
  };
  const stage = kit.stage3($('stage'), sopts);
  const VIEWS = { lattice: [-0.62, 0.36], residual: [-0.58, 0.3] };
  const is3D = () => S.scene === 'lattice' || (S.scene === 'expansion' && S.exp === 'residual');

  /* stage labels: every label carries a key class; after a frame, labels that would sit on an earlier one are hidden */
  let tagOrder = [];
  function tag(key, p, html, cls, o) { if (TRV.thumbMode) return; stage.tag(key, p, html, `${cls || 'raw'} k-${key}`, o); tagOrder.push(key); }
  const stag = (key, x, y, html, cls) => tag(key, [x, y], html, cls, { screen: true });
  function declutter() {
    const boxes = [], sr = $('stage').getBoundingClientRect();
    for (const key of tagOrder) {
      const el = $('stage').querySelector(`.tags .k-${key}`);
      if (!el || el.hidden) continue;
      let r = el.getBoundingClientRect();
      if (!r.width) continue;
      // a label never runs off the stage: nudge it back inside (st.tag rewrites the transform every frame)
      const dx = r.left < sr.left + 4 ? sr.left + 4 - r.left : r.right > sr.right - 4 ? sr.right - 4 - r.right : 0;
      if (dx) { el.style.transform += ` translate(${dx.toFixed(1)}px, 0px)`; r = el.getBoundingClientRect(); }
      if (boxes.some((b) => Math.min(r.right, b.right) - Math.max(r.left, b.left) > -2 && Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > -1)) el.hidden = true;
      else boxes.push(r);
    }
    tagOrder = [];
  }
  /** The free part of the stage between the HUD (title, scene chips) and the legend, in CSS pixels. */
  function frameBox() {
    const el = $('stage'), sr = el.getBoundingClientRect(), below = (e) => (e ? e.getBoundingClientRect().bottom - sr.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 18 : Math.max(44, below($('hudBig').parentElement), below($('sceneChips'))) + 6;
    const bottom = thumb ? 18 : Math.max(16, $('legend').offsetHeight + 18);
    return { W: sr.width, H: sr.height, top, bottom, h: Math.max(60, sr.height - top - bottom) };
  }
  /** Place the 3D view in the free box, leaving room for an inset at the bottom right when asked. */
  function layout3D(withInset) {
    const F = frameBox(), iw = withInset ? clamp(Math.min(F.W, F.h) * (TRV.thumbMode ? 0.42 : 0.34), 132, TRV.thumbMode ? 300 : 186) : 0, ih = Math.round(iw * 0.86);
    const wide = F.W > 1.25 * F.h, k = TRV.thumbMode ? 0.42 : 0.37;
    let unit, cx, cy;
    if (iw && wide) { const aw = F.W - iw - 24; unit = Math.min(k * F.h, 0.34 * aw); cx = aw / 2 + 8; cy = F.top + F.h / 2; }
    else if (iw) { const hh = F.h - ih - 12; unit = Math.min(k * hh, 0.34 * F.W); cx = F.W / 2; cy = F.top + hh / 2; }
    else { unit = Math.min(k * F.h, 0.34 * F.W); cx = F.W / 2; cy = F.top + F.h / 2 + 0.06 * F.h; }
    sopts.cx = cx / F.W; sopts.cy = cy / F.H; sopts.radius = Math.max(30, unit) / Math.min(F.W, F.H);
    return { F, box: iw ? { x: F.W - iw - 12, y: F.H - F.bottom - ih - 2, w: iw, h: ih } : null };
  }
  /** Two panels in the free box: side by side when the stage is wide, stacked otherwise. */
  function panels(F) {
    const gap = 14, side = 12;
    if (F.W > 1.25 * F.h) { const w = (F.W - 2 * side - gap) / 2; return [{ x: side, y: F.top, w, h: F.h }, { x: side + w + gap, y: F.top, w, h: F.h }]; }
    const h = (F.h - gap) / 2;
    return [{ x: side, y: F.top, w: F.W - 2 * side, h }, { x: side, y: F.top + h + gap, w: F.W - 2 * side, h }];
  }
  const boxPlot = (F, b, x, y) => kit.plot($('cv'), { x, y, equal: true, clear: false, pad: [b.x, Math.max(0, F.W - b.x - b.w), b.y, Math.max(0, F.H - b.y - b.h)] });
  function arrow2(ctx, x0, y0, x1, y1, color, w, head, alpha) {
    const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy);
    if (l < 1) return;
    ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.setLineDash([]);
    const h = Math.min(head || 9, l * 0.5), ux = dx / l, uy = dy / l;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * h - uy * h * 0.45, y1 - uy * h + ux * h * 0.45); ctx.lineTo(x1 - ux * h + uy * h * 0.45, y1 - uy * h - ux * h * 0.45); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  const garrow = (g, a, b, color, w, head, o) => {
    const c = g.ctx; c.save(); if (o && o.dash) c.setLineDash(o.dash); if (o && o.glow) { c.shadowColor = color; c.shadowBlur = o.glow; }
    arrow2(c, g.X(a[0]), g.Y(a[1]), g.X(b[0]), g.Y(b[1]), color, w, head, o && o.alpha); c.restore();
  };
  const seg = (ctx, x0, y0, x1, y1, color, w, o) => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.globalAlpha = o && o.alpha != null ? o.alpha : 1;
    if (o && o.dash) ctx.setLineDash(o.dash);
    if (o && o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore();
  };
  const ring = (ctx, x, y, r, color, w, o) => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.globalAlpha = o && o.alpha != null ? o.alpha : 1; if (o && o.dash) ctx.setLineDash(o.dash);
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore();
  };
  const disc = (ctx, x, y, r, color, o) => {
    ctx.save(); ctx.fillStyle = color; ctx.globalAlpha = o && o.alpha != null ? o.alpha : 1; if (o && o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
  };
  const circlePts = (r, n, c) => Array.from({ length: (n || 96) + 1 }, (_, i) => { const t = TAU * i / (n || 96); return [(c ? c[0] : 0) + r * Math.cos(t), (c ? c[1] : 0) + r * Math.sin(t)]; });
  function insetFrame(ctx, b) {
    ctx.save(); ctx.fillStyle = TRV.alpha(P.void, 0.62); ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1); ctx.restore();
  }
  const gColor = (g) => (g > EPS ? P.cyan : g < -EPS ? P.magenta : P.dim);
  const gClass = (g) => (g > EPS ? 'c-cy' : g < -EPS ? 'c-mg' : '');

  /* ---------- scene 1: the primitive comparison (2D) ---------- */
  function drawPrimitive(st, Pm) {
    st.begin();
    const ctx = st.ctx, F = frameBox(), wide = F.W > 1.3 * F.h;
    const sb = wide ? { x: 16, y: F.top, w: F.W * 0.52 - 24, h: F.h } : { x: 12, y: F.top, w: F.W - 24, h: Math.min(F.h * 0.45, 210) };
    const cb = wide ? { x: F.W * 0.52, y: F.top, w: F.W * 0.48 - 14, h: F.h } : { x: 12, y: sb.y + sb.h, w: F.W - 24, h: F.h - sb.h };
    const lab = TRV.thumbMode ? 4 : 30;
    const c = clamp(Math.min((sb.w - lab) / 8 * 0.78, (sb.h - 52) / 3.4), 10, 48);
    const g = Math.min(c * 0.42, Math.max(2, (sb.w - lab - 8 * c) / 7)), rowW = 8 * c + 7 * g;
    const x0 = sb.x + lab + Math.max(0, (sb.w - lab - rowW) / 2);
    const linkH = 0.9 * c, barH = Math.max(7, 0.24 * c) * (TRV.thumbMode ? 1.5 : 1), gapBar = 0.45 * c + 10;
    const total = 16 + 2 * c + linkH + gapBar + barH + 18;
    const yA = sb.y + Math.max(0, (sb.h - total) / 2) + 16, yB = yA + c + linkH, yBar = yB + c + gapBar;
    primLayout = { x0, c, g, yA, yB };
    const cx = (k) => x0 + k * (c + g) + c / 2;
    // the chips: a filled tile with an up arrow is +1, a hollow tile with a down arrow is −1
    const chip = (k, y, v) => {
      const x = x0 + k * (c + g);
      ctx.save();
      ctx.fillStyle = v > 0 ? TRV.alpha(P.sigma, 0.17) : TRV.alpha(P.void, 0.5); ctx.fillRect(x, y, c, c);
      ctx.strokeStyle = P.sigma; ctx.globalAlpha = 0.75; ctx.lineWidth = 1.3 * TH; ctx.strokeRect(x + 0.5, y + 0.5, c - 1, c - 1);
      ctx.restore();
      const yc = y + c / 2, h = c * 0.3;
      arrow2(ctx, x + c / 2, yc + (v > 0 ? h : -h), x + c / 2, yc + (v > 0 ? -h : h), P.sigma, Math.max(1.6, c * 0.07) * TH, c * 0.26, 0.95);
    };
    for (let k = 0; k < NS; k++) { chip(k, yA, Pm.wA[k]); chip(k, yB, Pm.wB[k]); }
    // the links: a straight cyan bar for an equal slot, a magenta twist for an unequal one
    for (let k = 0; k < NS; k++) {
      const x = cx(k), y1 = yA + c + 4, y2 = yB - 4, al = k < Pm.k ? 1 : k === Pm.k ? Pm.frac : 0;
      if (al <= 0) { seg(ctx, x, y1, x, y2, P.dim, 1, { alpha: 0.5, dash: [2, 4] }); continue; }
      if (Pm.prod[k] > 0) seg(ctx, x, y1, x, y2, P.cyan, 3.2 * TH, { alpha: al, glow: TRV.thumbMode ? 0 : 6 });
      else { const dx = c * 0.32; seg(ctx, x - dx, y1, x + dx, y2, P.magenta, 2.8 * TH, { alpha: al }); seg(ctx, x + dx, y1, x - dx, y2, P.magenta, 2.8 * TH, { alpha: al }); }
    }
    // the read head: the slot compared next
    if (Pm.k < NS) {
      const x = x0 + Pm.k * (c + g);
      ctx.save(); ctx.strokeStyle = P.amber; ctx.lineWidth = 1.8 * TH; ctx.shadowColor = P.amber; ctx.shadowBlur = 8;
      ctx.strokeRect(x - 4.5, yA - 4.5, c + 9, yB + c - yA + 9); ctx.restore();
    }
    // the parallelogram budget ‖A + B‖² + ‖A − B‖² = 4, filled as the slots come in
    ctx.save();
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(x0 + 0.5, yBar + 0.5, rowW - 1, barH - 1);
    ctx.fillStyle = P.cyan; ctx.globalAlpha = 0.85; ctx.fillRect(x0, yBar, rowW * Pm.partSum / 4, barH);
    ctx.fillStyle = P.magenta; ctx.fillRect(x0 + rowW * Pm.partSum / 4, yBar, rowW * Pm.partDiff / 4, barH);
    ctx.restore();

    // the comparison circle in the (w_A, e⊥) plane
    const R = Math.max(30, Math.min(cb.w * 0.34, cb.h * 0.36)), ox = cb.x + cb.w / 2 - (wide ? 0.04 * cb.w : 0), oy = cb.y + cb.h / 2;
    const X = (x) => ox + R * x, Y = (y) => oy - R * y;
    ring(ctx, ox, oy, R, P.lineHot, 1.3 * TH, { alpha: 0.95 });
    seg(ctx, X(-1.22), oy, X(1.22), oy, P.faint, 1);
    seg(ctx, ox, Y(-1.22), ox, Y(1.22), P.faint, 1);
    ring(ctx, X(1), oy, 13 * TH, P.sigma, 1.2 * TH, { alpha: 0.7, dash: [3, 3] });
    arrow2(ctx, ox, oy, X(1), oy, P.sigma, 2.2 * TH, 10 * TH);
    if (Pm.thNow != null) {
      const sN = Pm.sNow, aN = Pm.aNow;
      ctx.save(); ctx.strokeStyle = P.dim; ctx.lineWidth = 1 * TH; ctx.beginPath();
      if (aN > 1e-6) ctx.arc(ox, oy, R * 0.22, -Pm.thNow, 0); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.setLineDash([5, 4]); arrow2(ctx, ox, oy, X(sN), Y(-aN), P.sigma, 1.5 * TH, 8 * TH, 0.9); ctx.restore();
      seg(ctx, ox, oy, X(sN), oy, P.cyan, 4.6 * TH, { alpha: 0.95 });
      seg(ctx, X(sN), oy, X(sN), Y(aN), P.magenta, 3.6 * TH, { alpha: 0.95 });
      ctx.save(); ctx.shadowColor = P.amber; ctx.shadowBlur = TRV.thumbMode ? 0 : 12;
      arrow2(ctx, ox, oy, X(sN), Y(aN), P.amber, 2.7 * TH, 11 * TH); ctx.restore();
      disc(ctx, X(Pm.productNow), oy, 5.6 * TH, P.violet, { glow: TRV.thumbMode ? 0 : 10 });
      ring(ctx, X(Pm.pureDiff), oy, 8.5 * TH, P.violet, 1.8 * TH);
    }

    // labels, most important first
    stag('cnt', x0 + rowW / 2, yA - 11, `<span class="c-cy">XNOR ${Pm.m}</span> · <span class="c-mg">XOR ${Pm.d}</span>`, 'num');
    stag('bar', x0 + rowW / 2, yBar + barH + 11, `‖A + B‖² + ‖A − B‖² = <span class="c-cy">${fix(Pm.partSum, 1)}</span> + <span class="c-mg">${fix(Pm.partDiff, 1)}</span> = ${fix(Pm.partSum + Pm.partDiff, 1)}`, 'num');
    stag('rA', x0 - 16, yA + c / 2, 'w<sub>A</sub>', 'num');
    stag('rB', x0 - 16, yB + c / 2, 'w<sub>B</sub>', 'num c-am');
    if (Pm.thNow == null) stag('none', ox, oy - R * 0.45, L('还没有比较：没有坐标', 'nothing compared: no coordinates'), 'raw');
    else {
      const sN = Pm.sNow, aN = Pm.aNow;
      stag('cmpAB', X(sN) + (sN < 0 ? -58 : 58), Y(aN) - (aN < 0.15 ? 20 : 6), 'CMP(A, B) = s + aÎ', 'num c-am');
      stag('prod', X(Pm.productNow), oy + 19, `${L('两向乘积', 'two-way product')} ${fix(Pm.productNow, 3)}`, 'num c-vi');
      if (aN > 0.08) stag('cmpBA', X(sN) + (sN < 0 ? -58 : 58), Y(-aN) + 8, 'CMP(B, A) = s − aÎ', 'num');
      if (Math.abs(sN) > 0.12) stag('s', X(sN / 2), oy - 12, `s ${fix(sN, 3)}`, 'num c-cy');
      if (aN > 0.12) stag('a', X(sN) + (sN < 0 ? -30 : 30), Y(aN / 2), `a ${fix(aN, 3)}`, 'num c-mg');
    }
    stag('wA', X(1) + 24, oy - 12, 'w<sub>A</sub>', 'num');
    stag('I', ox + 12, Y(1.13), 'Î', 'num');
    st.end(); declutter();
  }
  function pressPrimitive(ev) {
    const l = primLayout;
    if (!l) return;
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (y < l.yB - 5 || y > l.yB + l.c + 5) return;
    const k = Math.floor((x - l.x0 + l.g / 2) / (l.c + l.g));
    if (k >= 0 && k < NS) flipSlot(k);
  }

  /* ---------- scene 2: the Gram table develops (3D) ---------- */
  function drawLattice(st, Lt) {
    const lay = layout3D(true), B = Lt.B;
    st.begin();
    st.sphere(1, { lat: [0], lon: 2, shade: 0.03, alpha: TRV.thumbMode ? 0.45 : 0.24 });
    if (!Lt.complete) st.circle([0, 0, 0], [0, 0, 1], 1, { color: P.dim, width: 0.9, dash: [3, 5], alpha: 0.55 });
    // alike pairs (G > 0) are the short, bold edges; opposed pairs (G < 0) are long and drawn faint
    for (const [i, j] of Lt.seen) {
      const g = B.G[i][j], hot = S.sel === i || S.sel === j;
      const s = g > EPS ? { color: P.cyan, width: 1.3 + 2.4 * g, alpha: 0.6 + 0.35 * g } : g < -EPS ? { color: P.magenta, width: 0.8, alpha: 0.12 + 0.2 * -g } : { color: P.dim, width: 1, alpha: 0.4 };
      if (hot) { s.width = Math.max(s.width, 2.2); s.alpha = 0.95; }
      st.line(Lt.pos[i], Lt.pos[j], Object.assign(s, { back: 0.5 }));
    }
    if (Lt.cur) st.line(Lt.pos[Lt.cur[0]], Lt.pos[Lt.cur[1]], { color: P.amber, width: 2.8, alpha: Lt.frac > 0 ? 0.3 + 0.7 * Lt.frac : 1, back: 0.75 });
    Lt.pos.forEach((p) => st.dot(p, 5.2, P.sigma, { glow: TRV.thumbMode ? 0 : 8 }));
    if (S.sel >= 0 && S.sel < B.M) st.dot(Lt.pos[S.sel], 9.5, P.amber, { ring: true, width: 2.2 });
    Lt.pos.forEach((p, i) => tag(`w${i}`, p, `w${subs(i)}`, i === S.sel ? 'num c-am' : 'num', { dx: 15, dy: -11 }));
    if (S.sel >= 0 && S.sel < B.M) {
      for (const [i, j] of Lt.seen) if (i === S.sel || j === S.sel) {
        const o = i === S.sel ? j : i, g = B.G[i][j];
        tag(`g${o}`, Lt.pos[o], fix(g, 2), `num ${gClass(g)}`, { dx: 15, dy: 11 });
      }
    }
    if (lay.box) gramInset(st, Lt, lay.box);
    st.end(); declutter();
  }
  function gramInset(st, Lt, b) {
    const ctx = st.ctx, B = Lt.B, M = B.M, top = TRV.thumbMode ? 8 : 20;
    const cell = Math.max(4, Math.floor(Math.min((b.w - 14) / M, (b.h - top - 8) / M))), gw = cell * M;
    const x0 = b.x + (b.w - gw) / 2, y0 = b.y + top + Math.max(0, (b.h - top - 8 - gw) / 2);
    insetFrame(ctx, b);
    ctx.save();
    for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) {
      const g = B.G[i][j], known = i === j || Lt.seenSet.has(Math.min(i, j) * 16 + Math.max(i, j));
      if (known) { ctx.globalAlpha = 0.2 + 0.72 * Math.abs(g); ctx.fillStyle = gColor(g); ctx.fillRect(x0 + j * cell + 1, y0 + i * cell + 1, cell - 2, cell - 2); }
      else { ctx.globalAlpha = 0.7; ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(x0 + j * cell + 1.5, y0 + i * cell + 1.5, cell - 3, cell - 3); }
    }
    ctx.globalAlpha = 1;
    if (S.sel >= 0 && S.sel < M) { ctx.strokeStyle = P.sigma; ctx.lineWidth = 1.2; ctx.strokeRect(x0 + 0.5, y0 + S.sel * cell + 0.5, gw - 1, cell - 1); }
    if (Lt.cur) {
      ctx.strokeStyle = P.amber; ctx.lineWidth = 2 * TH;
      const [i, j] = Lt.cur;
      ctx.strokeRect(x0 + j * cell + 0.5, y0 + i * cell + 0.5, cell - 1, cell - 1);
      ctx.strokeRect(x0 + i * cell + 0.5, y0 + j * cell + 0.5, cell - 1, cell - 1);
    }
    ctx.restore();
    stag('gT', b.x + b.w / 2, b.y + 10, L('相似表 G', 'similarity table G'), 'raw');
  }

  /* ---------- scene 3: folding (2D) ---------- */
  function drawLagrange(st, Lg) {
    st.begin();
    const F = frameBox(), [bl, br] = panels(F);
    // left: the plane of u and v
    const g = plotL = boxPlot(F, bl, [-1.32, 1.32], [-1.32, 1.32]), ctx = g.ctx;
    plotR = null;
    g.line(circlePts(1), P.lineHot, { width: 1.1 * TH });
    g.line([[-1.3, 0], [1.3, 0]], P.faint, { width: 1 }); g.line([[0, -1.3], [0, 1.3]], P.faint, { width: 1 });
    const u = Lg.u, v = Lg.v, uv = [u[0] + v[0], u[1] + v[1]];
    g.poly([[0, 0], u, uv, v], P.magenta, { alpha: 0.2, stroke: P.magenta, strokeAlpha: 0.5, width: 1.2 * TH });
    const nu2 = u[0] * u[0] + u[1] * u[1], foot = [u[0] * Lg.same / nu2, u[1] * Lg.same / nu2];
    g.line([v, foot], P.dim, { width: 1 * TH, dash: [3, 4] });
    g.line([[0, 0], foot], P.cyan, { width: 4.6 * TH, alpha: 0.95 });
    garrow(g, [0, 0], u, P.sigma, 2.3 * TH, 10 * TH);
    garrow(g, [0, 0], Lg.ubar, P.sigma, 1.5 * TH, 8 * TH, { dash: [5, 4], alpha: 0.85 });
    garrow(g, [0, 0], v, P.amber, 2.7 * TH, 11 * TH, { glow: TRV.thumbMode ? 0 : 12 });
    ring(ctx, g.X(v[0]), g.Y(v[1]), 9 * TH, P.amber, 1.8 * TH);
    // right: the comparison ū v as one point; under it the split of |u|²|v|²
    const barSpace = TRV.thumbMode ? 18 : 30, br2 = { x: br.x, y: br.y, w: br.w, h: Math.max(40, br.h - barSpace) };
    const h = plotR = boxPlot(F, br2, [-1.35, 1.35], [-1.35, 1.35]);
    h.line([[-1.32, 0], [1.32, 0]], P.faint, { width: 1 }); h.line([[0, -1.32], [0, 1.32]], P.faint, { width: 1 });
    h.line(circlePts(Lg.normU * Lg.normV), P.sigma, { width: 1.2 * TH, dash: [5, 4], alpha: 0.8 });
    h.line([[0, 0], [Lg.same, 0]], P.cyan, { width: 4.6 * TH, alpha: 0.95 });
    h.line([[Lg.same, 0], [Lg.same, Lg.wedge]], P.magenta, { width: 3.8 * TH, alpha: 0.95 });
    h.line([[0, 0], [Lg.same, Lg.wedge]], P.violet, { width: 1.8 * TH, alpha: 0.9 });
    ring(ctx, h.X(Lg.mirror), h.Y(0), 7.5 * TH, P.violet, 1.7 * TH);
    disc(ctx, h.X(Lg.same), h.Y(Lg.wedge), 5.6 * TH, P.violet, { glow: TRV.thumbMode ? 0 : 10 });
    const bw = h.iw * 0.86, bx = h.pl + (h.iw - bw) / 2, by = br.y + br.h - barSpace + (TRV.thumbMode ? 4 : 6), bh = 8 * TH, maxL = 1.25 * 1.25;
    ctx.save(); ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
    ctx.globalAlpha = 0.85; ctx.fillStyle = P.cyan; ctx.fillRect(bx, by, bw * Lg.samenessSq / maxL, bh);
    ctx.fillStyle = P.magenta; ctx.fillRect(bx + bw * Lg.samenessSq / maxL, by, bw * Lg.wedgeSq / maxL, bh); ctx.restore();
    // labels
    stag('tL', bl.x + bl.w / 2, bl.y + 8, L('平面：u 与 v', 'the plane: u and v'), 'raw');
    stag('tR', br.x + br.w / 2, br.y + 8, L('比较 ū v：横是同，纵是楔', 'the comparison ū v: across sameness, up wedge'), 'raw');
    stag('v', g.X(v[0] * 1.13), g.Y(v[1] * 1.13), 'v', 'num c-am');
    stag('C', h.X(Lg.same) + (Lg.same < 0 ? -22 : 22), h.Y(Lg.wedge) - 12, 'ū v', 'num c-vi');
    if (Math.abs(Lg.wedge) > 0.05) stag('wedge', g.X(uv[0] / 2), g.Y(uv[1] / 2), `u ∧ v ${kit.sgn(Lg.wedge, 3)}`, 'num c-mg');
    else stag('wedge', g.X(uv[0] / 2) + 26, g.Y(uv[1] / 2) - 12, 'u ∧ u = 0', 'num c-mg');
    stag('same', g.X(foot[0] / 2) + 16, g.Y(foot[1] / 2) + 14, `⟨u, v⟩ ${kit.sgn(Lg.same, 3)}`, 'num c-cy');
    stag('u', g.X(u[0] * 1.14), g.Y(u[1] * 1.14), 'u', 'num');
    stag('ubar', g.X(Lg.ubar[0] * 1.14), g.Y(Lg.ubar[1] * 1.14), 'ū', 'num');
    stag('mir', h.X(Lg.mirror) - 8, h.Y(0) + 19, 'u ū = |u|²', 'num c-vi');
    if (Math.abs(Lg.wedge) > 0.15) stag('wl', h.X(Lg.same) + (Lg.same < 0 ? -26 : 26), h.Y(Lg.wedge / 2), L('楔', 'wedge'), 'raw c-mg');
    if (Math.abs(Lg.same) > 0.2) stag('sl', h.X(Lg.same / 2), h.Y(0) + 13, L('同', 'sameness'), 'raw c-cy');
    stag('bar', bx + bw / 2, by + bh + 11, `|u|²|v|² = <span class="c-cy">${fix(Lg.samenessSq, 3)}</span> + <span class="c-mg">${fix(Lg.wedgeSq, 3)}</span>`, 'num');
    st.end(); declutter();
  }
  function drawMinkowski(st, Mk) {
    st.begin();
    const F = frameBox(), [bl, br] = panels(F);
    const g = plotL = boxPlot(F, bl, [-0.16, 1.22], [-0.16, 1.22]), ctx = g.ctx;
    const arc = Array.from({ length: 61 }, (_, i) => [Math.cos(i * Math.PI / 120), Math.sin(i * Math.PI / 120)]);
    g.line([[0, 0], [1.16, 0]], P.faint, { width: 1 }); g.line([[0, 0], [0, 1.16]], P.faint, { width: 1 });
    g.line(arc, P.sigma, { width: 1.7 * TH, alpha: 0.9 });
    g.line([[0, 0], [Mk.dtau, Mk.dx]], P.dim, { width: 1 * TH, alpha: 0.8 });
    g.line([[0, 0], [Mk.dtau, 0]], P.cyan, { width: 4.6 * TH, alpha: 0.95 });
    g.line([[Mk.dtau, 0], [Mk.dtau, Mk.dx]], P.magenta, { width: 3.8 * TH, alpha: 0.95 });
    disc(ctx, g.X(Mk.dtau), g.Y(Mk.dx), 5.8 * TH, P.amber, { glow: TRV.thumbMode ? 0 : 12 });
    ring(ctx, g.X(Mk.dtau), g.Y(Mk.dx), 9.5 * TH, P.amber, 1.8 * TH);
    // right: spacetime, c dt = 1
    const h = plotR = boxPlot(F, br, [-1.22, 1.22], [-0.1, 1.36]);
    h.line([[-1.3, 0], [1.3, 0]], P.faint, { width: 1 }); h.line([[0, 0], [0, 1.34]], P.faint, { width: 1 });
    h.line([[0, 0], [1.3, 1.3]], P.sigma, { width: 1.4 * TH, dash: [6, 4], alpha: 0.85 });
    h.line([[0, 0], [-1.3, 1.3]], P.sigma, { width: 1.4 * TH, dash: [6, 4], alpha: 0.85 });
    h.line([[-1.22, 1], [1.22, 1]], P.dim, { width: 1, dash: [3, 4] });
    const hyp = [];
    for (let i = 0; i <= 120; i++) { const x = -1.22 + 2.44 * i / 120, y = Math.sqrt(Mk.dtau * Mk.dtau + x * x); if (y <= 1.36) hyp.push([x, y]); else hyp.push(null); }
    h.line(hyp, P.cyan, { width: 2 * TH, alpha: 0.9 });
    h.line([[0, 0], [0, Mk.dtau]], P.cyan, { width: 4.6 * TH, alpha: 0.95 });
    h.line([[0, 1], [Mk.dx, 1]], P.magenta, { width: 3.8 * TH, alpha: 0.95 });
    garrow(h, [0, 0], Mk.event, P.amber, 2.6 * TH, 10 * TH, { glow: TRV.thumbMode ? 0 : 10 });
    disc(ctx, h.X(Mk.dx), h.Y(1), 5.6 * TH, P.amber, { glow: TRV.thumbMode ? 0 : 12 });
    // labels
    stag('tL', bl.x + bl.w / 2, bl.y + 8, L('单位比较预算', 'unit comparison budget'), 'raw');
    stag('tR', br.x + br.w / 2, br.y + 8, L('时空图（c dt = 1）', 'spacetime (c dt = 1)'), 'raw');
    stag('dtau', g.X(Mk.dtau / 2), g.Y(0) + 14, `dτ/dt ${fix(Mk.dtau, 3)}`, 'raw c-cy');
    stag('dx', g.X(Mk.dtau) + 46, g.Y(Mk.dx / 2), `dx/(c dt) ${fix(Mk.dx, 3)}`, 'num c-mg');
    stag('circ', g.X(0.36), g.Y(1.08), 'cos²θ + sin²θ = 1', 'num');
    stag('ev', h.X(Mk.dx) + 26, h.Y(1) - 14, L('事件', 'event'), 'raw c-am');
    stag('ctau', h.X(0) - 36, h.Y(Mk.dtau / 2 + 0.02), `c dτ ${fix(Mk.dtau, 3)}`, 'raw c-cy');
    if (Mk.dx > 0.12) stag('dxR', h.X(Mk.dx / 2), h.Y(1) + 13, `dx ${fix(Mk.dx, 3)}`, 'num c-mg');
    stag('cone', h.X(-0.86), h.Y(0.98) - 14, L('光锥 dx = ±c dt', 'light cone dx = ±c dt'), 'num');
    st.end(); declutter();
  }
  function drag(ev, st) {
    if (grab === 'fold') dragFold(ev);
    else if (grab === 'w') {
      const q = st.pick(ev), b = Math.atan2(Math.max(0, q[2]), Math.hypot(q[0], q[1]));
      S.phi = Math.round((Math.atan2(q[1], q[0]) / DEG + 360) % 360) % 360; fPhi.set(S.phi);
      leave(); clock.pause(); clock.set(clamp(b / DEG, 0, 90));
    }
  }
  const inPlot = (g, x, y) => !!g && x >= g.pl - 14 && x <= g.pl + g.iw + 14 && y >= g.pt - 14 && y <= g.pt + g.ih + 14;
  function dragFold(ev) {
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (S.fold === 'lagrange') {
      if (!inPlot(plotL, x, y)) return;
      const dx = plotL.invX(x), dy = plotL.invY(y), r = Math.hypot(dx, dy);
      if (r < 0.08) return;
      let ph = Math.atan2(dy, dx) / DEG;
      if (ph < 0) ph = ph < -90 ? 180 : 0;
      S.vLen = clamp(Math.round(r * 100) / 100, 0.3, 1.25); fVlen.set(S.vLen);
      leave(); clock.pause(); clock.set(ph);
    } else if (inPlot(plotL, x, y)) {
      leave(); clock.pause(); clock.set(clamp(Math.atan2(plotL.invY(y), plotL.invX(x)) / DEG, 0, 90));
    } else if (inPlot(plotR, x, y)) {
      leave(); clock.pause(); clock.set(Math.asin(clamp(plotR.invX(x), 0, 1)) / DEG);
    }
  }

  /* ---------- scene 4: expansion ---------- */
  function drawResidual(st, Rs) {
    layout3D(false);
    st.begin();
    const E = 1.15;
    st.poly([[-E, -E, 0], [E, -E, 0], [E, E, 0], [-E, E, 0]], { fill: P.cyan, alpha: 0.07, color: P.lineHot, strokeAlpha: 0.85 });
    for (let k = -1; k <= 1; k++) {
      const c = k * E / 2;
      st.line([c, -E, 0], [c, E, 0], { color: P.panelEdge, width: 0.8, alpha: 0.9 });
      st.line([-E, c, 0], [E, c, 0], { color: P.panelEdge, width: 0.8, alpha: 0.9 });
    }
    st.circle([0, 0, 0], [0, 0, 1], 1, { color: P.lineHot, width: 1, alpha: 0.8 });
    const meridian = Array.from({ length: 41 }, (_, i) => { const a = i * Math.PI / 80; return [Math.cos(a) * Math.cos(S.phi * DEG), Math.cos(a) * Math.sin(S.phi * DEG), Math.sin(a)]; });
    st.path(meridian, { color: P.dim, width: 0.9, dash: [3, 4], alpha: 0.7 });
    st.arrow([0, 0, 0], [1, 0, 0], { color: P.sigma, width: 1.6, headSize: 8 });
    st.arrow([0, 0, 0], [0, 1, 0], { color: P.sigma, width: 1.6, headSize: 8 });
    if (Rs.residualNorm > 1e-3) st.line([0, 0, 0], [0, 0, 1.22], { color: P.violet, width: 1.7, dash: [6, 5], alpha: 0.95 });
    st.arrow([0, 0, 0], Rs.Pw, { color: P.cyan, width: 3.4, headSize: 10, alpha: 0.95 });
    if (Rs.residualNorm > 1e-3) {
      st.line(Rs.Pw, Rs.w, { color: P.magenta, width: 3.4, alpha: 0.95, back: 0.8 });
      const ux = v3.unit(Rs.Pw), q = 0.075;
      st.path([v3.sub(Rs.Pw, v3.scale(ux, q)), v3.add(v3.sub(Rs.Pw, v3.scale(ux, q)), [0, 0, q]), v3.add(Rs.Pw, [0, 0, q])], { color: P.sigma, width: 1, alpha: 0.85 });
    }
    st.arrow([0, 0, 0], Rs.w, { color: P.amber, width: 2.8, glow: TRV.thumbMode ? 0 : 12, headSize: 11, fade: false });
    st.dot(Rs.w, 9, P.amber, { ring: true, width: 2, fade: false });
    // labels
    tag('w', Rs.w, 'w', 'num c-am', { dx: 16, dy: -12, fade: false });
    tag('e1', [1.08, 0, 0], 'e₁', 'num');
    tag('e2', [0, 1.1, 0], 'e₂', 'num');
    tag('pw', v3.scale(Rs.Pw, 0.55), 'P w', 'num c-cy', { dy: 14 });
    if (Rs.residualNorm > 0.08) tag('r', v3.lerp(Rs.Pw, Rs.w, 0.5), 'r = (I − P)w', 'num c-mg', { dx: 52 });
    if (Rs.residualNorm > 1e-3) tag('e3', [0, 0, 1.3], 'e₃ = r/‖r‖', 'num c-vi', { dx: 34 });
    tag('V2', [E, -E, 0], '𝒱₂ = span(e₁, e₂)', 'num', { dx: -10, dy: 14 });
    st.end(); declutter();
  }
  function drawMemo(st, Me) {
    st.begin();
    const ctx = st.ctx, F = frameBox(), [bl, br] = panels(F);
    plotL = null;
    // the prefix trie: root at the top, the sixteen states at the bottom
    const arcH = Math.min(46, bl.h * 0.2), top = bl.y + (TRV.thumbMode ? 10 : 24), lev = (bl.h - (top - bl.y) - arcH - 10) / NBITS;
    const dx = (bl.w - 28) / NSTATES, xl = (i) => bl.x + 14 + (i + 0.5) * dx, yl = (l) => top + l * lev;
    const xn = (l, p) => bl.x + 14 + (p + 0.5) * (1 << (NBITS - l)) * dx;
    memoLayout = { xl, yl, lev, dx, yLeaf: yl(NBITS) };
    for (let l = 1; l <= NBITS; l++) for (let p = 0; p < (1 << l); p++) {
      const on = l <= Me.b;
      seg(ctx, xn(l - 1, p >> 1), yl(l - 1), xn(l, p), yl(l), on ? P.cyan : P.dim, (on ? 1.8 : 1) * TH, { alpha: on ? 0.9 : 0.45 });
    }
    for (let l = 1; l <= Me.b; l++) seg(ctx, xn(l - 1, prefix(Me.key, l - 1)), yl(l - 1), xn(l, prefix(Me.key, l)), yl(l), P.amber, 3 * TH, { glow: TRV.thumbMode ? 0 : 8 });
    for (let l = 0; l <= NBITS; l++) for (let p = 0; p < (1 << l); p++) {
      const on = l <= Me.b;
      disc(ctx, xn(l, p), yl(l), (l === NBITS ? 3.4 : on ? 3.4 : 2.2) * TH, l === NBITS ? P.sigma : on ? P.cyan : P.dim, { alpha: on || l === NBITS ? 1 : 0.6 });
    }
    // buckets and the pairs inside each bucket that the readout cannot separate
    const yL = yl(NBITS);
    for (let q = 0; q < Me.buckets; q++) {
      const i0 = q * Me.size, i1 = i0 + Me.size - 1, mine = q === Me.keyPrefix;
      ctx.save(); ctx.strokeStyle = mine ? P.amber : Me.size > 1 ? P.magenta : P.cyan; ctx.lineWidth = (mine ? 1.8 : 1.2) * TH; ctx.globalAlpha = mine ? 1 : 0.75;
      ctx.strokeRect(xl(i0) - dx * 0.42, yL - 7, (i1 - i0) * dx + dx * 0.84, 14); ctx.restore();
      for (let i = i0; i <= i1; i++) for (let j = i + 1; j <= i1; j++) {
        const rx = (xl(j) - xl(i)) / 2, ry = Math.min(arcH - 6, rx * 0.85);
        ctx.save(); ctx.strokeStyle = P.magenta; ctx.globalAlpha = 0.6; ctx.lineWidth = 1.3 * TH;
        ctx.beginPath(); ctx.ellipse((xl(i) + xl(j)) / 2, yL + 8, rx, ry, 0, 0, Math.PI); ctx.stroke(); ctx.restore();
      }
    }
    disc(ctx, xl(Me.key), yL, 4.6 * TH, P.amber, { glow: TRV.thumbMode ? 0 : 10 });
    // the self-comparison cobweb
    const g = plotR = boxPlot(F, br, [-0.05, 1.1], [-0.05, 1.1]);
    g.line([[0, 0], [1.08, 0]], P.faint, { width: 1 }); g.line([[0, 0], [0, 1.08]], P.faint, { width: 1 });
    g.line([[0, 0], [1.08, 1.08]], P.dim, { width: 1.1 * TH, dash: [5, 4] });
    g.line(Array.from({ length: 81 }, (_, i) => { const x = 1.08 * i / 80; return [x, Math.cos(x)]; }), P.cyan, { width: 2.2 * TH, alpha: 0.95 });
    g.line([[DOTTIE, 0], [DOTTIE, DOTTIE], [0, DOTTIE]], P.sigma, { width: 1, dash: [2, 4], alpha: 0.7 });
    const web = [[Me.xs[0], 0]];
    for (let i = 0; i < Me.n; i++) { web.push([Me.xs[i], Me.xs[i + 1]]); web.push([Me.xs[i + 1], Me.xs[i + 1]]); }
    if (Me.frac > 0 && Me.n < NCOB) {
      const a = Me.xs[Me.n], b2 = Me.xs[Me.n + 1], f = TRV.smooth(Me.frac);
      if (f < 0.5) web.push([a, a + (b2 - a) * 2 * f]); else { web.push([a, b2]); web.push([a + (b2 - a) * (2 * f - 1), b2]); }
    }
    g.line(web, P.sigma, { width: 1.3 * TH, alpha: 0.85 });
    ring(ctx, g.X(DOTTIE), g.Y(DOTTIE), 7 * TH, P.sigma, 1.4 * TH);
    const cur = Me.n === 0 ? [0, 0] : [Me.x, Me.x];
    disc(ctx, g.X(cur[0]), g.Y(cur[1]), 5.4 * TH, P.amber, { glow: TRV.thumbMode ? 0 : 12 });
    // labels
    stag('tL', bl.x + bl.w / 2, bl.y + 9, L(`前缀树 · 读前 ${Me.b} 位`, `prefix trie · first ${Me.b} bits`), 'raw');
    stag('tR', br.x + br.w / 2, br.y + 9, L('自比较 xₙ₊₁ = cos xₙ', 'self-comparison xₙ₊₁ = cos xₙ'), 'raw');
    stag('key', xl(Me.key), yL - 15, bin4(Me.key), 'num c-am');
    stag('lev', bl.x + 18, yl(Me.b), `b = ${Me.b}`, 'num c-am');
    stag('cos', g.X(0.2) + 30, g.Y(Math.cos(0.2)) - 10, 'y = cos x', 'num c-cy');
    stag('yx', g.X(1.0) - 4, g.Y(1.0) - 14, 'y = x', 'num');
    stag('fp', g.X(DOTTIE) + 52, g.Y(DOTTIE) + 12, `θ* ≈ ${fix(DOTTIE, 4)}`, 'num');
    stag('xn', g.X(cur[0]) - 38, g.Y(cur[1]) - 12, `x${subs(Me.n)} ${fix(Me.x, 4)}`, 'num c-am');
    st.end(); declutter();
  }
  function pressMemo(ev) {
    const l = memoLayout;
    if (!l) return;
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (Math.abs(y - l.yLeaf) < Math.max(14, l.lev * 0.45)) {
      let best = -1, bd = l.dx;
      for (let i = 0; i < NSTATES; i++) { const d = Math.abs(l.xl(i) - x); if (d < bd) { bd = d; best = i; } }
      if (best >= 0) { S.key = best; leave(); paint(); }
      return;
    }
    const lvl = Math.round((y - l.yl(0)) / l.lev);
    if (lvl >= 1 && lvl <= NBITS && x >= l.xl(0) - l.dx && x <= l.xl(NSTATES - 1) + l.dx) setBits(lvl);
  }

  /* ---------- picking ---------- */
  function pick(ev, st) {
    grab = null;
    if (S.scene === 'primitive') { pressPrimitive(ev); return true; }
    if (S.scene === 'folding') { grab = 'fold'; dragFold(ev); return true; }
    if (S.scene === 'expansion' && S.exp === 'memo') { pressMemo(ev); return true; }
    if (S.scene === 'lattice' && last && last.Lt) {
      const i = last.Lt.pos.findIndex((p) => st.near(ev, p) < 16);
      if (i >= 0) { S.sel = S.sel === i ? -1 : i; paint(); return true; }
      return false;
    }
    if (S.scene === 'expansion' && last && last.Rs && st.near(ev, last.Rs.w) < 26) { grab = 'w'; return true; }
    return false;
  }

  function drawStage(snap) {
    const st = stage;
    if (snap.key === 'primitive') drawPrimitive(st, snap.Pm);
    else if (snap.key === 'lattice') drawLattice(st, snap.Lt);
    else if (snap.key === 'lagrange') drawLagrange(st, snap.Lg);
    else if (snap.key === 'minkowski') drawMinkowski(st, snap.Mk);
    else if (snap.key === 'residual') drawResidual(st, snap.Rs);
    else drawMemo(st, snap.Me);
  }

  /* ---------- the strip: one question per plot ---------- */
  const PAD = [36, 10, 10, 22];
  function drawPlots(snap) {
    const A = $('plotA'), B = $('plotB'), k = snap.key;
    if (k === 'primitive') return plotsPrimitive(A, B, snap.Pm);
    if (k === 'lattice') return plotsLattice(A, B, snap.Lt);
    if (k === 'lagrange') return plotsLagrange(A, B, snap.Lg);
    if (k === 'minkowski') return plotsMinkowski(A, B, snap.Mk);
    if (k === 'residual') return plotsResidual(A, B, snap.Rs);
    return plotsMemo(A, B, snap.Me);
  }
  function plotsPrimitive(A, B, Pm) {
    const g = kit.plot(A, { x: [0, 8], y: [0, 8.4], pad: PAD });
    g.axes({ xTicks: [0, 2, 4, 6, 8], yTicks: [0, 4, 8] });
    const cm = [[0, 0]], cd = [[0, 0]];
    let m = 0, d = 0;
    Pm.prod.forEach((p, j) => { if (p > 0) m++; else d++; cm.push([j + 1, m]); cd.push([j + 1, d]); });
    g.line(cm, P.cyan, { width: 1, alpha: 0.35, dash: [3, 3] }); g.line(cd, P.magenta, { width: 1, alpha: 0.35, dash: [3, 3] });
    g.line(cm.slice(0, Pm.k + 1), P.cyan, { width: 2 }); g.line(cd.slice(0, Pm.k + 1), P.magenta, { width: 2 });
    g.vline(Pm.k + Pm.frac, P.amber, { alpha: 0.8 });
    const h = kit.plot(B, { x: [-1, 1], y: [-1.15, 1.15], pad: PAD });
    h.axes({ xTicks: [-1, -0.5, 0, 0.5, 1], yTicks: [-1, 0, 1] });
    h.hline(1, P.sigma, { dash: [4, 3], alpha: 0.8 });
    h.vline(-1, P.dim, { dash: [2, 3] });
    h.line([[-1, 1], [1, -1]], P.violet, { width: 1.2, dash: [4, 3], alpha: 0.75 });
    h.line([[-1, Pm.s * Pm.s + Pm.a * Pm.a], [1, Pm.s * Pm.s - Pm.a * Pm.a]], P.violet, { width: 2 });
    h.dot(S.kappa, Pm.product, P.amber, 4.5, { glow: 8 });
  }
  function plotsLattice(A, B, Lt) {
    const M = Lt.B.M, sp = Lt.partSpectrum, lo = Math.min(-0.4, ...sp), hi = Math.max(3.3, ...sp);
    const g = kit.plot(A, { x: [0.4, M + 0.6], y: [lo - 0.1, hi + 0.2], pad: PAD });
    g.axes({ xTicks: Array.from({ length: M }, (_, i) => i + 1), yTicks: [0, 1, 2, 3] });
    g.hline(0, P.lineHot);
    sp.forEach((l, i) => g.rect(i + 1 - 0.3, 0, i + 1 + 0.3, l, i < 3 && l > 0 ? P.cyan : P.magenta, { alpha: 0.75 }));
    const h = kit.plot(B, { x: [0, 4.1], y: [0, 4.1], pad: PAD });
    h.axes({ xTicks: [0, 1, 2, 3, 4], yTicks: [0, 2, 4] });
    h.line([[0, 0], [4.1, 4.1]], P.dim, { dash: [4, 3] });
    for (const [d2, x2] of Lt.scatter) h.dot(d2, x2, P.sigma, 2.8);
    if (Lt.cur && Lt.frac === 0) { const [i, j] = Lt.cur, e = v3.sub(Lt.B.X[i], Lt.B.X[j]); h.dot(2 * (1 - Lt.B.G[i][j]), v3.dot(e, e), P.amber, 5, { glow: 8 }); }
  }
  function plotsLagrange(A, B, Lg) {
    const mx = Lg.lhs * 1.08 + 0.02, tot = [], same = [], wed = [], lim = Lg.normU * Lg.normV;
    for (let i = 0; i <= 90; i++) { const st = lagrangeState(2 * i); tot.push([2 * i, st.lhs]); same.push([2 * i, st.samenessSq]); wed.push([2 * i, st.wedge]); }
    const g = kit.plot(A, { x: [0, 180], y: [0, mx], pad: PAD });
    g.axes({ xTicks: [0, 45, 90, 135, 180], yTicks: [0, 0.5, 1, 1.5].filter((y) => y <= mx) });
    g.area(tot, P.magenta, { alpha: 0.35 }); g.area(same, P.cyan, { alpha: 0.5 });
    g.line(tot, P.sigma, { width: 1.4 });
    g.vline(Lg.phiV, P.amber, { alpha: 0.8 });
    const h = kit.plot(B, { x: [0, 180], y: [-1.6, 1.6], pad: PAD });
    h.axes({ xTicks: [0, 45, 90, 135, 180], yTicks: [-1, 0, 1] });
    h.hline(lim, P.sigma, { dash: [4, 3] }); h.hline(-lim, P.sigma, { dash: [4, 3] }); h.hline(0, P.lineHot);
    h.line(wed, P.magenta, { width: 2 });
    h.vline(S.uDeg, P.dim, { dash: [2, 3] });
    h.dot(Lg.phiV, Lg.wedge, P.amber, 4.5, { glow: 8 });
  }
  function plotsMinkowski(A, B, Mk) {
    const cos2 = [], one = [], c = [], s = [];
    for (let i = 0; i <= 90; i++) { const th = i * DEG; cos2.push([i, Math.cos(th) ** 2]); one.push([i, 1]); c.push([i, Math.cos(th)]); s.push([i, Math.sin(th)]); }
    const g = kit.plot(A, { x: [0, 90], y: [0, 1.08], pad: PAD });
    g.axes({ xTicks: [0, 30, 60, 90], yTicks: [0, 0.5, 1] });
    g.area(one, P.magenta, { alpha: 0.35 }); g.area(cos2, P.cyan, { alpha: 0.5 }); g.line(one, P.sigma, { width: 1.4 });
    g.vline(Mk.thetaDeg, P.amber, { alpha: 0.8 });
    const h = kit.plot(B, { x: [0, 90], y: [0, 1.08], pad: PAD });
    h.axes({ xTicks: [0, 30, 60, 90], yTicks: [0, 0.5, 1] });
    h.line(c, P.cyan, { width: 2 }); h.line(s, P.magenta, { width: 2 });
    h.dot(Mk.thetaDeg, Mk.dtau, P.amber, 4.5, { glow: 8 }); h.dot(Mk.thetaDeg, Mk.dx, P.amber, 3.5);
  }
  function plotsResidual(A, B, Rs) {
    const cos2 = [], one = [], lo = [], mid = [], hi = [];
    for (let i = 0; i <= 90; i++) { const b = i * DEG; cos2.push([i, Math.cos(b) ** 2]); one.push([i, 1]); lo.push([i, 1 - Math.cos(b)]); mid.push([i, 1]); hi.push([i, 1 + Math.cos(b)]); }
    const g = kit.plot(A, { x: [0, 90], y: [0, 1.08], pad: PAD });
    g.axes({ xTicks: [0, 30, 60, 90], yTicks: [0, 0.5, 1] });
    g.area(one, P.magenta, { alpha: 0.35 }); g.area(cos2, P.cyan, { alpha: 0.5 }); g.line(one, P.sigma, { width: 1.4 });
    g.vline(Rs.betaDeg, P.amber, { alpha: 0.8 });
    const h = kit.plot(B, { x: [0, 90], y: [0, 2.1], pad: PAD });
    h.axes({ xTicks: [0, 30, 60, 90], yTicks: [0, 1, 2] });
    h.line(hi, P.cyan, { width: 2 }); h.line(mid, P.dim, { width: 1.4, dash: [4, 3] }); h.line(lo, P.magenta, { width: 2 });
    h.vline(Rs.betaDeg, P.amber, { alpha: 0.8 });
    h.dot(Rs.betaDeg, Rs.eigenvalues[2], P.amber, 4.5, { glow: 8 });
  }
  function plotsMemo(A, B, Me) {
    const g = kit.plot(A, { x: [-0.6, 4.6], y: [0, 260], pad: PAD });
    g.axes({ xTicks: [0, 1, 2, 3, 4], yTicks: [0, 100, 200] });
    for (let b = 0; b <= NBITS; b++) g.rect(b - 0.3, 0, b + 0.3, escapeCount(b), b === Me.b ? P.amber : P.magenta, { alpha: b === Me.b ? 0.85 : 0.55 });
    const err = Me.xs.map((x) => Math.max(1e-12, Math.abs(x - DOTTIE))), floor = 10 ** Math.floor(Math.log10(Math.min(...err)));
    const h = kit.plot(B, { x: [0, NCOB], y: [floor, 1], logY: true, pad: [40, 10, 10, 22] });
    const ticks = []; for (let e = 0; 10 ** e >= floor; e -= 2) ticks.push([10 ** e, `10${String(e).split('').map((c) => SUPS[c]).join('')}`]);
    h.axes({ xTicks: [0, 6, 12, 18, 24], yTicks: ticks });
    h.line(err.map((_, n) => [n, DOTTIE * Math.sin(DOTTIE) ** n]), P.dim, { dash: [4, 3] });
    err.forEach((e, n) => h.dot(n, e, P.sigma, 2.4));
    h.dot(Me.n, err[Me.n], P.amber, 4.8, { glow: 8 });
  }

  /* ---------- readouts, legend, HUD ---------- */
  const v3s = (v, d) => `(${v.map((x) => fix(x, d)).join(', ')})`;
  const SCENE_NAME = { primitive: ['原语', 'PRIMITIVE'], lattice: ['显影', 'GEOMETRY'], folding: ['折痕', 'FOLDING'], expansion: ['开维', 'EXPANSION'] };
  const SET_NAME = { box8: ['八角盒', 'box of eight'], octa6: ['正八面体', 'octahedron'], perturbed: ['翻一位', 'one bit flipped'] };
  const CODE = { oisc: 'CMP-DUAL', emergence: 'GRAM-SPACE', uncertainty: 'FAIR-SQ', 'time-axis': 'NEW-AXIS', lookup: 'MEMO-TRIE', 'budget-cone': 'MINKOWSKI' };
  function setRo(i, zh, en, val, cls) {
    $(`roL${i}`).textContent = L(zh, en); $(`ro${i}`).innerHTML = val;
    $(`ro${i}`).parentElement.className = `${i === 3 ? 'wide ' : ''}${cls || ''}`.trim();
  }
  const leg = (items) => items.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  function strip(aZh, aEn, aMeta, bZh, bEn, bMeta) {
    $('pATitle').textContent = L(aZh, aEn); $('pAMeta').innerHTML = aMeta;
    $('pBTitle').textContent = L(bZh, bEn); $('pBMeta').innerHTML = bMeta;
  }
  function drawText(snap) {
    const k = snap.key, scName = SCENE_NAME[S.scene];
    let html = '';
    if (k === 'primitive') {
      const Pm = snap.Pm, none = Pm.thNow == null;
      $('roAside').textContent = `k ${Pm.k} / 8 · κ ${fix(S.kappa, 2)}`;
      $('roKeyL').textContent = L('两向乘积 CMP(A, B)·CMP(B, A) = s² − κa²', 'Two-way product CMP(A, B)·CMP(B, A) = s² − κa²');
      $('roKey').textContent = none ? '—' : `(${fix(Pm.productNow, 4)}, 0)`;
      $('roKeySub').textContent = none ? L(' · 还没有比较', ' · nothing compared yet') : Math.abs(S.kappa + 1) < 1e-9 ? L(' · κ = −1：落在 (1, 0)', ' · κ = −1: lands on (1, 0)') : Math.abs(Pm.aNow) < 1e-9 ? L(' · a = 0：仍留在 (1, 0)', ' · a = 0: stays on (1, 0)') : L(` · κ = ${fix(S.kappa, 2)}：离开 (1, 0)`, ` · κ = ${fix(S.kappa, 2)}: off (1, 0)`);
      setRo(1, '同 s = cos θ（前 k 槽）', 'Sameness s = cos θ (first k slots)', none ? '—' : fix(Pm.sNow, 3), 'c');
      setRo(2, '异 a = sin θ（前 k 槽）', 'Difference a = sin θ (first k slots)', none ? '—' : fix(Pm.aNow, 3), 'm');
      setRo(3, '相同 / 不同的槽 · ‖A + B‖² + ‖A − B‖²', 'Equal / unequal slots · ‖A + B‖² + ‖A − B‖²', `${Pm.m} / ${Pm.d} · ${fix(Pm.partSum, 2)} + ${fix(Pm.partDiff, 2)} = ${fix(Pm.partSum + Pm.partDiff, 2)}`);
      setRo(4, '整字的 Born 权重 s²', 'Born weight s² of the whole words', fix(Pm.born, 4));
      setRo(5, '纯差 Î(−Î) = −κ', 'Pure difference Î(−Î) = −κ', fix(Pm.pureDiff, 2), 'm');
      $('roNote').textContent = none ? L('一次比较都还没做：两个字之间没有角度，也没有坐标。', 'Not a single comparison yet: no angle between the words, and no coordinates.')
        : Pm.k < NS ? L(`前 ${Pm.k} 槽的比较：θ = ${fdeg(Pm.thNow / DEG)}。下一个槽进来时它会变；比完八槽才是两个字本身的 θ = ${fdeg(Pm.theta / DEG)}。`, `The comparison of the first ${Pm.k} slots: θ = ${fdeg(Pm.thNow / DEG)}. It moves as the next slot comes in; only after all eight is it the θ = ${fdeg(Pm.theta / DEG)} of the words themselves.`)
          : L(`比完八槽：相同 ${Pm.matches}、不同 ${Pm.mismatches}，‖A + B‖² + ‖A − B‖² = ${fix(Pm.sumSq, 2)} + ${fix(Pm.diffSq, 2)} = 4。两向乘积 s² − κa² 只在 κ = −1 时对每个 θ 都等于 1。`, `All eight slots compared: ${Pm.matches} equal, ${Pm.mismatches} unequal, ‖A + B‖² + ‖A − B‖² = ${fix(Pm.sumSq, 2)} + ${fix(Pm.diffSq, 2)} = 4. The two-way product s² − κa² equals 1 for every θ only when κ = −1.`);
      $('hudBig').textContent = none ? L('原语 · 尚未比较', 'PRIMITIVE · nothing compared') : L(`原语 · s = ${fix(Pm.sNow, 3)}`, `PRIMITIVE · s = ${fix(Pm.sNow, 3)}`);
      $('hudSub').textContent = none ? L('两个字之间还没有角度', 'no angle between the words yet') : L(`前 ${Pm.k} 槽：同 ${Pm.m}、异 ${Pm.d} · θ = ${fdeg(Pm.thNow / DEG)} · 乘积 ${fix(Pm.productNow, 3)}`, `first ${Pm.k} slots: ${Pm.m} equal, ${Pm.d} unequal · θ = ${fdeg(Pm.thNow / DEG)} · product ${fix(Pm.productNow, 3)}`);
      strip('相同与不同的槽', 'Equal and unequal slots so far', L('<span class="c-cy">XNOR</span> · <span class="c-mg">XOR</span> · 横轴：槽', '<span class="c-cy">XNOR</span> · <span class="c-mg">XOR</span> · across: slot'),
        '只有一个平方常数是公平的', 'Only one square constant is fair', L('<span class="c-vi">s² − κa²</span> · 虚线 −κ · 横轴 κ', '<span class="c-vi">s² − κa²</span> · dashed −κ · across κ'));
      html = leg([['am', '现在的比较与槽', 'current comparison and slot'], ['cy', '相同的槽 · 同 s', 'equal slots · sameness s'], ['mg', '不同的槽 · 异 a', 'unequal slots · difference a'], ['vi', '两向乘积 · 圈：Î(−Î)', 'two-way product · ring: Î(−Î)']]);
    } else if (k === 'lattice') {
      const Lt = snap.Lt, B = Lt.B, nm = SET_NAME[S.set];
      $('roAside').textContent = L(nm[0], nm[1]);
      $('roKeyL').textContent = L('格拉姆秩 → 坐标的维数', 'Gram rank → dimensions of the coordinates');
      $('roKey').textContent = Lt.complete ? `${L('秩', 'rank')} ${B.rank}` : `${Lt.k} / ${B.P} ${L('对', 'pairs')}`;
      $('roKeySub').textContent = Lt.complete ? (B.rank <= 3 ? L(' · 三维放得下，d² = 2(1 − G) 全部吻合', ' · fits in three dimensions, d² = 2(1 − G) for every pair') : L(' · 第四个方向装不下', ' · a fourth direction does not fit')) : L(' · 坐标尚未确定', ' · coordinates not fixed yet');
      setRo(1, '已比较的对', 'Pairs compared', `${Lt.k} / ${B.P}`, 'a');
      setRo(2, '全表的谱 λ（前四个）', 'Spectrum λ of the full table (top four)', B.lam.slice(0, 4).map((x) => fix(x, 3)).join(' · '));
      if (S.sel >= 0 && S.sel < B.M) setRo(3, `w${subs(S.sel)} 那一行 G（已揭开的）`, `Row of w${subs(S.sel)} in G (revealed)`, B.G[S.sel].map((g, j) => (j === S.sel || Lt.seenSet.has(Math.min(j, S.sel) * 16 + Math.max(j, S.sel)) ? `<span class="${gClass(g)}">${fix(g, 2)}</span>` : '·')).join(' '));
      else setRo(3, '点舞台上的一个字，看它那一行 G', 'Tap a word on the stage to read its row of G', '—');
      setRo(4, '全表最小的特征值', 'Smallest eigenvalue of the full table', fix(B.lam[B.M - 1], 4));
      setRo(5, '前三维的距离误差（已揭开的对）', 'Distance error in three dimensions (revealed pairs)', sci(Lt.maxErr), B.rank > 3 && Lt.maxErr > 1e-6 ? 'm' : '');
      $('roNote').textContent = !Lt.complete ? L('揭开的对在三维里连成线，节点的位置是显示用的插值：只有表填满时，它们才是谱嵌入的坐标。', 'Revealed pairs join as lines in three dimensions; the node positions are a display interpolation, and only once the table is full are they the coordinates of the spectral embedding.')
        : B.rank <= 3 ? L(`表填满了：G 半正定、秩 ${B.rank}，谱因子给出 G = XXᵀ，每对的 d² = 2(1 − G) 与三维距离一致（最大误差 ${sci(B.fullErr)}）。`, `The table is full: G is positive semidefinite of rank ${B.rank}, its spectral factor gives G = XXᵀ, and every d² = 2(1 − G) matches the distance in three dimensions (largest error ${sci(B.fullErr)}).`)
          : L(`秩 4：λ₄ = ${fix(B.lam[3], 4)} 留在三维之外，只取前三维时距离最多差 ${fix(B.fullErr, 4)}。这个残差要一个新的方向。`, `Rank 4: λ₄ = ${fix(B.lam[3], 4)} stays outside three dimensions, and the top three dimensions miss a distance by up to ${fix(B.fullErr, 4)}. This residual needs a new direction.`);
      $('hudBig').textContent = L(`显影 · k = ${Lt.k}/${B.P}`, `GEOMETRY · k = ${Lt.k}/${B.P}`);
      $('hudSub').textContent = Lt.complete ? L(`秩 ${B.rank} · λ = ${B.lam.slice(0, 4).map((x) => fix(x, 2)).join(', ')}`, `rank ${B.rank} · λ = ${B.lam.slice(0, 4).map((x) => fix(x, 2)).join(', ')}`)
        : L(`揭开 ${Lt.k} / ${B.P} 对 · 位置是插值`, `${Lt.k} / ${B.P} pairs revealed · positions interpolated`);
      strip('目前这张表的谱', 'Spectrum of the table so far', L('未揭开的项按 0 · <span class="c-cy">前三</span> · <span class="c-mg">其余</span>', 'unrevealed read as 0 · <span class="c-cy">top three</span> · <span class="c-mg">the rest</span>'),
        '距离从相似度读出', 'Distances read off similarities', L('横 2(1 − G) · 纵 ‖Xᵢ − Xⱼ‖²', 'across 2(1 − G) · up ‖Xᵢ − Xⱼ‖²'));
      html = leg([['am', '现在揭开的对 · 选中的字', 'pair revealed now · selected word'], ['cy', 'G > 0：相似', 'G > 0: alike'], ['mg', 'G < 0：相反', 'G < 0: opposed'], ['ink', '单位字（球面上）', 'unit words (on the sphere)']]);
    } else if (k === 'lagrange') {
      const Lg = snap.Lg, flat = Math.abs(Lg.wedge) < 1e-9;
      $('roAside').textContent = `u 20° · v ${fdeg(Lg.phiV, 0)} · |v| ${fix(S.vLen, 2)}`;
      $('roKeyL').textContent = L('|u|²|v|² = 同² + 楔²', '|u|²|v|² = sameness² + wedge²');
      $('roKey').textContent = `${fix(Lg.lhs, 4)} = ${fix(Lg.samenessSq, 4)} + ${fix(Lg.wedgeSq, 4)}`;
      $('roKeySub').textContent = L(` · 两边之差 ${sci(Lg.lhs - Lg.rhs)}`, ` · difference ${sci(Lg.lhs - Lg.rhs)}`);
      setRo(1, '同 ⟨u, v⟩ = s₁s₂ + a₁a₂', 'Sameness ⟨u, v⟩ = s₁s₂ + a₁a₂', kit.sgn(Lg.same, 4), 'c');
      setRo(2, '楔 u ∧ v = s₁a₂ − a₁s₂', 'Wedge u ∧ v = s₁a₂ − a₁s₂', kit.sgn(Lg.wedge, 4), 'm');
      setRo(3, '镜像折叠 u ū = s₁² + a₁²（虚部为 0）', 'Mirror fold u ū = s₁² + a₁² (imaginary part 0)', fix(Lg.mirror, 4));
      setRo(4, '夹角 Δ = φᵥ − 20°', 'Angle Δ = φᵥ − 20°', fdeg(Lg.delta));
      setRo(5, '下界 |u||v| ≥ |u ∧ v|', 'Floor |u||v| ≥ |u ∧ v|', `${fix(Lg.normU * Lg.normV, 3)} ≥ ${fix(Math.abs(Lg.wedge), 3)}`);
      $('roNote').textContent = flat ? L('v 与 u 共线：楔为零（u ∧ u = 0），|u|²|v|² 全部是同²。', 'v lies along u: the wedge vanishes (u ∧ u = 0) and |u|²|v|² is all sameness².')
        : L(`v 斜着：品红的楔² = ${fix(Lg.wedgeSq, 3)} 是推不掉的一份，|u||v| 不能小于 |u ∧ v|。镜像 ū 与 u 相乘只剩 |u|²，紫色的圈。`, `v is oblique: the magenta wedge² = ${fix(Lg.wedgeSq, 3)} cannot be pushed away, and |u||v| cannot fall below |u ∧ v|. The mirror ū times u leaves only |u|², the violet ring.`);
      $('hudBig').textContent = L(`折痕 · 楔² = ${fix(Lg.wedgeSq, 3)}`, `FOLDING · wedge² = ${fix(Lg.wedgeSq, 3)}`);
      $('hudSub').textContent = flat ? L('v 与 u 共线：u ∧ u = 0', 'v along u: u ∧ u = 0') : L(`同² ${fix(Lg.samenessSq, 3)} + 楔² ${fix(Lg.wedgeSq, 3)} = |u|²|v|² ${fix(Lg.lhs, 3)}`, `sameness² ${fix(Lg.samenessSq, 3)} + wedge² ${fix(Lg.wedgeSq, 3)} = |u|²|v|² ${fix(Lg.lhs, 3)}`);
      strip('预算沿着转动怎么分', 'How the budget splits along the turn', L('<span class="c-cy">同²</span> + <span class="c-mg">楔²</span> · 横轴 v 的方向', '<span class="c-cy">sameness²</span> + <span class="c-mg">wedge²</span> · across: direction of v'),
        '楔只在共线时为零', 'The wedge vanishes only when aligned', L('<span class="c-mg">u ∧ v</span> · 虚线 ±|u||v|', '<span class="c-mg">u ∧ v</span> · dashed ±|u||v|'));
      html = leg([['am', 'v（可拖）', 'v (drag it)'], ['cy', '同 ⟨u, v⟩', 'sameness ⟨u, v⟩'], ['mg', '楔 u ∧ v', 'wedge u ∧ v'], ['vi', '比较 ū v · 圈：u ū', 'comparison ū v · ring: u ū']]);
    } else if (k === 'minkowski') {
      const Mk = snap.Mk;
      $('roAside').textContent = `θ ${fdeg(Mk.thetaDeg)} · c dt = 1`;
      $('roKeyL').textContent = L('(c dτ)² = (c dt)² − dx²', '(c dτ)² = (c dt)² − dx²');
      $('roKey').textContent = `${fix(Mk.lhs, 4)} = 1 − ${fix(Mk.dx * Mk.dx, 4)}`;
      $('roKeySub').textContent = L(' · 同一条恒等式移项', ' · the same identity, rearranged');
      setRo(1, '固有时速率 dτ/dt = cos θ', 'Proper-time rate dτ/dt = cos θ', fix(Mk.dtau, 4), 'c');
      setRo(2, '行进速率 dx/(c dt) = sin θ', 'Travel rate dx/(c dt) = sin θ', fix(Mk.dx, 4), 'm');
      setRo(3, '预算圆 cos²θ + sin²θ', 'Budget circle cos²θ + sin²θ', fix(Mk.budget, 6));
      setRo(4, '分配角 θ', 'Allocation angle θ', fdeg(Mk.thetaDeg), 'a');
      setRo(5, '贴上光锥？', 'On the light cone?', Mk.onCone ? L('是：dτ = 0', 'yes: dτ = 0') : L('否', 'no'));
      $('roNote').textContent = Mk.onCone ? L('θ = 90°：预算全给了行进，dx = c dt，固有时一点也不走，世界线贴在光锥上。', 'θ = 90°: the whole budget goes to travel, dx = c dt, proper time does not advance at all, and the worldline lies on the light cone.')
        : L('预算圆上的点移到右边，就是一个事件：青色的 c dτ 是双曲线顶点的高度，品红的 dx 是走过的路。把它读成相对论的间隔是本书的诠释。', 'Moved to the right, the point of the budget circle is an event: the cyan c dτ is the height of the hyperbola at its vertex, the magenta dx is the distance travelled. Reading it as the relativistic interval is the book\'s interpretation.');
      $('hudBig').textContent = L(`折痕 · θ = ${fdeg(Mk.thetaDeg, 0)}`, `FOLDING · θ = ${fdeg(Mk.thetaDeg, 0)}`);
      $('hudSub').textContent = L(`dτ/dt = ${fix(Mk.dtau, 3)} · dx/(c dt) = ${fix(Mk.dx, 3)}`, `dτ/dt = ${fix(Mk.dtau, 3)} · dx/(c dt) = ${fix(Mk.dx, 3)}`);
      strip('预算的两份加起来总是一', 'The two shares always add to one', L('<span class="c-cy">cos²θ</span> + <span class="c-mg">sin²θ</span> · 横轴 θ', '<span class="c-cy">cos²θ</span> + <span class="c-mg">sin²θ</span> · across θ'),
        '时钟越走越慢，直到停下', 'The clock slows down until it stops', L('<span class="c-cy">dτ/dt</span> · <span class="c-mg">dx/(c dt)</span>', '<span class="c-cy">dτ/dt</span> · <span class="c-mg">dx/(c dt)</span>'));
      html = leg([['am', '现在的分配 θ 与事件', 'current split θ and event'], ['cy', 'dτ：固有时', 'dτ: proper time'], ['mg', 'dx：行进', 'dx: travel'], ['dash ink', '光锥', 'light cone']]);
    } else if (k === 'residual') {
      const Rs = snap.Rs;
      $('roAside').textContent = `β ${fdeg(Rs.betaDeg)} · φ ${fdeg(Rs.phiDeg, 0)}`;
      $('roKeyL').textContent = L('残差 ‖r‖ = ‖(I − P)w‖ = sin β', 'Residual ‖r‖ = ‖(I − P)w‖ = sin β');
      $('roKey').textContent = fix(Rs.residualNorm, 4);
      $('roKeySub').textContent = L(` · 格拉姆秩 2 → ${Rs.rank}`, ` · Gram rank 2 → ${Rs.rank}`);
      setRo(1, '表内 ‖P w‖² = cos²β', 'Inside the table ‖P w‖² = cos²β', fix(Rs.inPlaneNormSq, 4), 'c');
      setRo(2, '残差 ‖r‖² = sin²β', 'Residual ‖r‖² = sin²β', fix(Rs.residualNormSq, 4), 'm');
      setRo(3, '残差与旧轴的比较 S(r, e₁) · S(r, e₂)', 'Residual against the old axes S(r, e₁) · S(r, e₂)', `${fix(Rs.sameWithE1, 4)} · ${fix(Rs.sameWithE2, 4)}`);
      setRo(4, 'det G(e₁, e₂, w)', 'det G(e₁, e₂, w)', fix(Rs.det, 4));
      setRo(5, '倾角 β', 'Tilt β', fdeg(Rs.betaDeg), 'a');
      $('roNote').textContent = Rs.rank < 3 ? L('β = 0：w 还在旧平面里，旧表就装得下它，格拉姆秩仍是 2。', 'β = 0: w still lies in the old plane, the old table holds it, and the Gram rank stays 2.')
        : L(`品红的残差 r 与 e₁、e₂ 的比较都是 0：旧表里没有一个数能写下它。它把秩从 2 抬到 3；这一切都在固定的 ℝ³ 里。`, 'The magenta residual r compares to 0 with both e₁ and e₂: no number in the old table can record it. It lifts the rank from 2 to 3; all of this happens inside a fixed ℝ³.');
      $('hudBig').textContent = L(`开维 · β = ${fdeg(Rs.betaDeg, 0)}`, `EXPANSION · β = ${fdeg(Rs.betaDeg, 0)}`);
      $('hudSub').textContent = L(`表内 cos β = ${fix(Math.sqrt(Rs.inPlaneNormSq), 3)} · 残差 sin β = ${fix(Rs.residualNorm, 3)} · 秩 2 → ${Rs.rank}`, `inside cos β = ${fix(Math.sqrt(Rs.inPlaneNormSq), 3)} · residual sin β = ${fix(Rs.residualNorm, 3)} · rank 2 → ${Rs.rank}`);
      strip('留在表里的与逃出去的', 'What stays in the table and what escapes', L('<span class="c-cy">cos²β</span> + <span class="c-mg">sin²β</span> · 横轴 β', '<span class="c-cy">cos²β</span> + <span class="c-mg">sin²β</span> · across β'),
        '最小的特征值离开零', 'The smallest eigenvalue leaves zero', L('G(e₁, e₂, w) 的谱：<span class="c-mg">1 − cos β</span> · 1 · <span class="c-cy">1 + cos β</span>', 'spectrum of G(e₁, e₂, w): <span class="c-mg">1 − cos β</span> · 1 · <span class="c-cy">1 + cos β</span>'));
      html = leg([['am', '新来的态 w（可拖）', 'new state w (drag it)'], ['cy', '留在表里的 P w', 'P w, kept in the table'], ['mg', '残差 r', 'residual r'], ['dash vi', '新轴 e₃', 'new axis e₃']]);
    } else {
      const Me = snap.Me;
      $('roAside').textContent = `b ${Me.b} · ${L('键', 'key')} ${bin4(Me.key)}`;
      $('roKeyL').textContent = L(`读前 ${Me.b} 位后的逃逸对（有序）`, `Escape pairs after reading ${Me.b} bits (ordered)`);
      $('roKey').textContent = `${Me.esc}`;
      $('roKeySub').textContent = L(` · 无序 ${Me.escUnordered} = C(${Me.size}, 2)·${Me.buckets}`, ` · unordered ${Me.escUnordered} = C(${Me.size}, 2)·${Me.buckets}`);
      setRo(1, '桶数 · 每桶的态', 'Buckets · states per bucket', `${Me.buckets} · ${Me.size}`);
      setRo(2, '一次查找的比较次数', 'Comparisons per lookup', `${Me.b}`, 'a');
      setRo(3, `去掉第 ${Me.b} 位：逃逸对 = 原有的 + 只被它分开的`, `Drop bit ${Me.b}: escape pairs = those kept + those only it separates`, `${Me.escPrev} = <span class="c-mg">${Me.esc}</span> + ${Me.uniq}`);
      setRo(4, `自比较 x${subs(Me.n)}`, `Self-comparison x${subs(Me.n)}`, fix(Me.x, 10), 'a');
      setRo(5, '离 θ* 的距离', 'Distance to θ*', sci(Me.err));
      $('roNote').textContent = Me.size > 1 ? L(`读 ${Me.b} 位只走 ${Me.b} 层：每个桶里还挤着 ${Me.size} 个态，品红的弧是分不开的对。右边的自比较每步把误差大约乘 0.674。`, `Reading ${Me.b} bits walks only ${Me.b} levels: each bucket still holds ${Me.size} states, and the magenta arcs are the pairs it cannot separate. On the right each self-comparison multiplies the error by about 0.674.`)
        : L('读满 4 位：每个桶只剩一个态，逃逸对为零。右边的自比较每步把误差大约乘 0.674。', 'All 4 bits read: every bucket holds one state and there are no escape pairs. On the right each self-comparison multiplies the error by about 0.674.');
      $('hudBig').textContent = L(`开维 · b = ${Me.b}`, `EXPANSION · b = ${Me.b}`);
      $('hudSub').textContent = L(`${Me.buckets} 个桶 · 逃逸对 ${Me.esc} · x${subs(Me.n)} = ${fix(Me.x, 5)}`, `${Me.buckets} buckets · ${Me.esc} escape pairs · x${subs(Me.n)} = ${fix(Me.x, 5)}`);
      strip('位宽越窄，逃逸越多', 'The narrower the readout, the more escapes', L('有序逃逸对 · 横轴 b', 'ordered escape pairs · across b'),
        '自比较一步步逼近不动点', 'Self-comparison closes in on the fixed point', L('|xₙ − θ*| · 虚线 θ*·(sin θ*)ⁿ', '|xₙ − θ*| · dashed θ*·(sin θ*)ⁿ'));
      html = leg([['am', '现在的查找与 xₙ', 'current lookup and xₙ'], ['cy', '读出的前缀 · y = cos x', 'prefix read · y = cos x'], ['mg', '分不开的对', 'unresolved pairs'], ['ink', '十六个态 · 蛛网', 'sixteen states · cobweb']]);
    }
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
    $('pillScene').querySelector('strong').textContent = L(scName[0], scName[1]);
    $('pillNow').querySelector('strong').innerHTML = railText(clock.t).replace(/<small>.*<\/small>/, '').trim();
    $('pillKey').querySelector('strong').textContent = cards && cards.current ? CODE[cards.current] : L('自由', 'FREE');
  }

  function snapshot() {
    const key = railOwner, t = S.rail[key];
    if (key === 'primitive') return { key, Pm: primitiveState(t) };
    if (key === 'lattice') return { key, Lt: latticeState(t) };
    if (key === 'lagrange') return { key, Lg: lagrangeState(t) };
    if (key === 'minkowski') return { key, Mk: minkowskiState(t) };
    if (key === 'residual') return { key, Rs: residualState(t) };
    return { key, Me: memoState(t) };
  }
  // The shared runtime stacks the title under the scene chips when they would meet; fit it after the text changes and
  // before the stage measures its free box, so the drawing never starts under a title that is about to move.
  const paint = kit.painter(() => { const snap = snapshot(); last = snap; drawText(snap); TRV.hudFit(); drawStage(snap); drawPlots(snap); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- the rail: one clock, each scene keeps its own position ---------- */
  const RAILS = {
    primitive: { max: () => NS, step: 1, rate: 1.6 },
    lattice: { max: () => latticeBase(S.set).P, step: 1, rate: 5 },
    lagrange: { max: () => 180, step: 5, rate: 26 },
    minkowski: { max: () => 90, step: 5, rate: 17 },
    residual: { max: () => 90, step: 2, rate: 14 },
    memo: { max: () => NCOB, step: 1, rate: 3.5 }
  };
  const railKey = () => (S.scene === 'folding' ? S.fold : S.scene === 'expansion' ? S.exp : S.scene);
  let railOwner = 'primitive', cards = null, booting = true;
  function railText(t) {
    const k = railOwner, n = Math.floor(t + 1e-9);
    if (k === 'primitive') return `${L('槽', 'slot')} ${n} <small>/ 8 ${L('已比较', 'compared')}</small>`;
    if (k === 'lattice') return `k ${n} <small>/ ${latticeBase(S.set).P} ${L('对', 'pairs')}</small>`;
    if (k === 'lagrange') return `φ ${fix(t, 0)}° <small>${L('v 的方向', 'direction of v')}</small>`;
    if (k === 'minkowski') return `θ ${fix(t, 0)}° <small>${L('分配角', 'allocation')}</small>`;
    if (k === 'residual') return `β ${fix(t, 0)}° <small>${L('倾角', 'tilt')}</small>`;
    return `n ${n} <small>/ ${NCOB} ${L('次自比较', 'self-comparisons')}</small>`;
  }
  let prevT = 0;
  function onRail(t) {
    const c = cards && cards.current ? CARDS[cards.current] : null;
    if (clock.playing && c && c.stop != null && railOwner === (c.fold || c.exp || c.scene) && prevT < c.stop - 1e-9 && t >= c.stop - 1e-9) {
      prevT = c.stop; clock.pause(); clock.set(c.stop); return;
    }
    prevT = t; S.rail[railOwner] = t; paint();
  }
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NS, t: S.rail.primitive, rate: 1.6, step: 1,
    format: (t) => railText(t),
    onChange: (t) => onRail(t)
  });
  function applyRail(t) {
    const k = railKey(), R = RAILS[k], max = R.max();
    clock.pause();
    railOwner = k; clock.step = R.step; clock.rate = R.rate; clock.setMax(max, true);
    prevT = clamp(t == null ? S.rail[k] : t, 0, max);
    clock.set(prevT);
  }
  function refreshStage(t) {
    const flat = !is3D();
    $('stage').classList.toggle('still', flat);
    if (!flat) stage.view(VIEWS[S.scene === 'lattice' ? 'lattice' : 'residual'], TRV.still ? 0 : 450);
    applyRail(t);
  }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('.deck section[data-scenes], #evidence [data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    refreshStage(t);
  }
  const leave = () => { if (cards) cards.mark(null); };

  /* ---------- controls ---------- */
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  // the slots of both words: w_A is the reference, a slot of w_B flips when tapped
  const slotsEl = $('slots');
  (() => {
    const row = (who, editable) => {
      const lab = document.createElement('span'); lab.className = 'who'; lab.innerHTML = `w<sub>${who}</sub>`; slotsEl.appendChild(lab);
      for (let k = 0; k < NS; k++) {
        const el = document.createElement(editable ? 'button' : 'span');
        el.className = 'bit'; el.dataset.word = who; el.dataset.slot = String(k);
        if (editable) el.type = 'button';
        slotsEl.appendChild(el);
      }
    };
    row('A', false); row('B', true);
  })();
  function syncSlots() {
    slotsEl.querySelectorAll('.bit').forEach((el) => {
      const k = +el.dataset.slot, v = (el.dataset.word === 'A' ? S.wA : S.wB)[k], same = S.wA[k] === S.wB[k];
      el.textContent = v > 0 ? '+1' : '−1';
      el.classList.toggle('up', v > 0); el.classList.toggle('same', same); el.classList.toggle('diff', !same);
      if (el.tagName === 'BUTTON') el.setAttribute('aria-label', L(`w_B 第 ${k + 1} 槽：${v > 0 ? '+1' : '−1'}，点一下翻转`, `slot ${k + 1} of w_B: ${v > 0 ? '+1' : '−1'}, tap to flip`));
    });
  }
  const matchWord = () => Object.keys(WORDS).find((id) => WORDS[id].every((x, k) => x === S.wB[k])) || null;
  function flipSlot(k) { S.wB[k] = -S.wB[k]; wordChips.set(matchWord(), true); syncSlots(); leave(); paint(); }
  slotsEl.addEventListener('click', (ev) => { const b = ev.target.closest('button.bit'); if (b) flipSlot(+b.dataset.slot); });
  function setWord(id, quiet) { S.wB = WORDS[id].slice(); wordChips.set(id, true); syncSlots(); if (!quiet) { leave(); paint(); } }
  const wordChips = kit.chips($('wordChips'), 'word', (v) => setWord(v));
  function setKappa(v, quiet) {
    S.kappa = clamp(Math.round(v * 20) / 20, -1, 1); fKappa.set(S.kappa);
    $('kappaFair').setAttribute('aria-pressed', String(S.kappa === -1));
    if (!quiet) { leave(); paint(); }
  }
  const fKappa = kit.field($('kappa'), { fmt: (v) => fix(v, 2), onInput: (v) => setKappa(v) });
  $('kappaFair').addEventListener('click', () => setKappa(-1));
  function setSet(id, quiet) {
    S.set = id; setChips.set(id, true); S.sel = -1; S.rail.lattice = latticeBase(id).P;
    if (!quiet) { leave(); if (S.scene === 'lattice') applyRail(); else paint(); }
  }
  const setChips = kit.chips($('setChips'), 'set', (v) => setSet(v));
  function syncSubs() { document.querySelectorAll('[data-sub]').forEach((el) => { el.hidden = el.dataset.sub !== S.fold && el.dataset.sub !== S.exp; }); }
  function setFold(f, quiet) { S.fold = f; foldChips.set(f, true); syncSubs(); if (!quiet) { leave(); if (S.scene === 'folding') refreshStage(); } }
  const foldChips = kit.chips($('foldChips'), 'fold', (v) => setFold(v));
  function setExp(e, quiet) { S.exp = e; expChips.set(e, true); syncSubs(); if (!quiet) { leave(); if (S.scene === 'expansion') refreshStage(); } }
  const expChips = kit.chips($('expChips'), 'exp', (v) => setExp(v));
  function setBits(b, quiet) { S.bits = clamp(Math.round(b), 1, NBITS); bitsChips.set(String(S.bits), true); if (!quiet) { leave(); paint(); } }
  const bitsChips = kit.chips($('bitsChips'), 'bits', (v) => setBits(+v));
  const fVlen = kit.field($('vlen'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.vLen = v; leave(); paint(); } });
  const fPhi = kit.field($('phi'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { S.phi = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  TRV.onLang(syncSlots);
  kit.keys({
    1: () => { leave(); setScene('primitive'); }, 2: () => { leave(); setScene('lattice'); },
    3: () => { leave(); setScene('folding'); }, 4: () => { leave(); setScene('expansion'); }
  });

  /* ---------- experiment cards ---------- */
  const CARDS = {
    oisc: { scene: 'primitive', word: 'w60', kappa: -1, still: 8 },
    emergence: { scene: 'lattice', set: 'box8', still: 28 },
    uncertainty: { scene: 'folding', fold: 'lagrange', vLen: 1, still: 75, stop: 75 },
    'time-axis': { scene: 'expansion', exp: 'residual', phi: 35, still: 52, stop: 58 },
    lookup: { scene: 'expansion', exp: 'memo', bits: 2, key: 11, still: 14 },
    'budget-cone': { scene: 'folding', fold: 'minkowski', still: 60 }
  };
  const NOTES = {
    oisc: ['两个八槽字逐槽比较：相同的槽连成青色，不同的槽拧成品红。比完八槽 s = 0.5、a = 0.866，κ = −1 时两向乘积落在 (1, 0)。', 'Two 8-slot words compared slot by slot: equal slots link in cyan, unequal ones twist in magenta. After 8 slots s = 0.5, a = 0.866; at κ = −1 the two-way product lands on (1, 0).'],
    emergence: ['八个没有坐标的字两两比较 28 次：相似表填满后，谱嵌入把它们放上一只盒子的八个角，每对 d² = 2(1 − G)。', 'Eight words without coordinates, compared in 28 pairs: once the similarity table is full, the spectral embedding puts them on the corners of a box, with d² = 2(1 − G) for every pair.'],
    uncertainty: ['u 在 20°，琥珀色的 v 转到 75°：|u|²|v|² 拆成青色的同² 与品红的楔²；v 与 u 共线时楔为零，斜着时楔是推不掉的下界。', 'u at 20°, the amber v turns to 75°: |u|²|v|² splits into cyan sameness² and magenta wedge²; the wedge vanishes when v lies along u and is a floor otherwise.'],
    'time-axis': ['新来的态 w 抬离旧平面：青色的投影 cos β 留在表里，品红的残差 sin β 垂直于平面，格拉姆秩从 2 升到 3。', 'A new state w tilts out of the old plane: the cyan projection cos β stays in the table, the magenta residual sin β stands perpendicular, and the Gram rank goes from 2 to 3.'],
    lookup: ['只读前 2 位：十六个态落进四个桶，每桶 6 对分不开（有序 48 对）；右边 xₙ₊₁ = cos xₙ 收向 θ* ≈ 0.739。', 'Reading 2 prefix bits puts 16 states into 4 buckets of 6 unresolved pairs each (48 ordered); on the right xₙ₊₁ = cos xₙ closes in on θ* ≈ 0.739.'],
    'budget-cone': ['沿单位预算圆扫 θ：青色 dτ/dt = cos θ，品红 dx/(c dt) = sin θ；改写成 (c dτ)² = (c dt)² − dx²，θ = 90° 时贴上光锥。', 'Sweep θ along the unit budget circle: cyan dτ/dt = cos θ, magenta dx/(c dt) = sin θ; rewritten as (c dτ)² = (c dt)² − dx², at θ = 90° it meets the light cone.']
  };
  function applyPreset(id) {
    const c = CARDS[id];
    if (c.scene === 'primitive') { setWord(c.word, true); setKappa(c.kappa, true); }
    if (c.set) setSet(c.set, true);
    S.sel = -1;
    if (c.fold) setFold(c.fold, true);
    if (c.vLen != null) { S.vLen = c.vLen; fVlen.set(c.vLen); }
    if (c.exp) setExp(c.exp, true);
    if (c.phi != null) { S.phi = c.phi; fPhi.set(c.phi); }
    if (c.bits != null) setBits(c.bits, true);
    if (c.key != null) S.key = c.key;
    setScene(c.scene, 0);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(c.still); paint(); return; }
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  // A cited figure has a fixed frame: one complete sentence per card there; the full laboratory keeps the notes above.
  const FIGURE_NOTES = {
    oisc: ['两个八槽字逐槽比较：比完八槽，同 s = 0.5、异 a ≈ 0.866；κ = −1 时两向乘积 s² + a² 落在 (1, 0)。', 'Two 8-slot words compared slot by slot: after 8 slots s = 0.5 and a ≈ 0.866; at κ = −1 the two-way product s² + a² lands on (1, 0).'],
    emergence: ['八个字两两比较 28 次：半正定的格拉姆表秩为 3，谱嵌入把它们放上槽数 3-3-2 的长方盒八角，d² = 2(1 − G)。', 'Eight words, 28 comparisons: the positive semidefinite Gram table has rank 3 and embeds them on the corners of a 3-3-2 box, d² = 2(1 − G).'],
    uncertainty: ['u 在 20°，琥珀色的 v 转到 75°：|u|²|v|² = 同² + 楔²，此刻 0.33 + 0.67；楔只在 v 与 u 共线时为零。', 'u at 20°, the amber v turned to 75°: |u|²|v|² = sameness² + wedge², here 0.33 + 0.67; the wedge vanishes only when v lies along u.'],
    'time-axis': ['新态 w 倾出旧平面 β 角：青色投影 cos β 留在表里，品红残差 sin β 立成新轴；det G = sin²β > 0，秩 2 → 3。', 'w tilts out of the old plane by β: cyan cos β stays in the table, magenta residual sin β becomes a new axis; det G = sin²β > 0, rank 2 → 3.'],
    lookup: ['只读前 2 位：16 个态落进 4 个桶，每桶 6 对分不开（有序共 48 对）；右边 xₙ₊₁ = cos xₙ 收向 θ* ≈ 0.739。', 'Reading 2 prefix bits puts 16 states into 4 buckets of 6 unresolved pairs (48 ordered); right: xₙ₊₁ = cos xₙ closes in on θ* ≈ 0.739.'],
    'budget-cone': ['沿预算圆扫 θ：青色 dτ/dt = cos θ，品红 dx/(c dt) = sin θ，改写成 (c dτ)² = (c dt)² − dx²，90° 时贴上光锥。', 'Along the budget circle: cyan dτ/dt = cos θ, magenta dx/(c dt) = sin θ, rewritten as (c dτ)² = (c dt)² − dx²; at θ = 90° it meets the light cone.']
  };
  cards = kit.cards($('presets'), {
    presets: CARDS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，翻 w_B 的槽，拖 κ、v、w 与事件，点字与叶子，拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, flip slots of w_B, drag κ, v, w and the event, tap words and leaves, scrub the rail. Pick a card again at any time.']
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- read-only probe, cover, start ---------- */
  function metrics() {
    const Pm = primitiveState(S.rail.primitive), Lt = latticeState(S.rail.lattice), Lg = lagrangeState(S.rail.lagrange);
    const Mk = minkowskiState(S.rail.minkowski), Rs = residualState(S.rail.residual), Me = memoState(S.rail.memo), B = Lt.B;
    const copy = (A) => A.map((r) => r.slice());
    return {
      active: railOwner,
      // primitive
      wA: Pm.wA, wB: Pm.wB, wordScale: R8, slotsCompared: Pm.k, matches: Pm.matches, mismatches: Pm.mismatches,
      s: Pm.s, a: Pm.a, primitiveTheta: Pm.theta, sSoFar: Pm.sNow, aSoFar: Pm.aNow, thetaSoFar: Pm.thNow,
      sumSq: Pm.sumSq, diffSq: Pm.diffSq, partialSumSq: Pm.partSum, partialDiffSq: Pm.partDiff, bornWeight: Pm.born,
      kappa: Pm.kappa, pureDiffFairProd: Pm.pureDiff, twoWayProduct: Pm.product, twoWayProductSoFar: Pm.productNow, ePerp: Pm.ePerp,
      // lattice
      wordSet: B.id, words: copy(B.raw), gramMatrix: copy(B.G), eigenvalues: B.lam.slice(), latticeRank: B.rank,
      spectralCoords: copy(B.X), embeddedCoords: copy(B.D), pairsCompared: Lt.k, pairsTotal: B.P, pairOrder: copy(B.pairs),
      currentPair: Lt.cur ? Lt.cur.slice() : null, partialGram: copy(Lt.known), partialSpectrum: Lt.partSpectrum.slice(),
      distanceErrorRevealed: Lt.maxErr, distanceErrorFull: B.fullErr, nodePositions: copy(Lt.pos), selected: S.sel,
      // folding
      u: Lg.u.slice(), v: Lg.v.slice(), ubar: Lg.ubar.slice(), sameness: Lg.same, wedge: Lg.wedge, lagrangeLHS: Lg.lhs, lagrangeRHS: Lg.rhs,
      samenessSq: Lg.samenessSq, wedgeSq: Lg.wedgeSq, mirrorProduct: Lg.mirror, vDirectionDeg: Lg.phiV,
      theta: Mk.theta, thetaDeg: Mk.thetaDeg, dtauRatio: Mk.dtau, dxRatio: Mk.dx, budget: Mk.budget, minkowskiLHS: Mk.lhs, minkowskiRHS: Mk.rhs, onLightCone: Mk.onCone,
      // expansion
      beta: Rs.beta, betaDeg: Rs.betaDeg, phiDeg: Rs.phiDeg, w: Rs.w.slice(), Pw: Rs.Pw.slice(), residual: Rs.r.slice(),
      inPlaneNormSq: Rs.inPlaneNormSq, residualNormSq: Rs.residualNormSq, residualSameness: [Rs.sameWithE1, Rs.sameWithE2],
      residualGram: copy(Rs.gram), residualGramEigenvalues: Rs.eigenvalues.slice(), gramRank: Rs.rank, residualGramDet: Rs.det,
      bits: Me.b, buckets: Me.buckets, bucketSize: Me.size, escapePairCount: Me.esc, escapePairsUnordered: Me.escUnordered,
      escapePairsWithoutLastBit: Me.escPrev, uniqueCapturePairs: Me.uniq, lookupKey: Me.key, lookupPrefix: Me.keyPrefix,
      cobwebStep: Me.n, cobwebX: Me.x, cobwebSequence: Me.xs.slice(), cobwebError: Me.err, dottieFixedPoint: DOTTIE, dottieNewton: DOTTIE_NEWTON,
      readout: $('roKey').textContent
    };
  }
  window.COMPARISON_OISC_DEBUG = {
    get state() {
      return {
        scene: S.scene, fold: S.fold, exp: S.exp, set: S.set, preset: cards ? cards.current : null, railKey: railOwner,
        t: clock.t, max: clock.max, playing: clock.playing, rail: Object.assign({}, S.rail),
        railMeaning: { primitive: 'slots compared k ∈ [0, 8]', lattice: 'pairs revealed k ∈ [0, M(M − 1)/2]', lagrange: 'direction of v in degrees, [0, 180]', minkowski: 'allocation angle θ in degrees, [0, 90]', residual: 'tilt β in degrees, [0, 90]', memo: 'cobweb step n ∈ [0, 24]' }[railOwner],
        wA: S.wA.slice(), wB: S.wB.slice(), kappa: S.kappa, sel: S.sel, uDeg: S.uDeg, vLen: S.vLen, phi: S.phi, bits: S.bits, key: S.key
      };
    },
    get metrics() { return metrics(); },
    presets: Object.keys(CARDS),
    scenes: ['primitive', 'lattice', 'folding', 'expansion'],
    cards: JSON.parse(JSON.stringify(CARDS)),
    /** Pick a card as a reader does (it plays, as a click does). */
    pickPreset: (id) => { if (!CARDS[id]) throw new Error(`no card ${id}`); cards.pick(id); },
    /** Stop the clock and put the rail of the current scene at t (its own units). */
    setRail: (t) => { clock.pause(); clock.set(clamp(+t, 0, clock.max)); kit.flush(); },
    /** Change controls as a reader would; the card is released unless keepCard. */
    setOptions: (o) => {
      o = o || {};
      clock.pause();
      if (o.wB) { S.wB = o.wB.map((x) => (x < 0 ? -1 : 1)); wordChips.set(matchWord(), true); syncSlots(); }
      if (o.word) setWord(o.word, true);
      if (o.kappa != null) setKappa(o.kappa, true);
      if (o.set) setSet(o.set, true);
      if (o.sel != null) S.sel = o.sel;
      if (o.vLen != null) { S.vLen = clamp(+o.vLen, 0.3, 1.25); fVlen.set(S.vLen); }
      if (o.phi != null) { S.phi = ((+o.phi % 360) + 360) % 360; fPhi.set(S.phi); }
      if (o.bits != null) setBits(o.bits, true);
      if (o.key != null) S.key = clamp(Math.round(o.key), 0, NSTATES - 1);
      if (o.fold) setFold(o.fold, true);
      if (o.exp) setExp(o.exp, true);
      if (o.scene) setScene(o.scene);
      else if (o.fold || o.exp || o.set) refreshStage();
      if (o.rail != null) clock.set(clamp(+o.rail, 0, clock.max));
      if (!o.keepCard) leave();
      kit.flush();
    },
    /** Viewport point of a world point on a 3D stage, or of slot k of w_B on the primitive stage (for pointer tests). */
    worldPoint: (v) => { const b = $('cv').getBoundingClientRect(), q = stage.p(v); return [b.left + q[0], b.top + q[1]]; },
    slotPoint: (k) => { const b = $('cv').getBoundingClientRect(), l = primLayout; return l ? [b.left + l.x0 + k * (l.c + l.g) + l.c / 2, b.top + l.yB + l.c / 2] : null; }
  };
  window.TRV_THUMB = () => {
    setSet('box8', true); S.sel = -1;
    setScene('lattice', latticeBase('box8').P); stage.view(VIEWS.lattice, 0); paint.now();
  };
  syncSlots(); syncSubs();
  cards.pick(cards.initial('oisc'));
  booting = false;
  paint();
})();
