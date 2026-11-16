"""交换次序，线不变，面积翻面：AB 与 BA 的对称部分相同，反对称部分变号（第六章 §6.1）。
Swap the order and the line stays while the area flips: AB and BA share the symmetric part and the antisymmetric
part changes sign (chapter 6, §6.1).

In the plane, A·B = a₁b₁ + a₂b₂ and A∧B = (a₁b₂ − a₂b₁) I; the script asserts B·A = A·B and B∧A = −A∧B and that
these are cos θ and sin θ for unit arrows.
"""

import math

from _ch06 import along, line_and_area

SIZE = (532, 270)
WRAP = True
ALT = {
    "zh": "两栏，画着同样两支单位箭头：横放的 A 与斜向上的琥珀色 B，夹角 θ。两栏里 B 落在 A 上的青色影子一样长，都是 A·B = cos θ；"
          "两支箭头张出的品红平行四边形也一样大。左栏 AB 的紫色弧箭头从 A 逆时针转向 B，面积记 +sin θ；右栏 BA 的弧箭头从 B 顺时针转回 A，面积记 −sin θ。",
    "en": "Two panels with the same two unit arrows: A lying flat and the amber B pointing up at angle θ. In both, the cyan "
          "shadow of B on A has the same length, A·B = cos θ, and the magenta parallelogram they span has the same size. In "
          "the left panel, AB, a violet curved arrow turns counter-clockwise from A to B and the area counts as +sin θ; in "
          "the right panel, BA, it turns clockwise from B back to A and the area counts as −sin θ.",
}

THETA = 58


def products(a, b):
    """(inner, outer) of two plane vectors: a·b and the coefficient of I in a∧b."""
    return a[0] * b[0] + a[1] * b[1], a[0] * b[1] - a[1] * b[0]


def draw(fig):
    t = fig.t
    a = (1.0, 0.0)
    b = (math.cos(math.radians(THETA)), math.sin(math.radians(THETA)))
    ab, ba = products(a, b), products(b, a)
    assert abs(ab[0] - ba[0]) < 1e-12 and abs(ab[1] + ba[1]) < 1e-12
    assert abs(ab[0] - math.cos(math.radians(THETA))) < 1e-12 and abs(ab[1] - math.sin(math.radians(THETA))) < 1e-12

    for p, name, sign in zip(fig.row([258, 258], 270, gap=16), ("*AB*", "*BA*"), (1, -1)):
        p.text(129, 24, name, size=16, weight=600, anchor="middle")
        ox, oy, L = 40, 190, 128
        ta, tb, foot = line_and_area(p, ox, oy, 0, THETA, L, L)
        a0, a1 = (6, THETA - 6) if sign > 0 else (THETA - 6, 6)
        pts = [along(ox, oy, a0 + (a1 - a0) * k / 24, 54) for k in range(25)]
        p.curve_arrow(pts, "axis", 2.0, head=8)
        p.text(ta[0] + 4, ta[1] + 22, "*A*", size=15, anchor="middle")
        p.text(tb[0] + 6, tb[1] - 4, "*B*", size=15, color="now")
        p.text((ox + foot[0]) / 2, oy + 26, "cos θ", size=14, color="line", anchor="middle")
        cx, cy = (ta[0] + tb[0]) / 2, (ta[1] + tb[1]) / 2
        p.text(cx + 16, cy + 4, ("+" if sign > 0 else "−") + "sin θ", size=15, color="area", anchor="middle",
               middle=True, halo=True, weight=600)
        p.text(129, 252, ("*A*∧*B* = +sin θ *I*" if sign > 0 else "*B*∧*A* = −sin θ *I*"), size=14, color="area",
               anchor="middle")
