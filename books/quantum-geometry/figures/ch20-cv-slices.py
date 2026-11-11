"""复杂度—体积猜想把门数配给桥内切片的体积：边界时间往后走，穿过黑洞内部的切片越拉越长；两者是否成正比是开放问题。
The complexity = volume conjecture matches the gate count with the volume of a slice through the bridge:
as boundary time runs on, the slice through the black-hole interior stretches; whether the two are
proportional is open.

A schematic Penrose diagram of the two-sided black hole. The slices are drawn by a smooth rule (anchors
rise with t, the middle creeps towards a final slice below the singularity) and the script only checks
that each later slice is drawn longer; no volume is computed.
"""

from _ch20 import penrose

SIZE = (500, 330)
ALT = {
    "zh": "一张示意的双边黑洞彭罗斯图：正方形的左右两条竖边是左右两个边界，上下两条锯齿线是奇点，两条对角虚线是视界。"
          "四条紫色的曲线是切片 Σ_t，两端钉在左右边界的时刻 t = 0、1、2、3 上，穿过中间的黑洞内部；t 越大，端点越高，曲线越长，最后一条最粗。"
          "右边一枚红色标签：C ∝ V(Σ_t)？开放。",
    "en": "A schematic Penrose diagram of a two-sided black hole: the left and right sides of the square are the two boundaries, "
          "the zigzag lines at top and bottom are the singularities, and the two dashed diagonals are the horizons. Four violet "
          "curves are the slices Σ_t, pinned to the left and right boundaries at times t = 0, 1, 2, 3 and running through the "
          "black-hole interior in the middle; the larger t, the higher the ends and the longer the curve, the last one thickest. "
          "A red tag on the right: C ∝ V(Σ_t)? Open.",
}


def draw(fig):
    t = fig.t
    cx, cy, s = 190, 172, 230
    slices = penrose(fig, cx, cy, s)
    h = s / 2
    fig.text(cx - h - 10, cy + h - 6, t("左边界", "left"), size=13, color="dim", anchor="end")
    fig.text(cx + h + 10, cy + h - 6, t("右边界", "right"), size=13, color="dim")
    fig.text(cx, cy - h - 12, t("奇点", "singularity"), size=13, color="dim", anchor="middle")
    for i, pts in enumerate(slices):
        fig.text(pts[-1][0] + 10, pts[-1][1] + 4, f"*t* = {i}", size=13, color="axis")
    last = slices[-1]
    mid = last[len(last) // 2]
    fig.text(mid[0], mid[1] - 12, "*Σ*_{*t*}", size=15, color="axis", anchor="middle", weight=600, halo=True)
    fig.text(cx, cy + h + 26, t("黑洞内部（示意）", "black-hole interior (schematic)"), size=13, color="dim", anchor="middle")
    fig.chip(fig.width - 10, 60, t("C ∝ V(Σ_{t})？开放", "C ∝ V(Σ_{t})? OPEN"), "open", anchor="end")
