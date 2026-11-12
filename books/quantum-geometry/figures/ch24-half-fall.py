"""半程落体：时间用掉一半时，离中心还剩 (1 + sin θ*)/2 ≈ 0.837，只落了不到六分之一。
The half-time fall: when half the time is gone, the distance left is (1 + sin θ*)/2 ≈ 0.837, less
than a sixth of the way down.

The curve is the cycloid r/r₀ = (1 + cos η)/2, t/t_ff = (η + sin η)/π, η ∈ [0, π], of radial free
fall from rest. At t/t_ff = ½ one has η = π/2 − θ* (asserted) and r/r₀ = (1 + sin θ*)/2. The points at
¼ and ¾ are found by bisection and checked against the chapter (0.960937, 0.597150).
"""

import math

from _ch24 import LAM, THETA

SIZE = (500, 320)
ALT = {
    "zh": "横轴是时间占总下落时间的比例 t/t_ff，从 0 到 1；纵轴是离中心的距离占起始距离的比例 r/r₀。"
          "曲线从左上角 (0, 1) 开始几乎水平，越往右越陡，最后竖直落到 (1, 0)。三个点标在时间的四分之一、一半、四分之三处，"
          "高度分别是 0.961、0.837、0.597；一半处的点是青色，虚线把它连到两条轴上，旁边写着 (1 + sin θ*)/2。"
          "右侧的括号标出这时只落了 0.163，不到六分之一。",
    "en": "The horizontal axis is the fraction t/t_ff of the total fall time, from 0 to 1; the vertical axis is the distance "
          "from the centre as a fraction r/r₀ of the starting distance. The curve starts almost flat at the top left (0, 1), "
          "steepens to the right and ends vertically at (1, 0). Three points mark a quarter, half and three quarters of the "
          "time, at heights 0.961, 0.837 and 0.597; the half-time point is cyan, joined to both axes by dashed lines and "
          "labelled (1 + sin θ*)/2. A bracket on the right shows that only 0.163 has been fallen, less than a sixth.",
}


def r_of(eta):
    return (1 + math.cos(eta)) / 2


def t_of(eta):
    return (eta + math.sin(eta)) / math.pi


def eta_at(tt):
    lo, hi = 0.0, math.pi
    for _ in range(200):
        m = (lo + hi) / 2
        if t_of(m) < tt:
            lo = m
        else:
            hi = m
    return (lo + hi) / 2


E = {tt: eta_at(tt) for tt in (0.25, 0.5, 0.75)}
assert abs(E[0.5] - (math.pi / 2 - THETA)) < 1e-12
assert abs(r_of(E[0.5]) - (1 + LAM) / 2) < 1e-12
assert [round(r_of(E[tt]), 6) for tt in (0.25, 0.5, 0.75)] == [0.960937, 0.836806, 0.59715]
assert 1 - r_of(E[0.5]) < 1 / 6


def draw(fig):
    t = fig.t
    ax = fig.axes(60, 30, 310, 240, (0, 1), (0, 1.05))
    ax.xaxis(ticks=[0, 0.25, 0.5, 0.75, 1], labels=["0", "¼", "½", "¾", "1"], size=14)
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "0.5", "1"], size=14)
    fig.curve(lambda u: ax.pt(t_of(u), r_of(u)), 0, math.pi, n=200, color="ink", width=2.2)
    for tt in (0.25, 0.75):
        ax.points([(tt, r_of(E[tt]))], "dim", r=4.0, ring="bg")
        if tt < 0.5:
            ax.text(tt, r_of(E[tt]), f"{r_of(E[tt]):.3f}", dx=0, dy=24, size=14, color="dim", anchor="middle")
        else:
            ax.text(tt, r_of(E[tt]), f"{r_of(E[tt]):.3f}", dx=10, dy=-6, size=14, color="dim")
    rh = r_of(E[0.5])
    ax.path([(0, rh), (0.5, rh)], "line", 1.4, dash="4 3")
    ax.path([(0.5, 0), (0.5, rh)], "line", 1.4, dash="4 3")
    ax.points([(0.5, rh)], "line", r=5.6, ring="bg")
    ax.text(0.5, rh, "(1 + sin *θ*^{∗})/2 ≈ 0.837", dx=10, dy=-14, size=14, color="line", halo=True)
    # the distance fallen by half time
    x = ax.X(1) + 14
    fig.brace(x, ax.Y(1), x, ax.Y(rh), "", depth=8)
    fig.text(x + 20, (ax.Y(1) + ax.Y(rh)) / 2, t("落了 0.163", "fallen 0.163"), size=14, color="dim", middle=True)
    ax.hline(1, "faint", 1.0, dash="2 4")
    fig.text(ax.X(1), 306, "*t* / *t*_{ff}", size=14, color="dim", anchor="end")
    fig.text(ax.X(0) + 8, 20, "*r* / *r*_{0}", size=14, color="dim")
