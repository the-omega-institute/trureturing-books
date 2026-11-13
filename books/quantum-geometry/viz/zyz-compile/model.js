/* ZYZ//COMPILE · the sweep of one turn, shared by the page (main.js) and film 007 (its three-turn shots).
   A classic script that defines one global, QG_ZYZ. A turn by th about the unit axis u carries the arrow w0: its
   shadow c = (w0·u)u on the axis stays (it commutes with the plane of the turn), and the in-plane part w0 − c, of
   length r, sweeps the fan [c, c + R(w0 − c), …] round it, the area that half-angle sandwich turns through. The
   single-axis turn of a rotor is the arc of the start arrow about its own axis n by its angle φ. Pure functions. */
(function (root) {
  'use strict';
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = (a) => Math.hypot(a[0], a[1], a[2]);
  function rot(v, n, a) {
    const c = Math.cos(a), s = Math.sin(a), d = dot(n, v), x = cross(n, v);
    return [v[0] * c + x[0] * s + n[0] * d * (1 - c), v[1] * c + x[1] * s + n[1] * d * (1 - c), v[2] * c + x[2] * s + n[2] * d * (1 - c)];
  }
  /** The fixed axes of the three turns. */
  const AXIS = Object.freeze({ z: [0, 0, 1], y: [0, 1, 0], x: [1, 0, 0] });
  /** The turn of w0 by th about u, in steps of at most `step` radians: the shadow c, the radius r, the fan (c first,
      then the swept rim), the rim alone (arc) and its middle point (mid). */
  function sweep(w0, u, th, step) {
    const c = scale(u, dot(w0, u)), r = len(sub(w0, c)), n = Math.max(2, Math.ceil(Math.abs(th) / step)), fan = [c];
    for (let i = 0; i <= n; i++) fan.push(add(c, rot(sub(w0, c), u, th * i / n)));
    return { c, r, fan, arc: fan.slice(1), mid: add(c, rot(sub(w0, c), u, th / 2)) };
  }
  /** The single turn of v0 about the unit axis n by phi, in steps of at most `step` radians (at least 8 of them). */
  function arcAbout(v0, n, phi, step) { const m = Math.max(8, Math.ceil(phi / step)), arc = []; for (let i = 0; i <= m; i++) arc.push(rot(v0, n, phi * i / m)); return arc; }

  root.QG_ZYZ = Object.freeze({ AXIS, rot, sweep, arcAbout });
})(typeof window !== 'undefined' ? window : globalThis);
