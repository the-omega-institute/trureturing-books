"""同一张 3×3 列表、两种扭转：有不动点的扭转让扭过的对角线落回第 1 行，落点上的值 2 正是不动点；无不动点的扭转让它逃出所有行。
One 3×3 listing, two twists: with a fixed point the twisted diagonal lands on row 1, and the value 2
at the landing spot is that fixed point; without one it escapes every row.

The listing is g 0 = (0, 1, 2), g 1 = (1, 2, 2), g 2 = (2, 2, 2) of the chapter's example; f₁ = 0↦1,
1↦2, 2↦2 and f₂ = the cycle 0↦1↦2↦0. The twisted diagonals (1, 2, 2) and (1, 0, 0), the landing row,
the escape and the counts 17576 and 19683 of escaped listings are all recomputed.
"""

import itertools

SIZE = (560, 300)
WRAP = True
ALT = {
    "zh": "两栏，各是同一张三行三列的列表 g：第 0 行 0 1 2，第 1 行 1 2 2，第 2 行 2 2 2，对角线三格 0、2、2 加了粗框。"
          "表下一行是扭过的对角线。左栏用 f₁（0→1，1→2，2→2）：扭过的对角线是 1 2 2，与第 1 行一模一样，第 1 行与它都是青色，"
          "落点在第 1 行第 1 列，那里的值 2 是 f₁ 的不动点。右栏用循环 f₂（0→1→2→0）：扭过的对角线是 1 0 0，品红色，"
          "每一行在对角线那一格上都与它不同（打叉），它不是任何一行。",
    "en": "Two panels, each the same three-by-three listing g: row 0 is 0 1 2, row 1 is 1 2 2, row 2 is 2 2 2, with the "
          "three diagonal cells 0, 2, 2 outlined. The row under the table is the twisted diagonal. Left, with f₁ (0→1, 1→2, "
          "2→2): the twisted diagonal is 1 2 2, exactly row 1; row 1 and it are cyan, and the landing spot is row 1, column 1, "
          "whose value 2 is the fixed point of f₁. Right, with the cycle f₂ (0→1→2→0): the twisted diagonal is 1 0 0, in "
          "magenta; every row differs from it at its diagonal cell (crossed), so it is no row at all.",
}

G = [(0, 1, 2), (1, 2, 2), (2, 2, 2)]
F1 = {0: 1, 1: 2, 2: 2}
F2 = {0: 1, 1: 2, 2: 0}


def twisted(f, g):
    return tuple(f[g[a][a]] for a in range(3))


def escaped(f, g):
    return twisted(f, g) not in g


D1, D2 = twisted(F1, G), twisted(F2, G)
assert D1 == (1, 2, 2) == G[1] and F1[G[1][1]] == G[1][1] == 2
assert D2 == (1, 0, 0) and all(G[a][a] != D2[a] for a in range(3))
_rows = list(itertools.product(range(3), repeat=3))
_count = {name: sum(1 for g in itertools.product(_rows, repeat=3) if escaped(f, g))
          for name, f in (("f1", F1), ("f2", F2))}
assert _count == {"f1": 17576, "f2": 19683} and 3 ** 9 - 17576 == 2107


def table(p, f, d, captured, title):
    t = p.t
    p.text(p.width / 2, 22, title, size=14, weight=600, anchor="middle")
    x0, y0, c = 104, 50, 40
    for a in range(3):
        p.text(x0 - 14, y0 + a * c + c / 2, f"*g* {a}", size=14, color="dim", anchor="end", middle=True)
        p.text(x0 + a * c + c / 2, y0 - 8, str(a), size=13, color="dim", anchor="middle")
        row_hit = captured and G[a] == d
        for b in range(3):
            x, y = x0 + b * c, y0 + a * c
            p.rect(x, y, c, c, color="edge", fill="line" if row_hit else None, fill_opacity=0.14, width=1.0)
            p.text(x + c / 2, y + c / 2, str(G[a][b]), size=16, color="line" if row_hit else "ink", anchor="middle",
                   middle=True)
        x, y = x0 + a * c, y0 + a * c
        p.rect(x + 2, y + 2, c - 4, c - 4, color="ink", width=1.8)
        if not captured:
            p.cross(x + c - 8, y + 8, 5, "area", 1.6)
    yd = y0 + 3 * c + 26
    role = "line" if captured else "area"
    p.text(x0 - 14, yd + c / 2, t("扭过的对角线", "twisted"), size=13, color=role, anchor="end", middle=True)
    for b in range(3):
        p.rect(x0 + b * c, yd, c, c, color=role, fill=role, fill_opacity=0.14, width=1.6)
        p.text(x0 + b * c + c / 2, yd + c / 2, str(d[b]), size=16, color=role, anchor="middle", middle=True, weight=600)
    if captured:
        x, y = x0 + c + c / 2, y0 + c + c / 2
        p.circle(x, y, 17, color="ink", width=2.2)
        p.text(p.width / 2, yd + c + 30, t("= 第 1 行；落点值 2 = *f*_{1}(2)", "= row 1; landing value 2 = *f*_{1}(2)"),
               size=13, color="line", anchor="middle")
    else:
        p.text(p.width / 2, yd + c + 30, t("不是任何一行：逃逸", "no row at all: escaped"), size=13, color="area",
               anchor="middle")


def draw(fig):
    left, right = fig.row([272, 272], 300, gap=16)
    table(left, F1, D1, True, left.t("*f*_{1}：0→1，1→2，2→2", "*f*_{1}: 0→1, 1→2, 2→2"))
    table(right, F2, D2, False, right.t("*f*_{2}：0→1→2→0", "*f*_{2}: 0→1→2→0"))
