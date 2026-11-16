"""三维克利福德代数的八块基片按阶数分成 1 + 3 + 3 + 1：一个点、三条线、三块面、一个体（附录 B §B.1）。
The eight blades of Cl₃,₀ split by grade into 1 + 3 + 3 + 1: a point, three lines, three planes, one volume
(appendix B, B.1).

The script counts the masks of each grade (popcount) and squares every blade with _appb.blade_mul; the counts
must be the binomial coefficients and the squares the column of the B.1 table (+1, +1, −1, −1).
Colours: cyan for lines (vectors), magenta for areas (bivectors), violet for the volume (pseudoscalar).
"""

from math import comb

from _appb import NAME, ORDER, blade_mul, grade

SIZE = (548, 262)
WRAP = True
ALT = {
    "zh": "四栏，阶数 0 到 3。阶数 0 标量：一个点 1，维数 1，平方 +1。阶数 1 向量：从同一点出发的三支青色箭头 e₁、e₂、e₃，"
          "维数 3，平方 +1。阶数 2 双向量：三块品红的有向面 e₁₂、e₁₃、e₂₃，各由两条坐标轴张成，维数 3，平方 −1。"
          "阶数 3 伪标量：一个紫色的单位立方体 e₁₂₃，维数 1，平方 −1。合计 1 + 3 + 3 + 1 = 8。",
    "en": "Four panels for grades 0 to 3. Grade 0, scalar: a single point 1; dimension 1, square +1. Grade 1, vectors: three "
          "cyan arrows e₁, e₂, e₃ from one point; dimension 3, square +1. Grade 2, bivectors: three magenta oriented faces "
          "e₁₂, e₁₃, e₂₃, each spanned by two coordinate axes; dimension 3, square −1. Grade 3, pseudoscalar: a violet unit "
          "cube e₁₂₃; dimension 1, square −1. In all 1 + 3 + 3 + 1 = 8.",
}

PW, PH = 128, 262
E = {1: (54, 0), 2: (28, -22), 4: (0, -54)}     # e₁ right, e₂ into the page, e₃ up
TITLES = [("标量", "scalar"), ("向量", "vectors"), ("双向量", "bivectors"), ("伪标量", "pseudoscalar")]
ROLE = ["ink", "line", "area", "axis"]


def corner(o, m):
    x, y = o
    for b, (dx, dy) in E.items():
        if m & b:
            x, y = x + dx, y + dy
    return x, y


def draw(fig):
    blades = {k: [m for m in ORDER if grade(m) == k] for k in range(4)}
    squares = {}
    for k, ms in blades.items():
        assert len(ms) == comb(3, k)
        sq = {blade_mul(m, m)[0] for m in ms}
        assert len(sq) == 1
        squares[k] = sq.pop()
    assert [squares[k] for k in range(4)] == [1, 1, -1, -1]
    assert sum(len(ms) for ms in blades.values()) == 8

    panels = fig.row([PW] * 4, PH, gap=12)
    for k, p in enumerate(panels):
        t = p.t
        p.text(PW / 2, 20, t(f"阶数 {k}", f"grade {k}"), size=14, weight=600, anchor="middle")
        p.text(PW / 2, 39, t(*TITLES[k]), size=13, color=ROLE[k] if k else "dim", anchor="middle")
        o = (PW / 2 - 40, 150)
        if k == 0:
            p.dot(PW / 2, 118, 6, "ink", ring="bg")
            p.text(PW / 2, 100, "1", size=15, anchor="middle")
        elif k == 1:
            for m in blades[1]:
                x, y = corner(o, m)
                p.arrow(*o, x, y, "line", 2.4)
            p.text(corner(o, 1)[0] + 4, o[1] + 18, NAME[1], size=14, color="line", anchor="middle")
            x, y = corner(o, 2)
            p.text(x + 8, y - 4, NAME[2], size=14, color="line")
            x, y = corner(o, 4)
            p.text(x - 6, y + 6, NAME[4], size=14, color="line", anchor="end")
            p.dot(*o, 3, "ink")
        elif k == 2:
            for m in blades[2]:
                a, b = [bit for bit in E if m & bit]
                pts = [o, corner(o, a), corner(o, a | b), corner(o, b)]
                p.polygon(pts, "area", fill_opacity=0.16, color="area", width=1.4)
            # each label sits outside its own face, beside the middle of an edge no other face shares
            x1, y1 = corner(o, 1)
            x3, y3 = corner(o, 3)
            p.text((x1 + x3) / 2 + 8, (y1 + y3) / 2 + 12, NAME[3], size=13, color="area", halo=True)   # e₁₂: the floor, right of its far edge
            x5, y5 = corner(o, 5)
            p.text(x5 + 5, y5 + 16, NAME[5], size=13, color="area", halo=True)            # e₁₃: the front, right of its right edge
            x4, y4 = corner(o, 4)
            x6, y6 = corner(o, 6)
            p.text((x4 + x6) / 2 - 2, (y4 + y6) / 2 - 10, NAME[6], size=13, color="area", anchor="end", halo=True)   # e₂₃: the side, above its top edge
        else:
            for m in range(8):
                for bit in E:
                    if not m & bit:
                        hidden = m == 2 or (m | bit) == 2
                        p.line(*corner(o, m), *corner(o, m | bit), "axis", 1.2 if hidden else 1.8,
                               dash="4 3" if hidden else None)
            hull = [corner(o, m) for m in (0, 1, 3, 7, 6, 4)]
            p.polygon(hull, "axis", fill_opacity=0.18)
            x, y = corner(o, 7)
            p.text(PW / 2, y - 10, NAME[7] + " = I_{3}", size=13, color="axis", anchor="middle", halo=True)
        p.text(PW / 2, 210, t(f"维数 {len(blades[k])}", f"dimension {len(blades[k])}"), size=13, color="dim",
               anchor="middle")
        sign = "+1" if squares[k] > 0 else "−1"
        p.text(PW / 2, 236, t(f"平方 {sign}", f"square {sign}"), size=14, weight=600,
               color="cyan" if squares[k] > 0 else "magenta", anchor="middle")
