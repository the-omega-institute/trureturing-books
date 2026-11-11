"""柯西—施瓦茨两边差的那一块，正是两支箭头张出的面积的平方（第六章 §6.2，[@thm-lagrange-gram-identity]）。
The gap in Cauchy–Schwarz is exactly the square of the area the two arrows span (chapter 6, §6.2).

For u, v in the plane the identity reads |u|²|v|² = (u·v)² + (u₁v₂ − u₂v₁)²: the squares on the two legs of a right
triangle add up to the square on its hypotenuse. The legs are |u·v| and |u∧v|, the hypotenuse |u||v|; the script
checks the identity in the form of the theorem (half the double sum) and that the parallelogram's area equals the
magenta leg.
"""

import math

from _ch06 import along

SIZE = (540, 300)
ALT = {
    "zh": "左边：灰色的箭头 u 与琥珀色的箭头 v 不一样长，张出一块品红的平行四边形，面积是 |u∧v|。右边：一个直角三角形，"
          "横的直角边长 |u·v|，竖的直角边长 |u∧v|，斜边长 |u||v|；三条边上各立一个正方形：青色的 (u·v)²、品红的 |u∧v|²、"
          "斜边上的 |u|²|v|²。两个小正方形合起来正好等于大正方形，品红的那一块就是柯西—施瓦茨不等式两边的差。",
    "en": "Left: a grey arrow u and an amber arrow v of different lengths span a magenta parallelogram of area |u∧v|. "
          "Right: a right triangle whose horizontal leg is |u·v|, vertical leg |u∧v| and hypotenuse |u||v|, with a square "
          "standing on each side: cyan (u·v)², magenta |u∧v|², and |u|²|v|² on the hypotenuse. The two small squares add up "
          "to the large one exactly; the magenta square is the gap between the two sides of the Cauchy–Schwarz inequality.",
}

U = (1.25, 0.0)
V_LEN, V_DEG = 1.15, 40


def draw(fig):
    t = fig.t
    v = (V_LEN * math.cos(math.radians(V_DEG)), V_LEN * math.sin(math.radians(V_DEG)))
    s = range(2)
    uu = sum(U[i] ** 2 for i in s)
    vv = sum(v[i] ** 2 for i in s)
    uv = sum(U[i] * v[i] for i in s)
    half = 0.5 * sum((U[i] * v[j] - U[j] * v[i]) ** 2 for i in s for j in s)
    assert abs(uu * vv - uv ** 2 - half) < 1e-12                        # the theorem, with s = {1, 2}
    wedge = U[0] * v[1] - U[1] * v[0]
    assert abs(wedge ** 2 - half) < 1e-12 and wedge > 0
    a, b, c = uv, wedge, math.sqrt(uu * vv)
    assert abs(a * a + b * b - c * c) < 1e-12

    # ---- left: the two arrows and their parallelogram
    ox, oy, S = 26, 200, 92
    tu = (ox + S * U[0], oy - S * U[1])
    tv = (ox + S * v[0], oy - S * v[1])
    fig.polygon([(ox, oy), tu, (tu[0] + tv[0] - ox, tu[1] + tv[1] - oy), tv], "area", color="area", width=1.2,
                fill_opacity=0.2)
    fig.arrow(ox, oy, *tu, "dim", 2.4)
    fig.arrow(ox, oy, *tv, "now", 2.6)
    fig.angle(ox, oy, 30, 0, V_DEG, "θ", size=13)
    fig.text(tu[0] - 4, oy + 22, "*u*", size=15, color="dim", anchor="middle")
    fig.text(tv[0] - 8, tv[1] - 6, "*v*", size=15, color="now", anchor="end")
    fig.text((tu[0] + tv[0]) / 2 + 6, (tu[1] + tv[1]) / 2 + 4, "|*u*∧*v*|", size=14, color="area", anchor="middle",
             middle=True, halo=True)

    # ---- right: Pythagoras on |u·v|, |u∧v|, |u||v|
    K = 80                                   # pixels per unit on the right
    A, B, Cc = a * K, b * K, c * K
    x0, y0 = 360, 196                        # the right angle
    p1, p2 = (x0 + A, y0), (x0, y0 - B)
    fig.polygon([(x0, y0), (x0 + A, y0), (x0 + A, y0 + A), (x0, y0 + A)], "line", color="line", width=1.4,
                fill_opacity=0.18)
    fig.polygon([(x0, y0), (x0, y0 - B), (x0 - B, y0 - B), (x0 - B, y0)], "area", color="area", width=1.4,
                fill_opacity=0.22)
    n = (B, -A)                              # outward from the right angle, length c·K
    fig.polygon([p1, (p1[0] + n[0], p1[1] + n[1]), (p2[0] + n[0], p2[1] + n[1]), p2], "faint", color="ink", width=1.4,
                fill_opacity=0.12)
    fig.polygon([(x0, y0), p1, p2], None, color="ink", width=2.0)
    fig.right_angle(x0, y0, 0, 9)
    fig.text(x0 + A / 2, y0 + A / 2, "(*u*·*v*)^{2}", size=14, color="line", anchor="middle", middle=True)
    fig.text(x0 - B / 2, y0 - B / 2, "|*u*∧*v*|^{2}", size=13, color="area", anchor="middle", middle=True)
    cx = (p1[0] + p2[0] + n[0]) / 2
    cy = (p1[1] + p2[1] + n[1]) / 2
    fig.text(cx, cy, "|*u*|^{2}|*v*|^{2}", size=14, color="ink", anchor="middle", middle=True)
