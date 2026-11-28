"""A quadratic recurrence builds a Fibonacci lattice, and square completion exposes an exact minimum."""

from fractions import Fraction

SIZE = (704, 330)
WRAP = True
ALT = {
    "zh": "左图在 QPhi 的系数格点上描出 φ¹ 到 φ⁷，并标出精确闭合 T₅(φ/2)=−1。"
          "右图取 A=2、B=1、C=3/2，将 x 固定为 1，抛物线在 y*=−2/3 处取得舒尔最小值 4/3。",
    "en": "Left, the coefficient lattice of QPhi traces φ¹ through φ⁷ and records the exact closure "
          "T₅(φ/2)=−1. Right, for A=2, B=1, C=3/2 and x=1, the parabola attains its Schur minimum "
          "4/3 at y*=−2/3.",
}


def multiply(left, right):
    p, q = left
    r, s = right
    return p*r + q*s, p*s + q*r + q*s


def draw(fig):
    left, right = fig.row([344, 344], 330)
    phi = (0, 1)
    powers = [phi]
    for _ in range(6):
        powers.append(multiply(powers[-1], phi))
    assert powers[-1] == (8, 13)

    previous, current = (1, 0), (0, Fraction(1, 2))
    for _ in range(4):
        twice_product = multiply(phi, current)
        previous, current = current, tuple(value - old for value, old in zip(twice_product, previous))
    assert current == (-1, 0)

    left.text(172, 24, left.t("QPhi 的 Fibonacci 格点", "Fibonacci lattice in QPhi"),
              size=18, anchor="middle", weight=600)
    ax = left.axes(50, 59, 231, 172, (0, 9), (0, 14))
    ax.xaxis(ticks=[0, 2, 4, 6, 8])
    ax.yaxis(ticks=[0, 3, 6, 9, 12])
    ax.grid(xs=range(1, 9), ys=range(1, 14))
    ax.path(powers, "cyan", 2.1)
    ax.points(powers, "cyan", 3.7)
    for index, (dx, dy) in ((0, (5, -16)), (3, (-19, -9)), (5, (-24, -8)), (6, (-9, -10))):
        ax.text(*powers[index], f"φ^{{{index + 1}}}", dx=dx, dy=dy, size=15, color="cyan", halo=True)
    left.text(304, 236, "p", size=14)
    left.text(45, 52, "q", size=14, anchor="end")
    left.text(172, 280, "φ^{n} = F_{n−1} + F_{n}φ", size=16, anchor="middle")
    left.text(172, 313, "T₅(φ/2) = −1", size=18, anchor="middle", color="blue", weight=600)

    a, b, c = 2, 1, Fraction(3, 2)
    optimum = -b/c
    schur = a - b*b/c
    assert optimum == Fraction(-2, 3) and schur == Fraction(4, 3)
    assert a + 2*b*optimum + c*optimum**2 == schur
    right.text(172, 24, right.t("有理舒尔抛物线 · x = 1", "Rational Schur parabola · x = 1"),
               size=17, anchor="middle", weight=600)
    ax = right.axes(51, 57, 250, 174, (-2.4, 1.05), (0, 6.5))
    ax.xaxis(ticks=[-2, -1, 0, 1], labels=["−2", "−1", "0", "1"])
    ax.yaxis(ticks=[2, 4, 6])
    ax.grid(ys=[2, 4, 6])
    ax.plot(lambda y: schur + c*(y - optimum)**2, color="violet", width=2.5)
    ax.path([(optimum, 0), (optimum, schur), (-2.4, schur)], "cyan", 1.3, dash="4 3")
    ax.points([(optimum, schur)], "cyan", 4.5)
    ax.text(optimum, schur, "(−2/3, 4/3)", dx=10, dy=17, size=14, color="cyan", halo=True)
    right.text(317, 236, "y", size=14)
    right.text(172, 269, "A = 2    B = 1    C = 3/2", size=14, anchor="middle")
    right.text(172, 300, "y* = −2x/3    ·    S = 4/3", size=17, anchor="middle", color="blue")
