"""A doubled great-circle arc has zero Gram determinant, while a transverse triad encloses area."""

from fractions import Fraction
from math import atan2, degrees

from tbook.figkit import unit

SIZE = (704, 322)
WRAP = True
ALT = {
    "zh": "左图中 a、b、c 共处一条大圆，c = [b, a, b] 将 a 到 b 的弧加倍，格拉姆行列式为零。"
          "右图中 o 到 pHalf 与 qHalf 是两条正交半步，围出球面三角形，格拉姆行列式为 1/4。",
    "en": "Left, a, b, and c lie on one great circle. The point c = [b, a, b] doubles the arc from a to b "
          "and the Gram determinant vanishes. Right, orthogonal half-steps from o to pHalf and qHalf "
          "enclose a spherical triangle with Gram determinant 1/4.",
}

O = (1, 0, 0)
P_HALF = (1, 1, 0)
Q_HALF = (1, 0, 1)


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def fidelity(a, b):
    return Fraction(dot(a, b) ** 2, dot(a, a) * dot(b, b))


def gram_det(a, b, c):
    squared_overlaps = fidelity(a, b), fidelity(b, c), fidelity(c, a)
    triple = Fraction(dot(a, b) * dot(b, c) * dot(c, a), dot(a, a) * dot(b, b) * dot(c, c))
    return 1 + 2 * triple - sum(squared_overlaps)


def draw(fig):
    left, right = fig.row([344, 344], 322)
    a, b = O, P_HALF
    # For these scalar–i quaternions, [b, a, b] = b². The k coordinate is zero throughout.
    c = (b[0] ** 2 - b[1] ** 2, 2 * b[0] * b[1], 0)
    kappa1 = fidelity(a, b)
    assert gram_det(a, b, c) == 0
    assert fidelity(a, c) == (2 * kappa1 - 1) ** 2
    assert gram_det(O, P_HALF, Q_HALF) == Fraction(1, 4)

    left.text(172, 24, left.t("大圆上的测地加倍", "Geodesic doubling"), size=18, anchor="middle", weight=600)
    cx, cy, radius = 172, 144, 87
    left.circle(cx, cy, radius, color="ink", width=1.2, opacity=0.35)
    angles = [degrees(atan2(v[1], v[0])) for v in (a, b, c)]
    for start, end in zip(angles, angles[1:]):
        left.arc(cx, cy, radius, start, end, "cyan", 3.2)
    for vector, name, dx, dy in ((a, "a", 16, 5), (b, "b", 15, -6), (c, "c", -13, -4)):
        u, v, _ = unit(vector)
        x, y = cx + radius * u, cy - radius * v
        left.dot(x, y, 4.4, "cyan")
        left.text(x + dx, y + dy, name, size=16, weight=600, anchor="middle")
    left.text(172, 258, "c = [b, a, b]    ·    det G₃ = 0", size=16, anchor="middle")
    left.text(172, 283, "κ(a,c) = (2κ₁ − 1)²", size=16, anchor="middle", color="cyan")

    right.text(172, 24, right.t("正交半步三元组", "Orthogonal half-step triad"), size=18, anchor="middle", weight=600)
    sphere = right.sphere(172, 144, 87, az=77, el=25)
    sphere.outline("ink", 1.2, fill=None)
    sphere.patch([unit(v) for v in (O, P_HALF, Q_HALF)], "magenta", color="magenta", width=2.4, fill_opacity=0.19)
    for vector, name, dx, dy in (
        (O, "o", -12, 12),
        (P_HALF, "pHalf", 12, 13),
        (Q_HALF, "qHalf", 12, -10),
    ):
        direction = unit(vector)
        sphere.dot(direction, "magenta", r=4.4)
        sphere.label(direction, name, dx=dx, dy=dy, size=14, weight=600,
                     anchor="end" if vector == O else "start")
    right.text(172, 254, "o = (1,0,0,0)", size=14, anchor="middle")
    right.text(172, 276, "pHalf = (1,1,0,0)    qHalf = (1,0,1,0)", size=14, anchor="middle")
    right.text(172, 301, right.t("非阿贝尔球面盈量 · det G₃ = 1/4 > 0", "Non-Abelian excess · det G₃ = 1/4 > 0"),
               size=15, anchor="middle", color="magenta")
