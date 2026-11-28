"""An observer model splits a unit readout orthogonally and advances time by structural increments."""

from fractions import Fraction

SIZE = (704, 334)
WRAP = True
ALT = {
    "zh": "左图把单位步分成窗内 4/5 与窗外 3/5 两个正交投影。右图从种子开始，"
          "三拍的结构时间为 0、1/2、2。首次接边不增环路，三角形闭合使第一贝蒂数增加 1。虚线为恒等回放。",
    "en": "Left, a unit step splits into two orthogonal projections of lengths 4/5 and 3/5. Right, "
          "the structural clock reads 0, 1/2, 2 over three beats. The first edge adds no cycle, and "
          "closing a triangle raises the first Betti number by 1. The dashed line is identity replay.",
}


def draw(fig):
    left, right = fig.row([344, 344], 334)
    left.text(172, 24, left.t("静止全息画布 · 记忆切分", "Static canvas · memory split"),
              size=17, anchor="middle", weight=600)
    left.rect(44, 56, 256, 165, color="edge", fill="panel", rx=5)
    for x in range(60, 300, 20):
        left.line(x, 57, x, 220, "faint", 1, opacity=0.5)
    for y in range(71, 221, 20):
        left.line(45, y, 299, y, "faint", 1, opacity=0.5)

    dtau, dx = Fraction(4, 5), Fraction(3, 5)
    assert dtau**2 + dx**2 == 1
    x0, y0, span = 74, 186, 150
    x1, y1 = x0 + span*dtau, y0 - span*dx
    left.polygon([(x0, y0), (x1, y0), (x1, y1)], "violet", fill_opacity=0.16)
    left.text(57, 78, left.t("模型示意", "Model schematic"), size=13, color="dim", halo=True)
    left.arrow(x0, y0, x1, y0, "cyan", 2.2, head=8)
    left.arrow(x1, y0, x1, y1, "magenta", 2.2, head=8)
    left.arrow(x0, y0, x1, y1, "ink", 2.2, head=8)
    left.right_angle(x1, y0, 90, size=10)
    left.text(x1 - 53, y0 + 22, "Δτ_{mem} / Δt", anchor="middle", size=15, color="cyan")
    left.text(x1 + 13, y0 - 34, "Δx / Δt", size=15, color="magenta")
    left.text(x1 - 59, y1 + 18, "ψ", size=18, anchor="middle")
    left.text(172, 262, "κ_{time} + κ_{space} = 1", size=18, anchor="middle")
    left.text(172, 297, "(Δτ_{mem})² = Δt² − Δx²", size=18, anchor="middle", color="violet")

    right.text(172, 24, right.t("结构时间 · 恒等回放", "Structural time · identity replay"),
               size=18, anchor="middle", weight=600)
    # The seed is replayed, then h1 attaches to it, then h2 attaches to both vertices.
    graph = [(1, 0), (1, 0), (2, 1), (3, 3)]
    schur = [Fraction(0), Fraction(1, 2), Fraction(1, 2)]
    betti = [edges - vertices + 1 for vertices, edges in graph]
    samples = [(0, Fraction(0))]
    for beat, innovation in enumerate(schur, 1):
        samples.append((beat, samples[-1][1] + innovation + betti[beat] - betti[beat - 1]))
    assert samples == [(0, 0), (1, 0), (2, Fraction(1, 2)), (3, 2)]
    ax = right.axes(59, 74, 231, 154, (0, 3.2), (0, 2.3))
    ax.xaxis(ticks=range(4))
    ax.yaxis(ticks=[0, 0.5, 1, 2], labels=["0", "1/2", "1", "2"])
    ax.grid(ys=[0.5, 1, 2])
    ax.step(samples, "violet", 2.5)
    ax.points(samples, "violet", 4.4)
    ax.hline(0, "dim", 1.6, dash="5 4")
    ax.text(3, 0, right.t("恒等回放", "Idle replay"), dy=-10, size=13, anchor="end", color="dim")
    ax.text(3, 2, "Δb₁ = 1", dx=-13, dy=-9, size=14, anchor="end")
    right.text(51, 61, "τ", size=17, anchor="end")
    right.text(325, 234, right.t("拍", "Beat"), size=13, anchor="end")
    right.text(172, 275, "Δτ = Δℐ_{Schur} + Δb₁", size=17, anchor="middle")
    right.text(172, 303, "b₁ = |E| − |V| + c", size=15, anchor="middle", color="violet")
