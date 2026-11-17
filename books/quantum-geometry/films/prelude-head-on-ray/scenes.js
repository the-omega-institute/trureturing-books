/* Film · Head-On: The Dot Is a Line · 迎面的光：点其实是线
   (book quantum-geometry, the prelude, §0.1 “以线为点”; the first of the five prelude films). Scenes for
   theme/film/engine.js.

   One question carries the film: a flashlight aimed straight at your eye shows one bright dot; is that dot the
   whole thing? The views are modelled as straight (orthogonal) projections, as in the figure prelude-head-on and
   the lab card prelude-dimensions/head-on: a ray of length 1 seen at the angle α between the line of sight and the
   ray leaves a seen length sin α. This is a geometric model of looking, not a claim about real light.

   What each scene shows, and on what footing:
     DARK    one bright dot in a dark field of view; the question .......................... picture, no claim
     SIDE    one fixed ray of length 1 seen from above while the eye moves round it (α = 0° → 90°); the ray's two
             ends drop along the line of sight onto a bar across it, the dropped segment has length sin α, and
             the eye's view shows the same segment; four snapshots α = 0°, 20°, 45°, 90° with seen lengths 0,
             ≈ 0.34, ≈ 0.71, 1 (the figure prelude-head-on) ............................. computed here (NUM)
     AGREE   two unit arrows: amber o (where you look) and cyan a (toward the light, which travels along −a);
             their agreement o·a = cos θ read on a meter while θ goes 90° → 0° ............ computed here (NUM);
             “the book reads a particle as just such a dot: a line seen head-on” is the book's reading, badged
             ARGUED
     AGAIN   the line through a = (3/5, 4/5) as the action P “keep only the part along the line”:
             P = (1/25)[9 12; 12 16]; v = (1, 0) → Pv = (9/25, 12/25) → P(Pv) = Pv; P·P entry by entry over
             625 returns every entry, P² = P (the book's “idempotent line”) ............... computed here (NUM)
     WEIGHT  the gaze line through o = (1, 0) and the beam line through a: the shadow of o on a has length 3/5,
             squared 9/25, and Tr(P_o P_a) = 9/25 + 0 = 9/25; squared shares 1, 1/2, 0 at 0°, 45°, 90°
             ............................................................................ computed here (NUM);
             for a record measurement P with P_k = φφ* and a pure state ρ = ψψ* (positive semidefinite, trace 1),
             recordWeight P ρ k = ‖φ*ψ‖² and recordWeight P ρ k = Tr(ρ P_k)
             ..... RankOneBornPairingWeight.rank_one_born_pairing_weight (ch. 2, LEAN; the theorem's third clause,
             on the unread state, is not used here). The hand example is the instance φ = a, ψ = o, ρ = P_o with
             the record measurement {P_a, I − P_a}; its numbers are computed, not part of the Lean citation.
     RECAP   three takeaways, the next film of the series (a turning disc that looks like a line), closing card
   The narration says one Lean sentence, in WEIGHT, while the LEAN ✓ card is on screen. On load, FILM.init
   checks DATA.lean against the one cited theorem, re-derives every rational shown on screen with exact
   fractions, and checks the drawn projections against independent formulas; any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. Every frame is a pure function of the scene time. */
'use strict';

const HR_DEG = Math.PI / 180;
const HR_GID = 'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight';
const HR_LABEL = mix(C.dim, C.white, 0.45);
const HR_SERIES = mix(C.cyan, C.dim, 0.42);
/* text with Greek letters, ², ‖, θ or Chinese: the self-hosted Noto Sans SC, the same on every machine */
const HR_MATH = F.zh;

/* ======================================================================= */
/*                      exact fractions (small integers)                     */
/* ======================================================================= */
const HQ = (() => {
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const r = a % b; a = b; b = r; } return a || 1; };
  const q = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; };
  const add = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
  const sub = (a, b) => q(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => q(a.n * b.n, a.d * b.d);
  const eq = (a, b) => a.n === b.n && a.d === b.d;
  const val = a => a.n / a.d;
  const str = a => (a.n < 0 ? '−' : '') + Math.abs(a.n) + (a.d === 1 ? '' : '/' + a.d);
  /* the rational with denominator ≤ 64 nearest to x, required to be exact to 1e-12 */
  const of = x => {
    for (let d = 1; d <= 64; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-12) return q(n, d); }
    return null;
  };
  const dot = (u, v) => add(mul(u[0], v[0]), mul(u[1], v[1]));
  const outer = (u, v) => [[mul(u[0], v[0]), mul(u[0], v[1])], [mul(u[1], v[0]), mul(u[1], v[1])]];
  const matvec = (M, v) => [add(mul(M[0][0], v[0]), mul(M[0][1], v[1])), add(mul(M[1][0], v[0]), mul(M[1][1], v[1]))];
  const matmul = (A, B) => [0, 1].map(i => [0, 1].map(j => add(mul(A[i][0], B[0][j]), mul(A[i][1], B[1][j]))));
  return { q, add, sub, mul, eq, val, str, of, dot, outer, matvec, matmul, ONE: q(1), ZERO: q(0) };
})();

