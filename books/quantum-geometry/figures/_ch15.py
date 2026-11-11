"""Shared drawing for the chapter 15 figures (not a figure itself).

The Grover plane: the success block W points up, the failure block B points right, and a state
sin φ · W + cos φ · B is the unit arrow at angle φ from B. One Grover step turns it by 2θ, θ = arcsin √p.
"""

import math


def grover_theta(N):
    """The initial tilt θ (radians) for one marked item among N: sin θ = 1/√N."""
    return math.asin(1 / math.sqrt(N))


def plane(cv, cx, cy, R, *, w_label=("*W* 成功", "*W* success"), b_label=("*B* 失败", "*B* failure"), below=False):
    """The two axes of the Grover plane and the quarter circle the unit states end on.

    Returns the map angle (degrees, from B towards W) -> canvas point at radius R."""
    def P(deg, r=1.0):
        a = math.radians(deg)
        return cx + R * r * math.cos(a), cy - R * r * math.sin(a)

    lo = -30 if below else 0
    cv.arc(cx, cy, R, lo, 100, "faint", 1.2, dash="3 4")
    cv.line(cx, cy, cx + R * 1.12, cy, "dim", 1.3)
    cv.line(cx, cy, cx, cy - R * 1.12, "dim", 1.3)
    cv.text(cx + R * 1.12 + 4, cy + 5, cv.t(*b_label), size=13, color="dim")
    cv.text(cx + 8, cy - R * 1.12 + 4, cv.t(*w_label), size=13, color="dim")
    return P
