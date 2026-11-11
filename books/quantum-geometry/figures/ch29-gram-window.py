"""格拉姆窗口：c_AB 固定时，两条余弦加法轨线围出 c_AC 能取的全部值，c_BC 一定，窗口就是一段竖线。
The Gram window: with c_AB fixed, the two cosine-addition tracks enclose every value c_AC can take;
once c_BC is fixed too, the window is one vertical segment.

This is the slice c_AB = cos 60° of the Gram elliptope 1 − x² − y² − z² + 2xyz ≥ 0, drawn in the
(c_BC, c_AC) plane. The rim, where det G = 0 (the three vectors coplanar), is traced as
(cos θ₂, cos(θ₁ ∓ θ₂)); the violet inside is det G > 0. The amber segment is the window at
θ₂ = 45°, from cos 105° to cos 15°, the numbers of the lab card `edge`. All asserted in _ch29.
"""

import math

from _ch29 import gram_window

SIZE = (460, 340)
ALT = {
    "zh": "一张方形坐标图，横轴 c_BC、纵轴 c_AC，都从 −1 到 1，标题 c_AB = cos 60°。一块倾斜的椭圆涂成紫色，表示 det G > 0；"
          "它的边由两条曲线拼成，上面一条是 cos(θ₁ − θ₂)，下面一条是 cos(θ₁ + θ₂)，边上 det G = 0。"
          "在 c_BC = cos 45° 处有一段琥珀色竖线，从下边 cos 105° ≈ −0.26 到上边 cos 15° ≈ 0.97，这就是 c_AC 的窗口。",
    "en": "A square plot with c_BC across and c_AC up, both from −1 to 1, titled c_AB = cos 60°. A tilted ellipse is "
          "shaded violet, meaning det G > 0; its rim is made of two curves, cos(θ₁ − θ₂) on top and cos(θ₁ + θ₂) below, "
          "and on the rim det G = 0. At c_BC = cos 45° an amber vertical segment runs from the lower rim at "
          "cos 105° ≈ −0.26 to the upper rim at cos 15° ≈ 0.97: the window for c_AC.",
}


def draw(fig):
    t = fig.t
    ax, top, bot = gram_window(fig, 120, 38, 250, 250)
    assert abs(math.cos(math.radians(15)) - 0.9659) < 1e-4 and abs(math.cos(math.radians(105)) + 0.2588) < 1e-4
    fig.text(ax.X(1) + 4, ax.Y(-1) + 32, "*c*_{BC}", size=15, color="dim", anchor="end")
    fig.text(ax.X(-1) - 34, ax.Y(1) - 14, "*c*_{AC}", size=15, color="dim")
    fig.text(ax.X(0), 22, "*c*_{AB} = cos 60°", size=14, color="ink", anchor="middle")
    # rim labels
    fig.text(ax.X(-0.95), ax.Y(0.80), "cos(θ₁ − θ₂)", size=13, color="ink", halo=True)
    fig.text(ax.X(0.62), ax.Y(-0.35) + 34, "cos(θ₁ + θ₂)", size=13, color="ink", halo=True)
    fig.text(ax.X(-0.05), ax.Y(0.05), "det *G* > 0", size=14, color="violet", anchor="middle", middle=True, halo=True,
             weight=600)
    # the window
    fig.text(top[0] + 10, top[1] - 4, "cos 15°", size=13, color="now", halo=True)
    fig.text(bot[0] + 10, bot[1] + 12, "cos 105°", size=13, color="now", halo=True)
    fig.text(top[0] - 10, (top[1] + bot[1]) / 2 + 5, t("窗口", "window"), size=14, color="now", halo=True, weight=600,
             anchor="end")
    fig.text(ax.X(1) + 16, ax.Y(0.0), t("边上", "on the rim"), size=13, color="dim")
    fig.text(ax.X(1) + 16, ax.Y(0.0) + 18, "det *G* = 0", size=13, color="dim")
