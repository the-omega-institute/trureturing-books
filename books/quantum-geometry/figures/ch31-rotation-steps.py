"""一步一个脚印：一致放大每步只把态转过 2θ，从失败轴 B 走向成功轴 W，不能跳步。
One step at a time: each round of uniform amplification turns the state by exactly 2θ, from the
failure axis B towards the success axis W; no step can be skipped.

Drawn in the plane of W (up) and B (right) for p = sin²θ with θ = π/14 (p ≈ 0.0495): after n rounds
the state is sin((2n + 1)θ) W + cos((2n + 1)θ) B, so it sits at the angle (2n + 1)θ from B. For this θ
the state reaches W exactly at n = 3 (asserted in _ch31). The violet arcs are the 2θ turns.
"""

import math

from _ch31 import P_OVERLAP, THETA, rotation

SIZE = (440, 350)
ALT = {
    "zh": "一个四分之一圆，水平轴是失败方向 B，竖直轴是成功方向 W。从 B 上方 θ 处出发，四支箭头依次指向 θ、3θ、5θ、7θ，"
          "标着 n = 0、1、2，最后一支琥珀色的箭头 n = 3 正好落在 W 上。每两支相邻箭头之间有一段紫色的弧，都是 2θ。",
    "en": "A quarter circle; the horizontal axis is the failure direction B, the vertical axis the success direction W. "
          "Starting θ above B, four arrows point at θ, 3θ, 5θ and 7θ, labelled n = 0, 1, 2; the last, amber arrow "
          "n = 3 lands exactly on W. Between neighbouring arrows a violet arc marks each turn of 2θ.",
}


def draw(fig):
    t = fig.t
    ox, oy, R = 70, 300, 236
    tips = rotation(fig, ox, oy, R)
    assert abs(tips[-1][2] - math.pi / 2) < 1e-12
    fig.text(ox + R + 30, oy + 5, "*B*", size=16, weight=600)
    fig.text(ox + R + 30, oy + 24, t("失败", "failure"), size=13, color="dim")
    fig.text(ox + 12, oy - R - 18, "*W*", size=16, weight=600)
    fig.text(ox + 36, oy - R - 18, t("成功", "success"), size=13, color="dim")
    fig.text(ox + 18, oy - R + 22, "*n* = 3", size=13, color="now")
    fig.text(ox - 30, oy + 36, f"sin²θ = *p* ≈ {P_OVERLAP:.3f}", size=13, color="dim")
