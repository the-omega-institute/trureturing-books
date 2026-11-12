"""四级突围：每一层数系都被下一种操作撑破，撑破它的那个常数就是下一层的代表。
Four tiers: each number system is broken open by the next operation, and the constant that breaks it
out is what the next tier is named after.

Tier 1 is the rationals m/n (dots with n ≤ 4 on [0, 2]); tier 2 is born from the diagonal √2 of the
unit square; tier 3 from the circle that the inscribed octagon approaches (π); tier 4 from the point
where y = cos θ meets y = θ (θ* ≈ 0.739, found by iterating cos and asserted in _ch29). Cyan is what a
tier is built from, magenta the constant that escaped the tier below.
"""

from _ch29 import stairs

SIZE = (460, 300)
ALT = {
    "zh": "四级台阶从左向右升高，分别标着第 1 层 ℤ、ℚ，第 2 层 √2、φ，第 3 层 π、e，第 4 层 θ* ≈ 0.739。"
          "每级台阶上方有一幅小图：第 1 层是数轴 0 到 2 上的青色有理点 m/n；第 2 层是青色单位正方形和它品红的对角线 √2；"
          "第 3 层是青色的正八边形和它外接的品红圆 π；第 4 层是青色的余弦曲线 y = cos θ 与虚线 y = θ 交于品红的点 θ*。"
          "品红标的都是逃出下面一层的常数。",
    "en": "Four steps rise from left to right, labelled tier 1 ℤ, ℚ; tier 2 √2, φ; tier 3 π, e; tier 4 θ* ≈ 0.739. "
          "Above each step is a small picture: tier 1, cyan rational points m/n on the number line from 0 to 2; tier 2, a "
          "cyan unit square with its magenta diagonal √2; tier 3, a cyan regular octagon inside its magenta circle π; tier 4, "
          "the cyan curve y = cos θ meeting the dashed line y = θ at the magenta point θ*. Everything magenta is a constant "
          "that escaped the tier below.",
}


def draw(fig):
    stairs(fig, 0, 115, 296, 222, 34, fs=14, icon_s=1.0, icon_dy=52)
