"""The rational Haar moment functional makes the first Peter–Weyl characters orthonormal."""

from fractions import Fraction
from math import comb

SIZE = (704, 327)
WRAP = True
ALT = {
    "zh": "左图标出 κ 的前五个哈尔矩，依次为 1、1/4、1/8、5/64 和 7/128。右图画出"
          "前三个彼得—魏尔特征标，按这些矩计算的哈尔内积等于克罗内克 δ。",
    "en": "Left, the first five Haar moments of κ are 1, 1/4, 1/8, 5/64, and 7/128. Right, the first "
          "three Peter–Weyl characters are plotted. Their Haar inner products, computed from those moments, "
          "equal the Kronecker delta.",
}


def moment(k):
    return Fraction(comb(2 * k, k), (k + 1) * 4 ** k)


def draw(fig):
    left, right = fig.row([344, 344], 327)
    moments = [moment(k) for k in range(5)]
    assert moments == [1, Fraction(1, 4), Fraction(1, 8), Fraction(5, 64), Fraction(7, 128)]
    characters = [(1,), (-1, 4), (1, -12, 16)]
    for i, chi_i in enumerate(characters):
        for j, chi_j in enumerate(characters):
            pairing = sum(a * b * moments[m + n] for m, a in enumerate(chi_i) for n, b in enumerate(chi_j))
            assert pairing == int(i == j)

    left.text(172, 24, left.t("S³ 上的无 π 哈尔矩", "π-free Haar moments on S³"),
              size=18, weight=600, anchor="middle")
    ax = left.axes(33, 56, 278, 187, (-0.5, 4.5), (0, 1.10))
    ax.grid(ys=[0.25, 0.5, 0.75, 1], color="ink")
    ax.xaxis(ticks=list(range(5)), color="ink")
    ax.text(4.5, 0, "k", dx=7, dy=5, size=14)
    for k, value in enumerate(moments):
        ax.path([(k, 0), (k, value)], "cyan", 2.4)
        ax.points([(k, value)], "cyan", 4.4)
        ax.text(k, value, str(value), dy=-11, size=15, anchor="middle", weight=600, halo=True)
    left.text(172, 301, "E[κ^{k}] = (2k)! / (4^{k} k! (k+1)!)", size=16, anchor="middle")

    right.text(172, 24, right.t("彼得—魏尔特征标", "Peter–Weyl characters"),
               size=18, weight=600, anchor="middle")
    ax = right.axes(40, 52, 268, 147, (0, 1), (-1.5, 5.5))
    ax.grid(ys=[0, 1, 3, 5], color="ink", width=1, dash="1 5")
    ax.yaxis(ticks=[-1, 1, 3, 5], labels=["−1", "1", "3", "5"], color="ink")
    ax.xaxis(ticks=[0, 0.5, 1], labels=["0", "1/2", "1"], color="ink")
    ax.text(1, -1.5, "κ", dx=13, dy=5, size=14)
    for coefficients, color, formula, y in zip(
        characters, ("ink", "cyan", "violet"),
        ("χ₀(κ) = 1", "χ₁(κ) = 4κ − 1", "χ₂(κ) = 16κ² − 12κ + 1"), (244, 265, 286),
    ):
        ax.plot(lambda k: sum(c * k ** n for n, c in enumerate(coefficients)), color=color, width=2.3)
        right.line(38, y - 5, 58, y - 5, color, 2.3)
        right.text(68, y, formula, size=14)
    right.text(308, 314, "⟨χ_{i}, χ_{j}⟩ = δ_{ij}", anchor="end", size=16, weight=600)
