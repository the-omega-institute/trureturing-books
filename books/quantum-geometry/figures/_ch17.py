"""Shared drawing for the chapter 17 figures (not a figure itself).

A spacetime diagram in natural units: the space coordinate x runs to the right, time t runs up, and
both use the same scale, so light lines sit at 45°. Colours follow the chapter's lab page
(rapidity-lightcone): the light cone is ink, the Minkowski side (hyperbolas, the bent worldline) is
cyan, the Euclidean circle is magenta, and amber is kept for the current event and the boosted axes.
"""

import math


class Spacetime:
    """Map event coordinates (x, t) onto the canvas: origin at (ox, oy), ``s`` pixels per unit."""

    def __init__(self, cv, ox, oy, s):
        self.cv, self.ox, self.oy, self.s = cv, ox, oy, s

    def P(self, x, t):
        return self.ox + self.s * x, self.oy - self.s * t

    def axes(self, x0, x1, t0, t1, *, labels=True, color="dim"):
        cv = self.cv
        a, b = self.P(x0, 0), self.P(x1, 0)
        cv.arrow(a[0], a[1], b[0], b[1], color, 1.3, head=7)
        a, b = self.P(0, t0), self.P(0, t1)
        cv.arrow(a[0], a[1], b[0], b[1], color, 1.3, head=7)
        if labels:
            p = self.P(x1, 0)
            cv.text(p[0] - 2, p[1] + 18, "*x*", size=14, color=color, anchor="end")
            p = self.P(0, t1)
            cv.text(p[0] + 9, p[1] + 6, "*t*", size=14, color=color)

    def cone(self, r, *, color="ink", width=1.5, dash=None, lower=True):
        """The two light lines t = ±x out to |x| = r (only the future half unless ``lower``)."""
        for sgn in (1, -1):
            a = self.P(-sgn * r, -r) if lower else self.P(0, 0)
            b = self.P(sgn * r, r)
            self.cv.line(a[0], a[1], b[0], b[1], color, width, dash=dash)

    def hyperbola(self, tau, x0, x1, color="line", width=2.2, **kw):
        """The future branch t = √(τ² + x²) of t² − x² = τ²."""
        self.cv.curve(lambda u: self.P(u, math.sqrt(tau * tau + u * u)), x0, x1, 120, color, width, **kw)

    def line(self, a, b, color="ink", width=1.6, **kw):
        p, q = self.P(*a), self.P(*b)
        self.cv.line(p[0], p[1], q[0], q[1], color, width, **kw)

    def arrow(self, a, b, color="ink", width=2.0, **kw):
        p, q = self.P(*a), self.P(*b)
        self.cv.arrow(p[0], p[1], q[0], q[1], color, width, **kw)

    def dot(self, x, t, r=4.2, color="now", **kw):
        p = self.P(x, t)
        self.cv.dot(p[0], p[1], r, color, **kw)


def q(x, t):
    """The Minkowski quadratic form in 1 + 1 dimensions, t² − x²."""
    return t * t - x * x


def ticks(st, a, b, n, color="line", size=5.0):
    """Divide the straight segment from event a to event b into ``n`` equal proper-time steps (inner marks only)."""
    (xa, ta), (xb, tb) = a, b
    dx, dt = xb - xa, tb - ta
    length = math.hypot(dx, dt)
    nx, nt = -dt / length, dx / length          # a unit normal in the diagram
    for k in range(1, n):
        x, t = xa + dx * k / n, ta + dt * k / n
        p = st.P(x + nx * size / st.s, t + nt * size / st.s)
        r = st.P(x - nx * size / st.s, t - nt * size / st.s)
        st.cv.line(p[0], p[1], r[0], r[1], color, 1.6, cap="round")
