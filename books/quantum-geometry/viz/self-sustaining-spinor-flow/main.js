/* ORTHO//CLOSURE · 自持旋量流 · Self-sustaining spinor flow
   The stage is the real geometric algebra Cl(3,0). An even spinor ψ = √ρ R (RR̃ = 1) sandwiches two reference blades:
     J = ψ e₃ ψ̃   the current vector (cyan arrow, length ρ),
     S = ψ e₁e₂ ψ̃ the spin bivector (magenta square of side √ρ spanned by R e₁ R̃ and R e₂ R̃, area ρ),
   and the page multiplies out J², S² and ρ² = (ψψ̃)² on the spot. The rail turns ψ: ψ(t) = R_B(t) ψ₀ with
   R_B(t) = cos(t/2) − sin(t/2) B for a unit bivector B; J turns through t about the violet axis n = dual of B.
   Outside the sphere a one-sided (Möbius) band goes once round n; at the bearing of J stands a violet flag along
   cos(t/2) n + sin(t/2) r, the two components of ψψ̃₀/ρ: after 360° the flag is reversed (ψ = −ψ₀), after 720° it is back.
   Every number comes from one product: multivectors multiplied blade by blade.
   Read-only probe for the browser suite: window.CLOSURE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, FULL = 2 * TAU;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];

  /* ---------- Cl(3,0): 8 coefficients on blades by bitmask (bit 0 = e₁, bit 1 = e₂, bit 2 = e₃) ---------- */
  // blades: 0 = 1, 1 = e₁, 2 = e₂, 3 = e₁e₂, 4 = e₃, 5 = e₁e₃, 6 = e₂e₃, 7 = e₁e₂e₃
  const GRADE = [0, 1, 1, 2, 1, 2, 2, 3];
  const pop = (x) => { let n = 0; while (x) { n += x & 1; x >>= 1; } return n; };
  function bladeSign(a, b) { let s = 0; a >>= 1; while (a) { s += pop(a & b); a >>= 1; } return s & 1 ? -1 : 1; }
  function mul(A, B) {
    const C = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) if (A[i]) for (let j = 0; j < 8; j++) if (B[j]) C[i ^ j] += bladeSign(i, j) * A[i] * B[j];
    return C;
  }
  const rev = (A) => A.map((x, i) => (GRADE[i] >= 2 ? -x : x));
  const scl = (A, k) => A.map((x) => x * k);
  const vec = (v) => [0, v[0], v[1], 0, v[2], 0, 0, 0];
  const vecOf = (M) => [M[1], M[2], M[4]];
  /** Bivector coefficients in the order (e₂e₃, e₃e₁, e₁e₂). */
  const bivOf = (M) => [M[6], -M[5], M[3]];
  const sandwich = (X, M) => mul(mul(X, M), rev(X));
  const ONE = [1, 0, 0, 0, 0, 0, 0, 0], E12 = [0, 0, 0, 1, 0, 0, 0, 0];
  /** The planes of the turn: B, its two edge vectors (a turns towards b) and the axis n = a × b. */
  const PLANES = {
    e23: { a: E2, b: E3, n: E1, B: [0, 0, 0, 0, 0, 0, 1, 0], name: 'e₂e₃' },
    e31: { a: E3, b: E1, n: E2, B: [0, 0, 0, 0, 0, -1, 0, 0], name: 'e₃e₁' },
    e12: { a: E1, b: E2, n: E3, B: [0, 0, 0, 1, 0, 0, 0, 0], name: 'e₁e₂' }
  };
  const turnRotor = (pl, t) => { const c = Math.cos(t / 2), s = Math.sin(t / 2); return pl.B.map((x, i) => (i === 0 ? c : 0) - s * x); };
  /** The unit rotor that carries the unit vector a to the unit vector b along the shorter arc. */
  function arcRotor(a, b) {
    const M = mul(vec(b), vec(a)); M[0] += 1;
    const n = Math.hypot(M[0], M[3], M[5], M[6]);
    if (n < 1e-9) { const p = v3.unit(v3.cross(a, Math.abs(a[0]) < 0.9 ? E1 : E2)); return mul(vec(p), vec(a)).map((x) => x); }
    return scl(M, 1 / n);
  }
  /** A deterministic random unit rotor (seeded). */
  function randomRotor(seed) {
    let x = (seed * 2654435761) >>> 0;
    const rnd = () => { x = (x + 0x6d2b79f5) >>> 0; let t = x; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const g = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(TAU * rnd());
    const q = [g(), g(), g(), g()], n = Math.hypot(...q);
    return [q[0] / n, 0, 0, q[3] / n, 0, q[2] / n, q[1] / n, 0];
  }
  /** Rotor as text: a + b e₂e₃ + c e₃e₁ + d e₁e₂. */
  function evenText(M, d = 2) {
    let s = fix(M[0], d);
    const bv = bivOf(M);
    [['e₂e₃', bv[0]], ['e₃e₁', bv[1]], ['e₁e₂', bv[2]]].forEach(([nm, x]) => { s += ` ${x < 0 ? '−' : '+'} ${fix(Math.abs(x), d)} ${nm}`; });
    return s;
  }
  const vt = (x, d = 2) => `(${x.map((y) => fix(y, d)).join(', ')})`;

  /* ---------- state ---------- */
  const S = { rho: 1, plane: 'e23', R0: ONE.slice(), seed: 0, fan: false, ref: false, band: true, max: FULL };
  const PL = () => PLANES[S.plane];
  /** ψ and everything woven from it at rail value t. */
  function at(t) {
    const pl = PL(), Rt = turnRotor(pl, t), R = mul(Rt, S.R0), psi = scl(R, Math.sqrt(S.rho));
    const psi0 = scl(S.R0, Math.sqrt(S.rho));
    const Jm = sandwich(psi, vec(E3)), Sm = sandwich(psi, E12), rhoM = mul(psi, rev(psi));
    const J = vecOf(Jm), A = vecOf(sandwich(R, vec(E1))), Bv = vecOf(sandwich(R, vec(E2)));
    const J2 = mul(Jm, Jm), S2 = mul(Sm, Sm);
    const M = scl(mul(psi, rev(psi0)), 1 / S.rho);           // = R_B(t)
    const c = M[0], s = -mul(M, rev(pl.B))[0];               // M = c − s B
    const J0 = vecOf(sandwich(psi0, vec(E3)));
    return { psi, psi0, R, J, Sm, A, B: Bv, rho: rhoM[0], rhoM, J2, S2, c, s, J0,
      Jback: Math.acos(clamp(v3.dot(v3.unit(J), v3.unit(J0)), -1, 1)) };
  }

  /* ---------- the band ---------- */
  const RB = 1.5, HW = 0.5;
  /** Bearing (angle in the plane of the turn, from a towards b) of the start of J; 0 when J lies on the axis. */
  function bearing0() {
    const pl = PL(), J0 = at(0).J0, x = v3.dot(J0, pl.a), y = v3.dot(J0, pl.b);
    return Math.hypot(x, y) > 1e-6 * S.rho ? Math.atan2(y, x) : 0;
  }
  const radial = (pl, al) => v3.add(v3.scale(pl.a, Math.cos(al)), v3.scale(pl.b, Math.sin(al)));
  /** The centre of the band at turn u, and its width direction (half a turn per round). */
  function bandAt(u, a0) {
    const pl = PL(), r = radial(pl, a0 + u), tg = radial(pl, a0 + u + PI / 2);
    return { c: v3.scale(r, RB), w: v3.add(v3.scale(pl.n, Math.cos(u / 2)), v3.scale(r, Math.sin(u / 2))), r, tg };
  }

  /* ---------- stage ---------- */
  let drag = false;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.25 : 0.23, cy: 0.52, yaw: -0.5, pitch: 0.36,
    onChange: () => paint(),
    onPick: (ev, st) => { const X = at(clock.t); drag = st.near(ev, X.J) < 26; return drag; },
    onDrag: (ev, st) => { if (!drag) return; cards.mark(null); restoreMax(); aimJ(st.pick(ev)); },
    onDrop: () => { drag = false; }
  });

  function drawBand(st, t, a0) {
    const N = 120, quads = [];
    for (let i = 0; i < N; i++) {
      const u0 = TAU * i / N, u1 = TAU * (i + 1) / N, p = bandAt(u0, a0), q = bandAt(u1, a0);
      const pts = [v3.add(p.c, v3.scale(p.w, -HW)), v3.add(p.c, v3.scale(p.w, HW)), v3.add(q.c, v3.scale(q.w, HW)), v3.add(q.c, v3.scale(q.w, -HW))];
      quads.push({ pts, d: pts.reduce((s, x) => s + st.p(x)[2], 0) / 4 });
    }
    quads.sort((x, y) => x.d - y.d);
    for (const qd of quads) st.poly(qd.pts, { fill: P.violet, alpha: (TRV.thumbMode ? 0.2 : 0.11) * (qd.d < 0 ? 0.7 : 1) });
    // the edge: one closed curve that goes twice round
    const edge = [];
    for (let i = 0; i <= 2 * N; i++) { const u = 2 * TAU * i / (2 * N), b = bandAt(u, a0); edge.push(v3.add(b.c, v3.scale(b.w, HW))); }
    st.path(edge, { color: P.violet, width: 1, alpha: 0.5, back: 0.35 });
    // the base circle of the band
    st.circle([0, 0, 0], PL().n, RB, { color: P.violet, width: 0.8, alpha: 0.35, dash: [2, 5], back: 0.4 });
  }
  /** A flag: a pole from the centre line of the band to its edge, with a pennant at the top pointing along the travel. */
  function flag(st, u, a0, s) {
    s = s || {};
    const b = bandAt(u, a0), tip = v3.add(b.c, v3.scale(b.w, HW)), k = s.small ? 0.6 : 1;
    st.line(b.c, tip, { color: P.violet, width: (s.width || 2.4), alpha: s.alpha == null ? 1 : s.alpha, dash: s.dash, fade: false });
    const low = v3.add(b.c, v3.scale(b.w, HW * (1 - 0.42 * k))), mid = v3.add(v3.add(b.c, v3.scale(b.w, HW * (1 - 0.21 * k))), v3.scale(b.tg, 0.3 * k));
    st.poly([tip, mid, low], s.dash ? { color: P.violet, width: 1.4, dash: s.dash, strokeAlpha: 0.9 } : { fill: P.violet, alpha: (s.alpha == null ? 1 : s.alpha) * 0.9, color: P.violet, width: 1, strokeAlpha: 1 });
    return { base: b.c, tip };
  }
  function drawFlags(st, t, a0) {
    // the trail of the flag's tip: the edge of the band, as far as ψ has gone
    if (!S.fan && t > 1e-3) {
      const n = Math.max(2, Math.ceil(t / (2 * DEG))), tr = [];
      for (let j = 0; j <= n; j++) { const u = t * j / n, b = bandAt(u, a0); tr.push(v3.add(b.c, v3.scale(b.w, HW))); }
      st.path(tr, { color: P.violet, width: 3.2, alpha: 0.95, back: 0.45 });
    }
    if (S.fan) for (let u = PI / 6; u < t - 1e-6; u += PI / 6) flag(st, u, a0, { width: 1.6, alpha: 0.7, small: true });
    // the flag at the start (dashed) and the flag now
    const moved = t > 0.05;
    const f0 = moved ? flag(st, 0, a0, { width: 1.8, dash: [4, 3], alpha: 0.9 }) : null;
    const f = flag(st, t, a0, { width: 3.2 });
    st.dot(f.base, 5.5, P.amber, { glow: 12, fade: false });
    const up = (u) => (v3.dot(bandAt(u, a0).w, PL().n) < 0 ? 18 : -18);
    // the start flag is labelled when the current flag is back at the same bearing (or far from it)
    const near = Math.abs(((t + PI) % TAU) - PI) < 0.6;
    if (f0 && (!near || Math.cos(t / 2) < 0)) st.tag('flag0', f0.tip, L('出发时', 'at the start'), 'raw c-vi', { dx: 0, dy: up(0) });
    st.tag('flag', f.tip, L('ψ 的小旗', 'flag of ψ'), 'raw c-vi', { dx: 0, dy: up(t) });
    return f;
  }
  function drawSpin(st, X) {
    const k = Math.sqrt(X.rho), a = v3.scale(X.A, k), b = v3.scale(X.B, k), ab = v3.add(a, b);
    st.poly([[0, 0, 0], a, ab, b], { fill: P.magenta, alpha: TRV.thumbMode ? 0.4 : 0.26, color: P.magenta, width: 1.4, strokeAlpha: 0.9 });
    // the sense of S: a small arc from Re₁R̃ towards Re₂R̃
    const arc = [];
    for (let j = 0; j <= 16; j++) { const g = (PI / 2) * j / 16; arc.push(v3.scale(v3.add(v3.scale(X.A, Math.cos(g)), v3.scale(X.B, Math.sin(g))), 0.42 * k)); }
    st.path(arc, { color: P.magenta, width: 1.6, alpha: 0.95, fade: false });
    const end = arc[arc.length - 1], prev = arc[arc.length - 3];
    st.arrow(prev, end, { color: P.magenta, width: 1.6, headSize: 7, fade: false });
    st.tag('S', v3.scale(ab, 0.62), 'S', 'raw c-mg', { dx: 0, dy: 0 });
  }
  function drawRef(st) {
    st.arrow([0, 0, 0], E3, { color: P.dim, width: 1.4, dash: [4, 4], headSize: 8, fade: false });
    st.tag('e3', [0, 0, 1.12], 'e₃', 'raw ink', {});
    st.poly([[0, 0, 0], E1, [1, 1, 0], E2], { color: P.dim, width: 1, dash: [3, 4], strokeAlpha: 0.8 });
    st.tag('e12', [1, 1, 0], 'e₁e₂', 'raw ink', { dx: 16, dy: 8 });
  }

  function drawStage() {
    const st = stage, t = clock.t, X = at(t), a0 = bearing0();
    st.begin();
    st.sphere(1, { lat: [0], lon: 0, shade: 0.06, alpha: 0.3 });
    const n = PL().n;
    if (!S.ref) {
      st.line(v3.scale(n, -1.95), v3.scale(n, 1.95), { color: P.violet, width: 1.4, alpha: 0.75, back: 0.4 });
      st.tag('axis', v3.scale(n, 2.05), 'n', 'raw c-vi', {});
    }
    if (S.band) drawBand(st, t, a0);
    if (S.ref) drawRef(st);
    // the path of J's tip so far, and where J started
    const tip0 = X.J0;
    const n2 = Math.max(2, Math.ceil(Math.min(t, TAU) / (3 * DEG))), jp = [];
    for (let j = 0; j <= n2; j++) jp.push(at(Math.min(t, TAU) * j / n2).J);
    if (t > 1e-3) st.path(jp, { color: P.cyan, width: 1.6, alpha: 0.7, dash: [5, 4], back: 0.4 });
    if (S.ref && v3.len(v3.sub(v3.unit(X.J), E3)) > 0.05) st.arc(E3, v3.unit(X.J), { color: P.violet, width: 1.4, alpha: 0.8, dash: [3, 3] }, 0.5);
    drawSpin(st, X);
    if (t > 1e-3 && v3.len(v3.sub(X.J, tip0)) > 0.05) st.dot(tip0, 4.5, P.cyan, { ring: true, width: 2 });
    st.arrow([0, 0, 0], X.J, { color: P.cyan, width: 3.4, headSize: 13, glow: 10 });
    st.tag('J', X.J, 'J', 'raw c-cy', { dx: 14, dy: -12 });
    if (S.band) drawFlags(st, t, a0);
    st.end();
    const back = X.c < 0;
    $('hudBig').textContent = `J² = −S² = ρ² = ${fix(X.J2[0], 2)}`;
    $('hudSub').innerHTML = `${L('在', 'in ')}${PL().name}${L(' 面里转过', ', turned')} ${fix(t / DEG, 0)}° · <span class="c-cy">${L('J 离出发方向', 'J from its start')} ${fix(X.Jback / DEG, 0)}°</span> · <span class="c-vi">${signText(X)}</span>`;
    const LEG = [['cy', S.ref ? L('流向量 J = ψe₃ψ̃', 'current J = ψe₃ψ̃') : L('流向量 J = ψe₃ψ̃；虚线：J 走过的路', 'current J = ψe₃ψ̃; dashed: its path')], ['mg', L('自旋面 S = ψe₁e₂ψ̃', 'spin plane S = ψe₁e₂ψ̃')]];
    if (S.ref) LEG.push(['dm', L('参考刀片 e₃ 与 e₁e₂', 'reference blades e₃ and e₁e₂')], ['vi', L('ψ 把 e₃ 带到 J', 'ψ carries e₃ to J')]);
    else if (S.band) LEG.push(['vi', L('转轴、单侧光带与 ψ 的小旗', 'axis, one-sided band and the flag of ψ')], ['am', L('此刻', 'now')]);
    else LEG.push(['vi', L('转轴 n', 'axis n')]);
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
    return Object.assign(X, { back });
  }
  function signText(X) {
    if (Math.abs(X.c - 1) < 1e-9) return 'ψ = +ψ₀';
    if (Math.abs(X.c + 1) < 1e-9) return 'ψ = −ψ₀';
    return L(`ψ 比 ψ₀：${fix(X.c, 2)}`, `ψ vs ψ₀: ${fix(X.c, 2)}`);
  }

  /* ---------- strip: what comes back when ---------- */
  function drawPlot() {
    const g = kit.plot($('plot'), { x: [0, FULL], y: [-1.15, 1.15], pad: [34, 10, 8, 22] });
    g.axes({ xTicks: [0, 180, 360, 540, 720].map((d) => [d * DEG, `${d}°`]), yTicks: [[-1, '−1'], [0, '0'], [1, '1']] });
    g.hline(0, P.dim, { alpha: 0.5 });
    g.vline(TAU, P.dim, { alpha: 0.6 });
    const cj = [], cp = [];
    for (let i = 0; i <= 240; i++) {
      const u = FULL * i / 240, X = at(u);
      cj.push([u, v3.dot(v3.unit(X.J), v3.unit(X.J0))]); cp.push([u, X.c]);
    }
    g.line(cj, P.cyan, { width: 2 });
    g.line(cp, P.violet, { width: 2.2 });
    g.vline(clock.t, P.amber, { alpha: 0.8 });
    const X = at(clock.t);
    g.dot(clock.t, X.c, P.amber, 4);
    $('plotMeta').innerHTML = `<span class="c-cy">J · J₀ / ρ²</span> · <span class="c-vi">⟨ψψ̃₀⟩/ρ</span>`;
  }

  /* ---------- readouts ---------- */
  function drawText(X) {
    const t = clock.t;
    $('roAside').textContent = `ρ = ${fix(X.rho, 2)}`;
    $('roKey').textContent = `${fix(X.J2[0], 3)} · ${fix(-X.S2[0], 3)} · ${fix(X.rho * X.rho, 3)}`;
    $('roKeySub').textContent = L(' · 三个数相等', ' · all three agree');
    $('roPsi').textContent = evenText(X.psi);
    $('roJ').textContent = vt(X.J);
    $('roS').textContent = `${vt(bivOf(X.Sm))} · ${L('面积', 'area')} ${fix(Math.hypot(...bivOf(X.Sm)), 2)}`;
    $('roJback').textContent = `${fix(X.Jback / DEG, 1)}°`;
    $('roSign').textContent = Math.abs(Math.abs(X.c) - 1) < 1e-9 ? `${fix(X.c, 3)} · ${signText(X)}` : fix(X.c, 3);
    const tm = t / TAU;
    let note;
    if (Math.abs(tm - 1) < 1e-6) note = L('转满 360°：青色的 J 回到出发处，品红的 S 也是；紫色小旗却到了光带的另一面，与虚线的出发小旗方向相反——ψ = −ψ₀。J 与 S 只认得出转动，认不出 ψ 的正负号。',
      'A full 360°: the cyan J is back where it started, and so is the magenta S; but the violet flag is on the other side of the band, opposite to the dashed starting flag — ψ = −ψ₀. J and S see the rotation, not the sign of ψ.');
    else if (Math.abs(tm - 2) < 1e-6) note = L('转满 720°：小旗回到出发时的那一面，旗尖走过的路（光带的边）首尾相接——ψ = +ψ₀。',
      'A full 720°: the flag is back on the side it started from and the path of its tip, the edge of the band, closes up — ψ = +ψ₀.');
    else if (t < 1e-6) note = L('还没转：小旗顺着转轴 n 竖着。J 的长度是 ρ，品红正方形的面积也是 ρ。', 'Not turned yet: the flag stands along the axis n. J has length ρ, and the magenta square has area ρ too.');
    else note = L(`转过 ${fix(t / DEG, 0)}°：J 只转过同样的角，小旗只转过一半（${fix(t / 2 / DEG, 0)}°）。三个平方仍然相等。`,
      `Turned ${fix(t / DEG, 0)}°: J has turned through that angle, the flag through half of it (${fix(t / 2 / DEG, 0)}°). The three squares still agree.`);
    $('roNote').textContent = note;
    $('pillTurn').querySelector('strong').textContent = `${fix(t / DEG, 0)}°`;
    $('pillSign').querySelector('strong').textContent = sgn(X.c, 2);
  }

  const paint = kit.painter(() => { const X = drawStage(); drawPlot(); drawText(X); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: FULL, rate: 1.05, step: PI / 12,
    format: (t, max) => `${L('转过', 'turned')} ${fix(t / DEG, 0)}° <small>/ ${fix(max / DEG, 0)}°</small>`,
    onChange: () => paint()
  });
  function restoreMax() { if (S.max !== FULL) { S.max = FULL; clock.setMax(FULL, true); } }
  const fRho = kit.field($('rho'), { fmt: (v) => fix(v, 2), onInput: (v) => { cards.mark(null); restoreMax(); S.rho = v; paint(); } });
  const planeChips = kit.chips($('planeChips'), 'plane', (v) => { cards.mark(null); restoreMax(); S.plane = v; paint(); });
  $('psiOne').addEventListener('click', () => { cards.mark(null); restoreMax(); S.R0 = ONE.slice(); paint(); });
  function randomPsi() { cards.mark(null); restoreMax(); S.seed += 1; S.R0 = randomRotor(S.seed); paint(); }
  $('psiRandom').addEventListener('click', randomPsi);
  $('fanChip').addEventListener('click', () => { cards.mark(null); restoreMax(); S.fan = !S.fan; $('fanChip').setAttribute('aria-pressed', String(S.fan)); paint(); });
  $('bandChip').addEventListener('click', () => { cards.mark(null); restoreMax(); S.band = !S.band; $('bandChip').setAttribute('aria-pressed', String(S.band)); if (S.band && stage.cam.zoom > 1.05) stage.view([stage.cam.yaw, stage.cam.pitch, 1], 400); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ r: randomPsi });
  /** Choose ψ₀ so that J at the current turn points at the unit vector p. */
  function aimJ(p) {
    const t = clock.t, Rt = turnRotor(PL(), t), now = mul(Rt, S.R0), Jn = vecOf(sandwich(now, vec(E3)));
    const Q = arcRotor(v3.unit(Jn), v3.unit(p));
    S.R0 = mul(rev(Rt), mul(Q, now));
    const k = Math.hypot(...S.R0); S.R0 = scl(S.R0, 1 / k);
    paint();
  }

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    weave: { rho: 1, plane: 'e23', aim: [0.53, 0.29, 0.8], ref: true, band: false, at: 0, view: [-0.5, 0.36, 1.55] },
    fierz: { rho: 1.3, plane: 'e31', seed: 7, band: false, play: true, still: 2.2, view: [-0.5, 0.36, 1.3] },
    turn360: { rho: 1, plane: 'e23', play: true, still: TAU, max: TAU, view: [-0.42, 0.3, 0.9] },
    seam: { rho: 1, plane: 'e23', fan: true, play: true, still: TAU, max: TAU, view: [-0.42, 0.3, 0.9] },
    turn720: { rho: 1, plane: 'e23', play: true, still: FULL, view: [-0.42, 0.3, 0.9] }
  };
  const NOTES = {
    weave: ['ψ₀ 是一枚斜着的旋量（ρ = 1）。它夹住虚线的 e₃，织出青色的流向量 J；夹住虚线的 e₁e₂ 正方形，织出品红的自旋面 S——那块面正好与 J 垂直。紫色虚线小弧是 ψ 把 e₃ 带到 J 走的路。',
      'ψ₀ is a slanted spinor (ρ = 1). Sandwiching the dashed e₃, it weaves the cyan current vector J; sandwiching the dashed e₁e₂ square, it weaves the magenta spin plane S, which lies exactly at right angles to J. The short dashed violet arc is the way ψ carries e₃ to J.'],
    fierz: ['随便一个 ψ（ρ = 1.3），在 e₃e₁ 面里一直转：J 的长度是 1.3，品红正方形的面积也是 1.3，三个平方 J²、−S²、ρ² 一直都是 1.69。',
      'Any ψ at all (ρ = 1.3), turning on and on in the e₃e₁ plane: J has length 1.3, the magenta square has area 1.3, and the three squares J², −S² and ρ² stay at 1.69 the whole time.'],
    turn360: ['第三十九章的例子：ψ = cos(ϑ/2) − sin(ϑ/2) e₂e₃，转满 360°。青色的 J 绕一圈回到 e₃，品红的 S 也回到原样；紫色小旗却沿光带滑到了另一面，与虚线的出发小旗方向相反：ψ = −ψ₀。旗尖走过的紫色轨迹从光带的上边走到下边，首尾没有接上。',
      'The example of Chapter 39: ψ = cos(ϑ/2) − sin(ϑ/2) e₂e₃, turned a full 360°. The cyan J goes once round back to e₃ and the magenta S is as it was; but the violet flag has slid to the other side of the band and points opposite to the dashed starting flag: ψ = −ψ₀. The violet trail of the tip of the flag runs from the upper edge of the band to the lower one, and its ends do not meet.'],
    seam: ['从出发点起每 30° 插一面小旗，每一面都接着上一面连续地插。绕回出发点时，最后一面与虚线的第一面方向正好相反：沿着这一圈连续地选“平方根”，回到起点就对不上。',
      'From the start, plant a flag every 30°, each one continuing the one before. Back at the start, the last flag points exactly opposite to the dashed first one: choosing a “square root” continuously round the loop does not match up when you return.'],
    turn720: ['再转一圈，一共 720°：小旗回到出发时的那一面，与虚线的出发小旗重合，ψ = +ψ₀。旗尖走过的路就是光带的边——这条边绕了两圈才首尾相接。青色的 J 在这期间走了两圈。',
      'One more turn, 720° in all: the flag is back on its first side, on top of the dashed starting flag, and ψ = +ψ₀. The path of the tip of the flag is the edge of the band, and that edge closes only after going round twice. Meanwhile the cyan J has gone round twice.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.rho = p.rho; fRho.set(p.rho);
    S.plane = p.plane; planeChips.set(p.plane, true);
    S.seed = p.seed || 0; S.R0 = p.aim ? arcRotor(E3, v3.unit(p.aim)) : p.seed ? randomRotor(p.seed) : ONE.slice();
    S.fan = !!p.fan; $('fanChip').setAttribute('aria-pressed', String(S.fan));
    S.band = p.band !== false; $('bandChip').setAttribute('aria-pressed', String(S.band));
    S.ref = !!p.ref;
    S.max = p.max || FULL;
    if (booting || TRV.still) { stage.cam.yaw = p.view[0]; stage.cam.pitch = p.view[1]; stage.cam.zoom = p.view[2]; } else stage.view(p.view, 600);
    clock.pause(); clock.setMax(S.max, true); clock.set(p.at || 0);
    if (p.play) {
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
      else if (booting) kit.autoplay(clock, $('stage'));
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: (id) => { S.ref = false; applyPreset(id); },
    idle: ['自由探索：拖动 J 的箭头尖换一个 ψ₀，改密度 ρ 或转动的平面，拖时间轴。随时可以再选一张卡。', 'Free play: drag the tip of J to choose another ψ₀, change the density ρ or the plane of the turn, scrub the rail. Pick a card again at any time.'] });
  // leaving a card clears the reference blades it showed
  const mark0 = cards.mark;
  cards.mark = (id) => { if (!id) S.ref = false; mark0(id); };

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.CLOSURE_DEBUG = {
    get state() {
      const t = clock.t, X = at(t), a0 = bearing0(), b = bandAt(t, a0);
      return { preset: cards.current, t, max: clock.max, playing: clock.playing, rho: S.rho, plane: S.plane, fan: S.fan, ref: S.ref, band: S.band, zoom: stage.cam.zoom,
        psi: X.psi.slice(), psi0: X.psi0.slice(), J: X.J, J0: X.J0, S: X.Sm.slice(), A: X.A, B: X.B,
        J2: X.J2.slice(), S2: X.S2.slice(), rhoM: X.rhoM.slice(), c: X.c, s: X.s, Jback: X.Jback,
        axis: PL().n.slice(), flagDir: b.w, flagBase: b.c, keyText: $('roKey').textContent };
    },
    /** ψ (8 blade coefficients [1, e₁, e₂, e₁e₂, e₃, e₁e₃, e₂e₃, e₁e₂e₃]) at rail value t, without moving the rail. */
    psiAt: (t) => at(t).psi.slice(),
    /** J, S, J², S² and ψψ̃ that the page's product gives for an arbitrary even multivector ψ (8 blade coefficients). */
    bilinears: (psi) => { const J = sandwich(psi, vec(E3)), Sm = sandwich(psi, E12); return { J: vecOf(J), Jm: J, S: Sm, J2: mul(J, J), S2: mul(Sm, Sm), rho: mul(psi, rev(psi)) }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Push a playing clock to just before t without stopping it (tests that wait for a card to stop by itself). */
    nudge: (t) => { if (clock.playing && clock.t < t) clock.set(t, true); },
    /** Viewport coordinates of a world point. */
    screen: (v) => { const q = stage.p(v), bx = $('cv').getBoundingClientRect(); return [bx.left + q[0], bx.top + q[1], q[2]]; },
    under: (x, y) => stage.pick({ clientX: x, clientY: y })
  };
  window.TRV_THUMB = () => { cards.pick('turn720'); stage.cam.yaw = -0.42; stage.cam.pitch = 0.3; stage.cam.zoom = 0.95; clock.pause(); clock.set(1.5 * TAU); paint.now(); };
  cards.pick(cards.initial('weave'));
  booting = false;
  paint();
})();
