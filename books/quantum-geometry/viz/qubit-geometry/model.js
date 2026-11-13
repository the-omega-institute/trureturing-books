/* ORTHO//QUBIT · the line and the area of one qubit, shared by the page (main.js) and film 001 (its Bloch shots).
   A classic script that defines one global, QG_QUBIT. The ruler A and the state B (unit vectors) have exactly two
   things between them: the collinear shadow A·B = cos θ, whose foot lies on A, and the perpendicular rest of length
   |A∧B| = sin θ. Turned about A, B rides the circle round that foot of radius sin θ: the disk it bounds stands at height
   cos θ on A. Pure functions; no drawing. */
(function (root) {
  'use strict';
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const unit = (a) => { const n = Math.hypot(a[0], a[1], a[2]); return n > 1e-12 ? [a[0] / n, a[1] / n, a[2] / n] : [0, 0, 1]; };
  /** The ruler axes of the page: x̂, ŷ, ẑ and the Hadamard axis ĥ = (x̂ + ẑ)/√2. */
  const AXES = Object.freeze({ x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1], h: [Math.SQRT1_2, 0, Math.SQRT1_2] });
  /** The line and the area of r against the ruler A: the shadow A·r, its foot on A, the rest r − foot and its length. */
  function split(A, r) {
    const line = dot(A, r), foot = [A[0] * line, A[1] * line, A[2] * line], perp = [r[0] - foot[0], r[1] - foot[1], r[2] - foot[2]];
    return { line, foot, perp, area: Math.hypot(perp[0], perp[1], perp[2]) };
  }
  /** The circle r rides when it turns about A, as k + 1 points from r round A (centre: the foot; radius: the area). */
  function circle(A, r, k = 96) {
    const s = split(A, r), e1 = s.area > 1e-12 ? [s.perp[0] / s.area, s.perp[1] / s.area, s.perp[2] / s.area] : unit(cross(A, Math.abs(A[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = cross(A, e1), pts = [];
    for (let i = 0; i <= k; i++) { const t = 2 * Math.PI * i / k, c = s.area * Math.cos(t), d = s.area * Math.sin(t); pts.push([s.foot[0] + c * e1[0] + d * e2[0], s.foot[1] + c * e1[1] + d * e2[1], s.foot[2] + c * e1[2] + d * e2[2]]); }
    return pts;
  }

  root.QG_QUBIT = Object.freeze({ AXES, split, circle });
})(typeof window !== 'undefined' ? window : globalThis);
