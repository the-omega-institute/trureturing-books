"""Contrast curvature scales with the fractional cutoff shifts that reverse its sign."""

from math import comb

SIZE = (356, 572)
ALT = {
    "zh": "对数阶梯从观测暗能量的 10⁻¹²² 延伸至普朗克标度。另一列标出紫外截止的相对位移，"
          "匹配实例在约 4.22×10⁻¹²⁰ 首次变号，7.2×10⁻¹¹⁷ 为普适上界。四层系数 −1、3、−3、1 "
          "消去零至二次矩。",
    "en": "The logarithmic ladder spans observed dark energy at 10⁻¹²² through the Planck scale. "
          "A separate lane marks fractional UV-cutoff shifts. The matched examples flip at around "
          "4.22×10⁻¹²⁰, with a uniform upper bound of 7.2×10⁻¹¹⁷ in the matched class. The stencil "
          "−1, 3, −3, 1 cancels moments zero through two.",
}


def draw(fig):
    t = fig.t
    center = fig.width / 2
    fig.text(center, 23, t("真空配平的尺度落差", "Scales of Vacuum Balance"),
             size=18, weight=600, anchor="middle")
    fig.text(83, 53, t("曲率量级", "Curvature Scale"), anchor="middle", size=15, weight=600)
    fig.text(271, 53, t("截止相对位移 ΔQ/Q", "Fractional Shift ΔQ/Q"),
             anchor="middle", size=14, weight=600)
    axis = fig.axes(center, 82, 1, 296, (0, 1), (1e-122, 1), logy=True)
    for exponent in (0, -30, -60, -90, -120):
        y = axis.Y(10.0**exponent)
        fig.line(center - 5, y, center + 5, y, "dim", 1)
    fig.line(center, axis.Y(1), center, axis.Y(1e-122), "dim", 1.5)

    for value, label_y, role, name, magnitude in (
        (1, 79, "ink", t("普朗克标度", "Planck scale"), t("1", "1")),
        (0.0118, 127, "magenta", t("未补偿一圈下界", "Uncancelled 1-loop floor"), t("0.0118", "0.0118")),
        (2.6e-11, 177, "violet", t("微观雷吉下界", "Microscopic Regge floor"), t("2.6 × 10^{−11}", "2.6 × 10^{−11}")),
        (1.345e-67, 253, "cyan", t("希格斯树级位移", "Higgs tree-level shift"), t("−1.345 × 10^{−67}", "−1.345 × 10^{−67}")),
        (1e-122, 362, "amber", t("观测暗能量", "Observed dark energy"), t("10^{−122}", "10^{−122}")),
    ):
        y = axis.Y(value)
        fig.polyline([(center, y), (center - 16, y), (center - 31, label_y)], role, 1.2)
        fig.dot(center, y, 3.7, role, ring="bg")
        fig.text(center - 33, label_y, name, anchor="end", size=12, halo=True)
        fig.text(center - 33, label_y + 17, magnitude, anchor="end", size=14, color=role, weight=600)

    for value, label_y, name, magnitude in (
        (7.2e-117, 294, t("变号上界", "Sign-flip upper bound"), t("7.2 × 10^{−117}", "7.2 × 10^{−117}")),
        (4.22e-120, 354, t("实例首次变号", "First flip in examples"), t("4.22 × 10^{−120}", "4.22 × 10^{−120}")),
    ):
        y = axis.Y(value)
        fig.polyline([(center, y), (center + 16, y), (center + 31, label_y)], "magenta", 1.2)
        fig.dot(center, y, 3.7, "magenta", ring="bg")
        fig.text(center + 35, label_y, name, size=13)
        fig.text(center + 35, label_y + 17, magnitude, size=14, color="magenta", weight=600)

    fig.line(14, 406, 342, 406, "edge", 1)
    fig.text(center, 433, t("四层热核抵消", "Four-Layer Heat-Kernel Cancellation"),
             size=16, anchor="middle", weight=600)
    weights = tuple((-1)**(3 - i) * comb(3, i) for i in range(4))
    assert weights == (-1, 3, -3, 1)
    assert [sum(weight * i**degree for i, weight in enumerate(weights)) for degree in range(4)] == [0, 0, 0, 6]
    baseline = 493
    fig.line(36, baseline, 320, baseline, "edge", 1)
    for i, weight in enumerate(weights):
        x = center + (i - 1.5) * 62
        y = baseline - weight * 9
        role = "cyan" if weight > 0 else "magenta"
        fig.line(x, baseline, x, y, role, 6)
        label = f"{weight:+d}".replace("-", "−")
        fig.text(x, y + (-8 if weight > 0 else 17), t(label, label), anchor="middle",
                 color=role, size=14, weight=600)
    fig.text(center, 557, t("零至二次矩消去", "Moments of degree 0–2 cancel"),
             anchor="middle", size=13, color="dim")
