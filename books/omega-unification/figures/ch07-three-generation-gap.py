"""Universal magnetic Laplacian band bounds on the 19-point shell."""

from fractions import Fraction

SIZE = (356, 389)
ALT = {
    "zh": "五个电荷扇区中，磁拉普拉斯算子的前三模均严格低于 8.685，另外十六模均严格高于 "
          "9.6。琥珀虚线标出谱隙中的公共截断 9。每个扇区的三个轻模各对应一个循环特征标。",
    "en": "In each of five charge sectors, the first three magnetic Laplacian modes lie strictly "
          "below 8.685 and all 16 remaining modes lie strictly above 9.6. The amber line marks "
          "the common cutoff at 9. Each light band contains one mode of each cyclic character.",
}


def draw(fig):
    t = fig.t
    # Uniform over the dual-clock torus, with spoke softening from zero to 10⁻⁸.
    # Bounds and character multiplicities are certified in ch39-all-zero-three-mode-gap.py.
    light = Fraction(1737, 200)
    heavy = Fraction(48, 5)
    cutoff = 9
    charges = (1, 2, -3, -4, 6)
    characters = ("1", "ω", "ω²")
    assert light < cutoff < heavy and len(characters) == 3
    assert 19 - len(characters) == 16

    center = fig.width / 2
    fig.text(center, 23, t("五荷扇区共用的三模谱隙", "One Three-Mode Gap Across Five Charges"),
             size=17, weight=600, anchor="middle")
    fig.text(center, 48, t("两钟任取单位相位 · 辐边减重 δ ≤ 10^{−8}",
                           "Any unit clock phases · spoke softening δ ≤ 10^{−8}"),
             anchor="middle", size=13, color="dim")

    axis = fig.axes(62, 81, 272, 221, (-0.5, 4.5), (7.8, 10.5))
    low_y, high_y = axis.Y(light), axis.Y(heavy)
    fig.rect(axis.x, high_y, axis.w, low_y - high_y, color=None, fill="panel", fill_opacity=0.8)
    for bound in (light, heavy):
        axis.hline(bound, "edge", 1.2)
    for i in range(len(charges)):
        x = axis.X(i)
        fig.rect(x - 12, low_y, 24, axis.Y(7.8) - low_y, color=None, fill="cyan", fill_opacity=0.16)
        fig.rect(x - 12, axis.Y(10.5), 24, high_y - axis.Y(10.5), color=None, fill="magenta", fill_opacity=0.13)
        fig.arrow(x, low_y + 5, x, axis.Y(7.8) - 6, "cyan", 1.6, head=6)
        fig.arrow(x, high_y - 5, x, axis.Y(10.5) + 6, "dim", 1.6, head=6)
        fig.circle(x, low_y, 3.1, color="cyan", fill="bg", width=1.4)
        fig.circle(x, high_y, 3.1, color="dim", fill="bg", width=1.4)

    axis.hline(cutoff, "amber", 1.7, dash="5 4")
    axis.text(4.5, cutoff, t("公共截断", "Common cutoff"), dx=-5, dy=-9, anchor="end",
              size=13, color="amber")
    axis.yaxis(ticks=[float(light), cutoff, float(heavy)],
               labels=[t(label, label) for label in ("8.685", "9", "9.6")])
    axis.xaxis(ticks=list(range(len(charges))),
               labels=[t(f"{q}".replace("-", "−"), f"{q}".replace("-", "−")) for q in charges])
    axis.text(-0.5, 10.5, t("λ", "λ"), dx=-9, dy=-7, anchor="end", size=14)
    axis.text(4.5, 7.8, t("q", "q"), dx=10, dy=16, size=14)

    fig.text(center, 345, t("每荷 3 轻模 · 循环特征标 1、ω、ω²",
                            "3 light modes per charge · characters 1, ω, ω²"),
             color="cyan", anchor="middle", size=14)
    fig.text(center, 370, t("每荷 16 重模 · 开圆表示严格界",
                            "16 heavy modes per charge · strict bounds"),
             anchor="middle", color="dim", size=13)
