"""同一段 Δt = 5 里，空间位移走得越远，固有时 Δτ = √(Δt² − Δx²) 越少：静止时等于 Δt，沿光锥时为 0。
For the same Δt = 5, the farther a segment moves in space, the less proper time Δτ = √(Δt² − Δx²) it
records: Δt when at rest, 0 along the light cone.

The curve is Δτ(Δx) = √(25 − Δx²), a quarter circle Δτ² + Δx² = 25; the marked points are the rest
segment (0, 5), the first leg of the worked example (3, 4), and the null segment (5, 0) (asserted).
"""

import math

SIZE = (480, 320)
ALT = {
    "zh": "一张曲线图：横轴是一段位移的空间长度 |Δx|，从 0 到 5；纵轴是它的固有时 Δτ。白色虚线是 Δt = 5 这条水平线。"
          "青色的曲线 Δτ = √(25 − Δx²) 从左上角 (0, 5) 开始，处处在虚线之下，经过 (3, 4)，落到 (5, 0)。"
          "三个点分别标着：静止 Δτ = Δt = 5；例题第一段 (5, 3)，Δτ = 4；光锥上 Δτ = 0。",
    "en": "A graph: the horizontal axis is the spatial length |Δx| of a segment, from 0 to 5; the vertical axis is its proper "
          "time Δτ. The white dashed line is the level Δt = 5. The cyan curve Δτ = √(25 − Δx²) starts at (0, 5) top left, stays "
          "below the dashed line, passes (3, 4) and comes down to (5, 0). The three points read: at rest Δτ = Δt = 5; the first "
          "leg (5, 3) of the worked example, Δτ = 4; on the light cone Δτ = 0.",
}


def draw(fig):
    t = fig.t
    dt = 5
    ax = fig.axes(66, 34, 340, 238, (0, 5.6), (0, 5.7))
    tau = lambda x: math.sqrt(max(dt * dt - x * x, 0.0))
    assert tau(0) == dt and tau(3) == 4 and tau(5) == 0
    assert all(tau(k / 10) <= dt for k in range(51))

    ax.xaxis(ticks=[0, 1, 2, 3, 4, 5], label=t("空间位移 |Δ*x*|", "space step |Δ*x*|"), size=14)
    ax.yaxis(ticks=[0, 1, 2, 3, 4, 5], size=14)
    ax.text(0, 5.7, t("固有时 Δ*τ*", "proper time Δ*τ*"), dx=8, dy=4, size=14, color="dim")
    ax.hline(dt, "ink", 1.4, dash="5 4")
    ax.text(5.6, dt, "Δ*t* = 5", dx=-2, dy=-8, size=14, color="ink", anchor="end")
    ax.area([(k / 100 * dt, tau(k / 100 * dt)) for k in range(101)], "line", fill_opacity=0.10)
    ax.plot(tau, 0, 5, 400, color="line", width=2.8)

    ax.points([(0, 5), (3, 4), (5, 0)], "line", 5, ring="bg")
    ax.text(0, 5, t("静止：Δ*τ* = Δ*t*", "at rest: Δ*τ* = Δ*t*"), dx=12, dy=44, size=14, color="line")
    ax.text(3, 4, t("例题 (5, 3)：Δ*τ* = 4", "example (5, 3): Δ*τ* = 4"), dx=12, dy=-6, size=14, color="line")
    ax.text(5, 0, t("光锥：Δ*τ* = 0", "light cone: Δ*τ* = 0"), dx=-10, dy=-14, size=14, color="line", anchor="end")
