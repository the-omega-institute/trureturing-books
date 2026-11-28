"""Exact Cayley iteration preserves length, and normalized chart denominators share a unit sum."""

from fractions import Fraction
from math import sqrt

SIZE = (704, 342)
WRAP = True
ALT = {
    "zh": "三维生成向量 σ=(1/2,1/2,0) 的垂直截面中，Cayley 的十二步都留在单位圆上，"
          "二阶 Taylor 的终点模方则为 (17/16)¹²。右图把有理 MRP 乘法的两个原分母除以其和 (1+a)(1+b)，"
          "归一化后两者之和为 1，较大者至少为 1/2，因此所选原分母也至少为 1/2。",
    "en": "In the plane perpendicular to σ=(1/2,1/2,0), all twelve Cayley iterates stay on the unit "
          "circle. The second-order Taylor endpoint has squared norm (17/16)¹². Right, for rational MRP inputs, dividing the "
          "raw denominators by their sum (1+a)(1+b) makes the normalized sum 1. The larger normalized "
          "denominator, and therefore the selected raw denominator, is at least 1/2.",
}


def orbit(diagonal, off_diagonal):
    # Coordinates in the orthogonal basis (v₀, σ × v₀). Its squared lengths are 1 and 1/2.
    a, b = Fraction(1), Fraction(0)
    yield a, b
    for _ in range(12):
        a, b = diagonal*a - off_diagonal*b/2, off_diagonal*a + diagonal*b
        yield a, b


def draw(fig):
    left, right = fig.row([344, 344], 342)
    cayley = list(orbit(Fraction(1, 3), Fraction(4, 3)))
    taylor = list(orbit(Fraction(3, 4), Fraction(1)))
    assert all(a*a + b*b/2 == 1 for a, b in cayley)
    assert all(a*a + b*b/2 == Fraction(17, 16)**n for n, (a, b) in enumerate(taylor))

    left.text(172, 24, left.t("十二步 · σ 的垂直截面", "Twelve steps in the plane ⟂ σ"),
              size=18, anchor="middle", weight=600)
    cx, cy, radius = 172, 151, 76
    left.circle(cx, cy, radius, color="cyan", width=1.7, opacity=0.65)
    left.line(cx - 110, cy, cx + 110, cy, "faint", 1)
    left.line(cx, cy - 105, cx, cy + 105, "faint", 1)
    for values, role in ((taylor, "magenta"), (cayley, "cyan")):
        points = [(cx + radius*a, cy - radius*b/sqrt(2)) for a, b in values]
        if values is taylor:
            left.polyline(points, role, 1.2, opacity=0.55)
        for x, y in points[1:-1]:
            left.dot(x, y, 2.7, role)
        left.dot(*points[-1], 4.8, role, ring="bg")
    left.dot(cx + radius, cy, 4, "ink", ring="bg")
    left.text(cx + radius + 12, cy + 4, "v₀", size=14)
    left.text(172, 282, left.t("Cayley 模方", "Cayley squared norm") + "   1",
              size=15, anchor="middle", color="cyan")
    left.text(172, 310, left.t("Taylor 终点模方", "Taylor final squared norm") + "   (17/16)¹²",
              size=15, anchor="middle", color="magenta")

    right.text(172, 24, right.t("有理 MRP · 分母平衡", "Rational MRP · denominators"),
               size=17, anchor="middle", weight=600)
    ax = right.axes(53, 61, 236, 162, (0, 1), (0, 1.08))
    ax.xaxis(ticks=[0, 0.5, 1], labels=["0", "1/2", "1"])
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "1/2", "1"])
    ax.grid(ys=[0.5])
    ax.path([(0, 1), (1, 0)], "violet", 1.6, dash="5 4")
    ax.path([(0, 0), (1, 1)], "cyan", 1.6, dash="5 4")
    ax.path([(0, 1), (0.5, 0.5)], "violet", 3.4)
    ax.path([(0.5, 0.5), (1, 1)], "cyan", 3.4)
    ax.points([(0.5, 0.5)], "ink", 4)
    ax.text(0.15, 0.84, "d₋", dx=4, dy=-10, size=16, color="violet")
    ax.text(0.85, 0.84, "d₊", dx=-5, dy=-10, anchor="end", size=16, color="cyan")
    right.text(302, 228, "d₊", size=15)
    right.text(172, 267, "d₊ + d₋ = 1    ·    max(d₊, d₋) ≥ 1/2", size=16, anchor="middle")
    right.text(172, 291, "d₊, d₋ = " + right.t("归一化分母", "normalized denominators"),
               size=13, anchor="middle")
    right.text(172, 316, "D₊ + D₋ ≥ 1    ⟹    max(D₊, D₋) ≥ 1/2", size=14, anchor="middle")
