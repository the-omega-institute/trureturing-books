/* ORTHO//QUBIT: the line and the area of one qubit.
   The stage is a Bloch sphere. The ruler A and the state B have exactly two things between them: the collinear shadow
   A·B = cos θ (the line, which sets the detector clicks) and the perpendicular face |A∧B| = sin θ (the area, which sets
   the fringes). Gates are rotors R = w − b·(iσ), kept as unit quaternions [w, b]; the rail runs through the circuit.
   Read-only probe for the browser suite: window.QUBIT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180;

  /* ---------- model ---------- */
  const AXES = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1], h: [Math.SQRT1_2, 0, Math.SQRT1_2] };
  const AXIS_NAME = { x: 'x̂', y: 'ŷ', z: 'ẑ', h: 'ĥ' };
  const GATES = { X: ['x', 180], Y: ['y', 180], Z: ['z', 180], H: ['h', 180], S: ['z', 90], T: ['z', 45] };
  const PERP = { z: [[1, 0, 0], [0, 1, 0]], x: [[0, 1, 0], [0, 0, 1]], y: [[0, 0, 1], [1, 0, 0]] };   // fringe-phase frame about A
  const S = { theta: 60, phi: 40, axis: 'z', gates: [], turnAxis: 'z', alpha: 90 };
  const qOf = (n, a) => { const s = Math.sin(a / 2); return [Math.cos(a / 2), n[0] * s, n[1] * s, n[2] * s]; };
  const qMul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  /** Which of ±R: the sign of w, or of the first nonzero component of b when w = 0 (a convention). */
  const sheetOf = (q) => { for (const c of q) if (Math.abs(c) > 1e-9) return c > 0 ? 1 : -1; return 1; };
  /** Is the whole turn the identity, read off the normalized rotor: +1 or −1 when its vector part vanishes, else 0.
      B coming back alone does not say this: a B lying on the axis of the combined turn also comes back. */
  const wholeOf = (q) => { const n = Math.hypot(...q), b = Math.hypot(q[1], q[2], q[3]) / n; return b < 1e-9 ? (q[0] > 0 ? 1 : -1) : 0; };
  /** The angle of the combined turn on the sphere, in degrees (0 … 180). */
  const turnDeg = (q) => 2 * Math.acos(Math.min(1, Math.abs(q[0]) / Math.hypot(...q))) / DEG;
  let starts = [{ r: [0, 0, 1], q: [1, 0, 0, 0] }];   // starts[i] = { r, q } before gate i; starts[n] = the end of the circuit
  function rebuild() {
    let r = v3.sph(S.theta * DEG, S.phi * DEG), q = [1, 0, 0, 0];
    starts = [{ r, q }];
    for (const g of S.gates) { r = v3.rot(r, g.n, g.deg * DEG); q = qMul(qOf(g.n, g.deg * DEG), q); starts.push({ r, q }); }
  }
  /** Bloch vector and accumulated rotor at circuit time tau (gate index + fraction of the gate in progress). */
  function at(tau) {
    const n = S.gates.length, k = Math.max(0, Math.min(n, Math.floor(tau + 1e-9))), f = Math.min(1, Math.max(0, tau - k));
    let { r, q } = starts[k];
    if (f > 1e-9 && k < n) { const g = S.gates[k]; r = v3.rot(r, g.n, g.deg * DEG * f); q = qMul(qOf(g.n, g.deg * DEG * f), q); }
    return { r, q, k, f };
  }
  /** Everything the page reads off (A, B). */
  function read(tau) {
    const s = at(tau), A = AXES[S.axis], line = v3.dot(A, s.r), foot = v3.scale(A, line), perp = v3.sub(s.r, foot), area = v3.len(perp);
    const [e1, e2] = PERP[S.axis], phase = Math.atan2(v3.dot(perp, e2), v3.dot(perp, e1));
    return Object.assign(s, { A, line, foot, perp, area, phase, p0: (1 + line) / 2, p1: (1 - line) / 2, angle: Math.acos(kit.clamp(line, -1, 1)) / DEG, sheet: sheetOf(s.q) });
  }

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.41 : 0.34, cy: TRV.figure ? 0.5 : 0.52,
    onChange: () => paint(),
    onPick: (ev, st) => st.near(ev, read(clock.t).r) < 24,
    onDrag: (ev, st) => {
      // the pointer holds the current tip of B; the initial state is that point carried back through the circuit
      let r = st.pick(ev);
      const s = at(clock.t);
      if (s.f > 1e-9 && s.k < S.gates.length) r = v3.rot(r, S.gates[s.k].n, -S.gates[s.k].deg * DEG * s.f);
      for (let i = s.k - 1; i >= 0; i--) r = v3.rot(r, S.gates[i].n, -S.gates[i].deg * DEG);
      S.theta = Math.acos(kit.clamp(r[2], -1, 1)) / DEG; S.phi = (Math.atan2(r[1], r[0]) / DEG + 360) % 360;
      fTheta.set(Math.round(S.theta)); fPhi.set(Math.round(S.phi));
      touched();
    }
  });
  function drawStage() {
    const st = stage, c = st.begin(), now = read(clock.t), n = S.gates.length;
    st.sphere(1, { lat: [0], lon: 2 });
    for (const k of ['x', 'y', 'z']) st.line(v3.scale(AXES[k], -1.16), v3.scale(AXES[k], 1.16), { color: P.faint, width: 1, alpha: 0.9, back: 0.5 });
    st.tag('k0', [0, 0, 1.27], '|0⟩', 'num'); st.tag('k1', [0, 0, -1.27], '|1⟩', 'num');
    st.tag('kp', [1.27, 0, 0], '|+⟩', 'num'); st.tag('ki', [0, 1.27, 0], '|+i⟩', 'num');
    // the path of B: travelled (solid) and still to come (dashed)
    const path = (a, b) => { const pts = []; for (let i = 0, m = Math.max(2, Math.ceil((b - a) * 40)); i <= m; i++) pts.push(at(a + (b - a) * i / m).r); return pts; };
    if (n && clock.t < n) st.path(path(clock.t, n), { color: P.amber, width: 1, alpha: 0.45, dash: [3, 5], back: 0.35 });
    if (n && clock.t > 0) st.path(path(0, clock.t), { color: P.amber, width: 2, alpha: 0.85, back: 0.3 });
    if (n) st.dot(starts[0].r, 4, P.sigma, { ring: true });
    // the axis of the gate in progress (or about to start), and the circle B rides on
    if (now.k < n) {
      const g = S.gates[now.k], d = v3.dot(g.n, now.r);
      st.line(v3.scale(g.n, -1.1), v3.scale(g.n, 1.1), { color: P.violet, width: 1.2, alpha: 0.9, dash: [5, 4], back: 0.45 });
      st.circle(v3.scale(g.n, d), g.n, Math.sqrt(Math.max(0, 1 - d * d)), { color: P.violet, width: 1, alpha: 0.55, back: 0.3 });
      st.tag('gax', v3.scale(g.n, -1.2), `${g.name} · ${AXIS_NAME[g.ax]}`, 'raw c-vi', { dx: 30 });
    }
    // the area: the rectangle spanned by A and the part of B perpendicular to A
    if (now.area > 1e-3) st.poly([[0, 0, 0], now.A, v3.add(now.A, now.perp), now.perp], { fill: P.magenta, alpha: 0.2, color: P.magenta, strokeAlpha: 0.55 });
    // the ruler A, the line (shadow of B on A), the perpendicular leg, the state B
    st.line(v3.scale(now.A, -1), now.A, { color: P.cyan, width: 1, alpha: 0.5, back: 0.5 });
    st.arrow([0, 0, 0], now.A, { color: P.cyan, width: 1.4, alpha: 0.75, headSize: 9 });
    st.line(now.foot, now.r, { color: P.magenta, width: 2.2, back: 0.6 });
    c.save(); c.shadowColor = P.cyan; c.shadowBlur = 10;
    st.line([0, 0, 0], now.foot, { color: P.cyan, width: 4.5, back: 0.7 });
    c.restore();
    st.arc(now.A, now.r, { color: P.sigma, width: 1, alpha: 0.7, dash: [2, 3], back: 0.5 }, 0.32);
    st.arrow([0, 0, 0], now.r, { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false });
    st.dot(now.r, 5.5, P.amber, { glow: 14, fade: false });
    st.tag('A', v3.scale(now.A, 1.1), 'A', 'cy', { dx: 14 });
    // B's label sits a fixed 18 px beyond the tip on screen, also when B points almost at or away from the viewer
    const tip = st.p(now.r), ox = tip[0] - st.cx, oy = tip[1] - st.cy, ol = Math.hypot(ox, oy);
    st.tag('B', now.r, 'B', 'hot', ol > 0.5 ? { dx: 18 * ox / ol, dy: 18 * oy / ol } : { dy: -18 });
    if (Math.abs(now.line) > 0.06) st.tag('ln', v3.scale(now.foot, 0.5), `${L('线', 'line')} ${fix(now.line, 2)}`, 'num c-cy', { dx: -34 });
    if (now.area > 0.08) st.tag('ar', v3.add(now.foot, v3.scale(now.perp, 0.5)), `${L('面积', 'area')} ${fix(now.area, 2)}`, 'num c-mg', { dy: -16 });
    st.end();
    const g = now.k < n ? S.gates[now.k] : null;
    $('hudBig').textContent = `θ(A,B) = ${fix(now.angle, 1)}°`;
    $('hudSub').innerHTML = !n ? (TRV.still ? L(`线 cos θ = ${fix(now.line, 2)} · 面积 sin θ = ${fix(now.area, 2)}`, `line cos θ = ${fix(now.line, 2)} · area sin θ = ${fix(now.area, 2)}`) : L('还没有门：拖动 B，或选一张实验卡', 'No gates yet: drag B, or pick an experiment'))
      : (g ? (g.total
        // a turn longer than 180° rides the rail in pieces: report the whole turn and how much of it is done
        ? L(`${g.name}：绕 ${AXIS_NAME[g.ax]} 共转 ${fix(g.total, 0)}°，已转 ${fix(g.before + g.deg * now.f, 0)}°`, `${g.name}: a ${fix(g.total, 0)}° turn about ${AXIS_NAME[g.ax]}, ${fix(g.before + g.deg * now.f, 0)}° done`)
        : L(`第 ${now.k + 1} / ${n} 门 ${g.name}：绕 ${AXIS_NAME[g.ax]} 转 ${g.deg}°，已转 ${fix(g.deg * now.f, 0)}°`, `Gate ${now.k + 1} of ${n}, ${g.name}: a ${g.deg}° turn about ${AXIS_NAME[g.ax]}, ${fix(g.deg * now.f, 0)}° done`))
        : (S.gates[n - 1].total && Math.abs(S.gates[n - 1].total - n * S.gates[n - 1].deg) < 1e-9
          ? L(`转完：绕 ${AXIS_NAME[S.gates[0].ax]} 共转 ${fix(S.gates[0].total, 0)}°`, `Turn complete: ${fix(S.gates[0].total, 0)}° about ${AXIS_NAME[S.gates[0].ax]}`)
          : L(`线路走完：${n} 个门`, `End of the circuit: ${n} gate${n > 1 ? 's' : ''}`))) + ` · ${L('旋子 w', 'rotor w')} = <b class="c-vi">${sgn(now.q[0], 2)}</b>`;
  }

  /* ---------- strip: what a detector sees; the line and the rotor along the circuit ---------- */
  function drawDetector() {
    const cv = $('detector'), now = read(clock.t), w = cv.clientWidth, split = Math.round(w * 0.36);
    // clicks: two bars
    const a = kit.plot(cv, { x: [0, 2], y: [0, 1], pad: [34, w - split, 10, 22] });
    a.axes({ yTicks: [0, 0.5, 1], xTicks: [[0.5, '+A'], [1.5, '−A']] });
    a.rect(0.2, 0, 0.8, now.p0, P.cyan, { alpha: 0.75 }); a.rect(1.2, 0, 1.8, now.p1, P.dim, { alpha: 0.6 });
    a.text(0.5, now.p0, fix(now.p0, 2), P.ink, { align: 'center', base: 'bottom', dy: -3 });
    a.text(1.5, now.p1, fix(now.p1, 2), P.ink, { align: 'center', base: 'bottom', dy: -3 });
    // fringes: intensity across a screen, contrast = area
    const b = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [split + 30, 10, 10, 22], clear: false });
    const I = (x) => (1 + now.area * Math.cos(2 * Math.PI * 3 * x - now.phase)) / 2, pts = [];
    for (let i = 0; i <= 120; i++) { const x = i / 120; b.rect(x - 1 / 240, 0, x + 1 / 240, 1, P.magenta, { alpha: 0.05 + 0.5 * I(x) }); pts.push([x, I(x)]); }
    b.axes({ xTicks: [], yTicks: [] });
    b.line(pts, P.ink, { width: 1.6 });
    b.text(0.5, 0, L('屏上的位置', 'position on the screen'), P.dim, { align: 'center', base: 'top', dy: 5, face: 'body' });
    $('detMeta').textContent = `${fix(now.p0, 2)} / ${fix(now.p1, 2)} · V ${fix(now.area, 2)}`;
  }
  function drawTurns() {
    const n = S.gates.length, max = Math.max(1, n), ticks = [];
    for (let i = 0; i <= max; i++) if (max <= 8 || i % 2 === 0) ticks.push(i);
    const g = kit.plot($('turns'), { x: [0, max], y: [-1.2, 1.9], pad: [30, 10, 6, 22] });
    g.axes({ yTicks: [-1, 0, 1], xTicks: ticks, xGrid: true });
    const lines = [], ws = [];
    for (let i = 0, m = Math.max(40, max * 28); i <= m; i++) { const t = max * i / m, s = read(Math.min(t, n)); lines.push([t, s.line]); ws.push([t, s.q[0]]); }
    g.line(lines, P.cyan, { width: 1.8 }); g.line(ws, P.violet, { width: 1.8, dash: [5, 3] });
    const now = read(clock.t);
    g.vline(clock.t, P.amber); g.dot(clock.t, now.line, P.cyan, 4); g.dot(clock.t, now.q[0], P.violet, 4);
    g.legend([[P.cyan, L('线 A·B', 'line A·B')], [P.violet, L('旋子标量部 w', 'rotor scalar part w'), 'dash']]);
    $('turnMeta').textContent = `w = ${sgn(now.q[0], 2)} · ${L('叶', 'sheet')} ${now.sheet > 0 ? '+1' : '−1'}`;
  }

  /* ---------- readouts, circuit tape ---------- */
  function drawText() {
    const now = read(clock.t), n = S.gates.length, l2 = now.line * now.line, a2 = now.area * now.area;
    $('roSum').innerHTML = `<span class="c-cy">${fix(l2, 3)}</span> + <span class="c-mg">${fix(a2, 3)}</span> = ${fix(l2 + a2, 3)} <span class="okmark">✓</span>`;
    $('roSumSub').textContent = L('影子的平方加面积的平方，总是 1', 'shadow squared plus area squared is always 1');
    $('roLine').textContent = sgn(now.line, 3); $('roArea').textContent = fix(now.area, 3);
    $('roP0').innerHTML = `${fix(now.p0, 3)} <small>= cos²(θ/2)</small>`; $('roVis').innerHTML = `${fix(now.area, 3)} <small>= sin θ</small>`;
    $('roRotor').innerHTML = `${sgn(now.q[0], 3)} − (${fix(now.q[1], 3)}, ${fix(now.q[2], 3)}, ${fix(now.q[3], 3)})·iσ <small>· ${L('叶', 'sheet')} ${now.sheet > 0 ? '+1' : '−1'}</small>`;
    const kind = now.area < 0.02 ? L('B 与 A 共线或几乎共线：几乎全是线，面积不到 0.02。探测器几乎每次都给同一种咔哒，条纹对比不到 2%；恰好共线时没有面积，每次都是同一种咔哒，条纹消失。', 'B is along A or nearly so: almost all line, with area under 0.02. The detector gives the same click almost every time and the fringe contrast is under 2%; exactly along A there is no area, the click is the same every time and the fringes vanish.')
      : Math.abs(now.line) < 0.02 ? L('B 与 A 垂直或几乎垂直：几乎全是面积，线在 ±0.02 以内。两种咔哒各占 49% 到 51%，条纹接近最清楚；恰好垂直时没有线，两种咔哒各占一半，条纹最清楚。', 'B is perpendicular to A or nearly so: almost all area, with the line within ±0.02. Each of the two clicks comes 49–51% of the time and the fringes are close to their sharpest; exactly perpendicular there is no line, the clicks are 50 / 50 and the fringes are sharpest.')
        : L(`线占 ${fix(100 * l2, 0)}%，面积占 ${fix(100 * a2, 0)}%：咔哒偏向一边，同时还留着 ${fix(100 * now.area, 0)}% 的条纹对比。`, `${fix(100 * l2, 0)}% line and ${fix(100 * a2, 0)}% area: the clicks lean one way while the fringes keep ${fix(100 * now.area, 0)}% of their contrast.`);
    $('roNote').textContent = kind;
    $('pillLine').querySelector('strong').textContent = sgn(now.line, 2);
    $('pillArea').querySelector('strong').textContent = fix(now.area, 2);
    $('pillSheet').querySelector('strong').textContent = now.sheet > 0 ? '+1' : '−1';
    // circuit tape: |ψ₀⟩ then one button per gate, with the sheet reached after it
    const box = $('gates');
    const html = [`<button class="gate" data-jump="0" aria-pressed="${clock.t < 1e-9}">ψ₀</button>`].concat(S.gates.map((g, i) => {
      const s = sheetOf(starts[i + 1].q), cur = clock.t > i + 1e-9 && clock.t <= i + 1 + 1e-9;
      return `<button class="gate${clock.t > i + 1 - 1e-9 ? ' done' : ''}" data-jump="${i + 1}" aria-pressed="${cur}">${TRV.esc(g.label)}<i class="${s > 0 ? 'pos' : 'neg'}">${s > 0 ? '+' : '−'}</i></button>`;
    })).join('');
    if (box._html !== html) { box.innerHTML = html; box._html = html; }
    $('circAside').textContent = n ? L(`${n} 个门`, `${n} gate${n > 1 ? 's' : ''}`) : L('空', 'empty');
    const end = starts[n], back = n && v3.len(v3.sub(end.r, starts[0].r)) < 1e-9;
    $('circNote').innerHTML = !n ? L('点上面的门，或选一张实验卡。每个小标记是那一步之后旋子落在 ±R 的哪一叶。', 'Tap a gate above, or pick an experiment. Each small mark is the sheet (which of ±R) reached after that step.')
      : back ? (wholeOf(end.q) < 0
        ? L('线路结束时 B 回到了出发点，整段布洛赫变换是恒等，旋子却是 <b>−I</b>。', 'At the end B is back where it started and the whole Bloch transformation is the identity, yet the rotor is <b>−I</b>.')
        : wholeOf(end.q) > 0 ? L('线路结束时 B 回到了出发点，整段转动是恒等，旋子也回到 <b>+1</b>。', 'At the end B is back where it started, the whole turn is the identity, and the rotor is back at <b>+1</b>.')
          : L(`线路结束时 B 回到了出发点，整段线路却不是恒等：合成的是一个 ${fix(turnDeg(end.q), 0)}° 的转动，B 恰好在它的转轴上；旋子 w = ${sgn(end.q[0], 3)}，不是 ±1。`, `At the end B is back where it started, yet the whole circuit is not the identity: it is a ${fix(turnDeg(end.q), 0)}° turn and B happens to lie on its axis; the rotor has w = ${sgn(end.q[0], 3)}, not ±1.`))
        : compareX().sameTurn ? L(`这条线路走完，终点与单独一个 X 门相同，旋子却是 <b>${compareX().sign > 0 ? '+' : '−'}R<sub>X</sub></b>。`, `This circuit ends where a single X gate would, yet its rotor is <b>${compareX().sign > 0 ? '+' : '−'}R<sub>X</sub></b>.`)
          : L('小标记是每一步之后旋子落在 ±R 的哪一叶；点击任一门跳到它之后。', 'The small marks show the sheet (which of ±R) after each step; click a gate to jump to just after it.');
    const an = { z: L('沿 Z 比量：两种咔哒是 |0⟩ 与 |1⟩。', 'Measuring along Z: the two clicks are |0⟩ and |1⟩.'), x: L('沿 X 比量：同一个态，线和面积重新分配。', 'Measuring along X: the same state, with line and area shared out anew.'), y: L('沿 Y 比量：两种咔哒是 |+i⟩ 与 |−i⟩。', 'Measuring along Y: the two clicks are |+i⟩ and |−i⟩.') };
    $('axisNote').textContent = an[S.axis];
  }
  /** Is the whole circuit the same turn as one X gate, and with which sign of the rotor? */
  function compareX() {
    const q = starts[S.gates.length].q, x = qOf(AXES.x, Math.PI), d = q[0] * x[0] + q[1] * x[1] + q[2] * x[2] + q[3] * x[3];
    return { sameTurn: S.gates.length > 1 && Math.abs(Math.abs(d) - 1) < 1e-9, sign: d > 0 ? 1 : -1 };
  }

  const paint = kit.painter(() => { drawStage(); drawDetector(); drawTurns(); drawText(); }, [$('stage'), $('detector'), $('turns')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.7, step: 1,
    format: (t, max) => `τ ${t.toFixed(2)} <small>/ ${S.gates.length ? max.toFixed(0) : 0} ${L('门', S.gates.length === 1 ? 'gate' : 'gates')}</small>`,
    onChange: (t, c) => {
      if (!c.playing && wasPlaying && t >= c.max - 1e-9) finished();
      wasPlaying = c.playing; paint();
    }
  });
  let wasPlaying = false;
  function finished() {
    const n = S.gates.length, end = starts[n];
    if (!n) return;
    const whole = wholeOf(end.q);
    if (v3.len(v3.sub(end.r, starts[0].r)) < 1e-9) TRV.toast($('toast'), whole < 0
      ? L('B 回到原处，旋子 <b>R = −1</b>', 'B is back, the rotor is <b>R = −1</b>') : whole > 0 ? L('B 回到原处，旋子 <b>R = +1</b>', 'B is back, the rotor is <b>R = +1</b>')
        : L('B 回到原处，旋子却不是 <b>±1</b>：B 在合成转动的轴上', 'B is back, yet the rotor is not <b>±1</b>: B lies on the axis of the combined turn'));
    else if (compareX().sameTurn) TRV.toast($('toast'), L(`与一个 X 门同一个转动，旋子是 <b>${compareX().sign > 0 ? '+' : '−'}R<sub>X</sub></b>`, `The same turn as one X gate; the rotor is <b>${compareX().sign > 0 ? '+' : '−'}R<sub>X</sub></b>`));
  }
  function circuitChanged(tau) {
    rebuild();
    const n = S.gates.length;
    clock.playing = false; $('play').disabled = !n; $('rew').disabled = !n; $('now').disabled = !n; $('undo').disabled = !n; $('clear').disabled = !n;
    clock.setMax(n || 1, true); clock.set(Math.min(tau == null ? n : tau, n));
  }
  function touched() { cards.mark(null); rebuild(); paint(); }
  /** Append a turn of `deg` degrees about axis `ax`, in pieces of at most 180° so that the rail moves at an even pace. */
  function addTurn(ax, deg, name) {
    const pieces = Math.ceil(deg / 180 - 1e-9), each = deg / pieces;
    for (let i = 0; i < pieces; i++) S.gates.push({ name: name || `${AXIS_NAME[ax]}${fix(deg, 0)}°`, label: name || `${AXIS_NAME[ax]} ${fix(each, 0)}°`, ax, n: AXES[ax], deg: each, total: pieces > 1 ? deg : 0, before: i * each });
    return pieces;
  }
  function appendAndPlay(fn) {
    const before = S.gates.length;
    if (before >= 24) { TRV.toast($('toast'), L('线路最多 24 个门', 'A circuit holds at most 24 gates')); return; }
    fn(); cards.mark(null); circuitChanged(before); clock.play();
  }
  const fTheta = kit.field($('theta'), { fmt: (v) => `${fix(S.theta, 0)}°`, onInput: (v) => { S.theta = v; fTheta.show(); touched(); } });
  const fPhi = kit.field($('phi'), { fmt: (v) => `${fix(S.phi, 0)}°`, onInput: (v) => { S.phi = v; fPhi.show(); touched(); } });
  const fAlpha = kit.field($('alpha'), { fmt: (v) => `${v}°`, onInput: (v) => { S.alpha = v; } });
  const axisChips = kit.chips($('axisChips'), 'axis', (v) => { S.axis = v; cards.mark(null); paint(); });
  const turnChips = kit.chips($('turnChips'), 'turn', (v) => { S.turnAxis = v; });
  const camChips = kit.chips($('camChips'), 'cam', (v) => stage.view(v));
  $('gateChips').addEventListener('click', (ev) => { const b = ev.target.closest('[data-gate]'); if (b) appendAndPlay(() => { const [ax, deg] = GATES[b.dataset.gate]; addTurn(ax, deg, b.dataset.gate); }); });
  $('addTurn').addEventListener('click', () => appendAndPlay(() => addTurn(S.turnAxis, S.alpha)));
  $('undo').addEventListener('click', () => { S.gates.pop(); cards.mark(null); circuitChanged(); });
  const clearCircuit = () => { S.gates = []; cards.mark(null); circuitChanged(); };
  $('clear').addEventListener('click', clearCircuit);
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  $('gates').addEventListener('click', (ev) => { const b = ev.target.closest('[data-jump]'); if (b) { clock.pause(); clock.set(+b.dataset.jump); } });
  kit.keys({ r: clearCircuit });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    line: { theta: 0, phi: 0, axis: 'z', turns: [] },
    area: { theta: 90, phi: 0, axis: 'z', turns: [] },
    half: { theta: 60, phi: 40, axis: 'z', turns: [] },
    phase: { theta: 90, phi: 0, axis: 'z', turns: [['z', 360]], play: true, still: 0.3 },
    hadamard: { theta: 0, phi: 0, axis: 'z', turns: [['h', 180, 'H']], play: true, still: 1 },
    hzh: { theta: 60, phi: 40, axis: 'z', turns: [['h', 180, 'H'], ['z', 180, 'Z'], ['h', 180, 'H']], play: true, still: 1.55 },
    turn1: { theta: 60, phi: 40, axis: 'z', turns: [['x', 360]], play: true, still: 2 },
    turn2: { theta: 60, phi: 40, axis: 'z', turns: [['x', 720]], play: true, still: 4 }
  };
  const NOTES = {
    line: ['B 就躺在量尺 A 上：青色的线是 1，整根 B 都是影子；品红的面积是 0，舞台上没有面。这是“粒子”的一端。', 'B lies along the ruler A: the cyan line is 1, all of B is shadow, and the magenta area is 0, so the stage shows no face. This is the “particle” end.'],
    area: ['B 与 A 垂直：影子缩成一个点，面积撑到最大。两种咔哒各占一半，条纹最清楚。这是“波”的一端。', 'B is perpendicular to A: the shadow shrinks to a point and the area is as large as it gets. The clicks are 50 / 50 and the fringes are sharpest. This is the “wave” end.'],
    half: ['夹角 60°：线是 0.5，面积是 0.87。咔哒 75% 偏向 +A，同时条纹还留着 87% 的对比。两个数的平方加起来仍是 1。', 'At 60° the line is 0.5 and the area 0.87. The clicks lean 75% towards +A while the fringes keep 87% of their contrast. The two squares still add up to 1.'],
    phase: ['B 沿赤道绕 A 转一圈：青色的影子始终为零，品红的面积跟着 B 转向，大小不变。相位改的是面积的朝向，不是线。', 'B goes once round A along the equator: the cyan shadow stays at zero, and the magenta area turns with B without changing size. A phase changes which way the area faces, not the line.'],
    hadamard: ['从 |0⟩ 出发加一个 H 门：B 绕紫色的 ĥ 轴转 180° 落到 |+⟩，青色的线全部变成品红的面积。', 'Start at |0⟩ and apply H: B turns 180° about the violet ĥ axis and lands on |+⟩, and all of the cyan line becomes magenta area.'],
    hzh: ['先 H、再 Z、再 H：B 依次绕 ĥ、ẑ、ĥ 各转 180°，紫色虚线是正在转的那根轴。舞台左上角的 w 是累积旋子的标量部，从 +1 出发，每一步都在变。', 'H, then Z, then H: B turns 180° about ĥ, then ẑ, then ĥ again; the violet dashed line is the axis of the turn in progress. The w at the top left of the stage is the scalar part of the accumulated rotor: it starts at +1 and changes at every step.'],
    turn1: ['绕 x̂ 转 360°：B 回到出发点，线和面积都回来了；旋子的标量部 w（舞台左上角）却从 +1 走到 −1。', 'A 360° turn about x̂: B returns to where it started, and so do the line and the area; the scalar part w of the rotor (top left of the stage) goes from +1 to −1.'],
    turn2: ['再转一圈，一共 720°：w 才回到 +1。矢量一圈，旋子两圈。', 'One more turn, 720° in all: only now is w back at +1. One turn for the vector, two for the rotor.']
  };
  let booting = true, moving = null;
  function applyPreset(id) {
    const p = PRESETS[id], from = read(clock.t).r, to = v3.sph(p.theta * DEG, p.phi * DEG);
    if (moving) { moving.cancel(); moving = null; }
    const land = () => {
      moving = null;
      S.theta = p.theta; S.phi = p.phi; S.gates = [];
      for (const t of p.turns) addTurn(t[0], t[1], t[2]);
      fTheta.set(p.theta); fPhi.set(p.phi);
      circuitChanged(p.play ? 0 : undefined);
      // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
      // inside a chapter the card plays once the reader has scrolled it into view
      if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still); } else if (p.play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    };
    S.axis = p.axis; axisChips.set(p.axis, true);
    if (booting || TRV.still || v3.len(v3.sub(from, to)) < 1e-6) { land(); return; }
    // carry B to the card's starting state along the great circle, so the eye can follow what changed
    S.gates = []; circuitChanged();
    moving = kit.tween(420, (e) => { const r = v3.slerp(from, to, e); S.theta = Math.acos(kit.clamp(r[2], -1, 1)) / DEG; S.phi = (Math.atan2(r[1], r[0]) / DEG + 360) % 360; rebuild(); paint(); }, land);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动 B、换量尺、加门。随时可以再选一张卡。', 'Free play: drag B, change the ruler, add gates. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.QUBIT_DEBUG = {
    get state() { const s = read(clock.t); return { theta: S.theta, phi: S.phi, axis: S.axis, tau: clock.t, n: S.gates.length, playing: clock.playing, preset: cards.current, r: s.r, q: s.q, line: s.line, area: s.area, p0: s.p0, p1: s.p1, phase: s.phase, sheet: s.sheet, gates: S.gates.map((g) => [g.ax, g.deg]) }; },
    compareX, at: (tau) => { const s = read(tau); return { r: s.r, q: s.q, line: s.line, area: s.area, sheet: s.sheet }; },
    seek: (t) => { clock.pause(); clock.set(t); }, camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of the tip of B (for pointer tests). */
    tip: () => { const q = stage.p(read(clock.t).r), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { applyPreset('hzh'); cards.mark('hzh'); clock.pause(); clock.set(1.55); stage.cam.yaw = -0.5; stage.cam.pitch = 0.3; paint.now(); };
  cards.pick(cards.initial('half'));
  booting = false;
  paint();
})();
