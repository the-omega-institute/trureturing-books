"""双锚点格拉姆走廊：新态与旧锚点共线时相容面积为零，转开以后面积回来。
The two-anchor Gram corridor: when the new state is collinear with the old anchor the compatible
area is zero; turned away from it, the area comes back.

Each panel draws the unit anchor a and a unit candidate b with overlap c = cos θ, and the
parallelogram they span; its area is sin θ and det G₂ = 1 − c² = sin² θ (asserted in _ch35).
"""

import math

from _ch35 import gram2

SIZE = (460, 200)
ALT = {
    "zh": "三组并排。每组一支墨色的单位箭头 a 是旧锚点，一支琥珀色的单位箭头 b 是下一步的候选态，品红的平行四边形是它们张成的面积。"
          "左：c = 1，b 与 a 重合，面积为零，det G₂ = 0。中：c = 1/2，夹角 60°，det G₂ = 3/4。右：c = 0，b 与 a 垂直，面积是整个单位正方形，det G₂ = 1。",
    "en": "Three groups side by side. In each, an ink unit arrow a is the old anchor, an amber unit arrow b is the next "
          "candidate state, and the magenta parallelogram is the area they span. Left: c = 1, b lies on a, the area is "
          "zero and det G₂ = 0. Middle: c = 1/2, an angle of 60°, det G₂ = 3/4. Right: c = 0, b is perpendicular to a, "
          "the area is the whole unit square and det G₂ = 1.",
}

U = 72.0
CASES = [(1.0, "1", "0"), (0.5, "1/2", "3/4"), (0.0, "0", "1")]


def draw(fig):
    oy = 116
    for i, (c, cs, gs) in enumerate(CASES):
        ox = 44 + i * 148
        th = math.acos(c)
        assert abs(gram2(c) - math.sin(th) ** 2) < 1e-12
        assert abs(gram2(c) - {"0": 0.0, "3/4": 0.75, "1": 1.0}[gs]) < 1e-12
        ax, ay = ox + U, oy
        bx, by = ox + U * math.cos(th), oy - U * math.sin(th)
        if c < 1:
            fig.polygon([(ox, oy), (ax, ay), (ax + bx - ox, ay + by - oy), (bx, by)], "area", color="area",
                        width=1.4, fill_opacity=0.22)
        fig.arrow(ox, oy, ax, ay, "ink", 2.6, head=10)
        if c < 1:
            fig.arrow(ox, oy, bx, by, "now", 2.6, head=10)
            fig.text(bx - 6, by - 4, "*b*", size=14, color="now", anchor="end")
        else:
            fig.arrow(ox, oy - 5, ax, ay - 5, "now", 2.6, head=10)
            fig.text(ax - 16, oy - 14, "*b*", size=14, color="now")
        fig.text(ax + 4, oy + 20, "*a*", size=14, color="ink", anchor="end")
        fig.dot(ox, oy, 3.6, "ink")
        cx = ox + 50
        fig.text(cx, oy + 48, "*c* = " + cs, size=14, color="dim", anchor="middle")
        fig.text(cx, oy + 70, "det *G*₂ = " + gs, size=14, color="area", anchor="middle", weight=600)
