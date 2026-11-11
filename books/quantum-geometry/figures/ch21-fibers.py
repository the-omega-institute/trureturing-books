"""一把概念尺子 q_L : X → B 把地址空间切成一根根纤维；同一根纤维上的两点从 B 看不出区别（第二十一章 §21.1）。
A concept readout q_L : X → B cuts the address space into fibers; two points on one fiber look the same from B
(chapter 21, §21.1).

Four coordinates b₁ … b₄ with fibers of 3, 2, 4 and 1 addresses; the fibers partition X (checked).
"""

SIZE = (480, 262)
ALT = {
    "zh": "下方一条横线上有四个青色的点 b₁、b₂、b₃、b₄，是坐标空间 B。每个点上方竖着一个圆角框，是它的纤维，里面分别有 3、2、4、1 个"
          "地址点，合起来就是地址空间 X；一支向下的箭头 q_L 从 X 指向 B。第三根纤维涂成浅青色，其中两点标着 x 与 y，框顶写着 "
          "q_L(x) = q_L(y)：它们落在同一个读数 b₃ 上。",
    "en": "Along a horizontal line at the bottom are four cyan points b₁, b₂, b₃, b₄: the coordinate space B. Above each stands "
          "a rounded box, its fiber, holding 3, 2, 4 and 1 address points; together they make the address space X. A downward "
          "arrow q_L points from X to B. The third fiber is shaded light cyan; two of its points are labelled x and y, and "
          "above it is written q_L(x) = q_L(y): they land on the same reading b₃.",
}

SIZES = [3, 2, 4, 1]


def draw(fig):
    t = fig.t
    xs = [130, 214, 298, 382]
    top, bottom, by = 44, 178, 228
    assert sum(SIZES) == 10 and len(xs) == len(SIZES)       # every address lies on exactly one fiber
    fig.line(96, by, 420, by, "dim", 1.4)
    for i, (x, k) in enumerate(zip(xs, SIZES)):
        hi = i == 2
        fig.rect(x - 22, top, 44, bottom - top, color="line" if hi else "dim", fill="line" if hi else "panel",
                 fill_opacity=0.14 if hi else None, rx=10, width=1.8 if hi else 1.3)
        step = (bottom - top) / (k + 1)
        for j in range(k):
            y = top + step * (j + 1)
            fig.dot(x, y, 4.6, "ink")
            if hi and j in (0, 3):
                fig.text(x + 12, y, "*x*" if j == 0 else "*y*", size=15, middle=True)
        fig.line(x, bottom + 4, x, by - 9, "faint", 1.2, dash="3 3")
        fig.dot(x, by, 5, "line", ring="bg")
        fig.text(x, by + 22, f"*b*_{{{i + 1}}}", size=14, color="line", anchor="middle")
    fig.text(xs[2], 30, "*q*_{L}(*x*) = *q*_{L}(*y*)", size=14, color="line", anchor="middle")
    fig.text(50, (top + bottom) / 2, "*X*", size=16, anchor="middle", middle=True)
    fig.text(50, by, "*B*", size=16, color="line", anchor="middle", middle=True)
    fig.arrow(50, (top + bottom) / 2 + 20, 50, by - 16, "dim", 1.6, head=8)
    fig.text(60, by - 46, "*q*_{L}", size=14, color="dim")
