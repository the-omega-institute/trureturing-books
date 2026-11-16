"""势能降了多少，就是速率平方曲线下的面积（第十二章 §黎曼梯度与能量耗散）。
The potential drops by exactly the area under the squared speed (chapter 12).

The exact downhill flow of V(r) = r_z on the unit sphere from r = (√3/2, 0, ½) (example ex-cluster-shift-and-gradient,
step 3): θ̇ = sin θ, V = cos θ, |ṙ|² = sin² θ. The script integrates |ṙ|² over [0, T] and asserts that it equals
V(0) − V(T), the identity of thm-riemannian-gradient-dissipation, and that the starting rate is 3/4.
"""

from _ch12 import integral, potential, speed2

SIZE = (440, 300)
T = 2.5
DROP = potential(0) - potential(T)
AREA = integral(speed2, 0, T)
assert abs(DROP - AREA) < 1e-9
ALT = {
    "zh": f"横轴是时间 t，从 0 到 {T}。墨色的曲线是势能 V，沿负梯度流从 0.5 一路降到 {potential(T):.2f}。"
          f"品红的面积是速率平方 |ṙ|² 曲线下的面积，等于 {AREA:.2f}；右边品红的竖条是势能的降落 V(0) − V(T)，也是 {DROP:.2f}。"
          "两者是同一个数。",
    "en": f"The horizontal axis is time t from 0 to {T}. The ink curve is the potential V, falling along the downhill "
          f"gradient flow from 0.5 to {potential(T):.2f}. The magenta area is the area under the squared speed |ṙ|², equal "
          f"to {AREA:.2f}; the magenta bar on the right is the drop of the potential V(0) − V(T), also {DROP:.2f}. They are "
          "the same number.",
}


def draw(fig):
    ax = fig.axes(56, 28, 310, 230, (0, T), (-1.05, 1.05))
    ax.hline(0, "faint", 1.2)
    ax.yaxis(ticks=[-1, 0, 0.5, 1], labels=["−1", "0", "0.5", "1"], size=13)
    ax.xaxis(at=-1.05, ticks=[0, 1, 2], labels=["0", "1", "2"], size=13)
    fig.text(ax.x + ax.w / 2, 292, fig.t("时间 *t*", "time *t*"), size=14, color="dim", anchor="middle")
    ts = [T * k / 200 for k in range(201)]
    sq = [(t, speed2(t)) for t in ts]
    ax.area(sq, "area", base=0, fill_opacity=0.24)
    ax.path(sq, "area", 2.0)
    ax.path([(t, potential(t)) for t in ts], "ink", 2.6)
    ax.points([(0, potential(0))], color="now", r=5.0, ring="bg")
    ax.text(0.95, 0.2, f"{AREA:.2f}", size=16, weight=600, color="area", anchor="middle", halo=True)
    ax.text(1.35, 0.86, "|*ṙ*|^{2}", size=14, color="area", halo=True)
    ax.text(1.5, potential(1.5), "*V*", dx=8, dy=-10, size=15, color="ink", halo=True)

    # the drop V(0) − V(T), drawn as a bar at the right edge
    x0, y0 = ax.pt(T, potential(0))
    _, y1 = ax.pt(T, potential(T))
    ax.path([(0, potential(0)), (T, potential(0))], "dim", 1.2, dash="4 4")
    fig.line(x0 + 14, y0, x0 + 14, y1, "area", 4.0)
    fig.line(x0 + 8, y0, x0 + 20, y0, "area", 1.6)
    fig.line(x0 + 8, y1, x0 + 20, y1, "area", 1.6)
    fig.text(x0 + 26, (y0 + y1) / 2 - 10, fig.t("降落", "drop"), size=14, color="area", middle=True)
    fig.text(x0 + 26, (y0 + y1) / 2 + 10, f"{DROP:.2f}", size=16, weight=600, color="area", middle=True)
