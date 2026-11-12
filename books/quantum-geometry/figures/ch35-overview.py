"""第三十五章地图：光到达处开始一条有固有时的世界线、一根见证细丝铸成表行并编织成引导场、
第 0 行的读表规则读整张表也读它自己。
Chapter 35 at a glance: where light arrives a worldline with proper time begins; a witness thread is
cast into a table row and many rows weave a guiding field; Row 0, the rule that reads the table,
reads the whole table including itself.

Panel I is a spacetime diagram in units with c = 1: the light ray runs at 45° (dτ = 0) and the
worldline from the event moves at v = 0.18, its ticks spaced by equal proper time, so the coordinate
spacing is Δτ/√(1 − v²) (asserted). Panel II is schematic: the guiding field at each grid point is the
unit direction towards the target; the zigzag is a fixed sequence of trial steps whose net chord is
the stored row. Panel III is schematic: Row 0 (violet) above four stored rows (cyan) and the row now
being written (amber), with the loop of Row 0 reading the table back into itself.
"""

import math

from _ch35 import table_rows

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：时空图，品红的光线沿 45° 斜向上到达一个事件点，旁边写着 dτ = 0；从这个点起一条近乎竖直的青色世界线向上，"
          "线上按相等的固有时打着刻度；虚线是这一点的光锥。第二栏：一片青色的小箭头都指向右上的目标，灰色虚线是从 P₀ 出发、"
          "左右折返的一根见证细丝，一支粗的青色箭头是它首尾相连的净变换，即铸进表里的一行。第三栏：一张表，紫色的第 0 行在上，"
          "下面四行青色的格子，最下面一行是琥珀色虚框的新行；一支紫色的回环箭头从第 0 行出发绕过整张表又回到第 0 行，下面写着 T = T(T)。",
    "en": "Three panels. Panel I: a spacetime diagram; a magenta light ray climbs at 45° to an event, labelled dτ = 0; "
          "from that event a nearly vertical cyan worldline rises, ticked at equal proper time; dashed lines are the "
          "event's light cone. Panel II: a field of small cyan arrows all pointing to the target at upper right; a "
          "grey dashed witness thread zigzags from P₀ to it, and a thick cyan arrow, its net change from start to end, "
          "is the row cast into the table. Panel III: a table with the violet Row 0 on top, four rows of cyan cells "
          "below and, at the bottom, a new row in an amber dashed frame; a violet loop leaves Row 0, runs round the "
          "whole table and returns to Row 0, with T = T(T) written beneath.",
}

