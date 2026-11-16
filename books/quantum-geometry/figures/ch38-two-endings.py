"""指针的两种终局：连续滑向 90° 时 cos θ 在有限处归零（ptr = NULL）；沿离散快度阶梯上行时 cos θ_k = sech η_k 恒为正。
The two endings of a pointer: sliding continuously to 90°, cos θ reaches zero at a finite point
(ptr = NULL); climbing the discrete rapidity ladder, cos θ_k = sech η_k stays positive.

Path B is computed: η_k = η₀ + kΔη with the illustrative values η₀ = 0.5, Δη = 0.3 (not from the text),
and every point is checked to lie in (0, 1] (the Gudermann identity of rem-ch38-x86-recursive-page-table-
literature, item 2, a literature result). Path A is schematic: θ grows linearly from the same start
to 90° at s = 5.
"""

import math

from _ch38 import DETA, ETA0, sech

SIZE = (460, 286)
ALT = {
    "zh": "坐标图，横轴是步数 k，纵轴是 cos θ，从 0 到 1。两条路从同一点 cos θ ≈ 0.89 出发。品红的连续曲线一路下滑，在 k = 5 处碰到横轴，"
          "那里画着一个叉，写着 ptr = NULL。青色的一串点按 cos θ_k = sech η_k 逐级下降，越来越贴近横轴，但每一点都在横轴上方，旁边写着 sech η_k > 0。",
    "en": "A plot with the step k across and cos θ up, from 0 to 1. Two paths leave the same point, cos θ ≈ 0.89. A "
          "magenta continuous curve slides down and meets the axis at k = 5, where a cross is marked ptr = NULL. A "
          "string of cyan points falls step by step as cos θ_k = sech η_k, creeping ever closer to the axis but with "
          "every point above it, labelled sech η_k > 0.",
}

KMAX = 12
LADDER = [(k, sech(ETA0 + k * DETA)) for k in range(KMAX + 1)]
assert all(v > 0 for _, v in LADDER)
assert all(b < a for (_, a), (_, b) in zip(LADDER, LADDER[1:]))
THETA0 = math.acos(LADDER[0][1])
S_NULL = 5.0
assert abs(LADDER[0][1] - 0.8868) < 1e-4


def slide(s):
    return math.cos(THETA0 + (math.pi / 2 - THETA0) * s / S_NULL)


assert abs(slide(S_NULL)) < 1e-12


def draw(fig):
    ax = fig.axes(64, 30, 360, 200, (0, KMAX), (0, 1.0))
    ax.grid(ys=[0.25, 0.5, 0.75], color="faint")
    ax.xaxis(ticks=[0, 2, 4, 6, 8, 10, 12], size=13, label=fig.t("步数 *k*", "step *k*"))
    ax.yaxis(ticks=[0, 0.5, 1], size=13, labels=["0", "0.5", "1"], label="cos *θ*")
    ax.plot(slide, 0, S_NULL, color="area", width=2.6)
    ax.cv.cross(ax.X(S_NULL), ax.Y(0), 7, "area", 2.2)
    ax.text(S_NULL, 0, "ptr = NULL", dy=44, size=13, color="area", anchor="middle", mono=True, halo=True)
    ax.points(LADDER, color="line", r=3.6)
    ax.text(6.3, 0.42, fig.t("离散阶梯：sech *η*_{k} > 0", "discrete ladder: sech *η*_{k} > 0"), size=14, color="line",
            halo=True)
    ax.text(2.3, 0.8, fig.t("连续滑向 90°", "sliding to 90°"), size=14, color="area", halo=True)
