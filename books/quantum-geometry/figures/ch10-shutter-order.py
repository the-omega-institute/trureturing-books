"""两道快门换个次序，箭头就停在不同的线上：P₀P₊ ≠ P₊P₀（第十章 §10.1）。
Swap the order of two shutters and the arrow ends on a different line: P₀P₊ ≠ P₊P₀ (chapter 10, §10.1).

The picture is the real plane of state vectors, where |0⟩ = (1, 0) and |+⟩ = (1, 1)/√2 are 45° apart (90° on
the Bloch sphere). Each panel applies the two projectors to the same v, the right-hand factor first; the script
asserts the chapter's two matrix products and that the end points are those products applied to v.
"""

import math

from _ch10 import title

SIZE = (540, 280)
WRAP = True
ALT = {
    "zh": "两栏，画的是态矢所在的实平面。每栏都有两条青色的线：水平的 |0⟩ 与斜 45° 的 |+⟩，还有同一支灰色的箭头 v。"
          "左栏“先 P₊ 再 P₀”：v 先垂直落到 |+⟩ 线上，再从那里垂直落到 |0⟩ 线上，琥珀色的箭头停在水平线上。"
          "右栏“先 P₀ 再 P₊”：v 先落到 |0⟩ 线上，再落到 |+⟩ 线上，琥珀色的箭头停在斜线上，而且短得多。",
    "en": "Two panels showing the real plane of state vectors. Each has two cyan lines, the horizontal |0⟩ and |+⟩ at 45°, and "
          "the same grey arrow v. Left, “P₊ first, then P₀”: v drops perpendicularly onto the |+⟩ line, then from there onto "
          "the |0⟩ line, and the amber arrow ends on the horizontal line. Right, “P₀ first, then P₊”: v drops onto the |0⟩ "
          "line, then onto the |+⟩ line, and the amber arrow ends on the slanted line, much shorter.",
}

V_DEG = 65
L0 = (1.0, 0.0)
LP = (math.sqrt(0.5), math.sqrt(0.5))


def proj(line, v):
    c = line[0] * v[0] + line[1] * v[1]
    return (c * line[0], c * line[1])


def matmul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)]


def apply(m, v):
    return (m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1])


def panel(p, first, second, labels, s=176):
    ox, oy = 44, 224
    pt = lambda v: (ox + s * v[0], oy - s * v[1])
    for line, name, dx, dy in ((L0, "|0⟩", -4, 20), (LP, "|+⟩", 8, 4)):
        p.line(*pt((-0.12 * line[0], -0.12 * line[1])), *pt((1.12 * line[0], 1.12 * line[1])), "line", 1.8)
        x, y = pt((1.12 * line[0], 1.12 * line[1]))
        p.text(x + dx, y + dy, name, size=14, color="line", anchor="end" if dy > 10 else "start")
    v = (math.cos(math.radians(V_DEG)), math.sin(math.radians(V_DEG)))
    a = proj(first, v)
    b = proj(second, a)
    p.line(*pt(v), *pt(a), "dim", 1.2, dash="3 3")
    p.line(*pt(a), *pt(b), "dim", 1.2, dash="3 3")
    p.arrow(*pt((0, 0)), *pt(v), "dim", 2.0)
    p.arrow(*pt((0, 0)), *pt(a), "dim", 1.4, dash="4 3")
    p.arrow(*pt((0, 0)), *pt(b), "now", 2.8)
    p.dot(*pt(a), 3.0, "dim")
    x, y = pt(v)
    p.text(x + 8, y + 4, "*v*", size=15, color="dim")
    x, y = pt(b)
    p.text(x + labels[0], y + labels[1], labels[2], size=14, color="now", anchor=labels[3], halo=True)
    return b


def draw(fig):
    left, right = fig.row([262, 262], 280, gap=16)
    P0 = [[1, 0], [0, 0]]
    PP = [[0.5, 0.5], [0.5, 0.5]]
    A = matmul(P0, PP)
    B = matmul(PP, P0)
    assert A == [[0.5, 0.5], [0, 0]] and B == [[0.5, 0], [0.5, 0]] and A != B

    title(left, "先 *P*₊ 再 *P*_{0}", "*P*₊ first, then *P*_{0}")
    b1 = panel(left, LP, L0, (6, 24, "*P*_{0}*P*₊*v*", "start"))
    title(right, "先 *P*_{0} 再 *P*₊", "*P*_{0} first, then *P*₊")
    b2 = panel(right, L0, LP, (-8, -10, "*P*₊*P*_{0}*v*", "end"))

    v = (math.cos(math.radians(V_DEG)), math.sin(math.radians(V_DEG)))
    assert all(abs(b1[i] - apply(A, v)[i]) < 1e-12 for i in range(2))
    assert all(abs(b2[i] - apply(B, v)[i]) < 1e-12 for i in range(2))
    assert abs(b1[1]) < 1e-12 and abs(b2[0] - b2[1]) < 1e-12        # one on |0⟩, the other on |+⟩
