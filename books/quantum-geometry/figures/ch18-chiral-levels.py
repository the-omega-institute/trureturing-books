"""质量把两个手性能级 ±3 推开成 ±5，每个本征态都成了两个手性分量 4/5 : 1/5 的叠加。
The mass pushes the two chiral levels ±3 apart to ±5, and each eigenstate becomes a 4/5 : 1/5 mixture of
the two chirality components.

H = pZ + mX with p = 3. At m = 0 the levels are +3 (all upper, Z = +1) and −3 (all lower, Z = −1). At
m = 4 they are ±5 with eigenvectors (2, 1)/√5 and (1, −2)/√5, so the upper share is 4/5 and 1/5
(all asserted). Each bar's blue and orange lengths are those two shares. The lower component is orange and striped, so that it
is not read as the solid amber kept for "now".
"""

import math

from _ch18 import hatch_rect

SIZE = (500, 350)
ALT = {
    "zh": "能级图，纵轴是能量 E。左列 m = 0：E = +3 处一根全蓝的横条（上分量 Z = +1），E = −3 处一根全橙色斜纹的横条（下分量 Z = −1）。"
          "右列 m = 4：两根横条被推到 E = +5 与 E = −5；+5 的横条 4/5 是蓝、1/5 是橙色斜纹，−5 的横条 1/5 是蓝、4/5 是橙色斜纹。虚线把左右两列对应的能级连起来。",
    "en": "An energy-level diagram with energy E upward. Left column, m = 0: an all-blue bar at E = +3 (upper component Z = +1) "
          "and an all-orange striped bar at E = −3 (lower component Z = −1). Right column, m = 4: the bars are pushed to E = +5 and "
          "E = −5; the +5 bar is 4/5 blue and 1/5 striped orange, the −5 bar 1/5 blue and 4/5 striped orange. Dashed lines join the matching "
          "levels of the two columns.",
}


def eigen(p, m):
    """Eigenvalues and normalised eigenvectors of [[p, m], [m, −p]], larger eigenvalue first."""
    E = math.sqrt(p * p + m * m)
    out = []
    for e in (E, -E):
        v = (m, e - p) if m else ((1.0, 0.0) if e > 0 else (0.0, 1.0))
        n = math.hypot(*v)
        out.append((e, (v[0] / n, v[1] / n)))
    return out


def draw(fig):
    t = fig.t
    p = 3
    cy, s = 172, 24                       # the canvas height of E = 0 and pixels per unit of energy
    Y = lambda E: cy - s * E

    free = eigen(p, 0)
    mass = eigen(p, 4)
    assert [e for e, _ in free] == [3, -3] and [e for e, _ in mass] == [5, -5]
    up_share = [v[0] ** 2 for _, v in mass]
    assert abs(up_share[0] - 4 / 5) < 1e-12 and abs(up_share[1] - 1 / 5) < 1e-12
    H = [[p, 4], [4, -p]]
    for e, v in mass:                     # H v = E v
        assert all(abs(H[i][0] * v[0] + H[i][1] * v[1] - e * v[i]) < 1e-12 for i in range(2))

    ax_x = 66
    fig.arrow(ax_x, Y(-5.9), ax_x, Y(6.1), "dim", 1.3, head=7)
    fig.text(ax_x + 8, Y(6.1) + 6, "*E*", size=15, color="dim")
    for E in (5, 3, 0, -3, -5):
        fig.line(ax_x - 5, Y(E), ax_x, Y(E), "dim", 1.2)
        fig.text(ax_x - 9, Y(E), (f"{E:+d}" if E else "0").replace("-", "−"), size=14, color="dim", anchor="end", middle=True)

    xm = 284                              # the left edge of the massive column
    cols = [(112, free, t("*m* = 0", "*m* = 0")), (xm, mass, t("*m* = 4", "*m* = 4"))]
    w, bh = 130, 14
    for x0, levels, head in cols:
        fig.text(x0 + w / 2, 26, head, size=15, color="ink", weight=600, anchor="middle")
        for e, v in levels:
            a = v[0] ** 2
            y = Y(e)
            if a > 1e-12:
                fig.rect(x0, y - bh / 2, w * a, bh, color=None, fill="blue", fill_opacity=0.85)
            if a < 1 - 1e-12:
                fig.rect(x0 + w * a, y - bh / 2, w * (1 - a), bh, color=None, fill="orange", fill_opacity=0.22)
                hatch_rect(fig, x0 + w * a, y - bh / 2, w * (1 - a), bh, "orange", gap=5.5, width=1.6)
            fig.rect(x0, y - bh / 2, w, bh, color="ink", width=1.2)
    for (e0, _), (e1, v1) in zip(free, mass):
        fig.line(112 + w + 4, Y(e0), xm - 4, Y(e1), "dim", 1.3, dash="4 3")
    for e, v in mass:
        a = v[0] ** 2
        y = Y(e)
        fig.text(xm + w + 10, y, f"*E* = {e:+.0f}".replace("+-", "−").replace("-", "−"), size=14, color="ink", middle=True)
        lab_y = y + bh / 2 + 18 if e > 0 else y - bh / 2 - 7        # on the side facing E = 0
        fig.text(xm + w * a / 2, lab_y, "4/5" if a > 0.5 else "1/5", size=14, color="blue", anchor="middle")
        fig.text(xm + w * a + w * (1 - a) / 2, lab_y, "1/5" if a > 0.5 else "4/5", size=14, color="orange", anchor="middle")
    fig.legend(112, 334, [("blue", t("上分量 *Z* = +1", "upper, *Z* = +1"))], swatch="box", size=14)
    sy = 334 - 14 * 0.82                  # the striped swatch, placed as legend(swatch="box") places its box
    fig.rect(xm + 2, sy, 14, 12, color="orange", fill="orange", fill_opacity=0.22, width=1.2)
    hatch_rect(fig, xm + 2, sy, 14, 12, "orange", gap=4.0, width=1.2)
    fig.text(xm + 26, 334, t("下分量 *Z* = −1", "lower, *Z* = −1"), size=14, color="dim")
