/* Film 011 · Understand the Shadow: From a Disc to a Line · 先看懂影子：从圆盘到一条线
   (book quantum-geometry, the prelude, §0.2 “以面为线”). Scenes for theme/film/engine.js.

   One classical example carries the whole film: a disc of radius 1 turning steadily on a table, a peg at its rim
   at angle θ (degrees on screen; the code keeps the variable name `phi`). Velocities are normalized by the peg's
   constant speed: the narration says “in units of the peg's speed”, the readout prints v/v_peg, and the arrows
   share one scale (the peg's arrow is PD.vs px long), so nothing on screen is to be read against the film's
   seconds. The EDGE VIEW is modelled as a straight (orthogonal) projection onto the left-right axis: a point
   (cos θ, sin θ) of the disc goes to x = cos θ and its depth sin θ is dropped. This is a model of looking
   edge-on, not a claim about real light.

   What each scene shows, and on what footing:
     DISC  the top view: a whole flat disc and one peg turning counterclockwise ............. picture, no claim
     EDGE  the same disc above its edge view: the disc's shadow is the fixed segment [−1, 1], the peg's shadow the
           point x = cos θ; the dashed drop keeps the left-right coordinate ................ computed here (NUM)
     LAP   one slow lap: the peg's normalized velocity (−sin θ, cos θ) has length 1, the shadow's normalized
           velocity is its left-right part −sin θ (zero at x = ±1); equal time steps of 15° land on unequal ticks
           cos(15° k) ...................................................................... computed here (NUM)
     SAME  θ = 90° and θ = 270° share the shadow x = 0 with opposite velocities ∓1; after the same step of 15° the
           shadows sit at cos 105° ≈ −0.26 and cos 285° ≈ +0.26 ................................. computed here (NUM)
     LIFT  raising the eye from edge-on (elevation 0) to straight down (90°) scales the depth by sin(elevation):
           the segment opens into the disc and y = sin θ returns (+1 at 90°, −1 at 270°) ...... computed here (NUM);
           “no extra spring acts on the shadow: the steady turn, seen whole, explains every stop and reversal”
           and “an illustration of lost information, not a derivation of quantum mechanics” are argued, badged
           ARGUED
     NEXT  the disc gives way to a wireframe sketch of a sphere, with the two questions “seen” and “left out”;
           nothing is drawn leaving the sphere, and no new dimension is introduced ........... sketch, no claim
   The film cites no Lean declaration (film.json "lean" is empty) and shows no LEAN ✓ mark. On load, FILM.init
   recomputes every number printed on screen and checks the projections drawn; any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. Every frame is a pure function of the scene time. */
'use strict';

const PD_DEG = Math.PI / 180;
const PD = {
  cx: 960,
  top1: { cy: 505, R: 280 },   // DISC: the top view alone
  top2: { cy: 412, R: 225 },   // EDGE, LAP, SAME: the top view above the edge view
  lift: { cy: 460, R: 245 },   // LIFT, NEXT: the disc opened back up
  ey: 748,                     // the edge-view line
  vs: 150,                     // px per peg speed: velocities are in units of the peg's speed, its arrow is 150 px
  omega: TAU / 14,             // DISC and EDGE: one turn every 14 s of film time
  phi0: 25 * PD_DEG,
  delta: 15 * PD_DEG,          // SAME: the common small step
  ticks: 24                    // LAP: equal time steps of 15°
};
const PD_LABEL = mix(C.dim, C.white, 0.45);
/* labels with θ, ≠, arrows: the self-hosted Noto Sans SC draws the same θ as the subtitles on every machine */
const PD_MATH = F.zh;

/* ---------- numbers shown on screen ---------- */
/* a signed value to two decimals with a true minus sign; ±0.00 prints as 0.00 */
function pdFmt(v) {
  const s = Math.abs(v).toFixed(2);
  if (s === '0.00') return '0.00';
  return (v < 0 ? '−' : '+') + s;
}
/* an angle in degrees, rounded to a whole degree */
const pdDeg = phi => `${Math.round(phi / PD_DEG)}°`;
/* DISC and EDGE: the peg's angle as a function of film time (one continuous motion across both scenes) */
const pdRun = t => PD.phi0 + PD.omega * t;

/* ---------- geometry: a disc of radius R seen with vertical scale sy (1 from above, 0 edge-on) ---------- */
function pdAt(o, th, r = 1) {
  const sy = o.sy == null ? 1 : o.sy;
  return [o.cx + o.R * r * Math.cos(th), o.cy - o.R * r * Math.sin(th) * sy];
}

