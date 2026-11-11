"""第二十章地图：熵封顶而门数还在长（玩具示意）、桥内切片随时间拉长（CV，开放）、P 与 NP 之间的边界（开放）。
Chapter 20 at a glance: the entropy caps while the gate count keeps growing (a toy sketch), the slice
through the bridge stretches with time (CV, open), and the border between P and NP (open).

Panel I plots the chapter's toy functions C(t) = 2t and S(t) = min(2t, 4) at t = 0, 1, 2, 3 (asserted
against the worked example). Panel II reuses the schematic Penrose diagram of ch20-cv-slices.
Panel III draws P inside NP with the question mark on the ring between them.
"""

from _ch20 import penrose

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：示意坐标图，横轴 t 从 0 到 3；品红的直线 C(t) = 2t 一直上升（与青线重合的一段画成虚线），青色的折线 S(t) = min(2t, 4) 在 t = 2 撞上灰色虚线 4 后横着走；四个点 t = 0、1、2、3 标在两条线上。"
          "第二栏：双边黑洞的示意彭罗斯图，紫色的切片两端钉在左右边界上，时间越往后越长；下方一枚红色标签：CV 开放。"
          "第三栏：一个大椭圆 NP 里套着一个青色的小椭圆 P，两者之间的环带上写着红色的问号；下方一枚红色标签：P ≠ NP 开放。",
    "en": "Three panels. Panel I: a schematic plot, t from 0 to 3 across; the magenta line C(t) = 2t keeps rising (dashed where it runs along the cyan line), while the cyan "
          "line S(t) = min(2t, 4) runs into the grey dashed level 4 at t = 2 and goes flat; the points t = 0, 1, 2, 3 are marked "
          "on both. Panel II: a schematic Penrose diagram of a two-sided black hole; violet slices pinned to the left and right "
          "boundaries grow longer as time goes on; a red tag beneath: CV open. Panel III: a large ellipse NP holding a small "
          "cyan ellipse P, with a red question mark on the ring between them; a red tag beneath: P ≠ NP open.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)

    # ---- I: the toy curves of the chapter's worked example
    title(one, "I　熵封顶，门数还在长", "I  entropy caps, gates grow")
    C = lambda t: 2 * t
    S = lambda t: min(2 * t, 4)
    assert [(C(t), S(t)) for t in range(4)] == [(0, 0), (2, 2), (4, 4), (6, 4)]
    ax = one.axes(40, 52, 176, 176, (0, 3.3), (0, 7))
    ax.xaxis(ticks=[0, 1, 2, 3], label="*t*", size=13)
    ax.yaxis(ticks=[0, 4], size=13)
    ax.hline(4, "dim", 1.3, dash="4 4")
    ax.plot(S, 0, 3.3, color="line", width=3.4)
    ax.plot(C, 0, 2, color="area", width=2.2, dash="6 5")      # where C and S coincide, C is drawn dashed on top
    ax.plot(C, 2, 3.3, color="area", width=3.0)
    ax.points([(t, C(t)) for t in range(4)], color="area", r=4)
    ax.points([(t, S(t)) for t in range(4)], color="line", r=4)
    ax.text(3, 6, "*C*", dx=-12, dy=-4, size=15, color="area", anchor="end", weight=600)
    ax.text(3.3, 4, "*S*", dx=-2, dy=-8, size=15, color="line", anchor="end", weight=600)
    one.text(one.width / 2, 280, one.t("玩具示意", "toy sketch"), size=13, color="dim", anchor="middle")

    # ---- II: the slice through the bridge stretches (CV, open)
    title(two, "II　桥内切片越拉越长", "II  the slice stretches")
    penrose(two, 118, 146, 168)
    two.chip(118, 280, two.t("CV：开放", "CV: OPEN"), "open", anchor="middle")

    # ---- III: P inside NP, the border open
    title(three, "III　P 与 NP 之间", "III  between P and NP")
    cx, cy = 118, 146
    three.ellipse(cx, cy, 100, 86, color="ink", fill="panel", width=2.0)
    three.ellipse(cx - 26, cy + 14, 52, 46, color="line", fill="line", fill_opacity=0.22, width=2.2)
    three.text(cx - 26, cy + 14, "P", size=22, color="line", anchor="middle", middle=True, weight=600)
    three.text(cx + 8, cy - 58, "NP", size=20, color="ink", anchor="middle", middle=True, weight=600)
    three.text(cx + 58, cy + 10, "?", size=30, color="open", anchor="middle", middle=True, weight=700)
    three.chip(118, 280, three.t("P ≠ NP：开放", "P ≠ NP: OPEN"), "open", anchor="middle")
