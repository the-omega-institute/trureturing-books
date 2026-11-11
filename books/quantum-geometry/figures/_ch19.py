"""Shared drawing for the chapter 19 figures (not a figure itself).

The width-three bridge graph: tensor M on the left, tensor N on the right, three parallel bridges
r = 0, 1, 2 between them. Output legs a (from M) and d (from N) point up, input legs b (from M) and
c (from N) point down, so flow(M, N) maps the bottom legs b × c to the top legs a × d. The three
candidate cuts are a line across the top legs (capacity ad), a line across the bottom legs (bc), and
a diagonal through a, the three bridges and c (3ac): it puts M with b on one side, N with d on the
other.
"""

import math


def qmincut(a, b, c, d):
    """QMinCut(a, b, c, d) = min(3ac, min(ad, bc)) as in the chapter."""
    return min(3 * a * c, min(a * d, b * c))


def bridge(cv, cx, cy, *, gap=124, leg=50, dims=None, bridge_color="ink", node_color="ink", size=14):
    """Draw the bridge graph centred at (cx, cy); returns the geometry for the cuts."""
    mx, nx = cx - gap / 2, cx + gap / 2
    hw, hh = 17, 24
    for k in (-1, 0, 1):
        y = cy + 11 * k
        cv.line(mx + hw, y, nx - hw, y, bridge_color, 2.2)
    for x, (up, down) in ((mx, ("a", "b")), (nx, ("d", "c"))):
        cv.line(x, cy - hh, x, cy - hh - leg, "ink", 2.2)
        cv.line(x, cy + hh, x, cy + hh + leg, "ink", 2.2)
        cv.dot(x, cy - hh - leg, 3.2, "ink")
        cv.dot(x, cy + hh + leg, 3.2, "ink")
        lab_up = f"*{up}*" if dims is None else f"*{up}* = {dims[up]}"
        lab_dn = f"*{down}*" if dims is None else f"*{down}* = {dims[down]}"
        cv.text(x, cy - hh - leg - 10, lab_up, size=size, color="dim", anchor="middle")
        cv.text(x, cy + hh + leg + 10 + size * 0.7, lab_dn, size=size, color="dim", anchor="middle")
    for x, name in ((mx, "*M*"), (nx, "*N*")):
        cv.rect(x - hw, cy - hh, 2 * hw, 2 * hh, color=node_color, fill="panel", width=2.0, rx=5)
        cv.text(x, cy, name, size=16, color="ink", anchor="middle", middle=True, weight=600)
    return {"mx": mx, "nx": nx, "cy": cy, "hh": hh, "leg": leg, "hw": hw}


def cut_lines(g, pad=34):
    """End points of the three candidate cuts: top (ad), bottom (bc), inner diagonal (3ac)."""
    mx, nx, cy, hh, leg = g["mx"], g["nx"], g["cy"], g["hh"], g["leg"]
    ytop = cy - hh - leg * 0.55
    ybot = cy + hh + leg * 0.55
    top = ((mx - pad, ytop), (nx + pad, ytop))
    bot = ((mx - pad, ybot), (nx + pad, ybot))
    # the diagonal runs from above-left of M to below-right of N, crossing leg a, the bridges and leg c
    dy = hh + leg * 0.75
    inner = ((mx - 14, cy - dy), (nx + 14, cy + dy))
    (x1, y1), (x2, y2) = inner
    for x, lo, hi in ((mx, cy - hh - leg, cy - hh), (nx, cy + hh, cy + hh + leg)):
        y = y1 + (y2 - y1) * (x - x1) / (x2 - x1)
        assert lo < y < hi                       # it crosses leg a and leg c, not a tensor
    at = lambda x: y1 + (y2 - y1) * (x - x1) / (x2 - x1)
    assert at(mx + g["hw"]) < cy - hh and at(nx - g["hw"]) > cy + hh   # it passes between the tensors
    return top, bot, inner


def envelope(d, a=2, b=3, c=2):
    """ln QMinCut along the slice a = 2, b = 3, c = 2 as a function of the leg dimension d (real)."""
    return min(math.log(3 * a * c), math.log(a * d), math.log(b * c))
