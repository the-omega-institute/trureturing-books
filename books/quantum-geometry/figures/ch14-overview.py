"""第十四章地图：克隆把内积平方、正交的综合征房间、借第三方向抬过去的交换回路。
Chapter 14 at a glance: cloning squares the overlap, the orthogonal syndrome rooms, and the exchange loop
lifted over a particle through the third direction.

Panel I plots y = z and y = z² on the real overlap slice 0 ≤ z ≤ 1; they meet only at 0 and 1, and at
z = 1/√2 the gap is (√2 − 1)/2 (asserted, as in the chapter's worked example).
Panel II draws the four rooms S_j = E_j V of the three-qubit code with the basis states each one holds
(computed, and checked pairwise orthogonal); X₂ carries the code state into the (−, −) room and the
decoder brings it back.
Panel III is a sketch: in the plane a loop around a particle cannot be shrunk, through e₃ it can be
lifted over (a literature result, not formalized in this book).
"""

import math

from _ch14 import ERRORS, NAMES, flip, orthogonal, syndrome

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：横轴是重叠 z 从 0 到 1，青色的对角线 y = z 是保内积要求的输出，暗色的抛物线 y = z² 是克隆给出的输出，"
          "两者只在 0 与 1 相交，中间夹着一片品红的缺口，z = 1/√2 处标出一段竖直的缺口。"
          "第二栏：四间方形的房间排成两行两列，标着综合征 (+,+)、(−,+)、(−,−)、(+,−) 与各自的两个基态；青色的码态住在 (+,+) 那间，"
          "一条品红的箭头 X₂ 把它搬进 (−,−) 那间，一条琥珀色的箭头把它翻回。"
          "第三栏：一块斜放的平面上有一颗粒子，平面里一圈暗色虚线绕着它；一支紫色的箭头 e₃ 竖直朝上，一条品红的弧从平面上抬起、越过粒子。",
    "en": "Three panels. Panel I: the overlap z runs from 0 to 1; the cyan diagonal y = z is what an isometry must output, the "
          "dim parabola y = z² is what cloning outputs; they meet only at 0 and 1 with a magenta gap between them, marked by a "
          "vertical segment at z = 1/√2. Panel II: four square rooms in two rows, labelled by the syndromes (+,+), (−,+), (−,−), "
          "(+,−) and the two basis states each holds; the cyan code state lives in (+,+), a magenta arrow X₂ moves it into "
          "(−,−) and an amber arrow brings it back. Panel III: a tilted plane with one particle, circled by a dim dashed loop "
          "in the plane; a violet arrow e₃ points straight up, and a magenta arc lifts off the plane and passes over the particle.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: z versus z²
    title(one, "I　克隆把内积平方", "I  cloning squares overlap")
    ax = one.axes(40, 46, 170, 176, (0, 1), (0, 1))
    ax.xaxis(at=0, ticks=[0, 1 / math.sqrt(2), 1], labels=["0", "1/√2", "1"])
    ax.yaxis(at=0, ticks=[0, 0.5, 1], labels=["0", "½", "1"])
    gap = [(k / 60, k / 60) for k in range(61)] + [(1 - k / 60, (1 - k / 60) ** 2) for k in range(61)]
    ax.cv.polygon([ax.pt(x, y) for x, y in gap], "area", fill_opacity=0.22)
    ax.plot(lambda z: z * z, 0, 1, color="ink", width=2.0)
    ax.plot(lambda z: z, 0, 1, color="line", width=2.6)
    z = 1 / math.sqrt(2)
    assert abs((z - z * z) - (math.sqrt(2) - 1) / 2) < 1e-12 and abs(z * z - 0.5) < 1e-12
    x0, y0 = ax.pt(z, z)
    _, y1 = ax.pt(z, z * z)
    one.line(x0, y0, x0, y1, "area", 3.4, cap="round")
    for v in (0, 1):
        assert v == v * v
        ax.points([(v, v)], color="ink", r=4.4, ring="bg")
    ax.text(0.34, 0.34, "*y* = *z*", dx=-8, dy=-10, size=14, color="line", anchor="end")
    ax.text(0.62, 0.62 ** 2, "*y* = *z*^{2}", dx=10, dy=14, size=14, color="ink")

    # ---- II: orthogonal syndrome rooms
    title(two, "II　正交的综合征房间", "II  orthogonal syndrome rooms")
    assert orthogonal()
    w, h = 104, 64
    spots = {0: (8, 46), 1: (124, 46), 3: (8, 178), 2: (124, 178)}
    centre = {}
    for j, err in enumerate(ERRORS):
        x, y = spots[j]
        kets = [flip(b, err) for b in ((0, 0, 0), (1, 1, 1))]
        s = syndrome(kets[0])
        assert syndrome(kets[1]) == s
        code = j == 0
        two.rect(x, y, w, h, color="line" if code else "edge", fill="line" if code else "panel",
                 fill_opacity=0.16 if code else None, width=1.6 if code else 1.2, rx=4)
        lab = "(" + ",".join("+" if v > 0 else "−" for v in s) + ")"
        two.text(x + 8, y + 20, lab, size=13, color="dim")
        two.text(x + w / 2, y + 46, "  ".join("|" + "".join(map(str, k)) + "⟩" for k in kets), size=13,
                 color="line" if code else "dim", anchor="middle")
        centre[j] = (x + w / 2, y + h / 2)
    two.arrow(92, 116, 142, 180, "area", 2.2)
    two.text(108, 162, NAMES[2], size=14, color="area", weight=600, anchor="end")
    two.arrow(162, 174, 112, 110, "now", 2.2)
    two.text(150, 132, two.t("翻回", "undo"), size=13, color="now")

    # ---- III: lifting the exchange loop through e₃
    title(three, "III　第三方向抬过去", "III  lifted through e₃")
    plane = [(14, 212), (164, 212), (222, 160), (72, 160)]
    three.polygon(plane, "panel", color="edge", width=1.2, fill_opacity=0.9)
    px, py = 118, 186
    loop = [(px + 50 * math.cos(math.radians(a)), py - 15 * math.sin(math.radians(a))) for a in range(200, 200 + 330, 6)]
    three.curve_arrow(loop, "dim", 1.6, dash="5 4", head=8)
    arch = [(px - 50 + 100 * k / 40, py - 108 * math.sin(math.pi * k / 40)) for k in range(41)]
    three.curve_arrow(arch, "area", 2.4)
    three.dot(px, py, 6.0, "ink", ring="bg")
    three.arrow(34, 202, 34, 96, "axis", 2.2)
    three.text(44, 104, "*e*_{3}", size=15, color="axis")
    three.text(px, 242, three.t("平面里：绕不开", "in the plane: stuck"), size=13, color="dim", anchor="middle")
    three.text(px + 34, py - 96, three.t("抬过去", "lift over"), size=13, color="area")