/* ======================================================================= */
/*                     numbers shown on screen (computed)                    */
/* ======================================================================= */
/* SIDE: the four viewing angles of the figure prelude-head-on and their seen lengths sin α */
function hrLen(s) {
  if (Math.abs(s) < 1e-12) return '0';
  if (Math.abs(s - 1) < 1e-12) return '1';
  return '≈ ' + s.toFixed(2);
}
const HR_VIEWS = [0, 20, 45, 90].map(d => ({ d, s: Math.sin(d * HR_DEG), lab: hrLen(Math.sin(d * HR_DEG)) }));
/* AGAIN and WEIGHT: the line through a = (3/5, 4/5), P = a aᵀ */
const HR_A = [HQ.q(3, 5), HQ.q(4, 5)];
const HR_P = HQ.outer(HR_A, HR_A);
const HR_DEN = 25;                                                   // the common denominator of P's entries
const HR_P25 = HR_P.map(r => r.map(x => x.n * (HR_DEN / x.d)));       // [[9, 12], [12, 16]]
/* P·P entry by entry: (row i of 25P)·(column j of 25P) over 25·25 */
const HR_PP = [0, 1].map(i => [0, 1].map(j => {
  const terms = [0, 1].map(k => [HR_P25[i][k], HR_P25[k][j]]);
  const sum = terms.reduce((s, [x, y]) => s + x * y, 0);
  const val = HQ.q(sum, HR_DEN * HR_DEN);
  const expr = `(${terms[0][0]}·${terms[0][1]} + ${terms[1][0]}·${terms[1][1]})/${HR_DEN * HR_DEN} = ${sum}/${HR_DEN * HR_DEN} = `;
  return { i, j, terms, sum, val, expr, line: expr + HQ.str(val) };
}));
const HR_ROWS = [HR_PP[0][0], HR_PP[0][1], HR_PP[1][0], HR_PP[1][1]];
const HR_V = [HQ.q(1), HQ.q(0)];
const HR_PV = HQ.matvec(HR_P, HR_V);                                 // (9/25, 12/25)
const HR_PPV = HQ.matvec(HR_P, HR_PV);                               // the same
const hrVecStr = v => `(${HQ.str(v[0])}, ${HQ.str(v[1])})`;
/* WEIGHT: the gaze line through o = (1, 0) against the beam line through a */
const HR_O = [HQ.q(1), HQ.q(0)];
const HR_OA = HQ.dot(HR_O, HR_A);                                    // 3/5
const HR_OA2 = HQ.mul(HR_OA, HR_OA);                                 // 9/25
const HR_PO = HQ.outer(HR_O, HR_O);                                  // [[1, 0], [0, 0]]
const HR_POPA = HQ.matmul(HR_PO, HR_P);                              // [[9/25, 12/25], [0, 0]]
const HR_TR = HQ.add(HR_POPA[0][0], HR_POPA[1][1]);                  // 9/25
const HR_POPA25 = HR_POPA.map(r => r.map(x => x.n * (HR_DEN / x.d))); // [[9, 12], [0, 0]]
/* WEIGHT strip: the squared share cos²θ at 0°, 45°, 90° */
const HR_SHARE = [0, 45, 90].map(d => ({ d, v: HQ.of(Math.cos(d * HR_DEG) ** 2) }));
/* every string printed from the numbers above */
const HR_STR = {
  a: hrVecStr(HR_A), v: hrVecStr(HR_V), o: hrVecStr(HR_O), pv: hrVecStr(HR_PV), ppv: hrVecStr(HR_PPV),
  oa: HQ.str(HR_OA), oa2: HQ.str(HR_OA2), tr: HQ.str(HR_TR),
  share: HR_SHARE.map(z => (z.v ? HQ.str(z.v) : '?'))
};

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
/* the series marker under the HUD, in every scene */
function hrSeries(a = 1) {
  const head = 'PRELUDE · 1/5 · ';
  txt(head, 60, 132, { size: 15, fam: F.mono, w: 700, c: HR_SERIES, a, ls: 2 });
  txt('序曲', 60 + tw(head, 15, F.mono, 700, 2), 133, { size: 16, fam: F.zh, w: 700, c: HR_SERIES, a, ls: 1 });
}
/* a point: soft glow, solid fill, white core */
function hrDot(x, y, r, col, a) {
  if (a <= 0.003) return;
  ctx.save();
  ctx.globalAlpha = a * 0.22; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
  ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.36, 0, TAU); ctx.fill();
  ctx.restore();
}
/* the bright head-on dot: a wide glow with a white-hot core */
function hrGlow(x, y, r, col, a) {
  if (a <= 0.003) return;
  ctx.save();
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
  g.addColorStop(0, rgba(col, 0.85 * a)); g.addColorStop(0.22, rgba(col, 0.38 * a)); g.addColorStop(1, rgba(col, 0));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 5, 0, TAU); ctx.fill();
  ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, TAU); ctx.fill();
  ctx.restore();
}
/* an arrow whose head scales with its length */
function hrVec(x1, y1, x2, y2, col, a, w = 4) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (a <= 0.003 || L < 1) return;
  const h = Math.min(20, L * 0.4), ux = dx / L, uy = dy / L, bx = x2 - ux * h, by = y2 - uy * h;
  line(x1, y1, bx, by, col, a, w);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x2, y2); ctx.lineTo(bx - uy * h * 0.55, by + ux * h * 0.55); ctx.lineTo(bx + uy * h * 0.55, by - ux * h * 0.55);
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function hrDash(x1, y1, x2, y2, col, a, w = 2) {
  if (a <= 0.003) return;
  ctx.save(); ctx.setLineDash([8, 8]); line(x1, y1, x2, y2, col, a, w); ctx.restore();
}
/* a circular arc for math angles a0 → a1 (counterclockwise on screen, y up) */
function hrArc(cx, cy, r, a0, a1, col, a, w = 3) {
  if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w;
  ctx.beginPath(); ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
function hrTag(s, x, y, col, a, align = 'left', size = 24, fam = HR_MATH) {
  txt(s, x, y, { size, fam, w: 700, c: col, a, align });
}
/* a rise-and-fall pulse */
const hrBump = (p, q) => clamp(p) * (1 - clamp(q));
/* a small right-angle mark at P between the unit directions d1 and d2 */
function hrRight(P, d1, d2, col, a, k = 14) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(P[0] + k * d1[0], P[1] + k * d1[1]);
  ctx.lineTo(P[0] + k * d1[0] + k * d2[0], P[1] + k * d1[1] + k * d2[1]);
  ctx.lineTo(P[0] + k * d2[0], P[1] + k * d2[1]); ctx.stroke(); ctx.restore();
}
/* the eye seen from above: an amber eyeball with its pupil toward the unit direction (dx, dy) it looks along */
function hrEye(x, y, dx, dy, a, r = 17) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = rgba(C.bg, 0.9); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.now; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = C.now; ctx.beginPath(); ctx.arc(x + dx * r * 0.45, y + dy * r * 0.45, r * 0.42, 0, TAU); ctx.fill();
  ctx.restore();
}
/* a flashlight seen from the side: its lens at (x, y), shining along the unit direction (dx, dy) */
function hrTorch(x, y, dx, dy, a, s = 1) {
  if (a <= 0.003) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(dy, dx)); ctx.scale(s, s); ctx.globalAlpha = a;
  ctx.fillStyle = rgba(C.white, 0.16); ctx.strokeStyle = rgba(C.white, 0.85); ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(-20, -9); ctx.lineTo(-62, -9); ctx.lineTo(-62, 9); ctx.lineTo(-20, 9); ctx.lineTo(0, 15);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.white; ctx.fillRect(-2, -13, 4, 26);
  ctx.restore();
}
/* text runs [[string, sub?, colour?], …] drawn left to right; a sub run is smaller and lowered */
function hrRuns(runs, x, y, size, col, a, fam = HR_MATH) {
  if (a <= 0.003) return x;
  for (const [s, sub, c] of runs) {
    const sz = sub ? Math.round(size * 0.62) : size, yy = sub ? y + size * 0.24 : y;
    txt(s, x, yy, { size: sz, fam, w: 700, c: c || col, a });
    x += tw(s, sz, fam, 700) + (sub ? 2 : 0);
  }
  return x;
}
/* a bracketed matrix of strings, first row's baseline at y; hl = [i, j, a] underlines one entry in amber */
function hrMat(x, y, rows, o) {
  const size = o.size, gap = o.gap || Math.round(size * 1.45), cg = o.colGap || Math.round(size * 0.9), fam = o.fam || F.mono;
  const n = rows[0].length, cw = [];
  for (let j = 0; j < n; j++) cw.push(Math.max(...rows.map(r => tw(r[j], size, fam, 700))));
  const pad = 16, wIn = cw.reduce((s, w) => s + w, 0) + cg * (n - 1), W2 = wIn + 2 * pad;
  const top = y - size * 0.95, bot = y + (rows.length - 1) * gap + size * 0.35, a = o.a;
  if (a <= 0.003) return W2;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.bracket || C.white; ctx.lineWidth = 2.6; ctx.beginPath();
  ctx.moveTo(x + 10, top); ctx.lineTo(x, top); ctx.lineTo(x, bot); ctx.lineTo(x + 10, bot);
  ctx.moveTo(x + W2 - 10, top); ctx.lineTo(x + W2, top); ctx.lineTo(x + W2, bot); ctx.lineTo(x + W2 - 10, bot);
  ctx.stroke(); ctx.restore();
  rows.forEach((r, i) => {
    let xx = x + pad;
    r.forEach((s, j) => {
      const right = xx + cw[j];
      txt(s, right, y + i * gap, { size, fam, w: 700, c: o.col || C.white, a, align: 'right' });
      if (o.hl && o.hl[0] === i && o.hl[1] === j && o.hl[2] > 0) {
        const w = tw(s, size, fam, 700);
        line(right - w - 4, y + i * gap + 9, right + 4, y + i * gap + 9, C.now, o.hl[2] * a, 4);
      }
      xx = right + cg;
    });
  });
  return W2;
}
/* the eye's view: a round field of view with the seen segment of length frac · full, tilted as in the figure
   prelude-head-on; the source end is the bright dot */
const HR_TILT = [1 / Math.sqrt(1.25), -0.5 / Math.sqrt(1.25)];
function hrView(cx, cy, r, frac, a, o = {}) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(4,10,24,0.72)'; ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, TAU); ctx.fill();
  ctx.strokeStyle = o.ring || rgba(C.dim, 0.95); ctx.lineWidth = o.ringW || 2; ctx.stroke(); ctx.restore();
  const L = 2 * r * 0.9 * frac, hx = HR_TILT[0] * L / 2, hy = HR_TILT[1] * L / 2;
  if (L > 1.5) {
    line(cx - hx, cy - hy, cx + hx, cy + hy, C.cyan, a, o.w || 5);
    hrDot(cx - hx, cy - hy, o.dot || 6, C.cyan, a);
  } else hrGlow(cx, cy, o.glow || 7, C.cyan, a);
}