/* ---------- drawing helpers (shared engine primitives plus a few paths) ---------- */
function pdDisc(o) {
  const a = o.a == null ? 1 : o.a;
  if (a <= 0.003) return;
  const sy = o.sy == null ? 1 : o.sy, R = o.R, cx = o.cx, cy = o.cy;
  ctx.save();
  if (o.table > 0 && sy > 0.003) {           // the table top under the disc
    const m = 40;
    ctx.globalAlpha = a * o.table;
    ctx.fillStyle = rgba(C.blue, 0.08);
    ctx.fillRect(cx - R - m, cy - (R + m) * sy, 2 * (R + m), 2 * (R + m) * sy);
    ctx.strokeStyle = rgba(C.dim, 0.7); ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - R - m, cy - (R + m) * sy, 2 * (R + m), 2 * (R + m) * sy);
  }
  if (sy > 0.003) {
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R * sy, 0, 0, TAU);
    ctx.fillStyle = rgba(C.mag, 0.07 + 0.14 * (o.face || 0)); ctx.fill();
    /* twelve spokes and an inner ring turn with the disc, so the turning is visible */
    ctx.strokeStyle = rgba(C.white, 0.17); ctx.lineWidth = 1.5; ctx.beginPath();
    for (let k = 0; k < 12; k++) {
      const th = (o.rot || 0) + k * TAU / 12, p = pdAt(o, th, 0.09), q = pdAt(o, th, 1);
      ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]);
    }
    ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.55, R * 0.55 * sy, 0, 0, TAU); ctx.stroke();
    ctx.strokeStyle = rgba(C.white, 0.62); ctx.lineWidth = 2.6;
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R * sy, 0, 0, TAU); ctx.stroke();
    ctx.fillStyle = rgba(C.white, 0.35); ctx.beginPath(); ctx.ellipse(cx, cy, 6, 6 * sy, 0, 0, TAU); ctx.fill();
  }
  ctx.restore();
}
/* the edge view: the table seen edge-on (dim) and the disc's shadow, the segment [−1, 1] (cyan) */
function pdEdge(cx, y, R, a, o = {}) {
  if (a <= 0.003) return;
  line(cx - R - 50, y + 9, cx + R + 50, y + 9, C.dim, a * 0.6, 2);
  if (o.glow > 0) line(cx - R, y, cx + R, y, C.cyan, a * 0.28 * o.glow, 18);
  line(cx - R, y, cx + R, y, C.cyan, a, 6);
  line(cx - R, y - 10, cx - R, y + 10, C.cyan, a, 2.5);
  line(cx + R, y - 10, cx + R, y + 10, C.cyan, a, 2.5);
  if (o.ticks > 0) {
    [['−1', -1], ['0', 0], ['+1', 1]].forEach(([s, v]) =>
      txt(s, cx + v * R, y + 44, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * o.ticks }));
  }
}
/* a point: soft glow, solid fill, white core */
function pdDot(x, y, r, col, a) {
  if (a <= 0.003) return;
  ctx.save();
  ctx.globalAlpha = a * 0.22; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
  ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.36, 0, TAU); ctx.fill();
  ctx.restore();
}
/* an arrow whose head scales with its length: a vanishing vector draws (almost) nothing */
function pdVec(x1, y1, x2, y2, col, a, w = 4) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (a <= 0.003 || L < 1) return;
  const h = Math.min(18, L * 0.5), ux = dx / L, uy = dy / L, bx = x2 - ux * h, by = y2 - uy * h;
  line(x1, y1, bx, by, col, a, w);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x2, y2); ctx.lineTo(bx - uy * h * 0.55, by + ux * h * 0.55); ctx.lineTo(bx + uy * h * 0.55, by - ux * h * 0.55);
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function pdDash(x1, y1, x2, y2, col, a, w = 1.8) {
  if (a <= 0.003) return;
  ctx.save(); ctx.setLineDash([8, 8]); line(x1, y1, x2, y2, col, a, w); ctx.restore();
}
/* a circular arc for math angles a0 → a1 (counterclockwise on screen, y up) */
function pdArc(cx, cy, r, a0, a1, col, a, w = 3) {
  if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w;
  ctx.beginPath(); ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
function pdTag(s, x, y, col, a, align = 'left', size = 20, fam = F.mono) {
  txt(s, x, y, { size, fam, w: 700, c: col, a, align, ls: fam === F.mono ? 2 : 0 });
}
/* a small eye: the viewer of the edge view */
function pdEye(x, y, s, col, a) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(x - s, y); ctx.quadraticCurveTo(x, y - s * 0.8, x + s, y); ctx.quadraticCurveTo(x, y + s * 0.8, x - s, y); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, s * 0.3, 0, TAU); ctx.fill(); ctx.restore();
}
/* a rise-and-fall pulse from a progress p (0 → 1) and a later fall q (0 → 1) */
const pdBump = (p, q) => clamp(p) * (1 - clamp(q));
/* the view labels at the left of each view */
function pdViewLabels(o, a, ea, note) {
  const x = o.cx - o.R - 90;
  pdTag('TOP VIEW', x, o.cy - o.R + 30, PD_LABEL, a, 'right');
  if (ea > 0) {
    pdTag('EDGE VIEW', x, PD.ey + 8, PD_LABEL, ea, 'right');
    pdEye(x - tw('EDGE VIEW', 20, F.mono, 700, 2) - 34, PD.ey + 1, 16, PD_LABEL, ea);
    pdTag('straight projection · a model', x, PD.ey + 38, C.dim, ea * (note || 0), 'right', 15);
  }
}

