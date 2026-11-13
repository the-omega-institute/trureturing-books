/* Quantum Geometry · ORTHO//DUEL (quantum-interpretations-duel)
   Stage-first lab for Appendix D's six foundational puzzles. One apparatus is always on the stage: distant Bob holds B,
   a sealed lab holds the qubit S, the friend's record F and N environment registers E (|Φ⁺⟩ on S and B, copies made
   coherently by process II), and Wigner stands outside. Five lenses read the same state with the same dials θ, N, β;
   the lower half of the stage shows the readout picture of the current card (the cut, AND to OR, Born weights,
   Bell–EPR, time and horizon, the five-way duel). Every number is computed here from the protocol of Appendix D;
   colours come only from TRV.palette (theme/tokens.json). */
(function () {
  'use strict';
  const TRV = window.TRV, kit = TRV && TRV.kit;
  if (!TRV || !kit) return;
  const { fix, sgn } = kit;
  const $ = (id) => document.getElementById(id);
  const L = (zh, en) => TRV.L(zh, en);
  const P = TRV.palette;
  const DEG = Math.PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const LW = TRV.thumbMode ? 2 : 1;            // 2D strokes are drawn twice as thick on the cover

  /* ---------- numbers ---------- */
  const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  const sup = (n) => String(n).split('').map((ch) => SUP[ch] || ch).join('');
  /** a × 10ᵏ with d decimals (no "10.0 × 10⁴" after rounding). */
  function sci(x, d) {
    d = d == null ? 1 : d;
    if (!(Math.abs(x) > 0)) return '0';
    let e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    if (Math.abs(Number(m.toFixed(d))) >= 10) { e += 1; m /= 10; }
    return `${fix(m, d)} × 10${sup(e)}`;
  }
  /** N for people: 1, 10³, 3162, 3.16 × 10⁵. */
  function fmtN(N) {
    const k = Math.round(Math.log10(N));
    if (N === Math.pow(10, k)) return k === 0 ? '1' : `10${sup(k)}`;
    return N < 1e4 ? String(N) : sci(N, 2);
  }
  const pct = (x, d) => `${fix(100 * x, d == null ? 1 : d)}%`;

  /* ---------- the protocol of Appendix D (spec: exact numerical contract) ---------- */
  const NSCALE = 1e4;                           // ⟨e₀|e₁⟩ = exp(−1/10⁴), so γ(N) = exp(−N/10⁴)   (MODEL)
  const GRW_LAMBDA = 1e-16, GRW_T = 1;          // illustrative GRW rate per constituent (s⁻¹) and time (s)   (MODEL)
  const SEED = 1961;                            // the seeded uniform variate ξ of the sampled record   (MODEL)
  const Nof = (u) => Math.max(1, Math.round(Math.pow(10, u)));
  const h2 = (x) => (x <= 0 || x >= 1 ? 0 : -x * Math.log2(x) - (1 - x) * Math.log2(1 - x));
  const xiOf = (k) => TRV.mulberry32(SEED + k)();

  // complex numbers and the Bell pair, for the local / correlation sectors of |Φ⁺⟩ (computed, not typed in)
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const PAULI = {
    x: [[[0, 0], [1, 0]], [[1, 0], [0, 0]]],
    y: [[[0, 0], [0, -1]], [[0, 1], [0, 0]]],
    z: [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]],
    i: [[[1, 0], [0, 0]], [[0, 0], [1, 0]]]
  };
  const PHI_PLUS = [[Math.SQRT1_2, 0], [0, 0], [0, 0], [Math.SQRT1_2, 0]];   // (|00⟩ + |11⟩)/√2, index 2·s + b
  /** ⟨Φ⁺| A ⊗ B |Φ⁺⟩ (real for Hermitian A, B). */
  function pairExpect(A, B) {
    let re = 0;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const m = cm(A[i >> 1][j >> 1], B[i & 1][j & 1]);
      const v = cm(m, PHI_PLUS[j]);
      re += PHI_PLUS[i][0] * v[0] + PHI_PLUS[i][1] * v[1];
    }
    return re;
  }
  const AX = ['x', 'y', 'z'];
  const SECTORS = {
    a: AX.map((k) => pairExpect(PAULI[k], PAULI.i)),
    b: AX.map((k) => pairExpect(PAULI.i, PAULI[k])),
    T: AX.map((i) => AX.map((j) => pairExpect(PAULI[i], PAULI[j])))
  };

  // the 16-state arena {0,1}⁴ and its readouts: base b₀b₁b₂, parity b₀⊕b₁⊕b₂⊕b₃, redundant b₀⊕b₁
  const STATES = Array.from({ length: 16 }, (_, k) => [k & 1, (k >> 1) & 1, (k >> 2) & 1, (k >> 3) & 1]);
  const READ = {
    base: (b) => `${b[0]}${b[1]}${b[2]}`,
    parity: (b) => String(b[0] ^ b[1] ^ b[2] ^ b[3]),
    redundant: (b) => String(b[0] ^ b[1])
  };
  function fibersOf(names) {
    const m = new Map();
    STATES.forEach((b, k) => { const key = names.map((n) => READ[n](b)).join('|'); if (!m.has(key)) m.set(key, []); m.get(key).push(k); });
    return [...m.values()];
  }
  const orderedPairs = (fib) => fib.reduce((a, f) => a + f.length * (f.length - 1), 0);
  function escapeLedger(mode) {
    const base = fibersOf(['base']), fib = mode === 'none' ? base : fibersOf(['base', mode]);
    const pairs = orderedPairs(fib), basePairs = orderedPairs(base), sumSq = fib.reduce((a, f) => a + f.length * f.length, 0);
    return { mode, fibers: fib, pairs, rate: pairs / (16 * 15), H2: Math.log2(sumSq / 16), capture: basePairs - pairs, basePairs };
  }

  /** Everything the page shows, from the dials. */
  function model(s) {
    const th = s.theta * DEG, c = Math.cos(th), sn = Math.sin(th), p = c * c, q = 1 - p;
    const N = Nof(s.u), gamma = Math.exp(-N / NSCALE), g2 = gamma * gamma;
    const off = -c * sn * gamma;                                   // ρ_L = [[p, −csγ], [−csγ, 1 − p]]
    const rho = [[p, off], [off, q]], pinched = [[p, 0], [0, q]];
    const purity = p * p + q * q + 2 * p * q * g2;
    const deleted = off * off + off * off;                         // |ρ₀₁|² + |ρ₁₀|² = 2p(1 − p)γ²
    const vis = 2 * Math.sqrt(p * q) * gamma, visFull = 2 * Math.sqrt(p * q);
    const r2 = (2 * p - 1) ** 2 + 4 * p * q * g2, tangle = 4 * p * q * (1 - g2);
    const S = h2((1 + Math.sqrt(Math.max(0, r2))) / 2), Hp = h2(p);
    const grw = -Math.expm1(-N * GRW_LAMBDA * GRW_T), oneMinusGamma = -Math.expm1(-N / NSCALE);
    const xi = xiOf(s.xiDraw), sel = xi < p ? 0 : 1;
    // Bell: A(a) = cos a Z + sin a X, B(b) = cos b Z + sin b X, E(a, b) = cos(a − b), P(x, y | a, b) = [1 + xyE]/4
    const E = (a, b) => Math.cos(a - b), Pj = (x, y, a, b) => (1 + x * y * E(a, b)) / 4;
    const S0 = [[0, Math.PI / 4], [0, -Math.PI / 4], [Math.PI / 2, Math.PI / 4], [Math.PI / 2, -Math.PI / 4]];
    const chshTerms = S0.map(([a, b], k) => (k === 3 ? -1 : 1) * E(a, b)), chsh = chshTerms.reduce((x, y) => x + y, 0);
    const aSel = 2 * th, margA = Pj(1, 1, aSel, 0) + Pj(1, -1, aSel, 0), margB = Pj(1, 1, aSel, 0) + Pj(-1, 1, aSel, 0);
    const condPlus = Pj(1, 1, aSel, 0) / margB;                    // P(x = +1 | y = +1) = cos²θ
    // boost of A = (0, −1), B = (0, +1) in units c = 1, L = 1
    const beta = s.beta, G = 1 / Math.sqrt(1 - beta * beta), ev = (t, x) => [G * (t - beta * x), G * (x - beta * t)];
    const A1 = ev(0, -1), B1 = ev(0, 1), dt = B1[0] - A1[0], dx = B1[1] - A1[1];
    // squaring and phase: (AB)(BA) for unit A = e₁, B = (c, s); R = [[0, −1], [1, 0]]; |+⟩, |−⟩ on Z and X
    const AB = [c, sn], BA = [c, -sn], ABBA = cm(AB, BA);
    const R2 = [[0 * 0 + -1 * 1, 0 * -1 + -1 * 0], [1 * 0 + 0 * 1, 1 * -1 + 0 * 0]];
    const plusZ = 0.5, minusZ = 0.5, plusX = 1, minusX = -1;      // ⟨±|P₀|±⟩ and ⟨±|X|±⟩ of (|0⟩ ± |1⟩)/√2
    // Robertson–Schrödinger for |u_θ⟩ = (c, s), A = Z, B = X: u = Zψ − ⟨Z⟩ψ, v = Xψ − ⟨X⟩ψ
    const ez = c * c - sn * sn, ex = 2 * c * sn, u = [c - ez * c, -sn - ez * sn], v = [sn - ex * c, c - ex * sn];
    const varZ = u[0] * u[0] + u[1] * u[1], varX = v[0] * v[0] + v[1] * v[1], cov = u[0] * v[0] + u[1] * v[1];
    const rob = { varZ, varX, prod: varZ * varX, C2: cov * cov, K2: 0, G: varZ * varX - cov * cov, covOp: 0 - ez * ex };
    return {
      theta: s.theta, c, s: sn, p, q, N, u: s.u, gamma, rho, pinched, purity, deleted, vis, visFull, r2, tangle, S, Hp, dS: Hp - S,
      grw, oneMinusGamma, xi, sel, chshTerms, chsh, margA, margB, condPlus, beta, G, dt, dx, interval: dt * dt - dx * dx,
      tA: A1[0], tB: B1[0], ABBA, R2, plusZ, minusZ, plusX, minusX, rob, esc: escapeLedger(s.parity)
    };
  }

  /* ---------- state, the five lenses, the six cards ---------- */
  const state = { focus: 'cut', lens: 'copenhagen', theta: 30, u: 0, beta: 0, parity: 'none', xiDraw: 0 };
  const LENS_ORDER = ['copenhagen', 'many-worlds', 'pilot-wave', 'grw-collapse', 'ortho-open-dim'];
  const LENSES = {
    copenhagen: { name: ['哥本哈根', 'Copenhagen'],
      keeps: () => ['一个结果', 'one outcome'],
      adds: () => ['约定的切割 + 单一结果公设', 'a stipulated cut + a one-outcome postulate'],
      long: () => ['把非选择性信道（捏合）、以 B = 0 为条件的记录更新与“只出现一个结果”分开：前两样是计算，最后一样是额外的公设。切割放在哪里是约定（MODEL）。', 'Keeps the non-selective channel (pinching), the record update conditioned on B = 0 and "only one outcome occurs" apart: the first two are computations, the last an extra postulate. Where the cut sits is a stipulation (MODEL).'] },
    'many-worlds': { name: ['多世界', 'Many-worlds'],
      keeps: () => ['全局幺正，两支都在', 'global unitarity, both branches'],
      adds: (D) => [`权重 ${ratioStr(D)} : 1 要另作推导`, `a derivation of the ${ratioStr(D)} : 1 weights`],
      long: (D) => [`保留幺正的联合态与相对于分支的记录。数分支得 1 : 1，权重却是 ${ratioStr(D)} : 1；分支概率与唯一经验的推导是文献论证（ARGUED），不是捏合的推论。`, `Keeps the unitary joint state and branch-relative records. Counting branches gives 1 : 1, the weights are ${ratioStr(D)} : 1; deriving branch probabilities and a unique experience is argued in the literature (ARGUED), not a consequence of pinching.`] },
    'pilot-wave': { name: ['导航波', 'Pilot wave'],
      keeps: () => ['确定的轨迹', 'a definite trajectory'],
      adds: () => ['构型、引导律、|ψ|² 平衡', 'configuration, guidance, |ψ|² equilibrium'],
      long: () => ['琥珀色的粒子按种子 ξ 落进一支（|ψ|² 平衡的假设），另一支是空的波。粒子构型、引导律与平衡分布都是附加假设；非局域引导不给可控信号，相对论推广要另行规定（MODEL）。', 'The amber particle sits in one branch, drawn with the seeded ξ (the |ψ|² equilibrium assumption); the other branch is an empty wave. Configuration, guidance law and equilibrium are additional assumptions; non-local guidance gives no controllable signal, and a relativistic extension needs its own specification (MODEL).'] },
    'grw-collapse': { name: ['客观坍缩', 'Objective collapse'], short: ['客观坍缩', 'GRW collapse'],
      keeps: () => ['无需观察者的坍缩', 'observer-free collapse'],
      adds: (D) => [`新的随机动力学；q ≈ ${sci(D.grw)}`, `new stochastic dynamics; q ≈ ${sci(D.grw)}`],
      long: (D) => [`真正改写动力学，与退相干不同。示意参数 λ = 10⁻¹⁶ s⁻¹、t = 1 s：q = −expm1(−Nλt) = ${sci(D.grw)}。N = 10⁶ 时也只有 10⁻¹⁰，要 N ≳ 10¹⁶–10²³ 才快；按 p、1 − p 选一支是模型规定（MODEL）。`, `A real change of the dynamics, unlike decoherence. Illustrative λ = 10⁻¹⁶ s⁻¹, t = 1 s: q = −expm1(−Nλt) = ${sci(D.grw)}. Even at N = 10⁶ it is only 10⁻¹⁰; it takes N ≳ 10¹⁶–10²³ to be fast. Picking a branch with weights p, 1 − p is a model prescription (MODEL).`] },
    'ortho-open-dim': { name: ['正交开维', 'Orthogonal open dimension'], short: ['正交开维', 'Open dimension'],
      keeps: () => ['二次读数、纤维、余量方向', 'quadratic readouts, fibers, residual directions'],
      adds: () => ['时间 = 新维度：开放提议', 'time = a new dimension: an open proposal'],
      long: () => ['保留有限观察者的读数、看不见的纤维、公因子的义务与余量方向（紫色箭头）。“时间是正交维的扩张”是作者的模型与开放提议：这些有限的代数结果不解决确定结果、ψ 本体、洛伦兹协变、量子引力或黑洞信息问题。', 'Keeps the finite observer\'s readouts, the unseen fibers, the common-factor obligation and the residual direction (violet arrow). "Time as orthogonal expansion" is the author\'s model and open proposal: these finite algebraic results do not solve definite outcomes, ψ-ontology, Lorentz covariance, quantum gravity or black-hole information.'] }
  };
  const lensName = (id) => L(...LENSES[id].name);
  function ratioStr(D) { if (D.q < 1e-9) return '∞'; const r = D.p / D.q; return Math.abs(r - Math.round(r)) < 5e-3 ? String(Math.round(r)) : fix(r, 2); }

  const FOCUS_RAIL = { cut: 'u', andor: 'u', born: 'theta', bell: 'beta', horizon: 'u', duel: 'u' };
  const RAILS = {
    u: { max: 6, rate: 1.2, step: 1, get: () => state.u, set: (t) => { state.u = t; } },
    theta: { max: 90, rate: 18, step: 15, get: () => state.theta, set: (t) => { state.theta = t; } },
    beta: { max: 1.6, rate: 0.32, step: 0.2, get: () => state.beta + 0.8, set: (t) => { state.beta = clamp(t - 0.8, -0.8, 0.8); } }
  };
  const CARDS = {
    'wigner-cut': { focus: 'cut', lens: 'copenhagen', theta: 30, u: 0, beta: 0 },
    'and-to-or': { focus: 'andor', lens: 'copenhagen', theta: 30, u: 6, beta: 0, play: true, from: 0 },
    'born-unequal': { focus: 'born', lens: 'many-worlds', theta: 30, u: 0, beta: 0, play: true, from: 0, stop: 30 },
    'bell-epr': { focus: 'bell', lens: 'pilot-wave', theta: 30, u: 0, beta: 0.6, play: true, from: 0, stop: 1.4 },
    'time-horizon': { focus: 'horizon', lens: 'ortho-open-dim', theta: 30, u: 4, beta: 0, parity: 'none', play: true, from: 0, stop: 4 },
    'five-way-duel': { focus: 'duel', lens: 'copenhagen', theta: 30, u: 4, beta: 0 }
  };

  /* ---------- canvas helpers (CSS pixels) ---------- */
  const cv = $('cv'), stageEl = $('stage'), hudTl = $('hudTl'), lensBar = $('lensBar'), legendEl = $('legend');
  let ctx = null, W = 0, H = 0;
  const hits = [];                               // draggable regions of this frame
  const face = (f) => (f === 'data' ? TRV.fonts.data : f === 'display' ? TRV.fonts.display : TRV.fonts.body);
  const font = (px, f, w) => `${w || 400} ${px}px ${face(f)}`;
  /** Text at (x, y); o: size, face, weight, align, base, alpha, max (shrink to fit). Nothing on the wordless cover. */
  function T(x, y, str, color, o) {
    if (TRV.thumbMode || str == null || str === '') return 0;
    o = o || {};
    let size = o.size || 11;
    ctx.font = font(size, o.face, o.weight);
    if (o.max) while (size > 7.5 && ctx.measureText(str).width > o.max) { size -= 0.5; ctx.font = font(size, o.face, o.weight); }
    ctx.fillStyle = color || P.ink; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.shadowColor = P.stage; ctx.shadowBlur = 4;
    ctx.fillText(str, x, y);
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    return ctx.measureText(str).width;
  }
  /** Greedy line breaking (words for Latin text, characters for Chinese). */
  function wrap(str, maxW, size, f, w) {
    ctx.font = font(size, f, w);
    const tokens = str.match(/[\x21-\x7e²³¹×⁰-₟−′≈≤≥‖⟨⟩α-ωΑ-Ω]+|\s+|[^\s]/gu) || [];
    const lines = []; let cur = '';
    for (const tk of tokens) {
      const next = cur + tk;
      if (cur && !/^\s+$/.test(tk) && ctx.measureText(next).width > maxW && !/^[，。、：；）！？,.;:)]$/.test(tk)) { lines.push(cur.trimEnd()); cur = tk.trimStart(); }
      else cur = next;
    }
    if (cur.trim()) lines.push(cur.trim());
    return lines;
  }
  /** Wrapped text; returns the height used. */
  function TW(x, y, str, color, maxW, o) {
    o = o || {};
    if (TRV.thumbMode) return 0;
    const size = o.size || 11, lh = o.lh || Math.round(size * 1.32), lines = wrap(str, maxW, size, o.face, o.weight).slice(0, o.lines || 9);
    lines.forEach((ln, i) => T(x, y + i * lh, ln, color, Object.assign({}, o, { base: 'top' })));
    return lines.length * lh;
  }
  /** Wrapped text that opens with a coloured lead word ("Keeps", "Adds"); the size shrinks until it fits maxH. */
  function TWlead(x, y, lead, leadColor, str, color, maxW, maxH, o) {
    if (TRV.thumbMode) return 0;
    o = o || {};
    let size = o.size || 10, lines, lh;
    const full = `${lead} ${str}`;
    for (;;) { lh = Math.round(size * 1.3); lines = wrap(full, maxW, size); if (lines.length * lh <= maxH || size <= 8) break; size -= 0.5; }
    lines.forEach((ln, i) => {
      const yy = y + i * lh;
      if (i === 0 && ln.startsWith(lead)) {
        const w0 = T(x, yy, lead, leadColor, { size, base: 'top', weight: 700 });
        T(x + w0 + size * 0.4, yy, ln.slice(lead.length).trimStart(), color, { size, base: 'top' });
      } else T(x, yy, ln, color, { size, base: 'top' });
    });
    return lines.length * lh;
  }
  function shape(path, o) {
    o = o || {};
    ctx.beginPath(); path();
    if (o.fill) { ctx.globalAlpha = o.alpha == null ? 0.2 : o.alpha; ctx.fillStyle = o.fill; if (o.glow) { ctx.shadowColor = o.fill; ctx.shadowBlur = o.glow; } ctx.fill(); ctx.shadowBlur = 0; }
    if (o.stroke) {
      ctx.globalAlpha = o.strokeAlpha == null ? 1 : o.strokeAlpha; ctx.strokeStyle = o.stroke; ctx.lineWidth = (o.width || 1) * LW;
      ctx.setLineDash(o.dash || []); if (o.sglow) { ctx.shadowColor = o.stroke; ctx.shadowBlur = o.sglow; } ctx.stroke(); ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1; ctx.setLineDash([]);
  }
  const rect = (x, y, w, h, o) => shape(() => ctx.rect(x, y, w, h), o);
  /** A box with one chamfered corner pair, like the panels of the theme. */
  const box = (x, y, w, h, o) => {
    const k = (o && o.cut) || 8;
    shape(() => { ctx.moveTo(x + k, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h - k); ctx.lineTo(x + w - k, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + k); ctx.closePath(); }, o);
  };
  const seg = (x1, y1, x2, y2, color, o) => shape(() => { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); }, Object.assign({ stroke: color }, o));
  const circ = (x, y, r, o) => shape(() => ctx.arc(x, y, r, 0, 2 * Math.PI), o);
  const dot = (x, y, r, color, o) => circ(x, y, r * LW, Object.assign({ fill: color, alpha: 1 }, o));
  function arrow(x1, y1, x2, y2, color, o) {
    o = o || {};
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 1) return;
    const hd = Math.min((o.head || 8) * LW, len * 0.5), ux = dx / len, uy = dy / len;
    seg(x1, y1, x2 - ux * hd * 0.6, y2 - uy * hd * 0.6, color, o);
    shape(() => { ctx.moveTo(x2, y2); ctx.lineTo(x2 - ux * hd - uy * hd * 0.45, y2 - uy * hd + ux * hd * 0.45); ctx.lineTo(x2 - ux * hd + uy * hd * 0.45, y2 - uy * hd - ux * hd * 0.45); ctx.closePath(); },
      { fill: color, alpha: o.strokeAlpha == null ? 1 : o.strokeAlpha, glow: o.sglow });
  }
  /** A panel frame with a title; returns the inner rectangle. */
  function frame(x, y, w, h, title, nar) {
    box(x, y, w, h, { stroke: P.panelEdge, fill: P.cyan, alpha: 0.025, cut: 6 });
    const th = nar ? 15 : 18;
    if (title) T(x + 8, y + th / 2 + 2, title, P.dim, { size: nar ? 10 : 10.5, max: w - 16, weight: 600 });
    return { x: x + 8, y: y + th + 2, w: w - 16, h: h - th - 6 };
  }

  /* ---------- the friend's two records, drawn the way a lens reads them ---------- */
  function records(lens, D, c0, c1, o) {
    o = o || {};
    const cells = [c0, c1], wts = [D.p, D.q], one = lens === 'copenhagen', wave = lens === 'pilot-wave';
    if (lens === 'many-worlds' && o.from) {        // both branches leave the qubit, thick as their weights
      cells.forEach((c, k) => {
        const tx = c.x - 2, ty = c.y + c.h / 2, fx = o.from[0], fy = o.from[1], mx = (fx + tx) / 2;
        shape(() => { ctx.moveTo(fx, fy); ctx.bezierCurveTo(mx, fy, mx, ty, tx, ty); }, { stroke: P.cyan, width: 1 + 5 * wts[k], strokeAlpha: 0.8 });
      });
    }
    cells.forEach((c, k) => {
      const faded = one && k !== D.sel, bh = Math.max(0, (c.h - 4) * wts[k]);
      rect(c.x, c.y, c.w, c.h, { stroke: P.lineHot, width: 1, fill: P.void, alpha: 0.5 });
      rect(c.x + 2, c.y + c.h - 2 - bh, c.w - 4, bh, wave ? { fill: P.cyan, alpha: 0.14, stroke: P.cyan, dash: [3, 2], strokeAlpha: 0.9 } : { fill: P.cyan, alpha: faded ? 0.16 : 0.72 });
      T(c.x + c.w / 2, c.y + Math.min(c.h / 2, 10), String(k), faded ? P.dim : P.ink, { align: 'center', size: o.size || 10.5, face: 'data', weight: 600 });
    });
    const s = cells[D.sel];
    if (one) rect(s.x - 2.5, s.y - 2.5, s.w + 5, s.h + 5, { stroke: P.amber, width: 2, sglow: 8 });
    if (wave) dot(s.x + s.w / 2, s.y + s.h * 0.62, Math.max(3, Math.min(5, s.w * 0.18)), P.amber, { glow: 10 });
    const x0 = Math.min(c0.x, c1.x), x1 = Math.max(c0.x + c0.w, c1.x + c1.w), y0 = Math.min(c0.y, c1.y), y1 = Math.max(c0.y + c0.h, c1.y + c1.h);
    if (lens === 'grw-collapse' && o.gauge) {     // the GRW probability q on a log scale from 10⁻¹⁶ to 1
      const g = o.gauge, f = clamp((Math.log10(Math.max(D.grw, 1e-17)) + 16) / 16, 0, 1);
      rect(g.x, g.y, g.w, g.h, { stroke: P.violet, width: 1, strokeAlpha: 0.8 });
      rect(g.x, g.y, Math.max(1.5, g.w * f), g.h, { fill: P.violet, alpha: 0.8 });
      if (o.gaugeLabel !== false) T(g.x + g.w + 4, g.y + g.h / 2, `q ${sci(D.grw, 0)}`, P.violet, { size: o.size ? o.size - 0.5 : 10, face: 'data' });
    }
    if (lens === 'ortho-open-dim') {                // a residual direction leaves the readout plane
      const len = Math.max(10, o.escape || 26), ax = o.escapeLeft ? x0 - 7 : x1 + 7, ay = y0 + 2, dx = (o.escapeLeft ? -0.45 : 0.45) * len;
      arrow(ax, ay, ax + dx, ay - len, P.violet, { width: 2, head: 7, sglow: 8 });
      if (o.escapeLabel !== false) T(ax + dx + (o.escapeLeft ? -4 : 4), ay - len + 4, '⊥', P.violet, { align: o.escapeLeft ? 'right' : 'left', size: 12, weight: 600 });
      rect(x0 - 5, y0 - 5, x1 - x0 + 10, y1 - y0 + 10, { stroke: P.dim, dash: [2, 3], width: 1, strokeAlpha: 0.8 });
    }
    return { x0, x1, y0, y1 };
  }

  /* ---------- the apparatus: Bob ~ |Φ⁺⟩ ~ sealed lab [S → F → E^⊗N] · Wigner ---------- */
  function drawApparatus(D, R) {
    const nar = R.w < 560, fs = nar ? 10 : 11, capH = TRV.thumbMode ? 4 : (nar ? 15 : 17);
    const y = R.y + capH, h = R.h - capH;
    const bob = { x: R.x, y, w: Math.round(R.w * (nar ? 0.17 : 0.13)), h };
    const lab = { x: R.x + R.w * (nar ? 0.245 : 0.21), y, w: R.w * (nar ? 0.65 : 0.66), h };
    const wig = { x: lab.x + lab.w + 8, y, w: R.x + R.w - (lab.x + lab.w + 8), h };

    // Bob and his half of the pair
    box(bob.x, bob.y, bob.w, bob.h, { stroke: P.lineHot, fill: P.cyan, alpha: 0.03, width: 1.2 });
    T(bob.x + 2, R.y + capH / 2, L('远方的 Bob', 'Distant Bob'), P.ink, { size: fs, weight: 600, max: bob.w + (lab.x - bob.x - bob.w) - 6 });
    const bR = Math.max(8, Math.min(bob.w * 0.24, h * 0.17)), B = { x: bob.x + bob.w / 2, y: bob.y + h * 0.36 };
    circ(B.x, B.y, bR, { stroke: P.lineHot, width: 1.2 });
    arrow(B.x, B.y, B.x, B.y - bR * 0.92, P.ink, { width: 1.6, head: 6 });
    T(B.x - bR - 4, B.y + bR * 0.5, 'B', P.ink, { align: 'right', size: fs, face: 'data', weight: 600 });
    dot(B.x + bR * 0.9, B.y - bR * 0.9, 3.2, P.amber, { glow: 8 });                     // the herald B = 0
    T(B.x + bR * 0.9 + 5, B.y - bR * 0.9, nar ? '0' : 'B = 0', P.amber, { size: fs - 1, face: 'data' });
    // Bob's own marginal: 50 / 50 whatever happens in the lab (hollow: unconditional)
    const mbW = Math.max(6, bob.w * 0.18), mbH = h * 0.24, mbY = bob.y + h - 8;
    [0.5, 0.5].forEach((m, k) => {
      const x = B.x - mbW - 2 + k * (mbW + 4);
      rect(x, mbY - mbH, mbW, mbH, { stroke: P.cyan, width: 1, strokeAlpha: 0.5 });
      rect(x, mbY - mbH * m, mbW, mbH * m, { stroke: P.cyan, width: 1.4 });
    });
    if (!nar) T(B.x, mbY - mbH - 7, '50 / 50', P.cyan, { align: 'center', size: 9.5, face: 'data' });

    // the sealed lab
    box(lab.x, lab.y, lab.w, lab.h, { stroke: P.lineHot, fill: P.cyan, alpha: 0.035, width: 1.5 });
    const sR = Math.max(11, Math.min(h * 0.27, lab.w * 0.085));
    const S = { x: lab.x + sR + Math.max(12, lab.w * 0.045), y: lab.y + h * 0.56, r: sR };
    const fW = Math.max(16, Math.min(lab.w * 0.07, 30)), fH = Math.max(14, Math.min(h * 0.3, 38));
    const fx = S.x + S.r + Math.max(24, lab.w * 0.11);
    const F0 = { x: fx, y: S.y - fH - 3, w: fW, h: fH }, F1 = { x: fx, y: S.y + 3, w: fW, h: fH };
    const sfRight = fx + fW + Math.max(12, lab.w * 0.035);
    // the access boundary of "SF": what Wigner reaches without the environment
    rect(lab.x + 5, lab.y + 5, sfRight - lab.x - 5, lab.h - 10, { stroke: P.dim, dash: [4, 3], width: 1, strokeAlpha: 0.7 });
    T(lab.x + 10, lab.y + lab.h - 12, 'SF', P.dim, { size: fs - 0.5, face: 'data', weight: 600 });
    T(lab.x + 2, R.y + capH / 2, L('密封实验室 · SF + E', 'Sealed lab · SF + E'), P.ink, { size: fs, weight: 600, max: lab.w * 0.56 });

    // the qubit S: |u_θ⟩ against |0⟩ and |1⟩, with a landmark at 30°
    circ(S.x, S.y, S.r, { stroke: P.lineHot, width: 1.2, fill: P.void, alpha: 0.4 });
    seg(S.x - S.r, S.y, S.x + S.r, S.y, P.faint, { width: 1 }); seg(S.x, S.y + S.r, S.x, S.y - S.r, P.faint, { width: 1 });
    const t30 = 30 * DEG;
    seg(S.x + (S.r - 4) * Math.cos(t30), S.y - (S.r - 4) * Math.sin(t30), S.x + (S.r + 4) * Math.cos(t30), S.y - (S.r + 4) * Math.sin(t30), P.ink, { width: 1.4 });
    const tip = [S.x + S.r * D.c, S.y - S.r * D.s];
    seg(S.x, S.y, S.x + S.r * D.c, S.y, P.cyan, { width: 3, sglow: 6 });
    seg(S.x, S.y, S.x, S.y - S.r * D.s, P.cyan, { width: 3, sglow: 6, strokeAlpha: 0.75 });
    arrow(S.x, S.y, tip[0], tip[1], P.amber, { width: 2.4, head: 8, sglow: 10 });
    T(S.x - S.r - 3, S.y - S.r + 2, 'S', P.ink, { align: 'right', size: fs, face: 'data', weight: 600 });
    hits.push({ kind: 'theta', x: S.x, y: S.y, r: S.r + 12 });

    // the EPR link (correlation, not a signal) from B to S
    {
      const x0 = B.x + bR + 3, x1 = S.x - S.r - 3, y0 = B.y, y1 = S.y, n = 48, amp = Math.max(2.5, h * 0.025);
      shape(() => { for (let i = 0; i <= n; i++) { const f = i / n, x = x0 + (x1 - x0) * f, yy = y0 + (y1 - y0) * f + amp * Math.sin(f * Math.PI * 8); if (i) ctx.lineTo(x, yy); else ctx.moveTo(x, yy); } },
        { stroke: P.magenta, width: 1.5, dash: [5, 3], strokeAlpha: 0.9 });
      T((x0 + x1) / 2 + 4, (y0 + y1) / 2 + amp + 11, '|Φ⁺⟩', P.magenta, { align: 'center', size: fs, face: 'data' });
    }

    // copies (process II): S → F, F → E
    const copyCol = P.dim;
    arrow(S.x + S.r + 3, S.y - 3, F0.x - 4, F0.y + F0.h / 2, copyCol, { width: 1, head: 6, strokeAlpha: 0.8 });
    arrow(S.x + S.r + 3, S.y + 3, F1.x - 4, F1.y + F1.h / 2, copyCol, { width: 1, head: 6, strokeAlpha: 0.8 });
    T(F0.x + fW / 2, F0.y - 8, 'F', P.ink, { align: 'center', size: fs, face: 'data', weight: 600 });

    // the environment E^⊗N: lit cells grow with lg N; magenta strength = 1 − γ², the which-path record now in E
    const ex0 = sfRight + Math.max(10, lab.w * 0.03), ex1 = lab.x + lab.w - 10;
    const cols = nar ? 7 : 12, rows = 2, gapE = 3;
    const cell = Math.max(5, Math.min((ex1 - ex0 - (cols - 1) * gapE) / cols, h * 0.16));
    const gridW = cols * cell + (cols - 1) * gapE, gx = ex0, gy = lab.y + Math.max(20, h * 0.2);
    const lit = Math.round(cols * rows * D.u / 6), escaped = 1 - D.gamma * D.gamma;
    for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) {
      const i = r * cols + k, x = gx + k * (cell + gapE), yy = gy + r * (cell + gapE);
      rect(x, yy, cell, cell, { stroke: P.lineHot, width: 1, strokeAlpha: 0.8 });
      if (i < Math.max(1, lit)) rect(x + 1, yy + 1, cell - 2, cell - 2, { fill: P.magenta, alpha: 0.12 + 0.78 * escaped });
    }
    arrow(sfRight - 8, S.y, gx - 4, gy + cell + gapE / 2, copyCol, { width: 1, head: 6, strokeAlpha: 0.8 });
    T(gx, gy - 8, `E⊗N · N = ${fmtN(D.N)}`, P.ink, { size: fs - 0.5, face: 'data', max: Math.max(40, lab.x + lab.w - gx - 8) });
    // the overlap of the two environment records: cyan shadow γ, magenta wedge between them
    const gy2 = gy + rows * (cell + gapE) + 6, gaugeR = Math.min(lab.y + lab.h - gy2 - 10, (ex1 - ex0) * 0.32, 46);
    if (gaugeR > 14) {
      const ox = gx + 4, oy = lab.y + lab.h - 10, ang = Math.acos(clamp(D.gamma, 0, 1));
      shape(() => { ctx.moveTo(ox, oy); ctx.arc(ox, oy, gaugeR * 0.55, 0, -ang, true); ctx.closePath(); }, { fill: P.magenta, alpha: 0.32 });
      arrow(ox, oy, ox + gaugeR, oy, P.ink, { width: 1.4, head: 6 });
      arrow(ox, oy, ox + gaugeR * Math.cos(ang), oy - gaugeR * Math.sin(ang), P.ink, { width: 1.4, head: 6 });
      seg(ox, oy + 2, ox + gaugeR * D.gamma, oy + 2, P.cyan, { width: 3, sglow: 6 });
      T(ox + gaugeR + 6, oy - 4, `γ = ${fix(D.gamma, 3)}`, P.cyan, { size: fs - 0.5, face: 'data' });
      if (!nar) T(ox + gaugeR + 6, oy - 18, L('两份环境记录的重叠', 'overlap of the two records in E'), P.dim, { size: 9.5, max: ex1 - ox - gaugeR - 8 });
    } else T(gx, gy2 + 6, `γ = ${fix(D.gamma, 3)}`, P.cyan, { size: fs - 0.5, face: 'data' });

    // the lens on the records
    const lens = state.lens;
    if (lens === 'copenhagen') {
      const cx = (S.x + S.r + F0.x) / 2 + 4;
      seg(cx, lab.y + 8, cx, lab.y + lab.h - 8, P.amber, { width: 1.6, dash: [5, 4], sglow: 6 });
      T(cx - 4, lab.y + 12, L('切割', 'cut'), P.amber, { align: 'right', size: fs - 1, weight: 600 });
    }
    records(lens, D, F0, F1, { from: [S.x + S.r, S.y], size: fs - 0.5, gauge: { x: F1.x - 2, y: F1.y + F1.h + 5, w: fW + 4, h: 4 }, gaugeLabel: !nar, escape: Math.min(44, F0.y - lab.y - 4), escapeLeft: true });
    if (lens === 'pilot-wave') {                   // guidance: non-local, but no controllable signal
      const x0 = B.x, x1 = S.x, top = Math.max(lab.y + 6, Math.min(B.y - bR, S.y - S.r) - h * 0.12);
      shape(() => { ctx.moveTo(x0 + bR * 0.3, B.y - bR - 2); ctx.bezierCurveTo(x0 + bR, top, x1 - S.r, top, x1, S.y - S.r - 2); }, { stroke: P.violet, width: 1.2, dash: [2, 3], strokeAlpha: 0.9 });
    }
    const lensLabel = nar ? L(...(LENSES[lens].short || LENSES[lens].name)) : `${L('透镜', 'Lens')} · ${lensName(lens)}`;
    T(lab.x + lab.w - 2, R.y + capH / 2, lensLabel, P.amber, { align: 'right', size: fs, weight: 600, max: lab.w * 0.42 });

    // Wigner outside: an eye on the lab
    if (wig.w > 16) {
      const ex = wig.x + wig.w * 0.5, ey = wig.y + h * 0.45, er = Math.min(wig.w * 0.36, h * 0.16, 22);
      shape(() => { ctx.moveTo(ex - er, ey); ctx.quadraticCurveTo(ex, ey - er * 0.9, ex + er, ey); ctx.quadraticCurveTo(ex, ey + er * 0.9, ex - er, ey); ctx.closePath(); }, { stroke: P.ink, width: 1.3, fill: P.void, alpha: 0.5 });
      dot(ex - er * 0.2, ey, Math.max(2, er * 0.28), P.ink);
      seg(ex - er - 4, ey, lab.x + lab.w + 2, ey, P.dim, { width: 1, dash: [2, 3] });
      T(ex, ey + er + 10, nar ? 'W' : L('维格纳', 'Wigner'), P.ink, { align: 'center', size: fs, weight: 600, max: wig.w + 6 });
    }
    return { S, F0, F1, lab, bob, B };
  }

  /* ---------- a 2 × 2 density matrix: square area = |entry|; cyan diagonal, magenta coherence ---------- */
  function matrix(x, y, size, M, o) {
    o = o || {};
    const c = size / 2, fsz = o.size || 10.5;
    seg(x - 4, y, x - 4, y + size, P.ink, { width: 1.2, strokeAlpha: 0.7 }); seg(x - 4, y, x, y, P.ink, { width: 1.2, strokeAlpha: 0.7 }); seg(x - 4, y + size, x, y + size, P.ink, { width: 1.2, strokeAlpha: 0.7 });
    seg(x + size + 4, y, x + size + 4, y + size, P.ink, { width: 1.2, strokeAlpha: 0.7 }); seg(x + size, y, x + size + 4, y, P.ink, { width: 1.2, strokeAlpha: 0.7 }); seg(x + size, y + size, x + size + 4, y + size, P.ink, { width: 1.2, strokeAlpha: 0.7 });
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const cx = x + j * c + c / 2, cy = y + i * c + c / 2, diag = i === j, val = M[i][j], room = c - 8;
      rect(x + j * c + 1, y + i * c + 1, c - 2, c - 2, { stroke: P.panelEdge, width: 1 });
      if (o.ghost && !diag) { const gs = room * Math.sqrt(Math.abs(o.ghost[i][j])); if (gs > 2) rect(cx - gs / 2, cy - gs / 2, gs, gs, { stroke: P.magenta, dash: [3, 3], width: 1.2, strokeAlpha: 0.75 }); }
      const side = room * Math.sqrt(Math.min(1, Math.abs(val)));
      if (side > 0.8) rect(cx - side / 2, cy - side / 2, side, side, { fill: diag ? P.cyan : P.magenta, alpha: 0.7, stroke: diag ? P.cyan : P.magenta, width: 1, glow: 6 });
      T(cx, cy, Math.abs(val) < 5e-4 ? '0' : fix(val, o.digits == null ? 3 : o.digits), P.ink, { align: 'center', size: fsz, face: 'data', weight: 600 });
    }
  }

  /** A horizontal bar on [0, max]; parts: [[value, colour, hollow]]. */
  function hbar(x, y, w, h, parts, max, o) {
    o = o || {};
    rect(x, y, w, h, { stroke: P.lineHot, width: 1, strokeAlpha: 0.9 });
    let acc = 0;
    for (const [v, col, hollow] of parts) {
      const x0 = x + w * acc / max, ww = w * v / max;
      if (ww > 0.3) rect(x0, y, ww, h, hollow ? { stroke: col, width: 1.4 } : { fill: col, alpha: o.alpha || 0.75, stroke: col, width: 1 });
      acc += v;
    }
  }

  /* ---------- the six readout pictures ---------- */
  function split3(R, nar, firstShare) {
    const g = 8;
    if (!nar) { const w = (R.w - 2 * g) / 3; return [[R.x, R.y, w, R.h], [R.x + w + g, R.y, w, R.h], [R.x + 2 * (w + g), R.y, w, R.h]]; }
    const h1 = Math.round(R.h * (firstShare || 0.55)), w2 = (R.w - g) / 2;
    return [[R.x, R.y, w2, h1], [R.x + w2 + g, R.y, w2, h1], [R.x, R.y + h1 + g, R.w, R.h - h1 - g]];
  }

  function focusCut(D, R, nar) {
    const [A, Bq, C] = split3(R, nar), fs = nar ? 10 : 11;
    const room = TRV.thumbMode ? 6 : nar ? 20 : 34, dg = nar ? 2 : 3;
    const a = frame(...A, L('朋友在里面：捏合 P(ρ)', 'Friend inside: pinched P(ρ)'), nar);
    const ms = Math.min(a.w - 16, a.h - room);
    matrix(a.x + (a.w - ms) / 2, a.y + 2, ms, D.pinched, { ghost: D.rho, size: nar ? 9.5 : 10.5, digits: dg });
    T(a.x + a.w / 2, a.y + ms + (nar ? 11 : 13), L(`再捏一次不变 · 删去 C = ${fix(D.deleted, 3)}`, `pinch again: no change · deleted C = ${fix(D.deleted, 3)}`), P.dim, { align: 'center', size: fs - 1, max: a.w });
    const b = frame(...Bq, L('维格纳在外面：ρ（只碰 SF）', 'Wigner outside: ρ (SF only)'), nar);
    const ms2 = Math.min(b.w - 16, b.h - room);
    matrix(b.x + (b.w - ms2) / 2, b.y + 2, ms2, D.rho, { size: nar ? 9.5 : 10.5, digits: dg });
    T(b.x + b.w / 2, b.y + ms2 + (nar ? 11 : 13), L(`非对角 ${fix(D.rho[0][1], 3)}`, `off-diagonal ${fix(D.rho[0][1], 3)}`), P.magenta, { align: 'center', size: fs - 1, face: 'data', max: b.w });
    const c = frame(...C, L('维格纳能看到的干涉可见度', 'Interference Wigner can see'), nar);
    const rowsY = nar ? [c.y + 4, c.y + c.h / 2 + 2] : [c.y + c.h * 0.08, c.y + c.h * 0.52];
    const bw = c.w - (nar ? 110 : 52), bh = TRV.thumbMode ? 30 : nar ? 11 : 18;
    [[L('只碰 SF', 'SF only'), D.vis, L('环境里的那份记录撤不回', 'the record in E stays put')],
      [L('碰到 SF + E', 'SF + E'), D.visFull, L('逆幺正撤回整条拷贝', 'the inverse unitary undoes the copy')]].forEach(([lab, v, why], k) => {
      const yy = rowsY[k];
      T(c.x, yy + 6, lab, P.ink, { size: fs, weight: 600 });
      const bx = nar ? c.x + 70 : c.x, by = nar ? yy : yy + 16;
      hbar(bx, by, bw, bh, [[v, P.magenta]], 1);
      T(bx + bw + 6, by + bh / 2, fix(v, 3), P.magenta, { size: fs, face: 'data', weight: 600 });
      T(nar ? c.x : bx, nar ? by + bh + 9 : by + bh + 11, why, P.dim, { size: fs - 1, max: c.w });
    });
  }

  function focusAndOr(D, R, nar) {
    const [A, Bq, C] = split3(R, nar), fs = nar ? 10 : 11;
    const a = frame(...A, L('“与”：退相干后的混合 ρ', 'AND: the decohered mixture ρ'), nar);
    const ms = Math.min(a.w - 16, a.h - (nar ? 20 : 34));
    const ghost = model(Object.assign({}, state, { u: 0 })).rho;
    matrix(a.x + (a.w - ms) / 2, a.y + 2, ms, D.rho, { ghost, size: nar ? 9.5 : 10.5, digits: nar ? 2 : 3 });
    T(a.x + a.w / 2, a.y + ms + (nar ? 11 : 13), L(`γ = ${fix(D.gamma, 3)} · 虚线框：N = 1 时的相干`, `γ = ${fix(D.gamma, 3)} · dashed: the coherence at N = 1`), P.dim, { align: 'center', size: fs - 1, max: a.w });
    const b = frame(...Bq, L('纯度账：r² + τ = 1', 'Purity ledger: r² + τ = 1'), nar);
    const bw = b.w - 4, bh = nar ? 14 : 20, by = b.y + (nar ? 14 : b.h * 0.22);
    hbar(b.x, by, bw, bh, [[D.r2, P.cyan], [D.tangle, P.magenta]], 1);
    T(b.x, by - 8, `r² = ${fix(D.r2, 3)}`, P.cyan, { size: fs, face: 'data' });
    T(b.x + bw, by - 8, `τ = ${fix(D.tangle, 3)}`, P.magenta, { align: 'right', size: fs, face: 'data' });
    T(b.x, by + bh + 12, L(`纯度 Tr ρ² = ${fix(D.purity, 3)}`, `purity Tr ρ² = ${fix(D.purity, 3)}`), P.ink, { size: fs, face: 'data', max: b.w });
    T(b.x, by + bh + 28, L(`可见度 V = ${fix(D.vis, 3)} · 相干质量 C = ${fix(D.deleted, 3)}`, `visibility V = ${fix(D.vis, 3)} · coherence mass C = ${fix(D.deleted, 3)}`), P.magenta, { size: fs - 1, face: 'data', max: b.w });
    if (!nar) TW(b.x, by + bh + 44, L('青色：留在实验室里的长度；品红：搬进环境的关联。', 'Cyan: the length left in the lab; magenta: the correlation moved into the environment.'), P.dim, b.w, { size: 10 });
    const c = frame(...C, L('“或”：抽出一行（模型）', 'OR: draw one row (model)'), nar);
    const cw = nar ? 34 : Math.min(48, c.w * 0.2), ch = nar ? Math.min(46, c.h - 40) : Math.min(c.h * 0.48, 70), cx = c.x + (nar ? 8 : c.w * 0.1), cy = c.y + (nar ? 6 : 10);
    const r0 = { x: cx, y: cy, w: cw, h: ch }, r1 = { x: cx + cw + 12, y: cy, w: cw, h: ch };
    records('copenhagen', D, r0, r1, { size: fs });
    T(r0.x + cw / 2, cy + ch + 10, pct(D.p, 0), P.cyan, { align: 'center', size: fs - 1, face: 'data' });
    T(r1.x + cw / 2, cy + ch + 10, pct(D.q, 0), P.cyan, { align: 'center', size: fs - 1, face: 'data' });
    // the sampling rule on [0, 1]: record 0 when ξ < p
    const lx = r1.x + cw + (nar ? 16 : 22), lw = c.x + c.w - lx - 6, ly = cy + ch * 0.45;
    if (lw > 40) {
      hbar(lx, ly - 4, lw, 8, [[D.p, P.cyan], [D.q, P.cyan, true]], 1, { alpha: 0.55 });
      const xx = lx + lw * D.xi;
      seg(xx, ly - 12, xx, ly + 12, P.amber, { width: 2, sglow: 8 });
      T(clamp(xx, lx + 28, lx + lw - 28), ly - 19, `ξ = ${fix(D.xi, 3)}`, P.amber, { align: 'center', size: fs - 1, face: 'data', max: lw });
      T(lx, ly + 17, '0', P.dim, { size: 9.5, face: 'data' }); T(lx + lw, ly + 17, '1', P.dim, { align: 'right', size: 9.5, face: 'data' });
      T(lx + lw * D.p, ly + 17, 'p', P.cyan, { align: 'center', size: 9.5, face: 'data' });
    }
    TW(c.x, cy + ch + 24, L(`ξ ${D.xi < D.p ? '<' : '≥'} p，于是抽出记录 ${D.sel}：这一步是模型的抽样，捏合不给它。`, `ξ ${D.xi < D.p ? '<' : '≥'} p, so record ${D.sel} is drawn: a model's sampling step, not something pinching provides.`), P.dim, c.w, { size: fs - 1, lines: nar ? 2 : 3 });
  }

  function focusBorn(D, R, nar) {
    const [A, Bq, C] = split3(R, nar, 0.56), fs = nar ? 10 : 11;
    // the dial: |u⟩, its cyan shadows, |v⟩ = R|u⟩ and R²|u⟩ = −|u⟩
    const a = frame(...A, L('|u⟩ 与它的两段影子', '|u⟩ and its two shadows'), nar);
    const rr = Math.max(20, Math.min(a.w * 0.36, a.h * 0.42)), ox = a.x + a.w / 2, oy = a.y + a.h * 0.52;
    circ(ox, oy, rr, { stroke: P.lineHot, width: 1.2, fill: P.void, alpha: 0.35 });
    seg(ox - rr - 6, oy, ox + rr + 8, oy, P.faint, { width: 1 }); seg(ox, oy + rr + 6, ox, oy - rr - 8, P.faint, { width: 1 });
    T(ox + rr + 9, oy, '|0⟩', P.dim, { size: fs - 1, face: 'data' }); T(ox + 4, oy - rr - 9, '|1⟩', P.dim, { size: fs - 1, face: 'data' });
    const t30 = 30 * DEG;
    seg(ox + (rr - 5) * Math.cos(t30), oy - (rr - 5) * Math.sin(t30), ox + (rr + 5) * Math.cos(t30), oy - (rr + 5) * Math.sin(t30), P.ink, { width: 1.6 });
    T(ox + (rr + 20) * Math.cos(t30), oy - (rr + 20) * Math.sin(t30), '30°', P.ink, { align: 'center', size: fs - 1.5, face: 'data' });
    const ux = ox + rr * D.c, uy = oy - rr * D.s;
    arrow(ox, oy, ox - rr * D.c, oy + rr * D.s, P.violet, { width: 1.2, dash: [2, 3], head: 6, strokeAlpha: 0.6 });
    arrow(ox, oy, ox - rr * D.s, oy - rr * D.c, P.violet, { width: 1.6, dash: [5, 3], head: 7 });
    seg(ox, oy, ux, oy, P.cyan, { width: 4, sglow: 8 }); seg(ox, oy, ox, uy, P.cyan, { width: 4, sglow: 8, strokeAlpha: 0.75 });
    seg(ux, uy, ux, oy, P.cyan, { width: 1, dash: [2, 2], strokeAlpha: 0.6 }); seg(ux, uy, ox, uy, P.cyan, { width: 1, dash: [2, 2], strokeAlpha: 0.6 });
    arrow(ox, oy, ux, uy, P.amber, { width: 2.6, head: 9, sglow: 12 });
    hits.push({ kind: 'theta', x: ox, y: oy, r: rr + 14 });
    T(ox + rr * 0.6 * D.c - 12 * D.s, oy - rr * 0.6 * D.s - 12 * D.c, '|u⟩', P.amber, { align: 'center', size: fs, face: 'data', weight: 600 });
    T(ox - rr * D.s - 4, oy - rr * D.c - 8, 'R|u⟩', P.violet, { align: 'right', size: fs - 1, face: 'data' });
    if (!nar && !TRV.thumbMode) {
      const lab = 'R²|u⟩ = −|u⟩'; ctx.font = font(fs - 1.5, 'data');
      const lw = ctx.measureText(lab).width, lx = Math.max(a.x + 2, ox - rr * D.c - 4 - lw);
      T(lx, oy + rr * D.s + 10, lab, P.violet, { size: fs - 1.5, face: 'data' });
    }
    T(a.x, a.y + a.h - 6, `θ = ${fix(D.theta, 1)}°`, P.amber, { size: fs, face: 'data', weight: 600 });

    // conditional (filled) against unconditional (hollow) weights
    const b = frame(...Bq, L('条件与无条件', 'Conditional and unconditional'), nar);
    const groups = [[L('给定 B = 0', 'given B = 0'), [D.p, D.q], false], [L('不看 B', 'B unseen'), [D.margA, 1 - D.margA], true]];
    const gw = b.w / 2, colW = Math.max(9, Math.min(gw * 0.26, 30)), base = b.y + b.h - (nar ? 26 : 34), hMax = base - b.y - 16;
    groups.forEach(([lab, ws, hollow], g) => {
      const gx = b.x + g * gw + gw / 2;
      ws.forEach((w, k) => {
        const x = gx - colW - 2 + k * (colW + 4), hh = hMax * w;
        rect(x, base - hMax, colW, hMax, { stroke: P.lineHot, width: 1, strokeAlpha: 0.6 });
        rect(x, base - hh, colW, hh, hollow ? { stroke: P.cyan, width: 1.6 } : { fill: P.cyan, alpha: 0.78, stroke: P.cyan, width: 1 });
        T(x + colW / 2, base - hh - 8, pct(w, 0), P.cyan, { align: 'center', size: fs - 1, face: 'data' });
        T(x + colW / 2, base + 8, String(k), P.dim, { align: 'center', size: 9.5, face: 'data' });
      });
      T(gx, base + (nar ? 19 : 21), lab, P.ink, { align: 'center', size: fs - 0.5, max: gw - 4 });
    });
    if (!nar) T(b.x + b.w / 2, b.y + 6, 'cos²θ + sin²θ = (AB)(BA) = 1', P.dim, { align: 'center', size: 10, face: 'data', max: b.w });

    // many-worlds counting against the weights, and the phase that diagonal readouts cannot see
    const c = frame(...C, L('分支数与权重 · 对角读数的盲区', 'Branch count and weights · the diagonal blind spot'), nar);
    const half = nar ? c.w * 0.5 : c.w;
    const ty = c.y + (nar ? c.h * 0.42 : c.h * 0.24), tx = c.x + 6, tl = Math.min(half * 0.28, 56);
    const ends = [[tx + tl, ty - (nar ? 14 : 18)], [tx + tl, ty + (nar ? 14 : 18)]];
    ends.forEach(([ex, ey], k) => {
      seg(tx, ty, ex, ey, P.ink, { width: 2, strokeAlpha: 0.85 }); dot(ex, ey, 3, P.ink);
      const bwid = (half - tl - 46) * [D.p, D.q][k];
      rect(ex + 8, ey - 4, Math.max(1, bwid), 8, { fill: P.cyan, alpha: 0.78, stroke: P.cyan });
      T(ex + 12 + bwid, ey, pct([D.p, D.q][k], 0), P.cyan, { size: fs - 1, face: 'data' });
    });
    dot(tx, ty, 3, P.ink);
    const ratio = ratioStr(D);
    T(tx, ty + (nar ? 28 : 34), L(`分支 1 : 1，权重 ${ratio} : 1`, `branches 1 : 1, weights ${ratio} : 1`), P.ink, { size: fs - 1, max: half - 8 });
    // |+⟩ and |−⟩: Z readouts ½, ½ (cyan) · X readouts +1, −1 (magenta)
    const px0 = nar ? c.x + half + 6 : c.x + 6, pw = nar ? half - 10 : c.w - 12, py = nar ? c.y + 4 : c.y + c.h * 0.6, ph = nar ? c.h - 20 : c.h * 0.36;
    const mid = py + ph / 2, unit = ph / 2 - 4, cw = Math.max(7, Math.min(16, pw / 9));
    seg(px0, mid, px0 + pw, mid, P.faint, { width: 1 });
    const bars = [['Z', '+', D.plusZ, P.cyan], ['Z', '−', D.minusZ, P.cyan], ['X', '+', D.plusX, P.magenta], ['X', '−', D.minusX, P.magenta]];
    bars.forEach(([ob, st, v, col], k) => {
      const x = px0 + pw * (0.12 + k * 0.22) + (k > 1 ? pw * 0.04 : 0);
      rect(x, v >= 0 ? mid - unit * v : mid, cw, unit * Math.abs(v), { fill: col, alpha: 0.78, stroke: col });
      T(x + cw / 2, v >= 0 ? mid - unit * v - 7 : mid + unit * Math.abs(v) + 7, `|${st}⟩`, P.ink, { align: 'center', size: 9.5, face: 'data' });
      if (k % 2 === 0) T(x + cw + 2, v >= 0 ? mid + 9 : mid - 9, ob, col, { align: 'center', size: fs - 1, face: 'data', weight: 600 });
    });
  }

  function focusBell(D, R, nar) {
    const g = 8, fs = nar ? 10 : 11;
    let A, Bq, C;
    if (!nar) { const w1 = R.w * 0.3, w2 = R.w * 0.36; A = [R.x, R.y, w1, R.h]; Bq = [R.x + w1 + g, R.y, w2, R.h]; C = [R.x + w1 + w2 + 2 * g, R.y, R.w - w1 - w2 - 2 * g, R.h]; }
    else { const h1 = Math.round(R.h * 0.58), w2 = (R.w - g) * 0.44; A = [R.x, R.y, w2, h1]; Bq = [R.x + w2 + g, R.y, R.w - w2 - g, h1]; C = [R.x, R.y + h1 + g, R.w, R.h - h1 - g]; }
    // CHSH: the four axes in the Bloch plane and the four correlation terms stacked against the local bound 2
    const a = frame(...A, L('CHSH：四组设置', 'CHSH: four settings'), nar);
    const sh = nar ? 10 : 14, sy = a.y + a.h - sh - 20, rr = Math.max(12, Math.min(a.w * 0.26, (sy - a.y - 40) / 2)), ox = a.x + a.w / 2, oy = a.y + rr + 12;
    circ(ox, oy, rr, { stroke: P.lineHot, width: 1 });
    [[0, 'a₀', false], [90, 'a₁', false], [45, 'b₀', true], [-45, 'b₁', true]].forEach(([deg, lab, dash]) => {
      const t = deg * DEG, x = ox + rr * Math.sin(t), y = oy - rr * Math.cos(t);
      seg(ox - (x - ox), oy - (y - oy), x, y, P.violet, { width: 1.8, dash: dash ? [4, 3] : [] });
      T(ox + (rr + 9) * Math.sin(t), oy - (rr + 9) * Math.cos(t), lab, P.violet, { align: 'center', size: fs - 1, face: 'data' });
    });
    const sw = a.w - 4;
    rect(a.x, sy, sw, sh, { stroke: P.lineHot, width: 1 });
    let acc = 0;
    D.chshTerms.forEach((v) => { rect(a.x + sw * acc / 3, sy, sw * v / 3, sh, { fill: P.magenta, alpha: 0.75, stroke: P.void, width: 1 }); acc += v; });
    const x2 = a.x + sw * 2 / 3;
    seg(x2, sy - 6, x2, sy + sh + 6, P.ink, { width: 1.4, dash: [3, 2] });
    T(x2, sy + sh + 13, L('局域上界 2', 'local bound 2'), P.ink, { align: 'center', size: fs - 1.5 });
    T(a.x + sw * D.chsh / 3, sy - 9, `S = ${fix(D.chsh, 3)}`, P.magenta, { align: 'right', size: fs, face: 'data', weight: 600 });

    // spacetime: A and B spacelike; the boosted lines of simultaneity (amber) tilt with β
    const b = frame(...Bq, L('换参考系：先后颠倒', 'Change frame: the order flips'), nar);
    const half = Math.min(b.w / 2 - 6, (b.h - 20) / 2), ox2 = b.x + b.w / 2, oy2 = b.y + (b.h - 16) / 2 + 2, sc = half / 2.4;
    const X = (x) => ox2 + x * sc, Y = (t) => oy2 - t * sc;
    rect(X(-2.4), Y(2.4), 4.8 * sc, 4.8 * sc, { stroke: P.panelEdge, width: 1 });
    for (const xe of [-1, 1]) { seg(X(xe - 2.4), Y(-2.4), X(xe + 2.4), Y(2.4), P.dim, { width: 1, strokeAlpha: 0.55 }); seg(X(xe + 2.4), Y(-2.4), X(xe - 2.4), Y(2.4), P.dim, { width: 1, strokeAlpha: 0.55 }); }
    seg(X(-2.4), Y(0), X(2.4), Y(0), P.ink, { width: 1, dash: [4, 3], strokeAlpha: 0.6 });
    const bt = D.beta;
    seg(X(-2.4 * bt), Y(-2.4), X(2.4 * bt), Y(2.4), P.amber, { width: 1, dash: [3, 3], strokeAlpha: 0.55 });   // the boosted time axis x = βt
    for (const xe of [-1, 1]) {                      // boosted simultaneity t = β(x − x_e) through A and B, clipped to the box
      const pts = [-2.4, 2.4].map((x) => [x, bt * (x - xe)]).map(([x, t]) => (Math.abs(t) > 2.4 ? [xe + Math.sign(t) * 2.4 / bt, Math.sign(t) * 2.4] : [x, t]));
      seg(X(pts[0][0]), Y(pts[0][1]), X(pts[1][0]), Y(pts[1][1]), P.amber, { width: 1.8, sglow: 6 });
    }
    dot(X(-1), Y(0), 4.5, P.ink); dot(X(1), Y(0), 4.5, P.ink);
    T(X(-1), Y(0) + 12, 'A', P.ink, { align: 'center', size: fs, face: 'data', weight: 600 });
    T(X(1), Y(0) + 12, 'B', P.ink, { align: 'center', size: fs, face: 'data', weight: 600 });
    const order = Math.abs(D.dt) < 1e-9 ? L('同时', 'simultaneous') : D.dt < 0 ? L('B 先于 A', 'B before A') : L('A 先于 B', 'A before B');
    T(b.x + 2, b.y + 6, `β = ${sgn(D.beta, 2)} · ${order}`, P.amber, { size: fs, weight: 600, max: b.w - 4 });
    T(b.x + 2, b.y + b.h - 4, `Δt′ = ${sgn(D.dt, 2)} · Δx′ = ${fix(D.dx, 2)}` + (nar ? '' : ` · Δt′² − Δx′² = ${fix(D.interval, 2)}`), P.dim, { size: fs - 1.5, face: 'data', max: b.w - 4 });
    hits.push({ kind: 'beta', x0: X(-2.4), x1: X(2.4), y0: Y(2.4), y1: Y(-2.4) });

    // the 15 traceless directions of two qubits: 6 local (cyan, all 0) and 9 correlations (magenta, T = diag(1, −1, 1))
    const c = frame(...C, L('边缘只看见 6 维：局部 6 + 关联 9', 'Marginals see 6: local 6 + correlation 9'), nar);
    const cell = Math.max(10, Math.min((c.h - (nar ? 22 : 64)) / 3, (c.w - 40) / 6.2, 40)), gy = c.y + 6;
    const colA = c.x + (nar ? c.w * 0.18 : 6), colT = colA + cell + (nar ? 18 : 12), colB = colT + 3 * cell + (nar ? 18 : 12);
    const labelVal = (v) => (Math.abs(v) < 5e-4 ? '0' : sgn(v, 0));
    for (let i = 0; i < 3; i++) {
      rect(colA, gy + i * cell, cell - 3, cell - 3, { stroke: P.cyan, width: 1.4 });
      T(colA + (cell - 3) / 2, gy + i * cell + (cell - 3) / 2, labelVal(SECTORS.a[i]), P.cyan, { align: 'center', size: 9.5, face: 'data' });
      rect(colB, gy + i * cell, cell - 3, cell - 3, { stroke: P.cyan, width: 1.4 });
      T(colB + (cell - 3) / 2, gy + i * cell + (cell - 3) / 2, labelVal(SECTORS.b[i]), P.cyan, { align: 'center', size: 9.5, face: 'data' });
      for (let j = 0; j < 3; j++) {
        const v = SECTORS.T[i][j], x = colT + j * cell, y = gy + i * cell;
        rect(x, y, cell - 3, cell - 3, Math.abs(v) > 0.5 ? { fill: P.magenta, alpha: 0.72, stroke: P.magenta } : { stroke: P.magenta, width: 1, strokeAlpha: 0.5 });
        T(x + (cell - 3) / 2, y + (cell - 3) / 2, labelVal(v), P.ink, { align: 'center', size: 9.5, face: 'data' });
      }
    }
    T(colA + (cell - 3) / 2, gy + 3 * cell + 8, 'A', P.cyan, { align: 'center', size: fs - 1, face: 'data' });
    T(colT + 1.5 * cell - 1.5, gy + 3 * cell + 8, 'T', P.magenta, { align: 'center', size: fs - 1, face: 'data' });
    T(colB + (cell - 3) / 2, gy + 3 * cell + 8, 'B', P.cyan, { align: 'center', size: fs - 1, face: 'data' });
    const tx = nar ? colB + cell + 14 : c.x, ty = nar ? gy + 4 : gy + 3 * cell + 24;
    const tw = nar ? c.x + c.w - tx : c.w;
    if (tw > 60) TW(tx, ty, L(`局部格全是 0：两边的边缘都是 ${pct(D.margA, 0)} / ${pct(1 - D.margA, 0)}。关联全在 T 里。`, `Every local cell is 0: both marginals are ${pct(D.margA, 0)} / ${pct(1 - D.margA, 0)}. The correlation lives in T.`), P.dim, tw, { size: fs - 1, lines: 3 });
  }

  function focusHorizon(D, R, nar) {
    const [A, Bq, C] = split3(R, nar, 0.56), fs = nar ? 10 : 11;
    // entropy ledger in bits
    const a = frame(...A, nar ? L('熵账（比特）', 'Entropy (bits)') : L('熵账（比特）：整体不动，局部在涨', 'Entropy (bits): the whole still, the part growing'), nar);
    const base = a.y + a.h - (nar ? 22 : 30), top = a.y + 14, hb = base - top, bw = Math.max(10, Math.min(a.w * 0.15, 34));
    const cols = [[L('整体', 'whole'), 0, P.ink], ['S(ρ)', D.S, P.magenta], ['h₂(p)', D.Hp, P.cyan]];
    seg(a.x, top, a.x + a.w, top, P.faint, { width: 1, dash: [2, 3] }); T(a.x + a.w, top - 6, L('1 比特', '1 bit'), P.dim, { align: 'right', size: 9.5 });
    seg(a.x, base, a.x + a.w, base, P.lineHot, { width: 1 });
    cols.forEach(([lab, v, col], k) => {
      const x = a.x + a.w * (0.12 + k * 0.26) - bw / 2, hh = hb * v;
      if (k === 0) seg(x - 2, base - 1, x + bw + 2, base - 1, P.ink, { width: 3 });
      else rect(x, base - hh, bw, hh, { fill: col, alpha: 0.75, stroke: col });
      T(x + bw / 2, base - hh - 8, fix(v, 3), col, { align: 'center', size: fs - 1, face: 'data' });
      T(x + bw / 2, base + 9, lab, k === 0 ? P.ink : col, { align: 'center', size: fs - 1, face: 'data' });
    });
    {                                              // ΔS = h₂(p) − S(ρ): the bracket right of the pinched bar
      const xs = a.x + a.w * 0.38 + bw / 2, xb = a.x + a.w * 0.64 + bw / 2 + 6, y1 = base - hb * D.S, y2 = base - hb * D.Hp;
      seg(xs + 2, y1, xb, y1, P.magenta, { width: 1, dash: [2, 2] });
      seg(xb, y1, xb, y2, P.magenta, { width: 1.8 }); seg(xb - 3, y2, xb + 3, y2, P.magenta, { width: 1.4 }); seg(xb - 3, y1, xb + 3, y1, P.magenta, { width: 1.4 });
      T(xb + 5, (y1 + y2) / 2, `ΔS ${fix(D.dS, 3)}`, P.magenta, { size: fs - 1.5, face: 'data', max: a.x + a.w - xb - 6 });
    }
    if (!nar) T(a.x, base + 22, L('整体：纯态，H|Ψ⟩ = 0 是文献结果', 'whole: pure; H|Ψ⟩ = 0 is a literature result'), P.dim, { size: 9.5, max: a.w });

    // the 16-state horizon: columns = the base readout b₀b₁b₂, rows = the unseen bit b₃
    const e = D.esc, b = frame(...Bq, L('16 个态的视界', 'A horizon of 16 states'), nar);
    const cw = b.w / 8, ry = [b.y + (nar ? 22 : Math.max(26, b.h * 0.22)), b.y + (nar ? 44 : Math.max(52, b.h * 0.5))], rd = Math.max(3, Math.min(cw * 0.2, 6));
    const fiberOf = new Map(); e.fibers.forEach((f, i) => f.forEach((k) => fiberOf.set(k, i)));
    for (let col = 0; col < 8; col++) {
      const x = b.x + cw * (col + 0.5), k0 = col, k1 = col + 8, same = fiberOf.get(k0) === fiberOf.get(k1);
      T(x, ry[0] - (nar ? 13 : 18), `${col & 1}${(col >> 1) & 1}${(col >> 2) & 1}`, P.dim, { align: 'center', size: nar ? 8.5 : 9.5, face: 'data', max: cw });
      if (same) seg(x, ry[0], x, ry[1], P.magenta, { width: 2.4, sglow: 6 });
      [k0, k1].forEach((k, r) => dot(x, ry[r], rd, same ? P.magenta : P.cyan, { glow: 6 }));
    }
    const modeText = { none: L('只读 b₀b₁b₂', 'b₀b₁b₂ only'), parity: L('+ 奇偶 b₀⊕b₁⊕b₂⊕b₃', '+ parity b₀⊕b₁⊕b₂⊕b₃'), redundant: L('+ 冗余的 b₀⊕b₁', '+ redundant b₀⊕b₁') }[state.parity];
    T(b.x, ry[1] + (nar ? 14 : 22), modeText, P.ink, { size: fs - 0.5, weight: 600, max: b.w });
    const col = e.pairs ? P.magenta : P.cyan, rate = e.pairs ? `${e.pairs}/240` : '0';
    if (nar) {
      T(b.x, ry[1] + 27, L(`逃逸对 ${e.pairs} · 逃逸率 ${rate}`, `escape pairs ${e.pairs} · rate ${rate}`), col, { size: 9, face: 'data', max: b.w });
      T(b.x, ry[1] + 39, L(`H₂ = ${fix(e.H2, 0)} 比特`, `H₂ = ${fix(e.H2, 0)} bit`) + (state.parity !== 'none' ? L(` · 捕获 ${e.capture}`, ` · capture ${e.capture}`) : ''), col, { size: 9, face: 'data', max: b.w });
    } else {
      T(b.x, ry[1] + 38, L(`逃逸对 ${e.pairs} · 逃逸率 ${rate} · H₂ = ${fix(e.H2, 0)} 比特`, `escape pairs ${e.pairs} · rate ${rate} · H₂ = ${fix(e.H2, 0)} bit`), col, { size: fs - 1, face: 'data', max: b.w });
      if (state.parity !== 'none') T(b.x, ry[1] + 54, L(`唯一捕获 ${e.capture} 对${e.capture ? '：逃逸率下降' : '：逃逸率不降'}`, `unique capture ${e.capture}${e.capture ? ': the rate drops' : ': the rate does not drop'}`), P.ink, { size: fs - 1, max: b.w });
    }

    // a finite layer S always leaves a unit residual e ⊥ S
    const c = frame(...C, L('有限层：总留一条正交方向', 'A finite layer leaves an orthogonal direction'), nar);
    const pw = Math.min(c.w * (nar ? 0.42 : 0.7), 150), ph = Math.min(c.h * 0.24, 40), px = c.x + (nar ? 10 : (c.w - pw) / 2), py = c.y + c.h * (nar ? 0.58 : 0.58);
    const sk = pw * 0.28;
    shape(() => { ctx.moveTo(px + sk, py - ph / 2); ctx.lineTo(px + pw, py - ph / 2); ctx.lineTo(px + pw - sk, py + ph / 2); ctx.lineTo(px, py + ph / 2); ctx.closePath(); }, { fill: P.cyan, alpha: 0.16, stroke: P.cyan, width: 1.2 });
    T(px + 6, py + ph / 2 - 8, 'S', P.cyan, { size: fs, face: 'data', weight: 600 });
    const ox = px + pw / 2, oy = py, len = Math.min(c.h * 0.42, 70);
    dot(ox, oy, 3, P.ink);
    arrow(ox, oy, ox, oy - len, P.violet, { width: 2.4, head: 9, sglow: 10 });
    T(ox + 8, oy - len + 4, 'e ⊥ S', P.violet, { size: fs, face: 'data', weight: 600 });
    T(ox + 8, oy - len + 4 + fs + 4, '‖I − P_S‖ = 1', P.violet, { size: fs - 1, face: 'data' });
    if (py + ph / 2 + 14 < c.y + c.h - 30) T(ox, py + ph / 2 + 10, 'P_S e = 0', P.dim, { align: 'center', size: fs - 1.5, face: 'data' });
    // the genuine open problem, in red
    const ot = L('OPEN · 时间 = 新的维度？', 'OPEN · time = a new dimension?');
    ctx.font = font(fs - 1, 'body', 600);
    const tw = Math.min(ctx.measureText(ot).width + 12, c.w), tx = nar ? c.x + c.w - tw : c.x + (c.w - tw) / 2, tyy = c.y + c.h - 16;
    if (!TRV.thumbMode) rect(tx, tyy - 8, tw, 16, { stroke: P.warn, width: 1, strokeAlpha: 0.9 });
    T(tx + 6, tyy, ot, P.warn, { size: fs - 1, weight: 600, max: tw - 10 });
  }

  function focusDuel(D, R, nar) {
    const fs = nar ? 10 : 11;
    const head = L(`五副透镜共同的数：条件 ${pct(D.p, 0)} / ${pct(D.q, 0)} · 无条件 50% / 50% · CHSH ${fix(D.chsh, 2)} · γ = ${fix(D.gamma, 3)}`,
      `What all five read: conditional ${pct(D.p, 0)} / ${pct(D.q, 0)} · unconditional 50% / 50% · CHSH ${fix(D.chsh, 2)} · γ = ${fix(D.gamma, 3)}`);
    const headH = TRV.thumbMode ? 0 : (nar ? 28 : 18);
    if (nar) TW(R.x + 2, R.y, head, P.ink, R.w - 4, { size: 9.5, lines: 2, lh: 13 }); else T(R.x + 2, R.y + 7, head, P.ink, { size: 10.5, max: R.w - 4 });
    const y0 = R.y + headH + 4, n = LENS_ORDER.length, g = 6;
    LENS_ORDER.forEach((id, k) => {
      const lens = LENSES[id], on = id === state.lens;
      let x, y, w, h;
      if (!nar) { w = (R.w - (n - 1) * g) / n; h = R.h - headH - 4; x = R.x + k * (w + g); y = y0; }
      else { w = R.w; h = (R.h - headH - 4 - (n - 1) * 4) / n; x = R.x; y = y0 + k * (h + 4); }
      box(x, y, w, h, on ? { stroke: P.amber, width: 1.8, fill: P.amber, alpha: 0.05, cut: 6, sglow: 8 } : { stroke: P.panelEdge, fill: P.cyan, alpha: 0.02, cut: 6 });
      hits.push({ kind: 'lens', id, x0: x, x1: x + w, y0: y, y1: y + h });
      const nm = L(...(lens.short || lens.name));
      if (!nar) {
        const tall = h > 200, ts = tall ? 11 : 9.5, open = id === 'ortho-open-dim' && !TRV.thumbMode, tagW = open ? 38 : 0;
        T(x + 8, y + 12, nm, on ? P.amber : P.ink, { size: fs, weight: 700, max: w - 18 - tagW });
        if (open) { const tx = x + w - tagW - 6; rect(tx, y + 5, tagW, 14, { stroke: P.warn, width: 1 }); T(tx + tagW / 2, y + 12, 'OPEN', P.warn, { align: 'center', size: 9, face: 'data', weight: 600 }); }
        const gh = clamp(h * (tall ? 0.26 : 0.17), 14, 70), gw = clamp(gh * 0.62, 10, 30), gx = x + w / 2 - gw - 3, gy = y + 26;
        records(id, D, { x: gx, y: gy, w: gw, h: gh }, { x: gx + gw + 6, y: gy, w: gw, h: gh },
          { from: [x + 10, gy + gh / 2], size: tall ? 11 : 9.5, gauge: { x: gx - 4, y: gy + gh + 5, w: 2 * gw + 14, h: tall ? 6 : 4 }, gaugeLabel: false, escape: Math.min(gh * 0.8, 40), escapeLabel: false });
        // the Copenhagen cut is amber only while Copenhagen is the selected lens; otherwise a neutral reference dash
        if (id === 'copenhagen') seg(gx - 9, gy - 4, gx - 9, gy + gh + 4, on ? P.amber : P.dim, { width: 1.4, dash: [4, 3] });
        let ty = gy + gh + (tall ? 22 : 12);
        const room = y + h - 6 - ty;
        ty += TWlead(x + 8, ty, L('守住', 'Keeps'), P.cyan, L(...lens.keeps(D)), P.ink, w - 14, room * 0.42, { size: ts }) + (tall ? 10 : 5);
        TWlead(x + 8, ty, L('多付', 'Adds'), P.violet, L(...lens.adds(D)), P.dim, w - 14, y + h - 4 - ty, { size: ts });
      } else {
        const openRow = id === 'ortho-open-dim' && !TRV.thumbMode;
        T(x + 8, openRow ? y + h * 0.36 : y + h / 2, nm, on ? P.amber : P.ink, { size: 10, weight: 700, max: w * 0.25 });
        if (openRow) { rect(x + 8, y + h * 0.58, 32, 12, { stroke: P.warn, width: 1 }); T(x + 24, y + h * 0.58 + 6, 'OPEN', P.warn, { align: 'center', size: 8, face: 'data', weight: 600 }); }
        const gw = Math.min(16, h * 0.4), gh = h - 12, gx = x + w * 0.29, gy = y + 6;
        records(id, D, { x: gx, y: gy, w: gw, h: gh }, { x: gx + gw + 4, y: gy, w: gw, h: gh },
          { from: [gx - 10, gy + gh / 2], size: 8.5, gauge: { x: gx - 2, y: gy + gh + 1, w: 2 * gw + 8, h: 3 }, gaugeLabel: false, escape: Math.min(16, h * 0.5), escapeLabel: false });
        const tx = gx + 2 * gw + 18, tw = x + w - tx - 6;
        T(tx, y + h * 0.32, `${L('守住', 'Keeps')}: ${L(...lens.keeps(D))}`, P.ink, { size: 9.5, max: tw });
        T(tx, y + h * 0.7, `${L('多付', 'Adds')}: ${L(...lens.adds(D))}`, P.dim, { size: 9.5, max: tw });
      }
    });
  }
  const FOCUS_DRAW = { cut: focusCut, andor: focusAndOr, born: focusBorn, bell: focusBell, horizon: focusHorizon, duel: focusDuel };

  /* ---------- the stage ---------- */
  function placeLensBar() {
    const below = stageEl.clientWidth < 700;
    lensBar.classList.toggle('below', below); stageEl.classList.toggle('lens-below', below);
    if (below) lensBar.style.setProperty('--lens-top', `${hudTl.offsetTop + hudTl.offsetHeight + 6}px`);
  }
  function reserves() {
    if (TRV.thumbMode) return { top: 14, bottom: 14 };
    let top = hudTl.offsetTop + hudTl.offsetHeight + 8;
    if (!TRV.shot && lensBar.offsetHeight) top = Math.max(top, lensBar.offsetTop + lensBar.offsetHeight + 8);
    const bottom = legendEl.offsetHeight ? stageEl.clientHeight - legendEl.offsetTop + 6 : 14;
    return { top, bottom };
  }
  function drawStage(D) {
    const dpr = TRV.fitCanvas(cv);
    W = cv.clientWidth; H = cv.clientHeight; ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    hits.length = 0;
    const res = reserves(), padX = W < 560 ? 12 : 18, avail = H - res.top - res.bottom, nar = W < 560;
    const appH = TRV.thumbMode ? avail * 0.42 : clamp(avail * (nar ? 0.37 : 0.39), 92, 210), gap = nar ? 10 : 14;
    const app = { x: padX, y: res.top, w: W - 2 * padX, h: appH };
    const foc = { x: padX, y: res.top + appH + gap, w: W - 2 * padX, h: avail - appH - gap };
    drawApparatus(D, app);
    seg(padX, foc.y - gap / 2, W - padX, foc.y - gap / 2, P.panelEdge, { width: 1 });
    if (foc.h > 40) FOCUS_DRAW[state.focus](D, foc, nar);
  }

  /* ---------- strip: what changes along the rail, and decoherence against collapse ---------- */
  function drawStrip(D) {
    const rail = FOCUS_RAIL[state.focus], pad = [34, 12, 10, 20];
    let g, title, meta;
    if (rail === 'u') {
      title = L('环境变大：相干走了，权重不动', 'Coherence leaves, weights stay');
      g = kit.plot($('plot'), { x: [0, 6], y: [0, 1.08], pad });
      g.axes({ xTicks: [0, 1, 2, 3, 4, 5, 6].map((k) => [k, k ? `10${sup(k)}` : '1']), yTicks: [0, 0.5, 1] });
      const samp = (f) => { const pts = []; for (let i = 0; i <= 180; i++) { const u = 6 * i / 180; pts.push([u, f(model(Object.assign({}, state, { u })))]); } return pts; };
      g.line(samp((m) => m.p), P.cyan, { width: 1.4, dash: [5, 3] });
      g.line(samp((m) => m.r2), P.cyan, { width: 2 });
      g.line(samp((m) => m.tangle), P.magenta, { width: 2 });
      g.vline(D.u, P.amber, { alpha: 0.85 }); g.dot(D.u, D.r2, P.amber, 3.4); g.dot(D.u, D.tangle, P.amber, 3.4);
      g.legend([[P.cyan, L('权重 p', 'weight p'), 'dash'], [P.cyan, L('留下的长度 r²', 'length left r²')], [P.magenta, L('搬进环境的 τ', 'τ moved into E')]], { right: false, dy: g.ih * 0.3 });
      meta = `N = ${fmtN(D.N)} · r² + τ = ${fix(D.r2 + D.tangle, 3)}`;
    } else if (rail === 'theta') {
      title = L('条件权重在变，边缘停在一半', 'Weights move, the marginal stays');
      g = kit.plot($('plot'), { x: [0, 90], y: [0, 1.08], pad });
      g.axes({ xTicks: [0, 30, 45, 60, 90].map((v) => [v, `${v}°`]), yTicks: [0, 0.25, 0.5, 0.75, 1] });
      const pts = (f) => { const a = []; for (let d = 0; d <= 90; d += 1) a.push([d, f(d * DEG)]); return a; };
      g.vline(30, P.ink, { alpha: 0.5, dash: [2, 3] });
      g.line(pts((t) => Math.cos(t) ** 2), P.cyan, { width: 2 });
      g.line(pts((t) => Math.sin(t) ** 2), P.cyan, { width: 1.4, dash: [5, 3] });
      g.line(pts(() => 0.5), P.sigma, { width: 1.4, dash: [2, 3] });
      g.vline(D.theta, P.amber, { alpha: 0.85 }); g.dot(D.theta, D.p, P.amber, 3.4); g.dot(D.theta, D.q, P.amber, 3.4);
      g.legend([[P.cyan, 'cos²θ'], [P.cyan, 'sin²θ', 'dash'], [P.sigma, L('无条件', 'unconditional'), 'dash']], { right: false, dy: g.ih * 0.12 });
      meta = `${pct(D.p)} / ${pct(D.q)} · 50% / 50%`;
    } else {
      title = L('先后随参考系翻转，读数不动', 'The order flips, readouts do not');
      g = kit.plot($('plot'), { x: [-0.8, 0.8], y: [-3.6, 3.6], pad });
      g.axes({ xTicks: [-0.8, -0.4, 0, 0.4, 0.8].map((v) => [v, sgn(v, 1)]), yTicks: [[-3, '−3'], [0, '0'], [3, '3']] });
      const pts = (f) => { const a = []; for (let i = 0; i <= 160; i++) { const b = -0.8 + 1.6 * i / 160; a.push([b, f(b, 1 / Math.sqrt(1 - b * b))]); } return a; };
      g.hline(0, P.faint);
      g.line(pts((b, G) => -2 * G * b), P.violet, { width: 2 });
      g.line(pts((b, G) => 2 * G), P.violet, { width: 1.4, dash: [5, 3] });
      g.vline(D.beta, P.amber, { alpha: 0.85 }); g.dot(D.beta, D.dt, P.amber, 3.4);
      g.legend([[P.violet, 'Δt′'], [P.violet, 'Δx′', 'dash']], { right: false, bottom: true });
      meta = L(`p = ${fix(D.p, 3)}、S = ${fix(D.chsh, 3)} 在每个 β 都一样`, `p = ${fix(D.p, 3)}, S = ${fix(D.chsh, 3)} at every β`);
    }
    $('plotTitle').textContent = title; $('plotMeta').textContent = meta;

    const g2 = kit.plot($('plot2'), { x: [0, 6], y: [1e-17, 3], logY: true, pad: [40, 12, 10, 20] });
    g2.axes({ xTicks: [0, 2, 4, 6].map((k) => [k, k ? `10${sup(k)}` : '1']), yTicks: [[1e-16, `10${sup(-16)}`], [1e-12, `10${sup(-12)}`], [1e-8, `10${sup(-8)}`], [1e-4, `10${sup(-4)}`], [1, '1']] });
    const s2 = (f) => { const a = []; for (let i = 0; i <= 150; i++) { const u = 6 * i / 150, N = Nof(u); a.push([u, f(N)]); } return a; };
    g2.line(s2((N) => -Math.expm1(-N / NSCALE)), P.magenta, { width: 2 });
    g2.line(s2((N) => -Math.expm1(-N * GRW_LAMBDA * GRW_T)), P.violet, { width: 2 });
    g2.vline(D.u, P.amber, { alpha: 0.85 }); g2.dot(D.u, D.oneMinusGamma, P.amber, 3.4); g2.dot(D.u, D.grw, P.amber, 3.4);
    g2.legend([[P.magenta, '1 − γ'], [P.violet, L('GRW 的 q', 'GRW q')]], { right: false, dy: g2.ih * 0.36 });
    $('plot2Meta').textContent = `1 − γ = ${sci(D.oneMinusGamma, 1)} · q = ${sci(D.grw, 1)}`;
  }

  /* ---------- text: HUD, legend, pills, readouts, lens panel ---------- */
  const FOCUS_TITLE = {
    cut: () => L(`维格纳的切割 · N = ${fmtN(model(state).N)}`, `Wigner's cut · N = ${fmtN(model(state).N)}`),
    andor: () => L(`从“与”到“或” · N = ${fmtN(model(state).N)}`, `From AND to OR · N = ${fmtN(model(state).N)}`),
    born: () => L(`不等的权重 · θ = ${fix(state.theta, 1)}°`, `Unequal weights · θ = ${fix(state.theta, 1)}°`),
    bell: () => L(`贝尔与 EPR · β = ${sgn(state.beta, 2)}`, `Bell and EPR · β = ${sgn(state.beta, 2)}`),
    horizon: () => L(`时间与视界 · N = ${fmtN(model(state).N)}`, `Time and horizon · N = ${fmtN(model(state).N)}`),
    duel: () => L('五方对决 · 同一组数', 'Five-way duel · one set of numbers')
  };
  function hudSub(D) {
    switch (state.focus) {
      case 'cut': return L(`维格纳只碰 SF：可见度 ${fix(D.vis, 3)}；碰到 SF + E：${fix(D.visFull, 3)}`, `Wigner with SF only: visibility ${fix(D.vis, 3)}; with SF + E: ${fix(D.visFull, 3)}`);
      case 'andor': return L(`纯度 ${fix(D.purity, 3)} · r² + τ = ${fix(D.r2, 2)} + ${fix(D.tangle, 2)} = 1`, `purity ${fix(D.purity, 3)} · r² + τ = ${fix(D.r2, 2)} + ${fix(D.tangle, 2)} = 1`);
      case 'born': return L(`条件 ${pct(D.p)} / ${pct(D.q)} · 无条件 50% / 50%`, `conditional ${pct(D.p)} / ${pct(D.q)} · unconditional 50% / 50%`);
      case 'bell': return L(`S = ${fix(D.chsh, 3)} > 2 · Δt′ = ${sgn(D.dt, 2)} · 边缘 50% / 50%`, `S = ${fix(D.chsh, 3)} > 2 · Δt′ = ${sgn(D.dt, 2)} · marginals 50% / 50%`);
      case 'horizon': return L(`S(ρ) = ${fix(D.S, 3)} 比特 · 逃逸对 ${D.esc.pairs}`, `S(ρ) = ${fix(D.S, 3)} bit · escape pairs ${D.esc.pairs}`);
      default: return L(`当前透镜：${lensName(state.lens)}`, `Current lens: ${lensName(state.lens)}`);
    }
  }
  const SW = (cls, zh, en) => `<span><i class="sw ${cls}"></i>${L(zh, en)}</span>`;
  const LEGEND = {
    cut: () => [SW('cy', '权重（对角）', 'weights (diagonal)'), SW('mg', '相干（非对角）', 'coherence (off-diagonal)'), SW('am', '当前：θ 箭头、透镜、切割', 'now: θ arrow, lens, cut')],
    andor: () => [SW('cy', '权重与 r²', 'weights and r²'), SW('mg', '相干与搬进环境的 τ', 'coherence, τ moved into E'), SW('am', '当前：θ、透镜、抽到的 ξ', 'now: θ, lens, drawn ξ')],
    born: () => [SW('cy', '权重与影子', 'weights and shadows'), SW('mg', 'X 读数（相位）', 'X readout (phase)'), SW('am', '当前的 |u⟩', 'the current |u⟩'), SW('vi', 'R|u⟩ 与 R²|u⟩', 'R|u⟩ and R²|u⟩')],
    bell: () => [SW('cy', '局部（边缘）', 'local (marginals)'), SW('mg', '关联', 'correlation'), SW('am', '推动后的同时线', 'boosted simultaneity'), SW('vi', '测量轴', 'measurement axes')],
    horizon: () => [SW('cy', '分开的 / 捏合熵', 'separated / pinched entropy'), SW('mg', '逃逸对 / 约化熵', 'escape pairs / reduced entropy'), SW('vi', '余量方向', 'residual direction'), SW('wn', '开放问题', 'open problem')],
    duel: () => [SW('cy', '两行记录的权重', 'weights of the two records'), SW('am', '当前透镜与抽到的一行', 'current lens, drawn row'), SW('vi', 'q 与余量方向', 'q and residual direction'), SW('wn', '开放问题', 'open problem')]
  };
  let lastLegend = '';

  function readouts(D) {
    const r = (l, v, cls) => [l, v, cls || ''];
    switch (state.focus) {
      case 'cut': return { aside: `N = ${fmtN(D.N)}`, keyL: L('维格纳的可见度：只碰 SF · 碰到 SF + E', "Wigner's visibility: SF only · SF + E"), key: `${fix(D.vis, 3)} · ${fix(D.visFull, 3)}`, keyCls: 'c-mg',
        keySub: L('环境越大，只碰 SF 的那一栏越低；另一栏不动', 'the larger the environment, the lower the SF-only figure; the other stays'),
        rows: [r('γ = exp(−N/10⁴)', fix(D.gamma, 4), 'c'), r(L('纯度 Tr ρ²', 'purity Tr ρ²'), fix(D.purity, 4)), r(L('删去的质量 C', 'deleted mass C'), fix(D.deleted, 4), 'm'),
          r(L('捏两次 − 捏一次', 'pinch twice − once'), '0', 'c'), r(L('条件权重 p', 'conditional p'), fix(D.p, 4), 'c'), r(L('朋友的边缘', "friend's marginal"), '50% / 50%')],
        note: L('朋友的捏合把非对角删成 0，再捏一次不再变；维格纳在外面只碰 SF 时看到 γ 倍的相干。切割的位置与访问范围是约定（MODEL）。', "The friend's pinching deletes the off-diagonal to 0 and pinching again changes nothing; Wigner outside with SF alone sees γ times the coherence. Where the cut sits and what Wigner can reach are stipulations (MODEL).") };
      case 'andor': return { aside: `N = ${fmtN(D.N)}`, keyL: 'r² + τ = 1', key: `${fix(D.r2, 3)} + ${fix(D.tangle, 3)} = ${fix(D.r2 + D.tangle, 3)}`,
        keySub: L('留在实验室的长度 + 搬进环境的关联', 'length left in the lab + correlation moved into E'),
        rows: [r(L('纯度 Tr ρ²', 'purity Tr ρ²'), fix(D.purity, 4)), r(L('相干质量 C', 'coherence mass C'), fix(D.deleted, 4), 'm'), r(L('可见度 V', 'visibility V'), fix(D.vis, 4), 'm'),
          r('γ', fix(D.gamma, 4), 'c'), r(L('种子 ξ → 记录', 'seeded ξ → record'), `${fix(D.xi, 3)} → ${D.sel}`, 'a'), r(L('GRW 的 q', 'GRW q'), sci(D.grw, 1))],
        note: L('γ → 0 时 (r², τ, C, V) → (1/4, 3/4, 0, 0)，纯度 → 5/8：两行都还在，这是“与”。抽出一行是另一步（MODEL）。', 'As γ → 0, (r², τ, C, V) → (1/4, 3/4, 0, 0) and purity → 5/8: both rows are still there, which is AND. Drawing one row is a separate step (MODEL).') };
      case 'born': return { aside: `θ = ${fix(D.theta, 1)}°`, keyL: L('条件（B = 0）· 无条件', 'conditional (B = 0) · unconditional'), key: `${pct(D.p)} / ${pct(D.q)} · ${pct(D.margA, 0)} / ${pct(1 - D.margA, 0)}`, keyCls: 'c-cy',
        keySub: L(`P(x = +1 | y = +1) = ${fix(D.condPlus, 4)} = cos²θ`, `P(x = +1 | y = +1) = ${fix(D.condPlus, 4)} = cos²θ`),
        rows: [r('cos²θ + sin²θ', fix(D.p + D.q, 4), 'c'), r('(AB)(BA)', `${fix(D.ABBA[0], 4)} ${D.ABBA[1] >= 0 ? '+' : '−'} ${fix(Math.abs(D.ABBA[1]), 4)}i`), r(L('|+⟩、|−⟩ 的 Z 读数', '|+⟩, |−⟩ on Z'), `${fix(D.plusZ, 2)} · ${fix(D.minusZ, 2)}`, 'c'),
          r(L('|+⟩、|−⟩ 的 X 读数', '|+⟩, |−⟩ on X'), `${sgn(D.plusX, 0)} · ${sgn(D.minusX, 0)}`, 'm'), r('(ΔZ)²(ΔX)² = C² + K² + G', `${fix(D.rob.prod, 4)} = ${fix(D.rob.C2, 4)} + 0 + ${fix(Math.abs(D.rob.G) < 1e-12 ? 0 : D.rob.G, 4)}`),
          r('R²', `[[${fix(D.R2[0][0], 0)}, ${fix(D.R2[0][1], 0)}], [${fix(D.R2[1][0], 0)}, ${fix(D.R2[1][1], 0)}]] = −I`, 'v')],
        note: L('多世界数分支得 1 : 1，权重却是 cos²θ : sin²θ；为什么按权重下注是文献论证（ARGUED）。不加条件的边缘没有哪个旋钮能动。', 'Many-worlds counts 1 : 1 branches while the weights are cos²θ : sin²θ; why one should bet by weight is argued in the literature (ARGUED). No dial moves the unconditional marginal.') };
      case 'bell': return { aside: `β = ${sgn(D.beta, 2)}`, keyL: 'CHSH S', key: `${fix(D.chsh, 4)} > 2`, keyCls: 'c-mg',
        keySub: L('四组设置：a₀ = 0、a₁ = π/2、b₀ = π/4、b₁ = −π/4', 'settings a₀ = 0, a₁ = π/2, b₀ = π/4, b₁ = −π/4'),
        rows: [r(L('A、B 的边缘', 'marginals of A, B'), `${pct(D.margA, 0)} · ${pct(D.margB, 0)}`, 'c'), r("Γ = 1/√(1 − β²)", fix(D.G, 4)), r('Δt′ = −2Γβ', sgn(D.dt, 4), 'a'), r("Δx′ = 2Γ", fix(D.dx, 4)),
          r("Δt′² − Δx′²", fix(D.interval, 4)), r(L('先后', 'order'), Math.abs(D.dt) < 1e-9 ? L('同时', 'simultaneous') : D.dt < 0 ? L('B 先于 A', 'B before A') : L('A 先于 B', 'A before B'), 'a')],
        note: L('这是一轮独立的、记录之前的贝尔测试。推动只改事件坐标：玻恩权重、γ、CHSH 与边缘都不变，类空间隔始终是 −4。', 'This is a separate Bell test run before any recording. A boost changes event coordinates only: Born weights, γ, CHSH and the marginals stay, and the spacelike interval is always −4.') };
      case 'horizon': return { aside: `N = ${fmtN(D.N)}`, keyL: L('约化熵 · 捏合熵（比特）', 'reduced · pinched entropy (bits)'), key: `${fix(D.S, 3)} · ${fix(D.Hp, 3)}`,
        keySub: L(`捏合还会删掉 ΔS = ${fix(D.dS, 4)} 比特；整体的熵是 0`, `pinching would still delete ΔS = ${fix(D.dS, 4)} bit; the whole has entropy 0`),
        rows: [r(L('整体 |Ψ⟩ 的熵', 'entropy of the whole |Ψ⟩'), '0'), r(L('逃逸对（有序）', 'escape pairs (ordered)'), String(D.esc.pairs), D.esc.pairs ? 'm' : 'c'), r(L('逃逸率', 'escape rate'), D.esc.pairs ? `${D.esc.pairs}/240 = ${fix(D.esc.rate, 4)}` : '0', D.esc.pairs ? 'm' : 'c'),
          r('H₂ escape', `${fix(D.esc.H2, 3)} ${L('比特', 'bit')}`), r(L('唯一捕获', 'unique capture'), state.parity === 'none' ? '—' : String(D.esc.capture)), r('‖I − P_S‖', '1', 'v')],
        note: L('16 态的逃逸账本是模型读数，不是贝肯斯坦—霍金熵。“时间 = 正交维的增长”是开放问题。', 'The 16-state escape ledger is a model readout, not Bekenstein–Hawking entropy. "Time = growth of orthogonal dimension" is an open problem.') };
      default: {
        const lz = LENSES[state.lens];
        return { aside: lensName(state.lens), keyL: L('五副透镜共同的数', 'Numbers all five lenses share'), key: `${pct(D.p, 0)}/${pct(D.q, 0)} · 50/50 · ${fix(D.chsh, 2)}`, keyCls: 'c-cy',
          keySub: L('换透镜，这一行不动', 'switch lens: this line does not move'),
          rows: [r('γ', fix(D.gamma, 4), 'c'), r(L('可见度 V', 'visibility V'), fix(D.vis, 4), 'm'), r(L('纯度 Tr ρ²', 'purity Tr ρ²'), fix(D.purity, 4)), r(L('GRW 的 q', 'GRW q'), sci(D.grw, 1)),
            r(L('守住', 'keeps'), L(...lz.keeps(D)), 'wide'), r(L('多付', 'adds'), L(...lz.adds(D)), 'wide')],
          note: L('没有哪个绿框给某种诠释排名次；五栏的差别只在附加的承诺。', 'No green box ranks an interpretation; the five columns differ only in their extra commitments.') };
      }
    }
  }

  // only the evidence of the current card is shown next to the readouts
  const hot30 = document.querySelector('.field .marks i.hot30');
  const showEvidence = () => document.querySelectorAll('#evidence [data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(state.focus); });
  function drawText(D) {
    showEvidence(); placeLensBar();
    $('hudBig').textContent = FOCUS_TITLE[state.focus]();
    $('hudSub').textContent = hudSub(D);
    const lg = LEGEND[state.focus]().join('');
    if (lg !== lastLegend) { legendEl.innerHTML = lg; lastLegend = lg; }
    $('pillLens').querySelector('strong').textContent = lensName(state.lens);
    $('pillAngle').querySelector('strong').textContent = `${fix(D.theta, 1)}°`;
    if (hot30) hot30.classList.toggle('is-active', Math.abs(state.theta - 30) < 0.5);   // amber only for the live θ = 30°
    $('pillN').querySelector('strong').textContent = fmtN(D.N);
    const r = readouts(D);
    $('roAside').textContent = r.aside; $('roKeyL').innerHTML = r.keyL; $('roKey').textContent = r.key; $('roKey').className = r.keyCls || ''; $('roKeySub').textContent = r.keySub;
    r.rows.forEach(([l, v, cls], i) => { $('roL' + (i + 1)).innerHTML = l; $('ro' + (i + 1)).textContent = v; $('roW' + (i + 1)).className = cls === 'v' ? 'vi' : cls; });
    $('roNote').textContent = r.note;
    const lz = LENSES[state.lens];
    $('lensAside').textContent = lensName(state.lens);
    $('lensKeeps').innerHTML = `<b>${L('守住：', 'Keeps: ')}</b>${TRV.esc(L(...lz.keeps(D)))}`;
    $('lensAdds').innerHTML = `<b>${L('多付：', 'Adds: ')}</b>${TRV.esc(L(...lz.adds(D)))}${L('。', '. ')}${TRV.esc(L(...lz.long(D)))}`;
    $('xiNote').textContent = L(`ξ = ${fix(D.xi, 3)} ${D.xi < D.p ? '<' : '≥'} p = ${fix(D.p, 3)} → 记录 ${D.sel}`, `ξ = ${fix(D.xi, 3)} ${D.xi < D.p ? '<' : '≥'} p = ${fix(D.p, 3)} → record ${D.sel}`);
    const e = D.esc;
    $('parityNote').textContent = state.parity === 'none'
      ? L(`8 根纤维、每根 2 个态：${e.pairs} 个有序逃逸对，逃逸率 ${e.pairs}/240 = 1/15，H₂ = ${fix(e.H2, 0)} 比特。`, `8 fibers of 2 states: ${e.pairs} ordered escape pairs, rate ${e.pairs}/240 = 1/15, H₂ = ${fix(e.H2, 0)} bit.`)
      : state.parity === 'parity'
        ? L(`奇偶把每根纤维分开：唯一捕获 ${e.capture} 对，逃逸对 ${e.pairs}，H₂ = ${fix(e.H2, 0)}。`, `Parity splits every fiber: unique capture ${e.capture}, escape pairs ${e.pairs}, H₂ = ${fix(e.H2, 0)}.`)
        : L(`b₀⊕b₁ 已由 b₀、b₁ 决定：唯一捕获 ${e.capture} 对，逃逸率不降。`, `b₀⊕b₁ is fixed by b₀ and b₁: unique capture ${e.capture}, the rate does not drop.`);
  }

  // text first: the HUD and the legend set the room the canvas has
  const paint = kit.painter(() => { const D = model(state); drawText(D); drawStage(D); drawStrip(D); }, [stageEl, $('plot'), $('plot2')]);

  /* ---------- the rail: the one dial the current card sweeps ---------- */
  let stopAt = null;
  const railOf = () => RAILS[FOCUS_RAIL[state.focus]];
  const fmtClock = (t) => {
    const k = FOCUS_RAIL[state.focus];
    if (k === 'u') return `lg N ${fix(t, 2)} <small>· N = ${fmtN(Nof(t))}</small>`;
    if (k === 'theta') return `θ ${fix(t, 1)}° <small>/ 90°</small>`;
    return `β ${sgn(t - 0.8, 2)} <small>/ ±0.80</small>`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: RAILS.u.max, rate: RAILS.u.rate, step: RAILS.u.step, t: 0,
    format: (t) => fmtClock(t),
    onChange(t) {
      if (stopAt != null && clock.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; clock.pause(); clock.set(s, true); t = s; }
      railOf().set(t); syncInputs(); paint();
    }
  });
  function configureRail() {
    const r = railOf();
    clock.pause(); clock.rate = r.rate; clock.step = r.step; clock.setMax(r.max, true); clock.set(r.get(), true);
  }

  /* ---------- controls ---------- */
  const leave = () => { stopAt = null; cards.mark(null); };
  const fTheta = kit.field($('theta'), { fmt: (v) => `${fix(v, 1)}°`, onInput: (v) => { leave(); setDial('theta', v); } });
  const fU = kit.field($('uScale'), { fmt: (v) => `N = ${fmtN(Nof(v))}`, onInput: (v) => { leave(); setDial('u', v); } });
  const fBeta = kit.field($('beta'), { fmt: (v) => sgn(v, 2), onInput: (v) => { leave(); setDial('beta', v); } });
  function syncInputs() { fTheta.set(Math.round(state.theta * 2) / 2); fU.set(Math.round(state.u * 100) / 100); fBeta.set(Math.round(state.beta * 100) / 100); }
  /** Move one dial; when the rail drives that dial, move the clock with it. */
  function setDial(name, v) {
    clock.pause();
    if (name === 'theta') state.theta = clamp(v, 0, 90);
    else if (name === 'u') state.u = clamp(v, 0, 6);
    else state.beta = clamp(v, -0.8, 0.8);
    if (FOCUS_RAIL[state.focus] === name) clock.set(railOf().get(), true);
    syncInputs(); paint();
  }
  const lensChips = kit.chips(lensBar, 'lens', (v) => { state.lens = v; paint(); });
  const parityChips = kit.chips($('parityChips'), 'parity', (v) => { state.parity = v; paint(); });
  $('xiBtn').addEventListener('click', () => { state.xiDraw += 1; paint(); });
  $('now').addEventListener('pointerdown', () => leave());
  $('rew').addEventListener('click', () => { leave(); clock.pause(); clock.set(0); });

  /* direct manipulation: drag the amber arrow (θ), drag across the spacetime diagram (β), click a duel column (lens) */
  let drag = null;
  const local = (ev) => { const b = cv.getBoundingClientRect(); return [ev.clientX - b.left, ev.clientY - b.top]; };
  function hitAt(x, y) {
    for (let i = hits.length - 1; i >= 0; i--) {
      const h = hits[i];
      if (h.kind === 'theta' && Math.hypot(x - h.x, y - h.y) <= h.r) return h;
      if (h.x0 != null && x >= h.x0 && x <= h.x1 && y >= h.y0 && y <= h.y1) return h;
    }
    return null;
  }
  function dragTo(h, x, y) {
    if (h.kind === 'theta') { const a = Math.atan2(h.y - y, x - h.x) / DEG; setDial('theta', clamp(a < -90 ? 180 : a, 0, 90)); }
    else if (h.kind === 'beta') setDial('beta', ((x - h.x0) / (h.x1 - h.x0)) * 1.6 - 0.8);
  }
  cv.addEventListener('pointerdown', (ev) => {
    const [x, y] = local(ev), h = hitAt(x, y);
    if (!h) return;
    if (h.kind === 'lens') { lensChips.set(h.id); return; }
    drag = h; leave(); clock.pause();
    try { cv.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ }
    cv.classList.add('grabbing'); dragTo(h, x, y);
  });
  cv.addEventListener('pointermove', (ev) => {
    const [x, y] = local(ev);
    if (drag) { dragTo(drag, x, y); return; }
    const h = hitAt(x, y); cv.classList.toggle('grab', !!h);
  });
  for (const type of ['pointerup', 'pointercancel']) cv.addEventListener(type, () => { drag = null; cv.classList.remove('grabbing'); });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'wigner-cut': ['N = 1：琥珀色的切割线把 S 与朋友的记录 F 分开。下排左：朋友的捏合 P(ρ) 只剩青色对角 0.75、0.25；中：维格纳只碰 SF，品红的非对角 −0.433 还在；右：两根品红条都是 0.866，加大 N 时只有“只碰 SF”那根缩短。',
      'N = 1: the amber cut separates S from the friend\'s record F. Below, left: the friend\'s pinched P(ρ) keeps only the cyan diagonal 0.75, 0.25; middle: Wigner with SF alone still sees the magenta −0.433; right: both magenta bars read 0.866, and raising N shrinks only "SF only".'],
    'and-to-or': ['N 涨到 10⁶：环境格被品红填满，γ → 0。左：ρ 的品红非对角消失，青色对角 0.75、0.25 都在，这是“与”；中：青色 r² 缩到 0.25，品红 τ 长到 0.75，合起来始终是 1；右：琥珀色的 ξ = 0.814 ≥ p，抽出记录 1，这一步是模型的抽样。',
      'N grows to 10⁶: the environment fills with magenta and γ → 0. Left: the magenta off-diagonal of ρ vanishes while the cyan 0.75 and 0.25 stay, which is AND; middle: cyan r² falls to 0.25 as magenta τ grows to 0.75, always summing to 1; right: the amber ξ = 0.814 ≥ p draws record 1, a model\'s sampling step.'],
    'born-unequal': ['琥珀色的 |u⟩ 转到 30° 刻度，青色影子是 cos θ、sin θ，紫色虚线是 R|u⟩ 与 R²|u⟩ = −|u⟩。中：给定 B = 0，实心柱 75%、25%；不看 B，空心柱 50%、50%。右：两支分支 1 : 1，权重 3 : 1；|+⟩、|−⟩ 的青色 Z 读数都是 ½，只有品红的 X 读数分出 +1、−1。',
      'The amber |u⟩ turns to the 30° mark; the cyan shadows are cos θ and sin θ, the dashed violet arrows R|u⟩ and R²|u⟩ = −|u⟩. Middle: given B = 0 the solid columns read 75%, 25%; with B unseen the hollow ones read 50%, 50%. Right: two branches 1 : 1, weights 3 : 1; on Z, |+⟩ and |−⟩ both read ½, only the magenta X splits +1, −1.'],
    'bell-epr': ['β 推到 +0.6：时空图里 A、B 类空分离，琥珀色的同时线倾斜，先后翻成“B 先于 A”，Δt′ = −1.50。左：紫色四轴是 CHSH 的设置，品红叠到 2.83，越过虚线 2，推动中不动。右：青色的 6 个局部格全是 0（边缘 50/50），关联全在品红的 3 × 3 格里。',
      'β is pushed to +0.6: A and B are spacelike, the amber lines of simultaneity tilt and the order flips to "B before A", Δt′ = −1.50. Left: the violet CHSH axes; magenta stacks to 2.83, past the dashed 2, unmoved by the boost. Right: the six cyan local cells are all 0 (marginals 50/50); the correlation sits in the magenta 3 × 3.'],
    'time-horizon': ['N 涨到 10⁴。左：整体的熵停在 0，品红的约化熵涨到 0.729 比特，青色的捏合熵 0.811，差 ΔS = 0.082。中：16 个态排成 8 列，每列两点由品红线连成逃逸对，共 16 对、1 比特；选“+ 奇偶”线全断开。右：紫色的 e 垂直于青色的层 S；红框是开放问题。',
      'N grows to 10⁴. Left: the whole stays at 0 while the magenta reduced entropy reaches 0.729 bit, under the cyan pinched 0.811 (ΔS = 0.082). Middle: 16 states in 8 columns, each pair joined by a magenta escape line, 16 pairs, 1 bit; "+ parity" breaks every line. Right: the violet e stands orthogonal to the cyan layer S; red marks the open problem.'],
    'five-way-duel': ['θ = 30°、N = 10⁴：五栏读同一台仪器，顶行是共同的数。各栏画出透镜怎样表示朋友的两行记录：琥珀框只认一行、两条青色分支、一颗琥珀色粒子、一根紫色 q 刻度（几乎为空）、一支紫色余量箭头；下面是守住与多付。琥珀框是当前透镜，点一栏即可切换。',
      'θ = 30°, N = 10⁴: five columns read one apparatus, the shared numbers on top. Each draws how its lens shows the friend\'s two records: one row in an amber frame, two cyan branches, an amber particle, a violet q gauge (nearly empty), a violet residual arrow; below, what it keeps and adds. Click a column to switch.']
  };
  let booting = true;
  function applyCard(id) {
    const cd = CARDS[id];
    if (!cd) return;
    stopAt = null;
    Object.assign(state, { focus: cd.focus, lens: cd.lens, theta: cd.theta, u: cd.u, beta: cd.beta, parity: cd.parity || 'none', xiDraw: 0 });
    lensChips.set(state.lens, true); parityChips.set(state.parity, true);
    configureRail(); syncInputs();
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (cd.play && !TRV.still && !(booting && !TRV.embed)) {
      stopAt = cd.stop == null ? null : cd.stop;
      clock.set(cd.from);
      if (booting) kit.autoplay(clock, stageEl); else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyCard,
    idle: ['自由探索：拖动琥珀色的箭头、时空图或左边的三个旋钮；换透镜不动旋钮。随时可以再选一张卡。', 'Free play: drag the amber arrow, the spacetime diagram or the three dials on the left; switching lenses leaves the dials alone. Pick a card again at any time.']
  });
  const ORDER = Object.keys(CARDS);
  kit.keys({
    1: () => cards.pick(ORDER[0]), 2: () => cards.pick(ORDER[1]), 3: () => cards.pick(ORDER[2]),
    4: () => cards.pick(ORDER[3]), 5: () => cards.pick(ORDER[4]), 6: () => cards.pick(ORDER[5]),
    l: () => lensChips.set(LENS_ORDER[(LENS_ORDER.indexOf(state.lens) + 1) % LENS_ORDER.length])
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- read-only probe for an independent browser suite, the cover, start ---------- */
  const snapshot = () => {
    const D = model(state);
    return {
      preset: cards.current, focus: state.focus, lens: state.lens, thetaDeg: state.theta, uScale: state.u, N: D.N, beta: state.beta, parityMode: state.parity,
      playing: clock.playing, t: clock.t, max: clock.max, xi: D.xi, sampledRecord: D.sel,
      condWeights: [D.p, D.q], uncondMarginals: [D.margA, D.margB], condPlusGivenPlus: D.condPlus, rho: D.rho.map((r) => r.slice()),
      gamma: D.gamma, purity: D.purity, deletedHsMass: D.deleted, visibility: D.vis, visibilityFull: D.visFull, blochR2: D.r2, tangleLE: D.tangle,
      entropyBits: D.S, pinchEntropyBits: D.Hp, pinchDeltaBits: D.dS, chshS: D.chsh, chshTerms: D.chshTerms.slice(),
      lorentzGamma: D.G, deltaTPrime: D.dt, deltaXPrime: D.dx, interval: D.interval,
      escapePairs: D.esc.pairs, escapeRate: D.esc.rate, escapeEntropyBits: D.esc.H2, uniqueCapture: D.esc.capture, grwProb: D.grw,
      sectors: { local: [...SECTORS.a, ...SECTORS.b], correlation: SECTORS.T.map((r) => r.slice()) },
      abba: D.ABBA.slice(), rSquared: D.R2.map((r) => r.slice()), robertson: Object.assign({}, D.rob)
    };
  };
  const probe = {
    get state() { return snapshot(); },
    /** Pick a card, a lens or a parity readout, or move a dial; each settles at once for a test. */
    pick(id) { cards.pick(id); kit.flush(); },
    lens(id) { lensChips.set(id); kit.flush(); },
    parity(mode) { parityChips.set(mode); kit.flush(); },
    set(dials) { leave(); if (dials.theta != null) setDial('theta', dials.theta); if (dials.u != null) setDial('u', dials.u); if (dials.beta != null) setDial('beta', dials.beta); kit.flush(); },
    seek(t) { leave(); clock.pause(); clock.set(t); kit.flush(); },
    /** Viewport coordinates of the draggable regions drawn this frame. */
    handles() { const b = cv.getBoundingClientRect(); return hits.map((h) => Object.assign({}, h, { left: b.left, top: b.top })); }
  };
  Object.keys(snapshot()).forEach((k) => { Object.defineProperty(probe, k, { get: () => snapshot()[k], enumerable: true }); });
  window.INTERPRETATIONS_DUEL_DEBUG = probe;

  /** Cover: the same apparatus, the friend's two records read by many-worlds, Wigner's coherent and pinched matrices. */
  window.TRV_THUMB = () => {
    stopAt = null; clock.pause();
    Object.assign(state, { focus: 'cut', lens: 'many-worlds', theta: 30, u: 3.7, beta: 0, parity: 'none', xiDraw: 0 });
    lensChips.set(state.lens, true); configureRail(); syncInputs(); kit.flush(); paint.now();
  };
  cards.pick(cards.initial('wigner-cut'));   // a chapter may cite another card: ::: {.viz src="quantum-interpretations-duel" preset="bell-epr"}
  booting = false;
  paint();
})();
