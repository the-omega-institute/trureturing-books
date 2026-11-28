"""Exact rational arithmetic compares the norm-five Hecke shells with the Ramanujan bound."""

from collections import defaultdict
from fractions import Fraction
from math import comb, sqrt

SIZE = (704, 326)
WRAP = True
ALT = {
    "zh": "左图将六个模方为 5 的旋子按轴配对。它们对 χ₁ 的未归一化和给出特征值 −2/5 及半正定余量 "
          "496/25。右图画出六项平均在SO(3) 的整数自旋 ℓ=1 到 6 的谱半径，六个值均严格低于 √5/3。",
    "en": "Left, the six norm-five spinors are paired by axis. Their unnormalized sum acts on χ₁ "
          "with eigenvalue −2/5 and PSD margin 496/25. Right, the radii of the six-term average on "
          "SO(3) shells at spins ℓ=1 through 6 all lie strictly below √5/3.",
}

PRIME = 5
SPINORS = tuple((1, *(2 * sign if i == axis else 0 for i in range(3)))
                for axis in range(3) for sign in (1, -1))


def rotation_numerator(q):
    w, x, y, z = q
    return (
        (w*w + x*x - y*y - z*z, 2*(x*y - w*z), 2*(x*z + w*y)),
        (2*(x*y + w*z), w*w - x*x + y*y - z*z, 2*(y*z - w*x)),
        (2*(x*z - w*y), 2*(y*z + w*x), w*w - x*x - y*y + z*z),
    )


def hecke_numerator(spin):
    """Act on degree-spin polynomials modulo x²+y²+z², a real model of V_spin."""
    basis = [(spin - y - z, y, z) for z in (0, 1) for y in range(spin + 1 - z)]
    rotations = [rotation_numerator(q) for q in SPINORS]
    columns = []
    for powers in basis:
        column = defaultdict(int)
        for rotation in rotations:
            polynomial = {(0, 0, 0): 1}
            for power, linear in zip(powers, rotation):
                for _ in range(power):
                    expanded = defaultdict(int)
                    for (x, y, z), coefficient in polynomial.items():
                        for monomial, value in zip(((x + 1, y, z), (x, y + 1, z), (x, y, z + 1)), linear):
                            if value:
                                expanded[monomial] += coefficient * value
                    polynomial = expanded
            for (x, y, z), coefficient in polynomial.items():
                pairs, parity = divmod(z, 2)
                # Replace z² by −x²−y² and collect coefficients in the quotient basis.
                for k in range(pairs + 1):
                    monomial = (x + 2 * (pairs - k), y + 2 * k, parity)
                    column[monomial] += coefficient * (-1) ** pairs * comb(pairs, k)
        columns.append([column[monomial] for monomial in basis])
    return list(zip(*columns))


def matrix_product(a, b):
    return [[sum(x * y for x, y in zip(row, col)) for col in zip(*b)] for row in a]


def characteristic_polynomial(matrix):
    """Use Newton's identities on the exact power traces. Return coefficients in ascending order."""
    size = len(matrix)
    traces = [0]
    power = matrix
    leading_first = [1]
    for degree in range(1, size + 1):
        traces.append(sum(power[i][i] for i in range(size)))
        coefficient, remainder = divmod(-sum(leading_first[degree - i] * traces[i]
                                             for i in range(1, degree + 1)), degree)
        assert remainder == 0
        leading_first.append(coefficient)
        if degree < size:
            power = matrix_product(power, matrix)
    return leading_first[::-1]


def strictly_above_roots(polynomial, threshold):
    """A monic real-rooted polynomial shifted beyond its largest root has all positive coefficients."""
    num, den = threshold.numerator, threshold.denominator
    degree = len(polynomial) - 1
    return all(
        sum(polynomial[i] * comb(i, k) * num ** (i - k) * den ** (degree - i)
            for i in range(k, degree + 1)) > 0
        for k in range(degree + 1)
    )


