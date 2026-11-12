/* Quantum Geometry · ORTHO//TRIAD (entanglement-entropy-complexity)
   3D stage-first laboratory for Chapter 30: "量子纠缠、P=NP、熵" (Quantum Entanglement, P=NP, and Entropy).
   Couples a 16-qubit A|Ā tensor network, cross-cut bivector entanglement bridges, a magenta/violet partial-trace
   horizon blade, exact two-body Pythagorean conservation ‖r_A‖² + τ = cos²θ + sin²θ = 1, and Area-vs-Volume cut
   effective bond dimension χ_eff = 2^{S_cut} (distinct from the exact Schmidt rank χ_exact = rank(ρ_A) = 2^{k_cut}
   for 0° < θ < 90°). Colours come strictly from TRV.palette (theme/tokens.json); zero hex literals. */
(function () {
  'use strict';
  const TRV = window.TRV, kit = TRV && TRV.kit;
  if (!TRV || !kit) return;
  const { v3, fix } = kit;
  const DEG = Math.PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const upAscii = (s) => s.replace(/[a-z]+/g, (m) => m.toUpperCase());
  const isEn = () => TRV.lang() === 'en';
  const T = (zh, en) => (isEn() ? en : zh);
  const $ = (id) => document.getElementById(id);

  /* ---------- exact Dottie fixed point cos(θ*) = θ* via 80-step bisection on [0, 1] ---------- */
  const THETA_STAR_RAD = (() => {
    let lo = 0, hi = 1;
    for (let i = 0; i < 80; i++) {
      const mid = 0.5 * (lo + hi);
      if (Math.cos(mid) > mid) lo = mid; else hi = mid;
    }
    return 0.5 * (lo + hi);
  })();
  const THETA_STAR_DEG = THETA_STAR_RAD / DEG; // ≈ 42.346458834°

  /* ---------- exact pure-state & partial-trace mathematics ---------- */
  function binaryEntropyBits(p) {
    if (p <= 1e-15 || p >= 1 - 1e-15) return 0;
    const q = 1 - p;
    return -(p * Math.log2(p) + q * Math.log2(q));
  }

  function metricsAt(thetaDeg, regime, view) {
    const deg = clamp(thetaDeg, 0, 90);
    const rad = deg * DEG;
    const half = 0.5 * rad;
    const cHalf = Math.cos(half), sHalf = Math.sin(half);
    // |ψ(θ)⟩ = cos(θ/2)|00⟩ + sin(θ/2)|11⟩; ρ_A = Tr_Ā|ψ⟩⟨ψ| = diag(pPlus, pMinus)
    const pPlus = cHalf * cHalf;                 // (1 + cos θ)/2
    const pMinus = sHalf * sHalf;                // (1 - cos θ)/2
    const rNorm = Math.cos(rad);                 // ‖r_A‖ = cos θ = pPlus - pMinus
    const rSq = rNorm * rNorm;                   // cos²θ
    const concurrence = Math.sin(rad);           // C = 2 cos(θ/2) sin(θ/2) = sin θ
    const tangle = concurrence * concurrence;    // τ(A:Ā) = C² = sin²θ
    const purity = pPlus * pPlus + pMinus * pMinus;
    const sLinear = 2 * (1 - purity);            // S_L(ρ_A) = 2(1 - Tr(ρ_A²)) ≡ sin²θ
    const pythSum = rSq + tangle;                // cos²θ + sin²θ ≡ 1
    const sVn = binaryEntropyBits(pPlus);        // H_bin((1 + cos θ)/2) in bits
    const kCut = regime === 'area' ? 2 : 8;
    const sCutFull = kCut * sVn;
    // The bipartition A|Ā quantities do not depend on the view: S_cut, χ_eff = 2^{S_cut} and the exact Schmidt rank
    // χ_exact = rank(ρ_A) (they coincide only at θ = 0° and θ = 90°).
    const chiFull = Math.pow(2, sCutFull);
    const schmidtRank = deg <= 1e-7 ? 1 : (1 << kCut);
    // The global pure state |ψ⟩⟨ψ| of AĀ: rank r_global = 1 and S(ρ_AB) = 0, at every θ and in both views.
    const sGlobal = 0, rGlobal = 1;
    // What the current view reads: the cut A|Ā (local) or the global pure state (global). In the global view
    // chiObserved is the global rank r_global = 1, never the bipartition Schmidt rank.
    const sObserved = view === 'local' ? sCutFull : sGlobal;
    const chiObserved = view === 'local' ? chiFull : rGlobal;
    // MODEL: cost of contracting across the cut vs reading the global state coherently (a picture, not a theorem)
    const contractCost = view === 'local' ? 16 * chiFull : 16;
    return {
      thetaDeg: deg, thetaRad: rad, pPlus, pMinus,
      rNorm, rSq, concurrence, tangle, purity, sLinear, pythSum,
      sVn, kCut, sCutFull, sGlobal, rGlobal, sObserved,
      chiFull, chiCut: chiFull, chiObserved, schmidtRank, contractCost
    };
  }

  const DOTTIE_REF = metricsAt(THETA_STAR_DEG, 'area', 'local');

  /* ---------- Spin(3) unit-quaternion camera (slerp between viewpoints) ----------
     In kit.stage3, world-to-camera frame is M(yaw, pitch) = R_z(-yaw) · R_x(-pitch), whose Spin(3) rotor is
     q(yaw, pitch) = q_z(-yaw) ⊗ q_x(-pitch). Applying q (·) q* to [0, -1, 0] yields D = [-sy·cp, -cy·cp, sp]. */
  const quat = {
    mul: (a, b) => [
      a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
      a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
      a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
      a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
    ],
    norm: (q) => {
      const n = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
      return [q[0] / n, q[1] / n, q[2] / n, q[3] / n];
    },
    fromCam(yaw, pitch) {
      const hy = -0.5 * yaw, hp = -0.5 * pitch;
      const qz = [Math.cos(hy), 0, 0, Math.sin(hy)];
      const qx = [Math.cos(hp), Math.sin(hp), 0, 0];
      return quat.norm(quat.mul(qz, qx));
    },
    rotateVec(q, v) {
      const u = [q[1], q[2], q[3]], w = q[0];
      const uv = v3.cross(u, v), uuv = v3.cross(u, uv);
      return v3.add(v, v3.add(v3.scale(uv, 2 * w), v3.scale(uuv, 2)));
    },
    slerp(qa, qb, t) {
      const a = quat.norm(qa);
      let b = quat.norm(qb);
      let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
      if (d < 0) { d = -d; b = [-b[0], -b[1], -b[2], -b[3]]; }
      if (d > 0.99995) {
        return quat.norm([
          a[0] + (b[0] - a[0]) * t,
          a[1] + (b[1] - a[1]) * t,
          a[2] + (b[2] - a[2]) * t,
          a[3] + (b[3] - a[3]) * t
        ]);
      }
      const om = Math.acos(clamp(d, -1, 1)), s = Math.sin(om);
      const ka = Math.sin((1 - t) * om) / s, kb = Math.sin(t * om) / s;
      return quat.norm([
        ka * a[0] + kb * b[0],
        ka * a[1] + kb * b[1],
        ka * a[2] + kb * b[2],
        ka * a[3] + kb * b[3]
      ]);
    },
    toCam(q) {
      const D = quat.rotateVec(q, [0, -1, 0]);
      const pitch = Math.asin(clamp(D[2], -0.998, 0.998));
      const yaw = Math.atan2(-D[0], -D[1]);
      return { yaw, pitch };
    }
  };

  /* ---------- 16-qubit 3D tensor network geometry (8 in A, 8 in Ā) ----------
     Indices 0..3: boundary layer near x = 0; indices 4..7: interior bulk layer.
     Area Law (2-SAT ladder): k_cut = 2 bridges (A_1 ↔ Ā_1 and A_2 ↔ Ā_2) cross x = 0; local rails link interior.
     Volume Law (3-SAT expander): all k_cut = 8 non-local twisted bridges cross x = 0 simultaneously. */
  const NODES_A = [
    [-0.50, -0.60,  0.22], // 0: boundary front-bottom
    [-0.46, -0.20,  0.08], // 1: primary boundary rail 1 (Pythagoras pair)
    [-0.46,  0.22, -0.08], // 2: boundary rail 2
    [-0.50,  0.62, -0.22], // 3: boundary back-top
    [-0.98, -0.52, -0.18], // 4: bulk 0
    [-1.04, -0.17,  0.26], // 5: bulk 1
    [-1.04,  0.20, -0.26], // 6: bulk 2
    [-0.98,  0.55,  0.18]  // 7: bulk 3
  ];
  const NODES_B = NODES_A.map((p) => [-p[0], p[1], p[2]]);

  const INTRA_EDGES = [
    [0, 1], [1, 2], [2, 3],
    [4, 5], [5, 6], [6, 7],
    [0, 4], [1, 5], [2, 6], [3, 7],
    [4, 1], [6, 3]
  ];
  const AREA_BRIDGES = [
    [1, 1],
    [2, 2]
  ];
  const VOLUME_BRIDGES = [
    [1, 1],
    [2, 2],
    [0, 6],
    [3, 5],
    [4, 3],
    [5, 7],
    [6, 0],
    [7, 4]
  ];

  /* ---------- 6 citable experiment cards ---------- */
  const CARDS = {
    pythagoras: {
      regime: 'area', view: 'local', theta: 53.13010235, fromTheta: 12, focusPair: true,
      yaw: 0.44, pitch: 0.28, zoom: 1.04, camKey: 'iso',
      zh: 'θ = 53.13°（3-4-5 直角三角形）处，局部布洛赫长度 cos θ = 0.600，跨割双向量并发度 sin θ = 0.800，平方和 0.360 + 0.640 = 1.000；品红/紫罗兰偏迹刀片将双向量面转化为 A 侧线性熵 τ = 0.640。',
      en: 'At θ = 53.13° (3-4-5 right triangle), local Bloch length cos θ = 0.600 and cross-cut concurrence sin θ = 0.800 satisfy 0.360 + 0.640 = 1.000; the magenta/violet cut turns off-cut area into S_L = 0.640.'
    },
    dottie: {
      regime: 'area', view: 'local', theta: THETA_STAR_DEG, fromTheta: 0, focusPair: true,
      yaw: 0.56, pitch: 0.34, zoom: 1.02, camKey: 'iso',
      zh: '在唯一余弦不动点 cos θ* = θ* ≈ 0.7391（42.35°）处，琥珀色当前点落入青色 θ* 基准环：‖r_A‖² ≈ 0.5462，τ = S_L ≈ 0.4538，S_vN ≈ 0.559 bits，兼顾局部指向与跨界纠缠。',
      en: 'At the unique root cos θ* = θ* ≈ 0.7391 (42.35°), the amber live marker lands in the cyan θ* reference ring: ‖r_A‖² ≈ 0.5462, τ = S_L ≈ 0.4538, S_vN ≈ 0.559 bits, balancing local identity and entanglement.'
    },
    arealaw: {
      regime: 'area', view: 'local', theta: 60, fromTheta: 20, focusPair: false,
      yaw: 0.68, pitch: 0.42, zoom: 0.99, camKey: 'iso',
      zh: 'θ = 60° 时仅 k_cut = 2 条边界桥穿过偏迹刀片，跨割熵 S_cut = 2·S_vN(60°) ≈ 1.623 bits = O(1)，有效键维 χ_eff = 2^{S_cut} ≈ 3.08 保持平缓多项式高度（精确施密特秩 χ_exact = rank(ρ_A) = 2² = 4）。',
      en: 'At θ = 60°, only k_cut = 2 boundary rails cross the cut, keeping S_cut = 2·S_vN(60°) ≈ 1.623 bits = O(1) and effective bond dimension χ_eff = 2^{S_cut} ≈ 3.08 low and polynomial (exact Schmidt rank χ_exact = rank(ρ_A) = 2² = 4).'
    },
    volumelaw: {
      regime: 'volume', view: 'local', theta: 60, fromTheta: 20, focusPair: false,
      yaw: 0.48, pitch: 0.31, zoom: 0.97, camKey: 'iso',
      zh: '保持同一个 θ = 60° 不变，切换至 k_cut = 8 条非局域跨割纠缠桥后，S_cut 跃升 4 倍至 6.490 bits = Θ(n)，三维键维柱暴涨至 χ_eff = 2^{S_cut} ≈ 89.9；精确施密特秩 χ_exact = rank(ρ_A) = 2⁸ = 256，0° < θ < 90° 时 χ_eff 严格小于它。',
      en: 'At the exact same θ = 60°, weaving all k_cut = 8 expander bridges across the cut quadruples S_cut to 6.490 bits = Θ(n) and drives the 3D bond-dimension column to χ_eff = 2^{S_cut} ≈ 89.9; the exact Schmidt rank is χ_exact = rank(ρ_A) = 2⁸ = 256, and χ_eff stays strictly below it for 0° < θ < 90°.'
    },
    bellcut: {
      regime: 'volume', view: 'local', theta: 90, fromTheta: 45, focusPair: false,
      yaw: 0.24, pitch: 0.22, zoom: 0.97, camKey: 'cut',
      zh: 'θ = 90° 最大纠缠下，A 区全部局部布洛赫箭头缩为零点（ρ_A = ½I₂），单比特 S_vN = 1.000 bit，S_cut = 8.000 bits，键维柱触顶 χ_eff = 2^{S_cut} = 256（仅在 θ = 90° 时与精确施密特秩 χ_exact = 2⁸ 相等），对偶区 Ā 隐入偏迹盲区。',
      en: 'At θ = 90°, every local Bloch arrow in A shrinks to zero (ρ_A = ½I₂), single-qubit S_vN = 1.000 bit, S_cut = 8.000 bits, and the χ_eff = 2^{S_cut} column hits 256 (equal to the exact Schmidt rank χ_exact = 2⁸ only at θ = 90°) while Ā fades behind the blind-spot blade.'
    },
    globaljoint: {
      regime: 'volume', view: 'global', theta: 90, fromTheta: 90, focusPair: false,
      yaw: -0.34, pitch: 0.36, zoom: 1.00, camKey: 'iso',
      zh: '同一个 θ = 90° 态，抬升偏迹视界刀片后 A 与 Ā 八桥完整相干发光：全局纯态的秩 r_global = 1、熵 S(ρ_AB) = 0.000 bits；跨割 A|Ā 的精确施密特秩 χ_exact = rank(ρ_A) = 256、有效键维 χ_eff = 2^{S_cut} = 256（θ = 90° 时二者相等）与 S_cut = 8.000 bits 不随视角改变。“全局相干读取 vs 跨割缩并”的代价对比是 MODEL（对照 PostBQP = PP 与 MIP* = RE 边界）。',
      en: 'On the exact same θ = 90° state, lifting the partial-trace blade restores all 8 coherent A↔Ā bridges: the global pure state has rank r_global = 1 and S(ρ_AB) = 0.000 bits, while the exact A|Ā Schmidt rank χ_exact = rank(ρ_A) = 256, the effective dimension χ_eff = 2^{S_cut} = 256 (equal here at θ = 90°) and S_cut = 8.000 bits do not change with the view. The cost contrast "global coherent readout vs contraction across the cut" is a MODEL (contrasted with PostBQP = PP &amp; MIP* = RE).'
    }
  };

  const CAM_PRESETS = {
    iso: { yaw: 0.50, pitch: 0.33, zoom: 1.00 },
    cut: { yaw: 0.12, pitch: 0.20, zoom: 0.98 },
    top: { yaw: 0.32, pitch: 1.18, zoom: 0.96 }
  };

  /* ---------- state ---------- */
  const state = {
    preset: 'pythagoras',
    regime: 'area',
    view: 'local',
    thetaDeg: CARDS.pythagoras.theta,
    blade: 1,          // 1 = descended partial-trace horizon blade; 0 = lifted global window
    focusPair: true,
    camKey: 'iso',
    lastQuat: quat.fromCam(CARDS.pythagoras.yaw, CARDS.pythagoras.pitch)
  };

  let activeTween = null, camTween = null, bladeTween = null, stopAt = null, toastTimer = 0;

  function showToast(msg) {
    const el = $('toast');
    if (!el || TRV.thumbMode || TRV.still) return;
    el.innerHTML = msg;
    el.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 2200);
  }

  /* ---------- 3D stage setup ---------- */
  const stageEl = $('stage');
  const stage = kit.stage3(stageEl, {
    canvas: $('gl'),
    yaw: CARDS.pythagoras.yaw,
    pitch: CARDS.pythagoras.pitch,
    zoom: CARDS.pythagoras.zoom,
    radius: 0.34,
    lineScale: TRV.thumbMode ? 2.0 : 1,
    onChange() {
      state.lastQuat = quat.fromCam(stage.cam.yaw, stage.cam.pitch);
      paint();
    }
  });

  function flyQuatTo(yaw, pitch, zoom, ms) {
    if (camTween) { camTween.cancel(); camTween = null; }
    const q0 = quat.fromCam(stage.cam.yaw, stage.cam.pitch);
    const q1 = quat.fromCam(yaw, pitch);
    const z0 = stage.cam.zoom, z1 = zoom == null ? 1 : zoom;
    if (TRV.still || TRV.reduceMotion || ms <= 0) {
      stage.cam.yaw = yaw; stage.cam.pitch = pitch; stage.cam.zoom = z1;
      state.lastQuat = q1;
      paint();
      return;
    }
    camTween = kit.tween(ms == null ? 520 : ms, (e) => {
      const qe = quat.slerp(q0, q1, e);
      const c = quat.toCam(qe);
      stage.cam.yaw = c.yaw;
      stage.cam.pitch = c.pitch;
      stage.cam.zoom = z0 + (z1 - z0) * e;
      state.lastQuat = qe;
      paint();
    });
  }

  function animateBladeTo(target, ms) {
    if (bladeTween) { bladeTween.cancel(); bladeTween = null; }
    const b0 = state.blade;
    if (TRV.still || TRV.reduceMotion || ms <= 0 || Math.abs(target - b0) < 1e-4) {
      state.blade = target;
      paint();
      return;
    }
    bladeTween = kit.tween(ms == null ? 440 : ms, (e) => {
      state.blade = b0 + (target - b0) * e;
      paint();
    });
  }

  /* ---------- draw 3D tensor network, horizon blade & complexity column ---------- */
  function drawSlab(nodes, isA, M, P, activeSet) {
    const ghost = !isA && state.blade > 0.02;
    const baseAlpha = ghost ? (1 - 0.76 * state.blade) : 1;
    const wireCol = isA ? P.cyan : (ghost ? P.dim : P.violet);

    // Subtle curved slab floor / frame
    const xSign = isA ? -1 : 1;
    const frame = [
      [xSign * 0.36, -0.74, -0.44],
      [xSign * 1.18, -0.74, -0.44],
      [xSign * 1.18,  0.74, -0.44],
      [xSign * 0.36,  0.74, -0.44]
    ];
    stage.poly(frame, {
      fill: TRV.alpha(isA ? P.cyan : P.violet, ghost ? 0.02 : 0.055),
      color: wireCol,
      strokeAlpha: 0.28 * baseAlpha,
      width: 0.9,
      dash: ghost ? [4, 4] : []
    });

    // Intra-slab lattice bonds
    for (const [u, w] of INTRA_EDGES) {
      stage.line(nodes[u], nodes[w], {
        color: wireCol,
        alpha: 0.34 * baseAlpha,
        width: 1.05,
        dash: ghost ? [3, 4] : [],
        fade: false
      });
    }

    // Qubit spheres, local Bloch vectors r_A, and marginal entropy halos
    for (let i = 0; i < nodes.length; i++) {
      const c = nodes[i];
      const bridged = activeSet.has(i);
      const isPrimary = state.focusPair && i === 1;
      const rad = isPrimary ? 0.125 : 0.092;

      // Marginal entropy halo on A when local partial-trace blade is down
      if (isA && bridged && state.blade > 0.04 && M.tangle > 0.01) {
        const haloStrength = state.blade * M.tangle;
        const haloR = rad * (1.28 + 0.72 * haloStrength);
        stage.circle(c, stage.facing(), haloR, {
          color: P.magenta,
          alpha: 0.18 + 0.56 * haloStrength,
          width: isPrimary ? 2.1 : 1.45,
          fade: false,
          n: 44
        });
        if (haloStrength > 0.28) {
          stage.circle(c, stage.facing(), haloR * 1.24, {
            color: P.violet,
            alpha: 0.14 + 0.28 * haloStrength,
            width: 1.0,
            dash: [3, 3],
            fade: false,
            n: 36
          });
        }
      }

      // Equatorial Bloch ring at each qubit
      stage.circle(c, [0, 0, 1], rad, {
        color: wireCol,
        alpha: (bridged ? 0.62 : 0.34) * baseAlpha,
        width: isPrimary ? 1.35 : 0.95,
        dash: ghost ? [3, 3] : [],
        fade: false,
        n: 36
      });

      // Qubit core dot (shrinks to glowing mixed core on A when rNorm -> 0)
      const coreCol = isA
        ? (bridged && state.blade > 0.5 && M.rNorm < 0.12 ? P.magenta : P.cyan)
        : (ghost ? P.dim : P.violet);
      stage.dot(c, isPrimary ? 4.4 : 3.3, coreCol, {
        alpha: (bridged ? 0.95 : 0.65) * baseAlpha,
        glow: bridged && !ghost ? 8 : 0,
        fade: false
      });

      // Local Bloch vector arrow r_A of exact length cos(θ)
      const vecLen = bridged ? M.rNorm : (state.regime === 'area' ? Math.max(0.55, M.rNorm) : M.rNorm);
      if (vecLen > 0.035 && (!ghost || state.blade < 0.85)) {
        const tip = [c[0], c[1], c[2] + rad * 1.55 * vecLen];
        stage.arrow(c, tip, {
          color: isA ? P.cyan : P.violet,
          alpha: (bridged ? 0.96 : 0.52) * baseAlpha,
          width: isPrimary ? 2.3 : 1.55,
          headSize: isPrimary ? 8.5 : 6.5,
          glow: isPrimary && isA ? 8 : 0,
          fade: false
        });
      }
    }
  }

  function drawBridgeHalf(bridges, sideIsA, M, P) {
    const ghostB = !sideIsA && state.blade > 0.02;
    const cutDim = ghostB ? (1 - 0.68 * state.blade) : 1;
    const conc = M.concurrence; // sin θ
    const tang = M.tangle;      // sin²θ
    if (conc < 0.015) {
      // Faint guide hairlines at θ ≈ 0° so cut topology remains legible
      for (const [ia, ib] of bridges) {
        const pa = NODES_A[ia], pb = NODES_B[ib];
        const mid = [0, 0.5 * (pa[1] + pb[1]), 0.5 * (pa[2] + pb[2])];
        stage.line(sideIsA ? pa : mid, sideIsA ? mid : pb, {
          color: P.dim, alpha: 0.22 * cutDim, width: 0.85, dash: [3, 4], fade: false
        });
      }
      return;
    }

    for (let k = 0; k < bridges.length; k++) {
      const [ia, ib] = bridges[k];
      const pa = NODES_A[ia], pb = NODES_B[ib];
      const archZ = 0.08 * Math.sin((k + 1) * 1.3) * conc;
      const mid = [0, 0.5 * (pa[1] + pb[1]), 0.5 * (pa[2] + pb[2]) + archZ];
      const p0 = sideIsA ? pa : mid;
      const p1 = sideIsA ? mid : pb;
      const ctrl = [
        0.5 * (p0[0] + p1[0]),
        0.5 * (p0[1] + p1[1]),
        0.5 * (p0[2] + p1[2]) + 0.05 * conc
      ];
      const pts = [];
      for (let s = 0; s <= 10; s++) {
        const u = s / 10, v = 1 - u;
        pts.push([
          v * v * p0[0] + 2 * v * u * ctrl[0] + u * u * p1[0],
          v * v * p0[1] + 2 * v * u * ctrl[1] + u * u * p1[1],
          v * v * p0[2] + 2 * v * u * ctrl[2] + u * u * p1[2]
        ]);
      }
      const isPrimary = state.focusPair && k === 0;
      const col = state.view === 'global' ? P.cyan : P.magenta;
      const w = (isPrimary ? 1.5 : 1.0) + (isPrimary ? 2.8 : 2.1) * conc;
      stage.path(pts, {
        color: col,
        alpha: (0.28 + 0.68 * (0.45 * conc + 0.55 * tang)) * cutDim,
        width: w,
        dash: ghostB && state.blade > 0.55 ? [5, 4] : [],
        fade: false
      });

      // Outer-product bivector area ribbon e_A ∧ e_Ā near the bridge
      if (sideIsA && conc > 0.12 && (isPrimary || bridges.length <= 2 || k % 2 === 0)) {
        const halfSpan = (isPrimary ? 0.085 : 0.052) * conc;
        const cMid = pts[6];
        const patch = [
          [cMid[0] - halfSpan, cMid[1], cMid[2] - halfSpan * 0.7],
          [cMid[0] + halfSpan, cMid[1] + halfSpan * 0.45, cMid[2] - halfSpan * 0.3],
          [cMid[0] + halfSpan, cMid[1], cMid[2] + halfSpan * 0.7],
          [cMid[0] - halfSpan, cMid[1] - halfSpan * 0.45, cMid[2] + halfSpan * 0.3]
        ];
        stage.poly(patch, {
          fill: TRV.alpha(state.view === 'global' ? P.cyan : P.magenta, 0.12 + 0.22 * tang),
          color: state.view === 'global' ? P.cyan : P.violet,
          strokeAlpha: 0.48 * conc,
          width: 0.9
        });
      }
    }
  }

  function drawHorizonBlade(bridges, M, P) {
    // Horizon blade strictly uses magenta and violet tokens only (never red).
    const drop = state.blade; // 1 = full cut at z ∈ [-0.52, 0.52]; 0 = lifted header bezel at z ≈ 0.68
    const zTop = 0.54 + (1 - drop) * 0.22;
    const zBot = -0.50 + (1 - drop) * 1.18;
    const ySpan = 0.84;

    if (drop < 0.04) {
      // Retracted global-view canopy bar above the joint pure state
      const bar = [
        [0, -ySpan, 0.66],
        [0,  ySpan, 0.66],
        [0,  ySpan, 0.73],
        [0, -ySpan, 0.73]
      ];
      stage.poly(bar, {
        fill: TRV.alpha(P.violet, 0.10),
        color: P.violet,
        strokeAlpha: 0.55,
        width: 1.1,
        dash: [4, 4]
      });
      // Coherent stationary-phase arch across A ↔ Ā when blade is lifted
      const arch = [];
      for (let i = 0; i <= 28; i++) {
        const u = -1 + 2 * (i / 28);
        arch.push([0.92 * u, 0, 0.46 + 0.16 * (1 - u * u)]);
      }
      stage.path(arch, { color: P.cyan, alpha: 0.72, width: 1.6, fade: false });
      return;
    }

    const quad = [
      [0, -ySpan, zBot],
      [0,  ySpan, zBot],
      [0,  ySpan, zTop],
      [0, -ySpan, zTop]
    ];
    stage.poly(quad, {
      fill: TRV.alpha(P.violet, 0.13 * drop),
      color: P.magenta,
      strokeAlpha: 0.78 * drop,
      width: 1.5
    });

    // Subtle interior violet scanlines on the x = 0 partial-trace plane
    for (let g = 1; g <= 3; g++) {
      const z = zBot + (zTop - zBot) * (g / 4);
      stage.line([0, -ySpan, z], [0, ySpan, z], {
        color: P.violet, alpha: 0.26 * drop, width: 0.85, dash: [4, 4], fade: false
      });
    }
    for (const yy of [-0.42, 0, 0.42]) {
      stage.line([0, yy, zBot], [0, yy, zTop], {
        color: P.violet, alpha: 0.22 * drop, width: 0.8, fade: false
      });
    }

    // Glowing magenta severance rings where active bridges pierce x = 0
    if (M.concurrence > 0.03) {
      for (let k = 0; k < bridges.length; k++) {
        const [ia, ib] = bridges[k];
        const pa = NODES_A[ia], pb = NODES_B[ib];
        const archZ = 0.08 * Math.sin((k + 1) * 1.3) * M.concurrence;
        const hit = [0, 0.5 * (pa[1] + pb[1]), 0.5 * (pa[2] + pb[2]) + archZ];
        if (hit[2] >= zBot - 0.04 && hit[2] <= zTop + 0.04) {
          stage.circle(hit, [1, 0, 0], 0.038 + 0.045 * M.concurrence, {
            color: P.magenta,
            alpha: (0.42 + 0.52 * M.tangle) * drop,
            width: 1.5,
            fade: false,
            n: 28
          });
          stage.dot(hit, 2.8, P.magenta, { alpha: 0.9 * drop, glow: 7, fade: false });
        }
      }
    }
  }

  function drawPythagoreanGauge(M, P) {
    // 3D orthogonal right-triangle gauge above observer slab A:
    // horizontal leg = cos θ (cyan), vertical leg = sin θ (magenta), hypotenuse = 1 (sigma/ink), live tip = amber.
    const o = [-0.88, -0.02, 0.44];
    const scale = 0.38;
    const pCos = [o[0] + scale * M.rNorm, o[1], o[2]];
    const pTip = [o[0] + scale * M.rNorm, o[1], o[2] + scale * M.concurrence];

    // Quarter-circle unit arc (radius = scale) + Dottie θ* static cyan ring
    const arcPts = [];
    for (let i = 0; i <= 24; i++) {
      const a = (Math.PI / 2) * (i / 24);
      arcPts.push([o[0] + scale * Math.cos(a), o[1], o[2] + scale * Math.sin(a)]);
    }
    stage.path(arcPts, { color: P.lineHot, alpha: 0.68, width: 1.05, dash: [3, 3], fade: false });

    const pStar = [o[0] + scale * Math.cos(THETA_STAR_RAD), o[1], o[2] + scale * Math.sin(THETA_STAR_RAD)];
    stage.dot(pStar, 4.2, P.cyan, { ring: true, width: 1.6, alpha: 0.92, fade: false });

    // Filled right-triangle face
    if (M.rNorm > 0.02 && M.concurrence > 0.02) {
      stage.poly([o, pCos, pTip], {
        fill: TRV.alpha(P.cyan, state.focusPair ? 0.14 : 0.08),
        color: P.sigma,
        strokeAlpha: 0.35,
        width: 0.9
      });
    }
    stage.line(o, pCos, { color: P.cyan, alpha: 0.95, width: state.focusPair ? 2.3 : 1.7, fade: false });
    stage.line(pCos, pTip, { color: P.magenta, alpha: 0.95, width: state.focusPair ? 2.3 : 1.7, fade: false });
    stage.line(o, pTip, { color: P.sigma, alpha: 0.85, width: 1.35, fade: false });

    // Right-angle square corner at pCos
    if (M.rNorm > 0.09 && M.concurrence > 0.09) {
      const sq = 0.036;
      stage.path([
        [pCos[0] - sq, pCos[1], pCos[2]],
        [pCos[0] - sq, pCos[1], pCos[2] + sq],
        [pCos[0], pCos[1], pCos[2] + sq]
      ], { color: P.dim, alpha: 0.8, width: 1.0, fade: false });
    }
    // Live active θ marker strictly in --amber
    stage.dot(pTip, state.focusPair ? 4.8 : 3.8, P.amber, { glow: 10, fade: false });
    return pTip;
  }

  function drawComplexityColumn(M, P) {
    // 3D prism column at front of cut (MODEL cost picture): height encodes the cut-contraction cost log₂χ_eff / 8 ∈ [0, 1];
    // it folds away as the blade lifts (no cut is contracted), while χ_eff itself is unchanged
    const cx = -0.16, cy = -0.88, zBase = -0.46, maxH = 0.96, hw = 0.085;
    const sEff = M.sCutFull * state.blade; // smoothly collapses to 0 as blade lifts!
    const frac = clamp(sEff / 8, 0.025, 1);
    const zTop = zBase + maxH * frac;
    const isWall = state.regime === 'volume' && state.blade > 0.35 && M.sCutFull > 2.2;
    const col = state.blade < 0.15 ? P.cyan : (isWall ? P.magenta : P.cyan);
    const edgeCol = isWall ? P.violet : P.cyan;

    const b0 = [cx - hw, cy - hw, zBase], b1 = [cx + hw, cy - hw, zBase],
          b2 = [cx + hw, cy + hw, zBase], b3 = [cx - hw, cy + hw, zBase];
    const t0 = [cx - hw, cy - hw, zTop],  t1 = [cx + hw, cy - hw, zTop],
          t2 = [cx + hw, cy + hw, zTop],  t3 = [cx - hw, cy + hw, zTop];

    // Reference max-height wireframe cage (χ = 256, S_cut = 8 bits)
    const m0 = [cx - hw, cy - hw, zBase + maxH], m1 = [cx + hw, cy - hw, zBase + maxH];
    stage.line(b0, m0, { color: P.panelEdge, alpha: 0.55, width: 0.85, dash: [2, 3], fade: false });
    stage.line(b1, m1, { color: P.panelEdge, alpha: 0.55, width: 0.85, dash: [2, 3], fade: false });
    stage.line(m0, m1, { color: P.panelEdge, alpha: 0.55, width: 0.85, dash: [2, 3], fade: false });

    // Prism faces
    stage.poly([b0, b1, t1, t0], { fill: TRV.alpha(col, 0.24), color: edgeCol, strokeAlpha: 0.88, width: 1.3 });
    stage.poly([b1, b2, t2, t1], { fill: TRV.alpha(col, 0.16), color: edgeCol, strokeAlpha: 0.72, width: 1.1 });
    stage.poly([t0, t1, t2, t3], { fill: TRV.alpha(col, 0.36), color: col, strokeAlpha: 0.95, width: 1.4 });

    // Logarithmic rung ticks at S_cut = 2 (χ=4), 4 (χ=16), 6 (χ=64)
    for (const sTick of [2, 4, 6]) {
      const zz = zBase + maxH * (sTick / 8);
      if (zz < zTop - 0.02) {
        stage.line([cx - hw, cy - hw, zz], [cx + hw, cy - hw, zz], {
          color: P.sigma, alpha: 0.45, width: 0.9, fade: false
        });
      }
    }
    return [cx, cy, zTop + 0.08];
  }

  function placeNonOverlappingTags(items) {
    if (TRV.thumbMode) return;
    const W = stage.W, H = stage.H;
    if (W < 180 || H < 160) return;
    const topSafe = W <= 560 ? 94 : 66;
    const botSafe = H - 40;
    const placed = [];
    for (const it of items) {
      const q = stage.p(it.world);
      let x = clamp(q[0] + (it.dx || 0), 74, W - 74);
      let y = clamp(q[1] + (it.dy || 0), topSafe, botSafe);
      for (let pass = 0; pass < 6; pass++) {
        for (const p of placed) {
          const ox = Math.abs(x - p.x), oy = Math.abs(y - p.y);
          const minX = 0.5 * (it.w + p.w) + 10, minY = 30;
          if (ox < minX && oy < minY) {
            y = y >= p.y ? Math.min(botSafe, p.y + minY) : Math.max(topSafe, p.y - minY);
            if (Math.abs(y - p.y) < minY - 2) {
              x = x >= p.x ? Math.min(W - 74, p.x + minX * 0.65) : Math.max(74, p.x - minX * 0.65);
            }
          }
        }
      }
      placed.push({ x, y, w: it.w });
      stage.tag(it.key, [x, y], it.html, it.cls, { screen: true, fade: false });
    }
  }

  function drawStage(M, P) {
    stage.begin();
    const bridges = state.regime === 'area' ? AREA_BRIDGES : VOLUME_BRIDGES;
    const activeA = new Set(bridges.map((b) => b[0]));
    const activeB = new Set(bridges.map((b) => b[1]));
    const aInFront = stage.facing()[0] <= 0;

    if (aInFront) {
      drawSlab(NODES_B, false, M, P, activeB);
      drawBridgeHalf(bridges, false, M, P);
      drawHorizonBlade(bridges, M, P);
      drawBridgeHalf(bridges, true, M, P);
      drawSlab(NODES_A, true, M, P, activeA);
    } else {
      drawSlab(NODES_A, true, M, P, activeA);
      drawBridgeHalf(bridges, true, M, P);
      drawHorizonBlade(bridges, M, P);
      drawBridgeHalf(bridges, false, M, P);
      drawSlab(NODES_B, false, M, P, activeB);
    }

    drawPythagoreanGauge(M, P);
    const colAnchor = drawComplexityColumn(M, P);

    const chiDisp = M.chiCut >= 10 ? fix(M.chiCut, 1) : fix(M.chiCut, 2);
    placeNonOverlappingTags([
      {
        key: 'slabA',
        world: [-0.96, 0.56, -0.44],
        dy: 12,
        w: 128,
        cls: 'cy num',
        html: T(`观察者 A · ‖r_A‖=${fix(M.rNorm, 2)}`, `Observer A · ‖r_A‖=${fix(M.rNorm, 2)}`)
      },
      {
        key: 'blade',
        world: [0, 0.66, state.blade > 0.25 ? 0.54 : 0.72],
        dy: -10,
        w: 148,
        cls: state.view === 'local' ? 'mg num' : 'cy num',
        html: state.view === 'local'
          ? T(`偏迹视界 Tr_Ā · k=${M.kCut}`, `Cut Tr_Ā · k=${M.kCut}`)
          : T('刀片抬升 · S(ρ_AB)=0', 'Lifted · S(ρ_AB)=0')
      },
      {
        key: 'slabB',
        world: [1.04, 0.60, -0.22],
        dy: -6,
        w: 132,
        cls: state.view === 'local' ? 'num' : 'cy num',
        html: state.view === 'local'
          ? T('对偶 Ā（盲区）', 'Dual Ā (blind spot)')
          : T('对偶 Ā（相干）', 'Dual Ā (coherent)')
      },
      {
        key: 'chi',
        world: colAnchor,
        dy: -8,
        w: state.view === 'local' ? 120 : 176,
        cls: 'hot num',
        html: state.view === 'local' ? `χ_eff = ${chiDisp}` : `r_global = 1 · χ_eff = ${chiDisp}`
      }
    ]);
    stage.end();
  }

  /* ---------- synchronized 2D plots (#plot and #plotWall) ---------- */
  const CURVE_SAMPLES = (() => {
    const rSq = [], tangle = [], sum = [], sVn = [], chiArea = [], chiVol = [];
    for (let i = 0; i <= 90; i += 1) {
      const mA = metricsAt(i, 'area', 'local');
      const mV = metricsAt(i, 'volume', 'local');
      rSq.push([i, mA.rSq]);
      tangle.push([i, mA.tangle]);
      sum.push([i, mA.pythSum]);
      sVn.push([i, mA.sVn]);
      chiArea.push([i, mA.chiFull]);
      chiVol.push([i, mV.chiFull]);
    }
    return { rSq, tangle, sum, sVn, chiArea, chiVol };
  })();

  function drawPythagoreanPlot(M, P) {
    const cv = $('plot');
    if (!cv || !cv.clientWidth || !cv.clientHeight) return;
    $('pATitle').textContent = T('勾股守恒与边缘熵', 'PYTHAGORAS & MARGINAL ENTROPY');
    $('pAMeta').textContent = `‖r_A‖² + τ = ${fix(M.pythSum, 4)} · S_vN = ${fix(M.sVn, 3)} bits`;

    const g = kit.plot(cv, { x: [0, 90], y: [0, 1.44], pad: [36, 14, 10, 22] });
    g.axes({
      xTicks: [[0, '0°'], [THETA_STAR_DEG, 'θ*'], [60, '60°'], [90, '90°']],
      yTicks: [[0, '0'], [0.5, '0.5'], [1, '1.0']],
      xGrid: true
    });

    // Exact sum = 1 invariant line
    g.hline(1, P.sigma, { alpha: 0.55, width: 1.2, dash: [4, 3] });
    g.area(CURVE_SAMPLES.tangle, P.magenta, { alpha: 0.10 });
    g.line(CURVE_SAMPLES.rSq, P.cyan, { width: 2.0 });
    g.line(CURVE_SAMPLES.tangle, P.magenta, { width: 2.0 });
    g.line(CURVE_SAMPLES.sVn, P.violet, { width: 1.7, dash: [5, 3] });

    // Static θ* reference: STRICTLY --cyan open ring (NEVER --amber!)
    g.vline(THETA_STAR_DEG, P.cyan, { alpha: 0.35, width: 1, dash: [2, 3] });
    g.dot(THETA_STAR_DEG, DOTTIE_REF.rSq, P.cyan, 4.8, { ring: true, width: 1.6 });
    g.dot(THETA_STAR_DEG, DOTTIE_REF.tangle, P.cyan, 4.8, { ring: true, width: 1.6 });
    g.dot(THETA_STAR_DEG, DOTTIE_REF.sVn, P.cyan, 4.8, { ring: true, width: 1.6 });

    // Live active θ marker: STRICTLY --amber!
    g.vline(M.thetaDeg, P.amber, { alpha: 0.72, width: 1.2 });
    g.dot(M.thetaDeg, M.rSq, P.amber, 4.0, { glow: 8 });
    g.dot(M.thetaDeg, M.tangle, P.amber, 4.0, { glow: 8 });
    g.dot(M.thetaDeg, M.sVn, P.amber, 3.6, { glow: 6 });

    g.legend([
      [P.cyan, T('‖r_A‖²=cos²θ', '‖r_A‖²=cos²θ')],
      [P.magenta, T('τ=S_L=sin²θ', 'τ=S_L=sin²θ')],
      [P.violet, T('S_vN (bits)', 'S_vN (bits)'), 'dash']
    ], { right: true });
  }

  function drawComplexityPlot(M, P) {
    const cv = $('plotWall');
    if (!cv || !cv.clientWidth || !cv.clientHeight) return;
    $('pBTitle').textContent = T('面积律 vs 体积律跨割键维', 'AREA VS VOLUME BOND DIMENSION');
    const chiTxt = M.chiCut >= 10 ? fix(M.chiCut, 1) : fix(M.chiCut, 2);
    $('pBMeta').textContent = state.view === 'local'
      ? `S_cut = ${fix(M.sCutFull, 2)} bits · χ_eff = ${chiTxt}`
      : `S(ρ_AB) = 0 · r_global = 1 · χ_eff = ${chiTxt}`;

    // Plot log₂(χ_eff) = S_cut ∈ [0, 8] so both O(1) Area Law (≤ 2) and Θ(n) Volume Law (≤ 8, χ = 256) read cleanly
    const g = kit.plot(cv, { x: [0, 90], y: [0, 8.6], pad: [44, 14, 10, 22] });
    g.axes({
      xTicks: [[0, '0°'], [THETA_STAR_DEG, 'θ*'], [60, '60°'], [90, '90°']],
      yTicks: [[0, 'χ=1'], [2, 'χ=4'], [4, 'χ=16'], [8, 'χ=256']],
      xGrid: true
    });

    const areaPts = CURVE_SAMPLES.sVn.map(([x, s]) => [x, 2 * s]);
    const volPts = CURVE_SAMPLES.sVn.map(([x, s]) => [x, 8 * s]);

    g.area(volPts, P.magenta, { alpha: state.view === 'local' && state.regime === 'volume' ? 0.16 : 0.06 });
    g.line(volPts, P.magenta, {
      width: state.regime === 'volume' && state.view === 'local' ? 2.3 : 1.5,
      alpha: state.view === 'local' ? 0.95 : 0.42
    });
    g.line(areaPts, P.cyan, {
      width: state.regime === 'area' && state.view === 'local' ? 2.3 : 1.5,
      alpha: state.view === 'local' ? 0.95 : 0.42
    });
    // Global view: a separate reference line for the global pure state (rank 1, S(ρ_AB) = 0); the curves above stay
    // the A|Ā bipartition, which does not change with the view
    if (state.view === 'global') {
      g.hline(0, P.cyan, { width: 2.2, alpha: 0.95, dash: [5, 4] });
      if (!TRV.thumbMode) g.text(88, 0, T('全局纯态 r_global = 1 · S(ρ_AB) = 0', 'global pure r_global = 1 · S(ρ_AB) = 0'), P.cyan, { align: 'right', dy: -9, size: 9.5 });
    }

    // Static θ* cyan ring on the active topology curve
    const starY = (state.regime === 'area' ? 2 : 8) * DOTTIE_REF.sVn;
    g.vline(THETA_STAR_DEG, P.cyan, { alpha: 0.32, width: 1, dash: [2, 3] });
    g.dot(THETA_STAR_DEG, starY, P.cyan, 4.8, { ring: true, width: 1.6 });

    // Live active θ marker in --amber, on the A|Ā curve in both views (S_cut is view-independent)
    const liveY = M.sCutFull;
    g.vline(M.thetaDeg, P.amber, { alpha: 0.72, width: 1.2 });
    g.dot(M.thetaDeg, liveY, P.amber, 4.3, { glow: 9 });

    g.legend([
      [P.magenta, T('体积律 k=8 (3-SAT)', 'Volume k=8 (3-SAT)')],
      [P.cyan, T('面积律 k=2 (2-SAT)', 'Area k=2 (2-SAT)')]
    ], { right: false });
  }

  /* ---------- interactive scrubbing on both 2D plots ---------- */
  function bindPlotScrub(cv) {
    if (!cv) return;
    let down = false;
    const pick = (ev) => {
      const r = cv.getBoundingClientRect();
      const pl = cv.id === 'plotWall' ? 44 : 36, pr = 14;
      const u = clamp((ev.clientX - r.left - pl) / Math.max(1, r.width - pl - pr), 0, 1);
      leave();
      clock.set(u * 90);
    };
    cv.addEventListener('pointerdown', (ev) => {
      down = true;
      try { cv.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic event */ }
      pick(ev);
    });
    cv.addEventListener('pointermove', (ev) => { if (down) pick(ev); });
    const end = () => { down = false; };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
  }

  /* ---------- HUD, legend & side readouts ---------- */
  function syncChips(rootId, attr, val) {
    const box = $(rootId);
    if (!box) return;
    box.querySelectorAll(`[${attr}]`).forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute(attr) === val));
    });
  }

  function activeAngleKey(deg) {
    if (Math.abs(deg - 0) < 0.12) return '0';
    if (Math.abs(deg - THETA_STAR_DEG) < 0.15) return 'dottie';
    if (Math.abs(deg - 60) < 0.12) return '60';
    if (Math.abs(deg - 90) < 0.12) return '90';
    return '';
  }

  function updateUI(M) {
    const degStr = `${fix(M.thetaDeg, 2)}°`;
    const isStar = Math.abs(M.thetaDeg - THETA_STAR_DEG) < 0.15;
    const thetaBadge = isStar ? `θ* ≈ ${fix(M.thetaDeg, 2)}°` : `θ = ${degStr}`;

    $('pillView').innerHTML = `${T('视角', 'VIEW')} <strong>${state.view === 'local' ? T('偏迹 Tr_Ā', 'LOCAL CUT') : T('全局纯态', 'GLOBAL PURE')}</strong>`;
    $('pillRegime').innerHTML = `${T('拓扑', 'TOPOLOGY')} <strong>${state.regime === 'area' ? 'AREA (k=2)' : 'VOLUME (k=8)'}</strong>`;
    $('pillTheta').innerHTML = `<strong>${thetaBadge}</strong>`;

    $('oTheta').textContent = degStr;
    $('thetaInput').value = String(M.thetaDeg);

    syncChips('viewChips', 'data-view', state.view);
    syncChips('regimeChips', 'data-regime', state.regime);
    syncChips('stageChips', 'data-qview', state.view);
    syncChips('stageChips', 'data-qreg', state.regime);
    syncChips('angleChips', 'data-angle', activeAngleKey(M.thetaDeg));
    syncChips('camChips', 'data-cam', state.camKey);

    const viewTitle = state.view === 'local'
      ? (state.regime === 'area' ? T('局部偏迹 · 面积律导向场', 'Local cut · Area-law field') : T('局部偏迹 · 体积律指数墙', 'Local cut · Volume-law wall'))
      : T('全局无时间纯态 · 刀片抬升', 'Global pure state · Blade lifted');

    $('hudBig').textContent = upAscii(`${thetaBadge} · ${viewTitle}`);
    const chiCutTxt = M.chiCut >= 10 ? fix(M.chiCut, 1) : fix(M.chiCut, 2);
    $('hudSub').textContent = state.view === 'local'
      ? `‖r_A‖²=${fix(M.rSq, 3)} + τ=${fix(M.tangle, 3)} = 1 · S_vN=${fix(M.sVn, 3)} bits · χ_eff=${chiCutTxt}`
      : `‖r_A‖²=${fix(M.rSq, 3)} + τ=${fix(M.tangle, 3)} = 1 · S(ρ_AB)=0 · r_global=1 · χ_eff=${chiCutTxt}`;

    $('legend').innerHTML = [
      `<span><i class="sw cy"></i>${T('局域向量 r_A (cos θ) 与 θ* 基准环', 'Local vector r_A (cos θ) &amp; θ* ring')}</span>`,
      `<span><i class="sw mg"></i>${T('跨割纠缠桥 (sin θ) 与偏迹视界刀片', 'Cross-cut bridges (sin θ) &amp; cut blade')}</span>`,
      `<span><i class="sw am"></i>${T('当前施密特角 θ', 'Active angle θ')}</span>`
    ].join('');

    $('roAside').textContent = `${degStr} · k=${M.kCut}`;
    $('roKeyL').textContent = T('勾股守恒与观测切面熵', 'Pythagorean sum & observed entropy');
    $('roKey').textContent = state.view === 'local'
      ? `S_cut = ${fix(M.sCutFull, 3)} bits  (χ_eff = ${chiCutTxt})`
      : `S(ρ_AB) = 0.000 bits  (r_global = 1)`;
    $('roKeySub').textContent = `‖r_A‖² + τ(A:Ā) = ${fix(M.rSq, 4)} + ${fix(M.tangle, 4)} = ${fix(M.pythSum, 4)}`;

    $('roL1').textContent = T('局域确定性 ‖r_A‖² = cos²θ', 'Local weight ‖r_A‖² = cos²θ');
    $('ro1').textContent = `${fix(M.rSq, 4)}  (‖r_A‖ = ${fix(M.rNorm, 4)})`;

    $('roL2').textContent = T('二体纠缠度 τ = S_L = sin²θ', '2-tangle τ = S_L = sin²θ');
    $('ro2').textContent = `${fix(M.tangle, 4)}  (C = ${fix(M.concurrence, 4)})`;

    $('roL3').textContent = T('单比特 S_vN(ρ_A)', '1-qubit S_vN(ρ_A)');
    $('ro3').textContent = `${fix(M.sVn, 3)} bits`;

    $('roL4').textContent = T('纯度 Tr(ρ_A²)', 'Purity Tr(ρ_A²)');
    $('ro4').textContent = fix(M.purity, 4);

    // the bipartition A|Ā row is the same in both views; the global view adds the global rank beside it
    // χ_eff = 2^{S_cut} is an entropy effective dimension; the exact Schmidt rank χ_exact = rank(ρ_A) is shown beside it
    $('roL5').textContent = T('跨割 A|Ā 有效键维 χ_eff = 2^{S_cut}', 'A|Ā effective bond dim χ_eff = 2^{S_cut}');
    $('ro5').textContent = `${fix(M.chiFull, 2)}  (${T('精确施密特秩', 'exact Schmidt rank')} χ_exact = rank(ρ_A) = ${M.schmidtRank}, k_cut = ${M.kCut}, S_cut = ${fix(M.sCutFull, 3)} bits)`
      + (state.view === 'local' ? '' : ` · ${T('全局', 'global')} r_global = 1, S(ρ_AB) = 0`);

    $('roL6').textContent = T('复杂度切面诠释（MODEL / OPEN 边界）', 'Complexity slice (MODEL / OPEN boundary)');
    $('ro6').textContent = state.view === 'global'
      ? T('全局纯态 HΨ=0：r_global=1、S(ρ_AB)=0，χ_eff 与 χ_exact 不变；“相干联合读取 O(n) vs 跨割缩并 2^{S_cut}”的代价对比是 MODEL（PostBQP=PP、MIP*=RE 为文献结果）', 'Global pure HΨ=0: r_global=1, S(ρ_AB)=0, χ_eff and χ_exact unchanged; the cost contrast "coherent joint readout O(n) vs contracting the cut 2^{S_cut}" is a MODEL (PostBQP=PP, MIP*=RE are literature results)')
      : (state.regime === 'area'
        ? T('MODEL · 面积律 k_cut=2：S_cut=O(1)，多项式键维导向场（类比 2-SAT ∈ P）', 'MODEL · Area law k_cut=2: S_cut=O(1), polynomial bond guiding field (2-SAT ∈ P analogy)')
        : T('MODEL · 体积律 k_cut=8：S_cut=Θ(n)，指数键维墙 χ=2^{Θ(n)}（类比局部 3-SAT 墙；图灵 P≠NP 仍 OPEN）', 'MODEL · Volume law k_cut=8: S_cut=Θ(n), exponential wall χ=2^{Θ(n)} (local 3-SAT wall; Turing P≠NP OPEN)'));

    $('roNote').textContent = isStar
      ? T('当前正处于余弦不动点 θ* ≈ 0.7391 rad（42.35°）：cos θ* = θ*，单比特边缘冯·诺依曼熵 S_vN(θ*) ≈ 0.559 bits（五位小数 0.55869）。', 'At Dottie fixed point θ* ≈ 0.7391 rad (42.35°): cos θ* = θ*, single-qubit marginal entropy S_vN(θ*) ≈ 0.559 bits (0.55869 to 5 decimals).')
      : T('拖动底部滑轨、上方小图或三维舞台旋转视角；按 V 升降偏迹刀片，按 T 切换面积律与体积律。', 'Drag the bottom rail, the strip plots, or orbit the 3D stage; press V to toggle the horizon blade and T to switch Area vs Volume topology.');
  }

  /* ---------- master painter ---------- */
  const paint = kit.painter(() => {
    const P = TRV.palette;
    const M = metricsAt(state.thetaDeg, state.regime, state.view);
    drawStage(M, P);
    drawPythagoreanPlot(M, P);
    drawComplexityPlot(M, P);
    updateUI(M);
  }, [stageEl, $('plot'), $('plotWall')]);

  /* ---------- bottom rail clock over θ ∈ [0°, 90°] ---------- */
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    label: $('tau'),
    speeds: $('speedChips'),
    max: 90,
    step: 0.5,
    rate: 18,
    loop: false,
    keys: false,
    t: state.thetaDeg,
    format: (t) => `θ = ${fix(t, 2)}° <small>/ 90°</small>`,
    onChange(t) {
      state.thetaDeg = clamp(t, 0, 90);
      if (stopAt != null && clock.playing && state.thetaDeg >= stopAt - 1e-6) {
        const target = stopAt;
        stopAt = null;
        clock.pause();
        clock.set(target, true);
        state.thetaDeg = target;
      }
      paint();
    }
  });

  function cancelCardTween() {
    if (activeTween) { activeTween.cancel(); activeTween = null; }
  }

  function leave() {
    stopAt = null;
    cancelCardTween();
    clock.pause();
    if (cards) cards.mark(null);
  }

  /* ---------- experiment cards controller ---------- */
  const CARD_NOTES = Object.fromEntries(
    Object.entries(CARDS).map(([k, c]) => [k, [c.zh, c.en]])
  );
  const cards = kit.cards($('presets'), {
    notes: CARD_NOTES,
    noteEl: $('presetNote'),
    idle: [
      '<b>自由探索</b>：拖动施密特角 θ、切换面积律/体积律或升降偏迹刀片；点击任一实验卡回到命名场景。',
      '<b>Free exploration</b>: scrub Schmidt angle θ, switch Area vs Volume topology, or lift/lower the horizon blade; pick any card to return.'
    ],
    tour: $('tour'),
    onPick(id) {
      const card = CARDS[id];
      if (!card) return;
      cancelCardTween();
      stopAt = null;
      clock.pause();
      state.preset = id;
      state.regime = card.regime;
      state.view = card.view;
      state.focusPair = !!card.focusPair;
      state.camKey = card.camKey || '';
      const targetBlade = card.view === 'local' ? 1 : 0;

      flyQuatTo(card.yaw, card.pitch, card.zoom, 520);
      animateBladeTo(targetBlade, 460);

      const tStart = card.fromTheta != null ? card.fromTheta : state.thetaDeg;
      const tEnd = card.theta;
      if (TRV.still || TRV.reduceMotion || Math.abs(tEnd - tStart) < 1e-4) {
        clock.set(tEnd);
        paint.now();
      } else {
        clock.set(tStart, true);
        state.thetaDeg = tStart;
        activeTween = kit.tween(520, (e) => {
          const cur = tStart + (tEnd - tStart) * e;
          clock.set(cur, true);
          state.thetaDeg = cur;
          paint();
        });
      }
    }
  });

  /* ---------- control bindings ---------- */
  $('rew').addEventListener('click', () => {
    leave();
    clock.set(0);
  });

  $('now').addEventListener('pointerdown', () => {
    stopAt = null;
    cancelCardTween();
    cards.mark(null);
  });

  $('thetaInput').addEventListener('input', (ev) => {
    leave();
    clock.set(parseFloat(ev.target.value) || 0);
  });

  function setView(v) {
    if (v !== 'local' && v !== 'global') return;
    leave();
    state.view = v;
    animateBladeTo(v === 'local' ? 1 : 0, 420);
    showToast(v === 'local'
      ? T('<b>偏迹视界降下</b>：遮蔽对偶区 Ā，双向量面化为局部熵与键维墙', '<b>Horizon blade lowered</b>: Ā enters blind spot; cross-cut area turns into local entropy')
      : T('<b>偏迹视界抬起</b>：全局无时间纯态 HΨ = 0，r_global = 1、S(ρ_AB) = 0 bits；χ_eff、χ_exact 与 S_cut 不变', '<b>Horizon blade lifted</b>: global pure state HΨ = 0, r_global = 1, S(ρ_AB) = 0 bits; χ_eff, χ_exact and S_cut unchanged'));
    paint();
  }

  function setRegime(r) {
    if (r !== 'area' && r !== 'volume') return;
    leave();
    state.regime = r;
    state.focusPair = false;
    showToast(r === 'area'
      ? T('<b>面积律 (k_cut = 2)</b>：边界局部纠缠，S_cut = O(1)，多项式键维', '<b>Area Law (k_cut = 2)</b>: boundary bridges only, S_cut = O(1), polynomial χ_eff')
      : T('<b>体积律 (k_cut = 8)</b>：全区跨割纠缠网，S_cut = Θ(n)，指数键维墙', '<b>Volume Law (k_cut = 8)</b>: 8 expander bridges across cut, S_cut = Θ(n), exponential χ_eff'));
    paint();
  }

  $('viewChips').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-view]');
    if (b) setView(b.dataset.view);
  });
  $('regimeChips').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-regime]');
    if (b) setRegime(b.dataset.regime);
  });
  $('stageChips').addEventListener('click', (ev) => {
    const bv = ev.target.closest('[data-qview]');
    if (bv) { setView(bv.dataset.qview); return; }
    const br = ev.target.closest('[data-qreg]');
    if (br) setRegime(br.dataset.qreg);
  });

  $('angleChips').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-angle]');
    if (!b) return;
    leave();
    const key = b.dataset.angle;
    const target = key === 'dottie' ? THETA_STAR_DEG : parseFloat(key);
    if (Number.isFinite(target)) clock.set(target);
  });

  $('camChips').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-cam]');
    if (!b) return;
    const key = b.dataset.cam, preset = CAM_PRESETS[key];
    if (!preset) return;
    state.camKey = key;
    flyQuatTo(preset.yaw, preset.pitch, preset.zoom, 480);
  });

  $('resetBtn').addEventListener('click', () => {
    cards.pick('pythagoras');
  });

  bindPlotScrub($('plot'));
  bindPlotScrub($('plotWall'));

  /* ---------- theory drawer ---------- */
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });

  /* ---------- keyboard shortcuts ---------- */
  kit.keys({
    ' ': () => { stopAt = null; cancelCardTween(); cards.mark(null); clock.toggle(); },
    ArrowLeft: () => { leave(); clock.set(state.thetaDeg - 1.5); },
    ArrowRight: () => { leave(); clock.set(state.thetaDeg + 1.5); },
    Home: () => { leave(); clock.set(0); },
    End: () => { leave(); clock.set(90); },
    v: () => setView(state.view === 'local' ? 'global' : 'local'),
    t: () => setRegime(state.regime === 'area' ? 'volume' : 'area'),
    d: () => { leave(); clock.set(THETA_STAR_DEG); },
    '1': () => cards.pick('pythagoras'),
    '2': () => cards.pick('dottie'),
    '3': () => cards.pick('arealaw'),
    '4': () => cards.pick('volumelaw'),
    '5': () => cards.pick('bellcut'),
    '6': () => cards.pick('globaljoint')
  });

  /* ---------- thumbnail cover hook (1280×720 wordless hub cover, lw = 2.0) ---------- */
  window.TRV_THUMB = () => {
    cancelCardTween();
    if (camTween) camTween.cancel();
    if (bladeTween) bladeTween.cancel();
    clock.pause();
    state.regime = 'volume';
    state.view = 'local';
    state.blade = 1;
    state.focusPair = true;
    state.thetaDeg = THETA_STAR_DEG;
    clock.set(THETA_STAR_DEG, true);
    stage.cam.yaw = 0.46;
    stage.cam.pitch = 0.31;
    stage.cam.zoom = 1.04;
    stage.lw = 2.0;
    paint.now();
  };

  /* ---------- read-only test & verification probe ---------- */
  window.TRIAD_DEBUG = {
    THETA_STAR_RAD,
    THETA_STAR_DEG,
    quat,
    metricsAt,
    get state() {
      const m = metricsAt(state.thetaDeg, state.regime, state.view);
      return {
        preset: state.preset,
        regime: state.regime,
        view: state.view,
        blade: state.blade,
        focusPair: state.focusPair,
        cam: { yaw: stage.cam.yaw, pitch: stage.cam.pitch, zoom: stage.cam.zoom, lw: stage.lw },
        quat: state.lastQuat.slice(),
        metrics: m
      };
    },
    setTheta(deg) { leave(); clock.set(deg); kit.flush(); },
    setView(v) { setView(v); kit.flush(); },
    setRegime(r) { setRegime(r); kit.flush(); },
    pick(id) { cards.pick(id); kit.flush(); }
  };

  /* ---------- boot ---------- */
  cards.pick(cards.initial('pythagoras'));
  kit.flush();
})();
