"""连续两次正交四分之一转，箭头反向：R² = −I。
Two orthogonal quarter turns in a row reverse the arrow: R² = −I.

The plane instance R = [[0, −1], [1, 0]]: it is skew-adjoint (Rᵀ = −R) and unitary (R Rᵀ = I), the
hypotheses of item 1 of thm-ch32-generative-self-reference-and-zeckendorf (cited with lean=), and
R² = −I is checked here by matrix multiplication. The arrow e₁ goes to R e₁ = e₂ and on to
R² e₁ = −e₁; each quarter turn is a violet arc.
"""

import math

SIZE = (440, 300)
ALT = {
    "zh": "一个淡色的单位圆。墨色箭头 e 指向右；绕圆心转四分之一圈（紫色弧，90°）得到指向上的 R e；"
          "再转四分之一圈（第二段紫色弧）得到指向左的 R²e = −e，与 e 恰好反向。下方写着 R² = −I。",
    "en": "A faint unit circle. The ink arrow e points right; a quarter turn about the centre (a violet arc, 90°) gives "
          "R e pointing up; another quarter turn (a second violet arc) gives R²e = −e pointing left, exactly opposite "
          "to e. Below: R² = −I.",
}

R = ((0, -1), (1, 0))


def mul(a, b):
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)) for i in range(2))


def T(a):
    return tuple(tuple(a[j][i] for j in range(2)) for i in range(2))


def apply(a, v):
    return tuple(a[i][0] * v[0] + a[i][1] * v[1] for i in range(2))


def draw(fig):
    t = fig.t
    # the hypotheses of the theorem and its conclusion, for this real 2 × 2 instance
    assert T(R) == tuple(tuple(-x for x in row) for row in R)          # skew-adjoint
    assert mul(R, T(R)) == ((1, 0), (0, 1))                            # unitary
    assert mul(R, R) == ((-1, 0), (0, -1))                             # R² = −I

    cx, cy, r = 220, 150, 104
    e = (1, 0)
    re = apply(R, e)
    rre = apply(R, re)
    assert re == (0, 1) and rre == (-1, 0)

    fig.circle(cx, cy, r, color="faint", width=1.2)
    fig.line(cx - r - 14, cy, cx + r + 14, cy, "faint", 1.0, dash="3 4")

    def tip(v):
        return cx + r * v[0], cy - r * v[1]

    # the two quarter turns
    for a0, a1, lab in ((0, 90, "90°"), (90, 180, "90°")):
        fig.arc(cx, cy, 46, a0 + 4, a1 - 6, "violet", 2.2)
        end = math.radians(a1 - 6)
        fig.arrow_head(cx + 46 * math.cos(end), cy - 46 * math.sin(end), a1 - 6 + 90, "violet", head=8)
        mid = math.radians((a0 + a1) / 2)
        fig.text(cx + 66 * math.cos(mid), cy - 66 * math.sin(mid), lab, size=13, color="violet",
                 anchor="middle", middle=True)

    for v in (e, re, rre):
        x, y = tip(v)
        fig.arrow(cx, cy, x, y, "ink", 2.4, head=11)
    fig.dot(cx, cy, 3.2, "ink")

    x, y = tip(e)
    fig.text(x + 8, y - 10, "*e*", size=15, weight=600)
    x, y = tip(re)
    fig.text(x + 12, y + 14, "*R e*", size=15, weight=600)
    x, y = tip(rre)
    fig.text(x + 6, y - 12, "*R*²*e* = −*e*", size=15, weight=600, anchor="end")

    fig.chip(cx, 290, "R² = −I", "lean", size=13, anchor="middle")