/* ======================================================================= */
/*  DARK · NIGHT: one bright dot, and the question                           */
/* ======================================================================= */
SCENES.dark = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* night: the star field dimmed */
  ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); ctx.restore();
  hrSeries(clamp(u / 0.6));
  /* title card during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.5) / 0.7));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM`, W / 2, 380, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 500, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 3 });
    const en = DATA.film.title.toUpperCase(), es = Math.min(44, 44 * 1500 / Math.max(1, tw(en, 44, F.orb, 900, 4)));
    txt(scramble(en, p, 11), W / 2, 590, { size: es, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
    txt('序曲 1/5 · 0.1 以线为点', W / 2, 668, { size: 26, fam: F.zh, w: 700, align: 'center', c: HR_SERIES, a: ta * clamp(p * 1.4), ls: 2 });
  }
  const da = clamp((u - L0.s + 0.1) / 0.8) * clamp((S.d - u) / 0.5);
  if (da <= 0) return;
  const cx = W / 2, cy = 465, R = 255;
  /* your field of view */
  const fa = Q(S, 0, 'straight at your eye', 0.9) * da;
  if (fa > 0) {
    ctx.save(); ctx.setLineDash([10, 12]); ring(cx, cy, R, C.dim, 0.75 * fa, 2); ctx.restore();
    txt('YOUR VIEW · 你的视野', cx, cy - R - 26, { size: 22, fam: F.zh, w: 700, align: 'center', c: HR_LABEL, a: fa, ls: 2 });
  }
  /* the flashlight's dot, straight ahead */
  const qd = Q(S, 0, 'points a flashlight', 0.7) * da;
  hrGlow(cx, cy, 15, C.cyan, qd);
  ring(cx, cy, 24, C.white, 0.22 * qd, 1.5);
  const pop = Q(S, 0, 'points a flashlight', 1.0);
  ring(cx, cy, 20 + 60 * pop, C.cyan, (1 - pop) * qd * 0.8, 2.5);
  /* one dot, and nothing more */
  const q1 = Q(S, 1, 'one bright dot', 0.5) * da;
  if (q1 > 0) {
    const pulse = Q(S, 1, 'one bright dot', 1.0);
    ring(cx, cy, 40 + 30 * pulse, C.cyan, (1 - pulse) * q1, 2.5);
    hrTag('one dot · 一个点', cx + 66, cy + 9, C.cyan, q1, 'left', 26);
  }
  const qn = Q(S, 1, 'nothing more', 0.6) * da * (1 - Q(S, 2, 'is that dot', 0.6));
  hrTag('nothing else in view · 别无他物', cx, cy + 150, mix(HR_LABEL, C.white, 0.4), qn, 'center', 24);
  /* the question */
  const q2 = Q(S, 2, 'is that dot', 0.6) * da;
  chip(cx, 800, 780, 66, 'Is that dot the whole thing? · 这个点就是全部吗？', C.white, q2, 30, F.zh);
};

/* ======================================================================= */
/*  SIDE · step aside: the same ray from α = 0° to 90°, seen length sin α    */
/* ======================================================================= */
const SD = {
  cx: 500, cy: 500, half: 160,      // FROM ABOVE: the ray of length 1 is 2·half px long, centred at (cx, cy)
  D: 280, d1: 190, bar: 190,        // the eye's distance from the ray's centre; the bar across the line of sight
  vx: 1390, vy: 362, vR: 150,       // WHAT YOU SEE: the eye's round field of view
  sx: [1135, 1305, 1475, 1645], sy: 716, sR: 48   // the four snapshots of the figure prelude-head-on
};
/* the view from above at angle al (radians) between the line of sight and the ray: the eye E on a circle round the
   ray's centre, the bar across the line of sight through P0, and the two ends of the ray dropped onto it along the
   line of sight (a straight projection); seen = the dropped length over the ray's length */
function hrSideGeo(al) {
  const c = Math.cos(al), s = Math.sin(al);
  const g = [c, -s];                                          // from the ray's centre toward the eye
  const E = [SD.cx + SD.D * c, SD.cy - SD.D * s];
  const P0 = [SD.cx + SD.d1 * c, SD.cy - SD.d1 * s];
  const n = [s, c];                                           // across the line of sight
  const ends = [[SD.cx - SD.half, SD.cy], [SD.cx + SD.half, SD.cy]];   // the source end, the near end
  const proj = ends.map(X => {
    const k = (X[0] - SD.cx) * n[0] + (X[1] - SD.cy) * n[1];
    return [P0[0] + k * n[0], P0[1] + k * n[1]];
  });
  const seen = Math.hypot(proj[1][0] - proj[0][0], proj[1][1] - proj[0][1]) / (2 * SD.half);
  return { E, P0, n, g, ends, proj, seen };
}
/* the diagram FROM ABOVE at angle al; o: glow (the beam), arc (the angle), a (alpha) */
function hrSideDiagram(al, a, o = {}) {
  const G = hrSideGeo(al), [x0, y0] = G.ends[0], [x1, y1] = G.ends[1];
  if (a <= 0.003) return G;
  /* the bar across the line of sight, and the dropped segment on it */
  line(G.P0[0] - SD.bar * G.n[0], G.P0[1] - SD.bar * G.n[1], G.P0[0] + SD.bar * G.n[0], G.P0[1] + SD.bar * G.n[1], C.dim, 0.8 * a, 2);
  G.ends.forEach((X, i) => hrDash(X[0], X[1], G.proj[i][0], G.proj[i][1], C.white, 0.42 * a, 1.6));
  if (G.seen * 2 * SD.half > 1.5) line(G.proj[0][0], G.proj[0][1], G.proj[1][0], G.proj[1][1], C.cyan, a, 6);
  hrDot(G.proj[0][0], G.proj[0][1], 6, C.cyan, a);
  /* the beam: fixed, length 1, the light running from the flashlight toward the near end */
  if (o.glow > 0) line(x0, y0, x1, y1, C.cyan, 0.3 * o.glow * a, 20);
  line(x0, y0, x1, y1, C.cyan, a, 7);
  for (const f of [0.3, 0.55, 0.8]) {
    const x = lerp(x0, x1, f);
    ctx.save(); ctx.globalAlpha = 0.7 * a; ctx.strokeStyle = C.bg; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(x - 6, y0 - 7); ctx.lineTo(x + 2, y0); ctx.lineTo(x - 6, y0 + 7); ctx.stroke(); ctx.restore();
  }
  hrTorch(x0, y0, 1, 0, a, 0.9);
  /* the angle α between the line of sight and the ray, measured at the ray's centre */
  const arcA = (o.arc == null ? 1 : o.arc) * a;
  hrDash(SD.cx, SD.cy, G.P0[0], G.P0[1], C.now, 0.55 * a, 1.6);
  if (al > 0.6 * HR_DEG) {
    hrArc(SD.cx, SD.cy, 62, 0, al, C.now, arcA, 3 + 2 * (o.arcHot || 0));
    const m = al / 2;
    txt('α', SD.cx + 92 * Math.cos(m), SD.cy - 92 * Math.sin(m) + 10, { size: 30, fam: HR_MATH, w: 700, align: 'center', c: C.now, a: arcA });
  }
  /* the eye and its line of sight */
  hrVec(G.E[0], G.E[1], G.E[0] - (SD.D - SD.d1 - 8) * G.g[0], G.E[1] - (SD.D - SD.d1 - 8) * G.g[1], C.now, a, 3.5);
  hrEye(G.E[0], G.E[1], -G.g[0], -G.g[1], a);
  return G;
}
SCENES.side = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  hrSeries();
  badgeQ(S, [[0, null, 'computed']]);
  const t0 = phraseAt(S, 0, 'Step a little') + 0.3, t1 = lineAt(S, 1).e;
  const al = 90 * HR_DEG * ease(clamp((u - t0) / (t1 - t0)));
  const started = clamp((u - t0 + 0.4) / 0.4);
  /* the moment the sweep reaches d degrees (bisection on the monotone ease) */
  const cross = d => { let lo = 0, hi = 1; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (90 * ease(m) < d) lo = m; else hi = m; } return t0 + hi * (t1 - t0); };
  /* FROM ABOVE */
  const glow = hrBump(Q(S, 1, 'The beam never changed', 0.5), Q(S, 1, 'Only the angle', 0.8, 1.2));
  const arcHot = hrBump(Q(S, 1, 'the angle you look from', 0.4), Q(S, 2, 'Head-on', 0.6));
  const G = hrSideDiagram(al, fade, { glow, arcHot });
  txt('FROM ABOVE · 从上方看', SD.cx, 760, { size: 22, fam: F.zh, w: 700, align: 'center', c: HR_LABEL, a: fade, ls: 2 });
  const qb = Q(S, 0, 'the dot opens', 0.6) * fade;
  hrTag('the beam · 光束', SD.cx - 20, SD.cy + 46, C.cyan, qb * (1 - glow), 'center', 24);
  chip(SD.cx - 20, 660, 400, 54, 'still length 1 · 仍然长 1', C.cyan, glow * fade, 24, F.zh);
  const ea = fade * (1 - 0.6 * clamp((u - t0) / 0.8)) * (1 - Q(S, 1, 'The beam', 0.6));
  const ex = G.E[0] + 34 * G.g[0], ey = G.E[1] + 34 * G.g[1];
  hrTag('eye · 眼', ex, ey + 9, C.now, ea, 'left', 22);
  /* WHAT YOU SEE */
  txt('WHAT YOU SEE · 眼中所见', SD.vx, 188, { size: 22, fam: F.zh, w: 700, align: 'center', c: HR_LABEL, a: fade, ls: 2 });
  hrView(SD.vx, SD.vy, SD.vR, G.seen, fade, { w: 7, dot: 8, glow: 13 });
  const qr = started * fade;
  if (qr > 0) {
    const deg = Math.round(al / HR_DEG);
    hrTag(`α = ${deg}°`, SD.vx - 24, 576, C.now, qr, 'right', 32);
    hrTag(`seen length sin α = ${G.seen.toFixed(2)}`, SD.vx + 4, 576, C.cyan, qr, 'left', 28);
  }
  /* four snapshots, filled in as the sweep passes them */
  HR_VIEWS.forEach((v, k) => {
    const x = SD.sx[k], sa = clamp((u - cross(v.d)) / 0.4) * fade;
    if (sa <= 0) return;
    hrTag(`α = ${v.d}°`, x, SD.sy - SD.sR - 22, C.white, sa, 'center', 22);
    hrView(x, SD.sy, SD.sR, v.s, sa, { w: 4, dot: 5, glow: 6 });
    hrTag(v.lab, x, SD.sy + SD.sR + 46, C.cyan, sa, 'center', 26, F.mono);
  });
  /* head-on: zero; from the side: all of it */
  const r0 = Q(S, 2, 'Head-on', 0.5) * fade, r3 = Q(S, 2, 'From the side', 0.5) * fade;
  ring(SD.sx[0], SD.sy, SD.sR + 16, C.now, r0, 3);
  ring(SD.sx[3], SD.sy, SD.sR + 16, C.now, r3, 3);
};

