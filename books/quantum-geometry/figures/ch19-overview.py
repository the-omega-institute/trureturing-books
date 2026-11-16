"""第十九章地图：层级网络里区间的割、宽度三桥图上的流等于割、对数容量的分片沿接缝拼接。
Chapter 19 at a glance: the cut of an interval in a layered network, flow equal to cut on the
width-three bridge graph, and log-capacity facets stitched along a seam.

Panel I is an ordinary binary tree over 8 boundary legs (not the MERA-style network of the
layered-network-cut cards): the interval of legs 2–5 is cut off by two bonds (counted by the script). Panel II is the worked example (a, b, c, d) = (2, 3, 2, 3)
with its two outer min cuts of capacity 6. Panel III is the slice a = 2, b = 3, c = 2 of the
log-capacity envelope with the lattice points d = 2, 3, 4. The cut ad is solid magenta and the cut bc dashed
magenta in both panels II and III.
"""

import math

from _ch19 import bridge, cut_lines, envelope, qmincut

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一棵普通的二叉树（不是后面实验卡里的层级网络），底边 8 条腿，往上每层两两合并到一个张量，直到顶上一个；底边第 3 到第 6 条腿是琥珀色的区间，"
          "把它切下来只需割断品红标出的两条键，而不是四条腿。"
          "第二栏：宽度三桥图，张量 M、N 之间三条桥，腿 a = 2、b = 3、c = 2、d = 3；上面一道品红实线 ad 与下面一道品红虚线 bc 是最小割 ad = bc = 6，下面一枚绿色的 LEAN ✓ 标签：流 = 割 = 6。"
          "第三栏：对数容量图，品红实线的斜线 ln ad 与品红虚线的水平线 ln bc 在竖直虚线（接缝）处拼成一条折线，折线上三个格点 d = 2、3、4。",
    "en": "Three panels. Panel I: an ordinary binary tree (not the layered network of the later experiment cards) with 8 legs along the bottom, merging in pairs into one tensor per "
          "step up to a single tensor at the top; legs 3 to 6 are the amber interval, and cutting it off takes only the two "
          "bonds marked magenta, not four legs. Panel II: the width-three bridge graph, three bridges between tensors M and N, "
          "legs a = 2, b = 3, c = 2, d = 3; the solid magenta line ad above and the dashed magenta line bc below are the min cut ad = bc = 6, with a "
          "green LEAN ✓ tag beneath: flow = cut = 6. Panel III: a log-capacity plot; the solid magenta sloping line ln ad and the "
          "dashed magenta horizontal line ln bc join into one bent line at the dashed vertical seam, with three lattice points "
          "d = 2, 3, 4 on it.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def tree_levels(n=8):
    """Node index ranges per level of the binary tree: level 0 are the n legs."""
    levels = [[(i, i) for i in range(n)]]
    while len(levels[-1]) > 1:
        prev = levels[-1]
        levels.append([(prev[2 * k][0], prev[2 * k + 1][1]) for k in range(len(prev) // 2)])
    return levels


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)

    # ---- I: the cut of an interval in a layered network
    title(one, "I　二叉树里的割", "I  a cut in a binary tree")
    levels = tree_levels(8)
    A = set(range(2, 6))
    # bonds above a node are cut when the node's legs lie inside A and its parent's do not
    legs = lambda lo, hi: set(range(lo, hi + 1))
    cut = [(lv, k) for lv, row in enumerate(levels[:-1]) for k, (lo, hi) in enumerate(row)
           if legs(lo, hi) <= A and not legs(*levels[lv + 1][k // 2]) <= A]
    assert sorted(cut) == [(1, 1), (1, 2)] and len(cut) < len(A)

    xs = [24 + 26.9 * i for i in range(8)]
    ys = [222, 172, 122, 72]
    pos = []
    for lv, row in enumerate(levels):
        pos.append([((xs[lo] + xs[hi]) / 2, ys[lv]) for lo, hi in row])
    for lv in range(1, len(levels)):
        for k, (x, y) in enumerate(pos[lv]):
            for child in (2 * k, 2 * k + 1):
                cx, cy = pos[lv - 1][child]
                hit = (lv - 1, child) in cut
                one.line(x, y, cx, cy, "area" if hit else "dim", 3.0 if hit else 1.6)
                if hit:
                    mx, my = (x + cx) / 2, (y + cy) / 2
                    one.line(mx - 7, my - 2, mx + 7, my + 2, "area", 2.4)
    for i, (x, y) in enumerate(pos[0]):
        inside = i in A
        one.line(x, y, x, y + 26, "now" if inside else "dim", 3.0 if inside else 1.6)
        one.dot(x, y, 4.2, "now" if inside else "dim")
    for lv in range(1, len(levels)):
        for x, y in pos[lv]:
            one.rect(x - 8, y - 7, 16, 14, color="ink", fill="panel", width=1.6, rx=3)
    one.text(one.width / 2, 274, one.t("树：4 条腿，割 2 条键", "tree: 4 legs, 2 bonds cut"), size=13, color="dim", anchor="middle")

    # ---- II: flow = cut on the width-three bridge graph
    title(two, "II　宽度三桥：流 = 割", "II  bridge: flow = cut")
    dims = {"a": 2, "b": 3, "c": 2, "d": 3}
    assert qmincut(2, 3, 2, 3) == 6
    g = bridge(two, 118, 140, gap=92, leg=40, dims=dims, size=13)
    top, bot, _ = cut_lines(g, pad=30)
    for ((x1, y1), (x2, y2)), dash, name in ((top, None, "*ad*"), (bot, "7 5", "*bc*")):
        two.line(x1, y1, x2, y2, "area", 2.6, dash=dash)
        two.text(x2 + 5, y1, name, size=14, color="area", middle=True)
    two.chip(118, 280, two.t("LEAN ✓ 流 = 割 = 6", "LEAN ✓ flow = cut = 6"), "lean", anchor="middle")

    # ---- III: facets stitched along a seam
    title(three, "III　分片沿接缝拼接", "III  facets meet at a seam")
    ax = three.axes(28, 54, 192, 168, (math.log(1.6), math.log(5)), (math.log(3.2), math.log(9)))
    ax.xaxis(ticks=[math.log(d) for d in (2, 3, 4)], labels=["2", "3", "4"], label="*d*", size=13)
    ax.yaxis()
    zl, zr = ax.xr
    seam = math.log(3)
    ax.path([(zl, math.log(2) + zl), (seam, math.log(6))], color="area", width=3.4)          # the ad facet: solid, as the top cut of panel II
    ax.path([(seam, math.log(6)), (zr, math.log(6))], color="area", width=3.4, dash="7 5")   # the bc facet: dashed, as the bottom cut
    ax.vline(seam, "dim", 1.4, dash="3 4")
    ax.text(seam, math.log(8.6), three.t("接缝", "seam"), dx=6, size=13, color="dim")
    ax.text(math.log(2.1), math.log(4.2) + 0.05, "*ad*", dx=-6, size=14, color="area", anchor="end")
    ax.text(zr, math.log(6), "*bc*", dx=-2, dy=-10, size=14, color="area", anchor="end")
    for d in (2, 3, 4):
        x, y = ax.pt(math.log(d), envelope(d))
        three.dot(x, y, 5, "ink", ring="bg")
