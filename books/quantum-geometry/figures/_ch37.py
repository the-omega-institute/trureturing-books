"""Shared numbers for the chapter 37 figures (not a figure itself).

The 2 × 2 waking tax of §37.1: ρ̃ = U(θ)|0⟩⟨0|U(θ)†, pinched to diag(cos² θ, sin² θ); the discarded
coherence mass |ρ₀₁|² + |ρ₁₀|² = ½ sin² 2θ and the entropy tax −cos² θ ln cos² θ − sin² θ ln sin² θ.
The Gram example ex-ch37-gram-constraint-release (c₁₂ = x₁ = 4/5). The two-copy phase ledger of §37.2.
The golden cut-and-project points of §37.4 (u = ⟨a, b⟩ ↦ (a + bφ, a + b(1 − φ)), window [φ − 2, φ − 1]).
The numbers the chapter gives are asserted below.
"""

import math


# ---- §37.1: the 2 × 2 waking tax
def pinched_pair(theta):
    """(ρ̃ before, ρ after the basis pinching) as nested lists of the real 2 × 2 matrices."""
    c, s = math.cos(theta), math.sin(theta)
    before = [[c * c, c * s], [c * s, s * s]]
    after = [[c * c, 0.0], [0.0, s * s]]
    return before, after


def coherence_mass(theta):
    before, after = pinched_pair(theta)
    return sum((before[i][j] - after[i][j]) ** 2 for i in range(2) for j in range(2))


def entropy_tax(theta):
    p = math.cos(theta) ** 2
    return -sum(q * math.log(q) for q in (p, 1 - p) if q > 0)


for _th in (0.1, 0.4, math.pi / 4, 1.2):
    assert abs(coherence_mass(_th) - 0.5 * math.sin(2 * _th) ** 2) < 1e-12
    assert abs(coherence_mass(_th) - 2 * math.cos(_th) ** 2 * math.sin(_th) ** 2) < 1e-12
assert abs(entropy_tax(math.pi / 4) - math.log(2)) < 1e-12 and abs(coherence_mass(math.pi / 4) - 0.5) < 1e-12

# ---- §37.2: the Gram example
C12 = X1 = 4 / 5


def det_g3(x2, c=C12, x1=X1):
    return 1 - c * c - x1 * x1 - x2 * x2 + 2 * c * x1 * x2


def det_g2(x1=X1):
    return 1 - x1 * x1


for _x2 in (-1, -0.3, 0, 0.5, 0.9):
    assert abs(det_g3(_x2) - ((1 - C12 ** 2) * (1 - X1 ** 2) - (_x2 - C12 * X1) ** 2)) < 1e-12
    assert abs(det_g2() - det_g3(_x2) - (C12 ** 2 * (1 - X1 ** 2) + (_x2 - C12 * X1) ** 2)) < 1e-12
WAKE_LO, WAKE_HI = 7 / 25, 1.0
assert abs(det_g3(WAKE_LO)) < 1e-12 and abs(det_g3(WAKE_HI)) < 1e-12
assert abs(det_g3(4 / 5) - 13 / 125) < 1e-12 and abs(det_g3(0) + 7 / 25) < 1e-12 and abs(det_g2() - 9 / 25) < 1e-12

# ---- §37.2: the two-copy phase ledger, ρ₀₁ = 1/2, overlap γ = 1·conj(i) = −i per copy
GAMMA = 1 * (1j).conjugate()
assert GAMMA == -1j and GAMMA.conjugate() * GAMMA == 1
RHO01 = 0.5
WRITTEN = RHO01 * GAMMA * GAMMA
HALF = WRITTEN * GAMMA.conjugate()
FULL = WRITTEN * GAMMA.conjugate() ** 2
assert WRITTEN == -0.5 and HALF == -0.5j and FULL == 0.5

# ---- §37.4: golden cut and project
PHI = (1 + math.sqrt(5)) / 2
W_LO, W_HI = PHI - 2, PHI - 1
assert abs(W_LO + 1 / PHI ** 2) < 1e-12 and abs(W_HI - 1 / PHI) < 1e-12 and abs(W_HI - W_LO - 1) < 1e-12
EPS = 1e-9


def lattice(xmin, xmax, pmin, pmax, n=12):
    """All ⟨a, b⟩ with physical a + bφ in [xmin, xmax] and conjugate a + b(1 − φ) in [pmin, pmax]."""
    out = []
    for a in range(-n, n + 1):
        for b in range(-n, n + 1):
            x, p = a + b * PHI, a + b * (1 - PHI)
            if xmin <= x <= xmax and pmin <= p <= pmax:
                out.append((a, b, x, p))
    return out


def in_window(p):
    return W_LO - EPS <= p <= W_HI + EPS


_lit = sorted(x for a, b, x, p in lattice(-3.0, 4.5, -2, 2) if in_window(p))
assert all(abs(u - v) < 1e-9 for u, v in zip(_lit, [-1 - PHI, -PHI, 0.0, 1 + PHI, 1 + 2 * PHI])), _lit
assert len(_lit) == 5 and min(v - u for u, v in zip(_lit, _lit[1:])) >= 1 - 1e-9
assert not in_window(0 + 1 * (1 - PHI))  # ⟨0, 1⟩ ↦ φ falls out of the window
