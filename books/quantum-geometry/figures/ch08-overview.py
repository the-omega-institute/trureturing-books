"""第八章地图：抹掉横着的一份，熵涨 ln 2；这笔熵先记在系统里，复位时再付成至少 ln 2 的热；漏掉一份副本，倒带回不到原处。
Chapter 8 at a glance: erasing the sideways part costs ln 2 of entropy; that entropy is first booked in the system and
paid out as at least ln 2 of heat on a reset; one unreversed copy keeps the rewind from reaching the start.

Panel I: |+⟩ is pinched in the computational basis; the horizontal part is removed and the arrow
shrinks to the centre; the entropy column rises from 0 to ln 2 (h(½) = ln 2 asserted).
Panel II: the two stages of §8.2 as two pairs of columns (S, βQ): after stage A, S = ln 2 and βQ = 0; after the ideal
reset of stage B, S = 0 and βQ = ln 2, touching the floor. The heat is a literature result and equality an ideal limit.
Panel III: the system's coherence was copied into five records; four are reversed (cyan), one copy k
survives (magenta), so the rewound coherence is c_k ρ₀₁ ≠ ρ₀₁.
"""

import math

from _ch08 import LN2, disc, h

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：琥珀色的箭头横躺在 |+⟩，品红的横向一份被抹掉，箭头缩成圆心的青色点；右边一根熵柱从 0 升到 ln 2。"
          "第二栏：两组灰色的柱，每组左边是系统的熵 S、右边是付出的热 βQ；A 组（捏合之后）S 到 ln 2、热为 0，B 组（复位之后）S 回到 0、"
          "热升到 ln 2，正好碰到标着“下界”的横线；下面注明热的一步是文献结果，取等是理想极限。第三栏：左边是系统，连向五份环境副本；四份标着倒带箭头，是青色的，"
          "一份副本 k 是品红的，没有倒带；下面写着倒带后得到 c_k ρ₀₁，不等于 ρ₀₁。",
    "en": "Three panels. Panel I: an amber arrow lies sideways at |+⟩; its magenta sideways part is removed and the arrow "
          "shrinks to a cyan point at the centre, while an entropy column on the right rises from 0 to ln 2. Panel II: two "
          "pairs of grey columns, the system's entropy S on the left of each pair and the heat paid βQ on the right; in pair A "
          "(after the pinch) S reaches ln 2 and the heat is 0, in pair B (after the reset) S is back to 0 and the heat has risen "
          "to ln 2, just touching the line marked “floor”; a note below says the heat step is a literature result and equality "
          "an ideal limit. Panel III: the system on the left is linked to five environment copies; four carry rewind arrows and are cyan, "
          "one copy k is magenta and not rewound; below, the rewind gives c_k ρ₀₁, not ρ₀₁.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: erase the sideways part, entropy +ln 2
    title(one, "I　抹掉横向，熵涨 ln 2", "I  erase sideways: +ln 2")
    P = disc(one, 92, 148, 76)
    tip = P(1, 0)
    one.line(*P(0, 0), *tip, "area", 9, cap="round", opacity=0.4)
    one.arrow(*P(0, 0), *tip, "now", 2.4)
    back = [(P(0, 0)[0] + (tip[0] - P(0, 0)[0]) * (1 - i / 30), P(0, 0)[1] + 30 * math.sin(math.pi * i / 30)) for i in range(31)]
    one.curve_arrow(back[1:-1], "dim", 1.4, head=7)
    one.text(tip[0] + 2, tip[1] - 12, "|+⟩", size=14, color="now", anchor="middle")
    one.dot(*P(0, 0), 5.6, "line", ring="bg")
    one.text(92, 252, one.t("捏合：缩到圆心", "pinched: to the centre"), size=13, color="line", anchor="middle")
    assert abs(h(0.5) - LN2) < 1e-12 and h(1.0) == 0
    bx, by, bw, bh = 196, 82, 24, 132            # the entropy column, full height = ln 2
    one.rect(bx, by, bw, bh, color="dim", width=1.3)
    one.rect(bx, by, bw, bh, color=None, fill="dim", fill_opacity=0.35)
    one.text(bx + bw / 2, by - 8, "ln 2", size=13, color="ink", anchor="middle")
    one.text(bx + bw / 2, by + bh + 18, "*S*", size=14, color="dim", anchor="middle")
    one.text(bx - 4, by + bh, "0", size=12, color="dim", anchor="end")


    # ---- II: the entropy is booked first (stage A), then paid out as heat on a reset (stage B, literature)
    title(two, "II　先记熵，再付热", "II  entropy first, then heat")
    base, top = 196, 196 - 120                   # a column of height ln 2 is 120 px
    bw = 20
    groups = ((40, two.t("A 捏合", "A pinch"), LN2, 0.0), (148, two.t("B 复位", "B reset"), 0.0, LN2))
    for gx, name, s_val, q_val in groups:
        two.text(gx + bw + 4, 52, name, size=13, color="dim", anchor="middle")
        for col, (val, lab) in enumerate(((s_val, "*S*"), (q_val, "β*Q*"))):
            x = gx + col * (bw + 8)
            hgt = 120 * val / LN2
            if hgt > 0:
                two.rect(x, base - hgt, bw, hgt, color="dim", width=1.3)
                two.rect(x, base - hgt, bw, hgt, color=None, fill="dim", fill_opacity=0.35)
            two.text(x + bw / 2, base + 18, lab, size=13, color="dim", anchor="middle")
        two.line(gx - 6, base, gx + 2 * bw + 14, base, "edge", 1.2)
    fx = 148 + bw + 8
    two.line(fx - 8, top, fx + bw + 8, top, "ink", 2.0)
    two.text(fx + bw + 12, top - 2, two.t("下界", "floor"), size=13, color="ink", middle=True)
    two.text(40 - 6, top, "ln 2", size=13, color="ink", anchor="end", middle=True)
    two.arrow(40 + bw + 2, top + 30, 148 + bw + 6, top + 30, "dim", 1.4)
    two.text(118, 236, two.t("热这一步：文献结果", "the heat: a literature result"), size=13, color="dim", anchor="middle")
    two.text(118, 254, two.t("取等：理想极限", "equality: an ideal limit"), size=13, color="dim", anchor="middle")

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
