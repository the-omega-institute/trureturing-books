"""两面镜子换个次序，同一支箭头落到正相反的两端：ZX = −XZ（第二十五章 §外尔对）。
Swap the order of the two mirrors and the same arrow lands at opposite ends: ZX = −XZ (chapter 25, the Weyl
pair).

Drawn in the real plane of state vectors: qubitX is the reflection in the diagonal, qubitZ the reflection in
the ψ₀ axis. Two reflections make a quarter turn, one way round or the other. The script asserts the matrix
identity of thm-qubit-weyl-star and that the two images are negatives of each other.
"""

from _ch25 import weyl_plane

SIZE = (460, 330)
ALT = {
    "zh": "态矢所在的实平面，单位圆上有两面青色虚线的镜子：水平的是 Z 的镜子，斜 45° 的是 X 的镜子。琥珀色的箭头 u 指向 25°。"
          "虚线的两跳是先照 X、再照 Z：u 先跳到 65°，再竖直跳到 −65°，停在 ZXu。实线的两跳是先照 Z、再照 X：u 先竖直跳到 −25°，"
          "再跳到 115°，停在 XZu。两支墨色箭头 ZXu 与 XZu 穿过圆心连成一条直径，指向正相反的两端。",
    "en": "The real plane of state vectors, with two cyan dashed mirrors on the unit circle: the horizontal mirror of Z and the "
          "mirror of X at 45°. The amber arrow u points at 25°. The dashed jumps reflect in X first, then in Z: u jumps to 65°, "
          "then straight down to −65°, ending at ZXu. The solid jumps reflect in Z first, then in X: u jumps straight down to "
          "−25°, then across to 115°, ending at XZu. The two dark arrows ZXu and XZu make one diameter through the centre and "
          "point at opposite ends.",
}


def draw(fig):
    t = fig.t
    pt, u, xu, zu, zx, xz = weyl_plane(fig, 200, 168, 126)
    x, y = pt(u)
    fig.text(x + 8, y + 4, "*u*", size=15, color="now", weight=600, halo=True)
    x, y = pt(zx)
    fig.text(x + 8, y + 12, "*ZXu*", size=15, color="ink", weight=600, halo=True)
    x, y = pt(xz)
    fig.text(x - 8, y - 6, "*XZu*", size=15, color="ink", weight=600, anchor="end", halo=True)
    x, y = pt(xu)
    fig.text(x + 8, y - 2, "*Xu*", size=13, color="dim", halo=True)
    x, y = pt(zu)
    fig.text(x + 8, y + 12, "*Zu*", size=13, color="dim", halo=True)

    for i, (dash, label) in enumerate(((("4 3"), t("先 *X* 再 *Z*", "*X* first, then *Z*")),
                                       (None, t("先 *Z* 再 *X*", "*Z* first, then *X*")))):
        yy = 262 + 22 * i
        fig.line(318, yy - 4, 340, yy - 4, "dim", 1.4, dash=dash)
        fig.text(348, yy, label, size=13, color="dim")
    fig.text(318, 318, "*ZXu* = −*XZu*", size=14, color="ink", weight=600)
