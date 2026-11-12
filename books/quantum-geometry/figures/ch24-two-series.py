"""π 与 θ* 是同一条曲线上同一个点的两个坐标：A 从 θ* 往上读出 π，B 从 π 横着读回 θ*。
π and θ* are the two coordinates of one point on one curve: A reads up from θ* to π, B reads across
from π back to θ*.

The curve is y = A(x) = 2x + 2 arcsin x on [0, 1] (increasing, from 0 to 2 + π). The point
(θ*, π) is on it because θ* + arcsin θ* = π/2 (asserted). The chapter's first truncations 4θ* ≈ 2.9563 and π/4 ≈ 0.7854 are
checked as well.
"""

import math

from _ch24 import THETA

SIZE = (480, 330)
ALT = {
    "zh": "一条青色的曲线 y = A(x) = 2x + 2 arcsin x，从原点升到 x = 1 处的 2 + π。曲线上标出一点 (θ*, π)。"
          "从横轴上的 θ* ≈ 0.739 竖直向上走到曲线、再水平向左走到纵轴，读出 π，这是级数 A 的方向；"
          "反过来从纵轴上的 π 水平向右走到曲线、再向下走到横轴，读回 θ*，这是复合逆 B 的方向（品红虚线）。",
    "en": "A cyan curve y = A(x) = 2x + 2 arcsin x rising from the origin to 2 + π at x = 1. One point on it is marked, "
          "(θ*, π). Going straight up from θ* ≈ 0.739 on the horizontal axis to the curve and then left to the vertical axis "
          "reads off π: the direction of the series A. Going the other way, right from π on the vertical axis to the curve and "
          "down to the horizontal axis, reads back θ*: the direction of the compositional inverse B (dashed magenta).",
}


def A(x):
    return 2 * x + 2 * math.asin(x)


assert abs(A(THETA) - math.pi) < 1e-12 and abs(THETA + math.asin(THETA) - math.pi / 2) < 1e-12
assert abs(4 * THETA - 2.9563405) < 1e-7 and abs(math.pi / 4 - 0.7853982) < 1e-7


def draw(fig):
    t = fig.t
    ax = fig.axes(70, 28, 360, 252, (0, 1.08), (0, 5.4))
    ax.xaxis(ticks=[0, 0.5, 1], labels=["0", "0.5", "1"], size=14)
    ax.yaxis(ticks=[0, 1, 2, 4, 5], size=14)
    ax.plot(A, 0, 1, color="line", width=2.4)
    ax.points([(1, A(1))], "line", r=3.4)
    ax.text(1, A(1), "2 + π", dx=-10, dy=-2, size=14, color="line", anchor="end", middle=True)

    X, Y = ax.X(THETA), ax.Y(math.pi)
    fig.arrow(X, ax.Y(0), X, Y + 6, "line", 1.8, head=8)
    fig.arrow(X - 4, Y, ax.X(0) + 2, Y, "line", 1.8, head=8)
    fig.line(ax.X(0), Y + 7, X, Y + 7, "area", 1.6, dash="5 3")
    fig.arrow(X + 7, Y + 7, X + 7, ax.Y(0) - 2, "area", 1.6, head=8, dash="5 3")
    fig.dot(X, Y, 5.2, "ink", ring="bg")

    fig.text(ax.X(0) - 8, Y, "π", size=15, color="ink", anchor="end", middle=True, weight=600)
    fig.text(X, ax.Y(0) + 34, "*θ*^{∗} ≈ 0.739", size=14, color="ink", anchor="middle", weight=600)
    fig.text(X + 16, ax.Y(1.2), t("*B*：π ↦ *θ*^{∗}", "*B*: π ↦ *θ*^{∗}"), size=14, color="area", halo=True)
    fig.text(ax.X(0.25), Y - 12, t("*A*：*θ*^{∗} ↦ π", "*A*: *θ*^{∗} ↦ π"), size=14, color="line", anchor="middle",
             halo=True)
    fig.text(ax.X(0.03), ax.Y(4.9), "*A*(*x*) = 2*x* + 2 arcsin *x*", size=14, color="line")
