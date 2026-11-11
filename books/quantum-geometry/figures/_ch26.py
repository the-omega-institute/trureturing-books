"""Shared computation for the chapter 26 figures (not a figure itself).

A sparse Cl(3,0) product on 3-bit blade masks, the same rule as the chapter's engine (mask = left ^ right,
sign from the inversion count), the elementary rotors R_u(θ) = cos(θ/2) − sin(θ/2) B_u with B_x = e₂e₃,
B_y = e₃e₁ = −e₁e₃, B_z = e₁e₂, the ZYZ compiler and the sandwich v ↦ R v R̃. The chapter's printed numbers
are checked by check_example().
"""

import math


def blade_sign(left, right):
    inversions = 0
    for i in range(3):
        if (left >> i) & 1:
            inversions += bin(right & ((1 << i) - 1)).count("1")
    return -1 if inversions % 2 else 1


def mul(a, b):
    out = {}
    for l, x in a.items():
        for r, y in b.items():
            m = l ^ r
            out[m] = out.get(m, 0.0) + x * y * blade_sign(l, r)
    return {m: v for m, v in out.items() if abs(v) > 1e-14}


def reverse(a):
    out = {}
    for m, v in a.items():
        g = bin(m).count("1")
        out[m] = v * (-1 if g * (g - 1) // 2 % 2 else 1)
    return out


BIVECTOR = {"x": {6: 1.0}, "y": {5: -1.0}, "z": {3: 1.0}}


def rotor(axis, theta):
    c, s = math.cos(theta / 2), math.sin(theta / 2)
    out = {0: c}
    for m, v in BIVECTOR[axis].items():
        out[m] = out.get(m, 0.0) - s * v
    return out


def compile_zyz(alpha, beta, gamma):
    return mul(mul(rotor("z", alpha), rotor("y", beta)), rotor("z", gamma))


def apply(R, v):
    vec = {1: v[0], 2: v[1], 4: v[2]}
    out = mul(mul(R, vec), reverse(R))
    return (out.get(1, 0.0), out.get(2, 0.0), out.get(4, 0.0))


def coeffs(R):
    """(scalar, e₁₂, e₁₃, e₂₃)."""
    return tuple(R.get(m, 0.0) for m in (0, 3, 5, 6))


ANGLES = (0.37, -0.81, 0.52)


def check_example():
    R = compile_zyz(*ANGLES)
    want = (0.829592, -0.395635, -0.392911, 0.029524)
    assert all(abs(a - b) < 1e-6 for a, b in zip(coeffs(R), want)), coeffs(R)
    cols = [apply(R, e) for e in ((1, 0, 0), (0, 1, 0), (0, 0, 1))]
    M = ((0.378188, -0.633230, -0.675273), (0.679631, 0.685203, -0.261913), (0.628550, -0.359884, 0.689498))
    assert all(abs(cols[j][i] - M[i][j]) < 1e-6 for i in range(3) for j in range(3))
    assert abs(sum(c * c for c in coeffs(R)) - 1) < 1e-12
    # rotor("z", 0.5) turns e₁ to (cos 0.5, sin 0.5, 0) — the chapter's self-test
    x = apply(rotor("z", 0.5), (1, 0, 0))
    assert abs(x[0] - math.cos(0.5)) < 1e-12 and abs(x[1] - math.sin(0.5)) < 1e-12
    return R


def title(p, zh, en, y=22):
    p.text(p.width / 2, y, p.t(zh, en), size=14, weight=600, anchor="middle")
