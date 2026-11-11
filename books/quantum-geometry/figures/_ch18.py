"""Shared drawing for the chapter 18 figures (not a figure itself).

Phases on a graph are drawn as small dials: a circle with a pointer at the angle arg z. Colours
follow the chapter's lab page (lattice-gauge-loop): the spanning tree and tree paths are cyan, loop
phases and plaquettes are magenta, vertex gauges are violet; edge phase pointers are neutral ink.
The two chirality components of the 2 × 2 model are blue (Z = +1, upper) and orange (Z = −1, lower).
"""

import cmath
import math


def dial(cv, x, y, z, color="ink", r=11.0, ring="dim"):
    """A phase dial at (x, y) whose pointer shows arg z (counter-clockwise from +x)."""
    a = cmath.phase(z)
    cv.circle(x, y, r, color=ring, fill="bg", width=1.2)
    cv.line(x, y, x + (r - 1.5) * math.cos(a), y - (r - 1.5) * math.sin(a), color, 2.4, cap="round")
    cv.dot(x, y, 1.8, color)


def mid_arrow(cv, p, q, color="ink", head=9.0, at=0.5):
    """An arrow head part-way along the segment p → q, showing the edge's direction."""
    x = p[0] + (q[0] - p[0]) * at
    y = p[1] + (q[1] - p[1]) * at
    cv.arrow_head(x + (q[0] - p[0]) * 0.04, y + (q[1] - p[1]) * 0.04,
                  math.degrees(math.atan2(-(q[1] - p[1]), q[0] - p[0])), color, head=head)


def square(cx, cy, h):
    """The corners 0, 1, 2, 3 of a square plaquette, counter-clockwise from the bottom left."""
    return [(cx - h, cy + h), (cx + h, cy + h), (cx + h, cy - h), (cx - h, cy - h)]


def loop_arrow(cv, cx, cy, r, color="area", a0=110, sweep=300, width=2.0, head=8.0):
    """A counter-clockwise circular arrow of radius r around (cx, cy)."""
    pts = [(cx + r * math.cos(math.radians(a0 + sweep * k / 40)), cy - r * math.sin(math.radians(a0 + sweep * k / 40)))
           for k in range(41)]
    cv.curve_arrow(pts, color, width, head=head)


def gauge(u, g, edges):
    """u′(e) = g(t(e)) · u(e) · g(s(e))⁻¹ for edges given as (s, t)."""
    return [g[t] * ue / g[s] for ue, (s, t) in zip(u, edges)]
