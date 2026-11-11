"""第一章地图：一子没有方向，三子多出一个外部 C，两子互为尺规并只读出 +1 或 −1。
Chapter 1 at a glance: one arrow alone has no direction, a third point C is surplus, and two arrows
measure each other, read out as +1 or −1.

Panel I turns one arrow about its tail: every copy looks the same, so no angle can be named.
Panel II puts an external frame C behind two arrows; the angle between them does not use it.
Panel III takes A as the ruler: the angle θ is read against A, and an ideal two-outcome reading only
reports the two ends of A's line.
"""

import math

from _ch01 import along, ray, title

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：虚空里只有一支箭头 A，它绕起点转到哪里，灰色的虚线副本都一模一样，标着 θ = ?。"
          "第二栏：两支箭头 x、y 身后立着一套灰色虚线的外部坐标架 C，两支箭头之间的夹角不需要它。"
          "第三栏：青色的箭头 A 当尺子，它所在的直线两端标着 +1 与 −1；琥珀色的箭头 B 与 A 张开夹角 θ。",
    "en": "Three panels. Panel I: a single arrow A in empty space; wherever it is turned about its tail, the grey dashed copies "
          "look the same, marked θ = ?. Panel II: behind two arrows x and y stands a grey dashed external frame C; "
          "the angle between the two arrows does not need it. Panel III: the cyan arrow A is the ruler, the line it "
          "lies on is marked +1 and −1 at its two ends, and the amber arrow B opens an angle θ with A.",
}


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: one arrow alone
    title(one, "I　一子：没有方向", "I  one: no direction")
    ox, oy, L = 118, 150, 84
    for a in (10, 150, 215, 300):
        ray(one, ox, oy, a, L, "dim", 1.5, dash="4 4", opacity=0.6)
    ray(one, ox, oy, 70, L, "ink", 2.6)
    arc = [along(ox, oy, a, 34) for a in range(76, 176, 5)]
    one.curve_arrow(arc, "dim", 1.4, head=7)
    tip = along(ox, oy, 70, L)
    one.text(tip[0] + 8, tip[1] + 6, "*A*", size=16)
    one.text(ox, 252, "*θ* = ?", size=16, color="dim", anchor="middle")

    # ---- II: a surplus external frame
    title(two, "II　三子：C 多余", "II  three: C is surplus")
    cx, cy = 50, 210
    two.arrow(cx, cy, cx + 172, cy, "dim", 1.3, head=7, dash="4 4")
    two.arrow(cx, cy, cx, cy - 166, "dim", 1.3, head=7, dash="4 4")
    two.text(cx - 8, cy + 18, "*C*", size=16, color="dim", anchor="middle")
    ox, oy, L = 104, 178, 100
    ray(two, ox, oy, 18, L, "ink", 2.4)
    ray(two, ox, oy, 78, L, "ink", 2.4)
    two.angle(ox, oy, 36, 18, 78, "*θ*", color="line", size=15, width=1.8)
    p = along(ox, oy, 18, L)
    q = along(ox, oy, 78, L)
    two.text(p[0] - 2, p[1] + 20, "*x*", size=15, anchor="middle")
    two.text(q[0] + 10, q[1] + 6, "*y*", size=15)

    # ---- III: two arrows, a ruler and two readings
    title(three, "III　两子：互为尺规", "III  two: each the other's ruler")
    ox, oy, L = 118, 150, 86
    up, dn = along(ox, oy, 90, L + 6), along(ox, oy, 270, L - 10)
    three.line(dn[0], dn[1], up[0], up[1], "line", 1.4)
    ray(three, ox, oy, 90, L - 14, "line", 2.8)
    ray(three, ox, oy, 90 - 55, L - 14, "now", 2.6)
    three.angle(ox, oy, 30, 35, 90, "*θ*", color="line", size=15, width=1.8)
    three.dot(up[0], up[1], 5.5, "line", ring="bg")
    three.dot(dn[0], dn[1], 5.5, "line", ring="bg")
    three.text(up[0] - 12, up[1] + 6, "+1", size=15, color="line", weight=600, anchor="end")
    three.text(dn[0] - 12, dn[1] + 6, "−1", size=15, color="line", weight=600, anchor="end")
    a = along(ox, oy, 90, L - 14)
    three.text(a[0] + 10, a[1] + 14, "*A*", size=15, color="line")
    b = along(ox, oy, 35, L - 14)
    three.text(b[0] + 8, b[1] + 4, "*B*", size=15, color="now")
    assert abs(math.cos(math.radians(55)) - math.cos(math.radians(90 - 35))) < 1e-12
