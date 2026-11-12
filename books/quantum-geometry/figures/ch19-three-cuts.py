"""画出源码采用的三项割容量上界：上面的 ad、下面的 bc、斜穿三条桥的 3ac；QMinCut 取三者中最小的。
The figure shows the three cut-capacity bounds used by the source: ad across the top, bc across
the bottom, and 3ac slanting through the three bridges; QMinCut is their minimum.
The fourth cut, 3bd, is redundant when a ≤ b and c ≤ d, as in this worked example.

Drawn for the chapter's worked example (a, b, c, d) = (2, 3, 2, 3): the capacities are 6, 6 and 12
(asserted against QMinCut), so the two outer cuts tie and the inner one is not the bottleneck.
"""

from _ch19 import bridge, cut_lines, qmincut

SIZE = (500, 330)
ALT = {
    "zh": "宽度三桥图：左边的张量 M 与右边的张量 N 之间并排连着三条桥；M 向上伸出腿 a = 2、向下伸出腿 b = 3，N 向上伸出腿 d = 3、向下伸出腿 c = 2。"
          "三道虚线画出源码采用的三项割容量上界：上面一道横切两条上腿，容量 ad = 6；下面一道横切两条下腿，容量 bc = 6；一道斜线切过腿 a、三条桥与腿 c，容量 3ac = 12。"
          "两道外割画成品红，是最小割，容量 6；斜着的内割是灰色。",
    "en": "The width-three bridge graph: three bridges run side by side between tensor M on the left and tensor N on the "
          "right; M has a leg a = 2 going up and a leg b = 3 going down, N has d = 3 up and c = 2 down. Three dashed lines "
          "show the three cut-capacity bounds used by the source: the top one crosses both upper legs, capacity ad = 6; the bottom one crosses both "
          "lower legs, capacity bc = 6; a slanting one crosses leg a, the three bridges and leg c, capacity 3ac = 12. The "
          "two outer cuts are magenta and are the min cut, capacity 6; the slanting inner cut is grey.",
}

DIMS = {"a": 2, "b": 3, "c": 2, "d": 3}


def draw(fig):
    t = fig.t
    a, b, c, d = (DIMS[k] for k in "abcd")
    caps = {"top": a * d, "bot": b * c, "inner": 3 * a * c}
    assert (caps["top"], caps["bot"], caps["inner"]) == (6, 6, 12)
    low = qmincut(a, b, c, d)
    assert low == 6

    g = bridge(fig, 200, 165, dims=DIMS)
    top, bot, inner = cut_lines(g, pad=40)
    for key, ((x1, y1), (x2, y2)) in (("top", top), ("bot", bot), ("inner", inner)):
        mincut = caps[key] == low
        fig.line(x1, y1, x2, y2, "area" if mincut else "dim", 2.6 if mincut else 1.8, dash="7 5")
    fig.text(top[1][0] + 10, top[1][1] + 5, "*ad* = 6", size=15, color="area", weight=600)
    fig.text(bot[1][0] + 10, bot[1][1] + 5, "*bc* = 6", size=15, color="area", weight=600)
    fig.text(inner[0][0] - 8, inner[0][1] - 4, "3*ac* = 12", size=15, color="dim", anchor="end")
    fig.text(g["mx"] + 52, g["cy"] + 40, "*r* = 0, 1, 2", size=14, color="dim", anchor="middle", halo=True)

    fig.text(SIZE[0] - 16, 300, t("最小割 = min(12, 6, 6) = 6", "min cut = min(12, 6, 6) = 6"), size=14,
             color="area", anchor="end")
