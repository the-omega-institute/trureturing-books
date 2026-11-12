"""球面上转半圈，希尔伯特空间里只转四分之一圈：θ 对应 θ/2，权重是 cos²(θ/2)（第二章 §2.3）。
Half a turn on the sphere is a quarter turn in Hilbert space: θ corresponds to θ/2, and the weight is
cos²(θ/2) (chapter 2, §2.3).

The five marked angles are the rows of the chapter's table; the script checks every row:
(1 + cos θ)/2 = cos²(θ/2) = 1, ¾, ½, ¼, 0. The amber pair is the 120° row.
"""

import math

from _ch02 import along

SIZE = (560, 312)
WRAP = True
ROWS = [(0, "1"), (60, "¾"), (90, "½"), (120, "¼"), (180, "0")]
HI = 120
ALT = {
    "zh": "左边是布洛赫球的半个截面：从北极 a 出发顺着球面走到南极，是 θ 从 0° 到 180°，标出 0°、60°、90°、120°、180° 五个点。"
          "右边是希尔伯特空间里的四分之一圆：从 |φ⟩ 到与它正交的 |φ⊥⟩，是 θ/2 从 0° 到 90°，五个点依次在 0°、30°、45°、60°、90°，"
          "旁边青色的数是玻恩权重 cos²(θ/2)：1、¾、½、¼、0。琥珀色的箭头在两边各指着同一行：球面 120°，希尔伯特 60°，权重 ¼。",
    "en": "On the left, half a cross-section of the Bloch sphere: going along the sphere from the north pole a to the south pole "
          "is θ from 0° to 180°, with five points at 0°, 60°, 90°, 120° and 180°. On the right, a quarter circle in Hilbert "
          "space: from |φ⟩ to the orthogonal |φ⊥⟩ is θ/2 from 0° to 90°, with the five points at 0°, 30°, 45°, 60° and 90°; "
          "the cyan numbers beside them are the Born weights cos²(θ/2): 1, ¾, ½, ¼, 0. The amber arrows point to the same row "
          "on both sides: 120° on the sphere, 60° in Hilbert space, weight ¼.",
}


def draw(fig):
    t = fig.t
    for th, w in ROWS:
        p = (1 + math.cos(math.radians(th))) / 2
        assert abs(p - math.cos(math.radians(th / 2)) ** 2) < 1e-12
        assert abs(p - {"1": 1, "¾": 0.75, "½": 0.5, "¼": 0.25, "0": 0}[w]) < 1e-12

    one, two = fig.row([262, 282], 312, gap=16)

    # ---- the Bloch half circle: angle θ measured from the north pole
    cx, cy, R = 116, 178, 106
    one.text(cx + 20, 26, one.t("布洛赫球面：*θ*", "Bloch sphere: *θ*"), size=14, weight=600, anchor="middle")
    one.arc(cx, cy, R, 90, -90, "dim", 1.6)
    one.arc(cx, cy, R, 90, 270, "faint", 1.2, dash="3 4")
    one.line(cx, cy - R, cx, cy + R, "faint", 1.1, dash="3 4")
    for th, w in ROWS:
        p = along(cx, cy, 90 - th, R)
        one.dot(p[0], p[1], 5 if th != HI else 4, "line", ring="bg")
        q = along(cx, cy, 90 - th, R + 16)
        one.text(q[0], q[1] + (0 if 0 < th < 180 else (-6 if th == 0 else 6)), f"{th}°", size=13, color="dim",
                 anchor="start" if 0 < th < 180 else "middle", middle=True)
    tip = along(cx, cy, 90 - HI, R)
    one.arrow(cx, cy, tip[0], tip[1], "now", 2.6)
    one.arc(cx, cy, 30, 90 - HI, 90, "now", 1.6)
    one.text(cx - 10, cy - R + 4, "*a*", size=15, color="line", anchor="end")
    one.dot(cx, cy, 3.0, "dim")

    # ---- the Hilbert quarter circle: angle θ/2 measured from |φ⟩
    ox, oy, r = 52, 262, 190
    two.text(ox + 98, 26, two.t("希尔伯特空间：*θ*/2", "Hilbert space: *θ*/2"), size=14, weight=600, anchor="middle")
    two.arc(ox, oy, r, 0, 90, "dim", 1.6)
    two.line(ox, oy, ox, oy - r - 8, "faint", 1.1, dash="3 4")
    two.line(ox, oy, ox + r + 8, oy, "faint", 1.1, dash="3 4")
    for th, w in ROWS:
        h = th / 2
        p = along(ox, oy, 90 - h, r)
        two.dot(p[0], p[1], 5 if th != HI else 4, "line", ring="bg")
        o = along(ox, oy, 90 - h, r + 20)
        two.text(o[0], o[1], w, size=15, color="line", weight=600, anchor="middle", middle=True)
        # each half-angle sits beside its own weight, outside the arc, so no angle can be read off a neighbouring point
        if h < 90:
            two.text(o[0] + 12, o[1], f"{h:g}°", size=13, color="dim", anchor="start", middle=True)
        else:
            two.text(o[0], o[1] + 20, f"{h:g}°", size=13, color="dim", anchor="middle", middle=True)
    two.text(ox - 8, oy - r + 2, "|*φ*⟩", size=14, color="line", anchor="end")
    two.text(ox + r + 8, oy - 24, "|*φ*_{⊥}⟩", size=14, color="dim")
    tip = along(ox, oy, 90 - HI / 2, r)
    two.arrow(ox, oy, tip[0], tip[1], "now", 2.6)
    two.arc(ox, oy, 44, 90 - HI / 2, 90, "now", 1.6)
    two.text(ox + 8, oy + 30, two.t("青色的数：权重 cos^{2}(*θ*/2)", "cyan: weight cos^{2}(*θ*/2)"), size=13, color="line")
    two.dot(ox, oy, 3.0, "dim")
