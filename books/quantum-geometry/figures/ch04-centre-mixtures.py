"""球心不记配方：南北各半与东西各半混出同一个 ½I（第四章 §4.3）。
The centre keeps no recipe: half north with half south and half east with half west mix to the same ½I
(chapter 4, §4.3).

An equal mixture of two states has Bloch vector (r₁ + r₂)/2, the midpoint of the chord between them; for
every antipodal pair that midpoint is the centre (asserted for the three pairs drawn).
"""

import math

from _ch04 import ball

SIZE = (440, 330)
ALT = {
    "zh": "布洛赫球的竖直截面。北极与南极之间、东极与西极之间各连一条弦，另有一条斜的虚线弦连着另一对对径点；每条弦两端各标 ½。"
          "三条弦的中点都落在同一处：紫色的球心 ½I。",
    "en": "The vertical cross-section of the Bloch ball. One chord joins the north and south poles, another the east and west "
          "poles, and a dashed tilted chord joins a third antipodal pair; each end is marked ½. All three chords have their "
          "midpoint at the same place: the violet centre ½I.",
}

PAIRS = [((0.0, 1.0), (0.0, -1.0)), ((1.0, 0.0), (-1.0, 0.0)),
         ((math.cos(math.radians(30)), math.sin(math.radians(30))), (-math.cos(math.radians(30)), -math.sin(math.radians(30))))]


def draw(fig):
    t = fig.t
    cx, cy, R = 220, 168, 122
    P = ball(fig, cx, cy, R, axes=False, labels=False, shell="ink")
    for i, (u, v) in enumerate(PAIRS):
        mid = ((u[0] + v[0]) / 2, (u[1] + v[1]) / 2)
        assert abs(mid[0]) < 1e-12 and abs(mid[1]) < 1e-12
        (x0, y0), (x1, y1) = P(*u), P(*v)
        fig.line(x0, y0, x1, y1, "dim", 2.0 if i < 2 else 1.4, dash=None if i < 2 else "5 4")
        fig.dot(x0, y0, 5.0, "ink", ring="bg")
        fig.dot(x1, y1, 5.0, "ink", ring="bg")
    fig.dot(cx, cy, 7.5, "axis", ring="bg")
    fig.text(cx + 14, cy + 26, "½*I*", size=16, color="axis", weight=600, halo=True)

    lab = [((0, 1), t("北 ½", "N ½"), 0, -14, "middle"), ((0, -1), t("南 ½", "S ½"), 0, 26, "middle"),
           ((1, 0), t("东 ½", "E ½"), 12, 5, "start"), ((-1, 0), t("西 ½", "W ½"), -12, 5, "end")]
    for (x, z), s, dx, dy, anchor in lab:
        px, py = P(x, z)
        fig.text(px + dx, py + dy, s, size=14, color="ink", anchor=anchor)
    u, v = PAIRS[2]
    for (x, z), dx, anchor in ((u, 12, "start"), (v, -12, "end")):
        px, py = P(x, z)
        fig.text(px + dx, py + (-4 if dx > 0 else 14), "½", size=14, color="dim", anchor=anchor)
