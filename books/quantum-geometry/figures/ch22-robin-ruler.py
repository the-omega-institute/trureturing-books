"""罗宾的尺子：σ(n)/n 与 e^γ ln ln n。越过尺子的 26 个整数全在 5040 左边（第二十二章 §22.4，例 ex-robin-5040-threshold）。
Robin's ruler: σ(n)/n against e^γ ln ln n. The 26 integers above the ruler all lie left of 5040 (chapter 22,
§22.4, example ex-robin-5040-threshold).

σ(n) is sieved exactly for n ≤ 10⁶. The script asserts the chapter's numbers: exactly 26 integers 3 ≤ n ≤ 5040
reach the ruler, the last being 5040, none between 5041 and 10⁶ (the theorem covers 5040 < n < 223092870), and
10080, 55440, 720720 reach 98.6 %, 98.3 % and 97.3 % of it. Only integers above 85 % of the ruler are drawn as
dots: the cloud below cannot reach the ruler and would only add ink.
"""

import math

SIZE = (460, 330)
ALT = {
    "zh": "对数横轴 n 从 3 到 10⁶，纵轴是 σ(n)/n。墨色曲线是尺子 e^γ ln ln n，缓缓上升。尺子上方的 26 个品红点都在竖直虚线 n = 5040 的左边，"
          "最后一个就是 5040；虚线右边只有尺子下方的淡青点云，青色空心圈圈出 10080、55440、720720，它们从下方贴着尺子。"
          "虚线右边的绿色横条写着：至 223092870 无一越过，已由 Lean 验证。",
    "en": "Logarithmic axis n from 3 to 10⁶ across, σ(n)/n up. The ink curve is the ruler e^γ ln ln n, rising slowly. "
          "The 26 magenta dots above the ruler all lie left of the dashed vertical line n = 5040, the last one being 5040; "
          "right of the line there is only a pale cyan cloud below the ruler, and cyan rings mark 10080, 55440 and 720720, "
          "which come up close to the ruler from below. A green bar right of the line says that none reaches it up to "
          "223092870, verified in Lean.",
}

N = 10 ** 6
EG = math.exp(0.57721566490153286)


def ruler(n):
    return EG * math.log(math.log(n))


def draw(fig):
    t = fig.t
    sig = [0] * (N + 1)
    for d in range(1, N + 1):
        for m in range(d, N + 1, d):
            sig[m] += d
    above = [n for n in range(3, N + 1) if sig[n] / n >= ruler(n)]
    assert len(above) == 26 and above[-1] == 5040 and above[:6] == [3, 4, 5, 6, 8, 9]
    assert abs(sig[5040] / 5040 - 403 / 105) < 1e-12
    rings = [10080, 55440, 720720]
    pct = [round(100 * sig[n] / n / ruler(n), 1) for n in rings]
    assert pct == [98.6, 98.3, 97.3], pct

    ax = fig.axes(44, 34, 400, 236, (3, N), (0.8, 5.4), logx=True)
    ax.grid(ys=[1, 2, 3, 4, 5])
    ax.xaxis(ticks=[10, 100, 1000, 10 ** 4, 10 ** 5, 10 ** 6], label="*n*", size=14)
    ax.yaxis(ticks=[1, 2, 3, 4, 5], size=14)
    ax.text(3, 5.4, "σ(*n*)/*n*", dx=8, dy=14, size=14)

    cloud = [(n, sig[n] / n) for n in range(3, N + 1) if 0.85 * ruler(n) < sig[n] / n < ruler(n)]
    for x, y in cloud:
        X, Y = ax.pt(x, y)
        fig.dot(X, Y, 1.6, "cyan", opacity=0.35)
    ax.path([(n, ruler(n)) for n in [5 * 1.02 ** k for k in range(0, 700)] if n <= N] + [(N, ruler(N))], "ink", 2.2)

    # the theorem's range: no integer 5040 < n < 223092870 reaches the ruler
    x0, _ = ax.pt(5040, 0)
    x1, _ = ax.pt(N, 0)
    yb = ax.Y(5.0)
    fig.line(x0 + 6, yb, x1, yb, "lean", 3)
    fig.arrow_head(x1 + 2, yb, 0, "lean", head=9)
    fig.text((x0 + x1) / 2 + 4, yb - 10, t("至 223 092 870 无一越过", "none up to 223 092 870"), size=13, color="lean", anchor="middle")
    ax.vline(5040, "dim", 1.3, dash="5 4")

    for n in rings:
        X, Y = ax.pt(n, sig[n] / n)
        fig.circle(X, Y, 6, color="cyan", width=1.8)
    nx, ny = ax.pt(720720, sig[720720] / 720720)
    fig.text(nx + 2, ny + 26, "720720", size=13, color="cyan", anchor="middle", halo=True)

    for n in above:
        X, Y = ax.pt(n, sig[n] / n)
        fig.dot(X, Y, 3.6, "area", ring="bg")
    X, Y = ax.pt(5040, sig[5040] / 5040)
    fig.text(X - 8, Y - 10, "5040", size=14, color="area", anchor="end", halo=True)
    ax.text(30, ruler(30), t("尺子 e^{γ} ln ln *n*", "ruler e^{γ} ln ln *n*"), dx=4, dy=26, size=14, color="ink", halo=True)
    fig.legend(44, 318, [("area", t("越过尺子：26 个", "above the ruler: 26"))], size=13, swatch="dot")
    fig.legend(220, 318, [("cyan", t("尺子下方，差 15% 以内", "below the ruler, within 15 %"))], size=13, swatch="dot")
