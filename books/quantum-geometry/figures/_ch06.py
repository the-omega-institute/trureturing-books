"""Shared drawing for the chapter 6 figures (not a figure itself).

Two arrows from one origin in the plane: the ruler A in ink, the state B in amber. The shadow of B on A (the inner
product, the line) is cyan; the parallelogram they span (the outer product, the area) is magenta.
"""

import math


def along(ox, oy, deg, length):
    """The canvas point at ``length`` from ``(ox, oy)`` in direction ``deg`` (counter-clockwise from +x)."""
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def line_and_area(cv, ox, oy, a_deg, b_deg, la, lb, *, shadow=True, area=True, a_color="ink", b_color="now",
                  fill_opacity=0.2):
    """Draw A (length ``la``) and B (length ``lb``) with the cyan shadow of B on A and the magenta parallelogram.
    Returns (tip of A, tip of B, foot of the perpendicular from B onto A)."""
    ta = along(ox, oy, a_deg, la)
    tb = along(ox, oy, b_deg, lb)
    s = lb * math.cos(math.radians(b_deg - a_deg))
    foot = along(ox, oy, a_deg, s)
    if area:
        far = (ta[0] + tb[0] - ox, ta[1] + tb[1] - oy)
        cv.polygon([(ox, oy), ta, far, tb], "area", color="area", width=1.2, fill_opacity=fill_opacity)
    if shadow:
        cv.line(tb[0], tb[1], foot[0], foot[1], "dim", 1.2, dash="4 3")
        cv.right_angle(foot[0], foot[1], a_deg + (180 if s < 0 else 0), 8)
        cv.line(ox, oy, foot[0], foot[1], "line", 6, cap="round")
    cv.arrow(ox, oy, *ta, a_color, 2.4)
    cv.arrow(ox, oy, *tb, b_color, 2.6)
    return ta, tb, foot
