"""Six arithmetic readings constrain the support in height and the seventh reading."""

from fractions import Fraction

SIZE = (356, 485)
ALT = {
    "zh": "三条高度带在对数轴上分布，分别承载约 23.44%、37.4% 和 39.1% 的算术权重，"
          "合计超过 99.931%。第七拍预测窗宽约 2.14×10⁻¹²，35 位预测码 32071996606 "
          "与参考码 32071992476 分离。",
    "en": "Three height bands on a log scale carry about 23.44%, 37.4%, and 39.1% of arithmetic "
          "weight, with a joint bound above 99.931%. The seventh-reading window is about "
          "2.14×10⁻¹² wide and forces the 35-bit code 32071996606, apart from the reference code 32071992476.",
}


def draw(fig):
    t = fig.t
    center = fig.width / 2
    fig.text(center, 23, t("共同算术钟的三条高度带", "Three Height Bands of the Shared Clock"),
             size=17, anchor="middle", weight=600)
    fig.text(center, 48, t("三带合计权重 >99.931%", "Combined weight >99.931%"),
             color="cyan", anchor="middle", size=15, weight=600)
    height = fig.axes(24, 77, 305, 140, (3e10, 3e12), (0, 3), logx=True)
    ticks = (1e11, 1e12)
    height.grid(xs=ticks)
    height.xaxis(ticks=ticks, labels=[t("10^{11}", "10^{11}"), t("10^{12}", "10^{12}")],
                 label=t("零点高度 γ（对数轴）", "Zero height γ (log scale)"))

    for row, lo, hi, role, interval, share in (
        (2.6, 3.8e10, 4.5e10, "cyan", t("(3.8–4.5) × 10^{10}", "(3.8–4.5) × 10^{10}"), "23.44%"),
        (1.7, 7e10, 1e11, "cyan", t("7 × 10^{10} 至 10^{11}", "7 × 10^{10} to 10^{11}"), "37.4%"),
        (0.8, 1e12, None, "amber", t("≥ 10^{12}", "≥ 10^{12}"), "39.1%"),
    ):
        x, y = height.pt(lo, row)
        fig.text(24, y - 11, interval, size=13)
        fig.text(330, y - 11, t(f"约 {share}", f"≈ {share}"), color=role, size=14, anchor="end", weight=600)
        if hi is None:
            fig.arrow(x, y, height.X(height.xr[1]), y, role, 3, head=8)
        else:
            height.path([(lo, row), (hi, row)], role, 5)
            height.points([(hi, row)], role, r=3.4)
        height.points([(lo, row)], role, r=3.4)

    fig.line(15, 269, 341, 269, "edge", 1)
    fig.text(center, 296, t("第七拍 · Gauss–Radau 预测", "Seventh Reading · Gauss–Radau Forecast"),
             anchor="middle", size=16, weight=600)

    # Outer bounds for the exact six readings from the seventh-time replay certificate.
    lower = Fraction("0.93341795164287258400188")
    upper = Fraction("0.93341795164501234976010")
    width = upper - lower
    scale = 2**35
    code = lower * scale // 1
    reference = 32071992476
    assert code == upper * scale // 1 == 32071996606
    assert code - reference == 4130
    assert round(float(width) * 10**12, 2) == 2.14
    fig.text(center, 321, t(f"窗宽 ≈ {float(width) * 10**12:.2f} × 10^{{−12}}",
                            f"Window width ≈ {float(width) * 10**12:.2f} × 10^{{−12}}"),
             anchor="middle", color="dim", size=13)

    for x, label, value, role in (
        (92, t("35 位参考码", "35-bit reference code"), reference, "dim"),
        (264, t("35 位预测码", "35-bit forecast code"), code, "amber"),
    ):
        fig.text(x, 355, label, size=13, anchor="middle", color=role)
        fig.text(x, 380, t(str(value), str(value)), size=15, anchor="middle", color=role, weight=600)
    fig.arrow(157, 375, 199, 375, "dim", 1.3, head=6)

    bin_axis = fig.axes(35, 407, 286, 25, (0, 1), (0, 1))
    bin_axis.frame()
    bin_axis.path([(float(lower * scale - code), 0.5), (float(upper * scale - code), 0.5)], "amber", 5)
    fig.text(center, 458, t("放大预测码所在的单个 35 位格",
                            "Zoom into the single 35-bit forecast bin"),
             anchor="middle", color="dim", size=13)
