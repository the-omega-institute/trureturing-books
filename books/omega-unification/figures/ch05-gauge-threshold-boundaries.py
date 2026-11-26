"""Crossing scales and perturbative ceilings for the specified gauge spectra."""

from math import asin, sqrt

SIZE = (356, 482)
ALT = {
    "zh": "标量阈值族排除 r≤189。r=400 的标量交汇约为 5×10¹⁴ GeV，自旋配平交汇约为 "
          "5.3×10¹⁴ GeV，几何比约为 8.53。在相对交汇能标的对数轴上，四条射线依次止于 "
          "3.9Q、14Q、SU(5) 的 20Q 与 Spin(10) 的 30Q。",
    "en": "The scalar threshold family excludes r≤189. Its r=400 crossing is near 5×10¹⁴ GeV. "
          "The spin-balanced crossing is near 5.3×10¹⁴ GeV at a geometric ratio near 8.53. "
          "Four logarithmic rays mark perturbative ceilings at 3.9Q, 14Q, 20Q for SU(5), "
          "and 30Q for Spin(10).",
}


def draw(fig):
    t = fig.t
    center = fig.width / 2
    scalar_ratio = 400
    excluded = 189
    spin_ratio = asin(sqrt(804 / (4 * 867))) / asin(sqrt(12 / (4 * 867)))
    assert 8.53 < spin_ratio < 8.54 and excluded < scalar_ratio
    crossings = (5e14, 5.3e14)

    fig.text(center, 23, t("规范交汇与紫外上界", "Gauge Crossings and UV Ceilings"),
             size=18, weight=600, anchor="middle")
    fig.rect(14, 40, 328, 33, color="magenta", fill="magenta", fill_opacity=0.10, rx=5)
    fig.text(center, 56, t(f"标量阈值族排除 r ≤ {excluded}", f"Scalar threshold family excludes r ≤ {excluded}"),
             size=14, color="magenta", anchor="middle", middle=True)

    crossing = fig.axes(20, 87, 316, 109, (3e14, 8e14), (0, 3), logx=True)
    scales = [3e14, 4e14, 6e14, 8e14]
    crossing.grid(xs=scales)
    crossing.xaxis(ticks=scales,
                   labels=[t(str(scale), str(scale)) for scale in (3, 4, 6, 8)],
                   label=t("交汇能标 Q（10^{14} GeV，对数轴）", "Crossing scale Q (10^{14} GeV, log scale)"))
    for y, scale, role, name, value in (
        (2.45, crossings[0], "cyan", t("标量 · r = 400", "Scalar · r = 400"), t("≈ 5.0", "≈ 5.0")),
        (1.05, crossings[1], "amber", t("自旋配平 · r ≈ 8.53", "Spin-balanced · r ≈ 8.53"), t("≈ 5.3", "≈ 5.3")),
    ):
        crossing.path([(crossing.xr[0], y), (scale, y)], "faint", 1)
        crossing.points([(scale, y)], role, r=5, ring="bg")
        crossing.text(crossing.xr[0], y, name, dy=-10, size=13)
        crossing.text(scale, y, value, dx=10, middle=True, color=role, size=14, weight=600)

    fig.line(14, 254, 342, 254, "edge", 1)
    fig.text(14, 280, t("固定重谱的微扰上界", "Perturbative Ceilings at Fixed Spectrum"),
             size=16, weight=600)
    ceiling = fig.axes(20, 301, 316, 143, (1, 40), (0, 4), logx=True)
    ticks = (1, 2, 5, 10, 20, 40)
    ceiling.grid(xs=ticks)
    ceiling.xaxis(ticks=ticks, labels=[t(f"{ratio}Q", f"{ratio}Q") for ratio in ticks])
    for row, ratio, label in (
        (3.30, 3.9, t("3.9Q", "3.9Q")),
        (2.40, 14, t("14Q", "14Q")),
        (1.50, 20, t("SU(5) · 20Q", "SU(5) · 20Q")),
        (0.60, 30, t("Spin(10) · 30Q", "Spin(10) · 30Q")),
    ):
        ceiling.path([(1, row), (ratio, row)], "violet", 2, opacity=0.76)
        ceiling.points([(ratio, row)], "violet", r=4, ring="bg")
        ceiling.text(ratio, row, label, dx=-5, dy=-8, anchor="end", color="violet", size=13, halo=True)
