"""捏合把纯态 ρ(cos θ, sin θ) 的总质量 1 分成对角骨架与非对角相干两份；冲上 90° 时，对角骨架里承载记忆的轴向偏置 ½cos²θ 归零（第三十六章 §失忆断崖）。
Pinching splits the total mass 1 of the pure state ρ(cos θ, sin θ) into a diagonal skeleton and an
off-diagonal coherence; at 90° the axial bias ½cos²θ that carries the memory in the skeleton is gone
(chapter 36, the amnesia cliff).

Stacked over θ ∈ [0°, 90°]: the constant ½ of the diagonal, the axial bias ½cos²θ (cyan) and the
off-diagonal mass ½sin²θ (magenta); every value comes from the matrix entries of ρ(c, s) and the three
always add to 1 (the Pythagorean identity of thm-ch36-pinching-skeleton-and-discarded-coherence).
"""

import math

from _ch36 import pinching_ledger

SIZE = (460, 312)
ALT = {
    "zh": "横轴是 θ，从 0° 到 90°，纵轴是质量，从 0 到 1。三层色带叠起来总是顶到 1：最下面的灰色一层是对角骨架里恒为 ½ 的部分；中间青色一层是轴向偏置 ½cos²θ，"
          "在 0° 处厚 ½，往右变薄，到 90° 处厚度为 0；最上面品红一层是非对角相干 ½sin²θ，从 0 增到 ½。90° 处有一条竖虚线。顶上写着 1 = |P(ρ)|² + |ρ − P(ρ)|²，旁边有绿色的 LEAN ✓ 标记。",
    "en": "θ runs from 0° to 90° across, mass from 0 to 1 up. Three stacked bands always reach 1: the grey bottom band is the "
          "constant ½ of the diagonal skeleton; the cyan middle band is the axial bias ½cos²θ, ½ thick at 0° and thinning to "
          "nothing at 90°; the magenta top band is the off-diagonal coherence ½sin²θ, growing from 0 to ½. A dashed vertical "
          "line marks 90°. Above: 1 = |P(ρ)|² + |ρ − P(ρ)|², with a green LEAN ✓ tag.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(52, 62, 300, 196, (0, 90), (0, 1))
    xs = [i * 1.5 for i in range(61)]
    diag = [pinching_ledger(math.radians(x))[0] for x in xs]
    assert abs(diag[0] - 1) < 1e-12 and abs(diag[-1] - 0.5) < 1e-12
    top = [(x, 1.0) for x in xs]
    mid = [(x, d) for x, d in zip(xs, diag)]
    low = [(x, 0.5) for x in xs]
    ax.area(low, "dim", fill_opacity=0.16)
    fig.polygon([ax.pt(*p) for p in mid] + [ax.pt(*p) for p in reversed(low)], "line", fill_opacity=0.32)
    fig.polygon([ax.pt(*p) for p in top] + [ax.pt(*p) for p in reversed(mid)], "area", fill_opacity=0.26)
    ax.path(mid, "line", 2.2)
    ax.path(low, "dim", 1.2, dash="4 3")
    ax.hline(1.0, "ink", 2.0)
    ax.vline(90, "dim", 1.2, dash="4 3")
    ax.xaxis(ticks=[0, 45, 90], labels=["0°", "45°", "90°"], size=13, label="θ")
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "½", "1"], size=13)

    ax.text(22, 0.25, t("对角里恒为 ½ 的部分", "the constant ½ of the diagonal"), size=13, color="dim", middle=True)
    ax.text(6, 0.62, t("轴向偏置 ½cos²θ", "axial bias ½cos²θ"), size=14, color="line", weight=600, middle=True, halo=True)
    ax.text(84, 0.82, t("非对角相干 ½sin²θ", "coherence ½sin²θ"), size=14, color="area", weight=600, anchor="end", middle=True,
            halo=True)
    # at 90° the cyan band has no thickness
    d90 = pinching_ledger(math.pi / 2)
    assert abs(d90[0] - 0.5) < 1e-12 and abs(d90[1] - 0.5) < 1e-12
    x90, y90 = ax.pt(90, 0.5)
    fig.dot(x90, y90, 4.4, "line", ring="bg")
    fig.text(x90 + 10, y90, "½cos²90° = 0", size=13, color="line", middle=True)

    w = fig.chip(436, 34, "LEAN ✓", "lean", size=13, anchor="end")
    fig.text(436 - w - 10, 34, "1 = |*P*(ρ)|² + |ρ − *P*(ρ)|²", size=14, anchor="end")
