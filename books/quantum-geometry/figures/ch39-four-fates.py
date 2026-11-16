"""十六个二元分式自映射：十个退化，六个非退化；六个里只有判别式 Δ = 5 的两个“存活”。
The sixteen binary fractional self-maps m = (a b; c d) with a, b, c, d ∈ {0, 1}: ten are degenerate
(det m = ad − bc = 0) and six are not; of the six, exactly two have the fate .live (Δ = 5), the golden
family x = 1 + 1/x and x = 1/(x + 1).

The classification is the one of self_application_four_fates (section 39.1, LEAN ✓): fixed-point
coefficients (c, d − a, −b), discriminant Δ = (d − a)² + 4bc; .empty for (0, 0, 0), .dead for
(0, 0, −1), .collapse for Δ ∈ {0, 4} otherwise, .live for Δ = 5. The script recomputes every fate,
checks that each non-degenerate map has exactly one, and checks the counts 10, 6, 1, 1, 2, 2 and that
.live is exactly the φ family.

Colours: degenerate maps dim and faint; the non-degenerate ones ink; the two that live cyan; the
LEAN ✓ tag green, since the chapter cites self_application_four_fates with lean=.
"""

from itertools import product

SIZE = (360, 532)
ALT = {
    "zh": "四行四列共十六个二阶 0–1 矩阵。十个行列式为零的画成灰色，写着 det = 0；"
          "另外六个用墨色框出，各写一种命运：单位阵是 .empty，上三角阵 (1 1; 0 1) 是 .dead，"
          "对换阵 Δ = 4 与下三角阵 Δ = 0 是 .collapse，(1 1; 1 0) 与 (0 1; 1 1) 两个青色框写着 .live、Δ = 5。"
          "下方写着 16 → 6 → 2，两个存活的映射是 x = 1 + 1/x 与 x = 1/(x + 1)，旁边一个绿色的 LEAN ✓ 标记。",
    "en": "Sixteen 2 × 2 matrices with entries 0 or 1, in four rows of four. The ten with determinant zero are grey and "
          "marked det = 0; the other six are framed in ink and each names its fate: the identity is .empty, the upper "
          "triangle (1 1; 0 1) is .dead, the swap with Δ = 4 and the lower triangle with Δ = 0 are .collapse, and the two "
          "cyan frames, (1 1; 1 0) and (0 1; 1 1), read .live and Δ = 5. Below: 16 → 6 → 2, the two maps that live are "
          "x = 1 + 1/x and x = 1/(x + 1), with a green LEAN ✓ tag.",
}


def fate(a, b, c, d):
    """HasFate of self_application_four_fates, returned as the list of fates that hold."""
    coeffs, disc = (c, d - a, -b), (d - a) ** 2 + 4 * b * c
    out = []
    if coeffs == (0, 0, 0):
        out.append("empty")
    if coeffs == (0, 0, -1):
        out.append("dead")
    if disc in (0, 4) and coeffs not in ((0, 0, 0), (0, 0, -1)):
        out.append("collapse")
    if disc == 5:
        out.append("live")
    return out, disc


MAPS = list(product((0, 1), repeat=4))
NONDEG = [m for m in MAPS if m[0] * m[3] - m[1] * m[2] != 0]
FATES = {m: fate(*m) for m in NONDEG}
assert len(MAPS) == 16 and len(NONDEG) == 6
assert all(len(f) == 1 for f, _ in FATES.values())
COUNT = {k: sum(1 for f, _ in FATES.values() if f == [k]) for k in ("empty", "dead", "collapse", "live")}
assert COUNT == {"empty": 1, "dead": 1, "collapse": 2, "live": 2}
PHI = {(1, 1, 1, 0), (0, 1, 1, 1)}
assert {m for m, (f, _) in FATES.items() if f == ["live"]} == PHI
assert all(FATES[m][1] == 5 for m in PHI)


def draw(fig):
    fig.text(180, 22, fig.t("十六个二元自映射的命运", "The fates of the sixteen binary self-maps"), size=15, weight=600,
             anchor="middle")
    w, h, g, x0, y0 = 82, 96, 8, 2, 40
    for k, (a, b, c, d) in enumerate(MAPS):
        x, y = x0 + (k % 4) * (w + g), y0 + (k // 4) * (h + g)
        m = (a, b, c, d)
        live = m in PHI
        if m not in FATES:
            fig.rect(x, y, w, h, color="faint", rx=5, width=1.2, dash="3 3")
            col = "dim"
        else:
            fig.rect(x, y, w, h, color="line" if live else "ink", fill="line" if live else "panel",
                     fill_opacity=0.14 if live else None, rx=5, width=2.2 if live else 1.5)
            col = "ink"
        # the matrix, with thin brackets
        mx, my = x + w / 2, y + 16
        for side in (-1, 1):
            bx = mx + side * 22
            fig.polyline([(bx - side * 4, my), (bx, my), (bx, my + 34), (bx - side * 4, my + 34)], col, 1.2)
        fig.text(mx, my + 14, f"{a} {b}", size=14, color=col, anchor="middle", mono=True)
        fig.text(mx, my + 30, f"{c} {d}", size=14, color=col, anchor="middle", mono=True)
        if m not in FATES:
            fig.text(mx, y + 76, "det = 0", size=12, color="dim", anchor="middle", mono=True)
        else:
            (f,), disc = FATES[m]
            role = "line" if live else "ink"
            fig.text(mx, y + 70, "." + f, size=12, color=role, anchor="middle", mono=True, weight=600)
            if f in ("collapse", "live"):
                fig.text(mx, y + 87, f"Δ = {disc}", size=12, color=role if live else "dim", anchor="middle")
    yb = y0 + 4 * (h + g) + 20
    fig.text(180, yb, fig.t("16 个 → 非退化 6 个 → 存活 2 个", "16 maps → 6 non-degenerate → 2 live"), size=14,
             anchor="middle")
    fig.text(180, yb + 22, "*x* = 1 + 1/*x*　　*x* = 1/(*x* + 1)", size=14, color="line", anchor="middle")
    fig.chip(180, yb + 50, "LEAN ✓", "lean", size=13, anchor="middle")
