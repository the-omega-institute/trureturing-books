/* ZYZ//COMPILE: compiling three Euler turns into one rotor, on the unit sphere.
   The rotor R(α, β, γ) = R_z(α) R_y(β) R_z(γ) acts on vectors by the sandwich v ↦ R v R̃; its rightmost factor acts
   first, so the rail plays γ about z, then β about y, then α about z, one unit per turn. Rotors are multivectors of
   Cl(3,0) on the eight blade masks (bit i = e_{i+1}), multiplied by XOR with the reordering sign, the rule of the
   chapter's Python compiler; R_u(θ) = cos(θ/2) − sin(θ/2) B_u with B_z = e1e2, B_y = e3e1 = −e1e3, B_x = e2e3.
   The amber arrow v is a pure state; the white tripod is where e1, e2, e3 are carried. During a turn the cyan segment
   is the shadow of v on that turn's axis (it stays) and the magenta fan the area v⊥ sweeps round it. "One axis"
   draws the rotor's own axis n and the single turn about it.
   Read-only probe for the browser suite: window.ZYZ_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, BASIS = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const AXIS = { z: [0, 0, 1], y: [0, 1, 0], x: [1, 0, 0] };

  /* ---------- Cl(3,0) on blade masks ---------- */
  const pop = (m) => (m & 1) + ((m >> 1) & 1) + ((m >> 2) & 1);
  /** Sign of e_left · e_right (the number of transpositions that sorts the product). */
  function bladeSign(l, r) { let inv = 0; for (let i = 0; i < 3; i++) if ((l >> i) & 1) inv += pop(r & ((1 << i) - 1)); return inv % 2 ? -1 : 1; }
  function mul(A, B) {
    const out = new Array(8).fill(0);
    for (let l = 0; l < 8; l++) if (A[l]) for (let r = 0; r < 8; r++) if (B[r]) out[l ^ r] += A[l] * B[r] * bladeSign(l, r);
    return out;
  }
  const rev = (A) => A.map((c, m) => { const g = pop(m); return (g * (g - 1) / 2) % 2 ? -c : c; });
  /** The plane B_u of a turn about u, as [mask, coefficient]. */
  const PLANE = { z: [3, 1], y: [5, -1], x: [6, 1] };
  function rotor(ax, th) { const R = new Array(8).fill(0), [m, c] = PLANE[ax]; R[0] = Math.cos(th / 2); R[m] = -Math.sin(th / 2) * c; return R; }
  const vec = (v) => [0, v[0], v[1], 0, v[2], 0, 0, 0];
  /** The sandwich R v R̃, read back as a vector (masks 1, 2, 4). */
  function apply(R, v) { const m = mul(mul(R, vec(v)), rev(R)); return [m[1], m[2], m[4]]; }

  /* ---------- model ---------- */
  const S = { a: 0, b: 0, g: 0, v0: [1, 0, 0], fold: false };
  /** The three turns in order of action. */
  const segs = () => [{ ax: 'z', ang: S.g, name: 'γ' }, { ax: 'y', ang: S.b, name: 'β' }, { ax: 'z', ang: S.a, name: 'α' }];
  const share = (t, i) => kit.clamp(t - i, 0, 1);
  /** The rotor multiplied up to rail position t: R_z(α f₃) R_y(β f₂) R_z(γ f₁). */
  const partial = (t) => mul(mul(rotor('z', S.a * share(t, 2)), rotor('y', S.b * share(t, 1))), rotor('z', S.g * share(t, 0)));
  const coeffs = (R) => ({ s: R[0], b12: R[3], b13: R[5], b23: R[6] });
  /** The rotor's own axis and angle: R = cos(φ/2) − sin(φ/2)(n₁e₂₃ + n₂e₃₁ + n₃e₁₂). */
  function axisAngle(R) {
    const c = coeffs(R), B = Math.hypot(c.b12, c.b13, c.b23);
    return { n: B > 1e-12 ? [-c.b23 / B, c.b13 / B, -c.b12 / B] : null, phi: 2 * Math.atan2(B, c.s) };
  }
  /** The turn whose sweep is shown at t: the one in progress, else the last finished one with a non-zero angle. */
  function segAt(t) {
    const W = segs();
    let k = Math.min(2, Math.floor(t + 1e-9));
    if (k > 0 && t - k < 1e-9) k -= 1;
    while (k >= 0 && Math.abs(W[k].ang) < 1e-12) k--;
    return k;
  }
  /** ρ = blochMatrix(1, v) = ½(I + v₀X + v₁Y + v₂Z) as [[re, im], …] and what the page reads back from it. */
  function rhoOf(v) {
    const rho = [[[(1 + v[2]) / 2, 0], [v[0] / 2, -v[1] / 2]], [[v[0] / 2, v[1] / 2], [(1 - v[2]) / 2, 0]]];
    const cm = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
    let idem = 0;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const a = cm(rho[i][0], rho[0][j]), b = cm(rho[i][1], rho[1][j]);
      idem = Math.max(idem, Math.abs(a[0] + b[0] - rho[i][j][0]), Math.abs(a[1] + b[1] - rho[i][j][1]));
    }
    const back = [2 * rho[0][1][0], -2 * rho[0][1][1], rho[0][0][0] - rho[1][1][0]];
    return { rho, tr: rho[0][0][0] + rho[1][1][0], back, norm: v3.len(back), idem };
  }

  /* ---------- stage ---------- */
  let grab = false;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.4 : 0.33, cy: 0.54, yaw: -0.75, pitch: 0.35,
    onChange: () => paint(),
    onPick: (ev, st) => { grab = st.near(ev, S.v0) < 22; return grab; },
    onDrag: (ev, st) => { if (!grab) return; S.v0 = v3.unit(st.pick(ev)); vecChips.set(null, true); cards.mark(null); paint(); },
    onDrop: () => { grab = false; }
  });
  const fmtCoef = (x, d) => `${x < 0 && fix(x, d) !== fix(0, d) ? '−' : '+'} ${fix(Math.abs(x), d)}`;
  const fmtR = (R, d = 3) => { const c = coeffs(R); return `${fix(c.s, d)} ${fmtCoef(c.b12, d)} e₁₂ ${fmtCoef(c.b13, d)} e₁₃ ${fmtCoef(c.b23, d)} e₂₃`; };
  const fmtV = (v, d = 3) => `(${v.map((x) => fix(x, d)).join(', ')})`;
  const sub = ['₁', '₂', '₃'];

  function drawStage() {
    const st = stage, ctx = st.begin(), t = clock.t, R = partial(t), v = apply(R, S.v0), thick = TRV.thumbMode ? 1.5 : 1;
    const W = segs(), k = segAt(t), live = k >= 0 ? W[k] : null;
    st.sphere(1, { lat: [0], lon: 2, shade: 0.05, alpha: TRV.thumbMode ? 0.6 : 0.34 });
    // the fixed axes: z and y turn the arrow, x is only a reference
    st.line([-1.25, 0, 0], [1.25, 0, 0], { color: P.dim, width: 1, alpha: 0.6, back: 0.4 });
    st.tag('ax', [1.38, 0, 0], 'x', 'num', {});
    for (const ax of ['y', 'z']) {
      const hot = live && live.ax === ax, u = AXIS[ax];
      st.line(v3.scale(u, -1.25), v3.scale(u, 1.25), { color: P.violet, width: (hot ? 2.8 : 1.4) * thick, alpha: hot ? 1 : 0.6, back: 0.5 });
      st.tag('a' + ax, v3.scale(u, 1.4), ax, 'num c-vi', {});
    }
    // this turn: the shadow on its axis (cyan) and the area the in-plane part sweeps (magenta)
    let halfTag = false;
    if (live) {
      const u = AXIS[live.ax], f = share(t, k), w0 = apply(partial(k), S.v0), th = live.ang * f;
      const c = v3.scale(u, v3.dot(w0, u)), r = v3.len(v3.sub(w0, c));
      if (v3.len(c) > 0.02) { st.line([0, 0, 0], c, { color: P.cyan, width: 3.2 * thick, alpha: 0.95, back: 0.6 }); st.dot(c, 3.6, P.cyan, { fade: false }); }
      if (r > 0.02) {
        st.circle(c, u, r, { color: P.magenta, width: 1 * thick, alpha: 0.55, dash: [4, 4], back: 0.3 });
        const n = Math.max(2, Math.ceil(Math.abs(th) / (3 * DEG))), fan = [c];
        for (let i = 0; i <= n; i++) fan.push(v3.add(c, v3.rot(v3.sub(w0, c), u, th * i / n)));
        if (Math.abs(th) > 1e-6) {
          st.poly(fan, { fill: P.magenta, alpha: 0.2 });
          st.path(fan.slice(1), { color: P.magenta, width: 2 * thick, alpha: 0.95, back: 0.45 });
          const mid = v3.add(c, v3.rot(v3.sub(w0, c), u, th / 2));
          st.line(c, mid, { color: P.magenta, width: 1 * thick, alpha: 0.7, dash: [3, 3], back: 0.4 });
          if (Math.abs(th) > 25 * DEG && !TRV.thumbMode) {
            const h = fix(Math.abs(th) / 2 / DEG, 1);
            st.tag('half', v3.add(c, v3.scale(v3.sub(mid, c), 1.2)), `${h}° + ${h}°`, 'num mg', { dx: 0, dy: -12 });
            halfTag = true;
          }
        }
        st.line(c, w0, { color: P.magenta, width: 1.2 * thick, alpha: 0.6, back: 0.35 });
        st.line(c, v, { color: P.magenta, width: 2 * thick, alpha: 0.95, back: 0.45 });
      }
    }
    // the rotor's own axis and the single turn about it
    const full = partial(3), aa = axisAngle(full);
    $('legFold').hidden = !S.fold;
    if (S.fold && aa.n) {
      st.line(v3.scale(aa.n, -1.3), v3.scale(aa.n, 1.3), { color: P.violet, width: 2 * thick, alpha: 0.95, dash: [8, 5], back: 0.45 });
      st.tag('n', v3.scale(aa.n, 1.45), 'n', 'num c-vi', {});
      const arc = [], m = Math.max(8, Math.ceil(aa.phi / (3 * DEG)));
      for (let i = 0; i <= m; i++) arc.push(v3.rot(S.v0, aa.n, aa.phi * i / m));
      st.path(arc, { color: P.violet, width: 2 * thick, alpha: 0.9, dash: [5, 4], back: 0.4 });
    }
    // the road travelled and the start ring
    if (t > 1e-9) {
      const road = [], m = Math.max(2, Math.ceil(t * 48));
      for (let i = 0; i <= m; i++) road.push(apply(partial(t * i / m), S.v0));
      st.path(road, { color: P.ink, width: 1.6 * thick, alpha: 0.85, back: 0.35 });
    }
    st.dot(S.v0, 7.5, P.ink, { ring: true, width: 1.8, alpha: 0.95 });
    // the tripod
    let same = -1;
    BASIS.forEach((e, i) => {
      const p = apply(R, e);
      st.arrow([0, 0, 0], p, { color: P.ink, width: 1.3 * thick, headSize: 7, alpha: 0.75 });
      if (v3.len(v3.sub(p, v)) < 0.2) { same = i; return; }
      st.tag('e' + i, v3.scale(p, 1.13), `Re${sub[i]}`, 'num', {});
    });
    // the arrow
    st.arrow([0, 0, 0], v, { color: P.amber, width: 2.6 * thick, glow: 10, headSize: 11, fade: false });
    st.dot(v, 5.5, P.amber, { glow: 14, fade: false });
    if (!TRV.thumbMode) st.tag('v', v3.scale(v, 1.13), same >= 0 ? `v = Re${sub[same]}` : 'v', 'num c-am big', { dx: same >= 0 ? -30 : -14, dy: -14 });
    st.end();

    // the head-up title: which turn, and the rotor so far
    const kk = k >= 0 ? k : Math.min(2, Math.floor(t));
    $('hudBig').textContent = live
      ? L(`第 ${k + 1} 段 · ${live.ax.toUpperCase()} 轴 ${fix(live.ang * share(t, k) / DEG, 1)}°`, `Turn ${k + 1} · ${live.ax.toUpperCase()} axis ${fix(live.ang * share(t, k) / DEG, 1)}°`)
      : L(`第 ${kk + 1} 段 · 角为零`, `Turn ${kk + 1} · zero angle`);
    $('hudSub').textContent = `R = ${fmtR(R)}`;
    return halfTag;
  }

  /* ---------- strip: s² and |B|² of the rotor so far ---------- */
  function drawNorm() {
    const g = kit.plot($('normPlot'), { x: [0, 3], y: [0, 1.12], pad: [32, 10, 8, 22] }), n = 120, sq = [], tot = [], band = [];
    for (let i = 0; i <= n; i++) {
      const t = 3 * i / n, c = coeffs(partial(t)), s2 = c.s * c.s, b2 = c.b12 ** 2 + c.b13 ** 2 + c.b23 ** 2;
      sq.push([t, s2]); tot.push([t, s2 + b2]); band.push([t, s2]);
    }
    g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0.5, L('γ · 绕 z', 'γ · about z')], [1.5, L('β · 绕 y', 'β · about y')], [2.5, L('α · 绕 z', 'α · about z')]] });
    for (const x of [1, 2]) g.vline(x, P.dim, { alpha: 0.5, dash: [2, 3] });
    g.poly([...tot, ...band.slice().reverse()], P.magenta, { alpha: 0.28 });
    g.area(sq, P.cyan, { alpha: 0.3 });
    g.line(sq, P.cyan, { width: 1.6 });
    g.line(tot, P.ink, { width: 2 });
    const c = coeffs(partial(clock.t));
    g.vline(clock.t, P.amber); g.dot(clock.t, c.s * c.s, P.amber, 4);
    g.legend([[P.cyan, L('标量 s²', 'scalar s²')], [P.magenta, L('面积 b₁₂² + b₁₃² + b₂₃²', 'area b₁₂² + b₁₃² + b₂₃²')], [P.ink, L('和', 'sum')]], { bottom: true, dy: -2 });
    $('normMeta').textContent = `s² ${fix(c.s * c.s, 3)} + ${fix(1 - c.s * c.s, 3)}`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const t = clock.t, R = partial(t), v = apply(R, S.v0), full = partial(3), W = segs(), k = segAt(t), aa = axisAngle(full);
    const nn = mul(full, rev(full))[0], rh = rhoOf(v);
    $('roRotor').textContent = fmtR(full, 6);
    $('roRotorSub').textContent = ` · RR̃ = ${fix(nn, 12)}`;
    $('roV').textContent = fmtV(v);
    $('roSeg').textContent = k >= 0 ? `${W[k].name} · ${L('绕', 'about')} ${W[k].ax} ${fix(W[k].ang * share(t, k) / DEG, 1)}° / ${fix(W[k].ang / DEG, 1)}°` : L('还没转', 'not turned yet');
    const cols = BASIS.map((e) => apply(full, e));
    $('roM').innerHTML = [0, 1, 2].map((i) => cols.map((c) => fix(c[i], 6).padStart(9, ' ')).join(' ')).join('<br>');
    $('roN').textContent = aa.n ? fmtV(aa.n, 4) : L('无：R = ±1，不转', 'none: R = ±1, no turn');
    $('roPhi').textContent = `${fix(aa.phi / DEG, 3)}°`;
    const z = (c) => `${fix(c[0], 3)}${c[1] < 0 ? ' − ' : ' + '}${fix(Math.abs(c[1]), 3)}i`;
    $('roRho').innerHTML = `[[${fix(rh.rho[0][0][0], 3)}, ${z(rh.rho[0][1])}], [${z(rh.rho[1][0])}, ${fix(rh.rho[1][1][0], 3)}]]<br><small>Tr ρ = ${fix(rh.tr, 6)} · bloch(ρ) = ${fmtV(rh.back)} · ‖bloch ρ‖ = ${fix(rh.norm, 6)} · ρ² = ρ ${rh.idem < 1e-12 ? '✓' : '✗'}</small>`;
    $('roAside').textContent = `α β γ ${fix(S.a / DEG, 1)}° ${fix(S.b / DEG, 1)}° ${fix(S.g / DEG, 1)}°`;
    const zero = W.filter((w) => Math.abs(w.ang) < 1e-12).map((w) => w.name);
    $('roNote').textContent = zero.length === 3 ? L('三个角都是零：R = 1，什么也不转。', 'All three angles are zero: R = 1 and nothing turns.')
      : zero.length ? L(`${zero.join('、')} 为零：那几段不动，旋子只由其余的因子组成。`, `${zero.join(', ')} ${zero.length > 1 ? 'are' : 'is'} zero: those turns do nothing and the rotor is made of the other factors.`)
        : L(`绕 n 一次转 ${fix(aa.phi / DEG, 1)}°，与三段走到同一处；R 与 −R 给同一个转动。`, `One turn of ${fix(aa.phi / DEG, 1)}° about n arrives where the three turns arrive; R and −R give the same turn.`);
    $('pillSeg').querySelector('strong').textContent = `${Math.min(3, Math.ceil(t - 1e-9))} / 3`;
    $('pillNorm').querySelector('strong').textContent = fix(mul(R, rev(R))[0], 6);
  }

  const paint = kit.painter(() => { drawStage(); drawNorm(); drawText(); }, [$('stage'), $('normPlot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 3, rate: 0.6, step: 1,
    format: (t, max) => `${L('段', 'turn')} ${t.toFixed(2)} <small>/ ${max.toFixed(0)}</small>`,
    onChange: () => paint()
  });
  const degFmt = (v) => `${fix(v, 1)}°`;
  const fA = kit.field($('alpha'), { fmt: degFmt, onInput: (v) => { S.a = v * DEG; changed(); } });
  const fB = kit.field($('beta'), { fmt: degFmt, onInput: (v) => { S.b = v * DEG; changed(); } });
  const fG = kit.field($('gamma'), { fmt: degFmt, onInput: (v) => { S.g = v * DEG; changed(); } });
  /** A control moved: leave the card and show where the three turns end. */
  function changed() { clock.pause(); clock.set(3); cards.mark(null); paint(); }
  const vecChips = kit.chips($('vecChips'), 'vec', (v) => { S.v0 = BASIS[Number(v.slice(1)) - 1].slice(); cards.mark(null); paint(); });
  const foldChips = kit.chips($('foldChips'), 'fold', (v) => { S.fold = v === 'on'; cards.mark(null); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards ---------- */
  const R3 = Math.sqrt(3) / 2;
  const PRESETS = {
    sandwich: { a: 0, b: 0, g: 90 * DEG, v0: [R3, 0, 0.5], fold: false, view: [-0.55, 0.5], still: 1 },
    chain: { a: 0.37, b: -0.81, g: 0.52, v0: [1, 0, 0], vec: 'e1', fold: false, view: [-0.75, 0.32], still: 3 },
    t: { a: Math.PI / 4, b: 0, g: 0, v0: [1, 0, 0], vec: 'e1', fold: false, view: [-0.62, 0.62], still: 3 },
    h: { a: 0, b: Math.PI / 2, g: Math.PI, v0: [0, 0, 1], vec: 'e3', fold: true, view: [-0.4, 0.28], still: 3 },
    fold: { a: 0.37, b: -0.81, g: 0.52, v0: [1, 0, 0], vec: 'e1', fold: true, view: [-1.15, 0.3], still: 3 }
  };
  const NOTES = {
    sandwich: ['只转第一段：绕紫色的 z 轴转 90°。青色的影子 ½e₃ 留在轴上不动；品红的那一份在 z = ½ 的平面里扫出 90° 的扇形，虚线把它分成左右两半：45° + 45°。后两段角为零。', 'Only the first turn: 90° about the violet z axis. The cyan shadow ½e₃ stays on the axis; the magenta part sweeps a 90° fan in the plane z = ½, and the dashed line splits it into two halves, 45° + 45°. The other two angles are zero.'],
    chain: ['(α, β, γ) = (0.37, −0.81, 0.52)：先绕 z 转 γ，再绕 y 转 β，最后绕 z 转 α。白色三脚架停在 Re₁、Re₂、Re₃，琥珀色的 v = Re₁ = (0.378, 0.680, 0.629)；顶部是乘完的旋子 0.830 − 0.396 e₁₂ − 0.393 e₁₃ + 0.030 e₂₃。', '(α, β, γ) = (0.37, −0.81, 0.52): first γ about z, then β about y, last α about z. The white tripod stops at Re₁, Re₂, Re₃ and the amber v = Re₁ = (0.378, 0.680, 0.629); at the top is the compiled rotor 0.830 − 0.396 e₁₂ − 0.393 e₁₃ + 0.030 e₂₃.'],
    t: ['T 门 (π/4, 0, 0)：前两段角为零，箭头和三脚架一动不动；最后一段绕 z 转 45°，琥珀色的 v 沿赤道从 e₁ 走过 45°，Re₃ 留在北极。顶部的旋子是 0.924 − 0.383 e₁₂。', 'The T gate (π/4, 0, 0): the first two angles are zero and neither the arrow nor the tripod moves; the last turn is 45° about z, the amber v runs 45° along the equator from e₁, and Re₃ stays at the north pole. The rotor at the top is 0.924 − 0.383 e₁₂.'],
    h: ['H 门 (0, π/2, π)：第一段绕 z 转 180°，v 在北极、就在轴上，只剩青色的影子，三脚架的 Re₁、Re₂ 翻到反面；第二段绕 y 转 90°，v 落到 e₁。紫色虚线是对角轴 (e₁ + e₃)/√2：三脚架停在 Re₁ = e₃、Re₂ = −e₂、Re₃ = e₁。', 'The H gate (0, π/2, π): the first turn is 180° about z; v sits at the north pole, on the axis, so only the cyan shadow is left while the tripod\'s Re₁ and Re₂ flip over; the second turn is 90° about y and v comes down to e₁. The violet dashed line is the diagonal axis (e₁ + e₃)/√2; the tripod stops at Re₁ = e₃, Re₂ = −e₂, Re₃ = e₁.'],
    fold: ['同一组角 (0.37, −0.81, 0.52)：紫色虚线是乘完的旋子自己的转轴 n，紫色虚弧是绕 n 一次转 67.9°；它从白色的起点圈出发，落在白色的路（三段）走到的同一点。', 'The same angles (0.37, −0.81, 0.52): the violet dashed line is the compiled rotor\'s own axis n, and the violet dashed arc is one turn of 67.9° about n; it leaves the white start ring and lands where the white road of the three turns ends.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.a = p.a; S.b = p.b; S.g = p.g; S.v0 = p.v0.slice(); S.fold = p.fold;
    fA.set(p.a / DEG); fB.set(p.b / DEG); fG.set(p.g / DEG);
    vecChips.set(p.vec || null, true); foldChips.set(p.fold ? 'on' : 'off', true);
    clock.set(0);
    stage.view(p.view, TRV.still || booting ? 0 : 600);
    // a still (cover, cited figure shot) and the opening of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still); else if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖三个欧拉角、换箭头的起点，或打开单一转轴 n。随时可以再选一张卡。', 'Free play: drag the three Euler angles, move the arrow\'s start, or switch on the single axis n. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.ZYZ_DEBUG = {
    get state() {
      const t = clock.t, R = partial(t), full = partial(3), aa = axisAngle(full), v = apply(R, S.v0), rh = rhoOf(v), k = segAt(t);
      return { preset: cards.current, alpha: S.a, beta: S.b, gamma: S.g, t, max: clock.max, playing: clock.playing, fold: S.fold,
        v0: S.v0.slice(), v, rotor: R.slice(), full: full.slice(), frame: BASIS.map((e) => apply(R, e)), columns: BASIS.map((e) => apply(full, e)),
        axis: aa.n, phi: aa.phi, seg: k, segAngle: k >= 0 ? segs()[k].ang * share(t, k) : 0, segAxis: k >= 0 ? segs()[k].ax : null,
        rho: rh.rho, trRho: rh.tr, blochRho: rh.back, normRho: rh.norm, idem: rh.idem,
        hud: $('hudSub').textContent, half: !!document.querySelector('.stage .tag:not([hidden])') && [...document.querySelectorAll('.stage .tag')].some((e) => !e.hidden && /° \+ /.test(e.textContent)) };
    },
    at: (t) => apply(partial(t), S.v0),
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of a world point (for pointer tests). */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { applyPreset('h'); cards.mark('h'); clock.pause(); clock.set(3); stage.cam.yaw = -0.4; stage.cam.pitch = 0.28; paint.now(); };
  cards.pick(cards.initial('chain'));
  booting = false;
  paint();
})();
