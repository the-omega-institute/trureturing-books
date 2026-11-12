"""第四章地图：离开球皮的截短之线、信道下只会靠近的两点、缩进球心的最大混合态。
Chapter 4 at a glance: the shortened line off the shell, two states that a channel only brings closer, and the
maximally mixed state at the centre.

All three panels are the x–z cross-section of the Bloch ball. Panel I: the local Bloch vector of the
chapter's opening example is (cos θ_env, 0, 0), drawn for θ_env = 50°. Panel II: amplitude damping
with γ = ½, (x, z) ↦ (x/√2, (1 + z)/2), on the north pole and +x: the trace distance ½‖r − s‖ falls
from 0.707 to 0.433. Panel III: pinching removes the sideways
part, then the remaining r_z is removed, ending at r = 0.
"""

import math

from _ch04 import ball, image

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏，都是布洛赫球的竖直截面。第一栏：一支虚线箭头从球心指到右侧球皮上的 |+⟩，琥珀色的箭头沿同一方向却只到 cos θ_env，停在球里。"
          "第二栏：青色的椭圆是振幅阻尼把球缩小并往北推之后的像；北极的 ρ 不动，+x 上的 σ 被拉向北方，两点之间的线从虚线变成更短的实线，T 从 0.707 缩到 0.433。"
          "第三栏：琥珀色的点从球皮上出发，先水平移到竖轴上，再沿竖轴落到紫色的球心 ½I。",
    "en": "Three panels, each the vertical cross-section of the Bloch ball. Panel I: a dashed arrow runs from the centre to |+⟩ "
          "on the shell at the right; the amber arrow points the same way but reaches only cos θ_env and stops inside. Panel II: the "
          "cyan ellipse is the ball after amplitude damping has shrunk it and pushed it north; ρ at the north pole stays, σ at "
          "+x is pulled north, and the line between them goes from the dashed one to a shorter solid one, T from 0.707 to 0.433. Panel III: an amber point starts on the shell, moves sideways onto the vertical axis, then down the axis to the "
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

    # ---- II: no channel pulls two states apart (amplitude damping γ = ½ on the north pole and +x)
    title(two, "II　两点只会靠近", "II  two states only get closer")
    P = ball(two, CX, CY, R, labels=False)
    lam, a_, h = math.sqrt(0.5), 0.5, 0.5
    image(two, P, lambda x, z: (lam * x, a_ * z + h), fill_opacity=0.10, width=1.6)
    rho, sig = (0.0, 1.0), (1.0, 0.0)
    rho1, sig1 = (lam * rho[0], a_ * rho[1] + h), (lam * sig[0], a_ * sig[1] + h)
    T0, T1 = math.dist(rho, sig) / 2, math.dist(rho1, sig1) / 2
    assert abs(T0 - 0.7071) < 1e-4 and abs(T1 - 0.4330) < 1e-4 and T1 <= T0
    (ax0, ay0), (bx0, by0), (ax1, ay1), (bx1, by1) = P(*rho), P(*sig), P(*rho1), P(*sig1)
    two.line(ax0, ay0, bx0, by0, "dim", 1.4, dash="4 4")
    two.line(ax1, ay1, bx1, by1, "ink", 2.4)
    two.arrow(bx0, by0, bx1 + 5, by1 + 4, "dim", 1.4, head=7)
    two.dot(bx0, by0, 4.0, "dim", ring="bg")
    two.dot(bx1, by1, 4.6, "ink", ring="bg")
    two.dot(ax1, ay1, 5.2, "now", ring="bg")
    two.text(ax1 - 10, ay1 - 6, "*ρ*", size=15, color="now", anchor="end", halo=True)
    two.text(bx1 + 8, by1 - 6, "*σ*", size=15, halo=True)
    two.text(CX, CY + R + 22, "*T*: 0.707 → 0.433", size=14, anchor="middle")

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