/* ======================================================================= */
/*  DISC · TOP VIEW: a disc on a table, a peg at the rim, turning steadily   */
/* ======================================================================= */
SCENES.disc = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* title card during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.5) / 0.7));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 390, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 510, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 3 });
    const en = DATA.film.title.toUpperCase(), es = Math.min(40, 40 * 1500 / Math.max(1, tw(en, 40, F.orb, 900, 4)));
    txt(scramble(en, p, 11), W / 2, 596, { size: es, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  }
  const da = clamp((u - L0.s + 0.1) / 1.0) * clamp((S.d - u) / 0.5);
  if (da <= 0) return;
  const phi = pdRun(S.t), R = PD.top1.R * (0.94 + 0.06 * eo(da));
  const surf = pdBump(Q(S, 1, 'a whole flat surface', 0.6), Q(S, 1, 'the peg is one point', 0.8, 0.6));
  const o = { cx: PD.cx, cy: PD.top1.cy, R, sy: 1, rot: phi, a: da, table: 1, face: surf };
  pdDisc(o);
  pdTag('TOP VIEW', o.cx - R - 90, o.cy - R + 30, PD_LABEL, Q(S, 0, 'seen from above', 0.6) * da, 'right');
  /* the turning direction: two arcs just outside the rim */
  const qa = Q(S, 1, 'counterclockwise', 0.7) * (1 - Q(S, 1, 'the peg is one point', 0.8)) * da;
  if (qa > 0) {
    for (const a0 of [20 * PD_DEG, 200 * PD_DEG]) {
      const a1 = a0 + 55 * PD_DEG, r = R + 34;
      pdArc(o.cx, o.cy, r, a0, a1 - 6 * PD_DEG, C.white, 0.6 * qa, 3);
      const e = [o.cx + r * Math.cos(a1), o.cy - r * Math.sin(a1)], b = [o.cx + r * Math.cos(a1 - 8 * PD_DEG), o.cy - r * Math.sin(a1 - 8 * PD_DEG)];
      pdVec(b[0], b[1], e[0], e[1], C.white, 0.6 * qa, 3);
    }
  }
  pdTag('a surface', o.cx, o.cy + R * 0.32, C.mag, surf * da, 'center', 24);
  /* the peg */
  const pa = Q(S, 0, 'a small peg', 0.5) * da;
  const [px, py] = pdAt(o, phi);
  pdDot(px, py, 14, C.now, pa);
  const pop = Q(S, 0, 'a small peg', 0.8);
  ring(px, py, 16 + 34 * pop, C.now, (1 - pop) * pa * 0.9, 2.5);
  const qp = Q(S, 1, 'one point on its edge', 0.5);
  if (qp > 0) {
    ring(px, py, 26, C.now, qp * da, 2);
    const c = Math.cos(phi), s = Math.sin(phi);
    pdTag('a point', px + 52 * c, py - 52 * s + 8, C.now, qp * da, c >= 0 ? 'left' : 'right', 22);
  }
};

/* ======================================================================= */
/*  EDGE · the same disc seen edge-on: a segment, and the peg a point        */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, fade = clamp((S.d - u) / 0.5);
  const k = ease(at(S, 0, 1.8, 0.1));
  const cy = lerp(PD.top1.cy, PD.top2.cy, k), R = lerp(PD.top1.R, PD.top2.R, k);
  const phi = pdRun(S.t);
  const o = { cx: PD.cx, cy, R, sy: 1, rot: phi, a: fade, table: 1 - k };
  badge(Q(S, 1, 'straight projection', 0.5) * fade, 'computed');
  pdDisc(o);
  const ea = Q(S, 0, 'look at the same disc', 0.9) * fade;
  const qProj = Q(S, 1, 'straight projection', 0.6);
  pdViewLabels(o, fade, ea, qProj);
  /* every rim point falls straight down onto the segment */
  const rain = 0.4 * qProj * (1 - Q(S, 1, 'loses its depth', 0.8, 1.0)) * fade;
  if (rain > 0) {
    for (let j = 0; j < 16; j++) {
      const [x, y] = pdAt(o, phi + j * TAU / 16);
      pdDash(x, y, x, PD.ey, C.white, rain, 1.2);
      line(x, PD.ey - 12, x, PD.ey + 12, C.cyan, rain * 2, 2);
    }
  }
  const glow = pdBump(Q(S, 2, 'shadow of the disc', 0.5), Q(S, 2, 'shadow of the peg', 0.8, 0.4));
  pdEdge(PD.cx, PD.ey, R, ea, { ticks: 1, glow });
  /* the peg, its drop and its shadow */
  const [px, py] = pdAt(o, phi);
  pdDash(px, py, px, PD.ey, C.white, 0.6 * qProj * fade, 1.8);
  const qx = Q(S, 1, 'left-right position', 0.5) * (1 - Q(S, 2, 'shadow of the disc', 0.5)) * fade;
  pdTag('same x', px + 14, PD.ey - 34, C.cyan, qx, 'left', 20);
  pdDot(px, PD.ey, 11, C.now, ea);
  pdDot(px, py, 14, C.now, fade);
  /* depth: the up-down direction of the top view, dropped by the projection */
  const qd = Q(S, 1, 'loses its depth', 0.5) * fade, s = Q(S, 1, 'loses its depth', 1.4, 0.6);
  if (qd > 0) {
    const x = PD.cx + R + 46, yc = lerp(cy, PD.ey, ease(s)), h = R * (1 - ease(s));
    const a = qd * (1 - Q(S, 2, 'So the shadow', 0.6));
    if (h > 2) { pdVec(x, yc, x, yc - h, C.mag, a, 3.5); pdVec(x, yc, x, yc + h, C.mag, a, 3.5); }
    else pdDot(x, yc, 6, C.mag, a);
    pdTag('depth', x + 16, yc + 8, C.mag, a * (1 - s), 'left', 22);
  }
  /* the two shadows */
  pdTag('disc → segment', PD.cx + R + 70, PD.ey + 8, C.cyan, Q(S, 2, 'shadow of the disc', 0.6) * fade, 'left', 22);
  const qs = Q(S, 2, 'shadow of the peg', 0.6) * fade;
  if (qs > 0) {
    const pulse = Q(S, 2, 'shadow of the peg', 0.9);
    ring(px, PD.ey, 14 + 26 * pulse, C.now, (1 - pulse) * qs, 2.5);
    ring(px, PD.ey, 22, C.now, qs * 0.8, 2);
    const right = px < PD.cx;
    pdTag('peg → point', px + (right ? 18 : -18), PD.ey - 30, C.now, qs, right ? 'left' : 'right', 22);
  }
};

