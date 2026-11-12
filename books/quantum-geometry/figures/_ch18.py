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


def hatch_rect(cv, x, y, w, h, color="orange", gap=6.0, width=1.6):
    """Diagonal stripes (45°, rising to the right) filling the rectangle [x, x + w] × [y, y + h].

    The lower chirality component is drawn striped as well as orange, so that it never reads as the
    solid amber reserved for "now".
    """
    c = -h
    while c < w:
        # the line u − v = c in local coordinates (u to the right, v upward from the bottom edge)
        pts = []
        for u in (0.0, w):
            v = u - c
            if 0 <= v <= h:
                pts.append((u, v))
        for v in (0.0, h):
            u = v + c
            if 0 <= u <= w:
                pts.append((u, v))
        pts = sorted(set(pts))
        if len(pts) >= 2 and (pts[0] != pts[-1]):
            (u1, v1), (u2, v2) = pts[0], pts[-1]
            cv.line(x + u1, y + h - v1, x + u2, y + h - v2, color, width)
        c += gap


def hatch_circle(cv, x, y, r, color="orange", gap=6.0, width=1.6):
    """Diagonal stripes (45°, rising to the right) filling the disc of radius r about (x, y)."""
    k = -r * math.sqrt(2) + gap / 2
    while k < r * math.sqrt(2):
        # the line through the disc at signed distance k from the centre, direction (1, 1)/√2 (up-right)
        half = math.sqrt(max(r * r - k * k, 0.0)) - 1.0
        if half > 1:
            mx, my = x + k / math.sqrt(2), y + k / math.sqrt(2)
            d = half / math.sqrt(2)
            cv.line(mx - d, my + d, mx + d, my - d, color, width)
        k += gap
