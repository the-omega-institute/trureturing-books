"""一份纯度正交折成两翼：落在观察者之线上的 cos²θ 与撑在它外面的 sin²θ，加起来恰好是整份 1，没有第 3 点。
One unit of purity folds orthogonally into two wings: cos²θ lying on the observer's line and sin²θ
standing across it; together they are exactly the whole 1, with no third point.

The orthogonal self-folding of §39.4 (MODEL) drawn as Pythagoras: Ψ is a unit arrow at θ = 40° above
the observer's line; the cyan square on the shadow cos θ has area cos²θ ≈ 0.59, the magenta square on
the drop sin θ has area sin²θ ≈ 0.41, and the grey dashed square on Ψ has area 1; the identity
cos²θ + sin²θ = 1 and the two areas are asserted. The zero-slack split of a purity budget into a
visible part and an orthogonal residual is item 1 of the chapter's proposition.
"""

import math

from _ch39 import folding

SIZE = (440, 304)
ALT = {
    "zh": "一个直角三角形：墨色的单位箭头 Ψ 从原点斜向右上，与水平的观察者之线成 θ = 40°；它在线上的青色影子 cos θ 是一条直角边，"
          "从箭头尖落下的品红垂线 sin θ 是另一条直角边。青色影子下方立着一个青色正方形，标 cos²θ ≈ 0.59（能观之极）；"
          "品红垂线右侧立着一个品红正方形，标 sin²θ ≈ 0.41（所观之宇）；箭头 Ψ 左上方是一个灰色虚线正方形，标 1。",
    "en": "A right triangle: the ink unit arrow Ψ rises from the origin to the upper right at θ = 40° to the horizontal line of "
          "the observer; its cyan shadow cos θ on that line is one leg, and the magenta drop sin θ from the arrow's tip is "
          "the other. Under the cyan shadow stands a cyan square marked cos²θ ≈ 0.59 (the observing pole); right of the "
          "magenta drop stands a magenta square marked sin²θ ≈ 0.41 (the observed cosmos); above and left of Ψ is a grey "
          "dashed square marked 1.",
}

THETA = 40.0


def draw(fig):
    t = fig.t
    R = 128
    ox, oy = 112, 196
    c, s = math.cos(math.radians(THETA)), math.sin(math.radians(THETA))
    assert abs(c * c + s * s - 1) < 1e-12
    assert round(c * c, 2) == 0.59 and round(s * s, 2) == 0.41
    (tx, ty), (fx, fy) = folding(fig, ox, oy, R, THETA, squares=True)
    fig.text(tx + 6, ty - 8, "Ψ", size=16, weight=600)
    # the square on Ψ: centre
    cx = (ox + tx) / 2 - s * R / 2
    cy = (oy + ty) / 2 - c * R / 2
    fig.text(cx, cy, "1", size=16, color="dim", anchor="middle", middle=True)
    # the cyan square under the shadow
    fig.text((ox + fx) / 2, oy + R * c / 2 - 8, "cos²θ ≈ 0.59", size=14, color="line", anchor="middle", middle=True)
    fig.text((ox + fx) / 2, oy + R * c / 2 + 12, t("能观之极", "observing pole"), size=13, color="line",
             anchor="middle", middle=True)
    # the magenta square right of the drop
    mx, my = fx + R * s / 2, (fy + ty) / 2
    fig.text(mx, my - 9, "sin²θ", size=14, color="area", anchor="middle", middle=True)
    fig.text(mx, my + 9, "≈ 0.41", size=14, color="area", anchor="middle", middle=True)
    fig.text(mx, fy + 18, t("所观之宇", "observed cosmos"), size=13, color="area", anchor="middle")
    fig.text(fx + R * s + 8, oy + 5, t("观察者之线", "observer's line"), size=13, color="dim", anchor="start")
