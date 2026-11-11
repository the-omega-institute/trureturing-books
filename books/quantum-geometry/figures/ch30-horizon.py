"""场内观察者的视界：变量越多，隐藏的目标离观察者的视线越接近 90°，投到视线上的影子只剩 2^{−n/2}。
The finite observer's horizon: the more variables, the closer the hidden target sits to 90° from the
observer's line of sight, and its shadow on that line shrinks to 2^{−n/2}.

In the plane spanned by the uniform start P₀ (amber, along +x) and the target S*, the target makes
the angle θ₀ = arccos 2^{−n/2} with P₀; drawn for n = 2, 4, 8 (60°, 75.5°, 86.4°). The cyan segments
on the P₀ axis are the shadows cos θ₀ = 1/2, 1/4, 1/16; the dashed vertical line is the 90° horizon.
"""

import math

from _ch30 import horizon, theta0

SIZE = (450, 320)
ALT = {
    "zh": "一个四分之一圆。琥珀色的箭头 P₀ 沿水平方向，是观察者出发的态；竖直的虚线是 90° 视界。"
          "三支墨色箭头是 n = 2、4、8 时隐藏的目标 S*，与 P₀ 的夹角依次是 60°、75.5°、86.4°，一支比一支更贴近竖直虚线。"
          "每支箭头投到 P₀ 上的青色影子长 1/2、1/4、1/16，越来越短。",
    "en": "A quarter circle. The amber arrow P₀ points along the horizontal: the observer's starting state. The dashed "
          "vertical line is the 90° horizon. Three ink arrows are the hidden target S* for n = 2, 4 and 8, at 60°, 75.5° "
          "and 86.4° from P₀, each closer to the dashed vertical than the last. Their cyan shadows on P₀ have lengths 1/2, "
          "1/4 and 1/16, shorter and shorter.",
}


def draw(fig):
    t = fig.t
    ox, oy, R = 104, 262, 236
    for n, deg in ((2, 60.0), (4, 75.52), (8, 86.42)):
        assert abs(math.degrees(theta0(n)) - deg) < 0.01
    tips = horizon(fig, ox, oy, R)
    fig.text(ox + R + 8, oy + 5, "*P*₀", size=16, color="now", weight=600)
    fig.text(ox + R + 8, oy + 24, t("观察者", "observer"), size=13, color="now")
    fig.text(ox - 10, oy - R + 2, "90°", size=14, color="dim", anchor="end")
    fig.text(ox - 10, oy - R + 20, t("视界", "horizon"), size=14, color="dim", anchor="end")
    fig.text(tips[0][0] + 10, tips[0][1] - 4, t("目标 *S**", "target *S**"), size=14, color="ink", weight=600)
    fig.text(ox + 150, oy - 64, "cos θ₀ = 2^{−*n*/2}", size=14, color="line")
