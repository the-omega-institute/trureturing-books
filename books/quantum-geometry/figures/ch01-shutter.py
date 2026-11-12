"""连续的方向经过一道二结果快门，只剩两个记录 +1 与 −1（第一章 §1.2，示意）。
A continuous direction passes an ideal two-outcome shutter and only two records come out, +1 and −1
(chapter 1, §1.2; a schematic).

The wheel carries the state's direction, which may stop at any angle; the shutter splits along e₃
into an upper and a lower channel. Nothing here is computed beyond the geometry of the drawing.
"""

import math

from _ch01 import along

SIZE = (450, 230)
ALT = {
    "zh": "示意图。左边是一只飞轮，轮缘一圈细刻度表示方向可以停在任意角度，琥珀色的箭头是此刻的方向。"
          "中间是一道竖直的快门，沿 e₃ 劈成上下两条通道。右边只有两个出口：上通道记作 +1，下通道记作 −1，各是一个青色的点。",
    "en": "A schematic. On the left a wheel whose rim is ticked all the way round: the direction can stop at any angle, and "
          "the amber arrow is the direction now. In the middle a vertical shutter splits along e₃ into an upper and a lower "
          "channel. On the right there are only two exits: the upper channel is recorded as +1 and the lower as −1, each a "
          "cyan dot.",
}


def draw(fig):
    t = fig.t
    cx, cy, R = 84, 124, 66
    # the wheel: a continuum of directions
    fig.circle(cx, cy, R, color="dim", width=1.5, fill="cyan", fill_opacity=0.04)
    for k in range(72):
        a = k * 5
        p = along(cx, cy, a, R)
        q = along(cx, cy, a, R - (9 if k % 6 == 0 else 5))
        fig.line(q[0], q[1], p[0], p[1], "faint", 1.1)
    tip = along(cx, cy, 90 - 52, R - 4)
    fig.arrow(cx, cy, tip[0], tip[1], "now", 2.6)
    fig.dot(cx, cy, 3.0, "dim")
    # a hint of turning
    arc = [along(cx, cy, a, R + 12) for a in range(70, 140, 4)]
    fig.curve_arrow(arc, "dim", 1.4, head=7)
    fig.text(cx, cy + R + 32, t("方向：任意角度", "any direction"), size=14, color="dim", anchor="middle")

    # the beam into the shutter
    sx, sw, top, bot = 200, 42, 58, 190
    fig.arrow(cx + R + 10, cy, sx - 6, cy, "dim", 1.6, head=8)
    # the shutter: a box with the e3 axis drawn through it
    fig.rect(sx, top, sw, bot - top, color="ink", fill="panel", width=1.6, rx=4)
    fig.arrow(sx + sw / 2, bot - 10, sx + sw / 2, top + 10, "line", 1.6, head=8)
    fig.text(sx + sw / 2 + 8, top - 10, "*e*_{3}", size=15, color="line")
    fig.text(sx + sw / 2, cy + R + 32, t("快门", "shutter"), size=14, color="dim", anchor="middle")

    # two exits, nothing in between
    ex = 372
    up, dn = cy - 62, cy + 62
    fig.curve_arrow([(sx + sw, cy - 18), (sx + sw + 44, cy - 30), (ex - 14, up)], "line", 2.0, head=8)
    fig.curve_arrow([(sx + sw, cy + 18), (sx + sw + 44, cy + 30), (ex - 14, dn)], "line", 2.0, head=8)
    fig.dot(ex, up, 6.5, "line", ring="bg")
    fig.dot(ex, dn, 6.5, "line", ring="bg")
    fig.text(ex + 14, up, "+1", size=17, color="line", weight=600, middle=True)
    fig.text(ex + 14, dn, "−1", size=17, color="line", weight=600, middle=True)
    fig.text(ex + 6, cy, t("只有两个记录", "two records only"), size=14, color="dim", anchor="middle", middle=True)
