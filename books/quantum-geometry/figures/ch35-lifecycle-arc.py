"""生命周期弧与它的陷阱：从 90° 的光折到 0⁺，长到 θ*，若再一路推回 90°，留在一维轴上的影子 cos θ 归零。
The lifecycle arc and its trap: from light at 90° down to 0⁺, up to θ*, and, if pushed on back to
90°, the shadow cos θ left on the one-dimensional axis falls to zero.

A quarter of the unit circle in the chapter's tilt model (MODEL): across is the persistence share
cos θ (cyan), up the transverse share sin θ (magenta). The stages are I θ = 90°, II θ → 0⁺ (drawn at 4°),
III θ* with cos θ* = θ* ≈ 0.739 rad ≈ 42.35° (asserted in _ch35), IV back to 90° (dashed, questioned).
"""

import math

from _ch35 import THETA_STAR

SIZE = (460, 320)
ALT = {
    "zh": "四分之一单位圆。横轴是一维持存份额 cos θ（青色），竖轴是横向份额 sin θ（品红）。圆上标出四个阶段："
          "I 在 90°（光之全场）；外侧一支弧形箭头 II 从 90° 一路转到接近 0°（脉冲）；内侧一支弧形箭头 III 从 0⁺ 转到 θ* ≈ 42.35°，"
          "那里的态在横轴上投下一段粗的青色影子 cos θ*；再往上一支虚线弧 IV 带着问号回到 90°，那里的影子缩成原点上的一点，写着 cos 90° = 0。",
    "en": "A quarter of the unit circle. Across is the one-dimensional persistence share cos θ (cyan), up the transverse "
          "share sin θ (magenta). Four stages are marked: I at 90° (the field of light); an outer curved arrow II turns "
          "from 90° almost down to 0° (the pulse); an inner curved arrow III turns from 0⁺ to θ* ≈ 42.35°, where the state "
          "casts a thick cyan shadow cos θ* on the horizontal axis; a dashed arc IV with a question mark goes on back to "
          "90°, where the shadow shrinks to a single point at the origin, labelled cos 90° = 0.",
}

THETA_II = 4.0  # degrees: θ → 0⁺, drawn at a small positive angle


def draw(fig):
    t = fig.t
    ox, oy, R = 140, 286, 228
    ts = math.degrees(THETA_STAR)
    assert abs(ts - 42.35) < 5e-3

    def P(deg, r=R):
        a = math.radians(deg)
        return ox + r * math.cos(a), oy - r * math.sin(a)

    fig.arrow(ox, oy, ox + R + 26, oy, "line", 1.5, head=8)
    fig.arrow(ox, oy, ox, oy - R - 24, "area", 1.5, head=8)
    fig.text(ox + R + 26, oy + 22, "cos θ", size=14, color="line", anchor="end")
    fig.text(ox, oy - R - 32, "sin θ", size=14, color="area", anchor="middle")
    fig.arc(ox, oy, R, 0, 90, "faint", 1.4)

    # III: the state at θ* and its shadow on the persistence axis
    sx, sy = P(ts)
    fig.line(sx, sy, sx, oy, "dim", 1.2, dash="3 3")
    fig.line(ox, oy, sx, oy, "line", 5.0, cap="round")
    fig.arrow(ox, oy, sx, sy, "ink", 2.4, head=10)
    fig.dot(sx, sy, 4.6, "ink", ring="bg")
    fig.angle(ox, oy, 46, 0, ts, "θ* ≈ 42.35°", size=14, color="ink", label_r=104)
    fig.text((ox + sx) / 2, oy + 22, "cos θ*", size=14, color="line", anchor="middle")

    # I / IV: the state at 90° — no shadow
    tx, ty = P(90)
    fig.dot(tx, ty, 4.6, "ink", ring="bg")
    fig.text(tx - 12, ty + 5, t("I　光之全场", "I  light"), size=14, color="ink", anchor="end")
    fig.dot(ox, oy, 5.2, "line", ring="bg")
    fig.text(ox - 12, oy, "cos 90° = 0", size=14, color="line", anchor="end", middle=True)

    # II: the pulse, 90° → 0⁺, outside the circle
    r2 = R + 16
    fig.curve_arrow([P(88 - (88 - THETA_II - 2) * i / 40, r2) for i in range(41)], "ink", 2.0, head=9)
    x2, y2 = P(70, r2 + 14)
    fig.text(x2, y2, t("II　脉冲", "II  pulse"), size=14, color="ink", anchor="start")
    fig.dot(*P(THETA_II), 4.2, "ink", ring="bg")
    fig.text(P(THETA_II)[0] - 6, P(THETA_II)[1] - 10, "0⁺", size=13, color="dim", anchor="end")

    # III: growth, 0⁺ → θ*, inside the circle
    r3 = R - 26
    fig.curve_arrow([P(THETA_II + 3 + (ts - THETA_II - 6) * i / 30, r3) for i in range(31)], "ink", 2.0, head=9)
    x3, y3 = P(20, r3 - 22)
    fig.text(x3, y3, t("III　扩表", "III  growth"), size=14, color="ink", anchor="end")

    # IV: θ* → 90°, dashed and questioned
    fig.curve_arrow([P(ts + 4 + (86 - ts - 4) * i / 30, r3) for i in range(31)], "dim", 2.0, head=9, dash="5 4")
    x4, y4 = P(66, r3 - 26)
    fig.text(x4, y4, "IV ?", size=15, color="dim", anchor="middle", weight=600)