/* ======================================================================= */
/*  LAP · one slow lap: steady peg, a shadow that races, stops and turns    */
/* ======================================================================= */
SCENES.lap = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  const t0 = lineAt(S, 0).s + 0.3, t1 = lineAt(S, 3).e - 0.3;
  const phi = TAU * clamp((u - t0) / (t1 - t0));
  const o = { cx: PD.cx, cy: PD.top2.cy, R: PD.top2.R, sy: 1, rot: phi, a: fade, table: 0 };
  const R = o.R, ey = PD.ey;
  badgeQ(S, [[0, null, 'computed']]);
  pdDisc(o);
  pdViewLabels(o, fade, fade, 1);
  /* equal time steps: 24 rim points 15° apart, and where they land on the segment */
  const qt = Q(S, 1, 'races through the middle', 0.8) * fade;
  const ticks = [];
  for (let j = 0; j < PD.ticks; j++) ticks.push(j * TAU / PD.ticks);
  if (qt > 0) {
    const drop = qt * 0.35 * (1 - Q(S, 1, 'slows near the ends', 0.8, 0.6));
    for (const th of ticks) {
      const [x, y] = pdAt(o, th);
      ctx.save(); ctx.globalAlpha = 0.7 * qt; ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, TAU); ctx.fill(); ctx.restore();
      pdDash(x, y, x, ey, C.white, drop, 1.1);
    }
  }
  pdEdge(PD.cx, ey, R, fade, { ticks: 1 });
  if (qt > 0) for (const th of ticks) { const x = PD.cx + R * Math.cos(th); line(x, ey - 13, x, ey + 13, C.cyan, 0.8 * qt, 2); }
  /* below the tick numbers, clear of the arrows */
  pdTag('fast', PD.cx, ey + 76, PD_LABEL, Q(S, 1, 'races through the middle', 0.6) * fade, 'center', 20);
  const qe = Q(S, 1, 'stops', 0.6) * fade;
  pdTag('stop', PD.cx - R, ey + 76, PD_LABEL, qe, 'center', 20);
  pdTag('stop', PD.cx + R, ey + 76, PD_LABEL, qe, 'center', 20);
  /* the angle θ */
  const qa = Q(S, 2, 'One angle', 0.6) * fade;
  if (qa > 0) {
    line(o.cx, o.cy, o.cx + R, o.cy, C.dim, 0.7 * qa, 1.5);
    const [px0, py0] = pdAt(o, phi);
    line(o.cx, o.cy, px0, py0, C.now, 0.6 * qa, 2);
    pdArc(o.cx, o.cy, 58, 0, phi, C.now, qa, 3);
    const m = phi / 2;
    txt('θ', o.cx + 86 * Math.cos(m), o.cy - 86 * Math.sin(m) + 10, { size: 30, fam: PD_MATH, w: 700, align: 'center', c: C.now, a: qa });
  }
  /* the peg, its velocity (length 1 in units of its own speed), its drop and its shadow with the shadow's
     velocity (−sin θ in the same units): both arrows share the scale PD.vs */
  const [px, py] = pdAt(o, phi), vx = -Math.sin(phi), vy = Math.cos(phi);
  const sx = PD.cx + R * Math.cos(phi);
  pdDash(px, py, sx, ey, C.white, 0.55 * fade, 1.8);
  const qv = Q(S, 0, 'keeps the same speed', 0.6) * fade;
  pdVec(px, py, px + PD.vs * vx, py - PD.vs * vy, C.now, qv, 4);
  const qw = Q(S, 1, 'Its shadow does not', 0.6) * fade;
  pdVec(sx, ey - 26, sx + PD.vs * vx, ey - 26, C.now, qw, 4);
  /* the left-right part of the peg's velocity is the shadow's velocity: the tips line up */
  const qc = Q(S, 3, "the shadow's velocity", 0.6) * fade;
  if (qc > 0) {
    pdDash(px + PD.vs * vx, py - PD.vs * vy, sx + PD.vs * vx, ey - 26, C.now, 0.5 * qc, 1.4);
    pdVec(px, py, px + PD.vs * vx, py, C.now, 0.55 * qc, 2.5);
  }
  const qz = Q(S, 3, 'zero at both ends', 0.5) * fade;
  if (qz > 0) for (const x of [PD.cx - R, PD.cx + R]) ring(x, ey, 22, C.now, qz * 0.9, 2);
  pdDot(sx, ey, 11, C.now, fade);
  pdDot(px, py, 14, C.now, fade);
  /* readout: the shadow's velocity divided by the peg's speed, so no number here depends on the film's seconds */
  const qr = qa;
  if (qr > 0) {
    const x = 1340, y = 250;
    panel(x, y, 450, 262, qr, C.cyan, 'READOUT · 读数');
    txt(`θ = ${pdDeg(phi)}`, x + 30, y + 86, { size: 34, fam: PD_MATH, w: 700, c: C.now, a: qr });
    txt(`x = cos θ = ${pdFmt(Math.cos(phi))}`, x + 30, y + 140, { size: 32, fam: PD_MATH, w: 700, c: C.cyan, a: Q(S, 2, 'x equals cosine theta', 0.6) * fade });
    const qv2 = Q(S, 3, 'minus sine theta', 0.6) * fade;
    pdRatio(x + 30, y + 194, ` = −sin θ = ${pdFmt(-Math.sin(phi))}`, 32, C.now, qv2);
    txt("normalized by the peg's speed", x + 30, y + 236, { size: 17, fam: F.mono, w: 700, c: C.dim, a: qv2 });
  }
};
/* “v/v_peg” followed by `rest`: the subscript drawn smaller and lowered, so the ratio reads as a ratio */
function pdRatio(x, y, rest, size, col, a) {
  if (a <= 0.003) return;
  const o = { size, fam: PD_MATH, w: 700, c: col, a }, sub = Math.round(size * 0.56);
  txt('v/v', x, y, o);
  const x1 = x + tw('v/v', size, PD_MATH, 700);
  txt('peg', x1 + 1, y + size * 0.26, { size: sub, fam: PD_MATH, w: 700, c: col, a });
  txt(rest, x1 + 3 + tw('peg', sub, PD_MATH, 700), y, o);
}

