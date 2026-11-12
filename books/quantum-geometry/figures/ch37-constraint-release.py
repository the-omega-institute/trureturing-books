"""挂起时空锚 u₂：三锚俱在时 x₂ 被卡在窄窗里；挂起后剩下的二元切片相容体积升到 0.36，且不再含 x₂。
Suspending the spacetime anchor u₂: with all three anchors x₂ is held in a narrow window; once u₂ is
suspended, the remaining two-vector slice has the larger determinant 0.36, which no longer involves x₂.

The example ex-ch37-gram-constraint-release with c₁₂ = x₁ = 4/5: the ink parabola is
det G₃(4/5, x₂) = (9/25)² − (x₂ − 16/25)², non-negative only on [7/25, 1] (0.104 at x₂ = 4/5, −0.28 at
x₂ = 0); the dashed cyan level is det G₂(4/5) = 9/25 of the slice {u₁, v}, which does not depend on x₂.
Suspending u₂ does not make the triple at x₂ = 0 realizable, so that point stays crossed out. Values
asserted in _ch37.
"""

from _ch37 import WAKE_HI, WAKE_LO, det_g2, det_g3

SIZE = (460, 270)
ALT = {
    "zh": "横轴是候选态与时空锚的重叠 x₂，从 −1 到 1；纵轴是相容行列式。墨色的抛物线是三锚俱在时的 det G₃，只在 x₂ 从 0.28 到 1 的窄窗里不小于 0，"
          "在 x₂ = 0.8 处为 0.104；在 x₂ = 0 处它是 −0.28，被打叉。青色的水平虚线是挂起时空锚后只剩 u₁ 与 v 的 det G₂ = 0.36，它不含 x₂；"
          "一支青色箭头从 x₂ = 0.8 处的 0.104 竖直升到 0.36。",
    "en": "The horizontal axis is the overlap x₂ of the candidate state with the spacetime anchor, from −1 to 1; the vertical "
          "axis is the compatibility determinant. The ink parabola is det G₃ with all three anchors; it is non-negative only "
          "in the narrow window x₂ from 0.28 to 1, equals 0.104 at x₂ = 0.8, and at x₂ = 0 it is −0.28, crossed out. The "
          "dashed cyan horizontal line is det G₂ = 0.36 of the slice that keeps only u₁ and v once the spacetime anchor is "
          "suspended; it does not involve x₂. A cyan arrow rises from 0.104 at x₂ = 0.8 to 0.36.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(58, 30, 372, 176, (-1, 1), (-0.36, 0.42))
    ax.hline(0, "dim", 1.3)
    ax.yaxis(ticks=[-0.28, 0, 0.104, 0.36], labels=["−0.28", "0", "0.104", "0.36"], size=13)
    for v, s in ((-1, "−1"), (0, "0"), (WAKE_LO, "0.28"), (1, "1")):
        fig.line(ax.X(v), ax.Y(-0.36), ax.X(v), ax.Y(-0.36) + 5, "dim", 1.2)
        fig.text(ax.X(v), ax.Y(-0.36) + 19, s, size=13, color="dim", anchor="middle")
    fig.line(ax.x, ax.Y(-0.36), ax.x + ax.w, ax.Y(-0.36), "dim", 1.3)
    fig.text(ax.x + ax.w, ax.Y(-0.36) + 40, "x₂", size=14, color="dim", anchor="end", italic=True)

    # the waking window: where det G₃ ≥ 0
    xs = [WAKE_LO + (WAKE_HI - WAKE_LO) * i / 80 for i in range(81)]
    ax.area([(x, det_g3(x)) for x in xs], "ink", base=0, fill_opacity=0.14)
    ax.plot(det_g3, -1, 1, color="ink", width=2.4)
    ax.hline(det_g2(), "line", 2.4, dash="7 5")
    by = ax.Y(0) + 12
    fig.line(ax.X(WAKE_LO), by, ax.X(WAKE_HI), by, "ink", 1.6)
    for v in (WAKE_LO, WAKE_HI):
        fig.line(ax.X(v), by - 5, ax.X(v), by + 5, "ink", 1.6)
    fig.text((ax.X(WAKE_LO) + ax.X(WAKE_HI)) / 2, by + 20, t("清醒窄窗", "waking window"), size=13, color="ink",
             anchor="middle")

    assert abs(det_g3(0.8) - 0.104) < 1e-12 and abs(det_g3(0) + 0.28) < 1e-12 and abs(det_g2() - 0.36) < 1e-12
    ax.points([(0.8, det_g3(0.8))], color="ink", r=4.0, ring="bg")
    # suspending u₂: from 0.104 up to the level 0.36 of the slice {u₁, v}
    fig.arrow(ax.X(0.8), ax.Y(det_g3(0.8)) - 7, ax.X(0.8), ax.Y(det_g2()) + 4, "line", 2.0, head=9)
    # x₂ = 0: the triple is incompatible, and stays so
    fig.cross(ax.X(0), ax.Y(det_g3(0)), 7, "ink", 2.2)
    ax.text(0, det_g3(0), "x₂ = 0", dx=10, dy=5, size=13, color="dim", halo=True)
    ax.text(-1, det_g2(), t("挂起 u₂：det G₂，不含 x₂", "u₂ suspended: det G₂, free of x₂"), dx=6, dy=-9, size=14,
            color="line", halo=True)
    ax.text(0, -0.1, t("三锚俱在：det G₃", "all anchors: det G₃"), dx=-8, size=14, color="ink", anchor="end",
            middle=True, halo=True)
    fig.arrow(ax.X(0) - 4, ax.Y(-0.1), ax.X(0.13), ax.Y(-0.1), "ink", 1.2, head=6)
