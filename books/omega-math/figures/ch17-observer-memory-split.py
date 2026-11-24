"""An observer model splits a unit readout orthogonally and advances time by structural increments."""

from fractions import Fraction

SIZE = (704, 334)
WRAP = True
ALT = {
    "zh": "模型示意。左图以静止全息画布为背景，单位步分解为记忆窗内的时间投影与窗外的空间投影，"
          "平方权重之和为 1，移项得 Δτ²=Δt²−Δx²。右图示例中，加入正交新方向和闭合新回路推进结构时间，"
          "两次恒等回放都使 Δτ=0。",
    "en": "Model schematic. Left, on a static holographic canvas, a unit step splits into in-window "
          "time and out-of-window space projections. Their squared weights sum to 1, giving "
          "Δτ²=Δt²−Δx² after transposition. Right, an orthogonal new direction and a new cycle "
          "advance structural time. Two identity replays each give Δτ=0.",
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
    left.text(x1 - 53, y0 + 22, "Δτ / Δt", anchor="middle", size=15, color="cyan")
    left.text(x1 + 13, y0 - 34, "Δx / Δt", size=15, color="magenta")
    left.text(x1 - 59, y1 + 18, "ψ", size=18, anchor="middle")
    left.text(172, 262, "κ_{time} + κ_{space} = 1", size=18, anchor="middle")
    left.text(172, 297, "Δτ² = Δt² − Δx²", size=18, anchor="middle", color="violet")

    right.text(172, 24, right.t("结构时间 · 恒等回放", "Structural time · identity replay"),
               size=18, anchor="middle", weight=600)
    # A unit innovation, two identity steps, and one cycle closure without a Schur increment.
    increments = [(1, 0), (0, 0), (0, 0), (0, 1)]
    samples = [(0, 0)]
    for n, (schur, cycles) in enumerate(increments, 1):
        samples.append((n, samples[-1][1] + schur + cycles))
    assert samples == [(0, 0), (1, 1), (2, 1), (3, 1), (4, 2)]
    ax = right.axes(59, 74, 231, 154, (0, 4.2), (0, 2.3))
    ax.xaxis(ticks=range(5))
    ax.yaxis(ticks=[0, 1, 2])
    ax.grid(ys=[1, 2])
    ax.step(samples, "violet", 2.5)
    ax.points(samples, "violet", 4.4)
    ax.text(2, 1, "Δτ = 0", dy=-14, size=16, anchor="middle")
    right.text(51, 61, "τ", size=17, anchor="end")
    right.text(325, 234, right.t("步", "Step"), size=13, anchor="end")
    right.text(172, 275, "Δτ = Δℐ_{Schur} + Δb₁", size=17, anchor="middle")
    right.text(172, 303, "[x, x, x] = x   ⟹   Δτ = 0", size=15, anchor="middle", color="violet")
