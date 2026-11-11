"""第十章地图：换个转序就停在别处；二维球面梳不平而旋转器球处处有标架；一张完整的复格拉姆表。
Chapter 10 at a glance: change the order of two turns and the pole lands elsewhere; the two-sphere cannot be
combed while the rotor sphere carries a frame everywhere; one complete table of complex inner products.

Panel I turns N by 90° about y and then about x (it ends at +X), and about x and then about y (it ends at −Y);
the script asserts both end points and that they are 90° apart. Panel II draws v(p) = e₃ − (p·e₃)p on the
two-sphere, which vanishes only at the poles (the hairy ball theorem is a literature result, so the zeros are
marked violet), next to a schematic circle standing for S³ with a frame at every point. Panel III is the Gram
matrix of the octant states, computed and asserted against the chapter's entries.
"""

import math

from tbook import figkit
from _ch10 import OCTANT, R2, gram, title

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一颗球，两条琥珀色的弧从北极 N 出发：先绕 Y 再绕 X 的一条落到 +X，先绕 X 再绕 Y 的一条落到 −Y，两个终点之间的虚线弧标 90°。"
          "第二栏：左边一颗球上画满青色的小箭头，它们都指向北极方向，越靠近两极越短，南北两极各有一个紫色的圈标出零点；"
          "右边一个虚线的小圆示意旋转器球 S³，圆上每一点都带着一对紫色的标架箭头。"
          "第三栏：一张 3 × 3 的表，行列都是 ψ₀、ψ₁、ψ₂；对角线是 1，其余格子是青色的内积 1/√2、(1+i)/2、(1−i)/2；表下一枚绿色标签“LEAN ✓ B∗B = A∗A ⇒ B = UA”。",
    "en": "Three panels. Panel I: a sphere; two amber arcs leave the north pole N: turning about Y and then X lands at +X, turning "
          "about X and then Y lands at −Y, and a dashed arc between the two ends is marked 90°. Panel II: on the left a sphere "
          "covered with small cyan arrows, all pointing towards the north pole and shorter near the poles, with a violet ring "
          "marking the zero at each pole; on the right a small dashed circle stands for the rotor sphere S³, with a pair of "
          "violet frame arrows at every point. Panel III: a 3 × 3 table with rows and columns ψ₀, ψ₁, ψ₂; the diagonal is 1 "
          "and the other cells are the cyan inner products 1/√2, (1+i)/2, (1−i)/2; a green tag below reads “LEAN ✓ B∗B = A∗A ⇒ B = UA”.",
}


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)
    X, Y, Z = (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)

    # ---- I: the order of two turns
    title(one, "I　换个转序，停在别处", "I  swap the order, land elsewhere")
    sp = one.sphere(118, 160, 86, az=70, el=22)
    sp.outline()
    sp.great_circle(Z, "faint", 1.1)
    yx = figkit.rotate(figkit.rotate(Z, Y, 90), X, 90)
    xy = figkit.rotate(figkit.rotate(Z, X, 90), Y, 90)
    assert max(abs(yx[k] - X[k]) for k in range(3)) < 1e-12               # R_x R_y e₃ = e₁
    assert max(abs(xy[k] + Y[k]) for k in range(3)) < 1e-12               # R_y R_x e₃ = −e₂
    assert abs(figkit.dot3(yx, xy)) < 1e-12                                 # 90° apart
    sp.arc(yx, xy, "dim", 1.4, dash="4 3")
    sp.path([Z, X], "now", 2.4, arrow=True)
    sp.path([Z, (0.0, -1.0, 0.0)], "now", 2.4, arrow=True)
    sp.dot(Z, "dim", 4, ring="bg")
    sp.dot(X, "now", 5, ring="bg")
    sp.dot((0.0, -1.0, 0.0), "now", 5, ring="bg")
    sp.label(Z, "*N*", dx=8, dy=-6, size=15, color="dim")
    sp.label(X, "+*X*", dx=10, dy=16, size=15, color="now")
    sp.label((0.0, -1.0, 0.0), "−*Y*", dx=-8, dy=4, size=15, color="now", anchor="end", halo=True)
    sp.label(figkit.slerp(X, (0.0, -1.0, 0.0), 0.5), "90°", dx=0, dy=20, size=13, color="dim", anchor="middle",
             halo=True)
    sp.label(figkit.slerp(Z, X, 0.5), t2(one, "先 *Y* 后 *X*", "*Y* then *X*"), dx=-8, dy=10, size=13, color="now", anchor="end",
             halo=True)
    sp.label(figkit.slerp(Z, (0.0, -1.0, 0.0), 0.45), t2(one, "先 *X* 后 *Y*", "*X* then *Y*"), dx=-10, dy=-4,
             size=13, color="now", anchor="end", halo=True)

    # ---- II: combing S² against framing S³
    title(two, "II　梳不平的球与旋转器球", "II  uncombable sphere, rotor sphere")
    sp = two.sphere(78, 150, 62, el=18)
    sp.outline()
    for th in (25, 50, 75, 100, 125, 150):
        for ph in range(0, 360, 30):
            p = figkit.sph(th, ph)
            if sp.proj(p)[2] < 0.05:
                continue
            c = figkit.dot3(p, Z)
            v = tuple(Z[i] - c * p[i] for i in range(3))
            assert abs(figkit.dot3(v, p)) < 1e-12
            q = tuple(p[i] + 0.3 * v[i] for i in range(3))
            (x0, y0), (x1, y1) = sp.xy(p), sp.xy(q)
            if math.hypot(x1 - x0, y1 - y0) > 4:
                two.arrow(x0, y0, x1, y1, "line", 1.4, head=5)
    for pole in (Z, (0.0, 0.0, -1.0)):
        c = figkit.dot3(pole, Z)
        assert all(abs(Z[i] - c * pole[i]) < 1e-12 for i in range(3))   # v vanishes at both poles
    x, y = sp.xy(Z)
    two.circle(x, y, 7, color="argued", width=2.0)
    x, y = sp.xy((0.0, 0.0, -1.0))
    two.circle(x, y, 7, color="argued", width=2.0, dash="3 2")
    two.text(78, 240, "*S*^{2}", size=15, anchor="middle")
    two.text(78, 260, two.t("必有零点", "must vanish"), size=13, color="argued", anchor="middle")

    cx, cy, r = 186, 150, 34
    two.circle(cx, cy, r, color="dim", width=1.3, dash="4 3")
    for k in range(8):
        a = math.radians(45 * k + 22.5)
        px, py = cx + r * math.cos(a), cy - r * math.sin(a)
        tx, ty = -math.sin(a), -math.cos(a)                  # tangent (counter-clockwise on the page)
        two.arrow(px, py, px + 13 * tx, py + 13 * ty, "axis", 1.4, head=5)
        two.arrow(px, py, px + 11 * math.cos(a), py - 11 * math.sin(a), "axis", 1.4, head=5)
    two.text(cx, 240, "*S*^{3}", size=15, anchor="middle")
    two.text(cx, 260, two.t("处处有标架", "no zeros"), size=13, color="axis", anchor="middle")

    # ---- III: the complete complex Gram table
    title(three, "III　完整的复内积表", "III  the full table of overlaps")
    G = gram(OCTANT)
    want = [[1, R2, R2], [R2, 1, (1 + 1j) / 2], [R2, (1 - 1j) / 2, 1]]
    assert all(abs(G[i][j] - want[i][j]) < 1e-12 for i in range(3) for j in range(3))
    text = [["1", "1/√2", "1/√2"], ["1/√2", "1", "(1+i)/2"], ["1/√2", "(1−i)/2", "1"]]
    names = ("ψ_{0}", "ψ_{1}", "ψ_{2}")
    x0, y0, c = 50, 62, 60
    for i in range(3):
        three.text(x0 - 12, y0 + c * i + c / 2, names[i], size=14, color="dim", anchor="end", middle=True)
        three.text(x0 + c * i + c / 2, y0 - 10, names[i], size=14, color="dim", anchor="middle")
        for j in range(3):
            three.rect(x0 + c * j, y0 + c * i, c, c, color="edge", fill="line" if i != j else None,
                       fill_opacity=0.10, width=1.1)
            three.text(x0 + c * j + c / 2, y0 + c * i + c / 2, text[i][j], size=13 if i != j else 14,
                       color="line" if i != j else "dim", anchor="middle", middle=True)
    three.chip(118, 268, "LEAN ✓  B∗B = A∗A ⇒ B = UA", "lean", anchor="middle")


def t2(cv, zh, en):
    return cv.t(zh, en)
