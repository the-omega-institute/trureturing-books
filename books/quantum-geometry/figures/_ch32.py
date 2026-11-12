"""Shared drawing for the chapter 32 figures (not a figure itself).

Three pictures: the split of a meeting of two unit vectors A, B into a cyan line (the shadow
A·B = cos θ of B on A) and a magenta area (the parallelogram A∧B of size sin θ); the three
diagnostic axes θ (line ↔ area), η (smooth ↔ polytope) and λ (outside point C ↔ inside the field)
of §32.3, drawn as the corner of a box; and an observer moved from an outside point C into the
field, whose sight reaches 90° on a closed equator, the horizon.

Colours follow the chapter's lab pages: cyan for lines and inner products, magenta for areas and
what is cut off, violet for turns, ink for states; struck-out things in dim. Amber is not used.
"""

import math


def split(cv, ox, oy, R, theta_deg, *, area=True, drop=True, shadow_w=5.0):
    """A from (ox, oy) to the right, B at θ above it; cyan shadow of B on A and magenta A∧B.

    Returns the canvas points (A tip, B tip, shadow foot)."""
    th = math.radians(theta_deg)
    a = (ox + R, oy)
    b = (ox + R * math.cos(th), oy - R * math.sin(th))
    foot = (ox + R * math.cos(th), oy)
    # the shadow is the orthogonal projection of B on A
    assert abs((b[0] - foot[0]) * (a[0] - ox) + (b[1] - foot[1]) * (a[1] - oy)) < 1e-9
    if area:
        ab = (a[0] + b[0] - ox, a[1] + b[1] - oy)
        cv.polygon([(ox, oy), a, ab, b], "area", color="area", width=1.3, fill_opacity=0.16)
        # the parallelogram's height over A is R sin θ: its area is R² sin θ
        assert abs((oy - ab[1]) - R * math.sin(th)) < 1e-9
    if drop:
        cv.line(b[0], b[1], foot[0], foot[1], "line", 1.2, dash="3 3")
    cv.line(ox, oy, foot[0], foot[1], "line", shadow_w, cap="round", opacity=0.9)
    cv.arrow(ox, oy, a[0], a[1], "ink", 2.2, head=10)
    cv.arrow(ox, oy, b[0], b[1], "ink", 2.2, head=10)
    cv.dot(ox, oy, 3.0, "ink")
    return a, b, foot


def hexagon(cv, cx, cy, r, color):
    pts = [(cx + r * math.cos(math.radians(30 + 60 * k)), cy - r * math.sin(math.radians(30 + 60 * k)))
           for k in range(6)]
    cv.polygon(pts, None, color=color, width=1.6)


def axes(cv, ox, oy, L, *, size=13):
    """The corner of the diagnostic box: θ to the right, η into the page, λ upwards."""
    t = cv.t
    dep = math.radians(36)
    ex = (ox + L, oy)
    ey = (ox + 0.62 * L * math.cos(dep), oy - 0.62 * L * math.sin(dep))
    ez = (ox, oy - 0.9 * L)

    # θ: cyan line end at the origin, magenta area end at the tip
    mid = (ox + L / 2, oy)
    cv.line(ox, oy, mid[0], mid[1], "line", 3.2, cap="round")
    cv.line(mid[0], mid[1], ex[0] - 10, ex[1], "area", 3.2, cap="round")
    cv.arrow_head(ex[0], ex[1], 0, "area", head=10)
    cv.text(ex[0] - 2, oy + 22, t("θ 面积", "θ area"), size=size, color="area", anchor="end")
    cv.text(ox + 4, oy + 22, t("线", "line"), size=size, color="line")

    # η: smooth circle near the origin, polytope at the tip
    cv.arrow(ox, oy, ey[0], ey[1], "dim", 1.8, head=9)
    cv.circle(ox + 30, oy - 10, 6, color="dim", width=1.5)
    cv.text(ox + 42, oy - 7, t("光滑", "smooth"), size=size, color="dim")
    hexagon(cv, ey[0] + 14, ey[1] - 4, 9, "ink")
    cv.text(ey[0] + 27, ey[1] + 1, t("η 多面体", "η polytope"), size=size, color="ink")

    # λ: outside point C near the origin, inside the field at the tip
    cv.arrow(ox, oy, ez[0], ez[1], "dim", 1.8, head=9)
    cv.circle(ox - 22, oy - 0.3 * L, 9, color="dim", width=1.4)
    cv.dot(ox - 22 - 15, oy - 0.3 * L - 9, 3.0, "dim")
    cv.text(ox - 38, oy - 0.3 * L + 26, t("球外 C", "outside C"), size=size, color="dim", anchor="middle")
    cv.circle(ox - 22, ez[1] + 8, 9, color="ink", width=1.4)
    cv.dot(ox - 22, ez[1] + 8, 3.0, "ink")
    cv.text(ox + 10, ez[1] + 4, t("λ 场内", "λ inside"), size=size, color="ink")
    return ex, ey, ez


def horizon(cv, cx, cy, r, *, size=13):
    """An observer at the north pole of a sphere; the closed equator at 90° is the horizon.
    An outside point C up and to the left is struck out."""
    t = cv.t
    sp = cv.sphere(cx, cy, r, el=22)
    sp.outline(fill="line", fill_opacity=0.03)
    north = (0.0, 0.0, 1.0)
    # sight lines from the observer down to the horizon, each a quarter turn (90°)
    for az in (-60, 120, 30, 210):
        p = (math.cos(math.radians(az)), math.sin(math.radians(az)), 0.0)
        assert abs(sum(a * b for a, b in zip(north, p))) < 1e-12  # 90° from the observer
        sp.arc(north, p, "line", 1.5, dash="4 3")
    sp.great_circle(north, "area", 2.6)
    sp.dot(north, "ink", 4.6)
    sp.label(north, t("观察者", "observer"), dx=10, dy=-10, size=size, color="ink")
    cv.text(cx, cy + r + 20, t("赤道就是 90° 视界", "the equator is the 90° horizon"), size=size, color="area",
            anchor="middle")
    # the outside point C, struck out
    c = (cx - r * 0.95, cy - r * 1.25)
    ox, oy = sp.xy(north)
    cv.line(c[0], c[1], ox, oy, "faint", 1.2, dash="3 4")
    cv.dot(c[0], c[1], 4.0, "dim")
    cv.cross(c[0], c[1], 11, "dim", 2.2)
    cv.text(c[0] + 16, c[1] + 5, "*C*", size=size + 1, color="dim")
    return sp
