"""Shared drawing for the chapter 4 figures (not a figure itself).

Every Bloch ball in this chapter is drawn as its x–z cross-section: z up, x to the right, the shell as a
thin line. Channels are affine maps of (x, z); the image of the shell is sampled and drawn as a polygon.
"""

import math


def ball(cv, cx, cy, R, *, axes=True, labels=True, shell="dim"):
    """The unit cross-section centred at (cx, cy) with radius R; returns the map (x, z) -> canvas point."""
    def P(x, z):
        return cx + R * x, cy - R * z

    if axes:
        cv.line(cx - R * 1.12, cy, cx + R * 1.12, cy, "faint", 1.1, dash="3 4")
        cv.line(cx, cy + R * 1.12, cx, cy - R * 1.12, "faint", 1.1, dash="3 4")
    cv.circle(cx, cy, R, color=shell, width=1.4)
    if labels:
        cv.text(cx + R * 1.12 + 4, cy + 5, "*x*", size=13, color="dim")
        cv.text(cx + 6, cy - R * 1.12 + 2, "*z*", size=13, color="dim")
    return P


def shell_points(n=120):
    return [(math.cos(2 * math.pi * k / n), math.sin(2 * math.pi * k / n)) for k in range(n)]


def image(cv, P, f, *, color="line", fill_opacity=0.2, width=1.8):
    """Draw the image of the shell under the affine map f(x, z) -> (x', z') as a filled outline."""
    pts = [P(*f(x, z)) for x, z in shell_points()]
    cv.polygon(pts, color, color=color, width=width, fill_opacity=fill_opacity)
