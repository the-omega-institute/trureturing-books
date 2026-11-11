"""ER=EPR 只在大量纠缠、可用半经典引力描述的体系里提出“纠缠就是桥”；一对贝尔态之间并没有光滑的虫洞。这一对应本身是开放问题。
ER=EPR proposes "entanglement is a bridge" only for heavily entangled systems with a semiclassical
gravity description; a single Bell pair has no smooth wormhole between its halves. The correspondence
itself is open.

Schematic: the top row pairs many boundary qubits L_i with R_i (cyan dashed lines) and sets them
against a side view of an Einstein–Rosen bridge with a red "≟"; the bottom row is one pair, whose
bridge is crossed out.
"""

from _ch20 import throat

SIZE = (540, 320)
ALT = {
    "zh": "上下两行示意图。上一行：左边两列各 6 个点，是左右两套边界系统 L 与 R，每个 L 点与对面的 R 点之间连着一条青色虚线，表示纠缠对；"
          "中间一个红色的“≟”与红色标签“ER = EPR 开放”；右边是一座爱因斯坦—罗森桥的侧视图，两端张开、中间收窄。"
          "下一行：只有一对点，连着一条青色虚线，箭头指向一座小桥，小桥上打了叉，旁边写着：一对贝尔态，没有光滑的桥。",
    "en": "Two schematic rows. Top row: on the left, two columns of 6 dots, the left and right boundary systems L and R, each L dot "
          "joined to the R dot opposite by a cyan dashed line, an entangled pair; in the middle a red “≟” and a red tag "
          "“ER = EPR OPEN”; on the right a side view of an Einstein–Rosen bridge, flaring at both ends and narrow in the "
          "middle. Bottom row: a single pair of dots joined by one cyan dashed line, an arrow to a small bridge that is "
          "crossed out, and the words: one Bell pair, no smooth bridge.",
}


def draw(fig):
    t = fig.t
    xl, xr = 44, 164
    ys = [44 + 22 * i for i in range(6)]
    for y in ys:
        fig.line(xl, y, xr, y, "line", 1.8, dash="5 4")
        fig.dot(xl, y, 5, "ink", ring="bg")
        fig.dot(xr, y, 5, "ink", ring="bg")
    fig.text(xl, ys[-1] + 30, "*L*", size=15, color="dim", anchor="middle")
    fig.text(xr, ys[-1] + 30, "*R*", size=15, color="dim", anchor="middle")
    fig.text((xl + xr) / 2, 26, t("许多纠缠对", "many entangled pairs"), size=13, color="line", anchor="middle")

    fig.text(236, 108, "≟", size=30, color="open", anchor="middle", middle=True, weight=600)
    fig.chip(236, 160, "ER = EPR", "open", anchor="middle")
    fig.text(236, 186, t("开放", "OPEN"), size=13, color="open", anchor="middle")

    throat(fig, 410, 100, 200, 130, 14)
    fig.text(410, 26, t("爱因斯坦—罗森桥", "Einstein–Rosen bridge"), size=13, color="dim", anchor="middle")

    fig.line(20, 222, SIZE[0] - 20, 222, "faint", 1.0)
    yb = 270
    fig.line(xl, yb, xr, yb, "line", 1.8, dash="5 4")
    fig.dot(xl, yb, 5, "ink", ring="bg")
    fig.dot(xr, yb, 5, "ink", ring="bg")
    fig.text((xl + xr) / 2, yb - 14, t("一对贝尔态", "one Bell pair"), size=13, color="line", anchor="middle")
    fig.arrow(198, yb, 262, yb, "dim", 1.6, head=8)
    throat(fig, 316, yb, 80, 52, 6, color="dim", rings=3)
    fig.cross(316, yb, 13, "ink", 2.6)
    fig.text(370, yb + 5, t("没有光滑的桥", "no smooth bridge"), size=14, color="dim")
