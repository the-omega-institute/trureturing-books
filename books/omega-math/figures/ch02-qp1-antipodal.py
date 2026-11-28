"""Homogeneous Cayley coordinates mark rational points on the ambient real circle."""

from fractions import Fraction

SIZE = (358, 430)
ALT = {
    "zh": "圆线是实圆。凯莱映射把 [0:1] 送到右端的过去锚点 [κ=1, s=0]，把 [1:1] 送到上方自对偶的现在锚点 "
          "[κ=s=1/2]，把 [1:0] 送到左端的未来对径点 [κ=0, s=1]。从左端出发，经过 (0, 1/2) 的弦"
          "把 [1:2] 送到 (3/5, 4/5)。",
    "en": "The outline is the real circle. The Cayley map sends [0:1] to the past anchor on the right (κ=1, s=0), [1:1] to the "
          "self-dual present at the top (κ=s=1/2), and [1:0] to the future antipode on the left (κ=0, s=1). "
          "The chord from the antipode through (0, 1/2) sends [1:2] to (3/5, 4/5).",
}


def cayley(p, q):
    norm = p * p + q * q
    return Fraction(q * q - p * p, norm), Fraction(2 * p * q, norm)


def draw(fig):
    t = fig.t
    cx, cy, radius = 179, 178, 96

    def point(u, v):
        return cx + radius * u, cy - radius * v

    past = cayley(0, 1)
    present = cayley(1, 1)
    future = cayley(1, 0)
    example = cayley(1, 2)
    assert (past, present, future) == ((1, 0), (0, 1), (-1, 0))
    assert example[0] ** 2 + example[1] ** 2 == 1
    assert example[1] == Fraction(1, 2) * (example[0] + 1)

    fig.circle(cx, cy, radius, color="ink", width=1.4, opacity=0.45)
    fig.arc(cx, cy, radius, 0, 180, "cyan", 2.4)
    fig.line(*point(*future), *point(*past), "ink", 1, opacity=0.28)
    fig.line(cx, cy + radius, cx, cy - radius, "ink", 1, opacity=0.28)
    fig.arrow(*point(*future), *point(*example), "violet", 2.2, head=7)
    fig.dot(*point(0, Fraction(1, 2)), 3.2, "violet")
    fig.text(171, 124, "(0, 1/2)", size=13, anchor="end", color="violet")
    fig.line(*point(*example), 259, 96, "violet", 1.2)
    fig.text(264, 92, "[1:2]", size=14, color="violet")
    fig.text(264, 111, "(3/5, 4/5)", size=13, color="violet")

    fig.dot(*point(*present), 5, "amber")
    fig.text(cx, 22, t("现在 · 自对偶赤道", "Present · self-dual equator"), size=15, anchor="middle", color="amber", weight=600)
    fig.text(cx, 46, "[1:1]", size=15, anchor="middle")
    fig.text(cx, 68, "κ = s = 1/2", size=13, anchor="middle")

    for anchor, title, coord, pair in (
        (future, t("未来 · 对径闭合", "Future · antipodal closure"), "[1:0]  (∞)", "κ = 0,  s = 1"),
        (past, t("过去", "Past"), "[0:1]", "κ = 1,  s = 0"),
    ):
        x, y = point(*anchor)
        label_x = 108 if anchor == future else 266
        leader_x = x + (11 if anchor == past else -11)
        fig.polyline([(x, y), (leader_x, y + 22), (leader_x, 278), (label_x, 278)], "ink", 1.1, opacity=0.6)
        fig.dot(x, y, 4, "cyan")
        fig.text(label_x, 299, title, size=14, anchor="middle", weight=600)
        fig.text(label_x, 324, coord, size=15, anchor="middle")
        fig.text(label_x, 347, pair, size=13, anchor="middle")

    fig.line(25, 365, 333, 365, "ink", 1, opacity=0.28)
    fig.text(cx, 389, t("ℚP¹ ↔ S¹(ℚ) · 凯莱弦", "ℚP¹ ↔ S¹(ℚ) · Cayley chord"), size=15, anchor="middle", weight=600)
    fig.text(cx, 413, "[P:Q] ↦ ((Q² − P²)/(P² + Q²), 2PQ/(P² + Q²))", size=13, anchor="middle", color="violet")
