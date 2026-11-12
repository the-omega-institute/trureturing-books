"""第三十二章地图：两子相遇拆成线与面、诊断统一理论的三根轴、把外部点 C 移进场内。
Chapter 32 at a glance: a meeting of two splits into a line and an area, the three axes for
diagnosing unified theories, and the outside point C moved into the field.

Panel I (§32.1–32.2): unit vectors A, B at θ = 55°; the cyan shadow A·B = cos θ and the magenta
parallelogram A∧B with height sin θ (asserted in _ch32). Panel II (§32.3): the corner of the
diagnostic box, θ line → area, η smooth → polytope, λ outside C → inside; no programme is placed
(the lab card cube does that). Panel III (§32.4): an observer at the north pole, sight lines a
quarter turn long, the closed equator at 90° as the horizon; the outside point C is struck out.
The axes and the horizon reading are the chapter's interpretive model (MODEL).
"""

import math

from _ch32 import axes, horizon, split

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：两支墨色单位箭头 A 与 B 夹角 θ；B 投到 A 上的青色影子是 A·B = cos θ，"
          "两支箭头张成的品红平行四边形是 A∧B，高为 sin θ。第二栏：一只盒子的角上三根轴："
          "θ 从青色的“线”到品红的“面积”，η 从圆（光滑）到六边形（多面体），λ 从圈外的点（球外 C）到圈内的点（场内）。"
          "第三栏：一个球，观察者站在北极，青色虚线的视线各走四分之一圈落到赤道上，品红的赤道就是 90° 视界；"
          "左上方球外的点 C 被划掉。",
    "en": "Three panels. Panel I: two ink unit arrows A and B at an angle θ; the cyan shadow of B on A is "
          "A·B = cos θ, and the magenta parallelogram they span is A∧B, of height sin θ. Panel II: three axes at "
          "the corner of a box: θ from the cyan ‘line’ to the magenta ‘area’, η from a circle (smooth) to a hexagon "
          "(polytope), λ from a dot outside a ring (outside C) to a dot inside it (inside). Panel III: a sphere with "
          "an observer at the north pole; cyan dashed lines of sight each run a quarter turn down to the equator, "
          "and the magenta equator is the 90° horizon; an outside point C at the upper left is struck out.",
}

THETA = 55.0


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    title(one, "I　一分为二：线与面", "I  one meeting, two parts")
    a, b, foot = split(one, 30, 200, 120, THETA)
    one.angle(30, 200, 30, 0, THETA, "θ", size=13)
    one.text((30 + foot[0]) / 2, 224, "A·B = cos θ", size=13, color="line", anchor="middle")
    one.text(a[0] + b[0] - 30 - 4, b[1] - 10, "A∧B", size=13, color="area", anchor="end")
    one.text(a[0] - 4, a[1] + 22, "*A*", size=14, weight=600)
    one.text(b[0] - 8, b[1] - 6, "*B*", size=14, weight=600, anchor="end")
    assert abs(math.cos(math.radians(THETA)) * 120 - (foot[0] - 30)) < 1e-9

    title(two, "II　三根诊断轴", "II  three diagnostic axes")
    axes(two, 74, 220, 124)

    title(three, "III　把 C 移进场内", "III  C moved inside")
    horizon(three, 128, 150, 76)
