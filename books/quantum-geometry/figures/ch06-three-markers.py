"""标记的两支箭头决定屏上有没有条纹：不标记、标记路径、擦除标记（第六章 §6.3）。
The two marker arrows decide whether the screen shows fringes: no marker, a path marker, an erased marker
(chapter 6, §6.3).

Each row is one set-up. On the left, the marker states r_L (ink) and r_R (amber) at angle α; on the right, what
lands on the screen, I(x) = g(x)(1 + V cos kx)/2 with V = |⟨r_L, r_R⟩| = cos α. The envelope g is a schematic Gaussian.
In the third row the marker is orthogonal (α = 90°) but is read along the diagonals r_L ± r_R: the two sorted rows
g(1 ± cos kx)/4 are fringes and anti-fringes, and the script asserts that together they are the bump of row two.
"""

import math

from _ch06 import along

SIZE = (548, 372)
ALT = {
    "zh": "三行，每行左边是一个小圆，里面画标记的两支箭头：灰色的 r_L 横放，琥珀色的 r_R 与它夹角 α；右边是屏上落点的分布。"
          "第一行“不标记”：α = 0，两支箭头重合，屏上是对比度满格的青色条纹。第二行“标记路径”：α = 90°，两支箭头垂直，品红的竖线是可区分度 D = 1，"
          "屏上只剩一个没有条纹的鼓包。第三行“擦除标记”：箭头仍然垂直，但沿紫色的斜线读标记，按读数把落点分成两行，"
          "一行是青色的条纹，另一行是错开半格的虚线反条纹，两行加起来就是第二行的鼓包。包络是示意。",
    "en": "Three rows. On the left of each, a small circle holds the two marker arrows: grey r_L lying flat and amber r_R at angle "
          "α to it; on the right, the distribution of hits on the screen. Row one, “no marker”: α = 0, the arrows coincide and "
          "the screen shows cyan fringes at full contrast. Row two, “path marker”: α = 90°, the arrows are perpendicular, the "
          "magenta vertical is the distinguishability D = 1, and the screen shows a single bump without fringes. Row three, "
          "“erased marker”: the arrows are still perpendicular but the marker is read along the violet diagonal; sorting the "
          "hits by that reading gives two rows, cyan fringes and dashed anti-fringes shifted by half a fringe, which add up to "
          "the bump of row two. The envelope is schematic.",
}

K = 2 * math.pi / 0.46        # fringe wave number on the screen coordinate x ∈ [−1.5, 1.5]
W = 0.62                      # envelope width


def env(x):
    return math.exp(-x * x / (2 * W * W))


def screen(x, v):
    return env(x) * (1 + v * math.cos(K * x)) / 2


ROWS = [
    (0, ("不标记", "no marker")),
    (90, ("标记路径", "path marker")),
    (90, ("擦除标记", "erased marker")),
]


def draw(fig):
    t = fig.t
    xs = [-1.5 + 3 * i / 360 for i in range(361)]
    for x in xs:   # erasure: the two sorted rows add up to the unfringed bump
        plus, minus = env(x) * (1 + math.cos(K * x)) / 4, env(x) * (1 - math.cos(K * x)) / 4
        assert abs(plus + minus - screen(x, math.cos(math.radians(90)))) < 1e-12
    for i, (alpha, name) in enumerate(ROWS):
        top = 8 + i * 122
        cy = top + 60
        V = math.cos(math.radians(alpha))
        assert abs(V - (1 if alpha == 0 else 0)) < 1e-12
        fig.text(8, cy - 8, t(*name), size=14, weight=600)
        fig.text(8, cy + 14, f"α = {alpha}°", size=13, color="dim")

        # marker circle
        mx, my, r = 160, cy, 42
        fig.circle(mx, my, r, color="faint", width=1.1, dash="3 4")
        if i == 2:          # read the marker along the two diagonals r_L ± r_R
            p, q = along(mx, my, 45, r + 8), along(mx, my, 225, r * 0.3)
            fig.line(*q, *p, "axis", 1.8, dash="5 4")
            p, q = along(mx, my, -45, r + 8), along(mx, my, 135, r * 0.3)
            fig.line(*q, *p, "axis", 1.8, dash="5 4")
        tl = along(mx, my, 0, r)
        tr = along(mx, my, alpha, r)
        if alpha == 90:
            fig.line(mx, my, *tr, "area", 6, cap="round", opacity=0.8)
        fig.arrow(mx, my, *tl, "dim", 2.4)
        fig.arrow(mx, my, *tr, "now", 2.4)
        fig.text(tl[0] + 6, tl[1] + 16, "*r*_{L}", size=13, color="dim")
        fig.text(tr[0] + (6 if alpha == 0 else 8), tr[1] - (8 if alpha == 0 else 0), "*r*_{R}", size=13, color="now")

        # the screen
        ax = fig.axes(236, top + 14, 300, 92, (-1.5, 1.5), (0, 1.05))
        ax.cv.line(ax.X(-1.5), ax.Y(0), ax.X(1.5), ax.Y(0), "faint", 1.1)
        if i == 0:
            ax.area([(x, screen(x, V)) for x in xs], "cyan", base=0, fill_opacity=0.14)
            ax.path([(x, screen(x, V)) for x in xs], "line", 2.0)
        elif i == 1:
            ax.area([(x, screen(x, V)) for x in xs], "magenta", base=0, fill_opacity=0.12)
            ax.path([(x, screen(x, V)) for x in xs], "ink", 2.0)
        else:
            ax.path([(x, screen(x, 0)) for x in xs], "faint", 1.4)
            ax.path([(x, env(x) * (1 + math.cos(K * x)) / 4) for x in xs], "line", 2.0)
            ax.path([(x, env(x) * (1 - math.cos(K * x)) / 4) for x in xs], "line", 1.6, dash="4 3")
