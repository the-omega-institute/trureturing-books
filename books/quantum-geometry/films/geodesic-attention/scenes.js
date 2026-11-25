/* Film · The shortest arc, in even steps · 最短的弧，均匀的步
   (book quantum-geometry, part IX: chapter 37, §37.2). Scenes for theme/film/engine.js.

   A state is drawn as a real unit arrow; the distance of two states is the Fubini–Study angle
   d(u, v) = arccos |⟨u, v⟩|, which for arrows with a positive overlap is the ordinary angle between them.

   What each scene shows, and where it rests:
     globe   a long flight follows a great circle (an analogy; argued); u, w 60° apart: the chord midpoint (u + w)/2
             has length cos 30° = 0.866 < 1 (computed), so it is no unit state.
     angle   d(u, w) = arccos 0.5 = 60.0°; the stop-over v = cos β ẑ + sin β n̂ off the great circle: at β = 40°,
             d(u, v) + d(v, w) = 2 arccos(cos 40° cos 30°) = 96.9° (computed) ..... FubiniStudyRecordTime.fs_angle_triangle (LEAN).
     leash   two orthogonal records m₀ ⊥ m₁ are 90° apart; from an anchor a on the quarter circle the legs are φ and 90° − φ,
             the leash max(φ, 90° − φ) ≥ 45° (computed; the leash is an analogy, argued); if both legs are at most Eτ/ħ then
             τ ≥ πħ/(4E) ..... FubiniStudyRecordTime.record_time_lower_bound (LEAN).
     steps   a polarizer passes the squared overlap ..... RankOneBornPairingWeight.rank_one_born_pairing_weight (LEAN);
             four steps of 15°: 0.933, 0.871, 0.812, 0.758; idle three times then 60°: 0.250; eight steps of 7.5°: 0.872
             (computed); for a total turn under 90° even steps keep the most (§37.2.2, a hand derivation; argued);
             α here is half of §37.2's rotation angle Δθ, so 60° here is 120° there (computed).
     edge    reading even steps as good reasoning (§37.2, MODEL; argued); zero geometric cost does not make an answer right
             (§37.2, a hand derivation; argued); large-scale behaviour of the ternion-field transformer
             (prob-ch39-tft-scale-and-seams; open).

   On load, FILM.init checks DATA.lean against the three theorems and re-derives every number shown on screen by an
   independent route (complex inner products for the angles, explicit projections for the polarizers, a scan of anchors
   for the leash). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const GA_LEAN = {
  fs_angle_triangle: 'D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle',
  record_time_lower_bound: 'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
  rank_one_born_pairing_weight: 'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight'
};
const DEG = Math.PI / 180;
const GA_U = [-0.5, 0, Math.sqrt(3) / 2], GA_W = [0.5, 0, Math.sqrt(3) / 2];
const GA_Z = [0, 0, 1], GA_NRM = [0, -1, 0];
const GA_BETA = 40 * DEG;
/* the stop-over: off the great circle of u and w by the angle b, above the arc's midpoint */
const gaV = b => [0, -Math.sin(b), Math.cos(b)];
const gaDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/* the Fubini–Study angle of two unit arrows, arccos |⟨a, b⟩| */
const gaAng = (a, b) => Math.acos(Math.min(1, Math.abs(gaDot(a, b))));
const gaDeg = x => (x / DEG).toFixed(1) + '°';
/* polarizer rows: the axis after each filter (degrees) */
const GA_EVEN = [15, 30, 45, 60], GA_LEAP = [0, 0, 0, 60];
const gaPass = (axes, k) => { let I = 1, prev = 0; for (let i = 0; i < k; i++) { I *= Math.pow(Math.cos((axes[i] - prev) * DEG), 2); prev = axes[i]; } return I; };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('geodesic film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(GA_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(GA_LEAN).length}`);
  for (const [short, gid] of Object.entries(GA_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  check(typeof QG_SPHERE === 'object' && typeof QG_SPHERE.ball === 'function', 'QG_SPHERE (viz/two-angle-addressing/model.js) is missing');

  /* complex vectors as lists of [re, im]; the Fubini–Study angle from |⟨a, b⟩| */
  const cin = (a, b) => a.reduce((s, z, i) => [s[0] + z[0] * b[i][0] + z[1] * b[i][1], s[1] + z[0] * b[i][1] - z[1] * b[i][0]], [0, 0]);
  const cfs = (a, b) => { const z = cin(a, b); return Math.acos(Math.min(1, Math.hypot(z[0], z[1]))); };
  const cx = (v, ph = 0) => v.map(x => [x * Math.cos(ph), x * Math.sin(ph)]);

  /* 1. GLOBE: unit arrows 60° apart, the chord midpoint */
  check(near(Math.hypot(...GA_U), 1) && near(Math.hypot(...GA_W), 1), 'u, w are unit arrows');
  const mid = [0, 1, 2].map(i => (GA_U[i] + GA_W[i]) / 2);
  check(near(Math.hypot(...mid), Math.cos(30 * DEG)) && Math.hypot(...mid).toFixed(3) === '0.866', 'chord midpoint length 0.866');

  /* 2. ANGLE: 60.0° direct, 96.9° by the stop-over; phases change nothing */
  check(near(gaAng(GA_U, GA_W), 60 * DEG) && near(cfs(cx(GA_U, 0.7), cx(GA_W, -1.3)), 60 * DEG, 1e-9), 'd(u, w) = 60°, phase-blind');
  const v40 = gaV(GA_BETA), legs = gaAng(GA_U, v40) + gaAng(v40, GA_W);
  check(near(legs, 2 * Math.acos(Math.cos(GA_BETA) * Math.cos(30 * DEG))) && gaDeg(legs) === '96.9°', 'the detour 96.9°');
  check(near(gaAng(GA_U, gaV(0)) + gaAng(gaV(0), GA_W), 60 * DEG), 'a stop on the arc costs nothing extra');
  for (let k = 0; k < 400; k++) {
    /* the triangle inequality on random complex unit vectors of C^3 */
    const rv = j => { const v = [0, 1, 2].map(q => [2 * rnd(k, j + q) - 1, 2 * rnd(k, j + q + 7) - 1]); const n = Math.sqrt(v.reduce((s, z) => s + z[0] * z[0] + z[1] * z[1], 0)); return v.map(z => [z[0] / n, z[1] / n]); };
    const a = rv(10), b = rv(30), c = rv(50);
    check(cfs(a, c) <= cfs(a, b) + cfs(b, c) + 1e-12, `triangle inequality ${k}`);
  }
  for (let i = 0; i <= 40; i++) { const b = i * DEG; check(gaAng(GA_U, gaV(b)) + gaAng(gaV(b), GA_W) >= 60 * DEG - 1e-12, `detour ${i}`); }

  /* 3. LEASH: orthogonal records 90° apart; the leash max(φ, 90° − φ) ≥ 45°; the time bound */
  const m0 = [1, 0, 0], m1 = [0, 0, 1];
  check(near(gaAng(m0, m1), Math.PI / 2), 'orthogonal records are 90° apart');
  for (let i = 0; i <= 90; i++) {
    const a = [Math.cos(i * DEG), 0, Math.sin(i * DEG)], need = Math.max(gaAng(a, m0), gaAng(a, m1));
    check(need >= Math.PI / 4 - 1e-12 && near(need, Math.max(i, 90 - i) * DEG, 1e-9), `leash at ${i}°`);
  }
  check(near(Math.max(gaAng([Math.SQRT1_2, 0, Math.SQRT1_2], m0), gaAng([Math.SQRT1_2, 0, Math.SQRT1_2], m1)), Math.PI / 4), 'halfway: 45°');
  /* with E = ħ = 1 the smallest admissible τ: Eτ/ħ = π/4 */
  check(near(Math.PI / 4, Math.PI * 1 / (4 * 1)), 'τ ≥ πħ/(4E) at the halfway anchor');

  /* 4. STEPS: projections onto polarizer axes give the squared overlap */
  const proj = (axis, v) => { const p = [Math.cos(axis * DEG), Math.sin(axis * DEG)], d = p[0] * v[0] + p[1] * v[1]; return [d * p[0], d * p[1]]; };
  const chain = axes => { let v = [1, 0], I = 1; return axes.map(ax => { const pv = proj(ax, v), w = Math.hypot(pv[0], pv[1]); I *= w * w; v = [pv[0] / w, pv[1] / w]; return I; }); };
  const ev = chain(GA_EVEN), lp = chain(GA_LEAP), e8 = chain([7.5, 15, 22.5, 30, 37.5, 45, 52.5, 60]);
  ev.forEach((I, k) => check(near(I, gaPass(GA_EVEN, k + 1)) && near(I, Math.pow(Math.cos(15 * DEG), 2 * (k + 1))), `even step ${k}`));
  check(['0.933', '0.871', '0.812', '0.758'].every((s, k) => ev[k].toFixed(3) === s), 'even readouts');
  check(near(lp[3], 0.25) && lp.slice(0, 3).every(I => near(I, 1)) && gaPass(GA_LEAP, 4).toFixed(3) === '0.250', 'leap readouts');
  check(near(e8[7], Math.pow(Math.cos(7.5 * DEG), 16)) && e8[7].toFixed(3) === '0.872', 'eight steps 0.872');
  /* §37.2: leak sin²α is half the sagitta 1 − cos 2α; the four even leaks sum to half of 0.5359 */
  check(near(4 * Math.pow(Math.sin(15 * DEG), 2), (4 * (1 - Math.cos(30 * DEG))) / 2), 'leak = sagitta / 2');
  check((4 * (1 - Math.cos(30 * DEG))).toFixed(4) === '0.5359', 'the §37.2 sagitta 0.5359');
  /* even steps keep the most: random splits of 60° into four non-negative steps never beat 0.758 */
  for (let k = 0; k < 300; k++) {
    const w = [0, 1, 2, 3].map(q => rnd(k, 80 + q)), s = w.reduce((x, y) => x + y, 0), st = w.map(x => 60 * x / s);
    let acc = 0; const ax = st.map(x => (acc += x));
    check(gaPass(ax, 4) <= ev[3] + 1e-12, `uneven split ${k}`);
  }
});
Object.assign(FILM.speed, { globe: 0.02, angle: 0.014, leash: 0.016, steps: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const gaFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function gaRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const GA_MISSING = new Set();
function gaLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!GA_MISSING.has(gid)) { GA_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small tag saying what kind of claim a panel holds */
function gaTag(x, y, s, col, a) {
  if (a <= 0.003) return;
  const size = 17, wd = tw(s, size, F.zh, 700, 1) + 20;
  box(x, y - 22, wd, 30, col, a, 1.5, 'rgba(0,0,0,0.45)');
  txt(s, x + 10, y - 1, { size, fam: F.zh, w: 700, c: col, a, ls: 1 });
}
/* orthographic view: world (x, y, z), z up → [screen x, screen y, depth]; the solid shot uses the same camera */
function gaView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  Object.assign(V, { cx, cy, R, yaw, el });
  return V;
}
function gaShot(key, V, r) {
  return solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
}
/* the great-circle arc from p to q (unit arrows), the first fraction f of it */
function gaArc(p, q, f = 1) {
  const ax = QG_SPHERE.v3.unit(QG_SPHERE.v3.cross(p, q)), ang = Math.acos(Math.min(1, gaDot(p, q)));
  return QG_SPHERE.arcAbout(p, ax, ang * f, Math.PI / 90);
}
/* the opening title */
function gaTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE SHORTEST ARC, IN EVEN STEPS', p, 5), W / 2, 580, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('ARC · ANGLE · SPEED LIMIT · EVEN STEPS · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                      scenes 1–2 · THE GLOBE, THE DISTANCE                 */
/* ======================================================================= */
/* one camera for both sphere scenes, turning slowly with the film time */
const gaGlobeView = S => gaView(660, 520, 300, -0.42 + 0.012 * S.t, 0.34);
/* draw the glass sphere with u and w; o: arc (0–1 drawn), chord, flight (bead fraction), stop (β or null) */
function gaGlobe(S, V, a, o) {
  const sh = gaShot('globe', V, [300, 170, 720, 700]);
  sh.begin();
  QG_SPHERE.ball(sh, { glass: C.cyan, ink: C.blue, width: 1.4, alpha: 0.5, back: 0.35, shell: { alpha: 0.08, rim: 0.5 } });
  const O = [0, 0, 0];
  sh.arrow(O, GA_U, { color: C.white, width: 3, headSize: 16, alpha: 0.95 });
  sh.arrow(O, GA_W, { color: C.white, width: 3, headSize: 16, alpha: 0.95 });
  if (o.arc > 0.003) QG_SPHERE.seg(sh, gaArc(GA_U, GA_W, o.arc), { color: C.cyan, width: 6, alpha: o.arcA == null ? 1 : o.arcA, back: 0.4 });
  if (o.chord > 0.003) {
    sh.line([GA_U, GA_W], { color: C.mag, width: 3.5, dash: [10, 8], alpha: o.chord });
    const m = [0, 0, Math.sqrt(3) / 2];
    sh.arrow(O, m, { color: C.mag, width: 2.5, headSize: 12, alpha: o.chord });
    sh.bead(m, { color: C.mag, r: 7, alpha: o.chord });
  }
  if (o.flight != null) sh.bead(QG_SPHERE.v3.rot(GA_U, [0, 1, 0], 60 * DEG * o.flight), { color: C.now, r: 10, alpha: o.flightA == null ? 1 : o.flightA });
  if (o.stop != null) {
    const v = gaV(o.stop), sa = o.stopA == null ? 1 : o.stopA;
    sh.arrow(O, v, { color: C.now, width: 2.5, headSize: 13, alpha: sa * 0.9 });
    QG_SPHERE.seg(sh, gaArc(GA_U, v), { color: C.mag, width: 5, alpha: sa, back: 0.4 });
    QG_SPHERE.seg(sh, gaArc(v, GA_W), { color: C.mag, width: 5, alpha: sa, back: 0.4 });
    sh.bead(v, { color: C.now, r: 10, alpha: sa });
  }
  sh.bead(GA_U, { color: C.white, r: 8 });
  sh.bead(GA_W, { color: C.white, r: 8 });
  sh.end(a);
  return sh;
}
SCENES.globe = S => {
  const u = S.u;
  gaTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  const V = gaGlobeView(S);
  const arc = ease(Q(S, 0, 'shortest arc', 1.2)), fl = clamp((u - phraseAt(S, 0, 'long flight')) / 3.6);
  const ch = ease(at(S, 2, 0.8));
  const sh = gaGlobe(S, V, a, { arc: Math.max(arc, fl), chord: ch, flight: fl, flightA: 1 - at(S, 2, 0.6) });
  const pu = sh.anchor(GA_U), pw = sh.anchor(GA_W);
  txt('u', pu.x - 34, pu.y - 10, { size: 36, fam: F.math, w: 700, c: C.white, a });
  txt('w', pw.x + 16, pw.y - 10, { size: 36, fam: F.math, w: 700, c: C.white, a });
  /* line 0: the analogy */
  const fa = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (fa > 0.003) {
    panel(1130, 250, 660, 200, fa, C.argued, 'ANALOGY · 比方');
    txt('a long flight follows a great circle', 1155, 330, { size: 26, fam: F.mono, w: 700, c: C.white, a: fa });
    txt('长途航线走大圆：地球上最短的弧', 1155, 380, { size: 28, fam: F.zh, w: 700, c: C.white, a: fa });
    txt('flat map: bent · globe: shortest', 1155, 425, { size: 20, fam: F.mono, w: 700, c: C.argued, a: fa * 0.9 });
  }
  /* line 1: a state is a unit arrow */
  const sa = a * at(S, 1, 0.6);
  if (sa > 0.003) {
    panel(1130, 250, 660, 190, sa, C.cyan, 'STATE · 态');
    gaRich([['state = arrow, ', C.white], ['‖u‖ = 1', C.cyan]], 1155, 325, { size: 30, a: sa });
    txt('长度为一的箭头，住在球面上', 1155, 378, { size: 28, fam: F.zh, w: 700, c: C.white, a: sa });
    txt('arrows, not the Bloch sphere · 是箭头，不是布洛赫球', 1155, 420, { size: 21, fam: F.zh, w: 700, c: C.cyan, a: sa * 0.9 });
  }
  /* lines 2–3: the straight line and its midpoint */
  const ca = a * at(S, 2, 0.6);
  if (ca > 0.003) {
    panel(1130, 470, 660, 300, ca, C.mag, 'THE STRAIGHT LINE · 直线');
    txt('straight? · 走直线？', 1155, 540, { size: 30, fam: F.zh, w: 700, c: C.mag, a: ca });
    const ma = ca * Q(S, 3, 'Halfway', 0.6);
    gaRich([['‖(u + w)/2‖ = cos 30° = ', C.white], ['0.866', C.mag]], 1155, 605, { size: 30, a: ma });
    gaRich([['0.866 < 1', C.mag]], 1155, 660, { size: 30, a: ma * Q(S, 3, 'only zero', 0.5) });
    txt('not a state · 不是一个态', 1155, 720, { size: 28, fam: F.zh, w: 700, c: C.mag, a: ca * Q(S, 3, 'no state', 0.5) });
    const pm = sh.anchor([0, 0, Math.sqrt(3) / 2]);
    txt('0.866', pm.x + 16, pm.y + 34, { size: 26, fam: F.mono, w: 700, c: C.mag, a: ma });
  }
  if (Q(S, 0, 'shortest arc', 1) > 0) {
    const mid = sh.anchor(QG_SPHERE.v3.unit([0, 0, 1]));
    txt('arc · 弧', mid.x - 40, mid.y - 34, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 0, 'shortest arc', 0.6) * (1 - ch) });
  }
};
SCENES.angle = S => {
  const u = S.u, a = gaFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'lean']]);
  const V = gaGlobeView(S);
  /* line 1: the stop-over appears on the arc and slides off it to β = 40° */
  const st = Q(S, 1, 'Detour', 0.5), b = GA_BETA * ease(Q(S, 1, 'Detour', 2.6, 0.3));
  const sh = gaGlobe(S, V, a, { arc: 1, chord: 0, stop: st > 0.003 ? b : null, stopA: st });
  const pu = sh.anchor(GA_U), pw = sh.anchor(GA_W);
  txt('u', pu.x - 34, pu.y - 10, { size: 36, fam: F.math, w: 700, c: C.white, a });
  txt('w', pw.x + 16, pw.y - 10, { size: 36, fam: F.math, w: 700, c: C.white, a });
  if (st > 0.003) { const pv = sh.anchor(gaV(b)); txt('v', pv.x - 44, pv.y + 30, { size: 36, fam: F.math, w: 700, c: C.now, a: a * st }); }
  /* line 0: the distance is the angle */
  panel(1130, 200, 660, 190, a, C.cyan, 'DISTANCE · 距离');
  gaRich([['d(u, w) = arccos |⟨u, w⟩|', C.white]], 1155, 275, { size: 30, a: a * at(S, 0, 0.6) });
  gaRich([['= arccos 0.5 = ', C.white], ['60.0°', C.cyan]], 1155, 335, { size: 30, a: a * at(S, 0, 0.6, 1.2) });
  /* line 1: the detour readout */
  if (st > 0.003) {
    const legs = gaAng(GA_U, gaV(b)) + gaAng(gaV(b), GA_W);
    panel(1130, 415, 660, 170, a * st, C.mag, 'DETOUR · 绕路');
    gaRich([['d(u, v) + d(v, w) = ', C.white], [gaDeg(legs), C.mag]], 1155, 490, { size: 30, a: a * st });
    txt(`β = ${(b / DEG).toFixed(0)}° off the arc · 偏离弧 ${(b / DEG).toFixed(0)}°`, 1155, 545, { size: 22, fam: F.zh, w: 700, c: C.now, a: a * st });
  }
  /* line 2: Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1130, 610, 660, 190, la, C.lean, 'ANY THREE UNIT STATES · 任意三个单位态');
    gaRich([['d(u, w) ', C.white], ['≤', C.lean], [' d(u, v) + d(v, w)', C.white]], 1155, 690, { size: 32, a: la });
    gaLean(1155, 752, GA_LEAN.fs_angle_triangle, la, { size: 20 });
    stamp('NO SHORTCUT', 560, 850, Q(S, 2, 'never makes', 0.5) * (1 - at(S, 3, 0.5)), C.lean, 24, -0.06);
  }
  /* line 3: the aphorism */
  const ap = a * at(S, 3, 0.7);
  if (ap > 0.003) {
    txt('not a line — an arc', 660, 872, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: ap, ls: 3 });
  }
};

