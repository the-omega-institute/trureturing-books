"""Shared helpers for the chapter 10 figures (not a figure itself).

The three octant states are the ones of the chapter's worked example: ψ₀ = (1, 0), ψ₁ = (1, 1)/√2 and
ψ₂ = (1, i)/√2, at the north pole, +X and +Y of the Bloch sphere. States are plain tuples of complex numbers.
"""

import math

R2 = 1 / math.sqrt(2)
OCTANT = ((1 + 0j, 0j), (R2 + 0j, R2 + 0j), (R2 + 0j, R2 * 1j))


def inner(u, v):
    """⟨u, v⟩, conjugate-linear in the first slot."""
    return sum(a.conjugate() * b for a, b in zip(u, v))


def gram(states):
    return [[inner(u, v) for v in states] for u in states]


def bloch(psi):
    """The Bloch vector (x, y, z) of the unit state psi."""
    a, b = psi
    c = a.conjugate() * b
    return (2 * c.real, 2 * c.imag, abs(a) ** 2 - abs(b) ** 2)


def close(u, v, eps=1e-12):
    return all(abs(a - b) < eps for a, b in zip(u, v))


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")
