"""对称四方向的 CHSH 组合 3 cos θ − cos 3θ 只在 45° 顶到 2√2（第十三章 §45° 余弦与固定 CHSH 极值）。
The symmetric four-direction CHSH combination 3 cos θ − cos 3θ peaks at 2√2 only at 45° (chapter 13,
the 45° cosine and the fixed CHSH extremum).

Three neighbouring angles θ and a spanning angle 3θ give 3 cos θ − cos 3θ on the Bell state. Its
derivative −3 sin θ + 3 sin 3θ vanishes at 45°, where the value is 2√2 (asserted). The green dashed line is
the classical bound 2 of the finite deterministic fibre model; the curve stands above it for
0° < θ < arccos((√3 − 1)/2) ≈ 68.53° (computed).
"""

import math

SIZE = (430, 300)
ALT = {
    "zh": "横轴是相邻两方向的夹角 θ，从 0° 到 90°；纵轴从 0 到 3。青色曲线是 3 cos θ − cos 3θ：从 θ = 0° 的 2 起步，"
          "在 45° 升到顶点 2√2，约在 68.5° 回落到 2，到 90° 降为 0。绿色虚线是经典上界 2，曲线高出它的部分涂成品红。",
    "en": "The horizontal axis is the angle θ between neighbouring directions, from 0° to 90°; the vertical axis runs from 0 "
          "to 3. The cyan curve is 3 cos θ − cos 3θ: it starts at 2 at θ = 0°, rises to its peak 2√2 at 45°, falls back to 2 "
          "near 68.5° and reaches 0 at 90°. The green dashed line is the classical bound 2; the part of the curve above it "
          "is shaded magenta.",
}


def f(deg):
    th = math.radians(deg)
    return 3 * math.cos(th) - math.cos(3 * th)


def draw(fig):
    t = fig.t
    ax = fig.axes(56, 26, 340, 214, (0, 90), (0, 3.1))
    ax.xaxis(at=0, ticks=[0, 45, 68.53, 90], labels=["0°", "45°", "68.5°", "90°"], size=13)
    ax.yaxis(at=0, ticks=[0, 1, 2], labels=["0", "1", "2"], size=13)
    fig.text(ax.X(90) + 10, ax.Y(0) + 5, "*θ*", size=15, color="dim")

    # where the curve is above 2: 6c − 4c³ > 2 ⇔ (c − 1)(2c² + 2c − 1) < 0, so c > (√3 − 1)/2
    cross = math.degrees(math.acos((math.sqrt(3) - 1) / 2))
    assert abs(f(cross) - 2) < 1e-12 and abs(cross - 68.53) < 0.01
    assert abs(f(0) - 2) < 1e-12 and abs(f(90)) < 1e-12
    assert abs(f(45) - 2 * math.sqrt(2)) < 1e-12
    assert abs(-3 * math.sin(math.radians(45)) + 3 * math.sin(math.radians(135))) < 1e-12
    assert all(f(45) >= f(d / 10) for d in range(901))

    top = [(d * cross / 120, f(d * cross / 120)) for d in range(121)]
    ax.cv.polygon([ax.pt(x, y) for x, y in top] + [ax.pt(cross, 2), ax.pt(0, 2)], "area", fill_opacity=0.26)
    ax.hline(2, "lean", 1.8, dash="6 4")
    ax.plot(f, 0, 90, n=240, color="line", width=2.6)

    x45, y45 = ax.pt(45, f(45))
    fig.line(x45, y45, x45, ax.Y(0), "faint", 1.0, dash="3 4")
    fig.dot(x45, y45, 5.0, "line", ring="bg")
    fig.text(x45, y45 - 14, "2√2", size=15, color="line", weight=600, anchor="middle")
    ax.text(4, 2, t("经典上界 2", "classical bound 2"), dy=22, size=13, color="lean")
    ax.text(60, 2.8, "3 cos *θ* − cos 3*θ*", size=14, color="line")
