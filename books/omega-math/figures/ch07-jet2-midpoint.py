"""A local jet and a symmetric midpoint retain curvature information in a finite calculation."""

from fractions import Fraction

SIZE = (704, 322)
WRAP = True
ALT = {
    "zh": "左图标出 κ(x)=1/(1+x²) 在 x₀=1 处的二阶射流。射流系数为 (1/2, −1/2, 1/4)，"
          "而到 x=3/2 的割线斜率为 −5/13。右图以 y=x² 为例，中点处的切向量给出准确的端点位移，"
          "左端切向量在右端留下竖直偏差。",
    "en": "Left, the second-order jet of κ(x)=1/(1+x²) at x₀=1 has coefficients (1/2, −1/2, 1/4). "
          "The secant to x=3/2 has slope −5/13. Right, on the example arc y=x², the tangent vector at the "
          "midpoint gives the exact endpoint displacement. The left-endpoint tangent leaves a vertical drift.",
}


def fidelity(x):
    return 1 / (1 + x * x)


def draw(fig):
    left, right = fig.row([344, 344], 322)
    x0, x1 = Fraction(1), Fraction(3, 2)
    constant, linear, quadratic = Fraction(1, 2), Fraction(-1, 2), Fraction(1, 4)

    # The coefficients of (1 + (1+h)²) times the jet are 1, 0, 0 through order two.
    assert (2 * constant, 2 * linear + 2 * constant, 2 * quadratic + 2 * linear + constant) == (1, 0, 0)
    secant = (fidelity(x1) - fidelity(x0)) / (x1 - x0)
    assert secant == Fraction(-5, 13) and secant != linear

    left.text(172, 24, left.t("保真度的二阶射流", "Second-order fidelity jet"), size=18, weight=600, anchor="middle")
    ax = left.axes(46, 54, 261, 157, (0.5, 1.95), (0.17, 0.83))
    ax.yaxis(ticks=[0.25, 0.5, 0.75], labels=["1/4", "1/2", "3/4"], color="ink")
    ax.xaxis(ticks=[0.5, 1, 1.5], labels=["1/2", "1", "3/2"], color="ink")
    ax.text(1.95, 0.17, "x", dx=11, dy=5, size=14)
    ax.plot(fidelity, color="cyan", width=2.3)
    ax.plot(lambda x: constant + linear * (x - x0) + quadratic * (x - x0) ** 2,
            color="violet", width=2.4, dash="4 3")
    ax.path([(x0, fidelity(x0)), (x1, fidelity(x1))], "magenta", 2)
    ax.points([(x1, fidelity(x1))], "magenta", 3.5)
    ax.points([(x0, fidelity(x0))], "amber", 4.1)
    ax.text(x0, fidelity(x0), "x₀", dx=1, dy=-13, size=14, anchor="middle", color="amber")
    ax.text(0.5, fidelity(0.5), "κ(x) = 1/(1+x²)", dx=16, dy=-11, size=14, color="cyan")
    left.text(172, 260, "𝒥₂(ℚ)  (1/2, −1/2, +1/4)", size=15, color="violet", anchor="middle")
    left.text(172, 286, left.t("割线斜率 −5/13 ≠ −1/2", "Secant slope −5/13 ≠ −1/2"),
              size=15, color="magenta", anchor="middle")

    right.text(172, 24, right.t("对称中点步", "Symmetric midpoint step"), size=18, weight=600, anchor="middle")
    arc = right.axes(45, 58, 230, 151, (0, 1), (0, 1))
    arc.xaxis(color="ink")
    arc.yaxis(color="ink")
    # An exact quadratic example, with equal horizontal step length for both tangent evaluations.
    midpoint = Fraction(1, 2)
    mid_slope = 2 * midpoint
    assert mid_slope == 1 ** 2 - 0 ** 2
    arc.plot(lambda x: x * x, color="cyan", width=2.5)
    arc.path([(0, 0), (1, mid_slope)], "violet", 1.8, dash="5 4")
    tangent_start = Fraction(1, 4)
    tangent_end = Fraction(4, 5)
    arc.path([(x, midpoint ** 2 + (x - midpoint) * mid_slope) for x in (tangent_start, tangent_end)],
             "violet", 1.8)
    arc.path([(0, 0), (1, 0)], "magenta", 2)
    right.arrow(*arc.pt(1, 0.05), *arc.pt(1, 0.94), "magenta", 1.2, head=5)
    arc.text(1, 0.5, right.t("偏差", "drift"), dx=11, size=14, color="magenta", middle=True)
    arc.points([(midpoint, midpoint ** 2)], "amber", 4.3)
    arc.points([(0, 0), (1, 1)], "cyan", 3.8)
    arc.text(midpoint, midpoint ** 2, "x_{1/2}", dx=8, dy=16, size=15, color="amber")
    arc.text(0, 0, "x₀", dy=20, size=14, anchor="middle")
    arc.text(1, 1, "x₁", dy=-9, size=14, anchor="middle")
    right.text(172, 260, right.t("中点切向量给出端点位移", "Midpoint tangent gives the endpoint step"),
               size=14, color="violet", anchor="middle")
    right.text(172, 286, right.t("左端切向量沿水平线前进", "Left-endpoint tangent stays flat"),
               size=14, color="magenta", anchor="middle")
