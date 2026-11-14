/* ORTHO//CLOSURE · the one-sided band of ψ, shared by the page (main.js) and film 010 (its 720° shot).
   A classic script that defines one global, QG_SPINOR_BAND. A plane of the turn is { a, b, n }: a turns towards b,
   n = a × b is the axis. The band goes once round n at radius RB. Its width direction w(t) = cos(t/2) n + sin(t/2) r(t)
   turns half a turn per round (r(t) is the outward unit vector at the bearing a0 + t), so it is a Möbius band, drawn
   as a thin slab. It is cut along its centre line into one long strip, t from 0 to 720°: the part with t < 360° (the
   first round, "the pointer") lies on one side of the centre line and the part with t ≥ 360° (the second round, "the
   memory") on the other; at μ = 0 the two pieces close up into the band, with no seam. At μ = 1 the first piece is a
   ball round the centre and the second a ring shell round it (the page's dualist picture, MODEL); in between, every
   point of the solid lies on the straight segment between its two places. The flag of ψ(t) stands on the strip at t,
   from the centre line to the edge, and its tip is the point of the edge at t. The drawing helpers (draw, flag) call only
   the primitives the page's kit.solid and a film's solid shot share (surface, line, fan), with colours from the caller. */
(function (root) {
  'use strict';
  const PI = Math.PI, TAU = 2 * PI;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const unit = (a) => { const n = Math.hypot(a[0], a[1], a[2]); return n > 1e-12 ? [a[0] / n, a[1] / n, a[2] / n] : [0, 0, 1]; };
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

  const RB = 1.5, HW = 0.5, TH = 0.05, RBALL = 0.62, RTOR = 1.62, ATOR = 0.36, FACE = 0.42;
  const NU = 96, NV = 20;
  /** The unit vector in the plane pl at angle al from a towards b. */
  const radial = (pl, al) => add(scale(pl.a, Math.cos(al)), scale(pl.b, Math.sin(al)));
  /** Frame at turn t: centre c, outward r, travel T, axis n, width direction w and the band's normal N = w × T. */
  function frame(pl, t, a0) {
    const r = radial(pl, a0 + t), T = radial(pl, a0 + t + PI / 2), c2 = Math.cos(t / 2), s2 = Math.sin(t / 2);
    return { r, T, n: pl.n, c: scale(r, RB), w: add(scale(pl.n, c2), scale(r, s2)), N: add(scale(r, -c2), scale(pl.n, s2)) };
  }
  /** The cross-section of the slab at v in [0, 1]: [across (in half-widths), up (in half-thicknesses)]: the top face
      from the centre line out, the rounded rim, the bottom face back in. */
  function section(v) {
    if (v <= FACE) return [v / FACE, 1];
    if (v >= 1 - FACE) return [(1 - v) / FACE, -1];
    const f = PI * (v - FACE) / (1 - 2 * FACE);
    return [1 + (TH / HW) * Math.sin(f), Math.cos(f)];
  }
  function bandPoint(pl, t, v, a0) { const F = frame(pl, t, a0), s = section(v); return add(F.c, add(scale(F.w, HW * s[0]), scale(F.N, TH * s[1]))); }
  /** Where the same point of the strip sits in the split picture (μ = 1): piece 0 a ball, piece 1 a ring shell. */
  function splitPoint(pl, piece, t, v, a0) {
    const F = frame(pl, t, a0);
    if (!piece) { const th = PI * v; return add(scale(F.r, RBALL * Math.sin(th)), scale(F.n, RBALL * Math.cos(th))); }
    const ph = TAU * v + PI / 2;
    return add(scale(F.r, RTOR + ATOR * Math.cos(ph)), scale(F.n, ATOR * Math.sin(ph)));
  }
  /** A point of the solid: piece 0 has t in [0, 360°], piece 1 in [360°, 720°]. */
  function solidPoint(pl, piece, t, v, a0, mu) { const b = bandPoint(pl, t, v, a0); return mu > 0 ? lerp(b, splitPoint(pl, piece, t, v, a0), mu) : b; }
  const pieceOf = (t) => (t < TAU - 1e-9 ? 0 : 1);
  /** The edge of the solid at t (the middle of the rim), pushed out by `off` along the outward direction of the edge. */
  function edgeAt(pl, t, a0, mu, off) {
    const pc = pieceOf(t), p = solidPoint(pl, pc, t, 0.5, a0, mu), q = lerp(solidPoint(pl, pc, t, 0, a0, mu), solidPoint(pl, pc, t, 1, a0, mu), 0.5);
    const out = unit(sub(p, q));
    return { p: add(p, scale(out, off || 0)), out };
  }
  /** Draw the solid: its two pieces as lit surfaces of one colour (light and shade come from the camera only), keyed
      piece0 and piece1. o: color, grid ({ every: [4, 2] }), nu, nv. */
  function draw(st, pl, a0, mu, o) {
    o = o || {};
    for (const piece of [0, 1]) {
      st.surface(`piece${piece}`, (u, v) => solidPoint(pl, piece, u, v, a0, mu), { u: piece ? [TAU, 2 * TAU] : [0, TAU], v: [0, 1], nu: o.nu || NU, nv: o.nv || NV, color: o.color, grid: o.grid || { every: [4, 2] } });
    }
  }
  /** The direction towards the viewer of a stage (kit.solid) or of a film's solid shot. */
  const facing = (st) => (st.facing ? st.facing() : st.scene.facing());
  /** The flag of ψ(t) on the face of the solid that looks at the viewer: pole from the centre line to the edge along
      the surface, pennant at the edge pointing along the travel. s: color, width, alpha, dash, small. */
  function flag(st, pl, t, a0, mu, s) {
    s = s || {};
    const pc = pieceOf(t), F = frame(pl, t, a0), D = facing(st), col = s.color;
    const along = (v) => solidPoint(pl, pc, t, v, a0, mu);
    const top = dot(sub(along(FACE * 0.5), along(1 - FACE * 0.5)), D) >= 0;   // which face is nearer the eye
    const vs = (f) => (top ? FACE * f : 1 - FACE * f);
    const lift = scale(F.N, (top ? 1 : -1) * (TH * (1 - mu) + 0.012));   // just off the face, so it sits on it
    const on = (v) => add(along(v), lift);
    const pole = []; for (let k = 0; k <= 8; k++) pole.push(on(vs(k / 8)));
    st.line(pole, { color: col, width: s.width || 2.6, alpha: s.alpha == null ? 1 : s.alpha, dash: s.dash });
    const tip = on(vs(1)), low = on(vs(0.62)), mid = add(on(vs(0.81)), scale(F.T, 0.26 * (s.small ? 0.7 : 1)));
    st.fan([tip, mid, low], s.dash ? { color: col, width: 1.4, dash: s.dash, strokeAlpha: 0.95 } : { fill: col, alpha: (s.alpha == null ? 1 : s.alpha) * 0.95, color: col, width: 1, strokeAlpha: 1 });
    return { base: along(vs(0)), tip, rim: along(0.5) };
  }

  root.QG_SPINOR_BAND = Object.freeze({ RB, HW, TH, RBALL, RTOR, ATOR, FACE, NU, NV, radial, frame, section, bandPoint, splitPoint, solidPoint, pieceOf, edgeAt, draw, flag });
})(typeof window !== 'undefined' ? window : globalThis);
