"""四种噪声各把球压成什么样：同一强度 ½ 下布洛赫球的竖直截面（第四章 §4.2）。
What four kinds of noise do to the ball: the vertical cross-section of the Bloch ball at strength ½ (chapter 4, §4.2).

The maps are the rows of the chapter's table, (r_x, r_z) shown:
phase damping c = ½: (c x, z); bit flip p = ¼: (x, (1 − 2p) z); depolarizing λ = ½: ((1 − λ) x, (1 − λ) z);
amplitude damping γ = ½: (√(1 − γ) x, (1 − γ) z + γ). Each fixed set in the table is checked to be fixed.
"""

import math

from _ch04 import ball, image

SIZE = (676, 230)
WRAP = True
ALT = {
    "zh": "四个同样大小的竖直截面，细线是原来的球皮，青色是噪声作用一次后的像，紫色是不动的部分。相位阻尼：压成竖直的窄椭圆，竖轴不动。"
          "比特翻转：压成扁平的横椭圆，水平的 x 轴不动。去极化：缩成半径一半的同心圆，只有球心不动。振幅阻尼：缩成椭圆并整体上移，"
          "顶端贴着北极，只有北极不动。",
    "en": "Four vertical cross-sections of the same size: the thin line is the original shell, cyan is its image after one "
          "application of the noise, violet is what stays fixed. Phase damping: a tall narrow ellipse; the vertical axis is fixed. "
          "Bit flip: a flat wide ellipse; the horizontal x axis is fixed. Depolarizing: a concentric circle of half the radius; only "
          "the centre is fixed. Amplitude damping: an ellipse shifted up so that its top touches the north pole; only the north "
          "pole is fixed.",
}

C, PF, LAM, GAM = 0.5, 0.25, 0.5, 0.5
MAPS = [
    (("相位阻尼", "phase damping"), lambda x, z: (C * x, z), "zaxis", ("不动：竖轴", "fixed: z axis")),
    (("比特翻转", "bit flip"), lambda x, z: (x, (1 - 2 * PF) * z), "xaxis", ("不动：*x* 轴", "fixed: *x* axis")),
    (("去极化", "depolarizing"), lambda x, z: ((1 - LAM) * x, (1 - LAM) * z), "centre", ("不动：球心", "fixed: centre")),
    (("振幅阻尼", "amplitude damping"), lambda x, z: (math.sqrt(1 - GAM) * x, (1 - GAM) * z + GAM), "north",
     ("不动：北极", "fixed: north pole")),
]
FIXED = {
    "zaxis": [(0.0, z / 10) for z in range(-10, 11)],
    "xaxis": [(x / 10, 0.0) for x in range(-10, 11)],
    "centre": [(0.0, 0.0)],
    "north": [(0.0, 1.0)],
}


def draw(fig):
    panels = fig.row([157, 157, 157, 157], 230, gap=16)
    for p, (title, f, kind, foot) in zip(panels, MAPS):
        for pt in FIXED[kind]:
            q = f(*pt)
            assert abs(q[0] - pt[0]) < 1e-12 and abs(q[1] - pt[1]) < 1e-12
        cx, cy, R = 78, 116, 62
        p.text(cx, 22, p.t(*title), size=14, weight=600, anchor="middle")
        P = ball(p, cx, cy, R, labels=False)
        image(p, P, f, fill_opacity=0.22, width=2.0)
        if kind == "zaxis":
            p.line(cx, cy - R, cx, cy + R, "axis", 3.4, cap="round")
        elif kind == "xaxis":
            p.line(cx - R, cy, cx + R, cy, "axis", 3.4, cap="round")
        else:
            x, y = P(*FIXED[kind][0])
            p.dot(x, y, 5.6, "axis", ring="bg")
        if kind == "north":
            x0, y0 = P(0, 0)
            x1, y1 = P(*f(0, 0))
            p.arrow(x0, y0, x1, y1 + 4, "dim", 1.6, head=7)
        p.text(cx, 214, p.t(*foot), size=13, color="axis", anchor="middle")
