"""旋子只走半角，箭头走整角：R_u(θ) 停在单位圆上 θ/2 处，夹心积把平面里的箭头转过 θ（第二十六章 §偶子代数双矢量）。
The rotor goes only half the angle, the arrow the whole of it: R_u(θ) sits at θ/2 on the unit circle, and the
sandwich turns the arrow in the plane by θ (chapter 26, even-subalgebra bivectors).

Left: the rotor's two coefficients (scalar, coefficient of −B_z) for θ = 120°; the point lies on the unit circle
because R R̃ = cos² + sin² = 1. Right: the plane of B_z, where the sandwich turns e₁ by θ. Both are computed with
the chapter's rule and checked: the rotor is cos 60° − sin 60° e₁e₂ and R e₁ R̃ = (cos 120°, sin 120°, 0).
"""

import math

from _ch26 import apply, coeffs, mul, reverse, rotor, title

SIZE = (540, 290)
WRAP = True
ALT = {
    "zh": "两栏，θ = 120°。左栏“旋子”：一个紫色的单位圆，横轴是标量部分，竖轴是 −e₁e₂ 的系数；紫色的点停在 60° 处，"
          "坐标是 cos 60° 与 sin 60°，角标 θ/2 = 60°，圆旁写着 R R̃ = 1。右栏“箭头”：e₁e₂ 平面里的单位圆，灰色的起点 e₁ 在 0°，"
          "琥珀色的箭头转到 120°，中间是品红的扇形，角标 θ = 120°。",
    "en": "Two panels, θ = 120°. Left, “rotor”: a violet unit circle with the scalar part across and the coefficient of −e₁e₂ "
          "up; the violet point sits at 60°, with coordinates cos 60° and sin 60°, marked θ/2 = 60°, and the circle is labelled "
          "R R̃ = 1. Right, “arrow”: the unit circle in the e₁e₂ plane; the grey starting arrow e₁ is at 0°, the amber arrow has "
          "turned to 120°, and a magenta sector between them is marked θ = 120°.",
}

THETA = 120


def draw(fig):
    t = fig.t
    th = math.radians(THETA)
    R = rotor("z", th)
    c = coeffs(R)
    assert abs(c[0] - math.cos(th / 2)) < 1e-12 and abs(c[1] + math.sin(th / 2)) < 1e-12
    assert abs(mul(R, reverse(R))[0] - 1) < 1e-12
    v = apply(R, (1, 0, 0))
    assert abs(v[0] - math.cos(th)) < 1e-12 and abs(v[1] - math.sin(th)) < 1e-12 and abs(v[2]) < 1e-12

    left, right = fig.row([262, 262], 290, gap=16)

    # rotor circle
    title(left, "旋子 *R*_{z}(θ)", "the rotor *R*_{z}(θ)")
    cx, cy, r = 118, 170, 92
    left.line(cx - r - 16, cy, cx + r + 22, cy, "faint", 1.1, dash="3 4")
    left.line(cx, cy + r + 14, cx, cy - r - 14, "faint", 1.1, dash="3 4")
    left.circle(cx, cy, r, color="axis", width=1.8)
    px, py = cx + r * c[0], cy + r * c[1]          # −B coefficient up: −c[1] = sin(θ/2) → y − r·sin
    left.line(cx, cy, px, py, "axis", 2.2)
    left.line(px, py, px, cy, "dim", 1.2, dash="3 3")
    left.dot(px, py, 6, "axis", ring="bg")
    left.angle(cx, cy, 30, 0, THETA / 2, "θ/2", color="axis", size=14, label_r=46)
    left.text(cx + r + 4, cy - 6, t("标量", "scalar"), size=13, color="dim", halo=True)
    left.text(cx + 6, cy - r - 4, "−*e*_{12}", size=13, color="dim")
    left.text(px + 10, py - 6, "60°", size=14, color="axis", weight=600)
    left.text(cx - r * 0.72, cy + r * 0.72 + 22, "*R R̃* = 1", size=14, color="axis", anchor="end")

    # vector circle
    title(right, "箭头 *v* ↦ *R v R̃*", "the arrow *v* ↦ *R v R̃*")
    cx, cy, r = 131, 170, 92
    right.circle(cx, cy, r, color="faint", width=1.2)
    right.arc(cx, cy, r * 0.62, 0, THETA, "area", 1.2, fill="area", fill_opacity=0.18)
    right.arrow(cx, cy, cx + r, cy, "dim", 2.0)
    right.arrow(cx, cy, cx + r * v[0], cy - r * v[1], "now", 2.8)
    right.text(cx + r + 6, cy + 18, "*e*_{1}", size=14, color="dim")
    right.text(cx + r * v[0] - 8, cy - r * v[1] - 8, "*R e*_{1} *R̃*", size=14, color="now", weight=600, anchor="end",
               halo=True)
    right.text(cx + 26, cy - 22, "θ", size=15, color="area", weight=600, anchor="middle", middle=True)
    right.text(cx, cy + r + 24, "θ = 120°", size=14, color="area", weight=600, anchor="middle")
