"""Shared drawing for the chapter 2 figures (not a figure itself).

The known state a is the ruler: a cyan line through the origin. The state being compared, b, is the
amber arrow. Its shadow c = (a·b)a on the ruler is cyan, the perpendicular remainder b − c is magenta.
Angles are in degrees, counter-clockwise from +x on the page.
"""

import math


def along(ox, oy, deg, length):
    """The canvas point at ``length`` from ``(ox, oy)`` in direction ``deg`` (counter-clockwise from +x)."""
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def shadow(cv, ox, oy, a_deg, theta, L, *, ruler=1.25, back=0.15, width=2.6):
    """The ruler a (direction ``a_deg``), the unit arrow b at ``theta`` from it, the shadow c and the
    perpendicular b − c. Returns (tip of b, foot C, cos θ)."""
    c = math.cos(math.radians(theta))
    b_deg = a_deg + theta
    tip = along(ox, oy, b_deg, L)
    foot = along(ox, oy, a_deg, L * c)
    end = along(ox, oy, a_deg, L * ruler)
    start = along(ox, oy, a_deg, -L * back)
    cv.line(start[0], start[1], end[0], end[1], "line", 1.4)
    cv.line(tip[0], tip[1], foot[0], foot[1], "area", 2.0, dash="5 4")
    cv.right_angle(foot[0], foot[1], a_deg + 180 if c < 0 else a_deg, 9)
    cv.line(ox, oy, foot[0], foot[1], "line", 5.5, cap="round")
    cv.arrow(ox, oy, tip[0], tip[1], "now", width)
    cv.dot(foot[0], foot[1], 4.2, "line", ring="bg")
    cv.dot(ox, oy, 3.0, "dim")
    return tip, foot, c
