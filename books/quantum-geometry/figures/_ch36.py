"""Shared numbers for the chapter 36 figures (not a figure itself).

The rapidity staircase of ex-ch36-inverse-gudermannian-discrete-staircase: start at the cosine fixed
point θ* (cos θ* = θ*), rapidity η(θ) = ln tan(θ/2 + π/4), equal steps η_k = η₀ + kΔη, and back to the
angle by the Gudermannian θ_k = 2 arctan(e^{η_k}) − π/2, so that sin θ_k = tanh η_k, cos θ_k = sech η_k.
The pinching ledger of the 2 × 2 example ρ(c, s), and the repeating decimal 1/7 = 0.142857….
The table of the example is asserted below.
"""

import math


def fixed_point():
    x = 0.7
    for _ in range(200):
        x = math.cos(x)
    return x


THETA_STAR = fixed_point()


def eta(theta):
    """Rapidity of the angle θ ∈ [0, π/2): η = ∫₀^θ sec α dα."""
    return math.log(math.tan(theta / 2 + math.pi / 4))


def gd(e):
    """The Gudermannian: the angle whose rapidity is e."""
    return 2 * math.atan(math.exp(e)) - math.pi / 2


ETA0 = eta(THETA_STAR)


def theta_k(k, step=1.0):
    return gd(ETA0 + k * step)


# the example's numbers
assert abs(THETA_STAR - 0.73908513) < 1e-8 and abs(math.degrees(THETA_STAR) - 42.3465) < 5e-5
assert abs(ETA0 - 0.81732635) < 1e-8
for k, deg, s, c in ((1, 71.5447, 0.948571, 0.316564), (2, 83.1595, 0.992882, 0.119106),
                     (4, 89.0732, 0.999869, 0.016176), (8, 89.9830, 0.99999996, 0.000296)):
    th = theta_k(k)
    assert abs(math.degrees(th) - deg) < 5e-5, (k, math.degrees(th))
    assert abs(math.sin(th) - math.tanh(ETA0 + k)) < 1e-12 and abs(math.cos(th) - 1 / math.cosh(ETA0 + k)) < 1e-12
    assert abs(math.sin(th) - s) < 5e-7 and abs(math.cos(th) - c) < 5e-7
    assert math.pi / 2 - th > 0


def pinching_ledger(theta):
    """(diagonal mass, off-diagonal mass) of ρ(cos θ, sin θ), from the matrix entries."""
    c, s = math.cos(theta), math.sin(theta)
    rho = [[(1 + c) / 2, s / 2], [s / 2, (1 - c) / 2]]
    diag = rho[0][0] ** 2 + rho[1][1] ** 2
    off = rho[0][1] ** 2 + rho[1][0] ** 2
    assert abs(diag - (0.5 + c * c / 2)) < 1e-12 and abs(off - s * s / 2) < 1e-12 and abs(diag + off - 1) < 1e-12
    return diag, off


def seventh_digits(n):
    """The first n decimal digits of 1/7 by long division."""
    out, r = [], 1
    for _ in range(n):
        r *= 10
        out.append(r // 7)
        r %= 7
    return out


DIGITS = seventh_digits(12)
assert DIGITS[:6] == [1, 4, 2, 8, 5, 7] and DIGITS[6:] == DIGITS[:6]
assert 10 ** 6 * 142857 // 999999 == 142857 and 142857 * 7 == 999999
