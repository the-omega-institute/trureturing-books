/* TWO//ANGLES: two-angle addressing and rotation words on the unit sphere.
   The amber point starts at the north pole N = e3. A rotation word is a list of turns, each about one of two axes:
   a = e3 and b = (0, sin α, cos α), so that α = 90° gives b = e2 and the word [b θ, a φ] is the text's two steps
   R_z(φ) R_y(θ) N. For a target point the page builds a word with a greedy rule (turn about a to set the azimuth, turn
   about b to push the angle from N out by at most 2α, finally turn about a onto the target). The rail advances one
   turn per unit. The "cover" scene draws, on the same sphere, the antipodal open caps of 45° around six rational axes
   (or the three coordinate axes) and the great circle orthogonal to the current point.
   Read-only probe for the browser suite: window.ANGLES_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, N = [0, 0, 1], E1 = [1, 0, 0], AX_A = [0, 0, 1];

  /* ---------- model ---------- */
  const S = { scene: 'words', set: 'six', alpha: 90, theta: 60, phi: 45, explicit: null };
  const axisB = () => [0, Math.sin(S.alpha * DEG), Math.cos(S.alpha * DEG)];
  const target = () => v3.sph(S.theta * DEG, S.phi * DEG);
  const wrapPi = (x) => { let y = x % (2 * Math.PI); if (y <= -Math.PI + 1e-9) y += 2 * Math.PI; if (y > Math.PI + 1e-9) y -= 2 * Math.PI; return y; };
  /** The angles ψ of a turn of p about the unit axis u for which rot(p, u, ψ) · w = c (two of them, in (−π, π]). */
  function solve(p, u, w, c) {
    const pu = v3.dot(p, u), uw = v3.dot(u, w);
    const A = v3.dot(p, w) - pu * uw, B = v3.dot(v3.cross(u, p), w), C = c - pu * uw, R = Math.hypot(A, B);
    if (R < 1e-12) return [0, 0];
    const r = C / R, base = Math.atan2(B, A), d = r >= 1 - 1e-12 ? 0 : r <= -1 + 1e-12 ? Math.PI : Math.acos(r);
    return [wrapPi(base + d), wrapPi(base - d)];
  }
  const smallest = (ps) => ps.slice().sort((x, y) => Math.abs(x) - Math.abs(y) || y - x)[0];
  /** A word carrying N to the target with the axes a and b at angle α; null when no word can (collinear axes). */
  function build() {
    const B = axisB(), t = target(), alpha = S.alpha * DEG, goal = Math.acos(kit.clamp(t[2], -1, 1)), word = [];
    if (goal < 1e-9) return word;
    if (alpha < 1e-9) return null;
    let p = N.slice(), th = 0;
    for (let guard = 0; goal - th > 1e-9 && guard < 200; guard++) {
      const next = Math.min(goal, th + 2 * alpha);
      const beta = kit.clamp(next - alpha, Math.abs(th - alpha), Math.min(th + alpha, Math.PI));
      if (th > 1e-9) {   // set the azimuth about a so that the point lies at the angle β from b
        const psi = smallest(solve(p, AX_A, B, Math.cos(beta)));
        if (Math.abs(psi) > 1e-9) { word.push({ ax: 'a', ang: psi }); p = v3.rot(p, AX_A, psi); }
      }
      const psi = smallest(solve(p, B, AX_A, Math.cos(next)));   // push the angle from N out to `next` about b
      word.push({ ax: 'b', ang: psi }); p = v3.rot(p, B, psi);
      th = Math.acos(kit.clamp(p[2], -1, 1));
    }
    if (Math.sin(goal) > 1e-9) {   // onto the target about a, by an angle in [0, 360°)
      let psi = Math.atan2(t[1], t[0]) - Math.atan2(p[1], p[0]);   // a = e3: the difference of the azimuths
      if (psi < 0) psi += 2 * Math.PI;
      if (psi > 1e-9 && psi < 2 * Math.PI - 1e-9) word.push({ ax: 'a', ang: psi });
    }
    return word;
  }
  let W = [];   // the current word
  function rebuild() {
    if (S.explicit) { W = S.explicit.map(([ax, deg]) => ({ ax, ang: deg * DEG })); return; }
    const w = build();
    W = w || [];
    W.unreachable = !w;
  }
  const len = () => W.length;
  /** The point, the flag (where the turns carry the tangent e1) and the index of the turn in progress at rail position t. */
  function pose(t) {
    const B = axisB();
    let p = N.slice(), f = E1.slice(), bTurns = 0;
    const k = Math.floor(t + 1e-9), u = t - k;
    for (let j = 0; j < W.length; j++) {
      const share = j < k ? 1 : j === k ? u : 0;
      if (share <= 1e-12) continue;
      const ax = W[j].ax === 'a' ? AX_A : B;
      p = v3.rot(p, ax, W[j].ang * share); f = v3.rot(f, ax, W[j].ang * share);
      if (W[j].ax === 'b') bTurns++;
    }
    const cur = Math.min(W.length - 1, u > 1e-9 ? k : k - 1);
    return { p, f, bTurns, cur, polar: Math.acos(kit.clamp(p[2], -1, 1)) };
  }

  /* the caps: colour i is {x : (x·âᵢ)² > ½}; for the rational axes that is 5 < 2(x·aᵢ)² exactly */
  const RAW = { six: [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]], three: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] };
  const NAMES = { six: ['0', '1', '2', '3', '4', '5'], three: ['e₁', 'e₂', 'e₃'] };
  const unitAxes = (set) => RAW[set].map(v3.unit);
  /** The colours holding x, and the largest (x·â)². */
  function colours(x, set) {
    const raw = RAW[set], held = [];
    let near = 0;
    raw.forEach((a, i) => {
      const d = v3.dot(x, a), n2 = v3.dot(a, a);
      if (2 * d * d > n2) held.push(i);   // (x·â)² > ½ ⇔ 2 (x·a)² > ‖a‖² (= 5 for the rational axes)
      near = Math.max(near, d * d / n2);
    });
    return { held, near };
  }
  /** A spiral grid on the sphere plus the 26 directions of the cube (its vertices, edges and faces). */
  const GRID = (() => {
    const pts = [], n = 6000, g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) { const z = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - z * z); pts.push([r * Math.cos(g * i), r * Math.sin(g * i), z]); }
    for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) if (x || y || z) pts.push(v3.unit([x, y, z]));
    return pts;
  })();
  const SURVEY = {};
  for (const set of ['six', 'three']) {
    let worst = 1, at = null; const gaps = [];
    GRID.forEach((x, i) => { const c = colours(x, set); if (c.near < worst) { worst = c.near; at = x; } if (!c.held.length && i < 6000 && i % 2 === 0) gaps.push(x); });
    SURVEY[set] = { worst, at, gaps };
  }

  /* ---------- stage ---------- */
  let grab = false;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.42 : 0.34, cy: TRV.figure ? 0.53 : 0.52, yaw: -2.1, pitch: 0.38,
    onChange: () => paint(),
    onPick: (ev, st) => { grab = !S.explicit && st.near(ev, target()) < 22; return grab; },
    onDrag: (ev, st) => {
      if (!grab) return;
      const x = v3.unit(st.pick(ev));
      S.theta = Math.acos(kit.clamp(x[2], -1, 1)) / DEG;
      S.phi = ((Math.atan2(x[1], x[0]) / DEG) + 360) % 360;
      fT.set(Math.round(S.theta)); fF.set(Math.round(S.phi) % 360);
      changed();
    },
    onDrop: () => { grab = false; }
  });
  const circleOf = (p, u, s) => { const c = v3.dot(p, u); stage.circle(v3.scale(u, c), u, Math.sqrt(Math.max(0, 1 - c * c)), s); };
  /** The road travelled along the word up to t. */
  function road(t) { const pts = [], n = Math.max(2, Math.ceil(t * 40)); for (let i = 0; i <= n; i++) pts.push(pose(t * i / n).p); return pts; }
  function drawStage() {
    const st = stage, c = st.begin(), t = clock.t, now = pose(t), B = axisB(), thick = TRV.thumbMode ? 1.5 : 1, cover = S.scene === 'cover';
    st.sphere(1, { lat: [0], lon: 2, shade: 0.05, alpha: TRV.thumbMode ? 0.7 : 0.38 });
    st.tag('N', [0, 0, 1.1], 'N', 'num', { dx: -16, dy: -4 });
    const cur = now.cur >= 0 && now.cur < W.length ? W[now.cur] : null, curAx = cur ? (cur.ax === 'a' ? AX_A : B) : null;
    if (cover) {
      const ax = unitAxes(S.set), col = colours(now.p, S.set);
      // the gap: where no cap reaches (sampled)
      for (const g of SURVEY[S.set].gaps) if (v3.dot(g, st.facing()) > -0.05) st.dot(g, 1.4 * thick, P.magenta, { alpha: 0.85, fade: false });
      ax.forEach((a, i) => {
        const on = col.held.includes(i);
        for (const s of [1, -1]) {
          const ctr = v3.scale(a, s);
          const near = on && s * v3.dot(now.p, a) > 0;   // the cap that holds the point; its antipode is the same colour
          if (near) { c.save(); c.shadowColor = P.cyan; c.shadowBlur = 8; }
          st.circle(v3.scale(ctr, Math.SQRT1_2), ctr, Math.SQRT1_2, on ? { color: P.cyan, width: (near ? 2.2 : 1.4) * thick, alpha: near ? 0.95 : 0.55, back: 0.3 } : { color: P.dim, width: 1.1 * thick, alpha: 0.75, back: 0.3 });
          if (near) c.restore();
        }
        if (on) { const side = v3.dot(now.p, a) >= 0 ? 1 : -1; st.tag('cap' + i, v3.scale(a, side * 1.12), NAMES[S.set][i], 'num c-cy', {}); }
      });
      // the great circle orthogonal to the current point
      st.circle([0, 0, 0], now.p, 1, { color: P.ink, width: 1.3 * thick, alpha: 0.85, dash: [5, 5], back: 0.35 });
    } else {
      // the two axes
      for (const [key, u, name] of [['a', AX_A, S.alpha < 0.5 ? 'a = b' : 'a = e₃'], ['b', B, S.alpha > 89.5 ? 'b = e₂' : 'b']]) {
        if (key === 'b' && S.alpha < 0.5) continue;
        const hot = curAx === u || (cur && cur.ax === key);
        st.line(v3.scale(u, -1.28), v3.scale(u, 1.28), { color: P.violet, width: (hot ? 2.6 : 1.5) * thick, alpha: hot ? 1 : 0.7, back: 0.5 });
        st.tag('ax' + key, v3.scale(u, 1.4), name, 'raw c-vi', {});
      }
      // how far the turns about b made so far can reach from N
      const reach = 2 * S.alpha * DEG * now.bTurns;
      if (S.alpha > 1e-9 && reach > 1e-9 && reach < Math.PI - 1e-6) {
        st.circle([0, 0, Math.cos(reach)], [0, 0, 1], Math.sin(reach), { color: P.cyan, width: 1.6 * thick, alpha: 0.9, dash: [7, 5], back: 0.35 });
        const D = st.facing(), h = v3.unit(v3.cross(D, [0, 0, 1])), deg = fix(reach / DEG, 0);   // the screen-left end of the circle
        st.tag('reach', [Math.sin(reach) * h[0], Math.sin(reach) * h[1], Math.cos(reach)], L(`离 N ≤ ${deg}°`, `≤ ${deg}° from N`), 'num c-cy', { dx: -40, dy: 14, fade: false });
      }
    }
    // this turn's circle: the point can only move along it
    if (curAx) circleOf(now.p, curAx, { color: P.violet, width: 1.3 * thick, alpha: 0.85, dash: [3, 4], back: 0.3 });
    // when the point sits on the axis of this turn it cannot move: show what the turn does to the flag instead
    if (curAx && Math.abs(v3.dot(now.p, curAx)) > 0.999) {
      const f0 = pose(now.cur).f, done = W[now.cur].ang * (t - now.cur), sweep = [];
      for (let i = 0, n = Math.max(2, Math.ceil(Math.abs(done) / (4 * DEG))); i <= n; i++) sweep.push(v3.add(now.p, v3.scale(v3.rot(f0, curAx, done * i / n), 0.34)));
      st.path(sweep, { color: P.ink, width: 1.3 * thick, alpha: 0.7, dash: [3, 3], back: 0.5 });
      st.tag('spin', sweep[sweep.length - 1], L(`小旗转过 ${fix(Math.abs(done) / DEG, 0)}°`, `flag turned ${fix(Math.abs(done) / DEG, 0)}°`), 'raw ink', { dx: 0, dy: -22 });
    }
    // the road travelled and the target
    if (t > 1e-9 && W.length) st.path(road(t), { color: P.ink, width: 1.8 * thick, alpha: 0.9, back: 0.35 });
    if (!S.explicit) {
      const tg = target();
      st.dot(tg, 7.5, P.ink, { ring: true, width: 1.8, alpha: 0.95 });
      if (!cover) st.tag('tgt', tg, L('目标', 'target'), 'raw ink', { dx: 0, dy: 20 });
    }
    // the current point, its arrow and its flag
    st.arrow([0, 0, 0], now.p, { color: P.amber, width: 2.4 * thick, glow: 10, headSize: 10, fade: false });
    st.dot(now.p, 5.5, P.amber, { glow: 14, fade: false });
    st.arrow(now.p, v3.add(now.p, v3.scale(now.f, 0.34)), { color: P.ink, width: 1.8 * thick, headSize: 8, alpha: 0.95 });
    if (!cover && now.p[2] < 0.97) st.tag('x', now.p, 'x', 'num c-am big', { dx: -14, dy: -12 });
    st.end();

    const k = Math.min(len(), Math.ceil(t - 1e-9)), polar = now.polar / DEG;
    if (cover) {
      const col = colours(now.p, S.set);
      $('hudBig').textContent = L('覆盖 · ', 'Cover · ') + (col.held.length ? L(`x 在颜色 ${col.held.map((i) => NAMES[S.set][i]).join(' · ')}`, `x in colour ${col.held.map((i) => NAMES[S.set][i]).join(' · ')}`) : L('x 不在任何球冠里', 'x in no cap'));
      $('hudSub').innerHTML = L(`最贴近的轴：(x·â)² = ${fix(col.near, 3)} ${col.near > 0.5 ? '&gt;' : '≤'} ½`, `nearest axis: (x·â)² = ${fix(col.near, 3)} ${col.near > 0.5 ? '&gt;' : '≤'} ½`);
    } else {
      $('hudBig').textContent = L(`寻址 · 第 ${k} / ${len()} 个转动`, `Address · turn ${k} of ${len()}`);
      const what = cur ? L(`绕 ${cur.ax} 转 ${fix(cur.ang / DEG, 1)}°`, `about ${cur.ax} by ${fix(cur.ang / DEG, 1)}°`) : L('还在北极', 'still at the pole');
      $('hudSub').innerHTML = `${what} · ${L('离 N', 'from N')} ${fix(polar, 1)}° · ${L('高度', 'height')} cos = ${fix(now.p[2], 3)}`;
    }
    $('legReach').hidden = cover; $('polarPanel').hidden = cover; $('capPanel').hidden = !cover; $('legCaps').hidden = !cover; $('legPerp').hidden = !cover; $('legGap').hidden = !(cover && SURVEY[S.set].gaps.length);
  }

  /* ---------- strip ---------- */
  const sample = (fn) => { const max = Math.max(len(), 1), pts = [], n = Math.max(80, max * 40); for (let i = 0; i <= n; i++) { const t = max * i / n; pts.push([t, fn(t)]); } return pts; };
  const ticks = (max) => { const t = []; const step = max > 10 ? 2 : 1; for (let i = 0; i <= max; i += step) t.push(i); return t; };
  function drawPolar() {
    const max = Math.max(len(), 1), now = pose(clock.t), g = kit.plot($('polarPlot'), { x: [0, max], y: [0, 190], pad: [32, 10, 8, 22] });
    g.axes({ yTicks: [0, 90, 180], xTicks: ticks(max), xGrid: true, yFmt: (v) => `${v}°` });
    if (S.alpha > 1e-9 || W.length) g.line(sample((t) => Math.min(180, 2 * S.alpha * pose(t).bTurns)), P.cyan, { width: 1.5, dash: [5, 4] });
    g.line(sample((t) => pose(t).polar / DEG), P.ink, { width: 2 });
    g.vline(clock.t, P.amber); g.dot(clock.t, now.polar / DEG, P.amber, 4);
    g.legend([[P.ink, L('离 N 的角度', 'angle from N')], [P.cyan, L('上限 2α × 绕 b 的次数', 'bound 2α × turns about b'), 'dash']]);
    $('polarMeta').textContent = `${fix(now.polar / DEG, 1)}° ≤ ${fix(Math.min(180, 2 * S.alpha * now.bTurns), 0)}°`;
  }
  function drawCap() {
    const max = Math.max(len(), 1), now = pose(clock.t), g = kit.plot($('capPlot'), { x: [0, max], y: [0, 1.08], pad: [32, 10, 8, 22] });
    g.axes({ yTicks: [0, 0.5, 1], xTicks: ticks(max), xGrid: true });
    g.hline(0.5, P.magenta, { dash: [4, 4] });
    g.line(sample((t) => colours(pose(t).p, S.set).near), P.cyan, { width: 2 });
    const near = colours(now.p, S.set).near;
    g.vline(clock.t, P.amber); g.dot(clock.t, near, P.amber, 4);
    g.legend([[P.cyan, S.set === 'six' ? L('六根有理轴', 'six rational axes') : L('三根坐标轴', 'three coordinate axes')], [P.magenta, L('球冠门槛 ½', 'cap threshold ½'), 'dash']]);
    $('capMeta').textContent = `(x·â)² ${fix(near, 3)}`;
  }

  /* ---------- readouts ---------- */
  const wordText = () => (W.unreachable ? L('没有：两轴共线，N 走不开', 'none: the axes are collinear and N cannot move')
    : !W.length ? L('空字：已经在目标上', 'the empty word: already on target')
      : W.map((f) => `${f.ax} ${fix(f.ang / DEG, 1)}°`).join(' → '));
  function drawText() {
    const now = pose(clock.t), col = colours(now.p, S.set), goal = Math.acos(kit.clamp(target()[2], -1, 1));
    const bAll = W.filter((f) => f.ax === 'b').length, need = S.alpha > 1e-9 ? Math.ceil(goal / (2 * S.alpha * DEG) - 1e-9) : Infinity;
    $('roWord').textContent = wordText();
    $('roWordSub').textContent = W.length ? L(` · 共 ${W.length} 个转动`, ` · ${W.length} turns`) : '';
    $('roPoint').textContent = `(${fix(now.p[0], 3)}, ${fix(now.p[1], 3)}, ${fix(now.p[2], 3)})`;
    $('roAlpha').textContent = `${fix(S.alpha, 0)}°`;
    $('roCount').textContent = S.explicit ? `${bAll} · —` : `${bAll} · ${isFinite(need) ? need : '∞'}`;
    $('roColors').textContent = col.held.length ? col.held.map((i) => NAMES[S.set][i]).join(' · ') : L('无', 'none');
    $('roNear').textContent = `${fix(col.near, 3)} · ${fix(SURVEY[S.set].worst, 3)}`;
    $('roAside').textContent = S.set === 'six' ? L('六根有理轴', 'six rational axes') : L('三根坐标轴', 'three coordinate axes');
    $('roNote').innerHTML = S.scene === 'cover'
      ? (SURVEY[S.set].gaps.length ? L(`三根坐标轴的球冠在对角线方向漏缝：那里 (x·eⱼ)² 最大只有 ${fix(SURVEY.three.worst, 3)}。`, `The caps of the three coordinate axes leave gaps on the diagonals, where the largest (x·eⱼ)² is only ${fix(SURVEY.three.worst, 3)}.`)
        : L(`六种颜色盖住整颗球：网格上最差的点也有 (x·â)² = ${fix(SURVEY.six.worst, 3)} &gt; ½。`, `The six colours cover the whole sphere: even the worst grid point has (x·â)² = ${fix(SURVEY.six.worst, 3)} &gt; ½.`))
      : W.unreachable ? L('两轴共线：两种转动都固定 N，旋转字再长也走不开。', 'Collinear axes: both kinds of turn fix N, and no word, however long, moves it.')
        : S.explicit ? L('这张卡的字是写定的，不是按目标构造的。', 'This card plays a fixed word, not one built for a target.')
          : L(`页面的构造用了 ${bAll} 次绕 b 的转动；目标离 N ${fix(goal / DEG, 1)}°，每次绕 b 最多推远 2α = ${fix(2 * S.alpha, 0)}°。`, `The page's construction uses ${bAll} turns about b; the target is ${fix(goal / DEG, 1)}° from N, and each turn about b pushes out by at most 2α = ${fix(2 * S.alpha, 0)}°.`);
    $('pillLen').querySelector('strong').textContent = `${Math.min(len(), Math.ceil(clock.t - 1e-9))} / ${len()}`;
    $('pillPolar').querySelector('strong').textContent = `${fix(now.polar / DEG, 1)}°`;
  }

  const paint = kit.painter(() => { drawStage(); drawPolar(); drawCap(); drawText(); }, [$('stage'), $('polarPlot'), $('capPlot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 2, rate: 0.8, step: 1,
    format: (t, max) => `${L('转动', 'turn')} ${t.toFixed(2)} <small>/ ${max.toFixed(0)}</small>`,
    onChange: () => paint()
  });
  function fitRail(toEnd) { const max = Math.max(len(), 1); clock.setMax(max, true); clock.rate = Math.max(0.8, max / 6); clock.set(toEnd ? max : Math.min(clock.t, max)); }
  /** A control moved: rebuild the word for the target and show where it ends. */
  function changed() { S.explicit = null; clock.pause(); rebuild(); fitRail(true); cards.mark(null); paint(); }
  const fA = kit.field($('alpha'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { S.alpha = v; changed(); } });
  const fT = kit.field($('theta'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { S.theta = v; changed(); } });
  const fF = kit.field($('phi'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { S.phi = v; changed(); } });
  const setChips = kit.chips($('setChips'), 'set', (v) => { S.set = v; cards.mark(null); paint(); });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { S.scene = v; cards.mark(null); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards ---------- */
  const VIEW = { side: [-0.35, 0.3], front: [-2.1, 0.38], under: [-2.1, -0.95], above: [-2.1, 1.05], cover: [-1.4, 0.32] };
  const PRESETS = {
    tilt: { scene: 'words', alpha: 90, theta: 60, phi: 45, word: [['b', 360]], view: 'side', still: 0.8 },
    address: { scene: 'words', alpha: 90, theta: 60, phi: 45, view: 'front', still: 'end' },
    pole: { scene: 'words', alpha: 90, theta: 180, phi: 45, word: [['b', 180], ['a', 360]], view: 'under', still: 1.6 },
    skew: { scene: 'words', alpha: 30, theta: 110, phi: 45, view: 'front', still: 'end' },
    collinear: { scene: 'words', alpha: 0, theta: 60, phi: 45, word: [['b', 120], ['a', 90], ['b', 120], ['a', 90]], view: 'above', still: 2.5 },
    narrow: { scene: 'words', alpha: 10, theta: 110, phi: 45, view: 'front', still: 'end' },
    three: { scene: 'cover', set: 'three', alpha: 90, theta: Math.acos(1 / Math.sqrt(3)) / DEG, phi: 45, view: 'cover', still: 'end' },
    six: { scene: 'cover', set: 'six', alpha: 90, theta: 60, phi: 45, view: 'cover', still: 'end' }
  };
  const NOTES = {
    tilt: ['只绕 e₂ 转：琥珀色的点沿紫色虚线的子午圆走一整圈，又回到 N。单独一根轴只画得出这一个圆。', 'Turning about e₂ alone: the amber point runs once round the violet dashed meridian and comes back to N. A single axis draws only this one circle.'],
    address: ['先绕 e₂ 倾转 θ = 60°，再绕竖轴 e₃ 拧转 φ = 45°：第二步沿紫色虚线的纬度圈走，高度 cos θ = ½ 不变，停在白色的目标圈上，x = (√6/4, √6/4, ½)。', 'First tilt by θ = 60° about e₂, then twist by φ = 45° about the vertical axis e₃: the second turn runs along the violet dashed latitude circle at the fixed height cos θ = ½ and stops in the white target ring, x = (√6/4, √6/4, ½).'],
    pole: ['倾转 θ = 180° 到南极，再绕竖轴拧一整圈：琥珀色的点一动不动，只有白色的小旗在转。在两极，φ 取什么都是同一点。', 'Tilt by θ = 180° to the south pole, then twist a full turn about the vertical axis: the amber point does not move, only the white flag turns. At the poles every φ names the same point.'],
    skew: ['两根紫色转轴只差 30°：每次绕 b 最多把点推离 N 60°，青色虚线是到这一步为止能到的最远处。绕 b、绕 a 交替转四次，点停在离 N 110° 的白色目标圈上，青色虚线停在 120°。', 'The violet axes are only 30° apart: each turn about b pushes the point at most 60° further from N, and the cyan dashed circle is the farthest it can be so far. Four turns, alternating about b and about a, bring it to the white target ring 110° from N; the cyan circle stops at 120°.'],
    collinear: ['两轴重合（α = 0）：绕 a 转和绕 b 转是同一种转动，都固定 N。琥珀色的点不动，白色的小旗只在水平面里转。', 'The axes coincide (α = 0): a turn about a and a turn about b are the same kind of turn, and both fix N. The amber point stays put, and the white flag only turns in the horizontal plane.'],
    narrow: ['两根紫色转轴只差 10°：每次绕 b 只能推远 20°，青色虚线一格一格往外挪。同一个目标要十二个转动才到。', 'The violet axes are only 10° apart: each turn about b pushes out by just 20°, and the cyan dashed circle creeps outward one step at a time. The same target now takes twelve turns.'],
    three: ['只用三根坐标轴的 45° 球冠：点走到卦限对角线 (1, 1, 1)/√3 时，三对灰色的圆都不含它，它落在品红的缝里。', 'Only the 45° caps of the three coordinate axes: when the point reaches the octant diagonal (1, 1, 1)/√3, none of the three grey pairs of circles holds it, and it sits in the magenta gap.'],
    six: ['六根有理轴的 12 个球冠：点停在 x = (√6/4, √6/4, ½)，被颜色 0、2、4 的青色球冠盖住；白色虚线是与 x 正交的大圆，它不进入这三种颜色的任何一个球冠。', 'The 12 caps of the six rational axes: the point stops at x = (√6/4, √6/4, ½), inside the cyan caps of colours 0, 2 and 4; the white dashed line is the great circle orthogonal to x, and it enters no cap of those three colours.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.scene = p.scene; S.alpha = p.alpha; S.theta = p.theta; S.phi = p.phi; S.explicit = p.word || null; if (p.set) S.set = p.set;
    sceneChips.set(S.scene, true); setChips.set(S.set, true); fA.set(p.alpha); fT.set(Math.round(p.theta)); fF.set(p.phi);
    rebuild(); fitRail(false); clock.set(0);
    stage.view(VIEW[p.view], TRV.still || booting ? 0 : 600);
    const still = p.still === 'end' ? len() : p.still;
    // a still (cover, cited figure shot) and the opening of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) clock.set(still); else if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动白色的目标圈、改两轴夹角，或换到“覆盖”场景。随时可以再选一张卡。', 'Free play: drag the white target ring, change the angle between the axes, or switch to the “Cover” scene. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.ANGLES_DEBUG = {
    get state() {
      const s = pose(clock.t), col = colours(s.p, S.set);
      return { scene: S.scene, set: S.set, alpha: S.alpha, theta: S.theta, phi: S.phi, t: clock.t, max: clock.max, playing: clock.playing,
        preset: cards.current, explicit: !!S.explicit, unreachable: !!W.unreachable,
        word: W.map((f) => ({ ax: f.ax, deg: f.ang / DEG })), p: s.p, flag: s.f, polar: s.polar / DEG, bTurns: s.bTurns,
        held: col.held, near: col.near, worst: SURVEY[S.set].worst, gaps: SURVEY[S.set].gaps.length, target: target(), b: axisB() };
    },
    at: (t) => { const s = pose(t); return { p: s.p, polar: s.polar / DEG, bTurns: s.bTurns }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of a world point (for pointer tests). */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { applyPreset('skew'); cards.mark('skew'); clock.pause(); clock.set(len()); stage.cam.yaw = -2.1; stage.cam.pitch = 0.32; paint.now(); };
  cards.pick(cards.initial('address'));
  booting = false;
  paint();
})();
