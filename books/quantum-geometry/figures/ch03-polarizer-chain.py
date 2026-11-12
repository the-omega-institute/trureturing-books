"""偏振片链：在 0° 与 90° 之间等角插入 N 片，透过比例 w_N = [cos²(π/(2(N+1)))]^{N+1}（第三章 §3.3）。
The polarizer chain: N equally spaced polarizers between 0° and 90° pass w_N = [cos²(π/(2(N+1)))]^{N+1}
(chapter 3, §3.3).

Every dot is the chapter's finite formula. It asserts w₀ = 0 and w₁ = ¼ as the text states, and that the
sequence increases. The limit 1 is the literature result the chapter quotes; it is drawn as a dashed line.
"""

import math

SIZE = (460, 330)
ALT = {
    "zh": "横轴是中间片数 N，从 0 到 12；纵轴是透过比例，从 0 到 1。青色的点按 w_N = [cos²(π/(2(N+1)))]^{N+1} 计算：N = 0 时为 0，"
          "N = 1 时为 ¼（三片的例子，带圈），之后一路上升，N = 12 时约 0.83。顶上一条紫色虚线标在 1，是文献给出的极限。",
    "en": "N, the number of middle polarizers, runs across from 0 to 12; the transmitted share runs up from 0 to 1. The cyan "
          "dots are w_N = [cos²(π/(2(N+1)))]^{N+1}: 0 at N = 0, ¼ at N = 1 (the three-polarizer example, ringed), then rising "
          "steadily to about 0.83 at N = 12. A dashed violet line at 1 marks the limit given in the literature.",
}


def w(n):
    m = n + 1
    return math.cos(math.pi / (2 * m)) ** (2 * m)


def draw(fig):
    t = fig.t
    ns = list(range(13))
    ws = [w(n) for n in ns]
    assert abs(ws[0]) < 1e-12 and abs(ws[1] - 0.25) < 1e-12
    assert all(a < b for a, b in zip(ws, ws[1:]))
    ax = fig.axes(66, 34, 374, 240, (-0.5, 12.5), (0, 1.08))
    ax.grid([], [0.25, 0.5, 0.75], "faint", 1.0, dash="3 4")
    ax.hline(1.0, "argued", 1.6, dash="6 4")
    ax.xaxis(ticks=[0, 1, 2, 4, 6, 8, 10, 12], labels=["0", "1", "2", "4", "6", "8", "10", "12"], size=14)
    ax.yaxis(ticks=[0, 0.25, 0.5, 0.75, 1], labels=["0", "¼", "½", "¾", "1"], size=14)
    ax.path(list(zip(ns, ws)), "line", 1.4, dash="2 3")
    ax.points(list(zip(ns, ws)), "line", 4.6)
    x1, y1 = ax.pt(1, ws[1])
    fig.circle(x1, y1, 10, color="ink", width=1.6)
    fig.text(x1 + 16, y1 + 4, t("三片：¼", "three polarizers: ¼"), size=15, color="ink", halo=True)
    x0, y0 = ax.pt(0, 0)
    fig.text(x0 + 14, y0 - 12, t("两片：0", "two: 0"), size=15, color="ink", halo=True)
    xe, ye = ax.pt(12, ws[-1])
    fig.text(xe, ye + 26, f"{ws[-1]:.2f}", size=14, color="line", anchor="middle")
    fig.text(ax.X(12.4), ax.Y(1) - 8, t("极限 1（文献结果）", "limit 1 (literature)"), size=14, color="argued", anchor="end")
    fig.text(ax.x + ax.w / 2, 320, t("中间片数 *N*", "middle polarizers *N*"), size=15, color="dim", anchor="middle")
    fig.text(20, ax.y + ax.h / 2, t("透过比例 *w*_{N}", "transmitted *w*_{N}"), size=15, color="dim", anchor="middle", rotate=90)
