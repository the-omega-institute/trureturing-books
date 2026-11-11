"""Shared drawing for the chapter 3 figures (not a figure itself).

A state arrow and its shadow on a measurement line through the origin, drawn in the plane.
Colours follow the book: the line and the shadow on it are cyan, the perpendicular part that the
projection removes is magenta, the state being projected is amber.
"""

import math


def along(ox, oy, deg, length):
    """The canvas point at ``length`` from ``(ox, oy)`` in direction ``deg`` (counter-clockwise from +x)."""
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def shadow(cv, ox, oy, line_deg, vec_deg, length, line_len, *, state="now", width=2.4):
    """Draw the measurement line, the state arrow and its shadow; return (tip, foot, shadow length)."""
    s = length * math.cos(math.radians(vec_deg - line_deg))
    tip = along(ox, oy, vec_deg, length)
    foot = along(ox, oy, line_deg, s)
    end = along(ox, oy, line_deg, line_len)
    back = along(ox, oy, line_deg, -line_len * 0.12)
    cv.line(back[0], back[1], end[0], end[1], "line", 1.4)
    cv.line(tip[0], tip[1], foot[0], foot[1], "area", 1.6, dash="4 3")
    cv.right_angle(foot[0], foot[1], line_deg + 180 if s < 0 else line_deg, 8)
    cv.line(ox, oy, foot[0], foot[1], "line", 5, cap="round")
    cv.arrow(ox, oy, tip[0], tip[1], state, width)
    cv.dot(foot[0], foot[1], 3.6, "line", ring="bg")
    cv.dot(ox, oy, 3.0, "dim")
    return tip, foot, s
