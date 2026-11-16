"""“点 C”是 b 落在 a 上的影子：c = (a·b)a 长 cos θ，剩下的垂线 b − c 长 sin θ（第二章 §2.2）。
"Point C" is the shadow of b on a: c = (a·b)a has length cos θ, and the remaining perpendicular b − c
has length sin θ (chapter 2, §2.2).

Drawn at θ = 50°; the script checks a·(b − c) = 0 and |c|² + |b − c|² = 1.
"""

import math

from _ch02 import along, shadow

SIZE = (420, 296)
ALT = {
    "zh": "青色的直线是已知态 a 所在的线，琥珀色的单位箭头 b 与它夹角 θ = 50°。从 b 的箭尖向 a 作垂线，垂足标作 C。"
          "从原点到 C 的青色粗线是影子 c = (a·b)a，长 cos θ；从 C 到 b 箭尖的品红虚线是垂直的剩余 b − c，长 sin θ，"
          "与青色的线成直角。",
    "en": "The cyan line is the line of the known state a; the amber unit arrow b makes an angle θ = 50° with it. Dropping a "
          "perpendicular from the tip of b onto a gives the foot, marked C. The thick cyan segment from the origin to C is the "
          "shadow c = (a·b)a, of length cos θ; the dashed magenta segment from C to the tip of b is the perpendicular "
          "remainder b − c, of length sin θ, at a right angle to the cyan line.",
}

THETA = 50


def draw(fig):
    t = fig.t
    ox, oy, L = 34, 258, 232
    tip, foot, c = shadow(fig, ox, oy, 0, THETA, L, ruler=1.3, back=0.08)
    s = math.sin(math.radians(THETA))
    b = (math.cos(math.radians(THETA)), s)
    perp = (b[0] - c, b[1])
    assert abs(perp[0] * 1 + perp[1] * 0) < 1e-12                 # a·(b − c) = 0 with a = (1, 0)
    assert abs(c ** 2 + perp[0] ** 2 + perp[1] ** 2 - 1) < 1e-12   # cos² θ + sin² θ = 1

    # faint unit circle arc that b ends on
    fig.arc(ox, oy, L, 0, 64, "faint", 1.2, dash="3 4")
    fig.angle(ox, oy, 52, 0, THETA, "*θ*", color="dim", size=15)

    end = along(ox, oy, 0, L * 1.3)
    fig.text(end[0] - 4, end[1] - 10, "*a*", size=17, color="line", anchor="end")
    fig.text(tip[0] + 8, tip[1] + 2, "*b*", size=17, color="now")
    fig.text(foot[0] + 2, foot[1] + 26, "*C*", size=17, color="line", anchor="middle", weight=600)
    fig.text(foot[0] / 2 + ox / 2, oy + 26, "*c* = cos *θ* · *a*", size=16, color="line", anchor="middle")
    mid = ((tip[0] + foot[0]) / 2, (tip[1] + foot[1]) / 2)
    fig.text(mid[0] + 12, mid[1] - 8, "*b* − *c*", size=16, color="area")
    fig.text(mid[0] + 12, mid[1] + 14, "sin *θ*", size=15, color="area")
    fig.text(SIZE[0] - 10, 30, t("C 是垂足，不是第三个参照点", "C is a foot, not a third reference"), size=14,
             color="dim", anchor="end")
