"""同一个四分之一转，在两个参考系里：实验室系里是绕 z 轴的螺旋，旋转系里是一段经线（第十一章 §共振微波与脉冲面积）。
One quarter-turn in two frames: a spiral about z in the lab, a single meridian arc in the rotating frame (chapter 11).

Rotating frame: the north pole turned about X by the pulse area θ(t), from 0 to π/2 (rem-rwa-pulse-area-literature).
Lab frame: the same vector turned back about +z by the carrier angle ω₀t. The chapter's pulse holds 125 carrier
cycles (25 ns at 5 GHz, asserted); the picture draws 6 so that the turns can be told apart.
"""

import math

from tbook import figkit

from _ch11 import lab_from_rot, rot_path

SIZE = (520, 280)
ALT = {
    "zh": "两颗同样大小的布洛赫球。左边是实验室系：琥珀色的路径从北极出发，一圈圈绕着紫色的竖直 z 轴盘旋下降，最后落到赤道上，"
          "是一条螺旋。右边是旋转系：同一个脉冲里，琥珀色的态只沿一条经线从北极走到赤道，扫过一块四分之一圆的品红扇形，"
          "转轴是紫色的水平 X 轴。实际的脉冲里有 125 个载频周期，图中只画了 6 圈。",
    "en": "Two Bloch spheres of the same size. Left, the lab frame: the amber path leaves the north pole and spirals down "
          "around the violet vertical z axis, turn after turn, until it reaches the equator. Right, the rotating frame: during "
          "the same pulse the amber state only runs down one meridian from the north pole to the equator, sweeping a magenta "
          "quarter-disc sector, about the violet horizontal X axis. The real pulse holds 125 carrier cycles; the picture draws "
          "only 6.",
}

CYCLES_REAL = 25e-9 * 5e9          # 25 ns at 5 GHz
assert abs(CYCLES_REAL - 125) < 1e-9
TURNS = 6                           # drawn


def draw(fig):
    R = 96
    for i, (zh, en) in enumerate((("实验室系", "lab frame"), ("旋转系", "rotating frame"))):
        cx = 130 + 260 * i
        fig.text(cx, 24, fig.t(zh, en), size=14, weight=600, anchor="middle")
    north = (0.0, 0.0, 1.0)
    end_rot = rot_path(math.pi / 2)

    # ---- lab frame
    sp = fig.sphere(130, 150, R, el=24)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.2)
    sp.segment((0, 0, -1.0), (0, 0, 1.22), "axis", 2.2)
    sp.label((0, 0, 1), "*z*", scale=1.3, size=14, color="axis", anchor="middle", middle=True)
    n = 1400
    pts = []
    for k in range(n + 1):
        s = k / n
        pts.append(lab_from_rot(rot_path(math.pi / 2 * s), 2 * math.pi * TURNS * s))
    sp.curve(pts, "now", 1.8, back_opacity=0.5)
    (xa, ya), (xb, yb) = sp.xy(pts[-12]), sp.xy(pts[-1])
    fig.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "now", head=8)
    sp.dot(north, "dim", 4.0, ring="bg")
    sp.dot(pts[-1], "now", 4.6, ring="bg")
    fig.text(130, 272, fig.t("绕 *z* 转了很多圈", "many turns about *z*"), size=13, color="dim", anchor="middle")

    # ---- rotating frame
    sp = fig.sphere(390, 150, R, el=24)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.2)
    sp.segment((0, 0, -1.0), (0, 0, 1.0), "faint", 1.2, dash="3 3")
    sector = [(0.0, 0.0, 0.0)] + [rot_path(math.pi / 2 * k / 40) for k in range(41)]
    fig.polygon([sp.xy(v) for v in sector], "area", fill_opacity=0.2, color="area", width=1.2)
    sp.segment((-1.25, 0, 0), (1.25, 0, 0), "axis", 2.2)
    sp.label((1, 0, 0), "*X*", scale=1.38, size=14, color="axis", anchor="middle", middle=True)
    arc = [rot_path(math.pi / 2 * k / 60) for k in range(61)]
    sp.curve(arc, "now", 2.4)
    (xa, ya), (xb, yb) = sp.xy(arc[-3]), sp.xy(arc[-1])
    fig.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "now", head=9)
    sp.arrow(end_rot, "now", 2.2, head=8)
    sp.dot(north, "dim", 4.0, ring="bg")
    sp.label(end_rot, "−*y*", dx=4, dy=18, size=13, color="dim", middle=True)
    mid = rot_path(math.pi / 4)
    sp.label(mid, "π/2", scale=0.5, dx=-4, size=14, color="area", anchor="middle", middle=True, halo=True)
    fig.text(390, 272, fig.t("一段经线", "one meridian arc"), size=13, color="dim", anchor="middle")