/* ======================================================================= */
/*                              scene 3 · SPEED LIMIT                        */
/* ======================================================================= */
const LS = { cx: 360, cy: 730, R: 450 };
const lsP = (deg, r = LS.R) => [LS.cx + r * Math.cos(deg * DEG), LS.cy - r * Math.sin(deg * DEG)];
function lsArc(d0, d1, r, col, a, w) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(LS.cx, LS.cy, r, -d1 * DEG, -d0 * DEG); ctx.stroke(); ctx.restore();
}
SCENES.leash = S => {
  const u = S.u, a = gaFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [1, 'Tie a leash', 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* the quarter circle of real unit arrows between the two records */
  lsArc(-6, 96, LS.R, C.white, a * 0.3, 2);
  const ra = a * at(S, 1, 0.6);
  lsArc(0, 90, LS.R, C.cyan, ra, 4);
  const O = [LS.cx, LS.cy], p0 = lsP(0), p1 = lsP(90);
  line(O[0], O[1], p0[0], p0[1], C.white, a * (0.35 + 0.6 * ra), 3);
  line(O[0], O[1], p1[0], p1[1], C.white, a * (0.35 + 0.6 * ra), 3);
  dot(p0[0], p0[1], 13, 'w', a);
  dot(p1[0], p1[1], 13, 'w', a);
  txt('m₀', p0[0], p0[1] + 58, { size: 34, fam: F.math, w: 700, c: C.white, a });
  txt('m₁', p1[0] - 70, p1[1] + 12, { size: 34, fam: F.math, w: 700, c: C.white, a });
  txt('⟨m₀, m₁⟩ = 0 · 90°', LS.cx + 20, LS.cy + 50, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ra });
  /* the anchor: at 25° during line 1, then it slides to 45° on line 2 */
  const phi = 25 + 20 * ease(Q(S, 2, 'best anchor', 1.8));
  const an = a * Q(S, 1, 'any anchor', 0.6);
  if (an > 0.003) {
    const pa = lsP(phi), need = Math.max(phi, 90 - phi);
    /* the leash: the reach round the anchor, just outside the circle */
    lsArc(Math.max(phi - need, -2), Math.min(phi + need, 92), LS.R + 22, C.now, an * 0.85, 8);
    line(O[0], O[1], pa[0], pa[1], C.now, an * 0.8, 2.5);
    dot(pa[0], pa[1], 14, 'g', an);
    const lp = lsP(phi, LS.R + 60);
    txt('a', lp[0] + 6, lp[1] + 6, { size: 34, fam: F.math, w: 700, c: C.now, a: an });
    /* the two legs */
    const l0 = lsP(phi / 2, LS.R - 70), l1 = lsP(phi + (90 - phi) / 2, LS.R - 70);
    txt(`${phi.toFixed(0)}°`, l0[0], l0[1], { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: an });
    txt(`${(90 - phi).toFixed(0)}°`, l1[0], l1[1], { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: an });
  }
  /* line 0: the speed limit, an assumption of the theorem */
  panel(1060, 200, 740, 165, a, C.cyan, 'SPEED LIMIT · 限速（前提）');
  gaRich([['in time τ:  d(a, m) ≤ Eτ/ħ', C.white]], 1085, 275, { size: 32, a: a * at(S, 0, 0.6) });
  txt('时间 τ 内最多转过 Eτ/ħ', 1085, 330, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6, 0.8) });
  /* lines 1–2: the leash readout */
  if (an > 0.003) {
    const need = Math.max(phi, 90 - phi);
    panel(1060, 390, 740, 180, an, C.now, 'THE LEASH · 绳长（比方 · ANALOGY）');
    txt(`legs ${phi.toFixed(0)}° + ${(90 - phi).toFixed(0)}° = 90°`, 1085, 460, { size: 28, fam: F.mono, w: 700, c: C.white, a: an });
    gaRich([['leash ≥ ', C.white], [`${need.toFixed(0)}°`, C.now], ['   (best: 45°)', C.dim]], 1085, 520, { size: 30, a: an });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1060, 595, 740, 215, la, C.lean, 'THE CONSEQUENCE · 推论');
    gaRich([['π/2 ', C.white], ['≤', C.white], [' d(m₀, a) + d(a, m₁) ', C.white], ['≤', C.white], [' 2Eτ/ħ', C.white]], 1085, 665, { size: 28, a: la });
    gaRich([['τ ', C.white], ['≥', C.lean], [' πħ / (4E)', C.white]], 1085, 728, { size: 40, a: la * Q(S, 3, 'at least', 0.5) });
    gaLean(1085, 785, GA_LEAN.record_time_lower_bound, la, { size: 19 });
    stamp('SPEED LIMIT', 1600, 700, Q(S, 3, 'at least', 0.5), C.lean, 22, -0.06);
  }
};

