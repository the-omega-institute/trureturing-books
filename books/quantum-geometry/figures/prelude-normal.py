"""平面的法线从平面外面来（序曲·第四重盲区）。
The normal of a plane comes from outside the plane (prelude, the fourth blind spot).

Left: the oriented face e₁∧e₂ seen from inside its own plane; every arrow the bug can hold is a combination
a e₁ + b e₂ and has no component along e₃ (asserted), so none of them points off the face. Right: the same
face set in ℝ³; the normal e₃ = ⋆₃(e₁∧e₂) = e₁ × e₂ is computed below and stands up from the centre.
"""

import math

from tbook import figkit

SIZE = (560, 280)
WRAP = True
ALT = {
    "zh": "左右两半。左半：一块品红的正方形面片，标着 e₁∧e₂，带一个表示定向的小圈 Î；面片里画着五支青色的箭头，"
          "朝向各不相同，全都躺在面片之内，下方写着“面内的箭头都指不出法向”。右半：同一块面片斜放在三维空间里，"
          "两支青色的箭头 e₁、e₂ 沿面片的两边；一支紫色的箭头 e₃ = ⋆₃(e₁∧e₂) 从面片中心垂直立起，"
          "下方写着“站进 ℝ³ 才看得见法线”。",
    "en": "Two halves. Left: a magenta square face labelled e₁∧e₂ with a small looped arrow Î for its orientation; five cyan "
          "arrows in different directions all lie inside the face, and the caption below reads “arrows in the plane cannot "
          "point along its normal”. Right: the same face tilted in three-dimensional space, with the cyan arrows e₁ and e₂ "
          "along two of its sides; a violet arrow e₃ = ⋆₃(e₁∧e₂) stands perpendicular from the centre of the face, and the "
          "caption below reads “the normal appears only from ℝ³”.",
}

MARKUP = 2
IN_PLANE = [(0.9, 0.0), (0.0, 0.9), (0.62, 0.5), (-0.55, 0.62), (0.3, -0.78)]   # (a, b): the arrow a e₁ + b e₂


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def loop(cv, cx, cy, rx, ry, color):
    pts = [(cx + rx * math.cos(math.radians(a)), cy - ry * math.sin(math.radians(a))) for a in range(200, 200 + 290, 10)]
    cv.curve_arrow(pts, color, 1.6, head=7)


def draw(fig):
    e1, e2 = (1.0, 0.0, 0.0), (0.0, 1.0, 0.0)
    e3 = figkit.cross(e1, e2)                       # ⋆₃(e₁∧e₂) in ℝ³ is the cross product e₁ × e₂
    assert e3 == (0.0, 0.0, 1.0)
    for a, b in IN_PLANE:                           # every arrow of the face has no e₃ component
        v = tuple(a * e1[i] + b * e2[i] for i in range(3))
        assert abs(figkit.dot3(v, e3)) < 1e-12

    left, right = fig.row([260, 284], 280, gap=16)

    # ---- left: inside the plane
    title(left, "在平面里面", "inside the plane")
    cx, cy, h = 130, 140, 92
    left.polygon([(cx - h, cy - h), (cx + h, cy - h), (cx + h, cy + h), (cx - h, cy + h)], "area", color="area",
                 width=1.4, fill_opacity=0.16)
    for a, b in IN_PLANE:
        left.arrow(cx, cy, cx + a * h * 0.95, cy - b * h * 0.95, "line", 2.0, head=8)
    left.dot(cx, cy, 3.2, "ink")
    loop(left, cx - 52, cy + 52, 15, 12, "area")
    left.text(cx - 28, cy + 58, "*Î*", size=15, color="area")
    left.text(cx + h - 6, cy - h + 20, "*e*_{1}∧*e*_{2}", size=14, color="area", anchor="end", halo=True)
    left.text(cx, 262, left.t("面内的箭头都指不出法向", "no arrow in the plane points off it"), size=13, color="dim",
              anchor="middle")

    # ---- right: the same face in ℝ³
    title(right, "站进 ℝ³", "standing in ℝ³")
    sp = right.sphere(146, 168, 112, az=118, el=24)
    s = 0.82
    corners = [(-s, -s, 0.0), (s, -s, 0.0), (s, s, 0.0), (-s, s, 0.0)]
    sp.patch(corners, "area", color="area", width=1.4, fill_opacity=0.16, flat=True)
    sp.arrow(e1, "line", 2.0, scale=0.78, head=8)
    sp.arrow(e2, "line", 2.0, scale=0.78, head=8)
    sp.label(e1, "*e*_{1}", scale=0.78, dx=-4, dy=18, size=14, color="line", anchor="middle")
    sp.label(e2, "*e*_{2}", scale=0.78, dx=12, dy=4, size=14, color="line")
    sp.arrow(e3, "axis", 2.6, scale=0.98, head=10)
    sp.dot((0.0, 0.0, 0.0), "ink", 3.2)
    sp.label(e3, "*e*_{3} = ⋆_{3}(*e*_{1}∧*e*_{2})", scale=0.98, dx=10, dy=6, size=14, color="axis")
    right.text(right.width / 2, 262, right.t("站进 ℝ³ 才看得见法线", "the normal appears only from ℝ³"), size=13,
               color="dim", anchor="middle")
