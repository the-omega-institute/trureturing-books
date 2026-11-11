"""字符和：不在 H 里的位置，四个单位箭头首尾相接绕回原点；在 H 里的位置，四个箭头排成一条直线，长 4。
The character sum: off H the four unit arrows, head to tail, close up at the origin; on H they line up to length 4.

ZMod 16, H = {0, 4, 8, 12}, annihilator(H) = {0, 4, 8, 12}; the arrows are χ_k(x) = exp(2πi k x / 16)
for k ∈ annihilator(H), at x = 1 (1, i, −1, −i) and at x = 4 (all 1).
"""

import cmath
import math

SIZE = (520, 250)
WRAP = True
ALT = {
    "zh": "两栏，同一把尺子。左栏 x = 1 不在 H 里：四支青色的单位箭头 1、i、−1、−i 首尾相接，围成一个正方形，回到出发的原点，"
          "和为 0。右栏 x = 4 在 H 里：四支青色的单位箭头都指向 +1，首尾相接排成一条直线，和为 4。",
    "en": "Two panels on the same scale. Left, x = 1 is not in H: four cyan unit arrows 1, i, −1, −i, head to tail, go round a "
          "square and return to the origin they started from; the sum is 0. Right, x = 4 is in H: all four cyan unit arrows "
          "point to +1 and, head to tail, line up into a straight line; the sum is 4.",
}

M = 16
ANN = [0, 4, 8, 12]
U = 60   # canvas length of one unit


def chi(k, x):
    return cmath.exp(2j * math.pi * k * x / M)


def chain(p, x0, y0, x):
    """Draw the arrows χ_k(x), k ∈ annihilator(H), head to tail from (x0, y0); return the end point."""
    pts = [(x0, y0)]
    total = 0
    for k in ANN:
        z = chi(k, x)
        total += z
        a, b = pts[-1]
        nxt = (a + U * z.real, b - U * z.imag)
        p.arrow(a, b, nxt[0], nxt[1], "line", 2.6, head=10)
        pts.append(nxt)
    return pts, total


def draw(fig):
    left, right = fig.row([200, 304], 250, gap=16)

    left.text(100, 24, left.t("*x* = 1 ∉ *H*", "*x* = 1 ∉ *H*"), size=15, weight=600, anchor="middle")
    ox, oy = 92, 170
    pts, total = chain(left, ox, oy, 1)
    assert abs(total) < 1e-12
    names = ["1", "*i*", "−1", "−*i*"]
    offs = [(0, 20), (18, 0), (0, -12), (-18, 0)]
    for (a, b), (c, d), s, (dx, dy) in zip(pts, pts[1:], names, offs):
        left.text((a + c) / 2 + dx, (b + d) / 2 + dy, s, size=14, color="line", anchor="middle", middle=True)
    left.dot(ox, oy, 5.2, "ink", ring="bg")
    left.text(ox - 12, oy + 14, left.t("回到原点", "back to 0"), size=13, color="dim", anchor="end", middle=True)
    left.text(100, 232, left.t("和 = 0", "sum = 0"), size=15, anchor="middle", weight=600)

    right.text(152, 24, right.t("*x* = 4 ∈ *H*", "*x* = 4 ∈ *H*"), size=15, weight=600, anchor="middle")
    ox, oy = 30, 132
    pts, total = chain(right, ox, oy, 4)
    assert abs(total - len(ANN)) < 1e-12
    for (a, b), (c, d) in zip(pts, pts[1:]):
        right.text((a + c) / 2, b - 14, "1", size=14, color="line", anchor="middle")
    right.dot(ox, oy, 5.2, "ink", ring="bg")
    right.brace(pts[-1][0], oy + 16, ox, oy + 16, right.t("4 = |*H*^{⊥}|", "4 = |*H*^{⊥}|"), size=14)
    right.text(152, 232, right.t("和 = 4", "sum = 4"), size=15, anchor="middle", weight=600)
