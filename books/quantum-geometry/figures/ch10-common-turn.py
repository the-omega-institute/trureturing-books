"""两组态的两两内积表相同，就差一个公共的转动：B = UA（第十章 §10.4）。
Two families with the same table of pairwise inner products differ by one common turn: B = UA (chapter 10,
§10.4).

A is the octant triple of the chapter's example (N, +X, +Y on the Bloch sphere); B = UA with U = diag(1, i).
The script asserts that the two complex Gram matrices are equal and that U moves every Bloch vector by the same
90° turn about the vertical axis, so the triangle N, +X, +Y is carried rigidly to N, +Y, −X.
"""

import math

from tbook import figkit
from _ch10 import OCTANT, bloch, close, gram

SIZE = (460, 350)
ALT = {
    "zh": "一颗布洛赫球，紫色的竖轴穿过北极 N。灰色的球面三角形 A 连着 N、+X、+Y；墨色的三角形 B = UA 连着 N、+Y、−X。"
          "两支紫色的弧箭头沿赤道把 +X 搬到 +Y、把 +Y 搬到 −X，北极 N 原地不动：整块三角形被同一个转动刚性地搬了过去。",
    "en": "A Bloch sphere with the violet vertical axis through the north pole N. The grey spherical triangle A joins N, +X and +Y; "
          "the ink triangle B = UA joins N, +Y and −X. Two violet curved arrows along the equator carry +X to +Y and +Y to −X, "
          "while N stays put: one turn carries the whole triangle rigidly.",
}


def draw(fig):
    t = fig.t
    U = ((1, 0), (0, 1j))
    B = [tuple(sum(U[i][k] * psi[k] for k in range(2)) for i in range(2)) for psi in OCTANT]
    GA, GB = gram(OCTANT), gram(B)
    assert all(abs(GA[i][j] - GB[i][j]) < 1e-12 for i in range(3) for j in range(3))
    for a, b in zip(OCTANT, B):
        assert close(figkit.rotate(bloch(a), (0, 0, 1), 90), bloch(b))
    A3 = [bloch(p) for p in OCTANT]
    B3 = [bloch(p) for p in B]
    assert close(A3[1], (1, 0, 0)) and close(A3[2], (0, 1, 0)) and close(B3[2], (-1, 0, 0))

    sp = fig.sphere(230, 190, 128, az=180, el=32)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.1)
    sp.segment((0, 0, 1), (0, 0, 1.25), "axis", 2.0)
    sp.segment((0, 0, -1.22), (0, 0, -1), "axis", 2.0)
    sp.segment((0, 0, -1), (0, 0, 1), "axis", 1.1, dash="3 4")
    sp.label((0, 0, 1.25), "*U*", dx=10, dy=4, size=15, color="axis")

    sp.path(A3 + [A3[0]], "dim", 2.0)
    sp.path(B3 + [B3[0]], "ink", 2.4)

    for a0 in (0, 90):
        pts = [sp.xy(figkit.sph(90, a0 + 10 + 70 * k / 30), 1.13) for k in range(31)]
        fig.curve_arrow(pts, "axis", 2.0, head=8)

    for v in A3[1:]:
        sp.dot(v, "dim", 4.4, ring="bg")
    for v in B3:
        sp.dot(v, "ink", 4.8, ring="bg")
    sp.label(A3[0], "*N*", dx=-10, dy=-8, size=15, anchor="end")
    sp.label(A3[1], "+*X*", dx=-12, dy=6, size=15, color="dim", anchor="end")
    sp.label(A3[2], "+*Y*", dx=10, dy=24, size=15)
    sp.label(B3[2], "−*X*", dx=12, dy=6, size=15)
    fig.legend(18, 26, [("dim", t("*A*：ψ_{0}, ψ_{1}, ψ_{2}", "*A*: ψ_{0}, ψ_{1}, ψ_{2}")),
                        ("ink", t("*B* = *UA*：同一张内积表", "*B* = *UA*: the same table"))], size=13)
