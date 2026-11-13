/* TWO//ANGLES · the glass ball shared by the page (main.js) and the films that draw the same sphere.
   A classic script that defines one global, QG_SPHERE: pure geometry of the unit sphere (frames, caps, circles) and
   two drawing helpers that call only the primitives the page's kit.solid and a film's solid shot share (line, glass),
   with every colour given by the caller (the page passes TRV.palette, a film passes C.*). */
(function (root) {
  'use strict';
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = (a) => Math.hypot(a[0], a[1], a[2]);
  const unit = (a) => { const n = Math.hypot(a[0], a[1], a[2]); return n > 1e-12 ? [a[0] / n, a[1] / n, a[2] / n] : [0, 0, 1]; };
  /** v rotated about the unit axis n by the angle a (right-handed, Rodrigues). */
  function rot(v, n, a) {
    const c = Math.cos(a), s = Math.sin(a), d = dot(n, v), x = cross(n, v);
    return [v[0] * c + x[0] * s + n[0] * d * (1 - c), v[1] * c + x[1] * s + n[1] * d * (1 - c), v[2] * c + x[2] * s + n[2] * d * (1 - c)];
  }
  /** Unit vector at polar angle theta (from +z) and azimuth phi (from +x). */
  const sph = (theta, phi) => [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)];

  /** A right-handed frame (e, f) of the plane orthogonal to the unit vector u. */
  const frame = (u) => { const e = unit(cross(Math.abs(u[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u)); return [e, cross(u, e)]; };
  /** The point at angle w from the unit vector u, at bearing v round it, on the sphere of radius r. */
  const capPoint = (u, w, v, r) => { const [e, f] = frame(u); return scale(add(scale(u, Math.cos(w)), add(scale(e, Math.sin(w) * Math.cos(v)), scale(f, Math.sin(w) * Math.sin(v)))), r); };
  /** The circle of centre c, unit normal n and radius r, as a closed list of k + 1 points. */
  const circlePts = (c, n, r, k = 120) => { const [e, f] = frame(n); return Array.from({ length: k + 1 }, (_, i) => { const a = 2 * Math.PI * i / k; return add(c, add(scale(e, r * Math.cos(a)), scale(f, r * Math.sin(a)))); }); };
  /** The circle on the unit sphere through p, about the unit axis u (the circle a turn about u moves p along). */
  const circleThrough = (p, u, k) => { const c = dot(p, u); return circlePts(scale(u, c), u, Math.sqrt(Math.max(0, 1 - c * c)), k); };
  /** The arc of p turned about the unit axis u from angle 0 to ang, in steps of at most `step` radians. */
  const arcAbout = (p, u, ang, step = Math.PI / 60) => { const n = Math.max(2, Math.ceil(Math.abs(ang) / step)), pts = []; for (let i = 0; i <= n; i++) pts.push(rot(p, u, ang * i / n)); return pts; };

  /** The direction towards the viewer of a stage (kit.solid) or of a film's solid shot. */
  const facing = (st) => (st.facing ? st.facing() : st.scene.facing());
  /** A line; with s.back, its part behind the centre plane is drawn at s.alpha × s.back (inside the glass shell). */
  function seg(st, pts, s) {
    if (s.back == null) { st.line(pts, s); return; }
    const D = facing(st), runs = [];
    let run = null;
    for (const q of pts) {   // a run of points on one side; a run that starts after a crossing begins at the last point
      const f = dot(q, D) >= 0;
      if (!run || run.f !== f) { run = { f, pts: run ? [run.pts[run.pts.length - 1], q] : [q] }; runs.push(run); } else run.pts.push(q);
    }
    for (const r of runs) if (r.pts.length > 1) st.line(r.pts, Object.assign({}, s, { alpha: (s.alpha == null ? 1 : s.alpha) * (r.f ? 1 : s.back) }));
  }
  const circleOf = (st, p, u, s) => seg(st, circleThrough(p, u), s);
  /** The glass ball of the page: the shell and its three coordinate great circles, the far halves fainter.
      o: glass (shell colour), ink (circle colour), width, alpha, back, key, shell ({ alpha, rim } of the shell). */
  function ball(st, o) {
    st.glass(o.key || 'ball', [0, 0, 0], 1, Object.assign({ color: o.glass }, o.shell || {}));
    for (const n of [[0, 0, 1], [0, 1, 0], [1, 0, 0]]) seg(st, circlePts([0, 0, 0], n, 1), { color: o.ink, width: o.width || 0.8, alpha: o.alpha == null ? 0.22 : o.alpha, back: o.back == null ? 0.5 : o.back });
  }

  root.QG_SPHERE = Object.freeze({
    v3: Object.freeze({ add, sub, scale, dot, cross, len, unit, rot, sph }),
    frame, capPoint, circlePts, circleThrough, arcAbout, facing, seg, circleOf, ball
  });
})(typeof window !== 'undefined' ? window : globalThis);
