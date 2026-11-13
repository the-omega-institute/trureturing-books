/* ORTHO//LOOKUP · 查表退化阶梯: progressive 7-stage degradation (d = 0..6) of a hypothetical P=NP lookup oracle
   and the spacetime–gravity trade-off phase diagram σ = (log₂ S)/n vs r_eff(σ) = (log₂ T)/n.
     duo     Left: physical lookup routing morphology at active stage d ∈ {0..6} (or 7-rung cascade in ladder sweep).
             Right: spacetime–gravity phase diagram σ ∈ [0, 1] vs r_eff(σ) ∈ [0, 1] with draggable σ cursor.
     morph   Full-stage physical routing morphology for the active degradation stage d.
     phase   Full-stage spacetime–gravity trade-off phase diagram with multi-curve envelope inspection.
   Zero hardcoded hex colours; --ok green reserved for Lean badges, --warn red reserved for OPEN P≠NP, --amber reserved
   for live active (d, σ) state and active probe. Probe: window.LOOKUP_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, TAU } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const SUB = '₀₁₂₃₄₅₆₇₈₉', sub = (n) => String(n).split('').map((d) => SUB[+d] || d).join('');
  const font = (px, face, weight) => `${weight || 400} ${px}px ${face === 'body' ? TRV.fonts.body : face === 'display' ? TRV.fonts.display : TRV.fonts.data}`;

  /* ---------- Exact Fibonacci & Canonical Zeckendorf Arithmetic (Stage d=2) ---------- */
  const FIB = [0, 1];
  for (let i = 2; i <= 24; i++) FIB.push(FIB[i - 1] + FIB[i - 2]);

  function wdigits(n) {
    let rem = Math.max(0, Math.floor(n));
    const out = [];
    for (let k = FIB.length - 1; k >= 2 && rem > 0; k--) {
      if (FIB[k] <= rem) {
        out.push(k);
        rem -= FIB[k];
        k--; // canonical non-adjacency
      }
    }
    return out;
  }

  function isCanonicalZeck(list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] < 2) return false;
      if (i > 0 && list[i - 1] < list[i] + 2) return false;
    }
    return true;
  }

  // Exact integer instance saturating lower_support_carry_barrier AND displaying Frougny upward carry cascade:
  // P = [16, 14, 12, 10, 8] (m = 8 >= 4, sum = 1584), add F_j with j = 8 >= m - 1 (F_8 = 21) -> N = 1605 = F_17 + F_6.
  const ZECK_DEMO = (() => {
    const Plist = [16, 14, 12, 10, 8], m = 8, j = 8;
    const sumP = Plist.reduce((a, k) => a + FIB[k], 0);
    const total = sumP + FIB[j];
    const canonical = wdigits(total); // [17, 6]
    const steps = [
      { multiset: [16, 14, 12, 10, 8, 8], rule: ['初始碰撞 F₈ + F₈', 'initial collision F₈ + F₈'], active: 8, low: 8 },
      { multiset: [16, 14, 12, 10, 9, 6], rule: ['2F₈ = F₉ + F₆（触达下界 m−2 = 6）', '2F₈ = F₉ + F₆ (hits floor m−2 = 6)'], active: 9, low: 6 },
      { multiset: [16, 14, 12, 11, 6], rule: ['F₁₀ + F₉ = F₁₁（进位上行）', 'F₁₀ + F₉ = F₁₁ (upward carry)'], active: 11, low: 6 },
      { multiset: [16, 14, 13, 6], rule: ['F₁₂ + F₁₁ = F₁₃（进位上行）', 'F₁₂ + F₁₁ = F₁₃ (upward carry)'], active: 13, low: 6 },
      { multiset: [16, 15, 6], rule: ['F₁₄ + F₁₃ = F₁₅（进位上行）', 'F₁₄ + F₁₃ = F₁₅ (upward carry)'], active: 15, low: 6 },
      { multiset: [17, 6], rule: ['F₁₆ + F₁₅ = F₁₇（规范态 1597 + 8 = 1605）', 'F₁₆ + F₁₅ = F₁₇ (canonical 1597 + 8 = 1605)'], active: 17, low: 6 }
    ];
    // Batch audit of lower_support_carry_barrier across representative canonical inputs
    const cases = [
      { P: [], m: 4, j: 3 },
      { P: [6], m: 6, j: 6 },
      { P: [10, 6], m: 6, j: 5 },
      { P: [12, 10, 8], m: 8, j: 8 },
      { P: [16, 14, 12, 10, 8], m: 8, j: 8 },
      { P: [15, 12, 9], m: 9, j: 8 }
    ].map((c) => {
      const val = c.P.reduce((a, k) => a + FIB[k], 0) + FIB[c.j];
      const w = wdigits(val);
      const minIdx = Math.min(...w);
      return { ...c, val, wdigits: w, minIdx, barrierFloor: c.m - 2, ok: isCanonicalZeck(c.P) && isCanonicalZeck(w) && minIdx >= c.m - 2 };
    });
    return { Plist, m, j, sumP, addF: FIB[j], total, canonical, steps, barrierCases: cases };
  })();

  /* ---------- Complexity & Holographic Trade-Off Constants ---------- */
  const R_PPSZ = Math.log2(1.307); // ≈ 0.386258
  const R_QBT = R_PPSZ / 2;        // ≈ 0.193129 (structured quantum backtracking / Grover-PPSZ)
  // Illustrative subexponential 3-SAT benchmark slice c * log2(log2 n) / sqrt(log2 n) at c = 0.24, log2 n = 100 (MODEL under audit)
  const R_TN_BENCH = (0.24 * Math.log2(100)) / Math.sqrt(100); // ≈ 0.15945

  const STAGES = [
    {
      d: 0, code: 'ORACLE',
      short: ['全息自指预言机', 'Self-ref oracle'],
      title: ['d=0 · 全息自指预言机 T = T(T) / p = *p', 'd=0 · Holographic oracle T = T(T) / p = *p'],
      limiter: ['尚未施加物理限制（双向量相消 + 零号槽自映射）', 'Unconstrained prototype (+Ω−Ω=0 + Slot [0,0] self-map)'],
      defSigma: 0
    },
    {
      d: 1, code: 'ADVICE',
      short: ['静态只读建议表', 'Static advice aₙ'],
      title: ['d=1 · 静态只读建议表 aₙ（|Tₙ| = poly(n)）', 'd=1 · Static read-only advice aₙ (|Tₙ| = poly(n))'],
      limiter: ['切断零号槽自生成：域内零损失，跨 n→n+1 视界失效', 'Severed T[0] self-loop: L_retro=0 on ≤n, fails at n→n+1'],
      defSigma: 0.04
    },
    {
      d: 2, code: 'ZECKENDORF',
      short: ['局部张量与进位波', 'Local blocks & carry'],
      title: ['d=2 · 局部张量块与齐肯多夫进位自动机', 'd=2 · Local tensor blocks & Zeckendorf carry automaton'],
      limiter: ['下穿锁死于 m−2，向上 Frougny 进位波催生串行因果时间', 'Floor locked at m−2; upward Frougny carry births serial time'],
      defSigma: 0.08
    },
    {
      d: 3, code: 'BEKENSTEIN',
      short: ['引力全息巨表', 'Holographic table'],
      title: ['d=3 · 物理巨表 S = 2^{σn}（光锥与全息熵界）', 'd=3 · Physical table S = 2^{σn} (light-cone & holographic bound)'],
      limiter: ['MODEL 包络：全息装球 R ∝ 2^{σn/2}，流水线 max(1−σ, σ/2) ≥ 1/3（σ*=2/3）', 'MODEL envelope: holographic ball R ∝ 2^{σn/2}; pipelined max(1−σ, σ/2) ≥ 1/3 at σ*=2/3'],
      defSigma: 2 / 3
    },
    {
      d: 4, code: 'GROVER',
      short: ['二维量子叠加指针', '2D quantum pointer'],
      title: ['d=4 · 二维相干量子叠加指针 ∑ αₓ|x⟩', 'd=4 · 2D coherent quantum pointer ∑ αₓ|x⟩'],
      limiter: ['MODEL 包络 r_Q = (1−σ)/2：σ=0 处 Grover r=0.500 与 σ=1 线延迟相等', 'MODEL envelope r_Q = (1−σ)/2: Grover r=0.500 at σ=0 equals the σ=1 wire delay'],
      defSigma: 0
    },
    {
      d: 5, code: 'LANDAUER',
      short: ['一维经典回溯指针', '1D classical *ptr'],
      title: ['d=5 · 一维退相干指针 *ptr 与冲突快表 TLB', 'd=5 · 1D decohered *ptr & conflict cache TLB'],
      limiter: ['MODEL 包络 r = 1−σ（σ=0 时 3-SAT 取 PPSZ 上界 0.386）+ 兰道尔热 k_B T ln 2', 'MODEL envelope r = 1−σ (PPSZ upper bound 0.386 for 3-SAT at σ=0) + Landauer heat k_B T ln 2'],
      defSigma: 0.12
    },
    {
      d: 6, code: 'TABULA',
      short: ['无记忆盲搜初态', 'Memoryless blind'],
      title: ['d=6 · 无记忆马尔可夫盲搜（|T|=0, σ=0, M=0）', 'd=6 · Memoryless Markovian search (|T|=0, σ=0, M=0)'],
      limiter: ['清空全部记忆缓存：Θ(2ⁿ) 盲搜，张开最大格拉姆选择体积', 'Zero cache M=0: Θ(2ⁿ) blind trials, maximal open Gram volume'],
      defSigma: 0
    }
  ];

  /* ---------- Exact Phase-Diagram Curves ---------- */
  function baseSearchRate(regime) {
    return regime === 'sat3' ? R_PPSZ : 1;
  }
  function rRamCurve(sig, regime) {
    return baseSearchRate(regime) * (1 - clamp(sig, 0, 1));
  }
  function rWireCurve(sig) {
    return 0.5 * clamp(sig, 0, 1);
  }
  function rSerialCurve(sig, regime) {
    const s = clamp(sig, 0, 1);
    return regime === 'sat3' ? R_PPSZ * (1 - s) + 0.5 * s : 1 - 0.5 * s;
  }
  function rPipeCurve(sig, regime) {
    const s = clamp(sig, 0, 1);
    return Math.max(rRamCurve(s, regime), rWireCurve(s));
  }
  function rQuantumCurve(sig, regime) {
    const s = clamp(sig, 0, 1);
    return (regime === 'sat3' ? R_QBT : 0.5) * (1 - s);
  }
  function holoOptimum(regime) {
    const b = baseSearchRate(regime);
    const sigStar = (2 * b) / (2 * b + 1); // 2/3 for blackbox (b=1), ~0.4358 for sat3
    return { sigma: sigStar, r: sigStar / 2 };
  }

  function evalStage(d, rawSigma, regime, wire) {
    const s = clamp(rawSigma, 0, 1);
    if (d === 0) {
      return { d: 0, effSigma: 0, rEff: 0, rAlt: 0, noteTag: 'p = *p · r = 0' };
    }
    if (d === 1) {
      const rOut = rRamCurve(s, regime);
      return { d: 1, effSigma: s, rEff: 0, rHorizon: rOut, noteTag: `≤n: 0 → n+1: ${fix(rOut, 3)}` };
    }
    if (d === 2) {
      const rEff = regime === 'sat3'
        ? Math.min(R_TN_BENCH, rRamCurve(s, 'sat3'))
        : Math.min(R_TN_BENCH + 0.04 * (1 - s), rPipeCurve(s, 'blackbox'));
      return { d: 2, effSigma: s, rEff, rAlt: rPipeCurve(s, regime), noteTag: `m−2=6 · r≈${fix(rEff, 3)}` };
    }
    if (d === 3) {
      const rPipe = rPipeCurve(s, regime);
      const rSer = rSerialCurve(s, regime);
      const rEff = wire === 'serial' ? rSer : rPipe;
      return { d: 3, effSigma: s, rEff, rPipe, rSer, rWire: rWireCurve(s), noteTag: wire === 'serial' ? 'MODEL 1 − σ/2' : 'MODEL max(1−σ, σ/2)' };
    }
    if (d === 4) {
      const rEff = rQuantumCurve(s, regime);
      return { d: 4, effSigma: s, rEff, rAlt: rWireCurve(1), noteTag: regime === 'sat3' ? 'MODEL 0.193(1 − σ)' : 'MODEL (1 − σ)/2' };
    }
    if (d === 5) {
      const rEff = rRamCurve(s, regime);
      return { d: 5, effSigma: s, rEff, rAlt: s, noteTag: regime === 'sat3' ? 'MODEL PPSZ · (1−σ)' : 'MODEL 1 − σ' };
    }
    return { d: 6, effSigma: 0, rEff: 1, rAlt: 1, noteTag: '|T|=0 · M=0 · r=1' };
  }

  // Canonical benchmark point for each rung d = 0..6 (used on Plot A staircase & ladder trajectory)
  function rungPoint(d, regime, wire) {
    const sig = d === 3 ? holoOptimum(regime).sigma : STAGES[d].defSigma;
    return evalStage(d, sig, regime, wire);
  }

  /* ---------- Interactive State ---------- */
  const S = {
    scene: 'duo',
    d: 3,
    sweep: false,
    sigma: 2 / 3,
    regime: 'blackbox',
    wire: 'pipelined'
  };
  const TMAX = 6;
  const SC = {
    duo: { name: ['双栏', 'TWIN'] },
    morph: { name: ['路由', 'ROUTING'] },
    phase: { name: ['相图', 'PHASE'] }
  };

  function activeStage() {
    return S.sweep ? clamp(Math.round(clock.t), 0, 6) : S.d;
  }
  function activeSigma() {
    if (S.sweep) {
      const d = activeStage();
      return d === 3 ? holoOptimum(S.regime).sigma : STAGES[d].defSigma;
    }
    if (S.d === 0 || S.d === 6) return 0;
    return S.sigma;
  }

  let lastPhaseBox = null;
  let lastStacked = false;

  /* ---------- Drawing Helpers ---------- */
  function subBox(rect, pad) {
    const [pl, pr, pt, pb] = pad;
    return {
      bx: rect.x + pl,
      by: rect.y + pt,
      bw: Math.max(24, rect.w - pl - pr),
      bh: Math.max(24, rect.h - pt - pb)
    };
  }

  function drawArrow(ctx, x1, y1, x2, y2, color, width, lw, headSz) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 0.5) return;
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width * lw;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (headSz && len > 7) {
      const h = Math.min(headSz * lw, len * 0.45), ux = dx / len, uy = dy / len;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - ux * h - uy * h * 0.44, y2 - uy * h + ux * h * 0.44);
      ctx.lineTo(x2 - ux * h + uy * h * 0.44, y2 - uy * h - ux * h * 0.44);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawPanelFrame(ctx, B, lw, titleZh, titleEn, accent) {
    ctx.strokeStyle = accent ? TRV.alpha(accent, 0.52) : P.panelEdge;
    ctx.lineWidth = 1.1 * lw;
    ctx.strokeRect(B.bx, B.by, B.bw, B.bh);
    if (!TRV.thumbMode && titleZh) {
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(L(titleZh, titleEn), B.bx + 2, B.by - 5);
    }
  }

  /* ---------- Left Panel: Physical Lookup Routing Morphology (d = 0..6 & Ladder) ---------- */
  function drawMorphPanel(ctx, rect, lw, showSubTitle) {
    const pad = TRV.thumbMode ? [14, 14, 14, 14] : [14, 14, showSubTitle ? 22 : 10, 14];
    const B = subBox(rect, pad);
    const d = activeStage();
    const u = clamp(clock.t / TMAX, 0, 1);

    ctx.save();
    drawPanelFrame(
      ctx, B, lw,
      showSubTitle ? (S.sweep ? '七阶查表退化与生命逆向建表' : `物理查表路由形态 · d = ${d}`) : '',
      showSubTitle ? (S.sweep ? '7-stage cascade & life table-building' : `Physical lookup routing · d = ${d}`) : ''
    );
    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.clip();

    if (S.sweep) {
      drawLadderCascade(ctx, B, lw, d, clock.t);
    } else if (d === 0) {
      drawMorphD0(ctx, B, lw, u);
    } else if (d === 1) {
      drawMorphD1(ctx, B, lw, u);
    } else if (d === 2) {
      drawMorphD2(ctx, B, lw, clock.t);
    } else if (d === 3) {
      drawMorphD3(ctx, B, lw, u, activeSigma());
    } else if (d === 4) {
      drawMorphD4(ctx, B, lw, u, activeSigma());
    } else if (d === 5) {
      drawMorphD5(ctx, B, lw, u, activeSigma());
    } else {
      drawMorphD6(ctx, B, lw, u);
    }
    ctx.restore();
  }

  // d = 0: 4x4 holographic crystal, Slot [0,0] self-loop p = *p, bivector +Ω/-Ω pair cancellation, unique x* = T[Φ]
  function drawMorphD0(ctx, B, lw, u) {
    const side = Math.min(B.bw * 0.72, B.bh * 0.70);
    const gx = B.bx + (B.bw - side) * 0.52, gy = B.by + (B.bh - side) * 0.56;
    const step = side / 4;
    const cancelAmp = Math.max(0.08, Math.cos(u * Math.PI * 0.46)); // fades non-solutions toward 0 as u -> 1
    const solIdx = 10; // row 2, col 2 -> x* = 1010_2

    // Associative broadcast rays from Slot [0,0] to lattice
    const c0x = gx + step * 0.5, c0y = gy + step * 0.5;
    const csx = gx + (solIdx % 4 + 0.5) * step, csy = gy + (Math.floor(solIdx / 4) + 0.5) * step;

    for (let idx = 0; idx < 16; idx++) {
      const r = Math.floor(idx / 4), c = idx % 4;
      const cx = gx + (c + 0.5) * step, cy = gy + (r + 0.5) * step;
      const cw = step * 0.78;
      const isZero = idx === 0, isSol = idx === solIdx;

      ctx.fillStyle = isSol
        ? TRV.alpha(P.cyan, 0.20)
        : isZero
          ? TRV.alpha(P.violet, 0.16)
          : TRV.alpha(P.panelEdge, 0.26 * cancelAmp);
      ctx.strokeStyle = isSol ? P.cyan : isZero ? P.violet : TRV.alpha(P.dim, 0.35 + 0.35 * cancelAmp);
      ctx.lineWidth = (isSol || isZero ? 1.8 : 1.0) * lw;
      ctx.fillRect(cx - cw / 2, cy - cw / 2, cw, cw);
      ctx.strokeRect(cx - cw / 2, cy - cw / 2, cw, cw);

      if (!isZero && !isSol) {
        // Opposite bivector chirality arcs +Ω / −Ω cancelling in pairs
        const sgn = (r + c) % 2 === 0 ? 1 : -1;
        const rad = cw * 0.25;
        ctx.strokeStyle = TRV.alpha(P.magenta, 0.22 + 0.62 * cancelAmp);
        ctx.lineWidth = 1.4 * lw;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0.25, Math.PI * 1.55);
        ctx.stroke();
        if (!TRV.thumbMode && step > 34) {
          ctx.font = font(9, 'data', 600);
          ctx.fillStyle = TRV.alpha(P.magenta, 0.35 + 0.55 * cancelAmp);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(sgn > 0 ? '+Ω' : '−Ω', cx, cy);
        }
      }
    }

    // Slot [0,0] self-referential loop p = *p
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2.0 * lw;
    ctx.beginPath();
    ctx.arc(c0x - step * 0.28, c0y - step * 0.28, step * 0.32, Math.PI * 0.15, Math.PI * 1.82);
    ctx.stroke();
    ctx.fillStyle = P.cyan;
    ctx.beginPath();
    ctx.arc(c0x, c0y, 3.3 * lw, 0, TAU);
    ctx.fill();

    // Direct zero-latency projection ray [0,0] -> x* = T[Φ]
    drawArrow(ctx, c0x + 4 * lw, c0y + 4 * lw, csx - 6 * lw, csy - 6 * lw, P.cyan, 2.1, lw, 7);

    // Fixed-point ring + live amber lock on x* = T[Φ]
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2.0 * lw;
    ctx.beginPath();
    ctx.arc(csx, csy, step * 0.28, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = P.amber;
    ctx.beginPath();
    ctx.arc(csx, csy, 4.5 * lw, 0, TAU);
    ctx.fill();

    if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.cyan;
      ctx.fillText('Slot [0,0]: p = *p  (T = T(T))', B.bx + 8, B.by + 6);
      ctx.fillStyle = P.magenta;
      ctx.fillText(L(`手性对相消 (+Ω − Ω → 0): 残余 ${fix(cancelAmp * 100, 0)}%`, `Chirality cancel (+Ω − Ω → 0): rem ${fix(cancelAmp * 100, 0)}%`), B.bx + 8, B.by + 20);
      ctx.fillStyle = P.amber;
      ctx.textBaseline = 'bottom';
      ctx.fillText('x* = T[Φ] · r_eff = 0.000', B.bx + 8, B.by + B.bh - 6);
    }
  }

  // d = 1: Static advice a_n (|T_n| = poly(n)): T[0] loop severed, L_retro = 0 inside <= n, magenta wall at n -> n+1
  function drawMorphD1(ctx, B, lw, u) {
    const wallX = B.bx + B.bw * 0.60;
    const topY = B.by + 36, botY = B.by + B.bh - 28;
    const midY = (topY + botY) / 2;

    // Left frozen domain <= n
    ctx.fillStyle = TRV.alpha(P.cyan, 0.07);
    ctx.fillRect(B.bx + 10, topY, wallX - B.bx - 14, botY - topY);
    ctx.strokeStyle = TRV.alpha(P.cyan, 0.45);
    ctx.lineWidth = 1.2 * lw;
    ctx.strokeRect(B.bx + 10, topY, wallX - B.bx - 14, botY - topY);

    // Right unindexed future domain n + 1, n + 2, ...
    ctx.fillStyle = TRV.alpha(P.magenta, 0.06);
    ctx.fillRect(wallX + 4, topY, B.bx + B.bw - wallX - 14, botY - topY);

    // Severed Slot [0,0] self-loop at top-left
    const sx = B.bx + 34, sy = topY + 24;
    ctx.strokeStyle = P.dim;
    ctx.setLineDash([3 * lw, 3 * lw]);
    ctx.lineWidth = 1.5 * lw;
    ctx.beginPath();
    ctx.arc(sx, sy, 12 * lw, 0.4, Math.PI * 1.75);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = P.magenta;
    ctx.lineWidth = 2.0 * lw;
    ctx.beginPath();
    ctx.moveTo(sx - 6 * lw, sy - 6 * lw); ctx.lineTo(sx + 6 * lw, sy + 6 * lw);
    ctx.moveTo(sx + 6 * lw, sy - 6 * lw); ctx.lineTo(sx - 6 * lw, sy + 6 * lw);
    ctx.stroke();

    // Pre-baked advice rows inside <= n
    const rows = 4;
    for (let i = 0; i < rows; i++) {
      const ry = topY + 48 + ((botY - topY - 62) * i) / Math.max(1, rows - 1);
      const rx0 = B.bx + 24, rx1 = wallX - 18;
      ctx.strokeStyle = P.cyan;
      ctx.lineWidth = 1.8 * lw;
      ctx.beginPath();
      ctx.moveTo(rx0, ry);
      ctx.lineTo(rx1, ry);
      ctx.stroke();
      ctx.fillStyle = P.cyan;
      ctx.beginPath();
      ctx.arc(rx1, ry, 3 * lw, 0, TAU);
      ctx.fill();
    }

    // Non-anticipating horizon wall at n -> n + 1
    ctx.strokeStyle = P.magenta;
    ctx.lineWidth = 2.6 * lw;
    ctx.beginPath();
    ctx.moveTo(wallX, topY - 4);
    ctx.lineTo(wallX, botY + 4);
    ctx.stroke();

    // Unindexed query probe advancing with u from left into the n -> n + 1 wall
    const probeX = B.bx + 26 + (B.bw - 52) * clamp(u * 0.92, 0, 0.92);
    const blocked = probeX >= wallX - 4;
    const clampedX = blocked ? wallX - 5 * lw : probeX;
    drawArrow(ctx, B.bx + 22, midY, clampedX, midY, P.amber, 2.2, lw, 7);
    ctx.fillStyle = P.amber;
    ctx.beginPath();
    ctx.arc(clampedX, midY, 4.4 * lw, 0, TAU);
    ctx.fill();

    // Unresolved exponential fan beyond wallX
    for (let j = -2; j <= 2; j++) {
      const ty = midY + j * ((botY - topY) * 0.16);
      ctx.strokeStyle = TRV.alpha(P.magenta, blocked ? 0.72 : 0.34);
      ctx.setLineDash([4 * lw, 3 * lw]);
      ctx.lineWidth = 1.3 * lw;
      ctx.beginPath();
      ctx.moveTo(wallX + 4, midY);
      ctx.lineTo(B.bx + B.bw - 20, ty);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.cyan;
      ctx.fillText(L('已冻结域 |x| ≤ n: L_retro = 0', 'Frozen |x| ≤ n: L_retro = 0'), B.bx + 12, B.by + 6);
      ctx.fillStyle = P.magenta;
      ctx.fillText(L('越界 n → n+1: ¬NonAnticipating', 'Horizon n → n+1: ¬NonAnticipating'), B.bx + 12, B.by + 20);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = P.dim;
      ctx.fillText('Karp–Lipton: NP ⊆ P/poly ⇒ PH = Σ₂ᵖ ∩ Π₂ᵖ', B.bx + B.bw - 10, B.by + B.bh - 6);
    }
  }

  // d = 2: Local 3-body tensor blocks + exact Zeckendorf carry strip (m-2=6 floor vs Frougny upward carry wave)
  function drawMorphD2(ctx, B, lw, t) {
    const idx = clamp(Math.floor(t + 1e-9), 0, ZECK_DEMO.steps.length - 1);
    const st = ZECK_DEMO.steps[idx];

    // Top band: local 3-body tensor blocks merging with carry bridge
    const topH = Math.max(46, B.bh * 0.28);
    const ty = B.by + 30 + topH * 0.42;
    const nBlk = 4;
    for (let b = 0; b < nBlk; b++) {
      const bx = B.bx + 22 + ((B.bw - 44) * (b + 0.5)) / nBlk;
      const bw = Math.min(46 * lw, (B.bw - 70) / nBlk);
      ctx.fillStyle = TRV.alpha(P.violet, 0.16);
      ctx.strokeStyle = P.violet;
      ctx.lineWidth = 1.5 * lw;
      ctx.fillRect(bx - bw / 2, ty - 13 * lw, bw, 26 * lw);
      ctx.strokeRect(bx - bw / 2, ty - 13 * lw, bw, 26 * lw);
      if (!TRV.thumbMode && bw > 28) {
        ctx.font = font(9, 'data', 600);
        ctx.fillStyle = P.ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`T${sub(b + 1)}`, bx, ty);
      }
      if (b < nBlk - 1) {
        const nx = B.bx + 22 + ((B.bw - 44) * (b + 1.5)) / nBlk;
        drawArrow(ctx, bx + bw / 2 + 2, ty, nx - bw / 2 - 2, ty, P.magenta, 1.5, lw, 5);
      }
    }

    // Bottom band: exact Zeckendorf register k = 2 .. 17 for 1584 + 21 = 1605
    const kMin = 2, kMax = 17, cols = kMax - kMin + 1;
    const stripX = B.bx + 12, stripW = B.bw - 24;
    const cw = stripW / cols;
    const sy = B.by + B.bh * 0.64, ch = Math.min(34 * lw, B.bh * 0.20);

    // Count multiplicities in current carry step
    const counts = new Map();
    for (const k of st.multiset) counts.set(k, (counts.get(k) || 0) + 1);

    for (let k = kMin; k <= kMax; k++) {
      // Put high index on left or low index on left? Let's put low index k=2 on left -> k=17 on right so "upward carry" moves left-to-right ->!
      const col = k - kMin;
      const cx = stripX + col * cw;
      const cnt = counts.get(k) || 0;
      const isProtected = k < ZECK_DEMO.m - 2; // k ∈ {2,3,4,5} strictly untouched!
      const isActive = k === st.active;

      ctx.fillStyle = isActive
        ? TRV.alpha(P.amber, 0.30)
        : cnt > 0
          ? TRV.alpha(k === 6 ? P.cyan : P.magenta, 0.24)
          : isProtected
            ? TRV.alpha(P.cyan, 0.05)
            : TRV.alpha(P.panelEdge, 0.18);
      ctx.strokeStyle = isActive ? P.amber : cnt > 0 ? (k === 6 ? P.cyan : P.magenta) : P.panelEdge;
      ctx.lineWidth = (isActive ? 2.0 : 1.1) * lw;
      ctx.fillRect(cx + 1, sy - ch / 2, Math.max(4, cw - 2), ch);
      ctx.strokeRect(cx + 1, sy - ch / 2, Math.max(4, cw - 2), ch);

      if (!TRV.thumbMode) {
        ctx.font = font(cw > 18 ? 10 : 8.5, 'data', 600);
        ctx.fillStyle = isActive ? P.amber : cnt > 0 ? P.ink : P.dim;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(cnt), cx + cw / 2, sy);

        if (k % 2 === 0 || k === 17) {
          ctx.font = font(8.5, 'data', 400);
          ctx.fillStyle = k === 6 ? P.cyan : P.dim;
          ctx.textBaseline = 'top';
          ctx.fillText(String(k), cx + cw / 2, sy + ch / 2 + 3);
        }
      }
    }

    // Cyan hard barrier wall between k = 5 and k = m - 2 = 6 (LEAN ✓ lower_support_carry_barrier)
    const wallPx = stripX + (6 - kMin) * cw;
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2.4 * lw;
    ctx.beginPath();
    ctx.moveTo(wallPx, sy - ch * 0.85);
    ctx.lineTo(wallPx, sy + ch * 0.85);
    ctx.stroke();

    // Upward Frougny carry wave arrow from k=8 toward active index
    const x8 = stripX + (8 - kMin + 0.5) * cw;
    const xAct = stripX + (st.active - kMin + 0.5) * cw;
    if (st.active > 8) {
      drawArrow(ctx, x8, sy - ch * 0.72, xAct, sy - ch * 0.72, P.magenta, 2.0, lw, 6);
    }

    if (!TRV.thumbMode) {
      const compact = B.bw < 350;
      ctx.font = font(10, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.ink;
      ctx.fillText('1584 + F₈(21) = 1605  (wdigits = [17, 6])', B.bx + 8, B.by + 6);
      ctx.fillStyle = P.violet;
      ctx.fillText(L(st.rule[0], st.rule[1]), B.bx + 8, B.by + 20);
      ctx.fillStyle = P.cyan;
      ctx.textBaseline = 'bottom';
      ctx.fillText(compact ? L('◂ 下界 k ≥ m−2 = 6', '◂ floor k ≥ m−2 = 6') : L('◂ LEAN ✓ 下穿硬墙 k ≥ m−2 = 6', '◂ LEAN ✓ floor k ≥ m−2 = 6'), B.bx + 8, B.by + B.bh - 5);
      ctx.fillStyle = P.magenta;
      ctx.textAlign = 'right';
      ctx.fillText(compact ? L('Frougny 进位 ▸', 'Frougny wave ▸') : L('Frougny 上行进位波 ▸', 'Frougny upward wave ▸'), B.bx + B.bw - 8, B.by + B.bh - 5);
    }
  }

  // d = 3 (MODEL): S = 2^{σn} bits packed in a ball under the holographic bound, radius R ∝ 2^{σn/2}, light-speed wave 2R/c
  function drawMorphD3(ctx, B, lw, u, sig) {
    const cx = B.bx + B.bw * 0.50, cy = B.by + B.bh * 0.53;
    const maxR = Math.min(B.bw, B.bh) * 0.36;
    const rHoriz = maxR; // Schwarzschild / Bekenstein saturation envelope at σ = 1
    // Visual sphere radius scales monotonically with σ: R(σ)/R_max = 0.18 + 0.82 * sqrt(σ)
    const rSphere = maxR * (0.18 + 0.82 * Math.sqrt(clamp(sig, 0, 1)));
    // Naive 3D Euclidean packing radius S^{1/3} (smaller, forbidden once gravitational entropy bound dominates!)
    const rEuclid = maxR * (0.14 + 0.48 * Math.cbrt(clamp(sig, 0, 1)));

    // Outer Bekenstein–Hawking saturation horizon ring (σ = 1)
    ctx.strokeStyle = TRV.alpha(P.magenta, 0.55);
    ctx.setLineDash([5 * lw, 4 * lw]);
    ctx.lineWidth = 1.5 * lw;
    ctx.beginPath();
    ctx.arc(cx, cy, rHoriz, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);

    // Holographic memory sphere R ∝ 2^{σn/2}
    ctx.fillStyle = TRV.alpha(P.violet, 0.16);
    ctx.strokeStyle = P.violet;
    ctx.lineWidth = 2.2 * lw;
    ctx.beginPath();
    ctx.arc(cx, cy, rSphere, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Forbidden 3D dense-packing core S^{1/3} comparison ring
    if (sig > 0.08) {
      ctx.strokeStyle = TRV.alpha(P.dim, 0.55);
      ctx.setLineDash([2.5 * lw, 3 * lw]);
      ctx.lineWidth = 1.1 * lw;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(rEuclid, rSphere * 0.88), 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Boundary holographic Planck tiles on sphere perimeter
    const nTiles = Math.max(8, Math.round(10 + 18 * sig));
    for (let i = 0; i < nTiles; i++) {
      const a = (TAU * i) / nTiles;
      const tx = cx + Math.cos(a) * rSphere, ty = cy + Math.sin(a) * rSphere;
      ctx.fillStyle = i % 3 === 0 ? P.cyan : P.violet;
      ctx.beginPath();
      ctx.arc(tx, ty, 2.1 * lw, 0, TAU);
      ctx.fill();
    }

    // Light-cone round-trip signal wave: outward for u ∈ [0, 0.5], inward return for u ∈ [0.5, 1]
    const outbound = u <= 0.5;
    const waveFrac = outbound ? u * 2 : (1 - u) * 2;
    const waveR = Math.max(4 * lw, rSphere * waveFrac);
    const targetAngle = -Math.PI * 0.22;
    const tx = cx + Math.cos(targetAngle) * rSphere, ty = cy + Math.sin(targetAngle) * rSphere;
    const px = cx + Math.cos(targetAngle) * waveR, py = cy + Math.sin(targetAngle) * waveR;

    // Radial wire line
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.7 * lw;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tx, ty);
    ctx.stroke();

    // Propagating wavefront circle + amber photon packet
    ctx.strokeStyle = TRV.alpha(P.amber, 0.62);
    ctx.lineWidth = 1.5 * lw;
    ctx.beginPath();
    ctx.arc(cx, cy, waveR, 0, TAU);
    ctx.stroke();

    ctx.fillStyle = P.amber;
    ctx.beginPath();
    ctx.arc(px, py, 4.5 * lw, 0, TAU);
    ctx.fill();

    // Central observer register
    ctx.fillStyle = P.stage;
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.8 * lw;
    ctx.beginPath();
    ctx.arc(cx, cy, 5.2 * lw, 0, TAU);
    ctx.fill();
    ctx.stroke();

    if (!TRV.thumbMode) {
      const compact = B.bw < 350;
      const rCur = S.wire === 'serial' ? rSerialCurve(sig, S.regime) : rPipeCurve(sig, S.regime);
      // Bit-capacity convention S ≲ A/(4ℓ_P² ln 2) bits (MODEL envelope); wraps onto two lines when the box is narrow.
      const capLine = `S ≲ A/(4ℓ_P² ln 2) ${L('比特', 'bits')} (MODEL)`;
      const radLine = `⇒ R ∝ 2^{${fix(sig / 2, 3)}n}`;
      const wireLine = `T_wire = 2R/c ∝ 2^{${fix(sig / 2, 3)}n} (${outbound ? L('去程', 'out') : L('回程', 'back')})`;
      const maxW = B.bw - 16;
      ctx.font = font(10, 'data', 600);
      const oneLine = ctx.measureText(`${capLine} ${radLine}`).width <= maxW;
      const widest = Math.max(ctx.measureText(capLine).width, ctx.measureText(wireLine).width);
      const fs = widest > maxW ? Math.max(8, 10 * maxW / widest) : 10;
      ctx.font = font(fs, 'data', 600);
      const lh = Math.round(fs * 1.4);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.violet;
      let ty0 = B.by + 6;
      if (oneLine) {
        ctx.fillText(`${capLine} ${radLine}`, B.bx + 8, ty0);
      } else {
        ctx.fillText(capLine, B.bx + 8, ty0);
        ty0 += lh;
        ctx.fillText(radLine, B.bx + 8, ty0);
      }
      ty0 += lh;
      ctx.fillStyle = P.cyan;
      ctx.fillText(wireLine, B.bx + 8, ty0);
      ctx.font = font(10, 'data', 600);
      ctx.fillStyle = P.amber;
      ctx.textBaseline = 'bottom';
      ctx.fillText(compact ? `σ=${fix(sig, 2)} · r=${fix(rCur, 3)}` : `σ = ${fix(sig, 2)} · r_eff = ${fix(rCur, 3)}`, B.bx + 8, B.by + B.bh - 5);
      ctx.fillStyle = P.magenta;
      ctx.textAlign = 'right';
      ctx.fillText(compact ? 'σ*=2/3 ⇒ r=1/3' : 'σ* = 2/3 ⇒ r_min = 1/3', B.bx + B.bw - 8, B.by + B.bh - 5);
    }
  }

  // d = 4: 2D coherent quantum superposition pointer in span{|s⊥⟩, |x*⟩} rotating under Grover reflections (MODEL envelope (1 − σ)/2)
  function drawMorphD4(ctx, B, lw, u, sig) {
    // The line on the meeting endpoints: one line where the panel is wide enough; otherwise (a narrow frame) it breaks
    // after its colon into two lines, and the quarter circle sits below the three lines of text instead of under them.
    const meetLab = L('两端相等: r_Grover(0) = r_wire(1) = 0.500', 'Endpoints meet: r_Grover(0) = r_wire(1) = 0.500');
    ctx.font = font(10, 'data', 600);
    const meetWrap = !TRV.thumbMode && ctx.measureText(meetLab).width > B.bw - 16;
    const cx = B.bx + B.bw * 0.48;
    let cy = B.by + B.bh * 0.64, R = Math.min(B.bw * 0.62, B.bh * 0.54);
    if (meetWrap) { cy = B.by + B.bh - 20; R = Math.max(18, Math.min(R, cy - B.by - 52)); }
    const theta0 = 0.16; // initial overlap angle
    const kRot = clamp(Math.floor(u * 5 + 1e-9), 0, 4); // 0..4 Grover reflection steps -> (2k+1)theta0
    const thetaCur = Math.min(Math.PI / 2, (2 * u * 4.5 + 1) * theta0);

    // Quarter-circle invariant plane span{|s⊥⟩, |x*⟩}
    ctx.strokeStyle = P.panelEdge;
    ctx.lineWidth = 1.3 * lw;
    ctx.beginPath();
    ctx.moveTo(cx, cy - R * 1.05);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + R * 1.08, cy);
    ctx.stroke();

    ctx.strokeStyle = TRV.alpha(P.cyan, 0.45);
    ctx.setLineDash([4 * lw, 3 * lw]);
    ctx.lineWidth = 1.4 * lw;
    ctx.beginPath();
    ctx.arc(cx, cy, R, -Math.PI / 2, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Coherent superposition fan ∑ α_x |x⟩ rays
    for (let m = 0; m <= 5; m++) {
      const ang = Math.min(Math.PI / 2, (2 * m + 1) * theta0);
      const rx = cx + Math.cos(ang) * R, ry = cy - Math.sin(ang) * R;
      const past = m <= kRot;
      ctx.strokeStyle = TRV.alpha(P.cyan, past ? 0.42 : 0.15);
      ctx.lineWidth = 1.2 * lw;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(rx, ry);
      ctx.stroke();
    }

    // Swept coherent bivector sector
    ctx.fillStyle = TRV.alpha(P.cyan, 0.14);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R * 0.72, -thetaCur, -theta0);
    ctx.closePath();
    ctx.fill();

    // Target vertical axis |x*⟩ highlight
    drawArrow(ctx, cx, cy, cx, cy - R, P.cyan, 2.0, lw, 7);

    // Live amber superposition pointer |ψ(τ)⟩
    const px = cx + Math.cos(thetaCur) * R, py = cy - Math.sin(thetaCur) * R;
    drawArrow(ctx, cx, cy, px, py, P.amber, 2.5, lw, 8);
    ctx.fillStyle = P.amber;
    ctx.beginPath();
    ctx.arc(px, py, 4.2 * lw, 0, TAU);
    ctx.fill();

    if (!TRV.thumbMode) {
      const rQ = rQuantumCurve(sig, S.regime);
      ctx.font = font(10, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.cyan;
      ctx.fillText('MODEL r_Q(σ) = (1 − σ)/2', B.bx + 8, B.by + 6);
      ctx.fillStyle = P.violet;
      if (meetWrap) {
        const cut = meetLab.indexOf(': ');
        ctx.fillText(meetLab.slice(0, cut + 1), B.bx + 8, B.by + 20);
        ctx.fillText(meetLab.slice(cut + 2), B.bx + 8, B.by + 34);
      } else ctx.fillText(meetLab, B.bx + 8, B.by + 20);
      ctx.fillStyle = P.cyan;
      ctx.fillText('|x*⟩', cx + 6, cy - R - 2);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('|s⊥⟩', cx + R + 4, cy - 4);
      ctx.fillStyle = P.amber;
      ctx.textAlign = 'left';
      ctx.fillText(`σ = ${fix(sig, 2)} · r_eff = ${fix(rQ, 3)}`, B.bx + 8, B.by + B.bh - 5);
    }
  }

  // d = 5: 1D decohered classical *ptr sequential DFS + small TLB conflict cache + Landauer backtrack heat
  function drawMorphD5(ctx, B, lw, u, sig) {
    const topY = B.by + 36, botY = B.by + B.bh - 36;
    const rootX = B.bx + B.bw * 0.42;
    const lv1Y = topY + (botY - topY) * 0.34, lv2Y = topY + (botY - topY) * 0.68, lv3Y = botY;
    const span = Math.min(B.bw * 0.34, 110 * lw);

    // Binary search tree coordinates (8 leaves, leaf 6 is satisfying, leaves 0..5 conflict & backtrack)
    const nodes = { root: [rootX, topY], l0: [rootX - span * 0.55, lv1Y], l1: [rootX + span * 0.55, lv1Y] };
    const mid = [
      [rootX - span * 0.85, lv2Y], [rootX - span * 0.25, lv2Y],
      [rootX + span * 0.25, lv2Y], [rootX + span * 0.85, lv2Y]
    ];
    const leaves = [];
    for (let i = 0; i < 8; i++) {
      const p = mid[Math.floor(i / 2)];
      leaves.push([p[0] + (i % 2 === 0 ? -1 : 1) * span * 0.16, lv3Y]);
    }

    const edges = [
      [nodes.root, nodes.l0], [nodes.root, nodes.l1],
      [nodes.l0, mid[0]], [nodes.l0, mid[1]], [nodes.l1, mid[2]], [nodes.l1, mid[3]],
      ...leaves.map((lf, i) => [mid[Math.floor(i / 2)], lf])
    ];
    ctx.strokeStyle = TRV.alpha(P.dim, 0.45);
    ctx.lineWidth = 1.2 * lw;
    for (const [a, b] of edges) {
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }

    const solLeaf = 5;
    const visited = clamp(Math.floor(u * 5.99), 0, solLeaf);
    for (let i = 0; i <= solLeaf; i++) {
      const [lx, ly] = leaves[i];
      const isCur = i === visited;
      const isDead = i < visited && i < solLeaf;
      if (isDead) {
        // Backtracked branch: emits magenta Landauer heat pulse
        ctx.fillStyle = P.magenta;
        ctx.beginPath(); ctx.arc(lx, ly, 3.2 * lw, 0, TAU); ctx.fill();
        drawArrow(ctx, lx, ly + 3 * lw, lx, ly + 15 * lw, P.magenta, 1.4, lw, 4);
      } else if (i === solLeaf && !isCur) {
        ctx.strokeStyle = P.cyan;
        ctx.lineWidth = 1.6 * lw;
        ctx.beginPath(); ctx.arc(lx, ly, 4.2 * lw, 0, TAU); ctx.stroke();
      }
      if (isCur) {
        const pMid = mid[Math.floor(i / 2)];
        const pTop = i < 4 ? nodes.l0 : nodes.l1;
        ctx.strokeStyle = P.amber;
        ctx.lineWidth = 2.2 * lw;
        ctx.beginPath();
        ctx.moveTo(nodes.root[0], nodes.root[1]);
        ctx.lineTo(pTop[0], pTop[1]);
        ctx.lineTo(pMid[0], pMid[1]);
        ctx.lineTo(lx, ly);
        ctx.stroke();
        ctx.fillStyle = P.amber;
        ctx.beginPath(); ctx.arc(lx, ly, 4.5 * lw, 0, TAU); ctx.fill();
      }
    }

    // Small TLB conflict cache box on the right
    const tx = B.bx + B.bw * 0.77, tw = B.bw * 0.19, ty = topY + 8, th = (botY - topY) * 0.72;
    ctx.fillStyle = TRV.alpha(P.cyan, 0.08);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.3 * lw;
    ctx.fillRect(tx, ty, tw, th);
    ctx.strokeRect(tx, ty, tw, th);
    const slots = 4, filled = Math.min(slots, Math.max(1, Math.round(sig * slots) + (visited > 0 ? 1 : 0)));
    for (let s = 0; s < slots; s++) {
      const sy = ty + 16 + ((th - 24) * s) / slots;
      ctx.fillStyle = s < filled ? TRV.alpha(P.cyan, 0.36) : TRV.alpha(P.panelEdge, 0.3);
      ctx.fillRect(tx + 4, sy, Math.max(4, tw - 8), Math.max(5, (th - 32) / slots));
    }

    if (!TRV.thumbMode) {
      const rC = rRamCurve(sig, S.regime);
      const heatBits = Math.max(1, visited);
      ctx.font = font(9.5, 'data', 600);
      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('TLB', tx + tw / 2, ty - 2);
      ctx.font = font(10, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.cyan;
      ctx.fillText(S.regime === 'sat3' ? `MODEL PPSZ·(1−σ) · r = ${fix(rC, 3)}` : `MODEL 1 − σ · r = ${fix(rC, 3)}`, B.bx + 8, B.by + 6);
      ctx.fillStyle = P.magenta;
      ctx.fillText(`β·Q ≥ −ΔS: ${heatBits}·ln 2 ≈ ${fix(heatBits * Math.LN2, 2)} nat`, B.bx + 8, B.by + 20);
      ctx.fillStyle = P.amber;
      ctx.textBaseline = 'bottom';
      ctx.fillText(`*ptr step ${visited + 1} · σ = ${fix(sig, 2)}`, B.bx + 8, B.by + B.bh - 5);
    }
  }

  // d = 6: Memoryless |T| = 0, σ = 0, M = 0 blind Markovian hops + full open Gram choice ellipse
  function drawMorphD6(ctx, B, lw, u) {
    const cx = B.bx + B.bw * 0.50, cy = B.by + B.bh * 0.54;
    const rx = Math.min(B.bw * 0.38, 125 * lw), ry = Math.min(B.bh * 0.31, 88 * lw);

    // Wide-open uncollapsed Gram compatibility elliptope (det G = 1)
    ctx.fillStyle = TRV.alpha(P.cyan, 0.08);
    ctx.strokeStyle = TRV.alpha(P.cyan, 0.55);
    ctx.lineWidth = 1.6 * lw;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, -0.18, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Uncorrelated blind trial sites (no retained edges when M = 0!)
    const hops = [
      [-0.55, -0.35], [0.48, -0.42], [-0.28, 0.52], [0.62, 0.28],
      [-0.64, 0.16], [0.12, -0.58], [0.05, 0.08]
    ];
    const cur = clamp(Math.floor(u * (hops.length - 0.01)), 0, hops.length - 1);
    for (let i = 0; i < hops.length; i++) {
      const px = cx + hops[i][0] * rx, py = cy + hops[i][1] * ry;
      if (i === cur) {
        if (i > 0) {
          const qx = cx + hops[i - 1][0] * rx, qy = cy + hops[i - 1][1] * ry;
          ctx.strokeStyle = TRV.alpha(P.magenta, 0.45);
          ctx.setLineDash([3 * lw, 4 * lw]);
          ctx.lineWidth = 1.2 * lw;
          ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(px, py); ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.fillStyle = P.amber;
        ctx.beginPath(); ctx.arc(px, py, 5.0 * lw, 0, TAU); ctx.fill();
      } else {
        ctx.strokeStyle = TRV.alpha(P.dim, 0.45);
        ctx.lineWidth = 1.1 * lw;
        ctx.beginPath(); ctx.arc(px, py, 3.0 * lw, 0, TAU); ctx.stroke();
      }
    }

    if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.magenta;
      ctx.fillText('|T| = 0 · σ = 0 · M = 0  ⇒  Θ(2ⁿ), r = 1.000', B.bx + 8, B.by + 6);
      ctx.fillStyle = P.cyan;
      ctx.fillText(L('开放格拉姆相容体积 det G > 0（白板初态）', 'Maximal open Gram choice volume det G > 0'), B.bx + 8, B.by + 20);
      ctx.fillStyle = P.amber;
      ctx.textBaseline = 'bottom';
      ctx.fillText(L(`无记忆盲猜第 ${cur + 1} 跳（前跳即忘）`, `Memoryless hop #${cur + 1} (prior wiped)`), B.bx + 8, B.by + B.bh - 5);
    }
  }

  // Ladder panorama (7 rungs d = 0..6 stacked cleanly with bidirectional arrows 0->6 physics & 6->0 life)
  function drawLadderCascade(ctx, B, lw, activeD) {
    const topY = B.by + 16, botY = B.by + B.bh - 14;
    const rowH = (botY - topY) / 7;
    const barX0 = B.bx + 76, barW = Math.max(40, B.bw - 154);

    for (let j = 0; j <= 6; j++) {
      const cy = topY + (j + 0.5) * rowH;
      const pt = rungPoint(j, S.regime, S.wire);
      const isAct = j === activeD;
      const wFill = Math.max(4 * lw, barW * clamp(pt.rEff, 0.025, 1));

      ctx.fillStyle = isAct ? TRV.alpha(P.amber, 0.16) : TRV.alpha(P.panelEdge, 0.16);
      ctx.fillRect(barX0, cy - rowH * 0.34, barW, rowH * 0.68);

      ctx.fillStyle = isAct
        ? P.amber
        : j === 0
          ? P.cyan
          : j <= 2
            ? P.violet
            : j <= 4
              ? P.cyan
              : P.magenta;
      ctx.fillRect(barX0, cy - rowH * 0.28, wFill, rowH * 0.56);

      if (j === 1) {
        // Dashed horizon extension for n -> n + 1 non-anticipating jump
        const wH = barW * clamp(pt.rHorizon, 0, 1);
        ctx.strokeStyle = isAct ? P.amber : P.magenta;
        ctx.setLineDash([3 * lw, 3 * lw]);
        ctx.lineWidth = 1.3 * lw;
        ctx.strokeRect(barX0, cy - rowH * 0.28, wH, rowH * 0.56);
        ctx.setLineDash([]);
      }

      if (!TRV.thumbMode) {
        ctx.font = font(9.5, 'data', isAct ? 700 : 600);
        ctx.fillStyle = isAct ? P.amber : P.ink;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`d=${j} ${STAGES[j].code.slice(0, 6)}`, B.bx + 8, cy);

        ctx.textAlign = 'right';
        ctx.fillStyle = isAct ? P.amber : P.dim;
        ctx.fillText(j === 1 ? '0 / H' : fix(pt.rEff, 3), B.bx + B.bw - 24, cy);
      }
    }

    // Bidirectional vertical arrows on far right: 0->6 limiters (magenta) & 6->0 life table-building (cyan)
    const ax1 = B.bx + B.bw - 14, ax2 = B.bx + B.bw - 6;
    drawArrow(ctx, ax1, topY + 8, ax1, botY - 8, P.magenta, 1.5, lw, 5);
    drawArrow(ctx, ax2, botY - 8, ax2, topY + 8, P.cyan, 1.5, lw, 5);
  }

  /* ---------- Right Panel: Spacetime–Gravity Trade-Off Phase Diagram ---------- */
  function drawPhasePanel(ctx, rect, lw, showSubTitle) {
    const pad = TRV.thumbMode ? [32, 16, 16, 28] : [42, 18, showSubTitle ? 22 : 12, 30];
    const B = subBox(rect, pad);
    const X = (s) => B.bx + clamp(s, 0, 1) * B.bw;
    const Y = (r) => B.by + B.bh - clamp(r, 0, 1.06) * (B.bh / 1.06);
    const invX = (px) => clamp((px - B.bx) / Math.max(1, B.bw), 0, 1);
    lastPhaseBox = { B, invX };

    ctx.save();
    drawPanelFrame(
      ctx, B, lw,
      showSubTitle ? '时空—引力权衡相图 · MODEL 包络 σ vs r_eff(σ)' : '',
      showSubTitle ? 'Phase diagram · MODEL envelopes σ vs r_eff(σ)' : ''
    );

    // Subtle gridlines & tick labels
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.65);
    ctx.lineWidth = 1 * lw;
    for (const tk of [0, 1 / 3, 0.5, 2 / 3, 1]) {
      ctx.beginPath();
      ctx.moveTo(X(tk), B.by); ctx.lineTo(X(tk), B.by + B.bh);
      ctx.moveTo(B.bx, Y(tk)); ctx.lineTo(B.bx + B.bw, Y(tk));
      ctx.stroke();
    }

    if (!TRV.thumbMode) {
      ctx.font = font(9.5, 'data', 500);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (const [v, lbl] of [[0, '0'], [0.5, '0.5'], [2 / 3, '2/3'], [1, '1']]) {
        ctx.fillText(lbl, X(v), B.by + B.bh + 4);
      }
      ctx.fillText('σ = (log₂S)/n', B.bx + B.bw * 0.5, B.by + B.bh + 16);

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (const [v, lbl] of [[0, '0'], [1 / 3, '1/3'], [0.5, '0.5'], [1, '1.0']]) {
        ctx.fillText(lbl, B.bx - 5, Y(v));
      }
    }

    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.clip();

    const N = 96;
    const strokeCurve = (fn, color, width, dash, alpha = 1) => {
      ctx.strokeStyle = alpha < 1 ? TRV.alpha(color, alpha) : color;
      ctx.lineWidth = width * lw;
      ctx.setLineDash(dash ? dash.map((v) => v * lw) : []);
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const s = i / N, px = X(s), py = Y(fn(s));
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Shaded forbidden holographic light-cone wedge r < σ/2
    ctx.fillStyle = TRV.alpha(P.magenta, 0.08);
    ctx.beginPath();
    ctx.moveTo(X(0), Y(0));
    ctx.lineTo(X(1), Y(0.5));
    ctx.lineTo(X(1), Y(0));
    ctx.closePath();
    ctx.fill();

    // If in sat3, draw faint reference universal black-box envelope for instant comparison
    if (S.regime === 'sat3') {
      strokeCurve((s) => rPipeCurve(s, 'blackbox'), P.dim, 1.1, [2, 3], 0.45);
    }

    // 1. Classical abstract RAM: 1 - σ (or R_PPSZ*(1-σ)) in dashed sigma
    strokeCurve((s) => rRamCurve(s, S.regime), P.sigma, 1.5, [4, 3], 0.85);

    // 2. Relativistic serial light-cone: 1 - σ/2 (violet)
    strokeCurve((s) => rSerialCurve(s, S.regime), P.violet, S.wire === 'serial' ? 2.4 : 1.5, S.wire === 'serial' ? null : [5, 3], 0.92);

    // 3. Relativistic pipelined holographic envelope: max(1 - σ, σ/2) (magenta)
    strokeCurve((s) => rPipeCurve(s, S.regime), P.magenta, S.wire === 'pipelined' ? 2.5 : 1.6, null, 1);

    // 4. Quantum MODEL envelope (1 - σ)/2 (cyan); KŠdW's proved bound is T²S = Ω(N³) for sorting, not this curve
    strokeCurve((s) => rQuantumCurve(s, S.regime), P.cyan, 2.2, null, 0.96);

    // Grover (0, 0.5) <-> Full-space wire delay (1, 0.5) horizontal duality bridge in blackbox
    if (S.regime === 'blackbox') {
      ctx.strokeStyle = TRV.alpha(P.cyan, 0.42);
      ctx.setLineDash([2 * lw, 4 * lw]);
      ctx.lineWidth = 1.2 * lw;
      ctx.beginPath();
      ctx.moveTo(X(0), Y(0.5));
      ctx.lineTo(X(1), Y(0.5));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Static holographic optimum ring (σ*, r_min) in magenta + ink core (never amber!)
    const opt = holoOptimum(S.regime);
    ctx.fillStyle = P.stage;
    ctx.strokeStyle = P.magenta;
    ctx.lineWidth = 1.8 * lw;
    ctx.beginPath();
    ctx.arc(X(opt.sigma), Y(opt.r), 5.4 * lw, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.beginPath();
    ctx.arc(X(opt.sigma), Y(opt.r), 2.1 * lw, 0, TAU);
    ctx.fill();

    // If in ladder sweep mode, connect all 7 stage anchors 0..6
    const d = activeStage();
    const cur = evalStage(d, activeSigma(), S.regime, S.wire);

    if (S.sweep) {
      const pts = [];
      for (let j = 0; j <= 6; j++) pts.push(rungPoint(j, S.regime, S.wire));
      ctx.strokeStyle = TRV.alpha(P.ink, 0.45);
      ctx.setLineDash([3 * lw, 3 * lw]);
      ctx.lineWidth = 1.3 * lw;
      ctx.beginPath();
      pts.forEach((p, j) => {
        const px = X(p.effSigma), py = Y(p.rEff);
        if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      pts.forEach((p, j) => {
        if (j === d) return;
        ctx.fillStyle = P.stage;
        ctx.strokeStyle = P.cyan;
        ctx.lineWidth = 1.4 * lw;
        ctx.beginPath();
        ctx.arc(X(p.effSigma), Y(p.rEff), 3.4 * lw, 0, TAU);
        ctx.fill();
        ctx.stroke();
      });
    }

    // For d = 1, draw vertical magenta horizon jump arrow from r_<=n = 0 to r_{n+1}
    if (d === 1) {
      drawArrow(ctx, X(cur.effSigma), Y(0) - 4 * lw, X(cur.effSigma), Y(cur.rHorizon) + 4 * lw, P.magenta, 1.8, lw, 6);
    }

    // Single live AMBER marker at active (effSigma, rEff) + crosshair
    const ax = X(cur.effSigma), ay = Y(cur.rEff);
    ctx.strokeStyle = TRV.alpha(P.amber, 0.55);
    ctx.setLineDash([3 * lw, 3 * lw]);
    ctx.lineWidth = 1.2 * lw;
    ctx.beginPath();
    ctx.moveTo(ax, B.by); ctx.lineTo(ax, B.by + B.bh);
    ctx.moveTo(B.bx, ay); ctx.lineTo(B.bx + B.bw, ay);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = P.amber;
    ctx.strokeStyle = P.stage;
    ctx.lineWidth = 1.4 * lw;
    ctx.beginPath();
    ctx.arc(ax, ay, 5.2 * lw, 0, TAU);
    ctx.fill();
    ctx.stroke();

    if (!TRV.thumbMode && B.bw > 170) {
      ctx.font = font(9.5, 'data', 600);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.magenta;
      ctx.fillText(
        S.regime === 'blackbox' ? '(σ*=2/3, r=1/3)' : `(σ*=${fix(opt.sigma, 2)}, r=${fix(opt.r, 3)})`,
        B.bx + B.bw - 6,
        B.by + 6
      );
      ctx.fillStyle = P.cyan;
      ctx.fillText(
        S.regime === 'blackbox' ? 'MODEL (1−σ)/2' : `MODEL ${fix(R_QBT, 3)}(1−σ)`,
        B.bx + B.bw - 6,
        B.by + 19
      );
    }

    ctx.restore();
  }

  /* ---------- Stage Dispatcher ---------- */
  function drawStage() {
    const cv = $('cv'), dpr = TRV.fitCanvas(cv), W = cv.clientWidth, H = cv.clientHeight;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const lw = TRV.thumbMode ? 2.0 : 1;
    const stacked = W < 540;
    lastStacked = stacked;
    const pt = TRV.thumbMode ? 16 : (stacked ? 96 : 56);
    const pb = TRV.thumbMode ? 16 : (stacked ? 68 : 48);
    const pl = 16, pr = 16;
    const inner = { x: pl, y: pt, w: Math.max(40, W - pl - pr), h: Math.max(40, H - pt - pb) };

    if (S.scene === 'morph') {
      lastPhaseBox = null;
      drawMorphPanel(ctx, inner, lw, false);
    } else if (S.scene === 'phase') {
      drawPhasePanel(ctx, inner, lw, false);
    } else {
      const gap = 10;
      const r1 = stacked
        ? { x: inner.x, y: inner.y, w: inner.w, h: (inner.h - gap) / 2 }
        : { x: inner.x, y: inner.y, w: (inner.w - gap) / 2, h: inner.h };
      const r2 = stacked
        ? { x: inner.x, y: inner.y + (inner.h + gap) / 2, w: inner.w, h: (inner.h - gap) / 2 }
        : { x: inner.x + (inner.w + gap) / 2, y: inner.y, w: (inner.w - gap) / 2, h: inner.h };
      drawMorphPanel(ctx, r1, lw, true);
      drawPhasePanel(ctx, r2, lw, true);
    }
  }

  /* ---------- Strip Plots (#plotA & #plotB) ---------- */
  function drawPlots() {
    const A = $('plotA'), B = $('plotB');
    const d = activeStage(), sig = activeSigma();
    const cur = evalStage(d, sig, S.regime, S.wire);

    // Plot A: 7-stage degradation staircase r_eff(d) across d = 0..6 (blackbox vs sat3 reference)
    const g = kit.plot(A, { x: [-0.4, 6.4], y: [0, 1.08], pad: [36, 10, 10, 22] });
    g.axes({ xTicks: [0, 1, 2, 3, 4, 5, 6], yTicks: [0, 1 / 3, 0.5, 1], yFmt: (v) => fix(v, 2) });
    g.hline(1 / 3, P.magenta, { dash: [3, 3], alpha: 0.5 });
    g.hline(0.5, P.cyan, { dash: [2, 3], alpha: 0.45 });

    const ptsBB = [], ptsSat = [];
    for (let j = 0; j <= 6; j++) {
      ptsBB.push([j, j === d && S.regime === 'blackbox' ? cur.rEff : rungPoint(j, 'blackbox', S.wire).rEff]);
      ptsSat.push([j, j === d && S.regime === 'sat3' ? cur.rEff : rungPoint(j, 'sat3', S.wire).rEff]);
    }
    g.line(ptsSat, P.violet, { width: S.regime === 'sat3' ? 2.0 : 1.2, dash: S.regime === 'sat3' ? [] : [3, 3], alpha: S.regime === 'sat3' ? 0.95 : 0.55 });
    g.line(ptsBB, P.cyan, { width: S.regime === 'blackbox' ? 2.0 : 1.2, dash: S.regime === 'blackbox' ? [] : [3, 3], alpha: S.regime === 'blackbox' ? 0.95 : 0.55 });

    const activePts = S.regime === 'sat3' ? ptsSat : ptsBB;
    activePts.forEach((p, j) => {
      g.dot(p[0], p[1], j === d ? P.amber : (S.regime === 'sat3' ? P.violet : P.cyan), j === d ? 4.4 : 2.6);
    });
    // Mark d=1 out-of-domain jump on Plot A
    g.line([[1, 0], [1, S.regime === 'sat3' ? R_PPSZ : 1]], P.magenta, { dash: [2, 2], width: 1.4, alpha: 0.75 });
    g.vline(d, P.amber, { alpha: 0.5 });
    $('pATitle').textContent = L('七阶时间指数阶梯 r(d)', '7-stage exponent ladder r(d)');
    $('pAMeta').textContent = `d=${d} · r=${fix(cur.rEff, 3)}`;

    // Plot B: Stage-coupled physical diagnostic
    if (d === 2) {
      // Exact Zeckendorf carry minimum vs maximum active index across step τ = 0..5
      const g2 = kit.plot(B, { x: [0, 5], y: [2, 18], pad: [36, 10, 10, 22] });
      g2.axes({ xTicks: [0, 1, 2, 3, 4, 5], yTicks: [2, 6, 12, 17], yFmt: (v) => v.toFixed(0) });
      g2.hline(6, P.cyan, { dash: [4, 3], width: 1.6, alpha: 0.9 });
      const upPts = ZECK_DEMO.steps.map((s, idx) => [idx, s.active]);
      const loPts = ZECK_DEMO.steps.map((s, idx) => [idx, s.low]);
      g2.line(upPts, P.magenta, { width: 1.9 });
      g2.line(loPts, P.cyan, { width: 1.9 });
      const stepIdx = clamp(Math.floor(clock.t + 1e-9), 0, 5);
      g2.vline(stepIdx, P.amber, { alpha: 0.55 });
      g2.dot(stepIdx, ZECK_DEMO.steps[stepIdx].active, P.amber, 4.2);
      g2.dot(stepIdx, ZECK_DEMO.steps[stepIdx].low, P.cyan, 3.3);
      $('pBTitle').textContent = L('齐肯多夫上下进位边界', 'Zeckendorf upper/lower carry');
      $('pBMeta').textContent = `k∈[${ZECK_DEMO.steps[stepIdx].low}, ${ZECK_DEMO.steps[stepIdx].active}]`;
    } else if (d === 5) {
      // Landauer cumulative balance β·Q = −ΔS + I + D across erased bits m = 0..6
      const g2 = kit.plot(B, { x: [0, 6], y: [0, 6], pad: [36, 10, 10, 22] });
      g2.axes({ xTicks: [0, 2, 4, 6], yTicks: [0, 2, 4, 6], yFmt: (v) => v.toFixed(0) });
      const minLine = [], realLine = [];
      const irrOverhead = 0.22; // mutualInfo + divergence >= 0
      for (let i = 0; i <= 60; i++) {
        const m = i / 10;
        minLine.push([m, m * Math.LN2]);
        realLine.push([m, m * (Math.LN2 + irrOverhead)]);
      }
      g2.line(minLine, P.cyan, { width: 1.8, dash: [4, 3] });
      g2.line(realLine, P.magenta, { width: 2.0 });
      const mNow = clamp(clock.t, 0, 6);
      g2.vline(mNow, P.amber, { alpha: 0.55 });
      g2.dot(mNow, mNow * (Math.LN2 + irrOverhead), P.amber, 4.2);
      $('pBTitle').textContent = L('兰道尔热下界 β·Q ≥ −ΔS', 'Landauer heat β·Q ≥ −ΔS');
      $('pBMeta').textContent = `${fix(mNow * (Math.LN2 + irrOverhead), 2)} nat`;
    } else {
      // Decomposition of residual search rate (1-σ) vs relativistic wire rate (σ/2)
      const g2 = kit.plot(B, { x: [0, 1], y: [0, 1.05], pad: [36, 10, 10, 22] });
      g2.axes({ xTicks: [0, 0.5, 2 / 3, 1], xFmt: (v) => (Math.abs(v - 2 / 3) < 0.01 ? '2/3' : fix(v, 1)), yTicks: [0, 1 / 3, 0.5, 1], yFmt: (v) => fix(v, 2) });
      const ptsSearch = [], ptsWire = [], ptsQ = [];
      for (let i = 0; i <= 60; i++) {
        const s = i / 60;
        ptsSearch.push([s, rRamCurve(s, S.regime)]);
        ptsWire.push([s, rWireCurve(s)]);
        ptsQ.push([s, rQuantumCurve(s, S.regime)]);
      }
      g2.line(ptsSearch, P.sigma, { dash: [4, 3], width: 1.4 });
      g2.line(ptsWire, P.magenta, { width: 1.8 });
      g2.line(ptsQ, P.cyan, { width: 1.7 });
      g2.vline(cur.effSigma, P.amber, { alpha: 0.55 });
      g2.dot(cur.effSigma, cur.rEff, P.amber, 4.2);
      $('pBTitle').textContent = L('搜表余项 vs 光锥线延迟', 'Search vs light-cone wire');
      $('pBMeta').textContent = `σ/2=${fix(rWireCurve(cur.effSigma), 3)}`;
    }
  }

  /* ---------- HUD, Legend & Readouts ---------- */
  function drawText() {
    const d = activeStage(), sig = activeSigma();
    const info = STAGES[d];
    const cur = evalStage(d, sig, S.regime, S.wire);
    const opt = holoOptimum(S.regime);

    $('pillStage').querySelector('strong').textContent = S.sweep ? `0→6 (d=${d})` : `d=${d}`;
    $('pillSigma').querySelector('strong').textContent = `σ=${fix(cur.effSigma, 2)}`;
    $('pillRate').querySelector('strong').textContent = d === 1 ? 'r=0 / H' : `r=${fix(cur.rEff, 3)}`;

    $('hudBig').textContent = S.sweep
      ? L(`七阶退化全景 · 当前 d = ${d}（${info.short[0]}）`, `7-stage ladder · active d = ${d} (${info.short[1]})`)
      : L(info.title[0], info.title[1]);
    $('hudSub').textContent = L(info.limiter[0], info.limiter[1]);

    $('legend').innerHTML = [
      `<span><i class="sw dash sg"></i>${L('抽象 RAM 1−σ', 'RAM 1−σ')}</span>`,
      `<span><i class="sw mg"></i>${L('全息界 max(1−σ, σ/2)', 'Holo max(1−σ, σ/2)')}</span>`,
      `<span><i class="sw vi"></i>${L('串行光锥 1−σ/2', 'Serial 1−σ/2')}</span>`,
      `<span><i class="sw cy"></i>${L('量子 MODEL (1−σ)/2', 'Quantum MODEL (1−σ)/2')}</span>`,
      `<span><i class="sw am"></i>${L('当前态 (d, σ)', 'Active (d, σ)')}</span>`
    ].join('');

    $('roAside').textContent = `${info.code} · ${S.regime === 'sat3' ? '3-SAT' : '2ⁿ'}`;
    $('roKeyL').textContent = L('有效时间指数率 r_eff', 'Effective time exponent r_eff');
    $('roKey').textContent = d === 1 ? `0.000 (${L('≤n 域内', 'in ≤n')})` : fix(cur.rEff, 4);
    $('roKeySub').textContent = d === 1
      ? L(`跨 n→n+1 视界跳至 ${fix(cur.rHorizon, 3)}`, `jumps to ${fix(cur.rHorizon, 3)} across n→n+1`)
      : `T ≈ 2^{${fix(cur.rEff, 3)}·n} (${cur.noteTag})`;

    $('roL1').textContent = L('当前退化阶与表容量', 'Active stage & table fraction');
    $('ro1').textContent = `d = ${d} (${L(info.short[0], info.short[1])}) · σ_eff = ${fix(cur.effSigma, 3)}`;

    $('roL2').textContent = L('全息半径与线延迟（MODEL）', 'Holographic radius & wire (MODEL)');
    $('ro2').textContent = `R ∝ 2^{${fix(cur.effSigma / 2, 3)}n} · r_opt(σ*=${fix(opt.sigma, 2)}) = ${fix(opt.r, 3)}`;

    $('roL3').textContent = L('量子 MODEL 包络 r_Q(σ)', 'Quantum MODEL r_Q(σ)');
    $('ro3').textContent = fix(rQuantumCurve(cur.effSigma, S.regime), 3);

    $('roL4').textContent = L('经典 RAM MODEL r(σ)', 'Classical RAM MODEL r(σ)');
    $('ro4').textContent = fix(rRamCurve(cur.effSigma, S.regime), 3);

    $('roL5').textContent = L('关键形式化与文献判据', 'Formal & physical invariant');
    if (d === 0) {
      $('ro5').textContent = 'g(a₀) = diagonal(f,g) ⇒ f(g(a₀,a₀)) = g(a₀,a₀) · spectrumBottom ≤ K(r) + c';
    } else if (d === 1) {
      $('ro5').textContent = 'L_retro(T) = 0 ∧ ∀z, ¬NonAnticipating(z)';
    } else if (d === 2) {
      const st = ZECK_DEMO.steps[clamp(Math.floor(clock.t + 1e-9), 0, 5)];
      $('ro5').textContent = `wdigits(1605) = [17, 6] ≥ m−2 = 6 · step k_max = ${st.active}`;
    } else if (d === 3) {
      $('ro5').textContent = `MODEL r_pipe = max(1−σ, σ/2) = ${fix(rPipeCurve(cur.effSigma, S.regime), 3)} · r_ser = ${fix(rSerialCurve(cur.effSigma, S.regime), 3)}`;
    } else if (d === 4) {
      $('ro5').textContent = 'r_Grover(σ=0) = 0.500 = r_wire(σ=1) (MODEL r_Q = (1−σ)/2)';
    } else if (d === 5) {
      $('ro5').textContent = 'β·heat = −ΔS + I + D ≥ −ΔS (Landauer balance)';
    } else {
      $('ro5').textContent = '|T| = 0, M = 0 ⇒ r = 1.000, det G_0 = 1';
    }

    $('roNote').textContent = S.sweep
      ? L(
        '正向 0→6 展示物理限制器如何逐级撑开空间半径、因果进位时间、量子叠加与热耗散；逆向 6→0 对应生命持续建表回返 p = *p。',
        'Forward 0→6 shows physical limiters birthing spatial radius, causal carry time, quantum phase and heat; backward 6→0 traces biological table-building back to p = *p.'
      )
      : L(
        '右侧相图的品红圆环标出 MODEL 流水线包络的极小点 (σ*, r_min)，琥珀圆点只标当前 (σ_eff, r_eff) 状态；各条曲线都是模型包络，不是已证的 SAT 下界；可在相图内直接横向拖动 σ。',
        'On the phase plot, the ringed magenta point marks the minimum (σ*, r_min) of the MODEL pipelined envelope, while amber marks only the live (σ_eff, r_eff) state; every curve is a model envelope, not a proved SAT lower bound; drag horizontally inside the plot to vary σ.'
      );
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- Controls & Clock ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    label: $('tau'),
    speeds: $('speedChips'),
    max: TMAX,
    rate: 1.15,
    step: 0.5,
    format: (t, max) => (S.sweep
      ? `${L('阶', 'd=')} ${clamp(Math.round(t), 0, 6)} <small>/ ${max.toFixed(0)}</small>`
      : `τ = ${t.toFixed(1)} <small>/ ${max.toFixed(0)}</small>`),
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
    leave();
    S.scene = v;
    clock.pause();
    paint();
  });

  const fSigma = kit.field($('sigma'), {
    fmt: (v) => v.toFixed(2),
    onInput: (v) => {
      if (S.sweep) { S.d = activeStage(); S.sweep = false; stageChips.set(String(S.d), true); }
      if (S.d === 0 || S.d === 6) { S.d = 3; stageChips.set('3', true); }
      S.sigma = clamp(v, 0, 1);
      leave();
      paint();
    }
  });

  function setSigmaExact(sig) {
    S.sigma = clamp(sig, 0, 1);
    $('sigma').value = String(Math.round(S.sigma * 100) / 100);
    $('oSigma').textContent = S.sigma.toFixed(2);
  }

  const stageChips = kit.chips($('stageChips'), 'd', (v) => {
    leave();
    clock.pause();
    if (v === 'ladder') {
      S.sweep = true;
      clock.set(3);
    } else {
      S.sweep = false;
      S.d = clamp(parseInt(v, 10) || 0, 0, 6);
      setSigmaExact(S.d === 3 ? holoOptimum(S.regime).sigma : STAGES[S.d].defSigma);
      clock.set(4.2);
    }
    paint();
  });

  const regimeChips = kit.chips($('regimeChips'), 'regime', (v) => {
    S.regime = v;
    if (!S.sweep && S.d === 3 && Math.abs(S.sigma - holoOptimum(v === 'sat3' ? 'blackbox' : 'sat3').sigma) < 0.02) {
      setSigmaExact(holoOptimum(v).sigma);
    }
    leave();
    paint();
  });

  const wireChips = kit.chips($('wireChips'), 'wire', (v) => {
    S.wire = v;
    leave();
    paint();
  });

  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });

  // Pointer drag inside the right-hand Phase Diagram to adjust σ directly
  let dragging = false;
  function dragPhase(ev) {
    if (!lastPhaseBox || S.scene === 'morph') return;
    const b = $('cv').getBoundingClientRect();
    const px = ev.clientX - b.left;
    const sig = Math.round(lastPhaseBox.invX(px) * 100) / 100;
    if (S.sweep) { S.d = activeStage(); S.sweep = false; stageChips.set(String(S.d), true); }
    if (S.d === 0 || S.d === 6) { S.d = 3; stageChips.set('3', true); }
    setSigmaExact(sig);
    leave();
    paint();
  }
  $('cv').addEventListener('pointerdown', (ev) => {
    if (!lastPhaseBox || S.scene === 'morph') return;
    const b = $('cv').getBoundingClientRect();
    const px = ev.clientX - b.left, py = ev.clientY - b.top;
    const { B } = lastPhaseBox;
    if (px < B.bx - 10 || px > B.bx + B.bw + 10 || py < B.by - 10 || py > B.by + B.bh + 10) return;
    dragging = true;
    try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic pointer */ }
    dragPhase(ev);
  });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) dragPhase(ev); });
  const drop = () => { dragging = false; };
  $('cv').addEventListener('pointerup', drop);
  $('cv').addEventListener('pointercancel', drop);

  kit.keys({
    1: () => { leave(); S.scene = 'duo'; sceneChips.set('duo', true); paint(); },
    2: () => { leave(); S.scene = 'morph'; sceneChips.set('morph', true); paint(); },
    3: () => { leave(); S.scene = 'phase'; sceneChips.set('phase', true); paint(); },
    d: () => {
      const curD = activeStage();
      const nxt = (curD + 1) % 7;
      stageChips.set(String(nxt));
    },
    r: () => {
      regimeChips.set(S.regime === 'blackbox' ? 'sat3' : 'blackbox');
    }
  });

  /* ---------- 6 Citable Experiment Cards ---------- */
  const CARDS = {
    oracle: { scene: 'duo', d: 0, sweep: false, sigma: 0, regime: 'blackbox', wire: 'pipelined', to: 5.5, still: 5.0 },
    frougny: { scene: 'duo', d: 2, sweep: false, sigma: 0.08, regime: 'sat3', wire: 'pipelined', to: 5.2, still: 5.0 },
    bekenstein: { scene: 'duo', d: 3, sweep: false, sigma: 2 / 3, regime: 'blackbox', wire: 'pipelined', to: 5.0, still: 4.2 },
    grover: { scene: 'duo', d: 4, sweep: false, sigma: 0, regime: 'blackbox', wire: 'pipelined', to: 5.0, still: 4.0 },
    landauer: { scene: 'duo', d: 5, sweep: false, sigma: 0.12, regime: 'blackbox', wire: 'pipelined', to: 5.0, still: 4.2 },
    ladder: { scene: 'duo', d: 3, sweep: true, sigma: 2 / 3, regime: 'blackbox', wire: 'pipelined', to: 6.0, still: 6.0 }
  };

  const NOTES = {
    oracle: [
      '第 0 阶（全息自指预言机）：零号槽位写入 p = *p（T = T(T)），约束掩码 [Φ] 投向全局晶格时非解分支按相反双向量手性 +Ω − Ω = 0 成对相消，零延迟锁定唯一不动点 x* = T[Φ]（r_eff = 0.000）。这是 MODEL：Lean 只证整行捕获 g(a₀) = diagonal(f, g) ⇒ f(g(a₀, a₀)) = g(a₀, a₀)；标准图灵机 P ≠ NP 仍为 OPEN。',
      'Stage 0 (holographic oracle): Slot [0,0] holds p = *p (T = T(T)); projecting constraint mask [Φ] cancels non-solutions in opposite bivector pairs (+Ω − Ω = 0), isolating x* = T[Φ] at r_eff = 0.000. This is a MODEL: Lean proves only the whole-row capture g(a₀) = diagonal(f, g) ⇒ f(g(a₀, a₀)) = g(a₀, a₀); uniform Turing P ≠ NP remains OPEN.'
    ],
    frougny: [
      '第 2 阶（齐肯多夫自动机与局部张量块）：实算 1584 + F₈(21) = 1605 的 5 步规范化，Lean 冻结定理严格锁死向下进位止于 k ≥ m − 2 = 6（青色硬墙），而交替串 10101… 上的向上进位波（品红）串行级联至 F₁₇，在静态晶格内催生因果时间。',
      'Stage 2 (Zeckendorf automaton & local tensor blocks): normalizing 1584 + F₈(21) = 1605 across 5 exact steps, Lean locks downward penetration at k ≥ m − 2 = 6 (cyan wall), while the upward Frougny carry wave (magenta) cascades serially to F₁₇, birthing causal time.'
    ],
    bekenstein: [
      '第 3 阶（全息巨表，MODEL）：把 S = 2^{σn} 比特按全息界 S ≲ A/(4ℓ_P² ln 2) 装进球内，半径 R ∝ 2^{σn/2}，光速往返线延迟 T_wire = 2R/c ∝ 2^{σn/2}；流水线包络 max(1 − σ, σ/2) 在 σ* = 2/3 处取极小 r_min = 1/3 ≈ 0.333。这是启发式模型包络，不是已证的 SAT 下界。',
      'Stage 3 (holographic table, MODEL): packing S = 2^{σn} bits into a ball under the holographic bound S ≲ A/(4ℓ_P² ln 2) gives radius R ∝ 2^{σn/2} and light-speed wire delay T_wire = 2R/c ∝ 2^{σn/2}; the pipelined envelope max(1 − σ, σ/2) has its minimum r_min = 1/3 ≈ 0.333 at σ* = 2/3. This is a heuristic model envelope, not a proved SAT lower bound.'
    ],
    grover: [
      '第 4 阶（二维量子叠加指针）：弃置巨表（σ → 0）以规避黑洞坍缩，改在二维不变平面内相干旋转指针 ∑ αₓ|x⟩，页面取 MODEL 包络 r_Q(σ) = (1 − σ)/2（Klauck–Špalek–de Wolf 证明的是排序的 T²S = Ω(N³)，不是这条曲线）；σ = 0 处它等于 Grover 无结构搜索的指数 0.500，与 σ = 1 的光速线延迟包络 0.500 相等。',
      'Stage 4 (2D quantum superposition pointer): abandoning macroscopic tables (σ → 0) to avoid gravitational collapse, the pointer ∑ αₓ|x⟩ rotates coherently in a 2D invariant plane; the page uses the MODEL envelope r_Q(σ) = (1 − σ)/2 (Klauck–Špalek–de Wolf prove T²S = Ω(N³) for sorting, not this curve). At σ = 0 it equals Grover\'s unstructured-search exponent 0.500, the same value as the σ = 1 wire-delay envelope.'
    ],
    landauer: [
      '第 5 阶（一维退相干指针与兰道尔热）：环境退相干压回一维经典 *ptr 与小型冲突快表 TLB（MODEL 经典包络 r = 1 − σ；σ = 0 时 3-SAT 取 PPSZ 上界 r ≈ 0.386），每次死胡同回溯覆写均须按冻结定理 landauer_bound_of_balance 兑付 β·Q ≥ −ΔS 的擦除热账单。',
      'Stage 5 (1D decohered pointer & Landauer heat): thermal decoherence collapses the pointer to a 1D classical *ptr with a small TLB cache (MODEL classical envelope r = 1 − σ; PPSZ upper bound r ≈ 0.386 for 3-SAT at σ = 0), paying Landauer heat β·Q ≥ −ΔS on every overwritten backtrack bit.'
    ],
    ladder: [
      '七阶全景阶梯（d = 0 ↔ 6）：沿时间轴扫过全部七阶，正向（0 → 6，品红向下箭头）揭示五道物理枷锁如何从 r = 0 步步推高至 r = 1 并派生时空与热；逆向（6 → 0，青色向上箭头）显影生命从白板初态持续建表学习、在零号槽重认 p = *p 的复归。',
      '7-stage degradation ladder (d = 0 ↔ 6): sweeping the rail across all seven stages reads 0 → 6 (magenta downward arrow) as physical limiters pushing r from 0 to 1 while birthing spacetime and heat, and 6 → 0 (cyan upward arrow) as life building tables back to p = *p.'
    ]
  };

  let booting = true;
  function applyPreset(id) {
    const c = CARDS[id];
    stopAt = null;
    S.scene = c.scene; sceneChips.set(c.scene, true);
    S.d = c.d;
    S.sweep = c.sweep;
    stageChips.set(c.sweep ? 'ladder' : String(c.d), true);
    S.regime = c.regime; regimeChips.set(c.regime, true);
    S.wire = c.wire; wireChips.set(c.wire, true);
    setSigmaExact(c.sigma);

    clock.pause();
    clock.set(0);
    if (TRV.still || (booting && !TRV.embed)) {
      clock.set(c.still);
      return;
    }
    stopAt = c.to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }

  const cards = kit.cards($('presets'), {
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: [
      '自由探索：点击 d=0..6 切换退化阶段，在右侧相图内直接横向拖动表空间指数率 σ，或切换黑箱 2ⁿ 与结构化 3-SAT 模型。',
      'Free play: switch stages d=0..6, drag table space fraction σ directly inside the phase diagram, or toggle Black-box 2ⁿ vs Structured 3-SAT.'
    ]
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.LOOKUP_DEBUG = {
    get state() {
      const d = activeStage(), sig = activeSigma();
      const cur = evalStage(d, sig, S.regime, S.wire);
      const opt = holoOptimum(S.regime);
      return {
        scene: S.scene,
        d,
        sweep: S.sweep,
        sigma: S.sigma,
        effSigma: cur.effSigma,
        rEff: cur.rEff,
        regime: S.regime,
        wire: S.wire,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        stopAt,
        preset: cards.current,
        stacked: lastStacked,
        holoOptimum: opt,
        groverAtZero: rQuantumCurve(0, 'blackbox'),
        wireAtOne: rWireCurve(1),
        ppszRate: R_PPSZ,
        qbtRate: R_QBT,
        zeckDemo: ZECK_DEMO
      };
    },
    evalStage,
    rRamCurve,
    rWireCurve,
    rSerialCurve,
    rPipeCurve,
    rQuantumCurve,
    wdigits,
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    phasePointPx: (sig) => {
      paint.now();
      if (!lastPhaseBox) return null;
      const b = $('cv').getBoundingClientRect();
      const { B } = lastPhaseBox;
      return [b.left + B.bx + clamp(sig, 0, 1) * B.bw, b.top + B.by + B.bh * 0.5];
    }
  };

  window.TRV_THUMB = () => {
    S.scene = 'duo'; sceneChips.set('duo', true);
    S.d = 3; S.sweep = false; stageChips.set('3', true);
    S.regime = 'blackbox'; regimeChips.set('blackbox', true);
    S.wire = 'pipelined'; wireChips.set('pipelined', true);
    setSigmaExact(2 / 3);
    clock.pause();
    clock.set(4.2);
    paint.now();
  };

  cards.pick(cards.initial('bekenstein'));
  booting = false;
  paint();
})();
