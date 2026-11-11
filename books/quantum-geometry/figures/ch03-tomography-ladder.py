"""层析的阶梯：每多测一个互补语境，看得见的子空间升一维，盲区降一维（第三章 §3.2）。
The tomography ladder: each added complementary context raises the visible subspace by one dimension and
lowers the blind complement by one (chapter 3, §3.2).

The three rows of the chapter's table: {Z} sees the axis e₃ and is blind to the plane e₁∧e₂; {Z, X} sees the
plane spanned by e₃ and e₁ and is blind to the normal e₂; {X, Y, Z} sees everything. dim V + dim V⊥ = 3 is
asserted for every row.
"""

from tbook import figkit

SIZE = (600, 250)
WRAP = True
ALT = {
    "zh": "三颗同样大小的布洛赫球并排。第一颗只测 Z：竖轴是青色的，看得见；赤道平面是品红的，是盲区。第二颗测 Z 与 X：竖轴与 x 轴所在的平面是青色的，"
          "与它垂直的 y 轴是品红的盲区。第三颗测 X、Y、Z：整个球是青色的，没有盲区。",
    "en": "Three Bloch spheres of the same size side by side. The first measures Z only: the vertical axis is cyan, seen; the "
          "equatorial plane is magenta, blind. The second measures Z and X: the plane through the vertical axis and the x axis is "
          "cyan, and the y axis perpendicular to it is the magenta blind spot. The third measures X, Y and Z: the whole ball is "
          "cyan, with no blind spot.",
}

E1, E2, E3 = (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)
ROWS = [  # (title, visible basis, blind basis)
    (("测 Z", "measure Z"), [E3], [E1, E2], ("盲区：赤道面", "blind: the plane")),
    (("测 Z、X", "measure Z, X"), [E3, E1], [E2], ("盲区：*y* 轴", "blind: the *y* axis")),
    (("测 X、Y、Z", "measure X, Y, Z"), [E1, E2, E3], [], ("盲区：无", "blind: nothing")),
]


def draw(fig):
    panels = fig.row([188, 188, 188], 250, gap=18)
    for p, (title, seen, blind, foot) in zip(panels, ROWS):
        assert len(seen) + len(blind) == 3
        assert all(abs(figkit.dot3(a, b)) < 1e-12 for a in seen for b in blind)
        p.text(94, 22, p.t(*title), size=14, weight=600, anchor="middle")
        sp = p.sphere(94, 128, 74, az=132, el=20)
        if len(seen) == 3:
            sp.outline(color="line", width=2.0, fill="line", fill_opacity=0.22)
        else:
            sp.outline(fill="cyan", fill_opacity=0.03)
        if len(seen) == 1:
            sp.disc(E3, "area", fill_opacity=0.2, color="area", width=1.4)
            sp.segment((0, 0, -1.15), (0, 0, 1.15), "line", 4, cap="round")
        elif len(seen) == 2:
            sp.disc(E2, "line", fill_opacity=0.2, color="line", width=1.6)
            sp.segment((0, -1.2, 0), (0, 1.2, 0), "area", 4, cap="round")
            sp.segment((0, 0, -1), (0, 0, 1), "line", 1.4)
            sp.segment((-1, 0, 0), (1, 0, 0), "line", 1.4)
        else:
            for e in (E1, E2, E3):
                sp.segment(tuple(-c for c in e), e, "line", 1.4)
        sp.dot((0, 0, 0), "dim", 2.6)
        p.text(94, 236, p.t(*foot), size=13, color="area" if blind else "line", anchor="middle")