/* ======================================================================= */
/*  AGREE · two unit arrows: their agreement o·a = cos θ                    */
/* ======================================================================= */
const AG = { ox: 600, oy: 620, U: 330, px: 1160, py: 232, pw: 620, ph: 316, mx0: 1200, mx1: 1740, my: 462 };
function hrAgreeGeo(th) {
  return { a: [AG.ox + AG.U, AG.oy], o: [AG.ox + AG.U * Math.cos(th), AG.oy - AG.U * Math.sin(th)] };
}
/* the angle θ between o and a as a function of the scene time: 90° (side-on), then 45°, then 0° (head-on) */
function hrAgreeTheta(S) {
  const s1 = ease(Q(S, 1, 'the cosine', 2.6)), s2 = ease(Q(S, 2, 'Head-on', 2.2, -0.2));
  return (90 - 45 * s1 - 45 * s2) * HR_DEG;
}
SCENES.agree = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  hrSeries();
  badgeQ(S, [[0, null, 'computed'], [3, 'The book reads', 'argued']]);
  const th = hrAgreeTheta(S), G = hrAgreeGeo(th), c = Math.cos(th);
  const dimA = 1 - 0.4 * Q(S, 3, 'The book reads', 0.8);
  /* both arrows grow out of one point as they are named; the light: a flashlight beyond the tip of a, shining back
     toward the origin (along −a) */
  const qg = Q(S, 0, 'Draw two arrows', 0.6) * fade, grow = ease(Q(S, 0, 'Draw two arrows', 1.2));
  const qa = Q(S, 0, 'where the light comes from', 0.6) * fade;
  const qo = Q(S, 0, 'where you look', 0.6) * fade;
  const desc = 1 - Q(S, 1, 'How much', 0.6);
  hrTorch(AG.ox + AG.U + 92, AG.oy, -1, 0, qa * dimA, 1);
  for (const x of [AG.ox + AG.U + 20, AG.ox + AG.U + 46]) {
    ctx.save(); ctx.globalAlpha = 0.6 * qa * dimA; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(x + 6, AG.oy - 8); ctx.lineTo(x - 3, AG.oy); ctx.lineTo(x + 6, AG.oy + 8); ctx.stroke(); ctx.restore();
  }
  hrTag('light travels along −a · 光沿 −a 传来', AG.ox + AG.U + 40, AG.oy + 98, HR_LABEL, qa * dimA, 'center', 20);
  /* the unit circle: both arrows have length 1 */
  ctx.save(); ctx.setLineDash([6, 9]); hrArc(AG.ox, AG.oy, AG.U, -6 * HR_DEG, 96 * HR_DEG, C.dim, 0.6 * qg * grow * dimA, 1.5); ctx.restore();
  /* the angle θ */
  if (th > 0.6 * HR_DEG) {
    const qth = Q(S, 1, 'the angle between them', 0.5) * fade * dimA;
    hrArc(AG.ox, AG.oy, 74, 0, th, C.now, 0.5 * qo * dimA + 0.5 * qth, 3);
    const m = th / 2;
    txt('θ', AG.ox + 104 * Math.cos(m), AG.oy - 104 * Math.sin(m) + 10, { size: 32, fam: HR_MATH, w: 700, align: 'center', c: C.now, a: qo * dimA });
  }
  /* a (cyan, toward the light) under o (amber, where you look) */
  const ga = [lerp(AG.ox, G.a[0], grow), lerp(AG.oy, G.a[1], grow)], go = [lerp(AG.ox, G.o[0], grow), lerp(AG.oy, G.o[1], grow)];
  hrVec(AG.ox, AG.oy, ga[0], ga[1], C.cyan, qg * dimA, 7);
  hrVec(AG.ox, AG.oy, go[0], go[1], C.now, qg * dimA, 5);
  hrDot(AG.ox, AG.oy, 6, C.white, qg * dimA);
  hrTag('a', G.a[0] + 12, AG.oy + 52, C.cyan, qg * grow * dimA, 'center', 32);
  hrTag('toward the light · 朝向光源', (AG.ox + G.a[0]) / 2 + 20, AG.oy + 54, C.cyan, qa * dimA * desc, 'center', 22);
  /* o's name just inside its tip, on the side away from a */
  const n = [-Math.sin(th), -Math.cos(th)], d = [Math.cos(th), -Math.sin(th)];
  hrTag('o', G.o[0] - 26 * d[0] + 30 * n[0], G.o[1] - 26 * d[1] + 30 * n[1] + 10, C.now, qg * grow * dimA, 'center', 32);
  hrTag('where you look · 视线方向', AG.ox - 30, AG.oy - AG.U / 2, C.now, qo * dimA * desc, 'right', 22);
  hrTag('both of length 1 · 两支都长 1', AG.ox - 30, AG.oy + 54, HR_LABEL, Q(S, 0, 'of length one', 0.6) * fade * desc, 'right', 22);
  /* the meter */
  const qm = Q(S, 1, 'How much they agree', 0.6) * fade;
  if (qm > 0) {
    panel(AG.px, AG.py, AG.pw, AG.ph, qm, C.cyan, 'AGREEMENT · 相融度');
    txt('o · a = cos θ', AG.px + 34, AG.py + 96, { size: 46, fam: HR_MATH, w: 700, c: C.white, a: Q(S, 1, 'the cosine', 0.6) * fade });
    const deg = Math.round(th / HR_DEG);
    hrTag(`θ = ${deg}°`, AG.px + 34, AG.py + 160, C.now, qm, 'left', 32);
    const vs = c.toFixed(2);
    hrTag(`o · a = ${vs}`, AG.px + 260, AG.py + 160, C.cyan, qm, 'left', 32);
    const one = Q(S, 2, 'the number is one', 0.5) * fade;
    if (one > 0) ring(AG.px + 260 + tw('o · a = ', 32, HR_MATH, 700) + tw(vs, 32, HR_MATH, 700) / 2, AG.py + 149, 46, C.now, one * (1 - 0.5 * Q(S, 3, 'The book', 0.6)), 3);
    const y = AG.my, X = v => lerp(AG.mx0, AG.mx1, v);
    ctx.save(); ctx.globalAlpha = qm; ctx.strokeStyle = rgba(C.dim, 0.9); ctx.lineWidth = 2; ctx.strokeRect(AG.mx0, y - 8, AG.mx1 - AG.mx0, 16); ctx.restore();
    fillBox(AG.mx0, y - 8, Math.max(0, c) * (AG.mx1 - AG.mx0), 16, C.cyan, 0.75 * qm);
    line(X(c), y - 20, X(c), y + 20, C.now, qm, 4);
    [['0', 0], ['0.5', 0.5], ['1', 1]].forEach(([s, v]) => {
      line(X(v), y + 10, X(v), y + 18, C.dim, qm, 2);
      txt(s, X(v), y + 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: HR_LABEL, a: qm });
    });
    txt('side-on · 侧看', AG.mx0, y + 76, { size: 20, fam: F.zh, w: 700, c: HR_LABEL, a: qm });
    txt('head-on · 迎面', AG.mx1, y + 76, { size: 20, fam: F.zh, w: 700, align: 'right', c: HR_LABEL, a: qm });
  }
  /* head-on, the line looks like a dot */
  const qi = Q(S, 2, 'looks like a dot', 0.6) * fade * dimA;
  if (qi > 0) {
    txt('what you see · 眼中所见', 330, 236, { size: 20, fam: F.zh, w: 700, align: 'center', c: HR_LABEL, a: qi });
    hrView(330, 340, 78, 0, qi, { glow: 9 });
  }
  /* the book's reading */
  const qb = Q(S, 3, 'The book reads', 0.6) * fade;
  if (qb > 0) {
    const x = AG.px, y = 588;
    panel(x, y, AG.pw, 176, qb, C.argued, "THE BOOK'S READING · 本书的解读");
    txt('a particle = a line seen head-on', x + 30, y + 86, { size: 30, fam: F.zh, w: 700, c: C.white, a: qb });
    txt('粒子 = 迎面看去的线', x + 30, y + 138, { size: 32, fam: F.zh, w: 700, c: C.argued, a: qb });
  }
};

