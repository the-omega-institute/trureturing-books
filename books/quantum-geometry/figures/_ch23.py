"""Shared drawing for the chapter 23 figures (not a figure itself).

Two pictures recur. The Eisenstein lattice is drawn in the complex plane at x + y·e^{iπ/3}, so that
eisNorm(x, y) = x² + xy + y² is the squared distance from the origin (the convention of the
norm-lattice lab page). The golden units are drawn in the (g, ḡ) plane, where the golden norm is the
signed area g·ḡ.

Colours follow the chapter's lab page: cyan is the norm circle the reading lives on and the trace (the
shadow on the real axis); magenta is area (the lattice cell, the golden norm hyperbolas).
"""

import math

R3 = math.sqrt(3) / 2
PHI = (1 + math.sqrt(5)) / 2


def eis(x, y):
    """The plane point of the Eisenstein integer with lattice coordinates (x, y)."""
    return x + y / 2, y * R3


def eis_norm(x, y):
    return x * x + x * y + y * y


def lattice(r_max, n=6):
    """Lattice coordinates (x, y) with |x|, |y| ≤ n whose point lies within distance r_max."""
    out = []
    for x in range(-n, n + 1):
        for y in range(-n, n + 1):
            px, py = eis(x, y)
            if px * px + py * py <= r_max * r_max + 1e-9:
                out.append((x, y))
    return out


# checks: the norm is the squared distance, and the circles named in the text carry the right points
for _x in range(-4, 5):
    for _y in range(-4, 5):
        _p = eis(_x, _y)
        assert abs(_p[0] ** 2 + _p[1] ** 2 - eis_norm(_x, _y)) < 1e-9
assert len([p for p in lattice(3) if eis_norm(*p) == 7]) == 12
assert len([p for p in lattice(1.1) if eis_norm(*p) == 1]) == 6


def golden_unit(n):
    """φⁿ as (a, b) with φⁿ = a + bφ, and its two real embeddings (g, ḡ)."""
    a, b = 1, 0
    step = (0, 1) if n >= 0 else (-1, 1)          # φ = (0, 1); φ⁻¹ = φ − 1 = (−1, 1)
    for _ in range(abs(n)):
        a, b = a * step[0] + b * step[1], a * step[1] + b * step[0] + b * step[1]
    return (a, b), (a + b * PHI, a + b * (1 - PHI))


for _n in range(-3, 6):
    (_a, _b), (_g, _gb) = golden_unit(_n)
    assert abs(_g - PHI ** _n) < 1e-9 and _a * _a + _a * _b - _b * _b == (-1) ** (_n % 2)
assert [(2 * golden_unit(k)[0][0] + golden_unit(k)[0][1], golden_unit(k)[0][1]) for k in range(5)] == \
    [(2, 0), (1, 1), (3, 1), (4, 2), (7, 3)]        # (L_k, F_k), the table of the chapter's example
