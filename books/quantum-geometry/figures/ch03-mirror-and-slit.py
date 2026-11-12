"""镜子与狭缝：投影 P₊x 正是 x 与它的镜像 Mx 连线的中点（第三章 §3.1）。
The mirror and the slit: the projection P₊x is the midpoint of x and its mirror image Mx (chapter 3, §3.1).

M is the reflection Z = diag(1, −1) of the real plane: it flips x across the horizontal line and back
again (M² = I). P± = ½(I ± M) are computed from it, and the script checks the identities the chapter
derives by hand: P±² = P±, P₊P₋ = 0, P₊ + P₋ = I, M = P₊ − P₋.
"""

import math

SIZE = (440, 300)
ALT = {
    "zh": "一条水平的镜线。琥珀色的箭头 x 斜向右上；虚线箭头 Mx 是它关于镜线的镜像，斜向右下。连接两箭尖的虚线与镜线交于一点，"
          "从原点到这一点的青色粗线就是 P₊x，它正是 x 与 Mx 的中点；从这一点到 x 箭尖的品红线是 P₋x。镜子把箭头翻过去，还能翻回来；"
          "狭缝只留下青色的那一半。",
    "en": "A horizontal mirror line. The amber arrow x points up and to the right; the dashed arrow Mx is its mirror image, pointing "
          "down and to the right. The dotted segment joining the two tips crosses the mirror line at one point; the thick cyan segment "
          "from the origin to that point is P₊x, the midpoint of x and Mx, and the magenta segment from there up to the tip of x is P₋x. "
          "The mirror flips the arrow over and can flip it back; the slit keeps only the cyan half.",
}

M = ((1.0, 0.0), (0.0, -1.0))
I = ((1.0, 0.0), (0.0, 1.0))


def mul(a, b):
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)) for i in range(2))


def lin(s, a, t, b):
    return tuple(tuple(s * a[i][j] + t * b[i][j] for j in range(2)) for i in range(2))


def app(a, v):
    return (a[0][0] * v[0] + a[0][1] * v[1], a[1][0] * v[0] + a[1][1] * v[1])


def close(a, b):
    return all(abs(a[i][j] - b[i][j]) < 1e-12 for i in range(2) for j in range(2))


Pp = lin(0.5, I, 0.5, M)
Pm = lin(0.5, I, -0.5, M)
Z0 = ((0.0, 0.0), (0.0, 0.0))
assert close(mul(M, M), I)
assert close(mul(Pp, Pp), Pp) and close(mul(Pm, Pm), Pm)
assert close(mul(Pp, Pm), Z0) and close(lin(1, Pp, 1, Pm), I) and close(lin(1, Pp, -1, Pm), M)


def draw(fig):
    t = fig.t
    ox, oy, r = 40, 150, 230
    theta = 34
    x = (math.cos(math.radians(theta)), math.sin(math.radians(theta)))
    mx, px, nx = app(M, x), app(Pp, x), app(Pm, x)
    assert abs(px[0] - (x[0] + mx[0]) / 2) < 1e-12 and abs(px[1] - (x[1] + mx[1]) / 2) < 1e-12   # the midpoint

    def P(v):
        return ox + r * v[0], oy - r * v[1]

    tip, mtip, foot = P(x), P(mx), P(px)
    fig.line(16, oy, 428, oy, "dim", 1.4)
    fig.text(428, oy + 24, t("镜线", "mirror line"), size=14, color="dim", anchor="end")
    fig.line(tip[0], tip[1], mtip[0], mtip[1], "faint", 1.3, dash="2 4")
    fig.arrow(ox, oy, mtip[0], mtip[1], "ink", 1.8, dash="6 4")
    fig.line(foot[0], foot[1], tip[0], tip[1], "area", 4.5, cap="round")
    fig.line(ox, oy, foot[0], foot[1], "line", 5.5, cap="round")
    fig.arrow(ox, oy, tip[0], tip[1], "now", 2.6)
    fig.right_angle(foot[0], foot[1], 90, 9)
    fig.dot(foot[0], foot[1], 4.2, "line", ring="bg")
    fig.dot(ox, oy, 3.2, "dim")

    fig.text(tip[0] + 10, tip[1] + 4, "*x*", size=17, color="now")
    fig.text(mtip[0] + 10, mtip[1] + 4, "*Mx*", size=17, color="ink")
    fig.text(foot[0] - 16, oy - 12, "*P*₊*x* = ½(*x* + *Mx*)", size=15, color="line", anchor="end", halo=True)
    fig.text(foot[0] + 14, (foot[1] + tip[1]) / 2 + 4, "*P*₋*x* = ½(*x* − *Mx*)", size=15, color="area")
    fig.text(SIZE[0] - 8, 214, t("镜子：翻过去，还能翻回来", "mirror: flips over, and back"), size=14, color="ink", anchor="end")
    fig.text(SIZE[0] - 8, 238, t("狭缝：只留青色的一半", "slit: keeps the cyan half"), size=14, color="line", anchor="end")
