"""Integer-spin characters are polynomials, and the quadrupole changes by a traceless diagonal."""

from fractions import Fraction

SIZE = (704, 324)
WRAP = True
ALT = {
    "zh": "左图在 0≤κ≤1 上绘出 E₀、E₁、E₂、E₃，四条曲线分别在 κ=1 处达到 1、3、5、7。"
          "右图对比闭壳层 d¹⁰ 的零对角元与 d⁸ 的精确有理对角元 (−4/7, −4/7, +8/7)。两者的迹均为零。",
    "en": "Left, the integer-spin polynomials E₀, E₁, E₂, and E₃ reach 1, 3, 5, and 7 at κ=1. "
          "Right, the closed d¹⁰ shell has a zero diagonal, while d⁸ has the exact rational "
          "diagonal (−4/7, −4/7, +8/7). Both traces vanish.",
}


def shells(kappa):
    values = [1, 4*kappa - 1]
    for _ in range(2):
        values.append((4*kappa - 2)*values[-1] - values[-2])
    return values


def draw(fig):
    left, right = fig.row([344, 344], 324)
    assert shells(1) == [1, 3, 5, 7]
    left.text(172, 24, left.t("偶阶 Chebyshev 自旋壳", "Even Chebyshev spin shells"),
              size=18, anchor="middle", weight=600)
    ax = left.axes(48, 58, 243, 182, (0, 1), (-2, 7.5))
    ax.xaxis(at=-2, ticks=[0, 0.25, 0.5, 0.75, 1], labels=["0", "1/4", "1/2", "3/4", "1"])
    ax.yaxis(ticks=[-2, 0, 2, 4, 6], labels=["−2", "0", "2", "4", "6"])
    ax.grid(ys=[0, 2, 4, 6])
    samples = [(k, shells(k)) for k in (Fraction(i, 100) for i in range(101))]
    for index, (role, label) in enumerate(zip(("dim", "cyan", "violet", "magenta"), "₀₁₂₃")):
        points = [(k, values[index]) for k, values in samples]
        ax.path(points, role, 2.3, dash="5 4" if index == 0 else None)
        ax.points([points[-1]], role, 3.2)
        ax.text(*points[-1], f"E{label}", dx=10, dy=4, size=15, color=role)
    left.text(320, 245, "κ", size=15)
    left.text(172, 295, "E_{n+1} = (4κ − 2) E_{n} − E_{n−1}", size=16, anchor="middle")

    orbitals = [(-2, -2, 4), (2, -4, 2), (-4, 2, 2), (2, 2, -4), (2, 2, -4)]
    closed = [Fraction(2*sum(column), 7) for column in zip(*orbitals)]
    vacated = [value - Fraction(2*removed, 7) for value, removed in zip(closed, orbitals[-1])]
    assert closed == [0, 0, 0]
    assert vacated == [Fraction(-4, 7), Fraction(-4, 7), Fraction(8, 7)]
    assert sum(vacated) == 0

    right.text(172, 24, right.t("有理四极矩 · 对角元", "Rational quadrupole diagonals"),
               size=18, anchor="middle", weight=600)
    ax = right.axes(60, 62, 234, 178, (0.5, 3.5), (-0.85, 1.4))
    ax.xaxis(at=-0.85, ticks=[1, 2, 3], labels=["x", "y", "z"])
    ax.yaxis(ticks=[-0.5, 0, 0.5, 1], labels=["−1/2", "0", "1/2", "1"])
    ax.hline(0, "dim", 1.2)
    ax.bars([(i + 0.13, value) for i, value in enumerate(vacated, 1)], "violet", bar=0.36,
            base=0, fill_opacity=0.65)
    ax.points([(i - 0.22, value) for i, value in enumerate(closed, 1)], "cyan", 4)
    for i, value in enumerate(vacated, 1):
        label = str(value).replace("-", "−") if value < 0 else f"+{value}"
        ax.text(i + 0.13, value, label, dy=15 if value < 0 else -9, size=14,
                color="violet", anchor="middle")
    right.dot(57, 290, 4, "cyan")
    right.text(70, 295, "d¹⁰", size=16)
    right.rect(130, 285, 12, 10, color=None, fill="violet")
    right.text(151, 295, "d⁸", size=16)
    right.text(300, 295, right.t("迹", "Trace") + " = 0", size=15, anchor="end", color="blue")
