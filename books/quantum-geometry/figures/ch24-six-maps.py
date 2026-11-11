"""六个用 0 和 1 写出的非退化分式映射，与 y = x 的交点：只有两个交在有理数够不到的地方。
The six non-degenerate fractional maps written with 0 and 1, and where they meet y = x: only two of
them meet it where rationals cannot reach.

Each panel graphs x ↦ (ax + b)/(cx + d) for one row (a, b, c, d) of the chapter's table, with the
diagonal y = x. The fixed points are the real roots of c x² + (d − a) x − b = 0; the discriminant
(d − a)² + 4bc and the fate are recomputed and checked against the table. Rational fixed points are
cyan, irrational ones magenta.
"""

import math

from _ch24 import PHI

SIZE = (560, 384)
ALT = {
    "zh": "六个同样大小的小图，排成两行，每个画一条映射曲线（墨色）与灰色虚线对角线 y = x，交点就是不动点。"
          "x ↦ x：曲线与对角线重合，每一点都是不动点（empty）。x ↦ x + 1：与对角线平行，没有交点（dead）。"
          "x ↦ x/(x + 1)：只在 0 处碰到对角线（collapse）。x ↦ 1/x：交于 1 与 −1（collapse）。这些交点是青色的有理数。"
          "x ↦ 1 + 1/x：交于 φ 与 −1/φ（live）；x ↦ 1/(1 + x)：交于 1/φ 与 −φ（live）；这四个交点是品红的无理数。",
    "en": "Six small plots of the same size in two rows, each with a map's curve (ink) and the grey dashed diagonal y = x; "
          "the crossings are the fixed points. x ↦ x: the curve lies on the diagonal, every point is fixed (empty). "
          "x ↦ x + 1: parallel to the diagonal, no crossing (dead). x ↦ x/(x + 1): touches the diagonal only at 0 "
          "(collapse). x ↦ 1/x: crosses at 1 and −1 (collapse). These crossings are cyan rationals. x ↦ 1 + 1/x: crosses at "
          "φ and −1/φ (live); x ↦ 1/(1 + x): crosses at 1/φ and −φ (live); these four crossings are magenta irrationals.",
}

MAPS = [  # (a, b, c, d), label, fate
    ((1, 0, 0, 1), "*x* ↦ *x*", "empty"),
    ((1, 1, 0, 1), "*x* ↦ *x* + 1", "dead"),
    ((1, 0, 1, 1), "*x* ↦ *x*/(*x* + 1)", "collapse"),
    ((0, 1, 1, 0), "*x* ↦ 1/*x*", "collapse"),
    ((1, 1, 1, 0), "*x* ↦ 1 + 1/*x*", "live"),
    ((0, 1, 1, 1), "*x* ↦ 1/(1 + *x*)", "live"),
]


def fate(m):
    a, b, c, d = m
    coeff = (c, d - a, -b)
    disc = (d - a) ** 2 + 4 * b * c
    if coeff == (0, 0, 0):
        return "empty"
    if coeff == (0, 0, -1):
        return "dead"
    if disc in (0, 4):
        return "collapse"
    if disc == 5:
        return "live"
    return None


def roots(m):
    a, b, c, d = m
    A, B, C = c, d - a, -b
    if A == 0:
        return [] if B == 0 else [-C / B]
    disc = B * B - 4 * A * C
    if disc < 0:
        return []
    r = math.sqrt(disc)
    return sorted({(-B - r) / (2 * A), (-B + r) / (2 * A)})


# the table: all 16 bit-quadruples, the six non-degenerate ones, their fates and fixed points
_nd = [m for m in ((a, b, c, d) for a in (0, 1) for b in (0, 1) for c in (0, 1) for d in (0, 1)) if m[0] * m[3] - m[1] * m[2]]
assert sorted(_nd) == sorted(m for m, _, _ in MAPS)
for _m, _, _f in MAPS:
    assert fate(_m) == _f
assert roots((1, 0, 1, 1)) == [0.0] and roots((0, 1, 1, 0)) == [-1.0, 1.0]
assert all(abs(u - v) < 1e-12 for u, v in zip(roots((1, 1, 1, 0)), [-1 / PHI, PHI]))
assert all(abs(u - v) < 1e-12 for u, v in zip(roots((0, 1, 1, 1)), [-PHI, 1 / PHI]))


def draw(fig):
    panels = fig.row([176, 176, 176], 188, gap=16) + fig.row([176, 176, 176], 188, gap=16, y=196)
    # (a fixed 3 × 2 grid: the six plots are read side by side, so they stay together on a phone)
    R = 2.4
    for p, (m, label, fname) in zip(panels, MAPS):
        a, b, c, d = m
        f = lambda x: (a * x + b) / (c * x + d)
        p.text(p.width / 2, 20, label, size=14, color="ink", anchor="middle")
        p.text(p.width / 2, 180, fname, size=13, color="dim", anchor="middle", mono=True)
        ax = p.axes(18, 32, 140, 132, (-R, R), (-R * 132 / 140, R * 132 / 140))
        ax.hline(0, "faint", 1.0)
        ax.vline(0, "faint", 1.0)
        ax.plot(lambda x: x, color="dim", width=1.3, dash="4 3")
        pole = -d / c if c else None
        if fname == "empty":
            ax.plot(lambda x: x, color="line", width=4.0, opacity=0.55)
            continue
        if pole is None:
            ax.plot(f, color="ink", width=2.0)
        else:
            ax.plot(f, -R, pole - 0.02, n=200, color="ink", width=2.0)
            ax.plot(f, pole + 0.02, R, n=200, color="ink", width=2.0)
        rational = fname != "live"
        names = {(1, 0, 1, 1): ["0"], (0, 1, 1, 0): ["−1", "1"], (1, 1, 1, 0): ["−1/*φ*", "*φ*"],
                 (0, 1, 1, 1): ["−*φ*", "1/*φ*"]}.get(m, [])
        role = "line" if rational else "area"
        for r, name in zip(roots(m), names):
            assert abs(f(r) - r) < 1e-12
            ax.points([(r, r)], role, r=5.0, ring="bg")
            if r >= 0:
                ax.text(r, r, name, dx=9, dy=16, size=14, color=role, halo=True)
            else:
                ax.text(r, r, name, dx=-9, dy=-8, size=14, color=role, anchor="end", halo=True)
