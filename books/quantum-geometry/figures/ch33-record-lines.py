"""在 d = 2 的记忆载体里，两条两两垂直的记录线已经占满：第三个方向不可能同时与两条都垂直。
In a memory carrier of dimension d = 2, two mutually orthogonal record lines fill it up: no third
direction can be orthogonal to both.

Drawn in the real plane as a stand-in for ℂ²: the record lines P₀ and P₁ (cyan) are the two axes; a
third unit direction v at 30° has the shadows cos 30° and sin 30° on them, both non-zero, so it is
orthogonal to neither. This is the case N ≤ d with d = 2 of the cited theorem.
"""

import math

SIZE = (420, 300)
ALT = {
    "zh": "一个平面上的两条互相垂直的青色直线 P₀（水平）与 P₁（竖直），交于原点并标有直角记号，外面画着淡淡的单位圆。"
          "一支墨色的虚线箭头 v 与 P₀ 成 30°，从它的尖端向两条线作垂线，在 P₀ 与 P₁ 上留下两段都不为零的青色影子。"
          "右下角写着 N ≤ d = 2，旁边是绿色的 LEAN ✓ 标记。",
    "en": "Two perpendicular cyan lines in a plane, P₀ (horizontal) and P₁ (vertical), meet at the origin with a "
          "right-angle mark; a faint unit circle surrounds them. A dashed ink arrow v makes 30° with P₀; perpendiculars "
          "from its tip leave two cyan shadows on P₀ and P₁, neither of them zero. At the bottom right, N ≤ d = 2 "
          "with a green LEAN ✓ tag.",
}

ANGLE = 30.0


def draw(fig):
    t = fig.t
    ox, oy, R = 150, 160, 112
    c, s = math.cos(math.radians(ANGLE)), math.sin(math.radians(ANGLE))
    assert c > 0.1 and s > 0.1  # the third direction has a non-zero overlap with both record lines
    assert abs(c * c + s * s - 1) < 1e-12

    fig.circle(ox, oy, R, color="faint", width=1.2, dash="3 4")
    fig.line(ox - R - 18, oy, ox + R + 18, oy, "line", 2.4)
    fig.line(ox, oy + R + 18, ox, oy - R - 18, "line", 2.4)
    fig.right_angle(ox, oy, 0, 11, "line", 1.4)

    vx, vy = ox + R * c, oy - R * s
    fig.line(vx, vy, vx, oy, "dim", 1.3, dash="4 3")
    fig.line(vx, vy, ox, vy, "dim", 1.3, dash="4 3")
    fig.line(ox, oy, vx, oy, "line", 5.0, cap="round")
    fig.line(ox, oy, ox, vy, "line", 5.0, cap="round")
    fig.arrow(ox, oy, vx, vy, "ink", 2.2, dash="6 4")
    fig.angle(ox, oy, 46, 0, ANGLE, "30°", size=13, label_r=72)

    fig.text(ox + R + 24, oy + 5, "*P*₀", size=16, color="line", weight=600)
    fig.text(ox + 10, oy - R - 10, "*P*₁", size=16, color="line", weight=600)
    fig.text(vx + 10, vy - 6, t("第三个方向 *v*", "a third direction *v*"), size=14, color="ink")
    fig.text((ox + vx) / 2, oy + 24, "cos 30° ≠ 0", size=13, color="line", anchor="middle")
    fig.text(ox - 10, (oy + vy) / 2, "sin 30° ≠ 0", size=13, color="line", anchor="end", middle=True)

    fig.text(406, 268, "*N* ≤ *d* = 2", size=15, color="ink", anchor="end", weight=600)
    fig.chip(406, 292, "LEAN ✓", "lean", anchor="end")
