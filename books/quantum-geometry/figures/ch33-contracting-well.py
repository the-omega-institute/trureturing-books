"""只有收缩的势阱能把受扰的观察者拉回原处：平坦的桌面让它漂走，倒扣的碗让它滑落。
Only a contracting well pulls a perturbed observer back: a flat table lets it drift, an inverted bowl
lets it fall away.

Schematic (MODEL). Each profile carries a marble's iterates in normalised position: on the flat table
a fixed sequence of kicks (0.5, −0.25, 0.7) from −0.7; on the inverted bowl x ↦ 1.7·x from
0.18; in the well x ↦ 0.45·x from 0.8, towards the window W + u_i at the bottom. The current position
is amber, the earlier ones are grey rings.
"""

from _ch33 import iterates, profile

SIZE = (460, 216)
ALT = {
    "zh": "三条剖面并排。左：平坦的桌面，小球在一串左右扰动后漂离起点。中：倒扣的碗，小球从顶点附近出发，每一步离顶点更远，"
          "滑向碗边。右：碗形的势阱，小球被踢到右坡上，每一步离碗底的距离缩到不足一半，落向碗底那段青色的接受窗 W + u_i。"
          "每条剖面上，琥珀色的是小球现在的位置，灰色空心圈是之前的位置。",
    "en": "Three profiles side by side. Left: a flat table; after a sequence of kicks to the left and right the marble "
          "has drifted away from where it started. Middle: an inverted bowl; starting near the top, the marble moves "
          "farther from it at every step, towards the rim. Right: a bowl-shaped well; kicked up the right slope, the "
          "marble cuts its distance from the bottom to less than half at every step, towards the short cyan window W + u_i there. On "
          "each profile the amber marble is where it is now, the grey rings where it was.",
}


def draw(fig):
    t = fig.t
    hw, depth = 68, 70
    cols = (
        (80, 140, "flat", t("平坦：漂走", "flat: drifts")),
        (230, 82, "hill", t("倒扣：滑落", "inverted: falls")),
        (380, 150, "well", t("势阱：拉回", "well: pulls back")),
    )
    for cx, cy, kind, label in cols:
        pts = profile(fig, cx, cy, hw, depth, kind, r=5.5, labels=(kind == "well"))
        assert len(pts) == len(iterates(kind, 4))
        fig.text(cx, 206, label, size=14, color="ink", anchor="middle", weight=600)
