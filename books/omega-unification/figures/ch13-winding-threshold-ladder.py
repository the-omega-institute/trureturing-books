"""Sharp winding caps for successive phase-selection problems."""

SIZE = (356, 495)
ALT = {
    "zh": "最大绕数不超过 18 时三窗内无合格驻点，19 首现三窗内鞍点，21 首现三窗局部极小，27 首现三窗全局极小，"
          "31 首现局部味极小，36 首现依赖高度的全局味极小，105 首现跨高度的共同真空。"
          "权重随绕数非增时，全局能差大于四分之一。联合零点见证编号为 2,306,888,100,085。",
    "en": "No critical point occurs in the three-window domain through winding order 18. "
          "The thresholds are 19 for a three-window saddle, 21 for a three-window local minimum, "
          "27 for a three-window global minimum, 31 for a local "
          "flavor minimum, 36 for a height-dependent global flavor minimum, and 105 for a common vacuum "
          "across heights. Nonincreasing weights leave a global energy gap above one quarter. "
          "The joint zero witness is 2,306,888,100,085.",
}


def draw(fig):
    t = fig.t
    center = fig.width / 2
    fig.text(center, 23, t("相位选择的最小绕数阶梯", "Winding Thresholds for Phase Selection"),
             size=17, anchor="middle", weight=600)
    fig.text(center, 48, t("最大绕数 N（对数轴）", "Maximum winding order N (log scale)"),
             size=13, anchor="middle", color="dim")

    milestones = (
        (18, t("三窗内无驻点", "No critical point\nin three windows")),
        (19, t("三窗内鞍点", "Three-window\nsaddle")),
        (21, t("三窗局部极小", "Three-window\nlocal minimum")),
        (27, t("三窗全局极小", "Three-window global minimum")),
        (31, t("局部味极小", "Local flavor minimum")),
        (36, t("全局味极小\n依赖高度", "Global flavor minimum\nHeight dependent")),
        (105, t("共同真空\n与高度无关", "Common vacuum\nHeight independent")),
    )
    orders = [order for order, _ in milestones]
    assert all(b > a for a, b in zip(orders, orders[1:]))
    axis = fig.axes(210, 72, 118, 272, (16, 110), (-0.4, len(milestones) - 0.5), logx=True)
    axis.grid(xs=(20, 30, 50, 100))
    axis.xaxis(ticks=(20, 30, 50, 100),
               labels=[t(str(i), str(i)) for i in (20, 30, 50, 100)])
    axis.step([(order, row) for row, order in enumerate(orders)], "cyan", 2)
    for row, (order, label) in enumerate(milestones):
        x, y = axis.pt(order, row)
        lines = label.splitlines()
        for i, line in enumerate(lines):
            fig.text(14, y + (i - (len(lines) - 1) / 2) * 15, line, middle=True, size=13,
                     color="dim" if i or row == 0 else "ink")
        role = "amber" if row == len(milestones) - 1 else "cyan"
        if row == 0:
            role = "dim"
        axis.points([(order, row)], role, r=4.2, ring="bg")
        value = f"≤{order}" if row == 0 else str(order)
        fig.text(x, y - 10, t(value, value), anchor="middle", size=13, color=role, halo=True, weight=600)

    fig.rect(14, 382, 328, 45, color="magenta", fill="magenta", fill_opacity=0.09, rx=5)
    fig.text(center, 400, t("权重随绕数非增", "Weights nonincreasing with winding order"),
             size=13, anchor="middle", color="magenta")
    fig.text(center, 417, t("全局能差 > 1/4", "Global energy gap > 1/4"),
             size=14, anchor="middle", color="magenta", weight=600)
    witness = 2_306_888_100_085
    fig.text(center, 458, t(f"联合零点见证 #{witness:,}", f"Joint zero witness #{witness:,}"),
             size=15, anchor="middle", color="amber", weight=600)
