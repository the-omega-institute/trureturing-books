"""挂起时空锚 u₂，被清醒判据否决的正交场景 x₂ = 0 重新相容。
Suspending the spacetime anchor u₂ readmits the orthogonal scene x₂ = 0 that the waking test rejects.

The example ex-ch37-gram-constraint-release with c₁₂ = x₁ = 4/5: the ink parabola is
det G₃(4/5, x₂) = (9/25)² − (x₂ − 16/25)², non-negative only on [7/25, 1]; the cyan line is
det G₂(4/5) = 9/25, which does not depend on x₂. Values asserted in _ch37.
"""

from _ch37 import WAKE_HI, WAKE_LO, det_g2, det_g3

SIZE = (460, 270)
ALT = {
    "zh": "横轴是候选场景与时空锚的重叠 x₂，从 −1 到 1；纵轴是相容行列式。墨色的抛物线是三锚俱在时的 det G₃，只在 x₂ 从 0.28 到 1 的窄窗里不小于 0，"
          "在 x₂ = 0.8 处为 0.104；在 x₂ = 0 处它是 −0.28，被打叉。青色的水平线是挂起时空锚后的 det G₂ = 0.36，对每个 x₂ 都为正，在 x₂ = 0 处是一个青色的点。",
    "en": "The horizontal axis is the overlap x₂ of the candidate scene with the spacetime anchor, from −1 to 1; the vertical "
          "axis is the compatibility determinant. The ink parabola is det G₃ with all three anchors; it is non-negative only "
          "in the narrow window x₂ from 0.28 to 1, equals 0.104 at x₂ = 0.8, and at x₂ = 0 it is −0.28, crossed out. The "
          "cyan horizontal line is det G₂ = 0.36 once the spacetime anchor is suspended: positive for every x₂, with a cyan "
          "dot at x₂ = 0.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(58, 30, 372, 176, (-1, 1), (-0.36, 0.42))
    ax.grid(xs=[0], ys=[])
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
    ax.plot(lambda x: det_g2(), -1, 1, color="line", width=2.6)
    by = ax.Y(0) + 12
    fig.line(ax.X(WAKE_LO), by, ax.X(WAKE_HI), by, "ink", 1.6)
    for v in (WAKE_LO, WAKE_HI):
        fig.line(ax.X(v), by - 5, ax.X(v), by + 5, "ink", 1.6)
    fig.text((ax.X(WAKE_LO) + ax.X(WAKE_HI)) / 2, by + 20, t("清醒窄窗", "waking window"), size=13, color="ink",
             anchor="middle")

    assert abs(det_g3(0.8) - 0.104) < 1e-12 and abs(det_g3(0) + 0.28) < 1e-12 and abs(det_g2() - 0.36) < 1e-12
    ax.points([(0.8, det_g3(0.8))], color="ink", r=4.0, ring="bg")
    # x₂ = 0: rejected awake, admitted in the dream
    fig.line(ax.X(0), ax.Y(det_g3(0)), ax.X(0), ax.Y(det_g2()), "dim", 1.2, dash="3 3")
    fig.cross(ax.X(0), ax.Y(det_g3(0)), 7, "ink", 2.2)
    ax.points([(0, det_g2())], color="line", r=4.6, ring="bg")
    ax.text(0, det_g3(0), "x₂ = 0", dx=10, dy=5, size=13, color="dim", halo=True)
    ax.text(-1, det_g2(), t("挂起 u₂：det G₂", "u₂ suspended: det G₂"), dx=6, dy=-9, size=14, color="line", halo=True)
    ax.text(0, -0.1, t("三锚俱在：det G₃", "all anchors: det G₃"), dx=-8, size=14, color="ink", anchor="end",
            middle=True, halo=True)
    fig.arrow(ax.X(0) - 4, ax.Y(-0.1), ax.X(0.13), ax.Y(-0.1), "ink", 1.2, head=6)
