"""Certified auxiliary ranks as the permitted counterterm chord distance grows."""

SIZE = (356, 525)
ALT = {
    "zh": "固定旧传播块需要 38 个辅助态。截止量 D 为 56、216、224 时，最小秩分别在 29 至 31、"
          "26 至 27、25 至 26 之间。从 D=392 起，已证的阶梯依次为 24、23、21、20、19。"
          "392 是循环对称的 24 态门槛，512 处唯一恢复全频所需时钟数由 9 增至 10。",
    "en": "A fixed propagation block requires 38 auxiliary states. At cutoffs 56, 216, and 224 "
          "the minimum ranks lie in 29–31, 26–27, and 25–26. The exact staircase from cutoff 392 "
          "takes values 24, 23, 21, 20, and 19. Cutoff 392 is the cyclic-symmetry threshold for "
          "24 states, and at 512 the clock count for full-response uniqueness rises from 9 to 10.",
}


def draw(fig):
    t = fig.t
    center = fig.width / 2
    fig.text(center, 23, t("局部截止量与辅助记忆秩", "Local Cutoff and Auxiliary Memory Rank"),
             size=17, anchor="middle", weight=600)
    fig.text(center, 49, t("三个完整时钟响应的最小辅助态数", "Minimum states for three full clock responses"),
             size=13, anchor="middle", color="dim")

    # Early cutoffs have independent lower and upper certificates, with unknown exact ranks.
    early = ((56, 29, 31), (216, 26, 27), (224, 25, 26))
    fig.text(18, 79, t("截止量 D", "Cutoff D"), size=13, color="dim")
    fig.text(337, 79, t("秩／区间", "Rank / Range"), size=13, color="dim", anchor="end")
    ranges = fig.axes(111, 88, 152, 105, (24, 38), (0, 4))
    ranges.grid(xs=(26, 30, 34, 38))
    fixed = 38
    ranks_by_cutoff = ((None, fixed, fixed), *early)
    for i, (cutoff, lo, hi) in enumerate(ranks_by_cutoff):
        row = 3.5 - i
        y = ranges.Y(row)
        label = t("固定旧块", "Fixed block") if cutoff is None else t(str(cutoff), str(cutoff))
        fig.text(18, y, label, size=13, middle=True)
        role = "ink" if lo == hi else "violet"
        if hi > lo:
            ranges.path([(lo, row), (hi, row)], role, 2.4)
        ranges.points([(lo, row), (hi, row)], role, r=3.2)
        value = str(lo) if lo == hi else f"[{lo}, {hi}]"
        fig.text(337, y, t(value, value), color=role, size=14, middle=True, anchor="end")

    fig.line(15, 213, 341, 213, "edge", 1)
    fig.text(17, 241, t("已知精确秩", "Exact minimum rank"), size=15, weight=600)
    exact = ((392, 24), (544, 23), (1152, 21), (1376, 20), (1568, 19))
    ranks = [rank for _, rank in exact]
    assert all(a > b for a, b in zip(ranks, ranks[1:]))
    axis = fig.axes(42, 266, 287, 139, (330, 1660), (18.5, 24.8))
    axis.grid(ys=ranks)
    axis.yaxis(ticks=ranks, labels=[t(str(rank), str(rank)) for rank in ranks])
    axis.xaxis(ticks=[cutoff for cutoff, _ in exact],
               labels=[t(str(cutoff), str(cutoff)) for cutoff, _ in exact])
    axis.step([*exact, (axis.xr[1], ranks[-1])], "cyan", 2.6)
    axis.points(exact, "cyan", r=3.4, ring="bg")
    wall, clock_jump = exact[0][0], 512
    assert wall < clock_jump < exact[1][0]
    axis.vline(wall, "magenta", 1.4, dash="4 4")
    axis.vline(clock_jump, "violet", 1.4, dash="4 4")
    axis.points([(wall, ranks[0])], "magenta", r=4.4, ring="bg")

    fig.text(center, 449, t("平方弦距截止量 D", "Squared chord-distance cutoff D"),
             anchor="middle", size=13, color="dim")
    fig.line(17, 476, 34, 476, "magenta", 2)
    fig.text(42, 476, t("392 · 循环对称的 24 态门槛", "392 · 24-state threshold with cyclic symmetry"),
             size=13, middle=True)
    fig.line(17, 501, 34, 501, "violet", 2)
    fig.text(42, 501, t("512 · 全频恢复需 9 → 10 钟", "512 · Full response needs 9 → 10 clocks"),
             size=13, middle=True)