/* ======================================================================= */
/*  AGAIN · the line as a way of looking: P keeps the part along it, P² = P  */
/* ======================================================================= */
const AP = { ox: 520, oy: 604, s: 300, t0: -0.6, t1: 1.35, px: 1000, py: 196, pw: 800, ph: 630 };
const hrAP = p => [AP.ox + AP.s * p[0], AP.oy - AP.s * p[1]];
SCENES.again = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  hrSeries();
  badgeQ(S, [[0, null, 'computed']]);
  const a = HR_A.map(HQ.val), av = [a[0], -a[1]];                      // a on screen (y down)
  const A0 = hrAP([AP.t0 * a[0], AP.t0 * a[1]]), A1 = hrAP([AP.t1 * a[0], AP.t1 * a[1]]);
  const O = hrAP([0, 0]), V = hrAP(HR_V.map(HQ.val)), PV = hrAP(HR_PV.map(HQ.val));
  const stage = 1 - 0.35 * Q(S, 3, 'Work it by hand', 0.8) * (1 - Q(S, 5, 'idempotent line', 0.8));
  /* the line */
  const ql = Q(S, 0, 'Now use the line', 0.8) * fade;
  const lg = hrBump(Q(S, 0, 'keep only the part', 0.5), Q(S, 1, 'Look once', 0.8));
  if (lg > 0) line(A0[0], A0[1], A1[0], A1[1], C.cyan, 0.3 * lg * fade, 22);
  line(A0[0], A0[1], A1[0], A1[1], C.cyan, ql * stage, 5);
  hrDot(O[0], O[1], 5, C.white, ql * stage);
  hrTag('the line · 这条线', A1[0] + 20, A1[1] + 12, C.cyan, ql * stage, 'left', 24);
  chip(AP.ox + 40, 812, 700, 56, 'P: keep only the part along the line · 只保留沿线的部分', C.cyan, Q(S, 0, 'keep only the part', 0.6) * fade, 22, F.zh);
  /* look once: v drops its shadow Pv */
  const qv = Q(S, 1, 'any arrow', 0.5) * fade;
  const drop = ease(Q(S, 1, 'drops its shadow', 1.3));
  hrVec(O[0], O[1], V[0], V[1], C.now, qv * stage, 5);
  hrTag(`v = ${HR_STR.v}`, V[0] + 10, V[1] + 40, C.now, qv * stage, 'left', 26);
  if (drop > 0) {
    const tip = [lerp(V[0], PV[0], drop), lerp(V[1], PV[1], drop)];
    hrDash(V[0], V[1], tip[0], tip[1], C.white, 0.7 * fade * stage, 2);
    hrDot(tip[0], tip[1], 5, C.white, fade * stage * (1 - Q(S, 1, 'drops its shadow', 0.3, 1.3)));
  }
  const qs = Q(S, 1, 'drops its shadow', 0.5, 1.2) * fade;
  if (qs > 0) {
    const perp = [av[1], -av[0]];                                       // across the line, toward v
    hrRight(PV, [-av[0], -av[1]], [-perp[0], -perp[1]], C.white, 0.7 * qs * stage);
    hrVec(O[0], O[1], PV[0], PV[1], C.cyan, qs * stage, 8);
    hrDot(PV[0], PV[1], 7, C.cyan, qs * stage);
    hrTag(`Pv = ${HR_STR.pv}`, PV[0] - 56, PV[1] - 6, C.cyan, qs * stage, 'right', 26);
  }
  /* look again: nothing moves */
  const q2 = Q(S, 2, 'Look again', 0.5) * fade;
  if (q2 > 0) {
    const pulse = Q(S, 2, 'Look again', 1.2);
    ring(PV[0], PV[1], 14 + 40 * pulse, C.now, (1 - pulse) * q2, 3);
    ring(PV[0], PV[1], 20, C.now, q2 * stage, 2.5);
    hrTag(`P(Pv) = ${HR_STR.ppv}`, PV[0] - 56, PV[1] + 38, C.now, Q(S, 2, 'nothing changes', 0.5) * fade * stage, 'right', 26);
    hrTag('the same · 不动', PV[0] + 44, PV[1] - 14, C.now, Q(S, 2, 'already there', 0.5) * fade * stage, 'left', 22);
  }
  /* by hand */
  const qp = Q(S, 0, 'a way of looking', 0.6) * fade;
  if (qp <= 0) return;
  const x = AP.px, y = AP.py;
  /* the panel holds only the line's direction until the hand computation starts, then opens to full height */
  panel(x, y, AP.pw, lerp(122, AP.ph, ease(Q(S, 3, 'Work it by hand', 0.7))), qp, C.cyan, 'BY HAND · 手算');
  hrRuns([['the line through  a = ', 0], [HR_STR.a, 0, C.cyan]], x + 32, y + 82, 32, C.white, qp);
  /* P written out when the hand computation starts */
  const qP = Q(S, 3, 'Work it by hand', 0.6) * fade;
  txt('P =', x + 32, y + 174, { size: 36, fam: HR_MATH, w: 700, c: C.white, a: qP });
  txt(`1/${HR_DEN} ·`, x + 110, y + 174, { size: 32, fam: F.mono, w: 700, c: C.white, a: qP });
  /* the rows of P·P appear during line 3; during line 4 an amber mark walks along them, and under the entry of P
     that each row returns */
  const rowAt = k => Q(S, 3, 'Work it by hand', 0.5, 1.0 + 0.75 * k);
  const walk = k => hrBump(Q(S, 4, 'Read across', 0.3, 0.9 * k), Q(S, 4, 'Read across', 0.3, 0.9 * (k + 1)) * (k < 3 ? 1 : 0)) *
    (1 - Q(S, 5, 'idempotent line', 0.5));
  let hl = null;
  HR_ROWS.forEach((r, k) => { const w = walk(k); if (w > 0) hl = [r.i, r.j, w]; });
  hrMat(x + 250, y + 150, HR_P25.map(r => r.map(String)), { size: 34, gap: 52, a: qP, hl });
  txt(`entries: 3·3, 3·4, 4·4 over ${HR_DEN} · 元素 = a 的分量两两相乘`, x + 32, y + 262, { size: 21, fam: F.zh, w: 700, c: HR_LABEL, a: qP });
  const qh = Q(S, 3, 'Work it by hand', 0.5, 0.6) * fade;
  txt('P · P, entry by entry · 逐项相乘', x + 32, y + 320, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a: qh });
  HR_ROWS.forEach((r, k) => {
    const p = rowAt(k) * fade;
    if (p <= 0) return;
    const yy = y + 368 + k * 46, w = walk(k) * fade;
    txt(`(${r.i + 1},${r.j + 1})`, x + 32, yy, { size: 22, fam: F.mono, w: 700, c: HR_LABEL, a: p });
    txt(r.expr, x + 120, yy, { size: 24, fam: F.mono, w: 700, c: C.white, a: p });
    const vx = x + 120 + tw(r.expr, 24, F.mono, 700), vs = HQ.str(r.val);
    txt(vs, vx, yy, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: p });
    if (w > 0) line(vx - 4, yy + 9, vx + tw(vs, 24, F.mono, 700) + 4, yy + 9, C.now, w, 4);
  });
  const qi = Q(S, 5, 'idempotent line', 0.6) * fade;
  if (qi > 0) {
    line(x + 32, y + 532, x + AP.pw - 32, y + 532, C.dim, 0.6 * qi, 1.5);
    txt('P² = P', x + 32, y + 594, { size: 56, fam: HR_MATH, w: 900, c: C.white, a: qi, ab: 2 });
    txt('idempotent line · 幂等存在线', x + 260, y + 584, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: qi });
  }
};

