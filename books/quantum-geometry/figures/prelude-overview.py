"""序曲地图：迎面的射线成了一个点、平面里的两支箭头张开有向面积、旧球是新球的赤道。
The prelude at a glance: a ray met head-on becomes a point, two arrows in a plane span an oriented
area, and the old sphere is the equator of the new one.

Panel I: sight O and the source-facing geometric direction A agree (O · A = 1); incoming light
travels along −A and is seen as one point. Panel II: unit vectors A and B at the directed angle θ = 50° in the orientation Î; the
parallelogram they span has area sin θ (asserted). Panel III: S^{n−1} drawn as the equator of S^n, with
the new normal direction ±e_{n+1} as the poles (the picture for n = 2).
"""

import math

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：左边一只眼睛，青色的入射光沿 −A 从右边迎面射进眼里；A 是从眼睛指向光源的单位几何方向，与琥珀色的视线 O 同向，标着 O·A = 1；"
          "下方一个小圆是眼睛看到的样子：正中只有一个亮点。第二栏：两支单位箭头 A（灰）与 B（琥珀）从同一点出发，夹角 θ，"
          "按带箭头的小圈 Î 所示的方向从 A 转到 B；它们张成的平行四边形涂成品红，标着 A∧B = sin θ Î。"
          "第三栏：一个球，赤道画成青色，标着 S^{n−1}；球的轮廓标着 S^{n}；一根紫色的竖轴穿过两极，两极标着 ±e_{n+1}。",
    "en": "Three panels. Panel I: an eye on the left, cyan incident light arriving from the right along −A; A is the unit geometric "
          "direction from the eye toward the source, aligned with the amber line of sight O, labelled O·A = 1; a small circle below shows what the eye sees: a single "
          "bright point in the middle. Panel II: two unit arrows A (grey) and B (amber) from one point at the angle θ, turning "
          "from A to B in the sense of the small looped arrow Î; the parallelogram they span is magenta, labelled "
          "A∧B = sin θ Î. Panel III: a sphere whose equator is cyan and labelled S^{n−1}, its outline labelled S^{n}, and a "
          "violet vertical axis through the poles, labelled ±e_{n+1}.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def eye(cv, x, y, s=1.0):
    """An eye looking to the right, its pupil at (x, y)."""
    top = [(x - 22 * s + 44 * s * k / 20, y - 14 * s * math.sin(math.pi * k / 20)) for k in range(21)]
    bot = [(x - 22 * s + 44 * s * k / 20, y + 14 * s * math.sin(math.pi * k / 20)) for k in range(21)]
    cv.polyline(top + bot[::-1], "dim", 1.6, closed=True)
    cv.circle(x + 4 * s, y, 9 * s, color="dim", fill="panel", width=1.4)
    cv.dot(x + 6 * s, y, 4 * s, "ink")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: the point is a line seen head-on
    title(one, "I　点其实是线", "I  the point is a line")
    y = 92
    eye(one, 40, y)
    one.line(222, y, 66, y, "line", 3.2)
    one.arrow_head(160, y, 180, "line", head=12)
    one.text(206, y - 14, "−*A*", size=15, color="line", anchor="middle")
    one.arrow(64, y, 124, y, "now", 2.0, head=8)
    one.text(96, y + 22, "*O*", size=15, color="now", anchor="middle")
    o, a = (1.0, 0.0), (1.0, 0.0)                            # Unit sight O and source-facing A agree; the inward cyan propagation arrow is −A.
    assert o[0] * a[0] + o[1] * a[1] == 1.0
    one.text(118, 146, "*O*·*A* = 1", size=14, color="ink", anchor="middle")
    one.circle(118, 206, 34, color="dim", fill="panel", width=1.4)
    one.dot(118, 206, 5, "line", ring="bg")
    one.text(118, 260, one.t("看到：一个点", "seen: one point"), size=13, color="dim", anchor="middle")

    # ---- II: the line is a plane
    title(two, "II　线其实是面", "II  the line is a plane")
    ox, oy, R, th = 34, 190, 108, 50
    ax_, ay_ = ox + R, oy
    bx_, by_ = ox + R * math.cos(math.radians(th)), oy - R * math.sin(math.radians(th))
    two.polygon([(ox, oy), (ax_, ay_), (ax_ + bx_ - ox, ay_ + by_ - oy), (bx_, by_)], "area", color="area",
                width=1.2, fill_opacity=0.18)
    area = math.sin(math.radians(th))                          # |A ∧ B| for unit A, B
    cross = (ax_ - ox) * (oy - by_) / R / R                     # A_x B_y − A_y B_x with A = e₁
    assert abs(area - cross) < 1e-12
    two.arrow(ox, oy, ax_, ay_, "ink", 2.4)
    two.arrow(ox, oy, bx_, by_, "now", 2.6)
    two.angle(ox, oy, 40, 0, th, "*θ*", color="ink", size=14)
    two.text(ax_ - 2, ay_ + 22, "*A*", size=15, color="ink", anchor="middle")
    two.text(bx_ - 12, by_ - 4, "*B*", size=15, color="now", anchor="middle")
    cx, cy = ox + 0.62 * R + 0.5 * R * math.cos(math.radians(th)), oy - 0.5 * R * math.sin(math.radians(th))
    loop = [(cx + 15 * math.cos(math.radians(a)), cy - 12 * math.sin(math.radians(a))) for a in range(200, 200 + 290, 10)]
    two.curve_arrow(loop, "area", 1.6, head=7)
    two.text(cx + 24, cy + 5, "*Î*", size=15, color="area")
    two.text(118, 236, "*A*∧*B* = sin *θ* *Î*", size=14, color="area", anchor="middle", halo=True)

    # ---- III: the sphere is an equator of a larger sphere
    title(three, "III　球外还有球", "III  a sphere beyond")
    sp = three.sphere(118, 146, 84, el=20)
    sp.outline(fill="cyan", fill_opacity=0.04)
    sp.great_circle((0, 0, 1), "line", 2.6)
    sp.segment((0, 0, -1.22), (0, 0, 1.22), "axis", 1.8)
    sp.dot((0, 0, 1), "axis", 5)
    sp.dot((0, 0, -1), "axis", 5)
    sp.label((0, 0, 1), "+*e*_{*n*+1}", dx=10, dy=-6, size=14, color="axis")
    sp.label((0, 0, -1), "−*e*_{*n*+1}", dx=10, dy=16, size=14, color="axis")
    sp.label((1.0, 0.0, 0.0), "*S*^{*n*−1}", dx=-4, dy=24, size=14, color="line", anchor="middle", halo=True)
    three.text(36, 72, "*S*^{*n*}", size=14, color="dim", anchor="middle")
    three.text(118, 260, three.t("旧球是新球的赤道", "the old sphere is an equator"), size=13, color="dim", anchor="middle")
