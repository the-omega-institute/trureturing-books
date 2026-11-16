"""第二章地图：以 A 自身为轴、C 是 b 落在 a 上的影子、球面上的对跖是希尔伯特空间里的正交。
Chapter 2 at a glance: A itself as the axis, C as the shadow of b on a, and antipodes on the sphere as
orthogonal rays in Hilbert space.

Panel I drops the external ceiling and measures B from A. Panel II is the shadow c = (a·b)a with its
foot C. Panel III sets the north and south poles (180° apart) beside |0⟩ and |1⟩ (90° apart); the script
checks that the half-angle rule (1 + cos θ)/2 gives 0 at θ = 180°, as the zero overlap of orthogonal rays.
"""

import math

from _ch02 import along, shadow, title

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一根灰色虚线的外部竖轴 C 被丢在一旁，青色的箭头 A 自己当轴，琥珀色的箭头 B 与它只隔一个角 θ。"
          "第二栏：琥珀色的 b 向青色的 a 线作垂线，垂足标作 C；从原点到 C 的青色粗线是影子 c，从 C 到 b 的品红虚线是垂直的剩余。"
          "第三栏：左边一个圆上，北极与南极相隔 180°；右边两支箭头 |0⟩ 与 |1⟩ 相隔 90°：球面上相反的两点，在希尔伯特空间里正交。",
    "en": "Three panels. Panel I: a grey dashed external vertical axis C is set aside; the cyan arrow A is its own axis and the "
          "amber arrow B is a single angle θ away from it. Panel II: a perpendicular dropped from the amber b onto the cyan "
          "line a lands at the foot marked C; the thick cyan segment from the origin to C is the shadow c and the dashed "
          "magenta segment from C to b is the perpendicular remainder. Panel III: on a circle on the left, the north and south "
          "poles are 180° apart; on the right, two arrows |0⟩ and |1⟩ are 90° apart: opposite points on the sphere are "
          "orthogonal in Hilbert space.",
}


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: A as the axis
    title(one, "I　以 A 为轴", "I  A as the axis")
    ox, oy, L = 104, 196, 120
    one.line(30, 236, 30, 52, "dim", 1.3, dash="4 4")
    one.text(40, 62, "*C*", size=15, color="dim")
    one.line(22, 140, 40, 156, "dim", 1.6)
    one.line(40, 140, 22, 156, "dim", 1.6)
    one.line(ox, oy + 30, ox, oy - L - 6, "line", 1.4)
    one.arrow(ox, oy, ox, oy - L, "line", 2.8)
    b = along(ox, oy, 90 - 60, L)
    one.arrow(ox, oy, b[0], b[1], "now", 2.6)
    one.angle(ox, oy, 42, 30, 90, "*θ*", color="line", size=15, width=1.8)
    one.text(ox - 10, oy - L + 8, "*A*", size=16, color="line", anchor="end")
    one.text(b[0] + 6, b[1] + 4, "*B*", size=16, color="now")
    one.dot(ox, oy, 3.0, "dim")

    # ---- II: C is the shadow
    title(two, "II　C 是影子", "II  C is a shadow")
    ox, oy, L = 28, 204, 150
    tip, foot, c = shadow(two, ox, oy, 0, 55, L, ruler=1.33, back=0.0)
    assert abs(c - math.cos(math.radians(55))) < 1e-12
    two.text(foot[0], foot[1] + 26, "*C*", size=16, color="line", anchor="middle", weight=600)
    two.text(tip[0] + 8, tip[1] + 4, "*b*", size=16, color="now")
    two.text(ox + L * 1.33 - 2, oy - 10, "*a*", size=16, color="line", anchor="end")
    two.text((ox + foot[0]) / 2, oy + 26, "*c*", size=15, color="line", anchor="middle")

    # ---- III: opposite on the sphere, orthogonal in Hilbert space
    title(three, "III　对跖 = 正交", "III  opposite = orthogonal")
    assert abs((1 + math.cos(math.pi)) / 2) < 1e-12 and abs(math.cos(math.pi / 2)) < 1e-12
    cx, cy, R = 60, 148, 52
    three.circle(cx, cy, R, color="dim", width=1.4, fill="cyan", fill_opacity=0.04)
    three.line(cx, cy - R, cx, cy + R, "faint", 1.1, dash="3 4")
    three.arrow(cx, cy, cx, cy - R, "line", 2.4)
    three.arrow(cx, cy, cx, cy + R, "line", 2.4)
    three.arc(cx, cy, 20, 90, -90, "dim", 1.4)
    three.text(cx + 26, cy, "180°", size=13, color="dim", middle=True)
    three.text(cx, cy - R - 10, "|0⟩", size=14, color="line", anchor="middle")
    three.text(cx, cy + R + 22, "|1⟩", size=14, color="line", anchor="middle")
    three.text(cx, 252, three.t("布洛赫球", "Bloch"), size=13, color="dim", anchor="middle")
    ox, oy, L = 138, 196, 70
    three.arrow(ox, oy, ox, oy - L, "line", 2.4)
    three.arrow(ox, oy, ox + L, oy, "line", 2.4)
    three.right_angle(ox, oy, 0, 12, "dim", 1.4)
    three.text(ox + 18, oy - 20, "90°", size=13, color="dim")
    three.text(ox, oy - L - 10, "|0⟩", size=14, color="line", anchor="middle")
    three.text(ox + L + 4, oy + 20, "|1⟩", size=14, color="line", anchor="middle")
    three.text(ox + 36, 252, three.t("希尔伯特", "Hilbert"), size=13, color="dim", anchor="middle")
