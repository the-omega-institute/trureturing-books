"""X 的两条本征线与 Z 的两条本征线互相错开 45°，除原点外没有共同的点（第二十五章 §无公共特征向量）。
The two eigenlines of X and the two eigenlines of Z are 45° apart; apart from the origin they share no point
(chapter 25, no common eigenvector).

Drawn in the real plane of state vectors; every eigenvector of X or Z is a complex multiple of a vector on one
of these lines. The script finds the eigenlines from the matrices, checks that each line is mapped onto itself
with the stated eigenvalue, and that no line of one matrix is a line of the other.
"""

import math

from _ch25 import X, Z, apply

SIZE = (440, 320)
ALT = {
    "zh": "态矢所在的实平面。两条青色实线是 X 的本征线：斜 45° 的一条标 +1，斜 135° 的一条标 −1。两条青色虚线是 Z 的本征线："
          "水平的一条标 +1，竖直的一条标 −1。四条线把平面等分成八份，相邻两条之间都是 45°，没有一条线同时属于 X 和 Z。"
          "它们只在原点相交，原点处绿色的标签写着 ψ = 0。",
    "en": "The real plane of state vectors. The two solid cyan lines are the eigenlines of X: the one at 45° is marked +1, the one "
          "at 135° is marked −1. The two dashed cyan lines are the eigenlines of Z: the horizontal one marked +1, the vertical "
          "one −1. The four lines cut the plane into eight equal parts, 45° apart, and no line belongs to both X and Z. They "
          "meet only at the origin, where a green label reads ψ = 0.",
}


def eigenlines(m):
    """Directions (degrees in [0, 180)) of the real eigenlines of a symmetric 2 × 2 matrix, with eigenvalues."""
    out = []
    for k in range(360):
        a = k / 2
        v = (math.cos(math.radians(a)), math.sin(math.radians(a)))
        w = apply(m, v)
        lam = w[0] * v[0] + w[1] * v[1]
        if abs(w[0] - lam * v[0]) < 1e-9 and abs(w[1] - lam * v[1]) < 1e-9:
            out.append((a, round(lam)))
    return out


def draw(fig):
    t = fig.t
    lx, lz = eigenlines(X), eigenlines(Z)
    assert lx == [(45.0, 1), (135.0, -1)] and lz == [(0.0, 1), (90.0, -1)]
    assert not {a for a, _ in lx} & {a for a, _ in lz}

    cx, cy, R = 190, 162, 128
    for a, lam in lx + lz:
        dash = None if (a, lam) in lx else "7 5"
        c, s = math.cos(math.radians(a)), math.sin(math.radians(a))
        fig.line(cx - R * c, cy + R * s, cx + R * c, cy - R * s, "line", 2.2, dash=dash)
        lab = ("+1" if lam > 0 else "−1")
        name = "*X*" if (a, lam) in lx else "*Z*"
        ex, ey = cx + (R + 14) * c, cy - (R + 14) * s
        fig.text(ex, ey, f"{name}: {lab}", size=14, color="line", anchor="middle", middle=True, halo=True)
    fig.angle(cx, cy, 52, 0, 45, "45°", color="dim", size=13)
    fig.dot(cx, cy, 5, "lean", ring="bg")
    fig.text(cx + 12, cy + 22, "*ψ* = 0", size=15, color="lean", weight=600, halo=True)

    for i, (dash, label) in enumerate(((None, t("*X* 的本征线", "eigenlines of *X*")),
                                       ("7 5", t("*Z* 的本征线", "eigenlines of *Z*")))):
        yy = 268 + 22 * i
        fig.line(292, yy - 4, 314, yy - 4, "line", 2.2, dash=dash)
        fig.text(322, yy, label, size=13, color="dim")
