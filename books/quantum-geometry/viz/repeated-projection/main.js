/* IDEMPOTENT//LINE · 反复投影 · Projecting again and again
   The stage is the Bloch ball: an arrow r (the state ρ = ½(I + r·σ)), a measurement line n̂ and the dual plane
   perpendicular to it. One press is the unread measurement along n̂, ρ ↦ P₊ρP₊ + P₋ρP₋ with P± = ½(I ± n̂·σ), computed
   with 2 × 2 complex matrices; its Bloch arrow is read back off the matrix. The rail counts the presses.
   Read-only probe for the browser suite: window.PROJECT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180;
  const MAX_PRESSES = 8;

  /* ---------- 2 × 2 complex matrices: [[a, b], [c, d]] with entries [re, im] ---------- */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  const madd = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(A[i][j], B[i][j])));
  /** ½(I + s·v·σ) for a real 3-vector v and a sign s. */
  const half = (v, s) => [[[(1 + s * v[2]) / 2, 0], [s * v[0] / 2, -s * v[1] / 2]], [[s * v[0] / 2, s * v[1] / 2], [(1 - s * v[2]) / 2, 0]]];
  const trace = (A) => ca(A[0][0], A[1][1]);
  const frob = (A) => Math.sqrt(A.flat().reduce((a, z) => a + z[0] * z[0] + z[1] * z[1], 0));
  /** The Bloch arrow of a 2 × 2 density matrix: x = 2 Re ρ₁₀, y = 2 Im ρ₁₀, z = ρ₀₀ − ρ₁₁. */
  const blochOf = (R) => [2 * R[1][0][0], 2 * R[1][0][1], R[0][0][0] - R[1][1][0]];
  /** One press: the unread state of the record measurement {P₊, P₋} along n. */
  function unread(r, n) {
    const rho = half(r, 1), Pp = half(n, 1), Pm = half(n, -1);
    return blochOf(madd(mmul(mmul(Pp, rho), Pp), mmul(mmul(Pm, rho), Pm)));
  }
  /** What the readouts show for an arrow r and a line n, each number from its own route. */
  function measure(r, n) {
    const rho = half(r, 1), Pp = half(n, 1), Pm = half(n, -1);
    const purity = trace(mmul(rho, rho))[0], pp = trace(mmul(rho, Pp))[0], pm = trace(mmul(rho, Pm))[0];
    const dot = v3.dot(r, n), foot = v3.scale(n, dot), perp = v3.sub(r, foot), plane = v3.len(perp);
    return {
      r, n, dot, foot, perp, plane, len: v3.len(r), purity, pp, pm,
      surplus: purity - 0.5, deviation: (pp - 0.5) ** 2 + (pm - 0.5) ** 2, residual: 0.5 * plane * plane,
      coherence: frob(mmul(mmul(Pp, rho), Pm))
    };
  }

  /* ---------- state: a starting arrow, a line, and the presses made so far ---------- */
  const AXES = { z: [0, 0, 1], x: [1, 0, 0], n: v3.sph(45 * DEG, 20 * DEG) };
  const S = { axis: 'z', line: AXES.z, r0: v3.sph(52 * DEG, 40 * DEG), len: 1, n: 0 };
  let hist = [S.r0];   // hist[k] = the arrow after k presses
  function rebuild() { hist = [S.r0]; for (let k = 0; k < S.n; k++) hist.push(unread(hist[k], S.line)); }
  /** The arrow at rail time t: between two presses it glides straight from one to the next. */
  function at(t) {
    const k = Math.max(0, Math.min(S.n, Math.floor(t + 1e-9))), f = Math.min(1, Math.max(0, t - k));
    if (k >= S.n || f < 1e-9) return { r: hist[k], k, f: 0 };
    const e = TRV.smooth(f), a = hist[k], b = hist[k + 1];
    return { r: v3.add(a, v3.scale(v3.sub(b, a), e)), k, f };
  }
  /** Presses completed at time t, and how far the latest of them moved the arrow. */
  function latest(t) {
    const k = Math.max(0, Math.min(S.n, Math.floor(t + 1e-9)));
    return { done: k, moved: k ? v3.len(v3.sub(hist[k], hist[k - 1])) : null };
  }

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.42 : 0.34, cy: TRV.figure ? 0.5 : 0.53, yaw: -0.5, pitch: 0.4,
    onChange: () => paint(),
    onPick: (ev, st) => st.near(ev, at(clock.t).r) < 26,
    onDrag: (ev, st) => {
      // the pointer holds the tip: the point under it on the sphere of the arrow's current length
      const now = v3.len(at(clock.t).r), rad = now > 0.05 ? now : (S.len > 0.05 ? S.len : 1);
      const b = $('cv').getBoundingClientRect(), x = (ev.clientX - b.left - st.cx) / st.unit, y = (st.cy - (ev.clientY - b.top)) / st.unit;
      const cy = Math.cos(st.cam.yaw), sy = Math.sin(st.cam.yaw), cp = Math.cos(st.cam.pitch), sp = Math.sin(st.cam.pitch);
      const R = [cy, -sy, 0], U = [sy * sp, cy * sp, cp], D = [-sy * cp, -cy * cp, sp];
      let px = x, py = y, d = 0;
      const q = px * px + py * py;
      if (q > rad * rad) { const k = rad / Math.sqrt(q); px *= k; py *= k; } else d = Math.sqrt(rad * rad - q);
      S.len = rad; fLen.set(rad.toFixed(2));
      S.r0 = v3.add(v3.add(v3.scale(R, px), v3.scale(U, py)), v3.scale(D, d));
      cards.mark(null); restart();
    }
  });
  function drawStage() {
    const st = stage, c = st.begin(), a = at(clock.t), m = measure(a.r, S.line), n = S.line, last = latest(clock.t);
    st.sphere(1, { lat: [], lon: 0, shade: 0.08 });
    // the dual plane: a disc perpendicular to the line
    const e1 = v3.unit(v3.cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = v3.cross(n, e1), rim = [];
    for (let i = 0; i < 96; i++) { const t = 2 * Math.PI * i / 96; rim.push(v3.add(v3.scale(e1, Math.cos(t)), v3.scale(e2, Math.sin(t)))); }
    st.poly(rim, { fill: P.magenta, alpha: TRV.thumbMode ? 0.12 : 0.08 });
    st.path(rim, { color: P.magenta, width: 1.1, alpha: 0.6, back: 0.35, close: true });
    // the measurement line, through the centre and out of the ball on both sides
    st.line(v3.scale(n, -1.22), v3.scale(n, 1.22), { color: P.cyan, width: 1.3, alpha: 0.7, back: 0.45 });
    st.dot(n, 3, P.cyan, { alpha: 0.8 }); st.dot(v3.scale(n, -1), 3, P.cyan, { alpha: 0.8 });
    // where the arrow started, once it has been projected
    if (clock.t > 1e-6 && v3.len(v3.sub(hist[0], a.r)) > 1e-3) {
      st.arrow([0, 0, 0], hist[0], { color: P.dim, width: 1.4, dash: [4, 4], alpha: 0.85, headSize: 8 });
      st.line(hist[0], a.r, { color: P.dim, width: 1, dash: [2, 4], alpha: 0.7, back: 0.5 });
    }
    // the two parts: the shadow on the line (cyan) and the part in the plane (magenta), closed into a rectangle
    if (m.plane > 1e-3 && Math.abs(m.dot) > 1e-3) {
      st.line(m.foot, a.r, { color: P.faint, width: 1, dash: [3, 4], back: 0.5 });
      st.line(m.perp, a.r, { color: P.faint, width: 1, dash: [3, 4], back: 0.5 });
    }
    if (m.plane > 1e-3) st.arrow([0, 0, 0], m.perp, { color: P.magenta, width: 3, headSize: 9 });
    if (Math.abs(m.dot) > 1e-3) {
      c.save(); c.shadowColor = P.cyan; c.shadowBlur = 10;
      st.arrow([0, 0, 0], m.foot, { color: P.cyan, width: 5, headSize: 11 });
      c.restore();
    }
    // the current arrow
    if (m.len > 1e-3) st.arrow([0, 0, 0], a.r, { color: P.amber, width: 2.4, glow: 12, headSize: 12, fade: false });
    st.dot(a.r, m.len > 1e-3 ? 5 : 6.5, P.amber, { glow: 14, fade: false });
    // labels
    const lineName = { z: 'Z', x: 'X', n: 'n̂' }[S.axis];
    const tipN = st.p(v3.scale(n, 1.22)), ox = tipN[0] - st.cx, oy = tipN[1] - st.cy, ol = Math.hypot(ox, oy) || 1;
    st.tag('ln', v3.scale(n, 1.22), `${L('测量线', 'line')} ${lineName}`, 'cy', { dx: 26 * ox / ol, dy: 14 * oy / ol });
    let best = rim[0], bx = -Infinity;
    for (const p of rim) { const q = st.p(p); if (q[0] > bx && q[2] > 0.02) { bx = q[0]; best = p; } }
    const half = TRV.lang() === 'en' ? 62 : 44;   // about half the label's width, so that it starts just past the rim
    const tight = bx + 2 * half + 16 > st.W;      // on a narrow stage the label goes inside the rim instead of off the edge
    st.tag('pl', best, L('对偶平面', 'dual plane'), 'mg', tight ? { dx: -half, dy: 20 } : { dx: half + 8, dy: 14, fade: false });
    if (Math.abs(m.dot) > 0.12) st.tag('lv', v3.scale(m.foot, 0.55), `${L('线', 'line')} ${sgn(m.dot, 2)}`, 'num c-cy', { dx: -half - 6 });
    if (m.plane > 0.12) st.tag('pv', v3.scale(m.perp, 0.6), `${L('面', 'plane')} ${fix(m.plane, 2)}`, 'num c-mg', { dy: 14 });
    st.end();
    const cur = a.f > 0 ? a.k + 1 : last.done;
    $('hudBig').textContent = cur ? L(`第 ${cur} 投`, `Press ${cur}`) : L('投影之前', 'Before any press');
    const tail = last.done ? L(`这一投挪动 ${fix(last.moved, 3)}`, `this press moved it ${fix(last.moved, 3)}`)
      : L(`线² + 面² = ${fix(m.dot * m.dot + m.plane * m.plane, 3)} = 长度²`, `line² + plane² = ${fix(m.dot * m.dot + m.plane * m.plane, 3)} = length²`);
    $('hudSub').innerHTML = `<span class="c-cy">${L('线', 'line')} ${sgn(m.dot, 2)}</span> · <span class="c-mg">${L('面', 'plane')} ${fix(m.plane, 2)}</span> · ${tail}`;
  }

  /* ---------- strip: after each press, the two squares ---------- */
  function drawPlot() {
    const top = Math.max(3, S.n), g = kit.plot($('plot'), { x: [-0.5, top + 0.5], y: [0, 1.12], pad: [30, 10, 8, 22] });
    const ticks = []; for (let k = 0; k <= top; k++) ticks.push([k, String(k)]);
    g.axes({ yTicks: [0, 0.5, 1], xTicks: ticks });
    const w = 0.28;
    for (let k = 0; k <= S.n; k++) {
      const m = measure(hist[k], S.line), l2 = m.dot * m.dot, p2 = m.plane * m.plane;
      g.rect(k - w, 0, k + w, l2, P.cyan, { alpha: 0.75 });
      if (p2 > 1e-9) g.rect(k - w, l2, k + w, l2 + p2, P.magenta, { alpha: 0.6 });
    }
    const m0 = measure(hist[0], S.line);
    g.hline(m0.dot * m0.dot, P.cyan, { dash: [4, 3], alpha: 0.7 });
    g.vline(clock.t, P.amber, { alpha: 0.8 });
    g.legend([[P.cyan, L('线上那份²', 'line part²')], [P.magenta, L('面上那份²', 'plane part²')]]);
    const now = measure(at(clock.t).r, S.line);
    $('plotMeta').textContent = `${fix(now.dot * now.dot, 3)} + ${fix(now.plane * now.plane, 3)}`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const a = at(clock.t), m = measure(a.r, S.line), last = latest(clock.t);
    $('roSum').innerHTML = `${fix(m.surplus, 3)} = <span class="c-cy">${fix(m.deviation, 3)}</span> + <span class="c-mg">${fix(m.residual, 3)}</span>`;
    $('roSumSub').textContent = L('Tr ρ² − ½ = Σ(p − ½)² + ½·面²', 'Tr ρ² − ½ = Σ(p − ½)² + ½·plane²');
    $('roLine').textContent = sgn(m.dot, 3); $('roPlane').textContent = fix(m.plane, 3);
    $('roProb').textContent = `${fix(m.pp, 3)} / ${fix(m.pm, 3)}`;
    $('roCoh').innerHTML = `${fix(m.coherence, 3)} <small>= ${L('面', 'plane')}/2</small>`;
    $('roMoved').textContent = last.done ? fix(last.moved, 3) : '—';
    $('roNote').textContent = m.len < 1e-3 ? L('箭头缩成了球心：两种结果各占一半，什么也不偏向。', 'The arrow has shrunk to the centre: the two outcomes are 50 / 50 and nothing is favoured.')
      : m.plane < 1e-3 ? L('箭头躺在线上：没有品红的一份，跨分支相干块为零，再投也挪不动它。', 'The arrow lies on the line: no magenta part, the cross-branch block is zero, and no press can move it.')
        : Math.abs(m.dot) < 1e-3 ? L('箭头整个躺在对偶平面里：线上没有影子，投一次就只剩球心。', 'The whole arrow lies in the dual plane: no shadow on the line, and one press leaves only the centre.')
          : L(`箭头长度² 中，线上占 ${fix(100 * m.dot * m.dot / (m.len * m.len), 0)}%，面上占 ${fix(100 * m.plane * m.plane / (m.len * m.len), 0)}%。投一次，面上那份就没了。`, `Of the arrow's length², ${fix(100 * m.dot * m.dot / (m.len * m.len), 0)}% is on the line and ${fix(100 * m.plane * m.plane / (m.len * m.len), 0)}% in the plane. One press and the plane part is gone.`);
    $('pillPress').querySelector('strong').textContent = String(last.done);
    $('pillLine').querySelector('strong').textContent = sgn(m.dot, 2);
    $('pillPlane').querySelector('strong').textContent = fix(m.plane, 2);
    $('rew').disabled = $('play').disabled = $('now').disabled = S.n === 0;
    $('press').disabled = Math.floor(clock.t + 1e-9) >= MAX_PRESSES;
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- controls: the rail counts the presses ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 1.1, step: 1,
    format: (t) => L(`第 ${t.toFixed(2)} 投 <small>/ 共 ${S.n} 投</small>`, `press ${t.toFixed(2)} <small>/ ${S.n} in all</small>`),
    onChange: (t, c) => { if (!S.n && t) c.set(0, true); paint(); }
  });
  let pressing = null;
  /** Start again from the starting arrow, with no presses. */
  function restart() { if (pressing) { pressing.cancel(); pressing = null; } S.n = 0; rebuild(); clock.pause(); clock.setMax(1, true); clock.set(0); }
  /** One more press: from where the rail is now to the next whole press, gliding there. */
  function press() {
    if (pressing) { const p = pressing; pressing = null; p.finish(); }
    clock.pause();
    const from = clock.t, to = Math.floor(from + 1e-9) + 1;
    if (to > MAX_PRESSES) return;
    if (to > S.n) { S.n = to; rebuild(); clock.setMax(S.n, true); }
    const run = kit.tween(650, (e) => clock.set(from + (to - from) * e), () => { if (pressing === run) pressing = null; });
    pressing = run; pressing.finish = () => { run.cancel(); clock.set(to); };
  }
  const fLen = kit.field($('len'), { fmt: (v) => fix(v, 2), onInput: (v) => {
    cards.mark(null); S.len = v;
    const d = v3.len(S.r0) > 1e-6 ? v3.unit(S.r0) : AXES.z;
    S.r0 = v3.scale(d, v); restart();
  } });
  const axisChips = kit.chips($('axisChips'), 'axis', (v) => {
    // a new line starts again from where the arrow is now
    cards.mark(null); const r = at(clock.t).r;
    S.axis = v; S.line = AXES[v]; S.r0 = r; S.len = v3.len(r); fLen.set(S.len.toFixed(2)); restart();
  });
  $('press').addEventListener('click', () => { cards.mark(null); press(); });
  $('restart').addEventListener('click', () => { cards.mark(null); restart(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ p: () => { cards.mark(null); press(); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    once: { axis: 'z', r0: v3.sph(52 * DEG, 40 * DEG), presses: 1, play: true, still: 1 },
    twice: { axis: 'z', r0: v3.sph(52 * DEG, 40 * DEG), presses: 3, play: true, still: 3 },
    fixed: { axis: 'n', r0: v3.scale(AXES.n, 0.7), presses: 2, play: true, still: 2 },
    perp: { axis: 'z', r0: v3.sph(90 * DEG, 30 * DEG), presses: 1, play: true, still: 1 },
    sum: { axis: 'z', r0: v3.sph(58 * DEG, -25 * DEG), presses: 0, play: false }
  };
  const NOTES = {
    once: ['投一次：琥珀色的箭头沿着平行于品红平面的方向，落到青色的线上，只剩它在线上的影子；品红的那一份没了。虚线是原来的箭头：投完之后箭头变短，箭尖离开了球面。', 'One press: the amber arrow drops onto the cyan line, moving parallel to the magenta plane, and only its shadow on the line is left; the magenta part is gone. The dashed arrow is where it started: after the press the arrow is shorter and its tip has left the sphere.'],
    twice: ['连投三次：第一次，箭头落到青色的线上，品红的一份消失；第二次、第三次，箭头一动不动，左上角“这一投挪动”是 0。', 'Three presses in a row: at the first the arrow drops onto the cyan line and the magenta part is gone; at the second and the third it does not move, and “this press moved it” at the top left reads 0.'],
    fixed: ['箭头本来就躺在青色的线上，没有品红的那一份。投两次，它一次也没有动。', 'The arrow already lies on the cyan line and has no magenta part. Two presses, and it never moves.'],
    perp: ['箭头整个躺在品红的对偶平面里，在青色的线上没有影子。投一次，它缩成球心的一个点。', 'The whole arrow lies in the magenta dual plane and casts no shadow on the cyan line. One press shrinks it to a point at the centre.'],
    sum: ['青色的影子加上品红的那一份，正好拼回琥珀色的箭头。两份互相垂直，左上角：线² + 面² 等于箭头长度的平方。', 'The cyan shadow and the magenta part add up to the amber arrow. They are perpendicular, and at the top left line² + plane² equals the arrow\'s length squared.']
  };
  let booting = true, moving = null;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (moving) { moving.cancel(); moving = null; }
    if (pressing) { pressing.cancel(); pressing = null; }
    const from = at(clock.t).r, fromLine = S.line, toLine = AXES[p.axis];
    const land = () => {
      moving = null;
      S.axis = p.axis; S.line = toLine; S.r0 = p.r0; S.len = v3.len(p.r0); fLen.set(S.len.toFixed(2)); axisChips.set(p.axis, true);
      S.n = p.presses; rebuild(); clock.pause(); clock.setMax(Math.max(1, S.n), true); clock.set(0);
      // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
      // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
      if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still); } else if (p.play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    };
    if (booting || TRV.still) { land(); return; }
    // carry the arrow and the line to the card's start, so the eye can follow what changed
    S.n = 0; clock.pause(); clock.setMax(1, true); clock.set(0, true);
    moving = kit.tween(420, (e) => {
      S.r0 = v3.add(from, v3.scale(v3.sub(p.r0, from), e));
      S.line = v3.dot(fromLine, toLine) > 1 - 1e-12 ? toLine : v3.slerp(fromLine, toLine, e);
      rebuild(); paint();
    }, land);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动箭头、换一条线、按“投一次”。随时可以再选一张卡。', 'Free play: drag the arrow, change the line, press “Project”. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.PROJECT_DEBUG = {
    get state() {
      const a = at(clock.t), m = measure(a.r, S.line), l = latest(clock.t);
      return { axis: S.axis, line: S.line.slice(), r0: S.r0.slice(), len: S.len, n: S.n, t: clock.t, playing: clock.playing, preset: cards.current,
        r: a.r.slice(), hist: hist.map((h) => h.slice()), done: l.done, moved: l.moved,
        dot: m.dot, plane: m.plane, purity: m.purity, pp: m.pp, pm: m.pm, surplus: m.surplus, deviation: m.deviation, residual: m.residual, coherence: m.coherence };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of the tip of the current arrow (for pointer tests). */
    tip: () => { const q = stage.p(at(clock.t).r), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { applyPreset('sum'); cards.mark('sum'); stage.cam.yaw = -0.5; stage.cam.pitch = 0.4; paint.now(); };
  cards.pick(cards.initial('twice'));
  booting = false;
  paint();
})();
