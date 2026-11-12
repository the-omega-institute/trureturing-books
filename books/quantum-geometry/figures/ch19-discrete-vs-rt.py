"""本章证明的只到左边为止：宽度三桥图在锥域内的最大流等于最小割；右边连续体中的 RT 极小曲面是文献结果，两者之间没有证明。
What this chapter proves stops on the left: in the cone the width-three bridge graph has max-flow equal
to min-cut. The RT minimal surface in the continuum on the right is a literature result, and no proof
runs between the two.

The right panel is a constant-time slice of AdS drawn as the Poincaré disc: the minimal curve γ_A
anchored on the ends of the boundary interval A is the circle arc that meets the boundary at right
angles (checked: the two circles are orthogonal, r² + R² = D²).
"""

import math

from _ch19 import bridge

SIZE = (576, 300)
WRAP = True
ALT = {
    "zh": "左右两幅小图，中间一支被划掉的箭头。左边是宽度三桥图（张量 M、N 与三条桥、四条腿 a、b、c、d），下面一枚绿色的 LEAN ✓ 标签：锥域内最大流 = 最小割。"
          "右边是一个圆盘，代表连续体时空的一张等时切片；边界上青色的一段弧是边界区域 A，紫色的弧 γ_A 从 A 的两端出发、垂直于边界伸进圆盘内部，是极小曲线；下面一枚紫色的标签：RT · 文献。"
          "中间从左指向右的箭头上打了一个叉，旁边写着：连续极限，本书未证。",
    "en": "Two small pictures with a crossed-out arrow between them. On the left, the width-three bridge graph (tensors M and N, "
          "three bridges and four legs a, b, c, d), with a green LEAN ✓ tag beneath it: max-flow = min-cut in the cone. On the "
          "right, a disc standing for a constant-time slice of continuum spacetime; a cyan arc on its rim is the boundary "
          "region A, and a violet arc γ_A leaves the two ends of A at right angles to the rim and dips into the disc: the "
          "minimal curve. Beneath it a violet tag: RT · literature. The arrow from left to right carries a cross and the "
          "words: continuum limit, not proved in this book.",
}


def draw(fig):
    t = fig.t
    left, right = fig.row([240, 320], 300)

    # ---- left: the discrete statement this chapter proves
    g = bridge(left, 120, 128, gap=96, leg=36, size=14)
    left.chip(120, 262, t("LEAN ✓ 锥域内 流 = 割", "LEAN ✓ flow = cut in the cone"), "lean", size=12, anchor="middle")

    # ---- right: the crossed-out continuum limit, then the continuum picture (literature)
    xa, xb, ya = 6, 100, 128
    right.arrow(xa, ya, xb, ya, "dim", 1.8, dash="5 4")
    right.cross((xa + xb) / 2, ya, 10, "ink", 2.4)
    right.text((xa + xb) / 2, ya + 30, t("连续极限", "continuum limit"), size=13, color="dim", anchor="middle")
    right.text((xa + xb) / 2, ya + 48, t("本书未证", "not proved here"), size=13, color="dim", anchor="middle")

    cx, cy, R = 218, 132, 92
    right.circle(cx, cy, R, color="dim", fill="panel", width=1.8)
    beta = math.radians(38)                       # half the opening of A, centred straight up
    a0, a1 = 90 - math.degrees(beta), 90 + math.degrees(beta)
    D = R / math.cos(beta)                        # centre of the orthogonal circle, on the axis through A
    r = R * math.tan(beta)
    assert abs(r * r + R * R - D * D) < 1e-9      # orthogonal to the rim: γ_A meets the boundary at right angles
    ox, oy = cx, cy - D
    ends = [(cx + R * math.cos(math.radians(a)), cy - R * math.sin(math.radians(a))) for a in (a0, a1)]
    angs = [math.atan2(-(y - oy), x - ox) for x, y in ends]   # paper angles seen from the orthogonal centre
    lo, hi = sorted(angs)
    right.curve(lambda s: (ox + r * math.cos(s), oy - r * math.sin(s)), lo, hi, color="argued", width=3.0)
    right.arc(cx, cy, R, a0, a1, "line", 4.2)
    right.text(cx, cy - R - 10, "*A*", size=16, color="line", anchor="middle", weight=600)
    deep = oy + r                                    # the lowest point of γ_A
    right.text(cx, deep + 22, "*γ*_{*A*}", size=16, color="argued", anchor="middle", weight=600)
    right.text(cx, cy + R - 18, t("连续体", "continuum"), size=13, color="dim", anchor="middle")
    right.chip(cx, 262, t("RT · 文献", "RT · literature"), "argued", size=12, anchor="middle")
