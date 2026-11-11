"""Shared drawing for the chapter 1 figures (not a figure itself).

Arrows in the plane, angles counted counter-clockwise from +x in degrees. Colours follow the book:
the arrow used as a ruler and the inner product it reads are cyan, the arrow being read is amber,
rotations are violet.
"""

import math


def along(ox, oy, deg, length):
    """The canvas point at ``length`` from ``(ox, oy)`` in direction ``deg`` (counter-clockwise from +x)."""
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def title(p, zh, en):
    """A one-line panel title, centred at the top."""
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def ray(cv, ox, oy, deg, length, color="ink", width=2.2, **kw):
    """An arrow from the origin; returns its tip."""
    tip = along(ox, oy, deg, length)
    cv.arrow(ox, oy, tip[0], tip[1], color, width, **kw)
    return tip