/* ======================================================================= */
/*  SAME · 90° and 270°: one shadow position, opposite motion               */
/* ======================================================================= */
SCENES.same = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  const d = PD.delta * ease(Q(S, 2, 'Turn both forward', 1.8));
  const o = { cx: PD.cx, cy: PD.top2.cy, R: PD.top2.R, sy: 1, rot: d, a: fade, table: 0 };
  const R = o.R, ey = PD.ey;
  badgeQ(S, [[0, null, 'computed']]);
  pdDisc(o);
  pdViewLabels(o, fade, fade, 1);
  pdEdge(PD.cx, ey, R, fade, { ticks: 0 });
  const states = [
    { phi: 90 * PD_DEG + d, col: C.cyan, a: Q(S, 0, 'the peg at ninety degrees', 0.6) * fade, side: 1, row: 0 },
    { phi: 270 * PD_DEG + d, col: C.mag, a: Q(S, 0, 'two hundred seventy degrees', 0.6) * fade, side: -1, row: 1 }
  ];
  const qv = [Q(S, 1, 'one heads left', 0.6) * fade, Q(S, 1, 'the other right', 0.6) * fade];
  /* where the shadows were before the step: ghost rings at x = 0 */
  const qg = Q(S, 3, 'started at one position', 0.6) * fade;
  ring(PD.cx, ey, 18, C.cyan, 0.5 * qg, 2); ring(PD.cx, ey, 11, C.mag, 0.5 * qg, 2);
  /* the step itself: two short amber arcs on the rim */
  const qs = Q(S, 2, 'Turn both forward', 0.5) * fade;
  states.forEach(st => {
    if (qs > 0 && d > 1e-3) {
      pdArc(o.cx, o.cy, R + 22, st.phi - d, st.phi, C.now, qs, 4);
      const m = st.phi - d / 2;
      const rl = st.side > 0 ? R - 46 : R + 56;
      txt('+15°', o.cx + rl * Math.cos(m), o.cy - rl * Math.sin(m) + 8, { size: 22, fam: PD_MATH, w: 700, align: 'center', c: C.now, a: qs * clamp(d / PD.delta) });
    }
  });
  states.forEach((st, i) => {
    if (st.a <= 0) return;
    const [px, py] = pdAt(o, st.phi), x = PD.cx + R * Math.cos(st.phi);
    const vx = -Math.sin(st.phi), vy = Math.cos(st.phi);
    pdDash(px, py, x, ey, st.col, 0.5 * st.a, 1.8);
    pdVec(px, py, px + PD.vs * vx, py - PD.vs * vy, C.now, qv[i], 4);
    const ys = ey - 26 * st.side;
    pdVec(x, ys, x + PD.vs * vx, ys, C.now, qv[i], 4);
    pdDot(x, ys, 4, st.col, qv[i]);
    pdDot(px, py, 14, st.col, st.a);
    pdDot(x, ey, i === 0 ? 13 : 8, st.col, st.a);
    /* the angle label up and to the left of each peg, clear of the rim: the upper one outside the disc (the step arc
       lies to its right, the arrow below it), the lower one inside (the step arc and its +15° lie below the rim) */
    const top = st.side > 0;
    txt(pdDeg(st.phi), px - (top ? 24 : 20), py - (top ? 16 : 20), { size: 26, fam: PD_MATH, w: 700, align: 'right', c: st.col, a: st.a });
  });
  pdTag('x = 0', PD.cx + 24, ey - 34, C.white, Q(S, 1, 'x equals zero', 0.5) * (1 - qs) * fade, 'left', 22, PD_MATH);
  /* readout: the two states, θ and x, rolling during the step */
  const qr = Math.max(states[0].a, 0);
  if (qr > 0) {
    const x = 1320, y = 250;
    panel(x, y, 490, 236, qr, C.cyan, 'TWO MOMENTS · 两个时刻');
    states.forEach((st, i) => {
      if (st.a <= 0) return;
      const yy = y + 92 + i * 84;
      pdDot(x + 38, yy - 10, 10, st.col, st.a);
      txt(`θ = ${pdDeg(st.phi)}`, x + 66, yy, { size: 30, fam: PD_MATH, w: 700, c: st.col, a: st.a });
      txt(`x = ${pdFmt(Math.cos(st.phi))}`, x + 238, yy, { size: 30, fam: PD_MATH, w: 700, c: C.white, a: st.a });
      txt(Math.cos(st.phi + PD_DEG) < Math.cos(st.phi) ? '←' : '→', x + 452, yy, { size: 32, fam: PD_MATH, w: 700, align: 'center', c: C.now, a: qv[i] });
    });
  }
  const qn = Q(S, 3, 'does not mean', 0.6) * fade;
  chip(1500, ey, 380, 50, 'same x ≠ same state', C.white, qn, 24, PD_MATH);
};

