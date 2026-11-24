"""Local prime weights cancel the real factor, and reduced words branch without backtracking."""

from fractions import Fraction
from math import cos, prod, sin, tau

SIZE = (704, 354)
WRAP = True
ALT = {
    "zh": "左图依次乘上 12/35 的实绝对值和 2、3、5、7 处的 p 进绝对值，累乘值最终回到 1。"
          "右图展示三生成元自由群 F₃ 的 Cayley 树前两层。模方 5 的六个赫维茨旋子对应六条初始边，"
          "以后每层每点有五个前向分支，深度 0 至 5 的节点数为 1、6、30、150、750、3750。",
    "en": "Left, multiplying the real and 2-, 3-, 5-, and 7-adic absolute values of 12/35 brings the "
          "running product back to 1. Right, the first two levels of the F₃ Cayley tree start with six "
          "norm-five Hurwitz spinor steps, then branch five ways without backtracking. Shells of "
          "depth 0 through 5 have 1, 6, 30, 150, 750, and 3750 nodes.",
}


def valuation(integer, prime):
    exponent = 0
    while integer % prime == 0:
        integer //= prime
        exponent += 1
    return exponent


def draw(fig):
    left, right = fig.row([344, 344], 354)
    r = Fraction(12, 35)
    primes = [2, 3, 5, 7]
    factors = [r, *(Fraction(p)**(valuation(r.denominator, p)-valuation(r.numerator, p)) for p in primes)]
    products = [prod(factors[:i]) for i in range(len(factors) + 1)]
    assert products == [1, Fraction(12, 35), Fraction(3, 35), Fraction(1, 35), Fraction(1, 7), 1]
    left.text(172, 24, left.t("阿代尔乘积 · r = 12/35", "Adelic product · r = 12/35"),
              size=18, anchor="middle", weight=600)
    left.text(172, 51, left.t("累乘值（对数刻度）", "Running product (log scale)"), size=14, anchor="middle")
    ax = left.axes(53, 76, 248, 145, (0, 5), (0.021, 1.3), logy=True)
    ax.yaxis(ticks=[Fraction(1, 35), Fraction(1, 7), 1], labels=["1/35", "1/7", "1"])
    ax.grid(ys=[Fraction(1, 35), Fraction(1, 7), 1])
    for i, (a, b) in enumerate(zip(products, products[1:])):
        role = "cyan" if b < a else "violet"
        ax.path([(i, a), (i + 1, b)], role, 2.2)
        ax.points([(i + 1, b)], role, 3.6)
        ax.text(i + 0.5, 0.021, str(factors[i]), dy=25, size=14, anchor="middle", color=role)
        ax.text(i + 0.5, 0.021, ["∞", "2", "3", "5", "7"][i], dy=47, size=14, anchor="middle")
    ax.points([(0, 1)], "ink", 3.6)
    left.text(172, 310, "|r|_{∞} · ∏ |r|_{p} = 1", size=18, anchor="middle", weight=600)

    right.text(172, 24, right.t("赫维茨 S₅ · F₃ 的六价树", "Hurwitz S₅ · the 6-valent F₃ tree"),
               size=17, anchor="middle", weight=600)
    cx, cy = 172, 153
    for i in range(6):
        angle = tau*i/6
        x, y = cx + 66*cos(angle), cy + 66*sin(angle)
        right.line(cx, cy, x, y, "cyan", 1.7)
        for j in range(-2, 3):
            tip_angle = angle + j*tau/33
            u, v = cx + 99*cos(tip_angle), cy + 99*sin(tip_angle)
            right.line(x, y, u, v, "violet", 1)
            right.dot(u, v, 2.2, "violet")
        right.dot(x, y, 3.8, "cyan", ring="bg")
    right.dot(cx, cy, 5, "ink", ring="bg")
    counts = [1, *(6 * 5**(depth-1) for depth in range(1, 6))]
    assert counts == [1, 6, 30, 150, 750, 3750]
    right.text(15, 283, right.t("深度", "Depth"), size=13)
    right.text(15, 309, right.t("节点", "Nodes"), size=13)
    for i, value in enumerate(counts):
        x = 72 + 49*i
        right.text(x, 283, str(i), size=13, anchor="middle", color="dim")
        right.text(x, 309, str(value), size=14, anchor="middle", color="violet")
    right.text(172, 339, "⟨S₅⟩ ≅ F₃   ↪   SO(3, ℚ)", size=16, anchor="middle")
