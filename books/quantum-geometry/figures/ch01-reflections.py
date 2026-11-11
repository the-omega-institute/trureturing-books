"""同两面镜子，换一下先后，合成的转动就反向：XZ 逆时针 90°，ZX 顺时针 90°（第一章 §1.2）。
The same two mirrors in the other order turn the other way: XZ is a quarter turn counter-clockwise,
ZX a quarter turn clockwise (chapter 1, §1.2).

Z reflects the real plane in the horizontal axis, X in the 45° diagonal. The script applies the two
matrices to the starting arrow and checks that XZ v and ZX v are v turned by +90° and −90°.
"""

import math

from _ch01 import along

SIZE = (560, 290)
WRAP = True
ALT = {
    "zh": "两幅同样的实平面图，各有两面镜子：水平的 Z 镜与 45° 斜线上的 X 镜。琥珀色的箭头 v 都从 20° 出发。"
          "左图先照 Z 镜（虚线箭头 Zv），再照 X 镜，到达 110°，紫色的弧标出逆时针转了 +90°。"
          "右图先照 X 镜（虚线箭头 Xv），再照 Z 镜，到达 −70°，紫色的弧标出顺时针转了 −90°。两种结果正好相差 180°。",
    "en": "Two identical drawings of the real plane, each with two mirrors: the horizontal Z mirror and the X mirror on the 45° "
          "diagonal. The amber arrow v starts at 20° in both. On the left it meets Z first (dashed arrow Zv), then X, and ends "
          "at 110°: a violet arc marks a turn of +90°, counter-clockwise. On the right it meets X first (dashed arrow Xv), then "
          "Z, and ends at −70°: the violet arc marks −90°, clockwise. The two results differ by 180°.",
}

X = ((0, 1), (1, 0))
Z = ((1, 0), (0, -1))


def mul(m, v):
    return (m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1])


def deg(v):
    return math.degrees(math.atan2(v[1], v[0]))


def panel(p, first, second, names, turn):
    ox, oy, L = 140, 150, 100
    p.text(p.width / 2, 22, p.t(*names), size=14, weight=600, anchor="middle")
    # the mirrors
    p.line(ox - L * 1.2, oy, ox + L * 1.2, oy, "dim", 1.6)
    a = along(ox, oy, 45, L * 1.2)
    b = along(ox, oy, 225, L * 1.05)
    p.line(b[0], b[1], a[0], a[1], "dim", 1.6)
    p.text(ox - L * 1.2, oy - 8, p.t("Z 镜", "Z mirror"), size=13, color="dim")
    p.text(b[0] + 12, b[1] + 2, p.t("X 镜", "X mirror"), size=13, color="dim")

    v = (math.cos(math.radians(20)), math.sin(math.radians(20)))
    w = mul(first[1], v)
    u = mul(second[1], w)
    assert abs(deg(u) - (20 + turn)) < 1e-9
    # the dashed intermediate arrow and the final arrow
    mid = along(ox, oy, deg(w), L)
    end = along(ox, oy, deg(u), L)
    p.arrow(ox, oy, mid[0], mid[1], "ink", 1.6, dash="5 4")
    p.arrow(ox, oy, end[0], end[1], "ink", 2.4)
    start = along(ox, oy, 20, L)
    p.arrow(ox, oy, start[0], start[1], "now", 2.6)
    p.dot(ox, oy, 3.0, "dim")

    lab = along(ox, oy, 20, L + 14)
    p.text(lab[0], lab[1] + 4, "*v*", size=15, color="now")
    lm = along(ox, oy, deg(w), L + 16)
    p.text(lm[0], lm[1] + 5, first[0] + "*v*", size=14, color="dim", anchor="middle", halo=True)
    le = along(ox, oy, deg(u), L + 16)
    p.text(le[0], le[1] + 5, second[0] + first[0] + "*v*", size=15, anchor="middle", halo=True)

    # the composed turn
    r = 44
    pts = [along(ox, oy, 20 + turn * k / 30, r) for k in range(31)]
    p.curve_arrow(pts, "violet", 2.0, head=8)
    sign = "+90°" if turn > 0 else "−90°"
    q = along(ox, oy, 20 + turn / 2, r + 22)
    p.text(q[0], q[1], sign, size=15, color="violet", weight=600, anchor="middle", middle=True, halo=True)


def draw(fig):
    one, two = fig.row([272, 272], 290, gap=16)
    panel(one, ("*Z*", Z), ("*X*", X), ("先 Z 后 X：XZ", "Z first, then X: XZ"), 90)
    panel(two, ("*X*", X), ("*Z*", Z), ("先 X 后 Z：ZX", "X first, then Z: ZX"), -90)
