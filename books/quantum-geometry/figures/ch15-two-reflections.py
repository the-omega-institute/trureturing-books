"""两次反射合成一次转动：先对 B 轴反射，再对 U 所在的线反射，箭头净转过 2θ。
Two reflections make one turn: reflect in the B axis, then in the line of U; the arrow turns by 2θ.

Drawn for N = 8 (θ = arcsin(1/√8) ≈ 20.70°). The first reflection I − 2P flips the W component
(angle θ → −θ); the second, 2UU* − I, reflects in the line of U (angle −θ → 2θ − (−θ) = 3θ).
"""

import math

from _ch15 import grover_theta, plane

SIZE = (500, 330)
ALT = {
    "zh": "Grover 平面：成功方向 W 朝上，失败方向 B 朝右，四分之一圆上一支墨色箭头 U 与 B 成 θ。第一面镜子是 B 轴（I − 2P）："
          "U 的尖端沿竖直的虚线翻到 B 轴下方，成为灰色的虚线箭头。第二面镜子是 U 所在的线（2UU∗ − I）："
          "那个尖端再沿垂直于这条线的虚线翻上去，成为琥珀色的箭头 QU，与 B 成 3θ。紫色的弧标出从 U 到 QU 净转过的 2θ。",
    "en": "The Grover plane: the success direction W points up and the failure direction B to the right; on a quarter circle "
          "an ink arrow U makes θ with B. The first mirror is the B axis (I − 2P): the tip of U flips straight down across it "
          "to a grey dashed arrow below. The second mirror is the line of U (2UU∗ − I): that tip flips back across it, along a "
          "dashed segment perpendicular to the line, to the amber arrow QU at 3θ from B. A violet arc marks the net turn 2θ "
          "from U to QU.",
}


def draw(fig):
    t = fig.t
    N = 8
    th = math.degrees(grover_theta(N))
    assert abs(th - 20.7048) < 1e-4
    cx, cy, R = 60, 245, 185
    P = plane(fig, cx, cy, R, below=True)

    # the two mirrors
    fig.text(cx + R * 1.0 + 12, cy + 24, t("镜 1：*I* − 2*P*", "mirror 1: *I* − 2*P*"), size=14, color="dim")
    m2 = P(th, 1.45)
    fig.line(*P(th, 1.0), *m2, "dim", 1.6, dash="7 5")
    fig.text(m2[0] + 6, m2[1] + 2, t("镜 2：2*UU*^{∗} − *I*", "mirror 2: 2*UU*^{∗} − *I*"), size=14, color="dim", middle=True)

    u, u1, u3 = P(th), P(-th), P(3 * th)
    # reflection 1: straight down across the B axis
    fig.line(u[0], u[1], u1[0], u1[1], "dim", 1.3, dash="2 3")
    fig.right_angle(u[0], cy, 90, 8)
    # reflection 2: across the line of U; the foot is the projection of the tip onto that line
    d = (math.cos(math.radians(th)), -math.sin(math.radians(th)))
    s = (u1[0] - cx) * d[0] + (u1[1] - cy) * d[1]
    foot = (cx + s * d[0], cy + s * d[1])
    mid = ((u1[0] + u3[0]) / 2, (u1[1] + u3[1]) / 2)
    assert math.hypot(foot[0] - mid[0], foot[1] - mid[1]) < 1e-9
    fig.line(u1[0], u1[1], u3[0], u3[1], "dim", 1.3, dash="2 3")
    fig.right_angle(foot[0], foot[1], th + 90, 8)

    fig.arrow(cx, cy, u1[0], u1[1], "dim", 1.8, dash="5 4")
    fig.arrow(cx, cy, u[0], u[1], "ink", 2.4)
    fig.arrow(cx, cy, u3[0], u3[1], "now", 3.0)

    fig.arc(cx, cy, R * 0.42, th, 3 * th, "axis", 2.6)
    tip = P(3 * th, 0.42)
    fig.arrow_head(tip[0], tip[1], 3 * th + 90, "axis", head=10)
    lx, ly = P(2 * th, 0.53)
    fig.text(lx, ly, "2*θ*", size=15, color="axis", weight=600, anchor="middle", middle=True, halo=True)
    fig.angle(cx, cy, 44, 0, th, "*θ*")

    fig.text(u[0] + 8, u[1] - 8, "*U*", size=15)
    fig.text(u1[0] + 8, u1[1] + 4, t("翻一次", "after 1"), size=13, color="dim")
    fig.text(u3[0] + 10, u3[1] - 2, t("*QU*：翻两次", "*QU*: after 2"), size=14, color="now")
