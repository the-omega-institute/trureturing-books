"""对数主观时间：同样一个公历年，在生命早期升得多，在四十岁以后几乎是平的。
Logarithmic subjective time: the same calendar year rises a lot early in life and is almost flat
after forty.

The curve is the chapter's model τ_subj(t) = k ln(t/t₀) (MODEL), drawn with k = 1 against t/t₀. The two
bands are one calendar year each, [t₀, 2t₀] and [40t₀, 41t₀]; their rises are ln 2 ≈ 0.6931 and
ln(41/40) ≈ 0.0247, about 28 times apart (asserted in _ch35).
"""

import math

from _ch35 import EARLY, LATE, RATIO, tau

SIZE = (460, 268)
ALT = {
    "zh": "坐标图：横轴 t/t₀ 从 1 到 45，纵轴是主观时间 τ/k。青色曲线 τ = k ln(t/t₀) 先陡后平。两条同宽的灰色竖带标出两个一年："
          "t₀ 到 2t₀，曲线升了 0.693k；40t₀ 到 41t₀，只升了 0.025k，相差约 28 倍。",
    "en": "A graph: t/t₀ runs from 1 to 45 across, subjective time τ/k up the side. The cyan curve τ = k ln(t/t₀) is "
          "steep at first and then flat. Two grey bands of equal width mark one year each: from t₀ to 2t₀ the curve "
          "rises 0.693k; from 40t₀ to 41t₀ it rises only 0.025k, about 28 times less.",
}


def draw(fig):
    ax = fig.axes(56, 30, 372, 186, (0, 45), (0, 4.2))
    for a, b in ((1, 2), (40, 41)):
        ax.area([(a, 4.2), (b, 4.2)], "dim", fill_opacity=0.16)
    ax.xaxis(ticks=[1, 10, 20, 30, 40], labels=["1", "10", "20", "30", "40"], label="*t*/*t*₀", size=13)
    ax.yaxis(ticks=[0, 1, 2, 3, 4], size=13)
    fig.text(ax.X(0), ax.y - 12, "τ / *k*", size=13, color="dim", anchor="middle")
    ax.plot(lambda t: tau(t), 1, 45, color="line", width=2.6)
    # the two rises
    for a, b, s, dx, anc in ((1, 2, f"{EARLY:.3f} *k*", 12, "start"), (40, 41, f"{LATE:.3f} *k*", -12, "end")):
        ya, yb = tau(a), tau(b)
        ax.cv.line(ax.X(b), ax.Y(ya), ax.X(b), ax.Y(yb), "ink", 3.4, cap="round")
        ax.cv.line(ax.X(a), ax.Y(ya), ax.X(b), ax.Y(ya), "ink", 1.3, dash="3 3")
        ax.points([(b, yb)], "line", r=3.8, ring="bg")
        ax.text(b, (ya + yb) / 2, s, dx=dx, dy=0 if a == 1 else 30, size=14, color="ink", anchor=anc, middle=True, halo=True)
    assert f"{EARLY:.3f}" == "0.693" and f"{LATE:.3f}" == "0.025"
    ax.text(22, 1.0, fig.t(f"同样一年，相差约 {RATIO:.0f} 倍", f"one year each, about {RATIO:.0f}× apart"), size=13,
            color="dim", anchor="middle", halo=True)
    assert round(RATIO) == 28
