"""Shared computations for the chapter 12 figures (not a figure itself).

The two-qubit cluster link of section sec-cluster-measurement-feedforward, the downhill flow of V(r) = r_z on the unit
sphere from example ex-cluster-shift-and-gradient (step 3), and the density of one coordinate of a uniform point on
S^{d−1} (rem-sphere-equator-markov-literature). The chapter's printed numbers are asserted.
"""

import cmath
import math

# ---------------------------------------------------------------- the cluster link

R2 = 1 / math.sqrt(2)


def bloch(v):
    """The Bloch vector of the (normalised) 2-vector ``v``."""
    a, b = v
    n = abs(a) ** 2 + abs(b) ** 2
    a, b = a / math.sqrt(n), b / math.sqrt(n)
    c = 2 * a.conjugate() * b
    return (c.real, c.imag, abs(a) ** 2 - abs(b) ** 2)


def ket(theta_deg, phi_deg):
    t, p = math.radians(theta_deg), math.radians(phi_deg)
    return (complex(math.cos(t / 2)), cmath.exp(1j * p) * math.sin(t / 2))


def branch(psi, alpha, s):
    """⟨s_α| on qubit 1 of CZ(|ψ⟩ ⊗ |+⟩): the unnormalised state left on qubit 2."""
    a, b = psi
    # CZ(|ψ⟩|+⟩) = a|0⟩|+⟩ + b|1⟩|−⟩, with ⟨s_α| = (⟨0| + (−1)^s e^{−iα}⟨1|)/√2
    plus, minus = (R2, R2), (R2, -R2)
    w = (-1) ** s * cmath.exp(-1j * alpha)
    return tuple(R2 * (a * plus[i] + w * b * minus[i]) for i in range(2))


def formula(psi, alpha, s):
    """(1/√2) Xˢ H diag(1, e^{−iα}) |ψ⟩, the chapter's closed form."""
    a, b = psi
    a, b = a, cmath.exp(-1j * alpha) * b
    h = (R2 * (a + b), R2 * (a - b))
    if s:
        h = (h[1], h[0])
    return tuple(R2 * c for c in h)


for _psi in (ket(40, 0), ket(110, 75), (1 + 0j, 0j)):
    for _s in (0, 1):
        _x, _y = branch(_psi, math.pi / 3, _s), formula(_psi, math.pi / 3, _s)
        assert max(abs(_x[i] - _y[i]) for i in range(2)) < 1e-12
        assert abs(sum(abs(c) ** 2 for c in _x) - 0.5) < 1e-12          # each branch has probability ½
# the worked example: |ψ⟩ = |0⟩, α = π/3 gives |+⟩ in both branches after the correction
assert max(abs(a - b) for a, b in zip(bloch(branch((1 + 0j, 0j), math.pi / 3, 0)), (1, 0, 0))) < 1e-12


def flip_x(r):
    """The Bloch action of the correction X: a half turn about x."""
    return (r[0], -r[1], -r[2])


# ---------------------------------------------------------------- the downhill flow of V = r_z on S²

THETA0 = math.radians(60)        # r = (√3/2, 0, ½), V = ½


def flow_theta(t, theta0=THETA0):
    """Polar angle on the exact flow ṙ = −grad V, V = cos θ: θ̇ = sin θ, so tan(θ/2) = tan(θ₀/2) eᵗ."""
    return 2 * math.atan(math.tan(theta0 / 2) * math.exp(t))


def potential(t):
    return math.cos(flow_theta(t))


def speed2(t):
    """|ṙ|² = |grad V|² = sin² θ."""
    return math.sin(flow_theta(t)) ** 2


assert abs(potential(0) - 0.5) < 1e-12 and abs(speed2(0) - 0.75) < 1e-12          # V = 0.5, dV/dt = −3/4
_h = 1e-6
assert abs((potential(_h) - potential(-_h)) / (2 * _h) + speed2(0)) < 1e-8        # dV/dt = −|ṙ|²


def integral(f, a, b, n=4000):
    h = (b - a) / n
    return h / 3 * (f(a) + f(b) + sum((4 if k % 2 else 2) * f(a + k * h) for k in range(1, n)))


# ---------------------------------------------------------------- one coordinate of a uniform point on S^{d−1}

def density(x, d):
    """The density of x₁ for x uniform on S^{d−1} ⊂ ℝ^d: Γ(d/2)/(√π Γ((d−1)/2)) (1 − x²)^{(d−3)/2}."""
    c = math.exp(math.lgamma(d / 2) - math.lgamma((d - 1) / 2)) / math.sqrt(math.pi)
    return c * max(0.0, 1 - x * x) ** ((d - 3) / 2)


for _d in (3, 30, 300):
    assert abs(integral(lambda x: density(x, _d), -1, 1) - 1) < 1e-6
    assert abs(integral(lambda x: x * x * density(x, _d), -1, 1) - 1 / _d) < 1e-6   # E[x₁²] = 1/d
assert abs(density(0.3, 3) - 0.5) < 1e-12                                         # d = 3: flat at ½
