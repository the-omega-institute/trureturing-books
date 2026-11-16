"""两扇平移后的接受窗相交，交集 W_AB 里的格点同时出现在两位观察者的世界里。
Two translated acceptance windows intersect; the lattice points whose internal projection falls in
the intersection W_AB appear in both observers' worlds.

Schematic (MODEL): the three-dimensional window W is drawn as a regular decagon, a two-dimensional
stand-in. The translates W + u_A and W + u_B have centres 0.7 R apart; the intersection is computed by
convex clipping (cyan), the parts seen by one observer only are magenta. The area ratio
Vol(W_AB)/Vol(W) is computed and printed.
"""

from _ch33 import windows

SIZE = (440, 300)
ALT = {
    "zh": "两个同样大小、彼此错开一段距离的正十边形，左边是接受窗 W + u_A，右边是 W + u_B，中心各有一个点。"
          "两窗重叠的部分涂成青色，标着 W_AB，是双方共同看见的部分；各自多出的部分涂成品红，只有一方看见。"
          "两中心之间下方有一支灰色箭头 u_B − u_A；右下角写着交集面积约占一扇窗的一半。",
    "en": "Two regular decagons of the same size, offset from each other: the window W + u_A on the left, W + u_B on "
          "the right, each with a dot at its centre. Their overlap is cyan and labelled W_AB: what both observers see. "
          "The parts that belong to one window only are magenta: seen by one observer alone. Below the centres a grey "
          "arrow u_B − u_A; at the bottom right, the overlap's area is about half a window.",
}

D = 0.7


def draw(fig):
    t = fig.t
    cx, cy, R = 220, 124, 90
    ca, cb, frac = windows(fig, cx, cy - 0, R, D, labels=False)
    assert 0.45 < frac < 0.6
    fig.text(cx, cy - 34, "*W*_{*AB*}", size=16, color="line", anchor="middle", middle=True, weight=600, halo=True)
    fig.text(ca[0] - R - 8, cy, "*W* + *u*_{*A*}", size=14, color="ink", anchor="end", middle=True)
    fig.text(cb[0] + R + 8, cy, "*W* + *u*_{*B*}", size=14, color="ink", middle=True)

    ya = cy + R + 20
    fig.line(ca[0], cy + 6, ca[0], ya + 4, "faint", 1.1, dash="2 3")
    fig.line(cb[0], cy + 6, cb[0], ya + 4, "faint", 1.1, dash="2 3")
    fig.arrow(ca[0], ya, cb[0], ya, "dim", 1.6, head=8)
    fig.text(cx, ya + 22, "*u*_{*B*} − *u*_{*A*}", size=13, color="dim", anchor="middle")

    fig.rect(14, 258, 14, 14, color="line", fill="line", fill_opacity=0.30)
    fig.text(34, 270, t("双方都看见", "seen by both"), size=13, color="line")
    fig.rect(14, 278 - 2, 14, 14, color="magenta", fill="magenta", fill_opacity=0.14)
    fig.text(34, 288, t("只有一方看见", "seen by one"), size=13, color="magenta")
    fig.text(426, 284, f"Vol(*W*_{{*AB*}}) ≈ {frac:.2f} Vol(*W*)", size=13, color="line", anchor="end")
