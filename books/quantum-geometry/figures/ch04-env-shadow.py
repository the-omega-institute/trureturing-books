"""环境里两条记录的重叠，就是局部布洛赫箭头的长度（第四章 §4.1）。
The overlap of the two environment records is the length of the local Bloch arrow (chapter 4, §4.1).

Left: the environment states |e₀⟩ and |e₁⟩ at angle θ_env; the shadow of e₁ on e₀ is ⟨e₀|e₁⟩ = cos θ_env.
Right: the x–z cross-section of the Bloch ball with ρ_S = ½[[1, cos θ], [cos θ, 1]], whose Bloch vector
(2 Re ρ₀₁, 2 Im ρ₁₀, ρ₀₀ − ρ₁₁) = (cos θ, 0, 0) is computed below; both cyan segments have the same
length on the page.
"""

import math

from _ch04 import ball

SIZE = (560, 300)
WRAP = True
ALT = {
    "zh": "左右两半。左半：环境的两个态 |e₀⟩（水平）与 |e₁⟩（斜向上）夹角 θ_env；e₁ 在 e₀ 上的青色影子长 cos θ_env。"
          "右半：布洛赫球的竖直截面，琥珀色的局部箭头从球心沿 x 轴指向右侧球皮上的 |+⟩（虚线），却只到 cos θ_env 就停住；"
          "箭头下方的青色线段与左半的影子一样长。",
    "en": "Two halves. Left: the environment states |e₀⟩ (horizontal) and |e₁⟩ (tilted up) at angle θ_env; the cyan shadow of "
          "e₁ on e₀ has length cos θ_env. Right: the vertical cross-section of the Bloch ball; the amber local arrow points from "
          "the centre along x towards |+⟩ on the shell at the right (dashed) but stops at cos θ_env. The cyan segment under the "
          "arrow is exactly as long as the shadow on the left.",
}

L = 115          # one unit on the page, the same on both halves
THETA = 50       # θ_env in degrees


def bloch(rho):
    (a, b), (c, d) = rho
    return (2 * b.real, 2 * c.imag, (a - d).real)


def draw(fig):
    t = fig.t
    th = math.radians(THETA)
    ov = math.cos(th)
    rho = ((complex(0.5), complex(0.5 * ov)), (complex(0.5 * ov), complex(0.5)))
    r = bloch(rho)
    assert abs(r[0] - ov) < 1e-12 and abs(r[1]) < 1e-12 and abs(r[2]) < 1e-12

    left, right = fig.row([230, 314], 300, gap=16)
    # left: the two environment records
    left.text(110, 22, t("环境里的两条记录", "two records in the environment"), size=14, weight=600, anchor="middle")
    ox, oy = 30, 210
    e1 = (ox + L * math.cos(th), oy - L * math.sin(th))
    left.line(e1[0], e1[1], e1[0], oy, "dim", 1.3, dash="4 3")
    left.right_angle(e1[0], oy, 90, 8)
    left.line(ox, oy, ox + L * ov, oy, "line", 6, cap="round")
    left.arrow(ox, oy, ox + L, oy, "ink", 2.2)
    left.arrow(ox, oy, e1[0], e1[1], "ink", 2.2)
    left.angle(ox, oy, 34, 0, THETA, "*θ*_{env}", size=14, label_r=52)
    left.text(ox + L + 8, oy + 5, "|*e*_{0}⟩", size=15)
    left.text(e1[0] + 8, e1[1] - 2, "|*e*_{1}⟩", size=15)
    left.text(ox + L * ov / 2, oy + 28, "cos *θ*_{env}", size=14, color="line", anchor="middle")

    # right: the local Bloch arrow
    cx, cy = 150, 166
    right.text(cx, 22, t("局部的布洛赫箭头", "the local Bloch arrow"), size=14, weight=600, anchor="middle")
    P = ball(right, cx, cy, L)
    x1, y1 = P(1, 0)
    xr, yr = P(r[0], r[2])
    right.arrow(cx, cy, x1, y1, "dim", 1.4, dash="5 4")
    right.text(x1 - 6, y1 - 12, "|+⟩", size=14, color="dim", anchor="middle", halo=True)
    right.line(cx, cy + 16, xr, cy + 16, "line", 6, cap="round")
    right.arrow(cx, cy, xr, yr, "now", 3.0)
    right.text(cx + 6, cy - 12, "*r*", size=15, color="now")
    right.text((cx + xr) / 2, cy + 40, "cos *θ*_{env}", size=14, color="line", anchor="middle", halo=True)
