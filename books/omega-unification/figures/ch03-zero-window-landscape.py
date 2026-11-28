"""A finite zero-window comparison alongside three harmonic phase-deficit ranges."""

from math import log, pi, sqrt

SIZE = (746, 357)
WRAP = True
ALT = {
    "zh": "第 11431 枚零点的绝对中点偏差比 10000 至 12999 中的次优中心小约 35.60 倍。"
          "等权 Fejér 对角占 94.62%，单碰撞带自由重配的额外配对最多占 23.66%。"
          "右栏在对数时间轴上示意黎曼猜想条件下谐波亏额的三个窗口，长窗另有朗道估计假设。",
    "en": "The absolute midpoint error for zero 11431 is about 35.60 times smaller than the runner-up "
          "among centers 10000 through 12999. The equal-weight Fejér diagonal contributes 94.62%, "
          "and the extra pair contributes at most 23.66% under reweighting in the isolated band. "
          "The right panel illustrates the three harmonic-deficit time windows under RH, with an additional "
          "Landau bound in the long window.",
}


def draw(fig):
    t = fig.t
    left, right = fig.row([365, 365], fig.height)
    center = left.width / 2
    left.text(center, 23, t("零点 11431 的中点隔离", "Midpoint Isolation at Zero 11431"),
              size=17, weight=600, anchor="middle")
    left.text(center, 48, t("扫描 10,000–12,999 · 中心两侧各取 9 枚",
                            "Centers 10,000–12,999 · 9 neighbors per side"),
              size=13, anchor="middle", color="dim")

    # Interval values from ch39-zero-midpoint-fejer.py and ch39-midpoint-weight-bound.py.
    nearest_gap, next_pair_gap = 1.6812114283932192e-6, 0.0023277389
    runner_up_error = 5.9843686988215604e-5
    error_ratio = runner_up_error / nearest_gap
    assert 35.59 < error_ratio < 35.60
    comparison = left.axes(77, 65, 264, 62, (0.75, 44), (0, 2), logx=True)
    for row, index, ratio, role in ((1.5, 11431, 1, "amber"), (0.6, 11628, error_ratio, "dim")):
        comparison.path([(1, row), (ratio, row)], role, 2)
        comparison.points([(ratio, row)], role, r=4.3)
        comparison.text(1, row, t(f"#{index}", f"#{index}"), dx=-10, anchor="end", middle=True, size=13)
    comparison.text(error_ratio, 0.6, t(f"{error_ratio:.2f} 倍", f"{error_ratio:.2f}×"),
                    dy=-12, anchor="end", size=14, color="dim")
    comparison.xaxis(ticks=[1, 10], labels=[t("1×", "1×"), t("10×", "10×")],
                     label=t("相对中点偏差（对数轴）", "Relative midpoint error (log)"))

    count = 19
    diagonal = count + 4 * count * (count - 1) // 2
    diagonal_share = diagonal / (count**4 * 0.005700942405125)
    collision = 1 - nearest_gap / next_pair_gap
    extra_share = 4 * collision / (8 + 2 * sqrt(6) + 4 * collision)
    assert diagonal == 703 and round(100 * diagonal_share, 2) == 94.62
    assert round(100 * extra_share, 2) == 23.66
    for y, fraction, role, label in (
        (215, diagonal_share, "cyan", t("等权 · 占据对角（η = 0.01）", "Equal weights · diagonal (η = 0.01)")),
        (277, extra_share, "violet", t("孤立碰撞 · 额外配对上限", "Isolated collision · max extra-pair share")),
    ):
        left.text(16, y, label, size=14)
        left.text(349, y, t(f"{fraction:.2%}", f"{fraction:.2%}"),
                  anchor="end", color=role, size=15, weight=600)
        left.rect(16, y + 11, 333, 12, color=None, fill="faint", fill_opacity=0.25, rx=3)
        left.rect(16, y + 11, 333 * fraction, 12, color=None, fill=role, rx=3)
    left.text(center, 332, t("占各自四阶 Fejér 矩的比例", "Share of each Fejér fourth moment"),
              anchor="middle", color="dim", size=13)

    right.text(center, 23, t("谐波相位亏额的时间窗", "Harmonic Phase-Deficit Windows"),
               size=17, weight=600, anchor="middle")
    right.text(center, 48, t("Lean 冻结结果 · 对数轴示意", "Lean-frozen bounds · illustrative scale"),
               anchor="middle", color="dim", size=13)
    cutoff, lower, constant = 10**6, 10**4, 1
    short = (1 / cutoff, 1 / lower)
    periodic = (16 * pi / cutoff, constant / log(cutoff))
    long = (periodic[1], log(cutoff))
    assert short[0] < periodic[0] < short[1] < periodic[1] == long[0] < long[1]

    axis = right.axes(24, 80, 316, 190, (short[0], long[1]), (0, 3), logx=True)
    ticks = [1e-6, 1e-4, 1e-2, 1]
    axis.grid(xs=ticks)
    axis.xaxis(ticks=ticks, labels=[t(s, s) for s in ("10^{−6}", "10^{−4}", "10^{−2}", "1")],
               label=t("|t|（对数轴）", "|t| (log scale)"))
    for row, (lo, hi), text, role in (
        (2.6, short, t("1/T ≤ |t| ≤ 1/L", "1/T ≤ |t| ≤ 1/L"), "cyan"),
        (1.7, periodic, t("16π/T ≤ |t| ≤ b/log T", "16π/T ≤ |t| ≤ b/log T"), "violet"),
        (0.8, long, t("b/log T ≤ |t| ≤ log T", "b/log T ≤ |t| ≤ log T"), "cyan"),
    ):
        axis.path([(lo, row), (hi, row)], role, 5)
        axis.points([(lo, row), (hi, row)], role, r=3.7)
        right.text(center, axis.Y(row) - 17, text, anchor="middle", size=14)
    right.text(center, 330, t("各窗均以黎曼猜想为条件", "All three windows assume RH"),
               anchor="middle", color="dim", size=13)
    right.text(center, 349, t("长窗另需朗道估计", "The long window also assumes a Landau bound"),
               anchor="middle", color="dim", size=13)
