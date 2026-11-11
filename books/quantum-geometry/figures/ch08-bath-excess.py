"""一个热浴比特擦得越干净，多付的 D 涨得越快，系统熵减却封顶在 ln 2（第八章 §8.2）。
The cleaner one reservoir qubit erases, the faster the excess D grows, while the entropy drop is capped at
ln 2 (chapter 8, §8.2).

The five rows of example ex-one-qubit-reservoir-swap-erasure (asserted in _ch08): each bar is βQ split
into the system's entropy drop −ΔS_sys (grey) and the reservoir's relative entropy D (dashed box); I = 0.
"""

from _ch08 import LN2, SWAP_TABLE, swap_row

SIZE = (520, 300)
ALT = {
    "zh": "五根柱子，横轴是热浴比特的基态布居数 p = 0.6、0.75、0.9、0.99、0.999。每根柱子的总高度是热量 βQ，"
          "下面灰色的一截是系统熵减，上面虚线框的一截是热浴相对熵 D。一条虚线标出 ln 2：灰色的一截越来越接近它却不超过它，"
          "虚线框的一截却越长越高，到 p = 0.999 时 βQ 为 3.45。",
    "en": "Five bars over the reservoir qubit's ground population p = 0.6, 0.75, 0.9, 0.99, 0.999. The full height of each "
          "bar is the heat βQ; its lower grey part is the system's entropy drop and its upper dashed-box part the reservoir's "
          "relative entropy D. A dashed line marks ln 2: the grey parts approach it without passing it, while the dashed boxes "
          "keep growing, reaching βQ = 3.45 at p = 0.999.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(56, 30, 430, 212, (0, 5), (0, 3.6))
    ax.yaxis(ticks=[0, 1, 2, 3], labels=["0", "1", "2", "3"], size=13)
    ax.xaxis(ticks=[i + 0.5 for i in range(5)], labels=[str(p) for p in SWAP_TABLE], size=13,
             label=t("热浴比特的基态布居数 *p*", "reservoir ground population *p*"))
    w = 0.5
    for i, p in enumerate(SWAP_TABLE):
        ds, _, d, bq = swap_row(p)
        assert ds < LN2
        x0, x1 = i + 0.5 - w / 2, i + 0.5 + w / 2
        ax.cv.rect(ax.X(x0), ax.Y(ds), ax.X(x1) - ax.X(x0), ax.Y(0) - ax.Y(ds), color="dim", fill="dim", fill_opacity=0.45,
                   width=1.2)
        ax.cv.rect(ax.X(x0), ax.Y(bq), ax.X(x1) - ax.X(x0), ax.Y(ds) - ax.Y(bq), color="ink", fill="faint",
                   fill_opacity=0.25, width=1.3, dash="4 3")
        ax.text(i + 0.5, bq, f"{bq:.2f}", dy=-8, size=13, color="ink", anchor="middle")
    ax.hline(LN2, "ink", 1.3, dash="2 4")
    ax.text(0.04, LN2, "ln 2", dy=-6, size=13, color="ink")
    lx, ly = ax.X(0.15), ax.Y(3.3)
    fig.rect(lx, ly - 11, 14, 12, color="dim", fill="dim", fill_opacity=0.45, width=1.2)
    fig.text(lx + 22, ly, t("系统熵减 −Δ*S*_{sys}", "entropy drop −Δ*S*_{sys}"), size=13, color="dim")
    fig.rect(lx, ly + 11, 14, 12, color="ink", fill="faint", fill_opacity=0.25, width=1.3, dash="4 3")
    fig.text(lx + 22, ly + 22, t("多付的 *D*", "excess *D*"), size=13, color="dim")
    fig.text(ax.x + 6, ax.y - 8, "*βQ*", size=13, color="dim")
