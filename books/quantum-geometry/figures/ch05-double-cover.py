"""旋转转一圈，旋子只走半圈：旋子圆经平方映射 z ↦ z² 落到旋转圆上（第五章 §5.2）。
One full turn of the rotation is only half a turn of the rotor: the rotor circle maps onto the rotation circle by
squaring, z ↦ z² (chapter 5, §5.2).

The points are the rows of the chapter's table [@ex-rotor-two-turns]: the rotation sits at (cos θ, sin θ), the rotor
at (cos θ/2, sin θ/2), for θ = 0°, 90°, …, 720°. The script checks the four-place values of the table and that
squaring each rotor point gives its rotation point.
"""

import cmath
import math

from _ch05 import along, turn_arc

SIZE = (600, 262)
WRAP = True
ALT = {
    "zh": "两个圆。左边紫色的圆是旋子 R(θ)，右边的圆是旋转 θ，中间一个箭头写着“平方 z ↦ z²”。转角 θ 从 0° 每次加 90° 到 720°："
          "左圆上的点每次只走 45°，依次标 0°、90°、…、630°，实线弧是第一圈 0° 到 360°，只走了半个圆，虚线弧是第二圈；"
          "右圆上的点每次走 90°，实线与虚线两圈各绕一整圈，0°、360°、720° 落在同一点。琥珀色的点标出 θ = 360°："
          "右圆上它回到出发点，左圆上它停在对面的 −1。",
    "en": "Two circles. The violet circle on the left is the rotor R(θ), the circle on the right is the rotation θ, and an "
          "arrow between them reads “square z ↦ z²”. The angle θ goes from 0° to 720° in steps of 90°: on the left circle each "
          "step moves only 45°, the points marked 0°, 90°, …, 630°, the solid arc is the first turn from 0° to 360° and covers "
          "only half the circle, the dashed arc is the second turn; on the right circle each step moves 90°, the solid and the "
          "dashed loops each go once all the way round, and 0°, 360° and 720° land on one point. Amber dots mark θ = 360°: on "
          "the right it is back at the start, on the left it stands opposite, at −1.",
}

TABLE = [  # θ, rotation (cos θ, sin θ), rotor (cos θ/2, sin θ/2), rounded as in the chapter
    (0, (1, 0), (1, 0)), (90, (0, 1), (0.7071, 0.7071)), (180, (-1, 0), (0, 1)), (270, (0, -1), (-0.7071, 0.7071)),
    (360, (1, 0), (-1, 0)), (450, (0, 1), (-0.7071, -0.7071)), (540, (-1, 0), (0, -1)),
    (630, (0, -1), (0.7071, -0.7071)), (720, (1, 0), (1, 0)),
]


def check():
    for th, rot, half in TABLE:
        z = cmath.exp(1j * math.radians(th) / 2)
        assert abs(round(z.real, 4) - half[0]) < 1e-9 and abs(round(z.imag, 4) - half[1]) < 1e-9
        w = z * z
        assert abs(w.real - rot[0]) < 1e-9 and abs(w.imag - rot[1]) < 1e-9


def draw(fig):
    t = fig.t
    check()
    r = 68
    left, mid, right = fig.row([250, 76, 250], 262, gap=10)
    L = Rt = (125, 142)

    left.text(L[0], 30, t("旋子 *R*(θ)", "rotor *R*(θ)"), size=16, color="axis", anchor="middle", weight=600)
    right.text(Rt[0], 30, t("旋转 θ", "rotation θ"), size=16, color="ink", anchor="middle", weight=600)

    # rotor circle: first turn (θ = 0…360°) is the upper half, second turn the lower half
    left.circle(*L, r, color="faint", width=1.1)
    turn_arc(left, *L, r, 0, 180, "axis", 2.6, gap=2)
    turn_arc(left, *L, r, 180, 360, "axis", 1.8, gap=2, dash="5 4")
    for th, _, _ in TABLE[:-1]:
        x, y = along(*L, th / 2, r)
        left.dot(x, y, 3.4, "axis", ring="bg")
        lx, ly = along(*L, th / 2, r + 19)
        anchor = "middle" if abs(math.cos(math.radians(th / 2))) < 0.3 else ("start" if math.cos(math.radians(th / 2)) > 0 else "end")
        left.text(lx + (-6 if anchor == "start" else 6 if anchor == "end" else 0), ly, f"{th}°", size=13, color="dim",
                  anchor=anchor, middle=True)

    # rotation circle: two full loops, the second drawn just inside the first
    right.circle(*Rt, r, color="faint", width=1.1)
    turn_arc(right, *Rt, r, 0, 360, "ink", 2.2, gap=4)
    turn_arc(right, *Rt, r - 14, 0, 360, "ink", 1.6, gap=6, dash="5 4")
    names = {0: ["0°", "360°", "720°"], 90: ["90° · 450°"], 180: ["180°", "540°"], 270: ["270° · 630°"]}
    for a, rows in names.items():
        x, y = along(*Rt, a, r)
        right.dot(x, y, 3.4, "ink", ring="bg")
        if a == 0:
            right.lines(x + 12, y - 14, rows, size=13, leading=1.15, color="dim")
        elif a == 180:
            right.lines(x - 12, y - 6, rows, size=13, leading=1.15, color="dim", anchor="end")
        elif a == 90:
            right.text(x, y - 12, rows[0], size=13, color="dim", anchor="middle")
        else:
            right.text(x, y + 22, rows[0], size=13, color="dim", anchor="middle")

    # θ = 360°: back home on the right, opposite on the left
    x, y = along(*L, 180, r)
    left.dot(x, y, 6, "now", ring="bg")
    left.text(x + 12, y + 22, "−1", size=16, color="now", weight=600)
    x, y = along(*Rt, 0, r)
    right.dot(x, y, 6, "now", ring="bg")

    # squaring sends the left circle onto the right one
    mid.arrow(6, L[1], mid.width - 6, L[1], "dim", 1.8)
    mid.text(mid.width / 2, L[1] - 14, t("平方", "square"), size=14, color="dim", anchor="middle")
    mid.text(mid.width / 2, L[1] + 24, "*z* ↦ *z*^{2}", size=14, color="dim", anchor="middle")