/* ======================================================================= */
/*  LIFT · raise the eye: the segment opens into the disc, y = sin θ returns */
/* ======================================================================= */
SCENES.lift = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  const e = ease(Q(S, 0, 'Lift your eyes', 2.6));
  const sy = Math.sin(e * 90 * PD_DEG);                         // elevation 0 (edge-on) → 90° (from above)
  const o = { cx: PD.cx, cy: lerp(PD.ey, PD.lift.cy, e), R: lerp(PD.top2.R, PD.lift.R, e), sy, rot: 0, a: fade, table: 0 };
  const R = o.R, dim = 1 - 0.45 * Q(S, 3, 'One caution', 0.8);
  badgeQ(S, [[0, null, 'computed'], [2, 'No extra spring', 'argued']]);
  /* the turning peg of line 2 (starts at 90°, one turn in 9 s) */
  const t2 = phraseAt(S, 2, 'the steady turn'), qt = Q(S, 2, 'the steady turn', 0.6) * fade;
  const phi = 90 * PD_DEG + TAU / 9 * Math.max(0, u - t2);
  o.rot = qt > 0 ? phi - 90 * PD_DEG : 0;
  o.a = fade * dim;
  line(o.cx - R - 50, o.cy + 9 * (1 - sy), o.cx + R + 50, o.cy + 9 * (1 - sy), C.dim, 0.6 * (1 - e) * fade, 2);
  pdDisc(o);
  /* the segment stays where it was: the horizontal diameter, now the x-axis */
  line(o.cx - R, o.cy, o.cx + R, o.cy, C.cyan, fade * dim, lerp(6, 3, e));
  const qx = Q(S, 0, 'read two numbers', 0.6) * fade * dim;
  if (qx > 0) {
    pdVec(o.cx + R, o.cy, o.cx + R + 52, o.cy, C.cyan, qx, 3);
    pdVec(o.cx, o.cy, o.cx, o.cy - R - 40, C.mag, qx, 3);
    line(o.cx, o.cy, o.cx, o.cy + R + 30, C.mag, qx * 0.8, 3);
    pdTag('x', o.cx + R + 64, o.cy + 9, C.cyan, qx, 'left', 24, PD_MATH);
    pdTag('y', o.cx + 16, o.cy - R - 26, C.mag, qx, 'left', 24, PD_MATH);
  }
  pdTag('x = cos θ', o.cx + R + 64, o.cy + 50, C.cyan, Q(S, 1, 'x equals cosine theta', 0.6) * fade * dim, 'left', 28, PD_MATH);
  pdTag('y = sin θ', o.cx - 18, o.cy - R - 30, C.mag, Q(S, 1, 'y equals sine theta', 0.6) * fade * dim, 'right', 28, PD_MATH);
  /* the two moments of SAME, 90° and 270°: one point on the line, two points on the disc */
  const out = 1 - qt;
  const AB = [
    { phi: 90 * PD_DEG, col: C.cyan, q: Q(S, 1, 'plus one at ninety', 0.6), lab: 'y = +1', dy: 46 },
    { phi: 270 * PD_DEG, col: C.mag, q: Q(S, 1, 'minus one at two seventy', 0.6), lab: 'y = −1', dy: -30 }
  ];
  /* the labels sit just inside the rim (below the top point, above the bottom one), either side of the y-axis */
  AB.forEach((st, i) => {
    const a = fade * out * dim;
    if (a <= 0) return;
    const [px, py] = pdAt(o, st.phi);
    if (st.q > 0) line(o.cx, o.cy, px, py, C.mag, a * st.q, 6);
    pdDot(px, py, i === 0 ? 14 : 10, st.col, a);
    txt(pdDeg(st.phi), px - 14, py + st.dy, { size: 24, fam: PD_MATH, w: 700, align: 'right', c: st.col, a: a * e });
    pdTag(st.lab, px + 16, py + st.dy, C.mag, a * st.q, 'left', 28, PD_MATH);
  });
  /* the steady turn: the peg, its x (cyan drop) and its y (magenta drop) */
  if (qt > 0) {
    const a = qt * dim, [px, py] = pdAt(o, phi);
    pdDash(px, py, px, o.cy, C.cyan, 0.7 * a, 1.8);
    pdDash(px, py, o.cx, py, C.mag, 0.7 * a, 1.8);
    pdDot(px, o.cy, 9, C.now, a);
    pdDot(o.cx, py, 9, C.now, a);
    pdDot(px, py, 14, C.now, a);
  }
  /* the scope of the example */
  const qc = Q(S, 3, 'This is an illustration', 0.6) * fade;
  if (qc > 0) {
    const x = 1310, y = 560;
    panel(x, y, 500, 176, qc, C.argued, 'SCOPE · 边界');
    txt('an illustration of lost information', x + 26, y + 76, { size: 20, fam: F.mono, w: 700, c: C.white, a: qc });
    txt('not a derivation of quantum mechanics', x + 26, y + 108, { size: 20, fam: F.mono, w: 700, c: C.white, a: qc });
    txt('信息丢失的示意 · 不是量子力学的推导', x + 26, y + 148, { size: 22, fam: F.zh, w: 700, c: C.argued, a: qc });
  }
};