def radius_bracket(spin, character):
    # Rotations act orthogonally for the invariant inner product. The inverse-paired sum
    # is self-adjoint, so the squared numerator has real, nonnegative eigenvalues.
    numerator = hecke_numerator(spin)
    denominator = len(SPINORS) * PRIME ** spin
    assert Fraction(sum(row[i] for i, row in enumerate(numerator)), denominator) == character
    polynomial = characteristic_polynomial(matrix_product(numerator, numerator))
    scale = 10000

    def above_radius(tick):
        return strictly_above_roots(polynomial, Fraction(tick * denominator, scale) ** 2)

    lo, hi = 0, scale + 1
    assert not above_radius(lo) and above_radius(hi)
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if above_radius(mid):
            hi = mid
        else:
            lo = mid
    return Fraction(lo, scale), Fraction(hi, scale)


def draw(fig):
    left, right = fig.row([344, 344], 326)
    assert all(sum(value ** 2 for value in q) == PRIME for q in SPINORS)
    # In the six right-products, all cross terms in χ₁ cancel between sign pairs.
    chi1_coefficients = (3, -1, -1, -1)
    eigenvalue = Fraction(-2, 5)
    for i, coefficient in enumerate(chi1_coefficients):
        assert Fraction(4 * sum(q[i] ** 2 for q in SPINORS), PRIME) - len(SPINORS) == eigenvalue * coefficient
    margin = 4 * PRIME - eigenvalue ** 2
    assert margin == Fraction(496, 25) > 0

    left.text(172, 24, left.t("S₅ 的六个模方 5 旋子", "The six norm-five spinors in S₅"),
              size=18, anchor="middle", weight=600)
    pairs = ("(1, ±2, 0, 0)", "(1, 0, ±2, 0)", "(1, 0, 0, ±2)")
    for index, pair in enumerate(pairs):
        box = left.box(65 + 107 * index, 63, pair, "cyan", w=100, pad=4, size=13)
        left.line(*box.bottom, box.bottom[0], 123, "cyan", 1.5)
    left.line(65, 123, 279, 123, "cyan", 1.5)
    left.arrow(172, 123, 172, 153, "cyan", 1.5, head=6)
    left.box(172, 157, "Σ_{s∈S₅} χ₁(qs) = (−2/5) χ₁(q)", "ink", w=255, size=17)
    left.text(172, 217, left.t("六项和的特征值 λ̂ = −2/5", "Eigenvalue of the sum λ̂ = −2/5"),
              size=15, anchor="middle")
    left.line(47, 240, 297, 240, "ink", 1.0, opacity=0.28)
    left.text(172, 266, left.t("半正定余量", "PSD margin"), size=15, anchor="middle", weight=600)
    left.text(172, 292, "4·5 − (−2/5)² = 496/25 > 0", size=17, anchor="middle")

    right.text(172, 24, right.t("SO(3) 壳层六项平均的谱半径", "Spectral radii on SO(3) shells"),
               size=17, anchor="middle", weight=600)
    bound = sqrt(PRIME) / 3
    ax = right.axes(41, 75, 272, 175, (0.45, 6.55), (0, 0.80))
    ax.xaxis(ticks=list(range(1, 7)), color="ink")
    ax.yaxis(ticks=[0, 0.25, 0.5], labels=["0", "1/4", "1/2"], color="ink")
    ax.hline(bound, "violet", 1.8, dash="5 4")
    ax.text(6.55, bound, right.t("LPS 界 √5/3 ≈ 0.745", "LPS bound √5/3 ≈ 0.745"),
            dy=-13, anchor="end", size=14, color="violet")
    ax.text(6.55, 0, "ℓ", dx=10, dy=5, size=14)
    character, previous = Fraction(-1, PRIME), Fraction(1)
    for spin in range(1, 7):
        lo, hi = radius_bracket(spin, character)
        character, previous = Fraction(-6, PRIME) * character - previous, character
        assert hi ** 2 < Fraction(PRIME, 9)
        radius = float((lo + hi) / 2)
        ax.path([(spin, 0), (spin, radius)], "cyan", 2)
        ax.points([(spin, radius)], "cyan", 4.1)
        ax.text(spin, radius, f"{radius:.3f}", dy=-11, anchor="middle", size=13, halo=True)
    right.text(172, 300, "max |λ(T₅|V_{ℓ})|", size=17, anchor="middle", weight=600)
