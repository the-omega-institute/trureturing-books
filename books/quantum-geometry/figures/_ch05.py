"""Shared drawing for the chapter 5 figures (not a figure itself).

Plane pictures put the origin at a canvas point and measure angles counter-clockwise from +x.
Colours follow the book: the state is amber, the unit bivector (an area) is magenta, a turn and the
rotor that makes it are violet, lines and shadows are cyan.
"""

import math

from tbook import figkit


def along(ox, oy, deg, length):
    """The canvas point at ``length`` from ``(ox, oy)`` in direction ``deg`` (counter-clockwise from +x)."""
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def turn_arc(cv, ox, oy, r, a0, a1, color="axis", width=1.8, *, head=8, gap=4, **kw):
    """A curved arrow on the circle of radius ``r`` from ``a0`` to ``a1`` degrees (shortened by ``gap``)."""
    s = 1 if a1 > a0 else -1
    b0, b1 = a0 + s * gap, a1 - s * gap
    n = max(8, int(abs(b1 - b0) / 3))
    pts = [along(ox, oy, b0 + (b1 - b0) * k / n, r) for k in range(n + 1)]
    cv.curve_arrow(pts, color, width, head=head, **kw)


def times_bivector(v):
    """Right multiplication by I = e₁e₂ of a plane vector v = x e₁ + y e₂: e₁I = e₂ and e₂I = −e₁."""
    x, y = v
    return (-y, x)


def rotor_turn(sp, axis, start, theta, *, state="now", n=60):
    """On sphere ``sp``: the path of ``start`` turned about ``axis`` by ``theta`` degrees, as an amber arrow along the
    sphere, with the start as a grey dot and the end as an amber dot. Returns the end point."""
    pts = [figkit.rotate(start, axis, theta * k / n) for k in range(n + 1)]
    sp.curve(pts, state, 2.2)
    (xa, ya), (xb, yb) = sp.xy(pts[-2]), sp.xy(pts[-1])
    sp.cv.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), state, head=8)
    sp.dot(start, "dim", 3.6, ring="bg")
    sp.dot(pts[-1], state, 4.4, ring="bg")
    return pts[-1]