/* ======================================================================= */
/*  NEXT · the prelude goes on to a sphere: keep asking what a view hides   */
/* ======================================================================= */
/* a circle on the unit sphere, sampled, rotated by the elevation `el` about the x-axis, projected orthographically;
   the near half solid, the far half dashed and fainter */
function pdSphereCurve(f, cx, cy, R, el, col, a, w = 2) {
  if (a <= 0.003) return;
  const N = 120, pts = [];
  for (let i = 0; i <= N; i++) {
    const [X, Y, Z] = f(i / N * TAU);
    const y = Y * Math.cos(el) - Z * Math.sin(el), z = Y * Math.sin(el) + Z * Math.cos(el);
    pts.push([cx + R * X, cy - R * y, z >= 0]);
  }
  for (const near of [false, true]) {
    ctx.save(); ctx.globalAlpha = a * (near ? 1 : 0.4); ctx.strokeStyle = col; ctx.lineWidth = w;
    if (!near) ctx.setLineDash([6, 7]);
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      if (pts[i][2] !== near || pts[i + 1][2] !== near) continue;
      ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
    }
    ctx.stroke(); ctx.restore();
  }
}
const PD_EL = 22 * PD_DEG;
/* the film stays with the disc: the sphere is only a wireframe of where the prelude goes next; nothing is drawn
   leaving the sphere and no new dimension is introduced here */
SCENES.next = S => {
  const u = S.u, fade = clamp(u / 0.4);
  const gone = 1 - Q(S, 1, 'Then read on', 0.7);
  const a = fade * gone, cx = PD.cx, cy = PD.lift.cy, R = PD.lift.R;
  const m = Q(S, 0, 'a sphere', 1.4);
  /* the disc fades as the sphere's wireframe comes in; the silhouette is the disc's rim */
  pdDisc({ cx, cy, R, sy: 1, rot: 0, a: a * (1 - m) });
  if (a > 0) {
    ring(cx, cy, R, C.cyan, a * m, 2.6);
    for (const lat of [-40, 0, 40]) {
      const L = lat * PD_DEG;
      pdSphereCurve(t => [Math.cos(L) * Math.cos(t), Math.sin(L), Math.cos(L) * Math.sin(t)], cx, cy, R, PD_EL, C.cyan, a * m * (lat ? 0.6 : 0.9), 2);
    }
    for (const b of [35, 100]) {
      const B = b * PD_DEG;
      pdSphereCurve(t => [Math.sin(t) * Math.cos(B), Math.cos(t), Math.sin(t) * Math.sin(B)], cx, cy, R, PD_EL, C.cyan, a * m * 0.6, 2);
    }
  }
  /* the two questions */
  chip(cx - R - 210, cy, 260, 54, 'seen · 看见的', C.cyan, Q(S, 1, 'what the view shows', 0.6) * a, 24, F.zh);
  chip(cx + R + 230, cy, 300, 54, 'left out · 漏掉的', C.mag, Q(S, 1, 'what it leaves out', 0.6) * a, 24, F.zh);
  closingCard(S, { from: phraseAt(S, 1, 'Then read on') + 0.5, y: 330, hyper: false });
};