/* ======================================================================= */
/*  WEIGHT · how much: shadow 3/5, squared 9/25 = Tr(P_o P_a); Lean once      */
/* ======================================================================= */
const WT = { ox: 500, oy: 528, s: 330, t0: -0.3, t1: 1.18, px: 1000, py: 196, pw: 800, ph: 346, ly: 562, lh: 262,
  mx: [270, 490, 710], my: 742, mr: 52 };
const hrWT = p => [WT.ox + WT.s * p[0], WT.oy - WT.s * p[1]];
/* two short lines through (x, y): amber along the gaze, cyan at the angle d (degrees) */
function hrPair(x, y, r, d, a) {
  if (a <= 0.003) return;
  line(x - r, y, x + r, y, C.now, a, 5);
  const c = Math.cos(d * HR_DEG), s = Math.sin(d * HR_DEG);
  line(x - r * c, y + r * s, x + r * c, y - r * s, C.cyan, a, 3);
}
SCENES.weight = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  hrSeries();
  badgeQ(S, [[0, null, 'computed'], [3, 'The Lean kernel', 'lean']]);
  const a = HR_A.map(HQ.val), av = [a[0], -a[1]];
  const O = hrWT([0, 0]), Ot = hrWT([1, 0]), B0 = hrWT([WT.t0 * a[0], WT.t0 * a[1]]), B1 = hrWT([WT.t1 * a[0], WT.t1 * a[1]]);
  const oa = HQ.val(HR_OA), Ft = hrWT([oa * a[0], oa * a[1]]);
  const stage = 1 - 0.4 * Q(S, 3, 'The Lean kernel', 0.8);
  /* the two lines */
  line(WT.ox - 300, WT.oy, WT.ox + 420, WT.oy, C.now, 0.55 * fade * stage, 2.5);
  line(B0[0], B0[1], B1[0], B1[1], C.cyan, fade * stage, 5);
  hrTag('gaze line · 视线', WT.ox + 420, WT.oy + 44, C.now, fade * stage, 'right', 22);
  hrTag(`beam line · 光束线 · a = ${HR_STR.a}`, B1[0] - 18, B1[1] + 6, C.cyan, fade * stage, 'right', 22);
  hrArc(WT.ox, WT.oy, 64, 0, Math.atan2(a[1], a[0]), C.now, 0.6 * fade * stage, 2.5);
  txt('θ', WT.ox + 92 * Math.cos(0.46), WT.oy - 92 * Math.sin(0.46) + 10, { size: 26, fam: HR_MATH, w: 700, align: 'center', c: C.now, a: 0.8 * fade * stage });
  hrVec(O[0], O[1], Ot[0], Ot[1], C.now, fade * stage, 5);
  hrTag(`o = ${HR_STR.o}`, Ot[0] + 14, Ot[1] - 14, C.now, fade * stage, 'left', 26);
  /* the shadow of o on the beam line */
  const qs = Q(S, 0, "the shadow's length", 0.6) * fade;
  const drop = ease(Q(S, 0, "the shadow's length", 1.0));
  if (qs > 0) {
    const tip = [lerp(Ot[0], Ft[0], drop), lerp(Ot[1], Ft[1], drop)];
    hrDash(Ot[0], Ot[1], tip[0], tip[1], C.white, 0.7 * qs * stage, 2);
    const k = clamp((drop - 0.7) / 0.3);
    hrRight(Ft, [-av[0], -av[1]], [-av[1], av[0]], C.white, 0.7 * k * qs * stage);
    if (k > 0) line(O[0], O[1], Ft[0], Ft[1], C.cyan, k * qs * stage, 11);
    hrDot(Ft[0], Ft[1], 7, C.cyan, k * qs * stage);
    const mid = [(O[0] + Ft[0]) / 2, (O[1] + Ft[1]) / 2];
    hrTag(HR_STR.oa, mid[0] - 30, mid[1] - 8, C.cyan, k * qs * stage, 'right', 32, F.mono);
  }
  /* the strip: squared shares at 0°, 45°, 90° */
  const q1 = Q(S, 1, 'Lines that coincide', 0.6) * fade;
  if (q1 > 0) {
    HR_SHARE.forEach((z, i) => {
      const p = (i === 2 ? Q(S, 1, 'at a right angle', 0.5) : i === 1 ? Q(S, 1, 'share everything', 0.5, 0.4) : 1) * q1 * stage;
      const x = WT.mx[i];
      txt(`${z.d}°`, x, WT.my - WT.mr - 18, { size: 22, fam: F.mono, w: 700, align: 'center', c: HR_LABEL, a: p });
      hrPair(x, WT.my, WT.mr, z.d, p);
      txt(HR_STR.share[i], x, WT.my + WT.mr + 44, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
    });
    const qc = Q(S, 1, 'at a right angle', 0.5) * q1 * stage;
    txt('(shadow)²', WT.mx[2] + 84, WT.my - 4, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a: qc });
    txt('影子长的平方', WT.mx[2] + 84, WT.my + 28, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a: qc });
  }
  /* by hand */
  if (qs <= 0) return;
  const x = WT.px, y = WT.py, X2 = x + 236;
  panel(x, y, WT.pw, WT.ph, qs, C.cyan, 'BY HAND · 手算');
  txt('shadow · 影子长', x + 30, y + 82, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a: qs });
  hrRuns([['o · a = ', 0], [HR_STR.oa, 0, C.cyan]], X2, y + 84, 34, C.white, qs);
  const q2 = Q(S, 0, 'square it', 0.6) * fade;
  txt('squared · 平方', x + 30, y + 140, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a: q2 });
  hrRuns([[`(${HR_STR.oa})² = `, 0], [HR_STR.oa2, 0, C.cyan]], X2, y + 142, 34, C.white, q2);
  const qb = Q(S, 2, 'Born pairing weight', 0.6) * fade;
  txt('the Born pairing weight · 玻恩配对权重', X2, y + 180, { size: 21, fam: F.zh, w: 700, c: C.white, a: qb });
  const qt = Q(S, 2, 'Born pairing weight', 0.6, 0.9) * fade;
  if (qt > 0) {
    txt('trace · 迹', x + 30, y + 240, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a: qt });
    const e = hrRuns([['Tr(P', 0], ['o', 1], [' P', 0], ['a', 1], [') = ', 0], [HR_STR.tr, 0, C.cyan]], X2, y + 242, 34, C.white, qt);
    const hot = Q(S, 3, 'trace pairing', 0.5) * fade;
    if (hot > 0) line(X2 - 6, y + 256, e + 6, y + 256, C.now, hot, 4);
    /* P_o P_a written out: its trace adds the diagonal */
    const xm = hrRuns([['P', 0], ['o', 1], [' P', 0], ['a', 1], [` = 1/${HR_DEN} ·`, 0]], X2, y + 302, 24, C.white, qt);
    const mw = hrMat(xm + 14, y + 290, HR_POPA25.map(r => r.map(String)), { size: 24, gap: 30, a: qt });
    txt(`diagonal ${HR_POPA25[0][0]} + ${HR_POPA25[1][1]} · 对角线`, xm + 14 + mw + 20, y + 304, { size: 20, fam: F.zh, w: 700, c: HR_LABEL, a: qt });
  }
  /* the Lean card: one sentence of narration while it is on screen */
  const ql = Q(S, 3, 'The Lean kernel', 0.6) * fade;
  if (ql > 0) {
    const yl = WT.ly;
    panel(x, yl, WT.pw, WT.lh, ql, C.lean, 'CHECKED BY THE LEAN KERNEL · 由 Lean 内核检验');
    hrRuns([['recordWeight(P, ρ, k) = |φ*ψ|² = Tr(ρ P', 0], ['k', 1], [')', 0]], x + 30, yl + 92, 30, C.white, ql);
    hrRuns([['for a record measurement P with P', 0], ['k', 1], [' = φφ*', 0]], x + 30, yl + 136, 24, C.white, 0.85 * ql);
    txt('and a pure state ρ = ψψ* (trace 1)', x + 30, yl + 168, { size: 24, fam: HR_MATH, w: 700, c: C.white, a: 0.85 * ql });
    const r = leanCite(HR_GID);
    const head = 'LEAN ✓', hw = tw(head, 15, F.mono, 700, 1) + 16;
    fillBox(x + 30, yl + 196, hw, 26, C.lean, 0.95 * ql);
    txt(head, x + 38, yl + 215, { size: 15, fam: F.mono, w: 700, c: C.bg, a: ql, ls: 1 });
    txt(r ? r.name.split('.').slice(-2).join('.') : '?', x + 40 + hw, yl + 216, { size: 19, fam: F.mono, w: 700, c: C.lean, a: ql });
    hrRuns([['here φ = a, ψ = o: both sides are ', 0], [HR_STR.oa2, 0, C.cyan], [' (computed above)', 0]], x + 30, yl + 250, 21, mix(HR_LABEL, C.white, 0.3), ql);
  }
};