/* ======================================================================= */
/*                              scene 4 · EVEN STEPS                         */
/* ======================================================================= */
const SP_X0 = 170, SP_X1 = 1290, SP_XS = [400, 620, 840, 1060], SP_R = 62;
/* one polarizer seen face on: a ring and its axis (degrees from vertical) */
function spFilter(x, y, deg, col, a, hi = 0) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a * 0.16; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, SP_R, 0, TAU); ctx.fill(); ctx.restore();
  ring(x, y, SP_R, col, a * (0.7 + 0.3 * hi), 3);
  const t = (deg - 90) * DEG, dx = Math.cos(t) * SP_R * 0.86, dy = Math.sin(t) * SP_R * 0.86;
  line(x - dx, y - dy, x + dx, y + dy, col, a, 4);
  txt(`${deg}°`, x, y + SP_R + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a });
}
/* a beam row: intensity after each filter; f is how far the light has gone (0..4 filters) */
function spRow(y, axes, f, a, label, labCol) {
  if (a <= 0.003) return;
  txt(label, SP_X0, y - SP_R - 26, { size: 24, fam: F.zh, w: 700, c: labCol, a });
  const xs = [SP_X0, ...SP_XS, SP_X1];
  for (let k = 0; k <= 4; k++) {
    if (f < k) break;
    const I = gaPass(axes, k), seg = clamp(f - k), x0 = xs[k] + (k === 0 ? 0 : SP_R), x1 = lerp(x0, xs[k + 1] - (k === 3 ? SP_R : 0), k === 4 ? seg : clamp(seg * 1.3));
    const h = 54 * I;
    fillBox(x0, y - h / 2, Math.max(0, x1 - x0), h, C.cyan, a * 0.5);
    line(x0, y - h / 2, x1, y - h / 2, C.cyan, a * 0.9, 1.5);
    line(x0, y + h / 2, x1, y + h / 2, C.cyan, a * 0.9, 1.5);
    if (k >= 1) {
      /* what this filter took away leaves sideways, in magenta */
      const L = gaPass(axes, k - 1) - I;
      if (L > 1e-9) { const lh = 54 * L; fillBox(xs[k] - 8, y + SP_R + 44, 16, lh * 1.4 * clamp(seg * 2), C.mag, a * 0.75); }
      txt(I.toFixed(3), k === 4 ? x0 + 120 : (x0 + xs[k + 1] - SP_R) / 2, y - 44, { size: 24, fam: F.mono, w: 700, align: 'center', c: k === 4 ? C.now : C.cyan, a: a * clamp(seg * 3) });
    }
  }
  axes.forEach((d, i) => spFilter(SP_XS[i], y, d, C.white, a, f >= i + 1 && f < i + 2 ? 1 : 0));
}
SCENES.steps = S => {
  const u = S.u, a = gaFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed'], [4, 'even steps always win', 'argued'], [4, 'Twice as many', 'computed']]);
  /* row A: four even steps; row B: idle three times, then leap */
  const ra = a * at(S, 0, 0.6), fa = 4.5 * clamp((u - phraseAt(S, 2, 'four even steps')) / 3.0);
  const rb = a * at(S, 3, 0.6), fb = 4.5 * clamp((u - lineAt(S, 3).s - 0.2) / 3.0);
  spRow(320, GA_EVEN, Math.max(fa, at(S, 0, 1.0) * 0.6), ra, 'EVEN · 匀速：15° × 4', C.cyan);
  spRow(610, GA_LEAP, rb > 0.003 ? fb : 0, rb, 'LEAP · 跳步：0° 0° 0° 60°', C.mag);
  /* line 1: the Born weight at a filter */
  const ba = a * at(S, 1, 0.6);
  panel(1340, 180, 460, 275, ba, C.cyan, 'ONE FILTER · 一片');
  gaRich([['pass = cos²α', C.cyan]], 1362, 245, { size: 32, a: ba });
  gaRich([['= |⟨φ, ψ⟩|²', C.white]], 1362, 292, { size: 32, a: ba });
  txt('α: neighbouring filters · 相邻两片的夹角', 1362, 332, { size: 19, fam: F.zh, w: 700, c: C.white, a: ba * 0.9 });
  txt('重叠的平方 = 玻恩权重', 1362, 376, { size: 24, fam: F.zh, w: 700, c: C.white, a: ba });
  gaLean(1362, 428, GA_LEAN.rank_one_born_pairing_weight, ba * Q(S, 1, 'Lean checks', 0.6), { size: 19 });
  /* lines 2–3: the totals */
  const ea = a * Q(S, 2, 'gets through', 0.6), la = a * Q(S, 3, 'only a quarter', 0.6);
  panel(1340, 475, 460, 150, Math.max(ea, la), C.now, 'GETS THROUGH · 通过');
  gaRich([['even  ', C.cyan], ['0.758', C.now]], 1362, 540, { size: 32, a: ea });
  gaRich([['leap  ', C.mag], ['0.250', C.now]], 1362, 595, { size: 32, a: la });
  if (Q(S, 3, 'not bold', 1) > 0) stamp('A LEAP IS EXPENSIVE', 760, 470, Q(S, 3, 'not bold', 0.5) * (1 - at(S, 4, 0.5)), C.mag, 26, -0.05);
  /* line 4: even steps win (argued), eight half steps (computed), the link to §37.2's sagitta */
  const wa = a * at(S, 4, 0.6), ha = a * Q(S, 4, 'Twice as many', 0.6);
  if (wa > 0.003) {
    panel(1340, 645, 460, 190, wa, C.argued, 'SAME N, TOTAL < 90° · 片数相同');
    txt('even steps keep the most', 1362, 705, { size: 22, fam: F.mono, w: 700, c: C.white, a: wa });
    txt('均匀最省 · 手工推导 §37.2.2', 1362, 745, { size: 22, fam: F.zh, w: 700, c: C.argued, a: wa });
    gaRich([['8 × 7.5° → ', C.cyan], ['0.872', C.now]], 1362, 795, { size: 26, a: ha });
    txt('α here = Δθ/2 of §37.2: 60° here is 120° there · 此处 α 是正文 Δθ 之半', SP_X0, 830, { size: 24, fam: F.zh, w: 700, c: C.white, a: wa * 0.85 });
  }
};

