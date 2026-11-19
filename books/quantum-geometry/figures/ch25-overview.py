"""第二十五章地图：格拉姆椭圆切片、联合相干逆转与余弦自指。
Chapter 25 at a glance: a Gram elliptope slice, joint coherent reversal and cosine self-reference.

Panel I fixes c_AB = cos 60°. Panel II follows an off-diagonal amplitude through
two phase records and their joint undo. Panel III shows the Dottie iteration
as the chapter's geometric illustration of a self-consistent loop.
"""

import math

from _ch24 import THETA, cobweb
from _ch29 import gram_window
from _ch37 import FULL, GAMMA, RHO01, WRITTEN
from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏：紫色格拉姆椭圆内 det G ≥ 0，琥珀色竖线给出当前重叠窗口。第二栏：品红外弧写入两份相位记录，青色内弧联合逆转，虚线箭头表示仅取约化态时可能丧失相干。第三栏：余弦蛛网在对角线两侧交替，收敛到固定点 θ∗。",
    "en": "Panel I shows a violet Gram elliptope slice with det G ≥ 0 and an amber overlap window. Panel II follows magenta record writes and cyan joint reversal, with a dashed arrow for possible coherence loss in the reduced state. Panel III shows the cosine cobweb alternating about the fixed point θ∗.",
}


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)

    title(one, "I　无时格拉姆空间", "I  Timeless Gram space")
    ax, _, _ = gram_window(one, 34, 60, 175, 165, labels=False, ticks=False)
    ax.cv.rect(ax.x, ax.y, ax.w, ax.h, color="faint")
    label(one, 151, "det G ≥ 0", "det G ≥ 0", color="violet", weight=700)
    one.text(35, 47, one.t("c_{AC}", "c_{AC}"), size=13, color="dim")
    one.text(209, 242, one.t("c_{BC}", "c_{BC}"), size=13, color="dim", anchor="end")
    label(one, 263, "c_{AB} = cos 60°", "c_{AB} = cos 60°", color="dim")

    title(two, "II　双向相干握手", "II  Two-way handshake")
    cx, cy, radius = 118, 118, 73
    assert WRITTEN == RHO01 * GAMMA**2 == -RHO01
    assert FULL == WRITTEN * GAMMA.conjugate()**2 == RHO01
    two.arc(cx, cy, radius, 180, 360, "faint", 1.2, dash="3 4")
    for start, end in ((5, 85), (95, 175)):
        for r, a, b, role in ((radius, start, end, "area"), (radius - 14, end, start, "line")):
            points = [(cx + r * math.cos(math.radians(a + (b - a) * k / 24)),
                       cy + r * math.sin(math.radians(a + (b - a) * k / 24))) for k in range(25)]
            two.curve_arrow(points, role, 2.2, head=8)
    for side, word, role in ((-1, "−½", "area"), (1, "+½", "line")):
        x = cx + side * radius
        two.dot(x, cy, 4, role, ring="bg")
        two.text(x, cy - 12, two.t(word, word), color=role, size=14, anchor="middle")
    two.arrow(181, cy, 127, cy, "dim", 1.3, dash="3 4", head=7)
    two.dot(cx, cy, 3, "dim")
    label(two, 91, "迹掉正交记录 → 0", "Trace orthogonal records → 0", size=13, color="dim")
    label(two, 217, "写入两份 · 联合逆转", "Write twice · undo jointly")
    two.chip(cx, 243, two.t("LEAN ✓ 联合逆转", "LEAN ✓ joint reversal"), "lean", anchor="middle")

    title(three, "III　余弦自指回路", "III  Dottie fixed-point loop")
    ax = three.axes(30, 48, 176, 176, (0.45, 0.95), (0.45, 0.95))
    ax.frame()
    ax.plot(lambda x: x, color="dim", width=1.4)
    ax.plot(math.cos, color="line", width=2.2)
    values = cobweb(ax, math.cos, 0.9, 12, color="area", start_on_axis=False)
    assert abs(math.cos(THETA) - THETA) < 1e-12
    assert abs(values[-1] - THETA) < abs(values[0] - THETA)
    ax.points([(THETA, THETA)], "ink", r=4, ring="bg")
    label(three, 249, "cos θ∗ = θ∗ ≈ 0.739", "cos θ∗ = θ∗ ≈ 0.739")
    label(three, 269, "无时约束下的自洽", "Self-consistency under constraints", size=13, color="dim")
