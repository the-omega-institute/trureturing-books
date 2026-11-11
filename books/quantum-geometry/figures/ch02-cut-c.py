"""砍掉第 3 点 C：同一对箭头，先对天花板量两个角，或者直接以 A 为轴量一个角（第二章 §2.1）。
Cutting point C: the same pair of arrows, measured as two angles from the ceiling, or as one angle with
A itself as the axis (chapter 2, §2.1).

The chapter's example: A is 60° and B is 120° from the ceiling, in one meridian plane. The script checks
that the long route ⟨ψ_B|ψ_A⟩² with ψ = (cos(θ/2), sin(θ/2)) and the short route cos²(60°/2) both give ¾.
"""

import math

from _ch02 import along, title

SIZE = (560, 300)
WRAP = True
ALT = {
    "zh": "两幅图画的是同一对箭头。左图：一根灰色虚线的竖轴是外部的天花板 Z，也就是第 3 点 C；青色的箭头 A 离它 60°，"
          "琥珀色的箭头 B 离它 120°，要先量这两个角再换算。右图：去掉天花板，青色的箭头 A 自己当竖轴，"
          "琥珀色的箭头 B 离它只有一个角 θ = 60°，直接得到权重 cos² 30° = ¾。",
    "en": "Both drawings show the same pair of arrows. Left: a grey dashed vertical axis is the external ceiling Z, the third "
          "point C; the cyan arrow A is 60° from it and the amber arrow B is 120° from it, and both angles must be measured "
          "and combined. Right: the ceiling is gone; the cyan arrow A itself is the vertical axis, and the amber arrow B is a "
          "single angle θ = 60° away from it, which gives the weight cos² 30° = ¾ at once.",
}

TA, TB = 60, 120          # angles from the ceiling


def draw(fig):
    left, right = fig.row([272, 272], 300, gap=16)
    # the long route and the short route give the same number
    pa = (math.cos(math.radians(TA / 2)), math.sin(math.radians(TA / 2)))
    pb = (math.cos(math.radians(TB / 2)), math.sin(math.radians(TB / 2)))
    long_route = (pa[0] * pb[0] + pa[1] * pb[1]) ** 2
    short_route = math.cos(math.radians((TB - TA) / 2)) ** 2
    assert abs(long_route - 0.75) < 1e-12 and abs(short_route - 0.75) < 1e-12

    L = 104
    # ---- left: the ceiling as a third point
    title(left, "供奉 C：对天花板量两次", "with C: two angles from the ceiling")
    ox, oy = 136, 170
    left.arrow(ox, oy + L * 0.95, ox, oy - L * 1.12, "dim", 1.4, head=8, dash="5 4")
    left.text(ox + 8, oy - L * 1.12 + 6, left.t("天花板 *Z*（C）", "ceiling *Z* (C)"), size=13, color="dim")
    a = along(ox, oy, 90 - TA, L)
    b = along(ox, oy, 90 - TB, L)
    left.arrow(ox, oy, a[0], a[1], "line", 2.6)
    left.arrow(ox, oy, b[0], b[1], "now", 2.6)
    left.angle(ox, oy, 34, 90 - TA, 90, "60°", color="dim", size=13, label_r=50)
    left.angle(ox, oy, 58, 90 - TB, 90, "", color="dim")
    q = along(ox, oy, 90 - TB + 12, 74)
    left.text(q[0] + 2, q[1] + 6, "120°", size=13, color="dim")
    left.text(a[0] + 6, a[1] - 4, "*A*", size=16, color="line")
    left.text(b[0] + 6, b[1] + 12, "*B*", size=16, color="now")
    left.dot(ox, oy, 3.0, "dim")
    left.text(left.width / 2, 288, left.t("先写坐标，再乘四项 → ¾", "coordinates, four products → ¾"), size=13,
              color="dim", anchor="middle")

    # ---- right: A itself as the axis
    title(right, "砍掉 C：以 A 为轴量一次", "without C: one angle from A")
    ox, oy = 116, 192
    right.line(ox, oy + L * 0.6, ox, oy - L * 1.1, "line", 1.4)
    right.arrow(ox, oy, ox, oy - L, "line", 2.8)
    b = along(ox, oy, 90 - (TB - TA), L)
    right.arrow(ox, oy, b[0], b[1], "now", 2.6)
    right.angle(ox, oy, 40, 90 - (TB - TA), 90, "*θ* = 60°", color="line", size=14, width=1.8, label_r=66)
    right.text(ox - 10, oy - L + 6, "*A*", size=16, color="line", anchor="end")
    right.text(b[0] + 6, b[1] + 4, "*B*", size=16, color="now")
    right.dot(ox, oy, 3.0, "dim")
    right.text(right.width / 2, 288, "cos^{2} 30° = ¾", size=15, color="line", anchor="middle", weight=600)
