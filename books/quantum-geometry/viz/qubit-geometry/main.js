/* ORTHO//QUBIT · 两子几何积 · 粒子内积线与波动外积面的勾股守恒与旋转门
   Pairwise geometric product AB = A·B + A∧B, environmental record complementarity circle D² + V² = 1,
   SU(2)/SO(3) Clifford rotor gates, and Hilbert–Schmidt pinching decomposition & entropy production ledger.
   Circuit order: |ψ⟩ → U(α) = exp(−iα n̂·σ/2) → ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)| = B(θ, φ) → E_η (fixed-z dephasing) → ρ(η) = E_η(ρ₀).
   E_η(ρ) = (1−η)ρ + ηΠ(ρ) is unital (E_η(I/2) = I/2) and leaves the z axis fixed, so Π(ρ(η)) = Π(ρ₀) = diag(p₀, p₁).
   The page never implements a non-unital reset (I/2 → |0⟩⟨0|); that Landauer process is only described in the drawer.
   Colours come exclusively from design tokens via TRV.palette and TRV.alpha.
   Read-only probe for browser tests: window.QG_DEBUG. Thumbnail hook: window.TRV_THUMB. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const L = TRV.L;
  const MINUS = '−';
  const DEG = Math.PI / 180;
  const LN2 = Math.LN2;

  /* ---------- state & clamping ---------- */
  const clampInt = (x, lo, hi, fallback) => {
    const n = Number(x);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(lo, Math.min(hi, Math.round(n)));
  };
  const clampEta = (x, fallback = 0) => {
    const n = Number(x);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(0, Math.min(1, Math.round(n * 100) / 100));
  };

  const q = new URLSearchParams(location.search);
  const S = {
    theta: q.has('theta') ? clampInt(q.get('theta'), 0, 180, 60) : 60,
    phi: q.has('phi') ? clampInt(q.get('phi'), 0, 360, 36) : 36,
    alpha: q.has('alpha') ? clampInt(q.get('alpha'), 0, 90, 30) : 30,
    eta: q.has('eta') ? clampEta(q.get('eta'), 0) : 0,
    gates: []
  };

  let R = null;
  let frames = 0, pending = false, built = '';
  let lastLedger = null;

  /** Binary von Neumann entropy h₂(p) = −p ln p − (1−p) ln(1−p) in nats. */
  function binaryEntropyNats(p) {
    if (p <= 1e-15 || p >= 1 - 1e-15) return 0;
    return -(p * Math.log(p) + (1 - p) * Math.log(1 - p));
  }

  /** Fixed-z dephasing channel E_η(ρ) = (1−η)ρ + ηΠ(ρ) on a Bloch vector: transverse part × (1−η), z untouched.
      Unital (the origin I/2 is fixed) and Π-invariant (the z component, hence diag(p₀, p₁), never changes). */
  function dephaseBloch([x, y, z], eta) {
    return [(1 - eta) * x, (1 - eta) * y, z];
  }

  /** Circuit tape |ψ⟩ → U(α) [gates] → ρ₀(θ, φ) → E_η (η) → ρ(η); language-neutral symbols only. */
  function circuitTape(d) {
    const u = d.gates.length ? `U(α) [${d.gates.join(' → ')}]` : 'U(α) = I';
    return `|ψ⟩ → ${u} → ρ₀(${d.theta}°, ${d.phi}°) → E_η (η = ${d.eta.toFixed(2)}) → ρ(η)`;
  }
  const PIPELINE = '|ψ⟩ → U(α) → ρ₀(θ,φ) → E_η → ρ(η)';

  function derive() {
    const th = S.theta * DEG, ph = S.phi * DEG, al = S.alpha * DEG, eta = S.eta;
    const cosT = Math.cos(th), sinT = Math.sin(th);
    const cosP = Math.cos(ph), sinP = Math.sin(ph);
    const p0 = (1 + cosT) * 0.5, p1 = (1 - cosT) * 0.5;
    const dot = cosT, wedge = sinT;
    const pythAB = dot * dot + wedge * wedge;

    const overlap = Math.cos(al);
    const V = Math.abs(overlap);
    const D = Math.sqrt(Math.max(0, 1 - V * V));
    const pythDV = D * D + V * V;

    // ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)| (post-gate pure state, Bloch vector b) and ρ(η) = E_η(ρ₀) (Bloch vector r)
    const bx = sinT * cosP, by = sinT * sinP, bz = cosT;
    const [rx, ry, rz] = dephaseBloch([bx, by, bz], eta);
    const rNorm = Math.min(1, Math.hypot(rx, ry, rz));

    // Π(ρ(η)) = Π(ρ₀) = diag(p₀, p₁): ⟨Π(ρ₀),Π(ρ₀)⟩ = p₀² + p₁²
    const hsDiag = p0 * p0 + p1 * p1;
    // ρ₀ (η = 0): |ρ₀₁(0)|² + |ρ₁₀(0)|² = sin²θ / 2 and ⟨ρ₀,ρ₀⟩ = 1
    const hsOffPure = 0.5 * sinT * sinT;
    const hsTotalPure = hsDiag + hsOffPure;
    // ρ(η): |ρ₀₁(η)|² + |ρ₁₀(η)|² = (1−η)² sin²θ / 2; ⟨ρ(η),ρ(η)⟩ = Tr ρ(η)² = (1 + |r|²) / 2 from the Bloch vector
    const hsOffActive = 0.5 * (1 - eta) * (1 - eta) * sinT * sinT;
    const hsTotalActive = 0.5 * (1 + rx * rx + ry * ry + rz * rz);

    // S(Π(ρ₀)) = H₂(cos²(θ/2)): coherence budget of the pure state ρ₀ (S(ρ₀) = 0)
    const entropyPinchNats = binaryEntropyNats(p0);
    const entropyPinchBits = entropyPinchNats / LN2;
    // S(ρ(η)) from the eigenvalues (1 ± |r|)/2, and D(ρ(η) ‖ Π(ρ₀)) = S(Π(ρ₀)) − S(ρ(η)) ≥ 0
    const eigPlus = (1 + rNorm) * 0.5;
    const entropyCurrentNats = binaryEntropyNats(eigPlus);
    const entropyRemainingNats = Math.max(0, entropyPinchNats - entropyCurrentNats);

    R = {
      theta: S.theta,
      phi: S.phi,
      alpha: S.alpha,
      eta: S.eta,
      gates: S.gates.slice(),
      p0,
      p1,
      dot,
      wedge,
      pythAB,
      overlap,
      V,
      D,
      pythDV,
      blochPure: [bx, by, bz],
      blochDecohered: [rx, ry, rz],
      hsDiag,
      hsOffPure,
      hsTotalPure,
      hsOffActive,
      hsTotalActive,
      entropyPinchNats,
      entropyPinchBits,
      entropyCurrentNats,
      entropyRemainingNats
    };
    return R;
  }

  const fresh = () => {
    if (
      !R ||
      R.theta !== S.theta ||
      R.phi !== S.phi ||
      R.alpha !== S.alpha ||
      R.eta !== S.eta ||
      R.gates.length !== S.gates.length
    ) {
      derive();
    }
    return R;
  };

  const fx = (x, k = 4) => (x < -1e-12 ? MINUS : '') + Math.abs(x).toFixed(k);

  /* ---------- readouts ---------- */
  function updateReadouts() {
    const d = fresh();
    $('roDot').innerHTML = `<span class="vcy">${fx(d.dot)}</span><span class="sub">cos(${d.theta}°) · cos²θ = ${fx(d.dot * d.dot)}</span>`;
    $('roWedge').innerHTML = `<span class="vvi">${fx(d.wedge)}</span><span class="sub">sin(${d.theta}°) · sin²θ = ${fx(d.wedge * d.wedge)}</span>`;
    $('roBorn').innerHTML = `${fx(d.p0, 3)}, ${fx(d.p1, 3)}<span class="sub">p₀ + p₁ = ${fx(d.p0 + d.p1, 4)}</span>`;
    const okAB = Math.abs(d.pythAB - 1) < 1e-9;
    $('roPythAB').innerHTML = `${fx(d.pythAB)} <span class="okmark">${okAB ? '✓' : '✗'}</span><span class="sub">${fx(d.dot * d.dot, 3)} + ${fx(d.wedge * d.wedge, 3)} = 1</span>`;

    $('roV').innerHTML = `<span class="vcy">${fx(d.V)}</span><span class="sub">c = cos(${d.alpha}°) · V² = ${fx(d.V * d.V)}</span>`;
    $('roD').innerHTML = `<span class="vvi">${fx(d.D)}</span><span class="sub">sin(${d.alpha}°) · D² = ${fx(d.D * d.D)}</span>`;
    const okDV = Math.abs(d.pythDV - 1) < 1e-9;
    $('roPythDV').innerHTML = `D² + V² = ${fx(d.D * d.D, 4)} + ${fx(d.V * d.V, 4)} = <b class="okmark">${fx(d.pythDV, 4)} ${okDV ? '✓' : '✗'}</b>`;

    // ⟨ρ(η),ρ(η)⟩ (from the Bloch vector) against ⟨Π(ρ₀),Π(ρ₀)⟩ + (|ρ₀₁(η)|²+|ρ₁₀(η)|²)
    const okHS = Math.abs(d.hsTotalActive - (d.hsDiag + d.hsOffActive)) < 1e-9;
    $('roHS').innerHTML = `${fx(d.hsTotalActive)} = <span class="vcy">${fx(d.hsDiag)}</span> + <span class="vvi">${fx(d.hsOffActive)}</span> <span class="okmark">${okHS ? '✓' : '✗'}</span>`
      + `<span class="sub">${L('门后纯态 ρ₀（η = 0）相干质量', 'post-gate pure state ρ₀ (η = 0) coherence mass')} |ρ₀₁(0)|²+|ρ₁₀(0)|² = ${fx(d.hsOffPure)}`
      + ` · Π(ρ(η)) = Π(ρ₀) = diag(${fx(d.p0)}, ${fx(d.p1)})</span>`;

    // Primary: what the current mixed state ρ(η) still holds; sub: the initial pure-state budget and S(ρ(η))
    $('roEntropy').innerHTML = `<span class="vcy">${fx(d.entropyRemainingNats)} nats</span> (${fx(d.entropyRemainingNats / LN2)} bits)`
      + `<span class="sub">${L('初始纯态相干预算', 'initial pure-state coherence budget')} S(Π(ρ₀)) = H₂(cos²(θ/2)) = ${fx(d.entropyPinchNats)} nats (${fx(d.entropyPinchBits)} bits)`
      + ` · ${L('当前态熵', 'current-state entropy')} S(ρ(η)) = ${fx(d.entropyCurrentNats)} nats</span>`;

    const n = d.gates.length;
    const gz = n ? `已施加 ${n} 个：${d.gates.join(' → ')}` : '尚未施加（U = I）';
    const ge = n ? `${n} applied: ${d.gates.join(' → ')}` : 'none applied yet (U = I)';
    $('roNote').textContent = L(
      `线路顺序 ${PIPELINE}：① 态制备 |ψ⟩（滑块 θ, φ 或预设）；② 旋子门 U(α) = exp(−iα n̂·σ/2)，${gz}；`
        + `③ 门后纯态 ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)|，(θ, φ) = (${d.theta}°, ${d.phi}°)；④ 固定 z 轴退相干信道 E_η，η = ${d.eta.toFixed(2)}，输出 ρ(η) = E_η(ρ₀)。`
        + `环境记录重叠角 α = ${d.alpha}° 只驱动互补圆 D² + V² = 1，不在此线路中。`,
      `Circuit order ${PIPELINE}: (1) state preparation |ψ⟩ (θ, φ sliders or a preset); (2) rotor gate U(α) = exp(−iα n̂·σ/2), ${ge}; `
        + `(3) post-gate pure state ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)| with (θ, φ) = (${d.theta}°, ${d.phi}°); (4) fixed-z dephasing channel E_η with η = ${d.eta.toFixed(2)}, giving ρ(η) = E_η(ρ₀). `
        + `The record overlap angle α = ${d.alpha}° drives only the complementarity circle D² + V² = 1 and is not part of this circuit.`
    );

    $('pillAngles').innerHTML = `θ, φ <strong>${d.theta}°, ${d.phi}°</strong>`;
    $('pillPyth').innerHTML = `cos²θ+sin²θ <strong class="okmark">${fx(d.pythAB, 4)}</strong>`;
    $('pillDV').innerHTML = `D²+V² <strong class="okmark">${fx(d.pythDV, 4)}</strong>`;
    $('gateTape').textContent = circuitTape(d);
    $('stageSub').textContent = `θ=${d.theta}° · φ=${d.phi}° · α=${d.alpha}° · η=${d.eta.toFixed(2)}`;
  }

  /* ---------- 2D / 3D orthographic projection & canvas drawing ---------- */
  const cv = $('view');

  /** Orthographic projection of 3D Bloch coords (x, y, z) onto screen (sx, sy) centered at (cx, cy) with radius R. */
  function proj3D(x, y, z, cx, cy, rad) {
    // Camera yaw = -32 deg, pitch = 22 deg so +x points front-left, +y points right, +z points up
    const sx = cx + rad * (0.848 * y - 0.530 * x);
    const sy = cy + rad * (-0.927 * z + 0.198 * x + 0.318 * y);
    return [sx, sy];
  }

  function drawArrow(ctx, x1, y1, x2, y2, color, lw, headLen) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (len < 2) return;
    const ang = Math.atan2(dy, dx);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(ang - 0.42), y2 - headLen * Math.sin(ang - 0.42));
    ctx.lineTo(x2 - headLen * Math.cos(ang + 0.42), y2 - headLen * Math.sin(ang + 0.42));
    ctx.closePath();
    ctx.fill();
  }

  function drawScene(thumbCover = false) {
    const dpr = TRV.fitCanvas(cv);
    const ctx = cv.getContext('2d');
    const Wc = cv.width, Hc = cv.height;
    const u = Math.min(Wc / 960, Hc / 540);
    const pal = TRV.palette, mono = TRV.fonts.data, disp = TRV.fonts.display;
    const d = fresh();

    ctx.fillStyle = pal.stage;
    ctx.fillRect(0, 0, Wc, Hc);

    // Subtle radial glow behind Bloch sphere and complementarity circle
    const g1 = ctx.createRadialGradient(Wc * 0.27, Hc * 0.52, 0, Wc * 0.27, Hc * 0.52, Wc * 0.36);
    g1.addColorStop(0, TRV.alpha(pal.cyan, 0.09));
    g1.addColorStop(1, TRV.alpha(pal.cyan, 0));
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, Wc, Hc);

    const g2 = ctx.createRadialGradient(Wc * 0.75, Hc * 0.32, 0, Wc * 0.75, Hc * 0.32, Wc * 0.26);
    g2.addColorStop(0, TRV.alpha(pal.violet, 0.08));
    g2.addColorStop(1, TRV.alpha(pal.violet, 0));
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, Wc, Hc);

    // Divider line between left (3D Bloch sphere) and right (Pythagorean circle + HS bar ledger)
    const splitX = Wc * 0.53;
    ctx.strokeStyle = pal.panelEdge;
    ctx.lineWidth = Math.max(1, 1 * u);
    ctx.beginPath();
    ctx.moveTo(splitX, 16 * u);
    ctx.lineTo(splitX, Hc - 16 * u);
    ctx.stroke();

    /* ===== LEFT PANEL: 3D Orthographic Bloch Sphere & Pairwise Geometric Product ===== */
    const cx = splitX * 0.5, cy = Hc * 0.53;
    const rad = Math.min(splitX * 0.37, Hc * 0.37);

    // Outer sphere boundary
    ctx.strokeStyle = pal.lineHot;
    ctx.lineWidth = 1.6 * u;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.stroke();

    // Equatorial ellipse in 3D projection
    ctx.strokeStyle = TRV.alpha(pal.lineHot, 0.65);
    ctx.lineWidth = 1.1 * u;
    ctx.setLineDash([4 * u, 4 * u]);
    ctx.beginPath();
    for (let k = 0; k <= 72; k++) {
      const a = (k / 72) * Math.PI * 2;
      const [px, py] = proj3D(Math.cos(a), Math.sin(a), 0, cx, cy, rad);
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Reference meridian in the azimuthal plane phi
    const phRad = d.phi * DEG;
    ctx.strokeStyle = TRV.alpha(pal.faint, 0.6);
    ctx.beginPath();
    for (let k = 0; k <= 72; k++) {
      const a = (k / 72) * Math.PI * 2;
      const [px, py] = proj3D(Math.sin(a) * Math.cos(phRad), Math.sin(a) * Math.sin(phRad), Math.cos(a), cx, cy, rad);
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Coordinate axes X, Y, Z
    const [ox, oy] = proj3D(0, 0, 0, cx, cy, rad);
    const [zx, zy] = proj3D(0, 0, 1.08, cx, cy, rad);
    const [znx, zny] = proj3D(0, 0, -1.05, cx, cy, rad);
    const [xx, xy] = proj3D(1.08, 0, 0, cx, cy, rad);
    const [yx, yy] = proj3D(0, 1.08, 0, cx, cy, rad);

    ctx.strokeStyle = TRV.alpha(pal.dim, 0.45);
    ctx.lineWidth = 1 * u;
    ctx.beginPath();
    ctx.moveTo(znx, zny); ctx.lineTo(zx, zy);
    ctx.moveTo(ox, oy); ctx.lineTo(xx, xy);
    ctx.moveTo(ox, oy); ctx.lineTo(yx, yy);
    ctx.stroke();

    // Reference axis A = +z
    drawArrow(ctx, ox, oy, zx, zy, pal.sigma, 2 * u, 7 * u);

    const [bx, by, bz] = d.blochPure;
    const [bsx, bsy] = proj3D(bx, by, bz, cx, cy, rad);
    const [dotX, dotY] = proj3D(0, 0, d.dot, cx, cy, rad);

    // Exterior wedge parallelogram A ∧ B (area = sin θ) between O, A=(0,0,1), A+B, and B
    // To keep it neatly inside the sphere frame, scale the visual parallelogram by 0.72 * rad
    const wScale = 0.72;
    const [wAx, wAy] = proj3D(0, 0, wScale, cx, cy, rad);
    const [wBx, wBy] = proj3D(bx * wScale, by * wScale, bz * wScale, cx, cy, rad);
    const [wABx, wABy] = proj3D(bx * wScale, by * wScale, (1 + bz) * wScale, cx, cy, rad);

    ctx.fillStyle = TRV.alpha(pal.violet, 0.24);
    ctx.strokeStyle = pal.violet;
    ctx.lineWidth = 1.6 * u;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(wAx, wAy);
    ctx.lineTo(wABx, wABy);
    ctx.lineTo(wBx, wBy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Transverse drop line from B to z-axis projection (dot = cos θ)
    ctx.strokeStyle = TRV.alpha(pal.violet, 0.85);
    ctx.lineWidth = 1.8 * u;
    ctx.setLineDash([4 * u, 3 * u]);
    ctx.beginPath();
    ctx.moveTo(dotX, dotY);
    ctx.lineTo(bsx, bsy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Collinear inner-product line A·B = cos θ along z-axis (cyan)
    drawArrow(ctx, ox, oy, dotX, dotY, pal.cyan, 3.2 * u, 8 * u);

    // Dephased Bloch vector of ρ(η) = E_η(ρ₀) when η > 0
    const [rx, ry, rz] = d.blochDecohered;
    const [rsx, rsy] = proj3D(rx, ry, rz, cx, cy, rad);
    if (d.eta > 0.005) {
      drawArrow(ctx, ox, oy, rsx, rsy, pal.magenta, 2.2 * u, 7 * u);
      ctx.fillStyle = pal.magenta;
      ctx.beginPath();
      ctx.arc(rsx, rsy, 4 * u, 0, Math.PI * 2);
      ctx.fill();
    }

    // Post-gate pure state ρ₀ = B(θ, φ) in amber
    ctx.shadowColor = pal.amber;
    ctx.shadowBlur = 10 * u;
    drawArrow(ctx, ox, oy, bsx, bsy, pal.amber, 2.8 * u, 8.5 * u);
    ctx.fillStyle = pal.amber;
    ctx.beginPath();
    ctx.arc(bsx, bsy, 4.5 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Labels on the Bloch sphere
    ctx.font = `600 ${11.5 * u}px ${mono}`;
    ctx.fillStyle = pal.sigma;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('A = |0⟩ (+z)', zx, zy - 4 * u);
    ctx.textBaseline = 'top';
    ctx.fillStyle = pal.dim;
    ctx.fillText('|1⟩ (−z)', znx, zny + 4 * u);
    ctx.fillText('+x', xx - 6 * u, xy + 2 * u);
    ctx.fillText('+y', yx + 8 * u, yy - 2 * u);

    ctx.fillStyle = pal.amber;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const amberText = `now: ρ₀ = B(${d.theta}°, ${d.phi}°)`;
    ctx.fillText(amberText, bsx + 8 * u, bsy - 4 * u);

    const dotText = `A·B = ${fx(d.dot, 2)}`;
    if (d.eta > 0.005) {
      // Place the ρ(η) tag at the first corner around its tip that clears the ρ₀ and A·B labels
      const magText = 'ρ(η) = E_η(ρ₀)';
      const hh = 8 * u;
      const box = (x0, yc, w) => [x0 - 2 * u, yc - hh, x0 + w + 2 * u, yc + hh];
      const hit = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
      const busy = [
        box(bsx + 8 * u, bsy - 4 * u, ctx.measureText(amberText).width),
        box(dotX + 8 * u, (oy + dotY) * 0.5, ctx.measureText(dotText).width)
      ];
      const wM = ctx.measureText(magText).width;
      const cands = [
        [rsx - 8 * u - wM, rsy - 12 * u], [rsx - 8 * u - wM, rsy + 12 * u],
        [rsx + 8 * u, rsy + 12 * u], [rsx + 8 * u, rsy - 12 * u]
      ];
      const [mx, my] = cands.find(([x0, yc]) => busy.every((b) => !hit(box(x0, yc, wM), b))) || cands[1];
      ctx.fillStyle = pal.magenta;
      ctx.fillText(magText, mx, my);
    }

    ctx.fillStyle = pal.cyan;
    ctx.fillText(dotText, dotX + 8 * u, (oy + dotY) * 0.5);

    ctx.fillStyle = pal.violet;
    ctx.fillText(`‖A∧B‖ = ${fx(d.wedge, 2)}`, (wAx + wABx) * 0.5 + 6 * u, (wAy + wABy) * 0.5);

    if (!thumbCover) {
      ctx.font = `600 ${11 * u}px ${disp}`;
      ctx.fillStyle = pal.cyan;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(L('AB = A·B + A∧B · 布洛赫球正交投影', 'AB = A·B + A∧B · 3D BLOCH ORTHOGRAPHIC'), 16 * u, 14 * u);
      ctx.font = `${10.5 * u}px ${mono}`;
      ctx.fillStyle = pal.dim;
      ctx.fillText(PIPELINE, 16 * u, 31 * u);
    } else {
      ctx.font = `600 ${13 * u}px ${mono}`;
      ctx.fillStyle = pal.cyan;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('ORTHO//QUBIT · AB = A·B + A∧B', 20 * u, 16 * u);
    }

    /* ===== TOP-RIGHT PANEL: Pythagorean Complementarity Circle D² + V² = 1 ===== */
    const rLeft = splitX + 18 * u, rWidth = Wc - rLeft - 16 * u;
    const midY = Hc * 0.52;

    ctx.strokeStyle = pal.panelEdge;
    ctx.lineWidth = Math.max(1, 1 * u);
    ctx.beginPath();
    ctx.moveTo(splitX + 10 * u, midY);
    ctx.lineTo(Wc - 14 * u, midY);
    ctx.stroke();

    const cR = Math.min(rWidth * 0.30, (midY - 46 * u) * 0.76);
    const cCx = rLeft + cR + 28 * u;
    const cCy = midY - 20 * u;

    // Quarter circle arc for V in [0,1], D in [0,1] and full faint circle
    ctx.strokeStyle = TRV.alpha(pal.lineHot, 0.45);
    ctx.lineWidth = 1 * u;
    ctx.beginPath();
    ctx.arc(cCx, cCy, cR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 2.2 * u;
    ctx.beginPath();
    ctx.arc(cCx, cCy, cR, -Math.PI * 0.5, 0);
    ctx.stroke();

    // Axes V (horizontal) and D (vertical)
    drawArrow(ctx, cCx, cCy, cCx + cR * 1.12, cCy, pal.cyan, 1.5 * u, 6 * u);
    drawArrow(ctx, cCx, cCy, cCx, cCy - cR * 1.12, pal.violet, 1.5 * u, 6 * u);

    const ptX = cCx + d.V * cR;
    const ptY = cCy - d.D * cR;

    // Right-triangle legs for V = cos α and D = sin α
    ctx.fillStyle = TRV.alpha(pal.cyan, 0.14);
    ctx.beginPath();
    ctx.moveTo(cCx, cCy);
    ctx.lineTo(ptX, cCy);
    ctx.lineTo(ptX, ptY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 2.4 * u;
    ctx.beginPath();
    ctx.moveTo(cCx, cCy);
    ctx.lineTo(ptX, cCy);
    ctx.stroke();

    ctx.strokeStyle = pal.violet;
    ctx.lineWidth = 2.4 * u;
    ctx.beginPath();
    ctx.moveTo(ptX, cCy);
    ctx.lineTo(ptX, ptY);
    ctx.stroke();

    // Hypotenuse radius = 1 and operating point (V, D) on the α-complementarity circle (cyan/violet, never amber)
    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    ctx.moveTo(cCx, cCy);
    ctx.lineTo(ptX, ptY);
    ctx.stroke();

    ctx.fillStyle = pal.violet;
    ctx.shadowColor = pal.violet;
    ctx.shadowBlur = 9 * u;
    ctx.beginPath();
    ctx.arc(ptX, ptY, 4.5 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Labels for complementarity circle
    ctx.font = `600 ${11 * u}px ${mono}`;
    ctx.fillStyle = pal.ok;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('LEAN ✓  D² + V² = 1', rLeft, 14 * u);

    const infoX = cCx + cR * 1.15;
    ctx.font = `${10.5 * u}px ${mono}`;
    ctx.fillStyle = pal.ink;
    ctx.fillText(`α = ${d.alpha}°`, infoX, 42 * u);
    ctx.fillStyle = pal.cyan;
    ctx.fillText(`V = cos α = ${fx(d.V, 3)}`, infoX, 62 * u);
    ctx.fillStyle = pal.violet;
    ctx.fillText(`D = sin α = ${fx(d.D, 3)}`, infoX, 82 * u);
    ctx.fillStyle = pal.cyan;
    ctx.fillText(`D²+V² = ${fx(d.pythDV, 4)}`, infoX, 102 * u);
    ctx.fillStyle = pal.violet;
    ctx.fillText(`cos²θ+sin²θ = ${fx(d.pythAB, 4)}`, infoX, 122 * u);

    /* ===== BOTTOM-RIGHT PANEL: Hilbert–Schmidt Pinching & Entropy Production Bars ===== */
    const bTop = midY + 14 * u;
    ctx.font = `600 ${11 * u}px ${mono}`;
    ctx.fillStyle = pal.ok;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const ledgerHead = 'LEAN ✓  ⟨ρ(η),ρ(η)⟩ = ⟨Π(ρ₀),Π(ρ₀)⟩ + (|ρ₀₁(η)|²+|ρ₁₀(η)|²)';
    ctx.fillText(ledgerHead, rLeft, bTop);

    // Current state ρ(η) = E_η(ρ₀); Π(ρ(η)) = Π(ρ₀); last bar: remaining coherence D(ρ(η)‖Π(ρ₀)) = S(Π(ρ₀)) − S(ρ(η))
    const bars = [
      { code: '⟨ρ(η),ρ(η)⟩', val: d.hsTotalActive, max: 1, col: pal.ink },
      { code: '⟨Π(ρ₀),Π(ρ₀)⟩', val: d.hsDiag, max: 1, col: pal.cyan },
      { code: '|ρ₀₁(η)|²+|ρ₁₀(η)|²', val: d.hsOffActive, max: 1, col: pal.violet },
      { code: 'D(ρ(η)‖Π(ρ₀))', val: d.entropyRemainingNats, max: LN2, col: pal.magenta, suffix: ' nats' }
    ];
    lastLedger = { head: ledgerHead, bars: bars.map((b) => ({ code: b.code, val: b.val, max: b.max, suffix: b.suffix || '' })) };

    const barStartY = bTop + 26 * u;
    const availH = Hc - barStartY - 14 * u;
    const rowStep = Math.min(44 * u, availH / bars.length);
    const barH = Math.max(10 * u, rowStep * 0.48);
    ctx.font = `${10.5 * u}px ${mono}`;
    const labelW = Math.max(104 * u, ...bars.map((b) => ctx.measureText(b.code).width + 10 * u));
    const barMaxW = Math.max(60 * u, rWidth - labelW - 78 * u);

    bars.forEach((b, idx) => {
      const y = barStartY + idx * rowStep;
      const cyBar = y + barH * 0.5;
      ctx.font = `${10.5 * u}px ${mono}`;
      ctx.fillStyle = pal.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.code, rLeft, cyBar);

      const bx0 = rLeft + labelW;
      ctx.fillStyle = TRV.alpha(pal.lineHot, 0.25);
      ctx.fillRect(bx0, y, barMaxW, barH);
      ctx.strokeStyle = pal.panelEdge;
      ctx.lineWidth = 1 * u;
      ctx.strokeRect(bx0, y, barMaxW, barH);

      const ratio = Math.max(0, Math.min(1, b.val / b.max));
      ctx.fillStyle = b.col;
      ctx.fillRect(bx0, y, barMaxW * ratio, barH);

      ctx.fillStyle = b.col;
      ctx.textAlign = 'left';
      ctx.fillText(fx(b.val, 3) + (b.suffix || ''), bx0 + barMaxW + 6 * u, cyBar);
    });
  }

  /* ---------- render & state updates ---------- */
  function render() {
    pending = false;
    const key = `${S.theta},${S.phi},${S.alpha},${S.eta},${S.gates.join('.')},${TRV.lang()}`;
    if (key !== built) {
      fresh();
      updateReadouts();
      built = key;
    }

    $('theta').value = $('thetaNum').value = String(S.theta);
    $('phi').value = $('phiNum').value = String(S.phi);
    $('alpha').value = $('alphaNum').value = String(S.alpha);
    $('eta').value = String(S.eta);
    $('etaNum').value = S.eta.toFixed(2);

    $('thetaDec').disabled = S.theta <= 0;
    $('thetaInc').disabled = S.theta >= 180;
    $('phiDec').disabled = S.phi <= 0;
    $('phiInc').disabled = S.phi >= 360;
    $('alphaDec').disabled = S.alpha <= 0;
    $('alphaInc').disabled = S.alpha >= 90;
    $('etaDec').disabled = S.eta <= 0;
    $('etaInc').disabled = S.eta >= 1;

    const curPreset = `${S.theta},${S.phi},${S.alpha},${S.eta}`;
    document.querySelectorAll('#presets [data-preset]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.preset === curPreset));
    });

    drawScene(TRV.thumbMode);
    frames++;
  }

  function schedule() {
    if (!pending) {
      pending = true;
      requestAnimationFrame(render);
    }
  }

  function setParams(theta, phi, alpha, eta, keepGates = false) {
    S.theta = clampInt(theta, 0, 180, S.theta);
    S.phi = clampInt(phi, 0, 360, S.phi);
    S.alpha = clampInt(alpha, 0, 90, S.alpha);
    S.eta = clampEta(eta, S.eta);
    if (!keepGates) S.gates = [];
    built = '';
    schedule();
  }

  function resetAll() {
    S.gates = [];
    setParams(60, 36, 30, 0, true);
  }

  /** Apply an SU(2)/SO(3) Clifford rotor gate to (theta, phi). */
  function applyGate(name) {
    if (name === 'Reset') {
      resetAll();
      return;
    }
    const valid = ['I', 'X', 'Y', 'Z', 'H', 'S', 'T'];
    if (!valid.includes(name)) return;

    let th = S.theta, ph = S.phi;
    if (name === 'I') {
      // Identity rotor leaves (theta, phi) unchanged
    } else if (name === 'X') {
      // Pi rotation around x-axis: (x, y, z) -> (x, -y, -z)
      th = 180 - th;
      ph = (360 - ph) % 360;
    } else if (name === 'Y') {
      // Pi rotation around y-axis: (x, y, z) -> (-x, y, -z)
      th = 180 - th;
      ph = (180 - ph + 360) % 360;
    } else if (name === 'Z') {
      // Pi rotation around z-axis
      ph = (ph + 180) % 360;
    } else if (name === 'S') {
      // +90 deg rotation around z-axis
      ph = (ph + 90) % 360;
    } else if (name === 'T') {
      // +45 deg rotation around z-axis
      ph = (ph + 45) % 360;
    } else if (name === 'H') {
      // Hadamard: pi rotation around (x + z)/sqrt(2), mapping (x, y, z) -> (z, -y, x)
      const thR = th * DEG, phR = ph * DEG;
      const x = Math.sin(thR) * Math.cos(phR);
      const y = Math.sin(thR) * Math.sin(phR);
      const z = Math.cos(thR);
      const nx = z, ny = -y, nz = x;
      th = Math.round(Math.acos(Math.max(-1, Math.min(1, nz))) / DEG);
      if (Math.hypot(nx, ny) < 1e-9) {
        ph = 0;
      } else {
        ph = ((Math.round(Math.atan2(ny, nx) / DEG) % 360) + 360) % 360;
      }
    }

    S.gates.push(name);
    if (S.gates.length > 16) S.gates.shift();
    setParams(th, ph, S.alpha, S.eta, true);
    TRV.toast(
      $('toast'),
      L(
        `施加旋子门 U(α) = <b>${name}</b> → 门后纯态 ρ₀(θ = ${S.theta}°, φ = ${S.phi}°) → E_η`,
        `Applied rotor gate U(α) = <b>${name}</b> → post-gate pure state ρ₀(θ = ${S.theta}°, φ = ${S.phi}°) → E_η`
      ),
      2600
    );
  }

  /* ---------- wire controls ---------- */
  function bindIntControl(key, lo, hi) {
    $(key).addEventListener('input', (ev) => {
      const v = clampInt(ev.target.value, lo, hi, S[key]);
      S[key] = v;
      built = '';
      schedule();
    });
    $(key + 'Num').addEventListener('change', (ev) => {
      const v = clampInt(ev.target.value, lo, hi, S[key]);
      S[key] = v;
      built = '';
      schedule();
    });
    $(key + 'Num').addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') ev.target.blur();
    });
    $(key + 'Dec').addEventListener('click', () => {
      S[key] = clampInt(S[key] - 1, lo, hi, S[key]);
      built = '';
      schedule();
    });
    $(key + 'Inc').addEventListener('click', () => {
      S[key] = clampInt(S[key] + 1, lo, hi, S[key]);
      built = '';
      schedule();
    });
  }

  bindIntControl('theta', 0, 180);
  bindIntControl('phi', 0, 360);
  bindIntControl('alpha', 0, 90);

  $('eta').addEventListener('input', (ev) => {
    S.eta = clampEta(ev.target.value, S.eta);
    built = '';
    schedule();
  });
  $('etaNum').addEventListener('change', (ev) => {
    S.eta = clampEta(ev.target.value, S.eta);
    built = '';
    schedule();
  });
  $('etaNum').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') ev.target.blur();
  });
  $('etaDec').addEventListener('click', () => {
    S.eta = clampEta(S.eta - 0.05, S.eta);
    built = '';
    schedule();
  });
  $('etaInc').addEventListener('click', () => {
    S.eta = clampEta(S.eta + 0.05, S.eta);
    built = '';
    schedule();
  });

  document.querySelectorAll('#gates [data-gate]').forEach((b) => {
    b.addEventListener('click', () => applyGate(b.dataset.gate));
  });

  document.querySelectorAll('#presets [data-preset]').forEach((b) => {
    b.addEventListener('click', () => {
      const [th, ph, al, et] = b.dataset.preset.split(',').map(Number);
      setParams(th, ph, al, et, false);
    });
  });

  // Pointer drag on the Bloch sphere canvas to adjust (theta, phi)
  let dragging = false, lastPt = null;
  cv.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType === 'mouse' || ev.pointerType === 'pen') {
      dragging = true;
      lastPt = [ev.clientX, ev.clientY];
      cv.setPointerCapture(ev.pointerId);
    }
  });
  cv.addEventListener('pointermove', (ev) => {
    if (!dragging || !lastPt) return;
    const dx = ev.clientX - lastPt[0], dy = ev.clientY - lastPt[1];
    lastPt = [ev.clientX, ev.clientY];
    const nextPhi = ((S.phi + Math.round(dx * 0.6)) % 360 + 360) % 360;
    const nextTheta = clampInt(S.theta + Math.round(dy * 0.5), 0, 180, S.theta);
    setParams(nextTheta, nextPhi, S.alpha, S.eta, true);
  });
  cv.addEventListener('pointerup', () => { dragging = false; lastPt = null; });
  cv.addEventListener('pointercancel', () => { dragging = false; lastPt = null; });

  // Keyboard shortcuts for rotor gates and reset
  document.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const t = ev.target;
    if (t && (t.closest('input, textarea, select, [contenteditable]') || !$('drawer').hidden)) return;
    const k = ev.key.toUpperCase();
    if (['I', 'X', 'Y', 'Z', 'H', 'S', 'T'].includes(k)) {
      applyGate(k);
      ev.preventDefault();
    } else if (k === 'R') {
      resetAll();
      ev.preventDefault();
    }
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch($('app'));
  TRV.onLang(() => { built = ''; schedule(); });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(cv);

  schedule();

  /** Thumbnail cover hook (?thumb=1): sets balanced geometric state (60°, 36°, 30°, 0) and renders two frames. */
  window.TRV_THUMB = () => new Promise((resolve) => {
    S.theta = 60;
    S.phi = 36;
    S.alpha = 30;
    S.eta = 0;
    S.gates = ['H', 'T'];
    built = '';
    schedule();
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  /** Read-only probe for browser regression tests (tests/qubit-geometry.test.mjs). */
  window.QG_DEBUG = {
    frames: () => frames,
    pending: () => pending,
    state: () => ({
      theta: S.theta,
      phi: S.phi,
      alpha: S.alpha,
      eta: S.eta,
      gates: S.gates.slice()
    }),
    info: () => {
      const d = fresh();
      return {
        theta: d.theta,
        phi: d.phi,
        alpha: d.alpha,
        eta: d.eta,
        gates: d.gates.slice(),
        p0: d.p0,
        p1: d.p1,
        dot: d.dot,
        wedge: d.wedge,
        pythAB: d.pythAB,
        overlap: d.overlap,
        V: d.V,
        D: d.D,
        pythDV: d.pythDV,
        blochPure: d.blochPure.slice(),
        blochDecohered: d.blochDecohered.slice(),
        hsDiag: d.hsDiag,
        hsOffPure: d.hsOffPure,
        hsTotalPure: d.hsTotalPure,
        hsOffActive: d.hsOffActive,
        hsTotalActive: d.hsTotalActive,
        entropyPinchNats: d.entropyPinchNats,
        entropyPinchBits: d.entropyPinchBits,
        entropyCurrentNats: d.entropyCurrentNats,
        entropyRemainingNats: d.entropyRemainingNats,
        circuit: circuitTape(d)
      };
    },
    /** The channel E_η that the page applies, on any Bloch vector (pure function; does not change the state). */
    dephase: (bloch, eta) => dephaseBloch(bloch, eta),
    /** Header and bars of the bottom-right ledger as last drawn on the canvas. */
    ledger: () => (lastLedger ? { head: lastLedger.head, bars: lastLedger.bars.map((b) => ({ ...b })) } : null),
    pipeline: () => PIPELINE,
    set: (theta, phi, alpha = S.alpha, eta = S.eta) => setParams(theta, phi, alpha, eta, false),
    applyGate: (name) => applyGate(name),
    resetGates: () => resetAll()
  };
})();