/* ======================================================================= */
/*  RECAP · three takeaways, the next film, the closing card                 */
/* ======================================================================= */
const HR_TAKE = [
  ['A dot can be a line seen head-on.', '点可能是迎面看去的线。'],
  ['Two directions agree by o·a = cos θ; head-on gives 1.', '两个方向的相融度是 o·a = cos θ，迎面时为 1。'],
  ['A line is a look that, repeated, changes nothing: P² = P.', '线是一种再看一次也不变的看法：P² = P。']
];
function hrIcon(k, x, y, a) {
  if (a <= 0.003) return;
  if (k === 0) {                                     // a dot that is a line
    line(x - 34, y + 14, x + 36, y - 20, C.cyan, a, 4);
    hrDot(x - 34, y + 14, 6, C.cyan, a);
  } else if (k === 1) {                              // two unit arrows and their angle
    hrVec(x - 36, y + 16, x + 40, y + 16, C.cyan, a, 4);
    hrVec(x - 36, y + 16, x - 36 + 76 * Math.cos(0.6), y + 16 - 76 * Math.sin(0.6), C.now, a, 3);
  } else if (k === 2) {                              // a line and a shadow that stays
    line(x - 40, y + 22, x + 40, y - 30, C.cyan, a, 4);
    hrDash(x + 30, y + 16, x + 4, y - 4, C.white, 0.7 * a, 1.6);
    hrDot(x + 4, y - 4, 6, C.cyan, a);
    ring(x + 4, y - 4, 13, C.now, a, 2);
  } else {                                           // next: a disc seen edge-on
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = rgba(C.white, 0.7); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y - 4, 40, 12, 0, 0, TAU); ctx.stroke(); ctx.restore();
    line(x - 40, y + 18, x + 40, y + 18, C.cyan, a, 4);
  }
}
SCENES.recap = S => {
  const u = S.u, fade = clamp(u / 0.4);
  hrSeries(clamp((S.d - u) / 1.2));
  const from = lineAt(S, 3).e + 0.7;
  const gone = 1 - clamp((u - from + 0.5) / 0.6);
  const a = fade * gone;
  if (a > 0) {
    txt('THREE THINGS TO KEEP · 记住三件事', 300, 214, { size: 22, fam: F.zh, w: 700, c: HR_LABEL, a, ls: 2 });
    HR_TAKE.forEach(([en, zh], k) => {
      const p = at(S, k, 0.7, -0.1) * a, y = 300 + k * 140;
      if (p <= 0) return;
      hrIcon(k, 330, y - 4, p);
      txt(en, 420, y, { size: 36, fam: F.zh, w: 700, c: C.white, a: p });
      txt(zh, 420, y + 50, { size: 32, fam: F.zh, w: 700, c: C.cyan, a: p });
    });
    const pn = at(S, 3, 0.7, -0.1) * a, y = 730;
    if (pn > 0) {
      line(300, y - 62, 1620, y - 62, C.dim, 0.5 * pn, 1.5);
      hrIcon(3, 330, y - 6, pn);
      txt('NEXT · 下一部', 420, y - 10, { size: 22, fam: F.zh, w: 700, c: HR_SERIES, a: pn, ls: 2 });
      txt('a turning disc that looks like a line · 看起来像一条线的转盘', 420, y + 30, { size: 28, fam: F.zh, w: 700, c: C.white, a: pn });
      txt('PRELUDE · 2/5', 1620, y + 30, { size: 20, fam: F.mono, w: 700, align: 'right', c: HR_SERIES, a: pn, ls: 2 });
    }
  }
  closingCard(S, { from, y: 330, hyper: false });
};

