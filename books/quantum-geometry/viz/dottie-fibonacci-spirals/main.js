/* ORTHO//SPIRALS · 双螺旋对应: why iterating cos θ toward Dottie's constant θ* ≈ 0.7391 winds inward as the curved 2D
   Pythagorean counterpart of the 1D Fibonacci continued-fraction iteration x_{k+1} = 1/(1 + x_k) → φ⁻¹ ≈ 0.6180.
     duo     Left: cobweb whirling squares (y = cos θ, y = 1/(1+x), or both) with equal vertical & horizontal arms
             |B_k − A_k| = |A_{k+1} − B_k| = |f(x_k) − x_k| (180° across two arms per step) and piecewise 90° guides.
             Right: smooth equiangular polar spiral models R(φ)/R₀ = κ^{2φ/π} advancing 90° per step index k.
     cobweb  Full-stage cobweb whirling squares with whole-path vs follow-and-zoom camera (asymptotic self-similarity).
     angle   Left: the 4 smooth polar models (κ = 1, √(sin θ*), sin θ*, φ⁻¹) and acute inward-radial tangent angle α = arctan(1/b).
             Right: 1D additive conservation (φ⁻¹ + φ⁻² = 1) vs 2D Pythagorean conservation ((θ*)² + sin²θ* = 1) at 1:1 scale.
   Reference constants and 21-step discrete orbits (x_0..x_21 and s_0..s_20 across k = 0..20) use 70-digit fixed-point BigInt
   arithmetic; polar coordinates and α use IEEE-754 double precision; zero hardcoded hex colours. Probe: window.SPIRALS_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, TAU } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const SUP = { '−': '⁻', '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const SUB = '₀₁₂₃₄₅₆₇₈₉', sub = (n) => String(n).split('').map((d) => SUB[+d] || d).join('');
  const upAscii = (s) => s.replace(/[a-z]+/g, (m) => m.toUpperCase());
  const sci = (x) => {
    if (x === 0) return '0';
    const a = Math.abs(x), e = Math.floor(Math.log10(a));
    if (e >= -3 && e < 3) return fix(x, Math.max(0, 4 - Math.max(0, e)));
    const m = x / Math.pow(10, e);
    return `${fix(m, 2)}×10${String(e).split('').map((c) => SUP[c] || c).join('')}`;
  };

  /* ---------- 70-digit fixed-point arithmetic ---------- */
  const DIG = 70, ONE = 10n ** BigInt(DIG);
  const big = (n, d = 1) => (BigInt(n) * ONE) / BigInt(d);
  const mul = (a, b) => (a * b) / ONE;
  const div = (a, b) => (a * ONE) / b;
  const absB = (a) => (a < 0n ? -a : a);
  const gcdB = (a, b) => { a = absB(a); b = absB(b); while (b !== 0n) [a, b] = [b, a % b]; return a || 1n; };
  function num(a) {
    if (a === 0n) return 0;
    const neg = a < 0n, s = (neg ? -a : a).toString(), k = Math.min(17, s.length);
    const v = Number(s.slice(0, k)) * Math.pow(10, s.length - k - DIG);
    return neg ? -v : v;
  }
  function str(a, d) {
    const neg = a < 0n, s = absB(a).toString().padStart(DIG + 1, '0'), cut = s.length - DIG;
    return `${neg ? '−' : ''}${s.slice(0, cut)}.${s.slice(cut, cut + d)}`;
  }
  function atanInv(n) {
    const N = BigInt(n), n2 = N * N;
    let p = ONE / N, s = 0n, k = 0n;
    while (p !== 0n) { const t = p / (2n * k + 1n); s += k % 2n ? -t : t; p /= n2; k++; }
    return s;
  }
  const PI = 16n * atanInv(5) - 4n * atanInv(239), TWO_PI = 2n * PI;
  const reduce = (x) => x - BigInt(Math.round(num(x) / (2 * Math.PI))) * TWO_PI;
  function cosB(x) { x = reduce(x); const x2 = mul(x, x); let t = ONE, s = ONE, n = 1n; while (t !== 0n) { t = (-t * x2) / ONE / ((2n * n - 1n) * (2n * n)); s += t; n++; } return s; }
  function sinB(x) { x = reduce(x); const x2 = mul(x, x); let t = x, s = x, n = 1n; while (t !== 0n) { t = (-t * x2) / ONE / ((2n * n) * (2n * n + 1n)); s += t; n++; } return s; }
  function isqrt(n) { let x = BigInt(Math.ceil(Math.sqrt(Number(n)) * (1 + 1e-12))) + 1n; for (;;) { const y = (x + n / x) / 2n; if (y >= x) return x; x = y; } }

  /* ---------- fundamental constants ---------- */
  let THETA = big(739, 1000);
  for (let i = 0; i < 8; i++) THETA -= div(THETA - cosB(THETA), ONE + sinB(THETA));
  const LAM = sinB(THETA);
  const PHI = (ONE + isqrt(5n * ONE * ONE)) / 2n;
  const INV_PHI = PHI - ONE;
  const INV_PHI2 = 2n * ONE - PHI;

  const THd = num(THETA), LAMd = num(LAM), PHId = num(PHI), IPHId = num(INV_PHI), IPHI2d = num(INV_PHI2);
  const SQRT_LAMd = Math.sqrt(LAMd);
  const SUM_1D = num(INV_PHI + INV_PHI2);
  const SUM_2D = num(mul(THETA, THETA) + mul(LAM, LAM));
  const KAPPA_DIFF = num(LAM - INV_PHI);

  function spiralMeta(kappa) {
    if (kappa >= 1) return { kappa: 1, b: 0, alphaRad: Math.PI / 2, alphaDeg: 90, tiltDeg: 0, turn360: 1 };
    const b = (-2 / Math.PI) * Math.log(kappa);
    const alphaRad = Math.atan(1 / b), alphaDeg = (alphaRad * 180) / Math.PI;
    return { kappa, b, alphaRad, alphaDeg, tiltDeg: 90 - alphaDeg, turn360: Math.pow(kappa, 4) };
  }
  const SPIRALS = {
    circle: Object.assign(spiralMeta(1), { id: 'circle', name: ['闭合圆', 'Closed circle'], sym: 'κ = 1', color: () => P.dim, dash: [4, 4] }),
    cobweb: Object.assign(spiralMeta(SQRT_LAMd), { id: 'cobweb', name: ['蛛网双步螺旋', 'Cobweb 2-step'], sym: 'κ = √sin θ*', color: () => P.violet, dash: [5, 3] }),
    clifford: Object.assign(spiralMeta(LAMd), { id: 'clifford', name: ['θ* 正交螺旋', 'θ* orthogonal'], sym: 'κ = sin θ*', color: () => P.cyan, dash: [] }),
    fib: Object.assign(spiralMeta(IPHId), { id: 'fib', name: ['φ⁻¹ 黄金螺旋', 'φ⁻¹ golden'], sym: 'κ = φ⁻¹', color: () => P.magenta, dash: [] })
  };
  const SPIRAL_ORDER = ['circle', 'cobweb', 'clifford', 'fib'];

  /* ---------- exact orbits (k = 0 .. KMAX = 20: 22 iterates x_0..x_21, 21 squares s_0..s_20) ---------- */
  const KMAX = 20;
  const cache = new Map();
  function buildOrbit(kind, x0c) {
    const key = `${kind}|${x0c}`;
    if (cache.has(key)) return cache.get(key);
    const star = kind === 'cos' ? THETA : INV_PHI;
    const xsB = [big(x0c, 100)];
    const rats = [];
    let rp = BigInt(x0c), rq = 100n;
    { const g = gcdB(rp, rq); rp /= g; rq /= g; }
    for (let k = 0; k <= KMAX + 1; k++) {
      if (kind === 'fib') rats.push(`${rp}/${rq}`);
      if (k <= KMAX) {
        if (kind === 'cos') xsB.push(cosB(xsB[k]));
        else { xsB.push(div(ONE, ONE + xsB[k])); [rp, rq] = [rq, rp + rq]; }
      }
    }
    const xs = xsB.map(num);
    const u = xsB.map((x) => num(x - star));
    const du = []; // x_{k+1} - x_k computed at 70-digit precision so follow-zoom never loses precision
    const sides = [], vArms = [], hArms = [], dirs = [];
    for (let k = 0; k <= KMAX; k++) {
      const dB = xsB[k + 1] - xsB[k], d = num(dB), s = Math.abs(d);
      du.push(d);
      sides.push(s);
      // A_k = (x_k, x_k) -> B_k = (x_k, x_{k+1}) -> A_{k+1} = (x_{k+1}, x_{k+1})
      vArms.push(Math.abs(num(xsB[k + 1] - xsB[k])));
      hArms.push(Math.abs(num(xsB[k + 1] - xsB[k])));
      dirs.push(dB === 0n ? ['·', '·'] : dB > 0n ? ['N', 'E'] : ['S', 'W']);
    }
    const out = { kind, star: num(star), slope: kind === 'cos' ? -LAMd : -IPHI2d, xsB, xs, u, du, sides, vArms, hArms, dirs, rationals: rats };
    if (cache.size > 48) cache.clear();
    cache.set(key, out);
    return out;
  }

  /* ---------- state ---------- */
  const S = { scene: 'duo', map: 'cos', cam: 'whole', spiral: 'clifford', focus: 'tilt', x0c: 0 };
  const SC = {
    duo: { max: KMAX, rate: 1.8, name: ['双栏', 'TWIN'] },
    cobweb: { max: KMAX, rate: 1.8, name: ['方格', 'SQUARES'] },
    angle: { max: KMAX, rate: 1.6, name: ['倾角', 'ANGLE'] }
  };
  const step = () => Math.min(KMAX, Math.floor(clock.t + 1e-9));
  const frac = () => clamp(clock.t - Math.floor(clock.t + 1e-9), 0, 1);
  const lerpLog = (a, b, f) => Math.exp(Math.log(Math.max(a, 1e-30)) * (1 - f) + Math.log(Math.max(b, 1e-30)) * f);

  let lastCobwebBox = null; // for pointer dragging x0 along diagonal y = x
  let lastStacked = false;

  /* ---------- equal-aspect 2D sub-box helper ---------- */
  function equalBox(rect, xr, yr, pad) {
    const [pl, pr, pt, pb] = pad;
    const bx = rect.x + pl, by = rect.y + pt;
    const bw = Math.max(12, rect.w - pl - pr), bh = Math.max(12, rect.h - pt - pb);
    const sx = xr[1] - xr[0], sy = yr[1] - yr[0];
    const scale = Math.min(bw / sx, bh / sy);
    const mx = (xr[0] + xr[1]) / 2, my = (yr[0] + yr[1]) / 2;
    const cx = bx + bw / 2, cy = by + bh / 2;
    const x0 = mx - bw / (2 * scale), x1 = mx + bw / (2 * scale);
    const y0 = my - bh / (2 * scale), y1 = my + bh / (2 * scale);
    return {
      bx, by, bw, bh, scale, x0, x1, y0, y1,
      X: (v) => cx + (v - mx) * scale,
      Y: (v) => cy - (v - my) * scale,
      invX: (px) => mx + (px - cx) / scale,
      invY: (py) => my - (py - cy) / scale
    };
  }
  const font = (px, face, weight) => `${weight || 400} ${px}px ${face === 'body' ? TRV.fonts.body : face === 'display' ? TRV.fonts.display : TRV.fonts.data}`;

  function drawArrowSeg(ctx, x1, y1, x2, y2, color, width, lw, headSz) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width * lw;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    if (headSz && len > 8) {
      const h = Math.min(headSz * lw, len * 0.45), ux = dx / len, uy = dy / len;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - ux * h - uy * h * 0.42, y2 - uy * h + ux * h * 0.42);
      ctx.lineTo(x2 - ux * h + uy * h * 0.42, y2 - uy * h - ux * h * 0.42);
      ctx.closePath();
      ctx.fill();
    }
  }

  function cobwebHalfWidth() {
    if (S.cam !== 'follow' || S.map === 'both') {
      const top = Math.max(1.08, S.x0c / 100 + 0.06);
      return (top + 0.06) / 2;
    }
    const O = buildOrbit(S.map, S.x0c), k = step(), f = frac();
    const spanAt = (j) => {
      const idx = Math.min(j, KMAX);
      const m = Math.max(Math.abs(O.u[idx]), Math.abs(O.u[idx + 1]), 1e-15);
      return Math.max(m * 1.65, 1e-15);
    };
    return lerpLog(spanAt(k), spanAt(Math.min(k + 1, KMAX)), f);
  }

  /* ---------- Panel: Cobweb Whirling Squares ---------- */
  function drawCobwebPanel(ctx, rect, lw, showSubTitle) {
    const follow = S.cam === 'follow' && S.map !== 'both';
    const primaryKind = S.map === 'fib' ? 'fib' : 'cos';
    const Omain = buildOrbit(primaryKind, S.x0c);
    const star = Omain.star;
    const pad = TRV.thumbMode ? [18, 18, 18, 18] : [32, 16, showSubTitle ? 24 : 12, 22];

    let B;
    if (follow) {
      const h = cobwebHalfWidth();
      B = equalBox(rect, [-h, h], [-h, h], pad);
      B.starOffset = star;
    } else if (TRV.thumbMode) {
      B = equalBox(rect, [0.46, 1.04], [0.46, 1.04], pad);
      B.starOffset = 0;
    } else {
      const hi = Math.max(1.08, S.x0c / 100 + 0.06);
      B = equalBox(rect, [-0.06, hi], [-0.06, hi], pad);
      B.starOffset = 0;
    }
    const toCoord = (x) => (follow ? x - star : x);
    lastCobwebBox = { B, follow, star };

    // Subtle panel frame & grid
    ctx.save();
    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.strokeStyle = P.panelEdge;
    ctx.lineWidth = 1 * lw;
    ctx.stroke();

    if (!TRV.thumbMode && showSubTitle) {
      const cyc = Omain.sides[0] === 0 ? 's₀ = 0' : (Omain.du[0] > 0 ? 'N→E→S→W' : 'S→W→N→E');
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(L(`蛛网分段 90° 弧 · ${cyc}（每步 180°）`, `PIECEWISE 90° ARCS · ${cyc} (180°/STEP)`), B.bx + 2, B.by - 5);
    }

    // Ticks outside clip
    if (!TRV.thumbMode) {
      ctx.font = font(9.5, 'data');
      ctx.fillStyle = P.dim;
      const ticks = follow
        ? [[-cobwebHalfWidth() * 0.75, null], [0, S.map === 'fib' ? 'φ⁻¹' : 'θ*'], [cobwebHalfWidth() * 0.75, null]]
        : [[0, '0'], ...(S.map === 'both' ? [[IPHId, 'φ⁻¹'], [THd, 'θ*']] : [[star, S.map === 'fib' ? 'φ⁻¹' : 'θ*']]), [1, '1']];
      for (const [val, lab] of ticks) {
        const px = B.X(val), py = B.Y(val);
        if (px >= B.bx + 4 && px <= B.bx + B.bw - 4) {
          ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.7);
          ctx.beginPath(); ctx.moveTo(px, B.by); ctx.lineTo(px, B.by + B.bh); ctx.stroke();
          ctx.textAlign = 'center'; ctx.textBaseline = 'top';
          ctx.fillText(lab || sci(val), px, B.by + B.bh + 4);
        }
        if (py >= B.by + 4 && py <= B.by + B.bh - 4 && lab) {
          ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.7);
          ctx.beginPath(); ctx.moveTo(B.bx, py); ctx.lineTo(B.bx + B.bw, py); ctx.stroke();
          ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
          ctx.fillText(lab, B.bx - 5, py);
        }
      }
    }

    // Clip interior geometry to B
    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.clip();

    // Diagonal y = x
    const dLo = Math.max(B.x0, B.y0), dHi = Math.min(B.x1, B.y1);
    ctx.strokeStyle = P.dim;
    ctx.lineWidth = 1.2 * lw;
    ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.moveTo(B.X(dLo), B.Y(dLo)); ctx.lineTo(B.X(dHi), B.Y(dHi)); ctx.stroke();
    ctx.globalAlpha = 1;

    // Tangent line at fixed point in follow mode or single-map mode
    if (S.map !== 'both') {
      const sl = Omain.slope;
      const xA = B.x0, xB = B.x1;
      const yA = follow ? sl * xA : star + sl * (xA - star);
      const yB = follow ? sl * xB : star + sl * (xB - star);
      ctx.strokeStyle = P.magenta;
      ctx.lineWidth = 1.15 * lw;
      ctx.globalAlpha = follow ? 0.65 : 0.35;
      ctx.setLineDash([5 * lw, 4 * lw]);
      ctx.beginPath(); ctx.moveTo(B.X(xA), B.Y(yA)); ctx.lineTo(B.X(xB), B.Y(yB)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // Curves y = f(x)
    const kinds = S.map === 'both' ? ['fib', 'cos'] : [S.map];
    for (const kind of kinds) {
      const col = kind === 'cos' ? P.cyan : P.magenta;
      ctx.strokeStyle = col;
      ctx.lineWidth = 2 * lw;
      ctx.beginPath();
      let pen = false;
      const N = 160;
      for (let i = 0; i <= N; i++) {
        const u = B.x0 + ((B.x1 - B.x0) * i) / N;
        let v;
        if (follow) {
          v = kind === 'cos'
            ? -2 * THd * Math.sin(u / 2) ** 2 - LAMd * Math.sin(u)
            : (IPHId + u > -0.95 ? -u / ((1 + IPHId) * (1 + IPHId + u)) : NaN);
        } else {
          if (kind === 'cos') v = Math.cos(u);
          else v = u > -0.92 ? 1 / (1 + u) : NaN;
        }
        if (!isFinite(v)) { pen = false; continue; }
        const px = B.X(u), py = B.Y(v);
        if (pen) ctx.lineTo(px, py); else { ctx.moveTo(px, py); pen = true; }
      }
      ctx.stroke();
    }

    // Whirling squares, inscribed 90° arcs, and cobweb steps
    const k = step(), f = frac();
    for (const kind of kinds) {
      const O = buildOrbit(kind, S.x0c);
      const sqCol = kind === 'cos' ? P.cyan : P.magenta;
      const maxJ = k;

      // 1. Nested squares Q_j & 90° arcs for j = 0 .. maxJ
      for (let j = 0; j <= maxJ; j++) {
        const isCur = j === k;
        const xj = follow ? O.u[j] : O.xs[j];
        const xj1 = follow ? O.u[j + 1] : O.xs[j + 1];
        const sj = O.sides[j];
        if (sj * B.scale < 0.6) continue;

        const px0 = B.X(Math.min(xj, xj1)), py0 = B.Y(Math.max(xj, xj1));
        const pw = Math.abs(B.X(xj1) - B.X(xj)), ph = Math.abs(B.Y(xj1) - B.Y(xj));
        ctx.fillStyle = TRV.alpha(isCur ? P.amber : sqCol, isCur ? 0.08 : 0.045);
        ctx.fillRect(px0, py0, pw, ph);
        ctx.strokeStyle = TRV.alpha(isCur ? P.amber : sqCol, isCur ? 0.78 : 0.28);
        ctx.lineWidth = (isCur ? 1.5 : 1) * lw;
        ctx.strokeRect(px0 + 0.5, py0 + 0.5, Math.max(0, pw - 1), Math.max(0, ph - 1));

        // Inscribed 90° arc inside Q_j from A_j(xj, xj) to A_{j+1}(xj1, xj1), bowing toward B_j(xj, xj1)
        const pos = O.du[j] >= 0;
        const arcSteps = 28;
        const sweepFrac = isCur && clock.playing ? f : 1;
        ctx.strokeStyle = isCur ? P.amber : sqCol;
        ctx.globalAlpha = isCur ? 0.92 : 0.72;
        ctx.lineWidth = (isCur ? 2.1 : 1.55) * lw;
        ctx.beginPath();
        for (let m = 0; m <= arcSteps; m++) {
          const ang = (Math.PI / 2) * (m / arcSteps) * sweepFrac;
          const ax = pos ? xj1 - sj * Math.cos(ang) : xj1 + sj * Math.cos(ang);
          const ay = pos ? xj + sj * Math.sin(ang) : xj - sj * Math.sin(ang);
          const qx = B.X(ax), qy = B.Y(ay);
          if (m === 0) ctx.moveTo(qx, qy); else ctx.lineTo(qx, qy);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // 2. Walked cobweb segments j < k
      ctx.strokeStyle = P.sigma;
      ctx.globalAlpha = S.map === 'both' ? 0.52 : 0.68;
      ctx.lineWidth = 1.25 * lw;
      ctx.beginPath();
      for (let j = 0; j < k; j++) {
        const xj = follow ? O.u[j] : O.xs[j];
        const xj1 = follow ? O.u[j + 1] : O.xs[j + 1];
        ctx.moveTo(B.X(xj), B.Y(xj));
        ctx.lineTo(B.X(xj), B.Y(xj1));
        ctx.lineTo(B.X(xj1), B.Y(xj1));
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // 3. Active step k in AMBER (vertical A_k -> B_k, horizontal B_k -> A_{k+1})
      {
        const xk = follow ? O.u[k] : O.xs[k];
        const xk1 = follow ? O.u[k + 1] : O.xs[k + 1];
        const pAx = B.X(xk), pAy = B.Y(xk);
        const pBx = B.X(xk), pBy = B.Y(xk1);
        const pCx = B.X(xk1), pCy = B.Y(xk1);

        if (clock.playing && f < 1) {
          if (f <= 0.5) {
            const u = f * 2;
            const my = pAy + (pBy - pAy) * u;
            drawArrowSeg(ctx, pAx, pAy, pAx, my, P.amber, 2.3, lw, 7);
            ctx.fillStyle = P.amber;
            ctx.beginPath(); ctx.arc(pAx, my, 4 * lw, 0, TAU); ctx.fill();
          } else {
            const u = (f - 0.5) * 2;
            const mx = pBx + (pCx - pBx) * u;
            drawArrowSeg(ctx, pAx, pAy, pBx, pBy, P.amber, 2.3, lw, 6);
            drawArrowSeg(ctx, pBx, pBy, mx, pBy, P.amber, 2.3, lw, 7);
            ctx.fillStyle = P.amber;
            ctx.beginPath(); ctx.arc(mx, pBy, 4 * lw, 0, TAU); ctx.fill();
          }
        } else {
          drawArrowSeg(ctx, pAx, pAy, pBx, pBy, P.amber, 2.3, lw, 6.5);
          drawArrowSeg(ctx, pBx, pBy, pCx, pCy, P.amber, 2.3, lw, 7);
          ctx.fillStyle = P.amber;
          ctx.beginPath(); ctx.arc(pCx, pCy, 4 * lw, 0, TAU); ctx.fill();
        }
      }

      // Static fixed-point ring (cyan for cos, magenta for fib; never amber)
      const fx = toCoord(O.star);
      ctx.fillStyle = TRV.alpha(P.stage, 0.72);
      ctx.strokeStyle = sqCol;
      ctx.lineWidth = 1.8 * lw;
      ctx.beginPath(); ctx.arc(B.X(fx), B.Y(fx), 4.6 * lw, 0, TAU); ctx.fill(); ctx.stroke();
    }

      // Start handle A_0(x_0, x_0) when visible in whole mode
    if (!follow) {
      const sx = B.X(S.x0c / 100), sy = B.Y(S.x0c / 100);
      ctx.fillStyle = P.void;
      ctx.strokeStyle = step() === 0 ? P.amber : (S.map === 'fib' ? P.magenta : P.cyan);
      ctx.lineWidth = 1.8 * lw;
      ctx.beginPath(); ctx.arc(sx, sy, 4.8 * lw, 0, TAU); ctx.fill(); ctx.stroke();
    }

    // In-panel live badge at bottom-right (rational convergent in fib/both, or arm equality in cos)
    if (!TRV.thumbMode) {
      ctx.font = font(10.5, 'data', 600);
      if (S.map === 'both' || S.map === 'fib') {
        const Of = buildOrbit('fib', S.x0c);
        const l1 = `x${sub(k)} = ${Of.rationals[k]}`;
        const l2 = S.map === 'both' ? `θ${sub(k)} = ${fix(buildOrbit('cos', S.x0c).xs[k], 4)}` : '';
        const mw = Math.max(ctx.measureText(l1).width, l2 ? ctx.measureText(l2).width : 0) + 10;
        const mh = l2 ? 30 : 17;
        ctx.fillStyle = TRV.alpha(P.stage, 0.86);
        ctx.fillRect(B.bx + B.bw - 4 - mw, B.by + B.bh - 4 - mh, mw, mh);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        if (l2) {
          ctx.fillStyle = P.magenta;
          ctx.fillText(l1, B.bx + B.bw - 8, B.by + B.bh - 19);
          ctx.fillStyle = P.cyan;
          ctx.fillText(l2, B.bx + B.bw - 8, B.by + B.bh - 6);
        } else {
          ctx.fillStyle = P.magenta;
          ctx.fillText(l1, B.bx + B.bw - 8, B.by + B.bh - 6);
        }
      } else {
        const dir = Omain.dirs[k];
        const txt = `${dir[0]} → ${dir[1]}  s${sub(k)} = ${sci(Omain.sides[k])}`;
        const mw = ctx.measureText(txt).width + 10;
        ctx.fillStyle = TRV.alpha(P.stage, 0.86);
        ctx.fillRect(B.bx + B.bw - 4 - mw, B.by + B.bh - 4 - 17, mw, 17);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = P.amber;
        ctx.fillText(txt, B.bx + B.bw - 8, B.by + B.bh - 6);
      }
    }

    ctx.restore();
  }

  /* ---------- Panel: Concentric Polar Spirals (for `duo` and `angle` left) ---------- */
  function drawPolarPanel(ctx, rect, lw, mode) {
    // mode === 'duo' or mode === 'angle'
    const pad = TRV.thumbMode ? [18, 18, 18, 18] : [20, 20, 24, 22];
    const B = equalBox(rect, [-1.14, 1.14], [-1.14, 1.14], pad);
    const activeSp = SPIRALS[S.spiral];

    ctx.save();
    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.strokeStyle = P.panelEdge;
    ctx.lineWidth = 1 * lw;
    ctx.stroke();

    if (!TRV.thumbMode) {
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = mode === 'angle' && S.focus === 'tilt' ? P.cyan : P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        mode === 'angle'
          ? L('向心径向切角 α = arctan(1/b)', 'INWARD TANGENT ANGLE α = arctan(1/b)')
          : L('光滑等角螺旋模型 · 步 k 记 k×90°', 'SMOOTH SPIRAL MODELS · k×90°'),
        B.bx + 2, B.by - 5
      );
    }

    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.clip();

    // N / E / S / W axes
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.9);
    ctx.lineWidth = 1 * lw;
    ctx.beginPath();
    ctx.moveTo(B.X(-1.05), B.Y(0)); ctx.lineTo(B.X(1.05), B.Y(0));
    ctx.moveTo(B.X(0), B.Y(-1.05)); ctx.lineTo(B.X(0), B.Y(1.05));
    ctx.stroke();

    if (!TRV.thumbMode) {
      ctx.font = font(10, 'display', 600);
      ctx.fillStyle = P.dim;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText('N', B.X(0), B.Y(1.04) - 2);
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('E', B.X(1.04) + 3, B.Y(0));
      ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText('S', B.X(0), B.Y(-1.04) + 2);
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText('W', B.X(-1.04) - 3, B.Y(0));
    }

    // Draw all 4 trajectories: circle, cobweb, fib, clifford
    const phiMax = 4.5 * TAU;
    for (const id of SPIRAL_ORDER) {
      const sp = SPIRALS[id];
      const isFocus = mode === 'angle' ? id === S.spiral : (id === 'clifford' || id === 'fib' || id === S.spiral);
      ctx.strokeStyle = sp.color();
      ctx.lineWidth = (id === S.spiral ? 2.5 : (id === 'clifford' || id === 'fib' ? 2.0 : 1.35)) * lw;
      ctx.globalAlpha = isFocus ? 0.95 : 0.45;
      ctx.setLineDash(sp.dash.map((d) => d * lw));
      ctx.beginPath();
      if (id === 'circle') {
        ctx.arc(B.X(0), B.Y(0), B.scale, 0, TAU);
      } else {
        const N = 320;
        for (let i = 0; i <= N; i++) {
          const ph = (phiMax * i) / N, r = Math.exp(-sp.b * ph);
          if (r * B.scale < 0.4) break;
          const x = r * Math.sin(ph), y = r * Math.cos(ph);
          if (i === 0) ctx.moveTo(B.X(x), B.Y(y)); else ctx.lineTo(B.X(x), B.Y(y));
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    const phiNow = clock.t * (Math.PI / 2);
    const ux = Math.sin(phiNow), uy = Math.cos(phiNow); // unit radial direction from origin

    if (mode === 'duo') {
      // Phase ray & quarter-turn markers on clifford & fib spirals
      ctx.strokeStyle = TRV.alpha(P.amber, 0.55);
      ctx.lineWidth = 1.3 * lw;
      ctx.setLineDash([4 * lw, 3 * lw]);
      ctx.beginPath(); ctx.moveTo(B.X(0), B.Y(0)); ctx.lineTo(B.X(ux), B.Y(uy)); ctx.stroke();
      ctx.setLineDash([]);

      const k = step();
      for (const id of ['fib', 'clifford']) {
        const sp = SPIRALS[id];
        for (let j = 0; j <= k; j++) {
          const ph = j * (Math.PI / 2), r = Math.exp(-sp.b * ph);
          if (r * B.scale < 1.5) break;
          ctx.fillStyle = sp.color();
          ctx.globalAlpha = 0.78;
          ctx.beginPath(); ctx.arc(B.X(r * Math.sin(ph)), B.Y(r * Math.cos(ph)), 2.5 * lw, 0, TAU); ctx.fill();
        }
        ctx.globalAlpha = 1;
        const rNow = Math.exp(-sp.b * phiNow);
        const px = B.X(rNow * ux), py = B.Y(rNow * uy);
        ctx.fillStyle = P.amber;
        ctx.strokeStyle = sp.color();
        ctx.lineWidth = 1.8 * lw;
        ctx.beginPath(); ctx.arc(px, py, 4.4 * lw, 0, TAU); ctx.fill(); ctx.stroke();
      }

      if (!TRV.thumbMode) {
        ctx.font = font(10, 'data', 600);
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillStyle = P.cyan;
        ctx.fillText(`θ*: κ = ${fix(LAMd, 4)} / 90°`, B.bx + 7, B.by + 6);
        ctx.fillStyle = P.magenta;
        ctx.fillText(`φ⁻¹: κ = ${fix(IPHId, 4)} / 90°`, B.bx + 7, B.by + 20);
        if (S.spiral === 'cobweb') {
          ctx.fillStyle = P.violet;
          ctx.fillText(L('蛛网: 每臂 90° (2 臂/步)', 'cobweb: 90°/arm (2/step)'), B.bx + 7, B.by + 34);
        }
      }
    } else {
      // mode === 'angle': Inward-radial tangent angle α (between inward ray -u and forward tangent T)
      const sp = activeSp;
      const rTrue = sp.id === 'circle' ? 1 : Math.exp(-sp.b * phiNow);
      const isMag = sp.id !== 'circle' && rTrue < 0.22;
      // Directly anchor on the true curve point whenever rTrue >= 0.22; if smaller, draw a magnified local spiral arc
      const rG = sp.id === 'circle' ? 1 : (isMag ? 0.62 : rTrue);
      const gx = rG * ux, gy = rG * uy;
      const gPx = B.X(gx), gPy = B.Y(gy);

      if (isMag && rTrue * B.scale >= 1.5) {
        ctx.fillStyle = P.amber;
        ctx.beginPath(); ctx.arc(B.X(rTrue * ux), B.Y(rTrue * uy), 3.2 * lw, 0, TAU); ctx.fill();
      }

      if (isMag) {
        ctx.strokeStyle = sp.color();
        ctx.lineWidth = 2.0 * lw;
        ctx.globalAlpha = 0.85;
        ctx.setLineDash([6 * lw, 3 * lw]);
        ctx.beginPath();
        let pen = false;
        const M = 96;
        for (let i = 0; i <= M; i++) {
          const dph = -0.95 + (2.30 * i) / M;
          const rl = rG * Math.exp(-sp.b * dph);
          if (rl > 1.02 || rl * B.scale < 1.2) { pen = false; continue; }
          const ph = phiNow + dph;
          const lx = B.X(rl * Math.sin(ph)), ly = B.Y(rl * Math.cos(ph));
          if (pen) ctx.lineTo(lx, ly); else { ctx.moveTo(lx, ly); pen = true; }
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // Dashed phase ray from origin out to gauge anchor
      ctx.strokeStyle = TRV.alpha(P.amber, 0.45);
      ctx.lineWidth = 1.25 * lw;
      ctx.setLineDash([4 * lw, 3 * lw]);
      ctx.beginPath(); ctx.moveTo(B.X(0), B.Y(0)); ctx.lineTo(gPx, gPy); ctx.stroke();
      ctx.setLineDash([]);

      // Solid amber INWARD radial vector -u starting at (gx, gy) and pointing toward the fixed-point center (0, 0)
      const inLen = Math.min(0.46, rG * 0.82);
      drawArrowSeg(ctx, gPx, gPy, B.X(gx - inLen * ux), B.Y(gy - inLen * uy), P.amber, 2.25, lw, 6.6);

      // Unit circle tangent tau_c = (cos phi, -sin phi) and spiral tangent T = -cos(alpha)*u + sin(alpha)*tau_c
      const tcx = Math.cos(phiNow), tcy = -Math.sin(phiNow);
      const sa = Math.sin(sp.alphaRad), ca = Math.cos(sp.alphaRad);
      const tsx = -ca * ux + sa * tcx, tsy = -ca * uy + sa * tcy;
      const rayLen = 0.52;

      // Circle tangent ray (dashed grey)
      ctx.strokeStyle = P.dim;
      ctx.lineWidth = 1.5 * lw;
      ctx.setLineDash([4 * lw, 3 * lw]);
      ctx.beginPath();
      ctx.moveTo(gPx, gPy);
      ctx.lineTo(B.X(gx + rayLen * tcx), B.Y(gy + rayLen * tcy));
      ctx.stroke();
      ctx.setLineDash([]);

      // Spiral tangent ray (highlighted spiral color; ink on closed circle so amber stays strictly live-step)
      drawArrowSeg(ctx, gPx, gPy, B.X(gx + rayLen * tsx), B.Y(gy + rayLen * tsy), sp.id === 'circle' ? P.ink : sp.color(), 2.3, lw, 7);

      // Angle arc for α (between inward radial -u and spiral tangent T) in CYAN
      const wR = 0.24;
      ctx.strokeStyle = P.cyan;
      ctx.fillStyle = TRV.alpha(P.cyan, 0.14);
      ctx.lineWidth = 1.6 * lw;
      ctx.beginPath();
      ctx.moveTo(gPx, gPy);
      for (let m = 0; m <= 24; m++) {
        const a = (sp.alphaRad * m) / 24;
        const wx = gx + wR * (-Math.cos(a) * ux + Math.sin(a) * tcx);
        const wy = gy + wR * (-Math.cos(a) * uy + Math.sin(a) * tcy);
        ctx.lineTo(B.X(wx), B.Y(wy));
      }
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      for (let m = 0; m <= 24; m++) {
        const a = (sp.alphaRad * m) / 24;
        const wx = gx + wR * (-Math.cos(a) * ux + Math.sin(a) * tcx);
        const wy = gy + wR * (-Math.cos(a) * uy + Math.sin(a) * tcy);
        if (m === 0) ctx.moveTo(B.X(wx), B.Y(wy)); else ctx.lineTo(B.X(wx), B.Y(wy));
      }
      ctx.stroke();

      // Inward deflection wedge 90° - α (between T and tau_c) in MAGENTA when α < 90°
      if (sp.tiltDeg > 0.05) {
        const mR = 0.34;
        ctx.fillStyle = TRV.alpha(P.magenta, 0.26);
        ctx.strokeStyle = P.magenta;
        ctx.lineWidth = 1.6 * lw;
        ctx.beginPath();
        ctx.moveTo(gPx, gPy);
        for (let m = 0; m <= 18; m++) {
          const a = sp.alphaRad + ((Math.PI / 2 - sp.alphaRad) * m) / 18;
          const wx = gx + mR * (-Math.cos(a) * ux + Math.sin(a) * tcx);
          const wy = gy + mR * (-Math.cos(a) * uy + Math.sin(a) * tcy);
          ctx.lineTo(B.X(wx), B.Y(wy));
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // 360° radial drop marker on North axis (1 -> κ⁴)
      if (sp.id !== 'circle') {
        const r360 = sp.turn360;
        ctx.strokeStyle = P.magenta;
        ctx.lineWidth = 2 * lw;
        ctx.beginPath(); ctx.moveTo(B.X(0), B.Y(1)); ctx.lineTo(B.X(0), B.Y(r360)); ctx.stroke();
        ctx.fillStyle = P.magenta;
        ctx.beginPath(); ctx.arc(B.X(0), B.Y(r360), 3 * lw, 0, TAU); ctx.fill();
      }

      ctx.fillStyle = P.amber;
      ctx.beginPath(); ctx.arc(gPx, gPy, 4.2 * lw, 0, TAU); ctx.fill();

      if (!TRV.thumbMode) {
        ctx.font = font(10.5, 'data', 600);
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillStyle = P.cyan;
        ctx.fillText(L(`向心 α = ${fix(sp.alphaDeg, 2)}°`, `inward α = ${fix(sp.alphaDeg, 2)}°`), B.bx + 7, B.by + 6);
        ctx.fillStyle = P.magenta;
        ctx.fillText(`90°−α = ${fix(sp.tiltDeg, 2)}°`, B.bx + 7, B.by + 20);
        if (isMag) {
          ctx.fillStyle = P.amber;
          ctx.font = font(9.5, 'data', 600);
          ctx.fillText(L('虚线: 放大测角器', 'dashed: scaled gauge'), B.bx + 7, B.by + 34);
        }
        ctx.font = font(10.5, 'data', 600);
        ctx.fillStyle = P.dim;
        ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
        ctx.fillText(`360°: κ⁴ = ${fix(sp.turn360, 4)}`, B.bx + B.bw - 6, B.by + B.bh - 5);
      }
    }

    ctx.restore();
  }

  /* ---------- Panel: 1D Additive vs 2D Pythagorean Unit-Circle Conservation ---------- */
  const ONE_D = '1D: φ⁻¹ + φ⁻² = 1';
  // The exact amber readout above the unit bar: x_k of the reciprocal orbit (a start of 0 reads the orbit started at 1).
  const barTag = (x0c, k, rat) => (x0c === 0 ? `x${sub(k)}(x₀=1)=${rat}` : `x${sub(k)}=${rat}`);
  // Widest painted readout over every supported start (the #x0 control's own range) and every step k = 0 … KMAX:
  // on the bar (right-aligned at its end) and past it (the short "> 1" form). Depends only on the font, so cached by it.
  const widestTags = new Map();
  function widestBarTags(ctx) {
    if (widestTags.has(ctx.font)) return widestTags.get(ctx.font);
    const el = $('x0'), c0 = Math.round(+el.min * 100), c1 = Math.round(+el.max * 100), dc = Math.max(1, Math.round(+el.step * 100));
    const w = { on: 0, off: 0 };
    for (let c = c0; c <= c1; c += dc) {
      let p = BigInt(c === 0 ? 100 : c), q = 100n;
      { const g = gcdB(p, q); p /= g; q /= g; }
      for (let k = 0; k <= KMAX; k++) {
        const t = barTag(c, k, `${p}/${q}`);
        if (p > q) w.off = Math.max(w.off, ctx.measureText(`${t} > 1`).width);
        else w.on = Math.max(w.on, ctx.measureText(t).width);
        [p, q] = [q, p + q];
      }
    }
    widestTags.set(ctx.font, w);
    return w;
  }

  function drawConservationPanel(ctx, rect, lw) {
    const pad = TRV.thumbMode ? [18, 18, 18, 18] : [24, 18, 24, 22];
    const xr = [-0.08, 1.14], yr = [-0.12, 1.42];
    const barHOf = (b) => Math.max(7 * lw, 0.055 * b.scale);
    let B = equalBox(rect, xr, yr, pad);
    // Label lines above the unit bar. Line 1 (bottom baseline 3px above the bar) holds the 1D statement at the bar start
    // and, when it fits to the right of the statement, the amber readout; a readout that does not fit there goes on
    // line 2 directly above, so it is never painted over the statement. Every glyph of a line lies inside its 10px data
    // font box above a 'bottom' baseline, so that box height (lineH) spaces the lines and sizes the room they need.
    let lineH = 0, twoLines = false, w1D = 0;
    if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.textBaseline = 'bottom';
      lineH = ctx.measureText('1D').fontBoundingBoxAscent;
      w1D = ctx.measureText(ONE_D).width;
      ctx.font = font(9.5, 'data', 600);
      const wTag = widestBarTags(ctx);
      // every supported readout fits on line 1 of box b: on the bar it ends at the bar end, past it the right panel edge
      const oneLine = (b) => {
        const minLeft = b.X(0) + w1D + 6;
        return b.X(1) - wTag.on >= minLeft && b.bx + b.bw - 4 * lw - wTag.off >= minLeft;
      };
      const room = (b) => b.Y(1.25) - barHOf(b) / 2 - b.by;
      // The room is a property of the panel and the font, not of the state, so the panel never rescales while stepping.
      // Where the default window lacks it, the window top is raised just enough (room grows with it), so the shared 1:1
      // scale shrinks a little instead of the clip cutting the glyph tops.
      const fit = (need) => {
        if (room(B) >= need) return B;
        let lo = yr[1], hi = 2.6;
        if (room(equalBox(rect, xr, [yr[0], hi], pad)) < need) return B;
        for (let i = 0; i < 40; i++) {
          const mid = (lo + hi) / 2;
          if (room(equalBox(rect, xr, [yr[0], mid], pad)) >= need) hi = mid; else lo = mid;
        }
        return equalBox(rect, xr, [yr[0], hi], pad);
      };
      const one = fit(3 + lineH + 2 * lw);
      twoLines = !oneLine(B) || !oneLine(one);
      B = twoLines ? fit(3 + 2 * lineH + 2 + 2 * lw) : one;
    }
    const emph = S.focus === 'conservation';

    ctx.save();
    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.strokeStyle = emph ? TRV.alpha(P.cyan, 0.55) : P.panelEdge;
    ctx.lineWidth = (emph ? 1.4 : 1) * lw;
    ctx.stroke();

    if (!TRV.thumbMode) {
      ctx.font = font(10.5, 'display', 600);
      ctx.fillStyle = emph ? P.cyan : P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(L('平直相加守恒 vs 弯圆勾股守恒', '1D ADDITIVE vs 2D PYTHAGOREAN'), B.bx + 2, B.by - 5);
    }

    ctx.beginPath();
    ctx.rect(B.bx, B.by, B.bw, B.bh);
    ctx.clip();

    // 1. Top 1D flat unit bar at yBar = 1.25, sharing exact x ∈ [0, 1] scale!
    const yBar = 1.25, barH = barHOf(B);
    const pyBar = B.Y(yBar) - barH / 2;
    const x0P = B.X(0), xSplit = B.X(IPHId), x1P = B.X(1);

    ctx.fillStyle = TRV.alpha(P.cyan, 0.32);
    ctx.fillRect(x0P, pyBar, xSplit - x0P, barH);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.8 * lw;
    ctx.strokeRect(x0P + 0.5, pyBar + 0.5, Math.max(0, xSplit - x0P - 1), barH - 1);

    ctx.fillStyle = TRV.alpha(P.magenta, 0.30);
    ctx.fillRect(xSplit, pyBar, x1P - xSplit, barH);
    ctx.strokeStyle = P.magenta;
    ctx.lineWidth = 1.8 * lw;
    ctx.strokeRect(xSplit + 0.5, pyBar + 0.5, Math.max(0, x1P - xSplit - 1), barH - 1);

    // Static boundary tick at x = φ⁻¹ (ink) and live step-k iterate marker x_k (amber)
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 1.8 * lw;
    ctx.beginPath(); ctx.moveTo(xSplit, pyBar - 2); ctx.lineTo(xSplit, pyBar + barH + 2); ctx.stroke();
    const Of = buildOrbit('fib', S.x0c === 0 ? 100 : S.x0c), kBar = step();
    const xkBar = Of.xs[Math.min(kBar, KMAX)];
    // A start x₀ ∈ (1, 1.5] lies past the unit bar: point beyond its end instead of pinning the marker at 1.
    const offBar = xkBar > 1;
    const tipX = x1P + 2 * lw + Math.max(10 * lw, Math.min(16 * lw, B.bx + B.bw - x1P - 5 * lw));
    if (offBar) {
      drawArrowSeg(ctx, x1P + 2 * lw, pyBar + barH / 2, tipX, pyBar + barH / 2, P.amber, 2.2, lw, 7);
    } else {
      ctx.fillStyle = P.amber;
      ctx.strokeStyle = P.stage;
      ctx.lineWidth = 1.1 * lw;
      ctx.beginPath(); ctx.arc(B.X(xkBar), pyBar, 3.3 * lw, 0, TAU); ctx.fill(); ctx.stroke();
    }

    if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = P.ink;
      ctx.textAlign = 'left';
      ctx.fillText(ONE_D, x0P, pyBar - 3);
      const fibTag = barTag(S.x0c, kBar, Of.rationals[Math.min(kBar, KMAX)]);
      ctx.font = font(9.5, 'data', 600);
      ctx.fillStyle = P.amber;
      ctx.textAlign = 'right';
      // On the bar the readout ends at the bar end; off the bar it says so and ends above the arrow (short form when
      // cramped). It stays on line 1 when it clears the 1D statement there, otherwise it takes line 2 above it.
      const right = B.bx + B.bw - 4 * lw;
      const layout = (minLeft) => {
        if (!offBar) return { t: fibTag, x: x1P, ok: x1P - ctx.measureText(fibTag).width >= minLeft };
        const place = (t) => Math.min(right, Math.max(tipX + 2 * lw, minLeft + ctx.measureText(t).width));
        const full = `${fibTag} > 1${L(' 尺外', ' off-scale')}`, short = `${fibTag} > 1`;
        const t = place(full) - ctx.measureText(full).width >= minLeft ? full : short;
        return { t, x: place(t), ok: place(t) - ctx.measureText(t).width >= minLeft };
      };
      let row = layout(x0P + w1D + 6), yTag = pyBar - 3;
      if (!row.ok && twoLines) { row = layout(B.bx + 2 * lw); yTag -= lineH + 2; }
      ctx.fillText(row.t, row.x, yTag);
      ctx.font = font(10, 'data', 600);
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'center';
      ctx.fillText('0.6180', (x0P + xSplit) / 2, pyBar + barH + 2);
      ctx.fillStyle = P.magenta;
      ctx.fillText('0.3820', (xSplit + x1P) / 2, pyBar + barH + 2);
    }

    // Dashed vertical reference dropping from x = φ⁻¹ (0.6180) inside the 2D unit square
    ctx.strokeStyle = TRV.alpha(P.dim, 0.45);
    ctx.lineWidth = 1 * lw;
    ctx.setLineDash([3 * lw, 3 * lw]);
    ctx.beginPath();
    ctx.moveTo(xSplit, B.Y(0.98));
    ctx.lineTo(xSplit, B.Y(0));
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Bottom 2D Unit Quarter-Circle [0, 1] × [0, 1]
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.95);
    ctx.lineWidth = 1.1 * lw;
    ctx.beginPath();
    ctx.moveTo(B.X(0), B.Y(1.02)); ctx.lineTo(B.X(0), B.Y(0)); ctx.lineTo(B.X(1.03), B.Y(0));
    ctx.stroke();

    // Quarter-circle arc from 0 to π/2
    ctx.strokeStyle = P.dim;
    ctx.lineWidth = 1.5 * lw;
    ctx.setLineDash([4 * lw, 3 * lw]);
    ctx.beginPath();
    for (let i = 0; i <= 64; i++) {
      const a = (Math.PI / 2) * (i / 64);
      const px = B.X(Math.cos(a)), py = B.Y(Math.sin(a));
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlighted arc from 0 to θ* (arc length = θ* = cos θ*!)
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2.6 * lw;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const a = (THd * i) / 40;
      const px = B.X(Math.cos(a)), py = B.Y(Math.sin(a));
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Right triangle (0,0) -> (θ*, 0) -> (θ*, sin θ*)
    ctx.fillStyle = TRV.alpha(P.cyan, 0.08);
    ctx.beginPath();
    ctx.moveTo(B.X(0), B.Y(0));
    ctx.lineTo(B.X(THd), B.Y(0));
    ctx.lineTo(B.X(THd), B.Y(LAMd));
    ctx.closePath();
    ctx.fill();

    // Hypotenuse r = 1
    ctx.strokeStyle = P.sigma;
    ctx.lineWidth = 1.8 * lw;
    ctx.beginPath(); ctx.moveTo(B.X(0), B.Y(0)); ctx.lineTo(B.X(THd), B.Y(LAMd)); ctx.stroke();

    // Base cos θ* = θ* in CYAN
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2.8 * lw;
    ctx.beginPath(); ctx.moveTo(B.X(0), B.Y(0)); ctx.lineTo(B.X(THd), B.Y(0)); ctx.stroke();

    // Altitude sin θ* = λ_θ in MAGENTA
    ctx.strokeStyle = P.magenta;
    ctx.lineWidth = 2.8 * lw;
    ctx.beginPath(); ctx.moveTo(B.X(THd), B.Y(0)); ctx.lineTo(B.X(THd), B.Y(LAMd)); ctx.stroke();

    // Right-angle square marker at (θ*, 0)
    const sq = Math.min(9 * lw, 0.07 * B.scale);
    ctx.strokeStyle = P.dim;
    ctx.lineWidth = 1.2 * lw;
    ctx.strokeRect(B.X(THd) - sq, B.Y(0) - sq, sq, sq);

    // Static fixed-point ring at P = (θ*, sin θ*) in CYAN + INK (never amber)
    const pPx = B.X(THd), pPy = B.Y(LAMd);
    ctx.fillStyle = P.stage;
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.7 * lw;
    ctx.beginPath();
    ctx.arc(pPx, pPy, 6.0 * lw, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.beginPath(); ctx.arc(pPx, pPy, 2.6 * lw, 0, TAU); ctx.fill();

    // Live step-k iterate θ_k projection onto unit circle in AMBER
    const Oc = buildOrbit('cos', S.x0c), k = step();
    const thk = clamp(Oc.xs[Math.min(k, KMAX)], 0, 1.5);
    const kPx = B.X(Math.cos(thk)), kPy = B.Y(Math.sin(thk));
    ctx.strokeStyle = TRV.alpha(P.amber, 0.65);
    ctx.lineWidth = 1.3 * lw;
    ctx.setLineDash([3 * lw, 3 * lw]);
    ctx.beginPath();
    ctx.moveTo(B.X(0), B.Y(0));
    ctx.lineTo(kPx, kPy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = P.amber;
    ctx.strokeStyle = P.stage;
    ctx.lineWidth = 1.1 * lw;
    ctx.beginPath(); ctx.arc(kPx, kPy, 3.6 * lw, 0, TAU); ctx.fill(); ctx.stroke();

    if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.fillStyle = P.ink;
      ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText('2D: (θ*)² + sin²θ* = 1', B.X(0.03), B.Y(1.03));

      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(`θ* ≈ ${fix(THd, 4)}`, B.X(THd * 0.5), B.Y(0) + 4);
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(L('弧 θ*', 'arc θ*'), B.X(Math.cos(THd * 0.48)) + 5, B.Y(Math.sin(THd * 0.48)));

      ctx.fillStyle = P.magenta;
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(`sin θ* ≈ ${fix(LAMd, 4)}`, B.X(THd) - 6, B.Y(LAMd * 0.25));

      ctx.fillStyle = P.sigma;
      ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
      ctx.fillText('1', B.X(THd * 0.44) - 4, B.Y(LAMd * 0.44) - 4);
    }

    ctx.restore();
  }

  /* ---------- Stage painter ---------- */
  function drawStage() {
    const cv = $('cv'), dpr = TRV.fitCanvas(cv), W = cv.clientWidth, H = cv.clientHeight;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const lw = TRV.thumbMode ? 2.0 : 1;
    const stacked = W < 540;
    lastStacked = stacked;
    const pt = TRV.thumbMode ? 16 : (stacked ? 102 : 56);
    const pb = TRV.thumbMode ? 16 : (stacked ? 60 : 46);
    const pl = TRV.thumbMode ? 16 : 16, pr = TRV.thumbMode ? 16 : 16;
    const inner = { x: pl, y: pt, w: Math.max(40, W - pl - pr), h: Math.max(40, H - pt - pb) };

    if (S.scene === 'cobweb') {
      drawCobwebPanel(ctx, inner, lw, false);
    } else if (S.scene === 'duo') {
      const gap = 10;
      const r1 = stacked
        ? { x: inner.x, y: inner.y, w: inner.w, h: (inner.h - gap) / 2 }
        : { x: inner.x, y: inner.y, w: (inner.w - gap) / 2, h: inner.h };
      const r2 = stacked
        ? { x: inner.x, y: inner.y + (inner.h + gap) / 2, w: inner.w, h: (inner.h - gap) / 2 }
        : { x: inner.x + (inner.w + gap) / 2, y: inner.y, w: (inner.w - gap) / 2, h: inner.h };
      drawCobwebPanel(ctx, r1, lw, true);
      drawPolarPanel(ctx, r2, lw, 'duo');
    } else {
      lastCobwebBox = null;
      const gap = 10;
      const r1 = stacked
        ? { x: inner.x, y: inner.y, w: inner.w, h: (inner.h - gap) / 2 }
        : { x: inner.x, y: inner.y, w: (inner.w - gap) / 2, h: inner.h };
      const r2 = stacked
        ? { x: inner.x, y: inner.y + (inner.h + gap) / 2, w: inner.w, h: (inner.h - gap) / 2 }
        : { x: inner.x + (inner.w + gap) / 2, y: inner.y, w: (inner.w - gap) / 2, h: inner.h };
      drawPolarPanel(ctx, r1, lw, 'angle');
      drawConservationPanel(ctx, r2, lw);
    }
  }

  /* ---------- Strip plots ---------- */
  function drawPlots() {
    const A = $('plotA'), B = $('plotB'), k = step();
    if (S.scene !== 'angle') {
      // Plot A: 1D alternating signed residual u_j = x_j - x* across j = 0 .. KMAX
      const Oc = buildOrbit('cos', S.x0c), Of = buildOrbit('fib', S.x0c);
      const uCos = Oc.u.slice(0, KMAX + 1), uFib = Of.u.slice(0, KMAX + 1);
      const showCos = S.map !== 'fib', showFib = S.map !== 'cos';
      const vals = [
        ...(showCos ? uCos : []),
        ...(showFib ? uFib : [])
      ].map(Math.abs);
      const ym = Math.max(0.05, ...vals) * 1.15;
      const g = kit.plot(A, { x: [0, KMAX], y: [-ym, ym], pad: [42, 10, 10, 22] });
      g.axes({ xTicks: [0, 5, 10, 15, 20], yTicks: [-ym * 0.75, 0, ym * 0.75], yFmt: (v) => fix(v, 2) });
      g.hline(0, P.dim, { dash: [3, 3], alpha: 0.7 });
      if (showFib) {
        const pts = uFib.map((u, j) => [j, u]);
        g.line(pts, P.magenta, { width: 1.5 });
        pts.forEach((p, j) => g.dot(p[0], p[1], j === k ? P.amber : P.magenta, j === k ? 4.2 : 2.3));
      }
      if (showCos) {
        const pts = uCos.map((u, j) => [j, u]);
        g.line(pts, P.cyan, { width: 1.6 });
        pts.forEach((p, j) => g.dot(p[0], p[1], j === k ? P.amber : P.cyan, j === k ? 4.2 : 2.4));
      }
      g.vline(k, P.amber, { alpha: 0.55 });
      $('pATitle').textContent = L('交替正负残差', 'Alternating signed error');
      const curU = S.map === 'fib' ? uFib[k] : uCos[k];
      $('pAMeta').textContent = sci(curU);

      // Plot B: Log10 square side s_j = |f(x_j) - x_j| vs exponential slope across j = 0 .. KMAX
      const sCos = Oc.sides.map((s) => Math.max(s, 1e-12));
      const sFib = Of.sides.map((s) => Math.max(s, 1e-12));
      const allS = [...(showCos ? sCos : []), ...(showFib ? sFib : [])];
      const lo = Math.max(1e-11, Math.min(...allS) * 0.5), hi = Math.max(1.2, Math.max(...allS) * 1.6);
      const g2 = kit.plot(B, { x: [0, KMAX], y: [lo, hi], logY: true, pad: [46, 10, 10, 22] });
      const powLbl = (v) => {
        const e = Math.round(Math.log10(v));
        if (e === 0) return '1';
        if (e === -2) return '0.01';
        return `10${String(e).split('').map((c) => SUP[c] || c).join('')}`;
      };
      const yT = [1, 1e-2, 1e-4, 1e-6, 1e-8, 1e-10].filter((v) => v >= lo * 0.8 && v <= hi * 1.2);
      g2.axes({ xTicks: [0, 5, 10, 15, 20], yTicks: yT.map((v) => [v, powLbl(v)]) });
      if (showFib) {
        g2.line(sFib.map((_, j) => [j, sFib[0] * Math.pow(IPHI2d, j)]), P.magenta, { dash: [4, 3], alpha: 0.55, width: 1.2 });
        g2.line(sFib.map((s, j) => [j, s]), P.magenta, { width: 1.6 });
      }
      if (showCos) {
        g2.line(sCos.map((_, j) => [j, sCos[0] * Math.pow(LAMd, j)]), P.cyan, { dash: [4, 3], alpha: 0.55, width: 1.2 });
        g2.line(sCos.map((s, j) => [j, s]), P.cyan, { width: 1.6 });
      }
      g2.vline(k, P.amber, { alpha: 0.55 });
      g2.dot(k, S.map === 'fib' ? sFib[k] : sCos[k], P.amber, 4.2);
      $('pBTitle').textContent = L('方格边长对数缩放', 'Square side log decay');
      $('pBMeta').textContent = sci(S.map === 'fib' ? Of.sides[k] : Oc.sides[k]);
    } else {
      // Angle scene Plot A: R(k·90°)/R_0 across the full rail domain q ∈ [0, KMAX = 20]
      const qMax = KMAX, qNow = clamp(clock.t, 0, qMax);
      const g = kit.plot(A, { x: [0, qMax], y: [0, 1.08], pad: [36, 10, 10, 22] });
      g.axes({ xTicks: [0, 5, 10, 15, 20], yTicks: [0, 0.5, 1] });
      for (const id of SPIRAL_ORDER) {
        const sp = SPIRALS[id];
        const pts = [];
        for (let i = 0; i <= 120; i++) { const q = (qMax * i) / 120; pts.push([q, Math.pow(sp.kappa, q)]); }
        g.line(pts, sp.color(), { width: id === S.spiral ? 2.2 : 1.4, dash: sp.dash, alpha: id === S.spiral ? 1 : 0.65 });
      }
      const rCur = Math.pow(SPIRALS[S.spiral].kappa, qNow);
      g.vline(qNow, P.amber, { alpha: 0.6 });
      g.dot(qNow, rCur, P.amber, 4.3);
      $('pATitle').textContent = L('四轨迹半径 R(k·90°)', 'Radius R(k·90°)');
      $('pAMeta').textContent = `R${sub(k)} = ${sci(rCur)}`;

      // Angle scene Plot B: Constant tangent angle α comparison (70° .. 92°); keep semantic spiral colors, ring selection in ink
      const g2 = kit.plot(B, { x: [70, 92], y: [0.4, 4.6], pad: [58, 12, 10, 22] });
      const rows = [
        [4, SPIRALS.circle, '90.0°'],
        [3, SPIRALS.cobweb, '82.8°'],
        [2, SPIRALS.clifford, '75.9°'],
        [1, SPIRALS.fib, '73.0°']
      ];
      g2.axes({
        xTicks: [[72.97, '73°'], [80, '80°'], [90, '90°']],
        yTicks: rows.map(([y, sp]) => [y, sp.id === 'circle' ? L('圆', 'circle') : sp.id === 'cobweb' ? L('蛛网', 'cobweb') : sp.id === 'clifford' ? 'θ*' : 'φ⁻¹'])
      });
      g2.vline(90, P.dim, { dash: [3, 3], alpha: 0.7 });
      for (const [y, sp] of rows) {
        const on = sp.id === S.spiral;
        g2.line([[70, y], [sp.alphaDeg, y]], sp.color(), { width: on ? 3.4 : 2.0, alpha: on ? 1 : 0.58 });
        g2.dot(sp.alphaDeg, y, sp.color(), on ? 3.8 : 3.0, { alpha: on ? 1 : 0.72 });
        if (on) g2.dot(sp.alphaDeg, y, P.ink, 6.0, { ring: true, width: 1.5 });
      }
      $('pBTitle').textContent = L('向心切角对比', 'Inward tangent angles');
      $('pBMeta').textContent = `${fix(SPIRALS[S.spiral].alphaDeg, 2)}°`;
    }
  }

  /* ---------- HUD, Legend & Readouts ---------- */
  function drawText() {
    const k = step();
    const sp = SPIRALS[S.spiral];
    $('pillScene').querySelector('strong').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillStep').querySelector('strong').textContent = String(k);
    $('pillAngle').querySelector('strong').textContent = `${fix(sp.alphaDeg, 2)}°`;

    // Stage HUD top-left & bottom-left legend: the cobweb entries follow the maps actually drawn (cos θ only when the
    // cosine map is on, 1/(1+x) only when the reciprocal map is on, the dashed tangent only for a single map).
    const hasCos = S.map !== 'fib', hasFib = S.map !== 'cos';
    const tangentItem = S.map !== 'both' ? [`<span><i class="sw dash mg"></i>${L('不动点切线', 'fixed-point tangent')}</span>`] : [];
    if (S.scene === 'cobweb') {
      const kind = S.map === 'fib' ? 'fib' : 'cos', O = buildOrbit(kind, S.x0c);
      $('hudBig').textContent = S.cam === 'follow' && S.map !== 'both'
        ? L(`渐近自相似放大 · 第 ${k} 步`, `ASYMPTOTIC ZOOM · STEP ${k}`)
        : L(`回旋方格 · 第 ${k} 步`, `WHIRLING SQUARES · STEP ${k}`);
      $('hudSub').textContent = L(
        `竖臂 = 横臂 = ${sci(O.sides[k])} · 转向 ${O.dirs[k][0]} → ${O.dirs[k][1]}（单步两臂 180°）`,
        `|ΔV| = |ΔH| = ${sci(O.sides[k])} · turn ${O.dirs[k][0]} → ${O.dirs[k][1]} (180°/step)`
      );
      $('legend').innerHTML = [
        ...(hasCos ? [`<span><i class="sw cy"></i>${L('cos θ 与分段 90° 弧', 'cos θ & 90° guides')}</span>`] : []),
        ...(hasFib ? [`<span><i class="sw mg"></i>${L('1/(1 + x) 与分段 90° 弧', '1/(1 + x) & 90° guides')}</span>`] : []),
        ...tangentItem,
        `<span><i class="sw ink"></i>${L('已走折线', 'walked cobweb')}</span>`,
        `<span><i class="sw am"></i>${L('当前直角步与方格', 'active step & square')}</span>`
      ].join('');
    } else if (S.scene === 'duo') {
      $('hudBig').textContent = S.map === 'both'
        ? L(`双螺旋分工 · 第 ${k} 步`, `PHI & THETA SPIRALS · STEP ${k}`)
        : L(`双螺旋对照 · 第 ${k} 步`, `TWIN SPIRALS · STEP ${k}`);
      $('hudSub').textContent = L(
        `左蛛网每步 180° · 右模型每 90° 乘 sin θ*≈${fix(LAMd, 4)} / φ⁻¹≈${fix(IPHId, 4)}`,
        `Cobweb 180°/step · Polar 90°/step: sin θ*≈${fix(LAMd, 4)} vs φ⁻¹≈${fix(IPHId, 4)}`
      );
      $('legend').innerHTML = [
        `<span><i class="sw cy"></i>${hasCos ? L('cos θ / θ* 正交螺旋', 'cos θ / θ* spiral') : L('θ* 正交螺旋', 'θ* spiral')}</span>`,
        `<span><i class="sw mg"></i>${hasFib ? L('1/(1+x) / φ⁻¹ 黄金螺旋', '1/(1+x) / φ⁻¹ spiral') : L('φ⁻¹ 黄金螺旋', 'φ⁻¹ spiral')}</span>`,
        ...tangentItem,
        `<span><i class="sw vi"></i>${L('蛛网每臂 90° 螺旋', 'cobweb per-arm spiral')}</span>`,
        `<span><i class="sw am"></i>${L('当前步 k 标记', 'active step k')}</span>`
      ].join('');
    } else {
      $('hudBig').textContent = S.focus === 'conservation'
        ? L('一维相加守恒 vs 二维勾股守恒', '1D ADDITIVE vs 2D PYTHAGOREAN')
        : L(`${sp.name[0]} · 向心切角 ${fix(sp.alphaDeg, 2)}°`, `${upAscii(sp.name[1])} · α = ${fix(sp.alphaDeg, 2)}°`);
      $('hudSub').textContent = S.focus === 'conservation'
        ? `φ⁻¹ + φ⁻² = ${fix(IPHId, 4)} + ${fix(IPHI2d, 4)} = 1  |  (θ*)² + sin²θ* = ${fix(THd * THd, 4)} + ${fix(LAMd * LAMd, 4)} = 1`
        : L(
          `向心切角 α = ${fix(sp.alphaDeg, 2)}° · 内偏 90°−α = ${fix(sp.tiltDeg, 2)}° · 360° 乘 ${fix(sp.turn360, 4)}`,
          `Inward-radial α = ${fix(sp.alphaDeg, 2)}° · tilt 90°−α = ${fix(sp.tiltDeg, 2)}° · 360° ×${fix(sp.turn360, 4)}`
        );
      $('legend').innerHTML = [
        `<span><i class="sw cy"></i>${L('θ* 螺旋 / 底边与向心切角 α', 'θ* spiral / base & inward α')}</span>`,
        `<span><i class="sw mg"></i>${L('φ⁻¹ 螺旋 / 垂边与内偏角', 'φ⁻¹ spiral / height & tilt')}</span>`,
        `<span><i class="sw vi"></i>${L('蛛网双步 82.83°', 'cobweb 82.83°')}</span>`,
        `<span><i class="sw dash dm"></i>${L('闭合圆 90.00°', 'closed circle 90.00°')}</span>`,
        `<span><i class="sw am"></i>${L('向心径向与步 k 读数', 'inward ray & step k')}</span>`
      ].join('');
    }

    // Side Readouts
    const Oc = buildOrbit('cos', S.x0c), Of = buildOrbit('fib', S.x0c);
    if (S.scene !== 'angle') {
      const O = S.map === 'fib' ? Of : Oc;
      $('roAside').textContent = `STEP ${k}`;
      $('roKeyL').textContent = S.map === 'both'
        ? L('极坐标每 90° 缩放比 (sin θ* vs φ⁻¹)', 'Polar per-90° factors (sin θ* vs φ⁻¹)')
        : L('当前回旋方格边长 |Bₖ − Aₖ| = |Aₖ₊₁ − Bₖ|', 'Whirling-square arm |Bₖ − Aₖ| = |Aₖ₊₁ − Bₖ|');
      $('roKey').textContent = S.map === 'both'
        ? `${fix(LAMd, 4)} / ${fix(IPHId, 4)}`
        : sci(O.sides[k]);
      $('roKeySub').textContent = S.map === 'both'
        ? L(` 差 +${fix(KAPPA_DIFF, 4)}（+5.56 百分点）`, ` gap +${fix(KAPPA_DIFF, 4)} (+5.56 pp)`)
        : ` (${O.dirs[k][0]} → ${O.dirs[k][1]})`;
      $('roL1').textContent = L('余弦读数 θₖ (→ θ*)', 'Cosine iterate θₖ (→ θ*)');
      $('ro1').textContent = `${fix(Oc.xs[k], 6)}  (δ = ${sci(Oc.u[k])})`;
      $('roL2').textContent = L('黄金连分数 xₖ (→ φ⁻¹)', 'Golden fraction xₖ (→ φ⁻¹)');
      $('ro2').textContent = `${Of.rationals[k]} ≈ ${fix(Of.xs[k], 6)}`;
      $('roL3').textContent = L('余弦单步斜率', 'Cosine slope');
      $('ro3').textContent = `−sin θ* ≈ ${fix(-LAMd, 4)}`;
      $('roL4').textContent = L('黄金单步斜率', 'Golden slope');
      $('ro4').textContent = `−φ⁻² ≈ ${fix(-IPHI2d, 4)}`;
      $('roL5').textContent = L('两套守恒律核对', 'Conservation check');
      $('ro5').textContent = `φ⁻¹+φ⁻² = ${fix(SUM_1D, 6)} · (θ*)²+sin²θ* = ${fix(SUM_2D, 6)}`;
      $('roNote').textContent = L(
        '每步竖横两臂等长（绕不动点转 180°）：x₀ < x* 按 N→E→S→W 起步，x₀ > x* 按 S→W→N→E 起步；右栏光滑模型按每步 k 记一次 90° 转向。',
        'Each step walks two equal perpendicular arms (180°): N→E→S→W for x₀ < x* and S→W→N→E for x₀ > x*, while the polar models advance 90° per index k.'
      );
    } else {
      $('roAside').textContent = sp.sym;
      $('roKeyL').textContent = L('恒定向心径向切角 α = arctan(1/b)', 'Constant inward-radial tangent angle α = arctan(1/b)');
      $('roKey').textContent = `${fix(sp.alphaDeg, 2)}°`;
      $('roKeySub').textContent = L(` 内偏 90°−α = ${fix(sp.tiltDeg, 2)}°`, ` inward tilt ${fix(sp.tiltDeg, 2)}°`);
      $('roL1').textContent = L('一维平直加法守恒', '1D flat additive sum');
      $('ro1').textContent = `${fix(IPHId, 6)} + ${fix(IPHI2d, 6)} = ${fix(SUM_1D, 6)}`;
      $('roL2').textContent = L('二维弯圆勾股守恒', '2D curved Pythagorean sum');
      $('ro2').textContent = `${fix(THd * THd, 6)} + ${fix(LAMd * LAMd, 6)} = ${fix(SUM_2D, 6)}`;
      $('roL3').textContent = S.spiral === 'cobweb'
        ? L('每转 90° 因子 κ（单折臂）', 'Per-90° factor κ (1 arm)')
        : L('每转 90° 因子 κ', '90° factor κ');
      $('ro3').textContent = fix(sp.kappa, 6);
      $('roL4').textContent = L('绕满 360° 因子 κ⁴', '360° factor κ⁴');
      $('ro4').textContent = fix(sp.turn360, 6);
      $('roL5').textContent = L('四轨迹向心切角总览', 'Four inward tangent angles');
      $('ro5').textContent = `90.00° · 82.83° · 75.88° · 72.97°`;
      $('roNote').textContent = S.spiral === 'cobweb'
        ? L(
          '蛛网双步螺旋把一次两臂 180° Picard 迭代均摊到每折臂 90°（κ = √sin θ*），向心径向射线与前进切线成 82.83° 锐角。',
          'The cobweb two-step spiral spreads one 180° two-arm Picard step across 90° per arm (κ = √sin θ*), holding an 82.83° acute angle to the inward radial ray.'
        )
        : L(
          'α 是指向不动点的向心径向射线与前进切线的恒定锐夹角：闭合圆恰为 90°，螺旋略小于 90°，绕满一圈便向内收进下一层。',
          'α is the constant acute angle between the inward radial ray (toward the fixed point) and the forward tangent: 90° closes a circle; α < 90° spirals inward.'
        );
    }
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: KMAX, rate: 1.8, step: 1,
    format: (t, max) => {
      const k = Math.min(KMAX, Math.floor(t + 1e-9));
      return `${L('步', 'step')} ${k} <small>/ ${max.toFixed(0)}</small>`;
    },
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt) { const at = stopAt; stopAt = null; c.pause(); c.set(at); return; }
      paint();
    }
  });

  function syncControlVisibility() {
    document.querySelectorAll('[data-scenes]').forEach((el) => {
      el.hidden = !el.dataset.scenes.split(' ').includes(S.scene);
    });
    const followBtn = document.querySelector('[data-cam="follow"]');
    if (followBtn) followBtn.toggleAttribute('disabled', S.map === 'both');
    if (S.map === 'both' && S.cam === 'follow') { S.cam = 'whole'; camChips.set('whole', true); }
  }

  function setScene(sc, t) {
    S.scene = sc;
    sceneChips.set(sc, true);
    syncControlVisibility();
    clock.pause();
    clock.rate = SC[sc].rate;
    clock.setMax(SC[sc].max, true);
    clock.set(t == null ? 0 : t);
  }

  const leave = () => { stopAt = null; cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, step()); });
  const fX0 = kit.field($('x0'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.x0c = Math.round(v * 100); leave(); paint(); } });
  const mapChips = kit.chips($('mapChips'), 'map', (v) => {
    S.map = v;
    if (v === 'fib' && S.x0c === 0) { S.x0c = 100; fX0.set(1); }
    syncControlVisibility();
    leave();
    paint();
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => { S.cam = v; leave(); paint(); });
  const spiralChips = kit.chips($('spiralChips'), 'spiral', (v) => { S.spiral = v; leave(); paint(); });
  const focusChips = kit.chips($('focusChips'), 'focus', (v) => { S.focus = v; leave(); paint(); });
  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });

  // Pointer drag for start x0 on the cobweb sub-panel
  let dragging = false;
  function dragTo(ev) {
    if (!lastCobwebBox || S.scene === 'angle') return;
    const b = $('cv').getBoundingClientRect();
    const px = ev.clientX - b.left, py = ev.clientY - b.top;
    const { B, follow, star } = lastCobwebBox;
    const raw = B.invX(px) + (follow ? star : 0);
    const x = clamp(Math.round(raw * 100) / 100, 0, 1.5);
    if (S.cam === 'follow') { S.cam = 'whole'; camChips.set('whole', true); }
    S.x0c = Math.round(x * 100);
    fX0.set(x);
    leave();
    paint();
  }
  $('cv').addEventListener('pointerdown', (ev) => {
    if (S.scene === 'angle' || !lastCobwebBox) return;
    const b = $('cv').getBoundingClientRect();
    const px = ev.clientX - b.left, py = ev.clientY - b.top;
    const { B } = lastCobwebBox;
    if (px < B.bx - 12 || px > B.bx + B.bw + 12 || py < B.by - 12 || py > B.by + B.bh + 12) return;
    if (S.cam === 'follow') { S.cam = 'whole'; camChips.set('whole', true); paint.now(); }
    dragging = true;
    try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic pointer */ }
    dragTo(ev);
  });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) dragTo(ev); });
  const drop = () => { dragging = false; };
  $('cv').addEventListener('pointerup', drop);
  $('cv').addEventListener('pointercancel', drop);

  const MAP_CYCLE = ['cos', 'fib', 'both'];
  const SPIRAL_CYCLE = ['clifford', 'fib', 'cobweb', 'circle'];
  kit.keys({
    1: () => { leave(); stopAt = null; setScene('duo', step()); },
    2: () => { leave(); stopAt = null; setScene('cobweb', step()); },
    3: () => { leave(); stopAt = null; setScene('angle', step()); },
    m: () => {
      if (S.scene === 'angle') return;
      const nxt = MAP_CYCLE[(MAP_CYCLE.indexOf(S.map) + 1) % MAP_CYCLE.length];
      mapChips.set(nxt);
    },
    s: () => {
      if (S.scene === 'cobweb') return;
      const nxt = SPIRAL_CYCLE[(SPIRAL_CYCLE.indexOf(S.spiral) + 1) % SPIRAL_CYCLE.length];
      spiralChips.set(nxt);
    }
  });

  /* ---------- 6 citable experiment cards ---------- */
  const CARDS = {
    whirl: { scene: 'cobweb', map: 'cos', cam: 'whole', spiral: 'clifford', focus: 'tilt', x0: 0, to: 8, still: 5 },
    twin: { scene: 'duo', map: 'cos', cam: 'whole', spiral: 'clifford', focus: 'tilt', x0: 0, to: 8, still: 8 },
    pythagoras: { scene: 'angle', map: 'cos', cam: 'whole', spiral: 'clifford', focus: 'conservation', x0: 0, to: 8, still: 8 },
    tilt: { scene: 'angle', map: 'cos', cam: 'whole', spiral: 'clifford', focus: 'tilt', x0: 0, to: 1, still: 1 },
    zoom: { scene: 'cobweb', map: 'cos', cam: 'follow', spiral: 'clifford', focus: 'tilt', x0: 0, to: 12, still: 12 },
    division: { scene: 'duo', map: 'both', cam: 'whole', spiral: 'fib', focus: 'tilt', x0: 1, to: 7, still: 7 }
  };
  const NOTES = {
    whirl: [
      '从 θ₀ = 0 出发反复取余弦：每步竖走 |cos θₖ − θₖ| 到青色曲线，再横走同样长度回灰线 y = θ（单步两臂绕青色不动点圆环 (θ*, θ*) 转 180°），按“北 → 东 → 南 → 西”嵌套出方格与分段 90° 青色导引弧；静止帧 k = 5 已完成 Q₀…Q₄ 五次递推，琥珀色专标当前递推 Q₅（共显示 6 次递推）。',
      'Starting from θ₀ = 0 (< θ*), each cosine update walks vertically by |cos θₖ − θₖ| to the cyan curve and horizontally by the same length back to y = θ (180° across two arms), nesting squares and piecewise 90° cyan guides clockwise (N → E → S → W) around (θ*, θ*); at k = 5, five completed updates Q₀…Q₄ precede active amber Q₅ (six updates shown).'
    ],
    twin: [
      '共用步数指标 k = 8：左栏每次 Picard 递推走两段等长直角臂转 180°，已完成 8 次历史递推 Q₀…Q₇（绕四整圈）并正以琥珀色走出步指标 k = 8 的当前递推 Q₈（画面共显示 9 次递推、4.5 圈回旋方格与分段 90° 导引弧）；右栏光滑等角螺旋模型停在极坐标步 k = 8（φ₈ = 4π，每步转 90° 共两整圈），对比青色 θ* 螺旋（0.6736）、品红黄金螺旋（0.6180，相差 0.0556）与紫色蛛网每臂螺旋（0.8207）。',
      'At shared step index k = 8: on the left, eight completed historical Picard updates Q₀…Q₇ (four full cobweb turns at 180°/step) plus the active amber step-8 update Q₈ display nine updates (4.5 cobweb turns) with piecewise 90° square guides; on the right, smooth polar models sit at polar step k = 8 (φ₈ = 4π, two polar turns at 90°/step), contrasting cyan θ* (0.6736), magenta Fibonacci (0.6180, a 0.0556 gap) and violet per-arm cobweb (0.8207) spirals.'
    ],
    pythagoras: [
      '右栏按 1:1 比例上下对照两套守恒律：上方平直单位尺在亮白刻度处分成青色 φ⁻¹ ≈ 0.6180 与品红 φ⁻² ≈ 0.3820 两段相加（φ⁻¹ + φ⁻² = 1）；下方把尺弯成单位圆弧 θ* = cos θ*，青色圆环不动点 P(θ*, sin θ*) 把斜边 1 拆成青色底边 θ* ≈ 0.7391 与品红垂边 sin θ* ≈ 0.6736 的平方和（琥珀色只标步指标 k 的动态读数 xₖ、θₖ）。',
      'The right panel contrasts the two conservation laws at 1:1 scale: on top, the flat unit bar divides at the ink tick into cyan φ⁻¹ ≈ 0.6180 plus magenta φ⁻² ≈ 0.3820 (φ⁻¹ + φ⁻² = 1); below, bending the ruler onto the unit circle sets arc θ* = cos θ*, where the cyan-ringed fixed point P(θ*, sin θ*) splits hypotenuse 1 by squares into cyan base θ* ≈ 0.7391 and magenta height sin θ* ≈ 0.6736 (amber marks only live step-k iterates xₖ, θₖ).'
    ],
    tilt: [
      '在极坐标步指标 k = 1（φ₁ = π/2，半径 r = sin θ* ≈ 0.6736）真实曲线点上，左栏同时画出指向圆心的琥珀色向心径向射线、灰色虚线圆切线与青色螺旋前进切线：向心射线与前进切线间的青色锐夹角即 α ≈ 75.88°（内偏品红楔角 14.12°），局部似圆而绕满 360° 缩至 κ⁴ = 0.2059。',
      'Directly on the curve at polar step k = 1 (φ₁ = π/2, radius r = sin θ* ≈ 0.6736), the left panel draws the amber inward radial vector (toward the center), the dashed grey circle tangent and the cyan forward tangent: the cyan acute sector between inward ray and forward tangent is α ≈ 75.88° (a 14.12° magenta inward tilt), shrinking to κ⁴ = 0.2059 after 360°.'
    ],
    zoom: [
      '镜头锁定青色不动点圆环 (θ*, θ*) 并随当前误差同步重标（从 k = 4 到 k = 12 放大 |δ₄/δ₁₂| ≈ 24.36 倍，逼近渐近比 (sin θ*)⁻⁸ ≈ 23.59；步指标 k = 12 已完成 Q₀…Q₁₁ 十二次递推，当前琥珀色方格 Q₁₂ 边长 s₁₂ ≈ 0.0058）：青色余弦曲线已贴合品红虚线切线，琥珀色直角步 Q₁₂ 与分段 90° 方格弧在视觉上几乎重现 Q₄ 的几何比例。',
      'Locked on the cyan fixed-point ring (θ*, θ*) and rescaled with the current error (magnifying |δ₄/δ₁₂| ≈ 24.36× from k = 4 to k = 12, approaching (sin θ*)⁻⁸ ≈ 23.59×; at k = 12, after twelve completed updates Q₀…Q₁₁, active amber square Q₁₂ has side s₁₂ ≈ 0.0058), the cyan cosine curve lies flat along the dashed magenta tangent and Q₁₂ visually reproduces the proportions of Q₄.'
    ],
    division: [
      '共用步指标 k = 7，从同一起点 x₀ = 1（高于两处不动点，故蛛网按 S→W→N→E 起步）同时递推：左栏已完成 Q₀…Q₆ 七次历史递推并以琥珀色标出当前递推 Q₇（品红 1/(1 + x) 踏过渐近分数 1/1、1/2、2/3、3/5、5/8、8/13、13/21、21/34 夹住 φ⁻¹ ≈ 0.6180，青色 cos θ 收向 θ* ≈ 0.7391）；右栏停在极坐标步 k = 7（φ₇ = 7π/2）对照品红黄金螺旋与青色正交螺旋的收束速度。',
      'At shared step index k = 7 from x₀ = 1 (above both fixed points, entering clockwise at S→W→N→E): on the left, seven completed updates Q₀…Q₆ plus active amber Q₇ step magenta 1/(1 + x) through 1/1, 1/2, 2/3, 3/5, 5/8, 8/13, 13/21, 21/34 around φ⁻¹ ≈ 0.6180 while cyan cos θ winds into θ* ≈ 0.7391; on the right, polar step k = 7 (φ₇ = 7π/2) compares the smooth golden and cosine spiral models.'
    ]
  };

  let booting = true;
  function run(sc, to, still) {
    setScene(sc, 0);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(still == null ? to : still); return; }
    stopAt = to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  function applyPreset(id) {
    const c = CARDS[id];
    stopAt = null;
    S.map = c.map; mapChips.set(c.map, true);
    S.cam = c.cam; camChips.set(c.cam, true);
    S.spiral = c.spiral; spiralChips.set(c.spiral, true);
    S.focus = c.focus; focusChips.set(c.focus, true);
    S.x0c = Math.round(c.x0 * 100); fX0.set(c.x0);
    syncControlVisibility();
    run(c.scene, c.to, c.still);
  }
  const cards = kit.cards($('presets'), {
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: [
      '自由探索：切换双栏/方格/倾角场景，拖动对角线起点 x₀，对比四条轨迹的切角与两套守恒律。',
      'Free play: switch between Twin, Squares and Angle scenes, drag x₀ along the diagonal, and compare all four tangent angles and conservation laws.'
    ]
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.SPIRALS_DEBUG = {
    get state() {
      const k = step(), Oc = buildOrbit('cos', S.x0c), Of = buildOrbit('fib', S.x0c);
      const spMap = {};
      for (const id of SPIRAL_ORDER) {
        const x = SPIRALS[id];
        spMap[id] = { kappa: x.kappa, b: x.b, alphaDeg: x.alphaDeg, tiltDeg: x.tiltDeg, turn360: x.turn360 };
      }
      return {
        scene: S.scene,
        map: S.map,
        cam: S.cam,
        spiral: S.spiral,
        focus: S.focus,
        x0: S.x0c / 100,
        step: k,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        stopAt,
        preset: cards.current,
        stacked: lastStacked,
        viewHalf: cobwebHalfWidth(),
        anglePlotQ: clamp(clock.t, 0, KMAX),
        anglePlotR: Math.pow(SPIRALS[S.spiral].kappa, clamp(clock.t, 0, KMAX)),
        thetaStar: str(THETA, 60),
        sinThetaStar: str(LAM, 60),
        phi: str(PHI, 60),
        invPhi: str(INV_PHI, 60),
        invPhi2: str(INV_PHI2, 60),
        sum1D: SUM_1D,
        sum2D: SUM_2D,
        kappaDiff: KAPPA_DIFF,
        spirals: spMap,
        cosOrbit: { xs: Oc.xs.slice(), u: Oc.u.slice(), sides: Oc.sides.slice(), vArms: Oc.vArms.slice(), hArms: Oc.hArms.slice(), dirs: Oc.dirs.slice() },
        fibOrbit: { xs: Of.xs.slice(), u: Of.u.slice(), sides: Of.sides.slice(), vArms: Of.vArms.slice(), hArms: Of.hArms.slice(), dirs: Of.dirs.slice(), rationals: Of.rationals.slice() }
      };
    },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    cobwebAt: (x) => {
      paint.now();
      if (!lastCobwebBox) return null;
      const b = $('cv').getBoundingClientRect();
      const { B, follow, star } = lastCobwebBox;
      const c = follow ? x - star : x;
      return [b.left + B.X(c), b.top + B.Y(c)];
    }
  };

  window.TRV_THUMB = () => {
    S.map = 'cos'; mapChips.set('cos', true);
    S.cam = 'whole'; camChips.set('whole', true);
    S.spiral = 'clifford'; spiralChips.set('clifford', true);
    S.x0c = 100; fX0.set(1);
    setScene('duo', 6);
    paint.now();
  };

  syncControlVisibility();
  cards.pick(cards.initial('twin'));
  booting = false;
  paint();
})();
