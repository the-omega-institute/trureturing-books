"""任意两根向量总有一根公共的单位法线；两根共线时，法线多到铺满一整圈（第九章 §9.1）。
Any two vectors in three-space have a common unit normal; when the two are collinear, the normals fill a whole
circle (chapter 9, §9.1).

Left: a and b are neither unit nor perpendicular; n is a × b normalised, and the script asserts |n| = 1 and
⟨a, n⟩ = ⟨b, n⟩ = 0. Right: b = −0.6 a; the script asserts that every point of the drawn ring is a unit vector
perpendicular to both.
"""

import math

from tbook import figkit
from _ch09 import title

SIZE = (540, 270)
WRAP = True
ALT = {
    "zh": "两栏。左栏：两支长短不一、也不互相垂直的箭头 a 与 b，品红的圆盘是它们张成的平面；一支紫色的箭头 n 垂直于这块圆盘，"
          "另一端的虚线是 −n。右栏：a 与 b 落在同一条直线上，方向相反；垂直于它们的单位向量铺成一整个紫色的圆，圆上画出六支紫色的箭头。",
    "en": "Two panels. Left: two arrows a and b of different lengths, not perpendicular; the magenta disc is the plane they span, "
          "and a violet arrow n stands perpendicular to it, with −n dashed at the other end. Right: a and b lie on one line, "
          "pointing opposite ways; the unit vectors perpendicular to them fill a whole violet circle, with six violet arrows "
          "drawn to it.",
}


def draw(fig):
    left, right = fig.row([262, 262], 270, gap=16)

    # ---- generic pair
    title(left, "两根任意的向量", "any two vectors")
    sp = left.sphere(131, 150, 92, az=110, el=18)
    a = (0.35, -0.9, 0.05)
    b = (0.2, 0.7, 0.4)
    n = figkit.unit(figkit.cross(a, b))
    assert abs(math.sqrt(figkit.dot3(n, n)) - 1) < 1e-12
    assert abs(figkit.dot3(a, n)) < 1e-12 and abs(figkit.dot3(b, n)) < 1e-12
    assert abs(figkit.dot3(figkit.unit(a), figkit.unit(b))) > 0.2          # not perpendicular
    sp.disc(n, "area", fill_opacity=0.14, color="area", width=1.1, scale=1.05)
    sp.segment((0, 0, 0), tuple(-c for c in n), "axis", 1.6, dash="4 3")
    sp.arrow(a, "ink", 2.4)
    sp.arrow(b, "ink", 2.4)
    sp.arrow(n, "axis", 2.6)
    sp.label(a, "*a*", dx=-8, dy=4, size=15, anchor="end")
    sp.label(b, "*b*", dx=8, dy=4, size=15)
    sp.label(n, "*n*", dx=8, dy=2, size=15, color="axis")
    sp.label(tuple(-c for c in n), "−*n*", dx=8, dy=8, size=14, color="axis")

    # ---- collinear pair
    title(right, "共线时：一整圈", "collinear: a whole circle")
    sp = right.sphere(131, 150, 92, az=110, el=18)
    a = (0.15, 0.3, 0.85)
    b = tuple(-0.6 * c for c in a)
    u = figkit.unit(a)
    e = figkit.unit(figkit.cross(u, (1.0, 0.0, 0.0)))
    f = figkit.cross(u, e)
    ring = [tuple(e[i] * math.cos(t) + f[i] * math.sin(t) for i in range(3))
            for t in (2 * math.pi * k / 120 for k in range(121))]
    for p in ring:
        assert abs(figkit.dot3(p, p) - 1) < 1e-12
        assert abs(figkit.dot3(p, a)) < 1e-12 and abs(figkit.dot3(p, b)) < 1e-12
    sp.disc(u, "axis", fill_opacity=0.08, color=None)
    sp.curve(ring, "axis", 2.2)
    for k in range(6):
        p = ring[k * 20 + 10]
        front = sp.proj(p)[2] >= 0
        sp.arrow(p, "axis", 1.8 if front else 1.4, opacity=None if front else 0.55)
    sp.arrow(a, "ink", 2.4)
    sp.arrow(b, "ink", 2.4)
    sp.label(a, "*a*", dx=10, dy=0, size=15)
    sp.label(b, "*b*", dx=10, dy=-6, size=15, halo=True)
