"""可预测度与可见度：D² + V² = ‖r‖² ≤ 1，纯态在四分之一圆上（第三章 §3.2）。
Predictability and visibility: D² + V² = ‖r‖² ≤ 1, with the pure states on the quarter circle (chapter 3, §3.2).

D = |r_z| and V = √(r_x² + r_y²). The chapter's example D = 0.8 leaves at most V = 0.6 (asserted); a
mixed state with ‖r‖ = 0.6 sits inside, on the dashed arc of that radius.
"""

import math

SIZE = (440, 380)
ALT = {
    "zh": "坐标平面，横轴是路径可预测度 D，纵轴是条纹可见度 V，都从 0 到 1。四分之一圆弧 D² + V² = 1 上是纯态，弧内是混合态。"
          "琥珀色的点在弧上的 D = 0.8、V = 0.6 处：青色的横线是 D，品红的竖线是 V。弧内一条半径 0.6 的虚线弧上有一个灰点，是 ‖r‖ = 0.6 的混合态。",
    "en": "A coordinate plane with path predictability D across and fringe visibility V up, both from 0 to 1. Pure states lie on "
          "the quarter circle D² + V² = 1, mixed states inside it. An amber point sits on the arc at D = 0.8, V = 0.6: the cyan "
          "horizontal segment is D, the magenta vertical one is V. A grey point on a dashed arc of radius 0.6 inside is a mixed "
          "state with ‖r‖ = 0.6.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(78, 30, 300, 300, (0, 1.05), (0, 1.05))
    arc = [(math.cos(math.radians(a)), math.sin(math.radians(a))) for a in range(0, 91)]
    ax.area(arc + [(0, 0)], "cyan", base=None, fill_opacity=0.08)
    ax.path(arc, "ink", 2.4)
    ax.path([(0.6 * c, 0.6 * s) for c, s in arc], "dim", 1.3, dash="4 4")
    ax.xaxis(ticks=[0, 0.6, 0.8, 1], labels=["0", "0.6", "0.8", "1"], size=13)
    ax.yaxis(ticks=[0, 0.6, 0.8, 1], labels=["0", "0.6", "0.8", "1"], size=13)

    d = 0.8
    v = math.sqrt(1 - d * d)
    assert abs(v - 0.6) < 1e-12
    ax.path([(0, v), (d, v)], "faint", 1.2, dash="3 4")
    ax.cv.line(ax.X(0), ax.Y(0), ax.X(d), ax.Y(0), "line", 6, cap="round")
    ax.cv.line(ax.X(d), ax.Y(0), ax.X(d), ax.Y(v), "area", 5, cap="round")
    ax.cv.line(ax.X(0), ax.Y(0), ax.X(d), ax.Y(v), "now", 2.0, dash="5 4")
    x, y = ax.pt(d, v)
    fig.dot(x, y, 6, "now", ring="bg")
    fig.text(x + 12, y - 10, "(0.8, 0.6)", size=14, color="now")

    m = (0.6 * 0.6, 0.6 * 0.8)                          # a mixed state with ‖r‖ = 0.6: D = 0.36, V = 0.48
    assert abs(math.hypot(*m) - 0.6) < 1e-12
    mx, my = ax.pt(*m)
    fig.dot(mx, my, 4.6, "dim", ring="bg")
    fig.text(mx - 10, my + 26, t("混合态 ‖*r*‖ = 0.6", "mixed, ‖*r*‖ = 0.6"), size=13, color="dim", anchor="end", halo=True)
    px, py = ax.pt(0.5, 0.93)
    fig.text(px + 6, py - 6, t("纯态：*D*^{2} + *V*^{2} = 1", "pure: *D*^{2} + *V*^{2} = 1"), size=14, color="ink", halo=True)
    fig.text(ax.X(0.4), ax.Y(0) - 12, "*D*", size=15, color="line", anchor="middle", weight=600)
    fig.text(ax.X(d) + 10, ax.Y(v / 2) + 5, "*V*", size=15, color="area", weight=600)
    fig.text(ax.x + ax.w / 2, 372, t("路径可预测度 *D*", "path predictability *D*"), size=14, color="dim", anchor="middle")
    fig.text(22, ax.y + ax.h / 2, t("条纹可见度 *V*", "fringe visibility *V*"), size=14, color="dim", anchor="middle", rotate=90)
