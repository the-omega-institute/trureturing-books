"""一个平面只装得下一次正交；第二次正交必须离开平面（第八章 §8.4）。
A plane holds only one orthogonal step; the second has to leave the plane (chapter 8, §8.4).

The plane span{e₁, e₂} drawn as a disc in a sphere; e₁ → e₂ is the first orthogonal step, inside the
plane; the only direction orthogonal to both is ±e₃ = e₁ × e₂, out of the plane (asserted).
"""

from tbook import figkit

SIZE = (480, 330)
ALT = {
    "zh": "一颗淡淡的球里横着一张圆盘，是 e₁、e₂ 张成的平面。两支青色的箭头 e₁、e₂ 躺在盘里，互成直角，"
          "一条青色的弧从 e₁ 转到 e₂，标着“正交一次”。一支品红的箭头 e₃ 竖直离开平面，与 e₁、e₂ 都成直角，"
          "一条品红的弧从 e₂ 转到 e₃，标着“正交两次”。",
    "en": "A disc lies across a faint sphere: the plane spanned by e₁ and e₂. Two cyan arrows e₁ and e₂ lie in the disc at a "
          "right angle, and a cyan arc from e₁ to e₂ is labelled “first orthogonal step”. A magenta arrow e₃ rises "
          "vertically out of the plane, at right angles to both, and a magenta arc from e₂ to e₃ is labelled “second "
          "orthogonal step”.",
}


def draw(fig):
    t = fig.t
    sp = fig.sphere(230, 176, 128, el=22)
    sp.outline(fill="cyan", fill_opacity=0.03, color="faint")
    e1, e2 = (1.0, 0.0, 0.0), (0.0, 1.0, 0.0)
    e3 = figkit.cross(e1, e2)
    assert e3 == (0.0, 0.0, 1.0) and figkit.dot3(e3, e1) == 0 and figkit.dot3(e3, e2) == 0
    sp.disc((0, 0, 1), "panel", fill_opacity=0.9, color="edge", width=1.3)
    sp.arc(e1, e2, "line", 2.0, arrow=True)
    sp.arc(e2, e3, "area", 2.0, arrow=True)
    sp.arrow(e1, "line", 2.6, scale=0.98)
    sp.arrow(e2, "line", 2.6, scale=0.98)
    sp.arrow(e3, "area", 2.8, scale=0.98)
    sp.label(e1, "*e*_{1}", dx=-12, dy=14, size=16, color="line", anchor="end")
    sp.label(e2, "*e*_{2}", dx=12, dy=14, size=16, color="line")
    sp.label(e3, "*e*_{3}", dx=12, dy=-4, size=16, color="area")
    m = figkit.slerp(e1, e2, 0.5)
    sp.label(m, t("正交一次", "first orthogonal step"), dx=0, dy=32, size=14, color="line", anchor="middle", halo=True)
    m = figkit.slerp(e2, e3, 0.5)
    sp.label(m, t("正交两次", "second orthogonal step"), dx=-10, dy=-34, size=14, color="area", halo=True)
