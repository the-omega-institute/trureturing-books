"""平坦的三角形合不成球：五个 60° 的角围一圈留下 60° 的缺口，二十面体有 12 个这样的顶点，缺口加起来是 720°（第二十一章 §21.4）。
Flat triangles do not close into a sphere: five 60° corners around a vertex leave a 60° gap, and the
icosahedron has 12 such vertices, so the gaps add up to 720° (chapter 21, §21.4).

The left drawing unfolds the five faces around one vertex into the plane; the right one is the regular
icosahedron (V − E + F = 12 − 30 + 20 = 2, checked in _ch21). Literature result (Descartes, Euler).
"""

import math

from _ch21 import icosahedron, rot

SIZE = (540, 280)
ALT = {
    "zh": "左边：一个顶点周围摊平了五个等边三角形，每个角 60°，五个合起来 300°；下方剩下一块 60° 的品红缺口，标着“角亏 60°”。"
          "右边：一个正二十面体的线框，十二个顶点都点成品红，下面写着 12 × 60° = 720°。右上角标着文献结果。",
    "en": "Left: five equilateral triangles laid flat around one vertex, each corner 60°, together 300°; below them a magenta "
          "gap of 60° remains, labelled “defect 60°”. Right: a wireframe regular icosahedron with all twelve vertices dotted "
          "magenta, and beneath it 12 × 60° = 720°. A tag in the top right marks this as a literature result.",
}


def draw(fig):
    t = fig.t
    # ---- one vertex, unfolded
    vx, vy, s = 136, 128, 104
    gap0, gap1 = 240, 300                                     # the missing wedge points down
    corners = [gap1 + 60 * k for k in range(6)]
    assert corners[-1] - 360 == gap0 and 5 * 60 == 300 and 360 - 300 == 60
    P = lambda a: (vx + s * math.cos(math.radians(a)), vy - s * math.sin(math.radians(a)))
    for a, b in zip(corners, corners[1:]):
        fig.polygon([(vx, vy), P(a), P(b)], "panel", color="dim", width=1.4, fill_opacity=1)
    fig.polygon([(vx, vy), P(gap0), P(gap1)], "area", color="area", width=1.6, fill_opacity=0.22, dash="5 4")
    fig.dot(vx, vy, 5, "area", ring="bg")
    for a in (gap1 + 30, gap1 + 90, gap1 + 150, gap1 + 210, gap1 + 270):
        r = 30
        fig.text(vx + r * math.cos(math.radians(a)), vy - r * math.sin(math.radians(a)), "60°", size=12, color="dim",
                 anchor="middle", middle=True)
    fig.text(vx, vy + 66, "60°", size=14, color="area", weight=600, anchor="middle", middle=True)
    fig.text(vx, 262, t("5 × 60° = 300°，角亏 60°", "5 × 60° = 300°, defect 60°"), size=14, color="area", anchor="middle")

    # ---- the icosahedron
    verts, edges = icosahedron()
    cx, cy, R = 410, 130, 98
    pv = [rot(v, math.radians(-14), math.radians(20)) for v in verts]
    xy = [(cx + R * p[0], cy - R * p[2]) for p in pv]
    for i, j in edges:
        front = pv[i][1] + pv[j][1] < 0.2                     # the half nearer the reader (−y towards us)
        fig.line(*xy[i], *xy[j], "dim" if front else "faint", 1.5 if front else 1.1, dash=None if front else "3 3")
    for (x, y), p in zip(xy, pv):
        fig.dot(x, y, 5.2 if p[1] < 0.2 else 4, "area", ring="bg")
    fig.text(cx, 262, "12 × 60° = 720°", size=14, color="area", weight=600, anchor="middle")
    assert 12 * 60 == 720
    fig.chip(534, 22, t("文献结果", "literature"), "argued", anchor="end")
