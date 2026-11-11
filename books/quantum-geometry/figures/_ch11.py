"""Shared drawing for the chapter 11 figures (not a figure itself).

Bloch-vector conventions of the chapter: R_φ(θ) = exp[−(i/2)θ(cos φ X + sin φ Y)] turns the Bloch vector by θ
about the equatorial axis n_φ = (cos φ, sin φ, 0); the carrier H₀ = ½ω₀Z turns it by ω₀t about +z, and the
rotating frame |ψ_rot⟩ = V|ψ_lab⟩ with V(t) = exp(+iω₀tZ/2) undoes exactly that turn.
The ordered-pulse kernel pulse0(X, s) = ∫₀¹ exp(s r i X) X dr is summed as a power series for 2 × 2 matrices.
"""

import math

from tbook import figkit


def drive_axis(phi):
    """The equatorial turning axis n_φ of the drive phase ``phi`` (radians)."""
    return (math.cos(phi), math.sin(phi), 0.0)


def rot_path(theta, phi=0.0, start=(0.0, 0.0, 1.0)):
    """The rotating-frame Bloch vector after a fixed-phase pulse of area ``theta``."""
    return figkit.rotate(start, drive_axis(phi), math.degrees(theta))


def lab_from_rot(v, carrier_angle):
    """The lab-frame Bloch vector: the rotating-frame one turned back by ω₀t about +z."""
    return figkit.rotate(v, (0.0, 0.0, 1.0), math.degrees(carrier_angle))


# the chapter's sign check (rem-virtual-z-scheduling-literature, item 3): |+⟩ under R_{−π/2}(π/2) reaches |0⟩,
# under R_{+π/2}(π/2) it reaches |1⟩
_plus = (1.0, 0.0, 0.0)
assert max(abs(a - b) for a, b in zip(rot_path(math.pi / 2, -math.pi / 2, _plus), (0.0, 0.0, 1.0))) < 1e-12
assert max(abs(a - b) for a, b in zip(rot_path(math.pi / 2, +math.pi / 2, _plus), (0.0, 0.0, -1.0))) < 1e-12
# a quarter-turn from the north pole about X ends on the equator at −y (the `quarter` card), P(0) = ½
_q = rot_path(math.pi / 2)
assert abs(_q[1] + 1) < 1e-12 and abs((1 + _q[2]) / 2 - 0.5) < 1e-12


# ---------------------------------------------------------------- 2 × 2 complex matrices for pulse0

def mat_mul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)]


def mat_add(a, b, s=1.0):
    return [[a[i][j] + s * b[i][j] for j in range(2)] for i in range(2)]


def trace(a):
    return a[0][0] + a[1][1]


def frobenius(a):
    return math.sqrt(sum(abs(a[i][j]) ** 2 for i in range(2) for j in range(2)))


def pulse0(x, s, terms=40):
    """pulse0(X, s) = Σ_k (s i)^k X^{k+1} / (k+1)!, the series of ∫₀¹ exp(s r i X) X dr."""
    out = [[0j, 0j], [0j, 0j]]
    power = [[complex(v) for v in row] for row in x]          # X^{k+1}
    coef = 1.0 + 0j                                             # (s i)^k / (k+1)!
    for k in range(terms):
        out = mat_add(out, [[coef * v for v in row] for row in power])
        power = mat_mul(power, x)
        coef *= (s * 1j) / (k + 2)
    return out


def normalised(a):
    f = frobenius(a)
    return [[v / f for v in row] for row in a]


# three real symmetric matrices with Frobenius norm 1 (L = 1)
PULSE_A = normalised([[1.0, 0.0], [0.0, 0.2]])
PULSE_B = normalised([[0.9, 0.3], [0.3, 0.1]])
PULSE_C = normalised([[0.8, -0.2], [-0.2, 0.4]])
PULSE_L = 1.0


def ordered_trace(t):
    """Tr(pulse0(A, t) pulse0(B, t) pulse0(C, t)) for the three matrices above."""
    return trace(mat_mul(mat_mul(pulse0(PULSE_A, t), pulse0(PULSE_B, t)), pulse0(PULSE_C, t)))


TRACE_ABC = trace(mat_mul(mat_mul(PULSE_A, PULSE_B), PULSE_C)).real


def bound(t, L=PULSE_L):
    """The proposition's bound (5/4) L⁵ t²."""
    return 1.25 * L ** 5 * t ** 2


# the chapter's worked number: L = 1, t = 0.1 gives 0.0125
assert abs(bound(0.1) - 0.0125) < 1e-15
for _m in (PULSE_A, PULSE_B, PULSE_C):
    assert abs(frobenius(_m) - PULSE_L) < 1e-12 and _m[0][1] == _m[1][0]
# the closed form of item 2 agrees with the series, and the real deviation stays under the bound
for _t in (0.01, 0.1, 0.5, 1.0):
    assert abs(ordered_trace(_t).real - TRACE_ABC) <= bound(_t)


# ---------------------------------------------------------------- plane pictures

def along(ox, oy, deg, length):
    """The canvas point at ``length`` from ``(ox, oy)`` in direction ``deg`` (counter-clockwise from +x)."""
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def turn_arc(cv, ox, oy, r, a0, a1, color="axis", width=1.8, *, head=8, gap=4, **kw):
    """A curved arrow on the circle of radius ``r`` from ``a0`` to ``a1`` degrees (shortened by ``gap``)."""
    s = 1 if a1 > a0 else -1
    b0, b1 = a0 + s * gap, a1 - s * gap
    n = max(8, int(abs(b1 - b0) / 3))
    cv.curve_arrow([along(ox, oy, b0 + (b1 - b0) * k / n, r) for k in range(n + 1)], color, width, head=head, **kw)


def top_view(cv, cx, cy, R, *, labels=True):
    """The equatorial plane seen from above the north pole: x to the right, y up, z towards the reader."""
    cv.circle(cx, cy, R, color="dim", width=1.5, fill="cyan", fill_opacity=0.04)
    cv.line(cx - R - 8, cy, cx + R + 8, cy, "faint", 1.2, dash="3 3")
    cv.line(cx, cy + R + 8, cx, cy - R - 8, "faint", 1.2, dash="3 3")
    if labels:
        cv.text(cx + R + 12, cy, "*x*", size=13, color="dim", middle=True)
        cv.text(cx, cy - R - 14, "*y*", size=13, color="dim", anchor="middle", middle=True)
