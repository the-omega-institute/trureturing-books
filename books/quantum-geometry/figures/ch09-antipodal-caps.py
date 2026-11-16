"""一种颜色是一对对跖的 45° 球冠：同一冠里两点夹角小于 90°，分处两冠夹角大于 90°，永远凑不出直角（第九章 §9.4）。
One colour is a pair of antipodal 45° caps: two points in the same cap are less than 90° apart, two points in
opposite caps more than 90° apart, so no pair is ever at a right angle (chapter 9, §9.4).

The picture is the cross-section of the sphere through the axis ±â. The script checks on a grid of directions
inside the two caps that ⟨x, y⟩ > 0 within a cap and ⟨x, y⟩ < 0 across, and that the three marked points obey
the same rule.
"""

import math

SIZE = (460, 340)
ALT = {
    "zh": "球过轴 ±â 的竖直截面：一个圆，紫色的竖线是轴，上端 +â、下端 −â。圆上离轴 45° 以内的上下两段弧及其扇形是青色的，"
          "这一对球冠合起来是一种颜色；左右两侧的弧是灰色的缝。上面的冠里有两点 x、y，它们之间的小角标“< 90°”；"
          "下面的冠里有一点 z，x 与 z 之间的角标“> 90°”。下冠右侧标出半顶角 45°。",
    "en": "The vertical cross-section of the sphere through the axis ±â: a circle with the violet axis as a vertical line, +â at "
          "the top and −â at the bottom. The arcs within 45° of the axis, top and bottom, and their sectors are cyan: this pair "
          "of caps is one colour; the arcs at the left and right are grey gaps. Two points x and y in the upper cap are joined "
          "by a small angle marked “< 90°”; a point z sits in the lower cap, and the angle between x and z is marked “> 90°”. "
          "The half-angle 45° is marked on the right of the lower cap.",
}

X_DEG, Y_DEG, Z_DEG = 72, 122, 236          # directions in the plane, counter-clockwise from the right


def in_caps(deg):
    """Within 45° of the axis (up or down), strictly."""
    return abs(math.sin(math.radians(deg))) > math.sqrt(0.5)


def cosine(d1, d2):
    return math.cos(math.radians(d1 - d2))


def draw(fig):
    t = fig.t
    ox, oy, R = 230, 178, 122

    caps = [d / 2 for d in range(0, 720) if in_caps(d / 2)]
    for d1 in caps[::7]:
        for d2 in caps[::7]:
            same = math.sin(math.radians(d1)) * math.sin(math.radians(d2)) > 0
            c = cosine(d1, d2)
            assert (c > 0) if same else (c < 0)
    assert all(in_caps(d) for d in (X_DEG, Y_DEG, Z_DEG))
    assert 0 < cosine(X_DEG, Y_DEG) and cosine(X_DEG, Z_DEG) < 0

    # the gaps, then the two caps
    fig.arc(ox, oy, R, -45, 45, "faint", 1.6)
    fig.arc(ox, oy, R, 135, 225, "faint", 1.6)
    for a0 in (45, 225):
        fig.arc(ox, oy, R, a0, a0 + 90, None, fill="line", fill_opacity=0.14)
        fig.arc(ox, oy, R, a0, a0 + 90, "line", 3.0)
        for a in (a0, a0 + 90):
            fig.line(ox, oy, ox + R * math.cos(math.radians(a)), oy - R * math.sin(math.radians(a)), "line", 1.0,
                     dash="3 3")

    # the axis
    fig.line(ox, oy + R + 18, ox, oy - R - 18, "axis", 2.0)
    fig.dot(ox, oy - R, 4.0, "axis", ring="bg")
    fig.dot(ox, oy + R, 4.0, "axis", ring="bg")
    fig.text(ox + 10, oy - R - 8, "+*â*", size=15, color="axis")
    fig.text(ox + 10, oy + R + 20, "−*â*", size=15, color="axis")

    # three points and their angles
    def at(deg, r=R):
        return ox + r * math.cos(math.radians(deg)), oy - r * math.sin(math.radians(deg))

    for d, s, dx, dy, anchor in ((X_DEG, "*x*", 8, -6, "start"), (Y_DEG, "*y*", -10, -6, "end"),
                                 (Z_DEG, "*z*", -10, 14, "end")):
        fig.line(ox, oy, *at(d), "ink", 1.6)
        x, y = at(d)
        fig.dot(x, y, 5.0, "line", ring="bg")
        fig.text(x + dx, y + dy, s, size=16, color="line", anchor=anchor)
    fig.arc(ox, oy, 66, X_DEG, Y_DEG, "dim", 1.4)
    lx, ly = at((X_DEG + Y_DEG) / 2, 84)
    fig.text(lx, ly, "< 90°", size=13, color="dim", anchor="middle", middle=True, halo=True)
    fig.arc(ox, oy, 32, X_DEG, Z_DEG, "dim", 1.4)
    lx, ly = at(185, 58)
    fig.text(lx, ly, "> 90°", size=13, color="dim", anchor="middle", middle=True, halo=True)

    fig.arc(ox, oy, 74, 270, 315, "line", 1.4)
    lx, ly = at(292, 92)
    fig.text(lx, ly, "45°", size=13, color="line", anchor="middle", middle=True, halo=True)

    fig.text(ox + R + 12, oy + 5, t("缝", "gap"), size=13, color="dim")
    fig.text(ox - R - 12, oy + 5, t("缝", "gap"), size=13, color="dim", anchor="end")
