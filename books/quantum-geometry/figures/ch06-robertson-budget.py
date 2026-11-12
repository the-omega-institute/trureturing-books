"""不确定关系的余量由两块拼成：混合度与协方差平方（第六章 §6.2，例 ex-mixed-qubit-robertson-slack）。
The slack of the uncertainty relation is made of two pieces, the mixedness and the squared covariance (chapter 6,
§6.2, the example ex-mixed-qubit-robertson-slack).

One bar per row of the example's table, for the qubit with Bloch vector r, A = σx and B = σy. The whole bar is
(σ_A σ_B)² = (1 − rx²)(1 − ry²); it is cut into the commutator term rz² (magenta, the floor of the relation), the
squared covariance rx² ry² (cyan) and the mixedness 1 − |r|² (grey). The script checks the identity
(1 − rx²)(1 − ry²) = rz² + rx² ry² + (1 − |r|²) for every row and the four-place values of the table.
"""

import math

SIZE = (464, 330)
ALT = {
    "zh": "六根横条，对应正文例题表的六行，每行左边写着布洛赫向量 r。每根条的总长是 (σ_A σ_B)²，竖线标出 1。条从左到右切成三段："
          "品红的一段是对易子那一项 r_z²，青色的一段是协方差平方 r_x² r_y²，灰色的一段是混合度 1 − |r|²。前三行是纯态，没有灰色；"
          "第三行 (1, 1, 1)/√3 多出一段青色；后三行是混合态，灰色越往下越长；最后一行是球心，没有品红，整根条都是灰色。",
    "en": "Six horizontal bars, one for each row of the table in the chapter's example, each labelled on the left with the "
          "Bloch vector r. The whole length of a bar is (σ_A σ_B)², and a vertical line marks 1. Each bar is cut, left to "
          "right, into a magenta piece, the commutator term r_z²; a cyan piece, the squared covariance r_x² r_y²; and a grey "
          "piece, the mixedness 1 − |r|². The first three rows are pure states and have no grey; the third, (1, 1, 1)/√3, "
          "has a cyan piece; the last three are mixed, the grey growing down the column; the last row is the centre of the "
          "ball, with no magenta and a bar that is all grey.",
}

S3 = 1 / math.sqrt(3)
ROWS = [  # Bloch vector, its label, and the table's σ_A σ_B and |r_z|
    ((0, 0, 1), "(0, 0, 1)", 1, 1),
    ((0.6, 0, 0.8), "(0.6, 0, 0.8)", 0.8, 0.8),
    ((S3, S3, S3), "(1, 1, 1)/√3", 0.6667, 0.5774),
    ((0, 0, 0.6), "(0, 0, 0.6)", 1, 0.6),
    ((0.5, 0.5, 0.5), "(0.5, 0.5, 0.5)", 0.75, 0.5),
    ((0, 0, 0), "(0, 0, 0)", 1, 0),
]


def pieces(r):
    x, y, z = r
    total = (1 - x * x) * (1 - y * y)
    parts = (z * z, x * x * y * y, 1 - (x * x + y * y + z * z))
    assert abs(sum(parts) - total) < 1e-12 and min(parts) > -1e-12
    return total, parts


def draw(fig):
    t = fig.t
    fig.legend(18, 26, [("area", t("对易子那一项 *r*_{z}^{2}（不确定关系的地板）", "commutator term *r*_{z}^{2} (the floor)")),
                        ("line", t("协方差平方 *r*_{x}^{2} *r*_{y}^{2}", "squared covariance *r*_{x}^{2} *r*_{y}^{2}")),
                        ("dim", t("混合度 1 − |*r*|^{2}", "mixedness 1 − |*r*|^{2}"))], size=14, gap=22, swatch="box")
    x0, top, unit, bar, step = 146, 112, 288, 22, 34
    fig.text(x0 - 12, top - 14, t("布洛赫向量 *r*", "Bloch vector *r*"), size=13, color="dim", anchor="end")
    fig.text(x0, top - 14, "(σ_{*A*} σ_{*B*})^{2}", size=13, color="dim")
    for i, (r, label, sab, rz) in enumerate(ROWS):
        total, parts = pieces(r)
        assert abs(round(math.sqrt(total), 4) - sab) < 1e-9 and abs(round(abs(r[2]), 4) - rz) < 1e-9
        y = top + i * step
        fig.text(x0 - 12, y + bar / 2, label, size=14, anchor="end", middle=True)
        x = x0
        for role, val in zip(("area", "line", "dim"), parts):
            w = unit * val
            if w > 0.5:
                fig.rect(x, y, w, bar, color=role, fill=role, fill_opacity=0.32 if role != "dim" else 0.22, width=1.2)
            x += w
        fig.text(x + 6, y + bar / 2, f"{total:.4g}" if total < 1 else "1", size=13, color="dim", middle=True)
    yb = top + len(ROWS) * step - step + bar
    fig.line(x0 + unit, top - 6, x0 + unit, yb + 8, "faint", 1.2, dash="4 3")
    fig.line(x0, top - 6, x0, yb + 8, "faint", 1.2)
