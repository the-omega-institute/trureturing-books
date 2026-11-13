/* ORTHO//SAMSARA · the rapidity staircase, shared by the page (main.js) and film 009 (its staircase shot).
   A classic script that defines one global, QG_SAMSARA. θ* is the root of cos θ = θ; the rapidity of an angle is
   η = gd⁻¹(θ) = ln tan(θ/2 + π/4), so sin θ = tanh η and cos θ = sech η. The page draws the open unit disk: a rapidity
   η sits at Beltrami–Klein radius r = tanh η (chords) or Poincaré radius ρ = tanh(η/2) (orthogonal arcs). The disk is
   the slice t = 1 of the light cone t² = x² + y²: the point of the hyperboloid t² − x² − y² = 1 at rapidity η,
   (sinh η cos φ, sinh η sin φ, cosh η), seen from the origin, crosses the plane t = 1 at Klein radius tanh η; the rim
   of the disk is where the cone crosses it. Pure functions; no drawing. */
(function (root) {
  'use strict';
  const HALF_PI = Math.PI / 2;
  /** θ*: the root of cos θ = θ (Newton from 0.74). */
  const THETA_STAR = (() => { let x = 0.74; for (let i = 0; i < 40; i++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const gdInv = (th) => Math.log(Math.tan(th / 2 + Math.PI / 4));
  const gd = (eta) => 2 * Math.atan(Math.exp(eta)) - HALF_PI;
  const ETA0 = gdInv(THETA_STAR);
  /** One rapidity: both radii, both proper-time rates and both gaps, the gaps without forming 1 − tanh. */
  function at(eta) {
    const rBK = Math.tanh(eta), rhoP = Math.tanh(eta / 2);
    const gapBK = 2 / (Math.exp(2 * eta) + 1), gapP = 2 / (Math.exp(eta) + 1);
    // 1 − r² and 1 − ρ² written as (1 − r)(1 + r) from the exact gaps, so that they keep their digits near the rim
    return {
      eta, theta: gd(eta), delta: 2 * Math.atan(Math.exp(-eta)), rBK, rhoP,
      dtdtBK: Math.sqrt(gapBK * (2 - gapBK)), dtdtP: gapP * (2 - gapP) / (1 + rhoP * rhoP), sech: 1 / Math.cosh(eta),
      gapBK, gapP
    };
  }
  /** The radial map from Klein (μ = 0) to Poincaré (μ = 1): a Klein radius r goes to (1 − μ)r + μ r/(1 + √(1 − r²)). */
  const morphR = (r, mu) => (1 - mu) * r + mu * r / (1 + Math.sqrt(Math.max(0, 1 - r * r)));
  const morphP = (p, mu) => { const q = Math.hypot(p[0], p[1]); if (q < 1e-15) return [0, 0]; const f = morphR(Math.min(q, 1), mu) / q; return [p[0] * f, p[1] * f]; };
  /** The gap to the rim of a Klein radius r (given its own exact gap gK = 1 − r) after the morph. */
  function morphGap(r, gK, mu) {
    const rho = r / (1 + Math.sqrt(Math.max(0, gK * (2 - gK))));     // 1 − r² = gK(2 − gK), exactly
    const gP = 1 - rho;
    return (1 - mu) * gK + mu * gP;
  }
  /** Klein radius of the angle θ: sin θ; and its exact gap 1 − sin θ = 2 sin²(π/4 − θ/2). */
  const kleinOfTheta = (th) => ({ r: Math.sin(th), g: 2 * Math.sin(Math.PI / 4 - th / 2) ** 2 });
  /** The geodesic perpendicular to the ray (angle 0) through Klein radius r: a chord x = r, morphed. */
  function wall(r, mu, n) {
    const h = Math.sqrt(Math.max(0, 1 - r * r)), pts = [];
    const N = n || 72;
    for (let i = 0; i <= N; i++) { const y = h * Math.sin(-HALF_PI + Math.PI * i / N); pts.push(morphP([r, y], mu)); }
    return pts;
  }
  /** The point of the hyperboloid t² − x² − y² = 1 (t up) at rapidity η and bearing φ. */
  const hyperboloid = (eta, phi) => [Math.sinh(eta) * Math.cos(phi), Math.sinh(eta) * Math.sin(phi), Math.cosh(eta)];
  /** Where the ray from the origin through that point crosses the plane t = 1: the Klein disk, at radius tanh η. */
  const klein = (eta, phi) => [Math.tanh(eta) * Math.cos(phi), Math.tanh(eta) * Math.sin(phi), 1];
  /** The point of the light cone t = √(x² + y²) at height t and bearing φ. */
  const cone = (t, phi) => [t * Math.cos(phi), t * Math.sin(phi), t];

  root.QG_SAMSARA = Object.freeze({ THETA_STAR, gdInv, gd, ETA0, at, morphR, morphP, morphGap, kleinOfTheta, wall, hyperboloid, klein, cone });
})(typeof window !== 'undefined' ? window : globalThis);
