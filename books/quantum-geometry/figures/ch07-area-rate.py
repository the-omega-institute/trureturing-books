"""生成元把箭头往垂直方向推：长度不变，每个 Δt 扫过同样大的面积（第七章 §7.1）。
The generator pushes the arrow sideways: its length does not change, and every Δt sweeps the same area
(chapter 7, §7.1).

Drawn in the real plane with the generator G = ω·J, J the quarter turn: Gψ is perpendicular to ψ
(asserted: ⟨ψ, Gψ⟩ = 0 because Gᵀ = −G), and the sectors swept in equal times have equal areas ½R²ωΔt.
"""

import math

SIZE = (420, 300)
ALT = {
    "zh": "一个圆心处的箭头沿圆周逆时针转动。三支淡灰的箭头是之前相隔 Δt 的位置，琥珀色的箭头 ψ(t) 是现在；"
          "相邻两支箭头之间是三块同样大的品红扇形，每块标着 Δt。在琥珀色箭头的尖端，紫色的箭头 Gψ 沿切线方向，"
          "与 ψ 成直角，所以箭头只转不伸缩。",
    "en": "An arrow from the centre of a circle turns counter-clockwise. Three faint arrows are earlier positions, Δt apart, "
          "and the amber arrow ψ(t) is the present one; between neighbouring arrows lie three equal magenta sectors, each "
          "labelled Δt. At the tip of the amber arrow a violet arrow Gψ points along the tangent, at a right angle to ψ, so "
          "the arrow turns without stretching.",
}

OMEGA_DT = 30.0          # degrees turned per Δt
START = -10.0


def draw(fig):
    t = fig.t
    ox, oy, R = 160, 232, 186
    fig.arc(ox, oy, R, -16, 128, "faint", 1.2, dash="3 4")
    angles = [START + k * OMEGA_DT for k in range(4)]
    areas = []
    for k in range(3):
        a0, a1 = angles[k], angles[k + 1]
        fig.arc(ox, oy, R, a0, a1, "area", 1.0, fill="area", fill_opacity=0.12 + 0.06 * k)
        areas.append(0.5 * R * R * math.radians(a1 - a0))
        mid = math.radians((a0 + a1) / 2)
        fig.text(ox + 0.66 * R * math.cos(mid), oy - 0.66 * R * math.sin(mid), "Δ*t*", size=14, color="area",
                 anchor="middle", middle=True, halo=True)
    assert max(areas) - min(areas) < 1e-9                       # equal times, equal areas
    for a in angles[:-1]:
        fig.arrow(ox, oy, ox + R * math.cos(math.radians(a)), oy - R * math.sin(math.radians(a)), "dim", 1.6)
    now = math.radians(angles[-1])
    psi = (math.cos(now), math.sin(now))
    g = (-psi[1], psi[0])                                         # G ψ for G = ω J, ω = 1
    assert abs(psi[0] * g[0] + psi[1] * g[1]) < 1e-12            # Re⟨ψ, Gψ⟩ = 0: G is skew
    tx, ty = ox + R * psi[0], oy - R * psi[1]
    L = 96
    fig.arrow(ox, oy, tx, ty, "now", 2.8)
    fig.arrow(tx, ty, tx + L * g[0], ty - L * g[1], "axis", 2.6)
    fig.right_angle(tx, ty, math.degrees(now) + 180, 11, "dim", 1.3)
    fig.text(tx + 12, ty + 26, "*ψ*(*t*)", size=15, color="now")
    fig.text(tx + L * g[0] - 4, ty - L * g[1] - 12, "*Gψ*", size=15, color="axis", anchor="end")
    fig.dot(ox, oy, 3.2, "dim")
    fig.text(ox + R + 20, oy + 58, t("每个 Δ*t* 扫过的面积相同", "equal area in each Δ*t*"), size=13, color="dim",
             anchor="end")
