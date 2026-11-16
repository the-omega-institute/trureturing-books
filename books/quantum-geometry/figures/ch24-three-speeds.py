"""三种收束并排：单纯迭代每步多一点点位数，牛顿在不动点邻域内渐近地把位数翻倍，有理读数的残差只按分母的平方收窄。
Three ways of closing in, side by side: plain iteration gains a fixed few digits per step, Newton
asymptotically doubles the digits near the fixed point, and a rational reading's residual narrows
only like the square of its denominator.

Left: log₁₀|θ_k − θ*| for θ_{k+1} = cos θ_k (cyan, k = 0…60) and for Newton's
θ_{k+1} = θ_k − (θ_k − cos θ_k)/(1 + sin θ_k) (magenta, k = 0…4), both from θ₀ = 1, computed at 60
digits; the dashed line has slope log₁₀ λ, λ = sin θ*. Right: log₁₀ of the residual |cos(a/b) − a/b|
of the convergents a/b of θ* against log₁₀ b, under the dashed bound (1 + sin 1)/b². All numbers are
checked against the tables of the chapter's example.
"""

import math
from decimal import Decimal

from _ch24 import LAM
from _ch24hp import THETA_HP, dcos, dsin

SIZE = (600, 300)
WRAP = True
ALT = {
    "zh": "两栏，纵轴都是误差的常用对数。左栏横轴是步数 k：青色的点是反复取余弦，排成一条斜直线，每一步只往下走同样的一小格，"
          "沿着斜率 lg 0.674 的虚线，到第 55 步才过 10⁻¹⁰；品红的点是从 θ₀ = 1 出发的牛顿迭代，进入不动点邻域后第 1、2、3、4 步分别落到 10⁻²、10⁻⁵、10⁻¹⁰、10⁻²¹，"
          "一步比一步陡。右栏横轴是分母 b 的常用对数：七个点是 θ* 的渐近分数 2/3、3/4、14/19、17/23、694/939、711/962、7093/9597 的残差 |cos q − q|，"
          "全部在虚线 (1 + sin 1)/b² 之下，随着分母变大一路下降，却始终大于零。",
    "en": "Two panels, both with the base-10 logarithm of the error going up. Left, against the step k: the cyan points, "
          "repeated cosine, lie on a straight slanted line, going down the same small notch each step along the dashed line of "
          "slope lg 0.674, and pass 10⁻¹⁰ only at step 55; the magenta points, Newton's method from θ₀ = 1, reach 10⁻², 10⁻⁵, 10⁻¹⁰ "
          "and 10⁻²¹ at steps 1, 2, 3, 4, steeper each time. Right, against the base-10 logarithm of the denominator b: seven "
          "points are the residuals |cos q − q| of the convergents 2/3, 3/4, 14/19, 17/23, 694/939, 711/962, 7093/9597 of θ*, "
          "all under the dashed bound (1 + sin 1)/b², falling as the denominator grows but never reaching zero.",
}

CONV = [(2, 3), (3, 4), (14, 19), (17, 23), (694, 939), (711, 962), (7093, 9597)]
TABLE_B2R = [1.07, 0.293, 1.35, 0.0401, 1.48, 0.164, 0.377]


def picard(n):
    x, out = Decimal(1), []
    for _ in range(n + 1):
        out.append(abs(x - THETA_HP))
        x = dcos(x)
    return out


def newton(n):
    x, out = Decimal(1), []
    for _ in range(n + 1):
        out.append(abs(x - THETA_HP))
        x = x - (x - dcos(x)) / (1 + dsin(x))
    return out


P = picard(60)
N = newton(4)
assert min(k for k, d in enumerate(P) if d < Decimal("1e-10")) == 55
assert [f"{float(d):.2e}" for d in N] == ["2.61e-01", "1.13e-02", "2.78e-05", "1.70e-10", "6.39e-21"]
RES = []
for (a, b), want in zip(CONV, TABLE_B2R):
    q = Decimal(a) / b
    r = abs(dcos(q) - q)
    RES.append(float(r))
    assert abs(float(r) * b * b - want) / want < 0.02
    assert float(r) < (1 + math.sin(1)) / b ** 2


def draw(fig):
    left, right = fig.row([292, 292], 300, gap=16)

    # ---- left: per step
    t = left.t
    left.text(146, 20, t("按步数：单纯迭代与牛顿", "by step: iteration and Newton"), size=14, weight=600, anchor="middle")
    ax = left.axes(52, 40, 224, 206, (0, 60), (-22, 0))
    ax.xaxis(ticks=[0, 20, 40, 60], size=13)
    ax.yaxis(ticks=[0, -5, -10, -15, -20], labels=["1", "10⁻⁵", "10⁻¹⁰", "10⁻¹⁵", "10⁻²⁰"], size=13)
    ax.grid(ys=[-5, -10, -15, -20])
    y0 = math.log10(float(P[0]))
    ax.plot(lambda k: y0 + k * math.log10(LAM), color="line", width=1.2, dash="4 3")
    ax.points([(k, math.log10(float(d))) for k, d in enumerate(P)], "line", r=2.6)
    ax.path([(k, math.log10(float(d))) for k, d in enumerate(N)], "area", 1.6)
    ax.points([(k, math.log10(float(d))) for k, d in enumerate(N)], "area", r=4.4, ring="bg")
    ax.text(26, -11.5, t("反复取余弦", "repeated cos"), size=13, color="line", anchor="middle", halo=True)
    ax.text(5, -20.6, t("牛顿", "Newton"), size=13, color="area", halo=True)
    left.text(276, 290, "*k*", size=14, color="dim", anchor="end")

    # ---- right: per denominator
    t = right.t
    right.text(146, 20, t("按分母：有理读数", "by denominator: rational readings"), size=14, weight=600, anchor="middle")
    bx = right.axes(52, 40, 224, 206, (0, 4.2), (-9.5, 0.5))
    bx.xaxis(ticks=[0, 1, 2, 3, 4], labels=["1", "10", "10²", "10³", "10⁴"], size=13)
    bx.yaxis(ticks=[0, -3, -6, -9], labels=["1", "10⁻³", "10⁻⁶", "10⁻⁹"], size=13)
    bx.grid(ys=[-3, -6, -9])
    c = math.log10(1 + math.sin(1))
    bx.plot(lambda u: c - 2 * u, 0, 4.2, color="dim", width=1.4, dash="5 4")
    bx.text(0.15, c - 0.3, "(1 + sin 1)/*b*²", dx=12, dy=8, size=13, color="dim")
    pts = [(math.log10(b), math.log10(r)) for (a, b), r in zip(CONV, RES)]
    bx.points(pts, "ink", r=4.2, ring="bg")
    bx.text(*pts[3], "17/23", dx=-8, dy=4, size=13, color="ink", anchor="end", middle=True, halo=True)
    bx.text(*pts[6], "7093/9597", dx=-8, dy=4, size=13, color="ink", anchor="end", middle=True, halo=True)
    right.text(276, 290, "*b*", size=14, color="dim", anchor="end")
