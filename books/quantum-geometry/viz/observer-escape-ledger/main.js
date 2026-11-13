/* ORTHO//LEDGER · 观察者逃逸账本 · Observer escape ledger, preimage fibers & Hilbert–Zeckendorf entropy
   Left stage: 4 × 4 closed Hamiltonian Moore/Hilbert space-filling cycle (16 states s = (b₀, b₁, b₂, b₃) ∈ {0,1}⁴,
   d_in = d_out = 1 on every step, closing #15 → #00), colored preimage fiber clusters F_T(y), cross-lattice unordered
   escape chords {s₁, s₂} in --magenta / --violet (never --warn red, never --green), active pointer *ptr in --amber,
   plus Local-Marginal mode comparing two-qubit Bell |Φ⁺⟩⟨Φ⁺|, ρ_cl = ½(|00⟩⟨00| + |11⟩⟨11|), and ρ_mix = ¼I₄.
   Right stage & strip plots: exact conservation balance H_total = I_ledger(T) + H₂^escape(S|T) = 4.000 bits,
   leave-one-out uniqueCapturePairs novelty bars, Awake Stage-5 irreversible Landauer heat vs Dream Stage-4 zero-heat
   isentropic recoherence, Zeckendorf golden capacity log₂φ ≈ 0.69424 bits/symbol (Parry p₁ = 1/(φ√5) ≈ 0.27639),
   SMB (−(1/k) log₂ μ(Cₖ(x)) → h_μ a.s.) drawn as MODEL benchmark lines log₂ μ = −k·h_μ with the finite-window
   cut-depth rebound 2^(+Δk·h_μ), and the frozen 14-bit block-B₁
   uniform avoidance upper bound φ^(H+1)(1 − φ⁻¹⁴)^⌊H/14⌋.
   Zero hardcoded hex colours; read-only browser test probe: window.LEDGER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, TAU } = kit;
  const P = TRV.palette;
  const $ = (id) => document.getElementById(id);

  /* ---------- mathematical constants ---------- */
  const LN2 = Math.log(2);
  const SQRT5 = Math.sqrt(5);
  const PHI = (1 + SQRT5) / 2;
  const INV_PHI = 1 / PHI;
  const LOG2_PHI = Math.log2(PHI);                 // ≈ 0.6942419136306173 bits/symbol
  const STABILITY_TAX = 1 - LOG2_PHI;              // ≈ 0.3057580863693827 bits/symbol
  const PARRY_P1 = 1 / (PHI * SQRT5);              // ≈ 0.27639320225002106
  const PARRY_P0 = 1 - PARRY_P1;                   // ≈ 0.7236067977499789
  const THETA_STAR = (() => {
    let x = 0.7390851332151607;
    for (let i = 0; i < 60; i++) x -= (x - Math.cos(x)) / (1 + Math.sin(x));
    return x;
  })();
  const SIN_THETA_STAR = Math.sin(THETA_STAR);     // ≈ 0.6736120291832148
  const RATE_DOTTIE = -Math.log2(SIN_THETA_STAR);  // ≈ 0.5700101898729248 bits/step

  const KMAX = 16;
  const N_STATES = 16;
  const ORD_DENOM = N_STATES * (N_STATES - 1);     // 240 ordered distinct pairs
  const CHORD_DENOM = ORD_DENOM / 2;               // 120 unordered chords

  /* ---------- 4 × 4 closed Hamiltonian Moore/Hilbert loop ----------
     16 vertices on {0,1,2,3}² with unit Manhattan step |dx| + |dy| = 1 for every k → (k + 1) mod 16.
     Bijective 4-bit state mapping on grid (x, y):
       b₀ = x mod 2, b₁ = ⌊y / 2⌋, b₂ = y mod 2, b₃ = ⌊x / 2⌋   (so x = 2·b₃ + b₀, y = 2·b₁ + b₂).
     When L₁=b₀, L₂=b₁, L₃=b₂ stay ON and 4-body parity L₄=b₀⊕b₁⊕b₂⊕b₃ turns OFF, b₃ becomes free and the 8 merged
     size-2 fibers pair (0, y) ↔ (2, y) and (1, y) ↔ (3, y) across the left/right Hilbert halves! */
  const LOOP_COORDS = [
    [1, 0], [0, 0], [0, 1], [1, 1],
    [1, 2], [0, 2], [0, 3], [1, 3],
    [2, 3], [3, 3], [3, 2], [2, 2],
    [2, 1], [3, 1], [3, 0], [2, 0]
  ];

  // Canonical cyclic Zeckendorf pulse sequence along the 16-step closed loop (no adjacent 1s, including wrap 15 → 0)
  const LOOP_ZECK_BITS = [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0];

  const STATES = LOOP_COORDS.map(([x, y], stepIdx) => {
    const b0 = x & 1;
    const b1 = (y >> 1) & 1;
    const b2 = y & 1;
    const b3 = (x >> 1) & 1;
    const stateId = (b0 << 3) | (b1 << 2) | (b2 << 1) | b3;
    const bits = [b0, b1, b2, b3];
    const bitStr = `${b0}${b1}${b2}${b3}`;
    const lemmas = [
      b0,                      // L₁(s) = b₀
      b1,                      // L₂(s) = b₁
      b2,                      // L₃(s) = b₂
      b0 ^ b1 ^ b2 ^ b3,       // L₄(s) = b₀ ⊕ b₁ ⊕ b₂ ⊕ b₃ (4-body global XOR parity)
      b0 ^ b1                  // L₅(s) = b₀ ⊕ b₁ (derived redundant lemma in semantic closure of {L₁, L₂})
    ];
    const [nx, ny] = LOOP_COORDS[(stepIdx + 1) % N_STATES];
    const [px, py] = LOOP_COORDS[(stepIdx + N_STATES - 1) % N_STATES];
    const dOut = Math.abs(nx - x) + Math.abs(ny - y);
    const dIn = Math.abs(x - px) + Math.abs(y - py);
    return { stepIdx, x, y, b0, b1, b2, b3, bits, bitStr, stateId, lemmas, dIn, dOut, zBit: LOOP_ZECK_BITS[stepIdx] };
  });

  const LEMMA_META = [
    { idx: 0, code: 'L₁', expr: 'b₀', zh: '坐标位 b₀', en: 'Bit b₀' },
    { idx: 1, code: 'L₂', expr: 'b₁', zh: '象限位 b₁', en: 'Half b₁' },
    { idx: 2, code: 'L₃', expr: 'b₂', zh: '细行位 b₂', en: 'Row b₂' },
    { idx: 3, code: 'L₄', expr: '⊕₄b', zh: '四体异或 b₀⊕b₁⊕b₂⊕b₃', en: '4-body XOR b₀⊕b₁⊕b₂⊕b₃' },
    { idx: 4, code: 'L₅', expr: 'b₀⊕b₁', zh: '派生冗余 b₀⊕b₁', en: 'Derived b₀⊕b₁' }
  ];

  /* ---------- exact combinatorics for all 2⁵ = 32 lemma subsets ---------- */
  function computeBaseMask(mask) {
    const map = new Map();
    const sigOf = new Array(N_STATES);
    for (let k = 0; k < N_STATES; k++) {
      let sig = 0;
      for (let i = 0; i < 5; i++) {
        if ((mask >> i) & 1) sig = (sig << 1) | STATES[k].lemmas[i];
      }
      sigOf[k] = sig;
      if (!map.has(sig)) map.set(sig, []);
      map.get(sig).push(k);
    }
    const fibers = [...map.values()];
    const fiberOf = new Array(N_STATES);
    const fiberSizeOf = new Array(N_STATES);
    fibers.forEach((f, fi) => {
      for (const k of f) {
        fiberOf[k] = fi;
        fiberSizeOf[k] = f.length;
      }
    });

    const escapeChords = [];
    let orderedPairsDirect = 0;
    for (let a = 0; a < N_STATES; a++) {
      for (let b = 0; b < N_STATES; b++) {
        if (a === b) continue;
        if (fiberOf[a] === fiberOf[b]) {
          orderedPairsDirect++;
          if (a < b) escapeChords.push([a, b]);
        }
      }
    }
    const sumFiberSq = fibers.reduce((acc, f) => acc + f.length * f.length, 0);
    const chordCount = escapeChords.length;
    const orderedEscapeCount = orderedPairsDirect; // === 2 * chordCount === sumFiberSq - 16
    const escapeRate = orderedEscapeCount / ORD_DENOM;
    const h2Escape = Math.log2(1 + (N_STATES - 1) * escapeRate);
    const iLedger = 4 - h2Escape;

    // Exact conditionalLogicalImpurity under uniform PMF μ(s) = 1/16:
    //   ∑_b pairDisagreementMass(b) / fiberMass(b)
    // 1) For identity target A(s) = s: pairDisagreementMass(b) = |F|(|F|-1)/256, fiberMass(b) = |F|/16 => 1 - |Σ_T|/16
    const impurityState = 1 - fibers.length / N_STATES;
    // 2) For 4-body parity target A(s) = L₄(s): pairDisagreementMass(b) = 2*n0*n1/256, fiberMass(b) = |F|/16 => ∑_F (2*n0*n1)/(16*|F|)
    let impurityParity = 0;
    for (const f of fibers) {
      let n1 = 0;
      for (const k of f) n1 += STATES[k].lemmas[3];
      const n0 = f.length - n1;
      impurityParity += (2 * n0 * n1) / (N_STATES * f.length);
    }

    // Per-fiber single-bit marginals P(b_m = 1 | F)
    const fiberBitMarginals = fibers.map((f) => [0, 1, 2, 3].map((m) => {
      let sum = 0;
      for (const k of f) sum += STATES[k].bits[m];
      return sum / f.length;
    }));

    return {
      mask,
      activeCount: [0, 1, 2, 3, 4].filter((i) => (mask >> i) & 1).length,
      fibers,
      fiberCount: fibers.length,
      fiberOf,
      fiberSizeOf,
      escapeChords,
      chordCount,
      orderedEscapeCount,
      sumFiberSq,
      escapeRate,
      h2Escape,
      iLedger,
      hTotal: iLedger + h2Escape,
      impurityState,
      impurityParity,
      fiberBitMarginals
    };
  }

  const BASE_TABLE = Array.from({ length: 32 }, (_, m) => computeBaseMask(m));
  const MASK_TABLE = BASE_TABLE.map((entry, mask) => {
    const uniqueCapture = LEMMA_META.map((lm, i) => {
      const on = Boolean((mask >> i) & 1);
      const withoutMask = on ? (mask & ~(1 << i)) : mask;
      const withMask = on ? mask : (mask | (1 << i));
      const baseWith = BASE_TABLE[withMask];
      const baseWithout = BASE_TABLE[withoutMask];
      const uniqueOrd = baseWithout.orderedEscapeCount - baseWith.orderedEscapeCount;
      const uniqueChords = uniqueOrd / 2;
      return {
        idx: i,
        code: lm.code,
        expr: lm.expr,
        on,
        uniqueOrd,
        uniqueChords,
        lowersEscape: uniqueOrd > 0,
        disjointIdentityHolds: baseWithout.orderedEscapeCount === baseWith.orderedEscapeCount + uniqueOrd
      };
    });
    return Object.assign({}, entry, { uniqueCapture });
  });

  /* ---------- exact DP for legalWords(H, 0) & B₁-avoidance (uniform_avoidance_count) ---------- */
  const BLOCK_B1 = [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]; // length 14
  const AVOID_SERIES = (() => {
    const B = BLOCK_B1, M = B.length, HMAX = 28;
    // Build prefix transition table for B₁
    const nextMatch = Array.from({ length: M }, (_, len) => [0, 1].map((bit) => {
      const cand = B.slice(0, len).concat([bit]);
      for (let k = Math.min(M, cand.length); k >= 1; k--) {
        let ok = true;
        for (let j = 0; j < k; j++) if (cand[cand.length - k + j] !== B[j]) { ok = false; break; }
        if (ok) return k;
      }
      return 0;
    }));
    // DP state: (prevBit ∈ {0,1}, matchLen ∈ 0..13); initial entering bit is 0 (legalWords H 0)
    let dpLegal = [1, 0]; // prevBit = 0, 1
    let dpAvoid = Array.from({ length: 2 }, () => new Array(M).fill(0));
    dpAvoid[0][0] = 1;
    const out = [];
    for (let H = 0; H <= HMAX; H++) {
      const legalCount = dpLegal[0] + dpLegal[1];
      let avoidCount = 0;
      for (let b = 0; b < 2; b++) for (let m = 0; m < M; m++) avoidCount += dpAvoid[b][m];
      const factor14 = 1 - Math.pow(PHI, -14);
      const leanBound = Math.pow(PHI, H + 1) * Math.pow(factor14, Math.floor(H / 14));
      out.push({ H, legalCount, avoidCount, leanBound });
      if (H === HMAX) break;
      const nextLegal = [dpLegal[0] + dpLegal[1], dpLegal[0]];
      const nextAvoid = Array.from({ length: 2 }, () => new Array(M).fill(0));
      for (let prev = 0; prev < 2; prev++) {
        for (let m = 0; m < M; m++) {
          const ways = dpAvoid[prev][m];
          if (!ways) continue;
          for (let bit = 0; bit < 2; bit++) {
            if (prev === 1 && bit === 1) continue; // NoAdjacentOnes (0 :: w)
            const nm = nextMatch[m][bit];
            if (nm < M) nextAvoid[bit][nm] += ways;
          }
        }
      }
      dpLegal = nextLegal;
      dpAvoid = nextAvoid;
    }
    return out;
  })();

  /* ---------- two-qubit local-marginal blind-spot matrices ---------- */
  const Q_STATES = {
    bell: {
      id: 'bell',
      sym: '|Φ⁺⟩⟨Φ⁺|',
      zh: '贝尔纯态 |Φ⁺⟩⟨Φ⁺|（秩 1，全局纠缠）',
      en: 'Bell pure state |Φ⁺⟩⟨Φ⁺| (rank 1, entangled)',
      mat: [
        [0.5, 0, 0, 0.5],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0.5, 0, 0, 0.5]
      ],
      sJointBits: 0,
      sMargBits: 1,
      iMutBits: 2,
      cohNorm: 0.5
    },
    classical: {
      id: 'classical',
      sym: 'ρ_cl',
      zh: '经典关联混态 ½(|00⟩⟨00| + |11⟩⟨11|)',
      en: 'Classical correlated ½(|00⟩⟨00| + |11⟩⟨11|)',
      mat: [
        [0.5, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0.5]
      ],
      sJointBits: 1,
      sMargBits: 1,
      iMutBits: 1,
      cohNorm: 0
    },
    mix: {
      id: 'mix',
      sym: '¼I₄',
      zh: '最大混合乘积态 ρ_mix = ¼I₄ = ½I₂ ⊗ ½I₂',
      en: 'Maximally mixed product ρ_mix = ¼I₄ = ½I₂ ⊗ ½I₂',
      mat: [
        [0.25, 0, 0, 0],
        [0, 0.25, 0, 0],
        [0, 0, 0.25, 0],
        [0, 0, 0, 0.25]
      ],
      sJointBits: 2,
      sMargBits: 1,
      iMutBits: 0,
      cohNorm: 0
    }
  };

  function marginalsOf4x4(M) {
    const rhoA = [
      [M[0][0] + M[1][1], M[0][2] + M[1][3]],
      [M[2][0] + M[3][1], M[2][2] + M[3][3]]
    ];
    const rhoB = [
      [M[0][0] + M[2][2], M[0][1] + M[2][3]],
      [M[1][0] + M[3][2], M[1][1] + M[3][3]]
    ];
    return { rhoA, rhoB };
  }

  /* ---------- state ---------- */
  const S = {
    scene: 'duo',       // 'duo' | 'lattice' | 'ledger'
    mode: 'arena',      // 'arena' | 'marginal'
    mask: 0b11111,      // 5-bit active lemma mask
    qState: 'bell',     // 'bell' | 'classical' | 'mix'
    cutK: 0,            // Δk ∈ 0..8
    rateKind: 'golden'  // 'golden' | 'dottie'
  };

  let lastLatticeHitBoxes = [];
  let lastStacked = false;

  const font = (px, kind, weight) => {
    const fam = kind === 'data'
      ? '"JetBrains Mono", monospace'
      : (kind === 'display' ? '"Chakra Petch", "Noto Sans SC", sans-serif' : '"Source Sans 3", "Noto Sans SC", sans-serif');
    return `${weight || 500} ${px}px ${fam}`;
  };

  const stepIdx = () => clamp(Math.floor((clock ? clock.t : 0) + 1e-9), 0, KMAX);
  const activeLoopStep = () => stepIdx() % N_STATES;
  const activeRate = () => (S.rateKind === 'golden' ? LOG2_PHI : RATE_DOTTIE);

  // Semantic non-green, non-red, non-amber fiber palette (strictly derived from cyan / violet / magenta / ink)
  function fiberStroke(fi, size) {
    if (size === 1) return P.cyan;
    const cycle = [P.magenta, P.violet, P.cyan, P.sigma];
    return cycle[fi % cycle.length];
  }
  function fiberFill(fi, size) {
    if (size === 1) return TRV.alpha(P.cyan, 0.14);
    const cycle = [
      TRV.alpha(P.magenta, 0.20),
      TRV.alpha(P.violet, 0.22),
      TRV.alpha(P.cyan, 0.18),
      TRV.alpha(P.sigma, 0.16)
    ];
    return cycle[fi % cycle.length];
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  /* ---------- Left Panel A: 4 × 4 Closed Hilbert Loop & Escape Chords ---------- */
  function drawArenaBox(ctx, box, lw) {
    const { x: bx, y: by, w: bw, h: bh } = box;
    const info = MASK_TABLE[S.mask];
    const ptrStep = activeLoopStep();
    const activeFiber = info.fiberOf[ptrStep];

    if (!TRV.thumbMode) {
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        L('闭合 4×4 HILBERT/MOORE 回路 · d_in = d_out = 1', 'CLOSED 4×4 HILBERT/MOORE LOOP · d_in = d_out = 1'),
        bx + 2,
        by - 4
      );
    }

    roundRectPath(ctx, bx, by, bw, bh, 8 * lw);
    ctx.fillStyle = TRV.alpha(P.void, 0.62);
    ctx.fill();
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.92);
    ctx.lineWidth = 1 * lw;
    ctx.stroke();

    const footerH = TRV.thumbMode ? 10 : Math.min(34, Math.max(24, bh * 0.12));
    const padX = Math.max(20 * lw, bw * 0.10);
    const padTop = Math.max(18 * lw, (bh - footerH) * 0.10);
    const padBot = Math.max(14 * lw, (bh - footerH) * 0.08);
    const gridW = Math.max(60, bw - 2 * padX);
    const gridH = Math.max(60, bh - footerH - padTop - padBot);
    const side = Math.min(gridW, gridH);
    const gx0 = bx + (bw - side) / 2;
    const gy0 = by + padTop + (gridH - side) / 2;
    const stepPx = side / 3;

    const ptOf = (k) => {
      const st = STATES[k];
      return [gx0 + st.x * stepPx, gy0 + st.y * stepPx];
    };

    // Quadrant subtle divider crosshairs
    const midX = gx0 + 1.5 * stepPx, midY = gy0 + 1.5 * stepPx;
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.65);
    ctx.lineWidth = 1 * lw;
    ctx.setLineDash([4 * lw, 4 * lw]);
    ctx.beginPath();
    ctx.moveTo(midX, gy0 - stepPx * 0.26); ctx.lineTo(midX, gy0 + side + stepPx * 0.26);
    ctx.moveTo(gx0 - stepPx * 0.26, midY); ctx.lineTo(gx0 + side + stepPx * 0.26, midY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Closed 16-step Hamiltonian Moore/Hilbert cycle
    ctx.strokeStyle = TRV.alpha(P.cyan, 0.36);
    ctx.lineWidth = 2.4 * lw;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let k = 0; k < N_STATES; k++) {
      const [px, py] = ptOf(k);
      if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    // Highlight traversed prefix 0 → stepIdx along the closed loop + directional chevrons
    const kProgress = stepIdx();
    if (kProgress > 0) {
      ctx.strokeStyle = TRV.alpha(P.cyan, 0.78);
      ctx.lineWidth = 2.8 * lw;
      ctx.beginPath();
      const [x0, y0] = ptOf(0);
      ctx.moveTo(x0, y0);
      for (let j = 1; j <= kProgress; j++) {
        const [xj, yj] = ptOf(j % N_STATES);
        ctx.lineTo(xj, yj);
      }
      ctx.stroke();
    }

    // Small midpoint directional chevrons along all 16 edges (including #15 → #00 closure)
    for (let k = 0; k < N_STATES; k++) {
      const [x1, y1] = ptOf(k);
      const [x2, y2] = ptOf((k + 1) % N_STATES);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const ux = x2 - x1, uy = y2 - y1, len = Math.hypot(ux, uy) || 1;
      const dx = ux / len, dy = uy / len;
      const s = Math.max(3.2, Math.min(5.0, stepPx * 0.085)) * lw;
      ctx.strokeStyle = k === 15 ? P.cyan : TRV.alpha(P.cyan, 0.62);
      ctx.lineWidth = 1.35 * lw;
      ctx.beginPath();
      ctx.moveTo(mx - dx * s - dy * s * 0.72, my - dy * s + dx * s * 0.72);
      ctx.lineTo(mx + dx * s * 0.65, my + dy * s * 0.65);
      ctx.lineTo(mx - dx * s + dy * s * 0.72, my - dy * s - dx * s * 0.72);
      ctx.stroke();
    }

    // Escape chords {s₁, s₂} in --magenta / --violet (never --warn red!)
    const nChords = info.chordCount;
    const baseAlpha = nChords <= 8 ? 0.86 : clamp(0.84 / Math.sqrt(nChords / 8), 0.14, 0.80);
    for (let ci = 0; ci < nChords; ci++) {
      const [a, b] = info.escapeChords[ci];
      const [x1, y1] = ptOf(a);
      const [x2, y2] = ptOf(b);
      const touchesPtr = a === ptrStep || b === ptrStep || info.fiberOf[a] === activeFiber;
      const dx = x2 - x1, dy = y2 - y1;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist, ny = dx / dist;
      // Opposite curvature signs for even/odd columns so same-row chords never overlap!
      const sign = ((STATES[a].b0 === 0 ? -1 : 1) * (a % 2 === 0 ? 1 : 0.85));
      const bend = sign * Math.min(stepPx * 0.36, dist * 0.22);
      const cx = (x1 + x2) / 2 + nx * bend;
      const cy = (y1 + y2) / 2 + ny * bend;

      ctx.strokeStyle = touchesPtr ? P.magenta : (ci % 2 === 0 ? P.magenta : P.violet);
      ctx.globalAlpha = touchesPtr ? Math.min(0.98, baseAlpha + 0.22) : baseAlpha;
      ctx.lineWidth = (touchesPtr ? 2.4 : (nChords <= 12 ? 1.95 : 1.25)) * lw;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // 16 State vertices with preimage fiber clusters & --amber active pointer
    const nodeR = clamp(stepPx * 0.27, 11 * lw, 20 * lw);
    const hits = [];
    const showZeck = cards && cards.current === 'zeckendorf';

    for (let k = 0; k < N_STATES; k++) {
      const st = STATES[k];
      const [px, py] = ptOf(k);
      const fi = info.fiberOf[k];
      const fSize = info.fiberSizeOf[k];
      const isPtr = k === ptrStep;
      const sameActiveFiber = !isPtr && fi === activeFiber && fSize > 1;

      if (isPtr) {
        ctx.strokeStyle = TRV.alpha(P.amber, 0.45);
        ctx.lineWidth = 2.0 * lw;
        ctx.beginPath();
        ctx.arc(px, py, nodeR + 5.2 * lw, 0, TAU);
        ctx.stroke();
      } else if (sameActiveFiber) {
        ctx.strokeStyle = TRV.alpha(P.magenta, 0.55);
        ctx.lineWidth = 1.6 * lw;
        ctx.setLineDash([3 * lw, 2.5 * lw]);
        ctx.beginPath();
        ctx.arc(px, py, nodeR + 4.2 * lw, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = P.stage;
      ctx.beginPath();
      ctx.arc(px, py, nodeR, 0, TAU);
      ctx.fill();

      ctx.fillStyle = isPtr ? TRV.alpha(P.amber, 0.24) : fiberFill(fi, fSize);
      ctx.strokeStyle = isPtr ? P.amber : fiberStroke(fi, fSize);
      ctx.lineWidth = (isPtr ? 2.5 : (fSize > 1 ? 1.9 : 1.5)) * lw;
      ctx.beginPath();
      ctx.arc(px, py, nodeR, 0, TAU);
      ctx.fill();
      ctx.stroke();

      if (!TRV.thumbMode) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = font(Math.max(7.5, Math.min(9.5, nodeR * 0.50)), 'data', 600);
        ctx.fillStyle = isPtr ? P.amber : P.ink;
        ctx.fillText(st.bitStr, px, py - nodeR * 0.22);

        ctx.font = font(Math.max(6.8, Math.min(8.2, nodeR * 0.43)), 'data', 500);
        ctx.fillStyle = isPtr ? P.amber : (showZeck && st.zBit === 1 ? P.magenta : P.dim);
        ctx.fillText(
          showZeck ? `z=${st.zBit}` : `#${String(k).padStart(2, '0')}`,
          px,
          py + nodeR * 0.36
        );
      }
      hits.push({ k, px, py, r: nodeR + 6 });
    }
    lastLatticeHitBoxes = hits;

    // Bottom marginal strip inside box: single-bit marginals on S & inside current fiber
    if (!TRV.thumbMode) {
      const fy = by + bh - footerH * 0.52;
      const fibMarg = info.fiberBitMarginals[activeFiber];
      ctx.font = font(9.2, 'data', 500);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const marginalText = info.chordCount === 8 && S.mask === 0b00111
        ? L(
          `全空间边缘 P(bᵢ=1)=0.50 · 当前纤维 #${ptrStep} 内 P(b₃=1)=${fix(fibMarg[3], 2)}（8 条跨格逃逸弦）`,
          `Global P(bᵢ=1)=0.50 · Fiber #${ptrStep} P(b₃=1)=${fix(fibMarg[3], 2)} (8 cross-lattice chords)`
        )
        : L(
          `纤维 |Σ_T|=${info.fiberCount} · 当前 |F_T|=${info.fiberSizeOf[ptrStep]} · 逃逸弦 ${info.chordCount}/120（有序对 ${info.orderedEscapeCount}/240）`,
          `Fibers |Σ_T|=${info.fiberCount} · active |F_T|=${info.fiberSizeOf[ptrStep]} · chords ${info.chordCount}/120 (ord ${info.orderedEscapeCount}/240)`
        );
      ctx.fillStyle = info.chordCount > 0 ? P.magenta : P.cyan;
      ctx.fillText(marginalText, bx + bw / 2, fy, bw - 16);
    }
  }

  /* ---------- Left Panel B: Quantum Bipartite Local-Marginal Blind Spot ---------- */
  function drawMarginalBox(ctx, box, lw) {
    const { x: bx, y: by, w: bw, h: bh } = box;
    const Q = Q_STATES[S.qState];
    const { rhoA, rhoB } = marginalsOf4x4(Q.mat);

    if (!TRV.thumbMode) {
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        L('二体密度矩阵 ρ_AB 对照局部偏迹边缘 Tr_B, Tr_A', 'BIPARTITE ρ_AB vs LOCAL MARGINALS Tr_B, Tr_A'),
        bx + 2,
        by - 4
      );
    }

    roundRectPath(ctx, bx, by, bw, bh, 8 * lw);
    ctx.fillStyle = TRV.alpha(P.void, 0.62);
    ctx.fill();
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.92);
    ctx.lineWidth = 1 * lw;
    ctx.stroke();

    lastLatticeHitBoxes = [];
    const labels = ['00', '01', '10', '11'];
    const matSide = Math.min(bw * 0.52, bh * 0.66);
    const mx0 = bx + Math.max(26 * lw, bw * 0.08);
    const my0 = by + Math.max(24 * lw, (bh - matSide) * 0.42);
    const cell = matSide / 4;

    // 4x4 matrix cells
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = Q.mat[r][c];
        const x = mx0 + c * cell, y = my0 + r * cell;
        const isOffDiag = r !== c && val > 0;
        const isDiag = r === c && val > 0;
        ctx.fillStyle = isOffDiag
          ? TRV.alpha(P.magenta, 0.36)
          : (isDiag ? TRV.alpha(P.cyan, 0.16 + 0.42 * val) : TRV.alpha(P.stage, 0.78));
        ctx.strokeStyle = isOffDiag ? P.magenta : (isDiag ? P.cyan : TRV.alpha(P.panelEdge, 0.8));
        ctx.lineWidth = (isOffDiag ? 1.9 : 1.1) * lw;
        ctx.fillRect(x + 1.5, y + 1.5, cell - 3, cell - 3);
        ctx.strokeRect(x + 1.5, y + 1.5, cell - 3, cell - 3);

        if (!TRV.thumbMode && (val > 0 || cell > 28)) {
          ctx.font = font(Math.max(8, Math.min(10.5, cell * 0.28)), 'data', 600);
          ctx.fillStyle = isOffDiag ? P.magenta : (val > 0 ? P.ink : P.dim);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(val === 0 ? '0' : fix(val, 2), x + cell / 2, y + cell / 2);
        }
      }
      if (!TRV.thumbMode) {
        ctx.font = font(8.5, 'data', 500);
        ctx.fillStyle = P.dim;
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(`|${labels[r]}⟩`, mx0 + (r + 0.5) * cell, my0 - 3);
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(`⟨${labels[r]}|`, mx0 - 4, my0 + (r + 0.5) * cell);
      }
    }

    // Highlight coherence chord between (0,0) and off-diagonal (0,3) & (3,0) without crossing cell labels
    if (Q.cohNorm > 0) {
      const xStart = mx0 + 0.86 * cell, xEnd = mx0 + 3.14 * cell, yRow = my0 + 0.24 * cell;
      const yStart = my0 + 0.86 * cell, yEnd = my0 + 3.14 * cell, xCol = mx0 + 0.24 * cell;
      ctx.strokeStyle = TRV.alpha(P.magenta, 0.85);
      ctx.lineWidth = 1.8 * lw;
      ctx.setLineDash([4 * lw, 3 * lw]);
      ctx.beginPath();
      ctx.moveTo(xStart, yRow);
      ctx.quadraticCurveTo((xStart + xEnd) / 2, my0 + 0.06 * cell, xEnd, yRow);
      ctx.moveTo(xCol, yStart);
      ctx.quadraticCurveTo(mx0 + 0.06 * cell, (yStart + yEnd) / 2, xCol, yEnd);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Right side of Marginal box: Tr_B(ρ) = ½I₂, Tr_A(ρ) = ½I₂, and 6 vs 9 sector split
    const rx = mx0 + matSide + Math.max(12 * lw, bw * 0.045);
    const rw = Math.max(68, bx + bw - rx - 10 * lw);
    let ry = my0 + 2;

    if (!TRV.thumbMode) {
      ctx.font = font(9.5, 'display', 600);
      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText(`ρ_A = Tr_B = ½I₂`, rx, ry, rw);
      ry += 15;
      const barH = Math.max(8, Math.min(13, bh * 0.042));
      ctx.fillStyle = TRV.alpha(P.cyan, 0.34);
      ctx.strokeStyle = P.cyan;
      ctx.lineWidth = 1.1 * lw;
      ctx.fillRect(rx, ry, rw * rhoA[0][0], barH);
      ctx.strokeRect(rx, ry, rw * rhoA[0][0], barH);
      ctx.fillRect(rx + rw * 0.5 + 2, ry, rw * rhoA[1][1] - 2, barH);
      ctx.strokeRect(rx + rw * 0.5 + 2, ry, rw * rhoA[1][1] - 2, barH);

      ry += barH + 10;
      ctx.fillStyle = P.cyan;
      ctx.fillText(`ρ_B = Tr_A = ½I₂`, rx, ry, rw);
      ry += 15;
      ctx.fillStyle = TRV.alpha(P.cyan, 0.34);
      ctx.fillRect(rx, ry, rw * rhoB[0][0], barH);
      ctx.strokeRect(rx, ry, rw * rhoB[0][0], barH);
      ctx.fillRect(rx + rw * 0.5 + 2, ry, rw * rhoB[1][1] - 2, barH);
      ctx.strokeRect(rx + rw * 0.5 + 2, ry, rw * rhoB[1][1] - 2, barH);

      ry += barH + 14;
      ctx.fillStyle = P.ink;
      ctx.font = font(9.2, 'display', 600);
      ctx.fillText(L('无迹算子 15 维正交分解', '15D TRACELESS SPLIT'), rx, ry, rw);
      ry += 14;
      const w6 = rw * (6 / 15), w9 = rw * (9 / 15);
      ctx.fillStyle = TRV.alpha(P.cyan, 0.35);
      ctx.strokeStyle = P.cyan;
      ctx.fillRect(rx, ry, w6, barH + 2);
      ctx.strokeRect(rx, ry, w6, barH + 2);
      ctx.fillStyle = TRV.alpha(P.violet, 0.42);
      ctx.strokeStyle = P.magenta;
      ctx.fillRect(rx + w6, ry, w9, barH + 2);
      ctx.strokeRect(rx + w6, ry, w9, barH + 2);

      ry += barH + 6;
      ctx.font = font(8, 'data', 500);
      ctx.textAlign = 'left';
      ctx.fillStyle = P.cyan;
      ctx.fillText('6/15', rx, ry);
      ctx.fillStyle = P.magenta;
      ctx.textAlign = 'right';
      ctx.fillText(L('盲区 9/15', 'blind 9/15'), rx + rw, ry);
    }

    if (!TRV.thumbMode) {
      ctx.font = font(9.2, 'data', 500);
      ctx.fillStyle = Q.cohNorm > 0 ? P.magenta : P.cyan;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        L(
          `${Q.sym}：S(ρ_A)=S(ρ_B)=1 bit 恒同 · 互信息 I(A:B)=${Q.iMutBits} bits`,
          `${Q.sym}: identical S(ρ_A)=S(ρ_B)=1 bit · mutual info I(A:B)=${Q.iMutBits} bits`
        ),
        bx + bw / 2,
        by + bh - 13,
        bw - 16
      );
    }
  }

  /* ---------- Right Stage Panel: Conservation, StructuralNovelty, Landauer vs Dream & Zeckendorf ---------- */
  function drawLedgerBox(ctx, box, lw) {
    const { x: bx, y: by, w: bw, h: bh } = box;
    const info = MASK_TABLE[S.mask];

    if (!TRV.thumbMode) {
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        L('守恒账本 · 唯一捕获新颖度 · 黄金容量与热账单', 'CONSERVATION · NOVELTY · GOLDEN CAPACITY & HEAT'),
        bx + 2,
        by - 4
      );
    }

    roundRectPath(ctx, bx, by, bw, bh, 8 * lw);
    ctx.fillStyle = TRV.alpha(P.void, 0.62);
    ctx.fill();
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.92);
    ctx.lineWidth = 1 * lw;
    ctx.stroke();

    const compact = !TRV.thumbMode && bh < 238;
    const padX = Math.max(12 * lw, bw * 0.055);
    const ix = bx + padX, iw = Math.max(80, bw - 2 * padX);
    const topY = by + (TRV.thumbMode ? Math.max(26 * lw, bh * 0.085) : (compact ? 8 : Math.max(12 * lw, bh * 0.052)));
    const usableH = bh - 2 * (compact ? 8 : Math.max(11 * lw, bh * 0.05));

    // Tier 1: H_total = I_ledger(T) + H₂^escape(S|T) = 4.000 bits
    const t1Y = topY;
    const barH = TRV.thumbMode
      ? clamp(usableH * 0.115, 16 * lw, 28 * lw)
      : clamp(usableH * (compact ? 0.075 : 0.085), 9 * lw, 20 * lw);
    const fLedger = clamp(info.iLedger / 4, 0, 1);
    const wLed = iw * fLedger, wEsc = iw - wLed;

    if (!TRV.thumbMode) {
      ctx.font = font(compact ? 8.8 : 9.6, 'display', 600);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = P.ink;
      ctx.fillText(
        L('1. 信息守恒 H_total = I_ledger + H₂^escape = 4.000 bits', '1. CONSERVATION H_total = I_ledger + H₂^escape = 4.000b'),
        ix,
        t1Y,
        iw
      );
    }

    const b1Y = t1Y + (TRV.thumbMode ? 0 : (compact ? 12 : 15));
    if (wLed > 0.5) {
      ctx.fillStyle = TRV.alpha(P.cyan, 0.36);
      ctx.strokeStyle = P.cyan;
      ctx.lineWidth = 1.4 * lw;
      ctx.fillRect(ix, b1Y, wLed, barH);
      ctx.strokeRect(ix, b1Y, wLed, barH);
    }
    if (wEsc > 0.5) {
      ctx.fillStyle = TRV.alpha(P.magenta, 0.38);
      ctx.strokeStyle = P.magenta;
      ctx.lineWidth = 1.4 * lw;
      ctx.fillRect(ix + wLed, b1Y, wEsc, barH);
      ctx.strokeRect(ix + wLed, b1Y, wEsc, barH);
    }
    // Bit ticks 0, 1, 2, 3, 4
    for (let bit = 1; bit < 4; bit++) {
      const tx = ix + (iw * bit) / 4;
      ctx.strokeStyle = TRV.alpha(P.ink, 0.25);
      ctx.lineWidth = 1 * lw;
      ctx.beginPath(); ctx.moveTo(tx, b1Y); ctx.lineTo(tx, b1Y + barH); ctx.stroke();
    }
    if (!TRV.thumbMode) {
      ctx.font = font(compact ? 8.0 : 8.8, 'data', 600);
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.fillStyle = P.cyan;
      ctx.fillText(`I_ledger = ${fix(info.iLedger, 3)}b`, ix, b1Y + barH + (compact ? 2.5 : 4));
      ctx.textAlign = 'right';
      ctx.fillStyle = info.h2Escape > 1e-9 ? P.magenta : P.dim;
      ctx.fillText(`H₂^escape = ${fix(info.h2Escape, 3)}b (E=${fix(info.escapeRate, 3)})`, ix + iw, b1Y + barH + (compact ? 2.5 : 4));
    }

    // Tier 2: 5 Lemma uniqueCapturePairs bars (StructuralNovelty)
    const t2Y = b1Y + barH + (TRV.thumbMode ? Math.max(24 * lw, usableH * 0.09) : (compact ? 15 : 22));
    if (!TRV.thumbMode) {
      ctx.font = font(compact ? 8.8 : 9.6, 'display', 600);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = P.ink;
      ctx.fillText(
        L('2. 留一唯一捕获弦数 uniqueCapture(Lᵢ)（商核新颖度）', '2. LEAVE-ONE-OUT uniqueCapture(Lᵢ) CHORDS'),
        ix,
        t2Y,
        iw
      );
    }
    const slotTop = t2Y + (TRV.thumbMode ? 0 : (compact ? 12 : 15));
    const slotGap = 5 * lw;
    const slotW = (iw - 4 * slotGap) / 5;
    const slotMaxH = TRV.thumbMode
      ? clamp(usableH * 0.26, 36 * lw, 68 * lw)
      : clamp(usableH * (compact ? 0.165 : 0.205), 18 * lw, 44 * lw);
    const maxCapRef = Math.max(8, ...info.uniqueCapture.map((u) => u.uniqueChords));

    info.uniqueCapture.forEach((u, i) => {
      const sx = ix + i * (slotW + slotGap);
      ctx.fillStyle = TRV.alpha(P.stage, 0.82);
      ctx.strokeStyle = u.on ? (u.lowersEscape ? TRV.alpha(P.cyan, 0.78) : TRV.alpha(P.dim, 0.65)) : TRV.alpha(P.panelEdge, 0.85);
      ctx.lineWidth = 1.1 * lw;
      ctx.fillRect(sx, slotTop, slotW, slotMaxH);
      ctx.strokeRect(sx, slotTop, slotW, slotMaxH);

      const hFrac = clamp(u.uniqueChords / maxCapRef, 0, 1);
      const fillH = hFrac * (slotMaxH - 4);
      if (fillH > 0.5) {
        ctx.fillStyle = u.on ? TRV.alpha(P.cyan, 0.42) : TRV.alpha(P.violet, 0.30);
        ctx.fillRect(sx + 2, slotTop + slotMaxH - 2 - fillH, slotW - 4, fillH);
      }

      if (!TRV.thumbMode) {
        ctx.textAlign = 'center';
        ctx.font = font(compact ? 7.8 : 8.4, 'data', 600);
        ctx.textBaseline = 'middle';
        ctx.fillStyle = u.on ? (u.lowersEscape ? P.cyan : P.dim) : P.violet;
        ctx.fillText(
          u.on ? `${u.uniqueChords}` : `+${u.uniqueChords}`,
          sx + slotW / 2,
          slotTop + slotMaxH * 0.44
        );
        ctx.font = font(compact ? 7.2 : 7.8, 'data', 500);
        ctx.textBaseline = 'top';
        ctx.fillStyle = u.on ? P.ink : P.dim;
        ctx.fillText(u.code, sx + slotW / 2, slotTop + slotMaxH + (compact ? 1.5 : 2));
      }
    });

    // Tier 3: Awake Stage-5 Landauer Heat vs Dream Stage-4 Zero-Heat Recoherence
    const t3Y = slotTop + slotMaxH + (TRV.thumbMode ? Math.max(24 * lw, usableH * 0.09) : (compact ? 13 : 18));
    const nErase = Math.max(0, Math.round(4 - info.iLedger) || S.cutK || 1);
    const betaQAwake = nErase * LN2; // dimensionless Q / (k_B T) = N_erase * ln 2
    const rebound = Math.pow(2, S.cutK * activeRate());

    if (!TRV.thumbMode) {
      ctx.font = font(compact ? 8.8 : 9.6, 'display', 600);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = P.ink;
      ctx.fillText(
        L(`3. 清醒热擦除 (N=${nErase}b) vs 梦境 U_copy† 零热复相干`, `3. AWAKE ERASE (N=${nErase}b) vs DREAM U_copy† ZERO-HEAT`),
        ix,
        t3Y,
        iw
      );
    }
    const hBarY = t3Y + (TRV.thumbMode ? 0 : (compact ? 11.5 : 14));
    const hBarH = TRV.thumbMode
      ? clamp(usableH * 0.095, 14 * lw, 22 * lw)
      : clamp(usableH * (compact ? 0.060 : 0.068), 8 * lw, 15 * lw);
    const halfW = (iw - 10 * lw) / 2;
    const awakeFrac = clamp(betaQAwake / (4 * LN2), 0.08, 1);

    // Left mini-bar: Awake Stage-5 heat βΔQ = N_erase ln 2 > 0
    ctx.fillStyle = TRV.alpha(P.stage, 0.82);
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.9);
    ctx.fillRect(ix, hBarY, halfW, hBarH);
    ctx.strokeRect(ix, hBarY, halfW, hBarH);
    ctx.fillStyle = TRV.alpha(P.magenta, 0.44);
    ctx.strokeStyle = P.magenta;
    ctx.fillRect(ix, hBarY, halfW * awakeFrac, hBarH);
    ctx.strokeRect(ix, hBarY, halfW * awakeFrac, hBarH);

    // Right mini-bar: Dream Stage-4 recoherence βΔQ = 0.000
    const dxDream = ix + halfW + 10 * lw;
    ctx.fillStyle = TRV.alpha(P.cyan, 0.16);
    ctx.strokeStyle = P.cyan;
    ctx.fillRect(dxDream, hBarY, halfW, hBarH);
    ctx.strokeRect(dxDream, hBarY, halfW, hBarH);

    if (!TRV.thumbMode) {
      ctx.font = font(compact ? 7.8 : 8.3, 'data', 600);
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.fillStyle = P.magenta;
      ctx.fillText(L(`清醒 βΔQ ≥ ${fix(betaQAwake, 3)} nats`, `Awake βΔQ ≥ ${fix(betaQAwake, 3)}`), ix, hBarY + hBarH + (compact ? 2 : 3), halfW);
      ctx.fillStyle = P.cyan;
      ctx.fillText(
        S.cutK > 0
          ? L(`梦境 ΔQ=0 · 回弹 ×${fix(rebound, 2)}`, `Dream ΔQ=0 · ×${fix(rebound, 2)}`)
          : L('梦境 ΔQ = 0.000 (等熵)', 'Dream ΔQ = 0.000 (unitary)'),
        dxDream,
        hBarY + hBarH + (compact ? 2 : 3),
        halfW
      );
    }

    // Tier 4: Zeckendorf Golden Capacity log₂φ ≈ 0.69424 vs 1.000 bit/symbol
    const t4Y = hBarY + hBarH + (TRV.thumbMode ? Math.max(24 * lw, usableH * 0.09) : (compact ? 13 : 18));
    const zBarH = TRV.thumbMode
      ? clamp(usableH * 0.105, 15 * lw, 24 * lw)
      : clamp(usableH * (compact ? 0.062 : 0.072), 8 * lw, 16 * lw);
    const zbY = TRV.thumbMode ? t4Y : t4Y + (compact ? 11 : 13);
    if (zbY + zBarH + (TRV.thumbMode ? 4 : 11) <= by + bh + 3) {
      if (!TRV.thumbMode) {
        ctx.font = font(compact ? 8.6 : 9.4, 'display', 600);
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillStyle = P.ink;
        ctx.fillText(
          L('4. 齐肯多夫黄金信道容量 log₂φ vs 原始 1.000 bit', '4. ZECKENDORF CAPACITY log₂φ vs RAW 1.000 bit'),
          ix,
          t4Y,
          iw
        );
      }
      const wCap = iw * LOG2_PHI, wTax = iw - wCap;
      ctx.fillStyle = TRV.alpha(P.cyan, 0.36);
      ctx.strokeStyle = P.cyan;
      ctx.lineWidth = 1.4 * lw;
      ctx.fillRect(ix, zbY, wCap, zBarH);
      ctx.strokeRect(ix, zbY, wCap, zBarH);
      ctx.fillStyle = TRV.alpha(P.violet, 0.38);
      ctx.strokeStyle = P.violet;
      ctx.fillRect(ix + wCap, zbY, wTax, zBarH);
      ctx.strokeRect(ix + wCap, zbY, wTax, zBarH);

      // Parry p₁ tick at 0.27639
      const pxParry = ix + iw * PARRY_P1;
      ctx.strokeStyle = P.amber;
      ctx.lineWidth = (TRV.thumbMode ? 2.0 : 1.6) * lw;
      ctx.beginPath(); ctx.moveTo(pxParry, zbY - 2.5 * lw); ctx.lineTo(pxParry, zbY + zBarH + 2.5 * lw); ctx.stroke();

      if (!TRV.thumbMode) {
        ctx.font = font(compact ? 7.6 : 8.2, 'data', 500);
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillStyle = P.cyan;
        ctx.fillText(`log₂φ=${fix(LOG2_PHI, 4)}b (p₁=${fix(PARRY_P1, 4)})`, ix, zbY + zBarH + (compact ? 2 : 3));
        ctx.textAlign = 'right';
        ctx.fillStyle = P.violet;
        ctx.fillText(L(`稳定税 ${fix(STABILITY_TAX, 4)}b`, `tax ${fix(STABILITY_TAX, 4)}b`), ix + iw, zbY + zBarH + (compact ? 2 : 3));
      }
    }
  }

  /* ---------- Main Stage Drawing ---------- */
  function drawStage() {
    const cv = $('cv');
    const dpr = TRV.fitCanvas(cv);
    const W = cv.clientWidth, H = cv.clientHeight;
    if (W < 10 || H < 10) return;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const lw = TRV.thumbMode ? 1.55 : 1;
    const narrow = !TRV.thumbMode && W < 560;
    const padL = TRV.thumbMode ? 44 : 16;
    const padR = TRV.thumbMode ? 44 : 16;
    const padTop = TRV.thumbMode ? 46 : (narrow ? 114 : 80);
    const padBot = TRV.thumbMode ? 40 : (narrow ? 58 : 42);
    const availW = Math.max(80, W - padL - padR);
    const availH = Math.max(80, H - padTop - padBot);

    const drawLeft = (box) => {
      if (S.mode === 'marginal') drawMarginalBox(ctx, box, lw);
      else drawArenaBox(ctx, box, lw);
    };

    if (S.scene === 'lattice') {
      lastStacked = false;
      drawLeft({ x: padL, y: padTop, w: availW, h: availH });
    } else if (S.scene === 'ledger') {
      lastStacked = false;
      lastLatticeHitBoxes = [];
      drawLedgerBox(ctx, { x: padL, y: padTop, w: availW, h: availH }, lw);
    } else {
      const stack = availW < availH * 0.96;
      lastStacked = stack;
      if (stack) {
        const gap = 22;
        const h1 = Math.floor((availH - gap) * 0.48);
        const h2 = availH - gap - h1;
        drawLeft({ x: padL, y: padTop, w: availW, h: h1 });
        drawLedgerBox(ctx, { x: padL, y: padTop + h1 + gap, w: availW, h: h2 }, lw);
      } else {
        const gap = TRV.thumbMode ? 32 : 18;
        const w1 = Math.floor((availW - gap) * 0.48);
        const w2 = availW - gap - w1;
        drawLeft({ x: padL, y: padTop, w: w1, h: availH });
        drawLedgerBox(ctx, { x: padL + w1 + gap, y: padTop, w: w2, h: availH }, lw);
      }
    }
  }

  /* ---------- Two Strip Subplots (#plotA & #plotB) ---------- */
  function drawPlots() {
    if (TRV.thumbMode) return;
    const kNow = clock ? clock.t : 0;
    const hRate = activeRate();

    // Plot A (MODEL benchmark): SMB gives only −(1/k) log₂ μ(Cₖ(x)) → h_μ a.s. (μ(Cₖ(x)) = 2^(−k h_μ + o(k))); the straight
    // lines log₂ μ = −k·h_μ and the finite-window Δk rebound 2^(+Δk·h_μ) drop the o(k) term
    $('pATitle').textContent = L('SMB 柱集基准线与 Δk 回弹（MODEL）', 'SMB benchmark lines & Δk rebound (MODEL)');
    $('pAMeta').textContent = S.cutK > 0
      ? `MODEL · Δk=${S.cutK} · ×${fix(Math.pow(2, S.cutK * hRate), 2)}`
      : `MODEL · −0.694k vs −0.570k`;

    const gA = kit.plot($('plotA'), { x: [0, 16], y: [-16.5, 0.8], pad: [40, 14, 10, 22] });
    if (gA.W > 20 && gA.H > 20) {
      gA.axes({
        xTicks: [[0, '0'], [4, '4'], [8, '8'], [12, '12'], [16, '16']],
        yTicks: [[0, '0'], [-8, '−8b'], [-16, '−16b']]
      });
      // Unconstrained raw binary −1.000·k
      gA.line([[0, 0], [16, -16]], P.dim, { width: 1.2, dash: [4, 3], alpha: 0.7 });
      // Zeckendorf golden shift −k·log₂φ
      gA.line([[0, 0], [16, -16 * LOG2_PHI]], P.magenta, { width: S.rateKind === 'golden' ? 2.2 : 1.5 });
      // Dottie transverse rate −k·(−log₂ sin θ*)
      gA.line([[0, 0], [16, -16 * RATE_DOTTIE]], P.cyan, { width: S.rateKind === 'dottie' ? 2.2 : 1.5 });

      const yNow = -kNow * hRate;
      gA.dot(kNow, yNow, P.amber, 4.2);

      if (S.cutK > 0) {
        const kAnchor = Math.max(S.cutK, Math.round(kNow) || 12);
        const yFrom = -kAnchor * hRate;
        const yTo = -(kAnchor - S.cutK) * hRate;
        gA.line([[kAnchor, yFrom], [kAnchor, yTo]], P.amber, { width: 2.2 });
        gA.dot(kAnchor, yTo, P.amber, 3.8);
        gA.text(
          Math.min(15.4, kAnchor + 0.4),
          (yFrom + yTo) / 2,
          `+${fix(S.cutK * hRate, 2)}b`,
          P.amber,
          { size: 9.2, face: 'data' }
        );
      }
    }

    // Plot B: Uniform 14-bit avoidance bound (LEAN ✓) & cumulative Landauer heat floor
    const isDreamFocus = cards && cards.current === 'dream';
    $('pBTitle').textContent = isDreamFocus
      ? L('清醒累积擦除热 vs 梦境零热逆演', 'Awake cumulative heat vs dream zero-heat')
      : L('14 比特避碰上界 (LEAN ✓) 与合法字增长', '14-bit avoidance bound (LEAN ✓) & legal words');
    $('pBMeta').textContent = isDreamFocus
      ? `βΔQ = N·ln 2 vs 0`
      : `H=0…28 · 1−φ⁻¹⁴≈0.9988`;

    if (isDreamFocus) {
      const gB = kit.plot($('plotB'), { x: [0, 8], y: [-0.2, 6.0], pad: [40, 14, 10, 22] });
      if (gB.W > 20 && gB.H > 20) {
        gB.axes({
          xTicks: [[0, '0'], [2, '2b'], [4, '4b'], [6, '6b'], [8, '8b']],
          yTicks: [[0, '0'], [2.77, '4ln2'], [5.55, '8ln2']]
        });
        gB.line([[0, 0], [8, 8 * LN2]], P.magenta, { width: 2.2 });
        gB.line([[0, 0], [8, 0]], P.cyan, { width: 2.2 });
        const nEr = Math.max(1, S.cutK || Math.round(4 - MASK_TABLE[S.mask].iLedger));
        gB.dot(nEr, nEr * LN2, P.amber, 4.2);
        gB.dot(nEr, 0, P.cyan, 3.8);
      }
    } else {
      const gB = kit.plot($('plotB'), { x: [0, 28], y: [0, 21], pad: [40, 14, 10, 22] });
      if (gB.W > 20 && gB.H > 20) {
        gB.axes({
          xTicks: [[0, '0'], [14, '14'], [28, '28']],
          yTicks: [[0, '0'], [10, '10b'], [20, '20b']]
        });
        const rawPts = [[0, 0], [28, 28]];
        const boundPts = AVOID_SERIES.map((d) => [d.H, Math.log2(d.leanBound)]);
        const exactPts = AVOID_SERIES.map((d) => [d.H, Math.log2(d.avoidCount)]);
        gB.line(rawPts, P.dim, { width: 1.15, dash: [4, 3], alpha: 0.65 });
        gB.line(boundPts, P.violet, { width: 1.9, dash: [5, 3] });
        gB.line(exactPts, P.cyan, { width: 2.1 });
        const hIdx = clamp(Math.round((kNow / 16) * 28), 0, 28);
        const cur = AVOID_SERIES[hIdx];
        gB.dot(cur.H, Math.log2(cur.avoidCount), P.amber, 4.0);
      }
    }
  }

  /* ---------- HUD, Pills & Side Readouts ---------- */
  function drawText() {
    const info = MASK_TABLE[S.mask];
    const ptr = activeLoopStep();
    const st = STATES[ptr];
    const Q = Q_STATES[S.qState];

    // Header status pills
    $('pillFibers').innerHTML = `${L('纤维', 'FIBERS')} <strong>${info.fiberCount}</strong>`;
    $('pillChords').innerHTML = `${L('逃逸弦', 'CHORDS')} <strong>${info.chordCount}</strong>`;
    $('pillEscape').innerHTML = `H₂ <strong>${fix(info.h2Escape, 3)}b</strong>`;

    if (S.mode === 'marginal') {
      $('hudBig').textContent = L(
        `局部边缘盲区 · ${Q.sym}`,
        `MARGINAL BLIND SPOT · ${Q.sym}`
      );
      $('hudSub').textContent = L(
        `Tr_B = Tr_A = ½I₂ 恒同 · 关联扇区占 9/15 = 60% · I(A:B) = ${Q.iMutBits} bits`,
        `Identical Tr_B = Tr_A = ½I₂ · correlation sector 9/15 = 60% · I(A:B) = ${Q.iMutBits} bits`
      );
      $('legend').innerHTML = [
        `<span><i class="sw cy"></i>${L('局部边缘 ½I₂ (6/15)', 'local marginal ½I₂ (6/15)')}</span>`,
        `<span><i class="sw mg"></i>${L('非对角纠缠弦 (9/15 盲区)', 'coherence chord (9/15 blind)')}</span>`,
        `<span><i class="sw vi"></i>${L('正交关联扇区 C_AB', 'correlation sector C_AB')}</span>`
      ].join('');
    } else {
      const activeCodes = LEMMA_META.filter((_, i) => (S.mask >> i) & 1).map((m) => m.code);
      const tLabel = activeCodes.length ? `{${activeCodes.join(',')}}` : '∅';
      $('hudBig').textContent = L(
        `快表 T=${tLabel} · 逃逸弦 ${info.chordCount} 条（有序对 ${info.orderedEscapeCount}）`,
        `TABLE T=${tLabel} · ${info.chordCount} CHORDS (${info.orderedEscapeCount} ORD PAIRS)`
      );
      $('hudSub').textContent = L(
        `I_ledger = ${fix(info.iLedger, 3)}b + H₂^escape = ${fix(info.h2Escape, 3)}b = 4.000b · *ptr #${String(ptr).padStart(2, '0')} (${st.bitStr})`,
        `I_ledger = ${fix(info.iLedger, 3)}b + H₂^escape = ${fix(info.h2Escape, 3)}b = 4.000b · *ptr #${String(ptr).padStart(2, '0')} (${st.bitStr})`
      );
      $('legend').innerHTML = [
        `<span><i class="sw cy"></i>${L('闭合希尔伯特环 / 账本保留', 'closed Hilbert loop / ledger')}</span>`,
        `<span><i class="sw mg"></i>${L('跨格无序逃逸弦', 'unordered escape chords')}</span>`,
        `<span><i class="sw vi"></i>${L('合并原像纤维 / 稳定税', 'merged fibers / stability tax')}</span>`,
        `<span><i class="sw am"></i>${L('当前指针 *ptr 步', 'active pointer *ptr')}</span>`
      ].join('');
    }

    // Side readouts
    if (S.mode === 'marginal') {
      $('roAside').textContent = Q.sym;
      $('roKeyL').textContent = L('正交关联盲区维数占比 (m=n=2)', 'Orthogonal correlation blind-spot share (m=n=2)');
      $('roKey').textContent = '9 / 15 = 60.0%';
      $('roKeySub').textContent = L('（局部扇区 3+3 = 6 维）', ' (local sector 3+3 = 6D)');
      $('roL1').textContent = L('双侧约化边缘态 ρ_A, ρ_B', 'Reduced marginals ρ_A, ρ_B');
      $('ro1').textContent = 'Tr_B(ρ) = Tr_A(ρ) = diag(0.50, 0.50)';
      $('roL2').textContent = L('联合冯·诺依曼熵 vs 互信息', 'Joint entropy vs mutual info');
      $('ro2').textContent = `S(ρ_AB) = ${fix(Q.sJointBits, 2)}b · I(A:B) = ${fix(Q.iMutBits, 2)}b`;
      $('roL3').textContent = L('非对角相干元 |ρ_{00,11}|', 'Off-diagonal |ρ_{00,11}|');
      $('ro3').textContent = fix(Q.cohNorm, 3);
      $('roL4').textContent = L('局部边缘熵 S(ρ_A)', 'Marginal entropy S(ρ_A)');
      $('ro4').textContent = '1.000 bit';
      $('roL5').textContent = L('与经典四体异或盲区对照', '4-body XOR parity parallel');
      $('ro5').textContent = L('关掉 L₄ 时单比特边缘同为 0.50，H₂^escape = 1.000b', 'Dropping L₄ leaves 0.50 bit marginals, H₂^escape = 1.000b');
      $('roNote').textContent = L(
        '贝尔纯态 |Φ⁺⟩⟨Φ⁺|、经典关联态 ½(|00⟩⟨00|+|11⟩⟨11|) 与最大混合态 ¼I₄ 具有完全相同的单比特边缘 ½I₂；纯局域读出对 9 维关联扇区彻底失明。',
        'Bell |Φ⁺⟩⟨Φ⁺|, classical ½(|00⟩⟨00|+|11⟩⟨11|), and ¼I₄ share identical ½I₂ single-qubit marginals; purely local readouts are blind to the 9D correlation sector.'
      );
    } else {
      const u4 = info.uniqueCapture[3], u5 = info.uniqueCapture[4];
      $('roAside').textContent = `MASK 0b${S.mask.toString(2).padStart(5, '0')}`;
      $('roKeyL').textContent = L('条件 Rényi-2 碰撞逃逸熵 H₂^escape(S|T)', 'Conditional Rényi-2 collision escape entropy H₂^escape(S|T)');
      $('roKey').textContent = `${fix(info.h2Escape, 3)} bits`;
      $('roKeySub').textContent = L(` + I_ledger ${fix(info.iLedger, 3)}b = 4.000b`, ` + I_ledger ${fix(info.iLedger, 3)}b = 4.000b`);
      $('roL1').textContent = L('无序逃逸弦 / 有序逃逸对 / 逃逸率', 'Unordered chords / ordered pairs / rate E(T)');
      $('ro1').textContent = `${info.chordCount}/120 · ${info.orderedEscapeCount}/240 · E = ${fix(info.escapeRate, 4)}`;
      $('roL2').textContent = L('唯一捕获弦数：L₄(⊕₄b) 对照 L₅(b₀⊕b₁)', 'Unique-capture chords: L₄(⊕₄b) vs L₅(b₀⊕b₁)');
      $('ro2').textContent = `L₄: ${u4.uniqueChords} (${u4.uniqueOrd} ord) · L₅: ${u5.uniqueChords} (${u5.uniqueOrd} ord)`;
      $('roL3').textContent = L('条件逻辑不纯度 (状态 / 奇偶)', 'Logical impurity (state / L₄)');
      $('ro3').textContent = `${fix(info.impurityState, 3)} / ${fix(info.impurityParity, 3)}`;
      $('roL4').textContent = L('黄金容量 log₂φ / Parry p₁', 'Golden cap log₂φ / Parry p₁');
      $('ro4').textContent = `${fix(LOG2_PHI, 5)}b · p₁=${fix(PARRY_P1, 4)}`;
      $('roL5').textContent = L('指针步 *ptr 与纤维平方和核对', 'Pointer *ptr & fiber-square sum check');
      $('ro5').textContent = `#${String(ptr).padStart(2, '0')} (${st.bitStr}, d=1) · ∑|F|²=${info.sumFiberSq}=16+${info.orderedEscapeCount}`;
      $('roNote').textContent = L(
        '当 L₁, L₂ 开启时，派生引理 L₅ = b₀⊕b₁ 落入语义闭包（唯一捕获 0 弦，无损压缩）；关掉四体奇偶 L₄ 则令 8 对纤维合并、弹出 8 条跨格逃逸弦。',
        'When L₁ and L₂ stay ON, derived L₅ = b₀⊕b₁ lies inside semantic closure (0 unique-capture chords, lossless compression); dropping 4-body parity L₄ merges 8 pairs into 8 cross-lattice escape chords.'
      );
    }

    // Update lemma chip pressed states
    document.querySelectorAll('#lemmaChips [data-lemma]').forEach((btn) => {
      const idx = Number(btn.dataset.lemma);
      btn.setAttribute('aria-pressed', String(Boolean((S.mask >> idx) & 1)));
    });
    $('qStateChips').hidden = S.mode !== 'marginal';
    $('lemmaChips').hidden = S.mode === 'marginal';
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- clock & interactive controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    label: $('tau'),
    speeds: $('speedChips'),
    max: KMAX,
    rate: 1.8,
    step: 1,
    format: (t, max) => {
      const k = clamp(Math.floor(t + 1e-9), 0, KMAX);
      const loopTag = k === KMAX ? '↻#00' : `#${String(k % N_STATES).padStart(2, '0')}`;
      return `k=${k} <small>/${max.toFixed(0)} ${loopTag}</small>`;
    },
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt) {
        const at = stopAt;
        stopAt = null;
        c.pause();
        c.set(at);
        return;
      }
      paint();
    }
  });

  const leave = () => { stopAt = null; cards.mark(null); };

  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => {
    S.scene = v;
    leave();
    paint();
  });

  const modeChips = kit.chips($('modeChips'), 'mode', (v) => {
    S.mode = v;
    leave();
    paint();
  });

  const qStateChips = kit.chips($('qStateChips'), 'qstate', (v) => {
    S.qState = v;
    leave();
    paint();
  });

  const rateChips = kit.chips($('rateChips'), 'rate', (v) => {
    S.rateKind = v;
    leave();
    paint();
  });

  const fCutK = kit.field($('cutK'), {
    fmt: (v) => `${Math.round(v)}`,
    onInput: (v) => {
      S.cutK = Math.round(v);
      leave();
      paint();
    }
  });

  $('lemmaChips').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-lemma]');
    if (!btn) return;
    const idx = Number(btn.dataset.lemma);
    S.mask ^= (1 << idx);
    if (S.mode !== 'arena') {
      S.mode = 'arena';
      modeChips.set('arena', true);
    }
    leave();
    paint();
  });

  $('rew').addEventListener('click', () => {
    stopAt = null;
    clock.pause();
    clock.set(0);
  });

  // Click any node on the 4x4 Hilbert loop to jump *ptr directly to that step
  $('cv').addEventListener('click', (ev) => {
    if (S.mode !== 'arena' || !lastLatticeHitBoxes.length) return;
    const rect = $('cv').getBoundingClientRect();
    const px = ev.clientX - rect.left, py = ev.clientY - rect.top;
    for (const h of lastLatticeHitBoxes) {
      if (Math.hypot(px - h.px, py - h.py) <= h.r) {
        stopAt = null;
        clock.pause();
        cards.mark(null);
        clock.set(h.k);
        return;
      }
    }
  });

  kit.keys({
    1: () => { S.scene = 'duo'; sceneChips.set('duo', true); leave(); paint(); },
    2: () => { S.scene = 'lattice'; sceneChips.set('lattice', true); leave(); paint(); },
    3: () => { S.scene = 'ledger'; sceneChips.set('ledger', true); leave(); paint(); },
    m: () => {
      const nxt = S.mode === 'arena' ? 'marginal' : 'arena';
      S.mode = nxt;
      modeChips.set(nxt, true);
      leave();
      paint();
    },
    l: () => {
      S.mask ^= (1 << 3); // toggle 4-body parity L₄
      if (S.mode !== 'arena') { S.mode = 'arena'; modeChips.set('arena', true); }
      leave();
      paint();
    }
  });

  /* ---------- 6 Citable Experiment Cards ---------- */
  const CARDS = {
    hilbert: { scene: 'duo', mode: 'arena', mask: 0b11111, qState: 'bell', cutK: 0, rate: 'golden', still: 6, to: 16 },
    novelty: { scene: 'duo', mode: 'arena', mask: 0b01111, qState: 'bell', cutK: 0, rate: 'golden', still: 6, to: 12 },
    escape: { scene: 'duo', mode: 'arena', mask: 0b00111, qState: 'bell', cutK: 1, rate: 'golden', still: 5, to: 13 },
    marginal: { scene: 'duo', mode: 'marginal', mask: 0b00111, qState: 'bell', cutK: 0, rate: 'golden', still: 8, to: 12 },
    zeckendorf: { scene: 'duo', mode: 'arena', mask: 0b01111, qState: 'bell', cutK: 4, rate: 'golden', still: 14, to: 16 },
    dream: { scene: 'duo', mode: 'arena', mask: 0b00011, qState: 'bell', cutK: 4, rate: 'dottie', still: 10, to: 16 }
  };

  const NOTES = {
    hilbert: [
      '闭合 4×4 Moore/Hilbert 哈密顿回路（16 步每步曼哈顿距离 d_in = d_out = 1，#15 闭合回 #00）：五条引理 {L₁…L₅} 全开时 16 个原像纤维均为单点集，逃逸弦 0 条，H₂^escape = 0.000 bits，且右栏直接标出派生引理 L₅ = b₀⊕b₁ 的唯一捕获数为 0。',
      'Closed 4×4 Hamiltonian Moore/Hilbert loop (all 16 steps have unit grid distance d_in = d_out = 1, closing #15 → #00): with all five lemmas {L₁…L₅} ON, all 16 preimage fibers are singletons, 0 escape chords appear, H₂^escape = 0.000 bits, and derived L₅ = b₀⊕b₁ already shows 0 unique-capture chords.'
    ],
    novelty: [
      '关掉派生冗余引理 L₅ = b₀⊕b₁（保留 {L₁, L₂, L₃, L₄}）：因 L₅ 属于 {L₁, L₂} 的语义闭包，其唯一捕获对集为空（uniqueCapturePairs = ∅，StructuralNovelty = 0），逃逸弦仍为 0 条，实现从 5 引理到 4 引理极小基的无损压缩！',
      'Toggling redundant L₅ = b₀⊕b₁ OFF while {L₁, L₂, L₃, L₄} stay ON: since L₅ lies in the semantic closure of {L₁, L₂}, uniqueCapturePairs = ∅ (StructuralNovelty = 0) and 0 escape chords appear—lossless compression to an irredundant 4-lemma basis!'
    ],
    escape: [
      '关掉四体全局异或引理 L₄ = b₀⊕b₁⊕b₂⊕b₃（仅留单比特坐标 {L₁, L₂, L₃}）：8 对纤维瞬间合并为大小 2，跨晶格弹出恰好 8 条无序品红/紫逃逸弦（16 个有序逃逸对），H₂^escape 跃升至 1.000 bit，而全部四个单比特边缘仍保持均匀 0.50！',
      'Turning 4-body parity L₄ = b₀⊕b₁⊕b₂⊕b₃ OFF while {L₁, L₂, L₃} stay ON merges into 8 size-2 fibers, popping exactly 8 unordered cross-lattice magenta/violet escape chords (16 ordered pairs) and raising H₂^escape to 1.000 bit while every single-bit marginal stays 0.50!'
    ],
    marginal: [
      '切换到量子二体边缘盲区模式：贝尔纯态 |Φ⁺⟩⟨Φ⁺| 与经典关联混态 ρ_cl 及最大混合态 ¼I₄ 共享完全相同的单比特偏迹边缘 ½I₂，而 15 维无迹空间中占 9/15 = 60% 的正交关联扇区对一切纯局域边缘观测彻底隐身。',
      'In quantum local-marginal mode: Bell |Φ⁺⟩⟨Φ⁺|, classical correlated ρ_cl, and maximally mixed ¼I₄ share identical ½I₂ single-qubit marginals, while 9/15 = 60% of the 15D traceless space lies inside the orthogonal correlation sector invisible to local marginals.'
    ],
    zeckendorf: [
      '沿闭合回路施加齐肯多夫无邻 1 约束（w_t·w_{t+1} = 0）：信道容量从 1.000 bit 降至 log₂φ ≈ 0.69424 bits/symbol（支付 0.30576 bits 稳定税，Parry 平稳 1 密度 p₁ ≈ 0.2764），避碰 14 比特块 B₁ 受 LEAN ✓ 界严格包络，在基准模型线 log₂ μ = −k·log₂φ 上卸载 Δk = 4 层，柱集测度回弹 2^(4·log₂φ) ≈ 6.85 倍（MODEL；SMB 只给出 o(k) 误差内的渐近斜率）。',
      'Enforcing the Zeckendorf no-adjacent-ones rule (w_t·w_{t+1} = 0) lowers capacity from 1.000 to log₂φ ≈ 0.69424 bits/symbol (0.30576-bit stability tax; Parry p₁ ≈ 0.2764), bounded non-asymptotically by the frozen 14-bit B₁ avoidance theorem, with Δk = 4 rebounding cylinder measure by 2^(4·log₂φ) ≈ 6.85× on the benchmark line log₂ μ = −k·log₂φ (MODEL; SMB gives only the asymptotic slope up to o(k)).'
    ],
    dream: [
      '对比两类记忆减负路径：清醒第 5 阶段丢弃正交记录并把 2 比特排入热浴，至少支付兰道尔热 βΔQ = 2 ln 2 ≈ 1.386 nats；梦境第 4 阶段保留记录相干访问并施加伴随逆演 U_copy†，以零热耗散（ΔQ = 0）恢复相干并按 −log₂sin θ* ≈ 0.570b/步回弹柱集测度 ×4.86。',
      'Contrasting two constraint-release routes: Awake Stage-5 discards record coherence into a bath, paying Landauer heat βΔQ ≥ 2 ln 2 ≈ 1.386 nats; Dream Stage-4 retains record access and applies adjoint U_copy† for zero-heat recoherence (ΔQ = 0), rebounding cylinder measure by 2^(4·0.570) ≈ 4.86×.'
    ]
  };

  let booting = true;
  function applyPreset(id) {
    const c = CARDS[id];
    if (!c) return;
    stopAt = null;
    S.scene = c.scene; sceneChips.set(c.scene, true);
    S.mode = c.mode; modeChips.set(c.mode, true);
    S.mask = c.mask;
    S.qState = c.qState; qStateChips.set(c.qState, true);
    S.cutK = c.cutK; fCutK.set(c.cutK);
    S.rateKind = c.rate; rateChips.set(c.rate, true);
    clock.pause();
    if (TRV.still || (booting && !TRV.embed)) {
      clock.set(c.still);
      paint();
      return;
    }
    clock.set(0, true);
    stopAt = c.to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
    paint();
  }

  const cards = kit.cards($('presets'), {
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: [
      '自由探索：点击 L₁…L₅ 检验全部 32 种商核的逃逸弦与唯一捕获数，拖动 Δk 观察柱集回弹，或切换贝尔边缘盲区。',
      'Free play: toggle L₁…L₅ across all 32 quotient kernels to inspect escape chords and unique-capture counts, drag Δk for cylinder rebound, or switch to the Bell marginal blind spot.'
    ]
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.LEDGER_DEBUG = {
    get state() {
      const info = MASK_TABLE[S.mask];
      return {
        scene: S.scene,
        mode: S.mode,
        mask: S.mask,
        qState: S.qState,
        cutK: S.cutK,
        rateKind: S.rateKind,
        preset: cards.current,
        t: clock.t,
        step: stepIdx(),
        ptrStep: activeLoopStep(),
        playing: clock.playing,
        stacked: lastStacked,
        phi: PHI,
        log2Phi: LOG2_PHI,
        stabilityTax: STABILITY_TAX,
        parryP1: PARRY_P1,
        parryP0: PARRY_P0,
        thetaStar: THETA_STAR,
        sinThetaStar: SIN_THETA_STAR,
        rateDottie: RATE_DOTTIE,
        loopStates: STATES.map((s) => ({ stepIdx: s.stepIdx, x: s.x, y: s.y, bitStr: s.bitStr, stateId: s.stateId, dIn: s.dIn, dOut: s.dOut, lemmas: s.lemmas.slice(), zBit: s.zBit })),
        currentAnalysis: {
          fiberCount: info.fiberCount,
          chordCount: info.chordCount,
          orderedEscapeCount: info.orderedEscapeCount,
          sumFiberSq: info.sumFiberSq,
          escapeRate: info.escapeRate,
          h2Escape: info.h2Escape,
          iLedger: info.iLedger,
          hTotal: info.hTotal,
          impurityState: info.impurityState,
          impurityParity: info.impurityParity,
          uniqueCapture: info.uniqueCapture.map((u) => Object.assign({}, u))
        },
        allMasks: MASK_TABLE.map((m) => ({
          mask: m.mask,
          fiberCount: m.fiberCount,
          chordCount: m.chordCount,
          orderedEscapeCount: m.orderedEscapeCount,
          sumFiberSq: m.sumFiberSq,
          escapeRate: m.escapeRate,
          h2Escape: m.h2Escape,
          iLedger: m.iLedger,
          hTotal: m.hTotal,
          impurityState: m.impurityState,
          impurityParity: m.impurityParity,
          uniqueCapture: m.uniqueCapture.map((u) => Object.assign({}, u))
        })),
        avoidSeries: AVOID_SERIES.slice(),
        qStates: {
          bell: marginalsOf4x4(Q_STATES.bell.mat),
          classical: marginalsOf4x4(Q_STATES.classical.mat),
          mix: marginalsOf4x4(Q_STATES.mix.mat)
        }
      };
    },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); paint.now(); },
    setMask: (m) => { S.mask = m & 31; S.mode = 'arena'; modeChips.set('arena', true); leave(); paint.now(); }
  };

  window.TRV_THUMB = () => {
    stopAt = null;
    S.scene = 'duo'; sceneChips.set('duo', true);
    S.mode = 'arena'; modeChips.set('arena', true);
    S.mask = 0b00111; // show the dramatic 8 cross-lattice magenta/violet escape chords on the closed Hilbert loop!
    S.cutK = 4; fCutK.set(4);
    S.rateKind = 'golden'; rateChips.set('golden', true);
    clock.pause();
    clock.set(5, true);
    paint.now();
  };

  cards.pick(cards.initial('hilbert'));
  booting = false;
  paint();
})();
