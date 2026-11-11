"""第八章地图：拷贝之后局部分不开；抹掉横着的一份，熵涨 ln 2；漏掉一份副本，倒带回不到原处。
Chapter 8 at a glance: after the copy the two states look the same locally; erasing the sideways part
costs ln 2 of entropy; one unreversed copy keeps the rewind from reaching the start.

Panel I: ρ and σ share their diagonal (same height z) and differ in coherence (horizontal part); the
partial trace over the record keeps only the diagonal, so both land on the same point of the z axis.
Panel II: |+⟩ is pinched in the computational basis; the horizontal part is removed and the arrow
shrinks to the centre; the entropy column rises from 0 to ln 2 (h(½) = ln 2 asserted).
Panel III: the system's coherence was copied into five records; four are reversed (cyan), one copy k
survives (magenta), so the rewound coherence is c_k ρ₀₁ ≠ ρ₀₁.
"""

import math

from _ch08 import LN2, disc, h

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：布洛赫球的竖直截面里有两支箭头 ρ 与 σ，高度相同、横向分量不同；品红虚线把两者的横向分量抹掉，"
          "两支箭头都落到竖轴上同一个青色的点。第二栏：琥珀色的箭头横躺在 |+⟩，品红的横向一份被抹掉，箭头缩成圆心的青色点；"
          "右边一根熵柱从 0 升到 ln 2。第三栏：左边是系统，连向五份环境副本；四份标着倒带箭头，是青色的，"
          "一份副本 k 是品红的，没有倒带；下面写着倒带后得到 c_k ρ₀₁，不等于 ρ₀₁。",
    "en": "Three panels. Panel I: in a vertical cross-section of the Bloch ball, two arrows ρ and σ have the same height but "
          "different sideways parts; magenta dashed lines remove the sideways parts and both arrows land on the same cyan "
          "point of the vertical axis. Panel II: an amber arrow lies sideways at |+⟩; its magenta sideways part is removed and "
          "the arrow shrinks to a cyan point at the centre, while an entropy column on the right rises from 0 to ln 2. "
          "Panel III: the system on the left is linked to five environment copies; four carry rewind arrows and are cyan, "
          "one copy k is magenta and not rewound; below, the rewind gives c_k ρ₀₁, not ρ₀₁.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: same diagonal, different coherence → same reduced state
    title(one, "I　拷贝后，局部分不开", "I  copied: locally alike")
    P = disc(one, 118, 148, 86)
    z = 0.35
    rho, sig = (0.78, z), (-0.62, z)
    foot = P(0, z)
    for (x, zz), name, col, dx in ((rho, "*ρ*", "now", 10), (sig, "*σ*", "ink", -10)):
        tip = P(x, zz)
        one.line(tip[0], tip[1], foot[0], foot[1], "area", 1.6, dash="4 3")
        one.arrow(*P(0, 0), *tip, col, 2.4)
        one.text(tip[0] + dx, tip[1] - 8, name, size=16, color=col, anchor="start" if dx > 0 else "end")
    one.dot(*foot, 5.6, "line", ring="bg")
    one.text(118, 252, one.t("求偏迹后：同一点", "after the partial trace: one point"), size=13, color="line",
             anchor="middle")

    # ---- II: erase the sideways part, entropy +ln 2
    title(two, "II　抹掉横向，熵涨 ln 2", "II  erase sideways: +ln 2")
    P = disc(two, 92, 148, 76)
    tip = P(1, 0)
    two.line(*P(0, 0), *tip, "area", 9, cap="round", opacity=0.4)
    two.arrow(*P(0, 0), *tip, "now", 2.4)
    back = [(P(0, 0)[0] + (tip[0] - P(0, 0)[0]) * (1 - i / 30), P(0, 0)[1] + 30 * math.sin(math.pi * i / 30)) for i in range(31)]
    two.curve_arrow(back[1:-1], "dim", 1.4, head=7)
    two.text(tip[0] + 2, tip[1] - 12, "|+⟩", size=14, color="now", anchor="middle")
    two.dot(*P(0, 0), 5.6, "line", ring="bg")
    two.text(92, 252, two.t("捏合：缩到圆心", "pinched: to the centre"), size=13, color="line", anchor="middle")
    assert abs(h(0.5) - LN2) < 1e-12 and h(1.0) == 0
    bx, by, bw, bh = 196, 82, 24, 132            # the entropy column, full height = ln 2
    two.rect(bx, by, bw, bh, color="dim", width=1.3)
    two.rect(bx, by, bw, bh, color=None, fill="dim", fill_opacity=0.35)
    two.text(bx + bw / 2, by - 8, "ln 2", size=13, color="ink", anchor="middle")
    two.text(bx + bw / 2, by + bh + 18, "*S*", size=14, color="dim", anchor="middle")
    two.text(bx - 4, by + bh, "0", size=12, color="dim", anchor="end")

    # ---- III: one surviving copy blocks the rewind
    title(three, "III　漏一份副本，倒不回去", "III  one copy left: no rewind")
    sx, sy = 40, 132
    copies = 5
    for i in range(copies):
        y = 58 + i * 37
        x = 176
        k = i == 3
        col = "area" if k else "line"
        three.line(sx + 8, sy, x - 14, y, col, 1.6 if not k else 2.2, dash=None if k else "4 3")
        three.circle(x, y, 13, color=col, fill=col, fill_opacity=0.18, width=1.6)
        if k:
            three.text(x + 22, y, "*k*", size=15, color="area", middle=True)
        else:
            loop = [(x + 20 + 7 * math.cos(math.radians(a)), y - 7 * math.sin(math.radians(a))) for a in range(60, 360, 15)]
            three.curve_arrow(loop, "line", 1.4, head=6)
    three.dot(sx, sy, 7, "now", ring="bg")
    three.text(sx, sy + 26, three.t("系统", "system"), size=13, color="dim", anchor="middle")
    three.text(118, 252, "*c*_{k} *ρ*_{01} ≠ *ρ*_{01}", size=15, color="area", anchor="middle")
