"""固定极角、只扫相位，走的是纬圈；只有 θ = 90° 时，这一圈才是一张过球心的平面切出的大圆。
Fix the polar angle and sweep only the phase, and the path is a latitude circle; only at θ = 90° is
that circle the great circle cut by a plane through the centre.

The amber state sits at polar angle θ = 50°; turning the relative phase φ moves it along the cyan latitude
circle at height cos 50°. The magenta disc is the plane through the centre whose great circle is the
equator (θ = 90°). The latitude circle's radius sin 50° < 1 is asserted.
"""

import math

from tbook import figkit

SIZE = (420, 300)
ALT = {
    "zh": "一个球，竖着一根虚线的 z 轴。北半球上一个琥珀色的点在极角 θ = 50° 处，带箭头的青色纬圈从它出发绕轴一圈，标着“θ = 50°：纬圈”。"
          "球心有一张品红的圆盘，边缘是赤道大圆，标着“θ = 90°：赤道大圆”。纬圈比赤道小，不过球心。",
    "en": "A sphere with a dashed vertical z axis. On the northern half an amber point sits at polar angle θ = 50°, and a cyan "
          "latitude circle with an arrow runs from it around the axis, labelled “θ = 50°: latitude circle”. Through the "
          "centre lies a magenta disc whose rim is the equator, labelled “θ = 90°: great circle”. The latitude circle is "
          "smaller than the equator and does not pass through the centre.",
}


def draw(fig):
    t = fig.t
    sp = fig.sphere(170, 156, 116, el=22)
    sp.outline(fill="cyan", fill_opacity=0.03)
    sp.segment((0, 0, -1.15), (0, 0, 1.15), "faint", 1.3, dash="3 3")
    sp.label((0, 0, 1.15), "*z*", dx=8, dy=0, size=13, color="dim")
    sp.disc((0, 0, 1), "area", fill_opacity=0.14)
    sp.great_circle((0, 0, 1), "area", 2.2)
    theta = 50
    assert math.sin(math.radians(theta)) < 1
    sp.small_circle((0, 0, 1), theta, "line", 2.4)
    path = [figkit.sph(theta, p) for p in range(10, 100, 3)]
    (xa, ya), (xb, yb) = sp.xy(path[-2]), sp.xy(path[-1])
    sp.curve(path, "line", 3.2)
    fig.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "line", head=10)
    sp.dot(figkit.sph(theta, 10), "now", 6, ring="bg")
    sp.label(figkit.sph(theta, 10), "*φ*", dx=-22, dy=14, size=14, color="now")
    hx, hy = sp.xy(figkit.sph(theta, 60))
    fig.text(262, 40, t("*θ* = 50°：纬圈", "*θ* = 50°: latitude circle"), size=14, color="line", anchor="start")
    fig.line(266, 46, hx + 6, hy - 4, "line", 1.1)
    fig.text(262, 274, t("*θ* = 90°：赤道大圆", "*θ* = 90°: great circle"), size=14, color="area", anchor="start")
    ex, ey = sp.xy(figkit.sph(90, 70))
    fig.line(266, 262, ex + 4, ey + 4, "area", 1.1)
