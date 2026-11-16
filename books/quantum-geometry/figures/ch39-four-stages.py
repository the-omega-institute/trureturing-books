"""砍掉第 3 点 C 的四阶：C 高悬在外，C 被划掉，只剩指针与内存之间一道薄墙，墙也消失、只剩自己指回自己。
The four stages of cutting away the third point C: C hangs outside; C is struck out; only a thin wall
between pointer and memory is left; the wall is gone too and only something pointing back at itself
remains.

The chapter's four-stage table (MODEL) drawn as four tiles of one ladder. Stage 1: two arrows inside a
grey frame with an outside point C joined to both tips. Stage 2: the same two arrows measure each other
by their cyan shadows (θ = 60°, both of length cos θ = 1/2, asserted); C is crossed out. Stage 3: an
amber pointer reads one cell of a memory row across a dashed wall marked μ > 0. Stage 4: one cell ψ
with a cyan arrow leaving and re-entering it, μ = 0. Nothing here is a theorem; the tiles only
picture the rows of the table.
"""

import math

from _ch39 import cell, self_loop, title

SIZE = (740, 236)
WRAP = True
ALT = {
    "zh": "四个小格从左到右排成一级级台阶。第一阶：灰色方框是外部舞台，两支墨色箭头从同一点出发，上方一个墨色的点 C 用虚线连到两个箭头尖。"
          "第二阶：同样两支箭头，各自投到对方上的青色影子一样长，上方的 C 被叉掉。"
          "第三阶：一个琥珀色的指针 ptr 越过一道标着 μ > 0 的灰色虚线隔墙，指着下方一排内存格中的一格。"
          "第四阶：只剩一格 ψ，一支青色箭头离开它又回到它自己，下方写着 μ = 0。",
    "en": "Four small tiles from left to right, like steps. Stage 1: a grey frame is the outside stage; two ink arrows leave "
          "one point, and above them an ink point C is joined to both tips by dashed lines. Stage 2: the same two arrows, "
          "each casting a cyan shadow of the same length on the other; the C above is crossed out. Stage 3: an amber "
          "pointer ptr reaches across a grey dashed wall marked μ > 0 to one cell of a memory row below. Stage 4: only "
          "one cell ψ is left, with a cyan arrow leaving it and coming back to it; below, μ = 0.",
}

TH = 60.0


def arrows(p, ox, oy, R, *, shadows=False):
    h = TH / 2
    tips = []
    for a in (90 + h, 90 - h):
        r = math.radians(a)
        tips.append((ox + R * math.cos(r), oy - R * math.sin(r), r))
    if shadows:
        c = math.cos(math.radians(TH))
        assert abs(c - 0.5) < 1e-12
        for (sx, sy, sr), (dx, dy, dr) in ((tips[0], tips[1]), (tips[1], tips[0])):
            fx, fy = ox + R * c * math.cos(dr), oy - R * c * math.sin(dr)
            p.line(sx, sy, fx, fy, "line", 1.1, dash="3 3")
            p.line(ox, oy, fx, fy, "line", 4.0, cap="round")
    for x, y, _ in tips:
        p.arrow(ox, oy, x, y, "ink", 2.0, head=8)
    p.dot(ox, oy, 3.0, "ink")
    return tips


def draw(fig):
    t = fig.t
    tiles = fig.row([170, 170, 170, 170], 236, gap=20)
    heads = [("第一阶　舞台", "1  the stage"), ("第二阶　两子", "2  pairwise"),
             ("第三阶　指针", "3  the pointer"), ("第四阶　自指", "4  self-reference")]
    foot = [("C 在外", "C outside"), ("C 划掉", "C struck out"), ("μ > 0", "μ > 0"), ("μ = 0", "μ = 0")]
    for p, (zh, en), (fz, fe) in zip(tiles, heads, foot):
        title(p, zh, en)
        p.text(p.width / 2, 222, t(fz, fe), size=14, color="dim", anchor="middle")

    # stage 1: a frame, two arrows, an outside C
    one = tiles[0]
    one.rect(18, 92, 134, 104, color="dim", rx=4, width=1.3, dash="5 4")
    tips = arrows(one, 85, 186, 78)
    cx, cy = 85, 52
    for x, y, _ in tips:
        one.line(cx, cy, x, y, "faint", 1.2, dash="3 4")
    one.dot(cx, cy, 4.6, "ink")
    one.text(cx + 12, cy + 5, "*C*", size=15)

    # stage 2: mutual shadows, C crossed out
    two = tiles[1]
    tips = arrows(two, 85, 192, 96, shadows=True)
    cx, cy = 85, 56
    two.dot(cx, cy, 4.2, "dim")
    two.cross(cx, cy, 11, "dim", 2.2)
    two.text(cx + 16, cy + 5, "*C*", size=15, color="dim")

    # stage 3: a pointer across a thin wall
    three = tiles[2]
    three.rect(58, 50, 54, 28, color="now", fill="panel", rx=4, width=1.6)
    three.text(85, 64, "ptr", size=14, color="now", anchor="middle", middle=True, mono=True)
    three.line(14, 110, 156, 110, "dim", 1.6, dash="5 4")
    w, g = 28, 6
    x0 = (three.width - (5 * w + 4 * g)) / 2
    for k in range(5):
        three.rect(x0 + k * (w + g), 150, w, 34, color="ink", fill="panel", rx=3, width=1.4)
    target = x0 + 2 * (w + g) + w / 2
    three.arrow(85, 80, target, 146, "now", 2.0, head=8)

    # stage 4: one cell pointing back at itself
    four = tiles[3]
    cell(four, 60, 120, 50, 44, "*ψ*", size=16, loop=False)
    self_loop(four, 85, 120, r=16)