/* ======================================================================= */
/*                      checks of everything drawn                          */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, msg) => { if (!ok && bad++ < 12) E.push('prelude film: ' + msg); };
  /* no Lean citation, no LEAN ✓ */
  check((DATA.lean || []).length === 0, 'film.json cites Lean declarations, but this film shows no Lean result');
  /* numbers printed in SAME */
  check(pdFmt(Math.cos(90 * PD_DEG)) === '0.00' && pdFmt(Math.cos(270 * PD_DEG)) === '0.00', 'cos 90° or cos 270° does not print 0.00');
  check(pdFmt(Math.cos(105 * PD_DEG)) === '−0.26' && pdFmt(Math.cos(285 * PD_DEG)) === '+0.26', 'cos 105° / cos 285° do not print −0.26 / +0.26');
  check(Math.abs(PD.delta / PD_DEG - 15) < 1e-12, 'the common step is not 15°');
  const tol = 1e-9, near = (x, y) => Math.abs(x - y) < tol;
  check(near(-Math.sin(90 * PD_DEG), -1) && near(-Math.sin(270 * PD_DEG), 1), 'shadow velocities at 90° / 270° are not −1 / +1');
  /* LAP: in units of the peg's speed the shadow's velocity is d/dθ cos θ = −sin θ (central difference), zero at the
     ends; the tip of the peg's velocity drops onto the tip of the shadow's velocity (the projection is linear) */
  const o = { cx: PD.cx, cy: PD.top2.cy, R: PD.top2.R, sy: 1 };
  for (let k = 0; k < 720; k++) {
    const phi = k * TAU / 720, h = 1e-5;
    const num = (Math.cos(phi + h) - Math.cos(phi - h)) / (2 * h);
    check(Math.abs(num + Math.sin(phi)) < 1e-8, `shadow velocity ≠ −sin θ at ${phi.toFixed(4)}`);
    const [px, py] = pdAt(o, phi), tipX = px + PD.vs * -Math.sin(phi), shadowTip = PD.cx + o.R * Math.cos(phi) + PD.vs * -Math.sin(phi);
    check(near(tipX, shadowTip) && near(px, PD.cx + o.R * Math.cos(phi)), 'a drop is not vertical');
    check(near(Math.hypot(-Math.sin(phi), Math.cos(phi)), 1), 'the peg velocity does not have length 1 in units of its speed');
    check(near(Math.hypot(px - o.cx, py - o.cy), o.R), 'the top view is not a circle');
  }
  check(near(Math.sin(0), 0) && near(Math.sin(Math.PI), 0), 'the shadow does not stop at the ends');
  /* LAP ticks: equal time steps of 15° (the 24 drawn ticks) land on x = cos(15° j). Along the upper half the gap
     between neighbours is cos(15° j) − cos(15° (j + 1)) = 2 sin 7.5° · sin(15° (j + ½)): it grows from 1 − cos 15°
     ≈ 0.034 at the ends to sin 15° ≈ 0.259 in the middle, a ratio of cot 7.5° ≈ 7.6. Each gap is checked against
     that value, the half lap against its mirror image, and the growth step by step, all with a tolerance. */
  const step = 15 * PD_DEG;
  check(near(TAU / PD.ticks, step), 'the LAP ticks are not 15° apart');
  const gaps = [];
  for (let j = 0; j < 12; j++) gaps.push(Math.cos(j * step) - Math.cos((j + 1) * step));
  gaps.forEach((g, j) => check(near(g, 2 * Math.sin(step / 2) * Math.sin((j + 0.5) * step)), `tick gap ${j} is not 2 sin 7.5° sin(15°·${j + 0.5})`));
  for (let j = 0; j < 6; j++) check(near(gaps[j], gaps[11 - j]), `tick gaps ${j} and ${11 - j} are not mirror images`);
  for (let j = 0; j < 5; j++) check(gaps[j + 1] - gaps[j] > 0.01, `tick gap ${j + 1} is not wider than gap ${j}`);
  check(near(gaps[0], 1 - Math.cos(step)) && near(gaps[5], Math.sin(step)) && gaps[5] / gaps[0] > 7,
    'the equal-time ticks are not densest at the ends and sparsest in the middle');
  /* LIFT: at elevation 90° the opened disc is a true circle; at 0 every point lies on the segment */
  for (let k = 0; k < 72; k++) {
    const phi = k * 5 * PD_DEG;
    const up = pdAt({ cx: PD.cx, cy: PD.lift.cy, R: PD.lift.R, sy: Math.sin(90 * PD_DEG) }, phi);
    check(near(Math.hypot(up[0] - PD.cx, up[1] - PD.lift.cy), PD.lift.R), 'the lifted disc is not a circle');
    const flat = pdAt({ cx: PD.cx, cy: PD.ey, R: PD.top2.R, sy: 0 }, phi);
    check(near(flat[1], PD.ey) && Math.abs(flat[0] - PD.cx) <= PD.top2.R + tol, 'the edge-on disc leaves the segment');
  }
});
Object.assign(FILM.speed, { disc: 0.008, edge: 0.01, lap: 0.01, same: 0.012, lift: 0.014, next: 0.02 });

/* ---------- poster: the two moments of SAME over the title ---------- */
FILM.poster = () => {
  const t = 80;
  background(t, TL.scenes[3], 3, 4);
  const cx = 600, o = { cx, cy: 400, R: 215, sy: 1, rot: 0, a: 1, table: 0 }, ey = 740;
  pdDisc(o);
  line(cx - o.R - 50, ey + 9, cx + o.R + 50, ey + 9, C.dim, 0.6, 2);
  line(cx - o.R, ey, cx + o.R, ey, C.cyan, 1, 6);
  [[90, C.cyan, 1, 13], [270, C.mag, -1, 8]].forEach(([deg, col, side, r]) => {
    const phi = deg * PD_DEG, [px, py] = pdAt(o, phi), vx = -Math.sin(phi);
    pdDash(px, py, cx, ey, col, 0.5, 1.8);
    pdVec(px, py, px + PD.vs * vx, py, C.now, 1, 4);
    pdVec(cx, ey - 26 * side, cx + PD.vs * vx, ey - 26 * side, C.now, 1, 4);
    pdDot(px, py, 14, col, 1);
    pdDot(cx, ey, r, col, 1);
  });
  txt('TOP VIEW', cx - o.R - 90, o.cy - o.R + 30, { size: 20, fam: F.mono, w: 700, align: 'right', c: PD_LABEL, ls: 2 });
  txt('EDGE VIEW', cx - o.R - 90, ey + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: PD_LABEL, ls: 2 });
  const tx = 1340;
  txt('先看懂影子', tx, 420, { size: 120, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('从圆盘到一条线', tx, 530, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 3 });
  bloom(0.55);
  txt('UNDERSTAND THE SHADOW', tx, 630, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, ls: 5, ab: 2 });
  txt('FROM A DISC TO A LINE', tx, 690, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, ls: 5 });
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, tx, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, tx, 850, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * FPS), 3, TL.scenes[3]);
  post(3);
};