/* ======================================================================= */
/*                         scene 5 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = gaFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'open']]);
  const rows = [
    { k: 0, col: C.argued, en: 'even steps = good reasoning ?', zh: '均匀的步 = 好推理？', note: 'a model reading (MODEL), not a theorem · 模型读法，不是定理' },
    { k: 1, col: C.argued, en: 'even steps ≠ a right answer', zh: '步子再均匀，也不等于答案正确', note: 'smooth drive, wrong town: correctness needs an outside check · 正确性要靠外部检验' },
    { k: 2, col: C.open, en: 'ternion-field networks at scale', zh: '三元数场网络的大规模表现', note: 'open problem · 开放问题（prob-ch39-tft-scale-and-seams）' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(330, y, 1260, 180, ra, rw.col);
    txt(rw.en, 360, y + 58, { size: 32, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 360, y + 106, { size: 30, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 360, y + 150, { size: 22, fam: F.zh, w: 700, c: rw.col, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.end - 1.0;
  background(t, sc, 1, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the sphere, the arc u–w, the detour through v and the sinking chord, drawn flat */
  const V = gaView(560, 600, 330, 0.12, 0.42);
  ring(V.cx, V.cy, V.R, C.white, 0.45, 2);
  const path = (pts, col, a, w) => { for (let i = 1; i < pts.length; i++) { const p = V(pts[i - 1]), q = V(pts[i]); line(p[0], p[1], q[0], q[1], col, a, w); } };
  path(QG_SPHERE.circlePts([0, 0, 0], [0, 0, 1], 1), C.blue, 0.35, 1.4);
  path(QG_SPHERE.circlePts([0, 0, 0], [0, 1, 0], 1), C.blue, 0.35, 1.4);
  const v = gaV(GA_BETA), o = V([0, 0, 0]);
  path(gaArc(GA_U, v), C.mag, 0.95, 5);
  path(gaArc(v, GA_W), C.mag, 0.95, 5);
  path(gaArc(GA_U, GA_W), C.cyan, 1, 7);
  for (const p of [GA_U, GA_W]) { const q = V(p); line(o[0], o[1], q[0], q[1], C.white, 0.9, 3); dot(q[0], q[1], 12, 'w', 1); }
  const pv = V(v); dot(pv[0], pv[1], 13, 'g', 1);
  txt(DATA.film.title_zh, 1340, 430, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE SHORTEST ARC,', 1340, 528, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 4 });
  txt('IN EVEN STEPS', 1340, 588, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  gaRich([['d(u, w) ', C.white], ['≤', C.lean], [' d(u, v) + d(v, w)', C.white]], 1340, 690, { size: 38, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