V = 0.18          # worldline speed (c = 1)
DTAU = 22.0       # proper-time tick spacing in px
GAMMA = 1 / math.sqrt(1 - V * V)


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def zigzag(x0, y0, x1, y1, n=7, amp=17.0):
    """A fixed zigzag of n trial steps from (x0, y0) to (x1, y1)."""
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy)
    px, py = -dy / L, dx / L
    offs = [0, 1.0, -0.8, 1.2, -1.0, 0.7, -0.6, 0]
    pts = []
    for i in range(n + 1):
        s = i / n
        o = offs[i] * amp
        pts.append((x0 + dx * s + px * o, y0 + dy * s + py * o))
    return pts


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: arriving on light
    title(one, "I　乘光而来", "I  arriving on light")
    ex, ey = 112, 176
    one.line(ex, ey, ex - 70, ey - 70, "faint", 1.3, dash="4 4")
    one.line(ex, ey, ex + 70, ey - 70, "faint", 1.3, dash="4 4")
    one.arrow(ex - 82, ey + 82, ex - 3, ey + 3, "area", 2.6, head=10)
    one.text(ex - 24, ey + 50, "dτ = 0", size=14, color="area", halo=True)
    # worldline at speed V: coordinate time per proper-time tick is γ·Δτ
    ux, uy = V, -1.0
    norm = math.hypot(ux, uy)
    top_t = 128.0  # coordinate time span in px
    one.line(ex, ey, ex + V * top_t, ey - top_t, "line", 2.8, cap="round")
    dt = GAMMA * DTAU
    assert abs(dt * math.sqrt(1 - V * V) - DTAU) < 1e-9
    k = 1
    while k * dt < top_t - 4:
        tx, ty = ex + V * k * dt, ey - k * dt
        nx, ny = -uy / norm, ux / norm
        one.line(tx - nx * 7, ty - ny * 7, tx + nx * 7, ty + ny * 7, "line", 2.0)
        k += 1
    one.text(ex + V * top_t + 12, ey - top_t + 18, "τ", size=15, color="line", italic=True)
    one.dot(ex, ey, 5.0, "ink", ring="bg")
    one.text(ex + 12, ey + 8, one.t("脉冲", "pulse"), size=13, color="dim")
    # small axes, bottom right
    ax0, ay0 = 196, 252
    one.arrow(ax0, ay0, ax0, ay0 - 30, "dim", 1.3, head=7)
    one.arrow(ax0, ay0, ax0 + 26, ay0, "dim", 1.3, head=7)
    one.text(ax0 - 6, ay0 - 30, "*t*", size=13, color="dim", anchor="end", middle=True)
    one.text(ax0 + 26, ay0 + 16, "*x*", size=13, color="dim", anchor="middle")

    # ---- II: a thread cast into a row, rows woven into a field
    title(two, "II　编线成场", "II  threads into a field")
    sx, sy = 194, 78
    p0 = (34, 238)
    for gx in range(26, 226, 30):
        for gy in range(64, 262, 30):
            dx, dy = sx - gx, sy - gy
            L = math.hypot(dx, dy)
            if L < 24:
                continue
            two.arrow(gx, gy, gx + 13 * dx / L, gy + 13 * dy / L, "line", 1.3, head=5, opacity=0.5)
    pts = zigzag(p0[0], p0[1], sx, sy)
    two.polyline(pts, "dim", 1.8, dash="5 4")
    for x, y in pts[1:-1]:
        two.dot(x, y, 2.8, "dim")
    two.arrow(p0[0], p0[1], sx - 5, sy + 4, "line", 3.4, head=11)
    two.dot(p0[0], p0[1], 4.4, "ink", ring="bg")
    two.text(p0[0] + 4, p0[1] + 22, "*P*₀", size=14, color="ink", anchor="middle")
    two.dot(sx, sy, 5.4, "ink", ring="bg")
    two.text(sx, sy - 14, two.t("目标", "target"), size=13, color="ink", anchor="middle", halo=True)

    # ---- III: Row 0 reads the table, itself included
    title(three, "III　表读表", "III  the table reads itself")
    cols, rows, cw, rh = 6, 4, 22, 20
    x0, y0 = 44, 54

    def pattern(r, j):
        return 0.12 + 0.5 * abs(math.cos(math.pi * (j + 0.5) * r / cols))

    centres = table_rows(three, x0, y0, cols, rows, cw, rh, pattern=pattern)
    ny = centres[-1] + rh / 2 + 2
    three.rect(x0, ny, cols * cw, rh, color="now", width=1.6, dash="4 3")
    three.text(x0 - 8, ny + rh / 2, "+", size=14, color="now", anchor="end", middle=True, weight=600)
    # the loop: out of Row 0 on the right, down past every row, back up and into Row 0
    right = x0 + cols * cw
    top, bot = centres[0], ny + rh / 2

    def bez(p0, p1, p2, n=30):
        return [((1 - s) ** 2 * p0[0] + 2 * (1 - s) * s * p1[0] + s * s * p2[0],
                 (1 - s) ** 2 * p0[1] + 2 * (1 - s) * s * p1[1] + s * s * p2[1]) for s in (i / n for i in range(n + 1))]

    down = bez((right + 2, top), (right + 16, (top + bot) / 2), (right + 12, bot + 4))
    up = bez((right + 12, bot + 4), (right + 84, (top + bot) / 2), (right + 9, top - 5))
    three.curve_arrow(down + up[1:], "argued", 2.2, head=9)
    three.text(x0 + cols * cw / 2, bot + 42, "*T* = *T*(*T*)", size=16, color="argued", anchor="middle", weight=600)
