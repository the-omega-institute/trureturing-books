"""佩尔接缝：误差每步变号、缩成上一步的 s 倍，却从不归零；同一行的 Q² − 2P² 永远是 ±1。
The Pell seam: the error changes sign at every step and shrinks to s times the previous one, yet
never reaches zero; on the same row Q² − 2P² is always ±1.

The stems are the signed errors P_{k+1}·s − P_k for k = 0…5 (s = √2 − 1), cyan when positive and
magenta when negative, drawn on a logarithmic scale of |error| (10⁻³ at the centre line, 1 at the
edge) so that shrinking by the factor s is one equal step; the dashed envelope is ±s^{k+1}; each stem is labelled by the convergent
Q_{k+1}/P_{k+1}. The row under the axis is Q_{k+1}² − 2P_{k+1}². Every number is checked against the
table of example ex-ch29-silver-pell-table.
"""

import math

from _ch29 import S

SIZE = (560, 300)
ALT = {
    "zh": "横轴是步数 k = 0 到 5，纵轴是误差 P_{k+1}·s − P_k，按绝对值取对数刻度。六根竖线交替朝上（青色）和朝下（品红），绝对值依次是 0.414、0.172、0.071、0.029、0.012、0.005，"
          "端点都落在两条虚线包络 ±s^{k+1} 上，每一步缩短相同的一格，变号却不归零。竖线顶端标着渐近分数 1/1、3/2、7/5、17/12、41/29、99/70。"
          "横轴下方一行是 Q² − 2P²：−1、+1、−1、+1、−1、+1。",
    "en": "The horizontal axis is the step k = 0 to 5, the vertical axis the error P_{k+1}·s − P_k on a logarithmic scale of "
          "its size. Six stems alternate up (cyan) and down (magenta), of sizes 0.414, 0.172, 0.071, 0.029, 0.012, 0.005, "
          "their ends on the dashed envelope ±s^{k+1}: one equal step shorter each time, changing sign, never zero. The stems carry the convergents 1/1, 3/2, 7/5, 17/12, 41/29, "
          "99/70. A row under the axis gives Q² − 2P²: −1, +1, −1, +1, −1, +1.",
}

P = [0, 1]
Q = [1, 1]
for _ in range(10):
    P.append(2 * P[-1] + P[-2])
    Q.append(2 * Q[-1] + Q[-2])
assert P[:8] == [0, 1, 2, 5, 12, 29, 70, 169] and Q[:8] == [1, 1, 3, 7, 17, 41, 99, 239]

ERR = [P[k + 1] * S - P[k] for k in range(6)]
TABLE = [0.41421356, -0.17157288, 0.071067812, -0.029437252, 0.012193309, -0.0050506339]
for k in range(6):
    assert abs(ERR[k] - TABLE[k]) < 1e-8
    assert abs(ERR[k] - (-1) ** k * S ** (k + 1)) < 1e-12  # theorem part 1
    assert Q[k + 1] ** 2 - 2 * P[k + 1] ** 2 == (-1) ** (k + 1)
    assert P[k + 2] * P[k] - P[k + 1] ** 2 == (-1) ** (k + 1)  # theorem part 2


def L(e):
    """Signed logarithmic height: |e| from 10⁻³ (the centre line) to 1, upwards for e > 0."""
    return math.copysign(math.log10(abs(e)) + 3, e)


def draw(fig):
    t = fig.t
    ax = fig.axes(96, 38, 420, 190, (-0.5, 5.6), (-3, 3))
    ax.hline(0, "dim", 1.3)
    for v, lab in ((1, "0.01"), (2, "0.1"), (3, "1")):
        for sg in (1, -1):
            ax.cv.line(ax.X(-0.5) - 5, ax.Y(sg * v), ax.X(-0.5), ax.Y(sg * v), "dim", 1.2)
            ax.text(-0.5, sg * v, ("" if sg > 0 else "−") + lab, dx=-8, size=13, color="dim", anchor="end", middle=True)
    ax.cv.line(ax.X(-0.5), ax.Y(3), ax.X(-0.5), ax.Y(-3), "dim", 1.3)
    env = lambda k: math.log10(S ** (k + 1)) + 3
    ax.plot(env, -0.2, 5.3, color="faint", width=1.4, dash="4 4")
    ax.plot(lambda k: -env(k), -0.2, 5.3, color="faint", width=1.4, dash="4 4")
    ax.text(5.3, env(5.3), "*s*^{*k*+1}", dx=6, dy=0, size=13, color="dim", middle=True)
    ax.text(5.3, -env(5.3), "−*s*^{*k*+1}", dx=6, dy=0, size=13, color="dim", middle=True)
    for k, e in enumerate(ERR):
        role = "line" if e > 0 else "area"
        x0, y0 = ax.pt(k, 0)
        x1, y1 = ax.pt(k, L(e))
        fig.line(x0, y0, x1, y1, role, 4.2, cap="round")
        fig.dot(x1, y1, 4.4, role, ring="bg")
        frac = f"{Q[k + 1]}/{P[k + 1]}"
        fig.text(x1, y1 + (-12 if e > 0 else 22), frac, size=14, color=role, anchor="middle", halo=True)
    yk = ax.Y(-3) + 20
    fig.text(ax.X(-0.5) - 8, yk, "*k*", size=14, color="dim", anchor="end", middle=True)
    yr = yk + 30
    fig.text(ax.X(-0.5) - 8, yr, "*Q*² − 2*P*²", size=14, color="ink", anchor="end", middle=True)
    for k in range(6):
        fig.text(ax.X(k), yk, str(k), size=13, color="dim", anchor="middle", middle=True)
        v = Q[k + 1] ** 2 - 2 * P[k + 1] ** 2
        fig.text(ax.X(k), yr, "+1" if v > 0 else "−1", size=15, color="ink", anchor="middle", middle=True, weight=600)
    fig.line(ax.X(-0.5), yk + 14, ax.X(5.6), yk + 14, "faint", 1.2)
    fig.text(14, 17, t("误差（对数刻度）", "error (log scale)"), size=13, color="dim")