/* ======================================================================= */
/*                      checks of everything drawn                          */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, msg) => { if (!ok && bad++ < 16) E.push('prelude-head-on-ray: ' + msg); };
  const near = (x, y, tol = 1e-9) => Math.abs(x - y) < tol;
  /* the one Lean citation, a theorem, looked up by its whole GID */
  const lean = DATA.lean || [];
  check(lean.length === 1 && lean[0].gid === HR_GID, `film.json "lean" must cite exactly ${HR_GID}`);
  const r = leanCite(HR_GID);
  check(r && r.kind === 'theorem', 'the cited declaration is not a theorem at the pinned commit');
  check(r && /rank_one_born_pairing_weight$/.test(r.name || ''), 'the cited declaration has an unexpected name');
  /* SIDE: seen lengths of the four snapshots, and the drawn projection for every angle */
  check(JSON.stringify(HR_VIEWS.map(v => v.lab)) === JSON.stringify(['0', '≈ 0.34', '≈ 0.71', '1']), 'the snapshot lengths do not print 0, ≈ 0.34, ≈ 0.71, 1');
  check(HR_VIEWS.every(v => near(v.s, Math.sin(v.d * HR_DEG))), 'a snapshot length is not sin α');
  for (let k = 0; k <= 180; k++) {
    const al = k * 0.5 * HR_DEG, G = hrSideGeo(al);
    check(near(G.seen, Math.sin(al)), `the dropped segment at α = ${k / 2}° is not sin α long`);
    /* each drop runs along the line of sight, and lands on the bar across it */
    G.ends.forEach((X, i) => {
      const d = [G.proj[i][0] - X[0], G.proj[i][1] - X[1]];
      check(near(d[0] * G.g[1] - d[1] * G.g[0], 0, 1e-7), 'a drop is not along the line of sight');
      check(near((G.proj[i][0] - G.P0[0]) * G.g[0] + (G.proj[i][1] - G.P0[1]) * G.g[1], 0, 1e-7), 'a dropped end is off the bar');
    });
    /* the eye is on the side of α: the angle between the ray's direction and the line of sight is α */
    const cosA = ((G.E[0] - SD.cx) * 1 + (G.E[1] - SD.cy) * 0) / SD.D;
    check(near(cosA, Math.cos(al)), 'the eye is not at the angle α');
  }
  /* AGREE: unit arrows, o·a = cos θ, the meter's end values */
  for (let k = 0; k <= 90; k++) {
    const th = k * HR_DEG, G = hrAgreeGeo(th);
    const o = [(G.o[0] - AG.ox) / AG.U, (AG.oy - G.o[1]) / AG.U], a = [(G.a[0] - AG.ox) / AG.U, (AG.oy - G.a[1]) / AG.U];
    check(near(Math.hypot(o[0], o[1]), 1) && near(Math.hypot(a[0], a[1]), 1), 'an arrow in AGREE is not of length 1');
    check(near(o[0] * a[0] + o[1] * a[1], Math.cos(th)), `o·a ≠ cos θ at θ = ${k}°`);
  }
  check(Math.cos(0).toFixed(2) === '1.00' && Math.cos(90 * HR_DEG).toFixed(2) === '0.00', 'the meter does not read 1.00 head-on and 0.00 side-on');
  /* AGAIN: P = a aᵀ with a = (3/5, 4/5), P·P = P entry by entry, Pv, P(Pv) */
  check(HQ.eq(HQ.dot(HR_A, HR_A), HQ.ONE), 'a is not a unit vector');
  check(JSON.stringify(HR_P25) === '[[9,12],[12,16]]', '25·P is not [9 12; 12 16]');
  check(HR_P.every(row => row.every(x => HR_DEN % x.d === 0)), 'an entry of P does not have denominator dividing 25');
  check(HQ.eq(HR_P[0][1], HR_P[1][0]), 'P is not symmetric');
  const expect = ['(9·9 + 12·12)/625 = 225/625 = 9/25', '(9·12 + 12·16)/625 = 300/625 = 12/25',
    '(12·9 + 16·12)/625 = 300/625 = 12/25', '(12·12 + 16·16)/625 = 400/625 = 16/25'];
  HR_ROWS.forEach((row, k) => {
    check(row.line === expect[k], `P·P row ${k + 1} prints “${row.line}”`);
    check(HQ.eq(row.val, HR_P[row.i][row.j]), `entry (${row.i + 1},${row.j + 1}) of P·P is not the entry of P`);
  });
  const PP = HQ.matmul(HR_P, HR_P);
  check([0, 1].every(i => [0, 1].every(j => HQ.eq(PP[i][j], HR_P[i][j]))), 'P·P ≠ P');
  check(HR_STR.a === '(3/5, 4/5)' && HR_STR.v === '(1, 0)' && HR_STR.pv === '(9/25, 12/25)' && HR_STR.ppv === HR_STR.pv, 'a, v, Pv or P(Pv) print wrongly');
  const rest = [HQ.sub(HR_V[0], HR_PV[0]), HQ.sub(HR_V[1], HR_PV[1])];
  check(HQ.eq(HQ.dot(rest, HR_A), HQ.ZERO), 'v − Pv is not across the line');
  check(HQ.eq(HR_PV[0], HQ.mul(HQ.dot(HR_A, HR_V), HR_A[0])) && HQ.eq(HR_PV[1], HQ.mul(HQ.dot(HR_A, HR_V), HR_A[1])), 'Pv is not (a·v) a');
  {
    const a = HR_A.map(HQ.val), V = hrAP([1, 0]), PV = hrAP(HR_PV.map(HQ.val)), O = hrAP([0, 0]);
    const d = [V[0] - PV[0], V[1] - PV[1]], along = [a[0], -a[1]];
    check(near(d[0] * along[0] + d[1] * along[1], 0, 1e-7), 'the drawn drop in AGAIN is not at right angles to the line');
    check(near((PV[0] - O[0]) * along[1] - (PV[1] - O[1]) * along[0], 0, 1e-7), 'the drawn Pv is off the line');
    check(near(Math.hypot(d[0], d[1]), AP.s * 4 / 5, 1e-7), 'the drawn drop in AGAIN is not 4/5 long');
  }
  /* WEIGHT: o·a = 3/5, squared 9/25 = Tr(P_o P_a); the strip */
  check(HR_STR.o === '(1, 0)' && HR_STR.oa === '3/5' && HR_STR.oa2 === '9/25' && HR_STR.tr === '9/25', 'the shadow, its square or the trace print wrongly');
  check(HQ.eq(HR_OA2, HR_TR), 'the squared shadow is not the trace pairing');
  check(JSON.stringify(HR_POPA25) === '[[9,12],[0,0]]', '25·P_o P_a is not [9 12; 0 0]');
  check(HQ.eq(HQ.q(HR_POPA25[0][0] + HR_POPA25[1][1], HR_DEN), HR_TR), 'the diagonal of P_o P_a does not add to the trace');
  check(JSON.stringify(HR_STR.share) === JSON.stringify(['1', '1/2', '0']), 'the squared shares do not print 1, 1/2, 0');
  HR_SHARE.forEach(z => check(z.v && near(HQ.val(z.v), Math.cos(z.d * HR_DEG) ** 2, 1e-12), `the share at ${z.d}° is not cos²`));
  {
    const a = HR_A.map(HQ.val), oa = HQ.val(HR_OA), Ot = hrWT([1, 0]), Ft = hrWT([oa * a[0], oa * a[1]]), O = hrWT([0, 0]);
    check(near((Ot[0] - Ft[0]) * a[0] - (Ot[1] - Ft[1]) * a[1], 0, 1e-7), 'the drop in WEIGHT is not at right angles to the beam line');
    check(near(Math.hypot(Ft[0] - O[0], Ft[1] - O[1]), WT.s * oa, 1e-7), 'the drawn shadow in WEIGHT is not 3/5 long');
  }
});
Object.assign(FILM.speed, { dark: 0.004, side: 0.008, agree: 0.01, again: 0.01, weight: 0.012, recap: 0.02 });

/* ---------- poster: the ray from above with the eye stepped aside, the four snapshots, the title ---------- */
FILM.poster = () => {
  const t = 40;
  background(t, TL.scenes[1], 1, 4);
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.translate(40, -10);
  hrSideDiagram(38 * HR_DEG, 1, { arc: 1 });
  ctx.restore();
  HR_VIEWS.forEach((v, k) => {
    const x = 250 + k * 170, y = 800;
    txt(`α = ${v.d}°`, x, y - 70, { size: 22, fam: HR_MATH, w: 700, align: 'center', c: C.white });
    hrView(x, y, 46, v.s, 1, { w: 4, dot: 5, glow: 6 });
    txt(v.lab, x, y + 88, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan });
  });
  const tx = 1340;
  txt('迎面的光', tx, 410, { size: 124, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('点其实是线', tx, 520, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 3 });
  bloom(0.55);
  txt('HEAD-ON', tx, 624, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.white, ls: 6, ab: 2 });
  txt('THE DOT IS A LINE', tx, 684, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, ls: 5 });
  txt(`${DATA.book.code} · FILM`, tx, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt('PRELUDE · 1/5 · 序曲 0.1', tx, 824, { size: 22, fam: F.zh, w: 700, align: 'center', c: HR_SERIES, ls: 3 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, tx, 874, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * FPS), 1, TL.scenes[1]);
  post(3);
};
