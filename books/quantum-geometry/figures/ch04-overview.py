"""第四章地图：离开球皮的截短之线、只收腰的相位阻尼、缩进球心的最大混合态。
Chapter 4 at a glance: the shortened line off the shell, phase damping that only narrows the waist, and the
maximally mixed state at the centre.

All three panels are the x–z cross-section of the Bloch ball. Panel I: the local Bloch vector of the
chapter's opening example is (cos θ_env, 0, 0), drawn for θ_env = 50°. Panel II: phase damping
(x, z) ↦ (c x, z), the images after N = 1 … 4 steps with c = 0.6. Panel III: pinching removes the sideways
part, then the remaining r_z is removed, ending at r = 0.
"""

import math

from _ch04 import ball, image

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏，都是布洛赫球的竖直截面。第一栏：一支虚线箭头从球心指到右侧球皮上的 |+⟩，琥珀色的箭头沿同一方向却只到 cos θ_env，停在球里。"
          "第二栏：青色的椭圆一层套一层，越来越窄，高度不变，最后收向紫色的竖轴。"
          "第三栏：琥珀色的点从球皮上出发，先水平移到竖轴上，再沿竖轴落到紫色的球心 ½I。",
    "en": "Three panels, each the vertical cross-section of the Bloch ball. Panel I: a dashed arrow runs from the centre to |+⟩ "
          "on the shell at the right; the amber arrow points the same way but reaches only cos θ_env and stops inside. Panel II: "
          "cyan ellipses nest inside one another, narrower and narrower at the same height, closing in on the violet vertical "
          "axis. Panel III: an amber point starts on the shell, moves sideways onto the vertical axis, then down the axis to the "
          "violet centre ½I.",
}

CX, CY, R = 118, 150, 82


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: a pure state on the shell, the local state shortened to cos θ_env
    title(one, "I　离开球皮的线", "I  off the shell")
    P = ball(one, CX, CY, R, labels=False)
    th = math.radians(50)
    r = math.cos(th)
    assert abs(r - 0.6428) < 1e-4
    x1, y1 = P(1, 0)
    one.arrow(CX, CY, x1, y1, "ink", 1.6, dash="5 4")
    xr, yr = P(r, 0)
    one.arrow(CX, CY, xr, yr, "now", 3.2)
    one.dot(x1, y1, 4.2, "ink", ring="bg")
    one.text(x1 - 4, y1 - 12, "|+⟩", size=14, color="ink", anchor="middle", halo=True)
    one.text((CX + xr) / 2, CY + 24, "‖*r*‖ = cos *θ*_{env}", size=14, color="now", anchor="middle", halo=True)
    one.text(CX, CY - R - 12, one.t("球皮：‖*r*‖ = 1", "shell: ‖*r*‖ = 1"), size=13, color="dim", anchor="middle", halo=True)

    # ---- II: phase damping narrows the waist step by step
    title(two, "II　只收腰，不掉高", "II  narrower, not lower")
    P = ball(two, CX, CY, R, labels=False)
    c = 0.6
    for n in range(1, 5):
        image(two, P, lambda x, z, k=c ** n: (k * x, z), fill_opacity=0.10, width=1.6)
    two.line(CX, CY - R, CX, CY + R, "axis", 3.2, dash="6 4")
    for s in (1, -1):
        two.arrow(CX + s * R * 1.0, CY, CX + s * R * 0.72, CY, "dim", 1.6, head=7)
    two.text(CX + R * 0.8, CY - R * 0.86, "×*c*^{*N*}", size=14, color="line")
    two.text(CX, CY + R + 22, two.t("收向紫色的竖轴", "towards the violet axis"), size=13, color="axis", anchor="middle")

    # ---- III: down to the centre
    title(three, "III　球心", "III  the centre")
    P = ball(three, CX, CY, R, labels=False)
    a = math.radians(50)
    start = (math.sin(a), math.cos(a))
    mid = (0.0, start[1])
    s0, s1, s2 = P(*start), P(*mid), P(0, 0)
    three.arrow(s0[0], s0[1], s1[0] + 6, s1[1], "dim", 1.8, head=8)
    three.arrow(s1[0], s1[1], s2[0], s2[1] - 8, "dim", 1.8, head=8)
    three.dot(s0[0], s0[1], 5.2, "now", ring="bg")
    three.dot(s1[0], s1[1], 3.6, "dim")
    three.dot(s2[0], s2[1], 6.2, "axis", ring="bg")
    three.text((s0[0] + s1[0]) / 2 + 4, s1[1] + 22, three.t("抹掉横向", "drop *r*_{x}"), size=13, color="dim",
               anchor="middle", halo=True)
    three.text(s1[0] - 10, (s1[1] + s2[1]) / 2 + 4, three.t("抹掉 *r*_{z}", "drop *r*_{z}"), size=13, color="dim",
               anchor="end", halo=True)
    three.text(s2[0] + 12, s2[1] + 22, "½*I*", size=15, color="axis", weight=600)
